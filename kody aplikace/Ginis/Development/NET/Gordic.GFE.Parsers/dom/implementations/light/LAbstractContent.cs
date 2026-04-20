//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LAbstractContent.cs                      </Name>
//    <Description> lehký abstraktní obsah                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-02                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System.Drawing;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Light
{
    /// <summary>
    /// lehký abstraktní obsah
    /// </summary>
    abstract public class LAbstractContent : ISizeByContent, ISizable, IZoomSizable, ICloneable
    {
        #region PropertyISizable
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("šířka")]
        [Description("Šířka objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PWidth
        {
            get
            {
                if (Parent is ICell && IsWidthByContent) return null;
                return !Width.IsEmpty ? Width.MathRoundValue(2) : null;
            }
            set
            {
                if (string.IsNullOrEmpty(value) || value.Trim().Equals(GResources.GetResourceText(29450721)))
                {
                    if (Parent is ICell)
                    {
                        if (!IsWidthByContent)
                            IsWidthByContent = true;
                    }
                    else
                        MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450306), "'{0}'", GResources.GetResourceText(29450307)), value); //RC 29450307 : není platná!
                }
                else
                {
                    if (Parent is ICell && IsWidthByContent)
                        IsWidthByContent = false;

                    if (value.StartsWith("-"))
                        value = "0mm";

                    if (Width.IsEmpty && UnitConverter.IsWidthValidFormat(value))
                        Width = new SizeValue(value);
                    else
                        switch (value.ToLowerInvariant())
                        {
                            case "pc":
                            case "%":
                                if (Parent is ICell)
                                    Width = new SizeValue(UnitConverter.ConvertTo(Width, value, Width.PC100), Width.PC100);
                                else
                                    MessageService.ShowMessage(GResources.GetResourceText(29450308)); //RC 29450308 : Objekt se nenachází v řádku a proto mu nelze nastavit '%' hodnotu!
                                break;
                            case "mm":
                                Width = new SizeValue(UnitConverter.ConvertTo(Width, value), Width.PC100);
                                break;
                            case "tw":
                                Width = new SizeValue(UnitConverter.ConvertTo(Width, value), Width.PC100);
                                break;
                            default:
                                if (UnitConverter.IsWidthValidFormat(value))
                                {
                                    ICell cl = Parent as ICell;
                                    // pokud se jedná o poslední buňku
                                    if (cl != null
                                        && cl.Line != null
                                        && cl.Line.LastOrDefault(ccl => !ccl.IsComment) == cl)
                                        (this as IChangeable).SetWidthByLeftSide((Width - (new SizeValue(value, Width.PC100))) / zoom);
                                    else
                                    {
                                        //(this as IChangeable).SetWidthByRightSide(((new SizeValue(value, Width.PC100)) - Width) / zoom);
                                        Width = new SizeValue(value, Width.PC100);
                                        if (cl != null && cl.Line != null)
                                            cl.Line.RefreshWidthLeft();
                                    }
                                }
                                else
                                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450306), "'{0}'", GResources.GetResourceText(29450307)), value); //RC 29450307 : není platná!
                                break;
                        }
                }
            }
        }
        /// <summary>
        /// Výška objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("výška")]
        [Description("Výška objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PHeight
        {
            get
            {
                if (Parent is ICell && IsHeightByContent) return null;
                return Height.MathRoundValue(2);
            }
            set
            {
                if (string.IsNullOrEmpty(value) || value.Trim().Equals(GResources.GetResourceText(29450721)))
                {
                    if (Parent is ICell)
                    {
                        if (!IsHeightByContent)
                            IsHeightByContent = true;

                        (Parent as ICell).Line.IsLoading = true;
                        (Parent as ICell).Line.CheckIsHeightByContent();
                        (Parent as ICell).Line.IsLoading = false;
                    }
                    else
                        MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450309), "'{0}'", GResources.GetResourceText(29450307)), value); //RC 29450307 : není platná!
                }
                else
                {
                    if (Parent is ICell && IsHeightByContent)
                        IsHeightByContent = false;

                    if (value.StartsWith("-"))
                        value = "0mm";

                    if (Height.IsEmpty && UnitConverter.IsHeightValidFormat(value))
                        Height = new SizeValue(value);
                    else
                        switch (value.ToLowerInvariant())
                        {
                            case "mm":
                                Height = new SizeValue(UnitConverter.ConvertTo(Height, value));
                                break;
                            case "tw":
                                Height = new SizeValue(UnitConverter.ConvertTo(Height, value));
                                break;
                            default:
                                if (UnitConverter.IsHeightValidFormat(value))
                                    Height = new SizeValue(value);
                                else
                                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450309), "'{0}'", GResources.GetResourceText(29450307)), value);
                                break;
                        }
                }
            }
        }
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("zleva")]
        [Description("Pozice zleva objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PLeft
        {
            get { return !Left.IsEmpty ? Left.MathRoundValue(2) : null; }
            set
            {
                if (Left.IsEmpty && UnitConverter.IsHeightValidFormat(value))
                    Left = new SizeValue(value);
                else
                    switch (value.ToLowerInvariant())
                    {
                        case "mm":
                            Left = new SizeValue(UnitConverter.ConvertTo(Left, value));
                            break;
                        case "tw":
                            Left = new SizeValue(UnitConverter.ConvertTo(Left, value));
                            break;
                        default:
                            if (UnitConverter.IsHeightValidFormat(value))
                                Left = new SizeValue(value);
                            else
                                MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450310), "'{0}'", GResources.GetResourceText(29450307)), value); //RC 29450310 : Hodnota pozice zleva objektu
                            break;
                    }
            }
        }
        /// <summary>
        /// Šířka objektu
        /// </summary>
        [Category("Pozice a velikost")]
        [DisplayName("shora")]
        [Description("Pozice shora objektu")]
        [TypeConverter(typeof(_StringSizeValueConverter))]
        public string PTop
        {
            get { return !Top.IsEmpty ? Top.MathRoundValue(2) : null; }
            set
            {
                if (Top.IsEmpty && UnitConverter.IsHeightValidFormat(value))
                    Top = new SizeValue(value);
                else
                    switch (value.ToLowerInvariant())
                    {
                        case "mm":
                            Top = new SizeValue(UnitConverter.ConvertTo(Top, value));
                            break;
                        case "tw":
                            Top = new SizeValue(UnitConverter.ConvertTo(Top, value));
                            break;
                        default:
                            if (UnitConverter.IsHeightValidFormat(value))
                                Top = new SizeValue(value);
                            else
                                MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450311), "'{0}'", GResources.GetResourceText(29450307)), value); //RC 29450311 : Hodnota pozice shora objektu
                            break;
                    }
            }
        }
        #endregion

        #region ISizeByContent
        /// <summary>
        /// indikuje, že výška je dle obsahu
        /// </summary>
        public virtual bool IsHeightByContent { get; set; }
        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        public virtual bool IsWidthByContent { get; set; }
        /// <summary>
        /// Nastavení výšky dle obsahu
        /// </summary>
        public virtual void SetHeightByContent() { }
        #endregion

        #region IParentable
        /// <summary>
        /// Vlastník daného objektu
        /// </summary>
        [Browsable(false)]
        public virtual ISizable Parent { get; set; }
        #endregion

        #region ISizable
        /// <summary>
        /// reakce na změnu šířky objektu
        /// </summary>
        protected EventHandler widthChanged;
        /// <summary>
        /// regulace počtu metod na reakce na změnu šířky objektu
        /// </summary>
        public event EventHandler WidthChanged
        {
            add { widthChanged -= value; widthChanged += value; }
            remove { widthChanged -= value; }
        }

        SizeValue m_width;
        /// <summary>
        /// šířka objektu
        /// </summary>
        [Browsable(false)]
        public virtual SizeValue Width { get => m_width; set { m_width = value; OnBoundsChanged(); } }

        /// <summary>
        /// indikuje, že právě probíhá změna velikosti daného objektu
        /// </summary>
        protected bool isHeightChanging;
        /// <summary>
        /// reakce na změnu výšky objektu
        /// </summary>
        protected EventHandler heightChanged;
        /// <summary>
        /// regulace počtu metod na reakce na změnu výšky objektu
        /// </summary>
        public event EventHandler HeightChanged
        {
            add { heightChanged -= value; heightChanged += value; }
            remove { heightChanged -= value; }
        }
        SizeValue m_height;
        /// <summary>
        /// Výška objektu
        /// </summary>
        [Browsable(false)]
        public virtual SizeValue Height { get => m_height; set { m_height = value; OnBoundsChanged(); } }

        /// <summary>
        /// reakce na změnu pozice zleva objektu
        /// </summary>
        protected EventHandler leftChanged;
        /// <summary>
        /// regulace počtu metod na reakce na změnu pozice zleva objektu
        /// </summary>
        public event EventHandler LeftChanged
        {
            add { leftChanged -= value; leftChanged += value; }
            remove { leftChanged -= value; }
        }
        SizeValue m_left;
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        [Browsable(false)]
        public virtual SizeValue Left { get => m_left; set { m_left = value; OnBoundsChanged(); } }

        /// <summary>
        /// reakce na změnu pozice shora objektu
        /// </summary>
        protected EventHandler topChanged;
        /// <summary>
        /// regulace počtu metod na reakce na změnu pozice shora objektu
        /// </summary>
        public event EventHandler TopChanged
        {
            add { topChanged -= value; topChanged += value; }
            remove { topChanged -= value; }
        }
        SizeValue m_top;
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        [Browsable(false)]
        public virtual SizeValue Top { get => m_top; set { m_top = value; OnBoundsChanged(); } }

        /// <summary>
        /// indikuje změnu výšky
        /// </summary>
        [Browsable(false)]
        public virtual bool IsHeightChanged { get => false; }

        /// <summary>
        /// Nastala zmena Left,Top,Width,Height
        /// </summary>
        protected virtual void OnBoundsChanged() { }

        #endregion

        #region IZoomSizable
        /// <summary>
        /// veličina zvětšení
        /// </summary>
        readonly float zoom = 1f;
        /// <summary>
        /// veličina zvětšení
        /// </summary>
        [Browsable(false)]
        public virtual float Zoom { get => zoom; }
        /// <summary>
        /// šířka - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public virtual float WidthZoom { get => Width * Zoom; }

        /// <summary>
        /// výška - včetně Zoom
        /// </summary>
        [Browsable(false)]
        public virtual float HeightZoom { get => Height * Zoom; }

        /// <summary>
        /// Pozice zleva objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public virtual float LeftZoom { get => Left * Zoom; }

        /// <summary>
        /// Pozice shora objektu - včetně Zoom hodnoty
        /// </summary>
        [Browsable(false)]
        public virtual float TopZoom { get => Top * Zoom; }
        /// <summary>
        /// Velikost objektu v pixelech - se Zoom faktorem
        /// </summary>
        [Browsable(false)]
        public System.Drawing.RectangleF BoundsInPixels { get => new System.Drawing.RectangleF(LeftZoom, TopZoom, WidthZoom, HeightZoom); }
        #endregion

        #region ICloneable
        /// <summary>
        /// Creates a new object that is a copy of the current instance
        /// </summary>
        /// <returns>A new object that is a copy of this instance.</returns>
        public virtual object Clone()
        {
            dynamic obj = Activator.CreateInstance(GetType());
            obj.Initialize(this);
            obj.LoadInformation();
            return obj;
        }
        #endregion

        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        protected Graphics computeGraphics;
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        protected virtual Graphics ComputeGraphics { get => computeGraphics; }

        /// <summary>
        /// indikuje, že objekt je v režimu načtení
        /// </summary>
        protected bool isLoading;
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public abstract void LoadInformation();

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public LAbstractContent() { }

        /// <summary>
        /// Inicializace objektu dle dostupných informaci
        /// </summary>
        /// <param name="clone">objekt ke kopírování</param>
        public virtual void Initialize(object clone)
        {
            isLoading = true;
            if (clone is ISizable)
            {
                Left = (clone as ISizable).Left;
                Top = (clone as ISizable).Top;
                Width = (clone as ISizable).Width;
                Height = (clone as ISizable).Height;
            }

            if (clone is ISizeByContent)
            {
                IsWidthByContent = (clone as ISizeByContent).IsWidthByContent;
                IsHeightByContent = (clone as ISizeByContent).IsHeightByContent;
            }

            if (clone is IAttributeHandler && this is IAttributeHandler)
                (this as IAttributeHandler).AttrList = (GFEAttrList)(clone as IAttributeHandler).AttrList.Clone();

            if (clone is ISurroundable && this is ISurroundable)
            {
                var S = clone as ISurroundable;
                (this as ISurroundable).Surround = (IComplexSurround)Activator.CreateInstance(S.Surround.GetType());
                (this as ISurroundable).Surround.Initialize(S.Surround);
                (this as ISurroundable).InnerSurround = (IInnerSurround)Activator.CreateInstance(S.InnerSurround.GetType());
                (this as ISurroundable).InnerSurround.Initialize(S.InnerSurround);
            }

            if (clone is IAnchored && this is IAnchored)
                (this as IAnchored).Anchor = (clone as IAnchored).Anchor;

            if (clone is IPositionHandler && this is IPositionHandler)
            {
                (this as IPositionHandler).StartPosition = (clone as IPositionHandler).StartPosition;
                (this as IPositionHandler).EndPosition = (clone as IPositionHandler).EndPosition;
            }

            if (clone is IScriptHandler && this is IScriptHandler)
                (this as IScriptHandler).Scripts = (GFEScriptList)(clone as IScriptHandler).Scripts.Clone();

            if (clone is ITagComponent && this is ITagComponent)
            {
                if (clone is ITagComponent tK)
                {
                    (this as ITagComponent).Padding = (IComplexFive)Activator.CreateInstance(tK.Padding.GetType());
                    (this as ITagComponent).Padding.Initialize(tK.Padding);

                    (this as ITagComponent).Spacing = (IComplexFive)Activator.CreateInstance(tK.Spacing.GetType());
                    (this as ITagComponent).Spacing.Initialize(tK.Spacing);
                }
                (this as ITagComponent).Page = (clone as ITagComponent).Page;
            }

            if (this is ITextHandler && clone is ITextHandler && clone is ITextHandler tt)
            {
                (this as ITextHandler).Text = (ITagText)Activator.CreateInstance(tt.Text.GetType());
                (this as ITextHandler).Text.Initialize(tt.Text, true, true);
            }

            if (clone is IBackground && this is IBackground)
            {
                IBackground bcg = clone as IBackground;
                Type[] types = new Type[1];
                types[0] = bcg.BackColor.GetType();

                (this as IBackground).BackColor = ((IComplexColor)Activator.CreateInstance(bcg.BackColor.GetType())).Initialize(bcg.BackColor);

                (this as IBackground).ShowBackground = (clone as IBackground).ShowBackground;
                if (bcg.BackImage != null)
                    (this as IBackground).BackImage = new BackgroundImage(bcg.BackImage);
            }

            if (clone is IDrawing && this is IDrawing)
            {
                (this as IDrawing).Edge = (clone as IDrawing).Edge;
                (this as IDrawing).Fill = (clone as IDrawing).Fill;
                (this as IDrawing).Gap = (clone as IDrawing).Gap;
                (this as IDrawing).Angle = (clone as IDrawing).Angle;
                (this as IDrawing).Shape = (clone as IDrawing).Shape;
            }

            if (clone is IXMLContent && this is IXMLContent)
                (this as IXMLContent).InnerText = (clone as IXMLContent).InnerText;

            if (clone is IImage && this is IImage)
            {
                (this as IImage).ContentImageHeight = new SizeValue((clone as IImage).ContentImageHeight);
                (this as IImage).ContentImageWidth = new SizeValue((clone as IImage).ContentImageWidth);
                (this as IImage).Global = (clone as IImage).Global;
                (this as IImage).WidthSizeType = (clone as IImage).WidthSizeType;
                (this as IImage).HeightSizeType = (clone as IImage).HeightSizeType;
                (this as IImage).ImageFileName = (clone as IImage).ImageFileName;
            }

            if (clone is IDataItem && this is IDataItem)
            {
                (this as IDataItem).DataDescription = (clone as IDataItem).DataDescription;
                (this as IDataItem).DataTitle = (clone as IDataItem).DataTitle;
            }
            if (clone is IRDArgumentHandler && this is IRDArgumentHandler)
                (this as IRDArgumentHandler).Edit = (clone as IRDArgumentHandler).Edit;

            if (clone is IComment && this is IComment)
            {
                (this as IComment).CommentText = (clone as IComment).CommentText;
                (this as IComment).TagName = (clone as IComment).TagName;
            }

            if (clone is IValidateHandler && this is IValidateHandler)
                (this as IValidateHandler).Validates.AddRange((clone as IValidateHandler).Validates);

            isLoading = false;
        }

        /// <summary>
        /// Inicializace objektu z informací o formátu objektu
        /// </summary>
        /// <param name="item">položka objektu</param>
        /// <param name="view">pohled</param>
        public virtual void Initialize(GFEFormatTag item, IViewContent view) { }
    }
}
