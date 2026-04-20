"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.Base.ts                                </Name>
//    <Description> Sdílené metody a funkce napříč celým modulem DDP            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
/**
 * Sdílené metody a funkce napříč celým modulem DDP
 */
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var Base;
                (function (Base) {
                    //#region Základní funkce
                    /**
                     * Metoda která vrací dialog s warningem, vrátí-li některá z kontrol při inicializaci chybu
                     * @param {GContent} that Instance of GContent
                     * @param {string | null} text Očekáváná chybová hláška při inicializaci | V případě že je null, tak se dialog nezobrazí
                     * @returns Status code (0 for success, other for failure)
                     */
                    function DdpEkoInit(that, text, typPhl) {
                        const idOfNotif = "ddpEkoInitNotifId";
                        if (text != null) {
                            let tryFindPrevNotif = that.notification("findById", idOfNotif);
                            if (tryFindPrevNotif != null) {
                                // Pokud už notifikace existuje, tak ji odstraním ze seznamu...
                                that.notification("remove", idOfNotif);
                            }
                            // Přidám novou notifikaci s chybou
                            return that.notification("add", {
                                id: idOfNotif,
                                state: "error",
                                icon: "fa-times-circle g-state-text g-state-error",
                                title: "Chyba administrace typu pohledávky",
                                content: text,
                            }, true);
                        } // <<<===== Tímto by mělo končit všechno načítání....
                        return 0; // <<<===== Doplněn return z důvodu správné syntaxe
                    }
                    Base.DdpEkoInit = DdpEkoInit;
                    //#region Debug & Develop 
                    //NOTE: ginisDebugMode a ginisDevelopMode jsou definovane v Gui.WebApp, ale vzhledem k tomu, ze se na to chytaji i komponenty v Gui.WebControls
                    //      tak to asi nevadi.
                    /**
                     * Vrací true, pokud je zapnutý debug režim (UserProcess.DebugMode)
                     * @returns {boolean} Vrací true, pokud je zapnutý debug režim
                     */
                    function debugMode() {
                        return window && !!window["ginisDebugMode"];
                    }
                    Base.debugMode = debugMode;
                    /** Jsme ve vyvojove vetvi (odpovida z CSharp: #if DEBUG || DEVELOP_VERSION) */
                    /**
                     * Vrací true, pokud jsme ve vyvojove vetvi
                     * @returns {boolean} Vrací true, pokud jsme ve vývojové větvi
                     */
                    function developMode() {
                        return window && !!window["ginisDevelopMode"];
                    }
                    Base.developMode = developMode;
                    function delay(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                    }
                    Base.delay = delay;
                    //#endregion
                    //#region JQueryPromise helpers
                    function confirmAsync(that, title, message) {
                        return new Promise(resolve => {
                            that.dialogs.confirm(title, message)
                                .on("close", (ev, retVal) => {
                                resolve(retVal === "yes");
                            });
                        });
                    }
                    Base.confirmAsync = confirmAsync;
                    function errorAsync(that, title, message) {
                        return new Promise(resolve => {
                            that.dialogs.error(title, message)
                                .on("close", () => resolve());
                        });
                    }
                    Base.errorAsync = errorAsync;
                    //#endregion JQueryPromise helpers
                    function ShowModalWindow(that, nameOfContent, ParamJSON, windowOption) {
                        var def = $.Deferred();
                        //this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDdpVzor", ParamJSON, windowOption)
                        let inputContent = "Gordic.Ddp.WebClient." + nameOfContent; // "Gordic.Ddp.WebClient.GDdpVzor";
                        let inputID = "DDP" + nameOfContent + "#"; // "DDPGDdpVzor#";        
                        ParamJSON["id"] = inputID; // "DDPGDdpVzor#";
                        windowOption = windowOption || {};
                        that.dialogs.showModalWindow(inputContent, ParamJSON, windowOption)
                            .on("close", (retVals) => {
                            def.resolve(retVals);
                        });
                        return def.promise();
                    }
                    Base.ShowModalWindow = ShowModalWindow;
                    //#endregion
                    //#region Funkce pro Typy pohledávek
                    /**
                     * Vytváří unikátní GUID
                     * @returns {string} Vrací GUID
                     */
                    function CreateGuid() {
                        function s4() {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1);
                        }
                        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                    }
                    Base.CreateGuid = CreateGuid;
                    ///**
                    // * Vytváří postranní navigaci s obsahem
                    // * @param content Instance GContent pro úpravu obsahu panelu
                    // */
                    //export function CreateOutline(content: GContent) {
                    //    content.element.gsidebar({
                    //        right: {
                    //            panels: [{
                    //                side: "right",
                    //                leaf: { caption: "Navigátor" },
                    //                open: function (ev, ctx) {
                    //                    var customDiv = $(this);
                    //                    if (!customDiv.hasClass("g-outline")) {
                    //                        customDiv.goutline().goutline(
                    //                            "bindForm",
                    //                            content.element,
                    //                            function (tree) {
                    //                                return tree;
                    //                            });
                    //                    } else {
                    //                        customDiv.goutline("refresh");
                    //                    }
                    //                }
                    //            }]
                    //        }
                    //    });
                    //}
                    //#endregion Typy pohledávek
                    //#region Funkce pro práci s barvama (Barvy vymáhání)
                    /**
                     * Vrací hexadecimální hodnotu barvy z číselné hodnoty
                     * @param {number} number Číselná hodnota barvy
                     * @returns {string} Hexadecimální hodnota barvy
                     */
                    function GetHexColor(number) {
                        return "#" + ("000000" + (((number) >>> 0).toString(16).slice(-6))).slice(-6).toUpperCase();
                    }
                    Base.GetHexColor = GetHexColor;
                    /**
                     * Vrací celou barvu z hexadecimální hodnoty
                     * @param hex - hexadecimální barva jako řetězec
                     * @returns - číselná hodnota RGBA barvy
                     */
                    function GetIntColor(hex) {
                        //let regex = new RegExp('#[0-9A-Fa-f]{2}[0-9A-Fa-f]{2}[0-9A-Fa-f]{2}');
                        let regex = new RegExp('#[0-9A-Fa-f]{6}');
                        let match = regex.exec(hex);
                        if (match == null)
                            throw "Chyba při převodu barvy na číslo.";
                        //TODO: Test
                        var r = parseInt(`0x${match[0].substring(1, 2 + 1)}`) & 0xFF; //var r = parseInt(`0x${match[0].substr(1, 2)}`) & 0xFF;
                        var g = parseInt(`0x${match[0].substring(3, 2 + 3)}`) & 0xFF; //var g = parseInt(`0x${match[0].substr(3, 2)}`) & 0xFF;
                        var b = parseInt(`0x${match[0].substring(5, 2 + 5)}`) & 0xFF; //var b = parseInt(`0x${match[0].substr(5, 2)}`) & 0xFF;
                        var a = 255 & 0xFF;
                        var rgbaInt = (a << 24) + (r << 16) + (g << 8) + (b);
                        return rgbaInt;
                    }
                    Base.GetIntColor = GetIntColor;
                    /**
                     * Vrací barvu z číselné hodnoty
                     * @returns {string[][]} Hexadecimální hodnota barvy
                     */
                    function GetDefaultColors() {
                        return [
                            [
                                "#330000",
                                "#331900",
                                "#333300",
                                "#193300",
                                "#003300",
                                "#003319",
                                "#003333",
                                "#001933",
                                "#000033",
                                "#190033",
                                "#330033",
                                "#330019",
                                "#000000"
                            ],
                            [
                                "#660000",
                                "#663300",
                                "#666600",
                                "#336600",
                                "#006600",
                                "#006633",
                                "#006666",
                                "#003366",
                                "#000066",
                                "#330066",
                                "#660066",
                                "#660033",
                                "#202020"
                            ],
                            [
                                "#990000",
                                "#994C00",
                                "#999900",
                                "#4C9900",
                                "#009900",
                                "#00994C",
                                "#009999",
                                "#004C99",
                                "#000099",
                                "#4C0099",
                                "#990099",
                                "#99004C",
                                "#404040"
                            ],
                            [
                                "#CC0000",
                                "#CC6600",
                                "#CCCC00",
                                "#66CC00",
                                "#00CC00",
                                "#00CC66",
                                "#00CCCC",
                                "#0066CC",
                                "#0000CC",
                                "#6600CC",
                                "#CC00CC",
                                "#CC0066",
                                "#606060"
                            ],
                            [
                                "#FF0000",
                                "#FF8000",
                                "#FFFF00",
                                "#80FF00",
                                "#00FF00",
                                "#00FF80",
                                "#00FFFF",
                                "#0080FF",
                                "#0000FF",
                                "#7F00FF",
                                "#FF00FF",
                                "#FF007F",
                                "#808080"
                            ],
                            [
                                "#FF3333",
                                "#FF9933",
                                "#FFFF33",
                                "#99FF33",
                                "#33FF33",
                                "#33FF99",
                                "#33FFFF",
                                "#3399FF",
                                "#3333FF",
                                "#9933FF",
                                "#FF33FF",
                                "#FF3399",
                                "#A0A0A0"
                            ],
                            [
                                "#FF6666",
                                "#FFB266",
                                "#FFFF66",
                                "#B2FF66",
                                "#66FF66",
                                "#66FFB2",
                                "#66FFFF",
                                "#66B2FF",
                                "#6666FF",
                                "#B266FF",
                                "#FF66FF",
                                "#FF66B2",
                                "#C0C0C0"
                            ],
                            [
                                "#FF9999",
                                "#FFCC99",
                                "#FFFF99",
                                "#CCFF99",
                                "#99FF99",
                                "#99FFCC",
                                "#99FFFF",
                                "#99CCFF",
                                "#9999FF",
                                "#CC99FF",
                                "#FF99FF",
                                "#FF99CC",
                                "#E0E0E0"
                            ],
                            [
                                "#FFCCCC",
                                "#FFE5CC",
                                "#FFFFCC",
                                "#E5FFCC",
                                "#CCFFCC",
                                "#CCFFE5",
                                "#CCFFFF",
                                "#CCE5FF",
                                "#CCCCFF",
                                "#E5CCFF",
                                "#FFCCFF",
                                "#FFCCE5",
                                "#FFFFFF"
                            ]
                        ];
                    }
                    Base.GetDefaultColors = GetDefaultColors;
                    /**
                     * Vrací barvu z číselné hodnoty
                     * @returns {number[]} Číselná hodnota barvy
                     */
                    var existingColors;
                    function GetColors() {
                        if (existingColors)
                            return existingColors;
                        var def = $.Deferred();
                        var colors = [].concat.apply([], GetDefaultColors()).map(x => {
                            return GetIntColor(x);
                        });
                        Gordic.Isl.SkupinaVymahani.pouziteBarvy({}).get()
                            .done((data) => {
                            let allColors = colors.concat(data.filter(x => { return colors.indexOf(x) < 0; }));
                            existingColors = allColors;
                            def.resolve(existingColors);
                        })
                            .fail(() => {
                            existingColors = colors;
                            def.resolve(existingColors);
                        });
                        return def.promise();
                    }
                    Base.GetColors = GetColors;
                    //#endregion Barvy
                    //#region Funkce pro práci s obsahem conctentu
                    /**
                     * Vrací pole čísel pro nastavení selectboxů
                     * @param {number} start - Počáteční hodnota
                     * @param {number} end - Koncová hodnota
                     */
                    function naplneniPole(start, end) {
                        let a = [];
                        for (let i = 0; start < end; i++) {
                            a[i] = start;
                            start++;
                            //a.push([i]);
                        }
                        return a;
                    }
                    Base.naplneniPole = naplneniPole;
                    /**
                     * Vrací pole čísel pro nastavení selectboxů Ktg_Upo_Pre
                     * @param {number} start - Počáteční hodnota
                     * @param {number} end - Koncová hodnota
                     */
                    function naplneniPoleKtgUpoPre(start, end) {
                        let a = [];
                        for (let i = 0; start < end; i++) {
                            a[i] = start;
                            start++;
                            //a.push([i]);
                        }
                        a.push(610, 615, 620, 630);
                        return a;
                    }
                    Base.naplneniPoleKtgUpoPre = naplneniPoleKtgUpoPre;
                    /**
                    * Nastaví pole pro výběr kategorie pohybu s možností výběru oblíbených kategorií
                    * @param content - GContent instance
                    * @param ixpDen - Identifikátor knihy
                    * @param typPhl - Typ pohledávky
                    * @param fieldName - Název formulářového pole (výchozí: "ktg_upo")
                    */
                    function nastaveniPoleKtgUpo(content, ixpDen, typPhl, fieldName) {
                        var useUpo = content.globalSettings.get("Global.Ddp.OblibeneKtgUpoSettings.UseUpo" + ixpDen + typPhl) ?? "0";
                        var useUpoArray = useUpo ? useUpo.split(',').map((item) => parseInt(item.trim(), 10)) : [];
                        // -- Kategorie pohybu --
                        var ktgUpoField = content.findFields(fieldName ?? "ktg_upo");
                        // Nastavení tooltipu tlačítka výběru řádku
                        var ktgUpoSelector = ktgUpoField.gfield("getButton", "selector");
                        ktgUpoSelector.gbutton("updateParams", {
                            caption: "Výběr kategorie pohybu (všechny)"
                        });
                        // Přidání tlačítka pro výběr řádku z číselníku (všechny možnosti)
                        ktgUpoField.gfield("addButton", {
                            action: new GAction({
                                name: "actKtgUpoFav",
                                icon: "fa-star",
                                tooltip: "<b>Výběr kategorie pohybu (oblíbené)<b>",
                                run: () => {
                                    new Gordic.Data.Selectors.DefaultSelector({
                                        data: new Gordic.Data.Readers.Fuccupo(),
                                        serverFilters: {
                                            ktg_upo: useUpoArray
                                        },
                                        gridFormat: new Gordic.Data.GridFormat()
                                            .addTextColumn({
                                            name: "result",
                                            caption: "Výběr hodnoty z nabídky",
                                            width: 120,
                                            cellTemplate: (data) => `${data.ktg_upo} - ${data.ktg_upo_txt}`
                                        }),
                                        related: ktgUpoField
                                    })
                                        .show()
                                        .done((data) => {
                                        content.findFields(fieldName ?? "ktg_upo").gfield("setValue", { ktg_upo: data.ktg_upo, ktg_upo_txt: data.ktg_upo_txt });
                                    });
                                }
                            })
                        });
                    }
                    Base.nastaveniPoleKtgUpo = nastaveniPoleKtgUpo;
                    /**
                    * Aktualizuje serverové filtry pro tlačítko výběru kategorie pohybu (oblíbené)
                    * @param content - GContent instance
                    * @param ixpDen - Identifikátor knihy
                    * @param typPhl - Typ pohledávky
                    * @param fieldName - Název formulářového pole (výchozí: "ktg_upo")
                    */
                    function aktualizovatPoleKtgUpo(content, ixpDen, typPhl, fieldName) {
                        var useUpo = content.globalSettings.get("Global.Ddp.OblibeneKtgUpoSettings.UseUpo" + ixpDen + typPhl) ?? "0";
                        var useUpoArray = useUpo ? useUpo.split(',').map((item) => parseInt(item.trim(), 10)) : [];
                        var ktgUpoField = content.findFields(fieldName ?? "ktg_upo");
                        // Najdeme tlačítko pro oblíbené kategorie
                        var favButton = ktgUpoField.gfield("getButton", "actKtgUpoFav");
                        if (favButton && favButton.length > 0) {
                            // Aktualizujeme akci s novými filtry
                            //var action = content.actions["actKtgUpoFav"];
                            favButton.remove();
                            var updatedAction = new GAction({
                                name: "actKtgUpoFav",
                                icon: "fa-star",
                                tooltip: "<b>Výběr kategorie pohybu (oblíbené)<b>",
                                run: () => {
                                    new Gordic.Data.Selectors.DefaultSelector({
                                        data: new Gordic.Data.Readers.Fuccupo(),
                                        serverFilters: {
                                            ktg_upo: useUpoArray
                                        },
                                        gridFormat: new Gordic.Data.GridFormat()
                                            .addTextColumn({
                                            name: "result",
                                            caption: "Výběr hodnoty z nabídky",
                                            width: 120,
                                            cellTemplate: (data) => `${data.ktg_upo} - ${data.ktg_upo_txt}`
                                        }),
                                        related: ktgUpoField
                                    })
                                        .show()
                                        .done((data) => {
                                        content.findFields(fieldName ?? "ktg_upo").gfield("setValue", { ktg_upo: data.ktg_upo, ktg_upo_txt: data.ktg_upo_txt });
                                    });
                                }
                            });
                            // Přidání tlačítka pro výběr řádku z číselníku (všechny možnosti)
                            ktgUpoField.gfield("addButton", {
                                action: updatedAction
                            });
                            //if (action) {
                            //    action.run = () => {
                            //        new Gordic.Data.Selectors.DefaultSelector({
                            //            data: new Gordic.Data.Readers.Fuccupo(),
                            //            serverFilters: {
                            //                ktg_upo: useUpoArray
                            //            },
                            //            gridFormat: new Gordic.Data.GridFormat()
                            //                .addTextColumn({
                            //                    name: "result",
                            //                    caption: "Výběr hodnoty z nabídky",
                            //                    width: 120,
                            //                    cellTemplate: (data) => `${data.ktg_upo} - ${data.ktg_upo_txt}`
                            //                }),
                            //            related: ktgUpoField
                            //        })
                            //            .show()
                            //            .done((data) => {
                            //                content.findFields(fieldName ?? "ktg_upo").gfield("setValue", { ktg_upo: data.ktg_upo, ktg_upo_txt: data.ktg_upo_txt });
                            //            })
                            //    };
                            //}
                        }
                    }
                    Base.aktualizovatPoleKtgUpo = aktualizovatPoleKtgUpo;
                    /**
                     * Formátuje číslo s oddělením tisíců a dvěma desetinnými místy
                     * @param number - číselná hodnota k formátování
                     * @returns formátovaný řetězec
                     */
                    function formatNumberWithSpacesAndDecimals(number) {
                        const formattedNumber = new Intl.NumberFormat('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(number);
                        return formattedNumber.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
                    }
                    Base.formatNumberWithSpacesAndDecimals = formatNumberWithSpacesAndDecimals;
                    /** Akce co se spustí po změně date pole*/
                    function changeDate(Content, datebox) {
                        var kontDat = Content.globalSettings.get("Global.Ddp.ObecneSettings.KontDat");
                        if (!kontDat)
                            return;
                        // Sledování změn ve formulářích (dokument) pro povolení uložení, pokud se jedná o needitovatelný případ
                        Content.findForms().gform("waitForValues").done(function () {
                            var date = datebox.gfield("getValue");
                            if (date == null)
                                return;
                            if (date < new Date(1980, 0, 1)) {
                                Content.dialogs.confirm("Datum", "Je zadáno datum menší než rok 1980, je to správně?").on("close", (ev, retVal) => {
                                    if (retVal === "no") {
                                        datebox.gfield("setValue", null);
                                    }
                                });
                            }
                            if (date > new Date(2050, 0, 1)) {
                                Content.dialogs.confirm("Datum", "Je zadáno datum větší než rok 2050, je to správně?").on("close", (ev, retVal) => {
                                    if (retVal === "no") {
                                        datebox.gfield("setValue", null);
                                    }
                                });
                            }
                        });
                    }
                    /**
                     * Rozsirena obsluha datumových políček GDateBox
                     * Při zavolání po vytvoření formulářu nastaví kl. zkratky na všechny fieldy typu GDateBox
                     * @param {GContent} Content - obsah, pro ktery se maji klavesy nastavit
                     * @param {string} field - pole, pro ktere se maji klavesy nastavit
                     */
                    function setDateBoxShortcuts(Content, field) {
                        if (field == null) {
                            field = ".gdatebox";
                        }
                        Content.actions.addRange([
                            // * doplni aktualni datum
                            {
                                name: "actDateBoxShortcutDateToday",
                                caption: "Doplni aktualní datum",
                                tooltip: "Doplni aktualní datum",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    var dnes = new Date();
                                    field.closest(".gfield").gfield("setValue", dnes);
                                }
                            },
                            // + pricte k datu 1 den
                            {
                                name: "actDateBoxShortcutDateAddDay",
                                caption: "Přidá den do aktualního datumu",
                                tooltip: "Přidá den do aktualního datumu",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    var day = field.closest(".gfield").gfield("getValue");
                                    var newDay = day.setDate(day.getDate() + 1);
                                    field.closest(".gfield").gfield("setValue", day);
                                    changeDate(Content, field.closest(".gfield"));
                                }
                            },
                            // - odecte od data 1 den
                            {
                                name: "actDateBoxShortcutDateRemDay",
                                caption: "Odebere den od aktualního datumu",
                                tooltip: "Odebere den od aktualního datumu",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    var day = field.closest(".gfield").gfield("getValue");
                                    var newDay = day.setDate(day.getDate() - 1);
                                    field.closest(".gfield").gfield("setValue", day);
                                    changeDate(Content, field.closest(".gfield"));
                                }
                            },
                            // f / F 1.1 aktualniho roku
                            {
                                name: "actDateBoxShortcutDateFirstThisYear",
                                caption: "Nastaví 1.1. aktuálního roku",
                                tooltip: "Nastaví 1.1. aktuálního roku",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    var day = field.closest(".gfield").gfield("getValue");
                                    var dnes = new Date();
                                    var thisYear = dnes.getFullYear();
                                    day.setFullYear(thisYear, 0, 1);
                                    field.closest(".gfield").gfield("setValue", day);
                                }
                            },
                            // m / M 1.mesice akt.roku
                            {
                                name: "actDateBoxShortcutDateFirstThisMonthThisYear",
                                caption: "Nastaví 1. den aktuálního měsíce a roku",
                                tooltip: "Nastaví 1. den aktuálního měsíce a roku",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    //var day: Date = field.closest(".gfield").gfield("getValue");
                                    const now = new Date(); // Získání aktuálního data
                                    const year = now.getFullYear(); // Aktuální rok
                                    const month = now.getMonth(); // Aktuální měsíc (0-based)
                                    // Vytvoření data s prvním dnem aktuálního měsíce
                                    const firstDate = new Date(year, month, 1);
                                    field.closest(".gfield").gfield("setValue", firstDate);
                                }
                            },
                            // p / P posledni den mesice akt.roku
                            {
                                name: "actDateBoxShortcutDateLastThisMonthThisYear",
                                caption: "Nastaví poslední den aktuálního měsíce a roku",
                                tooltip: "Nastaví poslední den aktuálního měsíce a roku",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    //var day: Date = field.closest(".gfield").gfield("getValue");
                                    const now = new Date(); // Získání aktuálního data
                                    const year = now.getFullYear(); // Aktuální rok
                                    const month = now.getMonth(); // Aktuální měsíc (0-based)
                                    // Vytvoření data s posledním dnem aktuálního měsíce
                                    const lastDate = new Date(year, month + 1, 0); // Den '0' předcházejícího měsíce
                                    field.closest(".gfield").gfield("setValue", lastDate);
                                }
                            },
                            // l / L posledni den akt.roku
                            {
                                name: "actDateBoxShortcutDateLastThisYear",
                                caption: "Nastaví poslední den aktuálního roku",
                                tooltip: "Nastaví poslední den aktuálního roku",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    const now = new Date(); // Získání aktuálního data
                                    const year = now.getFullYear(); // Aktuální rok
                                    // Vytvoření data s posledním dnem prosince aktuálního roku
                                    const lastDate = new Date(year, 11, 31); // Prosinec (11) a poslední den (31)
                                    field.closest(".gfield").gfield("setValue", lastDate);
                                }
                            },
                            // CTRL + přidá rok
                            {
                                name: "actDateBoxShortcutDateAddYear",
                                caption: "Přidá rok do aktualního datumu",
                                tooltip: "Přidá rok do aktualního datumu",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    var datum = field.closest(".gfield").gfield("getValue");
                                    datum.setFullYear(datum.getFullYear() + 1); // Přičtení roku
                                    field.closest(".gfield").gfield("setValue", datum);
                                    changeDate(Content, field.closest(".gfield"));
                                }
                            },
                            // CTRL - ubere rok
                            {
                                name: "actDateBoxShortcutDateRemYear",
                                caption: "Odebere rok od aktualního datumu",
                                tooltip: "Odebere rok od aktualního datumu",
                                run: function (ev) {
                                    //$(ev.target).gfield("setValue", new Date())                      
                                    var field = $(ev.target);
                                    var datum = field.closest(".gfield").gfield("getValue");
                                    datum.setFullYear(datum.getFullYear() - 1); // Odečtení roku
                                    field.closest(".gfield").gfield("setValue", datum);
                                    changeDate(Content, field.closest(".gfield"));
                                }
                            },
                            // CTRL + , - Nastaví datum dle uživatelského nastavení 'datum saldo'
                            {
                                name: "actDateBoxShortcutDateSaldo",
                                caption: "Nastaví datum dle uživatelského nastavení 'datum saldo'",
                                tooltip: "Nastaví datum dle uživatelského nastavení 'datum saldo'",
                                run: function (ev) {
                                    Content.isl.DdpUserSettings.priznakyDatumu({ save: false }).get().done(function (priznakNacteniDatumu) {
                                        var datumSaldo = new Date(); //výchozí hodnota je dnešní datum
                                        if (priznakNacteniDatumu) { //pokud je příznak true, tak můžeme načíst data z usersettings
                                            datumSaldo = Content.globalSettings.get("Global.Ddp.ObecneSettings.DatumSalda");
                                        }
                                        var field = $(ev.target);
                                        field.closest(".gfield").gfield("setValue", datumSaldo);
                                    });
                                }
                            },
                            //
                            // CTRL / vybere interval od začátku roku do dnešního dne
                            // CTRL m vybere interval od začátku měsíce do konce měsíce
                        ]);
                        var datebox = $(field);
                        datebox.on('change', () => {
                            changeDate(Content, datebox);
                        });
                        datebox.gshortcut({
                            key: "*", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateToday"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "+", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateAddDay"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "-", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateRemDay"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "f", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateFirstThisYear"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "m", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateFirstThisMonthThisYear"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "p", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateLastThisMonthThisYear"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "l", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateLastThisYear"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "ctrl++", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateAddYear"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "ctrl+-", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateRemYear"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                        datebox.gshortcut({
                            key: "ctrl+,", //klávesová zkratka
                            group: Gordic.Shortcuts.Groups.Field,
                            action: Content.actions["actDateBoxShortcutDateSaldo"],
                            canExecute: function (ev) { return !$(ev.target).closest(".gfield").gfield("option", "disabled"); }
                        });
                    }
                    Base.setDateBoxShortcuts = setDateBoxShortcuts;
                    //export function createStatusWidget(content: GContent, id: string, nazev: string) {
                    //    content
                    //    var statusWidget = $(".status-widget"); //najití počtového okýnka
                    //    //uhradyCelekm
                    //    $(statusWidget).before('<div class="status-widget" id="uhradyCelekm">K úhradě celkem: </div>'); //nalepení salda k počtu
                    //    content.uhradyCelekmStatusWidget = $("#uhradyCelekm")
                    //    content.uhradyCelekmStatusWidget.append(`<b class="g-state-text g-state-active">0</b>`);
                    //}
                    /**
                     * Vytvoření nové položky pro statusbar (vlastní metoda rozšířená o tooltip který v originální metodě nefungoval)
                     * @param {MenuParams} [params] další vlastnosti prvku (např. id, pod kterým bude prvek dostupný např. v this.statuses[])
                     * @returns {GObservableObject<MenuParams>} nová položka
                     */
                    function createDdpStatusBarItem(params) {
                        return new GObservableObject($.extend({ type: "static", caption: "", customClass: "g-state-text", tooltip: "", action: undefined }, params));
                    }
                    Base.createDdpStatusBarItem = createDdpStatusBarItem;
                    /**
                     * Aktualizace textu a stylu položky ve statusbaru
                     * @param {GObservableObject<MenuParams>} item položka ve statusbaru
                     * @param {string} text zobrazený text
                     * @param {tooltipText} text text v tooltipu
                     * @param {string | Eko.Utils.RecordFormatType | null} stateOrType požadovaný stav (třída) nebo typ záznamu. Pro null se nastaví jen text
                     * @param {string} ikona lze definovat ikonu která se přidá k textu status baru
                     */
                    function updateDdpStatusBarItem(item, text, tooltipText, stateOrType, ikona) {
                        if (typeof stateOrType === "string") {
                            item.update({
                                caption: text,
                                customClass: "g-state-text " + stateOrType,
                                tooltip: tooltipText,
                                icon: ikona ?? ""
                            });
                        }
                        else {
                            let cClass = undefined;
                            const recordFormatType = Gordic.Eko.Utils.RecordFormatType;
                            const colors = Gordic.Utils.Colors;
                            switch (stateOrType) {
                                // schválený zeleně
                                case recordFormatType.Schvaleno:
                                    cClass = colors.textSuccess;
                                    break;
                                // realizovaný modře
                                case recordFormatType.Realizovano:
                                    cClass = colors.textInfo;
                                    break;
                                // stornovaný červeně
                                case recordFormatType.Stornovano:
                                    cClass = colors.textError;
                                    break;
                                // vyřazený šedě - je to sice šedé, ale kurzívou
                                case recordFormatType.Vyrazeno:
                                    cClass = colors.textInactive;
                                    break;
                            }
                            item.update({
                                caption: text,
                                customClass: cClass,
                                tooltip: tooltipText,
                                icon: ikona ?? ""
                            });
                        }
                    }
                    Base.updateDdpStatusBarItem = updateDdpStatusBarItem;
                    //#endregion
                    //#region Funkce pro přepočty částek, DPH a dalších...
                    /**
                    * Metoda pro výpočet DPH
                    * @param {Decimal} c_p - Zadaná částka
                    * @param {boolean} b_vcetne_dph - Výpočet daně - při zadání částky s dph je TRUE)
                    * @param {Decimal} dph_proc_p - Hodnota daně
                    * @param {boolean} b_new - Určtení způsobu výpočtu (true = nový)
                    */
                    function vypocet_dph(c_p, b_vcetne_dph, dph_proc_p, b_new) {
                        //TODO b_new -> vytvořit metodu pro zjištění způsoby výpočtu dle Gupta fce "gf_ZpusobVypoctuDPH"
                        var c_dph_rp;
                        var c_bez_dph_rp;
                        var koef = new Decimal(0);
                        var zn = 1;
                        if (c_p.lt(0)) { // Otočení znaménka pro záporné hodnoty, ze zaporné hodnoty to dává odlišný výsledek          
                            zn = (-1);
                            c_p = c_p.mul(zn);
                        }
                        if (b_vcetne_dph) { // Výpočet daně při zadáni částky s DPH 
                            if (!b_new) {
                                koef = dph_proc_p.dividedBy(dph_proc_p.plus(100));
                                koef = koef.toDecimalPlaces(4); // Zaokrouhlení na 4 des. místa
                                c_dph_rp = c_p.mul(koef);
                                c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                            }
                            else {
                                c_dph_rp = c_p.mul(dph_proc_p.dividedBy(dph_proc_p.plus(100)));
                                c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                            }
                            // Částka bez DPH
                            c_bez_dph_rp = c_p.minus(c_dph_rp);
                        }
                        else {
                            // Výpočet daně při zadání částky bez DPH
                            if (b_new == false) {
                                koef = dph_proc_p.dividedBy(100);
                                c_dph_rp = c_p.mul(koef);
                                c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                            }
                            else {
                                c_dph_rp = c_p.mul(dph_proc_p.dividedBy(100));
                                c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                            }
                            // Částka bez DPH
                            c_bez_dph_rp = c_p;
                        }
                        c_dph_rp = c_dph_rp.mul(zn);
                        c_bez_dph_rp = c_bez_dph_rp.mul(zn);
                        return [c_dph_rp, c_bez_dph_rp];
                    }
                    Base.vypocet_dph = vypocet_dph;
                    /**
                     * Funkce pro vrácení procenta daně
                     * @param danTyp - Typ daně
                     */
                    function getProcentoDane(danTyp, sazbyDPH, datum, rokDph, mesicDph) {
                        //debugger; //?------------------------------- Mělo by fungovat v pořádku
                        //var that = this;
                        var vysledek;
                        if (datum) {
                            rokDph = datum.getFullYear();
                            mesicDph = datum.getMonth();
                        }
                        if (rokDph && mesicDph) {
                            var hodnota = Decimal.add(Decimal.mul(rokDph, 100).d[0], mesicDph).d[0];
                            if (sazbyDPH) {
                                sazbyDPH.forEach(function (x) {
                                    if (x.dan_typ === danTyp && x.rokmes_od <= hodnota.toString() && x.rokmes_do >= hodnota.toString()) {
                                        vysledek = x.dan_proc;
                                    }
                                });
                            }
                        }
                        return vysledek;
                    }
                    Base.getProcentoDane = getProcentoDane;
                    //#endregion
                    //#region Funkce pro zpracovávání ISLu
                    /**
                     * Metoda pro zpracování úspěšného výsledku z ISL
                     * ISL metoda musí být typu GResponse * @requires GResponse
                     * @param jqXHR - jqXHR object, which is a superset of the XMLHTTPRequest object (osobně nijak nevyužívám, ale jedná se o první návratovou hodnotu při FAILu serv. metody)
                     * @param {GContent} content - GContent (this, that, here,...)
                     * @param id - unikátní ID pro označení notifikace
                     */
                    function getSuccessMsgFromIsl(jqXHR, content, id) {
                        //var msg = "";
                        for (var i = 0; i < jqXHR.Messages.length; i++) {
                            //msg += jqXHR.Messages[i].Message;
                            setNotificationAfterOperation(content, id, jqXHR.Messages[i].Message);
                            //content.notification("showToast", { id: id, state: "success", title: "Úspěch operace", content: jqXHR.Messages[i].Message });
                        }
                    }
                    Base.getSuccessMsgFromIsl = getSuccessMsgFromIsl;
                    /**
                     * Metoda pro nastavení notifikace (například při úspěchu ISL metody)
                     * @param {GContent} content GContent (this, that, here,...)
                     * @param {string} id ID akce/operace
                     * @param {string} msg Zpráva o výsledku
                     * @param {GState} stav Stav notifikace (success, info, warning, error, important) - (Defaul = "success")  @default "success" @defaultValue "success"
                     * @param {string} method Metoda zobrazení notifikace (showToast, add)- (Defaul = "showToast")  @default "success" @defaultValue "showToast"
                     */
                    function setNotificationAfterOperation(content, id, msg, stav = "success", method = "showToast") {
                        let l_title = "Úspěch operace";
                        let l_icon = "fa-check-circle g-state-text g-state-success";
                        switch (stav) {
                            case "info": {
                                l_title = "Informace";
                                l_icon = "fa-info-circle g-state-text g-state-info";
                                break;
                            }
                            case "important": {
                                l_title = "Důležité";
                                l_icon = "fa-info-circle g-state-text g-state-important";
                                break;
                            }
                            case "warning": {
                                l_title = "Upozornění";
                                l_icon = "fa-exclamation-triangle g-state-text g-state-warning";
                                break;
                            }
                            case "error": {
                                l_title = "Chyba - neúspěšná operace";
                                l_icon = "fa-times-circle g-state-text g-state-error";
                                break;
                            }
                            case "success": {
                                l_title = "Úspěch operace";
                                l_icon = "fa-check-circle g-state-text g-state-success";
                                break;
                            }
                            default: break;
                        }
                        id = id + "_" + stav + "_" + content.gpcToken; //let l_id: string = id + "_" + stav + "_" + that.IxsFun
                        if (method === "add")
                            return content.notification("add", { id: id, state: stav, icon: l_icon, title: l_title, content: msg }, true);
                        return content.notification("showToast", { id: id, state: stav, icon: l_icon, title: l_title, content: msg });
                    }
                    Base.setNotificationAfterOperation = setNotificationAfterOperation;
                    /**
                     * Metoda pro zpracování NEúspěšného výsledku z ISL
                     * @param {GContent} content - GContent (this, that, here,...)
                     * @param jqXHR - jqXHR object, which is a superset of the XMLHTTPRequest object (osobně nijak nevyužívám, ale jedná se o první návratovou hodnotu při FAILu serv. metody)
                     * @param typ - Typ vyjímky ( exeption, ... ) |- Také se lze dotazovat konkétně pomocí obj.baseType (např. ...)
                     * @param obj - Object s daty o výsledku ISL metody (-> jqXHR.details)
                     */ //* @param retType - Způsob jak se má dialog s chybou vracet 
                    function getFailFromIsl(content, jqXHR, typ, obj) {
                        let boxTitle = "Chyba"; // - Titulek okna s chybou
                        //něco se pokazilo tak vrátim hlášku o důvodu neúspěchu
                        content.endOperation(); // Projistotu se pokusím ještě ukončit operaci - kdyby někde nějaká běžela...
                        console.log(obj.Data); // - pro debugování atd. data v konzoli se často hodí mít
                        if (typ === "exception") { // - Jeli chyba typu exception... (což by měla být každá chyba ze serverové metody) 
                            obj.handled = true; // - Tímto zajistím (zruším) zobrazení gordického okna 
                            if (obj.baseType == 'Gordic.General.GFatalSplException' || obj.baseType == 'Gordic.General.GNonFatalSplException') { // - Jeli chyba GFatalSplException | což by měla být chyba vrácená z procedury
                                let retSplException = tryParseSplErrorMessage(obj.baseMessage); // - Zkusím si ji upravit aby nevracelá nehezký text
                                obj.baseMessage = retSplException[0]; // - Zde je text chyby
                                if (retSplException[1] != "")
                                    boxTitle += ` (${retSplException[1]})`; // - Zde je číslo chyby
                            }
                            return content.dialogs.error(boxTitle, obj.baseMessage);
                        }
                        /* TODO: tuto část vymazat -> v ideálních podmínkách toto už by nemělo nastat... */
                        /*//*/ else if (typ == 'Interface.LK.Isl.Common.GResponse') { // V případě že mi chyba přijde v mém typu GResponse ( = Gordic.Ddp.Interface.LK.Isl.Common.GResponse )
                            /*//*/ var msg = "";
                            /*//*/ for (var i = 0; i < jqXHR.Messages.length; i++) {
                                /*//*/ msg += jqXHR.Messages[i].Message;
                                /*//*/ msg += "<br>";
                                /*//*/ }
                            /*//*/ return content.dialogs.error(boxTitle, msg);
                            /*//*/ }
                    }
                    Base.getFailFromIsl = getFailFromIsl;
                    /**
                     * Metoda pro zpracování NEúspěšného výsledku z ISL | vrací $.Deferred<void>() /.promise() /.reject()
                     * @param {GContent} content - GContent (this, that, here,...)
                     * @param jqXHR - jqXHR object, which is a superset of the XMLHTTPRequest object (osobně nijak nevyužívám, ale jedná se o první návratovou hodnotu při FAILu serv. metody)
                     * @param typ - Typ vyjímky ( exeption, ... ) |- Také se lze dotazovat konkétně pomocí obj.baseType (např.
                     * @param obj - Object s daty o výsledku ISL metody (jqXHR.details)
                     * @returns {JQueryPromise<void>} vrací deferred - promise - reject
                     */ //* @param defered - var defered = $.Deferred<void>();
                    function getFailFromIslPromise(content, jqXHR, typ, obj) {
                        var def = $.Deferred();
                        let errTitle = "Chyba";
                        //něco se pokazilo tak vrátim hlášku o důvodu neúspěchu
                        content.endOperation(); // Projistotu se pokusím ještě ukončit operaci - kdyby někde nějaká běžela...
                        if (typ === "exception") { // - Jeli chyba typu exception...
                            obj.handled = true; // - Tímto zajistím (zruším) zobrazení  
                            if (obj.baseType == 'Gordic.General.GFatalSplException' || obj.baseType == 'Gordic.General.GNonFatalSplException') { // - Jeli chyba GFatalSplException | což by měla být chyba vrácená z procedury
                                obj.baseMessage = tryParseSplErrorMessage(obj.baseMessage); // - Zkusím si ji upravit aby nevracelá nehezký text
                                errTitle = "Chyba při spracovávání procedury";
                            }
                            content.dialogs.error(errTitle, obj.baseMessage)
                                .on("close", (ev, retVal) => {
                                def.reject();
                            });
                        } // TODO: tuto část vymazat -> v ideálních podmínkách toto už by nemělo nastat..
                        else {
                            def.reject(); //.promise();
                        }
                        return def.promise();
                    }
                    Base.getFailFromIslPromise = getFailFromIslPromise;
                    /**
                     * Metoda pro zformování textu chyby.
                     * @param {string} input text chyby který obsahuje chybu vyhozenou z procedury, tzn. je-li baseType 'GFatalSplException'
                     * @returns {string} Zformátovaný text pro dialogs.error()
                     */
                    function tryParseSplErrorMessage(input) {
                        //TODO: teď když procedury udeme zpracovávat ručně, možná bude třeba to tady upravit nebo doplnit (také chceme vracet číslo chyb, které se následně bude objevovat v titulku okna.
                        let output = "";
                        let splCode = "";
                        // Hledání začátku řetězce – končí na prvním slově s dvojtečkou
                        const startMatch = input.match(/^procedura\s+([\s\S]+?)\s+\S+:/);
                        if (startMatch) {
                            // Hledání názvu procedury (slovo po "procedura")
                            const procedureNameMatch = input.match(/^procedura\s+(\S+)/i);
                            let procedureName = procedureNameMatch ? `<b>${procedureNameMatch[1]}</b>` : "";
                            // Dohotovení začátku output textu...
                            output = `Procedura ${procedureName} ${startMatch[1].replace(procedureNameMatch?.[1] || "", "").trim()}.`;
                            // Hledání "kód:" a extrakce hodnoty
                            const codeMatch = input.match(/\bkód:\s*(-?\d+|\w+)/);
                            if (codeMatch) {
                                output += `<br/> Kód chyby: <b>${codeMatch[1]}</b>`;
                                splCode = codeMatch[1];
                            }
                            // Hledání "text:" a extrakce hodnoty až po "lok:"
                            const textMatch = input.match(/text:\s*(.*?)\s*lok:/s);
                            if (textMatch) {
                                output += ` <br/> ${textMatch[1].trim()}`;
                            }
                        }
                        // Pokud jsme nic neextrahovali, vrátíme původní vstup
                        if (output.length === 0) {
                            output = input;
                        }
                        // Pokud input neobsahuje požadovaný tvar, tak alespoň nastavím první písmeno velké =)
                        output = output.charAt(0).toUpperCase() + output.slice(1);
                        return [output, splCode];
                    }
                    Base.tryParseSplErrorMessage = tryParseSplErrorMessage;
                    function PidValidation(input) {
                        if (input.length != 12)
                            return false;
                        return new Gordic.Validators.Ixs({ pid: true }).validate(input, $.newDiv()) ? true : false;
                    }
                    Base.PidValidation = PidValidation;
                    /**
                     * Úprava definic akcí, menu, kpi, ... pro detailbuilder (pro detaily nepoužívající WFL/SSL komponenty)
                     *
                     * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                     */
                    function changeBuilderDefinition(builder) {
                        // menu - odpinování 
                        //builder.updateDefinition("menuHistoryOpen", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflCinnosti", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflCinnostiOdeslani", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflCinnostiZadostOPodpis", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflCinnostiSchvalovaciProces", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflCinnostiAutKonverze", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflVazby", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflRedistribuce", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflRedistribucePredaniSsl", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        //builder.updateDefinition("menuWflRedistribucePrideleniSsl", { favorite: false }, GDbd.DefinitionKind.MenuBar);
                        // menu - přesun z dokumentu
                        //let itemSouvVaz = builder.getDefinition("menuSouvisejici", GDbd.DefinitionKind.MenuBar);
                        //if (itemSouvVaz && itemSouvVaz.length > 0 && itemSouvVaz[0]?.item && (itemSouvVaz[0].item as any).id === "menuSouvisejici") {
                        //    if ((itemSouvVaz[0].item as any).parent) delete (itemSouvVaz[0].item as any).parent;
                        //    if ((itemSouvVaz[0].item as any).after) delete (itemSouvVaz[0].item as any).after;
                        //    builder.moveDefinitionAfter("menuSouvisejici"/*"menuRunSouvDok"*/, "menuHistoryOpen", GDbd.DefinitionKind.MenuBar);
                        //}
                        builder.moveDefinitionAfter("menuTisk", "menuDdpPripadPodani", GDbd.DefinitionKind.MenuBar);
                        builder.updateDefinition("menuTiskPripadDDP", { parent: "menuTisk" }, GDbd.DefinitionKind.MenuBar);
                        builder.moveDefinitionBefore("menuTiskPripadDDP", "menuTiskUzivatelskePoznamky", GDbd.DefinitionKind.MenuBar);
                        builder.moveDefinitionAfter("menuWflCinnosti", "menuRedistribuce", GDbd.DefinitionKind.MenuBar);
                        builder.moveDefinitionAfter("menuHistoryOpen", "menuWflCinnosti", GDbd.DefinitionKind.MenuBar);
                        builder.updateDefinition("menuWflCinnosti", { icon: "gi-doc-in-folder_bold" }, GDbd.DefinitionKind.MenuBar);
                        // nastaveni funkcí případu na začátek menu
                        //builder.moveDefinitionBefore("menuDdpPripad", "menuListControlsPreviousRecord", GDbd.DefinitionKind.MenuBar);
                        //builder.moveDefinitionBefore("menuGPripadyPodani", "menuListControlsPreviousRecord", GDbd.DefinitionKind.MenuBar);
                    }
                    Base.changeBuilderDefinition = changeBuilderDefinition;
                    function ProcessResponse(promise, content, closeOnSuccess = false, closeOnFail = false, getSuccessMsg = true) {
                        if (promise == null)
                            return promise;
                        let returnPromise = $.Deferred();
                        /** Získání stavu výsledku operace */
                        let getState = (state) => {
                            if (state == null)
                                return undefined;
                            switch (state) { // Upraveno pro účely volání funkce setNotificationAfterOperation()
                                case 0 /* Interface.LK.Isl.Common.GMessageType.Success */:
                                    return "success";
                                //return "g-state-success";
                                case 1 /* Interface.LK.Isl.Common.GMessageType.Error */:
                                    return "error";
                                //return "g-state-error";
                                case 2 /* Interface.LK.Isl.Common.GMessageType.Warning */:
                                    return "warning";
                                //return "g-state-warning";
                            }
                        };
                        /** Získaní titulku okna - nyní součástí metody na základě state výsledku */
                        let getTitle = (state) => {
                            if (state == null)
                                return undefined;
                            switch (state) {
                                case 0 /* Interface.LK.Isl.Common.GMessageType.Success */:
                                    return "Úspěch";
                                case 1 /* Interface.LK.Isl.Common.GMessageType.Error */:
                                    return "Chyba";
                                case 2 /* Interface.LK.Isl.Common.GMessageType.Warning */:
                                    return "Varování";
                            }
                        };
                        /** Získaní a nastavení zprávy o chybě */
                        let getMessage = (message) => {
                            if (message == null)
                                return "Neznámá chyba";
                            else
                                return message;
                        };
                        /** Zavolání funkce pro zobrazení výsledku operace - notification (dříve flash) */
                        let showResponse = (response, content) => {
                            if (response.Messages != null && response.Messages.length > 0)
                                response.Messages.forEach((value, index, array) => {
                                    content.showFlash(getMessage(value.Message), getState(value.Type) /*, 10000*/);
                                    //content.notification("showToast", { title: getTitle(value.Type), content: getMessage(value.Message) });
                                    //setNotificationAfterOperation(content, "afterProcessResponse", getMessage(value.Message), getState(value.Type), );
                                });
                        };
                        promise
                            .done((response) => {
                            if (response == null || getSuccessMsg == false) {
                                returnPromise.resolve(response);
                                return;
                            }
                            if (response.Success == true && response.SuccessMsg != null && response.SuccessMsg.trim() != "")
                                setNotificationAfterOperation(content, "afterProcessResponse", response.SuccessMsg, "success");
                            if (response["Responses"] != null) {
                                let typedResp = response;
                                if (typedResp != null) {
                                    if (typedResp.Success)
                                        returnPromise.resolve(response);
                                    else
                                        returnPromise.reject(response);
                                    let closeContent = (closeOnSuccess && typedResp.Success) || (closeOnFail && !typedResp.Success);
                                    let targetContent = closeContent && content.parentContent != null ? content.parentContent : content;
                                    if ((!closeContent || (closeContent && targetContent !== content)) && typedResp.Responses != null) {
                                        typedResp.Responses.forEach((value, index, array) => {
                                            showResponse(value, targetContent);
                                        });
                                    }
                                    if (closeContent) {
                                        content.close(typedResp.Success);
                                    }
                                }
                                else
                                    returnPromise.resolve(response);
                            }
                            else if (response["Messages"] != null) {
                                let typedResp = response;
                                if (typedResp != null) {
                                    if (typedResp.Success)
                                        returnPromise.resolve(response);
                                    else
                                        returnPromise.reject(response);
                                    let closeContent = (closeOnSuccess && typedResp.Success) || (closeOnFail && !typedResp.Success);
                                    let targetContent = closeContent && content.parentContent != null ? content.parentContent : content;
                                    if (!closeContent || (closeContent && targetContent !== content)) {
                                        showResponse(typedResp, targetContent);
                                    }
                                    if (closeContent) {
                                        content.close(typedResp.Success);
                                    }
                                }
                                else
                                    returnPromise.resolve(response);
                            }
                            else {
                                if (closeOnSuccess)
                                    content.close(true);
                                returnPromise.resolve(response);
                            }
                        })
                            .fail((xhr, type, obj) => {
                            //něco se pokazilo tak vrátim hlášku o důvodu neúspěchu
                            content.endOperation(); // Projistotu se pokusím ještě ukončit operaci - kdyby někde nějaká běžela...
                            if (type === "exception") { // - Jeli chyba typu exception...
                                if (obj.baseType == 'Gordic.General.GFatalSplException') // - Jeli chyba GFatalSplException | což by měla být chyba vrácená z procedury
                                    obj.baseMessage = tryParseSplErrorMessage(obj.baseMessage); // - Zkusím si ji upravit aby nevracelá nehezký text
                                (closeOnFail && content.parentContent != null ? content.parentContent : content).dialogs.error("Chyba", obj.baseMessage);
                                if (closeOnFail)
                                    content.close(false);
                                obj.handled = true; // - Tímto zajistím (zruším) zobrazení  originálního oikna chyby
                                console.log(obj.Data);
                            }
                            returnPromise.reject(xhr, type, obj);
                        });
                        return returnPromise.promise();
                    }
                    Base.ProcessResponse = ProcessResponse;
                    //#endregion
                    //#region Funkce pro Asynchronní akce
                    /**
                    * Configuration object for asynchronous action texts
                    */
                    const ASYNC_ACTION_TEXTS = {
                        "NastaveniStavuTiskuAOdeslani": {
                            title: "Nastavení příznaku tisku a odeslání",
                            content: "Probíhá nastavení příznaku tisku a odeslání"
                        },
                        "VysledekNastaveniStavuTiskuAOdeslani": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno nastavení příznaku tisku a odeslání"
                        },
                        "Redistribuce": {
                            title: "Redistribuce",
                            content: "Probíhá hromadná akce redistribuce"
                        },
                        "VysledekRedistribuce": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončena redistribuce případů"
                        },
                        "ObnoveniVym": {
                            title: "Hromadné obnovení",
                            content: "Probíhá hromadné obnovení vybraných případů vymáhání"
                        },
                        "VysledekObnoveniVym": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno obnovení případů vymáhání"
                        },
                        "CisloSazby": {
                            title: "Hromadná změna čísla sazby",
                            content: "Probíhá hromadné změna čísla sazby na vybraných případech"
                        },
                        "VysledekCisloSazby": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončena změna čísla sazby na případech"
                        },
                        "NastaveniPoleVec": {
                            title: "Nastavení pole 'Věc'",
                            content: "Probíhá nastavení pole 'Věc'"
                        },
                        "VysledekNastaveniPoleVec": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno pole 'Věc'"
                        },
                        "DoplDatDoruc": {
                            title: "Doplnění data doručení",
                            content: "Probíhá hromadné doplnění data doručení"
                        },
                        "VysledekDoplDatDoruc": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné doplnění data doručení"
                        },
                        "PridaniDotcDok": {
                            title: "Přidání dotčeného dokumentu",
                            content: "Probíhá hromadné přidání dotčeného dokumentu"
                        },
                        "VysledekPridaniDotcDok": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné přidání dotčeného dokumentu"
                        },
                        "PridaniDotcSubj": {
                            title: "Přidání dotčeného subjektu",
                            content: "Probíhá hromadné přidání dotčeného subjektu"
                        },
                        "VysledekPridaniDotcSubj": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné přidání dotčeného subjektu"
                        },
                        "PridaniDotcSubjZeSkup": {
                            title: "Přidání dotčeného subjektu ze skupiny",
                            content: "Probíhá hromadné přidání dotčeného subjektu ze skupiny"
                        },
                        "VysledekPridaniDotcSubjZeSkup": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné přidání dotčeného subjektu ze skupiny"
                        },
                        "HromPodSab": {
                            title: "Hromadné podání dle šablony (ROB)",
                            content: "Probíhá hromadné podání dle šablony z vybraných záznamů ROB"
                        },
                        "VysledekHromPodSab": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné podání dle šablony vybraných záznamů ROB"
                        },
                        "HromAkt": {
                            title: "Hromadná aktualizace (ROB)",
                            content: "Probíhá hromadné převzetí adresních údajů - změn na vybraných záznamů ROB"
                        },
                        "VysledekHromAkt": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné převzetí adresních údajů - změn na vybraných záznamů ROB"
                        },
                        "HromPrir": {
                            title: "Hromadné přidání karet - přírustků",
                            content: "Probíhá hromadné přidání karet - přírustků na vybraných záznamů ROB"
                        },
                        "VysledekHromPrir": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné přidání karet - přírustků na vybraných záznamů ROB"
                        },
                        "HromUby": {
                            title: "Hromadné vyřízení karet - úbytků",
                            content: "Probíhá hromadné vyřízení karet - úbytků na vybraných záznamů ROB"
                        },
                        "VysledekHromUby": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné vyřízení karet - úbytků na vybraných záznamů ROB"
                        },
                        "Vymahani": {
                            title: "Hromadné vymáhání",
                            content: "Probíhá hromadné vymáhání na vybraných případech DDP"
                        },
                        "VysledekVymahani": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné vymáhání na vybraných případech DDP"
                        },
                        "HromSpr": {
                            title: "Hromadné spravování",
                            content: "Probíhá hromadné spravování na vybraných případech DDP"
                        },
                        "VysledekHromSpr": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné spravování na vybraných případech DDP"
                        },
                        "NastStavDoruc": {
                            title: "Nastavení stavu doručení",
                            content: "Probíhá nastavení stavu doručení na vybraných případech vymáhání"
                        },
                        "VysledekNastStavDoruc": {
                            title: "Dokončena asynchronní akce",
                            content: "Úspěšně dokončeno hromadné nastavení stavu doručení na vybraných případech vymáhání"
                        }
                    };
                    /**
                     * Nastaví texty (ID, title, text) pro danou asynchronní akci
                     * @param nazevAkce
                     */
                    function textyAkci(nazevAkce) {
                        const actionConfig = ASYNC_ACTION_TEXTS[nazevAkce];
                        if (actionConfig) {
                            return {
                                title: actionConfig.title,
                                content: actionConfig.content,
                                id: formatNazevAkceTask(nazevAkce)
                            };
                        }
                        // Fallback for unknown actions
                        return {
                            title: "Neznámá akce",
                            content: `Probíhá akce: ${nazevAkce}`,
                            id: formatNazevAkceTask(nazevAkce)
                        };
                    }
                    Base.textyAkci = textyAkci;
                    /**
                    * Converts the first letter of nazevAkce to lowercase and appends 'Task' to the end.
                    * @param nazevAkce The action name.
                    * @returns The formatted string.
                    */
                    function formatNazevAkceTask(nazevAkce) {
                        if (!nazevAkce)
                            return "task";
                        return nazevAkce.charAt(0).toLowerCase() + nazevAkce.slice(1) + "Task";
                    }
                    Base.formatNazevAkceTask = formatNazevAkceTask;
                    /**
                    * Změní 'ID' na 'vysledek ID'
                    * @param id
                    * @returns
                    */
                    function vysledekId(id) {
                        if (!id)
                            return "vysledek";
                        const first = id.charAt(0).toUpperCase();
                        const rest = id.slice(1);
                        return "vysledek" + first + rest;
                    }
                    Base.vysledekId = vysledekId;
                    //#endregion
                    /**
                    * Nastaví zkratky pro datumové políčka v hromadných akcích (wizzard)
                    * @param that
                    * @param form
                    */
                    function dateShortcutsHromAkce(that, form) {
                        if (form == null)
                            form = 'wizParams';
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                mutation.addedNodes.forEach((node) => {
                                    // Check if the appended node is the wizParams form
                                    if ($(node).is(`[data-form="${form}"]`) || $(node).find(`[data-form="${form}"]`).length > 0) {
                                        Common.Base.setDateBoxShortcuts(that);
                                        observer.disconnect(); // Disconnect observer since we only need this once
                                    }
                                });
                            });
                        });
                        // Start observing the document body for changes
                        observer.observe(document.body, { childList: true, subtree: true });
                    }
                    Base.dateShortcutsHromAkce = dateShortcutsHromAkce;
                })(Base = Common.Base || (Common.Base = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNILElBQVUsTUFBTSxDQTY2Q2Y7QUE3NkNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTY2Q25CO0lBNzZDZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNjZDN0I7UUE3NkNvQixXQUFBLFNBQVM7WUFBQyxJQUFBLE1BQU0sQ0E2NkNwQztZQTc2QzhCLFdBQUEsTUFBTTtnQkFBQyxJQUFBLElBQUksQ0E2NkN6QztnQkE3NkNxQyxXQUFBLElBQUk7b0JBRXRDLHlCQUF5QjtvQkFDekI7Ozs7O3VCQUtHO29CQUNILFNBQWdCLFVBQVUsQ0FBQyxJQUFjLEVBQUUsSUFBbUIsRUFBRSxNQUFlO3dCQUMzRSxNQUFNLFNBQVMsR0FBVyxtQkFBbUIsQ0FBQzt3QkFDOUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQTs0QkFDL0QsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDM0IsK0RBQStEO2dDQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDM0MsQ0FBQzs0QkFDRCxtQ0FBbUM7NEJBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7Z0NBQzVCLEVBQUUsRUFBRSxTQUFTO2dDQUNiLEtBQUssRUFBRSxPQUFPO2dDQUNkLElBQUksRUFBRSw0Q0FBNEM7Z0NBQ2xELEtBQUssRUFBRSxvQ0FBb0M7Z0NBQzNDLE9BQU8sRUFBRSxJQUFJ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OzRCQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQzs0QkFDdEQsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEcsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUM7NEJBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxtQkFBbUI7NEJBQzdCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQzs0QkFDdkQsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEcsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUM7NEJBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxtQkFBbUI7NEJBQzdCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQzs0QkFDdkQsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEcsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUM7NEJBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxtQkFBbUI7NEJBQzdCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQzs0QkFDOUQsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEcsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUM7NEJBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxtQkFBbUI7NEJBQzdCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQzs0QkFDdkUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEcsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUM7NEJBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxtQkFBbUI7NEJBQzdCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzRCQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsQ0FBQzs0QkFDdEUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FB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O1FBQUQsQ0FBQyxFQTc2Q29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTY2QzdCO0lBQUQsQ0FBQyxFQTc2Q2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTY2Q25CO0FBQUQsQ0FBQyxFQTc2Q1MsTUFBTSxLQUFOLE1BQU0sUUE2NkNmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkJhc2UudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTZMOtbGVuw6kgbWV0b2R5IGEgZnVua2NlIG5hcMWZw63EjSBjZWzDvW0gbW9kdWxlbSBERFAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG4vKipcclxuICogU2TDrWxlbsOpIG1ldG9keSBhIGZ1bmtjZSBuYXDFmcOtxI0gY2Vsw71tIG1vZHVsZW0gRERQXHJcbiAqL1xyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2Uge1xyXG5cclxuICAgIC8vI3JlZ2lvbiBaw6FrbGFkbsOtIGZ1bmtjZVxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRvZGEga3RlcsOhIHZyYWPDrSBkaWFsb2cgcyB3YXJuaW5nZW0sIHZyw6F0w60tbGkgbsSba3RlcsOhIHoga29udHJvbCBwxZlpIGluaWNpYWxpemFjaSBjaHlidVxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gdGhhdCBJbnN0YW5jZSBvZiBHQ29udGVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0ZXh0IE/EjWVrw6F2w6Fuw6EgY2h5Ym92w6EgaGzDocWha2EgcMWZaSBpbmljaWFsaXphY2kgfCBWIHDFmcOtcGFkxJsgxb5lIGplIG51bGwsIHRhayBzZSBkaWFsb2cgbmV6b2JyYXrDrVxyXG4gICAgICogQHJldHVybnMgU3RhdHVzIGNvZGUgKDAgZm9yIHN1Y2Nlc3MsIG90aGVyIGZvciBmYWlsdXJlKVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRGRwRWtvSW5pdCh0aGF0OiBHQ29udGVudCwgdGV4dDogc3RyaW5nIHwgbnVsbCwgdHlwUGhsPzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaWRPZk5vdGlmOiBzdHJpbmcgPSBcImRkcEVrb0luaXROb3RpZklkXCI7XHJcbiAgICAgICAgaWYgKHRleHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgdHJ5RmluZFByZXZOb3RpZiA9IHRoYXQubm90aWZpY2F0aW9uKFwiZmluZEJ5SWRcIiwgaWRPZk5vdGlmKVxyXG4gICAgICAgICAgICBpZiAodHJ5RmluZFByZXZOb3RpZiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQb2t1ZCB1xb4gbm90aWZpa2FjZSBleGlzdHVqZSwgdGFrIGppIG9kc3RyYW7DrW0gemUgc2V6bmFtdS4uLlxyXG4gICAgICAgICAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgaWRPZk5vdGlmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBQxZlpZMOhbSBub3ZvdSBub3RpZmlrYWNpIHMgY2h5Ym91XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0Lm5vdGlmaWNhdGlvbihcImFkZFwiLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogaWRPZk5vdGlmLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXMtY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJDaHliYSBhZG1pbmlzdHJhY2UgdHlwdSBwb2hsZWTDoXZreVwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGV4dCxcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfSAvLyA8PDw9PT09PSBUw61tdG8gYnkgbcSbbG8ga29uxI1pdCB2xaFlY2hubyBuYcSNw610w6Fuw60uLi4uXHJcbiAgICAgICAgcmV0dXJuIDA7IC8vIDw8PD09PT09IERvcGxuxJtuIHJldHVybiB6IGTFr3ZvZHUgc3Byw6F2bsOpIHN5bnRheGVcclxuICAgIH1cclxuICAgIC8vI3JlZ2lvbiBEZWJ1ZyAmIERldmVsb3AgXHJcblxyXG4gICAgLy9OT1RFOiBnaW5pc0RlYnVnTW9kZSBhIGdpbmlzRGV2ZWxvcE1vZGUganNvdSBkZWZpbm92YW5lIHYgR3VpLldlYkFwcCwgYWxlIHZ6aGxlZGVtIGsgdG9tdSwgemUgc2UgbmEgdG8gY2h5dGFqaSBpIGtvbXBvbmVudHkgdiBHdWkuV2ViQ29udHJvbHNcclxuICAgIC8vICAgICAgdGFrIHRvIGFzaSBuZXZhZGkuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjw60gdHJ1ZSwgcG9rdWQgamUgemFwbnV0w70gZGVidWcgcmXFvmltIChVc2VyUHJvY2Vzcy5EZWJ1Z01vZGUpXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVnJhY8OtIHRydWUsIHBva3VkIGplIHphcG51dMO9IGRlYnVnIHJlxb5pbVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZGVidWdNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cgJiYgISF3aW5kb3dbXCJnaW5pc0RlYnVnTW9kZVwiXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSnNtZSB2ZSB2eXZvam92ZSB2ZXR2aSAob2Rwb3ZpZGEgeiBDU2hhcnA6ICNpZiBERUJVRyB8fCBERVZFTE9QX1ZFUlNJT04pICovXHJcbiAgICAvKipcclxuICAgICAqIFZyYWPDrSB0cnVlLCBwb2t1ZCBqc21lIHZlIHZ5dm9qb3ZlIHZldHZpXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVnJhY8OtIHRydWUsIHBva3VkIGpzbWUgdmUgdsO9dm9qb3bDqSB2xJt0dmlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRldmVsb3BNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cgJiYgISF3aW5kb3dbXCJnaW5pc0RldmVsb3BNb2RlXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWxheShtczogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBKUXVlcnlQcm9taXNlIGhlbHBlcnNcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY29uZmlybUFzeW5jKHRoYXQ6IEdDb250ZW50LCB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKHRpdGxlLCBtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJldFZhbCA9PT0gXCJ5ZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZXJyb3JBc3luYyh0aGF0OiBHQ29udGVudCwgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IodGl0bGUsIG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiByZXNvbHZlKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvbiBKUXVlcnlQcm9taXNlIGhlbHBlcnNcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU2hvd01vZGFsV2luZG93KHRoYXQ6IEdDb250ZW50LCBuYW1lT2ZDb250ZW50OiBzdHJpbmcsIFBhcmFtSlNPTjoge30sIHdpbmRvd09wdGlvbj86IHt9ICk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvL3RoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwVnpvclwiLCBQYXJhbUpTT04sIHdpbmRvd09wdGlvbilcclxuICAgICAgICBsZXQgaW5wdXRDb250ZW50OiBzdHJpbmcgPSBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LlwiICsgbmFtZU9mQ29udGVudDsgLy8gXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwVnpvclwiO1xyXG4gICAgICAgIGxldCBpbnB1dElEOiBzdHJpbmcgPSBcIkREUFwiICsgbmFtZU9mQ29udGVudCArIFwiI1wiOyAgICAgICAgICAgICAgICAgIC8vIFwiRERQR0RkcFZ6b3IjXCI7ICAgICAgICBcclxuICAgICAgICBQYXJhbUpTT05bXCJpZFwiXSA9IGlucHV0SUQ7IC8vIFwiRERQR0RkcFZ6b3IjXCI7XHJcbiAgICAgICAgd2luZG93T3B0aW9uID0gd2luZG93T3B0aW9uIHx8IHsgfTtcclxuICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KGlucHV0Q29udGVudCwgUGFyYW1KU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChyZXRWYWxzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXRWYWxzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmtjZSBwcm8gVHlweSBwb2hsZWTDoXZla1xyXG4gICAgLyoqXHJcbiAgICAgKiBWeXR2w6HFmcOtIHVuaWvDoXRuw60gR1VJRFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVnJhY8OtIEdVSURcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUd1aWQoKTogc3RyaW5nIHtcclxuICAgICAgICBmdW5jdGlvbiBzNCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbiAgICB9XHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBWeXR2w6HFmcOtIHBvc3RyYW5uw60gbmF2aWdhY2kgcyBvYnNhaGVtXHJcbiAgICAvLyAqIEBwYXJhbSBjb250ZW50IEluc3RhbmNlIEdDb250ZW50IHBybyDDunByYXZ1IG9ic2FodSBwYW5lbHVcclxuICAgIC8vICovXHJcbiAgICAvL2V4cG9ydCBmdW5jdGlvbiBDcmVhdGVPdXRsaW5lKGNvbnRlbnQ6IEdDb250ZW50KSB7XHJcbiAgICAvLyAgICBjb250ZW50LmVsZW1lbnQuZ3NpZGViYXIoe1xyXG4gICAgLy8gICAgICAgIHJpZ2h0OiB7XHJcbiAgICAvLyAgICAgICAgICAgIHBhbmVsczogW3tcclxuICAgIC8vICAgICAgICAgICAgICAgIHNpZGU6IFwicmlnaHRcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGxlYWY6IHsgY2FwdGlvbjogXCJOYXZpZ8OhdG9yXCIgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgdmFyIGN1c3RvbURpdiA9ICQodGhpcyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21EaXYuaGFzQ2xhc3MoXCJnLW91dGxpbmVcIikpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRGl2LmdvdXRsaW5lKCkuZ291dGxpbmUoXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpbmRGb3JtXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVsZW1lbnQsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodHJlZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmVlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRGl2LmdvdXRsaW5lKFwicmVmcmVzaFwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgIH1dXHJcbiAgICAvLyAgICAgICAgfVxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvL31cclxuICAgIC8vI2VuZHJlZ2lvbiBUeXB5IHBvaGxlZMOhdmVrXHJcblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gRnVua2NlIHBybyBwcsOhY2kgcyBiYXJ2YW1hIChCYXJ2eSB2eW3DoWjDoW7DrSlcclxuICAgIC8qKlxyXG4gICAgICogVnJhY8OtIGhleGFkZWNpbcOhbG7DrSBob2Rub3R1IGJhcnZ5IHogxI3DrXNlbG7DqSBob2Rub3R5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIMSMw61zZWxuw6EgaG9kbm90YSBiYXJ2eVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gSGV4YWRlY2ltw6FsbsOtIGhvZG5vdGEgYmFydnlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEhleENvbG9yKG51bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCIjXCIgKyAoXCIwMDAwMDBcIiArICgoKG51bWJlcikgPj4+IDApLnRvU3RyaW5nKDE2KS5zbGljZSgtNikpKS5zbGljZSgtNikudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVnJhY8OtIGNlbG91IGJhcnZ1IHogaGV4YWRlY2ltw6FsbsOtIGhvZG5vdHlcclxuICAgICAqIEBwYXJhbSBoZXggLSBoZXhhZGVjaW3DoWxuw60gYmFydmEgamFrbyDFmWV0xJt6ZWNcclxuICAgICAqIEByZXR1cm5zIC0gxI3DrXNlbG7DoSBob2Rub3RhIFJHQkEgYmFydnlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEludENvbG9yKGhleDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICAvL2xldCByZWdleCA9IG5ldyBSZWdFeHAoJyNbMC05QS1GYS1mXXsyfVswLTlBLUZhLWZdezJ9WzAtOUEtRmEtZl17Mn0nKTtcclxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCcjWzAtOUEtRmEtZl17Nn0nKTtcclxuICAgICAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGhleCk7XHJcbiAgICAgICAgaWYgKG1hdGNoID09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IFwiQ2h5YmEgcMWZaSBwxZlldm9kdSBiYXJ2eSBuYSDEjcOtc2xvLlwiO1xyXG4gICAgICAgICAgICAvL1RPRE86IFRlc3RcclxuICAgICAgICB2YXIgciA9IHBhcnNlSW50KGAweCR7bWF0Y2hbMF0uc3Vic3RyaW5nKDEsIDIgKyAxKX1gKSAmIDB4RkY7IC8vdmFyIHIgPSBwYXJzZUludChgMHgke21hdGNoWzBdLnN1YnN0cigxLCAyKX1gKSAmIDB4RkY7XHJcbiAgICAgICAgdmFyIGcgPSBwYXJzZUludChgMHgke21hdGNoWzBdLnN1YnN0cmluZygzLCAyICsgMyl9YCkgJiAweEZGOyAvL3ZhciBnID0gcGFyc2VJbnQoYDB4JHttYXRjaFswXS5zdWJzdHIoMywgMil9YCkgJiAweEZGO1xyXG4gICAgICAgIHZhciBiID0gcGFyc2VJbnQoYDB4JHttYXRjaFswXS5zdWJzdHJpbmcoNSwgMiArIDUpfWApICYgMHhGRjsgLy92YXIgYiA9IHBhcnNlSW50KGAweCR7bWF0Y2hbMF0uc3Vic3RyKDUsIDIpfWApICYgMHhGRjtcclxuICAgICAgICB2YXIgYSA9IDI1NSAmIDB4RkY7XHJcblxyXG4gICAgICAgIHZhciByZ2JhSW50ID0gKGEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyAoYik7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gcmdiYUludDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVnJhY8OtIGJhcnZ1IHogxI3DrXNlbG7DqSBob2Rub3R5XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW11bXX0gSGV4YWRlY2ltw6FsbsOtIGhvZG5vdGEgYmFydnlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlZmF1bHRDb2xvcnMoKTogc3RyaW5nW11bXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjMzMwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMzMzE5MDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzMzMzMwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMTkzMzAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDMzMDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwMzMxOVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMDAzMzMzXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDE5MzNcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwMDAzM1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjMTkwMDMzXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMzMzAwMzNcIixcclxuICAgICAgICAgICAgICAgIFwiIzMzMDAxOVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMDAwMDAwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjNjYwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiM2NjMzMDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzY2NjYwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMzM2NjAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDY2MDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwNjYzM1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjMDA2NjY2XCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDMzNjZcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwMDA2NlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMzMwMDY2XCIsXHJcbiAgICAgICAgICAgICAgICBcIiM2NjAwNjZcIixcclxuICAgICAgICAgICAgICAgIFwiIzY2MDAzM1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjMjAyMDIwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjOTkwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiM5OTRDMDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzk5OTkwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCIjNEM5OTAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDk5MDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwOTk0Q1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjMDA5OTk5XCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDRDOTlcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwMDA5OVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjNEMwMDk5XCIsXHJcbiAgICAgICAgICAgICAgICBcIiM5OTAwOTlcIixcclxuICAgICAgICAgICAgICAgIFwiIzk5MDA0Q1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjNDA0MDQwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjQ0MwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNDQzY2MDBcIixcclxuICAgICAgICAgICAgICAgIFwiI0NDQ0MwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCIjNjZDQzAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMENDMDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwQ0M2NlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMDBDQ0NDXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDY2Q0NcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwMDBDQ1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjNjYwMENDXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNDQzAwQ0NcIixcclxuICAgICAgICAgICAgICAgIFwiI0NDMDA2NlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjNjA2MDYwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjRkYwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRjgwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGRkYwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCIjODBGRjAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMEZGMDBcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwRkY4MFwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMDBGRkZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMwMDgwRkZcIixcclxuICAgICAgICAgICAgICAgIFwiIzAwMDBGRlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjN0YwMEZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRjAwRkZcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGMDA3RlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjODA4MDgwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjRkYzMzMzXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRjk5MzNcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGRkYzM1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjOTlGRjMzXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMzM0ZGMzNcIixcclxuICAgICAgICAgICAgICAgIFwiIzMzRkY5OVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjMzNGRkZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiMzMzk5RkZcIixcclxuICAgICAgICAgICAgICAgIFwiIzMzMzNGRlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjOTkzM0ZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRjMzRkZcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGMzM5OVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQTBBMEEwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjRkY2NjY2XCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRkIyNjZcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGRkY2NlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQjJGRjY2XCIsXHJcbiAgICAgICAgICAgICAgICBcIiM2NkZGNjZcIixcclxuICAgICAgICAgICAgICAgIFwiIzY2RkZCMlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjNjZGRkZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiM2NkIyRkZcIixcclxuICAgICAgICAgICAgICAgIFwiIzY2NjZGRlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQjI2NkZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRjY2RkZcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGNjZCMlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQzBDMEMwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjRkY5OTk5XCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRkNDOTlcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGRkY5OVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQ0NGRjk5XCIsXHJcbiAgICAgICAgICAgICAgICBcIiM5OUZGOTlcIixcclxuICAgICAgICAgICAgICAgIFwiIzk5RkZDQ1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjOTlGRkZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiM5OUNDRkZcIixcclxuICAgICAgICAgICAgICAgIFwiIzk5OTlGRlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQ0M5OUZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRjk5RkZcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGOTlDQ1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjRTBFMEUwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCIjRkZDQ0NDXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRkU1Q0NcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGRkZDQ1wiLFxyXG4gICAgICAgICAgICAgICAgXCIjRTVGRkNDXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNDQ0ZGQ0NcIixcclxuICAgICAgICAgICAgICAgIFwiI0NDRkZFNVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjQ0NGRkZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNDQ0U1RkZcIixcclxuICAgICAgICAgICAgICAgIFwiI0NDQ0NGRlwiLFxyXG4gICAgICAgICAgICAgICAgXCIjRTVDQ0ZGXCIsXHJcbiAgICAgICAgICAgICAgICBcIiNGRkNDRkZcIixcclxuICAgICAgICAgICAgICAgIFwiI0ZGQ0NFNVwiLFxyXG4gICAgICAgICAgICAgICAgXCIjRkZGRkZGXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFZyYWPDrSBiYXJ2dSB6IMSNw61zZWxuw6kgaG9kbm90eVxyXG4gICAgICogQHJldHVybnMge251bWJlcltdfSDEjMOtc2VsbsOhIGhvZG5vdGEgYmFydnlcclxuICAgICAqL1xyXG4gICAgdmFyIGV4aXN0aW5nQ29sb3JzOiBudW1iZXJbXTtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRDb2xvcnMoKSB7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nQ29sb3JzKVxyXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdDb2xvcnM7XHJcblxyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIHZhciBjb2xvcnMgPSAoPHN0cmluZ1tdPltdKS5jb25jYXQuYXBwbHkoPHN0cmluZ1tdPltdLCBHZXREZWZhdWx0Q29sb3JzKCkpLm1hcCh4ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEdldEludENvbG9yKHgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBJc2wuU2t1cGluYVZ5bWFoYW5pLnBvdXppdGVCYXJ2eSh7fSkuZ2V0KClcclxuICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhbGxDb2xvcnMgPSBjb2xvcnMuY29uY2F0KGRhdGEuZmlsdGVyKHggPT4geyByZXR1cm4gY29sb3JzLmluZGV4T2YoeCkgPCAwOyB9KSk7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ0NvbG9ycyA9IGFsbENvbG9ycztcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGV4aXN0aW5nQ29sb3JzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdDb2xvcnMgPSBjb2xvcnM7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShleGlzdGluZ0NvbG9ycyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBCYXJ2eVxyXG4gICAgICAgXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmtjZSBwcm8gcHLDoWNpIHMgb2JzYWhlbSBjb25jdGVudHVcclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogVnJhY8OtIHBvbGUgxI3DrXNlbCBwcm8gbmFzdGF2ZW7DrSBzZWxlY3Rib3jFr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gUG/EjcOhdGXEjW7DrSBob2Rub3RhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZW5kIC0gS29uY292w6EgaG9kbm90YVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gbmFwbG5lbmlQb2xlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgbGV0IGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgc3RhcnQgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBhW2ldID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIHN0YXJ0Kys7XHJcbiAgICAgICAgICAgIC8vYS5wdXNoKFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjw60gcG9sZSDEjcOtc2VsIHBybyBuYXN0YXZlbsOtIHNlbGVjdGJveMWvIEt0Z19VcG9fUHJlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBQb8SNw6F0ZcSNbsOtIGhvZG5vdGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgLSBLb25jb3bDoSBob2Rub3RhXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBuYXBsbmVuaVBvbGVLdGdVcG9QcmUoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICBsZXQgYTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBzdGFydCA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFbaV0gPSBzdGFydDtcclxuICAgICAgICAgICAgc3RhcnQrKztcclxuICAgICAgICAgICAgLy9hLnB1c2goW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYS5wdXNoKDYxMCwgNjE1LCA2MjAsIDYzMCk7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIE5hc3RhdsOtIHBvbGUgcHJvIHbDvWLEm3Iga2F0ZWdvcmllIHBvaHlidSBzIG1vxb5ub3N0w60gdsO9YsSbcnUgb2Jsw61iZW7DvWNoIGthdGVnb3Jpw61cclxuICAgICogQHBhcmFtIGNvbnRlbnQgLSBHQ29udGVudCBpbnN0YW5jZVxyXG4gICAgKiBAcGFyYW0gaXhwRGVuIC0gSWRlbnRpZmlrw6F0b3Iga25paHlcclxuICAgICogQHBhcmFtIHR5cFBobCAtIFR5cCBwb2hsZWTDoXZreVxyXG4gICAgKiBAcGFyYW0gZmllbGROYW1lIC0gTsOhemV2IGZvcm11bMOhxZlvdsOpaG8gcG9sZSAodsO9Y2hvesOtOiBcImt0Z191cG9cIilcclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gbmFzdGF2ZW5pUG9sZUt0Z1Vwbyhjb250ZW50OiBHQ29udGVudCwgaXhwRGVuOiBzdHJpbmcsIHR5cFBobDogc3RyaW5nLCBmaWVsZE5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgdXNlVXBvID0gY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLkRkcC5PYmxpYmVuZUt0Z1Vwb1NldHRpbmdzLlVzZVVwb1wiICsgaXhwRGVuICsgdHlwUGhsKSA/PyBcIjBcIjtcclxuICAgICAgICB2YXIgdXNlVXBvQXJyYXk6IG51bWJlcltdID0gdXNlVXBvID8gdXNlVXBvLnNwbGl0KCcsJykubWFwKChpdGVtOiBzdHJpbmcpID0+IHBhcnNlSW50KGl0ZW0udHJpbSgpLCAxMCkpIDogW107XHJcblxyXG4gICAgICAgIC8vIC0tIEthdGVnb3JpZSBwb2h5YnUgLS1cclxuXHJcbiAgICAgICAgdmFyIGt0Z1Vwb0ZpZWxkID0gY29udGVudC5maW5kRmllbGRzKGZpZWxkTmFtZSA/PyBcImt0Z191cG9cIik7XHJcblxyXG4gICAgICAgIC8vIE5hc3RhdmVuw60gdG9vbHRpcHUgdGxhxI3DrXRrYSB2w71ixJtydSDFmcOhZGt1XHJcbiAgICAgICAgdmFyIGt0Z1Vwb1NlbGVjdG9yID0ga3RnVXBvRmllbGQuZ2ZpZWxkKFwiZ2V0QnV0dG9uXCIsIFwic2VsZWN0b3JcIik7XHJcbiAgICAgICAga3RnVXBvU2VsZWN0b3IuZ2J1dHRvbihcInVwZGF0ZVBhcmFtc1wiLCB7XHJcbiAgICAgICAgICAgIGNhcHRpb246IFwiVsO9YsSbciBrYXRlZ29yaWUgcG9oeWJ1ICh2xaFlY2hueSlcIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBQxZlpZMOhbsOtIHRsYcSNw610a2EgcHJvIHbDvWLEm3IgxZnDoWRrdSB6IMSNw61zZWxuw61rdSAodsWhZWNobnkgbW/Fvm5vc3RpKVxyXG4gICAgICAgIGt0Z1Vwb0ZpZWxkLmdmaWVsZChcImFkZEJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RLdGdVcG9GYXZcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtc3RhclwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCI8Yj5Ww71ixJtyIGthdGVnb3JpZSBwb2h5YnUgKG9ibMOtYmVuw6kpPGI+XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkRhdGEuU2VsZWN0b3JzLkRlZmF1bHRTZWxlY3Rvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkZ1Y2N1cG8oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogdXNlVXBvQXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVzdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71ixJtyIGhvZG5vdHkgeiBuYWLDrWRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4gYCR7ZGF0YS5rdGdfdXBvfSAtICR7ZGF0YS5rdGdfdXBvX3R4dH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZDoga3RnVXBvRmllbGRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmZpbmRGaWVsZHMoZmllbGROYW1lID8/IFwia3RnX3Vwb1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGt0Z191cG86IGRhdGEua3RnX3Vwbywga3RnX3Vwb190eHQ6IGRhdGEua3RnX3Vwb190eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEFrdHVhbGl6dWplIHNlcnZlcm92w6kgZmlsdHJ5IHBybyB0bGHEjcOtdGtvIHbDvWLEm3J1IGthdGVnb3JpZSBwb2h5YnUgKG9ibMOtYmVuw6kpXHJcbiAgICAqIEBwYXJhbSBjb250ZW50IC0gR0NvbnRlbnQgaW5zdGFuY2VcclxuICAgICogQHBhcmFtIGl4cERlbiAtIElkZW50aWZpa8OhdG9yIGtuaWh5XHJcbiAgICAqIEBwYXJhbSB0eXBQaGwgLSBUeXAgcG9obGVkw6F2a3lcclxuICAgICogQHBhcmFtIGZpZWxkTmFtZSAtIE7DoXpldiBmb3JtdWzDocWZb3bDqWhvIHBvbGUgKHbDvWNob3rDrTogXCJrdGdfdXBvXCIpXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFrdHVhbGl6b3ZhdFBvbGVLdGdVcG8oY29udGVudDogR0NvbnRlbnQsIGl4cERlbjogc3RyaW5nLCB0eXBQaGw6IHN0cmluZywgZmllbGROYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHVzZVVwbyA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JsaWJlbmVLdGdVcG9TZXR0aW5ncy5Vc2VVcG9cIiArIGl4cERlbiArIHR5cFBobCkgPz8gXCIwXCI7XHJcbiAgICAgICAgdmFyIHVzZVVwb0FycmF5OiBudW1iZXJbXSA9IHVzZVVwbyA/IHVzZVVwby5zcGxpdCgnLCcpLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBwYXJzZUludChpdGVtLnRyaW0oKSwgMTApKSA6IFtdO1xyXG5cclxuICAgICAgICB2YXIga3RnVXBvRmllbGQgPSBjb250ZW50LmZpbmRGaWVsZHMoZmllbGROYW1lID8/IFwia3RnX3Vwb1wiKTtcclxuXHJcbiAgICAgICAgLy8gTmFqZGVtZSB0bGHEjcOtdGtvIHBybyBvYmzDrWJlbsOpIGthdGVnb3JpZVxyXG4gICAgICAgIHZhciBmYXZCdXR0b24gPSBrdGdVcG9GaWVsZC5nZmllbGQoXCJnZXRCdXR0b25cIiwgXCJhY3RLdGdVcG9GYXZcIik7XHJcblxyXG4gICAgICAgIGlmIChmYXZCdXR0b24gJiYgZmF2QnV0dG9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gQWt0dWFsaXp1amVtZSBha2NpIHMgbm92w71taSBmaWx0cnlcclxuICAgICAgICAgICAgLy92YXIgYWN0aW9uID0gY29udGVudC5hY3Rpb25zW1wiYWN0S3RnVXBvRmF2XCJdO1xyXG5cclxuICAgICAgICAgICAgZmF2QnV0dG9uLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVwZGF0ZWRBY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEt0Z1Vwb0ZhdlwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1zdGFyXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIjxiPlbDvWLEm3Iga2F0ZWdvcmllIHBvaHlidSAob2Jsw61iZW7DqSk8Yj5cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5TZWxlY3RvcnMuRGVmYXVsdFNlbGVjdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuRnVjY3VwbygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiB1c2VVcG9BcnJheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXN1bHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDvWLEm3IgaG9kbm90eSB6IG5hYsOtZGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiBgJHtkYXRhLmt0Z191cG99IC0gJHtkYXRhLmt0Z191cG9fdHh0fWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkOiBrdGdVcG9GaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZmluZEZpZWxkcyhmaWVsZE5hbWUgPz8gXCJrdGdfdXBvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsga3RnX3VwbzogZGF0YS5rdGdfdXBvLCBrdGdfdXBvX3R4dDogZGF0YS5rdGdfdXBvX3R4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIFDFmWlkw6Fuw60gdGxhxI3DrXRrYSBwcm8gdsO9YsSbciDFmcOhZGt1IHogxI3DrXNlbG7DrWt1ICh2xaFlY2hueSBtb8W+bm9zdGkpXHJcbiAgICAgICAgICAgIGt0Z1Vwb0ZpZWxkLmdmaWVsZChcImFkZEJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHVwZGF0ZWRBY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9pZiAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbi5ydW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuZXcgR29yZGljLkRhdGEuU2VsZWN0b3JzLkRlZmF1bHRTZWxlY3Rvcih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuRnVjY3VwbygpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAga3RnX3VwbzogdXNlVXBvQXJyYXlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXN1bHRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsO9YsSbciBob2Rub3R5IHogbmFiw61ka3lcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiBgJHtkYXRhLmt0Z191cG99IC0gJHtkYXRhLmt0Z191cG9fdHh0fWBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmVsYXRlZDoga3RnVXBvRmllbGRcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnRlbnQuZmluZEZpZWxkcyhmaWVsZE5hbWUgPz8gXCJrdGdfdXBvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsga3RnX3VwbzogZGF0YS5rdGdfdXBvLCBrdGdfdXBvX3R4dDogZGF0YS5rdGdfdXBvX3R4dCB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3Jtw6F0dWplIMSNw61zbG8gcyBvZGTEm2xlbsOtbSB0aXPDrWPFryBhIGR2xJttYSBkZXNldGlubsO9bWkgbcOtc3R5XHJcbiAgICAgKiBAcGFyYW0gbnVtYmVyIC0gxI3DrXNlbG7DoSBob2Rub3RhIGsgZm9ybcOhdG92w6Fuw61cclxuICAgICAqIEByZXR1cm5zIGZvcm3DoXRvdmFuw70gxZlldMSbemVjXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHMobnVtYmVyOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE51bWJlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XHJcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgIH0pLmZvcm1hdChudW1iZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyLnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcgJykucmVwbGFjZSgnLicsICcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFrY2UgY28gc2Ugc3B1c3TDrSBwbyB6bcSbbsSbIGRhdGUgcG9sZSovXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VEYXRlKENvbnRlbnQ6IEdDb250ZW50LCBkYXRlYm94OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgdmFyIGtvbnREYXQgPSBDb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLktvbnREYXRcIilcclxuICAgICAgICBpZiAoIWtvbnREYXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gU2xlZG92w6Fuw60gem3Em24gdmUgZm9ybXVsw6HFmcOtY2ggKGRva3VtZW50KSBwcm8gcG92b2xlbsOtIHVsb8W+ZW7DrSwgcG9rdWQgc2UgamVkbsOhIG8gbmVlZGl0b3ZhdGVsbsO9IHDFmcOtcGFkXHJcbiAgICAgICAgQ29udGVudC5maW5kRm9ybXMoKS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIikuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gZGF0ZWJveC5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKGRhdGUgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGUgPCBuZXcgRGF0ZSgxOTgwLCAwLCAxKSkge1xyXG4gICAgICAgICAgICAgICAgQ29udGVudC5kaWFsb2dzLmNvbmZpcm0oXCJEYXR1bVwiLCBcIkplIHphZMOhbm8gZGF0dW0gbWVuxaHDrSBuZcW+IHJvayAxOTgwLCBqZSB0byBzcHLDoXZuxJs/XCIpLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcIm5vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZWJveC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGUgPiBuZXcgRGF0ZSgyMDUwLCAwLCAxKSkge1xyXG4gICAgICAgICAgICAgICAgQ29udGVudC5kaWFsb2dzLmNvbmZpcm0oXCJEYXR1bVwiLCBcIkplIHphZMOhbm8gZGF0dW0gdsSbdMWhw60gbmXFviByb2sgMjA1MCwgamUgdG8gc3Byw6F2bsSbP1wiKS5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJub1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVib3guZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiBSb3pzaXJlbmEgb2JzbHVoYSBkYXR1bW92w71jaCBwb2zDrcSNZWsgR0RhdGVCb3hcclxuICAgICAqIFDFmWkgemF2b2zDoW7DrSBwbyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZdSBuYXN0YXbDrSBrbC4gemtyYXRreSBuYSB2xaFlY2hueSBmaWVsZHkgdHlwdSBHRGF0ZUJveFxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gQ29udGVudCAtIG9ic2FoLCBwcm8ga3Rlcnkgc2UgbWFqaSBrbGF2ZXN5IG5hc3Rhdml0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBwb2xlLCBwcm8ga3RlcmUgc2UgbWFqaSBrbGF2ZXN5IG5hc3Rhdml0XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXREYXRlQm94U2hvcnRjdXRzKENvbnRlbnQ6IEdDb250ZW50LCBmaWVsZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZpZWxkID0gXCIuZ2RhdGVib3hcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIENvbnRlbnQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgIC8vICogZG9wbG5pIGFrdHVhbG5pIGRhdHVtXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGF0ZUJveFNob3J0Y3V0RGF0ZVRvZGF5XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRvcGxuaSBha3R1YWxuw60gZGF0dW1cIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiRG9wbG5pIGFrdHVhbG7DrSBkYXR1bVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRuZXMgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGRuZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyArIHByaWN0ZSBrIGRhdHUgMSBkZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REYXRlQm94U2hvcnRjdXREYXRlQWRkRGF5XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkw6EgZGVuIGRvIGFrdHVhbG7DrWhvIGRhdHVtdVwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQxZlpZMOhIGRlbiBkbyBha3R1YWxuw61obyBkYXR1bXVcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKGV2LnRhcmdldCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERhdGUoKSkgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gJChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXk6IERhdGUgPSBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RGF5ID0gZGF5LnNldERhdGUoZGF5LmdldERhdGUoKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGF0ZShDb250ZW50LCBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIC0gb2RlY3RlIG9kIGRhdGEgMSBkZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REYXRlQm94U2hvcnRjdXREYXRlUmVtRGF5XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kZWJlcmUgZGVuIG9kIGFrdHVhbG7DrWhvIGRhdHVtdVwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPZGViZXJlIGRlbiBvZCBha3R1YWxuw61obyBkYXR1bXVcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKGV2LnRhcmdldCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERhdGUoKSkgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gJChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXk6IERhdGUgPSBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RGF5ID0gZGF5LnNldERhdGUoZGF5LmdldERhdGUoKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGF0ZShDb250ZW50LCBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGYgLyBGIDEuMSBha3R1YWxuaWhvIHJva3VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REYXRlQm94U2hvcnRjdXREYXRlRmlyc3RUaGlzWWVhclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXbDrSAxLjEuIGFrdHXDoWxuw61obyByb2t1XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdsOtIDEuMS4gYWt0dcOhbG7DrWhvIHJva3VcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKGV2LnRhcmdldCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERhdGUoKSkgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gJChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXk6IERhdGUgPSBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG5lcyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNZZWFyID0gZG5lcy5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRheS5zZXRGdWxsWWVhcih0aGlzWWVhciwgMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbSAvIE0gMS5tZXNpY2UgYWt0LnJva3VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REYXRlQm94U2hvcnRjdXREYXRlRmlyc3RUaGlzTW9udGhUaGlzWWVhclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXbDrSAxLiBkZW4gYWt0dcOhbG7DrWhvIG3Em3PDrWNlIGEgcm9rdVwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXbDrSAxLiBkZW4gYWt0dcOhbG7DrWhvIG3Em3PDrWNlIGEgcm9rdVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgZGF5OiBEYXRlID0gZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTsgLy8gWsOtc2vDoW7DrSBha3R1w6FsbsOtaG8gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTsgLy8gQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IG5vdy5nZXRNb250aCgpOyAvLyBBa3R1w6FsbsOtIG3Em3PDrWMgKDAtYmFzZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gZGF0YSBzIHBydm7DrW0gZG5lbSBha3R1w6FsbsOtaG8gbcSbc8OtY2VcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdERhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmlyc3REYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gcCAvIFAgcG9zbGVkbmkgZGVuIG1lc2ljZSBha3Qucm9rdVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERhdGVCb3hTaG9ydGN1dERhdGVMYXN0VGhpc01vbnRoVGhpc1llYXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2w60gcG9zbGVkbsOtIGRlbiBha3R1w6FsbsOtaG8gbcSbc8OtY2UgYSByb2t1XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdsOtIHBvc2xlZG7DrSBkZW4gYWt0dcOhbG7DrWhvIG3Em3PDrWNlIGEgcm9rdVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgZGF5OiBEYXRlID0gZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTsgLy8gWsOtc2vDoW7DrSBha3R1w6FsbsOtaG8gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTsgLy8gQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IG5vdy5nZXRNb250aCgpOyAvLyBBa3R1w6FsbsOtIG3Em3PDrWMgKDAtYmFzZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gZGF0YSBzIHBvc2xlZG7DrW0gZG5lbSBha3R1w6FsbsOtaG8gbcSbc8OtY2VcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCk7IC8vIERlbiAnMCcgcMWZZWRjaMOhemVqw61jw61obyBtxJtzw61jZVxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGxhc3REYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbCAvIEwgcG9zbGVkbmkgZGVuIGFrdC5yb2t1XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGF0ZUJveFNob3J0Y3V0RGF0ZUxhc3RUaGlzWWVhclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXbDrSBwb3NsZWRuw60gZGVuIGFrdHXDoWxuw61obyByb2t1XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdsOtIHBvc2xlZG7DrSBkZW4gYWt0dcOhbG7DrWhvIHJva3VcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKGV2LnRhcmdldCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERhdGUoKSkgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gJChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7IC8vIFrDrXNrw6Fuw60gYWt0dcOhbG7DrWhvIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7IC8vIEFrdHXDoWxuw60gcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gZGF0YSBzIHBvc2xlZG7DrW0gZG5lbSBwcm9zaW5jZSBha3R1w6FsbsOtaG8gcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3REYXRlID0gbmV3IERhdGUoeWVhciwgMTEsIDMxKTsgLy8gUHJvc2luZWMgKDExKSBhIHBvc2xlZG7DrSBkZW4gKDMxKVxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGxhc3REYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gQ1RSTCArIHDFmWlkw6Egcm9rXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGF0ZUJveFNob3J0Y3V0RGF0ZUFkZFllYXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWTDoSByb2sgZG8gYWt0dWFsbsOtaG8gZGF0dW11XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlDFmWlkw6Egcm9rIGRvIGFrdHVhbG7DrWhvIGRhdHVtdVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdHVtOiBEYXRlID0gZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0dW0uc2V0RnVsbFllYXIoZGF0dW0uZ2V0RnVsbFllYXIoKSArIDEpOyAvLyBQxZlpxI10ZW7DrSByb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0dW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZURhdGUoQ29udGVudCwgZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBDVFJMIC0gdWJlcmUgcm9rXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGF0ZUJveFNob3J0Y3V0RGF0ZVJlbVllYXJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RlYmVyZSByb2sgb2QgYWt0dWFsbsOtaG8gZGF0dW11XCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9kZWJlcmUgcm9rIG9kIGFrdHVhbG7DrWhvIGRhdHVtdVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdHVtOiBEYXRlID0gZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0dW0uc2V0RnVsbFllYXIoZGF0dW0uZ2V0RnVsbFllYXIoKSAtIDEpOyAvLyBPZGXEjXRlbsOtIHJva3VcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXR1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRGF0ZShDb250ZW50LCBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIENUUkwgKyAsIC0gTmFzdGF2w60gZGF0dW0gZGxlIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtICdkYXR1bSBzYWxkbydcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3REYXRlQm94U2hvcnRjdXREYXRlU2FsZG9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2w60gZGF0dW0gZGxlIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtICdkYXR1bSBzYWxkbydcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiTmFzdGF2w60gZGF0dW0gZGxlIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtICdkYXR1bSBzYWxkbydcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudC5pc2wuRGRwVXNlclNldHRpbmdzLnByaXpuYWt5RGF0dW11KHsgc2F2ZTogZmFsc2UgfSkuZ2V0KCkuZG9uZShmdW5jdGlvbiAocHJpem5ha05hY3RlbmlEYXR1bXUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdHVtU2FsZG86IERhdGUgPSBuZXcgRGF0ZSgpOyAvL3bDvWNob3rDrSBob2Rub3RhIGplIGRuZcWhbsOtIGRhdHVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcml6bmFrTmFjdGVuaURhdHVtdSkgeyAvL3Bva3VkIGplIHDFmcOtem5hayB0cnVlLCB0YWsgbcWvxb5lbWUgbmHEjcOtc3QgZGF0YSB6IHVzZXJzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW1TYWxkbyA9IENvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuRGF0dW1TYWxkYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9ICQoZXYudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0dW1TYWxkbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIENUUkwgLyB2eWJlcmUgaW50ZXJ2YWwgb2QgemHEjcOhdGt1IHJva3UgZG8gZG5lxaFuw61obyBkbmVcclxuICAgICAgICAgICAgLy8gQ1RSTCBtIHZ5YmVyZSBpbnRlcnZhbCBvZCB6YcSNw6F0a3UgbcSbc8OtY2UgZG8ga29uY2UgbcSbc8OtY2VcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGVib3ggPSAkKGZpZWxkKTtcclxuXHJcbiAgICAgICAgZGF0ZWJveC5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGFuZ2VEYXRlKENvbnRlbnQsIGRhdGVib3gpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRhdGVib3guZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAga2V5OiBcIipcIiwgLy9rbMOhdmVzb3bDoSB6a3JhdGthXHJcbiAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgYWN0aW9uOiBDb250ZW50LmFjdGlvbnNbXCJhY3REYXRlQm94U2hvcnRjdXREYXRlVG9kYXlcIl0sXHJcbiAgICAgICAgICAgIGNhbkV4ZWN1dGU6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gISQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKTsgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZGF0ZWJveC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICBrZXk6IFwiK1wiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2FcclxuICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkZpZWxkLFxyXG4gICAgICAgICAgICBhY3Rpb246IENvbnRlbnQuYWN0aW9uc1tcImFjdERhdGVCb3hTaG9ydGN1dERhdGVBZGREYXlcIl0sXHJcbiAgICAgICAgICAgIGNhbkV4ZWN1dGU6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gISQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKTsgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZGF0ZWJveC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICBrZXk6IFwiLVwiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2FcclxuICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkZpZWxkLFxyXG4gICAgICAgICAgICBhY3Rpb246IENvbnRlbnQuYWN0aW9uc1tcImFjdERhdGVCb3hTaG9ydGN1dERhdGVSZW1EYXlcIl0sXHJcbiAgICAgICAgICAgIGNhbkV4ZWN1dGU6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gISQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKTsgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZGF0ZWJveC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICBrZXk6IFwiZlwiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2FcclxuICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkZpZWxkLFxyXG4gICAgICAgICAgICBhY3Rpb246IENvbnRlbnQuYWN0aW9uc1tcImFjdERhdGVCb3hTaG9ydGN1dERhdGVGaXJzdFRoaXNZZWFyXCJdLFxyXG4gICAgICAgICAgICBjYW5FeGVjdXRlOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuICEkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZmllbGRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIik7IH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGRhdGVib3guZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAga2V5OiBcIm1cIiwgLy9rbMOhdmVzb3bDoSB6a3JhdGthXHJcbiAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgYWN0aW9uOiBDb250ZW50LmFjdGlvbnNbXCJhY3REYXRlQm94U2hvcnRjdXREYXRlRmlyc3RUaGlzTW9udGhUaGlzWWVhclwiXSxcclxuICAgICAgICAgICAgY2FuRXhlY3V0ZTogZnVuY3Rpb24gKGV2KSB7IHJldHVybiAhJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpOyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkYXRlYm94LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIGtleTogXCJwXCIsIC8va2zDoXZlc292w6EgemtyYXRrYVxyXG4gICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuRmllbGQsXHJcbiAgICAgICAgICAgIGFjdGlvbjogQ29udGVudC5hY3Rpb25zW1wiYWN0RGF0ZUJveFNob3J0Y3V0RGF0ZUxhc3RUaGlzTW9udGhUaGlzWWVhclwiXSxcclxuICAgICAgICAgICAgY2FuRXhlY3V0ZTogZnVuY3Rpb24gKGV2KSB7IHJldHVybiAhJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpOyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkYXRlYm94LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIGtleTogXCJsXCIsIC8va2zDoXZlc292w6EgemtyYXRrYVxyXG4gICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuRmllbGQsXHJcbiAgICAgICAgICAgIGFjdGlvbjogQ29udGVudC5hY3Rpb25zW1wiYWN0RGF0ZUJveFNob3J0Y3V0RGF0ZUxhc3RUaGlzWWVhclwiXSxcclxuICAgICAgICAgICAgY2FuRXhlY3V0ZTogZnVuY3Rpb24gKGV2KSB7IHJldHVybiAhJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpOyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkYXRlYm94LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIGtleTogXCJjdHJsKytcIiwgLy9rbMOhdmVzb3bDoSB6a3JhdGthXHJcbiAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgYWN0aW9uOiBDb250ZW50LmFjdGlvbnNbXCJhY3REYXRlQm94U2hvcnRjdXREYXRlQWRkWWVhclwiXSxcclxuICAgICAgICAgICAgY2FuRXhlY3V0ZTogZnVuY3Rpb24gKGV2KSB7IHJldHVybiAhJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpOyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkYXRlYm94LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIGtleTogXCJjdHJsKy1cIiwgLy9rbMOhdmVzb3bDoSB6a3JhdGthXHJcbiAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgYWN0aW9uOiBDb250ZW50LmFjdGlvbnNbXCJhY3REYXRlQm94U2hvcnRjdXREYXRlUmVtWWVhclwiXSxcclxuICAgICAgICAgICAgY2FuRXhlY3V0ZTogZnVuY3Rpb24gKGV2KSB7IHJldHVybiAhJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpOyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkYXRlYm94LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIGtleTogXCJjdHJsKyxcIiwgLy9rbMOhdmVzb3bDoSB6a3JhdGthXHJcbiAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgYWN0aW9uOiBDb250ZW50LmFjdGlvbnNbXCJhY3REYXRlQm94U2hvcnRjdXREYXRlU2FsZG9cIl0sXHJcbiAgICAgICAgICAgIGNhbkV4ZWN1dGU6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gISQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKTsgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXR1c1dpZGdldChjb250ZW50OiBHQ29udGVudCwgaWQ6IHN0cmluZywgbmF6ZXY6IHN0cmluZykge1xyXG4gICAgLy8gICAgY29udGVudFxyXG4gICAgLy8gICAgdmFyIHN0YXR1c1dpZGdldCA9ICQoXCIuc3RhdHVzLXdpZGdldFwiKTsgLy9uYWppdMOtIHBvxI10b3bDqWhvIG9rw71ua2FcclxuICAgIC8vICAgIC8vdWhyYWR5Q2VsZWttXHJcbiAgICAvLyAgICAkKHN0YXR1c1dpZGdldCkuYmVmb3JlKCc8ZGl2IGNsYXNzPVwic3RhdHVzLXdpZGdldFwiIGlkPVwidWhyYWR5Q2VsZWttXCI+SyDDumhyYWTEmyBjZWxrZW06IDwvZGl2PicpOyAvL25hbGVwZW7DrSBzYWxkYSBrIHBvxI10dVxyXG4gICAgLy8gICAgY29udGVudC51aHJhZHlDZWxla21TdGF0dXNXaWRnZXQgPSAkKFwiI3VocmFkeUNlbGVrbVwiKVxyXG4gICAgLy8gICAgY29udGVudC51aHJhZHlDZWxla21TdGF0dXNXaWRnZXQuYXBwZW5kKGA8YiBjbGFzcz1cImctc3RhdGUtdGV4dCBnLXN0YXRlLWFjdGl2ZVwiPjA8L2I+YCk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZ5dHZvxZllbsOtIG5vdsOpIHBvbG/Fvmt5IHBybyBzdGF0dXNiYXIgKHZsYXN0bsOtIG1ldG9kYSByb3rFocOtxZllbsOhIG8gdG9vbHRpcCBrdGVyw70gdiBvcmlnaW7DoWxuw60gbWV0b2TEmyBuZWZ1bmdvdmFsKVxyXG4gICAgICogQHBhcmFtIHtNZW51UGFyYW1zfSBbcGFyYW1zXSBkYWzFocOtIHZsYXN0bm9zdGkgcHJ2a3UgKG5hcMWZLiBpZCwgcG9kIGt0ZXLDvW0gYnVkZSBwcnZlayBkb3N0dXBuw70gbmFwxZkuIHYgdGhpcy5zdGF0dXNlc1tdKVxyXG4gICAgICogQHJldHVybnMge0dPYnNlcnZhYmxlT2JqZWN0PE1lbnVQYXJhbXM+fSBub3bDoSBwb2xvxb5rYVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlRGRwU3RhdHVzQmFySXRlbShwYXJhbXMgPzogTWVudVBhcmFtcyk6IEdPYnNlcnZhYmxlT2JqZWN0IDwgTWVudVBhcmFtcyA+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBHT2JzZXJ2YWJsZU9iamVjdDxNZW51UGFyYW1zPigkLmV4dGVuZCh7IHR5cGU6IFwic3RhdGljXCIsIGNhcHRpb246IFwiXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcIlwiLCBhY3Rpb246IHVuZGVmaW5lZCB9LCBwYXJhbXMpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWt0dWFsaXphY2UgdGV4dHUgYSBzdHlsdSBwb2xvxb5reSB2ZSBzdGF0dXNiYXJ1XHJcbiAgICAgKiBAcGFyYW0ge0dPYnNlcnZhYmxlT2JqZWN0PE1lbnVQYXJhbXM+fSBpdGVtIHBvbG/FvmthIHZlIHN0YXR1c2JhcnVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IHpvYnJhemVuw70gdGV4dFxyXG4gICAgICogQHBhcmFtIHt0b29sdGlwVGV4dH0gdGV4dCB0ZXh0IHYgdG9vbHRpcHVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUgfCBudWxsfSBzdGF0ZU9yVHlwZSBwb8W+YWRvdmFuw70gc3RhdiAodMWZw61kYSkgbmVibyB0eXAgesOhem5hbXUuIFBybyBudWxsIHNlIG5hc3RhdsOtIGplbiB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWtvbmEgbHplIGRlZmlub3ZhdCBpa29udSBrdGVyw6Egc2UgcMWZaWTDoSBrIHRleHR1IHN0YXR1cyBiYXJ1XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEZHBTdGF0dXNCYXJJdGVtKGl0ZW06IEdPYnNlcnZhYmxlT2JqZWN0PE1lbnVQYXJhbXM+LCB0ZXh0OiBzdHJpbmcsIHRvb2x0aXBUZXh0OiBzdHJpbmcsIHN0YXRlT3JUeXBlOiBzdHJpbmcgfCBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZSB8IG51bGwsIGlrb25hID86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGVPclR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgaXRlbS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGV4dCxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtdGV4dCBcIiArIHN0YXRlT3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcFRleHQsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBpa29uYSA/PyBcIlwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgY29uc3QgcmVjb3JkRm9ybWF0VHlwZSA9IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xvcnMgPSBHb3JkaWMuVXRpbHMuQ29sb3JzO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlT3JUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzY2h2w6FsZW7DvSB6ZWxlbsSbXHJcbiAgICAgICAgICAgICAgICBjYXNlIHJlY29yZEZvcm1hdFR5cGUuU2NodmFsZW5vOiBjQ2xhc3MgPSBjb2xvcnMudGV4dFN1Y2Nlc3M7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVhbGl6b3ZhbsO9IG1vZMWZZVxyXG4gICAgICAgICAgICAgICAgY2FzZSByZWNvcmRGb3JtYXRUeXBlLlJlYWxpem92YW5vOiBjQ2xhc3MgPSBjb2xvcnMudGV4dEluZm87IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gc3Rvcm5vdmFuw70gxI1lcnZlbsSbXHJcbiAgICAgICAgICAgICAgICBjYXNlIHJlY29yZEZvcm1hdFR5cGUuU3Rvcm5vdmFubzogY0NsYXNzID0gY29sb3JzLnRleHRFcnJvcjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyB2ecWZYXplbsO9IMWhZWTEmyAtIGplIHRvIHNpY2UgxaFlZMOpLCBhbGUga3VyesOtdm91XHJcbiAgICAgICAgICAgICAgICBjYXNlIHJlY29yZEZvcm1hdFR5cGUuVnlyYXplbm86IGNDbGFzcyA9IGNvbG9ycy50ZXh0SW5hY3RpdmU7IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRleHQsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogY0NsYXNzLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcFRleHQsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBpa29uYSA/PyBcIlwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmtjZSBwcm8gcMWZZXBvxI10eSDEjcOhc3RlaywgRFBIIGEgZGFsxaHDrWNoLi4uXHJcbiAgICAvKipcclxuICAgICogTWV0b2RhIHBybyB2w71wb8SNZXQgRFBIXHJcbiAgICAqIEBwYXJhbSB7RGVjaW1hbH0gY19wIC0gWmFkYW7DoSDEjcOhc3RrYVxyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJfdmNldG5lX2RwaCAtIFbDvXBvxI1ldCBkYW7EmyAtIHDFmWkgemFkw6Fuw60gxI3DoXN0a3kgcyBkcGggamUgVFJVRSlcclxuICAgICogQHBhcmFtIHtEZWNpbWFsfSBkcGhfcHJvY19wIC0gSG9kbm90YSBkYW7EmyBcclxuICAgICogQHBhcmFtIHtib29sZWFufSBiX25ldyAtIFVyxI10ZW7DrSB6cMWvc29idSB2w71wb8SNdHUgKHRydWUgPSBub3bDvSlcclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdnlwb2NldF9kcGgoY19wOiBEZWNpbWFsLCBiX3ZjZXRuZV9kcGg6IGJvb2xlYW4sIGRwaF9wcm9jX3A6IERlY2ltYWwsIGJfbmV3OiBib29sZWFuKSB7XHJcbiAgICAgICAgLy9UT0RPIGJfbmV3IC0+IHZ5dHZvxZlpdCBtZXRvZHUgcHJvIHpqacWhdMSbbsOtIHpwxa9zb2J5IHbDvXBvxI10dSBkbGUgR3VwdGEgZmNlIFwiZ2ZfWnB1c29iVnlwb2N0dURQSFwiXHJcbiAgICAgICAgdmFyIGNfZHBoX3JwOiBEZWNpbWFsO1xyXG4gICAgICAgIHZhciBjX2Jlel9kcGhfcnA6IERlY2ltYWw7XHJcbiAgICAgICAgdmFyIGtvZWY6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICB2YXIgem46IG51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIGlmIChjX3AubHQoMCkpIHsgLy8gT3RvxI1lbsOtIHpuYW3DqW5rYSBwcm8gesOhcG9ybsOpIGhvZG5vdHksIHplIHphcG9ybsOpIGhvZG5vdHkgdG8gZMOhdsOhIG9kbGnFoW7DvSB2w71zbGVkZWsgICAgICAgICAgXHJcbiAgICAgICAgICAgIHpuID0gKC0xKTtcclxuICAgICAgICAgICAgY19wID0gY19wLm11bCh6bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYl92Y2V0bmVfZHBoKSB7ICAgLy8gVsO9cG/EjWV0IGRhbsSbIHDFmWkgemFkw6FuaSDEjcOhc3RreSBzIERQSCBcclxuICAgICAgICAgICAgaWYgKCFiX25ldykge1xyXG4gICAgICAgICAgICAgICAga29lZiA9IGRwaF9wcm9jX3AuZGl2aWRlZEJ5KGRwaF9wcm9jX3AucGx1cygxMDApKTtcclxuICAgICAgICAgICAgICAgIGtvZWYgPSBrb2VmLnRvRGVjaW1hbFBsYWNlcyg0KSAvLyBaYW9rcm91aGxlbsOtIG5hIDQgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChrb2VmKTtcclxuICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19kcGhfcnAudG9EZWNpbWFsUGxhY2VzKDIpOyAvLyBaYW9rcm91aGxlbsOtIG5hIDIgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChkcGhfcHJvY19wLmRpdmlkZWRCeShkcGhfcHJvY19wLnBsdXMoMTAwKSkpO1xyXG4gICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIMSMw6FzdGthIGJleiBEUEhcclxuICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19wLm1pbnVzKGNfZHBoX3JwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFbDvXBvxI1ldCBkYW7EmyBwxZlpIHphZMOhbsOtIMSNw6FzdGt5IGJleiBEUEhcclxuICAgICAgICAgICAgaWYgKGJfbmV3ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBrb2VmID0gZHBoX3Byb2NfcC5kaXZpZGVkQnkoMTAwKTtcclxuICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChrb2VmKTtcclxuICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19kcGhfcnAudG9EZWNpbWFsUGxhY2VzKDIpOyAvLyBaYW9rcm91aGxlbsOtIG5hIDIgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChkcGhfcHJvY19wLmRpdmlkZWRCeSgxMDApKVxyXG4gICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIMSMw6FzdGthIGJleiBEUEhcclxuICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC5tdWwoem4pO1xyXG4gICAgICAgIGNfYmV6X2RwaF9ycCA9IGNfYmV6X2RwaF9ycC5tdWwoem4pO1xyXG5cclxuICAgICAgICByZXR1cm4gW2NfZHBoX3JwLCBjX2Jlel9kcGhfcnBdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5rY2UgcHJvIHZyw6FjZW7DrSBwcm9jZW50YSBkYW7Em1xyXG4gICAgICogQHBhcmFtIGRhblR5cCAtIFR5cCBkYW7Em1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UHJvY2VudG9EYW5lKGRhblR5cDogbnVtYmVyLCBzYXpieURQSDogYW55LCBkYXR1bT86IERhdGUsIHJva0RwaD86IG51bWJlciwgbWVzaWNEcGg/OiBudW1iZXIpOiBEZWNpbWFsIHtcclxuICAgICAgICAvL2RlYnVnZ2VyOyAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE3Em2xvIGJ5IGZ1bmdvdmF0IHYgcG/FmcOhZGt1XHJcbiAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHZ5c2xlZGVrO1xyXG5cclxuICAgICAgICBpZiAoZGF0dW0pIHtcclxuICAgICAgICAgICAgcm9rRHBoID0gZGF0dW0uZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgbWVzaWNEcGggPSBkYXR1bS5nZXRNb250aCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJva0RwaCAmJiBtZXNpY0RwaCkge1xyXG4gICAgICAgICAgICB2YXIgaG9kbm90YSA9IERlY2ltYWwuYWRkKERlY2ltYWwubXVsKHJva0RwaCwgMTAwKS5kWzBdLCBtZXNpY0RwaCkuZFswXTtcclxuICAgICAgICAgICAgaWYgKHNhemJ5RFBIKSB7XHJcbiAgICAgICAgICAgICAgICBzYXpieURQSC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHguZGFuX3R5cCA9PT0gZGFuVHlwICYmIHgucm9rbWVzX29kISA8PSBob2Rub3RhLnRvU3RyaW5nKCkgJiYgeC5yb2ttZXNfZG8hID49IGhvZG5vdGEudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eXNsZWRlayA9IHguZGFuX3Byb2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2eXNsZWRlaztcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBGdW5rY2UgcHJvIHpwcmFjb3bDoXbDoW7DrSBJU0x1XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRvZGEgcHJvIHpwcmFjb3bDoW7DrSDDunNwxJvFoW7DqWhvIHbDvXNsZWRrdSB6IElTTFxyXG4gICAgICogSVNMIG1ldG9kYSBtdXPDrSBiw710IHR5cHUgR1Jlc3BvbnNlICogQHJlcXVpcmVzIEdSZXNwb25zZVxyXG4gICAgICogQHBhcmFtIGpxWEhSIC0ganFYSFIgb2JqZWN0LCB3aGljaCBpcyBhIHN1cGVyc2V0IG9mIHRoZSBYTUxIVFRQUmVxdWVzdCBvYmplY3QgKG9zb2JuxJsgbmlqYWsgbmV2eXXFvsOtdsOhbSwgYWxlIGplZG7DoSBzZSBvIHBydm7DrSBuw6F2cmF0b3ZvdSBob2Rub3R1IHDFmWkgRkFJTHUgc2Vydi4gbWV0b2R5KVxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudCAtIEdDb250ZW50ICh0aGlzLCB0aGF0LCBoZXJlLC4uLilcclxuICAgICAqIEBwYXJhbSBpZCAtIHVuaWvDoXRuw60gSUQgcHJvIG96bmHEjWVuw60gbm90aWZpa2FjZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0U3VjY2Vzc01zZ0Zyb21Jc2woanFYSFIsIGNvbnRlbnQ6IEdDb250ZW50LCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy92YXIgbXNnID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpxWEhSLk1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vbXNnICs9IGpxWEhSLk1lc3NhZ2VzW2ldLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKGNvbnRlbnQsIGlkLCBqcVhIUi5NZXNzYWdlc1tpXS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgLy9jb250ZW50Lm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBpZCwgc3RhdGU6IFwic3VjY2Vzc1wiLCB0aXRsZTogXCLDmnNwxJtjaCBvcGVyYWNlXCIsIGNvbnRlbnQ6IGpxWEhSLk1lc3NhZ2VzW2ldLk1lc3NhZ2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gbm90aWZpa2FjZSAobmFwxZnDrWtsYWQgcMWZaSDDunNwxJtjaHUgSVNMIG1ldG9keSkgXHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50IEdDb250ZW50ICh0aGlzLCB0aGF0LCBoZXJlLC4uLilcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJRCBha2NlL29wZXJhY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgWnByw6F2YSBvIHbDvXNsZWRrdVxyXG4gICAgICogQHBhcmFtIHtHU3RhdGV9IHN0YXYgU3RhdiBub3RpZmlrYWNlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBlcnJvciwgaW1wb3J0YW50KSAtIChEZWZhdWwgPSBcInN1Y2Nlc3NcIikgIEBkZWZhdWx0IFwic3VjY2Vzc1wiIEBkZWZhdWx0VmFsdWUgXCJzdWNjZXNzXCJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgTWV0b2RhIHpvYnJhemVuw60gbm90aWZpa2FjZSAoc2hvd1RvYXN0LCBhZGQpLSAoRGVmYXVsID0gXCJzaG93VG9hc3RcIikgIEBkZWZhdWx0IFwic3VjY2Vzc1wiIEBkZWZhdWx0VmFsdWUgXCJzaG93VG9hc3RcIiBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKGNvbnRlbnQ6IEdDb250ZW50LCBpZDogc3RyaW5nLCBtc2c6IHN0cmluZywgc3RhdjogR1N0YXRlID0gXCJzdWNjZXNzXCIsIG1ldGhvZDogXCJzaG93VG9hc3RcIiB8IFwiYWRkXCIgPSBcInNob3dUb2FzdFwiKSB7XHJcbiAgICAgICAgbGV0IGxfdGl0bGU6IHN0cmluZyA9IFwiw5pzcMSbY2ggb3BlcmFjZVwiO1xyXG4gICAgICAgIGxldCBsX2ljb246IHN0cmluZyA9IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICBzd2l0Y2ggKHN0YXYpIHtcclxuICAgICAgICAgICAgY2FzZSBcImluZm9cIjogeyBsX3RpdGxlID0gXCJJbmZvcm1hY2VcIjsgbF9pY29uID0gXCJmYS1pbmZvLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCI7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbXBvcnRhbnRcIjogeyBsX3RpdGxlID0gXCJExa9sZcW+aXTDqVwiOyBsX2ljb24gPSBcImZhLWluZm8tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWltcG9ydGFudFwiOyBicmVhazsgfVxyXG4gICAgICAgICAgICBjYXNlIFwid2FybmluZ1wiOiB7IGxfdGl0bGUgPSBcIlVwb3pvcm7Em27DrVwiOyBsX2ljb24gPSBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6IHsgbF90aXRsZSA9IFwiQ2h5YmEgLSBuZcO6c3DEm8WhbsOhIG9wZXJhY2VcIjsgbF9pY29uID0gXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjogeyBsX3RpdGxlID0gXCLDmnNwxJtjaCBvcGVyYWNlXCI7IGxfaWNvbiA9IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIjsgYnJlYWs7IH1cclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlkID0gaWQgKyBcIl9cIiArIHN0YXYgKyBcIl9cIiArIGNvbnRlbnQuZ3BjVG9rZW4gLy9sZXQgbF9pZDogc3RyaW5nID0gaWQgKyBcIl9cIiArIHN0YXYgKyBcIl9cIiArIHRoYXQuSXhzRnVuXHJcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJhZGRcIilcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHsgaWQ6IGlkLCBzdGF0ZTogc3RhdiwgaWNvbjogbF9pY29uLCB0aXRsZTogbF90aXRsZSwgY29udGVudDogbXNnIH0sIHRydWUpO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50Lm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBpZCwgc3RhdGU6IHN0YXYsIGljb246IGxfaWNvbiwgdGl0bGU6IGxfdGl0bGUsIGNvbnRlbnQ6IG1zZyB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTWV0b2RhIHBybyB6cHJhY292w6Fuw60gTkXDunNwxJvFoW7DqWhvIHbDvXNsZWRrdSB6IElTTFxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudCAtIEdDb250ZW50ICh0aGlzLCB0aGF0LCBoZXJlLC4uLilcclxuICAgICAqIEBwYXJhbSBqcVhIUiAtIGpxWEhSIG9iamVjdCwgd2hpY2ggaXMgYSBzdXBlcnNldCBvZiB0aGUgWE1MSFRUUFJlcXVlc3Qgb2JqZWN0IChvc29ibsSbIG5pamFrIG5ldnl1xb7DrXbDoW0sIGFsZSBqZWRuw6Egc2UgbyBwcnZuw60gbsOhdnJhdG92b3UgaG9kbm90dSBwxZlpIEZBSUx1IHNlcnYuIG1ldG9keSlcclxuICAgICAqIEBwYXJhbSB0eXAgLSBUeXAgdnlqw61ta3kgKCBleGVwdGlvbiwgLi4uICkgfC0gVGFrw6kgc2UgbHplIGRvdGF6b3ZhdCBrb25rw6l0bsSbIHBvbW9jw60gb2JqLmJhc2VUeXBlIChuYXDFmS4gLi4uKVxyXG4gICAgICogQHBhcmFtIG9iaiAtIE9iamVjdCBzIGRhdHkgbyB2w71zbGVka3UgSVNMIG1ldG9keSAoLT4ganFYSFIuZGV0YWlscykgICAgXHJcbiAgICAgKi8gLy8qIEBwYXJhbSByZXRUeXBlIC0gWnDFr3NvYiBqYWsgc2UgbcOhIGRpYWxvZyBzIGNoeWJvdSB2cmFjZXQgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0RmFpbEZyb21Jc2woY29udGVudDogR0NvbnRlbnQsIGpxWEhSOiBhbnksIHR5cDogYW55LCBvYmo6IGFueSk6IGFueSB7IC8vLCByZXRUeXBlOiBib29sZWFuXHJcbiAgICAgICAgbGV0IGJveFRpdGxlID0gXCJDaHliYVwiOyAvLyAtIFRpdHVsZWsgb2tuYSBzIGNoeWJvdVxyXG4gICAgICAgIC8vbsSbY28gc2UgcG9rYXppbG8gdGFrIHZyw6F0aW0gaGzDocWha3UgbyBkxa92b2R1IG5lw7pzcMSbY2h1XHJcbiAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTsgLy8gUHJvamlzdG90dSBzZSBwb2t1c8OtbSBqZcWhdMSbIHVrb27EjWl0IG9wZXJhY2kgLSBrZHlieSBuxJtrZGUgbsSbamFrw6EgYsSbxb5lbGEuLi5cclxuICAgICAgICBjb25zb2xlLmxvZyhvYmouRGF0YSk7ICAvLyAtIHBybyBkZWJ1Z292w6Fuw60gYXRkLiBkYXRhIHYga29uem9saSBzZSDEjWFzdG8gaG9kw60gbcOtdFxyXG4gICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHsgIC8vIC0gSmVsaSBjaHliYSB0eXB1IGV4Y2VwdGlvbi4uLiAoY2/FviBieSBtxJtsYSBiw710IGthxb5kw6EgY2h5YmEgemUgc2VydmVyb3bDqSBtZXRvZHkpIFxyXG4gICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7ICAgICAvLyAtIFTDrW10byB6YWppc3TDrW0gKHpydcWhw61tKSB6b2JyYXplbsOtIGdvcmRpY2vDqWhvIG9rbmEgXHJcbiAgICAgICAgICAgIGlmIChvYmouYmFzZVR5cGUgPT0gJ0dvcmRpYy5HZW5lcmFsLkdGYXRhbFNwbEV4Y2VwdGlvbicgfHwgb2JqLmJhc2VUeXBlID09ICdHb3JkaWMuR2VuZXJhbC5HTm9uRmF0YWxTcGxFeGNlcHRpb24nKSB7ICAvLyAtIEplbGkgY2h5YmEgR0ZhdGFsU3BsRXhjZXB0aW9uIHwgY2/FviBieSBtxJtsYSBiw710IGNoeWJhIHZyw6FjZW7DoSB6IHByb2NlZHVyeVxyXG4gICAgICAgICAgICAgICAgbGV0IHJldFNwbEV4Y2VwdGlvbiA9IHRyeVBhcnNlU3BsRXJyb3JNZXNzYWdlKG9iai5iYXNlTWVzc2FnZSk7ICAgICAvLyAtIFprdXPDrW0gc2kgamkgdXByYXZpdCBhYnkgbmV2cmFjZWzDoSBuZWhlemvDvSB0ZXh0XHJcbiAgICAgICAgICAgICAgICBvYmouYmFzZU1lc3NhZ2UgPSByZXRTcGxFeGNlcHRpb25bMF07IC8vIC0gWmRlIGplIHRleHQgY2h5YnlcclxuICAgICAgICAgICAgICAgIGlmIChyZXRTcGxFeGNlcHRpb25bMV0gIT0gXCJcIikgYm94VGl0bGUgKz0gYCAoJHtyZXRTcGxFeGNlcHRpb25bMV19KWA7IC8vIC0gWmRlIGplIMSNw61zbG8gY2h5YnlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudC5kaWFsb2dzLmVycm9yKGJveFRpdGxlLCBvYmouYmFzZU1lc3NhZ2UpIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBUT0RPOiB0dXRvIMSNw6FzdCB2eW1hemF0IC0+IHYgaWRlw6FsbsOtY2ggcG9kbcOtbmvDoWNoIHRvdG8gdcW+IGJ5IG5lbcSbbG8gbmFzdGF0Li4uICovXHJcbiAgICAgICAgLyovLyovZWxzZSBpZiAodHlwID09ICdJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HUmVzcG9uc2UnKSB7IC8vIFYgcMWZw61wYWTEmyDFvmUgbWkgY2h5YmEgcMWZaWpkZSB2IG3DqW0gdHlwdSBHUmVzcG9uc2UgKCA9IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR1Jlc3BvbnNlIClcclxuICAgICAgICAvKi8vKi8gICAgdmFyIG1zZyA9IFwiXCI7XHJcbiAgICAgICAgLyovLyovICAgIGZvciAodmFyIGkgPSAwOyBpIDwganFYSFIuTWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvKi8vKi8gICAgICAgIG1zZyArPSBqcVhIUi5NZXNzYWdlc1tpXS5NZXNzYWdlO1xyXG4gICAgICAgIC8qLy8qLyAgICAgICAgbXNnICs9IFwiPGJyPlwiO1xyXG4gICAgICAgIC8qLy8qLyAgICB9XHJcbiAgICAgICAgLyovLyovICAgIHJldHVybiBjb250ZW50LmRpYWxvZ3MuZXJyb3IoYm94VGl0bGUsIG1zZylcclxuICAgICAgICAvKi8vKi99XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRvZGEgcHJvIHpwcmFjb3bDoW7DrSBORcO6c3DEm8WhbsOpaG8gdsO9c2xlZGt1IHogSVNMIHwgdnJhY8OtICQuRGVmZXJyZWQ8dm9pZD4oKSAvLnByb21pc2UoKSAvLnJlamVjdCgpXHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50IC0gR0NvbnRlbnQgKHRoaXMsIHRoYXQsIGhlcmUsLi4uKVxyXG4gICAgICogQHBhcmFtIGpxWEhSIC0ganFYSFIgb2JqZWN0LCB3aGljaCBpcyBhIHN1cGVyc2V0IG9mIHRoZSBYTUxIVFRQUmVxdWVzdCBvYmplY3QgKG9zb2JuxJsgbmlqYWsgbmV2eXXFvsOtdsOhbSwgYWxlIGplZG7DoSBzZSBvIHBydm7DrSBuw6F2cmF0b3ZvdSBob2Rub3R1IHDFmWkgRkFJTHUgc2Vydi4gbWV0b2R5KVxyXG4gICAgICogQHBhcmFtIHR5cCAtIFR5cCB2eWrDrW1reSAoIGV4ZXB0aW9uLCAuLi4gKSB8LSBUYWvDqSBzZSBsemUgZG90YXpvdmF0IGtvbmvDqXRuxJsgcG9tb2PDrSBvYmouYmFzZVR5cGUgKG5hcMWZLiBcclxuICAgICAqIEBwYXJhbSBvYmogLSBPYmplY3QgcyBkYXR5IG8gdsO9c2xlZGt1IElTTCBtZXRvZHkgKGpxWEhSLmRldGFpbHMpICBcclxuICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSB2cmFjw60gZGVmZXJyZWQgLSBwcm9taXNlIC0gcmVqZWN0ICAgIFxyXG4gICAgICovIC8vKiBAcGFyYW0gZGVmZXJlZCAtIHZhciBkZWZlcmVkID0gJC5EZWZlcnJlZDx2b2lkPigpO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEZhaWxGcm9tSXNsUHJvbWlzZShjb250ZW50OiBHQ29udGVudCwganFYSFI6IGFueSwgdHlwOiBhbnksIG9iajogYW55KTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7IC8vLCBkZWZlcmVkOiBKUXVlcnkuRGVmZXJyZWQ8YW55LGFueSxhbnk+XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTtcclxuICAgICAgICBsZXQgZXJyVGl0bGUgPSBcIkNoeWJhXCI7XHJcbiAgICAgICAgLy9uxJtjbyBzZSBwb2themlsbyB0YWsgdnLDoXRpbSBobMOhxaFrdSBvIGTFr3ZvZHUgbmXDunNwxJtjaHVcclxuICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpOyAvLyBQcm9qaXN0b3R1IHNlIHBva3Vzw61tIGplxaF0xJsgdWtvbsSNaXQgb3BlcmFjaSAtIGtkeWJ5IG7Em2tkZSBuxJtqYWvDoSBixJvFvmVsYS4uLlxyXG4gICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHsgIC8vIC0gSmVsaSBjaHliYSB0eXB1IGV4Y2VwdGlvbi4uLlxyXG4gICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7ICAgICAvLyAtIFTDrW10byB6YWppc3TDrW0gKHpydcWhw61tKSB6b2JyYXplbsOtICBcclxuICAgICAgICAgICAgaWYgKG9iai5iYXNlVHlwZSA9PSAnR29yZGljLkdlbmVyYWwuR0ZhdGFsU3BsRXhjZXB0aW9uJyB8fCBvYmouYmFzZVR5cGUgPT0gJ0dvcmRpYy5HZW5lcmFsLkdOb25GYXRhbFNwbEV4Y2VwdGlvbicpIHsgIC8vIC0gSmVsaSBjaHliYSBHRmF0YWxTcGxFeGNlcHRpb24gfCBjb8W+IGJ5IG3Em2xhIGLDvXQgY2h5YmEgdnLDoWNlbsOhIHogcHJvY2VkdXJ5XHJcbiAgICAgICAgICAgICAgICBvYmouYmFzZU1lc3NhZ2UgPSB0cnlQYXJzZVNwbEVycm9yTWVzc2FnZShvYmouYmFzZU1lc3NhZ2UpOyAvLyAtIFprdXPDrW0gc2kgamkgdXByYXZpdCBhYnkgbmV2cmFjZWzDoSBuZWhlemvDvSB0ZXh0XHJcbiAgICAgICAgICAgICAgICBlcnJUaXRsZSA9IFwiQ2h5YmEgcMWZaSBzcHJhY292w6F2w6Fuw60gcHJvY2VkdXJ5XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLmVycm9yKGVyclRpdGxlLCBvYmouYmFzZU1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gLy8gVE9ETzogdHV0byDEjcOhc3QgdnltYXphdCAtPiB2IGlkZcOhbG7DrWNoIHBvZG3DrW5rw6FjaCB0b3RvIHXFviBieSBuZW3Em2xvIG5hc3RhdC4uXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRlZi5yZWplY3QoKTsvLy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0b2RhIHBybyB6Zm9ybW92w6Fuw60gdGV4dHUgY2h5YnkuICAgICBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGNoeWJ5IGt0ZXLDvSBvYnNhaHVqZSBjaHlidSB2eWhvemVub3UgeiBwcm9jZWR1cnksIHR6bi4gamUtbGkgYmFzZVR5cGUgJ0dGYXRhbFNwbEV4Y2VwdGlvbidcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFpmb3Jtw6F0b3ZhbsO9IHRleHQgcHJvIGRpYWxvZ3MuZXJyb3IoKVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdHJ5UGFyc2VTcGxFcnJvck1lc3NhZ2UoaW5wdXQ6IHN0cmluZyk6IFtzdHJpbmcgLCBzdHJpbmdde1xyXG4gICAgICAgIC8vVE9ETzogdGXEjyBrZHnFviBwcm9jZWR1cnkgdWRlbWUgenByYWNvdsOhdmF0IHJ1xI1uxJssIG1vxb5uw6EgYnVkZSB0xZllYmEgdG8gdGFkeSB1cHJhdml0IG5lYm8gZG9wbG5pdCAodGFrw6kgY2hjZW1lIHZyYWNldCDEjcOtc2xvIGNoeWIsIGt0ZXLDqSBzZSBuw6FzbGVkbsSbIGJ1ZGUgb2JqZXZvdmF0IHYgdGl0dWxrdSBva25hLlxyXG4gICAgICAgIGxldCBvdXRwdXQgPSBcIlwiO1xyXG4gICAgICAgIGxldCBzcGxDb2RlOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgICAgICAvLyBIbGVkw6Fuw60gemHEjcOhdGt1IMWZZXTEm3pjZSDigJMga29uxI3DrSBuYSBwcnZuw61tIHNsb3bEmyBzIGR2b2p0ZcSNa291XHJcbiAgICAgICAgY29uc3Qgc3RhcnRNYXRjaCA9IGlucHV0Lm1hdGNoKC9ecHJvY2VkdXJhXFxzKyhbXFxzXFxTXSs/KVxccytcXFMrOi8pO1xyXG4gICAgICAgIGlmIChzdGFydE1hdGNoKSB7XHJcbiAgICAgICAgICAgIC8vIEhsZWTDoW7DrSBuw6F6dnUgcHJvY2VkdXJ5IChzbG92byBwbyBcInByb2NlZHVyYVwiKVxyXG4gICAgICAgICAgICBjb25zdCBwcm9jZWR1cmVOYW1lTWF0Y2ggPSBpbnB1dC5tYXRjaCgvXnByb2NlZHVyYVxccysoXFxTKykvaSk7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZWR1cmVOYW1lID0gcHJvY2VkdXJlTmFtZU1hdGNoID8gYDxiPiR7cHJvY2VkdXJlTmFtZU1hdGNoWzFdfTwvYj5gIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIERvaG90b3ZlbsOtIHphxI3DoXRrdSBvdXRwdXQgdGV4dHUuLi5cclxuICAgICAgICAgICAgb3V0cHV0ID0gYFByb2NlZHVyYSAke3Byb2NlZHVyZU5hbWV9ICR7c3RhcnRNYXRjaFsxXS5yZXBsYWNlKHByb2NlZHVyZU5hbWVNYXRjaD8uWzFdIHx8IFwiXCIsIFwiXCIpLnRyaW0oKX0uYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEhsZWTDoW7DrSBcImvDs2Q6XCIgYSBleHRyYWtjZSBob2Rub3R5XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGVNYXRjaCA9IGlucHV0Lm1hdGNoKC9cXGJrw7NkOlxccyooLT9cXGQrfFxcdyspLyk7XHJcbiAgICAgICAgICAgIGlmIChjb2RlTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBgPGJyLz4gS8OzZCBjaHlieTogPGI+JHtjb2RlTWF0Y2hbMV19PC9iPmA7XHJcbiAgICAgICAgICAgICAgICBzcGxDb2RlID0gY29kZU1hdGNoWzFdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIbGVkw6Fuw60gXCJ0ZXh0OlwiIGEgZXh0cmFrY2UgaG9kbm90eSBhxb4gcG8gXCJsb2s6XCJcclxuICAgICAgICAgICAgY29uc3QgdGV4dE1hdGNoID0gaW5wdXQubWF0Y2goL3RleHQ6XFxzKiguKj8pXFxzKmxvazovcyk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0TWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBgIDxici8+ICR7dGV4dE1hdGNoWzFdLnRyaW0oKX1gO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUG9rdWQganNtZSBuaWMgbmVleHRyYWhvdmFsaSwgdnLDoXTDrW1lIHDFr3ZvZG7DrSB2c3R1cFxyXG4gICAgICAgIGlmIChvdXRwdXQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUG9rdWQgaW5wdXQgbmVvYnNhaHVqZSBwb8W+YWRvdmFuw70gdHZhciwgdGFrIGFsZXNwb8WIIG5hc3RhdsOtbSBwcnZuw60gcMOtc21lbm8gdmVsa8OpID0pXHJcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgb3V0cHV0LnNsaWNlKDEpO1xyXG5cclxuICAgICAgICByZXR1cm4gW291dHB1dCwgc3BsQ29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBpZFZhbGlkYXRpb24oaW5wdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggIT0gMTIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkl4cyh7IHBpZDogdHJ1ZSB9KS52YWxpZGF0ZShpbnB1dCwgJC5uZXdEaXYoKSkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDDmnByYXZhIGRlZmluaWMgYWtjw60sIG1lbnUsIGtwaSwgLi4uIHBybyBkZXRhaWxidWlsZGVyIChwcm8gZGV0YWlseSBuZXBvdcW+w612YWrDrWPDrSBXRkwvU1NMIGtvbXBvbmVudHkpXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUJ1aWxkZXJEZWZpbml0aW9uKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBtZW51IC0gb2RwaW5vdsOhbsOtIFxyXG4gICAgICAgIC8vYnVpbGRlci51cGRhdGVEZWZpbml0aW9uKFwibWVudUhpc3RvcnlPcGVuXCIsIHsgZmF2b3JpdGU6IGZhbHNlIH0sIEdEYmQuRGVmaW5pdGlvbktpbmQuTWVudUJhcik7XHJcbiAgICAgICAgLy9idWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJtZW51V2ZsQ2lubm9zdGlcIiwgeyBmYXZvcml0ZTogZmFsc2UgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuICAgICAgICAvL2J1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcIm1lbnVXZmxDaW5ub3N0aU9kZXNsYW5pXCIsIHsgZmF2b3JpdGU6IGZhbHNlIH0sIEdEYmQuRGVmaW5pdGlvbktpbmQuTWVudUJhcik7XHJcbiAgICAgICAgLy9idWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJtZW51V2ZsQ2lubm9zdGlaYWRvc3RPUG9kcGlzXCIsIHsgZmF2b3JpdGU6IGZhbHNlIH0sIEdEYmQuRGVmaW5pdGlvbktpbmQuTWVudUJhcik7XHJcbiAgICAgICAgLy9idWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJtZW51V2ZsQ2lubm9zdGlTY2h2YWxvdmFjaVByb2Nlc1wiLCB7IGZhdm9yaXRlOiBmYWxzZSB9LCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIC8vYnVpbGRlci51cGRhdGVEZWZpbml0aW9uKFwibWVudVdmbENpbm5vc3RpQXV0S29udmVyemVcIiwgeyBmYXZvcml0ZTogZmFsc2UgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuICAgICAgICAvL2J1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcIm1lbnVXZmxWYXpieVwiLCB7IGZhdm9yaXRlOiBmYWxzZSB9LCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIC8vYnVpbGRlci51cGRhdGVEZWZpbml0aW9uKFwibWVudVdmbFJlZGlzdHJpYnVjZVwiLCB7IGZhdm9yaXRlOiBmYWxzZSB9LCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIC8vYnVpbGRlci51cGRhdGVEZWZpbml0aW9uKFwibWVudVdmbFJlZGlzdHJpYnVjZVByZWRhbmlTc2xcIiwgeyBmYXZvcml0ZTogZmFsc2UgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuICAgICAgICAvL2J1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcIm1lbnVXZmxSZWRpc3RyaWJ1Y2VQcmlkZWxlbmlTc2xcIiwgeyBmYXZvcml0ZTogZmFsc2UgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuXHJcbiAgICAgICAgLy8gbWVudSAtIHDFmWVzdW4geiBkb2t1bWVudHVcclxuICAgICAgICAvL2xldCBpdGVtU291dlZheiA9IGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihcIm1lbnVTb3V2aXNlamljaVwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIC8vaWYgKGl0ZW1Tb3V2VmF6ICYmIGl0ZW1Tb3V2VmF6Lmxlbmd0aCA+IDAgJiYgaXRlbVNvdXZWYXpbMF0/Lml0ZW0gJiYgKGl0ZW1Tb3V2VmF6WzBdLml0ZW0gYXMgYW55KS5pZCA9PT0gXCJtZW51U291dmlzZWppY2lcIikge1xyXG4gICAgICAgIC8vICAgIGlmICgoaXRlbVNvdXZWYXpbMF0uaXRlbSBhcyBhbnkpLnBhcmVudCkgZGVsZXRlIChpdGVtU291dlZhelswXS5pdGVtIGFzIGFueSkucGFyZW50O1xyXG4gICAgICAgIC8vICAgIGlmICgoaXRlbVNvdXZWYXpbMF0uaXRlbSBhcyBhbnkpLmFmdGVyKSBkZWxldGUgKGl0ZW1Tb3V2VmF6WzBdLml0ZW0gYXMgYW55KS5hZnRlcjtcclxuICAgICAgICAvLyAgICBidWlsZGVyLm1vdmVEZWZpbml0aW9uQWZ0ZXIoXCJtZW51U291dmlzZWppY2lcIi8qXCJtZW51UnVuU291dkRva1wiKi8sIFwibWVudUhpc3RvcnlPcGVuXCIsIEdEYmQuRGVmaW5pdGlvbktpbmQuTWVudUJhcik7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGJ1aWxkZXIubW92ZURlZmluaXRpb25BZnRlcihcIm1lbnVUaXNrXCIsIFwibWVudURkcFByaXBhZFBvZGFuaVwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIGJ1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcIm1lbnVUaXNrUHJpcGFkRERQXCIsIHsgcGFyZW50OiBcIm1lbnVUaXNrXCIgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuICAgICAgICBidWlsZGVyLm1vdmVEZWZpbml0aW9uQmVmb3JlKFwibWVudVRpc2tQcmlwYWRERFBcIiwgXCJtZW51VGlza1V6aXZhdGVsc2tlUG96bmFta3lcIiwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuXHJcbiAgICAgICAgYnVpbGRlci5tb3ZlRGVmaW5pdGlvbkFmdGVyKFwibWVudVdmbENpbm5vc3RpXCIsIFwibWVudVJlZGlzdHJpYnVjZVwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIGJ1aWxkZXIubW92ZURlZmluaXRpb25BZnRlcihcIm1lbnVIaXN0b3J5T3BlblwiLCBcIm1lbnVXZmxDaW5ub3N0aVwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIGJ1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcIm1lbnVXZmxDaW5ub3N0aVwiLCB7IGljb246IFwiZ2ktZG9jLWluLWZvbGRlcl9ib2xkXCIgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5NZW51QmFyKTtcclxuXHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGZ1bmtjw60gcMWZw61wYWR1IG5hIHphxI3DoXRlayBtZW51XHJcbiAgICAgICAgLy9idWlsZGVyLm1vdmVEZWZpbml0aW9uQmVmb3JlKFwibWVudURkcFByaXBhZFwiLCBcIm1lbnVMaXN0Q29udHJvbHNQcmV2aW91c1JlY29yZFwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgICAgIC8vYnVpbGRlci5tb3ZlRGVmaW5pdGlvbkJlZm9yZShcIm1lbnVHUHJpcGFkeVBvZGFuaVwiLCBcIm1lbnVMaXN0Q29udHJvbHNQcmV2aW91c1JlY29yZFwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQcm9jZXNzUmVzcG9uc2U8VFJlc3BvbnNlIGV4dGVuZHMgKEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdHcm91cFJlc3BvbnNlPFREdG8+IHwgSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR1Jlc3BvbnNlPFREdG8+KSwgVER0bz4ocHJvbWlzZTogSlF1ZXJ5UHJvbWlzZTxUUmVzcG9uc2U+LCBjb250ZW50OiBHQ29udGVudCwgY2xvc2VPblN1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZSwgY2xvc2VPbkZhaWw6IGJvb2xlYW4gPSBmYWxzZSwgZ2V0U3VjY2Vzc01zZzogYm9vbGVhbiA9IHRydWUpOiBKUXVlcnlQcm9taXNlPFRSZXNwb25zZT4ge1xyXG4gICAgICAgIGlmIChwcm9taXNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG5cclxuICAgICAgICBsZXQgcmV0dXJuUHJvbWlzZSA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvKiogWsOtc2vDoW7DrSBzdGF2dSB2w71zbGVka3Ugb3BlcmFjZSAqL1xyXG4gICAgICAgIGxldCBnZXRTdGF0ZSA9IChzdGF0ZTogSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR01lc3NhZ2VUeXBlIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHsgLy8gVXByYXZlbm8gcHJvIMO6xI1lbHkgdm9sw6Fuw60gZnVua2NlIHNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKClcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR01lc3NhZ2VUeXBlLlN1Y2Nlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VjY2Vzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIFwiZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5FcnJvcjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIFwiZy1zdGF0ZS1lcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HTWVzc2FnZVR5cGUuV2FybmluZzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ3YXJuaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gXCJnLXN0YXRlLXdhcm5pbmdcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogWsOtc2thbsOtIHRpdHVsa3Ugb2tuYSAtIG55bsOtIHNvdcSNw6FzdMOtIG1ldG9keSBuYSB6w6FrbGFkxJsgc3RhdGUgdsO9c2xlZGt1ICovXHJcbiAgICAgICAgbGV0IGdldFRpdGxlID0gKHN0YXRlOiBJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HTWVzc2FnZVR5cGUgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR01lc3NhZ2VUeXBlLlN1Y2Nlc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiw5pzcMSbY2hcIjtcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR01lc3NhZ2VUeXBlLkVycm9yOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkNoeWJhXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5XYXJuaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlZhcm92w6Fuw61cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogWsOtc2thbsOtIGEgbmFzdGF2ZW7DrSB6cHLDoXZ5IG8gY2h5YsSbICovXHJcbiAgICAgICAgbGV0IGdldE1lc3NhZ2UgPSAobWVzc2FnZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTmV6bsOhbcOhIGNoeWJhXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogWmF2b2zDoW7DrSBmdW5rY2UgcHJvIHpvYnJhemVuw60gdsO9c2xlZGt1IG9wZXJhY2UgLSBub3RpZmljYXRpb24gKGTFmcOtdmUgZmxhc2gpICovXHJcbiAgICAgICAgbGV0IHNob3dSZXNwb25zZSA9IChyZXNwb25zZTogSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR1Jlc3BvbnNlPFREdG8+LCBjb250ZW50OiBHQ29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuTWVzc2FnZXMgIT0gbnVsbCAmJiByZXNwb25zZS5NZXNzYWdlcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuTWVzc2FnZXMuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2hvd0ZsYXNoKGdldE1lc3NhZ2UodmFsdWUuTWVzc2FnZSksIGdldFN0YXRlKHZhbHVlLlR5cGUpLyosIDEwMDAwKi8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwgeyB0aXRsZTogZ2V0VGl0bGUodmFsdWUuVHlwZSksIGNvbnRlbnQ6IGdldE1lc3NhZ2UodmFsdWUuTWVzc2FnZSkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXROb3RpZmljYXRpb25BZnRlck9wZXJhdGlvbihjb250ZW50LCBcImFmdGVyUHJvY2Vzc1Jlc3BvbnNlXCIsIGdldE1lc3NhZ2UodmFsdWUuTWVzc2FnZSksIGdldFN0YXRlKHZhbHVlLlR5cGUpLCApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9taXNlXHJcbiAgICAgICAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09IG51bGwgfHwgZ2V0U3VjY2Vzc01zZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuU3VjY2VzcyA9PSB0cnVlICYmIHJlc3BvbnNlLlN1Y2Nlc3NNc2cgIT0gbnVsbCAmJiByZXNwb25zZS5TdWNjZXNzTXNnLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKGNvbnRlbnQsIFwiYWZ0ZXJQcm9jZXNzUmVzcG9uc2VcIiwgcmVzcG9uc2UuU3VjY2Vzc01zZywgXCJzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVtcIlJlc3BvbnNlc1wiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGVkUmVzcCA9IDxJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HR3JvdXBSZXNwb25zZTxURHRvPj5yZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZWRSZXNwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVkUmVzcC5TdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlQ29udGVudCA9IChjbG9zZU9uU3VjY2VzcyAmJiB0eXBlZFJlc3AuU3VjY2VzcykgfHwgKGNsb3NlT25GYWlsICYmICF0eXBlZFJlc3AuU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDb250ZW50ID0gY2xvc2VDb250ZW50ICYmIGNvbnRlbnQucGFyZW50Q29udGVudCAhPSBudWxsID8gY29udGVudC5wYXJlbnRDb250ZW50IDogY29udGVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoIWNsb3NlQ29udGVudCB8fCAoY2xvc2VDb250ZW50ICYmIHRhcmdldENvbnRlbnQgIT09IGNvbnRlbnQpKSAmJiB0eXBlZFJlc3AuUmVzcG9uc2VzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVkUmVzcC5SZXNwb25zZXMuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dSZXNwb25zZSh2YWx1ZSwgdGFyZ2V0Q29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbG9zZSh0eXBlZFJlc3AuU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Qcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VbXCJNZXNzYWdlc1wiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGVkUmVzcCA9IDxJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HUmVzcG9uc2U8VER0bz4+cmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVkUmVzcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlZFJlc3AuU3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZUNvbnRlbnQgPSAoY2xvc2VPblN1Y2Nlc3MgJiYgdHlwZWRSZXNwLlN1Y2Nlc3MpIHx8IChjbG9zZU9uRmFpbCAmJiAhdHlwZWRSZXNwLlN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q29udGVudCA9IGNsb3NlQ29udGVudCAmJiBjb250ZW50LnBhcmVudENvbnRlbnQgIT0gbnVsbCA/IGNvbnRlbnQucGFyZW50Q29udGVudCA6IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZUNvbnRlbnQgfHwgKGNsb3NlQ29udGVudCAmJiB0YXJnZXRDb250ZW50ICE9PSBjb250ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1Jlc3BvbnNlKHR5cGVkUmVzcCwgdGFyZ2V0Q29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xvc2UodHlwZWRSZXNwLlN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZU9uU3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5Qcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZmFpbCgoeGhyLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgIC8vbsSbY28gc2UgcG9rYXppbG8gdGFrIHZyw6F0aW0gaGzDocWha3UgbyBkxa92b2R1IG5lw7pzcMSbY2h1XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpOyAvLyBQcm9qaXN0b3R1IHNlIHBva3Vzw61tIGplxaF0xJsgdWtvbsSNaXQgb3BlcmFjaSAtIGtkeWJ5IG7Em2tkZSBuxJtqYWvDoSBixJvFvmVsYS4uLlxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHsgLy8gLSBKZWxpIGNoeWJhIHR5cHUgZXhjZXB0aW9uLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5iYXNlVHlwZSA9PSAnR29yZGljLkdlbmVyYWwuR0ZhdGFsU3BsRXhjZXB0aW9uJykgLy8gLSBKZWxpIGNoeWJhIEdGYXRhbFNwbEV4Y2VwdGlvbiB8IGNvxb4gYnkgbcSbbGEgYsO9dCBjaHliYSB2csOhY2Vuw6EgeiBwcm9jZWR1cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmJhc2VNZXNzYWdlID0gdHJ5UGFyc2VTcGxFcnJvck1lc3NhZ2Uob2JqLmJhc2VNZXNzYWdlKTsgLy8gLSBaa3Vzw61tIHNpIGppIHVwcmF2aXQgYWJ5IG5ldnJhY2Vsw6EgbmVoZXprw70gdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIChjbG9zZU9uRmFpbCAmJiBjb250ZW50LnBhcmVudENvbnRlbnQgIT0gbnVsbCA/IGNvbnRlbnQucGFyZW50Q29udGVudCA6IGNvbnRlbnQpLmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZU9uRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlOyAvLyAtIFTDrW10byB6YWppc3TDrW0gKHpydcWhw61tKSB6b2JyYXplbsOtICBvcmlnaW7DoWxuw61obyBvaWtuYSBjaHlieVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmouRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZWplY3QoeGhyLCB0eXBlLCBvYmopO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblByb21pc2UucHJvbWlzZSgpO1xyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmtjZSBwcm8gQXN5bmNocm9ubsOtIGFrY2VcclxuICAgIC8qKlxyXG4gICAgKiBDb25maWd1cmF0aW9uIG9iamVjdCBmb3IgYXN5bmNocm9ub3VzIGFjdGlvbiB0ZXh0c1xyXG4gICAgKi9cclxuICAgIGNvbnN0IEFTWU5DX0FDVElPTl9URVhUUzogUmVjb3JkPHN0cmluZywgeyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT4gPSB7XHJcbiAgICAgICAgXCJOYXN0YXZlbmlTdGF2dVRpc2t1QU9kZXNsYW5pXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1IGEgb2Rlc2zDoW7DrVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBuYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3UgYSBvZGVzbMOhbsOtXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVnlzbGVkZWtOYXN0YXZlbmlTdGF2dVRpc2t1QU9kZXNsYW5pXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRG9rb27EjWVuYSBhc3luY2hyb25uw60gYWtjZVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIsOac3DEm8WhbsSbIGRva29uxI1lbm8gbmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1IGEgb2Rlc2zDoW7DrVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJlZGlzdHJpYnVjZVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlJlZGlzdHJpYnVjZVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBocm9tYWRuw6EgYWtjZSByZWRpc3RyaWJ1Y2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJWeXNsZWRla1JlZGlzdHJpYnVjZVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRva29uxI1lbmEgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogXCLDmnNwxJvFoW7EmyBkb2tvbsSNZW5hIHJlZGlzdHJpYnVjZSBwxZnDrXBhZMWvXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiT2Jub3ZlbmlWeW1cIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIcm9tYWRuw6kgb2Jub3ZlbsOtXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGhyb21hZG7DqSBvYm5vdmVuw60gdnlicmFuw71jaCBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVnlzbGVkZWtPYm5vdmVuaVZ5bVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRva29uxI1lbmEgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogXCLDmnNwxJvFoW7EmyBkb2tvbsSNZW5vIG9ibm92ZW7DrSBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiQ2lzbG9TYXpieVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DoSB6bcSbbmEgxI3DrXNsYSBzYXpieVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBocm9tYWRuw6kgem3Em25hIMSNw61zbGEgc2F6YnkgbmEgdnlicmFuw71jaCBwxZnDrXBhZGVjaFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5c2xlZGVrQ2lzbG9TYXpieVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRva29uxI1lbmEgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogXCLDmnNwxJvFoW7EmyBkb2tvbsSNZW5hIHptxJtuYSDEjcOtc2xhIHNhemJ5IG5hIHDFmcOtcGFkZWNoXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiTmFzdGF2ZW5pUG9sZVZlY1wiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIk5hc3RhdmVuw60gcG9sZSAnVsSbYydcIixcclxuICAgICAgICAgICAgY29udGVudDogXCJQcm9iw61ow6EgbmFzdGF2ZW7DrSBwb2xlICdWxJtjJ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5c2xlZGVrTmFzdGF2ZW5pUG9sZVZlY1wiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRva29uxI1lbmEgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogXCLDmnNwxJvFoW7EmyBkb2tvbsSNZW5vIHBvbGUgJ1bEm2MnXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiRG9wbERhdERvcnVjXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRG9wbG7Em27DrSBkYXRhIGRvcnXEjWVuw61cIixcclxuICAgICAgICAgICAgY29udGVudDogXCJQcm9iw61ow6EgaHJvbWFkbsOpIGRvcGxuxJtuw60gZGF0YSBkb3J1xI1lbsOtXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVnlzbGVkZWtEb3BsRGF0RG9ydWNcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgZG9wbG7Em27DrSBkYXRhIGRvcnXEjWVuw61cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJQcmlkYW5pRG90Y0Rva1wiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gZG9rdW1lbnR1XCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGhyb21hZG7DqSBwxZlpZMOhbsOtIGRvdMSNZW7DqWhvIGRva3VtZW50dVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5c2xlZGVrUHJpZGFuaURvdGNEb2tcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgcMWZaWTDoW7DrSBkb3TEjWVuw6lobyBkb2t1bWVudHVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJQcmlkYW5pRG90Y1N1YmpcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJQxZlpZMOhbsOtIGRvdMSNZW7DqWhvIHN1Ympla3R1XCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGhyb21hZG7DqSBwxZlpZMOhbsOtIGRvdMSNZW7DqWhvIHN1Ympla3R1XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVnlzbGVkZWtQcmlkYW5pRG90Y1N1YmpcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgcMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlByaWRhbmlEb3RjU3VialplU2t1cFwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHUgemUgc2t1cGlueVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBocm9tYWRuw6kgcMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dSB6ZSBza3VwaW55XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVnlzbGVkZWtQcmlkYW5pRG90Y1N1YmpaZVNrdXBcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgcMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dSB6ZSBza3VwaW55XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiSHJvbVBvZFNhYlwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DqSBwb2TDoW7DrSBkbGUgxaFhYmxvbnkgKFJPQilcIixcclxuICAgICAgICAgICAgY29udGVudDogXCJQcm9iw61ow6EgaHJvbWFkbsOpIHBvZMOhbsOtIGRsZSDFoWFibG9ueSB6IHZ5YnJhbsO9Y2ggesOhem5hbcWvIFJPQlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5c2xlZGVrSHJvbVBvZFNhYlwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRva29uxI1lbmEgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogXCLDmnNwxJvFoW7EmyBkb2tvbsSNZW5vIGhyb21hZG7DqSBwb2TDoW7DrSBkbGUgxaFhYmxvbnkgdnlicmFuw71jaCB6w6F6bmFtxa8gUk9CXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiSHJvbUFrdFwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DoSBha3R1YWxpemFjZSAoUk9CKVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBocm9tYWRuw6kgcMWZZXZ6ZXTDrSBhZHJlc27DrWNoIMO6ZGFqxa8gLSB6bcSbbiBuYSB2eWJyYW7DvWNoIHrDoXpuYW3FryBST0JcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJWeXNsZWRla0hyb21Ba3RcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgcMWZZXZ6ZXTDrSBhZHJlc27DrWNoIMO6ZGFqxa8gLSB6bcSbbiBuYSB2eWJyYW7DvWNoIHrDoXpuYW3FryBST0JcIlxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIFwiSHJvbVByaXJcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIcm9tYWRuw6kgcMWZaWTDoW7DrSBrYXJldCAtIHDFmcOtcnVzdGvFr1wiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBocm9tYWRuw6kgcMWZaWTDoW7DrSBrYXJldCAtIHDFmcOtcnVzdGvFryBuYSB2eWJyYW7DvWNoIHrDoXpuYW3FryBST0JcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJWeXNsZWRla0hyb21QcmlyXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRG9rb27EjWVuYSBhc3luY2hyb25uw60gYWtjZVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIsOac3DEm8WhbsSbIGRva29uxI1lbm8gaHJvbWFkbsOpIHDFmWlkw6Fuw60ga2FyZXQgLSBwxZnDrXJ1c3Rrxa8gbmEgdnlicmFuw71jaCB6w6F6bmFtxa8gUk9CXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiSHJvbVVieVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DqSB2ecWZw616ZW7DrSBrYXJldCAtIMO6Ynl0a8WvXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGhyb21hZG7DqSB2ecWZw616ZW7DrSBrYXJldCAtIMO6Ynl0a8WvIG5hIHZ5YnJhbsO9Y2ggesOhem5hbcWvIFJPQlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5c2xlZGVrSHJvbVVieVwiOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRva29uxI1lbmEgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogXCLDmnNwxJvFoW7EmyBkb2tvbsSNZW5vIGhyb21hZG7DqSB2ecWZw616ZW7DrSBrYXJldCAtIMO6Ynl0a8WvIG5hIHZ5YnJhbsO9Y2ggesOhem5hbcWvIFJPQlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5bWFoYW5pXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiSHJvbWFkbsOpIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGhyb21hZG7DqSB2eW3DoWjDoW7DrSBuYSB2eWJyYW7DvWNoIHDFmcOtcGFkZWNoIEREUFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlZ5c2xlZGVrVnltYWhhbmlcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgdnltw6Fow6Fuw60gbmEgdnlicmFuw71jaCBwxZnDrXBhZGVjaCBERFBcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJIcm9tU3ByXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiSHJvbWFkbsOpIHNwcmF2b3bDoW7DrVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBocm9tYWRuw6kgc3ByYXZvdsOhbsOtIG5hIHZ5YnJhbsO9Y2ggcMWZw61wYWRlY2ggRERQXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVnlzbGVkZWtIcm9tU3ByXCI6IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRG9rb27EjWVuYSBhc3luY2hyb25uw60gYWtjZVwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIsOac3DEm8WhbsSbIGRva29uxI1lbm8gaHJvbWFkbsOpIHNwcmF2b3bDoW7DrSBuYSB2eWJyYW7DvWNoIHDFmcOtcGFkZWNoIEREUFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIk5hc3RTdGF2RG9ydWNcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJOYXN0YXZlbsOtIHN0YXZ1IGRvcnXEjWVuw61cIixcclxuICAgICAgICAgICAgY29udGVudDogXCJQcm9iw61ow6EgbmFzdGF2ZW7DrSBzdGF2dSBkb3J1xI1lbsOtIG5hIHZ5YnJhbsO9Y2ggcMWZw61wYWRlY2ggdnltw6Fow6Fuw61cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJWeXNsZWRla05hc3RTdGF2RG9ydWNcIjoge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiw5pzcMSbxaFuxJsgZG9rb27EjWVubyBocm9tYWRuw6kgbmFzdGF2ZW7DrSBzdGF2dSBkb3J1xI1lbsOtIG5hIHZ5YnJhbsO9Y2ggcMWZw61wYWRlY2ggdnltw6Fow6Fuw61cIlxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYXN0YXbDrSB0ZXh0eSAoSUQsIHRpdGxlLCB0ZXh0KSBwcm8gZGFub3UgYXN5bmNocm9ubsOtIGFrY2lcclxuICAgICAqIEBwYXJhbSBuYXpldkFrY2VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRleHR5QWtjaShuYXpldkFrY2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbkNvbmZpZyA9IEFTWU5DX0FDVElPTl9URVhUU1tuYXpldkFrY2VdO1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogYWN0aW9uQ29uZmlnLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogYWN0aW9uQ29uZmlnLmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBpZDogZm9ybWF0TmF6ZXZBa2NlVGFzayhuYXpldkFrY2UpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGYWxsYmFjayBmb3IgdW5rbm93biBhY3Rpb25zXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTmV6bsOhbcOhIGFrY2VcIixcclxuICAgICAgICAgICAgY29udGVudDogYFByb2LDrWjDoSBha2NlOiAke25hemV2QWtjZX1gLFxyXG4gICAgICAgICAgICBpZDogZm9ybWF0TmF6ZXZBa2NlVGFzayhuYXpldkFrY2UpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQ29udmVydHMgdGhlIGZpcnN0IGxldHRlciBvZiBuYXpldkFrY2UgdG8gbG93ZXJjYXNlIGFuZCBhcHBlbmRzICdUYXNrJyB0byB0aGUgZW5kLlxyXG4gICAgKiBAcGFyYW0gbmF6ZXZBa2NlIFRoZSBhY3Rpb24gbmFtZS5cclxuICAgICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBzdHJpbmcuXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE5hemV2QWtjZVRhc2sobmF6ZXZBa2NlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghbmF6ZXZBa2NlKSByZXR1cm4gXCJ0YXNrXCI7XHJcbiAgICAgICAgcmV0dXJuIG5hemV2QWtjZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIG5hemV2QWtjZS5zbGljZSgxKSArIFwiVGFza1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBabcSbbsOtICdJRCcgbmEgJ3Z5c2xlZGVrIElEJ1xyXG4gICAgKiBAcGFyYW0gaWRcclxuICAgICogQHJldHVybnNcclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdnlzbGVkZWtJZChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWlkKSByZXR1cm4gXCJ2eXNsZWRla1wiO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gaWQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgcmVzdCA9IGlkLnNsaWNlKDEpO1xyXG4gICAgICAgIHJldHVybiBcInZ5c2xlZGVrXCIgKyBmaXJzdCArIHJlc3Q7XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvKipcclxuICAgICogTmFzdGF2w60gemtyYXRreSBwcm8gZGF0dW1vdsOpIHBvbMOtxI1rYSB2IGhyb21hZG7DvWNoIGFrY8OtY2ggKHdpenphcmQpXHJcbiAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAqIEBwYXJhbSBmb3JtXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRhdGVTaG9ydGN1dHNIcm9tQWtjZSh0aGF0OiBhbnksIGZvcm06IGFueSkge1xyXG4gICAgICAgIGlmIChmb3JtID09IG51bGwpIGZvcm0gPSAnd2l6UGFyYW1zJztcclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgYXBwZW5kZWQgbm9kZSBpcyB0aGUgd2l6UGFyYW1zIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChub2RlKS5pcyhgW2RhdGEtZm9ybT1cIiR7Zm9ybX1cIl1gKSB8fCAkKG5vZGUpLmZpbmQoYFtkYXRhLWZvcm09XCIke2Zvcm19XCJdYCkubGVuZ3RoID4gMCkgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLnNldERhdGVCb3hTaG9ydGN1dHModGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTsgLy8gRGlzY29ubmVjdCBvYnNlcnZlciBzaW5jZSB3ZSBvbmx5IG5lZWQgdGhpcyBvbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTdGFydCBvYnNlcnZpbmcgdGhlIGRvY3VtZW50IGJvZHkgZm9yIGNoYW5nZXNcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG59Il19