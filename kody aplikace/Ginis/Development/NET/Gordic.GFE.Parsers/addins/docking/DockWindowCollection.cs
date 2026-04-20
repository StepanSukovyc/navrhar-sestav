//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockWindowCollection.cs                </Name>
//    <Description> Kolekce dokovatelných oken                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Kolekce dokovatelných oken
    /// </summary>
    [ComVisible(false)]
    public class DockWindowCollection : ReadOnlyCollection<DockWindow>
	{
		internal DockWindowCollection(DockPanel dockPanel)
            : base(new List<DockWindow>())
		{
            Items.Add(new DockWindow(dockPanel, DockState.Document));
            Items.Add(new DockWindow(dockPanel, DockState.DockLeft));
            Items.Add(new DockWindow(dockPanel, DockState.DockRight));
            Items.Add(new DockWindow(dockPanel, DockState.DockTop));
            Items.Add(new DockWindow(dockPanel, DockState.DockBottom));
		}
        /// <summary>
        /// Získání okna dle stavu
        /// </summary>
        /// <param name="dockState">Stav hledaného okna</param>
        /// <returns></returns>
		public DockWindow this [DockState dockState]
		{
			get
			{
				if (dockState == DockState.Document)
					return Items[0];
				else if (dockState == DockState.DockLeft || dockState == DockState.DockLeftAutoHide)
					return Items[1];
				else if (dockState == DockState.DockRight || dockState == DockState.DockRightAutoHide)
					return Items[2];
				else if (dockState == DockState.DockTop || dockState == DockState.DockTopAutoHide)
					return Items[3];
				else if (dockState == DockState.DockBottom || dockState == DockState.DockBottomAutoHide)
					return Items[4];

				throw (new ArgumentOutOfRangeException());
			}
		}
	}
}
