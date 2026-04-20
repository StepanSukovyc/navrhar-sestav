//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogBase.cs                                      </Name>
//    <Description> Třída pro inicializaci a ukončení logování přes nlog        </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-02                                                  </Created>
//  </FileHeader>

using NLog;
using NLog.Config;
using NLog.LayoutRenderers;
using NLog.Layouts;
using NLog.Targets;
using NLog.Targets.Wrappers;
using System;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro inicializaci a ukončení logování přes nlog
    /// </summary>
    public class GLogBase
    {

        /// <summary>
        /// Provede inicializaci logování (musí být co nejdříve)
        /// </summary>
        public static void Init()
        {
            //InternalLogger.LogFile = @"c:\Users\mpokorny\Documents\Log\Testy\nlog-internal_code.log"; // PRÁVA!!?
            //InternalLogger.LogLevel = LogLevel.Info;
            //LogManager.ThrowExceptions = true;
            //LogManager.ThrowConfigExceptions = true;

            Register();                     // zaregistruje logovací součásti, musí být zavoláno velmi brzy (před prvním zápisem logu)

            BindConfigChanged();
            BindConfigReloaded();

            TryUpdateMessageLayout();
            //TryInsertCondEncodeWrapper();   // předpokládám, že uvnitř této metody se snad žádná událost ConfigurationChanged nebo ConfigurationReloaded nezavolá kvůli rekurzi/deadlock
        }

        /// <summary>
        /// Ukončí logování (dobré hlavně při logování do sítě (Http/Mail), kdy je omezený čas (např. 2 sek.) na ukončení procesu)
        /// </summary>
        public static void Close()
        {
            UnbindConfigChanged();
            UnbindConfigReloaded();

            LogManager.Shutdown();      /* Microsoft Windows give.NET applications a limited amount of time to perform shutdown(usually 2 sec) before 
            being terminated. If having a NLog configuration with NLog Targets that requires network - traffic(Http, Mail, Tcp), then it is a really 
            good idea to perform a manually Flush / Shutdown independent on running on Linux / Windows. */
        }

        /// <summary>
        /// Vypláchne logování (dobré hlavně při logování do sítě (Http/Mail), kdy je omezený čas (např. 2 sek.) na ukončení procesu)
        /// </summary>
        public static void Flush()
        {
            LogManager.Flush();/* Microsoft Windows give.NET applications a limited amount of time to perform shutdown(usually 2 sec) before 
            being terminated. If having a NLog configuration with NLog Targets that requires network - traffic(Http, Mail, Tcp), then it is a really 
            good idea to perform a manually Flush / Shutdown independent on running on Linux / Windows. */
        }

        /* private static Logger s_oLogger = LogManager.GetCurrentClassLogger(); 
         * nelze - při použití např. ${logporcislo} v konfiguraci padá na výjimku - že není zaregistrovaný LayoutRenderer
         * LayoutRenderer cannot be found: 'logporcislo' */
        //private static Logger s_oLogger;

        /// <summary>Zaregistruje logovací součásti, musí být zavoláno velmi brzy (před prvním zápisem logu)</summary>
        private static void Register()
        {   // může být zavoláno v aplikaci vícekrát, typicky je to nutné při pokusu o logování někde na úrovni 
            // Main -> před voláním static GUserProces konstruktoru

            // LayoutRenderers
            RegisterMessageRenderer();
#if OLD
            RegisterCondEncodeRenderer();
#endif
            RegisterHeaderLayoutRenderer();
#if NOTPUBLISHED            
            RegisterScopeContextLayoutRenderer();
#endif

            RegisterApplicationRenderers();
            RegisterLoginRenderers();
            RegisterSessionRenderers();
            RegisterJavaScriptRenderers();

            // Targets
            RegisterTargets();

            //GLayoutRenderers.Register();                    // 1. nejdřív registrace ${logporcislo}, apod. v
            //GTargets.Register();
        }

        private static void RegisterMessageRenderer()
        {
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GMessageLayoutRenderer>("message"));
#else
            LayoutRenderer.Register<GMessageLayoutRenderer>("message");
#endif
            //LayoutRenderer.Register("message:withexception=true", typeof(GMessageLayoutRenderer));
            //LayoutRenderer.Register("message", typeof(GMessageLayoutRenderer));
        }
