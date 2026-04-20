declare namespace Gordic.Pap.Dialogs {
    function GPapPolozkyPlanuScr(parentContent: GContent, opt: {
        ixs_pri: string;
        kompetent: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    /**
     * GPapPolozkyPlanuSeznamScrOptions
     *
     * @author mvybiral
     * @since 482.1.0.2
     */
    interface GPapPolozkyPlanuSeznamScrOptions {
        /**
         * kompetent případu
         * @type {string}
         */
        kompetent: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    /**
     * GPapPolozkyPlanuSeznamScrRetVal
     *
     * @author mvybiral
     * @since 482.1.0.2
     */
    interface GPapPolozkyPlanuSeznamScrRetVal {
        /**
         * cislo položky plánu
         * @type {string}
         */
        cislo: string;
        /**
         * ixs_cia
         * @type {string}
         */
        ixs_cia: string;
    }
    function GPapPolozkyPlanuSeznamScr(parentContent: GContent, opt: GPapPolozkyPlanuSeznamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPolozkyPlanuSeznamScrRetVal | undefined>;
    interface GPapPolozkyPlanuSeznamBrScrOptions {
        /**
         * cislo položky plánu
         * @type {string}
         */
        ixs_pri: string;
        /**
         * kompetent případu
         * @type {string}
         */
        kompetent: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    function GPapPolozkyPlanuSeznamBrScr(parentContent: GContent, opt: GPapPolozkyPlanuSeznamBrScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPolozkyPlanuSeznamScrRetVal | undefined>;
    interface GPapPolozkyPlanuSeznamMimoScrOptions {
        /**
         * cislo položky plánu
         * @type {string}
         */
        ixs_pri: string;
        /**
         * kompetent případu
         * @type {string}
         */
        kompetent: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    function GPapPolozkyPlanuSeznamMimoScr(parentContent: GContent, opt: GPapPolozkyPlanuSeznamMimoScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPolozkyPlanuSeznamScrRetVal | undefined>;
    interface GPapFinancovaniOptions {
        /**
         * případ
         * @type {string}
         */
        ixs_pri: string;
        /**
         * Parametr pro volání z detailu případu - ixs_pri, pro volání z detailu dokumentu ixp
         * @type {string}
         */
        pri_pid: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * isTskParam
         * @type {boolean}
         */
        isTskParam: boolean;
    }
    function GPapFinancovaniScr(parentContent: GContent, opt: GPapFinancovaniOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapAddUpdPolozkaFinScrRetVal>;
    /**
     * GPapPolozkyPlanuSeznamScrOptions
     *
     * @author mvybiral
     * @since 482.1.0.2
     */
    interface GPapAddUpdPolozkaFinScrOptions {
        /**
         * zaznam Xxxspol
         * @type {Pap.Interface.GXxxspolDto}
         */
        zaznam: Pap.Interface.GXxxspolDto;
        /**
         * ixs_pri
         * @type {string}
         */
        constPP: Pap.Interface.GPapFinancovaniConstDto;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * novyZaznam
         * @type {boolean}
         */
        novyZaznam: boolean;
        /**
         * isTskParam
         * @type {boolean}
         */
        isTskParam: boolean;
    }
    /**
     * GPapPolozkyPlanuSeznamScrRetVal
     *
     * @author mvybiral
     * @since 482.1.0.2
     */
    interface GPapAddUpdPolozkaFinScrRetVal {
        /**
         * refresh
         * @type {boolean}
         */
        change: boolean;
    }
    function GPapAddUpdPolozkaFinScr(parentContent: GContent, opt: GPapAddUpdPolozkaFinScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapAddUpdPolozkaFinScrRetVal | undefined>;
    interface GPapUvolneniScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * por_cis
         * @type {number}
         */
        por_cis: number;
    }
    /**
     * GPapPolozkyPlanuSeznamScrRetVal
     *
     * @author mvybiral
     * @since 482.1.0.2
     */
    interface GPapUvolneniScrRetVal {
        /**
         * refresh
         * @type {boolean}
         */
        refresh: boolean;
    }
    function GPapUvolneniScr(parentContent: GContent, opt: GPapUvolneniScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapUvolneniScrRetVal | undefined>;
    interface GPapPozadavkyScrOptions {
        /**
         * ixp_prim
         * @type {string}
         */
        ixp_prim: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapPozadavkyScrRetVal {
        /**
         * refresh
         * @type {boolean}
         */
        refresh: boolean;
    }
    function GPapPozadavkyScr(parentContent: GContent, opt: GPapPozadavkyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPozadavkyScrRetVal | undefined>;
    interface GPapPozadavkyNovyScrOptions {
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    /**
     * GPapPolozkyPlanuSeznamScrRetVal
     *
     * @author mvybiral
     * @since 482.1.0.2
     */
    interface GPapPozadavkyNovyScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GSrvdixpDto}
         */
        zaznam: Gordic.Pap.Interface.GSrvdixpDto;
    }
    function GPapPozadavkyNovyScr(parentContent: GContent, opt: GPapPozadavkyNovyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPozadavkyNovyScrRetVal | undefined>;
    interface GPapUpdPozadavekScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GSrvdixpDto}
         */
        zaznam: Gordic.Pap.Interface.GSrvdixpDto;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapUpdPozadavekScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GSrvdixpDto}
         */
        zaznam: Gordic.Pap.Interface.GSrvdixpDto;
    }
    function GPapUpdPozadavekScr(parentContent: GContent, opt: GPapUpdPozadavekScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapUpdPozadavekScrRetVal | undefined>;
    interface GPapNavrhyScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string | null;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapNavrhyScrRetVal {
        navrat: boolean;
    }
    function GPapNavrhyScr(parentContent: GContent, opt: GPapNavrhyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapNavrhyScrRetVal | undefined>;
    interface GPapNavrhyProhlScrOptions {
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapNavrhyProhlScrRetVal {
        navrat: boolean;
    }
    function GPapNavrhyProhlScr(parentContent: GContent, opt: GPapNavrhyProhlScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapNavrhyProhlScrRetVal | undefined>;
    interface GPapSablonyScrOptions {
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapSablonyScrRetVal {
        navrat: boolean;
    }
    function GPapSablonyScr(parentContent: GContent, opt: GPapSablonyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapSablonyScrRetVal | undefined>;
    interface GPapAddUpdSablonyScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GSmlUpdAddsblDto}
         */
        zaznam: Gordic.Pap.Interface.GSmlUpdAddsblDto | null;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapAddUpdSablonyScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GPapAddUpdSablonyScr(parentContent: GContent, opt: GPapAddUpdSablonyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapAddUpdSablonyScrRetVal | undefined>;
    interface GPapSchvalitParamScrOptions {
        /**
         * ixs_pri
         * @type string
         */
        ixs_pri: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapSchvalitParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        zaznam: Gordic.Pap.Interface.GPapSchvalParamConstDto | null;
    }
    function GPapSchvalitParamScr(parentContent: GContent, opt: GPapSchvalitParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapSchvalitParamScrRetVal | undefined>;
    interface GPapDotazPodaniParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string | null;
        /**
         * ixp
         * @type {string}
         */
        ixp: string | null;
        /**
         * ac_ag
         * @type {string}
         */
        ac_ag: string | null;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * soutez
         * @type {string}
         */
        soutez: string | null;
        /**
         * ixs_esu
         * @type {string}
         */
        ixs_esu: string | null;
        /**
             * ixp_den
             * @type {string}
             */
        ixp_den: string | null;
    }
    interface GPapDotazPodaniParamScrRetVal {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string | null;
        /**
         * soutez
         * @type {string}
         */
        soutez: string | null;
        /**
         * ac_ag
         * @type {string}
         */
        ac_ag: string | null;
        /**
         * nazev
         * @type {string}
         */
        nazev: string | null;
    }
    function GPapDotazPodani(parentContent: GContent, opt: GPapDotazPodaniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapDotazPodaniParamScrRetVal | undefined>;
    interface GPapDotazPredvyhodnoceniParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * ixp
         * @type {string}
         */
        ixp: string;
        /**
         * ac_ag
         * @type {string}
         */
        ac_ag: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapDotazPredvyhodnoceniParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        ixs_pri: string | null;
    }
    function GPapDotazPredvyhodnoceni(parentContent: GContent, opt: GPapDotazPredvyhodnoceniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapDotazPredvyhodnoceniParamScrRetVal | undefined>;
    interface GPapVyberUkonParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * ixs_esu
         * @type {string}
         */
        ixs_esu: string;
        /**
         * soutez
         * @type {string}
         */
        soutez: string;
        /**
         * por_cis_nab
         * @type {number}
         */
        por_cis_nab: number;
    }
    interface GPapVyberUkonParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        ixs_krk: string | null;
        ktg_typ: number | null;
    }
    function GPapVyberUkon(parentContent: GContent, opt: GPapVyberUkonParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapVyberUkonParamScrRetVal | undefined>;
    interface GPapVyberKnihyParamScrOptions {
    }
    interface GPapVyberKnihyParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        ixp_den: string[] | null;
    }
    function GPapVyberKnihy(parentContent: GContent, opt: GPapVyberKnihyParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapVyberKnihyParamScrRetVal | undefined>;
    interface GPapVyberKnihuParamScrOptions {
    }
    interface GPapVyberKnihuParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        ixp_den: string | null;
    }
    function GPapVyberKnihu(parentContent: GContent, opt: GPapVyberKnihuParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapVyberKnihuParamScrRetVal | undefined>;
    interface GPapVyberKnihuRokParamScrOptions {
        /**
         * navrat
         * @type {boolean}
         */
        rok: number | null;
    }
    interface GPapVyberKnihuParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        ixp_den: string | null;
    }
    function GPapVyberKnihuRok(parentContent: GContent, opt: GPapVyberKnihuRokParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapVyberKnihuParamScrRetVal | undefined>;
    interface GPapVyberPorCisNabParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * ixs_esu
         * @type {string}
         */
        ixs_esu: string;
    }
    interface GPapVyberPorCisNabParamScrRetVal {
        /**
         * navrat
         * @type {number}
         */
        por_cis_nab: number;
    }
    function GPapVyberPorCisNab(parentContent: GContent, opt: GPapVyberPorCisNabParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapVyberPorCisNabParamScrRetVal | undefined>;
    interface GPapRozsirenyPopisParamScrOptions {
        /**
         * ixp
         * @type {string}
         */
        zaznam: Interface.GXxxvpopTransDto;
        /**
         * readOnly
         * @type {boolean}
         */
        readOnly: boolean;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    interface GPapRozsirenyPopisParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean | null;
    }
    function GPapRozsirenyPopis(parentContent: GContent, opt: GPapRozsirenyPopisParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapRozsirenyPopisParamScrRetVal | undefined>;
    interface GPapHromEsuParamScrOptions {
        agenda: string;
        ixs_pri: string;
        ixp: string;
        list: Interface.GXxxsesuHrDto[];
        ParVieVicesu: boolean;
        readOnly: boolean;
        cis_por: number;
        nazev1: string;
        nazev2: string;
        pole1: Date;
        pole2: string | null;
    }
    interface GPapHromEsuParamScrRetVal {
    }
    function GPapHromEsu(parentContent: GContent, opt: GPapHromEsuParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapHromEsuParamScrRetVal | undefined>;
    interface GPapAddUpdHromEsuParamScrOptions {
        agenda: string;
        ixs_pri: string;
        ixp: string;
        ParVieVicesu: boolean;
        list: Interface.GXxxsesuHrDto[];
        cis_por: number;
        por_cis_nab: number;
    }
    interface GPapAddUpdHromEsuParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        zaznam: Interface.GXxxsesuHrDto | null;
    }
    function GPapAddUpdHromEsu(parentContent: GContent, opt: GPapAddUpdHromEsuParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapAddUpdHromEsuParamScrRetVal | undefined>;
    interface GPapObecnyInputParamScrOptions {
        /**
         * titulek
         * @type {string}
         */
        titulek: string;
        /**
         * label
         * @type {string}
         */
        label: string;
        /**
         * agenda
         * @type {boolean}
         */
        povinne: boolean;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * /string|number
         * @type {string}
         */
        typ: string;
        /**
         * /
         * @type {string}
         */
        input: string | null | undefined;
    }
    interface GPapObecnyInputParamScrRetVal {
        /**
         * navrat
         * @type {string}
         */
        navrat: string | null;
    }
    function GPapObecnyInput(parentContent: GContent, opt: GPapObecnyInputParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapObecnyInputParamScrRetVal | undefined>;
    interface GPapRozpoctoveZapisyParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }
    function GPapRozpoctoveZapisyScr(parentContent: GContent, opt: GPapRozpoctoveZapisyParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function dotaz(otazka: string, that: GContent): JQueryPromise<any>;
    interface GPapUkonceniParamScrOptions {
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * content
         * @type {}
         */
        that: GContent;
        /**
         * seznam
         * @type {}
         */
        seznam: Pap.Interface.GPapStruDto[];
        /**
         * param
         * @type {number}
         */
        param: number;
    }
    function GPapUkonceni(options: GPapUkonceniParamScrOptions): JQueryPromise<undefined>;
    function GPapOdUkonceni(options: GPapUkonceniParamScrOptions): JQueryPromise<undefined>;
    interface GPapObecneTiskyParamScrOptions {
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * agenda
         * @type {boolean}
         */
        konpla: boolean;
    }
    interface GObecneTiskyScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GObecneTiskyScr(parentContent: GContent, opt: GPapObecneTiskyParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GObecneTiskyScrRetVal | undefined>;
    interface GPapPreevidenceParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * ixp_den
         * @type {string}
         */
        ixp_den: string;
        /**
         * preevidenceData
         * @type {Pap.Interface.GParametryPreevidenceDto}
         */
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
    }
    interface GPapPreevidenceParamScrRetVal {
        /**
         * navrat
         * @type {string}
         */
        navrat: string | null;
    }
    function GPapPreevidenceDetail(parentContent: GContent, opt: GPapPreevidenceParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPreevidenceParamScrRetVal | undefined>;
    interface GPapPrXxxxxParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * preevidenceData
         * @type {Pap.Interface.GParametryPreevidenceDto}
         */
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
    }
    function GPapPredaniDetail(parentContent: GContent, opt: GPapPrXxxxxParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPreevidenceParamScrRetVal | undefined>;
    function GPapPrideleniDetail(parentContent: GContent, opt: GPapPrXxxxxParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPreevidenceParamScrRetVal | undefined>;
    function GPapPrevzetiDetail(parentContent: GContent, opt: GPapPrXxxxxParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapPreevidenceParamScrRetVal | undefined>;
    interface GPapProcesParamScrOptions {
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * soutez
         * @type {string}
         */
        soutez: string;
        /**
         * ktg_typ
         * @type {number}
         */
        ktg_typ: number;
    }
    interface GPapProcesScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GPapProcesScr(parentContent: GContent, opt: GPapProcesParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPapProcesScrRetVal | undefined>;
    interface GIdentifikaceVZScrOptions {
        /**
         * detailDto
         * @type {Gordic.Pap.Interface.GIdentVZDto}
         */
        zaznam: Gordic.Pap.Interface.GIdentVZDto;
        readOnly: boolean;
        formatNenLomitko: boolean;
    }
    interface GGIdentifikaceVZScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        zmena: boolean;
        pokracovat: boolean;
        hlas: string;
    }
    function GIdentifikaceVZScr(parentContent: GContent, opt: GIdentifikaceVZScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GGIdentifikaceVZScrRetVal | undefined>;
    function GPapKontrolaFinancovaniScr(parentContent: GContent, opt: {
        ixs_pri: string;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GNewUpdEvzskpuScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzskpuDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzskpuDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdEvzskpuScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzskpuDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzskpuDto | null;
    }
    function GNewUpdEvzskpuScr(parentContent: GContent, opt: GNewUpdEvzskpuScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdEvzskpuScrRetVal | undefined>;
    interface GNewUpdVfpsoblScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GVfpsoblDto}
         */
        zaznam: Gordic.Pap.Interface.GVfpsoblDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdVfpsoblScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GVfpsoblDto}
         */
        zaznam: Gordic.Pap.Interface.GVfpsoblDto | null;
    }
    function GNewUpdGVfpsoblScr(parentContent: GContent, opt: GNewUpdVfpsoblScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdVfpsoblScrRetVal | undefined>;
    interface GAdminTableScrOptions {
        /**
         * nameTable
         * @type {string}
         */
        nameTable: string;
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
    }
    function GAdminTableScr(parentContent: GContent, opt: GAdminTableScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    interface GNewUpdEvzsazaScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GVfpsoblDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzsazaDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdEvzsazaScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzsazaDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzsazaDto | null;
    }
    function GNewUpdGEvzsazaScr(parentContent: GContent, opt: GNewUpdEvzsazaScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdEvzsazaScrRetVal | undefined>;
    interface GNewUpdVfpctdgScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GVfpctdgDto}
         */
        zaznam: Gordic.Pap.Interface.GVfpctdgDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdVfpctdgScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GVfpctdgDto}
         */
        zaznam: Gordic.Pap.Interface.GVfpctdgDto | null;
    }
    function GNewUpdGVfpctdgScr(parentContent: GContent, opt: GNewUpdVfpctdgScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdVfpctdgScrRetVal | undefined>;
    interface GNewUpdEvzsokoScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzsokoDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzsokoDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdEvzsokoScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzsokoDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzsokoDto | null;
    }
    function GNewUpdGEvzsokoScr(parentContent: GContent, opt: GNewUpdEvzsokoScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdEvzsokoScrRetVal | undefined>;
    interface GNewUpdEvzskdnScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzskdnDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzskdnDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdEvzskdnScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GEvzskdnDto}
         */
        zaznam: Gordic.Pap.Interface.GEvzskdnDto | null;
    }
    function GNewUpdGEvzskdnScr(parentContent: GContent, opt: GNewUpdEvzskdnScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdEvzskdnScrRetVal | undefined>;
    interface GNewUpdRzaskpuScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaskpuDto}
         */
        zaznam: Gordic.Pap.Interface.GRzaskpuDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzaskpuScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaskpuDto}
         */
        zaznam: Gordic.Pap.Interface.GRzaskpuDto | null;
    }
    function GNewUpdGRzaskpuScr(parentContent: GContent, opt: GNewUpdRzaskpuScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzaskpuScrRetVal | undefined>;
    interface GNewUpdRzaslegScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaslegDto}
         */
        zaznam: Gordic.Pap.Interface.GRzaslegDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzaslegScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaslegDto}
         */
        zaznam: Gordic.Pap.Interface.GRzaslegDto | null;
    }
    function GNewUpdGRzaslegScr(parentContent: GContent, opt: GNewUpdRzaslegScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzaslegScrRetVal | undefined>;
    interface GNewUpdRzascfpScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaslegDto}
         */
        zaznam: Gordic.Pap.Interface.GRzascfpDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzascfpScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaslegDto}
         */
        zaznam: Gordic.Pap.Interface.GRzascfpDto | null;
    }
    function GNewUpdGRzascfpScr(parentContent: GContent, opt: GNewUpdRzascfpScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzascfpScrRetVal | undefined>;
    interface GNewUpdRzacrezScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzacrezDto}
         */
        zaznam: Gordic.Pap.Interface.GRzacrezDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzacrezScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzacrezDto}
         */
        zaznam: Gordic.Pap.Interface.GRzacrezDto | null;
    }
    function GNewUpdGRzacrezScr(parentContent: GContent, opt: GNewUpdRzacrezScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzacrezScrRetVal | undefined>;
    interface GNewUpdRzacpruScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzacpruDto}
         */
        zaznam: Gordic.Pap.Interface.GRzacpruDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzacpruScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaslegDto}
         */
        zaznam: Gordic.Pap.Interface.GRzacpruDto | null;
    }
    function GNewUpdGRzacpruScr(parentContent: GContent, opt: GNewUpdRzacpruScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzacpruScrRetVal | undefined>;
    interface GNewUpdRzacvriScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzacvriDto}
         */
        zaznam: Gordic.Pap.Interface.GRzacvriDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzacvriScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzacvriDto}
         */
        zaznam: Gordic.Pap.Interface.GRzacvriDto | null;
    }
    function GNewUpdGRzacvriScr(parentContent: GContent, opt: GNewUpdRzacvriScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzacvriScrRetVal | undefined>;
    interface GNewUpdRzaczprScrOptions {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaczprDto}
         */
        zaznam: Gordic.Pap.Interface.GRzascfpDto | null;
        /**
         * novy
         * @type {boolean}
         */
        novy: boolean;
    }
    interface GNewUpdRzaczprScrRetVal {
        /**
         * zaznam
         * @type {Gordic.Pap.Interface.GRzaczprDto}
         */
        zaznam: Gordic.Pap.Interface.GRzaczprDto | null;
    }
    function GNewUpdGRzaczprScr(parentContent: GContent, opt: GNewUpdRzaczprScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNewUpdRzaczprScrRetVal | undefined>;
    interface GVyberPripadScrRetVal {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * nazev
         * @type {string}
         */
        nazev: string;
        /**
         * ac
         * @type {string}
         */
        ac: string;
        /**
         * soutez
         * @type {string}
         */
        soutez: string;
        /**
         * ac_ag
         * @type {string}
         */
        ac_ag: string;
        /**
         * ixp_den_nazev
         * @type {string}
         */
        ixp_den_nazev: string;
        /**
         * nazev_rf
         * @type {string}
         */
        nazev_rf: string;
        /**
         * rok
         * @type {number}
         */
        rok: number;
    }
    function GPapVyberPripadPripad(parentContent: GContent, opt: GPapDotazPodaniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GVyberPripadScrRetVal | undefined>;
    interface GWsNenOptions {
        /**
         * string
         * @type {string}
         */
        service: string;
        /**
               * taskId
               * @type {string}
               */
        taskId: string;
    }
    function GPapWsNenScr(parentContent: GContent, opt: GWsNenOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Pap.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsPapForm(): Forms.Form[];
}
declare namespace Gordic.Pap.WebControls {
    interface PapPFOptions {
        agenda: string;
        pole: string;
    }
    function vytvorSeznamPriParamPF(options: PapPFOptions): {
        description: string;
        applyTo: string;
        formula: string;
        text: Components.Grid.CondFormats.CondFormatText;
    }[];
    function naplnSeznam(l_pole: string, agenda: string, poleComp: string): {
        description: string;
        applyTo: string;
        formula: string;
        text: Components.Grid.CondFormats.CondFormatText;
    }[];
    function vytvorSeznamFinancovani(l_pole: string): {
        description: string;
        applyTo: string;
        formula: string;
        text: Components.Grid.CondFormats.CondFormatText;
    }[];
    function vytvorSeznamPriDokParamPF(options: PapPFOptions): {
        description: string;
        applyTo: string;
        formula: string;
        text: Components.Grid.CondFormats.CondFormatText;
    }[];
    function naplnSeznamDok(l_pole: string, poleComp: string): {
        description: string;
        applyTo: string;
        formula: string;
        text: Components.Grid.CondFormats.CondFormatText;
    }[];
    function pridejVlastnictvi(): GGridColumn;
    function pridejVlastnictviBF(): GGridColumn;
}
declare namespace Gordic.Pap.WebControls {
    class GAdminTableTabScr extends GContentBase {
        private nameTable;
        grid: JQuery;
        gridPol: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        rza_rad_admcis: boolean;
        onContentReady(): void;
        knihySmazat(): void;
        knihyPridat(): void;
        gridColumnPol(): Data.GridFormat<Eko.Interface.GEkosdenDto>;
        definiceGridPol(div: any): void;
        nactiPol(leg_usm_par: number): void;
        definiceGridu(gridcolumn: any): void;
        nactiView(): void;
        nastavTlacitkaPol(radek: any): void;
        nastavTlacitka(): void;
        update(aktivita: number): void;
        detail(novy: boolean): void;
        columns(l_col: any): any;
        NaplnColPru(l_col: any): void;
        NaplnColVri(l_col: any): void;
        NaplnColZpr(l_col: any): void;
        NaplnColRez(l_col: any): void;
        NaplnColSou(l_col: any): void;
        NaplnColTyd(l_col: any): void;
        NaplnColCfp(l_col: any): void;
        NaplnColLeg(l_col: any): void;
        NaplnColTdg(l_col: any): void;
        NaplnColAza(l_col: any): void;
        NaplnColKpuObl(l_col: any): any;
        NaplnColOko(l_col: any): any;
        NaplnColKdn(l_col: any): any;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdEvzsazaTabScr extends GContentBase {
        zaznam: Pap.Interface.GEvzsazaDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GEvzskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdEvzskdnTabScr extends GContentBase {
        zaznam: Pap.Interface.GEvzskdnDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GEvzskdnDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdEvzskpuTabScr extends GContentBase {
        zaznam: Pap.Interface.GEvzskpuDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GEvzskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdEvzsokoTabScr extends GContentBase {
        zaznam: Pap.Interface.GEvzsokoDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GEvzsokoDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdRzacpruTabScr extends GContentBase {
        zaznam: Pap.Interface.GRzacpruDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzaskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdRzacrezTabScr extends GContentBase {
        zaznam: Pap.Interface.GRzacrezDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzaskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdRzacvriTabScr extends GContentBase {
        zaznam: Pap.Interface.GRzacvriDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzaskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdRzaczprTabScr extends GContentBase {
        zaznam: Pap.Interface.GRzaczprDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzaskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    interface IGAnoNe {
        anoNe: string;
        /**
         * komentar
         * @type {number}
         */
        v: number;
    }
    class GNewUpdGRzascfpScr extends GContentBase {
        zaznam: Pap.Interface.GRzascfpDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzascfpDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdRzaskpuTabScr extends GContentBase {
        zaznam: Pap.Interface.GRzaskpuDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzaskpuDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdRzaslegTabScr extends GContentBase {
        zaznam: Pap.Interface.GRzaslegDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        vyradit(vyradit: any): void;
        NaplnPrizLeg(): JQueryPromise<Interface.GPapEditDatDto[]>;
        ok(): void;
        closing(zaznam: Pap.Interface.GRzaslegDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdGVfpctdgTabScr extends GContentBase {
        zaznam: Pap.Interface.GVfpctdgDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(zaznam: Pap.Interface.GVfpctdgDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GNewUpdVfpsoblTabScr extends GContentBase {
        zaznam: Pap.Interface.GVfpsoblDto;
        novy: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
    }
}
declare namespace Gordic.Pap.WebControls.PrefabsPap {
    interface HlavickovyFormularOptions<T = any> {
        parentContent: GContent;
        agenda: string;
        readOnly: boolean;
        ktg_typ: number;
        soutez: string | null;
        acAgMaska: string;
        ac_ag_enabled: boolean;
        ac_enabled: boolean;
        cis_real_enabled: boolean;
        ixs_fun_komp_enabled: boolean;
        enabledPopis: boolean;
        sablona: string;
        pripad?: boolean;
        ixp?: string;
        xxxSoutezPrefab: GFieldOptions<any>;
    }
    function vytvorHlavickovyFormular<T = any>(options: HlavickovyFormularOptions<T>): Forms.Form;
    function vytvorHlavParam<T = any>(options: HlavickovyFormularOptions<T>): {};
    function PapRozsirenyPopis(parentContent: GContent, ixp: string, readOnly: boolean, agenda: string): void;
    interface KomentarOptions {
        readOnly: boolean;
        enabled: boolean;
    }
    function vytvorKomentarFormular(options: KomentarOptions): Forms.Form;
    function GridColumnDodavatele(vlozitPrFormu: boolean, typTabulky: string, doplnit: boolean): Data.GridFormat<any>;
}
declare namespace Gordic.Pap.WebControls {
    class GPapAddUpdHromEsuScr extends GContentBase {
        agenda: string;
        ixs_pri: string;
        ixp: string;
        ParVieVicesu: boolean;
        list: Interface.GXxxsesuHrDto[];
        cis_por: number;
        por_cis_nab: number;
        form: JQuery;
        novyZaznam: boolean;
        zaznam: Interface.GXxxsesuHrDto;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapHromEsuScr extends GContentBase {
        change: boolean;
        agenda: string;
        ixs_pri: string;
        ixp: string;
        list: Interface.GXxxsesuHrDto[];
        ParVieVicesu: boolean;
        readOnly: boolean;
        cis_por: number;
        nazev1: string;
        nazev2: string;
        form: JQuery;
        tab: JQuery;
        pole1: Date;
        pole2: string | null;
        private filter;
        gridSeznam: JQuery;
        dataView: Gordic.Data.View<Interface.GXxxsesuHrDto>;
        prepareContent(params: any): void;
        zneaktivnit(): void;
        getHodnota(): Decimal;
        getData(): {
            datum: any;
            nazev: any;
            list: Interface.GXxxsesuHrDto[];
        } | null;
        novy(): void;
        upravit(): void;
        NastavOkEnabled(enabled: boolean): void;
        dotaz(otazka: string): JQueryPromise<any>;
        isChanged(): boolean;
    }
}
declare namespace Gordic.Pap.WebControls {
    interface IGPrizCast {
        prizCast: string;
        /**
         * komentar
         * @type {number}
         */
        v: number;
    }
    class GIdentifikaceVZTabScr extends GContentBase {
        taskId: string;
        disabled: boolean;
        formatNenLomitko: boolean;
        zaznam: Gordic.Pap.Interface.GIdentVZDto;
        tab: JQuery;
        vzNenDisabled: boolean;
        zmena: boolean;
        prepareContent(params: any): void;
        ok(): JQuery.Promise<any, any, any> | undefined;
        closing(ok: any): JQuery.Promise<any, any, any>;
        NaplnData(dto: any): void;
        SeberData(): {};
        NaplnAnoNe(): JQueryPromise<IGPrizCast[]>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapObecnyInputScr extends GContentBase {
        form: JQuery;
        titulek: string;
        label: string;
        povinne: boolean;
        l_string: string;
        typ: string;
        input: string;
        prepareContent(params: any): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
        NastavOkEnabled(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPredaniDetailScr extends GContentBase {
        form: JQuery;
        titulek: string;
        identifikator: string;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        prepareContent(params: any): void;
        predani(): void;
        dotaz(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPreevidenceDetailScr extends GContentBase {
        form: JQuery;
        titulek: string;
        ixs_pri: string;
        ixp_den: string;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        prepareContent(params: any): void;
        preevidence(): void;
        dotaz(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPrevzetiDetailScr extends GContentBase {
        form: JQuery;
        titulek: string;
        identifikator: string;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        prepareContent(params: any): void;
        prevzeti(): void;
        dotaz(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPrideleniDetailScr extends GContentBase {
        form: JQuery;
        titulek: string;
        identifikator: string;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        prepareContent(params: any): void;
        prideleni(): void;
        dotaz(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapProcesScr extends GContentBase {
        agenda: string;
        soutez: string;
        ktg_typ: number;
        view: Gordic.Data.View<Gordic.Pap.Interface.GProcesDto>;
        form: JQuery;
        tab: JQuery;
        gridSeznam: JQuery;
        private filter;
        prepareContent(params: any): void;
        createColumns(): Data.GridFormat;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapRozsirenyPopisScr extends GContentBase {
        agenda: string;
        zaznam: Interface.GXxxvpopTransDto;
        readOnly: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
        dotaz(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapHistorieDodavateleTabScr extends GContentBase {
        ixs_dod: string;
        ixs_esu: string;
        tab: JQuery;
        private viewHlav;
        private gridHlav;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapFinancovaniScr extends GContentBase implements IGClientContent {
        ixs_pri: string;
        pri_pid: string;
        change: boolean;
        kompetent: string;
        isTskParam: boolean;
        private srvCnt;
        constPP: Gordic.Pap.Interface.GPapFinancovaniConstDto;
        agenda: string;
        gridSum: JQuery;
        grid: JQuery;
        tab: JQuery;
        puvCastka: Decimal;
        viewSum: Gordic.Data.View;
        view: Gordic.Data.View;
        private filterSum;
        prepareContent(params: any): void;
        nactiViewSum(): void;
        nactiView(): void;
        nastavTlacitka(): void;
        disable(): void;
        nova(): void;
        upravit(): void;
        vyresNavrat(): void;
        zmenaAktivity(aktivita: number): void;
        novaBezRO(): void;
        insertZaznam(cislo: string): void;
        schvaleni(): void;
        storno(): void;
        uvolneni(): void;
        zmenaFin(): void;
        pozadavky(): void;
        vlzrRoz(): void;
        closing(): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapSeznamFinancovaniScr extends GContentBase {
        taskId: string;
        agenda: string;
        ico: string;
        filter: JQuery;
        gridSum: JQuery;
        tab: JQuery;
        ivzrmvParam: boolean;
        isTskParam: boolean;
        viewSum: Gordic.Data.View;
        private filterSum;
        private previewController;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        private menubarparametry;
        onContentReady(): void;
        nastavTlacitka(): void;
        private registerPreview;
        naplnGrid(): Data.GridFormat<any>;
        addToComparison(rows: any): void;
        showComparison(rows: any): void;
        akceFinancovani(): void;
        dotaz(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pap.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsForm(): Forms.Form[];
}
declare namespace Gordic.Pap.WebControls {
    class GPapAddUpdPolozkaFinScr extends GContentBase {
        private srvCnt;
        agenda: string;
        change: boolean;
        isTskParam: boolean;
        constAddUpdFin: Gordic.Pap.Interface.GPapAddUpdFinConstDto;
        constPP: Pap.Interface.GPapFinancovaniConstDto;
        max_castka: Decimal;
        max_castka_rez: Decimal;
        castka: Decimal;
        zaznam: Pap.Interface.GXxxspolDto;
        form: JQuery;
        isTsk: string;
        novyZaznam: boolean;
        whereBuvl: string;
        prepareContent(params: any): void;
        naPlnDataNova(data: Pap.Interface.GRozpocetDto): void;
        ok(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        upsert(zaznam: Pap.Interface.GPapAddUpdFinDto): void;
        NaplnInsUpd(): Interface.GPapAddUpdFinDto;
        NastavOkEnabled(enabled: boolean): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    type TApplyDelegate = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamFinancovaniFiltersOptions(tema: string, Ico: string, cfuGf: Gordic.Data.GridFormat, applyDelegate: TApplyDelegate): IGFilterPanelOptions;
}
declare namespace Gordic.Pap.WebControls {
    class GPapKontrolaFinancovaniScr extends GContentBase {
        ixs_pri: string;
        tab: JQuery;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Data.Selectors {
    /**
    * AkceSelektor
    *
    * @author mvybiral
    * @since 482.1.0.3
    */
    class AkceSelektor<TRow = Pap.Interface.GRozpocetDto> extends BaseSelector<TRow> implements DefaultSelectorOptionsInternal<TRow> {
        /**
         * ixs_pri
         * @type {string}
         */
        private ixs_pri;
        title?: string;
        /**  multivyber, default = false */
        multi?: boolean;
        /**
           * gridOpts
           * @type {GGridOptions<any>}
           */
        gridOpts?: GGridOptions<any>;
        /**
          * serverFilters
          * @type {any}
          */
        serverFilters?: any;
        serverFiltersHandler?: ((param: any) => any);
        doNotSearch?: boolean;
        filterPanelOpts?: any;
        menuBar?: MenuParams[];
        statusBar?: MenuParams[];
        subTaskOpts?: MenuParams[] | Gordic.Prefabs.Selector.SubTasks.IGSubTasksDto | null;
        canSelectEmpty?: boolean;
        data: TRow[] | JQuery.Promise<TRow[]> | Gordic.Data.Readers.Base;
        gridFormat: Gordic.Data.GridFormat<TRow> | TRow[];
        content: IGClientContent;
        parent: HTMLElement | JQuery | Element;
        /**
         * constructor
         *
         * @param {BaseSelectorOptions} options
         * @param {UserSelectorOptions} userOptions
         */
        constructor(optionsIn: UserSelectorOptions & DefaultSelectorOptionsType<TRow>);
        /**
         *
         * @param options
         */
        show(options: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPlanRozpocetScr extends GContentBase implements IGClientContent {
        ixs_pri: string;
        title: string;
        grid: JQuery;
        tab: JQuery;
        formRoz: JQuery;
        view: Gordic.Data.View;
        private filter;
        prepareContent(params: any): void;
        ok(): void;
        refresh(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPozadavkyNovyScr extends GContentBase {
        view: Gordic.Data.View<Gordic.Pap.Interface.GSrvdixpDto>;
        form: JQuery;
        tab: JQuery;
        private filter;
        gridPozNovy: JQuery;
        prepareContent(params: any): void;
        nastavFilter(): void;
        nactiView(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPozadavkyScr extends GContentBase {
        ixp_prim: string;
        private srvCnt;
        constPP: Gordic.Pap.Interface.GPapPozadavkyConstDto;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        closing(): boolean;
        nastavTlacitka(): void;
        nova(): void;
        zmenaAktivity(): void;
        insertZaznam(zaznam: Gordic.Pap.Interface.GSrvdixpDto): void;
        upravit(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapUpdPozadavekScr extends GContentBase {
        private srvCnt;
        zaznam: Pap.Interface.GSrvdixpDto;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapUvolneniScr extends GContentBase {
        private srvCnt;
        agenda: string;
        ixs_pri: string;
        por_cis: number;
        constUvolneni: Gordic.Pap.Interface.GPapUvolneniConstDto;
        view: Gordic.Data.View<Gordic.Pap.Interface.GPapUvolneniDto>;
        form: JQuery;
        tab: JQuery;
        private filter;
        gridUvolneni: JQuery;
        private lastIndexId;
        prepareContent(params: any): void;
        nastavFilter(): void;
        nactiView(): void;
        createColumns(): Data.GridFormat;
        refreshCastka(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pap.WebControls.PapHromadneOperace {
    interface PapHromadneOperaceOptions {
        parentContent: GContent;
        agenda: string;
        data: Pap.Interface.GPapStruDto[] | JQueryPromise<Pap.Interface.GPapStruDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function PapHromadneOperace(options: PapHromadneOperaceOptions): void;
    function VratFormat1(pripad: boolean, isRza: boolean): Data.GridFormat<any>;
    function VratFormat(pripad: boolean): Data.GridFormat<any>;
    function PrXxxxx(options: PapPriHromadneOperaceOptions): void;
    function Preevidence(options: PapPriHromadneOperaceOptions): void;
    interface PapPriHromadneOperaceOptionsIn {
        parentContent: GContent;
        data: Pap.Interface.GPapStruDto[] | JQueryPromise<Pap.Interface.GPapStruDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        allDok: boolean | null;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        uvolneni: boolean;
        pripad: boolean;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    interface PapPriHromadneOperaceOptions {
        parentContent: GContent;
        data: Pap.Interface.GPapStruDto[] | JQueryPromise<Pap.Interface.GPapStruDto[]>;
        completeDelegate: (view: any) => void;
        allDok: boolean | null;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        akce: string | null;
        nazev: string | null;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function PapPriHromadneOperace(options: PapPriHromadneOperaceOptionsIn): void;
    function PreevidenceDokladuForm(PreevidenceParams: Pap.Interface.GParametryPreevidenceDto): Forms.Form;
    function PredaniDokladuForm(PredaniParams: Pap.Interface.GParametryPreevidenceDto): Gordic.Forms.Form;
    function PrideleniDokladuForm(PrideleniParams: Pap.Interface.GParametryPreevidenceDto): Gordic.Forms.Form;
    function PrevzetiDokladuForm(PrevzetiParams: Pap.Interface.GParametryPreevidenceDto): Gordic.Forms.Form;
    function getParamPredat(content: GContent, wiz: JQuery<HTMLElement>, vybraneDoklady: Gordic.Pap.Interface.GPapStruDto[]): JQueryPromise<Gordic.Pap.Interface.GHromPredatTiskDto>;
}
declare namespace Gordic.Pap.WebControls {
    class GPapVyberKnihuScr extends GContentBase {
        grid: JQuery;
        tab: JQuery;
        formCB: JQuery;
        view: Gordic.Data.View;
        rok: number;
        prepareContent(params: any): void;
        nastavOk(): void;
        nactiView(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapVyberKnihyScr extends GContentBase {
        grid: JQuery;
        tab: JQuery;
        formCB: JQuery;
        view: Gordic.Data.View;
        prepareContent(params: any): void;
        nastavOk(): void;
        nactiView(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapNavrhyScr extends GContentBase {
        private srvCnt;
        agenda: string;
        ixs_pri: string;
        constNavrhy: Gordic.Pap.Interface.GPapNavrhyConstDto;
        view: Gordic.Data.View<Gordic.Pap.Interface.GXxxsesuDto>;
        form: JQuery;
        tab: JQuery;
        private filter;
        gridSeznam: JQuery;
        formCheck: Gordic.Forms.Form;
        prepareContent(params: any): void;
        NaplnPopis(): JQueryPromise<IGPrizCast[]>;
        nastavTlacitka(): void;
        sablony(): void;
        sablonyNova(): void;
        generovatNavrhy(): void;
        prohlizetNavrhy(): void;
        nastavFilter(): void;
        nactiView(): void;
        createColumns(): Data.GridFormat;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapNavrhyProhlScr extends GContentBase {
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        closing(): boolean;
        nastavTlacitka(): void;
        smazat(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapAddUpdSablonyScr extends GContentBase {
        agenda: string;
        zaznam: Pap.Interface.GSmlUpdAddsblDto | null;
        form: JQuery;
        novyZaznam: boolean;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapSablonyScr extends GContentBase {
        grid: JQuery;
        tab: JQuery;
        agenda: string;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        closing(): boolean;
        nastavTlacitka(): void;
        nova(): void;
        smazat(): void;
        upravit(): void;
        vyresNavrat(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPlanTabScr extends GContentBase {
        ixs_pri: string;
        agenda: string;
        tab: JQuery;
        Rok: string;
        prepareContent(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapRozpisTabScr extends GContentBase {
        ixs_pri: string;
        agenda: string;
        tab: JQuery;
        nazevC_Par: string;
        view: Gordic.Isl.View;
        prepareContent(params: any): void;
        refresh(ixs_pri: string): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapVyberPorCisNabScr extends GContentBase {
        ixs_pri: string;
        ixs_esu: string;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        formCB: JQuery;
        view: Gordic.Data.View;
        private filter;
        prepareContent(params: any): void;
        nactiView(): void;
        ok(por_cis_nab: number): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapVyberPripadScr extends GContentBase {
        ixp: string;
        agenda: string;
        ixs_esu: string;
        ixs_pri: string;
        ixp_den: string;
        nabedo: boolean;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapVyberUkonScr extends GContentBase {
        ixs_pri: string;
        ixs_esu: string;
        agenda: string;
        soutez: string;
        por_cis_nab: number;
        zkratka: string;
        grid: JQuery;
        tab: JQuery;
        formCB: JQuery;
        view: Gordic.Data.View;
        private filter;
        prepareContent(params: any): void;
        nastavOk(): void;
        nactiView(): void;
        ok(): void;
        refresh(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPolozkyPlanuScr extends GContentBase {
        ixs_pri: string;
        kompetent: string;
        private srvCnt;
        constPP: Gordic.Pap.Interface.GPapPolozkyPlanuConstDto;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        change: boolean;
        private filter;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        nova(): void;
        zmenaAktivity(aktivita: number): void;
        novaBezRO(): void;
        novaMimo(): void;
        insertZaznam(cislo: string, ixs_cia: string): void;
        closing(): boolean;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPolozkyPlanuSeznamBrScr extends GContentBase {
        ixs_pri: string;
        kompetent: string;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        prepareContent(params: any): void;
        ok(): void;
        nastavTlacitka(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPolozkyPlanuSeznamMimoScr extends GContentBase {
        ixs_pri: string;
        kompetent: string;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        prepareContent(params: any): void;
        ok(): void;
        nastavTlacitka(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapPolozkyPlanuSeznamScr extends GContentBase {
        kompetent: string;
        agenda: string;
        tab: JQuery;
        grid: JQuery;
        view: Gordic.Data.View;
        prepareContent(params: any): void;
        ok(): void;
        nastavTlacitka(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapSchvalitParamScr extends GContentBase {
        private srvCnt;
        agenda: string;
        ixs_pri: string;
        constPP: Gordic.Pap.Interface.GPapSchvalParamConstDto;
        form: JQuery;
        puvCastka: Decimal;
        novyZaznam: boolean;
        prepareContent(params: any): void;
        ok(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Pap.AppSettings {
    function AutorLogu(): Forms.Form;
    function DokLimits(): Forms.Form;
    function SeznamDokElDok(): Forms.Form;
    function SeznamUkonLimits(): Forms.Form;
    function SeznamPamatovat(): Forms.Form;
    function DashBoardMez1(): Forms.Form;
    function DashBoardMez3(): Forms.Form;
    function DashBoardMez4(): Forms.Form;
    function DashBoardPocetKnih(): Forms.Form;
    function SeznamAllData(): Forms.Form;
    function SeznamRefresh(): Forms.Form;
}
declare namespace Gordic.Pap.WebControls {
    class GPapSmlouvyTabScr extends GContentBase {
        param1: string;
        param2: string;
        tab: JQuery;
        prepareContent(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GObecneTiskyScr extends GContentBase implements IGClientContent {
        taskId: string;
        form: JQuery;
        readOnly: boolean;
        agenda: string;
        konpla: boolean;
        gridSeznam: JQuery;
        view: Gordic.Data.View;
        poleKnih: string[];
        enableTiskySUAkce: boolean;
        prepareContent(params: any): void;
        columns(): Data.GridFormat<any>;
        nactiView(): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapRozpoctoveZapisyTabScr extends GContentBase {
        ixs_pri: string;
        tab: JQuery;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Pap.WebControls {
    class GPapZpravaDsgTabScr extends GContentBase {
        priznak: number;
        pripojGinsfun: boolean;
        aktivni: boolean;
        hodnota: string;
        tab: JQuery;
        prepareContent(): void;
    }
}
