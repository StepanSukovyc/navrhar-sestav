//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCfgPrmReaderMain.cs            </Name>
//    <Description> ètení konfiguraèních parametrù - øídící objekt </Description>
//    <Author>      Jiøí Dvoøák                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021     </Copyright>
//    <Created>     2002-11-13                                     </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Collections;
using System.Configuration;
using Microsoft.Win32;

namespace Gordic.General {
	
	#region Tøída GCfgSectionHandler - Handler pro ètení app.config 
	/// <summary>
	/// Handler pro ètení app.config
	/// </summary>
	public class GCfgSectionHandler : IGObject,IConfigurationSectionHandler
	{
		/// <summary>f
		/// Konstruktor
		/// </summary>
		/// <param name="parent">parent</param>
		/// <param name="context">context</param>
		/// <param name="section">sekce</param>
		/// <returns>objekt</returns>
		public object Create(object parent, 
			object context, 
			XmlNode section) 
		{
			//return section.Clone();
			return section;
		}
	}

	#endregion 	

	#region Tøída GCfgPrmReaderMain - Ètení konfiguraèních parametrù - øídící objekt 
	/// <summary>
	/// Ètení konfiguraèních parametrù - øídící objekt 
	/// </summary>
	public class GCfgPrmReaderMain : IGObject
	{
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region public enum

		/// <summary>
		/// Typ konfigurace dle aplikace
		/// </summary>
		public enum CfgType
		{
			/// <summary>
			/// windows aplikace
			/// </summary>
			windows,
			/// <summary>
			/// webová aplikace
			/// </summary>
			webapp,
			/// <summary>
			/// web service
			/// </summary>
			webservice
		};
		
		// -----------------------------------------------------------

		/// <summary>
		/// Vìtev v registrech
		/// </summary>
		public enum RegistryRootEnum
		{
			/// <summary>
			/// Vìtev HKLM
			/// </summary>
			HKLM,
			/// <summary>
			/// Vìtev HKCU
			/// </summary>
			HKCU
		};
		/// <summary>
		/// Lokace parametrù
		/// </summary>
		public enum ParamLocationEnum
		{
			/// <summary>
			/// 
			/// </summary>
			Reg_GinisParams,
			/// <summary>
			/// 
			/// </summary>
			Reg_HKLM_All,
			/// <summary>
			/// 
			/// </summary>
			Reg_HKLM_Faze,
			/// <summary>
			/// 
			/// </summary>
			Reg_HKCU_All,
			/// <summary>
			/// 
			/// </summary>
			Reg_HKCU_Faze,
			/// <summary>
			/// 
			/// </summary>
			XML_GinisConfig_All,
			/// <summary>
			/// 
			/// </summary>
			XML_GinisConfig_Faze,
			/// <summary>
			/// 
			/// </summary>
			XML_WebConfig_All,
			/// <summary>
			/// 
			/// </summary>
			XML_WebConfig_Faze,
			/// <summary>
			/// 
			/// </summary>
			XML_WebConfig_App_All,
			/// <summary>
			/// 
			/// </summary>
			XML_WebConfig_App_Faze,
			/// <summary>
			/// 
			/// </summary>
			XML_WebConfig_WS_All,
			/// <summary>
			/// 
			/// </summary>
			XML_WebConfig_WS_Faze
		}
		/// <summary>
		/// Lokace parametrù 
		/// </summary>
		public enum ParamLocationConfigEnum
		{
			/// <summary>
			/// Parametry spoleèné pro všechny fáze
			/// </summary>
			Config_All,
			/// <summary>
			/// Parametry pro danou fázi
			/// </summary>
			Config_Faze

		}

		#endregion

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region public const
		/// <summary>
		/// Jméno konfiguraèní skupiny
		/// </summary>
		public const string CstrGroupName = "MainConfigGroup";
		/// <summary>
		/// Název parametru
		/// </summary>
		public const string ConstStrGinadr		= "Ginadr";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrWinadr		= "Winadr";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrInfadr		= "Infadr";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrOraadr		= "Oraadr";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrGroupname	= "Groupname";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrShow_err	= "Show_err";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrAuto_reinst	= "Auto_reinst";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrOdloz_zprac	= "Odloz_zprac";
		/// <summary>
		/// Název parametru 
		/// </summary>
		public const string ConstStrShare_inst	= "Share_inst";
        /// <summary>
        /// Název parametru
        /// </summary>
        public const string ConstStrMulti = "Multi";

