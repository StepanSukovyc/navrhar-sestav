//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GFrm.cs                             </Name>
//    <Description> Práce s GFRM soubory                                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2015                            </Copyright>
//    <Created>     2013-05-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using Gordic.General;

namespace Gordic.Report.Interface
{
    //pouziva se v Gordic.ToPDF.Support
    /// <summary>Práce s GFRM soubory</summary>
    public class Gfrm : IDisposable
    {
        string GfrmFileName;
        DirectoryInfo m_tempdir;
        ProjectSection structureSection;
        ProjectSection dataSection;
        List<ProjectSection> formatFiles = new List<ProjectSection>();

        /// <summary>Práce s GFRM soubory</summary>
        [System.Security.SecurityCritical]
        public Gfrm(string gfrmFileName)
        {
            GfrmFileName = gfrmFileName;
            var l_tempdir = GTempFiles.CreateTempDirectory();
            GZip.Unzip(gfrmFileName, l_tempdir);
            m_tempdir = new DirectoryInfo(l_tempdir);

            foreach (FileInfo item in m_tempdir.GetFiles())
            {
                var e = GetExtType(item.Extension);
                switch (e)
                {
                    case Extensions.structure:
                        structureSection = ProjectSection.ReadSection(item);
                        break;
                    case Extensions.data:
                        dataSection = ProjectSection.ReadSection(item);
                        break;
                    case Extensions.format:
                        formatFiles.Add(ProjectSection.ReadSection(item));
                        break;
                }

            }
        }
        /// <summary></summary>
        ~Gfrm()
        {
            Dispose();
        }
        /// <summary></summary>
        public void Dispose()
        {
            if (m_tempdir != null)
            {
                GTempFiles.DeleteTempDirectory(m_tempdir.FullName);
                m_tempdir = null;
            }
        }
        //------------------------------------------------------------------
        /// <summary></summary>
        protected class ProjectSection
        {
            FileInfo item;
            private ProjectSection(FileInfo item)
            {
                this.item = item;
            }
            internal static ProjectSection ReadSection(FileInfo item)
            {
                return new ProjectSection(item);
            }

            /// <summary>
            /// Název sekce
            /// </summary>
            public string Name { get { return item.FullName; } }
        }
        private ProjectSection GetArchiveFor(ProjectSection f)
        {
            FileInfo item = new FileInfo(Path.ChangeExtension(f.Name, ".zip"));
            if (item.Exists)
                return ProjectSection.ReadSection(item);
            return null;
        }

        //------------------------------------------------------------------
        /// <summary></summary>
        protected enum Extensions
        {
            /// <summary></summary>
            unknown = -1,
            /// <summary></summary>
            format,
            /// <summary></summary>
            data,
            /// <summary></summary>
            structure,
            /// <summary></summary>
            archive
        }
        /// <summary>
        /// získání koncovek pro určité typy souborů
        /// </summary>
        /// <param name="key">Klíč k hledaným koncovkám</param>
        /// <returns>Seznam koncovek</returns>
        protected virtual List<string> GetExtensions(Extensions key)
        {
            List<string> ext = new List<string>();
            switch (key)
            {
                case Extensions.format:
                    ext.Add("*.alf");
                    break;
                case Extensions.data:
                    ext.Add("*.xml");
                    ext.Add("*.dat");
                    ext.Add("*.tmp");
                    break;
                case Extensions.structure:
                    ext.Add("*.xme");
                    break;
                default:
                    break;
            }
            return ext;
        }
        private Extensions GetExtType(string ext)
        {
            if (ext.StartsWith("*") == false) ext = "*" + ext;
            foreach (Extensions e in Enum.GetValues(typeof(Extensions)))
            {
                var l = GetExtensions(e);
                if (l.Contains(ext)) return e;
            }
            return Extensions.unknown;
        }


