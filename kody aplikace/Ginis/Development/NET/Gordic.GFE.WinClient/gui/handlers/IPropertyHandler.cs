//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IPropertyHandler.cs                    </Name>
//    <Description> Ovladač objektů majících vlastnosti                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-09-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Ovladač objektů majících vlastnosti
    /// </summary>
    interface IPropertyHandler
    {
        /// <summary>
        /// Vlastnosti jsou k dispozici
        /// </summary>
        bool EnableProperty { get; }

        /// <summary>
        /// Nastavení parametrů novému objektu
        /// </summary>
        bool EnableSetNewParameters { get; }
        /// <summary>
        /// Vlastnosti řádku jsou povolené
        /// </summary>
        bool EnableLineProperty { get; }

        /// <summary>
        /// Zobrazení vlastnosti [vybraných objektů] [určitého typu]
        /// </summary>
        /// <param name="types">Typy objektů, vlastnosti kterých je zapotřebí ukázat</param>
        void ShowProperty(List<Type> types = null);
        /// <summary>
        /// Zobrazení vlastnosti
        /// </summary>
        void SetNewParameters();

        /// <summary>
        /// Titulek okna vlastnosti
        /// </summary>
        string PropertyTitle { get; }
    }
}
