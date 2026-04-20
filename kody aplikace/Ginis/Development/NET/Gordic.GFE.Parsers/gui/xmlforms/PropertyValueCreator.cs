//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PropertyValueCreator.cs                  </Name>
//    <Description> Vytvoření vlastnosti objektu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Vytvoření vlastnosti objektu
    /// </summary>
    public class PropertyValueCreator : IPropertyValueCreator
    {
        /// <summary>
        /// Lze vytvřit hodnotu pro typ
        /// </summary>
        /// <param name="propertyType">Typ vlastnosti</param>
        /// <returns></returns>
        public bool CanCreateValueForType(Type propertyType)
        {
            return propertyType == typeof(Icon) || propertyType == typeof(Image);
        }

        /// <summary>
        /// Vytvoření hodnoty
        /// </summary>
        /// <param name="propertyType">typ vlastnosti</param>
        /// <param name="valueString">hodnota</param>
        /// <returns></returns>
        public object CreateValue(Type propertyType, string valueString)
        {

            if (propertyType == typeof(Icon))
                return WinFormsResourceService.GetIcon(valueString);

            if (propertyType == typeof(Image))
                return WinFormsResourceService.GetBitmap(valueString);

            return null;
        }
    }
}
