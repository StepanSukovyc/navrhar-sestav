//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GString.cs               </Name>
//    <Description>   databázová hodnota typu øetìzec znakù   </Description>
//    <Author>        Jan Kuttich                             </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021      </Copyright>
//    <Created>       2003-08-26                              </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Reflection;
using System.Linq;
using System.Text;

namespace Gordic.General {

    /// <summary>databázová hodnota typu øetìzec znakù</summary>
    [Serializable]
    [TypeConverter( typeof(GStringConverter))]
    public class GString : GDbType {
        
        #region soukromé èleny
      
        /// <summary>maximální pøípustná délka øetìzce</summary>
        private readonly ushort m_nMaxSize;

        /// <summary>výchozí hodnota</summary>
        private string m_sDefaultValue = String.Empty;
 
        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        private static readonly GString m_cgsNull = new GString(true);

        /// <summary>pøíznak provádìní kontroly na maximální pøípustnou délku øetìzce</summary>
        private static bool? m_bCheckMaxSize = null;

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GString() : base(true) {
            m_nMaxSize = UInt16.MaxValue;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        public GString(ushort maxSize) : base(true) {
            m_nMaxSize = maxSize;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        public GString(string stringValue) : base(true) {
            ValueInstance = stringValue;
            m_nMaxSize = UInt16.MaxValue;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        public GString(string stringValue,ushort maxSize) : base(true) {
            if(CheckMaxSize && stringValue != null && maxSize != UInt16.MaxValue && stringValue.Length > maxSize) throw new GArgumentOutOfRangeException(23200116,23200116,ThisAssembly); // délka vstupního øetìzce pøesáhla požadovanou maximální velikost
            ValueInstance = stringValue;
            m_nMaxSize = maxSize;
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GString(ushort maxSize,bool isNullable) : base(isNullable) {
            m_nMaxSize = maxSize;
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GString(string stringValue,bool isNullable) : base(isNullable) {
            ValueInstance = stringValue;
            m_nMaxSize = UInt16.MaxValue;
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        public GString(string stringValue,ushort maxSize,bool isNullable) : base(isNullable) {
            if(CheckMaxSize && stringValue != null && maxSize != UInt16.MaxValue && stringValue.Length > maxSize) throw new GArgumentOutOfRangeException(23200117,23200116,ThisAssembly); // délka vstupního øetìzce pøesáhla požadovanou maximální velikost
            ValueInstance = stringValue;
            m_nMaxSize = maxSize;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GString(ushort maxSize,bool isNullable,string sourceColumn) : base(isNullable) {
            m_nMaxSize = maxSize;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GString(string stringValue,string sourceColumn) : this(stringValue,true,sourceColumn) {
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GString(string stringValue,bool isNullable,string sourceColumn) : base(isNullable) {
            ValueInstance = stringValue;
            m_nMaxSize = UInt16.MaxValue;
            SourceColumn = sourceColumn;
        } // end method
        
        /// <summary>veøejný konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        /// <param name="sourceColumn">zdrojový sloupec v databázové tabulce</param>
        public GString(string stringValue,ushort maxSize,bool isNullable,string sourceColumn) : base(isNullable) {
            if(CheckMaxSize && stringValue != null && maxSize != UInt16.MaxValue && stringValue.Length > maxSize) throw new GArgumentOutOfRangeException(23200118,23200116,ThisAssembly); // délka vstupního øetìzce pøesáhla požadovanou maximální velikost
            ValueInstance = stringValue;
            m_nMaxSize = maxSize;
            SourceColumn = sourceColumn;
        } // end method

        /// <summary>veøejný kopírovací konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public GString(GString source,GDbTypeCopyOptions copyOptions) : base(source as GDbType) {
            m_nMaxSize = source.m_nMaxSize;
            m_sDefaultValue = source.m_sDefaultValue;
        } // end method

        /// <summary>soukromý konstruktor</summary>
        /// <param name="readOnly">pøíznak hodnoty urèené pouze pro ètení</param>
        private GString(bool readOnly) : base(true) {
            m_nMaxSize = UInt16.MaxValue;
            if(readOnly) SetReadOnly();
        } // end method

        /// <summary>readonly factory konstruktor</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        public static GString ReadOnly(string stringValue, ushort maxSize = UInt16.MaxValue)
        {
            var ret = new GString(stringValue, maxSize, isNullable: false);
            ret.SetReadOnly();
            return ret;
        } // end method

        /// <summary>readonly kopírovací factory konstruktor</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="copyOptions">vhrazeno pro budoucí použití</param>
        public static GString ReadOnly(GString source, GDbTypeCopyOptions copyOptions = null)
        {
            if (source.IsReadOnly) return source;
            var ret = new GString(source, copyOptions);
            ret.SetReadOnly();
            return ret;
        } // end method
        #endregion

        #region vlastnosti

        /// <summary>hodnota typu øetìzec s ohledem na hodnotu null</summary>
        public virtual string Value {
            get {
                if(IsNull) throw new GException(23200011,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return (String) ValueInstance;
            } // end method
            set {
                if(CheckMaxSize && value != null && MaxSize != UInt16.MaxValue && value.Length > MaxSize) throw new GException(23200013,ThisAssembly); // pøekroèena povolená délka øetìzce
                ValueInstance = value;
            } // end method
        } // end property
    
        /// <summary>výchozí hodnota</summary>
        public virtual string DefaultValue {
            get {return m_sDefaultValue;}
            set {
                if(IsReadOnly) throw new GException(23200092,23200084,ThisAssembly); // hodnota je urèena pouze ke ètení
                m_sDefaultValue = (value==null) ? String.Empty : value.Trim();
            } // end method
        } // end property

        /// <summary>maximální pøípustná délka øetìzce</summary>
        public ushort MaxSize {
            get {return m_nMaxSize;}
        } // end property

        /// <summary>øetìzcová hodnota ve tvaru základního hodnotového typu</summary>
        public string BaseValue {
            get {return IsNull ? DefaultValue : ValueInstance.ToString();}
        } // end property

        /// <summary>øetìzcová hodnota ve tvaru základního hodnotového typu s oøíznutím koncových bílých znakù</summary>
        public string BaseValueTrimmed {
            get {return IsNull ? DefaultValue : ValueInstance.ToString().TrimEnd();} 
        } // end property

        /// <summary>pøíznak hodnoty null nebo prázdné hodnoty</summary>
        public bool IsNullOrEmpty {
            get {return BaseValue == String.Empty;}
        } // end property

        /// <summary>pøíznak hodnoty null nebo hodnoty obsahující pouze neviditelné znaky</summary>
        public bool IsNullOrWhiteSpace {
            get { return BaseValueTrimmed == String.Empty; }
        } // end property

        /// <summary>vrací novou instanci GStringu s oøíznutou hodnotou pùvodního, všechny ostatní vlastnosti zùstávají shodné</summary>
        public GString Trimmed {
            get	{ return Trim(); }
        } // end property

        /// <summary>instance hodnoty null urèená pouze pro ètení</summary>
        public static GString Null {
            get {return m_cgsNull;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GString).Assembly;}
        } // end property

        /// <summary>pøíznak provádìní kontroly na maximální pøípustnou délku øetìzce</summary>
        private static bool CheckMaxSize {
            [System.Security.SecuritySafeCritical]  //Assembly.GetName chce nejaka opravneni pokud nebezi ve fulltrust
            [System.Security.Permissions.FileIOPermission(System.Security.Permissions.SecurityAction.Assert, AllFiles = System.Security.Permissions.FileIOPermissionAccess.PathDiscovery)]
            get {
                if (m_bCheckMaxSize == null) m_bCheckMaxSize = ThisAssembly.GetName().Version.Major <= 482;
                return (bool) m_bCheckMaxSize;
            } // end method
        } // end property

        /// <summary>hodnota zobrazovaná v oknì debugeru</summary>
        protected override string DebuggerDisplayType => MaxSize == UInt16.MaxValue ? base.DebuggerDisplayType : $"{base.DebuggerDisplayType}({MaxSize})";
       
        /// <summary>hodnota zobrazovaná v oknì debugeru</summary>
        protected override string DebuggerDisplayValue => IsNull ? "NULL" : $"\"{ValueInstance}\"";

        #endregion

        #region veøejné metody

        /// <summary>vrací otrimovaný GString se všemi vlastnostmi pùvodního GStringu, vrácena je nová instance</summary>
        /// <returns>novì vytvoøený otrimovaný GString</returns>
        public GString Trim() {
            if (IsNull) return new GString(m_nMaxSize,IsNullable,SourceColumn);
            return new GString(BaseValueTrimmed,m_nMaxSize,IsNullable,SourceColumn);
        } // end method

        /// <summary>Vrací novou instanci GString naplnìnou vstupními údaji. Pøesáhne-li délka øetìzce deklarovanou velikost, bude na tuto délku oøíznuta.</summary>
        /// <param name="stringValue">inicializaèní øetìzec</param>
        /// <param name="maxSize">maximální délka øetìzce</param>
        /// <returns>nová instance GString naplnìná vstupními údaji</returns>
        public static GString Left(string stringValue,ushort maxSize) {
            if(stringValue == null) return new GString(maxSize);
            else return new GString((maxSize < UInt16.MaxValue && stringValue.Length > maxSize) ? stringValue.Substring(0,maxSize) : stringValue,maxSize);
        } // end method

        /// <summary>konverze pole øetìzcù na GString</summary>
        /// <param name="inputArray">pole øetìzcù ke konverzi</param>
        /// <returns>konvertované pole</returns>
        public static GString[] ConvertArray(string[] inputArray) {
            GString[] l_agsOutputArray = null;
            if(inputArray != null) {
                l_agsOutputArray = new GString[inputArray.Length];
                for(int i=0; i<inputArray.Length; i++) l_agsOutputArray[i] = new GString(inputArray[i]);
            } // end if
            return l_agsOutputArray;
        } // end method

        /// <summary>rozdìlení øetìzce na èásti</summary>
        /// <param name="separators">separátory</param>
        /// <returns>jednotlivé èásti øetìzce</returns>
        /// <remarks>provádí obdobnou èinnost jako <see cref="string.Split(char[])"/></remarks>
        public GString[] Split(params char[] separators) {
            return GString.ConvertArray(BaseValue.Split(separators));
        } // end method

        /// <summary>zakóduje výskyt znaku konce øádku v hodnotì do podoby urèené pro uložení v databázi</summary>
        /// <returns>nová instance s upravenou hodnotou</returns>
        public GString EncodeEOL() {
            if(IsNull)
                return GString.Null;
            else {
                string l_sEncodedValue = Value.Replace(Environment.NewLine,"\\n");
                l_sEncodedValue = l_sEncodedValue.Replace("\n","\\n");
                if(CheckMaxSize && MaxSize < UInt16.MaxValue && l_sEncodedValue.Length > MaxSize) return new GString(l_sEncodedValue);
                else return new GString(l_sEncodedValue,MaxSize);
            } // end if
        } // end method

        /// <summary>dekóduje konce øádkù v hodnotì z databázové podoby na klasický formát</summary>
        /// <returns>nová instance s upravenou hodnotou</returns>
        public GString DecodeEOL() {
            if(IsNull)
                return GString.Null;
            else {
                GString l_sDecodedValue = GDbType.Clone(this);
                l_sDecodedValue.Value = Value.Replace("\\n",Environment.NewLine);
                return l_sDecodedValue;
            } // end if
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        /// <remarks>porovnávání hodnot se provádí s pøedchozím oøíznutím koncových mezer</remarks>
        public bool In(params GString[] items) {
            return In(true,items);
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="trim">pøíznak porovnávání hodnot s pøedchozím oøíznutím koncových mezer</param>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(bool trim,params GString[] items) {
            if(items == null) return false;
            else if(IsNull) return items.Where(item => item.IsNull).Any();
            else if(trim) return items.Where(item => item.BaseValueTrimmed == BaseValueTrimmed).Any();
            else return items.Where(item => item.BaseValue == BaseValue).Any();
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        /// <remarks>porovnávání hodnot se provádí s pøedchozím oøíznutím koncových mezer</remarks>
        public bool In(params string[] items) {
            return In(true,items);
        } // end method

        /// <summary>zjištìní zda se hodnota nachází v pøedaném výètu hodnot</summary>
        /// <param name="trim">pøíznak porovnávání hodnot s pøedchozím oøíznutím koncových mezer</param>
        /// <param name="items">výèet hodnot</param>
        /// <returns>true v pøípadì, že se hodnota nachází v pøedaném výètu hodnot, jinak false</returns>
        public bool In(bool trim,params string[] items) {
            if(items == null || IsNull) return false;
            else if(trim) return items.Where(item => item != null && item.TrimEnd() == BaseValueTrimmed).Any();
            else return Array.IndexOf<string>(items,BaseValue) > -1;
        } // end method

        #endregion

        #region pøetížené metody

        /// <summary>získání výchozí hodnoty</summary>
        /// <returns>výchozí hodnota øetìzce</returns>
        protected override object GetDefaultValue() {
            return DefaultValue;
        } // end method

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>øetìzcová hodnota</returns>
        protected override object ConvertValue(object sourceValue) {
            String l_sValue = null;
            if(sourceValue.GetType() != typeof(String)) 
                throw new GException(23200012,21300041,ThisAssembly, typeof(String).ToString(), sourceValue.GetType().ToString() ); //RC-EX 21300041 : Pokus o nepodporovanou konverzi typù. Je požadován typ [{0}] a byl zadán typ [{1}]
            l_sValue = sourceValue.ToString();
            return CheckMaxSize && MaxSize < UInt16.MaxValue && l_sValue.Length > MaxSize ? l_sValue.Substring(0,MaxSize) : l_sValue;
        } // end method

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se øetìzce shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne,object valueTwo) {
            return String.Compare((string) valueOne,(string) valueTwo) == 0;
        } // end method

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public override object Clone() {
            return new GString(this, null) { SourceColumn = this.SourceColumn };
        } // end method

        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue) {
            GString l_gsValue = GString.Parse(inputValue,true);
            if(l_gsValue.IsNull) ValueInstance = null;
            else Value = l_gsValue.Value;
        } // end method

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue) {
            if(inputValue == null) return 1;
            GString l_gbInputValue = inputValue as GString;
            if(l_gbInputValue == null) throw new GArgumentException(23200422);
            if(this == l_gbInputValue) return 0;
            else return this < l_gbInputValue ? -1 : 1;
        } // end method

        #endregion

        #region pøetížené operátory

        /// <summary>vrací kontrolní souèet instance objektu</summary>
        /// <returns>kontrolní souèet instance objektu</returns>
        public override int GetHashCode() {
            return BaseValue.GetHashCode();
        } // end method

        /// <summary>porovnání hodnoty s jiným objektem</summary>
        /// <param name="inputObject">instance pro porovnání</param>
        /// <returns>true pokud jsou objekty stejného typu a jejich hodnoty jsou shodné, jinak false</returns>
        public override bool Equals(object inputObject) {
            if(inputObject != null) {
                if(inputObject is GString) return (GString) inputObject == this;
                else if(inputObject is string) return this.IsNull == false && (string) inputObject == this.Value;
            } // end if
            return false;
        } // end method

        /// <summary>operátor porovnání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì shody hodnot, jinak false</returns>
        public static bool operator ==(GString a, GString b) {
            if((object)a == null) {
                if((object)b == null) return true;
                else return false;
            } else if((object)b == null) return false;
            if(a.IsNull) {
                if(b.IsNull) return true;
                else return false;
            } else if(b.IsNull) return false;
            return a.Value == b.Value;
        } // end method

        /// <summary>operátor nerovnosti</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì neshody hodnot, jinak false</returns>
        public static bool operator !=(GString a, GString b) {
            return (a == b) == false;
        } // end method

        /// <summary>operátor sèítání</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>souèet</returns>
        public static GString operator +(GString a, GString b) {
            return new GString(a.BaseValue + b.BaseValue);
        } // end method

        /// <summary>implicitní konverze na string</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu string</returns>
        public static implicit operator string(GString a) {
            return a?.BaseValue;
        } // end method

        /// <summary>implicitní konverze na GString ze string</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GString</returns>
        public static implicit operator GString(string a) {
            return new GString(a);
        } // end method

        /// <summary>implicitní konverze na GString ze StringBuilder</summary>
        /// <param name="a">konvertovaná hodnota</param>
        /// <returns>hodnota typu GString</returns>
        public static implicit operator GString(StringBuilder a)
        {
            return new GString(a.ToString());
        } // end method

        /// <summary>operátor vìtší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší než hodnota pravého, jinak false</returns>
        public static bool operator >(GString a,GString b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200345);
                if(a.IsNull || b.IsNull) throw new GException(23200346,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return String.Compare(a.Value.TrimEnd(),b.Value.TrimEnd()) > 0;
            } // end if
        } // end method

        /// <summary>operátor menší než</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší než hodnota pravého, jinak false</returns>
        public static bool operator <(GString a,GString b) {
            if(a == b) return false;
            else {
                if((object)a == null || (object)b == null) throw new GArgumentNullException(23200347);
                if(a.IsNull || b.IsNull) throw new GException(23200348,23200003,ThisAssembly); // pokus o pøístup k hodnotì null
                return String.Compare(a.Value.TrimEnd(),b.Value.TrimEnd()) < 0;
            } // end if
        } // end method

        /// <summary>operátor vìtší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je vìtší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator >=(GString a,GString b) {
            if(a == b) return true;
            else return a > b;
        } // end method

        /// <summary>operátor menší nebo rovno</summary>
        /// <param name="a">levý operand</param>
        /// <param name="b">pravý operand</param>
        /// <returns>vrací true v pøípadì, že hodnota levého operandu je menší nebo rovná hodnotì pravého, jinak false</returns>
        public static bool operator <=(GString a,GString b) {
            if(a == b) return true;
            else return a < b;
        } // end method

        #endregion

        #region statická metoda Parse

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GString Parse(object inputValue) {
            return Parse(inputValue,false);
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null, nepromítá se do hodnoty vlastnosti IsNullable</param>
        /// <returns>výstupní hodnota</returns>
        public static GString Parse(object inputValue,bool acceptNull) {
            GString l_gsString = null;
            if(inputValue == null) {
                if(acceptNull) l_gsString = new GString(0);
                else throw new GArgumentNullException(23200081); // neinicializovaná hodnota parametru
            } else {
                if(inputValue == DBNull.Value || (inputValue is IGDbType && ((IGDbType) inputValue).IsNull)) l_gsString = new GString(0);
                else l_gsString = new GString(inputValue.ToString());
            } // end if
            return l_gsString;
        } // end method

        /// <summary>obecná typová konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="maxSize">maximální pøípustná délka øetìzce</param>
        /// <param name="acceptNull">pøíznak pøípustnosti hodnoty null, nepromítá se do hodnoty vlastnosti IsNullable</param>
        /// <returns>výstupní hodnota</returns>
        public static GString Parse(object inputValue,ushort maxSize,bool acceptNull) {
            GString l_gsString = null;
            if(inputValue == null) {
                if(acceptNull) l_gsString = new GString(maxSize);
                else throw new GArgumentNullException(23200119); // neinicializovaná hodnota parametru
            } else {
                if(inputValue == DBNull.Value || (inputValue is IGDbType && ((IGDbType) inputValue).IsNull)) l_gsString = new GString(maxSize);
                else l_gsString = new GString(inputValue.ToString(),maxSize);
            } // end if
            return l_gsString;
        } // end method

        #endregion

        #region pøetížená metoda ToString

        /// <summary>pøevod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString() {
            return BaseValue.ToString();
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(IFormatProvider formatProvider) {
            return BaseValue.ToString(formatProvider);
        } // end method

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString(bool involveNull) {
            return (involveNull && IsNull) ? NullString : BaseValue.ToString();
        } // end method

        #endregion

        #region veøejné statické metody

        /// <summary>vrací instanci s vìtší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s vìtší hodnotou</returns>
        public static GString Max(GString first,GString second) {
            return (first > second) ? first : second;
        } // end method

        /// <summary>vrací instanci s menší hodnotou</summary>
        /// <param name="first">první instance</param>
        /// <param name="second">druhá instance</param>
        /// <returns>instance s menší hodnotou</returns>
        public static GString Min(GString first,GString second) {
            return (first < second) ? first : second;
        } // end method

        #endregion

    } // end class

} // end namespace
