//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IOfficeDocumentView.cs                    </Name>
//    <Description> Rozhraní pohledu na Office dokument                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-12                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using System;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Rozhraní pro zacházení s office aplikací vlasnící dokument
    /// </summary>
    public interface IOfficeAppPointable
    {
        /// <summary>
        /// Ukazatel na aktuální aplikaci dokumentu.
        /// Když chci zacházet s aplikací vlastnící dokument
        /// </summary>
        IntPtr DocumentAppPointer { get; }
    }

    /// <summary>
    /// Rozhraní pohledu na office dokument
    /// </summary>
    public interface IOfficeDocumentView : IDocumentView, IOfficeAppPointable
    {
        /// <summary>
        /// Word dokument.
        /// </summary>
        IOfficeDocument Document { get; }
        /// <summary>
        /// Služba pro práci s výběrem
        /// </summary>
        SelectionService ServiceSelection { get; }
        /// <summary>
        /// zobrazení dokumentu v okně
        /// </summary>
        void ShowDocument();
        /// <summary>
        /// aktuální obsah
        /// </summary>
        IViewContent Content { get; }
        bool IsInsertSection { get; set; }
    }
}