#if OLD
        private static void RegisterCondEncodeRenderer()
        {
            //LayoutRenderer.Register<Gordic.General.HelloWorldLayoutRenderer>("hello-world"); //generic
            //LayoutRenderer.Register("hello-world", (info) => "hello world! 42"); //dynamic
            //ConfigurationItemFactory.Default.LayoutRenderers.RegisterDefinition("hello-world", typeof(Gordic.General.HelloWorldLayoutRenderer));

            // optimalizace - může být zavoláno v aplikaci vícekrát, aby se to nevolalo zbytečně

            LayoutRenderer.Register<GCondEncodeLayoutWrapper>("gcondencode");
            //LayoutRenderer.Register<GMessageLayoutRenderer>("gmessage");
        }
#endif

        private static void RegisterHeaderLayoutRenderer()
        {
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GHeaderLayoutRenderer>("header"));
#else
            LayoutRenderer.Register<GHeaderLayoutRenderer>("header");
#endif
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GStructureLayoutRenderer>("structure"));
        }
#if NOTPUBLISHED
        private static void RegisterScopeContextLayoutRenderer()
        {
            LayoutRenderer.Register<GNestedContextLayoutRenderer>("trace-id");
        }
#endif

        private static void RegisterApplicationRenderers()
        {
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GFazeLayoutRenderer>("faze"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GFazeGinLayoutRenderer>("fazegin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GFazeSesLayoutRenderer>("fazeses"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVerzeLayoutRenderer>("verze"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSubVerzeLayoutRenderer>("subverze"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRevizeLayoutRenderer>("revize"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRevizeGinLayoutRenderer>("revizegin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRevizeSesLayoutRenderer>("revizeses"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVerzeDbMinLayoutRenderer>("verzedbmin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSubVerzeDbMinLayoutRenderer>("subverzedbmin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRevizeAdzMinLayoutRenderer>("revizeadzmin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVerzeDbMin2LayoutRenderer>("verzedbmin2"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSubVerzeDbMin2LayoutRenderer>("subverzedbmin2"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRevizeAdzMin2LayoutRenderer>("revizeadzmin2"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDependantModulesLayoutRenderer>("dependantmodules"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDependantRevisionsLayoutRenderer>("dependantrevisions"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSubsystemLayoutRenderer>("subsystem"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GShortNameLayoutRenderer>("shortname"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNameLayoutRenderer>("name"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GTestVerzeDbLayoutRenderer>("testverzedb"));
#else
            LayoutRenderer.Register<GFazeLayoutRenderer>("faze");
            LayoutRenderer.Register<GFazeGinLayoutRenderer>("fazegin");
            LayoutRenderer.Register<GFazeSesLayoutRenderer>("fazeses");
            LayoutRenderer.Register<GVerzeLayoutRenderer>("verze");
            LayoutRenderer.Register<GSubVerzeLayoutRenderer>("subverze");
            LayoutRenderer.Register<GRevizeLayoutRenderer>("revize");
            LayoutRenderer.Register<GRevizeGinLayoutRenderer>("revizegin");
            LayoutRenderer.Register<GRevizeSesLayoutRenderer>("revizeses");
            LayoutRenderer.Register<GVerzeDbMinLayoutRenderer>("verzedbmin");
            LayoutRenderer.Register<GSubVerzeDbMinLayoutRenderer>("subverzedbmin");
            LayoutRenderer.Register<GRevizeAdzMinLayoutRenderer>("revizeadzmin");
            LayoutRenderer.Register<GVerzeDbMin2LayoutRenderer>("verzedbmin2");
            LayoutRenderer.Register<GSubVerzeDbMin2LayoutRenderer>("subverzedbmin2");
            LayoutRenderer.Register<GRevizeAdzMin2LayoutRenderer>("revizeadzmin2");
            LayoutRenderer.Register<GDependantModulesLayoutRenderer>("dependantmodules");
            LayoutRenderer.Register<GDependantRevisionsLayoutRenderer>("dependantrevisions");
            LayoutRenderer.Register<GSubsystemLayoutRenderer>("subsystem");
            LayoutRenderer.Register<GShortNameLayoutRenderer>("shortname");
            LayoutRenderer.Register<GNameLayoutRenderer>("name");
            LayoutRenderer.Register<GTestVerzeDbLayoutRenderer>("testverzedb");
#endif
        }

        private static void RegisterLoginRenderers()
        {
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GProfileLayoutRenderer>("profile"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GUserLayoutRenderer>("user"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLoginWinLayoutRenderer>("loginwin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GCompNameLayoutRenderer>("compname"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLoginAsDBALayoutRenderer>("loginasdba"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDatabaseTypeLayoutRenderer>("databasetype"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDatabaseLayoutRenderer>("database"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDataSourceLayoutRenderer>("datasource"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLoginDbLayoutRenderer>("logindb"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GAuthenticationTypeLayoutRenderer>("authenticationtype"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLayoutProviderTypeRenderer>("providertype"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GUseUnicodeLayoutRenderer>("useunicode"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIsAzureLayoutRenderer>("isazure"));
#else
            LayoutRenderer.Register<GProfileLayoutRenderer>("profile");
            LayoutRenderer.Register<GUserLayoutRenderer>("user");
            LayoutRenderer.Register<GLoginWinLayoutRenderer>("loginwin");
            LayoutRenderer.Register<GCompNameLayoutRenderer>("compname");
            LayoutRenderer.Register<GLoginAsDBALayoutRenderer>("loginasdba");
            LayoutRenderer.Register<GDatabaseTypeLayoutRenderer>("databasetype");
            LayoutRenderer.Register<GDatabaseLayoutRenderer>("database");
            LayoutRenderer.Register<GDataSourceLayoutRenderer>("datasource");
            LayoutRenderer.Register<GLoginDbLayoutRenderer>("logindb");
            LayoutRenderer.Register<GAuthenticationTypeLayoutRenderer>("authenticationtype");
            LayoutRenderer.Register<GLayoutProviderTypeRenderer>("providertype");
            LayoutRenderer.Register<GUseUnicodeLayoutRenderer>("useunicode");
            LayoutRenderer.Register<GIsAzureLayoutRenderer>("isazure");
#endif
        }

        private static void RegisterSessionRenderers()
        {
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GErrCodeLayoutRenderer>("errcode"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSqlErrLayoutRenderer>("sqlerr"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIsamErrLayoutRenderer>("isamerr"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GErrTextLayoutRenderer>("errtext"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLogPorCisloLayoutRenderer>("logporcislo"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsRefLayoutRenderer>("ixsref"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevRefLayoutRenderer>("nazevref"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GZkratkaLayoutRenderer>("zkratka"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsFunLayoutRenderer>("ixsfun"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevFunLayoutRenderer>("nazevfun"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsZmpLayoutRenderer>("ixszmp"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPrioritaMaxLayoutRenderer>("prioritamax"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GFcLayoutRenderer>("fc"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsOrjLayoutRenderer>("ixsorj"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevOrjLayoutRenderer>("nazevorj"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLdbLayoutRenderer>("Ldb"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPdbLayoutRenderer>("Pdb"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsInsLayoutRenderer>("ixsins"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsSuLayoutRenderer>("ixssu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLicAdrLayoutRenderer>("licadr"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GCsDbLayoutRenderer>("csdb"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GTypInstLayoutRenderer>("typinst"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPrizArchivLayoutRenderer>("prizarchiv"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPrizBlobLayoutRenderer>("prizblob"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsIsuLayoutRenderer>("ixsisu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVzkazyLayoutRenderer>("vzkazy"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDatAktLayoutRenderer>("datakt"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVerzeDbLayoutRenderer>("verzedb"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSubVerzeDbLayoutRenderer>("subverzedb"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevRfLayoutRenderer>("nazevrf"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GProjectLayoutRenderer>("project"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPrizDLayoutRenderer>("prizd"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevSuLayoutRenderer>("nazevsu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDatLoginLayoutRenderer>("datlogin"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevInsLayoutRenderer>("nazevins"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDatExpLayoutRenderer>("datexp"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRezimLayoutRenderer>("rezim"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPoradiLogLayoutRenderer>("poradilog"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GAktuzLayoutRenderer>("aktuz"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GTypAgLayoutRenderer>("typag"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsLpcLayoutRenderer>("ixslpc"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVysledekLayoutRenderer>("vysledek"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GFazeToReinstLayoutRenderer>("fazetoreinst"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPrizFLayoutRenderer>("prizf"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GExpTicLayoutRenderer>("exptic"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSessidLayoutRenderer>("sessid"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLogPorCisloKonLayoutRenderer>("logporcislokon"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GNazevRefKonLayoutRenderer>("nazevrefkon"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIpAdrKonLayoutRenderer>("ipadrkon"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDatLoginKonLayoutRenderer>("datloginkon"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLoginUzivKonLayoutRenderer>("loginuzivkon"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GSubVerzeAdzLayoutRenderer>("subverzeadz"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVodotiskLayoutRenderer>("vodotisk"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPrizTestLayoutRenderer>("priztest"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GVzkazTestLayoutRenderer>("vzkaztest"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsExuLayoutRenderer>("ixsexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPorCisExuLayoutRenderer>("porcisexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsEsuExuLayoutRenderer>("ixsesuexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLicEsuExuLayoutRenderer>("licesuexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GPorZasExuLayoutRenderer>("porzasexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GStuVerExuLayoutRenderer>("stuverexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GIxsUsrExuLayoutRenderer>("ixsusrexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GLastLoginExuLayoutRenderer>("lastloginexu"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GRevizeAdzLayoutRenderer>("revizeadz"));
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GDbSessionLayoutRenderer>("dbsession"));
#else            
            LayoutRenderer.Register<GErrCodeLayoutRenderer>("errcode");
            LayoutRenderer.Register<GSqlErrLayoutRenderer>("sqlerr");
            LayoutRenderer.Register<GIsamErrLayoutRenderer>("isamerr");
            LayoutRenderer.Register<GErrTextLayoutRenderer>("errtext");
            LayoutRenderer.Register<GLogPorCisloLayoutRenderer>("logporcislo");
            LayoutRenderer.Register<GIxsRefLayoutRenderer>("ixsref");
            LayoutRenderer.Register<GNazevRefLayoutRenderer>("nazevref");
            LayoutRenderer.Register<GZkratkaLayoutRenderer>("zkratka");
            LayoutRenderer.Register<GIxsFunLayoutRenderer>("ixsfun");
            LayoutRenderer.Register<GNazevFunLayoutRenderer>("nazevfun");
            LayoutRenderer.Register<GIxsZmpLayoutRenderer>("ixszmp");
            LayoutRenderer.Register<GPrioritaMaxLayoutRenderer>("prioritamax");
            LayoutRenderer.Register<GFcLayoutRenderer>("fc");
            LayoutRenderer.Register<GIxsOrjLayoutRenderer>("ixsorj");
            LayoutRenderer.Register<GNazevOrjLayoutRenderer>("nazevorj");
            LayoutRenderer.Register<GLdbLayoutRenderer>("Ldb");
            LayoutRenderer.Register<GPdbLayoutRenderer>("Pdb");
            LayoutRenderer.Register<GIxsInsLayoutRenderer>("ixsins");
            LayoutRenderer.Register<GIxsSuLayoutRenderer>("ixssu");
            LayoutRenderer.Register<GLicAdrLayoutRenderer>("licadr");
            LayoutRenderer.Register<GCsDbLayoutRenderer>("csdb");
            LayoutRenderer.Register<GTypInstLayoutRenderer>("typinst");
            LayoutRenderer.Register<GPrizArchivLayoutRenderer>("prizarchiv");
            LayoutRenderer.Register<GPrizBlobLayoutRenderer>("prizblob");
            LayoutRenderer.Register<GIxsIsuLayoutRenderer>("ixsisu");
            LayoutRenderer.Register<GVzkazyLayoutRenderer>("vzkazy");
            LayoutRenderer.Register<GDatAktLayoutRenderer>("datakt");
            LayoutRenderer.Register<GVerzeDbLayoutRenderer>("verzedb");
            LayoutRenderer.Register<GSubVerzeDbLayoutRenderer>("subverzedb");
            LayoutRenderer.Register<GNazevRfLayoutRenderer>("nazevrf");
            LayoutRenderer.Register<GProjectLayoutRenderer>("project");
            LayoutRenderer.Register<GPrizDLayoutRenderer>("prizd");
            LayoutRenderer.Register<GNazevSuLayoutRenderer>("nazevsu");
            LayoutRenderer.Register<GDatLoginLayoutRenderer>("datlogin");
            LayoutRenderer.Register<GNazevInsLayoutRenderer>("nazevins");
            LayoutRenderer.Register<GDatExpLayoutRenderer>("datexp");
            LayoutRenderer.Register<GRezimLayoutRenderer>("rezim");
            LayoutRenderer.Register<GPoradiLogLayoutRenderer>("poradilog");
            LayoutRenderer.Register<GAktuzLayoutRenderer>("aktuz");
            LayoutRenderer.Register<GTypAgLayoutRenderer>("typag");
            LayoutRenderer.Register<GIxsLpcLayoutRenderer>("ixslpc");
            LayoutRenderer.Register<GVysledekLayoutRenderer>("vysledek");
            LayoutRenderer.Register<GFazeToReinstLayoutRenderer>("fazetoreinst");
            LayoutRenderer.Register<GPrizFLayoutRenderer>("prizf");
            LayoutRenderer.Register<GExpTicLayoutRenderer>("exptic");
            LayoutRenderer.Register<GSessidLayoutRenderer>("sessid");
            LayoutRenderer.Register<GLogPorCisloKonLayoutRenderer>("logporcislokon");
            LayoutRenderer.Register<GNazevRefKonLayoutRenderer>("nazevrefkon");
            LayoutRenderer.Register<GIpAdrKonLayoutRenderer>("ipadrkon");
            LayoutRenderer.Register<GDatLoginKonLayoutRenderer>("datloginkon");
            LayoutRenderer.Register<GLoginUzivKonLayoutRenderer>("loginuzivkon");
            LayoutRenderer.Register<GSubVerzeAdzLayoutRenderer>("subverzeadz");
            LayoutRenderer.Register<GVodotiskLayoutRenderer>("vodotisk");
            LayoutRenderer.Register<GPrizTestLayoutRenderer>("priztest");
            LayoutRenderer.Register<GVzkazTestLayoutRenderer>("vzkaztest");
            LayoutRenderer.Register<GIxsExuLayoutRenderer>("ixsexu");
            LayoutRenderer.Register<GPorCisExuLayoutRenderer>("porcisexu");
            LayoutRenderer.Register<GIxsEsuExuLayoutRenderer>("ixsesuexu");
            LayoutRenderer.Register<GLicEsuExuLayoutRenderer>("licesuexu");
            LayoutRenderer.Register<GPorZasExuLayoutRenderer>("porzasexu");
            LayoutRenderer.Register<GStuVerExuLayoutRenderer>("stuverexu");
            LayoutRenderer.Register<GIxsUsrExuLayoutRenderer>("ixsusrexu");
            LayoutRenderer.Register<GLastLoginExuLayoutRenderer>("lastloginexu");
            LayoutRenderer.Register<GRevizeAdzLayoutRenderer>("revizeadz");
            LayoutRenderer.Register<GDbSessionLayoutRenderer>("dbsession");
#endif
        }

        private static void RegisterJavaScriptRenderers()
        {
            //LayoutRenderer.Register<GAuthorCodeLayoutRenderer>("authorcode");
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterLayoutRenderer<GClientDataLayoutRenderer>("clientData"));
#else
            LayoutRenderer.Register<GClientDataLayoutRenderer>("clientData");
#endif
            //LayoutRenderer.Register<GClientDateTimeLayoutRenderer>("clientDateTime");
        }

        private static void RegisterTargets()
        {
#if V524_1_OR_GREATER
            LogManager.Setup().SetupExtensions(ext => ext.RegisterTarget<GMemoryTarget>("memory"));
#else
            Target.Register<GMemoryTarget>("memory");
#endif
        }

        // nevím, jak si předat parametry?
        /*private static object SessionRender(LogEventInfo logEvent, LoggingConfiguration config)
        {
            var l_oSessionInfo = GLogContext.SessionInfo;
            if (l_oSessionInfo != null)
            {
                var l_nLogPorCislo = l_oSessionInfo.LogPorCislo;    // lock není potřeba - je tam jen vrácení uložené instance
                if (l_nLogPorCislo != null)
                {
                    return "s" + l_nLogPorCislo.BaseValue;       // v případě, kdy je LogPorCislo IsNull - vrátí BaseValue = 0
                }
            }

            return "0";
        }*/

        private readonly static Object s_oLockTryUpdate = new Object();

        private readonly static Object s_oLockBind = new Object();

        private readonly static Object s_oLockCreateConfiguration = new Object();

        /// <summary>
        /// Upraví konfiguraci u target, aby fungovolo šifrování.
        /// </summary>
        public static void TryUpdateMessageLayout()
        {
            // lokální proměnná - thread safe (není sdílená)
            bool l_bResultChanged = false;

            // lokální proměnná - thread safe - přiřazení - mělo by to být v pohodě...
            //var l_oConfig = LogManager.Configuration;       // pokud nlog konfigurace existuje - způsobí načtení konfigurace?
            var l_oConfig = GLogManager.LogFactory.Configuration;       // pokud nlog konfigurace existuje - způsobí načtení konfigurace?
            if (l_oConfig == null)      // hotfix - při puštění LK padá v InsertCondEncodeWrapper na NullReferenceException - konkrétně l_oConfig
            {
                return;       // neexistuje ještě nlog konfigurace => musím počkat na její načtení (nemusí k tomu dojít nikdy)
            }

            lock (s_oLockTryUpdate)
            {
                foreach (var target in l_oConfig.AllTargets)
                {
#if DEVELOP_VERSION || DEBUG
                    if (target is DebuggerTarget)  // úprava u všech target, až na VS Output, aby nebyl VS Output zakódovaný
                        continue;
                    //if (target is FileTarget l_oFileTarget)
#endif
                    // UpdateFileCondEncodeWrapper se nesmí volat podmíněně, ale pro včechny l_oFileTarget
                    bool l_bChanged = TryUpdateMessageLayout(target);
                    l_bChanged = l_bChanged | TryUpdateFileTarget(target);
                    //bool l_bChanged = TryUpdateMessageLayout(l_oFileTarget);
                    l_bResultChanged = l_bResultChanged || l_bChanged;
                }
            }

            // kvůli deadlock raději volání mimo lock
            if (l_bResultChanged)          // lokální proměnná - thread safe - snad
            {   // užitečné po programové úpravě konfigurace, aby se tato změna projevila
                GLogManager.LogFactory.ReconfigExistingLoggers();
                //LogManager.ReconfigExistingLoggers();
            }
        }

        /// <summary>
        /// Upraví konfiguraci u target, aby fungovolo šifrování <paramref name="target"/>
        /// </summary>
        /// <param name="target">Cíl, u něhož bude upravena konfigurace</param>
        /// <returns>Zda došlo k úpravě konfigurace</returns>
        public static bool TryUpdateMessageLayout(Target target)
        {
            bool l_bChanged = false;


#if !DEVELOP_VERSION && !DEBUG

            const string l_csMessageBefore = "${message:withexception=true}";
            const string l_csMessageAfter = "${message}";

            if (target is TargetWithLayout l_oTargetWithLayout &&
                l_oTargetWithLayout.Layout is Layout l_oLayout &&
                l_oLayout.ToString() is string l_sLayout)       // není už řetězec "${gcondencode:inner=" obsažen v layoutu?                
            {   // obecně tam může být něco takového nebo ${messege:raw=true,withException=true}
                if (l_sLayout.Contains(l_csMessageBefore))
                {
                    l_sLayout = l_sLayout.Replace(l_csMessageBefore, l_csMessageAfter);
                    //var l_sLayout = l_oSimpleLayout.Text;    // nepoužívat l_oFileTarget.Layout.ToString() - občas dělá apostrofy na začátku a konci

                    l_oTargetWithLayout.Layout = l_sLayout; // konverze z řetězce

                    l_bChanged = true;
                }
            }
#else
            const string l_csMessageBefore = "${message:withexception=true}";
            const string l_csMessageAfter = "${message}";
            // FFIALA 2025 - 04 - 22 BEGIN nová varianta <targets async = "true" >
            {
                if (target is AsyncTargetWrapper l_oTargetTrace &&
                    l_oTargetTrace.WrappedTarget is DebuggerTarget l_oDebuggerTarget && l_oDebuggerTarget.Layout is Layout l_oLayoutTrace &&
                    l_oLayoutTrace.ToString() is string l_sLayoutTrace)       // není už řetězec "${gcondencode:inner=" obsažen v layoutu?                
                {   // obecně tam může být něco takového nebo ${messege:raw=true,withException=true}
                    if (l_sLayoutTrace.Contains(l_csMessageAfter))
                    {  // TRACE target donutím takto !!nešifrovat!!
                        l_sLayoutTrace = l_sLayoutTrace.Replace(l_csMessageAfter, l_csMessageBefore);
                        l_oDebuggerTarget.Layout = l_sLayoutTrace; // konverze z řetězce
                        l_bChanged = true;
                    }
                }
            }
            // FFIALA 2025-04-22 END

            // FFIALA 2025-04-30 BEGIN - původní chování pro <targets async="false">
            {
                if (target is Target l_oTargetTrace)
                    if (l_oTargetTrace is TargetWithLayout targetWithLayout &&
                        targetWithLayout.Layout is Layout l_oLayoutTrace &&
                        l_oLayoutTrace.ToString() is string l_sLayoutTrace)       // není už řetězec "${gcondencode:inner=" obsažen v layoutu?                
                    {   // obecně tam může být něco takového nebo ${messege:raw=true,withException=true}
                        if (l_sLayoutTrace.Contains(l_csMessageAfter))
                        {  // TRACE target donutím takto !!nešifrovat!!
                            l_sLayoutTrace = l_sLayoutTrace.Replace(l_csMessageAfter, l_csMessageBefore);
                            targetWithLayout.Layout = l_sLayoutTrace; // konverze z řetězce
                            l_bChanged = true;
                        }
                    }
            }
            // FFIALA 2025-04-30 END
#endif

            return l_bChanged;
        }

        /// <summary>
        /// Upraví konfiguraci u target, aby byla přidaná povinná hlavička u <paramref name="target"/>
        /// </summary>
        /// <param name="target">Cíl, u něhož bude upravena konfigurace</param>
        /// <returns>Zda došlo k úpravě konfigurace</returns>
        public static bool TryUpdateFileTarget(Target target)
        {
            bool l_bChanged = false;

            const string l_csStructure = "${structure}";

            if (target is FileTarget l_oFileTarget)      
            {
                if (l_oFileTarget.Header == null)
                {
                    l_oFileTarget.Header = l_csStructure;
                    l_bChanged = true;
                }
                else
                {
                    string l_sHeader = l_oFileTarget.Header.ToString();
                    if (!l_sHeader.Contains(l_csStructure))
                    {
                        l_oFileTarget.Header = l_csStructure;
                        l_bChanged = true;
                    }
                }

                if (!l_oFileTarget.WriteBom)
                {
                    l_oFileTarget.WriteBom = true;
                    l_bChanged = true;
                }
            }

            return l_bChanged;
        }


        /*   /// <summary>
           /// Přidá podmíněné šifrování k <paramref name="fileTarget"/>. Pokud už tam šifrování bylo předtím, k žádné změně nedojde.
           /// </summary>
           /// <param name="fileTarget">Soubor, u něhož bude přidáno šifrování</param>
           /// <returns>Zda došlo k přidání šifrování</returns>
           [Obsolete("Už není potřeba, kódování obsahu dělá nově přímo přetížený $message (MessageLayoutRender)")]
           public static bool TryUpdateFileCondEncodeWrapper(FileTarget fileTarget)
           {
               bool l_bChanged = false;

               const string l_csMessageBegin = "${message";
               const string l_csMessageEnd = "}";
               const string l_csGCondEncodeBegin = "${gcondencode:inner=";
               const string l_csGCondEncodeEnd = "}";

               // TODO: přidat podporu pro LayoutWithHeaderAndFooter, CompoundLayout a další (jde to nějak obecně pro všechny?)
               if (fileTarget.Layout is SimpleLayout l_oSimpleLayout &&
                   l_oSimpleLayout.Text != null &&
                   !l_oSimpleLayout.Text.Contains(l_csGCondEncodeBegin))       // není už řetězec "${gcondencode:inner=" obsažen v layoutu?
               {   // obecně tam může být něco takového nebo ${messege:raw=true,withException=true}
                   var l_sLayout = l_oSimpleLayout.Text;    // nepoužívat l_oFileTarget.Layout.ToString() - občas dělá apostrofy na začátku a konci
                   int l_nIndexEnd = -1;
                   int l_nIndexStart = l_sLayout.IndexOf(l_csMessageBegin);
                   if (l_nIndexStart >= 0)
                       l_nIndexEnd = l_sLayout.IndexOf(l_csMessageEnd, l_nIndexStart);

                   if (l_nIndexStart >= 0 && l_nIndexEnd >= 0)
                   {
                       // zjednodušeně chcheme l_sLayout.Replace("${messege}", "${gcondencode:inner=${message}}");
                       var l_sMessage = l_sLayout.Substring(l_nIndexStart, (l_nIndexEnd - l_nIndexStart) + l_csMessageEnd.Length);
                       var l_sMessagePreffix = l_sLayout.Substring(0, l_nIndexStart);
                       var l_sMessageSuffix = l_sLayout.Substring(l_nIndexEnd + l_csMessageEnd.Length, l_sLayout.Length - (l_nIndexEnd + l_csMessageEnd.Length));

                       l_sLayout = l_sMessagePreffix + l_csGCondEncodeBegin + l_sMessage + l_csGCondEncodeEnd + l_sMessageSuffix;

                       fileTarget.Layout = new SimpleLayout(l_sLayout);
                       l_bChanged = true;
                   }
               }

               return l_bChanged;
           }*/

        private static void BindConfigReloaded()
        {
            // zaregistruje událost, kdy se konfigurace nahraje podruhé - Reloaded
            lock (s_oLockBind)
            {
                // thread safe +=: For the +=, that depends on how the event is implemented. If it is implemented as a field-like event, i.e. public event SomeEventType EventReceived; it is thread-safe.
#if V524_1_OR_GREATER
                //nahrazeno od NLog 5.2 za ConfigurationChanged,
                //že došlo k Reloadu se dá rozlišit podle e.ActivatedConfiguration !=  null
                //GLogManager.LogFactory.ConfigurationReloaded -= LogManager_ConfigurationReloaded;
                //GLogManager.LogFactory.ConfigurationReloaded += LogManager_ConfigurationReloaded;
#else
                GLogManager.LogFactory.ConfigurationReloaded -= LogManager_ConfigurationReloaded;
                GLogManager.LogFactory.ConfigurationReloaded += LogManager_ConfigurationReloaded;
#endif
                //LogManager.ConfigurationReloaded -= LogManager_ConfigurationReloaded;
                //LogManager.ConfigurationReloaded += LogManager_ConfigurationReloaded;
            }
        }

        private static void BindConfigChanged()
        {
            // zaregistruje událost, kdy se konfigurace načte poprvé?
            lock (s_oLockBind)
            {
                // thread safe +=: For the +=, that depends on how the event is implemented. If it is implemented as a field-like event, i.e. public event SomeEventType EventReceived; it is thread-safe.
                GLogManager.LogFactory.ConfigurationChanged -= LogManager_ConfigurationChanged;
                GLogManager.LogFactory.ConfigurationChanged += LogManager_ConfigurationChanged;
                //LogManager.ConfigurationChanged -= LogManager_ConfigurationChanged;
                //LogManager.ConfigurationChanged += LogManager_ConfigurationChanged;
            }
        }

        private static void UnbindConfigReloaded()
        {
            lock (s_oLockBind)
            {
#if V524_1_OR_GREATER
                //nahrazeno od NLog 5.2 za ConfigurationChanged,
                //že došlo k Reloadu se dá rozlišit podle e.ActivatedConfiguration !=  null
                //GLogManager.LogFactory.ConfigurationReloaded -= LogManager_ConfigurationReloaded;
#else
                GLogManager.LogFactory.ConfigurationReloaded -= LogManager_ConfigurationReloaded;
#endif
                //LogManager.ConfigurationReloaded -= LogManager_ConfigurationReloaded;
            }
        }

        private static void UnbindConfigChanged()
        {
            lock (s_oLockBind)
            {
                GLogManager.LogFactory.ConfigurationChanged -= LogManager_ConfigurationChanged;
                //LogManager.ConfigurationChanged -= LogManager_ConfigurationChanged;
            }
        }
#if V524_1_OR_GREATER
        //private static void LogManager_ConfigurationReloaded(object sender, LoggingConfigurationReloadedEventArgs e)
        //{
        //    TryUpdateMessageLayout();   // předpokládám, že uvnitř této metody se snad žádná událost ConfigurationChanged nebo ConfigurationReloaded nezavolá kvůli rekurzi/deadlock
        //}
#else
        private static void LogManager_ConfigurationReloaded(object sender, LoggingConfigurationReloadedEventArgs e)
        {
            TryUpdateMessageLayout();   // předpokládám, že uvnitř této metody se snad žádná událost ConfigurationChanged nebo ConfigurationReloaded nezavolá kvůli rekurzi/deadlock
        }
#endif
        private static void LogManager_ConfigurationChanged(object sender, LoggingConfigurationChangedEventArgs e)
        {
            // if (e.ActivatedConfiguration !=  null) 
            // takto můžu teoreticky rozlišit, zda se jedná o Reload (zrušeno obsolete)
            TryUpdateMessageLayout();   // předpokládám, že uvnitř této metody se snad žádná událost ConfigurationChanged nebo ConfigurationReloaded nezavolá kvůli rekurzi/deadlock
        }

        /// <summary>
        /// Vytvoří novou instanci Configuration v případě, že konfigurace neexistuje (typicky v případech, kdy je LogManager.Configuration == null)
        /// </summary>
        public static void CreateCondConfiguration()
        {
            lock (s_oLockCreateConfiguration)
            {
                var l_oFactory = GLogManager.LogFactory;

                if (l_oFactory.Configuration == null)
                    l_oFactory.Configuration = new LoggingConfiguration();
            }

            //TryUpdateMessageLayout();
        }

    }
}
