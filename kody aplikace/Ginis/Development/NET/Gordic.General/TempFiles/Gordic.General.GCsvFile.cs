//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCsvFile.cs                           </Name>
//    <Description> podpora pøevodu csv souboru do formátu xml nebo json </Description>
//    <Author>      Jan Kuttich                                          </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                   </Copyright>
//    <Created>     2015-10-22                                           </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.IO;
using System.Text;
using System.Xml;
using System.Collections.Generic;

namespace Gordic.General {

    /// <summary>podpora pøevodu csv souboru do formátu xml nebo json</summary>
    public class GCsvFile : IGObject {

        #region výètové typy

        /// <summary>formát souboru</summary>
        private enum FileFormat {
            /// <summary>soubor ve formátu XML</summary>
            Xml,
            /// <summary>soubor ve formátu JSON</summary>
            Json,
            /// <summary>soubor ve formátu CSV</summary>
            Csv
        } // end enum

        #endregion

        #region konstanty

        /// <summary>výchozí oddìlovaè záznamù ve vstupním souboru</summary>
        private const char m_ccDefaultSeparator = ';';

        #endregion

        #region datové èleny

        /// <summary>cesta ke vstupnímu souboru</summary>
        private readonly string m_sInputPath;

        /// <summary>cesta k výstupnímu souboru</summary>
        private readonly string m_sOutputPath;

        /// <summary>formát výstupního souboru</summary>
        private readonly FileFormat m_eOutputFormat;

        /// <summary>kódová stránka vstupního souboru</summary>
        private readonly Encoding m_oInputEncoding = Encoding.Default;

        /// <summary>oddìlovaè záznamù ve vstupním souboru</summary>
        private readonly char m_cSeparator = m_ccDefaultSeparator;

        /// <summary>pøíznak pøepsání výstupního souboru pokud existuje</summary>
        private readonly bool m_bOverwrite = true;

        /// <summary>pøíznak prvního øádku s názvy položek ve vstupním souboru</summary>
        private readonly bool m_bTitleLine = false;

        /// <summary>èíslo aktuálního øádku</summary>
        private int m_nLine = 0;

        /// <summary>èíslo aktuální položky</summary>
        private int m_nItem = 0;

        /// <summary>objekt pro zápis do výstupního xml souboru</summary>
        private XmlTextWriter m_oXmlOutput = null;
        
        /// <summary>objekt pro zápis do výstupního json souboru</summary>
        private StreamWriter m_oJsonOutput = null;

        /// <summary>pøíznak zápisu uvození pole øádkù</summary>
        private bool m_bJsonRowArrayWritten = false;

        /// <summary>kolekce názvù položek</summary>
        private List<string> m_oItemName = null;

        /// <summary>pomocný výstupní soubor</summary>
        private GTempFile m_oOutputFile = null;

        #endregion

        #region vlastnosti

        /// <summary>cesta ke vstupnímu souboru</summary>
        private string InputPath {
            get { return m_sInputPath; }
        } // end property

        /// <summary>cesta k výstupnímu souboru</summary>
        private string OutputPath {
            get { return m_sOutputPath; }
        } // end property

        /// <summary>formát výstupního souboru</summary>
        private FileFormat OutputFormat {
            get { return m_eOutputFormat; }
        } // end property

        /// <summary>kódová stránka vstupního souboru</summary>
        private Encoding InputEncoding {
            get { return m_oInputEncoding; }
        } // end property

        /// <summary>oddìlovaè záznamù ve vstupním souboru</summary>
        private char Separator {
            get { return m_cSeparator; }
        } // end property

        /// <summary>pøíznak pøepsání výstupního souboru pokud existuje</summary>
        private bool Overwrite {
            get { return m_bOverwrite; }
        } // end property

        /// <summary>pøíznak prvního øádku s názvy položek ve vstupním souboru</summary>
        private bool TitleLine {
            get { return m_bTitleLine; }
        } // end property

        /// <summary>èíslo aktuálního øádku</summary>
        private int Line {
            get { return m_nLine; }
        } // end property

        /// <summary>èíslo aktuální položky</summary>
        private int Item {
            get { return m_nItem; }
        } // end property

        /// <summary>objekt pro zápis do výstupního xml souboru</summary>
        private XmlTextWriter XmlOutput {
            get { return m_oXmlOutput; }
        } // end property

        /// <summary>objekt pro zápis do výstupního json souboru</summary>
        private StreamWriter JsonOutput {
            get { return m_oJsonOutput; }
        } // end property

