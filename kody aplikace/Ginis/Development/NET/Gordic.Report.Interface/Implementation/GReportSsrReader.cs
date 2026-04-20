//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportSsrReader.cs                 </Name>
//    <Description> Parser na SSR soubory                                       </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-07-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using Gordic.General;
using Gordic.Report.Interface;

namespace Gordic.Report.Implementation
{
    /// <summary>
    /// Parser na SSR soubory
    /// </summary>
    public class GSsr: IDisposable
    {
        internal static string GetAttrStr(XmlAttribute a)
        {
            if (a == null) return null;
            return a.Value;
        }

        internal GSsr()
        {
        }

        /// <summary>Načtení SSR ze souboru</summary>
        public GSsr(string fname)
        {
            LoadFromFile(fname);
        }

        /// <summary>Načtení SSR ze streamu</summary>
        public GSsr(System.IO.Stream str)
        {
            var doc = new XmlDocument();
            doc.Load(str);
            m_Path = "";
            Load(doc);
        }

        //------------------------------------------------------------------
        private string m_Path;
        ///<summary>cesta k SSR pro vyhodnocení cest k dalším souborům</summary>
        public virtual string Path
        {
            get { return m_Path; }
        }

        //------------------------------------------------------------------
        private List<GSsrReport> m_Reports = new List<GSsrReport>();
        ///<summary>seznam reportů</summary>
        public IList<GSsrReport> Reports
        {
            get { return m_Reports; }
        }

        //------------------------------------------------------------------
        private UInt32 m_Crc;
        ///<summary>kontrolní součet</summary>
        public UInt32 Crc
        {
            get { return m_Crc; }
        }

        //------------------------------------------------------------------
        private string m_Signature;
        ///<summary>podpis SSR</summary>
        public string Signature
        {
            get { return m_Signature; }
        }

        internal void LoadFromFile(string fname)
        {
            var doc = new XmlDocument();
            doc.Load(fname);
            m_Path = System.IO.Path.GetDirectoryName(fname);
            Load(doc);
        }

        //<?xml version="1.0" encoding="windows-1250"?>
        //<reports xmlns="http://www.gordic.cz/TR/ssr/1.0">
        //  <report title="Účetní deník (dle měs., dne, čd)">
        //    <image-path path="."/>
        //    <structure file="00000A3P.xme"/>
        //    <data file="Vyk_2220_012.tmp"/>
        //    <format file="GPRA0A32.alf" title="NBU0-účetní deník"/>
        //    <format file="00000049.alf" title="Obecný formát"/>
        //  </report>
        //</reports>
        private void Load(XmlDocument doc)
        {
            XmlElement root = doc.DocumentElement;
            if (root.Name != "reports") throw new GException(21000032, 24); //RC-EX 24 : Chyba struktury SSR souboru
            if (root.NamespaceURI != "http://www.gordic.cz/TR/ssr/1.0") throw new GException(21000033, 24); //RC-EX 24 : Chyba struktury SSR souboru
            
            parseCheckSum(root);
            foreach (XmlNode n in root.ChildNodes)
            {
                if (n.Name == "report") m_Reports.Add(GSsrReport.ParseReport(this, n));
            }
        }

        void parseCheckSum(XmlElement root)
        {
            XmlAttribute a = root.Attributes["crc"];
            if(a==null) return;
            m_Signature = GSsr.GetAttrStr(root.Attributes["signature"]);
	        parseCheckSum(a.Value);
        }
        void parseCheckSum(string s)
        {
            m_Crc = UInt32.Parse(s.Substring(0, 4), System.Globalization.NumberStyles.AllowHexSpecifier) ^ 0x4242;
            m_Crc |= (UInt32.Parse(s.Substring(4), System.Globalization.NumberStyles.AllowHexSpecifier) ^ 0x2424) << 16;
        }

        /// <summary>Dispose</summary>
        public virtual void Dispose()
        {
        }

        //long __computeCrc(GVector<GString*>& files)
        //{
        //    long crc = 0;
        //    for(int i=0;i<files.Count;i++)
        //    {
        //        GString& l_file = *files[i];
        //        FILE* inf;
        //        const int BUFSIZE = 1024;
        //        BYTE buf[BUFSIZE];

        //        if(fopen_s(&inf,l_file,"rb")) continue;
        //        while(true)
        //        {
        //            size_t l = fread(buf,1,BUFSIZE,inf);
        //            for(size_t k=0;k<l;k++) crc+=buf[k];
        //            if(l<BUFSIZE) break;
        //        }
        //        fclose(inf);
        //    }
        //    return crc;
        //}

        //GRR06API GSSR::checkCrc(const char* flist)
        //{
        //    if(m_crc==0) return S_OK; //crc neni uvedeno, neni ani co kontrolovat

