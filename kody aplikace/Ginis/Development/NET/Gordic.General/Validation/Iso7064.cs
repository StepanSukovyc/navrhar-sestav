//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.Iso7064.cs                                   </Name>
//    <Description> Práce s Iso7064 (algoritmy pro výpočet kontrolních číslic)  </Description>
//    <Author>      vnovotny                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-07-31                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Práce s Iso7064 (algoritmy pro výpočet kontrolních číslic).
    /// </summary>
    public class Iso7064
    {
        /// <summary>
        /// Sada povolených znaků, ke kterým se počítá kontrolní hodnota,
        /// seřazených podle číselné hodnoty používané při výpočtu.
        /// </summary>
        public readonly string CharSet;
        /// <summary>
        /// Příznak, zda algoritmus generuje dvouznakové kontrolní hodnoty.
        /// </summary>
        public readonly bool IsDoubleCheckDigit;
        /// <summary>
        /// Dělitel, který se používá pro výpočet.
        /// </summary>
        public readonly int Modulus;
        /// Základ, který se používá pro výpočet.
        public readonly int Radix;

        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="charSet"></param>
        /// <param name="isDoubleCheckDigit"></param>
        /// <param name="modulus"></param>
        /// <param name="radix"></param>
        private Iso7064(string charSet, bool isDoubleCheckDigit, int modulus
            , int radix)
        {
            CharSet = charSet;
            IsDoubleCheckDigit = isDoubleCheckDigit;
            Modulus = modulus;
            Radix = radix;
        }

        /// <summary>
        /// Vypočítá kontrolní hodnotu pro vstup.
        /// </summary>
        /// <param name="input"></param>
        /// <returns>Kontrolní hodnota pro vstup.</returns>
        public string Compute(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) {
                throw new GArgumentException(31400001, 31400006); //RC-EX 31400006 : Výpočet kontrolní číslice iso7064 obdržel prázdnou hodnotu na vstupu.
            }

            input = input.ToUpper();

            int check = 0;
            foreach(char c in input) {
                int cValue = CharSet.IndexOf(c);
                if (cValue == -1) {
                    throw new GArgumentException(31400002, 31400007, c); //RC-EX 31400007 : Vstup obsahuje nevalidní znak: '{0}'.
                }
                check = ((check + cValue) * Radix) % Modulus;
            }

            // pro dvouznakové kontrolní hodnoty proveď ještě jednu iteraci
            if (IsDoubleCheckDigit) check = (check * Radix) % Modulus;

            // kontrolní součet musí mít zůstatek 1
            check = (Modulus - check + 1) % Modulus;

            if (IsDoubleCheckDigit) {
                int second = check % Radix
                    , first = (check - second) / Radix
                    ;
                return CharSet[first].ToString() + CharSet[second];
            }

            return CharSet[check].ToString();
        }

        /// <summary>
        /// Ověří hodnotu zabezpečenou kontrolním součtem, že odpovídá
        /// algoritmu.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public bool Verify(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return false;
            try {
                int len = input.Length - (IsDoubleCheckDigit ? 2 : 1);
                return Compute(input.Substring(0, len)) == input.Substring(len);
            }
            catch (Exception) {
                return false;
            } 
        }
                
        /// <summary>
        /// Implementace Mod11_2
        /// </summary>
        public static readonly Iso7064 Mod11_2 = new Iso7064("0123456789X", false, 11, 2);
        /// <summary>
        /// Implementace Mod1271_36
        /// </summary>
        public static readonly Iso7064 Mod1271_36 = new Iso7064("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", true, 1271, 36);
        /// <summary>
        /// Implementace Mod37_2
        /// </summary>
        public static readonly Iso7064 Mod37_2 = new Iso7064("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*", false, 37, 2);
        /// <summary>
        /// Implementace Mod661_26
        /// </summary>
        public static readonly Iso7064 Mod661_26 = new Iso7064("ABCDEFGHIJKLMNOPQRSTUVWXYZ", true, 661, 26);
        /// <summary>
        /// Implementace Mod97_10
        /// </summary>
        public static readonly Iso7064 Mod97_10 = new Iso7064("0123456789", true, 97, 10);
    }
}
 
