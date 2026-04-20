//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportXmeReader.cs                 </Name>
//    <Description> Parser na strukturu                                         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2012                            </Copyright>
//    <Created>     2012-06-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.General;
using Gordic.Report.Interface;
using System.Runtime.InteropServices;

namespace Gordic.Report.Implementation
{
    /// <summary>Parser na strukturu</summary>
    [System.Security.SecurityCritical]
    public class GStructure : IGStructure, IGNativeStringOwner
    {
        GNativeStringCache IGNativeStringOwner.NativeStringCache { [System.Security.SecurityCritical] get; } = new GNativeStringCache();

        GDataSet m_ds;
        internal GDataSet Ds { get { return m_ds; } }

        /// <summary>Parser na strukturu</summary>
        public GStructure(GDataSet dataSet)
        {
            m_ds = dataSet;
            m_Root = new GStructuctureRoot(this);
        }
        /// <summary>Parser na strukturu</summary>
        public GStructure(Stream xme)
        {
            m_ds = new GDataSet();
            m_ds.ReadXmlSchema(xme);
            m_Root = new GStructuctureRoot(this);
        }

        [System.Security.SecurityCritical]
        int IGStructure.getVersion(out int major, out int minor)
        {
            major = m_ds.XMETA_ver;
            minor = m_ds.XMETA_subver;
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGStructure.getStructureVersion(out string ident, out int major, out int minor)
        {
            ident = GNativeStringCache.RepString(this, m_ds.XMETA_ixs);
            major = m_ds.XMETA_ver;
            minor = m_ds.XMETA_subver;
            return 0;
        }
        /// <summary>Id+Verze</summary>
        public void getStructureVersion(out string ident, out int major, out int minor)
        {
            ident = m_ds.XMETA_ixs;
            major = m_ds.XMETA_ver;
            minor = m_ds.XMETA_subver;
        }

        [System.Security.SecurityCritical]
        int IGStructure.getRoot(out IGRegion root)
        {
            root = Root;
            return 0;
        }
        GStructureRegion m_Root;
        /// <summary>Root region</summary>
        public GStructureRegion Root
        {
            get { return m_Root; }
        }

        [System.Security.SecurityCritical]
        int IGStructure.getAllInfo(out IGInfoList info)
        {
            info = new GInfoList(this, m_ds.Infos);
            return 0;
        }

        /// <summary>Zjištění všech Infos</summary>
        [System.Security.SecurityCritical]
        public GInfoList getAllInfo()
        {
            return new GInfoList(this, m_ds.Infos);
        }

        [System.Security.SecurityCritical]
        int IGStructure.getInfo(string name, out string value)
        {
            var v = m_ds.GetInfo(name);
            value = GNativeStringCache.RepString(this, v);
            return v == null ? 1 : 0;
        }
        /// <summary>Zjištění Info</summary>
        public string getInfo(string name)
        {
            return m_ds.GetInfo(name);
        }

        #region IDisposable Members
        /// <exclude/>        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <exclude/>        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(Gordic.General.GLogManager.GetLogger("Gordic.Gfe.MemoryDebug"), $"{GetType()} Dispose {disposing}{GNativeStringCache.DebugString(this)}");
#endif
            GNativeStringCache.Free(this);
        }
        [System.Security.SecuritySafeCritical] ~GStructure() { Dispose(false); }
        #endregion
    }

    [System.Security.SecurityCritical]
    internal class GStructuctureRoot : GStructureRegion
    {
        GStructureRegion r;
        List<GStructureItem> i = new List<GStructureItem>();
        public GStructuctureRoot(GStructure s)
            : base(s, new System.Data.DataTable("ROOT"), null)
        {
            m_dt.Columns.Add("PAGE", typeof(string));
            m_dt.Columns.Add("PAGES", typeof(string));
            m_dt.Columns.Add("NOW", typeof(DateTime));
            m_dt.Columns.Add("DATE", typeof(string));
            m_dt.Columns.Add("TIME", typeof(string));
            m_dt.Columns.Add("VERSION", typeof(decimal));
            this.r = new GStructureRegion(s, s.Ds.Tables[0], this);
        }

