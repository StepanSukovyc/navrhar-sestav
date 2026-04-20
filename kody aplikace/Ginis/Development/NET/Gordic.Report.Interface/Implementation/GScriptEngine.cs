//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GScriptEngine.cs                    </Name>
//    <Description> napojení na skriptovací stroj g32grs01                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;
using Gordic.Report.Interface;

namespace Gordic.Report.Implementation
{
    /// <exclude/>
    [GuidAttribute("5B0B74B0-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IDecimal
    {
        /// <exclude/>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __internal1();
        /// <exclude/>
        [PreserveSig]
        int setTo(IDecimal value);
        /// <exclude/>
        [PreserveSig]
        int setTo([MarshalAs(UnmanagedType.LPStr)] string value);
        /// <exclude/>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __clone();//IDecimal** out);
        /// <exclude/>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __toString();//const char** str);
        /// <exclude/>
        [PreserveSig]
        int compareTo(IDecimal with, int result);
        /// <exclude/>
        [PreserveSig]
        int toInt(out int i);
        /// <exclude/>
        [PreserveSig]
        int increment();
        /// <exclude/>
        [PreserveSig]
        int add(IDecimal num);
        /// <exclude/>
        [PreserveSig]
        int minFrom(IDecimal num2);
        /// <exclude/>
        [PreserveSig]
        int maxFrom(IDecimal num2);
        /// <exclude/>
        [PreserveSig]
        int format(
            [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string outstr
            , [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string formatstr
            , IntPtr o_formatspecs
            //, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string o_formatspecs
            );

        //virtual GORSCRIPTAPI substract(IDecimal* num) PURE;
    };

    /// <exclude/>
    [GuidAttribute("5B0B74B1-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IDatetime
    {
        /// <exclude/>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __internal1();
        /// <exclude/>
        [PreserveSig]
        int setTo(IDatetime value);
        /// <exclude/>
        [PreserveSig]
        int setTo([MarshalAs(UnmanagedType.LPStr)] string value);
        /// <exclude/>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __clone();//IDatetime** out);
        /// <exclude/>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int __toString();//const char** str);
        /// <exclude/>
        [PreserveSig]
        int compareTo(IDatetime with, out int result);
        /// <exclude/>
        [PreserveSig]
        int format(
            [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string outstr,
            [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))] string formatstr
            );
    };

    /// <summary>
    /// 
    /// </summary>
    public enum GScriptableType : byte
    {
        /// <exclude/>
        Scriptable_type_string = 0,
        /// <exclude/>
        Scriptable_type_number = 1,
        /// <exclude/>
        Scriptable_type_datetime = 2,
        /// <exclude/>
        Scriptable_type_object = 3,
        /// <exclude/>
        Scriptable_type_rtftext = 4,
        /// <exclude/>
        Scriptable_type_rtfcompressed = 5,
        /// <exclude/>
        Scriptable_type_stringnontrimmed = 6,
    }

    /// <exclude/>
    [GuidAttribute("5B0B74C0-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IDataData //: IUnknown
    {
        /// <exclude/>
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        /// <exclude/>
        [PreserveSig]
        int getDataType(out GScriptableType type);
        /// <exclude/>
        [PreserveSig]
        int getString([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        /// <exclude/>
        [PreserveSig]
        int getDecimal(out IDecimal dec);	       //new ref
        /// <exclude/>
        [PreserveSig]
        int getDatetime(out IDatetime dat);        //new ref
    };

    /// <exclude/>
    [GuidAttribute("5B0B74C1-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IDataScriptable //: IDataData
    {
        /// <exclude/>
        [PreserveSig]
        int getName([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string name);
        /// <exclude/>
        [PreserveSig]
        int getDataType(out GScriptableType type);
        /// <exclude/>
        [PreserveSig]
        int getString([MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringOut))] out string value);
        /// <exclude/>
        [PreserveSig]
        int getDecimal(out IDecimal dec);
        /// <exclude/>
        [PreserveSig]
        int getDatetime(out IDatetime dat);
        /// <exclude/>
        [PreserveSig]
        int getObject(out IScriptable o);
    };

    /// <exclude/>
    [GuidAttribute("5B0B74AE-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IScriptable
    {
        /// <exclude/>
        [PreserveSig]
        int getProperty([MarshalAs(UnmanagedType.LPStr)] string name, out IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int setProperty([MarshalAs(UnmanagedType.LPStr)] string name, IDataScriptable value);
    };

    /// <exclude/>
    [GuidAttribute("5B0B74AF-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IScriptableContainer //: IScriptable
    {
        /// <exclude/>
        [PreserveSig]
        int getProperty([MarshalAs(UnmanagedType.LPStr)] string name, out IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int setProperty([MarshalAs(UnmanagedType.LPStr)] string name, IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int getContainerLength(out int len);
        /// <exclude/>
        [PreserveSig]
        int getContainerItem(IDataScriptable index, out IDataScriptable value); //new ref
        /// <exclude/>
        [PreserveSig]
        int getContainerKey(int index, out IDataScriptable key); //new ref
    };

    /// <exclude/>
    [GuidAttribute("5B0B74AC-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IScriptableContainer2 //: IScriptable
    {
        /// <exclude/>
        [PreserveSig]
        int getProperty([MarshalAs(UnmanagedType.LPStr)] string name, out IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int setProperty([MarshalAs(UnmanagedType.LPStr)] string name, IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int getContainerLength(out int len);
        /// <exclude/>
        [PreserveSig]
        int getContainerItem(IDataScriptable index, out IDataScriptable value); //new ref
        /// <exclude/>
        [PreserveSig]
        int getContainerKey(int index, out IDataScriptable key); //new ref
        /// <exclude/>
        [PreserveSig]
        int setContainerItem(IDataScriptable index, IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int addContainerItem(IDataScriptable key, IDataScriptable value);
        /// <exclude/>
        [PreserveSig]
        int deleteContainerItem(IDataScriptable key);
    };

    /// <exclude/>
    [GuidAttribute("5B0B74AB-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    public interface IScriptableCallable
    {
        /// <exclude/>
        [PreserveSig]
        int call(int argc, [MarshalAs(UnmanagedType.LPArray, SizeParamIndex = 0, ArraySubType = UnmanagedType.IUnknown)] IDataScriptable[] args, out IDataScriptable returns);
    };

    [GuidAttribute("5B0B74AD-EFB6-4068-BF3D-512B68B65549")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    [System.Security.SecurityCritical]
    internal interface IScriptEngine_GRS01
    {
        [PreserveSig]
        int getErrorMessage(out IntPtr message);
        [PreserveSig]
        int addObject([MarshalAs(UnmanagedType.LPStr)] string name, IScriptable obj);
        [PreserveSig]
        int importModule([MarshalAs(UnmanagedType.LPStr)] string module);
        [PreserveSig]
        int importAllFromModule([MarshalAs(UnmanagedType.LPStr)] string module);

        [PreserveSig]
        int compileScript([MarshalAs(UnmanagedType.LPStr)] string script, out IntPtr compiled);
        [PreserveSig]
        int compileExpression([MarshalAs(UnmanagedType.LPStr)] string expression, out IntPtr compiled);
        [PreserveSig]
        int freeCompiled(IntPtr compiled);

        [PreserveSig]
        int runScript(IntPtr compiled);
        [PreserveSig]
        int evaluate(IntPtr compiled, out IDataScriptable result);

        [PreserveSig]
        int createDecimal([MarshalAs(UnmanagedType.LPStr)] string num, out IDecimal dec);
        [PreserveSig]
        int createDecimal2(int num, out IDecimal dec);
        [PreserveSig]
        int createDatetime([MarshalAs(UnmanagedType.LPStr)] string dat, out IDatetime dt);

        [PreserveSig]
        int setListener(int warnLevel, IntPtr listener);
    };

    [System.Security.SecurityCritical]
    internal class GDataScriptableImpl : IDataScriptable
    {
        GScriptEngine m_eng;
        private string name;
        private string s;
        private GScriptableType t = GScriptableType.Scriptable_type_string;
        //static internal IntPtr m_glob;

        private GDataScriptableImpl() { }
        public GDataScriptableImpl(GScriptEngine eng, string name, string s)
        {
            m_eng = eng;
            this.name = name;
            this.s = s;
        }

        public GDataScriptableImpl(GScriptEngine eng, string name, decimal d)
        {
            m_eng = eng;
            t = GScriptableType.Scriptable_type_number;
            this.name = name;
            this.s = d.ToString();
        }
        public GDataScriptableImpl(GScriptEngine eng, string name, DateTime d)
        {
            m_eng = eng;
            t = GScriptableType.Scriptable_type_datetime;
            this.name = name;
            this.s = d.ToString("yyyyMMddHHmmss");
        }
        public GDataScriptableImpl(GScriptEngine eng, string name, DateTimeOffset d)
        {
            m_eng = eng;
            t = GScriptableType.Scriptable_type_datetime;
            this.name = name;
            this.s = d.ToString("yyyyMMddHHmmss");
        }
        public static GDataScriptableImpl CreateDateTime(GScriptEngine eng, string name, string value)
        {
            var s = new GDataScriptableImpl();
            s.m_eng = eng;
            s.t = GScriptableType.Scriptable_type_datetime;
            s.name = name;
            s.s = value;
            return s;
        }
        public string Name { get { return name; } }
        public GScriptableType Type { get { return t; } }

        [System.Security.SecurityCritical]
        int IDataScriptable.getName(out string name)
        {
            //Marshal.FreeHGlobal(m_glob);
            //m_glob = Marshal.StringToHGlobalAnsi(this.name);
            //name = m_glob;
            //name = this.name;
            name = GNativeStringCache.RepString(m_eng, this.name);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getDataType(out GScriptableType type)
        {
            type = t;
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getString(out string value)
        {
            //Marshal.FreeHGlobal(m_glob);
            //m_glob = Marshal.StringToHGlobalAnsi(this.s);
            //value = m_glob;
            //value = this.s;
            value = GNativeStringCache.RepString(m_eng, this.s);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getDecimal(out IDecimal dec)
        {
            dec = m_eng.CreateDecimal(this.s);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getDatetime(out IDatetime dat)
        {
            dat = m_eng.CreateDatetime(this.s);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getObject(out IScriptable o)
        {
            o = null;
            return 1;
        }
    }
    /// <summary>Datová hodnota pro skripty</summary>
    [System.Security.SecurityCritical]
    public class GDataScriptable : IDisposable
    {
        internal GScriptEngine m_eng;
        internal IDataScriptable m_data;
        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        /// <param name="eng">skriptovací nástroj</param>
        /// <param name="data">data skriptu</param>
        public GDataScriptable(GScriptEngine eng, IDataScriptable data)
        {
            m_eng = eng;
            m_data = data;
        }

        /// <exclude/>        ~GDataScriptable()
        {
            Dispose();
        }

        /// <exclude/>        public void Dispose()
        {
            if (m_data != null)
            {
                Marshal.ReleaseComObject(m_data);
                m_data = null;
            }
            GC.SuppressFinalize(this);
        }

        /// <summary>jméno</summary>
        public string Name
        {
            get
            {
                //IntPtr l_name;
                //m_data.getName(out l_name);
                //return Marshal.PtrToStringAnsi(l_name);
                string l_name;
                m_data.getName(out l_name);
                return l_name;
            }
        }

        /// <summary>typ</summary>
        public GScriptableType Type
        {
            get { GScriptableType t; m_data.getDataType(out t); return t; }
        }

        /// <summary>hodnota</summary>        public override string ToString()
        {
            //IntPtr l_str;
            //m_eng.CheckError(m_data.getString(out l_str));
            //return Marshal.PtrToStringAnsi(l_str);
            string l_str;
            m_eng.CheckError(m_data.getString(out l_str));
            return l_str;
        }

        /// <summary>hodnota</summary>
        public int ToInt()
        {
            if (Type == GScriptableType.Scriptable_type_number)
            {
                IDecimal dec;
                int i;
                m_eng.CheckError(m_data.getDecimal(out dec));
                dec.toInt(out i);
                return i;
            }
            return Int32.Parse(ToString());
        }

        /// <summary>hodnota</summary>
        public decimal ToDecimal()
        {
            return ToDecimal(ToString());
        }
        /// <summary>hodnota</summary>
        public static decimal ToDecimal(string value)
        {
            return Decimal.Parse(value, System.Globalization.CultureInfo.InvariantCulture);
        }
        /// <summary>hodnota</summary>
        public static object ToDecimalOrDbNull(string value)
        {
            decimal d;
            if (Decimal.TryParse(value, System.Globalization.NumberStyles.Number, System.Globalization.CultureInfo.InvariantCulture, out d))
                return d;
            return DBNull.Value;
        }

        /// <summary>hodnota</summary>
        public DateTime ToDateTime()
        {
            return ToDateTime(ToString());
        }
        /// <summary>hodnota</summary>
        public static DateTime ToDateTime(string value)
        {
            //return DateTime.Parse(ToString());
            return DateTime.ParseExact(value, "dd.MM.yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
        }
        /// <summary>hodnota</summary>
        public static object ToDateTimeOrDbNull(string value)
        {
            DateTime dt;
            if (DateTime.TryParseExact(value, "dd.MM.yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out dt))
                return dt;
            return DBNull.Value;
        }

        /// <summary>hodnota</summary>
        public DateTimeOffset ToDateTimeOffset()
        {
            return ToDateTimeOffset(ToString());
        }
        /// <summary>hodnota</summary>
        public static DateTimeOffset ToDateTimeOffset(string value)
        {
            return DateTimeOffset.ParseExact(value, "dd.MM.yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
        }
        /// <summary>hodnota</summary>
        public static object ToDateTimeOffsetOrDbNull(string value)
        {
            DateTimeOffset dt;
            if (DateTimeOffset.TryParseExact(value, "dd.MM.yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out dt))
                return dt;
            return DBNull.Value;
        }

        //int getDecimal(out IDecimal dec);
        //int getDatetime(out IDatetime dat);
        //int getObject(out IScriptable o);
    }

    /// <summary>Script object base</summary>
    [System.Security.SecurityCritical]
    public abstract class GScriptableObjectBase : IDataScriptable
    {
        GScriptEngine m_eng;
        private string name;
        /// <exclude/>
        public delegate IDataScriptable CallDelegate(IDataScriptable[] args);

        /// <exclude/>
        protected GScriptEngine Engine { get { return m_eng; } }

        /// <summary>Metody (callables)</summary>
        protected GScriptableObjectBase(GScriptEngine eng, string name)
        {
            m_eng = eng;
            this.name = name;
        }
        [System.Security.SecurityCritical]
        int IDataScriptable.getName(out string name)
        {
            //Marshal.FreeHGlobal(GDataScriptableImpl.m_glob);
            //GDataScriptableImpl.m_glob = Marshal.StringToHGlobalAnsi(this.name);
            //name = GDataScriptableImpl.m_glob;
            //name = this.name;
            name = GNativeStringCache.RepString(Engine, this.name);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getDataType(out GScriptableType type)
        {
            type = GScriptableType.Scriptable_type_object;
            return 0;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getString(out string value)
        {
            //value = IntPtr.Zero;
            value = GNativeStringCache.RepString(Engine, string.Empty);
            return 1;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getDecimal(out IDecimal dec)
        {
            dec = null;
            return 1;
        }

        [System.Security.SecurityCritical]
        int IDataScriptable.getDatetime(out IDatetime dat)
        {
            dat = null;
            return 1;
        }
        [System.Security.SecurityCritical]
        int IDataScriptable.getObject(out IScriptable o)
        {
            o = getObject();
            return 0;
        }
        /// <summary>object</summary>
        protected abstract IScriptable getObject();
    }
    /// <summary>Script object</summary>
    [System.Security.SecurityCritical]
    public class GScriptableObject : GScriptableObjectBase
    {
        IScriptable o;
        /// <summary>Script object</summary>
        public GScriptableObject(GScriptEngine eng, string name, IScriptable o)
            : base(eng, name)
        {
            this.o = o;
        }
        /// <summary>object</summary>
        [System.Security.SecurityCritical]
        protected override IScriptable getObject()
        {
            return this.o;
        }
    }
    /// <summary>Metody (callables)</summary>
    [System.Security.SecurityCritical]
    public class GScriptableMethod : GScriptableObjectBase, IScriptableCallable, IScriptable
    {
        CallDelegate d;
        /// <summary>Metody (callables)</summary>
        public GScriptableMethod(GScriptEngine eng, string name, CallDelegate d)
            : base(eng, name)
        {
            this.d = d;
        }
        [System.Security.SecurityCritical]
        int IScriptableCallable.call(int argc, IDataScriptable[] args, out IDataScriptable returns)
        {
            returns = d(args);
            return 0;
        }
        [System.Security.SecurityCritical]
        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            value = null;
            return 1;
        }

        [System.Security.SecurityCritical]
        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            return 1;
        }
        /// <summary>object</summary>
        [System.Security.SecurityCritical]
        protected override IScriptable getObject()
        {
            return this;
        }
    }
    /// <summary>Script object</summary>
    [System.Security.SecurityCritical]
    public class GScriptableContainer : GScriptableObjectBase, IScriptableContainer, IScriptable
    {
        Dictionary<string, string> d;
        /// <summary>Script object</summary>
        public GScriptableContainer(GScriptEngine eng, string name, Dictionary<string, string> d)
            : base(eng, name)
        {
            this.d = d;
        }
        /// <summary>object</summary>
        [System.Security.SecurityCritical]
        protected override IScriptable getObject()
        {
            return this;
        }

        [System.Security.SecurityCritical]
        int IScriptableContainer.getContainerItem(IDataScriptable index, out IDataScriptable value)
        {
            using (var i = new GDataScriptable(Engine, index))
            {
                var istr = i.ToString();
                string v;
                if (d.TryGetValue(istr, out v) == false)
                {
                    value = null;
                    return 1;
                }
                value = Engine.GetScriptableString(istr, v);
                return 0;
            }
        }

        [System.Security.SecurityCritical]
        int IScriptableContainer.getContainerKey(int index, out IDataScriptable key)
        {
            key = Engine.GetScriptableString("", System.Linq.Enumerable.ElementAt(d.Keys, index));
            return 0;
        }

        [System.Security.SecurityCritical]
        int IScriptableContainer.getContainerLength(out int len)
        {
            len = d.Count;
            return 0;
        }

        [System.Security.SecurityCritical]
        public int getProperty(string name, out IDataScriptable value)
        {
            value = null;
            return 1;
        }

        [System.Security.SecurityCritical]
        public int setProperty(string name, IDataScriptable value)
        {
            return 1;
        }
    }

    /// <summary>Výjimka vyhozená autorem sestavy bìhem jejího zpracování.</summary>
    /// <remarks>
    /// <para>
    /// Výjimku nelze použít samostatnì a neobsahuje žádné dodateèné informace oproti GException. 
    /// Tøídu však lze použít k rozlišení výjimky reporteru od ostatních systémových a 
    /// aplikaèních výjimek
    /// </para>
    /// </remarks>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GScriptException : GUnsafeRepWrapper.GrrException //Gordic.General.GException
    {
        //[System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
        //internal GScriptException(int code, int erc, IGScript script, string message)
        //    : base(code, erc, System.Reflection.Assembly.GetCallingAssembly(), message)
        //{
        //    var hasOwner = (script as IGScriptWithOwner);
        //    if (hasOwner != null) Owner = hasOwner.Owner;
        //}
        [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
        internal GScriptException(int code, int rcex, IGScript script, FunctionLoader loader, int hresult, string msg)
            : base(code, rcex, System.Reflection.Assembly.GetCallingAssembly(), loader, hresult, msg)
        {
            var hasOwner = (script as IGScriptWithOwner);
            if (hasOwner != null) { Owner = hasOwner.Owner; Id = hasOwner.Id; }
        }

        private object Owner = null;
        private string Id = null;
        /// <exclude/>
        protected GScriptException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context)
            : base(info, context)
        {
        }

        /// <summary>chybové hlášení</summary>
        public override string Message
        {            get
            {
                var l_oMessageBuilder = new StringBuilder();
                var msg = ShortMessage;
                //if (Id != null)
                //{
                //    var i = ShortMessage.IndexOf(':');
                //    if (i > 0) msg = msg.Substring(0, i) + " " + Id + msg.Substring(i);
                //    else msg = msg + " " + Id;
                //}
                l_oMessageBuilder.Append(msg);
                if (Owner != null)
                {
                    l_oMessageBuilder.AppendLine();
                    //l_oMessageBuilder.Append("[ ");
                    if (Id != null) { l_oMessageBuilder.Append(Id); l_oMessageBuilder.Append(" on "); }
                    l_oMessageBuilder.Append(Owner.ToString());
                    //l_oMessageBuilder.Append(" ]");
                }
                AppendPostfix(l_oMessageBuilder, Code, AssemblyName, AssemblyVersion);
                return l_oMessageBuilder.ToString();
            } // end method
        } // end property

    }

    [System.Security.SecurityCritical]
    internal interface IGScriptWithOwner
    {
        object Owner { [System.Security.SecurityCritical]get; }
        string Id { [System.Security.SecurityCritical]get; }
    }
    /// <summary>Abstraktní skript s uvolòováním</summary>
    [System.Security.SecurityCritical]
    public abstract class GScriptBase : IDisposable, IGScriptWithOwner, IGScript
    {
        internal IntPtr m_compiled;
        internal GScriptEngine m_eng;
        internal GScriptBase(string scriptText, IntPtr compiled, GScriptEngine eng)
        {
            m_ScriptText = scriptText;
            m_compiled = compiled;
            m_eng = eng;
        }

        /// <exclude/>        ~GScriptBase()
        {
            Dispose();
        }

        /// <exclude/>        public void Dispose()
        {
            if (m_compiled != IntPtr.Zero)
            {
                m_eng.freeCompiled(m_compiled);
                m_compiled = IntPtr.Zero;
            }
            m_eng = null;
            GC.SuppressFinalize(this);
        }

        //------------------------------------------------------------------
        private string m_ScriptText;
        ///<summary>text skriptu</summary>
        public string ScriptText
        {
            get { return m_ScriptText; }
        }
        public virtual IntPtr CompiledScript { get { return m_compiled; } }

        #region IGScript_Grr06 Members

        [System.Security.SecurityCritical]
        int IGScript.getScriptText(out string script)
        {
            script = null;// IntPtr.Zero;
            return 1;
        }

        [System.Security.SecurityCritical]
        int IGScript.getCompiledScript(out IntPtr compiled)
        {
            compiled = CompiledScript;
            return 0;
        }

        [System.Security.SecurityCritical]
        int IGScript.check()
        {
            return 0;
        }

        #endregion

        //------------------------------------------------------------------
        /// <exclude/>
        public Dictionary<string, IScriptable> Items = new Dictionary<string, IScriptable>();
        /// <exclude/>
        public object Owner { [System.Security.SecurityCritical]get; [System.Security.SecurityCritical]set; }
        /// <exclude/>
        public string Id { [System.Security.SecurityCritical]get; [System.Security.SecurityCritical]set; }
        /// <exclude/>
        protected void RegisterScriptItems(Dictionary<string, IScriptable> items)
        {
            foreach (KeyValuePair<string, IScriptable> item in items)
            {
                m_eng.AddObject(item.Key.Replace('-','_'), item.Value);
            }
        }
        /// <exclude/>
        protected void UnregisterScriptItems(Dictionary<string, IScriptable> items)
        {
            if (m_eng == null) return; //nemìlo by nastat, ale kdyby už byl objekt uvolnìn, tak to zde padne.
            foreach (KeyValuePair<string, IScriptable> item in items)
            {
                m_eng.AddObject(item.Key.Replace('-', '_'), null);
            }
        }
    }

    /// <summary>Skript (bez výsledku)</summary>
    [System.Security.SecurityCritical]
    public abstract class GScript : GScriptBase
    {
        internal GScript(string scriptText, IntPtr compiled, GScriptEngine eng) : base(scriptText, compiled, eng) { }
        /// <summary>Spuštìní skriptu</summary>
        public abstract void Run();
    }
    /// <summary>Výraz skriptu</summary>
    [System.Security.SecurityCritical]
    public abstract class GScriptExpression : GScriptBase
    {
        internal GScriptExpression(string scriptText, IntPtr compiled, GScriptEngine eng) : base(scriptText, compiled, eng) { }
        /// <summary>Spuštìní výrazu skriptu</summary>
        public abstract GDataScriptable Evaluate();
    }

    /// <summary>Skript (bez výsledku)</summary>
    [System.Security.SecurityCritical]
    internal class GScript_GRR06 : GScript
    {
        internal GScript_GRR06(string scriptText, GScriptEngine_GRR06 eng) : base(scriptText, IntPtr.Zero, eng) { }

        /// <summary>Spuštìní skriptu</summary>
        [System.Security.SecurityCritical]
        public override void Run()
        {
            RegisterScriptItems(Items);
            try
            {
                ((GScriptEngine_GRR06)m_eng).runScript(this);
            }
            finally
            {
                UnregisterScriptItems(Items);
            }
        }

        public override IntPtr CompiledScript
        {
            [System.Security.SecurityCritical]
            get
            {
                if (m_compiled == IntPtr.Zero)
                    m_compiled = ((GScriptEngine_GRR06)m_eng).compileScript(this, ScriptText);
                return m_compiled;
            }
        }
    }
    /// <summary>Výraz skriptu</summary>
    [System.Security.SecurityCritical]
    internal class GScriptExpression_GRR06 : GScriptExpression
    {
        internal GScriptExpression_GRR06(string scriptText, GScriptEngine_GRR06 eng) : base(scriptText, IntPtr.Zero, eng) { }

        /// <summary>Spuštìní výrazu skriptu</summary>
        [System.Security.SecurityCritical]
        public override GDataScriptable Evaluate()
        {
            RegisterScriptItems(Items);
            try
            {
                IDataScriptable res;
                ((GScriptEngine_GRR06)m_eng).evaluate(this, out res);
                return new GDataScriptable(m_eng, res);
            }
            finally
            {
                UnregisterScriptItems(Items);
            }
        }

        public override IntPtr CompiledScript
        {
            [System.Security.SecurityCritical]
            get
            {
                if (m_compiled == IntPtr.Zero)
                    m_compiled = ((GScriptEngine_GRR06)m_eng).compileExpression(this, ScriptText);
                return m_compiled;
            }
        }
    }

    /// <summary>Skript (bez výsledku)</summary>
    [System.Security.SecurityCritical]
    internal class GScript_GRS01 : GScript, IGScript
    {
        internal GScript_GRS01(string scriptText, IntPtr compiled, GScriptEngine eng) : base(scriptText, compiled, eng) { }

        /// <summary>Spuštìní skriptu</summary>
        [System.Security.SecurityCritical]
        public override void Run()
        {
            RegisterScriptItems(Items);
            try
            {
                ((GScriptEngine_GRS01)m_eng).runScript(this, m_compiled);
            }
            finally
            {
                UnregisterScriptItems(Items);
            }
        }
    }
    /// <summary>Výraz skriptu</summary>
    [System.Security.SecurityCritical]
    internal class GScriptExpression_GRS01 : GScriptExpression
    {
        internal GScriptExpression_GRS01(string scriptText, IntPtr compiled, GScriptEngine eng) : base(scriptText, compiled, eng) { }

        /// <summary>Spuštìní výrazu skriptu</summary>
        [System.Security.SecurityCritical]
        public override GDataScriptable Evaluate()
        {
            IDataScriptable res;
            ((GScriptEngine_GRS01)m_eng).evaluate(this, m_compiled, out res);
            return new GDataScriptable(m_eng, res);
        }
    }

    /// <summary>Motor skriptù</summary>
    [System.Security.SecurityCritical]
    public abstract class GScriptEngine : IDisposable, IGNativeStringOwner
    {
        GNativeStringCache IGNativeStringOwner.NativeStringCache { [System.Security.SecurityCritical] get; } = new GNativeStringCache();
        /// <summary>Finalizer</summary>        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <exclude/>
        [System.Security.SecurityCritical]
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(Gordic.General.GLogManager.GetLogger("Gordic.Gfe.MemoryDebug"), $"{GetType()} Dispose {disposing}{GNativeStringCache.DebugString(this)}");
#endif
            GNativeStringCache.Free(this);
        }
        [System.Security.SecuritySafeCritical] ~GScriptEngine() { Dispose(false); }

        /// <summary>Ošetøení chyb</summary>
        protected internal abstract void CheckError(int hresult);
        internal abstract void freeCompiled(IntPtr compiled);
        //internal abstract void runScript(IntPtr compiled);
        //internal abstract void evaluate(IntPtr compiled, out IDataScriptable result);

        /// <summary>Vytvoøení èísla</summary>
        public abstract IDecimal CreateDecimal(string value);
        /// <summary>Vytvoøení datumu</summary>
        public abstract IDatetime CreateDatetime(DateTime value);
        /// <summary>Vytvoøení datumu</summary>
        public abstract IDatetime CreateDatetime(string value);
        ///// <summary>Pøíprava skriptu pro spuštìní</summary>
        //public abstract GScript CompileScript(string script);
        ///// <summary>Pøíprava výrazu pro spuštìní</summary>
        //public abstract GScriptExpression CompileExpression(string expression);
        /// <summary>Pøidání skriptovacího objektu</summary>
        public abstract void AddObject(string name, IScriptable obj);

        /// <summary>Formátování èísla</summary>
        public string FormatDecimal(string format, decimal value)
        {
            return FormatDecimal(format, value.ToString(System.Globalization.CultureInfo.InvariantCulture));
        }
        /// <summary>Formátování èísla</summary>
        public string FormatDecimal(string format, decimal value, out string spec)
        {
            return FormatDecimal(format, value.ToString(System.Globalization.CultureInfo.InvariantCulture), out spec);
        }

        /// <summary>Formátování èísla</summary>
        public string FormatDecimal(string format, string value)
        {
            IDecimal l_dec = CreateDecimal(value);
            string rval;
            try
            {
                CheckError(l_dec.format(out rval, format, IntPtr.Zero));
            }
            finally
            {
                Marshal.ReleaseComObject(l_dec);
            }
            return rval;
        }

        /// <summary>Formátování èísla</summary>
        public string FormatDecimal(string format, string value, out string spec)
        {
            IDecimal l_dec = CreateDecimal(value);
            string rval;
            try
            {
                IntPtr l_specs = IntPtr.Zero;
                var h = GCHandle.Alloc(l_specs, GCHandleType.Pinned);
                try
                {
                    CheckError(l_dec.format(out rval, format, h.AddrOfPinnedObject()));
                    spec = RepString.s((IntPtr)h.Target);
                }
                finally
                {
                    h.Free();
                }
            }
            finally
            {
                Marshal.ReleaseComObject(l_dec);
            }
            return rval;
        }

        /// <summary>Formátování datumu</summary>
        public string FormatDatetime(string format, DateTime value)
        {
            IDatetime l_dat = CreateDatetime(value);
            string rval;
            try
            {
                //IntPtr l_output;
                //CheckError(l_dat.format(out l_output, format));
                //rval = Marshal.PtrToStringAnsi(l_output);
                CheckError(l_dat.format(out rval, format));
            }
            finally
            {
                Marshal.ReleaseComObject(l_dat);
            }
            return rval;
        }
        /// <summary>Formátování datumu</summary>
        public string FormatDatetime(string format, string value)
        {
            IDatetime l_dat = CreateDatetime(value);
            string rval;
            try
            {
                //IntPtr l_output;
                //CheckError(l_dat.format(out l_output, format));
                //rval = Marshal.PtrToStringAnsi(l_output);
                CheckError(l_dat.format(out rval, format));
            }
            finally
            {
                Marshal.ReleaseComObject(l_dat);
            }
            return rval;
        }

        /// <summary>Vytvoøení stringového datového objektu skriptu</summary>
        public IDataScriptable GetScriptableString(string name, string s)
        {
            return new GDataScriptableImpl(this, name, s);
        }
        /// <summary>Vytvoøení èíselného datového objektu skriptu</summary>
        public IDataScriptable GetScriptableNumber(string name, decimal d)
        {
            return new GDataScriptableImpl(this, name, d);
        }
        /// <summary>Vytvoøení èíselného datového objektu skriptu</summary>
        public IDataScriptable GetScriptableNumber(string name, object value)
        {            
            if (value == null || value == DBNull.Value || value.Equals(string.Empty))
            {
                return new GDataScriptableImpl(this, name, 0M);
            }
            return new GDataScriptableImpl(this, name, (decimal)value);
        }

        /// <summary>Vytvoøení datumového datového objektu skriptu</summary>
        public IDataScriptable GetScriptableDateTime(string name, DateTime d)
        {
            return new GDataScriptableImpl(this, name, d);
        }
        /// <summary>Vytvoøení datumového datového objektu skriptu</summary>
        public IDataScriptable GetScriptableDateTime(string name, DateTimeOffset d)
        {
            return new GDataScriptableImpl(this, name, d);
        }
        /// <summary>Vytvoøení datumového datového objektu skriptu</summary>
        public IDataScriptable GetScriptableDateTime(string name, object value)
        {
            if (value == null || value == DBNull.Value || value.Equals(string.Empty))
            {
                return GDataScriptableImpl.CreateDateTime(this, name, "");
            }
            if (value is DateTime)
                return new GDataScriptableImpl(this, name, (DateTime)value);
            if (value is DateTimeOffset)
                return new GDataScriptableImpl(this, name, (DateTimeOffset)value);
            return new GDataScriptableImpl(this, name, value.ToString());
        }
        
        /// <summary>Vytvoøení objektu skriptu</summary>
        public IDataScriptable GetScriptableObject(string name, IScriptable d)
        {
            return new GScriptableObject(this, name, d);
        }
        /// <summary>Vytvoøení metody skriptu</summary>
        public IDataScriptable GetScriptableMethod(string name, GScriptableObjectBase.CallDelegate d)
        {
            return new GScriptableMethod(this, name, d);
        }
        /// <summary>Vytvoøení objektu skriptu</summary>
        public IDataScriptable GetScriptableContainer(string name, Dictionary<string, string> d)
        {
            return new GScriptableContainer(this, name, d);
        }        

        /// <summary>Pøíprava skriptu pro spuštìní</summary>
        [System.Security.SecurityCritical]
        public abstract GScript CreateScript(string script);
        /// <summary>Pøíprava výrazu pro spuštìní</summary>
        [System.Security.SecurityCritical]
        public abstract GScriptExpression CreateExpression(string expression);

        /// <summary>Vytvoøení nového ScriptEnginu</summary>
        public static GScriptEngine LoadNew() { return new GScriptEngine_GRS01(); }
        /// <summary>Vytvoøení ScriptEnginu pro danný formát</summary>
        public static GScriptEngine FromFormat(IGFormat fmt) { return new GScriptEngine_GRR06(fmt); }
    }

    [System.Security.SecurityCritical]
    internal class GScriptEngine_GRR06 : GScriptEngine
    {
        internal IGScriptEngine_Grr06 m_eng;

        /// <summary>Nový engine z Native interface</summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public GScriptEngine_GRR06(IGFormat fmt)
        {
            IntPtr engine;
            CheckError(fmt.__getScriptEngine(out engine));
            m_eng = Marshal.GetObjectForIUnknown(engine) as IGScriptEngine_Grr06;
        }

        /// <summary>Dispose</summary>
        [System.Security.SecurityCritical]
        protected override void Dispose(bool disposing)
        {
            if (m_eng != null)
            {
                Marshal.ReleaseComObject(m_eng);
                m_eng = null;
            }
            base.Dispose(disposing);
        }

        /// <summary>Ošetøení chyb</summary>
        [System.Security.SecurityCritical]
        protected internal override void CheckError(int hresult)
        {
            //GUnsafeRepWrapper.Throw06Error(hresult);
            CheckError(null, hresult);
        }
        /// <summary>Ošetøení chyb</summary>
        [System.Security.SecurityCritical]
        protected internal void CheckError(IGScript script, int hresult)
        {
            if (hresult != 0)
            {
                var msg = new System.Text.StringBuilder(1024);
                if (hresult == GUnsafeRepWrapper.S_FALSE)
                    msg.Append("S_FALSE");
                else
                    GUnsafeRepWrapper.GetErrorText(msg, msg.Capacity);
                throw new GScriptException(21000047, 32, script, GUnsafeRepWrapper.Grr06Loader.Loader, hresult, msg.ToString()); //RC-EX 32 : Chyba skriptu: {0}
            }
        
        }

        /// <summary>Vytvoøení èísla</summary>
        [System.Security.SecurityCritical]
        public override IDecimal CreateDecimal(string value)
        {
            IDecimal l_dec;
            CheckError(m_eng.createDecimal(value, out l_dec));
            return l_dec;
        }
        /// <summary>Vytvoøení datumu</summary>
        [System.Security.SecurityCritical]
        public override IDatetime CreateDatetime(DateTime value)
        {
            IDatetime l_dat;
            CheckError(m_eng.createDatetime(value.ToString("yyyyMMddHHmmss"), out l_dat));
            return l_dat;
        }
        /// <summary>Vytvoøení datumu</summary>
        [System.Security.SecurityCritical]
        public override IDatetime CreateDatetime(string value)
        {
            IDatetime l_dat;
            CheckError(m_eng.createDatetime(value, out l_dat));
            return l_dat;
        }

        /// <summary>Pøíprava skriptu pro spuštìní</summary>
        [System.Security.SecurityCritical]
        public override GScript CreateScript(string script)
        {
            return new GScript_GRR06(script, this);
        }

        /// <summary>Pøíprava výrazu pro spuštìní</summary>
        [System.Security.SecurityCritical]
        public override GScriptExpression CreateExpression(string expression)
        {
            return new GScriptExpression_GRR06(expression, this);
        }

        /// <summary>Pøidání skriptovacího objektu</summary>
        [System.Security.SecurityCritical]
        public override void AddObject(string name, IScriptable obj)
        {
            CheckError(m_eng.addObject(name, obj));
        }

        [System.Security.SecurityCritical]
        internal override void freeCompiled(IntPtr compiled) {
            if (m_eng == null)
            {
#if DEBUG //|| DEVELOP_VERSION
                throw new ObjectDisposedException("script engine");
#else
                return; //unmanaged memory leak!
#endif
            }
            CheckError(m_eng.freeCompiled(compiled));
        }
        [System.Security.SecurityCritical]
        internal void runScript(IGScript script) { CheckError(script, m_eng.runScript(script)); }
        [System.Security.SecurityCritical]
        internal void evaluate(IGScript script, out IDataScriptable result) { CheckError(script, m_eng.evaluate(script, out result)); }
        [System.Security.SecurityCritical]
        internal IntPtr compileScript(IGScript script, string scripttext) { IntPtr compiled; CheckError(script, m_eng.compileScript(scripttext, out compiled)); return compiled; }
        [System.Security.SecurityCritical]
        internal IntPtr compileExpression(IGScript script, string expression) { IntPtr compiled; CheckError(script, m_eng.compileExpression(expression, out compiled)); return compiled; }
    }

    [System.Security.SecurityCritical]
    internal static class Grs01Loader
    {
        internal static FunctionLoader Loader;
        static Grs01Loader()
        {
            Loader = new FunctionLoader("grs01");
            GC.SuppressFinalize(Loader);  //GRS01 neodloadovavam
            GetScriptEngine = (dGetScriptEngine)LoadFunction<dGetScriptEngine>();
        }
        public static Delegate LoadFunction<T>() { return Loader.LoadFunction<T>(); }

        public delegate int dGetScriptEngine(out IScriptEngine_GRS01 eng);
        public static dGetScriptEngine GetScriptEngine;
    }


    [System.Security.SecurityCritical]
    internal class GScriptEngine_GRS01 : GScriptEngine
    {
        internal IScriptEngine_GRS01 m_eng;

        /// <summary>Nový engine</summary>
        public GScriptEngine_GRS01()
        {
            Grs01Loader.GetScriptEngine(out m_eng);
            m_eng.setListener(44, IntPtr.Zero);
            m_eng.importModule("re");
            m_eng.importModule("string");
            m_eng.importAllFromModule("miscutils");
        }

        /// <summary>Dispose</summary>
        [System.Security.SecurityCritical]
        protected override void Dispose(bool disposing)
        {
            if (m_eng != null)
            {
                Marshal.ReleaseComObject(m_eng);
                m_eng = null;
            }
            base.Dispose(disposing);
        }

        /// <summary>Ošetøení chyb</summary>
        [System.Security.SecurityCritical]
        protected internal override void CheckError(int hresult)
        {
            CheckError(null, hresult);
        }
        /// <summary>Ošetøení chyb</summary>
        [System.Security.SecurityCritical]
        protected internal void CheckError(IGScript script, int hresult)
        {
            if (hresult != 0)
            {
                string message;
                if (hresult == 1/*S_FALSE*/) message = "S_FALSE";
                else
                {
                    IntPtr l_msg;
                    m_eng.getErrorMessage(out l_msg);
                    message = Marshal.PtrToStringAnsi(l_msg);
                }
                throw new GScriptException(21000046, 31, script, Grs01Loader.Loader, hresult, message); //RC-EX 31 : Chyba skriptu (grs01) : {0}
            }
        }

        /// <summary>Vytvoøení èísla</summary>
        [System.Security.SecurityCritical]
        public override IDecimal CreateDecimal(string value)
        {
            IDecimal l_dec;
            CheckError(m_eng.createDecimal(value, out l_dec));
            return l_dec;
        }
        /// <summary>Vytvoøení datumu</summary>
        [System.Security.SecurityCritical]
        public override IDatetime CreateDatetime(DateTime value)
        {
            IDatetime l_dat;
            CheckError(m_eng.createDatetime(value.ToString("yyyyMMddHHmmss"), out l_dat));
            return l_dat;
        }
        /// <summary>Vytvoøení datumu</summary>
        [System.Security.SecurityCritical]
        public override IDatetime CreateDatetime(string value)
        {
            IDatetime l_dat;
            CheckError(m_eng.createDatetime(value, out l_dat));
            return l_dat;
        }

        /// <summary>Pøíprava skriptu pro spuštìní</summary>
        [System.Security.SecurityCritical]
        public override GScript CreateScript(string script)
        {
            IntPtr compiled;
            CheckError(m_eng.compileScript(script, out compiled));
            return new GScript_GRS01(script, compiled, this);
        }

        /// <summary>Pøíprava výrazu pro spuštìní</summary>
        [System.Security.SecurityCritical]
        public override GScriptExpression CreateExpression(string expression)
        {
            IntPtr compiled;
            CheckError(m_eng.compileExpression(expression, out compiled));
            return new GScriptExpression_GRS01(expression, compiled, this);
        }

        /// <summary>Pøidání skriptovacího objektu</summary>
        [System.Security.SecurityCritical]
        public override void AddObject(string name, IScriptable obj)
        {
            CheckError(m_eng.addObject(name, obj));
        }

        [System.Security.SecurityCritical]
        internal override void freeCompiled(IntPtr compiled) { CheckError(m_eng.freeCompiled(compiled)); }
        [System.Security.SecurityCritical]
        internal void runScript(IGScript s, IntPtr compiled) { CheckError(s, m_eng.runScript(compiled)); }
        [System.Security.SecurityCritical]
        internal void evaluate(IGScript s, IntPtr compiled, out IDataScriptable result) { CheckError(s, m_eng.evaluate(compiled, out result)); }

    }

#if DEBUG
    [System.Security.SecurityCritical]
    internal class ScriptEngineTest : GScriptEngine_GRS01
    {
        //------------------------------------------------------------------
        // jen k testovani
        //------------------------------------------------------------------
        [System.Security.SecurityCritical]
        private class X : IScriptable, IDisposable
        {
            public GScriptEngine eng;            ~X()
            {
                Dispose();
            }            public void Dispose()
            {
            }

            //int a = 42;
            //string b = "ahoj";
            DateTime c = DateTime.Now;
            [System.Security.SecurityCritical]
            public int getProperty(string name, out IDataScriptable value)
            {
                switch (name)
                {
                    //case "a":
                    //    value = eng.GetScriptableNumber(name, a);
                    //    return GFEParserConsts.S_OK;
                    //case "b":
                    //    value = eng.GetScriptableString(name, b);
                    //    return GFEParserConsts.S_OK;
                    //case "c":
                    //    value = eng.GetScriptableDateTime(name, c);
                    //    return GFEParserConsts.S_OK;
                    default:
                        value = null;
                        return 1/*S_FALSE*/;
                }
            }

            [System.Security.SecurityCritical]
            public int setProperty(string name, IDataScriptable value)
            {
                var val = new GDataScriptable(eng, value);
                switch (name)
                {
                    //case "a":
                    //    a = val.ToInt();
                    //    return GFEParserConsts.S_OK;
                    //case "b":
                    //    b = val.ToString();
                    //    return GFEParserConsts.S_OK;
                    //case "c":
                    //    c = val.ToDateTime();
                    //    return GFEParserConsts.S_OK;
                    default:
                        value = null;
                        return 1/*S_FALSE*/;
                }
            }

        }

        //------------------------------------------------------------------
        /// <exclude/>
        public void Test1()
        {
            X x = new X() { eng = this };
            AddObject("x", x);

            //var s = FormatDatetime("mmmm", DateTime.Now);
            using (var s = CreateScript("x.c = x.c"))
            {
                s.Run();
            }
            AddObject("x", null);

            //using (var e = CompileExpression("Decimal('1234')+1"))
            //{
            //    var r = e.Evaluate();
            //    r.Dispose();
            //}

            Dispose();
        }
    }
#endif
}
