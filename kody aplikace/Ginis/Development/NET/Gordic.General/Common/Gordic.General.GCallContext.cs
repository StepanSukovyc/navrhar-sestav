//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCallContext.cs                              </Name>
//    <Description> kontext pro vzdálenou aktivaci objektù                      </Description>
//    <Author>      Jan Kuttich                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2004-01-29                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Security;

namespace Gordic.General {

    /// <summary>kontext pro vzdálenou aktivaci objektù</summary>
    [Serializable]
    [DebuggerStepThrough]
    [SecurityCritical]
    public static class GCallContext {
        #region soukromé konstanty

        /// <summary>defaultní název pro serializaci</summary>
        [NonSerialized]
        private const string m_csSerializationName = "UserProcessId";

        /// <summary>název pro serializaci identifikátoru kontextu serverového vlákna</summary>
        [NonSerialized]
        private const string m_csProcessIdSerializationName = "GServerThreadProcessId";

        #endregion

        private static System.Threading.AsyncLocal<object> m_sUserProcessIdAsync = new System.Threading.AsyncLocal<object>();
        [SecurityCritical] 
        internal static void SetUserProcessIdAsync(string userProcessId) => m_sUserProcessIdAsync.Value = userProcessId;


        /// <summary>získání identifikátoru uživatelského procesu</summary>
        /// <param name="throwExceptions">pøíznak vyvolávání bìhových výjimek</param>
        /// <param name="returnNull">zda vrátit null, pokud nedošlo k dohledání. Jinak vrací string.Empty</param>
        /// <returns>identifikátor uživatelského procesu nebo string.Empty/null</returns>
        [SecurityCritical]
        public static string Internal_GetUserProcessId(bool throwExceptions, bool returnNull = false)
        {
            // získání identifikátoru uživatelského procesu z kontextu pro volání metod
            var l_sAsyncUserProcessId = m_sUserProcessIdAsync.Value;
            if (l_sAsyncUserProcessId != null) return l_sAsyncUserProcessId.ToString();

            var l_sUserProcessId = String.Empty;
#if !V524_1_OR_GREATER
            // z threadu
            object m_oThreadProcessId = System.Threading.Thread.GetData(System.Threading.Thread.GetNamedDataSlot(m_csProcessIdSerializationName));
            if (m_oThreadProcessId != null) return m_oThreadProcessId.ToString();

            // z remotingu
            var l_oCallContext = System.Runtime.Remoting.Messaging.CallContext.LogicalGetData(m_csSerializationName);
            if (l_oCallContext == null)
            {
                if (throwExceptions) throw new GException(21000105, 21090074); //RC-EX 21090074 : Nepodaøilo se získat identifikátor uživatelského procesu, kontext nebyl inicializován
            }
            else l_sUserProcessId = l_oCallContext.ToString();
#endif
            if (l_sUserProcessId == String.Empty)
            {
                if (throwExceptions) throw new GException(21000104, 21090073); //RC-EX 21090073 : Nepodaøilo se získat identifikátor uživatelského procesu, nepovolená hodnota
                if (returnNull) return null;
            }
            return l_sUserProcessId;
        }
        /// <summary>získání identifikátoru uživatelského procesu ale JEN za remoting nastavení!</summary>
        [SecurityCritical]
        public static object Internal_GetRemotingId()
        {
#if !V524_1_OR_GREATER
            return System.Runtime.Remoting.Messaging.CallContext.LogicalGetData(m_csSerializationName);
#else
            return m_sUserProcessIdAsync.Value;
#endif
        }

        /// <summary>nastavení identifikátoru uživatelského procesu pro AsyncLocal (Task)</summary>
        [SecurityCritical]
        public static void Internal_SetAsyncId(object threadProcessId)
        {
            m_sUserProcessIdAsync.Value = threadProcessId;
        }

        /// <summary>nastavení identifikátoru uživatelského procesu pro Thread (GServerThread)</summary>
        [SecurityCritical]
        public static void Internal_SetThreadId(object threadProcessId)
        {
#if !V524_1_OR_GREATER
            System.Threading.Thread.SetData(System.Threading.Thread.GetNamedDataSlot(m_csProcessIdSerializationName), threadProcessId);
#else
            m_sUserProcessIdAsync.Value = threadProcessId;
#endif
        }

        /// <summary>nastavení identifikátoru uživatelského procesu pro Remoting (klasický pøípad)</summary>
        [SecurityCritical]
        public static void Internal_SetRemotingId(object remotingProcessId)
        {
#if !V524_1_OR_GREATER
            System.Runtime.Remoting.Messaging.CallContext.LogicalSetData(m_csSerializationName, remotingProcessId);
#else
            m_sUserProcessIdAsync.Value = remotingProcessId;
#endif
        }

    } // end class

} // end namespace

