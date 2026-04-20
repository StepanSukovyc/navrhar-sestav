//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GProcess.cs         </Name>
//    <Description> spuštìní exe souboru               </Description>
//    <Author>      Jan Kuttich, Libor Èaloud          </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2006-06-12                         </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Reflection;
using System.Collections.Generic;

namespace Gordic.General {

    /// <summary>spuštìní exe souboru</summary>
    [System.Security.SecurityCritical]
    public class GProcess {

        #region konstanty

        /// <summary>neznámý exit kód</summary>
        public const int m_cnUnknownExitCode = -1000;

        #endregion

        #region soukromé èleny

        /// <summary>reader pro ètení z standardního výstupu v dalším threadu</summary>
        protected StreamReader m_oStdErrorReader = null;
        
        /// <summary>reader pro ètení z StdOut v dalším threadu</summary>
        protected StreamReader m_oStdOutReader = null;
        
        /// <summary>objekt pro zápis standardního výstupu</summary>
        private TextWriter m_oOutputWriter = null;

        /// <summary>objekt pro zápis chybového výstupu</summary>
        private TextWriter m_oErrorWriter = null;

        /// <summary>název posledního provedeného exe souboru</summary>
        private string m_sExeName = null;

        /// <summary>parametry posledního provedeného exe souboru</summary>
        private string [] m_sArgs = null;

        ///<summary>pøíznak zobrazení konzolového okna</summary>
        private bool m_bShowWindow = true;

        ///<summary>pracovní adresáø</summary>
        private string m_sWorkingDirectory = null;

        ///<summary>zaèátek zpracování poslednì provádìného exe souboru</summary>
        private DateTime m_oStartTime = DateTime.MinValue;

        ///<summary>ukonèení zpracování poslednì provádìného exe souboru</summary>
        private DateTime m_oEndTime = DateTime.MinValue;

        ///<summary>chybový výstup poslednì provádìného exe souboru</summary>
        private MemoryStream m_oStdErrStream = null;

        ///<summary>standardní výstup poslednì provádìného exe souboru</summary>
        private MemoryStream m_oStdOutStream = null;

        /// <summary>výstupní kód poslednì provádìného exe souboru</summary>
        private int m_oExitCode = m_cnUnknownExitCode;

        #endregion

        #region vlastnosti

        /// <summary>název posledního provedeného exe souboru</summary>
        public string ExeName {
            get { return m_sExeName; }
            set { m_sExeName = value; }
        } // end property

        /// <summary>parametry posledního provedeného exe souboru</summary>
        public string [] CommandLineArguments {
            get { return m_sArgs; }
            set { m_sArgs = value; }
        } // end property
        
        /// <summary>pøíznak zobrazení konzolového okna</summary>
        public bool ShowWindow {
            get { return (m_bShowWindow); }
            set { m_bShowWindow = value; }
        } // end property

        /// <summary>pracovní adresáø</summary>
        public string WorkingDirectory {
            get {
                if(m_sWorkingDirectory == null) return Path.GetDirectoryName(m_sExeName);
                else return (m_sWorkingDirectory);
            } // end method
            set { m_sWorkingDirectory = value; }
        } // end property

        /// <summary>parametry posledního provedeného exe souboru</summary>
        public string CommandLineArgumentsString {
            get {
                if(m_sArgs == null) return String.Empty;
                StringBuilder l_sString = new StringBuilder();
                foreach(string str in m_sArgs) {
                    l_sString.Append(str).Append(" ");
                } // end foreach
                return l_sString.ToString();
            } // end method
        } // end property

        /// <summary>zaèátek zpracování poslednì provádìného exe souboru</summary>
        public DateTime StartTime {
            get { return (m_oStartTime); }
        } // end property
        
        /// <summary>ukonèení zpracování poslednì provádìného exe souboru</summary>
        public DateTime EndTime {
            get { return (m_oEndTime); }
        } // end property
             
        /// <summary>chybový výstup poslednì provádìného exe souboru</summary>
        public MemoryStream StdErrStream {
            get { return (m_oStdErrStream); }
        } // end property
        
