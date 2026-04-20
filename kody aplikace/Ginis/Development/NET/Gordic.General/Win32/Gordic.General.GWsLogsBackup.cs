//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GWsLogsBackup.cs                 </Name>
//    <Description> podpora zálohování logovacích souborù webových služeb </Description>
//    <Author>      Jan Kuttich                                           </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//    <Created>     2007-03-08                                            </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.IO;
using System.Collections;
using System.Collections.Specialized;

namespace Gordic.General {

    /// <summary>podpora zálohování logovacích souborù webových služeb</summary>
    [System.Security.SecurityCritical]    
    public class GWsLogsBackup : IGObject {

        #region výètové typy

        /// <summary>interval zálohování</summary>
        public enum BackupInterval {
            /// <summary>zálohování po hodinách</summary>
            PerHour,
            /// <summary>zálohování po dnech</summary>
            Daily,
            /// <summary>zálohování po mìsících</summary>
            Monthly
        } // end enum

        #endregion

        #region soukromé èleny

        /// <summary>název pro výsledný souboru se zálohou</summary>
        private string m_sBackupName = String.Empty;

        /// <summary>zdrojový adresáø s logy webových služeb k odzálohování</summary>
        private string m_sSourcePath = String.Empty;

        /// <summary>adresáø pro uložení výsledného souboru se zálohou</summary>
        private string m_sDestinationPath = String.Empty;

        /// <summary>frekvence vytváøení zálohy</summary>
        private BackupInterval m_eFrequence = BackupInterval.Monthly;

        /// <summary>adresáø pro uložení kopie výsledného souboru se zálohou</summary>
        private string m_sCopyPath = String.Empty;

        /// <summary>pøíznak vymazání odzálohovaných logù</summary>
        private bool m_bRemoveSourceLogs = false;

        #endregion

        #region vlastnosti

        /// <summary>název pro výsledný souboru se zálohou</summary>
        public string BackupName {
            get { return m_sBackupName; }
            set { m_sBackupName = value==null ? String.Empty : value.Trim(); }
        } // end property

        /// <summary>zdrojový adresáø s logy webových služeb k odzálohování</summary>
        public string SourcePath {
            get { return m_sSourcePath; }
            set { m_sSourcePath = (value==null || value==String.Empty) ? String.Empty : Path.GetFullPath(value); }
        } // end property

        /// <summary>adresáø pro uložení výsledného souboru se zálohou</summary>
        public string DestinationPath {
            get { return m_sDestinationPath; }
            set { m_sDestinationPath = (value==null || value==String.Empty) ? String.Empty : Path.GetFullPath(value); }
        } // end property

        /// <summary>adresáø pro uložení kopie výsledného souboru se zálohou</summary>
        public string CopyPath {
            get { return m_sCopyPath; }
            set { m_sCopyPath = (value==null || value==String.Empty) ? String.Empty : Path.GetFullPath(value); }
        } // end property

        /// <summary>frekvence vytváøení zálohy</summary>
        public BackupInterval Frequence {
            get { return m_eFrequence; }
            set { m_eFrequence = value; }
        } // end property

        /// <summary>pøíznak vymazání odzálohovaných logù</summary>
        public bool RemoveSourceLogs {
            get { return m_bRemoveSourceLogs; }
            set { m_bRemoveSourceLogs = value; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GWsLogsBackup).Assembly;}
        } // end property

        #endregion

        #region veøejné metody