        /// <summary>pomocný výstupní soubor</summary>
        private GTempFile OutputFile {
            get { return m_oOutputFile; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GCsvFile).Assembly;}
        } // end property

        #endregion

        #region konstruktory

        /// <summary>konstruktor</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="outputFormat">formát výstupního souboru</param>
        /// <param name="separator">oddìlovaè záznamù ve vstupním souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        /// <param name="overwrite">pøíznak pøepsání výstupního souboru pokud existuje</param>
        /// <param name="titleLine">pøíznak prvního øádku s názvy položek ve vstupním souboru</param>
        private GCsvFile(string inputPath,string outputPath,FileFormat outputFormat,char separator,Encoding inputEncoding,bool overwrite,bool titleLine) {
            // inicializace hodnot
            m_eOutputFormat = outputFormat;
            m_cSeparator = separator;
            m_oInputEncoding = inputEncoding;
            m_bOverwrite = overwrite;
            m_bTitleLine = titleLine;
            // cesta ke vstupnímu souboru
            if(String.IsNullOrWhiteSpace(inputPath)) throw new GArgumentNullException(23200523,"inputPath");
            else m_sInputPath = Path.GetFullPath(inputPath);
            if(File.Exists(m_sInputPath) == false) throw new GException(23200525,ThisAssembly,m_sInputPath); // nebyl nalezen vstupní soubor {0}
            // cesta k výstupnímu souboru
            if(String.IsNullOrWhiteSpace(outputPath)) {
                if(outputFormat == FileFormat.Csv) {
                    m_oOutputFile = new GTempFile(Path.GetDirectoryName(m_sInputPath),Path.GetExtension(m_sInputPath));
                    m_sOutputPath = m_oOutputFile.Path;
                } else throw new GArgumentNullException(23200524,"outputPath");
            } else {
                m_sOutputPath = Path.GetFullPath(outputPath);
                if(Directory.Exists(Path.GetDirectoryName(m_sOutputPath)) == false) throw new GException(23200526,ThisAssembly,m_sInputPath); // nebyl nalezen adresáø pro výstupní soubor {0}
                if(overwrite == false && File.Exists(m_sOutputPath)) throw new GException(23200531,ThisAssembly,m_sInputPath); // výstupní soubor {0} již existuje
            } // end if
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>pøevod csv souboru do xml</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        public static void ToXmlFile(string inputPath,string outputPath) {
            ToXmlFile(inputPath,outputPath,m_ccDefaultSeparator,Encoding.Default,true,false);
        } // end method

        /// <summary>pøevod csv souboru do xml</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="separator">oddìlovaè záznamù ve vstupním souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        /// <param name="overwrite">pøíznak pøepsání výstupního souboru pokud existuje</param>
        /// <param name="titleLine">pøíznak prvního øádku s názvy položek ve vstupním souboru</param>
        public static void ToXmlFile(string inputPath,string outputPath,string separator,string inputEncoding,bool overwrite,bool titleLine) {
            if(separator == null || (separator = separator.Trim()).Length != 1) throw new GArgumentException(23200534,"separator");
            ToXmlFile(inputPath,outputPath,separator[0],GetEncoding(inputEncoding),overwrite,titleLine);
        } // end method

        /// <summary>pøevod csv souboru do xml</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="separator">oddìlovaè záznamù ve vstupním souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        /// <param name="overwrite">pøíznak pøepsání výstupního souboru pokud existuje</param>
        /// <param name="titleLine">pøíznak prvního øádku s názvy položek ve vstupním souboru</param>
        public static void ToXmlFile(string inputPath,string outputPath,char separator,Encoding inputEncoding,bool overwrite,bool titleLine) {
            try {
                new GCsvFile(inputPath,outputPath,FileFormat.Xml,separator,inputEncoding,overwrite,titleLine).ConvertFile();
            } // end try
            catch(Exception e) {
                throw new GException(23200527,ThisAssembly,e); // specifikovaný soubor se nepodaøilo pøevést do formátu xml
            } // end catch
        } // end method

        /// <summary>pøevod csv souboru do xml</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        public static void ToJsonFile(string inputPath,string outputPath) {
            ToJsonFile(inputPath,outputPath,m_ccDefaultSeparator,Encoding.Default,true,false);
        } // end method

