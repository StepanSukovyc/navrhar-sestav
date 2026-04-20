/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ginis.dbmodel.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gordic.Ginis.DbModel.csproj
*    created     2026-02-16 14:33:44
*    files       Base\GEnumMetaDto.d.ts
*                Eko\GEkocizpDto.d.ts
*                Eko\GEkocmenDto.d.ts
*                Eko\GEkoctiiDto.d.ts
*                Gin\GGincaibDto.d.ts
*                Gin\GGincaivDto.d.ts
*                Gin\GGincaktDto.d.ts
*                Gin\GGincargDto.d.ts
*                Gin\GGincblgDto.d.ts
*                Gin\GGincclbDto.d.ts
*                Gin\GGinccluDto.d.ts
*                Gin\GGincctxDto.d.ts
*                Gin\GGincdatDto.d.ts
*                Gin\GGincesuDto.d.ts
*                Gin\GGinckulDto.d.ts
*                Gin\GGinclapDto.d.ts
*                Gin\GGinclgcDto.d.ts
*                Gin\GGinclmaDto.d.ts
*                Gin\GGinclmkDto.d.ts
*                Gin\GGinclpsDto.d.ts
*                Gin\GGinclvyDto.d.ts
*                Gin\GGinclzpDto.d.ts
*                Gin\GGincpanDto.d.ts
*                Gin\GGincpdoDto.d.ts
*                Gin\GGincpinDto.d.ts
*                Gin\GGincpodDto.d.ts
*                Gin\GGincpopDto.d.ts
*                Gin\GGincstuDto.d.ts
*                Gin\GGincsvyDto.d.ts
*                Gin\GGinctagDto.d.ts
*                Gin\GGincthmDto.d.ts
*                Gin\GGinctpoDto.d.ts
*                Gin\GGinctydDto.d.ts
*                Gin\GGinczmpDto.d.ts
*                Gin\GGinczulDto.d.ts
*                Gin\GGinsaibDto.d.ts
*                Gin\GGinskalDto.d.ts
*                Iissp\GZpusobVolaniDto.d.ts
*                Spi\GSpicsulDto.d.ts
*                Ssl\GSslcekdDto.d.ts
*                Ssl\GSslcekeDto.d.ts
*                Ssl\GSslcekmDto.d.ts
*                Ssl\GSslcekpDto.d.ts
*                Ssl\GSslceksDto.d.ts
*                Ssl\GSslcektDto.d.ts
*                Ssl\GSslcepkDto.d.ts
*                Ssl\GSslcspiDto.d.ts
*                Ssl\GSslcsprDto.d.ts
*                Ssl\GSslcstaDto.d.ts
*                Ssl\GSslctvyDto.d.ts
*                Ssl\GSslcvspDto.d.ts
*                Wfl\GWflcannDto.d.ts
*                Wfl\GWflcdrzDto.d.ts
*                Wfl\GWflceleDto.d.ts
*                Wfl\GWflcfyzDto.d.ts
*                Wfl\GWflcpakDto.d.ts
*                Wfl\GWflcpcjDto.d.ts
*                Wfl\GWflcpriDto.d.ts
*                Wfl\GWflcpuvDto.d.ts
*                Wfl\GWflcrevDto.d.ts
*                Wfl\GWflcscjDto.d.ts
*                Wfl\GWflcsdoDto.d.ts
*                Wfl\GWflcsezDto.d.ts
*                Wfl\GWflcsgnDto.d.ts
*                Wfl\GWflcsprDto.d.ts
*                Wfl\GWflcsslDto.d.ts
*                Wfl\GWflcstaDto.d.ts
*                Wfl\GWflcstpDto.d.ts
*                Wfl\GWflctarDto.d.ts
*                Wfl\GWflctddDto.d.ts
*                Wfl\GWflctdoDto.d.ts
*                Wfl\GWflctduDto.d.ts
*                Wfl\GWflctelDto.d.ts
*                Wfl\GWflctkoDto.d.ts
*                Wfl\GWflctobDto.d.ts
*                Wfl\GWflctpzDto.d.ts
*                Wfl\GWflcttiDto.d.ts
*                Wfl\GWflctysDto.d.ts
*                Wfl\GWflcumpDto.d.ts
*                Wfl\GWflcuprDto.d.ts
*                Wfl\GWflcvlaDto.d.ts
*                Wfl\GWflczexDto.d.ts
*                Wfl\GWflczktDto.d.ts
*                Wfl\GWflczmeDto.d.ts
*                Wfl\GWflczpdDto.d.ts
*                Wfl\GWflspidBaseDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Base\GEnumMetaDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    interface GEnumMetaDto<TValue, TMeta> {
        name: string;
        value: TValue;
        meta: TMeta;
        keys: string[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Eko\GEkocizpDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ekocizp*/
	interface GEkocizpDto {
		/**DBCOLUMN:ekocizp.zp*/
		zp?: number|null;
		/**DBCOLUMN:ekocizp.zp_txt*/
		zp_txt?: string|null;
		/**DBCOLUMN:ekocizp.zp_zkr*/
		zp_zkr?: string|null;
		/**DBCOLUMN:ekocizp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekocizp.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekocizp.s_prijem*/
		s_prijem?: number|null;
		/**DBCOLUMN:ekocizp.s_vydaj*/
		s_vydaj?: number|null;
		/**DBCOLUMN:ekocizp.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:ekocizp.zp_txt_v*/
		zp_txt_v?: string|null;
		/**DBCOLUMN:ekocizp.zp_txt_p*/
		zp_txt_p?: string|null;
		/**DBCOLUMN:ekocizp.zp_isdoc*/
		zp_isdoc?: number|null;
	}
	const enum GEkocizpDtoNames { zp = "zp", zp_txt = "zp_txt", zp_zkr = "zp_zkr", k_v = "k_v", k_s = "k_s", s_prijem = "s_prijem", s_vydaj = "s_vydaj", k_xml = "k_xml", zp_txt_v = "zp_txt_v", zp_txt_p = "zp_txt_p", zp_isdoc = "zp_isdoc",}
	const enum GEkocizpDtoFragments { zp = "*", zp_txt = "*", zp_zkr = "*", k_v = "*", k_s = "*", s_prijem = "*", s_vydaj = "*", k_xml = "*", zp_txt_v = "*", zp_txt_p = "*", zp_isdoc = "*",}
	const enum GEkocizpDtoTypes { zp = "number", zp_txt = "string", zp_zkr = "string", k_v = "number", k_s = "string", s_prijem = "number", s_vydaj = "number", k_xml = "string", zp_txt_v = "string", zp_txt_p = "string", zp_isdoc = "number",}
	const enum GEkocizpDtoTypeLengths { zp_txt = 50, zp_zkr = 3, k_s = 15, k_xml = 254, zp_txt_v = 50, zp_txt_p = 50,}
	/**ENUM:ekocizp*/
	const enum GEkocizpEnum {
		/**neurčeno*/
		neurceno=0,
		/**hotově*/
		hotove=10,
		/**hromadným příkazem*/
		hromadny_prikaz=20,
		/**jednoduchým příkazem*/
		jednoduchy_prikaz=30,
		/**platba do SR v Kč ( výjimka ČNB )*/
		prikaz_sr=31,
		/**zahraniční šek*/
		zahranicni_sek=32,
		/**inkasem*/
		inkaso=40,
		/**externím příkazem*/
		externim_prikazem=41,
		/**kompenzace*/
		kompenzace=42,
		/**složenkou typu B - služba 0*/
		slozenka_b0=50,
		/**složenkou typu B - služba 1*/
		slozenka_b1=51,
		/**složenkou typu B - služba 2*/
		slozenka_b2=52,
		/**složenkou typu B - služba 3*/
		slozenka_b3=53,
		/**složenkou typu B - služba Q*/
		slozenka_bq=54,
		/**poštovní poukázka A*/
		slozenka_av=60,
		/**Dobírkou (složenka A)*/
		slozenka_a=61,
		/**Inkaso SIPO*/
		inkaso_sipo=70,
		/**e-faktura*/
		e_faktura=72,
		/**platební brána, karta*/
		platebni_brana_karta=73,
		/**Avizace*/
		avizace=74,
		/**disketa do ČS*/
		disketa_cs=80,
		/**disketa do ČS2*/
		disketa_cs_2=81,
	}
	function GEkocizpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkocizpEnum, Gordic.Ginis.DbModel.GEkocizpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Eko\GEkocmenDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ekocmen*/
	interface GEkocmenDto {
		/**DBCOLUMN:ekocmen.mena*/
		mena?: number|null;
		/**DBCOLUMN:ekocmen.mena_txt*/
		mena_txt?: string|null;
		/**DBCOLUMN:ekocmen.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:ekocmen.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekocmen.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekocmen.mena_sis_aa*/
		mena_sis_aa?: string|null;
		/**DBCOLUMN:ekocmen.mena_sis_aaa*/
		mena_sis_aaa?: string|null;
		/**DBCOLUMN:ekocmen.mena_sis_nnn*/
		mena_sis_nnn?: number|null;
		/**DBCOLUMN:ekocmen.aktivita*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**DBCOLUMN:ekocmen.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekocmen.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekocmen.cmp*/
		cmp?: JsonDecimal|null;
		/**DBCOLUMN:ekocmen.priz_ehp*/
		priz_ehp?: number|null;
		/**DBCOLUMN:ekocmen.mena_iso4217_aaa*/
		mena_iso4217_aaa?: string|null;
		/**DBCOLUMN:ekocmen.mena_iso4217_nnn*/
		mena_iso4217_nnn?: number|null;
		/**DBCOLUMN:ekocmen.zeme*/
		zeme?: string|null;
	}
	const enum GEkocmenDtoNames { mena = "mena", mena_txt = "mena_txt", mena_zkr = "mena_zkr", k_v = "k_v", k_s = "k_s", mena_sis_aa = "mena_sis_aa", mena_sis_aaa = "mena_sis_aaa", mena_sis_nnn = "mena_sis_nnn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cmp = "cmp", priz_ehp = "priz_ehp", mena_iso4217_aaa = "mena_iso4217_aaa", mena_iso4217_nnn = "mena_iso4217_nnn", zeme = "zeme",}
	const enum GEkocmenDtoFragments { mena = "*", mena_txt = "*", mena_zkr = "*", k_v = "*", k_s = "*", mena_sis_aa = "*", mena_sis_aaa = "*", mena_sis_nnn = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cmp = "*", priz_ehp = "*", mena_iso4217_aaa = "*", mena_iso4217_nnn = "*", zeme = "*",}
	const enum GEkocmenDtoTypes { mena = "number", mena_txt = "string", mena_zkr = "string", k_v = "number", k_s = "string", mena_sis_aa = "string", mena_sis_aaa = "string", mena_sis_nnn = "number", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dat_zmena = "JsonDate", zmenu_prov = "string", cmp = "JsonDecimal", priz_ehp = "number", mena_iso4217_aaa = "string", mena_iso4217_nnn = "number", zeme = "string",}
	const enum GEkocmenDtoTypeLengths { mena_txt = 50, mena_zkr = 16, k_s = 15, mena_sis_aa = 2, mena_sis_aaa = 3, zmenu_prov = 12, mena_iso4217_aaa = 3, zeme = 254,}
	/**ENUM:ekocmen*/
	const enum GEkocmenEnum {
		/**ČR*/
		MEN_CES=0,
		/**Austrálie*/
		MEN_AUS=10,
		/**Belgie*/
		MEN_BEL=20,
		/**Británie*/
		MEN_BRI=30,
		/**Dánsko*/
		MEN_DAN=40,
		/**Finsko*/
		MEN_FIN=50,
		/**Francie*/
		MEN_FRA=60,
		/**Irsko*/
		MEN_IRSP=70,
		/**Itálie*/
		MEN_ITA=80,
		/**Japonsko*/
		MEN_JAP=90,
		/**Kanada*/
		MEN_KAN=100,
		/**Lucembursko*/
		MEN_LUC=110,
		/**Nizozemsko*/
		MEN_NIZ=120,
		/**Norsko*/
		MEN_NOR=130,
		/**Nový Zéland*/
		MEN_ZEL=140,
		/**Portugalsko*/
		MEN_POR=150,
		/**Rakousko*/
		MEN_RAK=160,
		/**Řecko*/
		MEN_REC=170,
		/**Slovensko*/
		MEN_SLO=180,
		/**SRN*/
		MEN_NEM=190,
		/**Španělsko*/
		MEN_SPA=200,
		/**Švédsko*/
		MEN_SVE=210,
		/**Švýcarsko*/
		MEN_SVY=220,
		/**USA*/
		MEN_USA=230,
		/**Maďarský forint*/
		men_huf=240,
		/**EMU*/
		men_eur=250,
		/**Chorvatsko*/
		men_hrk=260,
		/**Polsko*/
		men_pln=270,
		/**Slovinsko*/
		men_sit=280,
		/**Izrael*/
		MEN_ISR=290,
		/**Alžír*/
		men_dzd=300,
		/**Hongkong*/
		men_hkd=310,
		/**Indie*/
		men_inr=320,
		/**Jižní Korea*/
		men_krw=330,
		/**Kuvajt*/
		men_kwd=340,
		/**Litva*/
		men_ltl=350,
		/**Lotyšsko*/
		men_lvl=360,
		/**Makedonie*/
		men_den=370,
		/**MMF*/
		men_xdr=380,
		/**Brazílie*/
		men_blr=390,
		/**Peru*/
		men_pen=400,
		/**Mexiko*/
		men_mxp=410,
		/**Kuvajt*/
		men_kwd2=420,
		/**SAR*/
		men_sar=430,
		/**Spojené emiráty*/
		men_aed=520,
		/**Bulharsko*/
		_30000=30000,
		/**Čína*/
		_30001=30001,
		/**Estonsko*/
		_30002=30002,
		/**Filipíny*/
		_30003=30003,
		/**Indonesie*/
		_30004=30004,
		/**Island*/
		_30005=30005,
		/**Jihoafrická rep.*/
		_30006=30006,
		/**Kypr*/
		_30007=30007,
		/**Malajsie*/
		_30008=30008,
		/**Malta*/
		_30009=30009,
		/**Rumunsko*/
		_30010=30010,
		/**Rusko*/
		_30011=30011,
		/**Singapur*/
		_30012=30012,
		/**Thajsko*/
		_30013=30013,
		/**Turecko*/
		_30014=30014,
		/**Afghánistán*/
		_30015=30015,
		/**Albánie*/
		_30016=30016,
		/**Angola*/
		_30017=30017,
		/**Argentina*/
		_30018=30018,
		/**Arménie*/
		_30019=30019,
		/**Aruba*/
		_30020=30020,
		/**Ázerbájdžán*/
		_30021=30021,
		/**Bahamy*/
		_30022=30022,
		/**Bahrajn*/
		_30023=30023,
		/**Bangladéš*/
		_30024=30024,
		/**Barbados*/
		_30025=30025,
		/**Belize*/
		_30026=30026,
		/**Bělorusko*/
		_30027=30027,
		/**Bermudy*/
		_30028=30028,
		/**Bhútán*/
		_30029=30029,
		/**Bolivie*/
		_30030=30030,
		/**Bosna a Hercegovina*/
		_30031=30031,
		/**Botswana*/
		_30032=30032,
		/**Brunej*/
		_30033=30033,
		/**Burundi*/
		_30034=30034,
		/**Cape Verde*/
		_30035=30035,
		/**Dominikánská republika*/
		_30036=30036,
		/**Džibutsko*/
		_30037=30037,
		/**Egypt*/
		_30038=30038,
		/**Eritrea*/
		_30039=30039,
		/**Etiopie*/
		_30040=30040,
		/**Falklandy*/
		_30041=30041,
		/**Fidži*/
		_30042=30042,
		/**Francouzská Polynésie*/
		_30043=30043,
		/**Gambie*/
		_30044=30044,
		/**Ghana*/
		_30045=30045,
		/**Gibraltar*/
		_30046=30046,
		/**Gruzie*/
		_30047=30047,
		/**Guatemala*/
		_30048=30048,
		/**Guinea*/
		_30049=30049,
		/**Guyana*/
		_30050=30050,
		/**Haiti*/
		_30051=30051,
		/**Honduras*/
		_30052=30052,
		/**Chile*/
		_30053=30053,
		/**Irák*/
		_30054=30054,
		/**Írán*/
		_30055=30055,
		/**Jamajka*/
		_30056=30056,
		/**Jemen*/
		_30057=30057,
		/**Jordánsko*/
		_30058=30058,
		/**Kaj manské ostrovy*/
		_30059=30059,
		/**Kambodža*/
		_30060=30060,
		/**Katar*/
		_30061=30061,
		/**Kazachstán*/
		_30062=30062,
		/**Keňa*/
		_30063=30063,
		/**KLDR*/
		_30064=30064,
		/**Kolumbie*/
		_30065=30065,
		/**Komory*/
		_30066=30066,
		/**Konžská demokratická republika*/
		_30067=30067,
		/**Kostarika*/
		_30068=30068,
		/**Kuba*/
		_30069=30069,
		/**Kuvajt*/
		_30070=30070,
		/**Kyrgyzstán*/
		_30071=30071,
		/**Laos*/
		_30072=30072,
		/**Lesotho*/
		_30073=30073,
		/**Libanon*/
		_30074=30074,
		/**Libérie*/
		_30075=30075,
		/**Libye*/
		_30076=30076,
		/**Macao*/
		_30077=30077,
		/**Madagaskar*/
		_30078=30078,
		/**Makedonie*/
		_30079=30079,
		/**Malawi*/
		_30080=30080,
		/**Maledivy*/
		_30081=30081,
		/**Maroko*/
		_30082=30082,
		/**Mauritánie*/
		_30083=30083,
		/**Mauritius*/
		_30084=30084,
		/**Mexiko*/
		_30085=30085,
		/**Moldávie*/
		_30086=30086,
		/**Mongolsko*/
		_30087=30087,
		/**Mosambik*/
		_30088=30088,
		/**Myanmar*/
		_30089=30089,
		/**Namibie*/
		_30090=30090,
		/**Nepál*/
		_30091=30091,
		/**Nigérie*/
		_30092=30092,
		/**Nikaragua*/
		_30093=30093,
		/**Nizozemské Antilly*/
		_30094=30094,
		/**Omán*/
		_30095=30095,
		/**Pákistán*/
		_30096=30096,
		/**Panama*/
		_30097=30097,
		/**Papua-Nová Quinea*/
		_30098=30098,
		/**Paraguay*/
		_30099=30099,
		/**Rwanda*/
		_30100=30100,
		/**Salvádor*/
		_30101=30101,
		/**Samoa*/
		_30102=30102,
		/**Seychely*/
		_30103=30103,
		/**Sierra-Leone*/
		_30104=30104,
		/**Somálsko*/
		_30105=30105,
		/**Srbsko*/
		_30106=30106,
		/**Srí Lanka*/
		_30107=30107,
		/**Státy střední Afriky*/
		_30108=30108,
		/**Státy západní Afriky*/
		_30109=30109,
		/**Súdán*/
		_30110=30110,
		/**Surinam*/
		_30111=30111,
		/**Svatá Helena*/
		_30112=30112,
		/**Svatý Tomáš a Princův ostrov*/
		_30113=30113,
		/**Svazijsko*/
		_30114=30114,
		/**Sýrie*/
		_30115=30115,
		/**Šalomounovy ostrovy*/
		_30116=30116,
		/**Tádžikistán*/
		_30117=30117,
		/**Taiwan*/
		_30118=30118,
		/**Tanzanie*/
		_30119=30119,
		/**Tonga*/
		_30120=30120,
		/**Trinidad a Tobago*/
		_30121=30121,
		/**Tunisko*/
		_30122=30122,
		/**Turkmenistán*/
		_30123=30123,
		/**Uganda*/
		_30124=30124,
		/**Ukrajina*/
		_30125=30125,
		/**Uruguay*/
		_30126=30126,
		/**Uzbekistán*/
		_30127=30127,
		/**Vanuatu*/
		_30128=30128,
		/**Venezuela*/
		_30129=30129,
		/**Vietnam*/
		_30130=30130,
		/**Východní Timor*/
		_30131=30131,
		/**Východokaribská oblast*/
		_30132=30132,
		/**Zambie*/
		_30133=30133,
		/**Zimbabwe*/
		_30134=30134,
		/**Kuvajt*/
		_30135=30135,
		/**Kuvajt*/
		_30136=30136,
		/**Kuvajt*/
		_30137=30137,
		/**Kuvajt*/
		_30138=30138,
		/**Venezuela*/
		_30139=30139,
		/**Pokus*/
		_30140=30140,
		/**qq*/
		_30141=30141,
		/**Turkmenistán*/
		_30142=30142,
		/**Zambie*/
		_30143=30143,
		/**Zimbabwe*/
		_30144=30144,
		/**Polsko*/
		_30145=30145,
		/**Polsko*/
		_30146=30146,
		/**Polsko*/
		_30147=30147,
		/**Bělorusko*/
		_30148=30148,
		/**KoJe*/
		_30149=30149,
		/**Koje*/
		_30150=30150,
		/**Ázerbájdžán*/
		_30151=30151,
		/**Ghana*/
		_30152=30152,
		/**Madagaskar*/
		_30153=30153,
		/**Mosambik*/
		_30154=30154,
		/**Srbsko a Černá Hora*/
		_30155=30155,
		/**Súdán*/
		_30156=30156,
		/**Jižní Súdán*/
		_30157=30157,
		/**Mauritánie*/
		_30158=30158,
		/**Svatý Tomáš a Princův ostrov*/
		_30159=30159,
		/**Sierra Leone*/
		_30160=30160,
	}
	function GEkocmenEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkocmenEnum, Gordic.Ginis.DbModel.GEkocmenDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Eko\GEkoctiiDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ekoctii*/
	interface GEkoctiiDto {
		/**DBCOLUMN:ekoctii.typ_kom_iissp*/
		typ_kom_iissp?: number|null;
		/**DBCOLUMN:ekoctii.typ_kom_iissp_txt*/
		typ_kom_iissp_txt?: string|null;
		/**DBCOLUMN:ekoctii.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekoctii.k_s*/
		k_s?: string|null;
	}
	const enum GEkoctiiDtoNames { typ_kom_iissp = "typ_kom_iissp", typ_kom_iissp_txt = "typ_kom_iissp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkoctiiDtoFragments { typ_kom_iissp = "*", typ_kom_iissp_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkoctiiDtoTypes { typ_kom_iissp = "number", typ_kom_iissp_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkoctiiDtoTypeLengths { typ_kom_iissp_txt = 100, k_s = 15,}
	/**ENUM:ekoctii*/
	const enum GEkoctiiEnum {
		/**Simulace online komunikace s IISSP přes WS (testovací)*/
		simulace=1,
		/**Online komunikace s IISSP přes WS (provozní)*/
		online=2,
		/**Offline komunikace s IISSP pomocí dávky XML (provozní)*/
		offline=4,
		/**Výběr mezi simulací, online a offline komunikací (nepoužívat, určeno pouze pro vývojáře!)*/
		vyber_uzivatele=8,
	}
	function GEkoctiiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkoctiiEnum, Gordic.Ginis.DbModel.GEkoctiiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincaibDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincaib
	*      gincaib
	*/
	interface GGincaibDto {
		aib_modul?: number|null;
		aib_modul_txt?: string|null;
		/**Položka*/
		pol?: string|null;
		/**PPol*/
		ppol?: string|null;
	}
	const enum GGincaibDtoNames { aib_modul = "aib_modul", aib_modul_txt = "aib_modul_txt", pol = "pol", ppol = "ppol",}
	const enum GGincaibDtoFragments { aib_modul = "*", aib_modul_txt = "*", pol = "*", ppol = "*",}
	const enum GGincaibDtoTypes { aib_modul = "number", aib_modul_txt = "string", pol = "string", ppol = "string",}
	const enum GGincaibDtoTypeLengths { aib_modul_txt = 50, pol = 4, ppol = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincaivDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincaiv*/
	interface GGincaivDto {
		/**DBCOLUMN:gincaiv.aiv_poskyt*/
		aiv_poskyt?: number|null;
		/**DBCOLUMN:gincaiv.aiv_poskyt_txt*/
		aiv_poskyt_txt?: string|null;
		/**DBCOLUMN:gincaiv.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincaiv.k_s*/
		k_s?: string|null;
	}
	const enum GGincaivDtoNames { aiv_poskyt = "aiv_poskyt", aiv_poskyt_txt = "aiv_poskyt_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincaivDtoFragments { aiv_poskyt = "*", aiv_poskyt_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincaivDtoTypes { aiv_poskyt = "number", aiv_poskyt_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincaivDtoTypeLengths { aiv_poskyt_txt = 100, k_s = 15,}
	/**ENUM:gincaiv*/
	const enum GGincaivEnum {
		/**NATHAN*/
		NATHAN=10,
		/**Document Intelligence / Form Recognizer*/
		FormRecognizer=20,
		/**QR Code*/
		QRCode=30,
	}
	function GGincaivEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincaivEnum, Gordic.Ginis.DbModel.GGincaivDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincaktDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:gincakt*/
	interface GGincaktDto {
        /**DBCOLUMN:gincakt.aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:gincakt.aktivita_txt*/
		aktivita_txt?: string|null;
        /**DBCOLUMN:gincakt.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:gincakt.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:gincakt.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:gincakt.aktivita_rsx*/
		aktivita_rsx?: number|null;
	}
	const enum GGincaktDtoNames { aktivita = "aktivita", aktivita_txt = "aktivita_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", aktivita_rsx = "aktivita_rsx",}
	const enum GGincaktDtoFragments { aktivita = "*", aktivita_txt = "*", k_v = "*", k_s = "*", k_xml = "*", aktivita_rsx = "*",}
	const enum GGincaktDtoTypes { aktivita = "number", aktivita_txt = "string", k_v = "number", k_s = "string", k_xml = "string", aktivita_rsx = "number",}
    /**ENUM:gincakt*/
	const enum GGincaktEnum {
        /**aktivní*/
		aktivni=100,
        /**připraven*/
		pripraven=300,
        /**neaktivní*/
		neaktivni=500,
        /**návrh*/
		navrh=600,
        /**zrušen*/
		zrusen=900,
	}
	function GGincaktEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincaktEnum, Gordic.Ginis.DbModel.GGincaktDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincargDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincarg*/
	interface GGincargDto {
		/**DBCOLUMN:gincarg.druh_skupiny*/
		druh_skupiny?: number|null;
		/**DBCOLUMN:gincarg.druh_skupiny_txt*/
		druh_skupiny_txt?: string|null;
		/**DBCOLUMN:gincarg.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincarg.k_s*/
		k_s?: string|null;
	}
	const enum GGincargDtoNames { druh_skupiny = "druh_skupiny", druh_skupiny_txt = "druh_skupiny_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincargDtoFragments { druh_skupiny = "*", druh_skupiny_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincargDtoTypes { druh_skupiny = "number", druh_skupiny_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincargDtoTypeLengths { druh_skupiny_txt = 100, k_s = 15,}
	/**ENUM:gincarg*/
	const enum GGincargEnum {
		/**Neurčeno*/
		neurceno=0,
		/**Daňová rekapitulace*/
		danova_rekapitulace=10,
		/**Položky*/
		polozky=20,
	}
	function GGincargEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincargEnum, Gordic.Ginis.DbModel.GGincargDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincblgDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincblg*/
	interface GGincblgDto {
		/**DBCOLUMN:gincblg.typ_blg*/
		typ_blg?: number|null;
		/**DBCOLUMN:gincblg.typ_blg_txt*/
		typ_blg_txt?: string|null;
		/**DBCOLUMN:gincblg.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincblg.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincblg.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:gincblg.priorita_blg_rsx*/
		priorita_blg_rsx?: number|null;
		/**DBCOLUMN:gincblg.typ_blg_rsx*/
		typ_blg_rsx?: number|null;
	}
	const enum GGincblgDtoNames { typ_blg = "typ_blg", typ_blg_txt = "typ_blg_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priorita_blg_rsx = "priorita_blg_rsx", typ_blg_rsx = "typ_blg_rsx",}
	const enum GGincblgDtoFragments { typ_blg = "*", typ_blg_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priorita_blg_rsx = "*", typ_blg_rsx = "*",}
	const enum GGincblgDtoTypes { typ_blg = "number", typ_blg_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priorita_blg_rsx = "number", typ_blg_rsx = "number",}
	const enum GGincblgDtoTypeLengths { typ_blg_txt = 100, k_s = 15, k_xml = 254,}
	/**ENUM:gincblg*/
	const enum GGincblgEnum {
		/**Obecný*/
		obecny=0,
		/**Metodická nápověda*/
		metodicka_napoveda=10,
	}
	function GGincblgEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincblgEnum, Gordic.Ginis.DbModel.GGincblgDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincclbDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincclb*/
	interface GGincclbDto {
		/**DBCOLUMN:gincclb.priorita_clb*/
		priorita_clb?: number|null;
		/**DBCOLUMN:gincclb.priorita_clb_txt*/
		priorita_clb_txt?: string|null;
		/**DBCOLUMN:gincclb.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincclb.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincclb.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:gincclb.priorita_clb_rsx*/
		priorita_clb_rsx?: number|null;
	}
	const enum GGincclbDtoNames { priorita_clb = "priorita_clb", priorita_clb_txt = "priorita_clb_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priorita_clb_rsx = "priorita_clb_rsx",}
	const enum GGincclbDtoFragments { priorita_clb = "*", priorita_clb_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priorita_clb_rsx = "*",}
	const enum GGincclbDtoTypes { priorita_clb = "number", priorita_clb_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priorita_clb_rsx = "number",}
	const enum GGincclbDtoTypeLengths { priorita_clb_txt = 100, k_s = 15, k_xml = 254,}
	/**ENUM:gincclb*/
	const enum GGincclbEnum {
		/**Neurčeno*/
		neurceno=0,
		/**Informativní*/
		informativni=10,
		/**Důležité*/
		dulezite=20,
		/**Připnuto*/
		pripnuto=30,
	}
	function GGincclbEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincclbEnum, Gordic.Ginis.DbModel.GGincclbDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinccluDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Typ události nad článkem*/
	interface GGinccluDto {
		/**DBCOLUMN:gincclu.zmena_clb*/
		zmena_clb?: number|null;
		/**DBCOLUMN:gincclu.zmena_clb_txt*/
		zmena_clb_txt?: string|null;
		/**DBCOLUMN:gincclu.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincclu.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincclu.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:gincclu.zmena_clb_rsx*/
		zmena_clb_rsx?: number|null;
	}
	const enum GGinccluDtoNames { zmena_clb = "zmena_clb", zmena_clb_txt = "zmena_clb_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", zmena_clb_rsx = "zmena_clb_rsx",}
	const enum GGinccluDtoFragments { zmena_clb = "*", zmena_clb_txt = "*", k_v = "*", k_s = "*", k_xml = "*", zmena_clb_rsx = "*",}
	const enum GGinccluDtoTypes { zmena_clb = "number", zmena_clb_txt = "string", k_v = "number", k_s = "string", k_xml = "string", zmena_clb_rsx = "number",}
	const enum GGinccluDtoTypeLengths { zmena_clb_txt = 100, k_s = 15, k_xml = 254,}
	/**Typ události nad článkem*/
	const enum GGinccluEnum {
		/**Zobrazeno*/
		zobrazeno=0,
		/**Zobrazeno - zrušení*/
		zobrazeno_zruseni=10,
		/**Potvrzeno*/
		potvrzeno=20,
		/**Potvrzeno - zrušení*/
		potvrzeni_zruseni=30,
		/**Hodnocení*/
		hodnoceni=40,
		/**Hlasování*/
		hlasovani=50,
	}
	function GGinccluEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinccluEnum, Gordic.Ginis.DbModel.GGinccluDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincctxDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincctx*/
	interface GGincctxDto {
		/**DBCOLUMN:gincctx.glob_prom*/
		glob_prom?: string|null;
		/**DBCOLUMN:gincctx.dat_typ*/
		dat_typ?: number|null;
		/**DBCOLUMN:gincctx.tabname_tgpr*/
		tabname_tgpr?: string|null;
		/**DBCOLUMN:gincctx.popis*/
		popis?: string|null;
		/**DBCOLUMN:gincctx.garant_orj*/
		garant_orj?: string|null;
		/**DBCOLUMN:gincctx.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gincctx.priz_obsolete*/
		priz_obsolete?: number|null;
		/**DBCOLUMN:gincctx.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincctx.uroven_cfg*/
		uroven_cfg?: number|null;
		/**DBCOLUMN:gincctx.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:gincctx.dl_name*/
		dl_name?: string|null;
		/**DBCOLUMN:gincctx.sl_name*/
		sl_name?: string|null;
	}
	const enum GGincctxDtoNames { glob_prom = "glob_prom", dat_typ = "dat_typ", tabname_tgpr = "tabname_tgpr", popis = "popis", garant_orj = "garant_orj", poznamka = "poznamka", priz_obsolete = "priz_obsolete", aktivita = "aktivita", uroven_cfg = "uroven_cfg", k_xml = "k_xml", dl_name = "dl_name", sl_name = "sl_name",}
	const enum GGincctxDtoFragments { glob_prom = "*", dat_typ = "*", tabname_tgpr = "*", popis = "*", garant_orj = "*", poznamka = "*", priz_obsolete = "*", aktivita = "*", uroven_cfg = "*", k_xml = "*", dl_name = "*", sl_name = "*",}
	const enum GGincctxDtoTypes { glob_prom = "string", dat_typ = "number", tabname_tgpr = "string", popis = "string", garant_orj = "string", poznamka = "string", priz_obsolete = "number", aktivita = "number", uroven_cfg = "number", k_xml = "string", dl_name = "string", sl_name = "string",}
	const enum GGincctxDtoTypeLengths { glob_prom = 18, tabname_tgpr = 7, popis = 254, garant_orj = 4, poznamka = 254, k_xml = 254,}
	/**ENUM:gincctx*/
	const enum GGincctxEnum {
		/**g_cfu*/
		cfu,
		/**g_cis_spr*/
		cis_spr,
		/**g_faze*/
		faze,
		/**g_ico*/
		ico,
		/**g_ikc*/
		ikc,
		/**g_ixp_den*/
		ixp_den,
		/**g_ixs_aus*/
		ixs_aus,
		/**g_ixs_ext*/
		ixs_ext,
		/**g_ixs_fun*/
		ixs_fun,
		/**g_ixs_ins*/
		ixs_ins,
		/**g_ixs_lpc*/
		ixs_lpc,
		/**g_ixs_orj*/
		ixs_orj,
		/**g_ixs_ref*/
		ixs_ref,
		/**g_ixs_su*/
		ixs_su,
		/**g_ixs_usr*/
		ixs_usr,
		/**g_ixs_zmp*/
		ixs_zmp,
		/**g_lic*/
		lic,
		/**g_lic_ico*/
		lic_ico,
		/**g_log_por_cislo*/
		log_por_cislo,
		/**g_mesic*/
		mesic,
		/**g_my_nks*/
		my_nks,
		/**g_nks*/
		nks,
		/**g_params_ctx*/
		params_ctx,
		/**g_rok_cj*/
		rok_cj,
		/**g_rok_obd*/
		rok_obd,
		/**g_rok_phl*/
		rok_phl,
		/**g_rok_spz*/
		rok_spz,
		/**g_spis_graf*/
		spis_graf,
		/**g_spis_pl*/
		spis_pl,
		/**g_sslden_cj*/
		sslden_cj,
		/**g_sslden_spz*/
		sslden_spz,
		/**g_typ_ag*/
		typ_ag,
		/**g_typ_ag_ext*/
		typ_ag_ext,
		/**g_typ_phl*/
		typ_phl,
		/**g_ucs*/
		ucs,
		/**g_uus*/
		uus,
		/**g_vyp_graf*/
		vyp_graf,
	}
	function GGincctxEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincctxEnum, Gordic.Ginis.DbModel.GGincctxDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincdatDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincdat*/
	interface GGincdatDto {
		/**Enum pro základní datové typy*/
		dat_typ?: number|null;
		/**DBCOLUMN:gincdat.dat_typ_txt*/
		dat_typ_txt?: string|null;
		/**DBCOLUMN:gincdat.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincdat.k_s*/
		k_s?: string|null;
	}
	const enum GGincdatDtoNames { dat_typ = "dat_typ", dat_typ_txt = "dat_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincdatDtoFragments { dat_typ = "*", dat_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincdatDtoTypes { dat_typ = "number", dat_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincdatDtoTypeLengths { dat_typ_txt = 50, k_s = 15,}
	/**ENUM:gincdat*/
	const enum GGincdatEnum {
		/**Any*/
		Any=0,
		/**Char*/
		Char=1,
		/**Int*/
		Int=2,
		/**DateTime*/
		DateTime=3,
		/**Date*/
		Date=4,
		/**Decimal*/
		Decimal=5,
	}
	function GGincdatEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincdatEnum, Gordic.Ginis.DbModel.GGincdatDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincesuDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Typ subjektu pro kartotéku externích subjektů*/
	interface GGincesuDto {
		/**Typ subjektu*/
		typ_esu?: number|null;
		/**Popis typu subjektu*/
		typ_esu_txt?: string|null;
		k_v?: number|null;
		k_s?: string|null;
		k_xml?: string|null;
		typ_esu_rsx?: number|null;
	}
	const enum GGincesuDtoNames { typ_esu = "typ_esu", typ_esu_txt = "typ_esu_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", typ_esu_rsx = "typ_esu_rsx",}
	const enum GGincesuDtoFragments { typ_esu = "*", typ_esu_txt = "*", k_v = "*", k_s = "*", k_xml = "*", typ_esu_rsx = "*",}
	const enum GGincesuDtoTypes { typ_esu = "number", typ_esu_txt = "string", k_v = "number", k_s = "string", k_xml = "string", typ_esu_rsx = "number",}
	const enum GGincesuDtoTypeLengths { typ_esu_txt = 50, k_s = 15, k_xml = 254,}
	interface GGincesuPermissions {
	}
	const enum GGincesuPermissionsNames {}
	const enum GGincesuPermissionsFragments {}
	const enum GGincesuPermissionsTypes {}
	const enum GGincesuPermissionsTypeLengths {}
	/**ENUM:gincesu*/
	const enum GGincesuEnum {
		/**neurčeno*/
		neurceno=0,
		/**právnická osoba*/
		pravnicka_osoba=10,
		/**fyzická osoba*/
		fyz_osoba=20,
		/**fyzická osoba - OSVČ*/
		fyz_osoba_osvc=30,
	}
	function GGincesuEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincesuEnum, Gordic.Ginis.DbModel.GGincesuDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinckulDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginckul*/
	interface GGinckulDto {
		/**DBCOLUMN:ginckul.kultura*/
		kultura?: number|null;
		/**DBCOLUMN:ginckul.kultura_zkr*/
		kultura_zkr?: string|null;
		/**DBCOLUMN:ginckul.kultura_txt*/
		kultura_txt?: string|null;
		/**DBCOLUMN:ginckul.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginckul.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ginckul.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:ginckul.priz_neprek*/
		priz_neprek?: number|null;
		/**DBCOLUMN:ginckul.priz_adz*/
		priz_adz?: number|null;
		/**DBCOLUMN:ginckul.kultura_znak*/
		kultura_znak?: string|null;
	}
	const enum GGinckulDtoNames { kultura = "kultura", kultura_zkr = "kultura_zkr", kultura_txt = "kultura_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priz_neprek = "priz_neprek", priz_adz = "priz_adz", kultura_znak = "kultura_znak",}
	const enum GGinckulDtoFragments { kultura = "*", kultura_zkr = "*", kultura_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priz_neprek = "*", priz_adz = "*", kultura_znak = "*",}
	const enum GGinckulDtoTypes { kultura = "number", kultura_zkr = "string", kultura_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priz_neprek = "number", priz_adz = "number", kultura_znak = "string",}
	const enum GGinckulDtoTypeLengths { kultura_zkr = 50, kultura_txt = 50, k_s = 15, k_xml = 254, kultura_znak = 1,}
	/**ENUM:ginckul*/
	const enum GGinckulEnum {
		/**Ceska*/
		ceska=0,
		/**Slovenska*/
		slovenska=10,
		/**English*/
		anglicka=20,
		/**Russian*/
		ruska=30,
		/**Srbska*/
		srbska=40,
		/**Ukrajinska*/
		ukrajinska=50,
	}
	function GGinckulEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinckulEnum, Gordic.Ginis.DbModel.GGinckulDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclapDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclap*/
	interface GGinclapDto {
		/**DBCOLUMN:ginclap.lap_typ*/
		lap_typ?: number|null;
		/**DBCOLUMN:ginclap.lap_typ_txt*/
		lap_typ_txt?: string|null;
		/**DBCOLUMN:ginclap.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclap.k_s*/
		k_s?: string|null;
	}
	const enum GGinclapDtoNames { lap_typ = "lap_typ", lap_typ_txt = "lap_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinclapDtoFragments { lap_typ = "*", lap_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinclapDtoTypes { lap_typ = "number", lap_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinclapDtoTypeLengths { lap_typ_txt = 254, k_s = 15,}
	/**ENUM:ginclap*/
	const enum GGinclapEnum {
		/**Neurceno*/
		Neurceno=0,
		/**Asistent*/
		Asistent=10,
		/**Agent*/
		Agent=20,
		/**Ginis copilot*/
		GinisCopilot=30,
	}
	function GGinclapEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclapEnum, Gordic.Ginis.DbModel.GGinclapDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclgcDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclgc*/
	interface GGinclgcDto {
		/**DBCOLUMN:ginclgc.lgcontent*/
		lgcontent?: number|null;
		/**DBCOLUMN:ginclgc.lgcontent_txt*/
		lgcontent_txt?: string|null;
		/**DBCOLUMN:ginclgc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclgc.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ginclgc.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:ginclgc.lgcontent_uid*/
		lgcontent_uid?: string|null;
	}
	const enum GGinclgcDtoNames { lgcontent = "lgcontent", lgcontent_txt = "lgcontent_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", lgcontent_uid = "lgcontent_uid",}
	const enum GGinclgcDtoFragments { lgcontent = "*", lgcontent_txt = "*", k_v = "*", k_s = "*", k_xml = "*", lgcontent_uid = "*",}
	const enum GGinclgcDtoTypes { lgcontent = "number", lgcontent_txt = "string", k_v = "number", k_s = "string", k_xml = "string", lgcontent_uid = "string",}
	const enum GGinclgcDtoTypeLengths { lgcontent_txt = 254, k_s = 15, k_xml = 254, lgcontent_uid = 254,}
	/**ENUM:ginclgc*/
	const enum GGinclgcEnum {
		/**Neurceno*/
		neurceno=0,
		/**Uka_eko_grid*/
		uka_eko_grid=1,
		/**Uka_pdf*/
		uka_pdf=2,
		/**Usu_dokument*/
		usu_dokument=10,
	}
	function GGinclgcEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclgcEnum, Gordic.Ginis.DbModel.GGinclgcDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclmaDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclma*/
	interface GGinclmaDto {
		/**DBCOLUMN:ginclma.lm_api_typ*/
		lm_api_typ?: number|null;
		/**DBCOLUMN:ginclma.lm_api_typ_txt*/
		lm_api_typ_txt?: string|null;
		/**DBCOLUMN:ginclma.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclma.k_s*/
		k_s?: string|null;
	}
	const enum GGinclmaDtoNames { lm_api_typ = "lm_api_typ", lm_api_typ_txt = "lm_api_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinclmaDtoFragments { lm_api_typ = "*", lm_api_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinclmaDtoTypes { lm_api_typ = "number", lm_api_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinclmaDtoTypeLengths { lm_api_typ_txt = 254, k_s = 15,}
	/**ENUM:ginclma*/
	const enum GGinclmaEnum {
		/**Neurceno*/
		Neurceno=0,
		/**OpenAI_24-06-01*/
		OpenAI_24_06_01=10,
		/**OpenAI_24-10-21*/
		OpenAI_24_10_21=11,
	}
	function GGinclmaEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclmaEnum, Gordic.Ginis.DbModel.GGinclmaDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclmkDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclmk*/
	interface GGinclmkDto {
		/**DBCOLUMN:ginclmk.lmodel_typ*/
		lmodel_typ?: number|null;
		/**DBCOLUMN:ginclmk.lmodel_typ_txt*/
		lmodel_typ_txt?: string|null;
		/**DBCOLUMN:ginclmk.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclmk.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ginclmk.k_xml*/
		k_xml?: string|null;
	}
	const enum GGinclmkDtoNames { lmodel_typ = "lmodel_typ", lmodel_typ_txt = "lmodel_typ_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GGinclmkDtoFragments { lmodel_typ = "*", lmodel_typ_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GGinclmkDtoTypes { lmodel_typ = "number", lmodel_typ_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GGinclmkDtoTypeLengths { lmodel_typ_txt = 254, k_s = 15, k_xml = 254,}
	/**ENUM:ginclmk*/
	const enum GGinclmkEnum {
		/**Neurceno*/
		Neurceno=0,
		/**OpenAI_GPT_3-5*/
		OpenAI_GPT_3_5=10,
		/**OpenAI_GPT_4*/
		OpenAI_GPT_4=11,
		/**OpenAI_GPT_4o*/
		OpenAI_GPT_4o=12,
		/**OpenAI_GPT_4o-mini*/
		OpenAI_GPT_4o_mini=13,
		/**OpenAI_GPT_o3*/
		OpenAI_GPT_o3=14,
		/**OpenAI_GPT_o3-mini*/
		OpenAI_GPT_o3_mini=15,
	}
	function GGinclmkEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclmkEnum, Gordic.Ginis.DbModel.GGinclmkDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclpsDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclps*/
	interface GGinclpsDto {
		/**Služby mohou mít různé dodavatele. Zde se nachází podporované varianty, ke kterým v GINIS existují  konektory*/
		lpsluzby_typ?: number|null;
		/**DBCOLUMN:ginclps.lpsluzby_typ_txt*/
		lpsluzby_typ_txt?: string|null;
		/**DBCOLUMN:ginclps.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclps.k_s*/
		k_s?: string|null;
	}
	const enum GGinclpsDtoNames { lpsluzby_typ = "lpsluzby_typ", lpsluzby_typ_txt = "lpsluzby_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinclpsDtoFragments { lpsluzby_typ = "*", lpsluzby_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinclpsDtoTypes { lpsluzby_typ = "number", lpsluzby_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinclpsDtoTypeLengths { lpsluzby_typ_txt = 254, k_s = 15,}
	/**ENUM:ginclps*/
	const enum GGinclpsEnum {
		/**Neurceno*/
		Neurceno=0,
		/**Debug*/
		Debug=1,
		/**AzureOpenAI*/
		AzureOpenAI=10,
	}
	function GGinclpsEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclpsEnum, Gordic.Ginis.DbModel.GGinclpsDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclvyDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclvy*/
	interface GGinclvyDto {
		/**DBCOLUMN:ginclvy.lap_vystup_typ*/
		lap_vystup_typ?: number|null;
		/**DBCOLUMN:ginclvy.lap_vystup_typ_txt*/
		lap_vystup_typ_txt?: string|null;
		/**DBCOLUMN:ginclvy.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclvy.k_s*/
		k_s?: string|null;
	}
	const enum GGinclvyDtoNames { lap_vystup_typ = "lap_vystup_typ", lap_vystup_typ_txt = "lap_vystup_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinclvyDtoFragments { lap_vystup_typ = "*", lap_vystup_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinclvyDtoTypes { lap_vystup_typ = "number", lap_vystup_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinclvyDtoTypeLengths { lap_vystup_typ_txt = 254, k_s = 15,}
	/**ENUM:ginclvy*/
	const enum GGinclvyEnum {
		/**Neurceno*/
		Neurceno=0,
		/**Text*/
		Text=10,
		/**Json*/
		Json=20,
	}
	function GGinclvyEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclvyEnum, Gordic.Ginis.DbModel.GGinclvyDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinclzpDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginclzp*/
	interface GGinclzpDto {
		/**DBCOLUMN:ginclzp.lng_role_typ*/
		lng_role_typ?: number|null;
		/**DBCOLUMN:ginclzp.lng_role_typ_txt*/
		lng_role_typ_txt?: string|null;
		/**DBCOLUMN:ginclzp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginclzp.k_s*/
		k_s?: string|null;
	}
	const enum GGinclzpDtoNames { lng_role_typ = "lng_role_typ", lng_role_typ_txt = "lng_role_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinclzpDtoFragments { lng_role_typ = "*", lng_role_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinclzpDtoTypes { lng_role_typ = "number", lng_role_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinclzpDtoTypeLengths { lng_role_typ_txt = 254, k_s = 15,}
	/**ENUM:ginclzp*/
	const enum GGinclzpEnum {
		/**Neurceno*/
		Neurceno=0,
		/**Uživatel*/
		Uzivatel=10,
		/**Asistent*/
		Asistent=20,
		/**Tool*/
		Tool=30,
	}
	function GGinclzpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinclzpEnum, Gordic.Ginis.DbModel.GGinclzpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincpanDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincpan*/
	interface GGincpanDto {
		/**DBCOLUMN:gincpan.priz_an*/
		priz_an?: number|null;
		/**DBCOLUMN:gincpan.priz_an_txt*/
		priz_an_txt?: string|null;
		/**DBCOLUMN:gincpan.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpan.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincpan.priz_an_c1*/
		priz_an_c1?: string|null;
		/**DBCOLUMN:gincpan.priz_an_rsx*/
		priz_an_rsx?: number|null;
	}
	const enum GGincpanDtoNames { priz_an = "priz_an", priz_an_txt = "priz_an_txt", k_v = "k_v", k_s = "k_s", priz_an_c1 = "priz_an_c1", priz_an_rsx = "priz_an_rsx",}
	const enum GGincpanDtoFragments { priz_an = "*", priz_an_txt = "*", k_v = "*", k_s = "*", priz_an_c1 = "*", priz_an_rsx = "*",}
	const enum GGincpanDtoTypes { priz_an = "number", priz_an_txt = "string", k_v = "number", k_s = "string", priz_an_c1 = "string", priz_an_rsx = "number",}
	const enum GGincpanDtoTypeLengths { priz_an_txt = 50, k_s = 15, priz_an_c1 = 1,}
	/**ENUM:gincpan*/
	const enum GGincpanEnum {
		/**Ne*/
		ne=0,
		/**Ano*/
		ano=1,
	}
	function GGincpanEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincpanEnum, Gordic.Ginis.DbModel.GGincpanDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincpdoDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincpdo*/
	interface GGincpdoDto {
		/**DBCOLUMN:gincpdo.priz_dotaz*/
		priz_dotaz?: number|null;
		/**DBCOLUMN:gincpdo.priz_dotaz_txt*/
		priz_dotaz_txt?: string|null;
		/**DBCOLUMN:gincpdo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpdo.k_s*/
		k_s?: string|null;
	}
	const enum GGincpdoDtoNames { priz_dotaz = "priz_dotaz", priz_dotaz_txt = "priz_dotaz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpdoDtoFragments { priz_dotaz = "*", priz_dotaz_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpdoDtoTypes { priz_dotaz = "number", priz_dotaz_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpdoDtoTypeLengths { priz_dotaz_txt = 50, k_s = 15,}
	/**ENUM:gincpdo*/
	const enum GGincpdoEnum {
		/**Ne*/
		_0=0,
		/**Ano*/
		_1=1,
		/**Ano (el. obraz, příloha, nic)*/
		_2=2,
	}
	function GGincpdoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincpdoEnum, Gordic.Ginis.DbModel.GGincpdoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincpinDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincpin*/
	interface GGincpinDto {
		/**DBCOLUMN:gincpin.priz_int*/
		priz_int?: number|null;
		/**DBCOLUMN:gincpin.priz_int_txt*/
		priz_int_txt?: string|null;
		/**DBCOLUMN:gincpin.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpin.k_s*/
		k_s?: string|null;
	}
	const enum GGincpinDtoNames { priz_int = "priz_int", priz_int_txt = "priz_int_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpinDtoFragments { priz_int = "*", priz_int_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpinDtoTypes { priz_int = "number", priz_int_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpinDtoTypeLengths { priz_int_txt = 50, k_s = 15,}
	/**ENUM:gincpin*/
	const enum GGincpinEnum {
		/**externí subjekt*/
		Externi=0,
		/**interní subjekt*/
		Interni=10,
	}
	function GGincpinEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincpinEnum, Gordic.Ginis.DbModel.GGincpinDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincpodDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincpod*/
	interface GGincpodDto {
		/**DBCOLUMN:gincpod.priz_pod*/
		priz_pod?: number|null;
		/**DBCOLUMN:gincpod.priz_pod_txt*/
		priz_pod_txt?: string|null;
		/**DBCOLUMN:gincpod.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpod.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincpod.priz_pod_rsx*/
		priz_pod_rsx?: number|null;
	}
	const enum GGincpodDtoNames { priz_pod = "priz_pod", priz_pod_txt = "priz_pod_txt", k_v = "k_v", k_s = "k_s", priz_pod_rsx = "priz_pod_rsx",}
	const enum GGincpodDtoFragments { priz_pod = "*", priz_pod_txt = "*", k_v = "*", k_s = "*", priz_pod_rsx = "*",}
	const enum GGincpodDtoTypes { priz_pod = "number", priz_pod_txt = "string", k_v = "number", k_s = "string", priz_pod_rsx = "number",}
	const enum GGincpodDtoTypeLengths { priz_pod_txt = 50, k_s = 15,}
	/**ENUM:gincpod*/
	const enum GGincpodEnum {
		/**nepodatelna*/
		nepodatelna=0,
		/**podatelna*/
		podatelna=10,
	}
	function GGincpodEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincpodEnum, Gordic.Ginis.DbModel.GGincpodDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincpopDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincpop*/
	interface GGincpopDto {
		/**DBCOLUMN:gincpop.priz_podp*/
		priz_podp?: number|null;
		/**DBCOLUMN:gincpop.priz_podp_txt*/
		priz_podp_txt?: string|null;
		/**DBCOLUMN:gincpop.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpop.k_s*/
		k_s?: string|null;
	}
	const enum GGincpopDtoNames { priz_podp = "priz_podp", priz_podp_txt = "priz_podp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpopDtoFragments { priz_podp = "*", priz_podp_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpopDtoTypes { priz_podp = "number", priz_podp_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpopDtoTypeLengths { priz_podp_txt = 50, k_s = 15,}
	/**ENUM:gincpop*/
	const enum GGincpopEnum {
		/**Bez podpisu i časového razítka*/
		_0=0,
		/**Podpis*/
		_1=1,
		/**Časové razítko*/
		_2=2,
		/**Podpis a časové razítko*/
		_3=3,
	}
	function GGincpopEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincpopEnum, Gordic.Ginis.DbModel.GGincpopDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincstuDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Stupeň utajení dokumentu.*/
	interface GGincstuDto {
		/**Interní identifikátor úrovně přístupu k dokumnetům*/
		st_utaj_id?: number|null;
		/**Uživatelská forma číselníku úrovně přístupu uživatelů k dokumentu*/
		st_utaj_id_txt?: string|null;
		/**DBCOLUMN:gincstu.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincstu.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincstu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincstu.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:gincstu.st_utaj_id_orig*/
		st_utaj_id_orig?: number|null;
		/**DBCOLUMN:gincstu.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:gincstu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincstu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gincstu.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:gincstu.st_utaj_id_rsx*/
		st_utaj_id_rsx?: number|null;
	}
	const enum GGincstuDtoNames { st_utaj_id = "st_utaj_id", st_utaj_id_txt = "st_utaj_id_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", zkratka = "zkratka", st_utaj_id_orig = "st_utaj_id_orig", k_xml = "k_xml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", st_utaj_id_rsx = "st_utaj_id_rsx",}
	const enum GGincstuDtoFragments { st_utaj_id = "*", st_utaj_id_txt = "*", k_v = "*", k_s = "*", aktivita = "*", zkratka = "*", st_utaj_id_orig = "*", k_xml = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", st_utaj_id_rsx = "*",}
	const enum GGincstuDtoTypes { st_utaj_id = "number", st_utaj_id_txt = "string", k_v = "number", k_s = "string", aktivita = "number", zkratka = "string", st_utaj_id_orig = "number", k_xml = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", st_utaj_id_rsx = "number",}
	const enum GGincstuDtoTypeLengths { st_utaj_id_txt = 50, k_s = 15, zkratka = 5, k_xml = 254, zmenu_prov = 12, ixs_lpc = 12,}
	/**Stupeň utajení dokumentu.*/
	const enum GGincstuEnum {
		/**Dokument ke zveřejnění*/
		kezverejneni=0,
		/**Běžný dokument*/
		bezny=10,
		/**Neveřejný dokument*/
		neverejny=20,
		/**Řízený*/
		rizeny=40,
		/**Neutajované*/
		neutajovane=1000,
		/**Vyhrazené*/
		vyhrazene=1010,
		/**Důvěrné*/
		duverne=1020,
		/**Tajné*/
		tajne=1030,
		/**Přísně tajné*/
		prisne_tajne=1040,
	}
	function GGincstuEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincstuEnum, Gordic.Ginis.DbModel.GGincstuDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincsvyDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Stav požadavku na vytěžení dat pomocí AI.*/
	interface GGincsvyDto {
		/**Stav požadavku.*/
		stav_vytez?: number|null;
		/**Uživatelský text stavu požadavku.*/
		stav_vytez_txt?: string|null;
		/**DBCOLUMN:gincsvy.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincsvy.k_s*/
		k_s?: string|null;
	}
	const enum GGincsvyDtoNames { stav_vytez = "stav_vytez", stav_vytez_txt = "stav_vytez_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincsvyDtoFragments { stav_vytez = "*", stav_vytez_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincsvyDtoTypes { stav_vytez = "number", stav_vytez_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincsvyDtoTypeLengths { stav_vytez_txt = 100, k_s = 15,}
	/**Stav požadavku na vytěžení dat pomocí AI.*/
	const enum GGincsvyEnum {
		/**K vytěžení*/
		Kvytezeni=0,
		/**Vytěženo*/
		Vytezeno=10,
		/**Zrušeno*/
		Zruseno=20,
		/**Chyba vytěžení*/
		Chybavytezeni=30,
	}
	function GGincsvyEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincsvyEnum, Gordic.Ginis.DbModel.GGincsvyDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinctagDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:ginctag*/
	interface GGinctagDto {
        /**Interní ID typu agendy aplikací systému GINIS*/
		typ_ag?: number|null;
        /**DBCOLUMN:ginctag.typ_ag_txt*/
		typ_ag_txt?: string|null;
        /**DBCOLUMN:ginctag.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:ginctag.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:ginctag.typ_uct*/
		typ_uct?: number|null;
        /**DBCOLUMN:ginctag.zkr_ag*/
		zkr_ag?: string|null;
        /**DBCOLUMN:ginctag.ktg_ag*/
		ktg_ag?: number|null;
        /**DBCOLUMN:ginctag.priz_ext*/
		priz_ext?: number|null;
        /**DBCOLUMN:ginctag.priz_ekovago*/
		priz_ekovago?: number|null;
        /**DBCOLUMN:ginctag.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:ginctag.ixs_ext*/
		ixs_ext?: string|null;
        /**DBCOLUMN:ginctag.typ_ag_rsx*/
		typ_ag_rsx?: number|null;
	}
	const enum GGinctagDtoNames { typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", k_v = "k_v", k_s = "k_s", typ_uct = "typ_uct", zkr_ag = "zkr_ag", ktg_ag = "ktg_ag", priz_ext = "priz_ext", priz_ekovago = "priz_ekovago", k_xml = "k_xml", ixs_ext = "ixs_ext", typ_ag_rsx = "typ_ag_rsx",}
	const enum GGinctagDtoFragments { typ_ag = "*", typ_ag_txt = "*", k_v = "*", k_s = "*", typ_uct = "*", zkr_ag = "*", ktg_ag = "*", priz_ext = "*", priz_ekovago = "*", k_xml = "*", ixs_ext = "*", typ_ag_rsx = "*",}
	const enum GGinctagDtoTypes { typ_ag = "number", typ_ag_txt = "string", k_v = "number", k_s = "string", typ_uct = "number", zkr_ag = "string", ktg_ag = "number", priz_ext = "number", priz_ekovago = "number", k_xml = "string", ixs_ext = "string", typ_ag_rsx = "number",}
    /**ENUM:ginctag*/
	const enum GGinctagEnum {
        /**Jádro*/
		_0=0,
        /**Jádro - WS*/
		_5=5,
        /**Tok dokumentů*/
		_10=10,
        /**Spisová služba*/
		_20=20,
        /**EKO jádro (FIK)*/
		_30=30,
        /**Zveřejnění*/
		_35=35,
        /**Účetnictví*/
		_40=40,
        /**Rozpočet*/
		_50=50,
        /**Majetek*/
		_60=60,
        /**Převody nákladových středisek*/
		_62=62,
        /**Aktualizace katalogu materiálu*/
		_64=64,
        /**Kniha došlých faktur*/
		_70=70,
        /**Kniha odeslaných faktur*/
		_80=80,
        /**Pokladna*/
		_90=90,
        /**Komunikace s bankou*/
		_100=100,
        /**Smlouvy*/
		_110=110,
        /**Plán*/
		_120=120,
        /**Odložené zpracování*/
		_130=130,
        /**Úkoly*/
		_140=140,
        /**UCR*/
		_150=150,
        /**Přenosy dat*/
		_160=160,
        /**Vnitřní pošta*/
		_170=170,
        /**Poukazy*/
		_180=180,
        /**Podatelna*/
		_190=190,
        /**Výpravna*/
		_200=200,
        /**Vývojové prostředí generátoru výkazů a sestav*/
		_210=210,
        /**Ostatní bankovní pohyby*/
		_220=220,
        /**Převodní poukazy*/
		_230=230,
        /**Výkazy*/
		_240=240,
        /**Střednědobý rozpočtový výhled*/
		_250=250,
        /**Majetek - civilní*/
		_260=260,
        /**Externí platby*/
		_270=270,
        /**Administrace předkontací*/
		_280=280,
        /**Administrace účtového rozvrhu*/
		_290=290,
        /**Interface*/
		_300=300,
        /**Integrované pracoviště hospodáře*/
		_310=310,
        /**Pokladní pracoviště hospodáře*/
		_320=320,
        /**Finanční účtárna*/
		_330=330,
        /**Materiálová účtárna*/
		_340=340,
        /**Daně, dávky, poplatky a pohledávky*/
		_350=350,
        /**Registr obyvatel*/
		_360=360,
        /**Spisovna*/
		_370=370,
        /**Datastore WUCR*/
		_380=380,
        /**Balancování rozpočtu*/
		_390=390,
        /**Usnesení*/
		_400=400,
        /**Přestupkové řízení*/
		_410=410,
        /**Registr příjemců dotací*/
		_420=420,
        /**Platy a mzdy*/
		_430=430,
        /**Personální a platový portál*/
		_431=431,
        /**Evidence sociálního pojištění*/
		_435=435,
        /**Personalistika*/
		_440=440,
        /**Matrika*/
		_450=450,
        /**Registr nemovitostí - prohlížení*/
		_460=460,
        /**Registr obyvatel - prohlížení*/
		_470=470,
        /**Registr obyvatel - volby*/
		_480=480,
        /**Sociální dávky*/
		_490=490,
        /**Služby sociální péče a ochrany*/
		_495=495,
        /**Stavební úřad*/
		_500=500,
        /**Evidence veřejných zakázek*/
		_510=510,
        /**Docházková evidence*/
		_520=520,
        /**Účetní a rozpočtové výkazy*/
		_530=530,
        /**Personalistika Defence*/
		_540=540,
        /**CIS*/
		_550=550,
        /**DWH*/
		_560=560,
        /**Finanční kontrola*/
		_570=570,
        /**Veřejná finanční podpora*/
		_580=580,
        /**Rozpis zdrojů*/
		_590=590,
        /**Evidence škod*/
		_600=600,
        /**Pořizovač dokladů mezd*/
		_610=610,
        /**Evidence převodů a odprodejů*/
		_620=620,
        /**Plánování a evidence služebních cest*/
		_630=630,
        /**Informační panel*/
		_640=640,
        /**Adresář kontaktů*/
		_650=650,
        /**Správní řízení*/
		_660=660,
        /**Kalkulace rozpočtu*/
		_670=670,
        /**Úřední deska*/
		_680=680,
        /**Rozúčtování nákladů*/
		_690=690,
        /**Realizace služebních cest*/
		_700=700,
        /**Rozhraní na OVR*/
		_710=710,
        /**Registr zákazníků*/
		_720=720,
        /**Elektronický vzdělávací systém*/
		_730=730,
        /**Registr pojištěnců nemocenského pojištění*/
		_740=740,
        /**Evidence a výplata částek mimo PAM*/
		_750=750,
        /**Výherní hrací přístroje*/
		_760=760,
        /**Rozhraní na MONIT*/
		_770=770,
        /**Datové tržiště - Výkazy*/
		_780=780,
        /**Rozkazy velitele*/
		_790=790,
        /**Podpora programového financování*/
		_800=800,
        /**Hodnocení efektivity financování*/
		_810=810,
        /**Dovolená*/
		_820=820,
        /**Odpady*/
		_830=830,
        /**Registr autorizovaných konverzí*/
		_840=840,
        /**Věcné plánování*/
		_850=850,
        /**Pokladna zálohová*/
		_860=860,
        /**Rezervace služebních automobilů*/
		_870=870,
        /**Rejstřík licencí strojvedoucích*/
		_880=880,
        /**OpenData*/
		_900=900,
        /**Podání elektronických dat*/
		_910=910,
        /**Evidence závazků*/
		_1070=1070,
        /**Evidence odeslaných faktur*/
		_1080=1080,
        /**Pokladna*/
		_1090=1090,
        /**Komunikace s bankou*/
		_1100=1100,
        /**Převodní poukazy*/
		_1230=1230,
        /**USR agenda*/
		_29999=29999,
        /**Externí agenda 000 - přejmenovaná*/
		_30000=30000,
        /**Externí agenda 001*/
		_30001=30001,
        /**Externí systém pro WS - SSL*/
		_30002=30002,
        /**Test ABCD sdsssssssssss*/
		_30003=30003,
        /**CzechPoint - CzechPoint*/
		_30004=30004,
        /**SPIS RŽP*/
		_32000=32000,
        /**SSL-OK systém*/
		_32001=32001,
        /**test ON - test ON*/
		_32002=32002,
        /**CzechPoint*/
		_32003=32003,
        /**Externí systém pro WS*/
		_32004=32004,
        /**test ON*/
		_32005=32005,
        /**Test*/
		_32006=32006,
        /**DKS - XRG DKS*/
		_32007=32007,
        /**ES Sob - GWSSSL Sob*/
		_32008=32008,
        /**CzechPoint*/
		_32009=32009,
	}
	function GGinctagEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinctagEnum, Gordic.Ginis.DbModel.GGinctagDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGincthmDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:gincthm*/
	interface GGincthmDto {
		/**DBCOLUMN:gincthm.typ_hod_msk*/
		typ_hod_msk?: Gordic.Ginis.DbModel.GGincthmEnum|null;
		/**DBCOLUMN:gincthm.typ_hod_msk_txt*/
		typ_hod_msk_txt?: string|null;
		/**DBCOLUMN:gincthm.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincthm.k_s*/
		k_s?: string|null;
	}
	const enum GGincthmDtoNames { typ_hod_msk = "typ_hod_msk", typ_hod_msk_txt = "typ_hod_msk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincthmDtoFragments { typ_hod_msk = "*", typ_hod_msk_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincthmDtoTypes { typ_hod_msk = "Gordic.Ginis.DbModel.GGincthmEnum", typ_hod_msk_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincthmDtoTypeLengths { typ_hod_msk_txt = 50, k_s = 15,}
	/**ENUM:gincthm*/
	const enum GGincthmEnum {
		/**neurčeno*/
		Neurceno=0,
		/**string*/
		String=10,
		/**case sensitive string*/
		StringCaseSensitive=20,
		/**int16*/
		Int16=30,
		/**int32*/
		Int32=40,
		/**decimal*/
		Decimal=50,
		/**date*/
		Date=60,
		/**datetime*/
		Datetime=70,
		/**variable*/
		Variable=80,
	}
	function GGincthmEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincthmEnum, Gordic.Ginis.DbModel.GGincthmDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinctpoDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Typ vytěžené položky dat pomocí AI.*/
	interface GGinctpoDto {
		/**Typ požadavku.*/
		typ_vytez_pol?: number|null;
		/**Uživatelský text typu požadavku.*/
		typ_vytez_pol_txt?: string|null;
		/**DBCOLUMN:ginctpo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginctpo.k_s*/
		k_s?: string|null;
	}
	const enum GGinctpoDtoNames { typ_vytez_pol = "typ_vytez_pol", typ_vytez_pol_txt = "typ_vytez_pol_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinctpoDtoFragments { typ_vytez_pol = "*", typ_vytez_pol_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinctpoDtoTypes { typ_vytez_pol = "number", typ_vytez_pol_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinctpoDtoTypeLengths { typ_vytez_pol_txt = 100, k_s = 15,}
	/**Typ vytěžené položky dat pomocí AI.*/
	const enum GGinctpoEnum {
		/**None*/
		None=0,
		/**TypDokladu*/
		TypDokladu=10,
		/**SmlouvaObjednavka*/
		SmlouvaObjednavka=20,
		/**ExterniSubjektIC*/
		ExterniSubjektIC=30,
		/**ExterniSubjektNazev*/
		ExterniSubjektNazev=40,
		/**ExterniSubjektDIC*/
		ExterniSubjektDIC=50,
		/**ExterniSubjektAdresa*/
		ExterniSubjektAdresa=60,
		/**ExterniSubjektAdresaPrijemce*/
		ExterniSubjektAdresaPrijemce=70,
		/**CisloDokladu*/
		CisloDokladu=80,
		/**BankovniUcetCisloUctu*/
		BankovniUcetCisloUctu=90,
		/**BankovniUcetKodBanky*/
		BankovniUcetKodBanky=100,
		/**BankovniUcetIBAN*/
		BankovniUcetIBAN=110,
		/**BankovniUcetBIC*/
		BankovniUcetBIC=120,
		/**VariabilniSymbol*/
		VariabilniSymbol=130,
		/**KonstatniSymbol*/
		KonstatniSymbol=140,
		/**SpecifickySymbol*/
		SpecifickySymbol=150,
		/**ZpusobUhrady*/
		ZpusobUhrady=160,
		/**Mena*/
		Mena=170,
		/**CastkaVMene*/
		CastkaVMene=180,
		/**CastkaVCZK*/
		CastkaVCZK=190,
		/**DatumZdanitelnehoPlneni*/
		DatumZdanitelnehoPlneni=200,
		/**DatumSplatnosti*/
		DatumSplatnosti=210,
		/**Popis*/
		Popis=220,
		/**PodkladyDPHZdaneniPrijemcem*/
		PodkladyDPHZdaneniPrijemcem=230,
		/**RozpisDPHSazba*/
		RozpisDPHSazba=240,
		/**RozpisDPHZakladDaneVCZK*/
		RozpisDPHZakladDaneVCZK=250,
		/**RozpisDPHDanVCZK*/
		RozpisDPHDanVCZK=260,
		/**RozpisDPHCelkovaCastkaSDaniVDanoveSazbe*/
		RozpisDPHCelkovaCastkaSDaniVDanoveSazbe=270,
		/**CelkovaCastkaZaokrouhleni*/
		CelkovaCastkaZaokrouhleni=280,
		/**CelkovaCastkaCelkemZakladDane*/
		CelkovaCastkaCelkemZakladDane=290,
		/**CelkovaCastkaCelkemDan*/
		CelkovaCastkaCelkemDan=300,
		/**CelkovaCastkaCelkem*/
		CelkovaCastkaCelkem=310,
		/**ZalohyZaokrouhleni*/
		ZalohyZaokrouhleni=320,
		/**ZalohyCelkemZakladDane*/
		ZalohyCelkemZakladDane=330,
		/**ZalohyCelkemDan*/
		ZalohyCelkemDan=340,
		/**ZalohyCelkem*/
		ZalohyCelkem=350,
		/**QRCode*/
		QRCode=360,
		/**ExterniSubjekt*/
		ExterniSubjekt=370,
		/**DatumVystaveni*/
		DatumVystaveni=380,
		/**KategorieDokladu*/
		KategorieDokladu=390,
		/**Bankovní účet*/
		BankovniUcet=400,
		/**Druh dokladu*/
		DruhDokladu=410,
		/**Celkem k úhradě*/
		CelkemKUhrade=420,
		/**Druh platby*/
		DruhPlatby=430,
		/**Příznak dodanění*/
		PriznakDodaneni=440,
		/**IČO odběratele*/
		OdberatelIC=450,
		/**Název odběratele*/
		OdberatelNazev=460,
		/**DIČ odběratele*/
		OdberatelDIC=470,
		/**Fakturační adresa odběratele*/
		OdberatelAdresaFakturacni=480,
		/**Dodací adresa odběratele*/
		OdberatelAdresaDodaci=490,
	}
	function GGinctpoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinctpoEnum, Gordic.Ginis.DbModel.GGinctpoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinctydDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginctyd*/
	interface GGinctydDto {
		/**DBCOLUMN:ginctyd.typ_dne*/
		typ_dne?: number|null;
		/**DBCOLUMN:ginctyd.typ_dne_txt*/
		typ_dne_txt?: string|null;
		/**DBCOLUMN:ginctyd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginctyd.k_s*/
		k_s?: string|null;
	}
	const enum GGinctydDtoNames { typ_dne = "typ_dne", typ_dne_txt = "typ_dne_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinctydDtoFragments { typ_dne = "*", typ_dne_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinctydDtoTypes { typ_dne = "number", typ_dne_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinctydDtoTypeLengths { typ_dne_txt = 50, k_s = 15,}
	/**ENUM:ginctyd*/
	const enum GGinctydEnum {
		/**neurčeno*/
		neurceno=0,
		/**pracovní*/
		pracovni=10,
		/**pracovní volno*/
		pracovni_volno=20,
		/**pracovní klid*/
		pracovni_klid=30,
		/**státní svátek*/
		statni_svatek=40,
	}
	function GGinctydEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinctydEnum, Gordic.Ginis.DbModel.GGinctydDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinczmpDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:ginczmp*/
	interface GGinczmpDto {
        /**DBCOLUMN:ginczmp.typ_zmp*/
		typ_zmp?: number|null;
        /**DBCOLUMN:ginczmp.typ_zmp_txt*/
		typ_zmp_txt?: string|null;
        /**DBCOLUMN:ginczmp.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:ginczmp.k_s*/
		k_s?: string|null;
	}
	const enum GGinczmpDtoNames { typ_zmp = "typ_zmp", typ_zmp_txt = "typ_zmp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinczmpDtoFragments { typ_zmp = "*", typ_zmp_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinczmpDtoTypes { typ_zmp = "number", typ_zmp_txt = "string", k_v = "number", k_s = "string",}
    /**ENUM:ginczmp*/
	const enum GGinczmpEnum {
        /**Řádné obsazení*/
		Radne_obsazeni=10,
        /**Zástup*/
		Zastup=20,
	}
	function GGinczmpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinczmpEnum, Gordic.Ginis.DbModel.GGinczmpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinczulDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginczul*/
	interface GGinczulDto {
		/**DBCOLUMN:ginczul.zpus_uloz*/
		zpus_uloz?: number|null;
		/**DBCOLUMN:ginczul.zpus_uloz_txt*/
		zpus_uloz_txt?: string|null;
		/**DBCOLUMN:ginczul.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginczul.k_s*/
		k_s?: string|null;
	}
	const enum GGinczulDtoNames { zpus_uloz = "zpus_uloz", zpus_uloz_txt = "zpus_uloz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinczulDtoFragments { zpus_uloz = "*", zpus_uloz_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinczulDtoTypes { zpus_uloz = "number", zpus_uloz_txt = "string", k_v = "number", k_s = "string",}
	/**ENUM:ginczul*/
	const enum GGinczulEnum {
		/**Neevidovaný výstup*/
		_0=0,
		/**Elektronický obraz*/
		_10=10,
		/**Elektronická příloha*/
		_20=20,
		/**Evidovaný výstup*/
		_30=30,
		/**Nová písemnost*/
		_40=40,
	}
	function GGinczulEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGinczulEnum, Gordic.Ginis.DbModel.GGinczulDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinsaibDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginsaib
	*      URL pro externí konektory AIB
	*/
	interface GGinsaibDto {
		ico_adm?: string|null;
		aib_modul?: number|null;
		gin_aib_url?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		aib_enabled?: number|null;
		modul_enabled?: number|null;
	}
	const enum GGinsaibDtoNames { ico_adm = "ico_adm", aib_modul = "aib_modul", gin_aib_url = "gin_aib_url", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aib_enabled = "aib_enabled", modul_enabled = "modul_enabled",}
	const enum GGinsaibDtoFragments { ico_adm = "*", aib_modul = "*", gin_aib_url = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", aib_enabled = "*", modul_enabled = "*",}
	const enum GGinsaibDtoTypes { ico_adm = "string", aib_modul = "number", gin_aib_url = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", aib_enabled = "number", modul_enabled = "number",}
	const enum GGinsaibDtoTypeLengths { ico_adm = 10, gin_aib_url = 1000, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Gin\GGinskalDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:ginskal*/
	interface GGinskalDto {
		/**DBCOLUMN:ginskal.datum*/
		datum?: JsonDate|null;
		/**DBCOLUMN:ginskal.den_mes*/
		den_mes?: number|null;
		/**DBCOLUMN:ginskal.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:ginskal.rok*/
		rok?: number|null;
		/**DBCOLUMN:ginskal.den_tyd*/
		den_tyd?: number|null;
		/**DBCOLUMN:ginskal.tyden*/
		tyden?: number|null;
		/**DBCOLUMN:ginskal.typ_dne*/
		typ_dne?: Gordic.Ginis.DbModel.GGinctydEnum|null;
		/**DBCOLUMN:ginskal.svatek*/
		svatek?: string|null;
		/**Pořadové číslo dne v rámci roku. První den roku bude mít číslo 1. Nepracovní dny budou NULL ( dříve byly 0 )*/
		prac_por_cislo?: number|null;
		/**DBCOLUMN:ginskal.cas_start*/
		cas_start?: JsonDate|null;
		/**DBCOLUMN:ginskal.cas_stop*/
		cas_stop?: JsonDate|null;
		/**DBCOLUMN:ginskal.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginskal.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Pořadové číslo pracovního dnes spojité přes všechny roky. Nepracovní dny budou NULL ( dříve byly 0 )*/
		prac_por_cislo_tot?: number|null;
		/**DBCOLUMN:ginskal.dat_zmena*/
		TypDne?: Gordic.Ginis.DbModel.GGinctydDto|null;
	}
	const enum GGinskalDtoNames { datum = "datum", den_mes = "den_mes", mesic = "mesic", rok = "rok", den_tyd = "den_tyd", tyden = "tyden", typ_dne = "typ_dne", svatek = "svatek", prac_por_cislo = "prac_por_cislo", cas_start = "cas_start", cas_stop = "cas_stop", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prac_por_cislo_tot = "prac_por_cislo_tot", TypDne = "TypDne",}
	const enum GGinskalDtoFragments { datum = "*", den_mes = "*", mesic = "*", rok = "*", den_tyd = "*", tyden = "*", typ_dne = "*", svatek = "*", prac_por_cislo = "*", cas_start = "*", cas_stop = "*", dat_zmena = "*", zmenu_prov = "*", prac_por_cislo_tot = "*", TypDne = "*",}
	const enum GGinskalDtoTypes { datum = "JsonDate", den_mes = "number", mesic = "number", rok = "number", den_tyd = "number", tyden = "number", typ_dne = "Gordic.Ginis.DbModel.GGinctydEnum", svatek = "string", prac_por_cislo = "number", cas_start = "JsonDate", cas_stop = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", prac_por_cislo_tot = "number", TypDne = "Gordic.Ginis.DbModel.GGinctydDto",}
	const enum GGinskalDtoTypeLengths { svatek = 100, zmenu_prov = 12,}
	/**Historie písemnosti.*/
	const enum GGinskalFilter {
		/**DBCOLUMN:ginskal.datum*/
		datum,
		/**DBCOLUMN:ginskal.den_mes*/
		den_mes,
		/**DBCOLUMN:ginskal.mesic*/
		mesic,
		/**DBCOLUMN:ginskal.rok*/
		rok,
		/**DBCOLUMN:ginskal.den_tyd*/
		den_tyd,
		/**DBCOLUMN:ginskal.tyden*/
		tyden,
		/**DBCOLUMN:ginskal.typ_dne*/
		typ_dne,
		/**DBCOLUMN:ginskal.svatek*/
		svatek,
		/**Pořadové číslo dne v rámci roku. První den roku bude mít číslo 1. Nepracovní dny budou NULL ( dříve byly 0 )*/
		prac_por_cislo,
		/**DBCOLUMN:ginskal.cas_start*/
		cas_start,
		/**DBCOLUMN:ginskal.cas_stop*/
		cas_stop,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Iissp\GZpusobVolaniDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Dto pro GIisspZpusobVolaniEnum – určuje způsob volání aplikační logiky IISSP*/
	interface GIisspZpusobVolaniDto {
		/**DBCOLUMN:hand written*/
		zpusob_volani?: number|null;
		/**DBCOLUMN:hand written.zpusob_volani_txt*/
		zpusob_volani_txt?: string|null;
	}
	const enum GIisspZpusobVolaniDtoNames { zpusob_volani = "zpusob_volani", zpusob_volani_txt = "zpusob_volani_txt",}
	const enum GIisspZpusobVolaniDtoFragments { zpusob_volani = "*", zpusob_volani_txt = "*",}
	const enum GIisspZpusobVolaniDtoTypes { zpusob_volani = "number", zpusob_volani_txt = "string",}
	const enum GIisspZpusobVolaniDtoTypeLengths { zpusob_volani_txt = 100,}
	/**ENUM pro GIisspZpusobVolaniDto – určuje způsob volání aplikační logiky IISSP*/
	const enum GIisspZpusobVolaniEnum {
		/**Online volání*/
		online=10,
		/**Offline volání*/
		offline=20,
		/**Simulace - Schváleno*/
		simulace_schvaleno=30,
		/**Simulace – Schváleno s výhradou*/
		simulace_schvaleno_s_vyhradou=40,
		/**Simulace – Zamítnuto*/
		simulace_zamitnuto=50,
	}
	function GIisspZpusobVolaniEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GIisspZpusobVolaniEnum, Gordic.Ginis.DbModel.GIisspZpusobVolaniDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Spi\GSpicsulDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:spicsul*/
	interface GSpicsulDto {
        /**DBCOLUMN:spicsul.stav_sul*/
		stav_sul?: number|null;
        /**DBCOLUMN:spicsul.stav_sul_txt*/
		stav_sul_txt?: string|null;
        /**DBCOLUMN:spicsul.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:spicsul.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:spicsul.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:spicsul.stav_sul_rsx*/
		stav_sul_rsx?: number|null;
	}
	const enum GSpicsulDtoNames { stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", stav_sul_rsx = "stav_sul_rsx",}
	const enum GSpicsulDtoFragments { stav_sul = "*", stav_sul_txt = "*", k_v = "*", k_s = "*", k_xml = "*", stav_sul_rsx = "*",}
	const enum GSpicsulDtoTypes { stav_sul = "number", stav_sul_txt = "string", k_v = "number", k_s = "string", k_xml = "string", stav_sul_rsx = "number",}
    /**ENUM:spicsul*/
	const enum GSpicsulEnum {
        /**neuloženo*/
		neulozeno=0,
        /**uloženo*/
		ulozeno=10,
        /**převáděno*/
		prevadeno=20,
        /**ztraceno*/
		ztraceno=30,
        /**archivováno*/
		archivovano=40,
        /**připraveno pro mimořádnou skartaci*/
		pripraveno_pro_mmr_skartaci=45,
        /**skartováno*/
		skartovano=50,
        /**mimořádně archivováno*/
		mimoradne_archivovano=54,
        /**mimořádně skartováno*/
		mimoradne_skartovano=55,
        /**vloženo do balíku*/
		vlozeno_do_baliku=60,
        /**vloženo do balíku (neevidovaný dokument)*/
		vlozeno_do_baliku_neev_dok=65,
        /**připraveno*/
		pripraveno=70,
        /**přiděleno do spisovny*/
		prideleno_do_spisovny=75,
        /**delimitováno*/
		delimitovano=80,
        /**stornováno*/
		stornovano=90,
        /**zrušeno*/
		zruseno=900,
	}
	function GSpicsulEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSpicsulEnum, Gordic.Ginis.DbModel.GSpicsulDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcekdDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcekd*/
	interface GSslcekdDto {
		/**DBCOLUMN:sslcekd.documenttype*/
		documenttype?: string|null;
		/**DBCOLUMN:sslcekd.documenttype_txt*/
		documenttype_txt?: string|null;
		/**DBCOLUMN:sslcekd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcekd.k_s*/
		k_s?: string|null;
	}
	const enum GSslcekdDtoNames { documenttype = "documenttype", documenttype_txt = "documenttype_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcekdDtoFragments { documenttype = "*", documenttype_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcekdDtoTypes { documenttype = "string", documenttype_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcekdDtoTypeLengths { documenttype = 10, documenttype_txt = 50, k_s = 15,}
	/**ENUM:sslcekd*/
	const enum GSslcekdEnum {
		/**Materiál k připomínkování*/
		request,
		/**Připomínka*/
		review,
	}
	function GSslcekdEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcekdEnum, Gordic.Ginis.DbModel.GSslcekdDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcekeDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslceke*/
	interface GSslcekeDto {
		/**DBCOLUMN:sslceke.stav_materialu*/
		stav_materialu?: string|null;
		/**DBCOLUMN:sslceke.stav_materialu_txt*/
		stav_materialu_txt?: string|null;
		/**DBCOLUMN:sslceke.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslceke.k_s*/
		k_s?: string|null;
	}
	const enum GSslcekeDtoNames { stav_materialu = "stav_materialu", stav_materialu_txt = "stav_materialu_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcekeDtoFragments { stav_materialu = "*", stav_materialu_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcekeDtoTypes { stav_materialu = "string", stav_materialu_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcekeDtoTypeLengths { stav_materialu = 4, stav_materialu_txt = 50, k_s = 15,}
	/**ENUM:sslceke*/
	const enum GSslcekeEnum {
		/**2 - v připomínkovém řízení*/
		_2="2",
		/**3 - připomínkové řízení ukončeno*/
		_3="3",
		/**3ZV - k posouzení MZV*/
		_3ZV="3ZV",
		/**4 - odmítnuta verze pro jednání vlády*/
		_4="4",
		/**4PK - odmítnuto OVL*/
		_4PK="4PK",
		/**5 - pro jednání vlády*/
		_5="5",
		/**6 - přijato ÚV ke zpracování*/
		_6="6",
		/**6PK - přijato ÚV ke zpracování*/
		_6PK="6PK",
		/**7 - zařazeno do evidence*/
		_7="7",
		/**7PK - zařazeno do evidence OVL*/
		_7PK="7PK",
		/**8 - zařazeno na jednání vlády*/
		_8="8",
		/**8PK - zařazeno na jednání PK*/
		_8PK="8PK",
		/**9 - projednáno*/
		_9="9",
		/**9PK - projednáno PK*/
		_9PK="9PK",
		/**A - zapracovány změny*/
		A="A",
		/**B - signováno*/
		B="B",
		/**C - zasláno PSP*/
		C="C",
		/**CE - zaevidováno v PSP*/
		CE="CE",
		/**D - projednáváno v PSP*/
		D="D",
		/**DP - návrh vrácen PSP k přepracování*/
		DP="DP",
		/**DS - návrh schválen v PSP*/
		DS="DS",
		/**DSP - návrh vrácený prezidentem schválený PSP*/
		DSP="DSP",
		/**DSZ - návrh schválen v senátním znění*/
		DSZ="DSZ",
		/**DUZ - návrh v rozporu s ústavním pořádkem*/
		DUZ="DUZ",
		/**DX - projednávání v PSP ukončeno*/
		DX="DX",
		/**DZ - návrh zamítnut v PSP*/
		DZ="DZ",
		/**DZV - návrh vzat zpět*/
		DZV="DZV",
		/**E - předáno do Senátu*/
		E="E",
		/**EE - zaevidováno v Senátu*/
		EE="EE",
		/**F - projednáváno v Senátu*/
		F="F",
		/**FS - návrh schválen Senátem*/
		FS="FS",
		/**FSN - senát se návrhem nezabýval*/
		FSN="FSN",
		/**FUZ - návrh v rozporu s ústavním pořádkem*/
		FUZ="FUZ",
		/**FVZ - návrh vrácen Senátem se změnami*/
		FVZ="FVZ",
		/**FZ - návrh zamítnut Senátem*/
		FZ="FZ",
		/**G - návrh schválen Parlamentem*/
		G="G",
		/**J - předáno do tisku*/
		J="J",
		/**K - publikováno ve Sbírce zákonů*/
		K="K",
		/**M - vyhlášeno ve Sbírce mezinárodních smluv*/
		M="M",
		/**P - předáno prezidentovi*/
		P="P",
		/**PE - zaevidováno KPR*/
		PE="PE",
		/**PM - Postoupeno ke kontrasignaci premiérovi*/
		PM="PM",
		/**PN - Prezident je neaktivní*/
		PN="PN",
		/**PNR - Prezident ratifikoval*/
		PNR="PNR",
		/**PS - Prezident signoval*/
		PS="PS",
		/**PZ - Prezident odmítl signovat*/
		PZ="PZ",
		/**Q - předseda Senátu podepsal*/
		Q="Q",
		/**R - nutný souhlas v referendu*/
		R="R",
		/**RIA1 - v připomínkovém řízení*/
		RIA1="RIA1",
		/**RIA2 - připomínkové řízení ukončeno*/
		RIA2="RIA2",
		/**RIA3 - závěrečná zpráva vložena*/
		RIA3="RIA3",
		/**RS - souhlas v referendu*/
		RS="RS",
		/**RZ - zamítnuto v referendu*/
		RZ="RZ",
		/**S - Kontrasignováno*/
		S="S",
		/**U - Projednávání předčasně ukončeno předkladatelem*/
		U="U",
		/**Y - skartováno*/
		Y="Y",
	}
	function GSslcekeEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcekeEnum, Gordic.Ginis.DbModel.GSslcekeDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcekmDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcekm*/
	interface GSslcekmDto {
		/**DBCOLUMN:sslcekm.typ_materialu*/
		typ_materialu?: string|null;
		/**DBCOLUMN:sslcekm.typ_materialu_txt*/
		typ_materialu_txt?: string|null;
		/**DBCOLUMN:sslcekm.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcekm.k_s*/
		k_s?: string|null;
	}
	const enum GSslcekmDtoNames { typ_materialu = "typ_materialu", typ_materialu_txt = "typ_materialu_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcekmDtoFragments { typ_materialu = "*", typ_materialu_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcekmDtoTypes { typ_materialu = "string", typ_materialu_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcekmDtoTypeLengths { typ_materialu = 4, typ_materialu_txt = 50, k_s = 15,}
	/**ENUM:sslcekm*/
	const enum GSslcekmEnum {
		/**Návrh na sjednání mezinárodní smlouvy prezidentské*/
		MSP="MSP",
		/**Návrh na sjednání mezinárodní smlouvy rezortní*/
		MSR="MSR",
		/**Návrh na sjednání mezinárodní smlouvy vládní*/
		MSV="MSV",
		/**Návrh krajského zastupitelstva*/
		NKZ="NKZ",
		/**Nelegislativní materiál*/
		NLNV="NLNV",
		/**Návrh nařízení vlády*/
		NNV="NNV",
		/**Návrh vyhlášky*/
		NV="NV",
		/**Návrh věcného záměru zákona*/
		NVZZ="NVZZ",
		/**Návrh zákona*/
		NZ="NZ",
		/**Návrh zákona předložený PS*/
		PNZ="PNZ",
		/**Směrnice pro jednání o mezinárodní smlouvě vládní*/
		SMSV="SMSV",
		/**Senátní návrh zákona*/
		SNZ="SNZ",
		/**Úplné znění zákona*/
		UZZ="UZZ",
		/**Zákonné opatření Senátu*/
		ZOS="ZOS",
	}
	function GSslcekmEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcekmEnum, Gordic.Ginis.DbModel.GSslcekmDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcekpDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcekp*/
	interface GSslcekpDto {
		/**DBCOLUMN:sslcekp.typ_pril*/
		typ_pril?: string|null;
		/**DBCOLUMN:sslcekp.typ_pril_txt*/
		typ_pril_txt?: string|null;
		/**DBCOLUMN:sslcekp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcekp.k_s*/
		k_s?: string|null;
	}
	const enum GSslcekpDtoNames { typ_pril = "typ_pril", typ_pril_txt = "typ_pril_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcekpDtoFragments { typ_pril = "*", typ_pril_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcekpDtoTypes { typ_pril = "string", typ_pril_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcekpDtoTypeLengths { typ_pril = 3, typ_pril_txt = 50, k_s = 15,}
	/**ENUM:sslcekp*/
	const enum GSslcekpEnum {
		/**Materiál*/
		ma,
		/**Další příloha materiálu*/
		mp,
		/**Text v českém jazyce*/
		msc,
		/**Text v cizím jazyce*/
		mso,
		/**Návrh prováděcích právních předpisů*/
		np,
		/**Návrh usnesení - PSP*/
		nup,
		/**Návrh usnesení - SEN*/
		nus,
		/**Obálka*/
		ob,
		/**Průvodní dopis*/
		pd,
		/**Přehled dopadů*/
		pdo,
		/**Průvodní dopis změny*/
		pdz,
		/**Připomínka*/
		pr,
		/**Závěrečná zpráva RIA*/
		ria,
		/**Rozdílová tabulka*/
		rt,
		/**Stanovisko*/
		st,
		/**Příloha návrhu usnesení*/
		up,
		/**Návrh usnesení*/
		us,
		/**Usnesení vlády*/
		usn,
		/**Příloha usnesení vlády*/
		uvp,
		/**Vypořádání připomínek*/
		vp,
		/**Důvodová zpráva*/
		zd,
		/**Předkládací zpráva*/
		zp,
		/**Předkládací zpráva pro parlament*/
		zpp,
		/**Informativní přehled veřejnoprávních povinností vyplývajících z návrhu právního předpisu*/
		ip,
	}
	function GSslcekpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcekpEnum, Gordic.Ginis.DbModel.GSslcekpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslceksDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslceks*/
	interface GSslceksDto {
		/**DBCOLUMN:sslceks.stav_rizeni*/
		stav_rizeni?: number|null;
		/**DBCOLUMN:sslceks.stav_rizeni_txt*/
		stav_rizeni_txt?: string|null;
		/**DBCOLUMN:sslceks.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslceks.k_s*/
		k_s?: string|null;
	}
	const enum GSslceksDtoNames { stav_rizeni = "stav_rizeni", stav_rizeni_txt = "stav_rizeni_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslceksDtoFragments { stav_rizeni = "*", stav_rizeni_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslceksDtoTypes { stav_rizeni = "number", stav_rizeni_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslceksDtoTypeLengths { stav_rizeni_txt = 50, k_s = 15,}
	/**ENUM:sslceks*/
	const enum GSslceksEnum {
		/**Vytvořeno*/
		Vytvoreno=0,
		/**Materiál odeslaný*/
		material_odeslany=50,
		/**Připomínka odeslána*/
		pripominka_odeslana=100,
		/**Stornovano*/
		stornovano=200,
	}
	function GSslceksEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslceksEnum, Gordic.Ginis.DbModel.GSslceksDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcektDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcekt*/
	interface GSslcektDto {
		/**DBCOLUMN:sslcekt.typ_pripominky*/
		typ_pripominky?: string|null;
		/**DBCOLUMN:sslcekt.typ_pripominky_txt*/
		typ_pripominky_txt?: string|null;
		/**DBCOLUMN:sslcekt.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcekt.k_s*/
		k_s?: string|null;
	}
	const enum GSslcektDtoNames { typ_pripominky = "typ_pripominky", typ_pripominky_txt = "typ_pripominky_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcektDtoFragments { typ_pripominky = "*", typ_pripominky_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcektDtoTypes { typ_pripominky = "string", typ_pripominky_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcektDtoTypeLengths { typ_pripominky = 2, typ_pripominky_txt = 50, k_s = 15,}
	/**ENUM:sslcekt*/
	const enum GSslcektEnum {
		/**Bez připomínek*/
		BP="BP",
		/**Doporučující připomínka*/
		D="D",
		/**Zásadní připomínka*/
		Z="Z",
	}
	function GSslcektEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcektEnum, Gordic.Ginis.DbModel.GSslcektDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcepkDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Označeno pro EPK.*/
	interface GSslcepkDto {
		/**Označeno pro EPK.*/
		priz_epk?: number|null;
		priz_epk_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů.*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů.*/
		k_s?: string|null;
	}
	const enum GSslcepkDtoNames { priz_epk = "priz_epk", priz_epk_txt = "priz_epk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcepkDtoFragments { priz_epk = "*", priz_epk_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcepkDtoTypes { priz_epk = "number", priz_epk_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcepkDtoTypeLengths { priz_epk_txt = 50, k_s = 15,}
	/**Označeno pro EPK.*/
	const enum GSslcepkEnum {
		/**Nic*/
		nic=0,
		/**Označeno pro EPK editovatelné uživatelem*/
		oznacenoProEPKEditovatelneUzivatelem=1,
		/**Označeno pro EPK editovatelné aplikací*/
		oznacenoProEPKEditovatelneAplikaci=2,
	}
	function GSslcepkEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcepkEnum, Gordic.Ginis.DbModel.GSslcepkDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcspiDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcspi - Stav spisu*/
	interface GSslcspiDto {
		/**stav spisu*/
		stav_spis?: number|null;
		/**popis stavu spisu*/
		stav_spis_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		stav_spis_rsx?: number|null;
	}
	const enum GSslcspiDtoNames { stav_spis = "stav_spis", stav_spis_txt = "stav_spis_txt", k_v = "k_v", k_s = "k_s", stav_spis_rsx = "stav_spis_rsx",}
	const enum GSslcspiDtoFragments { stav_spis = "*", stav_spis_txt = "*", k_v = "*", k_s = "*", stav_spis_rsx = "*",}
	const enum GSslcspiDtoTypes { stav_spis = "number", stav_spis_txt = "string", k_v = "number", k_s = "string", stav_spis_rsx = "number",}
	/**ENUM:sslcspi - Stav spisu*/
	const enum GSslcspiEnum {
		/**The nevyrizen*/
		nevyrizen=10,
		/**The vyrizen*/
		vyrizen=20,
		/**The uzavren*/
		uzavren=30,
		/**The ulozen*/
		ulozen=40,
		/**The vypraven*/
		vypraven=50,
		/**The stornovan*/
		stornovan=60,
		/**The ztracen*/
		ztracen=70,
		/**The preruseno*/
		preruseno=80,
		/**The priorovan*/
		priorovan=90,
	}
	function GSslcspiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcspiEnum, Gordic.Ginis.DbModel.GSslcspiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcsprDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcspr - Příznak priorace spisu*/
	interface GSslcsprDto {
		/**příznak toho, že byl spis priorován*/
		s_prior?: number|null;
		s_prior_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GSslcsprDtoNames { s_prior = "s_prior", s_prior_txt = "s_prior_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcsprDtoFragments { s_prior = "*", s_prior_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcsprDtoTypes { s_prior = "number", s_prior_txt = "string", k_v = "number", k_s = "string",}
	/**ENUM:sslcspr - Způsob doručení*/
	const enum GSslcsprEnum {
		/**nepriorováno*/
		nepriorovano=0,
		/**priorováno*/
		priorovano=10,
	}
	function GSslcsprEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcsprEnum, Gordic.Ginis.DbModel.GSslcsprDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcstaDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:sslcsta*/
	interface GSslcstaDto {
        /**DBCOLUMN:sslcsta.stav_pis_ext*/
		stav_pis_ext?: number|null;
        /**DBCOLUMN:sslcsta.stav_pis_ext_txt*/
		stav_pis_ext_txt?: string|null;
        /**DBCOLUMN:sslcsta.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:sslcsta.k_s*/
		k_s?: string|null;
	}
	const enum GSslcstaDtoNames { stav_pis_ext = "stav_pis_ext", stav_pis_ext_txt = "stav_pis_ext_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcstaDtoFragments { stav_pis_ext = "*", stav_pis_ext_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcstaDtoTypes { stav_pis_ext = "number", stav_pis_ext_txt = "string", k_v = "number", k_s = "string",}
    /**ENUM:sslcsta*/
	const enum GSslcstaEnum {
        /**Neurčeno*/
		_0=0,
	}
	function GSslcstaEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcstaEnum, Gordic.Ginis.DbModel.GSslcstaDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslctvyDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslctvy*/
	interface GSslctvyDto {
		/**DBCOLUMN:sslctvy.typ_vyriz*/
		typ_vyriz?: number|null;
		/**DBCOLUMN:sslctvy.typ_vyriz_txt*/
		typ_vyriz_txt?: string|null;
		/**DBCOLUMN:sslctvy.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslctvy.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:sslctvy.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:sslctvy.typ_vyriz_rsx*/
		typ_vyriz_rsx?: number|null;
	}
	const enum GSslctvyDtoNames { typ_vyriz = "typ_vyriz", typ_vyriz_txt = "typ_vyriz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", typ_vyriz_rsx = "typ_vyriz_rsx",}
	const enum GSslctvyDtoFragments { typ_vyriz = "*", typ_vyriz_txt = "*", k_v = "*", k_s = "*", k_xml = "*", typ_vyriz_rsx = "*",}
	const enum GSslctvyDtoTypes { typ_vyriz = "number", typ_vyriz_txt = "string", k_v = "number", k_s = "string", k_xml = "string", typ_vyriz_rsx = "number",}
	const enum GSslctvyDtoTypeLengths { typ_vyriz_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:sslctvy*/
	const enum GSslctvyEnum {
		/**Nevyřízeno*/
		nevyrizeno=0,
		/**Vyřízeno vzetím na vědomí*/
		vyrizenovzetimnavedomi=10,
		/**Vyřízeno vložením do spisu*/
		vyrizenovlozenimdospisu=20,
		/**Ručně vyřízeno (dokument vložený ve spisu)*/
		rucnevyrizenodokumentvlozenyvespisu=25,
		/**Vyřízeno vložením do agendy*/
		vyrizenovlozenimdoagendy=30,
		/**Vyřízeno - pouze spis*/
		vyrizeno_pouzespis=40,
		/**Vyřízeno odesláním originálu*/
		vyrizenoodeslanimoriginalu=50,
		/**Vyřízeno priorováním*/
		vyrizenopriorovanim=60,
	}
	function GSslctvyEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslctvyEnum, Gordic.Ginis.DbModel.GSslctvyDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Ssl\GSslcvspDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:sslcvsp*/
	interface GSslcvspDto {
		/**DBCOLUMN:sslcvsp.vztah_spis*/
		vztah_spis?: number|null;
		/**DBCOLUMN:sslcvsp.vztah_spis_txt*/
		vztah_spis_txt?: string|null;
		/**DBCOLUMN:sslcvsp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcvsp.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:sslcvsp.k_xml*/
		k_xml?: string|null;
	}
	const enum GSslcvspDtoNames { vztah_spis = "vztah_spis", vztah_spis_txt = "vztah_spis_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSslcvspDtoFragments { vztah_spis = "*", vztah_spis_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSslcvspDtoTypes { vztah_spis = "number", vztah_spis_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSslcvspDtoTypeLengths { vztah_spis_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:sslcvsp*/
	const enum GSslcvspEnum {
		/**Žádný*/
		zadny=0,
		/**Inicializační dokument*/
		iniciacni=10,
		/**Běžný dokument*/
		bezny=20,
		/**Vyřizující dokument*/
		vyrizujici=30,
		/**Iniciační a zároveň vyřizující dokument*/
		iniciacni_vyrizujici=31,
		/**Samotný spis*/
		samotnyspis=40,
		/**Priorovaný dokument*/
		priorovany=50,
	}
	function GSslcvspEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslcvspEnum, Gordic.Ginis.DbModel.GSslcvspDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcannDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Stav anonymizace.*/
	interface GWflcannDto {
		/**Stav anonymizace.*/
		stav_ann?: number|null;
		/**Uživatelský text stavu anonymizace.*/
		stav_ann_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů.*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů.*/
		k_s?: string|null;
		/**DBCOLUMN:wflcann.stav_ann_rsx*/
		stav_ann_rsx?: number|null;
	}
	const enum GWflcannDtoNames { stav_ann = "stav_ann", stav_ann_txt = "stav_ann_txt", k_v = "k_v", k_s = "k_s", stav_ann_rsx = "stav_ann_rsx",}
	const enum GWflcannDtoFragments { stav_ann = "*", stav_ann_txt = "*", k_v = "*", k_s = "*", stav_ann_rsx = "*",}
	const enum GWflcannDtoTypes { stav_ann = "number", stav_ann_txt = "string", k_v = "number", k_s = "string", stav_ann_rsx = "number",}
	const enum GWflcannDtoTypeLengths { stav_ann_txt = 50, k_s = 15,}
	/**Stav anonymizace.*/
	const enum GWflcannEnum {
		/**Neurčeno*/
		neurceno=0,
		/**Anonymizováno*/
		anonymizovano=10,
	}
	function GWflcannEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcannEnum, Gordic.Ginis.DbModel.GWflcannDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcdrzDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflcdrz - Druh zásilky*/
	interface GWflcdrzDto {
        /**DBCOLUMN:wflcdrz.druh_zas*/
		druh_zas?: number|null;
        /**DBCOLUMN:wflcdrz.druh_zas_txt*/
		druh_zas_txt?: string|null;
        /**DBCOLUMN:wflcdrz.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflcdrz.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:wflcdrz.aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:wflcdrz.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:wflcdrz.druh_zas_zkr*/
		druh_zas_zkr?: string|null;
        /**DBCOLUMN:wflcdrz.priz_zahr*/
		priz_zahr?: number|null;
        /**DBCOLUMN:wflcdrz.priz_doruc*/
		priz_doruc?: number|null;
        /**DBCOLUMN:wflcdrz.filtr_format*/
		filtr_format?: string|null;
        /**DBCOLUMN:wflcdrz.povol_sl*/
		povol_sl?: string|null;
        /**DBCOLUMN:wflcdrz.dat_zmena*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:wflcdrz.zmenu_prov*/
		zmenu_prov?: string|null;
        /**DBCOLUMN:wflcdrz.ixs_lpc*/
		ixs_lpc?: string|null;
        /**DBCOLUMN:wflcdrz.druh_zas_rsx*/
		druh_zas_rsx?: number|null;
	}
	const enum GWflcdrzDtoNames { druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", k_xml = "k_xml", druh_zas_zkr = "druh_zas_zkr", priz_zahr = "priz_zahr", priz_doruc = "priz_doruc", filtr_format = "filtr_format", povol_sl = "povol_sl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", druh_zas_rsx = "druh_zas_rsx",}
	const enum GWflcdrzDtoFragments { druh_zas = "*", druh_zas_txt = "*", k_v = "*", k_s = "*", aktivita = "*", k_xml = "*", druh_zas_zkr = "*", priz_zahr = "*", priz_doruc = "*", filtr_format = "*", povol_sl = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", druh_zas_rsx = "*",}
	const enum GWflcdrzDtoTypes { druh_zas = "number", druh_zas_txt = "string", k_v = "number", k_s = "string", aktivita = "number", k_xml = "string", druh_zas_zkr = "string", priz_zahr = "number", priz_doruc = "number", filtr_format = "string", povol_sl = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", druh_zas_rsx = "number",}
    /**ENUM:wflcdrz - Druh zásilky*/
	const enum GWflcdrzEnum {
        /**neurčeno*/
		neurceno=0,
        /**dopis*/
		dopis=10,
        /**dopisnice*/
		dopisnice=20,
        /**obyčejný balík*/
		balik=30,
        /**doporučený balíček*/
		doporucenybalicek=31,
        /**standardní balík do zahraničí*/
		standardnibalikdozahranici=35,
        /**cenné psaní*/
		cennepsani=40,
        /**cenné psaní do zahraničí*/
		cennepsanidozahranici=45,
        /**cenný balík*/
		cennybalik=50,
        /**cenný balík do zahraničí*/
		cennybalikdodzahranici=55,
        /**obyčejné psaní*/
		psani=60,
        /**doporučená zásilka*/
		doporucenazasilka=61,
        /**obyčejná zásilka do zahraničí*/
		obycejnazasilkadozahranici=65,
        /**doporučená zásilka do zahranič*/
		doporucenazasilkadozahranici=66,
        /**obyčejná slepecká zásilka*/
		slepeckazasilka=70,
        /**doporučená slepecká zásilka*/
		doporucenaslepeckazasilka=71,
        /**obyčejná slepecká zásilka do zahraničí*/
		obycejnaslepeckazasilkadozahranici=75,
        /**doporučená slepecká zásilka do*/
		doporucenaslepeckazasilkadozahranici=76,
        /**obyčejné psaní - standard*/
		psanistandard=80,
        /**doporučená zásilka - standard*/
		doporucenazasilka_standard=81,
        /**obchodní psaní*/
		obchodnipsani=90,
        /**obchodní psaní do zahraničí*/
		obchodnipsanidozahranici=95,
        /**obchodní balík do zahraničí*/
		obchodnibalikdozahranici=105,
        /**EMS - vnitrostátní*/
		ems_vnitrostatni=110,
        /**obchodní balík*/
		obchodnibalik=900,
        /**ccccccc*/
		cccc=2000,
        /**sxdasz*/
		asdas=2001,
	}
	function GWflcdrzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcdrzEnum, Gordic.Ginis.DbModel.GWflcdrzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflceleDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Elektronická forma dokumentu.*/
	interface GWflceleDto {
		/**DBCOLUMN:wflcele.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:wflcele.s_ele_txt*/
		s_ele_txt?: string|null;
		/**DBCOLUMN:wflcele.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcele.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcele.k_xml*/
		k_xml?: string|null;
	}
	const enum GWflceleDtoNames { s_ele = "s_ele", s_ele_txt = "s_ele_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GWflceleDtoFragments { s_ele = "*", s_ele_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GWflceleDtoTypes { s_ele = "number", s_ele_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GWflceleDtoTypeLengths { s_ele_txt = 50, k_s = 15, k_xml = 254,}
	/**Elektronická forma dokumentu.*/
	const enum GWflceleEnum {
		/**Písemnost nemá elektronickou podobu*/
		neexistuje=0,
		/**Písemnost má elektronickou podobu*/
		existuje_neaut_konv=1,
		/**Dokument má primárně elektronickou podobu*/
		existuje=2,
		/**Hybridní spis bez el. obrazu*/
		hybridni_spis=3,
	}
	function GWflceleEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflceleEnum, Gordic.Ginis.DbModel.GWflceleDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcfyzDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Fyzická forma dokumentu.*/
	interface GWflcfyzDto {
		/**DBCOLUMN:wflcfyz.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:wflcfyz.s_fyz_txt*/
		s_fyz_txt?: string|null;
		/**DBCOLUMN:wflcfyz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcfyz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcfyz.k_xml*/
		k_xml?: string|null;
	}
	const enum GWflcfyzDtoNames { s_fyz = "s_fyz", s_fyz_txt = "s_fyz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GWflcfyzDtoFragments { s_fyz = "*", s_fyz_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GWflcfyzDtoTypes { s_fyz = "number", s_fyz_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GWflcfyzDtoTypeLengths { s_fyz_txt = 50, k_s = 15, k_xml = 254,}
	/**Fyzická forma dokumentu.*/
	const enum GWflcfyzEnum {
		/**Nemá fyzickou podobu*/
		neexistuje=0,
		/**Má fyzickou podobu*/
		existuje_neaut_konv=1,
		/**Dokument má primárně fyzickou podobu*/
		existuje=2,
	}
	function GWflcfyzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcfyzEnum, Gordic.Ginis.DbModel.GWflcfyzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcpakDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflcpak*/
	interface GWflcpakDto {
        /**DBCOLUMN:wflcpak.priz_akr*/
		priz_akr?: number|null;
        /**DBCOLUMN:wflcpak.priz_akr_txt*/
		priz_akr_txt?: string|null;
        /**DBCOLUMN:wflcpak.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflcpak.k_s*/
		k_s?: string|null;
	}
	const enum GWflcpakDtoNames { priz_akr = "priz_akr", priz_akr_txt = "priz_akr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcpakDtoFragments { priz_akr = "*", priz_akr_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcpakDtoTypes { priz_akr = "number", priz_akr_txt = "string", k_v = "number", k_s = "string",}
    /**ENUM:wflcpak*/
	const enum GWflcpakEnum {
        /**Neakreditovaná*/
		neakreditovana=0,
        /**Akreditovaná*/
		akreditovana=10,
	}
	function GWflcpakEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcpakEnum, Gordic.Ginis.DbModel.GWflcpakDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcpcjDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcpcj*/
	interface GWflcpcjDto {
		/**DBCOLUMN:wflcpcj.priz_cj*/
		priz_cj?: number|null;
		/**DBCOLUMN:wflcpcj.priz_cj_txt*/
		priz_cj_txt?: string|null;
		/**DBCOLUMN:wflcpcj.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcpcj.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcpcj.k_xml*/
		k_xml?: string|null;
	}
	const enum GWflcpcjDtoNames { priz_cj = "priz_cj", priz_cj_txt = "priz_cj_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GWflcpcjDtoFragments { priz_cj = "*", priz_cj_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GWflcpcjDtoTypes { priz_cj = "number", priz_cj_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GWflcpcjDtoTypeLengths { priz_cj_txt = 254, k_s = 15, k_xml = 254,}
	/**ENUM:wflcpcj*/
	const enum GWflcpcjEnum {
		/**Vazba na ČJ neexistuje*/
		neni_cj=0,
		/**Dokument je primárním dokumentem (dokument pro levou stranu podacího deníku)*/
		iniciacni_k_cj=1,
		/**Dokument je sekundárním dokumentem (dokument pro pravou stranu podacího deníku)*/
		vyrizujici_k_cj=2,
	}
	function GWflcpcjEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcpcjEnum, Gordic.Ginis.DbModel.GWflcpcjDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcpriDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcpri*/
	interface GWflcpriDto {
		/**DBCOLUMN:wflcpri.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:wflcpri.priz_spis_txt*/
		priz_spis_txt?: string|null;
		/**DBCOLUMN:wflcpri.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcpri.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcpri.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcpri.priz_spis_rsx*/
		priz_spis_rsx?: number|null;
	}
	const enum GWflcpriDtoNames { priz_spis = "priz_spis", priz_spis_txt = "priz_spis_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priz_spis_rsx = "priz_spis_rsx",}
	const enum GWflcpriDtoFragments { priz_spis = "*", priz_spis_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priz_spis_rsx = "*",}
	const enum GWflcpriDtoTypes { priz_spis = "number", priz_spis_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priz_spis_rsx = "number",}
	const enum GWflcpriDtoTypeLengths { priz_spis_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:wflcpri*/
	const enum GWflcpriEnum {
		/**Samostatná písemnost*/
		pisemnost=0,
		/**Spis*/
		spis=1,
		/**Písemnost ve spisu*/
		pisemnost_ve_spisu=2,
	}
	function GWflcpriEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcpriEnum, Gordic.Ginis.DbModel.GWflcpriDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcpuvDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Původ dokumentu.*/
	interface GWflcpuvDto {
		/**DBCOLUMN:wflcpuv.puvod*/
		puvod?: number|null;
		/**DBCOLUMN:wflcpuv.puvod_txt*/
		puvod_txt?: string|null;
		/**DBCOLUMN:wflcpuv.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcpuv.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcpuv.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcpuv.puvod_rsx*/
		puvod_rsx?: number|null;
	}
	const enum GWflcpuvDtoNames { puvod = "puvod", puvod_txt = "puvod_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", puvod_rsx = "puvod_rsx",}
	const enum GWflcpuvDtoFragments { puvod = "*", puvod_txt = "*", k_v = "*", k_s = "*", k_xml = "*", puvod_rsx = "*",}
	const enum GWflcpuvDtoTypes { puvod = "number", puvod_txt = "string", k_v = "number", k_s = "string", k_xml = "string", puvod_rsx = "number",}
	const enum GWflcpuvDtoTypeLengths { puvod_txt = 254, k_s = 15, k_xml = 254,}
	/**Původ dokumentu.*/
	const enum GWflcpuvEnum {
		/**ruční evidence*/
		rucni_evidence=0,
		/**elektronické podání*/
		elektronicke_podani=10,
		/**datová schránka*/
		datova_schranka=20,
		/**interface, xrg*/
		interface_xrg=30,
	}
	function GWflcpuvEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcpuvEnum, Gordic.Ginis.DbModel.GWflcpuvDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcrevDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflcrev*/
	interface GWflcrevDto {
        /**DBCOLUMN:wflcrev.stav_revok*/
		stav_revok?: number|null;
        /**DBCOLUMN:wflcrev.stav_revok_txt*/
		stav_revok_txt?: string|null;
        /**DBCOLUMN:wflcrev.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflcrev.k_s*/
		k_s?: string|null;
	}
	const enum GWflcrevDtoNames { stav_revok = "stav_revok", stav_revok_txt = "stav_revok_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcrevDtoFragments { stav_revok = "*", stav_revok_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcrevDtoTypes { stav_revok = "number", stav_revok_txt = "string", k_v = "number", k_s = "string",}
    /**ENUM:wflcrev*/
	const enum GWflcrevEnum {
        /**Platný*/
		platny=0,
        /**Revokovaný*/
		revokovany=1,
	}
	function GWflcrevEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcrevEnum, Gordic.Ginis.DbModel.GWflcrevDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcscjDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcscj
	*      Stav č.j.
	*/
	interface GWflcscjDto {
		/**Stav č.j.*/
		stav_cj?: number|null;
		/**popis*/
		stav_cj_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GWflcscjDtoNames { stav_cj = "stav_cj", stav_cj_txt = "stav_cj_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GWflcscjDtoFragments { stav_cj = "*", stav_cj_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GWflcscjDtoTypes { stav_cj = "number", stav_cj_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GWflcscjDtoTypeLengths { stav_cj_txt = 254, k_s = 15, k_xml = 254,}
	/**ENUM:wflcscj*/
	const enum GWflcscjEnum {
		/**Nevyrizeno*/
		nevyrizeno=10,
		/**Vyrizeno*/
		vyrizeno=20,
		/**Uzavreno*/
		uzavreno=30,
		/**Stornovano*/
		stornovano=60,
		/**Stornovano*/
		ztraceno=70,
		/**Stornovano*/
		preevidovano=90,
		/**Stornovano*/
		predano_do_agendy=100,
	}
	function GWflcscjEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcscjEnum, Gordic.Ginis.DbModel.GWflcscjDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcsdoDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcsdo*/
	interface GWflcsdoDto {
		/**DBCOLUMN:wflcsdo.s_dor*/
		s_dor?: number|null;
		/**DBCOLUMN:wflcsdo.s_dor_txt*/
		s_dor_txt?: string|null;
		/**DBCOLUMN:wflcsdo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcsdo.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcsdo.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcsdo.s_dor_rsx*/
		s_dor_rsx?: number|null;
	}
	const enum GWflcsdoDtoNames { s_dor = "s_dor", s_dor_txt = "s_dor_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", s_dor_rsx = "s_dor_rsx",}
	const enum GWflcsdoDtoFragments { s_dor = "*", s_dor_txt = "*", k_v = "*", k_s = "*", k_xml = "*", s_dor_rsx = "*",}
	const enum GWflcsdoDtoTypes { s_dor = "number", s_dor_txt = "string", k_v = "number", k_s = "string", k_xml = "string", s_dor_rsx = "number",}
	const enum GWflcsdoDtoTypeLengths { s_dor_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:wflcsdo*/
	const enum GWflcsdoEnum {
		/**Připravováno*/
		pripravovano=0,
		/**Nevypraveno*/
		nevypraveno=10,
		/**Předáno k vypravení*/
		predano_k_vypraveni=15,
		/**Vypraveno*/
		vypraveno=20,
		/**Doručeno*/
		doruceno=30,
		/**Doručení neurčeno*/
		doruceni_neurceno=35,
		/**Vráceno - jiný důvod (ověřeno)*/
		vraceno_jiny_duvod_overeno=40,
		/**Vráceno - jiný důvod (neověřeno)*/
		vraceno_jiny_duvod_neovereno=41,
		/**Vráceno - adresát neznámý*/
		vraceno_adresat_neznamy=50,
		/**Vráceno - adresát se odstěhoval bez udání adresy*/
		vraceno_adresat_se_odstehoval=51,
		/**Vráceno - nepřijato*/
		vraceno_neprijato=60,
		/**Vráceno - nevyžádáno*/
		vraceno_nevyzadano=61,
		/**Nedoručeno - zpracováno*/
		nedoruceno_zpracovano=70,
		/**Vráceno - adresa nedostatečná*/
		vraceno_adresa_nedostatecna=80,
		/**Stornováno*/
		stornovano=90,
		/**Uloženo*/
		ulozeno=100,
		/**Nevypraveno - znovuodesláno*/
		nevypraveno_znovuodeslano=190,
		/**Nevypraveno - chyba systému*/
		nevypraveno_chybasystemu=200,
		/**Nevypraveno - nepodařilo se ověřit DS*/
		nevypraveno_neaktivnizrusenads=201,
		/**Nevypraveno - neexistuje e-mail*/
		nevypraveno_neexistujee_mail=202,
		/**Nevypraveno - neexistuje předpis*/
		nevypraveno_neexistujepredpis=203,
		/**Nevypraveno - nezadána DS odesilatele*/
		nevypraveno_nezadanadsodesilatele=204,
		/**Nevypraveno - nepřipojen žádný el. soubor*/
		nevypraveno_nepripojensoubor=205,
		/**Nevypraveno - překročena velikost DZ*/
		nevypraveno_prekrocenavelikostdz=206,
		/**Nevypraveno - připojeny nepovolené typy souborů*/
		nevypraveno_pripojenynepovolenetypysouboru=207,
		/**Nevypraveno - HP stornováno*/
		nevypraveno_hpstornovano=300,
	}
	function GWflcsdoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcsdoEnum, Gordic.Ginis.DbModel.GWflcsdoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcsezDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Stav zveřejnění.*/
	interface GWflcsezDto {
		/**Stav zveřejnění.*/
		stav_epx_zve?: number|null;
		/**Uživatelský text stavu zveřejnění.*/
		stav_epx_zve_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů.*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů.*/
		k_s?: string|null;
	}
	const enum GWflcsezDtoNames { stav_epx_zve = "stav_epx_zve", stav_epx_zve_txt = "stav_epx_zve_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcsezDtoFragments { stav_epx_zve = "*", stav_epx_zve_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcsezDtoTypes { stav_epx_zve = "number", stav_epx_zve_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcsezDtoTypeLengths { stav_epx_zve_txt = 50, k_s = 15,}
	/**Stav zveřejnění.*/
	const enum GWflcsezEnum {
		/**Neurčeno*/
		neurceno=0,
		/**Ke zveřejnění*/
		keZverejneni=10,
		/**Nezveřejňovat*/
		nezverejnovat=20,
	}
	function GWflcsezEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcsezEnum, Gordic.Ginis.DbModel.GWflcsezDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcsgnDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcsgn*/
	interface GWflcsgnDto {
		/**DBCOLUMN:wflcsgn.s_sgn*/
		s_sgn?: number|null;
		/**DBCOLUMN:wflcsgn.s_sgn_txt*/
		s_sgn_txt?: string|null;
		/**DBCOLUMN:wflcsgn.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcsgn.k_s*/
		k_s?: string|null;
	}
	const enum GWflcsgnDtoNames { s_sgn = "s_sgn", s_sgn_txt = "s_sgn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcsgnDtoFragments { s_sgn = "*", s_sgn_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcsgnDtoTypes { s_sgn = "number", s_sgn_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcsgnDtoTypeLengths { s_sgn_txt = 50, k_s = 15,}
	/**ENUM:wflcsgn*/
	const enum GWflcsgnEnum {
		/**Dokument je není elektronicky podepsán.*/
		neni_elektronicky_podepsan=0,
		/**Dokument je elektronicky podepsán.*/
		je_elektronicky_podepsan=1,
		/**Dokument je podepsán a opatřen čas. razítkem.*/
		je_elektronicky_podepsan_a_opatren_casovym_razitkem=2,
		/**Dokument je opatřen čas. razítkem.*/
		je_opatren_casovym_razitkem=3,
	}
	function GWflcsgnEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcsgnEnum, Gordic.Ginis.DbModel.GWflcsgnDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcsprDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcspr*/
	interface GWflcsprDto {
		/**DBCOLUMN:wflcspr.s_prij*/
		s_prij?: number|null;
		/**DBCOLUMN:wflcspr.s_prij_txt*/
		s_prij_txt?: string|null;
		/**DBCOLUMN:wflcspr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcspr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcspr.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcspr.s_prij_rsx*/
		s_prij_rsx?: number|null;
	}
	const enum GWflcsprDtoNames { s_prij = "s_prij", s_prij_txt = "s_prij_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", s_prij_rsx = "s_prij_rsx",}
	const enum GWflcsprDtoFragments { s_prij = "*", s_prij_txt = "*", k_v = "*", k_s = "*", k_xml = "*", s_prij_rsx = "*",}
	const enum GWflcsprDtoTypes { s_prij = "number", s_prij_txt = "string", k_v = "number", k_s = "string", k_xml = "string", s_prij_rsx = "number",}
	const enum GWflcsprDtoTypeLengths { s_prij_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:wflcspr*/
	const enum GWflcsprEnum {
		/**Vlastní dokument*/
		interni=0,
		/**Cizí dokument*/
		doruceny=1,
	}
	function GWflcsprEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcsprEnum, Gordic.Ginis.DbModel.GWflcsprDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcsslDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcssl*/
	interface GWflcsslDto {
		/**DBCOLUMN:wflcssl.s_ssl*/
		s_ssl?: number|null;
		/**DBCOLUMN:wflcssl.s_ssl_txt*/
		s_ssl_txt?: string|null;
		/**DBCOLUMN:wflcssl.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcssl.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcssl.k_xml*/
		k_xml?: string|null;
	}
	const enum GWflcsslDtoNames { s_ssl = "s_ssl", s_ssl_txt = "s_ssl_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GWflcsslDtoFragments { s_ssl = "*", s_ssl_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GWflcsslDtoTypes { s_ssl = "number", s_ssl_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GWflcsslDtoTypeLengths { s_ssl_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:wflcssl*/
	const enum GWflcsslEnum {
		/**Nezaevidováno v SSL*/
		ssl_neevidovan=0,
		/**Zaevidována v SSL*/
		ssl_evidovan=1,
	}
	function GWflcsslEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcsslEnum, Gordic.Ginis.DbModel.GWflcsslDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcstaDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcsta*/
	interface GWflcstaDto {
		/**DBCOLUMN:wflcsta.stav_dist*/
		stav_dist?: number|null;
		/**DBCOLUMN:wflcsta.stav_dist_txt*/
		stav_dist_txt?: string|null;
		/**DBCOLUMN:wflcsta.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcsta.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcsta.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcsta.stav_dist_rsx*/
		stav_dist_rsx?: number|null;
	}
	const enum GWflcstaDtoNames { stav_dist = "stav_dist", stav_dist_txt = "stav_dist_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", stav_dist_rsx = "stav_dist_rsx",}
	const enum GWflcstaDtoFragments { stav_dist = "*", stav_dist_txt = "*", k_v = "*", k_s = "*", k_xml = "*", stav_dist_rsx = "*",}
	const enum GWflcstaDtoTypes { stav_dist = "number", stav_dist_txt = "string", k_v = "number", k_s = "string", k_xml = "string", stav_dist_rsx = "number",}
	const enum GWflcstaDtoTypeLengths { stav_dist_txt = 100, k_s = 15, k_xml = 254,}
	/**ENUM:wflcsta*/
	const enum GWflcstaEnum {
		/**Má vlastníka - není v redistribuci*/
		neni_v_distribuci=0,
		/**Je přidělena*/
		pridelen=10,
		/**Je v redistribuci*/
		na_ceste=20,
		/**Konec redistribuce - čeká na osobní převzetí*/
		predan=30,
	}
	function GWflcstaEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcstaEnum, Gordic.Ginis.DbModel.GWflcstaDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcstpDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcstp*/
	interface GWflcstpDto {
		/**DBCOLUMN:wflcstp.stav_pis*/
		stav_pis?: number|null;
		/**DBCOLUMN:wflcstp.stav_pis_txt*/
		stav_pis_txt?: string|null;
		/**DBCOLUMN:wflcstp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcstp.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcstp.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcstp.stav_pis_rsx*/
		stav_pis_rsx?: number|null;
	}
	const enum GWflcstpDtoNames { stav_pis = "stav_pis", stav_pis_txt = "stav_pis_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", stav_pis_rsx = "stav_pis_rsx",}
	const enum GWflcstpDtoFragments { stav_pis = "*", stav_pis_txt = "*", k_v = "*", k_s = "*", k_xml = "*", stav_pis_rsx = "*",}
	const enum GWflcstpDtoTypes { stav_pis = "number", stav_pis_txt = "string", k_v = "number", k_s = "string", k_xml = "string", stav_pis_rsx = "number",}
	const enum GWflcstpDtoTypeLengths { stav_pis_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:wflcstp*/
	const enum GWflcstpEnum {
		/**Podáno/návrh*/
		podano=0,
		/**Nevyřízeno*/
		nevyrizen=10,
		/**Vyřízeno*/
		vyrizen=20,
		/**Uzavřeno*/
		uzavren=30,
		/**Uloženo*/
		ulozen=40,
		/**Vypraveno*/
		vypraven=50,
		/**Stornováno*/
		stornovan=60,
		/**Ztraceno*/
		ztracen=70,
		/**Zastaveno*/
		zastaven=80,
		/**Přesunuto do spisu*/
		priorovan=90,
		/**Archivováno*/
		archivovano=100,
		/**Skartováno*/
		skartovano=110,
		/**Přeevidování do samostatné evidence*/
		preevidovano_do_samostatne_evidence=200,
		/**Přeneseno*/
		preneseno=210,
	}
	function GWflcstpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcstpEnum, Gordic.Ginis.DbModel.GWflcstpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctarDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctar*/
	interface GWflctarDto {
		/**DBCOLUMN:wflctar.typ_archivace*/
		typ_archivace?: number|null;
		/**DBCOLUMN:wflctar.typ_archivace_txt*/
		typ_archivace_txt?: string|null;
		/**DBCOLUMN:wflctar.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctar.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflctar.aktivita*/
		aktivita?: number|null;
	}
	const enum GWflctarDtoNames { typ_archivace = "typ_archivace", typ_archivace_txt = "typ_archivace_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita",}
	const enum GWflctarDtoFragments { typ_archivace = "*", typ_archivace_txt = "*", k_v = "*", k_s = "*", aktivita = "*",}
	const enum GWflctarDtoTypes { typ_archivace = "number", typ_archivace_txt = "string", k_v = "number", k_s = "string", aktivita = "number",}
	const enum GWflctarDtoTypeLengths { typ_archivace_txt = 50, k_s = 15,}
	/**ENUM:wflctar*/
	const enum GWflctarEnum {
		/**Bez archivace*/
		bez_archivace=0,
		/**Archivace 3 roky*/
		archivace_3_roky=1,
		/**Archivace 10 let*/
		archivace_10_let=2,
		/**Scan bez konverze*/
		scan_bez_konverze=3,
		/**Scan s konverzí*/
		scan_s_konverzi=4,
	}
	function GWflctarEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctarEnum, Gordic.Ginis.DbModel.GWflctarDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctddDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctdd*/
	interface GWflctddDto {
		/**DBCOLUMN:wflctdd.typ_duv_del*/
		typ_duv_del?: number|null;
		/**DBCOLUMN:wflctdd.typ_duv_del_txt*/
		typ_duv_del_txt?: string|null;
		/**DBCOLUMN:wflctdd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctdd.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflctdd.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflctdd.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:wflctdd.typ_duv_del_rsx*/
		typ_duv_del_rsx?: number|null;
	}
	const enum GWflctddDtoNames { typ_duv_del = "typ_duv_del", typ_duv_del_txt = "typ_duv_del_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", k_xml = "k_xml", typ_duv_del_rsx = "typ_duv_del_rsx",}
	const enum GWflctddDtoFragments { typ_duv_del = "*", typ_duv_del_txt = "*", k_v = "*", k_s = "*", aktivita = "*", k_xml = "*", typ_duv_del_rsx = "*",}
	const enum GWflctddDtoTypes { typ_duv_del = "number", typ_duv_del_txt = "string", k_v = "number", k_s = "string", aktivita = "number", k_xml = "string", typ_duv_del_rsx = "number",}
	const enum GWflctddDtoTypeLengths { typ_duv_del_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:wflctdd*/
	const enum GWflctddEnum {
		/**Nesmazáno*/
		Nesmazano=0,
		/**Připraveno ke smazání po skartačním řízení – S*/
		_5=5,
		/**Smazáno po skartačním řízení – S*/
		Smazano_po_skartacnim_rizeniS=10,
		/**Připraveno ke smazání po skartačním řízení – A*/
		_15=15,
		/**Smazáno po skartačním řízení – A*/
		Smazano_po_skartacnim_rizeniA=20,
		/**Připraveno ke smazání dok./spis stornován*/
		_25=25,
		/**Smazáno dok./spis stornován*/
		Smazano_dok_spis_stornovan=30,
		/**Připraveno ke smazání dok./spis odes. orig.*/
		_35=35,
		/**Smazáno dok./spis odeslán jako originál*/
		Smazano_dok_spis_odeslan_jako_original=40,
		/**Připraveno ke smazání dok./spis ztracen*/
		_45=45,
		/**Smazáno dok./spis ztracen*/
		Smazano_dok_spis_ztracen=50,
		/**Připraveno ke smazání chyba hardware*/
		_55=55,
		/**Smazáno chyba hardware*/
		Smazano_chyba_hardware=60,
		/**Připraveno ke smazání na pokyn uživatele*/
		_65=65,
		/**Smazáno na pokyn uživatele*/
		Smazano_na_pokyn_uzivatele=70,
		/**Smazáno administrátorem v modulu ELE01*/
		Smazano_administratorem_ELE01=75,
		/**Připraveno ke smazání po delimitaci*/
		pripraveno_ke_smazani_po_delimitaci=85,
		/**Smazáno po delimitaci*/
		smazano_po_delimitaci=90,
		/**Připraveno ke smazání - předáno do externí agendy*/
		pripraveno_ke_smazani_ext_agenda=95,
		/**Smazáno po předání do externí agendy*/
		smazano_ext_agenda=100,
	}
	function GWflctddEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctddEnum, Gordic.Ginis.DbModel.GWflctddDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctdoDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctdo*/
	interface GWflctdoDto {
		/**DBCOLUMN:wflctdo.typ_vyh_dor*/
		typ_vyh_dor?: number|null;
		/**DBCOLUMN:wflctdo.typ_vyh_dor_txt*/
		typ_vyh_dor_txt?: string|null;
		/**DBCOLUMN:wflctdo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctdo.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflctdo.typ_vyh_dor_rsx*/
		typ_vyh_dor_rsx?: number|null;
	}
	const enum GWflctdoDtoNames { typ_vyh_dor = "typ_vyh_dor", typ_vyh_dor_txt = "typ_vyh_dor_txt", k_v = "k_v", k_s = "k_s", typ_vyh_dor_rsx = "typ_vyh_dor_rsx",}
	const enum GWflctdoDtoFragments { typ_vyh_dor = "*", typ_vyh_dor_txt = "*", k_v = "*", k_s = "*", typ_vyh_dor_rsx = "*",}
	const enum GWflctdoDtoTypes { typ_vyh_dor = "number", typ_vyh_dor_txt = "string", k_v = "number", k_s = "string", typ_vyh_dor_rsx = "number",}
	/**ENUM:wflctdo*/
	const enum GWflctdoEnum {
		/**Bez vyhodnocení*/
		bez_vyhodnoceni=0,
		/**Vyhodnocení bez skenu*/
		vyhodnoceni_bez_skenu=1,
		/**Vyhodnocení se skenem PDF*/
		vyhodnoceni_se_skenem_pdf=2,
		/**Vyhodnocení se skenem JPEG*/
		vyhodnoceni_se_skenem_jpeg=3,
		/**Sken bez vyhodnocení PDF*/
		sken_bez_vyhodnoceni_pdf=4,
		/**Sken bez vyhodnocení JPEG*/
		sken_bez_vyhodnoceni_jpeg=5,
	}
	function GWflctdoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctdoEnum, Gordic.Ginis.DbModel.GWflctdoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctduDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**Důvod přiřazování přístupových práv k dokumentu.*/
	interface GWflctduDto {
		/**Důvod přiřazování přístupových práv k dokumentu*/
		duvod_prist?: number|null;
		/**DBCOLUMN:wflctdu.duvod_prist_txt*/
		duvod_prist_txt?: string|null;
		/**DBCOLUMN:wflctdu.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctdu.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflctdu.duvod_prist_rsx*/
		duvod_prist_rsx?: number|null;
	}
	const enum GWflctduDtoNames { duvod_prist = "duvod_prist", duvod_prist_txt = "duvod_prist_txt", k_v = "k_v", k_s = "k_s", duvod_prist_rsx = "duvod_prist_rsx",}
	const enum GWflctduDtoFragments { duvod_prist = "*", duvod_prist_txt = "*", k_v = "*", k_s = "*", duvod_prist_rsx = "*",}
	const enum GWflctduDtoTypes { duvod_prist = "number", duvod_prist_txt = "string", k_v = "number", k_s = "string", duvod_prist_rsx = "number",}
	const enum GWflctduDtoTypeLengths { duvod_prist_txt = 50, k_s = 15,}
	/**ENUM:wflctdu*/
	const enum GWflctduEnum {
		/**Práva přiřazená uživatelem*/
		declared_user=0,
		/**Práva (nadřízeným) přiřazená uživatelem*/
		declaredn_user=2,
		/**Práva přiřazená maskou navázanou na typ dokumentu*/
		by_type=10,
		/**Tvůrci dokumentu*/
		creater=100,
		/**Historický vlastník typu spisový uzel.*/
		hist_owner_su=200,
		/**Historický vlastník typu funkční místo.*/
		hist_owner_fun=300,
		/**Aktuální vlastník typu spisový uzel.*/
		akt_owner_su=400,
		/**Aktuální vlastník typu funkční místo.*/
		akt_owner_fun=500,
		/**Práva přiřazená nadřízeným aktuálního vlastníka*/
		aktnadownerfun=700,
		/**Práva přiřazená nadřízenému aktuálního vlastníka*/
		akt1nadownerfun=701,
	}
	function GWflctduEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctduEnum, Gordic.Ginis.DbModel.GWflctduDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctelDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctel*/
	interface GWflctelDto {
		/**DBCOLUMN:wflctel.typ_elp*/
		typ_elp?: number|null;
		/**DBCOLUMN:wflctel.typ_elp_txt*/
		typ_elp_txt?: string|null;
		/**DBCOLUMN:wflctel.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctel.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflctel.typ_elp_rsx*/
		typ_elp_rsx?: number|null;
	}
	const enum GWflctelDtoNames { typ_elp = "typ_elp", typ_elp_txt = "typ_elp_txt", k_v = "k_v", k_s = "k_s", typ_elp_rsx = "typ_elp_rsx",}
	const enum GWflctelDtoFragments { typ_elp = "*", typ_elp_txt = "*", k_v = "*", k_s = "*", typ_elp_rsx = "*",}
	const enum GWflctelDtoTypes { typ_elp = "number", typ_elp_txt = "string", k_v = "number", k_s = "string", typ_elp_rsx = "number",}
	const enum GWflctelDtoTypeLengths { typ_elp_txt = 50, k_s = 15,}
	/**ENUM:wflctel*/
	const enum GWflctelEnum {
		/**Originál*/
		original=0,
		/**El. otisk*/
		elOtisk=10,
		/**Příloha*/
		priloha=20,
		/**Elektronický podpis*/
		elektronickyPodpis=30,
		/**Tisk dokladu*/
		tiskDokladu=40,
		/**Časové razítko*/
		casoveRazitko=50,
	}
	function GWflctelEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctelEnum, Gordic.Ginis.DbModel.GWflctelDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctkoDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctko*/
	interface GWflctkoDto {
		/**DBCOLUMN:wflctko.typ_konverze*/
		typ_konverze?: number|null;
		/**DBCOLUMN:wflctko.typ_konverze_txt*/
		typ_konverze_txt?: string|null;
		/**DBCOLUMN:wflctko.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctko.k_s*/
		k_s?: string|null;
	}
	const enum GWflctkoDtoNames { typ_konverze = "typ_konverze", typ_konverze_txt = "typ_konverze_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflctkoDtoFragments { typ_konverze = "*", typ_konverze_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflctkoDtoTypes { typ_konverze = "number", typ_konverze_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflctkoDtoTypeLengths { typ_konverze_txt = 50, k_s = 15,}
	/**ENUM:wflctko*/
	const enum GWflctkoEnum {
		/**Bez konverze*/
		bezKonverze=0,
		/**S konverzí*/
		sKonverzi=1,
	}
	function GWflctkoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctkoEnum, Gordic.Ginis.DbModel.GWflctkoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctobDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflctob - Typ obsahu zásilky*/
	interface GWflctobDto {
        /**DBCOLUMN:wflctob.typ_obs_ob*/
		typ_obs_ob?: number|null;
        /**DBCOLUMN:wflctob.typ_obs_ob_txt*/
		typ_obs_ob_txt?: string|null;
        /**DBCOLUMN:wflctob.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflctob.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:wflctob.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:wflctob.typ_obs_ob_rsx*/
		typ_obs_ob_rsx?: number|null;
	}
	const enum GWflctobDtoNames { typ_obs_ob = "typ_obs_ob", typ_obs_ob_txt = "typ_obs_ob_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", typ_obs_ob_rsx = "typ_obs_ob_rsx",}
	const enum GWflctobDtoFragments { typ_obs_ob = "*", typ_obs_ob_txt = "*", k_v = "*", k_s = "*", k_xml = "*", typ_obs_ob_rsx = "*",}
	const enum GWflctobDtoTypes { typ_obs_ob = "number", typ_obs_ob_txt = "string", k_v = "number", k_s = "string", k_xml = "string", typ_obs_ob_rsx = "number",}
    /**ENUM:wflctob - Typ obsahu zásilky*/
	const enum GWflctobEnum {
        /**neurčeno*/
		neurceno=0,
        /**originál*/
		original=10,
        /**stejnopis*/
		stejnopis=20,
        /**kopie*/
		kopie=30,
        /**fotokopie*/
		fotokopie=40,
	}
	function GWflctobEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctobEnum, Gordic.Ginis.DbModel.GWflctobDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctpzDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflctpz*/
	interface GWflctpzDto {
        /**DBCOLUMN:wflctpz.typ_pozn*/
		typ_pozn?: number|null;
        /**DBCOLUMN:wflctpz.typ_pozn_txt*/
		typ_pozn_txt?: string|null;
        /**DBCOLUMN:wflctpz.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflctpz.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:wflctpz.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:wflctpz.typ_pozn_rsx*/
		typ_pozn_rsx?: number|null;
	}
	const enum GWflctpzDtoNames { typ_pozn = "typ_pozn", typ_pozn_txt = "typ_pozn_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", typ_pozn_rsx = "typ_pozn_rsx",}
	const enum GWflctpzDtoFragments { typ_pozn = "*", typ_pozn_txt = "*", k_v = "*", k_s = "*", k_xml = "*", typ_pozn_rsx = "*",}
	const enum GWflctpzDtoTypes { typ_pozn = "number", typ_pozn_txt = "string", k_v = "number", k_s = "string", k_xml = "string", typ_pozn_rsx = "number",}
    /**ENUM:wflctpz*/
	const enum GWflctpzEnum {
        /**veřejná*/
		verejna=0,
        /**spisového uzlu*/
		spisoveho_uzlu=10,
        /**soukromá*/
		soukroma=20,
	}
	function GWflctpzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctpzEnum, Gordic.Ginis.DbModel.GWflctpzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcttiDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctti*/
	interface GWflcttiDto {
		/**DBCOLUMN:wflctti.typ_tisku*/
		typ_tisku?: number|null;
		/**DBCOLUMN:wflctti.typ_tisku_txt*/
		typ_tisku_txt?: string|null;
		/**DBCOLUMN:wflctti.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctti.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflctti.typ_tisku_rsx*/
		typ_tisku_rsx?: number|null;
	}
	const enum GWflcttiDtoNames { typ_tisku = "typ_tisku", typ_tisku_txt = "typ_tisku_txt", k_v = "k_v", k_s = "k_s", typ_tisku_rsx = "typ_tisku_rsx",}
	const enum GWflcttiDtoFragments { typ_tisku = "*", typ_tisku_txt = "*", k_v = "*", k_s = "*", typ_tisku_rsx = "*",}
	const enum GWflcttiDtoTypes { typ_tisku = "number", typ_tisku_txt = "string", k_v = "number", k_s = "string", typ_tisku_rsx = "number",}
	/**ENUM:wflctti*/
	const enum GWflcttiEnum {
		/**Jednostranně*/
		jednostranne=0,
		/**Oboustranně*/
		oboustranne=1,
	}
	function GWflcttiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcttiEnum, Gordic.Ginis.DbModel.GWflcttiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflctysDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflctys*/
	interface GWflctysDto {
		/**DBCOLUMN:wflctys.typ_spis*/
		typ_spis?: number|null;
		/**DBCOLUMN:wflctys.typ_spis_txt*/
		typ_spis_txt?: string|null;
		/**DBCOLUMN:wflctys.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflctys.k_s*/
		k_s?: string|null;
	}
	const enum GWflctysDtoNames { typ_spis = "typ_spis", typ_spis_txt = "typ_spis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflctysDtoFragments { typ_spis = "*", typ_spis_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflctysDtoTypes { typ_spis = "number", typ_spis_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflctysDtoTypeLengths { typ_spis_txt = 50, k_s = 15,}
	/**ENUM:wflctys*/
	const enum GWflctysEnum {
		/**Dokument*/
		dokument=0,
		/**Spis*/
		spis=1,
		/**Typový spis*/
		typovy_spis=2,
		/**Součást koncová*/
		soucast_koncova=3,
		/**Díl*/
		dil=4,
		/**Součást*/
		soucast=5,
	}
	function GWflctysEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflctysEnum, Gordic.Ginis.DbModel.GWflctysDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcumpDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflcump*/
	interface GWflcumpDto {
		/**DBCOLUMN:wflcump.status_pis*/
		status_pis?: number|null;
		/**DBCOLUMN:wflcump.status_pis_txt*/
		status_pis_txt?: string|null;
		/**DBCOLUMN:wflcump.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcump.k_s*/
		k_s?: string|null;
	}
	const enum GWflcumpDtoNames { status_pis = "status_pis", status_pis_txt = "status_pis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcumpDtoFragments { status_pis = "*", status_pis_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcumpDtoTypes { status_pis = "number", status_pis_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcumpDtoTypeLengths { status_pis_txt = 50, k_s = 15,}
	/**ENUM:wflcump*/
	const enum GWflcumpEnum {
		/**Aktivní dokument*/
		Aktivni=0,
		/**Dokument přesunutý do XX tabulek*/
		Presunuty_do_xx_tabulek=100,
		/**Dokument přesunutý do offline databáze*/
		Presunuty_do_offline_databaze=500,
	}
	function GWflcumpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcumpEnum, Gordic.Ginis.DbModel.GWflcumpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcuprDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**IRP Úroveň oprávnění.*/
	interface GWflcuprDto {
		/**Úroveň přístupu k dokumentu*/
		uroven_prist?: number|null;
		/**IRP Úroveň oprávnění k dokumentu*/
		uroven_prist_txt?: string|null;
		/**DBCOLUMN:wflcupr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcupr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflcupr.uroven_prist_rsx*/
		uroven_prist_rsx?: number|null;
	}
	const enum GWflcuprDtoNames { uroven_prist = "uroven_prist", uroven_prist_txt = "uroven_prist_txt", k_v = "k_v", k_s = "k_s", uroven_prist_rsx = "uroven_prist_rsx",}
	const enum GWflcuprDtoFragments { uroven_prist = "*", uroven_prist_txt = "*", k_v = "*", k_s = "*", uroven_prist_rsx = "*",}
	const enum GWflcuprDtoTypes { uroven_prist = "number", uroven_prist_txt = "string", k_v = "number", k_s = "string", uroven_prist_rsx = "number",}
	const enum GWflcuprDtoTypeLengths { uroven_prist_txt = 100, k_s = 15,}
	/**IRP Úroveň oprávnění.*/
	const enum GWflcuprEnum {
		/**Zákaz přístupu*/
		ZakazPristupu=-10,
		/**[-----------------------]*/
		BezOpravneni=0,
		/**Čtení(základní metadata)*/
		CteniZakladniMetadata=5,
		/**Čtení(karta)*/
		CteniKarta=10,
		/**Čtení(karta+el.)*/
		CteniKartaElObraz=15,
		/**Čtení(karta+el.),změna opr.číst*/
		CteniKartaElObrazZmenaOprCist=20,
		/**Editace(karta),čtení (el.)*/
		EditaceKartaCteniElObraz=25,
		/**Editace(karta),čtení (el.), změna opr.číst*/
		EditaceKartaCteniElObrazZmenaOprCist=30,
		/**Editace(karta+el.)*/
		EditaceKartaElObraz=45,
		/**Editace(karta+el.), změna opr.číst*/
		EditaceKartaElObrazZmenaOprCist=50,
		/**Plný přístup - všechna oprávnění*/
		PlnyPristup=70,
	}
	function GWflcuprEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcuprEnum, Gordic.Ginis.DbModel.GWflcuprDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflcvlaDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflcvla*/
	interface GWflcvlaDto {
        /**DBCOLUMN:wflcvla.typ_vlast*/
		typ_vlast?: number|null;
        /**DBCOLUMN:wflcvla.typ_vlast_txt*/
		typ_vlast_txt?: string|null;
        /**DBCOLUMN:wflcvla.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflcvla.k_s*/
		k_s?: string|null;
	}
	const enum GWflcvlaDtoNames { typ_vlast = "typ_vlast", typ_vlast_txt = "typ_vlast_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcvlaDtoFragments { typ_vlast = "*", typ_vlast_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcvlaDtoTypes { typ_vlast = "number", typ_vlast_txt = "string", k_v = "number", k_s = "string",}
    /**ENUM:wflcvla*/
	const enum GWflcvlaEnum {
        /**Současná změna agendového i fyzického vlastníka*/
		AGWFL=0,
        /**Agendový*/
		AG=10,
        /**Fyzický*/
		WFL=20,
	}
	function GWflcvlaEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcvlaEnum, Gordic.Ginis.DbModel.GWflcvlaDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflczexDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflczex*/
	interface GWflczexDto {
        /**DBCOLUMN:wflczex.zmena_ext*/
		zmena_ext?: number|null;
        /**DBCOLUMN:wflczex.zmena_ext_txt*/
		zmena_ext_txt?: string|null;
        /**DBCOLUMN:wflczex.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflczex.k_s*/
		k_s?: string|null;
	}
	const enum GWflczexDtoNames { zmena_ext = "zmena_ext", zmena_ext_txt = "zmena_ext_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflczexDtoFragments { zmena_ext = "*", zmena_ext_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflczexDtoTypes { zmena_ext = "number", zmena_ext_txt = "string", k_v = "number", k_s = "string",}
    /**ENUM:wflczex*/
	const enum GWflczexEnum {
        /**NIC*/
		nic=0,
        /**Vytvoření kopie z tohoto dokumentu.*/
		kopie=1,
        /**Změna termínu vyřízení spisu*/
		zmena_terminu_vyrizeni_spisu=10,
        /**Smazání nehlavičkových metadat*/
		smazani_nehlavickovych_metadat=1500,
        /**Manipulace s položkou FP*/
		manipulace_s_polozkou_fp=3000,
	}
	function GWflczexEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflczexEnum, Gordic.Ginis.DbModel.GWflczexDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflczktDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflczkt*/
	interface GWflczktDto {
        /**Kategorie změny pro zápis do historie dokumentů*/
		zmena_ktg?: number|null;
        /**DBCOLUMN:wflczkt.zmena_ktg_txt*/
		zmena_ktg_txt?: string|null;
        /**DBCOLUMN:wflczkt.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflczkt.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:wflczkt.zmena_ktg_rsx*/
		zmena_ktg_rsx?: number|null;
        /**DBCOLUMN:wflczkt.k_xml*/
		k_xml?: string|null;
        /**DBCOLUMN:wflczkt.priz_prn*/
		priz_prn?: number|null;
        /**DBCOLUMN:wflczkt.priz_xml*/
		priz_xml?: number|null;
	}
	const enum GWflczktDtoNames { zmena_ktg = "zmena_ktg", zmena_ktg_txt = "zmena_ktg_txt", k_v = "k_v", k_s = "k_s", zmena_ktg_rsx = "zmena_ktg_rsx", k_xml = "k_xml", priz_prn = "priz_prn", priz_xml = "priz_xml",}
	const enum GWflczktDtoFragments { zmena_ktg = "*", zmena_ktg_txt = "*", k_v = "*", k_s = "*", zmena_ktg_rsx = "*", k_xml = "*", priz_prn = "*", priz_xml = "*",}
	const enum GWflczktDtoTypes { zmena_ktg = "number", zmena_ktg_txt = "string", k_v = "number", k_s = "string", zmena_ktg_rsx = "number", k_xml = "string", priz_prn = "number", priz_xml = "number",}
    /**ENUM:wflczkt*/
	const enum GWflczktEnum {
        /**nespecifikováno*/
		_0=0,
        /**Storno*/
		Storno=30,
        /**Systémové storno*/
		Storno_35=35,
        /**Vyřízení*/
		Vyrizeni=50,
        /**Zrušení vyřízení*/
		ZruseniVyrizeni=52,
        /**Vložení do entity*/
		VlozeniDoSpisu=55,
        /**Změna datumu vložení do spisu.*/
		_57=57,
        /**Založení spisu*/
		VytvoreniSpisu=60,
        /**Vytvoření ČJ*/
		PripojeniCJ=65,
        /**Vyjmutí z entity*/
		VyjmutiZeSpisu=70,
        /**ZmenaPristupu*/
		ZmenaPristupu=82,
        /**Zrušení vyřízení ČJ*/
		ZruseniVyrizeniCj=101,
        /**Vyřízení*/
		VyrizeniCJ=105,
        /**Zrušení označení vyřizujícího dokumentu spisu.*/
		ZruseniVyrizujicihoDokumentuSpisu=130,
        /**Ztracení*/
		Ztraceni=140,
        /**Nalezení*/
		Nalezeni=150,
        /**Zastavení vyřizování*/
		ZastaveniVyrizovani=160,
        /**Obnovení vyřizování*/
		ObnoveniVyrizovani=170,
        /**Odeslání.*/
		_175=175,
        /**Přesun obsahu spisu*/
		PresunObsahuSpisu=180,
        /**Odeslání jako originál*/
		OdeslanoJakoOriginal=185,
        /**Nabytí právní moci*/
		NabytiPravniMoci=190,
        /**Zrušení uzavření*/
		ZruseniUzavreni=232,
        /**Předání do externí agendy*/
		PostoupeniAgende=280,
        /**Převzetí z externí agendy*/
		VraceniZAgendy=290,
        /**Přiřazení přílohy k dokladu/dokumentu*/
		EvidencePrilohy=300,
        /**Odeslání nedokladované z dokumentu/dokladu.*/
		NedokladovaneOdeslani=308,
        /**Odeslání informací o dokumentu v rámci ZUD.*/
		OdeslaniInformaciODokumentuZud=310,
        /**Odeslání el. obrazu či příloh v rámci ZUD.*/
		OdeslaniKomponentZud=312,
        /**Zobrazení dokumentu.*/
		Zobrazeni=318,
        /**Zobrazení elektronické přílohy dokladu/dokumentu*/
		ZobrazeniKomponenty=322,
        /**Odstranění el. obrazu/přílohy dokladu/dokumentu*/
		OdstraneniKomponenty=324,
        /**Zneaktivnění el. obrazu/přílohy dokladu/dokumentu.*/
		ZneaktivneniKomponenty=326,
        /**Nahrazení el. obrazu přílohou*/
		ZmenaHlavniKomponenty=327,
        /**Zamčení el. obrazu/přílohy dokladu/dokumentu.*/
		ZamknutiProEditaciKomponenty=328,
        /**Odemčení el. obrazu/přílohy dokladu/dokumentu*/
		OdemknutiProEditaciKomponenty=330,
        /**Znovuvložení el. obrazu k dokladu/dokumentu*/
		ZnovupripojeniHlavniKomponenty=331,
        /**Vložení el. obrazu k dokladu/dokumentu*/
		PripojeniHlavniKomponenty=332,
        /**Vložení nové verze el. obrazu k dokladu/dokumentu*/
		PripojeniVerzeHlavniKomponenty=333,
        /**Vložení el. přílohy k dokladu/dokumentu*/
		PripojeniKomponenty=334,
        /**Znovuvložení el. přílohy k dokladu/dokumentu*/
		ZnovupripojeniKomponenty=335,
        /**Konverze elektronického obrazu dokladu/dokumentu*/
		KonverzeHlavniKomponentyDoPdfA=336,
        /**Změna el. přílohy na obraz*/
		NastaveniHlavniKomponenty=337,
        /**Konverze elektronické přílohy dokladu/dokumentu*/
		KonverzeKomponentyDoPdfA=338,
        /**Vložení nové verze el. přílohy k dokladu/dokumentu*/
		ZnovupripojeniKomponenty_339=339,
        /**Podepsání elektronického obrazu dokladu/dokumentu*/
		PripojeniPodpisu=340,
        /**Vytvoření čas. raz. el. obrazu dokl./dokum.*/
		PripojeniRazitka=341,
        /**Podepsání elektronické přílohy dokladu/dokumentu*/
		PripojeniPodpisu_342=342,
        /**Vytvoření čas. raz. el. přílohy dokl./dokum.*/
		PripojeniRazitka_343=343,
        /**Podepsání s čas. razítkem el. obrazu dokl./dokum.*/
		PripojeniPodpisuARazitka=344,
        /**Podepsání s čas. razítkem el. přílohy dokl./dokum.*/
		PripojeniPodpisuARazitka_346=346,
        /**Vložení el. podpisu k el. obrazu dokl./dokum.*/
		PripojeniPodpisu_350=350,
        /**Kompletace LTV podpisu el. obrazu dokl./dokum.*/
		KompletacePodpisuKomponenty=351,
        /**Vložení čas. raz. k el. obrazu dokl./dokum.*/
		PripojeniRazitka_352=352,
        /**Vložení el. podpisu k el. příloze dokl./dokum.*/
		PripojeniPodpisu_356=356,
        /**Kompletace LTV podpisu el. přílohy dokl./dokum.*/
		KompletacePodpisuKomponenty_357=357,
        /**Vložení čas. raz. k el. příloze dokl./dokum.*/
		PripojeniRazitka_358=358,
        /**Nastavení příznaků formy dokumentu*/
		ZmenaFormy=360,
        /**Nastavení příznaků verzí el. dokumentu*/
		NastaveniPriznakuPlatnaArchivniKomponenty=362,
        /**Ruční označení verze el. dokumentu - PDF/A.*/
		OznaceniKomponentyPdfA=364,
        /**Změna názvu el. souboru systémem při el. podání*/
		SystemovaZmenaNazvuKomponenty=365,
        /**Změna názvu el. souboru uživatelem při el. podání*/
		ZmenaNazvuKomponenty=366,
        /**Změna názvu el. souboru uživatelem*/
		ZmenaNazvuKomponenty_368=368,
        /**Oprava metadat ověření el. podání*/
		UpravaMetadatPodani=374,
        /**Tisk el. obrazu dokladu/dokumentu*/
		TiskHlavniKomponenty=380,
        /**Tisk el. přílohy dokladu/dokumentu*/
		TiskKomponenty=381,
        /**Zadání důvodu zobrazení elektronického obrazu*/
		ZadaniDuvoduZobrazeniHlavniKomponenty=390,
        /**Zadání důvodu zobrazení elektronické přílohy*/
		ZadaniDuvoduZobrazeniKomponenty=392,
        /**Vložení el. pečeti dokl./dokum.*/
		PripojeniPeceti=397,
        /**Zobrazení detailu neveřejného dokumentu/dokladu.*/
		ZobrazeniNeverejneho=400,
        /**Zobrazení detailu dokumentu/dokladu.*/
		Zobrazeni_410=410,
        /**Export el. dokumentů z dokumentu/dokladu.*/
		ExportKomponent=420,
        /**Export dokumentu/spisu dle NS.*/
		ExportDleNs=430,
        /**Export dokumentu/spisu*/
		Export=432,
        /**Import dokumentu/spisu dle NS.*/
		ImportDleNs=440,
        /**Přenos zahájení*/
		Prenos=442,
        /**Přenos potvrzení*/
		PrenosPotvrzeni=444,
        /**Ztvárnění*/
		Ztvarneni=446,
        /**Návrh zveřejnění na úřední desku*/
		NavrhZverejneniNaUredniDesku=448,
        /**Změna návrhu zveřejnění na úřední desku*/
		ZmenaNavrhuZverejneniNaUredniDesku=449,
        /**Zveřejnění na úřední desku*/
		ZverejneniNaUredniDesku=450,
        /**Změna zveřejnění na úřední desku*/
		ZmenaZverejneniNaUredniDesku=452,
        /**Sejmutí dokumentu z úřední desky*/
		SejmjutiZUredniDesky=455,
        /**Storno zveřejnění na úřední desku*/
		StornoZverejneniNaUredniDesku=458,
        /**Zveřejnění el. dokumentu*/
		ZverejneniKomponenty=460,
        /**Označení el. dokumentu ke zveřejnění.*/
		OznaceniKomponentyKeZverejneni=462,
        /**Zrušení označení el. dokumentu ke zveřejnění.*/
		ZruseniOznaceniKomponentyKeZverejneni=464,
        /**Označení el. dokumentu - nezveřejňovat.*/
		_465=465,
        /**Anonymizace el. obrazu.*/
		AnonymizaceHlavniKomponenty=466,
        /**Anonymizace el. přílohy.*/
		AnonymizaceKomponenty=468,
        /**Změna stavu anonymizováno u el. přílohy*/
		OznaceniKomponentyNezverejnovat=469,
        /**Přidání oprávnění IRP*/
		PridaniOpravneniIRP=470,
        /**Změna oprávnění IRP*/
		ZmenaOpravneniIRP=472,
        /**Odstranění oprávnění IRP*/
		OdstraneniOpravneniIRP=474,
        /**Operace s balíkem.*/
		UzivatelskyZaznam=500,
        /**Skartace.*/
		Skartace=510,
        /**Pozastavení skartační operace*/
		PozastaveniSkartacniOperace=512,
        /**Obnovení skartační operace*/
		ObnoveniSkartacniOperace=514,
        /**Změna spouštěcí události*/
		ZmenaSpousteciUdalosti=516,
        /**Archivace.*/
		PredanoArchivuKUlozeni=520,
        /**Zařazeno do skartačního návrhu*/
		ZarazeniDoSkartacnihoNavrhu=523,
        /**Vyřazeno ze skartačního návrhu*/
		VyrazeniZeSkartacnihoNavrhu=525,
        /**Delimitace.*/
		Delimitace=530,
        /**Úspěšně uloženo v DA*/
		UspesneUlozenoVDa=532,
        /**Odmítnuto DA*/
		OdmitnutoDa=534,
        /**Výpůjčení ze spisovny.*/
		VypujceniZeSpisovny=540,
        /**Návrat do spisovny.*/
		VraceniDoSpisovny=550,
        /**Kontrola evidenčních položek*/
		KontrolaMetadat=560,
        /**Kontrola el.souborů*/
		KontrolaKomponent=570,
        /**Vygenerování SIP*/
		GenerovaniSIP=580,
        /**Přidání klíčového slova.*/
		PripojeniKlicovehoSlova=600,
        /**Odebrání klíčového slova.*/
		OdebraniKlicovehoSlova=610,
        /**Odebrání vlastnictví*/
		OdebraniVlastnictvi=1000,
        /**podáno*/
		Zalozeni=1010,
        /**znovupodáno*/
		Zalozeni_1012=1012,
        /**evidence*/
		Uprava=1020,
        /**návrh krytí*/
		_1021=1021,
        /**návrh likvidace*/
		_1022=1022,
        /**schváleno*/
		Schvaleni=1030,
        /**zrušeno schválení*/
		ZruseniSchvaleni=1032,
        /**Rezervace*/
		_1033=1033,
        /**Storno rezervace*/
		_1034=1034,
        /**Smluvní pokutování*/
		_1035=1035,
        /**uhrazeno*/
		_1040=1040,
        /**Ověření v registru plátců DPH*/
		_1041=1041,
        /**proúčtováno*/
		Uctovani=1050,
        /**Zpětné otevření období DPH*/
		_1051=1051,
        /**uzavřeno*/
		Uzavreni=1060,
        /**stornováno*/
		Storno_1070=1070,
        /**zrušeno storno*/
		ZruseniStorna=1072,
        /**přiděleno*/
		Prideleni=1080,
        /**předáno, převzeto*/
		Predani=1090,
        /**Zamítnutí převzeti, vrácení původnímu vlastníkovi*/
		ZamitnutiPrevzeti=1094,
        /**vznik vazby*/
		_1100=1100,
        /**Vytvoření vazby mezi dokumenty/spisy*/
		KrizovyOdkazVznik=1104,
        /**Změna vazby mezi dokumenty/spisy*/
		KrizovyOdkazZmena=1106,
        /**Zrušení vazby mezi dokumenty/spisy*/
		KrizovyOdkazZruseni=1110,
        /**párováno*/
		_1120=1120,
        /**editace*/
		Uprava_1130=1130,
        /**uloženo*/
		PrevzetiNaSpisovnu=1140,
        /**Likvidace mylné platby*/
		LikvidaceMylnePlatby=1150,
        /**vyjmuto z uložení*/
		VraceniZeSpisovny=1160,
        /**podána žádost o prodloužení termínu vyřízení*/
		_1180=1180,
        /**schváleno prodloužení termínu vyřízení*/
		_1182=1182,
        /**zamítnuto prodloužení termínu vyřízení*/
		_1184=1184,
        /**Práce s dílčím termínem dokumentu.*/
		_1190=1190,
        /**Zrušení přesunu obsahu spisu*/
		ZruseniPresunuObsahuSpisu=1200,
        /**Manipulace s přílohou*/
		ZmenaKomponenty=1210,
        /**změna agendy*/
		ZmenaAgendy=1220,
        /**přesun do archivních struktur (odlito )*/
		_1230=1230,
        /**Zobrazení elektronického obrazu nebo přílohy*/
		ZobrazeniHlavniKomponenty=1240,
        /**Práce s elektronickým obrazem nebo přílohou*/
		ZmenaKomponenty_1250=1250,
        /**Označení el. přílohy pro EPK*/
		OznaceniKomponentyProEPK=1252,
        /**Zrušení označení el. přílohy pro EPK*/
		ZruseniOznaceniKomponentyProEPK=1254,
        /**Práce s dočasným úložištěm*/
		_1260=1260,
        /**Založení žádosti o zveřejnění*/
		ZalozeniZVE=1300,
        /**Změna stavu žádosti o zveřejnění*/
		ZmenaZVE=1310,
        /**Přidání přílohy k žádosti o zveřejnění*/
		PridaniPrilohyZVE=1320,
        /**Zadání důvodu nezveřejnění*/
		DuvodNEZVE=1340,
        /**Zadání zveřejnění protistranou*/
		ZverejneniProtistranou=1350,
        /**Přidání žádosti o podpis*/
		VlozeniZadostiEPK=1400,
        /**Vyřízení žádosti o podpis/schválení.*/
		VyrizeniZadostiEPK=1410,
        /**Vložení vyřizujícího dokumentu v EPK.*/
		VlozeniVyrizujiciKomponentyEPK=1412,
        /**Zamítnutí žádosti o podpis/schválení.*/
		ZamitnutiZadostiEPK=1420,
        /**Zrušení žádosti o podpis/schválení.*/
		ZruseniZadostiEPK=1430,
        /**Zneplatnění žádosti o podpis/schválení.*/
		ZneplatneniZadostiEPK=1440,
        /**Vytvoření předpisu schvalovacího procesu.*/
		VytvoreniPredpisuEPK=1450,
        /**Vložení předpisu schvalovacího procesu do EPK.*/
		VlozeniPredpisuEPK=1460,
        /**Změna priority úkonů v EPK*/
		_1462=1462,
        /**Finanční kontrola zahájena*/
		FinancniKontrolaZahajeni=1470,
        /**Finanční kontrola: povolena*/
		FinancniKontrolaPovoleni=1471,
        /**Finanční kontrola: zamítnuta*/
		FinancniKontrolaZamitnuti=1472,
        /**Finanční kontrola: stornována*/
		FinancniKontrolaStorno=1473,
        /**Finanční kontrola: ukončena platnost*/
		FinancniKontrolaUkonceniPlatnosti=1474,
        /**Vyřízení předpisu schvalovacího procesu.*/
		VyrizeniPredpisuEPK=1480,
        /**Účetní kontrola*/
		UcetniKontrolaZahajeni=1490,
        /**Účetní kontrola povolena*/
		UcetniKontrolaPovoleni=1491,
        /**Účetní kontrola zamítnuta*/
		UcetniKontrolaZamitnuti=1492,
        /**Účetní kontrola stornována*/
		UcetniKontrolaStorno=1493,
        /**Účetní kontrola: ukončena platnost*/
		UcetniKontrolaUkonceniPlatnosti=1494,
        /**Smazání nehlavičkových metadat*/
		Zniceni=1500,
        /**Průběžná kontrola zahájena*/
		PrubeznaKontrolaZahajeni=1510,
        /**Průběžná kontrola: povolena*/
		PrubeznaKontrolaPovoleni=1511,
        /**Průběžná kontrola: zamítnuta*/
		PrubeznaKontrolaZamitnuti=1512,
        /**Průběžná kontrola: stornována*/
		PrubeznaKontrolaStorno=1513,
        /**Průběžná kontrola: ukončena platnost*/
		PrubeznaKontrolaUkonceniPlatnosti=1514,
        /**Přepočet závazků a pohledávek v cizí měně*/
		_1600=1600,
        /**Komunikace se systémem Státní pokladny (IISSP)*/
		_1800=1800,
        /**Komunikace se systémem EDS/SMVS*/
		_1810=1810,
        /**Insolvence subjektu na dokladu*/
		_2000=2000,
        /**Kontrola ESU vůči ISZR*/
		_2030=2030,
        /**Převzetí žádosti o poskytnutí informací o dokum.*/
		_2100=2100,
        /**Žádost o konverzi*/
		ZadostOKonverzi=2200,
        /**Žádost o autorizovanou konverzi do datové zprávy*/
		ZadostOAutorizovanouKonverziDoDatoveZpravy=2201,
        /**Žádost o autorizovanou konverzi do listiny*/
		ZadostOAutorizovanouKonverziDoListiny=2202,
        /**Žádost o převod dokumentu do digitální podoby*/
		ZadostOPrevodDoDigitalniPodoby=2203,
        /**Žádost o převod dokumentu do analogové podoby*/
		ZadostOPrevodDoAnalogovePodoby=2204,
        /**Žádost o změnu datového formátu*/
		ZadostOZmenuDatovehoFormatu=2205,
        /**Storno žádosti o konverzi*/
		StornoZadostiOKonverzi=2210,
        /**Konverze dokumentu*/
		KonverzeDokumentu=2220,
        /**Provedení autorizované konverze do datové zprávy*/
		AutorizovanaKonverzeDoDatoveZpravy=2221,
        /**Provedení autorizované konverze do listiny*/
		AutorizovanaKonverzeDoListiny=2222,
        /**Provedení převodu dokumentu do digitální podoby*/
		PrevodDoDigitalniPodoby=2223,
        /**Provedení převodu dokumentu do analogové podoby*/
		PrevodDoAnalogovePodoby=2224,
        /**Provedení změny datového formátu*/
		ZmenaDatovehoFormatu=2225,
        /**Evidence škod*/
		EvidenceSkod=2400,
        /**Informace*/
		_3000=3000,
        /**Servisní zásah*/
		ServisniZasah=3001,
        /**Předáno k realizaci*/
		_3002=3002,
        /**Vráceno*/
		Vraceno=3003,
        /**Chyba roční uzávěrky*/
		_3004=3004,
        /**Připojení el. souboru na majetkovou kartu*/
		PripojeniElSouboruNaKartuMAJ=3110,
        /**Uživatelský záznam historie*/
		UzivatelskyZaznamHistorie=5000,
	}
	function GWflczktEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflczktEnum, Gordic.Ginis.DbModel.GWflczktDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflczmeDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
    /**DBTABLE:wflczme*/
	interface GWflczmeDto {
        /**Proti kategorii změny se jedná o jemnější určení typu zápisu do historie dokumentu*/
		zmena?: number|null;
        /**0422*/
		zmena_txt?: string|null;
        /**DBCOLUMN:wflczme.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:wflczme.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:wflczme.zmena_rsx*/
		zmena_rsx?: number|null;
	}
	const enum GWflczmeDtoNames { zmena = "zmena", zmena_txt = "zmena_txt", k_v = "k_v", k_s = "k_s", zmena_rsx = "zmena_rsx",}
	const enum GWflczmeDtoFragments { zmena = "*", zmena_txt = "*", k_v = "*", k_s = "*", zmena_rsx = "*",}
	const enum GWflczmeDtoTypes { zmena = "number", zmena_txt = "string", k_v = "number", k_s = "string", zmena_rsx = "number",}
    /**ENUM:wflczme*/
	const enum GWflczmeEnum {
        /**Neurčeno*/
		TZM_neurceno=0,
        /**Zaevidování do SSL*/
		TZM_evid_ssl=10,
        /**Změna evidenčního profilu písemnosti v SSL*/
		TZM_edit_ssl=20,
        /**Změna datumu podání dokumentu.*/
		_21=21,
        /**Změna termínu vyříze pro ČJ*/
		_22=22,
        /**Stornování dokumentu/spisu*/
		TZM_ixp_stor=30,
        /**Systémové storno*/
		TZM_ixp_syst_st=35,
        /**Vyřízení písemností vzetím na vědomí.*/
		TZM_vzvd_ssl=40,
        /**Vyřízení písemností vložením do spisu.*/
		TZM_vlds_ssl=50,
        /**Zrušení vyřízení*/
		TZM_ixp_odvy=52,
        /**Vložení do entity*/
		TZM_ixp_vloze=55,
        /**Změna datumu vložení do spisu.*/
		TZM_ixp_zdvds=57,
        /**Založení spisu.*/
		TZM_zalsp_ssl=60,
        /**Vytvoření ČJ*/
		TZM_cj_vytv=65,
        /**Vyjmutí písemnosti ze spisu.*/
		TZM_vyjsp_ssl=70,
        /**Změna evidenčního profilu spisu*/
		TZM_edit_spis=80,
        /**ZmenaPristupu*/
		_82=82,
        /**Vyřízení písemností vložením do agendy.*/
		TZM_vlag_pis=90,
        /**Vyřízení spisu.*/
		TZM_vyriz_spi=100,
        /**Zrušení vyřízení ČJ*/
		_101=101,
        /**Vyřízení*/
		TZM_cj_vyriz=105,
        /**Zadání vyřizující písemnosti spisu.*/
		TZM_set_ixp_vyr_110=110,
        /**Označení písemnosti jako vyřizující písemnost spis*/
		TZM_set_ixp_vyr_120=120,
        /**Zrušení označení vyřizující písemnost spisu.*/
		TZM_set_ixp_vyr_130=130,
        /**Ztracení písemnosti.*/
		TZM_ixp_ztrat=140,
        /**Nalezení písemnosti.*/
		TZM_ixp_nalez=150,
        /**Zastavení vyřizování spisu.*/
		TZM_ixp_zavy=160,
        /**Obnovení vyřizování spisu.*/
		TZM_ixp_obvy=170,
        /**Odeslání.*/
		_175=175,
        /**Přesun obsahu spisu*/
		TZM_ixp_prior=180,
        /**Odeslání jako originál.*/
		_185=185,
        /**Spis nabyl právní moc.*/
		TZM_ixp_prav=190,
        /**Přiděleno.*/
		TZM_ixp_pridel_200=200,
        /**Zrušení přidělení.*/
		TZM_ixp_pridel_210=210,
        /**Přijmutí a uložení do spisovny*/
		_220=220,
        /**Uzavření dokumentu*/
		_230=230,
        /**Zrušení uzavření*/
		TZM_ixp_oduza=232,
        /**schváleno prodloužení termínu vyřízení*/
		_240=240,
        /**zamítnuto prodloužení termínu vyřízení*/
		_250=250,
        /**Zrušení přesunu obsahu spisu*/
		TZM_ixp_uprior=260,
        /**Vytvoření kopie dokumentu*/
		_270=270,
        /**Předání do externí agendy*/
		_280=280,
        /**Převzetí z externí agendy*/
		_290=290,
        /**Přiřazení přílohy k dokladu/dokumentu*/
		_300=300,
        /**Odstranění přílohy dokladu/dokumentu*/
		_302=302,
        /**Zneaktivnění přílohy dokladu/dokumentu*/
		_304=304,
        /**Zaktivnění přílohy dokladu/dokumentu*/
		_306=306,
        /**Odeslání nedokladované z dokumentu/dokladu.*/
		_308=308,
        /**Odeslání informací o dokumentu v rámci ZUD.*/
		_310=310,
        /**Odeslání el. obrazu či příloh v rámci ZUD.*/
		_312=312,
        /**Zobrazení dokumentu.*/
		_318=318,
        /**Zobrazení elektronického obrazu dokladu/dokumentu*/
		_320=320,
        /**Uložení elektronického obrazu dokladu/dokumentu*/
		_321=321,
        /**Zobrazení elektronické přílohy dokladu/dokumentu*/
		_322=322,
        /**Uložení elektronické přílohy dokladu/dokumentu*/
		_323=323,
        /**Odstranění el. obrazu/přílohy dokladu/dokumentu*/
		_324=324,
        /**Zneaktivnění el. obrazu/přílohy dokladu/dokumentu*/
		_326=326,
        /**Záměna el. obrazu za přílohu*/
		_327=327,
        /**Zamčení el. obrazu/přílohy dokladu/dokumentu*/
		_328=328,
        /**Odemčení el. obrazu/přílohy dokladu/dokumentu*/
		_330=330,
        /**Znovuvložení el. obrazu k dokladu/dokumentu*/
		_331=331,
        /**Vložení el. obrazu k dokladu/dokumentu*/
		_332=332,
        /**Vložení nové verze el. obrazu k dokladu/dokumentu*/
		_333=333,
        /**Vložení el. přílohy k dokladu/dokumentu*/
		_334=334,
        /**Znovuvložení el. přílohy k dokladu/dokumentu*/
		_335=335,
        /**Konverze elektronického obrazu dokladu/dokumentu*/
		_336=336,
        /**Nahrazení el. obrazu přílohou*/
		_337=337,
        /**Konverze elektronické přílohy dokladu/dokumentu*/
		_338=338,
        /**Vložení nové verze el. přílohy k dokladu/dokumentu*/
		_339=339,
        /**Podepsání elektronického obrazu dokladu/dokumentu*/
		_340=340,
        /**Vytvoření čas. raz. el. obrazu dokl./dokum.*/
		_341=341,
        /**Podepsání elektronické přílohy dokladu/dokumentu*/
		_342=342,
        /**Vytvoření čas. raz. el. přílohy dokl./dokum.*/
		_343=343,
        /**Podepsání s čas. razítkem el. obrazu dokl./dokum.*/
		_344=344,
        /**Podepsání s čas. razítkem el. přílohy dokl./dokum.*/
		_346=346,
        /**Vložení el. podpisu k el. obrazu dokl./dokum.*/
		_350=350,
        /**Kompletace LTV podpisu el. obrazu dokl./dokum.*/
		_351=351,
        /**Vložení čas. raz. k el. obrazu dokl./dokum.*/
		_352=352,
        /**Vložení el. podpisu k el. příloze dokl./dokum.*/
		_356=356,
        /**Kompletace LTV podpisu el. přílohy dokl./dokum.*/
		_357=357,
        /**Vložení čas. raz. k el. příloze dokl./dokum.*/
		_358=358,
        /**Nastavení příznaků formy dokumentu*/
		_360=360,
        /**Nastavení příznaků verzí el. dokumentu*/
		_362=362,
        /**Ruční označení verze el. dokumentu - PDF/A.*/
		TZM_ixp_opdfa=364,
        /**Změna názvu el. souboru systémem při el. podání*/
		TZM_sys_zm_name=365,
        /**Změna názvu el. souboru uživatelem při el. podání*/
		TZM_uzi_zm_name_366=366,
        /**Změna názvu el. souboru uživatelem*/
		TZM_uzi_zm_name_368=368,
        /**Zobrazení el. podání*/
		_370=370,
        /**Zobrazení původního el. podání*/
		_372=372,
        /**Oprava metadat ověření el. podání*/
		_374=374,
        /**Tisk el. obrazu dokladu/dokumentu*/
		_380=380,
        /**Tisk el. přílohy dokladu/dokumentu*/
		_381=381,
        /**Zadání důvodu zobrazení elektronického obrazu*/
		_390=390,
        /**Zadání důvodu zobrazení elektronické přílohy*/
		_392=392,
        /**Opatření elektronickou značkou a časovým razítkem*/
		_396=396,
        /**Vložení el. pečeti dokl./dokum.*/
		_397=397,
        /**Ověření podpisu a zapouzdření původního dokumentu.*/
		_398=398,
        /**Zobr. neveř. dok. jinou osobou než. je vlast. fun.*/
		TZM_zobnev_nev=400,
        /**Zobrazení detailu dokumentu/dokladu.*/
		_410=410,
        /**Export el. dokumentů z dokumentu/dokladu.*/
		_420=420,
        /**Export dokumentu/spisu dle NS*/
		_430=430,
        /**Export dokumentu/spisu*/
		_432=432,
        /**Import dokumentu/spisu dle NS*/
		_440=440,
        /**Přenos zahájení*/
		_442=442,
        /**Přenos ukončení*/
		_444=444,
        /**Ztvárnění*/
		_446=446,
        /**Návrh zveřejnění na úřední desku*/
		_448=448,
        /**Změna návrhu zveřejnění na úřední desku*/
		_449=449,
        /**Zveřejnění na úřední desku*/
		_450=450,
        /**Změna zveřejnění na úřední desku*/
		_452=452,
        /**Sejmutí dokumentu z úřední desky*/
		_455=455,
        /**Storno zveřejnění na úřední desku*/
		_458=458,
        /**Zveřejnění el. dokumentu*/
		_460=460,
        /**Označení el. dokumentu ke zveřejnění.*/
		TZM_ixp_ozzve=462,
        /**Zrušení označení el. dokumentu ke zveřejnění.*/
		TZM_ixp_odzve=464,
        /**Označení el. dokumentu - nezveřejňovat.*/
		TZM_ixp_ozzvn=465,
        /**Anonymizace el. obrazu.*/
		TZM_ixp_anoe_466=466,
        /**Anonymizace el. přílohy.*/
		TZM_ixp_anop=468,
        /**Změna stavu anonymizováno u el. přílohy*/
		TZM_ixp_anoe_469=469,
        /**Přidání oprávnění IRP*/
		_470=470,
        /**Změna oprávnění IRP*/
		_472=472,
        /**Odstranění oprávnění IRP*/
		_474=474,
        /**Operace s balíkem.*/
		_500=500,
        /**Skartace.*/
		_510=510,
        /**Pozastavení skartační operace*/
		_512=512,
        /**Obnovení skartační operace*/
		_514=514,
        /**Změna spouštěcí události*/
		_516=516,
        /**Archivace.*/
		_520=520,
        /**Zařazeno do skartačního návrhu*/
		_523=523,
        /**Vyřazeno ze skartačního návrhu*/
		_525=525,
        /**Delimitace.*/
		_530=530,
        /**Úspěšně uloženo v DA*/
		_532=532,
        /**Odmítnuto DA*/
		_534=534,
        /**Výpůjčení ze spisovny.*/
		_540=540,
        /**Návrat do spisovny.*/
		_550=550,
        /**Kontrola evidenčních položek*/
		_560=560,
        /**Kontrola el.souborů*/
		_570=570,
        /**Vygenerování SIP*/
		_580=580,
        /**Přidání klíčového slova.*/
		TZM_ixp_klslop=600,
        /**Odebrání klíčového slova.*/
		TZM_ixp_klsloo=610,
        /**Zařazeno do smluvního pokutování*/
		_701=701,
        /**Vyřazeno ze smluvního pokutování*/
		_702=702,
        /**BPL-schválení krytí*/
		_703=703,
        /**BPL-schválení likvidace*/
		_704=704,
        /**BPL-schválení likvidace záloh*/
		_705=705,
        /**Vložení dokumentu do dočasného úložiště*/
		_801=801,
        /**Vyjmutí dokumentu z dočasného úložiště*/
		_802=802,
        /**Zapůjčení dokumentu z dočasného úložiště*/
		_803=803,
        /**Vrácení dokumentu do dočasného úložiště*/
		_804=804,
        /**Odebrání vlastnictví*/
		TZM_ixp_pre_nik=1000,
        /**vlastní*/
		_1010=1010,
        /**cizí*/
		_1012=1012,
        /**založení spisu*/
		_1014=1014,
        /**evidence do knihy, deníku*/
		_1020=1020,
        /**zmena evidovaných hodnot*/
		_1022=1022,
        /**Schválení*/
		TZMP_ixp_schval=1030,
        /**Zrušení schválení*/
		TZMP_ixp_odschv=1032,
        /**úplně*/
		_1040=1040,
        /**Ověření v registru plátců DPH*/
		_1041=1041,
        /**částečně*/
		_1042=1042,
        /**úplně*/
		_1050=1050,
        /**částečně*/
		_1052=1052,
        /**standardní*/
		_1060=1060,
        /**nucené*/
		_1062=1062,
        /**Storno*/
		_1070=1070,
        /**Zrušení storna*/
		TZM_ixp_odstor=1072,
        /**přidělené=předáno*/
		_1090=1090,
        /**předáno*/
		_1092=1092,
        /**Zamítnutí převzeti, vrácení původnímu vlastníkovi*/
		_1094=1094,
        /**primární doklad*/
		_1100=1100,
        /**sekundární doklad*/
		_1102=1102,
        /**Vytvoření vazby mezi dokumenty/spisy*/
		_1104=1104,
        /**Změna vazby mezi dokumenty/spisy*/
		_1106=1106,
        /**Zrušení vazby mezi dokumenty/spisy*/
		_1110=1110,
        /**Likvidace mylné platby*/
		_1150=1150,
        /**Dílčí termín dokumentu-vytvoření.*/
		_1190=1190,
        /**Dílčí termín dokumentu-editace.*/
		_1192=1192,
        /**Dílčí termín dokumentu-splnění.*/
		_1194=1194,
        /**Dílčí termín dokumentu-nesplnění.*/
		_1196=1196,
        /**Dílčí termín dokumentu-smazání.*/
		_1198=1198,
        /**Označení el. přílohy pro EPK*/
		_1252=1252,
        /**Zrušení označení el. přílohy pro EPK*/
		_1254=1254,
        /**Založení žádosti o zveřejnění*/
		_1300=1300,
        /**Změna stavu žádosti o zveřejnění*/
		_1310=1310,
        /**Přidání přílohy k žádosti o zveřejnění*/
		_1320=1320,
        /**Zadání důvodu nezveřejnění*/
		_1340=1340,
        /**Zadání zveřejnění protistranou*/
		_1350=1350,
        /**Vytvoření žádosti o podpis*/
		_1400=1400,
        /**Vyřízení žádosti o podpis/schválení.*/
		_1410=1410,
        /**Vložení vyřizujícího dokumentu v EPK.*/
		TZM_ixp_vyrepd=1412,
        /**Zamítnutí žádosti o podpis/schválení.*/
		_1420=1420,
        /**Zrušení žádosti o podpis/schválení.*/
		_1430=1430,
        /**Zneplatnění žádosti o podpis/schválení.*/
		_1440=1440,
        /**Vytvoření předpisu schvalovacího procesu.*/
		_1450=1450,
        /**Vložení předpisu schvalovacího procesu do EPK.*/
		_1460=1460,
        /**Změna priority úkonů v EPK*/
		_1462=1462,
        /**Finanční kontrola zahájena*/
		_1470=1470,
        /**Finanční kontrola povolena*/
		_1471=1471,
        /**Finanční kontrola zamítnuta*/
		_1472=1472,
        /**Finanční kontrola stornována*/
		_1473=1473,
        /**Finanční kontrola: ukončena platnost*/
		_1474=1474,
        /**Vyřízení předpisu schvalovacího procesu.*/
		_1480=1480,
        /**Účetní kontrola*/
		_1490=1490,
        /**Účetní kontrola povolena*/
		_1491=1491,
        /**Účetní kontrola zamítnuta*/
		_1492=1492,
        /**Účetní kontrola stornována*/
		_1493=1493,
        /**Účetní kontrola: ukončena platnost*/
		_1494=1494,
        /**Smazání nehlavičkových metadat*/
		_1500=1500,
        /**Průběžná kontrola*/
		_1510=1510,
        /**Průběžná kontrola povolena*/
		_1511=1511,
        /**Průběžná kontrola zamítnuta*/
		_1512=1512,
        /**Průběžná kontrola stornována*/
		_1513=1513,
        /**Průběžná kontrola: ukončena platnost*/
		_1514=1514,
        /**Komunikace se systémem Státní pokladny (IISSP)*/
		_1800=1800,
        /**Komunikace se systémem EDS/SMVS*/
		_1810=1810,
        /**Upozornění na insolvenci subjektu na dokladu*/
		_2000=2000,
        /**Zastavení práce kvůli insolvenci subjektu*/
		_2010=2010,
        /**Upozornění na stupeň verifikace ESU na dokladu*/
		_2030=2030,
        /**Převzetí žádosti o poskytnutí informací po schválení nejvhodnější nabídky VZ*/
		_2101=2101,
        /**Žádost o autorizovanou konverzi do datové zprávy*/
		_2200=2200,
        /**Žádost o autorizovanou konverzi do listiny*/
		_2210=2210,
        /**Žádost o převod dokumentu do digitální podoby*/
		_2220=2220,
        /**Žádost o převod dokumentu do analogové podoby*/
		_2230=2230,
        /**Žádost o změnu datového formátu*/
		_2240=2240,
        /**Storno žádosti o konverzi*/
		_2250=2250,
        /**Provedení autorizované konverze do datové zprávy*/
		_2260=2260,
        /**Provedení autorizované konverze do listiny*/
		_2270=2270,
        /**Provedení převodu dokumentu do digitální podoby*/
		_2280=2280,
        /**Provedení převodu dokumentu do analogové podoby*/
		_2290=2290,
        /**Provedení změny datového formátu*/
		_2300=2300,
        /**Zobrazení detailu evidence škody*/
		_2400=2400,
        /**Zobrazení seznamu materiálu*/
		_2410=2410,
        /**Zobrazení seznamu viníků*/
		_2420=2420,
        /**Provedení kontroly evidence škody*/
		_2430=2430,
        /**Vygenerována šablona pro pořízení dokladu jiné agendy*/
		_3000=3000,
        /**Uzavření předpisu*/
		_3001=3001,
        /**Změna ESU na případu*/
		_3002=3002,
        /**Změna odpovědné osoby na případu*/
		_3003=3003,
        /**Změna částky vymáhání*/
		_3004=3004,
        /**Změna částky penále záznamu o vymáhání*/
		_3005=3005,
        /**Změna procenta penále záznamu o vymáhání*/
		_3006=3006,
        /**Změna data od pro vymáhání*/
		_3007=3007,
        /**Změna data do pro vymáhání*/
		_3008=3008,
        /**Změna data vystavení vymáhání*/
		_3009=3009,
        /**Změna stavu vymáhání*/
		_3010=3010,
        /**Ruční pořízení vymáhání*/
		_3011=3011,
        /**Vznik vratky*/
		_3012=3012,
        /**Změna vratky*/
		_3013=3013,
        /**Modifikace nulového předpisu*/
		_3014=3014,
        /**Modifikace vymáhání po odeslání*/
		_3015=3015,
        /**Změna příznaku odeslání vymáhání*/
		_3016=3016,
        /**Změna příznaku tisku vymáhání*/
		_3017=3017,
        /**Obnovení vymáhání*/
		_3018=3018,
        /**Zrušení vymáhání*/
		_3019=3019,
        /**Zpracování požadavků z ostatních agend*/
		_3020=3020,
        /**Změna data vzniku vratky*/
		_3021=3021,
        /**Změna stavu vymáhání případu*/
		_3022=3022,
        /**Změna stavu vymáhání případu*/
		_3023=3023,
        /**Upozornění na stav případu*/
		_3024=3024,
        /**Změna typu pohledávky na případu*/
		_3025=3025,
        /**Změna předběžného předpisu na řádný*/
		_3026=3026,
        /**Změna příznaku vymáhání předpisu*/
		_3027=3027,
        /**Změna příznaku nepárovat na předpisu*/
		_3028=3028,
        /**Změna příznaku Ost. zdan. plnění do 10 000 Kč u předpisu*/
		_3029=3029,
        /**Doplnění čísla daňového dokladu na předpisu*/
		_3030=3030,
        /**Zrušení příznaku tisku daňového dokladu na předpisu*/
		_3031=3031,
        /**Zrušení uzávěrky předpisu*/
		_3032=3032,
        /**Zrušení schválení předpisu*/
		_3033=3033,
        /**Vygenerování předpisů pro rok*/
		_3034=3034,
        /**Skartace údajů poplatníka*/
		_3035=3035,
        /**Aktualizace stavu párování na nenulových předpisech*/
		_3036=3036,
        /**Aktualizace stavu párování na nulových předpisech*/
		_3037=3037,
        /**Rušení opravných položek*/
		_3038=3038,
        /**Změna data uzávěrky*/
		_3039=3039,
        /**Předání vratky k realizaci*/
		_3040=3040,
        /**Vrácení vratky*/
		_3041=3041,
        /**Obnovení vratky*/
		_3042=3042,
        /**Zrušení vratky*/
		_3043=3043,
        /**Schválení vratky*/
		_3044=3044,
        /**Vložení kopie dokumentu do spisu případu*/
		_3045=3045,
        /**Aktualizace zák. zástupců z ROB - přidán odkaz sám na sebe*/
		_3046=3046,
        /**Aktualizace zák. zástupců z ROB - byl odstraněn odkaz na původní doč.subj*/
		_3047=3047,
        /**Aktualizace zák. zástupců z ROB - přidání ESU*/
		_3048=3048,
        /**Změna údajů účetního pohybu*/
		_3049=3049,
        /**Požadavek na vygenerování rezervačního pohybu*/
		_3050=3050,
        /**Generování opravných položek*/
		_3051=3051,
        /**Převod pohledávky na podrozvahu*/
		_3052=3052,
        /**Převod pohledávky (oprava) na podrozvahu*/
		_3053=3053,
        /**Změna výše předpisu*/
		_3054=3054,
        /**Vytvoření typu pohledávky*/
		_3055=3055,
        /**Aktualizace stavů pohledávky*/
		_3056=3056,
        /**Neúspěch ukončení případu při roční uzávěrce*/
		_3057=3057,
        /**Pokus generování avizačních dat bez povolení*/
		_3058=3058,
        /**Obnovení případu*/
		_3059=3059,
        /**Ukončení případu*/
		_3060=3060,
        /**Zrušení případu*/
		_3061=3061,
        /**Uvolnění VS při vyřízení případu*/
		_3062=3062,
        /**Ukončení skupiny případu plátce/poplatník*/
		_3063=3063,
        /**Zesplatnění pohledávky*/
		_3064=3064,
        /**Převod dluhu*/
		_3065=3065,
        /**Odpojení případu*/
		_3066=3066,
        /**Uzavření roku*/
		_3067=3067,
        /**Změna vlastního bankovního účtu v typu pohledávky*/
		_3068=3068,
        /**Napojení případu*/
		_3069=3069,
        /**Změna příznaku generovat opravné položky na případu*/
		_3070=3070,
        /**Likvidace případu*/
		_3071=3071,
        /**Přecenění pohledávky v cizí měně*/
		_3072=3072,
        /**Založení karty případu*/
		_3073=3073,
        /**Změna údajů na kartě případu*/
		_3074=3074,
        /**Změna údajů na předpisu*/
		_3075=3075,
        /**Storno předpisu*/
		_3076=3076,
        /**Generování účetních pohybů uzávěrkou*/
		_3077=3077,
        /**Hlavní uzávěrka*/
		_3078=3078,
        /**Evidence případu*/
		_3079=3079,
        /**Založení opravného předpisu*/
		_3080=3080,
        /**Změna typu účetního případu*/
		_3081=3081,
        /**Penalizace případu*/
		_3082=3082,
        /**Aktualizace dotčených subjektů případu*/
		_3083=3083,
        /**Aktualizace externích subjektů případu*/
		_3084=3084,
        /**Aktualizace externích subjektů vymáhání*/
		_3085=3085,
        /**Založení požadavku na vznik případu DDP*/
		_3086=3086,
        /**Založení požadavku na změnu případu DDP*/
		_3087=3087,
        /**Založení případu DDP na základě požadavku externí agendy*/
		_3088=3088,
        /**Změna případu DDP na základě požadavku externí agendy*/
		_3089=3089,
        /**Zrušení případu DDP na základě požadavku externí agendy*/
		_3090=3090,
        /**Založení pohledávky na základě požadavku dávky INT*/
		_3091=3091,
        /**Změna pohledávky na základě požadavku dávky INT*/
		_3092=3092,
        /**Zrušení pohledávky na základě požadavku dávky INT*/
		_3093=3093,
        /**Rozpuštění dluhu*/
		_3094=3094,
        /**Předání správci*/
		_3095=3095,
        /**Přijetí správcem*/
		_3096=3096,
        /**Schválení správcem*/
		_3097=3097,
        /**Odmítnutí správcem*/
		_3098=3098,
        /**Vrácení správci*/
		_3099=3099,
        /**Nastavení příznaku podepsáno*/
		_3100=3100,
        /**Zrušení příznaku podepsáno*/
		_3101=3101,
        /**Ukončení*/
		_3102=3102,
        /**Zrušení ukončení*/
		_3103=3103,
        /**Nápočet očekávaného čerpání*/
		_3104=3104,
        /**Vložení nové položky*/
		_3105=3105,
        /**Připojení elektronického souboru na majetkovou kartu*/
		_3110=3110,
        /**Uživatelský záznam historie*/
		_5000=5000,
	}
	function GWflczmeEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflczmeEnum, Gordic.Ginis.DbModel.GWflczmeDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflczpdDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflczpd*/
	interface GWflczpdDto {
		/**Způsob doručení/odesláníZpůsob doručení/odeslání*/
		zpusob_dor?: number|null;
		/**DBCOLUMN:wflczpd.zpusob_dor_txt*/
		zpusob_dor_txt?: string|null;
		/**DBCOLUMN:wflczpd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflczpd.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflczpd.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflczpd.k_xml*/
		k_xml?: string|null;
		/**Plní se seznamem čísel služeb - setříděný a oddělený čárkou. Pokud je prázdno nebo NULL, potom to znamená povoleno vše. Pokud je zadán znak '#' potom to znamená že není povoleno nic.*/
		povol_sl?: string|null;
		/**DBCOLUMN:wflczpd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflczpd.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflczpd.ixs_lpc*/
		ixs_lpc?: string|null;
		/**Enum pro XML rozhraní dle NS*/
		ess_xml?: string|null;
		/**Resx kód pro lokalizaci této hodnoty číselníku*/
		zpusob_dor_rsx?: number|null;
		/**Kategorie způsobo doručení či odeslání (wflckzd)*/
		ktg_zp_dor?: number|null;
		/**Příznak zda daný způsob je pro doručení*/
		priz_pro_doruc?: number|null;
		/**Příznak zda daný způsob je pro odeslání*/
		priz_pro_odes?: number|null;
		/**SU e-výpravny pro odeslání na kterou bude předána zásilka automaticky při odeslání*/
		ixs_su_evyp?: string|null;
		/**FUN e-výpravny pro odeslání na kterou bude předána zásilka automaticky při odeslání*/
		ixs_fun_evyp?: string|null;
	}
	const enum GWflczpdDtoNames { zpusob_dor = "zpusob_dor", zpusob_dor_txt = "zpusob_dor_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", k_xml = "k_xml", povol_sl = "povol_sl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", ess_xml = "ess_xml", zpusob_dor_rsx = "zpusob_dor_rsx", ktg_zp_dor = "ktg_zp_dor", priz_pro_doruc = "priz_pro_doruc", priz_pro_odes = "priz_pro_odes", ixs_su_evyp = "ixs_su_evyp", ixs_fun_evyp = "ixs_fun_evyp",}
	const enum GWflczpdDtoFragments { zpusob_dor = "*", zpusob_dor_txt = "*", k_v = "*", k_s = "*", aktivita = "*", k_xml = "*", povol_sl = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", ess_xml = "*", zpusob_dor_rsx = "*", ktg_zp_dor = "*", priz_pro_doruc = "*", priz_pro_odes = "*", ixs_su_evyp = "*", ixs_fun_evyp = "*",}
	const enum GWflczpdDtoTypes { zpusob_dor = "number", zpusob_dor_txt = "string", k_v = "number", k_s = "string", aktivita = "number", k_xml = "string", povol_sl = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", ess_xml = "string", zpusob_dor_rsx = "number", ktg_zp_dor = "number", priz_pro_doruc = "number", priz_pro_odes = "number", ixs_su_evyp = "string", ixs_fun_evyp = "string",}
	const enum GWflczpdDtoTypeLengths { zpusob_dor_txt = 50, k_s = 15, k_xml = 254, povol_sl = 100, zmenu_prov = 12, ixs_lpc = 12, ess_xml = 100, ixs_su_evyp = 12, ixs_fun_evyp = 12,}
	/**ENUM:wflczpd*/
	const enum GWflczpdEnum {
		/**neurčeno*/
		neurceno=0,
		/**pošta*/
		posta=10,
		/**Jako pošta*/
		posta_002=15,
		/**osobně*/
		osobne=20,
		/**veřejná vyhláška*/
		verejnavyhlaska=23,
		/**detašovaná pošta*/
		detasovanaposta=25,
		/**Spisová rozluka*/
		spisovarozluka=29,
		/**kurýr*/
		kuryr=30,
		/**CRONOS výpravna*/
		cronos_vypravna=31,
		/**VEGA-D výpravna*/
		vegad_vypravna=32,
		/**BICES výpravna*/
		bices_vypravna=33,
		/**VEGA-T výpravna*/
		vegat_vypravna=34,
		/**Jako kurýr*/
		kuryr_002=35,
		/**doručovací služba*/
		dorucovacisluzba=40,
		/**e-mail*/
		elektronickaposta=50,
		/**e-mail - jiný systém*/
		e_mail_jinysystem=53,
		/**e-výpravna*/
		e_vypravna=55,
		/**Jako e-mail*/
		e_mail_002=58,
		/**fax*/
		fax=60,
		/**web-portal*/
		digitalni_002=65,
		/**dálnopis/telegram*/
		dalnopistelegram=70,
		/**telefon*/
		telefon=80,
		/**ústně do protokolu*/
		ustnedoprotokolu=90,
		/**DS*/
		ds=100,
		/**DS e-výpravna*/
		dse_vypravna=110,
		/**DS - jiný systém*/
		ds_jinysystem=120,
		/**eSAT e-výpravna*/
		eSAT_e_vypravna=130,
		/**GEX*/
		gex=200,
		/**GEX e-výpravna*/
		gexe_vypravna=210,
		/**HP e-výpravna*/
		ofic_hp_e_vypravna=305,
		/**HP e-výpravna ICZ*/
		hp_e_vypravna=310,
		/**HP - jiný systém*/
		hp_jiny_system=340,
		/**HKP e-výpravna*/
		hp_isds_e_vypravna=350,
		/**ZP e-výpravna*/
		zp_e_vypravna=410,
		/**eDesk*/
		edesk=500,
		/**ES e-výpravňa*/
		es_e_vypravna=510,
		/**ES e-výpravňa jiný systém*/
		es_e_vypravna_noris=520,
		/**UDE GINIS*/
		ude_ginis=600,
		/**UDE jiný systém*/
		ude_jiny_system=610,
		/**interní*/
		interni=700,
		/**jako interní*/
		jako_interni=710,
		/**eKLEP*/
		e_klep=800,
		/**eKLEP jiný systém*/
		e_klep_j_s=810,
		/**tender-arena*/
		tender_arena=820,
		/**tender-arena jiný systém*/
		tender_arena_j_s=830,
		/**ePodatelna-nosič*/
		ePodatelna_nosic=1010,
		/**ePodatelna-mail*/
		ePodatelna_mail=1020,
		/**ePodatelna-web*/
		ePodatelna_web=1030,
		/**e-dokument*/
		e_dokument=1040,
		/**REP zásilka*/
		REP=1050,
		/**Info-kanál*/
		info_kanal=1060,
		/**ePodatelna-RAP/OSP*/
		ePodatelna_portal=1070,
		/**ePodatelna-portal*/
		ePodatelna_ciziportal=1080,
	}
	function GWflczpdEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflczpdEnum, Gordic.Ginis.DbModel.GWflczpdDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ginis.DbModel\Wfl\GWflspidBaseDto.d.ts 

declare namespace Gordic.Ginis.DbModel {
	/**DBTABLE:wflspid
	*      Profil písemnosti
	*/
	interface GWflspidBaseDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktuální spis*/
		ixp_spis?: string|null;
		/**příznak spis-písemnost*/
		priz_spis?: number|null;
		/**Vlastník funkce*/
		ixs_fun_akt?: string|null;
		/**Vlastník spisový uzel*/
		ixs_su_akt?: string|null;
		/**název písemnosti*/
		nazev?: string|null;
		/**Značka dokumentu
		*      Značka dokumentu/spisu - obvykle je v této položce ČJ dokumentu, nebo Sp. Zn. spisu ve kterém je vložen
		*/
		akt_znacka?: string|null;
		/**Příznak distribuce*/
		stav_dist?: number|null;
		/**Stav dokumentu/spisu*/
		stav_pis?: number|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**Kategorie typu dokumentu*/
		ktg_typ?: number|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Příznak doručení
		*      Příznak, že k dokumentu existuje profil o doručení - záznam v tabulce wflspio
		*/
		s_prij?: number|null;
		/**Příznak existence profilu SSL
		*      Přízna, že existuje profil SSL dokumentu s dalšími metadaty
		*/
		s_ssl?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Příznak elektronické písemnosti*/
		s_ele?: number|null;
		/**Příznak fyzické písemnosti*/
		s_fyz?: number|null;
		/**Odesílatel nebo místo vzniku dokumentu
		*      U cizího/došlého dokumentu odesílatel - jednořádkově textově, u vlastního pak odbor/spisový uzel kde vznikl a text vlastní.
		*/
		misto_vzniku?: string|null;
		/**Příznak podepsání
		*       příznak že je el. soubor/komponenta podepsán (0-ne,1-podpis,2-podpis a razítko,3- jen razítko viz. číselník)
		*/
		s_sgn?: number|null;
		/**Datum podání*/
		dat_pod?: JsonDate|null;
		cs_akt_znacka?: string|null;
		/**Příznak přečtení 
		*      Příznak přečtení aktuálním vlastníkem
		*/
		priz_view_ssl?: number|null;
		/**Barva
		*      Uživatelská barva připojená k dokumentu/spisu
		*/
		uzo?: string|null;
		/**Spisový plán*/
		spis_pl?: string|null;
		/**Spisový znak*/
		spis_znak?: string|null;
		/**Vlastník agendový funkce*/
		ixs_fun_wfl?: string|null;
		/**Příznak uložení ve spisovně
		*      Příznak zda je již daná entita uložena ve spisovně
		*/
		s_uloz?: number|null;
		/**Datum uložení
		*      Datum uložení entity ve spisovně
		*/
		dat_uloz?: JsonDate|null;
		/**Vlastník agendový spisový uzel*/
		ixs_su_wfl?: string|null;
		/**Příznak odeslání dané entity jako originál mimo organizaci*/
		s_odes?: number|null;
		dat_mpd0?: JsonDate|null;
		/**Vztah k č.j.*/
		priz_cj?: number|null;
		dat_vyriz?: JsonDate|null;
		/**ID ČJ - odkaz do tabulky wflsdcj*/
		ixs_cj?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Informace o způsobu vzniku dokumentu/spisu v systému
		*      Informace o způsobu vzniku dokumentu/spisu v systému - 0=ruční podání, 10=elektronické podání, 20=datová schránka
		*/
		puvod?: number|null;
		/**Příznak schválení dokumentu. Dokument může být schválen přímo vlastníkem nebo třeba přes žádost v EPK.*/
		s_schval?: number|null;
		/**Umístění
		*      Umístění dokumentu (analogového)
		*/
		umisteni?: string|null;
		/**Úroveň přístupu*/
		st_utaj_id?: number|null;
		/**wfl_pristup - technologický sloupce využitý při IRP*/
		wfl_pristup?: number|null;
		/**Skartační znak*/
		skar_znak?: string|null;
		/**Skartační lhůta*/
		skar_lhuta?: number|null;
		/**Rok spouštěcí události
		*      Přepdpokládaný rok spouštěcí události
		*/
		rok_spo_uda?: number|null;
		/**Odkaz na nejvyšší entitu
		*      odkaz na nejvyšší entitu např. typový spis (díl i součást zde budou mít ID typového spisu)
		*/
		ixp_top?: string|null;
		/**Typ spisu*/
		typ_spis?: number|null;
		/**Čárový kód z jiného systému
		*      Čárový kód z jiného systému - např. pokud je dokument přenesen rozhraním z jiného agendového nebo ESSS
		*/
		barcode?: string|null;
		/**Skartační lhůta pro správní řízení - může být pro stejný spisový znak jiná než pro dokumenty jiných agend
		*      Skartační lhůta pro správní řízení - může být pro stejný spisový znak jiná než pro dokumenty jiných agend
		*/
		skar_lhuta_spra?: number|null;
		/**Externí systém - vlastník
		*      Vlastnictví dokumentu z pohledu externího/interního informačního systému
		*/
		ixs_ext?: string|null;
		/**Rok skartace
		*       Rok skartace - obykle rok spouštěcí události + skratační lhůta + 1, ale může být i pozastaveno takže se na údaj nelze spoléhat.
		*/
		rok_skartace?: number|null;
		/**Spouštění událost
		*      ID spouštěcí události - číselník
		*/
		ixs_spu?: string|null;
		/**Počet listů*/
		poc_listu?: string|null;
		/**Počet stran*/
		poc_stran?: number|null;
		/**Počet kopií*/
		poc_kop?: number|null;
		/**Počet příloh*/
		poc_priloh?: number|null;
		/**Počet listů příloh*/
		poc_l_priloh?: string|null;
		/**ČJ dokumentu (pokud jej má - při wflspid.priz_cj 0 - při nové metodice vytváření čj na dokumentech)
		*      ČJ dokumentu (pokud jej má - při wflspid.priz_cj 0 - při nové metodice vytváření čj na dokumentech)
		*/
		cj?: string|null;
		/**IČO - vlastník
		*      Vlastník záznamu z pohledu celé organizace - IČo určuje vlastníka - je to hlavní nástroj izolace dat o dokumentech u multi-tenant databází
		*/
		ico?: string|null;
		ixp_spis_prir?: string|null;
	}
	const enum GWflspidBaseDtoNames { ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixp_spis_prir = "ixp_spis_prir",}
	const enum GWflspidBaseDtoFragments { ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*", ixp_spis_prir = "*",}
	const enum GWflspidBaseDtoTypes { ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string", ixp_spis_prir = "string",}
	const enum GWflspidBaseDtoTypeLengths { ixp = 12, lic = 4, ixp_spis = 12, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, akt_znacka = 50, ixs_typ = 12, zmenu_prov = 12, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_cj = 12, ixs_lpc = 12, umisteni = 20, skar_znak = 2, ixp_top = 12, barcode = 50, ixs_ext = 12, ixs_spu = 12, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, ixp_spis_prir = 12,}
}

//#endregion

