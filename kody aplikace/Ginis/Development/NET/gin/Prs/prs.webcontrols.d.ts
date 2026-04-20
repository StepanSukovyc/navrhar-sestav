declare namespace Gordic.Prs.Dialogs {
    function zadaniSouradnicDlg(content: GContent, model: any, disabled: boolean): JQuery.Deferred<any, any, any>;
}
declare namespace Gordic.Prs.WebControls {
    function GOverListinyControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent;
}
declare namespace Gordic.Prs.WebControls {
    class GDetailOverListiny extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>> implements IGContent {
        IxsRch: string;
        PorCisRch: number;
        TypZobrazeni: any;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        onContentReady(): void;
        /**
        * onDetailBuilderInit
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spu�t�n� po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GDetailParkovaciKarty extends GContentBase {
        model: Gordic.Prr.Interface.GPrrZonyPlacenehoStaniDto;
        onContentReady(): void;
        createDetailForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GDetailRychlomeru extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>> implements IGContent {
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        IxsRch?: string;
        private profilTab;
        private overListinyTab;
        onContentReady(): void;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createDetailForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GLustraceZPS extends GContentBase {
        private filterFormElement;
        private grid;
        private dataView;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
        private loadData;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekCRR extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekCRR>>>> implements IGContent {
        osobaTab: JQuery<HTMLElement>;
        ridicOprTab: JQuery<HTMLElement>;
        ridicPrTab: JQuery<HTMLElement>;
        mezRidicPrTab: JQuery<HTMLElement>;
        ciziRidicPrTab: JQuery<HTMLElement>;
        prukazyProfZpTab: JQuery<HTMLElement>;
        pripadyTab: JQuery<HTMLElement>;
        zakazyRizeniTab: JQuery<HTMLElement>;
        pozbytiPravaTab: JQuery<HTMLElement>;
        blokaceRidicOprTab: JQuery<HTMLElement>;
        skoleniBezpJizdyTab: JQuery<HTMLElement>;
        prezkouseniTab: JQuery<HTMLElement>;
        zdravotniOmezeniTab: JQuery<HTMLElement>;
        profesniOsvUciteleAutoskolyTab: JQuery<HTMLElement>;
        grid: JQuery;
        model: Gordic.Prr.Interface.GCrrsresDto;
        faze: string;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createGrid;
        private createOsobaTab;
        private createRidicOprGridFormat;
        private createRidicPrukGridFormat;
        private createMezinarRidicPrukGridFormat;
        private createCiziRidicPrukGridFormat;
        private createPrukProfZpusGridFormat;
        private createPripadyGridFormat;
        private createZakazyRizeniGridFormat;
        private createPozbytiPravaRizeniGridFormat;
        private createBlokaceRidicOprGridFormat;
        private createSkoleniBezpJizdyGridFormat;
        private createPrezkouseniGridFormat;
        private createZdravotniOmezeniTab;
        private createProfOsvUciteleAutoskolyGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekCRV extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekCRV>>>> implements IGContent {
        GPrrlrvoDto: any;
        faze: string;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createDetailForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekCRZ extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekCRZ>>>> implements IGContent {
        zakladniInfoTab: JQuery<HTMLElement>;
        zbrojniLicenceTab: JQuery<HTMLElement>;
        evropskyZbrojniPasTab: JQuery<HTMLElement>;
        municniOpravneniTab: JQuery<HTMLElement>;
        aprobaceTab: JQuery<HTMLElement>;
        zapsanaAutorizaceTab: JQuery<HTMLElement>;
        ohlaseneZbraneTab: JQuery<HTMLElement>;
        povoleniR3: JQuery<HTMLElement>;
        vedlejsiZbraneTab: JQuery<HTMLElement>;
        zbraneHlavnihoDrziteleTab: JQuery<HTMLElement>;
        vyjimkyNadlimitniZasobnikTab: JQuery<HTMLElement>;
        vyjimkyR1: JQuery<HTMLElement>;
        vyjimkyR2S2Tab: JQuery<HTMLElement>;
        vyjimkyS1Tab: JQuery<HTMLElement>;
        prilohaTab: JQuery<HTMLElement>;
        grid: JQuery;
        model: any;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createGrid;
        private createZakladniInfoTab;
        private createZbrojniLicenceGF;
        private createEvropskyZbrojniPasGF;
        private createMunicniOpravneniGF;
        private createAprobaceGF;
        private createZapsanaAutorizaceGF;
        private createOhlaseniZbraneGF;
        private createPovoleniZbranR3GF;
        private createHlavniAVedlejsiZbraneGF;
        private createVyjimkyNaZbranR1GF;
        private createVyjimkyNaZbranR2S2GF;
        private createVyjimkyNaStrelivoS1GF;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekISEP extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekISEP>>>> implements IGContent {
        grid: JQuery;
        model: any;
        IxsPri: string;
        IxsUda: string;
        Mp: boolean;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekOP extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekOP>>>> implements IGContent {
        fotoTab: JQuery<HTMLElement>;
        obcanskePrukazyTab: JQuery<HTMLElement>;
        grid: JQuery;
        parametryHledani: any;
        modelOP: any;
        modelFoto: any;
        stav: string;
        zprava: string;
        existujeCRRCert: boolean;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createFotoForm;
        private createOPGrid;
        private createOPGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekPATRMV extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekPATRMV>>>> implements IGContent {
        model: Gordic.Prr.Interface.GPrrPatrmvDto;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createDetailForm;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GVysledekPATROS extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GVysledekPATROS>>>> implements IGContent {
        model: Gordic.Prr.Interface.GPrrPatrosDto;
        onContentReady(): void;
        /**
          * onDetailBuilderInit
          *
          * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
          */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spu�t�n� po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createDetailForm;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniCRR extends GContentBase {
        model: Gordic.Prr.Interface.GCrrsresDto;
        onContentReady(): void;
        createFilterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniCRV extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Prs.WebControls.GZadaniCRV>>>> implements IGContent {
        model: any;
        onContentReady(): void;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Funkce detailbuilderu, spuštěná po merge komponent
        *
        * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createFilterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniCRZ extends GContentBase {
        onContentReady(): void;
        createFilterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniISEP extends GContentBase {
        model: Gordic.Prr.Interface.GPrrOpisPrestupkuRequestDto;
        modelIco: Gordic.Prr.Interface.GPrrOpisPrestupkuPravnickaRequestDto;
        modelCizinec: Gordic.Prr.Interface.GPrrOpisPrestupkuCizinecRequestDto;
        modelCizinecIco: Gordic.Prr.Interface.GPrrOpisPrestupkuCizinecPravnickaRequestDto;
        IxsEsu: string;
        IxsPri: string;
        IxsUda: string;
        isepDisabled: boolean;
        dotazVytvorDokument: boolean;
        onContentReady(): void;
        createFilterForm(): Gordic.Forms.Form;
        private navigateToVysledek;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniOP extends GContentBase {
        parametryHledani: any;
        onContentReady(): void;
        createFilterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniPATRMV extends GContentBase {
        model: Gordic.Prr.Interface.GPatrmvParametryHledaniDto;
        onContentReady(): void;
        createFilterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GZadaniPATROS extends GContentBase {
        model: Gordic.Prr.Interface.GPatrosParametryHledaniDto;
        onContentReady(): void;
        createFilterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GRegistrPsu extends GContentBase {
        private filterFormElement;
        private grid;
        private dataView;
        nacitatSeznam: boolean;
        typPohledavky: string;
        private majitelFilter?;
        private zbarveniFilter?;
        private plemenoFilter?;
        private znamkaFilter?;
        private cipFilter?;
        onContentReady(): void;
        private createFilter;
        private createGrid;
        private createGridFormat;
        private loadData;
        private nactiFiltry;
        private ulozFiltry;
        private resetFiltru;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GRegistrRychlomeru extends GContentBase {
        private filterFormElement;
        private grid;
        private dataView;
        nacitatSeznam: boolean;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
        private loadData;
        private openNovyRychlomerDialog;
    }
}
declare namespace Gordic.Prm.AppSettings {
    function NastaveniSeznamyPRM(): Forms.Form;
}
declare namespace Gordic.Prr.AppSettings {
    function NastaveniSeznamyPRR(): Forms.Form;
    function NastaveniOstatniPRR(): Forms.Form;
    function NastaveniHromOperacePRR(): Forms.Form;
}
declare namespace Gordic.Prs.WebControls {
    function createHORozsirenyFiltr(form: Gordic.Forms.Form): Gordic.Forms.Form;
}
declare namespace Gordic.Prs.Global.Bitmap {
    function stavPripaduColumn(): GGridColumn<any>;
    function umrtiZruseniESUColumn(column: string, caption: string): GGridColumn<any>;
    function overeniISZRColumn(column: string, caption: string): GGridColumn<any>;
    function prilohaUdaColumn(column: string, caption: string): GGridColumn<any>;
    function odeslaniUdaColumn(column: string, caption: string): GGridColumn<any>;
    function odeslaniUdaEpkColumn(column: string, caption: string): GGridColumn<any>;
    function podanoVysvetleniColumn(column: string, caption: string): GGridColumn<any>;
    function datovaSchrankaColumn(column: string, caption: string): GGridColumn<any>;
    function dorucovaciAdresaColumn(column: string, caption: string): GGridColumn<any>;
    function ddpColumn(column: string, caption: string): GGridColumn<any>;
    function odporColumn(column: string, caption: string): GGridColumn<any>;
    function dleDatPravColumn(column: string, caption: string): GGridColumn<any>;
    function veSpolRizeniColumn(): GGridColumn<any>;
    function doruceniColumn(column: string, caption: string): GGridColumn<any>;
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOKOdlozeni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOKontrChodDoruceni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOKontrChodOdeslani extends GContentBase {
        private filterFormElement;
        private grid;
        private dataView;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createGrid;
        private createGridFormat;
        private loadData;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOOdeslaniDokumentu extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOOdlozeniPripadu extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOSpolecneRizeni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyrizeniPripadu extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleniKOdeslani extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleniKOvereni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleniKeSchvaleni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleniOpakovaniVyzvy extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleniPodaniVysvetleni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKPodaniVysvetleniPokutovani extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKeSdeleniRidice extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKeSdeleniRidiceKOdeslani extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKeSdeleniRidiceKOvereni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyKeSdeleniRidiceKeSchvaleni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyProvoz extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyProvozDoPrikazu extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyProvozKOdeslani extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyProvozKOdlozeni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyProvozKOver extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOVyzvyProvozKeSchvaleni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    function createVyzvyKPodaniVysvetleniGridFormat(dorucAdresa: boolean, zobrazitLhutaPodaniVysvetleni: boolean): Gordic.Data.GridFormat;
    function createVyzvyKeSdeleniRidiceGridFormat(dorucAdresa: boolean): Gordic.Data.GridFormat;
    function createPrikazniRizeniGridFormat(dorucAdresa: boolean, vymahani: boolean): Gordic.Data.GridFormat;
    function createVyzvyProvozovatelumMVGridFormat(dorucAdresa: boolean, isSeznamoveOkno?: boolean): Gordic.Data.GridFormat;
    function loadData(content: any, filter: any): JQueryPromise<any>;
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOPrikazy extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOPrikazyKOdeslani extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOPrikazyKOvereni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOPrikazyKVymahani extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOPrikazyKeSchvaleni extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOPrikazyVymahane extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamHOUhradyPredepsaniPredpisu extends GContentBase {
        filterFormElement: JQuery<HTMLElement>;
        grid: JQuery;
        dataView: Gordic.Data.View;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        model: any;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamNevyrizenePripady extends GContentBase {
        private filterFormElement;
        private grid;
        private dataView;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        faze: string;
        model: any;
        viceradkoveZobrazeni: boolean;
        filterDto: any;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
        private loadData;
    }
}
declare namespace Gordic.Prs.WebControls {
    class GSeznamVyrizenePripady extends GContentBase {
        private filterFormElement;
        private grid;
        private dataView;
        nacitatSeznam: boolean;
        povoleniEditace: boolean;
        faze: string;
        model: any;
        filterDto: any;
        viceradkoveZobrazeni: boolean;
        onContentReady(): void;
        private createMenuBar;
        private createFilter;
        private createGrid;
        private createGridFormat;
        private loadData;
    }
}
