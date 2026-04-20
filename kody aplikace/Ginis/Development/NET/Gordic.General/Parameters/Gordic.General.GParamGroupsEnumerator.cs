//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GParamGroupsEnumerator.cs    </Name>
//    <Description> enumerátor skupin parametrù                 </Description>
//    <Author>      Jiøí Dvoøák                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>     2002-11-13                                  </Created>
//  </FileHeader>

using System;
using System.Collections;

namespace Gordic.General {

	/// <summary>enumerátor skupin parametrù</summary>
	public class GParamGroupsEnumerator : IGObject, IEnumerator	{
		
        /// <summary>
		/// Interní enumerátor
		/// </summary>
		IDictionaryEnumerator m_oGroupsEnumerator;
		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="ParamGroup">skupina parametrù</param>
		public GParamGroupsEnumerator(Hashtable ParamGroup) 
		{
			m_oGroupsEnumerator = ParamGroup.GetEnumerator();
		}
		/// <summary>
		/// Reset enumerace
		/// </summary>
		public void Reset() 
		{
			m_oGroupsEnumerator.Reset();
		}
		/// <summary>
		/// Posunutí na další
		/// </summary>
		/// <returns></returns>
		public bool MoveNext() 
		{
			return m_oGroupsEnumerator.MoveNext();
		}
		/// <summary>
		/// Aktuální
		/// </summary>
		public GDParamHashTable Current 
		{
			get 
			{
				return (GDParamHashTable)m_oGroupsEnumerator.Value;
			}
		}
		/// <summary>
		/// Aktuální (interface)
		/// </summary>
		object IEnumerator.Current
		{
			get 
			{
				return (GDParamHashTable)m_oGroupsEnumerator.Value;
			}
		}

	} // end clas

} // end namespace