        //    GVector<GString*> l_files;
        //    GString fl(flist);
        //    int p =0;
        //    while(true)
        //    {
        //        int q = fl.find('|',p);
        //        if(q<0) break;
        //        if(q>p)
        //        {
        //            l_files.Add(new GString(fl,p,q));
        //        }
        //        p=q+1;
        //    }
        //    long crc_real = __computeCrc(l_files);
        //    for(int i=0;i<l_files.Count;i++)
        //    {
        //        delete l_files[i];
        //    }			   
        //    if(crc_real == m_crc) return S_OK;
        //    grr_error(IDS_CrcOpenError);
        //}
    }

    /// <summary></summary>
    public class GSsrElement
    {
        string m_ElementName;
        /// <summary></summary>
        public string ElementName { get { return m_ElementName; } }

        Dictionary<string,string> m_Attributes = new Dictionary<string,string>();
        /// <summary></summary>
        public Dictionary<string, string> Attributes { get { return m_Attributes; } }
        /// <summary></summary>
        protected void AddAttribute(XmlAttribute a)
        {
            m_Attributes.Add(a.Name, a.Value);
        }

        List<GSsrElement> m_Elements = new List<GSsrElement>();
        /// <summary></summary>
        public List<GSsrElement> Elements { get { return m_Elements; } }
        /// <summary></summary>
        protected void AddNode(XmlNode n)
        {
            m_Elements.Add(new GSsrElement(n));
        }

        /// <summary></summary>
        protected GSsrElement(XmlNode x, bool readChildren = true)
        {
            m_ElementName = x.LocalName;
            foreach (XmlAttribute a in x.Attributes) AddAttribute(a);
            if (readChildren)
            {
                foreach (XmlNode n in x.ChildNodes) AddNode(n);
            }
        }

        /// <summary></summary>
        public GSsrElement(string elementName)
        {
            m_ElementName = elementName;
        }
    }

    /// <summary>Sestava v SSR</summary>
    public class GSsrReport : GSsrElement
    {
        private GSsrReport(XmlNode x, string title, string deffmt = null)
            : base(x, false)
        {
            m_title = title;
            m_deffmt = deffmt;
        }
        /// <summary>Sestava v SSR</summary>
        public GSsrReport(string title, string deffmt = null)
            : base("report")
        {
            m_title = title;
            m_deffmt = deffmt;
        }
        
        //------------------------------------------------------------------
        private string m_title;
        ///<summary>jméno reportu</summary>
        public string Title
        {
            get { return m_title; }
            set { m_title = value; }
        }
        //------------------------------------------------------------------
        private GSsrFile m_struct;
        ///<summary>Struktura</summary>
        public GSsrFile Structure
        {
            get { return m_struct; }
        }
        //------------------------------------------------------------------
        private GSsrFile m_data;
        ///<summary>Datový soubor</summary>
        public GSsrFile Data
        {
            get { return m_data; }
        }
        //------------------------------------------------------------------
        private FormatCollection m_formats = new FormatCollection();
        ///<summary>formáty</summary>
        public /*IList<GSsrFile>*/FormatCollection Formats
        {
            get { return m_formats; }
        }
        ///<summary>třída seznamu souborů formátů</summary>
        public class FormatCollection : List<GSsrFile>
        {
            /// <exclude/>
            public GSsrFile this[string formatName]
            {
                get                 
                {
                    foreach (GSsrFile f in this)
                    {
                        if (f.NameOnly == formatName) return f;
                    }
                    throw new GIndexOutOfRangeException(21000040);
                }
            }
        }
        //------------------------------------------------------------------
        string m_deffmt = "";
        ///<summary>výchozí formát</summary>
        public GSsrFile DefaultFormat
        {
            get
            {
                if (string.IsNullOrEmpty(m_deffmt)) return Formats[0];
                return Formats[m_deffmt];
            }
            set { m_deffmt = value.NameOnly; }
        }
        //------------------------------------------------------------------
        ///<summary>Cesta k obrázkům ze SSR</summary>
        public string ImagePath { get; private set; }
        ///<summary>Reloc obrázek ze SSR</summary>
        public Dictionary<string, string> ImageReloc { get; private set; }
        ///<summary>Global obrázek ze SSR</summary>
        public string ImageGlobal { get; private set; }

        //------------------------------------------------------------------
        private struct s_meta
        {
            public string name;
            public string value;
            public s_meta(string _name, string _value) { name = _name; value = _value; }
        }
        List<s_meta> m_meta = new List<s_meta>();
        ///<summary>seznam meta uložených informací</summary>
        public Dictionary<string, string> CustomProperties
        {
            get
            {
                Dictionary<string, string> d = new Dictionary<string, string>(m_meta.Count);
                foreach (s_meta m in m_meta)
                {
                    d.Add(m.name, m.value);
                }
                return d;
            }
        }

