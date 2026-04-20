//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.MseOfficeAtom.cs                          </Name>
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

namespace Gordic.GFE.WinClient.Editor._office
{
    class MseOfficeAtomItem : IComponent, IScriptHandler, IAttributeHandler
    {
        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("identifikátor")]
        [Description("Jednoznačný identifikátor položky")]
        public string Guid { get; set; }
        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("název")]
        [Description("Název položky")]
        public string Name { get; set; }
        /// <summary>
        /// Filter-Out políčka
        /// </summary>
        [DisplayName("filter-out")]
        [Description("Atribut filter-out položky")]
        public string FilterOut { get; set; }
        /// <summary>
        /// Filter-In políčka
        /// </summary>
        [DisplayName("filter-in")]
        [Description("Atribut filter-in položky")]
        public string FilterIn { get; set; }

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
        public MseOfficeAtom Parent { get; set; }

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
        public Dictionary<string, string> Unknowns
        {
            get => AttrList.FindAllByKey(key => !OfficeUtil.AtomItemKnownAttribut(key));
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose() { Disposed?.Invoke(this, EventArgs.Empty); }
        #endregion

        public MseOfficeAtomItem()
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

        internal void init(Dictionary<string, string> attributes)
        {
            if (attributes != null)
            {
                Name = CommonService.GetParametr("name", attributes);
                Guid = CommonService.GetParametr("guid", attributes);
                FilterOut = CommonService.GetParametr("filter-out", attributes);
                FilterIn = CommonService.GetParametr("filter-in", attributes);

                Scripts["onData"] = CommonService.GetParametr("onData", attributes);
                Scripts["onEnter"] = CommonService.GetParametr("onEnter", attributes);
                Scripts["onLoad"] = CommonService.GetParametr("onLoad", attributes);
                Scripts["onPrint"] = CommonService.GetParametr("onPrint", attributes);
                Scripts.ScriptChanged += Scripts_ScriptChanged;

                AttrList.AddRange(attributes.FindAllByKey(key => !OfficeUtil.AtomItemKnownAttribut(key)));
                AttrList.SynchronizeByOrigin();
            }
        }

        void Scripts_ScriptChanged(object sender, EventArgs e)
        {
            CommonService.AddParametr("onData", Scripts["onData"], Parent.Attributes);
            CommonService.AddParametr("onEnter", Scripts["onEnter"], Parent.Attributes);
            CommonService.AddParametr("onLoad", Scripts["onLoad"], Parent.Attributes);
            CommonService.AddParametr("onPrint", Scripts["onPrint"], Parent.Attributes);
        }

        /// <summary>
        /// Indikuje prázdnou položku
        /// </summary>
        /// <returns></returns>
        internal bool IsEmpty() => Scripts.IsEmpty && FilterOut.IsNullOrEmpty() && FilterIn.IsNullOrEmpty();

        internal void SetAttributes(XmlElement xmlValueOf)
        {
            if (!FilterOut.IsNullOrEmpty())
                xmlValueOf.SetAttribute("filter-out", FilterOut);
            if (!FilterIn.IsNullOrEmpty())
                xmlValueOf.SetAttribute("filter-in", FilterIn);
            if (Unknowns != null && Unknowns.Count > 0)
                Unknowns.ForEach(item => xmlValueOf.SetAttribute(item.Key, item.Value));
            if (Scripts != null && Scripts.Count > 0)
                Scripts.FindAllByKey(key => !Scripts[key].IsNullOrEmpty()).ForEach(item => xmlValueOf.SetAttribute(item.Key, item.Value));
        }

        internal MseOfficeAtomItem Clone()
        {
            MseOfficeAtomItem result = new MseOfficeAtomItem();
            result.AttrList = (GFEAttrList)AttrList.Clone();
            result.Scripts = (GFEScriptList)Scripts.Clone();
            return result;
        }
    }

    class MseOfficeAtom
    {
        const string SHEET = "sheet";

        const string MSE_FIELD = "MSEField";
        const string MSE_END_Section = "MSEEndSection:";
        const string MSE_BEGIN_SECTION_HEADER = "MSEBeginSectionHeader";
        const string MSE_BEGIN_SECTION_BODY = "MSEBeginSectionBody";
        const string MSE_BEGIN_SECTION_FOOTER = "MSEBeginSectionFooter";

        const string HEADER = "header";
        const string BODY = "body";
        const string FOOTER = "footer";


        /// <summary>
        /// Dostupné atributy objektu
        /// </summary>
        public Dictionary<string, string> Attributes = new Dictionary<string, string>();
        readonly List<MseOfficeAtom> Head = new List<MseOfficeAtom>();
        readonly List<MseOfficeAtom> Body = new List<MseOfficeAtom>();
        readonly List<MseOfficeAtom> Foot = new List<MseOfficeAtom>();
        readonly List<MseOfficeAtom> Children = new List<MseOfficeAtom>();

        /// <summary>
        /// Ukazatel na atom sekce se kterou se aktuálně pracuje
        /// </summary>
        MseOfficeAtom sectionPointer;
        MseOfficeAtom parent;

        /// <summary>
        /// Jednoznačný identifikátor objektu
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Položka pro PROPERTY GRID
        /// </summary>
        public MseOfficeAtomItem Item { get; set; }
        string atomType, pointer_type;

        internal void Init(dynamic dyn)
        {
            if (dyn is GFEFormatRegion reg)
            {
                if (reg.Attributes.Count > 0)
                    reg.Attributes.ForEach(item => Attributes.Add(item.Key, item.Value));

                if (reg.Head.Count > 0)
                    reg.Head.ForEach(item =>
                    {
                        MseOfficeAtom atm = create(item);
                        if (!atm.IsEmpty())
                            Head.Add(atm);
                    });
                if (reg.Body.Count > 0)
                    reg.Body.ForEach(item =>
                    {
                        MseOfficeAtom atm = create(item);
                        if (!atm.IsEmpty())
                            if ("block".Equals(item.TagName))
                                atm.Children.ForEach(child =>
                                {
                                    Children.Add(child);
                                    child.parent = this;
                                });
                            else
                                Body.Add(atm);
                    });
                if (reg.Foot.Count > 0)
                    reg.Foot.ForEach(item =>
                    {
                        MseOfficeAtom atm = create(item);
                        if (!atm.IsEmpty())
                            Foot.Add(atm);
                    });
            }
            else if (dyn is GFEFormatTag tag)
            {
                if (tag.Attributes.Count > 0)
                    tag.Attributes.ForEach(item => Attributes.Add(item.Key, item.Value));
                if (tag.Children.Count > 0)
                    tag.Children.ForEach(item =>
                    {
                        MseOfficeAtom atm = create(item);
                        if (!atm.IsEmpty())
                            Children.Add(atm);
                    });
                if ("value-of".Equals(tag.TagName))
                    atomType = "value-of";
            }
            // nastavíme objekt
            Item = new MseOfficeAtomItem()
            {
                Parent = this
            };
            Item.init(Attributes);
        }

        bool IsEmpty() => Head.Count == 0 && Body.Count == 0 && Foot.Count == 0 && Children.Count == 0 && atomType.IsNullOrEmpty() && Attributes.Count == 0;

        MseOfficeAtom create(GFEFormatTag item)
        {
            MseOfficeAtom result = new MseOfficeAtom() { parent = this };
            result.Init(item);
            return result;
        }

        MseOfficeAtom GetPointerBySheetIndex(int index)
        {
            return Body.FirstOrDefault(item => (item.Attributes.ContainsKey(SHEET)
            && item.Attributes.GetValueOrDefault(SHEET).Equals(index.ToString()))
            || (!item.Attributes.ContainsKey(SHEET) && index == 1));
        }

        List<Guid> existsGuidlist;
        internal void SyncWithComments(int sheetIndex, Excel.Comments comments)
        {
            if (comments == null || comments.Count == 0)
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

            // jinak zafixujeme text komentáře ...
            string text = comment.Shape.AlternativeText;
            string name = OfficeService.GetName(text);
            if (name == null)
                return;

            // odřízneme "Textové pole:"
            text = text.Substring(text.IndexOf(":") + 1).Trim();

            // jedná se o položku?
            if (text.Contains(MSE_FIELD))
            {
                MseOfficeAtom childAtom = FindChild(name, comment.Shape.ID);

                // provedeme synchronizaci vlastností objektů
                comment.Text(Sync(childAtom, text, comment.Shape.ID), CommonService.MISSVALUE, CommonService.MISSVALUE);
                return;
            }

            if (!text.Contains(MSE_END_Section) && !name.Equals(CommonService.GetParametr("name", sectionPointer.Attributes)))
            {
                // se jedná o nový region? - najdeme ho mezí vnořenými objekty
                MseOfficeAtom element = sectionPointer.Body.FirstOrNull(item => FindAtomPredic(item, name, comment.Shape.ID));
                if (element != null)
                    sectionPointer = element;
                else
                {
                    element = new MseOfficeAtom() { parent = sectionPointer };
                    sectionPointer.Body.Add(element);
                    sectionPointer = element;
                }
            }

            // provedeme synchronizaci vlastností objektů
            comment.Text(Sync(sectionPointer, text, comment.Shape.ID), CommonService.MISSVALUE, CommonService.MISSVALUE);

            //potřebuji aby ukazoval pouze na začátky regionů, aby bylo možné dohledat child
            if (!text.Contains(MSE_END_Section))
                sectionPointer.ID = comment.Shape.ID;

            if (text.Contains(MSE_BEGIN_SECTION_HEADER))
                pointer_type = HEADER;
            else if (text.Contains(MSE_BEGIN_SECTION_BODY))
                pointer_type = BODY;
            else if (text.Contains(MSE_BEGIN_SECTION_FOOTER))
                pointer_type = FOOTER;
            else
            {
                // jedná se o konec sekce
                pointer_type = BODY;
                sectionPointer = sectionPointer.parent;
            }
        }

        /// <summary>
        /// Synchronizace objektů šablony s objekty ALF
        /// </summary>
        /// <param name="activeAtom">Aktuální atomární objekt</param>
        /// <param name="text">Text oblasti</param>
        /// <param name="id">Jednoznačný identifikátor oblasti</param>
        string Sync(MseOfficeAtom activeAtom, string text, int id)
        {
            Guid guid = OfficeService.GetGuid(text);

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
                    activeAtom = new MseOfficeAtom() { parent = sectionPointer, Item = new MseOfficeAtomItem() { Parent = activeAtom }, ID = id };

                if (HEADER.Equals(pointer_type))
                    sectionPointer.Head.Add(activeAtom);
                else if (BODY.Equals(pointer_type))
                    sectionPointer.Children.Add(activeAtom);
                else if (FOOTER.Equals(pointer_type))
                    sectionPointer.Foot.Add(activeAtom);
            }

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
                        activeAtom.Item = new MseOfficeAtomItem() { Parent = activeAtom };

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
                        activeAtom.Item = new MseOfficeAtomItem() { Parent = activeAtom };

                    activeAtom.Item.Guid = Convert.ToString(guid);
                    CommonService.AddParametr("guid", activeAtom.Item.Guid, activeAtom.Attributes);

                    if (activeAtom.Item.Name.IsNullOrEmpty())
                    {
                        activeAtom.Item.Name = OfficeService.GetName(text);
                        CommonService.AddParametr("name", activeAtom.Item.Name, activeAtom.Attributes);
                    }
                }
                else
                    // jinak aktualizujeme GUID šablony dle objektu
                    text = text.Replace(Convert.ToString(guid), lGuid);
            }

            if (activeAtom.ID == 0)
                activeAtom.ID = id;
            existsGuidlist.Add(guid);
            return text;
        }

        MseOfficeAtom FindChild(string name, int id) =>
            BODY.Equals(pointer_type) ? sectionPointer.Children.FirstOrNull(item => FindAtomPredic(item, name, id))
                : HEADER.Equals(pointer_type) ? sectionPointer.Head.FirstOrNull(item => FindAtomPredic(item, name, id))
                : FOOTER.Equals(pointer_type) ? sectionPointer.Foot.FirstOrNull(item => FindAtomPredic(item, name, id))
                : null;

        bool FindAtomPredic(MseOfficeAtom item, string name, int id)
        {
            string fname = GetFullName(item);
            return (item.ID == 0 || item.ID == id) && (name.Equals(fname) || (fname != null && fname.EndsWith("." + name)));
        }

        string GetFullName(MseOfficeAtom item)
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

        MseOfficeAtom Clone()
        {
            MseOfficeAtom oa = new MseOfficeAtom
            {
                Item = Item.Clone()
            };
            Attributes.FindAllByKey(key => !key.Equals("name") && !key.Equals("guid") && !key.Equals("cell")).ForEach(item => oa.Attributes.Add(item.Key, item.Value));
            return oa;
        }

        MseOfficeAtom getAtomByID(MseOfficeAtom atm, string id)
        {
            MseOfficeAtom oa = atm.Children.FirstOrNull(item => Convert.ToString(item.ID).Equals(id));
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
        bool sameGui(MseOfficeAtom item, string guid, int lID) => CommonService.GetParametr("guid", item.Attributes).Equals(guid) && item.ID == lID;

        internal MseOfficeAtom GetByGuid(Guid guid, int lID, MseOfficeAtom item = null) => GetByGuid(Convert.ToString(guid), lID, item);

        internal MseOfficeAtom GetByGuid(string guid, int lID, MseOfficeAtom item = null)
        {
            item = item ?? this;

            MseOfficeAtom result = sameGui(item, guid, lID)
                ? item
                : (item.Head.Find(_item => sameGui(_item, guid, lID))
                ?? item.Foot.Find(_item => sameGui(_item, guid, lID))
                ?? item.Children.Find(_item => sameGui(_item, guid, lID))
                ?? item.Body.Find(_item => sameGui(_item, guid, lID)));
            if (result == null)
                foreach (MseOfficeAtom oa in item.Body)
                {
                    result = GetByGuid(guid, lID, oa);
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

        internal void SetAttributes(XmlElement xmlElement, bool withGuid = false)
        {
            if (xmlElement != null)
            {
                if (withGuid || NeedGuid())
                    xmlElement.SetAttribute("guid", CommonService.GetParametr("guid", Attributes));
                Item?.SetAttributes(xmlElement);
            }
        }
    }
}