        /// <summary>Počet vnořených regionů</summary>
        public override int ChildrenCount
        {
            [System.Security.SecurityCritical]
            get { return 1; }
        }
        /// <summary>Vrací vnořený region</summary>
        [System.Security.SecurityCritical]
        public override GStructureRegion GetChild(int index)
        {
            if (index != 0) throw new GArgumentOutOfRangeException(21000043);
            return r;
        }
        /// <summary>Vrací vnořený region</summary>
        [System.Security.SecurityCritical]
        public override GStructureRegion GetChild(string name)
        {
            var r = GetChild(0);
            if (r.Name != name) throw new GArgumentOutOfRangeException(21000044);
            return r;
        }

        ///// <summary>Počet položek</summary>
        //public virtual int DataItemCount
        //{
        //    get { return m_dt.Columns.Count; }
        //}
        ///// <summary>Vrací položku</summary>
        //public virtual GStructureItem GetDataItem(int index)
        //{
        //    return new GStructureItem(m_dt.Columns[index], this);
        //}
        ///// <summary>Vrací položku</summary>
        //public virtual GStructureItem GetDataItem(string name)
        //{
        //    var col = m_dt.Columns[name];
        //    if (col == null) return null;
        //    return new GStructureItem(col, this);
        //}

    }

    /// <summary>Region ze struktury</summary>
    [System.Security.SecurityCritical]
    [System.Diagnostics.DebuggerDisplay("StructureRegion {Name}")]
    public class GStructureRegion : IGRegion
    {
        /// <exclude/>
        protected internal GStructure m_structure;
        /// <exclude/>
        protected GStructureRegion m_parent;
        /// <exclude/>
        protected System.Data.DataTable m_dt;
        GAttrList m_Attributes = null;

        /// <summary>Region ze struktury</summary>
        public GStructureRegion(GStructure structure, System.Data.DataTable dataTable, GStructureRegion parent)
        {
            m_structure = structure;
            m_dt = dataTable;
            m_parent = parent;
        }