        //------------------------------------------------------------------
        private GPrintFormat m_PrintFormat = null;
        ///<summary>tiskový formát, pro který je sestava určena (musí existovat na stanici)</summary>
        public GPrintFormat PrintFormat
        {
            get { return m_PrintFormat; }
        }

        //------------------------------------------------------------------
        string m_orig;
        string m_sign;

        internal static GSsrReport ParseReport(GSsr s, XmlNode rep)
        {
            XmlAttribute title = rep.Attributes["title"];
            string deffmt = GSsr.GetAttrStr(rep.Attributes["default-format"]);
            GSsrReport report;
            if (title == null)
            {
                report = new GSsrReport(rep, String.Format("report {0}", s.Reports.Count + 1), deffmt);
            }
            else
            {
                report = new GSsrReport(rep, title.Value, deffmt);
            }
            report.Parse(s, rep);
            return report;
        }
        private void Parse(GSsr s, XmlNode rep)
        {
            ImagePath = s.Path;
            foreach (XmlNode n in rep.ChildNodes)
            {
                switch (n.Name)
                {
                    case "structure": m_struct = ParseFile(s, n); break;
                    case "format": m_formats.Add(ParseFile(s, n)); break;
                    case "data": m_data = ParseFile(s, n); break;
                    case "print": AddNode(n); parsePrintSettings(n); break;
                    case "image-path": AddNode(n); parseImageDir(s, n); break;
                    case "image-reloc": AddNode(n); parseImageReloc(n); break;
                    case "image-global": AddNode(n); parseImageGlobal(n); break;
                    case "meta": AddNode(n); parseMeta(n); break;
                    case "original-data":
                        ParseFile(s, n);
                        m_orig = System.IO.Path.Combine(s.Path, GSsr.GetAttrStr(n.Attributes["file"]));
                        //report->m_data.m_list.add("original_file",report->m_orig);
                        break;
                    case "signature":
                        ParseFile(s, n);
                        m_sign = System.IO.Path.Combine(s.Path, GSsr.GetAttrStr(n.Attributes["file"]));
                        break;
                    default:
                        ParseNode(s, n);
                        break;
                }
            }
            if (m_struct == null) throw new GReportException(21000034, 25, Title); //RC-EX 25 : "SSR soubor neobsahuje odkaz na strukturu ({0})"
            if (m_data == null && System.Linq.Enumerable.Any(Elements, e => e.ElementName == "generator") == false)
                throw new GReportException(21000035, 26, Title); //RC-EX 26 : "SSR soubor neobsahuje odkaz na data ({0})"
            if (m_formats.Count == 0) throw new GReportException(21000036, 27, Title); //RC-EX 27 : SSR soubor neobsahuje odkaz na žádný formát ({0})
        }
        private GSsrFile ParseFile(GSsr s, XmlNode n)
        {
            var f = new GSsrFile(s, n);
            Elements.Add(f);
            return f;
        }
        /// <summary></summary>
        protected void ParseNode(GSsr s, XmlNode n)
        {
            if (n.Attributes["file"] != null)
                ParseFile(s, n);
            else
                AddNode(n);
        }

        private void parseMeta(XmlNode n)
        {
            foreach (XmlAttribute a in n.Attributes)
            {
                s_meta m = new s_meta() {name = a.Name, value = a.Value};
                m_meta.Add(m);
            }
        }

        private void parseImageGlobal(XmlNode n)
        {
            var at = n.Attributes["name"];
            if (at == null) return;
            ImageGlobal = at.Value;
        }

        private void parseImageReloc(XmlNode n)
        {
            var an = n.Attributes["name"];
            if (an == null) return;

            var at = n.Attributes["to"];
            if (at == null) return;

            if (ImageReloc == null) ImageReloc = new Dictionary<string, string>();
            ImageReloc[an.Value] = at.Value;
        }

        private void parseImageDir(GSsr s, XmlNode n)
        {
            var at = n.Attributes["path"];
            if (at == null) return;
            if (at.Value == ".")
                ImagePath = s.Path;
            else
                ImagePath = Path.Combine(s.Path, at.Value);
        }

        private void parsePrintSettings(XmlNode n)
        {
            var a = n.Attributes["format"];
            if (a == null) return;
            m_PrintFormat = GPrintFormatManager.GetFormat(a.Value);
        }


