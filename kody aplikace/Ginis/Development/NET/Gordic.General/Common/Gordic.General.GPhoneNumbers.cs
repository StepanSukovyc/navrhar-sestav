//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GPhoneNumbers.cs    </Name>
//      <Description> kolekce telefonních èísel          </Description>
//      <Author>      Jan Kuttich                        </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2012-09-17                         </Created>
//  </FileHeader>

using System;
using System.Collections.Specialized;
using System.Reflection;
using System.Text;

namespace Gordic.General {

    /// <summary>kolekce telefonních èísel</summary>
    [Serializable]
    public class GPhoneNumbers : StringCollection, IGObject, ICloneable {

        #region konstanty

        /// <summary>mezinárodní telefonní pøedvolba</summary>
        private const string m_csInternationalPrefix = "+420";

        /// <summary>poèet èíslic telefonních èísel (bez mezinárodní telefonní pøedvolby)</summary>
        private const int m_cnNumberOfDigits = 9;

        #endregion

        #region datové èleny

        /// <summary>mezinárodní telefonní pøedvolba</summary>
        private readonly string m_sInternationalPrefix = m_csInternationalPrefix;

        /// <summary>poèet èíslic telefonních èísel (bez mezinárodní telefonní pøedvolby)</summary>
        private readonly int m_nNumberOfDigits = m_cnNumberOfDigits;

        #endregion

        #region vlastnosti

        /// <summary>mezinárodní telefonní pøedvolba</summary>
        public string InternationalPrefix {
            get { return m_sInternationalPrefix; }
        } // end property

        /// <summary>poèet èíslic telefonního èísla (bez mezinárodní telefonní pøedvolby)</summary>
        public int NumberOfDigits {
            get { return m_nNumberOfDigits; }
        } // end property

