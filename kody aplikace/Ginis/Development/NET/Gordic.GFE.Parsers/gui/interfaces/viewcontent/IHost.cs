//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IHost.cs                                 </Name>
//    <Description> Rozhraní objektů obsahujících služby pro zpracování události</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.ComponentModel.Design;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Hosting
{
    /// <summary>
    /// Rozhraní objektů obsahujících služby pro zpracování události
    /// </summary>
    public interface IHost
    {
        /// <summary>
        /// Poskytovatel služeb
        /// </summary>
        IDesignerHost Host { get; }
        /// <summary>
        /// Služba výběru objektu
        /// </summary>
        SelectionService ServiceSelection { get; }
        /// <summary>
        /// Správce příkazů UndoRedo
        /// </summary>
        IUndoRedoManager UndoRedoManager { get; }
    }
}
