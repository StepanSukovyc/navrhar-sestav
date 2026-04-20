//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CValidation.cs                         </Name>
//    <Description> Zobrazovátko kontroly dokumentu                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-06-12                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using System.Threading;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Metody s polem parametrů
    /// </summary>
    /// <param name="parameters">Pole parametrů</param>
    delegate void EventParameters(params object[] parameters);

    /// <summary>
    /// Zobrazovátko kontroly dokumentu
    /// </summary>
    partial class CWaiting : UserControl, IDialogDefaultable
    {
        /// <summary>
        /// Hláška v okně
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Parametry do metody
        /// </summary>
        public object[] Parameters { get; set; }

        /// <summary>
        /// Automatické zavření okna po obdržení zprávy
        /// </summary>
        public bool AutomaticallyClose { get; set; }

        /// <summary>
        /// Text oznámení
        /// </summary>
        public string TextLabel { get { return label1.Text; } set { label1.Text = value; } }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public CWaiting()
        {
            InitializeComponent();
            Loading = true;
        }

        /// <summary>
        /// Konstruktor třídy dle obsahu
        /// </summary>
        /// <param name="content">Obsah</param>
        public CWaiting(IViewContent content)
            : this()
        {
            Content = content;
        }

        delegate void Valid(params object[] parameters);

        /// <summary>
        /// Metoda, která spouští na pozadí
        /// </summary>
        public event EventParameters Method;

        #region IDialogDefaultable
        /// <summary>
        /// Reakce na ukončení s akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;

        bool loading;
        /// <summary>
        /// stav načtení ovladače
        /// </summary>
        public bool Loading
        {
            get { return loading; }
            set
            {
                loading = value; 
                if (!loading)
                {
                    Thread threadVerification = new Thread(() =>
                    {
                        if (Method != null)
                            (new CWaiting.Valid(Method)).Invoke(Parameters);
                    });
                    //Thread threadVerification = new Thread(() => { (new CWaiting.Valid((Content as IOfficeFormat).Validation)).Invoke(Parameters); });
                    //Thread threadVerification = new Thread(() => { (Content as IOfficeFormat).Validation(true, this); });
                    timer1.Start();
                    threadVerification.Start();
                }
            }
        }
        /// <summary>
        /// Obsah
        /// </summary>
        public IViewContent Content { get; set; }

        /// <summary>
        /// Na ovladači proběhla změna
        /// </summary>
        public bool Change { get; set; }
        /// <summary>
        /// indikuje zrušení dialogu
        /// </summary>
        public bool Canceling { get; set; }
        /// <summary>
        /// Titulek ovladače
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450451); } } //RC 29450451 : Validace dokumentu
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        public void Accept() { OnAccept(); }
        private void OnAccept()
        {
            if (AcceptEvent != null)
                AcceptEvent(this, EventArgs.Empty);
        }

        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        public void Cancel() 
        {
            Canceling = true;
            while (timer1.Enabled) { Application.DoEvents(); }
        }

        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public void SetDefault() { }
        #endregion

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(Message))
            {
                timer1.Stop();
                label1.Text = Message;
                if (label1.Width > this.Width)
                    this.Width = label1.Width + 2 * label1.Left;
                progressBar1.Value = 100;
                if (AutomaticallyClose && ParentForm != null)
                    ParentForm.Close();
            }
            else
            {
                if (progressBar1.Value == 100)
                    progressBar1.Value = 1;
                else progressBar1.Increment(1);
            }
        }
    }
}