        /// <summary>vytvoøení zálohy adresáøe</summary>
        public void Backup() {
            CheckParameters(); // kontrola vstupních parametrù
            CreateBackup(); // vytvoøení zálohy
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>vytvoøení zálohy logovacích souborù webových služeb</summary>
        private void CreateBackup() {
            ICollection l_oBackupFilters = null;
            String l_sZipFile = String.Empty;
            String l_sZipPath = String.Empty;
            String l_sZipMask = String.Empty;
            try {
                l_oBackupFilters = GetFiltersCollection();
                foreach(string l_sBackupFilter in l_oBackupFilters) {
                    // parametry zálohy
                    l_sZipFile = String.Format("{0}.{1}.zip",m_sBackupName,l_sBackupFilter);
                    l_sZipPath = Path.Combine(m_sDestinationPath,l_sZipFile);
                    switch(m_eFrequence) {
                        case BackupInterval.PerHour: l_sZipMask = String.Format("GWS?????.*.{0}????.*.*.???",l_sBackupFilter); break;
                        case BackupInterval.Daily: l_sZipMask = String.Format("GWS?????.*.{0}.??????.*.*.???",l_sBackupFilter); break;
                        case BackupInterval.Monthly: l_sZipMask = String.Format("GWS?????.*.{0}??.??????.*.*.???",l_sBackupFilter); break;
                    } // end switch
                    // komprimace zálohy
                    GZip.Zip(Path.Combine(m_sSourcePath,l_sZipMask),l_sZipPath);
                    // kopie výsledného souboru
                    if(m_sCopyPath != String.Empty) File.Copy(l_sZipPath,Path.Combine(m_sCopyPath,l_sZipFile),true);
                    // smazání odzálohovaných souborù
                    if(m_bRemoveSourceLogs) RemoveFiles(l_sZipMask);
                } // end foreach
            } // end try
            catch(Exception e) {
                throw new GException(23200250,ThisAssembly,e,m_sSourcePath); // logovací soubory webových služeb v adresáøi {0} se nepodaøilo korektnì odzálohovat
            } // end catch
        } // end method

        /// <summary>kontrola vstupních parametrù</summary>
        private void CheckParameters() {
            if(m_sBackupName == String.Empty) throw new GException(23200251,ThisAssembly); // nebyl zadán název pro výsledný souboru se zálohou
            if(m_sSourcePath == String.Empty) throw new GException(23200252,ThisAssembly); // nebyl zadán zdrojový adresáø s logy webových služeb k odzálohování
            if(m_sDestinationPath == String.Empty) throw new GException(23200253,ThisAssembly); // adresáø pro uložení výsledného souboru se zálohou
            if(Directory.Exists(m_sSourcePath) == false) throw new GException(23200254,ThisAssembly,m_sSourcePath); // nenalezen specifikovaný adresáø s logy webových služeb k odzálohování {0}
            if(Directory.Exists(m_sDestinationPath) == false) throw new GException(23200255,ThisAssembly,m_sDestinationPath); // nenalezen specifikovaný adresáø pro uložení výsledného souboru se zálohou {0}
            if(m_sCopyPath!=String.Empty && Directory.Exists(m_sCopyPath)==false) throw new GException(23200256,ThisAssembly,m_sCopyPath); // nenalezen specifikovaný adresáø pro uložení kopie výsledného souboru se zálohou {0}
        } // end method

        /// <summary>získání kolekce filtrù pro zálohování</summary>
        /// <returns>kolekce filtrù pro zálohování</returns>
        private ICollection GetFiltersCollection() {
            HybridDictionary l_oBackupFilters = new HybridDictionary();
            string l_sFileName = String.Empty;
            string l_sLastFilter = String.Empty;
            string l_sCurrentFilter = String.Empty;
            string l_sOmitFilter = String.Empty;
            int l_nIndex = 0;
            int l_nFilterLength = 0;
            // nastavení kritérií pro filtry
            switch(m_eFrequence) {
                case BackupInterval.PerHour : 
                    l_sOmitFilter = DateTime.Now.ToString("yyMMdd.HH");
                    l_nFilterLength = 9;
                    break;
                case BackupInterval.Daily   : 
                    l_sOmitFilter = DateTime.Today.ToString("yyMMdd");
                    l_nFilterLength = 6;
                    break;
                case BackupInterval.Monthly : 
                    l_sOmitFilter = DateTime.Today.ToString("yyMM");
                    l_nFilterLength = 4;
                    break;
            } // end switch
            // naplnìní kolekce filtrù
            foreach(string l_sFile in Directory.GetFiles(m_sSourcePath,"GWS?????.*.??????.??????.*.*.???",SearchOption.TopDirectoryOnly)) {
                l_sFileName = Path.GetFileName(l_sFile);
                if((l_nIndex = l_sFileName.IndexOf('.',9)) > 0) {
                    l_sCurrentFilter = l_sFileName.Substring(l_nIndex+1,l_nFilterLength);
                    if(l_sCurrentFilter!=l_sOmitFilter && l_sCurrentFilter!=l_sLastFilter) {
                        if(l_oBackupFilters.Contains(l_sCurrentFilter) == false) l_oBackupFilters.Add(l_sCurrentFilter,null);
                        l_sLastFilter = l_sCurrentFilter;
                    } // end if
                } // end if
            } // end foreach
            return l_oBackupFilters.Keys;
        } // end method

        /// <summary>smazání odzálohovaných souborù</summary>
        /// <param name="mask">maska pro odmazání</param>
        private void RemoveFiles(string mask) {
            foreach(string l_sFile in Directory.GetFiles(m_sSourcePath,mask,SearchOption.TopDirectoryOnly)) File.Delete(l_sFile);
        } // end method

        #endregion

    } // end class

} // end namespace
