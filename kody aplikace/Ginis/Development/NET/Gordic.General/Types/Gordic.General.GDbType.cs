//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGType.cs                           </Name>
//    <Description> základních tøída pro databázové typy systému Ginis </Description>
//    <Author>      Jan Kuttich                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021              </Copyright>
//    <Created>     2003-08-30                                         </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;

namespace Gordic.General {

    /// <summary>základních tøída pro databázové typy systému Ginis</summary>
    [Serializable]
    [System.Diagnostics.DebuggerDisplay("{DebuggerDisplay,nq}")]
    [System.Diagnostics.DebuggerTypeProxy(typeof(GDbType.GDbTypeDebugView))]
    public abstract class GDbType : IGDbType
    {

        internal class GDbTypeDebugView
        {
            [System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)] protected GDbType _target;
            public GDbTypeDebugView(GDbType t) => this._target = t;

            public object Value => _target.ValueInstance;
            public ValueState State => _target.State;
            public bool IsReadOnly => _target.IsReadOnly;
            public bool IsNullable => _target.IsNullable;
            public string SourceColumn => _target.SourceColumn;
            public object DefaultValue => _target.GetDefaultValue();
        }

        #region výètové typy

        /// <summary>stav hodnoty</summary>
        public enum ValueState
        {
            /// <summary>hodnota nebyla inicializována</summary>
            Uninitialized,
            /// <summary>hodnota je inicializována a nebyla zmìnìna</summary>
            Unchanged,
            /// <summary>hodnota je inicializována a byla zmìnìna</summary>
            Modified
        } // end enum
        #endregion

        #region soukromé èleny

        /// <summary>hodnota daného typu</summary>
        private object m_oValue = null;

        /// <summary>zdrojový sloupec v databázové tabulce</summary>
        private string m_sSourceColumn = null;

        /// <summary>pøíznak povolení hodnoty null</summary>
        private readonly bool m_bIsNullable;

        /// <summary>pøíznak hodnoty urèené pouze pro ètení</summary>
        private bool m_bIsReadOnly = false;

        /// <summary>stav hodnoty</summary>
        private ValueState m_eState = ValueState.Uninitialized;

        #endregion

        #region vlastnosti

        /// <summary>instance objektu pro interní uložení hodnoty daného typu</summary>
        protected internal object ValueInstance
        {
            get
            {
                if (State == ValueState.Uninitialized && IsNullable == false) throw new GException(23200018, ThisAssembly); // pokus o pøístup k neinicializované hodnotì
                return m_oValue;
            } // end method
            set
            {
                if (m_bIsReadOnly) throw new GException(23200084, ThisAssembly); // hodnota je urèena pouze ke ètení
                if (value == null && IsNullable == false) throw new GException(23200017, ThisAssembly); // nelze použít hodnotu null
                if (m_eState == ValueState.Uninitialized) m_eState = ValueState.Unchanged;
                else if (m_eState == ValueState.Unchanged)
                {
                    if ((value == null || m_oValue == null))
                    {
                        if (value != null || m_oValue != null) m_eState = ValueState.Modified;
                    }
                    else
                    {
                        if (!CompareValues(m_oValue, value)) m_eState = ValueState.Modified;
                    } // end if
                } // end if
                m_oValue = value;
            } // end method
        } // end property

        /// <summary>pøíznak hodnoty null</summary>
        public bool IsNull
        {
            get { return ValueInstance == null; }
            set { ValueInstance = value ? null : GetDefaultValue(); }
        } // end property

        /// <summary>databázová hodnota</summary>
        public object DbValue
        {
            get
            {
                if (IsNull) return DBNull.Value;
                else if (m_oValue is DateTimeOffset) return ((DateTimeOffset)m_oValue).DateTime;
                else return m_oValue;
            } // end method
            set
            {
                if (value == null || value.GetType() == typeof(DBNull)) ValueInstance = null;
                else ValueInstance = ConvertValue(value);
            } // end method
        } // end property

        /// <summary>pøíznak povolení hodnoty null</summary>
        public bool IsNullable
        {
            get { return m_bIsNullable; }
        } // end property

        /// <summary>pøíznak hodnoty urèené pouze pro ètení</summary>
        public bool IsReadOnly
        {
            get { return m_bIsReadOnly; }
        } // end property

