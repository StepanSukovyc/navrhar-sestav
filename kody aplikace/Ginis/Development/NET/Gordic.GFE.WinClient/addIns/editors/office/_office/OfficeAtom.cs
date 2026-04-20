//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OfficeAtom.cs                          </Name>
//    <Description> Jednoznačný identifikátor políčka                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2020-05-29                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Excel = Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing.Design;
using System.Linq;
using System.Xml;
using Gordic.General.ApplicationInterface;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.Xml.Serialization;
using System.IO;
using Newtonsoft.Json;
using Microsoft.Office.Interop.Excel;
using System.Runtime.InteropServices;

namespace Gordic.GFE.WinClient.Editor._office
{
    [Serializable]
    public class OfficeAtomItem : IComponent, IScriptHandler, IAttributeHandler
    {
        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        [ReadOnly(false)]
        [DisplayName("identifikátor položky")]
        [Description("Jednoznačný identifikátor položky")]
        public virtual string Guid { get; set; }

        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(false)]
        [DisplayName("název")]
        [Description("Název položky")]
        public virtual string Name { get; set; }

        #region IScriptHandler
        /// <summary>
        /// Skripty
        /// </summary>
        [DisplayName("skripta")]
        [Description("Seznam dostupných skript datové položky")]
        [EditorAttribute(typeof(ScriptListEditor), typeof(UITypeEditor))]
        [Browsable(false)]
        public GFEScriptList Scripts { get; set; }
        #endregion

        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get; set; }

        [Browsable(false)]
        [JsonIgnore]
        [XmlIgnore]
        public OfficeAtom Parent { get; set; }

        #region IComponent
        /// <exclude/>
        public event EventHandler Disposed;
        /// <exclude/>
        [Browsable(false)]
        public ISite Site { get; set; }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public virtual Dictionary<string, string> Unknowns
        {
            get => AttrList.FindAllByKey(key => !OfficeUtil.AtomItemKnownAttribut(key));
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose() { Disposed?.Invoke(this, EventArgs.Empty); }
        #endregion

        /// <summary>
        /// Identifikátor buňky
        /// </summary>
        [Browsable(false)]
        public string CellRef { get; set; }

        Comment excelComment;
        [JsonIgnore]
        [Browsable(false)]
        public Comment ExcellComment
        {
            get => excelComment;
            internal set
            {
                excelComment = value;
                if (excelComment != null)
                {
                    Excel.Range commentedCell = excelComment.Parent as Excel.Range;
                    string cellAddress = commentedCell.Address[false, false];
                    if (CellRef != cellAddress)
                        CellRef = cellAddress;
                    // aktualizaujeme komentář
                    excelComment?.Text(OfficeService.GetUpdatedCommentData(excelComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
                    Marshal.ReleaseComObject(commentedCell);
                }
            }
        }

        public OfficeAtomItem()
        {
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            Scripts = new GFEScriptList(UndoRedoService.Manager)
            {
                { "onData", string.Empty },
                { "onEnter", string.Empty },
                { "onLoad", string.Empty },
                { "onPrint", string.Empty }
            };
        }

        public OfficeAtomItem(string alternativeText) : base()
        {
            FromSerializeText(alternativeText);
        }

        internal virtual void Init(Dictionary<string, string> attributes, List<IVariable> variables)
        {
            InternalInit(attributes, variables);

            if (attributes != null)
            {
                AttrList.AddRange(attributes.FindAllByKey(key => !OfficeUtil.AtomItemKnownAttribut(key)));
                AttrList.SynchronizeByOrigin();
            }
        }

        protected void InternalInit(Dictionary<string, string> attributes, List<IVariable> variables)
        {
            if (attributes != null)
            {
                Guid = CommonService.GetParametr("guid", attributes);
                Name = CommonService.GetParametr("name", attributes);
                CellRef = CommonService.GetParametr("cell", attributes);

                Scripts["onData"] = CommonService.GetParametr("onData", attributes);
                Scripts["onEnter"] = CommonService.GetParametr("onEnter", attributes);
                Scripts["onLoad"] = CommonService.GetParametr("onLoad", attributes);
                Scripts["onPrint"] = CommonService.GetParametr("onPrint", attributes);
            }
        }

        /// <summary>
        /// Indikuje prázdnou položku
        /// </summary>
        /// <returns></returns>
        internal virtual bool IsEmpty() => Scripts.IsEmpty;

        internal virtual void SetAttributes(XmlElement xmlElement, XmlDocument xmlDoc, string namespaceUri, bool withGuid)
        {
            if (Unknowns != null && Unknowns.Count > 0)
                Unknowns.ForEach(item => xmlElement.SetAttribute(item.Key, item.Value));

            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item => xmlElement.SetAttribute(item.Key, item.Value));
            if (withGuid)
                xmlElement.SetAttribute("guid", Guid);
        }

        internal virtual OfficeAtomItem Clone()
        {
            OfficeAtomItem result = new OfficeAtomItem
            {
                AttrList = (GFEAttrList)AttrList.Clone(),
                Scripts = (GFEScriptList)Scripts.Clone()
            };
            return result;
        }

        /// <summary>
        /// Získání XML prezentace objektu
        /// </summary>
        /// <returns>XML formát objektu</returns>        
        public virtual string ToSerializeText()
        {
            try
            {
                XmlSerializer serializer = new XmlSerializer(typeof(OfficeAtomItem));
                // Serialize the object to a StringWriter or a StreamWriter.  
                using (StringWriter stringWriter = new StringWriter())
                {
                    serializer.Serialize(stringWriter, this);
                    return stringWriter.ToString();
                }
            }
            catch
            {
            }
            return JsonConvert.SerializeObject(this);
        }

        /// <summary>
        /// Získání objektu z textové prezentace
        /// </summary>
        /// <param name="data">Textová prezentace objektu</param>
        /// <param name="cellAddress">adresa buňky</param>
        /// <returns>Objekt položky atomu</returns>
        public static OfficeAtomItem FromSerializeText(string data, string cellAddress = null)
        {
            string lData = OfficeService.GetParametrFromComment(data, "data:");

            OfficeAtomItem result = null;
            if (!lData.IsNullOrEmpty())
            {
                try
                {
                    if (lData.IsWellFormedXML(out string outMessage))
                    {
                        XmlSerializer xmlSerializer = new XmlSerializer(typeof(OfficeAtomItem));
                        using (StringReader textReader = new StringReader(lData))
                            result = (OfficeAtomItem)xmlSerializer.Deserialize(textReader);
                    }
                }
                catch { }
                if (result == null)
                    result = (JsonConvert.DeserializeObject<OfficeAtomItem>(lData));
            }
            else
            {
                result = new OfficeAtomItem();
                result.Init(data, cellAddress);
            }

            string atomGuid = OfficeService.GetAtomGuid(data);
            if (!string.IsNullOrEmpty(atomGuid))
                result.Guid = atomGuid;

            result.Scripts.ScriptChanged += delegate (dynamic sender, EventArgs e)
            {
                result.ExcellComment?.Text(OfficeService.GetUpdatedCommentData(result.ExcellComment.Shape.AlternativeText, result.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            };
            return result;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="text">ve formátu: Textové pole: MSEBeginSectionBody: HLA[#35ed0507-be4d-453c-a957-ef75156af651#] </param>
        /// <param name="cellAddress">adresa buňky</param>
        /// <exception cref="NotImplementedException"></exception>
        protected void Init(string text, string cellAddress = null)
        {
            Name = OfficeService.GetName(text);
            Guid = OfficeService.GetGuid(text).ToString();
            if (cellAddress != null)
                CellRef = cellAddress;
        }

        /// <summary>
        /// Pokud se nejedná o klasický GUID, potom vykreslíme i GUID
        /// </summary>
        /// <returns></returns>
        public virtual string GetXml(ref StackProps stackProps, int sheet = 1)
        {
            string lName = GetSimleName(stackProps.RegionNames) ?? Name;
            string value = !string.IsNullOrEmpty(Guid) && Guid.Length != 36
                ? string.Format("<value-of name=\"{0}\" cell=\"{1}\" guid=\"{2}\"", lName, CellRef, Guid)
                : string.Format("<value-of name=\"{0}\" cell=\"{1}\"", lName, CellRef);

            if (Unknowns != null && Unknowns.Count > 0)
                Unknowns.ForEach(item => value += String.Format(" {0}=\"{1}\"", item.Key, item.Value));

            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item => value += String.Format(" {0}=\"{1}\"", item.Key, item.Value));

            value += "/>";

            return value;
        }

        /// <summary>
        /// Získání názvu položky dle aktuálního umístění
        /// </summary>
        /// <param name="currentStack">Seznam názvu aktuální cesty posuvníka</param>
        /// <returns>Jednoduchý název bez nadřazených regionů</returns>
        string GetSimleName(List<string> currentStack)
        {
            if (currentStack == null || currentStack.Count == 0 || Name == null)
                return null;

            // pokud Name neobsahuje tečku, pak se jedná o jednoduchý název
            if (!Name.Contains("."))
                return Name;

            // sjednotíme názvy v currentStack přes symbol tečky
            string currentPath = string.Join(".", currentStack);

            // najdeme oddělenéí názvy regionů
            // dáme je do seznamu bez posledního prvku
            List<string> fieldRegions = new List<string>(Name.Split('.'));
            // poslední prvek bude výsledný název, pokud regiony odpovídají aktuálnímu umístění
            string result = fieldRegions.Last();
            // odstraníme poslední prvek
            fieldRegions.RemoveAt(fieldRegions.Count - 1);

            while (fieldRegions.Count > 0)
            {
                string fieldPath = string.Join(".", fieldRegions);
                // pokud cesty jsou stejné nebo currentPath končí na .fieldPath
                if (fieldPath == currentPath || currentPath.EndsWith("." + fieldPath))
                    return result;
                // jinak ze seznamu fieldRegions odstraníme poslední prvek a přidáme ho přes tečku na začátek result
                result = fieldRegions.Last() + "." + result;
                fieldRegions.RemoveAt(fieldRegions.Count - 1);
            }

            return result;
        }
    }

    public class OfficeAtomRegionItem : OfficeAtomItem, IVariableHandler
    {
        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("název")]
        [Description("Název položky")]
        public override string Name { get; set; }

        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("identifikátor regionu")]
        [Description("Jednoznačný identifikátor regionu")]
        public override string Guid { get; set; }

        string filterOut;
        /// <summary>
        /// Filter-Out políčka
        /// </summary>
        [DisplayName("filter-out")]
        [Description("Atribut filter-out regionu")]
        public string FilterOut
        {
            get => filterOut;
            set
            {
                filterOut = value;
                ExcellComment?.Text(OfficeService.GetUpdatedCommentData(ExcellComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            }
        }

        string filterIn;
        /// <summary>
        /// Filter-In políčka
        /// </summary>
        [DisplayName("filter-in")]
        [Description("Atribut filter-in regionu")]
        public string FilterIn
        {
            get => filterIn;
            set
            {
                filterIn = value;
                ExcellComment?.Text(OfficeService.GetUpdatedCommentData(ExcellComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            }
        }

        string onlyIf;
        /// <summary>
        /// only-if políčka
        /// </summary>
        [DisplayName("only-if")]
        [Description("Atribut only-if regionu")]
        public string OnlyIf
        {
            get => onlyIf;
            set
            {
                onlyIf = value;
                ExcellComment?.Text(OfficeService.GetUpdatedCommentData(ExcellComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            }
        }

        string orderBy;
        /// <summary>
        /// order-by políčka
        /// </summary>
        [DisplayName("order-by")]
        [Description("Atribut order-by regionu")]
        public string OrderBy
        {
            get => orderBy;
            set
            {
                orderBy = value;
                ExcellComment?.Text(OfficeService.GetUpdatedCommentData(ExcellComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            }
        }

        /// <summary>
        /// proměnné regionu
        /// </summary>
        [Browsable(false)]
        public IListComponent<IVariable> Variables { get; protected set; }

        /// <summary>
        /// Indikuje prázdnou položku
        /// </summary>
        /// <returns></returns>
        internal override bool IsEmpty() => Scripts.IsEmpty && FilterOut.IsNullOrEmpty() && FilterIn.IsNullOrEmpty();

        string GetSimpleRegionName(List<string> currentStack)
        {
            if (Name == null)
                return null;

            if (!Name.Contains("."))
                return Name;

            if (currentStack == null || currentStack.Count == 0)
            {
                string[] rootNames = Name.Split('.');
                return rootNames.Length > 0 ? rootNames.Last() : Name;
            }

            string currentPath = string.Join(".", currentStack);
            List<string> regionParts = new List<string>(Name.Split('.'));
            string result = regionParts.Last();
            regionParts.RemoveAt(regionParts.Count - 1);

            while (regionParts.Count > 0)
            {
                string regionPath = string.Join(".", regionParts);
                if (regionPath == currentPath || currentPath.EndsWith("." + regionPath))
                    return result;

                result = regionParts.Last() + "." + result;
                regionParts.RemoveAt(regionParts.Count - 1);

                if (result.Count(c => c == '.') >= 1)
                    return result;
            }

            return result;
        }

        public OfficeAtomRegionItem()
        {
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            Scripts = new GFEScriptList(UndoRedoService.Manager)
            {
                { "onData", string.Empty },
                { "onEnter", string.Empty },
                { "onLoad", string.Empty },
                { "onPrint", string.Empty }
            };
            Variables = new UndoRedoList<IVariable>(UndoRedoService.Manager);
        }

        internal override void SetAttributes(XmlElement xmlElement, XmlDocument xmlDoc, string namespaceUri, bool withGuid)
        {
            if (!FilterOut.IsNullOrEmpty())
                xmlElement.SetAttribute("filter-out", FilterOut);
            if (!FilterIn.IsNullOrEmpty())
                xmlElement.SetAttribute("filter-in", FilterIn);
            if (!OnlyIf.IsNullOrEmpty())
                xmlElement.SetAttribute("only-if", OnlyIf);
            if (!OrderBy.IsNullOrEmpty())
                xmlElement.SetAttribute("order-by", OrderBy);
            if (Unknowns != null && Unknowns.Count > 0)
                Unknowns.ForEach(item => xmlElement.SetAttribute(item.Key, item.Value));
            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item => xmlElement.SetAttribute(item.Key, item.Value));
            if (Variables != null && (Variables as System.Collections.ICollection).Count != 0)
                Variables.ForEach(item =>
                {
                    XmlElement xmlVar = xmlDoc.CreateElement("variable", namespaceUri);
                    xmlVar.SetAttribute("name", item.Name);
                    xmlVar.SetAttribute("value", item.ValueScript);
                    xmlVar.SetAttribute("datatype", item.DataType);
                    xmlElement.AppendChild(xmlVar);
                });
            if (withGuid)
                xmlElement.SetAttribute("guid", Guid);
        }

        public override string GetXml(ref StackProps stackProps, int sheet = 1)
        {
            bool needGuid = false;
            string result = "<region";
            string regionName = GetSimpleRegionName(stackProps.RegionNames) ?? Name;

            if (!string.IsNullOrEmpty(regionName))
            {
                result += String.Format(" name=\"{0}\"", regionName);
                stackProps.RegionNames.Add(regionName);
                stackProps.CurrentStack.Add(new StackObject { Type = "region", Name = regionName });
            }
            if (sheet != 1)
                result += String.Format(" sheet=\"{0}\"", sheet);

            if (!string.IsNullOrEmpty(FilterOut))
            {
                result += String.Format(" filter-out=\"{0}\"", FilterOut);
                needGuid |= true;
            }
            if (!string.IsNullOrEmpty(FilterIn))
            {
                result += String.Format(" filter-in=\"{0}\"", FilterIn);
                needGuid |= true;
            }
            if (!string.IsNullOrEmpty(OnlyIf))
            {
                result += String.Format(" only-if=\"{0}\"", OnlyIf);
                needGuid |= true;
            }
            if (!string.IsNullOrEmpty(OrderBy))
            {
                result += String.Format(" order-by=\"{0}\"", OrderBy);
                needGuid |= true;
            }
            if (Unknowns != null && Unknowns.Count > 0)
            {
                Unknowns.ForEach(item => result += String.Format(" {0}=\"{1}\"", item.Key, item.Value));
                needGuid |= true;
            }
            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item =>
                {
                    result += String.Format(" {0}=\"{1}\"", item.Key, item.Value);
                    needGuid |= true;
                });

            if (needGuid && !string.IsNullOrEmpty(Guid))
                result += String.Format(" guid=\"{0}\"", Guid);
            result += ">";

            if (Variables != null && (Variables as System.Collections.ICollection).Count != 0)
                Variables.ForEach(item =>
                {
                    string varText = "<variable";
                    varText += String.Format(" name=\"{0}\"", item.Name);
                    varText += String.Format(" value=\"{0}\"", item.ValueScript);
                    varText += String.Format(" datatype=\"{0}\"", item.DataType);
                    varText += "/>";
                    result += "\r\n" + varText;
                });
            return result;
        }

        internal override void Init(Dictionary<string, string> attributes, List<IVariable> variables)
        {
            InternalInit(attributes, variables);
            if (attributes != null)
            {
                FilterOut = CommonService.GetParametr("filter-out", attributes);
                FilterIn = CommonService.GetParametr("filter-in", attributes);
                OrderBy = CommonService.GetParametr("order-by", attributes);
                OnlyIf = CommonService.GetParametr("only-if", attributes);

                AttrList.AddRange(attributes.FindAllByKey(key => !OfficeUtil.AtomRegionItemKnownAttribut(key)));
                AttrList.SynchronizeByOrigin();
            }
            if (variables != null)
                Variables.AddRange(variables);
        }

        /// <summary>
        /// Získání XML prezentace objektu
        /// </summary>
        /// <returns>XML formát objektu</returns>        
        public override string ToSerializeText()
        {
            try
            {
                XmlSerializer serializer = new XmlSerializer(typeof(OfficeAtomRegionItem));
                // Serialize the object to a StringWriter or a StreamWriter.  
                using (StringWriter stringWriter = new StringWriter())
                {
                    serializer.Serialize(stringWriter, this);
                    return stringWriter.ToString();
                }
            }
            catch
            {
            }
            return JsonConvert.SerializeObject(this);
        }

        /// <summary>
        /// Získání objektu z textové prezentace
        /// </summary>
        /// <param name="data">Textová prezentace objektu</param>
        /// <param name="cellAddress">adresa buňky</param>
        /// <returns>Objekt položky atomu</returns>
        public static new OfficeAtomRegionItem FromSerializeText(string data, string cellAddress = null)
        {
            string lData = OfficeService.GetParametrFromComment(data, "data:");
            OfficeAtomRegionItem result = null;
            if (!lData.IsNullOrEmpty())
            {

                try
                {
                    if (lData.IsWellFormedXML(out string outMessage))
                    {
                        XmlSerializer xmlSerializer = new XmlSerializer(typeof(OfficeAtomRegionItem));
                        using (StringReader textReader = new StringReader(lData))
                            result = (OfficeAtomRegionItem)xmlSerializer.Deserialize(textReader);
                    }
                }
                catch
                {
                }

                if (result == null)
                {
                    try
                    {
                        result = JsonConvert.DeserializeObject<OfficeAtomRegionItem>(lData);
                    }
                    catch
                    {
                    }
                }
            }
            else
            {
                result = new OfficeAtomRegionItem();
                result.Init(data, cellAddress);
            }

            result.Scripts.ScriptChanged += delegate (dynamic sender, EventArgs e)
            {
                result.ExcellComment?.Text(OfficeService.GetUpdatedCommentData(result.ExcellComment.Shape.AlternativeText, result.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            };
            return result;
        }

    }

    public class OfficeAtomGroupItem : OfficeAtomItem
    {

        string guid;
        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        [ReadOnly(false)]
        [DisplayName("identifikátor skupiny")]
        [Description("Jednoznačný identifikátor skupiny")]
        public override string Guid
        {
            get => guid; set
            {
                guid = value;
                ExcellComment?.Text(OfficeService.GetUpdatedCommentData(ExcellComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            }
        }

        string groupBy;
        /// <summary>
        /// order-by políčka
        /// </summary>
        [DisplayName("seskupit dle")]
        [Description("Atribut by skupiny")]
        public string GroupBy
        {
            get => groupBy;
            set
            {
                groupBy = value;
                ExcellComment?.Text(OfficeService.GetUpdatedCommentData(ExcellComment.Shape.AlternativeText, ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            }
        }

        internal override void Init(Dictionary<string, string> attributes, List<IVariable> variables)
        {
            InternalInit(attributes, variables);
            if (attributes != null)
            {
                GroupBy = CommonService.GetParametr("by", attributes);

                AttrList.AddRange(attributes.FindAllByKey(key => !OfficeUtil.AtomItemGroupKnownAttribut(key)));
                AttrList.SynchronizeByOrigin();
            }
        }

        /// <summary>
        /// Získání XML prezentace objektu
        /// </summary>
        /// <returns>XML formát objektu</returns>        
        public override string ToSerializeText()
        {
            try
            {
                XmlSerializer serializer = new XmlSerializer(typeof(OfficeAtomGroupItem));
                // Serialize the object to a StringWriter or a StreamWriter.  
                using (StringWriter stringWriter = new StringWriter())
                {
                    serializer.Serialize(stringWriter, this);
                    return stringWriter.ToString();
                }
            }
            catch
            {
            }
            return JsonConvert.SerializeObject(this);
        }

        /// <summary>
        /// Získání objektu z textové prezentace
        /// </summary>
        /// <param name="data">Textová prezentace objektu</param>
        /// <param name="cellAddress">adresa buňky</param>
        /// <returns>Objekt položky atomu</returns>
        public static new OfficeAtomGroupItem FromSerializeText(string data, string cellAddress = null)
        {
            string lData = OfficeService.GetParametrFromComment(data, "data:");
            OfficeAtomGroupItem result = null;
            if (!lData.IsNullOrEmpty())
            {
                try
                {
                    if (lData.IsWellFormedXML(out string outMessage))
                    {
                        XmlSerializer xmlSerializer = new XmlSerializer(typeof(OfficeAtomGroupItem));
                        using (StringReader textReader = new StringReader(lData))
                            result = (OfficeAtomGroupItem)xmlSerializer.Deserialize(textReader);
                    }
                }
                catch
                {
                }
                if (result == null)
                {
                    try
                    {
                        result = JsonConvert.DeserializeObject<OfficeAtomGroupItem>(lData);
                    }
                    catch
                    {
                    }
                }
            }
            else
            {
                result = new OfficeAtomGroupItem();
                result.Init(data, cellAddress);
            }
            result.Scripts.ScriptChanged += delegate (dynamic sender, EventArgs e)
            {
                result.ExcellComment?.Text(OfficeService.GetUpdatedCommentData(result.ExcellComment.Shape.AlternativeText, result.ToSerializeText()), CommonService.MISSVALUE, CommonService.MISSVALUE);
            };
            return result;
        }

        internal override void SetAttributes(XmlElement xmlElement, XmlDocument xmlDoc, string namespaceUri, bool withGuid)
        {
            if (!GroupBy.IsNullOrEmpty())
                xmlElement.SetAttribute("by", GroupBy);

            if (Unknowns != null && Unknowns.Count > 0)
                Unknowns.ForEach(item => xmlElement.SetAttribute(item.Key, item.Value));

            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item => xmlElement.SetAttribute(item.Key, item.Value));

            xmlElement.SetAttribute("guid", Guid);
        }

        public override string GetXml(ref StackProps stackProps, int sheet = 1)
        {
            string result = "<group";
            if (!string.IsNullOrEmpty(Name))
                result += String.Format(" name=\"{0}\"", Name);
            if (!string.IsNullOrEmpty(GroupBy))
                result += String.Format(" by=\"{0}\"", GroupBy);
            if (Unknowns != null && Unknowns.Count > 0)
                Unknowns.ForEach(item => result += String.Format(" {0}=\"{1}\"", item.Key, item.Value));
            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item => result += String.Format(" {0}=\"{1}\"", item.Key, item.Value));
            if (!string.IsNullOrEmpty(Guid))
                result += String.Format(" guid=\"{0}\"", Guid);
            result += ">";
            return result;
        }

    }

    public class OfficeAtom
    {

        /// <summary>
        /// Dostupné atributy objektu
        /// </summary>
        public Dictionary<string, string> Attributes = new Dictionary<string, string>();
        List<IVariable> Variables = new List<IVariable>();

        List<OfficeAtom> Head = new List<OfficeAtom>();
        List<OfficeAtom> Body = new List<OfficeAtom>();
        List<OfficeAtom> Foot = new List<OfficeAtom>();
        List<OfficeAtom> Children = new List<OfficeAtom>();
        List<OfficeAtom> Groups = new List<OfficeAtom>();

        /// <summary>
        /// Ukazatel na atom sekce se kterou se aktuálně pracuje
        /// </summary>
        OfficeAtom sectionPointer;
        OfficeAtom parent;

        /// <summary>
        /// Jednoznačný identifikátor objektu
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Položka pro PROPERTY GRID
        /// </summary>
        public OfficeAtomItem Item { get; set; }
        string atomType, pointer_type;

        internal void Init(dynamic dyn, List<dynamic> dynamics)
        {
            if (dyn is GFEFormatRegion reg)
            {
                if (reg.Attributes.Count > 0)
                    LoadAttributes(reg.Attributes);

                if (reg.Variables.Count > 0)
                    LoadVariables(reg.Variables);

                if (reg.Name != "ROOT")
                {
                    // nastavíme objekt až po načtení atributů, aby se neztratil name/guid/cell
                    Item = new OfficeAtomRegionItem()
                    {
                        Parent = this
                    };
                    Item.Init(Attributes, Variables);
                    dynamics.Add(Item);
                }

                // do regionu teď přidáme skupiny pokud existuji
                // a zároveň získáme poslední skupinu, 
                // které následně patří vnořené regiony ze sekce BODY daného regionu
                if (reg.Groups.Count != 0)
                    LoadGroups(reg.Groups, dynamics);

                if (reg.Head.Count > 0)
                    LoadHead(reg.Head, dynamics);
                if (reg.Body.Count > 0)
                    LoadBody(reg.Body, dynamics);
                if (reg.Foot.Count > 0)
                    LoadFoot(reg.Foot, out _, dynamics);
            }
            else if (dyn is GFEFormatGroup grp)
            {
                atomType = "group";
                if (!grp.Name.IsNullOrEmpty())
                    Attributes.Add("name", grp.Name);
                if (!grp.Grouping.IsNullOrEmpty())
                    Attributes.Add("by", grp.Grouping);

                if (grp.Head.Count > 0)
                    LoadHead(grp.Head, dynamics);
                if (grp.Foot.Count > 0)
                {
                    LoadFoot(grp.Foot, out string guid, dynamics);
                    if (!string.IsNullOrEmpty(guid))
                        Attributes.Add("guid", guid);
                }

                Item = new OfficeAtomGroupItem()
                {
                    Parent = this
                };
                Item.Init(Attributes, Variables);
                dynamics.Add(Item);
            }
            else if (dyn is GFEFormatTag tag)
            {
                if (tag.Attributes.Count > 0)
                    LoadAttributes(tag.Attributes);
                if (tag.Children.Count > 0)
                    LoadChildren(tag.Children, dynamics);
                if ("value-of".Equals(tag.TagName))
                    atomType = "value-of";

                Item = new OfficeAtomItem()
                {
                    Parent = this
                };
                Item.Init(Attributes, Variables);
                dynamics.Add(Item);
            }
        }

        void LoadGroups(List<GFEFormatGroup> groups, List<dynamic> dynamics) =>
            groups.ForEach(item =>
            {
                OfficeAtom atm = Create(item, dynamics);
                if (!atm.IsEmpty())
                    Groups.Add(atm);
            });

        void LoadVariables(List<GFEFormatVariable> variables) => variables.ForEach(item => Variables.Add(new VariableNode(item)));

        void LoadAttributes(GFEList attributes) => attributes.ForEach(item => Attributes.Add(item.Key, item.Value));

        void LoadFoot(List<GFEFormatTag> foot, out string guid, List<dynamic> dynamics)
        {
            guid = string.Empty;
            foreach (var item in foot)
                if (item.Attributes.ContainsKey("guid"))
                {
                    guid = item.Attributes.GetValueDefault("guid");
                    break;
                }

            foot.ForEach(item =>
            {
                OfficeAtom atm = Create(item, dynamics);
                if (!atm.IsEmpty())
                    Foot.Add(atm);
            });
        }

        void LoadBody(List<GFEFormatTag> body, List<dynamic> dynamics) =>
            body.ForEach(item =>
            {
                OfficeAtom atm = Create(item, dynamics);
                if (!atm.IsEmpty())
                    if ("block".Equals(item.TagName))
                        LoadChildren(atm.Children);
                    else
                        Body.Add(atm);
            });

        void LoadChildren(List<OfficeAtom> children) =>
            children.ForEach(child =>
            {
                if (child is OfficeAtom)
                {
                    Children.Add(child);
                    child.parent = this;
                }
            });
        void LoadChildren(List<GFEFormatTag> children, List<dynamic> dynamics) =>
            children.ForEach(child =>
            {
                OfficeAtom atm = Create(child, dynamics);
                if (!atm.IsEmpty())
                    Children.Add(atm);
            });

        void LoadHead(List<GFEFormatTag> head, List<dynamic> dynamics) =>
            head.ForEach(item =>
            {
                OfficeAtom atm = Create(item, dynamics);
                if (!atm.IsEmpty())
                    Head.Add(atm);
            });

        bool IsEmpty() => Head.Count == 0 && Body.Count == 0 && Foot.Count == 0 && Children.Count == 0 && atomType.IsNullOrEmpty() && Attributes.Count == 0;

        OfficeAtom Create(GFEFormatGroup group, List<dynamic> dynamics)
        {
            OfficeAtom result = new OfficeAtom() { parent = this };
            result.Init(group, dynamics);
            return result;
        }

        OfficeAtom Create(GFEFormatTag item, List<dynamic> dynamics)
        {
            OfficeAtom result = new OfficeAtom() { parent = this };
            result.Init(item, dynamics);
            return result;
        }

        OfficeAtom GetPointerBySheetIndex(int index)
        {
            return Body.FirstOrDefault(item => (item.Attributes.ContainsKey(CommonService.SHEET)
            && item.Attributes.GetValueOrDefault(CommonService.SHEET).Equals(index.ToString()))
            || (!item.Attributes.ContainsKey(CommonService.SHEET) && index == 1));
        }

        List<Guid> existsGuidlist;
        internal void SyncWithComments(int sheetIndex, Excel.Comments comments)
        {
            if (comments?.Count == 0)
                return;

            existsGuidlist = new List<Guid>();

            try
            {
                sectionPointer = GetPointerBySheetIndex(sheetIndex);
                for (int i = 1; i <= comments.Count; i++)
                    SyncComment(comments[i]);
            }
            catch (Exception ex) { LoggingService.Error(ex.Message, ex); }
        }


        /// <summary>
        /// Synchronizuje atom vůči komentáři, pokud atom neexistuje, vytvoří ho
        /// </summary>
        /// <param name="comment">komentář</param>
        void SyncComment(Excel.Comment comment)
        {
            if (comment == null)
                return;

            Excel.Range commentedCell = comment.Parent as Excel.Range;
            // Get the row and column numbers  
            //int rowNumber = commentedCell.Row;
            //int columnNumber = commentedCell.Column;
            string cellAddress = commentedCell.Address[false, false];
            LoggingService.Info(String.Format("Zpracování buňky {0}", cellAddress));

            // jinak zafixujeme text komentáře ...
            string text = comment.Shape.AlternativeText;
            string name = OfficeService.GetName(text);
            if (name == null)
                return;

            // is group
            bool isGroup = OfficeService.IsGroupByComment(text);
            string groupId = isGroup ? OfficeService.GetGroupGuid(text) : string.Empty;

            // odřízneme "Textové pole:"
            text = text.Substring(text.IndexOf(":") + 1).Trim();

            // jedná se o položku?
            if (text.Contains(CommonService.MSE_FIELD))
            {
                OfficeAtom childAtom = FindChild(name, comment.Shape.ID, cellAddress);

                // provedeme synchronizaci vlastností objektů
                comment.Text(Sync(childAtom, text, comment.Shape.ID, cellAddress), CommonService.MISSVALUE, CommonService.MISSVALUE);
                return;
            }

            if (!text.Contains(CommonService.MSE_END_Section) && (isGroup || !name.Equals(CommonService.GetParametr("name", sectionPointer.Attributes))))
            {
                // se jedná o nový region? - najdeme ho mezí vnořenými objekty
                OfficeAtom element = isGroup
                    ? sectionPointer.Groups.FirstOrNull(item => FindAtomPredicGroup(item, cellAddress, groupId))
                    : sectionPointer.Body.FirstOrNull(item => FindAtomPredic(item, name, comment.Shape.ID, cellAddress));
                if (element != null)
                    SetCellAddress(element, cellAddress);
                else
                {
                    element = new OfficeAtom
                    {
                        parent = sectionPointer,
                        Item = new OfficeAtomItem() { CellRef = cellAddress }
                    };
                    sectionPointer.Body.Add(element);
                    sectionPointer = element;
                }
            }
            else if (name.Equals(CommonService.GetParametr("name", sectionPointer.Attributes)))
                // se jedná o novou skupinu? - najdeme ho mezí vnořenými objekty
                SetCellAddress(sectionPointer.Groups.FirstOrNull(item => FindAtomPredicGroup(item, comment.Shape.ID)), cellAddress);

            if (!text.Contains(CommonService.MSE_END_Section))
            {
                // provedeme synchronizaci vlastností objektů
                comment.Text(Sync(sectionPointer, text, comment.Shape.ID, cellAddress), CommonService.MISSVALUE, CommonService.MISSVALUE);

                //potřebuji aby ukazoval pouze na začátky regionů, aby bylo možné dohledat child
                if (sectionPointer.ID != comment.Shape.ID)
                    sectionPointer.ID = comment.Shape.ID;
            }

            if (text.Contains(CommonService.MSE_BEGIN_SECTION_HEADER))
                pointer_type = CommonService.HEADER;
            else if (text.Contains(CommonService.MSE_BEGIN_SECTION_BODY))
                pointer_type = CommonService.BODY;
            else if (text.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER))
                pointer_type = CommonService.FOOTER;
            else
            {
                // jedná se o konec sekce
                pointer_type = CommonService.BODY;
                sectionPointer = (sectionPointer.Item is OfficeAtomGroupItem) ? sectionPointer.parent.parent : sectionPointer.parent;
            }
        }
        ///// <summary>
        ///// Synchronizuje atom vůči komentáři, pokud atom neexistuje, vytvoří ho
        ///// </summary>
        ///// <param name="comment">komentář</param>
        //void SyncComment(Excel.Comment comment)
        //{
        //    if (comment == null)
        //        return;

        //    Excel.Range commentedCell = comment.Parent as Excel.Range;
        //    // Get the row and column numbers  
        //    //int rowNumber = commentedCell.Row;
        //    //int columnNumber = commentedCell.Column;
        //    string cellAddress = commentedCell.Address[false, false];
        //    LoggingService.Info(String.Format("Zpracování buňky {0}", cellAddress));

        //    // jinak zafixujeme text komentáře ...
        //    string text = comment.Shape.AlternativeText;
        //    string name = OfficeService.GetName(text);
        //    if (name == null)
        //        return;

        //    // is group
        //    bool isGroup = OfficeService.IsGroupByComment(text);
        //    string groupId = isGroup ? OfficeService.GetGroupGuid(text) : string.Empty;

        //    // odřízneme "Textové pole:"
        //    text = text.Substring(text.IndexOf(":") + 1).Trim();

        //    // jedná se o položku?
        //    if (text.Contains(CommonService.MSE_FIELD))
        //    {
        //        OfficeAtom childAtom = FindChild(name, comment.Shape.ID, cellAddress);

        //        // provedeme synchronizaci vlastností objektů
        //        comment.Text(Sync(childAtom, text, comment.Shape.ID, cellAddress), CommonService.MISSVALUE, CommonService.MISSVALUE);
        //        return;
        //    }

        //    if (!text.Contains(CommonService.MSE_END_Section) && (isGroup || !name.Equals(CommonService.GetParametr("name", sectionPointer.Attributes))))
        //    {
        //        // se jedná o nový region? - najdeme ho mezí vnořenými objekty
        //        OfficeAtom element = isGroup
        //            ? sectionPointer.Groups.FirstOrNull(item => FindAtomPredicGroup(item, cellAddress, groupId))
        //            : sectionPointer.Body.FirstOrNull(item => FindAtomPredic(item, name, comment.Shape.ID, cellAddress));
        //        if (element != null)
        //            SetCellAddress(element, cellAddress);
        //        else
        //        {
        //            element = new OfficeAtom
        //            {
        //                parent = sectionPointer,
        //                Item = new OfficeAtomItem() { CellRef = cellAddress }
        //            };
        //            sectionPointer.Body.Add(element);
        //            sectionPointer = element;
        //        }
        //    }
        //    else if (name.Equals(CommonService.GetParametr("name", sectionPointer.Attributes)))
        //        // se jedná o novou skupinu? - najdeme ho mezí vnořenými objekty
        //        SetCellAddress(sectionPointer.Groups.FirstOrNull(item => FindAtomPredicGroup(item, comment.Shape.ID)), cellAddress);

        //    if (!text.Contains(CommonService.MSE_END_Section))
        //    {
        //        // provedeme synchronizaci vlastností objektů
        //        comment.Text(Sync(sectionPointer, text, comment.Shape.ID, cellAddress), CommonService.MISSVALUE, CommonService.MISSVALUE);

        //        //potřebuji aby ukazoval pouze na začátky regionů, aby bylo možné dohledat child
        //        if (sectionPointer.ID != comment.Shape.ID)
        //            sectionPointer.ID = comment.Shape.ID;
        //    }

        //    if (text.Contains(CommonService.MSE_BEGIN_SECTION_HEADER))
        //        pointer_type = CommonService.HEADER;
        //    else if (text.Contains(CommonService.MSE_BEGIN_SECTION_BODY))
        //        pointer_type = CommonService.BODY;
        //    else if (text.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER))
        //        pointer_type = CommonService.FOOTER;
        //    else
        //    {
        //        // jedná se o konec sekce
        //        pointer_type = CommonService.BODY;
        //        sectionPointer = (sectionPointer.Item is OfficeAtomGroupItem) ? sectionPointer.parent.parent : sectionPointer.parent;
        //    }
        //}

        void SetCellAddress(OfficeAtom element, string cellAddress)
        {
            if (element != null)
            {
                if (element.Item != null)
                    element.Item.CellRef = cellAddress;
                else
                    element.Item = new OfficeAtomItem() { CellRef = cellAddress };
                sectionPointer = element;
            }
        }

        /// <summary>
        /// Synchronizace objektů šablony s objekty ALF
        /// </summary>
        /// <param name="activeAtom">Aktuální atomární objekt</param>
        /// <param name="text">Text oblasti</param>
        /// <param name="id">Jednoznačný identifikátor oblasti</param>
        /// <param name="cellRef">Odkaza na buňku v Excell</param>
        string Sync(OfficeAtom activeAtom, string text, int id, string cellRef)
        {
            Guid guid = OfficeService.GetGuid(text);
            string name = OfficeService.GetName(text);

            // pokud aktivní atom není, pak se jedná o objekt šablony bez objektu struktury
            if (activeAtom == null)
            {
                var existingAtom = GetByGuid(guid, id);
                // vytvoříme nový objekt bez guid pro zajištění unikatnosti
                if (existingAtom != null)
                {
                    activeAtom = existingAtom.Clone();
                    activeAtom.ID = id;
                    guid = Guid.Empty;
                }
                else
                    activeAtom = new OfficeAtom() { parent = sectionPointer, Item = new OfficeAtomItem() { Parent = activeAtom }, ID = id };

                if (CommonService.HEADER.Equals(pointer_type))
                    sectionPointer.Head.Add(activeAtom);
                else if (CommonService.BODY.Equals(pointer_type))
                    sectionPointer.Children.Add(activeAtom);
                else if (CommonService.FOOTER.Equals(pointer_type))
                    sectionPointer.Foot.Add(activeAtom);
            }

            if (!(activeAtom.Item is OfficeAtomGroupItem))
            {
                string lGuid = CommonService.GetParametr("guid", activeAtom.Attributes);
                if (guid == Guid.Empty || existsGuidlist.Contains(guid))
                {

                    if (!lGuid.IsNullOrEmpty() && !Guid.TryParse(lGuid, out guid))
                        // jedná se o chybný formát GUID
                        lGuid = string.Empty;
                    if (guid == Guid.Empty || existsGuidlist.Contains(guid))
                        guid = Guid.NewGuid();

                    text = OfficeService.ReplaceGUID(text, guid);

                    if (lGuid.IsNullOrEmpty())
                    {
                        if (activeAtom.Item == null)
                            activeAtom.Item = new OfficeAtomItem() { Parent = activeAtom };

                        activeAtom.Item.Guid = Convert.ToString(guid);
                        CommonService.AddParametr("guid", activeAtom.Item.Guid, activeAtom.Attributes);
                    }
                }
                // pokud jednoznačné identifikátory nesedí, potom sjednotíme identifikátor šablony
                else if (!Convert.ToString(guid).Equals(lGuid))
                {
                    // pokud GUID objektu je špatný, pak ho aktualizujeme dle šablony
                    if (!Guid.TryParse(lGuid, out Guid guid_))
                    {
                        if (activeAtom.Item == null)
                            activeAtom.Item = new OfficeAtomItem() { Parent = activeAtom };

                        activeAtom.Item.Guid = Convert.ToString(guid);
                        CommonService.AddParametr("guid", activeAtom.Item.Guid, activeAtom.Attributes);

                    }
                    else
                        // jinak aktualizujeme GUID šablony dle objektu
                        text = text.Replace(Convert.ToString(guid), lGuid);
                }
            }

            if (activeAtom.Item != null && activeAtom.Item.Name.IsNullOrEmpty() && !name.IsNullOrEmpty())
            {
                activeAtom.Item.Name = name;
                CommonService.AddParametr("name", activeAtom.Item.Name, activeAtom.Attributes);
            }

            if (activeAtom.ID == 0)
                activeAtom.ID = id;
            existsGuidlist.Add(guid);

            // seralizujeme objekt do komentáře
            activeAtom.Item.CellRef = cellRef;
            string sData = activeAtom.Item.ToSerializeText();
            if (!sData.IsNullOrEmpty())
                text += String.Format("[#data:{0}#]", sData);

            return text;
        }

        OfficeAtom FindChild(string name, int id, string cellAddress) =>
            CommonService.BODY.Equals(pointer_type) ? sectionPointer.Children.FirstOrNull(item => FindAtomPredic(item, name, id, cellAddress))
                : CommonService.HEADER.Equals(pointer_type) ? FindChild(sectionPointer.Head, name, id, cellAddress)
                : CommonService.FOOTER.Equals(pointer_type) ? FindChild(sectionPointer.Foot, name, id, cellAddress)
                : null;

        OfficeAtom FindChild(List<OfficeAtom> head, string name, int id, string cellAddress)
        {
            foreach (var item in head)
            {
                OfficeAtom atm = item.Children.FirstOrNull(subItem => FindAtomPredic(subItem, name, id, cellAddress));
                if (atm != null)
                    return atm;
            }
            return null;
        }

        bool FindAtomPredicGroup(OfficeAtom item, string cellAddress, string groupId) =>
            cellAddress.Equals(item.Item?.CellRef) || item.Attributes.GetValueOrDefault("guid").Equals(groupId);

        bool FindAtomPredic(OfficeAtom item, string name, int id, string cellAddress)
        {
            if (cellAddress.Equals(item.Item?.CellRef))
                return true;

            string fname = GetFullName(item);
            return (item.ID == 0 || item.ID == id) && (name.Equals(fname) || (fname != null && fname.EndsWith("." + name)));
        }

        bool FindAtomPredicGroup(OfficeAtom item, int id) => (item.ID == 0 || item.ID == id);

        string GetFullName(OfficeAtom item)
        {
            string name = CommonService.GetParametr("name", item.Attributes);
            if (item.parent != null && !name.IsNullOrEmpty())
            {
                string lName = GetFullName(item.parent);
                if (!lName.IsNullOrEmpty())
                    name = lName + "." + name;
            }
            return name;
        }

        OfficeAtom Clone()
        {
            OfficeAtom oa = new OfficeAtom
            {
                Item = Item.Clone()
            };
            Attributes.FindAllByKey(key => !key.Equals("name") && !key.Equals("guid") && !key.Equals("cell")).ForEach(item => oa.Attributes.Add(item.Key, item.Value));
            return oa;
        }

        OfficeAtom getAtomByID(string id)
        {
            OfficeAtom atm = sectionPointer;
            while (atm.parent != null)
                atm = atm.parent;
            return getAtomByID(atm, id);
        }

        bool existsAtom(Guid guid, int ID) => getAtomByGuid(guid, ID) != null;

        OfficeAtom getAtomByGuid(Guid guid, int ID)
        {
            OfficeAtom atm = sectionPointer;
            while (atm.parent != null)
                atm = atm.parent;
            return GetByGuid(guid, ID, atm);
        }

        OfficeAtom getAtomByID(OfficeAtom atm, string id)
        {
            OfficeAtom oa = atm.Children.FirstOrNull(item => Convert.ToString(item.ID).Equals(id));
            if (oa != null)
                return oa;

            oa = atm.Head.FirstOrNull(item => Convert.ToString(item.ID).Equals(id));
            if (oa != null)
                return oa;
            oa = atm.Foot.FirstOrNull(item => Convert.ToString(item.ID).Equals(id));
            if (oa != null)
                return oa;
            foreach (var item in atm.Body)
            {
                oa = getAtomByID(item, id);
                if (oa != null)
                    return oa;
            }
            return null;
        }
        bool sameGui(OfficeAtom item, string guid, int ID, string cellAddress) => CommonService.GetParametr("guid", item.Attributes).Equals(guid) && item.ID == ID || cellAddress.Equals(item.Item?.CellRef);
        bool sameGui(OfficeAtom item, string guid, int ID) => CommonService.GetParametr("guid", item.Attributes).Equals(guid) && item.ID == ID;
        bool sameGui(OfficeAtom item, string guid, string cellAddress) => CommonService.GetParametr("guid", item.Attributes).Equals(guid) || cellAddress.Equals(item.Item?.CellRef);
        bool sameGui(OfficeAtom item, string guid) => CommonService.GetParametr("guid", item.Attributes).Equals(guid);
        internal OfficeAtom GetByGuid(Guid guid, int ID, string cellAddress, OfficeAtom item = null) => GetByGuid(Convert.ToString(guid), ID, cellAddress, item);
        internal OfficeAtom GetByGuid(string guid, int ID, string cellAddress, OfficeAtom item = null)
        {
            item = item ?? this;

            OfficeAtom result = sameGui(item, guid, ID, cellAddress)
                ? item
                : (GetByGuidInChildren(item.Head, guid, ID, cellAddress, item)
                ?? GetByGuidInChildren(item.Foot, guid, ID, cellAddress, item)
                ?? item.Children.Find(_item => sameGui(_item, guid, ID, cellAddress))
                ?? GetByGuidInChildren(item.Body, guid, ID, cellAddress, item));
            //if (result == null)
            //    foreach (OfficeAtom oa in item.Body)
            //    {
            //        result = GetByGuid(guid, ID, cellAddress, oa);
            //        if (result != null)
            //            return result;
            //    }
            //if (result == null)
            //    foreach (OfficeAtom oa in item.Body)
            //    {
            //        result = GetByGuid(guid, cellAddress, oa);
            //        if (result != null)
            //            return result;
            //    }

            return result;

        }

        private OfficeAtom GetByGuidInChildren(List<OfficeAtom> sekce, string guid, int iD, string cellAddress, OfficeAtom item)
        {
            foreach (OfficeAtom subItem in sekce)
            {
                OfficeAtom atm = GetByGuid(guid, iD, cellAddress, subItem);
                //subItem.Children.Find(_item => sameGui(_item, guid, ID, cellAddress));
                if (atm != null)
                    return atm;
            }
            return null;
        }

        internal OfficeAtom GetByGuid(Guid guid, int ID, OfficeAtom item = null) => GetByGuid(Convert.ToString(guid), ID, item);

        internal OfficeAtom GetByGuid(string guid, int ID, OfficeAtom item = null)
        {
            item = item ?? this;

            OfficeAtom result = sameGui(item, guid, ID)
                ? item
                : (item.Head.Find(_item => sameGui(_item, guid, ID))
                ?? item.Foot.Find(_item => sameGui(_item, guid, ID))
                ?? item.Children.Find(_item => sameGui(_item, guid, ID))
                ?? item.Body.Find(_item => sameGui(_item, guid, ID)));
            if (result == null)
                foreach (OfficeAtom oa in item.Body)
                {
                    result = GetByGuid(guid, ID, oa);
                    if (result != null)
                        return result;
                }
            if (result == null)
                foreach (OfficeAtom oa in item.Body)
                {
                    result = GetByGuid(guid, oa);
                    if (result != null)
                        return result;
                }
            if (result == null)
                foreach (OfficeAtom oa in item.Groups)
                {
                    result = GetByGuid(guid, ID, oa);
                    if (result != null)
                        return result;
                }

            return result;
        }

        internal OfficeAtom GetByGuid(string guid, OfficeAtom item = null)
        {
            item = item ?? this;

            OfficeAtom result = sameGui(item, guid)
                ? item
                : (item.Head.Find(_item => sameGui(_item, guid))
                ?? item.Foot.Find(_item => sameGui(_item, guid))
                ?? item.Children.Find(_item => sameGui(_item, guid))
                ?? item.Body.Find(_item => sameGui(_item, guid)));

            if (result == null)
                foreach (OfficeAtom oa in item.Body)
                {
                    result = GetByGuid(guid, oa);
                    if (result != null)
                        return result;
                }

            return result;
        }
        internal OfficeAtom GetByGuid(string guid, string cellAddress, OfficeAtom item = null)
        {
            item = item ?? this;

            OfficeAtom result = sameGui(item, guid, cellAddress)
                ? item
                : (item.Head.Find(_item => sameGui(_item, guid, cellAddress))
                ?? item.Foot.Find(_item => sameGui(_item, guid, cellAddress))
                ?? item.Children.Find(_item => sameGui(_item, guid, cellAddress))
                ?? item.Body.Find(_item => sameGui(_item, guid, cellAddress)));

            if (result == null)
                foreach (OfficeAtom oa in item.Body)
                {
                    result = GetByGuid(guid, cellAddress, oa);
                    if (result != null)
                        return result;
                }

            return result;
        }

        /// <summary>
        /// TRUE - je zapotřebí generovat i GUID
        /// </summary>
        /// <returns></returns>
        internal bool NeedGuid() => Attributes != null && Attributes.FindAllByKey(key => !OfficeUtil.AtomItemKnownAttributForGenerateXML(key) && !key.Equals("cell") && !Attributes[key].IsNullOrEmpty()).Count > 0 || !Item.IsEmpty();

        internal void SetAttributes(XmlElement xmlElement, XmlDocument xmlDoc, string namespaceUri, bool withGuid = false)
        {
            if (xmlElement != null)
                //if (withGuid || NeedGuid())
                //    xmlElement.SetAttribute("guid", CommonService.GetParametr("guid", Attributes));
                Item?.SetAttributes(xmlElement, xmlDoc, namespaceUri, withGuid);
        }

        internal void UpdateDynamics(List<dynamic> dynamics, bool isBody = false)
        {
            if (this.Item is OfficeAtomRegionItem || this.Item is OfficeAtomGroupItem)
            {
                if (!string.IsNullOrEmpty(this.Item.Name) && (isBody || (dynamics.Count > 0 && !(dynamics.Last() is OfficeAtomRegionItem))))
                    dynamics.Add(this.Item);

                bool isFirst = true;
                foreach (var item in Head)
                {
                    item.UpdateDynamics(dynamics, isFirst);
                    isFirst = false;
                }
                foreach (var item in Body)
                {
                    item.UpdateDynamics(dynamics, isFirst);
                    isFirst = false;
                }
                foreach (var item in Groups)
                {
                    item.UpdateDynamics(dynamics, isFirst);
                    isFirst = false;
                }
                foreach (var item in Foot)
                {
                    item.UpdateDynamics(dynamics, isFirst);
                    isFirst = false;
                }
                foreach (var item in Children)
                    item.UpdateDynamics(dynamics);
            }
            else if ("value-of".Equals(this.atomType))
                dynamics.Add(this.Item);
            else
                foreach (var item in Children)
                    item.UpdateDynamics(dynamics);

        }
    }
}