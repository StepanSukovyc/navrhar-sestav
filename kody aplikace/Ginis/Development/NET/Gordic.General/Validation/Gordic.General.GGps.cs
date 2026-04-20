//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GGps.cs                     </Name>
//    <Description> výpoèty nad GPS souøadnicemi               </Description>
//    <Author>      Libor Èaloud                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2007-02-28                                 </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Globalization;
using System.Reflection;

namespace Gordic.General {

    /// <summary>výpoèty nad GPS souøadnicemi</summary>
    public class GGps {

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GGps).Assembly; }
        } // end property

        #endregion
        
        /// <summary>Pøevede stupnì na èíslo (49°41'56.29"N -> 49,69897N)</summary>
        /// <param name="stupne">stupnì (49°41'56.29"N)</param>
        /// <returns>èíslo (49,69897N)</returns>
        public static string StupneNaCislo(string stupne) {
            int l_nStupne = 0;
            int l_nMinuty = 0;
            decimal l_oVteriny = 0;
            char l_cSvetovaStrana = 'N';
            string l_sNumber = "";
            foreach(char c in stupne) {
                if(Char.IsDigit(c)) {
                    l_sNumber += c;
                } else if(c == ',' || c == '.') {
                    l_sNumber += '.';
                } else if(c == '°') {
                    l_nStupne = int.Parse(l_sNumber);
                    l_sNumber = "";
                } else if(c == '\'') {
                    l_nMinuty = int.Parse(l_sNumber);
                    l_sNumber = "";
                } else if(c == '"' || c == '½' || c == '”') {
                    l_oVteriny = decimal.Parse(l_sNumber, CultureInfo.InvariantCulture);
                    l_sNumber = "";
                } else if(c == 'N') {
                    l_cSvetovaStrana = 'N';
                    l_sNumber = "";
                } else if(c == 'S' || c == 'J') {
                    l_cSvetovaStrana = 'S';
                    l_sNumber = "";
                } else if(c == 'E' || c == 'V') {
                    l_cSvetovaStrana = 'E';
                    l_sNumber = "";
                } else if(c == 'W' || c == 'Z') {
                    l_cSvetovaStrana = 'W';
                    l_sNumber = "";
                } else if(c == ' ') {
                } else {
                    throw new GException(23200301,23200301,c.ToString()); // GPS souøadnice obsahuje neoèekávaný znak [{0}].
                } // end if
            } // end foreach
            return 
                (
                    l_nStupne
                    +l_nMinuty/(decimal)60.0
                    +l_oVteriny/(decimal)3600.0
                ).ToString("0.00000",CultureInfo.InvariantCulture).Replace('.',',')
                +l_cSvetovaStrana;
        } // end method

        /// <summary>
        /// Pøevede èíslo na stupnì (49,69897N -> 49°41'56.29"N)
        /// </summary>
        /// <param name="cislo">èíslo (49,69897N)</param>
        /// <returns>stupnì (49°41'56.29"N)</returns>
        public static string CisloNaStupne(string cislo) {
            char l_cSvetovaStrana = 'N';
            string l_sNumber = "";
            foreach(char c in cislo) {
                if(Char.IsDigit(c)) {
                    l_sNumber += c;
                } else if(c == ',' || c == '.') {
                    l_sNumber += '.';
                } else if(c == 'N') {
                    l_cSvetovaStrana = 'N';
                } else if(c == 'S' || c == 'J') {
                    l_cSvetovaStrana = 'S';
                } else if(c == 'E' || c == 'V') {
                    l_cSvetovaStrana = 'E';
                } else if(c == 'W' || c == 'Z') {
                    l_cSvetovaStrana = 'W';
                } else if(c == ' ') {
                } else {
                    throw new GException(23200302,23200301,c.ToString()); // GPS souøadnice obsahuje neoèekávaný znak [{0}].
                } // end if
            } // end foreach
            decimal l_oNumber = decimal.Parse(l_sNumber,CultureInfo.InvariantCulture);
            int l_nStupne = (int)System.Math.Floor(l_oNumber);
            decimal l_oZbytek = l_oNumber-l_nStupne;
            int l_nMinuty = (int)System.Math.Floor(l_oZbytek*60);
            l_oZbytek = (l_oZbytek*60)-l_nMinuty;
            decimal l_nVteriny = l_oZbytek*60;
            return 
                l_nStupne.ToString()+"°"+
                l_nMinuty.ToString()+"'"+
                l_nVteriny.ToString("0.00",CultureInfo.InvariantCulture)+"\""+
                l_cSvetovaStrana;
        } // end method
        
        /// <summary>
        /// Vytvoøí URL pro www.mapy.cz
        /// </summary>
        /// <param name="sirka">zemìpisná šíøka (èíslo, z DB)</param>
        /// <param name="delka">zemìpisná délka (èíslo, z DB)</param>
        /// <returns>URL pro www.mapy.cz</returns>
        public static string VytvorUrlProMapyCz(string sirka, string delka) {
            return "http://www.mapy.cz/?mapType=base&portHeight=480&portWidth=640&query=Loc%3A%20"+sirka+"%2C"+delka+"#";
        } // end method

        
        /// <summary>
        /// Provede validaci øetìzce obsahujícího GPS souøadnice
        /// </summary>
        /// <param name="stupne">gps souøadnice</param>
        /// <param name="typGps">jaký typ souøadnic validace akceptuje</param>
        /// <returns>chybové hlášní, nebo null, pokud je vše OK</returns>
        public static string ValidujGps(string stupne, TypGps typGps) {
            string l_sError = ParseGps(stupne, typGps);
            if(l_sError != null){
                l_sError += " "+ GResources.GetResourceText(ThisAssembly,23230152); // Zadejte prosím souøadnice v formátu  "NN°NN'NN.NNA" kde "N" pøedstavuje libovolnou èíslici a "A" libovolný znak. Napøíklad "49°41'56.29N"
            } // end 
            return l_sError;
        } // end method

        
        /// <summary>
        /// Provede validaci øetìzce obsahujícího GPS souøadnice
        /// </summary>
        /// <param name="stupne">gps souøadnice</param>
        /// <param name="typGps">jaký typ souøadnic validace akceptuje</param>
        /// <returns>chybové hlášní, nebo null, pokud je vše OK</returns>
        private static string ParseGps(string stupne, TypGps typGps) {
            int l_nStupne = -1;
            int l_nMinuty = -1;
            decimal l_oVteriny = -1;
            char l_cSvetovaStrana = 'X';
            string l_sNumber = "";
            foreach(char c in stupne) {
                if(Char.IsDigit(c)) {
                    l_sNumber += c;
                } else if(c == ',' || c == '.') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(l_nMinuty == -1) return GResources.GetResourceText(ThisAssembly,23230154); // Deklarace minut nebyla nalezena.
                    l_sNumber += '.';
                } else if(c == '°') {
                    if(!int.TryParse(l_sNumber, out l_nStupne)) {
                        return GResources.GetResourceText(ThisAssembly,23230155,l_sNumber); // Nesprávná deklarace stupòù : {0}.
                    } // end if
                    l_sNumber = "";
                } else if(c == '\'') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(!int.TryParse(l_sNumber,out l_nMinuty)){
                        return GResources.GetResourceText(ThisAssembly,23230156,l_sNumber); // Nesprávná deklarace minut : {0}.
                    } // end if
                    l_sNumber = "";
                } else if(c == '"' || c == '½' || c == '”') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(l_nMinuty == -1) return GResources.GetResourceText(ThisAssembly,23230154); // Deklarace minut nebyla nalezena.
                    if(!decimal.TryParse(l_sNumber,System.Globalization.NumberStyles.Any,CultureInfo.InvariantCulture,out l_oVteriny)){
                        return GResources.GetResourceText(ThisAssembly,23230157,l_sNumber); // Nesprávná deklarace vteøin : {0}.
                    } // end if
                    l_sNumber = "";
                } else if(c == 'N') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(l_nMinuty == -1) return GResources.GetResourceText(ThisAssembly,23230154); // Deklarace minut nebyla nalezena.
                    if(l_oVteriny == -1) return GResources.GetResourceText(ThisAssembly,23230158); // Deklarace vteøin nebyla nalezena.
                    l_cSvetovaStrana = 'N';
                    l_sNumber = "";
                } else if(c == 'S' || c == 'J') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(l_nMinuty == -1) return GResources.GetResourceText(ThisAssembly,23230154); // Deklarace minut nebyla nalezena.
                    if(l_oVteriny == -1) return GResources.GetResourceText(ThisAssembly,23230158); // Deklarace vteøin nebyla nalezena.
                    l_cSvetovaStrana = 'S';
                    l_sNumber = "";
                } else if(c == 'E' || c == 'V') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(l_nMinuty == -1) return GResources.GetResourceText(ThisAssembly,23230154); // Deklarace minut nebyla nalezena.
                    if(l_oVteriny == -1) return GResources.GetResourceText(ThisAssembly,23230158); // Deklarace vteøin nebyla nalezena.
                    l_cSvetovaStrana = 'E';
                    l_sNumber = "";
                } else if(c == 'W' || c == 'Z') {
                    if(l_nStupne == -1) return GResources.GetResourceText(ThisAssembly,23230153); // Deklarace stupòù nebyla nalezena.
                    if(l_nMinuty == -1) return GResources.GetResourceText(ThisAssembly,23230154); // Deklarace minut nebyla nalezena.
                    if(l_oVteriny == -1) return GResources.GetResourceText(ThisAssembly,23230158); // Deklarace vteøin nebyla nalezena.
                    l_cSvetovaStrana = 'W';
                    l_sNumber = "";
                } else if(c == ' ') {
                } else {
                    return GResources.GetResourceText(ThisAssembly,23230159); // Neoèekávaný znak v GPS souøadnicích.
                } // end if
            } // end foreach
            if(l_cSvetovaStrana == 'X') return GResources.GetResourceText(ThisAssembly,23230160); // Deklarace svìtové strany nebyla nalezena.
            if(l_cSvetovaStrana == 'E' || l_cSvetovaStrana == 'W'){
                if(typGps == TypGps.Sirka) return GResources.GetResourceText(ThisAssembly,23230161); // Oèekává se délka místo šíøky.
                if( Math.Abs(l_nStupne) > 180){
                    return GResources.GetResourceText(ThisAssembly,23230162); // Chybná deklarace délky, hodnota se musí pohybovat v rozmezí 0 až 180 stupòù.
                } // end if
            } // end if
            if(l_cSvetovaStrana == 'N' || l_cSvetovaStrana == 'S'){
                if(typGps == TypGps.Delka) return GResources.GetResourceText(ThisAssembly,23230163); // Oèekává se šíøka místo délky.
                if(l_nStupne > 90) {
                    return GResources.GetResourceText(ThisAssembly,23230164); // Chybná deklarace šíøky, hodnota se musí pohybovat v rozmezí 0 až 90 stupòù.
                } // end if
            } // end if
            return null;
        } // end method

    } // end class

    
    /// <summary>
    /// Typ GPS souøadnic (šíøka, délka)
    /// </summary>
    public enum TypGps {
        /// <summary> šíøka </summary>
        Sirka,
        /// <summary> délka </summary>
        Delka,
        /// <summary> šíøka i délka </summary>
        SirkaDelka
    } // end method


} // end namespace
