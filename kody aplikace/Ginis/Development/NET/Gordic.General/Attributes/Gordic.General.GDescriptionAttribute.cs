//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDescriptionAttribute.cs                     </Name>
//    <Description> Jako <see cref="DescriptionAttribute"/> ale umožňuje zadat  </Description>
//    <Author>      vnovotny                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-05-16                                                  </Created>
//  </FileHeader>

// FFIALA - Ještě nějaký čas to potřebuji pro staré GEnum objekty 

using System;
using System.ComponentModel;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Jako <see cref="DescriptionAttribute"/> ale pro resource text.
    /// </summary>
    public class GDescriptionAttribute : DescriptionAttribute, IGObject
    {
        /// <summary>
        /// Konstruktor.
        /// </summary>
        /// <param name="resourceId">Kód resx.</param>
        /// <param name="args">Argumenty pro <see cref="string.Format(string, object)"/></param>
        public GDescriptionAttribute(int resourceId, params object[] args)
            : base(GResources.GetResourceText(resourceId, args))
        {
        }

        /// <summary>
        /// Konstruktor.
        /// </summary>
        /// <param name="assemblyType">Typ z assembly obsahující soubor se zdroji.</param>
        /// <param name="resourceId">Kód resx.</param>
        /// <param name="args">Argumenty pro <see cref="string.Format(string, object)"/></param>
        public GDescriptionAttribute(Type assemblyType, int resourceId, params object[] args)
            : base(GResources.GetResourceText(assemblyType.Assembly, resourceId, args))
        {
        }
    }

    /// <summary>
    /// Extension metoda pro získání Description z libovolného objektu.
    /// </summary>
    public static class GDescriptionExtension
    {
        /// <summary>
        /// Získá description z libovolného objektu.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <returns>Hodnotu <see cref="DescriptionAttribute"/> nebo
        /// <see cref="GDescriptionAttribute"/> nebo název objektu, když je
        /// objekt bez atributu.</returns>
        public static string GetDescription<T>(this T source)
        {
            return (source.GetType().GetField(source.ToString())
                .GetCustomAttributes(typeof(DescriptionAttribute), true)
                as DescriptionAttribute[])
                .FirstOrDefault()?.Description
                ?? source.ToString();
        }
    }
}
