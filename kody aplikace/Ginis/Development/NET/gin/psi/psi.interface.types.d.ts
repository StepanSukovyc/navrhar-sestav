/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       psi.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Psi.Interface\Gordic.Psi.Interface.csproj
*    created     2026-02-16 14:35:22
*    files       Dataset\Gordic.Psi.Interface.DdpdlsvDto.d.ts
*                Dataset\Gordic.Psi.Interface.DdpdszbDto.d.ts
*                Dataset\Gordic.Psi.Interface.DdpsslvDto.d.ts
*                Dataset\Gordic.Psi.Interface.DdpsszbDto.d.ts
*                Dataset\Gordic.Psi.Interface.DdpvltpDto.d.ts
*                Dataset\Gordic.Psi.Interface.DdpvstpDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsicbarDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsicdchDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsicphlDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsicplmDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsidpesDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsilvsaDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsilvslDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsilvypDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsiSeznamPripaduDdpDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsispesDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsiszeuDto.d.ts
*                Dataset\Gordic.Psi.Interface.PsivpidDto.d.ts
*                Dataset\Gordic.Psi.Interface.SeznamObdMajitele.Dto.d.ts
*                Dataset\Gordic.Psi.Interface.SeznamPsuDto.d.ts
*                Dataset\Gordic.Psi.Interface.SeznamSazebPsaDto.d.ts
*                Dataset\Gordic.Psi.Interface.SeznamSlevPsaDto.d.ts
*                ISL\IGPripadPsi.d.ts
*                ISL\IGSeznamPsu.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.DdpdlsvDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface DdpdlsvDto  {
        /**DBCOLUMN:Ddpdlsv.ixs_slv*/
        ixs_slv?: string|null;
        /**DBCOLUMN:Ddpdlsv.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Ddpdlsv.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Ddpdlsv.prav_predpis*/
        prav_predpis?: string|null;
        /**DBCOLUMN:Ddpdlsv.proc_sleva*/
        proc_sleva?: Decimal|null;
        /**DBCOLUMN:Ddpdlsv.c_sleva*/
        c_sleva?: Decimal|null;
        /**DBCOLUMN:Ddpdlsv.c_sleva_max*/
        c_sleva_max?: Decimal|null;
        /**DBCOLUMN:Ddpdlsv.mena*/
        mena?: number|null;
        /**DBCOLUMN:Ddpdlsv.c_sleva_mena*/
        c_sleva_mena?: Decimal|null;
        /**DBCOLUMN:Ddpdlsv.c_sleva_max_mena*/
        c_sleva_max_mena?: Decimal|null;
        /**DBCOLUMN:Ddpdlsv.pocet_roku_max*/
        pocet_roku_max?: number|null;
        /**DBCOLUMN:Ddpdlsv.pocet_mes_max*/
        pocet_mes_max?: number|null;
        /**DBCOLUMN:Ddpdlsv.priz_psk*/
        priz_psk?: number|null;
        /**DBCOLUMN:Ddpdlsv.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Ddpdlsv.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Ddpdlsv.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Ddpdlsv.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.DdpdszbDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface DdpdszbDto  {
        /**DBCOLUMN:Ddpdszb.ixs_saz*/
        ixs_saz?: string|null;
        /**DBCOLUMN:Ddpdszb.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Ddpdszb.pocet_od*/
        pocet_od?: number|null;
        /**DBCOLUMN:Ddpdszb.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Ddpdszb.prav_predpis*/
        prav_predpis?: string|null;
        /**DBCOLUMN:Ddpdszb.c_saz*/
        c_saz?: Decimal|null;
        /**DBCOLUMN:Ddpdszb.mena*/
        mena?: number|null;
        /**DBCOLUMN:Ddpdszb.c_saz_mena*/
        c_saz_mena?: Decimal|null;
        /**DBCOLUMN:Ddpdszb.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Ddpdszb.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Ddpdszb.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Ddpdszb.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.DdpsslvDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface DdpsslvDto  {
        /**DBCOLUMN:Ddpsslv.ixs_slv*/
        ixs_slv?: string|null;
        /**DBCOLUMN:Ddpsslv.typ_slv*/
        typ_slv?: number|null;
        /**DBCOLUMN:Ddpsslv.typ_slv_txt*/
        typ_slv_txt?: string|null;
        /**DBCOLUMN:Ddpsslv.druh_slv*/
        druh_slv?: number|null;
        /**DBCOLUMN:Ddpsslv.druh_slv_txt*/
        druh_slv_txt?: string|null;
        /**DBCOLUMN:Ddpsslv.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Ddpsslv.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Ddpsslv.nazev_slv*/
        nazev_slv?: string|null;
        /**DBCOLUMN:Ddpsslv.prav_predpis*/
        prav_predpis?: string|null;
        /**DBCOLUMN:Ddpsslv.priz_alikvot*/
        priz_alikvot?: number|null;
        /**DBCOLUMN:Ddpsslv.priz_psk*/
        priz_psk?: number|null;
        /**DBCOLUMN:Ddpsslv.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Ddpsslv.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Ddpsslv.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Ddpsslv.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Ddpsslv.typ_evid*/
        typ_evid?: number|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.DdpsszbDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface DdpsszbDto  {
        /**DBCOLUMN:Ddpsszb.ixs_saz*/
        ixs_saz?: string|null;
        /**DBCOLUMN:Ddpsszb.typ_saz*/
        typ_saz?: number|null;
        /**DBCOLUMN:Ddpsszb.typ_saz_txt*/
        typ_saz_txt?: string|null;
        /**DBCOLUMN:Ddpsszb.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Ddpsszb.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Ddpsszb.nazev_saz*/
        nazev_saz?: string|null;
        /**DBCOLUMN:Ddpsszb.prav_predpis*/
        prav_predpis?: string|null;
        /**DBCOLUMN:Ddpsszb.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Ddpsszb.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Ddpsszb.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Ddpsszb.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Ddpsszb.typ_evid*/
        typ_evid?: number|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.DdpvltpDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface DdpvltpDto  {
        /**DBCOLUMN:Ddpvltp.ixs_slv*/
        ixs_slv?: string|null;
        /**DBCOLUMN:Ddpvltp.typ_phl*/
        typ_phl?: string|null;
        /**DBCOLUMN:Ddpvltp.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Ddpvltp.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Ddpvltp.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Ddpvltp.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Ddpvltp.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Ddpvltp.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Ddpvltp.nazev*/
        nazev?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.DdpvstpDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface DdpvstpDto  {
        /**DBCOLUMN:Ddpvstp.ixs_saz*/
        ixs_saz?: string|null;
        /**DBCOLUMN:Ddpvstp.typ_phl*/
        typ_phl?: string|null;
        /**DBCOLUMN:Ddpvstp.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Ddpvstp.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Ddpvstp.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Ddpvstp.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Ddpvstp.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Ddpvstp.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Ddpvstp.nazev*/
        nazev?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsicbarDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsicbarDto  {
        /**DBCOLUMN:Psicbar.zbarveni*/
        zbarveni?: number|null;
        /**DBCOLUMN:Psicbar.zbarveni_txt*/
        zbarveni_txt?: string|null;
        /**DBCOLUMN:Psicbar.k_v*/
        k_v?: number|null;
        /**DBCOLUMN:Psicbar.k_s*/
        k_s?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsicdchDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsicdchDto  {
        /**DBCOLUMN:Psicdch.druh_duch*/
        druh_duch?: number|null;
        /**DBCOLUMN:Psicdch.druh_duch_txt*/
        druh_duch_txt?: string|null;
        /**DBCOLUMN:Psicdch.k_v*/
        k_v?: number|null;
        /**DBCOLUMN:Psicdch.k_s*/
        k_s?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsicphlDto.d.ts 

declare namespace Gordic.Psi.Interface {
	/**DBTABLE:Psicphl*/
	interface PsicphlDto {
		/**DBCOLUMN:Psicphl.pohlavi*/
		pohlavi?: number|null;
		/**DBCOLUMN:Psicphl.pohlavi_txt*/
		pohlavi_txt?: string|null;
		/**DBCOLUMN:Psicphl.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Psicphl.k_s*/
		k_s?: string|null;
	}
	const enum PsicphlDtoNames { pohlavi = "pohlavi", pohlavi_txt = "pohlavi_txt", k_v = "k_v", k_s = "k_s",}
	const enum PsicphlDtoFragments { pohlavi = "*", pohlavi_txt = "*", k_v = "*", k_s = "*",}
	const enum PsicphlDtoTypes { pohlavi = "number", pohlavi_txt = "string", k_v = "number", k_s = "string",}
	const enum PsicphlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsicplmDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsicplmDto  {
        /**DBCOLUMN:Psicplm.plemeno*/
        plemeno?: number|null;
        /**DBCOLUMN:Psicplm.plemeno_txt*/
        plemeno_txt?: string|null;
        /**DBCOLUMN:Psicplm.k_v*/
        k_v?: number|null;
        /**DBCOLUMN:Psicplm.k_s*/
        k_s?: string|null;
        /**DBCOLUMN:Psicplm.nazev_orig*/
        nazev_orig?: string|null;
        /**DBCOLUMN:Psicplm.zkratka*/
        zkratka?: string|null;
        /**DBCOLUMN:Psicplm.cis_stand*/
        cis_stand?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsidpesDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsidpesDto  {
        /**DBCOLUMN:Psidpes.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:Psidpes.dat_plat_od*/
        dat_plat_od?: Date|null;
        /**DBCOLUMN:Psidpes.jmeno*/
        jmeno?: string|null;
        /**DBCOLUMN:Psidpes.popis*/
        popis?: string|null;
        /**DBCOLUMN:Psidpes.znamka*/
        znamka?: string|null;
        /**DBCOLUMN:Psidpes.znamka_od*/
        znamka_od?: Date|null;
        /**DBCOLUMN:Psidpes.tetovani*/
        tetovani?: string|null;
        /**DBCOLUMN:Psidpes.tetovani_od*/
        tetovani_od?: Date|null;
        /**DBCOLUMN:Psidpes.cip*/
        cip?: string|null;
        /**DBCOLUMN:Psidpes.dat_cip_od*/
        dat_cip_od?: Date|null;
        /**DBCOLUMN:Psidpes.cip_iso*/
        cip_iso?: string|null;
        /**DBCOLUMN:Psidpes.dat_cip_iso_od*/
        dat_cip_iso_od?: Date|null;
        /**DBCOLUMN:Psidpes.pet_pas*/
        pet_pas?: string|null;
        /**DBCOLUMN:Psidpes.dat_pet_pas_od*/
        dat_pet_pas_od?: Date|null;
        /**DBCOLUMN:Psidpes.dat_ockovani*/
        dat_ockovani?: Date|null;
        /**DBCOLUMN:Psidpes.oznaceni_ost*/
        oznaceni_ost?: string|null;
        /**DBCOLUMN:Psidpes.zvl_znameni*/
        zvl_znameni?: string|null;
        /**DBCOLUMN:Psidpes.dat_utulek_od*/
        dat_utulek_od?: Date|null;
        /**DBCOLUMN:Psidpes.dat_utulek_do*/
        dat_utulek_do?: Date|null;
        /**DBCOLUMN:Psidpes.ev_cis_utulek*/
        ev_cis_utulek?: string|null;
        /**DBCOLUMN:Psidpes.psc*/
        psc?: string|null;
        /**DBCOLUMN:Psidpes.obec*/
        obec?: string|null;
        /**DBCOLUMN:Psidpes.cast_obce*/
        cast_obce?: string|null;
        /**DBCOLUMN:Psidpes.ulice*/
        ulice?: string|null;
        /**DBCOLUMN:Psidpes.cor*/
        cor?: string|null;
        /**DBCOLUMN:Psidpes.cpop*/
        cpop?: string|null;
        /**DBCOLUMN:Psidpes.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psidpes.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psidpes.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psidpes.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Psidpes.ixs_esu_chov*/
        ixs_esu_chov?: string|null;
        /**DBCOLUMN:Psidpes.esu_txt_chov*/
        esu_txt_chov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsilvsaDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsilvsaDto  {
        /**DBCOLUMN:Psilvsa.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:Psilvsa.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:Psilvsa.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Psilvsa.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Psilvsa.poradi*/
        poradi?: number|null;
        /**DBCOLUMN:Psilvsa.ixs_saz*/
        ixs_saz?: string|null;
        /**DBCOLUMN:Psilvsa.nazev_saz*/
        nazev_saz?: string|null;
        /**DBCOLUMN:Psilvsa.poradi_saz*/
        poradi_saz?: number|null;
        /**DBCOLUMN:Psilvsa.c_saz*/
        c_saz?: Decimal|null;
        /**DBCOLUMN:Psilvsa.mena*/
        mena?: number|null;
        /**DBCOLUMN:Psilvsa.c_saz_mena*/
        c_saz_mena?: Decimal|null;
        /**DBCOLUMN:Psilvsa.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psilvsa.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psilvsa.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psilvsa.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsilvslDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsilvslDto  {
        /**DBCOLUMN:Psilvsl.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:Psilvsl.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:Psilvsl.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Psilvsl.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Psilvsl.poradi*/
        poradi?: number|null;
        /**DBCOLUMN:Psilvsl.ixs_slv*/
        ixs_slv?: string|null;
        /**DBCOLUMN:Psilvsl.nazev_slv*/
        nazev_slv?: string|null;
        /**DBCOLUMN:Psilvsl.poradi_slv*/
        poradi_slv?: number|null;
        /**DBCOLUMN:Psilvsl.c_slv*/
        c_slv?: Decimal|null;
        /**DBCOLUMN:Psilvsl.mena*/
        mena?: number|null;
        /**DBCOLUMN:Psilvsl.c_slv_mena*/
        c_slv_mena?: Decimal|null;
        /**DBCOLUMN:Psilvsl.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psilvsl.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psilvsl.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psilvsl.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsilvypDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsilvypDto  {
        /**DBCOLUMN:Psilvyp.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:Psilvyp.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:Psilvyp.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:Psilvyp.poradi*/
        poradi?: number|null;
        /**DBCOLUMN:Psilvyp.c_celk*/
        c_celk?: Decimal|null;
        /**DBCOLUMN:Psilvyp.mena*/
        mena?: number|null;
        /**DBCOLUMN:Psilvyp.c_celk_mena*/
        c_celk_mena?: Decimal|null;
        /**DBCOLUMN:Psilvyp.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psilvyp.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psilvyp.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psilvyp.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsiSeznamPripaduDdpDto.d.ts 

declare namespace Gordic.Psi.Interface {
	/**DBTABLE:PsiSeznamPripaduDdp*/
	interface PsiSeznamPripaduDdpDto {
		/**DBCOLUMN:PsiSeznamPripaduDdp.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.rc*/
		rc?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.vs*/
		vs?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ac*/
		ac?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.stav_vym_txt*/
		stav_vym_txt?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.popis*/
		popis?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ico*/
		ico?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ss*/
		ss?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ks*/
		ks?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.c_poc_stav*/
		c_poc_stav?: JsonDecimal|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.c_stav_poriz*/
		c_stav_poriz?: JsonDecimal|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.poc_splatek*/
		poc_splatek?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_poc_stav*/
		dat_poc_stav?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_stav_poriz*/
		dat_stav_poriz?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_nar*/
		dat_nar?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.typ_esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ob_jmeno*/
		ob_jmeno?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.cpop*/
		cpop?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.cor*/
		cor?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.obec*/
		obec?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.psc*/
		psc?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text0*/
		text0?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text1*/
		text1?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text2*/
		text2?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text3*/
		text3?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text4*/
		text4?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text5*/
		text5?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text6*/
		text6?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text7*/
		text7?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text8*/
		text8?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.text9*/
		text9?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.stav_dist*/
		stav_dist?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.s_sgn*/
		s_sgn?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.pes_pocet_psu*/
		pes_pocet_psu?: JsonDecimal|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.c_predepsano*/
		c_predepsano?: JsonDecimal|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.c_vypocteno*/
		c_vypocteno?: JsonDecimal|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.stav_insolvence*/
		stav_insolvence?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.priz_umrti*/
		priz_umrti?: number|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.dat_umrti*/
		dat_umrti?: JsonDate|null;
		/**DBCOLUMN:PsiSeznamPripaduDdp.ixp_spis_prir*/
		ixp_spis_prir?: string|null;
	}
	const enum PsiSeznamPripaduDdpDtoNames { ixs_esu = "ixs_esu", rc = "rc", vs = "vs", esu_txt = "esu_txt", nazev = "nazev", typ_phl = "typ_phl", c_celk = "c_celk", ac = "ac", ixp = "ixp", dat_evid = "dat_evid", dat_vyst = "dat_vyst", dat_zmena = "dat_zmena", stav_vym_txt = "stav_vym_txt", popis = "popis", aktivita = "aktivita", eko_akt = "eko_akt", ico = "ico", ss = "ss", ks = "ks", bu_vl = "bu_vl", sk_vl = "sk_vl", c_poc_stav = "c_poc_stav", c_stav_poriz = "c_stav_poriz", poc_splatek = "poc_splatek", dat_poc_stav = "dat_poc_stav", dat_stav_poriz = "dat_stav_poriz", dat_nar = "dat_nar", typ_esu = "typ_esu", ob_jmeno = "ob_jmeno", jmeno = "jmeno", prijmeni = "prijmeni", ulice = "ulice", cpop = "cpop", cor = "cor", cast_obce = "cast_obce", obec = "obec", psc = "psc", text0 = "text0", text1 = "text1", text2 = "text2", text3 = "text3", text4 = "text4", text5 = "text5", text6 = "text6", text7 = "text7", text8 = "text8", text9 = "text9", ixp_den = "ixp_den", ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", stav_dist = "stav_dist", s_fyz = "s_fyz", s_ele = "s_ele", s_sgn = "s_sgn", priz_spis = "priz_spis", typ_ag = "typ_ag", pes_pocet_psu = "pes_pocet_psu", priz_vyp = "priz_vyp", c_predepsano = "c_predepsano", c_vypocteno = "c_vypocteno", stav_insolvence = "stav_insolvence", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixp_spis_prir = "ixp_spis_prir",}
	const enum PsiSeznamPripaduDdpDtoFragments { ixs_esu = "*", rc = "*", vs = "*", esu_txt = "*", nazev = "*", typ_phl = "*", c_celk = "*", ac = "*", ixp = "*", dat_evid = "*", dat_vyst = "*", dat_zmena = "*", stav_vym_txt = "*", popis = "*", aktivita = "*", eko_akt = "*", ico = "*", ss = "*", ks = "*", bu_vl = "*", sk_vl = "*", c_poc_stav = "*", c_stav_poriz = "*", poc_splatek = "*", dat_poc_stav = "*", dat_stav_poriz = "*", dat_nar = "*", typ_esu = "*", ob_jmeno = "*", jmeno = "*", prijmeni = "*", ulice = "*", cpop = "*", cor = "*", cast_obce = "*", obec = "*", psc = "*", text0 = "*", text1 = "*", text2 = "*", text3 = "*", text4 = "*", text5 = "*", text6 = "*", text7 = "*", text8 = "*", text9 = "*", ixp_den = "*", ixs_fun = "*", nazev_rf = "*", stav_dist = "*", s_fyz = "*", s_ele = "*", s_sgn = "*", priz_spis = "*", typ_ag = "*", pes_pocet_psu = "*", priz_vyp = "*", c_predepsano = "*", c_vypocteno = "*", stav_insolvence = "*", priz_umrti = "*", dat_umrti = "*", ixp_spis_prir = "*",}
	const enum PsiSeznamPripaduDdpDtoTypes { ixs_esu = "string", rc = "string", vs = "string", esu_txt = "string", nazev = "string", typ_phl = "string", c_celk = "JsonDecimal", ac = "string", ixp = "string", dat_evid = "JsonDate", dat_vyst = "JsonDate", dat_zmena = "JsonDate", stav_vym_txt = "string", popis = "string", aktivita = "number", eko_akt = "number", ico = "string", ss = "string", ks = "string", bu_vl = "string", sk_vl = "string", c_poc_stav = "JsonDecimal", c_stav_poriz = "JsonDecimal", poc_splatek = "number", dat_poc_stav = "JsonDate", dat_stav_poriz = "JsonDate", dat_nar = "JsonDate", typ_esu = "number", ob_jmeno = "string", jmeno = "string", prijmeni = "string", ulice = "string", cpop = "string", cor = "string", cast_obce = "string", obec = "string", psc = "string", text0 = "string", text1 = "string", text2 = "string", text3 = "string", text4 = "string", text5 = "string", text6 = "string", text7 = "string", text8 = "string", text9 = "string", ixp_den = "string", ixs_fun = "string", nazev_rf = "string", stav_dist = "number", s_fyz = "number", s_ele = "number", s_sgn = "number", priz_spis = "number", typ_ag = "number", pes_pocet_psu = "JsonDecimal", priz_vyp = "number", c_predepsano = "JsonDecimal", c_vypocteno = "JsonDecimal", stav_insolvence = "number", priz_umrti = "number", dat_umrti = "JsonDate", ixp_spis_prir = "string",}
	const enum PsiSeznamPripaduDdpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsispesDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsispesDto  {
        /**DBCOLUMN:Psispes.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:Psispes.pohlavi*/
        pohlavi?: number|null;
        /**DBCOLUMN:Psispes.plemeno*/
        plemeno?: number|null;
        /**DBCOLUMN:Psispes.uz_plemeno_txt*/
        uz_plemeno_txt?: string|null;
        /**DBCOLUMN:Psispes.zbarveni*/
        zbarveni?: string|null;
        /**DBCOLUMN:Psispes.dat_evid_od*/
        dat_evid_od?: Date|null;
        /**DBCOLUMN:Psispes.dat_evid_do*/
        dat_evid_do?: Date|null;
        /**DBCOLUMN:Psispes.dat_nar_psa*/
        dat_nar_psa?: Date|null;
        /**DBCOLUMN:Psispes.dat_uhyn*/
        dat_uhyn?: Date|null;
        /**DBCOLUMN:Psispes.stari_rok*/
        stari_rok?: number|null;
        /**DBCOLUMN:Psispes.stari_mesic*/
        stari_mesic?: number|null;
        /**DBCOLUMN:Psispes.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psispes.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psispes.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psispes.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Psispes.ixb*/
        ixb?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsiszeuDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsiszeuDto  {
        /**DBCOLUMN:Psiszeu.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:Psiszeu.priz_zeu*/
        priz_zeu?: number|null;
        /**DBCOLUMN:Psiszeu.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psiszeu.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psiszeu.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psiszeu.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.PsivpidDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface PsivpidDto  {
        /**DBCOLUMN:Psivpid.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:Psivpid.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:Psivpid.dat_popl_od*/
        dat_popl_od?: Date|null;
        /**DBCOLUMN:Psivpid.dat_popl_do*/
        dat_popl_do?: Date|null;
        /**DBCOLUMN:Psivpid.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:Psivpid.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Psivpid.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:Psivpid.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.SeznamObdMajitele.Dto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface SeznamObdMajiteleDto  {
        /**DBCOLUMN:SeznamObdMajitele.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:SeznamObdMajitele.ixp_ext*/
        ixp_ext?: string|null;
        /**DBCOLUMN:SeznamObdMajitele.por_cislo*/
        por_cislo?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:SeznamObdMajitele.priz_rd*/
        priz_rd?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.druh_duch*/
        druh_duch?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.druh_duch_txt*/
        druh_duch_txt?: string|null;
        /**DBCOLUMN:SeznamObdMajitele.dat_duchod_od*/
        dat_duchod_od?: Date|null;
        /**DBCOLUMN:SeznamObdMajitele.priz_spol_dom*/
        priz_spol_dom?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.priz_prijem*/
        priz_prijem?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.priz_uplat*/
        priz_uplat?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:SeznamObdMajitele.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:SeznamObdMajitele.aktivita_txt*/
        aktivita_txt?: string|null;
        /**DBCOLUMN:SeznamObdMajitele.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:SeznamObdMajitele.zmenu_prov*/
        zmenu_prov?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.SeznamPsuDto.d.ts 

declare namespace Gordic.Psi.Interface {
    /**DBTABLE:SeznamPsu*/
	interface SeznamPsuDto {
        /**DBCOLUMN:SeznamPsu.ixs_esu_zobr*/
		ixs_esu_zobr?: string|null;
        /**DBCOLUMN:SeznamPsu.esu_txt_zobr*/
		esu_txt_zobr?: string|null;
        /**DBCOLUMN:SeznamPsu.ixp*/
		ixp?: string|null;
        /**DBCOLUMN:SeznamPsu.ixs_pes*/
		ixs_pes?: string|null;
        /**DBCOLUMN:SeznamPsu.pohlavi_txt*/
		pohlavi_txt?: string|null;
        /**DBCOLUMN:SeznamPsu.plemeno_txt*/
		plemeno_txt?: string|null;
        /**DBCOLUMN:SeznamPsu.uz_plemeno_txt*/
		uz_plemeno_txt?: string|null;
        /**DBCOLUMN:SeznamPsu.zbarveni_txt*/
		zbarveni_txt?: string|null;
        /**DBCOLUMN:SeznamPsu.dat_evid_od*/
		dat_evid_od?: JsonDate|null;
        /**DBCOLUMN:SeznamPsu.dat_evid_do*/
		dat_evid_do?: JsonDate|null;
        /**DBCOLUMN:SeznamPsu.jmeno*/
		jmeno?: string|null;
        /**DBCOLUMN:SeznamPsu.popis*/
		popis?: string|null;
        /**DBCOLUMN:SeznamPsu.znamka*/
		znamka?: string|null;
        /**DBCOLUMN:SeznamPsu.tetovani*/
		tetovani?: string|null;
        /**DBCOLUMN:SeznamPsu.cip*/
		cip?: string|null;
        /**DBCOLUMN:SeznamPsu.cip_iso*/
		cip_iso?: string|null;
        /**DBCOLUMN:SeznamPsu.pet_pas*/
		pet_pas?: string|null;
        /**DBCOLUMN:SeznamPsu.dat_popl_od*/
		dat_popl_od?: JsonDate|null;
        /**DBCOLUMN:SeznamPsu.dat_popl_do*/
		dat_popl_do?: JsonDate|null;
        /**DBCOLUMN:SeznamPsu.nazev_saz*/
		nazev_saz?: string|null;
        /**DBCOLUMN:SeznamPsu.nazev_slv*/
		nazev_slv?: string|null;
        /**DBCOLUMN:SeznamPsu.aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:SeznamPsu.aktivita_vpid*/
		aktivita_vpid?: number|null;
        /**DBCOLUMN:SeznamPsu.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
        /**DBCOLUMN:SeznamPsu.ixp_ext*/
		ixp_ext?: string|null;
        /**DBCOLUMN:SeznamPsu.por_cislo*/
		por_cislo?: number|null;
        /**DBCOLUMN:SeznamPsu.pes_por_cislo*/
		pes_por_cislo?: number|null;
        /**DBCOLUMN:SeznamPsu.poznamka_popl*/
		poznamka_popl?: string|null;
        /**DBCOLUMN:SeznamPsu.poznamka_pes*/
		poznamka_pes?: string|null;
        /**DBCOLUMN:SeznamPsu.chov_ixs_esu*/
		chov_ixs_esu?: string|null;
        /**DBCOLUMN:SeznamPsu.maj_ixs_esu*/
		maj_ixs_esu?: string|null;
        /**DBCOLUMN:SeznamPsu.maj_dat_nar*/
		maj_dat_nar?: JsonDate|null;
        /**DBCOLUMN:SeznamPsu.chov_dat_nar*/
		chov_dat_nar?: JsonDate|null;
	}
	const enum SeznamPsuDtoNames { ixs_esu_zobr = "ixs_esu_zobr", esu_txt_zobr = "esu_txt_zobr", ixp = "ixp", ixs_pes = "ixs_pes", pohlavi_txt = "pohlavi_txt", plemeno_txt = "plemeno_txt", uz_plemeno_txt = "uz_plemeno_txt", zbarveni_txt = "zbarveni_txt", dat_evid_od = "dat_evid_od", dat_evid_do = "dat_evid_do", jmeno = "jmeno", popis = "popis", znamka = "znamka", tetovani = "tetovani", cip = "cip", cip_iso = "cip_iso", pet_pas = "pet_pas", dat_popl_od = "dat_popl_od", dat_popl_do = "dat_popl_do", nazev_saz = "nazev_saz", nazev_slv = "nazev_slv", aktivita = "aktivita", aktivita_vpid = "aktivita_vpid", ixs_fun_akt = "ixs_fun_akt", ixp_ext = "ixp_ext", por_cislo = "por_cislo", pes_por_cislo = "pes_por_cislo", poznamka_popl = "poznamka_popl", poznamka_pes = "poznamka_pes", chov_ixs_esu = "chov_ixs_esu", maj_ixs_esu = "maj_ixs_esu", maj_dat_nar = "maj_dat_nar", chov_dat_nar = "chov_dat_nar",}
	const enum SeznamPsuDtoFragments { ixs_esu_zobr = "*", esu_txt_zobr = "*", ixp = "*", ixs_pes = "*", pohlavi_txt = "*", plemeno_txt = "*", uz_plemeno_txt = "*", zbarveni_txt = "*", dat_evid_od = "*", dat_evid_do = "*", jmeno = "*", popis = "*", znamka = "*", tetovani = "*", cip = "*", cip_iso = "*", pet_pas = "*", dat_popl_od = "*", dat_popl_do = "*", nazev_saz = "*", nazev_slv = "*", aktivita = "*", aktivita_vpid = "*", ixs_fun_akt = "*", ixp_ext = "*", por_cislo = "*", pes_por_cislo = "*", poznamka_popl = "*", poznamka_pes = "*", chov_ixs_esu = "*", maj_ixs_esu = "*", maj_dat_nar = "*", chov_dat_nar = "*",}
	const enum SeznamPsuDtoTypes { ixs_esu_zobr = "string", esu_txt_zobr = "string", ixp = "string", ixs_pes = "string", pohlavi_txt = "string", plemeno_txt = "string", uz_plemeno_txt = "string", zbarveni_txt = "string", dat_evid_od = "JsonDate", dat_evid_do = "JsonDate", jmeno = "string", popis = "string", znamka = "string", tetovani = "string", cip = "string", cip_iso = "string", pet_pas = "string", dat_popl_od = "JsonDate", dat_popl_do = "JsonDate", nazev_saz = "string", nazev_slv = "string", aktivita = "number", aktivita_vpid = "number", ixs_fun_akt = "string", ixp_ext = "string", por_cislo = "number", pes_por_cislo = "number", poznamka_popl = "string", poznamka_pes = "string", chov_ixs_esu = "string", maj_ixs_esu = "string", maj_dat_nar = "JsonDate", chov_dat_nar = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.SeznamSazebPsaDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface SeznamSazebPsaDto  {
        /**DBCOLUMN:SeznamSazebPsa.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.ixs_saz*/
        ixs_saz?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.poradi*/
        poradi?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:SeznamSazebPsa.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:SeznamSazebPsa.c_saz*/
        c_saz?: Decimal|null;
        /**DBCOLUMN:SeznamSazebPsa.mena*/
        mena?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.c_saz_mena*/
        c_saz_mena?: Decimal|null;
        /**DBCOLUMN:SeznamSazebPsa.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.aktivita_txt*/
        aktivita_txt?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:SeznamSazebPsa.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.typ_saz*/
        typ_saz?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.dat_od1*/
        dat_od1?: Date|null;
        /**DBCOLUMN:SeznamSazebPsa.dat_do1*/
        dat_do1?: Date|null;
        /**DBCOLUMN:SeznamSazebPsa.nazev_saz*/
        nazev_saz?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.prav_predpis*/
        prav_predpis?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.poznamka1*/
        poznamka1?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.aktivita1*/
        aktivita1?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.dat_zmena1*/
        dat_zmena1?: Date|null;
        /**DBCOLUMN:SeznamSazebPsa.zmenu_prov1*/
        zmenu_prov1?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.typ_saz1*/
        typ_saz1?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.typ_saz_txt*/
        typ_saz_txt?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.ixp_ext*/
        ixp_ext?: string|null;
        /**DBCOLUMN:SeznamSazebPsa.por_cislo*/
        por_cislo?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.pes_por_cislo*/
        pes_por_cislo?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.saz_por_cislo*/
        saz_por_cislo?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.typ_poz*/
        typ_poz?: number|null;
        /**DBCOLUMN:SeznamSazebPsa.typ_poz_txt*/
        typ_poz_txt?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\Dataset\Gordic.Psi.Interface.SeznamSlevPsaDto.d.ts 

declare namespace Gordic.Psi.Interface {
    interface SeznamSlevPsaDto  {
        /**DBCOLUMN:SeznamSlevPsa.ixp*/
        ixp?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.ixs_pes*/
        ixs_pes?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.ixs_slv*/
        ixs_slv?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.poradi*/
        poradi?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.dat_od*/
        dat_od?: Date|null;
        /**DBCOLUMN:SeznamSlevPsa.dat_do*/
        dat_do?: Date|null;
        /**DBCOLUMN:SeznamSlevPsa.c_sleva*/
        c_sleva?: Decimal|null;
        /**DBCOLUMN:SeznamSlevPsa.mena*/
        mena?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.c_sleva_mena*/
        c_sleva_mena?: Decimal|null;
        /**DBCOLUMN:SeznamSlevPsa.proc_sleva*/
        proc_sleva?: Decimal|null;
        /**DBCOLUMN:SeznamSlevPsa.poznamka*/
        poznamka?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.aktivita_txt*/
        aktivita_txt?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.dat_zmena*/
        dat_zmena?: Date|null;
        /**DBCOLUMN:SeznamSlevPsa.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.druh_slv*/
        druh_slv?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.typ_slv*/
        typ_slv?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.priz_psk*/
        priz_psk?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.dat_od1*/
        dat_od1?: Date|null;
        /**DBCOLUMN:SeznamSlevPsa.dat_do1*/
        dat_do1?: Date|null;
        /**DBCOLUMN:SeznamSlevPsa.nazev_slv*/
        nazev_slv?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.prav_predpis*/
        prav_predpis?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.priz_alikvot*/
        priz_alikvot?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.poznamka1*/
        poznamka1?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.aktivita1*/
        aktivita1?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.dat_zmena1*/
        dat_zmena1?: Date|null;
        /**DBCOLUMN:SeznamSlevPsa.zmenu_prov1*/
        zmenu_prov1?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.typ_slv1*/
        typ_slv1?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.typ_slv_txt*/
        typ_slv_txt?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.druh_slv1*/
        druh_slv1?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.druh_slv_txt*/
        druh_slv_txt?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.ixp_ext*/
        ixp_ext?: string|null;
        /**DBCOLUMN:SeznamSlevPsa.por_cislo*/
        por_cislo?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.pes_por_cislo*/
        pes_por_cislo?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.slv_por_cislo*/
        slv_por_cislo?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.typ_poz*/
        typ_poz?: number|null;
        /**DBCOLUMN:SeznamSlevPsa.typ_poz_txt*/
        typ_poz_txt?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\ISL\IGPripadPsi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Případ nahlížení na spis
	* @domain Psi
	* @businessObject PripadPsa
	*/
	interface PripadPsa {
		/**Detail*/
		read(rq?:Gordic.Psi.Interface.PsiSeznamPripaduDdpDto|CallParams<GServiceReadRequest<Gordic.Psi.Interface.PsiSeznamPripaduDdpDto>>): _Task<GServiceReadRequest<Gordic.Psi.Interface.PsiSeznamPripaduDdpDto>,GServiceReadResponse<Gordic.Psi.Interface.PsiSeznamPripaduDdpDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Psi.Interface.PsiSeznamPripaduDdpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PripadPsa: ServiceBase & Catalog.PripadPsa;
	}
	const PripadPsa: Client["PripadPsa"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psi.Interface\ISL\IGSeznamPsu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Seznam psů
	* @domain Psi
	* @businessObject SeznamPsu
	*/
	interface SeznamPsu {
		/**Read*/
		read(rq?:Gordic.Psi.Interface.SeznamPsuDto|CallParams<GServiceReadRequest<Gordic.Psi.Interface.SeznamPsuDto>>): _Task<GServiceReadRequest<Gordic.Psi.Interface.SeznamPsuDto>,GServiceReadResponse<Gordic.Psi.Interface.SeznamPsuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Psi.Interface.SeznamPsuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SeznamPsu: ServiceBase & Catalog.SeznamPsu;
	}
	const SeznamPsu: Client["SeznamPsu"];
}

//#endregion

