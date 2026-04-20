//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FloatWindowCollection.cs               </Name>
//    <Description> Kolekce plovoucích oken                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Kolekce plovoucích oken
    /// </summary>
    [ComVisible(false)]
    public class FloatWindowCollection : ReadOnlyCollection<FloatWindow>
	{
		internal FloatWindowCollection()
            : base(new List<FloatWindow>())
		{
		}

		internal int Add(FloatWindow fw)
		{
			if (Items.Contains(fw))
				return Items.IndexOf(fw);

			Items.Add(fw);
            return Count - 1;
		}

		internal void Dispose()
		{
			for (int i=Count - 1; i>=0; i--)
				this[i].Close();
		}

		internal void Remove(FloatWindow fw)
		{
			Items.Remove(fw);
		}

		internal void BringWindowToFront(FloatWindow fw)
		{
			Items.Remove(fw);
			Items.Add(fw);
		}
	}
}
