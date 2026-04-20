//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEkoParams.cs                                </Name>
//    <Description> EKO parametry (hodnoty UCS, NKS, Obdobi, atd...)            </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-10-29                                                  </Created>
//  </FileHeader>

using System;
using Gordic.General;


namespace Gordic.General
{
	/// <summary>
	/// EKO parametry (hodnoty UCS, NKS, Obdobi, atd...)
	/// Parametry jsou typu IGDbType
	/// </summary>
    [Serializable]
    public class GEkoParams : IGObject
    {
        #region Init
        /// <summary>Konstruktor</summary>
        public GEkoParams()
        {
            m_oEkoCfuSet = new GEkoCfuSet(this);
        }

        private void _c<T>(ref T t, T f) where T : GDbType
        {
            if (t == f) return;

            if (t.IsReadOnly) 
                t = GDbType.Clone(f);
            else
                t.DbValue = f.DbValue;
        }

        /// <summary>
        /// Nahraje hodnoty z jiného objektu téhož typu (zdroj nesmí být null)
        /// </summary>
        /// <param name="source">zdrojový objekt</param>
        public void LoadFrom(GEkoParams source)
        {
            if (source != null)
            {
                // ----------------------------------------------------
                _c(ref m_rok, source.Rok);
                _c(ref m_roksuzo, source.RokStavUzo);
                _c(ref m_mesic, source.Mesic);

                _c(ref m_ico, source.Ico);
                _c(ref m_ucs, source.Ucs);
                _c(ref m_uus, source.Uus);
                _c(ref m_nks, source.Nks);
                _c(ref m_prizIsl, source.PrizIsl);
                _c(ref m_nksVl, source.NksVl);
                _c(ref m_icoPopis, source.IcoPopis);
                _c(ref m_ucsPopis, source.UcsPopis);
                _c(ref m_uusPopis, source.UusPopis);
                _c(ref m_nksPopis, source.NksPopis);

                _c(ref m_ixpDen, source.IxpDen);
                _c(ref m_NazevDen, source.Kniha);
                _c(ref m_aktDen, source.AktDen);
                _c(ref m_ktgDen, source.KtgDen);
                _c(ref m_typDen, source.TypDen);
                _c(ref m_rokDen, source.RokDen);
                _c(ref m_ZkratkaDen, source.ZkratkaDen);

                _c(ref m_subrada, source.Subrada);
                _c(ref m_aktSubrady, source.AktSubrady);
                _c(ref m_ixsVpk, source.IxsVpk);

                _c(ref m_ixsTyp, source.IxsTyp);
                _c(ref m_drd, source.Drd);
                _c(ref m_ixsSor, source.IxsSor);

                _c(ref m_cfu, source.Cfu);
                _c(ref m_prizRoz, source.PrizRoz);
                _c(ref m_ixsRoz, source.IxsRoz);
                _c(ref m_ixsSax, source.IxsSax);
                _c(ref m_ktgSax, source.KtgSax);
                _c(ref m_ktgSaxVerze, source.KtgSaxVerze);
                _c(ref m_prizNpv, source.PrizNpv);
                _c(ref m_prizIissp, source.PrizIissp);
                _c(ref m_blockIissp, source.BlockIissp);
                _c(ref m_PrizKons, source.PrizKons);
                _c(ref m_prizCheckUete, source.PrizCheckUete);

                _c(ref m_dphPlatce, source.DphPlatce);
                _c(ref m_dphDatOd, source.DphDatOd);
                _c(ref m_dphDdatDo, source.DphDdatDo);
                _c(ref m_dphPlatceText, source.DphPlatceText);
                _c(ref m_dphText, source.DphText);

                _c(ref m_typPhl, source.TypPhl);
                _c(ref m_cisSpr, source.CisSpr);
                _c(ref m_rokPhl, source.RokPhl);

                _c(ref m_typFun, source.TypFun);
                _c(ref m_kompBal, source.KompBal);

                m_oEkoCfuSet.LoadFrom(source.EkoCfuSet); //nastavi m_oSortedSet=null, protoze se vyvola CfuSetChanged
                if (source.m_oSortedSet != null) { m_oSortedSet = new GEkoCfuSet(); m_oSortedSet.LoadFrom(source.m_oSortedSet); }

                m_Loaded = source.Loaded;
            }
        }
        #endregion
        #region Properties
        //------------------------------------------------------------------
        // OBDOBI

