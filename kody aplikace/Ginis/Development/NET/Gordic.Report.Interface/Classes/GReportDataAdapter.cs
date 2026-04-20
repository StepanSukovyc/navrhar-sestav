//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Server.GReportDataAdapter.cs                  </Name>
//    <Description> Třída pro čtení dat jako výstupu sestavy. Provádí konverzi datového výstupu "pro grafické sestavy" do .net DataSetu</Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-03-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using Gordic.General;
using Gordic.Report.Interface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Třída pro čtení dat jako výstupu sestavy. Provádí konverzi datového výstupu "pro grafické sestavy" do .net DataSetu
    /// </summary>
    [System.Security.SecurityCritical]
    public class GReportDataAdapter : IDataAdapter
    {
        IGMemoryFile m_data;
        IGMemoryFile m_xme;

        /// <summary>
        /// Vytvoření načítače pro sestavy
        /// </summary>
        /// <param name="report">sestava (grafická)</param>
        public GReportDataAdapter(IGReport report)
        {
            var imp = report as IGReportImplementation;
            if (imp == null) throw new GArgumentException(21000092, "report");
            
            m_data = imp.Generate(null);
            m_data.Position = 0;
            m_xme = imp.Files[2];
        }

        /// <summary>
        /// Vytvoření načítače pro sestavy
        /// </summary>
        public GReportDataAdapter(IGMemoryFile data = null, IGMemoryFile xme = null)
        {
            m_data = data;
            m_xme = xme;
        }

        /// <summary>
        /// Vytvoření načítače pro sestavy
        /// </summary>
        public GReportDataAdapter(Gordic.Report.Implementation.GSsrReport report)
        {
            m_data = report.Data.LoadToMemoryFile();
            m_xme = report.Structure.LoadToMemoryFile();
        }

        /// <summary>
        /// Vytvoření načítače pro sestavy ze SRZ souboru
        /// </summary>
        public static GReportDataAdapter LoadFromSRZ(string fname)
        {
            using (Gordic.Report.Implementation.GSrz srz = new Gordic.Report.Implementation.GSrz(fname))
            {
                return new GReportDataAdapter(srz.Reports[0]);
            }
        }
        /// <summary>
        /// Vytvoření načítače pro sestavy ze SRZ souboru
        /// </summary>
        public static GReportDataAdapter LoadFromSRZ(Stream srzStream)
        {
            using (Gordic.Report.Implementation.GSrz srz = new Gordic.Report.Implementation.GSrz(srzStream))
            {
                return new GReportDataAdapter(srz.Reports[0]);
            }
        }

        /// <summary>
        /// Vyplní GDataSet dle vysledku sestavy (spustí generování)
        /// </summary>        public int Fill(DataSet dataSet)
        {
            if (!(dataSet is GDataSet))
                throw new GArgumentException(21000093);
            GDataSet ds = (GDataSet)dataSet;

            if (ds.Tables.Count == 0)
                using (Stream s = m_xme.ReadStream())
                {
                    //nacteni schematu
                    ds.ReadXmlSchema(s);
                }

            m_Reader = null;
            if (GDataReaderUnload.CheckDataFile(m_data)) m_Reader = new GDataReaderUnload();
            else if (GDataReaderXml.CheckDataFile(m_data)) m_Reader = new GDataReaderXml();
            //else if (GDataReaderTransform::CheckDataFile(m_data)) r=new GDataReaderTransform();
            //else if (GDataReaderGenerator::CheckDataFile(m_data)) r=new GDataReaderGenerator();
            //else if (GDataReaderAlCode::CheckDataFile(m_data)) r=new GDataReaderAlCode();

            if (m_Reader == null)
                throw new GReportDataException(21000094, 42, m_data.FileName); //RC-EX 42 : Soubor {0} nelze otevřít jako datový soubor - neznámý typ!

            using (Stream s = m_data.ReadStream())
                return m_Reader.Read(ds, s);
        }

        /// <summary>
        /// Uloží GDataSet do souboru
        /// </summary>
        public void Save(GDataSet dataSet, Stream saveTo, Encoding encoding, DataType type = DataType.unknown)
        {
            if (type != DataType.unknown) Type = type;
            else if (m_Reader == null) throw new GArgumentOutOfRangeException("type");
            m_Reader.Save(dataSet, dataSet.XMETA_ixs, dataSet.XMETA_ver, dataSet.XMETA_subver, encoding, saveTo);
        }
        /// <summary>
        /// Uloží GDataSet do souboru
        /// </summary>
        public void Save(DataSet dataSet, Stream saveTo, Encoding encoding, DataType type = DataType.unknown)
        {
            if (type != DataType.unknown) Type = type;
            else if (m_Reader == null) throw new GArgumentOutOfRangeException("type");

            var gds = new GDataSet() { Namespace = dataSet.Namespace };
            gds.UpdateFromNamespace();
            m_Reader.Save(dataSet, gds.XMETA_ixs, gds.XMETA_ver, gds.XMETA_subver, encoding, saveTo);
        }

        DataReader m_Reader;
        /// <summary>Typ načtených či ukládaných dat</summary>
        public DataType Type
        {
            get { return m_Reader == null ? DataType.unknown : m_Reader.Type; }
            set
            {
                if (m_Reader != null && m_Reader.Type == value) return;
                switch (value)
                {
                    case DataType.unknown:
                        m_Reader = null;
                        break;
                    case DataType.unload:
                        m_Reader = new GDataReaderUnload();
                        break;
                    case DataType.xml:
                        m_Reader = new GDataReaderXml();
                        break;
                }
            }
        }

        #region IDataAdapter Members        DataTable[] IDataAdapter.FillSchema(DataSet dataSet, SchemaType schemaType)
        {
            if (!(dataSet is GDataSet))
                throw new GArgumentException(21000095);
            GDataSet ds = (GDataSet)dataSet;
            using (Stream s = m_xme.ReadStream())
            {
                //nacteni schematu
                ds.ReadXmlSchema(s);
            }
            return new DataTable[0];
        }        IDataParameter[] IDataAdapter.GetFillParameters()
        {
            return new IDataParameter[0];
        }

        
        MissingMappingAction IDataAdapter.MissingMappingAction
        {            get
            {
                return MissingMappingAction.Passthrough;
            }            set
            {
            }
        }

        MissingSchemaAction IDataAdapter.MissingSchemaAction
        {            get
            {
                return MissingSchemaAction.AddWithKey;
            }            set
            {
            }
        }

        ITableMappingCollection IDataAdapter.TableMappings
        {            get
            {
                throw new GNotImplementedException(21000096);
            }
        }        int IDataAdapter.Update(DataSet dataSet)
        {
            throw new GNotImplementedException(21000097);
        }

        #endregion
    }


    /// <summary>Výjimka datového souboru sestav a formulářů</summary>
    [Serializable]    public class GReportDataException : GReportException
    {
        [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
        internal GReportDataException(int code, int resourceCode, params string[] parameters)
            : base(code, resourceCode, System.Reflection.Assembly.GetExecutingAssembly(), parameters)
        {
        }

        [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
        internal GReportDataException(int code, int resourceCode, Exception innerException, params string[] parameters)
            : base(code, resourceCode, System.Reflection.Assembly.GetExecutingAssembly(), innerException, parameters)
        {
        }

        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GReportDataException(System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }

        /// <exclude/>
        public int Line { get; set; }
        /// <exclude/>
        public string Region { get; set; }
        /// <exclude/>
        public override string Message
        {            get
            {
                StringBuilder l_oMessageBuilder = new StringBuilder();
                //if (ShortMessage.StartsWith(Prefix) == false) AppendPrefix(l_oMessageBuilder);
                l_oMessageBuilder.Append(GResources.GetResourceText(59)); //RC 59 : Chyba datového souboru
                l_oMessageBuilder.Append(": ");
                l_oMessageBuilder.Append(ShortMessage);
                if (Line > 0)
                {
                    //l_oMessageBuilder.AppendLine();
                    l_oMessageBuilder.Append(" ");
                    if (Region != null)
                        l_oMessageBuilder.AppendFormat("(řádek {0}, sekce {1})", Line, Region);
                    else
                        l_oMessageBuilder.AppendFormat("(řádek {0})", Line);
                }
                AppendPostfix(l_oMessageBuilder, Code, AssemblyName, AssemblyVersion);
                return l_oMessageBuilder.ToString();
            }
        }
    }

    /// <summary>Typ načtených či ukládaných dat</summary>
    public enum DataType
    {
        /// <summary>Nespecifikovaný typ</summary>
        unknown = 0,
        /// <summary>textový tvar, oddělený svislýtky se jménem oblasti na počátku</summary>
        unload,
        /// <summary>XML data</summary>
        xml,
    }

    public abstract class DataReader
    {
        public abstract int Read(GDataSet ds, Stream s);
        public abstract DataType Type { get; }
        public abstract void Save(DataSet dataSet, string XMETA_ixs, int XMETA_ver, int XMETA_subver, Encoding encoding, Stream saveTo);
    }

    public class GDataReaderUnload : DataReader
    {
        public override DataType Type
        {
            get { return DataType.unload; }
        }

        private static byte[] header = System.Text.Encoding.ASCII.GetBytes("ixs_xme|");
        public static bool CheckDataFile(IGMemoryFile s)
        {
            if (s.FileName.StartsWith(":")) return false; //pokud jmeno zacina : tak to urcite nechci
            var p = s.Position;
            if (s.Length - p < 13) return false; //minimum ixs_xme||1|1|
            try
            {
                var l = header.Length;
                for (int i = 0; i < l; i++)
                {
                    var b = s.ReadByte();
                    if (b != header[i])
                    {
                        //UTF8 header
                        if (i == 0 && b == 0xef && s.ReadByte() == 0xbb && s.ReadByte() == 0xbf && s.ReadByte() == header[0]) continue;
                        return false;
                    }
                }
                return true;
            }
            catch (IOException)
            {
                return false; 
            }
            finally
            {
                s.Position = p;
            }
        }

        internal class DataLine
        {
            string m_region;
            string[] m_items;

            private DataLine() { }
            public static DataLine Parse(string line)
            {
                DataLine res = new DataLine();

                var s = new List<string>();
                var b = new StringBuilder();
                var escape = false;
                foreach (char a in line)
                {
                    if (escape)
                    {
                        switch (a)
                        {
                            case 'n': b.Append('\n'); break;
                            case 'r': break;
                            case '\\': b.Append('\\'); break;
                            case '|': b.Append('|'); break;
                            default:
                                if (a < '0' && a >= ' ')
                                    b.Append(a);
                                else
                                    throw new GReportDataException(21000098, 43, a.ToString()); //RC-EX 43 : chybné "\{0}"
                                break;
                        }
                        escape = false;
                        continue;
                    }
                    if (a < 32) continue;
                    if (a == '\\') { escape = true; continue; }
                    if (a == '|')
                    {
                        //položka je kompletní
                        s.Add(b.ToString());
                        b.Clear();
                        continue;
                    }
                    b.Append(a);
                }

                if (escape)
                    throw new GReportDataException(21000099, 43, ""); //RC-EX 43 : chybné "\{0}"
                if (b.Length > 0)
                    throw new GReportDataException(21000101, 44); //RC-EX 44 : řádek nekončí oddělovačem
                res.m_region = s[0];
                int len = s.Count - 1;
                res.m_items = new string[len];
                s.CopyTo(1, res.m_items, 0, len);

                return res;
            }

            public string Region
            {
                get { return m_region; }
            }

            public string this[int index]
            {
                get { return m_items[index]; }
            }

            public string[] Items
            {
                get { return m_items; }
            }
        }
        private int m_linenum = 0;
        public int LineNumber { get { return m_linenum; } }
        internal DataLine ReadLine(TextReader d)
        {
            m_linenum++;
            string l_line = d.ReadLine();
            if (l_line == null || l_line.Length == 0)
                return null;
            return DataLine.Parse(l_line);
        }

        private struct s_strec
        {
            private string recname;
            private int lid;
            public s_strec(string name, int pid) { recname = name; lid = pid; }
            public string Name { get { return recname; } }
            public int Id { get { if (lid == -1) throw new GArgumentException(21000102); return lid; } set { lid = value; } }
        }

        public override int Read(GDataSet ds, Stream s)
        {
            int l_rows = 0;
            using (StreamReader l_data = new StreamReader(s, Encoding.Default))
            {
                //1. radek - identifikace
                DataLine l_line = ReadLine(l_data);

                //kontrola identifikace
                if (l_line.Region != "ixs_xme")
                    throw new GReportDataException(21000103, 45); //RC-EX 45 : chybná hlavička
                if (l_line[0] != ds.XMETA_ixs)
                    throw new GReportDataException(21000104, 46, l_line[0], ds.XMETA_ixs); //RC-EX 46 : chybná identifikace struktury ({0} vs. {1})
                if (l_line[1] != ds.XMETA_ver.ToString())
                    throw new GReportDataException(21000105, 47, l_line[1], ds.XMETA_ver.ToString()); //RC-EX 47 : chybná verze struktury ({0} vs. {1})
                if (l_line[2] != ds.XMETA_subver.ToString())
                    throw new GReportDataException(21000106, 48, l_line[2], ds.XMETA_subver.ToString()); //RC-EX 48 : chybná subverze struktury ({0} vs. {1})

                for (int i = 3; i < l_line.Items.Length; i++)
                {
                    var ei = l_line[i];
                    var eis = ei.Split(new char[] { '=' }, 2);
                    if (eis.Length != 2)
                        throw new GReportDataException(21000107, 49); //RC-EX 49 : ROOT položka neobsahuje =
                    ds.ExtendedProperties.Add(eis[0], eis[1]);
                }

                LinkedList<s_strec> l_strec = new LinkedList<s_strec>();
                s_strec l_current = new s_strec("root", -1);

                try
                {
                    while ((l_line = ReadLine(l_data)) != null)
                    {
                        while (l_line.Region != l_current.Name)
                        {
                            DataTable current = ds.Tables[l_current.Name];
                            if (current == null) //root?
                            {
                                current = ds.Tables[l_line.Region];
                                if (current == null)
                                    throw new GReportDataException(21000136, 52, l_line.Region); //RC-EX 52 : Neznámá sekce {0} (neexistující či chybné jméno)
                                if (current.Columns.Contains("_Pid"))
                                    throw new GReportDataException(21000108, 50); //RC-EX 50 :  Chyba struktury datasetu.
                                l_strec.AddFirst(l_current);
                                l_current = new s_strec(l_line.Region, 0);
                                break;
                            }
                            DataRelation l_relchild = current.ChildRelations[l_line.Region];
                            if (l_relchild != null)
                            {
                                l_strec.AddFirst(l_current);
                                l_current = new s_strec(l_line.Region, -1);
                                break;
                            }
                            else
                            {
                                if (l_strec.Count == 0)
                                    throw new GReportDataException(21000109, 51, l_line.Region); //RC-EX 51 : Neznámá sekce {0} (chybná hierarchie)
                                l_current = l_strec.First.Value;
                                l_strec.RemoveFirst();
                            }
                        }
                        DataTable dt = ds.Tables[l_line.Region];
                        if (dt == null)
                            throw new GReportDataException(21000110, 52, l_line.Region); //RC-EX 52 : Neznámá sekce {0} (neexistující či chybné jméno)

                        int cindex = 0;
                        DataRow r = dt.NewRow();
                        foreach (DataColumn cl in dt.Columns)
                        {
                            switch (cl.ColumnName)
                            {
                                case "_Pid":
                                    int pid = l_strec.First.Value.Id; //parent's ID
                                    r[cl] = pid;
                                    break;
                                case "_Id":
                                    l_current.Id = (Int32)r[cl];
                                    //r[cl] je uz naplneno (AutoIncrement)
                                    break;
                                default:
                                    if (l_line.Items.Length <= cindex)
                                        throw new GReportDataException(21000122, 58, cl.ColumnName); //RC-EX 58 : chyba v položce {0}: chybí datová položka
                                    string val = l_line.Items[cindex++];
                                    if (cl.DataType == typeof(Decimal))
                                        r[cl] = ConvertDecimal(val).DbValue; //DBNull.Value nebo Decimal
                                    else if (cl.DataType == typeof(DateTime))
                                        r[cl] = ConvertDateTime(val).DbValue;  //DBNull.Value nebo DateTime
                                    else if (cl.DataType == typeof(DateTimeOffset))
                                    {
                                        if (val.Length == 4 + 2 + 2 + 2 + 2 + 2 + 1 + 4) //s casovym pasmem  20000303000000-0700
                                        {
                                            r[cl] = new DateTimeOffset(subint(val, 0, 4), subint(val, 4, 2), subint(val, 6, 2), subint(val, 8, 2), subint(val, 10, 2), subint(val, 12, 2), new TimeSpan(subint(val, 14, 3), subint(val, 17, 2), 0));
                                        }
                                        else
                                        {
                                            var tm = ConvertDateTime(val);
                                            r[cl] = tm.IsNull ? DBNull.Value : (object)tm.OffsetValue;  //DBNull.Value nebo DateTime
                                        }
                                    }

                                    else
                                    {
                                        var xmeType = cl.ExtendedProperties["datatype"];
                                        //"string"         Grr06DataType_STRING
                                        //"number"         Grr06DataType_NUMBER
                                        //"decimal"        Grr06DataType_NUMBER
                                        //"int16"          Grr06DataType_NUMBER
                                        //"int32"          Grr06DataType_NUMBER
                                        //"int64"          Grr06DataType_NUMBER
                                        //"datetime"       Grr06DataType_DATETIME
                                        //"rtf-formatted"  Grr06DataType_RTFTEXT
                                        //"rtf-compressed" Grr06DataType_RTFCOMPR
                                        //"string-preserve-spaces" Grr06DataType_STRING_NT
                                        if (string.Equals(xmeType, "string-preserve-spaces"))
                                            r[cl] = val;
                                        else
                                            r[cl] = val.Trim();
                                    }

                                    break;
                            }
                        }
                        dt.Rows.Add(r);

                        l_rows++;
                    }
                }
                catch (GReportDataException x)
                {
                    x.Line = this.LineNumber;
                    x.Region = l_current.Name;
                    throw; //HACK: neni uplne ciste - cisteji "throw x" ale taky funguje a schova stejny stacktrace
                }
            }
            return l_rows;
        }

        private static int subint(string p, int from, int len)
        {
            return Int32.Parse(p.Substring(from, len));
        }

        internal static GDateTime ConvertDateTime(string val)
        {
            int l_year;
            int l_month;
            int l_day;
            int l_hour;
            int l_min;
            int l_sec;

            if (val.Length == 4 + 2 + 2 + 2 + 2 + 2)
            {
                l_year = subint(val, 0, 4);
                l_month = subint(val, 4, 2);
                l_day = subint(val, 6, 2);
                l_hour = subint(val, 8, 2);
                l_min = subint(val, 10, 2);
                l_sec = subint(val, 12, 2);
            }
            else if (val.Length == 2 + 2 + 2 + 2 + 2 + 2)
            {
                l_year = subint(val, 0, 2);
                if (l_year > 50) l_year += 1900; else l_year += 2000;
                l_month = subint(val, 2, 2);
                l_day = subint(val, 4, 2);
                l_hour = subint(val, 6, 2);
                l_min = subint(val, 8, 2);
                l_sec = subint(val, 10, 2);
            }
            else
            {
                l_year = 0;
                l_month = 0;
                l_day = 0;
                l_hour = 0;
                l_min = 0;
                l_sec = 0;

                //zkusim tvar yyyy-mm-dd
                if (val.Length >= 10 && val[4] == '-' && val[7] == '-')
                {
                    l_year = subint(val, 0, 4);
                    l_month = subint(val, 5, 2);
                    l_day = subint(val, 8, 2);
                    val = val.Substring(10).TrimStart();
                }
                //zkusim tvar mm.dd.yyyy
                else if (val.Length >= 10 && val[2] == '.' && val[5] == '.')
                {
                    l_year = subint(val, 6, 4);
                    l_month = subint(val, 3, 2);
                    l_day = subint(val, 0, 2);
                    val = val.Substring(10).TrimStart();
                }

                //zkusim tvar hh:mm:ss.ffffff
                if (val.Length >= 8 && val[2] == ':' && val[5] == ':')
                {
                    l_hour = subint(val, 0, 2);
                    l_min = subint(val, 3, 2);
                    l_sec = subint(val, 6, 2);
                    val = val.Substring(8).TrimStart();
                    if (val.Length > 0 && val[0] == '.') //eats fraction
                    {
                        int i = 1;
                        while (i < val.Length)
                        {
                            if (val[i] < '0' || val[i] > '9') break;
                            i++;
                        }
                        val = val.Substring(i).TrimStart();
                    }
                }
            }
            if (l_year == 0) return GDateTime.Null;
            return new DateTime(l_year, l_month, l_day, l_hour, l_min, l_sec);
        }

        internal static GDecimal ConvertDecimal(string val)
        {
            StringBuilder b = new StringBuilder();
            foreach (char c in val)
            {
                switch (c)
                {
                    case ' ':
                        break;
                    case '-':
                        if (b.Length == 0 || b[0] != '-') b.Insert(0, '-');
                        break;
                    case '.':
                    case ',':
                        b.Append('.');
                        break;
                    default:
                        if (Char.IsDigit(c) == false)
                            return GDecimal.Null;
                        b.Append(c);
                        break;
                }
            }
            if (b.Length == 0) return GDecimal.Null;

            decimal dec;
            if (Decimal.TryParse(b.ToString(), System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out dec))
                return dec;
            return GDecimal.Null;
        }

        public override void Save(DataSet ds, string XMETA_ixs, int XMETA_ver, int XMETA_subver, Encoding encoding, Stream saveTo)
        {
            StreamWriter writer = new StreamWriter(saveTo, /*encoding*/Encoding.Default);
            {
                //1. radek - identifikace
                writer.Write(string.Format("ixs_xme|{0}|{1}|{2}|", XMETA_ixs, XMETA_ver, XMETA_subver));
                foreach (System.Collections.DictionaryEntry de in ds.ExtendedProperties)
                {
                    if (de.Key == null || de.Value == null) continue;
                    writer.Write(de.Key.ToString());
                    writer.Write('=');
                    writer.Write(de.Value.ToString());
                    writer.Write('|');
                }
                writer.WriteLine();
                var dt = ds.Tables[0];
                WriteRows(writer, dt, dt.Rows);
            }
            writer.Flush();
        }

        private void WriteRows(StreamWriter writer, DataTable dt, System.Collections.IEnumerable rows)
        {
            foreach (DataRow r in rows)
            {
                writer.Write(dt.TableName);
                writer.Write('|');
                foreach (DataColumn c in dt.Columns)
                {
                    WriteValue(writer, r, c);
                }
                writer.WriteLine();
                foreach (DataRelation child in dt.ChildRelations)
                {
                    WriteRows(writer, child.ChildTable, r.GetChildRows(child));
                }
            }
        }

        private static void WriteValue(StreamWriter writer, DataRow row, DataColumn cl)
        {
            switch (cl.ColumnName)
            {
                case "_Pid":
                case "_Id":
                    return;
            }
            var value = row[cl];
            if (value == DBNull.Value)
            { }
            else if (value is Decimal dec)
                writer.Write(dec.ToString(System.Globalization.CultureInfo.InvariantCulture));
            else if (value is DateTime dt1)
            {
                switch (cl.ExtendedProperties["datatype"])
                {
                    case "date": writer.Write(dt1.ToString("yyyyMMdd000000")); break;
                    default: writer.Write(dt1.ToString("yyyyMMddHHmmss")); break;
                }
            }            
            else if (value is DateTimeOffset dt2)
            {
                switch (cl.ExtendedProperties["datatype"])
                {
                    case "date": writer.Write(dt2.ToString("yyyyMMdd000000")); break;
                    default: writer.Write(dt2.ToString("yyyyMMddHHmmss")); break;
                }
            }
            else
            {
                var s = value.ToString();
                int i = s.IndexOfAny(new char[] { '\\', '|', '\n' });
                while (i >= 0)
                {
                    writer.Write(s.Substring(0, i));
                    switch (s[i])
                    {
                        case '\\':
                            writer.Write("\\\\");
                            break;
                        case '|':
                            writer.Write("\\|");
                            break;
                        case '\n':
                            writer.Write("\\n");
                            break;
                    }
                    s = s.Substring(i + 1);
                    i = s.IndexOfAny(new char[] { '\\', '|', '\n' });
                }
                writer.Write(s);
            }
            writer.Write('|');
        }
    }

    public class GDataReaderXml : DataReader
    {
        public override DataType Type
        {
            get { return DataType.xml; }
        }

        private static byte[] header = System.Text.Encoding.ASCII.GetBytes("<?xml");
        public static bool CheckDataFile(IGMemoryFile s)
        {
            if (s.FileName.StartsWith(":")) return false; //pokud jmeno zacina : tak to urcite nechci

            var p = s.Position;
            try
            {
                int tn = 0;
                for (int i = 0; i < header.Length; i++)
                {
                    if (s.ReadByte() != header[i])
                    {
                        if (tn++ == 0)
                        {
                            s.Position = 3;
                            i = -1;
                            continue;
                        }
                        return false;
                    }
                }
                return true;
            }
            finally
            {
                s.Position = p;
            }
        }

        public override int Read(GDataSet ds, Stream s)
        {
            using (var xml = System.Xml.XmlReader.Create(s, new System.Xml.XmlReaderSettings() { IgnoreWhitespace = true, IgnoreComments = true, IgnoreProcessingInstructions = true }))
            {
                xml.MoveToContent();
                CheckNs(ds, xml.NamespaceURI);
                ReadRootAttributes(ds, xml);
                if (xml.LocalName == "data")
                {
                    xml.Read();
                    xml.MoveToContent();
                }
                return ReadTable(xml, ds.Tables[0]);
            }
        }

        private int ReadTable(System.Xml.XmlReader xml, DataTable dt, DataRow parentRow = null)
        {
            int l_rows = 0;
            if (xml.LocalName != dt.TableName)
                throw new GReportDataException(21000111, 53); //RC-EX 53 : XML jméno tabulky neodpovídá!
            next:

            var row = dt.NewRow();
            if (parentRow != null) row.SetParentRow(parentRow);
            dt.Rows.Add(row);
            l_rows++;

            if (xml.IsEmptyElement)
                xml.Read();
            else
            {
                xml.Read();
                while (xml.IsStartElement())
                {
                    var name = System.Xml.XmlConvert.DecodeName(xml.LocalName);
                    var empty = xml.IsEmptyElement;

                    var col = dt.Columns[name];
                    if (col != null)
                    {
                        if (empty)
                        {
                            row[col] = DBNull.Value;
                            xml.Read();
                        }
                        else
                        {
                            ReadColumn(xml, row, col);
                            xml.ReadEndElement();
                        }
                        continue;
                    }
                    else if (empty == false)
                    {
                        var tbl = dt.DataSet.Tables[name];
                        if (tbl != null)
                        {
                            var rel = dt.ChildRelations.OfType<DataRelation>().FirstOrDefault(r => r.ChildTable.TableName == name);
                            if (rel == null)
                                throw new GReportDataException(21000112, 54, name, dt.TableName);  //RC-EX 54 : XML tabulka {0} není potomkem tabulky {1}!

                            l_rows += ReadTable(xml, tbl, row);
                            continue;
                        }
                    }
                    xml.Skip(); //nevim co to je, preskocim
                }
                xml.ReadEndElement();
            }

            if (xml.IsStartElement(dt.TableName))
                goto next;
            return l_rows;
        }

        private void ReadColumn(System.Xml.XmlReader xml, DataRow row, DataColumn col)
        {
            xml.Read();
            var val = xml.ReadString().TrimEnd();

            if (col.DataType == typeof(decimal))
            {
                if (string.IsNullOrWhiteSpace(val))
                    row[col] = DBNull.Value;
                else
                    row[col] = decimal.Parse(val, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture);
            }
            else if (col.DataType == typeof(DateTime))
            {
                if (string.IsNullOrWhiteSpace(val))
                    row[col] = DBNull.Value;
                else if (DateTime.TryParseExact(val, "d.M.yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out var d))
                    row[col] = d; //akceptuju nesprávný český tvar - někde to bylo v GRC schválně formátováno, neboť "date" typ byl string
                else
                    row[col] = System.Xml.XmlConvert.ToDateTime(val, System.Xml.XmlDateTimeSerializationMode.RoundtripKind);
            }
            else if (col.DataType == typeof(DateTimeOffset))
            {
                if (string.IsNullOrWhiteSpace(val))
                    row[col] = DBNull.Value;
                else if (val.StartsWith("0001-01-01"))
                    row[col] = DateTimeOffset.MinValue;
                else if (DateTimeOffset.TryParseExact(val, "d.M.yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out var d))
                    row[col] = d; //akceptuju nesprávný český tvar - někde to bylo v GRC schválně formátováno, neboť "date" typ byl string
                else
                    row[col] = System.Xml.XmlConvert.ToDateTimeOffset(val);
            }
            else
                row[col] = val;
        }

        //data:0000ALX0AYQE:1:1
        private void CheckNs(GDataSet ds, string ns)
        {
            var n = ns.Split(':');
            if (n.Length < 4)
                //IDS_XmlRootNsError      "XML data mají chybný prostor jmen"
                throw new GReportDataException(21000113, 55); //RC-EX 55 : XML data mají chybný prostor jmen!
            if (n[0] != "data")
                throw new GReportDataException(21000114, 55); //RC-EX 55 : XML data mají chybný prostor jmen!
            //identifikace

            if (n[1] != ds.XMETA_ixs)
                throw new GReportDataException(21000115, 46, n[1], ds.XMETA_ixs); //RC-EX 46 : chybná identifikace struktury ({0} vs. {1})
            if (n[2] != ds.XMETA_ver.ToString())
                throw new GReportDataException(21000116, 47, n[2], ds.XMETA_ver.ToString()); //RC-EX 47 : chybná verze struktury ({0} vs. {1})
            if (n[3] != ds.XMETA_subver.ToString())
                throw new GReportDataException(21000117, 48, n[3], ds.XMETA_subver.ToString()); //RC-EX 48 : chybná subverze struktury ({0} vs. {1})

            //xmlns="data:KL00001:1:1:NOW=20140609182424"
            //<data xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="data:KL00001:1:1:NOW=20140609182424">
            for (int i = 4; i < n.Length; i++)
            {
                var s = n[i].Split(new char[] { '=' }, 2);
                if (s.Length == 2)
                    ds.ExtendedProperties[s[0]] = s[1];
            }
        }
        private void ReadRootAttributes(GDataSet ds, System.Xml.XmlReader xml)
        {
            var b = xml.MoveToFirstAttribute();
            while (b)
            {
                if (xml.Name.StartsWith("xml") == false)
                    ds.ExtendedProperties[xml.Name] = xml.Value;
                b = xml.MoveToNextAttribute();
            }
            xml.MoveToElement();
        }

        public override void Save(DataSet ds, string XMETA_ixs, int XMETA_ver, int XMETA_subver, Encoding encoding, Stream saveTo)
        {
            System.Xml.XmlWriter writer = System.Xml.XmlWriter.Create(saveTo, new System.Xml.XmlWriterSettings() { Indent = true, Encoding = encoding });
            {
                var ns = string.Format("data:{0}:{1}:{2}", XMETA_ixs, XMETA_ver, XMETA_subver);
                var dt = ds.Tables[0];
                PropertyCollection extraAttributes = null;
                if (dt.Rows.Count > 1)
                {
                    writer.WriteStartElement("data", ns);
                    foreach (System.Collections.DictionaryEntry de in ds.ExtendedProperties)
                    {
                        if (de.Key == null || de.Value == null) continue;
                        writer.WriteAttributeString(de.Key.ToString(), de.Value.ToString());
                    }
                }
                else
                {
                    //xmlns="data:KL00001:1:1:NOW=20140609182424"
                    //foreach (System.Collections.DictionaryEntry de in ds.ExtendedProperties)
                    //{
                    //    ns += ":" + de.Key + "=" + de.Value;
                    //}
                    //2015/11/19  nove i v tomto pripade do atributu
                    extraAttributes = ds.ExtendedProperties;
                }

                WriteRows(writer, dt, dt.Rows, ns, extraAttributes);
                if (dt.Rows.Count > 1)
                    writer.WriteEndElement();
            }
            writer.Flush();
        }

        private void WriteRows(System.Xml.XmlWriter writer, DataTable dt, System.Collections.IEnumerable rows, string ns, PropertyCollection extraAttributes = null)
        {
            foreach (DataRow r in rows)
            {
                writer.WriteStartElement(dt.TableName, ns);
                if (extraAttributes != null)
                    foreach (System.Collections.DictionaryEntry de in extraAttributes)
                    {
                        if (de.Key == null || de.Value == null) continue;
                        writer.WriteAttributeString(de.Key.ToString(), de.Value.ToString());
                    }

                foreach (DataColumn c in dt.Columns)
                {
                    WriteValue(writer, r, c, ns);
                }
                foreach (DataRelation child in dt.ChildRelations)
                {
                    WriteRows(writer, child.ChildTable, r.GetChildRows(child), ns);
                }
                writer.WriteEndElement();
            }
        }

        private static void WriteValue(System.Xml.XmlWriter writer, DataRow row, DataColumn cl, string ns)
        {
            switch (cl.ColumnName)
            {
                case "_Pid":
                case "_Id":
                    return;
            }
            var o = row[cl];
            if (o == cl.DefaultValue) return;

            writer.WriteStartElement("", System.Xml.XmlConvert.EncodeName(cl.ColumnName), ns);
            if (o is DBNull)
            {
            }
            else if (o is DateTime dt1) //zápis datumů zvlášť
            {
                switch (cl.ExtendedProperties["datatype"])
                {
                    case "date": writer.WriteValue(dt1.ToString("yyyy-MM-dd")); break;  //originální "date" typ bez času i do XML
                    default: writer.WriteValue(dt1); break; //jde jinou větví než WriteValue(object) - zapisuje ve správném XML tvaru (bez fraction)
                }
            }
            else if (o is DateTimeOffset dt2) //zápis datumů zvlášť
            {
                switch (cl.ExtendedProperties["datatype"])
                {
                    case "date": writer.WriteValue(dt2.ToString("yyyy-MM-dd")); break;  //originální "date" typ bez času i do XML
                    default: writer.WriteValue(dt2); break; //jde jinou větví než WriteValue(object) - zapisuje ve správném XML tvaru (bez fraction)
                }
            }
            else
                writer.WriteValue(o);
            writer.WriteEndElement();
        }
    }
}
