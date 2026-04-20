//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IDEContainer.cs                        </Name>
//    <Description> IDE kontainer pro připojení tabulky k designeru             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-30                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// IDE kontainer pro připojení tabulky k designeru
    /// </summary>
    class IDEContainer : Container
    {
        IServiceProvider serviceProvider;
        IComponent grid;
        GridItem item = null;
        bool isDisposed = false;
        /// <summary>
        /// vybraná položka tabulky vlastnosti
        /// </summary>
        public GridItem Item { get { return isDisposed ? null : item; } set { item = value; if (value == null) isDisposed = true; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public IDEContainer() { }

        /// <exclude/>
        protected override object GetService(Type serviceType)
        {
            object service = base.GetService(serviceType);
            PropertyGrid pG = grid as PropertyGrid;
            if (pG != null
                && pG.SelectedGridItem != null
                && pG.SelectedGridItem.PropertyDescriptor != null
                && item != pG.SelectedGridItem)
            {
                item = pG.SelectedGridItem;
                isDisposed = false;
            }
            if (service == null && serviceProvider != null)
                service = serviceProvider.GetService(serviceType);
            return service;
        }

        /// <summary>
        /// Připojení tabulky vlastností k poskytovateli služeb
        /// </summary>
        /// <param name="grid">Připojovaná tabulka</param>
        /// <param name="host">Poskytovatel služeb</param>
        internal void ConnectGridAndHost(IComponent grid, IServiceProvider host)
        {
            if (this.grid != null || this.serviceProvider != null)
                Disconnect();
                //throw new InvalidOperationException("Tabulka musí být odpojen jako první.");
            LoggingService.Debug(string.Join(" ", "IDEContainer:", GResources.GetResourceText(29450385))); //RC 29450385 : Připojení tabulky vlastností k poskytovatelu služeb
            this.serviceProvider = host;
            this.grid = grid;
            this.Add(grid);
        }
        /// <summary>
        /// Odpojení tabulky vlastností od poskytovatele služeb
        /// </summary>
        internal void Disconnect()
        {
            if (this.Components.Count == 0) return;
            LoggingService.Debug(string.Join(" ", "IDEContainer:", GResources.GetResourceText(29450386))); //RC 29450386 : Odpojení tabulky vlastností od poskytovatele služeb
            this.Remove(grid);
            this.grid = null;
            this.serviceProvider = null;
            this.item = null;
            isDisposed = true;
        }
    }
}
