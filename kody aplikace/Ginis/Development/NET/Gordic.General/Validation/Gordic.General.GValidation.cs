//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GValidation.cs               </Name>
//      <Description> Validace spoleènıch datovıch formátù        </Description>
//      <Author>      Jiøí Dvoøák                                 </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//      <Created>     2003-12-02                                  </Created>
//  </FileHeader>

using System;
using System.Reflection;

namespace Gordic.General {
    
    /// <summary>validace rùznıch datovıch prvkù</summary>
	/// <remarks>validuje rodné èíslo, èíslo bankovního úètu, IÈO a PID</remarks>
	public class GValidation : Gordic.General.IGObject {

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GValidation).Assembly; }
        } // end property

        #endregion

        /// <summary>validace rodného èísla</summary>
        /// <remarks>
        /// <para>ve vstupním øetìzci mùe a nemusí bıt znak /</para>
        /// <para>algoritmus pøipouští testování 9 a 10 místnıch (poèítáno bez '/') rodnıch èísel</para>
        /// <para>prvních 6 znakù je pochopeno jako datum a provádí se test na validnost data (mìsíc v rozsahu 0-12 a 50-62 atd..)</para>
        /// <para>rodné èíslo vydané po roce 1954 musí mít právì 10 èíslic</para>
        /// <para>pro 10 místné rodné èíslo se provádí testování kontrolního souètu</para>
        /// <para>algoritmus bude správnì pracovat do roku 2054, nepoèítá s lidmi narozenımi pøed rokem 1900</para>        
        /// </remarks>
        /// <param name="rodneCislo">rodné èíslo</param>
        /// <returns>chybovı stav. Pokud je roven 0, bez chyby. Øetìzec chyby lze získat pomocí <see cref="GetErrorDescription">GetErrorDescription</see></returns>
        public static int CheckRC(string rodneCislo){
            string l_sRodneCislo = String.Empty;
            bool l_bWasSlash = false;
            // kontrola na prázdné hodnoty
            if(rodneCislo == null) throw new GArgumentNullException(23200291);
            if((rodneCislo = rodneCislo.Trim()) == String.Empty) return 2;
            // procházení øetìzce po znacích
            for(int i=0;i<rodneCislo.Length;i++){
                // validní jsou pouze èíslice nebo znak 'A' na posledním místì
                if(Char.IsDigit(rodneCislo[i]) || Char.ToUpper(rodneCislo[i]) == 'A' && i==9) {
                    l_sRodneCislo += rodneCislo[i];
                } else {
                    if(rodneCislo[i] == '/') {
                        if(l_bWasSlash) return 3;
                        l_bWasSlash = true;
                    } else return 4;
                } // end if
            } // end for
            // kontrola na délku
            if(!(l_sRodneCislo.Length == 9 || l_sRodneCislo.Length == 10)) return 5;
            // rozparsuj den/mìsíc/rok
            int l_nYear = Int32.Parse(l_sRodneCislo.Substring(0,2));
            int l_nMonth = Int32.Parse(l_sRodneCislo.Substring(2,2));
            int l_nDay = Int32.Parse(l_sRodneCislo.Substring(4,2));
            // všechny 9 místná èísla jsou v roce 1900
            if(l_sRodneCislo.Length == 9) {
                if(l_nYear > 54) return 9;
                l_nYear += 1900;
            } else {
                // 10 místná èísla vìtší ne 54 jsou také rok 1900, menší u poèítáme do roku 2000
                if(l_nYear > 54) l_nYear += 1900;
                else l_nYear += 2000;
                // tenhle algoritmus bude fungovat a do roku 2054, to snad staèí.
            } // end if
            if(l_nMonth > 70 && l_nYear >= 2004) l_nMonth -= 70;   // eny, dodateèná øada
            if(l_nMonth > 50) l_nMonth -= 50;                      // eny, normální øada
            if(l_nMonth > 20 && l_nYear >= 2004) l_nMonth -= 20;   // mui, dodateèná øada
            // mìsíc mùe nabıvat hodnot 0-12 a 50-62
            if(l_nMonth > 12 || l_nMonth <= 0) return 6;
            // den musí bıt menší ne je poèet dnù v mìsíci
            if(l_nDay > System.DateTime.DaysInMonth(l_nYear ,l_nMonth)) return 7;
            // pokud má 9 èíslic, není kontrolní souèet (do roku 54), vrátím true
            if(l_sRodneCislo.Length == 9) return 0;
            // pokud má jinı poèet èíslic ne 10 vra false
            if(l_sRodneCislo.Length != 10) return 5;
            // èíslo se dìlí na testovanou èást a CRC. CRC je poslední znak
            string l_sTestString = l_sRodneCislo.Substring(0,l_sRodneCislo.Length-1);
            string l_sCRCString = String.Empty;
            l_sCRCString += l_sRodneCislo[l_sRodneCislo.Length-1];
            // z 1 znakového CRC øetìzce získáme odpovídající numerickou hodnotu CRC
            int l_nCRC;
            // je-li poslední znak RÈ A tak je CRC 10
            if(l_sCRCString[0] == 'A') l_nCRC = 10;
            else l_nCRC = Int32.Parse(l_sCRCString);
            // testovací èást pochopíme jako èíslo
            int l_nTestNum = Int32.Parse(l_sTestString);
            // CRC testované èásti se spoèítá pomocí modulo 11
            int l_nCRCFound = l_nTestNum%11;
            // a vracím zda CRC sedí.
            if(l_nCRC == l_nCRCFound) return 0;
            // ALF 31.8.2016 vyjímka z roku 1984  - prı 1000 rè mùe mít kontrolní sumu 0 a zbytek po dìlení 10 - a vracím tedy e CRC sedí.
            if (l_nCRC ==0 && l_nCRCFound==10 &&l_nYear<=1985) return 0;
            else return 8;
        } // end method
        
        /// <summary>validace rodného èísla</summary>
        /// <remarks>
        /// <para>ve vstupním øetìzci mùe a nemusí bıt znak /</para>
        /// <para>algoritmus pøipouští testování 9 a 10 místnıch (poèítáno bez '/') rodnıch èísel</para>
        /// <para>prvních 6 znakù je pochopeno jako datum a provádí se test na validnost data (mìsíc v rozsahu 0-12 a 50-62 atd..)</para>
        /// <para>rodné èíslo vydané po roce 1954 musí mít právì 10 èíslic</para>
        /// <para>pro 10 místné rodné èíslo se provádí testování kontrolního souètu</para>
        /// <para>algoritmus bude správnì pracovat do roku 2054, nepoèítá s lidmi narozenımi pøed rokem 1900</para>        
        /// </remarks>
        /// <param name="rodneCislo">rodné èíslo</param>
        /// <returns>true, pokud se jedná o platné rodné èíslo, jinak false</returns>
        public static bool ValidateRC(string rodneCislo) {
            return CheckRC(rodneCislo) == 0;
        } // end method

        /// <summary>kontrola platnosti IÈ</summary>
        /// <param name="ico"> IÈ (osm èíslic) ke kontrole </param>
        /// <returns> Chybovı stav. Hodnota 0 znamená, e je IÈ validní. Text chyby lze získat pomocí <see cref="GetErrorDescription">GetErrorDescription</see> </returns>
        /// <remarks> Algoritmus kontroly byl pøevzat z http://latrine.dgx.cz:80/jak-overit-platne-ic-a-rodne-cislo </remarks>
        public static int CheckICO8(string ico) {
            int l_nSuma = 0;
            int l_nZbytek = 0;
            int l_nPosledniCislice = 0;
            if(ico == null) throw new GArgumentNullException(23200292);
            if(ico.Length < 8) ico = ico.PadLeft(8,'0');
            if(ico.Length == 8) {
                for(int i=0; i<8; i++){
                    if(Char.IsDigit(ico[i]) == false) return (20); // znak musí bıt èíslo
                    if(i < 7) l_nSuma += (Int32.Parse(ico[i].ToString()) * (8 - i)); // první a sedmou èíslici vynásobíme èísly 8, 7, 6, 5, 4, 3, 2 a souèiny seèteme
                    else l_nPosledniCislice = Int32.Parse(ico[i].ToString());
                } // end for
                // spoèítáme zbytek po dìlení jedenácti
                l_nZbytek = l_nSuma % 11; 
                // pro poslední osmou èíslici musí platit nìkterá z následujících tøí podmínek 
                if(l_nZbytek == 0 || l_nZbytek == 10) {
                    if(l_nPosledniCislice == 1) return 0; // je-li zbytek 0 nebo 10, pak poslední osmá èíslice je 1
                } else if(l_nZbytek == 1) {
                    if(l_nPosledniCislice == 0) return 0; // je-li zbytek 1, pak poslední osmá èíslice je 0
                } else {
                    if(l_nPosledniCislice == (11 - l_nZbytek)) return 0; // v ostatních pøípadech je poslední osmá èíslice rovna rozdílu 11 - zbytek 
                } // end if
                return 21;
            } else return 22;
        } // end method
        
        /// <summary>kontroluje platnost 8-místného IÈ a vrátí zda probìhla úspìšnì èi neúspìšnì</summary>
        /// <param name="ico">IÈ - 8 èíslic</param>
        /// <returns>true, pokud je validní</returns>
        public static bool ValidateICO8(string ico) {
            return CheckICO8(ico) == 0;
        } // end method
        
        /// <summary>kontrola speciálního symbolu</summary>
        /// <param name="bankAccount">bankovní úèet</param>
        /// <param name="specSymbol">speciální symbol</param>
        /// <returns>0(OK) 31(prázdnı vstupní øetìzec) 32(špatnı kontrolní souèet)</returns>
        public static int CheckSpecialSymbol(string bankAccount, string specSymbol ){
            if(bankAccount == null) throw new GArgumentNullException(23200293);
            if(specSymbol == null) throw new GArgumentNullException(23200294);
            GAccountNumberValidation l_oAccNumberVal = new GAccountNumberValidation();
            return l_oAccNumberVal.CheckSpecialSymbol(bankAccount,specSymbol);
        } // end method	
		
		/// <summary>kontrola speciálního symboluk</summary>
		/// <param name="bankAccount">bankovní úèet</param>
		/// <param name="specSymbol">speciální symbol</param>
		/// <returns>pøíznak správnosti speciálního symbolu.</returns>
        public static bool ValidateSpecialSymbol(string bankAccount, string specSymbol ) {
            if(bankAccount == null) throw new GArgumentNullException(23200295);
            if(specSymbol == null) throw new GArgumentNullException(23200296);
            GAccountNumberValidation l_oAccNumberVal = new GAccountNumberValidation();
            return (l_oAccNumberVal.CheckSpecialSymbol(bankAccount,specSymbol) == 0);
        } // end method	

        /// <summary>kontrola èísla úètu</summary>
        /// <param name="accountString">øetìzec s èíslem úètu</param>
        /// <param name="firstPartAN">První èást èísla úètu ze vstupního øetìzce</param>
        /// <param name="secondPartAN">druhá èást èísla úètu ze vstupního øetìzce</param>
        /// <returns>vrací pøíznak 0(OK), jinak chybovı kód</returns>
        public static int CheckAccountNumber( string accountString, out string firstPartAN, out string secondPartAN ){
            if(accountString == null) throw new GArgumentNullException(23200297);
            GAccountNumberValidation l_oAccNumberVal = new GAccountNumberValidation();
            return l_oAccNumberVal.CheckBankAccount(accountString,out firstPartAN,out secondPartAN);
        } // end method
		
		/// <summary>kontrola èísla úètu</summary>
		/// <param name="accountString">øetìzec s èíslem úètu</param>
		/// <param name="firstPartAN">První èást èísla úètu ze vstupního øetìzce</param>
		/// <param name="secondPartAN">druhá èást èísla úètu ze vstupního øetìzce</param>
		/// <returns>pøíznak správnosti validace</returns>
		public static bool ValidateAccountNumber(string accountString, out string firstPartAN, out string secondPartAN) {
            if(accountString == null) throw new GArgumentNullException(23200298);
            GAccountNumberValidation l_oAccNumberVal = new GAccountNumberValidation();
			return (l_oAccNumberVal.CheckBankAccount(accountString,out firstPartAN,out secondPartAN) == 0);
		} // end method

        /// <summary>otestuje platnost PID</summary>
        /// <param name="pid">pid</param>
        /// <returns>true pokud OK jinak false</returns>
        public static bool ValidatePid(string pid){
            return CheckPIDInternal(pid,true) == 0;
        } // end method

        /// <summary>otestuje platnost Gordického identifikátoru, vrátí kód chyby</summary>
        /// <param name="pid">identifikátor dokumentu</param>
        /// <returns>0 pokud OK jinak kód chyby</returns>
        public static int CheckPid(string pid){
            return CheckPIDInternal(pid,true);
        } // end method

        /// <summary>otestuje platnost Gordického identifikátoru, vrátí kód chyby</summary>
        /// <param name="ixs">identifikátor</param>
        /// <returns>0 pokud OK jinak kód chyby</returns>
        public static int CheckIxs(string ixs){
            return CheckPIDInternal(ixs,false);
        } // end method

        /// <summary>otestuje platnost Gordického identifikátoru</summary>
        /// <param name="ixs">identifikátor</param>
        /// <returns>true pokud OK jinak false</returns>
        public static bool ValidateIxs(string ixs){
            return CheckPIDInternal(ixs,false) == 0;
        } // end method

        /// <summary>otestuje platnost PID, vrátí kód chyby</summary>
        /// <param name="pid">pid</param>
        /// <param name="testPidPisemnosti">jedná se o PID písemnosti?</param>
        /// <returns>0 pokud OK jinak kód chyby</returns>
        public static int CheckPIDInternal(string pid,bool testPidPisemnosti){
            if(pid == null) throw new GArgumentNullException(23200299);
            pid = pid.Trim();
            //Délka PID musí bıt 12 znakù
            if(pid.Length != 12) return 60;
            //Obsahovat smí jen èíslice nebo velká písmena
            foreach(char c in pid){
                if(!(Char.IsDigit(c) || (Char.IsLetter(c) && Char.IsUpper(c)))) return 61;
            }// end foreach
            //U písemností musí bıt pátı znak P nebo X
            if(testPidPisemnosti){
                if(pid[4].In('P','Q','X','Y','3') == false) return 62;
            }// end if
            int []l_anWeights = {1,3,5,7,11,13,17,19,23,29,31};
            const string l_csOrder = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            int l_nSum = 0;
            for(int i = 0;i<11;i++){
                int npos = l_csOrder.IndexOf(pid[i]);
                l_nSum += npos*l_anWeights[i];
            }// end for
            char l_sCRC = l_csOrder[l_nSum%36];
            if(l_sCRC != pid[11]) return 63;
            return 0;
        } // end method
        
        /// <summary>provede ovìøení platnosti formátu variabilního symbolup</summary>
        /// <param name="vs">variabilní symbol</param>
        /// <returns>true pokud je variabilní symbol v poøádku, jinak false</returns>
        public static bool ValidateVS(string vs){
            return CheckVS(vs) == 0;
        } // end method
        
        /// <summary>provede ovìøení platnosti formátu variabilního symbolup</summary>
        /// <param name="vs">variabilní symbol</param>
        /// <returns>Pokud je variabilní symbol v poøádku tak 0, jinak kód chyby</returns>
        public static int CheckVS(string vs){
            if(vs == null) throw new GArgumentNullException(23200300);
            vs = vs.Trim();
            if(vs.Length == 0) return 82;
            if(vs.Length > 10) return 80;
            foreach(char c in vs){
                if(!Char.IsDigit(c)) return 83;
            } // end foreach
            if(vs.Trim('0').Length == 0) return 84;
            return 0;
        } // end method
        
        /// <summary>provede ovìøení platnosti formátu poštovního smìrovacího èísla</summary>
        /// <param name="psc">poštovní smìrovací èíslo</param>
        /// <returns>Pokud je v poøádku tak 0, jinak kód chyby</returns>
        public static  int CheckCzechPSC(string psc){
            return GPSCValidation.TestCzechPSC(psc);
        } // end method
        
        /// <summary>provede ovìøení platnosti formátu poštovního smìrovacího èísla</summary>
        /// <param name="psc">poštovní smìrovací èíslo</param>
        /// <returns>Pokud je v poøádku tak true, jinak false</returns>
        public static bool ValidateCzechPSC(string psc){
            return GPSCValidation.TestCzechPSC(psc) == 0;
        } // end method
        
        /// <summary>vrací popis chyby pøi validaci</summary>
        /// <param name="errCode">kód chyby</param>
        /// <returns>popis vzniklé chyby</returns>
        public static string GetErrorDescription(int errCode) {
            switch (errCode) {
                case 1: return GResources.GetResourceText(ThisAssembly,23230035); //RC 23230035 : rodné èíslo nesmí bıt null
                case 2: return GResources.GetResourceText(ThisAssembly,23230036); //RC 23230036 : rodné èíslo nesmí bıt prázdnı øetìzec
                case 3: return GResources.GetResourceText(ThisAssembly,23230037); //RC 23230037 : v rodném èísle je více ne jeden znak '/'
                case 4: return GResources.GetResourceText(ThisAssembly,23230038); //RC 23230038 : rodné èíslo smí obsahovat pouze èíslice, znak '/' a znak 'A' na posledním místì
                case 5: return GResources.GetResourceText(ThisAssembly,23230039); //RC 23230039 : rodné èíslo má špatnı poèet znakù
                case 6: return GResources.GetResourceText(ThisAssembly,23230040); //RC 23230040 : èást rodného èísla vyjadøující mìsíc má hodnotu mimo monı rozsah
                case 7: return GResources.GetResourceText(ThisAssembly,23230041); //RC 23230041 : èást rodného èísla vyjadøující den má hodnotu mimo monı rozsah
                case 8: return GResources.GetResourceText(ThisAssembly,23230042); //RC 23230042 : chyba kontrolního souètu rodného èísla
                case 9: return GResources.GetResourceText(ThisAssembly,23230170); //RC 23230170 : rodné èíslo vydané po roce 1954 musí mít 10 èíslic
                case 20: return GResources.GetResourceText(ThisAssembly,23230043); //RC 23230043 : IÈ smí obsahovat pouze èíslice
                case 21: return GResources.GetResourceText(ThisAssembly,23230044); //RC 23230044 : nesouhlasí kontrolní souèet IÈ
                case 22: return GResources.GetResourceText(ThisAssembly,23230045); //RC 23230045 : Délka IÈ musí bıt právì 8 znakù
                case 23: return GResources.GetResourceText(ThisAssembly,23230046); //RC 23230046 : IÈ nesmí bıt null
                case 31: return GResources.GetResourceText(ThisAssembly,23230047); //RC 23230047 : Vstupní øetìzec pro validaci Speciálního symbolu nesmí bıt prázdnı.
                case 32: return GResources.GetResourceText(ThisAssembly,23230048); //RC 23230048 : Chybnı speciální symbol.
                case 33: return GResources.GetResourceText(ThisAssembly,23230049); //RC 23230049 : èíslo úètu není správnì zadáno.
                case 34: return GResources.GetResourceText(ThisAssembly,23230050); //RC 23230050 : èíslo úètu obsahuje nepovolené znaky.
                case 35: return GResources.GetResourceText(ThisAssembly,23230051); //RC 23230051 : èíslo úètu v tomto formátu nesmí bıt delší ne 10-místné.
                case 36: return GResources.GetResourceText(ThisAssembly,23230052); //RC 23230052 : nejsou vyplnìny všechny èásti bankovního úètu.
                case 37: return GResources.GetResourceText(ThisAssembly,23230053); //RC 23230053 : èíslo úètu není zadáno správnì.
                case 38: return GResources.GetResourceText(ThisAssembly,23230054); //RC 23230054 : 3èíslo úètu neodpovídá ádnému formátu.
                case 39: return GResources.GetResourceText(ThisAssembly,23230055); //RC 23230055 : èíslo úètu musí obsahovat i druhou èást èísla bankovního úètu.
                case 40: return GResources.GetResourceText(ThisAssembly,23230056); //RC 23230056 : èíslo úètu obsahuje pøíliš mnoho oddìlovaèù.
                case 41: return GResources.GetResourceText(ThisAssembly,23230057); //RC 23230057 : metodì musí bıt pøedán øetìzec.
                case 42: return GResources.GetResourceText(ThisAssembly,23230058); //RC 23230058 : délka øetìzce musí bıt 5 znakù.
                case 43: return GResources.GetResourceText(ThisAssembly,23230059); //RC 23230059 : v PSÈ musí bıt èíslice
                case 60: return GResources.GetResourceText(ThisAssembly,23230060); //RC 23230060 : délka PID musí bıt 12 znakù
                case 61: return GResources.GetResourceText(ThisAssembly,23230061); //RC 23230061 : PID se musí stávat z èíslic 0-9 nebo velkıch písmen A-Z
                case 62: return GResources.GetResourceText(ThisAssembly,23230062); //RC 23230062 : pro písemnosti musí bıt pátı znak PID buï "P" nebo "X"
                case 63: return GResources.GetResourceText(ThisAssembly,23230063); //RC 23230063 : chyba kontrolního souètu PID
                case 80: return GResources.GetResourceText(ThisAssembly,23230064); //RC 23230064 : variabilní symbol obsahuje více ne 10 znakù
                case 81: return GResources.GetResourceText(ThisAssembly,23230065); //RC 23230065 : na vstupu testu validity variabilního symbolu je null
                case 82: return GResources.GetResourceText(ThisAssembly,23230066); //RC 23230066 : na vstupu testu variabilního øetìzce je prázdnı øetìzec
                case 83: return GResources.GetResourceText(ThisAssembly,23230067); //RC 23230067 : variabilní symbol smí obsahovat pouze znaky 0-9
                case 84: return GResources.GetResourceText(ThisAssembly,23230068); //RC 23230068 : variabilní symbol obsahující samé nuly není validní
                case 85: return GResources.GetResourceText(ThisAssembly,23230175); //RC 23230175 : délka spojového èísla musí bıt 10 znakù
                case 86: return GResources.GetResourceText(ThisAssembly,23230176); //RC 23230176 : spojové èíslo smí obsahovat pouze èíslice
                case 87: return GResources.GetResourceText(ThisAssembly,23230177); //RC 23230177 : chyba kontrolního souètu spojového èísla
            } // end switch
            return "";
        } // end method

        /// <summary>provede ovìøení platnosti formátu spojového èísla pro SIPO</summary>
        /// <param name="spojCislo">spojové èíslo SIPO</param>
        /// <returns>pokud je spojové èíslo v poøádku tak 0, jinak kód chyby</returns>
        public static int CheckSpojCislo(string spojCislo) {
            if(spojCislo == null) throw new GArgumentNullException(23200435);
            spojCislo = spojCislo.Trim();
            // délka spojového èísla musí bıt 10 znakù
            if(spojCislo.Length != 10) return 85;
            // obsahovat smí jen èíslice
            foreach(char c in spojCislo) {
                if(!(Char.IsDigit(c))) return 86;
            } // end foreach
            int[] l_anWeights = { 3,7,3,1,7,3,1,7,3 };
            int l_nSum = 0;
            for(int i = 0; i < 9; i++) {
                int npos = Int32.Parse(spojCislo[i].ToString());
                l_nSum += npos * l_anWeights[i];
            } // end for
            int l_nCRC = l_nSum % 10;
            l_nCRC = (l_nCRC == 0 ? l_nCRC : (10 - l_nCRC)); // pokud není nula, tak se kontrolní èíslice bere jako 10 - (zbytek po dìlìní 10)
            if(l_nCRC != Int32.Parse(spojCislo[9].ToString())) return 87;
            return 0;
        } // end method 

        /// <summary>provede ovìøení platnosti formátu spojového èísla pro SIPO</summary>
        /// <param name="spojCislo">spojové èíslo SIPO</param>
        /// <returns>true pokud OK, jinak false</returns>
        public static bool ValidateSpojCislo(string spojCislo) {
            return CheckSpojCislo(spojCislo) == 0;
        } // end method

    } // end class

} // end namespace
