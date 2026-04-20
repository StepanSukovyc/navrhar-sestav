//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.TypeArrayExtensions.cs                       </Name>
//    <Description> Pomocná třída pro obecnou práci s Type array                </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-05-06                                                  </Created>
//  </FileHeader>


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro obecnou práci s Type array
    /// </summary>
    public static class TypeArrayExtensions
    {
        /// <summary>
        /// Vytvoří nové pole do kterého přidá zadaný item na konec tohoto pole
        /// Pokud bylo pole NULL, potom vytvoří pole a přidávaná položka bude její první položkou
        /// </summary>
        /// <typeparam name="T">array</typeparam>
        /// <param name="target"></param>
        /// <param name="item"></param>
        /// <returns>Vrátí nové pole rozšířené o zadanou položku</returns>
        public static T[] Add<T>(this T[] target, T item)
        {
            T[] result;
            if (target == null)
            {
                result = new T[1];
                result[0] = item;
            }
            else
            {
                result = new T[target.Length + 1];
                target.CopyTo(result, 0);
                result[target.Length] = item;
            }
            return result;
        }
    }
}