        private GInt16 m_rok = new GInt16();
        /// <summary>Rok</summary>
        public GInt16 Rok  //MAL 32->16
        {
            get { return m_rok; }
            set { m_rok = value; }
        }
        private GInt16 m_roksuzo = new GInt16();
        /// <summary>Stav období</summary>
        /// <remarks>s_uzo z tabulky uctvude</remarks>
        public GInt16 RokStavUzo
        {
            get { return m_roksuzo; }
            set { m_roksuzo = value; }
        }
        /// <summary>Pøíznak odlití úèetního deníku v daném období (rok)</summary>
        /// <remarks>RokStavUzo==500</remarks>
        public bool RokStavArchivovano
        {
            get { return RokStavUzo == 500; }
        }
        private GInt16 m_mesic = new GInt16();
        /// <summary>Mìsíc</summary>
        public GInt16 Mesic
        {
            get { return m_mesic; }
            set { m_mesic = value; }
        }

        //------------------------------------------------------------------
        // TOPOLOGIE

        private GString m_ico = new GString(10);
        /// <summary>IÈ</summary>
        public GString Ico
        {
            get { return m_ico; }
            set { m_ico = value; }
        }
        private GString m_ucs = new GString(10);
        /// <summary>UCS</summary>
        public GString Ucs
        {
            get { return m_ucs; }
            set { m_ucs = value; }
        }
        private GString m_uus = new GString(12);
        /// <summary>UUS</summary>
        public GString Uus
        {
            get { return m_uus; }
            set { m_uus = value; }
        }
        private GString m_nks = new GString(12);
        /// <summary>NKS</summary>
        public GString Nks
        {
            get { return m_nks; }
            set { m_nks = value; }
        }
        private GInt16 m_prizIsl = new GInt16();
        /// <summary>Pøíznak vazby na Isl (vázáno na vybrané NKS)</summary>
        public GInt16 PrizIsl
        {
            get { return m_prizIsl; }
            set { m_prizIsl = value; }
        }

        private GString m_nksVl = new GString(12);
        /// <summary>Vlastní nákladové støedisko úè.støediska</summary>
        public GString NksVl
        {
            get { return m_nksVl; }
            set { m_nksVl = value; }
        }

        private GString m_icoPopis = new GString(250);
        /// <summary>Ico - textový popis</summary>
        public GString IcoPopis
        {
            get { return m_icoPopis; }
            set { m_icoPopis = value; }
        }
        private GString m_ucsPopis = new GString(250);
        /// <summary>UCS - textový popis</summary>
        public GString UcsPopis
        {
            get { return m_ucsPopis; }
            set { m_ucsPopis = value; }
        }
        private GString m_uusPopis = new GString(250);
        /// <summary>Uus - textový popis</summary>
        public GString UusPopis
        {
            get { return m_uusPopis; }
            set { m_uusPopis = value; }
        }
        private GString m_nksPopis = new GString(250);
        /// <summary>Nks - textový popis</summary>
        public GString NksPopis
        {
            get { return m_nksPopis; }
            set { m_nksPopis = value; }
        }

        //------------------------------------------------------------------
        // KNIHA

