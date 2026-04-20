// <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
// <Name>        Gordic.General.GAcccountNumberValidation   </Name>
// <Description> kontrola èísel úètù a speciálních symbolù  </Description>
// <Author>      Robert Novák, Jan Kuttich                  </Author>
// <Copyright>   © GORDIC spol. s r. o. 1993 - 2021         </Copyright>
// <Created>     2003-12-1                                  </Created>
// </FileHeader>

using System;

namespace Gordic.General {

    /// <summary>kontrola na formát èísel úètù a speciálních symbolù</summary>
    internal class GAccountNumberValidation : IGObject {

        #region datové èleny

        /// <summary>pole èísel úètù</summary>
        private int[] m_anCisla = new int[30];
        
        /// <summary>èítaè pozice znaku èísla úètu</summary>
        private int m_nCitac;

        #endregion

        #region soukromé metody

        /// <summary>oøezání zadaného èísla úètu o prázdné znaky nebo oddìlovaèe</summary>
        /// <param name="inStr">vstupní øetìzec</param>
        /// <returns>výstupní øetìzec</returns>
        private string InputStringTrim(string inStr) {
            string l_sAN;
            int l_iLeftCounter = 0,l_iRightCounter;
            if(((inStr.Length) > 127) || (inStr.Length == 0) || (inStr == null)) return String.Empty;
            l_sAN = inStr;
            // oøezání nepotøebných znakù zleva
            while((l_sAN[l_iLeftCounter].Equals(' ')) || (l_sAN[l_iLeftCounter].Equals('-'))) {
                l_iLeftCounter++;
                if(l_iLeftCounter == l_sAN.Length) return String.Empty;
            } // end while
            if(l_iLeftCounter == l_sAN.Length) return String.Empty;
            l_iRightCounter = l_sAN.Length - 1;
            // oøezání nepotøebných znakù zprava
            while((l_sAN[l_iRightCounter].Equals(' ')) || (l_sAN[l_iRightCounter].Equals('-'))) {
                l_iRightCounter--;
                if(l_iRightCounter == -1) return String.Empty;
            } // end while
            // vrácení oøezaného øetìzce
            return l_sAN.Substring(l_iLeftCounter,l_iRightCounter - l_iLeftCounter + 1);
        } // end method

        /// <summary>vybere z øetìzce èísla</summary>
        /// <param name="inStr">vstupní øetìzec</param>
        private void NumStr(string inStr) {
            int l_iStringCounter = 0;
            int l_iNJ;
            int l_iNS1 = inStr.Length - 1;
            char l_cActualChar = (char)0;
            m_nCitac = -1;
            while(l_iStringCounter <= l_iNS1) {
                if(inStr[l_iStringCounter] >= '0' && inStr[l_iStringCounter] <= '9') {
                    m_nCitac++;
                    l_iNJ = 1;
                    while(l_iNJ <= 9) {
                        m_anCisla[l_iNJ - 1] = m_anCisla[l_iNJ];
                        l_iNJ++;
                    } //end while
                    l_cActualChar = inStr[l_iStringCounter];
                    m_anCisla[9] = l_cActualChar - 48;
                } // end if
                l_iStringCounter++;
            }//end while
        } // end method

        /// <summary>vymazání hodnot z pole èísel</summary>
        private void ClearCisla() {
            for(int i = 0; i < 30; i++) {
                m_anCisla[i] = 0;
            } // end for
        } // end method          

        /// <summary>test na modulo 11 jednotlivých èástí</summary>
        /// <param name="inStr">vstupní øetìzec</param>
        /// <returns>pokud == 0 (vše OK)</returns>
        private int Mod11(string inStr) {
            string l_sStr;
            int l_iNG,l_iNH,l_nCounter,l_iSum = 0;
            string l_sStrTemp = inStr.TrimStart('0');
            l_sStr = l_sStrTemp.Substring(0,l_sStrTemp.Length);
            l_nCounter = l_sStr.Length;
            l_iNH = l_nCounter - 1;
            if(l_iNH > 0) {
                for(l_iNG = 0; l_iNG < l_nCounter; l_iNG++) {
                    // Suma i se zápoètem vah jednotlivých pozic
                    l_iSum = l_iSum + (l_sStr[l_iNH] - '0') * (int)System.Math.Pow(2,l_iNG);
                    l_iNH--;
                } //end for  
                if(l_iSum % 11 == 0) return 0;
                else return -1;
            } else return 0;
        } // end method   

        #endregion

        #region veøejné metody

