//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GGridFormat.cs                               </Name>
//    <Description> Formátovací tøída øídící vzhled data gridu                  </Description>
//    <Author>      Martin Aliger (Libor Èaloud, Jiøí Dvoøák)                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2004-06-30                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;

namespace Gordic.General
{

    //------------------------------------------------------------------
    /// <summary>
    /// Formát data gridu
    /// </summary>
    public class GGridFormat : IGObject, ICloneable, IGSettingAcceptor
    {
        #region Init

        //------------------------------------------------------------------
        /// <summary>Konstruktor</summary>
        public GGridFormat()
        {
        }

        /// <summary>
        /// Copy Konstruktor
        /// </summary>
        protected GGridFormat(GGridFormat copyFrom)
        {
            AllowColumnMove = copyFrom.AllowColumnMove;
            AllowColumnResize = copyFrom.AllowColumnResize;
            AllowNewRow = copyFrom.AllowNewRow;
            AllowDeleteRow = copyFrom.AllowDeleteRow;
            AllowSorting = copyFrom.AllowSorting;

            RowsColor = copyFrom.RowsColor;
            AlternatingRowsColor = copyFrom.AlternatingRowsColor;
            RowNumbering = copyFrom.RowNumbering;

            foreach (GColumn c in copyFrom.Columns)
            {
                Columns.Add((GColumn)c.Clone());
            }
        }

        /// <summary>Vytvoøí klon</summary>
        object ICloneable.Clone()
        {
            return Clone();
        }

        /// <summary>Vytvoøí klon</summary>
        public virtual GGridFormat Clone()
        {
            return new GGridFormat(this);
        }

        /// <summary>Porovnání</summary>
        public override bool Equals(object obj)
        {
            GGridFormat gf = obj as GGridFormat;
            if (gf == null) return false;
            if (gf.AllowColumnMove != AllowColumnMove) return false;
            if (gf.AllowColumnResize != AllowColumnResize) return false;
            if (gf.AllowNewRow != AllowNewRow) return false;
            if (gf.AllowDeleteRow != AllowDeleteRow) return false;
            if (gf.AllowSorting != AllowSorting) return false;
            if (gf.RowsColor != RowsColor) return false;
            if (gf.AlternatingRowsColor != AlternatingRowsColor) return false;
            if (gf.RowNumbering != RowNumbering) return false;
            return Columns.Equals(gf.Columns);
        }

        /// <summary>Hashcode</summary>
        public override int GetHashCode()
        {
            return Columns.GetHashCode();
        }
        #endregion
        #region Zjednodušené pøidávání sloupcù