        private GString m_ixpDen = new GString(12);
        /// <summary>Kniha (PID)</summary>
        public GString IxpDen
        {
            get { return m_ixpDen; }
            set { m_ixpDen = value; }
        }
        private GString m_NazevDen = new GString(50);
        /// <summary>Kniha - nazev</summary>
        /// <remarks>SELECT nazev from vas.xxxsden; Jméno knihy v agendové tabulce</remarks>
        public GString Kniha
        {
            get { return m_NazevDen; }
            set { m_NazevDen = value; }
        }
        private GInt16 m_aktDen = new GInt16();
        /// <summary>Aktivita knihy</summary>
        /// <remarks>SELECT aktivita from vas.xxxsden; viz. ekocakr; mùže být 100,300,400,500</remarks>
        public GInt16 AktDen
        {
            get { return m_aktDen; }
            set { m_aktDen = value; }
        }
        /// <summary>Pøíznak odlití knihy</summary>
        /// <remarks>AktDen==500</remarks>
        public bool AktDenArchivovano
        {
            get { return AktDen == 500; }
        }
        private GInt16 m_ktgDen = new GInt16(); //MAL 32->16
        /// <summary>Kategorie knihy v agendové tabulce (pro agendy, které mají více knih. Napø. SML:kniha smluv, kniha objednávek atd.)</summary>
        /// <remarks>SELECT ktg_den from vas.xxxsden; Kategorie knihy v agendové tabulce (xxxcktd)</remarks>
        public GInt16 KtgDen
        {
            get { return m_ktgDen; }
            set { m_ktgDen = value; }
        }
        private GInt16 m_typDen = new GInt16();
        /// <summary>Typ øady v knize, mìsíèní nebo roèní øada.</summary>
        /// <remarks>SELECT typ_den from vas.xxxsden; Typ øady v knihy v agendové tabulce (ekoctyd)</remarks>
        public GInt16 TypDen
        {
            get { return m_typDen; }
            set { m_typDen = value; }
        }
        private GInt32 m_rokDen = new GInt32();
        /// <summary>Rok knihy</summary>
        public GInt32 RokDen
        {
            get { return m_rokDen; }
            set { m_rokDen = value; }
        }
        private GString m_ZkratkaDen = new GString(16);
        /// <summary>Zkratka subøady vázané ke knize; Vybírá se souèasnì s knihou ve výbìru knihy</summary>
        public GString ZkratkaDen
        {
            get { return m_ZkratkaDen; }
            set { m_ZkratkaDen = value; }
        }        
        private GInt16 m_subrada = new GInt16();
        /// <summary>Subøada vázaná ke knize; Vybírá se souèasnì s knihou ve výbìru knihy</summary>
        public GInt16 Subrada
        {
            get { return m_subrada; }
            set { m_subrada = value; }
        }
        private GInt16 m_aktSubrady = new GInt16();
        /// <summary>Aktivita subøady vázané ke knize; Vybírá se souèasnì s knihou a subøadou</summary>
        public GInt16 AktSubrady
        {
            get { return m_aktSubrady; }
            set { m_aktSubrady = value; }
        }
        private GString m_ixsVpk = new GString(12);
        /// <summary>Varianta pøedkontací; Standartní EkoInit toto nevybírá! Nutné pøetížení.</summary>
        /// <remarks>SELECT ixs_vpk FROM vas.majsden; pøípadnì z vazební tabulky napø. KDF,...</remarks>
        public GString IxsVpk
        {
            get { return m_ixsVpk; }
            set { m_ixsVpk = value; }
        }

        //------------------------------------------------------------------
        // JEN SI PAMATUJE (neplni se)

        private GString m_ixsTyp = new GString(12);
        /// <summary>Typu dokladu (naposledny použítý v agendì); EkoInit neplní mimo uschovování hodnoty do ekonini</summary>
        public GString IxsTyp
        {
            get { return m_ixsTyp; }
            set { m_ixsTyp = value; }
        }
        private GInt16 m_drd = new GInt16();
        /// <summary>Druh dokladu (naposledny použítý v agendì); EkoInit neplní mimo uschovování hodnoty do ekonini</summary>
        public GInt16 Drd
        {
            get { return m_drd; }
            set { m_drd = value; }
        }
        private GString m_ixsSor = new GString(12);
        /// <summary>Sor (naposledny použítý v agendì); EkoInit neplní mimo uschovování hodnoty do ekonini</summary>
        public GString IxsSor
        {
            get { return m_ixsSor; }
            set { m_ixsSor = value; }
        }

