//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SideTabItem.cs                         </Name>
//    <Description> Položka záložky boční lišty                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Výčet stavů položky záložky boční lišty
    /// </summary>
    public enum SideTabItemStatus
    {
        /// <summary>
        /// Normální
        /// </summary>
        Normal,
        /// <summary>
        /// vybraná
        /// </summary>
        Selected,
        /// <summary>
        /// položka je zavřená
        /// </summary>
        Choosed,
        /// <summary>
        /// tažení
        /// </summary>
        Drag,
        /// <summary>
        /// tažení
        /// </summary>
        Draging
    }

    /// <summary>
    /// Položka záložky boční lišty
    /// </summary>
    public class SideTabItem : IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (Icon != null)
                {
                    Icon.Dispose();
                    Icon = null;
                }
        }
        ~SideTabItem() { Dispose(false); }
        #endregion

        /// <summary>
        /// Získání atributu dle kliče
        /// </summary>
        /// <param name="key">klič</param>
        /// <returns></returns>
        public string this[string key] { get { return entry?[key]; } }

        readonly ComponentTemplateEntry entry;
        /// <summary>
        /// položka konfigurační větve
        /// </summary>
        public ComponentTemplateEntry Entry { get { return entry; } }

        /// <summary>
        /// Obrázek záložky
        /// </summary>
        public Bitmap Icon { get; set; }

        /// <summary>
        /// Stav položky záložky
        /// </summary>
        public SideTabItemStatus SideTabItemStatus { get; set; }

        /// <summary>
        /// Název položky záložky
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Název položky záložky
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Odložený objekt
        /// </summary>
        public object Tag { get; set; }
        /// <summary>
        /// Indikuje možnost přejmenování položky
        /// </summary>
        public bool CanBeRenamed { get; set; } = true;

        /// <summary>
        /// Indikuje možnost odstranění položky
        /// </summary>
        public bool CanBeDeleted { get; set; } = true;

        /// <summary>
        /// Vytvoření nové položky
        /// </summary>
        /// <param name="name">Název vytvářené položky</param>
        public SideTabItem(string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                int idx = name.IndexOf("\n");
                this.Name = idx > 0 ? name.Substring(0, idx) : name;
            }
        }

        /// <summary>
        /// Vytvoření nové položky
        /// </summary>
        /// <param name="entry">Název vytvářené položky</param>
        public SideTabItem(GFETemplate entry)
        {
            if (entry == null)
                return;

            this.Name = entry.Name;
            this.Tag = entry.Content;
            this.Title = entry.Title;
        }
        /// <summary>
        /// Vytvořenín nové položky
        /// </summary>
        /// <param name="name">Název vytvářené položky</param>
        /// <param name="tag">Tag objekt položky</param>
        public SideTabItem(string name, object tag)
            : this(name)
        {
            this.Tag = tag;
        }

        /// <summary>
        /// Vytvoření nové instance položky
        /// </summary>
        /// <param name="name">Název vytvářenné položky</param>
        /// <param name="tag">Tag objekt položky</param>
        /// <param name="icon">Obrázek položky</param>
        public SideTabItem(string name, object tag, Bitmap icon)
            : this(name, tag)
        {
            this.Icon = new Bitmap(icon);
        }

        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        public SideTabItem(ComponentTemplateEntry entry)
            : this(entry.Display, entry.Value)
        {
            this.Icon = new Bitmap(entry.Icon);
            this.entry = entry;
        }

        /// <summary>
        /// KOpírování položky
        /// </summary>
        /// <returns></returns>
        public SideTabItem Clone() { return (SideTabItem)MemberwiseClone(); }

        /// <exclude/>
        public virtual void DrawItem(Graphics g, Font f, Rectangle rectangle)
        {
            int width = 0;
            switch (SideTabItemStatus)
            {
                case SideTabItemStatus.Normal:
                    if (Icon != null)
                    {
                        g.DrawImage(Icon, 0, rectangle.Y);
                        width = Icon.Width;
                    }
                    g.DrawString(Name, f, SystemBrushes.ControlText, new PointF(rectangle.X + width + 1, rectangle.Y + 1));
                    break;
                case SideTabItemStatus.Drag:
                    ControlPaint.DrawBorder3D(g, rectangle, Border3DStyle.RaisedInner);
                    rectangle.X += 1;
                    rectangle.Y += 1;
                    rectangle.Width -= 2;
                    rectangle.Height -= 2;

                    g.FillRectangle(SystemBrushes.ControlDarkDark, rectangle);
                    if (Icon != null)
                    {
                        g.DrawImage(Icon, 0, rectangle.Y);
                        width = Icon.Width;
                    }
                    g.DrawString(Name, f, SystemBrushes.HighlightText, new PointF(rectangle.X + width + 1, rectangle.Y + 1));
                    break;
                case SideTabItemStatus.Selected:
                    ControlPaint.DrawBorder3D(g, rectangle, Border3DStyle.RaisedInner);
                    if (Icon != null)
                    {
                        g.DrawImage(Icon, 0, rectangle.Y);
                        width = Icon.Width;
                    }
                    g.DrawString(Name, f, SystemBrushes.ControlText, new PointF(rectangle.X + width + 1, rectangle.Y + 1));
                    break;
                case SideTabItemStatus.Choosed:
                    ControlPaint.DrawBorder3D(g, rectangle, Border3DStyle.Sunken);
                    rectangle.X += 1;
                    rectangle.Y += 1;
                    rectangle.Width -= 2;
                    rectangle.Height -= 2;

                    using (Brush brush = new SolidBrush(ControlPaint.Light(SystemColors.Control)))
                        g.FillRectangle(brush, rectangle);

                    if (Icon != null)
                    {
                        g.DrawImage(Icon, 1, rectangle.Y + 1);
                        width = Icon.Width;
                    }
                    g.DrawString(Name, f, SystemBrushes.ControlText, new PointF(rectangle.X + width + 2, rectangle.Y + 2));
                    break;
            }
        }
    }
}
