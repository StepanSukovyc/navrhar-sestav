//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GExceptionDetails.cs                         </Name>
//    <Description> Třída pro získání podrobných informací o výjimce            </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-10-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro získání podrobných informací o výjimce
    /// </summary>
    [System.Security.SecuritySafeCritical]
    public class GExceptionDetails : IGObject
    {
        private static readonly IGLogger Log = GLogManager.CurrentClassLogger();
        private string m_sText;

        /// <summary>
        /// Kompletní text výjimky
        /// </summary>
        public string Text
        {
            get { return m_sText; }
        }


        /// <summary>veřejný konstruktor</summary>
        /// <param name="exception">zdrojová výjimka</param>
        public GExceptionDetails(GException exception) //: this(exception, true)
        {
        } // end method

        // pozor! IGConfiguration je v Gordic.General.ApplicationInterface!

        /// <summary>veřejný konstruktor</summary>
        /// <param name="exception">zdrojová výjimka</param>
        /// <param name="applicationInfo">rozhraní na informace o aplikaci</param>
        /// <param name="configuration">rozhraní na konfiguraci aplikace</param>
        /// <param name="loginInfo">rozhraní na informace o požadavku na přihlášení</param>
        /// <param name="sessionInfo">rozhraní na informace o přihlášení do systému</param>
        public GExceptionDetails(GException exception, IGApplicationInfo applicationInfo,/*IGConfiguration*/object configuration, IGLoginInfo loginInfo, IGSessionInfo sessionInfo)
        //: this(exception, false)
        {
            try // dynamic invoke "Gordic.General.ApplicationInterface.GExceptionInfo"
            {
                bool l_bNoContext = applicationInfo == null && configuration == null && loginInfo == null && sessionInfo == null;

                var l_oAssembly = LoadAssembly("Gordic.General.ApplicationInterface");
                Type l_oExceptionInfoType = l_oAssembly.DefinedTypes.Where(type => type.Name == "GExceptionInfo").FirstOrDefault();

                ConstructorInfo l_oExceptionInfoCtor = null;
                if (l_oExceptionInfoType != null)
                    l_oExceptionInfoCtor = GetConstructor(l_bNoContext, l_oExceptionInfoType);

                #region Inspirace pro l_bNoContext
                /* public GExceptionInfo GetExceptionInfo(GException exception) {
                 * if(IsInitialized) return CoreServerLogic.GetExceptionInfo(exception); // volá na pozadí try pro new GExceptionInfo(exception,ApplicationInfo,Configuration,LoginInfo,SessionInfo);
                    else return new GExceptionInfo(exception);*/
                #endregion

                object l_oExceptionInfo = null;    // instance
                if (l_oExceptionInfoCtor != null)   // public GExceptionInfo(GException exception,IGApplicationInfo applicationInfo,IGConfiguration configuration,IGLoginInfo loginInfo,IGSessionInfo sessionInfo) 
                    if (l_bNoContext)
                    {
                        l_oExceptionInfo = l_oExceptionInfoCtor.Invoke(new object[] { exception });
                    }
                    else
                    {
                        try
                        {
                            l_oExceptionInfo = l_oExceptionInfoCtor.Invoke(new object[] { exception, applicationInfo, configuration, loginInfo, sessionInfo });
                        }
                        catch (Exception/* ex*/)
                        {
                            l_oExceptionInfoCtor = GetConstructor(true, l_oExceptionInfoType); // získá základní konstruktor při výjimce

                            l_oExceptionInfo = l_oExceptionInfoCtor.Invoke(new object[] { exception });
                            //m_sText = String.Empty;
                            //Log.Warn(GResources.GetResourceText(23320003, exception?.ToString() ?? "null", ex?.ToString() ?? "null")); //RC 23320003 : Při získávání podrobných informací o výjimce {0} došlo k chybě {1}.
                        }
                        
                    }

                #region Vybrané vlastnosti třídy GExceptionInfo
                /* 
        /// <summary>text původní výjimky, tj. výjimky nejvíce zanořené v posloupnosti výjimek</summary>
        public string BaseMessage {
        /// <summary>prostý text výjimky bez předpony</summary>
        public string ShortMessage {
        /// <summary>text výjimky s předponou</summary>
        public string Message {
        /// <summary>text výjimky včetně předpony a textů všech vnořených výjimek</summary>
        public string LongMessage {
        /// <summary>kompletní text výjimky včetně podrobností a výpisu zásobníku</summary>
        public string CompleteMessage {
         */
                #endregion
                var l_oExceptionInfoProp = l_oExceptionInfoType.GetProperty("CompleteMessage");  // nebo LongMessage?

                object l_oCompleteMessage = null;

                if (l_oExceptionInfoProp != null)
                    l_oCompleteMessage = l_oExceptionInfoProp.GetValue(l_oExceptionInfo);

                m_sText = l_oCompleteMessage.ToString();
            }
            catch (Exception ex)
            {
                m_sText = String.Empty;
                Log.Warn(GResources.GetResourceText(23320004, exception?.ToString() ?? "null", ex?.ToString() ?? "null")); //RC 23320004 : Při získávání podrobných informací o výjimce {0} došlo k chybě {1}.
            }
        }

        private static ConstructorInfo GetConstructor(bool noContext, Type exceptionInfoType)
        {
            return 
                exceptionInfoType.
                GetConstructors().
                FirstOrDefault(constr => constr.GetParameters().Length == (noContext ? 1 : 5));
        }

        //------------------------------------------------------------------
        /// <summary>načtení assembly</summary>
        private Assembly LoadAssembly(string assemblyName)
        {
            Assembly l_oAssembly = null;
            try
            {
                //DNP ma Resolver, ktery potrebuje alespon jednu carku ve jmene.
                //if(assemblyName.Contains(',')==false)
                //Version neznam a nechci ji zjistovat
                //Assembly assembly = Assembly.GetExecutingAssembly();
                //var fvi = System.Diagnostics.FileVersionInfo.GetVersionInfo(assembly.Location);
                //string version = fvi.FileMajorPart.ToString();
                assemblyName += ", Culture=neutral, PublicKeyToken=44b0e1e139828386";
                l_oAssembly = Assembly.Load(assemblyName);
            }
            catch (Exception ex)
            {
                //alternativni zpusob loadnuti z absolutni cesty v GINIS\GIN
                //string l_sPath = System.IO.Path.Combine(Gordic.General.GApplicationInfo.GetInstallPath(), "GIN", assemblyName + ".dll");
                //if (System.IO.File.Exists(l_sPath))
                //    l_oAssembly = Assembly.LoadFrom(l_sPath);
                //else
                {
                    System.Diagnostics.Debug.WriteLine("LoadAssembly err: " + ex.ToString());
                    return null;
                }
            }
            if (l_oAssembly != null) CheckAssemblyPublicKey(l_oAssembly);   // tohle je bez catche - musí vyhodit tvrdou výjimku
            return l_oAssembly;
        }

        private static void CheckAssemblyPublicKey(Assembly assembly)
        {
            const string l_sFindString = "PublicKeyToken=";
            string l_sLoadedAssemblyFullName = assembly.FullName;
            string l_sCurrentAssemblyFullName = typeof(IGObject).Assembly.FullName;
            string l_sLoadedAssemblyToken = l_sLoadedAssemblyFullName.Substring(l_sLoadedAssemblyFullName.IndexOf(l_sFindString));
            string l_sCurrentAssemblyToken = l_sCurrentAssemblyFullName.Substring(l_sCurrentAssemblyFullName.IndexOf(l_sFindString));

            if (l_sLoadedAssemblyToken != l_sCurrentAssemblyToken)
                throw new GException(23300007, 23320005, l_sLoadedAssemblyToken, l_sCurrentAssemblyToken); //RC-EX 23320005 : Knihovnu se nepodařilo nahrát z důvodu neshody PublicKeyToken: '{0}', '{1}'.
        }

    }
}
