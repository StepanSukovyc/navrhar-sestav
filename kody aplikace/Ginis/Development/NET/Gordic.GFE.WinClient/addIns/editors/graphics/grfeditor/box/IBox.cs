//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ibox.cs                                </Name>
//    <Description> informační kontainer                                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                            </Copyright>
//    <Created>     2016-09-23                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System;

namespace Gordic.GFE.WinClient.Box
{
    /// <summary>
    /// informační kontainer
    /// </summary>
    public interface IBox: ISizable, IPaintable, IDisposable
    {
        /// <summary>
        /// barva objektu
        /// </summary>
        IComplexColor Color { get; set; }

        /// <summary>
        /// jednoznačný identifikátor objektu
        /// </summary>
        string GUID { get; set; }
    }
}
