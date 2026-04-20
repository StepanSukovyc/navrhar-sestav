//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTrimTypeEnum.cs                             </Name>
//    <Description> Typ trimování stringových položek podle cíle určení výsledného textu</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-03-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Typ trimování stringových položek podle cíle určení výsledného textu
    /// Enum je určen např. pro Dto.TrimValues( )
    /// </summary>
    public enum GTrimTypeEnum
    {
        /// <summary>
        /// výsledný trimovaný text je určen pro uživatele 
        /// Pokud obsahoval pouze mezery, potom po otrimování bude obsahovat prázdný string
        /// </summary>
        ForUser,
        /// <summary>
        /// Výsledný trimovaný text je určen pro zápis do databáze
        /// Pokud obsahoval pouze mezery, potom po otrimování bude obsahovat právě jednu mezeru
        /// Pokud byl string již původně prázdný, potom zůstane i po otrimování prázdný
        /// </summary>
        ForDb,
        /// <summary>
        /// Výsledný trimovaný text je určen pro zápis do databáze
        /// Pokud obsahoval pouze mezery nebo byl prázdný, potom po otrimování bude obsahovat právě jednu mezeru
        /// Tento přepínač zajistí, že string nebude nikdy prázdný
        /// </summary>
        ForDbStrict
    }
}
