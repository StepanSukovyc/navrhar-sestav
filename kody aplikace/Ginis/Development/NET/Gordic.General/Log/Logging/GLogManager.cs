//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogManager.cs                               </Name>
//    <Description> Vytváøí a spravuje instance <see cref="T:IGLogger" /> objektù.</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Reflection;
    using System.Runtime.CompilerServices;

    using NLog.Common;
    using NLog.Config;
    using NLog.Internal;

    /// <summary>
    /// Vytváøí a spravuje instance <see cref="T:IGLogger" /> objektù.
    /// </summary>
    public static class GLogManager
    {
        // BUG!!! døíve s_oFactory = new NLog.LogFactory(); vytváøelo novou instanci!!!
        // byl rozdíl instancí s_oFactory a NLog.LogManager.LogFactory
        // i rozdíl instancí s_oFactory.Configuration (6 cílù) a NLog.LogManager.LogFactory.Configuration (5 cílù)
        private static readonly NLog.LogFactory s_oFactory = NLog.LogManager.LogFactory;    // !statická instance

        /// <summary>
        /// Gets the <see cref="NLog.LogFactory" /> instance used in the <see cref="GLogManager"/>.
        /// </summary>
        /// <remarks>Could be used to pass the to other methods</remarks>
        internal static NLog.LogFactory LogFactory => s_oFactory;

        /// <summary>
        /// Získá zdroj zpráv <see cref="IGLogger"/> jehož jméno se vezme z aktuální tøídy (obsahuje namespace i jméno tøídy)
        /// </summary>
        /// <returns>Zdroj zpráv</returns>
        /// <remarks>Pomalu bìžící metoda (nepouštìt ve smyèce)</remarks>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static IGLogger CurrentClassLogger()
        {
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
        /// Získá zdroj <see cref="IGLogger"/>, jehož jméno se zvolí
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

            s_oFactory.Configuration.Variables[name] = value;   // threadovì bezpeèné - využívá ThreadSafeDictionary
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


    }
}
