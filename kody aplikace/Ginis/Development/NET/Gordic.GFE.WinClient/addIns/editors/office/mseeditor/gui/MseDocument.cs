//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MseDocument.cs                         </Name>
//    <Description> Document OFFICE Excel                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.StructureView;
using Excel = Microsoft.Office.Interop.Excel;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Document OFFICE Excel
    /// </summary>
    class MseDocument
    {
        readonly Excel.Workbook workBook;
        readonly MseOfficeDocument mseOfficeDocument;
        readonly int actual_index = 1;
        Excel._Worksheet Sheet { get => workBook != null ? workBook.Worksheets.get_Item(actual_index) as Excel._Worksheet : null; }

        string namespaceUri = ReportDesignerProperties.Instance.AlfReportXmlns;
        XmlDocument xmlDoc;
        readonly CompilationUnit compilationUnit;
        /// <summary>
        /// Prázdný konstruktor třídy ve kterém vytvoříme objekty
        /// </summary>
        MseDocument(MseOfficeDocument pMseOfficeDocument)
        {
            this.mseOfficeDocument = pMseOfficeDocument;
        }

        /// <summary>
        /// Konstruktor třídy dle vlastnosti
        /// </summary>
        /// <param name="pMseOfficeDocument"></param>
        /// <param name="pWorkbook">Záložka</param>
        public MseDocument(MseOfficeDocument pMseOfficeDocument, Excel.Workbook pWorkbook)
            : this(pMseOfficeDocument)
        {
            this.workBook = pWorkbook;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="pMseOfficeDocument"></param>
        /// <param name="unit"></param>
        public MseDocument(MseOfficeDocument pMseOfficeDocument, CompilationUnit unit)
            : this(pMseOfficeDocument, OfficeTemplateService.GetDocument(unit.OpenedFile))
        {
            this.compilationUnit = unit;
        }
        string rootRegionName;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="xmlFormat"></param>
        /// <param name="pNamespaceUri"></param>
        /// <returns></returns>
        internal void SetSheetData(ref XmlElement xmlFormat, string pNamespaceUri)
        {
            this.namespaceUri = pNamespaceUri;
            xmlDoc = xmlFormat.OwnerDocument;
            // pokud počet řádků pracovní oblasti je nulový, pak není co řešit
            if (Sheet == null || Sheet.UsedRange.Rows.Count == 0)
                return;

            //...vše musí být v hlavním regionu
            //Proto vezmeme první řádek a zjistíme, zda je začátkem hlavního regionu
            //Pokud tomu tak je, pak zavoláme metodu uložení regionu, 
            //která nám vrátí číslo posledního řádku regionu

            //Čili vezmeme první záznam
            Excel.Comment comment = (Sheet.UsedRange.Cells[1, 1] as Excel.Range).Comment as Excel.Comment;
            int ID = 0;

            rootRegionName =
                compilationUnit.StructureViewEntry != null
                ? (compilationUnit.StructureViewEntry as StructureViewEntry).GetStructureRootRegionName()
                : string.Empty;
            string regName = string.Empty;
            Guid guid = Guid.Empty;
            //Pokud komentář je NULL, pak to znamená, že hlavní region není uveden
            //jinak
            if (comment != null)
            {
                //Zafixujeme text komentáře
                string _text = comment.Shape.AlternativeText;
                guid = OfficeService.GetGuid(_text);
                ID = comment.Shape.ID;
                //Ano, je to začátek regionu
                if (OfficeUtil.IsBeginRegionSection(_text))
                    regName = OfficeService.GetName(_text);
            }

            // zjistíme, zda první region sestavy je hlavním regionem
            // pokud tomu tak není, pak je zapotřebí nachystat větve všech regionů před daným
            if (string.IsNullOrEmpty(regName) || !regName.Equals(rootRegionName, StringComparison.InvariantCultureIgnoreCase))
            {
                // prvním záznamem je nějaká položka  nebo text hlavního regionu
                regName = rootRegionName;
                guid = Guid.Empty;
            }

            //Zde by měl obsahovat název následujícího regionu, který je zapotřebí získat a uložit
            int commentRow = 0;

            //while (_commentRow != xlWorkSheet.UsedRange.Rows.Count)
            while (commentRow != Sheet.Comments.Count)
            {
                xmlFormat.AppendChild(GetRegion(regName, Convert.ToString(guid), ID, ref commentRow));
                //Pro případ, kdy po uzavřené sekci regionu se ještě nachází nějaké položky...
                //...pak tito položky počítáme do hlavního regionu
                regName = rootRegionName;
            }

            //uvolnění objektů COM
            //uvolnění objektů COM
            if (comment != null)
                System.Runtime.InteropServices.Marshal.ReleaseComObject(comment);
        }

        /// <summary>
        /// Získání regionu
        /// </summary>
        /// <param name="p_commentIndex">Index posledního řádku regionu</param>
        /// <param name="p_regName">Název aktuálního regionu </param>
        /// <param name="ID">Jednoznačný identifikátor tvaru</param>
        /// <param name="guid"></param>
        /// <returns></returns>
        XmlElement GetRegion(string p_regName, string guid, int ID, ref int p_commentIndex)
        {
            XmlElement _xmlRegion = xmlDoc.CreateElement("region", namespaceUri);
            // získáme název regionu, což je poslední údaj
            string[] _regName = p_regName.Split('.');
            _xmlRegion.SetAttribute("name", _regName[_regName.Length - 1]);
            if (!guid.IsNullOrEmpty())
                mseOfficeDocument.atom.GetByGuid(guid, ID)?.SetAttributes(_xmlRegion);

            XmlElement _xmlBody = xmlDoc.CreateElement("body", namespaceUri);
            while (p_commentIndex < Sheet.Comments.Count)
            {
                p_commentIndex++;

                //Jinak zafixujeme text komentáře ...
                string _text = Sheet.Comments[p_commentIndex].Shape.AlternativeText;
                int lID = Sheet.Comments[p_commentIndex].Shape.ID;

                Guid _guid = OfficeService.GetGuid(_text);
                //Zjistíme název v komentáři
                string _commentName = OfficeService.GetName(_text);
                //...a dle jeho obsahu zjistíme o jaký objekt se jedna
                //Začátek regionu
                if (_text.Contains(CommonService.MSE_BEGIN_SECTION_BODY))
                {
                    //Pokud se jedna o region stejný, pak záznam ignorujeme...
                    if (_commentName.ToLowerInvariant().Equals(p_regName.ToLowerInvariant()))
                    {
                        //Položky se mohou objevít nedřivé než o řádek níž
                        XmlElement _xmlCopyAndFill = OfficeUtil.GetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, ref p_commentIndex, _xmlBody);
                        //Pokud nějaké položky v sekci jsou, pak sekci přidáme
                        if (_xmlCopyAndFill != null)
                            _xmlBody.AppendChild(_xmlCopyAndFill);

                        continue;
                    }
                    //...pokud ovšem názvy jsou různé, pak se jedna o vnořený region...
                    //A voláme rekurzivně danou metodu
                    p_commentIndex--;
                    XmlElement _xmlNested = GetRegion(_commentName, Convert.ToString(_guid), lID, ref p_commentIndex);
                    _xmlBody.AppendChild(_xmlNested);

                    //TEST
                    XmlElement _xmlCAF = OfficeUtil.GetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, ref p_commentIndex, _xmlBody);
                    //Pokud nějaké položky v sekci jsou, pak sekci přidáme
                    if (_xmlCAF != null)
                        _xmlBody.AppendChild(_xmlCAF);
                    //^
                    continue;
                }
                //Datová položka
                else if (_text.Contains(CommonService.MSE_FIELD))
                {
                    p_commentIndex--;
                    XmlElement _xmlCopyAndFill = OfficeUtil.GetCopyAndFill((Sheet.Comments[p_commentIndex == 0 ? 1 : p_commentIndex].Parent as Excel.Range).Row, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, ref p_commentIndex, _xmlBody);
                    //Pokud nějaké položky v sekci jsou, pak sekci přidáme
                    if (_xmlCopyAndFill != null)
                        _xmlBody.AppendChild(_xmlCopyAndFill);

                    continue;
                }
                //Začátek hlavičky
                else if (_text.Contains(CommonService.MSE_BEGIN_SECTION_HEADER))
                {
                    //Pokud se jedná o Záhlaví daného regionu, pak ho uložíme do daného regionu ...
                    if (_commentName.ToLower() == p_regName.ToLower())
                    {
                        XmlElement _xmlHead = OfficeUtil.GetHeader(p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, "mse", ref p_commentIndex);
                        if (_xmlHead.ChildNodes.Count != 0)
                            _xmlRegion.AppendChild(_xmlHead);
                    }
                    //...jinak Je to Záhlaví vnořeného regionu
                    else
                    {
                        //A voláme rekurzivně danou metodu
                        p_commentIndex--;
                        XmlElement _xmlNested = GetRegion(_commentName, Convert.ToString(_guid), lID, ref p_commentIndex);
                        _xmlBody.AppendChild(_xmlNested);

                        //TEST
                        XmlElement _xmlCopyAndFill = OfficeUtil.GetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, ref p_commentIndex, _xmlBody);
                        //Pokud nějaké položky v sekci jsou, pak sekci přidáme
                        if (_xmlCopyAndFill != null)
                            _xmlBody.AppendChild(_xmlCopyAndFill);
                        //^
                    }

                    continue;
                }
                //Začátek zápatí
                else if (_text.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER))
                {
                    //Pokud se jedná o Zápatí daného regionu, pak ho uložíme do daného regionu ...
                    if (_commentName.ToLower() == p_regName.ToLower())
                    {
                        XmlElement _xmlFoot = GetFoot(p_regName.Split('.').Last(), ref p_commentIndex);
                        //Zápatí je poslední v regionu, a tak po získání Zápatí můžeme směle vyskočit z metody
                        _xmlRegion.AppendChild(_xmlBody);
                        if (_xmlFoot.ChildNodes.Count != 0)
                            _xmlRegion.AppendChild(_xmlFoot);

                        // počkáme na poslední vlákno
                        p_commentIndex++;
                        return _xmlRegion;
                    }
                    //...jinak Je to Zápatí vnořeného regionu
                    else
                    {
                        //A voláme rekurzivně danou metodu
                        p_commentIndex--;
                        XmlElement _xmlNested = GetRegion(_commentName, Convert.ToString(_guid), ID, ref p_commentIndex);
                        _xmlBody.AppendChild(_xmlNested);
                        //TEST
                        XmlElement _xmlCopyAndFill = OfficeUtil.GetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, ref p_commentIndex, _xmlBody);
                        //Pokud nějaké položky v sekci jsou, pak sekci přidáme
                        if (_xmlCopyAndFill != null)
                            _xmlBody.AppendChild(_xmlCopyAndFill);
                        //^
                    }

                    continue;
                }
                //Konec regionu
                else if (_text.Contains(CommonService.MSE_END_SECTION))
                {
                    //Pokud se jedná o Konec daného regionu, pak ho uzavřeme ...
                    if (_commentName.ToLower() == p_regName.ToLower())
                    {
                        //p_commentIndex--;

                        _xmlRegion.AppendChild(_xmlBody);
                        return _xmlRegion;
                    }
                }
            }

            _xmlRegion.AppendChild(_xmlBody);
            return _xmlRegion;
        }

        XmlElement GetFoot(string regname, ref int p_index)
        {
            //Vytvoříme větev FOOT
            XmlElement _xmlFoot = xmlDoc.CreateElement("foot", namespaceUri);
            //Položky se mohou obvít nedřivé než o řádek níž
            //p_index++;

            //Získáme a připojíme sekci datových položek
            XmlElement _xmlCopyAndFill = OfficeUtil.GetCopyAndFill((Sheet.Comments[p_index].Parent as Excel.Range).Row + 1, regname, xmlDoc, Sheet, namespaceUri, mseOfficeDocument.atom, ref p_index, _xmlFoot);
            //XmlElement _xmlCopyAndFill = GetCopyAndFill(xmlDoc, ref p_index);
            //Pokud nějaké položky v sekci jsou, pak sekci přidáme
            //if (_xmlCopyAndFill.ChildNodes.Count != 0)
            if (_xmlCopyAndFill != null)
                _xmlFoot.AppendChild(_xmlCopyAndFill);


            return _xmlFoot;
        }
    }
}
