/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rpd.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rpd.Interface\Gordic.Rpd.Interface.csproj
*    created     2026-02-16 14:35:47
*    files       DTO\ErrorDefDto.d.ts
*                DTO\ExterniSubjektDto.d.ts
*                DTO\GFucdupoDto.d.ts
*                DTO\GKontrolniChodAsyncTaskResultDto.d.ts
*                DTO\GRpdskchDto.d.ts
*                DTO\PolozkyRSDto.d.ts
*                DTO\PrijemciDto.d.ts
*                DTO\ResponseResultDto.d.ts
*                DTO\RpdsdotDto.d.ts
*                DTO\RpdssmlDto.d.ts
*                DTO\RpdsspdDto.d.ts
*                DTO\RpdssreDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\ErrorDefDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    interface ErrorDefDto {
        Text?: string | null;
        Item?: string | null;
        Locality?: string | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\ExterniSubjektDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:ginsesu*/
    interface ExterniSubjektDto {
        /**DBCOLUMN:ginsesu.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:ginsesu.in_rpd*/
        in_rpd?: number|null;
        /**DBCOLUMN:ginsesu.ico*/
        ico?: string|null;
        /**DBCOLUMN:ginsesu.ob_jmeno*/
        ob_jmeno?: string|null;
        /**DBCOLUMN:ginsesu.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:ginsesu.typ_org_txt*/
        typ_org_txt?: string|null;
        /**DBCOLUMN:ginsesu.adresa_kod*/
        adresa_kod?: string|null;
        /**DBCOLUMN:ginsesu.jmeno*/
        jmeno?: string|null;
        /**DBCOLUMN:ginsesu.prijmeni*/
        prijmeni?: string|null;
        /**DBCOLUMN:ginsesu.tit_pred*/
        tit_pred?: string|null;
        /**DBCOLUMN:ginsesu.tit_za*/
        tit_za?: string|null;
        /**DBCOLUMN:ginsesu.rod_prijmeni*/
        rod_prijmeni?: string|null;
        /**DBCOLUMN:ginsesu.stat*/
        stat?: number|null;
        /**DBCOLUMN:ginsesu.dic*/
        dic?: string|null;
        /**DBCOLUMN:ginsesu.typ_esu*/
        typ_esu?: number|null;
        /**DBCOLUMN:ginsesu.rc*/
        rc?: string|null;
        /**DBCOLUMN:ginsesu.stupen_ver*/
        stupen_ver?: number|null;
        /**DBCOLUMN:ginsesu.typ_ag*/
        typ_ag?: number|null;
        /**DBCOLUMN:ginsesu.dat_zmena*/
        dat_zmena?: JsonDate|null;
        /**DBCOLUMN:ginsesu.obec*/
        obec?: string|null;
        /**DBCOLUMN:ginsesu.cast_obce*/
        cast_obce?: string|null;
        /**DBCOLUMN:ginsesu.ulice*/
        ulice?: string|null;
        /**DBCOLUMN:ginsesu.cor*/
        cor?: string|null;
        /**DBCOLUMN:ginsesu.cpop*/
        cpop?: string|null;
        /**DBCOLUMN:ginsesu.psc*/
        psc?: string|null;
        /**DBCOLUMN:ginsesu.ur_pri*/
        ur_pri?: number|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\GFucdupoDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:Fucdupo*/
    interface GFucdupoDto {
        /**DBCOLUMN:Fucdupo.ixp_upr*/
        ixp_upr?: string|null;
        /**DBCOLUMN:Fucdupo.radek_upo*/
        radek_upo?: number|null;
        /**DBCOLUMN:Fucdupo.ixp_bvp*/
        ixp_bvp?: string|null;
        /**DBCOLUMN:Fucdupo.ktg_upo*/
        ktg_upo?: number|null;
        /**DBCOLUMN:Fucdupo.typ_upo*/
        typ_upo?: number|null;
        /**DBCOLUMN:Fucdupo.s_upo*/
        s_upo?: number|null;
        /**DBCOLUMN:Fucdupo.c_upo*/
        c_upo?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.znam*/
        znam?: number|null;
        /**DBCOLUMN:Fucdupo.rok*/
        rok?: number|null;
        /**DBCOLUMN:Fucdupo.mesic*/
        mesic?: number|null;
        /**DBCOLUMN:Fucdupo.den*/
        den?: number|null;
        /**DBCOLUMN:Fucdupo.subrada_duz*/
        subrada_duz?: number|null;
        /**DBCOLUMN:Fucdupo.ac_ixe*/
        ac_ixe?: string|null;
        /**DBCOLUMN:Fucdupo.ixp_ixe*/
        ixp_ixe?: string|null;
        /**DBCOLUMN:Fucdupo.s_sto*/
        s_sto?: number|null;
        /**DBCOLUMN:Fucdupo.radek_upo_sto*/
        radek_upo_sto?: number|null;
        /**DBCOLUMN:Fucdupo.dat_zmena*/
        dat_zmena?: JsonDate|null;
        /**DBCOLUMN:Fucdupo.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Fucdupo.dat_upo*/
        dat_upo?: JsonDate|null;
        /**DBCOLUMN:Fucdupo.radek_bvp*/
        radek_bvp?: number|null;
        /**DBCOLUMN:Fucdupo.popis_upo*/
        popis_upo?: string|null;
        /**DBCOLUMN:Fucdupo.c_zao*/
        c_zao?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.rok_dph*/
        rok_dph?: number|null;
        /**DBCOLUMN:Fucdupo.mesic_dph*/
        mesic_dph?: number|null;
        /**DBCOLUMN:Fucdupo.c_z0*/
        c_z0?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.c_d0*/
        c_d0?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.c_z1*/
        c_z1?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.c_d1*/
        c_d1?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.c_z2*/
        c_z2?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.c_d2*/
        c_d2?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.id_upo*/
        id_upo?: string|null;
        /**DBCOLUMN:Fucdupo.typ_upr*/
        typ_upr?: string|null;
        /**DBCOLUMN:Fucdupo.nks*/
        nks?: string|null;
        /**DBCOLUMN:Fucdupo.ks*/
        ks?: string|null;
        /**DBCOLUMN:Fucdupo.vs*/
        vs?: string|null;
        /**DBCOLUMN:Fucdupo.ss*/
        ss?: string|null;
        /**DBCOLUMN:Fucdupo.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:Fucdupo.uea*/
        uea?: string|null;
        /**DBCOLUMN:Fucdupo.ueb*/
        ueb?: string|null;
        /**DBCOLUMN:Fucdupo.uec*/
        uec?: string|null;
        /**DBCOLUMN:Fucdupo.ued*/
        ued?: string|null;
        /**DBCOLUMN:Fucdupo.uee*/
        uee?: string|null;
        /**DBCOLUMN:Fucdupo.uef*/
        uef?: string|null;
        /**DBCOLUMN:Fucdupo.ueg*/
        ueg?: string|null;
        /**DBCOLUMN:Fucdupo.ueh*/
        ueh?: string|null;
        /**DBCOLUMN:Fucdupo.uei*/
        uei?: string|null;
        /**DBCOLUMN:Fucdupo.uej*/
        uej?: string|null;
        /**DBCOLUMN:Fucdupo.te0*/
        te0?: string|null;
        /**DBCOLUMN:Fucdupo.te1*/
        te1?: string|null;
        /**DBCOLUMN:Fucdupo.te2*/
        te2?: string|null;
        /**DBCOLUMN:Fucdupo.te3*/
        te3?: string|null;
        /**DBCOLUMN:Fucdupo.te4*/
        te4?: string|null;
        /**DBCOLUMN:Fucdupo.rok_old*/
        rok_old?: number|null;
        /**DBCOLUMN:Fucdupo.mesic_old*/
        mesic_old?: number|null;
        /**DBCOLUMN:Fucdupo.den_old*/
        den_old?: number|null;
        /**DBCOLUMN:Fucdupo.subradek_bvp*/
        subradek_bvp?: number|null;
        /**DBCOLUMN:Fucdupo.radek_av_bvp*/
        radek_av_bvp?: number|null;
        /**DBCOLUMN:Fucdupo.priz_dd*/
        priz_dd?: number|null;
        /**DBCOLUMN:Fucdupo.obd_zprac_uo*/
        obd_zprac_uo?: string|null;
        /**DBCOLUMN:Fucdupo.ktg_upo_pre*/
        ktg_upo_pre?: number|null;
        /**DBCOLUMN:Fucdupo.mena*/
        mena?: number|null;
        /**DBCOLUMN:Fucdupo.c_mena*/
        c_mena?: JsonDecimal|null;
        /**DBCOLUMN:Fucdupo.radek_upo_rez*/
        radek_upo_rez?: number|null;
        /**DBCOLUMN:Fucdupo.ixp_sml*/
        ixp_sml?: string|null;
        /**DBCOLUMN:Fucdupo.rok_sml*/
        rok_sml?: number|null;
        /**DBCOLUMN:Fucdupo.cislo_sml*/
        cislo_sml?: number|null;
        /**DBCOLUMN:Fucdupo.ac_ext*/
        ac_ext?: string|null;
        /**DBCOLUMN:Fucdupo.priz_pzp*/
        priz_pzp?: number|null;
        /**DBCOLUMN:Fucdupo.ixs_kon*/
        ixs_kon?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\GKontrolniChodAsyncTaskResultDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    interface GKontrolniChodAsyncTaskResultDto {
        readonly Success?: boolean|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\GRpdskchDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:rpdskch*/
    interface GRpdskchDto {
        /**DBCOLUMN:rpdskch.chyba*/
        chyba?: number | null;
        /**DBCOLUMN:rpdskch.cis_sml*/
        cis_sml?: string | null;
        /**DBCOLUMN:rpdskch.ico_esu*/
        ico_esu?: string | null;
        /**DBCOLUMN:rpdskch.popis_chyby*/
        popis_chyby?: string | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\PolozkyRSDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:rpdspol*/
    interface PolozkyRSDto {
        /**DBCOLUMN:rpdspol.rok*/
        rok?: number | null;
        /**DBCOLUMN:rpdspol.uea*/
        uea?: string | null;
        /**DBCOLUMN:rpdspol.ueb*/
        ueb?: string | null;
        /**DBCOLUMN:rpdspol.ued*/
        ued?: string | null;
        /**DBCOLUMN:rpdspol.uee*/
        uee?: string | null;
        /**DBCOLUMN:rpdspol.typ_dot*/
        typ_dot?: number | null;
        /**DBCOLUMN:rpdspol.kod_dot*/
        kod_dot?: JsonDecimal | null;
        /**DBCOLUMN:rpdspol.priz_invest*/
        priz_invest?: number | null;
        /**DBCOLUMN:rpdspol.priz_inter*/
        priz_inter?: number | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\PrijemciDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:ginsesu*/
    interface PrijemciDto {
        /**DBCOLUMN:ginsesu.ico*/
        ico?: string|null;
        /**DBCOLUMN:ginsesu.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:ginsesu.ob_jmeno*/
        ob_jmeno?: string|null;
        /**DBCOLUMN:ginsesu.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:ginsesu.typ_org_txt*/
        typ_org_txt?: string|null;
        /**DBCOLUMN:ginsesu.adresa_kod*/
        adresa_kod?: string|null;
        /**DBCOLUMN:ginsesu.jmeno*/
        jmeno?: string|null;
        /**DBCOLUMN:ginsesu.prijmeni*/
        prijmeni?: string|null;
        /**DBCOLUMN:ginsesu.tit_pred*/
        tit_pred?: string|null;
        /**DBCOLUMN:ginsesu.tit_za*/
        tit_za?: string|null;
        /**DBCOLUMN:ginsesu.rod_prijmeni*/
        rod_prijmeni?: string|null;
        /**DBCOLUMN:ginsesu.stat*/
        stat?: number|null;
        /**DBCOLUMN:ginsesu.dic*/
        dic?: string|null;
        /**DBCOLUMN:ginsesu.typ_esu*/
        typ_esu?: number|null;
        /**DBCOLUMN:ginsesu.rc*/
        rc?: string|null;
        /**DBCOLUMN:ginsesu.stupen_ver*/
        stupen_ver?: number|null;
        /**DBCOLUMN:ginsesu.typ_ag*/
        typ_ag?: number|null;
        /**DBCOLUMN:ginsesu.obec*/
        obec?: string|null;
        /**DBCOLUMN:ginsesu.cast_obce*/
        cast_obce?: string|null;
        /**DBCOLUMN:ginsesu.ulice*/
        ulice?: string|null;
        /**DBCOLUMN:ginsesu.cor*/
        cor?: string|null;
        /**DBCOLUMN:ginsesu.cpop*/
        cpop?: string|null;
        /**DBCOLUMN:ginsesu.psc*/
        psc?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\ResponseResultDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    interface ResponseResultDto {
        Text?: string|null;
        Errors?: Gordic.Rpd.Interface.DTO.ErrorDefDto[]|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\RpdsdotDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:Rpdsdot*/
    interface RpdsdotDto {
        /**DBCOLUMN:Rpdsdot.rok*/
        rok?: number|null;
        /**DBCOLUMN:Rpdsdot.cis_sml*/
        cis_sml?: string|null;
        /**DBCOLUMN:Rpdsdot.id_platby*/
        id_platby?: string|null;
        /**DBCOLUMN:Rpdsdot.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Rpdsdot.lic*/
        lic?: string|null;
        /**DBCOLUMN:Rpdsdot.ico*/
        ico?: string|null;
        /**DBCOLUMN:Rpdsdot.ucs*/
        ucs?: string|null;
        /**DBCOLUMN:Rpdsdot.nks*/
        nks?: string|null;
        /**DBCOLUMN:Rpdsdot.mesic*/
        mesic?: number|null;
        /**DBCOLUMN:Rpdsdot.ac*/
        ac?: string|null;
        /**DBCOLUMN:Rpdsdot.radek_z*/
        radek_z?: number|null;
        /**DBCOLUMN:Rpdsdot.te1*/
        te1?: string|null;
        /**DBCOLUMN:Rpdsdot.typ_ag*/
        typ_ag?: number|null;
        /**DBCOLUMN:Rpdsdot.vs*/
        vs?: string|null;
        /**DBCOLUMN:Rpdsdot.den*/
        den?: number|null;
        /**DBCOLUMN:Rpdsdot.c_cerp*/
        c_cerp?: JsonDecimal|null;
        /**DBCOLUMN:Rpdsdot.c_spotr*/
        c_spotr?: JsonDecimal|null;
        /**DBCOLUMN:Rpdsdot.uee*/
        uee?: string|null;
        /**DBCOLUMN:Rpdsdot.ued*/
        ued?: string|null;
        /**DBCOLUMN:Rpdsdot.stav_zaznamu*/
        stav_zaznamu?: number|null;
        /**DBCOLUMN:Rpdsdot.dat_zmena*/
        dat_zmena?: JsonDate|null;
        /**DBCOLUMN:Rpdsdot.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Rpdsdot.ueg*/
        ueg?: string|null;
        /**DBCOLUMN:Rpdsdot.id_platby_puv*/
        id_platby_puv?: string|null;
        /**DBCOLUMN:Rpdsdot.ixp_dok*/
        ixp_dok?: string|null;
        /**DBCOLUMN:Rpdsdot.zmenu_pr_dok*/
        zmenu_pr_dok?: string|null;
        /**DBCOLUMN:Rpdsdot.cis_proj*/
        cis_proj?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\RpdssmlDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    interface RpdssmlDto  {
        /**DBCOLUMN:rpdssml.id_sml*/
        id_sml?: string|null;
        /**DBCOLUMN:rpdssml.cis_sml*/
        cis_sml?: string|null;
        /**DBCOLUMN:rpdssml.c_celk*/
        c_celk?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.dat_pod*/
        dat_pod?: JsonDate|null;
        /**DBCOLUMN:rpdssml.cis_proj*/
        cis_proj?: string|null;
        /**DBCOLUMN:rpdssml.c_pod_nar*/
        c_pod_nar?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.c_pod_ciz*/
        c_pod_ciz?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.id_esu*/
        id_esu?: string|null;
        /**DBCOLUMN:rpdssml.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:rpdssml.typ_org*/
        typ_org?: number|null;
        /**DBCOLUMN:rpdssml.ixs_dav*/
        ixs_dav?: string|null;
        /**DBCOLUMN:rpdssml.ixs_ext*/
        ixs_ext?: string|null;
        /**DBCOLUMN:rpdssml.dat_zmena*/
        dat_zmena?: JsonDate|null;
        /**DBCOLUMN:rpdssml.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:rpdssml.ixp_upr*/
        ixp_upr?: string|null;
        /**DBCOLUMN:rpdssml.ico*/
        ico?: string|null;
        /**DBCOLUMN:rpdssml.ob_jmeno*/
        ob_jmeno?: string|null;
        /**DBCOLUMN:rpdssml.c_rez*/
        c_rez?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.c_upo*/
        c_upo?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.dat_vzniku*/
        dat_vzniku?: JsonDate|null;
        /**DBCOLUMN:rpdssml.ser_cislo*/
        ser_cislo?: number|null;
        /**DBCOLUMN:rpdssml.c_spotr*/
        c_spotr?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.c_spotr_old*/
        c_spotr_old?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.c_spotr_akt*/
        c_spotr_akt?: JsonDecimal|null;
        /**DBCOLUMN:rpdssml.c_nevyp*/
        c_nevyp?: JsonDecimal|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\RpdsspdDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    /**DBTABLE:Rpdsspd*/
    interface RpdsspdDto {
        /**DBCOLUMN:Rpdsspd.rok*/
        rok?: number|null;
        /**DBCOLUMN:Rpdsspd.cis_sml*/
        cis_sml?: string|null;
        /**DBCOLUMN:Rpdsspd.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:Rpdsspd.ixp_sml*/
        ixp_sml?: string|null;
        /**DBCOLUMN:Rpdsspd.ico_esu*/
        ico_esu?: string|null;
        /**DBCOLUMN:Rpdsspd.lic*/
        lic?: string|null;
        /**DBCOLUMN:Rpdsspd.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:Rpdsspd.kap_sr*/
        kap_sr?: number|null;
        /**DBCOLUMN:Rpdsspd.kod_dot_tit*/
        kod_dot_tit?: number|null;
        /**DBCOLUMN:Rpdsspd.dat_sml*/
        dat_sml?: JsonDate|null;
        /**DBCOLUMN:Rpdsspd.c_priz_nav*/
        c_priz_nav?: JsonDecimal|null;
        /**DBCOLUMN:Rpdsspd.c_priz_nenav*/
        c_priz_nenav?: JsonDecimal|null;
        /**DBCOLUMN:Rpdsspd.rezim_pd*/
        rezim_pd?: number|null;
        /**DBCOLUMN:Rpdsspd.kod_dopl*/
        kod_dopl?: number|null;
        /**DBCOLUMN:Rpdsspd.kod_zmeny*/
        kod_zmeny?: number|null;
        /**DBCOLUMN:Rpdsspd.kod_cerpani*/
        kod_cerpani?: number|null;
        /**DBCOLUMN:Rpdsspd.stav_zaznamu*/
        stav_zaznamu?: number|null;
        /**DBCOLUMN:Rpdsspd.dat_zmena*/
        dat_zmena?: JsonDate|null;
        /**DBCOLUMN:Rpdsspd.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:Rpdsspd.c_cerp_nav*/
        c_cerp_nav?: JsonDecimal|null;
        /**DBCOLUMN:Rpdsspd.c_cerp_nenav*/
        c_cerp_nenav?: JsonDecimal|null;
        /**DBCOLUMN:Rpdsspd.cis_sml_puv*/
        cis_sml_puv?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rpd.Interface\DTO\RpdssreDto.d.ts 

declare namespace Gordic.Rpd.Interface.DTO {
    interface RpdssreDto  {
        /**DBCOLUMN:rpdssre.cis_sml*/
        cis_sml?: string|null;
        /**DBCOLUMN:rpdssre.tit_pla*/
        tit_pla?: string|null;
        /**DBCOLUMN:rpdssre.dat_rez*/
        dat_rez?: JsonDate|null;
        /**DBCOLUMN:rpdssre.platnost*/
        platnost?: number|null;
        /**DBCOLUMN:rpdssre.nks*/
        nks?: string|null;
        /**DBCOLUMN:rpdssre.uea*/
        uea?: string|null;
        /**DBCOLUMN:rpdssre.ueb*/
        ueb?: string|null;
        /**DBCOLUMN:rpdssre.uec*/
        uec?: string|null;
        /**DBCOLUMN:rpdssre.ued*/
        ued?: string|null;
        /**DBCOLUMN:rpdssre.uee*/
        uee?: string|null;
        /**DBCOLUMN:rpdssre.uef*/
        uef?: string|null;
        /**DBCOLUMN:rpdssre.ueg*/
        ueg?: string|null;
        /**DBCOLUMN:rpdssre.ueh*/
        ueh?: string|null;
        /**DBCOLUMN:rpdssre.uei*/
        uei?: string|null;
        /**DBCOLUMN:rpdssre.uej*/
        uej?: string|null;
        /**DBCOLUMN:rpdssre.te0*/
        te0?: string|null;
        /**DBCOLUMN:rpdssre.te1*/
        te1?: string|null;
        /**DBCOLUMN:rpdssre.te2*/
        te2?: string|null;
        /**DBCOLUMN:rpdssre.te3*/
        te3?: string|null;
        /**DBCOLUMN:rpdssre.te4*/
        te4?: string|null;
        /**DBCOLUMN:rpdssre.xuete*/
        xuete?: string|null;
        /**DBCOLUMN:rpdssre.c*/
        c?: JsonDecimal|null;
        /**DBCOLUMN:rpdssre.c_sml*/
        c_sml?: JsonDecimal|null;
        /**DBCOLUMN:rpdssre.c_roz*/
        c_roz?: JsonDecimal|null;
        /**DBCOLUMN:rpdssre.proc_sml*/
        proc_sml?: JsonDecimal|null;
        /**DBCOLUMN:rpdssre.proc_roz*/
        proc_roz?: JsonDecimal|null;
        /**DBCOLUMN:rpdssre.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:rpdssre.ico*/
        ico?: string|null;
        /**DBCOLUMN:rpdssre.ob_jmeno*/
        ob_jmeno?: string|null;
        /**DBCOLUMN:rpdssre.c_fak*/
        c_fak?: JsonDecimal|null;
    }
}

//#endregion