		/// <summary>
		/// Cesta v registrech
		/// </summary>
		//public const string Software_Gordic_Ginis_All = "/Software/Gordic/Ginis/All";
		public const string Software_Gordic_Ginis_All = "SOFTWARE\\Gordic\\GINIS\\All";
		/// <summary>
		/// Cesta v registrech
		/// </summary>
		public const string Software_Gordic_Ginis_Shared_Install32 = "Software\\Gordic\\Ginis\\Shared\\Install32";
        /// <summary>
		/// Cesta v registrech
		/// </summary>
        public const string Software_Gordic_Ginis_Shared_Install32_x64 = "Software\\Wow6432Node\\Gordic\\Ginis\\Shared\\Install32";
		/// <summary>
		/// Cesta v registrech
		/// </summary>
		public const string Software_Gordic_Ginis     = "Software\\Gordic\\Ginis\\";
		/// <summary>
		/// Cesta k souboru
		/// </summary>
		public const string File_Gin_GinisConfig      = "\\Gin\\Ginis.config";
		/// <summary>
		/// Cesta v XML souboru
		/// </summary>
		public const string XMLPath_Gordic_Ginis_All  = "/configuration/Gordic/Ginis/All";
		/// <summary>
		/// Cesta v XML souboru
		/// </summary>
		public const string XMLPath_Gordic_Ginis      = "/configuration/Gordic/Ginis/";
		/// <summary>
		/// Cesta v APP CONFIGu
		/// </summary>
		public const string Config_Gordic_Ginis_All         = "/Gordic/Ginis/All";
		/// <summary>
		/// Cesta v APP CONFIGu
		/// </summary>
		public const string Config_Gordic_Ginis_All_Altern  = "/Ginis/All";
		/// <summary>
		/// Cesta v APP CONFIGu
		/// </summary>
		public const string Config_Gordic_Ginis             = "/Gordic/Ginis/";
		/// <summary>
		/// Cesta v APP CONFIGu
		/// </summary>
		public const string Config_Gordic_Ginis_Altern      = "/Ginis/";
		/// <summary>
		/// Cesta k souboru
		/// </summary>
		public const string File_Gin_Webconfig      = "\\Ginis\\Web.config";
		/// <summary>
		/// Cesta k souboru
		/// </summary>
		public const string File_Gin_AppWebconfig   = "\\Ginis\\App\\Web.config";
		/// <summary>
		/// Cesta k souboru
		/// </summary>
		public const string File_Gin_WSWebconfig    = "\\Ginis\\Ws\\Web.config";

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		// WIN XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		
		/// <summary>
		/// Textový popis - krok 0
		/// </summary>
		public const string WIN_STEP00 = "ginis - params from registry : HKLM - ";
		/// <summary>
		/// Textový popis - krok 1
		/// </summary>
		public const string WIN_STEP01 = "registry : HKLM.../Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 2
		/// </summary>
		public const string WIN_STEP02 = "registry : HKLM.../Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 3
		/// </summary>
		public const string WIN_STEP03 = "registry : HKCU.../Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 4
		/// </summary>
		public const string WIN_STEP04 = "registry : HKCU.../Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 5
		/// </summary>
		public const string WIN_STEP05 = "File : Ginis.config - /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 6
		/// </summary>
		public const string WIN_STEP06 = "File : Ginis.config - /configuration/Gordic/Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 7
		/// </summary>
		public const string WIN_STEP07 = "AppConfig : /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 8
		/// </summary>
		public const string WIN_STEP08 = "AppConfig : /configuration/Gordic/Ginis/<fáze> - ";

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		// WEB XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		/// <summary>
		/// Textový popis - krok 1
		/// </summary>
		public const string WEB_STEP01 = "registry : HKLM.../Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 2
		/// </summary>
		public const string WEB_STEP02 = "registry : HKLM.../Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 3
		/// </summary>
		public const string WEB_STEP03 = "registry : HKCU.../Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 4
		/// </summary>
		public const string WEB_STEP04 = "registry : HKCU.../Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 5
		/// </summary>
		public const string WEB_STEP05 = "File : /Ginis/Web.config - /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 6
		/// </summary>
		public const string WEB_STEP06 = "File : /Ginis/Web.config - /configuration/Gordic/Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 7
		/// </summary>
		public const string WEB_STEP07 = "File : /Ginis/App/Web.config - /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 8
		/// </summary>
		public const string WEB_STEP08 = "File : /Ginis/App/Web.config - /configuration/Gordic/Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 9
		/// </summary>
		public const string WEB_STEP09 = "WebConfig : /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 10
		/// </summary>
		public const string WEB_STEP10 = "WebConfig : /configuration/Gordic/Ginis/<fáze> - ";
	

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		// WEB XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		/// <summary>
		/// Textový popis - krok 1
		/// </summary>
		public const string WS_STEP01 = "registry : HKLM.../Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 2
		/// </summary>
		public const string WS_STEP02 = "registry : HKLM.../Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 3
		/// </summary>
		public const string WS_STEP03 = "registry : HKCU.../Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 4
		/// </summary>
		public const string WS_STEP04 = "registry : HKCU.../Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 5
		/// </summary>
		public const string WS_STEP05 = "File : /Ginis/Web.config - /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 6
		/// </summary>
		public const string WS_STEP06 = "File : /Ginis/Web.config - /configuration/Gordic/Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 7
		/// </summary>
		public const string WS_STEP07 = "File : /Ginis/WS/Web.config - /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 8
		/// </summary>
		public const string WS_STEP08 = "File : /Ginis/WS/Web.config - /configuration/Gordic/Ginis/<fáze> - ";
		/// <summary>
		/// Textový popis - krok 9
		/// </summary>
		public const string WS_STEP09 = "WebConfig : /configuration/Gordic/Ginis/All - ";
		/// <summary>
		/// Textový popis - krok 10
		/// </summary>
		public const string WS_STEP10 = "WebConfig : /configuration/Gordic/Ginis/<fáze> - ";
	
		#endregion
		
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region private const




		#endregion

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region private members
		
		/// <summary>
		/// Aktuální typ konfigurace
		/// </summary>
		private CfgType moCfgType;
		/// <summary>
		/// Sada logù
		/// </summary>
		private GLogSet moLogSet = null;

		/// <summary>
		/// Instalaèní adresáø ginisu
		/// </summary>
		private string msGinisInstalDir = null;
		/// <summary>
		/// Virtuální WEB adresáø
		/// </summary>
		private string msWebVirtualDir = null;

		#endregion 

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region protected members

