//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RtfObjects.cs                          </Name>
//    <Description> Objekt prezentující položku WORD dokumentu                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System.Linq;
using Gordic.Documents.Rtf;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using System;
using System.Collections.Generic;
using System.Xml;
namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Objekt prezentující položku WORD dokumentu
    /// </summary>
    class RtfFieldElement
    {
        /// <summary>
        /// Vlastnost 'fieldinst'
        /// </summary>
        public string FldInst { get; set; }

        /// <summary>
        /// instance: FORMTEXT, MACROBUTTON atd.
        /// </summary>
        public GRTFField.GFieldType Instance { get; set; }

        /// <summary>
        /// Typ MACROBUTTONu
        /// </summary>
        public GRTFField.GMBType MBType { get; set; }

        /// <summary>
        /// rtf: text před instanci
        /// </summary>
        public string Rtf { get; set; }

        /// <summary>
        /// Název položky
        /// </summary>
        string fullName = null;

        /// <summary>
        /// Název položky
        /// </summary>
        public string Name
        {
            get
            {
                if (string.IsNullOrEmpty(fullName))
                    return fullName;

                string[] names = fullName.Split('.');
                int leng = names.Length;

                if (names.Length < 3)
                    return fullName;

                return string.Format("{0}.{1}", names[leng - 2], names[leng - 1]);
            }
        }

        /// <summary>
        /// Typ pole pro alf formát
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Jednoznačný identifikátor položky
        /// </summary>
        public string Guid { get; set; }

        /// <summary>
        /// Např. \insrsid8279382
        /// </summary>
        public string RSID { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public RtfFieldElement()
        {
            Instance = GRTFField.GFieldType.unknown;
            MBType = GRTFField.GMBType.unknown;
        }

        internal void Initialize(string p_fieldText)
        {
            FldInst = GetTextFromSpan(p_fieldText, @"\*\fldinst");
            FldInst = FldInst.Remove(0, FldInst.IndexOf('{') + 1).Trim('}');
            Instance = CommonService.GetAtrInstance(FldInst);
            Rtf = CommonService.GetAtrRtf(FldInst, Instance);
            if (Instance == GRTFField.GFieldType.macrobutton)
            {
                string m_name = fullName;
                //\insrsid16739571  MACROBUTTON MSWField(FVZ382d_PO.cis_obj): \'c8\'edslo objedn\'e1vky 
                MBType = CommonService.GetMacrobuttonType(FldInst, out m_name);
                fullName = OfficeService.GetName(m_name);
                Guid = Convert.ToString(OfficeService.GetGuid(m_name));
                RSID = CommonService.GetRSID(FldInst);
            }
            else if (Instance == GRTFField.GFieldType.formfield)
            {
                string _formfield = GetTextFromSpan(p_fieldText, @"\*\formfield");
                Type = CommonService.GetAtrType(_formfield.Remove(0, _formfield.IndexOf('{') + 1));
                if (_formfield.Contains(@"\*\ffstattext"))
                {
                    string _ffstatetext = _formfield.Remove(0, _formfield.IndexOf(@"\*\ffstattext"));
                    fullName = CommonService.GetAtrName(_ffstatetext, Instance);
                    Guid = CommonService.GetAtrGuid(_ffstatetext);
                }
            }

            if (Guid == null || fullName == null || string.IsNullOrEmpty(fullName.Trim()) || fullName == "*")
                Instance = GRTFField.GFieldType.unknown;
        }

        string GetTextFromSpan(string p_text, string p_span)
        {
            if (!p_text.Contains(p_span))
                return string.Empty;

            p_text = p_text.Remove(0, p_text.IndexOf(p_span));
            return CommonService.GetTextInBrackets(p_text);
        }
    }

    /// <summary>
    /// Třída prezentující začátek/konec větvi ‘region’, ‘body’, ‘head’, ‘foot’ ve výstupním alf souboru
    /// </summary>
    class RtfNode
    {
        /// <summary>
        /// Daný nod je počátečným nebo konečným nodem
        /// </summary>
        public bool Beginning { get; set; }

        /// <summary>
        /// Název větve
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Seznam atributů
        /// </summary>
        public List<string[]> Attributes { get; set; }
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public RtfNode()
        {
            Attributes = new List<string[]>();
            Name = string.Empty;
            Beginning = true;
        }
    }

    /// <summary>
    /// Třída prezentující RTF dokument dle standardu ALF
    /// </summary>
    class RtfDocument
    {
        /// <summary>
        /// Obsah ve formátu RTF
        /// </summary>
        public string Rtf { get; set; }

        /// <summary>
        /// Seznam komponent
        /// </summary>
        public List<object> Components { get; set; }

        //pokud TRUE, pak to znamená, že jsme těsně po speciálním řádku 
        //obsahujícím Začátek nebo Konec nějaké sekce
        bool _specTagAfter = false;

        /// <summary>
        /// Prázdný konstruktor třídy ve kterém vytvoříme objekty
        /// </summary>
        private RtfDocument()
        {
            Rtf = string.Empty;
            Components = new List<object>();
        }

        readonly object syncRoot = new object();
        string content;
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="conten">Obsah v rtf formátu</param>
        /// <param name="rootRegionName">název hlavního regionu</param>
        internal void Initialize(string conten, string rootRegionName)
        {
            LoggingService.Info(GResources.GetResourceText(29450137)); //RC 29450137 : inicializace obsahu RTF dokumentu
            lock (syncRoot)
            {
                Rtf = conten;
                this.content = conten;
                int _curretOffset = 0;
                bool _existsRootElement = false,
                    _firstSymbol = false;

                string[] _headersFooters = new string[] { @"\header ", @"\headerl ", @"\headerr ", @"\headerf ", @"\footer ", @"\footerl ", @"\footerr ", @"\footerf " };
                int _indexField = content.Contains(@"\field") ? content.IndexOf(@"{\field") : -1;
                int _indexMin = 0,
                    _min = -1;
                // najdeme specifické symboly v obsahu
                // pokud tito specifické symboly jsou PŘED symbolem field, pak je uložíme jako první
                while (_indexMin != -1)
                {
                    _min = -1;
                    _indexMin = -1;
                    for (int _index = 0; _index < 8; _index++)
                    {
                        int _indexOf = content.IndexOf(_headersFooters[_index]);
                        if (_indexMin == -1)
                        {
                            _indexMin = _indexOf;
                            _min = _index;
                        }
                        else if (_indexOf != -1 && _indexOf < _indexMin)
                        {
                            _indexMin = _indexOf;
                            _min = _index;
                        }
                    }

                    // vložíme první symbol před region
                    if (!_firstSymbol)
                    {
                        int[] _rtfRef = new int[] { 0, 1 };
                        Components.Add(_rtfRef);
                        _curretOffset = 1;
                        _indexMin -= _curretOffset;
                        content = content.Remove(0, 1);
                        _firstSymbol = true;
                    }

                    if (_indexMin != -1)
                    {
                        // pokud klíčové slovo FIELD je dříve, než specifické klíčové slovo (ze seznamu specifických slov)
                        // pak se sestava generuje standardně
                        if (_indexMin > _indexField)
                            break;

                        if (_min < 4)
                        {
                            if (SetHeader(ref _curretOffset, _indexMin, ref _existsRootElement, rootRegionName))
                                break;
                        }
                        else if (SetFooter(ref _curretOffset, _indexMin, ref _existsRootElement, rootRegionName))
                            break;
                    }
                }

                _specTagAfter = false;

                while (content.Length > 0)
                {
                    if (!_existsRootElement)
                    {
                        RtfNode _regionNode = new RtfNode
                        {
                            Name = "region"
                        };
                        string[] _attributes = new string[] { "name", rootRegionName };
                        _regionNode.Attributes.Add(_attributes);
                        Components.Add(_regionNode);

                        RtfNode _bodyNode = new RtfNode
                        {
                            Name = "body"
                        };
                        Components.Add(_bodyNode);
                        _existsRootElement = true;
                    }

                    if (content.Contains(@"\field"))
                    {
                        _indexField = content.IndexOf(@"{\field");
                        // odstraníme nadbytečný řádek
                        if (_specTagAfter)
                            SetSpecTagAfter(ref _curretOffset, ref content, _indexField);

                        _indexField = content.IndexOf(@"{\field");
                        Components.Add(new int[] { _curretOffset, _curretOffset + _indexField });
                        _curretOffset += _indexField;
                        content = content.Remove(0, _indexField);

                        string _fieldText = CommonService.GetTextInBrackets(content);
                        RtfFieldElement _fieldElement = new RtfFieldElement();
                        _fieldElement.Initialize(_fieldText);

                        switch (_fieldElement.Instance)
                        {
                            case GRTFField.GFieldType.unknown:
                                if (_fieldElement.FldInst != null && _fieldElement.FldInst.Contains("FORMTEXT"))
                                    Components.Add(new int[] { _curretOffset, _curretOffset + _fieldText.Length });
                                _curretOffset += _fieldText.Length;
                                content = content.Remove(0, _fieldText.Length);
                                break;
                            default:
                                if (!_existsRootElement)
                                {
                                    RtfNode _regionNode = new RtfNode
                                    {
                                        Name = "region"
                                    };
                                    string[] _attributes = new string[] { "name", rootRegionName };
                                    _regionNode.Attributes.Add(_attributes);
                                    Components.Add(_regionNode);

                                    RtfNode _bodyNode = new RtfNode
                                    {
                                        Name = "body"
                                    };
                                    Components.Add(_bodyNode);
                                    _existsRootElement = true;
                                }
                                Components.Add(_fieldElement);
                                if (_fieldElement.Instance == GRTFField.GFieldType.macrobutton)
                                    switch (_fieldElement.MBType)
                                    {
                                        case GRTFField.GMBType.unknown:
                                        case GRTFField.GMBType.field:
                                            break;
                                        default:
                                            _specTagAfter = true;
                                            break;
                                    }

                                _curretOffset += _fieldText.Length;
                                content = content.Remove(0, _fieldText.Length);
                                break;
                        }
                    }
                    else
                    {
                        // odstraníme nadbytečný řádek
                        if (_specTagAfter)
                            SetSpecTagAfter(ref _curretOffset, ref content, -1);

                        SetEnd(_curretOffset, content);
                        content = string.Empty;
                    }
                }
            }
            LoggingService.Info(GResources.GetResourceText(29450138)); //RC 29450138 : konec inicializace obsahu RTF dokumentu
        }

        bool SetHeader(ref int _curretOffset, int _headerIndex, ref bool _existsRootElement, string p_rootRegion)
        {
            bool result = false;
            int _index = _headerIndex;
            if (_index > 0)
                while (content[_index] != '{' && content[_index] != '}' && (_index > 0))
                    _index--;

            if (_index > 0)
                if (!content.Substring(0, _index).Contains(@"\field"))
                {
                    if (content[_index] == '{')
                        _headerIndex = _index;
                    int[] _rtfRef = new int[] { _curretOffset, _curretOffset + _headerIndex };
                    Components.Add(_rtfRef);
                    _curretOffset += _headerIndex;
                    content = content.Remove(0, _headerIndex);
                }
                else
                    result = true;

            string _section = CommonService.GetTextInBrackets(content);
            if (_section.Contains(@"\field"))
            {
                if (!_existsRootElement)
                {
                    RtfNode _regionNode = new RtfNode
                    {
                        Name = "region"
                    };
                    string[] _attributes = new string[] { "name", p_rootRegion };
                    _regionNode.Attributes.Add(_attributes);
                    Components.Add(_regionNode);

                    RtfNode _bodyNode = new RtfNode
                    {
                        Name = "body"
                    };
                    Components.Add(_bodyNode);
                    _existsRootElement = true;
                }

                int _indexField = SetSectionWithField(_section, -1, _curretOffset);

                //znamená že sekce je delší
                content = content.Remove(0, _section.Length);
                int[] _rtfRef = new int[] { _curretOffset + _indexField, _curretOffset + _section.Length };
                Components.Add(_rtfRef);
                _curretOffset += _section.Length;
            }
            else
            {
                //znamená že sekce je delší
                content = content.Remove(0, _section.Length);
                int[] _rtfRef = new int[] { _curretOffset, _curretOffset + _section.Length };
                Components.Add(_rtfRef);
                _curretOffset += _section.Length;
            }
            return result;
        }
        bool SetFooter(ref int _curretOffset, int _footerIndex, ref bool _existsRootElement, string p_rootRegion)
        {
            bool result = false;
            int _index = _footerIndex;
            if (_index > 0)
                while (content[_index] != '{' && content[_index] != '}' && (_index > 0))
                    _index--;

            if (_index > 0)
                if (!content.Substring(0, _index).Contains(@"\field"))
                {
                    if (content[_index] == '{')
                        _footerIndex = _index;
                    int[] _rtfRef = new int[] { _curretOffset, _curretOffset + _footerIndex };
                    Components.Add(_rtfRef);
                    _curretOffset += _footerIndex;
                    content = content.Remove(0, _footerIndex);
                }
                else
                    result = true;

            string _section = CommonService.GetTextInBrackets(content);
            if (_section.Contains(@"\field"))
            {
                if (!_existsRootElement)
                {
                    RtfNode _regionNode = new RtfNode
                    {
                        Name = "region"
                    };
                    string[] _attributes = new string[] { "name", p_rootRegion };
                    _regionNode.Attributes.Add(_attributes);
                    Components.Add(_regionNode);

                    RtfNode _bodyNode = new RtfNode
                    {
                        Name = "body"
                    };
                    Components.Add(_bodyNode);
                    _existsRootElement = true;
                }

                int _indexField = SetSectionWithField(_section, -1, _curretOffset);

                //znamená že sekce je delší
                content = content.Remove(0, _section.Length);
                int[] _rtfRef = new int[] { _curretOffset + _indexField, _curretOffset + _section.Length };
                Components.Add(_rtfRef);
                _curretOffset += _section.Length;
            }
            else
            {
                //znamená že sekce je delší
                content = content.Remove(0, _section.Length);
                int[] _rtfRef = new int[] { _curretOffset, _curretOffset + _section.Length };
                Components.Add(_rtfRef);
                _curretOffset += _section.Length;
            }
            return result;
        }

        int SetSectionWithField(string p_section, int p_start, int p_offset)
        {
            bool _isStart = p_start == 0;
            int _offset = 0, _fieldIndex = p_section.IndexOf(@"{\field");
            if (_fieldIndex == -1)
                return _offset;

            int p_end = p_offset;
            if (p_start == 0)
            {
                SetRtfRef(ref p_start, ref p_end);
                p_start = p_offset;
            }

            p_end = p_offset + _fieldIndex;
            if (p_start != -1)
            {
                if (_isStart)
                    SetRtfRef(ref p_start, ref p_end, 1);
                else
                    SetRtfRef(ref p_start, ref p_end);
                p_section = p_section.Remove(0, _fieldIndex);
                _offset += _fieldIndex;
            }
            else p_start = p_offset;

            _fieldIndex = p_section.IndexOf(@"{\field");

            while (_fieldIndex != -1)
            {
                if (_fieldIndex != 0)
                {
                    p_end = p_offset + _offset + _fieldIndex;
                    SetRtfRef(ref p_start, ref p_end);
                    _offset += _fieldIndex;
                    p_section = p_section.Remove(0, _fieldIndex);
                }
                string _fieldText = CommonService.GetTextInBrackets(p_section);
                RtfFieldElement _fieldElement = new RtfFieldElement();
                _fieldElement.Initialize(_fieldText);

                if (_fieldElement.Instance == GRTFField.GFieldType.unknown)
                {
                    p_start = _offset + p_offset;
                    p_end = _offset + p_offset + _fieldText.Length;
                    SetRtfRef(ref p_start, ref p_end);
                }
                else
                {
                    Components.Add(_fieldElement);
                    _specTagAfter = true;
                }
                _offset += _fieldText.Length;
                p_start = _offset + p_offset;
                p_section = p_section.Remove(0, _fieldText.Length);
                _fieldIndex = p_section.IndexOf(@"{\field");
            }
            return _offset;
        }
        void SetRtfRef(ref int _start, ref int _end)
        {
            if (_start != -1 && _end != -1)
            {
                int[] _rtfRef = new int[] { _start, _end };
                Components.Add(_rtfRef);
                _start = _end = -1;
            }
        }
        void SetRtfRef(ref int _start, ref int _end, int _indikator)
        {
            if (_start != -1 && _end != -1)
            {
                int[] _rtfRef = new int[] { _start, _end, _indikator };
                Components.Add(_rtfRef);
                _start = _end = -1;
            }
        }
        void SetSpecTagAfter(ref int _curretOffset, ref string p_rtf, int _indexField)
        {

            int _indexPar = p_rtf.IndexOf(@"\par");
            if (_indexPar != -1 &&
                ((_indexField != -1 && (_indexPar < _indexField)) || (_indexField == -1)))
            {
                // symbol je hledaný
                // půjdeme od symbolu nahoru a najdeme závorku '{'
                int _indexOpenBracket = _indexPar;
                while (_indexOpenBracket != -1 && p_rtf[_indexOpenBracket] != '{' && p_rtf[_indexOpenBracket] != '}')
                    _indexOpenBracket--;
                if (p_rtf[_indexOpenBracket] == '}')
                    _indexOpenBracket = -1;

                int _indexCloseBracket = -1;
                if (_indexOpenBracket != -1)
                {
                    _indexCloseBracket = _indexPar;
                    while (_indexCloseBracket != -1 && p_rtf[_indexCloseBracket] != '{' && p_rtf[_indexCloseBracket] != '}')
                        _indexCloseBracket++;

                    if (p_rtf[_indexCloseBracket] == '{')
                        _indexCloseBracket = -1;
                }

                if (_indexOpenBracket != -1 && _indexCloseBracket != -1)
                {
                    string _section = p_rtf.Substring(_indexOpenBracket, _indexCloseBracket - _indexOpenBracket + 1);
                    string _sectionParBracket = p_rtf.Substring(_indexPar + 4, _indexCloseBracket - _indexPar - 4);
                    if (_indexOpenBracket > 0)
                    {
                        int[] _rtfRefPar = new int[] { _curretOffset, _curretOffset + _indexOpenBracket };
                        Components.Add(_rtfRefPar);
                        p_rtf = p_rtf.Remove(0, _indexOpenBracket);
                        _curretOffset += _indexOpenBracket;
                        _indexPar -= _indexOpenBracket;
                    }
                    if (!_section.Contains(@"\field") && string.IsNullOrEmpty(_sectionParBracket.Trim()))
                    {
                        p_rtf = p_rtf.Remove(0, _section.Length);
                        _curretOffset += _section.Length;
                    }
                    else
                    {
                        if (_indexPar != 0)
                        {
                            int[] _rtfRefPar = new int[] { _curretOffset, _curretOffset + _indexPar };
                            Components.Add(_rtfRefPar);
                        }
                        p_rtf = p_rtf.Remove(0, _indexPar + 5);
                        _curretOffset += _indexPar + 5;
                    }
                }
                else
                {
                    if (_indexPar != 0)
                    {
                        int[] _rtfRefPar = new int[] { _curretOffset, _curretOffset + _indexPar };
                        Components.Add(_rtfRefPar);
                    }
                    p_rtf = p_rtf.Remove(0, _indexPar + 4);
                    _curretOffset += _indexPar + 4;
                }
                _specTagAfter = false;
            }
        }
        void SetEnd(int _curretOffset, string p_rtf)
        {
            int _start = _curretOffset;

            _curretOffset += p_rtf.Length - 1;
            p_rtf = p_rtf.Remove(0, p_rtf.Length - 1);
            int _end = _curretOffset;
            SetRtfRef(ref _start, ref _end, 0);

            //uzavřeme větve
            RtfNode _bodyNode = new RtfNode
            {
                Name = "body",
                Beginning = false
            };
            Components.Add(_bodyNode);

            RtfNode _regionNode = new RtfNode
            {
                Name = "region",
                Beginning = false
            };
            Components.Add(_regionNode);
            //a poslední symbol
            Components.Add("}");
        }        
    }
}
