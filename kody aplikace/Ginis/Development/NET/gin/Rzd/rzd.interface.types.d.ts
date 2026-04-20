/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rzd.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rzd.Interface\Gordic.Rzd.Interface.csproj
*    created     2026-02-16 14:35:50
*    files       Dto\GRozaaatDto.d.ts
*                Dto\GRozdxmaRozpisDto.d.ts
*                Dto\GRozsrzdDto.d.ts
*                Dto\GRozsrzdSumaDto.d.ts
*                Init\GRzdGlobalsBase.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rzd.Interface\Dto\GRozaaatDto.d.ts 

declare namespace Gordic.Rzd.Interface {
	/**DBTABLE:rozaaat*/
	interface GRozaaatDto {
		/**DBCOLUMN:rozaaat.ico*/
		ico?: string|null;
		/**DBCOLUMN:rozaaat.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rozaaat.nks*/
		nks?: string|null;
		/**DBCOLUMN:rozaaat.rok*/
		rok?: number|null;
		/**DBCOLUMN:rozaaat.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:rozaaat.drd*/
		drd?: number|null;
		/**DBCOLUMN:rozaaat.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:rozaaat.uea*/
		uea?: string|null;
		/**DBCOLUMN:rozaaat.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:rozaaat.uec*/
		uec?: string|null;
		/**DBCOLUMN:rozaaat.ued*/
		ued?: string|null;
		/**DBCOLUMN:rozaaat.uee*/
		uee?: string|null;
		/**DBCOLUMN:rozaaat.uef*/
		uef?: string|null;
		/**DBCOLUMN:rozaaat.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:rozaaat.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:rozaaat.uei*/
		uei?: string|null;
		/**DBCOLUMN:rozaaat.uej*/
		uej?: string|null;
		/**DBCOLUMN:rozaaat.te0*/
		te0?: string|null;
		/**DBCOLUMN:rozaaat.te1*/
		te1?: string|null;
		/**DBCOLUMN:rozaaat.te2*/
		te2?: string|null;
		/**DBCOLUMN:rozaaat.te3*/
		te3?: string|null;
		/**DBCOLUMN:rozaaat.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozaaat.kc0*/
		kc0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.kc1*/
		kc1?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.sm0*/
		sm0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.sm1*/
		sm1?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.km0*/
		km0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.km1*/
		km1?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.mj*/
		mj?: string|null;
		/**DBCOLUMN:rozaaat.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rozaaat.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rozaaat.c0_23*/
		c0_23?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_23*/
		c1_23?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_13*/
		c0_13?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_13*/
		c1_13?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_14*/
		c0_14?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_14*/
		c1_14?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_24*/
		c0_24?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_24*/
		c1_24?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_25*/
		c0_25?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_25*/
		c1_25?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_26*/
		c0_26?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_26*/
		c1_26?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_30*/
		c0_30?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_30*/
		c1_30?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_31*/
		c0_31?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_31*/
		c1_31?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_0*/
		c0_0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_0*/
		c1_0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_2*/
		c0_2?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_2*/
		c1_2?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_3*/
		c0_3?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_3*/
		c1_3?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_6*/
		c0_6?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_6*/
		c1_6?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_7*/
		c0_7?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_7*/
		c1_7?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_8*/
		c0_8?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_8*/
		c1_8?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_10*/
		c0_10?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_10*/
		c1_10?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_11*/
		c0_11?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_11*/
		c1_11?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_12*/
		c0_12?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_12*/
		c1_12?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_15*/
		c0_15?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_15*/
		c1_15?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_16*/
		c0_16?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_16*/
		c1_16?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_17*/
		c0_17?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_17*/
		c1_17?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_18*/
		c0_18?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_18*/
		c1_18?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_22*/
		c0_22?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_22*/
		c1_22?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.ca_0*/
		ca_0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.cb_0*/
		cb_0?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.ca_6*/
		ca_6?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.cb_6*/
		cb_6?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.ca_18*/
		ca_18?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.cb_18*/
		cb_18?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:rozaaat.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:rozaaat.c0_21*/
		c0_21?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_21*/
		c1_21?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_34*/
		c0_34?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_34*/
		c1_34?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_54*/
		c0_54?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_54*/
		c1_54?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_66*/
		c0_66?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_66*/
		c1_66?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_62*/
		c0_62?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_62*/
		c1_62?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_63*/
		c0_63?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_63*/
		c1_63?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_67*/
		c0_67?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_67*/
		c1_67?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c0_68*/
		c0_68?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c1_68*/
		c1_68?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.zdroje*/
		zdroje?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.zdroje*/
		zdroje_zobr?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.rozepsano*/
		rozepsano?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.rezervovano*/
		rezervovano?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.cerpano*/
		cerpano?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.rezervovano_zobr*/
		rezervovano_zobr?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.cerpan_zobro*/
		cerpano_zobr?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.zbyva_rezervovat*/
		zbyva_rezervovat?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.zbyva_cerpat*/
		zbyva_cerpat?: JsonDecimal|null;
	}
	const enum GRozaaatDtoNames { ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", xuete = "xuete", drd = "drd", mesic = "mesic", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", kc0 = "kc0", kc1 = "kc1", sm0 = "sm0", sm1 = "sm1", km0 = "km0", km1 = "km1", mj = "mj", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_23 = "c0_23", c1_23 = "c1_23", c0_13 = "c0_13", c1_13 = "c1_13", c0_14 = "c0_14", c1_14 = "c1_14", c0_24 = "c0_24", c1_24 = "c1_24", c0_25 = "c0_25", c1_25 = "c1_25", c0_26 = "c0_26", c1_26 = "c1_26", c0_30 = "c0_30", c1_30 = "c1_30", c0_31 = "c0_31", c1_31 = "c1_31", c0_0 = "c0_0", c1_0 = "c1_0", c0_2 = "c0_2", c1_2 = "c1_2", c0_3 = "c0_3", c1_3 = "c1_3", c0_6 = "c0_6", c1_6 = "c1_6", c0_7 = "c0_7", c1_7 = "c1_7", c0_8 = "c0_8", c1_8 = "c1_8", c0_10 = "c0_10", c1_10 = "c1_10", c0_11 = "c0_11", c1_11 = "c1_11", c0_12 = "c0_12", c1_12 = "c1_12", c0_15 = "c0_15", c1_15 = "c1_15", c0_16 = "c0_16", c1_16 = "c1_16", c0_17 = "c0_17", c1_17 = "c1_17", c0_18 = "c0_18", c1_18 = "c1_18", c0_22 = "c0_22", c1_22 = "c1_22", ca_0 = "ca_0", cb_0 = "cb_0", ca_6 = "ca_6", cb_6 = "cb_6", ca_18 = "ca_18", cb_18 = "cb_18", priz_char = "priz_char", druh_char = "druh_char", c0_21 = "c0_21", c1_21 = "c1_21", c0_34 = "c0_34", c1_34 = "c1_34", c0_54 = "c0_54", c1_54 = "c1_54", c0_66 = "c0_66", c1_66 = "c1_66", c0_62 = "c0_62", c1_62 = "c1_62", c0_63 = "c0_63", c1_63 = "c1_63", c0_67 = "c0_67", c1_67 = "c1_67", c0_68 = "c0_68", c1_68 = "c1_68", zdroje = "zdroje", zdroje_zobr = "zdroje_zobr", rozepsano = "rozepsano", rezervovano = "rezervovano", cerpano = "cerpano", rezervovano_zobr = "rezervovano_zobr", cerpano_zobr = "cerpano_zobr", zbyva_rezervovat = "zbyva_rezervovat", zbyva_cerpat = "zbyva_cerpat",}
	const enum GRozaaatDtoFragments { ico = "*", ucs = "*", nks = "*", rok = "*", xuete = "*", drd = "*", mesic = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", kc0 = "*", kc1 = "*", sm0 = "*", sm1 = "*", km0 = "*", km1 = "*", mj = "*", dat_zmena = "*", zmenu_prov = "*", c0_23 = "*", c1_23 = "*", c0_13 = "*", c1_13 = "*", c0_14 = "*", c1_14 = "*", c0_24 = "*", c1_24 = "*", c0_25 = "*", c1_25 = "*", c0_26 = "*", c1_26 = "*", c0_30 = "*", c1_30 = "*", c0_31 = "*", c1_31 = "*", c0_0 = "*", c1_0 = "*", c0_2 = "*", c1_2 = "*", c0_3 = "*", c1_3 = "*", c0_6 = "*", c1_6 = "*", c0_7 = "*", c1_7 = "*", c0_8 = "*", c1_8 = "*", c0_10 = "*", c1_10 = "*", c0_11 = "*", c1_11 = "*", c0_12 = "*", c1_12 = "*", c0_15 = "*", c1_15 = "*", c0_16 = "*", c1_16 = "*", c0_17 = "*", c1_17 = "*", c0_18 = "*", c1_18 = "*", c0_22 = "*", c1_22 = "*", ca_0 = "*", cb_0 = "*", ca_6 = "*", cb_6 = "*", ca_18 = "*", cb_18 = "*", priz_char = "*", druh_char = "*", c0_21 = "*", c1_21 = "*", c0_34 = "*", c1_34 = "*", c0_54 = "*", c1_54 = "*", c0_66 = "*", c1_66 = "*", c0_62 = "*", c1_62 = "*", c0_63 = "*", c1_63 = "*", c0_67 = "*", c1_67 = "*", c0_68 = "*", c1_68 = "*", zdroje = "*", zdroje_zobr = "*", rozepsano = "*", rezervovano = "*", cerpano = "*", rezervovano_zobr = "*", cerpano_zobr = "*", zbyva_rezervovat = "*", zbyva_cerpat = "*",}
	const enum GRozaaatDtoTypes { ico = "string", ucs = "string", nks = "string", rok = "number", xuete = "string", drd = "number", mesic = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", kc0 = "JsonDecimal", kc1 = "JsonDecimal", sm0 = "JsonDecimal", sm1 = "JsonDecimal", km0 = "JsonDecimal", km1 = "JsonDecimal", mj = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c0_23 = "JsonDecimal", c1_23 = "JsonDecimal", c0_13 = "JsonDecimal", c1_13 = "JsonDecimal", c0_14 = "JsonDecimal", c1_14 = "JsonDecimal", c0_24 = "JsonDecimal", c1_24 = "JsonDecimal", c0_25 = "JsonDecimal", c1_25 = "JsonDecimal", c0_26 = "JsonDecimal", c1_26 = "JsonDecimal", c0_30 = "JsonDecimal", c1_30 = "JsonDecimal", c0_31 = "JsonDecimal", c1_31 = "JsonDecimal", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c0_2 = "JsonDecimal", c1_2 = "JsonDecimal", c0_3 = "JsonDecimal", c1_3 = "JsonDecimal", c0_6 = "JsonDecimal", c1_6 = "JsonDecimal", c0_7 = "JsonDecimal", c1_7 = "JsonDecimal", c0_8 = "JsonDecimal", c1_8 = "JsonDecimal", c0_10 = "JsonDecimal", c1_10 = "JsonDecimal", c0_11 = "JsonDecimal", c1_11 = "JsonDecimal", c0_12 = "JsonDecimal", c1_12 = "JsonDecimal", c0_15 = "JsonDecimal", c1_15 = "JsonDecimal", c0_16 = "JsonDecimal", c1_16 = "JsonDecimal", c0_17 = "JsonDecimal", c1_17 = "JsonDecimal", c0_18 = "JsonDecimal", c1_18 = "JsonDecimal", c0_22 = "JsonDecimal", c1_22 = "JsonDecimal", ca_0 = "JsonDecimal", cb_0 = "JsonDecimal", ca_6 = "JsonDecimal", cb_6 = "JsonDecimal", ca_18 = "JsonDecimal", cb_18 = "JsonDecimal", priz_char = "number", druh_char = "number", c0_21 = "JsonDecimal", c1_21 = "JsonDecimal", c0_34 = "JsonDecimal", c1_34 = "JsonDecimal", c0_54 = "JsonDecimal", c1_54 = "JsonDecimal", c0_66 = "JsonDecimal", c1_66 = "JsonDecimal", c0_62 = "JsonDecimal", c1_62 = "JsonDecimal", c0_63 = "JsonDecimal", c1_63 = "JsonDecimal", c0_67 = "JsonDecimal", c1_67 = "JsonDecimal", c0_68 = "JsonDecimal", c1_68 = "JsonDecimal", zdroje = "JsonDecimal", zdroje_zobr = "JsonDecimal", rozepsano = "JsonDecimal", rezervovano = "JsonDecimal", cerpano = "JsonDecimal", rezervovano_zobr = "JsonDecimal", cerpano_zobr = "JsonDecimal", zbyva_rezervovat = "JsonDecimal", zbyva_cerpat = "JsonDecimal",}
	const enum GRozaaatDtoTypeLengths { ico = 10, ucs = 10, nks = 12, xuete = 148, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, mj = 5, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rzd.Interface\Dto\GRozdxmaRozpisDto.d.ts 

declare namespace Gordic.Rzd.Interface {
	/**DBTABLE:rozdxma*/
	interface GRozdxmaRozpisDto {
		/**DBCOLUMN:rozdxma.rok*/
		rok?: number|null;
		/**DBCOLUMN:rozdxma.lic*/
		lic?: string|null;
		/**DBCOLUMN:rozdxma.ico*/
		ico?: string|null;
		/**DBCOLUMN:rozdxma.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rozdxma.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:rozdxma.ac*/
		ac?: string|null;
		/**DBCOLUMN:rozdxma.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:rozdxma.nks*/
		nks?: string|null;
		/**DBCOLUMN:rozdxma.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:rozdxma.drd*/
		drd?: number|null;
		/**DBCOLUMN:rozdxma.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rozdxma.den*/
		den?: number|null;
		/**DBCOLUMN:rozdxma.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.m0*/
		m0?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.m1*/
		m1?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:rozdxma.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:rozdxma.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rozdxma.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rozdxma.te0*/
		te0?: string|null;
		/**DBCOLUMN:rozdxma.te1*/
		te1?: string|null;
		/**DBCOLUMN:rozdxma.te2*/
		te2?: string|null;
		/**DBCOLUMN:rozdxma.te3*/
		te3?: string|null;
		/**DBCOLUMN:rozdxma.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uea*/
		uea?: string|null;
		/**DBCOLUMN:rozdxma.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:rozdxma.uec*/
		uec?: string|null;
		/**DBCOLUMN:rozdxma.ued*/
		ued?: string|null;
		/**DBCOLUMN:rozdxma.uee*/
		uee?: string|null;
		/**DBCOLUMN:rozdxma.uef*/
		uef?: string|null;
		/**DBCOLUMN:rozdxma.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:rozdxma.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:rozdxma.uei*/
		uei?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uej?: string|null;
		/**DBCOLUMN:rozdxma.popis*/
		popis?: string|null;
		/**DBCOLUMN:rozdxma.s_prep*/
		s_prep?: number|null;
		/**DBCOLUMN:rozdxma.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:rozdxma.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:rozdxma.s_odu*/
		s_odu?: number|null;
		/**DBCOLUMN:rozdxma.uus*/
		uus?: string|null;
		/**DBCOLUMN:rozdxma.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:rozdxma.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:rozdxma.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:rozdxma.uec_uc*/
		uec_uc?: string|null;
		/**DBCOLUMN:rozdxma.ued_uc*/
		ued_uc?: string|null;
		/**DBCOLUMN:rozdxma.uee_uc*/
		uee_uc?: string|null;
		/**DBCOLUMN:rozdxma.uef_uc*/
		uef_uc?: string|null;
		/**DBCOLUMN:rozdxma.ueg_uc*/
		ueg_uc?: string|null;
		/**DBCOLUMN:rozdxma.ueh_uc*/
		ueh_uc?: string|null;
		/**DBCOLUMN:rozdxma.uei_uc*/
		uei_uc?: string|null;
		/**DBCOLUMN:rozdxma.uej_uc*/
		uej_uc?: string|null;
		/**DBCOLUMN:rozdxma.te0_uc*/
		te0_uc?: string|null;
		/**DBCOLUMN:rozdxma.te1_uc*/
		te1_uc?: string|null;
		/**DBCOLUMN:rozdxma.te2_uc*/
		te2_uc?: string|null;
		/**DBCOLUMN:rozdxma.te3_uc*/
		te3_uc?: string|null;
		/**DBCOLUMN:rozdxma.te4_uc*/
		te4_uc?: string|null;
		/**DBCOLUMN:rozdxma.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:rozdxma.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:rozdxma.ixp_den_ag*/
		ixp_den_ag?: string|null;
		/**DBCOLUMN:rozdxma.radek_ag*/
		radek_ag?: number|null;
		/**DBCOLUMN:rozdxma.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:rozdxma.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:rozdxma.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:rozdxma.nks_uc*/
		nks_uc?: string|null;
		/**DBCOLUMN:rozdxma.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:rozdxma.radek_hdr*/
		radek_hdr?: number|null;
	}
	const enum GRozdxmaRozpisDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", m0 = "m0", m1 = "m1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", popis = "popis", s_prep = "s_prep", xuete = "xuete", dat_mpd = "dat_mpd", s_odu = "s_odu", uus = "uus", ixs_esu = "ixs_esu", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uec_uc = "uec_uc", ued_uc = "ued_uc", uee_uc = "uee_uc", uef_uc = "uef_uc", ueg_uc = "ueg_uc", ueh_uc = "ueh_uc", uei_uc = "uei_uc", uej_uc = "uej_uc", te0_uc = "te0_uc", te1_uc = "te1_uc", te2_uc = "te2_uc", te3_uc = "te3_uc", te4_uc = "te4_uc", priz_char = "priz_char", druh_char = "druh_char", ixp_den_ag = "ixp_den_ag", radek_ag = "radek_ag", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", nks_uc = "nks_uc", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr",}
	const enum GRozdxmaRozpisDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", m0 = "*", m1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", popis = "*", s_prep = "*", xuete = "*", dat_mpd = "*", s_odu = "*", uus = "*", ixs_esu = "*", uea_uc = "*", ueb_uc = "*", uec_uc = "*", ued_uc = "*", uee_uc = "*", uef_uc = "*", ueg_uc = "*", ueh_uc = "*", uei_uc = "*", uej_uc = "*", te0_uc = "*", te1_uc = "*", te2_uc = "*", te3_uc = "*", te4_uc = "*", priz_char = "*", druh_char = "*", ixp_den_ag = "*", radek_ag = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", nks_uc = "*", id_hdr_ris = "*", radek_hdr = "*",}
	const enum GRozdxmaRozpisDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", m0 = "JsonDecimal", m1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", popis = "string", s_prep = "number", xuete = "string", dat_mpd = "JsonDate", s_odu = "number", uus = "string", ixs_esu = "string", uea_uc = "string", ueb_uc = "string", uec_uc = "string", ued_uc = "string", uee_uc = "string", uef_uc = "string", ueg_uc = "string", ueh_uc = "string", uei_uc = "string", uej_uc = "string", te0_uc = "string", te1_uc = "string", te2_uc = "string", te3_uc = "string", te4_uc = "string", priz_char = "number", druh_char = "number", ixp_den_ag = "string", radek_ag = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", nks_uc = "string", id_hdr_ris = "string", radek_hdr = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rzd.Interface\Dto\GRozsrzdDto.d.ts 

declare namespace Gordic.Rzd.Interface {
	/**DBTABLE:rozsrzd*/
	interface GRozsrzdDto {
		/**DBCOLUMN:rozsrzd.ico*/
		ico?: string|null;
		/**DBCOLUMN:rozsrzd.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rozsrzd.nks*/
		nks?: string|null;
		/**DBCOLUMN:rozsrzd.rok*/
		rok?: number|null;
		/**DBCOLUMN:rozsrzd.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:rozsrzd.den*/
		den?: number|null;
		/**DBCOLUMN:rozsrzd.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:rozsrzd.uea*/
		uea?: string|null;
		/**DBCOLUMN:rozsrzd.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:rozsrzd.uec*/
		uec?: string|null;
		/**DBCOLUMN:rozsrzd.ued*/
		ued?: string|null;
		/**DBCOLUMN:rozsrzd.uee*/
		uee?: string|null;
		/**DBCOLUMN:rozsrzd.uef*/
		uef?: string|null;
		/**DBCOLUMN:rozsrzd.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:rozsrzd.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:rozsrzd.uei*/
		uei?: string|null;
		/**DBCOLUMN:rozsrzd.uej*/
		uej?: string|null;
		/**DBCOLUMN:rozsrzd.te0*/
		te0?: string|null;
		/**DBCOLUMN:rozsrzd.te1*/
		te1?: string|null;
		/**DBCOLUMN:rozsrzd.te2*/
		te2?: string|null;
		/**DBCOLUMN:rozsrzd.te3*/
		te3?: string|null;
		/**DBCOLUMN:rozsrzd.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozsrzd.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:rozsrzd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rozsrzd.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GRozsrzdDtoNames { ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", mesic = "mesic", den = "den", xuete = "xuete", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRozsrzdDtoFragments { ico = "*", ucs = "*", nks = "*", rok = "*", mesic = "*", den = "*", xuete = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", c = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRozsrzdDtoTypes { ico = "string", ucs = "string", nks = "string", rok = "number", mesic = "number", den = "number", xuete = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rzd.Interface\Dto\GRozsrzdSumaDto.d.ts 

declare namespace Gordic.Rzd.Interface {
	/**DBTABLE:rozsrzd*/
	interface GRozsrzdSumaDto {
		/**DBCOLUMN:rozsrzd.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:rozsrzd.mesic_txt*/
		mesic_txt?: string|null;
		/**DBCOLUMN:rozsrzd.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:rozsrzd.procento*/
		procento?: JsonDecimal|null;
		/**DBCOLUMN:rozsrzd.popis*/
		popis?: string|null;
	}
	const enum GRozsrzdSumaDtoNames { mesic = "mesic", mesic_txt = "mesic_txt", c = "c", procento = "procento", popis = "popis",}
	const enum GRozsrzdSumaDtoFragments { mesic = "*", mesic_txt = "*", c = "*", procento = "*", popis = "*",}
	const enum GRozsrzdSumaDtoTypes { mesic = "number", mesic_txt = "string", c = "JsonDecimal", procento = "JsonDecimal", popis = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rzd.Interface\Init\GRzdGlobalsBase.d.ts 

declare namespace Gordic.Rzd.Interface {
	/**Rezim provozu RZD*/
	const enum RezimProvozuEnum {
		/**režim provozu = Základní - vidím vše - default*/
		Zaklad=0,
	}
	/**Globální parametry pro Rzd. Načtené při startu aplikace*/
	interface GRzdGlobalsBase {
		/**Rezim provozu*/
		RezimProvozu?: Gordic.Rzd.Interface.RezimProvozuEnum|null;
		/**maska čísla plánu ve sloupci TE1*/
		cis_real?: string|null;
		/**maska čísla plánu ve sloupci TE1*/
		te1_msk?: string|null;
		/**příznak, že maska TE1_MSK odpovídá plné délce TE1 - číslo plánu = TE1*/
		b_te1_msk_full?: boolean|null;
		/**start masky čísla plánu v TE1*/
		te1_msk_start?: number|null;
		/**konec masky čísla plánu v TE1*/
		te1_msk_stop?: number|null;
		/**rok sběru*/
		rok_srv?: number|null;
	}
	const enum GRzdGlobalsBaseNames { RezimProvozu = "RezimProvozu", cis_real = "cis_real", te1_msk = "te1_msk", b_te1_msk_full = "b_te1_msk_full", te1_msk_start = "te1_msk_start", te1_msk_stop = "te1_msk_stop", rok_srv = "rok_srv",}
	const enum GRzdGlobalsBaseFragments { RezimProvozu = "*", cis_real = "*", te1_msk = "*", b_te1_msk_full = "*", te1_msk_start = "*", te1_msk_stop = "*", rok_srv = "*",}
	const enum GRzdGlobalsBaseTypes { RezimProvozu = "Gordic.Rzd.Interface.RezimProvozuEnum", cis_real = "string", te1_msk = "string", b_te1_msk_full = "boolean", te1_msk_start = "number", te1_msk_stop = "number", rok_srv = "number",}
}

//#endregion