		/// <summary>
		/// fáze
		/// </summary>
		protected string msFaze = null;
		/// <summary>
		/// Parametry
		/// </summary>
		protected GParams moParams = null;
		/// <summary>
		/// Namespace pro ètení xml souborù
		/// </summary>
		protected string msXMLNamespace = null;
		/// <summary>
		/// Namespace uri pro ètení xml souborù
		/// </summary>
		protected string msNameSpaceUri  = "";

		#endregion 

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region constructor 

		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="aCfgType">typ konfigurace</param>
		/// <param name="aFaze">fáze</param>
		protected GCfgPrmReaderMain(CfgType aCfgType, string aFaze)
		{
			moParams  = new GParams();
			moLogSet  = new GLogSet(20);
			moCfgType = aCfgType;
			msFaze    = aFaze;
		}

		#endregion 
		
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region protected methods

		/// <summary>
		/// Pøidání parametru
		/// </summary>
		/// <param name="aName">jméno </param>
		/// <param name="aValue">hodnota</param>
		protected void AddPrm(string aName, object aValue)
		{
            //string sFirst=aName.Substring(0,1).ToUpper();
            //string sNext=aName.Substring(1).ToLower();
            //string MewName = sFirst+sNext;
            var MewName = aName.ToUpperFirstLetter();
            moParams.SetAddParam(MewName, aValue);
		}


		/// <summary>
		/// Otevøení klíèe v registrech
		/// </summary>
		/// <param name="RegRoot">koøen</param>
		/// <param name="Path">cesta</param>
		/// <param name="CreateIfNotExist">pokud neexistuje - vytvoøit</param>
		/// <returns>objekt RegistryKey nebo null</returns>
		protected RegistryKey OpenRegistryKey(
			RegistryRootEnum RegRoot, 
			string Path, 
			bool CreateIfNotExist)
		{
			RegistryKey RegKey = null;

			if (RegRoot == RegistryRootEnum.HKLM)
				RegKey=Registry.LocalMachine.OpenSubKey(GCommon.GetRegistry6432Path(Path), true);
			else if (RegRoot == RegistryRootEnum.HKCU)
				RegKey=Registry.CurrentUser.OpenSubKey(Path, true);

			if (RegKey==null)
			{
				if (CreateIfNotExist)
				{
					if (RegRoot == RegistryRootEnum.HKLM)
						RegKey=Registry.LocalMachine.CreateSubKey(GCommon.GetRegistry6432Path(Path));
					else if (RegRoot == RegistryRootEnum.HKCU)
						RegKey=Registry.CurrentUser.CreateSubKey(Path);
				}
			}

			return RegKey;
		}



		// -----------------------------------------------------------

		/// <summary>
		/// Otevírá XML node
		/// </summary>
		/// <param name="aXmlDoc">XML dokument</param>
		/// <param name="a_XMPPath">cesta</param>
		/// <returns>nalezený node nebo null</returns>
		protected XmlNode OpenXMLNode(
			XmlDocument aXmlDoc, 
			string a_XMPPath)
		{
			XmlNode tmpNode = null;
			XmlNamespaceManager nsmgr = null;
			XmlElement element = aXmlDoc.DocumentElement;
			
			if (msXMLNamespace!=null)
			{
				nsmgr = new XmlNamespaceManager(aXmlDoc.NameTable);
				nsmgr.AddNamespace(msXMLNamespace, msNameSpaceUri);
				tmpNode = element.SelectSingleNode(a_XMPPath, nsmgr);
			}
			else
				tmpNode = element.SelectSingleNode(a_XMPPath);

			return tmpNode;
		}

		// -----------------------------------------------------------

		/// <summary>
		/// Pokusí se otevøeít cestu v XML SubNode pokud se to nepodaøí pokusí se otevøít SubNodeAlternative
		/// </summary>
		/// <param name="node">vìtev pod kterou se hledá cesta</param>
		/// <param name="SubNode">cesta</param>
		/// <param name="SubNodeAlternative">alternativní cesta</param>
		/// <returns>xml node nebo null</returns>
		protected XmlNode OpenSubnode(
			XmlNode node, 
			string SubNode,
			string SubNodeAlternative)
		{
			XmlNode TmpNode = null;
			TmpNode = node.SelectSingleNode(SubNode);
			if (TmpNode==null) 
				TmpNode = node.SelectSingleNode(SubNodeAlternative);
			return TmpNode;
		}

		#endregion 

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region protected virtual

