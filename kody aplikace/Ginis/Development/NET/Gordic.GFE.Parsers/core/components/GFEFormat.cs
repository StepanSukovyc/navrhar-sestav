//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormat.cs                             </Name>
//    <Description> Parser formatu (ALF)                                        </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2006-10-05                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;
using Gordic.Report.Implementation;
using System.Linq;
using Gordic.Report.Interface;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Parser formatu (ALF)
    /// </summary>
    public class GFEFormat : IDisposable
    {
        #region Promenne
        readonly string m_group;
        private readonly int m_vermaj;
        private readonly int m_vermin;
        readonly string m_strid;
        private readonly int m_strmaj;
        private readonly int m_strmin;
        GFEInfoList m_infos;
        GFEFormatRegion m_root;
        GFETempDir m_tempdir;
        readonly GFEAttrList m_atrs;//SS
        readonly GFEInfoList m_resources;//TODO
        private readonly int m_pw;
        private readonly int m_ph;
        Gordic.Report.Implementation.Grr06Widths m_pmargins;
        #endregion

        #region Vlastnosti

        /// <summary>
        /// Formátovací skupina (GRR/GRF/RTF/MSE/...)
        /// </summary>
        public string FormattingGroup { get { return m_group; } }

        /// <summary>
        /// Verze specifikace
        /// </summary>
        public int SpecVersionMajor { get { return m_vermaj; } }

        /// <summary>
        /// Subverze specifikace
        /// </summary>
        public int SpecVersionMinor { get { return m_vermin; } }

        /// <summary>
        /// Identifikace XME
        /// </summary>
        public string StructureID { get { return m_strid; } }

        /// <summary>
        /// Verze XME
        /// </summary>
        public int StructureVersionMajor { get { return m_strmaj; } }

        /// <summary>
        /// Subverze XME
        /// </summary>
        public int StructureVersionMinor { get { return m_strmin; } }

        /// <summary>
        /// Seznam INFO znaèek
        /// </summary>
        public GFEList Infos
        {
            get { return m_infos; }
            set { m_infos = SetInfos(value); }
        }

        /// <summary>
        /// Seznam RESOURCE znaèek
        /// </summary>
        public GFEList Resources
        {
            get { return m_resources; }
            //set { m_resources = value; }
        }

        GFEInfoList SetInfos(GFEList value)
        {
            GFEInfoList result = new GFEInfoList();
            foreach (KeyValuePair<string, string> item in value)
                if (!result.ContainsKey(item.Key))
                    result.Add(item.Key, item.Value);
            return result;
        }

        /// <summary>
        /// Odkaz na hlavní oblast
        /// </summary>
        public GFEFormatRegion Root { get { return m_root; } }

        /// <summary>
        /// tempdir pro práci s pøílohami (obrázky, šablony, atp.)
        /// </summary>
        public GFETempDir TempDir
        {
            get { return m_tempdir; }
            set { m_tempdir = value; }
        }

        /// <summary>
        /// Nastavení editoru – vyhrazeno pro úèely návrháøe sestav
        /// </summary>
        public GFEAttrList EditorSettings { get { return m_atrs; } }

        /// <summary>
        /// Velikost stránky
        /// </summary>
        public System.Drawing.Size PageSize { get { return new System.Drawing.Size(m_pw, m_ph); } }

        /// <summary>
        /// Netisknutelné okraje stránky
        /// </summary>
        public Gordic.Report.Implementation.Grr06Widths PageMargins { get { return m_pmargins; } }

        #endregion
        
        #region Konstruktor
        /// <exclude/>
        protected Gordic.Report.Implementation.IGFormat m_fmt;
        /// <summary>
        /// Vrací native reprezentaci
        /// </summary>
        public Gordic.Report.Implementation.IGFormat Native { get { return m_fmt; } }

        /// <exclude/>
        protected GFEFormat(GFETempDir temp) { m_tempdir = temp; }

        internal GFEFormat(Gordic.Report.Implementation.IGFormat fmt, GFETempDir temp)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Alloc");
#endif
            m_fmt = fmt;
            m_tempdir = temp;
            fmt.getFormattingGroup(out m_group);
            fmt.getVersion(out m_vermaj, out m_vermin);
            fmt.getStructureVersion(out m_strid, out m_strmaj, out m_strmin);

            fmt.getAllInfo(out IGInfoList l_info);

            m_atrs = EditorSetting();//SS
            m_resources = new GFEInfoList();

            try
            {
                m_infos = new GFEInfoList(l_info);
            }
            finally
            {
                Marshal.ReleaseComObject(l_info);
            }

            fmt.getPaperSize(out m_pw, out m_ph);
            fmt.getPaperMargins(out m_pmargins);

            Gordic.Report.Implementation.IGFormatDevTools l_dev = fmt as Gordic.Report.Implementation.IGFormatDevTools;
            fmt.getRoot(out IGFormatRegion l_root);
            try { m_root = new GFEFormatRegion(this, l_root as IGFormatRegion, l_dev); }
            finally { Marshal.ReleaseComObject(l_root); }
            LoadRootInfo();
        }
        #endregion
        #region Load
        private static void Prepare(GFETempDir temp, bool devmode)
        {
            if (temp != null)
                GUnsafeRepWrapper.SetParameter("working_dir", temp.Path);
            GUnsafeRepWrapper.SetParameter("developer_mode", devmode ? "1" : "0");
        }

        private static GFEFormat Load(object ret, GFETempDir temp)
        {
            if (ret is Gordic.Report.Implementation.IGFormatRTF) return new GFEFormatRTF(ret as Gordic.Report.Implementation.IGFormatRTF, temp);
            if (ret is Gordic.Report.Implementation.IGFormatGRF) return new GFEFormatGRF(ret as Gordic.Report.Implementation.IGFormatGRF, temp ?? new GFETempDir());
            if (ret is Gordic.Report.Implementation.IGFormatGRR) return new GFEFormatGRR(ret as Gordic.Report.Implementation.IGFormatGRR, temp);
            //if (ret is Gordic.Report.Implementation.IGFormatMSEMSW) return new GFEFormatMSEMSW(ret as Gordic.Report.Implementation.IGFormatMSEMSW, temp);
            return new GFEFormat(ret as Gordic.Report.Implementation.IGFormat, temp);
        }

        private static GFEFormat LoadFromFile(string filename, GFETempDir temp, bool devmode)
        {
            Prepare(temp, devmode);
            Guid g = typeof(Gordic.Report.Implementation.IGFormat).GUID;
            GUnsafeRepWrapper.Throw06Error(GUnsafeRepWrapper.OpenFormatFile(filename, ref g, out object ret));
            try
            {
                return Load(ret,temp);
            } // end try
            finally
            {
                ret = null;
                //Marshal.ReleaseComObject(ret);
            } // end finally
        }

        private static GFEFormat LoadFromBytes(byte[] bytes, string fname, GFETempDir temp, bool devmode)
        {
            Prepare(temp, devmode);
            var len = bytes.Length;
            Array.Resize(ref bytes, len + 1);
            bytes[len] = 0; //terminator

            Guid g = typeof(Gordic.Report.Implementation.IGFormat).GUID;
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(Gordic.Report.Interface.GUnsafeRepWrapper.OpenFormatBytes(bytes, fname, ref g, out object ret));
            try
            {
                return Load(ret,temp);
            } // end try
            finally
            {
                ret = null;
                //Marshal.ReleaseComObject(ret);
            } // end finally
        }

        private static GFEFormat LoadFromString(string text, string fname, Encoding enc, GFETempDir temp, bool devmode)
        {
            Prepare(temp, devmode);

            var l = enc.GetByteCount(text);
            //var b = Marshal.AllocCoTaskMem(l + 1);
            var b = new byte[l + 1]; //+terminator
            enc.GetBytes(text, 0, text.Length, b, 0);

            Guid g = typeof(Gordic.Report.Implementation.IGFormat).GUID;
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(Gordic.Report.Interface.GUnsafeRepWrapper.OpenFormatBytes(b, fname, ref g, out object ret));
            try
            {
                return Load(ret, temp);
            } // end try
            catch { }
            finally
            {
                ret = null;
                //Marshal.ReleaseComObject(ret);
            } // end finally
            return null;
        }        


        /// <summary>LoadFromFile</summary>
        public static GFEFormat LoadFromFile(string filename, bool devmode = true)
        {
            string l_zipname = System.IO.Path.ChangeExtension(filename, ".zip");
            if (System.IO.File.Exists(l_zipname)) return LoadFromFile(filename, l_zipname, devmode);
            return LoadFromFile(filename, (GFETempDir)null, devmode);
        }

        /// <summary>LoadFromFile</summary>
        public static GFEFormat LoadFromFile(string filename, string zipname, bool devmode = true)
        {
            return LoadFromFile(filename, new GFETempDir(zipname), devmode);
        }

        /// <summary>LoadFromBytes</summary>
        public static GFEFormat LoadFromBytes(byte[] bytes, string fname, bool devmode = true)
        {
            return LoadFromBytes(bytes, fname, (GFETempDir)null, devmode);
        }
        /// <summary>LoadFromBytes</summary>
        public static GFEFormat LoadFromString(string text, string fname, Encoding enc, bool devmode = true)
        {
            return LoadFromString(text, fname, enc, (GFETempDir)null, devmode);
        }
        /// <summary>LoadFromBytes</summary>
        public static GFEFormat LoadFromBytes(byte[] bytes, string fname, bool temp, bool devmode = true)
        {
            if (temp)
                return LoadFromBytes(bytes, fname, new GFETempDir(), devmode);
            else
                return LoadFromBytes(bytes, fname);
        }

        /// <summary>LoadFromBytes</summary>
        public static GFEFormat LoadFromBytes(byte[] bytes, string fname, byte[] zip, bool devmode = true)
        {
            return LoadFromBytes(bytes, fname, new GFETempDir(zip), devmode);
        }
        #endregion

        #region Vlastnosti
        /// <summary>
        /// Získá EditorSettings
        /// </summary>
        internal GFEAttrList EditorSetting()
        {
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(m_fmt.getEditorSetting(out IGAttrList list));
            try { return new GFEAttrList(list); }
            finally { Marshal.ReleaseComObject(list); }
        }

        private void LoadRootInfo()
        {
            foreach (var tag in m_root.Body)
            {
                switch (tag.TagName)
                {
                    case "offline-setting":
                        foreach (var ch in tag.Children)
                            if (ch.TagName == "submit")
                                OfflineSettings.Add(ParseOfflineSetting(ch.Attributes));
                        break;
                }
            }
        }

        public class OfflineSubmit
        {
            /// <summary>
            /// "/format/offline-setting/submit", "method"
            /// </summary>
            public string SubmitMethod;
            /// <summary>
            /// "/format/offline-setting/submit", "url"
            /// </summary>
            public string SubmitUrl;
            /// <summary>
            /// "/format/offline-setting/submit", "text"
            /// </summary>
            public string SubmitText;
            /// <summary>
            /// "/format/offline-setting/submit", "name"
            /// </summary>
            public string SubmitName;

            public string MailTo;
            public string MailSubject;
            public string MailBody;
        }
        private OfflineSubmit ParseOfflineSetting(GFEList attrs)
        {
            var sh = new OfflineSubmit
            {
                SubmitName = attrs.GetValueDefault("name"),
                SubmitText = attrs.GetValueDefault("text"),
                SubmitMethod = attrs.GetValueDefault("method"),
                SubmitUrl = attrs.GetValueDefault("url"),

                //to="alik@gordic.cz" subject="This is the subject" body="This is the body"
                MailTo = attrs.GetValueDefault("to"),
                MailSubject = attrs.GetValueDefault("subject"),
                MailBody = attrs.GetValueDefault("body")
            };
            return sh;
        }
        public List<OfflineSubmit> OfflineSettings = new List<OfflineSubmit>();


        #endregion

        #region IDisposable Members

