//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrRegion.cs                           </Name>
//    <Description> region sestav GRR                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-24                                                  </Created>
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
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.WinClient.Labels;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// region sestav GRR
    /// </summary>
    public class GrrRegion : ALabel, IVariableHandler, IRegion
    {
        #region AbstractLabel
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
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/RegionTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// metoda kreslí pouze vnitřek (řádky) štítku.
        /// samotný štítek se kreslí v přetížení s odkazem na obsah
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(System.Drawing.Graphics graphics, PaintArgs args)
        {
            // odstraněné objekty nevykreslujeme
            if (graphics == null || (float)Height == 0)
                return;

            // vykreslíme vnitřek sekce HEAD
            // vykreslíme vnitřní NEvybrané komponenty 
            Head.ForEach(tag => tag != null, TagService.PaintTag, graphics, args);
            Group.OnPaint(graphics, args);
            // vykreslíme vnitřek sekce BODY
            // vykreslíme vnitřní NEvybrané komponenty 
            Body.ForEach(tag => tag != null, TagService.PaintTag, graphics, args);
            // vykreslíme vnitřek sekce FOOT
            // vykreslíme vnitřní NEvybrané komponenty 
            Foot.ForEach(tag => tag != null, TagService.PaintTag, graphics, args);
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
            Color _borderColor = Parent is GrrLabelZone ? Color.Red :
                (_selected
                    ? Color.Red
                    : (IsActive
                            ? ColorService.InvertColor(CommonService.BorderColorNonactive)
                            : CommonService.BorderColorNonactive));
            float _width = _selected ? 2 : 1;
            float zoom = GraphicSettingService.Zoom;
            float bodyHeight = (Group.Count != 0 ? Group.Height : Body.Height) * zoom,
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
                rightPointLeft = LabledObject != null ? LabledObject.MarginLeft * zoom + LabledObject.LeftZoom - ReportDesignerProperties.Instance.StepBetween : 0;
            else
                rightPointLeft = LabledObject != null ? LabledObject.LeftZoom : 0;

            graphics.DrawLine(new Pen(new SolidBrush(_borderColor), _width), LeftZoom, TopZoom, rightPointLeft, TopZoom);
            graphics.DrawLine(new Pen(new SolidBrush(_borderColor), _width), LeftZoom, TopZoom + headHeight + bodyHeight + footHeight, rightPointLeft, TopZoom + headHeight + bodyHeight + footHeight);

            // filter-out
            if (!string.IsNullOrEmpty(this.FilterOut))
                TagService.FillTagCube(graphics, new PointF(LeftZoom + 1, TopZoom + 1), zoom: zoom);

            // filter-in
            if (!string.IsNullOrEmpty(this.FilterIn))
                TagService.FillTagCube(graphics, new PointF(LeftZoom + 4 * zoom + 2, TopZoom + 1), col: "blue", zoom: zoom);

            // only-if
            if (!string.IsNullOrEmpty(this.OnlyIf))
                TagService.FillTagCube(graphics, new PointF(LeftZoom + 8 * zoom + 3, TopZoom + 1), col: "green", zoom: zoom);

            // order-by
            if (!string.IsNullOrEmpty(this.OrderBy))
                TagService.FillTagCube(graphics, new PointF(LeftZoom + 12 * zoom + 4, TopZoom + 1), col: "yellow", zoom: zoom);

            #region DrawText
            string _labelText = DataTitle;

            // vypočet velikosti písma
            // zde zoom není zapotřebí při výpočtu ale až nakonec
            float _fontSize = ReportDesignerProperties.Instance.DefaultGroupFontSize;

            SizeF textSize = graphics.MeasureString(_labelText, new Font(SystemFonts.CaptionFont.FontFamily, _fontSize));
            while (Math.Round(textSize.Width - this.Height, 2) > 0 && _fontSize >= 1)
            {
                _fontSize -= 0.5f;
                if (_fontSize > 0)
                    textSize = graphics.MeasureString(_labelText, new Font(SystemFonts.CaptionFont.FontFamily, _fontSize));
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

            if (IsActive)
                // vykreslení textu 
                graphics.DrawString(_labelText, new Font(SystemFonts.CaptionFont.FontFamily, _fontSize), new SolidBrush(ColorService.InvertColor(CommonService.TextColorNonactive)), rectF, textFormat);
            else
                graphics.DrawString(_labelText, new Font(SystemFonts.DefaultFont.FontFamily, _fontSize), new SolidBrush(CommonService.TextColorNonactive), rectF, textFormat);
            #endregion

            // Obnovení ovladače grafiky
            graphics.Transform = transform;

            Group.PaintLabel(graphics);
            foreach (object item in Body.FindAll(itm => itm is IGRRLabel))
                (item as IGRRLabel).PaintLabel(graphics);
        }

        /// <summary>
        /// aktualizace šířky štítkové zóny
        /// </summary>
        public override void UpdateLabelZoneSize()
        {
            float _maxWidth = 0;
            float groupWidth = 0;

            lock (syncRoot)
            {
                if (Group.Count != 0)
                {
                    Group.UpdateLabelZoneSize(ReportDesignerProperties.Instance.StepBetween);
                    groupWidth = Group.Width + ReportDesignerProperties.Instance.StepBetween;
                }
                foreach (var item in Body)
                    if (item is IGRRLabel)
                    {
                        (item as IGRRLabel).UpdateLabelZoneSize();
                        if ((item as IGRRLabel).LabelZoneSize > _maxWidth)
                            _maxWidth = (item as IGRRLabel).LabelZoneSize;
                    }

                _maxWidth += groupWidth;
                if (_maxWidth == 0)
                    _maxWidth = ReportDesignerProperties.Instance.StepBetween;

                LabelZoneSize = _maxWidth + Width + ReportDesignerProperties.Instance.StepBetween;
            }
        }
        /// <summary>
        /// načtení regionu z FormatTag
        /// </summary>
        public override void LoadInformation()
        {
            // mimo jiné načtení skriptů
            base.LoadInformation();

            bool isUnknown = false;
            var reg = FormatTag as GFEFormatRegion;
            if (reg == null)
            {
                if (FormatTag != null)
                    reg = FormatTag.Region;

                isUnknown = true;
            }
            if (reg != null)
            {
                _DataName = reg.Name;
                _DataFullName = reg.DataFullName;

                OnlyIf = reg.Attributes.ExistsByKey(key => key.Equals("only-if")) ? reg.Attributes["only-if"] : string.Empty;
                OrderBy = reg.Attributes.ExistsByKey(key => key.Equals("order-by")) ? reg.Attributes["order-by"] : string.Empty;
                FilterOut = reg.Attributes.ExistsByKey(key => key.Equals("filter-out")) ? reg.Attributes["filter-out"] : string.Empty;
                FilterIn = reg.Attributes.ExistsByKey(key => key.Equals("filter-in")) ? reg.Attributes["filter-in"] : string.Empty;

                PropertyTitle = reg.Attributes.ExistsByKey(key => key.Equals("interactive-add")) ? reg.Attributes["interactive-add"] : string.Empty;
                PropertyIsInteractive = !string.IsNullOrEmpty(PropertyTitle);

                // v případě hlavního regionu
                // se vezme první vnořený region a 
                // uskuteční se jeho načtení
                // fix: načtení všech v těle
                if (!string.IsNullOrEmpty(this.DataName)
                    && this.DataName.Equals("root", StringComparison.InvariantCultureIgnoreCase))
                    foreach (var _reg in reg.Body)
                    {
                        //GFEFormatRegion region = reg.Body.FirstOrDefault(rg => rg is GFEFormatRegion) as GFEFormatRegion;
                        if (_reg is GFEFormatRegion region)
                        {
                            Body.Add((new GrrRegion(region)).Initialize(LabledObject));
                            IsRootElement = true;
                        }
                    }
                else if (isUnknown)
                {
                    // jinak načteme sekci BODY
                    FormatTag.Children.ForEach(LoadBody);

                    //Body.Add((new GrrRegion(FormatTag)).Initialize(LabledObject));
                    IsRootElement = true;
                }
            }
            if (!IsRootElement)
            {
                // vše, co proběhne výše se týká pouze NEroot regionu
                Variables = new UndoRedoList<IVariable>(UndoRedoService.Manager);
                // pokud region není, pak není co řešit
                if (reg == null)
                    return;

                reg.Variables?.ForEach(AddVariable);

                // vytvoříme vizuální řádky pro sekci HEAD
                reg.Head.ForEach(LoadHead);
                // vytvoříme vizuální řádky pro sekci FOOT
                reg.Foot.ForEach(LoadFoot);

                // do regionu teď přidáme skupiny pokud existuji
                // a zároveň získáme poslední skupinu, 
                // které následně patří vnořené regiony ze sekce BODY daného regionu
                if (reg.Groups != null && reg.Groups.Count != 0)
                    reg.Groups.ForEach(LoadGroup);

                // jinak načteme sekci BODY
                reg.Body.ForEach(LoadBody);

                if ((Variables as System.Collections.ICollection).Count != 0)
                    BindVariables(Variables);

                Foot.ListChanged += ListChanged;
            }

            Head.ListChanged += ListChanged;
            Body.ListChanged += ListChanged;

            foreach (var item in KnownTags)
                if (AttrList.ContainsKey(item))
                    AttrList.Remove(item);
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
                foreach (var item in Group)
                {
                    towed = item.GetTowedObject(point, true);
                    if (towed != null)
                        return towed;
                }
                foreach (var item in Body)
                {
                    towed = item is AbstractLabel ? (item as AbstractLabel).GetTowedObject(point, true) : (item as IGRRLine).GetTowedObject(point);
                    if (towed != null)
                        return towed;
                }
            }
            else
            {
                if (this.BoundsInPixels.Contains(point))
                    return this;
                else if (Group.Count != 0)
                    foreach (var subItem in Group)
                        if (subItem.BoundsInPixels.Contains(point))
                            return subItem;

                foreach (var item in Body)
                    if (item is AbstractLabel)
                    {
                        towed = (item as AbstractLabel).GetTowedObject(point, false);
                        if (towed != null)
                            return towed;
                    }
            }

            return null;
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
                if (Group.Count != 0)
                    foreach (var item in Group)
                        item.BindVariables(vars);
                Body.ForEach(BindVariable, vars);

                //Task.WaitAll(new Task[4]
                //{
                //    Task.Factory.StartNew(() => Head.ForEach(BindVariableInLine, vars)),
                //    Task.Factory.StartNew(() => Foot.ForEach(BindVariableInLine, vars)),
                //    Task.Factory.StartNew(
                //    delegate
                //    {
                //        if (Group.Count != 0)
                //            foreach (var item in Group)
                //                item.BindVariables(vars);
                //    }),

                //    Task.Factory.StartNew(() => Body.ForEach(BindVariable, vars))
                //});
            }
        }

        /// <summary>
        /// Načtení informací o štítku dle řádku a nastavení
        /// </summary>
        /// <param name="line">řádek s informací o štítku</param>
        /// <param name="sen">nastavení</param>
        public override IGRRLabel LoadInformation(dynamic line, object sen)
        {
            base.LoadInformation();

            if (sen is StructExtNode)
            {
                // nastavení datových hodnot
                DataDescription = (sen as StructExtNode).DataRegion.FullName;
                dataTitle = !string.IsNullOrEmpty((sen as StructExtNode).DataRegion.FullName) ? (sen as StructExtNode).DataRegion.FullName : null;
                _DataFullName = (sen as StructExtNode).FullName;
                _DataName = (sen as StructExtNode).Name;
            }

            bool insertnewLine = true;
            if (line is IGRRLine)
            {
                Page = line.Page;
                if (ReportDesignerProperties.Instance.GrrAutoIncludeLineContentIncludeLine)
                {
                    if (line.Parent is AbstractLabel)
                        (line.Parent as AbstractLabel).Body.Remove(line);

                    Body.Add(line);
                    insertnewLine = false;
                }
            }

            if (insertnewLine)
            {
                var gl = new GrrLine();
                // nastavení parent objektu seznam
                gl.Initialize(this);

                IGRRLine newLine = gl.LoadInformation(null, Page);
                // přidání jediného prázdného řádku
                Body.Add(newLine);
            }

            Foot.ListChanged += ListChanged;
            Head.ListChanged += ListChanged;
            Body.ListChanged += ListChanged;

            return this;
        }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        public override void SetXmlData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true)
        {
            if (!IsRootElement)
            {
                XmlElement xmlNode = xmlElement.AppendChild(xmlDoc.CreateElement("region", xmlElement.NamespaceURI)) as XmlElement;
                xmlNode.SetAttribute("name", DataName);

                //uložení skriptů
                XmlDocumentService.SetListOfDictionaryItems(xmlNode, Scripts, styles);
                // uložíme neznámé značky
                XmlDocumentService.SetListOfDictionaryItems(xmlNode, Unknowns, styles);
                //uložíme proměnné pokud existují
                XmlDocumentService.SetVariables(xmlNode, xmlDoc, Variables, "variable", "name", "value", "datatype");

                if (!string.IsNullOrEmpty(OrderBy) && string.IsNullOrEmpty(xmlNode.GetAttribute("order-by")))
                    xmlNode.SetAttribute("order-by", OrderBy);
                if (!string.IsNullOrEmpty(OnlyIf) && string.IsNullOrEmpty(xmlNode.GetAttribute("only-if")))
                    xmlNode.SetAttribute("only-if", OnlyIf);
                if (!string.IsNullOrEmpty(FilterIn) && string.IsNullOrEmpty(xmlNode.GetAttribute("filter-in")))
                    xmlNode.SetAttribute("filter-in", FilterIn);
                if (!string.IsNullOrEmpty(FilterOut) && string.IsNullOrEmpty(xmlNode.GetAttribute("filter-out")))
                    xmlNode.SetAttribute("filter-out", FilterOut);
                if (!string.IsNullOrEmpty(PropertyTitle) && string.IsNullOrEmpty(xmlNode.GetAttribute("interactive-add")))
                    xmlNode.SetAttribute("interactive-add", PropertyTitle);

                Head.SetData(xmlNode, xmlDoc, styles, "head");
                if (Group.Count > 0)
                    Group.First().SetXmlData(xmlNode, xmlDoc, styles);
                else
                    Body.SetData(xmlNode, xmlDoc, styles, "body");
                Foot.SetData(xmlNode, xmlDoc, styles, "foot");
            }
            else
            {
                if (Parent is GrrLabelZone lZ)
                    if (lZ.LObject is IPage)
                        // fix: více kořenových regionů
                        //(Body.First(el => el is IGRRLabel) as IGRRLabel).SetXmlData(xmlElement, xmlDoc, styles);
                        foreach (var item in Body.FindAll(itm => itm is IGRRLabel))
                            (item as IGRRLabel).SetXmlData(xmlElement, xmlDoc, styles);
                    else
                    {
                        Head.SetData(xmlElement, xmlDoc, styles);
                        Body.SetData(xmlElement, xmlDoc, styles);
                    }
            }
        }
        /// <summary>
        /// Aktualizace položky
        /// </summary>
        public override void RefreshByStructure()
        {
            if (Group.Count != 0)
                ThreadService.SafeThreadAsyncCall(delegate { _RefreshByStructure(Group); });
            else
                base.RefreshByStructure();
        }
        #endregion

        #region IDataItem
        string dataTitle;
        /// <summary>
        /// úplný název datové položky
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("titulek")]
        [Description("Titulek datové položky")]
        public override string DataTitle
        {
            get
            {
                if (string.IsNullOrEmpty(dataTitle))
                    dataTitle = StructureItem != null ? structItem.FullName : null;

                if (string.IsNullOrEmpty(dataTitle))
                    return DataName;

                return dataTitle;
            }
            set { dataTitle = value; }
        }
        /// <summary>
        /// vnitřní objekt DataName
        /// </summary>
        protected string _DataName;
        /// <summary>
        /// Datový název pložky
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("název")]
        [Description("Název datové položky")]
        public override string DataName
        {
            get
            {
                if (string.IsNullOrEmpty(_DataName))
                    _DataName = !string.IsNullOrEmpty(DataFullName) ? DataFullName.Split('.').Last() : null;
                return _DataName;
            }
        }

        /// <summary>
        /// vnitřní objekt DataDescription
        /// </summary>
        protected string _DataDescription;
        /// <summary>
        /// popis datové položky
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("popis")]
        [Description("Popis datové položky")]
        public override string DataDescription
        {
            get
            {
                if (string.IsNullOrEmpty(_DataDescription) && StructureItem != null)
                    _DataDescription = structItem.Description;
                return _DataDescription;
            }
            set { _DataDescription = value; }
        }
        /// <summary>
        /// vnitřní objekt DataFullName
        /// </summary>
        protected string _DataFullName;
        /// <summary>
        /// úplný název položky 
        /// </summary>
        [Category("Datová položka"), ReadOnly(true)]
        [DisplayName("úplný název")]
        [Description("Úplný název datové položky")]
        public override string DataFullName
        {
            get
            {
                if (string.IsNullOrEmpty(_DataFullName) && !string.IsNullOrEmpty(_DataName))
                {
                    GFEStructure structure = PagePanel == null ?
                        LocalCommonService.GetActualStructure() : PagePanel.Structure;
                    if (structure != null)
                        _DataFullName = CommonService.GetFullName(structure.Root, _DataName);
                }
                return _DataFullName;
            }
            set { _DataFullName = value; }
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
                if (LabledObject is IPage)
                    this.Left = new SizeValue(Parent is IGRRLabel ? (Parent.Left + Parent.Width) + ReportDesignerProperties.Instance.StepBetween : ReportDesignerProperties.Instance.StepBetween);
                else
                    this.Left = (Parent is GrrLabelZone ? Parent.Left : Parent.Left + Parent.Width) + ReportDesignerProperties.Instance.StepBetween;

                if (Group.Count != 0)
                    Group.ChangeLeft(value);
                Body.ChangeLeft(value);
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
                if (Group.Count != 0)
                    Group.SetHeight();
                Body.SetHeight();
                Foot.SetHeight();
                Height = new SizeValue(Head.Height + (Group.Count != 0 ? Group.Height : Body.Height) + Foot.Height
                    , "mm");
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
                if (Group.Count != 0)
                    Group.ChangeWidth(value);

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
                this.Top = new SizeValue(value);
                Head.ChangeTop(value);
                if (Group.Count != 0)
                    Group.ChangeTop(value + Head.Height);
                // pokud existuje skupina, 
                //pak nastavení TOP pozice těla se volá ze skupiny
                else
                    Body.ChangeTop(value + Head.Height);
                Foot.ChangeTop(value + Head.Height + (Group.Count != 0 ? Group.Height : Body.Height));
            }
        }
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

        #region IRegion
        GroupList group;
        /// <summary>
        /// případná skupina těla štítku
        /// </summary>
        [Browsable(false)]
        public GroupList Group { get { if (group == null) group = new GroupList(this, UndoRedoService.Manager); return group; } }

        readonly UndoRedo<string> onlyif = new UndoRedo<string>();
        /// <summary>
        /// jenom když
        /// </summary>
        [DisplayName("jenom když")]
        [Description("Atribut jenom když")]
        public string OnlyIf { get => onlyif.Value; set => onlyif.Value = value; }
        readonly UndoRedo<string> filterout = new UndoRedo<string>();
        /// <summary>
        /// filter
        /// </summary>
        [DisplayName("filter OUT")]
        [Description("Atribut FilterOut")]
        public string FilterOut { get => filterout.Value; set => filterout.Value = value; }
        readonly UndoRedo<string> filterin = new UndoRedo<string>();
        /// <summary>
        /// filter
        /// </summary>
        [DisplayName("filter IN")]
        [Description("Atribut FilterIn")]
        public string FilterIn { get => filterin.Value; set => filterin.Value = value; }
        readonly UndoRedo<string> orderby = new UndoRedo<string>();
        /// <summary>
        /// řazení
        /// </summary>
        [DisplayName("řazení")]
        [Description("Atribut OrderBy")]
        public string OrderBy { get => orderby.Value; set => orderby.Value = value; }
        #endregion

        #region IInteractive
        /// <summary>
        /// Seskupení
        /// </summary>
        [Category("Interaktivita")]
        [DisplayName("interaktivní")]
        [Description("Indikuje interaktivitu objektu")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        public bool PropertyIsInteractive { get { return Interactive.IsInteractive; } set { Interactive.IsInteractive = value; } }

        /// <summary>
        /// Seskupení
        /// </summary>
        [Category("Interaktivita")]
        [DisplayName("text")]
        [Description("Interaktivní text")]
        public string PropertyTitle { get { return Interactive.Title; } set { Interactive.Title = value; } }
        #endregion

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
                        structItem = (GFERegion)CommonService.GetItemFromStructure(PagePanel.Structure, DataFullName);
                        isItemReload = true;
                    }
                return structItem;
            }
            set { isItemReload = false; structItem = null; }
        }

        /// <summary>
        /// proměnné regionu
        /// </summary>
        [Browsable(false)]
        public IListComponent<IVariable> Variables { get; protected set; }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="reg">region sestavy</param>
        public GrrRegion(GFEFormatRegion reg)
            : base(reg)
        {
            if (group == null)
                group = new GroupList(this, UndoRedoService.Manager);

            Width = new SizeValue(ReportDesignerProperties.Instance.DefaultLabelWidth);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        protected GrrRegion()
             : base()
        {
            IUndoRedoManager manager = UndoRedoService.Manager;
            // vytvoření seznamu atributů (prázdného)
            AttrList = new GFEAttrList(manager);
            // pokud neexistuje seznam skupin, tak ho vytvoříme
            if (group == null)
                group = new GroupList(this, manager);

            //nastavení šířky dle konfigurace
            Width = new SizeValue(ReportDesignerProperties.Instance.DefaultLabelWidth);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tag"></param>
        public GrrRegion(GFEFormatTag tag)
            : base(tag)
        {
            if (group == null)
                group = new GroupList(this, UndoRedoService.Manager);

            Width = new SizeValue(ReportDesignerProperties.Instance.DefaultLabelWidth);
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="labledObject"></param>
        public GrrRegion(ILabledObject labledObject)
            : this()
        {
            // TODO: Complete member initialization
            //if (!(labledObject is IPage))
            this.LabledObject = labledObject;
        }

        void LoadGroup(GFEFormatGroup item)
        {
            // vytvoříme skupinu
            Group.Add(new GrrGroup(item).Initialize(LabledObject) as GrrGroup);
        }
        void LoadBody(GFEFormatTag item)
        {
            if (item is GFEFormatRegion)
            {
                Body.Add(new GrrRegion(item as GFEFormatRegion).Initialize(LabledObject));
                if (Group.Count != 0)
                    (Body.Last() as IParentable).Parent = Group.Last();
            }
            else if (item is GFEFormatGRRLine || item is GFEFormatComment
                // případ GrfGrid objektu
                || item is GFEFormatGRFBlock)
            {
                var gl = new GrrLine();
                gl.Initialize(item, this);

                if (item.TagName.Equals("columns"))
                    Head.Add(gl.LoadInformation(Page, LineType.head));
                else
                    Body.Add(gl.LoadInformation(Page, LineType.body));
            }
        }
        void AddVariable(GFEFormatVariable item)
        {
            Variables.Add(new VariableNode(item) { Region = this });
        }
        void BindVariable(object obj, params object[] vars)
        {
            if (obj is IGRRLine)
                BindVariableInLine(obj as IGRRLine, vars);
            else if (obj is AbstractLabel)
                (obj as AbstractLabel).BindVariables(vars[0] as UndoRedoList<IVariable>);
        }
    }
}
