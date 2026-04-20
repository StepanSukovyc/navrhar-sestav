//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GWhiteListProviderEmpty.cs                   </Name>
//    <Description> Prázdný poskytovatel seznamu povolených url adres - vše je povoleno</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-06-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>Prázdný poskytovatel seznamu povolených url adres - vše je povoleno</summary>
    public class GWhiteListProviderEmpty : IGWhitelistProvider
    {
        /// <summary>
        /// Pamatovátko již zaregistrovaného IGWhitelistProvider
        /// </summary>
        public static GWhiteListProviderEmpty _WhiteListProviderEmpty = null;

        /// <summary>
        /// Statická funkce pro zaregistrování prázdného IGWhitelistProvider
        /// </summary>
        public static void RegisterToComponentCatalog()
        {
            if (_WhiteListProviderEmpty == null)
            {
                _WhiteListProviderEmpty = new GWhiteListProviderEmpty();
                GComponentCatalog.Register<IGWhitelistProvider>(_WhiteListProviderEmpty);
            }
        }


        /// <summary>získání příznaku povolené url adresy</summary>
        /// <param name="url">url adresa</param>
        /// <returns>příznak povolené url adresy</returns>
        bool IGWhitelistProvider.IsAllowed(string url)
        {
            return true;
        } // end method

    } // end class
}