        /// <summary>Cesta k XME struktuře formuláře</summary>
        public string StructureFileName
        {
            get
            {
                if (structureSection == null) throw new GReportException(21000139, 64, GfrmFileName); //RC-EX 64 : Gfrm {0} neobsahuje žádnou strukturu xme.
                return structureSection.Name;
            }
        }
        /// <summary>Cesta k datovému souboru formuláře</summary>
        public string DataFileName
        {
            get
            {
                if (dataSection == null) throw new GReportException(21000138, 63, GfrmFileName); //RC-EX 63 : Gfrm {0} neobsahuje žádný datový soubor.
                return dataSection.Name;
            }
        }
        /// <summary>Cesta k ALF formátu formuláře</summary>
        public string FormatFileName
        {
            get
            {
                if (formatFiles.Count == 0) throw new GReportException(21000137, 62, GfrmFileName); //RC-EX 62 : Gfrm {0} neobsahuje žádný formát alf.
                return formatFiles[0].Name;
            }
        }
        public string FormatInfo(string info)
        {
            XmlDocument x = new XmlDocument();
            x.Load(FormatFileName);

            XmlNamespaceManager nsmgr = new XmlNamespaceManager(x.NameTable);
            nsmgr.AddNamespace("x", x.DocumentElement.NamespaceURI);

            foreach (XmlNode n in x.SelectNodes("/x:format/x:info", nsmgr))
            {
                foreach (XmlAttribute a in n.Attributes)
                {
                    if (string.Equals(a.Name, info, StringComparison.OrdinalIgnoreCase))
                        return a.Value;
                }
            }
            return null;
        }
        public Dictionary<string, string> FormatInfos()
        {
            XmlDocument x = new XmlDocument();
            x.Load(FormatFileName);

            var ret = new Dictionary<string, string>();
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(x.NameTable);
            nsmgr.AddNamespace("x", x.DocumentElement.NamespaceURI);

            foreach (XmlNode n in x.SelectNodes("/x:format/x:info", nsmgr))
            {
                foreach (XmlAttribute a in n.Attributes)
                {
                    ret.Add(a.Name, a.Value);
                }
            }
            return ret;
        }

        //------------------------------------------------------------------
            /// <exclude/>
        public void MakeSRZ(string zipFileName)
        {
            throw new GNotImplementedException(21000048);
            //string l_sdir = GTempFiles.CreateTempDirectory();
            //try
            //{
            //    GReportCommon.SaveGrrReport(l_sdir, report, true, UserProcess.IsInitialized ? UserProcess.Configuration : null, UserProcess.IsInitialized ? UserProcess.ApplicationInfo : null, UserProcess.IsAuthorized ? UserProcess.SessionInfo : null);
            //    GZip.ZipDirectoryContent(l_sdir, zipFileName);
            //}
            //finally
            //{
            //    GTempFiles.DeleteTempDirectory(l_sdir);
            //}
        }

        /// <summary>
        /// Umožňuje ukládání reportů do souborů.
        /// </summary>
        public void SaveGfrm(string destination)
        {
            GZip.ZipDirectoryContent(m_tempdir.FullName, destination);
        }

        /// <summary>
        /// Umožňuje ukládání formuláře do souborů.
        /// </summary>
        public void SaveAs(IGReportConfiguration cfg, string destination)
        {
            var ext = Path.GetExtension(destination).ToLowerInvariant();
            switch (ext)
            {
                case ".gfrm": SaveGfrm(destination); break;
                case ".srz": MakeSRZ(destination); break;
                //case ".pdf": 
                default:
                    var l_bridge = ext.Substring(1).ToUpperInvariant();
                    if (l_bridge.Length == 0) return;

                    RunBridge(cfg, destination, l_bridge);
                    break;
            }
        }

        /// <summary>
        /// Převod formuláře do jiných typů, hlavně PDF.
        /// </summary>
        public void RunBridge(IGReportConfiguration cfg, string destination, string bridge)
        {
            var f = formatFiles[0];
            var a = GetArchiveFor(f);
            string l_sdir = m_tempdir.FullName;
            if (a != null)
            {
                l_sdir = GTempFiles.CreateTempDirectory();
                GZip.Unzip(a.Name, l_sdir);
            }
            try
            {
                GReportCommon.RunBridge(cfg, StructureFileName, f.Name, DataFileName, l_sdir, bridge, destination);
            }
            finally
            {
                if (a != null) GTempFiles.DeleteTempDirectory(l_sdir);
            }
        }

        //public void SetDataFile(System.IO.Stream data)
        //{
        //    dataSection.SetDataFile(data);
        //}

        public enum GFormFieldType { String, Number, DateTime };
        public struct GFormField
        {
            public string Name;
            public string Value;
            public string Label;
            public string Description;
            public GFormFieldType Type;

            public GFormField(string name, string value)
            {
                Name = name;
                Value = value;
                Label = "";
                Description = null;
                Type = GFormFieldType.String;
            }
        }

