//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.gordic.general.glogcontext.cs                </Name>
//    <Description> Nástroj pro získávání kontextových vlastností               </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-02                                                  </Created>
//  </FileHeader>

using System;
using System.Text;

namespace Gordic.General
{
    /// <summary>
    /// Nástroj pro získávání kontextových vlastností 
    /// </summary>
    [System.Security.SecuritySafeCritical]
    public class GLogContext : IGObject
    {

        /// <summary>Obdoba GServerContext GetUserProcessId</summary>
        private static string GetUserProcessId() => GCallContext.Internal_GetUserProcessId(throwExceptions: false, returnNull: true);

        private const string m_csSerializationName = "ServerContext";

        private readonly static Object s_oLockApplicationInfo = new Object();
        private readonly static Object s_oLockLoginInfo = new Object();
        private readonly static Object s_oLockSessionInfo = new Object();
        private readonly static Object s_oLockConfiguration = new Object();

        /// <summary>
        /// Aktuální podoba ApplicationInfo (nebo null v případě, kdy zatím nebylo vytvořeno)
        /// </summary>
        public static IGApplicationInfo ApplicationInfo
        {
            get
            {
                var l_sUPId = GetUserProcessId();
                if (l_sUPId == null)
                    return null;
                // obdoba GServerContext.GetApplicationInfo
                var l_oServerContext = (GParams)AppDomain.CurrentDomain.GetData(m_csSerializationName);     // public static members are thread safe.
                if (l_oServerContext != null)
                {
                    lock (s_oLockApplicationInfo)   // teorteticky bez zámku s použitím Hashtable.Synchronized(l_oServerContext.HtParams);
                    {                           // instance HashTable - GetParam - není thread safe
                        return l_oServerContext.GetParam(l_sUPId, GApplicationInfo.SerializationName) as IGApplicationInfo;
                    }
                }
                return null;
            }
        }

        /// <summary>
        /// Aktuální podoba LoginInfo (nebo null v případě, kdy zatím nebylo vytvořeno)
        /// </summary>
        public static IGLoginInfo LoginInfo
        {
            get
            {
                var l_sUPId = GetUserProcessId();
                if (l_sUPId == null)
                    return null;
                // obdoba GServerContext.GetLoginInfo
                var l_oServerContext = (GParams)AppDomain.CurrentDomain.GetData(m_csSerializationName);     // public static members are thread safe.
                if (l_oServerContext != null)
                {
                    lock (s_oLockLoginInfo)     // teorteticky bez zámku s použitím Hashtable.Synchronized(l_oServerContext.HtParams);
                    {                           // instance HashTable - GetParam - není thread safe
                        return l_oServerContext.GetParam(l_sUPId, GLoginInfo.SerializationName) as IGLoginInfo;
                    }
                }
                return null;
            }
        }

        /// <summary>
        /// Aktuální podoba SessionInfo (nebo null v případě, kdy zatím nebylo vytvořeno)
        /// </summary>
        public static IGSessionInfo SessionInfo
        {
            get
            {
                var l_sUPId = GetUserProcessId();
                if (l_sUPId == null)
                    return null;
                // obdoba GServerContext.GetSessionInfo
                var l_oServerContext = (GParams)AppDomain.CurrentDomain.GetData(m_csSerializationName);     // public static members are thread safe.
                if (l_oServerContext != null)
                {  
                    lock (s_oLockSessionInfo)   // teorteticky bez zámku s použitím Hashtable.Synchronized(l_oServerContext.HtParams);
                    {                           // instance HashTable - GetParam - není thread safe
                        return l_oServerContext.GetParam(l_sUPId, GSessionInfo.SerializationName) as IGSessionInfo;
                    }
                }
                return null;
            }
        }

        /// <summary>název pro serializaci konfigurace</summary>
        private const string ConfigurationSerializationName = "Configuration";

        /// <summary>
        /// Pozor! vrací objekt! IGConfiguration je totiž v knihovně Gordic.General.ApplicationInterface
        /// Aktuální podoba Configuration (nebo null v případě, kdy zatím nebylo vytvořeno)
        /// </summary>
        public static object/*IGConfiguration*/ Configuration
        {
            get
            {
                var l_sUPId = GetUserProcessId();
                if (l_sUPId == null)
                    return null;
                // obdoba GServerContext.GetConfiguration
                var l_oServerContext = (GParams)AppDomain.CurrentDomain.GetData(m_csSerializationName);     // public static members are thread safe.
                if (l_oServerContext != null)
                {
                    lock (s_oLockConfiguration)   // teorteticky bez zámku s použitím Hashtable.Synchronized(l_oServerContext.HtParams);
                    {                           // instance HashTable - GetParam - není thread safe
                        return l_oServerContext.GetParam(l_sUPId, ConfigurationSerializationName) as object/* IGConfiguration*/;
                    }
                }
                return null;
            }
        }

        internal const string DefaultValue = "";