        /// <summary>chybový výstup poslednì provádìného exe souboru</summary>
        public string StdErr {
            get {
                string l_sStdErr = String.Empty;
                if(m_oStdErrStream != null && m_oStdErrStream.CanSeek) {
                    m_oStdErrStream.Flush();
                    m_oStdErrStream.Position = 0;
                    StreamReader l_oReader = new StreamReader(m_oStdErrStream);
                    l_sStdErr = l_oReader.ReadToEnd();
                    m_oStdErrStream.Position = 0;
                } // end if
                return l_sStdErr;
            } // end method
        } // end property

        /// <summary>standardní výstup poslednì provádìného exe souboru</summary>
        public MemoryStream StdOutStream {
            get { return (m_oStdOutStream); }
        } // end property

        /// <summary>standardní výstup poslednì provádìného exe souboru</summary>
        public string StdOut {
            get {
                string l_sStdOut = String.Empty;
                if(m_oStdOutStream != null && m_oStdOutStream.CanSeek) {
                    m_oStdOutStream.Flush();
                    m_oStdOutStream.Position = 0;
                    StreamReader l_oReader = new StreamReader(m_oStdOutStream);
                    l_sStdOut = l_oReader.ReadToEnd();
                    m_oStdOutStream.Position = 0;
                } // end if
                return l_sStdOut;
            } // end get
        } // end property

