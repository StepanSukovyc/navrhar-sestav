//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DefaultDialogForm.cs                     </Name>
//    <Description> Abstraktní třída pro dialogová okna s možnstí se vrátit na implicitní nastavení</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>


using System;
using System.Drawing;
using System.Windows.Forms;
using System.Globalization;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Abstraktní třída pro dialogová okna s možnstí se vrátit na implicitní nastavení
    /// </summary>
    public partial class PropertyDialog : Form, IMementoCapable
    {
        #region IMementoCapable
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

            foreach (Control item in pContent.Controls)
                if (item is IMementoCapable)
                    properties.Set(item.Name, (item as IMementoCapable).CreateMemento());

            return properties;
        }
        /// <summary>
        /// Načtení vlastnosti dialogového okna
        /// </summary>
        /// <param name="memento">Vlastnosti</param>
        public void SetMemento(Property memento)
        {
            if (memento != null && !memento.IsEmpty && memento.Contains("bounds"))
            {
                string[] bounds = memento["bounds"].Split(',');
                if (bounds.Length == 4)
                    this.Bounds = normalBounds = new Rectangle(int.Parse(bounds[0], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[1], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[2], NumberFormatInfo.InvariantInfo),
                                                          int.Parse(bounds[3], NumberFormatInfo.InvariantInfo));
            }
            else 
                this.Bounds = normalBounds = new Rectangle(Location, Size);
         
            foreach (Control item in pContent.Controls)
                if (item is IMementoCapable)
                    (item as IMementoCapable).SetMemento(memento);
        }
        #endregion

        class PropertyDialogKeyHandler : IMessageFilter
        {
            PropertyDialog defaultDialogForm;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            private PropertyDialogKeyHandler()
            {
            }

            /// <summary>
            /// Vytvoření nové instance třídy s odkazem na vlastníka
            /// </summary>
            /// <param name="defaultDialogForm">Vlastník ovladače</param>
            public PropertyDialogKeyHandler(PropertyDialog defaultDialogForm)
            {
                this.defaultDialogForm = defaultDialogForm;
            }

            /// <summary>
            /// Odchycení zprávy
            /// </summary>
            /// <param name="m">Zráva</param>
            /// <returns></returns>
            public bool PreFilterMessage(ref Message m)
            {
                const int keyPressedMessage = 0x100;
                if (m.Msg != keyPressedMessage)
                    return false;

                Keys keyPressed = (Keys)m.WParam.ToInt32() | Control.ModifierKeys;
                if (keyPressed == Keys.Escape)
                    return defaultDialogForm.ProcessKeyMessage(ref m);

                return false;
            }
        }

        PropertyDialogKeyHandler messageFilter;

        /// <summary>
        /// Zviditelnění talčítka Výchozí hodnota
        /// </summary>
        public bool VisibleDefault { get { return defaultButton.Visible; } set { defaultButton.Visible = value; } }

        /// <summary>
        /// Zviditelní/schová panel s tlačítky
        /// </summary>
        public bool VisibleButtonPanel { get { return !splitContainerForm.Panel2Collapsed; } set { splitContainerForm.Panel2Collapsed = !value; } }

        Rectangle normalBounds;
        /// <summary>
        /// Klíč k uložení vlastností
        /// </summary>
        public string PropertiesDefalut { get; set; }

        /// <summary>
        /// kvůli velikosti při prvním načtení dialogového okna
        /// </summary>
        bool handlecreated;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public PropertyDialog()
        {
            messageFilter = new PropertyDialogKeyHandler(this);
            InitializeComponent();
            Icon = WinFormsResourceService.GetIcon("Icons__Gin__vlastnosti");
            PropertiesDefalut = "Dialog.Properties";
            Application.AddMessageFilter(messageFilter);
        }

        /// <summary>
        /// Povolená akceptace
        /// </summary>
        public bool AcceptEnabled
        {
            get { return acceptButton.Enabled; }
            set { acceptButton.Enabled = value; }
        }

        /// <summary>
        /// Zavření okna s pozitivním výsledkem
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public virtual void AcceptEvent(object sender, EventArgs e)
        {
            DialogResult = DialogResult.OK;

            foreach (Control item in pContent.Controls)
                if (item is IDialogDefaultable)
                    (item as IDialogDefaultable).Accept();
        }
        /// <summary>
        /// Zavření okna s negativním výsedkem
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public virtual void CancelEvent(object sender, EventArgs e)
        {
            foreach (Control item in pContent.Controls)
                if (item is IDialogDefaultable)
                    (item as IDialogDefaultable).Cancel();
        }

        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public bool SetDefaultValue() 
        {
            foreach (Control item in pContent.Controls)
                if (item is IDialogDefaultable)
                {
                    (item as IDialogDefaultable).SetDefault();
                    if ((item as IDialogDefaultable).Canceling)
                        return false;
                }
            return true;
        }

        /// <summary>
        /// Přetížení kvůli načtení ikonky dialogového okna
        /// </summary>
        /// <param name="e">Parametr metody</param>
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            // načtení ukončeno
            foreach (Control item in pContent.Controls)
                if (item is IDialogDefaultable)
                    (item as IDialogDefaultable).Loading = true;

            try
            {
                // načteme implicitní hodnoty
                if (SetDefaultValue())
                {
                    // načtení ukončeno
                    foreach (Control item in pContent.Controls)
                        if (item is IDialogDefaultable)
                            (item as IDialogDefaultable).Loading = false;
                }
                else
                    Close();
            }
            catch (Exception ex) { MessageService.ShowError(ex); }
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
            SetMemento(PropertyService.Get(string.IsNullOrEmpty(PropertiesDefalut)? "Dialog.Default" : PropertiesDefalut, new Property()));
            handlecreated = true;
        }
        /// <summary>
        /// Uložíme vlastnosti okna po ukončení
        /// </summary>
        protected override void OnClosing(System.ComponentModel.CancelEventArgs cancel)
        {
            PropertyService.Set(string.IsNullOrEmpty(PropertiesDefalut) ? "Dialog.Default" : PropertiesDefalut, CreateMemento());
            Application.RemoveMessageFilter(messageFilter);
            base.OnClosing(cancel);
        }
        /// <summary>
        /// Odchycení události
        /// </summary>
        /// <param name="m">Zpráva události</param>
        /// <returns></returns>
        protected override bool ProcessKeyMessage(ref Message m)
        {
            if (this.Focused && (((Keys)m.WParam.ToInt32() | Control.ModifierKeys) == Keys.Escape))
            {
                if (MessageService.AskQuestion(GResources.GetResourceText(29450504))) //RC 29450504 : Opravdu si přejete ukončit práci s dialogovým oknem bez uložení změn?
                {
                    DialogResult = System.Windows.Forms.DialogResult.Abort;
                    CancelEvent(this, new EventArgs());
                    Close();
                }
            }
            return base.ProcessKeyMessage(ref m);
        }
        
        /// <summary>
        /// Přidání ovladače do okna
        /// </summary>
        /// <param name="control">Přidávaný ovladač</param>
        internal void AddControl(UserControl control)
        {
            if (control != null && !pContent.Controls.Contains(control))
            {
                pContent.Controls.Add(control);
                if (control is IDialogDefaultable)
                    this.Text = (control as IDialogDefaultable).Title;
            }
        }

        void DefaultEvent(object sender, EventArgs e)
        {
            if (!SetDefaultValue())
                Close();
        }

        void NewPIDClick(object sender, EventArgs e)
        {
            foreach (Control item in pContent.Controls)
                if (item is IDialogDatabaseable)
                    (item as IDialogDatabaseable).NewPid();
        }
    }
}
