//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPropertyValueCreator.cs                 </Name>
//    <Description> Vytvoření vlastnosti objektu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Vytvoření vlastnosti objektu
    /// </summary>
    public interface IPropertyValueCreator
    {
        /// <summary>
        /// Lze vytvřit hodnotu pro typ
        /// </summary>
        /// <param name="propertyType">Typ vlastnosti</param>
        /// <returns></returns>
        bool CanCreateValueForType(Type propertyType);
        /// <summary>
        /// Vytvoření hodnoty
        /// </summary>
        /// <param name="propertyType">typ vlastnosti</param>
        /// <param name="valueString">hodnota</param>
        /// <returns></returns>
        object CreateValue(Type propertyType, string valueString);

    }
}
