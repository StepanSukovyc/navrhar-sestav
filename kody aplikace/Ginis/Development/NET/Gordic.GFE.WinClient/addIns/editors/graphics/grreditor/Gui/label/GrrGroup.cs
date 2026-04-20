//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrGroup.cs                            </Name>
//    <Description> skupiny GRR sestav                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// skupiny GRR sestav
    /// </summary>
    class GrrGroup : ALabel, IGroup
    {
        #region AbstractLabel
        /// <summary>
        /// Tělo skupiny
        /// </summary>
        [Browsable(false)]
        public override BodyList Body { get { return ParentLabel is AbstractLabel ? (ParentLabel as AbstractLabel).Body : base.Body; } }

        List<string> knownTags = null;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/GroupTags", null) as List<string>;
                return knownTags;
            }
        }
        /// <summary>
        /// nadřazený štítek
        /// </summary>
        [Browsable(false)]
        public override ILabel ParentLabel { get { return Parent is GroupList ? (Parent as GroupList).Parent as AbstractLabel : base.ParentLabel; } }

        /// <summary>
        /// načtení regionu z TagRegionu
        /// </summary>
        public override void LoadInformation()
        {
            // mimo jiné načtení skriptů
            base.LoadInformation();

            // pokud region není, pak není co řešit
            if (formatGroup != null)
            {
                dataName = Name = formatGroup.Name;
                Grouping = formatGroup.Grouping;
                formatGroup.Head.ForEach(LoadHead);
                formatGroup.Foot.ForEach(LoadFoot);
            }
            Foot.ListChanged += ListChanged;
            Head.ListChanged += ListChanged;
        }

        /// <summary>
        /// kreslení štítku
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public override void PaintLabel(Graphics graphics)
        {
            // zapamatujeme si transformační matici ovladače grafiky
            Matrix transform = graphics.Transform;

            bool _selected = ServiceSelection.SelectedComponents.Contains(this);
            Color _borderColor = _selected 
                ? Color.Green
                : (IsActive 
                    ? ColorService.InvertColor(CommonService.BorderColorNonactive) 
                    : CommonService.BorderColorNonactive);
            float _width = _selected ? 2 : 1;
            float zoom = GraphicSettingService.Zoom;
            float
                bodyHeight =
                (Index == (ParentLabel as GrrRegion).Group.Count - 1 ?
                Body.Height : (float)(ParentLabel as GrrRegion).Group[Index + 1].Height) * zoom,
                headHeight = Head.Height * zoom,
                footHeight = Foot.Height * zoom;

            //HEAD
            graphics.FillRectangle(new SolidBrush(IsActive ? ColorService.InvertColor(Color.Bisque) : Color.Bisque), LeftZoom, TopZoom, WidthZoom, headHeight);
            //BODY
            graphics.FillRectangle(new SolidBrush(IsActive ? ColorService.InvertColor(CommonService.BackgroundColorNonactive) : CommonService.BackgroundColorNonactive), LeftZoom, TopZoom + headHeight, WidthZoom, bodyHeight);
            //FOOT
            graphics.FillRectangle(new SolidBrush(IsActive ? ColorService.InvertColor(Color.BlueViolet) : Color.BlueViolet), LeftZoom, TopZoom + headHeight + bodyHeight, WidthZoom, footHeight);

            //vykreslení ohraničení 
            graphics.DrawRectangle(new Pen(new SolidBrush(_borderColor), _width), LeftZoom, TopZoom, WidthZoom, headHeight + bodyHeight + footHeight);

            // kreslení horní a spodní čár od štítku k obsahu
            // ReportDesignerProperties.Instance.StepBetween je přidan do Page.LeftZoom
            float rightPointLeft;
            if (LabledObject is IPage)
                rightPointLeft = Page != null ? Page.MarginLeft * zoom + Page.LeftZoom - ReportDesignerProperties.Instance.StepBetween : 0;
            else
                rightPointLeft = LabledObject != null ? LabledObject.LeftZoom : 0;

            graphics.DrawLine(new Pen(new SolidBrush(_borderColor), _width), LeftZoom, TopZoom, rightPointLeft, TopZoom);
            graphics.DrawLine(new Pen(new SolidBrush(_borderColor), _width), LeftZoom, TopZoom + headHeight + bodyHeight + footHeight, rightPointLeft, TopZoom + headHeight + bodyHeight + footHeight);

            #region DrawText
            // vypočet velikosti písma
            // zde zoom není zapotřebí při výpočtu ale až nakonec
            float _fontSize = ReportDesignerProperties.Instance.DefaultGroupFontSize;

            SizeF textSize = graphics.MeasureString(Name, new Font(SystemFonts.CaptionFont.FontFamily, _fontSize));
            while (Math.Round(textSize.Width - this.Height, 2) > 0 && _fontSize >= 1)
            {
                _fontSize -= 0.5f;
                if (_fontSize > 0)
                    textSize = graphics.MeasureString(Name, new Font(SystemFonts.CaptionFont.FontFamily, _fontSize));
            }
            if (_fontSize < 1)
                _fontSize += 1f;
            // vynásobíme nalezenou hodnotu faktorem zoomu
            _fontSize = _fontSize * zoom;

            graphics.RotateTransform(270f);

            // Nastavení formátu textu
            StringFormat textFormat = new StringFormat
            {
                FormatFlags = StringFormatFlags.NoWrap,
                Trimming = StringTrimming.Character,
                Alignment = StringAlignment.Center,
                LineAlignment = StringAlignment.Center
            };

            // Výpočet pozice
            float l = -(TopZoom + headHeight + bodyHeight + footHeight);

            // Výběr oblasti, do které se bude psát text
            RectangleF rectF = new RectangleF(0, 0, headHeight + bodyHeight + footHeight, WidthZoom);

            // Transformace souřadnic
            graphics.TranslateTransform(l, LeftZoom);

            // vykreslení textu 
            graphics.DrawString(Name, new Font(SystemFonts.CaptionFont.FontFamily, _fontSize), new SolidBrush(IsActive ? ColorService.InvertColor(CommonService.TextColorNonactive) : CommonService.TextColorNonactive), rectF, textFormat);
            #endregion

            // Obnovení ovladače grafiky
            graphics.Transform = transform;
        }
        /// <summary>
        /// aktualizace šířky štítkové zóny
        /// </summary>
        public override void UpdateLabelZoneSize()
        {
            float _maxWidth = 0;

            lock (syncRoot)
            {
                if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                {
                    foreach (var item in Body)
                        if (item is IGRRLabel)
                        {
                            (item as IGRRLabel).UpdateLabelZoneSize();
                            if ((item as IGRRLabel).LabelZoneSize > _maxWidth)
                                _maxWidth = (item as IGRRLabel).LabelZoneSize;
                        }
                }
                else
                    _maxWidth = (ParentLabel as GrrRegion).Group[Index + 1].LabelZoneSize;
                LabelZoneSize = _maxWidth + Width + ReportDesignerProperties.Instance.StepBetween;
            }
        }
        /// <summary>
        /// vazba na proměnné
        /// </summary>
        /// <param name="vars">seznam proměnných</param>
        public override void BindVariables(IListComponent<IVariable> vars)
        {
            if ((vars as System.Collections.ICollection).Count != 0)
            {
                Head.ForEach(BindVariableInLine, vars);
                Foot.ForEach(BindVariableInLine, vars);

                //System.Threading.Tasks.Task.WaitAll(
                //    new System.Threading.Tasks.Task[2]
                //    {
                //        System.Threading.Tasks.Task.Factory.StartNew(() => Head.ForEach(BindVariableInLine, vars)),
                //        System.Threading.Tasks.Task.Factory.StartNew(() => Foot.ForEach(BindVariableInLine, vars))
                //    });
            }
        }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        public override void SetXmlData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true)
        {
            XmlElement xmlNode = xmlElement.AppendChild(xmlDoc.CreateElement("group", xmlElement.NamespaceURI)) as XmlElement;
            xmlNode.SetAttribute("name", Name);
            xmlNode.SetAttribute("by", Grouping);

            //uložení skriptů
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
            // uložíme neznámé značky
            XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);

            Head.SetData(xmlNode, xmlDoc, styles, "head");
            if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                (ParentLabel as GrrRegion).Body.SetData(xmlNode, xmlDoc, styles, "body");
            else
                (ParentLabel as GrrRegion).Group.First(grp => grp is IGroup && (grp as IGroup).Index > Index).SetXmlData(xmlNode, xmlDoc, styles);
            Foot.SetData(xmlNode, xmlDoc, styles, "foot");
        }
        #endregion

        #region ISizeHandler
        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public override void ChangeLeft(float value = -1)
        {
            lock (syncRoot)
            {
                if (ParentLabel != null)
                {
                    AbstractLabel labelBefore = Index == 0 ? (Parent as AbstractLabel) : (ParentLabel as GrrRegion).Group[Index - 1];
                    this.Left = labelBefore.Left + labelBefore.Width + ReportDesignerProperties.Instance.StepBetween;
                    if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                        Body.ChangeLeft();
                }
            }
        }
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public override void SetHeight()
        {
            lock (syncRoot)
            {
                Head.SetHeight();
                float bodyHeight = 0;
                if (ParentLabel != null)
                {
                    if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                    {
                        Body.SetHeight();
                        bodyHeight = (ParentLabel as AbstractLabel).Body.Height;
                    }
                    else
                        bodyHeight = (ParentLabel as GrrRegion).Group[Index + 1].Height;
                }
                Foot.SetHeight();
                Height = new SizeValue(Head.Height + bodyHeight + Foot.Height);
            }
        }
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public override void ChangeWidth(float value)
        {
            lock (syncRoot)
            {
                Head.ChangeWidth(value);
                if (ParentLabel != null)
                    if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                        Body.ChangeWidth(value);

                Foot.ChangeWidth(value);
            }
        }
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public override void ChangeTop(float value)
        {
            lock (syncRoot)
            {
                if (ParentLabel != null)
                {
                    float _value = Index == 0 ? value
                    : (float)((ParentLabel as GrrRegion).Group[Index - 1].Top
                    + (ParentLabel as GrrRegion).Group[Index - 1].Head.Height);
                    Head.ChangeTop(_value);
                    if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                        Body.ChangeTop(_value + Head.Height);

                    if (Index == (ParentLabel as GrrRegion).Group.Count - 1)
                        Foot.ChangeTop(_value + Head.Height + Body.Height);
                    else
                        Foot.ChangeTop((ParentLabel as GrrRegion).Group[Index + 1].Height + Head.Height + _value);
                    this.Top = new SizeValue(Head.Top, "mm");
                }
            }
        }
        #endregion

        #region IDataItem
        /// <summary>
        /// úplný název datové položky
        /// </summary>
        [Category("Datová položka")] //RC 29450464 : Datová položka
        [ReadOnly(true)]
        [DisplayName("titulek")] //RC 29450465 : titulek
        [Description("Titulek datové položky")] //RC 29450466 : Titulek datové položky
        [Browsable(false)]
        public override string DataTitle { get; set; }

        protected string dataName;
        /// <summary>
        /// Datový název pložky
        /// </summary>
        [Category("Datová položka")] //RC 29450464 : Datová položka
        [ReadOnly(true)]
        [DisplayName("název")] //RC 29450467 : název
        [Description("Název datové položky")] //RC 29450468 : Název datové položky
        public override string DataName
        {
            get
            {
                if (string.IsNullOrEmpty(dataName))
                    dataName = !string.IsNullOrEmpty(DataFullName) ? DataFullName.Split('.').Last() : null;
                return dataName;
            }
        }

        protected string dataDescription;
        /// <summary>
        /// popis datové položky
        /// </summary>
        [Category("Datová položka")] //RC 29450464 : Datová položka
        [ReadOnly(true)]
        [DisplayName("popis")] //RC 29450469 : popis
        [Description("Popis datové položky")] //RC 29450470 : Popis datové položky
        public override string DataDescription
        {
            get
            {
                if (string.IsNullOrEmpty(dataDescription) && StructureItem != null)
                    dataDescription = structItem.Description;
                return dataDescription;
            }
            set { dataDescription = value; }
        }

        protected string dataFullName;
        /// <summary>
        /// úplný název položky 
        /// </summary>
        [Category("Datová položka")] //RC 29450464 : Datová položka
        [ReadOnly(true)]
        [DisplayName("úplný název")] //RC 29450471 : úplný název
        [Description("Úplný název datové položky")] //RC 29450472 : Úplný název datové položky
        public override string DataFullName
        {
            get
            {
                if (string.IsNullOrEmpty(dataFullName) && !string.IsNullOrEmpty(dataName))
                {
                    GFEStructure structure = PagePanel == null ?
                        LocalCommonService.GetActualStructure() : PagePanel.Structure;
                    if (structure != null)
                        dataFullName = CommonService.GetFullName(structure.Root, dataName, false, ref isRootElement);
                }
                return dataFullName;
            }
        }

        GFERegion structItem;
        bool isItemReload = false;
        /// <summary>
        /// Položka struktury
        /// </summary>
        [Browsable(false)]
        public override object StructureItem
        {
            get
            {
                if (structItem == null && !isItemReload && PagePanel != null)
                    if (!string.IsNullOrEmpty(DataFullName))
                    {
                        structItem = (GFERegion)CommonService.GetItemFromStructure(PagePanel.Structure, DataFullName, 2);
                        isItemReload = true;
                    }
                return structItem;
            }
            set { isItemReload = false; structItem = null; }
        }

        #endregion

        #region IGroup
        readonly UndoRedo<string> grouping = new UndoRedo<string>();
        /// <summary>
        /// Seskupení
        /// </summary>
        [Category("Skupina")] 
        [DisplayName("seskupení")] //RC 29450582 : seskupení
        [Description("Dle čeho se provádí seskupení")] //RC 29450583 : Dle čeho se prování seskupení
        public string Grouping { get { return grouping.Value; } set { grouping.Value = value; } }

        readonly UndoRedo<string> name = new UndoRedo<string>();
        /// <summary>
        /// Název skupiny
        /// </summary>
        [Category("Skupina")]
        [DisplayName("název")]
        [Description("Název skupiny")]
        public string Name { get { return name.Value; } set { name.Value = value; } }

        /// <summary>
        /// Index skupiny
        /// </summary>
        [Category("Skupina")]
        [DisplayName("index")]
        [Description("Index skupiny")]
        [ReadOnly(true)]
        public int Index { get { return ParentLabel is GrrRegion ? (ParentLabel as GrrRegion).Group.IndexOf(this) : 0; } }
        #endregion

        #region ILineManipulator
        /// <summary>
        /// vložení nového řádku před daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        public override void InsertBefore(object obj, bool config = false)
        {
            var gl = new GrrLine();
            gl.Initialize(this);

            IGRRLine newLine = gl.LoadInformation(obj, Page, config);
            switch (newLine.Type)
            {
                case LineType.foot:
                    Foot.InsertBefore(newLine, obj as IGRRLine, config);
                    break;
                case LineType.head:
                    Head.InsertBefore(newLine, obj as IGRRLine, config);
                    break;
                default:
                    Body.InsertBefore(newLine, obj, config);
                    break;
            }
        }
        /// <summary>
        /// vložení nového řádku za daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        public override void InsertAfter(object obj, bool config = false)
        {
            var gl = new GrrLine();
            gl.Initialize(this);

            IGRRLine newLine = gl.LoadInformation(obj, Page, config);
            switch (newLine.Type)
            {
                case LineType.foot:
                    Foot.InsertAfter(newLine, obj as IGRRLine, config);
                    break;
                case LineType.head:
                    Head.InsertAfter(newLine, obj as IGRRLine, config);
                    break;
                default:
                    Body.InsertAfter(newLine, obj, config);
                    break;
            }
        }
        /// <summary>
        /// vložení prázdného řádku do hlavičky
        /// </summary>
        /// <param name="type">Typ vkládaného objektu</param>
        /// <param name="lineType">typ nového řádku</param>
        public override void InsertTo(Type type, LineType lineType = LineType.body)
        {
            var gl = new GrrLine();
            gl.Initialize(this);

            IGRRLine newLine = gl.LoadInformation(null, Page, false);
            switch (lineType)
            {
                case LineType.foot:
                    if (newLine.Type != lineType)
                        newLine.Type = lineType;
                    //Foot.Add(newLine);
                    break;
                case LineType.head:
                    if (newLine.Type != lineType)
                        newLine.Type = lineType;
                    //Head.Add(newLine);
                    break;
                default:
                    Body.Add(newLine);
                    break;
            }
        }
        #endregion

        #region IKeyActionHandler
        /// <exclude/>
        public override IComponent GetLeftObject(object obj)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (lastItem)
                {
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindLastCondition(Foot).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }

                    var region = ParentLabel as GrrRegion;
                    var nextGroup = region.Group.FirstOrDefault(grp => (grp as GrrGroup).Index > this.Index);
                    if (nextGroup != null)
                        return (nextGroup as ALabel).GetLeftObject(obj);

                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FindLastCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                                if (_bodyLine.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetLeftObject(line);
                        }
                    }
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindLastCondition(Head).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }
                return base.GetLeftObject(obj);
            }

            if (obj is GrrGroup group)
            {
                if (Head.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindLastCondition(Head).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                var _hgroup = (ParentLabel as GrrRegion).Group.Count > 0 ? (ParentLabel as GrrRegion).Group.FirstOrDefault(gp => (gp as GrrGroup).Index < this.Index) : null;
                if (_hgroup is ALabel)
                    return (_hgroup as ALabel).GetLeftObject(_hgroup);

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetLeftObject(this);
            }
            return null;
        }
        /// <exclude/>
        public override IComponent GetRightObject(object obj)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (lastItem)
                {
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FirstOrDefaultCondition(Head).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }

                    GrrRegion region = ParentLabel as GrrRegion;
                    var nextGroup = region.Group.FirstOrDefault(grp => (grp as GrrGroup).Index > this.Index);
                    if (nextGroup != null)
                        return (nextGroup as ALabel).GetRightObject(obj);

                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetRightObject(line);
                        }
                    }
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FirstOrDefaultCondition(Foot).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }
                return base.GetRightObject(obj);
            }

            if (obj is GrrGroup group)
            {
                if (Foot.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FirstOrDefaultCondition(Foot).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                var _hgroup = (ParentLabel as GrrRegion).Group.Count > 0 ? (ParentLabel as GrrRegion).Group.LastOrDefault(gp => (gp as GrrGroup).Index < this.Index) : null;
                if (_hgroup is ALabel)
                    return (_hgroup as ALabel).GetRightObject(_hgroup);

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetRightObject(this);
            }
            return null;
        }
        /// <exclude/>
        public override IComponent GetTopObject(object obj, ISizable sizable)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (lastItem)
                {
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Foot.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }

                    var region = ParentLabel as GrrRegion;
                    var nextGroup = region.Group.FirstOrDefault(grp => (grp as GrrGroup).Index > this.Index);
                    if (nextGroup != null)
                        return (nextGroup as ALabel).GetTopObject(obj, sizable);

                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FindLastCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetTopObject(line, sizable);
                        }
                    }
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Head.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }
                return base.GetTopObject(obj, sizable);
            }

            if (obj is GrrGroup group)
            {
                if (Head.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindCellByTopConditions(Head.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                var _hgroup = (ParentLabel as GrrRegion).Group.Count > 0 ? (ParentLabel as GrrRegion).Group.FirstOrDefault(gp => (gp as GrrGroup).Index < this.Index) : null;
                if (_hgroup is ALabel)
                    return (_hgroup as ALabel).GetTopObject(_hgroup, sizable);

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetTopObject(this, sizable);
            }
            return null;
        }
        /// <exclude/>
        public override IComponent GetBottomObject(object obj, ISizable sizable)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (lastItem)
                {
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Head.First(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }

                    GrrRegion region = ParentLabel as GrrRegion;
                    var nextGroup = region.Group.FirstOrDefault(grp => (grp as GrrGroup).Index > this.Index);
                    if (nextGroup != null)
                        return (nextGroup as ALabel).GetBottomObject(obj, sizable);

                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetBottomObject(line, sizable);
                        }
                    }
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Foot.First(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }
                return base.GetBottomObject(obj, sizable);
            }

            if (obj is GrrGroup group)
            {
                if (Foot.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindCellByTopConditions(Foot.First(ln => !ln.IsComment), sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                var _hgroup = (ParentLabel as GrrRegion).Group.Count > 0 ? (ParentLabel as GrrRegion).Group.LastOrDefault(gp => (gp as GrrGroup).Index < this.Index) : null;
                if (_hgroup is ALabel)
                    return (_hgroup as ALabel).GetBottomObject(_hgroup, sizable);

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetBottomObject(this, sizable);
            }
            return null;
        }
        #endregion

        GFEFormatGroup formatGroup;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="item">položka analyzátoru</param>
        public GrrGroup(GFEFormatGroup item)
            : this()
        {
            this.formatGroup = item;
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public GrrGroup()
            : base()
        {
            Width = new SizeValue(ReportDesignerProperties.Instance.DefaultGroupWidth);            
        }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <param name="content">určuje, že hledání probíhá v obsahu štítku</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point, bool content)
        {
            object towed;
            if (content)
            {
                foreach (var item in Head)
                {
                    towed = item.GetTowedObject(point);
                    if (towed != null)
                        return towed;
                }
                foreach (var item in Foot)
                {
                    towed = item.GetTowedObject(point);
                    if (towed != null)
                        return towed;
                }
            }
            return null; 
        }
    }
}
