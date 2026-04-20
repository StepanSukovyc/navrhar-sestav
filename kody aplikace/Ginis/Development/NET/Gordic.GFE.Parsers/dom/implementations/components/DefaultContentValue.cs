//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentValue.cs                       </Name>
//    <Description> Datová položka GRF sestavy                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using System.Windows.Forms;
using System.Drawing.Drawing2D;
using System.Collections.Generic;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Datová položka GRF sestavy.
    /// Text se plní v metodě OnPaint
    /// </summary>
    public class DefaultContentValue : DefaultAbstractContent, IDefaultDataItemHandler, IMouseComponent, IEditableContent, IInlineContent
    {
        #region AbstractContent
        /// <summary>
        /// Přetížení kvůli zjištění existence ovládacího prvku daného objektu
        /// </summary>
        protected override bool IsSelected
        {
            get { return base.IsSelected ? base.IsSelected && !(DataItem != null && DataItem.Edit) : base.IsSelected; }
        }
        string TypeRaw { get; set; }        

        public override void LoadInformation()
        {
            if (isLoaded)
                return;

            base.LoadInformation();

            GFEFormatContent _content = (GFEFormatContent)FormatTag;
            if (_content.Attributes.ContainsKey("format"))
                Text.Format = _content.Attributes["format"];
            else if (StructureItem != null)
                Text.Format = StructureItem.Attributes["default-format"];

            if (AttrList.ContainsKey("type"))
                TypeRaw = AttrList["type"];
        }

        void IEditableContent.OnTextChanged()
        {
        }
        string IEditableContent.ComboItems
        {
            get { return AttrList.GetValueDefault("items",null) ?? StructureItem?.Attributes.GetWithDefault("items", null) ?? string.Empty ; }
        }
        /// <summary>Datový název položky klíče</summary>
        string IEditableContent.ComboKeyName
        {
            get
            {
                if(AttrList.TryGetValue("key-name", out string name)) return name;

                name = DataName;
                if (name.EndsWith("_txt") == false) return null;
                name = name.Substring(0, name.Length - 4);
                return name;
            }
        }
        /// <summary>Datový název položky hodnoty</summary>
        string IEditableContent.ComboValueName { get { return DataName; } }

        GFEDataItem structItem;
        /// <summary>
        /// Položka struktury
        /// </summary>
        public GFEDataItem StructureItem
        {
            get
            {
                if (structItem == null)
                    if (!string.IsNullOrEmpty(DataName) && PageControl != null)
                        structItem = (GFEDataItem)CommonService.GetItemFromStructure(PageControl.Structure, DataFullPath, 1);
                return structItem;
            }
        }
        /// <summary>Titulek pole</summary>
        public string StructureItemTitle => StructureItem?.FullName;
        /// <summary>Popis pole</summary>
        public string StructureItemDescription => StructureItem?.Description;

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                dataItem = new DefaultDataItem();
                dataItem.AttachData(this, dataRegion);
            }
        }
        protected internal override void AfterLoad()
        {
            //pokud existuje onData skript, musim ho spustit hned. Kvuli spravnemu poradi skriptu (v pripade, ze by neco delali s globalnimi promennymi)
            if (Scripts.ContainsKey("onData") || Scripts.ContainsKey("onValidate") || Scripts.ContainsKey("onEnter") || Validators.Count > 0)
                dataItem.SetValue(runOnData: true, runOnEnter: true);
        }
        #endregion

        #region IDefaultDataItemHandler
        /// <summary>
        /// Aktualizace datového obsahu
        /// </summary>
        /// <param name="content">aktuální obsah</param>
        public void UpdateContent(object content)
        {
            if (content == null) return; //co to toto?
            dataItem.UpdateDataContent(DataName, content, true);
        }
        /// <summary>
        /// Update souvisejícího obsahu (ale není přímo vázána)
        /// </summary>
        public void UpdateContent(string dataName, object content)
        {
            if (string.IsNullOrEmpty(dataName) && string.IsNullOrEmpty(DataName) == false) //tak nic
            {
                return;
            }
            dataItem.UpdateDataContent(dataName, content, dataName == DataName);
        }

        DefaultDataItem dataItem;
        /// <summary>
        /// Propojení mezí daty a danou položkou
        /// </summary>
        public IDefaultDataItem DataItem { get { return dataItem; } }

        #endregion

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.valueof;
            LoadInformation();
        }
        InlineText IInlineContent.InlineText => Text.Inline;

        /// <summary>Formátovaný text pro zobrazení v políčku</summary>
        public string FormattedText
        {
            get { DataItem.SetDisplayValue(); return Text.Text; }
        }
        /// <summary>Neformátovaná hodnota políčka</summary>
        public object UnformattedValue
        {
            get { DataItem.SetDisplayValue(); return DataItem.Value; }
        }

        /// <summary>
        /// kliknutí na datovou položku
        /// </summary>
        /// <param name="x">abscisa kliknutí</param>
        /// <param name="y">ordinata kliknutí</param>
        public void Click(float x, float y) { dataItem.RunOnClick(); }

        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, dataItem.OnClick != null);
        }

        protected override void DrawContent(Graphics graphics)
        {
            base.DrawContent(graphics);
            if ("list".Equals(TypeRaw) && DataItem != null && DataItem.Edit)
            {
                int buttonWidth = SystemInformation.VerticalScrollBarWidth;
                Color highColor = SystemColors.ControlLightLight;
                Color lowColor = SystemColors.ControlDark;
                Rectangle itemRect = new Rectangle((int)(this.LeftZoom + this.WidthZoom) - buttonWidth, (int)this.TopZoom, buttonWidth + 2, (int)this.HeightZoom + 2);

                //Create the brushes.            
                LinearGradientBrush gradientBrush = new LinearGradientBrush(itemRect, highColor, lowColor, LinearGradientMode.Vertical);

                //Fill the rectangle background.
                graphics.SmoothingMode = SmoothingMode.AntiAlias;
                graphics.FillRectangle(gradientBrush, itemRect);
                gradientBrush.Dispose();

                //Draw the button outline.
                Pen outlinePen = new Pen(SystemColors.ButtonShadow, 2.0f);
                graphics.DrawRectangle(outlinePen, itemRect.X, itemRect.Y, itemRect.Width - 2, itemRect.Height - 2);
                outlinePen.Dispose();

                //Draw the arrow.
                SolidBrush arrowBrush = new SolidBrush(Color.DarkGray);
                Point[] points = new Point[3];
                points[0] = new Point((int)(this.LeftZoom + this.WidthZoom) - (int)((double)itemRect.Width * .125), (int)(this.TopZoom + (double)itemRect.Height * .333));
                points[1] = new Point((int)(this.LeftZoom + this.WidthZoom) - (int)((double)itemRect.Width * .875), (int)(this.TopZoom + (double)itemRect.Height * .333));
                points[2] = new Point((int)(this.LeftZoom + this.WidthZoom) - (int)((double)itemRect.Width * .5), (int)(this.TopZoom + (double)itemRect.Height * .666));

                graphics.FillPolygon(arrowBrush, points);
                arrowBrush.Dispose();
            }
        }

        protected override List<GValidationAttribute> CreateValidators()
        {
            var l = base.CreateValidators();
            DataItem.CreateValidators(l);
            return l;
        }
    }
}
