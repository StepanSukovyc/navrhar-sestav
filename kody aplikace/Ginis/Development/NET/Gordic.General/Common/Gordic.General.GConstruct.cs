//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GConstruct.cs                    </Name>
//      <Description> vytváøení filtru pro klauzuli where sql pøíkazù </Description>
//      <Author>      Jan Kuttich                                     </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021      </Copyright>
//      <Created>     2003-03-24                                      </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using System.Globalization;
using System.Reflection;

namespace Gordic.General {

    /// <summary> vytváøení filtru pro klauzuli where sql pøíkazù z textu obsahujícího zástupné znaky</summary>
    public class GConstruct : IGObject {

        #region výètové typy

        /// <summary> typ databázového stroje </summary>
        public enum DatabaseType {
            /// <summary> nespecifikovaný databázový stroj </summary>
            NotSpecified = 0,
            /// <summary> Informix </summary>
            Informix = 1,
            /// <summary> Oraclu </summary>
            Oracle = 2,
            /// <summary> Sql Server </summary>
            SqlServer = 3
        } // end enum

        /// <summary> datový typ sloupce pro nìjž je filtr vytváøen </summary>
        public enum ColumnType {
            /// <summary> filtr pro øetìzcový sloupec </summary>
            String = 1,
            /// <summary> filtr pro celoèíselný sloupec </summary>
            Integer = 2,
            /// <summary> filtr pro sloupec s decimálním èíslem  </summary>
            Decimal = 3,
            /// <summary> filtr pro datumový sloupec </summary>
            Date = 4,
            /// <summary> filtr pro sloupec datum a èas</summary>
            DateTime = 5,
            /// <summary> filtr pro øetìzcový sloupec složený pouze z èíslic</summary>
            Digits = 6,
        } // end enum

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GConstruct).Assembly;}
        } // end property

        #endregion

        #region veøejné statické metody
        
        /// <summary>pøíprava filtru pro klauzuli where sql pøíkazu</summary>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <returns>filtr v pøípadì jeho zkonstruování, jinak prázdný øetìzec</returns>
        public static string Construct(string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType,bool provideTest) {
            if(columnName==null || (columnName=columnName.Trim())==String.Empty) throw new GException(23200212,ThisAssembly); // nebyl zadán název sloupce pro konstrukci filtru
            return ProcessFilter(provideTest,true,sourceString,columnName,columnType,databaseType);
        } // end method
        
        /// <summary>test pøípustnosti hodnot ve vstupním øetìzci pro konstrukci filtru</summary>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnType">datový typ sloupce pro který má být filtr konstruován</param>
        public static void Test(string sourceString,ColumnType columnType) {
            ProcessFilter(true,false,sourceString,string.Empty,columnType,DatabaseType.NotSpecified);
        } // end method

        #endregion

        #region soukromé statické metody

        /// <summary>test pøípustnosti hodnot a pøíprava filtru</summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>filtr v pøípadì jeho zkonstruování, jinak prázdný øetìzec</returns>
        private static string ProcessFilter(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            String l_sOutputFilter = null;
            if(sourceString == null) sourceString = String.Empty;
            else sourceString = sourceString.Trim();
            if(sourceString == String.Empty) {
                if(provideFilter) l_sOutputFilter = "1=1";
            } else {
                // zpracování vstupního øetìzce
                if(
                    (l_sOutputFilter=TryFirstTwoChars   (provideTest,provideFilter,sourceString,columnName,columnType,databaseType)) != null ||
                    (l_sOutputFilter=TryFirstChar       (provideTest,provideFilter,sourceString,columnName,columnType,databaseType)) != null ||
                    (l_sOutputFilter=TryLikeTemplate    (provideTest,provideFilter,sourceString,columnName,columnType,databaseType)) != null ||
                    (l_sOutputFilter=TryInTemplate      (provideTest,provideFilter,sourceString,columnName,columnType,databaseType)) != null ||
                    (l_sOutputFilter=TryBetweenTemplate (provideTest,provideFilter,sourceString,columnName,columnType,databaseType)) != null ||
                    (l_sOutputFilter=TryWholeString     (provideTest,provideFilter,sourceString,columnName,columnType,databaseType)) != null 
                ) {}
            } // end if
            if(l_sOutputFilter==null || l_sOutputFilter.Length==0) return String.Empty;
            else return " " + l_sOutputFilter;
        } // end method

        /// <summary> pokus o test pøípadnì pøípravu filtru základì prvních dvou znakù vstupního øetìzce </summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>null pokud zdrojový øetìzec nebyl zpracován, prázdný øetìzec v pøípadì prùchodu testem na pøípustnost hodnot nebo filtr v pøípadì jeho zkonstruování</returns>
        private static String TryFirstTwoChars(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            String l_sOutputFilter = null;
            if(sourceString.Length > 1) {
                // inicializace
                string l_sFirstTwoChars = sourceString.Substring(0,2);
                StringBuilder l_oOutputFilter = provideFilter ? new StringBuilder() : null;
                if(l_sFirstTwoChars=="!=" || l_sFirstTwoChars=="<>") { 
                    // filtr pro nerovná se
                    if(sourceString.Length == 2) {
                        if(provideFilter) {
                            l_oOutputFilter.Append(columnName);
                            l_oOutputFilter.Append(" is not null");
                            l_sOutputFilter = l_oOutputFilter.ToString();
                        } else l_sOutputFilter = String.Empty; // end if
                    } else {
                        if(provideTest) TestValue(sourceString.Substring(2),columnType);
                        if(provideFilter) {
                            l_oOutputFilter.Append(columnName);
                            l_oOutputFilter.Append("<>");
                            l_oOutputFilter.Append(ConvertValue(sourceString.Substring(2),columnType,databaseType));
                            l_sOutputFilter = l_oOutputFilter.ToString();
                        } else l_sOutputFilter = String.Empty; // end if
                    } // end if
                } else if(sourceString.Length>2 && (l_sFirstTwoChars=="<=" || l_sFirstTwoChars==">=")) {
                    // filtr pro vìtší nebo rovno, menší nebo rovno
                    if(provideTest) Test(sourceString.Substring(2),columnType);
                    if(provideFilter) {
                        l_oOutputFilter.Append(columnName);
                        l_oOutputFilter.Append(l_sFirstTwoChars);
                        l_oOutputFilter.Append(ConvertValue(sourceString.Substring(2),columnType,databaseType));
                        l_sOutputFilter = l_oOutputFilter.ToString();
                    } else l_sOutputFilter = String.Empty; // end if
                } // end if
            } // end if
            return l_sOutputFilter;
        } // end method

        /// <summary> pokus o test pøípadnì pøípravu filtru základì prvního znaku vstupního øetìzce </summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>null pokud zdrojový øetìzec nebyl zpracován, prázdný øetìzec v pøípadì prùchodu testem na pøípustnost hodnot nebo filtr v pøípadì jeho zkonstruování</returns>
        private static String TryFirstChar(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            String l_sOutputFilter = null;
            if(sourceString[0]=='<' || sourceString[0]=='>' || sourceString[0]=='=') {
                // filtr pro vìtší než, menší než, rovná se
                StringBuilder l_oOutputFilter = provideFilter ? new StringBuilder() : null;
                if(sourceString == "=") {
                    if(provideFilter) {
                        l_oOutputFilter.Append(columnName);
                        l_oOutputFilter.Append(" is null");
                        l_sOutputFilter = l_oOutputFilter.ToString();
                    } else l_sOutputFilter = String.Empty; // end if
                } else if(sourceString.Length>1) {
                    if(provideTest) TestValue(sourceString.Substring(1),columnType);
                    if(provideFilter) {
                        l_oOutputFilter.Append(columnName);
                        l_oOutputFilter.Append(sourceString[0]);
                        l_oOutputFilter.Append(ConvertValue(sourceString.Substring(1),columnType,databaseType));
                        l_sOutputFilter = l_oOutputFilter.ToString();
                    } else l_sOutputFilter = String.Empty; // end if
                } // end if
            } // end if
            return l_sOutputFilter;
        } // end method

        /// <summary> pokus o test pøípadnì pøípravu filtru stylem like </summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>null pokud zdrojový øetìzec nebyl zpracován, prázdný øetìzec v pøípadì prùchodu testem na pøípustnost hodnot nebo filtr v pøípadì jeho zkonstruování</returns>
        private static String TryLikeTemplate(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            String l_sOutputFilter = null;
            if((columnType==ColumnType.String || columnType==ColumnType.Digits) && (sourceString.IndexOf('*') != -1 || sourceString.IndexOf('?') != -1)) {
                if(provideFilter) {
                    StringBuilder l_oOutputFilter = new StringBuilder();
                    l_oOutputFilter.Append(columnName);
                    l_oOutputFilter.Append(" like '");
                    l_oOutputFilter.Append(sourceString.Replace('*','%').Replace('?','_'));
                    l_oOutputFilter.Append("'");
                    l_sOutputFilter = l_oOutputFilter.ToString();
                } else l_sOutputFilter = String.Empty; // end if
            } // end if
            return l_sOutputFilter;
        } // end method

        /// <summary> pokus o test pøípadnì pøípravu filtru stylem in </summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>null pokud zdrojový øetìzec nebyl zpracován, prázdný øetìzec v pøípadì prùchodu testem na pøípustnost hodnot nebo filtr v pøípadì jeho zkonstruování</returns>
        private static String TryInTemplate(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            String l_sOutputFilter = null;
            if(sourceString.IndexOf('|') != -1) {
                bool l_bFirstTime = true;
                StringBuilder l_oOutputFilter = provideFilter ? new StringBuilder() : null;
                string [] l_asSourceStringParts = sourceString.Split('|');
                if(l_asSourceStringParts!=null && l_asSourceStringParts.Length>1) {
                    if(provideFilter) {
                        l_oOutputFilter.Append(columnName);
                        l_oOutputFilter.Append(" in (");
                    } // end if
                    foreach(string l_sSourceStringPart in l_asSourceStringParts) {
                        if(provideTest) TestValue(l_sSourceStringPart,columnType);
                        if(provideFilter) {
                            if(l_bFirstTime) l_bFirstTime = false;
                            else l_oOutputFilter.Append(',');
                            l_oOutputFilter.Append(ConvertValue(l_sSourceStringPart,columnType,databaseType));
                        } // end if
                    } // end foreach
                    if(provideFilter) {
                        l_oOutputFilter.Append(")");
                        l_sOutputFilter = l_oOutputFilter.ToString();
                    } else l_sOutputFilter = String.Empty; // end if
                } // end if
            } // end if
            return l_sOutputFilter;
        } // end method
        
        /// <summary> pokus o test pøípadnì pøípravu filtru stylem between </summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>null pokud zdrojový øetìzec nebyl zpracován, prázdný øetìzec v pøípadì prùchodu testem na pøípustnost hodnot nebo filtr v pøípadì jeho zkonstruování</returns>
        private static String TryBetweenTemplate(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            String l_sOutputFilter = null;
            int l_nPosition = -1;
            int l_nStartIndex = 0;
            if(columnType==ColumnType.DateTime || columnType==ColumnType.Date) {
               if(sourceString.Length>18 && sourceString[10]==' ' && sourceString[13]==':' && sourceString[16]==':') l_nStartIndex = 17;
            } // end if
            if((l_nPosition=sourceString.IndexOf(':',l_nStartIndex)) != -1) {
                string l_sSourceStringPart = String.Empty;
                StringBuilder l_oOutputFilter = provideFilter ? new StringBuilder() : null;
                if(provideFilter) {
                    l_oOutputFilter.Append(columnName);
                    l_oOutputFilter.Append(" between ");
                } // end if
                l_sSourceStringPart = sourceString.Substring(0,l_nPosition++);
                if(provideTest) TestValue(l_sSourceStringPart,columnType);
                if(provideFilter) {
                    l_oOutputFilter.Append(ConvertValue(l_sSourceStringPart,columnType,databaseType));
                    l_oOutputFilter.Append(" and ");
                } // end if
                l_sSourceStringPart = sourceString.Substring(l_nPosition);
                if(provideTest) TestValue(l_sSourceStringPart,columnType);
                if(provideFilter) {
                    l_oOutputFilter.Append(ConvertValue(l_sSourceStringPart,columnType,databaseType));
                    l_sOutputFilter = l_oOutputFilter.ToString();
                } else l_sOutputFilter = String.Empty; // end if
            } // end if
            return l_sOutputFilter;
        } // end method

        /// <summary> pokus o test pøípadnì pøípravu filtru na základì øetìzce bez speciálních znakù </summary>
        /// <param name="provideTest">pøíznak provádìní testu hodnot filtru</param>
        /// <param name="provideFilter">pøíznak požadavku pøípravy filtru</param>
        /// <param name="sourceString">zdrojový øetìzec</param>
        /// <param name="columnName">název sloupce pro který je filtr konstruován</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>null pokud zdrojový øetìzec nebyl zpracován, prázdný øetìzec v pøípadì prùchodu testem na pøípustnost hodnot nebo filtr v pøípadì jeho zkonstruování</returns>
        private static String TryWholeString(bool provideTest,bool provideFilter,string sourceString,string columnName,ColumnType columnType,DatabaseType databaseType) {
            // filtr na základì øetìzce bez speciálních znakù
            String l_sOutputFilter = null;
            if(provideTest) {
                TestValue(sourceString,columnType);
                l_sOutputFilter = String.Empty;
            } // end if
            if(provideFilter) {
                StringBuilder l_oOutputFilter = new StringBuilder();
                l_oOutputFilter.Append(columnName);
                l_oOutputFilter.Append('=');
                l_oOutputFilter.Append(ConvertValue(sourceString,columnType,databaseType));
                l_sOutputFilter = l_oOutputFilter.ToString();
            } // end if
            return l_sOutputFilter;
        } // end method

        /// <summary>otestování pøípustnosti hodnoty pro vytvoøení filtru pro sloupec zadaného typu</summary>
        /// <param name="valueString">vstupní hodnota</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        private static void TestValue(string valueString,ColumnType columnType) {
            int i = 0;
            try {
                if(valueString==null || (valueString=valueString.Trim())==String.Empty) {
                    if(columnType==ColumnType.String || columnType==ColumnType.Digits) return;
                    else throw new GException(23200214,23200213,ThisAssembly); // zadaná hodnota neodpovídá oèekávanému datovému typu
                } // end if
                switch(columnType) {
                    case ColumnType.Integer : // filtr pro celoèíselný sloupec
                        Int32.Parse(valueString);
                        break; 
                    case ColumnType.Decimal : // filtr pro sloupec s decimálním èíslem
                        bool l_bDecimalPointFound = false;
                        for(i=0;i<valueString.Length;i++) {
                            if(! Char.IsDigit(valueString,i)) {
                                if(i==0 && (valueString[i]=='+' || valueString[i]=='-')) continue;
                                if(l_bDecimalPointFound==false && (valueString[i]==',' || valueString[i]=='.')) {l_bDecimalPointFound=true; continue;}
                                throw new GException(23200215,23200213,ThisAssembly); // zadaná hodnota neodpovídá oèekávanému datovému typu
                            } // end if
                        } // end for
                        break; 
                    case ColumnType.Date : // filtr pro datumový sloupec
                        goto case ColumnType.DateTime; 
                    case ColumnType.DateTime : // filtr pro sloupec datum a èas
                        if(valueString.Length==10) DateTime.ParseExact(valueString+"T00:00:00",DateTimeFormatInfo.InvariantInfo.SortableDateTimePattern,DateTimeFormatInfo.InvariantInfo);
                        else if(valueString.Length==19) DateTime.ParseExact(valueString.Replace(' ','T'),DateTimeFormatInfo.InvariantInfo.SortableDateTimePattern,DateTimeFormatInfo.InvariantInfo);
                        else if(valueString.Length==23) {
                            if(! (valueString[19]=='.' && Char.IsDigit(valueString,20) && Char.IsDigit(valueString,21) && Char.IsDigit(valueString,22))) new GException(23200216,23200213,ThisAssembly); // zadaná hodnota neodpovídá oèekávanému datovému typu 
                            DateTime.ParseExact(valueString.Substring(0,19).Replace(' ','T'),DateTimeFormatInfo.InvariantInfo.SortableDateTimePattern,DateTimeFormatInfo.InvariantInfo);
                        } else throw new GException(23200217,23200213,ThisAssembly); // zadaná hodnota neodpovídá oèekávanému datovému typu
                        break; 
                    case ColumnType.Digits : // filtr pro øetìzcový sloupec složený pouze z èíslic
                        for(i=0;i<valueString.Length;i++) {
                            if(! Char.IsDigit(valueString,i)) throw new GException(23200218,23200213,ThisAssembly); // zadaná hodnota neodpovídá oèekávanému datovému typu
                        } // end for
                        break; 
                    default : // filtr pro øetìzcový sloupec
                        break; 
                } // end switch
            } // end try
            catch(Exception e) {
                if(e.GetType() != typeof(GException)) e = new GException(23200213,ThisAssembly,e); // zadaná hodnota neodpovídá oèekávanému datovému typu
                throw e;
            } // end catch
        } // end method

        /// <summary>konverze hodnoty do požadovaného tvaru pro daný typ databázového stroje</summary>
        /// <param name="valueString">hodnota</param>
        /// <param name="columnType">datový typ sloupce pro který je filtr konstruován</param>
        /// <param name="databaseType">typ cílového databázového stroje</param>
        /// <returns>hodnota použitelná pro konstrukci filtru</returns>
        private static string ConvertValue(string valueString,ColumnType columnType,DatabaseType databaseType) {
            valueString = valueString.Trim();
            // sloupec typu desetinné èíslo
            if(columnType==ColumnType.Decimal) {
                if(databaseType == DatabaseType.Oracle) valueString = valueString.Replace('.',',');
                else if(databaseType==DatabaseType.Informix || databaseType==DatabaseType.SqlServer) valueString = valueString.Replace(',','.');
            } // end if
            // sloupec typu datum
            if(columnType==ColumnType.Date) {
                if(databaseType==DatabaseType.Informix && valueString.Length>10) valueString=valueString.Substring(0,10);
                else if(databaseType==DatabaseType.Oracle || databaseType==DatabaseType.SqlServer) {
                    if(valueString.Length == 10) valueString += " 00:00:00";
                    if(valueString.Length > 19) valueString = valueString.Substring(0,19);
                } // end if
            } // end if
            // sloupec typu datum a èas
            if(columnType==ColumnType.DateTime) {
                if(valueString.Length == 10) valueString += " 00:00:00";
                if(databaseType==DatabaseType.Informix && valueString.Length==19) valueString += ".000";
                else if(databaseType==DatabaseType.Oracle || databaseType==DatabaseType.SqlServer) {
                    if(valueString.Length > 19) valueString = valueString.Substring(0,19);
                } // end if
            } // end if
            // návrat hodnoty vèetnì uvozovek
            if(columnType==ColumnType.String || columnType==ColumnType.Digits || columnType==ColumnType.Date || columnType==ColumnType.DateTime) return "'" + valueString + "'";
            else return valueString;
        } // end method
       
        #endregion

    } // end class

} // end namespace

