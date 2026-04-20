//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.EventHandlers.cs                         </Name>
//    <Description> delegat metod s dynamickým argumentem                       </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-01-30                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers
{
    #region EventHandlerDynamic
    /// <summary>
    /// delegat metod s dynamickým argumentem
    /// </summary>
    /// <param name="sender">objekt, který spustil událost</param>
    /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
    public delegate void EventHandlerDynamic(object sender, EventArgsDynamic e);

    /// <summary>
    /// Data události <see cref="EventHandlerDynamic"/>
    /// </summary>
    public class EventArgsDynamic : EventArgs
    {
        readonly dynamic argument;
        /// <summary>
        /// Data události
        /// </summary>
        public dynamic Argument { get { return argument; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="argument">argument dat</param>
        public EventArgsDynamic(dynamic argument)
        {
            this.argument = argument;
        }
    }
    #endregion

    #region EventHandlerListIComponent
    /// <summary>
    /// Delegát metody se stejným výsledkem jako argument
    /// </summary>
    /// <param name="sender">objekt, který spustil událost</param>
    /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
    public delegate void EventHandlerListIComponent(object sender, EventArgsListIComponent e);

    /// <summary>
    /// Data události <see cref="EventHandlerListIComponent"/>
    /// </summary>
    public class EventArgsListIComponent : EventArgs
    {
        readonly IList<IComponent> argument;
        /// <summary>
        /// Data události
        /// </summary>
        public IList<IComponent> Argument { get { return argument; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="argument">argument dat</param>
        public EventArgsListIComponent(IList<IComponent> argument)
        {
            this.argument = argument;
        }
    }
    #endregion

    #region EventHandlerChangePosition
    /// <summary>
    /// Delegát změny pozice stránky
    /// </summary>
    /// <param name="sender">objekt, který spustil událost</param>
    /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
    public delegate void EventHandlerChangePosition(object sender, EventArgsChangePosition e);

    /// <summary>
    /// Data události <see cref="EventHandlerChangePosition"/>
    /// </summary>
    public class EventArgsChangePosition : EventArgs
    {
        readonly int oldPosition;
        /// <summary>
        /// Stará pozice
        /// </summary>
        public int OldPosition { get { return oldPosition; } }

        readonly int newPosition;
        /// <summary>
        /// Nová pozice stránky
        /// </summary>
        public int NewPosition { get { return NewPosition1; } }

        public int NewPosition1 => newPosition;

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="oldPosition">Stará pozice stránky</param>
        /// <param name="newPosition">Nová pozice stránky</param>
        public EventArgsChangePosition(int oldPosition, int newPosition)
        {
            this.oldPosition = oldPosition;
            this.newPosition = newPosition;
        }
    }
    #endregion

    #region EventHandlerContextMenu
    /// <summary>
    /// Delegát metody na vytvoření kontextového menu
    /// </summary>
    /// <param name="sender">objekt, který spustil událost</param>
    /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
    public delegate void EventHandlerContextMenu(object sender, EventArgsContextMenu e);

    /// <summary>
    /// Data události <see cref="EventHandlerContextMenu"/>
    /// </summary>
    public class EventArgsContextMenu : EventArgs
    {
        readonly string path;
        /// <summary>
        /// Stará pozice
        /// </summary>
        public string Path { get { return path; } }

        object owner;
        /// <summary>
        /// Vlastník kontextové nabídky
        /// </summary>
        public object Owner { get { return owner; } set { owner = value; } } 

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="owner">Vlastník kontextového menu</param>
        /// <param name="path">Cesta ke konfiguračnímu stromu</param>
        public EventArgsContextMenu(string path, object owner = null)
        {
            this.path = path;
            this.owner = owner;
        }
    }
    #endregion

    #region EventHandlerSideTabItem
    /// <summary>
    /// delegát události nad záložky bočního panelu
    /// </summary>
    /// <param name="sender">objekt, který spustil událost</param>
    /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
    public delegate void EventHandlerSideTabItem(object sender, EventArgsSideTabItem e);

    /// <summary>
    /// Data události <see cref="EventHandlerSideTabItem"/>
    /// </summary>
    public class EventArgsSideTabItem : EventArgs
    {
        readonly SideTabItem tabItem;
        /// <summary>
        /// Vlastník kontextové nabídky
        /// </summary>
        public SideTabItem TabItem { get { return tabItem; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="tabItem">Položka záložky</param>
        public EventArgsSideTabItem(SideTabItem tabItem)
        {
            this.tabItem = tabItem;
        }
    }
    #endregion
}

