//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogItem.cs                 </Name>
//    <Description> položka logu pro ètení konfigurace         </Description>
//    <Author>      Jiøí Dvoøák                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2002-11-13                                 </Created>
//  </FileHeader>
using System;

namespace Gordic.General {

	/// <summary>položka logu pro ètení konfigurace</summary>
	public class GLogItem : IGObject {

		/// <summary>
		/// Krok ètení konfigurace
		/// </summary>
		private int mnStep;
		/// <summary>
		/// Výsledek
		/// </summary>
		private bool mbResult;
		/// <summary>
		/// Poèet pøeètených parametrù
		/// </summary>
		private int mnParamcount;
		/// <summary>
		/// Popis
		/// </summary>
		private string msCaption;
		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="Step"></param>
		/// <param name="Result"></param>
		/// <param name="Paramcount"></param>
		/// <param name="Caption"></param>
		public GLogItem(
			int Step,
			bool Result,
			int Paramcount,
			string Caption)
		{
			mnStep			= Step;
			mbResult		= Result;
			mnParamcount	= Paramcount;
			msCaption		= Caption;
		}
		/// <summary>
		/// Krok
		/// </summary>
		public int Step{get{return mnStep;}}
		/// <summary>
		/// Výsledek
		/// </summary>
		public bool Result{get{return mbResult;}}
		/// <summary>
		/// Poèet pøeètených parametrù
		/// </summary>
		public int Paramcount{get{return mnParamcount;}}
		/// <summary>
		/// Popis
		/// </summary>
		public string Caption{get{return msCaption;}}
	}

	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

	/// <summary>
	/// Sada logù ètení konfigurace
	/// </summary>
	public class GLogSet : IGObject
	{
		/// <summary>
		/// Pole položek logu
		/// </summary>
		private GLogItem[] moLogItemSet = null;
		/// <summary>
		/// Max. poèet logù
		/// </summary>
		private int mnMaxCount = 0;
		/// <summary>
		/// Aktuální poèet logù
		/// </summary>
		private int mnCount = 0;
		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="MaxCount">max. poèet logù</param>
		public GLogSet(int MaxCount)
		{
			Init(MaxCount);
		}
		/// <summary>
		/// Inicializace tøídy 
		/// </summary>
		/// <param name="MaxCount">max. poèet logù</param>
		public void Init(int MaxCount)
		{
			mnMaxCount = MaxCount;
			moLogItemSet = null;
			moLogItemSet = new GLogItem[mnMaxCount];
			mnCount = 0;
		}
		/// <summary>
		/// Pøidání položky logu
		/// </summary>
		/// <param name="Step">krok</param>
		/// <param name="Result">výsledek</param>
		/// <param name="Paramcount">poèet pøeètených parametrù</param>
		/// <param name="Caption">popis</param>
		public void Add(
			int Step,
			bool Result,
			int Paramcount,
			string Caption)
		{
			if (mnCount<mnMaxCount)
			{
				moLogItemSet[mnCount] = new GLogItem(Step, Result, Paramcount, Caption);
				mnCount++;
			}
		}
		/// <summary>
		/// Poèet logù
		/// </summary>
		public int Count{get{return mnCount;}}
		/// <summary>
		/// Vrací položku logu na dané pozici (nebo null)
		/// </summary>
		public GLogItem this[int position]
		{
			get
			{
				if ((position>=0)&(position<mnCount))
				{
					if (moLogItemSet!=null)
						return moLogItemSet[position];
					else
						return null;
				}
				else
					return null;
			}
		}
	}
		
} // end namespace
