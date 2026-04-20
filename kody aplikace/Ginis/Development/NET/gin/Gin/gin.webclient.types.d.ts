/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gin.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Gin.WebClient\Gordic.Gin.WebClient.csproj
*    created     2026-02-16 14:33:47
*    files       Gin\Gin\GGinFields.d.ts
*                Gin\Gin\Common\GRetValDlg.d.ts
*                Gin\Gin\Common\Dto\GBaseReturnDto.d.ts
*                Gin\Gin\Common\Dto\GEpkOptDto.d.ts
*                Gin\Gin\Common\Dto\GEpkParamsDto.d.ts
*                Gin\Gin\Common\Dto\GK203ParamsDto.d.ts
*                Gin\Gin\Common\Dto\GSelectFileDto.d.ts
*                Gin\Gin\DetailBuilder\GDetailBuilder_custom.d.ts
*                Gin\Gin\DetailBuilderComponents\GGinAiSubcontentComponent.d.ts
*                Gin\Gin\DetailBuilderComponents\GGinCalendarComponent.d.ts
*                Gin\Gin\DetailBuilderComponents\GGinHeaderFormComponent.d.ts
*                Gin\Gin\DetailBuilderComponents\GGinListControlsComponent.d.ts
*                Gin\Gin\DuvodyPodpisu\GKtgDpoSupport.d.ts
*                Gin\Gin\DuvodyPodpisu\dto\VyberDpoDto.d.ts
*                Gin\Gin\Prefabs\GDenMesicRok.d.ts
*                Gin\Gin\Prefabs\ginterval.d.ts
*                Gin\Gin\Prefabs\gintervalcontextbox.d.ts
*                Gin\Gin\Prefabs\gmemorySelectbox.d.ts
*                Gin\Gin\Prefabs\gnumIntervalRok.d.ts
*                Gin\Gin\Prefabs\grokMesic.d.ts
*                Gin\Gin\Scheduling\Scheduling.d.ts
*                Gin\Gin\Utils\Utils.defs.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\GGinFields.d.ts 

declare namespace Gordic.Gin.Fields {

    /**
     * Options for MultiSuFunRef
     *
     * @author Radek Tomeš
     * @since 486.1.0.132
    */
    interface GMultiSuFunRefOptions {
       // label?: string; // popisek políčka
        rowOptions?: GFormRowOptions | undefined, // Options řádku - label a favoriteRowLayoutDescriptor
        chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu, // příznak použití pro účely předání/redistribuce
        name?: string, // název políčka
        suOptions: GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>, // options políčka Spisový uzel
        orjOptions: GSelectBoxOptions<Gordic.Data.Readers.GinsorjDto>, // options políčka organizační jednotka
        funOptions: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>, // options políčka Funkční místo
    }

    function MultiSuFunRef(
        fieldOptions: GMultiSuFunRefOptions
    ): Gordic.Forms.FormSection

    /**
     * Policko ginspod rozsirene o filtr na strediska spisovych uzlu ovladanym z políčka ginspodSSU
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>} fieldOptions Options ginspod policka
     * @param {boolean} chovaniStrediskaDleUcelu zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
     * @returns {GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>}
     */
    function ginspodSSU(
        fieldOptions: GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>,
        chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu
    ): GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>

