//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEnum.cs                                     </Name>
//    <Description> Gordic varianta Enum                                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-02-06                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{

    //public interface IGEnum
    //{
    //    object DbValue { get; set; }
    //    //object Parse(int value);
    //    Type KeyType { get; }

        ///// <summary>Jméno klíčové vlastnosti z Meta</summary>
        //string ValueIdName { get; }
        ///// <summary>Hodnota klíčové vlastnosti z Meta</summary>
        //IGDbType ValueId { get; }
        ///// <summary>Hodnota txt vlastnosti z Meta</summary>
        //GString ValueTxt { get; }
        ///// <summary>Hodnota k_xml vlastnosti z Meta</summary>
        //GString ValueXml { get; }

    //}

    /// <summary>
    /// Gordic varianta Enum - abstraktní předek
    /// </summary>
    public abstract class GEnum : GDbType, /*IGEnum,*/ ICloneable, IComparable, IComparable<GEnum>
    {

        /// <summary>Gordic varianta Enum</summary>
        public GEnum() : base(true)
        {
        }

        /// <summary>GTyp klíče (obvykle GInt16)</summary>
        public abstract Type KeyType { get; }

        /// <summary>hodnota základního typu bez ohledu na hodnotu null</summary>
        public object BaseValue => IsNull ? GetDefaultValue() : ValueInstance;

        /// <summary>výchozí hodnota pro neinicializovaný typ (default NULL)</summary>
        protected override object GetDefaultValue() => DBNull.Value;

        /// <summary>vrací kontrolní součet instance objektu</summary>
        public override int GetHashCode()
        {
            return BaseValue.GetHashCode();
        }

        /// <summary>porovnání hodnoty s jiným objektem</summary>
        public override bool Equals(object inputObject)
        {
            if (object.ReferenceEquals(inputObject, this)) return true; //instance stejná
            return inputObject != null && (this == (inputObject as GEnum));
        }

        /// <summary>operátor porovnání</summary>
        public static bool operator ==(GEnum a, GEnum b)
        {
            if ((object)a == null) return (object)b == null;
            if ((object)b == null) return false;

            if (a.IsNull) return b.IsNull;
            if (b.IsNull) return false;

            return a.ValueInstance.Equals(b.ValueInstance); //nutno přes Equals (jsou to object, i když obvykle boxed Int16)
        }
        /// <summary>operátor nerovnosti</summary>
        public static bool operator !=(GEnum a, GEnum b)
        {
            return (a == b) == false;
        }

        int IComparable.CompareTo(object obj)
        {
            return CompareTo(obj as GEnum);
        }

        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        public int CompareTo(GEnum other)
        {
            return (DbValue as IComparable).CompareTo(other?.DbValue);
        }
        /// <summary>porovnání dvou hodnot s ohledem na typ</summary>
        /// <param name="valueOne">první hodnota</param>
        /// <param name="valueTwo">druhá hodnota</param>
        /// <returns>true pokud se hodnoty shodují, jinak false</returns>
        protected override bool CompareValues(object valueOne, object valueTwo)
        {
            return valueOne.Equals(valueTwo);
        }
        /// <summary>porovnání hodnoty se vstupní hodnotou stejného typu</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <returns>hodnota menší než nula pokud aktuální hodnota je v rámci třídění před vstupní hodnotou, hodnota nula pokud je na stejné pozici nebo hodnota větší než nula pokud je za vstupní hodnotou</returns>
        public override int CompareTo(object inputValue)
        {
            if (inputValue == null) return 1;
            var l_gbInputValue = inputValue as GEnum;
            if (l_gbInputValue == null) throw new GArgumentException(21000058);
            if (this == l_gbInputValue) return 0;
            else return CompareTo(l_gbInputValue);
        }

        /// <summary>konverze vstupní hodnoty</summary>
        /// <param name="sourceValue">vstupní hodnota</param>
        /// <returns>hodnota typu celé 16 bitové číslo</returns>
        protected override object ConvertValue(object sourceValue)
        {
            return ConvertValue(GetType(), sourceValue);
        }
        private static object ConvertValue(Type enumType, object sourceValue)
        {
            if (sourceValue == DBNull.Value) return sourceValue;
            if (sourceValue is IGDbType d) sourceValue = d.DbValue;
            try
            {
                return Convert.ChangeType(sourceValue, GetValueDict(enumType).First().Key.GetType());
            }
            catch
            {
                return sourceValue;
            }
        }


        /// <summary>převod hodnoty na text</summary>
        public override string ToString()
        {
            return DbValue.ToString();
        }

        /// <summary>obecná typová konverze</summary>
        public static GEnum Parse(Type enumType, object inputValue, bool acceptNull = false, bool allowNewValues = true)
        {
            if (inputValue == null || (acceptNull && inputValue is string && inputValue.ToString().Trim() == String.Empty))
            {
                if (acceptNull) inputValue = DBNull.Value;
                else throw new GArgumentNullException(21000055);
            }
            var value = ConvertValue(enumType, inputValue);
            return FindByValue(enumType, value) 
                ?? (allowNewValues 
                        ? CreateNewDbValue(enumType, value)
                        : throw new GArgumentOutOfRangeException(21000107, 21090085, inputValue, enumType) //RC-EX 21090085 : Hodnota {0} výčtu {1} není přípustná.
                   );
        }

        /// <summary>vytvoření identické kopie objektu</summary>
        public override object Clone()
        {
            return CreateNewDbValue(this.GetType(), DbValue);
        }

        //protected static GEnum CreateNew(Type enumType, IGDbType value)
        //{
        //    var e = (GEnum)Activator.CreateInstance(enumType);
        //    e.DbValue = value.DbValue;
        //    return e;
        //}
        internal static GEnum CreateNewDbValue(Type enumType, object value)
        {
            var e = (GEnum)Activator.CreateInstance(enumType);
            e.DbValue = value;
            return e;
        }
        /// <summary>nalezení NULL hodnoty daného GEnum typu</summary>
        public static new GEnum GetNull(Type enumType) => Parse(enumType, null, acceptNull: true);
        /// <summary>základní typ klíče (obvykle short) daného GEnum typu</summary>
        public static new Type GetBaseType(Type enumType) => GDbType.GetBaseType(GetNull(enumType).KeyType);
        /// <summary>G-Typ klíče (obvykle GInt16) daného GEnum typu</summary>
        public static Type GetKeyType(Type enumType) => GetNull(enumType).KeyType;

        /// <summary>nalezení hodnoty daného GEnum typu dle základní hodnoty (obvykle dle short)</summary>
        public static GEnum FindByValue(Type enumType, object value)
        {
            if (value == null) return null;
            if (GetValueDict(enumType).TryGetValue(value, out var e)) return e;
            return null;
        }

        //public static string[] GetNames(Type enumType);
        /// <summary>seznam všech hodnot daného GEnum typu (mimo NULL)</summary>
        public static IEnumerable<GEnum> GetValues(Type enumType)
        {
            return GetValueDict(enumType).Values.Where(e => e.IsNull == false);
        }

        #region Budovani slovniku - reflection s cache

        private static ConcurrentDictionary<Type, Dictionary<object, GEnum>> m_sCache = new ConcurrentDictionary<Type, Dictionary<object, GEnum>>();
        /// <summary>seznam všech hodnot daného GEnum typu (včetně NULL)</summary>
        protected static Dictionary<object, GEnum> GetValueDict(Type enumType)
        {
            //Dictionary<object, GEnum> l_enums;
            //if (m_sCache.TryGetValue(enumType, out l_enums) == false) m_sCache[enumType] = l_enums = BuildValueDict(enumType);
            //return l_enums;
            return m_sCache.GetOrAdd(enumType, e => BuildValueDict(e));
        }

        private static Dictionary<object, GEnum> BuildValueDict(Type enumType)
        {
            var l_enums = new Dictionary<object, GEnum>();
            foreach (var f in enumType.GetFields(BindingFlags.Static | BindingFlags.Public | BindingFlags.FlattenHierarchy))
            {
                if (f.GetValue(null) is GEnum e)
                    l_enums.Add(e.DbValue, e);
            }
            return l_enums;
        }

        #endregion
        #region Meta
        /// <summary>Jméno klíčové vlastnosti z Meta</summary>
        public abstract string ValueIdName { get; }
        /// <summary>Hodnota klíčové vlastnosti z Meta</summary>
        public abstract IGDbType ValueId { get; }
        /// <summary>Hodnota txt vlastnosti z Meta</summary>
        public abstract GString ValueTxt { get; }
        /// <summary>Hodnota k_xml vlastnosti z Meta</summary>
        public abstract GString ValueXml { get; }
        #endregion
    }

    /// <summary>
    /// Gordic varianta Enum - generický předek
    /// </summary>
    /// <typeparam name="D">Typ potomka</typeparam>
    /// <typeparam name="Key">GTyp klíče</typeparam>
    /// <typeparam name="E">Typ Enum</typeparam>
    [System.Diagnostics.DebuggerTypeProxy(typeof(GEnum<,,>.GEnumDebugView))]
    public abstract class GEnum<D, Key, E> : GEnum //, IGDbType
        where D : GEnum<D, Key, E>, new()
        where Key : class, IGDbType
        where E : struct, Enum
    {
        internal class GEnumDebugView : GDbTypeDebugView
        {
            public GEnumDebugView(GEnum<D, Key, E> t) : base(t) { }
            public object Meta => ((GEnum<D, Key, E>)_target).GetMeta();
        }

        /// <summary>writable enum bez hodnoty</summary>
        protected GEnum()
        {
        }
        /// <summary>readonly enum dane hodnote</summary>
        protected GEnum(Key k)
        {
            KeyValue = k;
            SetReadOnly();
        }
        /// <summary>hodnota zobrazovaná v okně debugeru</summary>
        protected override string DebuggerDisplayValue => IsNull ? "NULL" : ValueInstance is string ? $"\"{ValueInstance}\" ({Value})" : $"{ValueInstance} ({Value})";

        /// <summary>NULL - neinicializovaná readonly konstanta bez hodnoty. Čtení Value vyhodí výjimku</summary>
        public static readonly D Null = new D() { AsReadOnly = true };
        /// <summary>Příznak ReadOnly</summary>
        protected bool AsReadOnly { set => SetReadOnly(); }

        /// <summary>Hodnota jako GTyp</summary>
        public Key KeyValue
        {
            get => GDbType.Parse<Key>(DbValue);
            internal set => ValueInstance = value.DbValue; //bez ConvertValue
        }
        /// <summary>Hodnota jako GTyp</summary>
        public static implicit operator Key(GEnum<D, Key, E> e) => e.KeyValue;

        /// <summary>Hodnota jako Enum typ. Vyhodí výjimku pro NULL.</summary>
        public E Value
        {
            get
            {
                var value = ValueInstance;
                if (value == null) throw new GException(21000054, 23200003); //RC-EX 23200003 : pokus o přístup k hodnotě null
                if (value is string s) return Enum.TryParse<E>(s, true, out var res) ? res : (E)(object)(-1);
                return (E)value;  
            }
        }

        /// <summary>nalezení hodnoty daného GEnum typu dle základní hodnoty (obvykle dle short)</summary>
        public static D FindByValue(object value) => (D)FindByValue(typeof(D), value);

        /// <summary>GTyp klíče (obvykle GInt16)</summary>
        public override Type KeyType => typeof(Key);

        /// <summary>obecná typová konverze</summary>
        public static D Parse(object inputValue, bool acceptNull = false, bool allowNewValues = true) => (D)Parse(typeof(D), inputValue, acceptNull, allowNewValues);

        /// <summary>seznam všech hodnot daného GEnum typu (mimo NULL)</summary>
        public static IEnumerable<D> GetValues() => GetValues(typeof(D)).Cast<D>();

        /// <summary>
        /// Konvertuje hodnotu na string podle dodaného formátu (culture specific)
        /// </summary>
        public override string ToString(IFormatProvider provider) => KeyValue.ToString(provider);

        /// <summary>převod hodnoty na text</summary>
        public override string ToString(bool involveNull) => KeyValue.ToString(involveNull);

        /// <summary>nastavení hodnoty s případnou předchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public override void ParseValue(object inputValue)
        {
            var k = KeyValue;
            k.ParseValue(inputValue);
            KeyValue = k;
        }


        //#endregion
        #region Meta
        static FieldInfo m_MetaField = null;
        static GDtoAccessor m_MetaAccessor = null;
        static internal FieldInfo MetaField => m_MetaField ?? (m_MetaField = typeof(D).GetField("Meta")) ?? throw new GArgumentOutOfRangeException(21000059, 21090050, typeof(D)); //RC-EX 21090050 : !Typ výčtu {0} nemá Meta!
        static internal GDtoAccessor MetaAccessor => m_MetaAccessor ?? (m_MetaAccessor = GDtoAccessor.Get(MetaField.FieldType));
        internal object GetMeta() => MetaField.GetValue(this);

        /// <summary>Jméno klíčové vlastnosti z Meta</summary>
        public override string ValueIdName => MetaAccessor.GetKeyFields()[0].Name;
        /// <summary>Hodnota klíčové vlastnosti z Meta</summary>
        public override IGDbType ValueId => GetMeta() is object m ? MetaAccessor.GetKeyFields()[0].GetValue(m) as IGDbType : null;
        /// <summary>Hodnota txt vlastnosti z Meta</summary>
        public override GString ValueTxt => GetMeta() is object m ? MetaAccessor[ValueIdName + "_txt"]?.GetValue(m) as GString : null;
        /// <summary>Hodnota k_xml či k_s vlastnosti z Meta</summary>
        public override GString ValueXml => GetMeta() is object m ? (MetaAccessor["k_xml"] ?? MetaAccessor["k_s"])?.GetValue(m) as GString : null;

        /// <summary>nalezení hodnoty daného GEnum typu dle ValueXml (k_xml)</summary>
        public static D FindByXml(string xml)
        {
            if (xml == null) return null;
            foreach (var i in GetValueDict(typeof(D)))
            {
                if (i.Value.ValueXml?.BaseValue == xml) return (D)i.Value;
            }
            return null;
        }
        #endregion
    }

}
