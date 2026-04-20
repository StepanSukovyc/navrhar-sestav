//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEkoCfuItem.cs                               </Name>
//    <Description> Jedna položka z EKOSCFU                                     </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-11-03                                                  </Created>
//  </FileHeader>

using System;
using Gordic.General;

namespace Gordic.General
{
    /// <summary>
    /// Jedna položka z EKOSCFU
    /// </summary>
    [Serializable]
    public class GEkoCfuItem : IGObject
    {
        #region Init
        //---------------------------------------------------------------------
        /// <summary>Konstruktor EkoCfu</summary>
        public GEkoCfuItem()
        {
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Provede naètení z jiné instance (klon)
        /// </summary>
        /// <param name="SourceObj">zdrojový objekt</param>
        public void LoadFrom(GEkoCfuItem SourceObj)
        {
            //m_rok.DbValue = SourceObj.Rok.DbValue;
            //m_cfu.DbValue = SourceObj.Cfu.DbValue;
            m_urovenNum.DbValue = SourceObj.UrovenNum.DbValue;
            m_uroven.DbValue = SourceObj.Uroven.DbValue;
            m_dbNazev.DbValue = SourceObj.DbNazev.DbValue;
            m_nazev.DbValue = SourceObj.Nazev.DbValue;
            m_zkratka.DbValue = SourceObj.Zkratka.DbValue;
            m_poradi.DbValue = SourceObj.Poradi.DbValue;
            m_pouziti.DbValue = SourceObj.Pouziti.DbValue;
            m_urovenDos.DbValue = SourceObj.UrovenDos.DbValue;
            m_prazdny.DbValue = SourceObj.Prazdny.DbValue;
            m_zobrazovany.DbValue = SourceObj.Zobrazovany.DbValue;
            m_delka.DbValue = SourceObj.Delka.DbValue;
            m_delkaDb.DbValue = SourceObj.DelkaDb.DbValue;
            m_urovenGinis.DbValue = SourceObj.UrovenGinis.DbValue;
            m_atribut.DbValue = SourceObj.Atribut.DbValue;
            m_prizLik.DbValue = SourceObj.PrizLik.DbValue;
            m_prizKry.DbValue = SourceObj.PrizKry.DbValue;
        }// end method

        #endregion
        #region Vlastnosti
        //---------------------------------------------------------------------
        private GInt32 m_delka = new GInt32();				// INT NULL,
        /// <summary>Maximální délka øetìzce zadávaného do položky rozpoètové vìty ve znacích</summary>
        public GInt32 Delka
        {
            get { return m_delka; }
            set { m_delka = value; }
        }

        //---------------------------------------------------------------------
        private GInt32 m_delkaDb = new GInt32(0);			// INT DEFAULT 0   NOT NULL,
        /// <summary>Maximální délka alokovaná v DB pro položku rozpoètové vìty (vždy musí být >= Delka)</summary>
        public GInt32 DelkaDb
        {
            get { return m_delkaDb; }
            set { m_delkaDb = value; }
        }

        //---------------------------------------------------------------------
        private GInt32 m_urovenNum = new GInt32(0);			// INT DEFAULT 0   NOT NULL,
        /// <summary>Úroveò (èíslo) 1 až 15</summary>
        public GInt32 UrovenNum
        {
            get { return m_urovenNum; }
            set { m_urovenNum = value; }
        }

        //---------------------------------------------------------------------
        private GString m_uroven = new GString(1);			// VARCHAR2(1) NULL,
        /// <summary>Úroveò, poslední znak z DbNazev (a-j,0-5)</summary>
        public GString Uroven
        {
            get { return m_uroven; }
            set { m_uroven = value; }
        }

        //---------------------------------------------------------------------
        private GString m_dbNazev = new GString(3);			// VARCHAR2(3) NULL,
        /// <summary>Název sloupce v DB (uea...) který odpovídá této položce rozpoètové vìty</summary>
        public GString DbNazev
        {
            get { return m_dbNazev; }
            set { m_dbNazev = value; }
        }

        //---------------------------------------------------------------------
        private GString m_nazev = new GString(50);			// VARCHAR2(50) NULL,
        /// <summary>Název položky rozpoètové vìty</summary>
        public GString Nazev
        {
            get { return m_nazev; }
            set { m_nazev = value; }
        }

        //---------------------------------------------------------------------
        private GString m_zkratka = new GString(16);			// VARCHAR2(16) NULL,
        /// <summary>Zkratka položky rozpoètové vìty (tohle se používá pro popis políèek v prezentaèní vrstvì)</summary>
        public GString Zkratka
        {
            get { return m_zkratka; }
            set { m_zkratka = value; }
        }

        //---------------------------------------------------------------------
        private GInt32 m_poradi = new GInt32();				// INT NULL,
        /// <summary>Poøadí urèuje v jakém poøadí se mají jednotlivé položky rozpoètové vìty zobrazovat - ta s nejnižším èíslem "Poradi" se má zobrazit první, ta s nejvyšším poslední.</summary>
        public GInt32 Poradi
        {
            get { return m_poradi; }
            set { m_poradi = value; }
        }

        //---------------------------------------------------------------------
        private GInt32 m_pouziti = new GInt32(0);			// INT DEFAULT 0   NOT NULL,
        /// <summary>Urèuje, zda se má položka zobrazovat a plnit (1) èi nemá (0).</summary>
        public GInt32 Pouziti
        {
            get { return m_pouziti; }
            set { m_pouziti = value; }
        }

        //---------------------------------------------------------------------
        private GString m_urovenDos = new GString(1);			// VARCHAR2(1) NULL,
        /// <summary>Úroveò v modulech DOS - odpovídající úrovìò v øadì G0; Používá se v CFS</summary>
        public GString UrovenDos
        {
            get { return m_urovenDos; }
            set { m_urovenDos = value; }
        }
        //---------------------------------------------------------------------
        private GString m_urovenGinis = new GString("0", 2);		// VARCHAR2(2) DEFAULT '0'   NOT NULL,
        /// <summary>Úroveò v modulech Ginis - odpovídající úrovìò v øadì G1; Používá se v CFS</summary>
        public GString UrovenGinis
        {
            get { return m_urovenGinis; }
            set { m_urovenGinis = value; }
        }
        //---------------------------------------------------------------------
        private GString m_atribut = new GString("0", 1);		// VARCHAR2(1) DEFAULT '0'   NOT NULL,
        /// <summary>Technologická zkratka (SAKRPZUJO); Používá se v CFS</summary>
        public GString Atribut
        {
            get { return m_atribut; }
            set { m_atribut = value; }
        }

        //---------------------------------------------------------------------
        private GString m_prazdny = new GString(30);			//30.5.2024 zmìnìo z 16 na 30
        /// <summary>Nuly vyskládané na délku Delka; Používá se pro ukládání hodnot nepoužívaných slov (Pouziti=0 apod.)</summary>
        public GString Prazdny
        {
            get { return m_prazdny; }
            set { m_prazdny = value; }
        }

        //---------------------------------------------------------------------
        private GString m_zobrazovany = new GString(30);		//30.5.2024 zmìnìo z 16 na 30
        /// <summary>Maska pro zobrazování daného slova. Vyskládané nuly na délku, kterou se má slovo zobrazovat; Používá poøizovaèka</summary>
        public GString Zobrazovany
        {
            get { return m_zobrazovany; }
            set { m_zobrazovany = value; }
        }

        //---------------------------------------------------------------------
        private GInt32 m_prizLik = new GInt32(0);			//INT DEFAULT 0   NOT NULL,
        /// <summary>Pøíznak zobrazení sloupcù úèetní vìty v poøizovaèi likvidace</summary>
        /// <remarks>SELECT priz_lik FROM vas.ekodcfu</remarks>
        public GInt32 PrizLik
        {
            get { return m_prizLik; }
            set { m_prizLik = value; }
        }

        //---------------------------------------------------------------------
        private GInt32 m_prizKry = new GInt32(0);
        /// <summary>Pøíznak zobrazení sloupcù úèetní vìty v poøizovaèi krytí</summary>
        /// <remarks>SELECT priz_kry FROM vas.ekodcfu</remarks>
        public GInt32 PrizKry
        {
            get { return m_prizKry; }
            set { m_prizKry = value; }
        }

        #endregion
    }
}
