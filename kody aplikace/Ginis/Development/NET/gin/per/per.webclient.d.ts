declare namespace Gordic.Per.WebClient {
}
declare namespace Gordic.Per.WebClient {
    /** Zjistí uznané měsíce v daném roce */
    function zjistiUznaneMesice(rok: number, ixs_ppv: string, minDatum: Date, maxDatum: Date, programDto: Interface.GEvidenceFKSPDto, zmenyPpvDtos: Interface.GZmenyPPVDto[], vynetiArray: Interface.GVynetiDto[]): number;
    /**Zjistí poslední změnu důvodu ukončení*/
    function zjistiPidPosZmenuDuvu(ixs_ppv: string, zmenyPPVDtos: Interface.GZmenyPPVDto[]): string | null | undefined;
    /**
     * Zjistí zda bylo vynětí v daném období
     * @param datumOd Datum od
     * @param datumDo Datum do
     * @param vynetiDtos Vynětí
     * @param celeObdobi Zda musí mít celé období vynětí
     */
    function jeVynObdobi(datumOd: Date | JsonDate, datumDo: Date | JsonDate, vynetiDtos: Interface.GVynetiDto[], celeObdobi: boolean): boolean;
    /**Pro daný den zjistí úvazek PPV*/
    function zjistiUvazek(den: Date | JsonDate, ixs_ppv: string, zmenyPPVDtos: Interface.GZmenyPPVDto[]): Decimal | null;
    /**Zjistí platnou částku pro oblast rozpočtu*/
    function zjistiPlanCastkuOso(ixs_esu: string | null | undefined, ixs_sop: string | null | undefined, datum: Date | JsonDate | null, castkySocProgram: Interface.GCastkyFKSPDto[], castkyDleOce: boolean, content: GContent): JQuery.Promise<Interface.GCastkyFKSPDto[] | null, any, any>;
    /**Zjistí platnou částku pro oblast rozpočtu*/
    function zjistiPlanCastku(ixs_sop: string, datum: Date | JsonDate | null, ixsOcePole: string[] | null, castkySocProgram: Interface.GCastkyFKSPDto[], content: GContent): JQuery.Promise<Interface.GCastkyFKSPDto[] | null, any, any>;
    /**Zjistí platnou částku pro oblast rozpočtu*/
    function zjistiPlanCastkuOce(ixs_sop: string, datum: Date | JsonDate | null, ixs_oce: string, castkySocProgram: Interface.GCastkyFKSPDto[], content: GContent): JQuery.Promise<Interface.GCastkyFKSPDto[] | null, any, any>;
    /**
     *
     * @param content
     * @param rok
     * @returns
     */
    function getAktPPVOso(content: GContent, rok: number | null, osobaDto: Interface.GOsobaFKSPDto, ppvDtos: Interface.GPracovniPomeryDto[]): JQuery.Promise<Interface.GPracovniPomeryDto | null, any, any>;
    function getAktZmenaPPVOso(content: GContent, aktPpvOso: Interface.GPracovniPomeryDto, zmenyPpvDtos: Interface.GZmenyPPVDto[]): JQuery.Promise<Interface.GZmenyPPVDto | null, any, any>;
    function getMinMaxOso(content: GContent, programDto: Interface.GEvidenceFKSPDto, aktPpvOso: Interface.GPracovniPomeryDto, aktZmenaPpvOso: Interface.GZmenyPPVDto, ppvDtos: Interface.GPracovniPomeryDto[]): JQuery.Promise<{
        datMin: Date | JsonDate;
        datMax: Date | JsonDate;
    }, any, any>;
    function createRozpocetOsoDto(content: GContent, osoDto: Interface.GOsobaFKSPDto, programDto: Interface.GEvidenceFKSPDto, castka: Decimal | JsonDecimal | null, maxCastka: Decimal | JsonDecimal | null, rok: number, datOdPlan: Date | null, datDoPlan: Date | null, datOd: Date | null, datDo: Date | null): Interface.GRozpocetFKSPOsoDto;
    function zjistiPlanCastkuRok(rok: number | null | undefined, ixs_sop: string | null | undefined, castkySocProgram: Interface.GCastkyFKSPDto[], vracetNull?: boolean): Decimal | null;
    function zjistiZPSMesice(rok: number, ixs_esu: string, ixs_ppv: string, minDatum: Date, maxDatum: Date, programDto: Interface.GEvidenceFKSPDto, zpsDtos: Interface.GZPSDto[], vynetiDtos: Interface.GVynetiDto[]): number;
    function generovaniDtoZasluhovaCast(content: GContent, programDto: Interface.GEvidenceFKSPDto, castkySocProgramDtos: Interface.GCastkyFKSPDto[], ppvDtos: Interface.GPracovniPomeryDto[], zmenyPpvDtos: Interface.GZmenyPPVDto[], vynetiDtos: Interface.GVynetiDto[], rozpocetOsoDtos: Interface.GRozpocetFKSPOsoDto[], ixs_hci_dcsp: string | null, poznamka: string | null, prepis: boolean, osoby: Interface.GOsobaFKSPDto[]): JQuery.Promise<Interface.GRozpocetFKSPOsoDto[], any, any>;
    function zjistiDatPosZmenuDuvu(ixs_ppv: string, zmenyPPVDtos: Interface.GZmenyPPVDto[]): Date | null;
    function generovaniDtoDuchodovaCast(content: GContent, programDto: Interface.GEvidenceFKSPDto, castkySocProgram: Interface.GCastkyFKSPDto[], zmenyPPVDto: Interface.GZmenyPPVDto[], existRozpocetOsoDto: Interface.GRozpocetFKSPOsoDto[], ixs_hci_dcsp: string | null, poznamka: string | null, prepis: boolean, osoby: Interface.GOsobaFKSPDto[]): JQuery.Promise<Interface.GRozpocetFKSPOsoDto[], any, any>;
    function zjistiSkutecnouCastkuRozpocet(rok: number, castka: Decimal | null, ixs_ppv: string, dat_uvazku: Date, minDatum: Date, maxDatum: Date, programDto: Interface.GEvidenceFKSPDto, zmenyPPVDtos: Interface.GZmenyPPVDto[], vynetiDtos: Interface.GVynetiDto[]): Decimal;
    function generovaniDtoRozpoctovaCast(content: GContent, programDto: Interface.GEvidenceFKSPDto, castkySocProgram: Interface.GCastkyFKSPDto[], rok: number, castka: Decimal | JsonDecimal | null, dat_od: Date | JsonDate | null, dat_do: Date | JsonDate | null, ixs_hci_dcsp: string, poznamka: string, vynetiDtos: Interface.GVynetiDto[], zmenyPPVDtos: Interface.GZmenyPPVDto[], existRozpocetOsoDtos: Interface.GRozpocetFKSPOsoDto[], prepis: boolean, plat_posun: boolean, osoby: Interface.GOsobaFKSPDto[]): JQuery.Promise<Interface.GRozpocetFKSPOsoDto[], any, any>;
    function zjistiSkutecnouCastkuZPS(rok: number, castka: Decimal, ixs_esu: string, ixs_ppv: string, dat_uvazku: Date, minDatum: Date, maxDatum: Date, programDto: Interface.GEvidenceFKSPDto, zmenyPpvDtos: Interface.GZmenyPPVDto[], zpsDtos: Interface.GZPSDto[], vynetiDtos: Interface.GVynetiDto[]): Decimal;
    function generovaniDtoZPSCast(content: GContent, programDto: Interface.GEvidenceFKSPDto, castkySocProgram: Interface.GCastkyFKSPDto[], rok: number, castka: Decimal | null, dat_od: Date | null, dat_do: Date | null, ixs_hci_dcsp: string, poznamka: string, zpsDtos: Interface.GZPSDto[], vynetiDtos: Interface.GVynetiDto[], zmenyPPVDtos: Interface.GZmenyPPVDto[], existRozpocetOsoDtos: Interface.GRozpocetFKSPOsoDto[], prepis: boolean, plat_posun: boolean, osoby: Interface.GOsobaFKSPDto[]): JQuery.Promise<Interface.GRozpocetFKSPOsoDto[], any, any>;
}
declare namespace Gordic.Per.WebClient {
    class GAdmKaret extends GContentBase {
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailAdmKarty extends GContentBase {
        protected PrukazDto: Interface.GAdmPrukazyDto;
        protected PrukazyList: Interface.GAdmPrukazyDto[];
        protected Action: WebControls.EnumActions;
        protected ParametrPerRCZobr: boolean;
        protected JeMPO: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected DebugMode: boolean;
        private readonly tabDetailId;
        private readonly tabPrideleniId;
        private grid;
        private gridView;
        private gtabmanager;
        private isSaved;
        onContentReady(): void;
        private loadData;
        private setReadOnly;
        private getGridFormat;
        private updateSaveButton;
        private getCisloDok;
        private dotazPredUlozenim;
        private loadDataPouziti;
    }
}
declare namespace Gordic.Per.WebClient {
    /** Historie */
    class GPerHistorie extends GContentBase {
        private grid;
        /** identifikator dokumentu/spisu */
        private Ixp;
        /** element gridu */
        /** element parentu nahledu */
        private elNahledParent;
        /** vstupní dto */
        private InputDto;
        /** Zobrazení náhledu elektronického souboru */
        private gin_ele_dmspres;
        ID: string;
        taskId: string;
        onContentReady(): void;
        createSpecificMenu(): MenuParams[];
        private openAttachment;
        createSpecificSubtask(): void;
        private setActionsState;
        private updateActionFileVyriz;
        createSpecificGridFormat(format: Data.GridFormat): Data.GridFormat<any>;
        private getFormatRedistribuce;
        private gridBuilderRedistribuce;
        private getFormatTisky;
        private gridBuilderTisky;
        private rowSchvalovani;
        private gridBuilderSchvalovani;
        private updateSidebar;
        private createSidebarSchvalovani;
        private createPanelNahled;
        private preCreateAttachment;
        private createAttachment;
        private removeAttachment;
        private addColumnsSchvalovani;
        initHistory(): void;
        private createMenubar;
        createDefaultMenu(printActionOps?: any, wflHideAddButton?: boolean): MenuParams[];
        private add;
        private createDefaultGridFormat;
        private gridBuilderZmeny;
        /**
         * přidat názvy sloupců do řetězce
         */
        private getStringNamesOfColumns;
        /** sloupce na prohledávání */
        private getSearchColumns;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GDetailCerpani extends GContentBase {
        protected dtoRozpocetFKSPOso: Gordic.Per.Interface.GRozpocetFKSPOsoDto;
        Action: WebControls.EnumActions;
        Ixssop: string;
        Ixshciocsp: string;
        Rok: any;
        Ixsesu: string;
        private RemoteService;
        Podrobne: boolean;
        Nacteni: any;
        Mesic_od: any;
        Mesic_do: any;
        private view;
        onContentReady(): void;
        private updateSaveButton;
        private prepocetCelkovychCastek;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GDetailVlastnihoCerpani extends GContentBase {
        protected dtoCerpaniFKSPOso: Gordic.Per.Interface.GCerpaniFKSPOsoDto;
        protected dtoRozpocetFKSPOso: Gordic.Per.Interface.GRozpocetFKSPOsoDto;
        protected valDetail: any;
        private RemoteService;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        private updateSaveButton;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GNastaveniCerpani extends GContentBase {
        /**Osoby, kterým se nastaví čerpání*/
        /**DTOs, se kterými se pracuje*/
        private readonly DtosRozpocet;
        private readonly IxsSop;
        private readonly Rok;
        private readonly PocetOsob;
        private readonly PidOblastCerVse;
        private mesicOd;
        private mesicDo;
        private cPlan;
        private forms;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOsoFKSPRoz extends GContentBase {
        protected OsobaFKSPDto: Interface.GOsobaFKSPDto;
        protected JeCS: boolean;
        protected JeCT: boolean;
        protected ListSocProgramy: Interface.GEvidenceFKSPDto[];
        protected PidOblastCerVse: string;
        protected VynPosunCT: string[];
        protected DcspPidOstatniVse: string[];
        protected OcspPidOstatniVse: string[];
        protected SeznamVazbyOst: Interface.GGinvobjDto[];
        private isChange;
        private rozpocetOsoDtos;
        private rozpocetProgramDto;
        private zasluhyProgramDto;
        private postizeniProgramDto;
        private duchodProgramDto;
        private ostatniProgramDto;
        private zpsDtos;
        private sopPidOstatni;
        private castkySocProgramDtos;
        private vynetiDtos;
        private ppvDtos;
        private zmenyPpvDtos;
        private readonly idTabPrehled;
        private readonly idTabRozpocet;
        private readonly idTabZasluha;
        private readonly idTabZdravPostizeni;
        private readonly idTabDuchod;
        private readonly idTabOstNaroky;
        private readonly idTabCerpani;
        private readonly rowNameRozpocet;
        private readonly rowNameZasluha;
        private readonly rowNamePostizeni;
        private readonly rowNameDuchod;
        private readonly rowNameOstatni;
        private gridRozpocet;
        private gridZasluhy;
        private gridPostizeni;
        private gridDuchod;
        private gridNaroky;
        private gridCerpani;
        private gridZanik;
        private groups;
        onContentReady(): void;
        private loadData;
        private setPrehled;
        private getGridFormatZanikleCastky;
        private getGridFormatRozpocet;
        private getGridFormatCerpani;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamFKSP extends GContentBase {
        private Rok;
        private Ixssop;
        private view;
        private Ixshciocsp;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GIndividualniCerpani extends GContentBase {
        private readonly Action;
        private readonly IxsSop;
        private readonly Rok;
        private readonly Dtos;
        private readonly PidOblastCerVse;
        private grid;
        private view;
        private jeZmena;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GRozpocetFKSP extends GContentBase {
        protected dtoRozpocetFKSP: Gordic.Per.Interface.GRozpocetFKSPDto;
        private readonly PidOblastCerVse;
        Action: WebControls.EnumActions;
        Ixssop: string;
        Ixshciocsp: string;
        Rok: any;
        PocetOsob: number;
        private readonly idZarOsobyTab;
        private readonly idOblastiHromCerpaniTab;
        private groups;
        private sectionCerpaniCount;
        private sectionOblasti;
        /**Seznam už existujících rozpočtů*/
        private listRozpocet;
        /**Všechny oblasti čerpání sociálního programu*/
        private oblastiCerpani;
        /**DTO, který bude vždy ixs_hci_ocsp='0000BHR09MOE' (Vše) */
        private rozpocetDto;
        /**DTOS se kterými se pracuje*/
        private dtos;
        private view;
        private novaData;
        private jeZmenaOsob;
        private jeZmenaIndivOblasti;
        private jeZmenaHromadOblasti;
        private formHromCerpaniDiv;
        private grid;
        private tabmanager;
        onContentReady(): void;
        private loadData;
        private getGridFormat;
        private updateSaveButton;
        private isChange;
        private nastaveniCerpaniOso;
        private zustatek;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsobVyber extends GContentBase {
        protected dtoRozpocetFKSPOso: Gordic.Per.Interface.GRozpocetFKSPOsoDto;
        /**Osoby už přiřazené k čerpání*/
        private listOsobyCerpani;
        private readonly ParametrPerPovStatZam;
        private filterDto;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailVlastnihoCerpaniRoz extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected CerpaniDto: Interface.GCerpaniFKSPOsoDto | null;
        protected RozpocetDtos: Interface.GRozpocetFKSPOsoDto[];
        protected CerpaniDtos: Interface.GCerpaniFKSPOsoDto[];
        protected PpvDtos: Interface.GPracovniPomeryDto[];
        protected JeCT: boolean;
        protected JeCS: boolean;
        protected PidOblastCerVse: string;
        protected PovelenaDrpp: string[];
        protected SopPidOstatni: string[];
        protected SeznamVazbyOst: Interface.GGinvobjDto[];
        protected DcspPidOstatniVse: string[];
        private isSaved;
        private isDoplatek;
        private zapocitat;
        private isNew;
        private readOnly;
        onContentReady(): void;
        private getGridFormatSelectBox;
        private updateSaveButton;
        private setCerpaniDoplatek;
        private setReadOnly;
        private setRozpocet;
        private prepocet;
        private kontrolaCerpani;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOsoDuchodSet extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected OsobaDto: Interface.GOsobaFKSPDto;
        protected ProgramDto: Interface.GEvidenceFKSPDto;
        protected RozpocetVseDtos: Interface.GRozpocetFKSPOsoDto[];
        protected CerpaniDtos: Interface.GCerpaniFKSPOsoDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected PPVDtos: Interface.GPracovniPomeryDto[];
        protected ZmenyPPVDtos: Interface.GZmenyPPVDto[];
        protected VynetiDtos: Interface.GVynetiDto[];
        protected RozpocetDto: Interface.GRozpocetFKSPOsoDto;
        protected JeCT: boolean;
        protected JeCS: boolean;
        protected PidOblastCerVse: string;
        private aktPpvOso;
        private aktZmenaPpv;
        private minDatum;
        private maxDatum;
        private isNewDto;
        private isSaved;
        private rozpocetDtos;
        onContentReady(): void;
        private loadData;
        private setReadOnly;
        private updateSaveButton;
        private nastaveniObdobi;
        private zjistiSkutCastku;
        private zjistiPlanCastku;
        private odpraMesice;
        private zjistiPopis;
        private kontrolaHodnot;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOsoOstatniSet extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected OsobaDto: Interface.GOsobaFKSPDto;
        protected ProgramDto: Interface.GEvidenceFKSPDto;
        protected RozpocetVseDtos: Interface.GRozpocetFKSPOsoDto[];
        protected CerpaniDtos: Interface.GCerpaniFKSPOsoDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected PPVDtos: Interface.GPracovniPomeryDto[];
        protected ZmenyPPVDtos: Interface.GZmenyPPVDto[];
        protected VynetiDtos: Interface.GVynetiDto[];
        protected RozpocetDto: Interface.GRozpocetFKSPOsoDto;
        protected JeCT: boolean;
        protected JeCS: boolean;
        protected PidOblastCerVse: string;
        protected OmezitCleneni: boolean;
        protected DcspPidOstatniVse: string[];
        private aktPpvOso;
        private aktZmenaPpv;
        private minDatum;
        private maxDatum;
        private isNewDto;
        private isSaved;
        onContentReady(): void;
        private loadData;
        private setReadOnly;
        private updateSaveButton;
        private zjistiSkutCastku;
        private odpraMesice;
        private kontrolaHodnot;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOsoPostizeniSet extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected OsobaDto: Interface.GOsobaFKSPDto;
        protected ProgramDto: Interface.GEvidenceFKSPDto;
        protected RozpocetVseDtos: Interface.GRozpocetFKSPOsoDto[];
        protected CerpaniDtos: Interface.GCerpaniFKSPOsoDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected PPVDtos: Interface.GPracovniPomeryDto[];
        protected ZmenyPPVDtos: Interface.GZmenyPPVDto[];
        protected VynetiDtos: Interface.GVynetiDto[];
        protected RozpocetDto: Interface.GRozpocetFKSPOsoDto;
        protected JeCT: boolean;
        protected JeCS: boolean;
        protected PidOblastCerVse: string;
        protected ZpsDtos: Interface.GZPSDto[];
        private isSaved;
        private aktPpvOso;
        private aktZmenaPpv;
        private minDatum;
        private maxDatum;
        private isNewDto;
        onContentReady(): void;
        private loadData;
        private updateSaveButton;
        private setReadOnly;
        private kontrolaHodnot;
        private zjistiPlanCastku;
        private nastaviZPSCastOso;
        private zjistiPopis;
        private getNastaveniObdobiCastku;
        private getNastaveniObdobiCastky;
        private zjistiSkutecnouCastku;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOsoRozpocetSet extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected OsobaDto: Interface.GOsobaFKSPDto;
        protected ProgramDto: Interface.GEvidenceFKSPDto;
        protected RozpocetVseDtos: Interface.GRozpocetFKSPOsoDto[];
        protected CerpaniDtos: Interface.GCerpaniFKSPOsoDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected PPVDtos: Interface.GPracovniPomeryDto[];
        protected ZmenyPPVDtos: Interface.GZmenyPPVDto[];
        protected VynetiDtos: Interface.GVynetiDto[];
        protected RozpocetDto: Interface.GRozpocetFKSPOsoDto;
        protected PovolenaDrpp: string[];
        protected PidOblastCerVse: string;
        protected JeCT: boolean;
        protected VynPosunCT: string[];
        protected JeCS: boolean;
        private aktPpvOso;
        private aktZmenaPpv;
        private minDatum;
        private maxDatum;
        private isNewDto;
        private isSaved;
        onContentReady(): void;
        private loadData;
        private setReadOnly;
        private updateSaveButton;
        private zjistiPopis;
        private getNastaveniObdobiCastku;
        private getNastaveniObdobiCastky;
        private nastavRozpoctovaCastOso;
        private getSkutCastku;
        private getPlanCastku;
        private kontrolaHodnot;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOsoZasluhySet extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected OsobaDto: Interface.GOsobaFKSPDto;
        protected ProgramDto: Interface.GEvidenceFKSPDto;
        protected RozpocetVseDtos: Interface.GRozpocetFKSPOsoDto[];
        protected CerpaniDtos: Interface.GCerpaniFKSPOsoDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected PPVDtos: Interface.GPracovniPomeryDto[];
        protected ZmenyPPVDtos: Interface.GZmenyPPVDto[];
        protected VynetiDtos: Interface.GVynetiDto[];
        protected RozpocetDto: Interface.GRozpocetFKSPOsoDto;
        protected JeCT: boolean;
        protected JeCS: boolean;
        protected PidOblastCerVse: string;
        private aktPpvOso;
        private aktZmenaPpv;
        private minDatum;
        private maxDatum;
        private isNewDto;
        private isSaved;
        private rozpocetDtos;
        onContentReady(): void;
        private updateSaveButton;
        private setReadOnly;
        private loadData;
        private nastaveniObdobi;
        private getPoslZmenuPraxe;
        private odpraMesice;
        private zjistiPopis;
        private zjistiPlanCastku;
        private zjistiSkutCastku;
        private kontrolaHodnot;
    }
}
declare namespace Gordic.Per.WebClient {
    class GRozSeznamFKSP extends GContentBase {
        protected JeCT: boolean;
        protected DebugMode: boolean;
        protected ListSocProgramy: Interface.GEvidenceFKSPDto[];
        protected ParametrZdaLogovatGDPR: boolean;
        protected PovolenaDrpp: string[];
        private listFKSP;
        private grid;
        private readonly oddelovac;
        onContentReady(): void;
        private getGridFormat;
        private initMistoHledaneHodnoty;
        private initTypOsob;
        private initTypKonta;
    }
}
declare namespace Gordic.Per.WebClient {
    class GGenSeznamNeOsob extends GContentBase {
        protected Osoby: Interface.GOsobaFKSPDto[];
        protected Text: string;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GHrGenBenefit extends GContentBase {
        protected VybraneOsobyDtos: Interface.GOsobaFKSPDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected JeOce: boolean;
        protected ListSocProgramy: Interface.GEvidenceFKSPDto[];
        protected PidCastRozpocet: string;
        protected PidCastZasluhy: string;
        protected PidCastPostizeni: string;
        protected PidCastDuchod: string;
        protected PovelenaDrpp: string[];
        protected PidOblastCerVse: string;
        protected JeCS: boolean;
        protected JeCT: boolean;
        protected VynPosunCT: string[];
        private programDto;
        private zmenyPpvDtos;
        private vynetiDtos;
        private zpsDtos;
        private ppvDtos;
        private rozpocetOsoDtos;
        private isChange;
        private readonly sectionRozpoctovaCastName;
        private readonly sectionZdravPostizeniName;
        private readonly sectionRozpoctovaCastPlatName;
        private readonly sectionZdravPostizeniPlatName;
        onContentReady(): void;
        private loadData;
        private setRadios;
        private vyberOsob;
        private prepisObdobiRozpoctovaCast;
        private prepisObdobiZPSCast;
        private updateSaveButton;
    }
}
declare namespace Gordic.Per.WebClient {
    class GHrGenCerpani extends GContentBase {
        protected VybraneOsobyDtos: Interface.GOsobaFKSPDto[];
        protected CastkySocProgramDtos: Interface.GCastkyFKSPDto[];
        protected JeCS: boolean;
        protected JeCT: boolean;
        protected PidOblastCerVse: string;
        protected PovelenaDrpp: string[];
        private rozpocetOsoDtos;
        private isChange;
        onContentReady(): void;
        private getGridFormatSelectBox;
        private vyberOsob;
    }
}
declare namespace Gordic.Per.WebClient {
    class GCastkyDetail extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected DtoCastka: Interface.GCastkyFKSPDto;
        protected IxsSop: string;
        protected JePevObdobi: boolean;
        protected JeOce: boolean;
        protected DtosCastky: Interface.GCastkyFKSPDto[];
        onContentReady(): void;
        private updateSaveButton;
    }
}
declare namespace Gordic.Per.WebClient {
    class GCastkySeznam extends GContentBase {
        protected IxsSop: string;
        protected JePevObdobi: boolean;
        protected JeOce: boolean;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailPerssopRoz extends GContentBase {
        protected DtoEvidence: Interface.GEvidenceFKSPDto;
        protected Action: WebControls.EnumActions;
        protected PidCastRozpocet: string;
        protected PidCastPostizeni: string;
        private vynetiVyjimky;
        onContentReady(): void;
        private loadData;
        private updateSaveButton;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GTbDataPerssop extends GContentBase {
        protected valDetail: any;
        protected ParametrPerRozsireniCerBen: boolean;
        Action: WebControls.EnumActions;
        private view;
        Ixshciocsp: string;
        private grid;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GTbDataPerssopDetail extends GContentBase {
        protected dtoEvidence: Gordic.Per.Interface.GEvidenceFKSPDto;
        protected valDetail: any;
        Action: WebControls.EnumActions;
        Ixshciocsp: string;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GVynetiVyjimky extends GContentBase {
        protected Vyneti: string;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailDavkaISoSS extends GContentBase {
        protected IxsOss: string;
        protected HlavickaDavky: Per.Interface.GPERSOSSDto;
        protected TypDat: WebControls.TypDat;
        protected PERCZSZ: Per.Interface.GIsossPerczszDto[];
        private readonly idTabOdpovedi;
        private readonly idTabHlaseni;
        private accId;
        private tabmanager;
        private grid_odp;
        private gridOdpDiv;
        private grid_hla;
        private gridHlaDiv;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GKomunikaceISoSS extends GContentBase {
        protected IsEkoInitialized: boolean;
        protected Rok: number;
        protected Obdobi: number;
        protected DebugMode: boolean;
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected IsossReady: boolean;
        protected GinIsossReady: number;
        /**Seznam povinnosti vyplnění jednotlivých elementů dávek*/
        protected PERCZSZ: Per.Interface.GIsossPerczszDto[];
        private filter;
        private editace;
        private XMLDownloaded;
        private filterpanel;
        private grid;
        onContentReady(): void;
        private GetColumnList;
        private GetGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GOdpovediISoSS extends GContentBase {
        private grid;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GZaznamBI11Detail extends GContentBase {
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected PERCZSZ: Per.Interface.GIsossPerczszDto[];
        protected DtoDetail: Per.Interface.GPERSZSZDto;
        protected PriznakHist: boolean;
        private form_hlavicka;
        private form_detail;
        private grid;
        private tabmanager;
        private zorbBtn;
        private XMLDownloaded;
        private isChanged;
        private actHistDto;
        private readonly idDetailTab;
        private readonly idHistorieTab;
        onContentReady(): void;
        /**Vytvoření formulářů a gridu na základě validace na serveru a jejich naplnění*/
        private LoadData;
        /**
         * Získání formuláře pro detail záznamu
         * @param validace Seznam validací a povinností
         * @returns formbuilder
         */
        private CreateFormBuilderDetail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GZaznamBI13Detail extends GContentBase {
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected PERCZSZ: Per.Interface.GIsossPerczszDto[];
        protected DtoDetail: Per.Interface.GPERSDSZDto;
        protected PriznakHist: boolean;
        private form_hlavicka;
        private form_detail;
        private grid;
        private tabmanager;
        private zorbBtn;
        private XMLDownloaded;
        private isChanged;
        private actHistDto;
        private readonly idDetailTab;
        private readonly idHistorieTab;
        onContentReady(): void;
        /**Vytvoření formulářů a gridu na základě validace na serveru a jejich naplnění*/
        private LoadData;
        /**
         * Získání formuláře pro detail záznamu
         * @param validace Seznam validací a povinností
         * @returns formbuilder
         */
        private CreateFormBuilderDetail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GZaznamBI1Detail extends GContentBase {
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected DtoDetail: Per.Interface.GPERSNSZDto;
        protected PriznakHist: boolean;
        private form_hlavicka;
        private form_detail;
        private grid;
        private tabmanager;
        private zorbBtn;
        private XMLDownloaded;
        private isChanged;
        private readonly idDetailTab;
        private readonly idHistorieTab;
        private actHistDto;
        onContentReady(): void;
        /**Vytvoření formulářů a gridu na základě validace na serveru a jejich naplnění*/
        private LoadData;
        /**
         * Získání formuláře pro detail záznamu
         * @param validace Seznam validací a povinností
         * @returns formbuilder
         */
        private CreateFormBuilderDetail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GZaznamBI3Detail extends GContentBase {
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected PERCZSZ: Per.Interface.GIsossPerczszDto[];
        protected DtoDetail: Per.Interface.GPERSZSZDto;
        protected PriznakHist: boolean;
        private form_hlavicka;
        private form_detail;
        private grid;
        private tabmanager;
        private zorbBtn;
        private XMLDownloaded;
        private isChanged;
        private readonly idDetailTab;
        private readonly idHistorieTab;
        private actHistDto;
        onContentReady(): void;
        /**Vytvoření formulářů a gridu na základě validace na serveru a jejich naplnění*/
        private LoadData;
        /**
         * Získání formuláře pro detail záznamu
         * @param validace Seznam validací a povinností
         * @returns formbuilder
         */
        private CreateFormBuilderDetail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GZaznamBI5Detail extends GContentBase {
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected DtoDetail: Per.Interface.GPERSDSZDto;
        protected PriznakHist: boolean;
        private form_hlavicka;
        private form_detail;
        private grid;
        private tabmanager;
        private zorbBtn;
        private XMLDownloaded;
        private isChanged;
        private readonly idDetailTab;
        private readonly idHistorieTab;
        private actHistDto;
        onContentReady(): void;
        /**Vytvoření formulářů a gridu na základě validace na serveru a jejich naplnění*/
        private LoadData;
        /**
         * Získání formuláře pro detail záznamu
         * @param validace Seznam validací a povinností
         * @returns formbuilder
         */
        private CreateFormBuilderDetail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GZaznamBI9Detail extends GContentBase {
        protected SpecUPAM: boolean;
        protected KodOvm: string;
        protected PERCZSZ: Per.Interface.GIsossPerczszDto[];
        protected DtoDetail: Per.Interface.GPERSNSZDto;
        protected PriznakHist: boolean;
        private form_hlavicka;
        private form_detail;
        private grid;
        private tabmanager;
        private zorbBtn;
        private XMLDownloaded;
        private isChanged;
        private actHistDto;
        private readonly idDetailTab;
        private readonly idHistorieTab;
        onContentReady(): void;
        /**Vytvoření formulářů a gridu na základě validace na serveru a jejich naplnění*/
        private LoadData;
        /**
         * Získání formuláře pro detail záznamu
         * @param validace Seznam validací a povinností
         * @returns formbuilder
         */
        private CreateFormBuilderDetail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GInfoPanel extends GContentBase {
        private descPanel;
        private normalBar;
        private divGrids;
        private tabmanager;
        private idTab;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GInfoPanelOld extends GContentBase {
        private JeCT;
        private JeBIS;
        private JeSZPI;
        private JeKUSK;
        private DebugMode;
        private ParametrPerPovStatZam;
        private ParametrPerPovZoz;
        private ParametrPevPriUredZk;
        private ParametrPerPschlZSM;
        private ParametrPerPovSchl;
        private ParametrPerPovMen;
        private ParametrPerSVzdSk;
        private viewInfoDuchod;
        private viewInfoDobaUrcita;
        private viewInfoZkusDoba;
        private viewInfoNovyPlatVymer;
        private viewInfoZravProhlidka;
        private viewInfoVyneti;
        private viewInfoVyroci;
        private viewInfoPracVyroci;
        private viewInfoUredZk;
        private viewInfoDnySkoleni;
        private viewInfoNeschvalene;
        private viewInfoVyberRizeni;
        private viewInfoProbihajiciMentoring;
        private viewInfoMentoring;
        private viewKonceZar;
        private viewInfoVysledkyHod;
        private viewInfoHomeOffice;
        private viewInfoVykonFunkce;
        private viewDoplUdaje;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GInfoPanelOld_v2 extends GContentBase {
        private readonly JeCT;
        private readonly JeBIS;
        private readonly JeSZPI;
        private readonly JeKUSK;
        private readonly ParametrPerPovStatZam;
        private readonly ParametrPerPovZoz;
        private readonly ParametrPevPriUredZk;
        private readonly ParametrPerPschlZSM;
        private readonly ParametrPerPovSchl;
        private readonly ParametrPerPovMen;
        private readonly ParametrPerSVzdSk;
        private readonly ParametrPerPovBarevRozSez;
        private readonly ParametrPerPrednacteniDat;
        private readonly ParametrPerPovDVzd;
        private readonly duchodId;
        private gridDuchod;
        private readonly dobaUrcitaId;
        private gridDobaUrcita;
        private readonly zkusDobaId;
        private gridZkusDoba;
        private readonly novyPlatVymerId;
        private gridNovyPlatVymer;
        private readonly zdravProhlidkaId;
        private gridZdravProhlidka;
        private readonly vynetiId;
        private gridVyneti;
        private readonly vyrociId;
        private gridVyroci;
        private readonly pracVyrociId;
        private gridPracVyroci;
        private readonly osoVybRizeniId;
        private gridOsoVybRizeni;
        private readonly konecZarazeniId;
        private gridKonecZarazeni;
        private readonly zdravPostId;
        private gridZdravPost;
        private readonly doplnUdajeId;
        private gridDoplnUdaje;
        private readonly uredZkId;
        private gridUredZk;
        private readonly neschvaleneZmenyId;
        private gridNeschvaleneZmeny;
        private readonly probihajiciMentoringId;
        private gridProbihajiciMentoring;
        private readonly mentoringId;
        private gridMentoring;
        private readonly dnySkoleniId;
        private gridDnySkoleni;
        private readonly povinneSkoleniId;
        private gridPovinneSkoleni;
        private readonly hodnoceniId;
        private gridHodnoceni;
        private readonly konecZalohyId;
        private gridKonecZalohy;
        private readonly dohodyOVzdId;
        private gridDohodyOVzd;
        private readonly konecJineVydCinId;
        private gridKonecJineVydCin;
        private readonly stretZajmuId;
        private gridStretZajmu;
        /**Povolení tabu nárok na důchod*/
        private PovoleniDuchod;
        /**Počet dní před datem nároku na důchod, kdy začít upozorňovat*/
        private PredDnyDuchod;
        /**Počet dní po datu nároku na důchod*/
        private PoDnyDuchod;
        /**Příznak, zda zobrazovat i osoby s překročeným datem nároku na důchod*/
        private PovolOsoDuchod;
        /**Povolení tabu dova určitá*/
        private PovoleniDobaUrcita;
        /**Počet dní před datem ukončení doby určité*/
        private PredDnyDobaurcita;
        /**Počet dní po datu ukončení doby určité*/
        private PoDnyDobaurcita;
        /**Povolení tabu zkušební doby */
        private PovoleniZkusebnidoba;
        /**Počet dní před datem konce zkušební doby*/
        private PredDnyZkusebnidoba;
        /**Počet dní po datu konce zkušební doby*/
        private PoDnyZkusebnidoba;
        /**Povolení tabu nový platový výměr*/
        private PovoleniPlatvymer;
        /** Počet dní před datem nároku na nový výměr*/
        private PredDnyPlatvymer;
        /**Počet dní po datu nároku na nový výměr*/
        private PoDnyPlatvymer;
        /**Budou se zobrazovat jen aktuální (budoucí) nároky*/
        private JenAktPlatvymer;
        /**Určuje, zda se délka doby se bude napočítávat podle data nároku na nový výměr (zaškrtnuto) nebo podle data plat. postupu*/
        private DruhDataPlatvymer;
        /**Povolení tabu zdravotní prohlídka*/
        private PovoleniZdravprohlidka;
        /**Počet dní před datem následující pravidelné prohlídky*/
        private PredDnyZdravprohlidka;
        /**Počet dní po datu následující pravidelné prohlídky*/
        private PoDnyZdravprohlidka;
        /**Příznak, zda zobrazovat i osoby bez zdravotní prohlídky*/
        private BezZdravprohlidka;
        /**Povolení tabu vynětí*/
        private PovoleniVyneti;
        /**Počet dní před datem konce vynětí z evidenčního počtu*/
        private PredDnyVyneti;
        /**Počet dní po datu konce vynětí z evidenčního počtu*/
        private PoDnyVyneti;
        /**Povolení tabu výročí*/
        private PovoleniVyroci;
        /**Počet dní před datem výročí*/
        private PredDnyVyroci;
        /**Počet dní po datu výročí*/
        private PoDnyVyroci;
        /**Upozorňovat na každé narozeniny*/
        private PovVyrociKazdyRok;
        /**Upozorňovat na "kulaté" narozeniny*/
        private PovVyrociKulate;
        /**Upozorňovat na 50. narozeniny*/
        private PovVyrociVek50;
        /**Upozorňovat na 55. narozeniny*/
        private PovVyrociVek55;
        /**Upozorňovat na 60. narozeniny*/
        private PovVyrociVek60;
        /**Upozorňovat na 65. narozeniny*/
        private PovVyrociVek65;
        /**Upozorňovat na 70. narozeniny*/
        private PovVyrociVek70;
        /**Upozorňovat na 75. narozeniny*/
        private PovVyrociVek75;
        /**Upozorňovat na vybraný věk*/
        private PovVyrociVekVlastni;
        /**Rok, na který upozorňovat*/
        private PovVyrociVekVlastniRok;
        /**Povolení tabu pracovní výročí*/
        private PovoleniPracvyroci;
        /**Počet dní před datem výročí*/
        private PredDnyPracvyroci;
        /**Počet dní po datu výročí*/
        private PoDnyPracvyroci;
        /**Upozorňovat na každé výročí */
        private PovPracVyrociKazdyRok;
        /**Upozorňovat na "kulaté" výročí*/
        private PovPracVyrociKulate;
        /**Upozorňovat na 5. výročí*/
        private PovPracVyroci05;
        /**Upozorňovat na 10. výročí*/
        private PovPracVyroci10;
        /**Upozorňovat na 15. výročí*/
        private PovPracVyroci15;
        /**Upozorňovat na 20. výročí*/
        private PovPracVyroci20;
        /**Upozorňovat na 25. výročí*/
        private PovPracVyroci25;
        /**Upozorňovat na 30. výročí*/
        private PovPracVyroci30;
        /**Upozorňovat na 35. výročí*/
        private PovPracVyroci35;
        /**Upozorňovat na 40. výročí*/
        private PovPracVyroci40;
        /**Upozorňovat na 45. výročí*/
        private PovPracVyroci45;
        /**Upozorňovat na 50. výročí*/
        private PovPracVyroci50;
        /**Upozorňovat na vybrané výročí*/
        private PovPracVyrociVlastni;
        /**Rok, na který upozorňovat*/
        private PovPracVyrociVlastniRok;
        /**POvolení tabu výběrového řízení*/
        private PovoleniVyberrizeni;
        /**Počet dní po zavedení do evidence*/
        private PredDnyVyberrizeni;
        /**Povolení tabu konec zařazení*/
        private PovoleniKoneczar;
        /**Počet dní před datem konce zařazení*/
        private PredDnyKoneczar;
        /**Počet dní po datu konce zařazení*/
        private PoDnyKoneczar;
        /**Povolení tavu zdravotního postižení*/
        private PovoleniZps;
        /**Počet dní před datem konce zdravotního postižení*/
        private PredDnyZps;
        /**Počet dní po datu konce zdravotního postižení*/
        private PoDnyZps;
        /**Povolení tabu doplňkové údaje*/
        private PovoleniDopludaje;
        /**Počet dní před datem konce dopl. údaje*/
        private PredDnyDopludaje;
        /**Počet dní po datu konce dopl. údaje*/
        private PoDnyDopludaje;
        /**Povolení tabu úřednických zkoušek*/
        private PovoleniUredzk;
        /**Povolení tabu probíhajícího mentoringu*/
        private PovoleniProbihamentoring;
        /**Povolení tabu mentoringu */
        private PovoleniMentoring;
        /**Počet dní před datem konce mentoringu*/
        private PredMentoring;
        /**Počet dní po datu konce mentoringu*/
        private PoMentoring;
        /**Povolení tabu dny školení*/
        private PovoleniDnyskoleni;
        /**Počet dní před koncem sledovaného období*/
        private PredDnyskoleni;
        /**Počet dní po konci sledovaného období*/
        private PoDnyskoleni;
        /** Minimální počet dní školení*/
        private PresDnyskoleni;
        /**Povolení tabu povinného školení*/
        private PovoleniPovskoleni;
        /**Počet dní před koncem platnosti školení*/
        private PredPovskoleni;
        /**Počet dní po konci platnosti školení*/
        private PoPovskoleni;
        /**Povolení tabu konec zálohy*/
        private PovoleniKoneczalohy;
        /**Počet dní před koncem zálohy pro přechodně nezařazené*/
        private PredKoneczalohy;
        /**Počet dní po konci zálohy pro přechodně nezařazené (pouze pro CS)*/
        private PoKoneczalohy;
        /**Povolení tabu vzd. dohody*/
        private PovoleniVzddohody;
        /**Povolení tabu neschválené změny*/
        private PovoleniNeschvalenychUdaju;
        /**Povolení tabu konec jiné výdělečné činnosti*/
        private PovoleniKonecJVC;
        /**Počet dní před koncem */
        private DnyPredKonecJVC;
        /**Počet dní po konci */
        private DnyPoKonecJVC;
        /**Povolení tabu střed zájmu*/
        private PovoleniStretZajmu;
        /**Počet dní před koncem*/
        private DnyPredStredZajmu;
        /**Počet dní po konci*/
        private DnyPoStredZajmu;
        onContentReady(): void;
        private getUserSettings;
        private getGridFormatZPS;
        private getGridFormatDoplnUdaje;
        private getGridFormatPovSkoleni;
        private getGridFormatKonecJVC;
        private getGridFormatKonecZarazeni;
        private getGridFormatKonecZalohy;
        private getGridFormatStretZajmu;
        private getGridFormatVzdDohody;
        private getGridFormatSkoleni;
        private getGridFormatMentoring;
        private getGridFormatNeschvalene;
        private getGridFormatUredZkousky;
        private getGridFormatDuchod;
        private getGridFormatDobaUrcita;
        private getGridFormatZkusDoba;
        private getGridFormatPlatVymer;
        private getGridFormatZdravProh;
        private getGridFormatVyroci;
        private getGridFormatPracVyroci;
        private getGridFormatVybRizeni;
        private getGridFormatVyneti;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailOmezeniSestavy extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected VazbaDto: Interface.GSettSestavyDto;
        protected Faze: string;
        private isSaved;
        onContentReady(): void;
        private updateSaveButton;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailOsoby2 extends GContentBase {
        readonly Osoba: Per.Interface.GSeznamOsobDto;
        readonly IxsEsu: string;
        private gridRc;
        private jeZmenaOsoby;
        private editMode;
        private createGridFormatLicence;
        /**
        * vytvořit formát sloupců gridu Dostupnost ve verzi
        */
        private createGridFormatDostupnostVeVerzi;
        private closeAction;
        private nextAndPreviousAction;
        private createActions;
        createStatusBar(): MenuParams[];
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createForm(): Gordic.Forms.Form;
        createTabs(): Gordic.Gin.DetailBuilder.TabParamsId[] | ObjectLiteral<Gordic.Gin.DetailBuilder.TabParams> | null;
        createGroups(): any[];
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailOsoby3 extends GContentBase<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Per.Interface.GSeznamOsobDto>> implements IGContent {
        readonly Osoba: Per.Interface.GSeznamOsobDto;
        readonly IxsEsu: string;
        isEditable: boolean;
        private jeZmenaOsoby;
        private editMode;
        private createGridFormatLicence;
        /**
        * vytvořit formát sloupců gridu Dostupnost ve verzi
        */
        private createGridFormatDostupnostVeVerzi;
        private closeAction;
        private nextAndPreviousAction;
        private createActions;
        createStatusBar(): MenuParams[];
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createForm(): Gordic.Forms.Form;
        createTabs(): Gordic.Gin.DetailBuilder.TabParamsId[] | ObjectLiteral<Gordic.Gin.DetailBuilder.TabParams> | null;
        createGroups(): any[];
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailOsoby4 extends GContentBase {
        readonly Osoba: Per.Interface.GSeznamOsobDto;
        readonly IxsEsu: string;
        isEditable: boolean;
        private gridRc;
        private jeZmenaOsoby;
        private editMode;
        private closeAction;
        private nextAndPreviousAction;
        private createActions;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createForm(): Gordic.Forms.Form;
        createTabs(): Gordic.Gin.DetailBuilder.TabParamsId[] | ObjectLiteral<Gordic.Gin.DetailBuilder.TabParams> | null;
        createGroups(): any[];
        private createBaseActions;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeProdukt = Gordic.Per.Interface.GSeznamOsobDto;
    type UsedComponentsProdukt = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeProdukt>;
    class GDetailOsoby extends GContentBase<UsedComponentsProdukt> implements IGContent {
        private Osoba;
        private fotobase64;
        private IxsEsu;
        private normalBar;
        private tabGroupsOpt;
        private tabOpt;
        private detailOpt;
        private readonly isPovDatumZmeny;
        private readonly isEditZakUdaje;
        private readonly isEditBydliste;
        private readonly isEditKontakt;
        private readonly isEditHodnost;
        private readonly isEditPojistovna;
        private readonly isEditCiziPoj;
        private readonly isEditPpv;
        private readonly isVisiblePpvSpis;
        private readonly isEditPredPpv;
        private readonly isEditJinaVydCin;
        private readonly isEditKonDolozka;
        private readonly isEditRodina;
        private readonly isEditVzdelani;
        private readonly isEditTituly;
        private readonly isEditKvalDohody;
        private readonly isEditJazyky;
        private readonly isEditJazZkousky;
        private readonly isEditJazZnalosti;
        private readonly isEditSledVzdelani;
        private readonly isEditKurzy;
        private readonly isEditOdbZpus;
        private readonly isEditMentoring;
        private readonly isEditPrukazy;
        private readonly isEditCert;
        private readonly isEditProverky;
        private readonly isEditLustrace;
        private readonly isEditZdravZpus;
        private readonly isEditFyzZpus;
        private readonly isEditOsoZpus;
        private readonly isEditOpatreni;
        private readonly isEditZPS;
        private readonly isEditDuchVymer;
        private readonly isEditPracUrazy;
        private readonly isEditSluzHod;
        private readonly isEditBenefity;
        private readonly isEditVozidla;
        private readonly isEditZbrane;
        private readonly isEditZapujcky;
        private readonly isEditOdpovednost;
        private readonly isEditOzdravPobyt;
        private readonly isEditDoplnUdaje;
        private ParametrPerRadPovDelOso;
        private ParametrPerRadExpIdm;
        private ParametrGinIsossReadyBool;
        private gridAdresy;
        private readonly adresyListDescription;
        private gridPpv;
        private readonly ppvListDescription;
        private gridPredPpv;
        private readonly predchoziPpvListDescription;
        private gridJinaCinnost;
        private readonly jinaCinnostListDescription;
        private gridKonDolozka;
        private readonly konDolozkaListDescription;
        private gridRodina;
        private readonly rodinaListDescription;
        private gridVzdelani;
        private readonly vzdelaniListDescription;
        private gridTituly;
        private readonly titulyListDescription;
        private gridKvalDohody;
        private readonly kvalDohodyListDescription;
        private gridJazyky;
        private readonly jazykyListDescription;
        private gridJazykZkousky;
        private readonly jazykZkouskyListDescription;
        private gridJazykZnalosti;
        private readonly jazykZnalostiListDescription;
        private gridSledVzdelani;
        private readonly sledVzdelaniListDescription;
        private gridKurzy;
        private readonly kurzyListDescription;
        private gridOdbZpus;
        private readonly odbZpusListDescription;
        private gridMentoring;
        private readonly mentoringListDescription;
        private gridPrukazy;
        private readonly prukazyListDescription;
        private gridCert;
        private readonly certListDescription;
        private gridProverky;
        private readonly proverkyListDescription;
        private gridLustrace;
        private readonly lustraceListDescription;
        private gridZdravZpus;
        private readonly zdravZpusListDescription;
        private gridFyzZpus;
        private readonly fyzZpusListDescription;
        private gridOsoZpus;
        private readonly osoZpusListDescription;
        private gridOpatreni;
        private readonly opatreniListDescription;
        private gridZPS;
        private readonly zpsListDescription;
        private gridDuchVymer;
        private readonly duchVymerListDescription;
        private gridPracUrazy;
        private readonly pracUrazyListDescription;
        private gridSluzHod;
        private readonly sluzHodListDescription;
        private gridBenefity;
        private readonly benefityListDescription;
        private gridVozidla;
        private readonly vozidlaListDescription;
        private gridZbrane;
        private readonly zbraneListDescription;
        private gridZapujcky;
        private readonly zapujckyListDescription;
        private gridOdpovednost;
        private readonly odpovednostListDescription;
        private gridOzdravPobyt;
        private readonly ozdravPobytListDescription;
        private gridDoplnUdaje;
        private readonly doplnUdajeListDescription;
        private gridPerDenik;
        private perDenikListDescription;
        private osobaZakUdaje;
        private datOdPojistovna;
        private datOdCiziPojistovna;
        isEditable: boolean;
        private jeZmenaOsoby;
        private fotoOsoby;
        private editModeZakUdaje;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        closing(): JQueryPromise<any>;
        loadDataDetail(aktDb?: boolean): void;
        applyDetail(): void;
        loadFoto(aktDb?: boolean): void;
        applyFoto(): void;
        createTabDetail(): any;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailPrideleniAdmKarty extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected KartaDto: Interface.GAdmPrukazyDto;
        protected PrukazDto: Interface.GPrukazyDto;
        protected OsobyKartaList: Interface.GPrukazyDto[];
        private jeUkonceni;
        private kartyOsobyList;
        private isSaved;
        onContentReady(): void;
        private prevodDto;
        private newData;
        private ukonceni;
        private loadData;
        private updateSaveButton;
        private setReadOnly;
        private setMail;
    }
}
declare namespace Gordic.Per.WebClient {
    class GKalkulacka extends GContentBase {
        protected ParamUroKonMaterska: WebControls.UroKonMaterska;
        private grid;
        private gridView;
        private poradi;
        private editPraxe;
        private currDto;
        private zlomek;
        private druhPraxePred;
        onContentReady(): void;
        private getGridFormat;
        private setCelkPraxe;
        private setKoefPraxe;
        private nastaveniCelkPraxe;
        private delkaMaterske;
        private vypocetCelkPraxe;
    }
}
declare namespace Gordic.Per.WebClient {
    class GNastaveniSestav extends GContentBase {
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Per.WebClient {
    class GPerOpatreni extends GContentBase {
        protected Action: WebControls.EnumActions;
        protected OpatreniDto: Interface.GPerOpatreniDto;
        /**Zda půjde editovat datum personálního opatření*/
        protected EditDatum: boolean;
        /**Zda půjde editovat druh personálního opatření*/
        protected EditDrpo: boolean;
        /**Zda půjde importovat personální opatření*/
        protected Import: boolean;
        /**Zda půjde zrušit personální opatření*/
        protected Zrusit: boolean;
        /**Zda se zobrazí datum vzniku*/
        protected ZobrVznik: boolean;
        /**Zda je zadání rozhodnutí povinné*/
        protected RozhodPovinne: boolean;
        /**Zda je zadání ČJ povinné*/
        protected CjPovinne: boolean;
        /**Zda je zadání rozkazu povinné*/
        protected RozkazPovinne: boolean;
        /**Zda při novém opatření bude opatření vždy označeno jako změněné*/
        protected NewIsModified: boolean;
        /**Zda po uložení vytisknout*/
        protected TiskKonec: boolean;
        /**Zda ukládat přímo do db*/
        protected Ukladat: boolean;
        /**Zda zrušit opatření včetně všech napojení*/
        protected ZrusitNapojeni: boolean;
        protected VychEditace: WebControls.DruhEditPO;
        protected ImportDatum: Date;
        protected ImportDrpo: string;
        protected ImportDupo: string;
        protected RozsirenyProfil: boolean;
        protected Rozkazy: boolean;
        protected Zadost: boolean;
        protected PouzitDupo: boolean;
        protected PouzitPopis: boolean;
        protected JePovinne: boolean;
        protected PovolitZadne: boolean;
        protected JeBIS: boolean;
        protected JeCS: boolean;
        protected ParametrPerPropoOpatreniDok: boolean;
        protected ParametrPerSlZmen: WebControls.UrovenSledovaniZmen;
        protected ParametrPerZakNastaveniOpa: WebControls.UrovenEvidZakOpaOso;
        protected ParametrPerPovStatZam: boolean;
        private isNew;
        private poradiOpatreni;
        private povolitZadne;
        private isChange;
        private typEditace;
        /**Zda byla změna propojení*/
        private bylaZmenaPO;
        private readonly idRadioExistujici;
        private readonly idRadioNove;
        private readonly idRadioZadne;
        private reportParam;
        onContentReady(): void;
        private loadData;
        private setReadOnly;
        private updateSaveButton;
        private hasChanged;
        private vyberPO;
        private getGridFormatPO;
        private genSestavu;
    }
}
declare namespace Gordic.Per.WebClient {
    class GSeznamNeOsobTab extends GContentBase {
        protected SeznamOsobDto: Interface.GSeznamOsobDto[];
        protected Pocet: number;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebClient {
    class GSeznamOpatreni extends GContentBase {
        protected ParametrPerZakNastaveniOpa: number;
        protected ParametrPerOpatreni: number;
        protected JeCT: boolean;
        private grid;
        private filterpanel;
        onContentReady(): void;
        private getGridFormat;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsob2 extends GContentBase {
        FilterDto: Gordic.Per.Interface.GFiltrOsobDto;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerPovSluzba: boolean;
        protected ParametrPerPovBarevRozSez: boolean;
        protected JeCT: boolean;
        private view;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsob extends GContentBase {
        private grid;
        private dataListDescription;
        private descriptionMasky;
        private normalBar;
        private oppositeBar;
        private filterDto;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsobDetail extends GContentBase {
        Action: WebControls.EnumActions;
        Ixsesu: string;
        Ixsesu_txt: string;
        Ixsesu_oc: string;
        private readonly IxsPpv;
        readonly Detail: string;
        /**Název akce, která se má spustit na detailu (pro otevření zanořených detialu z infopanelu)*/
        private readonly DetailAction;
        protected JeISTA: boolean;
        protected JeBIS: boolean;
        protected ParametrPerRozsireniCerBen: boolean;
        protected ParametrPerPovAutoOdecetVzd: boolean;
        protected ParametrPerRadRozEvidJazZk: boolean;
        protected ParametrPropojeniSSL: number;
        protected ParametrPerPovZak: number;
        protected ParametrPerPovJko: number;
        protected ParametrPerPovByd: number;
        protected ParametrPerPovRod: number;
        protected ParametrPerPovPriFot: number;
        protected ParametrPerPovPvv: number;
        protected ParametrPerPovVzd: number;
        protected ParametrPerPovTit: number;
        protected ParametrPerPovHodnost: number;
        protected ParametrPerPovAks: number;
        protected ParametrPerPovZoz: number;
        protected ParametrPerPovJzn: number;
        protected ParametrPerPovJzk: number;
        protected ParametrPerPovKdo: number;
        protected ParametrPerPovSpv: number;
        protected ParametrPerPovCrt: number;
        protected ParametrPerPovPrk: number;
        protected ParametrPerPovPvk: number;
        protected ParametrPerPovLuv: number;
        protected ParametrPerPovZdz: number;
        protected ParametrPerPovDuv: number;
        protected ParametrPerPovZps: number;
        protected ParametrPerPovZdp: number;
        protected ParametrPerPovZdc: number;
        protected ParametrPerPovPru: number;
        protected ParametrPerPovDio: number;
        protected ParametrPerPovDou: number;
        protected ParametrPerPovRozVlastnost: number;
        protected ParametrPerPovBenefit: number;
        protected ParametrPerPovSpis: number;
        protected ParametrPerPovMen: number;
        protected ParametrPerPovFyzZp: number;
        protected ParametrPerPovOsoZp: number;
        protected ParametrPerPovJinaVydCin: number;
        protected ParametrPerPovSluHod: number;
        protected ParametrPerPovVozidla: number;
        protected ParametrPerPovZbrane: number;
        protected ParametrPerPovKonDolozky: number;
        protected ParametrPerPovHmotOdpovednost: number;
        protected ParametrPerPovPujcky: number;
        protected ParametrPerPovOzdPobyt: number;
        protected ParametrPerPovPerOpa: number;
        protected ParametrPerPovPerDenik: number;
        protected ParametrPerPovPrz: number;
        private jeZmenaOsoby;
        menuBarPole: MenuParams[];
        menuOsoba: MenuParams[];
        private detailFrmDiv;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private loadMenu;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsobOld extends GContentBase {
        FilterDto: Gordic.Per.Interface.GFiltrOsobDto;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerPovSluzba: boolean;
        protected ParametrPerPovBarevRozSez: boolean;
        protected JeCT: boolean;
        private view;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsobPrepocet extends GContentBase {
        protected VybraneOsoby: Gordic.Per.Interface.GSeznamOsobDto[];
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GSeznamOsobVedouci extends GContentBase {
        dataListDescription: Gordic.Per.Interface.GPerListDescription;
        private firstRun;
        onContentReady(): void;
        private openDetail;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmBenefity extends GContentBase {
        Ixsesu: string;
        Rok: number | null | undefined;
        private IxsSop;
        private jeZmena;
        private grid;
        private cerpaniOsoList;
        private rozpocetOsoList;
        private dtoRozpocet;
        private kpiPanel;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private loadData;
        private loadFieldDataRoky;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmBenefityDetail extends GContentBase {
        protected dtoDetailBenefity: Gordic.Per.Interface.GCerpaniFKSPOsoDto;
        protected dtoRozpocet: Gordic.Per.Interface.GRozpocetFKSPOsoDto;
        protected valDetail: any;
        Action: WebControls.EnumActions;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDoplnUdaje extends GContentBase {
        protected model: any;
        protected validators: any;
        Ixsesu: string;
        Ixsdou: string;
        private sel;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDoplnUdajeDetail extends GContentBase {
        protected dtoDetailDoplnUdaje: Gordic.Per.Interface.GOsobaDoplnUdajeDto;
        protected validators: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDuchod extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDuchodDetail extends GContentBase {
        protected dtoDetailDuchod: Gordic.Per.Interface.GDuchodVymerDto;
        protected validators: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.23
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmHodnosti extends GContentBase {
        protected model: any;
        protected validators: any;
        protected JeISTA: boolean;
        protected ParametrPerRozkazy: boolean;
        private jeZmena;
        Ixsesu: string;
        private view;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmHodnostiDetail extends GContentBase {
        protected dtoDetailHodnosti: Gordic.Per.Interface.GHodnostiDto;
        protected valDetail: any;
        protected JeISTA: boolean;
        protected ParametrPerRozkazy: boolean;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKonDolozka extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKonDolozkaDetail extends GContentBase {
        protected dtoKonDolozka: Gordic.Per.Interface.GKonDolozkaDto;
        protected Action: WebControls.EnumActions;
        protected Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmLustrace extends GContentBase {
        protected model: any;
        protected validators: any;
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmLustraceDetail extends GContentBase {
        protected dtoDetailLustrace: Gordic.Per.Interface.GLustraceDto;
        protected valDetailLustrace: any;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmOdpovednost extends GContentBase {
        protected Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmOdpovednostDetail extends GContentBase {
        protected dtoOdpovednost: Gordic.Per.Interface.GOdpovednostDto;
        protected Action: WebControls.EnumActions;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPredchoziPraxe extends GContentBase {
        private roky;
        private dny;
        private rokyZap;
        private dnyZap;
        private PredPraxeList;
        private jeZmena;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPredchoziPraxeDetail extends GContentBase {
        protected dtoPredPraxeList: Interface.GPredchoziPraxeDto[];
        protected dtoDetail: Gordic.Per.Interface.GPredchoziPraxeDto;
        protected valDetail: any;
        protected JeCelnik: boolean;
        protected ParamUroKonMaterska: number;
        private jeZmena;
        private beziPrepocet;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        private NastaveniCelkovePraxe;
        private UrceniDelkyPraxe;
        private LeapMezidd;
        private UrceniDelkyPraxeKoef;
        private DelkaMaterske;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmProverky extends GContentBase {
        protected model: any;
        protected validators: any;
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmProverkyDetail extends GContentBase {
        protected dtoDetailProverky: Gordic.Per.Interface.GProverkyDto;
        protected valDetailProverky: any;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmSvedci extends GContentBase {
        protected dtoUrazy: Gordic.Per.Interface.GPracovniUrazyDto;
        protected dtoSvedci: Gordic.Per.Interface.GSvedciUrazyDto;
        protected valSvedci: any;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmUrazy extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.8
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmUrazyDetail extends GContentBase {
        protected dtoDetailUrazy: Gordic.Per.Interface.GPracovniUrazyDto;
        protected valDetailUrazy: any;
        protected valSvedci: any;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        Ixssve: string;
        bool: boolean;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZPS extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZPSDetail extends GContentBase {
        protected dtoDetailZPS: Gordic.Per.Interface.GZPSDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZdravZpusobilost extends GContentBase {
        Ixsesu: string;
        Datum: any;
        private JeISTA;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZdravZpusobilostDetail extends GContentBase {
        protected dtoDetailZdravZpusobilost: Gordic.Per.Interface.GZdravZpusobilostDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GDetailPPVZarazeniSYMTab extends GContentBase {
        protected PracZarazeniList: Interface.GPracovniZarazeniDto[];
        protected DtoZmenyZarSymList: Interface.GPracovniZarazeniDto[];
        private readonly Ixsppv;
        private readonly DatumOd;
        private readonly PpvOd;
        private readonly PpvDo;
        private readonly JeStatZam;
        private readonly JePracPomerISoSS;
        private readonly JeSluzba;
        private readonly JeBIS;
        private readonly JeISTA;
        private JeNovyPpv;
        private dto;
        private JeZmenaZarazeniList;
        private jeZmena;
        private grid;
        private poradiNew;
        onContentReady(): void;
        private getFormBuilderDetail;
        private showDialog;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 482.1.0.0
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDetailPPV_copy extends GContentBase {
        Ixsesu: string;
        Ixsppv: string;
        Ixsesu_txt: string;
        Ixsesu_oc: string;
        Action: WebControls.EnumActions;
        private jeZmena;
        private readonly ParametrPerRadPovKvm;
        private readonly ParametrPerRozDuvp;
        private readonly ParametrPerRadSledZmenSYMNaPPV;
        private readonly ParametrPerSkuKonecZkusDoby;
        private readonly ParametrPovZobrZrusZaznamy;
        private readonly ParametrEvidPraxePpv;
        private readonly ParametrPerMVCis;
        private readonly ParametrPerDveMistaPrace;
        private readonly ParametrPerRozEvidCJPpv;
        private readonly ParametrPerPovolSazbyDohod;
        private readonly ParametrZarazeniDohody;
        private readonly ParametrPerRadVicZar;
        private readonly ParametrGinIsossReadyBool;
        private readonly ParametrPerPovKat;
        private readonly TypInst;
        private readonly ParametrPerPovUvazekDPP;
        private readonly ParametrPerZobrKatalogPraci;
        private readonly ParametrPerPschlMvp;
        private readonly ParametrPesEvidMistaVykonu;
        private readonly ParametrPesEvidPracoviste;
        private readonly ParametrPerPschlZSM;
        private readonly ParametrPerRadPovPusobnosti;
        private readonly ParametrPerPovPraPracoviste;
        private readonly ParametrPerRadPourdo;
        private readonly ParametrPerPovDatPodpis;
        private readonly JeBIS;
        private readonly JeCT;
        private readonly JeCS;
        private readonly icoOsoby;
        private readonly icoNazev;
        private dtoDetailPPV;
        private dtoZmenyPPV;
        private dtoPostaveni;
        private dtoMistoVykonu;
        private dtoPracovniZarazeni;
        private dtoPracPomer;
        private dtoPracoviste;
        private dtoDetailSM;
        private dtoZastupPpv66;
        private dtoZastupPpv9;
        private dtoZmenyPPVList;
        private dtoPostaveniList;
        private dtoMistoVykonuList;
        private dtoPracovniZarazeniList;
        private dtoZmenyZarSymList;
        private dtoZamestnaniNRZPList;
        private dtoPracovisteList;
        private dtoZastupList;
        private dtoZastupujeList;
        private dtoCjPpvList;
        private dtoSlozkyMimoPlatVymer;
        private zarDanePpv;
        private readonly listSazbyDohody;
        private readonly listSlozkyMzdyDPC;
        private readonly listSlozkyMzdyDPP;
        private readonly ListPpv;
        private readonly ListPraxe;
        private viewPracovniZarazeni;
        private viewPracoviste;
        private JeNeschvalenyPPV;
        private jeSchvaleni;
        private prepDatOd;
        private jeZmenaSazbyDohody;
        private jeZmenaZarazeniSm;
        private jeSluzba;
        private jeStatZam;
        private jePracPomerISoSS;
        private jeDohoda;
        private jeGridZmenyPPVDohody;
        private jeGridZmenyPPVStatZam;
        private gridHistPpv;
        private gridHistPracZar;
        private gridHistPracoviste;
        private gridZastup;
        private gridNrzp;
        private gridCjSpis;
        private gridHistMistoVykonu;
        private gridHistZastStatZam;
        private gridHistNrzp;
        private gridHistSazebDohody;
        private gridSazbyDohody;
        private formDetailPpv;
        private formZarazeni;
        private formStatZam;
        private formZast66;
        private formZast9a;
        private validateZarazeni;
        private validateStatZam;
        private tabmanager;
        private groups;
        private readonly hodSazbyId;
        private readonly zarazeniId;
        private readonly statZamId;
        private readonly nrzpId;
        private readonly seznamCjId;
        private readonly historieId;
        private ZadavaniUvazkuFondu;
        private SocPojJakoPocPPV;
        private SocPojJakoPocPPVKal;
        private ZdravPojJakoPocPPV;
        private ZdravPojJakoPocPPVKal;
        private VlozitAktDatumZmenaOd;
        private PovoleniUkoncitPredZar;
        onContentReady(): void;
        private defaultValueZmenyPpv;
        private defaultValuePostaveni;
        private defaultValueMistoVykonu;
        private defaultValuePracoviste;
        private defaultValueZastup66;
        private loadDataPPV;
        private loadDataZmenyPPV;
        private loadDataPostaveni;
        private loadDataMistoVykonu;
        private loadDataZarazeni;
        private loadDataPracoviste;
        private loadDataZastupPpv66;
        private loadDataZastupPpv9;
        private urciDatoDoZastup180;
        private saveFields;
        ulozDataDetailPpv(): Promise<null | undefined>;
        private uprUlozZar;
        closing(): JQuery.Promise<any, any, any>;
        private getUserSettings;
        private getGridFormatZastup;
        private getGridFormatNrzp;
        private getGridFormatCj;
        private getGridFormatHistZmenyPpv;
        private getGridFormatHistZmenyPpvDohody;
        private getGridFormatZarazeni;
        private getGridFormatPracoviste;
        private getGridFormatSazbyDohody;
        private createFormDetailPpv;
        private createFormZarazeni;
        private createFormStatZam;
        private createFormZast66;
        private createFormZast9a;
        private prepnutiVzhledu;
        private prepnutiVzhleduStatZam;
        private prepnutiVzhleduSluzba;
        private loadPovolani;
        private nastaveniPostaveni;
        /**
         * Kontrola pro CSCR, zda splňuje požadavky na nové systemizované místo.
         * Kontrola bude prováděna v rámci požadavku na lustrační osvědčení, Stupeň prověření, Stupeň požadovaného vzdělání, Druh požadovaného vzdělání, zdravotní způsobilost a fyzická způsobilost.
         * V případě, že nedojde ke splnění alespoň jednoho z výše uvedených požadavků, bude zobrazena informativní hláška, ve které bude uvedeno, které požadavky příslušník nesplňuje.
         * @param dtoSM
         * @param datum
         */
        private kontrolaDleSym;
        /**Nastav dat do pro dobu určitou BIS*/
        private nastavDatDoDobaUrcita;
        private nastavRozsahDPC;
        private pocetZmenDatDoPPV;
        private zakonnyFond;
        private nastavDetailSYMDto;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 482.1.0.0
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDetailPPV extends GContentBase {
        Ixsesu: string;
        Ixsppv: string;
        Ixsesu_txt: string;
        Ixsesu_oc: string;
        Action: WebControls.EnumActions;
        private jeZmena;
        private readonly ParametrPerRadPovKvm;
        private readonly ParametrPerRozDuvp;
        private readonly ParametrPerRadSledZmenSYMNaPPV;
        private readonly ParametrPerSkuKonecZkusDoby;
        private readonly ParametrPovZobrZrusZaznamy;
        private readonly ParametrEvidPraxePpv;
        private readonly ParametrPerMVCis;
        private readonly ParametrPerDveMistaPrace;
        private readonly ParametrPerRozEvidCJPpv;
        private readonly ParametrPerPovolSazbyDohod;
        private readonly ParametrZarazeniDohody;
        private readonly ParametrPerRadVicZar;
        private readonly ParametrGinIsossReadyBool;
        private readonly ParametrPerPovKat;
        private readonly JeBIS;
        private readonly JeCT;
        private readonly JeCS;
        private dtoDetailPPV;
        private dtoZmenyPPV;
        private dtoPostaveni;
        private dtoMistoVykonu;
        private dtoPracovniZarazeni;
        private dtoPracPomer;
        private dtoPracoviste;
        private dtoDetailSM;
        private dtoZastupPpv66;
        private dtoZmenyPPVList;
        private dtoPostaveniList;
        private dtoMistoVykonuList;
        private dtoPracovniZarazeniList;
        private dtoZmenyZarSymList;
        private dtoZamestnaniNRZPList;
        private dtoPracovisteList;
        private dtoZastupList;
        private dtoZastupujeList;
        private dtoCjPpvList;
        private dtoSlozkyMimoPlatVymer;
        private zarDanePpv;
        private viewPracovniZarazeni;
        private viewPracoviste;
        private countZam;
        private aktTab;
        private JeNeschvalenyPPV;
        private jeSchvaleni;
        private prepDatOd;
        private JeZmenaSazbyDohody;
        private jeZmenaZarazeniSm;
        private jeSluzba;
        private jeStatZam;
        private jePracPomerISoSS;
        private gridHistPpv;
        private gridHistPracZar;
        private gridHistPracoviste;
        private formDetailPpv;
        private ZadavaniUvazkuFondu;
        private SocPojJakoPocPPV;
        private SocPojJakoPocPPVKal;
        private ZdravPojJakoPocPPV;
        private ZdravPojJakoPocPPVKal;
        private VlozitAktDatumZmenaOd;
        private PovoleniUkoncitPredZar;
        onContentReady(): void;
        private defaultValueZmenyPpv;
        private defaultValuePostaveni;
        private defaultValueMistoVykonu;
        private defaultValuePracoviste;
        private defaultValueZastup66;
        private loadDataPPV;
        private loadDataZmenyPPV;
        private loadDataPostaveni;
        private loadDataMistoVykonu;
        private loadDataZarazeni;
        private loadDataPracoviste;
        private loadDataZastupPpv;
        private SaveFields;
        UlozDataDetailPpv(): Promise<null | undefined>;
        private UprUlozZar;
        closing(): JQuery.Promise<any, any, any>;
        private getUserSettings;
        private createFormDetailPpv;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPlatVymer extends GContentBase {
        protected ParametrPovZobrZrusZaznamy: boolean;
        JeCT: boolean;
        JeBIS: boolean;
        protected dtoPracPomer: Gordic.Per.Interface.GPracovniPomeryDto;
        private dtoPlatVymer;
        private dtoListPlatVymer;
        private dtoListPlatVymerSlozky;
        private dtoZapocetPraxe;
        Ixsesu: string;
        Ixsppv: string;
        IxsTks: string;
        private jeZmena;
        private jeNovy;
        private Stupen;
        private gridSlozky;
        private gridHistorie;
        onContentReady(): void;
        private showDialog;
        loadSeznamPV(): void;
        loadSeznamPV_Detail(): void;
        generovatSlozku(mainContent: GUdajeZamFrmPlatVymer): void;
        vypocetDatPostup(mainContent: GUdajeZamFrmPlatVymer, zmenitPlatStupen: boolean, datPostupuPodleStupne: boolean, generovatSlozku: boolean): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPriMimoPV extends GContentBase {
        protected dtoPracPomer: Gordic.Per.Interface.GPracovniPomeryDto;
        Ixsesu: string;
        Ixsppv: string;
        IxsTks: string;
        private view;
        private grid;
        private jeZmena;
        onContentReady(): void;
        zobrazitDetail(mainContent: GUdajeZamFrmPriMimoPV, mainRow: Gordic.Per.Interface.GSlozkyMimoPlatVymerDto, novy: boolean): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 482.1.0.0
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmSeznamPPV extends GContentBase {
        private readonly Ixsesu;
        private readonly Ixsesu_txt;
        private readonly Ixsesu_oc;
        SimpleMod: boolean;
        private readonly IxsPpv;
        private readonly RunAction;
        private ParametrPerRozDuvp;
        private ParametrGinIsossReadyBool;
        private jeZmena;
        private grid;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmVyneti extends GContentBase {
        protected ParametrPovZobrZrusZaznamy: boolean;
        protected dtoPracPomer: Gordic.Per.Interface.GPracovniPomeryDto;
        private dtoVyneti;
        private dtoListSlozkyVyneti;
        private readonly JeCS;
        Ixsesu: string;
        Ixsppv: string;
        private jeZmena;
        private gridHistorie;
        onContentReady(): void;
        loadSeznamVY(): void;
        loadSeznamVY_Detail(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZapoctyPraxe extends GContentBase {
        protected ParametrPovZobrZrusZaznamy: boolean;
        private RemoteService;
        Ixsesu: string;
        Ixsppv: string;
        protected dtoPracPomer: Gordic.Per.Interface.GPracovniPomeryDto;
        private dto;
        private dtoListZapocty;
        private DetailSM;
        private PlatVymerAkt;
        protected ParametrPerRadPovZPP: any;
        protected ParametrZapPraxeAktDen: any;
        protected ParametrEvidPraxePpv: any;
        protected ParametrPerPovStatZam: any;
        private islPlatVymerLoad;
        private islDetailSMLoad;
        private jeZmena;
        onContentReady(): void;
        loadSeznamZP(): void;
        detailSeznamZP(): void;
        private VypocetPraxe;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmCiziPojistovny extends GContentBase {
        Ixsesu: string;
        private view;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmCiziPojistovnyDetail extends GContentBase {
        protected dtoDetailCizozemPojistovny: Gordic.Per.Interface.GCizozemPojistovnyDto;
        protected valDetailCizozemPojistovny: any;
        private RemoteService;
        Action: WebControls.EnumActions;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPojistovny extends GContentBase {
        protected dtoDetailPojistovny: Gordic.Per.Interface.GZdravPojistovnyDto;
        protected valDetailPojistovny: any;
        Action: WebControls.EnumActions;
        protected model: any;
        protected validators: any;
        private jeZmena;
        Ixsesu: string;
        dat_od: Date;
        private grid;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPojistovnyDetail extends GContentBase {
        protected dtoDetailPojistovny: Gordic.Per.Interface.GZdravPojistovnyDto;
        protected valDetailPojistovny: any;
        Action: WebControls.EnumActions;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmCertifikaty extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmCertifikatyDetail extends GContentBase {
        protected dtoDetailCertifikaty: Gordic.Per.Interface.GCertifikatyDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDisciplinarniOpatreni extends GContentBase {
        private jeZmena;
        protected model: any;
        protected validators: any;
        private JeBIS;
        private JeCS;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmDisciplinarniOpatreniDetail extends GContentBase {
        protected dtoDetailDisciplinarniOpatreni: Gordic.Per.Interface.GDisciplinarniOpatreniDto;
        protected valDetailDisciplinarniOpatreni: any;
        private jeZmena;
        private RemoteService;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmJazykoveZkousky extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmJazykoveZkouskyDetail extends GContentBase {
        protected dtoDetailJazykoveZkousky: Gordic.Per.Interface.GJazykoveZkouskyDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmJazyky extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmJazykyDetail extends GContentBase {
        protected dtoDetailJazyky: Gordic.Per.Interface.GJazykoveZnalostiDto;
        protected valDetail: any;
        protected DJPrizUro: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKurzy extends GContentBase {
        protected model: any;
        protected validators: any;
        protected ParametrPerPvcuCis: boolean;
        private jeZmena;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKurzyDetail extends GContentBase {
        protected dtoDetailKurzy: Gordic.Per.Interface.GKurzyDto;
        protected valDetailKurzy: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.23
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKvalDohoda extends GContentBase {
        protected model: any;
        protected validators: any;
        private jeZmena;
        Ixsesu: string;
        private sel;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKvalDohodaDetail extends GContentBase {
        protected dtoDetailKvalDohod: Gordic.Per.Interface.GKvalDohodyDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmMentoring extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmMentoringDetail extends GContentBase {
        protected dtoDetailMentoring: Gordic.Per.Interface.GMentoringDto;
        protected dtoDetailPrubehMen: Gordic.Per.Interface.GPrubehMenDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmMentoringDetailPrubeh extends GContentBase {
        protected dtoDetailPrubehMen: Gordic.Per.Interface.GPrubehMenDto;
        protected valDetailPrubeh: any;
        protected dtoDetailMentoring: Gordic.Per.Interface.GMentoringDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.7
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmSledovaniVzd extends GContentBase {
        protected model: any;
        protected validators: any;
        private jeZmena;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmSledovaniVzdDetail extends GContentBase {
        protected dtoDetailSledovaniVzd: Gordic.Per.Interface.GVzdPozadavkyDto;
        protected valDetailSledovaniVzd: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.10
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmStudium extends GContentBase {
        Ixsesu: string;
        protected model: any;
        protected validators: any;
        protected jeCS: boolean;
        protected parametrCiseslnikyVzd: boolean;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmStudiumDetail extends GContentBase {
        protected dtoDetailStudium: Gordic.Per.Interface.GVzdelaniDto;
        protected valDetailStudium: any;
        private jeZmena;
        protected ParametrCiseslnikyVzd: boolean;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmTituly extends GContentBase {
        protected model: any;
        protected validators: any;
        private jeZmena;
        Ixsesu: string;
        private sel;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.11
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmTitulyDetail extends GContentBase {
        protected dtoDetailTituly: Gordic.Per.Interface.GTitulyDto;
        protected valDetailTituly: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZpusobilosti extends GContentBase {
        protected model: any;
        protected validators: any;
        private jeZmena;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZpusobilostiDetail extends GContentBase {
        protected dtoDetailZpusobilosti: Gordic.Per.Interface.GZkouskyZpusobilostiDto;
        protected valDetailZpusobilosti: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmBydliste extends GContentBase {
        private typ_ado;
        private jeZmena;
        Ixsesu: string;
        private typLoad;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmBydlisteDetail extends GContentBase {
        protected dtoDetail: Gordic.Per.Interface.GOsobaAdresaDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmFoto extends GContentBase {
        protected Ixsesu_txt: string;
        protected Ixsesu_oc: string;
        private jeZmena;
        private actFotoIxsUlo;
        private actFoto;
        Ixsesu: string;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private loadFoto;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmFotoDetail extends GContentBase {
        protected dtoDetail: Gordic.Per.Interface.GElePrilohyDto;
        protected dtoFotkyList: Gordic.Per.Interface.GElePrilohyDto[];
        protected Ixsesu_txt: string;
        protected Ixsesu_oc: string;
        protected valDetail: any;
        private jeZmena;
        protected Ixsesu: string;
        private RemoteService;
        Action: WebControls.EnumActions;
        private fotobase64;
        private guidFile;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKontaktUdaje extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        private maxDatOd;
        private grid;
        private readonly ParametrPerRadPovDelOso;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmKontaktUdajeDetail extends GContentBase {
        private dtoDetail;
        private readonly List;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPrukazy extends GContentBase {
        Ixsesu: string;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmPrukazyDetail extends GContentBase {
        protected dtoDetail: Gordic.Per.Interface.GPrukazyDto;
        protected valDetail: any;
        private jeZmena;
        Action: WebControls.EnumActions;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmRodina extends GContentBase {
        Ixsesu: string;
        protected logovatGdpr: boolean;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmRodinaDetail extends GContentBase {
        Action: WebControls.EnumActions;
        dtoOsoba: Gordic.Per.Interface.GOsobyBlizkeDto;
        valOsoba: any;
        dtoAdresa: Gordic.Per.Interface.GOsobyBlizkeAdresaDto;
        valAdresa: any;
        dtoKontakt: Gordic.Per.Interface.GOsobyBlizkeKontaktDto;
        valKontakt: any;
        Ixsesu: string;
        Ixsobz: string;
        private jeZmena;
        private IslOsoba;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Per.WebClient {
    class GUdajeZamFrmZakUdaje extends GContentBase {
        protected dtoZakUdaje: Gordic.Per.Interface.GOsobaZakUdajeDto;
        private readonly Ico;
        private readonly ParametrPerPovDatumZmeny;
        private readonly ParametrPerPovMistoNar;
        private readonly ParametrPerRadPovRJm;
        private readonly ParametrPerRadPovRef;
        private readonly ParametrPerRadPrizOdbory;
        private readonly ParametrPerRadPovUrednik;
        private readonly ParametrPerRadPovVojak;
        private readonly ParametrPerRadPouDataPosZmenyRodStav;
        private readonly ParametrPerPovStatZam;
        private readonly ParametrGinIsossReadyBoolPer;
        private readonly ParametrPerPovSluzba;
        private readonly ParametrPerPovNRZP;
        private readonly ParametrPerPovDetExt;
        private readonly JeVNOL;
        private readonly JeMPO;
        private Action;
        private Ixsesu;
        private jeNovaOsoba;
        private jeZmena;
        private jeZmenaStaz;
        private jeStaz;
        private gridHistStav;
        private gridHistPrijmeni;
        private gridHistRodStav;
        private gridStaz;
        private tabmanager;
        private readonly stazId;
        private stazDiv;
        private readonly externistaId;
        private externistaDiv;
        private readonly sluzbaId;
        private sluzbaDiv;
        private readonly statZamId;
        private statZamDiv;
        private readonly nrzpId;
        private nrzpDiv;
        private readonly historieId;
        private historieDiv;
        onContentReady(): void;
        private ZmenaOdchoduDoDuchodu;
        private loadData;
        private validateOcSz;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebClient {
    function NastavitPER(dto: GSettingPERDto): Forms.Form[];
}
