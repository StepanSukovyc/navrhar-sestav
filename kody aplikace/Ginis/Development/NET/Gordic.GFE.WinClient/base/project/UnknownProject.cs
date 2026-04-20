//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.UnknownProject.cs                      </Name>
//    <Description> Nznámý projekt                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Nznámý projekt
    /// </summary>
    class UnknownProject : AbstractProject
    {
        string warningText = GResources.GetResourceText(29450427); //RC 29450427 : Žádná vazba na daný typ projektu není nainstalovaná.
        bool warningDisplayedToUser;

        /// <summary>
        /// Text upozornění
        /// </summary>
        public string WarningText
        {
            get { return warningText; }
            set { warningText = value; }
        }
        /// <summary>
        /// Indikuje zobrazení upozrnění uživateli
        /// </summary>
        public bool WarningDisplayedToUser
        {
            get { return warningDisplayedToUser; }
            set { warningDisplayedToUser = value; }
        }
        /// <summary>
        /// Zobrazení varování
        /// </summary>
        public void ShowWarningMessageBox()
        {
            warningDisplayedToUser = true;
            MessageService.ShowError(GResources.GetResourceText(29450428) + ' ' + this.FileName + ":\n" + warningText); //RC 29450428 : Chyba načtení
        }
        /// <summary>
        /// Vytvoření nepodporovaného proejktu
        /// </summary>
        /// <param name="fileName">úplná cesta k souboru projektu</param>
        /// <param name="title">název položky</param>
        /// <param name="warningText">text upozornění</param>
        /// <param name="displayWarningToUser">indikuje zobrazení upozornění uživateli</param>
        public UnknownProject(string fileName, string title, string warningText, bool displayWarningToUser)
            : this(fileName, title)
        {
            this.warningText = warningText;
            if (displayWarningToUser)
                ShowWarningMessageBox();
        }
        /// <summary>
        /// Vytvoření nepodporovaného projektu
        /// </summary>
        /// <param name="fileName">úplná cesta k souboru projektu</param>
        /// <param name="title">název</param>
        public UnknownProject(string fileName, string title)
        {
            Name = title;
            FileName = fileName;
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public UnknownProject()
        {
            Name = GResources.GetResourceText(29451491);
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="warningText">hláška upozornění</param>
        public UnknownProject(string warningText)
            : this(null, GResources.GetResourceText(29451491), GResources.GetResourceText(29451492), true)
        {
        }
    }
}
