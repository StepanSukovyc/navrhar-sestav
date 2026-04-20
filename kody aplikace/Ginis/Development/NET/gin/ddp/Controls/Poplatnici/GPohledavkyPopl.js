"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPohledavkyPopl.ts                     </Name>
//    <Description> Okno pohledávek poplatníka                                  </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-12-12                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            //TISK
            //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.GPohledavkyPopl", { ID: "DDPGPohledavkyPopl#", ixp_pop: that.Ixp, , TypPhl: "--" });
            let GPohledavkyPopl = class GPohledavkyPopl extends Gordic.GDetailBuilderContent {
                //Program začíná zde, využívám pro vytvoření tabu s akcí TISK
                onDetailBuilderInit(builder) {
                    var that = this;
                    that.currentDate = new Date();
                    that.createActions();
                }
                //Toto se načte drůhé a onContentReady následovně
                onDetailBuilderBuild(builder) {
                    var that = this;
                    that.createForms();
                }
                onContentReady() {
                    var that = this;
                    that.taskId = "actGPohledavkyPopl";
                    that.title = `Případy vedené na poplatníka`;
                    that.setBreadcrumbs([{
                            caption: "Pohledávky poplatníka " + that.model.ixp,
                            action: that.actions.actPripadyZavritPotomky,
                        }]);
                    that.inicializeDisabled(0);
                }
                createForms() {
                    var that = this;
                    that.createHeaderForm();
                    that.menuBar([
                        { action: that.actions.actTisk, favorite: true }, //nefunguje, neukážu
                        { action: that.actions.actDetail, favorite: true },
                        { action: that.actions.actSaldo, favorite: true },
                        { action: that.actions.actDoplUdaje, favorite: true }
                    ]);
                    //that.createDataView()
                    that.grid = $.newDiv().appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "full", // fit, full
                        navigationMode: "row", // row, cell                
                        defaultAction: that.actions.actDetail,
                        columns: WebClient.Common.GridFormats.PohledavkyPopl(),
                        profiles: [{
                                name: "radek", _locked: true, _default: true, rowNumbers: true,
                                condFormats: [
                                    { description: "Aktivní", formula: 'EQUALS(@stav, "Aktivní")', text: Gordic.Components.Grid.CondFormats.CondFormatText.red },
                                    { description: "SaldoZero", formula: '@saldo == 0', text: Gordic.Components.Grid.CondFormats.CondFormatText.black },
                                    { description: "SaldoMinus", formula: '@saldo < 0', text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                                    { description: "Ukončený", formula: 'EQUALS(@stav, "Ukončený")', text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                                    { description: "Zrušený", formula: 'EQUALS(@stav, "Zrušený")', text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                ]
                            }]
                    });
                    //inicializace saldových políček na spodku gridu
                    //$.content(".status-widget");
                    var statusWidget = that.grid.find(".status-widget"); // najití počtového okýnka
                    //salda
                    $(statusWidget).before('<div class="status-widget" id="saldo">Saldo: </div>'); //nalepení salda k počtu
                    that.saldoStatusWidget = $("#saldo");
                    that.saldoStatusWidget.append('<b class="g-state-text g-state-active">0</b>');
                    //platby
                    $(that.saldoStatusWidget).before('<div class="status-widget" id="platby">Platby: </div>'); //nalepení platby k saldu
                    that.platbyStatusWidget = $("#platby");
                    that.platbyStatusWidget.append('<b class="g-state-text g-state-active">0</b>');
                    //předpisy
                    $(that.platbyStatusWidget).before('<div class="status-widget" id="predpisy">Předpisy: </div>'); //nalepení předpisů k platbám
                    that.predpisyStatusWidget = $("#predpisy");
                    that.predpisyStatusWidget.append('<b class="g-state-text g-state-active">0</b>');
                }
                //vytvoření akcí - breadcrumbs a menubar
                createActions() {
                    var that = this;
                    //položky menuBaru
                    that.actions.addRange({
                        actPripadyZavritPotomky: {
                            name: "zavritpotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        actDetail: {
                            name: "detail",
                            caption: "Detail",
                            tooltip: "Otevření případu",
                            run: function () {
                                var row = that.grid.ggrid("getSelection")[0];
                                if (row == undefined) {
                                    that.showFlash("Není vybrán žádný záznam!", "error");
                                    return;
                                }
                                var typ_phl = row.typ_phl_txt;
                                const numberRegex = /\d+/; // that regex matches one or more digits
                                if (typ_phl != undefined) {
                                    var match = typ_phl.match(numberRegex);
                                    if (match) {
                                        var extractedNumber = parseInt(match[0], 10);
                                        WebClient.Common.Pripady.openPripadDetail(that, row.ixp, null, extractedNumber.toString());
                                        //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                        //that.navigate('Gordic.Ddp.WebClient.GPripadDetail', { ID: 'DDPGPripadDetail#', Ixp: row.ixp, TypPhl: extractedNumber })
                                    }
                                }
                            }
                        },
                        actSaldo: {
                            name: "saldo",
                            caption: "Saldo",
                            tooltip: "Otevření salda případu",
                            run: function () {
                                var row = that.grid.ggrid("getSelection")[0];
                                if (row == undefined) {
                                    that.showFlash("Není vybrán žádný záznam!", "error");
                                    return;
                                }
                                that.navigate('Gordic.Ddp.WebClient.GSalda', { ID: "DDPGSalda#", Ixp: row.ixp });
                            }
                        },
                        actTisk: {
                            name: "tisk",
                            caption: "Tisk",
                            tooltip: "Tisk dokumentu",
                            icon: "fa-print",
                            run: function () {
                                that.tiskDokladu();
                            }
                        },
                        actDoplUdaje: {
                            name: "doplUdaje",
                            caption: "Doplňující údaje",
                            tooltip: "Otevření doplňujících údajů",
                            run: function () {
                                that.doplUdajeWindow();
                            }
                        },
                    });
                }
                createHeaderForm() {
                    var that = this;
                    var model = that.model;
                    var headerForm = new Gordic.Forms.Form({ name: "ddpFilterPanel" })
                        .addRow("IČO")
                        .addField("gstringbox", {
                        name: "ico",
                        initialValue: model.ExterniSubjekt?.ico,
                        disabled: true
                    })
                        .addRow("RČ")
                        .addField("gstringbox", {
                        name: "rc",
                        initialValue: model.ExterniSubjekt?.rc,
                        disabled: true
                    })
                        .addRow("Externí subjekt")
                        .addField("gstringbox", {
                        name: "esu_txt",
                        initialValue: model.ExterniSubjekt?.esu_txt,
                        disabled: true
                    })
                        .addRow({ label: "Způsob dohledání případů dle" })
                        .addField("gradio", {
                        name: "zp_dohledani",
                        //itemClass: "w-12",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: 'vazeb ESU' },
                            { value: 1, label: 'RČ' },
                            { value: 2, label: 'IČO' },
                        ],
                        change: function (ev, changeObj) {
                            that.inicializeDisabled(changeObj);
                        }
                    })
                        .addRow()
                        .addField("gselectbox", Gordic.Prefabs.Select.zpusobDohledavaniVazeb(), {
                        name: "typ_zvp", //Způsob dohledávání vazeb mezi případy pohledávek
                        model: "model.typ_zvp = value.typ_zvp",
                        initialValue: { typ_zvp: 1 } //nastavení iniciální hodnoty když je prefab
                    })
                        .addRow()
                        .addField("gselectbox", Gordic.Prefabs.Select.vazbaSubPrip(), {
                        name: "subjekt", //Typ vazby mezi subjektem a případem
                        model: "model.subjekt = value.typ_svp",
                        initialValue: { typ_svp: 0 },
                        change: (ev, obj) => {
                            if (obj.value?.typ_svp == 0) {
                                $(ev.currentTarget).findFields("ixs_dva").gfield("disable");
                            }
                            else {
                                $(ev.currentTarget).findFields("ixs_dva").gfield("enable");
                            }
                        }
                    })
                        .addRow()
                        .addField("gselectbox", Gordic.Prefabs.Select.wflsdva(), {
                        name: "ixs_dva",
                        emptyValue: { nazev: "Všechny", ixs_dva: null },
                        model: "model.ixs_dva = value.ixs_dva",
                        disabled: true,
                        renderEmpty: true,
                        serverFilters: {
                            aktivita: "< 1000"
                        },
                        change: (ev, obj) => {
                            if (obj.value?.nazev == "Všechny")
                                $(ev.target).gfield("setValue", { nazev: "Všechny" });
                        }
                    })
                        .addRow({ label: "Stav případů" })
                        .addField("gradio", {
                        name: "stav_pripadu",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: 'Všechny' },
                            { value: 1, label: 'Nezaplacené' },
                            { value: 2, label: 'Přeplatky' },
                        ],
                    })
                        .addRow({ label: "Stav k datu" })
                        .addField("gdatebox", {
                        name: "dat_stav",
                        initialValue: new Date(that.currentDate.getFullYear(), 0, 1)
                    })
                        .addRow({ label: "Saldo k datu" })
                        .addField("gdatebox", {
                        name: "dat_saldo",
                        initialValue: that.currentDate
                    })
                        .addRow({ label: "Stav případů" })
                        .addRow({ label: "Typ zobrazení" })
                        .addField("gradio", {
                        name: "saldo",
                        itemClass: "w-3",
                        initialValue: 0,
                        radios: [
                            { value: 10, label: 'Účetní' },
                            { value: 0, label: 'Splátkové' },
                        ],
                    })
                        .addRow({ label: "Zobrazení případu" }) //layoutDescriptor: "L-3-6-3"
                        .addField("gcheck", "w-3", { name: "aktivni", label: "Aktivní", initialValue: true })
                        .addField("gcheck", "w-3", { name: "ukoncene", label: "Ukončené", initialValue: true })
                        .addField("gcheck", "w-3", { name: "zrusene", label: "Zrušené", initialValue: true })
                        .addField("gcheck", "w-3", { name: "vsechny", label: "Všechny knihy", initialValue: true });
                    that.filter = $.newDiv().appendTo(that.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        favoriteLayoutDescriptor: "L4M3S1",
                        apply: (event, obj) => {
                            that.ziskejData(obj.filter);
                        }
                    });
                }
                //Nastavení radiobuttonů "Způsob dohledání případů dle", pokud je prázdné odpovídající políčko
                //nemůžeme vybrat tento radio button, a změníme jej na jiný
                //vyrobeno takto, jelikož nevím jak deaktivovat jednotlivé radio buttony
                inicializeDisabled(button) {
                    var that = this;
                    if (that.model.ExterniSubjekt?.ico == " " && button.value == 2) {
                        that.filter.findFields("zp_dohledani").gfield("setInitial", 0);
                    }
                    else if (that.model.ExterniSubjekt?.rc == " " && button.value == 1) {
                        that.filter.findFields("zp_dohledani").gfield("setInitial", 0);
                    }
                    else if (that.model.ExterniSubjekt?.esu_txt == " " && (button.value == 0 || button == 0)) {
                        if (that.model.ExterniSubjekt?.rc == " ")
                            that.filter.findFields("zp_dohledani").gfield("setInitial", 0);
                        that.filter.findFields("zp_dohledani").gfield("setInitial", 1);
                    }
                }
                ziskejData(filter) {
                    var that = this;
                    var model = that.model;
                    // údaje případu
                    filter.ixs_esu = model.ExterniSubjekt?.ixs_esu;
                    filter.typ_phl = model.typ_phl;
                    filter.cis_spr = model.cis_spr;
                    if (filter.subjekt == undefined || filter.typ_zvp == undefined) {
                        filter.subjekt = 0;
                        filter.typ_zvp = 1;
                        that.filter.findFields("typ_zvp").gfield("setInitial", { typ_zvp: 1 });
                        that.filter.findFields("subjekt").gfield("setInitial", { typ_svp: 0 });
                    }
                    that.beginOperation({ id: "ziskaniDat", text: "Získávání dat..." });
                    that.isl.PohledavkyPopl.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        //oddělení sald od zbytku, který se vsouvá do gridu
                        if (dto.data.length > 0) {
                            var salda = dto.data.pop();
                        } //vyhodit salda do panelů
                        //smazání položek na základě stavu případu
                        var vycistenaData = that.smazaniPripadu(dto.data);
                        //vložení do gridu
                        that.view = new Gordic.Data.View(vycistenaData);
                        that.grid.ggrid("setData", that.view);
                        that.updateBottomPanel(salda);
                    }).always(() => {
                        //ukončení operace
                        that.endOperation({ id: "ziskaniDat" });
                    });
                }
                //smazání položek na základě stavu případu
                smazaniPripadu(dto) {
                    var that = this;
                    var j = 0;
                    let clean_dto = [];
                    let stav_pripadu = that.filter.findFields("stav_pripadu").gfield("getValue");
                    for (var i = 0; i < dto.length; i++) {
                        var saldo = parseFloat(dto[i].saldo);
                        if (!((stav_pripadu == 1 && saldo <= 0) || (stav_pripadu == 2 && saldo >= 0))) { //Nezaplacené - 1 || //Přeplatky - 2
                            clean_dto[j] = dto[i];
                            j++;
                        }
                    }
                    return clean_dto;
                }
                formatNumberWithSpacesAndDecimals(number) {
                    const formattedNumber = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(number);
                    return formattedNumber.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
                }
                //update sald, etc.
                updateBottomPanel(salda) {
                    var that = this;
                    var itemCount = Object.keys(salda).length;
                    if (itemCount > 0) {
                        //var colorPocatku = salda.saldo! > new Decimal(0) ? "ff0000" : "000000"; // red : black
                        var predpis = that.formatNumberWithSpacesAndDecimals(salda.predpisy);
                        var platby = that.formatNumberWithSpacesAndDecimals(salda.platby);
                        var saldo = that.formatNumberWithSpacesAndDecimals(salda.saldo);
                        that.predpisyStatusWidget.find('b.g-state-text.g-state-active').text(predpis);
                        that.platbyStatusWidget.find('b.g-state-text.g-state-active').text(platby);
                        that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(saldo);
                    }
                    else {
                        that.predpisyStatusWidget.find('b.g-state-text.g-state-active').text(0);
                        that.platbyStatusWidget.find('b.g-state-text.g-state-active').text(0);
                        that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(0);
                    }
                }
                //zobrazí doplňkové údaje
                doplUdajeWindow() {
                    var that = this;
                    var row = that.grid.ggrid("getSelection")[0];
                    var ixp;
                    if (row == undefined) {
                        that.showFlash("Není vybrán žádný záznam!", "error");
                        return;
                    }
                    else {
                        ixp = row.ixp;
                        var windowOption = { title: "Doplňkové údaje", width: 640, height: 360 };
                        var ParamsJSON = { ID: "DDPGDoplUdajePohl#", Ixp: ixp };
                        GDlg.showModalWindow("Gordic.Ddp.WebClient.GDoplUdajePohl", ParamsJSON, windowOption);
                    }
                }
                tiskDokladu() {
                    var that = this;
                    //dostání celého filter panelu
                    var ico = that.filter.findFields("ico").gfield("getValue");
                    var rc = that.filter.findFields("rc").gfield("getValue");
                    //var esu_txt = that.filter.findFields("esu_txt").gfield("getValue"); 
                    var zp_dohledani = that.filter.findFields("zp_dohledani").gfield("getValue");
                    var typ_zvp = that.filter.findFields("typ_zvp").gfield("getValue");
                    var subjekt = that.filter.findFields("subjekt").gfield("getValue");
                    var ixs_dva = that.filter.findFields("ixs_dva").gfield("getValue");
                    //var stav_pripadu = that.filter.findFields("stav_pripadu").gfield("getValue");          
                    var aktivni = that.filter.findFields("aktivni").gfield("getValue");
                    var ukoncene = that.filter.findFields("ukoncene").gfield("getValue");
                    var zrusene = that.filter.findFields("zrusene").gfield("getValue");
                    var vsechny = that.filter.findFields("vsechny").gfield("getValue");
                    typ_zvp = typ_zvp.typ_zvp;
                    subjekt = subjekt.typ_svp;
                    var datum_od = that.filter.findFields("dat_stav").gfield("getValue");
                    var datum_do = that.filter.findFields("dat_saldo").gfield("getValue");
                    var saldo = that.filter.findFields("saldo").gfield("getValue");
                    //pokud prázdné datum, nahradím tímto rokem a dnešním dnem
                    if (datum_od == undefined)
                        datum_od = new Date(that.currentDate.getFullYear(), 0, 1);
                    if (datum_do == undefined)
                        datum_do = that.currentDate;
                    if (that.view != 0) {
                        const actTiskPohlPopl = GAction.createPrintAction({
                            name: "actTiskPohlPopl",
                            tema: "ddp_ptm_pripop",
                            // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                            serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:PohledavkyPopl", //zde se plní téma
                            reportStarting: function (rep) {
                                rep.customDto = {
                                    ixs_esu: that.model.ixs_esu,
                                    datumOd: datum_od,
                                    datumDo: datum_do,
                                    vypocet: saldo,
                                    ixs_fun: that.model.ixs_fun_akt,
                                    ixp_den: that.model.ixp_den,
                                    rok_den: that.RokDen,
                                    cis_spr: that.CisSpr,
                                    typ_phl: that.typ_Pohl.typ_phl,
                                    //celý filter panel
                                    ico: ico,
                                    rc: rc,
                                    zp_dohledani: zp_dohledani,
                                    typ_zvp: typ_zvp,
                                    subjekt: subjekt,
                                    ixs_dva: ixs_dva.ixs_dva,
                                    aktivni: aktivni,
                                    ukoncene: ukoncene,
                                    zrusene: zrusene,
                                    vsechny: vsechny
                                };
                            }
                        });
                        actTiskPohlPopl.run();
                    }
                    else {
                        that.showFlash("Nejsou načtena žádná data", "error");
                    }
                }
            };
            GPohledavkyPopl = __decorate([
                Decorators.gcontent
            ], GPohledavkyPopl);
            WebClient.GPohledavkyPopl = GPohledavkyPopl;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaGxlZGF2a3lQb3BsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BvaGxlZGF2a3lQb3BsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBMmVmO0FBM2VELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJlbkI7SUEzZWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTJlN0I7UUEzZW9CLFdBQUEsU0FBUztZQUUxQixNQUFNO1lBQ04seUpBQXlKO1lBRXpKLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxxQkFBcUI7Z0JBNEJ0RCw2REFBNkQ7Z0JBQzdELG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVELGlEQUFpRDtnQkFDakQsb0JBQW9CLENBQUMsT0FBZ0Q7b0JBQ2pFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2QixDQUFDO2dCQUVELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDO29CQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLDhCQUE4QixDQUFDO29CQUU1QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ2pCLE9BQU8sRUFBRSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7NEJBQ2xELE1BQU0sRUFBRSxJ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bkIsQ0FBQTs0QkFFTCxDQUFDO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzFCLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN6RCxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBcmVZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQXFlM0I7WUFyZVkseUJBQWUsa0JBcWUzQixDQUFBO1FBQ0wsQ0FBQyxFQTNlb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMmU3QjtJQUFELENBQUMsRUEzZWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJlbkI7QUFBRCxDQUFDLEVBM2VTLE1BQU0sS0FBTixNQUFNLFFBMmVmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQb2hsZWRhdmt5UG9wbC50cyAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBvaGxlZMOhdmVrIHBvcGxhdG7DrWthICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMTItMTIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgLy9USVNLXHJcbiAgICAvL3phdm9sYXQgeiBqaW7DqWhvIG3DrXN0YSBwb21vY8OtOiB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1BvaGxlZGF2a3lQb3BsXCIsIHsgSUQ6IFwiRERQR1BvaGxlZGF2a3lQb3BsI1wiLCBpeHBfcG9wOiB0aGF0Lkl4cCwgLCBUeXBQaGw6IFwiLS1cIiB9KTtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BvaGxlZGF2a3lQb3BsIGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50IHtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgICAgXHJcbiAgICAgICAgcHVibGljIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHVibGljIHZpZXc7XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiAgRFRPIHDFmcOtcGFkdVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIERUTyBUeXB1IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICogIEB0eXBlIHtHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHR5cF9Qb2hsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG87XHJcblxyXG4gICAgICAgIC8qKiBSb2sgZGVuIHogZWtvcGFyYW1zICovXHJcbiAgICAgICAgUm9rRGVuOiBudW1iZXI7XHJcbiAgICAgICAgQ2lzU3ByOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vb2vDvW5rYSB2ZSBzcG9ka3UgZ3JpZGR1XHJcbiAgICAgICAgcHJpdmF0ZSBwbGF0YnlTdGF0dXNXaWRnZXQ6IGFueTtcclxuICAgICAgICBwcml2YXRlIHByZWRwaXN5U3RhdHVzV2lkZ2V0OiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBzYWxkb1N0YXR1c1dpZGdldDogYW55O1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnREYXRlOiBEYXRlO1xyXG5cclxuICAgICAgICAvL1Byb2dyYW0gemHEjcOtbsOhIHpkZSwgdnl1xb7DrXbDoW0gcHJvIHZ5dHZvxZllbsOtIHRhYnUgcyBha2PDrSBUSVNLXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVG90byBzZSBuYcSNdGUgZHLFr2jDqSBhIG9uQ29udGVudFJlYWR5IG7DoXNsZWRvdm7Em1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHUG9obGVkYXZreVBvcGxcIjtcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IGBQxZnDrXBhZHkgdmVkZW7DqSBuYSBwb3BsYXRuw61rYWA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvaGxlZMOhdmt5IHBvcGxhdG7DrWthIFwiICsgdGhhdC5tb2RlbC5peHAsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmlwYWR5WmF2cml0UG90b21reSxcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pbmljaWFsaXplRGlzYWJsZWQoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1zKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUhlYWRlckZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2ssIGZhdm9yaXRlOiB0cnVlIH0sIC8vbmVmdW5ndWplLCBuZXVrw6HFvnVcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RTYWxkbywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RG9wbFVkYWplLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LmNyZWF0ZURhdGFWaWV3KClcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5Qb2hsZWRhdmt5UG9wbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLCByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJBa3Rpdm7DrVwiLCBmb3JtdWxhOiAnRVFVQUxTKEBzdGF2LCBcIkFrdGl2bsOtXCIpJywgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiU2FsZG9aZXJvXCIsIGZvcm11bGE6ICdAc2FsZG8gPT0gMCcsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2sgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiU2FsZG9NaW51c1wiLCBmb3JtdWxhOiAnQHNhbGRvIDwgMCcsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJVa29uxI1lbsO9XCIsIGZvcm11bGE6ICdFUVVBTFMoQHN0YXYsIFwiVWtvbsSNZW7DvVwiKScsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucHVycGxlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIlpydcWhZW7DvVwiLCBmb3JtdWxhOiAnRVFVQUxTKEBzdGF2LCBcIlpydcWhZW7DvVwiKScsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuZ3JheSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9pbmljaWFsaXphY2Ugc2FsZG92w71jaCBwb2zDrcSNZWsgbmEgc3BvZGt1IGdyaWR1XHJcbiAgICAgICAgICAgIC8vJC5jb250ZW50KFwiLnN0YXR1cy13aWRnZXRcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhdHVzV2lkZ2V0ID0gdGhhdC5ncmlkLmZpbmQoXCIuc3RhdHVzLXdpZGdldFwiKTsgLy8gbmFqaXTDrSBwb8SNdG92w6lobyBva8O9bmthXHJcbiAgICAgICAgICAgIC8vc2FsZGFcclxuICAgICAgICAgICAgJChzdGF0dXNXaWRnZXQpLmJlZm9yZSgnPGRpdiBjbGFzcz1cInN0YXR1cy13aWRnZXRcIiBpZD1cInNhbGRvXCI+U2FsZG86IDwvZGl2PicpOyAvL25hbGVwZW7DrSBzYWxkYSBrIHBvxI10dVxyXG4gICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0ID0gJChcIiNzYWxkb1wiKVxyXG4gICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0LmFwcGVuZCgnPGIgY2xhc3M9XCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmVcIj4wPC9iPicpXHJcbiAgICAgICAgICAgIC8vcGxhdGJ5XHJcbiAgICAgICAgICAgICQodGhhdC5zYWxkb1N0YXR1c1dpZGdldCkuYmVmb3JlKCc8ZGl2IGNsYXNzPVwic3RhdHVzLXdpZGdldFwiIGlkPVwicGxhdGJ5XCI+UGxhdGJ5OiA8L2Rpdj4nKTsgLy9uYWxlcGVuw60gcGxhdGJ5IGsgc2FsZHVcclxuICAgICAgICAgICAgdGhhdC5wbGF0YnlTdGF0dXNXaWRnZXQgPSAkKFwiI3BsYXRieVwiKVxyXG4gICAgICAgICAgICB0aGF0LnBsYXRieVN0YXR1c1dpZGdldC5hcHBlbmQoJzxiIGNsYXNzPVwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlXCI+MDwvYj4nKVxyXG4gICAgICAgICAgICAvL3DFmWVkcGlzeVxyXG4gICAgICAgICAgICAkKHRoYXQucGxhdGJ5U3RhdHVzV2lkZ2V0KS5iZWZvcmUoJzxkaXYgY2xhc3M9XCJzdGF0dXMtd2lkZ2V0XCIgaWQ9XCJwcmVkcGlzeVwiPlDFmWVkcGlzeTogPC9kaXY+Jyk7IC8vbmFsZXBlbsOtIHDFmWVkcGlzxa8gayBwbGF0YsOhbVxyXG4gICAgICAgICAgICB0aGF0LnByZWRwaXN5U3RhdHVzV2lkZ2V0ID0gJChcIiNwcmVkcGlzeVwiKVxyXG4gICAgICAgICAgICB0aGF0LnByZWRwaXN5U3RhdHVzV2lkZ2V0LmFwcGVuZCgnPGIgY2xhc3M9XCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmVcIj4wPC9iPicpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3Z5dHZvxZllbsOtIGFrY8OtIC0gYnJlYWRjcnVtYnMgYSBtZW51YmFyXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL3BvbG/Fvmt5IG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQcmlwYWR5WmF2cml0UG90b21reToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemF2cml0cG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDogeyAvL290ZXbFmWUgcMWZw61wYWRcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUG9obGVkYXZreVBvcGxEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cF9waGwgPSByb3cudHlwX3BobF90eHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyUmVnZXggPSAvXFxkKy87IC8vIHRoYXQgcmVnZXggbWF0Y2hlcyBvbmUgb3IgbW9yZSBkaWdpdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9waGwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0eXBfcGhsLm1hdGNoKG51bWJlclJlZ2V4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHRyYWN0ZWROdW1iZXIgPSBwYXJzZUludChtYXRjaFswXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhhdCwgcm93Lml4cCwgbnVsbCwgZXh0cmFjdGVkTnVtYmVyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPyBqZSB0YWR5IG51dG7DvSBtw610IHR5cF9waGwgbmEgdnN0dXB1IHBybyBvdGV2xZllbsOtIGRldGFpbHUgcMWZw61wYWR1ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQubmF2aWdhdGUoJ0dvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWREZXRhaWwnLCB7IElEOiAnRERQR1ByaXBhZERldGFpbCMnLCBJeHA6IHJvdy5peHAsIFR5cFBobDogZXh0cmFjdGVkTnVtYmVyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U2FsZG86IHsgLy8gb3RldsWZZSBwxZnDrXBhZFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2FsZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNhbGRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIHNhbGRhIHDFmcOtcGFkdVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQb2hsZWRhdmt5UG9wbER0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZSgnR29yZGljLkRkcC5XZWJDbGllbnQuR1NhbGRhJywgeyBJRDogXCJERFBHU2FsZGEjXCIsIEl4cDogcm93Lml4cCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiB7IC8vb3RldsWZZSBwxZnDrXBhZFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVGlzayBkb2t1bWVudHVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza0Rva2xhZHUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REb3BsVWRhamU6IHsgLy9vdGV2xZllIGRvcGzFiHVqw61jw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb3BsVWRhamVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRvcGzFiHVqw61jw60gw7pkYWplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIGRvcGzFiHVqw61jw61jaCDDumRhasWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZG9wbFVkYWplV2luZG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUhlYWRlckZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhhdC5tb2RlbDtcclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRkcEZpbHRlclBhbmVsXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJxIxPXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbW9kZWwuRXh0ZXJuaVN1Ympla3Q/LmljbyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSxIxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmNcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG1vZGVsLkV4dGVybmlTdWJqZWt0Py5yYyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJFeHRlcm7DrSBzdWJqZWt0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG1vZGVsLkV4dGVybmlTdWJqZWt0Py5lc3VfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlpwxa9zb2IgZG9obGVkw6Fuw60gcMWZw61wYWTFryBkbGVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwX2RvaGxlZGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaXRlbUNsYXNzOiBcInctMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiAndmF6ZWIgRVNVJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ1LEjCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6ICdJxIxPJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikgeyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluaWNpYWxpemVEaXNhYmxlZChjaGFuZ2VPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnpwdXNvYkRvaGxlZGF2YW5pVmF6ZWIoKSwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF96dnBcIiwgLy9acMWvc29iIGRvaGxlZMOhdsOhbsOtIHZhemViIG1lemkgcMWZw61wYWR5IHBvaGxlZMOhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3p2cCA9IHZhbHVlLnR5cF96dnBcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3p2cDogMSB9IC8vbmFzdGF2ZW7DrSBpbmljacOhbG7DrSBob2Rub3R5IGtkecW+IGplIHByZWZhYlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudmF6YmFTdWJQcmlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1Ympla3RcIiwgLy9UeXAgdmF6YnkgbWV6aSBzdWJqZWt0ZW0gYSBwxZnDrXBhZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3ViamVrdCA9IHZhbHVlLnR5cF9zdnBcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3N2cDogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZT8udHlwX3N2cCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJpeHNfZHZhXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJpeHNfZHZhXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbHNkdmEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IHsgbmF6ZXY6IFwiVsWhZWNobnlcIiwgaXhzX2R2YTogbnVsbCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19kdmEgPSB2YWx1ZS5peHNfZHZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyRW1wdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogXCI8IDEwMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlPy5uYXpldiA9PSBcIlbFoWVjaG55XCIpICQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IG5hemV2OiBcIlbFoWVjaG55XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlN0YXYgcMWZw61wYWTFr1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9wcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogJ1bFoWVjaG55JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ05lemFwbGFjZW7DqScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6ICdQxZllcGxhdGt5JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiU3RhdiBrIGRhdHVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3N0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKHRoYXQuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiU2FsZG8gayBkYXR1XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zYWxkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5jdXJyZW50RGF0ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJTdGF2IHDFmcOtcGFkxa9cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCB6b2JyYXplbsOtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYWxkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTNcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEwLCBsYWJlbDogJ8OaxI1ldG7DrScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICdTcGzDoXRrb3bDqScgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiWm9icmF6ZW7DrSBwxZnDrXBhZHVcIiB9KSAvL2xheW91dERlc2NyaXB0b3I6IFwiTC0zLTYtM1wiXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcImFrdGl2bmlcIiwgbGFiZWw6IFwiQWt0aXZuw61cIiwgaW5pdGlhbFZhbHVlOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcInVrb25jZW5lXCIsIGxhYmVsOiBcIlVrb27EjWVuw6lcIiwgaW5pdGlhbFZhbHVlOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcInpydXNlbmVcIiwgbGFiZWw6IFwiWnJ1xaFlbsOpXCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0zXCIsIHsgbmFtZTogXCJ2c2VjaG55XCIsIGxhYmVsOiBcIlbFoWVjaG55IGtuaWh5XCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVyID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLlxyXG4gICAgICAgICAgICAgICAgZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW2hlYWRlckZvcm1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9OYXN0YXZlbsOtIHJhZGlvYnV0dG9uxa8gXCJacMWvc29iIGRvaGxlZMOhbsOtIHDFmcOtcGFkxa8gZGxlXCIsIHBva3VkIGplIHByw6F6ZG7DqSBvZHBvdsOtZGFqw61jw60gcG9sw63EjWtvXHJcbiAgICAgICAgLy9uZW3Fr8W+ZW1lIHZ5YnJhdCB0ZW50byByYWRpbyBidXR0b24sIGEgem3Em27DrW1lIGplaiBuYSBqaW7DvVxyXG4gICAgICAgIC8vdnlyb2Jlbm8gdGFrdG8sIGplbGlrb8W+IG5ldsOtbSBqYWsgZGVha3Rpdm92YXQgamVkbm90bGl2w6kgcmFkaW8gYnV0dG9ueVxyXG4gICAgICAgIHByaXZhdGUgaW5pY2lhbGl6ZURpc2FibGVkKGJ1dHRvbjogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuRXh0ZXJuaVN1Ympla3Q/LmljbyA9PSBcIiBcIiAmJiBidXR0b24udmFsdWUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInpwX2RvaGxlZGFuaVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIDApXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5tb2RlbC5FeHRlcm5pU3ViamVrdD8ucmMgPT0gXCIgXCIgJiYgYnV0dG9uLnZhbHVlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ6cF9kb2hsZWRhbmlcIikuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCAwKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQubW9kZWwuRXh0ZXJuaVN1Ympla3Q/LmVzdV90eHQgPT0gXCIgXCIgJiYgKGJ1dHRvbi52YWx1ZSA9PSAwIHx8IGJ1dHRvbiA9PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuRXh0ZXJuaVN1Ympla3Q/LnJjID09IFwiIFwiKSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwienBfZG9obGVkYW5pXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgMClcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ6cF9kb2hsZWRhbmlcIikuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoZmlsdGVyOiBhbnkpOiB2b2lkIHsgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB0aGF0Lm1vZGVsO1xyXG4gICAgICAgICAgICAvLyDDumRhamUgcMWZw61wYWR1XHJcbiAgICAgICAgICAgIGZpbHRlci5peHNfZXN1ID0gbW9kZWwuRXh0ZXJuaVN1Ympla3Q/Lml4c19lc3U7XHJcbiAgICAgICAgICAgIGZpbHRlci50eXBfcGhsID0gbW9kZWwudHlwX3BobDtcclxuICAgICAgICAgICAgZmlsdGVyLmNpc19zcHIgPSBtb2RlbC5jaXNfc3ByO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbHRlci5zdWJqZWt0ID09IHVuZGVmaW5lZCB8fCBmaWx0ZXIudHlwX3p2cCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5zdWJqZWt0ID0gMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci50eXBfenZwID0gMTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ0eXBfenZwXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgeyB0eXBfenZwOiAxIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInN1Ympla3RcIikuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCB7IHR5cF9zdnA6IDAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInppc2thbmlEYXRcIiwgdGV4dDogXCJaw61za8OhdsOhbsOtIGRhdC4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5Qb2hsZWRhdmt5UG9wbC5saXN0XHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb2RkxJtsZW7DrSBzYWxkIG9kIHpieXRrdSwga3RlcsO9IHNlIHZzb3V2w6EgZG8gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHRvLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2FsZGEgPSBkdG8uZGF0YS5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IC8vdnlob2RpdCBzYWxkYSBkbyBwYW5lbMWvXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vc21hesOhbsOtIHBvbG/FvmVrIG5hIHrDoWtsYWTEmyBzdGF2dSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdnljaXN0ZW5hRGF0YSA9IHRoYXQuc21hemFuaVByaXBhZHUoZHRvLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy92bG/FvmVuw60gZG8gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh2eWNpc3RlbmFEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVCb3R0b21QYW5lbChzYWxkYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Vrb27EjWVuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiemlza2FuaURhdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc21hesOhbsOtIHBvbG/FvmVrIG5hIHrDoWtsYWTEmyBzdGF2dSBwxZnDrXBhZHVcclxuICAgICAgICBwcml2YXRlIHNtYXphbmlQcmlwYWR1KGR0bzogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGogPSAwXHJcbiAgICAgICAgICAgIGxldCBjbGVhbl9kdG86IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIGxldCBzdGF2X3ByaXBhZHUgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwic3Rhdl9wcmlwYWR1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdG8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzYWxkbyA9IHBhcnNlRmxvYXQoZHRvW2ldLnNhbGRvKTtcclxuICAgICAgICAgICAgICAgIGlmICghKChzdGF2X3ByaXBhZHUgPT0gMSAmJiBzYWxkbyA8PSAwKSB8fCAoc3Rhdl9wcmlwYWR1ID09IDIgJiYgc2FsZG8gPj0gMCkpKSB7IC8vTmV6YXBsYWNlbsOpIC0gMSB8fCAvL1DFmWVwbGF0a3kgLSAyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5fZHRvW2pdID0gZHRvW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2xlYW5fZHRvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHMobnVtYmVyOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWROdW1iZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xyXG4gICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICB9KS5mb3JtYXQobnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWROdW1iZXIucmVwbGFjZSgvLC9nLCAnJykucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJyAnKS5yZXBsYWNlKCcuJywgJywnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdXBkYXRlIHNhbGQsIGV0Yy5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUJvdHRvbVBhbmVsKHNhbGRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUNvdW50ID0gT2JqZWN0LmtleXMoc2FsZGEpLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKGl0ZW1Db3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGNvbG9yUG9jYXRrdSA9IHNhbGRhLnNhbGRvISA+IG5ldyBEZWNpbWFsKDApID8gXCJmZjAwMDBcIiA6IFwiMDAwMDAwXCI7IC8vIHJlZCA6IGJsYWNrXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZHBpcyA9IHRoYXQuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHNhbGRhLnByZWRwaXN5KTtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF0YnkgPSB0aGF0LmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyhzYWxkYS5wbGF0YnkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNhbGRvID0gdGhhdC5mb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHMoc2FsZGEuc2FsZG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQucHJlZHBpc3lTdGF0dXNXaWRnZXQuZmluZCgnYi5nLXN0YXRlLXRleHQuZy1zdGF0ZS1hY3RpdmUnKS50ZXh0KHByZWRwaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF0YnlTdGF0dXNXaWRnZXQuZmluZCgnYi5nLXN0YXRlLXRleHQuZy1zdGF0ZS1hY3RpdmUnKS50ZXh0KHBsYXRieSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dChzYWxkbyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcmVkcGlzeVN0YXR1c1dpZGdldC5maW5kKCdiLmctc3RhdGUtdGV4dC5nLXN0YXRlLWFjdGl2ZScpLnRleHQoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXRieVN0YXR1c1dpZGdldC5maW5kKCdiLmctc3RhdGUtdGV4dC5nLXN0YXRlLWFjdGl2ZScpLnRleHQoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3pvYnJhesOtIGRvcGzFiGtvdsOpIMO6ZGFqZVxyXG4gICAgICAgIHByaXZhdGUgZG9wbFVkYWplV2luZG93KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQb2hsZWRhdmt5UG9wbER0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgIHZhciBpeHA6IGFueTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gesOhem5hbSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl4cCA9IHJvdy5peHA7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIkRvcGzFiGtvdsOpIMO6ZGFqZVwiLCB3aWR0aDogNjQwLCBoZWlnaHQ6IDM2MCB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIFBhcmFtc0pTT04gPSB7IElEOiBcIkREUEdEb3BsVWRhamVQb2hsI1wiLCBJeHA6IGl4cCB9O1xyXG4gICAgICAgICAgICAgICAgR0RsZy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRG9wbFVkYWplUG9obFwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrRG9rbGFkdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9kb3N0w6Fuw60gY2Vsw6lobyBmaWx0ZXIgcGFuZWx1XHJcbiAgICAgICAgICAgIHZhciBpY28gPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwiaWNvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgdmFyIHJjID0gdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInJjXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgLy92YXIgZXN1X3R4dCA9IHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJlc3VfdHh0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgdmFyIHpwX2RvaGxlZGFuaSA9IHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ6cF9kb2hsZWRhbmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICB2YXIgdHlwX3p2cCA9IHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ0eXBfenZwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgdmFyIHN1Ympla3QgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwic3ViamVrdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIHZhciBpeHNfZHZhID0gdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcIml4c19kdmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICAvL3ZhciBzdGF2X3ByaXBhZHUgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwic3Rhdl9wcmlwYWR1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGFrdGl2bmkgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwiYWt0aXZuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHVrb25jZW5lID0gdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInVrb25jZW5lXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgdmFyIHpydXNlbmUgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwienJ1c2VuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIHZhciB2c2VjaG55ID0gdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInZzZWNobnlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7IFxyXG5cclxuICAgICAgICAgICAgdHlwX3p2cCA9IHR5cF96dnAudHlwX3p2cFxyXG4gICAgICAgICAgICBzdWJqZWt0ID0gc3ViamVrdC50eXBfc3ZwXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0dW1fb2QgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwiZGF0X3N0YXZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXR1bV9kbyA9IHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJkYXRfc2FsZG9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBzYWxkbyA9IHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJzYWxkb1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vcG9rdWQgcHLDoXpkbsOpIGRhdHVtLCBuYWhyYWTDrW0gdMOtbXRvIHJva2VtIGEgZG5lxaFuw61tIGRuZW1cclxuICAgICAgICAgICAgaWYgKGRhdHVtX29kID09IHVuZGVmaW5lZCkgZGF0dW1fb2QgPSBuZXcgRGF0ZSh0aGF0LmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0dW1fZG8gPT0gdW5kZWZpbmVkKSBkYXR1bV9kbyA9IHRoYXQuY3VycmVudERhdGVcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhhdC52aWV3ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdFRpc2tQb2hsUG9wbCA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1BvaGxQb3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJkZHBfcHRtX3ByaXBvcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOKGkyBNZXRvZGEsIGt0ZXLDoSBqZSB6YXZvbMOhbmEgdMSbc27EmyBwxZllZCBnZW5lcm92w6Fuw61tIHNlc3RhdnkgYSBrZGUgbHplIG5hIHN0cmFuxJsgc2VydmVydSBvdmxpdm5pdCBwYXJhbWV0cnkgc2VzdGF2eSDihpNcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6UG9obGVkYXZreVBvcGxcIiwgIC8vemRlIHNlIHBsbsOtIHTDqW1hXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgICAvL3Bvc8OtbMOhbsOtIGRhdCBuYSBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IHRoYXQubW9kZWwuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtT2Q6IGRhdHVtX29kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW1EbzogZGF0dW1fZG8sICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnlwb2NldDogc2FsZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuOiB0aGF0Lm1vZGVsLml4c19mdW5fYWt0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5tb2RlbC5peHBfZGVuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva19kZW46IHRoYXQuUm9rRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzX3NwcjogdGhhdC5DaXNTcHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGF0LnR5cF9Qb2hsLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NlbMO9IGZpbHRlciBwYW5lbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBpY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYzogcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6cF9kb2hsZWRhbmk6IHpwX2RvaGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF96dnA6IHR5cF96dnAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWt0OiBzdWJqZWt0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2R2YTogaXhzX2R2YS5peHNfZHZhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZuaTogYWt0aXZuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVrb25jZW5lOiB1a29uY2VuZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpydXNlbmU6IHpydXNlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c2VjaG55OiB2c2VjaG55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrUG9obFBvcGwucnVuKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lanNvdSBuYcSNdGVuYSDFvsOhZG7DoSBkYXRhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19