        /// <summary>kontrola èísla úètu</summary>
        /// <param name="accountString">øetìzec s èíslem úètu</param>
        /// <param name="firstPartAN">První èást èísla úètu ze vstupního øetìzce</param>
        /// <param name="secondPartAN">druhá èást èísla úètu ze vstupního øetìzce</param>
        /// <returns>vrací pøíznak 0(OK), jinak chyba</returns>
        public int CheckBankAccount(string accountString,out string firstPartAN,out string secondPartAN) {
            int l_nCountDash = 0;
            int l_nCounter = 0;
            int l_nANLength = 0;
            string l_sFirstPart = String.Empty;
            string l_sSecondPart = String.Empty;
            string l_sThirdPart = String.Empty;
            string l_sTemp = String.Empty;
            string l_sTempPart = String.Empty;
            // inicializace promìnných
            firstPartAN = String.Empty;
            secondPartAN = String.Empty;
            accountString = InputStringTrim(accountString);
            // kontrola na povolené znaky a poèet pomlèek
            if(accountString != String.Empty) l_nANLength = accountString.Length;
            for(l_nCounter = 0; l_nCounter < l_nANLength; l_nCounter++) {
                if(((accountString[l_nCounter] >= '0') && (accountString[l_nCounter] <= '9')) || (accountString[l_nCounter] == '-')) {
                    if(accountString[l_nCounter] == '-') l_nCountDash++;
                } else return 34;
            } // end for  
            // vyhodnocení podle poètu pomlèek              
            if(l_nCountDash == 0) {
                accountString = accountString.TrimStart('0');
                if(accountString.Length <= 10) {
                    if((Mod11(accountString) == 0)) {
                        firstPartAN = String.Empty;
                        secondPartAN = accountString;
                        return 0;
                    } else return 33;
                } else return 35;
            } else if(l_nCountDash == 1 || l_nCountDash == 2) {
                if(l_nCountDash == 1) {
                    accountString.Trim();
                    l_sTempPart = accountString.Substring(0,accountString.IndexOf('-'));
                    if(l_sTempPart == String.Empty) return 36;
                    l_sFirstPart = l_sTempPart;
                    l_sTempPart = accountString.Substring(accountString.IndexOf('-') + 1,accountString.Length - accountString.IndexOf('-') - 1);
                    if(l_sTempPart == String.Empty) return 36;
                    l_sSecondPart = l_sTempPart;
                } else {
                    // vyhozeni pomlcky zprava
                    accountString.Trim();
                    l_sTempPart = accountString.Substring(0,accountString.IndexOf('-'));
                    if(l_sTempPart == String.Empty) return 36;
                    l_sFirstPart = l_sTempPart;
                    l_sTempPart = accountString.Substring(accountString.IndexOf('-') + 1,accountString.LastIndexOf('-') - 1 - accountString.IndexOf('-'));
                    if(l_sTempPart == String.Empty) return 36;
                    l_sSecondPart = l_sTempPart;
                    l_sTempPart = accountString.Substring(accountString.LastIndexOf('-') + 1,accountString.Length - 1 - accountString.LastIndexOf('-'));
                    if(l_sTempPart == String.Empty) return 36;
                    l_sThirdPart = l_sTempPart;
                    l_sSecondPart = l_sSecondPart + l_sThirdPart;
                } // end if                         
                l_sFirstPart = l_sFirstPart.TrimStart('0');
                l_sTemp = l_sFirstPart;
                l_sTemp = l_sTemp + l_sSecondPart;
                if(l_sSecondPart.Length > 1) l_sSecondPart = l_sSecondPart.TrimStart('0'); // ze 3 na 1
                if(l_sSecondPart.Length > 0) {
                    if(l_sFirstPart.Length <= 6 && l_sSecondPart.Length <= 10 && l_sSecondPart.Length > 1) { // ze 3 na 1
                        if(Mod11(l_sFirstPart) == 0 && Mod11(l_sSecondPart) == 0) {
                            firstPartAN = l_sFirstPart;
                            secondPartAN = l_sSecondPart;
                            return 0;
                        } else {
                            if(l_sTemp.Length <= 10 && (Mod11(l_sTemp) == 0)) {
                                firstPartAN = String.Empty;
                                secondPartAN = l_sTemp;
                                return 0;
                            } else return 37;
                        } // end if
                    } //end if
                    else if((l_sFirstPart.Length <= 7) && (l_sSecondPart.Length <= 1) && (Mod11(l_sTemp) == 0)) { // ze 3 na 1
                        firstPartAN = String.Empty;
                        secondPartAN = l_sTemp;
                        return 0;
                    } else if((l_sFirstPart.Length >= 6) && (l_sTemp.Length <= 10) && (Mod11(l_sTemp) == 0)) {
                        firstPartAN = String.Empty;
                        secondPartAN = l_sTemp;
                        return 0;
                    } else return 38;
                } else return 39;
            } else return 40;
        } // end method

        /// <summary>kontrola speciálního symboluk</summary>
        /// <param name="bankAccount">bankovní úèet</param>
        /// <param name="specSymbol">speciální symbol</param>
        /// <returns>0(OK) 31(prázdný vstupní øetìzec) 32(špatný kontrolní souèet)</returns>
        public int CheckSpecialSymbol(string bankAccount,string specSymbol) {
            if((bankAccount[5] >= '0' && bankAccount[5] <= '3') || (bankAccount[5] >= '6' && bankAccount[5] <= '7')) {
                ClearCisla();
                NumStr(specSymbol);
                if(specSymbol.Length == 0) return 31;
                if((m_anCisla[0] + m_anCisla[1] * 3 + m_anCisla[2] * 7 + m_anCisla[3] + m_anCisla[4] * 3 + m_anCisla[5] * 7 + m_anCisla[6] + m_anCisla[7] * 3 + m_anCisla[8] * 7 + m_anCisla[9]) % 10 != 0) {
                    return 32;
                } //end if
            } //end if
            return 0;
        } // end method

        #endregion

    } // end class

} // end namespace


