"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlRozaaat.ts                         </Name>
//    <Description> Content pro výběr čísla akce                                </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-20                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /** Content pro výběr čísla akce */
            let GSmlRozaaat = class GSmlRozaaat extends Gordic.GContentBase {
                prepareContent(options) {
                    this.beginOperation({ id: "smlrozaaatstart" });
                    this.serverFilters = this.serverFilters || options.serverFilters;
                    this.smlpid = this.smlpid || options.smlpid;
                    this.multiSelect = this.multiSelect ?? options.multiSelect ?? false;
                    this.gridAutoload = this.gridAutoload ?? options.gridAutoload ?? false;
                    this.is_plan = true;
                    this.showTitle = this.showTitle ?? options?.showTitle ?? true;
                    // create
                    this.isl.Rozaaat.loadPomocnePromenne({ ixp: this.smlpid.ixp }).get().done((pom) => {
                        this.pom = pom;
                        var title = "jres:33600400"; //RC 33600400 : Rozpočtové krytí položky plánu
                        if (this.smlpid.typ_ag_blok == 510 /* Interface.TypBlokacniAgendy.ng_typagblokEVZ */ || this.smlpid.typ_ag_blok == 580 /* Interface.TypBlokacniAgendy.ng_typagblokVFP */
                            || this.smlpid.typ_ag_blok == 620 /* Interface.TypBlokacniAgendy.ng_typagblokEPO */ || this.smlpid.typ_ag_blok == 520 /* Interface.TypBlokacniAgendy.ng_typagblokRZA */) {
                            //smlouva váže na VZ
                            title = "jres:33600401".format(this.smlpid.pripad?.ac_ver_zak ?? ""); //RC 33600401 : Položky blokační agendy {0}
                        }
                        else if (pom.l_modedokObjSml) {
                            title = "jres:33600402".format(this.smlpid.ac_sml_nad ?? ""); //RC 33600402 : Položky smlouvy {0}
                        }
                        this.title = (this.showTitle) ? title : this.title;
                        this.createActions();
                        this.createFilterPanel();
                        this.createSubtasks();
                        this.createGrid();
                        this.createCommandBar();
                        this.presetGridServerFilter();
                    }).always(() => {
                        this.endOperation({ id: "smlrozaaatstart" });
                    });
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actLoadPlanProstredky: {
                            name: "actLoadPlanProstredky",
                            caption: "jres:33600403", //RC 33600403 : Plánované prostředky
                            run: (ev, ctx) => {
                                const prev_is_plan = this.is_plan;
                                this.is_plan = true;
                                this.presetGridServerFilter(this.is_plan != prev_is_plan);
                                this.$filterPanel.gfilterpanel("applyFilter");
                            }
                        },
                        actLoadNeplanProstredky: {
                            name: "actLoadNeplanProstredky",
                            caption: "jres:33600404", //RC 33600404 : Neplánované prostředky
                            run: (ev, ctx) => {
                                const prev_is_plan = this.is_plan;
                                this.is_plan = false;
                                this.presetGridServerFilter(this.is_plan != prev_is_plan);
                                this.$filterPanel.gfilterpanel("applyFilter");
                            }
                        },
                        actVybrat: {
                            name: "actVybrat",
                            caption: "jres:33600405", //RC 33600405 : Vybrat
                            run: (ev, ctx) => {
                                if (this.multiSelect) {
                                    let rows = this.$grid.ggrid("getSelection");
                                    this.tryClose(rows ?? void 0);
                                }
                                else {
                                    let row = this.$grid.ggrid("activeRow");
                                    this.tryClose(row ?? void 0);
                                }
                            }
                        },
                        actZavrit: {
                            name: "actZavrit",
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        },
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actVybrat!", "actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel() {
                    const that = this;
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [this.createFilterForm()],
                        //filterViewMode: FilterViewMode.Normal,
                        favorites: ["no_zero", "ixp_roz", "ixs_uka"],
                        apply: (ev, o) => {
                            this.presetGridServerFilter();
                        },
                        //filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        poVyhledaniZobrazit: "OblibenePodminky",
                        autoLoadAfter: (this.gridAutoload) ? ["CreatePanel"] : [],
                    });
                }
                createFilterForm() {
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:33600406", name: "filterForm" }); //RC 33600406 : Obecné
                    //pouze v případě čerpání z rozpočtu
                    if (!(this.pom.l_modedokBndBlk || this.pom.l_modedokObjSml)) {
                        form.addRow("jres:33600407") //RC 33600407 : Rozpočtováno je různé od nuly
                            .addField("gcheck", {
                            name: "no_zero"
                        })
                            .addRow("jres:33600408") //RC 33600408 : Identifikátor rozpočtového dokladu
                            .addField("gstringbox", {
                            name: "ixp_roz"
                        });
                        //přístup k položkám plánu omezen ukazatelem
                        if (!this.pom.l_modedokObjSml && (this.pom.sml_typ_ackppla == 1 || this.pom.sml_typ_ackppla == 3)) {
                            form.addRow("jres:33600409") //RC 33600409 : Ukazatel kompetenta
                                .addField("gselectbox", Gordic.Prefabs.Select.vyberUkazatele(), {
                                name: "ixs_uka",
                                flag: "required",
                                model: "model.ixs_uka=value.ixs_uka",
                                serverFilters: {
                                    ixs_fun: this.pom.ixs_fun_vyriz
                                },
                                validators: [new Gordic.Validators.Required()]
                            });
                        }
                    }
                    return form;
                }
                /** Vytvoření subtasku s Plánovanými prostředky a Neplánovanými prostředky */
                createSubtasks() {
                    var params = [{ action: this.actions.actLoadPlanProstredky }];
                    //řízení přístupu k záložkám (pouze při výběru z plánu)
                    if (!this.pom.l_modedokBndBlk && !this.pom.l_modedokObjSml) {
                        params.push({ action: this.actions.actLoadNeplanProstredky });
                    }
                    this.$subtasks = $.newDiv().appendTo(this.element).gsubtasks({
                        activeItem: 0,
                        params: params
                    });
                }
                /**
                 * Vytvoření Isl View pro grid
                 * @returns
                 */
                createListView() {
                    return new Gordic.Isl.View(this.isl.Rozaaat.list().use((req, next, ctx) => {
                        return this.getFilterData(this, req, next);
                    }), {
                        filterPanel: this.$filterPanel,
                        startEmpty: true,
                    });
                }
                /** Vytvoření gridu pro výběr prostředků */
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridRozaaat",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        multi: this.multiSelect,
                        data: this.createListView(),
                        defaultAction: this.actions.actVybrat,
                        defaultProfile: {
                            //sort: "ixp,rok,cislo",
                            condFormats: this.createCondFormats(),
                        },
                    }).ggridserverfilter({})
                        .gautofit({ resizersOnTab: false });
                }
                /** Vytvoření gridformátu pro grid s prostředky*/
                createGridFormat() {
                    //pokud není vybrán bankovní účet vyžaduji zadání SU RR a AU RR
                    const ueaRequired = (this.serverFilters.bu_vl ?? "").trim().length < 1;
                    var gf = new Gordic.Data.GridFormat();
                    gf.addIconColumn({
                        name: "navazanost",
                        caption: "jres:33600489", //RC 33600489 : P 
                        description: "jres:33600490", //RC 33600490 : Použito
                        iconTemplate: (row, meta, cellInfo) => {
                            //TODO až se David s Honzou dohodnou
                            switch (row.navazanost) {
                                case 3 /* Interface.NavazanostAkce.navazanDokladAPripad */:
                                    return { icon: "gi-paper", text: "jres:33600491" }; //RC 33600491 : Použito na dokladu a případu
                                case 1 /* Interface.NavazanostAkce.navazanDoklad */:
                                    return { icon: "gi-navazany_zaznam g-state-text g-state-info", text: "jres:33600492" }; //RC 33600492 : Použito na dokladu
                                case 2 /* Interface.NavazanostAkce.navazanPripad */:
                                    return { icon: "gi-navazany_zaznam g-state-text g-state-important", text: "jres:33600493" }; //RC 33600493 : Použito na případu
                            }
                        }
                    }).addNumberColumn({
                        name: "rok",
                        caption: "jres:33600410", //RC 33600410 : Rok
                        width: 55
                    }).addTextColumn({
                        name: "cislo",
                        caption: (this.pom.typ_inst == 10 /* Interface.TypInstalace.ng_tyiAcr */) ? "jres:33600377" : "jres:33600378", //RC 33600378 : Číslo akce
                        width: 150,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "cislo"
                        })
                    }).addNks({
                        serverFilter: Gordic.Eko.Filters.nksInterval({
                            ico: this.pom.ico,
                            aktProhl: 100,
                            model: "nks", //cesta k promenne v DTO (v tomto pripade je nks)
                            caption: Gordic.Consts.DbShortcuts.nks ?? "jres:33600411", //RC 33600411 : NS
                            onlyActive: false //pouze aktivni
                        })
                    }).addTextColumn({
                        name: "uea",
                        caption: "jres:33600495", //RC 33600495 : SU RR
                        width: 70,
                        serverFilter: {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "uea", caption: "jres:33600495" }), {
                                //dialogOptions: options.dialogOptions,
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600495") //RC 33600495 : SU RR
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekovabu(), {
                                    name: "uea1",
                                    model: "model.start=value.uea;model.rok=value.rok;model.ico=value.ico;model.ucs=value.ucs;model.uea_uc=value.uea_uc;model.ueb_uc=value.ueb_uc;model.ueb<=value.ueb",
                                    itemTemplate: "{uea:trim:encode}",
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    customClass: "js-inter-first",
                                    change: (ev, ctx) => {
                                        var $depField = $(document.body).findFields("uea2");
                                        const val = ctx.value ?? {};
                                        if (!$depField.gfield("hasValue") || ueaRequired) {
                                            $depField.gfield("model", "apply", { end: val.uea, rok: val.rok, ico: val.ico, ucs: val.ucs, uea_uc: val.uea_uc, ueb_uc: val.ueb_uc });
                                        }
                                    }
                                })
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekovabu(), {
                                    name: "uea2",
                                    model: "model.end=value.uea;model.rok=value.rok;model.ico=value.ico;model.ucs=value.ucs;model.uea_uc=value.uea_uc;model.ueb_uc=value.ueb_uc",
                                    itemTemplate: "{uea:trim:encode}",
                                    disabled: ueaRequired,
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    customClass: "js-inter-second"
                                }),
                                model: "model.uea=value",
                                change: (ev, ctx) => {
                                    const val = ctx.value ?? {};
                                    this.$grid.ggridserverfilter("apply", { ueb: { start: val.ueb, end: val.ueb, rok: val.rok, ico: val.ico, ucs: val.ucs, uea_uc: val.uea_uc, ueb_uc: val.ueb_uc } });
                                },
                                flag: (ueaRequired) ? "required" : undefined,
                                validators: (ueaRequired) ? [new Gordic.Validators.Base({
                                        message: "jres:33600494", //RC 33600494 : Povinná hodnota
                                        validate: (val, src) => {
                                            return val && val.start != null && val.end != null;
                                        }
                                    })] : undefined
                            })
                        }
                    }).addTextColumn({
                        name: "ueb",
                        caption: "jres:33600496", //RC 33600496 : AU RR
                        width: 70,
                        serverFilter: {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "ueb", caption: "jres:33600496" }), {
                                //dialogOptions: options.dialogOptions,
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600496") //RC 33600496 : AU RR
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekovabu(), {
                                    name: "ueb1",
                                    model: "model.start=value.ueb;model.rok=value.rok;model.ico=value.ico;model.ucs=value.ucs;model.uea_uc=value.uea_uc;model.ueb_uc=value.ueb_uc;model.uea<=value.uea",
                                    itemTemplate: "{ueb:trim:encode}",
                                    helperColumns: ["ueb"],
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    customClass: "js-inter-first",
                                    change: (ev, ctx) => {
                                        var $depField = $(document.body).findFields("ueb2");
                                        const val = ctx.value ?? {};
                                        if (!$depField.gfield("hasValue") || ueaRequired) {
                                            $depField.gfield("model", "apply", { end: val.ueb, rok: val.rok, ico: val.ico, ucs: val.ucs, uea_uc: val.uea_uc, ueb_uc: val.ueb_uc });
                                        }
                                    }
                                })
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekovabu(), {
                                    name: "ueb2",
                                    model: "model.end=value.ueb;model.rok=value.rok;model.ico=value.ico;model.ucs=value.ucs;model.uea_uc=value.uea_uc;model.ueb_uc=value.ueb_uc",
                                    itemTemplate: "{ueb:trim:encode}",
                                    helperColumns: ["ueb"],
                                    disabled: ueaRequired,
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    customClass: "js-inter-second"
                                }),
                                model: "model.ueb=value",
                                //change: (ev, ctx) => {
                                //    const val = ctx.value ?? {};
                                //    this.$grid.ggridserverfilter("apply", { uea: { start: val.uea, end: val.uea, rok: val.rok, ico: val.ico, ucs: val.ucs, uea_uc: val.uea_uc, ueb_uc: val.ueb_uc } });
                                //},
                                flag: (ueaRequired) ? "required" : undefined,
                                validators: (ueaRequired) ? [new Gordic.Validators.Base({
                                        message: "jres:33600494", //RC 33600494 : Povinná hodnota
                                        validate: (val, src) => {
                                            return val && val.start != null && val.end != null;
                                        }
                                    })] : undefined
                            })
                        }
                    })
                        .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetServerFilters(this), {
                        columnExtend: {
                            uea: { hidden: true },
                            ueb: { hidden: true },
                        },
                    })
                        .addCurrencyColumn({
                        name: "kc0_1",
                        caption: (this.pom.l_modedokObjSml) ? "jres:33600412".format(this.serverFilters?.rok ?? "") : "jres:33600413", //TODO rok //RC 33600413 : Rozpočtováno
                        width: 100,
                        hidden: this.pom.l_modedokBndBlk ?? false
                    }).addCurrencyColumn({
                        name: "c_12",
                        caption: "jres:33600414", //RC 33600414 : Blokováno
                        width: 100,
                        hidden: !this.pom.l_modedokBndBlk //neviditelné pro stav, kde není povolena vazba na VZ + objednávku
                    }).addCurrencyColumn({
                        name: "c_11",
                        caption: "jres:33600415", //RC 33600415 : Nasmlouváno BLK
                        width: 100,
                        hidden: !this.pom.l_modedokBndBlk //neviditelné pro stav, kde není povolena vazba na VZ + objednávku
                    }).addCurrencyColumn({
                        name: "c_10",
                        caption: (this.pom.l_modedokObjSml) ? "jres:33600416" : "jres:33600417", //RC 33600417 : Nasmlouváno ROZ
                        width: 100,
                        hidden: this.pom.l_modedokBndBlk ?? false
                    }).addCurrencyColumn({
                        name: "c_15",
                        caption: "jres:33600418", //RC 33600418 : Objednáno ROZ
                        width: 100,
                        hidden: (this.pom.l_modedokObjSml || this.pom.l_modedokBndBlk) ?? false //neviditelné pro OBJ
                    }).addCurrencyColumn({
                        name: "c_16",
                        caption: "jres:33600419", //RC 33600419 : Objednáno SML
                        width: 100,
                        hidden: this.pom.l_modedokBndBlk ?? false
                    }).addCurrencyColumn({
                        name: "c_17",
                        caption: "jres:33600420", //RC 33600420 : Objednáno BLK
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_6",
                        caption: "jres:33600421", //RC 33600421 : Rezervováno ROZ
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_18",
                        caption: "jres:33600422", //RC 33600422 : Rezervováno SML,OBJ
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_0",
                        caption: "jres:33600423", //RC 33600423 : Čerpáno
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_sml_roz_disp",
                        caption: "jres:33600424", //RC 33600424 : Nenasmlouváno přímo z rozpočtových prostředků
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_sml_blk_disp",
                        caption: "jres:33600425", //RC 33600425 : Nenasmlouváno z blokovaných prostředků
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_obj_sml_disp",
                        caption: "jres:33600426", //RC 33600426 : Neobjednáno z nasmlouvaných prostředků
                        width: 100
                    }).addCurrencyColumn({
                        name: "c_rez_sml_disp",
                        caption: "jres:33600427", //RC 33600427 : Nerezervováno z nasmlouvaných prostředků
                        width: 100
                    }).addTextColumn({
                        name: "nazev",
                        caption: "jres:33600428", //RC 33600428 : Název
                        width: 200
                    }).addNumberColumn({
                        name: "count_doc",
                        caption: "jres:33600429", //RC 33600429 : Počet použití řádku v dokladu
                        hidden: true
                    }).addNumberColumn({
                        name: "count_pri",
                        caption: "jres:33600430", //RC 33600430 : Počet použití řádku v rámci případu
                        hidden: true
                    }).addCurrencyColumn({
                        name: "kc0_1_0",
                        caption: "Pomocná 1",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_12_",
                        caption: "Pomocná 2",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_11_",
                        caption: "Pomocná 3",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_10_0",
                        caption: "Pomocná 4",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_15_",
                        caption: "Pomocná 5",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_16_0",
                        caption: "Pomocná 6",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_17_",
                        caption: "Pomocná 7",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_6_0",
                        caption: "Pomocná 8",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_18_",
                        caption: "Pomocná 9",
                        hidden: true
                    }).addCurrencyColumn({
                        name: "c_0_",
                        caption: "Pomocná 10",
                        hidden: true
                    });
                    return gf;
                }
                /**
                 * Získání, přidání a upravení filtrů pro volaní Isl
                 * @param that
                 * @param req
                 * @param next
                 * @returns
                 */
                getFilterData(that, req, next) {
                    return that.getFilter(that.$filterPanel.gfilterpanel("getCurrentData"))
                        .then((newFilter) => {
                        let maska = newFilter.filter;
                        maska = {
                            ...maska, ...{ bu_vl: that.serverFilters.bu_vl, rok: that.serverFilters.rok, uea_rr: that.serverFilters.uea_rr, ueb_rr: that.serverFilters.ueb_rr }, is_plan: this.is_plan, ixp: this.smlpid.ixp
                        };
                        for (var name in newFilter.filter?.cfu) {
                            maska[name] = newFilter.filter?.cfu[name];
                        }
                        if (maska.cfu) {
                            delete maska.cfu;
                        }
                        req["filters"] = maska;
                        return next(req);
                    });
                }
                /**
                 * Získání server filteru z gridu
                 * @param fPanelData
                 * @returns
                 */
                getFilter(fPanelData) {
                    var filterDto = fPanelData || {};
                    if (!this.$grid.findFields("uea,ueb").gform("isValid")) {
                        return $.Deferred().reject().promise();
                    }
                    return this.$grid.ggridserverfilter("collect", filterDto)
                        .then((filter) => {
                        if (filter.uea) {
                            filter.uea_uc = filter.uea.uea_uc;
                            filter.ueb_uc = filter.uea.ueb_uc;
                            var ueaFilter = { start: filter.uea.start, end: filter.uea.end };
                            filter.uea = ueaFilter;
                        }
                        if (filter.ueb) {
                            var uebFilter = { start: filter.ueb.start, end: filter.ueb.end };
                            filter.ueb = uebFilter;
                        }
                        return { filter: filter };
                    });
                }
                presetGridServerFilter(is_plan_changed = false) {
                    var presetFiltr = {
                        cfu: {}
                    };
                    var nksEnabled = true;
                    var ueaEnabled = true;
                    var te1Enabled = true;
                    if (this.is_plan) {
                        if (is_plan_changed) {
                            presetFiltr.nks = {};
                            presetFiltr.cfu.te1 = {};
                        }
                    }
                    else {
                        presetFiltr.nks = this.pom.nks?.trim();
                        nksEnabled = false;
                        te1Enabled = false;
                        presetFiltr.cfu.te1 = { start: this.pom.te1_zeros, end: this.pom.te1_zeros };
                    }
                    if (this.serverFilters.uea_rr && this.serverFilters.ueb_rr) {
                        ueaEnabled = false;
                        presetFiltr.uea = {
                            start: this.serverFilters.uea_rr, end: this.serverFilters.uea_rr, rok: this.serverFilters.rok, ico: this.serverFilters.ico,
                            ucs: this.serverFilters.ucs, uea_uc: this.serverFilters.uea_uc, ueb_uc: this.serverFilters.ueb_uc
                        };
                        presetFiltr.ueb = {
                            start: this.serverFilters.ueb_rr, end: this.serverFilters.ueb_rr, rok: this.serverFilters.rok, ico: this.serverFilters.ico,
                            ucs: this.serverFilters.ucs, uea_uc: this.serverFilters.uea_uc, ueb_uc: this.serverFilters.ueb_uc
                        };
                    }
                    //topologické omezení
                    if ((this.pom.sml_typ_ackppla == 2 || this.pom.sml_typ_ackppla == 3) && this.pom.sml_top_ackppla == 2) {
                        presetFiltr.nks = this.pom.nks?.trim();
                        nksEnabled = false;
                    }
                    if (is_plan_changed) {
                        this.$grid.ggridserverfilter("findFields", "nks,uea,ueb,te1").gfield("enable");
                    }
                    this.$grid.ggridserverfilter("apply", presetFiltr);
                    this.$grid.ggridserverfilter("findFields", "nks").gfield("option", "disabled", !nksEnabled);
                    this.$grid.ggridserverfilter("findFields", "uea,ueb").gfield("option", "disabled", !ueaEnabled);
                    this.$grid.ggridserverfilter("findFields", "te1").gfield("option", "disabled", !te1Enabled);
                }
                createCondFormats() {
                    var condFormats = [
                        //{
                        //    //372.8 04.03.14 vybarvení řádku, který je již použitý v dokladu
                        //    formula: "@count_doc > 0",
                        //    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        //},
                        //{
                        //    //386.9 již použitý řádek  případu je vytučněn (v případě dodatků)
                        //    formula: "@count_pri > 0",
                        //    bold: true
                        //},
                        ...this.defineColumnCondFormatFormula("kc0_1", "@kc0_1_0", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_12", "@c_12_", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_11", "@c_11_", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_10", "@c_10_0", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_15", "@c_15_", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_16", "@c_16_0", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_17", "@c_17_", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_6", "@c_6_0", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_18", "@c_18_", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_0", "@c_0_", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_sml_roz_disp", "(@kc0_1_0 - @c_12_ - @c_10_0 - @c_15_ - @c_6_0)", "@kc0_1_0"),
                        ...this.defineColumnCondFormatFormula("c_sml_blk_disp", "(@c_12_ - @c_12_ - @c_17_)", "@c_12_"),
                        ...this.defineColumnCondFormatFormula("c_obj_sml_disp", "(@c_10_0 + @c_11_ - @c_16_0 - @c_18_)", "@c_10_0"),
                        ...this.defineColumnCondFormatFormula("c_rez_sml_disp", "(@c_10_0 + @c_11_ + @c_15_ + @c_17_ - @c_18_)", "(@c_10_0 + @c_11_ + @c_15_ + @c_17_)")
                    ];
                    return condFormats;
                }
                defineColumnCondFormatFormula(applyColumn, columnValue, compareColumn) {
                    var array = [];
                    //zásadní chyba - Fialová, rozdílná znaménka
                    array.push({
                        formula: "({0} > 0 and {1} < 0) or ({0} < 0 and {1} > 0)".format(compareColumn, columnValue),
                        applyTo: applyColumn,
                        text: Gordic.Components.Grid.CondFormats.CondFormatText.purple,
                        description: "jres:33600431" //RC 33600431 : Rozdílná znaménka
                    });
                    //chyba - Modrá, překročení příjmových zdrojů
                    array.push({
                        formula: "NOT(({0} > 0 and {1} < 0) or ({0} < 0 and {1} > 0)) and ({0} >= 0 and {1} > {0})".format(compareColumn, columnValue),
                        applyTo: applyColumn,
                        text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                        description: "jres:33600432" //RC 33600432 : Překročení příjmových zdrojů
                    });
                    //chyba - Červená, překročení výdajových zdrojů
                    array.push({
                        formula: "NOT(({0} > 0 and {1} < 0) or ({0} < 0 and {1} > 0)) and NOT({0} >= 0 and {1} > {0}) and ({0} <= 0 and {1} < {0})".format(compareColumn, columnValue),
                        applyTo: applyColumn,
                        text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                        description: "jres:33600433" //RC 33600433 : Překročení výdajových zdrojů
                    });
                    return array;
                }
            };
            GSmlRozaaat = __decorate([
                Decorators.gcontent
            ], GSmlRozaaat);
            WebClient.GSmlRozaaat = GSmlRozaaat;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFJvemFhYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU21sUm96YWFhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQXVtQmY7QUF2bUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVtQm5CO0lBdm1CZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdW1CN0I7UUF2bUJvQixXQUFBLFNBQVM7WUFDMUIsbUNBQW1DO1lBRW5DLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxPQUFBLFlBQVk7Z0JBc0J6QyxjQUFjLENBQUMsT0FBTztvQkFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDO29CQUNqRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO29CQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7b0JBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxFQUFFLFNBQVMsSUFBSSxJQUFJLENBQUM7b0JBRTlELFNBQVM7b0JBQ1QsSUFBSSxDQUFD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QUR2QixVQUFVLENBQUMsUUFBUTtlQUNQLFdBQVcsQ0FtbUJ2QjtZQW5tQlkscUJBQVcsY0FtbUJ2QixDQUFBO1FBQ0wsQ0FBQyxFQXZtQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVtQjdCO0lBQUQsQ0FBQyxFQXZtQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXVtQm5CO0FBQUQsQ0FBQyxFQXZtQlMsTUFBTSxLQUFOLE1BQU0sUUF1bUJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUm96YWFhdC50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHbDvWLEm3IgxI3DrXNsYSBha2NlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTA3LTIwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIC8qKiBDb250ZW50IHBybyB2w71ixJtyIMSNw61zbGEgYWtjZSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sUm96YWFhdCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgcHJpdmF0ZSBzZXJ2ZXJGaWx0ZXJzO1xyXG4gICAgICAgIHByaXZhdGUgc21scGlkOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0bztcclxuICAgICAgICAvKiogUMWZw616bmFrLCB6ZGEgamUgZ3JpZCB2IG11bHRpIHJlxb5pbXUgcHJvIHbDvWLEm3IgdsOtY2UgcG9sb8W+ZWsgKi9cclxuICAgICAgICBwcml2YXRlIG11bHRpU2VsZWN0OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWssIHpkYSBqZSBtw6EgZGVmYXVsdG7EmyBkb2rDrXQgayBhdXRvbG9hZHUgc2V6bmFtdSBwxZlpIG5hxI10ZW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEF1dG9sb2FkOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWssIHpkYSBzZSBtw6Egem9icmF6aXQgdGl0dWxlayAoa3bFr2xpIGhyb21hZG7DqW11IHZ5dHZvxZllbsOtIHBvbG/FvmVrKSovXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93VGl0bGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKiBPYmpla3QgcyBwb21vY27DvW1pIHByb23Em25uw71taSBwcm8gcHLDoWNpICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb206IEludGVyZmFjZS5HUm96YWFhdFBvbW9jbmVEdG87XHJcblxyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgemRhIG5hxI3DrXN0IHBsw6Fub3ZhbsOpIHByb3N0xZllZGt5IG5lYm8gbmVwbMOhbm92YW7DqSovXHJcbiAgICAgICAgcHJpdmF0ZSBpc19wbGFuOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBGaWx0ciBwYW5lbCAod2lkZ2V0KSovXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFN1YnN0YXNreSAod2lkZ2V0KSovXHJcbiAgICAgICAgcHJpdmF0ZSAkc3VidGFza3M6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIEdyaWQgcyBwcm9zdMWZZWRreSAod2lkZ2V0KSovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwic21scm96YWFhdHN0YXJ0XCIgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyRmlsdGVycyA9IHRoaXMuc2VydmVyRmlsdGVycyB8fCBvcHRpb25zLnNlcnZlckZpbHRlcnM7XHJcbiAgICAgICAgICAgIHRoaXMuc21scGlkID0gdGhpcy5zbWxwaWQgfHwgb3B0aW9ucy5zbWxwaWQ7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3QgPSB0aGlzLm11bHRpU2VsZWN0ID8/IG9wdGlvbnMubXVsdGlTZWxlY3QgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEF1dG9sb2FkID0gdGhpcy5ncmlkQXV0b2xvYWQgPz8gb3B0aW9ucy5ncmlkQXV0b2xvYWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfcGxhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpdGxlID0gdGhpcy5zaG93VGl0bGUgPz8gb3B0aW9ucz8uc2hvd1RpdGxlID8/IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGVcclxuICAgICAgICAgICAgdGhpcy5pc2wuUm96YWFhdC5sb2FkUG9tb2NuZVByb21lbm5lKHsgaXhwOiB0aGlzLnNtbHBpZC5peHAhIH0pLmdldCgpLmRvbmUoKHBvbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb20gPSBwb207XHJcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSBcImpyZXM6MzM2MDA0MDBcIjsgLy9SQyAzMzYwMDQwMCA6IFJvenBvxI10b3bDqSBrcnl0w60gcG9sb8W+a3kgcGzDoW51XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxwaWQudHlwX2FnX2Jsb2sgPT0gSW50ZXJmYWNlLlR5cEJsb2thY25pQWdlbmR5Lm5nX3R5cGFnYmxva0VWWiB8fCB0aGlzLnNtbHBpZC50eXBfYWdfYmxvayA9PSBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rVkZQXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5zbWxwaWQudHlwX2FnX2Jsb2sgPT0gSW50ZXJmYWNlLlR5cEJsb2thY25pQWdlbmR5Lm5nX3R5cGFnYmxva0VQTyB8fCB0aGlzLnNtbHBpZC50eXBfYWdfYmxvayA9PSBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rUlpBKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zbWxvdXZhIHbDocW+ZSBuYSBWWlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMzNjAwNDAxXCIuZm9ybWF0KHRoaXMuc21scGlkLnByaXBhZD8uYWNfdmVyX3phayA/PyBcIlwiKTsgLy9SQyAzMzYwMDQwMSA6IFBvbG/Fvmt5IGJsb2thxI1uw60gYWdlbmR5IHswfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb20ubF9tb2RlZG9rT2JqU21sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzM2MDA0MDJcIi5mb3JtYXQodGhpcy5zbWxwaWQuYWNfc21sX25hZCA/PyBcIlwiKTsgLy9SQyAzMzYwMDQwMiA6IFBvbG/Fvmt5IHNtbG91dnkgezB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gKHRoaXMuc2hvd1RpdGxlKSA/IHRpdGxlIDogdGhpcy50aXRsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTdWJ0YXNrcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlc2V0R3JpZFNlcnZlckZpbHRlcigpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oeyBpZDogXCJzbWxyb3phYWF0c3RhcnRcIiB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TG9hZFBsYW5Qcm9zdHJlZGt5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RMb2FkUGxhblByb3N0cmVka3lcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0MDNcIiwgLy9SQyAzMzYwMDQwMyA6IFBsw6Fub3ZhbsOpIHByb3N0xZllZGt5XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2X2lzX3BsYW4gPSB0aGlzLmlzX3BsYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfcGxhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlc2V0R3JpZFNlcnZlckZpbHRlcih0aGlzLmlzX3BsYW4gIT0gcHJldl9pc19wbGFuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdExvYWROZXBsYW5Qcm9zdHJlZGt5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RMb2FkTmVwbGFuUHJvc3RyZWRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQwNFwiLCAvL1JDIDMzNjAwNDA0IDogTmVwbMOhbm92YW7DqSBwcm9zdMWZZWRreVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldl9pc19wbGFuID0gdGhpcy5pc19wbGFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3BsYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzZXRHcmlkU2VydmVyRmlsdGVyKHRoaXMuaXNfcGxhbiAhPSBwcmV2X2lzX3BsYW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnlicmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0MDVcIiwgLy9SQyAzMzYwMDQwNSA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dzID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2Uocm93cyA/PyB2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKHJvdz8/dm9pZCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0VnlicmF0IVwiLCBcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZpbHRyIHBhbmVsdSBuYWQgZ3JpZGVtKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhpcy5jcmVhdGVGaWx0ZXJGb3JtKCldLFxyXG4gICAgICAgICAgICAgICAgLy9maWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuTm9ybWFsLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJub196ZXJvXCIsIFwiaXhwX3JvelwiLCBcIml4c191a2FcIl0sXHJcbiAgICAgICAgICAgICAgICBhcHBseTogKGV2LCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVzZXRHcmlkU2VydmVyRmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy9maWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiT2JsaWJlbmVQb2RtaW5reVwiLFxyXG4gICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlcjogKHRoaXMuZ3JpZEF1dG9sb2FkKSA/IFtcIkNyZWF0ZVBhbmVsXCJdIDogW10sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKHt0YWJMYWJlbDogXCJqcmVzOjMzNjAwNDA2XCIsIG5hbWU6IFwiZmlsdGVyRm9ybVwifSk7IC8vUkMgMzM2MDA0MDYgOiBPYmVjbsOpXHJcbiAgICAgICAgICAgIC8vcG91emUgdiBwxZnDrXBhZMSbIMSNZXJww6Fuw60geiByb3pwb8SNdHVcclxuICAgICAgICAgICAgaWYgKCEodGhpcy5wb20ubF9tb2RlZG9rQm5kQmxrIHx8IHRoaXMucG9tLmxfbW9kZWRva09ialNtbCkpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMzYwMDQwN1wiKSAvL1JDIDMzNjAwNDA3IDogUm96cG/EjXRvdsOhbm8gamUgcsWvem7DqSBvZCBudWx5XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub196ZXJvXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNDA4XCIpIC8vUkMgMzM2MDA0MDggOiBJZGVudGlmaWvDoXRvciByb3pwb8SNdG92w6lobyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3JvelwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL3DFmcOtc3R1cCBrIHBvbG/FvmvDoW0gcGzDoW51IG9tZXplbiB1a2F6YXRlbGVtXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9tLmxfbW9kZWRva09ialNtbCAmJiAodGhpcy5wb20uc21sX3R5cF9hY2twcGxhID09IDEgfHwgdGhpcy5wb20uc21sX3R5cF9hY2twcGxhID09IDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjMzNjAwNDA5XCIpIC8vUkMgMzM2MDA0MDkgOiBVa2F6YXRlbCBrb21wZXRlbnRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnZ5YmVyVWthemF0ZWxlKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3VrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3VrYT12YWx1ZS5peHNfdWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bjogdGhpcy5wb20uaXhzX2Z1bl92eXJpelxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBzdWJ0YXNrdSBzIFBsw6Fub3ZhbsO9bWkgcHJvc3TFmWVka3kgYSBOZXBsw6Fub3ZhbsO9bWkgcHJvc3TFmWVka3kgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVN1YnRhc2tzKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gW3sgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0TG9hZFBsYW5Qcm9zdHJlZGt5IH1dO1xyXG4gICAgICAgICAgICAvL8WZw616ZW7DrSBwxZnDrXN0dXB1IGsgesOhbG/FvmvDoW0gKHBvdXplIHDFmWkgdsO9YsSbcnUgeiBwbMOhbnUpXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wb20ubF9tb2RlZG9rQm5kQmxrICYmICF0aGlzLnBvbS5sX21vZGVkb2tPYmpTbWwpIHsgcGFyYW1zLnB1c2goeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RMb2FkTmVwbGFuUHJvc3RyZWRreSB9KSB9XHJcbiAgICAgICAgICAgIHRoaXMuJHN1YnRhc2tzID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdzdWJ0YXNrcyh7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtOiAwLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIElzbCBWaWV3IHBybyBncmlkXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUxpc3RWaWV3KCk6IEdvcmRpYy5Jc2wuVmlldyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLklzbC5WaWV3KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc2wuUm96YWFhdC5saXN0KCkudXNlKChyZXEsIG5leHQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlckRhdGEodGhpcywgcmVxLCBuZXh0KTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWR1IHBybyB2w71ixJtyIHByb3N0xZllZGvFryAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3phYWF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRoaXMubXVsdGlTZWxlY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jcmVhdGVMaXN0VmlldygpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RWeWJyYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zb3J0OiBcIml4cCxyb2ssY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IHRoaXMuY3JlYXRlQ29uZEZvcm1hdHMoKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgcHJvIGdyaWQgcyBwcm9zdMWZZWRreSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCkge1xyXG4gICAgICAgICAgICAvL3Bva3VkIG5lbsOtIHZ5YnLDoW4gYmFua292bsOtIMO6xI1ldCB2ecW+YWR1amkgemFkw6Fuw60gU1UgUlIgYSBBVSBSUlxyXG4gICAgICAgICAgICBjb25zdCB1ZWFSZXF1aXJlZCA9ICh0aGlzLnNlcnZlckZpbHRlcnMuYnVfdmw/P1wiXCIpLnRyaW0oKS5sZW5ndGggPCAxO1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBnZi5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF2YXphbm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDg5XCIsIC8vUkMgMzM2MDA0ODkgOiBQIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDQ5MFwiLCAvL1JDIDMzNjAwNDkwIDogUG91xb5pdG9cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHJvdywgbWV0YSwgY2VsbEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8gYcW+IHNlIERhdmlkIHMgSG9uem91IGRvaG9kbm91XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyb3cubmF2YXphbm9zdCBhcyBJbnRlcmZhY2UuTmF2YXphbm9zdEFrY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuTmF2YXphbm9zdEFrY2UubmF2YXphbkRva2xhZEFQcmlwYWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImdpLXBhcGVyXCIsIHRleHQ6IFwianJlczozMzYwMDQ5MVwiIH07IC8vUkMgMzM2MDA0OTEgOiBQb3XFvml0byBuYSBkb2tsYWR1IGEgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLk5hdmF6YW5vc3RBa2NlLm5hdmF6YW5Eb2tsYWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImdpLW5hdmF6YW55X3phem5hbSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsIHRleHQ6IFwianJlczozMzYwMDQ5MlwiIH0gLy9SQyAzMzYwMDQ5MiA6IFBvdcW+aXRvIG5hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuTmF2YXphbm9zdEFrY2UubmF2YXphblByaXBhZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZ2ktbmF2YXphbnlfemF6bmFtIGctc3RhdGUtdGV4dCBnLXN0YXRlLWltcG9ydGFudFwiLCB0ZXh0OiBcImpyZXM6MzM2MDA0OTNcIiB9OyAvL1JDIDMzNjAwNDkzIDogUG91xb5pdG8gbmEgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQxMFwiLCAvL1JDIDMzNjAwNDEwIDogUm9rXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTVcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAodGhpcy5wb20udHlwX2luc3QgPT0gSW50ZXJmYWNlLlR5cEluc3RhbGFjZS5uZ190eWlBY3IpID8gXCJqcmVzOjMzNjAwMzc3XCIgOiBcImpyZXM6MzM2MDAzNzhcIiwgLy9SQyAzMzYwMDM3OCA6IMSMw61zbG8gYWtjZVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjaXNsb1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS5hZGROa3Moe1xyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5wb20uaWNvISxcclxuICAgICAgICAgICAgICAgICAgICBha3RQcm9obDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm5rc1wiLCAgICAgIC8vY2VzdGEgayBwcm9tZW5uZSB2IERUTyAodiB0b210byBwcmlwYWRlIGplIG5rcylcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcz8/XCJqcmVzOjMzNjAwNDExXCIsIC8vUkMgMzM2MDA0MTEgOiBOU1xyXG4gICAgICAgICAgICAgICAgICAgIG9ubHlBY3RpdmU6IGZhbHNlICAvL3BvdXplIGFrdGl2bmlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ1ZWFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQ5NVwiLCAvL1JDIDMzNjAwNDk1IDogU1UgUlJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZm9ybWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMoeyBuYW1lOiBcInVlYVwiLCBjYXB0aW9uOiBcImpyZXM6MzM2MDA0OTVcIiB9KSwgeyAvL1JDIDMzNjAwNDk1IDogU1UgUlJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kaWFsb2dPcHRpb25zOiBvcHRpb25zLmRpYWxvZ09wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDQ5NVwiKSAvL1JDIDMzNjAwNDk1IDogU1UgUlJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3ZhYnUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWVhMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXJ0PXZhbHVlLnVlYTttb2RlbC5yb2s9dmFsdWUucm9rO21vZGVsLmljbz12YWx1ZS5pY287bW9kZWwudWNzPXZhbHVlLnVjczttb2RlbC51ZWFfdWM9dmFsdWUudWVhX3VjO21vZGVsLnVlYl91Yz12YWx1ZS51ZWJfdWM7bW9kZWwudWViPD12YWx1ZS51ZWJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3VlYTp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiAobykgPT4geyByZXR1cm4gbzsgfSwgLy9OT1RFOiBCZXogdG9obyBuZWZ1bmd1amUgdnlwbG5lbmkgaG9kbm90eSBhIGtsaWsgbWltbyBpbmxpbmVkaWFsb2csIG11c2kgdG8gYnl0IHUgdnNlY2ggdGVjaHRvIHByZWZhYnUsIGtyb21lIGNmdUludGVydmFsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLWludGVyLWZpcnN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRlcEZpZWxkID0gJChkb2N1bWVudC5ib2R5KS5maW5kRmllbGRzKFwidWVhMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gY3R4LnZhbHVlID8/IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRkZXBGaWVsZC5nZmllbGQoXCJoYXNWYWx1ZVwiKSB8fCB1ZWFSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRlcEZpZWxkLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBlbmQ6IHZhbC51ZWEsIHJvazogdmFsLnJvaywgaWNvOiB2YWwuaWNvLCB1Y3M6IHZhbC51Y3MsIHVlYV91YzogdmFsLnVlYV91YywgdWViX3VjOiB2YWwudWViX3VjfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvdmFidSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1ZWEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZW5kPXZhbHVlLnVlYTttb2RlbC5yb2s9dmFsdWUucm9rO21vZGVsLmljbz12YWx1ZS5pY287bW9kZWwudWNzPXZhbHVlLnVjczttb2RlbC51ZWFfdWM9dmFsdWUudWVhX3VjO21vZGVsLnVlYl91Yz12YWx1ZS51ZWJfdWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3VlYTp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdWVhUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sIC8vTk9URTogQmV6IHRvaG8gbmVmdW5ndWplIHZ5cGxuZW5pIGhvZG5vdHkgYSBrbGlrIG1pbW8gaW5saW5lZGlhbG9nLCBtdXNpIHRvIGJ5dCB1IHZzZWNoIHRlY2h0byBwcmVmYWJ1LCBrcm9tZSBjZnVJbnRlcnZhbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1pbnRlci1zZWNvbmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnVlYT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjdHgudmFsdWUgPz8ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyB1ZWI6IHsgc3RhcnQ6IHZhbC51ZWIsIGVuZDogdmFsLnVlYiwgcm9rOiB2YWwucm9rLCBpY286IHZhbC5pY28sIHVjczogdmFsLnVjcywgdWVhX3VjOiB2YWwudWVhX3VjLCB1ZWJfdWM6IHZhbC51ZWJfdWMgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogKHVlYVJlcXVpcmVkKSA/IFwicmVxdWlyZWRcIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogKHVlYVJlcXVpcmVkKSA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA0OTRcIiwgLy9SQyAzMzYwMDQ5NCA6IFBvdmlubsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICYmIHZhbC5zdGFydCAhPSBudWxsICYmIHZhbC5lbmQgIT0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSldIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidWViXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0OTZcIiwgLy9SQyAzMzYwMDQ5NiA6IEFVIFJSXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZ2V0Rm9ybUJveEZpbHRlckRlZmF1bHRzKHsgbmFtZTogXCJ1ZWJcIiwgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDk2XCIgfSksIHsgLy9SQyAzMzYwMDQ5NiA6IEFVIFJSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGlhbG9nT3B0aW9uczogb3B0aW9ucy5kaWFsb2dPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM2MDA0OTZcIikgLy9SQyAzMzYwMDQ5NiA6IEFVIFJSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la292YWJ1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVlYjFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zdGFydD12YWx1ZS51ZWI7bW9kZWwucm9rPXZhbHVlLnJvazttb2RlbC5pY289dmFsdWUuaWNvO21vZGVsLnVjcz12YWx1ZS51Y3M7bW9kZWwudWVhX3VjPXZhbHVlLnVlYV91Yzttb2RlbC51ZWJfdWM9dmFsdWUudWViX3VjO21vZGVsLnVlYTw9dmFsdWUudWVhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt1ZWI6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1widWViXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IChvKSA9PiB7IHJldHVybiBvOyB9LCAvL05PVEU6IEJleiB0b2hvIG5lZnVuZ3VqZSB2eXBsbmVuaSBob2Rub3R5IGEga2xpayBtaW1vIGlubGluZWRpYWxvZywgbXVzaSB0byBieXQgdSB2c2VjaCB0ZWNodG8gcHJlZmFidSwga3JvbWUgY2Z1SW50ZXJ2YWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtaW50ZXItZmlyc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZGVwRmllbGQgPSAkKGRvY3VtZW50LmJvZHkpLmZpbmRGaWVsZHMoXCJ1ZWIyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjdHgudmFsdWUgPz8ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGRlcEZpZWxkLmdmaWVsZChcImhhc1ZhbHVlXCIpIHx8IHVlYVJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZGVwRmllbGQuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGVuZDogdmFsLnVlYiwgcm9rOiB2YWwucm9rLCBpY286IHZhbC5pY28sIHVjczogdmFsLnVjcywgdWVhX3VjOiB2YWwudWVhX3VjLCB1ZWJfdWM6IHZhbC51ZWJfdWMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvdmFidSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1ZWIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZW5kPXZhbHVlLnVlYjttb2RlbC5yb2s9dmFsdWUucm9rO21vZGVsLmljbz12YWx1ZS5pY287bW9kZWwudWNzPXZhbHVlLnVjczttb2RlbC51ZWFfdWM9dmFsdWUudWVhX3VjO21vZGVsLnVlYl91Yz12YWx1ZS51ZWJfdWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3VlYjp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJ1ZWJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHVlYVJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IChvKSA9PiB7IHJldHVybiBvOyB9LCAvL05PVEU6IEJleiB0b2hvIG5lZnVuZ3VqZSB2eXBsbmVuaSBob2Rub3R5IGEga2xpayBtaW1vIGlubGluZWRpYWxvZywgbXVzaSB0byBieXQgdSB2c2VjaCB0ZWNodG8gcHJlZmFidSwga3JvbWUgY2Z1SW50ZXJ2YWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtaW50ZXItc2Vjb25kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51ZWI9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnN0IHZhbCA9IGN0eC52YWx1ZSA/PyB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIHsgdWVhOiB7IHN0YXJ0OiB2YWwudWVhLCBlbmQ6IHZhbC51ZWEsIHJvazogdmFsLnJvaywgaWNvOiB2YWwuaWNvLCB1Y3M6IHZhbC51Y3MsIHVlYV91YzogdmFsLnVlYV91YywgdWViX3VjOiB2YWwudWViX3VjIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogKHVlYVJlcXVpcmVkKSA/IFwicmVxdWlyZWRcIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogKHVlYVJlcXVpcmVkKSA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA0OTRcIiwgLy9SQyAzMzYwMDQ5NCA6IFBvdmlubsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICYmIHZhbC5zdGFydCAhPSBudWxsICYmIHZhbC5lbmQgIT0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSldIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTb3J0ZWRFa29DZnVTZXQoR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRoaXMpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uRXh0ZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogeyBoaWRkZW46IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWViOiB7IGhpZGRlbjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrYzBfMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogKHRoaXMucG9tLmxfbW9kZWRva09ialNtbCkgPyBcImpyZXM6MzM2MDA0MTJcIi5mb3JtYXQodGhpcy5zZXJ2ZXJGaWx0ZXJzPy5yb2s/P1wiXCIpIDogXCJqcmVzOjMzNjAwNDEzXCIsIC8vVE9ETyByb2sgLy9SQyAzMzYwMDQxMyA6IFJvenBvxI10b3bDoW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0aGlzLnBvbS5sX21vZGVkb2tCbmRCbGs/P2ZhbHNlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDE0XCIsIC8vUkMgMzM2MDA0MTQgOiBCbG9rb3bDoW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5wb20ubF9tb2RlZG9rQm5kQmxrIC8vbmV2aWRpdGVsbsOpIHBybyBzdGF2LCBrZGUgbmVuw60gcG92b2xlbmEgdmF6YmEgbmEgVlogKyBvYmplZG7DoXZrdVxyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQxNVwiLCAvL1JDIDMzNjAwNDE1IDogTmFzbWxvdXbDoW5vIEJMS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMucG9tLmxfbW9kZWRva0JuZEJsayAvL25ldmlkaXRlbG7DqSBwcm8gc3Rhdiwga2RlIG5lbsOtIHBvdm9sZW5hIHZhemJhIG5hIFZaICsgb2JqZWRuw6F2a3VcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjXzEwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAodGhpcy5wb20ubF9tb2RlZG9rT2JqU21sKSA/IFwianJlczozMzYwMDQxNlwiIDogXCJqcmVzOjMzNjAwNDE3XCIsIC8vUkMgMzM2MDA0MTcgOiBOYXNtbG91dsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0aGlzLnBvbS5sX21vZGVkb2tCbmRCbGs/P2ZhbHNlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xNVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDE4XCIsIC8vUkMgMzM2MDA0MTggOiBPYmplZG7DoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogKHRoaXMucG9tLmxfbW9kZWRva09ialNtbCB8fCB0aGlzLnBvbS5sX21vZGVkb2tCbmRCbGspID8/IGZhbHNlIC8vbmV2aWRpdGVsbsOpIHBybyBPQkpcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjXzE2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0MTlcIiwgLy9SQyAzMzYwMDQxOSA6IE9iamVkbsOhbm8gU01MXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0aGlzLnBvbS5sX21vZGVkb2tCbmRCbGs/P2ZhbHNlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xN1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDIwXCIsIC8vUkMgMzM2MDA0MjAgOiBPYmplZG7DoW5vIEJMS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfNlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDIxXCIsIC8vUkMgMzM2MDA0MjEgOiBSZXplcnZvdsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xOFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDIyXCIsIC8vUkMgMzM2MDA0MjIgOiBSZXplcnZvdsOhbm8gU01MLE9CSlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDIzXCIsIC8vUkMgMzM2MDA0MjMgOiDEjGVycMOhbm9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3NtbF9yb3pfZGlzcFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDI0XCIsIC8vUkMgMzM2MDA0MjQgOiBOZW5hc21sb3V2w6FubyBwxZnDrW1vIHogcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19zbWxfYmxrX2Rpc3BcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQyNVwiLCAvL1JDIDMzNjAwNDI1IDogTmVuYXNtbG91dsOhbm8geiBibG9rb3ZhbsO9Y2ggcHJvc3TFmWVka8WvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19vYmpfc21sX2Rpc3BcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQyNlwiLCAvL1JDIDMzNjAwNDI2IDogTmVvYmplZG7DoW5vIHogbmFzbWxvdXZhbsO9Y2ggcHJvc3TFmWVka8WvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yZXpfc21sX2Rpc3BcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQyN1wiLCAvL1JDIDMzNjAwNDI3IDogTmVyZXplcnZvdsOhbm8geiBuYXNtbG91dmFuw71jaCBwcm9zdMWZZWRrxa9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0MjhcIiwgLy9SQyAzMzYwMDQyOCA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjb3VudF9kb2NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQyOVwiLCAvL1JDIDMzNjAwNDI5IDogUG/EjWV0IHBvdcW+aXTDrSDFmcOhZGt1IHYgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50X3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDMwXCIsIC8vUkMgMzM2MDA0MzAgOiBQb8SNZXQgcG91xb5pdMOtIMWZw6Fka3UgdiByw6FtY2kgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrYzBfMV8wXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvbW9jbsOhIDFcIixcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTJfXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvbW9jbsOhIDJcIixcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTFfXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvbW9jbsOhIDNcIixcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTBfMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb21vY27DoSA0XCIsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjXzE1X1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb21vY27DoSA1XCIsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjXzE2XzBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9tb2Nuw6EgNlwiLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xN19cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9tb2Nuw6EgN1wiLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY182XzBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9tb2Nuw6EgOFwiLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xOF9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9tb2Nuw6EgOVwiLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY18wX1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb21vY27DoSAxMFwiLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhbsOtLCBwxZlpZMOhbsOtIGEgdXByYXZlbsOtIGZpbHRyxa8gcHJvIHZvbGFuw60gSXNsXHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKiBAcGFyYW0gcmVxXHJcbiAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVyRGF0YSh0aGF0OiB0aGlzLCByZXE6IElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBuZXh0OiBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJbnRlcmZhY2UuR1JvemFhYXREdG8+KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmdldEZpbHRlcih0aGF0LiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFza2EgPSBuZXdGaWx0ZXIuZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2thID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tYXNrYSwgLi4ueyBidV92bDogdGhhdC5zZXJ2ZXJGaWx0ZXJzLmJ1X3ZsLCByb2s6IHRoYXQuc2VydmVyRmlsdGVycy5yb2ssIHVlYV9ycjogdGhhdC5zZXJ2ZXJGaWx0ZXJzLnVlYV9yciwgdWViX3JyOiB0aGF0LnNlcnZlckZpbHRlcnMudWViX3JyIH0gLCBpc19wbGFuOiB0aGlzLmlzX3BsYW4sIGl4cDogdGhpcy5zbWxwaWQuaXhwISB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gbmV3RmlsdGVyLmZpbHRlcj8uY2Z1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thIVtuYW1lXSA9IG5ld0ZpbHRlci5maWx0ZXI/LmNmdVtuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2thLmNmdSkgeyBkZWxldGUgbWFza2EuY2Z1OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxW1wiZmlsdGVyc1wiXSA9IG1hc2thO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFrDrXNrw6Fuw60gc2VydmVyIGZpbHRlcnUgeiBncmlkdVxyXG4gICAgICAgICAqIEBwYXJhbSBmUGFuZWxEYXRhXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlcihmUGFuZWxEYXRhPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckR0byA9IGZQYW5lbERhdGEgfHwge307XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kZ3JpZC5maW5kRmllbGRzKFwidWVhLHVlYlwiKS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiY29sbGVjdFwiLCBmaWx0ZXJEdG8pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci51ZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnVlYV91YyA9IGZpbHRlci51ZWEudWVhX3VjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIudWViX3VjID0gZmlsdGVyLnVlYS51ZWJfdWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1ZWFGaWx0ZXIgPSB7IHN0YXJ0OiBmaWx0ZXIudWVhLnN0YXJ0LCBlbmQ6IGZpbHRlci51ZWEuZW5kIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci51ZWEgPSB1ZWFGaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudWViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1ZWJGaWx0ZXIgPSB7IHN0YXJ0OiBmaWx0ZXIudWViLnN0YXJ0LCBlbmQ6IGZpbHRlci51ZWIuZW5kIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci51ZWIgPSB1ZWJGaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGZpbHRlcjogZmlsdGVyIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJlc2V0R3JpZFNlcnZlckZpbHRlcihpc19wbGFuX2NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlc2V0RmlsdHI6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIGNmdToge31cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIG5rc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgdWVhRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciB0ZTFFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfcGxhbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzX3BsYW5fY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldEZpbHRyLm5rcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldEZpbHRyLmNmdS50ZTEgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByZXNldEZpbHRyLm5rcyA9IHRoaXMucG9tLm5rcz8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgbmtzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGUxRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0RmlsdHIuY2Z1LnRlMSA9IHsgc3RhcnQ6IHRoaXMucG9tLnRlMV96ZXJvcywgZW5kOiB0aGlzLnBvbS50ZTFfemVyb3MgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2ZXJGaWx0ZXJzLnVlYV9yciAmJiB0aGlzLnNlcnZlckZpbHRlcnMudWViX3JyKSB7XHJcbiAgICAgICAgICAgICAgICB1ZWFFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRGaWx0ci51ZWEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuc2VydmVyRmlsdGVycy51ZWFfcnIsIGVuZDogdGhpcy5zZXJ2ZXJGaWx0ZXJzLnVlYV9yciwgcm9rOiB0aGlzLnNlcnZlckZpbHRlcnMucm9rLCBpY286IHRoaXMuc2VydmVyRmlsdGVycy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGlzLnNlcnZlckZpbHRlcnMudWNzLCB1ZWFfdWM6IHRoaXMuc2VydmVyRmlsdGVycy51ZWFfdWMsIHVlYl91YzogdGhpcy5zZXJ2ZXJGaWx0ZXJzLnVlYl91Y1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHByZXNldEZpbHRyLnVlYiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zZXJ2ZXJGaWx0ZXJzLnVlYl9yciwgZW5kOiB0aGlzLnNlcnZlckZpbHRlcnMudWViX3JyLCByb2s6IHRoaXMuc2VydmVyRmlsdGVycy5yb2ssIGljbzogdGhpcy5zZXJ2ZXJGaWx0ZXJzLmljbyxcclxuICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoaXMuc2VydmVyRmlsdGVycy51Y3MsIHVlYV91YzogdGhpcy5zZXJ2ZXJGaWx0ZXJzLnVlYV91YywgdWViX3VjOiB0aGlzLnNlcnZlckZpbHRlcnMudWViX3VjIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90b3BvbG9naWNrw6kgb21lemVuw61cclxuICAgICAgICAgICAgaWYgKCh0aGlzLnBvbS5zbWxfdHlwX2Fja3BwbGEgPT0gMiB8fCB0aGlzLnBvbS5zbWxfdHlwX2Fja3BwbGEgPT0gMykgJiYgdGhpcy5wb20uc21sX3RvcF9hY2twcGxhID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldEZpbHRyLm5rcyA9IHRoaXMucG9tLm5rcz8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgbmtzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc19wbGFuX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJmaW5kRmllbGRzXCIsIFwibmtzLHVlYSx1ZWIsdGUxXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgcHJlc2V0RmlsdHIpO1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiZmluZEZpZWxkc1wiLCBcIm5rc1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhbmtzRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJmaW5kRmllbGRzXCIsIFwidWVhLHVlYlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdWVhRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJmaW5kRmllbGRzXCIsIFwidGUxXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0ZTFFbmFibGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29uZEZvcm1hdHMoKTogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXSB7XHJcbiAgICAgICAgICAgIHZhciBjb25kRm9ybWF0czogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXSA9IFtcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8zNzIuOCAwNC4wMy4xNCB2eWJhcnZlbsOtIMWZw6Fka3UsIGt0ZXLDvSBqZSBqacW+IHBvdcW+aXTDvSB2IGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC8vICAgIGZvcm11bGE6IFwiQGNvdW50X2RvYyA+IDBcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLzM4Ni45IGppxb4gcG91xb5pdMO9IMWZw6FkZWsgIHDFmcOtcGFkdSBqZSB2eXR1xI1uxJtuICh2IHDFmcOtcGFkxJsgZG9kYXRrxa8pXHJcbiAgICAgICAgICAgICAgICAvLyAgICBmb3JtdWxhOiBcIkBjb3VudF9wcmkgPiAwXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBib2xkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwia2MwXzFcIiwgXCJAa2MwXzFfMFwiLCBcIkBrYzBfMV8wXCIpLFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZpbmVDb2x1bW5Db25kRm9ybWF0Rm9ybXVsYShcImNfMTJcIiwgXCJAY18xMl9cIiwgXCJAa2MwXzFfMFwiKSxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmaW5lQ29sdW1uQ29uZEZvcm1hdEZvcm11bGEoXCJjXzExXCIsIFwiQGNfMTFfXCIsIFwiQGtjMF8xXzBcIiksXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwiY18xMFwiLCBcIkBjXzEwXzBcIiwgXCJAa2MwXzFfMFwiKSxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmaW5lQ29sdW1uQ29uZEZvcm1hdEZvcm11bGEoXCJjXzE1XCIsIFwiQGNfMTVfXCIsIFwiQGtjMF8xXzBcIiksXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwiY18xNlwiLCBcIkBjXzE2XzBcIiwgXCJAa2MwXzFfMFwiKSxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmaW5lQ29sdW1uQ29uZEZvcm1hdEZvcm11bGEoXCJjXzE3XCIsIFwiQGNfMTdfXCIsIFwiQGtjMF8xXzBcIiksXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwiY182XCIsIFwiQGNfNl8wXCIsIFwiQGtjMF8xXzBcIiksXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwiY18xOFwiLCBcIkBjXzE4X1wiLCBcIkBrYzBfMV8wXCIpLFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZpbmVDb2x1bW5Db25kRm9ybWF0Rm9ybXVsYShcImNfMFwiLCBcIkBjXzBfXCIsIFwiQGtjMF8xXzBcIiksXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwiY19zbWxfcm96X2Rpc3BcIiwgXCIoQGtjMF8xXzAgLSBAY18xMl8gLSBAY18xMF8wIC0gQGNfMTVfIC0gQGNfNl8wKVwiLCBcIkBrYzBfMV8wXCIpLFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZpbmVDb2x1bW5Db25kRm9ybWF0Rm9ybXVsYShcImNfc21sX2Jsa19kaXNwXCIsIFwiKEBjXzEyXyAtIEBjXzEyXyAtIEBjXzE3XylcIiwgXCJAY18xMl9cIiksXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKFwiY19vYmpfc21sX2Rpc3BcIiwgXCIoQGNfMTBfMCArIEBjXzExXyAtIEBjXzE2XzAgLSBAY18xOF8pXCIsIFwiQGNfMTBfMFwiKSxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmaW5lQ29sdW1uQ29uZEZvcm1hdEZvcm11bGEoXCJjX3Jlel9zbWxfZGlzcFwiLCBcIihAY18xMF8wICsgQGNfMTFfICsgQGNfMTVfICsgQGNfMTdfIC0gQGNfMThfKVwiLCBcIihAY18xMF8wICsgQGNfMTFfICsgQGNfMTVfICsgQGNfMTdfKVwiKVxyXG4gICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29uZEZvcm1hdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZUNvbHVtbkNvbmRGb3JtYXRGb3JtdWxhKGFwcGx5Q29sdW1uOiBzdHJpbmcsIGNvbHVtblZhbHVlOiBzdHJpbmcsIGNvbXBhcmVDb2x1bW46IHN0cmluZyk6IENvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W10ge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXk6IENvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W10gPSBbXTtcclxuICAgICAgICAgICAgLy96w6FzYWRuw60gY2h5YmEgLSBGaWFsb3bDoSwgcm96ZMOtbG7DoSB6bmFtw6lua2FcclxuICAgICAgICAgICAgYXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIih7MH0gPiAwIGFuZCB7MX0gPCAwKSBvciAoezB9IDwgMCBhbmQgezF9ID4gMClcIi5mb3JtYXQoY29tcGFyZUNvbHVtbiwgY29sdW1uVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgYXBwbHlUbzogYXBwbHlDb2x1bW4sXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MzFcIiAvL1JDIDMzNjAwNDMxIDogUm96ZMOtbG7DoSB6bmFtw6lua2FcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY2h5YmEgLSBNb2Ryw6EsIHDFmWVrcm/EjWVuw60gcMWZw61qbW92w71jaCB6ZHJvasWvXHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZm9ybXVsYTogXCJOT1QoKHswfSA+IDAgYW5kIHsxfSA8IDApIG9yICh7MH0gPCAwIGFuZCB7MX0gPiAwKSkgYW5kICh7MH0gPj0gMCBhbmQgezF9ID4gezB9KVwiLmZvcm1hdChjb21wYXJlQ29sdW1uLCBjb2x1bW5WYWx1ZSksXHJcbiAgICAgICAgICAgICAgICBhcHBseVRvOiBhcHBseUNvbHVtbixcclxuICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MzJcIiAvL1JDIDMzNjAwNDMyIDogUMWZZWtyb8SNZW7DrSBwxZnDrWptb3bDvWNoIHpkcm9qxa9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY2h5YmEgLSDEjGVydmVuw6EsIHDFmWVrcm/EjWVuw60gdsO9ZGFqb3bDvWNoIHpkcm9qxa9cclxuICAgICAgICAgICAgYXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIk5PVCgoezB9ID4gMCBhbmQgezF9IDwgMCkgb3IgKHswfSA8IDAgYW5kIHsxfSA+IDApKSBhbmQgTk9UKHswfSA+PSAwIGFuZCB7MX0gPiB7MH0pIGFuZCAoezB9IDw9IDAgYW5kIHsxfSA8IHswfSlcIi5mb3JtYXQoY29tcGFyZUNvbHVtbiwgY29sdW1uVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgYXBwbHlUbzogYXBwbHlDb2x1bW4sXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MzNcIiAvL1JDIDMzNjAwNDMzIDogUMWZZWtyb8SNZW7DrSB2w71kYWpvdsO9Y2ggemRyb2rFr1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==