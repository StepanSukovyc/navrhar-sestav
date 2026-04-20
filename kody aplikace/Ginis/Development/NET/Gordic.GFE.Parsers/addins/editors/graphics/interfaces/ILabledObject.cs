//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ILabledObject.cs                       </Name>
//    <Description> rozhraní objektu, který lze vázát na štítkovu zónu          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-10-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// rozhraní objektu, který lze vázát na štítkovu zónu
    /// </summary>
    public interface ILabledObject : ISizable, ISizeHandler, IZoomSizable, IMarginable
    {
        /// <summary>
        /// seznam zpožděného kreslení ohraničení
        /// </summary>
        List<DelayPaintItem> DelayPaintList { get; }
        /// <summary>
        /// Vlastník objektu, který má grafický ovladač
        /// </summary>
        IPagePanel PagePanel { get; }
        /// <summary>
        /// stránka objektu
        /// </summary>
        IPage Page { get; }

        /// <summary>
        /// štítková zóna daného objektu
        /// </summary>
        IComponent LabelZone { get; set; }

        /// <summary>
        /// volá se po změně šířky vázaného objektu
        /// </summary>
        event EventHandler WidthChanged;

        /// <summary>
        /// změna nastavení služby
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        void SettingServiceChanged(object sender, EventArgs e);
    }
}
