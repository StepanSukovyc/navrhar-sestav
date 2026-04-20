//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CustomDialog.cs                        </Name>
//    <Description> vlastní dialogové okno                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// vlastní dialogové okno
    /// </summary>
    public partial class CustomDialog : Form, IMementoCapable
    {
        #region IMementoCapable
        Rectangle normalBounds;
        /// <summary>
        /// kvůli velikosti při prvním načtení dialogového okna
        /// </summary>
        bool handlecreated;

        /// <summary>
        /// Klíč k uložení vlastností
        /// </summary>
        public string PropertiesDefalut { get; set; }

        /// <summary>
        /// Uložení vlastnosti dialogového okna
        /// </summary>
        /// <returns></returns>
        public Property CreateMemento()
        {
            Property properties = new Property();
            properties["bounds"] = normalBounds.X.ToString(NumberFormatInfo.InvariantInfo)
                + "," + normalBounds.Y.ToString(NumberFormatInfo.InvariantInfo)
                + "," + normalBounds.Width.ToString(NumberFormatInfo.InvariantInfo)
                + "," + normalBounds.Height.ToString(NumberFormatInfo.InvariantInfo);

            return properties;
        }
        /// <summary>
        /// Načtení vlastnosti dialogového okna
        /// </summary>
        /// <param name="properties">Vlastnosti</param>
        public void SetMemento(Property properties)
        {
            if (properties != null && properties.Contains("bounds"))
            {
                string[] bounds = properties["bounds"].Split(',');
                if (bounds.Length == 4)
                    this.Bounds = normalBounds = new Rectangle(int.Parse(bounds[0], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[1], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[2], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[3], NumberFormatInfo.InvariantInfo));
            }
            else 
                this.Bounds = normalBounds = new Rectangle(Location, Size);
        }
        #endregion

        /// <summary>
        /// uživatelský ovladač
        /// </summary>
        Control UserControl { 
            get { return pContent.Controls.Count != 0 ? pContent.Controls[0] : null; }
            set
            {
                if (value != null && UserControl != value)
                {
                    pContent.Controls.Clear();
                    pContent.Controls.Add(value);
                    if (!handlecreated)
                        this.Size = new Size(value.Size.Width, value.Size.Height + 116);
                }
            }
        }

        /// <summary>
        /// Po změně pozice okna je zapotřebí poznamenat i změny Bounds
        /// </summary>
        protected override void OnLocationChanged(System.EventArgs e)
        {
            base.OnLocationChanged(e);
            if (this.WindowState == FormWindowState.Normal && handlecreated)
                normalBounds = this.Bounds;
        }
        /// <summary>
        /// Po změně velikosti si zapamatujeme velikost a pozici formu
        /// </summary>
        /// <param name="e"></param>
        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            if (this.WindowState == FormWindowState.Normal && handlecreated)
                normalBounds = this.Bounds;
        }
        /// <summary>
        /// Po vytvoření okna, načteme jeho vlastnosti
        /// </summary>
        protected override void OnHandleCreated(System.EventArgs e)
        {
            base.OnHandleCreated(e);
            SetMemento(PropertyService.Get(string.IsNullOrEmpty(PropertiesDefalut) ? "Dialog.CustomDialog" : PropertiesDefalut, new Property()));
            handlecreated = true;
        }
        /// <summary>
        /// Uložíme vlastnosti okna po ukončení
        /// </summary>
        protected override void OnClosing(System.ComponentModel.CancelEventArgs cancel)
        {
            PropertyService.Set(string.IsNullOrEmpty(PropertiesDefalut) ? "Dialog.CustomDialog" : PropertiesDefalut, CreateMemento());
            base.OnClosing(cancel);
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        protected CustomDialog()
        {
            InitializeComponent();
            Icon = WinFormsResourceService.GetIcon("Icons__Gin__vlastnictvi_moje");
            PropertiesDefalut = "Dialog.CustomDialog";
        }

        /// <summary>
        /// vytvoření nové instance třídy s obsahem
        /// </summary>
        /// <param name="node">konfigurační větev obsahu</param>
        public CustomDialog(AddInTreeNode node)
            : this()
        {
            if (node != null)
            {
                List<IDialogPanelDescriptor> list = node.BuildChildItems<IDialogPanelDescriptor>(this);
                if (list.Count != 0 && list.First().DialogPanel != null)
                {
                    if (list.First().DialogPanel is AbstractOptionPanel)
                    {
                        (list.First().DialogPanel as AbstractOptionPanel).LoadPanelContents();
                        UserControl = list.First().DialogPanel.Control;
                    }
                }
            }
        }

        /// <summary>
        /// předání výchozího objektu
        /// </summary>
        /// <param name="obj">objekt</param>
        internal void SetTag(object obj)
        {
            UserControl.Tag = obj;
        }

        void button2_Click(object sender, EventArgs e)
        {
            this.Tag = UserControl.Tag;
            DialogResult = System.Windows.Forms.DialogResult.OK;
        }
    }
}