        /// <summary>pøevod csv souboru do xml</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="separator">oddìlovaè záznamù ve vstupním souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        /// <param name="overwrite">pøíznak pøepsání výstupního souboru pokud existuje</param>
        /// <param name="titleLine">pøíznak prvního øádku s názvy položek ve vstupním souboru</param>
        public static void ToJsonFile(string inputPath,string outputPath,string separator,string inputEncoding,bool overwrite,bool titleLine) {
            if(separator == null || (separator = separator.Trim()).Length != 1) throw new GArgumentException(23200535,"separator");
            ToJsonFile(inputPath,outputPath,separator[0],GetEncoding(inputEncoding),overwrite,titleLine);
        } // end method

        /// <summary>pøevod csv souboru do xml</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="separator">oddìlovaè záznamù ve vstupním souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        /// <param name="overwrite">pøíznak pøepsání výstupního souboru pokud existuje</param>
        /// <param name="titleLine">pøíznak prvního øádku s názvy položek ve vstupním souboru</param>
        public static void ToJsonFile(string inputPath,string outputPath,char separator,Encoding inputEncoding,bool overwrite,bool titleLine) {
            try {
                new GCsvFile(inputPath,outputPath,FileFormat.Json,separator,inputEncoding,overwrite,titleLine).ConvertFile();
            } // end try
            catch(Exception e) {
                throw new GException(23200533,ThisAssembly,e); // specifikovaný soubor se nepodaøilo pøevést do formátu json
            } // end catch
        } // end method

