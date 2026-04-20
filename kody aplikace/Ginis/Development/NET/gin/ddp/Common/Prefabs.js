"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GridFormats.ts                         </Name>
//    <Description> Prefaby a jejich nastavení pro modul DDP                    </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var Prefabs;
                (function (Prefabs) {
                    //#region Chceckboxy s hodnotami 1/0 a 10/0
                    /**
                     * Prefab pro nastavení checkboxu s hodnotami 1 / 0
                     * @returns {GCheckOptions} Přednastavené možnosti pro checkbox
                     */
                    function Checkbox() {
                        return {
                            emptyValue: null,
                            modelValueTransform: {
                                apply: function (modelValue) { return modelValue === 1; },
                                collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                            }
                        };
                    }
                    Prefabs.Checkbox = Checkbox;
                    /**
                     * Prefab pro nastavení checkboxu s hodnotami 10 / 0
                     * @returns {GCheckOptions} Přednastavené možnosti pro checkbox
                     */
                    function Checkbox0_10() {
                        return {
                            emptyValue: null,
                            modelValueTransform: {
                                apply: function (modelValue) { return modelValue === 10; },
                                collect: function (fieldValue) { return fieldValue === true ? 10 : 0; }
                            }
                        };
                    }
                    Prefabs.Checkbox0_10 = Checkbox0_10;
                    function znam() {
                        return {
                            data: new Gordic.Data.View([
                                {
                                    znam: 1,
                                    znam_txt: "+1"
                                },
                                {
                                    znam: -1,
                                    znam_txt: "-1"
                                }
                            ], { key: "znam" }),
                            itemTemplate: (val) => {
                                return val == null ? "" : val.znam_txt;
                            },
                            name: "znam",
                            model: "model.znam=value.znam",
                            dropdown: true
                        };
                    }
                    Prefabs.znam = znam;
                    function prizPocatek() {
                        return {
                            data: new Gordic.Data.View([{
                                    priz_pocatek: 0,
                                    priz_pocatek_txt: "Běžný krok"
                                }, {
                                    priz_pocatek: 1,
                                    priz_pocatek_txt: "Inicializační krok"
                                },
                                {
                                    priz_pocatek: 2,
                                    priz_pocatek_txt: "Redistribuční krok"
                                }], { key: "priz_pocatek" }),
                            itemTemplate: (val) => {
                                return val == null ? "" : val.priz_pocatek_txt;
                            },
                            name: "priz_pocatek",
                            model: "model.priz_pocatek=value.priz_pocatek",
                            dropdown: true
                        };
                    }
                    Prefabs.prizPocatek = prizPocatek;
                    /** Prefab pro select box se stavy lhůty (Používá se v okne GSeznamUkonu)
                     *  name: "stav_lhuty",
                     *  model: "model.stav_lhuty=value.stav_lhuty",
                     *  dropdown: true
                     * @returns {GSelectBoxOptionsSingle<IStavLhuty>} Přednastavený prefab s naplněnými daty
                     */
                    function stavLhuty() {
                        return {
                            data: new Gordic.Data.View([
                                { stav_lhuty: 0, stav_lhuty_txt: "Lhůta není definovaná" },
                                { stav_lhuty: 1, stav_lhuty_txt: "Lhůta není třeba (je zaplaceno)" },
                                { stav_lhuty: 2, stav_lhuty_txt: "Je před upozorněním, jsou všechna vymáhání" },
                                { stav_lhuty: 3, stav_lhuty_txt: "Je před upozorněním, nejsou všechna vymáhání" },
                                { stav_lhuty: 4, stav_lhuty_txt: "Je před vypršením lhůty, jsou všechna vymáhání" },
                                { stav_lhuty: 5, stav_lhuty_txt: "Je před vypršením lhůty, nejsou všechna vymáhání" },
                                { stav_lhuty: 6, stav_lhuty_txt: "Je po vypršením lhůty, jsou všechna vymáhání" },
                                { stav_lhuty: 7, stav_lhuty_txt: "Je po vypršením lhůty, nejsou všechna vymáhání'" }
                            ], { key: "stav_lhuty" }),
                            itemTemplate: (val) => {
                                return val == null ? "" : val.stav_lhuty_txt;
                            },
                            name: "stav_lhuty",
                            model: "model.stav_lhuty=value.stav_lhuty",
                            dropdown: true
                        };
                    }
                    Prefabs.stavLhuty = stavLhuty;
                    /** Prefab pro select box s typy úkonů (Používá se v okne GNastaveniUkonu)
                     *  name: "typ_uko",
                     *  model: "model.typ_uko=value.typ_uko",
                     *  dropdown: true,
                     * @returns {GSelectBoxOptionsSingle<ITypUkonu>} Přednastavený prefab s naplněnými daty
                     */
                    function typUkonu() {
                        return {
                            data: new Gordic.Data.View([
                                { typ_uko: 0, typ_uko_txt: "Pozastavení" },
                                { typ_uko: 10, typ_uko_txt: "Přerušení" },
                                { typ_uko: 20, typ_uko_txt: "Zneplatnění" },
                                { typ_uko: 30, typ_uko_txt: "Ukončení" }
                            ], { key: "typ_uko" }),
                            itemTemplate: (val) => {
                                return val == null ? "" : val.typ_uko_txt;
                            },
                            name: "typ_uko",
                            model: "model.typ_uko=value.typ_uko",
                            dropdown: true,
                        };
                    }
                    Prefabs.typUkonu = typUkonu;
                    //#endregion Typ úkonu
                    //#region VS pole a validace
                    /**
                     * Funkce pro definování nastavení <GStringBoxOptions> políčka s Variabliním symbolem VS
                     * @param priz_rzv Příznak rezervace (potřebný pro správnou validaci)
                     * @returns GStringBoxOptions vč. tlačítka s akcí pro zkopírování textu do clipboardu
                     */
                    function VSField(priz_rzv) {
                        return addCopyToClipboardButton(VSFieldDefine(priz_rzv));
                    }
                    Prefabs.VSField = VSField;
                    /**
                     * Funkce pro definování nastavení <GStringBoxOptions> políčka s Variabliním symbolem VS
                     * @param priz_rzv Příznak rezervace (potřebný pro správnou validaci)
                     * @returns GStringBoxOptions
                     */
                    function VSFieldDefine(priz_rzv) {
                        return {
                            name: "vs", //vs
                            tooltip: "",
                            tag: {
                                text: "",
                                state: "info",
                            },
                            allowedChars: "0123456789*",
                            validators: [
                                new Gordic.Validators.Length({ max: 12 }),
                                new Gordic.Validators.Base({
                                    validate: function (MyValue, source) {
                                        let l_vs;
                                        let fMaska = true;
                                        // Trim the input value
                                        MyValue = MyValue.trim();
                                        l_vs = MyValue;
                                        // If the last character is '*'
                                        if (l_vs.charAt(l_vs.length - 1) === '*') {
                                            // If fMaska is false, show an error message and return false
                                            if (!fMaska) {
                                                this.errorType = "error";
                                                this.message = 'Zadaná hodnota obsahuje znak *, který není povoleno zadávat!';
                                                this.stopping = true; // evidence bude zakázána
                                                return false;
                                            }
                                            // Remove the '*' for number validation
                                            l_vs = l_vs.slice(0, -1);
                                        }
                                        var isValidNumber = (value) => {
                                            return !isNaN(Number(value));
                                        };
                                        if (!isValidNumber(l_vs) && l_vs.length > 0) {
                                            this.errorType = "error";
                                            this.message = 'Chybně vyplněné pole, musí být zadaná číselná hodnota!';
                                            this.stopping = true; // evidence bude zakázána
                                            return false;
                                        }
                                        return true;
                                    }
                                }),
                            ],
                            change: function (ev, ctx) {
                                //that.validaceVS(ctx.value!, true);
                                testVS(this, ctx.value, priz_rzv);
                            },
                        };
                    }
                    ///**
                    // * Prefab pro evidenční číslo
                    // * 
                    // * @param {GStringBoxOptions} fieldOptions parametry políčka
                    // * @param {GFormRowOptions} [rowOptions] další parametry řádku
                    // * @returns {Gordic.Forms.FormRow[]} řádky formu s prefabem
                    // */
                    //export function xTestCreateFieldVS(fieldOptions: GStringBoxOptions, rowOptions?: GFormRowOptions): Gordic.Forms.FormRow[] {
                    //    const form = new Gordic.Forms.Form()
                    //        .addRow(createParamsFieldRow({ label: "jres:24100029" }, rowOptions)) //RC 24100029 : Evidenční číslo
                    //        .addField("gstringbox", addCopyToClipboardButton(fieldOptions));
                    //    return form.form.sections!["0"].rows!;
                    //}
                    /** Metoda pro otestování a nastavení variabilního symbolu */
                    function testVS(fThis, vs, priz_rzv) {
                        const that = fThis;
                        let aktivita = 0;
                        let popis = "";
                        const stateColor = Ddp.WebClient.Common.Globals.sgStateColor;
                        let color = stateColor.cInfoBlue;
                        if (vs != null && maRezerovat(priz_rzv)) {
                            if (jeZadany(vs)) {
                                //! test VS zda je volný, rezervovaný pro jiný případ a nebo rezervován pro aktuální ixp
                                //that.call("AktivitaVS", { vs: vs, pid: that.model.ixp }) //!
                                //that.isl.PripadSymboly.zjistiAktivituVS(rq => {
                                //    return {
                                //        vs: vs,
                                //        pid: that.model.ixp!
                                //    }
                                //}).get()
                                //    .done(function (data) {
                                //        aktivita = data.aktivita!;
                                //        //! VS neni použitelný
                                //        switch (aktivita) {
                                //            case null:
                                //                popis = "VS není rezervováný/použitý";
                                //                color = stateColor.cErrorRed;
                                //                break;
                                //            case 100:
                                //                popis = "VS je použitý";
                                //                color = stateColor.cInfoBlue;
                                //                break;
                                //            case 300:
                                //                popis = "VS je uvolněný";
                                //                color = stateColor.cErrorRed;
                                //                break;
                                //            case 500:
                                //            case 600:
                                //                popis = "VS je pouze rezervovaný";
                                //                color = stateColor.cInfoBlue;
                                //                break;
                                //            case 900:
                                //                popis = "VS je zrušený";
                                //                color = stateColor.cInfoBlue;
                                //                break;
                                //        }
                                //        //! test VS na jiných případech
                                //        var l_aktivita = data.aktivitaMax!;
                                //        if (l_aktivita == 100) {
                                //            popis += ", VS je použitý na jiném případu";
                                //            color = stateColor.cErrorRed;
                                //        } else if (l_aktivita == 500 || l_aktivita == 600) {
                                //            popis += ", VS je rezervovaný na jiném případu";
                                //            color = stateColor.cErrorRed;
                                //        }
                                //        //!chyby
                                //        //? VS je jen rezervovany a není použitý
                                //        //? VS neni rezervovany ani pouzity
                                //        //? VS je pouzity nebo rezervovany pro jiny pid
                                //        //? VS je pouzity nebo rezervovaný pro
                                //        nastavVs(popis, color);
                                //    })
                            }
                            if (jeMaska(vs)) {
                                popis = "VS bude generovaný v řadě";
                                color = stateColor.cWarningYellow; //TODO: podle gupty to chtělo darkBlue 
                                nastavVs(popis, color);
                                return { popis, color };
                            }
                        }
                        else {
                            nastavVs(popis, color);
                            return { popis, color };
                        }
                    }
                    Prefabs.testVS = testVS;
                    /** Metodda nastavující políčko VS */
                    function nastavVs(popis, color) {
                        //const that = this;
                        let smt = { id: "vsState", text: popis, /*tooltip: popis,*/ state: color, /*customClass: `g-state-${color}`*/ };
                        //TODO: let vsField = that.element.findForms().findFields("vs");
                        //vsField.css("color",
                        //! vsField.gfield("option", "tag", smt);
                        //! vsField.gfield("option", "tooltip", popis);
                    }
                    Prefabs.nastavVs = nastavVs;
                    /** Metoda pro zjištění příznaku rezervace */
                    function maRezerovat(priz_rzv) {
                        //const that = this;
                        //let sql = `SELECT priz_rzv FROM vas.ddpstpp WHERE typ_phl = '${that.model.typ_phl}'`;
                        //return (that.priz_rzv == 0);
                        return (priz_rzv == 0);
                    }
                    Prefabs.maRezerovat = maRezerovat;
                    /* Funkce testuje zda je vs zadané */
                    function jeZadany(vs) {
                        let l_vs = vs.trim();
                        return (l_vs.length > 1 && !jeMaska(l_vs));
                    }
                    Prefabs.jeZadany = jeZadany;
                    /* Funkce testuje zda zadané vs je maska pro generování */
                    function jeMaska(vs) {
                        let l_vs = vs.trim();
                        // obsahuje-li vs znak * pak vrátí true
                        return (l_vs.indexOf("*") >= 0);
                    }
                    Prefabs.jeMaska = jeMaska;
                    //#endregion VS pole a validace
                    //#region ikony
                    let Icons;
                    (function (Icons) {
                        /**
                         * Vrací objekt ikon pro lhůty
                         * @returns {object} Objekt obsahující ikony pro lhůty
                         */
                        function GetLhutaIcons() {
                            // export const ikona_100: string = "gi-kruh_faze4";                                        // ikona - 100%
                            // export const ikona_75: string = "gi-kruh_faze3";                                         // ikona - 75%
                            // export const ikona_50: string = "gi-kruh_faze2 gi-rot180";                               // ikona - 50%
                            // export const ikona_25: string = "gi-kruh_faze1";                                         // ikona - 25%
                            // export const ikona_0: string = "gi-circle";                                              // ikona - 0% (například - návrh)
                            // export const ikona_NE: string = "gi-minus_bold";                                         // ikona - nehradí se
                            // export const ikona_QUE: string = "gi-question_bold";                                     // ikona - otazník
                            let icons = {
                                lhuta0: "fa-question-circle g-state-text g-state-error", // ikona - červený otazník 
                                lhuta1: "fa-check-circle g-state-text g-state-success", // ikona - zelené zaškrtávátko
                                lhuta2: "gi-circle g-state-text g-state-warning", // ikona - žlutý kruh
                                lhuta3: "fa-exclamation-circle g-state-text g-state-error", // ikona - červený vykřičník
                                lhuta4: "gi-kruh_faze1 g-state-text g-state-info", // ikona - modrý kruh vyplněný na 25%
                                lhuta5: "gi-kruh_faze2 g-state-text g-state-error", // ikona - červený kruh vyplněný na 50% 
                                lhuta6: "gi-kruh_faze3 g-state-text g-state-info", // ikona - modrýkruh vyplněný na 75%
                                lhuta7: "gi-kruh_faze4 g-state-text g-state-error", // ikona - červený kruh vyplněný na 100%
                                neurceno: "gi-nic", // ikona - speciální bez-ikonový obrázek, aby zabral potřebné místo
                            };
                            return icons;
                        }
                        Icons.GetLhutaIcons = GetLhutaIcons;
                        function PodaniDokumentu() {
                            return "gi-vlastnictvi-dokumentu|gi-plus_bold g-state-text g-state-info gi-stack-pos--rb gi-bgw";
                        }
                        Icons.PodaniDokumentu = PodaniDokumentu;
                        function PodaniDokumentuZeSablony() {
                            return "gi-sablony|gi-plus_bold g-state-text g-state-info gi-stack-pos--rb gi-bgw";
                        }
                        Icons.PodaniDokumentuZeSablony = PodaniDokumentuZeSablony;
                        function PodaniDokumentuEl() {
                            return "gi-paperel|gi-plus_bold g-state-text g-state-info gi-stack-pos--rb gi-bgw";
                        }
                        Icons.PodaniDokumentuEl = PodaniDokumentuEl;
                        function PrintPripadDetail() {
                            return "gi-print|gi-paper g-state-text g-state-info gi-bgw gi-stack-pos--rb";
                        }
                        Icons.PrintPripadDetail = PrintPripadDetail;
                        function Popl_Obnovit() {
                            return "gi-user|fa-retweet gi-stack-pos--rb g-state-text g-state-success";
                        }
                        Icons.Popl_Obnovit = Popl_Obnovit;
                        function Popl_Zrusit() {
                            return "gi-user|fa-times-circle gi-stack-pos--rb g-state-text g-state-warning";
                        }
                        Icons.Popl_Zrusit = Popl_Zrusit;
                        function Popl_Ukoncit() {
                            return "gi-user|fa-times gi-stack-pos--rb g-state-text g-state-error";
                        }
                        Icons.Popl_Ukoncit = Popl_Ukoncit;
                        function Popl_UkoncitSkupinu() {
                            return "gi-group|fa-times gi-stack-pos--rb g-state-text g-state-error";
                        }
                        Icons.Popl_UkoncitSkupinu = Popl_UkoncitSkupinu;
                        function SaldoSSP() {
                            return "gi-saldo|gi-S g-state-text g-state-info gi-stack-pos--lb";
                        }
                        Icons.SaldoSSP = SaldoSSP;
                        function SaldoVymDr() {
                            return "gi-saldo|gi-D g-state-text g-state-info gi-stack-pos--lb";
                        }
                        Icons.SaldoVymDr = SaldoVymDr;
                        function VytvorSouvUkol() {
                            return "gi-paper|gi-bell gi-bgw gi-stack-pos--rb";
                        }
                        Icons.VytvorSouvUkol = VytvorSouvUkol;
                        function ZmenaBankUctu() {
                            return "gi-bankovka g-state-background|gi-doruc gi-stack-pos--lt g-state-text g-state-info gi-rotY180";
                        }
                        Icons.ZmenaBankUctu = ZmenaBankUctu;
                        function VratitDoWfl() {
                            return "gi-paper|gi-folder g-state-text gi-bgw gi-stack-pos--rb|fa-level-down g-state-text g-state-info gi-stack-pos--rt";
                        }
                        Icons.VratitDoWfl = VratitDoWfl;
                        function ZmenitTypPhl_Cel() {
                            return "gi-dotace g-state-background|gi-doruc gi-stack-pos--lt g-state-text g-state-favorite gi-rotY180";
                        }
                        Icons.ZmenitTypPhl_Cel = ZmenitTypPhl_Cel;
                        function ZmenitTypPhl_Pod() {
                            return "gi-dotace g-state-background|gi-doruc gi-stack-pos--lt g-state-text g-state-important gi-rotY180";
                        }
                        Icons.ZmenitTypPhl_Pod = ZmenitTypPhl_Pod;
                        function ZmenitTypPhl_Ins() {
                            return "gi-dotace g-state-background|gi-doruc gi-stack-pos--lt g-state-text g-state-warning gi-rotY180";
                        }
                        Icons.ZmenitTypPhl_Ins = ZmenitTypPhl_Ins;
                        function ZmenitTypPhl_Exe() {
                            return "gi-dotace g-state-background|gi-doruc gi-stack-pos--lt g-state-text g-state-error gi-rotY180";
                        }
                        Icons.ZmenitTypPhl_Exe = ZmenitTypPhl_Exe;
                        function ZmenitTypPhl_Pre() {
                            return "gi-dotace g-state-background|gi-doruc gi-stack-pos--lt g-state-text g-state-info gi-rotY180";
                        }
                        Icons.ZmenitTypPhl_Pre = ZmenitTypPhl_Pre;
                        function ZmenitTypPhl() {
                            return "gi-dotace g-state-background|gi-refresh gi-stack-pos--lt g-state-text g-state-info";
                        }
                        Icons.ZmenitTypPhl = ZmenitTypPhl;
                        function PrevodDluhu() {
                            return "gi-bankovni_prevod g-state-text g-state-error";
                        }
                        Icons.PrevodDluhu = PrevodDluhu;
                        function PrehledVymahani() {
                            return "gi-pohledavka|gi-magglass g-state-text g-state-info gi-stack-pos--lb";
                        }
                        Icons.PrehledVymahani = PrehledVymahani;
                        function PrepocetStavu() {
                            return "gi-calc|gi-suma gi-bgw gi-stack-pos--rb g-state-text g-state-favorite";
                            //return "gi-calc|gi-pencil gi-stack-pos--rb g-state-text g-state-info gi-bgw";
                        }
                        Icons.PrepocetStavu = PrepocetStavu;
                        function PosledniPlatcePripadu() {
                            return "gi-dotace|gi-history g-state-text g-state-info gi-stack-pos--lt gi-bgw";
                        }
                        Icons.PosledniPlatcePripadu = PosledniPlatcePripadu;
                        function PohledavkyPoplatnika() {
                            return "gi-list|gi-user gi-stack-pos--rb g-state-text g-state-info gi-bgw";
                            //return "fa-user|fa-book gi-stack-pos--rb g-state-text g-state-info";
                        }
                        Icons.PohledavkyPoplatnika = PohledavkyPoplatnika;
                        function Poplatnik() {
                            return "gi-pohledavka|gi-user gi-stack-pos--lt gi-bgw";
                        }
                        Icons.Poplatnik = Poplatnik;
                        function NapojeniPoplatnika() {
                            return "gi-osoby_evidence|gi-doruc gi-stack-pos--lt gi-rotY180|gi-plus_bold g-state-text g-state-info gi-stack-pos--rb gi-bgw";
                        }
                        Icons.NapojeniPoplatnika = NapojeniPoplatnika;
                        function NapojeniPlatce() {
                            return "gi-osoby_evidence|gi-doruc gi-stack-pos--lt gi-rot270|gi-plus_bold g-state-text g-state-info gi-stack-pos--rb gi-bgw";
                        }
                        Icons.NapojeniPlatce = NapojeniPlatce;
                        function ZruseniVsechPredpisu() {
                            return "gi-papiry|fa-times-circle gi-stack-pos--rb g-state-text g-state-warning gi-bgw";
                        }
                        Icons.ZruseniVsechPredpisu = ZruseniVsechPredpisu;
                    })(Icons = Prefabs.Icons || (Prefabs.Icons = {}));
                    //#endregion ikony
                    //#region Validátory
                    let Validatory;
                    (function (Validatory) {
                        /**
                         * Převede Date | JsonDate na "date-only klíč" YYYYMMDD jako číslo.
                         * - Date: bere se lokální kalendář (getFullYear/getMonth/getDate).
                         * - JsonDate: vezme se jen YYYY-MM-DD z počátku stringu, čas ignorujeme.
                         *   (Tj. "2023-03-29T00:00:00" -> 20230329)
                         * Pokud string neobsahuje validní datum, vyhodí chybu.
                         */
                        function toDateOnlyKey(value) {
                            if (value instanceof Date) {
                                const y = value.getFullYear();
                                const m = value.getMonth() + 1; // 0-based
                                const d = value.getDate();
                                return y * 10000 + m * 100 + d;
                            }
                            // JsonDate: extrahujeme YYYY-MM-DD z počátku řetězce
                            const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
                            if (!m) {
                                throw new Error(`Neplatný formát date-only JSONDate: ${value}`);
                            }
                            const y = Number(m[1]);
                            const mm = Number(m[2]);
                            const dd = Number(m[3]);
                            // Základní kontrola rozsahů (volitelné, ale užitečné)
                            if (mm < 1 || mm > 12 ||
                                dd < 1 || dd > 31 ||
                                !Number.isInteger(y) || !Number.isInteger(mm) || !Number.isInteger(dd)) {
                                throw new Error(`Neplatný rozsah data: ${value}`);
                            }
                            return y * 10000 + mm * 100 + dd;
                        }
                        /**
                         * Porovnávač: porovnává pouze kalendářní dny (date-only).
                         * Vrací chybu, pokud datum vzniku je "v uzavřeném období",
                         * tj. pokud je menší než datum uzavření
                         * @param dat_vzniku Datum vzniku (Date | JsonDate)
                         * @param dat_uzav Datum uzavření (Date | JsonDate)
                         * @returns boolean - true = OK, false = chyba (datum vzniku v uzavřeném období)
                         */
                        function PorovnaniDatumu(dat_vzniku, dat_uzav) {
                            const vznikKey = toDateOnlyKey(dat_vzniku);
                            const uzavKey = toDateOnlyKey(dat_uzav);
                            // Příklad logiky:
                            // - pokud je datum vzniku dříve než uzavřené období (uzavření), tak je to špatně
                            const isValid = vznikKey >= uzavKey;
                            if (!isValid) {
                                return false;
                            }
                            return true;
                        }
                        /**
                         * Validátor pro porovnání data (vzniku) s datem uzavření (typu pohledávky)
                         * @param content GContent - THIS
                         * @param dat_uzav Datum uzavření typu pohledávky (Date | JsonDate)
                         * @param datumNazev Název data pro chybovou hlášku (volitelné, výchozí "Datum vzniku")
                         * @returns
                         */
                        function ValidatorDatVznikuDatUzav(content, dat_uzav, datumNazev) {
                            var that = content;
                            var validator = new Gordic.Validators.Base();
                            datumNazev = datumNazev || "Datum vzniku";
                            validator.getMessage = (value) => {
                                return `${datumNazev} je zadáno v uzavřeném období!`; // ? Možná zadat také datum uzavření ?
                            };
                            validator.validate = (MyValue, source) => {
                                if (!PorovnaniDatumu(MyValue, dat_uzav)) {
                                    // this.errorType = "error";
                                    // this.message = 'Datum vzniku je zadáno v uzavřeném období!'
                                    // this.stopping = true; // evidence bude zakázána
                                    validator.stopping = true; // ? netuším zda funguje !
                                    return false;
                                }
                                //TODO: let posun_spl = that.element.findFields("posun_spl").gfield<number>("getValue");
                                return true;
                            };
                            return validator;
                        }
                        Validatory.ValidatorDatVznikuDatUzav = ValidatorDatVznikuDatUzav;
                    })(Validatory = Prefabs.Validatory || (Prefabs.Validatory = {}));
                    //#endregion Validátory
                    //region pomocné akce pro prefaby
                    /**
                     * Definice parametrů EKO akce
                     *
                     * @param {GActionParamsDefObjBase} paramsDef defaultní parametry příslušné akce
                     * @param {GActionParamsDefObj} params další parametry akce
                     * @returns {GActionParamsDefObj} výsledné parametry akce podání
                     */
                    function createParamsFieldRow(paramsDef, params) {
                        // spojení parametrů z venku s defaltními parametry příslušné akce
                        return $.extend(true, paramsDef, params || {});
                    }
                    /**
                     * Přidání kopírovacího tlačítka do políčka
                     * @param {GStringBoxOptions} fieldOptions parametry políčka
                     * @returns {GStringBoxOptions} parametry políčka doplněné o kopírovací tlačítko
                     */
                    function addCopyToClipboardButton(fieldOptions) {
                        if (!fieldOptions.buttons) {
                            fieldOptions.buttons = [];
                        }
                        fieldOptions.buttons.push(Gordic.Gin.Prefabs.Field.CreateUlozitDoClipboarduButton(fieldOptions.name ? fieldOptions.name : ""));
                        return fieldOptions;
                    }
                    Prefabs.addCopyToClipboardButton = addCopyToClipboardButton;
                    //endregion pomocné akce pro prefaby
                })(Prefabs = Common.Prefabs || (Common.Prefabs = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlZmFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByZWZhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0FxbEJmO0FBcmxCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxbEJuQjtJQXJsQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFsQjdCO1FBcmxCb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxNQUFNLENBcWxCcEM7WUFybEI4QixXQUFBLE1BQU07Z0JBQUMsSUFBQSxPQUFPLENBcWxCNUM7Z0JBcmxCcUMsV0FBQSxPQUFPO29CQUV6QywyQ0FBMkM7b0JBQzNDOzs7dUJBR0c7b0JBQ0gsU0FBZ0IsUUFBUTt3QkFDcEIsT0FBTzs0QkFDSCxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsbUJBQW1CLEVBQUU7Z0NBQ2pCLEtBQUssRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN6RCxPQUFPLEVBQUUsVUFBVSxVQUFVLElBQUksT0FBTyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3pFO3lCQUNKLENBQUM7b0JBQ04sQ0FBQztvQkFSZSxnQkFBUSxXQVF2QixDQUFBO29CQUNEOzs7dUJBR0c7b0JBQ0gsU0FBZ0IsWUFBWTt3QkFDeEIsT0FBTzs0QkFDSCxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsbUJBQW1CLEVBQUU7Z0NBQ2pCLEtBQUssRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUMxRCxPQUFPLEVBQUUsVUFBVSxVQUFVLElBQUks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QkFDbEUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUVEOzs7O3VCQUlHO29CQUNILFNBQWdCLHdCQUF3QixDQUFDLFlBQStCO3dCQUVwRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUN4QixZQUFZLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDOUIsQ0FBQzt3QkFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFFL0gsT0FBTyxZQUFZLENBQUM7b0JBQ3hCLENBQUM7b0JBVGUsZ0NBQXdCLDJCQVN2QyxDQUFBO29CQUdELG9DQUFvQztnQkFDeEMsQ0FBQyxFQXJsQnFDLE9BQU8sR0FBUCxjQUFPLEtBQVAsY0FBTyxRQXFsQjVDO1lBQUQsQ0FBQyxFQXJsQjhCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBcWxCcEM7UUFBRCxDQUFDLEVBcmxCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcWxCN0I7SUFBRCxDQUFDLEVBcmxCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcWxCbkI7QUFBRCxDQUFDLEVBcmxCUyxNQUFNLEtBQU4sTUFBTSxRQXFsQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR3JpZEZvcm1hdHMudHMgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFByZWZhYnkgYSBqZWppY2ggbmFzdGF2ZW7DrSBwcm8gbW9kdWwgRERQICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLlByZWZhYnMge1xyXG5cclxuICAgIC8vI3JlZ2lvbiBDaGNlY2tib3h5IHMgaG9kbm90YW1pIDEvMCBhIDEwLzBcclxuICAgIC8qKlxyXG4gICAgICogUHJlZmFiIHBybyBuYXN0YXZlbsOtIGNoZWNrYm94dSBzIGhvZG5vdGFtaSAxIC8gMFxyXG4gICAgICogQHJldHVybnMge0dDaGVja09wdGlvbnN9IFDFmWVkbmFzdGF2ZW7DqSBtb8W+bm9zdGkgcHJvIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDaGVja2JveCgpOiBHQ2hlY2tPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVmYWIgcHJvIG5hc3RhdmVuw60gY2hlY2tib3h1IHMgaG9kbm90YW1pIDEwIC8gMFxyXG4gICAgICogQHJldHVybnMge0dDaGVja09wdGlvbnN9IFDFmWVkbmFzdGF2ZW7DqSBtb8W+bm9zdGkgcHJvIGNoZWNrYm94XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDaGVja2JveDBfMTAoKTogR0NoZWNrT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxMDsgfSxcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMTAgOiAwOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uIENoY2Vja2JveHkgcyBob2Rub3RhbWkgMS8wIGEgMTAvMFxyXG5cclxuICAgIC8vI3JlZ2lvbiBabmFtw6lua28gKzEvLTEgc2VsZWN0Qm94XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElabmFtZW5rbyB7IHpuYW06IC0xIHwgMSwgem5hbV90eHQ6IHN0cmluZyB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gem5hbSgpOiBHU2VsZWN0Qm94T3B0aW9uc1NpbmdsZTxJWm5hbWVua28+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBuZXcgRGF0YS5WaWV3PElabmFtZW5rbz4oW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHpuYW06IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgem5hbV90eHQ6IFwiKzFcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB6bmFtOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICB6bmFtX3R4dDogXCItMVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0seyBrZXk6IFwiem5hbVwiIH0pLFxyXG4gICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2YWw/OiBJWm5hbWVua28pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT0gbnVsbCA/IFwiXCIgOiB2YWwuem5hbV90eHQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IFwiem5hbVwiLFxyXG4gICAgICAgICAgICBtb2RlbDogXCJtb2RlbC56bmFtPXZhbHVlLnpuYW1cIixcclxuICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uIFpuYW3DqW5rbyArMS8tMSBzZWxlY3RCb3hcclxuXHJcbiAgICAvLyNyZWdpb24gUMWZw616bmFrIHBvxI3DoXRrdVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJpelBvY2F0ZWsgeyBwcml6X3BvY2F0ZWs6IDAgfCAxIHwgMiwgcHJpel9wb2NhdGVrX3R4dDogc3RyaW5nIH0gIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHByaXpQb2NhdGVrKCk6IEdTZWxlY3RCb3hPcHRpb25zU2luZ2xlPElQcml6UG9jYXRlaz4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IG5ldyBEYXRhLlZpZXc8SVByaXpQb2NhdGVrPihbe1xyXG4gICAgICAgICAgICAgICAgcHJpel9wb2NhdGVrOiAwLFxyXG4gICAgICAgICAgICAgICAgcHJpel9wb2NhdGVrX3R4dDogXCJCxJvFvm7DvSBrcm9rXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgcHJpel9wb2NhdGVrOiAxLFxyXG4gICAgICAgICAgICAgICAgcHJpel9wb2NhdGVrX3R4dDogXCJJbmljaWFsaXphxI1uw60ga3Jva1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByaXpfcG9jYXRlazogMixcclxuICAgICAgICAgICAgICAgIHByaXpfcG9jYXRla190eHQ6IFwiUmVkaXN0cmlidcSNbsOtIGtyb2tcIlxyXG4gICAgICAgICAgICB9XSwgeyBrZXk6IFwicHJpel9wb2NhdGVrXCIgfSksXHJcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHZhbD86IElQcml6UG9jYXRlaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudWxsID8gXCJcIiA6IHZhbC5wcml6X3BvY2F0ZWtfdHh0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYW1lOiBcInByaXpfcG9jYXRla1wiLFxyXG4gICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wcml6X3BvY2F0ZWs9dmFsdWUucHJpel9wb2NhdGVrXCIsXHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBQxZnDrXpuYWsgcG/EjcOhdGt1XHJcblxyXG4gICAgLy8jcmVnaW9uIFN0YXYgbGjFr3R5XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTdGF2TGh1dHkgeyBzdGF2X2xodXR5OiAwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2IHwgNywgc3Rhdl9saHV0eV90eHQ6IHN0cmluZyB9XHJcbiAgICAvKiogUHJlZmFiIHBybyBzZWxlY3QgYm94IHNlIHN0YXZ5IGxoxa90eSAoUG91xb7DrXbDoSBzZSB2IG9rbmUgR1Nlem5hbVVrb251KVxyXG4gICAgICogIG5hbWU6IFwic3Rhdl9saHV0eVwiLFxyXG4gICAgICogIG1vZGVsOiBcIm1vZGVsLnN0YXZfbGh1dHk9dmFsdWUuc3Rhdl9saHV0eVwiLFxyXG4gICAgICogIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgKiBAcmV0dXJucyB7R1NlbGVjdEJveE9wdGlvbnNTaW5nbGU8SVN0YXZMaHV0eT59IFDFmWVkbmFzdGF2ZW7DvSBwcmVmYWIgcyBuYXBsbsSbbsO9bWkgZGF0eVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc3RhdkxodXR5KCk6IEdTZWxlY3RCb3hPcHRpb25zU2luZ2xlPElTdGF2TGh1dHk+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBuZXcgRGF0YS5WaWV3PElTdGF2TGh1dHk+KFtcclxuICAgICAgICAgICAgICAgIHsgc3Rhdl9saHV0eTogMCwgc3Rhdl9saHV0eV90eHQ6IFwiTGjFr3RhIG5lbsOtIGRlZmlub3ZhbsOhXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgc3Rhdl9saHV0eTogMSwgc3Rhdl9saHV0eV90eHQ6IFwiTGjFr3RhIG5lbsOtIHTFmWViYSAoamUgemFwbGFjZW5vKVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXZfbGh1dHk6IDIsIHN0YXZfbGh1dHlfdHh0OiBcIkplIHDFmWVkIHVwb3pvcm7Em27DrW0sIGpzb3UgdsWhZWNobmEgdnltw6Fow6Fuw61cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBzdGF2X2xodXR5OiAzLCBzdGF2X2xodXR5X3R4dDogXCJKZSBwxZllZCB1cG96b3JuxJtuw61tLCBuZWpzb3UgdsWhZWNobmEgdnltw6Fow6Fuw61cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBzdGF2X2xodXR5OiA0LCBzdGF2X2xodXR5X3R4dDogXCJKZSBwxZllZCB2eXByxaFlbsOtbSBsaMWvdHksIGpzb3UgdsWhZWNobmEgdnltw6Fow6Fuw61cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBzdGF2X2xodXR5OiA1LCBzdGF2X2xodXR5X3R4dDogXCJKZSBwxZllZCB2eXByxaFlbsOtbSBsaMWvdHksIG5lanNvdSB2xaFlY2huYSB2eW3DoWjDoW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXZfbGh1dHk6IDYsIHN0YXZfbGh1dHlfdHh0OiBcIkplIHBvIHZ5cHLFoWVuw61tIGxoxa90eSwganNvdSB2xaFlY2huYSB2eW3DoWjDoW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXZfbGh1dHk6IDcsIHN0YXZfbGh1dHlfdHh0OiBcIkplIHBvIHZ5cHLFoWVuw61tIGxoxa90eSwgbmVqc291IHbFoWVjaG5hIHZ5bcOhaMOhbsOtJ1wiIH1cclxuICAgICAgICAgICAgXSwgeyBrZXk6IFwic3Rhdl9saHV0eVwiIH0pLFxyXG4gICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2YWw/OiBJU3RhdkxodXR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsID09IG51bGwgPyBcIlwiIDogdmFsLnN0YXZfbGh1dHlfdHh0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYW1lOiBcInN0YXZfbGh1dHlcIixcclxuICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl9saHV0eT12YWx1ZS5zdGF2X2xodXR5XCIsXHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBTdGF2IGxoxa90eVxyXG5cclxuICAgIC8vI3JlZ2lvbiBUeXAgw7prb251XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUeXBVa29udSB7IHR5cF91a286IDAgfCAxMCB8IDIwIHwgMzAsIHR5cF91a29fdHh0OiBzdHJpbmcgfVxyXG4gICAgLyoqIFByZWZhYiBwcm8gc2VsZWN0IGJveCBzIHR5cHkgw7prb27FryAoUG91xb7DrXbDoSBzZSB2IG9rbmUgR05hc3RhdmVuaVVrb251KVxyXG4gICAgICogIG5hbWU6IFwidHlwX3Vrb1wiLFxyXG4gICAgICogIG1vZGVsOiBcIm1vZGVsLnR5cF91a289dmFsdWUudHlwX3Vrb1wiLFxyXG4gICAgICogIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICogQHJldHVybnMge0dTZWxlY3RCb3hPcHRpb25zU2luZ2xlPElUeXBVa29udT59IFDFmWVkbmFzdGF2ZW7DvSBwcmVmYWIgcyBuYXBsbsSbbsO9bWkgZGF0eVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdHlwVWtvbnUoKTogR1NlbGVjdEJveE9wdGlvbnNTaW5nbGU8SVR5cFVrb251PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YTogbmV3IERhdGEuVmlldzxJVHlwVWtvbnU+KFtcclxuICAgICAgICAgICAgICAgIHsgdHlwX3VrbzogMCwgdHlwX3Vrb190eHQ6IFwiUG96YXN0YXZlbsOtXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgdHlwX3VrbzogMTAsIHR5cF91a29fdHh0OiBcIlDFmWVydcWhZW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IHR5cF91a286IDIwLCB0eXBfdWtvX3R4dDogXCJabmVwbGF0bsSbbsOtXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgdHlwX3VrbzogMzAsIHR5cF91a29fdHh0OiBcIlVrb27EjWVuw61cIiB9XHJcbiAgICAgICAgICAgIF0sIHsga2V5OiBcInR5cF91a29cIiB9KSxcclxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodmFsPzogSVR5cFVrb251KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsID09IG51bGwgPyBcIlwiIDogdmFsLnR5cF91a29fdHh0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYW1lOiBcInR5cF91a29cIixcclxuICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3Vrbz12YWx1ZS50eXBfdWtvXCIsXHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb24gVHlwIMO6a29udVxyXG5cclxuICAgIC8vI3JlZ2lvbiBWUyBwb2xlIGEgdmFsaWRhY2VcclxuICAgIC8qKlxyXG4gICAgICogRnVua2NlIHBybyBkZWZpbm92w6Fuw60gbmFzdGF2ZW7DrSA8R1N0cmluZ0JveE9wdGlvbnM+IHBvbMOtxI1rYSBzIFZhcmlhYmxpbsOtbSBzeW1ib2xlbSBWU1xyXG4gICAgICogQHBhcmFtIHByaXpfcnp2IFDFmcOtem5hayByZXplcnZhY2UgKHBvdMWZZWJuw70gcHJvIHNwcsOhdm5vdSB2YWxpZGFjaSlcclxuICAgICAqIEByZXR1cm5zIEdTdHJpbmdCb3hPcHRpb25zIHbEjS4gdGxhxI3DrXRrYSBzIGFrY8OtIHBybyB6a29ww61yb3bDoW7DrSB0ZXh0dSBkbyBjbGlwYm9hcmR1XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBWU0ZpZWxkKHByaXpfcnp2OiBudW1iZXIpOiBHU3RyaW5nQm94T3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIGFkZENvcHlUb0NsaXBib2FyZEJ1dHRvbihWU0ZpZWxkRGVmaW5lKHByaXpfcnp2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5rY2UgcHJvIGRlZmlub3bDoW7DrSBuYXN0YXZlbsOtIDxHU3RyaW5nQm94T3B0aW9ucz4gcG9sw63EjWthIHMgVmFyaWFibGluw61tIHN5bWJvbGVtIFZTIFxyXG4gICAgICogQHBhcmFtIHByaXpfcnp2IFDFmcOtem5hayByZXplcnZhY2UgKHBvdMWZZWJuw70gcHJvIHNwcsOhdm5vdSB2YWxpZGFjaSlcclxuICAgICAqIEByZXR1cm5zIEdTdHJpbmdCb3hPcHRpb25zIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBWU0ZpZWxkRGVmaW5lKHByaXpfcnp2OiBudW1iZXIpOiBHU3RyaW5nQm94T3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogXCJ2c1wiLCAvL3ZzXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRhZzoge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBcImluZm9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODkqXCIsXHJcbiAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDEyIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAoTXlWYWx1ZSwgc291cmNlKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbF92czogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZk1hc2thOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpbSB0aGUgaW5wdXQgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXlWYWx1ZSA9IE15VmFsdWUhLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF92cyA9IE15VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsYXN0IGNoYXJhY3RlciBpcyAnKidcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfdnMhLmNoYXJBdChsX3ZzIS5sZW5ndGggLSAxKSA9PT0gJyonKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBmTWFza2EgaXMgZmFsc2UsIHNob3cgYW4gZXJyb3IgbWVzc2FnZSBhbmQgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZNYXNrYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JUeXBlID0gXCJlcnJvclwiOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnWmFkYW7DoSBob2Rub3RhIG9ic2FodWplIHpuYWsgKiwga3RlcsO9IG5lbsOtIHBvdm9sZW5vIHphZMOhdmF0IScgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcHBpbmcgPSB0cnVlOyAvLyBldmlkZW5jZSBidWRlIHpha8OhesOhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSAnKicgZm9yIG51bWJlciB2YWxpZGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3ZzID0gbF92cy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkTnVtYmVyID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNOYU4oTnVtYmVyKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZE51bWJlcihsX3ZzKSAmJiBsX3ZzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JUeXBlID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0NoeWJuxJsgdnlwbG7Em27DqSBwb2xlLCBtdXPDrSBiw710IHphZGFuw6EgxI3DrXNlbG7DoSBob2Rub3RhISdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcHBpbmcgPSB0cnVlOyAvLyBldmlkZW5jZSBidWRlIHpha8OhesOhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnZhbGlkYWNlVlMoY3R4LnZhbHVlISwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXN0VlModGhpcywgY3R4LnZhbHVlISwgcHJpel9yenYpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vKipcclxuICAgIC8vICogUHJlZmFiIHBybyBldmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAvLyAqIFxyXG4gICAgLy8gKiBAcGFyYW0ge0dTdHJpbmdCb3hPcHRpb25zfSBmaWVsZE9wdGlvbnMgcGFyYW1ldHJ5IHBvbMOtxI1rYVxyXG4gICAgLy8gKiBAcGFyYW0ge0dGb3JtUm93T3B0aW9uc30gW3Jvd09wdGlvbnNdIGRhbMWhw60gcGFyYW1ldHJ5IMWZw6Fka3VcclxuICAgIC8vICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtUm93W119IMWZw6Fka3kgZm9ybXUgcyBwcmVmYWJlbVxyXG4gICAgLy8gKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIHhUZXN0Q3JlYXRlRmllbGRWUyhmaWVsZE9wdGlvbnM6IEdTdHJpbmdCb3hPcHRpb25zLCByb3dPcHRpb25zPzogR0Zvcm1Sb3dPcHRpb25zKTogR29yZGljLkZvcm1zLkZvcm1Sb3dbXSB7XHJcblxyXG4gICAgLy8gICAgY29uc3QgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAvLyAgICAgICAgLmFkZFJvdyhjcmVhdGVQYXJhbXNGaWVsZFJvdyh7IGxhYmVsOiBcImpyZXM6MjQxMDAwMjlcIiB9LCByb3dPcHRpb25zKSkgLy9SQyAyNDEwMDAyOSA6IEV2aWRlbsSNbsOtIMSNw61zbG9cclxuICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIGFkZENvcHlUb0NsaXBib2FyZEJ1dHRvbihmaWVsZE9wdGlvbnMpKTtcclxuICAgIC8vICAgIHJldHVybiBmb3JtLmZvcm0uc2VjdGlvbnMhW1wiMFwiXS5yb3dzITtcclxuICAgIC8vfVxyXG5cclxuICAgIC8qKiBNZXRvZGEgcHJvIG90ZXN0b3bDoW7DrSBhIG5hc3RhdmVuw60gdmFyaWFiaWxuw61obyBzeW1ib2x1ICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdGVzdFZTKGZUaGlzOiBIVE1MRWxlbWVudCwgdnM6IHN0cmluZyB8IG51bGwsIHByaXpfcnp2OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gZlRoaXM7XHJcbiAgICAgICAgbGV0IGFrdGl2aXRhOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBwb3Bpczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBjb25zdCBzdGF0ZUNvbG9yID0gRGRwLldlYkNsaWVudC5Db21tb24uR2xvYmFscy5zZ1N0YXRlQ29sb3I7XHJcbiAgICAgICAgbGV0IGNvbG9yOiBHU3RhdGUgPSBzdGF0ZUNvbG9yLmNJbmZvQmx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHZzICE9IG51bGwgJiYgbWFSZXplcm92YXQocHJpel9yenYpKSB7XHJcbiAgICAgICAgICAgIGlmIChqZVphZGFueSh2cykpIHtcclxuICAgICAgICAgICAgICAgIC8vISB0ZXN0IFZTIHpkYSBqZSB2b2xuw70sIHJlemVydm92YW7DvSBwcm8gamluw70gcMWZw61wYWQgYSBuZWJvIHJlemVydm92w6FuIHBybyBha3R1w6FsbsOtIGl4cFxyXG4gICAgICAgICAgICAgICAgLy90aGF0LmNhbGwoXCJBa3Rpdml0YVZTXCIsIHsgdnM6IHZzLCBwaWQ6IHRoYXQubW9kZWwuaXhwIH0pIC8vIVxyXG4gICAgICAgICAgICAgICAgLy90aGF0LmlzbC5QcmlwYWRTeW1ib2x5LnpqaXN0aUFrdGl2aXR1VlMocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2czogdnMsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcGlkOiB0aGF0Lm1vZGVsLml4cCFcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYWt0aXZpdGEgPSBkYXRhLmFrdGl2aXRhITtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyEgVlMgbmVuaSBwb3XFvml0ZWxuw71cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBzd2l0Y2ggKGFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgbnVsbDpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHBvcGlzID0gXCJWUyBuZW7DrSByZXplcnZvdsOhbsO9L3BvdcW+aXTDvVwiO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29sb3IgPSBzdGF0ZUNvbG9yLmNFcnJvclJlZDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIDEwMDpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHBvcGlzID0gXCJWUyBqZSBwb3XFvml0w71cIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbG9yID0gc3RhdGVDb2xvci5jSW5mb0JsdWU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FzZSAzMDA6XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBwb3BpcyA9IFwiVlMgamUgdXZvbG7Em27DvVwiO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29sb3IgPSBzdGF0ZUNvbG9yLmNFcnJvclJlZDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIDUwMDpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FzZSA2MDA6XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBwb3BpcyA9IFwiVlMgamUgcG91emUgcmV6ZXJ2b3ZhbsO9XCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2xvciA9IHN0YXRlQ29sb3IuY0luZm9CbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgOTAwOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcG9waXMgPSBcIlZTIGplIHpydcWhZW7DvVwiO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29sb3IgPSBzdGF0ZUNvbG9yLmNJbmZvQmx1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyEgdGVzdCBWUyBuYSBqaW7DvWNoIHDFmcOtcGFkZWNoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIGxfYWt0aXZpdGEgPSBkYXRhLmFrdGl2aXRhTWF4ITtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAobF9ha3Rpdml0YSA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcG9waXMgKz0gXCIsIFZTIGplIHBvdcW+aXTDvSBuYSBqaW7DqW0gcMWZw61wYWR1XCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbG9yID0gc3RhdGVDb2xvci5jRXJyb3JSZWQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSBlbHNlIGlmIChsX2FrdGl2aXRhID09IDUwMCB8fCBsX2FrdGl2aXRhID09IDYwMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBwb3BpcyArPSBcIiwgVlMgamUgcmV6ZXJ2b3ZhbsO9IG5hIGppbsOpbSBwxZnDrXBhZHVcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY29sb3IgPSBzdGF0ZUNvbG9yLmNFcnJvclJlZDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8hY2h5YnlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLz8gVlMgamUgamVuIHJlemVydm92YW55IGEgbmVuw60gcG91xb5pdMO9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8/IFZTIG5lbmkgcmV6ZXJ2b3ZhbnkgYW5pIHBvdXppdHlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLz8gVlMgamUgcG91eml0eSBuZWJvIHJlemVydm92YW55IHBybyBqaW55IHBpZFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vPyBWUyBqZSBwb3V6aXR5IG5lYm8gcmV6ZXJ2b3ZhbsO9IHByb1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYXN0YXZWcyhwb3BpcywgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoamVNYXNrYSh2cykpIHtcclxuICAgICAgICAgICAgICAgIHBvcGlzID0gXCJWUyBidWRlIGdlbmVyb3ZhbsO9IHYgxZlhZMSbXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3RhdGVDb2xvci5jV2FybmluZ1llbGxvdzsgLy9UT0RPOiBwb2RsZSBndXB0eSB0byBjaHTEm2xvIGRhcmtCbHVlIFxyXG4gICAgICAgICAgICAgICAgbmFzdGF2VnMocG9waXMsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHBvcGlzLCBjb2xvciB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmFzdGF2VnMocG9waXMsIGNvbG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcG9waXMsIGNvbG9yIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqIE1ldG9kZGEgbmFzdGF2dWrDrWPDrSBwb2zDrcSNa28gVlMgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBuYXN0YXZWcyhwb3Bpczogc3RyaW5nLCBjb2xvcjogR1N0YXRlKTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgc210OiBHRmllbGRUYWdPcHRpb25zID0geyBpZDogXCJ2c1N0YXRlXCIsIHRleHQ6IHBvcGlzLCAvKnRvb2x0aXA6IHBvcGlzLCovIHN0YXRlOiBjb2xvciwgLypjdXN0b21DbGFzczogYGctc3RhdGUtJHtjb2xvcn1gKi8gfTtcclxuICAgICAgICAvL1RPRE86IGxldCB2c0ZpZWxkID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJ2c1wiKTtcclxuICAgICAgICAvL3ZzRmllbGQuY3NzKFwiY29sb3JcIixcclxuICAgICAgICAvLyEgdnNGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJ0YWdcIiwgc210KTtcclxuICAgICAgICAvLyEgdnNGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJ0b29sdGlwXCIsIHBvcGlzKTtcclxuICAgIH1cclxuICAgIC8qKiBNZXRvZGEgcHJvIHpqacWhdMSbbsOtIHDFmcOtem5ha3UgcmV6ZXJ2YWNlICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gbWFSZXplcm92YXQocHJpel9yenYpOiBib29sZWFuIHtcclxuICAgICAgICAvL2NvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vbGV0IHNxbCA9IGBTRUxFQ1QgcHJpel9yenYgRlJPTSB2YXMuZGRwc3RwcCBXSEVSRSB0eXBfcGhsID0gJyR7dGhhdC5tb2RlbC50eXBfcGhsfSdgO1xyXG4gICAgICAgIC8vcmV0dXJuICh0aGF0LnByaXpfcnp2ID09IDApO1xyXG4gICAgICAgIHJldHVybiAocHJpel9yenYgPT0gMCk7XHJcbiAgICB9XHJcbiAgICAvKiBGdW5rY2UgdGVzdHVqZSB6ZGEgamUgdnMgemFkYW7DqSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGplWmFkYW55KHZzOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbF92czogc3RyaW5nID0gdnMudHJpbSgpO1xyXG4gICAgICAgIHJldHVybiAobF92cy5sZW5ndGggPiAxICYmICFqZU1hc2thKGxfdnMpKVxyXG4gICAgfVxyXG4gICAgLyogRnVua2NlIHRlc3R1amUgemRhIHphZGFuw6kgdnMgamUgbWFza2EgcHJvIGdlbmVyb3bDoW7DrSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGplTWFza2EodnM6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBsX3ZzOiBzdHJpbmcgPSB2cy50cmltKCk7XHJcbiAgICAgICAgLy8gb2JzYWh1amUtbGkgdnMgem5hayAqIHBhayB2csOhdMOtIHRydWVcclxuICAgICAgICByZXR1cm4gKGxfdnMuaW5kZXhPZihcIipcIikgPj0gMClcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBWUyBwb2xlIGEgdmFsaWRhY2VcclxuXHJcbiAgICAvLyNyZWdpb24gaWtvbnlcclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgSWNvbnMge1xyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWPDrSBvYmpla3QgaWtvbiBwcm8gbGjFr3R5XHJcbiAgICAgICAgICogQHJldHVybnMge29iamVjdH0gT2JqZWt0IG9ic2FodWrDrWPDrSBpa29ueSBwcm8gbGjFr3R5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIEdldExodXRhSWNvbnMoKToge1xyXG4gICAgICAgICAgICBsaHV0YTA6IHN0cmluZzsgLy8gaWtvbmEgLSDEjWVydmVuw70gb3Rhem7DrWsgXHJcbiAgICAgICAgICAgIGxodXRhMTogc3RyaW5nOyAvLyBpa29uYSAtIHplbGVuw6kgemHFoWtydMOhdsOhdGtvXHJcbiAgICAgICAgICAgIGxodXRhMjogc3RyaW5nOyAvLyBpa29uYSAtIMW+bHV0w70ga3J1aFxyXG4gICAgICAgICAgICBsaHV0YTM6IHN0cmluZzsgLy8gaWtvbmEgLSDEjWVydmVuw70gdnlrxZlpxI1uw61rXHJcbiAgICAgICAgICAgIGxodXRhNDogc3RyaW5nOyAvLyBpa29uYSAtIG1vZHLDvSBrcnVoIHZ5cGxuxJtuw70gbmEgMjUlXHJcbiAgICAgICAgICAgIGxodXRhNTogc3RyaW5nOyAvLyBpa29uYSAtIMSNZXJ2ZW7DvSBrcnVoIHZ5cGxuxJtuw70gbmEgNTAlIFxyXG4gICAgICAgICAgICBsaHV0YTY6IHN0cmluZzsgLy8gaWtvbmEgLSBtb2Ryw71rcnVoIHZ5cGxuxJtuw70gbmEgNzUlXHJcbiAgICAgICAgICAgIGxodXRhNzogc3RyaW5nOyAvLyBpa29uYSAtIMSNZXJ2ZW7DvSBrcnVoIHZ5cGxuxJtuw70gbmEgMTAwJVxyXG4gICAgICAgICAgICBuZXVyY2Vubzogc3RyaW5nO1xyXG4gICAgICAgIH0ge1xyXG4gICAgICAgICAgICAvLyBleHBvcnQgY29uc3QgaWtvbmFfMTAwOiBzdHJpbmcgPSBcImdpLWtydWhfZmF6ZTRcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgLSAxMDAlXHJcbiAgICAgICAgICAgIC8vIGV4cG9ydCBjb25zdCBpa29uYV83NTogc3RyaW5nID0gXCJnaS1rcnVoX2ZhemUzXCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYSAtIDc1JVxyXG4gICAgICAgICAgICAvLyBleHBvcnQgY29uc3QgaWtvbmFfNTA6IHN0cmluZyA9IFwiZ2kta3J1aF9mYXplMiBnaS1yb3QxODBcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgLSA1MCVcclxuICAgICAgICAgICAgLy8gZXhwb3J0IGNvbnN0IGlrb25hXzI1OiBzdHJpbmcgPSBcImdpLWtydWhfZmF6ZTFcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIC0gMjUlXHJcbiAgICAgICAgICAgIC8vIGV4cG9ydCBjb25zdCBpa29uYV8wOiBzdHJpbmcgPSBcImdpLWNpcmNsZVwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYSAtIDAlIChuYXDFmcOta2xhZCAtIG7DoXZyaClcclxuICAgICAgICAgICAgLy8gZXhwb3J0IGNvbnN0IGlrb25hX05FOiBzdHJpbmcgPSBcImdpLW1pbnVzX2JvbGRcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIC0gbmVocmFkw60gc2VcclxuICAgICAgICAgICAgLy8gZXhwb3J0IGNvbnN0IGlrb25hX1FVRTogc3RyaW5nID0gXCJnaS1xdWVzdGlvbl9ib2xkXCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIC0gb3Rhem7DrWtcclxuICAgICAgICAgICAgbGV0IGljb25zID0ge1xyXG4gICAgICAgICAgICAgICAgbGh1dGEwOiBcImZhLXF1ZXN0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCAgICAgICAgLy8gaWtvbmEgLSDEjWVydmVuw70gb3Rhem7DrWsgXHJcbiAgICAgICAgICAgICAgICBsaHV0YTE6IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgICAgICAgICAvLyBpa29uYSAtIHplbGVuw6kgemHFoWtydMOhdsOhdGtvXHJcbiAgICAgICAgICAgICAgICBsaHV0YTI6IFwiZ2ktY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIiwgICAgICAgICAgICAgICAvLyBpa29uYSAtIMW+bHV0w70ga3J1aFxyXG4gICAgICAgICAgICAgICAgbGh1dGEzOiBcImZhLWV4Y2xhbWF0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCAgICAgLy8gaWtvbmEgLSDEjWVydmVuw70gdnlrxZlpxI1uw61rXHJcbiAgICAgICAgICAgICAgICBsaHV0YTQ6IFwiZ2kta3J1aF9mYXplMSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsICAgICAgICAgICAgICAvLyBpa29uYSAtIG1vZHLDvSBrcnVoIHZ5cGxuxJtuw70gbmEgMjUlXHJcbiAgICAgICAgICAgICAgICBsaHV0YTU6IFwiZ2kta3J1aF9mYXplMiBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCAgICAgICAgICAgICAvLyBpa29uYSAtIMSNZXJ2ZW7DvSBrcnVoIHZ5cGxuxJtuw70gbmEgNTAlIFxyXG4gICAgICAgICAgICAgICAgbGh1dGE2OiBcImdpLWtydWhfZmF6ZTMgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLCAgICAgICAgICAgICAgLy8gaWtvbmEgLSBtb2Ryw71rcnVoIHZ5cGxuxJtuw70gbmEgNzUlXHJcbiAgICAgICAgICAgICAgICBsaHV0YTc6IFwiZ2kta3J1aF9mYXplNCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCAgICAgICAgICAgICAvLyBpa29uYSAtIMSNZXJ2ZW7DvSBrcnVoIHZ5cGxuxJtuw70gbmEgMTAwJVxyXG4gICAgICAgICAgICAgICAgbmV1cmNlbm86IFwiZ2ktbmljXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgLSBzcGVjacOhbG7DrSBiZXotaWtvbm92w70gb2Jyw6F6ZWssIGFieSB6YWJyYWwgcG90xZllYm7DqSBtw61zdG9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaWNvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBQb2RhbmlEb2t1bWVudHUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktdmxhc3RuaWN0dmktZG9rdW1lbnR1fGdpLXBsdXNfYm9sZCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBQb2RhbmlEb2t1bWVudHVaZVNhYmxvbnkoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktc2FibG9ueXxnaS1wbHVzX2JvbGQgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mbyBnaS1zdGFjay1wb3MtLXJiIGdpLWJnd1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gUG9kYW5pRG9rdW1lbnR1RWwoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktcGFwZXJlbHxnaS1wbHVzX2JvbGQgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mbyBnaS1zdGFjay1wb3MtLXJiIGdpLWJnd1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gUHJpbnRQcmlwYWREZXRhaWwoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktcHJpbnR8Z2ktcGFwZXIgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mbyBnaS1iZ3cgZ2ktc3RhY2stcG9zLS1yYlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFBvcGxfT2Jub3ZpdCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS11c2VyfGZhLXJldHdlZXQgZ2ktc3RhY2stcG9zLS1yYiBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBQb3BsX1pydXNpdCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS11c2VyfGZhLXRpbWVzLWNpcmNsZSBnaS1zdGFjay1wb3MtLXJiIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFBvcGxfVWtvbmNpdCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS11c2VyfGZhLXRpbWVzIGdpLXN0YWNrLXBvcy0tcmIgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFBvcGxfVWtvbmNpdFNrdXBpbnUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktZ3JvdXB8ZmEtdGltZXMgZ2ktc3RhY2stcG9zLS1yYiBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFNhbGRvU1NQKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLXNhbGRvfGdpLVMgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mbyBnaS1zdGFjay1wb3MtLWxiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gU2FsZG9WeW1EcigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1zYWxkb3xnaS1EIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm8gZ2ktc3RhY2stcG9zLS1sYlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFZ5dHZvclNvdXZVa29sKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLXBhcGVyfGdpLWJlbGwgZ2ktYmd3IGdpLXN0YWNrLXBvcy0tcmJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFptZW5hQmFua1VjdHUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktYmFua292a2EgZy1zdGF0ZS1iYWNrZ3JvdW5kfGdpLWRvcnVjIGdpLXN0YWNrLXBvcy0tbHQgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mbyBnaS1yb3RZMTgwXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFZyYXRpdERvV2ZsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLXBhcGVyfGdpLWZvbGRlciBnLXN0YXRlLXRleHQgZ2ktYmd3IGdpLXN0YWNrLXBvcy0tcmJ8ZmEtbGV2ZWwtZG93biBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLXN0YWNrLXBvcy0tcnRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFptZW5pdFR5cFBobF9DZWwoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktZG90YWNlIGctc3RhdGUtYmFja2dyb3VuZHxnaS1kb3J1YyBnaS1zdGFjay1wb3MtLWx0IGctc3RhdGUtdGV4dCBnLXN0YXRlLWZhdm9yaXRlIGdpLXJvdFkxODBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFptZW5pdFR5cFBobF9Qb2QoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktZG90YWNlIGctc3RhdGUtYmFja2dyb3VuZHxnaS1kb3J1YyBnaS1zdGFjay1wb3MtLWx0IGctc3RhdGUtdGV4dCBnLXN0YXRlLWltcG9ydGFudCBnaS1yb3RZMTgwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBabWVuaXRUeXBQaGxfSW5zKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLWRvdGFjZSBnLXN0YXRlLWJhY2tncm91bmR8Z2ktZG9ydWMgZ2ktc3RhY2stcG9zLS1sdCBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nIGdpLXJvdFkxODBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFptZW5pdFR5cFBobF9FeGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktZG90YWNlIGctc3RhdGUtYmFja2dyb3VuZHxnaS1kb3J1YyBnaS1zdGFjay1wb3MtLWx0IGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yIGdpLXJvdFkxODBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFptZW5pdFR5cFBobF9QcmUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktZG90YWNlIGctc3RhdGUtYmFja2dyb3VuZHxnaS1kb3J1YyBnaS1zdGFjay1wb3MtLWx0IGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm8gZ2ktcm90WTE4MFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gWm1lbml0VHlwUGhsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLWRvdGFjZSBnLXN0YXRlLWJhY2tncm91bmR8Z2ktcmVmcmVzaCBnaS1zdGFjay1wb3MtLWx0IGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFByZXZvZERsdWh1KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLWJhbmtvdm5pX3ByZXZvZCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFByZWhsZWRWeW1haGFuaSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1wb2hsZWRhdmthfGdpLW1hZ2dsYXNzIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm8gZ2ktc3RhY2stcG9zLS1sYlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFByZXBvY2V0U3RhdnUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZ2ktY2FsY3xnaS1zdW1hIGdpLWJndyBnaS1zdGFjay1wb3MtLXJiIGctc3RhdGUtdGV4dCBnLXN0YXRlLWZhdm9yaXRlXCI7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIFwiZ2ktY2FsY3xnaS1wZW5jaWwgZ2ktc3RhY2stcG9zLS1yYiBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLWJnd1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFBvc2xlZG5pUGxhdGNlUHJpcGFkdSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1kb3RhY2V8Z2ktaGlzdG9yeSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLXN0YWNrLXBvcy0tbHQgZ2ktYmd3XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBQb2hsZWRhdmt5UG9wbGF0bmlrYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1saXN0fGdpLXVzZXIgZ2ktc3RhY2stcG9zLS1yYiBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLWJnd1wiO1xyXG4gICAgICAgICAgICAvL3JldHVybiBcImZhLXVzZXJ8ZmEtYm9vayBnaS1zdGFjay1wb3MtLXJiIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIFBvcGxhdG5paygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1wb2hsZWRhdmthfGdpLXVzZXIgZ2ktc3RhY2stcG9zLS1sdCBnaS1iZ3dcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIE5hcG9qZW5pUG9wbGF0bmlrYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1vc29ieV9ldmlkZW5jZXxnaS1kb3J1YyBnaS1zdGFjay1wb3MtLWx0IGdpLXJvdFkxODB8Z2ktcGx1c19ib2xkIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm8gZ2ktc3RhY2stcG9zLS1yYiBnaS1iZ3dcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIE5hcG9qZW5pUGxhdGNlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImdpLW9zb2J5X2V2aWRlbmNlfGdpLWRvcnVjIGdpLXN0YWNrLXBvcy0tbHQgZ2ktcm90MjcwfGdpLXBsdXNfYm9sZCBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBacnVzZW5pVnNlY2hQcmVkcGlzdSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJnaS1wYXBpcnl8ZmEtdGltZXMtY2lyY2xlIGdpLXN0YWNrLXBvcy0tcmIgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZyBnaS1iZ3dcIjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBpa29ueVxyXG5cclxuICAgIC8vI3JlZ2lvbiBWYWxpZMOhdG9yeVxyXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3J5IHtcclxuICAgICAgICAvLyBQb23Fr2NrYTogcG9rdWQgcG91xb7DrXbDocWhIEpzb25EYXRlLCBuZWNobWUgc2kgdHlwXHJcbiAgICAgICAgdHlwZSBKc29uRGF0ZSA9IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZZXZlZGUgRGF0ZSB8IEpzb25EYXRlIG5hIFwiZGF0ZS1vbmx5IGtsw63EjVwiIFlZWVlNTUREIGpha28gxI3DrXNsby5cclxuICAgICAgICAgKiAtIERhdGU6IGJlcmUgc2UgbG9rw6FsbsOtIGthbGVuZMOhxZkgKGdldEZ1bGxZZWFyL2dldE1vbnRoL2dldERhdGUpLlxyXG4gICAgICAgICAqIC0gSnNvbkRhdGU6IHZlem1lIHNlIGplbiBZWVlZLU1NLUREIHogcG/EjcOhdGt1IHN0cmluZ3UsIMSNYXMgaWdub3J1amVtZS5cclxuICAgICAgICAgKiAgIChUai4gXCIyMDIzLTAzLTI5VDAwOjAwOjAwXCIgLT4gMjAyMzAzMjkpXHJcbiAgICAgICAgICogUG9rdWQgc3RyaW5nIG5lb2JzYWh1amUgdmFsaWRuw60gZGF0dW0sIHZ5aG9kw60gY2h5YnUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdG9EYXRlT25seUtleSh2YWx1ZTogRGF0ZSB8IEpzb25EYXRlKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHZhbHVlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtID0gdmFsdWUuZ2V0TW9udGgoKSArIDE7IC8vIDAtYmFzZWRcclxuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSB2YWx1ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geSAqIDEwMDAwICsgbSAqIDEwMCArIGQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEpzb25EYXRlOiBleHRyYWh1amVtZSBZWVlZLU1NLUREIHogcG/EjcOhdGt1IMWZZXTEm3pjZVxyXG4gICAgICAgICAgICBjb25zdCBtID0gL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KS8uZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOZXBsYXRuw70gZm9ybcOhdCBkYXRlLW9ubHkgSlNPTkRhdGU6ICR7dmFsdWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeSA9IE51bWJlcihtWzFdKTtcclxuICAgICAgICAgICAgY29uc3QgbW0gPSBOdW1iZXIobVsyXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRkID0gTnVtYmVyKG1bM10pO1xyXG5cclxuICAgICAgICAgICAgLy8gWsOha2xhZG7DrSBrb250cm9sYSByb3pzYWjFryAodm9saXRlbG7DqSwgYWxlIHXFvml0ZcSNbsOpKVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBtbSA8IDEgfHwgbW0gPiAxMiB8fFxyXG4gICAgICAgICAgICAgICAgZGQgPCAxIHx8IGRkID4gMzEgfHxcclxuICAgICAgICAgICAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKHkpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG1tKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihkZClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5lcGxhdG7DvSByb3pzYWggZGF0YTogJHt2YWx1ZX1gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHkgKiAxMDAwMCArIG1tICogMTAwICsgZGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb3Jvdm7DoXZhxI06IHBvcm92bsOhdsOhIHBvdXplIGthbGVuZMOhxZluw60gZG55IChkYXRlLW9ubHkpLlxyXG4gICAgICAgICAqIFZyYWPDrSBjaHlidSwgcG9rdWQgZGF0dW0gdnpuaWt1IGplIFwidiB1emF2xZllbsOpbSBvYmRvYsOtXCIsXHJcbiAgICAgICAgICogdGouIHBva3VkIGplIG1lbsWhw60gbmXFviBkYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICogQHBhcmFtIGRhdF92em5pa3UgRGF0dW0gdnpuaWt1IChEYXRlIHwgSnNvbkRhdGUpXHJcbiAgICAgICAgICogQHBhcmFtIGRhdF91emF2IERhdHVtIHV6YXbFmWVuw60gKERhdGUgfCBKc29uRGF0ZSlcclxuICAgICAgICAgKiBAcmV0dXJucyBib29sZWFuIC0gdHJ1ZSA9IE9LLCBmYWxzZSA9IGNoeWJhIChkYXR1bSB2em5pa3UgdiB1emF2xZllbsOpbSBvYmRvYsOtKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIFBvcm92bmFuaURhdHVtdShcclxuICAgICAgICAgICAgZGF0X3Z6bmlrdTogRGF0ZSB8IEpzb25EYXRlLFxyXG4gICAgICAgICAgICBkYXRfdXphdjogRGF0ZSB8IEpzb25EYXRlXHJcbiAgICAgICAgKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZ6bmlrS2V5ID0gdG9EYXRlT25seUtleShkYXRfdnpuaWt1KTtcclxuICAgICAgICAgICAgY29uc3QgdXphdktleSA9IHRvRGF0ZU9ubHlLZXkoZGF0X3V6YXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gUMWZw61rbGFkIGxvZ2lreTpcclxuICAgICAgICAgICAgLy8gLSBwb2t1ZCBqZSBkYXR1bSB2em5pa3UgZMWZw612ZSBuZcW+IHV6YXbFmWVuw6kgb2Jkb2LDrSAodXphdsWZZW7DrSksIHRhayBqZSB0byDFoXBhdG7Em1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZ6bmlrS2V5ID49IHV6YXZLZXk7XHJcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvciBwcm8gcG9yb3Zuw6Fuw60gZGF0YSAodnpuaWt1KSBzIGRhdGVtIHV6YXbFmWVuw60gKHR5cHUgcG9obGVkw6F2a3kpXHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgR0NvbnRlbnQgLSBUSElTXHJcbiAgICAgICAgICogQHBhcmFtIGRhdF91emF2IERhdHVtIHV6YXbFmWVuw60gdHlwdSBwb2hsZWTDoXZreSAoRGF0ZSB8IEpzb25EYXRlKVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXR1bU5hemV2IE7DoXpldiBkYXRhIHBybyBjaHlib3ZvdSBobMOhxaFrdSAodm9saXRlbG7DqSwgdsO9Y2hvesOtIFwiRGF0dW0gdnpuaWt1XCIpXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gVmFsaWRhdG9yRGF0VnpuaWt1RGF0VXphdihjb250ZW50OiBHQ29udGVudCwgZGF0X3V6YXY6IERhdGUgfCBKc29uRGF0ZSwgZGF0dW1OYXpldj86IHN0cmluZyk6IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3IgPSBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSgpO1xyXG5cclxuICAgICAgICAgICAgZGF0dW1OYXpldiA9IGRhdHVtTmF6ZXYgfHwgXCJEYXR1bSB2em5pa3VcIjtcclxuXHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZGF0dW1OYXpldn0gamUgemFkw6FubyB2IHV6YXbFmWVuw6ltIG9iZG9iw60hYDsgLy8gPyBNb8W+bsOhIHphZGF0IHRha8OpIGRhdHVtIHV6YXbFmWVuw60gP1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAoTXlWYWx1ZSwgc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVBvcm92bmFuaURhdHVtdShNeVZhbHVlLCBkYXRfdXphdikpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmVycm9yVHlwZSA9IFwiZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm1lc3NhZ2UgPSAnRGF0dW0gdnpuaWt1IGplIHphZMOhbm8gdiB1emF2xZllbsOpbSBvYmRvYsOtISdcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0b3BwaW5nID0gdHJ1ZTsgLy8gZXZpZGVuY2UgYnVkZSB6YWvDoXrDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yLnN0b3BwaW5nID0gdHJ1ZTsgLy8gPyBuZXR1xaHDrW0gemRhIGZ1bmd1amUgIVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vVE9ETzogbGV0IHBvc3VuX3NwbCA9IHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwicG9zdW5fc3BsXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBWYWxpZMOhdG9yeVxyXG5cclxuXHJcblxyXG4gICAgLy9yZWdpb24gcG9tb2Nuw6kgYWtjZSBwcm8gcHJlZmFieVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pY2UgcGFyYW1ldHLFryBFS08gYWtjZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dBY3Rpb25QYXJhbXNEZWZPYmpCYXNlfSBwYXJhbXNEZWYgZGVmYXVsdG7DrSBwYXJhbWV0cnkgcMWZw61zbHXFoW7DqSBha2NlXHJcbiAgICAgKiBAcGFyYW0ge0dBY3Rpb25QYXJhbXNEZWZPYmp9IHBhcmFtcyBkYWzFocOtIHBhcmFtZXRyeSBha2NlXHJcbiAgICAgKiBAcmV0dXJucyB7R0FjdGlvblBhcmFtc0RlZk9ian0gdsO9c2xlZG7DqSBwYXJhbWV0cnkgYWtjZSBwb2TDoW7DrVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQYXJhbXNGaWVsZFJvdyhwYXJhbXNEZWY6IEdGb3JtUm93T3B0aW9ucywgcGFyYW1zOiBHRm9ybVJvd09wdGlvbnMgfCB1bmRlZmluZWQpOiBHRm9ybVJvd09wdGlvbnMge1xyXG5cclxuICAgICAgICAvLyBzcG9qZW7DrSBwYXJhbWV0csWvIHogdmVua3UgcyBkZWZhbHRuw61taSBwYXJhbWV0cnkgcMWZw61zbHXFoW7DqSBha2NlXHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHBhcmFtc0RlZiwgcGFyYW1zIHx8IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFDFmWlkw6Fuw60ga29ww61yb3ZhY8OtaG8gdGxhxI3DrXRrYSBkbyBwb2zDrcSNa2FcclxuICAgICAqIEBwYXJhbSB7R1N0cmluZ0JveE9wdGlvbnN9IGZpZWxkT3B0aW9ucyBwYXJhbWV0cnkgcG9sw63EjWthXHJcbiAgICAgKiBAcmV0dXJucyB7R1N0cmluZ0JveE9wdGlvbnN9IHBhcmFtZXRyeSBwb2zDrcSNa2EgZG9wbG7Em27DqSBvIGtvcMOtcm92YWPDrSB0bGHEjcOtdGtvXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBhZGRDb3B5VG9DbGlwYm9hcmRCdXR0b24oZmllbGRPcHRpb25zOiBHU3RyaW5nQm94T3B0aW9ucyk6IEdTdHJpbmdCb3hPcHRpb25zIHtcclxuXHJcbiAgICAgICAgaWYgKCFmaWVsZE9wdGlvbnMuYnV0dG9ucykge1xyXG4gICAgICAgICAgICBmaWVsZE9wdGlvbnMuYnV0dG9ucyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmllbGRPcHRpb25zLmJ1dHRvbnMucHVzaChHb3JkaWMuR2luLlByZWZhYnMuRmllbGQuQ3JlYXRlVWxveml0RG9DbGlwYm9hcmR1QnV0dG9uKGZpZWxkT3B0aW9ucy5uYW1lID8gZmllbGRPcHRpb25zLm5hbWUgOiBcIlwiKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmaWVsZE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vZW5kcmVnaW9uIHBvbW9jbsOpIGFrY2UgcHJvIHByZWZhYnlcclxufSJdfQ==