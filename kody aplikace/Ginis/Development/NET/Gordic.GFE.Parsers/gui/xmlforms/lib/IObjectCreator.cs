//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IObjectCreator.cs                        </Name>
//    <Description> Toto rozhraní se používá k vytvoření objektů, které jsou uvedené jménem v XML definici</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Toto rozhraní se používá k vytvoření objektů, které jsou uvedené jménem v XML definici
    /// </summary>
    public interface IObjectCreator
    {
        /// <summary>
        /// Vytvoření nové instance objektu se jménem
        /// </summary>
        /// <param name="name">název objektu</param>
        /// <param name="el">element s popisem objektu</param>
        /// <returns></returns>
        object CreateObject(string name, XmlElement el);
        /// <summary>
        /// Získání typu objektu
        /// </summary>
        /// <param name="name">název objektu</param>
        /// <returns></returns>
        Type GetType(string name);
    }
}