        /// <summary>pøevod csv souboru do souboru s kódováním utf-8</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        public static void ToUtf8(string inputPath) {
            ToUtf8(inputPath,null,Encoding.Default);
        } // end method

        /// <summary>pøevod csv souboru do souboru s kódováním utf-8</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        public static void ToUtf8(string inputPath,Encoding inputEncoding) {
            ToUtf8(inputPath,null,inputEncoding);
        } // end method

        /// <summary>pøevod csv souboru do souboru s kódováním utf-8</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        public static void ToUtf8(string inputPath,string outputPath) {
            ToUtf8(inputPath,outputPath,Encoding.Default);
        } // end method

        /// <summary>pøevod csv souboru do souboru s kódováním utf-8</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        public static void ToUtf8(string inputPath,string outputPath,string inputEncoding) {
            ToUtf8(inputPath,outputPath,GetEncoding(inputEncoding));
        } // end method

        /// <summary>pøevod csv souboru do souboru s kódováním utf-8</summary>
        /// <param name="inputPath">cesta ke vstupnímu souboru</param>
        /// <param name="outputPath">cesta k výstupnímu souboru</param>
        /// <param name="inputEncoding">kódová stránka vstupního souboru</param>
        public static void ToUtf8(string inputPath,string outputPath,Encoding inputEncoding) {
            new GCsvFile(inputPath,outputPath,FileFormat.Csv,m_ccDefaultSeparator,inputEncoding,true,false).ConvertFile();
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání kódové stránky</summary>
        /// <param name="name">název kódové stránky</param>
        /// <returns>kódová stránka</returns>
        private static Encoding GetEncoding(string name) {
            try {
                return String.IsNullOrWhiteSpace(name) ? Encoding.Default : Encoding.GetEncoding(name.Trim());
            } // end try
            catch(Exception e) {
                throw new GException(23200532,ThisAssembly,e,name); // nepodaøilo se získat kódovou stránku {0}
            } // end catch
        } // end method

        /// <summary>konverze vstupního souboru do požadovaného formátu</summary>
        private void ConvertFile() {
            bool l_bReplaceInputFile = false;
            try {
                // otevøení výstupního souboru
                OpenOutputFile();
                // zápis zaèátku souboru
                WriteStartFile();
                // cykl pro ètení souboru po øádcích
                foreach(string l_sLine in File.ReadLines(InputPath,InputEncoding)) {
                    if(OutputFormat == FileFormat.Csv) {
                        JsonOutput.WriteLine(l_sLine);
                    } else {
                        m_nLine++;
                        m_nItem = 1;
                        ParseLine(l_sLine);
                    } // end if
                } // end foreach
                // zápis konce souboru
                WriteEndFile();
                // požadavek na nahrazení vstupního souboru
                l_bReplaceInputFile = OutputFile != null;
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200528,ThisAssembly,e,InputPath); // selhal pokus o konverzi souboru {0}
                throw e;
            } // end catch
            finally {
                // uzavøení výstupního souboru
                CloseOutputFile();
                // uvolnìní pomocného výstupního souboru
                ReleaseOutputFile(l_bReplaceInputFile);
            } // end finally
        } // end method

        /// <summary>analýza øádku vstupního souboru</summary>
        /// <param name="text">text øádku</param>
        private void ParseLine(string text) {
            try {
                if(String.IsNullOrEmpty(text) == false) {
                    // lokální promìnné
                    int l_nStart = 0; // poèáteèní index položky
                    int l_nStop = text.Length - 1; // koncový index celého øádku
                    bool l_bContinue = false; // pøíznak pokraèování v položce
                    bool l_bReplace = false; // pøíznak výskytu dvojité uvozovky v položce
                    // zápis zaèátku øádku
                    WriteStartLine();
                    // cykl pro procházení textu po znacích
                    for(int i = 0; i < text.Length; i++) {
                        if(text[i] == '"') {
                            // ošetøení uvozovky
                            if(l_bContinue) {
                                if(i < l_nStop && text[i + 1] == '"') { // dvojitá uvozovka
                                    l_bReplace = true;
                                    i++;
                                } else l_bContinue = false;
                            } else l_bContinue = true;
                        } else if(text[i] == Separator && l_bContinue == false) {
                            // ošetøení oddìlovaèe
                            if(l_nStart < (i - 1) && text[l_nStart] == '"' && text[i - 1] == '"') {
                                WriteItem(text.Substring(l_nStart + 1,i - l_nStart - 2),l_bReplace);
                            } else {
                                WriteItem(text.Substring(l_nStart,i - l_nStart),l_bReplace);
                            } // end if
                            l_nStart = i + 1;
                            l_bReplace = false;
                            m_nItem++;
                        } // end if
                    } // end for
                    // ošetøení poslední položky
                    if(l_nStart < l_nStop) {
                        if(l_nStart < (l_nStop - 1) && text[l_nStart] == '"' && text[l_nStop] == '"') {
                            WriteItem(text.Substring(l_nStart + 1,l_nStop - l_nStart - 1),l_bReplace);
                        } else {
                            WriteItem(text.Substring(l_nStart),l_bReplace);
                        } // end if
                    } // end if
                    // zápis konce øádku
                    WriteEndLine();
                } // end if
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200529,ThisAssembly,e,InputPath,Line,Item); // selhal pokus o provedení analýzy øádku dat - soubor: {0}  øádek: {1}  položka: {2}
                throw e;
            } // end catch
        } // end method

        /// <summary>otevøení výstupního souboru</summary>
        private void OpenOutputFile() {
            try {
                if(OutputFormat == FileFormat.Xml) {
                    m_oXmlOutput = new XmlTextWriter(OutputPath,Encoding.UTF8);
                    m_oXmlOutput.Formatting = Formatting.Indented;
                    m_oXmlOutput.WriteStartDocument();
                } else {
                    m_oJsonOutput = new StreamWriter(OutputPath,false,Encoding.UTF8);
                } // end if
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200530,ThisAssembly,e,OutputPath); // selhal pokus o otevøení výstupního souboru {0}
                throw e;
            } // end catch
        } // end method

        /// <summary>zápis zaèátku souboru</summary>
        private void WriteStartFile() {
            if(OutputFormat == FileFormat.Xml) XmlOutput.WriteStartElement("data");
            else if(OutputFormat == FileFormat.Json) {
                JsonOutput.WriteLine("{");
                JsonOutput.WriteLine("  \"data\": {");
            } // end if
        } // end method

        /// <summary>zápis zaèátku øádku</summary>
        private void WriteStartLine() {
            if(TitleLine == false || Line > 1) {
                if(OutputFormat == FileFormat.Xml) XmlOutput.WriteStartElement("row");
                else {
                    if(m_bJsonRowArrayWritten) JsonOutput.WriteLine(',');
                    else {
                        JsonOutput.WriteLine("    \"row\": [");
                        m_bJsonRowArrayWritten = true;
                    } // end if
                    JsonOutput.Write("      {");
                } // end if
            } // end if
        } // end method

        /// <summary>zápis zaèátku položky</summary>
        private void WriteStartItem() {
            if(OutputFormat == FileFormat.Xml) XmlOutput.WriteStartElement(GetItemName());
            else {
                if(Item > 1) JsonOutput.Write(", ");
                JsonOutput.Write("\"" + GetItemName() + "\":\"");
            } // end if
        } // end method

        /// <summary>získání názvu položky</summary>
        /// <returns>název položky</returns>
        private string GetItemName() {
            if(m_oItemName != null && (Item - 1) < m_oItemName.Count) return m_oItemName[Item - 1];
            else return "item_" + Item.ToString();
        } // end method

        /// <summary>zápis položky</summary>
        /// <param name="text">hodnota položky</param>
        /// <param name="replace">pøíznak nahrazení zdvojených uvozovek</param>
        private void WriteItem(string text,bool replace) {
            if(TitleLine && Line == 1) {
                // definice názvù položek
                if(m_oItemName == null) m_oItemName = new List<string>(20);
                string l_sItemName = replace ? text.Trim().Replace("\"\"","\"") : text.Trim();
                l_sItemName = GCommon.RemoveDiacritics(l_sItemName); // odstranìní diakritiky
                l_sItemName = GCommon.NormalizeXml(l_sItemName); // odstranìní zakázaných XML znakù
                m_oItemName.Add(l_sItemName);
            } else {
                // zápis zaèátku položky
                WriteStartItem();
                // hodnota položky
                if(OutputFormat == FileFormat.Xml) XmlOutput.WriteString(replace ? text.Replace("\"\"","\"") : text);
                else WriteJsonString(replace ? text.Replace("\"\"","\"") : text);
                // zápis konce položky
                WriteEndItem();
            } // end if
        } // end method

        /// <summary>zápis konce položky</summary>
        private void WriteEndItem() {
            if(OutputFormat == FileFormat.Xml) XmlOutput.WriteEndElement();
            else JsonOutput.Write('"');
        } // end method

        /// <summary>zápis konce øádku</summary>
        private void WriteEndLine() {
            if(TitleLine == false || Line > 1) {
                if(OutputFormat == FileFormat.Xml) XmlOutput.WriteEndElement();
                else JsonOutput.Write('}');
            } // end if
        } // end method

        /// <summary>zápis konce souboru</summary>
        private void WriteEndFile() {
            if(OutputFormat == FileFormat.Xml) {
                XmlOutput.WriteEndElement();
            } else if(OutputFormat == FileFormat.Json) {
                if(m_bJsonRowArrayWritten) {
                    JsonOutput.WriteLine();
                    JsonOutput.WriteLine("    ]");
                } // end if
                JsonOutput.WriteLine("  }");
                JsonOutput.WriteLine("}");
            } // end if
        } // end method

        /// <summary>uzavøení výstupního souboru</summary>
        private void CloseOutputFile() {
            try {
                if(OutputFormat == FileFormat.Xml) {
                    if(m_oXmlOutput != null) {
                        m_oXmlOutput.Flush();
                        m_oXmlOutput.Close();
                        m_oXmlOutput = null;
                    } // end if
                } else {
                    if(m_oJsonOutput != null) {
                        m_oJsonOutput.Flush();
                        m_oJsonOutput.Close();
                        m_oJsonOutput = null;
                    } // end if
                } // end if
            } // end try
            catch(Exception e) {
                System.Diagnostics.Debug.Assert(false,e.Message);
            } // end catch
        } // end method


        /// <summary>uvolnìní pomocného souboru</summary>
        /// <param name="replaceInputFile">pøíznak požadavku na nahrazení vstupního souboru</param>
        private void ReleaseOutputFile(bool replaceInputFile) {
            try {
                if(OutputFile != null) {
                    if(replaceInputFile) File.Replace(OutputFile.Path,InputPath,null,true);
                    else GTempFiles.DeleteTempFile(m_oOutputFile.Path);
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200537,23200528,ThisAssembly,e,InputPath); // selhal pokus o konverzi souboru {0}
            } // end catch
            finally {
                m_oOutputFile = null;
            } // end finally
        } // end method

        /// <summary>zápis json textu s ošetøením speciálních znakù</summary>
        /// <param name="text">text</param>
        private void WriteJsonString(string text) {
            char l_cCurrent;
            int l_nStart = 0;
            int l_nCount = 0;
            for(int i = 0; i < text.Length; i++) {
                l_cCurrent = text[i];
                if(l_cCurrent.In('"','\\','\n','\r','\t','\b','\f')) {
                    if(l_nCount > 0) JsonOutput.Write(text.Substring(l_nStart,l_nCount));
                    JsonOutput.Write('\\');
                    JsonOutput.Write(l_cCurrent);
                    l_nStart = i + 1;
                    l_nCount = 0;
                } else if(l_cCurrent < 0x20 || (l_cCurrent > 0x7E && l_cCurrent < 0xA0) || l_cCurrent > 0x1FC) {
                    if(l_nCount > 0) JsonOutput.Write(text.Substring(l_nStart,l_nCount));
                    JsonOutput.Write("\\u{0:x4}",(int) l_cCurrent);
                    l_nStart = i + 1;
                    l_nCount = 0;
                } else l_nCount++;
            } // end for
            if(l_nCount > 0) JsonOutput.Write(text.Substring(l_nStart,l_nCount));
        } // end method

        #endregion

    } // end class

} // end namespace
