//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogString.cs                                </Name>
//    <Description> Logovací struktura, která nese logovací zprávu (pomocná struktura)</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-11-06                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Logovací struktura, která nese logovací zprávu (pomocná struktura)
    /// </summary>
    /// <remarks>Hlavním smyslem této struktury je, aby vyhrávalo přetížení .Log(FormattableString message) nad přetížením .Log(string message).
    /// To nejde jednoduše zajistit (leda by se ty metody jmenovaly různě). Proto se to dělá přes tuto pomocnou třídu.
    /// Problém
    /// We generally believe that libraries will mostly be written with different API names for methods which do different things. 
    /// Therefore overload resolution differences between FormattableString and String don't matter, so string might as well win. 
    /// Therefore we should stick with the simple principle that an interpolated string is a string. End of story.
    /// Dobrý popis https://github.com/NLog/NLog/issues/825
    /// Řešení https://stackoverflow.com/questions/35770713/overloaded-string-methods-with-string-interpolation
    /// </remarks>
    public struct GLogString
    {
        readonly string m_sMessage;

        /// <summary>
        /// Konstruktor logovací struktury
        /// </summary>
        /// <param name="message">Text logovací zprávy</param>
        public GLogString(string message) { this.m_sMessage = message; }

        /// <summary>
        /// Přetypování z logovací zprávy na logovací strukturu
        /// </summary>
        /// <param name="message">Text logovací zprávy</param>
        static public implicit operator GLogString(string message) => new GLogString(message);

        /// <summary>
        /// Přetypování z formátovaného textu logovací zprávy na logovací strukturu     
        /// </summary>
        /// <param name="message">Formátovaný text logovací zprávy</param>
        static public implicit operator GLogString(FormattableString message) => new GLogString(message.ToString()); //never called

        /// <summary>
        /// Přetypování z logovací struktury na řetězec
        /// </summary>
        /// <param name="message">Instance této pomocné logovací třídy</param>
        static public implicit operator string(GLogString message) => message.m_sMessage;
    }

}
