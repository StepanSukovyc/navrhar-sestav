//<FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//<Name>        Gordic.General.GPSCValidation        </Name>
//<Description> kontrola PSC                                    </Description>
//<Author>      Robert Novák                                    </Author>
//<Copyright>   © GORDIC spol. s r. o. 1993 - 2021      </Copyright>
//<Created>     2003-12-1                                       </Created>
//</FileHeader>

using System;

namespace Gordic.General {
    
    /// <summary>kontrola na PSC v Ceske republicek</summary>
	internal class GPSCValidation : IGObject {			
        
        /// <summary>
		/// Test na zadání správného èeského smìrovacího èísla
		/// </summary>
		/// <param name="inPSC">vstupní øetìzes s hodnotou PSC</param>		
		/// <returns>Kód chyby</returns>
		internal static int TestCzechPSC(string inPSC) {
            if(inPSC == null) throw new GArgumentNullException(23200290);
            string l_sTempPSC = inPSC.Trim();
			if(l_sTempPSC.Length != 5) return 42;
			else{
                foreach(char c in l_sTempPSC){
                    if(!char.IsDigit(c)) return 43;
                }//end foreach
			}//end else
			return 0;				
		} // end method

    } // end class

} // end namespace