        /// <summary>Pøidá textový sloupec pro typ String</summary>
        public GColumn AddStringColumn(string name, string title, int width)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, width);
            //GColumn.InitStringColumn(c);
            Columns.Add(c);
            return c;
        }

        /// <summary>Pøidá textový sloupec pro typ String</summary>
        public GColumn AddStringColumn(string name, string title, ushort maxLength, int margin, Font font, bool padded = false)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, ComputeWidth(maxLength, title, margin, font));
            GColumn.InitStringColumn(c, maxLength, padded);
            Columns.Add(c);
            return c;
        }

        //------------------------------------------------------------------
        /// <summary>Pøidá textový sloupec pro typ Decimal</summary>
        public GColumn AddDecimalColumn(string name, string title, int width, GColumnAggregateMethod aggregateMethod = GColumnAggregateMethod.sum)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, width);
            GColumn.InitDecimalColumn(c, aggregateMethod);
            Columns.Add(c);
            return c;
        }

        /// <summary>Pøidá textový sloupec pro typ Integer</summary>
        public GColumn AddIntegerColumn(string name, string title, int width)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, width);
            GColumn.InitIntegerColumn(c);
            Columns.Add(c);
            return c;
        }

        /// <summary>Pøidá textový sloupec pro typ Date</summary>
        public GColumn AddDateOnlyColumn(string name, string title, int width)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, width);
            GColumn.InitDateOnlyColumn(c);
            Columns.Add(c);
            return c;
        }

        /// <summary>Pøidá textový sloupec pro typ DateTime</summary>
        public GColumn AddDateTimeColumn(string name, string title, int width)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, width);
            GColumn.InitDateTimeColumn(c);
            Columns.Add(c);
            return c;
        }

        //------------------------------------------------------------------
        /// <summary>Pøidá textový sloupec s dohledáním hodnoty v externím èíselníku</summary>
        public GColumn AddLookupColumn(string name, string lookupfield, string title, int width)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.combobox, name, title, width);
            c.LookupField = lookupfield;
            Columns.Add(c);
            return c;
        }

        /// <summary>Pøidá textový sloupec s dohledáním hodnoty v externím èíselníku</summary>
        public GColumn AddLookupColumn(string name, string lookupTable, string lookupValue, string lookupDisplay, string title, int width)
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.combobox, name, title, width);
            c.LookupValueMember = lookupValue;
            c.LookupField = lookupTable + "." + lookupDisplay;
            Columns.Add(c);
            return c;
        }

        /// <summary>Pøidá textový sloupec s formátováním dle šablony</summary>
        public GColumn AddTemplateColumn(string name, GTemplate template, string title, int width, string dataName = null, GColumnAlignment alignment = GColumnAlignment.NotSet, string description = "")
        {
            GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, name, title, width);
            c.Description = description;
            c.DataName = dataName; //casto nema datovou polozku
            c.Alignment = alignment;
            c.ValueTemplate = template;
            Columns.Add(c);
            return c;
        }


        //------------------------------------------------------------------
        /// <summary>Pøidá obrázkový sloupec</summary>
        /// <param name="sid">delegát pro obrázek</param>
        /// <param name="name">jméno sloupce - povinné vyplnit! Lze dát jméno DB sloupce, podle kterého se to primárnì urèuje. Není to nutné, ale musí být jedineèné.</param>
        /// <param name="title">Titulek v záhlaví, mùže být prázdný</param>
        /// <param name="width">Šíška (Default 22)</param>
        /// <param name="description">Popisek pro tooltip (null=bez tooltipu)</param>
        /// <param name="frozen">zmrazení (neroluje pak s daty)</param>
        /// <param name="dataName">jméno sloupce v datasetu, na které je sloupec vázán</param>
        /// <returns></returns>
        public GColumn AddPictureColumn(GColumn.SelectImageDelegate sid, string name, string title = "", int width = 22, string description = null, bool frozen = false, string dataName = null)
        {
            GColumn c = GColumn.CreatePictureColumn(name, title, width, sid);
            c.Description = description;
            c.Frozen = frozen;
            c.DataName = dataName;
            Columns.Add(c);
            return c;
        }

        #endregion
        #region EkoInit sloupce
        /// <summary>Pøidá sloupce podle SortedEkoCfuSet</summary>
        public void AddSortedEkoCfuSet(GEkoParams ekoParams)
        {
            AddSortedEkoCfuSet(ekoParams, 4, null, null);
        }
        /// <summary>Pøidá sloupce podle SortedEkoCfuSet</summary>
        public void AddSortedEkoCfuSet(GEkoParams ekoParams, int margin, Font font)
        {
            AddSortedEkoCfuSet(ekoParams, margin, null, font);
        }
        /// <summary>Pøidá sloupce podle SortedEkoCfuSet</summary>
        public void AddSortedEkoCfuSet(GEkoParams ekoParams, int margin, Graphics gc, Font font)
        {
            AddSortedEkoCfuSet(ekoParams.SortedEkoCfuSet, margin, gc, font);
        }

        /// <summary>Pøidá sloupce podle cfuSet</summary>
        public void AddSortedEkoCfuSet(GEkoCfuSet cfuSet)
        {
            AddSortedEkoCfuSet(cfuSet, 4, null, null);
        }
        /// <summary>Pøidá sloupce podle cfuSet</summary>
        public void AddSortedEkoCfuSet(GEkoCfuSet cfuSet, int margin, Font font)
        {
            AddSortedEkoCfuSet(cfuSet, margin, null, font);
        }
        /// <summary>Pøidá sloupce podle cfuSet</summary>
        public void AddSortedEkoCfuSet(GEkoCfuSet cfuSet, int margin, Graphics gc, Font font)
        {
            foreach (GEkoCfuItem ekoSlovo in cfuSet)
            {
                int sirkaVPixelech = ComputeWidth(ekoSlovo.Delka, ekoSlovo.Zkratka, margin, gc, font);

                //GColumn c = GColumn.CreateTextColumn(ekoSlovo.DbNazev, ekoSlovo.Zkratka, sirkaVPixelech);
                GColumn c = new GColumn(GColumn.ColumnTypeEnum.text, ekoSlovo.DbNazev, ekoSlovo.Zkratka, sirkaVPixelech);
                c.MaxLength = (ushort)ekoSlovo.Delka;
                c.Group = "ekocfu";
                Columns.Add(c);
            }
        }
        #endregion
        #region Výpoèet šíøky sloupce dle fontu
        /// <summary>
        /// výpoèet šíøky sloupce. Používáno pro EKO sloupce, kde je z DB znám pouze poèet znakù.
        /// </summary>
        public static int ComputeWidth(int maxLength, string title, int margin, Graphics gc, Font font)
        {
            if (gc != null)
                return _ComputeWidth(maxLength, title, margin, gc, font);

            using (gc = Graphics.FromHwnd(IntPtr.Zero))
            {
                return _ComputeWidth(maxLength, title, margin, gc, font);
            }
        }

        private static int _ComputeWidth(int maxLength, string title, int margin, Graphics gc, Font font)
        {
            if (font == null) font = SystemFonts.DefaultFont;
            Size sf1 = Size.Ceiling(gc.MeasureString("".PadLeft(maxLength, '0'), font));
            Size sf2 = Size.Ceiling(gc.MeasureString("".PadLeft(maxLength, 'X'), font));
            int sfWidth = Math.Max(sf1.Width, sf2.Width);
            if (title == null)
                return margin + sfWidth;

            Size st = Size.Ceiling(gc.MeasureString(title, font));
            return margin + Math.Max(sfWidth, st.Width);
        }
        /// <summary>
        /// výpoèet šíøky sloupce. Používáno pro EKO sloupce, kde je z DB znám pouze poèet znakù.
        /// </summary>
        public static int ComputeWidth(int maxLength, string title, int margin, Font font)
        {
            return ComputeWidth(maxLength, title, margin, null, font);
        }
        #endregion
        #region Vlastnosti

        //------------------------------------------------------------------
        private bool m_oAllowColumnMove = true;
        ///<summary>Zda je povolen pøesun sloupcù</summary>
        public bool AllowColumnMove
        {
            get { return (m_oAllowColumnMove); }
            set { m_oAllowColumnMove = value; }
        }

        //------------------------------------------------------------------
        private bool m_oAllowColumnResize = true;
        ///<summary>Zda je povolena zmìna šíøky sloupcù</summary>
        public bool AllowColumnResize
        {
            get { return (m_oAllowColumnResize); }
            set { m_oAllowColumnResize = value; }
        }

        //------------------------------------------------------------------
        private bool m_oAllowNewRow = false;
        ///<summary>Zda bude možno zadávat nový øádek</summary>
        public bool AllowNewRow
        {
            get { return (m_oAllowNewRow); }
            set { m_oAllowNewRow = value; }
        }

        //------------------------------------------------------------------
        private bool m_oAllowDeleteRow = false;
        ///<summary>Zda bude možno mazat øádek</summary>
        public bool AllowDeleteRow
        {
            get { return (m_oAllowDeleteRow); }
            set { m_oAllowDeleteRow = value; }
        }

        //------------------------------------------------------------------
        private bool m_oAllowSorting = true;
        ///<summary>Zda je povoleno øazení</summary>
        public bool AllowSorting
        {
            get { return (m_oAllowSorting); }
            set { m_oAllowSorting = value; }
        }

        //------------------------------------------------------------------
        private GColumnList m_oColumns = new GColumnList();
        ///<summary>Columns</summary>
        public GColumnList Columns
        {
            get { return (m_oColumns); }
        }

        //------------------------------------------------------------------
        private Color m_RowsColor = Color.Empty;
        ///<summary>Barva lichých øádkù</summary>
        public Color RowsColor
        {
            get { return m_RowsColor; }
            set { m_RowsColor = value; }
        }

        //------------------------------------------------------------------
        private Color m_AlternatingRowsColor = Color.FromArgb(247, 247, 247);
        ///<summary>Barva sudých øádkù</summary>
        public Color AlternatingRowsColor
        {
            get { return m_AlternatingRowsColor; }
            set { m_AlternatingRowsColor = value; }
        }

        //---------------------------------------------------------------------
        private bool m_RowNumbering = false;
        /// <summary>Èíslování øádkù</summary>
        public bool RowNumbering
        {
            get { return m_RowNumbering; }
            set { m_RowNumbering = value; }
        }
        #endregion
        #region IGSettingAcceptor Members

        void IGSettingAcceptor.ApplySettings(GSettingStorage storage)
        {
            RowsColor = storage.Read("rc", RowsColor);
            AlternatingRowsColor = storage.Read("ac", AlternatingRowsColor);
            RowNumbering = storage.Read("num", RowNumbering);
            storage.RestoreList("c", m_oColumns.m_oColumnList);
        }
        void IGSettingAcceptor.SaveSettings(GSettingStorage storage)
        {
            storage.Write("rc", RowsColor);
            storage.Write("ac", AlternatingRowsColor);
            storage.Write("num", RowNumbering);
            storage.StoreList("c", m_oColumns.m_oColumnList);
        }

        #endregion
    }
}