        //------------------------------------------------------------------
        /// <exclude/>
        public void RunBridge(IGReportConfiguration cfg, GSsrFile format, string bridge, string outname)
        {
            string l_sdir = null;
            try
            {
                Dictionary<string, string> l_reloc = null;
                if (ImageReloc != null)
                {
                    l_reloc = new Dictionary<string, string>(ImageReloc.Count);
                    foreach (var kv in ImageReloc)
                        l_reloc.Add(kv.Key, Path.Combine(ImagePath, kv.Value));
                }

                var a = format.GetArchiveFor();
                if (a != null)
                {
                    l_sdir = GTempFiles.CreateTempDirectory();
                    GZip.Unzip(a, l_sdir);
                }

                GReportCommon.RunBridgeN(Structure.Name, format.Name, Data.Name,
                    l_sdir ?? ImagePath, bridge, outname,
                    CustomProperties, PrintFormat, ImageGlobal, imageReloc: l_reloc
                    );
            }
            finally
            {
                if (l_sdir != null) GTempFiles.DeleteTempDirectory(l_sdir);
            }
        }

        /// <exclude/>
        public void RunBridge(IGReportConfiguration cfg, int formatIndex, string bridge, string outname)
        {
            RunBridge(cfg, Formats[formatIndex], bridge, outname);
        }
        /// <exclude/>
        public void RunBridge(IGReportConfiguration cfg, string bridge, string outname)
        {
            RunBridge(cfg, DefaultFormat, bridge, outname);
        }

        /// <summary>
        /// Převod do Bitmapy
        /// </summary>
        public System.Drawing.Bitmap ToBitmap(GSsrFile format, int dpi)
        {
            var v = GUnsafeRepWrapper.grr09_Version;
            if (v < new Version(4, 3, 1, 047))
                throw new GReportException(21000041, 30, v.ToString()); //RC-EX 30 : Verze Gordic Reporter je pro tuto funkci příliš nízká ({0}). Je vyžadována aktualizace.
            return _ToBitmap(format, dpi);
        }
        private System.Drawing.Bitmap _ToBitmap(GSsrFile format, int dpi)
        {
            lock (typeof(GUnsafeRepWrapper))
            {
                GUnsafeRepWrapper.GReporterStructure l_oStruct = null;
                GUnsafeRepWrapper.GReporterFormat l_oFormat = null;
                GUnsafeRepWrapper.GReporterData l_oData = null;
                try
                {
                    GUnsafeRepWrapper.SetParameter("working_dir", ImagePath);
                    GUnsafeRepWrapper.SetParameter09("FilesPath", ImagePath);

                    l_oStruct = GUnsafeRepWrapper.OpenStructure(Structure.Name);
                    l_oFormat = GUnsafeRepWrapper.OpenFormat(format.Name);
                    l_oData = GUnsafeRepWrapper.OpenData(Data.Name, l_oStruct, l_oFormat);
                    GUnsafeRepWrapper.grr09_SetData(l_oData.Data);
                    IntPtr bmp;
                    GUnsafeRepWrapper.grr09_RunBitmapBridge(dpi, out bmp);
                    return System.Drawing.Bitmap.FromHbitmap(bmp);
                }
                finally
                {
                    GUnsafeRepWrapper.grr09_Free();
                    if (l_oData != null) l_oData.Dispose();
                    if (l_oFormat != null) l_oFormat.Dispose();
                    if (l_oStruct != null) l_oStruct.Dispose();
                }
            }
        }

    }

    /// <summary>
    /// Jeden soubor v SSR souboru (datovy, xme, format, ...)
    /// </summary>
    public class GSsrFile : GSsrElement
    {
        /// <summary>Jeden soubor v SSR souboru</summary>
        protected internal GSsrFile(GSsr s, XmlNode x, string file = null, string title = null)
            : base(x)
        {
            if (file == null) file = GSsr.GetAttrStr(x.Attributes["file"]);
            if (title == null) title = GSsr.GetAttrStr(x.Attributes["title"]);
            if (file == "")
                m_name = "";
            else
                m_name = System.IO.Path.Combine(s.Path, file);
            m_title = title;
        }
        /// <summary>Jeden soubor v SSR souboru</summary>
        public GSsrFile(GSsr s, string name, string file, string title)
            : base(name)
        {
            m_name = System.IO.Path.Combine(s.Path, file);
            m_title = title;
        }

        //IUnknown* intf;
        //IUnknown* intf2;
        //FILETIME otime;
        //GAttrList m_list;

        //------------------------------------------------------------------
        private string m_name;
        ///<summary>Jméno souboru s cestou</summary>
        public string Name
        {
            get { return m_name; }
        }
        ///<summary>Jméno souboru bez cesty</summary>
        public string NameOnly
        {
            get { return System.IO.Path.GetFileName(m_name); }
        }

        string m_title;
        ///<summary>titulek</summary>
        public string Title
        {
            get { return m_title; }
            set { m_title = value; }
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Načte soubor do paměti
        /// </summary>
        public GMemoryFile LoadToMemoryFile()
        {
            return GMemoryFile.ReadFromFile(Name);
        }

        internal string GetArchiveFor()
        {
            var z = System.IO.Path.ChangeExtension(Name, ".zip");
            if (System.IO.File.Exists(z)) return z;
            return null;
        }
    }


}
