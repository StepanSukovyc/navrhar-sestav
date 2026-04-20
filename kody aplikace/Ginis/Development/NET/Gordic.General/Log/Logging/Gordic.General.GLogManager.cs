//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogManager.cs                               </Name>
//    <Description> Vytváøí a spravuje instance <see cref="T:IGLogger" /> objektù.</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    using NLog.Common;
    using NLog.Config;
    using NLog.Internal;
    using NLog.Targets;
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Reflection;
    using System.Runtime.CompilerServices;

    /// <summary>
    /// Vytváøí a spravuje instance <see cref="T:IGLogger" /> objektù.
    /// </summary>
    public static class GLogManager
    {
        private const string s_csLogDir = "logdir";
        private const string s_csAppName = "appname";

        public static IGLogger SIEM => GetLogger("SIEM");
        public static IGLogger LICENSE => GetLogger("LICENSE");
        public static IGLogger SECURITY => GetLogger("SECURITY");
        public static IGLogger TRACES => GetLogger("TRACES");
        public static IGLogger CALLS => GetLogger("CALLS");
        public static IGLogger OAUTH => GetLogger("OAUTH");


        // díky vlastnosti readonly - mìlo by být thread safe (stejnì bez zámkù je i NLog.LogManager)

        // BUG!!! døíve s_oFactory = new NLog.LogFactory(); vytváøelo novou instanci!!!
        // byl rozdíl instancí s_oFactory a NLog.LogManager.LogFactory
        // i rozdíl instancí s_oFactory.Configuration (6 cílù) a NLog.LogManager.LogFactory.Configuration (5 cílù)
        private static readonly NLog.LogFactory s_oFactory = NLog.LogManager.LogFactory;    // !statická instance

        /// <summary>
        /// Gets the <see cref="NLog.LogFactory" /> instance used in the <see cref="GLogManager"/>.
        /// </summary>
        /// <remarks>Could be used to pass the to other methods</remarks>
        internal static NLog.LogFactory LogFactory => s_oFactory;

        ///// <summary>
        ///// InitTestLogging -  LogFactory.Configuration accessibility 
        ///// </summary>
        ///// <param name="target"></param>
        ///// <param name="config"></param>
        //public static void InitTestLogging(Target target, LoggingConfiguration config)
        //{
        //    if (LogFactory.Configuration == null)
        //    {
        //        VariableSet("IS_TEST", "true");
        //        LogFactory.ReconfigExistingLoggers();
        //    }

        //    LogFactory.Configuration = SetupNLog(
        //        target,
        //        config
        //    );
        //    CurrentClassLogger().Info("TEST logging initialized");
        //}

        //private static LoggingConfiguration SetupNLog(Target target, LoggingConfiguration config)
        //{

        //    if(config.AllTargets.FirstOrDefault(t => t.Name == "_test_console_") == null)
        //    {
        //        config.AddTarget(target);
        //        config.AddRuleForAllLevels(target);

        //        var traceTarget = new TraceTarget
        //        {
        //            Name = "_test_console_",
        //            Layout = "${logger} ${message}"   // Message format
        //        };
        //        config.AddTarget(traceTarget);
        //        config.AddRuleForAllLevels(traceTarget);
        //    }
        //    return config;
        //}

        /// <summary>
        /// Statický konstruktor
        /// </summary>
        static GLogManager()
        {
            GCommon.GeneralInitialize();    // obsahuje inicializaci logování (metoda mohla být zavolána klidnì døíve)
        }

        /// <summary>
        /// Získá zdroj zpráv <see cref="IGLogger"/>, jehož jméno se vezme z aktuální tøídy (obsahuje úplné jméno typu vèetnì namespace).
        /// </summary>
        /// <returns>Zdroj zpráv</returns>
        /// <remarks>Pomalu bìžící metoda (nepouštìt ve smyèce)</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static IGLogger CurrentClassLogger()
        {
            // pokud nemám instanci typu, tak zjištìní, kde zrovna stojím je hodnì pomalé
            var l_oLogger = s_oFactory.GetLogger(GStackTraceUsageUtils.GetClassFullName());

            var l_oLoggerInt = new GLoggerInt(l_oLogger);

            return l_oLoggerInt;
            //return factory.GetLogger(StackTraceUsageUtils.GetClassFullName());
        }

        ///// <summary>
        ///// Gets a custom logger with the full name of the current class, so namespace and class name.
        ///// Use <paramref name="loggerType"/> to create instance of a custom <see cref="Logger"/>.
        ///// If you haven't defined your own <see cref="Logger"/> class, then use the overload without the loggerType.
        ///// </summary>
        ///// <param name="loggerType">The logger class. This class must inherit from <see cref="Logger" />.</param>
        ///// <returns>The logger of type <paramref name="loggerType"/>.</returns>
        ///// <remarks>This is a slow-running method. 
        ///// Make sure you're not doing this in a loop.</remarks>
        //[CLSCompliant(false)]
        //[MethodImpl(MethodImplOptions.NoInlining)]
        //public static IGLogger GetCurrentClassLogger(Type loggerType)
        //{
        //    return factory.GetLogger(StackTraceUsageUtils.GetClassFullName(), loggerType);
        //}

        /// <summary>
        /// Získá zdroj zpráv <see cref="IGLogger"/>, jehož jméno bude urèeno parametrem.
        /// </summary>
        /// <param name="name">Vybrané jméno zdroje zpráv</param>
        // /// <returns>The logger reference. Multiple calls to <c>GetLogger</c> with the same argument aren't guaranteed to return the same logger reference.</returns>
        public static IGLogger GetLogger(string name)
        {
            var l_oLogger = s_oFactory.GetLogger(name);

            var l_oLoggerInt = new GLoggerInt(l_oLogger);

            return l_oLoggerInt;

            //return factory.GetLogger(name);
        }

        /// <summary>
        /// Získá zdroj zpráv <see cref="IGLogger"/>, jehož jméno bude odvozeno na základì pøedaného typu (obsahuje úplné jméno typu vèetnì namespace).
        /// </summary>
        /// <param name="type">Zadaný typ, ze kterého bude odvozen název <see cref="IGLogger"/></param>
        // /// <returns>The logger reference. Multiple calls to <c>GetLogger</c> with the same argument aren't guaranteed to return the same logger reference.</returns>
        public static IGLogger GetLogger(Type type)
        {
            if (type == null)
                return null;

            // pokud znám instanci typu, tak zjištìní typu je velmi rychlé
            var l_oLogger = s_oFactory.GetLogger(type.FullName);

            var l_oLoggerInt = new GLoggerInt(l_oLogger);

            return l_oLoggerInt;
        }

        ///// <summary>
        ///// Gets the specified named custom logger.
        ///// Use <paramref name="loggerType"/> to create instance of a custom <see cref="Logger"/>.
        ///// If you haven't defined your own <see cref="Logger"/> class, then use the overload without the loggerType.
        ///// </summary>
        ///// <param name="name">Name of the logger.</param>
        ///// <param name="loggerType">The logger class. This class must inherit from <see cref="Logger" />.</param>
        ///// <returns>The logger of type <paramref name="loggerType"/>. Multiple calls to <c>GetLogger</c> with the same argument aren't guaranteed to return the same logger reference.</returns>
        ///// <remarks>The generic way for this method is <see cref="NLog.LogFactory{loggerType}.GetLogger(string)"/></remarks>
        //[CLSCompliant(false)]
        //public static IGLogger GetLogger(string name, Type loggerType)
        //{
        //    return factory.GetLogger(name, loggerType);
        //}

        ///// <summary>
        ///// Dispose all targets, and shutdown logging.
        ///// </summary>
        //public static void Shutdown()
        //{
        //    factory.Shutdown();
        //}

        ///// <summary>
        ///// Variables defined in xml or in API. name is case case insensitive. 
        ///// </summary>
        ////private readonly ConcurrentDictionary<string, NLog.Layouts.SimpleLayout> _variables = new ConcurrentDictionary<string, SimpleLayout>(StringComparer.OrdinalIgnoreCase);
        //private readonly ThreadSafeDictionary<string, SimpleLayout> _variables = new ThreadSafeDictionary<string, SimpleLayout>(StringComparer.OrdinalIgnoreCase);

        //public static IDictionary<string, string> Variables


        /// <summary>
        /// Nastaví hodnotu promìnné (pozor název promìnné není case sensitive)
        /// </summary>
        /// <param name="name">Název nastavované promìnné  (pozor název promìnné není case sensitive)</param>
        /// <param name="value">Hodonta nastavované promìnné</param>
        public static void VariableSet(string name, string value)
        {
            if (string.IsNullOrEmpty(name))
                throw new GArgumentNullException(23300004, nameof(name));
            //if (string.IsNullOrEmpty(value))                          // výjimka na value tam nepatøí - legálnì mohu chtít promìnnou nastavit na null nebo String.Empty
            //    throw new GArgumentNullException(, nameof(value));

            if(s_oFactory.Configuration != null)
            {
                s_oFactory.Configuration.Variables[name] = value;   // threadovì bezpeèné - využívá ThreadSafeDictionary
            }
        }

        /// <summary>
        /// Získá natavenou hodnotu promìnné (pozor název promìnné není case sensitive)
        /// </summary>
        /// <param name="name">Název nastavované promìnné  (pozor název promìnné není case sensitive)</param>
        /// <returns>Natavená hodnotu promìnné</returns>
        public static string VariableGet(string name)
        {
            if (string.IsNullOrEmpty(name))
                throw new GArgumentNullException(23300005, nameof(name));

            var l_oSimpleLayout = s_oFactory.Configuration.Variables[name];   // problém s pøetypováním, threadovì bezpeèné - využívá ThreadSafeDictionary

            return l_oSimpleLayout.ToString();      // SimpleLayout musím pøetypovat na string
        }

        ///// <summary>
        ///// Gets the variables defined in the configuration.
        ///// </summary>
        //public static IDictionary<string, string> Variables => s_oFactory.Configuration.Variables.Cast<string, string>();   // problém s pøetypováním
        //public IDictionary<string, SimpleLayout> Variables => _variables;

        /// <summary>
        /// Provede incializaci logování
        /// </summary>
        /// <param name="logDir">Cesta ke složce s logy</param>
        /// <param name="appName">Název aplikace</param>
        /// <param name="preConfig"></param>
        public static void Initialize(string logDir, string appName, Action preConfig = null)
        {
            preConfig?.Invoke();
            GLogBase.CreateCondConfiguration();

            if (!string.IsNullOrEmpty(logDir))
                s_oFactory.Configuration.Variables[s_csLogDir] = logDir;

            if (!string.IsNullOrEmpty(appName))
                s_oFactory.Configuration.Variables[s_csAppName] = appName;

            s_oFactory.ReconfigExistingLoggers();
            s_oFactory.ResumeLogging();
        }
    }
}
