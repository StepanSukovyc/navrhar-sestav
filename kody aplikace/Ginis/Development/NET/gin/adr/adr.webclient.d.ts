/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adr.webclient.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adr.WebClient\Gordic.Adr.WebClient.csproj
*    created     2026-02-16 14:33:43
*    files       MainApp.d.ts
*                CFS\CFS.d.ts
*                Controls\GPorizovacBpl.d.ts
*                Controls\GRozvrhDetailTS.d.ts
*                Controls\GRozvrhExportTS.d.ts
*                Controls\GRzvDavky.d.ts
*                Controls\GRzvHistorie.d.ts
*                Controls\GRzvUpravyNezTS.d.ts
*                Controls\GRzvUpravyZakl.d.ts
*                Controls\NovyVlastnikTS.d.ts
*                Controls\RozvrhyTS.d.ts
*                Controls\VlastniciRozvrhuTS.d.ts
*                Dto\GCopyRozvrhDto.d.ts
*                Dto\GEkoOpenDto.d.ts
*                Dto\GEkosnksDto.d.ts
*                Dto\GEkosucsDto.d.ts
*                EkoOpen\EkoOpen.d.ts
*                EkoOpen\GEkoOpenCopyRozvrhDialog.d.ts
*                EkoOpen\GEkoOpenProcess.d.ts
*                EkoOpen\GEkoOpenProcessDialog.d.ts
*                GlobalniCiselniky\GDetailPolozkyGlobCis.d.ts
*                GlobalniCiselniky\GDetailRocniHodnoty.d.ts
*                GlobalniCiselniky\GGlobalniCiselniky.d.ts
*                HloubkaRezervace\HloubkaRezervace.d.ts
*                Iissp\IISSP.d.ts
*                Iissp\IisspHistorie.d.ts
*                Iissp\IisspMail.d.ts
*                OmezeniPristupu\OmezeniPristupu.d.ts
*                RozsireneVlastnosti\GRegistroveHodnoty.d.ts
*                RozsireneVlastnosti\GRozsireneVlastnosti.d.ts
*                RozvrhoveCiselniky\GCreateVazbaRozCis.d.ts
*                RozvrhoveCiselniky\GHodnotyRozCiselniku.d.ts
*                RozvrhoveCiselniky\GRozvrhoveCiselniky.d.ts
*                RozvrhoveCiselniky\GRozvrhoveCiselnikyPrava.d.ts
*                RozvrhoveCiselniky\GRozvrhoveCiselnikyVazby.d.ts
*                RozvrhoveCiselniky\GRozvrhoveCiselnikyVetve.d.ts
*                RozvrhoveCiselniky\GRozvrhovyCiselnikDetail.d.ts
*                RozvrhoveCiselniky\RozvrhyAktualizovane.d.ts
*                Scripts\Utils.d.ts
*                SpravaKonfigurace\SpravaKonfigurace.d.ts
*                SrvOpen\GSrvOpen.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\MainApp.d.ts 

