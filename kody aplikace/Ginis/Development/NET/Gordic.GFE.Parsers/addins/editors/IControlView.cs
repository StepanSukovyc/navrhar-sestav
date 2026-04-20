//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IControlView.cs                          </Name>
//    <Description> ovladač pohledu                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-17                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using System;

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// ovladač pohledu
    /// </summary>
    public interface IControlView : IDisposable, IPageControl
    {
        /// <summary>
        /// Primární soubor sestavy
        /// </summary>
        OpenedFile PrimaryFile { get; }
        /// <summary>
        /// indikuje změnu obsahu
        /// </summary>
        event EventHandler DirtyChanged;

        /// <summary>
        /// Indikuje nutnost uložení dokumentu
        /// </summary>
        bool IsDirty { get; set; }
        /// <summary>
        /// Indikuje, že je zobrazeá chybová hláška.
        /// </summary>
        bool IsErrorVisible { get; }

        /// <summary>
        /// aktuální ovladač na pohledu
        /// </summary>
        object Control { get; }
        /// <summary>
        /// Zobrazení vyjímky
        /// </summary>
        /// <param name="message">Chybová zprava</param>
        void ShowErrorMessage(string message);

        /// <summary>
        /// aktualizace dat dle pohledu
        /// </summary>
        void RefreshData();
        /// <summary>
        /// Načtení dat formuláře.
        /// </summary>
        /// <param name="primaryDataFile">primární datový soubor</param>
        /// <param name="fileData">Obsah primárních dat</param>
        /// <param name="formatFile">Format sestavy</param>
        /// <param name="manager">Správce dat</param>
        void LoadData(OpenedFile primaryDataFile, byte[] fileData, OpenedFile formatFile, DefaultDataManager manager);
    }
}
