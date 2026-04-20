//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AutoHideContainer.cs                   </Name>
//    <Description> Samo skrývající se kontainer objektů                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-24                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Widgets
{
    /// <summary>
    /// Samo skrývající se kontainer objektů
    /// </summary>
    public class AutoHideContainer : Panel
    {
        /// <summary>
        /// Ovladač panelu
        /// </summary>
        protected Control control;

        bool autoHide = true;
        bool showOverlay = false;
        /// <summary>
        /// Indikuje stav, kdy myš je nad objektem
        /// </summary>
        protected bool mouseIn;
        /// <summary>
        /// Indikuje automatické skrytí panelu
        /// </summary>
        public virtual bool AutoHide
        {
            get { return autoHide; }
            set
            {
                autoHide = value;
                Reformat();
            }
        }
        /// <summary>
        /// Zobrazit na povrchu
        /// </summary>
        public bool ShowOverlay
        {
            get { return showOverlay; }
            set
            {
                showOverlay = value;
                Reformat();
            }
        }
        /// <summary>
        /// přeformátování
        /// </summary>
        protected virtual void Reformat()
        {
            if (autoHide)
            {
                if (showOverlay)
                {
                    // zobrazit na povrchu
                    this.Height = ActivatorHeight;
                    control.Dock = DockStyle.None;
                    control.Size = new Size(this.Width, control.PreferredSize.Height);
                    if (this.Dock != DockStyle.Bottom)
                        control.Location = new Point(this.Left, this.Top);
                    else
                        control.Location = new Point(this.Left, this.Top - control.PreferredSize.Height + 1);
                    Parent.Controls.Add(control);
                    control.BringToFront();
                }
                else
                {
                    // skyté
                    this.Height = ActivatorHeight;
                    control.Dock = DockStyle.None;
                    control.Size = new Size(this.Width, 1);
                    control.Location = new Point(0, ActivatorHeight);
                    this.Controls.Add(control);
                }
            }
            else
            {
                // nepřetržité zobarzení
                this.Height = PreferredHeight;
                control.Dock = DockStyle.Fill;
                this.Controls.Add(control);
            }
        }
        /// <summary>
        /// Preferovaná výška
        /// </summary>
        protected virtual int PreferredHeight { get { return control.PreferredSize.Height; } }

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        /// <param name="control">Ovladač dané třídy</param>
        public AutoHideContainer(Control control)
        {
            ShowOnMouseMove = true;
            ShowOnMouseDown = true;
            ActivatorHeight = 1;
            this.control = control ?? throw new ArgumentNullException("control");
            this.MouseMove += delegate { if (ShowOnMouseMove) ShowOverlay = true; };
            this.MouseDown += delegate { if (ShowOnMouseDown) ShowOverlay = true; };
            control.MouseEnter += OnControlMouseEnter;
            control.MouseLeave += OnControlMouseLeave;
            Reformat();
        }

        /// <exclude/>
        protected virtual void OnControlMouseEnter(object sender, EventArgs e)
        {
            mouseIn = true;
        }

        /// <exclude/>
        protected virtual void OnControlMouseLeave(object sender, EventArgs e)
        {
            mouseIn = false;
            ShowOverlay = false;
        }

        /// <summary>
        /// Zobrazit, až kurzor bude nad oblasti
        /// </summary>
        public bool ShowOnMouseMove { get; set; }
        /// <summary>
        /// Zobrazit po opuštění myši
        /// </summary>
        public bool ShowOnMouseDown { get; set; }

        /// <summary>
        /// Barva aktivátoru
        /// </summary>
        public Color ActivatorColor
        {
            get { return this.ForeColor; }
            set { this.ForeColor = value; }
        }
        /// <summary>
        /// výška aktivátoru
        /// </summary>
        public int ActivatorHeight { get; set; }
    }
}
