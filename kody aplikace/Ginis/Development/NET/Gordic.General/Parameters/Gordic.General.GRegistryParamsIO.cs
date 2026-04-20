//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRegistryParamsIO.cs                          </Name>
//    <Description> ètení a zápis obsahu klíèe v registrech do skupiny parametrù </Description>
//    <Author>      Jiøí Dvoøák                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                   </Copyright>
//    <Created>     2002-11-13                                                   </Created>
//  </FileHeader>

using System;
using Microsoft.Win32;

namespace Gordic.General {

	/// <summary>ètení a zápis obsahu klíèe v registrech do skupiny parametrù </summary>
	public class GRegistryParamsIO : GParamsIO, IGObject {

		#region Veøejná sekce

		/// <summary>
		/// Typ metody ètení - urèuje jak se má modifikovat jméno parametru
		/// </summary>
		public enum ParamNameMethods{ 
			/// <summary>
			/// Nemodifikovat
			/// </summary>
			NoModify, 
			/// <summary>
			/// Pøevézt na velká písmena
			/// </summary>
			Upper, 
			/// <summary>
			/// Pøevézt na malá písmena
			/// </summary>
			Lower, 
			/// <summary>
			/// První písmeno velké ostatní malá
			/// </summary>
			FirstUpper}; 
		/// <summary>
		/// Metoda ètení urèuje jak se má modifikovat jméno parametru
		/// </summary>
		public ParamNameMethods ActiveNameMethods;
		
		/// <summary>
		/// Parametry se mají pouze pøidávat a né modifikovat
		/// </summary>
		public bool AddOnly;

		/// <summary>
		/// Konstruktor
		/// </summary>
		public GRegistryParamsIO()
		{
			ActiveNameMethods=ParamNameMethods.NoModify;
			AddOnly=true;

		}
		/// <summary> 
		/// Ètení obsahu sekce v registrech do skupiny parametrù 
		///		Parametry:
		///				1. GParams  - Globální parametry.
		///				2. sGroup   - Název skupiny která se vytvoøí v globálních parametrech.
		///		Ostatní nutné nastaví :
		///				1. DataRoot - koøen v registrech (napø. "HKEY_LOCAL_MACHINE")
		///				2. DataPath - cesta k sekci registrù (napø. "Software\Microsoft\Clock")
		///				( není-li vyplnìn 'DataRoot' pokusí se ho najít na zaèátku øetìzce 'm_sDataPath' : "HKEY_LOCAL_MACHINE\Software\Microsoft\Clock")
		/// </summary>
		override public bool ReadGroup(GParams a_oParams, string a_sGroup)
		{
			try
			{
				string[] SubKeyNames;
				RegistryKey key; 
				key = CreateExistRegistryKey(m_sDataRoot, m_sDataPath, false);
				if(key != null)
				{
					a_oParams.AddGroup(a_sGroup);
					SubKeyNames=key.GetValueNames();
					for (int l_loop = 0; l_loop<key.ValueCount; l_loop++) 
					{
						if (AddOnly)
							a_oParams.AddParam(	a_sGroup, 
								GenerateName(SubKeyNames[l_loop]), 
								key.GetValue(SubKeyNames[l_loop]));
						else
							a_oParams.SetAddParam(	a_sGroup, 
								GenerateName(SubKeyNames[l_loop]), 
								key.GetValue(SubKeyNames[l_loop]));
					}
					return true;
				}
				else
					return false;
			}
			catch
			{
				return false;
			}
		}

		/// <summary> 
		/// Zápis skupiny parametrù do sekce v registrech
		///		Parametry:
		///				1. GParams  - Globální parametry.
		///				2. sGroup   - Název skupiny která se se zapíše do registrù.
		///		Ostatní nutné nastaví :
		///				1. DataRoot - koøen v registrech (napø. "HKEY_LOCAL_MACHINE")
		///				2. DataPath - cesta k sekci registrù (napø. "Software\Microsoft\Clock")
		///				( není-li vyplnìn 'DataRoot' pokusí se ho najít na zaèátku øetìzce 'm_sDataPath' : "HKEY_LOCAL_MACHINE\Software\Microsoft\Clock")
		/// </summary>
		override public bool WriteGroup(GParams loParams, string lsGroup)
		{
			try
			{
				RegistryKey key; 
				string lsTmpParampName="";
				object loTmpObject;

				key = CreateNewRegistryKey(m_sDataRoot, m_sDataPath);
				if(key != null)
				{
					if (loParams.ThisGroup(lsGroup))
					{
						while (loParams.NextParam(ref lsTmpParampName))
						{
							loTmpObject = loParams.ActiveParam();
							if (loTmpObject!=null) 
							{
								key.SetValue(lsTmpParampName,loTmpObject);
							}
						}
						return true;
					}
					else
						return false;
				}
				else
					return false;
			}
			catch
			{
				return false;
			}
		}
		/// <summary>
		/// Zápis hodnoty parametru do registrù
		/// </summary>
		/// <param name="regRoot">Koøen (napø: 'HKEY_LOCAL_MACHINE')</param>
		/// <param name="regKey">Cesta v registrech</param>
		/// <param name="Name">Jméno parametru</param>
		/// <param name="Value">Hodnota parametru</param>
		/// <returns>Vrací výsledek operace</returns>
		public bool WriteValue(string regRoot,string regKey, string Name, object Value)
		{
			RegistryKey RegK;
			RegK = CreateExistRegistryKey(regRoot,regKey,true);
			if (RegK==null) RegK = CreateNewRegistryKey(regRoot,regKey);
			if ((RegK!=null)&(Value!=null)&(Name!=null))
			{
				RegK.SetValue(Name,Value);
				return true;
			}
			else
				return false;
		}
		/// <summary>
		/// Ètení hodnoty z registrù
		/// </summary>
		/// <param name="regRoot">Koøen (napø: 'HKEY_LOCAL_MACHINE')</param>
		/// <param name="regKey">Cesta v registrech</param>
		/// <param name="Name">Jméno parametru</param>
		/// <returns>vrací hodnotu parametru nebo null</returns>
		public object ReadValue(string regRoot,string regKey, string Name)
		{
			RegistryKey RegK;
			RegK = CreateExistRegistryKey(regRoot,regKey,false);
			if ((RegK!=null)&(Name!=null))
			{
				return RegK.GetValue(Name);
			}
			else
				return null;
		}

		
		#endregion 

