//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEStructure.cs                             </Name>
//    <Description> Parser struktury (XME)                      </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Runtime.InteropServices;
using Gordic.Report.Implementation;
using System.Windows.Forms;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Datová položka
    /// </summary>
    public class GFEDataItem : IGDataItem
    {
        #region Init
        GAttrList m_atrs;
        GFERegion m_region;
        readonly string m_name;
        readonly string m_fname;
        readonly string m_desc;
        readonly string m_preview;
        readonly Gordic.Report.Implementation.Grr06DataType m_dtype;

        /// <summary>
        /// Konstruktor tøídy datové položky
        /// </summary>
        /// <param name="r">region položky</param>
        /// <param name="di">rozhraní datové položky</param>
        internal GFEDataItem(GFERegion r, Gordic.Report.Implementation.IGDataItem di)
        {
            m_region = r;

            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(di.getAttributes(out IGAttrList list));
            try { m_atrs = new GAttrList(m_region.m_structure, list); }
            finally { Marshal.ReleaseComObject(list); }

            di.getName(out m_name);
            di.getFullName(out m_fname);
            di.getDescription(out m_desc);
            di.getDataType(out m_dtype);
            di.getAttribute("preview-value", out m_preview);
        }
        #endregion
        #region Vlastnosti
        /// <summary>
        /// Atributy datové položky
        /// </summary>
        public GAttrList Attributes { get { return m_atrs; } }

        /// <summary>
        /// Název datové položky
        /// </summary>
        public string Name { get { return m_name; } }

        /// <summary>
        /// Úplný název datové položky
        /// </summary>
        public string FullName { get { return m_fname; } }

        /// <summary>
        /// Popis datové položky
        /// </summary>
        public string Description { get { return m_desc; } }

        /// <summary>
        /// Výchozí datová hodnota
        /// </summary>
        public string PreviewValue { get { return m_preview; } }

        /// <summary>
        /// Typ položky
        /// </summary>
        public Gordic.Report.Implementation.Grr06DataType DataType { get { return m_dtype; } }

        /// <summary>
        /// Region položky
        /// </summary>
        public GFERegion Region { get { return m_region; } }
        #endregion
        #region IGDataItem Members

        int IGDataItem.getAttribute(string name, out string value)
        {
            return m_atrs.getAttribute(name, out value);
        }

        int IGDataItem.getAttributes(out IGAttrList atrs)
        {
            atrs = m_atrs;
            return 0;
        }

        int IGDataItem.getDataType(out Grr06DataType typ)
        {
            typ = m_dtype;
            return 0;
        }

        int IGDataItem.getDescription(out string desc)
        {
            desc = GNativeStringCache.RepString(m_region.m_structure, m_desc);
            return 0;
        }

        int IGDataItem.getFullName(out string fname)
        {
            fname = GNativeStringCache.RepString(m_region.m_structure, m_fname);
            return 0;
        }

        int IGDataItem.getName(out string aname)
        {
            aname = GNativeStringCache.RepString(m_region.m_structure, m_name);
            return 0;
        }

        int IGDataItem.getRegion(out IGRegion region)
        {
            region = m_region;
            return 0;
        }

        int m_order = -1;
        int IGDataItem.getOrder(out int order)
        {
            order = m_order;
            return order >= 0 ? 0 : 1;
        }

        int IGDataItem.setOrder(int order)
        {
            m_order = order;
            return 0;
        }

        #endregion
    } // end class

    /// <summary>Oblast struktury</summary>
    public class GFERegion : IGRegion
    {
#if DEBUG
        //public int __UnmanagedRefCount
        //{
        //    get
        //    {
        //        var unk = Marshal.GetIUnknownForObject(this);
        //        return Marshal.Release(unk);
        //    }
        //}
#endif
        #region Init
        internal GFEStructure m_structure;
        GAttrList m_atrs;
        private readonly string m_name;
        private readonly string m_fname;
        private readonly string m_desc;
        GFERegion m_parent;
        GBaseList<string, GFERegion> m_children;
        GBaseList<string, GFEDataItem> m_ditems;

        internal GFERegion(GFERegion p, Gordic.Report.Implementation.IGRegion r)
            : this(p.m_structure, r)
        {
            m_parent = p;
        }

        internal GFERegion(GFEStructure s, Gordic.Report.Implementation.IGRegion r)
        {
            m_structure = s;

            Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getAttributes(out IGAttrList list));
            try
            {
                m_atrs = new GAttrList(s, list);
            }
            finally
            {
                Marshal.ReleaseComObject(list);
            }

            r.getName(out m_name);
            r.getFullName(out m_fname);
            r.getDescription(out m_desc);

            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getChildrenCount(out int cc));
            m_children = new GBaseList<string, GFERegion>(cc);
            for (int i = 0; i < cc; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getChild(i, out IGRegion reg));
                try
                {
                    var nr = new GFERegion(this, reg);
                    m_children.Add(nr.Name, nr);
                }
                finally
                {
                    Marshal.ReleaseComObject(reg);
                }
            }

            Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getDataItemCount(out int dc));
            m_ditems = new GBaseList<string, GFEDataItem>(dc, StringComparer.OrdinalIgnoreCase);
            for (int i = 0; i < dc; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(r.getDataItem(i, out IGDataItem di));
                try
                {
                    var nd = new GFEDataItem(this, di);
                    m_ditems.Add(nd.Name, nd);
                }
                finally
                {
                    Marshal.ReleaseComObject(di);
                }
            }
        }

        ///// <summary>
        ///// uvolnìní objektu
        ///// </summary>
        ///// <param name="disposing">indikátor uvolnìní</param>
        //internal void Dispose(bool disposing)
        //{
        //    foreach (var ch in m_children)
        //        ch.Dispose(disposing);
        //    m_children.Clear();
        //    m_ditems.Clear();
        //    m_parent = null;
        //    m_atrs = null;
        //    m_structure = null;
        //}
        #endregion
        #region Vlastnosti
        /// <summary>Struktura</summary>
        public GFEStructure Structure
        {
            get { return m_structure; }
        }
        /// <summary>Atributy</summary>
        public GAttrList Attributes
        {
            get { return m_atrs; }
        }

        /// <summary>Jméno oblasti</summary>
        public string Name
        {
            get { return m_name; }
        }

        /// <summary>Titulek</summary>
        public string FullName
        {
            get { return m_fname; }
        }

        /// <summary>Popis</summary>
        public string Description
        {
            get { return m_desc; }
        }

        /// <summary>Nadøízený region</summary>
        public GFERegion Parent
        {
            get { return m_parent; }
        }

        /// <summary>Podøízené regiony</summary>
        public GReadonlyList<string, GFERegion> Children
        {
            get { return m_children.ReadOnly; }
        }

        /// <summary>Položky</summary>
        public GReadonlyList<string, GFEDataItem> Items
        {
            get { return m_ditems.ReadOnly; }
        }
        
        /// <summary>Všechny regiony i z vnoøených oblastí</summary>
        public IEnumerable<GFERegion> AllRegionsRecursive()
        {
            foreach (var c in Children)
            {
                yield return c;
                foreach (var i in c.AllRegionsRecursive())
                    yield return i;
            }
        }
        /// <summary>Všechny položky i z vnoøených oblastí</summary>
        public IEnumerable<GFEDataItem> AllItemsRecursive()
        {
            foreach (var i in Items)
                yield return i;
            foreach (var c in Children)
                foreach (var i in c.AllItemsRecursive())
                    yield return i;
        }

        #endregion
        #region IGRegion Members

        int IGRegion.getAttribute(string name, out string value)
        {
            return m_atrs.getAttribute(name, out value);
        }

        int IGRegion.getAttributes(out IGAttrList atrs)
        {
            atrs = m_atrs;
            return 0;
        }

        int IGRegion.getChild(int index, out IGRegion reg)
        {
            reg = m_children[index];
            return 0;
        }

        int IGRegion.getChildByName(string name, out IGRegion reg)
        {
            reg = m_children[name];
            return 0;
        }

        int IGRegion.getChildrenCount(out int cnt)
        {
            cnt = m_children.Count;
            return 0;
        }

        int IGRegion.getDataItem(int index, out IGDataItem di)
        {
            di = m_ditems[index];
            return 0;
        }

        int IGRegion.getDataItemByName(string name, out IGDataItem di)
        {
            di = m_ditems[name];
            return di == null ? 1 : 0;
        }
        public GFEDataItem GetDataItemByName(string name)
        {
            return m_ditems[name];
        }

        int IGRegion.getDataItemCount(out int cnt)
        {
            cnt = m_ditems.Count;
            return 0;
        }

        int IGRegion.getDescription(out string desc)
        {
            desc = GNativeStringCache.RepString(m_structure, m_desc);
            return 0;
        }

        int IGRegion.getFullName(out string fname)
        {
            fname = GNativeStringCache.RepString(m_structure, m_fname);
            return 0;
        }

        int IGRegion.getName(out string aname)
        {
            aname = GNativeStringCache.RepString(m_structure, m_name);
            return 0;
        }

        int IGRegion.getParentBorrowed(out IntPtr reg)
        {
            if (m_parent == null) { reg = IntPtr.Zero; return 1; }
            reg = Marshal.GetComInterfaceForObject(m_parent, typeof(IGRegion));
            Marshal.Release(reg);
            return 0;
        }

        int IGRegion.getParentIndex(out int index)
        {
            index = m_parent.m_children.IndexOfValue(this);
            return 0;
        }

        int IGRegion.hasChild(string name)
        {
            if (m_children.IndexOfKey(name) < 0) return 1;
            return 0;
        }

        int IGRegion.isA(string name)
        {
            return m_name == name ? 0 : 1;
        }

        #endregion
    }

    /// <summary>Struktura (xme)</summary>
    public class GFEStructure : IGStructure, IGNativeStringOwner, IDisposable
    {
        GNativeStringCache IGNativeStringOwner.NativeStringCache { [System.Security.SecurityCritical] get; } = new GNativeStringCache();
        #region IDisposable
        /// <summary>
        /// uvolnìní objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// uvolnìní objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnìní</param>
        void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}{GNativeStringCache.DebugString(this)}");
