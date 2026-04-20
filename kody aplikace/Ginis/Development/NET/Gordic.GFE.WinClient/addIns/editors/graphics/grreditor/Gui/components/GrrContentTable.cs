//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentTable.cs                     </Name>
//    <Description> objekt prezentující tabulku GRR formuláře                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// objekt prezentující tabulku GRR formuláře
    /// </summary>
    class GrrContentTable : AbstractContentLineable, ILineManipulator, IDesignSearchHandler
    {
        #region AbstractContentLineable
        List<string> knownTags;
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrrList/TableTags", null) as List<string>;
                return knownTags;
            }
        }
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent()
        {
            if (this.Lines != null)
            {
                float height = 0;
                foreach (var item in this.Lines)
                {
                    item.SetInternalHeight(false);
                    if (item.Height.Value != null)
                        height += item.Height;
                }

                if (IsHeightByContent && 
                    (Height < (height + Padding.TopPixels + Padding.BottomPixels))
                    || canChange)
                    this.Height = new SizeValue(height + Padding.TopPixels + Padding.BottomPixels, !string.IsNullOrEmpty(Height.Metrics) ? Height.Metrics : "mm");
            }
        }

        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point)
        {
            List<object> res = null;
            if (Lines != null)
                if (this.BoundsInPixels.Contains(point))
                {
                    res = new List<object>();

                    foreach (var item in this.Lines)
                    {
                        object obj = item.GetTowedObject(point);
                        if (obj != null)
                        {
                            res.Add(obj);
                            break;
                        }
                    }
                    if (!res.Contains(this))
                        res.Add(this);
                }
            return res;
        }
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud položka není obrázkem, pak není co řešit
            if (FormatTag is GFEFormatContentTable)
            {
                base.LoadInformation();

                // nastavíme velikosti
                SetSize();
                // nastavíme vnořené objekty
                SetChildren(FormatTag.Children);
            }
            else
                LoadInformation(fragment);
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(System.Drawing.Graphics graphics, PaintArgs args)
        {
            base.OnPaint(graphics, args);

            if (Lines != null)
                Lines.ForEach(line => line.IsVisible, TagService.PaintTag, graphics, args);
        }

        /// <summary>
        /// Metoda vracení XML struktury samotného elementu (bez STYLE)
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="withRect"></param>
        /// <param name="namespaceUri">jmenný prostor <paramref name="xmlDoc"/></param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="regionFullName">Úplný název aktuálního regionu</param>
        /// <returns>Element popisující samotný objekt bez stylů</returns>
        public override XmlLinkedNode GetDataComponent(XmlDocumentPosition xmlDoc, bool withRect = true, string namespaceUri = null, List<GFEList> styles = null, string regionFullName = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("table", string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);
            // uložíme velikost
            OnSettingSizeData(xmlNode);
            //uložíme všechny řádky v tabulce
            foreach (var item in Lines)
                item.SetData(xmlNode, xmlDoc, styles);

            return xmlNode;
        }

        /// <summary>
        /// se volá v průběhu získávání dat
        /// </summary>
        /// <param name="xmlStyle">Element dokumentu, do kterého se objekt vkládá</param>
        /// <param name="_actualXmlStyle">aktuální styl ze seznamu stylů</param>
        /// <param name="_newXmlStyle">nový styl do seznamu stylů</param>
        protected override void OnSettingData(XmlElement xmlStyle, ref GFEList _actualXmlStyle, ref GFEList _newXmlStyle) { }
        #endregion

        #region ISizeHandler
        /// <summary>
        /// pozice LEFT vnitřních objektu
        /// </summary>
        public override float ContentLeft { get { return base.ContentLeft + Padding.LeftPixels; } }
        /// <summary>
        /// šířka obsahu
        /// </summary>
        public override float ContentWidth { get { return base.ContentWidth - Padding.LeftPixels - Padding.RightPixels; } }

        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public override void SetHeight()
        {
            base.SetHeight();
            Lines.SetHeight();
            float res = this.Height - Padding.TopPixels - Padding.BottomPixels - Lines.Height;
            double rounded = Math.Round(res, 2);
            // pokud vznikl zbytek místa
            if (rounded > 0)
            {
                // najdeme řádek, výška která je závislá na obsahu
                if (Lines.LastOrDefault(itm => itm is GrrLine && !itm.IsComment && itm.IsHeightByContent) is GrrLine line)
                {
                    line.Height = new SizeValue(line.Height + res, "mm");
                    line.SetInternalHeight(false, true);
                }
            }
            else if (rounded < 0)
            {
                IGRRLine line = Lines.LastOrDefault(itm => itm is GrrLine && !itm.IsComment && itm.IsHeightByContent && (itm as GrrLine).IsEmpty);
                while (line != null)
                {
                    rounded = Math.Round(line.Height + res, 2);
                    if (rounded > 0)
                    {
                        line.Height = new SizeValue(line.Height + res, "mm");
                        line.SetInternalHeight(false, true);
                        break;
                    }

                    Lines.Remove(line);
                    if (rounded == 0)
                        break;
                    line = Lines.LastOrDefault(itm => itm is GrrLine && !itm.IsComment && itm.IsHeightByContent && (itm as GrrLine).IsEmpty) as GrrLine;
                }
            }
        }
        #endregion

        #region ILineManipulator
        /// <summary>
        /// posunutí aktuálního objektu o jeden dolů
        /// </summary>
        /// <param name="lineOrLabel">Posouváný objekt</param>
        public void ShiftDown(object lineOrLabel)
        {
            if (lineOrLabel is ILine)
            {
                int indexStart = Lines.IndexOf(lineOrLabel as IGRRLine);
                if (indexStart != -1)
                {
                    IGRRLine obj = Lines.FirstOrDefault(itm => Lines.IndexOf(itm) > indexStart);
                    if (obj != null)
                    {
                        int indexEnd = Lines.IndexOf(obj);
                        Lines.Reverse(indexStart, indexEnd - indexStart + 1);
                    }
                }
                //RefreshTop();
            }
        }
        /// <summary>
        /// posunutí aktuálního objektu o jeden dolů
        /// </summary>
        /// <param name="lineOrLabel">Posouváný objekt</param>
        public void ShiftUp(object lineOrLabel)
        {
            if (lineOrLabel is ILine)
            {
                int indexEnd = Lines.IndexOf(lineOrLabel as IGRRLine);
                IGRRLine obj = Lines.LastOrDefault(itm => Lines.IndexOf(itm) < indexEnd);
                if (obj != null)
                {
                    int indexStart = Lines.IndexOf(obj);
                    Lines.Reverse(indexStart, indexEnd - indexStart + 1);
                }
                //RefreshTop();
            }
        }

        /// <summary>
        /// vložení nového řádku před objekt <paramref name="obj"/>.
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        public void InsertBefore(object obj, bool config = false)
        {
            var gl = new GrrLine();
            gl.Initialize(this);

            IGRRLine line = gl.LoadInformation(obj, Page, config);
            line.Type = LineType.line;
            canChange = false;
            Lines.InsertBefore(line, obj, config);
            canChange = true;
        }
        /// <summary>
        /// vložení nového řádku za objet <paramref name="obj"/>
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        public void InsertAfter(object obj, bool config = false)
        {
            var gl = new GrrLine();
            gl.Initialize(this);

            IGRRLine line = gl.LoadInformation(obj, Page, config);
            line.Type = LineType.line;
            canChange = false;
            Lines.InsertAfter(line, obj, config);
            canChange = true;
        }
        bool canChange;
        /// <summary>
        /// vložení prázdného řádku do hlavičky
        /// </summary>
        /// <param name="type">Typ vkládaného objektu</param>
        /// <param name="lineType">typ nového řádku</param>
        public void InsertTo(Type type, LineType lineType = LineType.body)
        {
            var gl = new GrrLine();
            gl.Initialize(this);

            IGRRLine line = gl.LoadInformation(null, Page);
            line.Type = LineType.line;
            canChange = false;
            Lines.InsertAfter(line, null);
            canChange = true;
        }

        /// <summary>
        /// odstranění řádku ze seznamu
        /// </summary>
        /// <param name="line">řádek k odstranění</param>
        public void Delete(ILine line)
        {
            if (line != null && this.Lines.Contains(line))
                this.Lines.Remove(line as IGRRLine);
        }
        #endregion

        #region IKeyActionHandler
        /// <exclude/>
        public override IComponent GetLeftObject(object obj)
        {
            if (obj is IGRRLine line)
            {
                var _line = LocalCommonService.FindLastCondition(Lines, line);
                if (_line != null)
                {
                    if (_line.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
            }
            return this;
        }
        /// <exclude/>
        public override IComponent GetRightObject(object obj)
        {
            if (obj is IGRRLine line)
            {
                var _line = LocalCommonService.FirstOrDefaultCondition(Lines, line);
                if (_line != null)
                {
                    if (_line.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
            }
            return this;
        }
        /// <exclude/>
        public override IComponent GetTopObject(object obj, ISizable sizable)
        {
            if (obj is IGRRLine line)
            {
                var _line = LocalCommonService.FindLastCondition(Lines, line);
                if (_line != null)
                {
                    if (LocalCommonService.FindCellByTopConditions(_line, sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
            }
            return this;
        }
        /// <exclude/>
        public override IComponent GetBottomObject(object obj, ISizable sizable)
        {
            if (obj is IGRRLine line)
            {
                var _line = LocalCommonService.FirstOrDefaultCondition(Lines, line);
                if (_line != null)
                {
                    if (LocalCommonService.FindCellByTopConditions(_line, sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
            }
            return this;
        }
        #endregion

        #region IDesignSearchHandler
        /// <exclude/>
        public List<IComponent> SearchComponent(Point location)
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public List<IComponent> SearchComponentText(TextEditor.Document.ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();
            foreach (var item in this.Lines)
                result.AddRange((item as IDesignSearchHandler).SearchComponentText(selection));
            return result.Distinct().ToList();
        }
        #endregion

        /// <summary>
        /// řádky tabulky
        /// </summary>
        [Browsable(false)]
        public LineList Lines { get; set; }

        XmlElement fragment;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            canChange = true;
            knownTags = null;
            ComponentType = ComponentType.table;
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public override void Initialize(object clone)
        {
            base.Initialize(clone);
            if (clone is GrrContentTable table)
            {
                Lines = new LineList(this, UndoRedoService.Manager);
                if (table.Lines != null)
                {
                    Height = table.Lines.Height;
                    Top = table.Lines.Top;

                    foreach (var item in table.Lines)
                        if (item is IGRRLine)
                            Lines.Add(item.Clone() as IGRRLine);
                }

            }
            else Lines = new LineList(this, UndoRedoService.Manager);

            SetMethods();
            OnTopChanged(this, EventArgs.Empty);
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="item">Informace o formátu objektu.</param>
        public override AbstractContent Initialize(GFEFormatTag item)
        {
            base.Initialize(item);
            Lines = new LineList(this, UndoRedoService.Manager);
            SetMethods();
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        public override AbstractContent Initialize(SideTabItem node)
        {
            base.Initialize(node);
            Lines = new LineList(this, UndoRedoService.Manager);
            SetMethods();
            return this;
        }

        /// <summary>
        /// inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="fragment">obsah s částečným popisem objektu</param>
        public override AbstractContent Initialize(XmlElement fragment)
        {
            base.Initialize(fragment);
            Lines = new LineList(this, UndoRedoService.Manager);
            SetMethods();
            this.fragment = fragment;
            return this;
        }

        void LoadInformation(XmlElement fragment)
        {
            if (fragment != null)
                try
                {
                    TagService.SetHeightByAttribute(this, fragment.Attributes);
                    IsHeightByContent = Height.Value == null;

                    TagService.SetWidthByAttribute(this, fragment.Attributes);
                    IsWidthByContent = Width.Value == null;

                    if (fragment != null
                        && ParserService.IsWellFormedXML(fragment.OuterXml, out string errorMessage)
                        && fragment.ChildNodes.Count != 0)
                        foreach (XmlNode xmlNode in fragment.ChildNodes)
                        {
                            var gl = new GrrLine();
                            gl.Initialize(xmlNode as XmlElement, this);

                            Lines.Add(gl.LoadInformation(Page, LineType.body));
                        }
                }
                catch (Exception ex) { LoggingService.Error(ex.Message); }
        }

        void SetSize()
        {
            // nastavíme veličinu šířky
            if (this.Width.Value != null)
                if (Parent is ICell)
                {
                    if ((Parent as ICell).Line != null)
                        if (this.Width.Metrics == "%")
                            this.Width = new SizeValue(this.Width.Value, (Parent as ICell).Line.Width);
                        else this.Width = new SizeValue(this.Width, this.Width.Metrics, (Parent as ICell).Line.Width);
                }
                else if (this.Width.Metrics == "%")
                    this.Width = new SizeValue(this.Width.Value, Parent.Width);
                else this.Width = new SizeValue(this.Width, this.Width.Metrics, Parent.Width);
        }
        void SetChildren(dynamic childeList)
        {
            if (childeList is GfeFormatTags tags)
                // projdeme všechny vnořené prvky a vytvoříme je
                foreach (GFEFormatTag item in tags)
                {
                    var gl = new GrrLine();
                    gl.Initialize(item, this);

                    Lines.Add(gl.LoadInformation(Page, LineType.body));
                }
            else
            {

            }
        }
        void SetMethods()
        {
            this.WidthChanged += OnWidthChanged;
            this.TopChanged += OnTopChanged;
            this.LeftChanged += OnLeftChanged;
            this.Lines.ListChanged += OnListChanged;
        }
        void OnListChanged(object sender, EventArgs e)
        {
            if (!isLoading)
            {
                OnTopChanged(sender, e);
                SetHeightByContent();
            }
        }
        void OnWidthChanged(object sender, EventArgs e)
        {
            if (!isLoading)
                if (this.Width.Value != null && Lines != null)
                    foreach (var item in Lines)
                    {
                        item.SetInternalWidth(true);
                        item.SetInternalLeft();
                    }
        }
        void OnLeftChanged(object sender, EventArgs e)
        {
            if (!isLoading)
                foreach (var line in Lines)
                    line.Left = new SizeValue(this.ContentLeft, !string.IsNullOrEmpty(line.Left.Metrics) ? line.Left.Metrics : "mm");
        }
        void OnTopChanged(object sender, EventArgs e)
        {
            if (!isLoading)
            {
                float top = this.Top + Padding.TopPixels;
                foreach (var line in Lines)
                {
                    line.Top = new SizeValue(top, !string.IsNullOrEmpty(line.Top.Metrics) ? line.Top.Metrics : "mm");
                    top += line.Height;
                }
            }
        }
    }
}