		#region Privátní sekce
		
		/// <summary> 
		/// Vytváøí objekt 'RegistryKey' v závislosti na koøenu  ('Registry.ClassesRoot', 'Registry.CurrentUser', atd... )
		/// Otvírá existující cestu v registrech
		/// </summary>
		private RegistryKey CreateExistRegistryKey(string a_sRoot, string a_sPath, bool canWrite)
		{
			string l_sRoot=a_sRoot;
			string l_sPath=a_sPath;
			GetRoot(ref l_sRoot, ref l_sPath);

			AddKey(ref l_sPath);

			if (l_sRoot=="HKEY_CLASSES_ROOT")
				return Registry.ClassesRoot.OpenSubKey(l_sPath, canWrite);
			else if (l_sRoot=="HKEY_CURRENT_USER")
				return Registry.CurrentUser.OpenSubKey(l_sPath, canWrite);
			else if (l_sRoot=="HKEY_LOCAL_MACHINE")
				return Registry.LocalMachine.OpenSubKey(GCommon.GetRegistry6432Path(l_sPath), canWrite);
			else if (l_sRoot=="HKEY_USERS")
				return Registry.Users.OpenSubKey(l_sPath, canWrite);
			else if (l_sRoot=="HKEY_CURRENT_CONFIG")
				return Registry.CurrentConfig.OpenSubKey(l_sPath, canWrite);
			else
				return null;
		}

		/// <summary> 
		/// Vytváøí objekt 'RegistryKey' v závislosti na koøenu  ('Registry.ClassesRoot', 'Registry.CurrentUser', atd... )
		/// Vytváøí novou cestu v registrech
		/// </summary>
		private RegistryKey CreateNewRegistryKey(string a_sRoot, string a_sPath)
		{
			string l_sRoot=a_sRoot;
			string l_sPath=a_sPath;
	
			RegistryKey loTempRkey = CreateExistRegistryKey(a_sRoot,a_sPath, true);
			
			if (loTempRkey == null)
			{
				GetRoot(ref l_sRoot, ref l_sPath);
				AddKey(ref l_sPath);

				if (l_sRoot=="HKEY_CLASSES_ROOT")
					loTempRkey = Registry.ClassesRoot.CreateSubKey(l_sPath);
				else if (l_sRoot=="HKEY_CURRENT_USER")
					loTempRkey =Registry.CurrentUser.CreateSubKey(l_sPath);
				else if (l_sRoot=="HKEY_LOCAL_MACHINE")
					loTempRkey =Registry.LocalMachine.CreateSubKey(GCommon.GetRegistry6432Path(l_sPath));
				else if (l_sRoot=="HKEY_USERS")
					loTempRkey =Registry.Users.CreateSubKey(l_sPath);
				else if (l_sRoot=="HKEY_CURRENT_CONFIG")
					loTempRkey =Registry.CurrentConfig.CreateSubKey(l_sPath);
				else
					loTempRkey =null;
			}
			return loTempRkey;
		}

		
		private string GenerateName(string sInput)
		{
			if (sInput==null) return null;
			if (sInput.Length==0) return null;

			switch(ActiveNameMethods)       
			{         
				case ParamNameMethods.NoModify:   
					return sInput;
				case ParamNameMethods.Upper:            
					return sInput.ToUpper();
				case ParamNameMethods.Lower:            
					return sInput.ToLower();
				case ParamNameMethods.FirstUpper:
				{
					string sFirst=sInput.Substring(0,1).ToUpper();
					string sNext=sInput.Substring(1).ToLower();
					return sFirst+sNext;
				}
				default:            
					return sInput;
			}

		}
		
		/// <summary> 
		/// Není-li zadán sRoot ète ho z parametru sPath
		/// </summary>
		private void GetRoot(ref string sRoot, ref string sPath)
		{
			if (!(sRoot.Length>0))
			{
				int l_nPos=sPath.IndexOf("\\");
				if (l_nPos>0) 
				{
					sRoot=sPath.Substring(0 ,l_nPos);
					sPath=sPath.Substring(l_nPos+1);
				}
				else
				{
					sRoot=sPath;
				}
			}
		}
		/// <summary> 
		/// Pokud je zadán 'DataKey' pøidá ho k cestì
		/// </summary>
		private void AddKey( ref  string lPath)
		{
			if (m_sDataKey!=null)
			{
				if (m_sDataKey.Length>0)
				{
					if (lPath.Length>0)
					{
						if (lPath.Substring(lPath.Length-1)=="\\")
							lPath=lPath+m_sDataKey;
						else
							lPath=lPath+"\\"+m_sDataKey;
					}
					else
						lPath=m_sDataKey;
				}
			}
		}


		#endregion 

	} // end class

} // end namespace
