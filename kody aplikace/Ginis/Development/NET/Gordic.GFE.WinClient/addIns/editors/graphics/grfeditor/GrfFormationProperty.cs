//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FormationProperties.cs                 </Name>
//    <Description> Vlastnosti sestavy dokumentu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using Gordic.GFE.WinClient.Editor;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Vlastnosti sestavy dokumentu
    /// </summary>
    class GrfFormationProperty : AbstractFormationProperty
    {
        Dictionary<string, GFEFormatRegion> RootRegions;
        #region AbstractFormationProperty
        /// <summary>
        /// Načtení hlavního regionu
        /// </summary>
        /// <param name="reg">Formát s informaci o hlavním regionu</param>
        public override void LoadRegion(GFEFormatRegion reg)
        {
            TowedService.TowedComponent = null;
            RootRegions = new Dictionary<string, GFEFormatRegion>();
            LoadContainer(reg, null);
        }

        /// <summary>
        /// Inicializace dokumentu
        /// </summary>
        /// <param name="xmlFormat">Namespace</param>
        /// <param name="unit">kompilační jednotka dokumentu</param>
        public override void SetData(ref XmlElement xmlFormat, ICompilationUnit unit)
        {
            dynamic structureViewEntry = (unit as CompilationUnit).StructureViewEntry;
            // zásobník aktuálních stylů. 
            // používá se při ukládáni sestavy.
            List<GFEList> xmlStyles = new List<GFEList>();

            string rootRegionName = structureViewEntry != null ? structureViewEntry.GetStructureRootRegionName() : string.Empty;

            if (string.IsNullOrEmpty(rootRegionName))
                MessageService.ShowErrorFormatted("{0}\n{1}\n{2}", GResources.GetResourceText(29450005) //RC 29450005 : Chybí kořenový region sestavy.
                    , GResources.GetResourceText(29450006)  //RC 29450006 : Nejspíše chybí odpovídající datová struktura.
                    , GResources.GetResourceText(29450007)); //RC 29450007 : Sestava nemusí být generovaná správně.

            XmlDocumentPosition xmlDoc = (XmlDocumentPosition)xmlFormat.OwnerDocument;

            // všechny stránky jsou stejného regionu
            // takže je zapotřebí vytvořit „obal“ všech stránek...
            // není to nic jiného, než struktura vnořených větvi regionů až do regionu stránky
            // pro tento účel stačí vzít první stránku
            object _nested = null;
            string nestedRegionFullName = null;
            XmlElement el = GetConteinerRegionData(xmlDoc, null, ref _nested, ref nestedRegionFullName, rootRegionName);

            if (_nested != null)
            {
                // nejvnořenější větev 
                // do této větvi se vlastně uloží celý obsah sestavy 
                XmlElement _xmlElement = (XmlElement)_nested;

                // prvně se uloží všechny políčka co nejsou regiony
                foreach (GrfPage item in document.Pages)
                {
                    // víme, že položky jsou zabalené do větvi ITEMS
                    XmlElement _xmlItems = item.GetData(xmlDoc, xmlStyles, false, nestedRegionFullName);

                    // projdeme všechny vnořené větve a přepíšeme do nadřazené
                    while (_xmlItems.ChildNodes.Count != 0)
                        _xmlElement.AppendChild(_xmlItems.ChildNodes[0]);
                }

                // teď se uloží všechny vnitřní regiony
                foreach (GrfPage item in document.Pages.Cast<GrfPage>())
                {
                    // víme, že položky jsou zabalené do větvi ITEMS
                    XmlElement _xmlItems = item.GetData(xmlDoc, xmlStyles, true, nestedRegionFullName);

                    bool rootExists;
                    //Projdeme všechny vnořené větve a přepíšeme do nadřazené
                    while (_xmlItems.ChildNodes.Count != 0)
                    {
                        rootExists = false;
                        int index = 0;
                        // projdeme a zjistíme, jestli existuji vnořené hlavní regiony
                        while (_xmlItems.ChildNodes.Count != 0 && index < _xmlItems.ChildNodes.Count)
                        {
                            XmlElement elemenet = _xmlItems.ChildNodes[index] as XmlElement;

                            if (elemenet.Attributes["name"] != null
                                && elemenet.Attributes["name"].Value.Equals(rootRegionName))
                            {
                                XmlElement subElement = elemenet.FirstChild as XmlElement; //sekce "body"
                                rootExists = true;
                                int subIndex = 0;
                                // kopírujeme pouze položky
                                while (subIndex < subElement.ChildNodes.Count)
                                    if (subElement.ChildNodes[subIndex].Name != "region")
                                        _xmlElement.AppendChild(subElement.ChildNodes[subIndex]);
                                    else
                                        subIndex++;
                                if (subElement.ChildNodes.Count == 0)
                                    _xmlItems.RemoveChild(elemenet);
                                else index++;
                            }
                            else index++;
                        }
                        if (rootExists)
                        {
                            // projdeme všechny root regiony a uložíme jejích vnitřní regiony
                            index = 0;
                            while (_xmlItems.ChildNodes.Count != 0 && index < _xmlItems.ChildNodes.Count)
                            {
                                XmlElement elemenet = _xmlItems.ChildNodes[index] as XmlElement;

                                if (elemenet.Attributes["name"] != null
                                    && elemenet.Attributes["name"].Value.Equals(rootRegionName))
                                {
                                    XmlElement subElement = elemenet.FirstChild as XmlElement; //sekce "body"
                                    while (subElement.ChildNodes.Count != 0)
                                        _xmlElement.AppendChild(subElement.ChildNodes[0]);

                                    // kopírujeme pouze položky
                                    if (subElement.ChildNodes.Count == 0)
                                        _xmlItems.RemoveChild(elemenet);
                                    else
                                        index++;
                                }
                                else index++;
                            }
                        }
                        else
                            _xmlElement.AppendChild(_xmlItems.ChildNodes[0]);
                    }
                }
            }

            if (el != null)
                xmlFormat.AppendChild(el);
        }
        #endregion

        void LoadContainer(GFEFormatRegion area, URAbstractContainer parent)
        {
            foreach (var item in area.Body)
            {
                if (item is GFEFormatRegion re)
                {
                    if (!re.GrfRect.IsEmpty)
                    {
                        dynamic com = null;

                        switch (re.Name.ToLowerInvariant())
                        {
                            case "$$":
                                com = new AddButtonArea();
                                break;
                            default:
                                com = new GrfRegion();
                                break;
                        }

                        com.Initialize(item);
                        com.Load(document.Pages[item.GrfRect.page1 - 1]);

                        if (parent == null)
                            (document.Pages[re.GrfRect.page1 - 1] as URAbstractPage).Add(com);
                        else
                            parent.Add(com);

                        LoadContainer(re, com);
                    }
                    else
                    {
                        RootRegions.Add(re.Name, re);
                        LoadContainer(re, parent);
                    }
                    continue;
                }

                dynamic subItem = item as GFEFormatComment;
                if (subItem != null)
                {
                    var com = new GrfContentComment();
                    com.Initialize(item);
                    int page = item.GrfRect.page1 - 1 < 0 ? 0 : item.GrfRect.page1 - 1;
                    com.Load(document.Pages[page], parent == null ? document.Pages[page] : parent as ISizable);

                    if (parent == null)
                        (document.Pages[page] as URAbstractPage).Add(com);
                    else parent.Add(com);

                    continue;
                }

                subItem = item as GFEFormatGRFBlock;
                if (subItem != null)
                {
                    if (subItem.Children.Count != 0)
                        foreach (var child in subItem.Children)
                        {
                            int _page = child.GrfRect.page1 - 1 < 0 ? 0 : child.GrfRect.page1 - 1;
                            dynamic _com = LocalCommonService.ParseContent(parent, child, document.Pages[_page]);
                            if (_com is AreaContent)
                                LoadContainer(child, _com);
                        }

                    continue;
                }
                if (!item.TagName.Equals("script") || area.Parent != null)
                {
                    int _page = item.GrfRect.page1 - 1 < 0 ? 0 : item.GrfRect.page1 - 1;
                    LocalCommonService.ParseContent(parent, item, document.Pages[_page]);
                }
            }
        }

        void LoadContainer(GFEFormatTag area, URAbstractContainer parent)
        {
            if (area is GFEFormatGRFPart)
                // jedná se o Součást
                foreach (var child in area.Children)
                {
                    dynamic _com = LocalCommonService.ParseContent(parent, child, document.Pages[child.GrfRect.page1 - 1 < 0 ? 0 : child.GrfRect.page1 - 1]);
                    // tohe kvůli Součásti v Součásti
                    if (_com is AreaContent)
                        LoadContainer(child, _com);
                }
        }

        /// <summary>
        /// Získání „obalu“ stránky
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se „obal“ vloží</param>
        /// <param name="names">názvy všech nadřazených regionů aktuálního regionu</param>
        /// <param name="nestedRegion">Nejvnořenější větev, do které se budou ukládat data</param>
        /// <param name="nestedRegionFullName">Úplný název nejvnořenější větve</param>
        /// <param name="rootRegion">Hlavní region</param>
        /// <returns></returns>
        XmlElement GetConteinerRegionData(XmlDocumentPosition xmlDoc, List<string> names, ref object nestedRegion, ref string nestedRegionFullName, string rootRegion = null)
        {
            if (names == null)
            {
                // najdeme úplné názvy všech objektů položených na stránce
                names = new List<string>();
                /* Fixace chyby výpočtu průřezu regionů na stránkách
                 * nevím proč zde byla podmínka document.Pages.Count > 0 - úplně nelogická...
                if (document.Pages.Count > 0)
                    names.Add(rootRegion);
                else*/
                TagService.SetNamesByObjects(document, ref names);

                if (names.Count == 0)
                    TagService.SetNamesByRegion(rootRegion, document, ref names);
                else
                {
                    // a najdeme průřez názvu tak, abychom mohly vytvořít obal - společné nadřazené regiony
                    TagService.TruncNames(ref names);
                    // pokud i přesto průřez není (chybné XME, nebo chybí objekty)
                    if (names.Count == 0)
                    {
                        TagService.SetNamesByRegion(rootRegion, document, ref names);
                        TagService.TruncNames(ref names);
                    }
                }
            }

            XmlElement nestedXmlElement = null, firstXmlElement = null;

            nestedRegionFullName = names.Count != 0 ? string.Join(".", names) : rootRegion;
            while (names.Count != 0)
            {
                // vytvoříme větev aktuálního (dle první hodnoty v poli) regionu
                var n = names[0];
                names.RemoveAt(0);
                XmlElement xmlElement = xmlDoc.CreateElement("region", ReportDesignerProperties.Instance.AlfReportXmlns);
                xmlElement.SetAttribute("name", n);
                if (RootRegions.TryGetValue(n, out GFEFormatRegion reg))
                    XmlDocumentService.SetListOfDictionaryItems(xmlElement, reg.Attributes, null);

                // vytvoříme větev BODY
                XmlElement _xmlBody = xmlDoc.CreateElement("body", ReportDesignerProperties.Instance.AlfReportXmlns);

                //Našli jsme nejvnořenější větev
                nestedRegion = _xmlBody;

                // přidáme tělo do regionu
                xmlElement.AppendChild(_xmlBody);

                if (nestedXmlElement != null)
                    nestedXmlElement.AppendChild(xmlElement);
                else
                    firstXmlElement = xmlElement;

                nestedXmlElement = _xmlBody;
            }

            // vrátíme obal aktuálního regionu 
            return firstXmlElement;

        }
    }
}
