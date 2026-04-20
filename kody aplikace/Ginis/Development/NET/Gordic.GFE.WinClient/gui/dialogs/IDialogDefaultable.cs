//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IDialogDefaultable.cs                    </Name>
//    <Description> Rozhraní pro vrátné nastavení                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rozhraní pro vrátné nastavení
    /// </summary>
    public interface IDialogDefaultable
    {
        /// <summary>
        /// stav načtení ovladače
        /// </summary>
        bool Loading { get; set; }
        /// <summary>
        /// indikuje zrušení dialogu
        /// </summary>
        bool Canceling { get; set; }

        /// <summary>
        /// Obsah
        /// </summary>
        IViewContent Content { get; set; }
        /// <summary>
        /// Na ovladači proběhla změna
        /// </summary>
        bool Change { get; set; }
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        void Accept();
        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        void Cancel();
        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        void SetDefault();

        /// <summary>
        /// Titulek ovladače
        /// </summary>
        string Title { get; }

        /// <summary>
        /// Volá se po akceptací změn
        /// </summary>
        event EventHandler AcceptEvent;
    }
}