        //------------------------------------------------------------------
        // CFU, CFS, rozvrh

        private GString m_cfu = new GString(1);
        /// <summary>CFU pøihlášeného IÈa (jeden znak)</summary>
        /// <remarks>SELECT cfu from vas.ekosico</remarks>
        public GString Cfu
        {
            get { return m_cfu; }
            set { m_cfu = value; }
        }
        private GInt16 m_prizRoz = new GInt16(); //MAL zmena 32->16
        /// <summary>Pøíznak rozvrhu</summary>
        /// <remarks>SELECT priz_roz FROM vas.ekosico; Urèuje z které tabulky se hledá ixs_roz. 0=vazna na UCS(uctvroz), 10=vazba na NKS(uctvrns).</remarks>
        public GInt16 PrizRoz
        {
            get { return m_prizRoz; }
            set { m_prizRoz = value; }
        }
        private GString m_ixsRoz = new GString(12);
        /// <summary>Ixs rozvrhu</summary>
        public GString IxsRoz
        {
            get { return m_ixsRoz; }
            set { m_ixsRoz = value; }
        }

        private GString m_ixsSax = new GString(12);
        /// <summary>Pid CFS</summary>
        public GString IxsSax
        {
            get { return m_ixsSax; }
            set { m_ixsSax = value; }
        }
        private GString m_ktgSax = new GString(12);
        /// <summary>Kategorie CFS (urèení CFS - napø. OSS, PO, ...)</summary>
        public GString KtgSax // GString(12)
        {
            get { return m_ktgSax; }
            set { m_ktgSax = value; }
        }
        private GString m_ktgSaxVerze = new GString(12);
        /// <summary>Verze CFS</summary>
        public GString KtgSaxVerze // GString(12)
        {
            get { return m_ktgSaxVerze; }
            set { m_ktgSaxVerze = value; }
        }

        private GInt16 m_prizNpv = new GInt16();
        /// <summary>Pøíznak oddìleného sledování pøíjmù a výdajù (od 360) (0=nesledovat, 1=sledovat)</summary>
        /// <remarks>SELECT priz_npv FROM vas.ekodico</remarks>
        public GInt16 PrizNpv
        {
            get { return m_prizNpv; }
            set { m_prizNpv = value; }
        }

        private GInt16 m_prizIissp = new GInt16();
        /// <summary>Pøíznak zda organizace v daném roce komunikuje se systémem Státní pokladny (IISSP)</summary>
        /// <remarks>SELECT priz_iissp FROM vas.ekodico</remarks>
        public GInt16 PrizIissp
        {
            get { return m_prizIissp; }
            set { m_prizIissp = value; }
        }
        private GInt16 m_blockIissp = new GInt16();
        /// <summary>Pøíznak zda je blokována komunikace se systémem Státní pokladny (IISSP)</summary>
        /// <remarks>SELECT blok_iissp FROM vas.ekosucs</remarks>
        public GInt16 BlockIissp
        {
            get { return m_blockIissp; }
            set { m_blockIissp = value; }
        }

        private GInt16 m_PrizKons = new GInt16();
        /// <summary>Pøíznak zda organizace v daném roce provádí konsolidaci</summary>
        /// <remarks>SELECT priz_kons FROM vas.ekodico</remarks>
        public GInt16 PrizKons
        {
            get { return m_PrizKons; }
            set { m_PrizKons = value; }
        }

        private GInt16 m_prizCheckUete = new GInt16();
        /// <summary>Pøíznak zda organizace v daném roce úètuje jen èíslicemi nebo èíslicemi+písmeny</summary>
        /// <remarks>SELECT priz_check_uete FROM vas.ekodico</remarks>
        public GInt16 PrizCheckUete
        {
            get { return m_prizCheckUete; }
            set { m_prizCheckUete = value; }
        }


        //------------------------------------------------------------------
        //DPH

