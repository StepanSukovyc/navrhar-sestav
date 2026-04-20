//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GColumn.cs                                   </Name>
//    <Description> Konfigurace sloupce gridu                                   </Description>
//    <Author>      Martin Aliger (Jiří Dvořák)                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2004-05-18                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;
using System.Xml;

namespace Gordic.General
{
    //---------------------------------------------------------------------
    /// <summary>
    /// Konfigurace sloupce gridu
    /// </summary>
    [System.Diagnostics.DebuggerDisplay("Column {Name,nq} ({Title,nq})")]
    public class GColumn : IGObject, ICloneable, IGCustomizableVisualItem, IGSettingAcceptor, IGIDProvider
    {

        #region ************** Výčet typů sloupců ******************
        //---------------------------------------------------------------------
        /// <summary>
        /// Typ sloupce
        /// </summary>
        public enum ColumnTypeEnum
        {
            /// <summary>
            /// Text box
            /// </summary>
            text,
            /// <summary>
            /// check box
            /// </summary>
            checkbox,
            /// <summary>
            /// obrázek
            /// </summary>
            picture,
            /// <summary>
            /// combo box
            /// </summary>
            combobox,
            /// <summary>
            /// button
            /// </summary>
            button
        }// end enum

        #endregion

        #region ************* Konstruktory *****************
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="type">typ komponent v sloupci (text boxy, obrázky, combo boxy, tlačítka...)</param>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        public GColumn(ColumnTypeEnum type, string name)
        {
            ColumnType = type;
            Name = name;
            Title = name;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="type">typ komponent v sloupci (text boxy, obrázky, combo boxy, tlačítka...)</param>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">text záhlaví sloupce</param>
        public GColumn(ColumnTypeEnum type, string name, string title)
        {
            ColumnType = type;
            Name = name;
            Title = title;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="type">typ komponent v sloupci (text boxy, obrázky, combo boxy, tlačítka...)</param>
        /// <param name="dataType">datový typ položek sloupce</param>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">text záhlaví sloupce</param>
        public GColumn(ColumnTypeEnum type, GColumnType dataType, string name, string title)
        {
            ColumnType = type;
            DataType = dataType;
            Name = name;
            Title = title;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="type">typ komponent v sloupci (text boxy, obrázky, combo boxy, tlačítka...)</param>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">text záhlaví sloupce</param>
        /// <param name="width">šířka sloupce</param>
        public GColumn(ColumnTypeEnum type, string name, string title, int width)
        {
            ColumnType = type;
            Name = name;
            Title = title;
            Width = width;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="type">typ komponent v sloupci (text boxy, obrázky, combo boxy, tlačítka...)</param>
        /// <param name="dataType">datový typ položek sloupce</param>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">text záhlaví sloupce</param>
        /// <param name="width">šířka sloupce</param>
        public GColumn(ColumnTypeEnum type, GColumnType dataType, string name, string title, int width)
        {
            DataType = dataType;
            ColumnType = type;
            Name = name;
            Title = title;
            Width = width;
        }// end method


        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="type">typ komponent v sloupci (text boxy, obrázky, combo boxy, tlačítka...)</param>
        /// <param name="dataType">datový typ položek sloupce</param>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">text záhlaví sloupce</param>
        /// <param name="width">šířka sloupce</param>
        /// <param name="nullText">text který se má objevit v buňce s hodnotou null</param>
        public GColumn(ColumnTypeEnum type, GColumnType dataType, string name, string title, int width, string nullText)
        {
            DataType = dataType;
            ColumnType = type;
            Name = name;
            Title = title;
            Width = width;
            NullText = nullText;
        }

        /// <summary>
        /// Copy Konstruktor
        /// </summary>
        protected GColumn(GColumn copyFrom)
        {
            ColumnType = copyFrom.ColumnType;
            m_Name = copyFrom.m_Name;
            DataType = copyFrom.DataType;
            m_DataName = copyFrom.m_DataName;
            Title = copyFrom.Title;
            Width = copyFrom.Width;
            NullText = copyFrom.NullText;
            AlwaysVisible = copyFrom.AlwaysVisible;
            AllowFilter = copyFrom.AllowFilter;
            Sort = copyFrom.Sort;
            Sortable = copyFrom.Sortable;
            SortOrder = copyFrom.SortOrder;
            SortOrderDesc = copyFrom.SortOrderDesc;
            LookupField = copyFrom.LookupField;
            LookupValueMember = copyFrom.m_LookupValue;
            Description = copyFrom.Description;
            Visible = copyFrom.Visible;
            TrueValue = copyFrom.TrueValue;
            FalseValue = copyFrom.FalseValue;
            NullValue = copyFrom.NullValue;
            SelectImageCallBack = copyFrom.SelectImageCallBack;
            MaxLength = copyFrom.MaxLength;
            Group = copyFrom.Group;
            Padded = copyFrom.Padded;
            Frozen = copyFrom.Frozen;
            CustomColumn = copyFrom.CustomColumn;
            Format = copyFrom.Format;
            Alignment = copyFrom.Alignment;
            GroupHashTemplate = copyFrom.GroupHashTemplate;
            GroupHeaderTemplate = copyFrom.GroupHeaderTemplate;
            AggregateMethod = copyFrom.AggregateMethod;
            ValueTemplate = copyFrom.ValueTemplate;
        }

        /// <summary>Vytvoří klon</summary>
        public virtual object Clone()
        {
            return new GColumn(this);
        }

        /// <summary>Porovnání</summary>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(obj, this)) return true;
            GColumn c = obj as GColumn;
            if (c == null) return false;
            if (c.m_Name != m_Name) return false;
            if (c.DataType != DataType) return false;
            if (c.m_DataName != m_DataName) return false;
            if (c.Title != Title) return false;
            if (c.Width != Width) return false;
            if (c.NullText != NullText) return false;
            if (c.AlwaysVisible != AlwaysVisible) return false;
            if (c.AllowFilter != AllowFilter) return false;
            if (c.Sort != Sort) return false;
            if (c.Sortable != Sortable) return false;
            if (c.SortOrder != SortOrder) return false;
            if (c.SortOrderDesc != SortOrderDesc) return false;
            if (c.LookupField != LookupField) return false;
            if (c.m_LookupValue != m_LookupValue) return false;
            if (c.Description != Description) return false;
            if (c.Visible != Visible) return false;
            //public GStyle Style
            //public GStyle AlternativStyle
            //public GStyle HeaderStyle
            if (c.TrueValue != TrueValue) return false;
            if (c.FalseValue != FalseValue) return false;
            if (c.NullValue != NullValue) return false;
            if (c.SelectImageCallBack != SelectImageCallBack) return false;
            if (c.MaxLength != MaxLength) return false;
            if (c.Group != Group) return false;
            if (c.Padded != Padded) return false;
            if (c.Frozen != Frozen) return false;
            if (c.CustomColumn != CustomColumn) return false;
            if (c.Format != Format) return false;
            if (c.Alignment != Alignment) return false;
            if (c.ValueTemplate != ValueTemplate) return false;
            if (c.GroupHashTemplate != GroupHashTemplate) return false;
            if (c.GroupHeaderTemplate != GroupHeaderTemplate) return false;
            if (c.AggregateMethod != AggregateMethod) return false;

            return true;
        }
        /// <summary>Hashcode</summary>
        public override int GetHashCode()
        {
            return DataName.GetHashCode();
        }
        #endregion

        #region ************** Veřejné statické metody ******************
        //------------------------------------------------------------------
        /// <summary>Základní nastavení String sloupce</summary>
        public static void InitStringColumn(GColumn c, ushort maxLength = UInt16.MaxValue, bool padded = false)
        {
            //c.DataType = GColumnType.String; //default
            c.MaxLength = maxLength;
            c.Padded = padded;
        }
        /// <summary>Základní nastavení Integer sloupce</summary>
        public static void InitIntegerColumn(GColumn c)
        {
            c.DataType = GColumnType.Integer;
        }
        /// <summary>Základní nastavení Decimal sloupce</summary>
        public static void InitDecimalColumn(GColumn c, GColumnAggregateMethod aggregateMethod = GColumnAggregateMethod.sum)
        {
            c.DataType = GColumnType.Decimal;
            c.AggregateMethod = aggregateMethod;
        }
        /// <summary>Základní nastavení Date sloupce</summary>
        public static void InitDateOnlyColumn(GColumn c)
        {
            c.DataType = GColumnType.Date;
            c.Format = "d";
            //totez co o radek niz: 
            //c.GroupHashTemplate = new GDelegateTemplate(s => GDate.Parse((s as GDataTemplateGroupingSource).Key).Category());
            c.GroupHashTemplate = "{datecategory(#value)}";
            //c.GroupHeaderTemplate = "{#hash}";
        }
        /// <summary>Základní nastavení DateTime sloupce</summary>
        public static void InitDateTimeColumn(GColumn c)
        {
            c.DataType = GColumnType.Date;
            c.Format = "G";
            c.GroupHashTemplate = "{datecategory(#value)}";
            //c.GroupHeaderTemplate = "{#hash}";
        }


        //---------------------------------------------------------------------
        /// <summary>
        /// Implicitní textový sloupec
        /// </summary>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">Nadpis sloupce v záhlaví gridu</param>
        /// <param name="width">šířka sloupce</param>
        /// <param name="trueValue">true value</param>
        /// <param name="falseValue">false value</param>
        /// <param name="nullValue">null value</param>
        /// <returns>sloupec</returns>
        public static GColumn CreateCheckColumn(string name, string title, int width, object trueValue, object falseValue, object nullValue)
        {
            GColumn column = new GColumn(ColumnTypeEnum.checkbox, name, title, width);
            column.TrueValue = trueValue;
            column.FalseValue = falseValue;
            column.NullValue = nullValue;
            return column;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoří sloupec s check boxem
        /// </summary>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">Nadpis sloupce v záhlaví gridu</param>
        /// <param name="trueValue">true value</param>
        /// <param name="falseValue">false value</param>
        /// <param name="nullValue">null value</param>
        /// <returns>sloupec</returns>
        public static GColumn CreateCheckColumn(string name, string title, object trueValue, object falseValue, object nullValue)
        {
            GColumn column = new GColumn(ColumnTypeEnum.checkbox, name, title);
            column.TrueValue = trueValue;
            column.FalseValue = falseValue;
            column.NullValue = nullValue;
            return column;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoří sloupec s check boxem
        /// </summary>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="trueValue">true value</param>
        /// <param name="falseValue">false value</param>
        /// <param name="nullValue">null value</param>
        /// <returns>sloupec</returns>
        public static GColumn CreateCheckColumn(string name, object trueValue, object falseValue, object nullValue)
        {
            GColumn column = new GColumn(ColumnTypeEnum.checkbox, name);
            column.TrueValue = trueValue;
            column.FalseValue = falseValue;
            column.NullValue = nullValue;
            return column;
        }// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoří sloupec s obrázkem
        /// </summary>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="selectImageCallBack">funkce která se zavolá pro každý řádek a vyhodnotí který obrázek se má zobrazit...</param>
        /// <returns>sloupec</returns>
        public static GColumn CreatePictureColumn(string name, SelectImageDelegate selectImageCallBack)
        {
            GColumn column = new GColumn(ColumnTypeEnum.picture, name);
            column.SelectImageCallBack = selectImageCallBack;
            return column;
        }
        /// <summary>
        /// Vytvoří sloupec s obrázkem
        /// </summary>
        /// <param name="name">jméno sloupce v datovém zdroji</param>
        /// <param name="title">zálaví sloupce</param>
        /// <param name="width">šířka sloupce</param>
        /// <param name="selectImageCallBack">funkce která se zavolá pro každý řádek a vyhodnotí který obrázek se má zobrazit...</param>
        /// <returns>sloupec</returns>
        public static GColumn CreatePictureColumn(string name, string title, int width, SelectImageDelegate selectImageCallBack)
        {
            GColumn column = new GColumn(ColumnTypeEnum.picture, name, title);
            column.Width = width;
            column.SelectImageCallBack = selectImageCallBack;
            return column;
        }

        /// <summary>Metoda pro ulozeni uzivatelem menitelnych vlastnosti jako soucasti uzivatelskeho nastaveni</summary>
        public static void CustomUserSettingsSave(GColumn item, XmlNode node)
        {
            node.Attributes.Append(node.OwnerDocument.CreateAttribute("width")).Value = item.Width.ToString();
            if (item.Frozen) node.Attributes.Append(node.OwnerDocument.CreateAttribute("frozen")).Value = "1";
        }

        /// <summary>Metoda pro obnovu uzivatelem menitelnych vlastnosti ulozenych jako soucast uzivatelskeho nastaveni</summary>
        public static void CustomUserSettingsLoad(GColumn item, XmlNode node)
        {
            XmlAttribute wa = node.Attributes["width"];
            if (wa != null)
            {
                int w;
                if (Int32.TryParse(wa.Value, out w))
                    item.Width = w;
            }

            XmlAttribute a = node.Attributes["frozen"];
            item.Frozen = (a != null) && GBoolean.Parse(a.Value).BaseValue;
        }

        #endregion

        #region ************* Veřejné vlastnosti *****************

        internal GColumnList m_list = null;
        private int m_index = -1;

        /// <summary>Index v seznamu sloupců</summary>
        public int Index
        {
            get
            {
                if (m_index >= 0) return m_index;
                if (m_list == null) return -1;
                return m_list.IndexOf(this);
            }
            internal set { m_index = value; }
        }

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Nastaví sloupci default styly
        ///// </summary>
        ///// <returns></returns>
        //public void SetDefaultStyles()
        //{
        //    Style = GDVCommon.DefaultStyle;
        //    HeaderStyle = GDVCommon.DefaultHeaderStyle;
        //    AlternativStyle = GDVCommon.DefaultAlternativeStyle;
        //}// end method

        //---------------------------------------------------------------------
        /// <summary>
        /// Jméno (mapping name)
        /// </summary>
        private string m_Name = null;
        /// <summary>
        /// Jméno (mapping name)
        /// </summary>
        public string Name
        {
            get
            {
                if (m_Name == null || m_Name.Length == 0)
                {
                    if (Index < 0)
                        return "unnamed_column";
                    else
                        return "unnamed_column_" + (Index + 1).ToString();
                }
                return m_Name;
            }
            set { m_Name = value; }
        }
        //internal string InternalName
        //{
        //    get { return m_Name; }
        //}

        //------------------------------------------------------------------
        private string m_DataName = null;
        ///<summary>Mapping name (jméno navázané položky v db)</summary>
        public string DataName
        {
            get { return m_DataName ?? m_Name ?? ""; }
            set { m_DataName = value; }
        }


        //------------------------------------------------------------------
        /// <summary> Getter rozhrani IGCustomizableVisualItem, totozne s Name</summary>
        public string ID
        {
            get { return Name; } // end get
        } // end property
        //------------------------------------------------------------------
        private bool m_bAlwaysVisible = false;
        /// <summary> Priznak, ze sloupec nelze skryt uzivatelskym nastavenim</summary>
        public bool AlwaysVisible
        {
            get { return m_bAlwaysVisible; } // end get
            set { m_bAlwaysVisible = value; } // end set 
        } // end property

        //------------------------------------------------------------------
        private bool m_AllowFilter = true;
        ///<summary>Povolení filtrování</summary>
        public bool AllowFilter
        {
            get { return m_AllowFilter; }
            set { m_AllowFilter = value; }
        }

        //------------------------------------------------------------------
        private GColumnSort m_Sort = GColumnSort.None;
        ///<summary>Třídění sloupce</summary>
        public GColumnSort Sort
        {
            get { return m_Sort; }
            set { m_Sort = value; }
        }
        //------------------------------------------------------------------
        private bool m_Sortable = true;
        ///<summary>Povolení třídit dle sloupce</summary>
        public bool Sortable
        {
            get { return m_Sortable; }
            set { m_Sortable = value; }
        }
        //------------------------------------------------------------------
        private string m_SortOrder;
        ///<summary>Třídění sloupce podle custom kritérií (pro ASC třídění)</summary>
        public string SortOrder
        {
            get { return m_SortOrder; }
            set { m_SortOrder = value; }
        }
        //------------------------------------------------------------------
        private string m_SortOrderDesc;
        ///<summary>Třídění sloupce podle custom kritérií (pro ASC třídění)</summary>
        public string SortOrderDesc
        {
            get { return m_SortOrderDesc; }
            set { m_SortOrderDesc = value; }
        }

        //------------------------------------------------------------------
        private string m_LookupField;
        private string m_LookupValue;
        ///<summary>Tabulka.sloupec pro dotahování hodnot (pouze combobox column)</summary>
        public string LookupField
        {
            get { return m_LookupField; }
            set { m_LookupField = value; }
        }
        ///<summary>Jméno tabulky pro dotahování hodnot (pouze combobox column)</summary>
        public string LookupTable
        {
            get { return m_LookupField.Split('.')[0]; }
        }
        ///<summary>Jméno sloupce pro dotahování hodnot (pouze combobox column)</summary>
        public string LookupMember
        {
            get { return m_LookupField.Split('.')[1]; }
        }
        ///<summary>Jméno sloupce pro hledání vazební hodnoty (pouze combobox column)</summary>
        public string LookupValueMember
        {
            get { return m_LookupValue ?? m_Name ?? ""; }
            set { m_LookupValue = value; }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Titulek
        /// </summary>
        private string msTitle = String.Empty;
        //---------------------------------------------------------------------
        /// <summary>
        /// Titulek (popis v záhlaví sloupce)
        /// </summary>
        public string Title
        {
            get { return msTitle; }
            set { msTitle = value; }
        }// end peroperty

        //---------------------------------------------------------------------
        /// <summary>
        /// Detailní popis sloupce
        /// </summary>
        private string m_sDescription = "";
        //---------------------------------------------------------------------
        /// <summary>
        /// Detailní popis sloupce
        /// </summary>
        public string Description
        {
            get { return m_sDescription; }
            set { m_sDescription = value; }
        }// end peroperty

        /// <summary>Titulek a detailní popis sloupce v jednom řetězci</summary>
        public string TitleAndDescription
        {
            get
            {
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                if (!string.IsNullOrEmpty(Title)) sb.Append(Title);
                if (!string.IsNullOrEmpty(Description))
                {
                    if (sb.Length > 0) sb.Append(" - ");
                    sb.Append(Description);
                }
                return sb.ToString();
            }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Šířka
        /// </summary>
        private int mnWidth = 150;
        //---------------------------------------------------------------------
        /// <summary>
        /// Šířka slouce
        /// </summary>
        public int Width
        {
            get { return mnWidth; }
            set
            {
                if (value < 0) throw new GArgumentOutOfRangeException(23400008);
                mnWidth = value;
            }
        }// end peroperty

        //---------------------------------------------------------------------
        /// <summary>
        /// Viditelnost
        /// </summary>
        private bool mbVisible = true;
        //---------------------------------------------------------------------
        /// <summary>
        /// Viditelnost sloupce
        /// </summary>
        public bool Visible
        {
            get { return mbVisible; }
            set { mbVisible = value; }
        }// end peroperty

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Styl
        ///// </summary>
        //private GColumnStyle moStyle = null;
        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Styl buněk sloupce (liché řádky
        ///// </summary>
        //public GColumnStyle Style
        //{
        //    get { return moStyle; }
        //    set { moStyle = value; }
        //}// end peroperty

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Alternativní styl
        ///// </summary>
        //private GColumnStyle moAlternativStyle = null;
        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Alternativní styl buněk sloupce (sudé řádky)
        ///// </summary>
        //public GColumnStyle AlternativStyle
        //{
        //    get { return moAlternativStyle; }
        //    set { moAlternativStyle = value; }
        //}// end peroperty

        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Styl hlavičky
        ///// </summary>
        //private GColumnStyle moHeaderStyle = null;
        ////---------------------------------------------------------------------
        ///// <summary>
        ///// Styl hlavičky
        ///// </summary>
        //public GColumnStyle HeaderStyle
        //{
        //    get { return moHeaderStyle; }
        //    set { moHeaderStyle = value; }
        //}// end peroperty

        //---------------------------------------------------------------------
        /// <summary>
        /// Typ sloupce
        /// </summary>
        private ColumnTypeEnum moColumnType = ColumnTypeEnum.text;
        //---------------------------------------------------------------------
        /// <summary>
        /// Typ komponenty v sloupci (textbox, combobox, picture,....)
        /// </summary>
        public ColumnTypeEnum ColumnType
        {
            get { return moColumnType; }
            set { moColumnType = value; }
        }// end peroperty

        //---------------------------------------------------------------------
        /// <summary>
        /// Datový typ položek v sloupci
        /// </summary>
        private GColumnType m_oDataType = GColumnType.String;
        //---------------------------------------------------------------------
        /// <summary>
        /// Datový typ sloupce (informace nutná kvůli filtraci či řazení)
        /// </summary>
        public GColumnType DataType
        {
            get { return m_oDataType; }
            set { m_oDataType = value; }
        }// end method

        //------------------------------------------------------------------
        private object m_oTrueValue = true;
        //------------------------------------------------------------------
        ///<summary>Pouze pro check box column - hodnota která je považována za true</summary>
        public object TrueValue
        {
            get { return (m_oTrueValue); }// end get
            set { m_oTrueValue = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private object m_oFalseValue = false;
        //------------------------------------------------------------------
        ///<summary>Pouze pro check box column - hodnota která je považována za false</summary>
        public object FalseValue
        {
            get { return (m_oFalseValue); }// end get
            set { m_oFalseValue = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private object m_oNullValue = null;
        //------------------------------------------------------------------
        ///<summary>Pouze pro check box column - hodnota která je považována za null</summary>
        public object NullValue
        {
            get { return (m_oNullValue); }// end get
            set { m_oNullValue = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private string m_sNullText = "";
        //------------------------------------------------------------------
        ///<summary>Text kterým se má prezentovat hodnota null</summary>
        public string NullText
        {
            get { return (m_sNullText); }// end get
            set { m_sNullText = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private SelectImageDelegate m_oSelectImageCallBack = null;
        ///<summary>Umožní předat funkci, která se zavolá pro získání informací o obrázku, který se má ve sloupečku zobrazit</summary>
        public SelectImageDelegate SelectImageCallBack
        {
            get { return m_oSelectImageCallBack; }
            set { m_oSelectImageCallBack = value; }
        }

        //------------------------------------------------------------------
        private ushort m_iMaxLength = UInt16.MaxValue;
        //------------------------------------------------------------------
        ///<summary>Max.délka uloženého řetězce. Pomocná informace</summary>
        public ushort MaxLength
        {
            get { return (m_iMaxLength); }// end get
            set { m_iMaxLength = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private string m_sGroup = "";
        //------------------------------------------------------------------
        ///<summary>Skupina. K ničemu se nepoužívá, je možno sem něco schovat (zařadit sloupce do skupin)</summary>
        public string Group
        {
            get { return (m_sGroup); }// end get
            set { m_sGroup = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private GColumnSet m_Set = null;
        //------------------------------------------------------------------
        ///<summary>Skupina sloupců. Všechny sloupce skupiny jsou pohromadě.</summary>
        public GColumnSet Set
        {
            get { return (m_Set); }// end get
            set { m_Set = value; }// end set
        }// end property

        //------------------------------------------------------------------
        private bool m_bPadded = false;
        //------------------------------------------------------------------
        ///<summary>Příznak doplňování na plnou délku. K ničemu se nepoužívá, některé komponenty (např. filtry) mohou použít.</summary>
        public bool Padded
        {
            get { return m_bPadded; }// end get
            set { m_bPadded = value; }// end set
        }// end property        

        //------------------------------------------------------------------
        private bool m_bFrozen = false;
        //------------------------------------------------------------------
        ///<summary>Příznak zmrazení. Grid takovéto sloupce neroluje.</summary>
        public bool Frozen
        {
            get { return m_bFrozen; }// end get
            set { m_bFrozen = value; }// end set
        }// end property        

        //------------------------------------------------------------------
        private object m_oCustomColumn = null;
        //------------------------------------------------------------------
        ///<summary>Vlastní typ sloupce. Každá komponenta na toto může a nemusí reagovat</summary>
        public object CustomColumn
        {
            get { return m_oCustomColumn; }// end get
            set { m_oCustomColumn = value; }// end set
        }// end property        

        //------------------------------------------------------------------
        private GColumnAlignment m_Alignment = GColumnAlignment.NotSet;
        //---------------------------------------------------------------------
        /// <summary>Zarovnání</summary>
        public GColumnAlignment Alignment
        {
            get { return m_Alignment; }
            set { m_Alignment = value; }
        }// end property

        //---------------------------------------------------------------------
        private string m_Format = null;
        //---------------------------------------------------------------------
        /// <summary>Formátování</summary>
        public string Format
        {
            get { return m_Format; }
            set { m_Format = value; }
        }// end property

        //------------------------------------------------------------------
        private GTemplate m_ValueTemplate;
        ///<summary>šablona pro hodnotu</summary>
        public GTemplate ValueTemplate
        {
            get { return m_ValueTemplate; }
            set { m_ValueTemplate = value; }
        }

        //------------------------------------------------------------------
        private GTemplate m_GroupHeaderTemplate;
        ///<summary>šablona záhlaví pro skupinování</summary>
        public GTemplate GroupHeaderTemplate
        {
            get { return m_GroupHeaderTemplate; }
            set { m_GroupHeaderTemplate = value; }
        }

        //------------------------------------------------------------------
        private GTemplate m_GroupHashTemplate;
        ///<summary>šablona pro hašování dat skupin</summary>
        public GTemplate GroupHashTemplate
        {
            get { return m_GroupHashTemplate; }
            set { m_GroupHashTemplate = value; }
        }

        //------------------------------------------------------------------
        private GColumnAggregateMethod m_AggregateMethod = GColumnAggregateMethod.none;
        ///<summary>Agregační funkce pro zobrazení v gridech při seskupení</summary>
        ///<remarks>Má smysl pouze u číselných (decimal) sloupců</remarks>
        public GColumnAggregateMethod AggregateMethod
        {
            get { return m_AggregateMethod; }
            set { m_AggregateMethod = value; }
        }
        
        //------------------------------------------------------------------
        private GTemplate m_GroupTopAggregatedTemplate;
        ///<summary>Šablona agregované hodnoty pro zobrazení v záhlaví při seskupení</summary>
        public GTemplate GroupTopAggregatedTemplate
        {
            get { return m_GroupTopAggregatedTemplate ?? GetDefaultAggregateTemplate(AggregateMethod, Format, DataType); }
            set { m_GroupTopAggregatedTemplate = value; }
        }

        //------------------------------------------------------------------
        private GTemplate m_GroupBottomAggregatedTemplate;
        ///<summary>Šablona agregované hodnoty pro zobrazení v záhlaví při seskupení</summary>
        public GTemplate GroupBottomAggregatedTemplate
        {
            get { return m_GroupBottomAggregatedTemplate ?? GetDefaultAggregateTemplate(AggregateMethod, Format, DataType); }
            set { m_GroupBottomAggregatedTemplate = value; }
        }

        /// <summary>Vrací výchozí šablonu pro typ agregace</summary>
        public static GTemplate GetDefaultAggregateTemplate(GColumnAggregateMethod aggregateMethod, string format = null, GColumnType dataType = GColumnType.String)
        {
            if (format == null)
            {
                switch (dataType)
                {
                    case GColumnType.Decimal:
                        format = "N";
                        break;
                    case GColumnType.Integer:
                        format = "0"; //"D";  D deva vyjimky u agregaci,ktere vraci Decimal (sum,avg), jelikoz Decimal nema "D" format.
                        break;
                    case GColumnType.Date:
                        format = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern; //GTbGDateTime._DateTimePattern;
                        break;
                }
            }
            if (format == "D" && dataType == GColumnType.Integer) format = "0"; //osetreni "D" formatu pro int

            switch (aggregateMethod)
            {
                case GColumnAggregateMethod.sum:
                    return new GDataTemplate("\u2211 {sum()" + (format == null ? "" : (":" + format)) + "}");
                case GColumnAggregateMethod.avg:
                    return new GDataTemplate("\u00f8 {avg()" + (format == null ? "" : (":" + format)) + "}");
                case GColumnAggregateMethod.min:
                    return new GDataTemplate("min. {min()" + (format == null ? "" : (":" + format)) + "}");
                case GColumnAggregateMethod.max:
                    return new GDataTemplate("max. {max()" + (format == null ? "" : (":" + format)) + "}");
                case GColumnAggregateMethod.count:
                    return new GDataTemplate("({count()})");
                case GColumnAggregateMethod.countnn:
                    return new GDataTemplate("({countnn()})");
                case GColumnAggregateMethod.firstnn:
                    return new GDataTemplate("{firstnn()" + (format == null ? "" : (":" + format)) + "}");
                case GColumnAggregateMethod.lastnn:
                    return new GDataTemplate("{lastnn()" + (format == null ? "" : (":" + format)) + "}");
                default:
                    return null;
            }
        }

        #endregion

        //---------------------------------------------------------------------
        /// <summary>delegát pro dohledání obrázku pro sloupec s obrázky</summary>
        public delegate GImageColumnInfo SelectImageDelegate(DataRow row, string currentColumnName);

        #region IGSettingAcceptor Members

        void IGSettingAcceptor.ApplySettings(GSettingStorage storage)
        {
            if (AlwaysVisible == false) Visible = storage.Read("v", Visible);
            Width = storage.Read("w", Width);
            Frozen = storage.Read("f", Frozen);
        }
        void IGSettingAcceptor.SaveSettings(GSettingStorage storage)
        {
            storage.Write("v", Visible);
            storage.Write("w", Width);
            storage.Write("f", Frozen);
        }

        #endregion
    }

    //---------------------------------------------------------------------
    /// <summary>Typ zarovnani</summary>
    public enum GColumnAlignment
    {
        /// <summary>Není nastaveno</summary>
        NotSet,
        /// <summary>Vlevo</summary>
        Left,
        /// <summary>Stred</summary>
        Center,
        /// <summary>Vpravo</summary>
        Right,
    }

    //---------------------------------------------------------------------
    /// <summary>Datový typ hodnot v sloupci</summary>
    public enum GColumnType
    {
        /// <summary>Text</summary>
        String,
        /// <summary>Datum nebo datum a čas</summary>
        Date,
        /// <summary>decimal - desetiné číslo</summary>
        Decimal,
        /// <summary>celá čísla (integer, short,...)</summary>
        Integer,
    }

    //---------------------------------------------------------------------
    /// <summary>Výčet určuje řazení</summary>
    public enum GColumnSort
    {
        /// <summary>Bez</summary>
        None,
        /// <summary>Vzestupně</summary>
        Asc,
        /// <summary>sestupně</summary>
        Desc,
    }

    /// <summary>Výčet základních agregačních funkcí pro zobrazení v gridech při seskupení</summary>
    public enum GColumnAggregateMethod
    {
        /// <summary>žádná agregace</summary> 
        none = 0,
        /// <summary>počet</summary> 
        count = 5,
        /// <summary>součet</summary> 
        sum = 1,
        /// <summary>minimum</summary> 
        min = 3,
        /// <summary>maximum</summary> 
        max = 4,
        /// <summary>průměr</summary> 
        avg = 2,
        /// <summary>počet not-null</summary> 
        countnn = 15,
        /// <summary>první not-null hodnota</summary> 
        firstnn = 16,
        /// <summary>poslední not-null hodnota</summary> 
        lastnn = 17,
    }

    //---------------------------------------------------------------------
    /// <summary>
    /// Třída pro informace o obrázku
    /// </summary>
    public class GImageColumnInfo
    {
        //------------------------------------------------------------------
        private System.Drawing.Image m_Image = null;
        ///<summary>obrázek</summary>
        public System.Drawing.Image Image
        {
            get { return m_Image; }
        }

        //------------------------------------------------------------------
        private string m_Text = null;
        ///<summary>text</summary>
        public string Text
        {
            get { return m_Text; }
        }

        //------------------------------------------------------------------
        private string m_ToolTip = "";
        ///<summary>popis zobrazující se nad obrázek (popis obrázku)</summary>
        public string ToolTip
        {
            get { return m_ToolTip; }
        }

        /// <summary>Konstuktor</summary>
        public GImageColumnInfo(System.Drawing.Image image) { m_Image = image; }
        /// <summary>Konstuktor</summary>
        public GImageColumnInfo(System.Drawing.Image image, string toolTip) { m_Image = image; m_ToolTip = toolTip; }
        /// <summary>Konstuktor</summary>
        public GImageColumnInfo(string text, System.Drawing.Image image) { m_Text = text; m_Image = image; }
        /// <summary>Konstuktor</summary>
        public GImageColumnInfo(string text, System.Drawing.Image image, string toolTip) { m_Text = text; m_Image = image; m_ToolTip = toolTip; }

        /// <summary/>
        public override string ToString()
        {
            return Text ?? string.Empty;
        }
    }

}
