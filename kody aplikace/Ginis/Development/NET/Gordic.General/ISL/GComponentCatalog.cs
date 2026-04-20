//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GComponentCatalog.cs                         </Name>
//    <Description> Service oriented server activator                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                           </Copyright>
//    <Created>     2020-05-29                                                  </Created>
//  </FileHeader>

#if NETCOREAPP
using Microsoft.Extensions.DependencyInjection;
#endif
using System;
using System.Collections.Concurrent;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Client - based activator
    /// </summary>
    public class GComponentCatalog
    {
        /// <summary>
        /// Singletons - shared with GServiceCatalog for cooperation
        /// </summary>
        protected static readonly ConcurrentDictionary<Type, object> Singletons = new ConcurrentDictionary<Type, object>();

        static RuntimeStages Stage;
        static readonly object StageLock = new object();

        /// <summary>
        /// Register object for IoC
        /// </summary>
        /// <param name="appLogic">Type, or singleton object</param>
        public static void Register<T>(object appLogic) => Singletons.TryAdd(typeof(T), appLogic);

        /// <summary>
        /// ReplaceRegistration
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="appLogic"></param>
        /// <exception cref="NotImplementedException"></exception>
        public static void ReplaceRegistration<T>(object appLogic) => Singletons.AddOrUpdate(
            key: typeof(T),
            addValue: appLogic,
            updateValueFactory: (_, __) => appLogic
        );

        /// <summary>
        /// Get applogic with best match to interface
        /// Can be remoted
        /// </summary>
        /// <param name="allowNull"></param>
        /// <typeparam name="L">type of interface logic (IGApp...)</typeparam>
        /// <returns></returns>
        public static L Mediate<L>(bool allowNull = false)
        {
            if (Singletons.TryGetValue(typeof(L), out var singleton))
            {
                return singleton is Func<object> singletonFactory
                    ? (L)singletonFactory()
                    : (L)singleton;
            }

            if (allowNull)
            {
                return default;
            }

            throw new Exception($"Component [{typeof(L).AssemblyQualifiedName}] is not registered");
        }

        /// <summary>
        /// PrintRegistrations
        /// </summary>
        /// <param name="who"></param>
        /// <param name="logger"></param>
        public static void PrintRegistrations(string who, IGLogger logger)
        {
            if (logger.IsTraceEnabled)
            {
                logger.Trace("Component catalog: {who}", who);
                logger.Trace("----------------------------------------------------------");
                foreach (var item in Singletons)
                {
                    logger.Trace("{0} - {1}", item.Key.FullName, item.Value == null ? "NULL" : item.Value.GetType().FullName);
                }
            }
        }

        /// <summary>
        /// RaiseToStage
        /// </summary>
        /// <param name="stage"></param>
        public static void RaiseToStage(RuntimeStages stage)
        {
            lock (StageLock)
            {
                if (Stage < stage)
                {
                    Stage = stage;
                    // !!LINQ cannot call [SecurityCritical]
                    foreach (var raiseable in Singletons.Values.OfType<IGRaiseableRuntime>())
                    {
                        raiseable.RaiseToStage(stage);
                    }
                }
            }
        }

#if NETCOREAPP
        /// <summary>
        /// Register service catalog for .NET Core applications
        /// </summary>
        /// <param name="services"></param>
        public static void RegisterCoreServices(IServiceCollection services)
        {
            foreach (var singleton in Singletons)
            {
                switch (singleton.Value)
                {
                    case Func<object> singletonFactory:
                        // register as factory
                        services.AddTransient(
                            serviceType: singleton.Key,
                            implementationFactory: (_) => singletonFactory()
                        );
                        break;

                    default:
                        // register as instance
                        services.AddSingleton(
                            serviceType: singleton.Key,
                            implementationInstance: singleton.Value
                        );
                        break;
                }
            }
        }
#endif
    }
}
