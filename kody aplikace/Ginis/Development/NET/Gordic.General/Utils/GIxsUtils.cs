//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GIxsUtils.cs                                 </Name>
//    <Description> Podpora stringových funkcí generování IXS a IXP identifikátorů systému Ginis</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-13                                                  </Created>
//  </FileHeader>


using System;
using Gordic.General;
using System.Text;

namespace Gordic.General
{

    //---------------------------------------------------------------------
    /// <summary>
    /// Podpora stringových funkcí generování IXS a IXP identifikátorů systému Ginis
    /// V3echny funkce jsou static
    /// </summary>
    public class GIxsUtils
    {

        //---------------------------------------------------------------------
        /// <summary>
        /// Pole dělitelů pro převod čísla do soustavy '36' (generování identifikátorů)
        /// </summary>
        private static readonly int[] m_oNDiv = { 1, 36, 1296, 46656, 1679616, 60466176 };

        //---------------------------------------------------------------------
        /// <summary>
        /// Kódovací tabulka pro převod čísla do soustavy '36' (generování identifikátorů)
        /// </summary>
        private static readonly char[] m_oIxxVector =
        {  '1', '2', '3', '4', '5', '6', '7', '8',
           '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
           'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
           'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
           'X', 'Y', 'Z', '0'
        };

        //---------------------------------------------------------------------
        /// Pomocná tabulka pro převod čísla do soustavy '36' (generování identifikátorů)
        private static readonly int[] m_oIxxPrv = { 1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 };

        //---------------------------------------------------------------------
        /// <summary>
        /// Převod čísla do soustavy '36'
        /// </summary>
        /// <param name="numP">číslo k převodu</param>
        /// <param name="maxLen">maximální velikost výstupního řetězce - povolené rozmezí této hodnoty je od 1 do 6</param>
        /// <returns></returns>
        public static  string Get36( int numP, int maxLen )
        {
            int l_nNum = numP;
            int l_nNhn = 0;
            char l_cShss = ' ';
            string l_sShs = "";
            for(int nhi = 0; nhi <= 5; nhi++)
            {
                l_nNhn = (l_nNum / m_oNDiv[5 - nhi]);
                if(l_nNhn > 0)
                {
                    l_cShss = m_oIxxVector[l_nNhn - 1];
                }
                else
                {
                    l_cShss = '0';
                }// end if
                l_sShs = l_sShs + l_cShss;
                l_nNum = l_nNum % (m_oNDiv[5 - nhi]);
            }// end for
            l_sShs = l_sShs.Substring( l_sShs.Length - maxLen );
            return l_sShs;
        }

        /// <summary>
        /// Převod čísla v kódování 36 na INT
        /// </summary>
        /// <param name="a_string">String obsahující číslo podle kódování 36</param>
        /// <returns>Přepočtené číslo na base 10.</returns>
        public static int Get10( string a_string )
        {
            int v_vysledek = 0;
            byte[] v_bytes = Encoding.GetEncoding( "windows-1250" ).GetBytes( a_string );
            foreach(byte v_znak in v_bytes)
            {
                int v_cislo = 0;
                if(v_znak >= 48 && v_znak <= 57)           // CASE '0' TO '9'
                    v_cislo = v_znak - 48;
                else if(v_znak >= 65 && v_znak <= 90)      // CASE 'A' TO 'Z'
                    v_cislo = v_znak - 55;
                else if(v_znak >= 97 && v_znak <= 122)      // CASE 'a' TO 'z'
                    v_cislo = v_znak - 87;
                else
                    throw new GInternalDataException( 21300033, 21300035, nameof(Get10) ); //RC-EX 21300035 :  Chyba dat. Funkce [{0}] pro převod čísla z kódování 36 na base 10 očekává string se znaky pouze: 0-9 a-z A-Z.

                v_vysledek = v_vysledek * 36 + v_cislo;
            }
            return ( v_vysledek );
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Hledání znaku v poli m_oIxxVector
        /// </summary>
        /// <param name="c">Znak k nalezení</param>
        /// <returns>Vrací pozici znaku v poli</returns>
        private static int FindInVector( char c )
        {
            int i = 0;
            int result = -1;
            while(i < m_oIxxVector.Length)
            {
                if(m_oIxxVector[i] == c)
                {
                    result = i;
                    break;
                }// end if
                i++;
            }// end while
            return result;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Výroba kontrolního součtu identifikátoru
        /// </summary>
        /// <param name="ixxInP">Identifikátor o 11 znacích</param>
        /// <returns>Vrací znak z pole 'm_oIxxVector' vzniklý kontrolním součtem</returns>
        public static string GetCheck( string ixxInP )
        {
            int nn = 0;
            int npos = 0;
            string sResult;
            for(int ncyc = 0; ncyc < 11; ncyc++)
            {
                if(ixxInP.Substring( ncyc, 1 ) == "0")
                {
                    npos = 0;
                }
                else
                {
                    npos = FindInVector( ixxInP[ncyc] ) + 1;
                }// end if
                nn = nn + npos * m_oIxxPrv[ncyc];
            }// end for
            nn = nn % 36;
            sResult = "";
            if(nn == 0)
                sResult = "0";
            else
                sResult = sResult + m_oIxxVector[nn - 1];
            return sResult;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Generování primárního identifikátoru systému GINIS 
        /// </summary>
        /// <param name="licP">licence databáze</param>
        /// <param name="ixP">identifikace subjektu</param>
        /// <param name="numP">poslední vygenerované číslo - pořadí</param>
        /// <returns>vrací vygenerovaný identifikátor - pří chybě vznikne vyjímka</returns>
        public static string GenerateIxx(
            GString licP,
            GString ixP,
            GInt32 numP
        )
        {
            string s36 = Get36( numP, 12 - (licP.BaseValueTrimmed.Length + ixP.BaseValueTrimmed.Length + 1) );
            s36 = licP.BaseValueTrimmed + ixP.BaseValueTrimmed + s36;
            s36 = s36 + GetCheck( s36 );
            return s36;
        }

    }
}
