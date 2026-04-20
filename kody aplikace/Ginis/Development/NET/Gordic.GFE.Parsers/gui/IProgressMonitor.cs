//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IProgressMonitor.cs                      </Name>
//    <Description> Základní třída "progress bar" ovladače                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Základní třída "progress bar" ovladače
    /// </summary>
    public interface IProgressMonitor
    {
        /// <summary>
        /// Začátek nového úkolu
        /// </summary>
        /// <param name="name">Název úkolu. NULL pro výchozí zprávu</param>
        /// <param name="totalWork">Celkové množství práce v jednotce. 0 pro neznamé množství.</param>
        /// <param name="allowCancel">Indikuje, kdy úkol může být stornován.</param>
        void BeginTask(string name, int totalWork, bool allowCancel);

        /// <summary>
        /// Gets/Sets množství ukončené práce
        /// </summary>
        int WorkDone { get; set; }

        /// <summary>
        /// Označí daný úkol jako vyřešený.
        /// </summary>
        void Done();

        /// <summary>
        /// Gets/Sets název aktuálního úkolu.
        /// </summary>
        string TaskName { get; set; }

        /// <summary>
        /// Indikuje, kdy daný úkol zobtazil nějaký dialog.
        /// </summary>
        bool ShowingDialog { get; set; }

        /// <summary>
        /// Indikuje zrušení úkolu uživatelem
        /// </summary>
        bool IsCancelled { get; }

        /// <summary>
        /// Volá se po zrušení operace uživatelem.
        /// </summary>
        event EventHandler Cancelled;
    }
}
