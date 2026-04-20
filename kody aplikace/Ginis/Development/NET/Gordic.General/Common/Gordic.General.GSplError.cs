//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSplException.cs                  </Name>
//    <Description> informace o chybì vrácené z databázové procedury </Description>
//    <Author>      Martin Aliger, Jan Kuttich                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021               </Copyright>
//    <Created>     2011-06-27                                       </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.Runtime.Serialization;

namespace Gordic.General {

    /// <summary>informace o chybì vrácené z databázové procedury</summary>
    [Serializable]
    public class GSplError {

        #region soukromé èleny

        /// <summary>èíslo chyby</summary>
        private int m_nErrCode = 0;
        
        /// <summary>èíslo sql chyby</summary>
        private int m_nSqlErr = 0;
        
        /// <summary>èíslo isam chyby</summary>
        private int m_nIsamErr = 0;
        
        /// <summary>text chyby</summary>
        private string m_sTxtErr = String.Empty;
        
        /// <summary>lokace chyby</summary>
        private string m_sLokErr = String.Empty;

        /// <summary>uživatelský text chyby</summary>
        private string m_sUserErrorText = String.Empty;

        /// <summary>technologický text chyby</summary>
        private string m_sFatalErrorText = String.Empty;

        #endregion

        #region vlastnosti

        /// <summary>èíslo chyby</summary>
        public int ErrCode {
            get { return m_nErrCode; }
        } // end property

        /// <summary>èíslo sql chyby</summary>
        public int SqlErr {
            get { return m_nSqlErr; }
        } // end property

        /// <summary>èíslo isam chyby</summary>
        public int IsamErr {
            get { return m_nIsamErr; }
        } // end property

        /// <summary>text chyby bez rozdìlení na uživatelskou a technologickou èást</summary>
        public string TxtErr {
            get { return m_sTxtErr; }
        } // end property

        /// <summary>lokace chyby</summary>
        public string LokErr {
            get { return m_sLokErr; }
        } // end property
        
        /// <summary>pøíznak fatální chyby</summary>
        public bool FatalError {
            get { return m_sUserErrorText == String.Empty; }
        } // end property

        /// <summary>technologický text chyby</summary>
        public string FatalErrorText { 
            get { return m_sFatalErrorText; } 
        } // end property

        /// <summary>uživatelský text chyby</summary>
        public string UserErrorText { 
            get { return m_sUserErrorText; } 
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GSplError() { 
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="errCode">èíslo chyby</param>
        /// <param name="sqlErr">èíslo sql chyby</param>
        /// <param name="isamErr">èíslo isam chyby</param>
        /// <param name="txtErr">text chyby</param>
        /// <param name="lokErr">lokace chyby</param>
        public GSplError(GInt32 errCode,GInt32 sqlErr,GInt32 isamErr,GString txtErr,GString lokErr) : this(
            errCode == null ? 0 : errCode.BaseValue,
            sqlErr == null ? 0 : sqlErr.BaseValue,
            isamErr == null ? 0 : isamErr.BaseValue,
            txtErr == null ? String.Empty : txtErr.DecodeEOL().BaseValueTrimmed,
            lokErr == null ? String.Empty : lokErr.BaseValueTrimmed
        ) { 
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="errCode">èíslo chyby</param>
        /// <param name="sqlErr">èíslo sql chyby</param>
        /// <param name="isamErr">èíslo isam chyby</param>
        /// <param name="txtErr">text chyby</param>
        /// <param name="lokErr">lokace chyby</param>
        public GSplError(int errCode, int sqlErr, int isamErr, string txtErr, string lokErr) {
            m_nErrCode = errCode;
            m_nSqlErr = sqlErr;
            m_nIsamErr = isamErr;
            m_sTxtErr = (txtErr == null ? String.Empty : txtErr.Trim());
            m_sLokErr = (lokErr == null ? String.Empty : lokErr.Trim());
            // nastavení chybových textù dle pozice znaku #
            int l_nPosition = m_sTxtErr.IndexOf('#');
            if(l_nPosition < 0 || m_sTxtErr.Length < 2) 
                m_sFatalErrorText = m_sTxtErr;
            else {
                m_sUserErrorText = m_sTxtErr.Substring(l_nPosition + 1).TrimStart();
                if(l_nPosition > 0) 
                    m_sFatalErrorText = m_sTxtErr.Substring(0,l_nPosition).TrimEnd();
            } // end if
        } // end method

        /// <summary>
        /// veøejný konstruktor pro vyklonování hodnot ze stejného typu objektu
        /// FFIALA 2018-04-30
        /// </summary>
        /// <param name="splError">Objekt popisující výsledek SPG volání - z tohoto objektu se prevezmou hodnoty do novì vytváøeného stavového objektu</param>
        public GSplError(GSplError splError )
        {
            m_nErrCode = splError.ErrCode;
            m_nSqlErr = splError.SqlErr;
            m_nIsamErr = splError.IsamErr;
            m_sTxtErr = splError.TxtErr;
            m_sLokErr = splError.LokErr;
            m_sUserErrorText = splError.UserErrorText;      // 2021-07-07 FFIALA
            m_sFatalErrorText = splError.FatalErrorText;    // 2021-07-07 FFIALA
        } // end method

        #endregion


        /// <summary>
        /// Vypíše aktuální stav do debug výstupu
        /// </summary>
        public void WriteToDebug()
        {
            Debug.WriteLine(String.Format("ErrCode={0}", m_nErrCode ));
            Debug.WriteLine(String.Format("IsamErr={0}", IsamErr ));
            Debug.WriteLine(String.Format("SqlErr={0}", SqlErr ));
            Debug.WriteLine(String.Format("TxtErr={0}", TxtErr ));
            Debug.WriteLine(String.Format("LokErr={0}", LokErr ));
        }


        /// <summary>
        /// Vypíše aktuální stav do debug výstupu
        /// </summary>
        /// <param name="logger"></param>
        public void WriteToDebug(IGLogger logger )
        {
            logger.Debug("ErrCode={0}", m_nErrCode);
            logger.Debug("IsamErr={0}", IsamErr);
            logger.Debug("SqlErr={0}", SqlErr);
            logger.Debug("TxtErr={0}", TxtErr);
            logger.Debug("LokErr={0}", LokErr);
        }

        

    } // end class

} // end namespace
