//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GParamsIO.cs                                             </Name>
//    <Description> základní tøída pro naèítání a zápis skupin parametrù z externího zdroje </Description>
//    <Author>      Jiøí Dvoøák                                                             </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                              </Copyright>
//    <Created>     2002-11-13                                                              </Created>
//  </FileHeader>

using System;

namespace Gordic.General {
	
    /// <summary>
	/// Základní tøída pro naèítání a zápis skupin parametrù z externího zdroje.
	/// Tato je pøedkem pro tøídy které obsluhují jednotlivé zdroje jako: Registry, INI, XML atd...
	/// </summary>
	public class GParamsIO : IGObject {

		#region Veøejná sekce tridy 'GParamsIO'

		/// <summary> 
		/// Datový formát pro binární výstup fmtBinary = binární, fmtBase64= base 64
		/// </summary>
		/// 
		public enum OutDataType {
			/// <summary>
			/// Binární data
			/// </summary>
			fmtBinary, 
			/// <summary>
			/// Øetìzec BASE64
			/// </summary>
			fmtBase64};

		
		/// <summary> 
		/// Konstruktor. 
		/// </summary>
		public GParamsIO()
		{
		}
		/// <summary> 
		/// Vynulování interních dat
		/// </summary>
		public void Init()
		{
			m_sDataSource="";
			m_sDataRoot="";
			m_sDataPath="";
			m_sDataUser="";
			m_sDataPass="";
			m_sDataNameSpacePrefix="";
			m_sDataNameSpaceUri="";
			m_OutputDataType=OutDataType.fmtBinary;
		}
		/// <summary> 
		/// Virtuální funkce pro ètení skupiny parametrù z datového zdroje. 
		/// </summary>
		virtual public bool ReadGroup(GParams a_oParams, string a_sGroup)
		{
			return false;
		}
		/// <summary> 
		/// Virtuální funkce pro zápis skupiny parametrù do datového zdroje. 
		/// </summary>
		virtual public bool WriteGroup(GParams a_oParams, string a_sGroup)
		{
			return false;
		}

		/// <summary> 
		/// Nastavení datového formátu pro binární výstup 
		/// </summary>
		public OutDataType OutputDataType
		{
			set { m_OutputDataType=value; }
		}
		/// <summary> 
		/// Datový zdroj pro ètení dat (nastaví interní promìnnou : m_sDataSource)
		/// </summary>
		public string DataSource
		{
			set { m_sDataSource=value; }
		}
		/// <summary> 
		/// Koøen pro ètení dat (nastaví interní promìnnou : m_sDataRoot)
		/// </summary>
		public string DataRoot
		{
			set { m_sDataRoot=value; }
		}
		/// <summary> 
		/// Cesta pro ètení dat (nastaví interní promìnnou : m_sDataPath)
		/// </summary>
		public string DataPath
		{
			set { m_sDataPath=value; }
		}
		/// <summary> 
		/// Klíè pro ètení dat (nastaví interní promìnnou : m_sDataKey)
		/// </summary>
		public string DataKey
		{
			set { m_sDataKey=value; }
		}
		/// <summary> 
		/// Sekce pro ètení dat (nastaví interní promìnnou : m_sDataSection)
		/// </summary>
		public string DataSection
		{
			set { m_sDataSection=value; }
		}
		/// <summary> 
		/// Uživatel pro ètení dat (nastaví interní promìnnou : m_sDataUser)
		/// </summary>
		public string DataUser
		{
			set { m_sDataUser=value; }
		}
		/// <summary> 
		/// Heslo pro ètení dat (nastaví interní promìnnou : m_sDataPass)
		/// </summary>
		public string DataPass
		{
			set { m_sDataPass=value; }
		}
		/// <summary> 
		/// Prefix jmenného prostoru v XML
		/// </summary>
		public string DataNameSpacePrefix
		{
			set { m_sDataNameSpacePrefix=value; }
		}

		/// <summary> 
		/// Jmenný prostoru v XML
		/// </summary>
		public string DataNameSpaceUri
		{
			set { m_sDataNameSpaceUri=value; }
		}

		#endregion 

		#region Privátní sekce tridy 'GParamsIO'

		/// <summary> 
		/// Aktuální datový formát pro binární výstup fmtBinary = binární, fmtBase64= base 64
		/// implicitní je fmtBinary
		/// </summary>
		protected OutDataType m_OutputDataType;
		/// <summary> 
		/// Datový zdroj. 
		/// </summary>
		protected string m_sDataSource;
		/// <summary> 
		/// Koøen 
		/// </summary>
		protected string m_sDataRoot;
		/// <summary> 
		/// Cesta 
		/// </summary>
		protected string m_sDataPath;
		/// <summary> 
		/// Klíè  
		/// </summary>
		protected string m_sDataKey;
		/// <summary> 
		/// Sekce
		/// </summary>
		protected string m_sDataSection;
		/// <summary> 
		/// Uživatel  
		/// </summary>
		protected string m_sDataUser;
		/// <summary> 
		/// Heslo  
		/// </summary>
		protected string m_sDataPass;
		/// <summary> 
		/// Prefix jmenného prostoru
		/// </summary>
		protected string m_sDataNameSpacePrefix;
		/// <summary> 
		/// Jmenný prostor
		/// </summary>
		protected string m_sDataNameSpaceUri;

		#endregion 

	} // end class

} // end namespace
