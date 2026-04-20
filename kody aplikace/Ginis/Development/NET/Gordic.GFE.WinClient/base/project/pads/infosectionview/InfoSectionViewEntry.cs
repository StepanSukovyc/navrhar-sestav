//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionViewEntry.cs                </Name>
//    <Description> Jednotka prezentující info sekce sestavy.                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-07                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Drawing.Design;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.General;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>
    /// Jednotka prezentující info sekce sestavy.
    /// </summary>
    class InfoSectionViewEntry
    {
        #region Staticeké metody vytvoření StructureViewEntry
        /// <summary>
        /// Vytvoření položky struktury
        /// </summary>
        /// <param name="infoSection"></param>
        /// <param name="file">Název souboru sestavy! dle kterého se hledá struktura</param>
        internal static void Create(ref InfoSectionViewEntry infoSection, OpenedFile file)
        {
            if (file == null)
                return;

            ParseInformation parseInformation = ParserService.GetParseInformation(file.FileName);
            if (parseInformation == null)
                return;

            InfoSectionViewEntry newStructure = new InfoSectionViewEntry();

            SetEntry(newStructure, parseInformation.ValidCompilationUnit.GetSection(@"//alf:info"));

            // přiřadíme primární soubor
            newStructure.File = file;
            if (System.Threading.Interlocked.CompareExchange(ref newStructure, infoSection, null) != null)
                infoSection = newStructure;
        }

        /// <summary>
        /// Vytvoření položky struktury
        /// </summary>
        /// <param name="infoSection"></param>
        /// <param name="file">Název souboru sestavy! dle kterého se hledá struktura</param>
        /// <param name="dataXml">aktuální XML obsah</param>
        internal static void GetOrCreate(ref InfoSectionViewEntry infoSection, OpenedFile file, string dataXml)
        {
            if (file == null || string.IsNullOrEmpty(dataXml))
                return;

            InfoSectionViewEntry newStructure = InfoSectionViewPad.Instance.Entries.FirstOrDefault(ent => ent.File == file);
            if (newStructure == null)
                newStructure = new InfoSectionViewEntry();
            else
                newStructure.AttrList.Clear();

            if (ParserService.IsWellFormedXML(dataXml, out string errorMessage))
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(dataXml);
                XmlNamespaceManager manager = new XmlNamespaceManager(xmlDoc.NameTable);
                if (xmlDoc.DocumentElement.HasAttribute("xmlns"))
                    manager.AddNamespace("alf", xmlDoc.DocumentElement.GetAttribute("xmlns"));

                SetEntry(newStructure, xmlDoc.DocumentElement.SelectNodes(@"//alf:info", manager));

                // přiřadíme primární soubor
                newStructure.File = file;
                if (System.Threading.Interlocked.CompareExchange(ref newStructure, infoSection, null) != null)
                    infoSection = newStructure;
            }
            else
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450343)); //RC 29450343 : Chyba aktualizace info sekce! Obsah není XML validní!
        }

        static void SetEntry(InfoSectionViewEntry newStructure, XmlNodeList list)
        {
            if (list != null)
                // kopírujeme sekci info
                foreach (XmlNode item in list)
                {
                    foreach (XmlAttribute subItem in item.Attributes)
                        if (!string.IsNullOrEmpty(subItem.Name)
                            && !newStructure.AttrList.ContainsKey(subItem.Name))
                            newStructure.AttrList.Add(subItem.Name, subItem.Value);

                    newStructure.AttrList.SynchronizeByOrigin();
                }
        }
        #endregion

        /// <summary>
        /// Získání objektu, ve kterém je StructureViewEntry uzamčeno.
        /// </summary>
        public object SyncRoot = new object();

        /// <summary>
        /// soubor, kterému patří sekce INFO
        /// </summary>
        public OpenedFile File { get; set; }

        readonly UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get { return attrlist.Value; } set { attrlist.Value = value; } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public InfoSectionViewEntry() { AttrList = new GFEAttrList(UndoRedoService.Manager); }
    }
}