        /// <summary>indexer pro pøístup k jednotlivým telefonním èíslùm v kolekci</summary>
        /// <param name="index">pozice telefonního èísla</param>
        /// <returns>telefonní èíslo</returns>
        public new string this[int index] {
            get {
                return base[index];
            } // end method
            set {
                value = NormalizePhoneNumber(value,InternationalPrefix,NumberOfDigits);
                base[index] = value;
            } // end method
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GPhoneNumbers).Assembly; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GPhoneNumbers() {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="internationalPrefix">mezinárodní telefonní pøedvolba</param>
        /// <param name="numberOfDigits">poèet èíslic telefonních èísel (bez mezinárodní telefonní pøedvolby)</param>
        public GPhoneNumbers(string internationalPrefix,int numberOfDigits) {
            m_sInternationalPrefix = internationalPrefix == null ? String.Empty : internationalPrefix.Trim();
            if(numberOfDigits < 1 || (numberOfDigits + m_sInternationalPrefix.Length) > 33) throw new GArgumentOutOfRangeException(23200443);
            m_nNumberOfDigits = numberOfDigits;
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>pøidání telefonního èísla do kolekce</summary>
        /// <param name="phoneNumber">telefonní èíslo</param>
        /// <returns>pozice pøidaného telefonního èísla v kolekci</returns>
        public new int Add(string phoneNumber) {
            phoneNumber = NormalizePhoneNumber(phoneNumber,InternationalPrefix,NumberOfDigits);
            return base.Add(phoneNumber);
        } // end method

        /// <summary>pøidání pole telefonních èísel do kolekce</summary>
        /// <param name="phoneNumbers">pole telefonních èísel</param>
        public new void AddRange(string[] phoneNumbers) {
            if(phoneNumbers != null && phoneNumbers.Length > 0) {
                for(int i = 0; i < phoneNumbers.Length; i++) {
                    phoneNumbers[i] = NormalizePhoneNumber(phoneNumbers[i],InternationalPrefix,NumberOfDigits);
                } // end if
            } // end if
            base.AddRange(phoneNumbers);
        } // end method

        /// <summary>vložení telefonního èísla  do kolekce na urèenou pozici</summary>
        /// <param name="index">požadovaná pozice</param>
        /// <param name="phoneNumber">telefonní èíslo</param>
        public new void Insert(int index,string phoneNumber) {
            phoneNumber = NormalizePhoneNumber(phoneNumber,InternationalPrefix,NumberOfDigits);
            base.Insert(index,phoneNumber);
        } // end method

        /// <summary>vytvoøení kopie kolekce telefonních èísel</summary>
        /// <returns>kopie kolekce telefonních èísel</returns>
        public object Clone() {
            GPhoneNumbers l_oClone = new GPhoneNumbers(InternationalPrefix,NumberOfDigits);
            for(int i = 0; i < Count; i++) l_oClone.Add(this[i]);
            return l_oClone;
        } // end method

        /// <summary>získání seznamu telefonních èísel</summary>
        /// <returns>seznam telefonních èísel</returns>
        public override string ToString() {
            return ToString(", ");
        } // end method

        /// <summary>získání seznamu telefonních èísel</summary>
        /// <param name="listSeparator">oddìlovaè záznamù v seznamu</param>
        /// <returns>seznam telefonních èísel</returns>
        public string ToString(string listSeparator) {
            if(listSeparator == null) throw new GArgumentNullException(23200445);
            if(Count > 0) {
                StringBuilder l_oPhoneNumbers = null;
                for(int i = 0; i < Count; i++) {
                    if(l_oPhoneNumbers == null) l_oPhoneNumbers = new StringBuilder();
                    else l_oPhoneNumbers.Append(listSeparator);
                    l_oPhoneNumbers.Append(this[i]);
                } // end for
                return l_oPhoneNumbers.ToString();
            } else return String.Empty;
        } // end method

        #endregion

        #region statické metody

        /// <summary>získání kolekce telefonních èísel ze vstupního øetìzce</summary>
        /// <param name="input">vstupní øetìzec</param>
        /// <param name="internationalPrefix">mezinárodní telefonní pøedvolba</param>
        /// <param name="numberOfDigits">poèet èíslic telefonních èísel (bez mezinárodní telefonní pøedvolby)</param>
        /// <returns>kolekce telefonních èísel</returns>
        public static GPhoneNumbers GetPhoneNumbers(string input,string internationalPrefix = m_csInternationalPrefix,int numberOfDigits = m_cnNumberOfDigits) {
            GPhoneNumbers l_oPhoneNumbers = new GPhoneNumbers(internationalPrefix,numberOfDigits);
            if(input != null && (input = input.Trim()) != String.Empty) {
                string l_sPhoneNumber = String.Empty;
                foreach(string l_sEntry in input.Split(new char[] { ';', ',' },StringSplitOptions.RemoveEmptyEntries)) {
                    if(IsValidPhoneNumber(l_sEntry,l_oPhoneNumbers.InternationalPrefix,l_oPhoneNumbers.NumberOfDigits)) {
                        l_sPhoneNumber = NormalizePhoneNumber(l_sEntry,l_oPhoneNumbers.InternationalPrefix,l_oPhoneNumbers.NumberOfDigits);
                        if(l_oPhoneNumbers.Contains(l_sPhoneNumber) == false) l_oPhoneNumbers.Add(l_sPhoneNumber);
                    } // end if
                } // end foreach
            } // end if
            return l_oPhoneNumbers;
        } // end method

        /// <summary>vrací pøíznak validního telefonního èísla</summary>
        /// <param name="input">vstupní hodnota</param>
        /// <param name="internationalPrefix">mezinárodní telefonní pøedvolba</param>
        /// <param name="numberOfDigits">poèet èíslic telefonních èísel (bez mezinárodní telefonní pøedvolby)</param>
        /// <returns>true v pøípadì, že vstupní hodnota je validní telefonní èíslo, jinak false</returns>
        public static bool IsValidPhoneNumber(string input,string internationalPrefix = m_csInternationalPrefix,int numberOfDigits = m_cnNumberOfDigits) {
            input = input == null ? String.Empty : input.Trim();
            internationalPrefix = internationalPrefix == null ? String.Empty : internationalPrefix.Trim();
            if(numberOfDigits < 1 || (numberOfDigits + internationalPrefix.Length) > 33) return false;
            if(input.StartsWith(internationalPrefix)) input = input.Substring(internationalPrefix.Length);
            int l_nLength = 0;
            for(int i = 0; i < input.Length; i++) {
                if(Char.IsDigit(input[i])) l_nLength++;
                else if(input[i] != ' ') return false;
            } // end if
            return l_nLength == numberOfDigits;
        } // end method

        /// <summary>vrací normalizovanou formu telefonního èísla</summary>
        /// <param name="input">telefonní èíslo</param>
        /// <param name="internationalPrefix">mezinárodní telefonní pøedvolba</param>
        /// <param name="numberOfDigits">poèet èíslic telefonních èísel (bez mezinárodní telefonní pøedvolby)</param>
        /// <returns>normalizovaná forma telefonního èísla</returns>
        public static string NormalizePhoneNumber(string input,string internationalPrefix = m_csInternationalPrefix,int numberOfDigits = m_cnNumberOfDigits) {
            if(IsValidPhoneNumber(input,internationalPrefix,numberOfDigits)) {
                string l_sPhoneNumber = String.Empty;
                for(int i = 0; i < input.Length; i++) {
                    if(input[i] != ' ') l_sPhoneNumber += input[i];
                } // end if
                return l_sPhoneNumber.Length == numberOfDigits ? internationalPrefix + l_sPhoneNumber : l_sPhoneNumber;
            } else throw new GException(23200444,ThisAssembly); // specifikováno telefonní èíslo v nesprávném formátu
        } // end method

        #endregion

    } // end class

} // end namespace

