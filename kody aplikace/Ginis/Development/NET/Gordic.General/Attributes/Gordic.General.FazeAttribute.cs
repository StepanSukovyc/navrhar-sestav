//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.FazeAttribute.cs            </Name>
//      <Description> atribut pro deklaraci fáze GINIS           </Description>
//      <Author>      Jan Kuttich                                </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2003-06-12                                 </Created>
//  </FileHeader>
using System;
using System.Reflection;

namespace Gordic.General {
	
    /// <summary>atribut pro deklaraci fáze GINIS</summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple=false)]
    public class FazeAttribute : Attribute, IGObject {
		
        #region soukromé èleny

        /// <summary>fáze</summary>
        private string m_sFaze = String.Empty;

        /// <summary>fáze sestav</summary>
        private string m_sFazeSes = String.Empty;

        /// <summary>pøíznak sestav</summary>
        private bool m_bSestavy = true;

        /// <summary>subsystém aplikace Ginis</summary>
        private GCommon.Subsystem m_eSubsystem = GCommon.Subsystem.Gin;  

        /// <summary>minimální požadovaná verze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin2, je tato verze ta nižší</remarks>
        private int m_nVerzeDbMin = 0;

        /// <summary>minimální požadovaná subverze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin2, je tato subverze ta nižší</remarks>
        private int m_nSubVerzeDbMin = 0;

        /// <summary>minimální požadovaná revize distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin2, je tato revize ta nižší</remarks>
        private int m_nRevizeAdzMin = 0;

        /// <summary>minimální požadovaná verze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin, je tato verze ta vyšší</remarks>
        private int m_nVerzeDbMin2 = 0;

        /// <summary>minimální požadovaná subverze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin, je tato subverze ta vyšší</remarks>
        private int m_nSubVerzeDbMin2 = 0;

        /// <summary>minimální požadovaná revize databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin, je tato revize ta vyšší</remarks>
        private int m_nRevizeAdzMin2 = 0;

        /// <summary>kód názvu aplikace ve zdrojích</summary>
        private int m_sNameResxCode = 0;

        /// <summary>pøíznak provádìní testu verze databáze</summary>
        private bool m_bTestVerzeDb = true;

        /// <summary>pøíznak používání connect poolu pøi pøipojení k databázi</summary>
        private bool m_bUseConnectPool = true;

        /// <summary>pøíznak požadavku na naèítání databázové konfigurace</summary>
        private bool m_bLoadDatabaseConfiguration = true;

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(FazeAttribute).Assembly; }
        } // end property

        /// <summary>fáze</summary>
        public string Faze {
            get { return m_sFaze; }
        } // end property

        /// <summary>fáze sestav</summary>
        public string FazeSes {
            get {
                if(m_bSestavy) {
                    if(m_sFazeSes == String.Empty) return m_sFaze.Substring(0,6) + 'S' + m_sFaze[7];
                    else return m_sFazeSes;
                } else return String.Empty; 
            } // end method
        } // end property

        /// <summary>pøíznak sestav</summary>
        public bool Sestavy {
            get { return m_bSestavy; }
            set { m_bSestavy = value; }
        } // end property

        /// <summary>subsystém aplikace Ginis</summary>
        public GCommon.Subsystem Subsystem {
            get { return m_eSubsystem; }
            set { m_eSubsystem = value; }
        } // end property

        /// <summary>minimální požadovaná verze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin2, je tato verze ta nižší</remarks>
        public int VerzeDbMin {
            get { return m_nVerzeDbMin; }
            set { m_nVerzeDbMin = value; }
        } // end property

        /// <summary>minimální požadovaná subverze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin2, je tato subverze ta nižší</remarks>
        public int SubVerzeDbMin {
            get { return m_nSubVerzeDbMin; }
            set { m_nSubVerzeDbMin = value; }
        } // end property

        /// <summary>minimální požadovaná revize distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin2, je tato revize ta nižší</remarks>
        public int RevizeAdzMin {
            get { return m_nRevizeAdzMin; }
            set { m_nRevizeAdzMin = value; }
        } // end property

        /// <summary>minimální požadovaná verze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin, je tato verze ta vyšší</remarks>
        public int VerzeDbMin2 {
            get { return m_nVerzeDbMin2; }
            set { m_nVerzeDbMin2 = value; }
        } // end property

        /// <summary>minimální požadovaná subverze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin, je tato subverze ta vyšší</remarks>
        public int SubVerzeDbMin2 {
            get { return m_nSubVerzeDbMin2; }
            set { m_nSubVerzeDbMin2 = value; }
        } // end property

        /// <summary>minimální požadovaná revize databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin, je tato revize ta vyšší</remarks>
        public int RevizeAdzMin2 {
            get { return m_nRevizeAdzMin2; }
            set { m_nRevizeAdzMin2 = value; }
        } // end property

        /// <summary>kód názvu aplikace ve zdrojích</summary>
        public int NameResourceCode {
            get { return m_sNameResxCode; }
            set { m_sNameResxCode = value; }
        } // end property

        /// <summary>pøíznak provádìní testu verze databáze</summary>
        public bool TestVerzeDb {
            get { return m_bTestVerzeDb; }
            set { m_bTestVerzeDb = value; }
        } // end property

        /// <summary>pøíznak používání connect poolu pøi pøipojení k databázi</summary>
        public bool UseConnectPool {
            get { return m_bUseConnectPool; }
            set { m_bUseConnectPool = value; }
        } // end property

        /// <summary>pøíznak požadavku na naèítání databázové konfigurace</summary>
        public bool LoadDatabaseConfiguration {
            get { return m_bLoadDatabaseConfiguration; }
            set { m_bLoadDatabaseConfiguration = value; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        /// <param name="faze">fáze</param>
        public FazeAttribute(string faze) {
            if(faze==null || (faze=faze.Trim()).Length != 8) throw new GException(23200175,ThisAssembly); // nesprávnì deklarovaná fáze
            this.m_sFaze = faze;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="faze">fáze</param>
        /// <param name="fazeSes">fáze sestav</param>
        public FazeAttribute(string faze,string fazeSes) {
            // fáze
            if(faze == null || (faze = faze.Trim()).Length != 8) throw new GException(23200176,23200175,ThisAssembly); // nesprávnì deklarovaná fáze
            else this.m_sFaze = faze;
            // fáze sestav
            if(fazeSes == null || (fazeSes = fazeSes.Trim()).Length != 8) throw new GException(23200177,ThisAssembly); // nesprávnì deklarovaná fáze sestav
            else {
                m_sFazeSes = fazeSes;
                m_bSestavy = true;
            } // end if
        } // end method

        #endregion
	
    } // end class

} // end namespace
