"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Leg;
    (function (Leg) {
        var WebClient;
        (function (WebClient) {
            let tabGroupNames;
            (function (tabGroupNames) {
                tabGroupNames["tabGroupZakladni"] = "tabGroupZakladni";
                tabGroupNames["tabGroupUdaje"] = "tabGroupUdaje";
            })(tabGroupNames || (tabGroupNames = {}));
            var gcontent = Decorators.gcontent;
            let GDetailOvereni = class GDetailOvereni extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    this.VyberEsu_DuvodHledaniTxt = 'zadaniucastnikarizeni';
                }
                onContentReady() {
                    console.log("onContentReady");
                    var that = this;
                    this.Rezim = this.rezimDetailu;
                    Gordic.ResizeManager.forceRefresh(this.element.get(0));
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
                    //that.setRezim(that.Rezim, that);
                    that.onContentReadyBase(that);
                    Gordic.ResizeManager.forceRefresh(this.element.get(0));
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    var l_aoTabGroups = []; // pouzit pole, aby se dalo pridavat
                    l_aoTabGroups.push({ id: tabGroupNames.tabGroupZakladni, caption: "jres:25500127" }); //RC 25500127 : Základní informace
                    l_aoTabGroups.push({ id: tabGroupNames.tabGroupUdaje, caption: "jres:25500128" }); //RC 25500128 : Údaje o osobách a poplatcích
                    // Vytvoreni tabu
                    var l_aoTabParams = []; // pouzit pole, aby se dalo pridavat
                    // pridani polozek do tabu
                    l_aoTabParams.push({
                        group: { id: tabGroupNames.tabGroupZakladni },
                        init: function (tab) {
                            var formZakladni = that.createZakladni();
                            tab.gform("createFrom", formZakladni);
                        }
                    });
                    l_aoTabParams.push({
                        tabParams: {
                            visible: that.rezimDetailu != 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */,
                            opened: true, locked: true, group: { id: tabGroupNames.tabGroupUdaje }
                        },
                        contentParams: GContent.createInitializer(Gordic.Leg.WebClient.OsobyLegControl(that)), //, this.ixs_vid , this.IxsVid
                        init: function (tab) {
                            that.tabGroupUdaje = tab;
                        }
                    });
                    l_aoTabParams.push({
                        group: { id: tabGroupNames.tabGroupUdaje },
                        init: function (tab) {
                            var formCreateUdaje = that.createUdaje();
                            tab.gform("createFrom", formCreateUdaje);
                        }
                    });
                    var l_aoActions = [];
                    l_aoActions.push(new GAction({
                        name: "actStitky",
                        caption: "jres:25500123", //RC 25500123 : Štítky
                        tooltip: "jres:25500124", //RC 25500124 : Tímto vytisknete štítky
                        icon: "gi-print",
                        run: function () {
                            //var data = that.grid.ggrid("getSelection");
                            //kontrola zda vybrane overeni ma žadatele
                            that.call("TiskStitkuStart", { model: that.model }).done(function (ev) {
                                if (ev == "") {
                                    that.dialogs.alert("Informace", "jres:25500213"); //RC 25500213 : Není zadán žadatel u ověření.
                                }
                                else {
                                    that.navigate(["Gordic.Leg.WebClient.GDetailTiskStitku"], { ixsVid: ev, typVid: that.model.typ_vid });
                                }
                            });
                        }
                    }));
                    l_aoActions.push(new GAction({
                        name: "actOdstranit",
                        caption: "jres:25500148", //RC 25500148 : Odstranit záznam
                        icon: "fa-times-circle",
                        run: function () {
                            let currentContent = $.content(this);
                            currentContent.dialogs.confirm("jres:25500145", "jres:25500146").on("yes", function () {
                                currentContent.call("Delete", { detailDto: that.model })
                                    .done(function () {
                                    that.dialogs.messageBox("jres:25500140", "jres:25500144", [GDlg.mbbOk], GDlg.mbiInfo) //RC 25500144 : Záznam byl odstraněn
                                        .on("close", function () {
                                        // navrat na seznam
                                        that.close();
                                    });
                                });
                            });
                        }
                    }));
                    var detailOvereniComponent = {
                        headerForm: this.createForm(),
                        tabGroups: l_aoTabGroups,
                        tabs: l_aoTabParams,
                        actions: l_aoActions,
                        menuBar: [{ id: "stitky", action: "actStitky", favorite: true },
                            { id: "odstranit", action: "actOdstranit", favorite: true }]
                    };
                    // odstranit vlastni obsluhu gtabmanageropen, aby se nezvetsoval pocet reloadData GSubListControl
                    this.element.off("gtabmanageropen.GDetailOvereni");
                    builder.withComponent("GDetailOvereni", detailOvereniComponent, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    var that = this;
                    if (that.rezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */) {
                        that.listControls_setup({
                            rowToDto: function (gridState) {
                                var gTabManager = that.find(".gtabmanager");
                                var active;
                                if (gTabManager != null && gTabManager != undefined)
                                    active = gTabManager.gtabmanager("getActive");
                                return { Rezim: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */, IxsVid: gridState.currentRow.data.ixs_vid, TypVid: gridState.currentRow.data.typ_vid, selectedTabGroup: active };
                            },
                            nextItemTemplate: "jres:25500138", //RC 25500138 : Následující záznam       
                            prevItemTemplate: "jres:25500139" //RC 25500139 : Předchozí záznam          
                            //< br > PID: { ixp_spis }
                            //< br > PID: { ixp_spis }
                        });
                    }
                    ;
                    this.beforeNew = function () {
                        var def = $.Deferred();
                        Gordic.Leg.Dialogs.VyberOvereni(that).done(function (rv, cont) {
                            if (rv) {
                                that.TypVidNew = rv.typ_vid;
                                def.resolve();
                            }
                            else
                                def.reject;
                        }).fail(function () { def.reject; });
                        return def;
                    };
                    this.afterLoadData = function () {
                        var prom = $.Deferred();
                        this.element.on("gtabmanageropen.GDetailOvereni", function (ev, ctx) {
                            console.log("gtabmanageropen.GDetailOvereni");
                            tabChange(ctx.id);
                        });
                        return prom.resolve().promise();
                    };
                    // funkce pri prepinani mezi taby
                    var tabChange = function (idTabGroup) {
                        console.log("tabChange", idTabGroup);
                        switch (idTabGroup) {
                            case tabGroupNames.tabGroupZakladni:
                                that.afterLoadDataForTab(that.tabGroupZakladni);
                                break;
                            case tabGroupNames.tabGroupUdaje:
                                that.afterLoadDataForTab(that.tabGroupUdaje);
                                break;
                        }
                    };
                    //this.model = that.model;
                    this.enableFields = function (enable) {
                        that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                        //that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace));
                    };
                    this.enableActions = function (enable) {
                        that.actions["actOdstranit"]?.enabled(this.Rezim != (2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */ || 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */));
                    };
                }
                ;
                // po načtení dat
                afterLoadDataForTab(tabControl) {
                    var that = this;
                    if (tabControl) {
                        const tabCnt = $.content(tabControl);
                        if (tabCnt != null && typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                            tabCnt.reloadData().done(function () {
                                //if (tabControl == that.ukonyTab && that.identifikatorUkonu != undefined && that.identifikatorUkonu != null) {
                                //    tabCnt.grid.ggrid("activeRow", that.identifikatorUkonu);
                                //    that.identifikatorUkonu = undefined;
                                //}
                            });
                        }
                    }
                }
                // hlavicka
                createForm() {
                    var that = this;
                    var filterFun;
                    console.log("createFormHlavickaDetail");
                    // pokud znam knhu - nastavim omezeni pro pracovnika
                    console.log("omezeni pracovnika", that.model.ixp_dmd);
                    if (that.model.ixp_dmd != '') {
                        that.call("NastavFunDleknihy", { ixsDmd: that.model.ixp_dmd }).done(function (ev) {
                            filterFun = ev;
                        });
                    }
                    // pro pripad listovani v seznamu
                    console.log("novy typ", that.TypVidNew);
                    if (that.model.typ_vid == null || undefined) {
                        that.model.typ_vid = that.TypVidNew;
                    }
                    var readOnly = that.rezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                    var readOnlyBook = (that.rezimDetailu == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */ || that.rezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */); // nefunguje
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S2, L-2-10-0, M-2-10-0, S-12-12-0", opened: true })
                        .addSection()
                        .addRow("jres:25500033") //RC 25500033 : Kniha
                        .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robsdmd(), {
                        model: "model.ixp_dmd=value.ixp_dmd", name: "ixp_dmd", disabled: readOnlyBook,
                        serverFilters: { ktg_den: [140], aktivita: [100], ixs_fun: [that.model.ixs_fun], s_uzavreno: 0 }, // kniha nesmi byt uzavrena , s_uzavreno: 1
                        validators: [new Gordic.Validators.Required()],
                        change: function (ev, changeObj) {
                            var rok = that.findFields("rok");
                            var cisloZap = that.findFields("por_cislo");
                            var porDo = that.findFields("por_cislo_do");
                            if (changeObj.value != null) {
                                that.findFields("ixs_fun").gfield("setValue", changeObj.value.ixp_dmd);
                                rok.gfield("setValue", changeObj.value.rok);
                                that.call("NastavPodleKnihy", { ixpDmd: changeObj.value.ixp_dmd }).done(function (ev) {
                                    cisloZap.gfield("setValue", ev);
                                    porDo.gfield("setValue", ev);
                                });
                                //aktualne vybrany fun
                                that.call("NastavFunDleknihy", { ixsDmd: changeObj.value.ixp_dmd }).done(function (ev) {
                                    filterFun = ev;
                                    //that.findFields("ixs_fun").gfield("option", "serverFilters", $.extend({
                                    //    ixs_fun: function () { return ev; }
                                    //}));  
                                });
                            }
                        }
                    })
                        .addRow("jres:25500034") //RC 25500034 : Typ ověření
                        .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robcvid(), { model: "model.typ_vid=value.typ_vid", name: "typ_vid_txt", disabled: true, dropdown: true, validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25500035") //RC 25500035 : Zapsáno v
                        .addField("gstringbox", "w-10", { name: "misto_overeni", disabled: readOnly, model: "misto_overeni", validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25500036") // spisový uzel/funkce/referent //RC 25500036 : Pracovník
                        .addField("gselectbox", "w-10", Gordic.Gin.Fields.ginsfunSSU({
                        validators: [new Gordic.Validators.Required(), {
                                validate: (value) => {
                                    if (value.ixs_fun == null || value.ixs_fun == undefined) {
                                        return false;
                                    }
                                    else {
                                        return true;
                                    }
                                },
                                message: "jres:25500259" //RC 25500259 : Pracovník musí být vyplněn
                            }],
                        disabled: readOnly, //this.model.vyrizeno,
                        name: "ixs_fun",
                        model: "model.ixs_fun = value.ixs_fun, model.IxsRef = value.ixs_ref",
                        itemTemplate: function (output) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100],
                            ixs_fun: function () {
                                return filterFun;
                            }
                        },
                        flag: "required",
                        strict: true
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                        .addSection()
                        .addRow("jres:25500037") //RC 25500037 : Číslo zápisu
                        .addField("gstringbox", "w-4", { name: "por_cislo", disabled: readOnly, validators: [new Gordic.Validators.Required()] }) // kniha
                        .addRow("jres:25500131") //RC 25500131 : Počet, do
                        .addField("gnumberbox", "w-2", {
                        name: "cislo_zapisu",
                        disabled: readOnly,
                        validators: [new Gordic.Validators.Required()],
                        change: function (ev, changeObj) {
                            if (changeObj.value != null && changeObj.value != undefined) {
                                let porCislo = Number(that.findFields("por_cislo").gfield("getValue"));
                                let zapCislo = Number(changeObj.value);
                                let vysledek = porCislo + zapCislo - 1;
                                that.findFields("por_cislo_do").gfield("setValue", vysledek);
                            }
                        }
                    })
                        .addField("gnumberbox", "w-2", { name: "por_cislo_do", disabled: true })
                        .addRow("jres:25500039") //RC 25500039 : Dne
                        .addField("gdatebox", "w-4", { name: "dat_zapisu", disabled: readOnly, validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25500040") //RC 25500040 : Ročník
                        .addField("gstringbox", "w-4", { name: "rok", disabled: true });
                    return form;
                }
                ;
                // Udaje o osobach a poplatcich
                createUdaje() {
                    var that = this;
                    console.log("createUdajeDetail");
                    var readOnly = that.rezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                    //that.selectedTabGroup = tabGroupNames.tabGroupUdaje;
                    var form = new Gordic.Forms.Form();
                    form.addSection("jres:25500020") //RC 25500020 : Údaje o uhrazeném poplatku
                        .addRow("jres:25500021") //RC 25500021 : Částka (Kč)
                        .addField("gnumberbox", "w-2", { name: "c_popl", disabled: readOnly })
                        //.addText("Kč")
                        .addRow("jres:25500022") //RC 25500022 : Doklad číslo
                        .addField("gstringbox", "w-4", { name: "ac_popl", disabled: readOnly })
                        .addRow("jres:25500149") //RC 25500149 : Stav dokladu
                        .addField("gstringbox", "w-4", { name: "stavDokladu", disabled: readOnly })
                        .addRow("jres:25500023") //RC 25500023 : Ze dne
                        .addField("gdatebox", "w-4", { name: "dat_popl", disabled: readOnly })
                        .addRow("jres:25500024") //RC 25500024 : Další informace k poplatku
                        .addField("gstringbox", { name: "poznamka", rows: 5, disabled: readOnly });
                    return form;
                }
                // Základní informace
                createZakladni() {
                    var that = this;
                    console.log("Základní informaceDetail");
                    var readOnly = that.rezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                    var form = new Gordic.Forms.Form();
                    //legalizace
                    if (this.model.typ_vid == 2) {
                        form.addSection("jres:25500130") //RC 25500130 : Legalizace
                            .addRow("jres:25500043") //RC 25500043 : Označení druhu listiny, na které je podpis legalizován
                            .addField("gstringbox", { name: "popis", disabled: readOnly, rows: 10 })
                            .addField("gradio", {
                            name: "leg_listina", disabled: readOnly, //customClass: "enabled",
                            initialValue: '0',
                            radios: [
                                { value: '0', label: 'jres:25500178' }, //RC 25500178 : Podpis na listině byl uznán za vlastní
                                { value: '1', label: 'jres:25500010' }, //RC 25500010 : Listina byla vlastnoručně podepsána
                                { value: '2', label: 'jres:25500253' } //RC 25500253 : Elektronický podpis na elektronickém dokumentu byl uznán za vlastní
                            ]
                        });
                    }
                    //vidimace
                    else { //if (this.model.typ_vid == 2) {
                        form.addSection("jres:25500042") //RC 25500042 : Vidimace
                            .addRow("jres:25500041") //RC 25500041 : Označení listiny, která je vidimována
                            .addField("gstringbox", { name: "popis", disabled: readOnly, rows: 10 })
                            .addField("gradio", {
                            name: "vid_upl_cast", disabled: readOnly,
                            initialValue: '0',
                            radios: [
                                { value: '0', label: 'jres:25500011' }, //RC 25500011 : úplný(á)
                                { value: '1', label: 'jres:25500012' }, //RC 25500012 : částečný(á)
                            ]
                        })
                            .addField("gradio", {
                            name: "vid_opis_kopie", disabled: readOnly,
                            initialValue: '0',
                            radios: [
                                { value: '0', label: 'jres:25500013' }, //RC 25500013 : opis
                                { value: '1', label: 'jres:25500014' }, //RC 25500014 : kopie
                            ]
                        })
                            .addRow("jres:25500028") //RC 25500028 : Počet stran vidimovaného dokumentu
                            .addField("gnumberbox", "w-2", { name: "valid_dok_str", disabled: readOnly })
                            .addRow("jres:25500029") //RC 25500029 : Strany vydimovaného dokumentu
                            .addField("gstringbox", "w-2", { name: "vid_strany", disabled: readOnly })
                            .addSection("jres:25500030") //RC 25500030 : Originální listina předložena k vidimaci je
                            .addField("gradio", {
                            name: "valid_org", disabled: readOnly,
                            initialValue: '10',
                            radios: [
                                { value: '10', label: 'jres:25500015' }, //RC 25500015 : prvopisem
                                { value: '20', label: 'jres:25500016' }, //RC 25500016 : ověřeno vidimovanou listinou
                                { value: '30', label: 'jres:25500017' }, //RC 25500017 : listinou, která je výstupem z autorizované konverze dokumentů
                                { value: '40', label: 'jres:25500018' }, //RC 25500018 : opisem nebo kopií pořízenou ze spisu
                                { value: '50', label: 'jres:25500254' } //RC 25500254 : stejnopisem písemného vyhotovení rozhodnutí nebo výroku rozhodnutí
                            ]
                        })
                            .addSection()
                            .addRow("jres:25500031") //RC 25500031 : Obsahuje viditelný zajišťovací prvek
                            .addField("gcheck", {
                            name: "s_zajist_prvek", disabled: readOnly, modelValueTransform: {
                                apply: function (obj) {
                                    return obj != 0;
                                }
                            }
                        })
                            .addRow("jres:25500032") //RC 25500032 : počet stran originálu
                            .addField("gnumberbox", "w-2", { name: "valid_org_str", disabled: readOnly });
                    }
                    return form;
                }
            };
            GDetailOvereni = __decorate([
                gcontent
            ], GDetailOvereni);
            WebClient.GDetailOvereni = GDetailOvereni;
        })(WebClient = Leg.WebClient || (Leg.WebClient = {}));
    })(Leg = Gordic.Leg || (Gordic.Leg = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE92ZXJlbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsT3ZlcmVuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBK2JmO0FBL2JELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStibkI7SUEvYmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQStiN0I7UUEvYm9CLFdBQUEsU0FBUztZQUUxQixJQUFLLGFBR0o7WUFIRCxXQUFLLGFBQWE7Z0JBQ2Qsc0RBQW9DLENBQUE7Z0JBQ3BDLGdEQUErQixDQUFBO1lBQ25DLENBQUMsRUFISSxhQUFhLEtBQWIsYUFBYSxRQUdqQjtZQUVELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEscUJBSWlGO2dCQUpySDs7b0JBb0JJLDZCQUF3QixHQUFHLHVCQUF1QixDQUFDO2dCQWlhdkQsQ0FBQztnQkEvWkcsY0FBYztvQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQzlCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUUvQixPQUFBLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQztvQkFFakQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFDLDJDQUEyQztvQkFDM0gsa0NBQWtDO29CQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTlCLE9BQUEsYUFBYSxD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QUFFLEVBQUUsNkVBQTZFO2dDQUN0SCxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUFFLG9EQUFvRDtnQ0FDN0YsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxrRkFBa0Y7NkJBQzdIO3lCQUNKLENBQUM7NkJBRUQsVUFBVSxFQUFFOzZCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxvREFBb0Q7NkJBQzVFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7NEJBQ2hCLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO2dDQUM3RCxLQUFLLEVBQUUsVUFBVSxHQUFHO29DQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0NBQ3BCLENBQUM7NkJBQ0o7eUJBQ0osQ0FBQzs2QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMscUNBQXFDOzZCQUM3RCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7b0JBQ3JGLENBQUM7b0JBRUQsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFFSixDQUFBO1lBcmJZLGNBQWM7Z0JBRDFCLFFBQVE7ZUFDSSxjQUFjLENBcWIxQjtZQXJiWSx3QkFBYyxpQkFxYjFCLENBQUE7UUFDTCxDQUFDLEVBL2JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErYjdCO0lBQUQsQ0FBQyxFQS9iZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK2JuQjtBQUFELENBQUMsRUEvYlMsTUFBTSxLQUFOLE1BQU0sUUErYmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkxlZy5XZWJDbGllbnQge1xyXG5cclxuICAgIGVudW0gdGFiR3JvdXBOYW1lcyB7XHJcbiAgICAgICAgdGFiR3JvdXBaYWtsYWRuaT0gXCJ0YWJHcm91cFpha2xhZG5pXCIsXHJcbiAgICAgICAgdGFiR3JvdXBVZGFqZSA9IFwidGFiR3JvdXBVZGFqZVwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsT3ZlcmVuaSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDwvL0dvcmRpYy5MZWcuRGlhbG9ncy5Vc2VkQ29tcG9uZW50c05ldz5cclxuICAgICAgICBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zICZcclxuICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zPj4gJlxyXG4gICAgICAgIEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuR0xpc3RDb250cm9sc0V4dGVuc2lvbnM8R29yZGljLkxlZy5XZWJDbGllbnQuR1JvYnN2aWREdG8+ICZcclxuICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdMaXN0Q29udHJvbHNFeHRlbnNpb25zPEdvcmRpYy5MZWcuV2ViQ2xpZW50LkdSb2JzdmlkRHRvPj4+PlxyXG4gICAgICAgIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0YWJHcm91cFVkYWplOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdGFiR3JvdXBaYWtsYWRuaTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgSXhzVmlkOiBzdHJpbmc7XHJcbiAgICAgICAgVHlwVmlkTmV3OiBzdHJpbmc7XHJcbiAgICAgICAgSXhzRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgcmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBtb2RlbDogYW55O1xyXG4gICAgICAgIGl4cDogYW55O1xyXG5cclxuICAgICAgICB0YWJHcm91cFRlc3Q6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIFZ5YmVyRXN1X0R1dm9kSGxlZGFuaVR4dCA9ICd6YWRhbml1Y2FzdG5pa2FyaXplbmknO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHsgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25Db250ZW50UmVhZHlcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUmV6aW0gPSB0aGlzLnJlemltRGV0YWlsdTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNpemVNYW5hZ2VyLmZvcmNlUmVmcmVzaCh0aGlzLmVsZW1lbnQuZ2V0KDApISk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pIC8vIHByb2pkZSB2xaFlY2huYSBwb2xlIGEgbmFwbG7DrSBqZSB6IG1vZGVsdVxyXG4gICAgICAgICAgICAvL3RoYXQuc2V0UmV6aW0odGhhdC5SZXppbSwgdGhhdCk7XHJcbiAgICAgICAgICAgIHRoYXQub25Db250ZW50UmVhZHlCYXNlKHRoYXQpO1xyXG5cclxuICAgICAgICAgICAgUmVzaXplTWFuYWdlci5mb3JjZVJlZnJlc2godGhpcy5lbGVtZW50LmdldCgwKSEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGxfYW9UYWJHcm91cHM6IElHVGFiR3JvdXBPcHRpb25zW10gPSBbXTsgICAgLy8gcG91eml0IHBvbGUsIGFieSBzZSBkYWxvIHByaWRhdmF0XHJcbiAgICAgICAgICAgIGxfYW9UYWJHcm91cHMucHVzaCh7IGlkOiB0YWJHcm91cE5hbWVzLnRhYkdyb3VwWmFrbGFkbmksIGNhcHRpb246IFwianJlczoyNTUwMDEyN1wiIH0pIC8vUkMgMjU1MDAxMjcgOiBaw6FrbGFkbsOtIGluZm9ybWFjZVxyXG4gICAgICAgICAgICBsX2FvVGFiR3JvdXBzLnB1c2goeyBpZDogdGFiR3JvdXBOYW1lcy50YWJHcm91cFVkYWplLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAxMjhcIiB9KTsgLy9SQyAyNTUwMDEyOCA6IMOaZGFqZSBvIG9zb2LDoWNoIGEgcG9wbGF0Y8OtY2hcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3JlbmkgdGFidVxyXG4gICAgICAgICAgICB2YXIgbF9hb1RhYlBhcmFtczogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLlRhYlBhcmFtc1tdID0gW107ICAgIC8vIHBvdXppdCBwb2xlLCBhYnkgc2UgZGFsbyBwcmlkYXZhdFxyXG4gICAgICAgICAgICAvLyBwcmlkYW5pIHBvbG96ZWsgZG8gdGFidVxyXG4gICAgICAgICAgICBsX2FvVGFiUGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IHRhYkdyb3VwTmFtZXMudGFiR3JvdXBaYWtsYWRuaSB9LFxyXG4gICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtWmFrbGFkbmkgPSB0aGF0LmNyZWF0ZVpha2xhZG5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtWmFrbGFkbmkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbF9hb1RhYlBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQucmV6aW1EZXRhaWx1ICE9IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5OZXcsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLCBncm91cDogeyBpZDogdGFiR3JvdXBOYW1lcy50YWJHcm91cFVkYWplIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50UGFyYW1zOiBHQ29udGVudC5jcmVhdGVJbml0aWFsaXplcihHb3JkaWMuTGVnLldlYkNsaWVudC5Pc29ieUxlZ0NvbnRyb2wodGhhdCkpLCAvLywgdGhpcy5peHNfdmlkICwgdGhpcy5JeHNWaWRcclxuICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRhYkdyb3VwVWRhamUgPSB0YWI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsX2FvVGFiUGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IHRhYkdyb3VwTmFtZXMudGFiR3JvdXBVZGFqZSB9LFxyXG4gICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtQ3JlYXRlVWRhamUgPSB0aGF0LmNyZWF0ZVVkYWplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtQ3JlYXRlVWRhamUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdmFyIGxfYW9BY3Rpb25zOiBHQWN0aW9uW10gPSBbXTtcclxuICAgICAgICAgICAgbF9hb0FjdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFN0aXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDEyM1wiLCAvL1JDIDI1NTAwMTIzIDogxaB0w610a3lcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjU1MDAxMjRcIiwgLy9SQyAyNTUwMDEyNCA6IFTDrW10byB2eXRpc2tuZXRlIMWhdMOtdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjpcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGRhdGEgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgemRhIHZ5YnJhbmUgb3ZlcmVuaSBtYSDFvmFkYXRlbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiVGlza1N0aXRrdVN0YXJ0XCIsIHsgbW9kZWw6IHRoYXQubW9kZWwgfSkuZG9uZShmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldiA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiSW5mb3JtYWNlXCIsIFwianJlczoyNTUwMDIxM1wiKTsgLy9SQyAyNTUwMDIxMyA6IE5lbsOtIHphZMOhbiDFvmFkYXRlbCB1IG92xJvFmWVuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5MZWcuV2ViQ2xpZW50LkdEZXRhaWxUaXNrU3RpdGt1XCJdLCB7IGl4c1ZpZDogZXYsIHR5cFZpZDogdGhhdC5tb2RlbC50eXBfdmlkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBsX2FvQWN0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2RzdHJhbml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTQ4XCIsIC8vUkMgMjU1MDAxNDggOiBPZHN0cmFuaXQgesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXMtY2lyY2xlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2w+KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNTUwMDE0NVwiLCBcImpyZXM6MjU1MDAxNDZcIikub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkgeyAvL1JDIDI1NTAwMTQ2IDogWsOhem5hbSBidWRlIHRydmFsZSBvZHN0cmFuxJtuIHogZGF0YWLDoXplLiBPcHJhdmR1IGNoY2V0ZSBwb2tyYcSNb3ZhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LmNhbGwoXCJEZWxldGVcIiwgeyBkZXRhaWxEdG86IHRoYXQubW9kZWwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTUwMDE0MFwiLCBcImpyZXM6MjU1MDAxNDRcIiwgW0dEbGcubWJiT2tdLCBHRGxnLm1iaUluZm8pIC8vUkMgMjU1MDAxNDQgOiBaw6F6bmFtIGJ5bCBvZHN0cmFuxJtuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmF2cmF0IG5hIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICB2YXIgZGV0YWlsT3ZlcmVuaUNvbXBvbmVudDogR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJDb21wb25lbnQ8dGhpcz4gPVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJGb3JtOiB0aGlzLmNyZWF0ZUZvcm0oKSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogbF9hb1RhYkdyb3VwcyxcclxuICAgICAgICAgICAgICAgIHRhYnM6IGxfYW9UYWJQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBsX2FvQWN0aW9ucyxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFt7IGlkOiBcInN0aXRreVwiLCBhY3Rpb246IFwiYWN0U3RpdGt5XCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIm9kc3RyYW5pdFwiLCBhY3Rpb246IFwiYWN0T2RzdHJhbml0XCIsIGZhdm9yaXRlOiB0cnVlIH1dXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW5pdCB2bGFzdG5pIG9ic2x1aHUgZ3RhYm1hbmFnZXJvcGVuLCBhYnkgc2UgbmV6dmV0c292YWwgcG9jZXQgcmVsb2FkRGF0YSBHU3ViTGlzdENvbnRyb2xcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9mZihcImd0YWJtYW5hZ2Vyb3Blbi5HRGV0YWlsT3ZlcmVuaVwiKTtcclxuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcIkdEZXRhaWxPdmVyZW5pXCIsIGRldGFpbE92ZXJlbmlDb21wb25lbnQsIHRydWUpXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnJlemltRGV0YWlsdSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5saXN0Q29udHJvbHNfc2V0dXAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnVGFiTWFuYWdlciA9IHRoYXQuZmluZChcIi5ndGFibWFuYWdlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdUYWJNYW5hZ2VyICE9IG51bGwgJiYgZ1RhYk1hbmFnZXIgIT0gdW5kZWZpbmVkKSBhY3RpdmUgPSBnVGFiTWFuYWdlci5ndGFibWFuYWdlcihcImdldEFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgUmV6aW06IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3LCBJeHNWaWQ6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaXhzX3ZpZCwgVHlwVmlkOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLnR5cF92aWQsIHNlbGVjdGVkVGFiR3JvdXA6IGFjdGl2ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW1UZW1wbGF0ZTogXCJqcmVzOjI1NTAwMTM4XCIsIC8vUkMgMjU1MDAxMzggOiBOw6FzbGVkdWrDrWPDrSB6w6F6bmFtICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtVGVtcGxhdGU6IFwianJlczoyNTUwMDEzOVwiIC8vUkMgMjU1MDAxMzkgOiBQxZllZGNob3rDrSB6w6F6bmFtICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vPCBiciA+IFBJRDogeyBpeHBfc3BpcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy88IGJyID4gUElEOiB7IGl4cF9zcGlzIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWZvcmVOZXcgPSBmdW5jdGlvbiAoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLkxlZy5EaWFsb2dzLlZ5YmVyT3ZlcmVuaSh0aGF0KS5kb25lKGZ1bmN0aW9uIChydiwgY29udCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChydikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlR5cFZpZE5ldyA9IHJ2LnR5cF92aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGRlZi5yZWplY3Q7XHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHsgZGVmLnJlamVjdDsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hZnRlckxvYWREYXRhID0gZnVuY3Rpb24gKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByb20gPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oXCJndGFibWFuYWdlcm9wZW4uR0RldGFpbE92ZXJlbmlcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImd0YWJtYW5hZ2Vyb3Blbi5HRGV0YWlsT3ZlcmVuaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWJDaGFuZ2UoY3R4LmlkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9tLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGZ1bmtjZSBwcmkgcHJlcGluYW5pIG1lemkgdGFieVxyXG4gICAgICAgICAgICB2YXIgdGFiQ2hhbmdlID0gZnVuY3Rpb24gKGlkVGFiR3JvdXA6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWJDaGFuZ2VcIiwgaWRUYWJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlkVGFiR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRhYkdyb3VwTmFtZXMudGFiR3JvdXBaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hZnRlckxvYWREYXRhRm9yVGFiKHRoYXQudGFiR3JvdXBaYWtsYWRuaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0YWJHcm91cE5hbWVzLnRhYkdyb3VwVWRhamU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWZ0ZXJMb2FkRGF0YUZvclRhYih0aGF0LnRhYkdyb3VwVWRhamUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMubW9kZWwgPSB0aGF0Lm1vZGVsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZHMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgLy8gc25pemkgcG9jZXQgdm9sYW5pIGZpbmRGaWVsZHMsIG5hc3RhdmkgY2Vsb3UgY3VzdG9tQ2xhc3MgXCJlbmFibGVkXCIgbmFqZWRub3VcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlIHx8ICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5FZGl0YWNlKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9uc1tcImFjdE9kc3RyYW5pdFwiXT8uZW5hYmxlZCh0aGlzLlJlemltICE9IChHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuTmV3IHx8IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5FZGl0YWNlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gcG8gbmHEjXRlbsOtIGRhdFxyXG4gICAgICAgIGFmdGVyTG9hZERhdGFGb3JUYWIodGFiQ29udHJvbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0YWJDb250cm9sKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDbnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGFiQ29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiQ250ICE9IG51bGwgJiYgdHlwZW9mICh0YWJDbnQucmVsb2FkRGF0YSkgPT09IFwiZnVuY3Rpb25cIiAmJiAhdGFiQ250LmxvYWRlZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJDbnQucmVsb2FkRGF0YSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0YWJDb250cm9sID09IHRoYXQudWtvbnlUYWIgJiYgdGhhdC5pZGVudGlmaWthdG9yVWtvbnUgIT0gdW5kZWZpbmVkICYmIHRoYXQuaWRlbnRpZmlrYXRvclVrb251ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGFiQ250LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdGhhdC5pZGVudGlmaWthdG9yVWtvbnUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmlkZW50aWZpa2F0b3JVa29udSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGhsYXZpY2thXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZpbHRlckZ1bjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtSGxhdmlja2FEZXRhaWxcIik7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIHpuYW0ga25odSAtIG5hc3RhdmltIG9tZXplbmkgcHJvIHByYWNvdm5pa2FcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbWV6ZW5pIHByYWNvdm5pa2FcIiwgdGhhdC5tb2RlbC5peHBfZG1kKVxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5peHBfZG1kICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJOYXN0YXZGdW5EbGVrbmloeVwiLCB7IGl4c0RtZDogdGhhdC5tb2RlbC5peHBfZG1kIH0pLmRvbmUoZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRnVuID0gZXY7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBybyBwcmlwYWQgbGlzdG92YW5pIHYgc2V6bmFtdVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdnkgdHlwXCIsIHRoYXQuVHlwVmlkTmV3KTtcclxuICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwudHlwX3ZpZCA9PSBudWxsIHx8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tb2RlbC50eXBfdmlkID0gdGhhdC5UeXBWaWROZXc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZWFkT25seSA9IHRoYXQucmV6aW1EZXRhaWx1ID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3O1xyXG4gICAgICAgICAgICB2YXIgcmVhZE9ubHlCb29rID0gKHRoYXQucmV6aW1EZXRhaWx1ID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5FZGl0YWNlIHx8IHRoYXQucmV6aW1EZXRhaWx1ID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3KTsgLy8gbmVmdW5ndWplXHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMyLCBMLTItMTAtMCwgTS0yLTEwLTAsIFMtMTItMTItMFwiLCBvcGVuZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDMzXCIpIC8vUkMgMjU1MDAwMzMgOiBLbmloYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvYnNkbWQoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kbWQ9dmFsdWUuaXhwX2RtZFwiLCBuYW1lOiBcIml4cF9kbWRcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5Qm9vayxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGt0Z19kZW46IFsxNDBdLCBha3Rpdml0YTogWzEwMF0sIGl4c19mdW46IFt0aGF0Lm1vZGVsLml4c19mdW5dLCBzX3V6YXZyZW5vOiAwIH0sIC8vIGtuaWhhIG5lc21pIGJ5dCB1emF2cmVuYSAsIHNfdXphdnJlbm86IDFcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvayA9IHRoYXQuZmluZEZpZWxkcyhcInJva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNpc2xvWmFwID0gdGhhdC5maW5kRmllbGRzKFwicG9yX2Npc2xvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9yRG8gPSB0aGF0LmZpbmRGaWVsZHMoXCJwb3JfY2lzbG9fZG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhzX2Z1blwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjaGFuZ2VPYmoudmFsdWUuaXhwX2RtZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2suZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY2hhbmdlT2JqLnZhbHVlLnJvayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJOYXN0YXZQb2RsZUtuaWh5XCIsIHsgaXhwRG1kOiBjaGFuZ2VPYmoudmFsdWUuaXhwX2RtZCB9KS5kb25lKGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvWmFwLmdmaWVsZChcInNldFZhbHVlXCIsIGV2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvckRvLmdmaWVsZChcInNldFZhbHVlXCIsIGV2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWt0dWFsbmUgdnlicmFueSBmdW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIk5hc3RhdkZ1bkRsZWtuaWh5XCIsIHsgaXhzRG1kOiBjaGFuZ2VPYmoudmFsdWUuaXhwX2RtZCB9KS5kb25lKGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckZ1biA9IGV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwiaXhzX2Z1blwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpeHNfZnVuOiBmdW5jdGlvbiAoKSB7IHJldHVybiBldjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAzNFwiKSAvL1JDIDI1NTAwMDM0IDogVHlwIG92xJvFmWVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEwXCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yb2JjdmlkKCksIHsgbW9kZWw6IFwibW9kZWwudHlwX3ZpZD12YWx1ZS50eXBfdmlkXCIsIG5hbWU6IFwidHlwX3ZpZF90eHRcIiwgZGlzYWJsZWQ6IHRydWUsIGRyb3Bkb3duOiB0cnVlLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAzNVwiKSAvL1JDIDI1NTAwMDM1IDogWmFwc8Ohbm8gdlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTBcIiwgeyBuYW1lOiBcIm1pc3RvX292ZXJlbmlcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCBtb2RlbDogXCJtaXN0b19vdmVyZW5pXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDM2XCIpIC8vIHNwaXNvdsO9IHV6ZWwvZnVua2NlL3JlZmVyZW50IC8vUkMgMjU1MDAwMzYgOiBQcmFjb3Zuw61rXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMFwiLCBHb3JkaWMuR2luLkZpZWxkcy5naW5zZnVuU1NVKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLml4c19mdW4gPT0gbnVsbCB8fCB2YWx1ZS5peHNfZnVuID09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MjU1MDAyNTlcIiAvL1JDIDI1NTAwMjU5IDogUHJhY292bsOtayBtdXPDrSBiw710IHZ5cGxuxJtuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogcmVhZE9ubHksIC8vdGhpcy5tb2RlbC52eXJpemVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuID0gdmFsdWUuaXhzX2Z1biwgbW9kZWwuSXhzUmVmID0gdmFsdWUuaXhzX3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGZ1bmN0aW9uIChvdXRwdXQ6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8ZGl2IGNsYXNzPSdnaSBnaS11c2VyIG1pY3JvZm90byc+PC9kaXY+PGI+XCIgKyBvdXRwdXQubmF6ZXZfcmYgKyBcIjwvYj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBbMTAwXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyRnVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ2hvdmFuaVN0cmVkaXNrYURsZVVjZWx1Lk5FVVJDRU5PKSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDM3XCIpIC8vUkMgMjU1MDAwMzcgOiDEjMOtc2xvIHrDoXBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInBvcl9jaXNsb1wiLCBkaXNhYmxlZDogcmVhZE9ubHksIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSkgLy8ga25paGFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTMxXCIpIC8vUkMgMjU1MDAxMzEgOiBQb8SNZXQsIGRvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvX3phcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiByZWFkT25seSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSAhPSBudWxsICYmIGNoYW5nZU9iai52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3JDaXNsbyA9IE51bWJlcih0aGF0LmZpbmRGaWVsZHMoXCJwb3JfY2lzbG9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHphcENpc2xvID0gTnVtYmVyKGNoYW5nZU9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdnlzbGVkZWsgPSBwb3JDaXNsbyArIHphcENpc2xvIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInBvcl9jaXNsb19kb1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2eXNsZWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMlwiLCB7IG5hbWU6IFwicG9yX2Npc2xvX2RvXCIsIGRpc2FibGVkOiB0cnVlIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMzlcIikgLy9SQyAyNTUwMDAzOSA6IERuZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcImRhdF96YXBpc3VcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDA0MFwiKSAvL1JDIDI1NTAwMDQwIDogUm/EjW7DrWtcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFVkYWplIG8gb3NvYmFjaCBhIHBvcGxhdGNpY2hcclxuICAgICAgICBjcmVhdGVVZGFqZSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVVZGFqZURldGFpbFwiKVxyXG4gICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSB0aGF0LnJlemltRGV0YWlsdSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldztcclxuICAgICAgICAgICAgLy90aGF0LnNlbGVjdGVkVGFiR3JvdXAgPSB0YWJHcm91cE5hbWVzLnRhYkdyb3VwVWRhamU7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpO1xyXG4gICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oXCJqcmVzOjI1NTAwMDIwXCIpIC8vUkMgMjU1MDAwMjAgOiDDmmRhamUgbyB1aHJhemVuw6ltIHBvcGxhdGt1XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAyMVwiKSAvL1JDIDI1NTAwMDIxIDogxIzDoXN0a2EgKEvEjSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwgeyBuYW1lOiBcImNfcG9wbFwiLCBkaXNhYmxlZDogcmVhZE9ubHkgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHQoXCJLxI1cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDIyXCIpIC8vUkMgMjU1MDAwMjIgOiBEb2tsYWQgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7IG5hbWU6IFwiYWNfcG9wbFwiLCBkaXNhYmxlZDogcmVhZE9ubHkgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTQ5XCIpIC8vUkMgMjU1MDAxNDkgOiBTdGF2IGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInN0YXZEb2tsYWR1XCIsIGRpc2FibGVkOiByZWFkT25seSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMjNcIikgLy9SQyAyNTUwMDAyMyA6IFplIGRuZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcImRhdF9wb3BsXCIsIGRpc2FibGVkOiByZWFkT25seSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMjRcIikgLy9SQyAyNTUwMDAyNCA6IERhbMWhw60gaW5mb3JtYWNlIGsgcG9wbGF0a3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvem5hbWthXCIsIHJvd3M6IDUsIGRpc2FibGVkOiByZWFkT25seSB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBaw6FrbGFkbsOtIGluZm9ybWFjZVxyXG4gICAgICAgIGNyZWF0ZVpha2xhZG5pKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlrDoWtsYWRuw60gaW5mb3JtYWNlRGV0YWlsXCIpIFxyXG4gICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSB0aGF0LnJlemltRGV0YWlsdSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgLy9sZWdhbGl6YWNlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLnR5cF92aWQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwianJlczoyNTUwMDEzMFwiKSAvL1JDIDI1NTAwMTMwIDogTGVnYWxpemFjZVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDQzXCIpIC8vUkMgMjU1MDAwNDMgOiBPem5hxI1lbsOtIGRydWh1IGxpc3RpbnksIG5hIGt0ZXLDqSBqZSBwb2RwaXMgbGVnYWxpem92w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCByb3dzOiAxMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGVnX2xpc3RpbmFcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCAvL2N1c3RvbUNsYXNzOiBcImVuYWJsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzAnLCBsYWJlbDogJ2pyZXM6MjU1MDAxNzgnIH0sICAvL1JDIDI1NTAwMTc4IDogUG9kcGlzIG5hIGxpc3RpbsSbIGJ5bCB1em7DoW4gemEgdmxhc3Ruw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdqcmVzOjI1NTAwMDEwJyB9LCAgLy9SQyAyNTUwMDAxMCA6IExpc3RpbmEgYnlsYSB2bGFzdG5vcnXEjW7EmyBwb2RlcHPDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMicsIGxhYmVsOiAnanJlczoyNTUwMDI1MycgfSAgIC8vUkMgMjU1MDAyNTMgOiBFbGVrdHJvbmlja8O9IHBvZHBpcyBuYSBlbGVrdHJvbmlja8OpbSBkb2t1bWVudHUgYnlsIHV6bsOhbiB6YSB2bGFzdG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3ZpZGltYWNlXHJcbiAgICAgICAgICAgIGVsc2UgeyAvL2lmICh0aGlzLm1vZGVsLnR5cF92aWQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwianJlczoyNTUwMDA0MlwiKSAgLy9SQyAyNTUwMDA0MiA6IFZpZGltYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwNDFcIikgLy9SQyAyNTUwMDA0MSA6IE96bmHEjWVuw60gbGlzdGlueSwga3RlcsOhIGplIHZpZGltb3bDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCByb3dzOiAxMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmlkX3VwbF9jYXN0XCIsIGRpc2FibGVkOiByZWFkT25seSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzAnLCBsYWJlbDogJ2pyZXM6MjU1MDAwMTEnIH0sIC8vUkMgMjU1MDAwMTEgOiDDunBsbsO9KMOhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzEnLCBsYWJlbDogJ2pyZXM6MjU1MDAwMTInIH0sIC8vUkMgMjU1MDAwMTIgOiDEjcOhc3RlxI1uw70ow6EpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmlkX29waXNfa29waWVcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMCcsIGxhYmVsOiAnanJlczoyNTUwMDAxMycgfSwgLy9SQyAyNTUwMDAxMyA6IG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdqcmVzOjI1NTAwMDE0JyB9LCAvL1JDIDI1NTAwMDE0IDoga29waWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMjhcIikgLy9SQyAyNTUwMDAyOCA6IFBvxI1ldCBzdHJhbiB2aWRpbW92YW7DqWhvIGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwgeyBuYW1lOiBcInZhbGlkX2Rva19zdHJcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMjlcIikgLy9SQyAyNTUwMDAyOSA6IFN0cmFueSB2eWRpbW92YW7DqWhvIGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTJcIiwgeyBuYW1lOiBcInZpZF9zdHJhbnlcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5IH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNTUwMDAzMFwiKSAvL1JDIDI1NTAwMDMwIDogT3JpZ2luw6FsbsOtIGxpc3RpbmEgcMWZZWRsb8W+ZW5hIGsgdmlkaW1hY2kgamVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkX29yZ1wiLCBkaXNhYmxlZDogcmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogJzEwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMTAnLCBsYWJlbDogJ2pyZXM6MjU1MDAwMTUnIH0sIC8vUkMgMjU1MDAwMTUgOiBwcnZvcGlzZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcyMCcsIGxhYmVsOiAnanJlczoyNTUwMDAxNicgfSwgLy9SQyAyNTUwMDAxNiA6IG92xJvFmWVubyB2aWRpbW92YW5vdSBsaXN0aW5vdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzMwJywgbGFiZWw6ICdqcmVzOjI1NTAwMDE3JyB9LCAvL1JDIDI1NTAwMDE3IDogbGlzdGlub3UsIGt0ZXLDoSBqZSB2w71zdHVwZW0geiBhdXRvcml6b3ZhbsOpIGtvbnZlcnplIGRva3VtZW50xa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICc0MCcsIGxhYmVsOiAnanJlczoyNTUwMDAxOCcgfSwgLy9SQyAyNTUwMDAxOCA6IG9waXNlbSBuZWJvIGtvcGnDrSBwb8WZw616ZW5vdSB6ZSBzcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzUwJywgbGFiZWw6ICdqcmVzOjI1NTAwMjU0JyB9IC8vUkMgMjU1MDAyNTQgOiBzdGVqbm9waXNlbSBww61zZW1uw6lobyB2eWhvdG92ZW7DrSByb3pob2RudXTDrSBuZWJvIHbDvXJva3Ugcm96aG9kbnV0w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDAzMVwiKSAvL1JDIDI1NTAwMDMxIDogT2JzYWh1amUgdmlkaXRlbG7DvSB6YWppxaHFpW92YWPDrSBwcnZla1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic196YWppc3RfcHJ2ZWtcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5LCBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmogIT0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMzJcIikgLy9SQyAyNTUwMDAzMiA6IHBvxI1ldCBzdHJhbiBvcmlnaW7DoWx1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMlwiLCB7IG5hbWU6IFwidmFsaWRfb3JnX3N0clwiLCBkaXNhYmxlZDogcmVhZE9ubHkgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==