        /// <summary>stav hodnoty</summary>
        public ValueState State
        {
            get { return m_eState; }
            set
            {
                if (m_bIsReadOnly) throw new GException(23200087, 23200084, ThisAssembly); // hodnota je urèena pouze ke ètení
                m_eState = value;
            } // end method
        } // end property

        /// <summary>zdrojový sloupec v databázové tabulce</summary>
        public string SourceColumn
        {
            get { return m_sSourceColumn == null ? String.Empty : m_sSourceColumn; }
            set
            {
                // ?? pro volání storovaných procedur je nutné i u ReadOnly G typù mít možnost pøenastavit jméno SourceColumn
                if (m_bIsReadOnly) 
                    throw new GException(23200086, 23200084, ThisAssembly); // hodnota je urèena pouze ke ètení
                if (value == null) 
                    m_sSourceColumn = null;
                else 
                    m_sSourceColumn = value.Trim();
            } // end method
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly
        {
            get { return typeof(GDbType).Assembly; }
        } // end property

        /// <summary>øetìzcové vyjádøení databázové hodnoty null</summary>
        protected internal static string NullString
        {
            get { return "null"; }
        } // end property

        /// <summary>øetìzcové vyjádøení prázdného øetìzce</summary>
        protected internal static string EmptyString
        {
            get { return "''"; }
        } // end property

        /// <summary>hodnota zobrazovaná v oknì debugeru</summary>
        private string DebuggerDisplay => $"{DebuggerDisplayType}:{DebuggerDisplayValue}";
        /// <summary>hodnota zobrazovaná v oknì debugeru</summary>
        protected virtual string DebuggerDisplayType => this.GetType().Name;
        /// <summary>hodnota zobrazovaná v oknì debugeru</summary>
        protected virtual string DebuggerDisplayValue => IsNull ? "NULL" : this.ToString(System.Globalization.CultureInfo.InvariantCulture);

        #endregion

        #region konstruktory

        /// <summary>chránìný konstruktor</summary>
        /// <param name="isNullable">pøíznak povolení hodnoty null</param>
        protected GDbType(bool isNullable)
        {
            m_bIsNullable = isNullable;
        } // end method

        /// <summary>chránìný konstruktor</summary>
        /// <param name="dbType">zdrojová instance databázového typu</param>
        protected GDbType(GDbType dbType)
        {
            m_oValue = dbType.m_oValue;
            m_bIsNullable = dbType.m_bIsNullable;
            m_sSourceColumn = dbType.m_sSourceColumn;
            m_eState = dbType.m_eState;
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>akceptace zmìny hodnoty, tj. hodnota bude nadále ve stavu nezmìnìna</summary>
        public void AcceptChanges()
        {
            if (m_eState != ValueState.Uninitialized) m_eState = ValueState.Unchanged;
        } // end method

        /// <summary>nastavení pøíznaku hodnoty urèené pouze pro ètení</summary>
        public void SetReadOnly()
        {
            m_eState = ValueState.Unchanged;
            m_bIsReadOnly = true;
        } // end method

        #endregion

        #region veøejné statické metody

        /// <summary>vytvoøení klonu objektu</summary>
        /// <typeparam name="TType">typ klonovaného objektu</typeparam>
        /// <param name="original">instance klonovaného objektu</param>
        /// <returns>klon objektu</returns>
        public static TType Clone<TType>(TType original) where TType : IGDbType
        {
            return (TType)(original.Clone());
        } // end method

        /// <summary>pøiøazení hodnoty do spoleèného databázového typu</summary>
        /// <typeparam name="TType">spoleèný databázový typ</typeparam>
        /// <param name="destination">cílová instance, které má být hodnota nastavena</param>
        /// <param name="source">zdrojová instance, jejíž hodnota je použita</param>
        public static void CopyValue<TType>(TType destination, TType source) where TType : IGDbType
        {
            if (destination == null) throw new GArgumentNullException(23200303);
            if (source == null || source.IsNull) destination.IsNull = true;
            else destination.DbValue = source.DbValue;
        } // end method

        /// <summary>spojí dvì pole hodnot spoleèných databázových typù do jednoho</summary>
        /// <param name="firstArray">první pole hodnot</param>
        /// <param name="secondArray">druhé pole hodnot</param>
        /// <returns>výsledné pole, ve kterém jsou nejdøíve hodnoty z prvního pole a pak hodnoty z druhého pole</returns>
        public static IGDbType[] JoinArrays(IGDbType[] firstArray, IGDbType[] secondArray)
        {
            if (firstArray == null) throw new GArgumentNullException(23200304);
            if (secondArray == null) throw new GArgumentNullException(23200305);
            IGDbType[] l_oResultArray = new IGDbType[firstArray.Length + secondArray.Length];
            Array.Copy(firstArray, 0, l_oResultArray, 0, firstArray.Length);
            Array.Copy(secondArray, 0, l_oResultArray, firstArray.Length, secondArray.Length);
            return l_oResultArray;
        } // end method

        /// <summary>spojí dvì pole hodnot spoleèných databázových typù do jednoho</summary>
        /// <param name="firstArray">první pole hodnot</param>
        /// <param name="secondArray">druhé pole hodnot</param>
        /// <returns>výsledné pole, ve kterém jsou nejdøíve hodnoty z prvního pole a pak hodnoty z druhého pole. nebo null</returns>
        public static IGDbType[] JoinArraysOrNulls(IGDbType[] firstArray, IGDbType[] secondArray)
        {
            if (firstArray == null) return secondArray;
            if (secondArray == null) return firstArray;
            IGDbType[] l_oResultArray = new IGDbType[firstArray.Length + secondArray.Length];
            Array.Copy(firstArray, 0, l_oResultArray, 0, firstArray.Length);
            Array.Copy(secondArray, 0, l_oResultArray, firstArray.Length, secondArray.Length);
            return l_oResultArray;
        } // end method

        /// <summary>získání konstantní hodnoty null pro daný databázový typ</summary>
        /// <typeparam name="TType">databázový typ</typeparam>
        /// <returns>konstantní hodnota null daného databázového typu</returns>
        public static TType GetNull<TType>() where TType : IGDbType
        {
            return (TType)(IGDbType)GetNull(typeof(TType));
        } // end method

        /// <summary>získání konstantní hodnoty null pro daný databázový typ</summary>
        /// <param name="t">databázový typ</param>
        /// <returns>konstantní hodnota null daného databázového typu</returns>
        public static GDbType GetNull(Type t)
        {
            if (t == typeof(GString)) return GString.Null;
            if (t == typeof(GInt16)) return GInt16.Null;
            if (t == typeof(GInt32)) return GInt32.Null;
            if (t == typeof(GBoolean)) return GBoolean.Null;
            if (t == typeof(GDate)) return GDate.Null;
            if (t == typeof(GDateTime)) return GDateTime.Null;
            if (t == typeof(GDecimal)) return GDecimal.Null;
            if (t == typeof(GEkoDate)) return GEkoDate.Null;
            if (t == typeof(GBlob)) return GBlob.Null;
            if (t == typeof(GTable)) return GTable.Null;
            if (t == typeof(GInt64)) return GInt64.Null;
            if (t == typeof(GIkc)) return GIkc.Null;
            if (t == typeof(GRawString)) return GRawString.Null;
            if (typeof(GEnum).IsAssignableFrom(t)) return GEnum.GetNull(t);
            throw new GNotImplementedException(23200307);
        } // end method    

        /// <summary>obecná typová konverze na požadovaný databázový typ</summary>
        /// <typeparam name="TType">databázový typ</typeparam>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static TType Parse<TType>(object inputValue) where TType : IGDbType
        {
            return (TType)(IGDbType)Parse(typeof(TType), inputValue);
        } // end method

        /// <summary>obecná typová konverze na požadovaný databázový typ</summary>
        /// <param name="t">databázový typ</param>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>výstupní hodnota</returns>
        public static GDbType Parse(Type t, object inputValue)
        {
            if (t == typeof(GString)) return GString.Parse(inputValue);
            if (t == typeof(GInt16)) return GInt16.Parse(inputValue);
            if (t == typeof(GInt32)) return GInt32.Parse(inputValue);
            if (t == typeof(GBoolean)) return GBoolean.Parse(inputValue);
            if (t == typeof(GDate)) return GDate.Parse(inputValue);
            if (t == typeof(GDateTime)) return GDateTime.Parse(inputValue);
            if (t == typeof(GDecimal)) return GDecimal.Parse(inputValue);
            if (t == typeof(GEkoDate)) return GEkoDate.Parse(inputValue);
            if (t == typeof(GBlob)) return GBlob.Parse(inputValue);
            if (t == typeof(GTable)) return GTable.Parse(inputValue);
            if (t == typeof(GInt64)) return GInt64.Parse(inputValue);
            if (t == typeof(GIkc)) return GIkc.Parse(inputValue);
            if (t == typeof(GRawString)) return GRawString.Parse(inputValue);
            if (typeof(GEnum).IsAssignableFrom(t)) return GEnum.Parse(t, inputValue, acceptNull: false);
            throw new GNotImplementedException(23200308);
        }

        /// <summary>obecná typová konverze na požadovaný databázový typ</summary>
        /// <typeparam name="TType">databázový typ</typeparam>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static TType Parse<TType>(string inputValue, IFormatProvider formatProvider) where TType : IGDbType
        {
            return (TType)(IGDbType)Parse(typeof(TType), inputValue, formatProvider);
        } // end method

        /// <summary>obecná typová konverze na požadovaný databázový typ</summary>
        /// <param name="t">databázový typ</param>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="formatProvider">hodnota typu <see cref="IFormatProvider"/> s informacemi o formátu vstupní hodnoty</param>
        /// <returns>výstupní hodnota</returns>
        public static GDbType Parse(Type t, string inputValue, IFormatProvider formatProvider)
        {
            if (t == typeof(GString)) return GString.Parse(inputValue);
            if (t == typeof(GInt16)) return GInt16.Parse(inputValue, formatProvider);
            if (t == typeof(GInt32)) return GInt32.Parse(inputValue, formatProvider);
            if (t == typeof(GBoolean)) return GBoolean.Parse(inputValue);
            if (t == typeof(GDate)) return GDate.Parse(inputValue, formatProvider);
            if (t == typeof(GDateTime)) return GDateTime.Parse(inputValue, formatProvider);
            if (t == typeof(GDecimal)) return GDecimal.Parse(inputValue, formatProvider);
            if (t == typeof(GEkoDate)) return GEkoDate.Parse(inputValue);
            if (t == typeof(GBlob)) return GBlob.Parse(inputValue);
            if (t == typeof(GTable)) return GTable.Parse(inputValue);
            if (t == typeof(GInt64)) return GInt64.Parse(inputValue, formatProvider);
            if (t == typeof(GIkc)) return GIkc.Parse(inputValue, formatProvider);
            if (t == typeof(GRawString)) return GRawString.Parse(inputValue);
            if (typeof(GEnum).IsAssignableFrom(t)) return GEnum.Parse(t, inputValue, acceptNull: false);
            throw new GNotImplementedException(21000024);
        }

        /// <summary>získání základního typu hodnoty pro daný databázový typ</summary>
        /// <typeparam name="TType">databázový typ</typeparam>
        /// <returns>základní typ daného databázového typu</returns>
        public static Type GetBaseType<TType>() where TType : IGDbType
        {
            return GetBaseType(typeof(TType));
        } // end method

        /// <summary>získání základního typu hodnoty pro daný databázový typ</summary>
        /// <param name="t">databázový typ</param>
        /// <returns>základní typ daného databázového typu</returns>
        public static Type GetBaseType(Type t)
        {
            if (t == typeof(GString)) return typeof(string);
            if (t == typeof(GInt16)) return typeof(short);
            if (t == typeof(GInt32)) return typeof(int);
            if (t == typeof(GBoolean)) return typeof(bool);
            if (t == typeof(GDate)) return typeof(DateTime);
            if (t == typeof(GDateTime)) return typeof(DateTime);
            if (t == typeof(GDecimal)) return typeof(decimal);
            if (t == typeof(GEkoDate)) return typeof(string);
            if (t == typeof(GBlob)) return typeof(byte[]);
            if (t == typeof(GTable)) return typeof(DataTable);
            if (t == typeof(GInt64)) return typeof(long);
            if (t == typeof(GIkc)) return typeof(long);
            if (t == typeof(GRawString)) return typeof(string);
            if (typeof(GEnum).IsAssignableFrom(t)) return GEnum.GetBaseType(t);
            throw new GNotImplementedException(23200453);
        }

        /// <summary>
        /// Pøevod TYPE na interní G a to urèením jeho GDbTypeEnum
        /// </summary>
        /// <param name="t">Pøevádìný TYPE</param>
        /// <returns>Pokud to není známy G-typ, vyhodí výjimku</returns>
        public static GDbTypeEnum GetGDbTypeEnumFromType(Type t)
        {
            var r = GetGDbTypeEnumFromTypeAnyIfUnknown(t);
            if (r == GDbTypeEnum.ANY) throw new GNotImplementedException(21300055);
            return r;
        }
        /// <summary>
        /// Pøevod TYPE na interní G a to urèením jeho GDbTypeEnum
        /// </summary>
        /// <param name="t">Pøevádìný TYPE</param>
        /// <returns>Pokud to není známy G-typ, vrací ANY</returns>
        public static GDbTypeEnum GetGDbTypeEnumFromTypeAnyIfUnknown(Type t)
        {
            if (t == typeof(bool)) return GDbTypeEnum.GBoolean;
            if (t == typeof(DateTime) || t == typeof(DateTimeOffset)) return GDbTypeEnum.GDateTime;
            if (t == typeof(decimal)) return GDbTypeEnum.GDecimal;
            if (t == typeof(short)) return GDbTypeEnum.GInt16;
            if (t == typeof(int)) return GDbTypeEnum.GInt32;
            if (t == typeof(long)) return GDbTypeEnum.GInt64;
            if (t == typeof(string)) return GDbTypeEnum.GString;
            if (t == typeof(byte[])) return GDbTypeEnum.GBlob;
            if (t == typeof(DataTable)) return GDbTypeEnum.GTable;

            if (t == typeof(bool?)) return GDbTypeEnum.GBoolean;
            if (t == typeof(DateTime?) || t == typeof(DateTimeOffset?)) return GDbTypeEnum.GDateTime;
            if (t == typeof(decimal?)) return GDbTypeEnum.GDecimal;
            if (t == typeof(short?)) return GDbTypeEnum.GInt16;
            if (t == typeof(int?)) return GDbTypeEnum.GInt32;
            if (t == typeof(long?)) return GDbTypeEnum.GInt64;

            if (t == typeof(GString)) return GDbTypeEnum.GString;
            if (t == typeof(GInt16)) return GDbTypeEnum.GInt16;
            if (t == typeof(GInt32)) return GDbTypeEnum.GInt32;
            if (t == typeof(GBoolean)) return GDbTypeEnum.GBoolean;
            if (t == typeof(GDate)) return GDbTypeEnum.GDate;
            if (t == typeof(GDateTime)) return GDbTypeEnum.GDateTime;
            if (t == typeof(GDecimal)) return GDbTypeEnum.GDecimal;
            if (t == typeof(GEkoDate)) return GDbTypeEnum.GEkoDate;
            if (t == typeof(GBlob)) return GDbTypeEnum.GBlob;
            if (t == typeof(GTable)) return GDbTypeEnum.GTable;
            if (t == typeof(GInt64)) return GDbTypeEnum.GInt64;
            if (t == typeof(GIkc)) return GDbTypeEnum.GInt64;
            if (t == typeof(GRawString)) return GDbTypeEnum.GString;
            if (typeof(GEnum).IsAssignableFrom(t)) return GetGDbTypeEnumFromTypeAnyIfUnknown(GEnum.GetBaseType(t));
            return GDbTypeEnum.ANY;
        }
        #endregion

        #region abstraktní metody

        /// <summary>získání výchozí hodnoty pro daný typ</summary>
        /// <returns>výchozí hodnota pro daný typ</returns>
        protected abstract object GetDefaultValue();

        /// <summary>konverze hodnoty pro daný typ</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota odpovídající danému typu</returns>
        protected abstract object ConvertValue(object sourceValue);

        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty daného typu shodují, jinak false</returns>
        protected abstract bool CompareValues(object valueOne, object valueTwo);

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="provider">hodnota typu <see cref="IFormatProvider"/> s informacemi o požadovaném formátu</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public abstract string ToString(IFormatProvider provider);

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        public abstract string ToString(bool involveNull);

        /// <summary>vytvoøení identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>pøíznak hodnoty urèené pouze ke ètení je u novì vzniklé instance vždy negativní</remarks>
        public abstract object Clone();

        /// <summary>nastavení databázové hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public abstract void ParseValue(object inputValue);

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci tøídìní pøed vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota vìtší než nula pokud je za vstupní hodnotou</returns>
        public abstract int CompareTo(object inputValue);

        #endregion

    } // end class

    /// <summary>volby pro kopírovací konstruktory databázových typù</summary>
    /// <remarks>vhrazeno pro budoucí použití</remarks>
    public class GDbTypeCopyOptions : IGObject {
    } // end class

} // end namespace