#endif
            GNativeStringCache.Free(this);
        }
        ~GFEStructure() { Dispose(false); }

        #endregion
        #region Init
        private readonly int m_vermaj;
        private readonly int m_vermin;
        private readonly string m_strid;
        private readonly string m_fileName;
        private readonly int m_strmaj;
        private readonly int m_strmin;
        private readonly GInfoList m_infos;
        private readonly GFERegion m_root;

        internal GFEStructure()
        {
        }

        internal GFEStructure(Gordic.Report.Implementation.IGStructure str, string fileName = null)
        {
            m_fileName = fileName;
            str.getVersion(out m_vermaj, out m_vermin);
            str.getStructureVersion(out m_strid, out m_strmaj, out m_strmin);

            str.getAllInfo(out IGInfoList l_info);
            try
            {
                m_infos = //new GFEInfoList(l_info);
                    new GInfoList(this, l_info);
            }
            finally
            {
                Marshal.ReleaseComObject(l_info);
            }

            str.getRoot(out IGRegion l_root);
            try
            {
                m_root = new GFERegion(this, l_root as IGRegion);
            }
            finally
            {
                Marshal.ReleaseComObject(l_root);
            }
            LoadTemplates();
        }
        #endregion
        #region Load
        /// <summary>Naètení ze souboru</summary>
        public static GFEStructure LoadFromFile(string filename)
        {
            Guid g = typeof(Gordic.Report.Implementation.IGStructure).GUID;
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(Gordic.Report.Interface.GUnsafeRepWrapper.OpenStructureFile(filename, ref g, out object ret));
            try
            {
                return new GFEStructure(ret as Gordic.Report.Implementation.IGStructure, filename);
            } // end try
            finally
            {
                Marshal.ReleaseComObject(ret);
            } // end finally
        } // end method

        /// <summary>Naètení z pamìti</summary>
        public static GFEStructure LoadFromBytes(byte[] bytes, string fileName = null)
        {
            Guid g = typeof(Gordic.Report.Implementation.IGStructure).GUID;
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(Gordic.Report.Interface.GUnsafeRepWrapper.OpenStructureBytes(bytes, ref g, out object ret));
            
            try
            {
                return new GFEStructure(ret as Gordic.Report.Implementation.IGStructure, fileName);
            } // end try
            finally
            {
                Marshal.ReleaseComObject(ret);
            } // end finally
        } // end method

        private void LoadTemplates()
        {
            if (m_fileName == null) return;
            var x = System.Xml.Linq.XDocument.Load(m_fileName);
            foreach (var t in x.Root.Descendants().Where(n => n.Name.LocalName == "template"))
            {
                var reader = t.CreateReader();
                reader.MoveToContent();
                m_Templates.Add(new GFETemplate(t.Attributes(), reader.ReadInnerXml()));
            }
        }
        #endregion
        #region Vlastnosti
        List<GFETemplate> m_Templates = new List<GFETemplate>();
        /// <summary>
        /// Seznam šablon
        /// </summary>
        public List<GFETemplate> Templates
        {
            get { return m_Templates; }
        }
        /// <summary>
        /// Verze specifikace Major
        /// </summary>
        public int SpecVersionMajor
        {
            get { return m_vermaj; }
        }

        /// <summary>
        /// Verze specifikace Minor
        /// </summary>
        public int SpecVersionMinor
        {
            get { return m_vermin; }
        }

        /// <summary>
        /// ID struktury
        /// </summary>
        public string StructureID
        {
            get { return m_strid; }
        }

        /// <summary>
        /// Verze struktury
        /// </summary>
        public int StructureVersionMajor
        {
            get { return m_strmaj; }
        }

        /// <summary>
        /// Subverze struktury
        /// </summary>
        public int StructureVersionMinor
        {
            get { return m_strmin; }
        }

        /// <summary>
        /// Info sekce
        /// </summary>
        public GInfoList Infos
        {
            get { return m_infos; }
        }

        /// <summary>
        /// Hlavní region
        /// </summary>
        public GFERegion Root
        {
            get { return m_root; }
        }

        /// <summary>
        /// Název souboru, pro pøípad naètení ze souboru
        /// </summary>
        public string FileName { get { return m_fileName; } }

        /// <summary>Najde region dle jména</summary>
        public GFERegion GetRegion(string name, GFERegion from = null)
        {
            if (from == null) from = Root;
            if (name == from.Name) return from;
            foreach (GFERegion r in from.Children)
            {
                if (r.Name == name) return r;
                var reg = GetRegion(name, r);
                if (reg != null) return reg;
            }
            return null;
        }
        #endregion
        #region IGStructure Members

        int IGStructure.getAllInfo(out IGInfoList info)
        {
            info = m_infos;
            return 0;
        }

        int IGStructure.getInfo(string name, out string value)
        {
            return Infos.getInfo(name, out value);
        }

        int IGStructure.getRoot(out IGRegion root)
        {
            root = m_root;
            return 0;
        }

        int IGStructure.getStructureVersion(out string ident, out int major, out int minor)
        {
            ident = GNativeStringCache.RepString(this, m_strid);
            major = m_strmaj;
            minor = m_strmin;
            return 0;
        }

        int IGStructure.getVersion(out int major, out int minor)
        {
            major = m_vermaj;
            minor = m_vermin;
            return 0;
        }

        #endregion

        #region StructureFormatCompare
        /// <summary>Srovnání a provázání s formátem</summary>
        public void CompareToFormat(IGFormat format)
        {
            format.getRoot(out IGFormatRegion froot);
            if (froot==null) return;
            froot.getStructureRegion(out IGRegion sroot);
            
            if (Marshal.IsComObject(froot)) Marshal.ReleaseComObject(froot);
            froot = null;

            if (sroot != null) return;
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(Gordic.Report.Interface.GUnsafeRepWrapper.StructureFormatCompare(this, format));
        }
        #endregion

        MouseEventHandler mouseDoubleClick;
        /// <summary>
        /// metoda události dvojkliku na datovou strukturu
        /// </summary>
        public event MouseEventHandler MouseDoubleClick
        {
            add { mouseDoubleClick = null; mouseDoubleClick += value; }
            remove { mouseDoubleClick -= value; }
        }

        /// <summary>
        /// reakce na dvojklik
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void OnMouseDoubleClick(object sender, MouseEventArgs e)
        {
            mouseDoubleClick?.Invoke(sender, e);
        }
    }
}
