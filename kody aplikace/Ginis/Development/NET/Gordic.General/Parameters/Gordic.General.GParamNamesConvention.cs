//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GParamNamesConvention.cs      </Name>
//    <Description> tøída pro kontrolu jmenné konvevce parametrù </Description>
//    <Author>      Jiøí Dvoøák                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>     2002-11-13                                   </Created>
//  </FileHeader>

using System;

namespace Gordic.General {

	/// <summary>tøída pro kontrolu jmenné konvevce parametrù</summary>
	[Serializable]
	public class GParamNamesConvention : IGObject	{

		#region PRIVATE SECTION
		/// <summary> 
		/// Implicitni tabulka povolenych znakù ve jménì parametru 
		/// </summary>
		private const string LocalConstEnableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
		/// <summary> 
		/// Aktivní tabulka povolených znakù ve jménì parametru 
		/// </summary>
		private string ActiveEnableChars;
		/// <summary> 
		/// Promìnná která zapíná/vypíná kontrolu názvù (nastavují ji konstruktory) 
		/// </summary>
		private bool EnableValidation;
		/// <summary> 
		/// Vratí true pokud je znak v aktivní tabulce povolených znakù
		/// </summary>
		private bool ExistInEnableSet(char singleChar)
		{
			return (ActiveEnableChars.IndexOf(singleChar)>=0);
		}

		/// <summary> 
		/// Vratí true pokud všechny znaky vstupního øetìzce jsou v povolené sadì 
		/// </summary>
		private bool ValidName(string sInput)
		{
			string sTmp = sInput.ToUpper();
			char[] ChArr = sTmp.ToCharArray();
			int i = 0;
			while (true)
			{
				if (i>=sInput.Length) break;
				if (!ExistInEnableSet(ChArr[i])) break;
				i++;
			}
			return (i==sInput.Length);
		}
		#endregion
	
		#region PUBLIC SECTION
		
		/// <summary> 
		/// Konstruktor 1. 
		/// Nastaví aktivní tabulku povolených znakù na implicitni hodnotu
		/// Povolí/zkáže kontrolu jmen
		/// </summary>
		public GParamNamesConvention(bool aEnableValidation)
		{
			ActiveEnableChars = LocalConstEnableChars;
			EnableValidation  = aEnableValidation;
		}

		/// <summary> 
		/// Konstruktor 2. 
		/// Nastaví aktivní tabulku povolených znakù na hodnotu vstupního argumentu
		/// Povolí kontrolu jmen
		/// </summary>
		public GParamNamesConvention(string EnableChars, bool aEnableValidation)
		{
			ActiveEnableChars = EnableChars;
			EnableValidation  = aEnableValidation;
		}
		/// <summary> 
		/// Vrátí true pokud všechny znaky vstupního øetìzce jsou v povolené sadì 
		/// pokud ano - nastaví vstupnì/výstupní øetìzec na velká písmena
		/// </summary>
		public bool ValidAndPrepareName(ref string  sInput)
		{
			if (EnableValidation)
			{
				string sLocal = sInput.ToUpper();
				if (ValidName(sLocal))
				{
					sInput=sLocal;
					return true;
				}
				else
					return false;
			}
			else
				return true;
		}

		/// <summary> 
		/// Kontroluje jméno parametru a vrací logickou hodnotu 
		/// </summary>
		public bool ValidateName(string  sInput)
		{
			if (EnableValidation)
			{
				string sLocal = sInput.ToUpper();
				if (ValidName(sLocal))
				{
					return true;
				}
				else
					return false;
			}
			else
				return true;
		}


		#endregion
	
    } // end class

} // end namespace
