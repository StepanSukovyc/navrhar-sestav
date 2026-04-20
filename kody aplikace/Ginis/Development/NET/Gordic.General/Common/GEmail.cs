//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEmail.cs                                    </Name>
//    <Description> Reprezentuje emailovou adresu. Umožňuje snadno porovnávat více emailových adres.</Description>
//    <Author>      vnovotny                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-11-02                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Gordic.General
{

    /// <summary>
    /// Reprezentuje emailovou adresu. Umožňuje snadno porovnávat emailové adresy.
    /// </summary>
    public struct GEmail: IEquatable<string>, IEquatable<GString>, IEquatable<GEmail>
    {
        /// <summary>
        /// Doména adresy.
        /// </summary>
        public string Domain;
        /// <summary>
        /// Lokální část adresy bez tagu.
        /// </summary>
        public string Local;
        /// <summary>
        /// Tag lokální části, pokud byl u adresy zadán. Tag je cokoliv za
        /// znaménkem '+' v lokální části, vč. znaménka '+'. Při  směřování emailu
        /// se tag ignoruje, ale je možné ho použít k rozlišení/filtrování zpráv.
        /// </summary>
        public string Tag;
        /// <summary>
        /// Comment lokální části, pokud byl uveden.
        /// </summary>
        public string Comment;
        /// <summary>
        /// Porovná GEmail s adresou zadanou v GString.
        /// </summary>
        /// <param name="other"></param>
        /// <returns></returns>
        public bool Equals(GString other) => Equals(other?.BaseValueTrimmed);
        /// <summary>
        /// Porovná GEmail s adresou zadanou v string.
        /// </summary>
        /// <param name="other"></param>
        /// <returns></returns>
        public bool Equals(string other)
        {
            if (other is null) return false;
            GEmailParser.Options options = GEmailParser.Options.None;
            if (Local.Contains('"')) options |= GEmailParser.Options.AllowQuotedString;
            if (!Domain.Contains('.')) options |= GEmailParser.Options.AllowLocalDomain;
            return (new GEmailParser(options).Parse(other))?.Equals(this) ?? false;
        }
        /// <summary>
        /// Porovná GEmail s jiným GEmail.
        /// </summary>
        /// <param name="other"></param>
        /// <returns></returns>
        public bool Equals(GEmail other) => Local == other.Local
            && string.Compare(Domain, other.Domain, true) == 0;
    }

    /// <summary>
    /// Parser emailových adres.
    /// </summary>
    public class GEmailParser
    {
        /// <summary>
        /// Nastavení parseru.
        /// </summary>
        [Flags]
        public enum Options
        {
            /// <summary>
            /// Všechna nastavení jsou vypnutá.
            /// </summary>
            None = 0x0,
            /// <summary>
            /// Povolí parsování adres majících v lokální části quoted-string.
            /// Quoted-string v dvojitých uvozovkách umožňuje zadat takřka
            /// libovolný znak do local-part, ale většina mail-serverů takovou
            /// adresu odmítne a je tedy velmi vzácná.
            /// </summary>
            AllowQuotedString = 0x1,
            /// <summary>
            /// Povolí parsování adres které nemají na konci národní doménu.
            /// Takové adresy mohou být validní v lokálních sítích, ale jinak jsou
            /// velmi vzácné.
            /// </summary>
            AllowLocalDomain = 0x2,
            /// <summary>
            /// Povolí používání tagu v lokální části. Tag je cokoliv za
            /// znaménkem '+' v lokální části, vč. znaménka '+'. Při  směřování
            /// emailu se tag ignoruje, ale je možné ho použít k rozlišení/filtrování
            /// zpráv.
            /// </summary>
            AllowTag = 0x4
            ///// <summary>
            ///// NEIMPLEMENTOVÁNO: Povolí použití IP adresy namísto domény.
            ///// </summary>
            //AllowIpAddressDomain = 0x8,
            ///// <summary>
            ///// NEIMPLEMENTOVÁNO: Povolí použití comment v local-part. Comment
            ///// může být na začátku nebo na konci local-part uvedený v kulatých
            ///// závorkách a do adresy se nezahrnuje.
            ///// </summary>
            //AllowComments = 0x10
        }

        // atext je zkratka pro atom text, znaková sada čítá tyto znaky
        // https://tools.ietf.org/html/rfc2822#section-3.2.4
        private const string RE_ATEXT = @"[a-zA-Z0-9!$&*\-=\\^`|~#%'+/?_{}]";
        // quoted-string je zápis do dvojitých uvozovek umožňující zadat téměř cokoliv
        private const string RE_QUOTED_STRING = "\"(?:\\\\.|[^\"\\s])+\"";
        // host-part může obsahovat pouze alphanumeric, uprostřed může být navíc mínus
        // délka 1-63 znaků.
        private const string RE_HOST_PART = "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?";

        private readonly Regex _emailRegex;

        /// <summary>
        /// Konstruktor.
        /// </summary>
        /// <param name="options"></param>
        public GEmailParser(Options options = Options.AllowTag)
        {
            string reLocalPart = ((options & Options.AllowQuotedString) != 0)
                ? $@"(?:{RE_QUOTED_STRING}|\\.|{RE_ATEXT})"
                : $@"(?:\\.|{RE_ATEXT})"
                ;

            // jednotlivé local-part mohou být proložené tečkou
            // https://tools.ietf.org/html/rfc5322#page-17
            string reLocal = $@"{reLocalPart}(?:\.?{reLocalPart})*";

            // host-part může být v doménové části více, oddělených tečkou, na konci musí
            // národní doména mající minimálně dva alpha znaky
            string reDomain = $@"{RE_HOST_PART}(?:\.{RE_HOST_PART})*"
                + (((options & Options.AllowLocalDomain) != 0) ? "" : @"\.[a-zA-Z]{2,}");
                        
            string reTag = ((options & Options.AllowTag) != 0) ? @"(?<tag>\+[^\s@]*)?" : "";

            _emailRegex = new Regex($@"^(?<local>{reLocal}){reTag}?@(?<domain>{reDomain})$");
        }      
        
        /// <summary>
        /// Převede string na GEmail nebo null, pokud není validní.
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public GEmail? Parse(string str)
        {            
            var matches = _emailRegex.Matches(str);
            if (matches.Count == 1) {
                var groups = matches[0].Groups;
                string domain = groups["domain"].Value;
                // celková délka domain-name nesmí překročit 255 znaků
                if (domain.Length >= 255) return null;
                // celková délka local-name nesmí překročit 64 znaků
                if (str.Length - domain.Length - 1 >= 64) return null;

                return new GEmail() {
                    Domain = domain,
                    Local = groups["local"].Value,
                    Tag = groups["tag"]?.Value
                };
            }

            return null;
        }
    }
}
