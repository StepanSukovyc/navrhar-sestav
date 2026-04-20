//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IAddXmlNodeDialog.cs                   </Name>
//    <Description> Rozhraní pro AddXmlNodeDialog.                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Rozhraní pro AddXmlNodeDialog.
    /// </summary>
    public interface IAddXmlNodeDialog : IDisposable
    {
        /// <summary>
        /// Názvy, které mohou být přidané.
        /// </summary>
        string[] GetNames();

        /// <summary>
        /// Zobrazení dialogového okna
        /// </summary>
        DialogResult ShowDialog();
    }
}
