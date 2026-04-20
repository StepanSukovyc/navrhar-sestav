declare namespace Gordic.Pam {
    /**
    * universalni task pro administraci
    */
    function UniAdm_SetTask(task: string): string;
    /**
    * universalni dialog
    * @param Title Název dialogu
    * @param ActionOK Akce pro tlacitko OK
    * @param ActionCLOSE_FormName Akce pro tlacitko CLOSE - nazev formulare
    */
    function UniAdm_DialogOptions(Title: string, ActionOK: GAction, ActionCLOSE_FormName: string): GDialogOptions;
    /**
    * universalni akce - close button
    * @param FormName nazev formulare
    * @param ActionName nazev akce (self)
    */
    function UniAdm_CloseButton(FormName?: string, ActionName?: string): GAction;
    /**
    * universalni kontrola dat
    * @param data kontrolovana data (objekt nebo pole objektu)
    * @param keys kontrolovane property na objektu (nejsou null)
    */
    function UniAdm_IsData(data: any, keys?: string[]): boolean;
    /**
    * universalni formatovani
    * napr.: Pracovnik (ID_PRACOVNIK)
    * napr.: ID_PRACOVNIK - Pracovnik
    * @param id id
    * @param nazev nazev
    * @param zavorky ozavorkovat (nazev)
    * @coypright TV
    */
    function FormField_Format(id: string | null | undefined, nazev: string | null | undefined, zavorky?: boolean): string;
    /**
     * universalni formatovani - template
     * style 1: {nazev} ({id})
     * style 2: {id} - {nazev}
     * style 3: {id} - {nazev} ({pid})
     * @param id id
     * @param nazev nazev
     * @param pid pid
     * @param style styl
     * @coypright TV
     */
    function FormField_Template(id: string | null | undefined, nazev: string | null | undefined, pid?: string | null | undefined, style?: number): string;
}
declare namespace Gordic.Pam.WebControls {
    class GPamAdministracePracoviste extends GContentBase {
        readonly taskId: string;
        private divVazby;
        private divTabManager;
        private tabPraNak;
        private tabPraFun;
        private tabPraVyp;
        private tabPraSlo;
        private viewPra;
        private viewPraNak;
        private viewPraFun;
        private viewPraVyp;
        private viewPraSlo;
        private gridPra;
        private gridPraNak;
        private gridPraFun;
        private gridPraVyp;
        private gridPraSlo;
        private ico;
        private ucs;
        private nks;
        private rok;
        private mesic;
        private RokObd;
        private cfuSet;
        private cfuDataSentence;
        private cfuGridFormat;
        private readonly pam_servis_wk;
        private ixs_pra;
        private VazbaNaPracoviste;
        private tabmanagers_ready;
        onContentReady(): void;
        RefreshVazby(group: string | null | undefined): void;
        Dialog_Pracoviste(Content: GPamAdministracePracoviste, Dto: Gordic.Pam.Interface.GPamspraDto, New: boolean): Promise<void>;
        Dialog_Pracoviste_NakladoveStredisko(Content: GPamAdministracePracoviste, Dto: Gordic.Pam.Interface.GPamvpnsDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPamAdministraceUctovaniProjektu extends GContentBase {
        readonly taskId: string;
        private viewUctPro;
        private gridUctPro;
        private ico;
        private ucs;
        private nks;
        private rok;
        private mesic;
        private RokObd;
        private cfuSet;
        private cfuDataSentence;
        private cfuGridFormat;
        private readonly pam_servis_wk;
        onContentReady(): void;
        Dialog_PrefabCFUelements(Content: GPamAdministraceUctovaniProjektu, Dto: Gordic.Pam.Interface.GPamvpupDto, New: boolean): Promise<void>;
        private InitCfu;
        private TransformCfuDto;
        private TransformCfuGridFormat;
        Dialog_MagicFields(Content: GPamAdministraceUctovaniProjektu, Dto: Gordic.Pam.Interface.GPamvpupDto, New: boolean): Promise<void>;
        Dialog_PrefabCFU(Content: GPamAdministraceUctovaniProjektu, Dto: Gordic.Pam.Interface.GPamvpupDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceBenefity extends GContentBase {
        readonly taskId: string;
        private viewBenefityProgram;
        private viewBenefityCerpani;
        private viewBenefityProgramRoleSkryt;
        private viewBenefityCerpaniRoleSkryt;
        private gridBenefityProgram;
        private gridBenefityCerpani;
        private gridBenefityProgramRoleSkryt;
        private gridBenefityCerpaniRoleSkryt;
        onContentReady(): void;
        DialogProgramRole(Content: GPppAdministraceBenefity, Dto: Gordic.Pam.Interface.GPppBenefityDto, New: boolean): Promise<void>;
        DialogCerpaniRole(Content: GPppAdministraceBenefity, Dto: Gordic.Pam.Interface.GPppBenefityDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceDashboard extends GContentBase {
        readonly taskId: string;
        private viewDashboard;
        private viewDashboardRole;
        private gridDashboard;
        private gridDashboardRole;
        onContentReady(): void;
        Dialog(Content: GPppAdministraceDashboard, Dto: Gordic.Pam.Interface.GPppDashboardRoleDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceFunkce extends GContentBase {
        readonly taskId: string;
        private HistorieFunkce;
        private viewFunkceTyp;
        private viewFunkce;
        private gridFunkceTyp;
        private gridFunkce;
        onContentReady(): void;
        Dialog(Content: GPppAdministraceFunkce, Dto: Gordic.Pam.Interface.GPppNadrizenyFunkceDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceOdkazy extends GContentBase {
        readonly taskId: string;
        private viewOdkazy;
        private gridOdkazy;
        onContentReady(): void;
        Dialog(Content: GPppAdministraceOdkazy, Dto: Gordic.Pam.Interface.GPppLinksDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministracePozadavky extends GContentBase {
        readonly taskId: string;
        private viewPozadavkySeznam;
        private viewPozadavky;
        private viewPozadavkyRole;
        private viewPozadavkySchvalovaciRole;
        private gridPozadavkySeznam;
        private gridPozadavky;
        private gridPozadavkyRole;
        private gridPozadavkySchvalovaciRole;
        private readonly pam_servis_wk;
        private readonly ppp_rad_use_epk;
        onContentReady(): void;
        Dialog(Content: GPppAdministracePozadavky, Dto: Gordic.Pam.Interface.GPppPozadavekSestavyDto): Promise<void>;
        DialogRole(Content: GPppAdministracePozadavky, Dto: Gordic.Pam.Interface.GPppPozadavekRoleDto, New: boolean): Promise<void>;
        DialogHromadne(Content: GPppAdministracePozadavky, Dto: Gordic.Pam.Interface.GPppPozadavekRoleDtoArray): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministracePrehledy extends GContentBase {
        readonly taskId: string;
        private viewCiselnikZamestnanec;
        private viewPrehledSeznam;
        private viewPrehled;
        private viewPrehledRole;
        private viewPrehledPopis;
        private gridPrehled;
        private gridPrehledRole;
        private gridPrehledPopis;
        getZamestnanecName: (row: {
            zamestnanec?: number;
        }) => string;
        onContentReady(): void;
        Dialog(Content: GPppAdministracePrehledy, Dto: Gordic.Pam.Interface.GPppPrehledItemDto, New: boolean): Promise<void>;
        DialogRole(Content: GPppAdministracePrehledy, Dto: Gordic.Pam.Interface.GPppPrehledItemDto, New: boolean): Promise<void>;
        DialogPopis(Content: GPppAdministracePrehledy, Dto: Gordic.Pam.Interface.GPppPrehledItemDto): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceRole extends GContentBase {
        readonly taskId: string;
        private readonly ppp_rad_adash;
        private readonly ppp_rad_auda;
        private readonly ppp_rad_apre;
        private readonly ppp_rad_apoz;
        private readonly ppp_rad_ases;
        private readonly ppp_rad_aben;
        private readonly pam_servis_wk;
        private viewRole;
        private gridRole;
        onContentReady(): void;
        Dialog(Content: GPppAdministraceRole, Dto: Gordic.Pam.Interface.GPppRoleDto, New: boolean, Copy: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceSestavy extends GContentBase {
        readonly taskId: string;
        private viewSestavyRole;
        private gridSestavyRole;
        onContentReady(): void;
        DialogRole(Content: GPppAdministraceSestavy, Dto: Gordic.Pam.Interface.GPppSestavyRoleDto, New: boolean): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPppAdministraceUdaje extends GContentBase {
        readonly taskId: string;
        private viewUdajeSeznamKategorie;
        private viewUdajeSeznam;
        private viewUdaje;
        private viewUdajeRole;
        private gridUdaje;
        private gridUdajeRole;
        onContentReady(): void;
        Dialog(Content: GPppAdministraceUdaje, Dto: Gordic.Pam.Interface.GPppPolozkaDto, New: boolean): Promise<void>;
        DialogRole(Content: GPppAdministraceUdaje, Dto: Gordic.Pam.Interface.GPppPolozkaRoleDto, New: boolean): Promise<void>;
    }
}
declare namespace Gordic.Pam {
    export type TPamCallbackFunctionVariadic = (...args: any[]) => Object | void;
    export type FORMAT_POCET_DNI = "ddd hh:mm" | "hh:mm" | "ddd";
    export type FORMAT_POCET_HODIN = "hh:mm" | "hhh:mm" | "-hh:mm" | "-hhh:mm" | "normalized_hhh:mm";
    export const MESICE_NAZVY: string[];
    export const SORT_PRVNI_JE_VETSI = 1;
    export const SORT_DRUHE_JE_VETSI = -1;
    export const SORT_JSOU_STEJNE = 0;
    export const ERRORBOX: (text: string, title?: string) => JQueryPromise<boolean>;
    export const MESSAGEBOX: (title: string, html: string, width?: number, height?: number) => Promise<boolean>;
    /**
    * Vypsání objektu na konzoli Pokud se jedná o decimal. Tak jej vypíšu na 4 místa
    * @param {any} obj obecný objekt
    * @returns {void}
    */
    export const dump: (obj: any) => void;
    /**
     * Serializuje objekt do JSON řetězce a zpracovává cyklické reference.
     * Pokud objekt obsahuje cyklické reference, nahradí je textem "[Cyclic Reference]".
     * Výstup je formátován s odsazením 2 mezer pro lepší čitelnost.
     *
     * @param {any} obj - Objekt, který má být serializován.
     * @returns {string} - JSON řetězec reprezentující objekt.
     * @example
     * const obj = { a: 1 };
     * obj.b = obj; // Cyklická reference
     * console.log(stringifyObj(obj));
     * // Výstup:
     * // {
     * //   "a": 1,
     * //   "b": "[Cyclic Reference]"
     * // }
     */
    export const stringifyObj: (obj: any) => string;
    /**
    * Převod jQuery.Promise statických dat nebo nativního promise na nativní JavaScriptový Promise
    * @param {<T>(input: T | JQueryPromise<T> | Promise<T>): Promise<T>} jqPromise
    * @returns {Promise<T>}
    */
    export const toNativePromise: <T>(input: T | JQueryPromise<T> | Promise<T>) => Promise<T>;
    /**
     * Rekurzivně vyřeší hodnotu, která může být Promise, jQueryPromise nebo obyčejná hodnota.
     * - Pokud je to Promise/jQueryPromise, počká na jeho vyřešení a případně rozbalí i další
     *   vnořený Promise, dokud nedostane skutečnou hodnotu.
     * - Pokud je to obyčejná hodnota, rovnou ji vrátí přes callback `onDone`.
     * - Pokud Promise spadne, zavolá se `onError`.
     *
     * Tím se simuluje chování `await`, ale přes callbacky a s podporou jQuery deferred objektů.
     */
    export const extractPromiseValue: <T>(value: any, onDone: (val: T) => void, onError: (err: any) => void) => void;
    /**
    * Funkce zjednodušuje hluboce vnořený objekt do plochého objektu, kde klíče jsou formátovány jako řetězce reprezentující cestu v původním objektu.
    * @param {Record<string, any>} obj - Vstupní hluboce vnořený objekt.
    * @returns {Record<string, any>} Plochý objekt, kde klíče jsou cesty v původním objektu a hodnoty odpovídající hodnotám původního objektu.
    */
    export const dumpObj: (obj: Record<string, any>) => Record<string, any>;
    /**
     * Rekurzivně projde objekt a vrátí jeho reprezentaci jako string
     * Každá vlastnost je uvedena na novém řádku ve formátu "cesta[klic]: hodnota".
     * @param {Record<string, any>} obj - vstup
     * @returns {string} Textová reprezentace objektu s plochou strukturou.
     */
    export const dumpObj2String: (obj: Record<string, any>) => string;
    /**
     * Určuje, zda je daný prvek jQuery objektem.
     * @param el - Prvek k ověření
     * @returns `true`, pokud je prvek jQuery objektem, jinak `false`.
     */
    export function isJQueryObject(el: unknown): el is JQuery<HTMLElement>;
    /**
    * Určí, zda je daná hodnota "prázdná".
    *
    * Podporované typy:
    * - `null` nebo `undefined`
      * - prázdný řetězec (včetně jen bílých znaků)
    * - prázdné pole
    * - prázdný objekt `{}` (bez vlastních klíčů)
    * - prázdný jQuery objekt (`JQuery<HTMLElement>`)
    * - prázdný `Map`, `Set`, `NodeList` nebo `arguments`
    *
    * @param obj Hodnota, která se má otestovat.
     * @returns `true`, pokud je hodnota prázdná, jinak `false`.
    */
    export const isEmpty: (obj: unknown) => boolean;
    /**
    * Určuje, zda je hodnota „neprázdná“ – tedy není null, undefined, prázdný řetězec, prázdné pole ani prázdný objekt.
    *
    * Negace výsledku funkce `isEmpty`.
    *
    * @param obj - Libovolná hodnota ke kontrole
    * @returns `true`, pokud je hodnota považována za neprázdnou; jinak `false`
    */
    export const isNotEmpty: (obj: any) => boolean;
    /**
    * Porovnává dvě hodnoty a a b na hlubokou rovnost (deep equality).
    * Podporuje:
    * - primitivní typy (string, number, boolean, null, undefined, symbol)
    * - objekty a pole (rekurzivně kontroluje klíče a hodnoty)
    * - cyklické struktury (pomocí WeakMap `seen`)
    * - Date (porovnává čas)
    * - RegExp (porovnává pattern a flags)
    * - Map (kontroluje klíče a hodnoty)
    * - Set (optimalizovaně pro primitivy, fallback pro objekty)
    *
    * Algoritmus:
    * 1. Rychlá kontrola identity `a === b`.
    * 2. Eliminace null a primitivních hodnot.
    * 3. Kontrola cyklických referencí (`seen`).
    * 4. Porovnání konstruktorů a specifických typů (Date, RegExp, Map, Set).
    * 5. Rekurzivní porovnání polí a objektů.
    *
    * @param a První hodnota k porovnání
    * @param b Druhá hodnota k porovnání
    * @param seen WeakMap sloužící k detekci cyklických referencí (interní, implicitně nová)
    * @returns true, pokud jsou hodnoty hluboce rovné, jinak false
    */
    export function isEqual(a: any, b: any, seen?: WeakMap<object, any>): boolean;
    /**
     * Získání názvu ISL třídy
     * @param {any} obj typ Gordic.Isl.ServiceBase
     * @returns {string}
     */
    export const islName: (obj: any) => string;
    /**
     * Zjištění hodnoty z objektu podle zadaných property - bezpečná varianta
     * @param {Record<string, any> | (() => any) | null | undefined} objekt
     * @param {any} implicitniHodnota Výchozí hodnota, která se vrátí, pokud není nalezena žádná hodnota.
     * @param {string[]} properties  libovolný počet parametrů typu string představující properity
     * @returns {any}
     * @example  console.log ( Pam.getVal({ x: 10,  y: { z: 'Hello'}} , 'Nenalezeno', 'y', 'z');
     * @example  console.log ( Pam.getVal({a: {b: {c: 42}}}           , 'Nenalezeno', 'a', 'b','c');
     */
    export function getVal(objekt: Record<string, any> | (() => any) | null | undefined, implicitniHodnota: any, ...properties: string[]): any;
    /**
     * Obecné zapouzdření funkce getVal s možností určit návratový typ.
     * @param {Record<string, any> | (() => any) | null | undefined} objekt
     * @param {T} implicitniHodnota Výchozí hodnota, která se vrátí, pokud není nalezena žádná hodnota nebo pokud není správného typu.
     * @param {string[]} properties Libovolný počet parametrů typu string představující vlastnosti.
     * @returns Hodnota typu T, nebo implicitní hodnota, pokud není nalezena nebo není správného typu.
     */
    export function getValAs<T>(objekt: Record<string, any> | (() => any) | null | undefined, implicitniHodnota: T, ...properties: string[]): T;
    /**
     * Sekvenční spuštění promise
     * @param {Array<any>} poleAkci Pole s parametry, které se postupně předávají řídící fci
     * @param {Function} RidiciFunkce  Rozhodovací funkce, která na základě aktuální akce rozhoduje, co se bude spouštět
     * @param {any} ParametryRidiciFunkce Vlastní data, které jsou předávány rozhodovací funkci
     * @returns {any}
     * Zde jsou dvě "systémové proměnné"
     *   pocet_polozek  - celkový počet položek, které jsou naplánovanány ke zpracování
     *   pocet_pruchodu - počet již realizovaných průchodů (poprvé je 1)
     * @example
     *      var stack = [{ ixs_ppv: "AAAA", id: 145 }, { ixs_ppv: "BBBB", id: 122 } ];
            var testFn = function (item, mainparam) {
                var def = $.Deferred();
                console.log('item:' + JSON.stringify(item));
                console.log('mainparam:' + mainparam["param1"] + "  " + mainparam["param2"] );
                def.resolve();
                return def.promise();
            };

            Gordic.Pam.PromisseSekvence(stack, testFn, { param1: "jedna", param2: 2 })
                .then(function (result) {console.log("OK" + result);}, function (reason) {console.log("ERROR" + reason);});
     */
    export function PromisseSekvence<T>(poleAkci: T[], RidiciFunkce: (item: T, parametry: any) => Promise<any>, ParametryRidiciFunkce: any): Promise<any[]>;
    /**
     *  Zjištění zdali datum padá mezi interval dvou datumů
     * @param {Date} testDate Testované datum
     * @param {Date} dat_odIn  dat_od
     * @param {Date} dat_doIn  dat_do
     * @returns {boolean} true pokud datum spadá mezi zadaný interval
     */
    export function JeDatumMezi(testDate: Date, dat_odIn: Date, dat_doIn: Date): boolean;
    /**
     * Zjištění, zdali zadaný rok je přestupný
     * @param {number} rok rok
     * @returns {boolean} true pro přestupný rok
     */
    export function PrestupnyRok(rok: number): boolean;
    /**
     * Získání roku z rok_obd_mzdy
     * @param {number} rok_obd_mzdy
     * @returns {number} 24204 (=leden roku 2016) => 2016
     */
    export function RokObdMzdy2Rok(rok_obd_mzdy: number): number;
    /**
     * Získání data začátku aktuálního čtvrtletí
     * @param {number} rok_obd_mzdy Zkrácené období mzdy s hodnotou (rok*12 + měsíc - 1).
     * @returns {Date} Datum začátku aktuálního čtvrtletí odvozené z rok_obd_mzdy
     */
    export function RokObdMzdy2DatumZacCtvrtleti(rok_obd_mzdy: number): Date;
    /**
     * Získání hodnoty RokObdMzdy z prefabovaného políčka Gordic.Gin.Prefabs.rokMesic
     * @param {GContent} cnt content, kde se nalézá formulář s políčkem
     * @param {string} rokMesicPrefabName název políčka
     * @returns {number | null} rok_obd_mzdy, pokud zde je, jinak null
     */
    export function RokObdMzdyFromField(cnt: GContent, rokMesicPrefabName: string): (number | null);
    /**
     * Naplnění hodnoty RokObdMzdy do prefabovaného políčka Gordic.Gin.Prefabs.rokMesic
     * @param {JQuery<HTMLElement>} el html element
     * @param {string} rokMesicPrefabName název políčka
     * @param {number} rok_obd_mzdy hodnota do políčka
     * @returns {void}
     */
    export function RokObdMzdyToField(el: JQuery<HTMLElement>, rokMesicPrefabName: string, rok_obd_mzdy: number): void;
    /**
     * @param {JQuery<HTMLElement>} el
     * @param {string} rokMesicPrefabName
     * @returns {JQuery<HTMLElement>}
     */
    export function RokObdCTL(el: JQuery<HTMLElement>, rokMesicPrefabName: string): JQuery<HTMLElement>;
    /**
     * Získání měsíce z rok_obd_mzdy
     * @param {number} rok_obd_mzdy
     * @returns {number} Měsíc 24204 (=leden roku 2016) => 1
     */
    export function RokObdMzdy2Mesic(rok_obd_mzdy: number): number;
    /**
     * Získání prvního dne v měsíci pro rok_obd_mzdy
     * @param {number} rok_obd_mzdy
     * @returns {Date} 24204 => 1.1.2017
     */
    export function RokObdMzdy2FirstDay(rok_obd_mzdy: number): Date;
    /**
    * Získání rok_obd_mzdy z textové prezentace
    * @param {number| string | null | undefined} rok_obd_text řetězec ve tvaru MM/RRRR MMRRRR MMRR MM:RRRR MM:RR MM-RRRR MM/RR MM*RRRR
    * @returns {number | null} 1/2024 => 24288
    * @author ZMOLIK
    */
    export function RokObdMzdyTxt2RokObdMzdy(rok_obd_mzdy: number | string | null | undefined): number | null;
    /**
     * Přidání dnů k datu
     * @param {Date} datum
     * @param {number} amount Počet dnů
     * @returns {Date} Původní datum + počet dnů
     */
    export function AddDays(datum: Date, amount: number): Date;
    /**
     * Získání posledního dne v měsíci pro rok_obd_mzdy
     * @param {number} rok_obd_mzdy
     * @returns {Date} 24204 => 31.1.2017
     */
    export function RokObdMzdy2LastDay(rok_obd_mzdy: number): Date;
    /**  Získání čísla posledního dne v měsíci pro rok_obd_mzdy - varinta den
    * @param {number} rok_obd_mzdy
    * @returns {number} 24265 (2/2022) => 28
    */
    export function RokObdMzdy2LastDayD(rok_obd_mzdy: number): number;
    /**
     * Informace zdali zadaný rok_obd_mzdy má průnik s dat_od a dat_do
     * @param {number} rok_obd_mzdy
     * @param {Date} dat_od
     * @param {Date} dat_do
     * @returns {boolean} true = ano je průnik
     */
    export function ProlinaRokObdMzdy(rok_obd_mzdy: number, dat_od: Date, dat_do: Date): boolean;
    /**
     * Získání rok_obd_mzdy z měsíce a roku
     * @param {number} rok
     * @param {number} mesic
     * @returns {number} 6,2017 => 24209
     */
    export function RokObdMzdy(rok: number, mesic: number): number;
    /**
     * Převod rok_obd_mzdy na textovou prezentaci
     * @param {number | null | undefined} rok_obd_mzdy
     * @returns {string} Výsledný řetězec ve formátu M/RRRR
     */
    export function RokObdMzdy2TXT(rok_obd_mzdy: number | null | undefined): string;
    /**
    * Převod rok_obd_mzdy na textovou prezentaci
    * @param {number | null | undefined} rok_obd_mzdy
    * @returns {string} Výsledný řetězec ve formátu Září 2024
    */
    export function RokObdMzdy2TXT2(rok_obd_mzdy: number | null | undefined): string;
    /**
     * Převod rok_obd_mzdy na textovou prezentaci RokMes (RRRRMM)
     * @param {number | null | undefined} rok_obd_mzdy
     * @returns {string} Výsledný řetězec ve formátu RRRRMM
     */
    export function RokObdMzdy2RokMes(rok_obd_mzdy: number | null | undefined): string;
    /**
     * Převod datumu na rok_obd_mzdy
     * @param {Date | null | undefined} datum Zkoumaný datum pokud je null nebo undefined, tak se vrátí aktuální období
     * @returns {number} Převedený rok_obd_mzdy. Pokud se nepovede, tak null
     */
    export function Date2RokObdMzdy(datum: Date | null | undefined): number;
    /**
    * Obecná metoda pro zavolání serverové metody s použitím promise a generiky.
     *
    * @template TResult Typ výsledku, který bude promise vracet.
    * @param {string} methodName - Název volané metody na serveru.
    * @param {Object} [params={}] - Volitelné parametry, které budou odeslány na server jako argumenty volání metody.
    * @param {string} [remoteServiceName="Gordic.Pam.WebControls.GPAMRemoteService"] - Název vzdálené služby, která se použije pro volání metody. Výchozí hodnota je `Gordic.Pam.WebControls.GPAMRemoteService`.
    * @returns {Promise<TResult>} Promise, který bude vracet výsledek volané metody ve specifikovaném generickém typu `TResult`. Pokud volání selže, promise bude zamítnut.
    * @author ZMOLIK
    */
    export function CallWithPromise<TResult>(methodName: string, params?: Object, remoteServiceName?: string): Promise<TResult>;
    /**
     * Test zdali je zadaný vstup integer
     * @param {Object} value hodnota
     * @returns {boolean} true = ano je to integer
     */
    export function isInt(value: Object): boolean;
    /**
     * Vytvoření command baru z akcí
     *
     * jednotlivé akce musí mít vlastní atribut menuindex.
     * Pokud je zadán vlastní atribut type je převzat, abych dokázal vložit oddělovač (type: "separator")
     * podle toho se seskládají
     * @param {GContent} content
     * @returns {void}
     */
    export function sestavMenu(content: GContent): void;
    /**
     * Vrátí další, dostupný menuindex pro zaslané akce
     * cílem fce je dynamické stanovení volné pozice pro další volbu v menu
     *
     * @param {GActionList} actions akce
     * @returns {number} další volný menuindex
     */
    export function NextMenuindex(actions: GActionList): number;
    /**
     * Doplnění řetězce znakem zleva
     * @param {string|number} data vstupní data číslo nebo řetězec
     * @param {number} delka cílová délka
     * @param {string} znak, který má být doplněn zleva, pokud není uvedeno, tak je to '0'
     * @param {boolean} otrimovat true/false, podle toho zdali se má provést trim [true]
     * @returns {string} Řetězec, doplnění na požadovanou délku
     * @example LPAD(1,5,'0') => '00001'
     */
    export function LPAD(data: string | number, delka: number, znak?: string, otrimovat?: boolean): string;
    /**
    * Doplnění řetězce znakem zprava
    * @param {string|number} data vstupní data číslo nebo řetězec
    * @param {number} delka cílová délka
    * @param {string} znak, který má být doplněn zleva, pokud není uvedeno, tak je to '0'
    * @param {boolean} otrimovat true/false, podle toho zdali se má provést trim [true]
    * @returns {string} Řetězec, doplnění na požadovanou délku
    * @example LPAD(1,5,'0') => '10000'*
    */
    export function RPAD(data: string | number, delka: number, znak?: string, otrimovat?: boolean): string;
    /**
    * Získání normalizované podoby pro poznámku
    * @returns {string} Např: 10.4.2017 v 16:00
    */
    export function NormalizedTimestampPoznamka(): string;
    /**
     * Získání normalizované podoby časového razítka
     * @returns {string} HH:MM:SS,mmm
     */
    export function NormalizedTimestamp(): string;
    /**
    * Získání normalizované podoby časového razítka
    * @returns {string} HH:MM
    */
    export function NormalizedTimestampShort(): string;
    /**
     * Zjistí počet "Properties" zaslané množiny  countProperties({ "prvni": 2,  "druha": 4,  "treti": 6}) => 3
     * @param {Object} obj zkoumaná množina
     * @returns {number} počet vlastností
     * @example Gordic.Pam.countProperties({ "prvni": 2,  "druha": 4,  "treti": 6}) => 3
     */
    export function countProperties(obj: Object): number;
    /**
     * Spojí pole řetězců do jednoho řetězce, který je složen se spojených vstupních argumentů
     * ošetřuje null, prázdno, mezery
     * @param {Array<string | null | undefined>} poleStringu stringů
     * @param {string} separator oddělovač, pokud není uveden  je to ' '
     * @returns {string} Řetězec jako slepenina všech prvků pole
     */
    export function JoinStrings(poleStringu: Array<string | null | undefined>, separator: " "): string;
    /**
     * Logování výsledku volání SPG procedur do konzole
     * @param {GSplResultDto} spgresult normalizovaný spg result
     * @returns {void}
     */
    export function LogujSpgChybu(spgresult: Gordic.Pam.Interface.GSplResultDto): void;
    /**
     * otestování zdali je výslek spg procedury OK
     * @param {Gordic.Pam.Interface.GSplResultDto | null | undefined} spgresult normalizovaný spg result
     * @returns {boolean}
     */
    export function CheckSpgOk(spgresult: Gordic.Pam.Interface.GSplResultDto | null | undefined): boolean;
    /**
     * Získání zásobníku volání jako řetězec
     * @returns {string} Zásobník volání
     */
    export function getStack(): string;
    /**
        Serializuje lokální datum pro přenos (JSON) tak, aby nedošlo k posunu kalendářního dne vlivem časové zóny.
    *
    * Pokud je vstup `null`, vrací `null`.
    *
    * Časová složka je ignorována – výsledkem je vždy půlnoc daného dne v UTC.
    *
    *  * Příklad:
    *   vstup:  Wed Mar 08 2017 15:30:00 GMT+0100
    *   výstup: "2017-03-08T00:00:00.000Z"
    *
    *
    * @param {Date | null} datum Lokální datum (časová složka není významná)
    * @returns {string | null} Datum serializované do JSON (UTC) nebo null
    */
    export function DateOnlyToJson(datum: Date | null): string | null;
    /**
     * Získání všech řádků v gridu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název DIV elementu ve kterém je grid umístěn
     * @returns {MetaRow<any>[]}
     */
    export function GridGetData(obj: JQuery<HTMLElement> | string): MetaRow<any>[];
    /**
     * Získání gridu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název DIV elementu ve kterém je grid umístěn
     * @returns {JQuery<HTMLElement>}
     */
    export function GridGetGrid(obj: JQuery<HTMLElement> | string): JQuery<HTMLElement>;
    /**
     * Získání view pro grid v zaslaném DIVu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název DIV elementu ve kterém je grid umístěn
     * @returns {Gordic.Data.View} DataView gridu umístěného v zadaném DIVu
     */
    export function GridGetView(obj: JQuery<HTMLElement> | string): Gordic.Data.View;
    /**
     * Označení všech řádků v gridu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název DIV elementu ve kterém je grid umístěn
     * @returns {void}
     */
    export function GridOznacVse(obj: JQuery<HTMLElement> | string): void;
    /**
     * Naplnění gridu daty
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
     * @param {Gordic.Data.View | any[] | null} data View s daty
     * @param {boolean} norefresh  norefresh = false ... nastavení zdali se má grid občerstvit [false]
     * @returns {void}
     */
    export function GridSetData(obj: JQuery<HTMLElement> | string, data: Gordic.Data.View | any[] | null, norefresh?: boolean): void;
    /**
     * Nastavení sloupců pro grid
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
     * @param {Gordic.Data.GridFormat<{}>} columns sloupce gridu
     * @param {boolean} norefresh [false] nastavení zdali se má grid občerstvit
     * @returns {void}
     */
    export function GridSetColumns(obj: JQuery<HTMLElement> | string, columns: Gordic.Data.GridFormat<{}>, norefresh?: boolean): void;
    /**
     * Vyčištění gridu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
     * @param {string | null} key [null] případný klíč nového view
     * @returns {void}
     */
    export function GridClearData(obj: JQuery<HTMLElement> | string, key?: string | null): void;
    /**
     * Refresh řádků gridu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
     * @returns {void}
     */
    export function GridRefreshRow(obj: JQuery<HTMLElement> | string): void;
    /**
     * Typ pro uložení chyb při kontrole gridu
     */
    export type GridEditorErrors = {
        valid: boolean;
        cell?: {
            coords: CellCoords;
            error: string;
        }[];
    };
    /**
    * @param {GContent} cnt content
    * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
    * @param {boolean} stopEditorOnError [true] zastavovat editor na chybách
    * @param {boolean} tocitko [true] zobrazovat točítko s progressem validace
    * @returns {Promise<GridEditorErrors>}
    */
    export function GridEditorValidate(cnt: GContent, obj: JQuery<HTMLElement> | string, stopEditorOnError?: boolean, tocitko?: boolean): Promise<GridEditorErrors>;
    /**
     *  Získání vybraných řádků gridu
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
     * @param {boolean} checkedOnly [false]  příkaz, zdali vybírat pouze checked řádkym - implicitně všechny
     * @returns {Object[] | null} Vybrané řádky gridu, popřípadě null, pokud není nic vybráno
     */
    export function GridSelectedRows(obj: JQuery<HTMLElement> | string, checkedOnly?: boolean): Object[] | null;
    /**
     * Získání vybraného řádků gridu
     * @param {JQuery<HTMLElement>} obj HTML element představující grid nebo název elementu
     * @param {boolean} checkedOnly [false] příkaz, zdali vybírat pouze checked řádkym - implicitně všechny
     * @returns {Object | null} Vybraný řádek gridu, popřípadě null, pokud není nic vybráno
     */
    export function GridSelectedRow(obj: JQuery<HTMLElement> | string, checkedOnly?: boolean): Object | null;
    /**
    * Získání vybraného řádků gridu
    * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
    * @returns {Object | null} Vybraný řádek gridu, popřípadě null, pokud není nic vybráno
    */
    export function GridSelectedRowMeta(obj: JQuery<HTMLElement> | string): Object | null;
    /**
     * Aktualizace dat v gridu ( pokud zde již jsou, tak provede jejich aktualizaci podle klíče)
     * @param {JQuery<HTMLElement> | string} obj HTML element představující grid nebo název elementu
     * @param {Object} dto Vkládaná data
     * @param {boolean} norefresh [false] v případě true zakáže aktualizaci gridu - implicitně vypnuto
     * @param {boolean} replace [false] v případě true neprovede aktualizaci, ale náhradu kompletním řádkem ( má smysl pouze pro UPDATE)
     * @returns {object} nalezený klíč
     */
    export function GridInsertOrUpdate(obj: JQuery<HTMLElement> | string, dto: Object, norefresh?: boolean, replace?: boolean): object;
    /**
     * Nastavení funkce pro změnu řádku
     * @param {JQuery<HTMLElement> | string} obj grid
     * @param {JQueryEventListener1<{ cellInfo: CellInfo<any>, originalCellInfo: CellInfo<any>, view: Gordic.Data.View<any> }> | undefined} fn fce volaná při změně nebo undefined
     * @returns {void}
     */
    export function GridChangeRow(obj: JQuery<HTMLElement> | string, fn: JQueryEventListener1<{
        cellInfo: CellInfo<any>;
        originalCellInfo: CellInfo<any>;
        view: Gordic.Data.View<any>;
    }> | undefined): void;
    /**
     * Přidání nebo odebrání stylu buňky v gridu
     *
     * @param {JQuery<HTMLElement> | string} obj grid
     * @param {number} row řádek
     * @param {number} col sloupec
     * @param {string} style název stylu
     * @param { "add" | "remove"} action akce, kterou se má provést
     *
     * @abstract Přidá nebo odebere zadaný styl do buňky v gridu. Může být použito pro obarvení/odbarvení buňky
     */
    export function GridCellStyle(obj: JQuery<HTMLElement> | string, row: number, col: number, style: string, action: "add" | "remove"): void;
    /**
      * Přidání nebo odebrání stylu pro řádek v gridu
      *
      * @param {JQuery<HTMLElement> | string} obj grid
      * @param {number} row řádek
      * @param {string} style název stylu
      * @param { "add" | "remove"} action akce, kterou se má provést
      *
      * @abstract Přidá nebo odebere zadaný styl z řádku gridu
      */
    export function GridRowStyle(obj: JQuery<HTMLElement> | string, row: number, style: string, action: "add" | "remove"): void;
    /**
      * Přidání nebo odebrání stylu pro sloupec v gridu
      *
      * @param {JQuery<HTMLElement> | string} obj grid
      * @param {number} col sloupec
      * @param {string} style název stylu
      *
      * @abstract Odebere zadaný styl ze sloupce gridu
      */
    export function GridColStyle(obj: JQuery<HTMLElement> | string, col: number, style: string, action: "add" | "remove"): void;
    /**
     * Přidání nebo odebrání stylu pro celý grid
     *
     * @param {JQuery<HTMLElement> | string} obj grid
     * @param {string} style název stylu
     * @param { "add" | "remove"} action akce, kterou se má provést
     * @abstract PPřidá nebo odebere zadaný styl z celého gridu
     */
    export function GridStyle(obj: JQuery<HTMLElement> | string, style: string, action: "add" | "remove"): void;
    /**
     * Získání maxima z pole
     * @param {object[]} data pole prvků
     * @param {string} itemName název sloupce
     * @returns {number | null} maximální hodnota (číslo), null pokud zde nic není
     */
    export function MaxFromArray(data: object[], itemName: string): number | null;
    /**  Získání nejdelšího řetězce z pole
        * @param {object[]} data pole prvků
        * @param {string} itemName název sloupce
        * @returns {string | null} nejdelší řetězec, null pokud zde nic není
        */
    export function MaxStringFromArray(data: object[], itemName: string): string | null;
    /**
    * Získání maximální délky spojených řetězců z pole
    * @param {object[]} data pole prvků
    * @param {string[]} itemNames názvy sloupců, které se mají spojit
    * @returns {number} maximální délka spojeného řetězce
    *
    * @example const maxDelka = MaxConcatenatedLength(data, ["char_1", "char_2", "char_3"]);
    */
    export function MaxConcatenatedLength(data: object[], itemNames: string[]): number;
    /**
     * Zjištění zdali je prvek v poli
     * @param {any} array pole
     * @param {any} target prvek
     * @returns {boolean} true = prvek byl nalezen
     */
    export function arrContain(array: any, target: any): boolean;
    /**
    * Bezpečné získání prvního prvku jako jednoprvkového pole.
    * Pokud je vstupní pole undefined, null nebo prázdné, vrací prázdné pole [].
    * @param pole
    * @returns první prvek jako jednoprvkové pole, nebo prázdné pole pokud není k dispozici žádný prvek.
    */
    export function arrFirst<T>(array: T[] | undefined | null): T[];
    /**
     * Bezpečné získání posledního prvku jako jednoprvkového pole.
     * Pokud je vstupní pole undefined, null nebo prázdné, vrací prázdné pole [].
     * @param array
     * @returns poslední prvek jako jednoprvkové pole, nebo prázdné pole pokud není k dispozici žádný prvek.
     */
    export function arrLast<T>(array: T[] | undefined | null): T[];
    /**
     * Zjištění zdali zadaný řetězec je obsažen ve řetězcových polích zadaného pole typicky GPamtpomDto[]  ( fitrace probíhá nad char_1 .. char_5 )
     * @param {T[]} array pole
     * @param {string | null | undefined} searchString prvek
     * @param {string[]} columns pole sloupců, podle kterýc se filtruje
     * @param {boolean} ignoreCase [true] ignovat malá/velká písmena
     * @param {boolean} ignoreDiacritics [true] ignorovat diakritiku
     * @returns {T[]}
     */
    export function arrFilterByString<T>(array: T[], searchString: string | null | undefined, columns: string[], ignoreCase?: boolean, ignoreDiacritics?: boolean): T[];
    /**
     * Sečte hodnoty zadaného sloupce. Podporuje `number` i `Decimal`.
     * @param pole - Pole objektů
     * @param colname - Název sloupce, jehož hodnoty se mají sečíst
     * @param asDecimal - Pokud true, vrací Decimal, jinak number (default: false)
     * @returns Součet jako `Decimal` nebo `number`
     */
    export function arrSumColumn(pole: any[], colname: string, asDecimal?: boolean): Decimal | number;
    /**
     * Slouží k redukci pole objektů na unikátní kombinace podle zadaných vlastností.
     * Umožňuje specifikovat vlastnosti, podle kterých se má provádět redukce, a vrací pole objektů ve struktuře původního pole,
     * kde jsou zachovány unikátní kombinace podle zadaných vlastností.
     * @param {T[]} arr Vstupní pole objektů, které má být redukováno.
     * @param {string} propertyString Řetězec obsahující seznam vlastností oddělených
     * @param {string} sortOrder Řetězec pro případné třídění
     * @param {boolean} trim [false] otrimování, případné otrimování
     * @returns {T[]} Redukované pole obsahující unikátní kombinace podle zadaných vlastností.
     
     * @example
     *
     *
     * let convertedArray = [
                        { char_1: "AA1", char_2: "AAA - 1", char_3: "BBB - 1", char_4: "BBB - val1" },
                        { char_1: "AA1", char_2: "AAA - 1", char_3: "BBB - 2", char_4: "BBB - val2" },
                        { char_1: "AA1", char_2: "AAA - 1", char_3: "BBB - 3", char_4: "BBB - val3" },
                        { char_1: "AA2", char_2: "AAA - 2", char_3: "BBB - 1", char_4: "BBB - val4" },
                        { char_1: "AA2", char_2: "AAA - 2", char_3: "BBB - 2", char_4: "BBB - val5" },
                        { char_1: "AA2", char_2: "AAA - 2", char_3: "BBB - 3", char_4: "BBB - val6" }
                    ]

       const data = Pam.arrReduceToUniq(convertedArray, "char_1,char_2");

       výsledek [
        { char_1: "AA1", char_2: "AAA - 1"},
        { char_1: "AA2", char_2: "AAA - 2"}
       ]
     *
     */
    export function arrReduceToUniq<T>(arr: T[], propertyString: string, sortOrder?: string, trim?: boolean): T[];
    /**
    * Získání podpole podle zadaného klíče
    * @param {T[]} arr  původní pole
    * @param { { [key: string]: any } | { [key: string]: any }[]} filterArray pole filtrů buďto objekt nebo  pole
    * @param {boolean} shoda [true] = vráceno podpolem, které odpovídá zadanému filtru  false = naopak (neodpovídá)
    * @returns {T[]} původní pole přefiltrováno
    * @example
    *   const arr = Gordic.Pam.arrSubArrayByKey(data,[ { property: 'err_code', value: -733578 }]);        // položky pole vyhovující podmínce
    *   const arr = Gordic.Pam.arrSubArrayByKey(data,[ { property: 'err_code', value: -733578 }], false); // původní pole bez filtrovaného prvku (opak předchozí podmínky)
    *
    const inputArray = [
        { id: 1, err_txt: "text", err_code: -733578 },
        { id: 2, err_txt: "jiný text", err_code: -730000 },
        { id: 3, err_txt: "text", err_code: -733578 },
    ];
    
    const filteredArray = arrSubArrayByKeys(inputArray, [ { err_txt: "text", err_code: 733578 }] , true);
    
    */
    export function arrSubArrayByKeys<T extends object>(arr: T[], filterArray: {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | string | number, shoda?: boolean): T[];
    /**
    * Zjištění indexu pole podle hodnoty specifické property
    * @param {T[]} data vstupní pole
    * @param {keyof T} property název property, která se hledá
    * @param {T[keyof T]} value  hodnota této property
    * @returns {number} Funkce buď vrátí index prvního objektu, který vyhovuje nebo -1, pokud není nalezen.
    */
    export function arrFindIndexByProperty<T>(data: T[], property: keyof T, value: T[keyof T]): number;
    /**
     * Převod pole do struktury pamtpo1
     * @param {Record<string, any>[]} data obecná data
     * @returns {Gordic.Pam.Interface.GPamtpo1Dto[]} pole GPamtpo1Dto
     */
    export function arrToPamtpo1(data: Record<string, any>[]): Gordic.Pam.Interface.GPamtpo1Dto[];
    /**
    * Redukuje pole pole objektů pouze specifikované vlastnosti, které jsou uvedené v řetězci `propertyString`.
    * @param {Record<string, any>[]} array - Vstupní pole objektů, ve kterých jsou vlastnosti k filtraci.
    * @param {string} propertyString - Řetězec s názvy vlastností, které se mají extrahovat, oddělený čárkami.
    * @returns {Record<string, any>[]} Nové pole objektů, kde každý objekt obsahuje pouze vlastnosti zadané v `propertyString`.
    */
    export function arrReduceCols(array: Record<string, any>[], propertyString: string): Record<string, any>[];
    /**
     * Provede rozdíl dvou polí nebo množin
     * @param {T[] | Set<T> | Record<string, T>} data1 zdrojové pole
     * @param {T[] | Set<T> | Record<string, T>} data2 vyřazovaná mmožina
     * @returns {T[] | Set<T> | Record<string, T>} arr1 - arr2
     */
    export function arrExclude<T>(data1: T[] | Set<T> | Record<string, T>, data2: T[] | Set<T> | Record<string, T>): T[] | Set<T> | Record<string, T>;
    /**
    * Převede vstupní hodnotu na pole typu T[]
    * Podporuje Array, Set, Map, Object, Iterable, a skalární hodnoty
    * @param value vstupní data
    */
    export function toArray<T>(value: T[] | Set<T> | Map<any, T> | Record<string, T> | Iterable<T> | T | null | undefined): T[];
    /**
     * Prohledání objektu a nalezení jednoho (prvního) záznamu, které odpovídá klíči
     * @param {Object[]} base Prohledávaná množina
     * @param {Object} testValues hledaný klíč
     * @returns  Objekt result.data výsledná data, pokud není nalezeno, tak NULL  result.index
     * Nalezený index v původním poli, pokud není, tak -1
     */
    export function findRowByKey(base: Object[], testValues: Object): Object;
    /**
    * Zavolání interní servisní vrstvy pomocí stringu - ošetřuje případnou neexistenci volané fce
    * @param {GContent} cnt Content
    * @param {string} objectName Jednoznačná identifikace ISL objektu
    * @param {string} functionName Jméno volané fce (například "list" ...)
    * @param {any} args argumenty buďto statická data nebo filters
    * @returns
    */
    export function Isl(cnt: GContent, objectName: string, functionName: string, args?: any): Isl.GIslPromise<any>;
    /**
     * Získání Data z číselníku
     * @param {Gordic.Isl.GServiceListRequest} rq filtrační request
     * @param {string} cisName název číselníku např. pamcodp
     * @returns {JQueryPromise<any>}
     */
    export function getCiselnik(rq: Gordic.Isl.GServiceListRequest, cisName: string): JQueryPromise<any>;
    /**
     * Bezpečné vykonání akce
     * @param {GContent} cnt Content
     * @param {string} actName Název akce
     * @param {Object | null | undefined} eventData [{}] Případná data s jakými se akce vykonává (nepovinný parametr)
     * @param {any} eventCallBack [null] Případný callback s jakými se akce vykonává (nepovinný parametr)
     * @returns {void}
     */
    export function RunAction(cnt: GContent, actName: string, eventData?: (Object | null | undefined), eventCallBack?: any): void;
    /**
     * Převod datum na řetězec
     * @param {string | Date | null | undefined} datumStr datum nebo string
     * @returns {string}
     */
    export function Date2Str(datumStr: string | Date | null | undefined): string;
    /**
     * Převod datum/čas na řetězec
     * @param {string | Date | null | undefined} datumStr datum nebo string
     * @param {boolean} shortDateFormat d.M.yyyy hh:mm:ss / dd.MM.yyyy hh:mm:ss
     * @param {boolean} withTimeSeconds vcetne sekund :ss
     * @param {boolean} smartTimeFormat pokud je datum bez času nebo 00:00:00, tak se vrátí pouze datum
     * @returns {string}
     */
    export function DateTime2Str(datumStr: string | Date | null | undefined, shortDateFormat?: boolean, withTimeSeconds?: boolean, smartTimeFormat?: boolean): string;
    /**
     * Náhrada math.trunc() Truncate desetinného čísla ( v es5 není Math.trunc())
     * @param {number} cislo desetinné číslo
     * @returns {number} celé číslo
     * @example 1.82 => 1
     * @example -4.82 => 4
     */
    export function trunc(cislo: number): number;
    /**
     * Konverze obecného objektu na řetězec
     * @param obj Obecný objekt
     * @param level Interní proměnná určující úroveň odsazení (neplnit, ponechat implicitní hodnotu)
     * @returns Řetězec, který má odděleny jednotlivé položky '\n'
     */
    export function toString(obj: object | null | undefined | string | number | boolean, level?: number): string;
    /**
     * Konverze obecného objektu na Number
     * @param {any} obj obecný objekt
     * @param {number} implicitValue [0] Implicitní hodnota, pokud není uvedena, tak 0
     * @returns {number}
     */
    export function toNumber(obj: any, implicitValue?: number): number;
    /**
    * Konverze obecného objektu na Decimal
    * @param {any} obj obecný objekt
    * @param {Decimal} implicitValue [0] Implicitní hodnota, pokud není uvedena, tak 0
    * @returns {Decimal}
    */
    export function toDecimal(obj: any, implicitValue?: Decimal): Decimal;
    /**
    * Konverze obecného objektu na boolean
    * @param {any} obj obecný objekt
    * @param {boolean} implicitValue [false] Implicitní hodnota, pokud není uvedena, tak false
    * @returns {boolean}
    */
    export function toBoolean(obj: any, implicitValue?: boolean): boolean;
    /**
     * Převede vstupní hodnotu na objekt Date. Pokud se konverze nezdaří, vrací null.
     * @param obj - Libovolný vstup (string | null | undefined | Date | JsonDate)
     * @param addedDays - Počet dnů, které se mají přičíst (může být i záporný)
     * @returns Date nebo null
     */
    export function toDate(obj?: string | null | undefined | Date | {
        date?: string;
    }, addedDays?: number): Date | null;
    /**
     * Přejmenování properity
     * @param {any} keysMap mapa { int_1: 'uro_kum', char_1: 'uro_kum_txt' } zajistí přejemnování int_1 na uro_kum a char_1 na uro_kum_txt
     * @param {any} obj data
     * @returns {any}
     */
    export function renameKey(keysMap: any, obj: any, index?: boolean): any;
    /**
    * Zjednodušení typického zápisu pro zavření na poklepání všech podřízených oken na breadcrumbs
    * @param cnt - GContent instance
    * @param caption - Text breadcrumbu
    * @param akce - Akce, pokud je definována (jinak se použije defaultAction)
    */
    export function Breadcrumbs(cnt: GContent, caption: string, akce?: GAction | null): void;
    /**
     * Bezpečná varianta pro zjištění zdali je properity null nebo undefined
     * @param {T} obj základní objekt
     * @param {K0} k0  1. properity
     * @param {K1} k1  2. properity
     * @param {K2} k2  3. properity
     * @param {K3} k3  4. properity
     * @param {K4} k4  5. properity
     * @param {K5} k5  6. properity
     * @returns {any}
     */
    export function nullSafe<T, K0 extends keyof T, K1 extends keyof T[K0], K2 extends keyof T[K0][K1], K3 extends keyof T[K0][K1][K2], K4 extends keyof T[K0][K1][K2][K3], K5 extends keyof T[K0][K1][K2][K3][K4]>(obj: T, k0: K0, k1?: K1, k2?: K2, k3?: K3, k4?: K4, k5?: K5): any;
    /**
     * Vrací globální nastavení aplikace
     * @param {GContent} cnt content
     * @param {string} valuename název hodnoty
     * @param {any} defaultValue implicitní hodnota, které je vrácena v případě, že nastavení není nalezeno
     * @param {string} prefix ["Global.Pam.AppSettings"] prefix pro namespace
     */
    export function appSetting(cnt: GContent, valuename: string, defaultValue: any, prefix?: string): any;
    /**
     * Vrátí rozdíl mezi dvěma daty jako formátovaný řetězec.
     * Automaticky určí vhodný formát při zadání "auto".
     *
     * @param startDate - Počáteční datum
     * @param endDate - Koncové datum
     * @param format - Formátovací řetězec, nebo "auto" pro automatickou volbu
     * @returns Formátovaný rozdíl (např. "1d 2:30:45.123" nebo "-00:02.350")
     */
    export function dateDiffStr(startDate: Date, endDate: Date, format?: string | null): string;
    export const hhmm2minutes: (time: string | null | undefined) => number;
    export const minutes2hhmm: (minutes: number | null | undefined) => string;
    /**
     * Vypočítá rozdíl mezi dvěma časy ve formátu HH:MM a vrátí ho ve stejném formátu HH:MM.
     * @param {string | null | undefined} time1 - První časový řetězec ve formátu HH:MM (může být `null` nebo `undefined`)
     * @param {string | null | undefined} time2 - Druhý časový řetězec ve formátu HH:MM (může být `null` nebo `undefined`)
     * @returns {string} Řetězec ve formátu HH:MM představující absolutní hodnotu rozdílu mezi `time1` a `time2`.
     *          Pokud je některý z časových řetězců prázdný, `null` nebo `undefined`, vrací prázdný řetězec.
     */
    export function timeStrDiff(time1: string | null | undefined, time2: string | null | undefined): string;
    /**
     * Získání dne z datumu
     * @param {Date} datum
     * @returns {number} číslo dne 30.6.2021 => 30
     */
    export function dateDen(datum: Date): number;
    /**
    * Získání měsíce z datumu
    * @param {Date} datum
    * @returns {number} číslo měsíce 30.6.2021 => 6
    */
    export function dateMesic(datum: Date): number;
    /**
    * Získání roku z datumu
    * @param {Date} datum
    * @returns {number} číslo roku 30.6.2021 => 2021
    */
    export function dateRok(datum: Date): number;
    /**
    * Získání čísla dnes v týdnu pro zadané datum
    * @param {Date} datum
    * @returns {number} pondělí=1 neděle=7
    */
    export function dateDenTydne(datum: Date): number;
    /**
     * Vytvoření unikátního GUID
     * @returns {string}
     */
    export function CreateGuid(): string;
    /**
     * Získání indexu pro běžící operace (točítka)
     * @param {GContent} cnt content
     * @param {string} id zaregistrované ID
     * @returns {number | null}
     */
    export function operationIndex(cnt: GContent, id: string): (number | null);
    /**
     * Vrací počet rozběhnutých točítek
     * @param {GContent} cnt content
     * @returns {number}
     */
    export function operationCount(cnt: GContent): number;
    /**
     * Ukončí všechna točítka na contentu
     * @param {GContent} cnt content
     * @returns {void}
     */
    export function endAllOperations(cnt: GContent): void;
    /**
     * Start asynchronní úlohy
     * @param {GContent} cnt content odkud je úloha spuštěna
     * @param {string} classname jméno třídy např Gordic.Pam.Server.GUzaverkyAsync
     * @param {Gordic.Pam.Interface.GAsyncDataPamDto} dto řídící dto se vstupními daty processu
     * @param {string} id id, pod kterým task běží a na který reagují události
     * @param {string} textProgress [""] text točítka
     * @param {number} progress postup v progressbaru
     * @param {number} total cílová hodnota v progressbaru
     * @param {GAction | null} cancelAct [null] cancel akce, pokud není uvedena tak není k dispozici tlačítko zrušit
     */
    export function startAsync(cnt: GContent, classname: string, dto: Gordic.Pam.Interface.GAsyncDataPamDto, id: string, textProgress?: string, progress?: number, total?: number, cancelAct?: GAction | null): void;
    type Nullable<T> = T | null | undefined;
    /**
     * Obdoba databázového NVL
     * @param {Nullable<T>} data1 obecný objekt který může být null a undefined, ale měl by být stejného typu jako druhý argmument
     * @param {T} data2 implictní hodnota, které se použije v případě, že první agument je null nebo undefined
     * @returns {T}
     */
    export function NVL<T>(data1: Nullable<T>, data2: T): T;
    /**
     * Sestavení poznámky
     * @param {string} text
     * @returns {string} např. Blabla dd.MM.yyyy v hh:mm
     */
    export function sestavPoznamku(text: string): string;
    /**
     * Úprava menu
     * @param {MenuParams[]} originalMenu Původní menu
     * @param {string[]} removeItems Pole názvu akcí, které v menu nechci
     * @param {MenuParams[]} addItems Pole přidávaných položek menu
     * @returns {MenuParams[]}
     */
    export function upravMenu(originalMenu: MenuParams[], removeItems: string[], addItems: MenuParams[]): MenuParams[];
    /**
     * Nalezení indexu položky menu podle jména akce
     * @param {MenuParams[]} menu
     * @param {string} name
     * @returns {number} -1 pokud nebylo nalezeno, jinak index
     */
    export function findIndexActionByNameInMenu(menu: MenuParams[], name: string): number;
    /**
     * Provede hluboké sloučení objektu `source` do objektu `target`.
     * Modifikuje pouze `target`, ale ne jeho objekty a pole.
     * @param {any} target - Cílový objekt, do kterého se budou sloučovat hodnoty.
     * @param {any} source - Zdrojový objekt, jehož hodnoty se budou sloučovat do cílového objektu.
     * @param {WeakMap} [seen=new WeakMap()] - Pomocná struktura pro detekci cyklických referencí.
     * @returns {any} - Sloučený objekt.
     */
    export function DeepMerge(target: any, source: any, seen?: WeakMap<object, any>): any;
    /**
     * Prohledá libovolně zanořený objekt a vrátí seznam cest,
     * které odpovídají hledanému textu. Umí hledat:
     *  - v hodnotách,
     *  - v názvech klíčů,
     *  - nebo v obojím (podle parametru `mode`).
     *
     * Cesta je reprezentována jako pole klíčů vedoucí k místu, kde
     * byla nalezena shoda.
     *
     * @param obj - Procházený objekt (může být libovolně hluboký)
     * @param target - Hledaný text
     * @param mode - Určuje, kde se má hledat: "value" | "key" | "both"
     * @param currentPath - Interní parametr pro rekurzi (nevyplňovat)
     * @returns Pole cest; každá cesta je pole stringů
     *
     * @example
     * const data = {
     *   user: { name: "Alice" },
     *   meta: { tag: "target" },
     *   list: [{ label: "ignore" }, { label: "target" }]
     * };
     *
     * // Hledání v hodnotách:
     * findPaths(data, "target", "value");
     * // → [
     * //   ["meta", "tag"],
     * //   ["list", "1", "label"]
     * // ]
     *
     * // Hledání v názvech klíčů:
     * findPaths(data, "name", "key");
     * // → [
     * //   ["user", "name"]
     * // ]
     */
    export function findPaths(obj: any, target: string, mode?: "value" | "key" | "both", currentPath?: string[]): string[][];
    /**
     * Převod čísla na textovou hodnotu prezentující barvu
     * @param {number} val hodnota
     * @returns {"neutral" | "negative" | "positive"} řetezec "neutral" pro 0,  "negative" pro < 0, jinak "positive"
     */
    export function Number2ChartMeaning(val: number): "neutral" | "negative" | "positive";
    /**
     * Vytvoření datumu
     * @param {number} mesic měsíc
     * @param {number} den den
     * @param {number} rok rok
     * @returns {Date} datum
     */
    export function MDY(mesic: number, den: number, rok: number): Date;
    /**
     * Porovnání datumů
     * @param {Date | null | undefined} date1 první datum
     * @param {Date | null | undefined} date2 druhé datum
     * @returns {boolean} Pokud datumy jsou shodné, pak true, jinak false. Pokud jedno z dat je null nebo undefined, pak false
     */
    export function DatesEquality(date1: Date | null | undefined, date2: Date | null | undefined): boolean;
    /**
     * Vrací datum Velikonoční neděle pro daný rok - Slavnost Zmrtvýchvstání Páně
     * @param {number} year Rok
     * @returns {Date}
     */
    export function velikonocniNedele(year: number): Date;
    /**
     * Zjistí, zdali je zadaný datum svátkem v ČR
     * @param {JsonDate | Date | undefined | null} input Datum
     * @returns {boolean}
     */
    export function jeSvatek(input: JsonDate | Date | undefined | null): boolean;
    /**
     * Zjistí, zdali je zadaný datum svátkem v ČR
     * @param {number} den Den
     * @param {number} mesic Měsíc
     * @param {number} rok Rok
     * @returns {boolean}
     */
    export function jeSvatekDMY(den: number, mesic: number, rok: number): boolean;
    /**
     * Odstranění diakritiky
     * @param {string} str řetězec s češtinou
     * @returns {string} řetězec bez diaktritky
     */
    export function strBezDiakritiky(str: string): string;
    /**
     * Získání řetězce malými písmeny
     * @param {string} str řetězec
     * @returns {string} řetězec malými písmeny
     */
    export function strLower(str: string): string;
    /**
    * Získání řetězce velkými písmeny
    * @param {string} str řetězec
    * @returns {string} řetězec velkými písmeny
    */
    export function strUpper(str: string): string;
    /**
    * Převod závažnosti na text
    * @param {number | null | undefined} zavaznost závažnost
    * @returns {string}
    */
    export function zavaznost2txt(zavaznost: number | null | undefined): string;
    /**
     * Vyhození informace o úspěšném zpracování
     * @param {GContent} cnt gcontent
     * @param {string} text text
     * @param {string} title [""] titulek
     * @param {string} id [""]
     * @returns {string} Zadané id nebo idToastGUID
     */
    export function notifySuccess(cnt: GContent, text: string, title?: string, id?: string): string;
    /**
     * Vyhození informace o neúspěšném zpracování
     * @param {GContent} cnt gcontent
     * @param {string} text text
     * @param {string} title [""] titulek
     * @param {string} id [""]
     * @returns {string} Zadané id nebo idToastGUID
     */
    export function notifyError(cnt: GContent, text: string, title?: string, id?: string, showToast?: boolean): string;
    /**
     * Flash jako varování
     * @param {GContent} cnt gcontent
     * @param {string} text text
     * @returns {void}
     */
    export function showFlashWarning(cnt: GContent, text: string): void;
    /**
     * Flash jako chyba
     * @param {GContent} cnt gcontent
     * @param {string} text text
     * @returns {void}
     */
    export function showFlashError(cnt: GContent, text: string): void;
    /**
     * Flash jako úspěch
     * @param {GContent} cnt gcontent
     * @param {string} text text
     * @returns {void}
     */
    export function showFlashSuccess(cnt: GContent, text: string): void;
    /**
     * Flash jako informace
     * @param {GContent} cnt gcontent
     * @param {string} text text
     * @returns {void}
     */
    export function showFlashInfo(cnt: GContent, text: string): void;
    /**
     * Flash - zrušení všech
     * @param {GContent} cnt gcontent
     * @returns {void}
     */
    export function hideFlashAll(cnt: GContent): void;
    /**
    * Vytvoření pole čísel v daném rozsahu s danou velikostí kroku
    * @param {number} from začáteční číslo
    * @param {number} to koncové číslo
    * @param {number} step velikost kroku
    * @returns {number[]}
    * @example range(0, 9, 2); //=> [0, 2, 4, 6, 8]
    * @example range(0, 10, 1); //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    * @example range(3, 0, -1); //=> [3, 2, 1, 0]
    */
    export const range: (from: number, to: number, step: number) => number[];
    /**
     * Náhrada Object.entries()
     * @param {any} obj
     * @example
     * const obj = { foo: 'bar', baz: 42 }
     * getEntries(obj)
     * // [ ['foo', 'bar'], ['baz', 42] ]
     * @param {any} obj
     * @returns {any[][]} pole polí
     * @author rdusek
     */
    export function getEntries(obj: any): any[][];
    /**
     * Regulární výraz pokrývající formát počtu dnů
     * @param {FORMAT_POCET_DNI} format počtu dní
     * @returns {RegExp}
     * @author zmolik
     */
    export function regexprPocDniFormat(format: FORMAT_POCET_DNI): RegExp;
    /**
    * Převod řetězce zadaného uživatelem na číslo použitelné pro políčka poc_dni
    * @param {string} vstup zadaný řetězec například 08:45
    * @param {FORMAT_POCET_DNI} format   formát FORMAT_POCET_DNI
    * @returns {number}
    * @author zmolik
    */
    export function Str2PocDni(vstup: string, format: FORMAT_POCET_DNI): number;
    /**
    * Naformátování čísla prezentují počet dní (poc_dni) na řetězec podle požadovaného formátu
    * @param {number} poc_dni poc_dni
    * @param {FORMAT_POCET_DNI} format  formát FORMAT_POCET_DNI
    * @returns {string}
    * @author zmolik
    */
    export function PocDni2Str(poc_dni: number, format: FORMAT_POCET_DNI): string;
    /**
     * Regulární výraz pokrývající formát počtu hodin
     * @param {FORMAT_POCET_HODIN} format formát počtu hodin
     * @returns {RegExp} RegExp
     * @author mmoravci
     */
    export function regexprPocHodinFormat(format: FORMAT_POCET_HODIN): RegExp;
    /**
     * Převod řetězce zadaného uživatelem na číslo použitelné pro políčka poc_hodin
     * @param {string} vstup  Zadaný řetězec, například "08:45", "176.0", "-7.5"
     * @param {FORMAT_POCET_HODIN} format Formát, např. "hh:mm", "-hhh:mm"
     * @returns {number} Počet hodin jako číslo
     * @author mmoravci
     * @updated 2025-06-04 by ZMOLIK – přidána podpora čistého čísla (např. "176.00")
     */
    export function Str2PocHodin(vstup: string, format: FORMAT_POCET_HODIN): number;
    /**
     * Naformátování čísla prezentujícího počet minut (hod*60)+min na řetězec HH:MM
     * @param {number | string} poc_minIn - Počet hodin jako číslo nebo řetězec, který bude převeden na číslo
     * @returns {string} Naformátovaný čas jako řetězec
     * @author jkokes
     */
    export function PocMin2hhmmStr(poc_minIn: number): string;
    /**
     * Převod řetězce ve formátu HH:MM na celkový počet minut Hod*60 + Min
     * @author jkokes
     * @param hhmm řetězec ve formátu HH:MM
     * @returns {number} Celkový počet minut
     */
    export function ParseHHMMstr2PocMin(hhmm: string): number;
    /**
     * Naformátování čísla prezentujícího počet hodin na řetězec podle požadovaného formátu
     * @param {number | string} poc_hodinIn - Počet hodin jako číslo nebo řetězec, který bude převeden na číslo
     * @param {FORMAT_POCET_HODIN} format - Formát výstupu (např. "hh:mm", "-hhh:mm", apod.)
     * @param {boolean} [zobrazovatNulyPriPrazdnu=false] - Volitelný parametr, který v případě nulového vstupu určuje, zda mají vracet samé 0  (např. 00:00 u formátu hh:mm). Při false vrací prázný řetězec.
     * @returns {string} Naformátovaný čas jako řetězec
     * @author mmoravci
     * @updated 2025-06-04 by ZMOLIK - optimalizace a oprava typů
     */
    export function PocHodin2Str(poc_hodinIn: number | string | null, format: FORMAT_POCET_HODIN, zobrazovatNulyPriPrazdnu?: boolean): string;
    /**
    * Normalizuje časový řetězec do formátu M:SS.
    *
    * - Odstraní úvodní nuly z minut
    * - Zajistí, že sekundy mají vždy dva znaky
    * - Očekává vstup ve formátu "minuty:sekundy"
    *
    * @param t Čas jako řetězec (např. "002:15", "000:5")
    * @returns Normalizovaný čas (např. "2:15", "0:05")
    *
    * @example
    * normalizeTimeHHMM("002:15"); // "2:15"
    * normalizeTimeHHMM("000:5");  // "0:05"
    */
    export function normalizeTimeHHMM(t: string): string;
    /**
     * Vygeneruje náhodné číslo
     * @param {number} min minimum
     * @param {number} max maximum
     * @returns {number}
     */
    export function nahodneCislo(min: number, max: number): number;
    /**
     * Generování náhodného rodného čísla
     * @returns {string}
     */
    export function nahodneRC(): string;
    /**
     * Převod rodného čísla zadaného řetězce na datum
     * @param {string} birthNumber vstupní řetězec
     * @returns {Date | null} datum pokud se zdaří nebo null pokud se nepořadí
     */
    export function RodneCislo2Datum(birthNumber: string): Date | null;
    export const LOG: (cmd: string) => void;
    /**
     * Šablona pro vytvoření traceru, který umožňuje logování zpráv s podporou serializace objektů.
     * Pokud je některý z argumentů typu `object`, je serializován pomocí funkce `stringifyObj`.
     * Výstupní zpráva je formátována a může být logována do konzole, pokud je logování povoleno.
     *
     * @param {Gordic.Diagnostics.GLog} tracer - Instance traceru, která se použije pro logování zpráv.
     * @returns {(...args: any[]) => void} - Funkce, která přijímá libovolný počet argumentů, zpracuje je a předá traceru.
     *
     * @example
     * // Příklad 1: Logování jednoduché zprávy
     * const tracer = new Gordic.Diagnostics.GLog({ name: "TestTracer", fileName: "test.ts" });
     * const trace = trace_template(tracer);
     * trace(100, "Test message");
     * // Výstup v konzoli (pokud je logování povoleno):
     * // #LOG:test.ts 12:34:56,789: [100]: Test message
     *
     * @example
     * // Příklad 2: Logování objektu
     * const dto = { key: "value", nested: { innerKey: "innerValue" } };
     * trace(200, "Logging object", dto);
     * // Výstup v konzoli (pokud je logování povoleno):
     * // #LOG:test.ts 12:34:56,789: [200]: Logging object {"key":"value","nested":{"innerKey":"innerValue"}}
     *
     * * @example
     * // Příklad 3: Logování objektu
     * const obj1 = { key1: "value1" };
     * trace(300, `Logging object ${stringifyObj(obj1)}`);
     * // Výstup v konzoli (pokud je logování povoleno):
     * // #LOG:test.ts 12:34:56,789: [300]: `Logging object: {"key1":"value1"} and {"key2":"value2"}
     */
    export function trace_template(tracer: Gordic.Diagnostics.GLog): (...args: any[]) => void;
    /**
    *  helper pro debugování async funkcí přes console
    * @example
    *  Gordic.Pam.debugAwait(Gordic.Pam.konfigurace, "GVykazVykonu", "povolNahled", "15")
    */
    export function debugAwait<T>(asyncFn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T>;
    /**
    * Převede řetězec o maximálně 4 znacích na formát času HH:MM.
    *
    * @param {string} input - Vstupní řetězec, který představuje čas v hodinách a minutách.
    *                Může mít délku od 1 do 4 znaků:
    *                - 1 znak: Představuje minuty, hodiny jsou "00".
    *                - 2 znaky: Představuje minuty, hodiny jsou "00".
    *                - 3 znaky: První znak je hodina, další dva znaky jsou minuty.
    *                - 4 znaky: První dva znaky jsou hodiny, další dva znaky jsou minuty.
    *                - Pokud je vstup delší než 4 znaky, bude oříznut na prvních 4 znaky.
    *
    * @returns {string} Formátovaný čas ve formátu HH:MM.
    */
    export function formatHHMMtxt(input: string): string;
    /**
     * Validuje, že objekt obsahuje všechny položky uvedené ve schématu,
     * a že jejich typ odpovídá.
     *
     * - Typy se zadávají jako stringy: "string", "number?", "array", ...
     * - Suffix "?" znamená, že hodnota může být `null`.
     * - Objekt smí obsahovat další (neznámé) vlastnosti.
     *
     * @param obj     Objekt ke kontrole.
     * @param schema  Schéma: { klíč: "typ" | "typ?" }
     * @returns       true, pokud objekt splňuje schéma.
     */
    export function validateStructure(obj: any, schema: Record<string, string>): boolean;
    /**
     * Zjistí typ proměnné v runtime.
     *
     * Rozpoznává:
     * - základní primitivy: string, number, boolean
     * - specializované stringy: jsonDate (platné ISO datum)
     * - funkce,
     * - složené typy: Error, GError, GServerError, Date, Decimal, Promise, jQueryPromise, pole
     * - struktury: IGExceptionInfoMinimal, IGExceptionInfo, GSplResultDto, GReportGenerateAsyncRejection
     * - null, undefined, nebo fallback: unknown
     *
     * @param obj – cokoliv
     * @returns typ v podobě stringu
     */
    /**
 * Zjistí typ proměnné v runtime.
 */
    export function objectType(obj: any): "string" | "number" | "boolean" | "function" | "promise" | "jQueryPromise" | "date" | "jsonDate" | "decimal" | "array" | "GError" | "Error" | "GServerError" | "IGExceptionInfoMinimal" | "IGExceptionInfo" | "GSplResultDto" | "GReportGenerateAsyncRejection" | "object" | "null" | "undefined" | "unknown";
    /**
     * Převod desetininného čísla na řězec HH:MM
     * @param {number} decimalHours číslo
     * @returns {string} řětězec
     */
    export function num2HHMM(decimalHours: number): string;
    export function toggleVisibility(elements: JQuery<HTMLElement>[], show: boolean): void;
    export const getSectionElements: (section: JQuery<HTMLElement>) => {
        row: (name: string) => JQuery<HTMLElement>;
        field: (name: string) => JQuery<HTMLElement>;
    };
    /**
     * Filtrovací funkce pro prohledávání objektů podle specifikovaných sloupců a hledaného řetězce.
     *
     * @param {Array<{ [key: string]: any }>} data - Pole objektů, kde každý objekt má libovolné klíče a hodnoty různého typu (string, number, Date, boolean, atd.).
     * @param {string[] | "*" | undefined} prohledavaneSloupce - Seznam sloupců, které chceme prohledávat (pole stringů), nebo "*" pro všechny sloupce, případně `undefined` (které se interpretuje jako "*").
     * @param {string} hledanyRetezec - Řetězec, který chceme vyhledat v hodnotách uvedených sloupců. Funkce porovnává textové hodnoty (včetně čísel převedených na string).
     *
     * @returns {Array<{ [key: string]: any }>} - Pole objektů, které obsahují hodnoty odpovídající hledanému řetězci ve specifikovaných sloupcích.
     */
    /**
    * Filtrovací funkce pro prohledávání objektů podle specifikovaných sloupců a hledaného řetězce,
    * s možností nastavit citlivost na velikost písmen (case sensitivity) a ignorování diakritiky.
    *
    * @param {Array<{ [key: string]: any }>} data - Pole objektů, kde každý objekt má libovolné klíče a hodnoty různého typu (string, number, Date, boolean, atd.).
    * @param {string[] | "*" | undefined} prohledavaneSloupce - Seznam sloupců, které chceme prohledávať (pole stringů), nebo "*" pro všechny sloupce, případně `undefined` (které se interpretuje jako "*").
    * @param {string} hledanyRetezec - Řetězec, který chceme vyhledat v hodnotách uvedených sloupců. Funkce porovnává textové hodnoty (včetně čísel převedených na string).
    * @param {boolean} [caseSensitive=false] - Určuje, zda bude vyhledávání citlivé na velikost písmen. Výchozí je `false` (necitlivé na velikost písmen).
    * @param {boolean} [ignoreDiacritics=true] - Určuje, zda bude vyhledávání ignorovat diakritiku. Výchozí je `true` (ignoruje diakritiku).
    * @param {boolean} [partialMatch=true] - Určuje způsob porovnávání: `true` = hledaný řetězec může být částí hodnoty (100 najde 1000), `false` = hodnota může být částí hledaného řetězce (1000 najde 100).
    *
    * @returns {Array<{ [key: string]: any }>} - Pole objektů, které obsahují hodnoty odpovídající hledanému řetězci ve specifikovaných sloupcích.
    */
    export function filterDataByColumns(data: Array<{
        [key: string]: any;
    }>, prohledavaneSloupce: string[] | "*" | undefined, hledanyRetezec: string | Array<{
        [key: string]: any;
    }> | {
        [key: string]: any;
    }, caseSensitive?: boolean, ignoreDiacritics?: boolean, partialMatch?: boolean): Array<{
        [key: string]: any;
    }>;
    /**
     * Filtruje pole objektů (nebo jeden objekt) podle přesné shody hodnot zadaného filtru.
     * provádí přesnou (===) shodu, tedy např. číslo 5 a string "5" se neshodují.
     *
     * @param data - vstup
     * @param filter - filtr
     * @returns Pole odpovícdajících objektů
     
     */
    export function filterDataExact<T extends Record<string, any>>(data: T | T[], filter: Partial<T>, prefabName?: string): T[];
    /**
     * Vyvoří navigátor
     * @param content
     */
    export function CreateOutline(content: GContent): void;
    /**
    * Ziskani property z objektu s moznosti defaultu
    * @author Tomáš Vitek
    */
    export function TryGetValueDef(Obj: any, Prop: string, Def?: any): any;
    /**
     * Funkce pro zaokrouhlování čísel podle zadaného způsobu a jednotky - přepis databázové fn_pam_zaokrouhli
     * @param ipCislo - číslo k zaokrouhlení
     * @param ipJednotka - jednotka zaokrouhlení (např. 5, 10, 100, 0.01, 0.1)
     * @param ipZpusobZaokr - způsob zaokrouhlení:
     *   - 'up' | 'nahoru': zaokrouhlí vždy nahoru na nejbližší vyšší násobek jednotky
     *   - 'down' | 'dolu': zaokrouhlí vždy dolů na nejbližší nižší násobek jednotky
     *   - 'math' | 'matematicky': matematické zaokrouhlení (0.5 a více nahoru, méně než 0.5 dolů)

     * @returns zaokrouhlené číslo
     * @author ZMOLIK
     * @date 2025-06-04
     *
     * @example
     * // Zaokrouhlení na celé desítky
     * zaokrouhli(127, 10, "up")    // 130 - zaokrouhlí nahoru na nejbližší desítku
     * zaokrouhli(127, 10, "down")  // 120 - zaokrouhlí dolů na nejbližší desítku
     * zaokrouhli(127, 10, "math")  // 130 - matematické zaokrouhlení na nejbližší desítku
     *
     * @example
     * // Zaokrouhlení na pětky
     * zaokrouhli(23.7, 5, "up")    // 25 - zaokrouhlí nahoru na nejbližší pětku
     * zaokrouhli(23.7, 5, "down")  // 20 - zaokrouhlí dolů na nejbližší pětku
     * zaokrouhli(23.7, 5, "math")  // 25 - matematické zaokrouhlení na nejbližší pětku
     *
     * @example
     * // Zaokrouhlení na dvě desetinná místa (setiny)
     * zaokrouhli(3.14159, 0.01, "up")    // 3.15 - zaokrouhlí nahoru na setiny
     * zaokrouhli(3.14159, 0.01, "down")  // 3.14 - zaokrouhlí dolů na setiny
     * zaokrouhli(3.14159, 0.01, "math")  // 3.14 - matematické zaokrouhlení na setiny
     *
     * @example
     * // Zaokrouhlení na jedno desetinné místo (desetiny)
     * zaokrouhli(2.567, 0.1, "up")    // 2.6 - zaokrouhlí nahoru na desetiny
     * zaokrouhli(2.567, 0.1, "down")  // 2.5 - zaokrouhlí dolů na desetiny
     * zaokrouhli(2.567, 0.1, "math")  // 2.6 - matematické zaokrouhlení na desetiny
     *
     * @example
     * // Záporná čísla (směr zaokrouhlování se obrací)
     * zaokrouhli(-23.7, 5, "up")      // -20 - pro záporná čísla se "up" chová jako "down"
     * zaokrouhli(-23.7, 5, "down")    // -25 - pro záporná čísla se "down" chová jako "up"
     * zaokrouhli(-2.567, 0.01, "up")  // -2.56 - zaokrouhlení záporného čísla na setiny
     *
     * @example
     * // Již zaokrouhlená čísla se nezmění
     * zaokrouhli(20, 5, "up")     // 20 - číslo je již násobkem 5
     * zaokrouhli(3.14, 0.01, "up") // 3.14 - číslo je již na setiny
     */
    export function zaokrouhli(ipCislo: number, ipJednotka: number, ipZpusobZaokr: 'up' | 'nahoru' | 'down' | 'dolu' | 'math' | 'matematicky'): number;
    /**
    * Spustí zadanou asynchronní operaci pouze tehdy, pokud ještě žádná jiná právě neprobíhá.
    * Používá externí příznak (loading flag), kterým hlídá, jestli je operace již spuštěna.
    *
    * @template T - Typ návratové hodnoty z asynchronní operace.
    * @param loadingFlag - Objekt obsahující boolean hodnotu ve vlastnosti `value`,
    *                      která určuje, zda operace právě probíhá (true) nebo ne (false).
    *                      Tento objekt je sdílený mezi voláními funkce.
    * @param operation - Funkce vracející Promise<T>, tedy asynchronní operace, která se má spustit.
    *
    * @returns Promise<T> - Výsledek operace, pokud je spuštěna, nebo odmítnutý Promise, pokud už nějaká běží.
    */
    export function executeIfNotLoading<T>(loadingFlag: {
        value: boolean;
    }, operation: () => Promise<T>): Promise<T>;
    /**
     * Náhrada za  `waitForValues` - čeká na hodnoty ve formuláři.
     * @param form
     * @returns sesbírané hodnoty z políček ve formuláři.
     */
    export function waitForValues(form: JQuery<HTMLElement>): Promise<Record<string, any>>;
    /**
    * Zjistí, zda je objekt v dané oblasti povolen nebo jeho hodnotu
    * vrácená hodnota závisí na typu dat nebo vnitřní logice
    *
    * nezaměňovat s settings, který se po celou dobu aplikace nemění
    *
   * @param oblast Oblast
   * @param nazev Název objektu - bližsí specifikace v dané oblasti
   * @param sxs1 volitelný parametr sxs1
   * @param sxs2 volitelný parametr sxs2
   * @param sxs3 volitelný parametr sxs3
   * @returns číslo nebo null při chybě
   */
    export function konfigurace(oblast: string, nazev: string, sxs1?: string, sxs2?: string, sxs3?: string): Promise<string | null>;
    /** převod čísla z hodin a minut (HOD_MIN = (HOD * 60) + MIN) na řetězec HH:MM*/
    export function numtoHHMM(hodMinNum: number): string;
    /** převod čísla z řetězce HH:MM na číslo HOD_MIN = (HOD * 60) + MIN */
    export function HHMMtonum(hhmm: string): number;
    export {};
}
/**
 * Styly PAM  -  typicky řádky gridu
 */
declare namespace Gordic.Pam {
    class Styles {
        static readonly center = "center";
        static readonly zaporna_cisla = "g-state-text g-state-important ";
        static readonly aktivita500 = "g-state-text g-state-info ";
        static readonly aktivita600 = "g-state-text g-state-warning ";
        static readonly aktivita900 = "g-state-text g-state-important ";
        static readonly neaktivni_radek = "ui-disabled g-row-italic ";
        static readonly povinny_kch = "g-state-text g-state-important ";
        static readonly ucetni_profil_readonly = "ui-disabled ";
        static readonly readonly = "ui-disabled ";
        static readonly chybejici_vaj_pracoviste = "g-state-background g-state-error ";
        static readonly vypoctena_slozka_zpetna_modra = "g-state-background g-state-info ";
        static readonly vypoctena_slozka_rozdilova_zelena = "g-state-background g-state-success ";
        static readonly pracovni_doba_pracovni_den = "ui-disabled g-row-italic ";
        static readonly pracovni_doba_svatek = "ui-disabled g-row-italic g-state-text g-state-important ";
        static readonly ppp_dash_board_nevyrizene = "ui-disabled g-state-text g-state-important ";
        static readonly ppp_dochazka_vyneti = "ui-disabled g-row-italic g-state-inactive ";
        static readonly ppp_vykaz_vikendove_dny = "g-state-text g-state-important ";
        static readonly ppp_vykaz_svatek: string;
        static readonly debug = "g-state-lightbackground g-state-text g-state-success ";
        static readonly chyba_radek = "g-state-text g-state-error ";
    }
}
/**
 * Zapouzdření datových typů pro manipulaci s daty
 */
declare namespace Gordic.Pam {
    /**
     * Definice metod pro získání nebo manipulaci s daty
     */
    interface IPamDataType {
        IslObject: string;
        MethodList?: string;
        MethodRead?: string;
        MethodCreate?: string;
        MethodUpdate?: string;
        MethodDelete?: string;
        MethodKnt?: string;
        MethodAccessToken?: string;
        MessageBeginOperation: string;
        InsertTitle?: string;
        EditTitle?: string;
        DeleteTitle?: string;
        HistoryTitle?: string;
        dataKey?: string;
    }
    class DataType {
        static MethodListDefault: string;
        static MethodReadDefault: string;
        static MethodCreateDefault: string;
        static MethodUpdateDefault: string;
        static MethodDeleteDefault: string;
        static MethodKntDefault: string;
        static MethodAccessToken: string;
        static InsertTitleDefault: string;
        static EditTitleDefault: string;
        static DeleteTitleDefault: string;
        static HistoryTitleDefault: string;
        /**
        * Odkazy pro modul PPP
        * @returns Data object
        */
        static get OdkazyPPP(): IPamDataType;
        /**
       * Role  pro modul PPP
       * @returns Data object
       */
        static get RolePPP(): IPamDataType;
        /**
        * Osobní údaje pro modul PPP
        * @returns Data object
        */
        static get UdajeEsuPPP(): IPamDataType;
        /**
          * údaje vztahující se k PPV pro modul PPP
            * @returns Data object
        */
        static get UdajePpvPPP(): IPamDataType;
        /**
          * údaje vztahující se k PAM pro modul PPP
            * @returns Data object
        */
        static get UdajePamPPP(): IPamDataType;
        /**
        * Požadavky PPP
        * @returns Data object
        */
        static get Pozadavky(): IPamDataType;
        /**
        * Podřízení zaměstnanci
        * @returns Data object
        */
        static get Podrizeni(): IPamDataType;
        /**
        * Rozpis pracovní doby
        * @returns Data object pro rozpis pracovní doby
        */
        static get RozpisPracovniDobyPpv(): IPamDataType;
        /**
        * Zdravotní pojištění osoby
        * @returns Data object pro Zdravotní pojištění osoby
        */
        static get ZdravotniPojisteniOsoby(): IPamDataType;
        /**
        * Kontrola osoby - původní verze
        * @returns Data object PAM
        */
        static get KontrolniChod(): IPamDataType;
        /**
        * Vypočtená složka mzdy
        * @returns Data object PAM
        */
        static get VypoctenaSlozka(): IPamDataType;
        /**
        * Podklady průměrů
        * @returns Data object PAM
        */
        static get PrumerPodklad(): IPamDataType;
        /**
        * Průměry
        * @returns Data object PAM
        */
        static get Prumer(): IPamDataType;
        /**
        * Vypočtené průměry
        * @returns Data object PAM
        */
        static get PrumerVypocteny(): IPamDataType;
        /**
        * Zapsané průměry
        * @returns Data object PAM
        */
        static get PrumerZapsany(): IPamDataType;
        /**
        * Pracovně právní vztahy PAM
        * @returns Data object
        */
        static get PpvPAM(): IPamDataType;
        /**
        * Změny pracovního poměru
        * @returns Data object
        */
        static get ZmenaPpv(): IPamDataType;
        /**
        * MesicniZmenaPAM
        * @returns Data object
        */
        static get MesicniZmenaPAM(): IPamDataType;
        /**
        * UzaverkaPAM
        * @returns Data object
        */
        static get UzaverkaPAM(): IPamDataType;
        /**
        * AdresaPAM
        * @returns Data object
        */
        static get AdresaPAM(): IPamDataType;
        /**
        * PracovistePAM
        * @returns Data object
        */
        static get PracovistePAM(): IPamDataType;
        /**
        * OsobaBlizkaPER
        * @returns Data object
        */
        static get OsobaBlizkaPER(): IPamDataType;
        /**
        * PredchoziPraxePER
        * @returns Data object
        */
        static get PredchoziPraxePER(): IPamDataType;
        /**
        * Personální údaj
        * @returns Data object
        */
        static get PersonalniUdaje(): IPamDataType;
        /**
        * Personální údaj
        * @returns Data object
        */
        static get RozsirujiciUdajePpv(): IPamDataType;
        /**
        * Důchod
        * @returns {IPamDataType} Konfigurace datového typu pro důchody osoby, využívaná při manipulaci s daty v PAM.
        */
        static get Duchod(): IPamDataType;
        /**
        * Zastavení výplaty důchodu
        * @returns {IPamDataType} Konfigurace datového typu zastavení výplaty důchodu, využívaná při manipulaci s daty v PAM.
        */
        static get DuchodZastaveniVyplaty(): IPamDataType;
        /**
        * Projekty
        * @returns Data object
        */
        static get Projekty(): IPamDataType;
        /**
        * Cvičení
        * @returns Data object
        */
        static get Cviceni(): IPamDataType;
        /**
        * Mise
        * @returns Data object
        */
        static get Mise(): IPamDataType;
        /**
        * Změny mise
        * @returns Data object
        */
        static get MiseZmeny(): IPamDataType;
        /**
        * Změny dohod
        * @returns Data object
        */
        static get DohodaZmeny(): IPamDataType;
        /**
        * Osobní údaje
        * @returns Data object
        */
        static get OsobniUdaje(): IPamDataType;
        /**
        * Nks
        * @returns Data object
        */
        static get Nks(): IPamDataType;
        /**
        * Měsíční odpočet
        * @returns Data object
        */
        static get OdpoctyMesicni(): IPamDataType;
        /**
        * Roční odpočet
        * @returns Data object
        */
        static get OdpoctyRocni(): IPamDataType;
        /**
        * Osoba ESP
        * @returns Data object
        */
        static get OsobaESP(): IPamDataType;
        /**
        * Osoba ESP - evidenční PPV
        * @returns Data object
        */
        static get OsobaEspEPP(): IPamDataType;
        /**
        * Osoba PAM
        * @returns Data object
        */
        static get OsobaPAM(): IPamDataType;
        /**
        * Navázaná osoba PAM
        * @returns Data object
        */
        static get NavazanaOsobaPAM(): IPamDataType;
        /**
        * Srážka
        * @returns Data object
        */
        static get Srazka(): IPamDataType;
        /**
        * Zadaná složka
        * @returns Data object
        */
        static get TrvalaSlozka(): IPamDataType;
        /**
        * Exekuce
        * @returns Data object
        */
        static get Exekuce(): IPamDataType;
        /**
        * Nesplacené částky exekuce
        * @returns Data object
        */
        static get ExekuceNesplaceneCastky(): IPamDataType;
        /**
        * Osoby navázané na exekuci
        * @returns Data object
        */
        static get ExekuceNavazaneOsoby(): IPamDataType;
        /**
        * Určená nezabavitelná částka
        * @returns Data object
        */
        static get ExekuceUrcenaNezabavitelnaCastka(): IPamDataType;
        /**
        * Protokol výpočtu srážek
        * @returns Data object
        */
        static get ProtokolVypoctuSrazek(): IPamDataType;
        /**
        * Způsob zdanění
        * @returns Data object
        */
        static get ZpusobZdaneni(): IPamDataType;
        /**
        * Korekce způsobu zdanění
        * @returns Data object
        */
        static get ZpusobZdaneniKorekce(): IPamDataType;
        /**
        * Administrace - Údaje organizace
        * @returns Data object
        */
        static get UdajeOrganizace(): IPamDataType;
        /**
        * Administrace - Zdravotní pojišťovny
        * @returns Data object
        */
        static get ZdravotniPojistovnyPAM(): IPamDataType;
        /**
        * Administrace - Odborové svazy
        * @returns Data object
        */
        static get OdboroveSvazy(): IPamDataType;
        /**
        * Administrace - Číselníky
        * @returns Data object
        */
        static get Ciselniky(): IPamDataType;
        /**
        * Administrace - Cizí účty
        * @returns Data object
        */
        static get UcetCizi(): IPamDataType;
        /**
        * Administrace - Vlastní účty
        * @returns Data object
        */
        static get UcetVlastni(): IPamDataType;
        /**
        * Administrace - Kontroly
        * @returns Data object
        */
        static get Kontroly(): IPamDataType;
        /**
        * Administrace - Kontroly - Kroky
        * @returns Data object
        */
        static get KontrolyKroky(): IPamDataType;
        /**
        * Administrace - Kalendář - Hlavička
        * @returns Data object
        */
        static get KalendarHlavicka(): IPamDataType;
        /**
        * Administrace - Kalendář - Dny
        * @returns Data object
        */
        static get KalendarDny(): IPamDataType;
        /**
        * Příznaky složek
        * @returns Data object
        */
        static get SlozkyPriznaky(): IPamDataType;
        /**
        * Platby osoby
        * @returns Data object
        */
        static get PlatbyOsoby(): IPamDataType;
        /**
        * Vynětí
        * @returns Data object
        */
        static get Vyneti(): IPamDataType;
        /**
        * NZŽN
        * @returns Data object
        */
        static get Nzzn(): IPamDataType;
        /**
        * NZŽN - Detail
        * @returns Data object
        */
        static get NzznDetail(): IPamDataType;
        /**
         * atributy PAM
           * @returns Data object
       */
        static get PamAtribut(): IPamDataType;
    }
}
declare namespace Gordic.Pam {
    /**
    * Zapouzdření manipulace s daty
    */
    class DataObject {
        private _content;
        private _DataObj;
        constructor(content: GContent, obj: Gordic.Pam.IPamDataType);
        /**
         * ISL objekt datového objektu
         * @returns
         */
        get IslObject(): string;
        /**
        * MessageBeginOperation
        * @returns
        */
        get MessageBeginOperation(): string;
        /**
        * Titulek pro insert záznamu
        * @returns
        */
        get InsertTitle(): string;
        /**
        * Titulek pro editaci záznamu
        * @returns
        */
        get EditTitle(): string;
        /**
        * Titulek pro editaci záznamu
        * @returns
        */
        get DeleteTitle(): string;
        /**
        * List metoda
        * @returns
        */
        get ListMethod(): string;
        /**
        * Update metoda
        * @returns
        */
        get UpdateMethod(): string;
        /**
        * Delete metoda
        * @returns
        */
        get DeleteMethod(): string;
        /**
        * Create metoda
        * @returns
        */
        get CreateMethod(): string;
        /**
        * Read metoda
        * @returns
        */
        get ReadMethod(): string;
        /**
        * Knt metoda
        * @returns
        */
        get KntMethod(): string;
        /**
        * Access token metoda
        * @returns
        */
        get AccessMethod(): string;
        /**
        * Získání dataKey
        * @returns
        */
        get dataKeyMethod(): string;
        /**
         * Access token
         * @returns {JQueryPromise<Gordic.Pam.Interface.AccessTokenPamDto>} Promise s access tokenem nebo odmítnutím při chybě.
         */
        ACT(): JQueryPromise<Gordic.Pam.Interface.AccessTokenPamDto>;
        /**
         * Read
         * @param {Gordic.Isl.GServiceReadRequest<any>} rq - Požadavek na načtení dat.
         * @returns {JQueryPromise<Object | null>} Promise s výsledkem načtení dat nebo null při chybě.
         */
        Read(rq: Gordic.Isl.GServiceReadRequest<any>): JQueryPromise<Object | null>;
        /**
        * List
        * @param { Gordic.Isl.GServiceListRequest } rq - Požadavek na načtení seznamu dat.
        * @returns { JQueryPromise<Object | null> } Promise s výsledkem načtení dat nebo null při chybě.
        */
        List(rq: Gordic.Isl.GServiceListRequest): JQueryPromise<Object | null>;
        /**
         * Insert
         * @param {Gordic.Isl.GServiceSaveRequest<any>} rq - Požadavek na vložení nového záznamu.
         * @returns {JQueryPromise<Object | null>} Promise s výsledkem vložení nebo null při chybě.
         */
        Insert(rq: Gordic.Isl.GServiceSaveRequest<any>): JQueryPromise<Object | null>;
        /**
         * Update
         * @param {Gordic.Isl.GServiceSaveRequest<any>} rq - Požadavek na aktualizaci záznamu.
         * @returns {JQueryPromise<Object | null>} Promise s výsledkem aktualizace nebo null při chybě.
         */
        Update(rq: Gordic.Isl.GServiceSaveRequest<any>): JQueryPromise<Object | null>;
        /**
         * Delete
         * @param {Gordic.Isl.GServiceSaveRequest<any>} rq - Požadavek na smazání záznamu.
         * @returns {JQueryPromise<Object | null>} Promise s výsledkem smazání nebo null při chybě.
         */
        Delete(rq: Gordic.Isl.GServiceSaveRequest<any>): JQueryPromise<Object | null>;
        /**
         * Kontrola dat
         * @param {Object} dto - Vstupní data pro operaci KNT.
         * @returns {JQueryPromise<Object | null>} Promise s výsledkem operace nebo null při chybě.
         */
        Knt(dto: Object): JQueryPromise<Object | null>;
    }
}
/**
 * Ikony PAM
 */
declare namespace Gordic.Pam {
    class Icons {
        static readonly automat = "gi-index|fa-question-circle-o gi-bgw gi-stack-pos--rt g-state-text g-state-info";
        static readonly automat_level0 = "fa-circle";
        static readonly automat_level1 = "fa-circle gi-bgw g-state-text g-state-info";
        static readonly automat_level2 = "fa-circle gi-bgw g-state-text g-state-success";
        static readonly automat_level3 = "fa-circle gi-bgw g-state-text g-state-error";
        static readonly prazdno = "gin/nic";
        static readonly neplatny = "fa-clock-o g-state-text g-state-important";
        static readonly detail_vypoctene_slozky = "gi-detail";
        static readonly detail_ppv = "fa-id-card-o";
        static readonly detail = "gi-detail";
        static readonly vyplatkovy_ppv = "fa-user";
        static readonly nevyplatkovy_ppv = "fa-user-times";
        static readonly wizard_next = "fa-long-arrow-right";
        static readonly wizard_prev = "fa-long-arrow-left";
        static readonly zpetna_modra_vslo = "fa-long-arrow-left";
        static readonly rozdilova_zelena_vslo = "fa-long-arrow-right";
        static readonly runaction = "fa-forward";
        static readonly loading = "fa-spinner fa-spin";
        static readonly private = "fa-user-secret";
        static readonly blokovaniuza = "fa-fw fa-lock";
        static readonly odemknuti_ochrany = "fa-unlock";
        static readonly new = "fa-plus";
        static readonly insert = "gi-plus";
        static readonly edit = "gi-pencil";
        static readonly update = "gi-pencil";
        static readonly save = "gi-save";
        static readonly exit = "gi-exit";
        static readonly update_popis = "gi-pencil |gi-komentar gi-bgw gi-stack-pos--rb";
        static readonly copy = "fa-copy";
        static readonly to_clipboard = "fa-clone";
        static readonly undo = "fa-undo";
        static readonly plus = "gi-plus";
        static readonly minus = "gi-minus";
        static readonly btn_obdobi_minus = "fa-arrow-left";
        static readonly btn_akt_obdobi = "gi-radio";
        static readonly btn_obdobi_plus = "fa-arrow-right";
        static readonly delete = "gi-bin";
        static readonly clear = "fa-eraser";
        static readonly priloha = "gi-attachment";
        static readonly uzaverka = "gi-suma |fa-lock gi-bgw  gi-stack-pos--rb";
        static readonly servis = "fa-wrench g-state-text g-state-important";
        static readonly important = "fa-exclamation";
        static readonly veryimportant = "gi-exclam g-state-text g-state-important";
        static readonly success = "fa-check g-state-text g-state-success";
        static readonly success_zalohy = "fa-check g-state-text g-state-info";
        static readonly tecka = "gi-radio";
        static readonly fullscreen = "fa-arrows-alt";
        static readonly upload = "fa-cloud-upload";
        static readonly download = "fa-cloud-download";
        static readonly downloadPDF = "fa-file-pdf-o|fa-download gi-stack-fw gi-stack-pos--rb g-state-text g-state-info";
        static readonly downloadXML = "fa-file-code-o|fa-download gi-stack-fw gi-stack-pos--rb g-state-text g-state-info";
        static readonly downloadGFRM = "gi-gfrm|fa-download gi-stack-fw gi-stack-pos--rb g-state-text g-state-info";
        static readonly epriloha = "gi-eattachment";
        static readonly download2 = "gi-download";
        static readonly error = "fa-exclamation-triangle g-state-text g-state-error";
        static readonly varovani = "fa-exclamation-triangle g-state-text g-state-warning";
        static readonly informace = "gi-info g-state-text g-state-info";
        static readonly dialog_error = "fa-exclamation-triangle g-state-text g-state-error fa-4x dialog-icon";
        static readonly dialog_varovani = "fa-exclamation-triangle g-state-text g-state-warning fa-4x dialog-icon";
        static readonly dialog_informace = "gi-info g-state-text g-state-info fa-4x dialog-icon";
        static readonly dialog_error_detail = "gin/nic";
        static readonly aktualni_nevyplatkovy = "gi-exclam g-state-text g-state-important";
        static readonly aktualizovat = "gi-refresh";
        static readonly tisk = "gi-print";
        static readonly tisk_nahled = "gi-nahled";
        static readonly kch = "gi-ekg |gi-suma gi-stack-pos--rb";
        static readonly kontroly_info = "gi-info";
        static readonly on = "fa-toggle-on";
        static readonly off = "fa-toggle-off";
        static readonly zatrzeno = "gi-check";
        static readonly nezatrzeno = "gi-uncheck";
        static readonly notimplemented = "gi-prep g-state-text g-state-important";
        static readonly inprogress = "gi-prep g-state-text g-state-warning";
        static readonly zda = "fa-medkit g-state-text g-state-warning";
        static readonly log_cistka = "gi-list |gi-koste gi-bgw gi-stack-pos--rt g-state-text g-state-important";
        static readonly log_download = "gi-list |gi-download gi-bgw--rect gi-stack-pos--rt g-state-text g-state-favorite";
        static readonly ucetni_profil = "fa-calculator";
        static readonly calculator_ESP = "fa-calculator";
        static readonly prepocet_vyuctovani = "gi-suma";
        static readonly prepocet_zaloh = "gi-generate |gi-suma gi-stack-pos--rb";
        static readonly prumery = "gi-prumer";
        static readonly vypocitatPrumery = "gi-prumer|gi-suma gi-stack-pos--rb";
        static readonly zapsatPrumery = "gi-prumer|gi-pencil gi-stack-pos--rb";
        static readonly kod = "fa-barcode";
        static readonly poznamka = "fa-sticky-note-o";
        static readonly zpusobVypoctuZp = "fa-heart-o gi-bgw gi-stack-pos--rb gi-stack-fw|fa-id-card-o";
        static readonly zpusobVypoctuSp = "fa-user-o gi-bgw gi-stack-pos--rb gi-stack-fw|fa-id-card-o";
        static readonly zpusobVypoctuZp2 = "fa-id-card-o fa-stack-bg|fa-heart-o gi-bgw";
        static readonly zpusobVypoctuSp2 = "fa-id-card-o fa-stack-bg|fa-user-o gi-bgw";
        static readonly rozvrzeniPracovniDoby = "gi-calendar-interval";
        static readonly rozvrzeniPracovniDobyNeurceno = "gi-calendar-interval|gi-question gi-stack-fw gi-bgw gi-stack-pos--rb";
        static readonly rozvrzeniPracovniDobyRovnomerne = "gi-calendar-interval|fa-signal gi-stack-fw gi-bgw gi-stack-pos--rb";
        static readonly rozvrzeniPracovniDobyNerovnomerne = "gi-calendar-interval|fa-bar-chart gi-stack-fw gi-bgw gi-stack-pos--rb";
        static readonly rocniZuctovaniDane = "gi-generate |gi-bankovka  gi-stack-pos--rb";
        static readonly udaje_organizace = "fa-building-o";
        static readonly kalendare = "fa-calendar";
        static readonly ucty = "fa-university";
        static readonly odborove_svazy = "fa-link";
        static readonly zdravotni_pojistovny = "fa-heart-o";
        static readonly ciselniky = "gi-ciselniky";
        static readonly osoby_pracoviste = "gi-group";
        static readonly osoba = "gi-user";
        static readonly osobaEsu = "gi-esu";
        static readonly osoby = "gi-group";
        static readonly osobaPredchozi = "gi-user|fa-arrow-left gi-stack-pos--lb";
        static readonly osobaNasledujici = "gi-user|fa-arrow-right gi-stack-pos--rb";
        static readonly osoba_navazana = "fa-user-o |fa-user g-state-text g-state-info gi-stack-pos--rb";
        static readonly osoba_navazana_new = "fa-user-o |fa-user-plus gi-bgw gi-stack-pos--rb g-state-text g-state-info";
        static readonly osoba_navazana_edit = "fa-user-o | fa-user g-state-text g-state-info gi-stack-pos--rb | gi-pencil gi-bgw  g-state-text g-state-info";
        static readonly clear_log_uzaverka = "fa-eraser";
        static readonly debug_mode_start = "fa-bug";
        static readonly servis_active = "fa-bug g-state-text g-state-warning";
        static readonly servis_neutral = "fa-building-o";
        static readonly historie = "gi-history";
        static readonly monitorUzaverky = "fa-circle-o-notch fa-spin fa-2x fa-fw";
        static readonly xls = "fa-file-excel-o";
        static readonly pdf = "fa-file-pdf-o";
        static readonly xml = "fa-file-code-o";
        static readonly otaznik = "fa-question";
        static readonly vynucene_datum_konce = "fa-hand-paper-o";
        static readonly elektronicke_dokumenty_doruceni_email = "fa-envelope-o";
        static readonly elektronicke_dokumenty_doruceni_portal = "fa-building-o";
        static readonly elektronicke_dokumenty_original = "gi-paper";
        static readonly elektronicke_dokumenty_priloha = "gi-attachment";
        static readonly prijem_do_pam = "gi-doruc gi-stack-fw gi-bgw--rect g-state-text g-state-info gi-rot180 |gi-pam gi-stack-pos--rt";
        static readonly zadost = "fa-list-alt";
        static readonly zadost_zpracuj = "fa-arrow-right";
        static readonly podrizeni = "fa-male|fa-male gi-bgw gi-stack-pos--rb g-state-text g-state-info";
        static readonly ppv_ukoncene = "fa-user|fa-clock-o gi-stack-pos--rb g-state-text g-state-important";
        static readonly epk_predat = "gi-epk|fa-arrow-right gi-stack-pos--rb g-state-text g-state-info";
        static readonly epk_text_vyjadeni = "fa-file-text-o";
        static readonly esp_odchodne = "fa-user-o |gi-arrow gi-stack-pos--lb";
        static readonly esp_vysluha = "fa-user-circle-o|gi-vyrizenopo gi-bgw gi-stack-pos--rb g-state-text g-state-info";
        static readonly ppp_vykonej_vse = "fa-refresh";
        static readonly ppp_predat = "fa-arrow-right gi-stack-pos--rb g-state-text g-state-info";
        static readonly ppp_predat_zpet = "fa-arrow-left gi-stack-pos--rb g-state-text g-state-info";
        static readonly ppp_schvalit = "gi-tick";
        static readonly ppp_zamitnout = "fa-times";
        static readonly ppp_new_pozadavek = "fa-plus";
        static readonly ppp_new_pozadavek_zastoupeni = "fa-plus|fa-plus gi-stack-pos--rb g-state-text g-state-info";
        static readonly ppp_zamitnuto = "fa-times g-state-text g-state-important";
        static readonly ppp_majetek = "gi-maj";
        static readonly ppp_vykaz_vykonu = "fa-table";
        static readonly ppp_pozadavek_v_epk = "gi-epk";
        static readonly ppp_pozadavek_v_epk_schvaleno = "gi-epk g-state-text g-state-success";
        static readonly ppp_pozadavek_v_epk_zamitnuto = "gi-epk g-state-text g-state-important";
        static readonly ppp_pozadavek_zapis_agenda = "gi-vyrizenouza";
        static readonly ppp_nadrizeny = "fa-user-o |fa-angle-double-up g-state-text g-state-info gi-bgw gi-stack-pos--rt";
        static readonly ppp_dochazka = "fa-calendar";
        static readonly ppp_pozadavek_storno = "fa-ban";
        static readonly ppp_pozadavek_v_epk_storno = "fa-ban g-state-text g-state-warning";
        static readonly ppp_pozadavek_v_epk_storno_zpracovane = "fa-ban g-state-text g-state-important";
        static readonly ppp_pozadavek_v_epk_storno_zamitnute = "fa-ban |fa-times-circle g-state-text g-state-error g-state-text g-state-important gi-bgw gi-stack-pos--rt";
        static readonly ppp_pozadavek_v_epk_storno_schvaleno = "fa-ban |fa-check-circle g-state-text g-state-success gi-bgw gi-stack-pos--rt";
        static readonly ppp_zdravotni_prohlidky = "fa-heartbeat";
        static readonly ppp_skoleni = "fa-graduation-cap";
        static readonly ppp_benefity = "fa-gift";
        static readonly ppp_organogram = "gi-uzel";
        static readonly ppp_prehledy = "fa-tv";
        static readonly ppp_prihlasit_na_skoleni = "gi-user g-state-text|gi-plus gi-bgw gi-stack-pos--rb g-state-text";
        static readonly ppp_edokumenty_folder = "gi-folder_bold g-state-text g-state-favorite";
        static readonly ppp_edokumenty_folder_menu_on = "gi-folder";
        static readonly ppp_edokumenty_folder_menu_off = "gi-folder|gi-visible-non gi-stack-pos--rb gi-bgw";
        static readonly ppp_role_group = "gi-group";
        static readonly ppp_vykaz_vykonu_save_prescas = "gi-vyrizenopo gi-stack-bg|gi-save gi-stack-fw gi-bgw";
        static getAllIcons(): JQueryPromise<Gordic.Prefabs.Select.GCFontIconDto[]>;
        static getFaIcons(): Gordic.Prefabs.Select.GCFontIconDto[];
    }
}
/**
 * Práce se sloupci
 */
declare namespace Gordic.Pam {
    /**
     * Enumerace všech sloupců PAM, pokud se jedná o jednorázovou záležitost použij unspecified
     * @param {type} typ sloupce
     */
    enum PamColumnType {
        c = 0,
        cfu_set = 1,
        dec_6_2 = 2,
        dec_15_2 = 3,
        dec_15_2_formatN2 = 4,// s formátem na 2 desetinná místa
        dec_15_4_formatF4 = 5,// s formátem na 4 desetinná místa
        filesizetxt = 6,
        dat_od = 7,
        dat_od_hhmm = 8,
        dat_do = 9,
        dat_do_hhmm = 10,
        dat_od_ppv = 11,
        dat_do_ppv = 12,
        dat_zmena = 13,
        dat_zmena_ms = 14,// s milisekundami
        dat_mpd = 15,
        druh_nazev = 16,
        date = 17,
        datetime = 18,
        ico = 19,
        icon = 20,
        icon_aktualni = 21,
        icon_detail = 22,
        icon_druh_ppv = 23,
        icon_nazev_per_udaj = 24,
        icon_stav_zprac = 25,
        icon_uzaverka = 26,
        icon_vyplatkovy = 27,
        icon_pripona = 28,
        icon_priloha = 29,
        icon_vysledek_kontroly = 30,
        icon_aktivita = 31,
        icon_platnost = 32,
        icon_historie = 33,
        tit_pred = 34,
        jmeno = 35,
        prijmeni = 36,
        tit_za = 37,
        nazev = 38,
        nazev_osoby = 39,
        nazev_slozky = 40,
        nazev_vaj = 41,
        individialni_volno_seznam_podrizeni = 42,
        mena = 43,
        nks = 44,
        oc = 45,
        oc_vzp = 46,
        pid = 47,
        poznamka50 = 48,
        poznamka254 = 49,
        procento = 50,
        procentoKrat100 = 51,
        rc = 52,
        smallint = 53,
        editor_smallint = 54,
        int = 55,
        text = 56,
        text1 = 57,
        text5 = 58,
        text8 = 59,
        text10 = 60,
        text12 = 61,
        text16 = 62,
        text20 = 63,
        text50 = 64,
        text60 = 65,
        text75 = 66,
        text100 = 67,
        text254 = 68,
        den_zkratka = 69,
        pracoviste = 70,
        nazev_rf = 71,
        mes_rok_txt = 72,
        mes_rok_od_txt = 73,
        mes_rok_do_txt = 74,
        popis_ppv_txt = 75,
        ucs = 76,
        unspecified = 77,
        uus = 78,
        editor_hhmm = 79,
        editor_nnn = 80,
        editor_poznamka50 = 81,
        uvazek = 82,
        castka0 = 83,// částka s formátem na 0 desetinných míst
        castka = 84,// částka s formátem na 2 desetinná místa
        castkaDleMeny = 85,// částka s formátem na 2 desetinná místa, v případě mena <> 0 se prezentuje c_mena, jinak c
        check = 86,
        zmenu_prov = 87,
        ppp_pozadavek_stav = 88
    }
    /**
    * Převod stringu na PamColumnType
    * @param {string} colname
    */
    const txt2PamColumnType: (colname: string) => PamColumnType;
    /**
     * Struktura pro přenos informací o sloupcích
     * @param {Array<IPamColumn>} options
     */
    interface IPamColumn {
        coltype: PamColumnType;
        colTemplate?: GGridColumn<any>;
    }
    interface IPamColumns {
        SestavSloupce(options: Array<IPamColumn>): Data.GridFormat<{}>;
    }
    class Columns implements IPamColumns {
        private _content;
        private _licAdr;
        private readonly CAPTION_MAP;
        getCaption: (columnName: any, defaultValue: any) => any;
        constructor(cnt?: (GContent | null));
        getColumnDefinition(colType: PamColumnType, colName: string | null): GGridColumn<any>;
        SestavSloupce(options: Array<IPamColumn>): Data.GridFormat<{}>;
        /**
        * Sortprocessor pro rok_obd_mzdy, který je v textovém formátu
        * @param columName jméno sloupce , který obsahuje rok_obd_mzdy v textovém formátu
        * @param direction "ASC" | "DESC" směr řazení
        * @returns
        */
        static SortProcessor_RokObdMzdyTxt(columName: string, direction: "ASC" | "DESC"): Gordic.Data.Sorting.SortDescriptor<any>;
        Sloupec(colType: PamColumnType, gridColumn?: GGridColumn): GGridColumn;
    }
}
declare namespace Gordic.Pam.Prefabs {
    export interface DtoMapping {
        [key: string]: string;
    }
    export interface IPamPrefabSetting {
        modelValueTransform?: {
            apply?(modelValue: any): Object | null | undefined | void;
            collect?(fieldValue: null | Object): any | null | undefined | void;
        };
        modelOptions?: ModelOptions;
        cached?: boolean;
        caseSensitive?: boolean;
        clientFilterEvaluator?: false | {
            prepareView?: (dataview: object) => void;
            filter?: (fastfilter: string) => ((e: any) => boolean);
        };
        data?: any;
        datObjName: string;
        dlgOpt?: GDlgOptions;
        filterMinLength?: number;
        gridFormat: Gordic.Data.GridFormat<any>;
        gridOpts: GGridOptions<any>;
        helperColumns?: string[];
        helperItemTemplate?: string | ((row: any) => string);
        ignoreDiacritics?: boolean;
        islMethodName: string;
        itemTemplate: string | ((row: any) => string);
        mapping?: DtoMapping;
        multi?: boolean;
        serverFastFilterSupport?: boolean;
        serverFiltersFn?: Function;
        strict?: boolean;
        viewSetting?: Gordic.Data.ViewSettings;
        prefabName: string;
        fragments?: string[];
    }
    export interface IPamPrefabSlozkaMzdySetting {
        legislativa?: boolean;
        zobrazitNeplatne?: boolean;
        seskupovatKategorie?: boolean;
    }
    export interface IPamPrefabPersonalniUdajSetting {
        jenAktivni?: boolean;
        jenCiselnikove?: boolean;
        jenNeciselnikove?: boolean;
    }
    /**
    * Volba Ano/Ne
    * @copyright TV
    * @returns {GSelectBoxOptions<Object>}
    */
    export function AnoNe(): GSelectBoxOptions<Object>;
    /**
     * Číselník kódu nepřítomnosti z docházky
     */
    export function dochazkaKody(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník druhů PPV
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param omezitDruhyPPV  - true = ponechat implicitní omezení druhů pro jednotlivé instalace  false = zobrazit všechny druhy PPV
    * @returns {GSelectBoxOptions<Object>}
    */
    export function druhPPV(cnt: GContent, omezitDruhyPPV?: boolean): GSelectBoxOptions<Object>;
    /**
     * Číselník všech pracovišť - PAM
     * - podporuje rychlý filtr (fastsearch)
     * ServerFilter:
     * - ixs_pra
     * - ico
     * - nks
     * - aktivita
     * @param {GContent} cnt content, ve kterém prefab leží
     * @returns {GSelectBoxOptions<Object>}
    */
    /**
      * Číselník všech pracovišť - PAM
      * - podporuje rychlý filtr (fastsearch)
      * ServerFilter:
      * - ixs_pra
      * - pracoviste
      * - ico
      * - nks
      * - aktivita
      * - rok_obd_mzdy a ixs_fun ( pokud je nastaveno filtrovatPristupy))
     * @param cnt content, ve kterém prefab leží
     * @param filtrovatPristupy true = filtrovat podle přístupů z pamvprf
     * @returns
     */
    export function pamspra(cnt: GContent, filtrovatPristupy?: boolean): GSelectBoxOptions<Object>;
    /**
    * Číselník personálních údajů
    * - podporuje rychlý filtr (fastsearch)
    * ServerFilter:
    * - ixs_cis  - identifikátor personálního údaje
    * - kod_uda  - starý identifikátor personálního údaje
    * - typ_uda  - identifikátor datového typu údaje
    * - typ_ag   - typ agendy (pokud není uvedeno)
    * - aktivita - aktivita (pokud není uvedeno, použije se hodnota 100)
    * - vazba_na_ppv - 0 nebo 1
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function personalniUdaj(cnt: GContent): GSelectBoxOptions<any>;
    /**
    * Číselník personálních údajů - výběr hodnoty (pouze pro typ_uda = 50 - číselníkový typ)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - ixs_cis - identifikátor personálního údaje (výchozí je "")
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function personalniUdajHodnota(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník měsíčních odpočtů
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období z formuláře, z data od, ekoinicializace)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function odpocetMesicni(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník ročních odpočtů
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období z formuláře, z data od, ekoinicializace)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function odpocetRocni(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Složku mzdy organizace - probíhá vnitřní filtrace podle datumu a druhu PPV tyto potřeba zaslat skrze serverFilters ( druh_ppv a dat_od)
    * serverfilters:
    * - typ_slozky => číslo složky mzdy
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * - dat_od => datum od
    * - ixs_ppv => ppv
    * @param setting  umožňuje řízení zdali se má zobrazit i legislativa (legislativa = true) a zdali zobrazit i složky, které jsou neplatné pro daný den a PPV
    */
    export function SlozkaMzdy(cnt: GContent, setting?: IPamPrefabSlozkaMzdySetting): GSelectBoxOptions<Object>;
    /**
    * SlozkaDruh - Druh složky mzdy.
    * serverfilters:
    * - slozka_mzdy => číslo složky mzdy (výchozí je null)
    * - aktivita   => aktivita (výchozí je 100)
    */
    export function SlozkaDruh(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * SlozkaDruhKDatu - Druh složky mzdy k datu
    * serverfilters:
    * - slozka_mzdy => číslo složky mzdy (výchozí je null)
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * - druh_ppv => druh PPV (výchozí je 0)
    * - dat_od => datum pro zjištění platnosti druhu (výchozí je první den přihlášeného období)
    */
    export function SlozkaDruhKDatu(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník druhů činnosti
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function DruhyCinnosti(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník způsob zdanění (pamczzd)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function ZpusobZdaneni(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník úroveň kumulace (pamcurk)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původní prefabu zobrazuje pouze {uro_kum_txt} nikoliv {uro_kum} – {uro_kum_txt}
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function UrovenKumulace(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník úroveň administrace účtu (pamcura)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function UrovenAdministraceUctu(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník typ adresy (percado)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypAdresy(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník zdravotní pojišťovny (ekoszpo)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function ZdravotniPojistovny(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník Typ vazby organizace na cizí účet (pamctyv)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {typ_vazby_txt} nikoliv {typ_vazby} – {typ_vazby_txt} a nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypVazbyOrganizace(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník Typ vazby organizace na cizí účet multi (pamctyv)
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypVazbyOrganizaceMulti(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Údaje o odborovém svazu (pamsodb)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {nazev} nikoliv {ixs_esu_odb} – {nazev} a nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function OdborovySvaz(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Způsob výpočtu příspěvku odborového svazu (pamcvyp)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {vyp_pos_txt} nikoliv {vyp_pos} – {vyp_pos_txt} a nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function ZpusobVypoctuPrispevkuOdborovySvaz(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník Územní pracoviště ČSSZ (pamckcs)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function UzemniPracovisteCssz(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník typů vyživovaných osob pro exekuce (pamcexo)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {typ_oso_txt} nikoliv {typ_oso} – {typ_oso_txt} a nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypVyzivovaneOsoby(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Skupina složek mzdy organizace (pamstks)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {nazev} nikoliv {nazev} ({ixs_tks}) a nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function SkupinaSlozekMzdyOrganizace(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Fond pracovní doby (pamcfpd)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function FondPracovniDoby(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Typ kalendáře (pamckal)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param {boolean} ZobrazovatIndividualni [0] zda zobrazovat i individuální kalendáře
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypKalendare(cnt: GContent, ZobrazovatIndividualni?: number): GSelectBoxOptions<Object>;
    /**
    * Kalendáře
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param {boolean} ZobrazovatIndividualni [false] zda zobrazovat i individuální kalendáře
    * @returns {GSelectBoxOptions<Object>}
    */
    export function Kalendare(cnt: GContent, ZobrazovatIndividualni?: boolean): GSelectBoxOptions<Object>;
    /**
    * Příznak pracovního dne (pamcpra)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param {boolean} zobrazovatNeurceno [false] zda zobrazovat Neurčeno
    * @returns {GSelectBoxOptions<Object>}
    */
    export function PriznakPracovnihoDne(cnt: GContent, zobrazovatNeurceno?: boolean): GSelectBoxOptions<Object>;
    /**
    * Příznak svátku (pamcsva)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param {boolean} zobrazovatNeurceno [false] zda zobrazovat Neurčeno
    * @returns {GSelectBoxOptions<Object>}
    */
    export function PriznakSvatku(cnt: GContent, zobrazovatNeurceno?: boolean): GSelectBoxOptions<Object>;
    /**
    * Číselník druh platové tabulky (pamctab)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {druh_tab_txt} nikoliv {druh_tab} – {druh_tab_txt} a nemá nastaven dropdown: true
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function DruhPlatoveTabulky(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Platová třída (pamctta)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * - druh_tab => druh platové tabulky (výchozí je 0)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function PlatovaTrida(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Platový stupeň
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
    * - druh_tab => druh platové tabulky (výchozí je 0)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function PlatovyStupen(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Šablona PPV (pamstpr)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - faze => fáze (výchozí je GWAPAM05)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function SablonaPpv(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Organizační celek (ginsoce)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function OrganizacniCelek(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Systemizované místo (ginspfc)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - ixs_oce => PID OCE (výchozí "")
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function SystemizovaneMisto(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Rozbor (pamsroz)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function Rozbor(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Administrační jednotka (pamsnaj)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function AdministracniJednotka(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Typ pracoviště (pamsnaj)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypPracoviste(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Druh bankovního účtu pro vyplácení mezd
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function DruhBankovnihoUctuPam(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Vlastní účty
    * @returns {GSelectBoxOptionsSingle<Gordic.Pam.Interface.Object>}
    */
    export function VlastniUctyPam(serverFilters?: any): GSelectBoxOptionsSingle<Object>;
    /**
    * Číselník typ masky (ginctma)
    * - podporuje rychlý filtr (fastsearch)
    * - oproti původnímu prefabu zobrazuje pouze {typ_masky_txt} nikoliv {typ_masky} – {typ_masky_txt} a nemá nastaven dropdown: true
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TypMasky(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník pohlaví (gincpoh)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function Pohlavi(cnt: GContent): GSelectBoxOptions<object>;
    /**
    * Číselník automat PAM (pamcaut)
    * @returns {GSelectBoxOptions<Object>}
    */
    export function AutomatPAM(cnt: GContent): GSelectBoxOptions<Object>;
    /**
     * Číselník vojenských cvičení
     * serverFilters:
     * - ixs_ppv => PID PPV (výchozí null)
     * - omezujici_datum => ? (výchozí null)
     */
    export function VojenskeCviceni(cnt: GContent): GSelectBoxOptions<Object>;
    /**
     * Číselník Stát + měna (ekosrel)
     * - podporuje rychlý filtr (fastsearch)
     * serverFilters:
     * - rok_obd_mzdy => rok a období (výchozí je rok a období ekoinicializace)
     * @param {GContent} cnt content, ve kterém prefab leží
     * @returns {GSelectBoxOptions<Object>}
     */
    export function StatMena(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Rozložení pracovní doby (pamcrpd)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param {boolean} zobrazovatNeurceno [true] Jestli zobrazovat i 0=Neurčeno (výchozí stav je vracet)
    * @returns {GSelectBoxOptions<Object>}
    */
    export function RozlozeniPracovniDoby(cnt: GContent, zobrazovatNeurceno?: boolean): GSelectBoxOptions<Object>;
    /**
    * Forma získání (pamcfor)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param {boolean} zobrazovatNeurceno [true] Jestli zobrazovat i 0=Neurčeno (výchozí stav je vracet)
    * @returns {GSelectBoxOptions<Object>}
    */
    export function FormaZiskani(cnt: GContent, zobrazovatNeurceno?: boolean): GSelectBoxOptions<Object>;
    /**
    * Způsob výpočtu sociálního pojištění (pamcssp)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function ZpusobVypoctuSop(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Způsob výpočtu zdravotního pojištění (pamcszp)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function ZpusobVypoctuZdp(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Důvod přijetí (pamcdpr)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function DuvodPrijeti(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Výplatní místo (pamsvyp)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function VyplatniMisto(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Důvod ukončení (pamcduk)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function DuvodUkonceni(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Kategorie zaměstnání (CZ-ISCO) (pamskza)
    * - podporuje rychlý filtr (fastsearch)
    * serverFilters:
    * - ixs_pra => PID pracoviště (výchozí "")
    * - kzam => kategorie zaměstnání (výchozí "")
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function KategorieZamestnani(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Postavení v zaměstnání (pamckpz)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function PostaveniVZamestnani(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Vynětí (pamcdve)
    * - podporuje rychlý filtr (fastsearch)
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function DruhVyneti(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Sestava PPS
    * @returns {GSelectBoxOptions<Object>}
    */
    export function SestavaPps(): GSelectBoxOptionsSingle<Object>;
    /**
    * Plnička PPS
    * @returns {GSelectBoxOptions<Object>}
    */
    export function PlnickaPps(): GSelectBoxOptionsSingle<Object>;
    /**
    * PPV - Výběr PPV - velký výběrový číselník
    * serverfilters:
    * - slozka_mzdy => číslo složky mzdy
    */
    export function PPV(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Combo box pro výběr PPV
    * @param {GContent} cnt content, ve kterém prefab leží
    * @param ixs_esu Identifikace PPV z pamsesu
    * @param rok_obd_mzdy Období zjištění všech PPV
    * @param pouze_platne [true] Nabízet pouze platné PPV
    * @param prednabizet_vyplatkovy [true] Přednabízet výplatkový PPV
    * @returns {GSelectBoxOptionsSingle<Gordic.Pam.Interface.GHlavickaPPVDto>}
    */
    export function PPVCombo(cnt: GContent, ixs_esu: string, rok_obd_mzdy: number, pouze_platne?: boolean, prednabizet_vyplatkovy?: boolean): GSelectBoxOptionsSingle<Gordic.Pam.Interface.GHlavickaPPVDto>;
    /**
     * Seznam přeplatků platového výměru (použito na MZ 193 a 194)
     * @param {string} ixsPpv
     * @param {number} rokObdMzdy
     * @param {number} slozkaMzdy - složka 193 nebo 194
     * @returns {GSelectBoxOptionsSingle<Gordic.Pam.Interface.Object>}
     */
    export function PreplatekPlatovehoVymeru(ixsPpv: string, rokObdMzdy: number, slozkaMzdy: number): GSelectBoxOptionsSingle<Gordic.Pam.Interface.GVypoctenaSlozkaDto>;
    /**
    * Výběr vypočtené složky pro různé účely na formulářích měsíčních změn:
    * - MZ - vazba na přeplatek platového výměru (složky 193 a 194)
    * - MZ - vazba na složku vstupující do dílčí uzávěrky a BUCu + složky 1345, 3079
    * - MZ - vazba na složku, která má nastaveno provázání s exekucí (PAMCS45 + PAMCPRI.priz_vstup 5.bit = 1)
    * Většinou se prezentuje jako pole "Kontační modul srážky" (km_sr)
    * @param {string} ixsPpv
    * @param {number} rokObdMzdy
    * @param {number} slozkaMzdy - číslo složky pro kterou se vytváří vazba (MZ, exekuce)
    * @param {number} slozkaMzdyVyp - vypočtená složka mzdy - číslo složky
    * @param {number} poradiVyp - vypočtená složka mzdy - poradi
    * @returns {GSelectBoxOptionsSingle<Gordic.Pam.Interface.Object>}
    */
    export function VypoctenaSlozkaVyberProMz(cnt: GContent, ixsPpv: string, rokObdMzdy: number, slozkaMzdy: number, slozkaMzdyVyp: number | null, poradiVyp: number | null, mesicniZmenaTypForm: Gordic.Pam.Interface.GPamPpvMesicniZmenaTypFormulare): GSelectBoxOptions<Gordic.Pam.Interface.GVypoctenaSlozkaDto>;
    /**
    * Výběr vypočtené složky pro formulář exekuční srážky
    * - Exekuce - vazba na umořovanou částku (složky 4580, 4582, 4583)
    * Prezentuje se jako pole "Umořovaná složka"
    * @param {string} ixsPpv
    * @param {number} rokObdMzdy
    * @param {number} slozkaMzdy - číslo složky pro kterou se vytváří vazba (MZ, exekuce)
    * @param {number} slozkaMzdyVyp - vypočtená složka mzdy - číslo složky
    * @param {number} poradiVyp - vypočtená složka mzdy - poradi
    * @returns {GSelectBoxOptionsSingle<Gordic.Pam.Interface.Object>}
    */
    export function VypoctenaSlozkaVyberProExekuce(cnt: GContent, ixsPpv: string, rokObdMzdy: number, slozkaMzdy: number, slozkaMzdyVyp: number | null, poradiVyp: number | null): GSelectBoxOptions<Gordic.Pam.Interface.GVypoctenaSlozkaDto>;
    /**
    * Výběr srážky pro různé účely:
    * - MZ - vazba na trvalé složky (srážky)
    * - Trvalá složka 607 "Doplatek do zvl.příplatku mnohonár.ozbr.sil" - vazba na vypočtenou složku 606 "Zvláštní příplatek - mnohonárodní ozbrojené síly"
    * Většinou se prezentuje jako pole "ID srážky" (id_sr)
    * @param {string} ixsPpv
    * @param {number} rokObdMzdy
    * @param {number} slozkaMzdy - číslo složky, pro kterou se vytváří vazba (MZ, trvalá složka)
    * @param {number} porCisloSrazka - srážka - por_cislo
    * @returns {GSelectBoxOptions<Gordic.Pam.Interface.Object>}
    */
    export function SrazkaVyber_old(cnt: GContent, ixsPpv: string, rokObdMzdy: number, slozkaMzdy: number, porCisloSrazka: number | null): GSelectBoxOptions<Gordic.Pam.Interface.GTrvalaSlozkaDto>;
    /**
    * Výběr srážky pro různé účely:
    * - MZ - vazba na trvalé složky (srážky)
    * - Trvalá složka 607 "Doplatek do zvl.příplatku mnohonár.ozbr.sil" - vazba na vypočtenou složku 606 "Zvláštní příplatek - mnohonárodní ozbrojené síly"
    * Většinou se prezentuje jako pole "ID srážky" (id_sr)
    /**
    * Trvalá složka mzdy
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function SrazkaVyber(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Trvalá složka mzdy
    * @param {GContent} cnt content, ve kterém prefab leží
    * @returns {GSelectBoxOptions<Object>}
    */
    export function TrvalaSlozkaMzdy(cnt: GContent): GSelectBoxOptions<Object>;
    /**
    * Číselník kategorie seskupení (ekoskto)
    * @returns {GSelectBoxOptionsSingle<Object>}
    */
    export function KategorieSeskupeni(): GSelectBoxOptionsSingle<Gordic.Pam.Interface.GKategorieSeskupeniDto>;
    export function TestPrefab1(ctn: GContent): GSelectBoxOptions<any>;
    /**
     * Počet dní
     * Nastavení formátovaného políčka pro zadání počtu dní.
     * Podporuje různé formáty zadání: pouze dny ("ddd"), dny s hodinami a minutami ("ddd hh:mm"), nebo pouze hodiny a minuty ("hh:mm").
     * Nastavuje povolené znaky, délku vstupu, převod mezi textovou a číselnou hodnotou, formátování a transformaci modelové hodnoty.
     *
     * @param {FORMAT_POCET_DNI} format Formát zadání počtu dní. Možné hodnoty: "ddd", "ddd hh:mm", "hh:mm".
     * @returns {GFormattedBoxOptions<any>} Konfigurace formátovaného políčka pro zadání počtu dní.
     */
    export function PocetDni(format: FORMAT_POCET_DNI): GFormattedBoxOptions<any>;
    /**
     * Počet hodin
     * Nastavení formátovaného políčka pro zadání počtu hodin.
     * Podporuje různé formáty, jako například "hh:mm", "-hh:mm", "hhh:mm", "-hhh:mm".
     * @param {FORMAT_POCET_HODIN} format - Formát zadání počtu hodin.
     * Možné hodnoty:
     * - "hh:mm" - Formát hodin a minut (např. 08:02).
     * - "-hh:mm" - Formát hodin a minut s podporou záporných hodnot (např. -12:45).
     * - "hhh:mm" - Formát s více než dvěma číslicemi pro hodiny (např. 123:45).
     * - "-hhh:mm" - Formát s více než dvěma číslicemi pro hodiny a podporou záporných hodnot (např. -123:45).
     * @param {boolean} [zobrazovatNulyPriPrazdnu=false] - Volitelný parametr, který v případě nulového vstupu určuje, zda se mají zobrazovat samé 0 (např. 00:00 u formátu hh:mm). Při false vrací prázný řetězec.
     * @returns {GFormattedBoxOptions<any>} - Konfigurace formátovaného políčka.
     * Obsahuje povolené znaky, validátory a další nastavení.
     */
    export function PocetHodin(format: FORMAT_POCET_HODIN, zobrazovatNulyPriPrazdnu?: boolean): GFormattedBoxOptions<any>;
    /**
    * Nastavení prefabu pro rok_obd_mzdy
    * @param {boolean} btn_minus Zobrazit tlačítko šipka doleva (pro snížení období o 1)
    * @param {boolean} btn_aktual Zobrazit tlačítko tečka (pro nastavení aktuálního období)
    * @param {boolean} btn_aktual Zobrazit tlačítko šipka doprava (pro zvýšení období o 1)
    * @param {number} obdobi_min Minimální období [22800]
    * @param {number|null} obdobi_aktual Aktuální období
    * @param {number} obdobi_max Maximální období [35999]
    */
    export type SETTING_ROKOBD = {
        btn_minus?: boolean;
        btn_aktual?: boolean;
        btn_plus?: boolean;
        obdobi_min?: number;
        obdobi_aktual?: number | null;
        obdobi_max?: number;
    };
    /**
    * Políčko pro zadání rok_obd_mzd. Akceptuje různé formáty např:  řetězec ve tvaru MM/RRRR MMRRRR MMRR MM:RRRR MM:RR MM-RRRR MM/RR MM*RRRR
    * @returns {number} rok_obd_mzdy (number)
    * @param {Gordic.Pam.Prefabs.SETTING_ROKOBD} setting Nastavení Nastavení prefabu pro rok_obd_mzdy
    * @example .addField("gformattedbox", "w-6", Gordic.Pam.Prefabs.rok_obd_mzdy(), {name: "rok_obd_mzdy_test",model: "model.rok_obd_mzdy=value.rok_obd_mzdy"})
    * @example .addField("gformattedbox", "w-6", Gordic.Pam.Prefabs.rok_obd_mzdy({ btn_minus: true, btn_aktual: true, btn_plus: true, obdobi_aktual: 24290, obdobi_min: 24276, obdobi_max: 24311 }), {name: "rok_obd_mzdy_test",model: "model.rok_obd_mzdy=value.rok_obd_mzdy"} )
    * @author ZMOLIK
    */
    export function rok_obd_mzdy(setting?: SETTING_ROKOBD): GFormattedBoxOptions<object | "">;
    interface IGBtnOptions extends MenuParams {
        /** (default = true) - automatické řízení zašednutí. Pokud je
         * false, následující parametry budou ignorovány: requireEdit,
         * requireValue */
        autoStateControl?: boolean;
        /** (default = true) - tlačítko bude zašednuté zároveň s políčkem
         * (např. otevření výběrového formuláře). Nastavením false bude
         * tlačítko k dispozici i pro disabled políčka (typicky např.
         * zobrazení detailu hodnoty v políčku) */
        requireEdit?: boolean;
        /** (default = false) - tlačítko bude zašednuté, pokud políčko má
         * value == emptyValue */
        requireValue?: boolean;
        /** (default = true) - zda se na aktivním tlačítku zastaví
         * standardní tab formuláře */
        tabbable?: boolean;
    }
    /**
     * Sloučení parametrů řádku políčka
     *
     * @param {GActionParamsDefObjBase} paramsDef defaultní parametry příslušné akce
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce podání
     */
    export const mergeParamsFieldRow: (paramsDef: GFormRowOptions, params: GFormRowOptions | undefined) => GFormRowOptions;
    /**
     * Přidání tlačítka do fieldu
     * @param fieldOptions "options" mateřského políčka
     * @param btnOpt nastavení tlačítka
     * @returns aktualizované "options" o tlačítko
     */
    export const ButtonToField: (fieldOptions: GStringBoxOptions, btnOpt: IGBtnOptions) => GStringBoxOptions;
    /**
     * Prefab pro string box s otazníkem
     * @param rowOptions nastavení řádku
     * @param fieldOptions nastavení políčka
     * @param inputTxt text nebo funkce vracející text
     * @returns
     */
    export function StringBoxWithHelp(rowOptions: GFormRowOptions, fieldOptions: GStringBoxOptions | (GStringBoxOptions & {
        fieldWidth: string;
    }), inputTxt: string | (() => string)): Gordic.Forms.FormRow[];
    /**
     * Typ pro combo prefab
     */
    /**
    * Typ definice pro combo prefab
    *
    * @property {GContent} [cnt] - Content
    * @property {"funkcni_mista"} typ - pro PPP - dostupná funkční místa pro stanovení seznamu podřízených i pro zástup
    * @property {"druhy_ppv"} typ - ponechat omezení druhů pro jednotlivé instalace
    * @property {"druhy_ppv_neomezeny"} typ - nabízet všechny PPV bez omezení
    * @property {"ppv"} typ - pracovně právní vztahy
    * @property {"per_udaj"} typ - personální údaj
    * @property {"sablona"} typ - šablona
    * @property {"static"} typ - statická data
    * @property {string} [sxs] - volitelný atribut pro omezení například zaslání ixs_esu
    * @property {any} [defaultValue] - Volitelná výchozí hodnota.
    * @property {string} [itemTemplate] - Volitelná šablona pro položku.
    * @property {any[]} [additionalFilter] - Volitelné pole pro dodatečné filtrování rq.filters
    * @property {boolean} [nenastavuj_default] - Volitelný příznak pro nenastavení výchozí hodnoty.
    */
    export type PAM_COMBOTYPE = {
        cnt: GContent;
        typ: "funkcni_mista" | "druhy_ppv" | "druhy_ppv_neomezeny" | "per_udaj" | "ppv" | "sablona" | "static";
        filters?: object;
        staticData?: any;
        defaultValue?: any;
        itemTemplate?: string | ((row: any) => string);
        nastav_prvni?: boolean;
    };
    /**
    * Combo - na základě typu vytvoří Combo
    * @param data  [GPamtsdaDto]  data pro combo využity jsou  char_1 (=popis) a char_2 (=value) pro první a  char_3 (=popis) a char_4 (=value) pro druhé
    * @param rowOptions nastavení popisného řádku
    * @param fieldOpt1 nastavené pro combo1
    * @returns
    */
    export function Combo(type: PAM_COMBOTYPE): GSelectBoxOptions<Object>;
    /**
    * Provázané dvojcombo - na základě GPamtsdaDto vytvoří provázaná comba.
    * @param data  [GPamtsdaDto]  data pro combo využity jsou  char_1 (=popis) a char_2 (=value) pro první a  char_3 (=popis) a char_4 (=value) pro druhé
    * @param rowOptions nastavení popisného řádku
    * @param fieldOpt1 nastavené pro combo1
    * @param fieldOpt2 nastavené pro combo2
    * @returns
    */
    export function DoubleCombo(data: Gordic.Pam.Interface.GPamtsdaDto[], rowOptions?: GFormRowOptions, fieldOpt1?: GSelectBoxOptions<Object>, fieldOpt2?: GSelectBoxOptions<Object>): Forms.FormRow[];
    /**
    * Provázané trojcombo - na základě GPamtsdaDto vytvoří provázaná comba.
    * @param data  [GPamtsdaDto]  data pro combo využity jsou  char_1 (=popis) a char_2 (=value) pro první, char_3 (=popis) a char_4 (=value) pro druhé, char_5 (=popis) a char_6 (=value) pro třetí
    * @param rowOptions nastavení popisného řádku
    * @param fieldOpt1 nastavené pro combo1
    * @param fieldOpt2 nastavené pro combo2
    * @param fieldOpt3 nastavené pro combo3
    * @returns
    */
    export function TripleCombo(data: Gordic.Pam.Interface.GPamtsdaDto[], rowOptions?: GFormRowOptions, fieldOpt1?: GSelectBoxOptions<Object>, fieldOpt2?: GSelectBoxOptions<Object>, fieldOpt3?: GSelectBoxOptions<Object>): Forms.FormRow[];
    /**
    * Aktualizuje data pole (pokud je pouze jedna, tak pole zamkne) a nastaví první dostutupnou hodnotu
    * @param field GField element, který má být aktualizován
    * @param options Seznam nových hodnot nebo objektů s klíčem
    * @param oldValue Předchozí hodnota pro zachování stavu, pokud existuje
    * @param key Klíč, podle kterého porovnávat (volitelné)
    */
    export function setFieldOptionsAndLock(field: any, options: any[], oldValue: any, key?: string): void;
    export function DatumTabulkaTridaStupen(Content: GContent, rowOptions?: GFormRowOptions): Forms.FormRow[];
    /**
     * Přemapování pamtpo1 na nativní data
     * @param data
     * @param mapping
     * @returns
     */
    export function RemapData(data: Gordic.Pam.Interface.GPamtpo1Dto[], mapping: DtoMapping): any[];
    export {};
}
/**
 * Základní bázová třída pro tvorbu divu s gridem a jeho obsluhou
 */
declare namespace Gordic.Pam {
    type IPamSeznamBaseCommand = "INSERT" | "UPDATE" | "DELETE";
    interface IPamSeznamBase {
        Grid: JQuery<HTMLElement>;
        Div: JQuery<HTMLElement>;
        SelectedRows: Object | null;
        SelectedRow: Object | null;
        GridGetData: MetaRow<any>[];
        GridOptions: GGridOptions<any>;
        CreateDiv(): JQueryPromise<HTMLElement>;
        GridDoubleClick(akce: GAction | string | undefined): void;
        GridChangeRow(akce: GAction | string | undefined): void;
        Filters: object;
        ServerData: object;
        EditFrmWindow: JQuery<HTMLElement> | null;
        Command(cmd: IPamSeznamBaseCommand, insertedData?: Object | null, modelOpt?: ModelOptions): void;
        Command2<T = any>(cmd: IPamSeznamBaseCommand, insertedData?: Object | null, modelOpt?: ModelOptions): Promise<{
            form: Gordic.Forms.Form | null;
            dto: T;
        }>;
        Refresh(rq: Object | Gordic.Isl.GServiceListRequest): JQueryPromise<any>;
        DataObject: Gordic.Pam.DataObject;
    }
    interface IPamWindowSetting {
        title?: string;
        dependant?: boolean;
        height?: number;
        left?: number;
        location?: boolean;
        menubar?: boolean;
        resizable?: boolean;
        status?: boolean;
        toolbar?: boolean;
        top?: number;
        width?: number;
    }
    interface IPamSeznamData {
        data?: Object;
        filters?: Object;
        fragments?: string[];
        dtoCallback?: TPamCallbackFunctionVariadic;
        afterOpenFrmCallback?: TPamCallbackFunctionVariadic;
    }
    interface IPamSeznamBaseOptions {
        pam_servis_wk?: number;
        sloupce: Array<IPamColumn>;
        gridOptions: GGridOptions<any>;
        editFRM?: Gordic.Forms.Form;
        editFRMDebugAction?: MenuParams[];
        autoLoadData?: boolean;
        refreshDataAfterSave?: boolean;
        gautofit?: boolean;
        windowsSetting?: IPamWindowSetting;
        defaultAction?: GAction | string | undefined;
        changeRowAction?: GAction | string | undefined;
        dataType: IPamDataType;
        serverData?: IPamSeznamData;
    }
    /**
     * Základní bázová třída pro tvorbu divu s gridem a jeho obsluhou
     * @param {GContent} parentContent
     * @param {Object} implicitní nastavení
     * @param {Object} uživatelské nastavení, kterém lze přepsat nebo doplnit implicitní nastavení
     * @param {Object} JSON objekt, který řídí data, která se natáhnou do gridu
     * @returns
     */
    class SeznamBase implements IPamSeznamBase {
        static TRACER: Diagnostics.GLog;
        private _TR;
        private _options;
        private _content;
        private _dataobj;
        private _editFrm;
        private _gridOptions;
        private _serverMethodData;
        private _transformDTOcallback;
        private _afterOpenFrmCallback;
        private _divSeznam;
        private _modalniOknoEditor;
        private _editFrmDivName;
        /**
         * Konstruktor - dělá pouze nastavení interní proměnných pro volitelné komponenty nastaví null
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} implicitOptions Implicitní nastavení sloužící jako šablona
         * @param {IPamSeznamBaseOptions} userOptions Uživatelské nastavení, které přepíše / doplní implicitní nastavení má přednost před šablonou
         */
        constructor(parentContent: GContent, implicitOptions: IPamSeznamBaseOptions | null, userOptions: IPamSeznamBaseOptions);
        /************************************************************************* */
        /**
         * Vytvoří hlavní DIV s gridem, nastaví sloupce, akce a případně automaticky načte data.
         * @returns {JQueryPromise<HTMLElement>} Promise, který po doběhnutí vrací vytvořený DIV s gridem.
         */
        CreateDiv(): JQueryPromise<HTMLElement>;
        /**
         * Načte data pro grid ze serveru podle aktuálních filtrů a fragmentů.
         * @returns {JQueryPromise<any>} Promise s načtenými daty.
         */
        _getGridData(): JQueryPromise<any>;
        /**
         * Vrací aktuálně nastavené filtry pro grid.
         * @returns {object}
         */
        get Filters(): object;
        /**
         * Vrací aktuálně nastavené fragmenty
         * @returns
         */
        get Fragments(): string[];
        /**
         * Nastaví filtry pro grid.
         * @param {object} filtr
         */
        set Filters(filtr: object);
        /**
         * Nastaví data pro serverovou komunikaci (pouze data, ostatní zůstává).
         * @param {object} data
         */
        set ServerData(data: object);
        /**
         * Vrací aktuální data pro serverovou komunikaci.
         * @returns {object}
         */
        get ServerData(): object;
        /**
         * Nastaví fragmenty pro grid.
         * @param {string[]} fragments
         */
        set Fragments(fragments: string[]);
        /**
         * Vrací instanci datového objektu (DataObject) pro práci se serverem.
         * @returns {Gordic.Pam.DataObject}
         */
        get DataObject(): Gordic.Pam.DataObject;
        /**
         * Vrací contentu, ve kterém je grid umístěn.
         * @returns {GContent}
         */
        get Content(): GContent;
        /**
         * Vrací hlavní DIV se seznamem (gridem).
         * @returns {JQuery<HTMLElement>}
         */
        get Div(): JQuery<HTMLElement>;
        /**
         * Vrací okno s editačním formulářem, pokud je otevřeno, jinak null.
         * @returns {JQuery<HTMLElement> | null}
         */
        get EditFrmWindow(): JQuery<HTMLElement> | null;
        /**
         * Vrací unikátní název DIVu, ve kterém je umístěn editační formulář.
         * @returns {string}
         */
        get EditFrmDivName(): string;
        /**
         * Vrací jQuery objekt gridu podle nastavené CSS třídy.
         * @returns {JQuery<HTMLElement>}
         */
        get Grid(): JQuery<HTMLElement>;
        /**
         * Vrací pole aktuálně vybraných řádků v gridu.
         * @returns {Object[] | null}
         */
        get SelectedRows(): Object[] | null;
        /**
         * Získání jednoho vybraného řádku
         * @returns Vybraný řádek případně null
         */
        get SelectedRow(): Object | null;
        /**
         * Vrací řádek následující po aktuálně vybraném řádku, nebo null.
         * @returns {Object | null}
         */
        get SelectedRowNext(): Object | null;
        /**
         * Vrací řádek před aktuálně vybraným řádkem, nebo null.
         * @returns {Object | null}
         */
        get SelectedRowPrev(): Object | null;
        /**
         * Vrací všechna data z gridu jako pole MetaRow.
         * @returns {MetaRow<any>[]}
         */
        get GridGetData(): MetaRow<any>[];
        /**
         * Vrací instanci editačního formuláře, pokud je nastavena.
         * @returns {Forms.Form | null}
         */
        get EditFrm(): Forms.Form | null;
        /**
         * Naplní editační formulář daty (DTO) a provede validaci.
         * @param {object} dto Data pro naplnění formuláře.
         * @param {ModelOptions} [modelOpt] Volitelné nastavení pro model.
         */
        EditFrmSetData(dto: object, modelOpt?: ModelOptions): void;
        /**
         * Nastaví instanci editačního formuláře.
         * @param {Forms.Form | null} frm
         */
        set EditFrm(frm: Forms.Form | null);
        /**
         * Nahraje data do gridu a případně provede jeho refresh.
         * @param {Data.View | any[] | null} data Data pro grid.
         * @param {boolean} [norefresh=false] Pokud true, grid se nerefreshuje.
         */
        GridSetData(data: Data.View | any[] | null, norefresh?: boolean): void;
        /**
         * Nahraje data do gridu bez refreshe.
         * @param {Data.View} view Data pro grid.
         */
        GridSetDataNorefresh(view: Data.View): void;
        /**
         * Vrací aktuální nastavení gridu (options).
         * @returns {GGridOptions<any>}
         */
        get GridOptions(): GGridOptions<any>;
        /**
         * Nastaví nové nastavení gridu a aplikuje ho.
         * @param {GGridOptions<any>} options
         */
        set GridOptions(options: GGridOptions<any>);
        /**
         * Změní vybrané vlastnosti gridu (merge).
         * @param {GGridOptions<any>} prop Objekt s měněnými vlastnostmi.
         */
        set SetGridOption(prop: GGridOptions<any>);
        /**
         * Vrací promise s informací o oprávnění k operacím (create, update, ...).
         * @returns {JQueryPromise<Gordic.Pam.Interface.AccessTokenPamDto>}
         */
        get ACT(): JQueryPromise<Gordic.Pam.Interface.AccessTokenPamDto>;
        /**
         * Obnoví data v gridu podle zadaného filtru nebo aktuálního nastavení.
         * @param {Object | Gordic.Isl.GServiceListRequest} [obj] Volitelně filtr nebo request.
         * @param {Object | null} [klice] Volitelně klíče pro refresh zatržítek v gridu.
         * @returns {JQueryPromise<any>} Promise s načtenými daty.
         */
        Refresh(obj?: Object | Gordic.Isl.GServiceListRequest, klice?: Object | null): JQueryPromise<any>;
        /**
         * Nastaví akci, která se má vykonat při dvojkliku na řádek v gridu.
         * @param {GAction | string | undefined} akce Akce (GAction nebo string).
         */
        GridDoubleClick(akce: GAction | string | undefined): void;
        /**
         * Nastaví akci, která se má vykonat při dvojkliku na řádek v gridu.
         * @param {GAction | string | undefined} akce Akce (GAction nebo string).
         */
        GridChangeRow(akce: GAction | string | undefined): void;
        /**
         * Otevře modální okno s formulářem pro zadaný příkaz (INSERT, UPDATE, DELETE).
         * @param {IPamSeznamBaseCommand} cmd Typ příkazu.
         * @param {Object | null} [insertedData] Data pro vložení (pouze INSERT).
         * @param {ModelOptions} [modelOpt] Volitelné nastavení modelu.
         */
        Command(cmd: IPamSeznamBaseCommand, insertedData?: Object | null, modelOpt?: ModelOptions): void;
        /**
         * Otevře modální okno s formulářem pro zadaný příkaz (INSERT, UPDATE, DELETE) a vrací Promise s výsledkem.
         * Na rozdíl od metody Command umožňuje asynchronní zpracování a získání DTO dat z formuláře.
         *
         * @template T Typ DTO objektu, který bude vrácen.
         * @param {IPamSeznamBaseCommand} cmd Typ příkazu ("INSERT", "UPDATE", "DELETE").
         * @param {Object | null} [insertedData=null] Data pro vložení (pouze INSERT), jinak null.
         * @param {ModelOptions} [modelOpt={}] Volitelné nastavení modelu pro formulář.
         * @param {boolean} [resolveOnShow=false] Pokud true, Promise se resolve ihned po zobrazení okna (bez čekání na akci).
         * @returns {Promise<{ form: Forms.Form | null, dto: T }>} Promise, která vrací instanci formuláře a DTO data z formuláře.
         */
        Command2<T = any>(cmd: IPamSeznamBaseCommand, insertedData?: Object | null, modelOpt?: ModelOptions, resolveOnShow?: boolean): Promise<{
            form: Forms.Form | null;
            dto: T;
        }>;
        /**
         * Zpracuje výsledek serverové kontroly (KNT) a zobrazí uživateli odpovídající dialog.
         * @param {Gordic.Pam.Interface.GSplResultDto} spg_result Výsledek kontroly z KNT procedury.
         * @returns {JQueryPromise<void>} resolve pokud lze pokračovat, reject pokud ne.
         * @todo přepis na async/await
         */
        _checkKnt(spg_result: Gordic.Pam.Interface.GSplResultDto): JQueryPromise<void>;
        /**
         * Provede serverovou kontrolu (KNT) a zpracuje výsledek včetně zobrazení dialogu.
         * @param {Object} dto Data pro kontrolu.
         * @returns {Promise<void>} resolve pokud lze pokračovat, jinak vyhodí chybu.
         */
        _provedKnt(dto: Object): Promise<void>;
    }
}
declare namespace Gordic.Pam {
    /**
     * Stažení souboru
     * @param {GContent} parentContent
     * @param {any} customData
     * @param {Gordic.Pam.Interface.ZPUSOB_STAZENI_SOUBORU} zpusob_stazeni
    *  @param {string|null} filename jméno souboru
     * @returns
    */
    function downloadFile(parentContent: GContent, customData: any, zpusob_stazeni?: Gordic.Pam.Interface.ZPUSOB_STAZENI_SOUBORU, filename?: string | null): Promise<any>;
    /**
     * Upload souboru do ELE s vazbou na ixs
     * @param elefileDto  struktura pro manipulaci s ELE
     * @param fileInfo informace o vkládaném souboru
     * @param deletefile požadavek na okamžité smazání souborů
     */
    function ELEupload(parentContent: GContent, elefileDto: Gordic.Pam.Interface.GEleSouborDto, fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, deletefile: boolean): JQueryPromise<any>;
    /**
    * Načtení souboru do base64 string
    * @param fileInfo informace o čteném souboru
    * @param deletefile požadavek na okamžité smazání souborů
    */
    function ReadFileToBase64(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, deletefile: boolean): JQueryPromise<any>;
    /**
     * Převod velikosti souboru na lidsky čitelnou formu
     * @param byteSize velikost v B
     * @param isDecimal jestli pracovat s 1000 nebo 1024
     * @returns text pro prezentaci
     */
    function FileSizeTxt(byteSize: number | string, isDecimal?: boolean): string;
}
/**
 * Inteligentní cache pro PAM
 *
 * @author ZMOLIK
 * @description PAM_CACHE slouží k uložení přihlašocvaích údajů a dalších globálních proměnných
 *  které jsou potřebné pro běh aplikace.
 * Proměnné
 * rokobdlogin - období přihlášené v aplikaci
 * licAdr - licence databáze
 * ixs_vaj - indetifikace uzávěrkové jednotky
 * typInst - typ instalace
 *
 * Jsou načítány při přihlášení do aplikace a jsou dostupné v celém běhu aplikace. Neměly by se ručně měnit!!
 * Vlastní plnění těchto proměnných je zajištěno v 016_Gordic.Pam.Init.ts
 */
declare namespace Gordic.Pam {
    class Cache {
        private static instance;
        private _gstore;
        private readonly _prefix;
        rokobdlogin: number;
        licAdr: string;
        ixs_vaj: string;
        typInst: number;
        constructor();
        static getInstance(): Gordic.Pam.Cache;
        /**
         * získání obsahu cache PAM - hodí se hlavně pro ladící účely
         * */
        get data(): any;
        /**
         * Získání globální proměnných
         *  @param force Vynucení načtení ze serveru, tj. nezkouší se cache
         *
         *  @description Nejprve prohlédne cache a pokud nenalezne, tak získá nastavení globálních proměnných ze serveru a opětovně uloží do cache.
         *  Při dalším čtení je již bráno s cache. Vynucením "force" lze říci, že cache se má ignorovat
         * */
        getglobal(force?: boolean): Promise<any>;
        /**
          * Získání hodnoty parametru
          *  @param param programátorský kód parametru
          *  @param force Vynucení načtení ze serveru, tj. nezkouší se cache
          *
          *  @description Nejprve prohlédne cache a pokud nenalezne, tak získá aktuální nastavení parametru ze serveru a opětovně uloží do cache.
          *  Při dalším čtení je již bráno s cache. Vynucením "force" lze říci, že cache se má ignorovat
          * */
        getparam(param: string, force?: boolean): Promise<any>;
        /**
         * Získává hodnotu z cache na základě zadaného názvu položky (`itemName`).
         * Umožňuje vrátit konkrétní typ hodnoty pomocí generického typu `T`.
         *
         * @param {string} itemName - Název položky, kterou chcete získat.
         * @returns {T | null} - Vrací hodnotu dané položky typu `T`, nebo `null`, pokud položka neexistuje.
         * @template T - Generický typ, který určuje typ vracené hodnoty.
         *
         * @example
         * // Příklad použití:
         * const licAdr = cache.get<string>("licAdr");
         */
        get(itemName: string): any;
        set(itemName: string, value: any): void;
    }
}
declare const PAM_CACHE: Gordic.Pam.Cache;
declare namespace Gordic.Pam {
    type IPamFormObject = {
        formular: Gordic.Forms.Form;
        akce?: GActionList;
        menu?: MenuParams[];
    };
    type IPamDialogOptions = (GDlgOptions | {
        commandBar?: MenuParams[];
    }) & {
        autofocusedField?: string;
    };
    enum TypyZobrazeniChyb {
        ikona_char_123 = "ikona_char_123",// ikona a spojené char_1+char_2+char_3
        ikona_oblast_text = "ikona_oblast_text"
    }
    class Forms {
        private _content;
        static DIALOG_KNT_CANCEL: string;
        constructor(content?: GContent);
        HistorieObjektu: (cnt: GContent, pamDataType: Gordic.Pam.IPamDataType, param: any, metoda?: string) => any;
        PracovniDoba: (cnt: GContent, ip_rok_obd_mzdy: number, ip_ixs_ppv: string, frmName: string, layoutdescriptor?: any) => any;
        UcetniProfil: (cnt: GContent, dataIn: Gordic.Pam.Interface.GUcetniVetaPAMDto, title?: string) => any;
        HistorieSlozek: (cnt: GContent, typSlozky: "Trvale" | "Srazky" | "Exekuce" | "MesicniZmeny", ip_ixs_ppv: string, ip_por_cislo: number, ip_rok_obd_mzdy: number) => any;
        DatumKonceVynucene: (cnt: GContent, pamDataType: Gordic.Pam.IPamDataType, param: any, metoda?: string) => any;
        DetailPPV: (Content: GContent, typAg: number, frmName: string, data: any, nahled: boolean, layoutdescriptor: string) => Gordic.Forms.Form;
        HistorieIndKalendare: (cnt: GContent, ip_ixs_ppv: string, ip_rok_obd_mzdy: number) => any;
        /**
        * Nastaví libovolnou option dialogu
        * @param frm formulář nebo element dialogu
        * @param option název option (např. "title", "modal", "width", "height")
        * @param value hodnota option
        * @example
        * // Nastavení titulku
        * Pam.Forms.SetOption(frm, "title", "Nový titulek");
        *
        * // Nastavení modálního režimu
        * Pam.Forms.SetOption(frm, "modal", true);
        *
        * // Nastavení šířky dialogu
        * Pam.Forms.SetOption(frm, "width", 500);
        */
        static SetOption<T extends keyof JQueryUI.DialogOptions>(frm: JQuery | HTMLElement | Forms.Form, option: T, value: JQueryUI.DialogOptions[T]): void;
        /**
        * Zpracuje výsledek SPG procedury a extrahuje extra_data
            *
            * @param cnt Kontext obsahu (GContent) pro aktualizaci progress operace
            * @param spg_result Výsledek volání SPG procedury obsahující data a případné chyby
            * @param op Objekt s informacemi o probíhající operaci (progress, text)
            * @returns Pole GPamtpomDto objektů pokud existují extra_data, jinak null
            * @throws Vyhodí spg_result pokud SPG procedura skončila chybou
        */
        static spg2ExtraData(cnt: GContent, spg_result: Pam.Interface.GSplResultDto, op: IGClientProgressOptions): Pam.Interface.GPamtpomDto[] | null;
        /**
         * Vytvoření okna pomocí frm
         * @param frm formulář
         * @param optDialog vlastnosti dialogu
         * @param cnt content, pokud není zadán, tak se vytvoří
         * @param data data, která se předávají do formuláře a po jeho vytvoření jsou nastavena do formuláře pomocí apply
         */
        WindowFromFrm(frm: Gordic.Forms.Form, optDialog?: GDlgOptions, cnt?: GContent, data?: any): JQuery<HTMLElement>;
        /**
        * Vytvoření MODÁLNÍHO - okna pomocí frm
        * @param frm formulář
        * @param optDialog vlastnoti dialogu
        * @param cnt content, pokud není zadán, tak se vytvoří
        * @param data data, která se předávají do formuláře a po jeho vytvoření jsou nastavena do formuláře pomocí apply
        */
        WindowFromFrmModal(frm: Gordic.Forms.Form, optDialog?: IPamDialogOptions, cnt?: GContent, data?: any): JQuery<HTMLElement>;
        /**
        * Vytvoření tabu pomocí DIVu nebo Formu
        * @param obj div nebo Form
        * @param uid uid
        * @param text text breadCrumbs
        * @param cnt content, pokud není zadán, tak se vytvoří
        */
        NewBreadCrumb(obj: JQuery<HTMLElement> | Gordic.Forms.Form, uid: string, text: string | undefined, type: "FORMS" | "DIV", cnt?: GContent): void;
        /**
       * Čekací dialog - zobrazí dialog pokud je condition true, jinak vrátí false a dialog se nezobrazí.
       * @param condition logický výraz - pokud je false, vrátí se false bez dialogu
       * @param title titulek dialogu pokud je dialog zobrazen
       * @param html text dialogu pokud je dialog zobrazen
       * @param width šířka (pokud není zadána, vypočítá se podle textu)
       * @param height výška (pokud není zadána, vypočítá se podle textu)
       * @returns Promise<boolean> vrací výsledek volby uživatele z dialogu nebo false
       */
        WaitForOK(condition: boolean, title: string, html: string, width?: number, height?: number): Promise<boolean>;
        /**
        * MessageBox s možností navázat formou promisse - velikost je tvořena dynamicky podle velikosti textu
        * @param title  titulek dialogu
        * @param html  text dialogu
        * @param width  šířka (pokud není zadána, vypočítá se podle textu)
        * @param height výška (pokud není zadána, vypočítá se podle textu)
        */
        MessageBox(title: string, html: string, width?: number, height?: number): Promise<boolean>;
        /**
        *
        * Zobrazí dialog s chybou, včetně detailních informací - rozpoznává i typ dialogu
        * @param error zachycená chyba, která se má zobrazit
        * @param title titulek dialogu
        * @param errorCode jedninečný kód chyby, který se zobrazí ( pokud je zadán)
        */
        ExceptionWindow(error: any, title: string, errorCode?: number): void;
        /**
         * Vypočítá rozměry dialogu podle obsahu
         * @param html obsah dialogu
         * @param width zadaná šířka
         * @param height zadaná výška
         * @returns [width, height]
         */
        private calculateDimensions;
        private createMeasurementElement;
        private calculateWidth;
        private calculateHeight;
        /**
        * ErrorBox s možností navázat formou promisse
            * @param text  text chybového dialogu*
            * @param title  titulek dialogu
        */
        ErrorBox(text: string, title?: string): JQueryPromise<boolean>;
        /**
           * @deprecated Použijte místo toho metodu DatumKonceVynucene()
         */
        VynuceneDatumKonce(pamDataType: IPamDataType, param: any, metoda: string): any;
        /**
             * @deprecated Použijte místo toho metodu HistorieObjektu()
         */
        Historie(pamDataType: Gordic.Pam.IPamDataType, param: any, metoda?: string): any;
        /**
          * @deprecated Použijte místo toho metodu PracovniDoba()
        */
        PlanPracovniDoby(ip_rok_obd_mzdy: number, ip_ixs_ppv: string, frmName: string, layoutdescriptor?: string): JQueryPromise<Gordic.Forms.Form | null>;
        /**
           * @deprecated Použijte místo toho metodu UcetniProfil()
          */
        UcetniProfilPAM(dataIn: Gordic.Pam.Interface.GUcetniVetaPAMDto, title?: string): any;
        /**
         * @deprecated Použijte místo toho metodu HistorieSlozek()
         */
        HistorieSlozky(typSlozky: string, ip_ixs_ppv: string, ip_por_cislo: number, ip_rok_obd_mzdy: number): any;
        /**
         * Vypočítá šířku sloupce na základě délky textu
         * @param textLength délka textu v pixelech
         * @param pixelsPerChar počet pixelů na znak
         * @param padding vnitřní odsazení
         * @param minWidth minimální šířka
         * @param maxWidth maximální šířka
         * @returns vypočítaná šířka sloupce
         */
        private calculateColumnWidth;
        /**
         * Vypočítá výšku dialogu na základě počtu řádků
         * @param rowCount počet řádků
         * @param rowHeight výška jednoho řádku
         * @param overhead režie (prostor nad a pod řádky)
         * @param minHeight minimální výška
         * @param maxHeight maximální výška
         * @returns vypočítaná výška dialogu
         */
        private calculateDialogHeight;
        /**
            * Zobrazí chyby předané jako parametr, zobrazí je v modálním okně +umožní uživateli buď pokračovat, nebo akci přerušit.
            *
            * @param chyby Pole chybových záznamů (GPamtpomDto), kde se rozlišuje závažnost (info, warning, error).
            * @param nezastavovatPriChybe Pokud je true, uživatel nebude moci přerušit akci (tlačítko "Přerušit" nebude dostupné)
            * @param optDialog Volitelné nastavení dialogu.
            * @param onSuccessResult Volitelný callback, který vrací hodnotu při úspěšném dokončení (výchozí: () => "OK").
            * @returns Promise, která se vyřeší objektem { result, error? }:
            *          - result: návratová hodnota z `onSuccessResult`
            *          - error: volitelný popis chyby
            *          - při přerušení se promise zamítne (reject) s hodnotou "DIALOG_KNT_CANCEL"
         */
        ZobrazChyby(typ: Pam.TypyZobrazeniChyb, chyby: Pam.Interface.GPamtpomDto[] | null | undefined, zastavovatPriChybe?: boolean, onSuccessResult?: () => any): Promise<{
            result: any;
            error?: string;
        }>;
        /**
         * Sesbírá data z formuláře do objektu
         * @param form formulář (JQuery objekt)
         * @returns objekt s nasbíranými daty
         */
        static CollectData(form: JQuery<HTMLElement>): Record<string, any>;
        /**
         * Validuje formulář
         * @param form formulář (JQuery objekt)
         * @returns true pokud je formulář validní, jinak false
         */
        static ValidateForm(form: JQuery<HTMLElement>): boolean;
    }
}
declare namespace Gordic.Pam {
    interface IPamReportObject {
        nazev: string;
        id_ses: string;
        ixs_alv: string;
        ixs_alf: string;
        ixs_str: string;
        platnost: string;
        serverParameterMethod: string;
        outputStyle?: string;
        customDto?: any;
    }
    class Reports {
        private _content;
        constructor(content: GContent);
        static readonly PAMKCH01_setting_ESU: IPamReportObject;
        static readonly ESPPIM02_esu: IPamReportObject;
        static readonly ESPPRA01_gfrm: IPamReportObject;
        static readonly PPPSKO01_setting_ESU: IPamReportObject;
        /**
        * konverze sestavaInfo do IPamReportObject pro GFRM
        * @param sestavaInfo
        * @param customDto  - uživatelská data, která se přenesou do X0001 a X0002
        * @returns
        **/
        static sestavaInfo2ReportObjectGFRM(sestavaInfo: Gordic.Pam.Interface.GSestavyInfoDto, customDto?: any): IPamReportObject;
        /**
         * Nalezení hodnoty položky  v GFRM dat struktuře
         * @param regions      pole regionů
         * @param regionName   název regionu
         * @param itemName       položka regionu
         * @returns [string]     textová hodnota
         */
        static findGfrItem(regions: Gordic.Pam.Interface.GFrmDataRegionDto[], regionName: string, itemName: string): string;
        /**
        * Nalezení položky v GFRM dat struktuře a transformace na date
        * @param regions      pole regionů
        * @param regionName   název regionu
        * @param itemName       položka regionu
        * @returns [string]     textová hodnota
        */
        static getGfrItemDate(regions: Gordic.Pam.Interface.GFrmDataRegionDto[], regionName: string, itemName: string): Date | null;
        /**
         * Konverze dat z GRFM formuláře do GFrmDataRegionDto[]
         * @param data dat z gfrm formuláře
         * @returns GFrmDataRegionDto[] objekt
         */
        static GFrmData2Regions(data: any): Gordic.Pam.Interface.GFrmDataRegionDto[];
        /**
         * Linearizace dat z GFRM fomuláře do jednoduché struktury
         * @param regions pole regionů GFrmDataRegionDto
         * @returns
         */
        static LinerarizeGFrmData(gfrmData: any): {
            region_name: string;
            item_name: string;
            hodnota: string;
        }[];
        /**
     * Transformace dat formuláře do struktury GFrmDataDto
     * @param reportObject objekt sestavy
     * @param data dat z gfrm formuláře
     * @returns GFrmDataDto objekt
     */
        static GFrmData2Dto(reportObject: IPamReportObject, data: any): Gordic.Pam.Interface.GFrmDataDto;
        /**
        * Vytvoření sestavy na pozadí
        * @param parentContent Rodičovská content
        * @param parmReportObj parametry pro reporter
        */
        GenerujSestavuNaPozadi(parmReportObj: IPamReportObject): Promise<void>;
        /**
         * Vytvoření sestavy na pozadí a uložení do ELE
         * @param parmReportObj Parametry pro reporter
         * @param ixs Identifikátor pro tabulku wflsesx
         * @param guidProgress GUID pro sledování stavu - nezahajuji ani jej  nekončím, to ponechávám na nadřazené metodě
         */
        GenerujSestavuDoELE(parmReportObj: IPamReportObject, ixs: string, guidProgress?: string | null): Promise<Gordic.Pam.Interface.GEleSouborDto>;
        /**
         * Zobrazení GFRM sestavy - vytáhne ji z databáze a nastaví požadované menu
         * @param parmReportObj IPamReportObject například PAMKCH01_setting_ESU
         * @param customDto GPamtpomDto přenese do X0001 a X0002
         */
        GFrmShow(parmReportObj: IPamReportObject, customDto: Gordic.Pam.Interface.GPamtpomDto): Promise<any>;
    }
}
declare namespace Gordic.Pam {
    class Kontroly {
        private _content;
        private _rok_obd_mzdy;
        /**
         * Konstruktor nastaví content a rok ob mzdy
         * @param content   content
         * @param rok_obd_mzdy kontrolované období

         */
        constructor(content: GContent, rok_obd_mzdy: number);
        /**
         * Vykonání vybrané množiny kontrolních chodů
         * @param ixs_kch identifikace KCH
         * @param skupina za kterou se tvoří KCH. Pokud se jedná o osoby je nutné mít tyto vložené v db
         */
        RunKCH(ixs_kch: string, skupina: Pam.Interface.GKChMnozinaTyp): JQueryPromise<any>;
    }
}
declare namespace Gordic.Pam {
    enum TypyAkci {
        unknown = "unknown",
        systemovy_zamek_odemkni = "systemovy_zamek_odemkni",
        prumery_vypocet = "prumery_vypocet",
        prumery_zapis = "prumery_zapis",
        zalohy_vypocet = "zalohy_vypocet",
        vyuctovani_vypocet = "vyuctovani_vypocet",
        rzd_vypocet = "rzd_vypocet",
        rzd_zapis = "rzd_zapis",
        kch1_krok = "kch1_krok",
        kch2_krok = "kch2_krok"
    }
    interface AkceSetting {
        islObject: string;
        islMethod: string;
        popis: string;
        successMsg: string;
        errorMsg: string;
        typ: TypyAkci;
    }
    class Actions {
        private static __static_ctor;
        static notImplemented(Content: GContent, name?: string, caption?: string, favorite?: boolean, visible?: boolean, enabled?: boolean): GAction;
        /**
         * Otevření odkazu v nové okně
         * @param url - adresa odkazu
         * @param caption - popis, pokud není uveden, použije se url
         * @param name - název akce, pokud není uvedena je vygenerována
         * @param ikona - ikona - [bez ikony]
         * @param visible - viditelnost [true]
         * @param enabled - enabled     [true]
         */
        static openLinkNewWindow(url: string, caption?: string | undefined | null, name?: string | undefined | null, ikona?: string | undefined | null, visible?: boolean, enabled?: boolean): GAction;
        /**
         * akce na tlačítko cancel v dialogu
         * */
        static dlgCancelAct(close?: boolean): GAction;
        /**
         * akce na tlačítko Pokračovat v dialogu
         * */
        static dlgContinue(): GAction;
        /**
         * akce pro kopírování do schránky
         * @param text Text pro zkopírování do schránky
         * @param avizace zda zobrazit avízovací hlášku o úspěšném zkopírování (defaultně false)
         * @returns
         */
        static copyToClipboard(text: string, avizace?: boolean): GAction;
        /**
         * Zapnutí / vypnutí akce na základě db parametru
         * @param Content conten
         * @param actName jméno akce na kontentu
         * @param parName název parametru
         * @param okValue pole hodnot představující "povolení"
         */
        static check(Content: GContent, actName: string, parName: string, okValues: string[] | string): false | undefined;
        /**
         * Hromadné povolení/zakázání akcí - nastaví visible a enable
         * @param Content content
         * @param actionsNames pole s názvy akcí
         * @param povol  true povolení  false zakázání
         */
        static povolAkce(Content: GContent | undefined, actionsNames: string[], povol?: boolean): void;
        /**
         * Hromadné povolení/zakázání akcí - enable
         * @param Content content
         * @param actionsNames pole s názvy akcí
         * @param povol  true=enabled  false=disabled
         */
        static enable(Content: GContent | undefined, actionsNames: string[], povol?: boolean): void;
        /**
         * Hromadné povolení/zakázání akcí - visible
         * @param Content content
         * @param actionsNames pole s názvy akcí
         * @param povol  nastavení visible
         */
        static visible(Content: GContent | undefined, actionsNames: string[], povol?: boolean): void;
        /**
         * Testování pokusu o opuštění stránky. Pokud má nastaveno taskRunningTxt na nějakou textovou hodnotu, tak se nezdaří.
         * Tato proměnná se zároveň zobrazí jako důvod, proč se stránka nedá opustit
         * @param cnt Content
         */
        static testLeavePage(cnt: GContent): JQuery.Promise<any, any, any>;
        /** nastaví odznáček na menu
         * @param cnt gcontent
         * @param {string} taskId identifikace úlohy
         * @param {string} value hodnota
         * @param {string|undefined} tooltip tooltip
         * @author rdusek
         */
        static nastavOdznacekMenu(cnt: GContent, taskId: string, value: string, tooltip?: string): void;
        /** nastaví odznáček na statickém menu
        * @param cnt gcontent
        * @param {string} taskId identifikace úlohy
        * @param {string} value hodnota
        * @param {string|undefined} tooltip tooltip
        * @author rdusek
        */
        static nastavOdznacekStaticMenu(cnt: GContent, taskId: string, value: string, tooltip?: string): void;
        /**
         * Zjištění nastavení akce podle typu akce
         * @returns {AkceSetting} nastavení akce
         */
        static setting(value: TypyAkci): AkceSetting;
    }
}
declare namespace Gordic.Pam {
    class Validators {
        private static __static_ctor;
        static Ziskej_ixs_ppv(lokace: string, data: object | undefined): string;
        static Ziskej_rok_obd_mzdy(lokace: string, data: object | undefined): number;
        /**
        * Validace hodnoty roku
        * - povinnost
        * - rozsah 1900–2050
        */
        static rok: (Validators.Required | Validators.Range)[];
        /**
         * Validace hodnoty - všeobecný string ID
         * @author TVitek
         * @date 01.01.2022
         */
        static ppp_id_str(id_length: number): Gordic.Validators.ValidatorOptions[];
        /**
         * Validace hodnoty - telefonu
         * @author TVitek
         * @date 01.01.2022
         */
        static Telefon: Gordic.Validators.ValidatorOptions;
        /**
         * Validace hodnoty - emailu
         * @author TVitek
         * @date 01.01.2022
         */
        static Email: Gordic.Validators.ValidatorOptions;
        /**
         * Validace hodnoty - datumu (rozsahu a intervalu)
         * @author TVitek
         * @date 31.05.2024
         * @param date_min Hodnota minimálního datumu
         * @param date_max Hodnota maximálního datumu
         * @param field_mode Příznak jestli je pole začátek (od) nebo konec (do)
         * @param field_dependency Název pole které je v intervalové vazbě
         */
        static Datum(date_min: Date | "default", date_max: Date | "default", field_mode?: "begin" | "end" | undefined, field_dependency?: string | undefined): Gordic.Validators.ValidatorOptions;
        /**
         * Validace hodnoty - HH:MM
         * @author zmolik
         * @date 09.08.2024
         */
        static HHMM: Gordic.Validators.ValidatorOptions;
        static clear(fields: JQuery<HTMLElement>[]): void;
    }
}
/**
 * Startup pro PAM
 * Inicializuje globální úložiště PAM_CACHE hodnotami z GInitPamDto.
 *
 * @author ZMOLIK
 */
declare namespace Gordic.Pam {
    /**
     * Společná inicializace modulů PAM - prvotní nastavení PAM_CACHE.
     * Pokud PAM_CACHE ještě neexistuje, vytvoří se nová instance.
     * Do PAM_CACHE se uloží hodnoty z předaného DTO.
     *
     * @param dto Data pro inicializaci typu GInitPamDto
     */
    function Init(dto: Gordic.Pam.Interface.GInitPamDto): void;
}
/**
 * Nastavení pro PAM
 */
declare namespace Gordic.Pam.Settings {
    interface IPamSetting {
        displayLevelESU: (1 | 2 | undefined);
        displayLevelPPV: (1 | 2 | undefined);
        displayLevelExekuce: (1 | 2 | undefined);
        displayLevelDuchody: (1 | 2 | undefined);
        pouzePlatnePpv: boolean;
        pouzePlatneAdresy: boolean;
        pouzePlatneExekuce: boolean;
        pouzePlatneExekuceNavazaneOsoby: boolean;
        pouzePlatneExekuceUrcenaNezabavitelnaCastka: boolean;
        pouzePlatneOdpocetMesicni: boolean;
        pouzePlatneOdpocetRocni: boolean;
        pouzePlatnePersonalniUdaje: boolean;
        pouzePlatnePrumer: boolean;
        pouzePlatnePrumerPodklad: boolean;
        pouzePlatnePrumerVypocteny: boolean;
        pouzePlatnePrumerZapsany: boolean;
        pouzePlatneSrazky: boolean;
        pouzePlatneMesicniZmena: boolean;
        pouzePlatneTrvaleSlozky: boolean;
        pouzePlatneVypocteneSlozky: boolean;
        pouzePlatneZdravotniPojisteni: boolean;
        pouzePlatneZpusobZdaneni: boolean;
        pouzePlatneZpusobZdaneniKorekce: boolean;
        povolitRocniKorekce: boolean;
        povolitZpusobZdaneniKorekce: boolean;
        ukazovatSluzebniCislo: boolean;
        pouzePlatneDuchody: boolean;
        pouzePlatneDuchodyZastaveniVyplaty: boolean;
        vychoziTabEsu: string;
        vychoziTabPpv: string;
        pouzePlatneZmeny: boolean;
        pouzePlatneSP: boolean;
        pouzePlatneZP: boolean;
        pouzePlatneVyneti: boolean;
        pouzePlatneCviceni: boolean;
        pouzePlatneMise: boolean;
        pouzePlatneMiseZmeny: boolean;
        pouzePlatneDohodyZmeny: boolean;
        pouzePlatneNzzn: boolean;
        pouzePlatneNzznDetail: boolean;
        pouzePlatneRozsirujiciUdajePpv: boolean;
    }
}
declare namespace Gordic.Pam.WebControls.Forms {
    class AktivniPrehled extends GContentBase {
        /**
         * Vytvoří formulář pro aktivní přehled
         *
         * @author  ZMOLIK
         * @date    18.01.2024
         *
         * @param {?{name: string},?{layoutDescriptor: string}, } options Parametry formuláře.
         *
         * @returns {{IPamFormObject}} PamFormObject
         */
        static createForm(parentDIV: JQuery<HTMLElement>, options?: {
            name?: string;
            layoutDescriptor?: string;
        }): Promise<JQueryPromise<JQuery<HTMLElement>>>;
    }
}
declare namespace Gordic.Pam.WebControls.Forms {
    class DokumentySYM extends GContentBase {
        /**
         * Vytvoří formulář pro dokumenty systemizovaného místa
         *
         * @author  ZMOLIK
         * @date  22.02.2024
         *
         * @param cnt parent content
         * @param ixs_sym identifikace SYM
         * @param {?{name: string},?{layoutDescriptor: string}, } options Parametry formuláře.
         * @returns
         */
        static createForm(cnt: GContent, ixs_sym: string, options?: {
            name?: string;
            layoutDescriptor?: string;
        }): JQueryPromise<{
            form: Gordic.Forms.Form;
            grid_customclass: string;
        }>;
    }
}
declare namespace Gordic.Pam.WebControls {
    interface PamPoznamkyOptions {
        /** SXS */
        sxs: string;
        /** Typ objektu */
        typ_obj: number;
        /** Content */
        cnt: GContent;
        /** ID panelu */
        idPanelu?: string;
        /** Název panelu */
        nazevPanelu?: string;
    }
    /** Poznámky PAM.
     * Editaci řídí patrametr GIN - Režim editace uživatelských poznámek (gin_rez_pozn)
     */
    class PamPoznamky {
        private sxs;
        private typ_obj;
        private cnt;
        private idPanelu?;
        private nazevPanelu?;
        private panel;
        private gnotePanel;
        private poznamkyCount;
        constructor(options: PamPoznamkyOptions);
        private createPoznamky;
        getSidePanel(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem adres osoby
    */
    class Adresy extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení atributů
    */
    class Atributy extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona  pro zobrazení gridu s cvičeními
    */
    class Cviceni extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu s změnami dohod
    */
    class DohodaZmeny extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem důchodů osoby
    */
    class Duchody extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem zastavení výplaty důchodu osoby
    */
    class DuchodyZastaveniVyplaty extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem exekucí dané osoby
    */
    class Exekuce extends Gordic.Pam.SeznamBase {
        private static instance;
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem splátek exekuce
    * - zatím nepoužito, jelikož jsem použil jednotné řešení ve formě okna volaného z menu nad seznamem Exekucí (stejně jako u srážek) Gordic.Pam.Forms(Content).HistorieSlozky
    */
    class ExekuceHistorieSplatek extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro seznam exekucí navázané osoby
    */
    class ExekuceNavazaneOsoby extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem nesplacených částek exekuce
    */
    class ExekuceNesplaceneCastky extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem určených nezabavitelných částek exekuce
    */
    class ExekuceUrcenaNezabavitelnaCastka extends Gordic.Pam.SeznamBase {
        private static sez;
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem kalendářů
     */
    class Kalendar extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem kalendářů
     */
    class KalendarDny extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem kontrol
     */
    class Kontrola extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem kroků kontroly
     */
    class KontrolaKrok extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem měsíčních změn vybraného PPV
    */
    class MesicniZmeny extends Gordic.Pam.SeznamBase {
        static TRACER: Diagnostics.GLog;
        private TR;
        private formBylVytvoren;
        private jePrvniVytvoreni;
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
        /**
        * Otevření formuláře s výběrem složky mzdy pro vytvoření nové měsíční změny
        * @param {GContent} cnt gcontent
        * @param {string} ixs_ppv Identifikace PPV
        * @param {number} rok_obd_mzdy Období mzdy
        * @returns {Promise<any>}
        */
        OtevriVyberSlozky(cnt: GContent, ixs_ppv: string, rok_obd_mzdy: number): Promise<any>;
        /**
         * Sestavení formuláře měsíční změny.
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto Přepodkládá vyplněné dto minimálně ixs_ppv a rok_obd_mzdy
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} promise s formulářem a DTO
         */
        SestavFormular(cnt: GContent, dto: Gordic.Pam.Interface.GMesicniZmenaDto, cmd: Gordic.Pam.IPamSeznamBaseCommand): Promise<{
            form: Gordic.Forms.Form | null;
            dto: Gordic.Pam.Interface.GMesicniZmenaDto;
        }>;
        /**
        * Vytvoření dynamické části formuláře měsíční změny.
        * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto Přepodkládá vyplněné dto minimálně ixs_ppv, rok_obd_mzdy, slozka_mzdy a typ_frm
        * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
        * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} promise s formulářem a DTO
        */
        private _MesicniZmenaVytvorForm;
        /**
         * Přepočítání a případná úprava dynamické části formuláře měsíční změny.
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto Předpokládá vyplněné dto minimálně ixs_ppv a rok_obd_mzdy
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>}
         */
        private _MesicniZmenaPrepocitejForm;
        /**
        * Vytvoření společné části všech formulářů (spodní část pod dynamickou částí)
        * @param {GContent} cnt hlavní content
        * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
        * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
        * @returns {Promise<Gordic.Forms.Form>}
        */
        private _MesicniZmenaVytvorFormSpolecny;
        /**
         * Přepočítání a případná úprava společné části všech formulářů (spodní část pod dynamickou částí)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} _cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>}
         */
        private _MesicniZmenaPrepocitejFormSpolecny;
        /**
         * Vytvoření dynamické části formuláře A - Kč (100,102)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormA;
        /**
         * Přepočítání a případná úprava dynamické části formuláře A - Kč (100,102)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>}
         */
        private _MesicniZmenaPrepocitejFormA;
        /**
         * Vytvoření dynamické části formuláře B - Úkolová (120)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>}
         */
        private _MesicniZmenaVytvorFormB;
        /**
         * Přepočítání a případná úprava dynamické části formuláře B - Úkolová (120)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormB;
        /**
         * Vytvoření dynamické části formuláře C - Časová (140,145,150)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormC;
        /**
         * Přepočítání a případná úprava dynamické části formuláře C - Časová (140,145,150)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormC;
        /**
         * Vytvoření dynamické části formuláře D - Interval. (105,160,161,162,163,165,170,175,173,260,265,270,273,275)
         * Formulář se dvěma sekcemi.
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormD;
        /**
         * Přepočítání a případná úprava dynamické části formuláře D - Interval. (105,160,161,162,163,165,170,175,173,260,265,270,273,275)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormD;
        /**
         * Vytvoření dynamické části formuláře E - Srážky (180,181,183,184,185)
         * Formulář se dvěma sekcemi.
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormE;
        /**
        * Přepočítání a případná úprava dynamické části formuláře E - Srážky (180,181,183,184,185)
        * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
        * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
        * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>}
        */
        private _MesicniZmenaPrepocitejFormE;
        /**
        * Vytvoření dynamické části formuláře F - Dny (200)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormF;
        /**
         * Přepočítání a případná úprava dynamické části formuláře F - Dny (200)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormF;
        /**
         * Vytvoření dynamické části formuláře G - Procenta (220)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormG;
        /**
         * Přepočítání a případná úprava dynamické části formuláře G - Procenta (220)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormG;
        /**
         * Vytvoření dynamické části formuláře H - Cizí měna + trvalé složky (190)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormH;
        /**
         * Přepočítání a případná úprava dynamické části formuláře H - Cizí měna + trvalé složky (190)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormH;
        /**
         * Vytvoření dynamické části formuláře I - Kč + vypočtená složka (110)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormI;
        /**
         * Přepočítání a případná úprava dynamické části formuláře I - Kč + vypočtená složka (110)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormI;
        /**
         * Vytvoření dynamické části formuláře J - Intervalový s měs. kalendářem a dopočtem částky (168)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormJ;
        /**
         * Přepočítání a případná úprava dynamické části formuláře J - Intervalový s měs. kalendářem a dopočtem částky (168)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormJ;
        /**
         * Vytvoření dynamické části formuláře K - Srážky s dopočtem částky (182)
         * Formulář se dvěma sekcemi
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormK;
        /**
         * Přepočítání a případná úprava dynamické části formuláře K - Srážky s dopočtem částky (182)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormK;
        /**
         * Vytvoření dynamické části formuláře L - Intervalový s měs. kalendářem bez částek a sazeb - pouze Od - Do (164)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormL;
        /**
         * Přepočítání a případná úprava dynamické části formuláře L - Intervalový s měs. kalendářem bez částek a sazeb - pouze Od - Do (164)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormL;
        /**
         * Vytvoření dynamické části formuláře M - Časový s intervalem. Při změně intervalu se nemění hodnoty počet dní a počet hodin (155)
         * @param {GContent} cnt hlavní content
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaVytvorFormM;
        /**
         * Přepočítání a případná úprava dynamické části formuláře M - Časový s intervalem. Při změně intervalu se nemění hodnoty počet dní a počet hodin (155)
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto DTO měsíčních změn
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
         * @returns {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
         */
        private _MesicniZmenaPrepocitejFormM;
        /**
         * Synchronizuje příznak vytvoření formuláře mezi instancí třídy a DTO.
         *
         * Nastaví hodnotu příznaku `formBylVytvoren` v aktuální instanci a zároveň
         * nastaví hodnotu `formular_byl_vytvoren` v předaném DTO objektu.
         *
         * @param {Gordic.Pam.Interface.GMesicniZmenaDto} dto - DTO měsíční změny, do kterého se synchronizuje stav vytvoření formuláře.
         * @param {boolean} value - Hodnota příznaku, která se má nastavit.
         */
        private nastavPriznakFormularVytvoren;
        /**
        * Zpracování změny hodnoty editačního pole.
        *
        * Tato metoda zpracovává změnu hodnoty editačního pole ve formuláři.
        * Pokud je formulář vytvořen a nová hodnota není null, aktualizuje DTO o novou hodnotu,
        * nastaví příznaky pro přepočet a případně zavolá callback pro přepočet formuláře.
        *
        * @param {any} ctx - Kontext, obvykle instance třídy obsahující stav formuláře.
        * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
        * @param {JQueryEventObject} ev - Událost změny pole.
        * @param {any} changeObj - Objekt obsahující novou hodnotu pole.
        * @param {boolean} prepocitatMz - Příznak, zda se má provést přepočet MZ pomocí procedury.
        * @return {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
        */
        private zpracujBoxChange;
        /**
        * Zpracování změny hodnoty checkboxu.
        *
        * Tato metoda zpracovává změnu hodnoty checkboxu ve formuláři. Na základě nové hodnoty
        * rozhodne, zda se má provést přepočet formuláře, a nastaví fokus na odpovídající pole.
        *
        * @param {any} ctx - Kontext, obvykle instance třídy obsahující stav formuláře.
        * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd příkaz, který se vykonává INSERT, UPDATE, DELETE
        * @param {JQueryEventObject} ev - Událost změny checkboxu.
        * @param {any} changeObj - Objekt obsahující novou hodnotu checkboxu.
        * @param {string} nazevSouvisejicihoPole - Název souvisejícího pole, na které se má nastavit fokus, pokud je checkbox zaškrtnutý.
        * @param {boolean} prepocitatMzPriZaskrtnuti - Přepočítat měsíční změnu při zaškrtnutí checkboxu.
        * @param {boolean} prepocitatMzPriOdskrtnuti - Přepočítat měsíční změnu při odškrtnutí checkboxu.
        
        * @return {Promise<{ form: Gordic.Forms.Form | null, dto: Gordic.Pam.Interface.GMesicniZmenaDto }>} Promise s formulářem a DTO
        */
        private zpracujCbxChange;
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona  pro zobrazení gridu s misemi
    */
    class Mise extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona  pro zobrazení gridu s změnami misí
    */
    class MiseZmeny extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem NKS
     */
    class NKS extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem NZŽN
    */
    class Nzzn extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem NZŽN - Detail
    */
    class NzznDetail extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu s měsíčními daňovými odpočty
    */
    class OdpoctyMesicni extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
        /**
         * Dynamické sestavení formuláře
         * @param {GContent} cnt content
         * @param {Gordic.Pam.Interface.GOdpocetMesicniDto} dto
         * @param {Gordic.Pam.IPamSeznamBaseCommand} cmd
         * @returns {JQueryPromise<any>}
         */
        SestavFormular(cnt: GContent, dto: Gordic.Pam.Interface.GOdpocetMesicniDto, cmd: Gordic.Pam.IPamSeznamBaseCommand): Promise<any>;
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu s měsíčními daňovými odpočty
    */
    class OdpoctyRocni extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions, povolitRocniKorekce: boolean);
        private korekce2FieldValue;
        private field2KorekceValue;
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem osobních údajů
    */
    class OsobniUdaje extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení seznamu osob v modulu ESP
    */
    class OsobyEsp extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení seznamu osob v modulu ESP - evidenční PPV
    */
    class OsobyEspEPP extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem PPV
    */
    class PPV extends Gordic.Pam.SeznamBase {
        private static instance;
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
        /**
         * Filtruje pole šablony - odstraní povinná pole, která jsou null
         */
        private filtrujPoleSablony;
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona  pro zobrazení gridu s personálními údaji
    */
    class PersonalniUdaje extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu s platbami osoby
     */
    class PlatbyOsoby extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem podřízených
    */
    class PodrizeneOsoby extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona  pro zobrazení gridu s personálními údaji
    */
    class Projekty extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu protokolem výpočtu srážek
     */
    class ProtokolVypoctuSrazek extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem průměrů
     */
    class Prumer extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem podkladů průměrů
     */
    class PrumerPodklad extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem vypočtených průměrů
     */
    class PrumerVypocteny extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem zapsaných průměrů
     */
    class PrumerZapsany extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem rozpisu pracovní doby pro období a PPV
    */
    class RozpisPracovniDobyPpv extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu s rozšiřujícími údaji PPV
    */
    class RozsirujiciUdajePpv extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem srážek vybraného PPV
    */
    class Srazky extends Gordic.Pam.SeznamBase {
        private static instance;
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem zadaných (trvalých) složek vybraného PPV
    */
    class TrvaleSlozky extends Gordic.Pam.SeznamBase {
        private static instance;
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem cizích účtů
     */
    class UcetCizi extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem vlastních účtů
     */
    class UcetVlastni extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem vynětí
    */
    class Vyneti extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
/**
 * Šablona pro zobrazení gridu se seznamem vypočtených složek vybraného PPV
 */
declare namespace Gordic.Pam.Seznam {
    class VypocteneSlozky extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         * @re
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
    * Šablona pro zobrazení gridu se seznamem zdravotních pojišťoven osoby
    */
    class ZdravotniPojisteniOsoby extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     *  Šablona pro zobrazení gridu se seznamem způsobu zdanění
     */
    class ZpusobZdaneni extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions);
    }
}
declare namespace Gordic.Pam.Seznam {
    /**
     * Šablona pro zobrazení gridu se seznamem korekce způsobu zdanění
     */
    class ZpusobZdaneniKorekce extends Gordic.Pam.SeznamBase {
        /**
         * Konstruktor
         * @param {GContent} parentContent Parent content
         * @param {IPamSeznamBaseOptions} userSetting Uživatelské nastavení, které přepíše / doplní implicitní nastavení
         * @param {boolean} povolitZpusobZdaneniKorekce příznak pro povolení nebo zakázání korekcí
         */
        constructor(parentContent: GContent, userSetting: IPamSeznamBaseOptions, povolitZpusobZdaneniKorekce: boolean);
    }
}
declare namespace Gordic.Pam.WebControls {
    class GServis extends GContentBase {
        static NazvyAkci: {
            LoadDLLInfoAct: string;
            LoadSestavyInfoAct: string;
            DebugSwitchAct: string;
            ExportPAMLOG: string;
            CistkaPAMLOG: string;
            akceVytvoritZda: string;
            akcePiskoviste: string;
            Automat: string;
            akcePiskovisteSlozkaMzdy: string;
            akcePiskovistePrefaby: string;
            akcePiskovistePrefabyAutoload: string;
            akcePiskovisteZM: string;
            AktivniPrehledAct: string;
            akcePiskovisteTaby: string;
        };
        static NazvyGridu: {
            dllGrid: string;
            sestavyGrid: string;
        };
        protected pam_servis_wk: number;
        private viewDll;
        private DebugOn;
        private rok_obd_mzdy;
        onContentReady(): void;
        private createForm;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Nastaví badge u tasku servis
         * @deprecated Použijte Pam.Actions.nastavOdznacekMenu
         */
        private NastavTaskBadge;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GAktivniPrehled extends GContentBase {
        private formular;
        private grid;
        onContentReady(): Promise<void>;
        /**
        * Sestavení akcí
        */
        private vytvorAkce;
        /**
        * Vytvoření menu baru
       * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GAutomat extends GContentBase {
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GAutomatVysledek extends GContentBase {
        private tabmanager;
        onContentReady(): void;
        /**
         * Vytvoření FRM na základě dat
         * @param data
         */
        VytvorForm(data: Gordic.Pam.Interface.GPamtladDto[]): Gordic.Forms.Form;
        /**
         * Na základě dat sestaví sloupce gridu - vyháže ty, které neobsahují žádnou hodnotu
         * @param data Gordic.Pam.Interface.GPamtladDto[]
         * @returns pouze sloupce gridu, které mají data
         */
        SestavSloupce(data: Gordic.Pam.Interface.GPamtladDto[]): Gordic.Pam.IPamColumn[];
        /**
         * Získání zobrazovaných dat. Podle výskytu počtu err_code případně provede grupování
         * @param data
         * @returns
         */
        ZobrazovanaData(data: Gordic.Pam.Interface.GPamtladDto[]): Gordic.Data.View | Gordic.Pam.Interface.GPamtladDto[];
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPiskovistePrefaby extends GContentBase {
        static TRACER: Diagnostics.GLog;
        private _TR;
        private _seznamZP;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPiskovistePrefabyAutoload extends GContentBase {
        static NazvyAkci: {
            Insert1: string;
            Insert2: string;
            TestZM: string;
            TestZM2: string;
            Dump: string;
            TestTV: string;
        };
        private rok_obd_od;
        static TRACER: Diagnostics.GLog;
        private _TR;
        dataPlatTabulkaTridaStupen: Interface.GPamtsdaDto[];
        onContentReady(): Promise<void>;
        /**
         * Načtení dat pro trojcombo platTabulkaTridaStupen
         * @param datum Datum platnosti záznamů
         */
        nactiDataPlatTabulkaTridaStupen(datum: Date): Promise<void>;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPiskovisteSlozkaMzdy extends GContentBase {
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPiskovisteTaby extends GContentBase {
        private divMain;
        private GenerovatMin;
        private GenerovatMax;
        private GenerovatGrid;
        private GenerovatForm;
        generateRandomNumber(min: number, max: number): number;
        generateRandomLengthArray(min: number, max: number): {
            id: number;
        }[];
        onContentReady(): void;
        AddGrid(element: JQuery<HTMLElement>, name: string): JQuery<HTMLElement>;
        Priklad_TabManager1x(): void;
        Priklad_TabManager2x(): void;
    }
}
declare namespace Gordic.Pam.WebControls {
    class GPiskovisteZM extends GContentBase {
        static NazvyAkci: {
            Insert1: string;
            Apply1: string;
            Apply2: string;
            RCN: string;
            RCN1: string;
            RCN2: string;
            RCN_list: string;
            RCN_list_vyplatkovy: string;
            RCN_readPPV: string;
            Chyby: string;
            ChybaString: string;
            ChybaError: string;
            ChybaGError: string;
            ChybaSPG: string;
            ChybaExceptionInfo: string;
            ChybaExceptionInfoMinimal: string;
            PrijemDokladu: string;
            Dump: string;
        };
        private rok_obd_od;
        static TRACER: Diagnostics.GLog;
        private _TR;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
    }
}
