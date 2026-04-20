//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GUnloadDataAdapter.cs                        </Name>
//    <Description> Třída pro čtení a zápis dat formátu UNLOAD                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2015-04-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.IO;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro čtení a zápis dat formátu UNLOAD
    /// </summary>
    [System.Security.SecurityCritical]
    public class GUnloadDataAdapter : IDataAdapter
    {
        Stream m_data;

        /// <summary>
        /// Vytvoření načítače pro UNLOAD
        /// </summary>
        public GUnloadDataAdapter(Stream data)
        {
            m_data = data;
        }


        internal GUnloadDataLine ReadLine(TextReader d)
        {
            string l_line = d.ReadLine();
            if (l_line == null || l_line.Length==0)
                return null;
            return GUnloadDataLine.Parse(l_line);
        }

        /// <summary>
        /// Množina sloupců ke zpracování. Není-li zadána, jsou brány včechny sloupce dané tabulky v pořadí.
        /// </summary>        
        public string[] Columns { [System.Security.SecuritySafeCritical]get; [System.Security.SecuritySafeCritical]set; }

        /// <summary>Zapíše DataTable v UNLOAD formátu</summary>
        public void Unload(DataTable dt)
        {
            using (StreamWriter l_data = new StreamWriter(m_data, Encoding.Default))
            {
                System.Collections.IEnumerable cols;
                int colslen;
                if (Columns != null)
                {
                    var l = new List<DataColumn>();
                    foreach (string cname in Columns)
                    {
                        var c = dt.Columns[cname];
                        l.Add(c);
                    }
                    cols = l;
                    colslen = l.Count;
                }
                else
                {
                    cols = dt.Columns;
                    colslen = dt.Columns.Count;
                }
                string[] items = new string[colslen];

                foreach (DataRow r in dt.Rows)
                {
                    int i = 0;
                    foreach (DataColumn c in cols)
                    {
                        var val = r[c];
                        if (val is DateTime)
                            items[i++] = ((DateTime)val).ToString("yyyy'-'MM'-'dd HH':'mm':'ss");
                        else
                        {
                            var fmt = val as IFormattable;
                            if (fmt != null)
                                items[i++] = fmt.ToString(null, System.Globalization.CultureInfo.InvariantCulture);
                            else
                                items[i++] = val.ToString();
                        }
                    }
                    GUnloadDataLine l_line = new GUnloadDataLine(items);
                    l_data.WriteLine(l_line.Serialize());
                }
            }
        }

        /// <summary>Zapíše DataTable v UNLOAD formátu</summary>
        public static void UnloadTo(DataTable dt, Stream data)
        {
            new GUnloadDataAdapter(data).Unload(dt);
        }

        #region IDataAdapter Members

        /// <summary>
        /// Vyplní DataSet dle vstupního Streamu ve formátu UNLOAD
        /// </summary>
        [System.Security.SecuritySafeCritical]
        public int Fill(DataSet dataSet)
        {
            return Fill(dataSet.Tables[0]);
        }
        /// <summary>
        /// Vyplní DataTable dle vstupního Streamu ve formátu UNLOAD
        /// </summary>
        [System.Security.SecuritySafeCritical]
        public int Fill(DataTable dt)
        {        
            int l_rows = 0;
            using (StreamReader l_data = new StreamReader(m_data, Encoding.Default))
            {
                System.Collections.IEnumerable cols;
                int colslen;
                if (Columns != null)
                {
                    var l = new List<DataColumn>();
                    foreach (string cname in Columns)
                    {
                        var c = dt.Columns[cname];
                        l.Add(c);
                    }
                    cols = l;
                    colslen = l.Count;
                }
                else
                {
                    cols = dt.Columns;
                    colslen = dt.Columns.Count;
                }

                GUnloadDataLine l_line;
                while ((l_line = ReadLine(l_data)) != null)
                {
                    int cindex = 0;
                    var cmax = l_line.Items.Length;
                    DataRow r = dt.NewRow();
                    foreach (DataColumn cl in cols)
                    {
                        if(cindex > cmax) break;
                        if (cl != null)
                        {
                            string val = l_line[cindex];
                            if (val == string.Empty && cl.DataType != typeof(string))
                                r[cl] = DBNull.Value;
                            else
                                r[cl] = val;
                        }
                        cindex++;
                    }
                    dt.Rows.Add(r);

                    l_rows++;
                }
            }
            return l_rows;
        }

        [System.Security.SecuritySafeCritical]
        DataTable[] IDataAdapter.FillSchema(DataSet dataSet, SchemaType schemaType)
        {
            throw new GNotImplementedException(21000019);
        }

        [System.Security.SecuritySafeCritical]
        IDataParameter[] IDataAdapter.GetFillParameters()
        {
            return new IDataParameter[0];
        }

        
        MissingMappingAction IDataAdapter.MissingMappingAction
        {
            [System.Security.SecuritySafeCritical]
            get
            {
                return MissingMappingAction.Passthrough;
            }
            [System.Security.SecuritySafeCritical]
            set
            {
            }
        }

        MissingSchemaAction IDataAdapter.MissingSchemaAction
        {
            [System.Security.SecuritySafeCritical]
            get
            {
                return MissingSchemaAction.AddWithKey;
            }
            [System.Security.SecuritySafeCritical]
            set
            {
            }
        }

        ITableMappingCollection IDataAdapter.TableMappings
        {
            [System.Security.SecuritySafeCritical]
            get
            {
                throw new GNotImplementedException(21000020);
            }
        }

        [System.Security.SecuritySafeCritical]
        int IDataAdapter.Update(DataSet dataSet)
        {
            throw new GNotImplementedException(21000021);
        }

        #endregion
    }
}
