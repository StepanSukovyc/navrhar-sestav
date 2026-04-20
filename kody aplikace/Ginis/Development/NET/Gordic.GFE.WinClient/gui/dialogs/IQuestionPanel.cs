//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IQuestionPanel.cs                      </Name>
//    <Description> rozhraní dotazů                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-22                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Gui.Dialogs
{
    /// <summary>
    /// rozhraní dotazů
    /// </summary>
    interface IQuestionPanel
    {
        /// <summary>
        /// titulek dotzu
        /// </summary>
        string Title { get; }
        /// <summary>
        /// indikuje, že hodnota je výchozí
        /// </summary>
        bool DefaultValue { get; set; }
        /// <summary>
        /// načtení panelu
        /// </summary>
        void LoadPanel();
    }
}
