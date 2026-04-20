//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IToolsHost.cs                            </Name>
//    <Description> Implementací tohoto rozhraní umožníte zobrazení nástrojů v nástrojovém okně (podložka)</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.AddIns
{
    /// <summary>
    /// Implementací tohoto rozhraní umožníte zobrazení nástrojů v nástrojovém okně (podložka)
    /// </summary>
    public interface IToolsHost
    {
        /// <summary>
        /// Ovladač nástrojů pro zobrazení v podložce nástrojů
        /// </summary>
        object ToolsControl { get; }
    }
}