    /**
     * Policko ginsfun rozsirene o filtr na strediska spisovych uzlu (pridruzena strediska)
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>} fieldOptions options ginsfun policka
     * @param {boolean} chovaniStrediskaDleUcelu   zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
     * @param {string} [nameOfGinspod] Pokud se na formuláři nachází i ginspod a chceme ho ovládat pomocí tohoto checkBoxu. Defaultní name ginspodu  je 'ginspodFSSU' nutno přepisovat v případě více ginsspodu na formuláři
     * @returns {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>}
     */
    function ginsfunSSU(
        fieldOptions: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>,
        chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu,  
        nameOfGinspod?: string
    ): GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Common\GRetValDlg.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**Dto pro vracení z funkcí do js*/
	interface GRetValDlg {
		/**StavBool*/
		StavBool?: boolean|null;
		/**stavTxt*/
		StavTxt?: string|null;
		/**stavNum*/
		StavNum?: number|null;
		/**message*/
		Message?: string|null;
		/**errorMessage*/
		ErrorMessage?: string|null;
		/**Script*/
		Script?: string|null;
		/**volitelny string*/
		StrParam1?: string|null;
		/**volitelny string*/
		StrParam2?: string|null;
		/**volitelny string*/
		StrParam3?: string|null;
		/**volitelne číslo*/
		NumParam1?: number|null;
		/**volitelne číslo*/
		NumParam2?: number|null;
		/**volitelne číslo*/
		NumParam3?: number|null;
		/**volitelny bool*/
		BoolParam1?: boolean|null;
		/**volitelny bool*/
		BoolParam2?: boolean|null;
		/**volitelny bool*/
		BoolParam3?: boolean|null;
		/**volitelny bool*/
		BoolParam4?: boolean|null;
		/**volitelny bool*/
		BoolParam5?: boolean|null;
		/**Objefct*/
		ObjectParam?: object|null;
	}
	const enum GRetValDlgNames { StavBool = "StavBool", StavTxt = "StavTxt", StavNum = "StavNum", Message = "Message", ErrorMessage = "ErrorMessage", Script = "Script", StrParam1 = "StrParam1", StrParam2 = "StrParam2", StrParam3 = "StrParam3", NumParam1 = "NumParam1", NumParam2 = "NumParam2", NumParam3 = "NumParam3", BoolParam1 = "BoolParam1", BoolParam2 = "BoolParam2", BoolParam3 = "BoolParam3", BoolParam4 = "BoolParam4", BoolParam5 = "BoolParam5", ObjectParam = "ObjectParam",}
	const enum GRetValDlgFragments { StavBool = "*", StavTxt = "*", StavNum = "*", Message = "*", ErrorMessage = "*", Script = "*", StrParam1 = "*", StrParam2 = "*", StrParam3 = "*", NumParam1 = "*", NumParam2 = "*", NumParam3 = "*", BoolParam1 = "*", BoolParam2 = "*", BoolParam3 = "*", BoolParam4 = "*", BoolParam5 = "*", ObjectParam = "*",}
	const enum GRetValDlgTypes { StavBool = "boolean", StavTxt = "string", StavNum = "number", Message = "string", ErrorMessage = "string", Script = "string", StrParam1 = "string", StrParam2 = "string", StrParam3 = "string", NumParam1 = "number", NumParam2 = "number", NumParam3 = "number", BoolParam1 = "boolean", BoolParam2 = "boolean", BoolParam3 = "boolean", BoolParam4 = "boolean", BoolParam5 = "boolean", ObjectParam = "object",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Common\Dto\GBaseReturnDto.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**Dto pro přenos hodnot mezi C# a JS.*/
	interface GBaseReturnDto<TData> {
		/**Data*/
		Data?: TData|null;
		/**Informační zprávy.*/
		Messages?: Gordic.Gin.WebClient.MessageDto[]|null;
	}
	const enum GBaseReturnDtoNames { Data = "Data", Messages = "Messages",}
	const enum GBaseReturnDtoFragments { Data = "*", Messages = "*",}
	const enum GBaseReturnDtoTypes { Data = "TData", Messages = "Gordic.Gin.WebClient.MessageDto[]",}
	const enum GBaseReturnDtoTypeLengths {}
	/**Zpráva*/
	interface MessageDto {
		/**Typ zprávy*/
		Type?: Gordic.Gin.WebClient.MessageType|null;
		/**Text zprávy*/
		Text?: string|null;
	}
	const enum MessageDtoNames { Type = "Type", Text = "Text",}
	const enum MessageDtoFragments { Type = "*", Text = "*",}
	const enum MessageDtoTypes { Type = "Gordic.Gin.WebClient.MessageType", Text = "string",}
	const enum MessageDtoTypeLengths {}
	/**Typ zprávy*/
	const enum MessageType {
		/**The success*/
		Success,
		/**The warning*/
		Warning,
		/**The error*/
		Error,
		/**The information*/
		Info,
		/**The Question*/
		Question,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Common\Dto\GEpkOptDto.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**DTO globálních nastavení pro EPK*/
	interface GEpkOptDto {
		/**Povolení fikce vyřízení (0-Ne,1-Ano)*/
		povoleniFikceVyrizeni?: boolean|null;
		/**Povolení úkonu podpisu EPK*/
		povoleniUkonuPodpisuEpk?: boolean|null;
		/**Je funkce napojena na roli s úkonem podpisu*/
		jeFunkceNapojenaNaRoliSUkonemPodpisu?: boolean|null;
		/**Zda má uživatel platný certifikát navázaný na osobu*/
		maUzivatelPlatnyCertifikatVazanyNaOsobu?: boolean|null;
		/**jedná se o fázi USU ?*/
		isFazeUsu?: boolean|null;
		/**text. značka*/
		znackaShortText?: string|null;
		/**text. číslo jednací*/
		textCJShortDBParam?: string|null;
	}
	const enum GEpkOptDtoNames { povoleniFikceVyrizeni = "povoleniFikceVyrizeni", povoleniUkonuPodpisuEpk = "povoleniUkonuPodpisuEpk", jeFunkceNapojenaNaRoliSUkonemPodpisu = "jeFunkceNapojenaNaRoliSUkonemPodpisu", maUzivatelPlatnyCertifikatVazanyNaOsobu = "maUzivatelPlatnyCertifikatVazanyNaOsobu", isFazeUsu = "isFazeUsu", znackaShortText = "znackaShortText", textCJShortDBParam = "textCJShortDBParam",}
	const enum GEpkOptDtoFragments { povoleniFikceVyrizeni = "*", povoleniUkonuPodpisuEpk = "*", jeFunkceNapojenaNaRoliSUkonemPodpisu = "*", maUzivatelPlatnyCertifikatVazanyNaOsobu = "*", isFazeUsu = "*", znackaShortText = "*", textCJShortDBParam = "*",}
	const enum GEpkOptDtoTypes { povoleniFikceVyrizeni = "boolean", povoleniUkonuPodpisuEpk = "boolean", jeFunkceNapojenaNaRoliSUkonemPodpisu = "boolean", maUzivatelPlatnyCertifikatVazanyNaOsobu = "boolean", isFazeUsu = "boolean", znackaShortText = "string", textCJShortDBParam = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Common\Dto\GEpkParamsDto.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**GEpkParamsDto*/
	interface GEpkParamsDto {
		/**Při dvojkliku na řádku seznamu EPK zobrazit detail dokumentu
		*     Ne - 0Ano - 1
		*/
		usu_epk_dvojkls?: number|null;
		/**SSL EPK - Podpora odeslání při vyřízení žádosti v EPK - pokud je na dokumentu, u kterého uživatel vyřizuje žádost v EPK, 
		*     připravená zásilka, je po vyřízení úkonu v EPK nabídnuto odeslání.Zároveň parametr řídí viditelnost sloupce, který indikuje existenci připravené zásilky.
		*/
		ssl_epk_odes?: number|null;
		/**GIN EPK - Schvalovací proces - povolení editovat vyřizovatele úkonu schvalovacího předpisu*/
		gin_epk_edifuk?: number|null;
		/**GIN EPK - Schvalovací proces - filtr osob/funkčních míst (dle fází do kterých mají uživatelé přístup*/
		gin_epk_schfaz?: string|null;
		/**GIN EPK - Schvalovací proces - u řízeného striktně filtrovat funkční místa dle vazby na roli*/
		gin_epk_schrpf?: number|null;
		/**EPK - možnost editovat úkon (osobu) při vyřizování žádosti v EPK*/
		epk_mozedioso?: number|null;
		/**GIN EPK - Schvalovací proces - u řízeného striktně filtrovat funkční místa dle vazby na roli a šablonu (v dialogu obecného schvalovacího procesu) - ref T10732*/
		gin_epk_schrps?: number|null;
		/**EPK - Povolení zobrazení interního GFRM formuláře na seznamu k Vyřízení a detailu žádosti v podpisové knize*/
		epk_gfrmzobr?: number|null;
		/**GIN SGN TS - Povolení přidání časového razítka (k PDF i samostatně - např. v konverzím dialogu)*/
		gin_ele_pcasraz?: number|null;
		/**Typ LTV podpisu*/
		gin_ele_pdfltv?: number|null;
		/**GIN EPK - Povolení pořídit/přidat žádost o podepsání dokumentu/spisu*/
		gin_rad_epkpri?: number|null;
		/**SSL EPK - Povolení vyřídit žádost o podepsání dokumentu/spisu*/
		ssl_epk_vyrid?: number|null;
		/**EPK - Povolení hromadného vyřízení žádostí*/
		epk_povhrovyriz?: boolean|null;
		/**EPK - Zobrazovat závislé úkony/požadavky schvalovacích procesů (závislé na vyřízení předchozích)*/
		epk_schpznav?: boolean|null;
		/**SSL EPK - Povolení změnit typ úkonu prováděný nad žádostí v podpisové knize*/
		ssl_epk_zmeuko?: boolean|null;
		/**GIN SGN - povolení používat kategorie důvodu podpisu*/
		gin_sgn_ktgdp?: boolean|null;
		/**EPK - Kontrola navázaných certifikátů*/
		epk_kontnavcer?: number|null;
		/**EPK - Možnost přidat úkon Posouzení při vyřizování žádosti v EPK*/
		epk_mozpredkpos?: boolean|null;
		/**EPK - Povolení při vyřízení požadavku/úkonu vkládat elektronický dokument s popisem vyřízení*/
		epk_vlvyrizdok?: boolean|null;
		/**EPK SGN - Řízení a viditelnost zaškrtávátka Podepsat - časové razítko*/
		epk_zaskpodcr?: string|null;
		/**EPK - Řízení a viditelnost zaškrtávátka "Včetně příloh"*/
		epk_zaskpril?: string|null;
		/**GIN SGN TS - Způsob přidání časového razítka při podepsání el. příloh (sign, timestamp)*/
		gin_ele_craz_pr?: number|null;
		/**GIN SGN TS - Způsob přidání časového razítka při podepsání elektronického obrazu*/
		gin_ele_craz_ob?: number|null;
		/**SSL EPK - Rozšíření pro posuzování / odsouhlasení dokumentů (EPK+) 
		*     -1 - Ne  - pouze podepsat; podepsat a schválit 0 - Ne  - úkony Posoudit a Vzít na vědomí nelze použít 1 - Ano - je možno využít speciální úkon Posoudit   2 - Ano - včetně vzít na vědomíJe možno využít speciální úkony Posoudit a Vzít na vědomí   3 - Ano - včetne splnit a vzít na vědomí
		*/
		ssl_epk_plus?: number|null;
		/**EPK - Zobrazit úlohu Vráceno k přepracování*/
		epk_zobrvrac?: boolean|null;
		/**EPK - dny do termínu (těsně nevyřízené záznamy)*/
		gin_epk_updoter?: number|null;
		/**EPK - Pohledy
		*     - 1 - za celý úřad
		*     - 2 - za spis. uzel + podřízené
		*/
		epk_prehl_org?: number|null;
		/**EPK - Limit zablokování žádosti při asynchronním vyřízení
		*     Parametr je pro situaci, kdy se vyřízení žádosti nepovede a je pro další vyřízení zablokován (např. aby nedošlo k opakovanému pokusu o vyřízení) do vypršení limitu)Default=5 (v minutách)
		*/
		epk_asynclimit?: number|null;
		/**EPK - Zobrazovat EKO sloupce v seznamech*/
		epk_ekosloupce?: boolean|null;
		/**Povolení podepsat pouze přílohy*/
		epk_povpodppri?: boolean|null;
		/**Řízení a viditelnost zaškrtávátka "Podepsat i přílohy, které nejsou v PDF"*/
		epk_zasknepdfpr?: number|null;
		/**Řízení a viditelnost zaškrtávátka "Přílohy - časové razítko"*/
		epk_zaskprilcr?: number|null;
		/**Řízení a viditelnost zaškrtávátka "Před podepsáním zkonvertovat"*/
		epk_zaskkonv?: number|null;
		/**EPK - Povolení umístění vizuálního podpisu při vyřizování žádosti*/
		epk_povumipod?: number|null;
		/**GIN SGN - Pozice obrázku doplněného po přidání el. podpisu (např. do PDF)*/
		gin_pdf_pictpos?: number|null;
		/**Řízení a viditelnost zaškrtávátka "Přílohy zkonvertovat"*/
		epk_zaskprikonv?: number|null;
		/**SSL - Načítání seznamu pravých stran
		*     0 - načtení až po stisku tlačítka1 - okamžité načtení pravé strany
		*/
		ssl_cti_sez?: number|null;
		/**SSL EPK - Uživatelský sloupec F - název sloupce zobrazovaný uživateli*/
		epk_uziv_sl_fn?: string|null;
		/**GIN ELE - Okno příloh dokumentu - Povolení označení příloh pro podpis v EPK*/
		gin_ele_okprepk?: boolean|null;
		/**SSL - Super administrátor (datumové rozsahy)*/
		ssl_superadmin?: boolean|null;
		/**Zobrazení náhledu elektronického souboru*/
		gin_ele_dmspres?: boolean|null;
		/**EPK - Zobrazovat filtr dle typu podpisu*/
		epk_shsigtypfil?: boolean|null;
		/**SSL - Filtrovat seznamy osob pro předání/přidělení dle vazby funkce na deník*/
		ssl_pripreomez?: number|null;
		/**Zobrazení pole pro zadání důvodu vyřízení při kladném vyřízení (Ano-1, Ne-0)*/
		epk_shreaspos?: boolean|null;
		/**SSL EPK - Rozšíření pro odsouhlasení přidělení/předání dokumentů a vyřízení spisů*/
		ssl_epk_plus2?: boolean|null;
		/**EPK - Povolení editace elektronických dokumentů ze seznamu žádostí*/
		epk_povedeldok?: boolean|null;
		/**EPK - Zobrazovat datumový filtr v seznamech EPK
		*     0: Ne1: Ano2: Ano - pouze u vyřízených
		*/
		epk_datfiltrzob?: number|null;
		/**EPK - Povolení asynchroního vyřízení žádosti*/
		epk_asyncvyriz?: number|null;
		/**EPK - Text označující opakovaně předloženou žádost o vyřízení pro stejný dokument.*/
		epk_txtopr?: string|null;
		/**EPK - připomínkové řízení - úkony připomínkovat a zpracovat*/
		epk_ukonprip?: number|null;
	}
	const enum GEpkParamsDtoNames { usu_epk_dvojkls = "usu_epk_dvojkls", ssl_epk_odes = "ssl_epk_odes", gin_epk_edifuk = "gin_epk_edifuk", gin_epk_schfaz = "gin_epk_schfaz", gin_epk_schrpf = "gin_epk_schrpf", epk_mozedioso = "epk_mozedioso", gin_epk_schrps = "gin_epk_schrps", epk_gfrmzobr = "epk_gfrmzobr", gin_ele_pcasraz = "gin_ele_pcasraz", gin_ele_pdfltv = "gin_ele_pdfltv", gin_rad_epkpri = "gin_rad_epkpri", ssl_epk_vyrid = "ssl_epk_vyrid", epk_povhrovyriz = "epk_povhrovyriz", epk_schpznav = "epk_schpznav", ssl_epk_zmeuko = "ssl_epk_zmeuko", gin_sgn_ktgdp = "gin_sgn_ktgdp", epk_kontnavcer = "epk_kontnavcer", epk_mozpredkpos = "epk_mozpredkpos", epk_vlvyrizdok = "epk_vlvyrizdok", epk_zaskpodcr = "epk_zaskpodcr", epk_zaskpril = "epk_zaskpril", gin_ele_craz_pr = "gin_ele_craz_pr", gin_ele_craz_ob = "gin_ele_craz_ob", ssl_epk_plus = "ssl_epk_plus", epk_zobrvrac = "epk_zobrvrac", gin_epk_updoter = "gin_epk_updoter", epk_prehl_org = "epk_prehl_org", epk_asynclimit = "epk_asynclimit", epk_ekosloupce = "epk_ekosloupce", epk_povpodppri = "epk_povpodppri", epk_zasknepdfpr = "epk_zasknepdfpr", epk_zaskprilcr = "epk_zaskprilcr", epk_zaskkonv = "epk_zaskkonv", epk_povumipod = "epk_povumipod", gin_pdf_pictpos = "gin_pdf_pictpos", epk_zaskprikonv = "epk_zaskprikonv", ssl_cti_sez = "ssl_cti_sez", epk_uziv_sl_fn = "epk_uziv_sl_fn", gin_ele_okprepk = "gin_ele_okprepk", ssl_superadmin = "ssl_superadmin", gin_ele_dmspres = "gin_ele_dmspres", epk_shsigtypfil = "epk_shsigtypfil", ssl_pripreomez = "ssl_pripreomez", epk_shreaspos = "epk_shreaspos", ssl_epk_plus2 = "ssl_epk_plus2", epk_povedeldok = "epk_povedeldok", epk_datfiltrzob = "epk_datfiltrzob", epk_asyncvyriz = "epk_asyncvyriz", epk_txtopr = "epk_txtopr", epk_ukonprip = "epk_ukonprip",}
	const enum GEpkParamsDtoFragments { usu_epk_dvojkls = "*", ssl_epk_odes = "*", gin_epk_edifuk = "*", gin_epk_schfaz = "*", gin_epk_schrpf = "*", epk_mozedioso = "*", gin_epk_schrps = "*", epk_gfrmzobr = "*", gin_ele_pcasraz = "*", gin_ele_pdfltv = "*", gin_rad_epkpri = "*", ssl_epk_vyrid = "*", epk_povhrovyriz = "*", epk_schpznav = "*", ssl_epk_zmeuko = "*", gin_sgn_ktgdp = "*", epk_kontnavcer = "*", epk_mozpredkpos = "*", epk_vlvyrizdok = "*", epk_zaskpodcr = "*", epk_zaskpril = "*", gin_ele_craz_pr = "*", gin_ele_craz_ob = "*", ssl_epk_plus = "*", epk_zobrvrac = "*", gin_epk_updoter = "*", epk_prehl_org = "*", epk_asynclimit = "*", epk_ekosloupce = "*", epk_povpodppri = "*", epk_zasknepdfpr = "*", epk_zaskprilcr = "*", epk_zaskkonv = "*", epk_povumipod = "*", gin_pdf_pictpos = "*", epk_zaskprikonv = "*", ssl_cti_sez = "*", epk_uziv_sl_fn = "*", gin_ele_okprepk = "*", ssl_superadmin = "*", gin_ele_dmspres = "*", epk_shsigtypfil = "*", ssl_pripreomez = "*", epk_shreaspos = "*", ssl_epk_plus2 = "*", epk_povedeldok = "*", epk_datfiltrzob = "*", epk_asyncvyriz = "*", epk_txtopr = "*", epk_ukonprip = "*",}
	const enum GEpkParamsDtoTypes { usu_epk_dvojkls = "number", ssl_epk_odes = "number", gin_epk_edifuk = "number", gin_epk_schfaz = "string", gin_epk_schrpf = "number", epk_mozedioso = "number", gin_epk_schrps = "number", epk_gfrmzobr = "number", gin_ele_pcasraz = "number", gin_ele_pdfltv = "number", gin_rad_epkpri = "number", ssl_epk_vyrid = "number", epk_povhrovyriz = "boolean", epk_schpznav = "boolean", ssl_epk_zmeuko = "boolean", gin_sgn_ktgdp = "boolean", epk_kontnavcer = "number", epk_mozpredkpos = "boolean", epk_vlvyrizdok = "boolean", epk_zaskpodcr = "string", epk_zaskpril = "string", gin_ele_craz_pr = "number", gin_ele_craz_ob = "number", ssl_epk_plus = "number", epk_zobrvrac = "boolean", gin_epk_updoter = "number", epk_prehl_org = "number", epk_asynclimit = "number", epk_ekosloupce = "boolean", epk_povpodppri = "boolean", epk_zasknepdfpr = "number", epk_zaskprilcr = "number", epk_zaskkonv = "number", epk_povumipod = "number", gin_pdf_pictpos = "number", epk_zaskprikonv = "number", ssl_cti_sez = "number", epk_uziv_sl_fn = "string", gin_ele_okprepk = "boolean", ssl_superadmin = "boolean", gin_ele_dmspres = "boolean", epk_shsigtypfil = "boolean", ssl_pripreomez = "number", epk_shreaspos = "boolean", ssl_epk_plus2 = "boolean", epk_povedeldok = "boolean", epk_datfiltrzob = "number", epk_asyncvyriz = "number", epk_txtopr = "string", epk_ukonprip = "number",}
	const enum GEpkParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Common\Dto\GK203ParamsDto.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**
	*     Parametry K203.
	*     
	*/
	interface GK203ParamsDto {
		/**
		*     SSL - Filtrovat seznamy osob dle středisek spisových uzlů (hosting malých obcí)
		*     
		*/
		ssl_filtrosostr?: number|null;
		/**
		*     GIN SSL - Filtrovat seznamy osob, funkcí, spis. uzlů pro přidání práv/změnu IRP dle středisek spisových uzlů (hosting malých obcí, nebo více organizací v jedné databázi).
		*     
		*/
		ssl_filtristr?: number|null;
		/**
		*     SSL - Načítání seznamu pravých stran.
		*     
		*/
		ssl_cti_sez?: number|null;
		/**
		*     GIN WK - Maximální velikost souboru (v bytech), pro který se otevře soubor přes doplněk (GBE)
		*     
		*/
		gin_ele_mvsdopl?: number|null;
		/**
		*     Textová reprezentace parametru GIN WK - Maximální velikost souboru (v bytech), pro který se otevře soubor přes doplněk (GBE)
		*     
		*/
		gin_ele_mvsdopl_txt?: string|null;
		/**
		*     GIN - Povolení předání dokumentů / dokladů mezi středisky spisových uzlů
		*     
		*/
		gin_pre_mestre?: number|null;
		/**
		*     GIN LEG - přístupk k detailu entity (podrobná konfigurace) (NSESSS 2023)
		*     
		*/
		gin_n06_op?: number|null;
		/**
		*     GIN LEG - vedení dokumentu (NSESSS 2023)
		*     
		*/
		gin_n23_vedd?: number|null;
		/**
		*     gin_n23_vecsk
		*     
		*/
		gin_n23_vecsk?: number|null;
		/**
		*     GIN - Konfigurace políčka pro výběr SU/ORJ/FUN/REF
		*     
		*/
		gin_vyb_polfun?: number|null;
		/**
		*     GIN GMS - Definice typu příjmu elektronické pošty
		*     
		*/
		gin_gms_typerec?: string|null;
		/**
		*     GIN / SSL - Filtrovat seznamy osob pro předání / přidělení dle povolených agend pro funkce
		*     
		*/
		ssl_pripreomtag?: string|null;
		/**
		*     zrušení storna - i hromadně pro dokumenty a spisy
		*     
		*/
		ssl_rp_odstorno?: number|null;
		/**
		*     SSL (SPR) - upozornit ikonou před termínem vyřízení dokumentu X dní - seznamy (LK, od 358/360)
		*     
		*/
		ssl_upterdokdni?: number|null;
		/**
		*     SSL (SPR) - upozornit ikonou před termínem vyřízení spisu X dní - seznamy (LK, od 358/360)
		*     
		*/
		ssl_upoztermdni?: number|null;
		/**
		*     ADM - Střediska spisových uzlů - způsob použítí
		*     
		*/
		adm_ginstre_typ?: number|null;
		/**
		*     SSL - Filtrovat seznamy osob pro předání/přidělení dle vazby funkce na deník
		*     
		*/
		ssl_pripreomez?: number|null;
		/**
		*     gin_ssl_vlozpis
		*     
		*/
		gin_ssl_vlozpis?: number|null;
		/**
		*     SSL - autorizace predani
		*     
		*/
		ssl_aut_pre?: string|null;
		/**
		*     USU - Práce za spisový uzel (REF)
		*     
		*/
		usu_show_su?: number|null;
		/**
		*     WFL IRP - Povolit individuální řízení přístupů pro nadřízené aktuálních vlastníků dokumnetů
		*     
		*/
		wfl_pris_pod?: number|null;
		/**
		*     wfl_pristpris
		*     WFL/GIN IRP - Povolit přidat přístupová práva navázaná na subjekt
		*     
		*/
		wfl_pristpris?: string|null;
		/**
		*     WFL IRP - Povolit individuální řízení přístupů k jednotlivým dokumentům
		*     
		*/
		wfl_pristupy?: number|null;
		/**
		*     Gets or sets the uzivatel je na stredisku.
		*     
		*/
		UzivatelJeNaStredisku?: boolean|null;
		/**
		*     DebugMode
		*     
		*/
		DebugMode?: boolean|null;
		/**
		*     LicAdr
		*     
		*/
		LicAdr?: string|null;
		/**
		*     SSD - změna barvy po el. podepsání el. obrazu EDU
		*     
		*/
		ssd_sgn_bozn?: number|null;
		/**
		*     SSL - Popisný text pro číslo na spisu (nezkrácená verze)
		*     SSL - Popisný text pro číslo na spisu - (obvykle Spisová značka dříve Číslo jednací).
		*     
		*/
		ssl_text_cj?: string|null;
		/**
		*     SSL - Popisný text pro číslo na spisu (zkrácená verze)
		*     SSL - Popisný text pro číslo na spisu (obvykle Sp. zn., dříve ČJ).
		*     
		*/
		ssl_text_cj_zn?: string|null;
		/**
		*     SSL - Popisný text pro číslo na dokumentu (nezkrácená verze)
		*     SSL - Popisný text pro políčko číslo na dokumentu ( obvykle Číslo jednací ).
		*     
		*/
		ssl_text_cjd?: string|null;
		/**
		*     SSL - Popisný text pro číslo na dokumentu (zkrácená verze)
		*     SSL - Popisný text pro číslo na dokumentu ( obvykle ČJ ).
		*     
		*/
		ssl_text_cjd_zn?: string|null;
		/**
		*     GIN - WK - Počet záložek prohlížeče, které jde naráz maximálně otevřít z akce
		*     
		*/
		gin_wk_maxpozal?: number|null;
		/**
		*     GIN SSL ŘP – Povolení převzetí dokumentů v rámci redistribuce za spisový uzel
		*     
		*/
		gin_rp_pre_su?: number|null;
		/**
		*     GIN - Používání odlévání dat do archivní databáze po předání do SPI (+ povolení hledání)
		*     
		*/
		gin_archivni_db?: number|null;
		/**
		*     dto s parametry pro podpisové šablony
		*     
		*/
		ktgDpoSupportDbParams?: Gordic.Gin.WebClient.GKtgDpoSupportDbParamsDto|null;
		/**
		*     Název referenta
		*     
		*/
		NazevRf?: string|null;
		/**
		*     Identifikace přihlášené funkce
		*     
		*/
		IxsFunAkt?: string|null;
		/**
		*     Povolení na SK funknčost
		*     
		*/
		gin_upsr_povol?: number|null;
		/**
		*     Povolení vytvoření nového ESU
		*     
		*/
		gin_esu_rp_new?: number|null;
		/**
		*     Povolení editace ESU
		*     
		*/
		ssl_opra_esu?: string|null;
		/**
		*     Povolení editace ESU
		*     
		*/
		PrizEko?: boolean|null;
		/**
		*     gin_rad_eleozo
		*     
		*/
		gin_rad_eleozo?: number|null;
		/**
		*     ssl_smvyrivespi
		*     
		*/
		ssl_smvyrivespi?: number|null;
		/**
		*     ssl_ver_compat
		*     
		*/
		ssl_ver_compat?: string|null;
	}
	const enum GK203ParamsDtoNames { ssl_filtrosostr = "ssl_filtrosostr", ssl_filtristr = "ssl_filtristr", ssl_cti_sez = "ssl_cti_sez", gin_ele_mvsdopl = "gin_ele_mvsdopl", gin_ele_mvsdopl_txt = "gin_ele_mvsdopl_txt", gin_pre_mestre = "gin_pre_mestre", gin_n06_op = "gin_n06_op", gin_n23_vedd = "gin_n23_vedd", gin_n23_vecsk = "gin_n23_vecsk", gin_vyb_polfun = "gin_vyb_polfun", gin_gms_typerec = "gin_gms_typerec", ssl_pripreomtag = "ssl_pripreomtag", ssl_rp_odstorno = "ssl_rp_odstorno", ssl_upterdokdni = "ssl_upterdokdni", ssl_upoztermdni = "ssl_upoztermdni", adm_ginstre_typ = "adm_ginstre_typ", ssl_pripreomez = "ssl_pripreomez", gin_ssl_vlozpis = "gin_ssl_vlozpis", ssl_aut_pre = "ssl_aut_pre", usu_show_su = "usu_show_su", wfl_pris_pod = "wfl_pris_pod", wfl_pristpris = "wfl_pristpris", wfl_pristupy = "wfl_pristupy", UzivatelJeNaStredisku = "UzivatelJeNaStredisku", DebugMode = "DebugMode", LicAdr = "LicAdr", ssd_sgn_bozn = "ssd_sgn_bozn", ssl_text_cj = "ssl_text_cj", ssl_text_cj_zn = "ssl_text_cj_zn", ssl_text_cjd = "ssl_text_cjd", ssl_text_cjd_zn = "ssl_text_cjd_zn", gin_wk_maxpozal = "gin_wk_maxpozal", gin_rp_pre_su = "gin_rp_pre_su", gin_archivni_db = "gin_archivni_db", ktgDpoSupportDbParams = "ktgDpoSupportDbParams", NazevRf = "NazevRf", IxsFunAkt = "IxsFunAkt", gin_upsr_povol = "gin_upsr_povol", gin_esu_rp_new = "gin_esu_rp_new", ssl_opra_esu = "ssl_opra_esu", PrizEko = "PrizEko", gin_rad_eleozo = "gin_rad_eleozo", ssl_smvyrivespi = "ssl_smvyrivespi", ssl_ver_compat = "ssl_ver_compat",}
	const enum GK203ParamsDtoFragments { ssl_filtrosostr = "*", ssl_filtristr = "*", ssl_cti_sez = "*", gin_ele_mvsdopl = "*", gin_ele_mvsdopl_txt = "*", gin_pre_mestre = "*", gin_n06_op = "*", gin_n23_vedd = "*", gin_n23_vecsk = "*", gin_vyb_polfun = "*", gin_gms_typerec = "*", ssl_pripreomtag = "*", ssl_rp_odstorno = "*", ssl_upterdokdni = "*", ssl_upoztermdni = "*", adm_ginstre_typ = "*", ssl_pripreomez = "*", gin_ssl_vlozpis = "*", ssl_aut_pre = "*", usu_show_su = "*", wfl_pris_pod = "*", wfl_pristpris = "*", wfl_pristupy = "*", UzivatelJeNaStredisku = "*", DebugMode = "*", LicAdr = "*", ssd_sgn_bozn = "*", ssl_text_cj = "*", ssl_text_cj_zn = "*", ssl_text_cjd = "*", ssl_text_cjd_zn = "*", gin_wk_maxpozal = "*", gin_rp_pre_su = "*", gin_archivni_db = "*", ktgDpoSupportDbParams = "*", NazevRf = "*", IxsFunAkt = "*", gin_upsr_povol = "*", gin_esu_rp_new = "*", ssl_opra_esu = "*", PrizEko = "*", gin_rad_eleozo = "*", ssl_smvyrivespi = "*", ssl_ver_compat = "*",}
	const enum GK203ParamsDtoTypes { ssl_filtrosostr = "number", ssl_filtristr = "number", ssl_cti_sez = "number", gin_ele_mvsdopl = "number", gin_ele_mvsdopl_txt = "string", gin_pre_mestre = "number", gin_n06_op = "number", gin_n23_vedd = "number", gin_n23_vecsk = "number", gin_vyb_polfun = "number", gin_gms_typerec = "string", ssl_pripreomtag = "string", ssl_rp_odstorno = "number", ssl_upterdokdni = "number", ssl_upoztermdni = "number", adm_ginstre_typ = "number", ssl_pripreomez = "number", gin_ssl_vlozpis = "number", ssl_aut_pre = "string", usu_show_su = "number", wfl_pris_pod = "number", wfl_pristpris = "string", wfl_pristupy = "number", UzivatelJeNaStredisku = "boolean", DebugMode = "boolean", LicAdr = "string", ssd_sgn_bozn = "number", ssl_text_cj = "string", ssl_text_cj_zn = "string", ssl_text_cjd = "string", ssl_text_cjd_zn = "string", gin_wk_maxpozal = "number", gin_rp_pre_su = "number", gin_archivni_db = "number", ktgDpoSupportDbParams = "Gordic.Gin.WebClient.GKtgDpoSupportDbParamsDto", NazevRf = "string", IxsFunAkt = "string", gin_upsr_povol = "number", gin_esu_rp_new = "number", ssl_opra_esu = "string", PrizEko = "boolean", gin_rad_eleozo = "number", ssl_smvyrivespi = "number", ssl_ver_compat = "string",}
	const enum GK203ParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Common\Dto\GSelectFileDto.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**GSelectFileDto*/
	interface GSelectFileDto {
		/**Gets or sets the file.*/
		Files?: Gordic.General.ApplicationInterface.GFileInfoDto[]|null;
		/**Gets or sets the title.*/
		Title?: string|null;
		/**Gets or sets the decription.*/
		Decription?: string|null;
	}
	const enum GSelectFileDtoNames { Files = "Files", Title = "Title", Decription = "Decription",}
	const enum GSelectFileDtoFragments { Files = "*", Title = "*", Decription = "*",}
	const enum GSelectFileDtoTypes { Files = "Gordic.General.ApplicationInterface.GFileInfoDto[]", Title = "string", Decription = "string",}
	const enum GSelectFileDtoTypeLengths {}
	/**GSelectFileDlgInputParamsDto*/
	interface GSelectFileDlgInputParamsDto {
		/**Gets or sets the initial values.*/
		InitialValues?: Gordic.Gin.WebClient.GSelectFileDto|null;
		/**Gets or sets the title.*/
		Title?: string|null;
		/**Gets or sets the button vybrat icon template.*/
		ButtonVybratIconTemplate?: IconTemplate|null;
		/**Příznak, zda se má zobrazit pouze políčko pro výběr souboru (true), nebo všechny (false - default).*/
		FileFieldOnly?: boolean|null;
		/**Přijímané typy souborů. Nastavují se dialogu před otevřením. Více informací*/
		AcceptExtensionFileFiled?: string|null;
	}
	const enum GSelectFileDlgInputParamsDtoNames { InitialValues = "InitialValues", Title = "Title", ButtonVybratIconTemplate = "ButtonVybratIconTemplate", FileFieldOnly = "FileFieldOnly", AcceptExtensionFileFiled = "AcceptExtensionFileFiled",}
	const enum GSelectFileDlgInputParamsDtoFragments { InitialValues = "*", Title = "*", ButtonVybratIconTemplate = "*", FileFieldOnly = "*", AcceptExtensionFileFiled = "*",}
	const enum GSelectFileDlgInputParamsDtoTypes { InitialValues = "Gordic.Gin.WebClient.GSelectFileDto", Title = "string", ButtonVybratIconTemplate = "IconTemplate", FileFieldOnly = "boolean", AcceptExtensionFileFiled = "string",}
	const enum GSelectFileDlgInputParamsDtoTypeLengths {}
	/**GSelectFileDlgReturnValueDto*/
	interface GSelectFileDlgReturnValueDto {
		/**Gets or sets the field values.*/
		FieldValues?: Gordic.Gin.WebClient.GSelectFileDto|null;
	}
	const enum GSelectFileDlgReturnValueDtoNames { FieldValues = "FieldValues",}
	const enum GSelectFileDlgReturnValueDtoFragments { FieldValues = "*",}
	const enum GSelectFileDlgReturnValueDtoTypes { FieldValues = "Gordic.Gin.WebClient.GSelectFileDto",}
	const enum GSelectFileDlgReturnValueDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilder\GDetailBuilder_custom.d.ts 

declare namespace Gordic.Gin.DetailBuilder {

    type MenuParamsId = PartialProperties<RequiredProperties<MenuParams,"id">, "action">
    export const classes: {
        header: string;
        tabmanager: string;
        loadImmediate: string;
    };

    interface TabParams {
        tabParams?: GTabOptions | { menuBar?: GDetailBuilderMenuParams3ArrayDef },
        /**
         * Obsolete! - použijte tabParams.group nebo pokud máte jen content pak přímo property group
         * @deprecated
         * @type {string}
         */
        subtaskId?: string,
        /**
         * Tuto option použít pouze pokud nenastavujete tabParams!
         * @type {IGTabGroupOptions}
         */
        group?: IGTabGroupOptions,
        contentParams?: string | GContentInitializer | object //TODO: IGClientContent by tu měl být místo object 
        init?: (div: JQuery) => void
        initLazy?: boolean
        hasFastInit?: boolean
    }

    interface GTabOptionsId extends GTabOptions {
        id: string
    }

    interface TabParamsId extends TabParams {
        tabParams?: GTabOptionsId | { menuBar?: GDetailBuilderMenuParams3ArrayDef }
    }

    interface GDetailBuilderSbPanelOptions extends Omit<GSbpanelOptions, "menuBar"> {
        menuBar?: MenuParams[] | null | string[]
    }

    type GDetailBuilderSbpanelOptionsId = RequiredProperties<GDetailBuilderSbPanelOptions, "id">;

    /** @deprecated Toto je nahrazeno GDetailBuilderSbpanelOptionsId */
    type GSideBarPanelOptionsId = GDetailBuilderSbpanelOptionsId;

    type GKpiItemOptionsName = RequiredProperties<GKpiItemOptions, "name">

    interface GDetailBuilderSubContentOptions {
        content: string | GContentInitializer | IGClientContentObject | (string | ObjectLiteral<any>)[],
        inputParams?: ObjectLiteral<any>,
        dockOptions?: Gordic.Widget.IGSubcontentOptions
        init?: (content: GContent) => JQuery.Promise<any>
    }
    interface GDetailBuilderSubContentOptionsId extends GDetailBuilderSubContentOptions {
        id: string
    }
  

    type GDetailBuilderActionMenuItemDef = { action?: string | GActionParams, children?: ((MenuParamsAction | MenuParams | { action?: string | GActionParams } | string) | GDetailBuilderMenuParamsDef )[] }
    type GDetailBuilderMenuParamsDef = ((MenuParamsAction | GDetailBuilderActionMenuItemDef) | (MenuParams | GDetailBuilderActionMenuItemDef) | string);
    type GDetailBuilderMenuParamsArrayDef = (GDetailBuilderMenuParamsDef | GDetailBuilderMenuParamsDef[])[]
    type GDetailBuilderMenuParams2ArrayDef = (GDetailBuilderMenuParamsDef | GDetailBuilderMenuParamsDef[] | GDetailBuilderMenuParamsArrayDef)[]
    type GDetailBuilderMenuParams3ArrayDef = (GDetailBuilderMenuParamsDef | GDetailBuilderMenuParamsDef[] | GDetailBuilderMenuParamsArrayDef | GDetailBuilderMenuParams2ArrayDef)[]

    type GDetailBuilderMenuItemDef = GDetailBuilderMenuParamsArrayDef | GDetailBuilderMenuParams2ArrayDef | GDetailBuilderMenuParams3ArrayDef | ObjectLiteral<MenuParams>;


    /**
    * Component for DetailBuilder
    * @author VMaca
    */
    interface GDetailBuilderComponent<TThis = GDetailBuilderContent> {

        actions?: (GActionParams | GAction)[] | ObjectLiteral<GActionParamsDefObj | GAction> | null
        /** Texts, which will be added to content.texts property - should start with component prefix to avoid conflict.*/
        texts?: ObjectLiteral<string> | null
        contentExtensions?: ObjectLiteral<any> & ThisType<TThis> | null
        subtasks?: GDetailBuilderMenuItemDef | null
        tabGroups?: IGTabGroupOptions[] | ObjectLiteral<IGTabGroupOptions> | null

        menuBar?: GDetailBuilderMenuItemDef | null
        statusBar?: GDetailBuilderMenuItemDef | null
        commandBar?: GDetailBuilderMenuItemDef | null
        activeOpEvents?: string[] | null

        tabs?: TabParamsId[] | ObjectLiteral<TabParams> | null

        kpis?: (GKpiItemOptionsName | { action?: string | GActionParams })[] | ObjectLiteral<(GKpiItemOptions | { action?: string | GActionParams })> | null
        sidePanels?: (GDetailBuilderSbpanelOptionsId | ((builder: GDetailBuilder) => GDetailBuilderSbpanelOptionsId))[] | ObjectLiteral<GDetailBuilderSbPanelOptions | ((builder: GDetailBuilder) => GDetailBuilderSbPanelOptions)> | null
        subContents?: (GDetailBuilderSubContentOptionsId | ((builder: GDetailBuilder) => GDetailBuilderSubContentOptionsId))[] | ObjectLiteral<GDetailBuilderSubContentOptions | ((builder: GDetailBuilder) => GDetailBuilderSubContentOptions)> | null
        headerForm?: Forms.Form | null
        onMenuBuild?: ((this: TThis, builder: GDetailBuilder, menus: { menuBar: MenuParams[], statusBar: MenuParams[], commandBar: MenuParams[] }) => void | JQueryPromise<any>)[]
        onBuild?: GDetailBuilderComponentFunction<TThis>[]
        onInit?: GDetailBuilderComponentFunction<TThis>[]
    }

    interface GDetailBuilderComponentFunction<TThis = GContent> {
        (this: TThis, builder: GDetailBuilder): void | JQueryPromise<any>
    }

    interface GDetailBuilderItemInfo {
        array: (MenuParamsId | string)[] | TabParamsId[] | GDetailBuilderSbpanelOptionsId[] | GKpiItemOptionsName[] | Gordic.Forms.FormSection[] | Gordic.Forms.FormRow[] | Gordic.Forms.FormField[]
        item: string | MenuParams | TabParams | GActionParams | GDetailBuilderSbPanelOptions | GKpiItemOptions | Gordic.Forms.Form | Gordic.Forms.FormSection | Gordic.Forms.FormRow | Gordic.Forms.FormField | string
        index: number
    }

    /**
    * Tool for building details by combining components.
    * @author VMaca
    */
    interface GDetailBuilder {
        /** */
        content: GDetailBuilderContent;

        /** Element, to which header form should be added.
         * @default $(<div>).appendTo(content.contentDiv)
         */
        headerTargetElement: JQuery | null

        /**
         * autofocusSelector - css selector, podle kterého bude vyhledán prvek, na který bude po otevření předán focus.
         * @type {string | null}
         */
        autofocusSelector: string | null

        /**
         * Element, to which group manager should be added.
         * @type {JQuery | null}
         */
        tabManagerTargetElement: JQuery | null

        /**
         * Options for groupManager - set to false if you don't want group manager at all.
         * @type {IGGroupManagerOptions | false}
         */
        tabManagerOptions: IGTabManagerOptions | false

        /**
         * Element, to which tabs should be added.
         * @default content.contentDiv
         */
        tabsTargetElement: JQuery | null

        /**
         * Name of property on content, where tab's elements will be stored.
         * @default $(<div>).appendTo(this.headerTargetElement)
         */
        tabsGroupPropertyName: string

        /** Element, to which kpiPanel should be added.
         * @default $(<div>).appendTo(content.contentDiv)
         */
        kpisTargetElement: JQuery | null

        /**
         * Name of property on content, where kpi's GObservableObjects will be stored.
         * @default kpis
         */
        kpisGroupPropertyName: string

        /**
         * Options for tab with kpipanel
         * @default { opened: true }
         * @deprecated
         */
        kpiTabOptions: GTabOptions | null
        /**
        * Options for kpiPanel
        * @default { name: "kpipanel", sortable: true }
        */
        kpiPanelOptions: GKpiPanelOptions

        /**
         * Options for content's sidePanel
         * @default  { left: { visible: false }, right: { visible: false } };
         */
        sideBarOptions: GSideBarOptions
        /**
         * Options for subtasks
         * @default  {}
         */
        subtasksOptions: GSubtasksOptions

        /**
        * Add component to build process.
        *
        * @date    09.03.2017
        *
        * @param {string} id           The identifier of component. Must be unique inside DetailBuilder.
        * @param {GDetailBuilderComponent} component    The component instance.
        * @param {boolean} [toStart=false] Should be component added to start?
        * @return {GDetailBuilder} builder
        **/
        withComponent<ThisType=GContent>(id: string, component: GDetailBuilderComponent<ThisType>, toStart?: boolean): GDetailBuilder

        /**
        * Removes component from build process;
        * @param {string} id The identifier of component.
        * @returns {GDetailBuilder} builder
        */
        withoutComponent(id: string): GDetailBuilder

        /**
         * Finds component by id and returns it
         * @param {string} id The identifier of component.
         * @returns {GDetailBuilderComponent} component.
         */
        getComponent(id: string): GDetailBuilderComponent

        /**
         * Inserts a definition before definition described by ID. Specify items to insert as arguments
         * after id.
         *
         * @author  Vmaca
         * @date    09.03.2017
         * 
         * @param {string} id   The identifier of target definition.
         * @param {string} newComponentId Id of component to insert.
         * @param {GDetailBuilderComponent} newComponentObject Component object with definitions to insert.
         *
         * @return  {boolean} true if item was inserted, false otherwise.
        **/
        insertBeforeComponent(id: string, newComponentId: string, newComponentObject: GDetailBuilderComponent): boolean

        /**
         * Inserts definition or multiple definitions after definition described by ID. Specify items to insert as arguments after id.
         *
         * @date    09.03.2017
         *
         * @param {string} id   The identifier of target definition.
         * @param {string} newComponentId Id of component to insert.
         * @param {GDetailBuilderComponent} newComponentObject Component object with definitions to insert.
         *                 
         * @return  {boolean} true if item was inserted, false otherwise.
        **/
        insertAfterComponent(id: string, newComponentId: string, newComponentObject: GDetailBuilderComponent): boolean


        /**
         * Moves component before target component.
         * @param {string} componentIdToMove ID of component to move.
         * @param {string} targetComponentId Id of target Component.
         */
        moveComponentBefore(componentIdToMove: string, targetComponentId: string): void

        /**
         * Moves component after target component.
         * @param {string} componentIdToMove ID of component to move.
         * @param {string} targetComponentId Id of target Component.
         */
        moveComponentAfter(componentIdToMove: string, targetComponentId: string): void


        /**
         * Registers functions onDetailBuilderInit and onDetailBuilderBuild to be called during build process.
         * @returns {GDetailBuilder} builder
         */
        registerEventsToContent(): GDetailBuilder

        /**
         * Builds components into content
         *
         */
        build(): JQueryPromise<void>

        /**
         * Gets id for given kind of definition and name of definition
         * 
         * @param {GDbd.DefinitionKind} kind
         * @param {string} name
         * @returns {string}
         */
        getIdFor(kind: GDbd.DefinitionKind, name: string): string;


        /**
         * Gets a definition's itemInfo by it's identifier.
         *
         * @param {string} id  The identifier. Must start with "menu", "status", "command", "act", "tab", "form","kpi" or "panel". Can end with * (wildcard)
         * @returns {GDetailBuilderItemInfo[]} The definition's itemInfo.
         */
        getDefinition(id: string, kind?: GDbd.DefinitionKind): GDetailBuilderItemInfo[]

        /** Removes the definition described by ID. Definition is removed from it's definition list, so it won't be build.
        *
        * @date 24.02.2017
        *
        * @param {string} id The identifier. 
        * @returns {GDetailBuilderItemInfo[]} Removed definition's itemInfo or empty array if target definition was not found.
        */
        removeDefinition(id: string|string[], kind?: GDbd.DefinitionKind): GDetailBuilderItemInfo[]

        /** Detaches the definition. Definition is removed from it's definition list, so it won't be build, but is stored and available for future re-enabling.
        *
        * @date 24.02.2017
        *
        * @param {string} id The identifier of item to disable.
        * @returns {GDetailBuilderItemInfo[]} Disabled definition's itemInfo or empty array if target definition not found.
        */
        detachDefinition(id: string, kind?: GDbd.DefinitionKind): GDetailBuilderItemInfo[]

        /** ReAttaches the definition. Finds definition in disabled definitions list and returns it back to array and index, where it was taken from. 
        *
        * @date 24.02.2017
        *
        * @param {string} id The identifier of item to enable. 
        * @returns {GDetailBuilderItemInfo[]} Enabled definition's itemInfo or empty array if target definition not found.
        */
        reAttachDefinition(id: string, kind?: GDbd.DefinitionKind): GDetailBuilderItemInfo[]

        /**
         * Updates the definition. (using deepcopy extend)
         *
         * @date 24.02.2017.
         *   
         * @param {string} id The identifier of definition to update. Or array of identifiers. Accepts identifier with asterix in end  i.e. actWflElDoc*
         * @param {ObjectLiteral<any>} newData Object with data to update.
         * @returns {GDetailBuilderItemInfo[]} Updated definition's itemInfo or or empty array if target definition was not found.</returns>
         */
        updateDefinition(id: string | string[], newData: ObjectLiteral<any>, kind?: GDbd.DefinitionKind): GDetailBuilderItemInfo[]

        /**
         * Inserts definition a before definition described by ID. Specify items to insert as arguments after id.
         *
         * @date    09.03.2017
         *
         * @param {string} id    The identifier of target definition.
         * @param {ObjectLiteral<any>[]} args  Definitions to insert.
         *
         * @return  {void}
        **/
        insertBeforeDefinition(id: string, kind?: GDbd.DefinitionKind, ...args: ObjectLiteral<any>[]): void

        /**
           * Inserts definition or multiple definitions after definition described by ID. Specify items to insert as arguments after id.
           *
           * @date    09.03.2017
           *
           * @param {string} id    The identifier of target definition.
           * @param {ObjectLiteral<any>[]} args  Definitions to insert.
           *
           * @return  {void}
          **/
        insertAfterDefinition(id: string, kind?: GDbd.DefinitionKind, ...args: ObjectLiteral<any>[]): void

        /**
         * Move definition after other definition.
         *
         * @date    09.03.2017
         *
         * @param {string} itemToMoveId  Identifier of the item to move.
         * @param {string} targetItemId  Identifier of the target item.
         *
         * @return  {void}
        **/
        moveDefinitionAfter(itemToMoveId: string, targetItemId: string|null, kind?: GDbd.DefinitionKind): void

        /**
         * Move definition after other definition.
         *
         * @date    09.03.2017
         *
         * @param {string} itemToMoveId  Identifier of the item to move.
         * @param {string} targetItemId  Identifier of the target item.
         *
         * @return  {void}
        **/
        moveDefinitionBefore(itemToMoveId: string, targetItemId: string|null, kind?: GDbd.DefinitionKind): void
    }

    /**
     * DetailBuilder constructor -> new Gordic.Gin.DetailBuilder.builder(this);
     *
     * @author VMaca
     *
     * @example
     * ```typescript
     *  var builder = new Gordic.Gin.DetailBuilder.builder(this);
     *
     *  //add components
     *  builder.withComponent("WflNotes",Gordic.Wfl.DetailBuilderComponents.WflNotes.create(...))
     *
     *  //build
     *  builder.build().then(function(){
     *    //fill data etc.
     *   ...
     *  });
     * ```
     */
    const builder: {
        prototype: GDetailBuilder;

        new(content: GContent): GDetailBuilder;
    }
}


//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinAiSubcontentComponent.d.ts 

declare namespace Gordic.Gin.WebClient {
	/**DTO pro AiSubcontentComponent*/
	interface GGinAiSubcontentComponentDto {
		/**Identifikace AI podporovaného contentu*/
		aiContentEnum?: Gordic.Ginis.DbModel.GGinclgcEnum|null;
		/**Slouží pro kešování obsahu, např. pokud existuje více detailů pod stejným UID, lze předat Ixs, aby se rozlišily chatovací data pro jednotlivé dokumenty*/
		extraIdentifier?: string|null;
	}
	const enum GGinAiSubcontentComponentDtoNames { aiContentEnum = "aiContentEnum", extraIdentifier = "extraIdentifier",}
	const enum GGinAiSubcontentComponentDtoFragments { aiContentEnum = "*", extraIdentifier = "*",}
	const enum GGinAiSubcontentComponentDtoTypes { aiContentEnum = "Gordic.Ginis.DbModel.GGinclgcEnum", extraIdentifier = "string",}
	const enum GGinAiSubcontentComponentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinCalendarComponent.d.ts 

declare namespace Gordic.Gin.WebClient.GGinCalendarComponent {
	/**DTO for calendar component.*/
	interface GGinCalendarComponentDto {
		/**Gets or sets the identifier of document or other entity which is subject to new Calendar event.*/
		ixx?: object|null;
		/**Gets or sets the ixs fun.*/
		ixs_fun?: string|null;
	}
	const enum GGinCalendarComponentDtoNames { ixx = "ixx", ixs_fun = "ixs_fun",}
	const enum GGinCalendarComponentDtoFragments { ixx = "*", ixs_fun = "*",}
	const enum GGinCalendarComponentDtoTypes { ixx = "object", ixs_fun = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinHeaderFormComponent.d.ts 

declare namespace Gordic.Gin.DetailBuilderComponents.GinHeaderFormLayout {

    function create(componentDto: ObjectLiteral<any>): { headerForm: Forms.Form }
   
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinListControlsComponent.d.ts 

declare namespace Gordic.Gin.DetailBuilderComponents {

    interface GListControlsSetupOptions<TDto> {
        /**
         * Function which will get state on input and should return object for serverCall - this.load(result)
         * @param {Gordic.Components.GridRCState<TDto>} gridState
         * @return object which will be passed to load func.
         */
        rowToDto?: (gridState: Gordic.Components.GridRCState<TDto>) => ObjectLiteral<any> | [ObjectLiteral<any>, ObjectLiteral<any>] | JQueryPromise<ObjectLiteral<any> | [ObjectLiteral<any>, ObjectLiteral<any>]>
        /** Function, which should handle loading of content with new data, based on new gridState
         * @param {Gordic.Components.GridRCState<TDto>} gridState
         * @return boolean wheter load was successfull or promise of load
         */
        load?: (gridState: Gordic.Components.GridRCState<TDto>) => boolean | JQueryPromise<any>

        /** Item template for displaying next item */
        nextItemTemplate: Gordic.Templates.IGTemplate<(data: TDto ,...params:any)=>any>

        /** Item template for displaying prev item */
        prevItemTemplate: Gordic.Templates.IGTemplate<(data: TDto, ...params: any) => any>

        /** Function, which will be called before moving to another detail */
        beforeMove?: () => any

    }
    
    interface GListControlsExtensions<TDto> {
        /** 
         * Setup list controls.
         * @param {GListControlsSetupOptions} settings Settings of list controls.
         * 
         */        
        listControls_setup(settings: GListControlsSetupOptions<TDto>): void;

        listControls_getCaption(isNext: boolean, row: TDto): string
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DuvodyPodpisu\GKtgDpoSupport.d.ts 

declare class GKtgDpoSupport {
    constructor(
        Content: GContent,
        DbParams?: Gordic.Gin.WebClient.GKtgDpoSupportDbParamsDto)
    /**
     * Inicializace kategorie podpisu
     * 
     * @param {number} TypKategorie Typ kategorie
     * @param {boolean} [ShowDialog] Příznak, zda se má otevřít dialog
     * @returns {JQueryPromise<GKtgDpoSupportInitDto>} Nainicalizované hodnoty
     */
    Init(TypKategorie: number, ShowDialog?: boolean): JQueryPromise<GKtgDpoSupportInitDto>;
    InitMultiReason(): JQueryPromise<GKtgDpoDto>;
    InitBulkOperation(IxsDpo: string, TypKategorie?: number): JQueryPromise<GKtgDpoDto>;

    SetZobrazitVyberDuvoduVzdy(choiceVisibled: boolean): void;
    GetMakeTsForTypDok(typDok: number): boolean;
   // GKtgDpoSupport(method: "Init", TypKategorie: number, ShowDialog?: boolean): JQuery;
   //// GKtgDpoSupport(method: "Init2", IxsDpo: string): JQuery;
   // GKtgDpoSupport(method: "InitBulkOperation", IxsDpo: string, TypKategorie?: number): JQuery;
   // //GKtgDpoSupport(method: "Init3", TypDok: number, TypSgn: number): JQuery;
   // GKtgDpoSupport(method: "InitMultiReason"): JQuery;
    loadingPromise: JQueryPromise<void>
    isLoaded(): boolean

    DpoEnabled(): boolean
    IxsDpo(): string
    signingReason(): string
    DuvodPodpisuTxt(): string
    DpoConfig(): WflsdpoConfigDto;
    TypKtg(): number;
    TypDokumentu(): number;
    CanAddSign(): number;
    CanAddTS(): boolean;
    ZobrazitVyberDuvoduVzdy(value?: boolean): boolean;
    PrizCasRazToUse(): boolean;
   // GetMakeTsForTypDok(typDok: Gordic.Gin.Globals.TypElpEpxEnum): boolean;
    GetMakeTsForTypDok(typDok: number): boolean;
    GetElDokTsParam(typDok: number): number;
    MakeTsForTypDok(): boolean;
    MakeTsToUseElObraz(): boolean;
    MakeTsToUseElPriloha(): boolean;
    MakeTsToUseCommonFile(): boolean;
    ForceValidateSignOnInsert(): boolean;
    EnablePDFConversionOnInsert(): boolean;
    EnableStandaloneTimestamp(): boolean;
}


interface GKtgDpoSupportInitDto {
    /**
        * Identifikátor kategorie podpisu
        * @type {string | null}
        */
    IxsDpo: string | null;
    /** 
        * Chybové hlášení
        * @type {string}
        */
    ErrMsg?: string;
}
interface GKtgDpoDto {
    /**
        * Identifikátor kategorie podpisu
        * @type {string | null}
        */
    IxsDpo: string | null;
    /** 
        * Duvod podpisu
        * @type {string}
        */
    signingReason?: string;
    /** 
        * Duvod podpisu - obsolete, nahrazuje ho signingReason
        * @type {string}
        */
    DuvodPodpisuTxt?: string;
    /** 
        * Tvorba TS
        * @type {string}
        */
    MakeTs?: boolean;
}
interface WflsdpoConfigDto {
    PrizEditText?: number | null;
    PrizCasRaz?: number | null;
    PozVizPodpis?: number | null;
    TypLtv?: number | null;
}
interface GKtgDpoSupportDbParamsDto {
    gin_sgn_ktgdp?: number | null;
    gin_ele_pdfltv?: number | null;
    gin_ele_pcasraz?: number | null;
    gin_ele_craz_ob?: number | null;
    gin_ele_craz_pr?: number | null;
    gin_pdf_pictpos?: number | null;
}

declare namespace Gordic.Gin.WebClient {
    interface GKtgDpoSupportDbParamsDto {
        gin_sgn_ktgdp?: number | null;
        gin_ele_pdfltv?: number | null;
        gin_ele_pcasraz?: number | null;
        gin_ele_craz_ob?: number | null;
        gin_ele_craz_pr?: number | null;
        gin_pdf_pictpos?: number | null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DuvodyPodpisu\dto\VyberDpoDto.d.ts 

declare namespace Gordic.Gin.WebClient {
	interface VyberDpoDto {
		/**Autogenerated.*/
		Duvod?: string|null;
		/**Autogenerated.*/
		RazitkoChecked?: boolean|null;
	}
	const enum VyberDpoDtoNames { Duvod = "Duvod", RazitkoChecked = "RazitkoChecked",}
	const enum VyberDpoDtoFragments { Duvod = "*", RazitkoChecked = "*",}
	const enum VyberDpoDtoTypes { Duvod = "string", RazitkoChecked = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\GDenMesicRok.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.GDenMesicRok.d.ts                      </Name>
//    <Description>                                                             </Description>
//    <Author>      tfeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-03-09                                                  </Created>
//  </FileHeader>

declare namespace Gordic.Gin.Prefabs {
    /**
     * Prefab políčka pro den, měsíc a rok.
     *
     * @author  tfeik
     * @date    24.07.2017
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gin/Prefabs/#HdenMesicRok}
     *
     * @param {object} options Objekt s parametry prefabu.
     * @param {string[]} [options.fields=["day", "month", "year"]] Pole s použitými složkami datumu a jejich pořadí v řádku.
     * @param {string} [options.output="object"] Typ výstupu políček "object", "singleValues", "string".
     * @param {boolean} [options.ekoDate=false] Povolení 13. měsíce (a více) a změna formátování stringového výstupního datumu pro ekoDate (YYYYMMDD).
     * @param {string} [options.name=DenMesicRok] Společná část názvu políček. Jednotlivá políčka mají v názvu ještě navíc "Den", "Mesic", nebo "Rok".
     * @param {string} [options.label=null] Popis políčka. Výchozí popis se skládá z použitých políček.
     * @param {object} [options.rangeDay={}] Rozsah hodnot dne.
     * @param {number} [options.rangeDay.minValue=1] Minimální možná hodnota dne.Minimální hodnota uživatelsky nastavitelného dne.
     * @param {number} [options.rangeDay.maxValue=31] Maximální možná hodnota dne.
     * @param {number} [options.rangeDay.selectableMinValue=null] Minimální uživatelsky nastavitelná hodnota dne.
     * @param {number} [options.rangeDay.selectableMaxValue=null] Maximální uživatelsky nastavitelná hodnota dne.
     * @param {object} [options.rangeMonth={}] Rozsah hodnot měsíce.
     * @param {number} [options.rangeMonth.minValue=1] Minimální možná hodnota měsíce.
     * @param {number} [options.rangeMonth.maxValue=13] Maximální možná hodnota měsíce.
     * @param {number} [options.rangeMonth.selectableMinValue=null] Minimální uživatelsky nastavitelná hodnota měsíce.
     * @param {number} [options.rangeMonth.selectableMaxValue=null] Maximální uživatelsky nastavitelná hodnota měsíce.
     * @param {object} [options.rangeYear={}] Rozsah hodnot roku.
     * @param {number} [options.rangeYear.minValue=1950] Minimální možná hodnota roku.
     * @param {number} [options.rangeYear.maxValue=new Date().getFullYear()] Maximální možná hodnota roku.
     * @param {number} [options.rangeYear.selectableMinValue=null] Minimální uživatelsky nastavitelná hodnota roku.
     * @param {number} [options.rangeYear.selectableMaxValue=null] Maximální uživatelsky nastavitelná hodnota roku.
     * @param {object} [options.width={}] W-Šířka jendotlivých políček (1-12). Pokud není nastavena pro všechny použitá políčka, pak se spočítá dle "vlastního uvážení".
     * @param {number} [options.width.day=undefined] W-Šířka políčka dne (1-12).
     * @param {number} [options.width.month=undefined] W-Šířka políčka měsíce (1-12).
     * @param {number} [options.width.year=undefined] W-Šířka políčka roku (1-12).
     * @param {string} [options.pathInModel=null] Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})
     * @param {object} [options.fieldOptions={ "dropdown": true }] Parametry všech použitých políček.
     * @param {object} [options.dayFieldOptions={}] Parametry políčka dne.
     * @param {object} [options.monthFieldOptions={}] Parametry políčka měsíce.
     * @param {object} [options.yearFieldOptions={}] Parametry políčka roku.
     *
     * @returns {Gordic.Forms.FormRow} Řádek s políčky prefabu formuláře.
     */
    function denMesicRok<TValue>(options: {
        /**
         * Společná část názvu políček. Jednotlivá políčka mají v názvu ještě navíc "Den", "Mesic", nebo "Rok" (např.: "DenMesicRokDen" pro políčko dne).
         * (default = "DenMesicRok")
         */
        name?: string,
        /**
         * Pole s použitými složkami datumu ("den" / "day", "mesic" / "month", "rok" / "year") a jejich pořadí v řádku.
         * (default = ["day", "month", "year"])
         */
        fields?: ("day" | "month" | "year" | "den" | "mesic" | "rok")[],
        /**
         * Typ výstupu políček "object", "singleValues", "string".
         * (default = "object")
         */
        output?: "object" | "singleValues" | "string",
        /**
         * Povolení 13. měsíce (a více) a změna formátování stringového výstupního datumu pro ekoDate (YYYYMMDD).
         * (default = false)
         */
        ekoDate?: boolean,
        /**
         * Popis políčka. Výchozí popis se skládá z použitých políček.
         * (default = undefined)
         */
        label?: string,
        /**
         * Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})
         * (default = undefined)
         */
        pathInModel?: string,
        /**
         * Parametry všech použitých políček.
         * (default = {"dropdown": true})
         */
        fieldOptions?: GSelectBoxOptions<TValue>,
        /**
         * Parametry políčka dne.
         * (default = {})
         */
        dayFieldOptions?: GSelectBoxOptions<TValue>,
        /**
         * Parametry políčka měsíce.
         * (default = {})
         */
        monthFieldOptions?: GSelectBoxOptions<TValue>,
        /**
         * Parametry políčka roku.
         * (default = {])
         */
        yearFieldOptions?: GSelectBoxOptions<TValue>, //GFieldOptions
        /**
         * Rozsah hodnot dne.
         * (default = {})
         */
        rangeDay?: {
            /**
             * Minimální možná hodnota dne.
             * (default = 1)
             */
            minValue?: number,
            /**
             * Maximální možná hodnota dne.
             * (default = 31)
             */
            maxValue?: number,
            /**
             * Minimální uživatelsky nastavitelná hodnota dne.
             * (default = undefined)
             */
            selectableMinValue?: number,
            /**
             * Maximální uživatelsky nastavitelná hodnota dne.
             * (default = undefined)
             */
            selectableMaxValue?: number,
            /**
             * Výčet uživatelsky nastavitelných hodnot dne. (Platí jak výčet, tak i min/max hodnoty.)
             * (default = undefined)
             * @type {[number]}
             */
            selectableValues?: [number]
        },
        /**
         * Rozsah hodnot měsíce.
         * (default = {})
         */
        rangeMonth?: {
            /**
             * Minimální možná hodnota měsíce.
             * (default = 1)
             */
            minValue?: number,
            /**
             * Maximální možná hodnota měsíce.
             * (default = 13)
             */
            maxValue?: number,
            /**
             * Minimální uživatelsky nastavitelná hodnota měsíce.
             * (default = undefined)
             */
            selectableMinValue?: number,
            /**
             * Maximální uživatelsky nastavitelná hodnota měsíce.
             * (default = undefined)
             */
            selectableMaxValue?: number,
            /**
             * Výčet uživatelsky nastavitelných hodnot měsíce. (Platí jak výčet, tak i min/max hodnoty.)
             * (default = undefined)
             * @type {[number]}
             */
            selectableValues?: [number]
        },
        /**
         * Rozsah hodnot roku.
         * (default = {})
         */
        rangeYear?: {
            /**
             * Minimální možná hodnota roku.
             * (default = 1950)
             */
            minValue?: number,
            /**
             * Maximální možná hodnota roku.
             * (default = new Date().getFullYear())
             */
            maxValue?: number,
            /**
             * Minimální uživatelsky nastavitelná hodnota roku.
             * (default = undefined)
             */
            selectableMinValue?: number,
            /**
             * Maximální uživatelsky nastavitelná hodnota roku.
             * (default = undefined)
             */
            selectableMaxValue?: number,
            /**
             * Výčet uživatelsky nastavitelných hodnot roku. (Platí jak výčet, tak i min/max hodnoty.)
             * (default = undefined)
             * @type {[number]}
             */
            selectableValues?: [number]
        }
        /**
         * W-Šířka jendotlivých políček (1-12). Pokud není nastavena, pak se spočítá dle použitých políček.
         * (default = {})
         */
        width?: {
            /**
             * W-Šířka políčka dne (1-12).
             */
            day?: number,
            /**
             * W-Šířka políčka měsíce (1-12).
             */
            month?: number,
            /**
             * W-Šířka políčka roku (1-12).
             */
            year?: number
        }
    }): Gordic.Forms.FormRow [] | null 
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\ginterval.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.ginterval.d.ts                         </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>

declare namespace Gordic.Gin.Prefabs {
    
    /**
     * prefab intervalu
     * @autor DSebesta
     * @param {object} options
     */
    function interval(options: {
        label?: string,
        name?: string,
        type: "denMesicRok" | "rok" | "string" | "number" | "datetime" | "date"
        pathInModel?: string,
        emptyValue?: any,
        defaultValue?: any,
        difference?: string,
        defaultSize?: string,
        customOptFieldStart?: object,
        customOptFieldEnd?: object,
        customOptAll?: object,
        /**
         * Vlastní validační skupina, na kterou se spustí pro výchozí validátory.
         * Nutné použít, pokud validujete políčka přes validační skupiny.
         * @type {string}
         */
        customValidationGroup?: string
    }):Gordic.Forms.FormRow[] | null 
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\gintervalcontextbox.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>			Gordic.Gin.WebClient.gintervalcontextbox.d.ts		</Name>
//    <Description>		Rozšíření gintervalboxu								</Description>
//    <Author>			thazmuka											</Author>
//    <Copyright>		© GORDIC spol. s r. o. 1993-2018					</Copyright>
//    <Created>			2018-06-21											</Created>
//  </FileHeader>

declare namespace Gordic.Gin.Prefabs {

    /**
     * prefab intervalcontextbox - rozšíření gintervalbox
     * @autor THazmuka
     */
	function intervalContextBox(options: {
		/** název políčka */
		name: string,
		/** uživatelské nastavení */
		userSettings: any,
		/** Rozsah dnů související s položkami v menu: 
		 *  - 'Předvyplnit datum do aktuální datem'
		 *  - 'Vždy předvyplnit posledních {0} dní'
		 */
		daysRange?: number,
		/** Rozsah dnů související s položkami v menu:
		 *  - 'Ode dneška na {0} dní'
		 *  - 'Do dneška na {0} dní'
		 */
		daysRangeMax?: number,
	}): any
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\gmemorySelectbox.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.gmemorySelectbox.d.ts                  </Name>
//    <Description> Prefab pro selextbox na pamatování stringu                  </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>

declare namespace Gordic.Gin.Prefabs {

    /**
     * prefab intervalu
     * @autor DSebesta
     * @param {object} options
     */
    function gmemorySelectbox<TValue>(options: {
        userSettings: Data.IGStorage,
        name: string,
        type?: "string",
        rememberLast?: boolean,
        countOfRemembered?: number,
        staticData?: string[] | { data: string }[],
        srvNameSpace?: string,
        srvServer?: string,
        showTrash?: boolean

    }): GSelectBoxOptions<TValue>
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\gnumIntervalRok.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.numIntervalRok.d.ts                         </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>

declare namespace Gordic.Gin.Prefabs {
    
    /**
     * prefab intervalu
     * @autor DSebesta
     * @param {object} options
     */
    function numIntervalRok(options: {
       
        label?: string,
        name?: string,
        type?: "string" | "number",
        pathInModelInterval?: string,
        pathInModelRok?: string,
        roky?: number[],
        customOptField1?: object,
        customOptField2?: object,
        customOptField3?: object,
        customOptAll?: object 

    }):Gordic.Forms.FormRow | null 
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\grokMesic.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.rokMesic.d.ts                         </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>

declare namespace Gordic.Gin.Prefabs {
    
    /**
     * prefab rokMesic
     * @autor DSebesta
     * @param {object} options
     */
    function rokMesic(options: {

        label?: string,
        name?: string,
        type?: "string" | "number",
        pathInModel?: string,
        roky?: number[], 
        mesice?: number[], // [0 až 11]
        customOptField1?: object,
        customOptField2?: object,
        customOptAll?: object

    }):Gordic.Forms.FormRow | null 
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Scheduling\Scheduling.d.ts 

declare namespace Gordic.Gin {

    interface IfrmMailNotification {
        modelPath?: string;
        fileSaveDisabled?: boolean;
        sendMailDisabled?: boolean;
        eventInvocationDisabled?: boolean;
        dmsSaveDisabled?: boolean;
    }

    function frmMailNotification(options: IfrmMailNotification): Gordic.Forms.Form;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Utils\Utils.defs.d.ts 

declare namespace Gordic.Gin.WebClient {
    /**
     * pomocny enum pro option taxPeriodNameParam
     * 
     * @author pnovak
     * @since 488.1.0.100
     */
    export const enum taxPeriodNameEnum {
        /** Zdanovaci obdobi */
        zdanovaciObdobi = 0,
        /** obdobi uplatneni */
        obdobiUplatneni = 1
    }

    /**
    * 
    * @author PNovak
    * @date 2018-03-09
    */
    export interface IDPHValue {
        /** Hodnota daně */
        tax?: JsonDecimal | null;
        /** Hodnota součtu */
        sum?: JsonDecimal | null;
        /** Hodnota základu */
        baseValue?: JsonDecimal | null;
    }

/** Hodnota daně */

    /**
     * Enum pro typ daně
     */
    export const enum ETaxType {
        DruhaSnizenaDodaneni = "-30",
        DruhaSnizenaDodaneniNum = -30,
        PrvniSnizenaDodaneni = "-20",
        PrvniSnizenaDodaneniNum = -20,
        ZakladniDodaneni = "-10",
        ZakladniDodaneniNum = -10,
        DokladCelkem = "-3",
        DokladCelkemNum = -3,
        Zaokrouhleno = "-2",
        ZaokrouhlenoNum = -2,
        Osvobozeno = "-1",
        OsvobozenoNum = -1,
        BezDane = "0",
        BezDaneNum = 0,
        Zakladni = "10",
        ZakladniNum = 10,
        PrvniSnizena = "20",
        PrvniSnizenaNum = 20,
        DruhaSnizena = "30",
        DruhaSnizenaNum = 30
    }

    /** Popis přenášené hodnoty */
    export interface IGValue {
        /** Typ daně */
        taxType: Extract<ETaxType, string>;
        /** Typ ceny 
         * Základ daně - baseValue
         * Daň - tax
         * Celkem - sum
         */
        priceType: "baseValue" | "tax" | "sum";
    }

    /** Pravidlo pro přenos hodnot z komponenty Rekapitulace DPH */
    export interface IGCollectRule {
        /** Hodnota v rekapitulaci */
        from: IGValue;
        /** Název vlastnosti => budoucí objekt*/
        to: string
    }


    /** Pravidlo pro přenos hodnot do komponenty Rekapitulace DPH */
    export interface IGApplyRule {
        /** Hodnota v objektu */
        from: string;
        /** Název vlastnosti => budoucí objekt*/
        to: IGValue
    }


    /** 
     * Dto, které rozšiřuje hodnoty řádku o informace, která políčka jsou zakázaná
     * @author PNovak
     * @date 2018-03-09
     */
    export interface IGRecapPricesDto extends IDPHValue, IGDisabledValues {
        /** Vše zakázané*/
        disabledAll?: boolean | null;
    }
    /**
     * Dto, které rozšiřuje hodnoty řádku o informace, která políčka jsou zakázaná
     * @author pnovak
     * @since 484.1.0.46
     */
    export interface IGDisabledValues {
        /** Povolená hodnota základu */
        disabledBaseValue?: boolean | null;
        /** Povolená hodnota daně */
        disabledTax?: boolean | null;
        /** Povolená hodnota součtu */
        disabledSum?: boolean | null;
    }



    /** 
     * 
     * @author PNovak
     * @date 2018-03-09
     */
    export interface IGRecapPricesModelDto extends Required<IDPHValue>, Required<IGDisabledValues> {
        /** Vše zakázané*/
        disabledAll?: boolean | null;
    }

    /** TODO
     * @author PNovak
     * @date 2018-03-09
     */
    export interface IGRecapPricesMap {
        [typDane: number]: IGRecapPricesDto;
    }

    export interface IGRecapSetValueDto extends IDPHValue {
        /** Typ daně*/
        dan_typ: number;
    }


    /** 
     * Dto pro vyjádření jednoho řádku v komponentě
     * @author PNovak
     * @date 2018-03-09
     */
    export interface danDto extends IGRecapPricesModelDto {
        /** Typ daně*/
        dan_typ: number;

        /** Pořadí v tabulce */
        sequence: number;

        /** Daň v procentech*/
        dan_proc: number;

        /** Vlastni trida*/
        custClass: string;
    }

    /**
     * Dto pro nastavení modelu pro rekapitulaci DPH
     * @author PNovak
     * @date 2018-03-09   
     */
    export interface IGRecapModelDto {
        /** Příznak, zda je vyplněné Zdanění příjemcem dokladu*/
        taxedByReciever?: boolean;
        /**  Data k prvotnímu naplnění */
        prices?: IGRecapPricesMap;
        /** Daňový doklad */
        taxDoc?: boolean;
        /** Ost. zdan. plněni do 10000 Kc */
        otherTaxedPayment?: boolean;
        /** Použít poměr pro odpočet */
        useDeductionRatio?: boolean;

        /** Období DPH*/
        periodDPH?: IRecapPeriodDPHInterval;



        /** Zdaňovací obdobi(formát: RRRRMM) */
        taxDDPeriod?: IRecapPeriodDPHInterval;

        ///** Políčko změnit období DPH*/
        // changePeriod?: boolean;
    }
    /** TODO
     * @author PNovak
     * @date 2018-03-09
     */
    export interface IGRecapConfigDto {
        /** Daňové atributy */
        checkVisible?: boolean;
        /** Zamezení přepisování hodnot pomocí vnějších vlivů */
        freezeValues?: boolean;
        periodDPHVisible?: boolean;
        ///** Viditelnost zdanovaciho obdobi */
        //taxPeriodVisible?: boolean;
        ///** Viditelný checkbox pro změnu období */
        //taxCheckVisible?: boolean;
        /** Příznak, zda je rekapitulace pouze pro čtení*/
        readOnly?: boolean;
        /** Odkaz na policko Cena celkem nebo jeho hodnota */
        totalAmount?: Function | JQuery | Decimal;
        /** Odkaz na policko Datum zdanitelneho plneni nebo jeho hodnota */
        taxPeriod?: JQuery | Date | Function;
        /** Model */
        model?: IGRecapModelDto;
        /** Datový zdroj řádků */
        dataSource?: (filter?: any, fastFilter?: any) => JQueryPromise<Gordic.Data.Readers.EkocdapDto[]>;
        /**
         * calculate
         * @type {boolean}
         */
        calculate?: boolean;
        /**
         * focus na prvnim edit. sloupci
         * @type {"none" | "focus" | "edit" }
         */
        behavOnFirstEditColumn?: "none" | "focus" | "edit";
        
        visType?: "grid" | "table";
        /** smer pokracovani pri editaci down - po sloupci, right - po radku */
        moveDirection?: "down" | "right";
        /**
         * parametr pro řízení názvů zdan. období
         * @type {taxPeriodNameEnum | undefined}
         */
        taxPeriodNameParam?: taxPeriodNameEnum;
        /**
         * priznak, jestli ma byt rekapitulace nepřistupná
         * @type {boolean}
         */
        disabled?: boolean;

    }
    /**
     * Rok a měsíc pro intervalové políčko
     * 
     * @author pnovak
     * @since 480.1.0.55
     */
    export interface IRecapPeriodDPHInterval {
        /**
         * Měsíc
         * @type {number}
         */
        month: number;
        /**
         * Rok
         * @type {number}
         */
        year: number;
    }
    /** TODO
     * @author PNovak
     * @date 2018-03-09
     */
    interface IRecapPricesModel {
        prices: IGRecapPricesMap | null;
    }

    interface IGExtendEkocdapDto extends Gordic.Data.Readers.EkocdapDto {
        /** Pořadí v gridu */
        sequence: number;
        /** Pomocná CSS třída */
        custClass?: string;
    }
    /** TODO
     * @author PNovak
     * @date 2018-03-09
     */
    interface IRecapValue {
        value: Decimal;
    }

    interface ILastTax {
        dan_typ: number;
        dan_proc: JsonDecimal;
    }
}

//#endregion

