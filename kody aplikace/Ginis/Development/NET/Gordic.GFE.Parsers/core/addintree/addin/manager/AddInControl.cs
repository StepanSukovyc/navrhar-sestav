//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInControl.cs                          </Name>
//    <Description> hlavní ovladaè pro správu doplòku                           </Description>
//    <Author>      Mgr. Stepan Sukovyè                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.AddInManager
{
    /// <summary>
    /// hlavní ovladaè pro správu doplòku
    /// </summary>
    public class AddInControl : Control
    {
        readonly bool isExternal;

        AddIn addIn;
        /// <summary>
        /// informace o doplòku
        /// </summary>
        public AddIn AddIn { get { return addIn; } }

        bool selected;
        /// <summary>
        /// Get/Set vybranost doplòku
        /// </summary>
        public bool Selected
        {
            get { return selected; }
            set
            {
                if (selected != value)
                {
                    selected = value;
                    Invalidate();
                }
            }
        }

        /// <summary>
        /// vytvoøení ovladaèe dle doplòku
        /// </summary>
        /// <param name="addIn">objekt s informaci o doplòku</param>
        public AddInControl(AddIn addIn)
        {
            this.addIn = addIn;
            this.BackColor = SystemColors.Window;

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu("/AddIns/AddInManager/ContextMenu"));
            if (strip != null)
                ContextMenuStrip = strip;

            isExternal = !FileUtility.IsBaseDirectory(FileUtility.ApplicationRootPath, addIn.FileName)
                && !FileUtility.IsBaseDirectory(PropertyService.ConfigDirectory, addIn.FileName);

            this.ClientSize = new Size(100, isExternal ? 35 + pathHeight : 35);
            this.SetStyle(ControlStyles.Selectable, true);
            this.SetStyle(ControlStyles.UserPaint, true);
            this.SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
            this.SetStyle(ControlStyles.ResizeRedraw, true);
            this.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
        }

        Color Mix(Color c1, Color c2, double perc)
        {
            double p1 = 1 - perc;
            double p2 = perc;
            return Color.FromArgb((int)(c1.R * p1 + c2.R * p2),
                                  (int)(c1.G * p1 + c2.G * p2),
                                  (int)(c1.B * p1 + c2.B * p2));
        }

        /// <exclude/>
        protected override void OnClick(EventArgs e)
        {
            base.OnClick(e);
            Focus();
        }
        /// <exclude/>
        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            Rectangle bounds = this.ClientRectangle;
            bounds.Offset(1, 1);
            bounds.Inflate(-2, -2);
            Color startColor = SystemColors.ControlLightLight;
            Color endColor = SystemColors.Control;
            if (selected)
            {
                startColor = Mix(SystemColors.ControlLightLight, SystemColors.Highlight, 0.1);
                endColor = Mix(SystemColors.ControlLightLight, SystemColors.Highlight, 0.65);
            }

            const int egdeRadius = 3;
            const int innerMargin = egdeRadius + 2;

            using (Brush gradient = new LinearGradientBrush(bounds,
                                                     startColor,
                                                     endColor,
                                                     LinearGradientMode.ForwardDiagonal))
            using (GraphicsPath path = RoundedRectangle.Create(bounds.Left, bounds.Top, bounds.Width, bounds.Height, egdeRadius))
            {
                g.FillPath(gradient, path);
                g.DrawPath(SystemPens.ControlText, path);
            }

            string description = GetText(out Brush textBrush);
            int titleWidth;
            using (Font boldFont = new Font("Arial", 8, FontStyle.Bold))
            {
                g.DrawString(addIn.Name, boldFont, textBrush, innerMargin, innerMargin);
                titleWidth = (int)g.MeasureString(addIn.Name, boldFont).Width + 1;
            }

            if (addIn.Version != null && addIn.Version.ToString() != "0.0.0.0")
                g.DrawString(addIn.Version.ToString(), Font, textBrush, innerMargin + titleWidth + 4, innerMargin);

            RectangleF textBounds = bounds;
            textBounds.Offset(innerMargin, innerMargin);
            textBounds.Inflate(-innerMargin * 2, -innerMargin * 2 + 2);
            if (isExternal)
                textBounds.Height -= pathHeight;
            using (StringFormat sf = new StringFormat(StringFormatFlags.LineLimit))
            {
                sf.Trimming = StringTrimming.EllipsisWord;
                g.DrawString(description, Font, textBrush, textBounds, sf);
            }

            if (isExternal)
            {
                textBounds.Y = textBounds.Bottom + 2;
                textBounds.Height = pathHeight + 2;
                using (Font font = new Font(Font.Name, 7, FontStyle.Italic))
                using (StringFormat sf = new StringFormat(StringFormatFlags.NoWrap))
                {
                    sf.Trimming = StringTrimming.EllipsisPath;
                    sf.Alignment = StringAlignment.Far;
                    g.DrawString(addIn.FileName, font,
                                 selected ? SystemBrushes.HighlightText : SystemBrushes.ControlText,
                                 textBounds, sf);
                }
            }
        }

        const int pathHeight = 10;

        string GetText(out Brush textBrush)
        {
            switch (addIn.Action)
            {
                case AddInAction.Enable:
                    if (addIn.Enabled)
                    {
                        textBrush = SystemBrushes.ControlText;
                        return addIn.Properties["description"];
                    }
                    else
                    {
                        textBrush = SystemBrushes.ActiveCaption;
                        return GResources.GetResourceText(29450530);
                    }
                case AddInAction.Disable:
                    textBrush = SystemBrushes.GrayText;
                    return addIn.Enabled ? GResources.GetResourceText(29450531) : GResources.GetResourceText(29450532);
                case AddInAction.Install:
                    textBrush = SystemBrushes.ActiveCaption;
                    return GResources.GetResourceText(29450533);
                case AddInAction.Uninstall:
                    textBrush = SystemBrushes.GrayText;
                    return GResources.GetResourceText(29450534);
                case AddInAction.Update:
                    textBrush = SystemBrushes.ActiveCaption;
                    return GResources.GetResourceText(29450535);
                case AddInAction.InstalledTwice:
                    textBrush = Brushes.Red;
                    return GResources.GetResourceText(29450536);
                case AddInAction.DependencyError:
                    textBrush = Brushes.Red;
                    return GResources.GetResourceText(29450537);
                case AddInAction.CustomError:
                    textBrush = Brushes.Red;
                    return StringParser.Parse(addIn.CustomErrorMessage);
                default:
                    textBrush = Brushes.Yellow;
                    return addIn.Action.ToString();
            }
        }
    }
}