		/// <summary>
		/// Ètení registrù
		/// </summary>
		/// <param name="RegRoot">koøen v registrech HKLM, HKCU</param>
		/// <param name="RegPath">cesta</param>
		/// <param name="bResult">výsledek</param>
		/// <param name="nParamCount">poèet parametrù</param>
		/// <param name="strResult">výsledek - øetìzec</param>
		protected virtual void ReadRegistry(RegistryRootEnum RegRoot, string RegPath, ref bool bResult, ref int nParamCount, ref string strResult)
		{}
		// -----------------------------------------------------------
		/// <summary>
		/// Ètení z XML souboru
		/// </summary>
		/// <param name="sFileName">jméno souboru</param>
		/// <param name="XMLPath">XML Path</param>
		/// <param name="bResult">výsledek</param>
		/// <param name="nParamCount">poèet naètených parametrù</param>
		/// <param name="strResult">výsledek - text</param>
		protected virtual void ReadXMLFile(string sFileName, string XMLPath, ref bool bResult, ref int nParamCount, ref string strResult)
		{}
		// -----------------------------------------------------------
		/// <summary>
		/// Ètení z APP Configu
		/// </summary>
		/// <param name="XMLPath">cesta</param>
		/// <param name="AlternativeXMLPath">alternativní cesta</param>
		/// <param name="bResult">výsledek</param>
		/// <param name="nParamCount">poèet pøeètených parametrù</param>
		/// <param name="strResult">text s vásledkem</param>
		protected virtual void ReadAppConfigFile(string XMLPath, string AlternativeXMLPath, ref bool bResult, ref int nParamCount, ref string strResult)
		{}
		// -----------------------------------------------------------
		/// <summary>
		/// Vrátí GINIS insal dir
		/// </summary>
		/// <param name="aInstalDir">insal dir</param>
		/// <returns>true = OK</returns>
		protected virtual bool GetGINISInstalDir(ref string aInstalDir)
		{
			return false;
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Vrátí WEB ROOT
		/// </summary>
		/// <param name="aWVDir"></param>
		/// <returns>true = OK</returns>
		protected virtual bool GetWebVirtualDir(ref string aWVDir)
		{
			return false;
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="bResult"></param>
		/// <param name="ParamCount"></param>
		/// <param name="strResult"></param>
		protected virtual void ReadGlobalGinisParams(ref bool bResult, ref int ParamCount, ref string strResult)
		{
			strResult = "[Error!] Virtual Method not Implemented";
			bResult = false;
		}
		/// <summary>
		/// Zápis do registrù
		/// </summary>
		/// <param name="RegRoot">koøen</param>
		/// <param name="Path">cesta</param>
		/// <param name="ParamName">jméno</param>
		/// <param name="ParamValue">hodnota</param>
		/// <param name="CreatePathIfNotExist">vytvožit pokud existuje</param>
		/// <returns>výsledek</returns>
		protected virtual bool WriteParamToRegistry(
			RegistryRootEnum RegRoot, 
			string Path, 
			string ParamName, 
			object ParamValue,
			bool CreatePathIfNotExist)
		{
			return false;
		}
		/// <summary>
		/// Zápis parametru
		/// </summary>
		/// <param name="XMLFileName"></param>
		/// <param name="Path"></param>
		/// <param name="ParamName"></param>
		/// <param name="ParamValue"></param>
		/// <returns></returns>
		protected virtual bool WriteParamToXML(
			string XMLFileName,
			string Path, 
			string ParamName, 
			string ParamValue)
		{
			return false;
		}
		/// <summary>
		/// Smazání parametru z registrù (zatím neimplementováno)
		/// </summary>
		/// <param name="RegRoot"></param>
		/// <param name="Path"></param>
		/// <param name="ParamName"></param>
		/// <returns></returns>
		protected virtual bool DeleteRegistryParam(
			RegistryRootEnum RegRoot, 
			string Path, 
			string ParamName)
		{
			return false;
		}
		/// <summary>
		/// Smazání - (zatím neimplementováno)
		/// </summary>
		/// <param name="XMLFileName">soubor</param>
		/// <param name="Path">cesta</param>
		/// <param name="ParamName">jméno parametru</param>
		/// <returns>výsledek</returns>
		protected virtual bool DeleteXMLParam(
			string XMLFileName,
			string Path, 
			string ParamName)
		{
			return false;
		}


		#endregion 

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		
		#region private methods
		
		/// <summary>
		/// Pøidá log 
		/// </summary>
		/// <param name="step">krok</param>
		/// <param name="bResult">výsledek</param>
		/// <param name="paramcount">poèet naètených parametrù</param>
		/// <param name="caption">poznámka</param>
		private void AddLog(int step, bool bResult, int paramcount, string caption)
		{
			moLogSet.Add(step, bResult, paramcount, caption);
		}
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		/// <summary>
		/// Inicializace
		/// </summary>
		private void Init()
		{
			if (moParams==null)
				moParams = new GParams();
			else
				moParams.Clear();
			moParams.MainGroupName = CstrGroupName;
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Ètení parametrù pro aplikaci windows
		/// </summary>
		private void ReadParamsWindows()
		{
			/*
			1. klíè registru HKLM/Software/Gordic/Ginis/All
			2. klíè registru HKLM/Software/Gordic/Ginis/<fáze>
			3. klíè registru HKCU/Software/Gordic/Ginis/All
			4. klíè registru HKCU/Software/Gordic/Ginis/<fáze>
			5. XML soubor <instalaèní-adresáø-ginis>\Gin\Ginis.config, element /configuration/Gordic/Ginis/All
			6. XML soubor <instalaèní-adresáø-ginis>\Gin\Ginis.config, element /configuration/Gordic/Ginis/<fáze>
			7. config soubor <instalaèní-adresáø-ginis>\<fáze>\<fáze>.exe.config, element /configuration/Gordic/Ginis/All
			8. config soubor <instalaèní-adresáø-ginis>\<fáze>\<fáze>.exe.config, element /configuration/Gordic/Ginis/<fáze>
			*/ 
			int nParamCount = 0;
			bool bResult = false;
			//
			string msStrResult = "";
			//
			moLogSet.Init(20);
			// 
			// 0.  parametry ginis HKLM
			ReadGlobalGinisParams(ref bResult, ref nParamCount, ref msStrResult);
			AddLog(0, bResult, nParamCount, WIN_STEP00 + msStrResult);
			// 
			// 1.  klíè registru HKLM/Software/Gordic/Ginis/All
			ReadRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(1, bResult, nParamCount, WIN_STEP01 + msStrResult);
			// 
			// 2.  klíè registru HKLM/Software/Gordic/Ginis/<fáze>
			ReadRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(2, bResult, nParamCount, WIN_STEP02 + msStrResult);
			// 
			// 3.  klíè registru HKCU/Software/Gordic/Ginis/All
			ReadRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(3, bResult, nParamCount, WIN_STEP03 + msStrResult);
			// 
			// 4.  klíè registru HKCU/Software/Gordic/Ginis/<fáze>
			ReadRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(4, bResult, nParamCount, WIN_STEP04 + msStrResult);
			// 
			// zjisteni instalacniho adresare GINISu
			if (GetGINISInstalDir(ref msGinisInstalDir))
			{
				// 5.  XML soubor <instalaèní-adresáø-ginis>\Gin\Ginis.config, element /configuration/Gordic/Ginis/All
				ReadXMLFile(msGinisInstalDir + File_Gin_GinisConfig, XMLPath_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(5, bResult, nParamCount, WIN_STEP05 + msStrResult);
				// 
				// 6.  XML soubor <instalaèní-adresáø-ginis>\Gin\Ginis.config, element /configuration/Gordic/Ginis/<fáze>
				ReadXMLFile(msGinisInstalDir + File_Gin_GinisConfig, XMLPath_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(6, bResult, nParamCount, WIN_STEP06 + msStrResult);
				// 
			}
			else
			{
				AddLog(-1, false, 0, "Ginis instal dir not found");
			}
			//
			// 7.  config soubor <instalaèní-adresáø-ginis>\<fáze>\<fáze>.exe.config, element /configuration/Gordic/Ginis/All
			ReadAppConfigFile(Config_Gordic_Ginis_All, Config_Gordic_Ginis_All_Altern, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(7, bResult, nParamCount, WIN_STEP07 + msStrResult);
			// 
			// 8.  config soubor <instalaèní-adresáø-ginis>\<fáze>\<fáze>.exe.config, element /configuration/Gordic/Ginis/<fáze>
			ReadAppConfigFile(Config_Gordic_Ginis + msFaze, Config_Gordic_Ginis_Altern + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(8, bResult, nParamCount, WIN_STEP08 + msStrResult);
			// 
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Ètení parametrù pro webovou aplikaci
		/// </summary>
		private void ReadParamsWebApp()
		{
			/*
			1.  klíè registru HKLM/Software/Gordic/Ginis/All
			2.  klíè registru HKLM/Software/Gordic/Ginis/<fáze>
			3.  klíè registru HKCU/Software/Gordic/Ginis/All
			4.  klíè registru HKCU/Software/Gordic/Ginis/<fáze>
			5.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/All
			6.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/<fáze>
			7.  XML soubor <virtuální-adresáø>\Ginis\App\Web.config, element /configuration/Gordic/Ginis/All
			8.  XML soubor <virtuální-adresáø>\Ginis\App\Web.config, element /configuration/Gordic/Ginis/<fáze>
			9.  config soubor <virtuální-adresáø>\Ginis\App\<fáze>\Web.config, element /configuration/Gordic/Ginis/All
			10. config soubor <virtuální-adresáø>\Ginis\App\<fáze>\Web.config, element /configuration/Gordic/Ginis/<fáze>
			*/
			int nParamCount = 0;
			bool bResult = false;
			
			string msStrResult = "";
			//
			moLogSet.Init(20);
			// 
			// 0.  parametry ginis HKLM
			ReadGlobalGinisParams(ref bResult, ref nParamCount, ref msStrResult);
			AddLog(0, bResult, nParamCount, WIN_STEP00 + msStrResult);
			// 
			// 1.  klíè registru HKLM/Software/Gordic/Ginis/All
			ReadRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(1, bResult, nParamCount, WEB_STEP01 + msStrResult);
			// 
			// 2.  klíè registru HKLM/Software/Gordic/Ginis/<fáze>
			ReadRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(2, bResult, nParamCount, WEB_STEP02 + msStrResult);
			// 
			// 3.  klíè registru HKCU/Software/Gordic/Ginis/All
			ReadRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(3, bResult, nParamCount, WEB_STEP03 + msStrResult);
			// 
			// 4.  klíè registru HKCU/Software/Gordic/Ginis/<fáze>
			ReadRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(4, bResult, nParamCount, WEB_STEP04 + msStrResult);
			// 
			// zjisteni Virtualniho Web adresare
			if (GetWebVirtualDir(ref msWebVirtualDir))
			{
				//
				// 5.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/All
				ReadXMLFile(msWebVirtualDir + File_Gin_Webconfig , XMLPath_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(5, bResult, nParamCount, WEB_STEP05 + msStrResult);
				// 
				// 6.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/<fáze>
				ReadXMLFile(msWebVirtualDir + File_Gin_Webconfig , XMLPath_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(6, bResult, nParamCount, WEB_STEP06 + msStrResult);
				// 
				// 7.  XML soubor <virtuální-adresáø>\Ginis\App\Web.config, element /configuration/Gordic/Ginis/All
				ReadXMLFile(msWebVirtualDir + File_Gin_AppWebconfig, XMLPath_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(7, bResult, nParamCount, WEB_STEP07 + msStrResult);
				// 
				// 8.  XML soubor <virtuální-adresáø>\Ginis\App\Web.config, element /configuration/Gordic/Ginis/<fáze>
				ReadXMLFile(msWebVirtualDir + File_Gin_AppWebconfig, XMLPath_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(8, bResult, nParamCount, WEB_STEP08 + msStrResult);
				// 
			}
			else
			{
				AddLog(0, false, -1, "WEB root path not found");
			}
			//
			// 9.  config soubor <virtuální-adresáø>\Ginis\App\<fáze>\Web.config, element /configuration/Gordic/Ginis/All
			ReadAppConfigFile(Config_Gordic_Ginis_All, Config_Gordic_Ginis_All_Altern, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(9, bResult, nParamCount, WEB_STEP09 + msStrResult);
			// 
			// 10. config soubor <virtuální-adresáø>\Ginis\App\<fáze>\Web.config, element /configuration/Gordic/Ginis/<fáze>
			ReadAppConfigFile(Config_Gordic_Ginis + msFaze, Config_Gordic_Ginis_Altern + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(10, bResult, nParamCount, WEB_STEP10 + msStrResult);
			// 
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Ètení parametrù pro web service
		/// </summary>
		private void ReadParamsWebService()
		{
			/*
			1.  klíè registru HKLM/Software/Gordic/Ginis/All
			2.  klíè registru HKLM/Software/Gordic/Ginis/<fáze>
			3.  klíè registru HKCU/Software/Gordic/Ginis/All
			4.  klíè registru HKCU/Software/Gordic/Ginis/<fáze>
			5.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/All
			6.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/<fáze>
			7.  XML soubor <virtuální-adresáø>\Ginis\Ws\Web.config, element /configuration/Gordic/Ginis/All
			8.  XML soubor <virtuální-adresáø>\Ginis\Ws\Web.config, element /configuration/Gordic/Ginis/<fáze>
			9.  config soubor <virtuální-adresáø>\Ginis\Ws\<fáze>\Web.config, element /configuration/Gordic/Ginis/All
			10. config soubor <virtuální-adresáø>\Ginis\Ws\<fáze>\Web.config, element /configuration/Gordic/Ginis/<fáze>
			*/
			int nParamCount = 0;
			bool bResult = false;
			string msStrResult = "";
			//
			moLogSet.Init(20);
			// 
			// 0.  parametry ginis HKLM
			ReadGlobalGinisParams(ref bResult, ref nParamCount, ref msStrResult);
			AddLog(0, bResult, nParamCount, WIN_STEP00 + msStrResult);
			// 
			// 1.  klíè registru HKLM/Software/Gordic/Ginis/All
			ReadRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(1, bResult, nParamCount, WS_STEP01 + msStrResult);
			// 
			// 2.  klíè registru HKLM/Software/Gordic/Ginis/<fáze>
			ReadRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(2, bResult, nParamCount, WS_STEP02 + msStrResult);
			// 
			// 3.  klíè registru HKCU/Software/Gordic/Ginis/All
			ReadRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(3, bResult, nParamCount, WS_STEP03 + msStrResult);
			// 
			// 4.  klíè registru HKCU/Software/Gordic/Ginis/<fáze>
			ReadRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(4, bResult, nParamCount, WS_STEP04 + msStrResult);
			// 
			// zjisteni Virtualniho Web adresare
			if (GetWebVirtualDir(ref msWebVirtualDir))
			{
				//
				// 5.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/All
				ReadXMLFile(msWebVirtualDir + File_Gin_Webconfig , XMLPath_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(5, bResult, nParamCount, WS_STEP05 + msStrResult);
				//
				// 6.  XML soubor <virtuální-adresáø>\Ginis\Web.config, element /configuration/Gordic/Ginis/<fáze>
				ReadXMLFile(msWebVirtualDir + File_Gin_Webconfig , XMLPath_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(6, bResult, nParamCount, WS_STEP06 + msStrResult);
				//
				// 7.  XML soubor <virtuální-adresáø>\Ginis\Ws\Web.config, element /configuration/Gordic/Ginis/All
				ReadXMLFile(msWebVirtualDir + File_Gin_WSWebconfig, XMLPath_Gordic_Ginis_All, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(7, bResult, nParamCount, WS_STEP07 + msStrResult);
				//
				// 8.  XML soubor <virtuální-adresáø>\Ginis\Ws\Web.config, element /configuration/Gordic/Ginis/<fáze>
				ReadXMLFile(msWebVirtualDir + File_Gin_WSWebconfig, XMLPath_Gordic_Ginis + msFaze, ref bResult, ref nParamCount, ref msStrResult);
				AddLog(8, bResult, nParamCount, WS_STEP08 + msStrResult);
				//
			}
			else
			{
				AddLog(-1, false, 0, "WEB root path not found");
			}
			//
			// 9.  config soubor <virtuální-adresáø>\Ginis\Ws\<fáze>\Web.config, element /configuration/Gordic/Ginis/All
			ReadAppConfigFile(Config_Gordic_Ginis_All, Config_Gordic_Ginis_All_Altern, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(9, bResult, nParamCount, WS_STEP09 + msStrResult);
			//
			// 10. config soubor <virtuální-adresáø>\Ginis\Ws\<fáze>\Web.config, element /configuration/Gordic/Ginis/<fáze>
			ReadAppConfigFile(Config_Gordic_Ginis + msFaze, Config_Gordic_Ginis_Altern + msFaze, ref bResult, ref nParamCount, ref msStrResult);
			AddLog(10, bResult, nParamCount, WS_STEP10 + msStrResult);
			//
		}


		#endregion 

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		#region public methods
		
		// -----------------------------------------------------------
		/// <summary>
		/// Ètení konfiguraèních parametrù
		/// </summary>
		public void ReadParams()
		{
			Init();
			if (moCfgType==CfgType.windows)
				ReadParamsWindows();
			else if (moCfgType==CfgType.webapp)
				ReadParamsWebApp();
			else if (moCfgType==CfgType.webservice)
				ReadParamsWebService();
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Vrátí Hodnotu parametru
		/// </summary>
		/// <param name="aName"></param>
		/// <returns></returns>
		public object GetParam(string aName)
		{
			return moParams.GetParam(aName);
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Poèet pøeètených parametrù
		/// </summary>
		public int ParamCount
		{
			get
			{
				GDParamHashTable HTable = moParams[CstrGroupName];
				if (HTable!=null)
					return HTable.Count;
				else
					return 0;
			}
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Vrátí jméno a hodnotu parametru na pozici nPos
		/// Celkový poèet parametrù se dá pøeèíst ve vlasnosti ParamCount
		/// </summary>
		/// <param name="nPos">pozice parametru</param>
		/// <param name="sParamName">jméno parametru</param>
		/// <param name="sParamValue">hodnota parametru</param>
		/// <returns>true = OK</returns>
		public object GetPrm(int nPos, ref string sParamName, ref object sParamValue)
		{
			sParamName = null; 
			sParamValue = null;
		
			GDParamHashTable HTable = moParams[CstrGroupName];
			if (HTable!=null)
			{
				if ((nPos<HTable.Count)&(nPos>=0))
				{
					IDictionaryEnumerator Enumerator = HTable.GetEnumerator();
					if (Enumerator!=null)
					{
						for (int i=0; i<=nPos; i++) 
							Enumerator.MoveNext();
						sParamName  = (string)Enumerator.Key; 
						sParamValue = Enumerator.Value;
						return true;
					}
					else
						return false;
				}
				else
					return false;
			}
			else
				return false;
		}

		// -----------------------------------------------------------
		/// <summary>
		/// Zápis parametru do konfigurace
		/// </summary>
		/// <param name="PrmLocation">umístìní parametru</param>
		/// <param name="sParamName">jméno parametru</param>
		/// <param name="oParamValue">hodnota parametru</param>
		/// <returns>výsledek zápisu ( true = zápis se podaøil )</returns>
		public bool WriteParam(
			ParamLocationEnum PrmLocation,
			string sParamName, 
			object oParamValue)
		{
			bool bResult = false;
			switch(PrmLocation)
			{
				case ParamLocationEnum.Reg_GinisParams:
					bResult = WriteParamToRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis_Shared_Install32, sParamName, oParamValue, true);
					break;
				case ParamLocationEnum.Reg_HKLM_All:
					bResult = WriteParamToRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis_All, sParamName, oParamValue, true);
					break;
				case ParamLocationEnum.Reg_HKLM_Faze:
					bResult = WriteParamToRegistry(RegistryRootEnum.HKLM, Software_Gordic_Ginis + msFaze, sParamName, oParamValue, true);
					break;
				case ParamLocationEnum.Reg_HKCU_All:
					bResult = WriteParamToRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis_All, sParamName, oParamValue, true);
					break;
				case ParamLocationEnum.Reg_HKCU_Faze:
					bResult = WriteParamToRegistry(RegistryRootEnum.HKCU, Software_Gordic_Ginis + msFaze, sParamName, oParamValue, true);
					break;
				case ParamLocationEnum.XML_GinisConfig_All:
					if (msGinisInstalDir!=null)
						bResult = WriteParamToXML(msGinisInstalDir + File_Gin_GinisConfig, XMLPath_Gordic_Ginis_All, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_GinisConfig_Faze:
					if (msGinisInstalDir!=null)
						bResult = WriteParamToXML(msGinisInstalDir + File_Gin_GinisConfig, XMLPath_Gordic_Ginis + msFaze, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_All:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML(msWebVirtualDir + File_Gin_Webconfig, XMLPath_Gordic_Ginis_All, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_Faze:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML(msWebVirtualDir + File_Gin_Webconfig, XMLPath_Gordic_Ginis + msFaze, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_App_All:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML(msWebVirtualDir + File_Gin_AppWebconfig, XMLPath_Gordic_Ginis_All, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_App_Faze:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML(msWebVirtualDir + File_Gin_AppWebconfig, XMLPath_Gordic_Ginis + msFaze, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_WS_All:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML(msWebVirtualDir + File_Gin_WSWebconfig, XMLPath_Gordic_Ginis_All, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_WS_Faze:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML(msWebVirtualDir + File_Gin_WSWebconfig, XMLPath_Gordic_Ginis + msFaze, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				default:            
					bResult = false;
					break;      
			}
			return bResult;
		}
		/// <summary>
		/// Zápis parametru do XML souboru Web.config
		/// </summary>
		/// <param name="sConfigFileName">jméno souboru</param>
		/// <param name="PrmLocation">lokace parametru</param>
		/// <param name="sParamName">jméno parametru</param>
		/// <param name="oParamValue">hodnota parametru</param>
		/// <returns>true = OK</returns>
		public bool WriteParamToWebConfig(
			string sConfigFileName, 
			ParamLocationConfigEnum PrmLocation,
			string sParamName, 
			object oParamValue)
		{
			bool bResult = false;
			switch(PrmLocation)
			{
				case ParamLocationConfigEnum.Config_All:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML( sConfigFileName, XMLPath_Gordic_Ginis_All, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				case ParamLocationConfigEnum.Config_Faze:
					if (msWebVirtualDir!=null)
						bResult = WriteParamToXML( sConfigFileName, XMLPath_Gordic_Ginis + msFaze, sParamName, (string)oParamValue );
					else
						bResult = false;
					break;
				default:            
					bResult = false;
					break;      
			}
			return bResult;
		}
		
		/// <summary>
		/// Smazání parametru
		/// </summary>
		/// <param name="PrmLocation">lokace parametru</param>
		/// <param name="sParamName">jméno parametru</param>
		/// <returns>true = OK</returns>
		public bool DaleteParam(
			ParamLocationEnum PrmLocation,
			string sParamName)
		{
			bool bResult = false;
			switch(PrmLocation)
			{
				case ParamLocationEnum.Reg_GinisParams:
					bResult = DeleteRegistryParam(RegistryRootEnum.HKLM, Software_Gordic_Ginis_Shared_Install32, sParamName);
					break;
				case ParamLocationEnum.Reg_HKLM_All:
					bResult = DeleteRegistryParam(RegistryRootEnum.HKLM, Software_Gordic_Ginis_All, sParamName);
					break;
				case ParamLocationEnum.Reg_HKLM_Faze:
					bResult = DeleteRegistryParam(RegistryRootEnum.HKLM, Software_Gordic_Ginis + msFaze, sParamName);
					break;
				case ParamLocationEnum.Reg_HKCU_All:
					bResult = DeleteRegistryParam(RegistryRootEnum.HKCU, Software_Gordic_Ginis_All, sParamName);
					break;
				case ParamLocationEnum.Reg_HKCU_Faze:
					bResult = DeleteRegistryParam(RegistryRootEnum.HKCU, Software_Gordic_Ginis + msFaze, sParamName);
					break;
				case ParamLocationEnum.XML_GinisConfig_All:
					if (msGinisInstalDir!=null)
						bResult = DeleteXMLParam(msGinisInstalDir + File_Gin_GinisConfig, XMLPath_Gordic_Ginis_All, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_GinisConfig_Faze:
					if (msGinisInstalDir!=null)
						bResult = DeleteXMLParam(msGinisInstalDir + File_Gin_GinisConfig, XMLPath_Gordic_Ginis + msFaze, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_All:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam(msWebVirtualDir + File_Gin_Webconfig, XMLPath_Gordic_Ginis_All, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_Faze:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam(msWebVirtualDir + File_Gin_Webconfig, XMLPath_Gordic_Ginis + msFaze, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_App_All:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam(msWebVirtualDir + File_Gin_AppWebconfig, XMLPath_Gordic_Ginis_All, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_App_Faze:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam(msWebVirtualDir + File_Gin_AppWebconfig, XMLPath_Gordic_Ginis + msFaze, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_WS_All:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam(msWebVirtualDir + File_Gin_WSWebconfig, XMLPath_Gordic_Ginis_All, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationEnum.XML_WebConfig_WS_Faze:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam(msWebVirtualDir + File_Gin_WSWebconfig, XMLPath_Gordic_Ginis + msFaze, sParamName);
					else
						bResult = false;
					break;
				default:            
					bResult = false;
					break;      
			}
			return bResult;
		}
		
		/// <summary>
		/// Smazání parametru v XML souboru Web.config
		/// </summary>
		/// <param name="sConfigFileName">jméno souboru</param>
		/// <param name="PrmLocation">lokace parametru</param>
		/// <param name="sParamName">jméno parametru</param>
		/// <returns>true = OK</returns>
		public bool DaleteParamInWebConfig(
			string sConfigFileName, 
			ParamLocationConfigEnum PrmLocation,
			string sParamName)
		{
			bool bResult = false;
			switch(PrmLocation)
			{
				case ParamLocationConfigEnum.Config_All:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam( sConfigFileName, XMLPath_Gordic_Ginis_All, sParamName);
					else
						bResult = false;
					break;
				case ParamLocationConfigEnum.Config_Faze:
					if (msWebVirtualDir!=null)
						bResult = DeleteXMLParam( sConfigFileName, XMLPath_Gordic_Ginis + msFaze, sParamName);
					else
						bResult = false;
					break;
				default:            
					bResult = false;
					break;      
			}
			return bResult;
		}

		
		#endregion 
		
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		
		#region public properties

		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		
		/// <summary>
		/// Namespace pro XML soubory
		/// </summary>
		public string XMLNamespace
		{
			set{msXMLNamespace = value;}
			get{return msXMLNamespace;}
		}
		
		// -----------------------------------------------------------		
		
		/// <summary>
		/// Namespace Uri pro XML soubory
		/// </summary>
		public string NameSpaceUri
		{
			set{msNameSpaceUri = value;}
			get{return msNameSpaceUri;}
		}
		
		// -----------------------------------------------------------
		/// <summary>
		/// Vrací sadu logù
		/// </summary>
		public GLogSet LogSet
		{
			get{return moLogSet;}
		}
		// -----------------------------------------------------------
		/// <summary>
		/// Parametry
		/// </summary>
		public GParams Params
		{
			get{return moParams;}
		}
		/// <summary>
		/// Instalaèní adresáø ginisu
		/// </summary>
		public string Win32GinisDir
		{
			get
			{
				if (msGinisInstalDir==null)
				{
					if (GetGINISInstalDir(ref msGinisInstalDir))
						return msGinisInstalDir;
					else
						return null;
				}
				else
					return msGinisInstalDir;
			}
			set
			{
				msGinisInstalDir = value;
			}
		}
		/// <summary>
		/// Virtuální web adresáø
		/// </summary>
		public string WebGinisDir
		{
			get
			{
				if (msWebVirtualDir==null)	
				{
					if (GetWebVirtualDir(ref msWebVirtualDir))
						return msWebVirtualDir;
					else
						return null;
				}
				else
					return msWebVirtualDir;
			}
			set
			{
				msWebVirtualDir = value;
			}
		}

	
		#endregion 

	}

	
	#endregion
    
} // end namespace