        //------------------------------------------------------------------
        /// <summary>atributy</summary>
        public GAttrList Attributes
        {
            get { return m_Attributes ?? (m_Attributes = new GAttrList(m_structure, m_dt.ExtendedProperties)); }
        }
        [System.Security.SecurityCritical]
        int IGRegion.getAttributes(out IGAttrList atrs)
        {
            atrs = Attributes;
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGRegion.getAttribute(string name, out string value)
        {
            var v = m_dt.ExtendedProperties[name];
            if (v == null) { value = null; return 1; }
            value = GNativeStringCache.RepString(m_structure, v.ToString());
            return 0;
        }

        //------------------------------------------------------------------
        /// <summary>jméno regionu</summary>
        public string Name
        {
            get { return m_dt.TableName; }
        }
        [System.Security.SecurityCritical]
        int IGRegion.getName(out string aname)
        {
            aname = GNativeStringCache.RepString(m_structure, Name);
            return 0;
        }

        /// <summary>titulek regionu</summary>
        public string Title
        {
            get { return Attributes["title"]; }
        }
        /// <summary>titulek nebo jméno regionu</summary>
        public string FullName
        {
            get { return Title ?? Name; }
        }
        [System.Security.SecurityCritical]
        int IGRegion.getFullName(out string fname)
        {
            fname = GNativeStringCache.RepString(m_structure, FullName);
            return 0;
        }

        /// <summary>description regionu</summary>
        public string Description
        {
            get { return Attributes["description"]; }
        }
        [System.Security.SecurityCritical]
        int IGRegion.getDescription(out string desc)
        {
            desc = GNativeStringCache.RepString(m_structure, Description);
            return 0;
        }
        
        //------------------------------------------------------------------
        /// <summary>Počet vnořených regionů</summary>
        public virtual int ChildrenCount 
        {
            get { return m_dt.ChildRelations.Count; }
        }
        /// <summary>Vrací vnořený region</summary>
        public virtual GStructureRegion GetChild(int index)
        {
            return GetChild(m_dt.ChildRelations[index]);
        }
        /// <summary>Vrací vnořený region</summary>
        public virtual GStructureRegion GetChild(string name)
        {
            return GetChild(m_dt.ChildRelations[name]);
        }
        Dictionary<System.Data.DataRelation, GStructureRegion> _rels = null;
        private GStructureRegion GetChild(System.Data.DataRelation rel)
        {
            if (rel == null) return null;
            if (_rels == null) _rels = new Dictionary<System.Data.DataRelation, GStructureRegion>();
            GStructureRegion s;
            if (_rels.TryGetValue(rel, out s)) return s;
            s = new GStructureRegion(m_structure, rel.ChildTable, this);
            _rels[rel] = s;
            return s;
        }
        [System.Security.SecurityCritical]
        int IGRegion.getChildrenCount(out int cnt)
        {
            cnt = ChildrenCount;
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGRegion.getChild(int index, out IGRegion reg)
        {
            reg = GetChild(index);
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGRegion.getParentBorrowed(out IntPtr reg)
        {
            //reg = Marshal.GetIUnknownForObject(m_parent);
            reg = Marshal.GetComInterfaceForObject(m_parent, typeof(IGRegion));
            Marshal.Release(reg); //borrow
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGRegion.getChildByName(string name, out IGRegion reg)
        {
            reg = GetChild(name);
            return 0;
        }

        //------------------------------------------------------------------
        Dictionary<System.Data.DataColumn, GStructureItem> _cd = null;
        List<GStructureItem> _cl = null;
        private void BuildItems()
        {
            _cd = new Dictionary<System.Data.DataColumn, GStructureItem>(m_dt.Columns.Count);
            _cl = new List<GStructureItem>();
            foreach (System.Data.DataColumn c in m_dt.Columns)
            {
                if (c.AutoIncrement == false && c.ColumnName.StartsWith("_Pid") == false)
                {
                    var i = new GStructureItem(c, this);
                    _cd.Add(c, i);
                    _cl.Add(i);
                }
            }
        }

        /// <summary>Počet položek</summary>
        public virtual int DataItemCount
        {
            get { if (_cl == null) BuildItems(); return _cl.Count; }
        }
        /// <summary>Vrací položku</summary>
        public virtual GStructureItem GetDataItem(int index)
        {
            if (_cl == null) BuildItems();
            return _cl[index];
        }
        /// <summary>Vrací položku</summary>
        public virtual GStructureItem GetDataItem(string name)
        {
            var col = m_dt.Columns[name];
            if (col == null || col.AutoIncrement) return null;
            if (_cd == null) BuildItems();
            return _cd[col];
        }
        [System.Security.SecurityCritical]
        int IGRegion.getDataItemCount(out int cnt)
        {
            cnt = DataItemCount;
            return 0;
        }

        [System.Security.SecurityCritical]
        int IGRegion.getDataItem(int index, out IGDataItem di)
        {
            di = GetDataItem(index);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IGRegion.getDataItemByName(string name, out IGDataItem di)
        {
            di = GetDataItem(name);
            return 0;
        }

        //------------------------------------------------------------------
        [System.Security.SecurityCritical]
        int IGRegion.isA(string name)
        {
            return Name == name ? 0 : 1;
        }

        [System.Security.SecurityCritical]
        int IGRegion.hasChild(string name)
        {
            return m_dt.ChildRelations.Contains(name) ? 0 : 1;
        }

        [System.Security.SecurityCritical]
        int IGRegion.getParentIndex(out int index)
        {
            if (m_dt.ParentRelations.Count == 0) //root?
            {
                index = 0;
                return 0;
            }

            var rn = m_dt.ParentRelations[0].RelationName;
            var pt = m_dt.ParentRelations[0].ParentTable;
            index = pt.ChildRelations.IndexOf(rn);
            return 0;
        }
    }

    /// <summary>DataItem ze struktury</summary>
    [System.Security.SecurityCritical]
    [System.Diagnostics.DebuggerDisplay("StructureItem {Name}")]
    public class GStructureItem : IGDataItem
    {
        GStructureRegion m_reg;
        System.Data.DataColumn m_col;
        GAttrList m_Attributes = null;
        /// <summary>DataItem ze struktury</summary>
        public GStructureItem(System.Data.DataColumn col, GStructureRegion reg)
        {
            m_reg = reg;
            m_col = col;
        }

        //------------------------------------------------------------------
        /// <summary>atributy</summary>
        public GAttrList Attributes
        {
            get { return m_Attributes ?? (m_Attributes = new GAttrList(m_reg.m_structure, m_col.ExtendedProperties)); }
        }
        [System.Security.SecurityCritical]
        int IGDataItem.getAttributes(out IGAttrList atrs)
        {
            atrs = Attributes;
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGDataItem.getAttribute(string name, out string value)
        {
            var v = m_col.ExtendedProperties[name];
            if (v == null) { value = null; return 1; }
            value = GNativeStringCache.RepString(m_reg.m_structure, v.ToString());
            return 0;
        }

        //------------------------------------------------------------------
        /// <summary>jméno regionu</summary>
        public string Name
        {
            get { return m_col.ColumnName; }
        }
        [System.Security.SecurityCritical]
        int IGDataItem.getName(out string aname)
        {
            aname = GNativeStringCache.RepString(m_reg.m_structure, Name);
            return 0;
        }

        /// <summary>titulek regionu</summary>
        public string Title
        {
            get { return Attributes["title"]; }
        }
        /// <summary>titulek nebo jméno regionu</summary>
        public string FullName
        {
            get { return Title ?? Name; }
        }
        [System.Security.SecurityCritical]
        int IGDataItem.getFullName(out string fname)
        {
            fname = GNativeStringCache.RepString(m_reg.m_structure, FullName);
            return 0;
        }

        /// <summary>description regionu</summary>
        public string Description
        {
            get { return Attributes["description"]; }
        }
        [System.Security.SecurityCritical]
        int IGDataItem.getDescription(out string desc)
        {
            desc = GNativeStringCache.RepString(m_reg.m_structure, Description);
            return 0;
        }

        [System.Security.SecurityCritical]
        int IGDataItem.getDataType(out Grr06DataType typ)
        {
            //    public enum Grr06DataType { String = 0, Number = 1, Datetime = 2 };
            //    public enum Grr06DataTypeEx { String = 0, Number = 1, Datetime = 2, Object = 3, RtfText = 4, RtfCompressed = 5, StringNT = 6, Unknown = 0xff };

            //if (m_col.DataType == typeof(string)) { typ = Grr06DataType.String; return 0; }
            //if (m_col.DataType == typeof(decimal)) { typ = Grr06DataType.Number; return 0; }
            //if (m_col.DataType == typeof(DateTime)) { typ = Grr06DataType.Datetime; return 0; }
            //typeof(System.Int16);
            //typeof(System.Int32);
            //typeof(System.Int64);

            //String = 0, Number = 1, Datetime = 2, Object = 3, RtfText = 4, RtfCompressed = 5, StringNT = 6, Unknown = 0xff };

            var v = m_col.ExtendedProperties["datatype"];
            if (v == null) typ = Grr06DataType.Unknown;
            else typ = DataTypeFromString(v.ToString());

            if (typ == Grr06DataType.Unknown)
            {
                if (m_col.DataType == typeof(string)) typ = Grr06DataType.String;
                else if (m_col.DataType == typeof(decimal)) typ = Grr06DataType.Number;
                else if (m_col.DataType == typeof(DateTime)) typ = Grr06DataType.Datetime;
            }

            return 0;
        }

        private static Grr06DataType DataTypeFromString(string v)
        {
            switch (v.ToString())
            {
                case "string": return Grr06DataType.String;
                case "number": return Grr06DataType.Number;
                case "decimal": return Grr06DataType.Number;
                case "int16": return Grr06DataType.Number;
                case "int32": return Grr06DataType.Number;
                case "int64": return Grr06DataType.Number;
                case "datetime": return Grr06DataType.Datetime;
                case "rtf-formatted": return Grr06DataType.RtfText;
                case "rtf-compressed": return Grr06DataType.RtfCompressed;
                case "string-preserve-spaces": return Grr06DataType.StringNT;
                default:
                    return Grr06DataType.Unknown;
            }
        }

        //------------------------------------------------------------------
        [System.Security.SecurityCritical]
        int IGDataItem.getRegion(out IGRegion region)
        {
            region = m_reg;
            return 0;
        }

        //------------------------------------------------------------------
        int m_order = -1;
        [System.Security.SecurityCritical]
        int IGDataItem.getOrder(out int order)
        {
            order = m_order;
            return 0;
        }
        [System.Security.SecurityCritical]
        int IGDataItem.setOrder(int order)
        {
            m_order = order;
            return 0;
        }
    }

}
