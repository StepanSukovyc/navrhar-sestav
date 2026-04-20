declare namespace Gordic.Pes.WebClient {
    enum EnumActions {
        None = 0,
        New = 1,
        Edit = 2,
        Delete = 3,
        Detail = 4,
        Copy = 5
    }
    enum RidicOpatreniPriz {
        /**Řidičské oprávnění AM*/
        AM = 1,
        /**>Řidičské oprávnění A1*/
        A1 = 2,
        /**Řidičské oprávnění A2*/
        A2 = 4,
        /**Řidičské oprávnění A*/
        A = 8,
        /**Řidičské oprávnění B1*/
        B1 = 16,
        /**Řidičské oprávnění B*/
        B = 32,
        /**Řidičské oprávnění B+E*/
        BE = 64,
        /**Řidičské oprávnění C1*/
        C1 = 128,
        /**Řidičské oprávnění C1+E*/
        C1E = 256,
        /**Řidičské oprávnění C*/
        C = 512,
        /**Řidičské oprávnění C+E*/
        CE = 1024,
        /**Řidičské oprávnění D1*/
        D1 = 2048,
        /**Řidičské oprávnění D1+E*/
        D1E = 4096,
        /**Řidičské oprávnění D*/
        D = 8192,
        /**Řidičské oprávnění D+E*/
        DE = 16384,
        /**Řidičské oprávnění T*/
        T = 32768
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKomModelDetail extends GContentBase {
        Action: EnumActions;
        protected IxsKmo: string;
        protected Nazev: string;
        protected Poznamka: string;
        private readonly PocetUrKom;
        private grid;
        private jeZmenaChar;
        private sloupce;
        private sloupce_sort;
        private sloupce_list;
        onContentReady(): void;
        private saveDetail;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKompetenceSeznam extends GContentBase {
        private grid;
        private readonly PocetUrKom;
        private readonly dataListDescription;
        onContentReady(): void;
        zobrazitDetail(mainContent: GKompetenceSeznam, mainRow: Gordic.Per.Interface.GKompetencniModelDto, novy: boolean): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKompetenceSeznamOld extends GContentBase {
        private grid;
        private view;
        private sloupce;
        private sloupce_sort;
        private sloupce_list;
        private readonly PocetUrKom;
        onContentReady(): void;
        zobrazitDetail(mainContent: GKompetenceSeznamOld, mainRow: Gordic.Per.Interface.GKompetencniModelDto, novy: boolean): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKompetencniModel extends GContentBase {
        private grid;
        private readonly dataListDescription;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKompetencniModelOld extends GContentBase {
        private grid;
        private view;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GHromadneOperace extends GContentBase {
        private readonly dataListDescription;
        private readonly normalBar;
        private grid;
        private firstRun;
        onContentReady(): void;
        zobrazitVysledek(content: GContent, result: Isl.GServiceGroupResponse<Gordic.Per.Interface.GCiselnikSymDto>, seskupit: boolean, title: string): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GHromadneOperaceOld extends GContentBase {
        private grid;
        private view;
        private readonly ParametrPerRadExpIdm;
        private readonly ParametrPesRadPriPev;
        private readonly ParametrPesRadPriKom;
        private readonly ParametrPesEvidPracoviste;
        private readonly Lic;
        onContentReady(): void;
        zobrazitVysledek(content: GContent, result: Isl.GServiceGroupResponse<Gordic.Per.Interface.GCiselnikSymDto>, seskupit: boolean, title: string): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDavkaEvidSym extends GContentBase {
        private readonly DtoDavka;
        private readonly dataListDescription;
        private isChange;
        private grid;
        onContentReady(): void;
        private addSM;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDavkaEvidSymOld extends GContentBase {
        protected DtoDavka: Per.Interface.GDavkyEosmDto;
        private isChange;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        private addSM;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDetailEOSM extends GContentBase {
        private readonly detailDto;
        private readonly detailHeaderOpt;
        private readonly tabGroupsOpt;
        private readonly tabOpt;
        private readonly detailOpt;
        private readonly oborySluzListDescription;
        private readonly odbornostListDescription;
        private readonly prilohyListDescription;
        private isChange;
        private gridObory;
        private gridOdbornost;
        private gridPrilohy;
        private tabmanagerZk;
        private tabmanagerZn;
        private readonly tabJazZkID;
        private readonly tabJazZnID;
        private isChangeObory;
        private isChangeOdbornost;
        private isChangePrilohy;
        private readonly MAX_JAZ_ZKOUSKY;
        private readonly MAX_JAZ_ZK_SKUPINY;
        private readonly MAX_JAZ_ZNALOSTI;
        private readonly MAX_JAZ_ZN_SKUPINY;
        onContentReady(): void;
        private loadData;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createTabDetail(): any;
        private loadJazyky;
        private loadObory;
        private loadOdbornost;
        private loadPrilohy;
        private validateEmail;
        private validateObory;
        private showErrorDialog;
        private isDetailValid;
        private updateSaveButton;
        private saveDtosJazyky;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDetailEOSMOld extends GContentBase {
        protected DtoMisto: Per.Interface.GSluzMistaEosmDto;
        private isChange;
        private gridObory;
        private gridOdbornost;
        private gridPrilohy;
        private tabmanager;
        private tabmanagerZk;
        private tabmanagerZn;
        private readonly tabVybRizeniID;
        private readonly tabOborySluzID;
        private readonly tabJazykyID;
        private readonly tabOdbornostID;
        private readonly tabDobaUrcitaID;
        private readonly tabMistoPodaniID;
        private readonly tabAdresaPodaniID;
        private readonly tabKontaktID;
        private readonly tabPrilohyID;
        private readonly tabJazZkSk1ID;
        private readonly tabJazZkSk2ID;
        private readonly tabJazZkSk3ID;
        private readonly tabJazZnSk1ID;
        private readonly tabJazZnSk2ID;
        private readonly tabJazZnSk3ID;
        private listJazykyDto;
        private isLoadedObory;
        private isLoadedOdbornost;
        private isLoadedPrilohy;
        private isChangeObory;
        private isChangeOdbornost;
        private isChangePrilohy;
        private readonly MAX_JAZ_ZKOUSKY;
        private readonly MAX_JAZ_ZK_SKUPINY;
        private readonly MAX_JAZ_ZNALOSTI;
        private readonly MAX_JAZ_ZN_SKUPINY;
        onContentReady(): void;
        private loadData;
        private loadJazyky;
        private loadObory;
        private loadOdbornost;
        private loadPrilohy;
        private validateEmail;
        private validateObory;
        private showErrorDialog;
        private isDetailValid;
        private setFocusOnError;
        private updateSaveButton;
        private saveDtosJazyky;
        private initFormHeader;
        private initFormDetail;
        private initTabFormVybRizeni;
        private initTabGridOborySluzby;
        private initTabJazyky;
        private initTabGridOdbornost;
        private initTabFormDobaUrcita;
        private initTabFormMistoPodani;
        private initTabFormAdresaPodani;
        private initTabFormKontakt;
        private initTabGridPrilohy;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDetailHlavickyDavky extends GContentBase {
        private readonly dtoDavka;
        private readonly RucniEditace;
        private readonly detailDescription;
        private isChange;
        onContentReady(): void;
        private updateOkButton;
        /**Validace zadání ID dávky*/
        private validateIdDavky;
        /**Validace zadání OVM*/
        private validateKodOvm;
        private validateOsoMail;
        private validateOsoTel;
        private validateEmailVysl;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDetailHlavickyDavkyOld extends GContentBase {
        protected DtoDavka: Per.Interface.GDavkyEosmDto;
        protected RucniEditace: boolean;
        private isChange;
        onContentReady(): void;
        private updateOkButton;
        /**Validace zadání ID dávky*/
        private validateIdDavky;
        /**Validace zadání OVM*/
        private validateKodOvm;
        private validateOsoMail;
        private validateOsoTel;
        private validateEmailVysl;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKomISoSSEvidSym extends GContentBase {
        private readonly BtnSendVis;
        private readonly BtnVerifyVis;
        private readonly BtnSaveXMLVis;
        private readonly BtnrReadXMLVis;
        private readonly dataListDescription;
        private isXMLDownloaded;
        private grid;
        onContentReady(): void;
        private jeKonecStav;
        /**Validace DTO */
        private kontrolaDatDavky;
        private handleError;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKomISoSSEvidSymOld extends GContentBase {
        private BtnSendVis;
        private BtnVerifyVis;
        private BtnSaveXMLVis;
        private BtnrReadXMLVis;
        private isXMLDownloaded;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        private jeKonecStav;
        /**Validace DTO */
        private kontrolaDatDavky;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GOrganizacniStruktura extends GContentBase {
        private readonly IxsVos;
        private readonly dataListDescription;
        private readonly dataListDescriptionSym;
        private readonly dataListDescriptionOso;
        private readonly oceBar;
        private currentDateFactor;
        private currentFindFactor;
        private firstRunOce;
        private firstRunSym;
        private firstRunOso;
        private treeOpened;
        private form_filter;
        private tabOce;
        private gridOce;
        private gridSym;
        private gridOsoby;
        private aktOce;
        private jePriprava;
        private tabSym;
        private tabOso;
        dtoSYM: Gordic.Per.Interface.GInfoSymDto;
        filterAktivni: boolean;
        filterPriprava: boolean;
        filterDatum: Date;
        Datum: string;
        onContentReady(): void;
        private SymCondFormat;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.1.0.0
 */
declare namespace Gordic.Pes.WebClient {
    class GOrganizacniStrukturaOld extends GContentBase {
        dtoOCE: Gordic.Per.Interface.GDetailOceDto;
        dtoSYM: Gordic.Per.Interface.GInfoSymDto;
        private listDtoOsoby;
        private listDtoSym;
        private index;
        private readonly IxsVos;
        private readonly JePripravna;
        filterDatum: Date;
        filterDruh: number;
        filterAktivni: boolean;
        filterPriprava: boolean;
        aktivita: any;
        ixs_vos: any;
        Datum: string;
        private view_SYM;
        private wiz;
        private form_filter;
        private gridOce;
        private gridSym;
        private gridOsoby;
        onContentReady(): void;
        private symCondFormat;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Denisa Chaloupková
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailKontaktAkt extends GContentBase {
        private readonly OceNazev;
        private readonly DatPlatOdOce;
        private readonly HistorieKontaktDtos;
        private readonly KontaktOceDto;
        private readonly detailOpt;
        private readonly historieListDescription;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 480.1.0.0
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailKontaktTab extends GContentBase {
        protected dtoKontaktOce: Gordic.Per.Interface.GKontaktOceDto;
        protected DetailOceDto: Gordic.Per.Interface.GDetailOceDto;
        protected IxsOceNad: string;
        private view;
        Action: EnumActions;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Denisa Chaloupková
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailOceTabAkt extends GContentBase {
        private Detail;
        private readonly IxsOce;
        private readonly IxsOceNad;
        private readonly IxsVos;
        private readonly IxsOceCopy;
        private readonly Action;
        private readonly ParametrPerRadExpIdm;
        private readonly detailOceDescription;
        private readonly historieOceDescription;
        private readonly historieVazbyDescription;
        private readonly tabGroupsOpt;
        private readonly tabOpt;
        private gridZmeny;
        private gridVazby;
        protected dtoDetailOce: Gordic.Per.Interface.GDetailOceDto;
        protected dtoKontaktOce: Gordic.Per.Interface.GKontaktOceDto;
        private jeZmenaKontakt;
        protected dtoNksOce: Gordic.Per.Interface.GNksOceDto;
        protected listDtoNksOce: Gordic.Per.Interface.GNksOceDto[];
        private jeZmenaNks;
        protected dtoVazbyOce: Gordic.Per.Interface.GVazbyOceDto;
        protected dtoZmenyOce: Gordic.Per.Interface.GZmenyOceDto;
        protected listDtoZmenyOce: Gordic.Per.Interface.GZmenyOceDto[];
        private IxsOcePuv;
        private jePriprava;
        private isChange;
        Datum: Date;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createTabDetail(): any;
        ok(): Promise<void>;
        applyDetail(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 480.1.0.0
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailOceTabOld extends GContentBase {
        protected dtoDetailOce: Gordic.Per.Interface.GDetailOceDto;
        protected dtoKontaktOce: Gordic.Per.Interface.GKontaktOceDto;
        protected listDtoKontaktOce: Gordic.Per.Interface.GKontaktOceDto[];
        private jeZmenaKontakt;
        protected dtoNksOce: Gordic.Per.Interface.GNksOceDto;
        protected listDtoNksOce: Gordic.Per.Interface.GNksOceDto[];
        private jeZmenaNks;
        protected dtoVazbyOce: Gordic.Per.Interface.GVazbyOceDto;
        protected dtoZmenyOce: Gordic.Per.Interface.GZmenyOceDto;
        protected listDtoZmenyOce: Gordic.Per.Interface.GZmenyOceDto[];
        protected valDetailOce: any;
        protected Ixsocenad: any;
        private IxsOce;
        protected Ixsvos: any;
        private IxsOcePuv;
        private jePriprava;
        Action: EnumActions;
        Datum: Date;
        private view;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Denisa Chaloupková
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailUcetTabAkt extends GContentBase {
        private readonly OceNazev;
        private readonly HistorieNksDtos;
        private readonly NksOceDto;
        private readonly detailOpt;
        private readonly historieListDescription;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 480.1.0.0
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailUcetTab extends GContentBase {
        protected dtoNksOce: Gordic.Per.Interface.GNksOceDto;
        protected valNksOce: any;
        protected DetailOceDto: Gordic.Per.Interface.GDetailOceDto;
        private view;
        Action: EnumActions;
        onContentReady(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GZarazeniOce extends GContentBase {
        protected dtoVazbyOce: Gordic.Per.Interface.GVazbyOceDto;
        protected Ixsocenad: string;
        onContentReady(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GZarazeniSym extends GContentBase {
        protected dtoVazbySym: Gordic.Per.Interface.GVazbySymDto;
        protected Ixsocenad: string;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.0
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailCinnostiTab extends GContentBase {
        protected dtoZmenySym: Gordic.Per.Interface.GZmenySymDto;
        protected dtoPovolaniSym: Gordic.Per.Interface.GPovolaniSymDto[];
        private readonly JeSluzMisto;
        private readonly Action;
        private readonly DruhTab;
        private readonly PlatTrida;
        private readonly Datum;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        private setPlatTridaFilter;
        closing(obj: any): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Denisa Chaloupková
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailSymTabAct extends GContentBase {
        private Action;
        private IxsSym;
        private readonly IxsVos;
        private readonly IxsOce;
        private detailSymDto;
        private readonly detailHeaderOpt;
        private readonly tabGroupsOpt;
        private readonly tabOpt;
        private readonly detailOpt;
        private readonly detailZkouskyOpt;
        private readonly detailZnalostiOpt;
        private readonly historieZmenyListDescription;
        private readonly historieVazbyListDescription;
        private readonly slozkyPlatuListDescription;
        private readonly agendyListDescription;
        private readonly cinnostiListDescription;
        private readonly zamVzdelaniListDescription;
        private readonly oboryVzdelaniListDescription;
        private readonly dalsiVzdelaniListDescription;
        private readonly kategorizaceListDescription;
        private readonly hmotnaOdpListDescription;
        private readonly vyberoveRizeniListDescription;
        private readonly vzdelavaciPozListDescription;
        private readonly pouzivatSazbu;
        private readonly jeMoznyPrepis;
        private isSaved;
        private formNames;
        private jeSluzba;
        private jeStatZamestnanec;
        private jePracPomer;
        private prizEnableVybRizeni;
        private hasDetailChanged;
        private jeZmenaSlozkyPlatu;
        private jeZmenaAgendy;
        private jeZmenaCinnosti;
        private jeZmenaDalsiVzd;
        private jeZmenaJazyky;
        private jeZmenaTextSpec;
        private jeZmenaKategorizace;
        private jeZmenaOdpovednost;
        private jeZmenaVybRizeni;
        private jeZmenaKomise;
        private jeZmenaUchazeci;
        private jeZmenaVzdPozadavky;
        private jeZmenaPovolani;
        private jeZmenaZamVzdelani;
        private jeZmenaOboryVzd;
        private jeZmenaZastupSym;
        private jeZmenaOborySluzby;
        private jeZmenaRoleIdm;
        private prizTextVybaveniLoaded;
        private prizTextPopisLoaded;
        private prizTextNocLoaded;
        private prizTextZvlPriplatekLoaded;
        private prizTextZtizProsLoaded;
        private prizTextVzdelaniLoaded;
        private prizJazykZkouskyLoaded;
        private prizJazykZnalostiLoaded;
        private prizOboryVzdelaniLoaded;
        private prizDalsiVzdelaniLoaded;
        private prizTextDusPozadavkyLoaded;
        private prizTextFyzPozadavkyLoaded;
        private prizTextJineOdbPozadavkyLoaded;
        private prizTextCinZdravZamLoaded;
        private prizTextRizikaLoaded;
        private prizTextPracPodminkyLoaded;
        private prizKategorizaceLoaded;
        private prizTextHmotnaOdpLoaded;
        private prizHmotnaOdpLoaded;
        private prizVybRizLoaded;
        private prizPozadavkyLoaded;
        private prizSlozkyPlatuLoaded;
        private prizHistZmenySymLoaded;
        private prizHistVazbySymLoaded;
        private prizAgendyLoaded;
        private prizCinnostiLoaded;
        private prizZamereniVzdLoaded;
        private prizPracPomerLoaded;
        private prizOborySluzbyLoaded;
        private prizRoleIdmLoaded;
        private jePriprava;
        private readonly zmenySymDtoFields;
        private poradiVybRizeni;
        private komiseView;
        private uchazeciView;
        private readonly JeCT;
        private readonly JeBIS;
        private readonly JeCS;
        private readonly JeISTA;
        private readonly JeMPO;
        /**Povolení exportu do IDM*/
        private readonly ParametrPerRadExpIdm;
        private readonly ParametrPesRadUrKomM;
        private readonly ParametrPesRadVuCpz;
        private readonly ParametrPesZobrAktDetSYM;
        private readonly ParametrPesGenIdSYM;
        private readonly ParametrPesRadDatnast;
        private readonly MAX_POCET_ZKOUSKY;
        private readonly MAX_POCET_ZKOUSKY_ROWS;
        private scopeZkousky;
        private groupsZkousky;
        private tabmanagerZkousky;
        private groupCountZkousky;
        private formDetailZkouskyList;
        private readonly MAX_POCET_ZNALOSTI;
        private readonly MAX_POCET_ZNALOSTI_ROWS;
        private scopeZnalosti;
        private groupsZnalosti;
        private tabmanagerZnalosti;
        private groupCountZnalosti;
        private formDetailZnalostiList;
        private gridHistZmenySym;
        private gridHistVazbySym;
        private gridSlozkyPlatu;
        private gridAgendy;
        private gridCinnosti;
        private gridZamVzdelani;
        private gridOboryVzdelani;
        private gridDalsiVzdelani;
        private gridKategorizace;
        private gridHmotOdp;
        private gridKomModel;
        private gridVybRizeni;
        private gridVzdPozadavky;
        private tabPovolaniDiv;
        private ridicOpravneni;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        closing(): boolean;
        loadDataDetail(loadDb?: boolean): void;
        createTabDetail(): any;
        private updateSaveButton;
        private setCelkStupen;
        private getPopisTextSpecDialog;
        private setStatSluzbu;
        private sluzOznaceniDlePlatTridy;
        private porovnatSluzOznac;
        private sluzHodnostDlePlatTrida;
        private porovnatSluzHodnost;
        private stupenVzdDlePlatTrida;
        private porovnatStupenVzd;
        private stupenVzdISoSSDlePlatTrida;
        private porovnatStupenVzdISoSS;
        private prepocetPusobnosti;
        private minPlatTridaDleSluzOznac;
        private minPlatTridaDleSluzHodnost;
        private prevodStupenVzdNaISoSS;
        private prevodISoSSStupenVzd;
        private jeZmenaHist;
        private saveDetail;
        private savePovolaniDto;
        private saveRoleIdmDto;
        private saveZastupSymDto;
        private saveOborySluzbyDto;
        private saveJazykyDto;
    }
}
declare namespace Gordic.Pes.WebClient {
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 480.1.0.0
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailSymTab extends GContentBase {
        private jeZmena;
        protected dtoOce: Gordic.Per.Interface.GDetailOceDto;
        protected dtoSym: Gordic.Per.Interface.GInfoSymDto;
        protected dtoZmenySym: Gordic.Per.Interface.GZmenySymDto;
        protected dtoCinnostiSym: Gordic.Per.Interface.GCinnostiSymDto;
        protected dtoDalsiVzdelani: Gordic.Per.Interface.GDalsiVzdelaniSymDto;
        protected dtoJazykySym: Gordic.Per.Interface.GJazykySymDto;
        protected dtoTextSpecifikaceSym: Gordic.Per.Interface.GTextSpecifikaceSymDto;
        protected dtoKategorizaceSym: Gordic.Per.Interface.GKategorizaceSymDto;
        protected dtoKompetencniModel: Gordic.Per.Interface.GKompetencniModelDto;
        protected dtoHmotnaOdpovednost: Gordic.Per.Interface.GOdpovednostSymDto;
        protected dtoVyberoveRizeni: Gordic.Per.Interface.GVyberoveRizeniSymDto;
        protected dtoVzdPozadavky: Gordic.Per.Interface.GPozadavkySymDto;
        protected dtoHistorieSym: Gordic.Per.Interface.GZmenySymDto;
        protected dtoVazbySym: Gordic.Per.Interface.GVazbySymDto;
        protected dtoPovolaniSym: Gordic.Per.Interface.GPovolaniSymDto;
        protected listDtoZmenySym: Gordic.Per.Interface.GZmenySymDto[];
        protected listDtoDalsiVzdelani: Gordic.Per.Interface.GDalsiVzdelaniSymDto[];
        protected listJazykySym: Gordic.Per.Interface.GJazykySymDto[];
        protected listDtoTextSpecifikaceSym: Gordic.Per.Interface.GTextSpecifikaceSymDto[];
        protected listDtoKategorizaceSym: Gordic.Per.Interface.GKategorizaceSymDto[];
        protected listDtoHmotnaOdpovednost: Gordic.Per.Interface.GOdpovednostSymDto[];
        protected listDtoVyberoveRizeni: Gordic.Per.Interface.GVyberoveRizeniSymDto[];
        protected listDtoKomise: Gordic.Per.Interface.GKomiseSymDto[];
        protected listDtoUchazeci: Gordic.Per.Interface.GUchazeciSymDto[];
        protected listDtoVzdPozadavky: Gordic.Per.Interface.GPozadavkySymDto[];
        protected listDtoPovolaniSym: Gordic.Per.Interface.GPovolaniSymDto[];
        private jeZmenaCinnosti;
        private jeZmenaDalsiVzd;
        private jeZmenaJazyky;
        private jeZmenaTextSpec;
        private jeZmenaKategorizace;
        private jeZmenaOdpovednost;
        private jeZmenaVybRizeni;
        private jeZmenaKomise;
        private jeZmenaUchazeci;
        private jeZmenaVzdPozadavky;
        private jeZmenaPovolani;
        private jeZmenaSlozky;
        private jeSluzba;
        private jeStatZamestnanec;
        private jePracPomer;
        private jeKategorieISoSS;
        private poradiVybRizeni;
        protected valDetailSym: any;
        private jePriprava;
        private jeMoznyPrepis;
        private IxsSym;
        private readonly IxsVos;
        /**Povolení exportu do IDM*/
        protected readonly ParametrPerRadExpIdm: boolean;
        protected readonly JeCT: boolean;
        protected readonly JeBIS: boolean;
        protected readonly JeCS: boolean;
        private readonly JeISTA;
        protected readonly ParametrPesRadPriCin: boolean;
        protected readonly ParametrPesPristSlozkyMzdy: boolean;
        protected readonly ParametrPesRadPriVzd: boolean;
        protected readonly ParametrPesRadPriPoz: boolean;
        protected readonly ParametrGinIsossReadyBool: boolean;
        protected readonly ParametrPesRadPriPod: boolean;
        protected readonly ParametrPesRadPriHmo: boolean;
        protected readonly ParametrPesRadPriKom: boolean;
        protected readonly ParametrPesRadUrKomM: number;
        protected readonly ParametrPesRadPriVyb: boolean;
        protected readonly ParametrPesRadPriPev: boolean;
        private readonly ParametrPesRadDatnast;
        private readonly ParametrPerMVCis;
        private readonly ParametrPesEvidPracoviste;
        private readonly ParametrPerRadPovPouEvidDobuUr;
        private readonly ParametrPerRadPovPusobnosti;
        private readonly ParametrPesRadVuCpz;
        private readonly pouzivatSazbu;
        private readonly jeProvazba;
        private readonly ParametrPesExtIdISoSS;
        private readonly jeDoplMisto;
        private readonly ParametrPesKontrolaSlozky;
        private readonly IxsTks;
        private PovoleniCinnostPovolani;
        private PovoleniCinnostPopis;
        private PovoleniCinnostVybaveni;
        Aktivni: boolean;
        Datum: Date;
        Action: EnumActions;
        private view_Zmeny;
        private view_Cinnosti;
        private view_DalsiVzdelani;
        private view_JazykySYM;
        private view_HmotOdpovednost;
        private view_Kategorizace;
        private view_TextSpecifikace;
        private view_VzdelavaciPozadavky;
        private view_Povolani;
        private view_ZastupySym;
        private readonly maxPocetZkousky;
        private readonly maxPocetZkouskyRows;
        private skupinyZkousky;
        private groupsZkousky;
        private tabmanagerZkousky;
        private groupCountZkousky;
        private readonly maxPocetZnalosti;
        private readonly maxPocetZnalostiRows;
        private skupinyZnalosti;
        private groupsZnalosti;
        private tabmanagerZnalosti;
        private groupCountZnalosti;
        private width_Confirm;
        /**Pořadí pro přidání nové činnosti před uložením, aby ve view nebyl stejný klíč*/
        private poradiCinnost;
        private gridCinnosti;
        private gridVzdelani;
        private gridKategorizace;
        private gridHmotOdp;
        private gridKomModel;
        private gridVybRizeni;
        private gridVzdPozadavky;
        private gridSlozkyPlatu;
        private gridAgendy;
        private gridHistorieZmeny;
        private gridHistorieVazby;
        private tabPovolani;
        private textDivPovolani;
        private formDetailSym;
        /**Formulář - pracovní poměr*/
        private formDetailPracPom;
        /**Formulář u gridu Složky platu*/
        private formSlozkyPlatuGrid;
        /**Formulář - činnosti - popis činností */
        private formCinnostiPopis;
        /**Formulář - činnosti - činnosti s nárokem na příplatek*/
        private formCinnostNarok;
        /**Formulář - činnosti - vybavení k činnosti*/
        private formCinnostiVybaveni;
        /**Formulář - vzdělání požadované pro obsazení SYM*/
        private formVzdelani;
        /**Formulář - vzdělání - textový popis požadavků na vzdělání*/
        private formPopisPozadavku;
        /**Formulář - duševní požadavky*/
        private formDusePozadavky;
        /**Formulář - fyzické požadavky*/
        private formFyzickePozadavky;
        /**Formulář - jiné odborné požadavky*/
        private formJineOdbPozadavky;
        /**Formulář - pracovní podmínky a rizika - stupeň zátěže*/
        private formStupenZateze;
        /**Formulář - pracovní podmínky a rizika - specifikace zdravotní způsobilosti*/
        private formSpecZdrZpus;
        /**Formulář - pracovní podmínky a rizika - činnosti ovlivňující zdraví zaměstnanců*/
        private formCinZdrZam;
        /**Formulář - pracovní podmínky a rizika - rizika*/
        private formRizika;
        /**Formulář - pracovní podmínky a rizika - pracovní podmínky*/
        private formPracPodminky;
        /**Formulář - Hmotná odpovědnost činnosti*/
        private formCinHmotOdpCinnosti;
        /**Formulář - kompetenční model*/
        private formKomModel;
        /**Formulář - provazba*/
        private formProvazba;
        private tabmanager;
        private readonly pracovniPomerTabId;
        private readonly provazbaTabId;
        private readonly slozkyPlatuTabId;
        private readonly agendyTabId;
        private readonly cinnostTabId;
        private readonly vzdelaniTabId;
        private readonly pozadavkyTabId;
        private readonly pracPodminkyRizikaTabId;
        private readonly hmotOdpovednostTabId;
        private readonly kompModelTabId;
        private readonly vybRizeniTabId;
        private readonly vzdPozadavkyTabId;
        private readonly historieTabId;
        private ridicOpravneni;
        onContentReady(): void;
        ok(): void;
        private ulozJazyky;
        closing(): JQuery.Promise<any, any, any>;
        private getGridFormatKomModel;
        private setStatSluzbu;
        private getDefaultColumnListHistSym;
        private getGridFormatHistSym;
        private getPopisTextSpecDialog;
        private getGridFormatSlozkyPlatu;
        private getGridFormatAgendy;
        private getGridFormatCinnosti;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GSeznamRidicOpr extends GContentBase {
        private readonly Opravneni;
        onContentReady(): void;
        private calcFlags;
        private flagsToSet;
        closing(data: any): any;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDalsiVzdelaniDetail extends GContentBase {
        private readonly Action;
        private readonly Dto;
        private readonly detailOpt;
        private readonly pageId;
        private readonly ParametrPesRadVuCpz;
        onContentReady(): void;
        closing(dto: any): any;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GHmotOdpovednostDetail extends GContentBase {
        private readonly Action;
        private readonly Dto;
        private readonly detailOpt;
        private readonly pageId;
        onContentReady(): void;
        closing(dto: any): any;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GKategorizaceDetail extends GContentBase {
        private readonly Action;
        private readonly Dto;
        private readonly detailOpt;
        private readonly pageId;
        onContentReady(): void;
        closing(dto: any): any;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDetailSlozkySym extends GContentBase {
        private readonly IxsHciKsm;
        private readonly Dto;
        private readonly Action;
        private readonly detailOpt;
        private readonly pageId;
        private readonly pouzivatSazbu;
        private readonly kontrolaRozsahu;
        private readonly ListSlozkyPlatu;
        private readonly ixsTks;
        private druhPpv;
        private nastavitPoznamku;
        onContentReady(): void;
        closing(dto: any): any;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GDetailVzdPozadavkyImportTab extends GContentBase {
        protected dtoSym: Gordic.Per.Interface.GInfoSymDto;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.3
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailVzdPozadavkyTab extends GContentBase {
        protected dtoVzdPozadavky: Gordic.Per.Interface.GPozadavkySymDto;
        protected valVzdPozadavky: any;
        protected dtoSym: Gordic.Per.Interface.GCiselnikSymDto;
        Action: EnumActions;
        Aktivni: boolean;
        Datum: Date;
        onContentReady(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GPozadavkyDetail extends GContentBase {
        private readonly Action;
        private readonly Dto;
        private readonly detailOpt;
        private readonly pageId;
        onContentReady(): void;
        closing(dto: any): any;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Denisa Chaloupková
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailVybRizeni extends GContentBase {
        private readonly Action;
        private readonly Dto;
        private readonly tabGroupsOpt;
        private readonly tabOpt;
        private readonly formHeaderOpt;
        private readonly detailOpt;
        private readonly komiseListDescription;
        private readonly uchazeciListDescription;
        private readonly komiseList;
        private readonly uchazeciList;
        private readonly ParametrPerPovStatZam;
        private formNames;
        private jeZmenaKomise;
        private jeZmenaUchazeci;
        private prizKomiseLoaded;
        private prizUchazeciLoaded;
        private ixs_esu_vitez;
        private gridKomise;
        private gridUchazeci;
        private formOsoKomiseDetail;
        private formOsoUchazecDetail;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        loadDataDetail(loadDb?: boolean): void;
        createTabDetail(): any;
        private updateSaveButton;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.3
 */
declare namespace Gordic.Pes.WebClient {
    class GDetailVyberoveRizeniTab extends GContentBase {
        protected dtoVyberoveRizeni: Gordic.Per.Interface.GVyberoveRizeniSymDto;
        protected valVyberoveRizeni: any;
        protected dtoSym: Gordic.Per.Interface.GInfoSymDto;
        protected listDtoKomise: Gordic.Per.Interface.GKomiseSymDto[];
        protected listDtoUchazeci: Gordic.Per.Interface.GUchazeciSymDto[];
        private jeZmenaKomise;
        private jeZmenaUchazeci;
        Action: EnumActions;
        Aktivni: boolean;
        Datum: Date;
        onContentReady(): void;
        ok(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GVybRizeniOdstraneniTab extends GContentBase {
        private jeVymazani;
        onContentReady(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.10
 */
declare namespace Gordic.Pes.WebClient {
    class GZarSymPpvDetailTab extends GContentBase {
        private readonly detailDto;
        private readonly DtoInfoSym;
        private readonly detailHeaderOpt;
        private readonly tabGroupsOpt;
        private readonly tabOpt;
        private readonly detailOpt;
        private readonly historieListDescription;
        Action: EnumActions;
        private grid;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createTabDetail(): any;
        private updateSaveButton;
        private loadHist;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Pavel Švehla
 * @since 482.1.0.10
 */
declare namespace Gordic.Pes.WebClient {
    class GZarSymPpvDetailTabOld extends GContentBase {
        protected dtoDetailOsoba: Gordic.Per.Interface.GPracZarazeniDto;
        protected dtoInfoSym: Gordic.Per.Interface.GInfoSymDto;
        Action: EnumActions;
        private grid;
        onContentReady(): void;
        ok(): void;
    }
}
/**
 * Gordic.Pes.WebClient
 *
 * @author Denisa Chaloupková
 *
 */
declare namespace Gordic.Pes.WebClient {
    class GOrganogram extends GContentBase {
        Datum: Date;
        Aktivni: boolean;
        private organogram;
        private dtoNastaveni;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pes.WebClient {
    class GSeznamOrgVerze extends GContentBase {
        private grid;
        private ParametrPevRozEvidVzdSubjektu;
        private ParametrPevRadRozEvidKurzu;
        private jeInterni;
        onContentReady(): void;
        private zalozeniSubjektu;
    }
}
declare namespace Gordic.Pes.WebClient {
    function NastavitPES(dto: GSettingPESDto): Forms.Form[];
}