declare namespace Gordic.Adr.WebClient {
    class MainApp extends GContentBase {
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\CFS\CFS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class CFS extends GContentBase implements IGContent {
        form: JQuery;
        actDetail: GAction;
        $grid: JQuery;
        taskId: string;
        private cleneni;
        ekosvax: Gordic.Eko.Interface.GEkosvaxDto[];
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        tab: JQuery;
        ekossgxDto: Gordic.Eko.Interface.GEkossgxDto;
        nalezenaVyjimka: number;
        rok: number;
        ico: string;
        cfu: string;
        onContentReady(): void;
        loadData(): void;
        buildPreview(dtos: Gordic.Eko.Interface.GEkosvaxDto[], ucty: string): void;
        writeRow(dto: Gordic.Eko.Interface.GEkosvaxDto, zkratka: string, poradiMax: number, pouzitaSlova: Gordic.Adr.WebClient.PoradiDataDto[]): string;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GPorizovacBpl.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GPorizovacBpl extends GContentBase {
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        formZastupky: Gordic.Forms.Form;
        config: number;
        onContentReady(): void;
        addRadekKryti(predkontace: any, gtabAll: JQuery, firstRow: boolean): void;
        isZadavaciZastupka(txt: string): boolean;
        isZadavaciZastupka30B(txt: string, zastupka: string): boolean;
        isZadavaciZastupka30(txt: string): boolean;
        addEditRow1(zkratka: string, zastupka: string, pocet: number): void;
        addEditRow2(form: Gordic.Forms.Form, zkratka: string, zastupka: string, pocet: number): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GRozvrhDetailTS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhDetailTS extends GContentBase {
        model: Gordic.Eko.Interface.GUctsrozDto;
        ixs_roz: string;
        protected validators: any;
        onContentReady(): void;
        saveDetail(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GRozvrhExportTS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhExportTS extends GContentBase {
        model: ExportRozvrhDto;
        protected validators: any;
        onContentReady(): void;
        exportuj(): void;
    }
    interface ExportRozvrhDto {
        typSouboru: '1';
        bezHodnotZd: false;
        pevneSirkySloupcu: false;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GRzvDavky.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRzvDavky extends GContentBase {
        ixs_roz: string;
        nazev: string;
        $grid: JQuery;
        onContentReady(): void;
        createGridFormat(): Gordic.Data.GridFormat<any>;
        loadData(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GRzvHistorie.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRzvHistorie extends GContentBase {
        nazev: string;
        ixs_roz: string;
        ixs_indir: string;
        $grid: JQuery;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        private cfuSet;
        PrizCharsUete: boolean;
        checkUete: number;
        onContentReady(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Eko.Interface.GUctdrozMoreDto>;
        loadData(): void;
    }
    interface PoradiDataDto {
        Poradi: number;
        Zkratka: string;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GRzvUpravyNezTS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRzvUpravyNezTS extends GContentBase {
        nazev: string;
        ixs_roz: string;
        $grid: JQuery;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        private view_ISL;
        private cfuSet;
        rok: number;
        globals: Gordic.Eko.Interface.GAdrGlobalsDto;
        PrizCharsUete: boolean;
        checkUete: number;
        ico: string;
        onContentReady(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Eko.Interface.GUctdrozMoreDto>;
        loadData(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\GRzvUpravyZakl.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRzvUpravyZakl extends GContentBase {
        nazev: string;
        ixs_roz: string;
        $grid: JQuery;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        $tab: JQuery;
        $tab2: JQuery;
        model: Gordic.Eko.Interface.GUctdrozMoreDto;
        mode: "normal" | "adrFields";
        exceptionBadge: GObservableObject<GBadgeOptions>;
        utils: Gordic.Eko.WebClient.GPorizovacUtils;
        private cfuSet;
        onContentReady(): void;
        MakeForm(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\NovyVlastnikTS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class NovyVlastnikTS extends GContentBase {
        ixs_roz: string;
        nazev: string;
        $grid: JQuery;
        rightSbCnt$: JQuery;
        rightSb$: JQuery;
        private cleneni;
        onContentReady(): void;
        CreateGridFormat(): Gordic.Data.GridFormat<Gordic.Eko.Interface.GEkosucsHRDto> | Gordic.Data.GridFormat<GEkosnksDto>;
        loadData(): void;
        showPreview(ucs: any, nazev: any, zkratka: any): void;
        buildPreview(dto: any): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\RozvrhyTS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class RozvrhyTS extends GContentBase implements IGContent {
        filterPanelElement: JQuery;
        $grid: JQuery;
        taskId: string;
        private cleneni;
        private view_ISL;
        private cfuSet;
        rozsirenaUcetniVeta: boolean;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Controls\VlastniciRozvrhuTS.d.ts 

declare namespace Gordic.Adr.WebClient {
    class VlastniciRozvrhuTS extends GContentBase {
        ixs_roz: string;
        nazev: string;
        $grid: JQuery;
        private cleneni;
        private view_ISL;
        onContentReady(): void;
        loadData(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Dto\GCopyRozvrhDto.d.ts 

declare namespace Gordic.Adr.WebClient {
	interface GCopyRozvrhDto {
		/**pid kopírovaného rozvrhu*/
		ixs_roz_zdroj?: string|null;
		/**název původního rozvrhu*/
		nazev_zdroj?: string|null;
		/**zkratka původního rozvrhu*/
		zkratka_zdroj?: string|null;
		/**starý rok*/
		rok_zdroj?: number|null;
		/**pid nového rozvrhu*/
		ixsRoz?: string|null;
		/**název nového rozvrhu*/
		nazev?: string|null;
		/**zkratka nového rozvrhu*/
		zkratka?: string|null;
		/**nový rok*/
		rok?: number|null;
		/**typ rozvrhu*/
		typ_rzv?: string|null;
	}
	const enum GCopyRozvrhDtoNames { ixs_roz_zdroj = "ixs_roz_zdroj", nazev_zdroj = "nazev_zdroj", zkratka_zdroj = "zkratka_zdroj", rok_zdroj = "rok_zdroj", ixsRoz = "ixsRoz", nazev = "nazev", zkratka = "zkratka", rok = "rok", typ_rzv = "typ_rzv",}
	const enum GCopyRozvrhDtoFragments { ixs_roz_zdroj = "*", nazev_zdroj = "*", zkratka_zdroj = "*", rok_zdroj = "*", ixsRoz = "*", nazev = "*", zkratka = "*", rok = "*", typ_rzv = "*",}
	const enum GCopyRozvrhDtoTypes { ixs_roz_zdroj = "string", nazev_zdroj = "string", zkratka_zdroj = "string", rok_zdroj = "number", ixsRoz = "string", nazev = "string", zkratka = "string", rok = "number", typ_rzv = "string",}
	const enum GCopyRozvrhDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Dto\GEkoOpenDto.d.ts 

declare namespace Gordic.Adr.WebClient {
	interface GEkoOpenDto {
		/**Otevíraná IČA*/
		Ica?: Gordic.Eko.Interface.GEkosicoDto[]|null;
		/**Otevírané IČO*/
		Ico: string;
		/**Otevíraný rok*/
		Rok?: number|null;
		/**Rok před otevíraným*/
		RokPrev?: number|null;
		/**Cfu otevíraného roku*/
		Cfu?: string|null;
		/**Cfu předchozího roku*/
		CfuPrev?: string|null;
		/**pocetccfu*/
		Pocetccfu?: number|null;
		/**pocetdico*/
		Pocetdico?: number|null;
		/**pocetdicoPrev*/
		PocetdicoPrev?: number|null;
		IxsSax?: string|null;
		IxsSaxPrev?: string|null;
		KtgSaxPrev?: string|null;
		KtgSax?: string|null;
		KtgSaxTxt?: string|null;
		KtgSaxPrevTxt?: string|null;
		VerzeKtgSaxPrev?: string|null;
		/**Verze CFS, která se bude ukládat do DB při ekoopen*/
		VerzeKtgSax?: string|null;
		/**Verze CFS ještě před otevřením ekoopen*/
		VerzeKtgSaxDb?: string|null;
		CfsFileNameToUpload?: string|null;
		CfsFilePathToUpload?: string|null;
		/**pocetscfu*/
		Pocetscfu?: number|null;
		/**pocetscfuPrev*/
		PocetscfuPrev?: number|null;
		/**pocetdcfu*/
		Pocetdcfu?: number|null;
		/**pocetdcfuPrev*/
		PocetdcfuPrev?: number|null;
		/**nastaveni radiobuttonu uzivatelem ve Wizardu na kartě konfigurace účetní věty*/
		SettingCfu?: number|null;
		/**nastaveni radiobuttonu uzivatelem ve Wizardu na kartě typ zaúčtování*/
		SettingTypZauctovani?: number|null;
		/**nastaveni radiobuttonu uzivatelem ve Wizardu na kartě omezení přístupu*/
		SettingOmezeniPristupu?: number|null;
		/**nastaveni hloubky rezervace*/
		SettingHloubkaRezervace?: number|null;
		/**nastaveni radiobuttonu uzivatelem ve Wizardu na kartě CFS*/
		SettingCfs?: number|null;
		Cntbplvtza?: number|null;
		CntbplvtzaPrev?: number|null;
		Pocetsdrr?: number|null;
		PocetsdrrPrev?: number|null;
		Rozvrhy?: Gordic.Eko.Interface.GUctsrozDto[]|null;
		PocetEkosobd?: number|null;
		JePrvniIco?: boolean|null;
		Cntekovago?: number|null;
		CntekovagoPrev?: number|null;
		Pocetsdsr?: number|null;
		PocetsdsrPrev?: number|null;
		Pocetsmsr?: number|null;
		PocetsmsrPrev?: number|null;
		CntUcsact?: number|null;
	}
	const enum GEkoOpenDtoNames { Ica = "Ica", Ico = "Ico", Rok = "Rok", RokPrev = "RokPrev", Cfu = "Cfu", CfuPrev = "CfuPrev", Pocetccfu = "Pocetccfu", Pocetdico = "Pocetdico", PocetdicoPrev = "PocetdicoPrev", IxsSax = "IxsSax", IxsSaxPrev = "IxsSaxPrev", KtgSaxPrev = "KtgSaxPrev", KtgSax = "KtgSax", KtgSaxTxt = "KtgSaxTxt", KtgSaxPrevTxt = "KtgSaxPrevTxt", VerzeKtgSaxPrev = "VerzeKtgSaxPrev", VerzeKtgSax = "VerzeKtgSax", VerzeKtgSaxDb = "VerzeKtgSaxDb", CfsFileNameToUpload = "CfsFileNameToUpload", CfsFilePathToUpload = "CfsFilePathToUpload", Pocetscfu = "Pocetscfu", PocetscfuPrev = "PocetscfuPrev", Pocetdcfu = "Pocetdcfu", PocetdcfuPrev = "PocetdcfuPrev", SettingCfu = "SettingCfu", SettingTypZauctovani = "SettingTypZauctovani", SettingOmezeniPristupu = "SettingOmezeniPristupu", SettingHloubkaRezervace = "SettingHloubkaRezervace", SettingCfs = "SettingCfs", Cntbplvtza = "Cntbplvtza", CntbplvtzaPrev = "CntbplvtzaPrev", Pocetsdrr = "Pocetsdrr", PocetsdrrPrev = "PocetsdrrPrev", Rozvrhy = "Rozvrhy", PocetEkosobd = "PocetEkosobd", JePrvniIco = "JePrvniIco", Cntekovago = "Cntekovago", CntekovagoPrev = "CntekovagoPrev", Pocetsdsr = "Pocetsdsr", PocetsdsrPrev = "PocetsdsrPrev", Pocetsmsr = "Pocetsmsr", PocetsmsrPrev = "PocetsmsrPrev", CntUcsact = "CntUcsact",}
	const enum GEkoOpenDtoFragments { Ica = "*", Ico = "*", Rok = "*", RokPrev = "*", Cfu = "*", CfuPrev = "*", Pocetccfu = "*", Pocetdico = "*", PocetdicoPrev = "*", IxsSax = "*", IxsSaxPrev = "*", KtgSaxPrev = "*", KtgSax = "*", KtgSaxTxt = "*", KtgSaxPrevTxt = "*", VerzeKtgSaxPrev = "*", VerzeKtgSax = "*", VerzeKtgSaxDb = "*", CfsFileNameToUpload = "*", CfsFilePathToUpload = "*", Pocetscfu = "*", PocetscfuPrev = "*", Pocetdcfu = "*", PocetdcfuPrev = "*", SettingCfu = "*", SettingTypZauctovani = "*", SettingOmezeniPristupu = "*", SettingHloubkaRezervace = "*", SettingCfs = "*", Cntbplvtza = "*", CntbplvtzaPrev = "*", Pocetsdrr = "*", PocetsdrrPrev = "*", Rozvrhy = "*", PocetEkosobd = "*", JePrvniIco = "*", Cntekovago = "*", CntekovagoPrev = "*", Pocetsdsr = "*", PocetsdsrPrev = "*", Pocetsmsr = "*", PocetsmsrPrev = "*", CntUcsact = "*",}
	const enum GEkoOpenDtoTypes { Ica = "Gordic.Eko.Interface.GEkosicoDto[]", Ico = "string", Rok = "number", RokPrev = "number", Cfu = "string", CfuPrev = "string", Pocetccfu = "number", Pocetdico = "number", PocetdicoPrev = "number", IxsSax = "string", IxsSaxPrev = "string", KtgSaxPrev = "string", KtgSax = "string", KtgSaxTxt = "string", KtgSaxPrevTxt = "string", VerzeKtgSaxPrev = "string", VerzeKtgSax = "string", VerzeKtgSaxDb = "string", CfsFileNameToUpload = "string", CfsFilePathToUpload = "string", Pocetscfu = "number", PocetscfuPrev = "number", Pocetdcfu = "number", PocetdcfuPrev = "number", SettingCfu = "number", SettingTypZauctovani = "number", SettingOmezeniPristupu = "number", SettingHloubkaRezervace = "number", SettingCfs = "number", Cntbplvtza = "number", CntbplvtzaPrev = "number", Pocetsdrr = "number", PocetsdrrPrev = "number", Rozvrhy = "Gordic.Eko.Interface.GUctsrozDto[]", PocetEkosobd = "number", JePrvniIco = "boolean", Cntekovago = "number", CntekovagoPrev = "number", Pocetsdsr = "number", PocetsdsrPrev = "number", Pocetsmsr = "number", PocetsmsrPrev = "number", CntUcsact = "number",}
	const enum GEkoOpenDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Dto\GEkosnksDto.d.ts 

declare namespace Gordic.Adr.WebClient {
	/**DBTABLE:ekosucs*/
	interface GEkosnksDto {
		/**DBCOLUMN:ekosucs.ucs*/
		nks?: string|null;
		/**DBCOLUMN:ekosucs.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekosucs.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosucs.zkratka*/
		zkratka?: string|null;
		/**1...nks je v danem roce platne, 0...neni platne*/
		platnost?: number|null;
		/**1...nks je v danem roce navazano na rozvrh, 0...neni navazano na rozvrh*/
		navazano?: number|null;
	}
	const enum GEkosnksDtoNames { nks = "nks", poznamka = "poznamka", nazev = "nazev", zkratka = "zkratka", platnost = "platnost", navazano = "navazano",}
	const enum GEkosnksDtoFragments { nks = "*", poznamka = "*", nazev = "*", zkratka = "*", platnost = "*", navazano = "*",}
	const enum GEkosnksDtoTypes { nks = "string", poznamka = "string", nazev = "string", zkratka = "string", platnost = "number", navazano = "number",}
	const enum GEkosnksDtoTypeLengths { nks = 10, poznamka = 50, nazev = 50, zkratka = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Dto\GEkosucsDto.d.ts 

declare namespace Gordic.Adr.WebClient {
    /**DBTABLE:ekosucs*/
	interface GEkosucsDto {
        /**DBCOLUMN:ekosucs.ucs*/
		ucs?: string|null;
        /**DBCOLUMN:ekosucs.poznamka*/
		poznamka?: string|null;
        /**DBCOLUMN:ekosucs.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:ekosucs.zkratka*/
		zkratka?: string|null;
        /**1...ucs je v danem roce platne, 0...neni platne*/
		platnost?: number|null;
        /**1...ucs je v danem roce navazano na rozvrh, 0...neni navazano na rozvrh*/
		navazano?: number|null;
        /**uroven*/
		uroven?: string|null;
        /**uroven*/
		uroven2?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\EkoOpen\EkoOpen.d.ts 

declare namespace Gordic.Adr.WebClient {
    class EkoOpen extends GContentBase implements IGContent {
        taskId: string;
        form: JQuery;
        pouzeAktivniIco: boolean;
        DO: GEkoOpenDto;
        Rozvrhy: Gordic.Eko.Interface.GUctsrozDto[];
        filterPanelElement: JQuery;
        onContentReady(): void;
        LoadIca(cnt: any): void;
        UnSetStep1(): void;
        setSeznamCfu(): void;
        UnSetStep2(): void;
        LoadVetaPrev(cnt: any): void;
        LoadVeta(cnt: any, settingCfu: any): void;
        LoadTypyZauctovaniPrev(cnt: any): void;
        LoadTypyZauctovani(cnt: any, settingTypZauctovani: any): void;
        LoadRozvrhyPrev(cnt: any): void;
        LoadRozvrhy(cnt: any): void;
        SettingToText(setting: number): string;
        SettingToTextCFS(setting: number): string;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\EkoOpen\GEkoOpenCopyRozvrhDialog.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GEkoOpenCopyRozvrhDialog extends GContentBase {
        model: GCopyRozvrhDto;
        protected validators: any;
        that: GContent;
        onContentReady(): void;
        CopyRozvrh(): void;
    }
    interface CopyRozvrhDto {
        nazev_zdroj: '';
        zkratka_zdroj: '';
        rok_zdroj: number | null;
        nazev: '';
        zkratka: '';
        rok: number | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\EkoOpen\GEkoOpenProcess.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GEkoOpenProcess extends GContentBase {
        model: GCopyRozvrhDto;
        protected validators: any;
        that: GContent;
        onContentReady(): void;
        CopyRozvrh(): void;
    }
    interface CopyRozvrhDto {
        nazev_zdroj: '';
        zkratka_zdroj: '';
        rok_zdroj: number | null;
        nazev: '';
        zkratka: '';
        rok: number | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\EkoOpen\GEkoOpenProcessDialog.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GEkoOpenProcessDialog extends GContentBase {
        DO: GEkoOpenDto;
        protected validators: any;
        that: GContent;
        $container: JQuery;
        onContentReady(): void;
        Sekce(text: string): void;
        Info(text: string): void;
        IcoNadpis(text: string): void;
        RozvrhyNadpis(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\GlobalniCiselniky\GDetailPolozkyGlobCis.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GDetailPolozkyGlobCis extends GContentBase {
        polozkaDto: Gordic.Eko.Interface.GEkodgdtDto;
        polozkaNadDto: Gordic.Eko.Interface.GEkodgdtDto;
        ciselnikDto: Gordic.Eko.Interface.GEkosgdcDto;
        nadurovenDto: Gordic.Eko.Interface.GEkodgduDto;
        listNadrazenych: Gordic.Eko.Interface.GEkodgdtDto[];
        protected validators: any;
        onContentReady(): void;
        save(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\GlobalniCiselniky\GDetailRocniHodnoty.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GDetailRocniHodnoty extends GContentBase {
        polozkaDto: Gordic.Eko.Interface.GEkodgdtDto;
        model: Gordic.Eko.Interface.GEkodgdtDto & {
            odDo: GIntervalDto<string>;
        };
        polozkaNadDto: Gordic.Eko.Interface.GEkodgdtDto;
        ciselnikDto: Gordic.Eko.Interface.GEkosgdcDto;
        nadurovenDto: Gordic.Eko.Interface.GEkodgduDto;
        listNadrazenych: Gordic.Eko.Interface.GEkodgdtDto[];
        mode: "insert" | "update";
        protected validators: any;
        actNew: GAction;
        actDetail: GAction;
        actDelete: GAction;
        onContentReady(): void;
        save(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\GlobalniCiselniky\GGlobalniCiselniky.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GGlobalniCiselniky extends GContentBase {
        $gridPolozky: JQuery;
        gdcList: Gordic.Eko.Interface.GEkosgdcDto[];
        currentCiselnikDto: Gordic.Eko.Interface.GEkosgdcDto;
        currentPolozkaDto: Gordic.Eko.Interface.GEkodgdtDto;
        currentPolozkaNadDto: Gordic.Eko.Interface.GEkodgdtDto;
        islViewPolozky: Gordic.Isl.View<Gordic.Eko.Interface.GEkodgdtDto>;
        gdc: number;
        rezimNabidky: boolean;
        nadurovenDto: Gordic.Eko.Interface.GEkodgduDto;
        onContentReady(): void;
        exportuj(): void;
        closing(odkud: "close" | "select"): Eko.Interface.GEkodgdtDto | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\HloubkaRezervace\HloubkaRezervace.d.ts 

declare namespace Gordic.Adr.WebClient {
    class HloubkaRezervace extends GContentBase implements IGContent {
        $gridUcs: JQuery;
        $gridIntervaly: JQuery;
        currentRow: Gordic.Eko.Interface.GEkosmsrDto;
        ucsRadek: Gordic.Eko.Interface.GEkosucsHRDto;
        model: Gordic.Eko.Interface.GEkosmsrDto[];
        taskId: string;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        dbNazev: string;
        dbNazev2: string;
        private view_ISL;
        private viewUcs_ISL;
        private cfuSet;
        expertMode: boolean;
        PrizCharsUete: boolean;
        checkUete: number;
        idExpMode: string;
        isPovolExpMode: boolean;
        onContentReady(): void;
        setExpertMode(): void;
        closeExpertMode(this: SpravaKonfigurace): void;
        enabledTlacitek(value: boolean): void;
        gridFormatInterval(slovoOptions: Gordic.Eko.Prefabs.IGCfuOptions, zkratka: string): Gordic.Data.GridFormat<any>;
        odstranRadek(): void;
    }
    interface CfuUrovenDto {
        Uroven: string;
        Zkratka: string;
        DbNazev: string;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Iissp\IISSP.d.ts 

declare namespace Gordic.Adr.WebClient {
    class Iissp extends GContentBase implements IGContent {
        $grid: JQuery;
        $gridCiselnik: JQuery;
        $tab2: JQuery;
        filterPanelElement: JQuery;
        newVersions: Gordic.Iissp.Interface.GSspsdacDto[];
        oldVersions: Gordic.Iissp.Interface.GSspsdacDto[];
        currentCiselnik: Gordic.Iissp.Interface.GSspsdacDto;
        taskId: string;
        private viewSeznamCiselniku_ISL;
        onContentReady(): void;
        loadData(): void;
        loadDataCiselnik(ciselnik: Gordic.Iissp.Interface.GSspsdacDto): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Iissp\IisspHistorie.d.ts 

declare namespace Gordic.Adr.WebClient {
    class IisspHistorie extends GContentBase implements IGContent {
        $gridCiselnik: JQuery;
        $tab2: JQuery;
        ciselnik: Gordic.Iissp.Interface.GSspsdacDto;
        caption: string;
        hodnota: string;
        kapitola: string;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Iissp\IisspMail.d.ts 

declare namespace Gordic.Adr.WebClient {
    class IisspMail extends GContentBase {
        ciselnik: Gordic.Iissp.Interface.GSspsdacDto;
        modelDto: {
            maily: {
                email: string;
            }[];
        };
        onContentReady(): void;
        saveDetail(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\OmezeniPristupu\OmezeniPristupu.d.ts 

declare namespace Gordic.Adr.WebClient {
    class OmezeniPristupu extends GContentBase implements IGContent {
        $gridDrd: JQuery;
        currentRow: Gordic.Eko.Interface.GEkosdrrDto;
        model: Gordic.Eko.Interface.GEkosdrrDto[];
        ucs: string;
        ucsList: Gordic.Eko.Interface.GEkosucsHRDto[];
        taskId: string;
        private view_ISL;
        private cfuSet;
        rok: number;
        onContentReady(): void;
        odstranRadek(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozsireneVlastnosti\GRegistroveHodnoty.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRegistroveHodnoty extends GContentBase {
        $grid: JQuery;
        private view_ISL;
        bUctSdrv: boolean;
        currentSuAuReg: Gordic.Eko.Interface.GUctdtraDto;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozsireneVlastnosti\GRozsireneVlastnosti.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozsireneVlastnosti extends GContentBase {
        $gridSuAu: JQuery;
        islViewSuAu: Gordic.Isl.View<Gordic.Eko.Interface.GUctsdrvDto>;
        currentSuAu: Gordic.Eko.Interface.GUctsdrvDto;
        vlastnosti: Gordic.Eko.Interface.GUctddrvDto[];
        rok: number;
        ico: string;
        ucs: string;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        listDruhu: Gordic.Eko.Interface.GUctcsudDto[];
        current_druh_sud: number;
        listDoplnkovychUdaju: Gordic.Eko.Interface.GUctssudDto[];
        nabidkaFormboxuAll: any[];
        $tab2: JQuery;
        l_bUctSdrv: boolean;
        l_bUctDdrv: boolean;
        l_bPrepocet: boolean;
        onContentReady(): void;
        loadVlastnosti(): void;
        vlastnostForm(data: Gordic.Eko.Interface.GUctddrvDto): Gordic.Forms.Form;
        createFormBox(): void;
        refreshNabidkaNovych(porizeneHodnoty: any[] | null): void;
        vratIkonu(typ_sud: any): IconTemplate;
        vratHodnotu(row: Gordic.Eko.Interface.GUctddrvDto): any;
        nastavVykricniky(uea_reg: string | null | undefined): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GCreateVazbaRozCis.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GCreateVazbaRozCis extends GContentBase implements IGContent {
        taskId: string;
        resultDto: Gordic.Eko.Interface.GEkovrcrDto;
        ciselnik: Gordic.Eko.Interface.GEkosrciDto;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        ixs_roz: string;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GHodnotyRozCiselniku.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GHodnotyRozCiselniku extends GContentBase implements IGContent {
        $gridHodnoty: JQuery;
        hlavniSpravce: boolean;
        prava_aktualizace: boolean;
        prava_synchronizace: boolean;
        currentCiselnik: Gordic.Eko.Interface.GEkosrciDto;
        currentRow: Gordic.Eko.Interface.GEkodrciDto;
        islViewHodnoty: Gordic.Isl.View<Gordic.Eko.Interface.GEkodrciDto>;
        filterDto: Gordic.Eko.Interface.GRozvrhovyCiselnikHodnotaFilterDto;
        rok: number;
        refresh(ciselnik: Gordic.Eko.Interface.GEkosrciDto): void;
        enabledTlacitek(): void;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GRozvrhoveCiselniky.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhoveCiselniky extends GContentBase implements IGContent {
        $gridCiselniky: JQuery;
        hlavniSpravce: boolean;
        currentCiselnik: Gordic.Eko.Interface.GEkosrciDto;
        islViewCiselniky: Gordic.Isl.View<Gordic.Eko.Interface.GEkosrciDto>;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GRozvrhoveCiselnikyPrava.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhoveCiselnikyPrava extends GContentBase implements IGContent {
        $gridPrava: JQuery;
        hlavniSpravce: boolean;
        currentCiselnik: Gordic.Eko.Interface.GEkosrciDto;
        currentRow: Gordic.Eko.Interface.GEkovrcpDto;
        islViewPrava: Gordic.Isl.View<Gordic.Eko.Interface.GEkovrcpDto>;
        ixsFunPorizene: string[];
        onContentReady(): void;
        odstranRadek(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GRozvrhoveCiselnikyVazby.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhoveCiselnikyVazby extends GContentBase implements IGContent {
        hlavniSpravce: boolean;
        prava_aktualizace: boolean;
        prava_synchronizace: boolean;
        currentCiselnik: Gordic.Eko.Interface.GEkosrciDto;
        rok: number;
        nacteneVazby: Gordic.Eko.Interface.GEkovrccDto[];
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GRozvrhoveCiselnikyVetve.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhoveCiselnikyVetve extends GContentBase implements IGContent {
        $gridVetve: JQuery;
        hlavniSpravce: boolean;
        prava_aktualizace: boolean;
        prava_synchronizace: boolean;
        currentCiselnik: Gordic.Eko.Interface.GEkosrciDto;
        currentRow: Gordic.Eko.Interface.GEkovrcrDto;
        islViewVetve: Gordic.Isl.View<Gordic.Eko.Interface.GEkovrcrDto>;
        ixs_roz: string;
        ixs_indir: string;
        nazev: string;
        rozvrhDavkaDtos: Gordic.Eko.Interface.RozvrhDavkaDto[];
        private cfuSet;
        enabledTlacitek(): void;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\GRozvrhovyCiselnikDetail.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GRozvrhovyCiselnikDetail extends GContentBase implements IGContent {
        hlavniSpravce: boolean;
        prava_aktualizace: boolean;
        prava_synchronizace: boolean;
        ciselnik: Gordic.Eko.Interface.GEkosrciDto;
        validators: any;
        rozvrhDavkaDtos: Gordic.Eko.Interface.RozvrhDavkaDto[];
        seznamVetvi: Gordic.Eko.Interface.GEkovrcrDto[];
        $tabManager: JQuery;
        onContentReady(): void;
        showHideFlash(): void;
        enabledTlacitek(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\RozvrhoveCiselniky\RozvrhyAktualizovane.d.ts 

declare namespace Gordic.Adr.WebClient {
    class RozvrhyAktualizovane extends GContentBase implements IGContent {
        $grid: JQuery;
        taskId: string;
        ixsRozArr: string[];
        private view_ISL;
        ixs_indir: string;
        rozvrhDavkaDtos: Gordic.Eko.Interface.RozvrhDavkaDto[];
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\Scripts\Utils.d.ts 

declare namespace Gordic.Adr.WebClient {
    function addRefCfuSet(cfuSet: Gordic.Gui.WebApp.GGridFormatDto): Gordic.Data.GridFormat<any>;
    function addMaskaCfuSet(cfuSet: Gordic.Gui.WebApp.GGridFormatDto, checkUete: number, wildcard: string): Gordic.Data.GridFormat<any>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\SpravaKonfigurace\SpravaKonfigurace.d.ts 

declare namespace Gordic.Adr.WebClient {
    class SpravaKonfigurace extends GContentBase implements IGContent {
        $grid: JQuery;
        $gridDcfu: JQuery;
        currentEkoscfuRow: Gordic.Eko.Interface.GEkoscfuDto;
        currentEkodcfuRow: Gordic.Eko.Interface.GEkodcfuDto;
        agendyPorizene: number[];
        taskId: string;
        private viewScfu_ISL;
        private viewDcfu_ISL;
        private newRowAdding;
        cfu: string;
        expertMode: boolean;
        onContentReady(): void;
        loadData(): void;
        loadDataDcfu(ekoscfuRow: Gordic.Eko.Interface.GEkoscfuDto): void;
        odstranRadek(dotaz: boolean): void;
        enabledTlacitek(value: boolean): void;
        setExpertMode(): void;
        closeExpertMode(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adr.WebClient\SrvOpen\GSrvOpen.d.ts 

declare namespace Gordic.Adr.WebClient {
    class GSrvOpen extends GContentBase {
        model: Gordic.Eko.Interface.GSrvOpenDto;
        filterPanelElement: JQuery;
        $grid: JQuery;
        pouzeAktivniIco: boolean;
        roky: number[];
        seznamPlanu: Gordic.Eko.Interface.GSrvsplaDto[];
        countSmsa: number;
        protected validators: any;
        onContentReady(): void;
        SrvOpen(): void;
    }
}

//#endregion

