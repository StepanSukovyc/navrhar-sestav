//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGDbTypeNumber.cs                            </Name>
//    <Description> Interface pro celočíselné typy - tedy GInt16, GINt32, GInt64</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-10-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Interface pro celočíselné typy - tedy GInt16, GINt32, GInt64
    /// Pro dynamické převody celočíselných typů navzájem
    /// </summary>
    public interface IGDbTypeNumber : IGDbType
    {
        /// <summary>
        /// Pokusí se o převod na cílový typ GInt16
        /// </summary>
        /// <param name="vysledek">Nově vytvořený objekt typu GInt16 s nastavenou hodnotou podle vstupu. Pokud nelze převést, potom je zde NULL</param>
        /// <returns>Příznak, že převod byl požadovaný cílový typ byl realizován</returns>
        bool TryParse(out GInt16 vysledek );

        /// <summary>
        /// Pokusí se o převod na cílový typ GInt32
        /// </summary>
        /// <param name="vysledek">Nově vytvořený objekt typu GInt16 s nastavenou hodnotou podle vstupu. Pokud nelze převést, potom je zde NULL</param>
        /// <returns>Příznak, že převod byl požadovaný cílový typ byl realizován</returns>
        bool TryParse(out GInt32 vysledek);

        /// <summary>
        /// Pokusí se o převod na cílový typ GInt64
        /// </summary>
        /// <param name="vysledek">Nově vytvořený objekt typu GInt16 s nastavenou hodnotou podle vstupu. Pokud nelze převést, potom je zde NULL</param>
        /// <returns>Příznak, že převod byl požadovaný cílový typ byl realizován</returns>
        bool TryParse(out GInt64 vysledek);

        /// <summary>
        /// Převede hodnotu na short - může vyvolat chyby OverflowException nebo NullReferenceException
        /// </summary>
        /// <returns></returns>
        short ToInt16();

        /// <summary>
        /// Převede hodnotu na int - může vyvolat chyby OverflowException nebo NullReferenceException
        /// </summary>
        /// <returns></returns>
        int ToInt32();

        /// <summary>
        /// Převede hodnotu na long - může vyvolat chyby OverflowException nebo NullReferenceException
        /// </summary>
        /// <returns></returns>
        long ToInt64();

    }
}
