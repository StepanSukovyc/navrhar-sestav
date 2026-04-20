//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CExistsImages.cs                       </Name>
//    <Description> Ovladač přidání existujícího obrázku                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Ovladač přidání existujícího obrázku
    /// </summary>
    partial class CExistsImages : UserControl, IDialogDefaultable
    {
        /// <summary>
        /// Konstruktor tridy
        /// </summary>
        private CExistsImages()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Vytvoření instance nové třídy dle vladače
        /// </summary>
        /// <param name="viewContent">Pohled na obsah</param>
        /// <param name="parser">Analyzátor obsahu</param>
        public CExistsImages(IViewContent viewContent, IParser parser)
            : this()
        {
            Content = viewContent;
            Parser = parser;
            Loading = true;
        }

        void lbNames_SelectedIndexChanged(object sender, EventArgs e)
        {
            //pnlView.BackgroundImage = ImageService.GetImage(lbNames.SelectedItem as string, Parser);
        }

        #region IDialogDefaultable
        /// <summary>
        /// Volá se po akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;

        /// <summary>
        /// stav načtení ovladače
        /// </summary>
        public bool Loading { get; set; }
        /// <summary>
        /// indikuje zrušení dialogu
        /// </summary>
        public bool Canceling { get; set; }

        /// <summary>
        /// Obsah
        /// </summary>
        public IViewContent Content { get; set; }

        /// <summary>
        /// Na ovladači proběhla změna
        /// </summary>
        public bool Change { get; set; }
        /// <summary>
        /// Titulek ovladače
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450449); } } //RC 29450449 : Obrázek ze seznamu
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        public void Accept()
        {
            if (Content == null
                || lbNames.SelectedIndex == -1)
                return;

            //ClipboardService.SelectedImage = lbNames.SelectedItem as string;
            if (AcceptEvent != null)
                AcceptEvent(this, EventArgs.Empty);
        }

        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        public void Cancel() { }

        IParser Parser;
        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public void SetDefault()
        {
            //// zde načteme seznam již existujících obrázků
            //if (Loading)
            //{
            //    if (Parser != null)
            //        foreach (string item in ImageService.Names(Parser))
            //            lbNames.Items.Add(item);

            //    if (lbNames.Items.Count != 0)
            //        lbNames.SelectedIndex = 0;
            //}
        }
        #endregion

        private void lbNames_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            if (AcceptEvent != null)
                AcceptEvent(sender, e);
        }
    }
}
