//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultDataManager.cs                    </Name>
//    <Description> Výchozí správce dat                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Text;
using Gordic.General;
using Gordic.Report.Interface;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    //ixs_xme|0000ALX0AOPH|1|1|
    //A|1|2|3|
    //B|a|b|c|
    //B|d|e|f|
    //B|g|h|i|
    //A|4|5|6|
    //B|j|k|l|
    //A|7|8|9|

    /// <summary>
    /// Výchozí správce dat
    /// </summary>
    public class DefaultDataManager : IDisposable
    {
        GMemoryFile fileData;
        protected GMemoryFile fileXme;
        GDataSet dataSet;
        GReportDataAdapter m_data;
        IFiller m_filler;


        private Encoding m_Encoding = null;
        /// <summary>
        /// kódování
        /// </summary>
        public Encoding Encoding
        {
            get { return m_Encoding ?? Encoding.UTF8; }
            set { m_Encoding = value; }
        }

        internal IFiller Filler => m_filler;

        readonly GFEStructure structure;
        /// <summary>
        /// Datová struktura správce
        /// </summary>
        public GFEStructure Structure { get { return structure; } }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="structure">Datová structura</param>
        /// <param name="filler">projekt datového správce</param>
        public DefaultDataManager(GFEStructure structure, IFiller filler)
        {
            m_filler = filler;
            this.structure = structure;
            if (structure != null)
                using (Stream stream = File.OpenRead(structure.FileName))
                    fileXme = new GMemoryFile(stream);
            else
                fileXme = null;
        }

        /// <summary>
        /// Znovu načtení dat
        /// </summary>
        /// <param name="data">Data k načtení</param>
        public void ReloadData(byte[] data)
        {
            if (data == null || data.Length == 0)
                return;

            Clear();

            fileData = new GMemoryFile(data);
            dataSet = new GDataSet();

            if (fileXme != null)
            {
                m_data = new GReportDataAdapter(fileData, fileXme);
                ((IDataAdapter)m_data).FillSchema(dataSet, SchemaType.Source);
                LoadRootExternals();
                m_data.Fill(dataSet);
            }
            dataSet.AcceptChanges();
            m_filler.OnDataLoaded();

            OnDataSetChanged();
        }

        private void LoadRootExternals()
        {
            var d = Path.GetDirectoryName(m_filler.FileName);
            if (d == null) return;
            var c = Path.Combine(d, "config.xml");
            if (File.Exists(c) == false) return;
            var x = new System.Xml.XmlDocument();
            x.Load(c);
            var data = x.DocumentElement["data"];
            if (data == null) return;
            foreach (System.Xml.XmlNode ch in data.ChildNodes)
            {
                dataSet.ExtendedProperties[ch.LocalName] = ch.InnerText;
            }
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Množina aktuálních dat
        /// </summary>
        public GDataSet Data { get { return dataSet; } set { dataSet = value; m_data = null; OnDataSetChanged(); } }

        /// <summary>
        /// Volá se po načtení dat do datasetu
        /// </summary>
        public event EventHandler DataSetChanged;

        /// <summary>změna DS</summary>
        protected void OnDataSetChanged()
        {
            DataSetChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>Data do XML</summary>
        public System.Xml.XmlDocument DataAsXml()
        {
            var ms = new MemoryStream();
            SaveTo(ms, DataType.xml);
            ms.Position = 0;
            var doc = new System.Xml.XmlDocument();
            doc.Load(ms);
            return doc;
        }

        /// <summary>Uložení dat do streamu</summary>
        /// <param name="stream">proud do kterého se obsah uloží</param>
        /// <param name="type">typ dat</param>
        public void SaveTo(Stream stream, DataType type = DataType.xml)
        {
            if (m_data == null)
                m_data = new GReportDataAdapter(null, fileXme);

            m_data.Save(dataSet, stream, Encoding, type);
        }

        /// <summary>
        /// Získání dat
        /// </summary>
        /// <returns>Data </returns>
        public string GetOuterData()
        {
            using (MemoryStream stream = new MemoryStream())
            {
                SaveTo(stream);
                stream.Position = 0;
                using (StreamReader reader = new StreamReader(stream, Encoding))
                    return reader.ReadToEnd();
            }
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Dle dat v datovém souboru se zjistí počet hlavních regionů.
        /// </summary>
        /// <returns>Číslo, vyjádřující počet opakování formuláře.</returns>
        public int GetCollectionsCount()
        {
            if (dataSet != null)
                if (dataSet.Tables.Count > MainTableIndex)
                    return dataSet.Tables[MainTableIndex].Rows.Count != 0 ? dataSet.Tables[MainTableIndex].Rows.Count : 1;

            return 1;
        }

        internal void SetMain(string name)
        {
            if (dataSet != null)
                MainTableIndex = dataSet.Tables.IndexOf(name);
        }

        private int MainTableIndex = 0;
        DataRow m_rootrow;
        public DataRow RootRow { get { return m_rootrow; } }
        /// <summary>ROOT řádek</summary>
        /// <param name="delta">krok</param>
        public DataRegion GetRootData(int delta)
        {
            DataTable t = new DataTable("ROOT");
            //ma tu byt _Id ?!
            t.Columns.Add("PAGE");
            t.Columns.Add("PAGES");
            t.Columns.Add("NOW", typeof(DateTimeOffset));
            t.Columns.Add("DATE");
            t.Columns.Add("TIME");
            t.Columns.Add("VERSION", typeof(decimal));
            t.Columns.Add("FILLVER", typeof(decimal));
            //foreach (var k in dataSet.ExtendedProperties.Keys)
            //{
            //    if (t.Columns.Contains(k.ToString()) == false)
            //        t.Columns.Add(k.ToString());
            //}

            //NOW predplnim pri zacatku, aby se behem sestavy nemenil
            DateTimeOffset now;
            if (dataSet.ExtendedProperties.ContainsKey("NOW"))
            {
                var s = dataSet.ExtendedProperties["NOW"].ToString();
                now = GDataReaderUnload.ConvertDateTime(s);
            }
            else
                now = DateTimeOffset.Now;

            m_rootrow = t.Rows.Add(0M, 0M /*pri GetDataValue se neberou*/, now, now.LocalDateTime.ToShortDateString(), now.LocalDateTime.ToLongTimeString());
            var d1 = new DataRegion(this, m_rootrow);
            //dataSet.Tables.Add(t);
            //t.ChildRelations.Add(

            if (dataSet.Tables.Count > 0)
            {
                var r = dataSet.Tables[MainTableIndex].Rows[delta];
                var d2 = new DataRegion(ParentRegion(r, d1), r);
                return d2;
            }
            else return null;
        }
        private DataRegion ParentRegion(DataRow r, DataRegion root)
        {
            if (r.Table.ParentRelations.Count == 0) return root;
            var p = r.GetParentRow(r.Table.ParentRelations[0]);
            return new DataRegion(ParentRegion(p, root), p);
        }

        //internal DataRow GetDataRow(DataRow parentRow, string fullName, AttributeList Attributes)
        //{
        //    string rowString = Attributes.Exists(itm => itm.Key.Equals("row")) ? Attributes.Find(itm => itm.Key.Equals("row")).Value : null;
        //    int rowIndex;
        //    if (rowString == null || Int32.TryParse(rowString, out rowIndex) == false) rowIndex = 1;
        //    return GetDataRow(parentRow, fullName, rowIndex);
        //}

        //internal DataRow GetDataRow(DataRow parentRow, string fullName, int rowIndex)
        //{
        //    var names = fullName.Split('.');
        //    if (names.Length == 1)
        //    {
        //        System.Diagnostics.Debug.Assert(parentRow.Table.TableName == names[0]);
        //        return parentRow;
        //    }
        //    var tblName = names[names.Length - 1];
        //    if (parentRow.Table.TableName == tblName)
        //        return parentRow;

        //    foreach (DataRelation rel in parentRow.Table.ChildRelations)
        //    {
        //        if (rel.ChildTable.TableName == tblName)
        //        {
        //            var rows = parentRow.GetChildRows(rel);
        //            if (rows.Length >= rowIndex)
        //                return rows[rowIndex - 1];
        //        add_more:
        //            DataRow r = rel.ChildTable.Rows.Add();
        //            var l = rel.ParentColumns.Length;
        //            for (int i = 0; i < l; i++)
        //                r[rel.ChildColumns[i]] = parentRow[rel.ParentColumns[i]];
        //            if (rows.Length < --rowIndex) goto add_more;
        //            return r;
        //        }
        //    }
        //    return null;
        //}

        /// <summary>
        /// Získání řádku regionu
        /// </summary>
        /// <param name="fullName">úplný název regionu</param>
        /// <param name="delta">číslo datové kolekce</param>
        /// <param name="rowIndex">index řádku (0 based!)</param>
        /// <returns>Datový řádek s datama regionus</returns>
        public DataRow GetDataRow(string fullName, int delta, int rowIndex)
        {
            //obdoba kodu:
            //var row = dm.Data.Tables[t].Rows[i];

            if (delta < 0)
                throw new Exception(GResources.GetResourceText(29450720));

            if (string.IsNullOrEmpty(fullName))
                return null;

            var names = fullName.Split('.');
            var index = names.Length - 1;
            var name = names[index];
            if (name == "ROOT") return RootRow; //nema delta?!

            var table = dataSet.Tables[name];
            if (table != null)
            {
                int indexRow = 0;
                // hledáme až rowIndex-kátý element
                foreach (DataRow item in table.Rows)
                    if (IsRootRowIdEqualDelta(item, delta))
                        if (indexRow == rowIndex)
                            return item;
                        else indexRow++;
            }
            return null;
        }
        bool IsRootRowIdEqualDelta(DataRow row, int delta)
        {
            if (row.Table.ParentRelations.Count == 0) return row["_Id"].Equals(delta);
            var p = row.GetParentRow(row.Table.ParentRelations[0]);
            return p != null && IsRootRowIdEqualDelta(p, delta);
        }

        ///// <summary>
        ///// Získání řádku regionu
        ///// </summary>
        ///// <param name="parentRow"></param>
        ///// <param name="region">Region</param>
        ///// <param name="rowIndex">číslo řádku z atributu "row"</param>
        ///// <returns>Datový řádek s datama regionus</returns>
        ///// <returns></returns>
        //public DataRow GetDataRow(DataRow parentRow, GFERegion region, int rowIndex)
        //{
        //    return GetDataRow(parentRow, /*GetFullName(region)*/region.Name, rowIndex);
        //}

        /// <summary>
        /// Čtení aktuální hodnoty
        /// </summary>
        public object GetDataRowValue(DataRow dataRow, string dataName, IPage page = null)
        {
            if (string.IsNullOrEmpty(dataName)) return string.Empty;

            int i = dataName.LastIndexOf('.');
            if (i >= 0)
            {
                System.Diagnostics.Debug.Assert(dataRow.Table.TableName == dataName.Substring(0, i));
                dataName = dataName.Substring(i + 1);
            }

            return GetDataRowValueDef(dataRow, dataName, page, "");
        }
        internal static object DsValue2ExtValue(Type t, object value)
        {
            if (value == DBNull.Value)
            {
                if (t == typeof(decimal)) return 0M;
                return string.Empty;
            }
            return value;
        }
        internal static object DsValue2ExtValue(ControlType t, object value = null)
        {
            if (value == null || value == DBNull.Value)
            {
                if (t == ControlType.NumberType) return 0M;
                return string.Empty;
            }
            return value;
        }

        internal static object ExtValue2DsValue(Type t, object value)
        {
            if (value == null || value == DBNull.Value)
            {
                if (t == typeof(string)) return string.Empty;
                return DBNull.Value;
            }
            if (value is string)
            {
                if (t == typeof(decimal))
                {
                    if (string.IsNullOrEmpty((string)value)) return DBNull.Value;
                }
                else if (t == typeof(DateTime) || t == typeof(DateTimeOffset))
                {
                    if (string.IsNullOrEmpty((string)value)) return DBNull.Value;
                }
            }
            if (t == typeof(decimal))
            {
                if (value is string && Decimal.TryParse((string)value, System.Globalization.NumberStyles.Number, System.Globalization.CultureInfo.InvariantCulture, out var dec)) return dec;
                return Convert.ToDecimal(value);
            }
            if (t == typeof(DateTime))
            {
                switch (value)
                {
                    case DateTime dt: return dt; // return dt.Kind == DateTimeKind.Utc ? dt.ToLocalTime() : dt;
                    case DateTimeOffset dt: return dt.DateTime; //return dt.LocalDateTime;
                    default: return Convert.ToDateTime(value);
                }
            }
            if (t == typeof(DateTimeOffset))
            {
                switch (value)
                {
                    case DateTime dt: return new DateTimeOffset(dt);
                    case DateTimeOffset dt: return dt;
                    case string s: return DateTimeOffset.Parse(s);
                    default: throw new GException(); //TODO
                }
            }
            return value;
        }

        /// <summary>
        /// Čtení aktuální hodnoty
        /// </summary>
        public object GetDataRowValueDef(DataRow dataRow, string dataName, IPage page, object def)
        {
            return GetDataRowValueDef(dataRow, dataName, page, def, out _);
        }

        /// <summary>
        /// Čtení aktuální hodnoty
        /// </summary>
        public object GetDataRowValueDef(DataRow dataRow, string dataName, IPage page, object def, out Type typ)
        {
            if (dataRow == RootRow)
            {
                switch (dataName)
                {
                    case "PAGE": if (page != null) { typ = typeof(string); return page.Order.ToString(); } break;
                    case "PAGES": if (page != null) { typ = typeof(string); return page.PagePanel.Pages.Count.ToString(); } break;
                    case "NOW": typ = typeof(DateTime); return dataRow["NOW"];
                    case "VERSION": typ = typeof(decimal); return (decimal)GUnsafeRepWrapper.grr06_Version();
                    case "FILLVER":
                        var versionInfo = typeof(DefaultDataManager).Assembly.GetName().Version;
                        typ = typeof(decimal);
                        return ((((decimal)versionInfo.Major * 1000) + versionInfo.Minor) * 1000 + versionInfo.Build) * 1000 + versionInfo.Revision;
                }
                var val = dataSet.ExtendedProperties[dataName];
                if (val != null) { typ = val?.GetType(); return val; }
            }
            var dataCol = dataRow.Table.Columns[dataName];
            if (dataCol == null) { typ = null; return def; }
            typ = dataCol.DataType;
            var v = dataRow[dataCol];
            //return convertNull ? DsValue2ExtValue(dataCol.DataType, v) : v;
            return v;
        }
        /// <summary>
        /// Nastavení aktuální hodnoty
        /// </summary>
        public bool SetDataRowValue(DataRow dataRow, string dataName, object content, IDefaultDataItem refreshExcept = null, bool runOnChange = false, bool runRefresh = true)
        {
            if (string.IsNullOrEmpty(dataName)) return false;

            int i = dataName.LastIndexOf('.');
            if (i >= 0)
            {
                System.Diagnostics.Debug.Assert(dataRow.Table.TableName == dataName.Substring(0, i));
                dataName = dataName.Substring(i + 1);
            }

            return SetDataRowValue1(dataRow, dataName, content, refreshExcept, runOnChange, runRefresh);
        }
        /// <summary>
        /// Nastavení aktuální hodnoty
        /// </summary>
        internal bool SetDataRowValue1(DataRow dataRow, string dataName, object content, IDefaultDataItem refreshExcept = null, bool runOnChange = false, bool runRefresh = true)
        {
            if (dataRow == RootRow)
            {
                if (dataSet.ExtendedProperties[dataName].Equals(content) == false)
                {
                    dataSet.ExtendedProperties[dataName] = content;
                    if (runRefresh) RefreshRegisteredData(dataRow, dataName, refreshExcept, runOnChange);
                    return true;
                }
                return false;
            }

            var c = dataRow.Table.Columns[dataName];
            if (c == null) return false; //neni sloupec? nemenim

            var oldValue = dataRow[c];
            if ((content == null && oldValue == DBNull.Value) || oldValue.Equals(content)) return false; //hodnota je stejna? nemenim
            var v = ExtValue2DsValue(c.DataType, content);
            if (oldValue.Equals(v)) return false;       //hodnota po konverzi je stejna? nemenim

            dataRow[c] = v;
            if (runRefresh) RefreshRegisteredData(dataRow, dataName, refreshExcept, runOnChange);
            return true;
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Vytvoření analyzátoru obsahu
        /// </summary>
        /// <param name="dataRow"></param>
        /// <param name="region"></param>
        /// <returns></returns>
        public DataManagerNativeParser CreateParser(DataRow dataRow, GFEFormatRegion region)
        {
            return new DataManagerNativeParser(this, dataRow, region.StructureItem as GFERegion);
        }

        /// <summary>
        /// se použije pro opětovné získání již jednou hledaného názvu
        /// </summary>
        Dictionary<string, string> cachFullNames = new Dictionary<string, string>();
        /// <summary>
        /// Získání úplného názvu regionu
        /// </summary>
        /// <param name="re">Informace o formátu regionu</param>
        /// <returns>Úplný název regionu od větve ROOT</returns>
        string GetFullName(GFERegion re)
        {
            if (cachFullNames.ContainsKey(re.Name))
                return cachFullNames[re.Name];

            // zafixujeme nadřazený region
            GFERegion region = re.Parent;
            // prozatimní název regionu je...
            string result = re.Name;
            // pokud nadřazeným regionem není hlavní region a jeho název není NULL
            while (region != null
                && (!string.Equals(region.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase)))
            {
                result = string.Format("{0}.{1}", region.Name, result);
                region = region.Parent;
            }
            cachFullNames.Add(re.Name, result);
            return result;
        }

        bool isRefreshing;

        HashSet<IDefaultDataItem> registeredItems = new HashSet<IDefaultDataItem>();

        /// <summary>
        /// Registrace vytvořených položek prohlížeče
        /// </summary>
        /// <param name="fillerDataItem">Registrovaná položka</param>
        public void RegisterDataItem(IDefaultDataItem fillerDataItem)
        {
            //nutne pro List, ale Hashset by si mel zajistit sam// if (!registeredItems.Contains(fillerDataItem))
            registeredItems.Add(fillerDataItem);
            if(fillerDataItem.Owner is DefaultAbstractContent ac)
                ac.Disposed += Ac_Disposed;
        }

        private void Ac_Disposed(object sender, EventArgs e)
        {
            var ac = (DefaultAbstractContent)sender;
            if (ac is IDefaultDataItemHandler h)
                registeredItems.Remove(h.DataItem);
        }

        ///// <summary>
        ///// Aktualizace regisrovaných komponent dle řádku uvedené
        ///// </summary>
        ///// <param name="tagComponent">Daná komponenta</param>
        //public void RefreshRegisteredData(ITagComponent tagComponent)
        //{
        //    if (isRefreshing)
        //        return;

        //    isRefreshing = true;

        //    DefaultDataItem dataItem = registeredItems.FirstOrDefault(itm => itm.Owner.Equals(tagComponent));
        //    if (dataItem != null)
        //    {
        //        //List<DefaultDataItem> items = registeredItems.FindAll(itm => itm.DataRow != null && itm.DataRow.Equals(dataItem.DataRow));
        //        //foreach (var subItem in items)
        //        //    subItem.MakeDirty();
        //        foreach (var subItem in registeredItems.Where(itm => itm.DataRow != null && itm.DataRow.Equals(dataItem.DataRow) && itm.DataName == dataItem.DataName))
        //        {
        //            if (subItem.Owner == tagComponent) continue; //toho co zavinil zmenu necham byt
        //            subItem.MakeDirty();
        //        }
        //    }

        //    isRefreshing = false;
        //}
        /// <summary>
        /// Aktualizace regisrovaných komponent dle řádku uvedené
        /// </summary>
        public void RefreshRegisteredData(DataRow dataRow, string dataName, IDefaultDataItem refreshExcept = null, bool runOnChange = false)
        {
            if (isRefreshing)
                return;

            List<IDefaultDataItem> l_refresh = null;
            isRefreshing = true;
            try
            {
                foreach (var subItem in registeredItems)
                {
                    if (subItem == refreshExcept) continue; //toho co zavinil zmenu necham byt

                    AggregationInfo info = NamedService.IsAggregate(subItem.DataName);
                    if (info.Aggregate)
                    {
                        if (dataRow.Table != subItem.DataRow.Table) continue;
                        if (HasReferenceTo(subItem, info, dataRow, dataName))
                        {
                            var g = FindGrid(subItem.Owner);
                            g?.ReloadDelayed();
                            subItem.MakeDirty();
                        }
                    }
                    else
                    {
                        if (dataRow == subItem.DataRow)
                        {
                            if (HasReferenceTo(subItem, info, dataRow, dataName))
                            {
                                subItem.MakeDirty();
                                if (runOnChange && HasReferenceTo(subItem, info, dataRow, dataName, compareScripts: false))
                                    (l_refresh ?? (l_refresh = new List<IDefaultDataItem>())).Add(subItem);
                            }
                        }
                        else
                        {
                            //hledani zda nedoslo ke zmene parenta
                            var p = subItem.DataRow;
                            while (p != null)
                            {
                                if (p.Table.ParentRelations.Count == 0) break;
                                p = p.GetParentRow(p.Table.ParentRelations[0]);
                                if (dataRow == p) //opravdu to je parent, co se zmenilo!
                                {
                                    if (HasReferenceTo(subItem, info, dataRow, dataName, compareShort: false)) //udaj z parenta = musi byt uveden se jmenem oblasti
                                    {
                                        subItem.MakeDirty();
                                        if (runOnChange && HasReferenceTo(subItem, info, dataRow, dataName, compareShort: false, compareScripts: false))
                                            (l_refresh ?? (l_refresh = new List<IDefaultDataItem>())).Add(subItem);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                if (dataName == "*") //musím najít grid - přidání prvního řádku, insert, delete, ...
                {
                    if (FormatScript is IFillerContent fc)
                    {
                        foreach (var g in GridsOnAllPages(fc))
                            if (g.HasRegion(dataRow.Table.TableName))
                                g.ReloadDelayed();
                        (fc as DefaultViewContent)?.MakeDirty();
                    }
                }
            }
            finally
            {
                isRefreshing = false;
            }
            if (l_refresh != null)
                foreach (var subItem in l_refresh)
                {
                    subItem.RunOnChangeAndValidate();
                }
        }

        private IEnumerable<ITagComponent> ContentsOnAllPages(IFillerContent fc)
        {
            foreach (AbstractPage p in fc.Pages)
                foreach (ITagComponent c in p.All)
                    yield return c;
        }
        private IEnumerable<DefaultContentGrid> GridsOnAllPages(IFillerContent fc)
        {
            foreach (AbstractPage p in fc.Pages)
                foreach (DefaultContentGrid c in p.AllGrids)
                    yield return c;
        }


        private static bool HasReferenceTo(IDefaultDataItem subItem, AggregationInfo info, DataRow dataRow, string dataName, bool compareShort = true, bool compareLong = true, bool compareScripts = true)
        {
            if (compareShort && string.Equals(info.DataName, dataName, StringComparison.InvariantCultureIgnoreCase)) return true;
            var longName = dataRow.Table.TableName + "." + dataName;
            if (compareLong && string.Equals(info.DataName, longName, StringComparison.InvariantCultureIgnoreCase)) return true;
            if (compareScripts)
            {
                longName = longName.Replace('-', '_');
                if (subItem.OnData != null && subItem.OnData.ScriptText.IndexOf(longName, StringComparison.InvariantCultureIgnoreCase) >= 0) return true;
                if (subItem.OnValidate != null && subItem.OnValidate.ScriptText.IndexOf(longName, StringComparison.InvariantCultureIgnoreCase) >= 0) return true;
            }

            return false;
        }

        private DefaultContentGrid FindGrid(object c)
        {
            while (true)
            {
                if (c is DefaultContentGrid g) return g;
                if (c is IContainerComponent cc)
                    c = cc.Parent;
                else
                {
                    if (c is DefaultAbstractContent a)
                        c = a.Parent;
                    else
                        return null;
                }
            }
        }

        private IScriptable m_FormatScript;
        ///<summary>objekt pro skriptování globálního objektu "format"</summary>
        public IScriptable FormatScript
        {
            get { return m_FormatScript; }
            set { m_FormatScript = value; if (m_ScriptManager != null) m_ScriptManager.FormatScript = value; }
        }

        internal void AttachFormat(GFEFormat gfeFormat)
        {
            //tohle by mohlo nastat pri zobrazeni druheho formatu. Nutno otestovat!
            //nastane take pri vymene dat (ReloadData) stejneho formatu. v tom pripade scriptmanager nechat.
            if (m_ScriptManager == null)
            {
                var eng = Gordic.Report.Implementation.GScriptEngine.FromFormat(gfeFormat.Native);
                m_ScriptManager = new ScriptManager(m_filler, eng)
                {
                    FormatScript = FormatScript
                };
            }
            var frag = m_filler.StartFragment;
            var sb = new StringBuilder();
            if (string.IsNullOrEmpty(frag) == false)
            {
                try
                {
                    foreach (var f in frag.Split(';'))
                    {
                        var e = f.Split('=');
                        if (e.Length != 2) continue;
                        var k = e[0];
                        var v = e[1];
                        if (Decimal.TryParse(v, out decimal dec))
                            sb.AppendFormat("{0}={1};", k, dec);
                        else
                        {
                            v = v.Replace("'", @"\'");
                            sb.AppendFormat("{0}='{1}';", k, v);
                        }
                    }
                    using (var s = m_ScriptManager.PrepareScript(null, "fragment", sb.ToString(), null))
                    {
                        s.Run();
                    }
                }
                catch (Exception x)
                {
                    throw new GException(21000027, 21000027, x); //RC-EX 21000027 : Chyba při zpracování startovacího fragmentu
                }
            }

        }

        ScriptManager m_ScriptManager;
        /// <summary>
        /// správce skriptů
        /// </summary>
        public ScriptManager ScriptManager
        {
            get { return m_ScriptManager; }
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Clear()
        {
            if (registeredItems.Count > 0)
            {
                //var l_items = new DefaultDataItem[registeredItems.Count];
                //registeredItems.CopyTo(l_items);
                foreach (DefaultDataItem fillerDataItem in registeredItems)
                {
                    if (fillerDataItem.Owner is DefaultAbstractContent ac)
                        ac.Disposed -= Ac_Disposed;
                    //di.Dispose();
                }
                registeredItems.Clear();
            }
            if (dataSet != null)
            {
                dataSet.Dispose();
                dataSet = null;
            }
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                m_filler = null;
                Clear();
            }
            if (m_ScriptManager != null)
            {
                m_ScriptManager.Dispose();
                m_ScriptManager = null;
            }
        }
        ~DefaultDataManager() { Dispose(false); }

        #region přístup k datům. Nepoužívá se přímo, určeno pro EXT aplikace aby mohli ovlivnit data formuláře z venku
        private System.Data.DataRow GetRow(string[] dn)
        {
            int i;
            System.Data.DataRow row = null;
            string tn;
            if (dn.Length == 1) { tn = Data.Tables[0].TableName; i = 0; }
            else { tn = dn[0]; i = 1; }
            next:
            int rowIndex = 0;
            System.Data.DataTable dt;
            rowIndex = GetRowIndex(ref tn);
            dt = Data.Tables[tn];
            if (dt == null) return null;

            if (row == null)
            {
                if (dt.Rows.Count <= rowIndex) return null;
                row = dt.Rows[rowIndex];
            }
            else
            {
                var rows = row.GetChildRows(dt.ParentRelations[0]);
                if (rows.Length <= rowIndex) return null;
                row = rows[rowIndex];
            }

            if (i < dn.Length - 1)
            {
                tn = dn[i++];
                goto next;
            }
            return row;
        }

        /// <summary>
        /// Zjištění hodnoty pole
        /// </summary>
        public object GetData(string dataName)
        {
            var dn = dataName.Split('.');
            if (dn.Length == 0) return null;
            var row = GetRow(dn);
            if (row == null) return null;
            return row[dn[dn.Length - 1]];
        }
        /// <summary>
        /// Nastavení hodnoty pole
        /// </summary>
        public bool SetData(string dataName, object value)
        {
            var dn = dataName.Split('.');
            if (dn.Length == 0) return false;
            var row = GetRow(dn);
            if (row == null) return false;

            return SetDataRowValue(row, dn[dn.Length - 1], value);
        }

        private int GetRowIndex(ref string tn)
        {
            int p = tn.IndexOf('[');
            if (p < 0) return 0;
            var s = tn.Substring(p + 1);
            tn = tn.Substring(0, p);
            p = s.IndexOf(']');
            if (p >= 0) s = s.Substring(0, p);
            return Int32.Parse(s);
        }
        #endregion

    }
}