        private GInt16 m_dphPlatce = new GInt16();
        /// <summary>Typ plátce DPH (viz ekocpdp) k AKTUÁLNÍMU datu (nikoli období do kterého se hlásí)</summary>
        /// <remarks>SELECT platce_dph FROM vas.ekodpdp</remarks>
        public GInt16 DphPlatce // GInt16
        {
            get { return m_dphPlatce; }
            set { m_dphPlatce = value; }
        }
        private GDateTime m_dphDatOd = new GDateTime();
        /// <summary>Od kdy je IÈO plátce DPH k AKTUÁLNÍMU datu (nikoli období do kterého se hlásí)</summary>
        /// <remarks>SELECT dat_od FROM vas.ekodpdp</remarks>
        public GDateTime DphDatOd //GDateTime
        {
            get { return m_dphDatOd; }
            set { m_dphDatOd = value; }
        }
        private GDateTime m_dphDdatDo = new GDateTime();
        /// <summary>Do kdy je IÈO plátce DPH k AKTUÁLNÍMU datu (nikoli období do kterého se hlásí)</summary>
        /// <remarks>SELECT dat_do FROM vas.ekodpdp</remarks>
        public GDateTime DphDdatDo //GDateTime
        {
            get { return m_dphDdatDo; }
            set { m_dphDdatDo = value; }
        }
        private GString m_dphPlatceText = new GString(50);
        /// <summary>Textová reprezentace <see cref="DphPlatce"/>. Typ plátce DPH k AKTUÁLNÍMU datu (nikoli období do kterého se hlásí)</summary>
        /// <remarks>SELECT platce_dph_txt FROM vas.ekocpdp</remarks>
        public GString DphPlatceText // GString(12)
        {
            get { return m_dphPlatceText; }
            set { m_dphPlatceText = value; }
        }
        private GString m_dphText = new GString(150);
        /// <summary>Seskládaný text urèený k reprezentaci plátcovství DPH</summary>
        /// <remarks>DphPlatceText &lt;DphDatOd,DphDdatDo&gt;</remarks>
        public GString DphText // GString(150)
        {
            get { return m_dphText; }
            set { m_dphText = value; }
        }

        //------------------------------------------------------------------
        //DDP vlastnosti
        //ekonini	typ_phl	CHAR(4)	0	NULL
        private GString m_typPhl = new GString(4);
        /// <summary>DDP Typ pohledávky</summary>
        public GString TypPhl // GString(4)
        {
            get { return m_typPhl; }
            set { m_typPhl = value; }
        }
        //ekonini	cis_spr	CHAR(10)	0	NULL
        private GString m_cisSpr = new GString(10);
        /// <summary>DDP Èíslo správce pohledávek</summary>
        public GString CisSpr // GString(10)
        {
            get { return m_cisSpr; }
            set { m_cisSpr = value; }
        }
        //ekonini	rok_phl	SMALLINT	0	NULL
        private GInt16 m_rokPhl = new GInt16();
        /// <summary>DDP Rok pohledávky</summary>
        public GInt16 RokPhl
        {
            get { return m_rokPhl; }
            set { m_rokPhl = value; }
        }

        //------------------------------------------------------------------
        //ekotgpr typ_fun CHAR(12)    0	NULL
        private GString m_typFun = new GString(12);
        /// <summary>typ funkèního místa (MAJ BIS)</summary>
        public GString TypFun
        {
            get { return m_typFun; }
            set { m_typFun = value; }
        }

        //------------------------------------------------------------------
        //není to v gtpr tabulce 
        private GString m_kompBal = new GString(10);
        /// <summary>Balanèní kompetence</summary>
        public GString KompBal
        {
            get { return m_kompBal; }
            set { m_kompBal = value; }
        }


        //------------------------------------------------------------------
        private bool m_Loaded = false;
        /// <summary>Nahrano</summary>
        public bool Loaded
        {
            get { return m_Loaded; }
            set { m_Loaded = value; }
        }

        //------------------------------------------------------------------
        private GEkoCfuSet m_oEkoCfuSet;
        /// <summary>Sada položek z EKOSCFU</summary>
        public GEkoCfuSet EkoCfuSet { get { return m_oEkoCfuSet; } }

