//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GUnifiedLogging.cs                           </Name>
//    <Description> Unified logging                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-11-07                                                  </Created>
//  </FileHeader>

using NLog;
using System;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Unified logging
    /// Don not use IoC here - it's too early
    /// </summary>
    public static class GUnifiedLogging
    {
        static string Faze;
        static string Source = "Custom";

        /// <summary>
        /// Initialize 05 app
        /// </summary>
        /// <param name="faze"></param>
        public static void Initialize05(string faze)
        {
            Faze = faze;
            LogManager.Setup().SetupExtensions(s =>
            {
                s.LogFactory.KeepVariablesOnReload = true;
                s.LogFactory.SuspendLogging();
                if(s.LogFactory.Configuration != null)
                {
                    s.LogFactory.Configuration.Variables.Add("faze", Faze);
                    s.LogFactory.Configuration.Variables.Add("revize", "---");
                }
            });
        }

        /// <summary>
        /// Print some info
        /// </summary>
        public static void Start(string appName, Func<Dictionary<string, string>> additionalVariables = null)
        {
            var variables = additionalVariables == null ? 
                new Dictionary<string, string>()
                {
                    { "app_name", appName }
                }
                : additionalVariables();

            var logDir = string.Empty;
            variables.TryGetValue("logdir", out logDir);
            if(string.IsNullOrEmpty(logDir))
            {
                logDir = ResolveLogDir();
            }
            variables["logdir"] = logDir;
            
            LogManager.Setup().SetupExtensions(s =>
            {
                foreach (var variable in variables)
                {
                    if(!s.LogFactory.Configuration.Variables.ContainsKey(variable.Key))
                    {
                        s.LogFactory.Configuration.Variables[variable.Key] = variable.Value;
                    }
                }
            });

            GLogManager.Initialize(logDir, appName);

            var logger = GLogManager.CurrentClassLogger();
            logger.Info("======");
            logger.Info("=== ULogging re-configured");
            logger.Info("=== Source [{Source}]", Source);
            foreach (var variable in variables)
            {
                logger.Info("=== [{Variable}] => {Value}", variable.Key, variable.Value);

            }
            logger.Info("======");
        }

        public static string ResolveLogDir()
        {
            var logDir = Environment.GetEnvironmentVariable("GINIS_LOG");
            if (logDir != null)
            {
                Source = "Environment";
                return logDir;
            }

            Source = "Default";
            return "C:\\Log";
        }
    }
}