#if MEMORYDEBUG
        internal static readonly Gordic.General.IGLogger MemoryDebugLog = Gordic.General.GLogManager.GetLogger("Gordic.Gfe.MemoryDebug");
#endif

        /// <exclude/>
        ~GFEFormat() { Dispose(false); }
        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <exclude/>
        protected virtual void Dispose(bool disposing)
		{
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
            {
                m_namedtags.Clear();
                m_lookup = null;
                if (m_tempdir != null)
                {
                    m_tempdir.Close();
                    m_tempdir = null;
                } // end if
                if (m_root != null)
                {
                    m_root.Dispose();
                    m_root = null;
                }
            }
            if (m_fmt != null)
            {
                Marshal.ReleaseComObject(m_fmt);
                m_fmt = null;
            }
        }

        #endregion

        List<KeyValuePair<string, Gordic.GFE.Parsers.Dom.INamedComponent>> m_namedtags = new List<KeyValuePair<string, Gordic.GFE.Parsers.Dom.INamedComponent>>();
        ILookup<string, Gordic.GFE.Parsers.Dom.INamedComponent> m_lookup = null;

        internal void InitializeRegisterNamedComponents()
        {
            m_namedtags.Clear();
        }
        internal void UnregisterNamedComponent(Gordic.GFE.Parsers.Dom.INamedComponent tag)
        {
            var name = tag.Name;
            if (string.IsNullOrEmpty(name) == false)
            {
                m_namedtags.Remove(new KeyValuePair<string, Gordic.GFE.Parsers.Dom.INamedComponent>(name, tag));
                m_lookup = null;
            }
            var cls = tag.Class;
            if (string.IsNullOrEmpty(cls) == false)
            {
                foreach (var c in cls.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries))
                    m_namedtags.Remove(new KeyValuePair<string, Gordic.GFE.Parsers.Dom.INamedComponent>(c, tag));
                m_lookup = null;
            }
        }
        internal void RegisterNamedComponent(Gordic.GFE.Parsers.Dom.INamedComponent tag)
        {
            var name = tag.Name;
            if (string.IsNullOrEmpty(name) == false)
            {
                m_namedtags.Add(new KeyValuePair<string, Gordic.GFE.Parsers.Dom.INamedComponent>(name, tag));
                m_lookup = null;
            }
            var cls = tag.Class;
            if (string.IsNullOrEmpty(cls) == false)
            {
                foreach(var c in cls.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries))
                    m_namedtags.Add(new KeyValuePair<string, Gordic.GFE.Parsers.Dom.INamedComponent>(c, tag));
                m_lookup = null;
            }
        }
        public ILookup<string, Gordic.GFE.Parsers.Dom.INamedComponent> NamedComponents
        {
            get
            {
                if (m_lookup == null)
                    m_lookup = m_namedtags.ToLookup(x => x.Key, x => x.Value);
                return m_lookup;
            }
        }

    }
}
