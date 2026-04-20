//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFaze.cs                                     </Name>
//    <Description> Třída rozebírající faze string na jednotlivé části          </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-06-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Třída rozebírající faze string na jednotlivé části
    /// </summary>
    public class GFaze
    {
        private string _faze = null;
        
        /// <summary>
        /// Příznak, že fáze splňuje standardy GINIS - svým označením
        /// </summary>
        private bool _isGinisFaze = false;

        /// <summary>
        /// Konstruktor s nastavením fáze
        /// </summary>
        /// <param name="faze"></param>
        public GFaze( string faze )
        {
            _faze = faze.Trim();

            // Základní test, že se může jednat o fázi typu GINIS - oni totiž nově vznikají faze, které nic z tohoto nesplňují
            if( _faze.Length == 8 && _faze.ToUpper() == _faze )
            {
                List<string> prefGinis = new List<string>() { "DWH", "GMS", "GIP", "GIN", "GSA", "GWA", "GWS", "GSS", "CSA", "CWA", "CWS", "CSS", "CSA" };
                string pref = Faze.Left(3);
                string v_lastChar = Faze.Substring(7, 1);
                if (int.TryParse(v_lastChar, out _))
                {
                    string v_typ_modulu = _faze.Substring(6, 1);
                    if (int.TryParse(v_typ_modulu, out _))
                        v_typ_modulu = "N";

                    if (v_typ_modulu.In("S", "D", "H", "N", "T"))
                        if (prefGinis.Contains(pref))
                            _isGinisFaze = true;
                }
            }
        }

        /// <summary>
        /// Příznak, že fáze splňuje standardy GINIS - svým označením
        /// </summary>
        public bool IsGinisFaze
        {
            get { return( _isGinisFaze); }  
        }

        /// <summary>
        /// Příznak, že se jedná o webovou aplikaci nebo webovou službu
        /// </summary>
        public bool IsWebPlatform
        {
            get
            {
                return _faze.StartsWith("GWS") || _faze.StartsWith("GWA") || _faze.StartsWith("CWA") || _faze.StartsWith("CWS");
            }
        }

        /// <summary>
        /// Příznak, že se jedná o windows aplikaci nebo windows službu
        /// </summary>
        public bool IsWinPlatform
        {
            get
            {
                return _faze.StartsWith("GSS") || _faze.StartsWith("GSA") || _faze.StartsWith("CSA") || _faze.StartsWith("CSS") || ( _faze.StartsWith("GIN") && TypModulu == GTypModuluEnum.EXE );
            }
        }

        /// <summary>
        /// Příznak, že se jedná o systémovou službu
        /// </summary>
        public bool IsSystemService
        {
            get
            {
                return ( _faze.StartsWith("GSS") || _faze.StartsWith("CSS") ) && TypModulu == GTypModuluEnum.EXE;
            }
        }

        /// <summary>
        /// Fáze 
        /// </summary>
        public string Faze
        {
            get
            {
                return (_faze);
            }
        }
        /// <summary>
        /// Nadřízená fáze k této fázi ( např. pro sestavy, dokumentaci atd.. se jedná o hlavní fázi )
        /// </summary>
        public string NadFaze
        {
            get 
            {
                if (_isGinisFaze)
                    return (Faze.Substring(0, 6) + "0" + Faze.Substring(7, 1));
                else
                    return (Faze);
            }
        }

        /// <summary>
        /// Typ instalačního modulu. S, D, H, N - jako number
        /// </summary>
        public string TypFaze
        {
            get
            {
                if (_isGinisFaze)
                {
                    string v_typ_modulu = Faze.Substring(6, 1);
                    if (int.TryParse(v_typ_modulu, out int _))
                        v_typ_modulu = "N";
                    return v_typ_modulu;
                }
                else
                    throw new GDataInvalidException(21300080, 21300062, _faze); //RC-EX 21300062 : Pro NeGINIS fáze není položka TypFaze dostupná - [{0}]
            }
        }

        /// <summary>
        /// Typ distribučního balíčku
        /// </summary>
        public GTypModuluEnum TypModulu
        {
            get
            {
                switch (TypFaze)
                {
                    case "S":
                        return GTypModuluEnum.SES;
                    case "D":
                        return GTypModuluEnum.DOC;
                    case "H":
                        return GTypModuluEnum.HLP;
                    case "N":
                        List<string> v_com = new List<string>() { "GINGIN01", "GININS01", "GINDNP01", "GINGRR01", "GINTTF01", "GINORA01", "GINMSS01" };
                        if (v_com.Contains(Faze))
                            return GTypModuluEnum.COM;
                        else if (Faze.StartsWith("DEP"))
                            return GTypModuluEnum.COM;
                        else
                            return GTypModuluEnum.EXE;
                    default:
                        return GTypModuluEnum.NO;
                }
            }
        }

        /// <summary>
        /// Zkratka fáze - tři znaky, např. ADM
        /// </summary>
        public string Zkratka3
        {
            get 
            {
                if (_isGinisFaze)
                    return (Faze.Substring(3, 3)); 
                else
                    throw new GDataInvalidException(21300081, 21300063, _faze); //RC-EX 21300063 : Pro NeGINIS fáze není položka dostupná - [{0}]
            }
        }
        /// <summary>
        /// Zkratka fáze - pět znaků, např. ADM01
        /// </summary>
        public string Zkratka5
        {
            get 
            {
                if (_isGinisFaze)
                    return (Faze.Substring(3, 5));
                else
                    throw new GDataInvalidException(21300082, 21300063, _faze); //RC-EX 21300063 : Pro NeGINIS fáze není položka dostupná - [{0}]
            }
        }

        /// <summary>
        /// Příznak, že se jedná o systémovou fázi - je sdílena napříč systémem a neuvádí se do required seznamů, není uvedena v licenčním certifikátu, 
        /// přesto se šíří k zákazníkům jako nedílná součást systému
        /// </summary>
        public bool IsSystemFaze
        {
            get
            {
                string[] systemoveFaze = new string[] { "GINORA01", "GINMSS01", "GINTTF01", "GINAKT01" };
                return (systemoveFaze.Contains(this.Faze));
            }
        }
    }
}