        [System.Security.SecurityCritical]
        GReportDataAdapter m_Adapter = null;
        public GReportDataAdapter Adapter
        {
            [System.Security.SecurityCritical]
            get
            {
                if (m_Adapter == null)
                {
                    var fileXme = GMemoryFile.ReadFromFile(StructureFileName);
                    var fileData = GMemoryFile.ReadFromFile(DataFileName);
                    m_Adapter = new GReportDataAdapter(fileData, fileXme);
                }
                return m_Adapter;
            }
        }
        public Dictionary<string, string> ExtractFields()
        {
            if (m_Adapter != null) m_Adapter = null; //radsi novy
            GDataSet d = new GDataSet();
            Adapter.Fill(d);

            var f = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            var i = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
            foreach (System.Data.DataTable t in d.Tables)
            {
                if (t.Rows.Count == 0)
                {
                    foreach (System.Data.DataColumn c in t.Columns)
                    {
                        var n = c.ColumnName;
                        if (n.StartsWith("_")) continue;
                        f.Add(n, null);
                    }
                }
                else
                    foreach (System.Data.DataRow r in t.Rows)
                    {
                        foreach (System.Data.DataColumn c in t.Columns)
                        {
                            var n = c.ColumnName;
                            if (n.StartsWith("_")) continue;
                            if (i.TryGetValue(n, out int x))
                            {
                                i[n] = ++x;
                                n += "#" + x.ToString();

                            }
                            else
                                i[n] = 1;
                            f.Add(n, FieldValue(r,c));
                        }
                    }
            }

            //ID_FORM
            if (f.ContainsKey("ID_FORM") == false)            //zde hleda OrdinalIgnoreCase
            {
                var id_form = FormatInfo("ID_FORM");
                if (string.IsNullOrEmpty(id_form) == false)
                    f.Add("ID_FORM", id_form);
            }

            return f;
        }

        public static string FieldValue(System.Data.DataRow r, System.Data.DataColumn cl)
        {
            var o = r[cl];
            if (o is DBNull) return "";
            if (o is DateTime dt1)
            {
                switch (cl.ExtendedProperties["datatype"])
                {
                    case "date": return dt1.ToShortDateString();
                    default: return dt1.ToLocalTime().ToString();
                }                
            }
            if (o is DateTimeOffset dt2)
            {
                switch (cl.ExtendedProperties["datatype"])
                {
                    case "date": return dt2.DateTime.ToShortDateString();
                    default: return dt2.ToLocalTime().ToString();
                }
            }


            return o.ToString();
        }

        public static GFormField FieldFromColumn(System.Data.DataColumn c, string value)
        {
            var fld = new GFormField(c.ColumnName, value);
            if (string.IsNullOrEmpty(c.Caption) == false)
                fld.Label = c.Caption;
            else
                fld.Label = fld.Name;
            var desc = c.ExtendedProperties["description"];
            if (desc != null) fld.Description = desc.ToString();
            if (c.DataType == typeof(DateTime))
                fld.Type = GFormFieldType.DateTime;
            if (c.DataType == typeof(Decimal) || c.DataType == typeof(Int16) || c.DataType == typeof(Int32) || c.DataType == typeof(Int64))
                fld.Type = GFormFieldType.Number;
            return fld;
        }
        public IEnumerable<GFormField> ExtractFieldsExt()
        {
            if (m_Adapter != null) m_Adapter = null; //radsi novy
            GDataSet d = new GDataSet();
            Adapter.Fill(d);

            var hasIdForm = false;
            var f = new List<GFormField>();
            foreach (System.Data.DataTable t in d.Tables)
            {
                if (hasIdForm == false) hasIdForm = t.Columns.Contains("ID_FORM");
                if (t.Rows.Count == 0)
                {
                    foreach (System.Data.DataColumn c in t.Columns)
                    {
                        if (c.ColumnName.StartsWith("_") == false)
                            f.Add(FieldFromColumn(c, null));
                    }
                }
                else
                    foreach (System.Data.DataRow r in t.Rows)
                    {
                        foreach (System.Data.DataColumn c in t.Columns)
                        {
                            if (c.ColumnName.StartsWith("_") == false)
                                f.Add(FieldFromColumn(c, FieldValue(r, c)));
                        }
                    }
            }

            ////ID_FORM
            if (hasIdForm == false)
            {
                var id_form = FormatInfo("ID_FORM");
                if (string.IsNullOrEmpty(id_form) == false)
                    f.Add(new GFormField("ID_FORM", id_form));
            }

            return f;
        }
        public GDataSet ExtractData()
        {
            if (m_Adapter != null) m_Adapter = null; //radsi novy
            GDataSet d = new GDataSet();
            Adapter.Fill(d);
            return d;
        }

        /// <summary>
        /// Nakrmí dokument datasetem.
        /// </summary>
        /// <param name="data">Vstupní data</param>
        public void FeedData(GDataSet data)
        {
            using (var fs = File.Create(DataFileName))
            {
                Adapter.Save(data, fs, System.Text.Encoding.UTF8);
            }
        }

    }

}
