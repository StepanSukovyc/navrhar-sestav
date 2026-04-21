//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OxsDocument.cs                         </Name>
//    <Description> Document OFFICE Excel                                       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-01                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.WinClient.Editor._office;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.StructureView;
using Microsoft.Office.Interop.Excel;
using Excel = Microsoft.Office.Interop.Excel;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Document OFFICE Excel
    /// </summary>
    class OxsDocument
    {

        Excel.Workbook workBook;
        readonly OxsOfficeDocument oxsOfficeDocument;
        int actual_index = 1;
        Excel._Worksheet Sheet { get => workBook != null ? workBook.Worksheets.get_Item(actual_index) as Excel._Worksheet : null; }

        string namespaceUri = ReportDesignerProperties.Instance.AlfReportXmlns;
        XmlDocument xmlDoc;
        CompilationUnit compilationUnit;
        /// <summary>
        /// Prázdný konstruktor třídy ve kterém vytvoříme objekty
        /// </summary>
        private OxsDocument() { }

        /// <summary>
        /// Konstruktor třídy dle vlastnosti
        /// </summary>
        /// <param name="pOxsOfficeDocument"></param>
        /// <param name="workbook">Záložka</param>
        public OxsDocument(OxsOfficeDocument pOxsOfficeDocument, Excel.Workbook workbook)
            : this()
        {
            this.oxsOfficeDocument = pOxsOfficeDocument;
            this.workBook = workbook;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="pOxsOfficeDocument"></param>
        /// <param name="unit"></param>
        public OxsDocument(OxsOfficeDocument pOxsOfficeDocument, CompilationUnit unit)
            : this(pOxsOfficeDocument, OfficeTemplateService.GetDocument(unit.OpenedFile))
        {
            this.compilationUnit = unit;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="xmlFormat"></param>
        /// <param name="lNamespaceUri"></param>
        /// <returns></returns>
        internal void SetData(ref XmlElement xmlFormat, string lNamespaceUri)
        {
            existsRegionlist.Clear();
            try
            {
                for (int index = 1; index <= workBook.Sheets.Count; index++)
                {
                    actual_index = index;
                    SetSheetData(ref xmlFormat, lNamespaceUri);
                }
            }
            catch { }
            finally { actual_index = 1; }
        }
        string rootRegionName;
        readonly List<string> existsRegionlist = new List<string>();
        // indikuje stav, kdy jsme aktuálně ukončili region a začínáme další
        bool isAfterRegion = false;

        public string GetSheetsData()
        {
            actual_index = 0;
            List<string> XMLtext = new List<string>();

            while (actual_index < workBook.Worksheets.Count)
            {
                actual_index++;

                // pokud počet řádků pracovní oblasti je nulový, pak není co řešit
                if (Sheet == null || Sheet.UsedRange.Rows.Count == 0)
                    return string.Empty;

                //Zde by měl obsahovat název následujícího regionu, který je zapotřebí získat a uložit
                int commentIndex = 1;
                StackProps stack = new StackProps();
                string lastRegionCellAddress = null;
                string lastCellAddress = null;

                // projdeme všechny komentáře a zpracujeme je
                while (commentIndex <= Sheet.Comments.Count)
                {
                    //Jinak zafixujeme text komentáře ...
                    Excel.Comment cmmnt = Sheet.Comments[commentIndex];
                    if (cmmnt != null)
                    {
                        Excel.Range commentedCell = ValidateContent(cmmnt);

                        string text = cmmnt.Shape.AlternativeText;
                        // Adresa řádku a sloupce
                        string cellAddress = commentedCell.Address[false, false];
                        Int32.TryParse(RemoveTextSymbols(cellAddress), out int to);

                        if (isAfterRegion && !string.IsNullOrEmpty(lastRegionCellAddress) && !cellAddress.Equals(lastRegionCellAddress))
                        {
                            Int32.TryParse(RemoveTextSymbols(lastRegionCellAddress), out int from);
                            // pokud mezi regiony je prostor
                            if ((from + 1) <= (to - 1) && CanInsertCopyAndFill(stack))
                                // přidáme copy-and-fill
                                XMLtext.Add(String.Format("<copy-and-fill from=\"{0}\" to=\"{1}\" />", from + 1, to - 1));
                        }
                        isAfterRegion = false;

                        if (OfficeService.IsItemByComment(text))
                        {
                            XMLtext.Add(OfficeAtomItem.FromSerializeText(text, cellAddress).GetXml(ref stack));
                            MarkCurrentSectionHasValueOf(stack);
                        }
                        else
                        {
                            if (OfficeService.IsGroupByComment(text))
                            {
                                // pokud existuje otevřený HEAD tak zo zavřeme
                                if ("head".Equals(stack.GetLastType()))
                                    XMLClose("head", ref stack, ref XMLtext);
                                else if ("body".Equals(stack.GetLastType()))
                                {
                                    // odstraníme značku těla
                                    XMLtext.RemoveAt(XMLtext.Count - 1);
                                    stack.CurrentStack.RemoveAt(stack.CurrentStack.Count - 1);
                                }

                                XMLSerializeAtomGroupItem(text, cellAddress, ref XMLtext, ref stack);
                                stack.CurrentStack.Add(new StackObject { Type = "group", Index = to, Text = text });
                            }

                            // pokud se jedná o začátek regionu
                            if (text.Contains(CommonService.MSE_BEGIN_SECTION_BODY))
                            {
                                // pokud nový region není úplně stejný jako stávající 
                                string name = OfficeService.GetName(text);

                                if ("head".Equals(stack.GetLastType()))
                                {
                                    // jedná se o chybu - není konec hlavičky
                                    checkAndSetCopyAndFill(new StackObject { Text = text, Index = to }, stack, ref XMLtext);
                                    XMLClose("head", ref stack, ref XMLtext);

                                    // uměle přidáme otevření těla
                                    XMLtext.Add("<body>");
                                    // s prázdným textem
                                    stack.CurrentStack.Add(new StackObject { Type = "body" });

                                    if (!name.Equals(stack.GetLastRegionName()))
                                    {
                                        // přidáme celou strukturu regionu
                                        XMLSerializeAtomRegionItem(text, ref XMLtext, ref stack);
                                        XMLtext.Add("<body>");
                                        stack.CurrentStack.Add(new StackObject { Type = "body", Index = to, Text = text });
                                    }
                                }
                                else if (!name.Equals(stack.GetLastRegionName()))
                                {
                                    // přidáme celou strukturu regionu
                                    XMLSerializeAtomRegionItem(text, ref XMLtext, ref stack);
                                    XMLtext.Add("<body>");
                                    stack.CurrentStack.Add(new StackObject { Type = "body", Index = to, Text = text });
                                }
                            }
                            else if (text.Contains(CommonService.MSE_BEGIN_SECTION_HEADER))
                            {
                                if (stack.CurrentStack.Count > 0 && !"group".Equals(stack.GetLastType()) || stack.CurrentStack.Count == 0)
                                    XMLSerializeAtomRegionItem(text, ref XMLtext, ref stack);

                                XMLtext.Add("<head>");
                                stack.CurrentStack.Add(new StackObject { Type = "head", Index = to, Text = text });
                            }
                            else if (text.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER))
                            {
                                XMLCheckBodySection(text, ref stack, ref XMLtext);

                                XMLtext.Add("<foot>");
                                stack.CurrentStack.Add(new StackObject { Type = "foot", Index = to });
                            }
                            else if (text.Contains(CommonService.MSE_END_SECTION))
                            {
                                Int32.TryParse(RemoveTextSymbols(lastCellAddress), out int from);
                                // pokud mezi regiony je prostor
                                if ((from + 1) <= (to - 1) && CanInsertCopyAndFill(stack))
                                    // přidáme copy-and-fill
                                    XMLtext.Add(String.Format("<copy-and-fill from=\"{0}\" to=\"{1}\" />", from + 1, to - 1));

                                XMLCloseEndSection(text, ref stack, ref XMLtext);
                            }
                        }
                        if (isAfterRegion)
                            lastRegionCellAddress = cellAddress;

                        lastCellAddress = cellAddress;
                        Marshal.ReleaseComObject(commentedCell);
                    }
                    Marshal.ReleaseComObject(cmmnt);
                    commentIndex++;
                }

                // je zapotřebí ukončit větve
                while (stack.CurrentStack.Count > 0)
                    XMLCloseEndSection(null, ref stack, ref XMLtext);
            }

            return ConvertListToStringBuilder(XMLtext).ToString();
        }

        void XMLCloseEndSection(string text, ref StackProps stack, ref List<string> xMLtext)
        {
            string name = text != null ? OfficeService.GetName(text) : null;
            if (stack != null && stack.CurrentStack.Count > 0)
            {
                xMLtext.Add(String.Format("</{0}>", stack.GetLastType()));

                if (("head".Equals(stack.GetLastType()) || "foot".Equals(stack.GetLastType())) && stack.CurrentStack.Count > 1 && "group".Equals(stack.CurrentStack[stack.CurrentStack.Count - 2].Type))
                {
                    stack.CurrentStack.RemoveAt(stack.CurrentStack.Count - 1);
                    XMLCloseGroup(ref stack, ref xMLtext);
                }
                else if (stack.CurrentStack.Count > 0 && !"group".Equals(stack.GetLastType()) || stack.CurrentStack.Count == 0)
                {
                    stack.CurrentStack.RemoveAt(stack.CurrentStack.Count - 1);
                    XMLClose("region", ref stack, ref xMLtext);
                }
                else
                    XMLCloseGroup(ref stack, ref xMLtext);
            }
        }

        /// <summary>
        /// Validace platnosti obsahu komentáře
        /// </summary>
        /// <param name="cmmnt">Excell buňka s komentářem</param>
        Excel.Range ValidateContent(Comment cmmnt)
        {
            string text = cmmnt.Shape.AlternativeText;
            // Adresa řádku a sloupce
            string cellAddress = (cmmnt.Parent as Excel.Range).Address[false, false];
            // "CellRef":"B1"
            if (OfficeService.ReplaceCellRef(cellAddress, ref text))
                cmmnt.Text(OfficeService.GetUpdatedCommentData(cmmnt.Shape.AlternativeText, text), CommonService.MISSVALUE, CommonService.MISSVALUE);

            return cmmnt.Parent as Excel.Range;
        }

        string RemoveTextSymbols(string inputText) =>
            // odstraníme veškere znaky, co nejsou čísla
            Regex.Replace(inputText, "[^0-9]", "");


        private void XMLCloseGroup(ref StackProps stack, ref List<string> xMLtext)
        {
            xMLtext.Add("</group>");
            stack.CurrentStack.RemoveAt(stack.CurrentStack.Count - 1);
            xMLtext.Add("</region>");
            isAfterRegion = true;
        }

        public static StringBuilder ConvertListToStringBuilder(List<string> list)
        {
            StringBuilder sb = new StringBuilder();

            int indentLevel = 0;
            foreach (string line in SplitXmlLines(list))
            {
                string trimmedLine = line.Trim();
                if (trimmedLine.Length == 0)
                    continue;

                if (trimmedLine.StartsWith("</"))
                    indentLevel = Math.Max(0, indentLevel - 1);

                sb.Append('\t', indentLevel);
                sb.AppendLine(trimmedLine);

                if (ShouldIncreaseIndent(trimmedLine))
                    indentLevel++;
            }

            return sb;
        }

        static IEnumerable<string> SplitXmlLines(IEnumerable<string> list)
        {
            if (list == null)
                yield break;

            foreach (string item in list)
            {
                if (string.IsNullOrEmpty(item))
                    continue;

                foreach (string line in item.Replace("\r", string.Empty).Split('\n'))
                    yield return line;
            }
        }

        static bool ShouldIncreaseIndent(string line) =>
            line.StartsWith("<")
            && !line.StartsWith("</")
            && !line.EndsWith("/>")
            && !line.StartsWith("<?")
            && !line.StartsWith("<!");

        void XMLCheckHeadSection(StackObject currentStackObject, ref StackProps stack, ref List<string> xMLtext)
        {
            if (stack.CurrentStack.Count > 0)
            {
                checkAndSetCopyAndFill(currentStackObject, stack, ref xMLtext);

                if ("head".Equals(stack.GetLastType()))
                    XMLClose("head", ref stack, ref xMLtext);
                else if (!"group".Equals(stack.GetLastType()))
                    XMLSerializeAtomRegionItem(currentStackObject.Text, ref xMLtext, ref stack);
            }
            else if (stack.CurrentStack.Count == 0)
                XMLSerializeAtomRegionItem(currentStackObject.Text, ref xMLtext, ref stack);
        }

        void checkAndSetCopyAndFill(StackObject currentStackObject, StackProps stack, ref List<string> xMLtext)
        {
            StackObject lastStack = GetCurrentSection(stack);
            if (lastStack == null || lastStack.HasValueOf)
                return;

            // pokud mezi objekty je prostor
            if ((lastStack.Index + 1) <= (currentStackObject.Index - 1))
                // přidáme copy-and-fill
                xMLtext.Add(String.Format("<copy-and-fill from=\"{0}\" to=\"{1}\" />", lastStack.Index + 1, currentStackObject.Index - 1));
        }

        static void MarkCurrentSectionHasValueOf(StackProps stack)
        {
            StackObject currentSection = GetCurrentSection(stack);
            if (currentSection == null)
                return;

            currentSection.HasValueOf = true;
        }

        static bool CanInsertCopyAndFill(StackProps stack)
        {
            StackObject currentSection = GetCurrentSection(stack);
            return currentSection == null || !currentSection.HasValueOf;
        }

        static StackObject GetCurrentSection(StackProps stack)
        {
            if (stack?.CurrentStack == null)
                return null;

            for (int index = stack.CurrentStack.Count - 1; index >= 0; index--)
            {
                StackObject stackObject = stack.CurrentStack[index];
                if (stackObject.Type == "head" || stackObject.Type == "body" || stackObject.Type == "foot")
                    return stackObject;
            }

            return null;
        }

        void XMLCheckBodySection(string text, ref StackProps stack, ref List<string> xMLtext)
        {
            if (stack.CurrentStack.Count > 0)
            {
                if ("head".Equals(stack.GetLastType()))
                    XMLClose("head", ref stack, ref xMLtext);
                else if ("body".Equals(stack.GetLastType()))
                    XMLClose("body", ref stack, ref xMLtext);
                else if (!"group".Equals(stack.GetLastType()))
                    XMLSerializeAtomRegionItem(text, ref xMLtext, ref stack);
            }
            else if (stack.CurrentStack.Count == 0)
                XMLSerializeAtomRegionItem(text, ref xMLtext, ref stack);
        }

        private void XMLSerializeAtomGroupItem(string text, string cellAddress, ref List<string> xMLtext, ref StackProps stack)
        {
            xMLtext.Add(OfficeAtomGroupItem.FromSerializeText(text, cellAddress).GetXml(ref stack));
        }

        void XMLClose(string v, ref StackProps stack, ref List<string> xMLtext)
        {
            xMLtext.Add(string.Format("</{0}>", v));

            if (stack.CurrentStack.Count > 0)
                stack.CurrentStack.RemoveAt(stack.CurrentStack.Count - 1);

            if ("region".Equals(v))
            {
                isAfterRegion = true;
                if (stack.RegionNames != null && stack.RegionNames.Count > 0)
                    stack.RegionNames.RemoveAt(stack.RegionNames.Count - 1);
            }
        }

        void XMLSerializeAtomRegionItem(string text, ref List<string> xMLtext, ref StackProps stack)
        {
            // nechceme do všech regionů přidávat sheet - pouze do prvního 
            xMLtext.Add(OfficeAtomRegionItem.FromSerializeText(text).GetXml(ref stack, stack.RegionNames.Count == 0 ? actual_index : 1));
        }

        void SetSheetData(ref XmlElement xmlFormat, string pNamespaceUri)
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

            //Pokud komentář je NULL, pak to znamená, že hlavní region není uvede
            //jinak
            if (comment != null)
            {
                //Zafixujeme text komentáře
                string text = comment.Shape.AlternativeText;
                ID = comment.Shape.ID;
                guid = OfficeService.GetGuid(text);
                //Ano, je to začátek regionu
                if (OfficeUtil.IsBeginRegionSection(text))
                    regName = OfficeService.GetName(text);
            }

            // zjistíme, zda první region sestavy je hlavním regionem
            // pokud tomu tak není, pak je zapotřebí nachystat větve všech regionů před daným
            if (string.IsNullOrEmpty(regName) || !regName.Equals(rootRegionName, StringComparison.InvariantCultureIgnoreCase))
            {
                // prvním záznamem je nějaká položka nebo text hlavního regionu
                regName = rootRegionName;
                guid = Guid.Empty;
                ID = 0;
            }

            //Zde by měl obsahovat název následujícího regionu, který je zapotřebí získat a uložit
            int commentRow = 0;

            while (commentRow != Sheet.Comments.Count)
            {
                xmlFormat.AppendChild(GetRegion(regName, Convert.ToString(guid), ID, ref commentRow));
                //Pro případ, kdy po uzavřené sekci regionu se ještě nachází nějaké položky...
                //...pak tyto položky počítáme do hlavního regionu
                regName = rootRegionName;
            }

            //uvolnění objektů COM
            Marshal.ReleaseComObject(comment);
        }

        XmlElement GetFoot(string regname, ref int p_index)
        {
            //Vytvoříme větev FOOT
            XmlElement lXmlFoot = xmlDoc.CreateElement("foot", namespaceUri);
            OfficeUtil.SetCopyAndFill((Sheet.Comments[p_index].Parent as Excel.Range).Row + 1, regname, xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom, ref p_index, ref lXmlFoot);
            return lXmlFoot;
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
            XmlElement xmlRegion = xmlDoc.CreateElement("region", namespaceUri);
            // získáme název regionu, což je poslední údaj
            string[] regName = p_regName.Split('.');
            xmlRegion.SetAttribute("name", regName[regName.Length - 1]);

            if (!guid.IsNullOrEmpty())
                oxsOfficeDocument.atom.GetByGuid(guid, ID)?.SetAttributes(xmlRegion, xmlDoc, namespaceUri, existsRegionlist.Contains(p_regName));

            if (!existsRegionlist.Contains(p_regName))
                existsRegionlist.Add(p_regName);

            // tato podmínka znamená, že se jedná o hlavní region
            if (regName[regName.Length - 1] == rootRegionName && actual_index > 1)
                xmlRegion.SetAttribute("sheet", actual_index.ToString());

            XmlElement lXmlBody = xmlDoc.CreateElement("body", namespaceUri);
            while (p_commentIndex < Sheet.Comments.Count)
            {
                p_commentIndex++;

                //Jinak zafixujeme text komentáře ...
                string lText = Sheet.Comments[p_commentIndex].Shape.AlternativeText;
                //Zjistíme název v komentáři
                string lCommentName = OfficeService.GetName(lText);
                Guid lguid = OfficeService.GetGuid(lText);
                int lID = Sheet.Comments[p_commentIndex].Shape.ID;
                //...a dle jeho obsahu zjistíme o jaký objekt se jedna
                //Začátek regionu
                if (lText.Contains(CommonService.MSE_BEGIN_SECTION_BODY))
                {
                    // TODO - může mít Pokud se jedna o region stejný, pak záznam ignorujeme...
                    if (lCommentName.ToLower().Equals(p_regName.ToLower()))
                    {
                        //Položky se mohou objevít nedřivé než o řádek níž
                        OfficeUtil.SetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom, ref p_commentIndex, ref lXmlBody);
                        continue;
                    }
                    //...pokud ovšem názvy jsou různé, pak se jedna o vnořený region...
                    // a voláme rekurzivně danou metodu
                    p_commentIndex--;
                    lXmlBody.AppendChild(GetRegion(lCommentName, Convert.ToString(lguid), lID, ref p_commentIndex));

                    OfficeUtil.SetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom, ref p_commentIndex, ref lXmlBody);
                    continue;
                }   //Začátek skupiny?
                //Datová položka
                else if (lText.Contains(CommonService.MSE_FIELD))
                {
                    lXmlBody.AppendChild(OfficeUtil.GetValueOf(lText, p_regName.Split('.').Last(), p_commentIndex, xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom));
                    continue;
                }
                //Začátek hlavičky
                else if (lText.Contains(CommonService.MSE_BEGIN_SECTION_HEADER))
                {
                    //Pokud se jedná o Záhlaví daného regionu, pak ho uložíme do daného regionu ...
                    if (lCommentName.ToLower().Equals(p_regName.ToLower()))
                    {
                        XmlElement _xmlHead = OfficeUtil.GetHeader(p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom, "oxs", ref p_commentIndex);
                        if (_xmlHead.ChildNodes.Count != 0)
                            xmlRegion.AppendChild(_xmlHead);
                    }
                    //...jinak Je to Záhlaví vnořeného regionu
                    else
                    {
                        //A voláme rekurzivně danou metodu
                        p_commentIndex--;
                        lXmlBody.AppendChild(GetRegion(lCommentName, Convert.ToString(lguid), lID, ref p_commentIndex));
                        OfficeUtil.SetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom, ref p_commentIndex, ref lXmlBody);
                    }

                    continue;
                }
                //Začátek zápatí
                else if (lText.Contains(CommonService.MSE_BEGIN_SECTION_FOOTER))
                {
                    //Pokud se jedná o Zápatí daného regionu, pak ho uložíme do daného regionu ...
                    if (lCommentName.ToLower().Equals(p_regName.ToLower()))
                    {
                        // zjistíme, zda se jedná o skupinu? skupina v textu má tvar MSEBeginSectionFooter: identifikátor_regionu[#guid-identifikátor_skupiny#][#guid_regionu#]
                        string pattern_tp = @"^Textové pole: (\S+): (\S+)\[#(\S+?)#\]\[#([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})#\]";
                        string pattern_o = @"^(\S+): (\S+)\[#(\S+?)#\]\[#([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})#\]";
                        bool isMatch = new Regex(pattern_tp).IsMatch(lText) || new Regex(pattern_o).IsMatch(lText);
                        XmlElement lXmlFoot;
                        if (isMatch)
                            // jedná se o skupinu
                            lXmlFoot = GetGroup(p_regName.Split('.').Last(), ref p_commentIndex);
                        else
                        {
                            lXmlFoot = GetFoot(p_regName.Split('.').Last(), ref p_commentIndex);
                            //Zápatí je poslední v regionu, a tak po získání Zápatí můžeme směle vyskočit z metody
                            xmlRegion.AppendChild(lXmlBody);
                        }

                        //Zápatí je poslední v regionu, a tak po získání Zápatí můžeme směle vyskočit z metody
                        if (lXmlFoot.ChildNodes.Count != 0)
                            xmlRegion.AppendChild(lXmlFoot);
                        // počkáme na poslední vlákno
                        p_commentIndex++;
                        return xmlRegion;
                    }
                    //...jinak Je to Zápatí vnořeného regionu
                    else
                    {
                        //A voláme rekurzivně danou metodu
                        p_commentIndex--;
                        lXmlBody.AppendChild(GetRegion(lCommentName, Convert.ToString(lguid), lID, ref p_commentIndex));
                        OfficeUtil.SetCopyAndFill((Sheet.Comments[p_commentIndex].Parent as Excel.Range).Row + 1, p_regName.Split('.').Last(), xmlDoc, Sheet, namespaceUri, oxsOfficeDocument.atom, ref p_commentIndex, ref lXmlBody);
                    }

                    continue;
                }
                //Konec regionu
                else if (lText.Contains(CommonService.MSE_END_SECTION) && lCommentName.ToLower().Equals(p_regName.ToLower()))
                    //Pokud se jedná o Konec daného regionu, pak ho uzavřeme ...
                    break;
            }

            if (!lXmlBody.IsEmpty)
                xmlRegion.AppendChild(lXmlBody);
            return p_regName.IsNullOrEmpty() ? (XmlElement)lXmlBody.FirstChild : xmlRegion;
        }

        XmlElement GetGroup(string p_regName, ref int p_commentIndex)
        {
            //Vytvoříme větev GROUP
            XmlElement _xmlGroup = xmlDoc.CreateElement("group", namespaceUri);

            //Vytvoříme větev FOOT
            XmlElement _xmlFoot = GetFoot(p_regName.Split('.').Last(), ref p_commentIndex);
            //Zápatí je poslední ve skupině
            if (_xmlFoot.ChildNodes.Count != 0)
                _xmlGroup.AppendChild(_xmlFoot);
            return _xmlGroup;
        }

        XmlElement GetGroup(XmlDocument pXmlDoc, string pNamespaceUri, string p_regName, string guid, int ID, ref int p_commentIndex)
        {
            XmlElement xmlGroup = pXmlDoc.CreateElement("group", pNamespaceUri);
            // získáme název regionu, což je poslední údaj
            string[] regName = p_regName.Split('.');
            xmlGroup.SetAttribute("name", regName[regName.Length - 1]);

            if (!guid.IsNullOrEmpty())
                oxsOfficeDocument.atom.GetByGuid(guid, ID)?.SetAttributes(xmlGroup, pXmlDoc, pNamespaceUri, existsRegionlist.Contains(p_regName));

            if (!existsRegionlist.Contains(p_regName))
                existsRegionlist.Add(p_regName);

            // tato podmínka znamená, že se jedná o hlavní region
            if (regName[regName.Length - 1] == rootRegionName && actual_index > 1)
                xmlGroup.SetAttribute("sheet", actual_index.ToString());

            while (p_commentIndex < Sheet.Comments.Count)
            {
                p_commentIndex++;

                //Jinak zafixujeme text komentáře ...
                //Zjistíme název v komentáři
                string lCommentName = OfficeService.GetName(Sheet.Comments[p_commentIndex].Shape.AlternativeText);

                if (lCommentName.ToLower().Equals(p_regName.ToLower()))
                    //Pokud se jedná o Konec daného regionu, pak ho uzavřeme ...
                    break;
            }
            return p_regName.IsNullOrEmpty() ? (XmlElement)xmlGroup.FirstChild : xmlGroup;
        }
    }
}
