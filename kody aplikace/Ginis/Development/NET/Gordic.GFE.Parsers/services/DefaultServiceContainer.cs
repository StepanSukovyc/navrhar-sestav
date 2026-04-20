//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultServiceContainer.cs               </Name>
//    <Description> Výchozí kontainer služeb                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.ComponentModel.Design;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Výchozí kontainer služeb
    /// </summary>
    public class DefaultServiceContainer : IServiceContainer, IDisposable
    {
        IServiceContainer serviceContainer;
        Hashtable services = new Hashtable();
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public DefaultServiceContainer() { serviceContainer = new ServiceContainer(); }

        /// <exclude/>
        public DefaultServiceContainer(IServiceContainer parent)
        {
            serviceContainer = new ServiceContainer(parent);
        }

        #region IDispose
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (services != null)
                {
                    foreach (DictionaryEntry o in services)
                    {
                        if (o.Value == this)
                            continue;
                        if (o.Value is IDisposable disposeMe)
                            try { disposeMe.Dispose(); }
                            catch (Exception e) { MessageService.ShowError(e, GResources.GetResourceText(29450488) + ' ' + disposeMe); } //RC 29450488 : Chyba při uvolnění
                    }
                    services.Clear();
                }
                services = null;
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~DefaultServiceContainer() { Dispose(false); }
        #endregion

        #region IServiceContainer
        /// <summary>
        /// Odstranění služby
        /// </summary>
        /// <param name="serviceType"></param>
        /// <param name="promote"></param>
        public void RemoveService(System.Type serviceType, bool promote)
        {
            serviceContainer.RemoveService(serviceType, promote);
            if (services.Contains(serviceType))
                services.Remove(serviceType);
        }
        /// <summary>
        /// Odstranění služby
        /// </summary>
        /// <param name="serviceType"></param>
        public void RemoveService(System.Type serviceType)
        {
            serviceContainer.RemoveService(serviceType);
            if (services.Contains(serviceType))
                services.Remove(serviceType);
        }

        /// <exclude/>
        public void AddService(System.Type serviceType, System.ComponentModel.Design.ServiceCreatorCallback callback, bool promote)
        {
            if (IsServiceMissing(serviceType))
                serviceContainer.AddService(serviceType, callback, promote);
        }

        /// <exclude/>
        public void AddService(System.Type serviceType, System.ComponentModel.Design.ServiceCreatorCallback callback)
        {
            if (IsServiceMissing(serviceType))
                serviceContainer.AddService(serviceType, callback);
        }

        /// <exclude/>
        public void AddService(System.Type serviceType, object serviceInstance, bool promote)
        {
            if (IsServiceMissing(serviceType))
            {
                serviceContainer.AddService(serviceType, serviceInstance, promote);
                services.Add(serviceType, serviceInstance);
            }
        }

        /// <exclude/>
        public void AddService(System.Type serviceType, object serviceInstance)
        {
            if (IsServiceMissing(serviceType))
            {
                serviceContainer.AddService(serviceType, serviceInstance);
                services.Add(serviceType, serviceInstance);
            }
        }
        #endregion

        #region System.IServiceProvider
        /// <exclude/>
        public object GetService(System.Type serviceType) { return serviceContainer.GetService(serviceType); }  
        #endregion

        bool IsServiceMissing(Type serviceType)
        {
            return serviceContainer.GetService(serviceType) == null;
        }
    }
}
