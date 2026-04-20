//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPaneCollection.cs                  </Name>
//    <Description> Kolekce dokovatelných podoken                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Kolekce dokovatelných podoken
    /// </summary>
    [ComVisible(false)]
    public class DockPaneCollection : ReadOnlyCollection<DockPane>
	{
        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        internal DockPaneCollection()
            : base(new List<DockPane>())
        {
        }

        /// <summary>
        /// pøidání podokna do kolekce
        /// </summary>
        /// <param name="pane">pøidávané podokno</param>
        /// <returns>index posledního podokna</returns>
		internal int Add(DockPane pane)
		{
			if (Items.Contains(pane))
				return Items.IndexOf(pane);

			Items.Add(pane);
            return Count - 1;
		}
        
        /// <summary>
        /// vložení podokna do kolekce na urèité umístìní
        /// </summary>
        /// <param name="pane">pøidávané podokno</param>
        /// <param name="index">umístìní pøidávaného podokna</param>
		internal void AddAt(DockPane pane, int index)
		{
			if (index < 0 || index > Items.Count - 1)
				return;
			
			if (Contains(pane))
				return;

			Items.Insert(index, pane);
		}
        /// <summary>
        /// uvolnìní kolekce
        /// </summary>
		internal void Dispose()
		{
			for (int i=Count - 1; i>=0; i--)
				this[i].Close();
		}
        /// <summary>
        /// odstranìní podokna
        /// </summary>
        /// <param name="pane">podokno</param>
        internal void Remove(DockPane pane) { Items.Remove(pane); }
	}
}