        /// <summary>výstupní kód poslednì provádìného exe souboru</summary>
        public int ExitCode {
            get { return m_oExitCode; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GProcess).Assembly; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        /// <param name="exeName">cesta k exe souboru</param>
        /// <param name="args">parametry exe souboru</param>
        public GProcess(string exeName, params string [] args) {
            m_sArgs = args;
            m_sExeName = exeName;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="exeName">cesta k exe souboru</param>
        /// <param name="showWindow">pøíznak zobrazení konzolového okna</param>
        /// <param name="args">parametry exe souboru</param>
        public GProcess(string exeName, bool showWindow, params string [] args) {
            m_sArgs = args;
            m_sExeName = exeName;
            m_bShowWindow = showWindow;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="exeName">cesta k exe souboru</param>
        /// <param name="workingDirectory">pracovní adresáø</param>
        /// <param name="showWindow">pøíznak zobrazení konzolového okna</param>
        /// <param name="args">parametry exe souboru</param>
        public GProcess(string exeName, string workingDirectory, bool showWindow, params string [] args) {
            m_sArgs = args;
            m_sExeName = exeName;
            m_sWorkingDirectory = workingDirectory;
            m_bShowWindow = showWindow;
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>spuštìní exe souboru</summary>
        /// <returns>výstupní kód provádìného exe souboru</returns>
        public int Execute() {
            Thread l_oOutputThread = null;
            Thread l_oErrorThread = null;
            try {
                // uvolnìní zdrojù po pøedchozím volání
                if(m_oOutputWriter != null) m_oOutputWriter.Close();
                if(m_oErrorWriter != null) m_oErrorWriter.Close();
                if(m_oStdOutStream != null) m_oStdOutStream.Close();
                if(m_oStdErrStream != null) m_oStdErrStream.Close();
                // inicializace objektù pro zápis standardního a chybového výstupu
                m_oStdOutStream = new MemoryStream();
                m_oStdErrStream = new MemoryStream();
                m_oOutputWriter = new StreamWriter(m_oStdOutStream);
                m_oErrorWriter = new StreamWriter(m_oStdErrStream);
                // spuštìní procesu
                Process l_oProcess = StartProcess();
                // vytvoøení vlákna pro ètení standardního výstupu
                l_oOutputThread = new Thread(new ThreadStart(StdOutReaderThread));
                m_oStdOutReader = l_oProcess.StandardOutput;
                l_oOutputThread.Start();
                // vytvoøení vlákna pro ètení chybového výstupu
                l_oErrorThread = new Thread(new ThreadStart(StdErrReaderThread));
                m_oStdErrorReader = l_oProcess.StandardError;
                l_oErrorThread.Start();
                // èekání na ukonèení procesu
                l_oProcess.WaitForExit();
                // èekání na ukonèení vláken pro ètení standardního a chybového výstupu
                l_oOutputThread.Join(4000);
                l_oErrorThread.Join(4000);
                // vynucené ukonèení procesu
                if(l_oProcess.HasExited == false) {
                    try {
                        l_oProcess.Kill();
                    } // end try
                    catch {
                        // všechny výjimky jsou ignorovány
                    } // end catch
                } // end if
                m_oExitCode = l_oProcess.ExitCode;
                m_oEndTime = l_oProcess.ExitTime;
                return m_oExitCode;
            } // end catch
            finally {
                // vynucené ukonèení vláken pro ètení standardního a chybového výstupu
                if(l_oOutputThread != null && l_oOutputThread.IsAlive) {
                    l_oOutputThread.Abort();
                    if(m_oOutputWriter != null) m_oOutputWriter.Flush();
                } // end if
                if(l_oErrorThread != null && l_oErrorThread.IsAlive) {
                    l_oErrorThread.Abort();
                    if(m_oErrorWriter != null) m_oErrorWriter.Flush();
                } // end if
            } // end finally
        } // end method
        
        /// <summary>výpis stavu poslednì provádìného exe souboru</summary>
        /// <returns>stav poslednì provádìného exe souboru</returns>
        [System.Security.SecuritySafeCritical]
        public override string ToString() {
            return ToString(true,true);
        } // end method

        /// <summary>výpis stavu poslednì provádìného exe souboru</summary>
        /// <param name="writeStdOut">pøíznak výpisu standardního výstupu</param>
        /// <param name="writeStdErr">pøíznak výpisu chybového výstupu</param>
        /// <returns>stav poslednì provádìného exe souboru</returns>
        public string ToString(bool writeStdOut, bool writeStdErr) {
            try {
                System.Text.StringBuilder l_oString = new StringBuilder();
                l_oString.AppendLine("***************************************************************");
                l_oString.AppendLine(String.Format("* PROCESS NAME = [{0}]", Path.GetFileName(m_sExeName)));
                l_oString.AppendLine(String.Format("* START TIME =   [{0}]", m_oStartTime.ToString()));
                l_oString.AppendLine(String.Format("* END TIME =     [{0}]", m_oEndTime.ToString()));
                l_oString.AppendLine(String.Format("* ELAPSED TIME = [{0}]", m_oEndTime - m_oStartTime));
                l_oString.AppendLine(String.Format("* COMMAND LINE = [{0}]", String.Join(" ", m_sArgs)));
                string l_sStdErr = StdErr;
                string l_sStdOut = StdOut;
                if(writeStdErr && (l_sStdErr != null) && (l_sStdErr != "")) {
                    l_oString.AppendLine("------------------------ BEGIN STD ERROR -----------------------");
                    l_oString.AppendLine(l_sStdErr);
                    l_oString.AppendLine("------------------------ END STD ERROR -----------------------");
                } // end if
                if(writeStdOut && (l_sStdOut != null) && (l_sStdOut != "")) {
                    l_oString.AppendLine("----------------------- BEGIN STD OUTPUT -----------------------");
                    l_oString.AppendLine(l_sStdOut);
                    l_oString.AppendLine("----------------------- END STD OUTPUT -----------------------");
                } // end if
                l_oString.AppendLine(String.Format("* EXIT CODE =    [{0}]", m_oExitCode));
                l_oString.AppendLine("");
                return l_oString.ToString();
            } // end try
            catch(Exception e) {
                return (GResources.GetResourceText(ThisAssembly,23230034) + e.Message); // Chyba pøi vytváøení textu: 
            } // end catch
        } // end method

        #endregion

        #region statické metody

        /// <summary>spuštìní exe</summary>
        /// <param name="exeName">cesta k exe souboru</param>
        /// <param name="args">parametry exe souboru</param>
        /// <returns>instance objektu s výsledky zpracování</returns>
        public static GProcess Execute(string exeName,params string[] args) {
            GProcess l_oProcess = new GProcess(exeName,args);
            l_oProcess.Execute();
            return l_oProcess;
        } // end method

        /// <summary>spuštìní exe</summary>
        /// <param name="exeName">cesta k exe souboru</param>
        /// <param name="showWindow">pøíznak zobrazení konzolového okna</param>
        /// <param name="args">parametry exe souboru</param>
        /// <returns>instance objektu s výsledky zpracování</returns>
        public static GProcess Execute(string exeName,bool showWindow,params string[] args) {
            GProcess l_oProcess = new GProcess(exeName,showWindow,args);
            l_oProcess.Execute();
            return l_oProcess;
        } // end method

        /// <summary>spuštìní exe</summary>
        /// <param name="exeName">cesta k exe souboru</param>
        /// <param name="workingDirectory">pracovní adresáø</param>
        /// <param name="showWindow">pøíznak zobrazení konzolového okna</param>
        /// <param name="args">parametry exe souboru</param>
        /// <returns>instance objektu s výsledky zpracování</returns>
        public static GProcess Execute(string exeName,string workingDirectory,bool showWindow,params string[] args) {
            GProcess l_oProcess = new GProcess(exeName,workingDirectory,showWindow,args);
            l_oProcess.Execute();
            return l_oProcess;
        } // end method

        /// <summary>získání parametrù exe souboru ze vstupního øetìzce</summary>
        /// <param name="args">vstupní øetìzec obsahující parametry exe souboru</param>
        /// <returns>parametry exe souboru</returns>
        public static string[] ParseArguments(string args) {
            if(args == null || (args = args.Trim()) == String.Empty) return null;
            List<string> l_oArgs = new List<string>();
            int l_nPos = 0;
            for(int i = 0; i < args.Length; i++) {
                if(args[i] == ' ' || args[i] == '\t') {
                    if(args[l_nPos] == '"' && (l_nPos == i - 1 || args[i - 1] != '"')) continue;
                    if(i > l_nPos) l_oArgs.Add(args.Substring(l_nPos,i - l_nPos));
                    l_nPos = i + 1;
                } // end if
            } // end for
            if(l_nPos < args.Length) l_oArgs.Add(args.Substring(l_nPos));
            return l_oArgs.ToArray();
        } // end method

        #endregion

        #region soukromé metody
        
        /// <summary>start nového procesu</summary>
        /// <returns>instance nového procesu</returns>
        protected virtual Process StartProcess() {
            Process l_oProcess = new Process();
            PrepareProcess(l_oProcess);
            try {
                l_oProcess.Start();
                m_oStartTime = DateTime.Now;
                return l_oProcess;
            } // end try
            catch(Exception e) {
                throw new GException(23200240,ThisAssembly,e,m_sExeName); // pøi spouštìní procesu {0} došlo k neoèekávané výjimce
            } // end catch
        } // end method

        /// <summary>pøíprava procesu</summary>
        /// <param name="process">instance procesu</param>
        protected virtual void PrepareProcess(Process process) {
            if(File.Exists(m_sExeName) == false) throw new GException(23200241,ThisAssembly,m_sExeName); // selhal pokus o nastavení parametrù procesu, nenalezen soubor {0}
            try {
                process.StartInfo.FileName = ExeName;
                process.StartInfo.Arguments = CommandLineArgumentsString;
                process.StartInfo.CreateNoWindow = m_bShowWindow == false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.WorkingDirectory = WorkingDirectory;
            } // end try
            catch(Exception e) {
                throw new GException(23200242,ThisAssembly,e,m_sExeName); // pøi pokusu o nastavení parametrù procesu {0} došlo k neoèekávané výjimce
            } // end catch
        } // end method

        /// <summary>logika vlákna pro ètení standardního výstupu</summary>
        private void StdOutReaderThread() {
            StreamReader l_oReader = new StreamReader(m_oStdOutReader.BaseStream,Encoding.GetEncoding(852));
            string l_sLogContents;
            while((l_sLogContents = l_oReader.ReadLine()) != null) {
                lock(this) {
                    m_oOutputWriter.WriteLine(l_sLogContents);
                } // end lock
                System.Threading.Thread.Sleep(10);
            } // end while
            m_oOutputWriter.Flush();
        } // end method

        /// <summary>logika vlákna pro ètení chybového výstupu</summary>
        private void StdErrReaderThread() {
            StreamReader l_oReader = new StreamReader(m_oStdErrorReader.BaseStream,Encoding.GetEncoding(852));
            string l_sLogContents;
            while((l_sLogContents = l_oReader.ReadLine()) != null) {
                lock(this) {
                    m_oErrorWriter.WriteLine(l_sLogContents);
                } // end lock
                System.Threading.Thread.Sleep(10);
            } // end while
            m_oErrorWriter.Flush();
        } // end method

        #endregion

    } // end class

} // end namespace