        internal void CfuSetChanged()
        {
            m_oSortedSet = null;
        }

        [NonSerialized]
        private GEkoCfuSet m_oSortedSet = null;
        /// <summary>Kolekce EkoCfu (konfigurace rozpoètové vìty) seøazená tak, že na prvním indexu je první položka (podle položky "Poradi")</summary>
        public GEkoCfuSet SortedEkoCfuSet { get { if (m_oSortedSet == null) m_oSortedSet = SortEkoCfuSet(EkoCfuSet); return m_oSortedSet; } }

        #endregion
        #region Public methods

        /// <summary>Setøídí dle poøadí a vyjme ty co nemají použití 1</summary>
        public static GEkoCfuSet SortEkoCfuSet(GEkoCfuSet srcset)
        {
            GEkoCfuSet SortetEkoscfu = new GEkoCfuSet();
            GEkoCfuItem l_oNextItem = null;
            int l_nLastMin = -1;
            while (true)
            {
                //Najdu položku EkoCfuSet s nejmenším poøadím
                int l_oMinPoradi = 999;
                foreach (GEkoCfuItem ekoCfuItem in srcset)
                {
                    if (ekoCfuItem.Pouziti.BaseValue == 1 && ekoCfuItem.Poradi < l_oMinPoradi && ekoCfuItem.Poradi > l_nLastMin)
                    {
                        l_oNextItem = ekoCfuItem;
                        l_oMinPoradi = ekoCfuItem.Poradi;
                    }// end if
                }// end for
                //Nenašel jsem žádnou, konec
                if (l_oMinPoradi == 999) break;
                //Našel jsem, zapamatuji si 
                l_nLastMin = l_oMinPoradi;
                SortetEkoscfu.Add(l_oNextItem);
            }//end while
            return SortetEkoscfu;
        }

        /// <summary>Setøídí dle poøadí</summary>
        public static GEkoCfuSet SortEkoCfuSetAll(GEkoCfuSet srcset)
        {
            GEkoCfuSet SortetEkoscfu = new GEkoCfuSet();
            GEkoCfuItem l_oNextItem = null;
            int l_nLastMin = -1;
            while (true)
            {
                //Najdu položku EkoCfuSet s nejmenším poøadím
                int l_oMinPoradi = 999;
                foreach (GEkoCfuItem ekoCfuItem in srcset)
                {
                    if (ekoCfuItem.Poradi < l_oMinPoradi && ekoCfuItem.Poradi > l_nLastMin)
                    {
                        l_oNextItem = ekoCfuItem;
                        l_oMinPoradi = ekoCfuItem.Poradi;
                    }// end if
                }// end for
                //Nenašel jsem žádnou, konec
                if (l_oMinPoradi == 999) break;
                //Našel jsem, zapamatuji si 
                l_nLastMin = l_oMinPoradi;
                SortetEkoscfu.Add(l_oNextItem);
            }//end while
            return SortetEkoscfu;
        }

        /// <summary>Serializace do stringu</summary>
        public string SerializeToString()
        {
            System.Runtime.Serialization.Formatters.Binary.BinaryFormatter formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
            formatter.AssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple;
            formatter.TypeFormat = System.Runtime.Serialization.Formatters.FormatterTypeStyle.TypesWhenNeeded;
            System.IO.MemoryStream str = new System.IO.MemoryStream();
            formatter.Serialize(str, this);
            return Convert.ToBase64String(str.ToArray());
        }
        /// <summary>Deserializace ze stringu</summary>
        public static GEkoParams FromSerializedString(string serialized)
        {
            System.Runtime.Serialization.Formatters.Binary.BinaryFormatter formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
            formatter.AssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple;
            formatter.TypeFormat = System.Runtime.Serialization.Formatters.FormatterTypeStyle.TypesWhenNeeded;
            System.IO.MemoryStream str = new System.IO.MemoryStream(Convert.FromBase64String(serialized));
            return (GEkoParams)formatter.Deserialize(str);
        }
        #endregion
    }
}
