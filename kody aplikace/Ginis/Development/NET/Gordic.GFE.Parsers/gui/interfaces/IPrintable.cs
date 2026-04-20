//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPrintable.cs                            </Name>
//    <Description> Pokud IViewContent implementuje danou třídu, pak to signalizuje,</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Drawing.Printing;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Pokud IViewContent implementuje danou třídu, pak to signalizuje,
    /// že obsah lze poslat na printer nebo fax
    /// </summary>
    public interface IPrintable
    {
        /// <summary>
        /// PrintDocument objektu
        /// </summary>
        PrintDocument PrintDocument { get; }
    }
}
