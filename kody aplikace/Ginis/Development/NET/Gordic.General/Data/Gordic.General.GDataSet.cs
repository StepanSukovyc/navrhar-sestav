//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDataSet.cs                                  </Name>
//    <Description> Gordický netypový dataset                                   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2005-03-10                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Xml;
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace Gordic.General {

    /// <summary>Gordický netypový dataset</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    [Serializable]
    public class GDataSet : DataSet	{
 
        /// <summary>
        /// Initializes a new instance of the DataSet class.
        /// </summary>
        public GDataSet()
        {
        }

        /// <exclude/>
        protected GDataSet(SerializationInfo info, StreamingContext context)
            : base(info,context)
        {
            UpdateFromNamespace(throwOnError: false);
        }

        /// <exclude/>
        protected GDataSet (SerializationInfo info, StreamingContext context,bool ConstructSchema)
            : base(info,context,ConstructSchema)
        {
            UpdateFromNamespace(throwOnError: false);
        }

        /// <summary>
        /// Hledá odpovídající GTyp pro typ uložený v Datasetu
        /// Pokud neumí pøevést na G typ, potom vrátí pùvodní datový typ zadaný na vstupu této funkce
        /// </summary>
        public static Type FindCorrespondingGType(Type t)
        {
            //if(t.Namespace=="Gordic.General") return t;
            if (t == typeof(string)) return typeof(Gordic.General.GString);
            if (t == typeof(Double)) return typeof(Gordic.General.GDecimal);
            if (t == typeof(Decimal)) return typeof(Gordic.General.GDecimal);   // 2024-06-04
            if (t == typeof(DateTime)) return typeof(Gordic.General.GDateTime);
            if (t == typeof(byte)) return typeof(Gordic.General.GInt16);    // 2025-10-20 - pro ètení z MS SQL dataového typu TINYINT - není to úplnì pøesné, ale lepší než nic
            if (t == typeof(Int16)) return typeof(Gordic.General.GInt16);
            if (t == typeof(Int32)) return typeof(Gordic.General.GInt32);
            if (t == typeof(Int64)) return typeof(Gordic.General.GInt64);
            if (t == typeof(Boolean)) return typeof(Gordic.General.GBoolean);
            return t;
        }

        /// <summary>
        /// Vrací hodnotu daného sloupce ve tvaru GTypu
        /// Pokud neumí pøevést na správný G typ, potom nevyhazuje chybu ale vrací NULL !!!
        /// </summary>
        public static IGDbType GetDbValue(System.Data.DataColumn column, object value, bool trimValues = true)
        {
            Type gt = FindCorrespondingGType(column.DataType);
            if (gt == typeof(Gordic.General.GString))
            {
                if(trimValues)
                    return GString.Parse(value, (ushort)column.MaxLength, true).Trimmed;
                else
                    return GString.Parse(value, (ushort)column.MaxLength, true);
            }
            if (gt == typeof(Gordic.General.GDecimal))
                return GDecimal.Parse(value);
            if (gt == typeof(Gordic.General.GDateTime))
                return GDateTime.Parse(value);
            if (gt == typeof(Gordic.General.GInt16))
                return GInt16.Parse(value);
            if (gt == typeof(Gordic.General.GInt32))
                return GInt32.Parse(value);
            if (gt == typeof(Gordic.General.GInt64))
                return GInt64.Parse(value);
            if (gt == typeof(Gordic.General.GBoolean))
                return GBoolean.Parse(value);
            return null;
        }

		#region Info support
        private Dictionary<string, string> m_infos = new Dictionary<string, string>();

		/// <summary>
		/// Nastaví informaèní pole
		/// </summary>
		/// <param name="name">Pole</param>
		/// <param name="value">Hodnota</param>
        protected void SetInfo(string name, string value)
        {
            m_infos.Add(name, value);
            switch (name.ToLowerInvariant())
            {
                case "ixs_xme": m_ixsxme = value; break;
                case "xmeta_ver": m_xmeta_ver = Int32.Parse(value); break;
                case "xmeta_subver": m_xmeta_subver = Int32.Parse(value); break;
                case "dataset": DataSetName = NormalizeDatasetName(value); break;
            }
        }

		/// <summary>
		/// vrátí hodnotu informaèního pole dle parametru. Není-li pole k dispozici, vrací null
		/// </summary>
		/// <param name="name">dotazované pole</param>
		/// <returns>hodnota nebo null neni-li pole k dispozici</returns>
        public string GetInfo(string name)
        {
            string value;
            if (m_infos.TryGetValue(name, out value))
                return value;
            return null;
        }

        /// <summary>Seznam všech info sekcí</summary>
        public IDictionary<string, string> Infos
        {
            get { return m_infos; }
        }

		#endregion
		#region XMETA support
		/// <summary>
		/// identifikace struktury
		/// </summary>
		protected string m_ixsxme = "";
		/// <summary>
		/// verze struktury
		/// </summary>
		protected int m_xmeta_ver = 1;
		/// <summary>
		/// subverze struktury
		/// </summary>
		protected int m_xmeta_subver = 1;

		/// <summary>
		/// identifikace struktury
		/// </summary>
		public string XMETA_ixs
		{
			get { return m_ixsxme;}
		}

		/// <summary>
		/// verze struktury
		/// </summary>
		public int XMETA_ver
		{
			get { return m_xmeta_ver;}
		}

		/// <summary>
		/// subverze struktury
		/// </summary>
		public int XMETA_subver
		{
			get { return m_xmeta_subver;}
		}

		/// <summary>
		/// Zmìní XML namespace datasetu dle polí XMETA
		/// </summary>
		protected void UpdateNamespace()
		{
			Namespace = GetInfo("Namespace") ?? "http://www.gordic.cz/TR/data/" + m_ixsxme + "/" + m_xmeta_ver.ToString() + "." + m_xmeta_subver.ToString();
		}

		/// <summary>
		/// Zmìní pole XMETA dle nastavení XML namespace datasetu
		/// </summary>
		public bool UpdateFromNamespace(bool throwOnError = true)
		{
			System.Text.RegularExpressions.Regex r = new System.Text.RegularExpressions.Regex(@"^http://www.gordic.cz/TR/data/(?<ixsxme>.*)/(?<ver>\d*)\.(?<subver>\d*)$");
			System.Text.RegularExpressions.Match m = r.Match(Namespace);
			if(!m.Success)
			{
				r = new System.Text.RegularExpressions.Regex(@"^http://www.gordic.cz/(?<ixsxme>.*)/v_(?<ver>\d*)\.(?<subver>\d*)\.0\.0$");
				m = r.Match(Namespace);
				if(!m.Success)
				{
                    if (throwOnError)
                        throw new GDatasetException(23200282); //RC-EX 23200282 : namespace neodpovídá požadavkùm Gordic datasetù
                    else
                        return false;
				}
			}
			m_ixsxme = m.Groups["ixsxme"].Value;
			m_xmeta_ver = Int32.Parse(m.Groups["ver"].Value);
			m_xmeta_subver = Int32.Parse(m.Groups["subver"].Value);
            return true;
        }

		#endregion
		#region schema support

		/// <summary>
		/// Naète schéma do DataSetu. Pøijímá XSD i XME soubory.
		/// </summary>
		/// <param name="stream">The Stream from which to read.</param>
		public new void ReadXmlSchema(System.IO.Stream stream)
		{
			if (stream != null)
			{
				ReadXmlSchema(new XmlTextReader(stream));
			}
		}

		/// <summary>
		/// Naète schéma do DataSetu. Pøijímá XSD i XME soubory.
		/// </summary>
		/// <param name="reader"></param>
		public new void ReadXmlSchema(System.IO.TextReader reader)
		{
			if (reader != null)
			{
				ReadXmlSchema(new XmlTextReader(reader));
			}
		}

        private string m_SchemaLoadedFrom = null;
		/// <summary>
		/// Naète schéma do DataSetu. Pøijímá XSD i XME soubory.
		/// </summary>
		/// <param name="fileName"></param>
		public new void ReadXmlSchema(string fileName)
		{
            m_SchemaLoadedFrom = fileName;
			XmlTextReader reader1 = new XmlTextReader(fileName);
			try
			{
				ReadXmlSchema(reader1);
			}
			finally
			{
				reader1.Close();
			}
		}

		/// <summary>
		/// Naète schéma do DataSetu. Pøijímá XSD i XME soubory.
		/// </summary>
		public new void ReadXmlSchema(XmlReader reader)
		{
			if (reader == null) return;
			if (reader is XmlTextReader)
			{
				((XmlTextReader) reader).WhitespaceHandling = WhitespaceHandling.None;
			}
			reader.MoveToContent();

			//XME test
			if (reader.NodeType == XmlNodeType.Element &&
				(reader.LocalName == "structure") &&
				(reader.NamespaceURI.StartsWith("http://www.gordic.cz/TR/xme")))
			{
				ReadXMESchema(reader);
			}
			else
			{
				base.ReadXmlSchema(reader);
				UpdateFromNamespace();
			}
		}

		private Type GetXMEType(string type)
		{
			switch(type)
			{
				case "number" :
				case "decimal" :
					return typeof(System.Decimal);
				case "datetime" :
                    return typeof(System.DateTimeOffset);
                case "date" :
                    return typeof(System.DateTime);
                case "int16" :
					return typeof(System.Int16);
				case "int32" :
					return typeof(System.Int32);
				case "int64" :
					return typeof(System.Int64);
				default:
					return typeof(string);
			}
		}

		private void ReadXMETable(XmlReader reader, DataTable parent)
		{
            var name = reader.GetAttribute("name");
            var l_PrimaryKey = reader.GetAttribute("keys");
            DataTable l_table = Tables.Add(name);

            bool next = reader.MoveToFirstAttribute();
            while (next)
            {
                l_table.ExtendedProperties[reader.Name] = reader.Value;
                next = reader.MoveToNextAttribute();
            }

            reader.ReadStartElement("region");

            if (parent != null)
            {
                //pøidám relaci na parenta
                DataColumn[] l_parentID = parent.PrimaryKey;
                int cnt = l_parentID.Length;
                DataColumn[] l_Pid = new DataColumn[cnt];

                if (cnt == 1)
                {
                    l_Pid[0] = l_table.Columns.Add("_Pid", l_parentID[0].DataType);
                    l_Pid[0].ColumnMapping = MappingType.Hidden;
                }
                else
                    for (int i = 0; i < cnt; i++)
                    {
                        l_Pid[i] = l_table.Columns.Add("_Pid" + i.ToString(), l_parentID[i].DataType);
                        l_Pid[i].ColumnMapping = MappingType.Hidden;
                    }

                DataRelation l_dr = new System.Data.DataRelation(name, l_parentID, l_Pid) { Nested = true };
                Relations.Add(l_dr);
            }

            if (string.IsNullOrEmpty(l_PrimaryKey))
            {
                DataColumn l_Id = l_table.Columns.Add("_Id", typeof(Int32));
                l_Id.AutoIncrement = true;
                l_Id.ColumnMapping = MappingType.Hidden;
                l_table.PrimaryKey = new DataColumn[] { l_Id };
            }

            while (reader.NodeType != XmlNodeType.EndElement)
            {
                if (reader.NodeType != XmlNodeType.Element)
                {
                    reader.Skip();
                    continue;
                }
                switch (reader.LocalName)
                {
                    case "region":
                        l_PrimaryKey = AddPrimaryKey(l_PrimaryKey, l_table);
                        ReadXMETable(reader, l_table);
                        break;
                    case "item":
                        var l_name = reader.GetAttribute("name");
                        var l_type = reader.GetAttribute("datatype");
                        var l_title = reader.GetAttribute("title");
                        Type t = GetXMEType(l_type);
                        DataColumn col = l_table.Columns.Add(l_name, t);
                        if (l_title != null)
                            col.Caption = l_title;
                        //if (t == typeof(System.DateTime))
                        //    col.DateTimeMode = DataSetDateTime.Utc;

                        string l_defValue = reader.GetAttribute("default-value");
                        if(l_defValue!=null)
                            col.DefaultValue = l_defValue;
                        
                        next = reader.MoveToFirstAttribute();
                        while(next)
                        {
                            col.ExtendedProperties[reader.Name] = reader.Value;
                            next = reader.MoveToNextAttribute();
                        }

                        reader.Skip();
                        break;
                    default:
                        reader.Skip();
                        //    throw new GDatasetException(23200280, 23200280); //RC-EX 23200280 : schema neodpovídá specifikaci XME
                        break;
                }

            }

			reader.ReadEndElement();
            AddPrimaryKey(l_PrimaryKey, l_table);
		}

        private static string AddPrimaryKey(string primaryKey, DataTable table)
        {
            if (string.IsNullOrEmpty(primaryKey) == false)
            {
                var l_keys = primaryKey.Split(',');
                var l_cols = new DataColumn[l_keys.Length];
                int i = 0;
                foreach (string key in l_keys)
                {
                    if (table.Columns.Contains(key) == false)
                        throw new GDatasetException(21000012, 21090019, key); //RC-EX 21090019 : schema neobsahuje klíèový sloupec {0}
                    l_cols[i++] = table.Columns[key];
                }
                table.PrimaryKey = l_cols;
                primaryKey = null;
            }
            return primaryKey;
        }

        private string NormalizeDatasetName(string n)
        {
            var s = new System.Text.StringBuilder(n.Length);
            bool up = true;
            foreach (char c in n)
            {
                if (c == '_') { up = true; continue; }
                if (Char.IsLetterOrDigit(c))
                {
                    if (up) { s.Append(Char.ToUpper(c)); up = false; }
                    else s.Append(c);
                }
            }

            return s.ToString();
        }

		/// <summary>
		/// Naète schéma z XME souboru
		/// </summary>
		/// <param name="reader"></param>
        protected void ReadXMESchema(XmlReader reader)
        {
            if (!reader.NamespaceURI.StartsWith("http://www.gordic.cz/TR/xme"))
            {
                throw new GArgumentException(21000038);
            }
            if (m_SchemaLoadedFrom != null)
                DataSetName = NormalizeDatasetName(System.IO.Path.GetFileNameWithoutExtension(m_SchemaLoadedFrom)) + "DataSet";

            //<structure>
            reader.ReadStartElement("structure");//,"http://www.gordic.cz/TR/xme");

            DataTable l_roottable = null;
            //Tables.Add("root");
            //DataColumn l_Id = l_roottable.Columns.Add("_Id", typeof(Int32));
            //l_Id.AutoIncrement = true;

            while (reader.NodeType != XmlNodeType.EndElement)
            {
                if (reader.NodeType != XmlNodeType.Element)
                {
                    reader.Skip();
                    continue;
                }
                switch (reader.LocalName)
                {
                    case "region":
                        ReadXMETable(reader, l_roottable);
                        break;
                    case "info":
                        bool hasattr = reader.MoveToFirstAttribute();
                        while (hasattr)
                        {
                            string l_attrname = reader.LocalName;
                            string l_attrval = reader.Value;
                            SetInfo(l_attrname, l_attrval);
                            hasattr = reader.MoveToNextAttribute();
                        }
                        reader.Skip();
                        break;
                    case "item": //root item
                        var name = reader.GetAttribute("name");
                        ExtendedProperties[name] = null;
                        reader.Skip();
                        break;
                    default:
                        reader.Skip();
                        //    throw new GDatasetException(23200281, 23200280); //RC-EX 23200280 : schema neodpovídá specifikaci XME
                        break;
                }
            }

            //</structure>
            reader.ReadEndElement();

            if (XMETA_ixs.Length == 0) throw new GDatasetException(23200283); //RC-EX 23200283 : XME soubor neobsahuje údaj ixs_xme
            UpdateNamespace();
        }

		#endregion
	}

}