        /// <summary>
        /// DbSession
        /// </summary>
        public static string DbSession
        {
            get
            {
                var l_sUPId = GetUserProcessId();
                if (l_sUPId == null)
                    return "NoInit";
                // obdoba GServerContext.GetConfiguration
                var l_oServerContext = (GParams)AppDomain.CurrentDomain.GetData(m_csSerializationName);     // public static members are thread safe.
                if (l_oServerContext == null)
                    return "NoContext";
                var db = l_oServerContext.GetParam(l_sUPId, "Database") as object/* GDatabase*/;
                if (db == null)
                    return "NoConnect";

                var instId = db.GetType().GetProperty("InstanceId").GetValue(db).ToString();
                var sessId = db.GetType().GetProperty("SessionID").GetValue(db).ToString();
                if (sessId == int.MinValue.ToString()) return $"I{instId}";
                return $"I{instId}DB{sessId}";
            }
        }
        // pro každý typ by mohla být různá hodnota
        //private const string m_csDefaultIntValue = "0";
        //private const string m_csDefaultStringValue = "0";

        //kompletní přidání
        /*
        var l_oSessionInfo = GLogContext.SessionInfo;
        if (l_oSessionInfo != null)
            GLogContext.Int32Value(builder, l_oSessionInfo.LogPorCislo);
        else
            builder.Append(GLogContext.DefaultValue);
            */

        internal static void Int16Value(StringBuilder builder, GInt16 value)
        {
            if (value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        internal static void Int32Value(StringBuilder builder, GInt32 value)
        {
            if (value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        internal static void Int64Value(StringBuilder builder,GInt64 value) {
            if(value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        internal static void BoolValue(StringBuilder builder, GBoolean value)
        {
            if (value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        internal static void StringValue(StringBuilder builder, GString value)
        {
            if (value != null && !value.IsNullOrEmpty)
                builder.Append(value.BaseValueTrimmed);
            else
                builder.Append(DefaultValue);
        }

        internal static void DecimalValue(StringBuilder builder, GDecimal value)
        {
            if (value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        internal static void DateValue(StringBuilder builder, GDate value)
        {
            if (value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        internal static void DateTimeValue(StringBuilder builder, GDateTime value)
        {
            if (value != null && !value.IsNull)
                builder.Append(value.Value);
            else
                builder.Append(DefaultValue);
        }

        // var UserProcessId = CallContext.LogicalGetData(GCallContext.SerializationName);

        // AppDomain.CurrentDomain.GetData("ServerContext")
        // AppDomain.CurrentDomain.GetData("ServerContext")).HtGroups.Items[0]
        // AppDomain.CurrentDomain.GetData("ServerContext")).HtGroups.Items[UserProcessId]
        // GUserProcess.Current.UserProcessId

        /* 
        Alik: var UserProcessId = System.Runtime.Remoting.Messaging.CallContext.LogicalGetData(GCallContext.SerializationName);
        Alik: USerprocess ma metodu co to setuje:

        /// <summary>metoda volaná při nastavování kontextu pro vzdálené volání</summary>

        public virtual void OnSetCallContext() {

                System.Runtime.Remoting.Messaging.CallContext.LogicalSetData(GCallContext.SerializationName,UserProcessId);

        } // end method
        Alik: web aplikace to zajistuji aktualni
        Alik: appserver to zajistuje aktualni
        Alik: na TK se to nemeni po dobu behu, takze tam je to porad ok

        Alik: na ostrem AppServeru to bude jine ID na serveru nez na klientu. puvodne jsem mel stejne, ale neslo to
        Alik: nicmene to id pouzijes jen na nalezeni te Hashtable v Domene, k nicemu jinemu to stejne neni
             */



        // GUserProcess.Current nelze na aplikačním serveru použít, tam vůbec nemusí být klientská dll Gordic.Genaral.ApplicationClient

#if OLD
        /// <summary>aktuální uživatelský proces</summary>
        /// <remarks>není-li odpovídající instance uživatelského procesu nalezena, je vrácena hodnota null</remarks>
        public static GUserProcess Current
        {
            get
            {
                GUserProcess l_oUserProcess = null;
                if (HttpContext.Current == null)
                {
                    // běžná aplikace nebo služba
                    l_oUserProcess = AppDomain.CurrentDomain.GetData(SerializationName) as GUserProcess;
                }
                else
                {
                    if (HttpContext.Current.Items[SerializationName] != null)
                    {
                        // webová služba nebo webová aplikace založená na inicializační sekvenci
                        l_oUserProcess = HttpContext.Current.Items[SerializationName] as GUserProcess;
                    }
                    else if (HttpContext.Current.Session != null)
                    {
                        // klasická webová aplikace
                        l_oUserProcess = HttpContext.Current.Session[SerializationName] as GUserProcess;
                    } // end if
                    if (l_oUserProcess != null && l_oUserProcess.IsInitialized)
                    {
                        // nastavení kontextu pro vzdálené volání
                        var l_oCallContext = CallContext.LogicalGetData(GCallContext.SerializationName);
                        if (l_oCallContext == null || l_oUserProcess.UserProcessId != l_oCallContext.ToString()) l_oUserProcess.OnSetCallContext();
                    } // end if
                } // end if
                return l_oUserProcess;
            } // end method
        } // end property
#endif
    }
}
