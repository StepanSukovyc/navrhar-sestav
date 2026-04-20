"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            function foo() {
                console.log("foo()");
            }
            WebControls.foo = foo;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            let GIisspHistoryDetailPsk = class GIisspHistoryDetailPsk extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GIisspHistoryDetailPsk#";
                }
                prepareContent(options) {
                    this.newOps({ title: "jres:31150018".format("0") }); //RC 31150018 : Detail volání rozhraní Státní pokladny pro id volání {0}
                    this.beginOperation();
                    this.isl.IisspEkisSpPskHistorie.read({ id_ext: options.id_ext, id_volani_ssp: options.id_volani_ssp })
                        .getData()
                        .then((res) => { this.renderContent(res); })
                        .always(() => { this.endOperation(); });
                }
                renderContent(data) {
                    this.newOps({ title: "jres:31150018".format(data.id_volani_ssp?.toString() ?? "") }); //RC 31150018 : Detail volání rozhraní Státní pokladny pro id volání {0}
                    const copyAct = new GAction({
                        name: "copyAct",
                        caption: "jres:31150021", //RC 31150021 : Kopírovat
                        icon: "gi-copy",
                        run: function (ev, ctx) {
                            Gordic.Utils.copyToClipboard(ctx.text);
                        }
                    });
                    const form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addSection()
                        .addRow("jres:31150002") //RC 31150002 : Id volání
                        .addField("gnumberbox", { name: "id_volani_ssp", disabled: true })
                        .addRow("jres:31150003") //RC 31150003 : Výsledek
                        .addField("gstringbox", { name: "vysl_volani_txt", disabled: true })
                        .addRow("jres:31150004") //RC 31150004 : Datum volání
                        .addField("gdatebox", { name: "dat_zmena", valueType: "datetime", disabled: true })
                        .addRow("jres:31150005") //RC 31150005 : Druh
                        .addField("gstringbox", { name: "druh", disabled: true })
                        .addSection()
                        .addRow("jres:31150006") //RC 31150006 : ID ext
                        .addField("gstringbox", { name: "id_ext", disabled: true })
                        .addRow("jres:31150007") //RC 31150007 : Datum od
                        .addField("gdatebox", { name: "datum_od", valueType: "datetime", disabled: true })
                        .addRow("jres:31150008") //RC 31150008 : Datum
                        .addField("gdatebox", { name: "datum", valueType: "datetime", disabled: true })
                        .addRow("jres:31150009") //RC 31150009 : Dokl. číslo
                        .addField("gstringbox", { name: "doklad_cislo", disabled: true });
                    $.newDiv("detail-header")
                        .appendTo(this.element)
                        .gform("createFrom", form)
                        .findFields()
                        .gfield("model", "apply", data);
                    if (data.text_chyby_long) {
                        $.newDiv()
                            .appendTo(this.element)
                            .gtab({
                            title: "jres:31150022", //RC 31150022 : Informace o chybě
                            icon: "fa-times-circle g-state-text g-state-error",
                            opened: true,
                            menuBar: [{
                                    action: copyAct,
                                    actionContext: { text: data.text_chyby_long },
                                    favorite: true
                                }]
                        })
                            .append($("<div>").gstringbox({ initialValue: data.text_chyby_long, rows: 10, disabled: true }));
                    }
                    $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31150019", //RC 31150019 : Vstupní XML
                        icon: "fa-arrow-right",
                        opened: true,
                        menuBar: [{
                                action: copyAct,
                                actionContext: { text: data.xml_request },
                                favorite: true
                            }]
                    })
                        .append($("<div>").gstringbox({ initialValue: data.xml_request, rows: 10, disabled: true }));
                    $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31150020", //RC 31150020 : Výstupní XML
                        icon: "fa-arrow-right gi-rot180",
                        opened: !!data.xml_response,
                        menuBar: [{
                                action: copyAct,
                                actionContext: { text: data.xml_response },
                                favorite: true
                            }]
                    })
                        .append($("<div>").gstringbox({ initialValue: data.xml_response, rows: 10, disabled: true }));
                    this.commandBar([{
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: (ev) => { this.close(); }
                            })
                        }]);
                }
            };
            GIisspHistoryDetailPsk = __decorate([
                Decorators.gcontent
            ], GIisspHistoryDetailPsk);
            WebControls.GIisspHistoryDetailPsk = GIisspHistoryDetailPsk;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            let GIisspHistoryPsk = class GIisspHistoryPsk extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:31150001"; //RC 31150001 : Historie volání přeúčtování skutečnosti
                    this.uid = "GIisspHistoryPsk#";
                }
                prepareContent(options) {
                    this.options = options;
                    this.actions.add({
                        name: "detailAct",
                        icon: "gi-detail",
                        caption: "jres:31150014", //RC 31150014 : Detail
                        run: (ev, ctx) => {
                            const sel = grid.ggrid("getSelection")[0];
                            if (!sel)
                                return;
                            this.showDetail(sel);
                        }
                    });
                    this.menuBar([{ action: this.actions.detailAct, favorite: true }]);
                    const view = new Gordic.Isl.View(this.isl.IisspEkisSpPskHistorie.list({ filters: { id_ext: { o: "LIKE", v: this.options.id_ext } } }));
                    const grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columns: Gordic.Prefabs.GridFormats.GIisspEkisSpPskHistorieDtoGfPrefab(),
                        data: view,
                        columnMode: "full",
                        defaultAction: this.actions.detailAct
                    });
                }
                showDetail(d) {
                    const options = {
                        id_volani_ssp: d.id_volani_ssp,
                        id_ext: d.id_ext
                    };
                    this.navigate(Gordic.Iissp.WebControls.GIisspHistoryDetailPsk, options);
                }
            };
            GIisspHistoryPsk = __decorate([
                Decorators.gcontent
            ], GIisspHistoryPsk);
            WebControls.GIisspHistoryPsk = GIisspHistoryPsk;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            let GIisspPreuctovaniSkutecnosti = class GIisspPreuctovaniSkutecnosti extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:31150023"; //RC 31150023 : Výsledek zpracování ve Státní pokladně
                    this.uid = "GIisspPreuctovaniSkutecnosti#";
                }
                prepareContent(options) {
                    const DB = Gordic.Ginis.DbModel;
                    this.beginOperation();
                    this.isl.IisspTypKomunikace.read({ rok: options.rok, ico: options.ico }).get()
                        .then((typCom) => {
                        const typ_kom_iissp = typCom.data.typ_kom_iissp;
                        //const typ_kom_iissp = Gordic.Ginis.DbModel.GEkoctiiEnum.vyber_uzivatele as any; //DEBUG!!!
                        const showDlg = !(typ_kom_iissp === 2 /* DB.GEkoctiiEnum.online */ || typ_kom_iissp === 4 /* DB.GEkoctiiEnum.offline */);
                        if (!showDlg) {
                            return {
                                zpusob_volani: typ_kom_iissp === 2 /* DB.GEkoctiiEnum.online */
                                    ? 10 /* DB.GIisspZpusobVolaniEnum.online */
                                    : 20 /* DB.GIisspZpusobVolaniEnum.offline */,
                                hromRez: options.hromRez
                            };
                        }
                        else {
                            return this.showTypOdpovediDlg(typ_kom_iissp);
                        }
                    })
                        .then((ctx) => {
                        this.beginOperation();
                        const view = new Gordic.Data.View([], { key: "id" });
                        this.isl.RozIissp.odeslaniPreuctovaniSkutecnosti({
                            ico: options.ico,
                            ucs: options.ucs,
                            ixb: options.ixb,
                            ixs_vkz: options.ixs_vkz,
                            por_cislo: options.por_cislo,
                            zpusob_volani: ctx.zpusob_volani
                        }).get()
                            .then(d => {
                            d.result.data.hlaseni?.polozka;
                            view.updateData(d.result.data.hlaseni?.polozka ?? []);
                        }, (ctx, type) => {
                            if (type === "validation") {
                                ctx.handled = true;
                                this.dialogs.warning("jres:31150032"); //RC 31150032 : Operaci nelze provést. Databázový záznam není konzistentní.
                            }
                        })
                            .always(() => { this.endOperation(); });
                        $.newDiv()
                            .appendTo(this.element)
                            .gautofit()
                            .ggrid({
                            data: view,
                            columns: new Gordic.Data.GridFormat()
                                .addTextColumn({ name: "id", caption: "jres:31150024 ", width: 3 }) //RC 31150024 : ID
                                .addIconColumn({
                                name: "typ",
                                caption: "jres:31150025", //RC 31150025 : Typ
                                iconTemplate: (d) => {
                                    switch (d.typ?.toUpperCase()) {
                                        case "E": return { icon: "fa-times-circle  g-state-text g-state-error", text: "jres:31150026" }; //RC 31150026 : Chyba
                                        case "W": return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:31150027" }; //RC 31150027 : Varování
                                        case "I": return { icon: "fa-info-circle g-state-text g-state-info", text: "jres:31150028" }; //RC 31150028 : Informace
                                        default: return null;
                                    }
                                }
                            })
                                .addTextColumn({ name: "text", caption: "jres:31150029", width: 10 }), //RC 31150029 : Text
                        });
                    })
                        .always(() => { this.endOperation(); });
                }
                showTypOdpovediDlg(typKom) {
                    const DB = Gordic.Ginis.DbModel;
                    this.beginOperation();
                    return DB.GIisspZpusobVolaniEnumValues()
                        .then((metas) => {
                        const def = $.Deferred();
                        const form = new Gordic.Forms.Form()
                            .addRow("jres:31150030") //RC 31150030 : Typ odpovědi
                            .addField("gradio", {
                            name: "zpusob_volani",
                            itemClass: "w-12",
                            validators: [new Gordic.Validators.Required()],
                            radios: [
                                {
                                    value: 30 /* DB.GIisspZpusobVolaniEnum.simulace_schvaleno */,
                                    label: metas.find(m => m.value === 30 /* DB.GIisspZpusobVolaniEnum.simulace_schvaleno */)?.meta.zpusob_volani_txt ?? "Schvaleno",
                                },
                                {
                                    value: 40 /* DB.GIisspZpusobVolaniEnum.simulace_schvaleno_s_vyhradou */,
                                    label: metas.find(m => m.value === 40 /* DB.GIisspZpusobVolaniEnum.simulace_schvaleno_s_vyhradou */)?.meta.zpusob_volani_txt ?? "Schvaleno s vyhradou"
                                },
                                {
                                    value: 50 /* DB.GIisspZpusobVolaniEnum.simulace_zamitnuto */,
                                    label: metas.find(m => m.value === 50 /* DB.GIisspZpusobVolaniEnum.simulace_zamitnuto */)?.meta.zpusob_volani_txt ?? "Zamitnuto"
                                },
                                {
                                    value: 10 /* DB.GIisspZpusobVolaniEnum.online */,
                                    label: metas.find(m => m.value === 10 /* DB.GIisspZpusobVolaniEnum.online */)?.meta.zpusob_volani_txt ?? "Volej online (bez simulace)",
                                    customClass: typKom === 8 /* DB.GEkoctiiEnum.vyber_uzivatele */ ? "" : "hidden"
                                },
                                {
                                    value: 20 /* DB.GIisspZpusobVolaniEnum.offline */,
                                    label: metas.find(m => m.value === 20 /* DB.GIisspZpusobVolaniEnum.offline */)?.meta.zpusob_volani_txt ?? "Volej offline (bez simulace)",
                                    customClass: typKom === 8 /* DB.GEkoctiiEnum.vyber_uzivatele */ ? "" : "hidden"
                                }
                            ]
                        })
                            .addRow("jres:31150031") //TODO: JRES //RC 31150031 : Použít pro celou hromadnou rezervaci
                            .addField("gcheck", {
                            name: "hromRez",
                            labelFromRow: "always",
                            disabled: true //TODO: Zatim jsme neresili
                        });
                        this.dialogs.simpleForm("Výběr typu komunikace IISSP", form)
                            .on("ok", (ev, dto) => {
                            def.resolve(dto);
                        })
                            .on("close", () => { def.reject(); });
                        return def.promise();
                    })
                        .always(() => { this.endOperation(); });
                }
            };
            GIisspPreuctovaniSkutecnosti = __decorate([
                Decorators.gcontent
            ], GIisspPreuctovaniSkutecnosti);
            WebControls.GIisspPreuctovaniSkutecnosti = GIisspPreuctovaniSkutecnosti;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
//#region Pokus pres pruvodce (asi je to kanon na vrabce)
/*
namespace Gordic.Iissp.WebControls {
    type GIisspZpusobVolaniEnum = Gordic.Ginis.DbModel.GIisspZpusobVolaniEnum;
    interface GDialogVyberOdpovedContext {
        zpusob_volani?: GIisspZpusobVolaniEnum;
        hromadne?: boolean;
    }

    @Decorators.gcontent
    export class GIsspPreuctovaniSkutecnostiWizard extends GContentBase implements IGClientContent {

        prepareContent(options: GIsspPreuctovaniSkutecnostiOptions): void {

            if (options.hromRez)
                throw new GError("hromRez is notImplemented");

            const DB = Gordic.Ginis.DbModel;
            const wizard = new Gordic.Wizard();

            this.beginOperation();
            this.isl.IisspTypKomunikace.read({ rok: options.rok, ico: options.ico }).get()
                .then((typCom) => {
                    const typ_kom_iissp = typCom.data.typ_kom_iissp!;
                    const startStep = (typ_kom_iissp === DB.GEkoctiiEnum.online || DB.GEkoctiiEnum.offline) ? 1 : 0;

                    wizard.create(
                        { content: this },
                        {
                            title: "Odeslani preuctovani skutecnosti", //TODO: JRES + spravny nazev!!!
                            //startStep: startStep,
                            steps: [
                                {
                                    id: "prep",
                                    caption: "Vyběr typu komunikace s IISSP", //TODO: JRES + spravny nazev!!!
                                    create: (cnt, div, change) => {
                                        this.beginOperation();
                                        return DB.GIisspZpusobVolaniEnumValues()
                                            .then((metas) => {
                                                const form = new Gordic.Forms.Form()
                                                    .addRow("Typ odpovedi") //TODO: JRES
                                                    .addField("gradio", {
                                                        name: "zpusob_volani",
                                                        validators: [new Gordic.Validators.Required()],
                                                        radios: [
                                                            {
                                                                value: DB.GIisspZpusobVolaniEnum.simulace_schvaleno,
                                                                label: metas.find(m => m.value === DB.GIisspZpusobVolaniEnum.simulace_schvaleno)?.meta.zpusob_volani_txt ?? "Schvaleno",
                                                            },
                                                            {
                                                                value: DB.GIisspZpusobVolaniEnum.simulace_schvaleno_s_vyhradou,
                                                                label: metas.find(m => m.value === DB.GIisspZpusobVolaniEnum.simulace_schvaleno_s_vyhradou)?.meta.zpusob_volani_txt ?? "Schvaleno s vyhradou"
                                                            },
                                                            {
                                                                value: DB.GIisspZpusobVolaniEnum.simulace_zamitnuto,
                                                                label: metas.find(m => m.value === DB.GIisspZpusobVolaniEnum.simulace_zamitnuto)?.meta.zpusob_volani_txt ?? "Zamitnuto"
                                                            },
                                                            {
                                                                value: DB.GIisspZpusobVolaniEnum.online,
                                                                label: metas.find(m => m.value === DB.GIisspZpusobVolaniEnum.online)?.meta.zpusob_volani_txt ?? "Volej online (bez simulace)",
                                                                customClass: typ_kom_iissp === DB.GEkoctiiEnum.vyber_uzivatele ? "" : "hidden"
                                                            },
                                                            {
                                                                value: DB.GIisspZpusobVolaniEnum.offline,
                                                                label: metas.find(m => m.value === DB.GIisspZpusobVolaniEnum.offline)?.meta.zpusob_volani_txt ?? "Volej offline (bez simulace)",
                                                                customClass: typ_kom_iissp === DB.GEkoctiiEnum.vyber_uzivatele ? "" : "hidden"
                                                            }
                                                        ]
                                                    })
                                                    .addRow("Pouzit pro celou hromadnou rezervaci") //TODO: JRES
                                                    .addField("gcheck", {
                                                        name: "hromadne", //TODO: Zjistit spravny nazev v DTO. Pustime v async. uloze?
                                                        labelFromRow: "always",
                                                        disabled: true //TODO: Zatim jsme neresili
                                                    });

                                                div.gform("createFrom", form);

                                                if (startStep === 1) {
                                                    div.findFields().gfield("model", "apply", {
                                                        zpusob_volani: typ_kom_iissp === DB.GEkoctiiEnum.online
                                                            ? DB.GIisspZpusobVolaniEnum.online : DB.GIisspZpusobVolaniEnum.offline
                                                    });
                                                    wizard.setStep(startStep)
                                                }
                                            })
                                            .always(() => this.endOperation());
                                    },
                                    change: (cnt, div, change) => {
                                        const ctx: GDialogVyberOdpovedContext = {};
                                        change["ctx"] = ctx;

                                        change.stepsEnable[1] = div.gform("isValid");
                                        div.gform().findFields().gfield("model", "collect", ctx);
                                    },
                                },
                                {
                                    id: "res",
                                    caption: "Vysledek komunikace s IISSP", //TODO: JRES + spravny nazev!!!
                                    create: (cnt, div, change) => {
                                        const ctx = change["ctx"] as GDialogVyberOdpovedContext;
                                        debugger;
                                        if (ctx.hromadne) throw new GError("hromadne is not implemented");

                                        const view = new Gordic.Data.View<Gordic.Iissp.Interface.GPolozkaDto>([], { key: "id" });
                                        this.isl.RozIissp.odeslaniPreuctovaniSkutecnosti({
                                            ico: options.ico,
                                            ucs: options.ucs,
                                            ixb: options.ixb,
                                            ixs_vkz: options.ixs_vkz,
                                            por_cislo: options.por_cislo,
                                            //zpusob_volani: ctx.zpusob_volani
                                        }).getData()//.get()
                                        //.then(d => {
                                        //    d.result.data.hlaseni?.polozka
                                        //    view.updateData(d.result.data.hlaseni?.polozka ?? []);
                                        //    debugger;
                                        //});

                                        $.newDiv().appendTo(div)
                                            .ggrid({
                                                columns: new Gordic.Data.GridFormat<Gordic.Iissp.Interface.GPolozkaDto>()
                                                    .addTextColumn({ name: "id", caption: "id " }) //TODO: JRES
                                                    .addIconColumn({
                                                        name: "typ",
                                                        caption: "typ", //TODO: JRES
                                                        iconTemplate: (d) => {
                                                            switch (d.typ?.toUpperCase()) {
                                                                case "E": return { icon: "fa-times-circle  g-state-text g-state-error", text: "Chyba" }; //TODO: JRES
                                                                case "W": return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "Varovani" }; //TODO: JRES
                                                                case "I": return { icon: "fa-info-circle g-state-text g-state-info", text: "Informace" }; //TODO: JRES
                                                                default: return null;
                                                            }
                                                        }
                                                    })
                                                    .addTextColumn({ name: "text", caption: "text" }), //TODO: JRES
                                                data: view
                                            });

                                        this.beginOperation();

                                    },
                                    change: (cnt, div, change) => {
                                        change.stepsEnable[0] = false;
                                    }
                                }
                            ]
                        });
                })
                .always(() => this.endOperation());
        }
    }
}
*/
//#endregion
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * Porovnani stavu rezervace, v TK: n:\ginis\Development\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GRezDetailTab.cs
             *
             * @author bmartinek
             * @since 52530.1
             */
            class GIisspRezDetail extends GContent {
                constructor() {
                    super(...arguments);
                    this.iconOtevreno = "gi-unlock";
                    this.iconUzavreno = "gi-lock";
                }
                prepareContent(options) {
                    this.options = options;
                    this.title = "jres:31150363".format(options.ixs_hpr); //RC 31150363 : Stav rezervac� p��padu {0} ve St�tn� pokladn�
                    //#region Bars
                    this.actions.addRange([
                        {
                            name: "overitStavAct",
                            caption: "jres:31150364", //RC 31150364 : Ov��it stav
                            run: () => { this.overitStav(); }
                        },
                        {
                            name: "porovnatAct",
                            caption: "jres:31150365", //RC 31150365 : Porovnat
                            run: () => { this.porovnat(); }
                        },
                        {
                            name: "showHistStavuAct",
                            caption: "jres:31150366", //RC 31150366 : Historie stav�
                            run: () => { this.showHistStavu(); }
                        },
                        {
                            name: "showHistVolaniAct",
                            caption: "jres:31150367", //RC 31150367 : Historie vol�n�
                            run: () => { this.showHistVolani(); }
                        },
                        {
                            name: "closeAct",
                            caption: GDlg.mbbClose.text,
                            run: () => { this.close(); }
                        }
                    ]);
                    this.menuBar(this.actions.createBar(["overitStavAct*", "porovnatAct*", "showHistStavuAct*", "showHistVolaniAct*"]));
                    this.commandBar(this.actions.createBar(["closeAct"]));
                    //#endregion
                    const ib = Gordic.Utils.IconBuilder.defaultInst;
                    const stavyRezervaciForm = new Gordic.Forms.Form()
                        .addRow("jres:31150369") //RC 31150369 : Rezervace
                        .addField("gselectbox", {
                        name: "stavyRezervaci",
                        dropdown: true,
                        strict: true,
                        graphicInput: "hidden",
                        model: "model.ixs_hpr=value.ixs_hpr;model.id_hdr=value.id_hdr;model.id_hdr_ris=value.id_hdr_ris",
                        itemTemplate: (r) => {
                            const rez = r;
                            const duplicita = !!(rez?.duplicitni_rezervace);
                            const item = $.newDiv().append(`<b>${r?.id_hdr}</b>|SP ${(ib.createIcon(rez?.s_rezsp_iissp ? this.iconUzavreno : this.iconOtevreno))}|${r?.id_hdr_ris}`);
                            if (duplicita)
                                $("<span style='margin-left: 0.25rem;'>")
                                    .appendTo(item)
                                    .gbadge({
                                    value: "jres:31150370", //RC 31150370 : duplicita
                                    customClass: "g-state-background g-state-error",
                                    tooltip: "jres:31150371" //RC 31150371 : ID IISSP nen� do GINIS zaneseno, rezervaci pros�m uzav�ete volbou Uzav��t rez.
                                });
                            else if (rez.in_ginis === 0) {
                                $("<span style='margin-left: 0.25rem;'>")
                                    .appendTo(item)
                                    .gbadge({
                                    value: "jres:31150372", //RC 31150372 : duplicita uzav�ena
                                    customClass: "g-state-background g-state-info",
                                    tooltip: "jres:31150373" //RC 31150373 : ID IISSP nen� do GINIS zaneseno, a rezervace byla v IISSP uzav�ena.
                                });
                            }
                            return item;
                        },
                        change: (ev, d) => {
                            if (!d.value)
                                return;
                            const { id_hdr, id_hdr_ris } = d.value;
                            if (id_hdr)
                                this.loadDetailsData(id_hdr, id_hdr_ris);
                        }
                    });
                    this.stavyRezervaciForm = $.newDiv().appendTo(this.element).gform("createFrom", stavyRezervaciForm);
                    const formDetail = new Gordic.Forms.Form({ layoutDescriptor: "L3M2S1 L-3-9-0, M-4-8-0, S-12-12-0" })
                        //1. sloupec
                        .addSection()
                        .addRow("jres:31150123") //RC 31150123 : Doklad
                        .addField("gstringbox", { name: "dokl_puv_cis", disabled: true })
                        .addRow("jres:31150124") //RC 31150124 : Typ
                        .addField("gselectbox", {
                        name: "typ_rezsp",
                        disabled: true,
                        data: [1, 3, 4],
                        itemTemplate: (v) => {
                            v = v ?? 0;
                            switch (v) {
                                case 1: return "jres:31150116"; //RC 31150116 : V�celet�
                                case 3: return "jres:31150115"; //RC 31150115 : Jednolet�
                                case 4: return "jres:31150114"; //RC 31150114 : O�ek. p��jmy
                                default: return "jres:31150113"; //RC 31150113 : N/A
                            }
                        }
                    })
                        .addRow("jres:31150125") //RC 31150125 : Druh
                        .addField("gstringbox", { name: "druh_rezsp", disabled: true })
                        .addRow("jres:31150126") //RC 31150126 : Stav
                        .addField("gselectbox", {
                        name: "s_rezsp_iissp",
                        disabled: true,
                        data: [-1, 0, 1],
                        itemTemplate: (v) => {
                            v = v ?? -1;
                            switch (v) {
                                case 0: return "jres:31150117"; //RC 31150117 : Otev�eno
                                case 1: return "jres:31150118"; //RC 31150118 : Uzav�eno
                                default: return "jres:31150119"; //RC 31150119 : N/A
                            }
                        }
                    })
                        //2. sloupec
                        .addSection()
                        .addRow("jres:31150127") //RC 31150127 : K �erp�n� od
                        .addField("gdatebox", { name: "dat_rad_iissp", disabled: true })
                        .addRow("jres:31150128") //RC 31150128 : ��slo VZ
                        .addField("gstringbox", { name: "cislo_vz_ca", disabled: true })
                        .addRow("jres:31150129") //RC 31150129 : PFK
                        .addField("gselectbox", {
                        name: "priz_pfk",
                        disabled: true,
                        dropdown: true,
                        data: ["0", "1"],
                        itemTemplate: (v) => {
                            v = v ?? "";
                            switch (v) {
                                case "0": return "jres:31150120"; //RC 31150120 : Ne
                                case "1": return "jres:31150121"; //RC 31150121 : Ano
                                default: return "jres:31150122"; //RC 31150122 : N/A
                            }
                        }
                    })
                        .addRow("jres:31150130") //RC 31150130 : Inkasn� platba
                        .addField("gselectbox", {
                        name: "priz_inkaso",
                        disabled: true,
                        dropdown: true,
                        data: ["0", "1", "N/A"],
                        defaultValue: "0",
                        itemTemplate: (v) => {
                            v = v ?? "0";
                            switch (v) {
                                case "0": return "jres:31150120"; //RC 31150120 : Ne
                                case "1": return "jres:31150121"; //RC 31150121 : Ano
                                default: return "jres:31150122"; //RC 31150122 : N/A
                            }
                        }
                    })
                        //3. sloupec
                        .addSection()
                        .addRow("jres:31150131") //RC 31150131 : Vlastn� ��et
                        .addField("gstringbox", { name: "bu_vl", disabled: true })
                        .addRow("jres:31150132") //RC 31150132 : Ciz� ��et
                        .addField("gselectbox", {
                        name: "buSkCi",
                        disabled: true,
                        model: "model.bu_ci=value.bu_ci;model.sk_ci=value.sk_ci",
                        itemTemplate: (v) => {
                            v = v ?? {};
                            let { bu_ci, sk_ci } = v;
                            bu_ci = bu_ci ?? null;
                            sk_ci = sk_ci ?? null;
                            if (bu_ci === "0000000000000000")
                                bu_ci = null;
                            if (bu_ci && sk_ci)
                                return `${bu_ci}/${sk_ci}`;
                            return "";
                        }
                    })
                        .addRow("jres:31150133") //RC 31150133 : Var. symbol
                        .addField("gstringbox", { name: "vs", disabled: true })
                        .addRow("jres:31150134") //RC 31150134 : Spec. symbol
                        .addField("gstringbox", { name: "ss", disabled: true })
                        //4. sloupec
                        .addSection()
                        .addRow("jres:31150137") //RC 31150137 : Zalo�en�
                        .addField("gdatebox", { name: "dat_zalozeni", disabled: true, valueType: "datetime" })
                        //5. sloupec
                        .addSection()
                        .addRow("jres:31150139") //RC 31150139 : Aktualizace
                        .addField("gdatebox", { name: "dat_akt", disabled: true, valueType: "datetime" })
                        //6. sloupec
                        .addSection()
                        .addRow("jres:31150141") //RC 31150141 : Stav IISSP k
                        .addField("gdatebox", { name: "dat_dotaz", disabled: true, valueType: "datetime" })
                        //pozn+popis
                        .addSection({ layoutDescriptor: "L3M2S1 L-1-11-0, M-2-10-0, S-12-12-0" })
                        .addRow("jres:31150135") //RC 31150135 : Pozn�mka
                        .addField("gstringbox", { name: "poznamka", disabled: true })
                        .addRow("jres:31150136") //RC 31150136 : Popis
                        .addField("gstringbox", { name: "popis", disabled: true, rows: 3 });
                    this.detailForm = $.newDiv().appendTo(this.element).gtab({
                        title: "jres:31150211", //RC 31150211 : Detail stavu
                        opened: true,
                    })
                        .gform("createFrom", formDetail);
                    this.view = new Gordic.Data.View([], { key: "ixs_hpr,id_hdr,id_hdr_ris,radek_hdr_ris" });
                    this.grid = $.newDiv();
                    $.newDiv().appendTo(this.element).gtab({
                        title: "jres:31150212", //RC 31150212 : Stav polo�ek
                        opened: true
                    }).append(this.grid);
                    this.grid.ggrid({
                        data: this.view,
                        columnMode: "full",
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "radek_hdr_ris",
                            caption: "#",
                            width: 50,
                            description: "jres:31150144" //RC 31150144 : ��dek IISSP
                        })
                            .addIconColumn({
                            name: "s_rezsp_isp",
                            caption: "jres:31150374", //RC 31150374 : S
                            width: 25,
                            description: "jres:31150148", //RC 31150148 : Stav IISSP � Otev�eno / Uzav�eno
                            iconTemplate: (d) => {
                                const s_rezsp_isp = d.s_rezsp_isp;
                                if (typeof s_rezsp_isp === "undefined")
                                    return null;
                                return s_rezsp_isp === 0
                                    ? { icon: this.iconOtevreno, text: "jres:31150149" } //RC 31150149 : Otev�eno
                                    : { icon: this.iconUzavreno, text: "jres:31150150" }; //RC 31150150 : Uzav�eno
                            }
                        })
                            .addTextColumn({ name: "isp_fim", caption: "jres:31150153", width: 70 }) //RC 31150153 : FIM
                            .addTextColumn({ name: "isp_zdr", caption: "jres:31150154", width: 70 }) //RC 31150154 : ZDR
                            .addTextColumn({ name: "isp_par", caption: "jres:31150155", width: 70 }) //RC 31150155 : PAR
                            .addTextColumn({ name: "isp_pol", caption: "jres:31150156", width: 70 }) //RC 31150156 : POL
                            .addTextColumn({ name: "isp_eds", caption: "jres:31150157", width: 70 }) //RC 31150157 : EDS
                            .addTextColumn({ name: "isp_pvs", caption: "jres:31150158", width: 90 }) //RC 31150158 : PVS
                            .addTextColumn({ name: "isp_ucl", caption: "jres:31150159", width: 70 }) //RC 31150159 : UCL
                            .addTextColumn({ name: "isp_zj", caption: "jres:31150160", width: 70 }) //RC 31150160 : ZJ
                            .addTextColumn({ name: "isp_uj", caption: "jres:31150161", width: 70 }) //RC 31150161 : UJ
                            .addTextColumn({ name: "isp_uz", caption: "jres:31150162", width: 70 }) //RC 31150162 : UZ
                            .addCurrencyColumn({ name: "c_rsp_isp", caption: "jres:31150375", width: 120 }) //RC 31150375 : Rezervov�no
                            .addCurrencyColumn({ name: "c_cerp_isp", caption: "jres:31150376", width: 120 }) //RC 31150376 : �erp�no
                            .addDateColumn({ name: "dat_spl", caption: "jres:31150170", width: 80 }) //RC 31150170 : Splatnost
                            .addTextColumn({ name: "popis", caption: "jres:31150171", width: 150 }) //RC 31150171 : Popis
                    });
                    this.reload(this.options.volatWebSluzbu);
                }
                /**  Kompletni reload okna. */
                reload(volatWebSluzbu) {
                    const options = this.options;
                    const nactiPripad = () => {
                        return this.isl.IisspRezervace.nactiPripadCommit({
                            data: {
                                ixs_hpr: options.ixs_hpr,
                                rok: options.rok,
                                ico: options.ico,
                                ucs: options.ucs
                            }
                        }).getData()
                            .then((r) => { });
                    };
                    const nactiStavRezervace = () => {
                        return this.isl.IisspStavRezervace.list({ filters: { ixs_hpr: options.ixs_hpr } }).getView();
                    };
                    const val = this.stavyRezervaciForm.findFields("stavyRezervaci").gfield("getValue");
                    this.beginOperation();
                    return $.when()
                        .then(() => { if (volatWebSluzbu)
                        return nactiPripad(); })
                        .then(() => { return nactiStavRezervace(); })
                        .then((view) => {
                        const d = view.getDataRows(false);
                        if (!volatWebSluzbu && (d.length === 0))
                            return nactiPripad().then(() => { return nactiStavRezervace(); });
                        return view;
                    })
                        .then((view) => {
                        const d = view.getDataRows(false)[0];
                        const stavyRezervaciField = this.stavyRezervaciForm.findFields("stavyRezervaci");
                        stavyRezervaciField.gfield("option", "data", view);
                        if (d && !stavyRezervaciField.gfield("hasValue")) {
                            if (options.ixs_hpr && options.id_hdr && options.id_hdr_ris) {
                                stavyRezervaciField.gfield("model", "apply", { ixs_hpr: options.ixs_hpr, id_hdr: options.id_hdr, id_hdr_ris: options.id_hdr_ris });
                            }
                            else {
                                stavyRezervaciField.gfield("setValue", d);
                            }
                        }
                        else if (val) {
                            stavyRezervaciField
                                .gfield("clear")
                                .gfield("model", "apply", { ixs_hpr: val.ixs_hpr, id_hdr: val.id_hdr, id_hdr_ris: val.id_hdr_ris });
                        }
                        return view;
                    })
                        .always(() => { this.endOperation(); });
                }
                /** Nacteni detailu */
                loadDetailsData(id_hdr, id_hdr_ris) {
                    const options = this.options;
                    this.beginOperation();
                    return this.isl.IisspStavRezervace.read({
                        ixs_hpr: options.ixs_hpr,
                        id_hdr: id_hdr, //bere se z dropdown???
                        id_hdr_ris: id_hdr_ris
                    })
                        .getData()
                        .then((d) => {
                        this.detailForm.findFields().gfield("model", "apply", d);
                    })
                        .then(() => {
                        return this.isl.IisspStavRezervace.polozky_List({
                            filters: {
                                ixs_hpr: options.ixs_hpr,
                                id_hdr: id_hdr,
                                id_hdr_ris: id_hdr_ris
                            }
                        }).getData();
                    })
                        .then((r) => { this.view.updateData(r); })
                        .always(() => { this.endOperation(); });
                }
                overitStav() {
                    const { ixs_hpr, rok, ico, ucs } = this.options;
                    this.beginOperation();
                    this.isl.IisspRezervace.nactiPripadCommit({ ixs_hpr: ixs_hpr, rok: rok, ico: ico, ucs: ucs }).get()
                        .then((r) => {
                        this.showFlash("jres:31150368"); //RC 31150368 : Stav �sp�n� na�ten z IISSP.
                        this.reload(false);
                    })
                        .always(() => { this.endOperation(); });
                }
                porovnat() {
                    const to = this.options;
                    const options = {
                        ixs_hpr: to.ixs_hpr,
                        id_hdr: to.id_hdr,
                        id_hdr_ris: to.id_hdr_ris,
                        radek_hdr_ris: to.radek_hdr_ris,
                        ico: to.ico,
                        ucs: to.ucs,
                        rok: to.rok,
                        volatWebSluzbu: to.volatWebSluzbu,
                    };
                    this.navigate([Gordic.Iissp.WebControls.GIisspRezDetailExt, { uid: "GIisspRezDetailExt#" }], options);
                }
                showHistStavu() {
                    const options = { ixs_hpr: this.options.ixs_hpr };
                    this.navigate(WebControls.GIisspRezHistory, options);
                }
                showHistVolani() {
                    const options = { ixs_hpr: this.options.ixs_hpr };
                    this.navigate([WebControls.GIisspRezWsCallHistory, { uid: "GIisspRezWsCallHistory#" }], options);
                }
            }
            WebControls.GIisspRezDetail = GIisspRezDetail;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * Detail rezervace (v TK ekv. N:\GINIS\489\DEV\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GRezDetailExtTab.cs)
             *
             * @author bmartinek
             * @since 490.1.0.24
             */
            class GIisspRezDetailExt extends GContent {
                constructor() {
                    super(...arguments);
                    this.iconOtevreno = "gi-unlock";
                    this.iconUzavreno = "gi-lock";
                }
                prepareContent(options) {
                    this.options = options;
                    this.title = "jres:31150179".format(options.ixs_hpr); //RC 31150179 : Porovnání stavu rezervace případu {0} - IISSP vs. GINIS
                    //#region Bars
                    this.actions.addRange([
                        {
                            name: "overitStavAct",
                            caption: "jres:31150172", //RC 31150172 : Ověřit stav
                            run: () => { this.overitStav(); }
                            //    run: () => {
                            //        const value = this.detailForm.findFields("stavyRezervaci").gfield("getValue") as Gordic.Iissp.Interface.GIisspStavRezervaceDto;
                            //        const id_hdr = value?.id_hdr;
                            //        if (id_hdr) this.loadData(id_hdr);
                            //    }
                        },
                        {
                            name: "showHistStavuAct",
                            caption: "jres:31150173", //RC 31150173 : Historie stavů
                            run: () => { this.showHistStavu(); }
                        },
                        {
                            name: "uzavritAct",
                            caption: "jres:31150174", //RC 31150174 : Uzavřít
                            run: () => { this.uzavrit(); }
                        },
                        {
                            name: "showHistVolaniAct",
                            caption: "jres:31150175", //RC 31150175 : Historie volání
                            run: () => { this.showHistVolani(); }
                        },
                        {
                            name: "uzavritRezAct",
                            caption: "jres:31150176", //RC 31150176 : Uzavřít rezervaci
                            enabled: false,
                            run: () => { this.uzavritRez(); }
                        },
                        {
                            name: "otevritRezAct",
                            caption: "jres:31150177", //RC 31150177 : Otevřít rezervaci
                            enabled: false,
                            run: () => { this.otevritRez(); }
                        },
                        {
                            name: "closeAct",
                            caption: GDlg.mbbClose.text,
                            run: () => { this.close(); }
                        }
                    ]);
                    this.menuBar(this.actions.createBar(["overitStavAct*", "showHistStavuAct*", "uzavritAct*", "showHistVolaniAct*", "uzavritRezAct*", "otevritRezAct*"]));
                    this.commandBar(this.actions.createBar(["closeAct"]));
                    //#endregion
                    const ib = Gordic.Utils.IconBuilder.defaultInst;
                    const stavyRezervaciForm = new Gordic.Forms.Form()
                        .addRow("jres:31150210") //RC 31150210 : Rezervace
                        .addField("gselectbox", {
                        name: "stavyRezervaci",
                        dropdown: true,
                        strict: true,
                        graphicInput: "hidden",
                        model: "model.ixs_hpr=value.ixs_hpr;model.id_hdr=value.id_hdr;model.id_hdr_ris=value.id_hdr_ris",
                        itemTemplate: (r) => {
                            const rez = r;
                            const duplicita = !!(rez?.duplicitni_rezervace);
                            const item = $.newDiv().append(`<b>${r?.id_hdr}</b>|SP ${(ib.createIcon(rez?.s_rezsp_iissp ? this.iconUzavreno : this.iconOtevreno))}|G ${(ib.createIcon(r?.s_rezsp_gin ? this.iconUzavreno : this.iconOtevreno))}|${r?.id_hdr_ris}`);
                            if (duplicita)
                                $("<span style='margin-left: 0.25rem;'>")
                                    .appendTo(item)
                                    .gbadge({
                                    value: "jres:31150276", //RC 31150276 : duplicita
                                    customClass: "g-state-background g-state-error",
                                    tooltip: "jres:31150249" //RC 31150249 : ID IISSP není do GINIS zaneseno, rezervaci prosím uzavřete volbou Uzavřít rez.
                                });
                            else if (rez.in_ginis === 0) {
                                $("<span style='margin-left: 0.25rem;'>")
                                    .appendTo(item)
                                    .gbadge({
                                    value: "jres:31150275", //RC 31150275 : duplicita uzavřena
                                    customClass: "g-state-background g-state-info",
                                    tooltip: "jres:31150250" //RC 31150250 : ID IISSP není do GINIS zaneseno, a rezervace byla v IISSP uzavřena.
                                });
                            }
                            return item;
                        },
                        change: (ev, d) => {
                            if (!d.value)
                                return;
                            const { id_hdr, id_hdr_ris } = d.value;
                            if (id_hdr)
                                this.loadDetailsData(id_hdr, id_hdr_ris);
                        }
                    });
                    this.stavyRezervaciForm = $.newDiv().appendTo(this.element).gform("createFrom", stavyRezervaciForm);
                    const formDetail = new Gordic.Forms.Form({ layoutDescriptor: "L3M2S1 L-3-9-0, M-4-8-0, S-12-12-0" })
                        //1. sloupec
                        .addSection()
                        .addRow("jres:31150123") //RC 31150123 : Doklad
                        .addField("gstringbox", { name: "dokl_puv_cis", disabled: true })
                        .addRow("jres:31150124") //RC 31150124 : Typ
                        .addField("gselectbox", {
                        name: "typ_rezsp",
                        disabled: true,
                        data: [1, 3, 4],
                        itemTemplate: (v) => {
                            v = v ?? 0;
                            switch (v) {
                                case 1: return "jres:31150116"; //RC 31150116 : Víceletá
                                case 3: return "jres:31150115"; //RC 31150115 : Jednoletá
                                case 4: return "jres:31150114"; //RC 31150114 : Oček. příjmy
                                default: return "jres:31150113"; //RC 31150113 : N/A
                            }
                        }
                    })
                        .addRow("jres:31150125") //RC 31150125 : Druh
                        .addField("gstringbox", { name: "druh_rezsp", disabled: true })
                        .addRow("jres:31150126") //RC 31150126 : Stav
                        .addField("gselectbox", {
                        name: "s_rezsp_iissp",
                        disabled: true,
                        data: [-1, 0, 1],
                        itemTemplate: (v) => {
                            v = v ?? -1;
                            switch (v) {
                                case 0: return "jres:31150117"; //RC 31150117 : Otevřeno
                                case 1: return "jres:31150118"; //RC 31150118 : Uzavřeno
                                default: return "jres:31150119"; //RC 31150119 : N/A
                            }
                        }
                    })
                        //2. sloupec
                        .addSection()
                        .addRow("jres:31150127") //RC 31150127 : K čerpání od
                        .addField("gdatebox", { name: "dat_rad_iissp", disabled: true })
                        .addRow("jres:31150128") //RC 31150128 : Číslo VZ
                        .addField("gstringbox", { name: "cislo_vz_ca", disabled: true })
                        .addRow("jres:31150129") //RC 31150129 : PFK
                        .addField("gselectbox", {
                        name: "priz_pfk",
                        disabled: true,
                        dropdown: true,
                        data: ["0", "1"],
                        itemTemplate: (v) => {
                            v = v ?? "";
                            switch (v) {
                                case "0": return "jres:31150120"; //RC 31150120 : Ne
                                case "1": return "jres:31150121"; //RC 31150121 : Ano
                                default: return "jres:31150122"; //RC 31150122 : N/A
                            }
                        }
                    })
                        .addRow("jres:31150130") //RC 31150130 : Inkasní platba
                        .addField("gselectbox", {
                        name: "priz_inkaso",
                        disabled: true,
                        dropdown: true,
                        data: ["0", "1", "N/A"],
                        defaultValue: "0",
                        itemTemplate: (v) => {
                            v = v ?? "0";
                            switch (v) {
                                case "0": return "jres:31150120"; //RC 31150120 : Ne
                                case "1": return "jres:31150121"; //RC 31150121 : Ano
                                default: return "jres:31150122"; //RC 31150122 : N/A
                            }
                        }
                    })
                        //3. sloupec
                        .addSection()
                        .addRow("jres:31150131") //RC 31150131 : Vlastní účet
                        .addField("gstringbox", { name: "bu_vl", disabled: true })
                        .addRow("jres:31150132") //RC 31150132 : Cizí účet
                        .addField("gselectbox", {
                        name: "buSkCi",
                        disabled: true,
                        model: "model.bu_ci=value.bu_ci;model.sk_ci=value.sk_ci",
                        itemTemplate: (v) => {
                            v = v ?? {};
                            let { bu_ci, sk_ci } = v;
                            bu_ci = bu_ci ?? null;
                            sk_ci = sk_ci ?? null;
                            if (bu_ci === "0000000000000000")
                                bu_ci = null;
                            if (bu_ci && sk_ci)
                                return `${bu_ci}/${sk_ci}`;
                            return "";
                        }
                    })
                        .addRow("jres:31150133") //RC 31150133 : Var. symbol
                        .addField("gstringbox", { name: "vs", disabled: true })
                        .addRow("jres:31150134") //RC 31150134 : Spec. symbol
                        .addField("gstringbox", { name: "ss", disabled: true })
                        //4. sloupec
                        .addSection()
                        .addRow("jres:31150137") //RC 31150137 : Založení
                        .addField("gdatebox", { name: "dat_zalozeni", disabled: true, valueType: "datetime" })
                        .addRow("jres:31150138") //RC 31150138 : Stav GINIS
                        .addField("gselectbox", {
                        name: "s_rezsp_gin",
                        disabled: true,
                        itemTemplate: (v) => {
                            v = v ?? -1;
                            switch (v) {
                                case 0: return "jres:31150117"; //RC 31150117 : Otevřeno
                                case 1: return "jres:31150118"; //RC 31150118 : Uzavřeno
                                default: return "jres:31150119"; //RC 31150119 : N/A
                            }
                        }
                    })
                        //5. sloupec
                        .addSection()
                        .addRow("jres:31150139") //RC 31150139 : Aktualizace
                        .addField("gdatebox", { name: "dat_akt", disabled: true, valueType: "datetime" })
                        .addRow("jres:31150140") //RC 31150140 : Stav odeslání
                        .addField("gstringbox", { name: "stav_odeslani", disabled: true })
                        //6. sloupec
                        .addSection()
                        .addRow("jres:31150141") //RC 31150141 : Stav IISSP k
                        .addField("gdatebox", { name: "dat_dotaz", disabled: true, valueType: "datetime" })
                        .addRow("jres:31150142") //RC 31150142 : Rok
                        .addField("gnumberbox", { name: "rok", disabled: true })
                        //pozn+popis
                        .addSection({ layoutDescriptor: "L3M2S1 L-1-11-0, M-2-10-0, S-12-12-0" })
                        .addRow("jres:31150135") //RC 31150135 : Poznámka
                        .addField("gstringbox", { name: "poznamka", disabled: true })
                        .addRow("jres:31150136") //RC 31150136 : Popis
                        .addField("gstringbox", { name: "popis", disabled: true, rows: 3 });
                    this.detailForm = $.newDiv().appendTo(this.element).gtab({
                        title: "jres:31150211", //RC 31150211 : Detail stavu
                        opened: true,
                    })
                        .gform("createFrom", formDetail);
                    this.view = new Gordic.Data.View([], { key: "ixs_hpr,id_hdr,id_hdr_ris,radek_hdr_ris" });
                    this.grid = $.newDiv();
                    $.newDiv().appendTo(this.element).gtab({
                        title: "jres:31150212", //RC 31150212 : Stav položek
                        opened: true
                    }).append(this.grid);
                    this.grid.ggrid({
                        data: this.view,
                        columnMode: "full",
                        columns: new Gordic.Data.GridFormat()
                            //NOTE (BM): Zakomentovano po domluve s JVacha
                            //.addIconColumn({
                            //    name: "stav_radku",
                            //    caption: "jres:31150377", //RC 31150377 : Stav
                            //    iconTemplate: (d) => {
                            //        //NOTE: Je to ekvivalent sloupce c_rsp_isp_icon
                            //        if (!d) return null;
                            //        if (d.s_rezsp_isp === 1 && d.c_rsp_gin && parseDecimal(d.c_rsp_gin).eq(0)) return null;
                            //        if (d.s_vyriz_rezsp === null || typeof d.s_vyriz_rezsp === "undefined") return null;
                            //        if (d.c_rsp_isp && d.c_rsp_gin !== d.c_rsp_isp) {
                            //            if (d.s_vyriz_rezsp > 0) return {
                            //                icon: "fa-exclamation-circle g-state-text g-state-error",
                            //                text: "jres:31150251" //RC 31150251 : Stavy rezervací v GINIS a IISSP nesouhlasí!
                            //            };
                            //        }
                            //        return null;
                            //    }
                            //})
                            .addNumberColumn({
                            name: "radek_hdr_ris",
                            caption: "jres:31150143", //RC 31150143 : Ř. SP
                            width: 50,
                            description: "jres:31150144" //RC 31150144 : Řádek IISSP
                        })
                            .addNumberColumn({
                            name: "radek_hdr",
                            caption: "jres:31150145", //RC 31150145 : Ř. GIN
                            width: 50,
                            description: "jres:31150146" //RC 31150146 : Řádek GINIS
                        })
                            .addIconColumn({
                            name: "s_rezsp_isp",
                            caption: "jres:31150147", //RC 31150147 : SI
                            width: 25,
                            description: "jres:31150148", //RC 31150148 : Stav IISSP – Otevřeno / Uzavřeno
                            iconTemplate: (d) => {
                                const s_rezsp_isp = d.s_rezsp_isp;
                                if (typeof s_rezsp_isp === "undefined")
                                    return null;
                                return s_rezsp_isp === 0
                                    ? { icon: this.iconOtevreno, text: "jres:31150149" } //RC 31150149 : Otevřeno
                                    : { icon: this.iconUzavreno, text: "jres:31150150" }; //RC 31150150 : Uzavřeno
                            }
                        })
                            .addIconColumn({
                            name: "s_rezsp_gin",
                            caption: "jres:31150151", //RC 31150151 : SG
                            width: 25,
                            description: "jres:31150152", //RC 31150152 : Stav GINIS – Otevřeno / Uzavřeno
                            iconTemplate: (d) => {
                                const s_rezsp_gin = d.s_rezsp_gin;
                                if (typeof s_rezsp_gin === "undefined")
                                    return null;
                                return s_rezsp_gin === 0
                                    ? { icon: this.iconOtevreno, text: "jres:31150149" } //RC 31150149 : Otevřeno
                                    : { icon: this.iconUzavreno, text: "jres:31150150" }; //RC 31150150 : Uzavřeno
                            }
                        })
                            .addTextColumn({ name: "isp_fim", caption: "jres:31150153", width: 70 }) //RC 31150153 : FIM
                            .addTextColumn({ name: "isp_zdr", caption: "jres:31150154", width: 70 }) //RC 31150154 : ZDR
                            .addTextColumn({ name: "isp_par", caption: "jres:31150155", width: 70 }) //RC 31150155 : PAR
                            .addTextColumn({ name: "isp_pol", caption: "jres:31150156", width: 70 }) //RC 31150156 : POL
                            .addTextColumn({ name: "isp_eds", caption: "jres:31150157", width: 70 }) //RC 31150157 : EDS
                            .addTextColumn({ name: "isp_pvs", caption: "jres:31150158", width: 90 }) //RC 31150158 : PVS
                            .addTextColumn({ name: "isp_ucl", caption: "jres:31150159", width: 70 }) //RC 31150159 : UCL
                            .addTextColumn({ name: "isp_zj", caption: "jres:31150160", width: 70 }) //RC 31150160 : ZJ
                            .addTextColumn({ name: "isp_uj", caption: "jres:31150161", width: 70 }) //RC 31150161 : UJ
                            .addTextColumn({ name: "isp_uz", caption: "jres:31150162", width: 70 }) //RC 31150162 : UZ
                            .addCurrencyColumn({ name: "c_rsp_gin", caption: "jres:31150163", width: 120 }) //RC 31150163 : Prostředky GINIS
                            .addIconColumn({
                            name: "c_rsp_isp_icon",
                            caption: "jres:31150378", //RC 31150378 : SR
                            description: "jres:31150383", //RC 31150383 : Stav rezervace
                            iconTemplate: (d) => {
                                if (!d)
                                    return null;
                                if (d.s_rezsp_isp === 1 && d.c_rsp_gin && parseDecimal(d.c_rsp_gin).eq(0))
                                    return { icon: "gi-key", text: "jres:31150252" }; //RC 31150252 : Položka snížena na úrověň čerpání a je uzavřena v GINIS i IISSP.
                                if (d.s_vyriz_rezsp === null || typeof d.s_vyriz_rezsp === "undefined")
                                    return null;
                                if (d.c_rsp_isp && d.c_rsp_gin !== d.c_rsp_isp) {
                                    if (d.s_vyriz_rezsp > 0)
                                        return { icon: "fa-exclamation-circle g-state-text g-state-error", text: "jres:31150253" }; //RC 31150253 : Stavy rezervací v GINIS a IISSP nesouhlasí!
                                    return { icon: "fa-check-circle g-state-text g-state-warning", text: "jres:31150254" }; //RC 31150254 : Rezervaci je nutné aktualizovat do IISSP.
                                }
                                return null;
                            }
                        })
                            .addCurrencyColumn({ name: "c_rsp_isp", caption: "jres:31150164", width: 120 }) //RC 31150164 : Rezervováno SP
                            .addCurrencyColumn({ name: "c_cerp_xma", caption: "jres:31150165", width: 130 }) //RC 31150165 : Čerpáno GINIS deník
                            .addIconColumn({
                            name: "c_cerp_gin_icon",
                            caption: "jres:31150379", //RC 31150379 : G PRSK
                            description: "jres:31150382", //RC 31150382 : Stav GINIS PRSK
                            iconTemplate: (d) => {
                                if (!d)
                                    return null;
                                if (d.s_vyriz_rezsp === null || typeof d.s_vyriz_rezsp === "undefined")
                                    return null;
                                if (d.c_cerp_xma !== d.c_cerp_gin)
                                    return { icon: "fa-check-circle g-state-text g-state-warning fa-exclamation-triangle g-state-text g-state-warning", text: "jres:31150255" }; //RC 31150255 : Není proveden přepočet stavů PRSK.
                                return null;
                            }
                        })
                            .addCurrencyColumn({ name: "c_cerp_gin", caption: "jres:31150166", width: 130 }) //RC 31150166 : Čerpáno GINIS PRSK
                            .addIconColumn({
                            name: "c_cerp_isp_icon",
                            caption: "jres:31150380", //RC 31150380 : SP PRSK
                            description: "jres:31150381", //RC 31150381 : Stav IISSP PRSK
                            iconTemplate: (d) => {
                                if (!d)
                                    return null;
                                if (d.s_vyriz_rezsp === null || typeof d.s_vyriz_rezsp === "undefined")
                                    return null;
                                if (d.c_cerp_gin !== d.c_cerp_isp)
                                    return { icon: "fa-check-circle g-state-text g-state-warning fa-exclamation-triangle g-state-text g-state-warning", text: "jres:31150256" }; //RC 31150256 : Není provedeno přeúčtování skutečnosti v IISSP.
                                return null;
                            }
                        })
                            .addCurrencyColumn({ name: "c_cerp_isp", caption: "jres:31150167", width: 120 }) //RC 31150167 : Čerpáno SP
                            .addCurrencyColumn({ name: "k_uvolneni", caption: "jres:31150168", width: 130 }) //RC 31150168 : K uvolnění
                            .addTextColumn({ name: "denmes", caption: "jres:31150169", width: 60 }) //RC 31150169 : Dat.čerp.
                            .addDateColumn({ name: "dat_spl", caption: "jres:31150170", width: 80 }) //RC 31150170 : Splatnost
                            .addTextColumn({ name: "popis", caption: "jres:31150171", width: 150 }) //RC 31150171 : Popis
                    });
                    this.reload(this.options.volatWebSluzbu);
                }
                /**  Kompletni reload okna. */
                reload(volatWebSluzbu) {
                    const options = this.options;
                    const nactiPripad = () => {
                        return this.isl.IisspRezervace.nactiPripadCommit({
                            data: {
                                ixs_hpr: options.ixs_hpr,
                                rok: options.rok,
                                ico: options.ico,
                                ucs: options.ucs
                            }
                        }).getData()
                            .then((r) => { });
                    };
                    const nactiStavRezervace = () => {
                        return this.isl.IisspStavRezervace.list({ filters: { ixs_hpr: options.ixs_hpr } }).getView();
                    };
                    const val = this.stavyRezervaciForm.findFields("stavyRezervaci").gfield("getValue");
                    this.beginOperation();
                    return $.when()
                        .then(() => { if (volatWebSluzbu)
                        return nactiPripad(); })
                        .then(() => { return nactiStavRezervace(); })
                        .then((view) => {
                        const d = view.getDataRows(false);
                        if (!volatWebSluzbu && (d.length === 0))
                            return nactiPripad().then(() => { return nactiStavRezervace(); });
                        return view;
                    })
                        .then((view) => {
                        const d = view.getDataRows(false)[0];
                        const stavyRezervaciField = this.stavyRezervaciForm.findFields("stavyRezervaci");
                        stavyRezervaciField.gfield("option", "data", view);
                        if (d && !stavyRezervaciField.gfield("hasValue")) {
                            if (options.ixs_hpr && options.id_hdr && options.id_hdr_ris) {
                                stavyRezervaciField.gfield("model", "apply", { ixs_hpr: options.ixs_hpr, id_hdr: options.id_hdr, id_hdr_ris: options.id_hdr_ris });
                            }
                            else {
                                stavyRezervaciField.gfield("setValue", d);
                            }
                        }
                        else if (val) {
                            stavyRezervaciField
                                .gfield("clear")
                                .gfield("model", "apply", { ixs_hpr: val.ixs_hpr, id_hdr: val.id_hdr, id_hdr_ris: val.id_hdr_ris });
                        }
                        return view;
                    })
                        .always(() => { this.endOperation(); });
                }
                /** Nacteni detailu */
                loadDetailsData(id_hdr, id_hdr_ris) {
                    const options = this.options;
                    this.beginOperation();
                    return this.isl.IisspStavRezervace.read({
                        ixs_hpr: options.ixs_hpr,
                        id_hdr: id_hdr, //bere se z dropdown???
                        id_hdr_ris: id_hdr_ris
                    })
                        .getData()
                        .then((d) => {
                        if (d.Permissions?.LzeOtevrit)
                            this.actions["otevritRezAct"].updatePermission(d.Permissions.LzeOtevrit);
                        if (d.Permissions?.LzeUzavrit)
                            this.actions["uzavritRezAct"].updatePermission(d.Permissions.LzeUzavrit);
                        this.detailForm.findFields().gfield("model", "apply", d);
                    })
                        .then(() => {
                        return this.isl.IisspStavRezervace.polozky_List({
                            filters: {
                                ixs_hpr: options.ixs_hpr,
                                id_hdr: id_hdr,
                                id_hdr_ris: id_hdr_ris
                            }
                        }).getData();
                    })
                        .then((r) => { this.view.updateData(r); })
                        .always(() => { this.endOperation(); });
                }
                overitStav() {
                    const { ixs_hpr, rok, ico, ucs } = this.options;
                    this.beginOperation();
                    this.isl.IisspRezervace.nactiPripadCommit({ ixs_hpr: ixs_hpr, rok: rok, ico: ico, ucs: ucs }).get()
                        .then((r) => {
                        this.showFlash("jres:31150257"); //RC 31150257 : Stav úspěšně načten z IISSP.
                        this.reload(false);
                    })
                        .always(() => { this.endOperation(); });
                }
                showHistStavu() {
                    const options = { ixs_hpr: this.options.ixs_hpr };
                    this.navigate(WebControls.GIisspRezHistory, options);
                }
                uzavrit() {
                    const { ixs_hpr, rok, ico, ucs } = this.options;
                    this.beginOperation();
                    this.isl.IisspRezervace.uzavriPripadCommit({ ixs_hpr: ixs_hpr, rok: rok, ico: ico, ucs: ucs }).get()
                        .then((r) => { return this.dialogs.alert("jres:31150207".format(ixs_hpr)).createDialogPromise(); }) //RC 31150207 : Případ {0} byl v IISSP uzavřen.
                        .then(() => { this.reload(true); })
                        .always(() => { this.endOperation(); });
                }
                uzavritRez() {
                    const { ixs_hpr, rok, ico, ucs } = this.options;
                    const value = this.stavyRezervaciForm.findFields("stavyRezervaci").gfield("getValue");
                    const id_hdr_ris = value?.id_hdr_ris;
                    const id_hdr = value?.id_hdr;
                    if (!id_hdr_ris || !id_hdr)
                        return;
                    this.beginOperation();
                    this.isl.IisspRezervace.uzavriRezervaciCommit({
                        ixs_hpr: ixs_hpr,
                        id_hdr: id_hdr,
                        id_hdr_ris: id_hdr_ris,
                        rok: rok,
                        ico: ico,
                        ucs: ucs
                    })
                        .get()
                        .then((r) => { this.dialogs.alert("jres:31150208").createDialogPromise(); }) //RC 31150208 : Rezervace byla uzavřena.
                        .then(() => { this.reload(true); })
                        .always(() => { this.endOperation(); });
                }
                otevritRez() {
                    const { ixs_hpr, rok, ico, ucs } = this.options;
                    const value = this.stavyRezervaciForm.findFields("stavyRezervaci").gfield("getValue");
                    const id_hdr_ris = value?.id_hdr_ris;
                    const id_hdr = value?.id_hdr;
                    if (!id_hdr_ris || !id_hdr)
                        return;
                    this.beginOperation();
                    this.isl.IisspRezervace.otevriRezervaciCommit({
                        ixs_hpr: ixs_hpr,
                        id_hdr: id_hdr,
                        id_hdr_ris: id_hdr_ris,
                        rok: rok,
                        ico: ico,
                        ucs: ucs
                    })
                        .get()
                        .then((r) => { this.dialogs.alert("jres:31150209").createDialogPromise(); }) //RC 31150209 : Rezervace byla otevřena.
                        .then((r) => { this.reload(true); })
                        .always(() => { this.endOperation(); });
                }
                showHistVolani() {
                    const options = { ixs_hpr: this.options.ixs_hpr };
                    this.navigate([WebControls.GIisspRezWsCallHistory, { uid: "GIisspRezWsCallHistory#" }], options);
                }
            }
            WebControls.GIisspRezDetailExt = GIisspRezDetailExt;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            class GIisspRezHistory extends GContent {
                constructor() {
                    super(...arguments);
                    this.iconOtevreno = "gi-unlock";
                    this.iconUzavreno = "gi-lock";
                }
                prepareContent(options) {
                    const ixs_hpr = options.ixs_hpr;
                    this.title = "jres:31150178".format(ixs_hpr); //RC 31150178 : Historie stavu rezervací případu {0} ve Státní pokladně
                    this.commandBar([{
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: () => { this.close(); }
                            })
                        }]);
                    this.beginOperation();
                    this.isl.IisspStavRezervace.historiePolozek_List({ filters: { ixs_hpr: ixs_hpr } }).getView()
                        .then((view) => {
                        $.newDiv().appendTo(this.element)
                            .ggrid({
                            columnMode: "full",
                            data: view,
                            columns: new Gordic.Data.GridFormat()
                                .addNumberColumn({
                                name: "id_volani_ssp",
                                caption: "jres:31150180", //RC 31150180 : Dotaz #
                                width: 60,
                                description: "jres:31150181" //RC 31150181 : ID dotazu na stav v IISSP
                            })
                                .addDateTimeColumn({ name: "dat_dotaz_dokl", caption: "jres:31150182", width: 150 }) //RC 31150182 : Datum dotazu
                                .addNumberColumn({
                                name: "id_hdr",
                                caption: "jres:31150183", //RC 31150183 : #D
                                width: 35,
                                description: "jres:31150184" //RC 31150184 : ID dokladu GINIS
                            })
                                .addIconColumn({
                                name: "s_rezsp_dokl",
                                caption: "jres:31150185", //RC 31150185 : SD
                                width: 35,
                                description: "jres:31150186", //RC 31150186 : Stav dokladu v IISSP – Otevřeno / Uzavřeno
                                iconTemplate: (d) => {
                                    const s_rezsp_dokl = d.s_rezsp_dokl;
                                    if (typeof s_rezsp_dokl === "undefined")
                                        return null;
                                    return s_rezsp_dokl === 0
                                        ? { icon: this.iconOtevreno, text: "jres:31150149" } //RC 31150149 : Otevřeno
                                        : { icon: this.iconUzavreno, text: "jres:31150150" }; //RC 31150150 : Uzavřeno
                                }
                            })
                                .addTextColumn({ name: "id_hdr_ris", caption: "jres:31150187", width: 100 }) //RC 31150187 : ID IISSP
                                .addNumberColumn({
                                name: "radek_hdr_ris",
                                caption: "jres:31150188", //RC 31150188 : Ř
                                width: 35,
                                description: "jres:31150189" //RC 31150189 : Řádek IISSP
                            })
                                .addIconColumn({
                                name: "s_rezsp",
                                caption: "jres:31150190", //RC 31150190 : SŘ
                                width: 30,
                                description: "jres:31150191", //RC 31150191 : Stav řádku v IISSP – Otevřeno / Uzavřeno
                                iconTemplate: (d) => {
                                    const s_rezsp = d.s_rezsp;
                                    if (typeof s_rezsp === "undefined")
                                        return null;
                                    return s_rezsp === 0
                                        ? { icon: this.iconOtevreno, text: "jres:31150149" } //RC 31150149 : Otevřeno
                                        : { icon: this.iconUzavreno, text: "jres:31150150" }; //RC 31150150 : Uzavřeno
                                }
                            })
                                .addTextColumn({ name: "s_rezsp", caption: "jres:31150192", width: 40 }) //RC 31150192 : Stav
                                .addTextColumn({ name: "isp_fim", caption: "jres:31150193", width: 70 }) //RC 31150193 : FIM
                                .addTextColumn({ name: "isp_zdr", caption: "jres:31150194", width: 70 }) //RC 31150194 : ZDR
                                .addTextColumn({ name: "isp_par", caption: "jres:31150195", width: 70 }) //RC 31150195 : PAR
                                .addTextColumn({ name: "isp_pol", caption: "jres:31150196", width: 70 }) //RC 31150196 : POL
                                .addTextColumn({ name: "isp_eds", caption: "jres:31150197", width: 70 }) //RC 31150197 : EDS
                                .addTextColumn({ name: "isp_pvs", caption: "jres:31150198", width: 90 }) //RC 31150198 : PVS
                                .addTextColumn({ name: "isp_ucl", caption: "jres:31150199", width: 70 }) //RC 31150199 : UCL
                                .addTextColumn({ name: "isp_zj", caption: "jres:31150200", width: 70 }) //RC 31150200 : ZJ
                                .addTextColumn({ name: "isp_uj", caption: "jres:31150201", width: 70 }) //RC 31150201 : UJ
                                .addTextColumn({ name: "isp_uz", caption: "jres:31150202", width: 70 }) //RC 31150202 : UZ
                                .addDecimalColumn({ name: "c_rsp", caption: "jres:31150203", width: 120 }) //RC 31150203 : Rezervováno
                                .addDecimalColumn({ name: "c_cerp", caption: "jres:31150204", width: 120 }) //RC 31150204 : Čerpáno
                                .addDateColumn({ name: "dat_spl", caption: "jres:31150205", width: 80 }) //RC 31150205 : Splatnost
                                .addTextColumn({ name: "popis", caption: "jres:31150206", width: 150 }) //RC 31150206 : Popis
                        });
                    })
                        .always(() => { this.endOperation(); });
                }
            }
            WebControls.GIisspRezHistory = GIisspRezHistory;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * GIisspRezWsCallHistory
             *
             * TK ekv.: N:\GINIS\489\DEV\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GIisspHistoryTab.cs
             *
             * @author bmartinek
             * @since 490.1.0.0
             */
            class GIisspRezWsCallHistory extends GContent {
                prepareContent(options) {
                    const ixs_hpr = options.ixs_hpr;
                    this.title = "jres:31150229".format(ixs_hpr); //RC 31150229 : Historie volání Státní pokladny pro případ {0}
                    this.actions.add(new GAction({
                        name: "shDetailAct",
                        caption: "jres:31150230", //RC 31150230 : Detail
                        run: () => {
                            const id_volani_ssp = grid.ggrid("getSelection")[0]?.id_volani_ssp;
                            if (!id_volani_ssp)
                                return;
                            const options = {
                                id_volani_ssp: id_volani_ssp
                            };
                            this.navigate([WebControls.GIisspRezWsCallHistoryDetails, { uid: "GIisspRezWsCallHistoryDetails#" }], options);
                        }
                    }));
                    const grid = $.newDiv().appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        defaultAction: this.actions.shDetailAct,
                        defaultProfile: { sort: "!id_volani_ssp", /*grouping: "id_volani_ssp"*/ },
                        columnMode: "full",
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "id_volani_ssp",
                            caption: "jres:31150213", //RC 31150213 : Id volání
                            width: 60
                        })
                            .addIconColumn({
                            name: "typ",
                            caption: "jres:31150225", //RC 31150225 : Typ
                            width: 30,
                            description: "jres:31150226", //RC 31150226 : Voláno online / offline
                            iconTemplate: (d) => {
                                const priz_offline = d.priz_offline;
                                switch (priz_offline) {
                                    case 0: return { icon: "fa-wifi gi-state-warn", text: "jres:31150227" }; //RC 31150227 : Offline (přes dávku)
                                    case 1: return { icon: "fa-wifi", text: "jres:31150228" }; //RC 31150228 : Online (voláním WS)
                                    default: return null;
                                }
                            }
                        })
                            .addIconColumn({
                            name: "vysl_volani",
                            caption: "jres:31150238", //RC 31150238 : Výsledek
                            iconTemplate: (d) => {
                                const vysl_volani = d.vysl_volani ?? 0;
                                const isOk = vysl_volani === 0;
                                return {
                                    icon: isOk ? "fa-check-circle g-state-text g-state-success" : "fa-times-circle  g-state-text g-state-error",
                                    text: d.vysl_volani_txt ?? ""
                                };
                            }
                        })
                            .addTextColumn({ name: "vysl_volani_txt", caption: "jres:31150216", width: 150 }) //RC 31150216 : Výsledek
                            .addTextColumn({ name: "doklad", caption: "jres:31150214", width: 150 }) //RC 31150214 : Doklad
                            .addTextColumn({ name: "metoda_iissp_txt", caption: "jres:31150215", width: 80 }) //RC 31150215 : Metoda
                            .addDateTimeColumn({ name: "dat_zmena", caption: "jres:31150217", /* width: 120 */ }) //RC 31150217 : Datum
                            .addTextColumn({ name: "id_hdr_ris", caption: "jres:31150218", width: 90 }) //RC 31150218 : Číslo rezervace
                            .addNumberColumn({ name: "rez_akt_priz", caption: "jres:31150219", width: 35 }) //RC 31150219 : Příz.akt.
                            .addNumberColumn({ name: "por_cis", caption: "jres:31150220", width: 35 }) //RC 31150220 : Zpr. č.
                            .addTextColumn({ name: "typ_hlaseni", caption: "jres:31150221", width: 35 }) //RC 31150221 : Typ zpr.
                            .addTextColumn({ name: "id_hlaseni", caption: "jres:31150222", width: 90 }) //RC 31150222 : Ident. zprávy
                            .addTextColumn({ name: "text_hlaseni", caption: "jres:31150223", width: 350 }) //RC 31150223 : Text zprávy
                            .addTextColumn({ name: "text_chyby", caption: "jres:31150224", width: 350 }) //RC 31150224 : Text chyby
                    });
                    this.beginOperation();
                    this.isl.IisspRezervaceHistorie.list({ filters: { ixs_hpr: ixs_hpr } }).getView()
                        .then((view) => { grid.ggrid("setData", view); })
                        .always(() => { this.endOperation(); });
                    this.menuBar([{
                            action: this.actions.shDetailAct,
                            favorite: true
                        }]);
                    this.commandBar([{
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: () => { this.close(); }
                            })
                        }]);
                }
            }
            WebControls.GIisspRezWsCallHistory = GIisspRezWsCallHistory;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * GIisspRezWsCallHistoryDetails
             * TK Ekv: N:\GINIS\489\DEV\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GIisspHistoryDetailTab.cs
             * @author bmartinek
             * @since 490.1.0.1
             */
            class GIisspRezWsCallHistoryDetails extends GContent {
                prepareContent(options) {
                    this.title = `jres:31150248`.format(options.id_volani_ssp); //RC 31150248 : Detail volání {0}
                    //#region Grid
                    const grid = $.newDiv();
                    $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "jres:31150231", //RC 31150231 : Informace o online volání
                        opened: true
                    }).append(grid);
                    this.beginOperation();
                    this.isl.IisspRezervaceHistorie.read({ id_volani_ssp: options.id_volani_ssp }).getData()
                        .then((r) => {
                        const isOffline = r.priz_offline === 1;
                        grid.ggrid({
                            userSettings: this.userSettings?.sub(isOffline ? "gridOffline" : "gridOnline"),
                            columns: isOffline ? this.createOfflineGridFormat() : this.createOnlineGridFormat(),
                            data: [r]
                        });
                        if (r.text_chyby_long) {
                            excTab.gtab("option", "visible", true)
                                .gtab("option", "opened", true);
                            excForm$.findFields().gfield("model", "apply", r);
                        }
                        inputForm$.findFields().gfield("model", "apply", r);
                        outputForm$.findFields().gfield("model", "apply", r);
                    })
                        .always(() => { this.endOperation(); });
                    //#endregion
                    //#region Exception
                    const excForm = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addField("gstringbox", { name: "text_chyby_long", rows: 10, customClass: "g-state-text g-state-error", disabled: true });
                    const excForm$ = $.newDiv().gform("createFrom", excForm);
                    const excTab = $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "jres:31150232", //RC 31150232 : Informace o chybě a vstupní a výstupní XML
                        opened: true,
                        visible: false
                    })
                        .append(excForm$);
                    //#endregion
                    //#region Vstup
                    const inputForm = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addField("gstringbox", { name: "xml_request", rows: 10, disabled: true });
                    const inputForm$ = $.newDiv().gform("createFrom", inputForm);
                    $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "jres:31150233", //RC 31150233 : Vstup
                        opened: true
                    })
                        .append(inputForm$);
                    //#endregion
                    //#region Vystup
                    const outputForm = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addField("gstringbox", { name: "xml_response", rows: 10, disabled: true });
                    const outputForm$ = $.newDiv().gform("createFrom", outputForm);
                    $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "jres:31150234", //RC 31150234 : Výstup
                        opened: true
                    })
                        .append(outputForm$);
                    //#endregion
                    this.commandBar([
                        {
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: () => { this.close(); }
                            })
                        }
                    ]);
                }
                createOnlineGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addNumberColumn({ name: "id_volani_ssp", caption: "jres:31150235", width: 70 }) //RC 31150235 : Id volání
                        .addIconColumn({
                        name: "typ",
                        caption: "jres:31150241", //RC 31150241 : Typ
                        description: "jres:31150242", //RC 31150242 : Voláno online / offline
                        iconTemplate: (d) => {
                            const priz_offline = d.priz_offline;
                            switch (priz_offline) {
                                case 0: return { icon: "fa-wifi gi-state-text gi-state-warn", text: "jres:31150227" }; //RC 31150227 : Offline (přes dávku)
                                case 1: return { icon: "fa-wifi", text: "jres:31150228" }; //RC 31150228 : Online (voláním WS)
                                default: return null;
                            }
                        }
                    })
                        .addTextColumn({ name: "doklad", caption: "jres:31150236", width: 130 }) //RC 31150236 : Doklad 
                        .addTextColumn({ name: "metoda_iissp_txt", caption: "jres:31150237", width: 80 }) //RC 31150237 : Metoda
                        .addTextColumn({ name: "vysl_volani_txt", caption: "jres:31150238", width: 180 }) //RC 31150238 : Výsledek 
                        .addDateTimeColumn({ name: "dat_zmena", caption: "jres:31150239", width: 140 }) //RC 31150239 : Datum 
                        .addTextColumn({ name: "id_hdr_ris", caption: "jres:31150240", width: 90 }); //RC 31150240 : Číslo rezervace 
                }
                createOfflineGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addNumberColumn({ name: "id_volani_ssp", caption: "jres:31150235", width: 70 }) //RC 31150235 : Id volání
                        .addTextColumn({ name: "id_davky_ext", caption: "jres:31150243", width: 130 }) //RC 31150243 : Id dávky 
                        .addIconColumn({
                        name: "typ",
                        caption: "jres:31150241", //RC 31150241 : Typ
                        description: "jres:31150242", //RC 31150242 : Voláno online / offline
                        iconTemplate: (d) => {
                            const priz_offline = d.priz_offline;
                            switch (priz_offline) {
                                case 0: return { icon: "fa-wifi gi-state-warn", text: "jres:31150227" }; //RC 31150227 : Offline (přes dávku)
                                case 1: return { icon: "fa-wifi", text: "jres:31150228" }; //RC 31150228 : Online (voláním WS)
                                default: return null;
                            }
                        }
                    })
                        .addTextColumn({ name: "doklad", caption: "jres:31150236", width: 130 }) //RC 31150236 : Doklad 
                        .addTextColumn({ name: "metoda_iissp_txt", caption: "jres:31150237", width: 80 }) //RC 31150237 : Metoda
                        .addTextColumn({ name: "vysl_volani_txt", caption: "jres:31150238", width: 180 }) //RC 31150238 : Výsledek 
                        .addDateTimeColumn({ name: "dat_vytvoreni", caption: "jres:31150244", width: 140 }) //RC 31150244 : Vytvořeno 
                        .addDateTimeColumn({ name: "dat_odpovedi", caption: "jres:31150245", width: 140 }) //RC 31150245 : Přijato
                        .addTextColumn({ name: "zmenu_prov_vytv_rf", caption: "jres:31150246", width: 150 }) //RC 31150246 : Vytvořil
                        .addTextColumn({ name: "zmenu_prov_odp_rf", caption: "jres:31150247", width: 150 }); //RC 31150247 : Přijal
                }
            }
            WebControls.GIisspRezWsCallHistoryDetails = GIisspRezWsCallHistoryDetails;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            let GInbox = class GInbox extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GIisspInbox#";
                    this.title = "jres:31150059"; //RC 31150059 : Stav volání Inbox IISSP
                }
                prepareContent() {
                    //#region MenuBar
                    this.prevzitAct = this.actions.add({
                        name: "prevzitAct",
                        caption: "jres:31150060", //RC 31150060 : Převzít
                        enabled: false,
                        run: (ev) => {
                            const sel = this.grid.ggrid("getSelection");
                            if (sel.length === 0)
                                return;
                            this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                                keys: "id_inbox_ssp",
                                gridFormat: this.createGridFormat(),
                                title: "jres:31150066", //RC 31150066 : Převzetí zpráv z IISSP
                                data: sel,
                                preCheckAction: (data) => {
                                    for (let i = 0; i < data.length; i++) {
                                        data[i]["wiz_check"] = true;
                                    }
                                    return $.Deferred().resolve({ result: data }).promise();
                                },
                                firstStep: {
                                    gridTabTitle: "jres:31150067", //RC 31150067 : Kontrola záznamů k převzetí
                                    nextActionName: "jres:31150068", //RC 31150068 : Převzít
                                    nextAction: (model, data) => {
                                        return this.isl.IisspInbox.prevzitZpravyHromadneCommit({ id_inbox_ssp_group: data.map(d => d.id_inbox_ssp) })
                                            .get()
                                            .then((res) => { return Gordic.Eko.Components.Wizard.Utils.getData(res); });
                                    }
                                },
                                lastStep: {
                                    title: "jres:31150069", //RC 31150069 : Výsledek převzetí zpráv
                                },
                                completeDelegate: (view) => { this.refreshAct.run(); }
                            });
                        }
                    });
                    this.historieAct = this.actions.add({
                        name: "historieAct",
                        caption: "jres:31150061", //RC 31150061 : Historie
                        enabled: false,
                        run: (ev) => {
                            const sel = this.grid.ggrid("getSelection");
                            if (sel.length === 0)
                                return;
                            this.navigate(WebControls.GInboxHistory, { id_inbox_ssp: sel[0].id_inbox_ssp, typ: "inbox" });
                        }
                    });
                    this.obsahAct = this.actions.add({
                        name: "obsahAct",
                        caption: "jres:31150062", //RC 31150062 : Obsah
                        enabled: false,
                        run: (ev) => {
                            const sel = this.grid.ggrid("getSelection");
                            if (sel.length === 0)
                                return;
                            this.navigate(WebControls.GInboxBatchContent, { id_inbox_ssp: sel[0].id_inbox_ssp, typ: "inbox" });
                        }
                    });
                    this.refreshAct = this.actions.add({
                        name: "refreshAct",
                        caption: "jres:31150065", //RC 31150065 : Občerstvit
                        icon: "gi-refresh",
                        run: (ev) => { this.filterpanel.gfilterpanel("applyFilter"); /*this.getData(); */ }
                    });
                    this.stornoAct = this.actions.add({
                        name: "stornoAct",
                        caption: "jres:24450001", // GDlg.mbbCancel.text, // mbbCancel = Zrušit (jvacha: to asi není ono) //RC 24450001 : Storno
                        enabled: false,
                        run: (ev) => {
                            const sel = this.grid.ggrid("getSelection");
                            if (sel.length === 0)
                                return;
                            this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                                keys: "id_inbox_ssp",
                                gridFormat: this.createGridFormat(),
                                title: "jres:31150070", //RC 31150070 : Storno zpráv
                                data: sel,
                                preCheckAction: (data) => {
                                    for (let i = 0; i < data.length; i++) {
                                        data[i]["wiz_check"] = true;
                                    }
                                    return $.Deferred().resolve({ result: data }).promise();
                                },
                                firstStep: {
                                    gridTabTitle: "jres:31150071", //RC 31150071 : Kontrola záznamů ke stornu
                                    nextActionName: "jres:31150072", //RC 31150072 : Stornovat
                                    nextAction: (model, data) => {
                                        return this.isl.IisspInbox.stornujHromadne({ id_inbox_ssp_group: data.map(d => d.id_inbox_ssp) })
                                            .get()
                                            .then((res) => { return Gordic.Eko.Components.Wizard.Utils.getData(res); });
                                    }
                                },
                                lastStep: {
                                    title: "jres:31150073", //RC 31150073 : Výsledek storna
                                },
                                completeDelegate: (view) => { this.refreshAct.run(); }
                            });
                        }
                    });
                    this.menuBar([
                        { action: this.prevzitAct, favorite: true },
                        { action: this.historieAct, favorite: true },
                        { action: this.obsahAct, favorite: true },
                        { action: this.refreshAct, favorite: true },
                        { action: this.stornoAct, favorite: true }
                    ]);
                    this.commandBar([
                        {
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: (ev) => { this.close(); }
                            })
                        }
                    ]);
                    //#endregion
                    const form = new Gordic.Forms.Form()
                        .addRow()
                        .addField("gcheck", { name: "showDelivered", label: "jres:31150063", labelFromRow: "never" }) //RC 31150063 : Zobrazit vyzvednuté
                        .addRow()
                        .addField("gcheck", { name: "showFailed", label: "jres:31150064", labelFromRow: "never" }); //RC 31150064 : Zobrazit chybné
                    this.filterpanel = $.newDiv().appendTo(this.element)
                        .gfilterpanel({
                        forms: [form],
                        filterViewMode: FilterViewMode.Simple,
                        idSimpleMode: "iisspInbox",
                        favorites: ["showDelivered", "showFailed"],
                        collectData: (ev, filter) => {
                            this.getData(filter.data);
                        }
                    });
                    this.view = new Gordic.Data.View();
                    this.grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        data: this.view,
                        defaultProfile: { columnList: "id_inbox_ssp,id_inbox_user,id_inbox_ext,metoda_txt,status,dat_stav_od,dat_stav,dat_ukonceni,dat_zadal,pocet_zprav,zadal_nazev_rf,dat_prevzal,prevzal_nazev_rf,filtrace" },
                        columns: this.createGridFormat(),
                        selection: (ev, o) => {
                            const sel = o.getSelection()[0];
                            const perms = sel?.Permissions;
                            if (perms) {
                                this.prevzitAct.updatePermission(perms.LzePrevzit);
                                this.stornoAct.updatePermission(perms.LzeStorno);
                            }
                        },
                        defaultAction: new GAction({
                            name: "defAct",
                            run: (ev, ctx) => { this.dispatchEvent("griddefaultactionrun", [ctx.cellInfo.data]); }
                        })
                    })
                        .gautofit();
                    this.filterpanel.gfilterpanel("applyFilter", { showDelivered: false, showFailed: false });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addNumberColumn({ name: "id_inbox_user", caption: "#" })
                        .addTextColumn({ name: "id_inbox_ext", caption: "jres:31150046" }) //RC 31150046 : GINIS dávka
                        .addTextColumn({ name: "id_inbox_ris", caption: "jres:31150047" }) //RC 31150047 : IISSP dávka
                        .addIconColumn({
                        name: "status",
                        caption: "jres:31150049", //RC 31150049 : Status
                        width: 350,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.full,
                        iconTemplate: (d) => {
                            switch (d.status_inbox) {
                                case 0: return { icon: "gi-paper", text: d.status_inbox_zkr, tooltip: "jres:31150033" }; //RC 31150033 : Zpracování dávky inicializováno
                                case 1: return { icon: "gi-paper g-state-text g-state-favorite", text: d.status_inbox_zkr, tooltip: "jres:31150034" }; //RC 31150034 : Dávka zařazena do fronty zpracování
                                case 2: return { icon: "gi-paper g-state-text g-state-info", text: d.status_inbox_zkr, tooltip: "jres:31150035" }; //RC 31150035 : Zpracování dávky zahájeno
                                case 8: return { icon: "fa-check-circle g-state-text g-state-success", text: d.status_inbox_zkr, tooltip: "jres:31150036" }; //RC 31150036 : Zpracování dávky ukončeno
                                case 9: return { icon: "fa-times-circle g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150037" }; //RC 31150037 : Zpracování dávky ukončeno s chybou
                                case 100: return { icon: "fa-exclamation-circle g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150038" }; //RC 31150038 : Nepodařilo se sestavit a odeslat dávku
                                case 110: return { icon: "gi-tick g-state-text g-state-success", text: d.status_inbox_zkr, tooltip: "jres:31150039" }; //RC 31150039 : Zprávy staženy
                                case 120: return { icon: "fa-times g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150040" }; //RC 31150040 : Při práci s dávkou došlo v GINIS k chybě
                                case 130: return { icon: "fa-window-close-o g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150041" }; //RC 31150041 : Komunikační chyba mezi GINIS a IISSP
                                case 140: return { icon: "fa-minus-circle g-state-text g-state-warning", text: d.status_inbox_zkr, tooltip: "jres:31150042" }; //RC 31150042 : Neexistují data pro výběrová kritéria
                                case 150: return { icon: "fa-ban", text: d.status_inbox_zkr, tooltip: "jres:31150043" }; //RC 31150043 : Dávka byla stornována uživatelem GINIS
                                case 160: return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: d.status_inbox_zkr, tooltip: "jres:31150044" }; //RC 31150044 : Bylo vyžádáno generování novějšího výkazu
                                case 170: return { icon: "fa-window-close g-state-text g-state-warning", text: d.status_inbox_zkr, tooltip: "jres:31150045" }; //RC 31150045 : Chyba při generování sestavy výkazu v GINIS
                                default: return { icon: "", text: d.status_inbox_zkr, tooltip: "" };
                            }
                        }
                    })
                        .addDateColumn({ name: "dat_stav_od", caption: "jres:31150050" }) //RC 31150050 : Stav od
                        .addDateColumn({ name: "dat_stav", caption: "jres:31150051" }) //RC 31150051 : Stav k
                        .addDateTimeColumn({ name: "dat_ukonceni", caption: "jres:31150052" }) //RC 31150052 : Datum ukončení
                        .addDateTimeColumn({ name: "dat_zadal", caption: "jres:31150053" }) //RC 31150053 : Datum vyžádání
                        .addNumberColumn({ name: "pocet_zprav", caption: "jres:31150054" }) //RC 31150054 : Zpráv
                        .addTextColumn({ name: "zadal_nazev_rf", caption: "jres:31150055" }) //RC 31150055 : Vyžádal
                        .addDateTimeColumn({ name: "dat_prevzal", caption: "jres:31150056" }) //RC 31150056 : Datum převzetí/storna
                        .addTextColumn({ name: "prevzal_nazev_rf", caption: "jres:31150057" }) //RC 31150057 : Převzal/Stornoval
                        .addTextColumn({ name: "filtrace", caption: "jres:31150058" }) //RC 31150058 : Filtrace
                        .addIconColumn({
                        name: "metoda_txt",
                        caption: "jres:31150048", //RC 31150048 : Metoda
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.full,
                        iconTemplate: (d) => {
                            let icon = "fa-fw";
                            if (d.priz_detail === 1)
                                icon = "gi-detail";
                            else if (d.priz_detail === 0)
                                icon = "gi-suma";
                            return { icon: icon, text: d.metoda_zkr + " " + (d.stsk_typ_zkr ? d.stsk_typ_zkr : "") };
                        },
                        tooltipTemplate: (d) => { return d.stsk_typ_txt ? d.stsk_typ_txt : ""; }
                    });
                }
                getData(filter) {
                    this.beginOperation();
                    return this.isl.IisspInbox.list({
                        filters: {
                            priz_vyzvednuto: { o: "=", v: filter?.showDelivered ?? false },
                            priz_chybne: { o: "=", v: filter?.showFailed ?? false },
                            //id_inbox_ssp:    { o: "IN", v: [822, 821, 798] } //NOTE: aktualne nevyuzite, doplni se v dalsim rozvoji
                        },
                        fragments: ["*", "Permissions"]
                    })
                        .get()
                        .then((r) => {
                        const enabled = !!r.data.length;
                        //this.prevzitAct.enabled(enabled);
                        this.historieAct.enabled(enabled);
                        this.obsahAct.enabled(enabled);
                        //this.stornoAct.enabled(enabled);
                        this.view.updateData(r.data);
                        return r.data;
                    })
                        .always(() => { this.endOperation(); });
                }
            };
            GInbox = __decorate([
                Decorators.gcontent
            ], GInbox);
            WebControls.GInbox = GInbox;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * Dle TK Gordic.Iissp.WinClient.GObsahInboxTab
             *
             * @author bmartinek
             * @since 488.1.0.16
             */
            let GInboxBatchContent = class GInboxBatchContent extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GInboxHistoryDetail#";
                    this.title = "jres:31150096"; //RC 31150096 : Obsah vstupní a výstupní XML dávky
                }
                prepareContent(options) {
                    const id_inbox_ssp = options.id_inbox_ssp;
                    $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31150097", //RC 31150097 : Seznam zpráv
                        opened: true
                    })
                        .append(this.grid = $.newDiv());
                    $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31150098", //RC 31150098 : Vstup
                        opened: true
                    })
                        .append($.newDiv().gstringbox({ name: "vstup", rows: 20, disabled: true }));
                    $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:31150099", //RC 31150099 : Výstup
                        opened: true
                    })
                        .append($.newDiv().gstringbox({ name: "vystup", rows: 20, disabled: true }));
                    this.commandBar([{ action: new GAction({ name: "closeAct", caption: GDlg.mbbClose.text, run: () => { this.close(); } }) }]);
                    this.view = new Gordic.Data.View([], { key: "zprava_id" });
                    this.grid.ggrid({
                        data: this.view,
                        defaultProfile: { columnList: "zprava_id,dat_vznik,dat_precteno,status_ris,nazev,typ_ris,dat_zmena,dat_zmena,zmenu_prov_txt" },
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "zprava_id",
                            caption: "jres:31150100", //RC 31150100 : Id zprávy
                            description: "jres:31150101", //RC 31150101 : generováno v IISSP
                            width: 215
                        })
                            .addDateTimeColumn({
                            name: "dat_vznik",
                            caption: "jres:31150102", //RC 31150102 : Vznik
                            description: "jres:31150103", //RC 31150103 : datum vznik zprávy
                            width: 110
                        })
                            .addDateTimeColumn({
                            name: "dat_precteno",
                            caption: "jres:31150104", //RC 31150104 : Přečteno
                            description: "jres:31150105", //RC 31150105 : datum stažení zprávy
                            width: 110
                        })
                            .addTextColumn({
                            name: "status_ris",
                            caption: "jres:31150106", //RC 31150106 : Status
                            width: 40
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "jres:31150107", //RC 31150107 : Název
                            width: 215
                        })
                            .addTextColumn({
                            name: "typ_ris",
                            caption: "jres:31150108", //RC 31150108 : Typ
                            width: 40
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:31150109", //RC 31150109 : Datum změny
                            width: 110
                        })
                            .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "jres:31150110", //RC 31150110 : Změnil
                            width: 215
                        }),
                        selection: (ev, s) => { this.loadVystup(s.getSelection(false)[0]); }
                    });
                    this.beginOperation();
                    this.isl.IisspInbox.inboxObsah({ id_inbox_ssp: id_inbox_ssp })
                        .get()
                        .then((r) => {
                        const data = r.data;
                        this.curr_vystup_zprava_id = data.vystup_zprava_id ?? undefined;
                        this.curr_obsah = data;
                        this.findFields().gfield("model", "apply", data);
                        if (data.zpravy && data.zpravy.length) {
                            this.view.updateData(data.zpravy);
                            this.grid.ggrid("activeRow", this.curr_vystup_zprava_id);
                        }
                        this.setStatus(data.status);
                    })
                        .always(() => { this.endOperation(); });
                }
                setStatus(status) {
                    let statIcon = "fa-check-circle g-state-text g-state-success";
                    let caption = "jres:31150095"; //RC 31150095 : Úspěch
                    switch (status) {
                        case "E":
                            statIcon = "fa-times-circle  g-state-text g-state-error";
                            caption = "jres:31150093"; //RC 31150093 : Chyba
                            break;
                        case "W":
                            statIcon = "fa-exclamation-triangle g-state-text g-state-warning";
                            caption = "jres:31150094"; //RC 31150094 : Upozornění
                            break;
                        case "I":
                            statIcon = "fa-info-circle g-state-text g-state-info";
                            caption = "jres:31150112"; //RC 31150112 : Informace
                            break;
                        default: break;
                    }
                    this.statusBar([{ type: "static", icon: statIcon, caption: caption }]);
                }
                loadVystup(z) {
                    if (!z && !this.curr_vystup_zprava_id)
                        return;
                    else if (!z) {
                        this.findFields().gfield("model", "apply", this.curr_obsah);
                        return;
                    }
                    else if (z.zprava_id === this.curr_vystup_zprava_id)
                        return;
                    this.beginOperation();
                    this.isl.IisspInbox.inboxZpravaVystup({ zprava_id: z.zprava_id })
                        .get()
                        .then((d) => {
                        const data = d.data;
                        this.curr_vystup_zprava_id = data.zprava_id;
                        this.findFields().gfield("model", "apply", data);
                        this.setStatus(data.status);
                    })
                        .always(() => { this.endOperation(); });
                }
            };
            GInboxBatchContent = __decorate([
                Decorators.gcontent
            ], GInboxBatchContent);
            WebControls.GInboxBatchContent = GInboxBatchContent;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            let GInboxHistory = class GInboxHistory extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GIisspInboxHistory#";
                    this.title = "jres:31150059"; //RC 31150059 : Stav volání Inbox IISSP
                }
                prepareContent(options) {
                    this.options = options;
                    switch (options.typ) {
                        case "inbox":
                            this.title = "jres:31150074".format(options.id_inbox_ssp);
                            break; //RC 31150074 : Historie volání IISSP v rámci inbox dávky id {0}
                        case "vykaz":
                            this.title = "jres:31150075".format(options.id_inbox_user ?? options.id_inbox_ssp);
                            break; //RC 31150075 : Historie volání IISSP v rámci Výkazu id {0}
                        default: throw new GError("notSupported");
                    }
                    this.detailAct = this.actions.add({
                        name: "obsahAct",
                        icon: "gi-detail",
                        caption: "jres:31150089", //RC 31150089 : Detail
                        enabled: false,
                        run: (ev) => {
                            const sel = this.grid.ggrid("getSelection")[0];
                            if (!sel)
                                return;
                            this.navigate(WebControls.GInboxHistoryDetail, { id_volani_ssp: sel.id_volani_ssp });
                        }
                    });
                    this.menuBar([{ action: this.detailAct, favorite: true }]);
                    this.view = new Gordic.Data.View();
                    this.grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        data: this.view,
                        defaultAction: this.detailAct,
                        defaultProfile: { columnList: "id_volani_ssp,dat_start,metoda_iissp_txt,vysl_volani_txt,typ_hlaseni,text_hlaseni,poznamka,zmenu_prov_txt" },
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({ name: "id_volani_ssp", caption: "jres:31150076", width: 50 }) //RC 31150076 : id volání IISSP
                            .addDateTimeColumn({
                            name: "dat_start",
                            caption: "jres:31150077", //RC 31150077 : Datum volání
                            description: "jres:31150078", //RC 31150078 : datum a čas volání metody
                            width: 110
                        })
                            .addTextColumn({
                            name: "metoda_iissp_txt",
                            caption: "jres:31150079", //RC 31150079 : Metoda
                            description: "jres:31150080", //RC 31150080 : volaná IISSP metoda
                            visible: options.typ === "inbox",
                            width: 90
                        })
                            .addTextColumn({
                            name: "vysl_volani_txt",
                            caption: "jres:31150081", //RC 31150081 : Výsledek volání
                            width: 200
                        })
                            .addIconColumn({
                            name: "typ_hlaseni",
                            caption: "jres:31150082", //RC 31150082 : Typ
                            description: "jres:31150084", //RC 31150084 : hlášení z IISSP
                            iconTemplate: (d) => {
                                switch (d.typ_hlaseni) {
                                    case "I": return { icon: "fa-info-circle g-state-text g-state-info", text: "jres:31150112" }; //RC 31150112 : Informace
                                    case "W": return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:31150094" }; //RC 31150094 : Upozornění
                                    case "E": return { icon: "fa-times-circle  g-state-text g-state-error", text: "jres:31150093" }; //RC 31150093 : Chyba
                                }
                            }
                        })
                            .addTextColumn({
                            name: "text_hlaseni",
                            caption: "jres:31150083", //RC 31150083 : Text
                            description: "jres:31150085", //RC 31150085 : hlášení z IISSP
                            width: 150
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:31150086", //RC 31150086 : Poznámka
                            width: 280
                        })
                            .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "jres:31150087", //RC 31150087 : Provedl
                            description: "jres:31150088", //RC 31150088 : volání provedeno uživatelem
                            width: 250
                        })
                    })
                        .gautofit();
                    this.beginOperation();
                    this.isl.IisspInbox.historie({ filters: { id_inbox_ssp: this.options.id_inbox_ssp } })
                        .get()
                        .then((r) => { this.view.updateData(r.data); this.detailAct.enabled(!!r.data.length); })
                        .always(() => this.endOperation());
                }
            };
            GInboxHistory = __decorate([
                Decorators.gcontent
            ], GInboxHistory);
            WebControls.GInboxHistory = GInboxHistory;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * Dle TK Gordic.Iissp.WinClient.GInboxHistorieObsahTab
             *
             * @author bmartinek
             * @since 488.1.0.16
             */
            let GInboxHistoryDetail = class GInboxHistoryDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GInboxHistoryDetail#";
                }
                prepareContent(options) {
                    const id_volani_ssp = options.id_volani_ssp;
                    this.title = "jres:31150090".format(id_volani_ssp); //RC 31150090 : Vstupní a výstupní XML pro volání IISSP id {0}
                    const inputTab = $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "jres:31150091", //RC 31150091 : Vstup
                        opened: true
                    })
                        .append($.newDiv().gstringbox({ name: "vstup", rows: 20, disabled: true }));
                    const outputTab = $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "jres:31150092", //RC 31150092 : Výstup
                        opened: true
                    })
                        .append($.newDiv().gstringbox({ name: "vystup", rows: 20, disabled: true }));
                    this.commandBar([{ action: new GAction({ name: "closeAct", caption: GDlg.mbbClose.text, run: () => { this.close(); } }) }]);
                    this.beginOperation();
                    this.isl.IisspInbox.historieObsah({ id_volani_ssp: id_volani_ssp })
                        .get()
                        .then((r) => {
                        const d = r.data;
                        this.findFields().gfield("model", "apply", d);
                        let statIcon = "fa-check-circle g-state-text g-state-success";
                        let caption = "jres:31150095"; //RC 31150095 : Úspěch
                        switch (d.status) {
                            case "E":
                                statIcon = "fa-times-circle  g-state-text g-state-error";
                                caption = "jres:31150093"; //RC 31150093 : Chyba
                                break;
                            case "W":
                                statIcon = "fa-exclamation-triangle g-state-text g-state-warning";
                                caption = "jres:31150094"; //RC 31150094 : Upozornění
                                break;
                            default:
                                break;
                        }
                        this.statusBar([{ type: "static", icon: statIcon, caption: caption }]);
                    })
                        .always(() => { this.endOperation(); });
                }
            };
            GInboxHistoryDetail = __decorate([
                Decorators.gcontent
            ], GInboxHistoryDetail);
            WebControls.GInboxHistoryDetail = GInboxHistoryDetail;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Iissp.WebControls.GStrukturaIISSP.ts                 </Name>
//    <Description> Content se strukturou IISSP (pro SML05, FUC05, ?)           </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**Content se strukturou IISSP (pro SML05, FUC05, ?) */
            let GStrukturaIISSP = class GStrukturaIISSP extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actHistorie: {
                            caption: "jres:33600002", //RC 33600002 : Historie
                            run: function (ev, ctx) {
                                this.setPending(that.navigate([Gordic.Iissp.WebControls.GIisspRezWsCallHistory, { uid: "GIisspRezWsCallHistory#" }], {
                                    ixs_hpr: that.ixs_hpr
                                }).createDialogPromise());
                            }
                        },
                        actOveritStav: {
                            caption: "jres:33600003", //RC 33600003 : Ověřit stav
                            permission: this.data.Permissions?.LzeOveritStav,
                            run: function (ev, ctx) {
                                if (that.eko_rad_iisspcs == 1) {
                                    const options = {
                                        ixs_hpr: that.ixs_hpr,
                                        ixs_ref: that.ixs_ref,
                                        ico: that.ico,
                                        ucs: that.ucs,
                                        rok: that.rok,
                                        volatWebSluzbu: true
                                    };
                                    this.setPending(that.navigate([Gordic.Iissp.WebControls.GIisspRezDetail, { uid: "GIisspRezDetail#" }], options).createDialogPromise().then(() => {
                                        that.element.trigger("strukturaIisspActiveOp");
                                    }));
                                }
                                else if (that.eko_rad_iisspcs == 2) {
                                    const options = {
                                        ixs_hpr: that.ixs_hpr,
                                        ixs_ref: that.ixs_ref,
                                        ico: that.ico,
                                        ucs: that.ucs,
                                        rok: that.rok,
                                        volatWebSluzbu: true
                                    };
                                    this.setPending(that.navigate([Gordic.Iissp.WebControls.GIisspRezDetailExt, { uid: "GIisspRezDetailExt#" }], options).createDialogPromise().then(() => {
                                        that.element.trigger("strukturaIisspActiveOp");
                                    }));
                                }
                            }
                        },
                        actPripravaSP: {
                            caption: "jres:33600004", //RC 33600004 : Příprava IISSP
                            permission: this.data.Permissions?.LzePripravaSP,
                            run: function (ev, ctx) {
                                this.setPending(Gordic.Gui.Dialogs.GExpertModeDlg({ parentContent: that, opt: { levelExp: 311 }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                    .then((o) => {
                                    if (o?.ixxKey) {
                                        return that.isl.StrukturaIISSPEko.pripravitSP({ data: { ixs_hpr: that.ixs_hpr } }).get().then(() => {
                                            that.element.trigger("strukturaIisspActiveOp");
                                        });
                                    }
                                    else {
                                        return $.Deferred().reject().promise();
                                    }
                                }));
                            }
                        }
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actHistorie*", "actOveritStav*", "actPripravaSP*"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    let form = new Gordic.Forms.Form("L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0")
                        .addSection("jres:33600005") //RC 33600005 : Rezervační případ
                        .addField("gtable", {
                        name: "gridStrukturaIISSPPolozky",
                        columnMode: "full",
                        columns: this.createGridFormatPripad(),
                        data: new Gordic.Data.View((this.data.pripad) ? [this.data.pripad] : [])
                    })
                        .addSection("jres:33600006") //RC 33600006 : Struktura v IISSP
                        .addField("ggrid", {
                        name: "gridStrukturaIISSPPolozky",
                        columnMode: "full",
                        columns: this.createGridFormatStruktura(),
                        data: new Gordic.Data.View(this.data.polozky ?? [], {
                            key: ["ixs_hpr", "radek_gin", "subradek_gin"]
                        })
                    });
                    $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                /** Definice gridformátu struktury */
                createGridFormatStruktura() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addNumberColumn({
                        name: "rok" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.rok */,
                        caption: "jres:33600007", //RC 33600007 : Rok
                        width: 60
                    });
                    columns.addNumberColumn({
                        name: "radek_hdr" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.radek_hdr */,
                        caption: "#",
                        width: 30
                    });
                    columns.addTextColumn({
                        name: "s_rezsp_txt" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.s_rezsp_txt */,
                        caption: "jres:33600008", //RC 33600008 : Stav
                        width: 70
                    });
                    columns.addTextColumn({
                        name: "isp_kap" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_kap */,
                        caption: "jres:33600009", //RC 33600009 : KAP
                        width: 45
                    });
                    columns.addTextColumn({
                        name: "isp_fim" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_fim */,
                        caption: "jres:33600010", //RC 33600010 : FIM
                        width: 80
                    });
                    columns.addTextColumn({
                        name: "isp_pol" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_pol */,
                        caption: "jres:33600011", //RC 33600011 : RPO
                        width: 80
                    });
                    columns.addTextColumn({
                        name: "isp_par" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_par */,
                        caption: "jres:33600012", //RC 33600012 : PAR
                        width: 80
                    });
                    columns.addTextColumn({
                        name: "isp_zdr" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_zdr */,
                        caption: "jres:33600013", //RC 33600013 : ZDR
                        width: 70
                    });
                    columns.addTextColumn({
                        name: "isp_eds" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_eds */,
                        caption: "jres:33600014", //RC 33600014 : EDS
                        width: 80
                    });
                    columns.addTextColumn({
                        name: "isp_ucl" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_ucl */,
                        caption: "jres:33600015", //RC 33600015 : UCL
                        width: 70
                    });
                    columns.addTextColumn({
                        name: "isp_pvs" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_pvs */,
                        caption: "jres:33600016", //RC 33600016 : PVS
                        width: 90
                    });
                    columns.addTextColumn({
                        name: "isp_zj" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_zj */,
                        caption: "jres:33600017", //RC 33600017 : ZJ
                        width: 30
                    });
                    columns.addTextColumn({
                        name: "isp_uj" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_uj */,
                        caption: "jres:33600018", //RC 33600018 : UJ
                        width: 45
                    });
                    columns.addTextColumn({
                        name: "isp_uz" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.isp_uz */,
                        caption: "jres:33600019", //RC 33600019 : UZ
                        width: 45
                    });
                    columns.addCurrencyColumn({
                        name: "c_rsp" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.c_rsp */,
                        caption: "jres:33600020" //RC 33600020 : Částka
                    });
                    columns.addTextColumn({
                        name: "id_hdr" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.id_hdr */,
                        caption: "jres:33600021", //RC 33600021 : ID IISSP
                        width: 80
                    });
                    columns.addNumberColumn({
                        name: "radek_hdr_ris" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.radek_hdr_ris */,
                        caption: "jres:33600022", //RC 33600022 : Řádek IISSP
                        width: 80
                    });
                    columns.addNumberColumn({
                        name: "radek_hdr" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.radek_hdr */,
                        caption: "jres:33600023", //RC 33600023 : Řádek HDR
                        width: 80
                    });
                    columns.addDateColumn({
                        name: "dat_spl" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.dat_spl */,
                        caption: "jres:33600024" //RC 33600024 : Splatnost
                    });
                    columns.addTextColumn({
                        name: "popis" /* Eko.Interface.GStrukturaIISSPPolozkaDtoNames.popis */,
                        caption: "jres:33600025", //RC 33600025 : Popis
                        width: 300
                    });
                    return columns;
                }
                /** Definice gridformátu rezervačního případu */
                createGridFormatPripad() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addNumberColumn({
                        name: "pocet" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.pocet */,
                        caption: "jres:33600026", //RC 33600026 : Celkem
                        width: 100
                    });
                    columns.addNumberColumn({
                        name: "pripraveno" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.pripraveno */,
                        caption: "jres:33600027", //RC 33600027 : Připraveno
                        width: 100
                    });
                    columns.addNumberColumn({
                        name: "odeslano" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.odeslano */,
                        caption: "jres:33600028", //RC 33600028 : Odesláno
                        width: 100
                    });
                    columns.addNumberColumn({
                        name: "schvaleno" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.schvaleno */,
                        caption: "jres:33600029", //RC 33600029 : Schváleno
                        width: 100
                    });
                    columns.addNumberColumn({
                        name: "schvaleno_vyh" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.schvaleno_vyh */,
                        caption: "jres:33600030", //RC 33600030 : Schváleno s výhradou
                        width: 100
                    });
                    columns.addNumberColumn({
                        name: "zamitnuto" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.zamitnuto */,
                        caption: "jres:33600031", //RC 33600031 : Zamítnuto
                        width: 100
                    });
                    columns.addTextColumn({
                        name: "stav_pripadu" /* Eko.Interface.GStrukturaIISSPRezPripadDtoNames.stav_pripadu */,
                        caption: "jres:33600032", //RC 33600032 : Stav
                        width: 120
                    });
                    return columns;
                }
            };
            GStrukturaIISSP = __decorate([
                Decorators.gcontent
            ], GStrukturaIISSP);
            WebControls.GStrukturaIISSP = GStrukturaIISSP;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            class GStskPohyby extends GContent {
                constructor() {
                    super(...arguments);
                    this.title = "jres:31150258"; //RC 31150258 : Seznam všech pohybů za vybrané období k položce rezervace
                }
                prepareContent(options) {
                    const view = new Gordic.Data.View([], { key: "id_volani_ssp,radek_ik,radek_pol" });
                    this.isl.IisspInbox.pohybyPolozkyRezervaceList({
                        filters: {
                            id_volani_ssp: options.id_volani_ssp,
                            radek_ik: options.radek_ik,
                            radek_pol: options.radek_pol
                        }
                    }).getData()
                        .then((d) => { view.updateData(d); });
                    $.newDiv()
                        .appendTo(this.element)
                        .ggrid({
                        data: view,
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "radek_pohyb",
                            caption: "#",
                            description: "jres:31150259", //RC 31150259 : Pořadí pohybu
                            width: 40
                        })
                            .addTextColumn({
                            name: "id_doklad",
                            caption: "jres:31150261", //RC 31150261 : Id v IISSP RISRE
                            description: "jres:31150260", //RC 31150260 : Unikátní id v IISSP RISRE jednoho pohybu. Hodnota reprezentuje číslo a položku účetního dokladu.
                            width: 100,
                        })
                            .addDateColumn({
                            name: "dat_doklad",
                            caption: "jres:31150262", //RC 31150262 : Vytvoření
                            description: "jres:31150263", //RC 31150263 : Datum vytvoření pohybu v DB IISSP RISRE
                            width: 80
                        })
                            .addDateColumn({
                            name: "dat_rad_iissp",
                            caption: "jres:31150264", //RC 31150264 : Čerpání
                            description: "jres:31150265", //RC 31150265 : Rozhodné datum čerpání rozpočtu (datum aktualizace rozpočtu)
                            width: 80
                        })
                            .addCurrencyColumn({
                            name: "c_platba",
                            caption: "jres:31150266", //RC 31150266 : Příkaz k platbě
                            width: 100
                        })
                            .addTextColumn({
                            name: "mena_c_platba",
                            caption: "jres:31150267", //RC 31150267 : Měna příkazu
                            description: "jres:31150268", //RC 31150268 : Měna příkazu k platbě
                            width: 50
                        })
                            .addCurrencyColumn({
                            name: "c_bvypis",
                            caption: "jres:31150269", //RC 31150269 : Bank. výpis
                            width: 100
                        })
                            .addTextColumn({
                            name: "mena_c_bvypis",
                            caption: "jres:31150270", //RC 31150270 : Měna BV
                            description: "Bank. výpis",
                            width: 50
                        })
                            .addCurrencyColumn({
                            name: "c_psk",
                            caption: "jres:31150271", //RC 31150271 : PSK
                            description: "jres:31150272", //RC 31150272 : Přeúčtování skutečnosti
                            width: 100
                        })
                            .addTextColumn({
                            name: "mena_c_psk",
                            caption: "jres:31150273", //RC 31150273 : Měna PSK
                            width: 50
                        })
                    })
                        .gautofit();
                    this.commandBar([{
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: () => { this.close(); }
                            })
                        }]);
                }
            }
            WebControls.GStskPohyby = GStskPohyby;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            class GVykazy extends GContent {
                constructor() {
                    super(...arguments);
                    this.uid = "GIisspVykazy#";
                    this.title = "jres:31150278"; //RC 31150278 : Výkazy IISSP - pouze prohlížení
                }
                prepareContent(options) {
                    this.options = options;
                    //#region Bars
                    this.actions.addRange([
                        {
                            name: "genAct",
                            caption: "jres:31150279", //RC 31150279 : Generovat
                            tooltip: "jres:24450006", //RC 24450006 : Podle filtru
                            enabled: false,
                            run: () => { this.generate(); }
                        },
                        {
                            name: "newGenAct",
                            caption: "jres:31150280", //RC 31150280 : Gen. nový
                            tooltip: "jres:24450005", //RC 24450005 : Podle aktuálního řádku
                            enabled: false,
                            run: () => {
                                const sel = this.grid.ggrid("getSelection")[0];
                                if (sel)
                                    this.generateNew(sel);
                            }
                        },
                        {
                            name: "prevzitAct",
                            caption: "jres:31150060", //RC 31150060 : Převzít
                            enabled: false,
                            run: (ev) => {
                                const sel = this.grid.ggrid("getSelection");
                                if (sel.length === 0)
                                    return;
                                this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                                    keys: "id_inbox_ssp",
                                    gridFormat: this.createGridFormat(),
                                    title: "jres:31150066", //RC 31150066 : Převzetí zpráv z IISSP
                                    data: sel,
                                    preCheckAction: (data) => {
                                        for (let i = 0; i < data.length; i++) {
                                            data[i]["wiz_check"] = true;
                                        }
                                        return $.Deferred().resolve({ result: data }).promise();
                                    },
                                    firstStep: {
                                        gridTabTitle: "jres:31150067", //RC 31150067 : Kontrola záznamů k převzetí
                                        nextActionName: "jres:31150068", //RC 31150068 : Převzít
                                        nextAction: (model, data) => {
                                            return this.isl.IisspInbox.prevzitZpravyHromadneCommit({ id_inbox_ssp_group: data.map(d => d.id_inbox_ssp) })
                                                .get()
                                                .then((res) => { return Gordic.Eko.Components.Wizard.Utils.getData(res); });
                                        }
                                    },
                                    lastStep: {
                                        title: "jres:31150069", //RC 31150069 : Výsledek převzetí zpráv
                                    },
                                    completeDelegate: (view) => { this.actions["refreshAct"].run(); }
                                });
                            }
                        },
                        {
                            name: "historieAct",
                            caption: "jres:31150061", //RC 31150061 : Historie
                            enabled: false,
                            run: (ev) => {
                                const sel = this.grid.ggrid("getSelection");
                                if (sel.length === 0)
                                    return;
                                this.navigate(WebControls.GInboxHistory, { id_inbox_ssp: sel[0].id_inbox_ssp, typ: "inbox" });
                            }
                        },
                        {
                            name: "obsahAct",
                            caption: "jres:31150062", //RC 31150062 : Obsah
                            enabled: false,
                            run: (ev) => {
                                const sel = this.grid.ggrid("getSelection");
                                if (sel.length === 0)
                                    return;
                                this.navigate(WebControls.GInboxBatchContent, { id_inbox_ssp: sel[0].id_inbox_ssp, typ: "inbox" });
                            }
                        },
                        {
                            name: "refreshAct",
                            caption: "jres:31150065", //RC 31150065 : Občerstvit
                            icon: "gi-refresh",
                            run: (ev) => { this.filterpanel.gfilterpanel("applyFilter"); }
                        },
                        {
                            name: "stornoAct",
                            caption: "jres:31150362", //RC 31150362 : Storno
                            enabled: false,
                            run: (ev) => {
                                const sel = this.grid.ggrid("getSelection");
                                if (sel.length === 0)
                                    return;
                                this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                                    keys: "id_inbox_ssp",
                                    gridFormat: this.createGridFormat(),
                                    title: "jres:31150070", //RC 31150070 : Storno zpráv
                                    data: sel,
                                    preCheckAction: (data) => {
                                        for (let i = 0; i < data.length; i++) {
                                            data[i]["wiz_check"] = true;
                                        }
                                        return $.Deferred().resolve({ result: data }).promise();
                                    },
                                    firstStep: {
                                        gridTabTitle: "jres:31150071", //RC 31150071 : Kontrola záznamů ke stornu
                                        nextActionName: "jres:31150072", //RC 31150072 : Stornovat
                                        nextAction: (model, data) => {
                                            return this.isl.IisspInbox.stornujHromadne({ id_inbox_ssp_group: data.map(d => d.id_inbox_ssp) })
                                                .get()
                                                .then((res) => { return Gordic.Eko.Components.Wizard.Utils.getData(res); });
                                        }
                                    },
                                    lastStep: {
                                        title: "jres:31150073", //RC 31150073 : Výsledek storna
                                    },
                                    completeDelegate: (view) => { this.actions["refreshAct"]?.run(); }
                                });
                            }
                        },
                        {
                            name: "porovnatAct",
                            caption: "jres:24450002", //RC 24450002 : Porovnat
                            tooltip: "jres:24450003", //RC 24450003 : Porovnat GINIS x IISSP výkaz
                            enabled: false,
                            run: (ev) => {
                                const sel = this.grid.ggrid("getSelection")[0];
                                if (!sel)
                                    return;
                                this.beginOperation();
                                this.isl.IisspVykaz.porovnejCommit({
                                    data: {
                                        id_inbox_ssp: sel.id_inbox_ssp
                                    }
                                })
                                    .get()
                                    .then((res) => {
                                    if ((res.result?.data?.pocet_rozdilu ?? -1) === 0) {
                                        this.showFlash("jres:24450007".format(res.result?.data?.id_inbox_ext ?? "-")); //RC 24450007 : Proběhlo porovnání výkazu {0}, výkazy jsou shodné.
                                    }
                                    else {
                                        this.showFlash("jres:31150357".format(res.result?.data?.id_inbox_ext ?? "-", res.result?.data?.pocet_rozdilu?.toString())); //RC 31150357 : Proběhlo porovnání výkazu {0}, počet rozdílů: {1}, podrobnosti tl. Zobrazit.
                                    }
                                    this.actions["refreshAct"]?.run();
                                })
                                    .always(() => { this.endOperation(); });
                            }
                        },
                        {
                            name: "zobrazitAct",
                            caption: "jres:31150313", //RC 31150313 : Zobrazit
                            tooltip: "jres:31150314", //RC 31150314 : Zobrazit porovnání výkazu (je možné pouze u validních dat)
                            enabled: false,
                            run: (ev) => {
                                const sel = this.grid.ggrid("getSelection")[0];
                                if (!sel)
                                    return;
                                this.navigate(WebControls.GVykazyPorovnani, {
                                    rok: sel.rok,
                                    mesic_do: sel.mesic_do,
                                    isp_fim: sel.isp_fim,
                                    vykaz_typ_iissp: sel.vykaz_typ_iissp,
                                    dat_zadal: sel.dat_zadal,
                                    pocet_rozdilu: sel.pocet_rozdilu
                                });
                            }
                        }
                    ]);
                    this.menuBar(this.actions.createBar([
                        "genAct*",
                        "prevzitAct*",
                        "historieAct*",
                        "obsahAct*",
                        "refreshAct*",
                        "stornoAct*",
                        "porovnatAct*",
                        "zobrazitAct*",
                        "newGenAct*",
                    ]));
                    //#endregion
                    this.filterpanel = $.newDiv().appendTo(this.element)
                        .gfilterpanel({
                        forms: [this.createForm(options, "filter")],
                        filterViewMode: FilterViewMode.Simple,
                        idSimpleMode: "iisspVykazy",
                        favorites: ["isp_fim", "rok", "mesic_do", "vykaz", "priz_vyzvednuto", "priz_chybne"],
                        apply: (ev, o) => { this.loadData(o.filter); }
                    });
                    this.view = new Gordic.Data.View([], { key: "id_inbox_ssp" });
                    this.grid = $.newDiv().appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: this.view,
                        columns: this.createGridFormat(),
                        selection: (ev, o) => {
                            const sel = o.getSelection()[0];
                            const perms = sel?.Permissions;
                            this.actions["historieAct"].enabled(!!sel);
                            this.actions["obsahAct"].enabled(!!sel);
                            if (perms) {
                                this.actions["prevzitAct"].updatePermission(perms.LzePrevzit);
                                this.actions["stornoAct"].updatePermission(perms.LzeStornovat);
                                this.actions["porovnatAct"].updatePermission(perms.LzePorovnat);
                                this.actions["zobrazitAct"].updatePermission(perms.LzeZobrazit);
                                this.actions["newGenAct"].updatePermission(perms.LzeGenerovatNew);
                            }
                        }
                    });
                    this.beginOperation();
                    this.isl.IisspVykaz.readLzeGenerovat({})
                        .getData()
                        .then((d) => {
                        const lzeGenerovat = d.Permissions?.LzeGenerovat;
                        if (lzeGenerovat) {
                            this.title = lzeGenerovat.value
                                ? "jres:31150277" //RC 31150277 : Výkazy IISSP
                                : "jres:31150278"; //RC 31150278 : Výkazy IISSP - pouze prohlížení
                            this.actions["genAct"]?.updatePermission(lzeGenerovat);
                        }
                    })
                        .always(() => { this.endOperation(); });
                    this.filterpanel.gfilterpanel("applyFilter", { isp_fim: options.fim, rok: options.rok });
                }
                loadData(o) {
                    this.beginOperation();
                    return this.isl.IisspVykaz.list({ filters: o })
                        .get()
                        .then((d) => {
                        const perms = d.servicePermissions;
                        if (perms) {
                            this.actions["prevzitAct"].updatePermission(perms.LzePrevzit);
                            this.actions["stornoAct"].updatePermission(perms.LzeStornovat);
                            this.actions["porovnatAct"].updatePermission(perms.LzePorovnat);
                            this.actions["zobrazitAct"].updatePermission(perms.LzeZobrazit);
                            this.actions["newGenAct"].updatePermission(perms.LzeGenerovatNew);
                        }
                        this.view.updateData(d.data);
                    })
                        .always(() => { this.endOperation(); });
                }
                createForm(options, mode) {
                    return new Gordic.Forms.Form()
                        .addRow("jres:31150281") //RC 31150281 : FIM
                        .addField("gstringbox", { name: "isp_fim", disabled: true, defaultValue: options.fim })
                        .addRow("jres:31150282") //RC 31150282 : Rok
                        .addField("gnumberbox", { name: "rok", disabled: true, defaultValue: options.rok })
                        .addRow("jres:31150283") //RC 31150283 : Měsíc
                        .addField("gnumberbox", {
                        name: "mesic_do",
                        emptyValue: null,
                        defaultValue: new Date().getMonth() + 1,
                        //defaultValue: mode === "filter" ? undefined : new Date().getMonth() + 1,
                        validators: mode === "filter"
                            ? [new Gordic.Validators.Range({ min: 1, max: 12 })]
                            : [new Gordic.Validators.Range({ min: 1, max: 12 }), new Gordic.Validators.Required()]
                    })
                        .addRow("jres:31150284") //RC 31150284 : Výkaz
                        .addField("gselectbox", {
                        name: "vykaz",
                        model: "model.vykaz_typ=value.vykaz_typ;model.vykaz_typ_iissp=value.vykaz_typ_iissp",
                        itemTemplate: "{vykaz_typ_txt}",
                        dropdown: true,
                        strict: true,
                        validators: mode === "filter" ? [] : [new Gordic.Validators.Required()],
                        data: this.isl.IisspVykaz.listTyp({ filters: { rok: options.rok } })
                            .getView().then((v) => { return v; })
                    })
                        .addRow({ label: "jres:31150311", customClass: mode === "filter" ? "" : "hidden" }) //RC 31150311 : Zobrazit vyzvednuté
                        .addField("gcheck", {
                        name: "priz_vyzvednuto",
                        modelValueTransform: {
                            apply: (mv) => { return mv > 0; },
                            collect: (fv) => { return fv ? 1 : 0; }
                        }
                    })
                        .addRow({ label: "jres:31150312", customClass: mode === "filter" ? "" : "hidden" }) //RC 31150312 : Zobrazit chybné
                        .addField("gcheck", {
                        name: "priz_chybne",
                        modelValueTransform: {
                            apply: (mv) => { return mv > 0; },
                            collect: (fv) => { return fv ? 1 : 0; }
                        }
                    });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "vykaz_typ_iissp",
                        caption: "jres:31150285", //RC 31150285 : Typ
                        description: "jres:31150286", //RC 31150286 : Typ výkazu
                        width: 50
                    })
                        .addNumberColumn({
                        name: "rok",
                        caption: "jres:31150282", //RC 31150282 : Rok
                        width: 50
                    })
                        .addNumberColumn({
                        name: "mesic_do",
                        caption: "jres:31150287", //RC 31150287 : Měsíc
                        width: 50
                    })
                        .addIconColumn({
                        name: "status",
                        caption: "jres:31150049", //RC 31150049 : Status
                        width: 350,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.full,
                        iconTemplate: (d) => {
                            switch (d.status_inbox) {
                                case 0: return { icon: "gi-paper", text: d.status_inbox_zkr, tooltip: "jres:31150033" }; //RC 31150033 : Zpracování dávky inicializováno
                                case 1: return { icon: "gi-paper g-state-text g-state-favorite", text: d.status_inbox_zkr, tooltip: "jres:31150034" }; //RC 31150034 : Dávka zařazena do fronty zpracování
                                case 2: return { icon: "gi-paper g-state-text g-state-info", text: d.status_inbox_zkr, tooltip: "jres:31150035" }; //RC 31150035 : Zpracování dávky zahájeno
                                case 8: return { icon: "fa-check-circle g-state-text g-state-success", text: d.status_inbox_zkr, tooltip: "jres:31150036" }; //RC 31150036 : Zpracování dávky ukončeno
                                case 9: return { icon: "fa-times-circle g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150037" }; //RC 31150037 : Zpracování dávky ukončeno s chybou
                                case 100: return { icon: "fa-exclamation-circle g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150038" }; //RC 31150038 : Nepodařilo se sestavit a odeslat dávku
                                case 110: return { icon: "gi-tick g-state-text g-state-success", text: d.status_inbox_zkr, tooltip: "jres:31150039" }; //RC 31150039 : Zprávy staženy
                                case 120: return { icon: "fa-times g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150040" }; //RC 31150040 : Při práci s dávkou došlo v GINIS k chybě
                                case 130: return { icon: "fa-window-close-o g-state-text g-state-error", text: d.status_inbox_zkr, tooltip: "jres:31150041" }; //RC 31150041 : Komunikační chyba mezi GINIS a IISSP
                                case 140: return { icon: "fa-minus-circle g-state-text g-state-warning", text: d.status_inbox_zkr, tooltip: "jres:31150042" }; //RC 31150042 : Neexistují data pro výběrová kritéria
                                case 150: return { icon: "fa-ban", text: d.status_inbox_zkr, tooltip: "jres:31150043" }; //RC 31150043 : Dávka byla stornována uživatelem GINIS
                                case 160: return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: d.status_inbox_zkr, tooltip: "jres:31150044" }; //RC 31150044 : Bylo vyžádáno generování novějšího výkazu
                                case 170: return { icon: "fa-window-close g-state-text g-state-warning", text: d.status_inbox_zkr, tooltip: "jres:31150045" }; //RC 31150045 : Chyba při generování sestavy výkazu v GINIS
                                default: return { icon: "", text: d.status_inbox_zkr, tooltip: "" };
                            }
                        }
                    })
                        .addIconColumn({
                        name: "stav_porovnani",
                        caption: "jres:31150289", //RC 31150289 : P
                        description: "jres:31150290", //RC 31150290 : Výsledek porovnání
                        iconTemplate: (d) => {
                            switch (d.stav_porovnani) {
                                case 0: //v priprave
                                    return { icon: "gi-dokument_neurceno", text: "jres:31150291" }; //RC 31150291 : Neurčeno
                                case 10: //pripraveno
                                    return { icon: "gi-arrow", text: "jres:31150292" }; //RC 31150292 : Připraveno k porovnání
                                case 20: //shoda
                                    return { icon: "fa-check-circle g-state-text g-state-success", text: "jres:31150293" }; //RC 31150293 : Výkazy jsou shodné
                                case 30: //neshoda
                                    return { icon: "fa-exclamation-circle g-state-text g-state-error", text: "jres:31150294" }; //RC 31150294 : Výkazy se liší
                                case 40: //shoda
                                    return { icon: "fa-check-circle g-state-text g-state-info", text: "jres:31150295" }; //RC 31150295 : Výkazy jsou shodné – bylo vyžádáno generování novějšího výkazu – již nelze zobrazit
                                case 50: //neshoda
                                    return { icon: "fa-exclamation-circle g-state-text g-state-info", text: "jres:31150296" }; //RC 31150296 : Výkazy se liší – bylo vyžádáno generování novějšího výkazu – již nelze zobrazit
                            }
                            return null;
                        }
                    })
                        .addNumberColumn({
                        name: "pocet_rozdilu",
                        caption: "jres:31150297", //RC 31150297 : Rozdíly
                        description: "jres:31150298" //RC 31150298 : Počet různých řádků
                    })
                        .addDateTimeColumn({
                        name: "dat_ukonceni",
                        caption: "jres:31150299", //RC 31150299 : Datum ukončení
                        description: "jres:31150300" //RC 31150300 : Čas předpokládaného ukončení zpracování v IISSP
                    })
                        .addDateTimeColumn({
                        name: "dat_zadal",
                        caption: "jres:31150301", //RC 31150301 : Datum vyžádání
                        description: "jres:31150302" //RC 31150302 : Okamžik vyžádání požadavku
                    })
                        .addNumberColumn({
                        name: "pocet_zprav",
                        caption: "jres:31150303", //RC 31150303 : Zpráv
                        description: "jres:31150304" //RC 31150304 : Počet zpráv vygenerovaných v IISSP v rámci odpovědi
                    })
                        .addTextColumn({ name: "id_inbox_ris", caption: "jres:31150047" }) //RC 31150047 : IISSP dávka
                        .addTextColumn({ name: "id_inbox_ext", caption: "jres:31150046" }) //RC 31150046 : GINIS dávka
                        .addTextColumn({
                        name: "zadal_nazev_rf",
                        caption: "jres:31150305", //RC 31150305 : Vyžádal
                        description: "jres:31150306", //RC 31150306 : Požadavek vyžádal
                        width: 130
                    })
                        .addDateTimeColumn({
                        name: "dat_prevzal",
                        caption: "jres:31150307", //RC 31150307 : Datum převzetí/storna
                        description: "jres:31150308", //RC 31150308 : Okamžik převzetí výsledků / Okamžik storna
                        width: 110
                    })
                        .addTextColumn({
                        name: "prevzal_nazev_rf",
                        caption: "jres:31150309", //RC 31150309 : Převzal/Stornoval
                        description: "jres:31150310" //RC 31150310 : Výsledky převzal / Dávku stornoval
                    });
                }
                generate() {
                    const fData = this.filterpanel.gfilterpanel("getCurrentData");
                    this.beginOperation();
                    return this.dialogs.simpleForm("jres:31150279", //RC 31150279 : Generovat
                    this.createForm(this.options, "dialog"), fData)
                        .createDialogPromise(d => !!d)
                        .then((d) => { return this.generateNew(d); })
                        .always(() => { this.endOperation(); });
                }
                generateNew(d) {
                    const o = this.options;
                    this.beginOperation();
                    return this.isl.IisspVykaz.createCommit({
                        data: {
                            vykaz_typ_iissp: d.vykaz_typ_iissp,
                            rok: d.rok,
                            mesic_do: d.mesic_do,
                            isp_fim: d.isp_fim,
                            ico: o.ico,
                            ucs: o.ucs
                        }
                    })
                        .get()
                        .then((r) => {
                        const def = $.Deferred();
                        const o = this.options;
                        const id_inbox_ssp = r.result.data.id_inbox_ssp;
                        let vykaz = "";
                        switch (d.vykaz_typ_iissp) {
                            case "RV01":
                                vykaz = "UCRGBFO1";
                                break;
                            case "RV02":
                            case "RV06":
                                vykaz = "UCRGBFO2";
                                break;
                            case "RV03":
                                vykaz = "UCRGBFO3";
                                break;
                            case "RV04":
                            case "RV05":
                                vykaz = "UCRGBANV";
                                break;
                            default: throw new GError(`Neznamy typ vykazu '${d.vykaz_typ_iissp}'`); //TODO: Exc...
                        }
                        GAction.createPrintAction({
                            name: "vykazGenAct",
                            tema: "ucr_ptm_techtem",
                            parentContent: this,
                            platnost: `${d.rok}${("00" + d.mesic_do).slice(-2)}`,
                            serverRestrictionAlvMethod: "Gordic.Iissp.WebControls.GVykazy:VykazyRestrictionAlvMethod",
                            serverParameterMethod: "Gordic.Iissp.WebControls.GVykazy:VykazyServerParameterMethod",
                            //Sestava je nevizualni, soubor reportu nepotrebujeme.
                            customDto: {
                                id_inbox_ssp: id_inbox_ssp,
                                vykaz: vykaz,
                                ico: o.ico,
                                ucs: o.ucs,
                                rok: d.rok,
                                mesic: d.mesic_do,
                                ico_or_ucs: !!r.result.data.ico_or_ucs
                            },
                            //reportStarting: (ps) => { }, //NOTE (BM): Asi nepotrebujeme
                            //reportSelected: (ev, ri) => { },
                            reportGenerated: (ev, ri) => {
                                ev.preventDefault(); //Sestava je nevizualni, tak generovani zrusime.
                                def.resolve(id_inbox_ssp);
                                $.content(ev.target).tryClose();
                            },
                            dialogClosed: (ev, ri) => { def.reject(); }
                        }).run();
                        return def.promise();
                    })
                        .then((id_inbox_ssp) => {
                        return this.isl.IisspVykaz.uspechSestavyCommit({
                            data: {
                                id_inbox_ssp: id_inbox_ssp
                            }
                        }).get();
                    })
                        .then((r) => {
                        this.showFlash("jres:31150358".format(r.result?.data?.id_inbox_ext ?? "-")); //RC 31150358 : Výkaz {0} byl vygenerován.
                        this.actions["refreshAct"]?.run();
                    })
                        .always(() => { this.endOperation(); });
                }
            }
            WebControls.GVykazy = GVykazy;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Iissp;
    (function (Iissp) {
        var WebControls;
        (function (WebControls) {
            /**
             * GVykazyPorovnani
             * Vytvoreno dle: N:\GINIS\489\dev\net\Gordic.Iissp.WinClient\Inbox\GInboxPorovnaniTab.cs
             *
             * @author bmartinek
             * @since 490.1.0.16
             */
            class GVykazyPorovnani extends GContent {
                constructor() {
                    super(...arguments);
                    this.uid = "GIisspVykazyPorovnani#";
                }
                prepareContent(options) {
                    this.title = `${options.vykaz_typ_iissp} - provnání`; //TODO: JRES
                    this.statusBar([
                        {
                            type: "static",
                            caption: `FIM: ${options.isp_fim}`, //TODO: JRES
                        },
                        {
                            type: "static",
                            caption: `Rok: ${options.rok}`, //TODO: JRES
                        },
                        {
                            type: "static",
                            caption: `Měsíc: ${options.mesic_do}`, //TODO: JRES
                        },
                        {
                            type: "static",
                            caption: `Výkaz: ${options.vykaz_typ_iissp}`, //TODO: JRES
                        },
                        {
                            type: "static",
                            caption: `Generováno: ${Gordic.Templates.Formatters.datetime(options.dat_zadal)}`, //TODO: JRES
                        },
                        {
                            type: "static",
                            caption: `Počet rozdílů: ${options.pocet_rozdilu}`, //TODO: JRES
                        }
                    ]);
                    $.newDiv().appendTo(this.element)
                        .gfilterpanel({
                        forms: [
                            new Gordic.Forms.Form()
                                .addRow("jres:31150359") //RC 31150359 : Jen rozdíly
                                .addField("gcheck", { name: "rozdily" })
                                .addRow("jres:31150360") //RC 31150360 : Jen GINIS
                                .addField("gcheck", {
                                name: "ginis",
                                change: (ev, input) => {
                                    if (!input.value)
                                        return;
                                    $(ev.target).closest(".gform").findFields("iissp")
                                        .gfield("model", "apply", { iissp: false }, { setFlags: { triggerChange: false } });
                                }
                            })
                                .addRow("jres:31150361") //RC 31150361 : Jen IISSP
                                .addField("gcheck", {
                                name: "iissp",
                                change: (ev, input) => {
                                    if (!input.value)
                                        return;
                                    $(ev.target).closest(".gform").findFields("ginis")
                                        .gfield("model", "apply", { ginis: false }, { setFlags: { triggerChange: false } });
                                }
                            })
                        ],
                        filterViewMode: FilterViewMode.Simple,
                        idSimpleMode: "iisspVykazyPorovnani",
                        favorites: ["rozdily", "ginis", "iissp"],
                        apply: (ev, o) => {
                            const f = o.filter;
                            this.view.process({
                                filter: new Gordic.Data.FilterProcessor((md) => {
                                    const d = md.data;
                                    let shouldBeVisible = true;
                                    if (f.rozdily)
                                        shouldBeVisible = d.rozdily > 1;
                                    if (f.ginis && shouldBeVisible)
                                        shouldBeVisible = d.zdroj === 0;
                                    if (f.iissp && shouldBeVisible)
                                        shouldBeVisible = d.zdroj === 1 || d.neshoda === 0;
                                    return shouldBeVisible;
                                })
                            });
                        }
                    });
                    switch (options.vykaz_typ_iissp) {
                        case "RV01":
                            this.prepareRV01(options);
                            break;
                        case "RV02":
                        case "RV06":
                            this.prepareRV02RV06(options);
                            break;
                        case "RV03":
                            this.prepareRV03(options);
                            break;
                        case "RV04":
                        case "RV05":
                            this.prepareRV04RV05(options);
                            break;
                        default: throw new GError(`Prop. 'vykaz_typ_iissp' with val '${options.vykaz_typ_iissp}' is not supported.`);
                    }
                }
                prepareRV01(o) {
                    const view = this.view = new Gordic.Data.View([]);
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "RV01",
                        data: view,
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "alternating",
                            caption: "#", //TODO: JRES
                            width: 40
                        })
                            .addIconColumn({
                            name: "rozdily_img",
                            caption: "jres:31150319", //RC 31150319 : V
                            description: "jres:31150320", //RC 31150320 : Výsledek porovnání řádku
                            iconTemplate: (d) => {
                                if (d) {
                                    switch (d.rozdily) {
                                        case 1: return { icon: "fa-check-circle g-state-text g-state-success", text: "jres:31150315" }; //RC 31150315 : OK
                                        case 2: return { icon: "fa-exclamation-circle g-state-text g-state-error", text: "jres:31150316" }; //RC 31150316 : Jiné částky
                                        case 3: return { icon: "gi-gordic", text: "jres:31150317" }; //RC 31150317 : Řádek je jen v GINIS
                                        case 4: return { icon: "fa-eur", text: "jres:31150318" }; //RC 31150318 : Řádek je jen v IISSP
                                        case 0:
                                        default: break;
                                    }
                                }
                                return null;
                            }
                        })
                            .addTextColumn({
                            name: "rozdily_txt",
                            caption: "jres:24450004", //RC 24450004 : Výsledek
                            width: 100
                        })
                            .addTextColumn({ name: "rozdily_txt", caption: "jres:31150321", width: 85 }) //RC 31150321 : Výsledek
                            .addTextColumn({ name: "isp_par", caption: "jres:31150322", width: 60 }) //RC 31150322 : Par
                            .addTextColumn({ name: "isp_pol", caption: "jres:31150323", width: 40 }) //RC 31150323 : Pol
                            .addTextColumn({ name: "isp_zdr", caption: "jres:31150324", width: 65 }) //RC 31150324 : Zdr
                            .addTextColumn({ name: "isp_eds", caption: "jres:31150325", width: 70 }) //RC 31150325 : Eds
                            .addTextColumn({ name: "isp_ucl", caption: "jres:31150326", width: 70 }) //RC 31150326 : Ucl
                            .addTextColumn({ name: "isp_pvs", caption: "jres:31150327", width: 80 }) //RC 31150327 : Pvs
                            .addCurrencyColumn({ name: "c_r_sch", caption: "jres:31150328", width: 100 }) //RC 31150328 : Schválený
                            .addCurrencyColumn({ name: "c_r_zme", caption: "jres:31150329", width: 100 }) //RC 31150329 : Po změnách
                            .addCurrencyColumn({ name: "c_r_kon", caption: "jres:31150330", width: 100 }) //RC 31150330 : Konečný
                            .addCurrencyColumn({ name: "c_sku", caption: "jres:31150331", width: 100 }) //RC 31150331 : Skutečnost
                    });
                    this.beginOperation();
                    this.isl.IisspVykaz.listGlo({
                        filters: {
                            vykaz_typ_iissp: o.vykaz_typ_iissp,
                            rok: o.rok,
                            mesic_do: o.mesic_do,
                            isp_fim: o.isp_fim
                        }
                    })
                        .getData()
                        .then((d) => { view.updateData(d); })
                        .always(() => { this.endOperation(); });
                }
                prepareRV02RV06(o) {
                    const view = this.view = new Gordic.Data.View([]);
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "RV01",
                        data: view,
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "alternating",
                            caption: "#", //TODO: JRES
                            width: 40
                        })
                            .addIconColumn({
                            name: "rozdily_img",
                            caption: "jres:31150319", //RC 31150319 : V
                            description: "jres:31150320", //RC 31150320 : Výsledek porovnání řádku
                            iconTemplate: (d) => {
                                if (d) {
                                    switch (d.rozdily) {
                                        case 1: return { icon: "fa-check-circle g-state-text g-state-success", text: "jres:31150315" }; //RC 31150315 : OK
                                        case 2: return { icon: "fa-exclamation-circle g-state-text g-state-error", text: "jres:31150316" }; //RC 31150316 : Jiné částky
                                        case 3: return { icon: "gi-gordic", text: "jres:31150317" }; //RC 31150317 : Řádek je jen v GINIS
                                        case 4: return { icon: "fa-eur", text: "jres:31150318" }; //RC 31150318 : Řádek je jen v IISSP
                                        case 0:
                                        default: break;
                                    }
                                }
                                return null;
                            }
                        })
                            .addTextColumn({
                            name: "rozdily_txt",
                            caption: "jres:24450004", //RC 24450004 : Výsledek
                            width: 100
                        })
                            .addTextColumn({ name: "rozdily_txt", caption: "jres:31150321", width: 85 }) //RC 31150321 : Výsledek
                            .addTextColumn({ name: "nazev_display", caption: "Název", width: 250 })
                            .addTextColumn({
                            name: "radek_cislo",
                            caption: "jres:31150333", //RC 31150333 : Řádek
                            width: 60,
                            description: "jres:31150332" //RC 31150332 : Číslo určující typ řádku dle vyhlášky
                        })
                            .addCurrencyColumn({ name: "c_r_sch", caption: "jres:31150334", width: 100 }) //RC 31150334 : Schválený
                            .addCurrencyColumn({ name: "c_r_zme", caption: "jres:31150335", width: 100 }) //RC 31150335 : Po změnách
                            .addCurrencyColumn({ name: "c_r_kon", caption: "jres:31150336", width: 100 }) //RC 31150336 : Konečný
                            .addCurrencyColumn({ name: "c_sku", caption: "jres:31150337", width: 100 }) //RC 31150337 : Skutečnost
                    });
                    this.beginOperation();
                    this.isl.IisspVykaz.listRek({
                        filters: {
                            vykaz_typ_iissp: o.vykaz_typ_iissp,
                            rok: o.rok,
                            mesic_do: o.mesic_do,
                            isp_fim: o.isp_fim
                        }
                    })
                        .getData()
                        .then((d) => { view.updateData(d); })
                        .always(() => { this.endOperation(); });
                }
                prepareRV03(o) {
                    const view = this.view = new Gordic.Data.View([]);
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "RV01",
                        data: view,
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "alternating",
                            caption: "#", //TODO: JRES
                            width: 40
                        })
                            .addIconColumn({
                            name: "rozdily_img",
                            caption: "jres:31150319", //RC 31150319 : V
                            description: "jres:31150320", //RC 31150320 : Výsledek porovnání řádku
                            iconTemplate: (d) => {
                                if (d) {
                                    switch (d.rozdily) {
                                        case 1: return { icon: "fa-check-circle g-state-text g-state-success", text: "jres:31150315" }; //RC 31150315 : OK
                                        case 2: return { icon: "fa-exclamation-circle g-state-text g-state-error", text: "jres:31150316" }; //RC 31150316 : Jiné částky
                                        case 3: return { icon: "gi-gordic", text: "jres:31150317" }; //RC 31150317 : Řádek je jen v GINIS
                                        case 4: return { icon: "fa-eur", text: "jres:31150318" }; //RC 31150318 : Řádek je jen v IISSP
                                        case 0:
                                        default: break;
                                    }
                                }
                                return null;
                            }
                        })
                            .addTextColumn({
                            name: "rozdily_txt",
                            caption: "jres:24450004", //RC 24450004 : Výsledek
                            width: 100
                        })
                            .addTextColumn({
                            name: "id_ukazatel",
                            caption: "jres:31150338", //RC 31150338 : Kód ukazatele
                            description: "jres:31150339", //RC 31150339 : Identifikátor závazného ukazatele
                            width: 100
                        })
                            .addCurrencyColumn({ name: "c_r_sch", caption: "jres:31150340", width: 100 }) //RC 31150340 : Schválený
                            .addCurrencyColumn({ name: "c_r_zme", caption: "jres:31150341", width: 100 }) //RC 31150341 : Po změnách
                            .addCurrencyColumn({ name: "c_r_kon", caption: "jres:31150342", width: 100 }) //RC 31150342 : Konečný
                            .addCurrencyColumn({ name: "c_sku", caption: "jres:31150343", width: 100 }) //RC 31150343 : Skutečnost
                            .addCurrencyColumn({ name: "c_mrp", caption: "jres:31150344", width: 100 }) //RC 31150344 : Mimorozpočtové
                            .addCurrencyColumn({ name: "c_nnv", caption: "jres:31150345", width: 100 }) //RC 31150345 : Čerpání NNV
                    });
                    this.beginOperation();
                    this.isl.IisspVykaz.listZuk({
                        filters: {
                            vykaz_typ_iissp: o.vykaz_typ_iissp,
                            rok: o.rok,
                            mesic_do: o.mesic_do,
                            isp_fim: o.isp_fim
                        }
                    })
                        .getData()
                        .then((d) => { view.updateData(d); })
                        .always(() => { this.endOperation(); });
                }
                prepareRV04RV05(o) {
                    const view = this.view = new Gordic.Data.View([]);
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "RV01",
                        data: view,
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({
                            name: "alternating",
                            caption: "#", //TODO: JRES
                            width: 40
                        })
                            .addIconColumn({
                            name: "rozdily_img",
                            caption: "jres:31150319", //RC 31150319 : V
                            description: "jres:31150320", //RC 31150320 : Výsledek porovnání řádku
                            iconTemplate: (d) => {
                                if (d) {
                                    switch (d.rozdily) {
                                        case 1: return { icon: "fa-check-circle g-state-text g-state-success", text: "jres:31150315" }; //RC 31150315 : OK
                                        case 2: return { icon: "fa-exclamation-circle g-state-text g-state-error", text: "jres:31150316" }; //RC 31150316 : Jiné částky
                                        case 3: return { icon: "gi-gordic", text: "jres:31150317" }; //RC 31150317 : Řádek je jen v GINIS
                                        case 4: return { icon: "fa-eur", text: "jres:31150318" }; //RC 31150318 : Řádek je jen v IISSP
                                        case 0:
                                        default: break;
                                    }
                                }
                                return null;
                            }
                        })
                            .addTextColumn({
                            name: "rozdily_txt",
                            caption: "jres:24450004", //RC 24450004 : Výsledek
                            width: 100
                        })
                            .addTextColumn({ name: "nazev_display", caption: "Název", width: 250 })
                            .addNumberColumn({
                            name: "radek_cislo",
                            caption: "jres:31150346", //RC 31150346 : Řádek
                            width: 60,
                            description: "jres:31150347" //RC 31150347 : Číslo určující typ řádku dle vyhlášky
                        })
                            .addDecimalColumn({ name: "c_sl_1", caption: "jres:31150348", width: 100 }) //RC 31150348 : 1. Stav
                            .addDecimalColumn({ name: "c_sl_2", caption: "jres:31150349", width: 100 }) //RC 31150349 : 2. Změna
                            .addDecimalColumn({ name: "c_sl_3", caption: "jres:31150350", width: 100 }) //RC 31150350 : 3. Ukončení (ze 2)
                            .addDecimalColumn({ name: "c_sl_4", caption: "jres:31150351", width: 100 }) //RC 31150351 : 4. Zapojení (ze 2)
                            .addDecimalColumn({ name: "c_sl_5", caption: "jres:31150352", width: 100 }) //RC 31150352 : 5. Zapojení vláda
                            .addDecimalColumn({ name: "c_sl_6", caption: "jres:31150353", width: 100 }) //RC 31150353 : 6. Konečný (1+2)
                            .addDecimalColumn({ name: "c_sl_7", caption: "jres:31150354", width: 100 }) //RC 31150354 : 7. Čerpání
                            .addDecimalColumn({ name: "c_sl_8", caption: "jres:31150355", width: 100 }) //RC 31150355 : 8. Nečerpané (4+5-7)
                            .addDecimalColumn({ name: "c_sl_9", caption: "jres:31150356", width: 100 }) //RC 31150356 : 9. Zůstatek (6+8)
                    });
                    this.beginOperation();
                    this.isl.IisspVykaz.listNar({
                        filters: {
                            vykaz_typ_iissp: o.vykaz_typ_iissp,
                            rok: o.rok,
                            mesic_do: o.mesic_do,
                            isp_fim: o.isp_fim
                        }
                    })
                        .getData()
                        .then((d) => { view.updateData(d); })
                        .always(() => { this.endOperation(); });
                }
            }
            WebControls.GVykazyPorovnani = GVykazyPorovnani;
        })(WebControls = Iissp.WebControls || (Iissp.WebControls = {}));
    })(Iissp = Gordic.Iissp || (Gordic.Iissp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Prefabs;
    (function (Prefabs) {
        var GridFormats;
        (function (GridFormats) {
            function GIisspEkisSpPskHistorieDtoGfPrefab() {
                return new Gordic.Data.GridFormat()
                    .addNumberColumn({
                    name: "id_volani_ssp" /* names.id_volani_ssp */,
                    dataType: "number" /* types.id_volani_ssp */,
                    fragment: "*" /* fragments.id_volani_ssp */,
                    caption: "jres:31150002", //RC 31150002 : Id volání
                    width: 80
                })
                    //.addNumberColumn({
                    //    name: names.por_cis,
                    //    dataType: types.por_cis,
                    //    fragment: fragments.por_cis,
                    //    caption: "?"
                    //})
                    //.addNumberColumn({
                    //    name: names.vysl_volani,
                    //    dataType: types.vysl_volani,
                    //    fragment: fragments.vysl_volani,
                    //    caption: "?"
                    //})
                    .addTextColumn({
                    name: "vysl_volani_txt" /* names.vysl_volani_txt */,
                    dataType: "string" /* types.vysl_volani_txt */,
                    fragment: "*" /* fragments.vysl_volani_txt */,
                    caption: "jres:31150003", //RC 31150003 : Výsledek
                    width: 250
                })
                    .addDateTimeColumn({
                    name: "dat_zmena" /* names.dat_zmena */,
                    dataType: "JsonDate" /* types.dat_zmena */,
                    fragment: "*" /* fragments.dat_zmena */,
                    caption: "jres:31150004", //RC 31150004 : Datum volání
                    width: 135
                })
                    .addTextColumn({
                    name: "druh" /* names.druh */,
                    dataType: "string" /* types.druh */,
                    fragment: "*" /* fragments.druh */,
                    caption: "jres:31150005", //RC 31150005 : Druh
                    width: 50
                })
                    .addTextColumn({
                    name: "id_ext" /* names.id_ext */,
                    dataType: "string" /* types.id_ext */,
                    fragment: "*" /* fragments.id_ext */,
                    caption: "jres:31150006", //RC 31150006 : ID ext
                    width: 160
                })
                    .addDateTimeColumn({
                    name: "datum_od" /* names.datum_od */,
                    dataType: "JsonDate" /* types.datum_od */,
                    fragment: "*" /* fragments.datum_od */,
                    caption: "jres:31150007", //RC 31150007 : Datum od
                    width: 135
                })
                    .addDateTimeColumn({
                    name: "datum" /* names.datum */,
                    dataType: "JsonDate" /* types.datum */,
                    fragment: "*" /* fragments.datum */,
                    caption: "jres:31150008", //RC 31150008 : Datum
                    width: 135
                })
                    .addTextColumn({
                    name: "doklad_cislo" /* names.doklad_cislo */,
                    dataType: "string" /* types.doklad_cislo */,
                    fragment: "*" /* fragments.doklad_cislo */,
                    caption: "jres:31150009", //RC 31150009 : Dokl. číslo
                    width: 100
                })
                    .addIconColumn({
                    name: "typ_hlaseni" /* names.typ_hlaseni */,
                    iconTemplate: (d) => {
                        const type = d.typ_hlaseni?.trim().toUpperCase();
                        switch (type) {
                            case "I": return { icon: "fa-info-circle g-state-text g-state-info", text: "jres:31150016" }; //RC 31150016 : Informace
                            case "W": return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:31150015" }; //RC 31150015 : Varování
                            case "E": return { icon: "fa-times-circle  g-state-text g-state-error", text: "jres:31150017" }; //RC 31150017 : Chyba
                            default: return null;
                        }
                    },
                    fragment: "*" /* fragments.typ_hlaseni */,
                    caption: "jres:31150010", //RC 31150010 : Typ zpr.
                    width: 70
                })
                    .addTextColumn({
                    name: "id_hlaseni" /* names.id_hlaseni */,
                    dataType: "string" /* types.id_hlaseni */,
                    fragment: "*" /* fragments.id_hlaseni */,
                    caption: "jres:31150011", //RC 31150011 : Ident. zprávy
                    width: 120
                })
                    .addTextColumn({
                    name: "text_hlaseni" /* names.text_hlaseni */,
                    dataType: "string" /* types.text_hlaseni */,
                    fragment: "*" /* fragments.text_hlaseni */,
                    caption: "jres:31150012", //RC 31150012 : Text zprávy
                    width: 250
                })
                    .addTextColumn({
                    name: "text_chyby" /* names.text_chyby */,
                    dataType: "string" /* types.text_chyby */,
                    fragment: "*" /* fragments.text_chyby */,
                    caption: "jres:31150013", //RC 31150013 : Text chyby
                    width: 250
                });
            }
            GridFormats.GIisspEkisSpPskHistorieDtoGfPrefab = GIisspEkisSpPskHistorieDtoGfPrefab;
        })(GridFormats = Prefabs.GridFormats || (Prefabs.GridFormats = {}));
    })(Prefabs = Gordic.Prefabs || (Gordic.Prefabs = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlzc3Aud2ViY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlRlc3QudHMiLCJDb250cm9scy9HSWlzc3BIaXN0b3J5RGV0YWlsUHNrLnRzIiwiQ29udHJvbHMvR0lpc3NwSGlzdG9yeVBzay50cyIsIkNvbnRyb2xzL0dJaXNzcFByZXVjdG92YW5pU2t1dGVjbm9zdGkudHMiLCJDb250cm9scy9HSWlzc3BSZXpEZXRhaWwudHMiLCJDb250cm9scy9HSWlzc3BSZXpEZXRhaWxFeHQudHMiLCJDb250cm9scy9HSWlzc3BSZXpIaXN0b3J5LnRzIiwiQ29udHJvbHMvR0lpc3NwUmV6V3NDYWxsSGlzdG9yeS50cyIsIkNvbnRyb2xzL0dJaXNzcFJleldzQ2FsbEhpc3RvcnlEZXRhaWxzLnRzIiwiQ29udHJvbHMvR0luYm94LnRzIiwiQ29udHJvbHMvR0luYm94QmF0Y2hDb250ZW50LnRzIiwiQ29udHJvbHMvR0luYm94SGlzdG9yeS50cyIsIkNvbnRyb2xzL0dJbmJveEhpc3RvcnlEZXRhaWwudHMiLCJDb250cm9scy9HU3RydWt0dXJhSUlTU1AudHMiLCJDb250cm9scy9HU3Rza1BvaHlieS50cyIsIkNvbnRyb2xzL0dWeWthenkudHMiLCJDb250cm9scy9HVnlrYXp5UG9yb3ZuYW5pLnRzIiwiRFRPL0dJaXNzcEVraXNTcFBza0hpc3RvcmllRHRvLmdmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FJZjtBQUpELFdBQVUsTUFBTTtJQUFDLElBQUEsS0FBSyxDQUlyQjtJQUpnQixXQUFBLEtBQUs7UUFBQyxJQUFBLFdBQVcsQ0FJakM7UUFKc0IsV0FBQSxXQUFXO1lBQzlCLFNBQWdCLEdBQUc7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBRmUsZUFBRyxNQUVsQixDQUFBO1FBQ0wsQ0FBQyxFQUpzQixXQUFXLEdBQVgsaUJBQVcsS0FBWCxp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U0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsbUJBQW1COzZCQUMzRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsa0JBQWtCOzZCQUMxRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsa0JBQWtCOzZCQUMxRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFF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LEtBQUssRUFBRSxFQUFFO2lCQUNaLENBQUM7cUJBQ0QsYUFBYSxDQUFDO29CQUNYLElBQUkscUNBQWtCO29CQUN0QixRQUFRLGlDQUFrQjtvQkFDMUIsUUFBUSxnQ0FBc0I7b0JBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNkJBQTZCO29CQUN2RCxLQUFLLEVBQUUsR0FBRztpQkFDYixDQUFDO3FCQUNELGFBQWEsQ0FBQztvQkFDWCxJQUFJLHlDQUFvQjtvQkFDeEIsUUFBUSxtQ0FBb0I7b0JBQzVCLFFBQVEsa0NBQXdCO29CQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjtvQkFDckQsS0FBSyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQztxQkFDRCxhQUFhLENBQUM7b0JBQ1gsSUFBSSxxQ0FBa0I7b0JBQ3RCLFFBQVEsaUNBQWtCO29CQUMxQixRQUFRLGdDQUFzQjtvQkFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7b0JBQ3BELEtBQUssRUFBRSxHQUFHO2lCQUNiLENBQUMsQ0FBQztZQUNYLENBQUM7WUExR2UsOENBQWtDLHFDQTBHakQsQ0FBQTtRQUNMLENBQUMsRUEvR3dCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBK0duQztJQUFELENBQUMsRUEvR2dCLE9BQU8sR0FBUCxjQUFPLEtBQVAsY0FBTyxRQStHdkI7QUFBRCxDQUFDLEVBL0dTLE1BQU0sS0FBTixNQUFNLFFBK0dmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZm9vKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZm9vKClcIik7XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLklpc3NwLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHSWlzc3BIaXN0b3J5RGV0YWlsUHNrT3B0aW9ucyB7XHJcbiAgICAgICAgaWRfZXh0Pzogc3RyaW5nfG51bGw7XHJcbiAgICAgICAgaWRfdm9sYW5pX3NzcD86IG51bWJlcnxudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0lpc3NwSGlzdG9yeURldGFpbFBzayBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdWlkID0gXCJHSWlzc3BIaXN0b3J5RGV0YWlsUHNrI1wiO1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChvcHRpb25zOiBJR0lpc3NwSGlzdG9yeURldGFpbFBza09wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdPcHMoeyB0aXRsZTogXCJqcmVzOjMxMTUwMDE4XCIuZm9ybWF0KFwiMFwiKSB9KTsgLy9SQyAzMTE1MDAxOCA6IERldGFpbCB2b2zDoW7DrSByb3pocmFuw60gU3TDoXRuw60gcG9rbGFkbnkgcHJvIGlkIHZvbMOhbsOtIHswfVxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwRWtpc1NwUHNrSGlzdG9yaWUucmVhZCh7IGlkX2V4dDogb3B0aW9ucy5pZF9leHQsIGlkX3ZvbGFuaV9zc3A6IG9wdGlvbnMuaWRfdm9sYW5pX3NzcCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4geyB0aGlzLnJlbmRlckNvbnRlbnQocmVzKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW5kZXJDb250ZW50KGRhdGE6IEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwRWtpc1NwUHNrSGlzdG9yaWVEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdPcHMoeyB0aXRsZTogXCJqcmVzOjMxMTUwMDE4XCIuZm9ybWF0KGRhdGEuaWRfdm9sYW5pX3NzcD8udG9TdHJpbmcoKSA/PyBcIlwiKSB9KTsgLy9SQyAzMTE1MDAxOCA6IERldGFpbCB2b2zDoW7DrSByb3pocmFuw60gU3TDoXRuw60gcG9rbGFkbnkgcHJvIGlkIHZvbMOhbsOtIHswfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY29weUFjdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY29weUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDIxXCIsIC8vUkMgMzExNTAwMjEgOiBLb3DDrXJvdmF0XHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWNvcHlcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHg6IHsgdGV4dDogc3RyaW5nIH0pIHtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVXRpbHMuY29weVRvQ2xpcGJvYXJkKGN0eC50ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDAwMlwiKSAvL1JDIDMxMTUwMDAyIDogSWQgdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwiaWRfdm9sYW5pX3NzcFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMDAzXCIpIC8vUkMgMzExNTAwMDMgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwidnlzbF92b2xhbmlfdHh0XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAwMDRcIikgLy9SQyAzMTE1MDAwNCA6IERhdHVtIHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfem1lbmFcIiwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAwMDVcIikgLy9SQyAzMTE1MDAwNSA6IERydWhcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZHJ1aFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMDA2XCIpIC8vUkMgMzExNTAwMDYgOiBJRCBleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaWRfZXh0XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAwMDdcIikgLy9SQyAzMTE1MDAwNyA6IERhdHVtIG9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXR1bV9vZFwiLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDAwOFwiKSAvL1JDIDMxMTUwMDA4IDogRGF0dW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdHVtXCIsIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMDA5XCIpIC8vUkMgMzExNTAwMDkgOiBEb2tsLiDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImRva2xhZF9jaXNsb1wiLCBkaXNhYmxlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KFwiZGV0YWlsLWhlYWRlclwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSlcclxuICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEudGV4dF9jaHlieV9sb25nKSB7XHJcbiAgICAgICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAwMjJcIiwgLy9SQyAzMTE1MDAyMiA6IEluZm9ybWFjZSBvIGNoeWLEm1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGNvcHlBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25Db250ZXh0OiB7IHRleHQ6IGRhdGEudGV4dF9jaHlieV9sb25nIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKFwiPGRpdj5cIikuZ3N0cmluZ2JveCh7IGluaXRpYWxWYWx1ZTogZGF0YS50ZXh0X2NoeWJ5X2xvbmcsIHJvd3M6IDEwLCBkaXNhYmxlZDogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDAxOVwiLCAvL1JDIDMxMTUwMDE5IDogVnN0dXBuw60gWE1MXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGNvcHlBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNvbnRleHQ6IHsgdGV4dDogZGF0YS54bWxfcmVxdWVzdCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkKFwiPGRpdj5cIikuZ3N0cmluZ2JveCh7IGluaXRpYWxWYWx1ZTogZGF0YS54bWxfcmVxdWVzdCwgcm93czogMTAsIGRpc2FibGVkOiB0cnVlIH0pKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDAyMFwiLCAvL1JDIDMxMTUwMDIwIDogVsO9c3R1cG7DrSBYTUxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0IGdpLXJvdDE4MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogISFkYXRhLnhtbF9yZXNwb25zZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGNvcHlBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkNvbnRleHQ6IHsgdGV4dDogZGF0YS54bWxfcmVzcG9uc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJChcIjxkaXY+XCIpLmdzdHJpbmdib3goeyBpbml0aWFsVmFsdWU6IGRhdGEueG1sX3Jlc3BvbnNlLCByb3dzOiAxMCwgZGlzYWJsZWQ6IHRydWUgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsb3NlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdJc3NwSGlzdG9yeU9wdGlvbnMge1xyXG4gICAgICAgIGlkX2V4dDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0lpc3NwSGlzdG9yeVBzayBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUdJc3NwSGlzdG9yeU9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMxMTUwMDAxXCI7IC8vUkMgMzExNTAwMDEgOiBIaXN0b3JpZSB2b2zDoW7DrSBwxZllw7rEjXRvdsOhbsOtIHNrdXRlxI1ub3N0aVxyXG4gICAgICAgIHVpZCA9IFwiR0lpc3NwSGlzdG9yeVBzayNcIjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdJc3NwSGlzdG9yeU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkZXRhaWxBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMTRcIiwgLy9SQyAzMTE1MDAxNCA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IGdyaWQuZ2dyaWQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BFa2lzU3BQc2tIaXN0b3JpZUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dEZXRhaWwoc2VsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5kZXRhaWxBY3QsIGZhdm9yaXRlOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLklpc3NwRWtpc1NwUHNrSGlzdG9yaWUubGlzdCh7IGZpbHRlcnM6IHsgaWRfZXh0OiB7IG86IFwiTElLRVwiLCB2OiB0aGlzLm9wdGlvbnMuaWRfZXh0IH0gfSB9KSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEdvcmRpYy5QcmVmYWJzLkdyaWRGb3JtYXRzLkdJaXNzcEVraXNTcFBza0hpc3RvcmllRHRvR2ZQcmVmYWIoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5kZXRhaWxBY3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0RldGFpbChkOiBHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcEVraXNTcFBza0hpc3RvcmllRHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IElHSWlzc3BIaXN0b3J5RGV0YWlsUHNrT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGlkX3ZvbGFuaV9zc3A6IGQuaWRfdm9sYW5pX3NzcCxcclxuICAgICAgICAgICAgICAgIGlkX2V4dDogZC5pZF9leHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0lpc3NwSGlzdG9yeURldGFpbFBzaywgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHSXNzcFByZXVjdG92YW5pU2t1dGVjbm9zdGlPcHRpb25zIHtcclxuICAgICAgICBpY286IHN0cmluZztcclxuICAgICAgICBocm9tUmV6PzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyogSVNMOiBJaXNzcFR5cEtvbXVuaWthY2UgKi9cclxuICAgICAgICByb2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyogSVNMOiBJaXNzcEVraXNTcFBzay5PZGVzbGFuaVByZXVjdG92YW5pU2t1dGVjbm9zdGkoKSAqL1xyXG4gICAgICAgIHVjczogc3RyaW5nO1xyXG4gICAgICAgIGl4Yjogc3RyaW5nO1xyXG4gICAgICAgIGl4c192a3o6IHN0cmluZztcclxuICAgICAgICBwb3JfY2lzbG86IG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgR0lpc3NwWnB1c29iVm9sYW5pQ29udGV4dCB7XHJcbiAgICAgICAgenB1c29iX3ZvbGFuaTogR29yZGljLkdpbmlzLkRiTW9kZWwuR0lpc3NwWnB1c29iVm9sYW5pRW51bTtcclxuICAgICAgICBocm9tUmV6OiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0lpc3NwUHJldWN0b3ZhbmlTa3V0ZWNub3N0aSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMxMTUwMDIzXCI7IC8vUkMgMzExNTAwMjMgOiBWw71zbGVkZWsgenByYWNvdsOhbsOtIHZlIFN0w6F0bsOtIHBva2xhZG7Em1xyXG4gICAgICAgIHVpZCA9IFwiR0lpc3NwUHJldWN0b3ZhbmlTa3V0ZWNub3N0aSNcIjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogR0lzc3BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBEQiA9IEdvcmRpYy5HaW5pcy5EYk1vZGVsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcFR5cEtvbXVuaWthY2UucmVhZCh7IHJvazogb3B0aW9ucy5yb2ssIGljbzogb3B0aW9ucy5pY28gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKCh0eXBDb20pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBfa29tX2lpc3NwID0gdHlwQ29tLmRhdGEudHlwX2tvbV9paXNzcCE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zdCB0eXBfa29tX2lpc3NwID0gR29yZGljLkdpbmlzLkRiTW9kZWwuR0Vrb2N0aWlFbnVtLnZ5YmVyX3V6aXZhdGVsZSBhcyBhbnk7IC8vREVCVUchISFcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93RGxnID0gISh0eXBfa29tX2lpc3NwID09PSBEQi5HRWtvY3RpaUVudW0ub25saW5lIHx8IHR5cF9rb21faWlzc3AgPT09IERCLkdFa29jdGlpRW51bS5vZmZsaW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaG93RGxnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6cHVzb2Jfdm9sYW5pOiB0eXBfa29tX2lpc3NwID09PSBEQi5HRWtvY3RpaUVudW0ub25saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9ubGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogREIuR0lpc3NwWnB1c29iVm9sYW5pRW51bS5vZmZsaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJvbVJlejogb3B0aW9ucy5ocm9tUmV6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgR0lpc3NwWnB1c29iVm9sYW5pQ29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7IHJldHVybiB0aGlzLnNob3dUeXBPZHBvdmVkaURsZyh0eXBfa29tX2lpc3NwKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChjdHg6IEdJaXNzcFpwdXNvYlZvbGFuaUNvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR1BvbG96a2FEdG8+KFtdLCB7IGtleTogXCJpZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLlJveklpc3NwLm9kZXNsYW5pUHJldWN0b3ZhbmlTa3V0ZWNub3N0aSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogb3B0aW9ucy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogb3B0aW9ucy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4Yjogb3B0aW9ucy5peGIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c192a3o6IG9wdGlvbnMuaXhzX3ZreixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9yX2Npc2xvOiBvcHRpb25zLnBvcl9jaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgenB1c29iX3ZvbGFuaTogY3R4LnpwdXNvYl92b2xhbmlcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLnJlc3VsdC5kYXRhLmhsYXNlbmk/LnBvbG96a2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGQucmVzdWx0LmRhdGEuaGxhc2VuaT8ucG9sb3prYSA/PyBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKGN0eCwgdHlwZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjMxMTUwMDMyXCIpOyAvL1JDIDMxMTUwMDMyIDogT3BlcmFjaSBuZWx6ZSBwcm92w6lzdC4gRGF0YWLDoXpvdsO9IHrDoXpuYW0gbmVuw60ga29uemlzdGVudG7DrS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCkgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdQb2xvemthRHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkXCIsIGNhcHRpb246IFwianJlczozMTE1MDAyNCBcIiwgd2lkdGg6IDMgfSkgLy9SQyAzMTE1MDAyNCA6IElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMjVcIiwgLy9SQyAzMTE1MDAyNSA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQudHlwPy50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVcIjogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMTE1MDAyNlwiIH07IC8vUkMgMzExNTAwMjYgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJXXCI6IHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBcImpyZXM6MzExNTAwMjdcIiB9OyAvL1JDIDMxMTUwMDI3IDogVmFyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJJXCI6IHJldHVybiB7IGljb246IFwiZmEtaW5mby1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLCB0ZXh0OiBcImpyZXM6MzExNTAwMjhcIiB9OyAvL1JDIDMxMTUwMDI4IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0ZXh0XCIsIGNhcHRpb246IFwianJlczozMTE1MDAyOVwiLCB3aWR0aDogMTAgfSksIC8vUkMgMzExNTAwMjkgOiBUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93VHlwT2Rwb3ZlZGlEbGcodHlwS29tOiBHb3JkaWMuR2luaXMuRGJNb2RlbC5HRWtvY3RpaUVudW0pOiBKUXVlcnlQcm9taXNlPEdJaXNzcFpwdXNvYlZvbGFuaUNvbnRleHQ+IHtcclxuICAgICAgICAgICAgY29uc3QgREIgPSBHb3JkaWMuR2luaXMuRGJNb2RlbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW1WYWx1ZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG1ldGFzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmID0gJC5EZWZlcnJlZDxHSWlzc3BacHVzb2JWb2xhbmlDb250ZXh0PigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDAzMFwiKSAvL1JDIDMxMTUwMDMwIDogVHlwIG9kcG92xJtkaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cHVzb2Jfdm9sYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy0xMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2Vfc2NodmFsZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbWV0YXMuZmluZChtID0+IG0udmFsdWUgPT09IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2Vfc2NodmFsZW5vKT8ubWV0YS56cHVzb2Jfdm9sYW5pX3R4dCA/PyBcIlNjaHZhbGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogREIuR0lpc3NwWnB1c29iVm9sYW5pRW51bS5zaW11bGFjZV9zY2h2YWxlbm9fc192eWhyYWRvdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IG1ldGFzLmZpbmQobSA9PiBtLnZhbHVlID09PSBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLnNpbXVsYWNlX3NjaHZhbGVub19zX3Z5aHJhZG91KT8ubWV0YS56cHVzb2Jfdm9sYW5pX3R4dCA/PyBcIlNjaHZhbGVubyBzIHZ5aHJhZG91XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2VfemFtaXRudXRvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbWV0YXMuZmluZChtID0+IG0udmFsdWUgPT09IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2VfemFtaXRudXRvKT8ubWV0YS56cHVzb2Jfdm9sYW5pX3R4dCA/PyBcIlphbWl0bnV0b1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IG1ldGFzLmZpbmQobSA9PiBtLnZhbHVlID09PSBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9ubGluZSk/Lm1ldGEuenB1c29iX3ZvbGFuaV90eHQgPz8gXCJWb2xlaiBvbmxpbmUgKGJleiBzaW11bGFjZSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHR5cEtvbSA9PT0gREIuR0Vrb2N0aWlFbnVtLnZ5YmVyX3V6aXZhdGVsZSA/IFwiXCIgOiBcImhpZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9mZmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBtZXRhcy5maW5kKG0gPT4gbS52YWx1ZSA9PT0gREIuR0lpc3NwWnB1c29iVm9sYW5pRW51bS5vZmZsaW5lKT8ubWV0YS56cHVzb2Jfdm9sYW5pX3R4dCA/PyBcIlZvbGVqIG9mZmxpbmUgKGJleiBzaW11bGFjZSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHR5cEtvbSA9PT0gREIuR0Vrb2N0aWlFbnVtLnZ5YmVyX3V6aXZhdGVsZSA/IFwiXCIgOiBcImhpZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDAzMVwiKSAvL1RPRE86IEpSRVMgLy9SQyAzMTE1MDAzMSA6IFBvdcW+w610IHBybyBjZWxvdSBocm9tYWRub3UgcmV6ZXJ2YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhyb21SZXpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlIC8vVE9ETzogWmF0aW0ganNtZSBuZXJlc2lsaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNpbXBsZUZvcm0oXCJWw71ixJtyIHR5cHUga29tdW5pa2FjZSBJSVNTUFwiLCBmb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJva1wiLCAoZXYsIGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4geyBkZWYucmVqZWN0KCkgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vI3JlZ2lvbiBQb2t1cyBwcmVzIHBydXZvZGNlIChhc2kgamUgdG8ga2Fub24gbmEgdnJhYmNlKVxyXG5cclxuLypcclxubmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcbiAgICB0eXBlIEdJaXNzcFpwdXNvYlZvbGFuaUVudW0gPSBHb3JkaWMuR2luaXMuRGJNb2RlbC5HSWlzc3BacHVzb2JWb2xhbmlFbnVtO1xyXG4gICAgaW50ZXJmYWNlIEdEaWFsb2dWeWJlck9kcG92ZWRDb250ZXh0IHtcclxuICAgICAgICB6cHVzb2Jfdm9sYW5pPzogR0lpc3NwWnB1c29iVm9sYW5pRW51bTtcclxuICAgICAgICBocm9tYWRuZT86IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHSXNzcFByZXVjdG92YW5pU2t1dGVjbm9zdGlXaXphcmQgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChvcHRpb25zOiBHSXNzcFByZXVjdG92YW5pU2t1dGVjbm9zdGlPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ocm9tUmV6KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcImhyb21SZXogaXMgbm90SW1wbGVtZW50ZWRcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBEQiA9IEdvcmRpYy5HaW5pcy5EYk1vZGVsO1xyXG4gICAgICAgICAgICBjb25zdCB3aXphcmQgPSBuZXcgR29yZGljLldpemFyZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcFR5cEtvbXVuaWthY2UucmVhZCh7IHJvazogb3B0aW9ucy5yb2ssIGljbzogb3B0aW9ucy5pY28gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKCh0eXBDb20pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBfa29tX2lpc3NwID0gdHlwQ29tLmRhdGEudHlwX2tvbV9paXNzcCE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRTdGVwID0gKHR5cF9rb21faWlzc3AgPT09IERCLkdFa29jdGlpRW51bS5vbmxpbmUgfHwgREIuR0Vrb2N0aWlFbnVtLm9mZmxpbmUpID8gMSA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdpemFyZC5jcmVhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY29udGVudDogdGhpcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJPZGVzbGFuaSBwcmV1Y3RvdmFuaSBza3V0ZWNub3N0aVwiLCAvL1RPRE86IEpSRVMgKyBzcHJhdm55IG5hemV2ISEhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0U3RlcDogc3RhcnRTdGVwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInByZXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWLEm3IgdHlwdSBrb211bmlrYWNlIHMgSUlTU1BcIiwgLy9UT0RPOiBKUkVTICsgc3ByYXZueSBuYXpldiEhIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IChjbnQsIGRpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gREIuR0lpc3NwWnB1c29iVm9sYW5pRW51bVZhbHVlcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKG1ldGFzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBvZHBvdmVkaVwiKSAvL1RPRE86IEpSRVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cHVzb2Jfdm9sYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2Vfc2NodmFsZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IG1ldGFzLmZpbmQobSA9PiBtLnZhbHVlID09PSBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLnNpbXVsYWNlX3NjaHZhbGVubyk/Lm1ldGEuenB1c29iX3ZvbGFuaV90eHQgPz8gXCJTY2h2YWxlbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2Vfc2NodmFsZW5vX3NfdnlocmFkb3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbWV0YXMuZmluZChtID0+IG0udmFsdWUgPT09IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2Vfc2NodmFsZW5vX3NfdnlocmFkb3UpPy5tZXRhLnpwdXNvYl92b2xhbmlfdHh0ID8/IFwiU2NodmFsZW5vIHMgdnlocmFkb3VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogREIuR0lpc3NwWnB1c29iVm9sYW5pRW51bS5zaW11bGFjZV96YW1pdG51dG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbWV0YXMuZmluZChtID0+IG0udmFsdWUgPT09IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0uc2ltdWxhY2VfemFtaXRudXRvKT8ubWV0YS56cHVzb2Jfdm9sYW5pX3R4dCA/PyBcIlphbWl0bnV0b1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBtZXRhcy5maW5kKG0gPT4gbS52YWx1ZSA9PT0gREIuR0lpc3NwWnB1c29iVm9sYW5pRW51bS5vbmxpbmUpPy5tZXRhLnpwdXNvYl92b2xhbmlfdHh0ID8/IFwiVm9sZWogb25saW5lIChiZXogc2ltdWxhY2UpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogdHlwX2tvbV9paXNzcCA9PT0gREIuR0Vrb2N0aWlFbnVtLnZ5YmVyX3V6aXZhdGVsZSA/IFwiXCIgOiBcImhpZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9mZmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbWV0YXMuZmluZChtID0+IG0udmFsdWUgPT09IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0ub2ZmbGluZSk/Lm1ldGEuenB1c29iX3ZvbGFuaV90eHQgPz8gXCJWb2xlaiBvZmZsaW5lIChiZXogc2ltdWxhY2UpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogdHlwX2tvbV9paXNzcCA9PT0gREIuR0Vrb2N0aWlFbnVtLnZ5YmVyX3V6aXZhdGVsZSA/IFwiXCIgOiBcImhpZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvdXppdCBwcm8gY2Vsb3UgaHJvbWFkbm91IHJlemVydmFjaVwiKSAvL1RPRE86IEpSRVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJocm9tYWRuZVwiLCAvL1RPRE86IFpqaXN0aXQgc3ByYXZueSBuYXpldiB2IERUTy4gUHVzdGltZSB2IGFzeW5jLiB1bG96ZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEZyb21Sb3c6IFwiYWx3YXlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUgLy9UT0RPOiBaYXRpbSBqc21lIG5lcmVzaWxpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRTdGVwID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpwdXNvYl92b2xhbmk6IHR5cF9rb21faWlzc3AgPT09IERCLkdFa29jdGlpRW51bS5vbmxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBEQi5HSWlzc3BacHVzb2JWb2xhbmlFbnVtLm9ubGluZSA6IERCLkdJaXNzcFpwdXNvYlZvbGFuaUVudW0ub2ZmbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXphcmQuc2V0U3RlcChzdGFydFN0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhpcy5lbmRPcGVyYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGNudCwgZGl2LCBjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogR0RpYWxvZ1Z5YmVyT2Rwb3ZlZENvbnRleHQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVtcImN0eFwiXSA9IGN0eDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2Uuc3RlcHNFbmFibGVbMV0gPSBkaXYuZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2Lmdmb3JtKCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJyZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeXNsZWRlayBrb211bmlrYWNlIHMgSUlTU1BcIiwgLy9UT0RPOiBKUkVTICsgc3ByYXZueSBuYXpldiEhIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IChjbnQsIGRpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHggPSBjaGFuZ2VbXCJjdHhcIl0gYXMgR0RpYWxvZ1Z5YmVyT2Rwb3ZlZENvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguaHJvbWFkbmUpIHRocm93IG5ldyBHRXJyb3IoXCJocm9tYWRuZSBpcyBub3QgaW1wbGVtZW50ZWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR1BvbG96a2FEdG8+KFtdLCB7IGtleTogXCJpZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuUm96SWlzc3Aub2Rlc2xhbmlQcmV1Y3RvdmFuaVNrdXRlY25vc3RpKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IG9wdGlvbnMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogb3B0aW9ucy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhiOiBvcHRpb25zLml4YixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdmt6OiBvcHRpb25zLml4c192a3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9yX2Npc2xvOiBvcHRpb25zLnBvcl9jaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3pwdXNvYl92b2xhbmk6IGN0eC56cHVzb2Jfdm9sYW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXREYXRhKCkvLy5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8udGhlbihkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGQucmVzdWx0LmRhdGEuaGxhc2VuaT8ucG9sb3prYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmlldy51cGRhdGVEYXRhKGQucmVzdWx0LmRhdGEuaGxhc2VuaT8ucG9sb3prYSA/PyBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyhkaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HUG9sb3prYUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkXCIsIGNhcHRpb246IFwiaWQgXCIgfSkgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcInR5cFwiLCAvL1RPRE86IEpSRVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC50eXA/LnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFXCI6IHJldHVybiB7IGljb246IFwiZmEtdGltZXMtY2lyY2xlICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBcIkNoeWJhXCIgfTsgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiV1wiOiByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIiwgdGV4dDogXCJWYXJvdmFuaVwiIH07IC8vVE9ETzogSlJFU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklcIjogcmV0dXJuIHsgaWNvbjogXCJmYS1pbmZvLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsIHRleHQ6IFwiSW5mb3JtYWNlXCIgfTsgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidGV4dFwiLCBjYXB0aW9uOiBcInRleHRcIiB9KSwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChjbnQsIGRpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2Uuc3RlcHNFbmFibGVbMF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB0aGlzLmVuZE9wZXJhdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuKi9cclxuLy8jZW5kcmVnaW9uIiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0lpc3NwUmV6RGV0YWlsT3B0aW9ucyB7XHJcbiAgICAgICAgaXhzX2hwcjogc3RyaW5nO1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG4gICAgICAgIHVjczogc3RyaW5nO1xyXG4gICAgICAgIHJvazogbnVtYmVyOyAvLyEhIVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiB6ZGEgc2UgcO+/vWkgb3Rldu+/vWVu77+9IG9rbmEgc29177+9YXNu77+9IHByb3ZlZGUgdGFr77+9IGRvdGF6IGRvIElJU1NQICovXHJcbiAgICAgICAgdm9sYXRXZWJTbHV6YnU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKiBtb++/vW5vc3QgemFkYXQgcmVmZXJlbnRhLCBwb2Qga3Rlcu+/vW0gZG90YXogcHJvYu+/vWhuZTwgKi9cclxuICAgICAgICBpeHNfcmVmPzogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogbW/vv71ub3N0IHphZGF0IO+/ve+/vXNsbyByZXplcnZhY2UsIG5hIGt0ZXLvv71tIHNlIG9rbm8gb3Rldu+/vWUgKi9cclxuICAgICAgICBpZF9oZHI/OiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKiBtb++/vW5vc3QgemFkYXQg77+977+9c2xvIHJlemVydmFjZSwgbmEga3Rlcu+/vW0gc2Ugb2tubyBvdGV277+9ZSAqL1xyXG4gICAgICAgIGlkX2hkcl9yaXM/OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBtb++/vW5vc3QgemFkYXQg77+977+9c2xvIO+/ve+/vWRrdSwga3Rlcu+/vSBzZSB2IG9rbu+/vSBwb2xv77+9ZWsgenbvv71yYXpu77+9ICovXHJcbiAgICAgICAgcmFkZWtfaGRyX3Jpcz86IG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvcm92bmFuaSBzdGF2dSByZXplcnZhY2UsIHYgVEs6IG46XFxnaW5pc1xcRGV2ZWxvcG1lbnRcXE5FVFxcR29yZGljLklpc3NwLldpbkNsaWVudFxcRG5wXFxUYWJzXFxHUmV6RGV0YWlsVGFiLmNzXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgYm1hcnRpbmVrXHJcbiAgICAgKiBAc2luY2UgNTI1MzAuMVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR0lpc3NwUmV6RGV0YWlsIGV4dGVuZHMgR0NvbnRlbnQgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUdJaXNzcFJlekRldGFpbE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdnlSZXplcnZhY2lGb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxGb3JtOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VQb2xvemthRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBpY29uT3RldnJlbm8gPSBcImdpLXVubG9ja1wiO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaWNvblV6YXZyZW5vID0gXCJnaS1sb2NrXCI7XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHSWlzc3BSZXpEZXRhaWxPcHRpb25zKTp2b2lkIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMxMTUwMzYzXCIuZm9ybWF0KG9wdGlvbnMuaXhzX2hwcik7IC8vUkMgMzExNTAzNjMgOiBTdGF2IHJlemVydmFj77+9IHDvv73vv71wYWR1IHswfSB2ZSBTdO+/vXRu77+9IHBva2xhZG7vv71cclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8jcmVnaW9uIEJhcnNcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvdmVyaXRTdGF2QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzY0XCIsIC8vUkMgMzExNTAzNjQgOiBPdu+/ve+/vWl0IHN0YXZcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy5vdmVyaXRTdGF2KCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Jvdm5hdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDM2NVwiLCAvL1JDIDMxMTUwMzY1IDogUG9yb3ZuYXRcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy5wb3Jvdm5hdCgpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd0hpc3RTdGF2dUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDM2NlwiLCAvL1JDIDMxMTUwMzY2IDogSGlzdG9yaWUgc3Rhdu+/vVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLnNob3dIaXN0U3RhdnUoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dIaXN0Vm9sYW5pQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzY3XCIsIC8vUkMgMzExNTAzNjcgOiBIaXN0b3JpZSB2b2zvv71u77+9XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMuc2hvd0hpc3RWb2xhbmkoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsb3NlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJvdmVyaXRTdGF2QWN0KlwiLCBcInBvcm92bmF0QWN0KlwiLCBcInNob3dIaXN0U3RhdnVBY3QqXCIsIFwic2hvd0hpc3RWb2xhbmlBY3QqXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImNsb3NlQWN0XCJdKSk7XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGliID0gR29yZGljLlV0aWxzLkljb25CdWlsZGVyLmRlZmF1bHRJbnN0O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhdnlSZXplcnZhY2lGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMzY5XCIpIC8vUkMgMzExNTAzNjkgOiBSZXplcnZhY2VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdnlSZXplcnZhY2lcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19ocHI9dmFsdWUuaXhzX2hwcjttb2RlbC5pZF9oZHI9dmFsdWUuaWRfaGRyO21vZGVsLmlkX2hkcl9yaXM9dmFsdWUuaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV6ID0gciBhcyBHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1cGxpY2l0YSA9ICEhKHJlej8uZHVwbGljaXRuaV9yZXplcnZhY2UhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9ICQubmV3RGl2KCkuYXBwZW5kKGA8Yj4ke3I/LmlkX2hkcn08L2I+fFNQICR7KGliLmNyZWF0ZUljb24ocmV6Py5zX3JlenNwX2lpc3NwID8gdGhpcy5pY29uVXphdnJlbm8gOiB0aGlzLmljb25PdGV2cmVubykpfXwke3I/LmlkX2hkcl9yaXN9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdXBsaWNpdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiPHNwYW4gc3R5bGU9J21hcmdpbi1sZWZ0OiAwLjI1cmVtOyc+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdiYWRnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImpyZXM6MzExNTAzNzBcIiwgLy9SQyAzMTE1MDM3MCA6IGR1cGxpY2l0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLXN0YXRlLWJhY2tncm91bmQgZy1zdGF0ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExNTAzNzFcIiAvL1JDIDMxMTUwMzcxIDogSUQgSUlTU1AgbmVu77+9IGRvIEdJTklTIHphbmVzZW5vLCByZXplcnZhY2kgcHJvc++/vW0gdXphdu+/vWV0ZSB2b2xib3UgVXphdu+/ve+/vXQgcmV6LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXouaW5fZ2luaXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8c3BhbiBzdHlsZT0nbWFyZ2luLWxlZnQ6IDAuMjVyZW07Jz5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2JhZGdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwianJlczozMTE1MDM3MlwiLCAvL1JDIDMxMTUwMzcyIDogZHVwbGljaXRhIHV6YXbvv71lbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExNTAzNzNcIiAvL1JDIDMxMTUwMzczIDogSUQgSUlTU1AgbmVu77+9IGRvIEdJTklTIHphbmVzZW5vLCBhIHJlemVydmFjZSBieWxhIHYgSUlTU1AgdXphdu+/vWVuYS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZC52YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlkX2hkciwgaWRfaGRyX3JpcyB9ID0gZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkX2hkcikgdGhpcy5sb2FkRGV0YWlsc0RhdGEoaWRfaGRyLCBpZF9oZHJfcmlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdnlSZXplcnZhY2lGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBzdGF2eVJlemVydmFjaUZvcm0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybURldGFpbCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDNNMlMxIEwtMy05LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLzEuIHNsb3VwZWNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTIzXCIpIC8vUkMgMzExNTAxMjMgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImRva2xfcHV2X2Npc1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMjRcIikgLy9SQyAzMTE1MDEyNCA6IFR5cFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcmV6c3BcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMSwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gdiA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFwianJlczozMTE1MDExNlwiOyAvL1JDIDMxMTUwMTE2IDogVu+/vWNlbGV077+9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBcImpyZXM6MzExNTAxMTVcIjsgLy9SQyAzMTE1MDExNSA6IEplZG5vbGV077+9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBcImpyZXM6MzExNTAxMTRcIjsgLy9SQyAzMTE1MDExNCA6IE/vv71lay4gcO+/ve+/vWpteVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwianJlczozMTE1MDExM1wiOyAvL1JDIDMxMTUwMTEzIDogTi9BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMjVcIikgLy9SQyAzMTE1MDEyNSA6IERydWhcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImRydWhfcmV6c3BcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTI2XCIpIC8vUkMgMzExNTAxMjYgOiBTdGF2XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcmV6c3BfaWlzc3BcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbLTEsIDAsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHYgPz8gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gXCJqcmVzOjMxMTUwMTE3XCI7IC8vUkMgMzExNTAxMTcgOiBPdGV277+9ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBcImpyZXM6MzExNTAxMThcIjsgLy9SQyAzMTE1MDExOCA6IFV6YXbvv71lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImpyZXM6MzExNTAxMTlcIjsgLy9SQyAzMTE1MDExOSA6IE4vQVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vMi4gc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMjdcIikgLy9SQyAzMTE1MDEyNyA6IEsg77+9ZXJw77+9bu+/vSBvZFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9yYWRfaWlzc3BcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTI4XCIpIC8vUkMgMzExNTAxMjggOiDvv73vv71zbG8gVlpcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImNpc2xvX3Z6X2NhXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEyOVwiKSAvL1JDIDMxMTUwMTI5IDogUEZLXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfcGZrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1wiMFwiLCBcIjFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gdiA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCIwXCI6IHJldHVybiBcImpyZXM6MzExNTAxMjBcIjsgLy9SQyAzMTE1MDEyMCA6IE5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMVwiOiByZXR1cm4gXCJqcmVzOjMxMTUwMTIxXCI7IC8vUkMgMzExNTAxMjEgOiBBbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImpyZXM6MzExNTAxMjJcIjsgLy9SQyAzMTE1MDEyMiA6IE4vQVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTMwXCIpIC8vUkMgMzExNTAxMzAgOiBJbmthc27vv70gcGxhdGJhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfaW5rYXNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW1wiMFwiLCBcIjFcIiwgXCJOL0FcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2Pzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB2ID8/IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCIwXCI6IHJldHVybiBcImpyZXM6MzExNTAxMjBcIjsgLy9SQyAzMTE1MDEyMCA6IE5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMVwiOiByZXR1cm4gXCJqcmVzOjMxMTUwMTIxXCI7IC8vUkMgMzExNTAxMjEgOiBBbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImpyZXM6MzExNTAxMjJcIjsgLy9SQyAzMTE1MDEyMiA6IE4vQVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vMy4gc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMzFcIikgLy9SQyAzMTE1MDEzMSA6IFZsYXN0bu+/vSDvv73vv71ldFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYnVfdmxcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTMyXCIpIC8vUkMgMzExNTAxMzIgOiBDaXrvv70g77+977+9ZXRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVTa0NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYnVfY2k9dmFsdWUuYnVfY2k7bW9kZWwuc2tfY2k9dmFsdWUuc2tfY2lcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2PzogeyBidV9jaT86IHN0cmluZyB8IG51bGwsIHNrX2NpPzogc3RyaW5nIHwgbnVsbCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB2ID8/IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeyBidV9jaSwgc2tfY2kgfSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1X2NpID0gYnVfY2kgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2tfY2kgPSBza19jaSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVfY2kgPT09IFwiMDAwMDAwMDAwMDAwMDAwMFwiKSBidV9jaSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidV9jaSAmJiBza19jaSkgcmV0dXJuIGAke2J1X2NpfS8ke3NrX2NpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzM1wiKSAvL1JDIDMxMTUwMTMzIDogVmFyLiBzeW1ib2xcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInZzXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzNFwiKSAvL1JDIDMxMTUwMTM0IDogU3BlYy4gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzc1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLy80LiBzbG91cGVjXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzN1wiKSAvL1JDIDMxMTUwMTM3IDogWmFsb++/vWVu77+9XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3phbG96ZW5pXCIsIGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy81LiBzbG91cGVjXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzOVwiKSAvL1JDIDMxMTUwMTM5IDogQWt0dWFsaXphY2VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfYWt0XCIsIGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy82LiBzbG91cGVjXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDE0MVwiKSAvL1JDIDMxMTUwMTQxIDogU3RhdiBJSVNTUCBrXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X2RvdGF6XCIsIGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy9wb3puK3BvcGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDNNMlMxIEwtMS0xMS0wLCBNLTItMTAtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTM1XCIpIC8vUkMgMzExNTAxMzUgOiBQb3pu77+9bWthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3puYW1rYVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMzZcIikgLy9SQyAzMTE1MDEzNiA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3Bpc1wiLCBkaXNhYmxlZDogdHJ1ZSwgcm93czogMyB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDIxMVwiLCAvL1JDIDMxMTUwMjExIDogRGV0YWlsIHN0YXZ1XHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybURldGFpbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VQb2xvemthRHRvPihbXSwgeyBrZXk6IFwiaXhzX2hwcixpZF9oZHIsaWRfaGRyX3JpcyxyYWRla19oZHJfcmlzXCIgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQubmV3RGl2KCk7XHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMxMTUwMjEyXCIsIC8vUkMgMzExNTAyMTIgOiBTdGF2IHBvbG/vv71la1xyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFwcGVuZCh0aGlzLmdyaWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BTdGF2UmV6ZXJ2YWNlUG9sb3prYUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDE0NFwiIC8vUkMgMzExNTAxNDQgOiDvv73vv71kZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3JlenNwX2lzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAzNzRcIiwgLy9SQyAzMTE1MDM3NCA6IFNcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMTQ4XCIsIC8vUkMgMzExNTAxNDggOiBTdGF2IElJU1NQIO+/vSBPdGV277+9ZW5vIC8gVXphdu+/vWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzX3JlenNwX2lzcCA9IGQuc19yZXpzcF9pc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNfcmV6c3BfaXNwID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzX3JlenNwX2lzcCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyBpY29uOiB0aGlzLmljb25PdGV2cmVubywgdGV4dDogXCJqcmVzOjMxMTUwMTQ5XCIgfSAvL1JDIDMxMTUwMTQ5IDogT3Rldu+/vWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogeyBpY29uOiB0aGlzLmljb25VemF2cmVubywgdGV4dDogXCJqcmVzOjMxMTUwMTUwXCIgfTsgLy9SQyAzMTE1MDE1MCA6IFV6YXbvv71lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9maW1cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTUzXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTUzIDogRklNXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF96ZHJcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU0XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU0IDogWkRSXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wYXJcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU1XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU1IDogUEFSXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wb2xcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU2XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU2IDogUE9MXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9lZHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU3XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU3IDogRURTXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wdnNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU4XCIsIHdpZHRoOiA5MCB9KSAvL1JDIDMxMTUwMTU4IDogUFZTXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF91Y2xcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU5XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU5IDogVUNMXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF96alwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxNjBcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxNjAgOiBaSlxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpc3BfdWpcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTYxXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTYxIDogVUpcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3V6XCIsIGNhcHRpb246IFwianJlczozMTE1MDE2MlwiLCB3aWR0aDogNzAgfSkgLy9SQyAzMTE1MDE2MiA6IFVaXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3JzcF9pc3BcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzc1XCIsIHdpZHRoOiAxMjAgfSkgLy9SQyAzMTE1MDM3NSA6IFJlemVydm9277+9bm9cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfY2VycF9pc3BcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzc2XCIsIHdpZHRoOiAxMjAgfSkgLy9SQyAzMTE1MDM3NiA6IO+/vWVycO+/vW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcImRhdF9zcGxcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTcwXCIsIHdpZHRoOiA4MCB9KSAvL1JDIDMxMTUwMTcwIDogU3BsYXRub3N0XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwianJlczozMTE1MDE3MVwiLCB3aWR0aDogMTUwIH0pIC8vUkMgMzExNTAxNzEgOiBQb3Bpc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKHRoaXMub3B0aW9ucy52b2xhdFdlYlNsdXpidSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogIEtvbXBsZXRuaSByZWxvYWQgb2tuYS4gKi9cclxuICAgICAgICBwcml2YXRlIHJlbG9hZCh2b2xhdFdlYlNsdXpidTogYm9vbGVhbik6IEpRdWVyeVByb21pc2U8R29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VEdG8+PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYWN0aVByaXBhZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcFJlemVydmFjZS5uYWN0aVByaXBhZENvbW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfaHByOiBvcHRpb25zLml4c19ocHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogb3B0aW9ucy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogb3B0aW9ucy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogb3B0aW9ucy51Y3NcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4geyB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hY3RpU3RhdlJlemVydmFjZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcFN0YXZSZXplcnZhY2UubGlzdCh7IGZpbHRlcnM6IHsgaXhzX2hwcjogb3B0aW9ucy5peHNfaHByIH0gfSkuZ2V0VmlldygpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFsID0gKHRoaXMuc3RhdnlSZXplcnZhY2lGb3JtLmZpbmRGaWVsZHMoXCJzdGF2eVJlemVydmFjaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSBhcyBHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VEdG8gfCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuICQud2hlbigpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IGlmICh2b2xhdFdlYlNsdXpidSkgcmV0dXJuIG5hY3RpUHJpcGFkKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiBuYWN0aVN0YXZSZXplcnZhY2UoKTsgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IHZpZXcuZ2V0RGF0YVJvd3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdm9sYXRXZWJTbHV6YnUgJiYgKGQubGVuZ3RoID09PSAwKSkgcmV0dXJuIG5hY3RpUHJpcGFkKCkudGhlbigoKSA9PiB7IHJldHVybiBuYWN0aVN0YXZSZXplcnZhY2UoKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigodmlldykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSB2aWV3LmdldERhdGFSb3dzKGZhbHNlKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF2eVJlemVydmFjaUZpZWxkID0gdGhpcy5zdGF2eVJlemVydmFjaUZvcm0uZmluZEZpZWxkcyhcInN0YXZ5UmV6ZXJ2YWNpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXZ5UmV6ZXJ2YWNpRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGF0YVwiLCB2aWV3KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgJiYgIXN0YXZ5UmV6ZXJ2YWNpRmllbGQuZ2ZpZWxkKFwiaGFzVmFsdWVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuaXhzX2hwciAmJiBvcHRpb25zLmlkX2hkciAmJiBvcHRpb25zLmlkX2hkcl9yaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXZ5UmV6ZXJ2YWNpRmllbGQuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGl4c19ocHI6IG9wdGlvbnMuaXhzX2hwciwgaWRfaGRyOiBvcHRpb25zLmlkX2hkciwgaWRfaGRyX3Jpczogb3B0aW9ucy5pZF9oZHJfcmlzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2eVJlemVydmFjaUZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdnlSZXplcnZhY2lGaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGl4c19ocHI6IHZhbC5peHNfaHByLCBpZF9oZHI6IHZhbC5pZF9oZHIsIGlkX2hkcl9yaXM6IHZhbC5pZF9oZHJfcmlzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmFjdGVuaSBkZXRhaWx1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGV0YWlsc0RhdGEoaWRfaGRyOiBudW1iZXIsIGlkX2hkcl9yaXM6IHN0cmluZyk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcFN0YXZSZXplcnZhY2UucmVhZCh7XHJcbiAgICAgICAgICAgICAgICBpeHNfaHByOiBvcHRpb25zLml4c19ocHIsXHJcbiAgICAgICAgICAgICAgICBpZF9oZHI6IGlkX2hkciwgLy9iZXJlIHNlIHogZHJvcGRvd24/Pz9cclxuICAgICAgICAgICAgICAgIGlkX2hkcl9yaXM6IGlkX2hkcl9yaXNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BTdGF2UmV6ZXJ2YWNlLnBvbG96a3lfTGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19ocHI6IG9wdGlvbnMuaXhzX2hwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkX2hkcjogaWRfaGRyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfaGRyX3JpczogaWRfaGRyX3Jpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7IHRoaXMudmlldy51cGRhdGVEYXRhKHIpIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG92ZXJpdFN0YXYoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaXhzX2hwciwgcm9rLCBpY28sIHVjcyB9ID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwUmV6ZXJ2YWNlLm5hY3RpUHJpcGFkQ29tbWl0KHsgaXhzX2hwcjogaXhzX2hwciwgcm9rOiByb2ssIGljbzogaWNvLCB1Y3M6IHVjcyB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcImpyZXM6MzExNTAzNjhcIik7IC8vUkMgMzExNTAzNjggOiBTdGF2IO+/vXNw77+9bu+/vSBuYe+/vXRlbiB6IElJU1NQLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBvcm92bmF0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0byA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLklpc3NwLldlYkNvbnRyb2xzLklHSWlzc3BSZXpEZXRhaWxFeHRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaXhzX2hwcjogdG8uaXhzX2hwcixcclxuICAgICAgICAgICAgICAgIGlkX2hkcjogdG8uaWRfaGRyLFxyXG4gICAgICAgICAgICAgICAgaWRfaGRyX3JpczogdG8uaWRfaGRyX3JpcyxcclxuICAgICAgICAgICAgICAgIHJhZGVrX2hkcl9yaXM6IHRvLnJhZGVrX2hkcl9yaXMsXHJcbiAgICAgICAgICAgICAgICBpY286IHRvLmljbyxcclxuICAgICAgICAgICAgICAgIHVjczogdG8udWNzLFxyXG4gICAgICAgICAgICAgICAgcm9rOiB0by5yb2ssXHJcbiAgICAgICAgICAgICAgICB2b2xhdFdlYlNsdXpidTogdG8udm9sYXRXZWJTbHV6YnUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFtHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0lpc3NwUmV6RGV0YWlsRXh0LCB7IHVpZDogXCJHSWlzc3BSZXpEZXRhaWxFeHQjXCIgfV0sIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93SGlzdFN0YXZ1KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBJR0lpc3NwUmV6SGlzdG9yeU9wdGlvbnMgPSB7IGl4c19ocHI6IHRoaXMub3B0aW9ucy5peHNfaHByIH07XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR0lpc3NwUmV6SGlzdG9yeSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dIaXN0Vm9sYW5pKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBJR0lpc3NwUmV6V3NDYWxsSGlzdG9yeU9wdGlvbnMgPSB7IGl4c19ocHI6IHRoaXMub3B0aW9ucy5peHNfaHByIH07XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoW0dJaXNzcFJleldzQ2FsbEhpc3RvcnksIHsgdWlkOiBcIkdJaXNzcFJleldzQ2FsbEhpc3RvcnkjXCIgfV0sIG9wdGlvbnMpO1xyXG4gICAgICAgIH0gIFxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0lpc3NwUmV6RGV0YWlsRXh0T3B0aW9ucyB7XHJcbiAgICAgICAgaXhzX2hwcjogc3RyaW5nO1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG4gICAgICAgIHVjczogc3RyaW5nO1xyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiogemRhIHNlIHDFmWkgb3RldsWZZW7DrSBva25hIHNvdcSNYXNuxJsgcHJvdmVkZSB0YWvDqSBkb3RheiBkbyBJSVNTUCAqL1xyXG4gICAgICAgIHZvbGF0V2ViU2x1emJ1OiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKiogbW/Fvm5vc3QgemFkYXQgcmVmZXJlbnRhLCBwb2Qga3RlcsO9bSBkb3RheiBwcm9ixJtobmU8ICovXHJcbiAgICAgICAgaXhzX3JlZj86IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqIG1vxb5ub3N0IHphZGF0IMSNw61zbG8gcmV6ZXJ2YWNlLCBuYSBrdGVyw6ltIHNlIG9rbm8gb3RldsWZZSAqL1xyXG4gICAgICAgIGlkX2hkcj86IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqIG1vxb5ub3N0IHphZGF0IMSNw61zbG8gcmV6ZXJ2YWNlLCBuYSBrdGVyw6ltIHNlIG9rbm8gb3RldsWZZSAqL1xyXG4gICAgICAgIGlkX2hkcl9yaXM/OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBtb8W+bm9zdCB6YWRhdCDEjcOtc2xvIMWZw6Fka3UsIGt0ZXLDqSBzZSB2IG9rbsSbIHBvbG/FvmVrIHp2w71yYXpuw60gKi9cclxuICAgICAgICByYWRla19oZHJfcmlzPzogbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCByZXplcnZhY2UgKHYgVEsgZWt2LiBOOlxcR0lOSVNcXDQ4OVxcREVWXFxORVRcXEdvcmRpYy5JaXNzcC5XaW5DbGllbnRcXERucFxcVGFic1xcR1JlekRldGFpbEV4dFRhYi5jcylcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBibWFydGluZWtcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjI0XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHSWlzc3BSZXpEZXRhaWxFeHQgZXh0ZW5kcyBHQ29udGVudCBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUdJaXNzcFJlekRldGFpbEV4dE9wdGlvbnM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdnlSZXplcnZhY2lGb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxGb3JtOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VQb2xvemthRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBpY29uT3RldnJlbm8gPSBcImdpLXVubG9ja1wiO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaWNvblV6YXZyZW5vID0gXCJnaS1sb2NrXCI7XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHSWlzc3BSZXpEZXRhaWxFeHRPcHRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMTE1MDE3OVwiLmZvcm1hdChvcHRpb25zLml4c19ocHIpOyAvL1JDIDMxMTUwMTc5IDogUG9yb3Zuw6Fuw60gc3RhdnUgcmV6ZXJ2YWNlIHDFmcOtcGFkdSB7MH0gLSBJSVNTUCB2cy4gR0lOSVNcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBCYXJzXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3Zlcml0U3RhdkFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDE3MlwiLCAvL1JDIDMxMTUwMTcyIDogT3bEm8WZaXQgc3RhdlxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLm92ZXJpdFN0YXYoKTsgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRldGFpbEZvcm0uZmluZEZpZWxkcyhcInN0YXZ5UmV6ZXJ2YWNpXCIpLmdmaWVsZChcImdldFZhbHVlXCIpIGFzIEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwU3RhdlJlemVydmFjZUR0bztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zdCBpZF9oZHIgPSB2YWx1ZT8uaWRfaGRyO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChpZF9oZHIpIHRoaXMubG9hZERhdGEoaWRfaGRyKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93SGlzdFN0YXZ1QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTczXCIsIC8vUkMgMzExNTAxNzMgOiBIaXN0b3JpZSBzdGF2xa9cclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy5zaG93SGlzdFN0YXZ1KCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1emF2cml0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTc0XCIsIC8vUkMgMzExNTAxNzQgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy51emF2cml0KCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93SGlzdFZvbGFuaUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDE3NVwiLCAvL1JDIDMxMTUwMTc1IDogSGlzdG9yaWUgdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy5zaG93SGlzdFZvbGFuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXphdnJpdFJlekFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDE3NlwiLCAvL1JDIDMxMTUwMTc2IDogVXphdsWZw610IHJlemVydmFjaVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLnV6YXZyaXRSZXooKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm90ZXZyaXRSZXpBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxNzdcIiwgLy9SQyAzMTE1MDE3NyA6IE90ZXbFmcOtdCByZXplcnZhY2lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy5vdGV2cml0UmV6KCk7ICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xvc2VBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcIm92ZXJpdFN0YXZBY3QqXCIsIFwic2hvd0hpc3RTdGF2dUFjdCpcIiwgXCJ1emF2cml0QWN0KlwiLCBcInNob3dIaXN0Vm9sYW5pQWN0KlwiLCBcInV6YXZyaXRSZXpBY3QqXCIsIFwib3RldnJpdFJlekFjdCpcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiY2xvc2VBY3RcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgY29uc3QgaWIgPSBHb3JkaWMuVXRpbHMuSWNvbkJ1aWxkZXIuZGVmYXVsdEluc3Q7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGF2eVJlemVydmFjaUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAyMTBcIikgLy9SQyAzMTE1MDIxMCA6IFJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2eVJlemVydmFjaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2hwcj12YWx1ZS5peHNfaHByO21vZGVsLmlkX2hkcj12YWx1ZS5pZF9oZHI7bW9kZWwuaWRfaGRyX3Jpcz12YWx1ZS5pZF9oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXogPSByIGFzIEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwU3RhdlJlemVydmFjZUR0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVwbGljaXRhID0gISEocmV6Py5kdXBsaWNpdG5pX3JlemVydmFjZSEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gJC5uZXdEaXYoKS5hcHBlbmQoYDxiPiR7cj8uaWRfaGRyfTwvYj58U1AgJHsoaWIuY3JlYXRlSWNvbihyZXo/LnNfcmV6c3BfaWlzc3AgPyB0aGlzLmljb25VemF2cmVubyA6IHRoaXMuaWNvbk90ZXZyZW5vKSl9fEcgJHsoaWIuY3JlYXRlSWNvbihyPy5zX3JlenNwX2dpbiA/IHRoaXMuaWNvblV6YXZyZW5vIDogdGhpcy5pY29uT3RldnJlbm8pKX18JHtyPy5pZF9oZHJfcmlzfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVwbGljaXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIjxzcGFuIHN0eWxlPSdtYXJnaW4tbGVmdDogMC4yNXJlbTsnPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYmFkZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJqcmVzOjMxMTUwMjc2XCIsIC8vUkMgMzExNTAyNzYgOiBkdXBsaWNpdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1iYWNrZ3JvdW5kIGctc3RhdGUtZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMxMTUwMjQ5XCIgLy9SQyAzMTE1MDI0OSA6IElEIElJU1NQIG5lbsOtIGRvIEdJTklTIHphbmVzZW5vLCByZXplcnZhY2kgcHJvc8OtbSB1emF2xZlldGUgdm9sYm91IFV6YXbFmcOtdCByZXouXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlei5pbl9naW5pcyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIjxzcGFuIHN0eWxlPSdtYXJnaW4tbGVmdDogMC4yNXJlbTsnPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYmFkZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJqcmVzOjMxMTUwMjc1XCIsIC8vUkMgMzExNTAyNzUgOiBkdXBsaWNpdGEgdXphdsWZZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtYmFja2dyb3VuZCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMxMTUwMjUwXCIgLy9SQyAzMTE1MDI1MCA6IElEIElJU1NQIG5lbsOtIGRvIEdJTklTIHphbmVzZW5vLCBhIHJlemVydmFjZSBieWxhIHYgSUlTU1AgdXphdsWZZW5hLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaWRfaGRyLCBpZF9oZHJfcmlzIH0gPSBkLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRfaGRyKSB0aGlzLmxvYWREZXRhaWxzRGF0YShpZF9oZHIsIGlkX2hkcl9yaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF2eVJlemVydmFjaUZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHN0YXZ5UmV6ZXJ2YWNpRm9ybSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGV0YWlsID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00yUzEgTC0zLTktMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgLy8xLiBzbG91cGVjXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEyM1wiKSAvL1JDIDMxMTUwMTIzIDogRG9rbGFkXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkb2tsX3B1dl9jaXNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTI0XCIpIC8vUkMgMzExNTAxMjQgOiBUeXBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3JlenNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWzEsIDMsIDRdLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHYgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6ICByZXR1cm4gXCJqcmVzOjMxMTUwMTE2XCI7IC8vUkMgMzExNTAxMTYgOiBWw61jZWxldMOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6ICByZXR1cm4gXCJqcmVzOjMxMTUwMTE1XCI7IC8vUkMgMzExNTAxMTUgOiBKZWRub2xldMOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6ICByZXR1cm4gXCJqcmVzOjMxMTUwMTE0XCI7IC8vUkMgMzExNTAxMTQgOiBPxI1lay4gcMWZw61qbXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImpyZXM6MzExNTAxMTNcIjsgLy9SQyAzMTE1MDExMyA6IE4vQVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTI1XCIpIC8vUkMgMzExNTAxMjUgOiBEcnVoXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkcnVoX3JlenNwXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEyNlwiKSAvL1JDIDMxMTUwMTI2IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3JlenNwX2lpc3NwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWy0xLCAwLCAxXSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2PzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB2ID8/IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogIHJldHVybiBcImpyZXM6MzExNTAxMTdcIjsgLy9SQyAzMTE1MDExNyA6IE90ZXbFmWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiAgcmV0dXJuIFwianJlczozMTE1MDExOFwiOyAvL1JDIDMxMTUwMTE4IDogVXphdsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJqcmVzOjMxMTUwMTE5XCI7IC8vUkMgMzExNTAxMTkgOiBOL0FcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vMi4gc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMjdcIikgLy9SQyAzMTE1MDEyNyA6IEsgxI1lcnDDoW7DrSBvZFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9yYWRfaWlzc3BcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTI4XCIpIC8vUkMgMzExNTAxMjggOiDEjMOtc2xvIFZaXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJjaXNsb192el9jYVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMjlcIikgLy9SQyAzMTE1MDEyOSA6IFBGS1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X3Bma1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcIjBcIiwgXCIxXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHYgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMFwiOiByZXR1cm4gXCJqcmVzOjMxMTUwMTIwXCI7IC8vUkMgMzExNTAxMjAgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjFcIjogcmV0dXJuIFwianJlczozMTE1MDEyMVwiOyAvL1JDIDMxMTUwMTIxIDogQW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAgcmV0dXJuIFwianJlczozMTE1MDEyMlwiOyAvL1JDIDMxMTUwMTIyIDogTi9BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMzBcIikgLy9SQyAzMTE1MDEzMCA6IElua2FzbsOtIHBsYXRiYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2lua2Fzb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcIjBcIiwgXCIxXCIsIFwiTi9BXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gdiA/PyBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiMFwiOiByZXR1cm4gXCJqcmVzOjMxMTUwMTIwXCI7IC8vUkMgMzExNTAxMjAgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIjFcIjogcmV0dXJuIFwianJlczozMTE1MDEyMVwiOyAvL1JDIDMxMTUwMTIxIDogQW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAgcmV0dXJuIFwianJlczozMTE1MDEyMlwiOyAvL1JDIDMxMTUwMTIyIDogTi9BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLzMuIHNsb3VwZWNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTMxXCIpIC8vUkMgMzExNTAxMzEgOiBWbGFzdG7DrSDDusSNZXRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImJ1X3ZsXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzMlwiKSAvL1JDIDMxMTUwMTMyIDogQ2l6w60gw7rEjWV0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1U2tDaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmJ1X2NpPXZhbHVlLmJ1X2NpO21vZGVsLnNrX2NpPXZhbHVlLnNrX2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHsgYnVfY2k/OiBzdHJpbmd8bnVsbCwgc2tfY2k/OiBzdHJpbmd8bnVsbCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB2ID8/IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeyBidV9jaSwgc2tfY2kgfSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1X2NpID0gYnVfY2kgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2tfY2kgPSBza19jaSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVfY2kgPT09IFwiMDAwMDAwMDAwMDAwMDAwMFwiKSBidV9jaSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidV9jaSAmJiBza19jaSkgcmV0dXJuIGAke2J1X2NpfS8ke3NrX2NpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzM1wiKSAvL1JDIDMxMTUwMTMzIDogVmFyLiBzeW1ib2xcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInZzXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDEzNFwiKSAvL1JDIDMxMTUwMTM0IDogU3BlYy4gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzc1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAvLzQuIHNsb3VwZWNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTM3XCIpIC8vUkMgMzExNTAxMzcgOiBaYWxvxb5lbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3phbG96ZW5pXCIsIGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMzhcIikgLy9SQyAzMTE1MDEzOCA6IFN0YXYgR0lOSVNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19yZXpzcF9naW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2PzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSB2ID8/IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFwianJlczozMTE1MDExN1wiOyAvL1JDIDMxMTUwMTE3IDogT3RldsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBcImpyZXM6MzExNTAxMThcIjsgLy9SQyAzMTE1MDExOCA6IFV6YXbFmWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwianJlczozMTE1MDExOVwiOyAvL1JDIDMxMTUwMTE5IDogTi9BXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLzUuIHNsb3VwZWNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTM5XCIpIC8vUkMgMzExNTAxMzkgOiBBa3R1YWxpemFjZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9ha3RcIiwgZGlzYWJsZWQ6IHRydWUsIHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDE0MFwiKSAvL1JDIDMxMTUwMTQwIDogU3RhdiBvZGVzbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzdGF2X29kZXNsYW5pXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIC8vNi4gc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxNDFcIikgLy9SQyAzMTE1MDE0MSA6IFN0YXYgSUlTU1Aga1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9kb3RhelwiLCBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTQyXCIpIC8vUkMgMzExNTAxNDIgOiBSb2tcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAvL3Bvem4rcG9waXNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00yUzEgTC0xLTExLTAsIE0tMi0xMC0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAxMzVcIikgLy9SQyAzMTE1MDEzNSA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMTM2XCIpIC8vUkMgMzExNTAxMzYgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiwgZGlzYWJsZWQ6IHRydWUsIHJvd3M6IDMgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5ndGFiKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAyMTFcIiwgLy9SQyAzMTE1MDIxMSA6IERldGFpbCBzdGF2dVxyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1EZXRhaWwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BTdGF2UmV6ZXJ2YWNlUG9sb3prYUR0bz4oW10sIHsga2V5OiBcIml4c19ocHIsaWRfaGRyLGlkX2hkcl9yaXMscmFkZWtfaGRyX3Jpc1wiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkLm5ld0RpdigpO1xyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDIxMlwiLCAvL1JDIDMxMTUwMjEyIDogU3RhdiBwb2xvxb5la1xyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFwcGVuZCh0aGlzLmdyaWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BTdGF2UmV6ZXJ2YWNlUG9sb3prYUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URSAoQk0pOiBaYWtvbWVudG92YW5vIHBvIGRvbWx1dmUgcyBKVmFjaGFcclxuICAgICAgICAgICAgICAgICAgICAvLy5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInN0YXZfcmFka3VcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAzNzdcIiwgLy9SQyAzMTE1MDM3NyA6IFN0YXZcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vTk9URTogSmUgdG8gZWt2aXZhbGVudCBzbG91cGNlIGNfcnNwX2lzcF9pY29uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICghZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChkLnNfcmV6c3BfaXNwID09PSAxICYmIGQuY19yc3BfZ2luICYmIHBhcnNlRGVjaW1hbChkLmNfcnNwX2dpbikuZXEoMCkpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoZC5zX3Z5cml6X3JlenNwID09PSBudWxsIHx8IHR5cGVvZiBkLnNfdnlyaXpfcmV6c3AgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoZC5jX3JzcF9pc3AgJiYgZC5jX3JzcF9naW4gIT09IGQuY19yc3BfaXNwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoZC5zX3Z5cml6X3JlenNwID4gMCkgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozMTE1MDI1MVwiIC8vUkMgMzExNTAyNTEgOiBTdGF2eSByZXplcnZhY8OtIHYgR0lOSVMgYSBJSVNTUCBuZXNvdWhsYXPDrSFcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDE0M1wiLCAvL1JDIDMxMTUwMTQzIDogxZguIFNQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDE0NFwiIC8vUkMgMzExNTAxNDQgOiDFmMOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTQ1XCIsIC8vUkMgMzExNTAxNDUgOiDFmC4gR0lOXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDE0NlwiIC8vUkMgMzExNTAxNDYgOiDFmMOhZGVrIEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19yZXpzcF9pc3BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTQ3XCIsIC8vUkMgMzExNTAxNDcgOiBTSVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAxNDhcIiwgLy9SQyAzMTE1MDE0OCA6IFN0YXYgSUlTU1Ag4oCTIE90ZXbFmWVubyAvIFV6YXbFmWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzX3JlenNwX2lzcCA9IGQuc19yZXpzcF9pc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNfcmV6c3BfaXNwID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzX3JlenNwX2lzcCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyBpY29uOiB0aGlzLmljb25PdGV2cmVubywgdGV4dDogXCJqcmVzOjMxMTUwMTQ5XCIgfSAvL1JDIDMxMTUwMTQ5IDogT3RldsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7IGljb246IHRoaXMuaWNvblV6YXZyZW5vLCB0ZXh0OiBcImpyZXM6MzExNTAxNTBcIiB9OyAvL1JDIDMxMTUwMTUwIDogVXphdsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3JlenNwX2dpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxNTFcIiwgLy9SQyAzMTE1MDE1MSA6IFNHXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDE1MlwiLCAvL1JDIDMxMTUwMTUyIDogU3RhdiBHSU5JUyDigJMgT3RldsWZZW5vIC8gVXphdsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNfcmV6c3BfZ2luID0gZC5zX3JlenNwX2dpbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc19yZXpzcF9naW4gPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNfcmV6c3BfZ2luID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7IGljb246IHRoaXMuaWNvbk90ZXZyZW5vLCB0ZXh0OiBcImpyZXM6MzExNTAxNDlcIiB9IC8vUkMgMzExNTAxNDkgOiBPdGV2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsgaWNvbjogdGhpcy5pY29uVXphdnJlbm8sIHRleHQ6IFwianJlczozMTE1MDE1MFwiIH07IC8vUkMgMzExNTAxNTAgOiBVemF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9maW1cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTUzXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTUzIDogRklNXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF96ZHJcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU0XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU0IDogWkRSXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wYXJcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU1XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU1IDogUEFSXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wb2xcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU2XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU2IDogUE9MXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9lZHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU3XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU3IDogRURTXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wdnNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU4XCIsIHdpZHRoOiA5MCB9KSAvL1JDIDMxMTUwMTU4IDogUFZTXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF91Y2xcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTU5XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTU5IDogVUNMXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF96alwiLCAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTYwXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTYwIDogWkpcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3VqXCIsICBjYXB0aW9uOiBcImpyZXM6MzExNTAxNjFcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxNjEgOiBVSlxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpc3BfdXpcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTYyXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMTYyIDogVVpcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfcnNwX2dpblwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxNjNcIiwgd2lkdGg6IDEyMCB9KSAvL1JDIDMxMTUwMTYzIDogUHJvc3TFmWVka3kgR0lOSVNcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yc3BfaXNwX2ljb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzc4XCIsIC8vUkMgMzExNTAzNzggOiBTUlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzgzXCIsIC8vUkMgMzExNTAzODMgOiBTdGF2IHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuc19yZXpzcF9pc3AgPT09IDEgJiYgZC5jX3JzcF9naW4gJiYgcGFyc2VEZWNpbWFsKGQuY19yc3BfZ2luKS5lcSgwKSkgcmV0dXJuIHsgaWNvbjogXCJnaS1rZXlcIiwgdGV4dDogXCJqcmVzOjMxMTUwMjUyXCIgfTsgLy9SQyAzMTE1MDI1MiA6IFBvbG/FvmthIHNuw63FvmVuYSBuYSDDunJvdsSbxYggxI1lcnDDoW7DrSBhIGplIHV6YXbFmWVuYSB2IEdJTklTIGkgSUlTU1AuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5zX3Z5cml6X3JlenNwID09PSBudWxsIHx8IHR5cGVvZiBkLnNfdnlyaXpfcmV6c3AgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY19yc3BfaXNwICYmIGQuY19yc3BfZ2luICE9PSBkLmNfcnNwX2lzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLnNfdnlyaXpfcmV6c3AgPiAwKSByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBcImpyZXM6MzExNTAyNTNcIiB9OyAvL1JDIDMxMTUwMjUzIDogU3RhdnkgcmV6ZXJ2YWPDrSB2IEdJTklTIGEgSUlTU1AgbmVzb3VobGFzw60hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBcImpyZXM6MzExNTAyNTRcIiB9OyAvL1JDIDMxMTUwMjU0IDogUmV6ZXJ2YWNpIGplIG51dG7DqSBha3R1YWxpem92YXQgZG8gSUlTU1AuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3JzcF9pc3BcIiwgIGNhcHRpb246IFwianJlczozMTE1MDE2NFwiLCB3aWR0aDogMTIwIH0pIC8vUkMgMzExNTAxNjQgOiBSZXplcnZvdsOhbm8gU1BcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfY2VycF94bWFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTY1XCIsIHdpZHRoOiAxMzAgfSkgLy9SQyAzMTE1MDE2NSA6IMSMZXJww6FubyBHSU5JUyBkZW7DrWtcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZXJwX2dpbl9pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDM3OVwiLCAvL1JDIDMxMTUwMzc5IDogRyBQUlNLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAzODJcIiwgLy9SQyAzMTE1MDM4MiA6IFN0YXYgR0lOSVMgUFJTS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuc192eXJpel9yZXpzcCA9PT0gbnVsbCB8fCB0eXBlb2YgZC5zX3Z5cml6X3JlenNwID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNfY2VycF94bWEgIT09IGQuY19jZXJwX2dpbikgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMTE1MDI1NVwiIH07IC8vUkMgMzExNTAyNTUgOiBOZW7DrSBwcm92ZWRlbiBwxZllcG/EjWV0IHN0YXbFryBQUlNLLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7IG5hbWU6IFwiY19jZXJwX2dpblwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxNjZcIiwgd2lkdGg6IDEzMCB9KSAvL1JDIDMxMTUwMTY2IDogxIxlcnDDoW5vIEdJTklTIFBSU0tcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZXJwX2lzcF9pY29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDM4MFwiLCAvL1JDIDMxMTUwMzgwIDogU1AgUFJTS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzgxXCIsIC8vUkMgMzExNTAzODEgOiBTdGF2IElJU1NQIFBSU0tcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLnNfdnlyaXpfcmV6c3AgPT09IG51bGwgfHwgdHlwZW9mIGQuc192eXJpel9yZXpzcCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jX2NlcnBfZ2luICE9PSBkLmNfY2VycF9pc3ApIHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmcgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBcImpyZXM6MzExNTAyNTZcIiB9OyAvL1JDIDMxMTUwMjU2IDogTmVuw60gcHJvdmVkZW5vIHDFmWXDusSNdG92w6Fuw60gc2t1dGXEjW5vc3RpIHYgSUlTU1AuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX2NlcnBfaXNwXCIsIGNhcHRpb246IFwianJlczozMTE1MDE2N1wiLCB3aWR0aDogMTIwIH0pIC8vUkMgMzExNTAxNjcgOiDEjGVycMOhbm8gU1BcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImtfdXZvbG5lbmlcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTY4XCIsIHdpZHRoOiAxMzAgfSkgLy9SQyAzMTE1MDE2OCA6IEsgdXZvbG7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJkZW5tZXNcIiwgIGNhcHRpb246IFwianJlczozMTE1MDE2OVwiLCB3aWR0aDogNjAgfSkgLy9SQyAzMTE1MDE2OSA6IERhdC7EjWVycC5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3NwbFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxNzBcIiwgd2lkdGg6IDgwIH0pIC8vUkMgMzExNTAxNzAgOiBTcGxhdG5vc3RcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG9waXNcIiwgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxNzFcIiwgd2lkdGg6IDE1MCB9KSAvL1JDIDMxMTUwMTcxIDogUG9waXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZCh0aGlzLm9wdGlvbnMudm9sYXRXZWJTbHV6YnUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqICBLb21wbGV0bmkgcmVsb2FkIG9rbmEuICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWQodm9sYXRXZWJTbHV6YnU6IGJvb2xlYW4pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BTdGF2UmV6ZXJ2YWNlRHRvPj4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFjdGlQcmlwYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BSZXplcnZhY2UubmFjdGlQcmlwYWRDb21taXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2hwcjogb3B0aW9ucy5peHNfaHByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IG9wdGlvbnMucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IG9wdGlvbnMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IG9wdGlvbnMudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHsgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYWN0aVN0YXZSZXplcnZhY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BTdGF2UmV6ZXJ2YWNlLmxpc3QoeyBmaWx0ZXJzOiB7IGl4c19ocHI6IG9wdGlvbnMuaXhzX2hwciB9IH0pLmdldFZpZXcoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9ICh0aGlzLnN0YXZ5UmV6ZXJ2YWNpRm9ybS5maW5kRmllbGRzKFwic3RhdnlSZXplcnZhY2lcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BTdGF2UmV6ZXJ2YWNlRHRvIHwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkLndoZW4oKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyBpZiAodm9sYXRXZWJTbHV6YnUpIHJldHVybiBuYWN0aVByaXBhZCgpOyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gbmFjdGlTdGF2UmV6ZXJ2YWNlKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigodmlldykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSB2aWV3LmdldERhdGFSb3dzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZvbGF0V2ViU2x1emJ1ICYmIChkLmxlbmd0aCA9PT0gMCkpIHJldHVybiBuYWN0aVByaXBhZCgpLnRoZW4oKCkgPT4geyByZXR1cm4gbmFjdGlTdGF2UmV6ZXJ2YWNlKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gdmlldy5nZXREYXRhUm93cyhmYWxzZSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdnlSZXplcnZhY2lGaWVsZCA9IHRoaXMuc3RhdnlSZXplcnZhY2lGb3JtLmZpbmRGaWVsZHMoXCJzdGF2eVJlemVydmFjaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF2eVJlemVydmFjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIiwgdmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkICYmICFzdGF2eVJlemVydmFjaUZpZWxkLmdmaWVsZChcImhhc1ZhbHVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLml4c19ocHIgJiYgb3B0aW9ucy5pZF9oZHIgJiYgb3B0aW9ucy5pZF9oZHJfcmlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2eVJlemVydmFjaUZpZWxkLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpeHNfaHByOiBvcHRpb25zLml4c19ocHIsIGlkX2hkcjogb3B0aW9ucy5pZF9oZHIsIGlkX2hkcl9yaXM6IG9wdGlvbnMuaWRfaGRyX3JpcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdnlSZXplcnZhY2lGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ICBlbHNlIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdnlSZXplcnZhY2lGaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGl4c19ocHI6IHZhbC5peHNfaHByLCBpZF9oZHI6IHZhbC5pZF9oZHIsIGlkX2hkcl9yaXM6IHZhbC5pZF9oZHJfcmlzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmFjdGVuaSBkZXRhaWx1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGV0YWlsc0RhdGEoaWRfaGRyOiBudW1iZXIsIGlkX2hkcl9yaXM6IHN0cmluZyk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcFN0YXZSZXplcnZhY2UucmVhZCh7XHJcbiAgICAgICAgICAgICAgICBpeHNfaHByOiBvcHRpb25zLml4c19ocHIsXHJcbiAgICAgICAgICAgICAgICBpZF9oZHI6IGlkX2hkciwgLy9iZXJlIHNlIHogZHJvcGRvd24/Pz9cclxuICAgICAgICAgICAgICAgIGlkX2hkcl9yaXM6IGlkX2hkcl9yaXNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuUGVybWlzc2lvbnM/Lkx6ZU90ZXZyaXQpIHRoaXMuYWN0aW9uc1tcIm90ZXZyaXRSZXpBY3RcIl0hLnVwZGF0ZVBlcm1pc3Npb24oZC5QZXJtaXNzaW9ucy5MemVPdGV2cml0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC5QZXJtaXNzaW9ucz8uTHplVXphdnJpdCkgdGhpcy5hY3Rpb25zW1widXphdnJpdFJlekFjdFwiXSEudXBkYXRlUGVybWlzc2lvbihkLlBlcm1pc3Npb25zLkx6ZVV6YXZyaXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BTdGF2UmV6ZXJ2YWNlLnBvbG96a3lfTGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19ocHI6IG9wdGlvbnMuaXhzX2hwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkX2hkcjogaWRfaGRyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfaGRyX3JpczogaWRfaGRyX3Jpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7IHRoaXMudmlldy51cGRhdGVEYXRhKHIpIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgb3Zlcml0U3RhdigpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpeHNfaHByLCByb2ssIGljbywgdWNzIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc2wuSWlzc3BSZXplcnZhY2UubmFjdGlQcmlwYWRDb21taXQoeyBpeHNfaHByOiBpeHNfaHByLCByb2s6IHJvaywgaWNvOiBpY28sIHVjczogdWNzIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwianJlczozMTE1MDI1N1wiKTsgLy9SQyAzMTE1MDI1NyA6IFN0YXYgw7pzcMSbxaFuxJsgbmHEjXRlbiB6IElJU1NQLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dIaXN0U3RhdnUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IElHSWlzc3BSZXpIaXN0b3J5T3B0aW9ucyA9IHsgaXhzX2hwcjogdGhpcy5vcHRpb25zLml4c19ocHIgfTtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShHSWlzc3BSZXpIaXN0b3J5LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXphdnJpdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpeHNfaHByLCByb2ssIGljbywgdWNzIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc2wuSWlzc3BSZXplcnZhY2UudXphdnJpUHJpcGFkQ29tbWl0KHsgaXhzX2hwcjogaXhzX2hwciwgcm9rOiByb2ssIGljbzogaWNvLCB1Y3M6IHVjcyB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHsgcmV0dXJuIHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzExNTAyMDdcIi5mb3JtYXQoaXhzX2hwcikpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTsgfSkgLy9SQyAzMTE1MDIwNyA6IFDFmcOtcGFkIHswfSBieWwgdiBJSVNTUCB1emF2xZllbi5cclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICB7IHRoaXMucmVsb2FkKHRydWUpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1emF2cml0UmV6KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB7IGl4c19ocHIsIHJvaywgaWNvLCB1Y3MgfSA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnN0YXZ5UmV6ZXJ2YWNpRm9ybS5maW5kRmllbGRzKFwic3RhdnlSZXplcnZhY2lcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BTdGF2UmV6ZXJ2YWNlRHRvO1xyXG4gICAgICAgICAgICBjb25zdCBpZF9oZHJfcmlzID0gdmFsdWU/LmlkX2hkcl9yaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkX2hkciA9IHZhbHVlPy5pZF9oZHI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlkX2hkcl9yaXMgfHwgIWlkX2hkcikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcFJlemVydmFjZS51emF2cmlSZXplcnZhY2lDb21taXQoe1xyXG4gICAgICAgICAgICAgICAgaXhzX2hwcjogaXhzX2hwcixcclxuICAgICAgICAgICAgICAgIGlkX2hkcjogaWRfaGRyLFxyXG4gICAgICAgICAgICAgICAgaWRfaGRyX3JpczogaWRfaGRyX3JpcyxcclxuICAgICAgICAgICAgICAgIHJvazogcm9rLFxyXG4gICAgICAgICAgICAgICAgaWNvOiBpY28sXHJcbiAgICAgICAgICAgICAgICB1Y3M6IHVjc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4geyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMxMTUwMjA4XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTsgfSkvL1JDIDMxMTUwMjA4IDogUmV6ZXJ2YWNlIGJ5bGEgdXphdsWZZW5hLlxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLnJlbG9hZCh0cnVlKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3RldnJpdFJleigpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpeHNfaHByLCByb2ssIGljbywgdWNzIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGF2eVJlemVydmFjaUZvcm0uZmluZEZpZWxkcyhcInN0YXZ5UmV6ZXJ2YWNpXCIpLmdmaWVsZChcImdldFZhbHVlXCIpIGFzIEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwU3RhdlJlemVydmFjZUR0bztcclxuICAgICAgICAgICAgY29uc3QgaWRfaGRyX3JpcyA9IHZhbHVlPy5pZF9oZHJfcmlzO1xyXG4gICAgICAgICAgICBjb25zdCBpZF9oZHIgPSB2YWx1ZT8uaWRfaGRyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpZF9oZHJfcmlzIHx8ICFpZF9oZHIpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc2wuSWlzc3BSZXplcnZhY2Uub3RldnJpUmV6ZXJ2YWNpQ29tbWl0KHtcclxuICAgICAgICAgICAgICAgIGl4c19ocHI6IGl4c19ocHIsXHJcbiAgICAgICAgICAgICAgICBpZF9oZHI6IGlkX2hkcixcclxuICAgICAgICAgICAgICAgIGlkX2hkcl9yaXM6IGlkX2hkcl9yaXMsXHJcbiAgICAgICAgICAgICAgICByb2s6IHJvayxcclxuICAgICAgICAgICAgICAgIGljbzogaWNvLFxyXG4gICAgICAgICAgICAgICAgdWNzOiB1Y3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHsgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMTE1MDIwOVwiKS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7IH0pIC8vUkMgMzExNTAyMDkgOiBSZXplcnZhY2UgYnlsYSBvdGV2xZllbmEuXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4geyB0aGlzLnJlbG9hZCh0cnVlKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd0hpc3RWb2xhbmkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IElHSWlzc3BSZXpXc0NhbGxIaXN0b3J5T3B0aW9ucyA9IHsgaXhzX2hwcjogdGhpcy5vcHRpb25zLml4c19ocHIgfTtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShbR0lpc3NwUmV6V3NDYWxsSGlzdG9yeSwgeyB1aWQ6IFwiR0lpc3NwUmV6V3NDYWxsSGlzdG9yeSNcIiB9XSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHSWlzc3BSZXpIaXN0b3J5T3B0aW9ucyB7XHJcbiAgICAgICAgaXhzX2hwcjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHSWlzc3BSZXpIaXN0b3J5IGV4dGVuZHMgR0NvbnRlbnQgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGljb25PdGV2cmVubyA9IFwiZ2ktdW5sb2NrXCI7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBpY29uVXphdnJlbm8gPSBcImdpLWxvY2tcIjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdJaXNzcFJlekhpc3RvcnlPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl4c19ocHIgPSBvcHRpb25zLml4c19ocHI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMxMTUwMTc4XCIuZm9ybWF0KGl4c19ocHIpOyAvL1JDIDMxMTUwMTc4IDogSGlzdG9yaWUgc3RhdnUgcmV6ZXJ2YWPDrSBwxZnDrXBhZHUgezB9IHZlIFN0w6F0bsOtIHBva2xhZG7Em1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsb3NlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1dKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcFN0YXZSZXplcnZhY2UuaGlzdG9yaWVQb2xvemVrX0xpc3QoeyBmaWx0ZXJzOiB7IGl4c19ocHI6IGl4c19ocHIgfSB9KS5nZXRWaWV3KClcclxuICAgICAgICAgICAgICAgIC50aGVuKCh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFN0YXZSZXplcnZhY2VQb2xvemthSGlzdG9yaWVEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF92b2xhbmlfc3NwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDE4MFwiLCAvL1JDIDMxMTUwMTgwIDogRG90YXogI1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAxODFcIiAvL1JDIDMxMTUwMTgxIDogSUQgZG90YXp1IG5hIHN0YXYgdiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfZG90YXpfZG9rbFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxODJcIiwgd2lkdGg6IDE1MCB9KSAvL1JDIDMxMTUwMTgyIDogRGF0dW0gZG90YXp1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDE4M1wiLCAvL1JDIDMxMTUwMTgzIDogI0RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMTg0XCIgLy9SQyAzMTE1MDE4NCA6IElEIGRva2xhZHUgR0lOSVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3JlenNwX2Rva2xcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTg1XCIsIC8vUkMgMzExNTAxODUgOiBTRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAxODZcIiwgLy9SQyAzMTE1MDE4NiA6IFN0YXYgZG9rbGFkdSB2IElJU1NQIOKAkyBPdGV2xZllbm8gLyBVemF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc19yZXpzcF9kb2tsID0gZC5zX3JlenNwX2Rva2w7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNfcmV6c3BfZG9rbCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc19yZXpzcF9kb2tsID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7IGljb246IHRoaXMuaWNvbk90ZXZyZW5vLCB0ZXh0OiBcImpyZXM6MzExNTAxNDlcIiB9IC8vUkMgMzExNTAxNDkgOiBPdGV2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsgaWNvbjogdGhpcy5pY29uVXphdnJlbm8sIHRleHQ6IFwianJlczozMTE1MDE1MFwiIH07IC8vUkMgMzExNTAxNTAgOiBVemF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2hkcl9yaXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTg3XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDE4NyA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxODhcIiwgLy9SQyAzMTE1MDE4OCA6IMWYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDE4OVwiIC8vUkMgMzExNTAxODkgOiDFmMOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19yZXpzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTBcIiwgLy9SQyAzMTE1MDE5MCA6IFPFmFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAxOTFcIiwgLy9SQyAzMTE1MDE5MSA6IFN0YXYgxZnDoWRrdSB2IElJU1NQIOKAkyBPdGV2xZllbm8gLyBVemF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc19yZXpzcCA9IGQuc19yZXpzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc19yZXpzcCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc19yZXpzcCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyBpY29uOiB0aGlzLmljb25PdGV2cmVubywgdGV4dDogXCJqcmVzOjMxMTUwMTQ5XCIgfSAvL1JDIDMxMTUwMTQ5IDogT3RldsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7IGljb246IHRoaXMuaWNvblV6YXZyZW5vLCB0ZXh0OiBcImpyZXM6MzExNTAxNTBcIiB9OyAvL1JDIDMxMTUwMTUwIDogVXphdsWZZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzX3JlenNwXCIsIGNhcHRpb246IFwianJlczozMTE1MDE5MlwiLCB3aWR0aDogNDAgfSkgLy9SQyAzMTE1MDE5MiA6IFN0YXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX2ZpbVwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTNcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxOTMgOiBGSU1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3pkclwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTRcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxOTQgOiBaRFJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3BhclwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTVcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxOTUgOiBQQVJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3BvbFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTZcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxOTYgOiBQT0xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX2Vkc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTdcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxOTcgOiBFRFNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3B2c1wiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOThcIiwgd2lkdGg6IDkwIH0pIC8vUkMgMzExNTAxOTggOiBQVlNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3VjbFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAxOTlcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAxOTkgOiBVQ0xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3pqXCIsICBjYXB0aW9uOiBcImpyZXM6MzExNTAyMDBcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAyMDAgOiBaSlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpc3BfdWpcIiwgIGNhcHRpb246IFwianJlczozMTE1MDIwMVwiLCB3aWR0aDogNzAgfSkgLy9SQyAzMTE1MDIwMSA6IFVKXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF91elwiLCAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjAyXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMjAyIDogVVpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19yc3BcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjAzXCIsIHdpZHRoOiAxMjAgfSkgLy9SQyAzMTE1MDIwMyA6IFJlemVydm92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREZWNpbWFsQ29sdW1uKHsgbmFtZTogXCJjX2NlcnBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjA0XCIsIHdpZHRoOiAxMjAgfSkgLy9SQyAzMTE1MDIwNCA6IMSMZXJww6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfc3BsXCIsIGNhcHRpb246IFwianJlczozMTE1MDIwNVwiLCB3aWR0aDogODAgfSkgLy9SQyAzMTE1MDIwNSA6IFNwbGF0bm9zdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwb3Bpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMDZcIiwgd2lkdGg6IDE1MCB9KSAvL1JDIDMxMTUwMjA2IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0lpc3NwUmV6V3NDYWxsSGlzdG9yeU9wdGlvbnMge1xyXG4gICAgICAgIGl4c19ocHI6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdJaXNzcFJleldzQ2FsbEhpc3RvcnlcclxuICAgICAqIFxyXG4gICAgICogVEsgZWt2LjogTjpcXEdJTklTXFw0ODlcXERFVlxcTkVUXFxHb3JkaWMuSWlzc3AuV2luQ2xpZW50XFxEbnBcXFRhYnNcXEdJaXNzcEhpc3RvcnlUYWIuY3NcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBibWFydGluZWtcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdJaXNzcFJleldzQ2FsbEhpc3RvcnkgZXh0ZW5kcyBHQ29udGVudCBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdJaXNzcFJleldzQ2FsbEhpc3RvcnlPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl4c19ocHIgPSBvcHRpb25zLml4c19ocHI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMxMTUwMjI5XCIuZm9ybWF0KGl4c19ocHIpOyAvL1JDIDMxMTUwMjI5IDogSGlzdG9yaWUgdm9sw6Fuw60gU3TDoXRuw60gcG9rbGFkbnkgcHJvIHDFmcOtcGFkIHswfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNoRGV0YWlsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyMzBcIiwgLy9SQyAzMTE1MDIzMCA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRfdm9sYW5pX3NzcCA9IGdyaWQuZ2dyaWQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BSZXplcnZhY2VIaXN0b3JpZUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF0/LmlkX3ZvbGFuaV9zc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpZF92b2xhbmlfc3NwKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogSUdJaXNzcFJleldzQ2FsbEhpc3RvcnlEZXRhaWxzT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRfdm9sYW5pX3NzcDogaWRfdm9sYW5pX3NzcFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShbR0lpc3NwUmV6V3NDYWxsSGlzdG9yeURldGFpbHMsIHsgdWlkOiBcIkdJaXNzcFJleldzQ2FsbEhpc3RvcnlEZXRhaWxzI1wiIH1dLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLnNoRGV0YWlsQWN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IHNvcnQ6IFwiIWlkX3ZvbGFuaV9zc3BcIiwgLypncm91cGluZzogXCJpZF92b2xhbmlfc3NwXCIqLyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwUmV6ZXJ2YWNlSGlzdG9yaWVEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX3ZvbGFuaV9zc3BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDIxM1wiLCAvL1JDIDMxMTUwMjEzIDogSWQgdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDIyNVwiLCAgLy9SQyAzMTE1MDIyNSA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDIyNlwiLCAvL1JDIDMxMTUwMjI2IDogVm9sw6FubyBvbmxpbmUgLyBvZmZsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpel9vZmZsaW5lID0gZC5wcml6X29mZmxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcml6X29mZmxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4geyBpY29uOiBcImZhLXdpZmkgZ2ktc3RhdGUtd2FyblwiLCB0ZXh0OiBcImpyZXM6MzExNTAyMjdcIiB9OyAvL1JDIDMxMTUwMjI3IDogT2ZmbGluZSAocMWZZXMgZMOhdmt1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZmEtd2lmaVwiLCB0ZXh0OiBcImpyZXM6MzExNTAyMjhcIiB9IC8vUkMgMzExNTAyMjggOiBPbmxpbmUgKHZvbMOhbsOtbSBXUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5c2xfdm9sYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyMzhcIiwgLy9SQyAzMTE1MDIzOCA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZ5c2xfdm9sYW5pID0gZC52eXNsX3ZvbGFuaSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzT2sgPSB2eXNsX3ZvbGFuaSA9PT0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBpc09rID8gXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiIDogXCJmYS10aW1lcy1jaXJjbGUgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGQudnlzbF92b2xhbmlfdHh0ID8/IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidnlzbF92b2xhbmlfdHh0XCIsIGNhcHRpb246IFwianJlczozMTE1MDIxNlwiLCB3aWR0aDogMTUwIH0pIC8vUkMgMzExNTAyMTYgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImRva2xhZFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMTRcIiwgd2lkdGg6IDE1MCB9KSAvL1JDIDMxMTUwMjE0IDogRG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJtZXRvZGFfaWlzc3BfdHh0XCIsIGNhcHRpb246IFwianJlczozMTE1MDIxNVwiLCB3aWR0aDogODAgfSkgLy9SQyAzMTE1MDIxNSA6IE1ldG9kYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMTdcIiwvKiB3aWR0aDogMTIwICovfSkgLy9SQyAzMTE1MDIxNyA6IERhdHVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpZF9oZHJfcmlzXCIsIGNhcHRpb246IFwianJlczozMTE1MDIxOFwiLCB3aWR0aDogOTAgfSkgIC8vUkMgMzExNTAyMTggOiDEjMOtc2xvIHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyZXpfYWt0X3ByaXpcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjE5XCIsIHdpZHRoOiAzNSB9KSAvL1JDIDMxMTUwMjE5IDogUMWZw616LmFrdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicG9yX2Npc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMjBcIiwgd2lkdGg6IDM1IH0pIC8vUkMgMzExNTAyMjAgOiBacHIuIMSNLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidHlwX2hsYXNlbmlcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjIxXCIsIHdpZHRoOiAzNSB9KSAvL1JDIDMxMTUwMjIxIDogVHlwIHpwci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2hsYXNlbmlcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjIyXCIsIHdpZHRoOiA5MCB9KSAvL1JDIDMxMTUwMjIyIDogSWRlbnQuIHpwcsOhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInRleHRfaGxhc2VuaVwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMjNcIiwgd2lkdGg6IDM1MCB9KSAgLy9SQyAzMTE1MDIyMyA6IFRleHQgenByw6F2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidGV4dF9jaHlieVwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMjRcIiwgd2lkdGg6IDM1MCB9KSAvL1JDIDMxMTUwMjI0IDogVGV4dCBjaHlieVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwUmV6ZXJ2YWNlSGlzdG9yaWUubGlzdCh7IGZpbHRlcnM6IHsgaXhzX2hwcjogaXhzX2hwciB9IH0pLmdldFZpZXcoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHZpZXcpID0+IHsgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7IH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW3tcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLnNoRGV0YWlsQWN0LFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsb3NlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLklpc3NwLldlYkNvbnRyb2xzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdJaXNzcFJleldzQ2FsbEhpc3RvcnlEZXRhaWxzT3B0aW9ucyB7XHJcbiAgICAgICAgaWRfdm9sYW5pX3NzcDogbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHR5cGUgR0lpc3NwUmV6ZXJ2YWNlSGlzdG9yaWVEdG8gPSBHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFJlemVydmFjZUhpc3RvcmllRHRvO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR0lpc3NwUmV6V3NDYWxsSGlzdG9yeURldGFpbHNcclxuICAgICAqIFRLIEVrdjogTjpcXEdJTklTXFw0ODlcXERFVlxcTkVUXFxHb3JkaWMuSWlzc3AuV2luQ2xpZW50XFxEbnBcXFRhYnNcXEdJaXNzcEhpc3RvcnlEZXRhaWxUYWIuY3NcclxuICAgICAqIEBhdXRob3IgYm1hcnRpbmVrXHJcbiAgICAgKiBAc2luY2UgNDkwLjEuMC4xXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHSWlzc3BSZXpXc0NhbGxIaXN0b3J5RGV0YWlscyBleHRlbmRzIEdDb250ZW50IGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICBwcmVwYXJlQ29udGVudChvcHRpb25zOiBJR0lpc3NwUmV6V3NDYWxsSGlzdG9yeURldGFpbHNPcHRpb25zKTp2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBganJlczozMTE1MDI0OGAuZm9ybWF0KG9wdGlvbnMuaWRfdm9sYW5pX3NzcCk7IC8vUkMgMzExNTAyNDggOiBEZXRhaWwgdm9sw6Fuw60gezB9XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gR3JpZFxyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYoKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAyMzFcIiwgLy9SQyAzMTE1MDIzMSA6IEluZm9ybWFjZSBvIG9ubGluZSB2b2zDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKGdyaWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcFJlemVydmFjZUhpc3RvcmllLnJlYWQoeyBpZF92b2xhbmlfc3NwOiBvcHRpb25zLmlkX3ZvbGFuaV9zc3AgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzT2ZmbGluZSA9IHIucHJpel9vZmZsaW5lID09PSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclNldHRpbmdzOiB0aGlzLnVzZXJTZXR0aW5ncz8uc3ViKGlzT2ZmbGluZSA/IFwiZ3JpZE9mZmxpbmVcIiA6IFwiZ3JpZE9ubGluZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogaXNPZmZsaW5lID8gdGhpcy5jcmVhdGVPZmZsaW5lR3JpZEZvcm1hdCgpIDogdGhpcy5jcmVhdGVPbmxpbmVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoci50ZXh0X2NoeWJ5X2xvbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhjVGFiLmd0YWIoXCJvcHRpb25cIiwgXCJ2aXNpYmxlXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RhYihcIm9wdGlvblwiLCBcIm9wZW5lZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhjRm9ybSQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEZvcm0kLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dEZvcm0kLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gRXhjZXB0aW9uXHJcblxyXG4gICAgICAgICAgICBjb25zdCBleGNGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMTItMTItMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwidGV4dF9jaHlieV9sb25nXCIsIHJvd3M6IDEwLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCBkaXNhYmxlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGV4Y0Zvcm0kID0gJC5uZXdEaXYoKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZXhjRm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4Y1RhYiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAyMzJcIiwgLy9SQyAzMTE1MDIzMiA6IEluZm9ybWFjZSBvIGNoeWLEmyBhIHZzdHVwbsOtIGEgdsO9c3R1cG7DrSBYTUxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKGV4Y0Zvcm0kKTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIFZzdHVwXHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0xMi0xMi0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ4bWxfcmVxdWVzdFwiLCByb3dzOiAxMCwgZGlzYWJsZWQ6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbnB1dEZvcm0kID0gJC5uZXdEaXYoKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaW5wdXRGb3JtKTtcclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDIzM1wiLCAvL1JDIDMxMTUwMjMzIDogVnN0dXBcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKGlucHV0Rm9ybSQpO1xyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gVnlzdHVwXHJcblxyXG4gICAgICAgICAgICBjb25zdCBvdXRwdXRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMTItMTItMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwieG1sX3Jlc3BvbnNlXCIsIHJvd3M6IDEwLCBkaXNhYmxlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dEZvcm0kID0gJC5uZXdEaXYoKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgb3V0cHV0Rm9ybSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAyMzRcIiwgLy9SQyAzMTE1MDIzNCA6IFbDvXN0dXBcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKG91dHB1dEZvcm0kKTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbG9zZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlT25saW5lR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdJaXNzcFJlemVydmFjZUhpc3RvcmllRHRvPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHSWlzc3BSZXplcnZhY2VIaXN0b3JpZUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwiaWRfdm9sYW5pX3NzcFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMzVcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAyMzUgOiBJZCB2b2zDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjQxXCIsIC8vUkMgMzExNTAyNDEgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMjQyXCIsIC8vUkMgMzExNTAyNDIgOiBWb2zDoW5vIG9ubGluZSAvIG9mZmxpbmVcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaXpfb2ZmbGluZSA9IGQucHJpel9vZmZsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByaXpfb2ZmbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4geyBpY29uOiBcImZhLXdpZmkgZ2ktc3RhdGUtdGV4dCBnaS1zdGF0ZS13YXJuXCIsIHRleHQ6IFwianJlczozMTE1MDIyN1wiIH07IC8vUkMgMzExNTAyMjcgOiBPZmZsaW5lIChwxZllcyBkw6F2a3UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZmEtd2lmaVwiLCB0ZXh0OiBcImpyZXM6MzExNTAyMjhcIiB9IC8vUkMgMzExNTAyMjggOiBPbmxpbmUgKHZvbMOhbsOtbSBXUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJkb2tsYWRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjM2XCIsIHdpZHRoOiAxMzAgfSkgLy9SQyAzMTE1MDIzNiA6IERva2xhZCBcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJtZXRvZGFfaWlzc3BfdHh0XCIsIGNhcHRpb246IFwianJlczozMTE1MDIzN1wiLCB3aWR0aDogODAgfSkgLy9SQyAzMTE1MDIzNyA6IE1ldG9kYVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInZ5c2xfdm9sYW5pX3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMzhcIiwgd2lkdGg6IDE4MCB9KSAvL1JDIDMxMTUwMjM4IDogVsO9c2xlZGVrIFxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfem1lbmFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjM5XCIsIHdpZHRoOiAxNDAgfSkgLy9SQyAzMTE1MDIzOSA6IERhdHVtIFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2hkcl9yaXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjQwXCIsIHdpZHRoOiA5MCB9KTsgLy9SQyAzMTE1MDI0MCA6IMSMw61zbG8gcmV6ZXJ2YWNlIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVPZmZsaW5lR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdJaXNzcFJlemVydmFjZUhpc3RvcmllRHRvPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHSWlzc3BSZXplcnZhY2VIaXN0b3JpZUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwiaWRfdm9sYW5pX3NzcFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMzVcIiwgd2lkdGg6IDcwIH0pIC8vUkMgMzExNTAyMzUgOiBJZCB2b2zDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2Rhdmt5X2V4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyNDNcIiwgd2lkdGg6IDEzMCB9KSAvL1JDIDMxMTUwMjQzIDogSWQgZMOhdmt5IFxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjQxXCIsIC8vUkMgMzExNTAyNDEgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMjQyXCIsIC8vUkMgMzExNTAyNDIgOiBWb2zDoW5vIG9ubGluZSAvIG9mZmxpbmVcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaXpfb2ZmbGluZSA9IGQucHJpel9vZmZsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByaXpfb2ZmbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4geyBpY29uOiBcImZhLXdpZmkgZ2ktc3RhdGUtd2FyblwiLCB0ZXh0OiBcImpyZXM6MzExNTAyMjdcIiB9OyAvL1JDIDMxMTUwMjI3IDogT2ZmbGluZSAocMWZZXMgZMOhdmt1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4geyBpY29uOiBcImZhLXdpZmlcIiwgdGV4dDogXCJqcmVzOjMxMTUwMjI4XCIgfSAvL1JDIDMxMTUwMjI4IDogT25saW5lICh2b2zDoW7DrW0gV1MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZG9rbGFkXCIsIGNhcHRpb246IFwianJlczozMTE1MDIzNlwiLCB3aWR0aDogMTMwIH0pIC8vUkMgMzExNTAyMzYgOiBEb2tsYWQgXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibWV0b2RhX2lpc3NwX3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyMzdcIiwgd2lkdGg6IDgwIH0pIC8vUkMgMzExNTAyMzcgOiBNZXRvZGFcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ2eXNsX3ZvbGFuaV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjM4XCIsIHdpZHRoOiAxODAgfSkgLy9SQyAzMTE1MDIzOCA6IFbDvXNsZWRlayBcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X3Z5dHZvcmVuaVwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyNDRcIiwgd2lkdGg6IDE0MCB9KSAvL1JDIDMxMTUwMjQ0IDogVnl0dm/FmWVubyBcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X29kcG92ZWRpXCIsIGNhcHRpb246IFwianJlczozMTE1MDI0NVwiLCB3aWR0aDogMTQwIH0pIC8vUkMgMzExNTAyNDUgOiBQxZlpamF0b1xyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInptZW51X3Byb3Zfdnl0dl9yZlwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAyNDZcIiwgd2lkdGg6IDE1MCB9KSAvL1JDIDMxMTUwMjQ2IDogVnl0dm/FmWlsXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiem1lbnVfcHJvdl9vZHBfcmZcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjQ3XCIsIHdpZHRoOiAxNTAgfSk7IC8vUkMgMzExNTAyNDcgOiBQxZlpamFsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgdHlwZSBHSWlzc3BJbmJveER0byA9IEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwSW5ib3hEdG87XHJcblxyXG4gICAgaW50ZXJmYWNlIElHSWlzc3BJbmJveEZpbHRlciB7XHJcbiAgICAgICAgc2hvd0RlbGl2ZXJlZD86IGJvb2xlYW4sXHJcbiAgICAgICAgc2hvd0ZhaWxlZD86IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdJbmJveCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgdWlkID0gXCJHSWlzc3BJbmJveCNcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozMTE1MDA1OVwiOyAvL1JDIDMxMTUwMDU5IDogU3RhdiB2b2zDoW7DrSBJbmJveCBJSVNTUFxyXG5cclxuICAgICAgICBwcml2YXRlIGZpbHRlcnBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3PEdJaXNzcEluYm94RHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2eml0QWN0OiAgR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGhpc3RvcmllQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgb2JzYWhBY3Q6ICAgIEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoQWN0OiAgR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHN0b3Jub0FjdDogICBHQWN0aW9uO1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBNZW51QmFyXHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZ6aXRBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJldnppdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDYwXCIsIC8vUkMgMzExNTAwNjAgOiBQxZlldnrDrXRcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R0lpc3NwSW5ib3hEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBcImlkX2luYm94X3NzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDA2NlwiLCAvL1JDIDMxMTUwMDY2IDogUMWZZXZ6ZXTDrSB6cHLDoXYgeiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXVtcIndpel9jaGVja1wiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoeyByZXN1bHQ6IGRhdGEgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMxMTUwMDY3XCIsIC8vUkMgMzExNTAwNjcgOiBLb250cm9sYSB6w6F6bmFtxa8gayBwxZlldnpldMOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJqcmVzOjMxMTUwMDY4XCIsIC8vUkMgMzExNTAwNjggOiBQxZlldnrDrXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcEluYm94LnByZXZ6aXRacHJhdnlIcm9tYWRuZUNvbW1pdCh7IGlkX2luYm94X3NzcF9ncm91cDogZGF0YS5tYXAoZCA9PiBkLmlkX2luYm94X3NzcCEpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8R0lpc3NwSW5ib3hEdG8+KHJlcyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDA2OVwiLCAvL1JDIDMxMTUwMDY5IDogVsO9c2xlZGVrIHDFmWV2emV0w60genByw6F2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7IHRoaXMucmVmcmVzaEFjdC5ydW4oKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHSWlzc3BJbmJveER0bz4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yaWVBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaGlzdG9yaWVBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA2MVwiLCAvL1JDIDMxMTUwMDYxIDogSGlzdG9yaWVcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R0lpc3NwSW5ib3hEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR0luYm94SGlzdG9yeSwgeyBpZF9pbmJveF9zc3A6IHNlbFswXS5pZF9pbmJveF9zc3AhLCB0eXA6IFwiaW5ib3hcIiB9IGFzIElHSW5ib3hIaXN0b3J5T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vYnNhaEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvYnNhaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDYyXCIsIC8vUkMgMzExNTAwNjIgOiBPYnNhaFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHSWlzc3BJbmJveER0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShHSW5ib3hCYXRjaENvbnRlbnQsIHsgaWRfaW5ib3hfc3NwOiBzZWxbMF0uaWRfaW5ib3hfc3NwISwgdHlwOiBcImluYm94XCIgfSBhcyBJR0luYm94QmF0Y2hDb250ZW50T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJlZnJlc2hBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA2NVwiLCAvL1JDIDMxMTUwMDY1IDogT2LEjWVyc3R2aXRcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYpID0+IHsgdGhpcy5maWx0ZXJwYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTsgLyp0aGlzLmdldERhdGEoKTsgKi99XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9ybm9BY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rvcm5vQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwMDFcIiwgLy8gR0RsZy5tYmJDYW5jZWwudGV4dCwgLy8gbWJiQ2FuY2VsID0gWnJ1xaFpdCAoanZhY2hhOiB0byBhc2kgbmVuw60gb25vKSAvL1JDIDI0NDUwMDAxIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gdGhpcy5ncmlkLmdncmlkPEdJaXNzcEluYm94RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogXCJpZF9pbmJveF9zc3BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAwNzBcIiwgLy9SQyAzMTE1MDA3MCA6IFN0b3JubyB6cHLDoXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogc2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV1bXCJ3aXpfY2hlY2tcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgcmVzdWx0OiBkYXRhIH0pLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMTE1MDA3MVwiLCAvL1JDIDMxMTUwMDcxIDogS29udHJvbGEgesOhem5hbcWvIGtlIHN0b3JudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwianJlczozMTE1MDA3MlwiLCAvL1JDIDMxMTUwMDcyIDogU3Rvcm5vdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BJbmJveC5zdG9ybnVqSHJvbWFkbmUoeyBpZF9pbmJveF9zc3BfZ3JvdXA6IGRhdGEubWFwKGQgPT4gZC5pZF9pbmJveF9zc3AhKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4geyByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEdJaXNzcEluYm94RHRvPihyZXMpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAwNzNcIiwgLy9SQyAzMTE1MDA3MyA6IFbDvXNsZWRlayBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKHZpZXcpID0+IHsgdGhpcy5yZWZyZXNoQWN0LnJ1bigpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBhcyBHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdJaXNzcEluYm94RHRvPik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnByZXZ6aXRBY3QsICBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuaGlzdG9yaWVBY3QsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5vYnNhaEFjdCwgICAgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnJlZnJlc2hBY3QsICBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuc3Rvcm5vQWN0LCAgIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsb3NlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYpID0+IHsgdGhpcy5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInNob3dEZWxpdmVyZWRcIiwgbGFiZWw6IFwianJlczozMTE1MDA2M1wiLCBsYWJlbEZyb21Sb3c6IFwibmV2ZXJcIiB9KSAvL1JDIDMxMTUwMDYzIDogWm9icmF6aXQgdnl6dmVkbnV0w6lcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJzaG93RmFpbGVkXCIsIGxhYmVsOiBcImpyZXM6MzExNTAwNjRcIiwgbGFiZWxGcm9tUm93OiBcIm5ldmVyXCIgfSk7IC8vUkMgMzExNTAwNjQgOiBab2JyYXppdCBjaHlibsOpXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcnBhbmVsID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsPElHSWlzc3BJbmJveEZpbHRlcj4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBpZFNpbXBsZU1vZGU6IFwiaWlzc3BJbmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wic2hvd0RlbGl2ZXJlZFwiLCBcInNob3dGYWlsZWRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdERhdGE6IChldiwgZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShmaWx0ZXIuZGF0YSBhcyBJR0lpc3NwSW5ib3hGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R0lpc3NwSW5ib3hEdG8+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdJaXNzcEluYm94RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IGNvbHVtbkxpc3Q6IFwiaWRfaW5ib3hfc3NwLGlkX2luYm94X3VzZXIsaWRfaW5ib3hfZXh0LG1ldG9kYV90eHQsc3RhdHVzLGRhdF9zdGF2X29kLGRhdF9zdGF2LGRhdF91a29uY2VuaSxkYXRfemFkYWwscG9jZXRfenByYXYsemFkYWxfbmF6ZXZfcmYsZGF0X3ByZXZ6YWwscHJldnphbF9uYXpldl9yZixmaWx0cmFjZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gby5nZXRTZWxlY3Rpb24oKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybXMgPSBzZWw/LlBlcm1pc3Npb25zO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZ6aXRBY3QhLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMuTHplUHJldnppdCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9ybm9BY3QhLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMuTHplU3Rvcm5vISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZWZBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLmRpc3BhdGNoRXZlbnQoXCJncmlkZGVmYXVsdGFjdGlvbnJ1blwiLCBbY3R4LmNlbGxJbmZvLmRhdGEgYXMgR0lpc3NwSW5ib3hEdG9dKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcnBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHtzaG93RGVsaXZlcmVkOiBmYWxzZSwgc2hvd0ZhaWxlZDogZmFsc2UgfSBhcyBJR0lpc3NwSW5ib3hGaWx0ZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHSWlzc3BJbmJveER0bz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R0lpc3NwSW5ib3hEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcImlkX2luYm94X3VzZXJcIiwgY2FwdGlvbjogXCIjXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpZF9pbmJveF9leHRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDQ2XCIgfSkgLy9SQyAzMTE1MDA0NiA6IEdJTklTIGTDoXZrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2luYm94X3Jpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAwNDdcIiB9KSAvL1JDIDMxMTUwMDQ3IDogSUlTU1AgZMOhdmthXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwNDlcIiwgLy9SQyAzMTE1MDA0OSA6IFN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmZ1bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQuc3RhdHVzX2luYm94ISkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4geyBpY29uOiBcImdpLXBhcGVyXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDAzM1wiIH07IC8vUkMgMzExNTAwMzMgOiBacHJhY292w6Fuw60gZMOhdmt5IGluaWNpYWxpem92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4geyBpY29uOiBcImdpLXBhcGVyIGctc3RhdGUtdGV4dCBnLXN0YXRlLWZhdm9yaXRlXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDAzNFwiIH07IC8vUkMgMzExNTAwMzQgOiBEw6F2a2EgemHFmWF6ZW5hIGRvIGZyb250eSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIHsgaWNvbjogXCJnaS1wYXBlciBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDAzNVwiIH07IC8vUkMgMzExNTAwMzUgOiBacHJhY292w6Fuw60gZMOhdmt5IHphaMOhamVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDAzNlwiIH07IC8vUkMgMzExNTAwMzYgOiBacHJhY292w6Fuw60gZMOhdmt5IHVrb27EjWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzdcIiB9OyAvL1JDIDMxMTUwMDM3IDogWnByYWNvdsOhbsOtIGTDoXZreSB1a29uxI1lbm8gcyBjaHlib3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzhcIiB9OyAvL1JDIDMxMTUwMDM4IDogTmVwb2RhxZlpbG8gc2Ugc2VzdGF2aXQgYSBvZGVzbGF0IGTDoXZrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTA6IHJldHVybiB7IGljb246IFwiZ2ktdGljayBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDAzOVwiIH07IC8vUkMgMzExNTAwMzkgOiBacHLDoXZ5IHN0YcW+ZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyMDogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcyBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwNDBcIiB9OyAvL1JDIDMxMTUwMDQwIDogUMWZaSBwcsOhY2kgcyBkw6F2a291IGRvxaFsbyB2IEdJTklTIGsgY2h5YsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEzMDogcmV0dXJuIHsgaWNvbjogXCJmYS13aW5kb3ctY2xvc2UtbyBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwNDFcIiB9OyAvL1JDIDMxMTUwMDQxIDogS29tdW5pa2HEjW7DrSBjaHliYSBtZXppIEdJTklTIGEgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTQwOiByZXR1cm4geyBpY29uOiBcImZhLW1pbnVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDA0MlwiIH07IC8vUkMgMzExNTAwNDIgOiBOZWV4aXN0dWrDrSBkYXRhIHBybyB2w71ixJtyb3bDoSBrcml0w6lyaWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTUwOiByZXR1cm4geyBpY29uOiBcImZhLWJhblwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwNDNcIiB9OyAvL1JDIDMxMTUwMDQzIDogRMOhdmthIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW0gR0lOSVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTYwOiByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDQ0XCIgfTsgLy9SQyAzMTE1MDA0NCA6IEJ5bG8gdnnFvsOhZMOhbm8gZ2VuZXJvdsOhbsOtIG5vdsSbasWhw61obyB2w71rYXp1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3MDogcmV0dXJuIHsgaWNvbjogXCJmYS13aW5kb3ctY2xvc2UgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwNDVcIiB9OyAvL1JDIDMxMTUwMDQ1IDogQ2h5YmEgcMWZaSBnZW5lcm92w6Fuw60gc2VzdGF2eSB2w71rYXp1IHYgR0lOSVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB7IGljb246IFwiXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwiXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3N0YXZfb2RcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDUwXCIgfSkgLy9SQyAzMTE1MDA1MCA6IFN0YXYgb2RcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfc3RhdlwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAwNTFcIiB9KSAvL1JDIDMxMTUwMDUxIDogU3RhdiBrXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF91a29uY2VuaVwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAwNTJcIiB9KSAvL1JDIDMxMTUwMDUyIDogRGF0dW0gdWtvbsSNZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfemFkYWxcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDUzXCIgfSkgLy9SQyAzMTE1MDA1MyA6IERhdHVtIHZ5xb7DoWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicG9jZXRfenByYXZcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDU0XCIgfSkgLy9SQyAzMTE1MDA1NCA6IFpwcsOhdlxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInphZGFsX25hemV2X3JmXCIsIGNhcHRpb246IFwianJlczozMTE1MDA1NVwiIH0pIC8vUkMgMzExNTAwNTUgOiBWecW+w6FkYWxcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X3ByZXZ6YWxcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDU2XCIgfSkgLy9SQyAzMTE1MDA1NiA6IERhdHVtIHDFmWV2emV0w60vc3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicHJldnphbF9uYXpldl9yZlwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAwNTdcIiB9KSAvL1JDIDMxMTUwMDU3IDogUMWZZXZ6YWwvU3Rvcm5vdmFsXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZmlsdHJhY2VcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDU4XCIgfSkgLy9SQyAzMTE1MDA1OCA6IEZpbHRyYWNlXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXRvZGFfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDQ4XCIsIC8vUkMgMzExNTAwNDggOiBNZXRvZGFcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uZnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpY29uID0gXCJmYS1md1wiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQucHJpel9kZXRhaWwgPT09IDEpIGljb24gPSBcImdpLWRldGFpbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkLnByaXpfZGV0YWlsID09PSAwKSBpY29uID0gXCJnaS1zdW1hXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBpY29uLCB0ZXh0OiBkLm1ldG9kYV96a3IgKyBcIiBcIiArIChkLnN0c2tfdHlwX3prciA/IGQuc3Rza190eXBfemtyIDogXCJcIikgfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIGQuc3Rza190eXBfdHh0ID8gZC5zdHNrX3R5cF90eHQgOiBcIlwiOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREYXRhKGZpbHRlcjogSUdJaXNzcEluYm94RmlsdGVyKTogSlF1ZXJ5UHJvbWlzZTxHSWlzc3BJbmJveER0b1tdPiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLklpc3NwSW5ib3gubGlzdCh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpel92eXp2ZWRudXRvOiB7IG86IFwiPVwiLCB2OiBmaWx0ZXI/LnNob3dEZWxpdmVyZWQgPz8gZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcml6X2NoeWJuZTogICAgIHsgbzogXCI9XCIsIHY6IGZpbHRlcj8uc2hvd0ZhaWxlZCA/PyBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWRfaW5ib3hfc3NwOiAgICB7IG86IFwiSU5cIiwgdjogWzgyMiwgODIxLCA3OThdIH0gLy9OT1RFOiBha3R1YWxuZSBuZXZ5dXppdGUsIGRvcGxuaSBzZSB2IGRhbHNpbSByb3p2b2ppXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCIqXCIsIFwiUGVybWlzc2lvbnNcIl1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmFibGVkID0gISFyLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5wcmV2eml0QWN0LmVuYWJsZWQoZW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXN0b3JpZUFjdC5lbmFibGVkKGVuYWJsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JzYWhBY3QuZW5hYmxlZChlbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc3Rvcm5vQWN0LmVuYWJsZWQoZW5hYmxlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVEYXRhKHIuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIuZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLklpc3NwLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICB0eXBlIEdJaXNzcEluYm94T2JzYWhEdG8gPSBHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcEluYm94T2JzYWhEdG87XHJcbiAgICB0eXBlIEdJaXNzcEluYm94WnByYXZhRHRvID0gR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BJbmJveFpwcmF2YUR0bztcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHSW5ib3hCYXRjaENvbnRlbnRPcHRpb25zIHtcclxuICAgICAgICBpZF9pbmJveF9zc3A6IG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERsZSBUSyBHb3JkaWMuSWlzc3AuV2luQ2xpZW50LkdPYnNhaEluYm94VGFiXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgYm1hcnRpbmVrXHJcbiAgICAgKiBAc2luY2UgNDg4LjEuMC4xNlxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdJbmJveEJhdGNoQ29udGVudCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG4gICAgICAgIHVpZCA9IFwiR0luYm94SGlzdG9yeURldGFpbCNcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozMTE1MDA5NlwiOyAvL1JDIDMxMTUwMDk2IDogT2JzYWggdnN0dXBuw60gYSB2w71zdHVwbsOtIFhNTCBkw6F2a3lcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3PEdJaXNzcEluYm94T2JzYWhEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgY3Vycl92eXN0dXBfenByYXZhX2lkPzogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgY3Vycl9vYnNhaD86IEdJaXNzcEluYm94T2JzYWhEdG87XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHSW5ib3hCYXRjaENvbnRlbnRPcHRpb25zKTp2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgaWRfaW5ib3hfc3NwID0gb3B0aW9ucy5pZF9pbmJveF9zc3A7XHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAwOTdcIiwgLy9SQyAzMTE1MDA5NyA6IFNlem5hbSB6cHLDoXZcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKHRoaXMuZ3JpZCA9ICQubmV3RGl2KCkpO1xyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMxMTUwMDk4XCIsIC8vUkMgMzExNTAwOTggOiBWc3R1cFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJC5uZXdEaXYoKS5nc3RyaW5nYm94KHsgbmFtZTogXCJ2c3R1cFwiLCByb3dzOiAyMCwgZGlzYWJsZWQ6IHRydWUgfSkpO1xyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMxMTUwMDk5XCIsIC8vUkMgMzExNTAwOTkgOiBWw71zdHVwXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgkLm5ld0RpdigpLmdzdHJpbmdib3goeyBuYW1lOiBcInZ5c3R1cFwiLCByb3dzOiAyMCwgZGlzYWJsZWQ6IHRydWUgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFt7IGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImNsb3NlQWN0XCIsIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCwgcnVuOiAoKSA9PiB7IHRoaXMuY2xvc2UoKTsgfSB9KSB9XSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHSWlzc3BJbmJveFpwcmF2YUR0bz4oW10sIHsga2V5OiBcInpwcmF2YV9pZFwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQ8R0lpc3NwSW5ib3hacHJhdmFEdG8+KHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IGNvbHVtbkxpc3Q6IFwienByYXZhX2lkLGRhdF92em5payxkYXRfcHJlY3Rlbm8sc3RhdHVzX3JpcyxuYXpldix0eXBfcmlzLGRhdF96bWVuYSxkYXRfem1lbmEsem1lbnVfcHJvdl90eHRcIiB9LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R0lpc3NwSW5ib3hacHJhdmFEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwienByYXZhX2lkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDEwMFwiLCAvL1JDIDMxMTUwMTAwIDogSWQgenByw6F2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMTAxXCIsIC8vUkMgMzExNTAxMDEgOiBnZW5lcm92w6FubyB2IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMTVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6bmlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDEwMlwiLCAvL1JDIDMxMTUwMTAyIDogVnpuaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDEwM1wiLCAvL1JDIDMxMTUwMTAzIDogZGF0dW0gdnpuaWsgenByw6F2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcmVjdGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxMDRcIiwgLy9SQyAzMTE1MDEwNCA6IFDFmWXEjXRlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDEwNVwiLCAvL1JDIDMxMTUwMTA1IDogZGF0dW0gc3Rhxb5lbsOtIHpwcsOhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c19yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTA2XCIsIC8vUkMgMzExNTAxMDYgOiBTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTA3XCIsIC8vUkMgMzExNTAxMDcgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIxNVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTA4XCIsIC8vUkMgMzExNTAxMDggOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAxMDlcIiwgLy9SQyAzMTE1MDEwOSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMTEwXCIsIC8vUkMgMzExNTAxMTAgOiBabcSbbmlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMTVcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBzKSA9PiB7IHRoaXMubG9hZFZ5c3R1cChzLmdldFNlbGVjdGlvbihmYWxzZSlbMF0pOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcEluYm94LmluYm94T2JzYWgoeyBpZF9pbmJveF9zc3A6IGlkX2luYm94X3NzcCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3Vycl92eXN0dXBfenByYXZhX2lkID0gZGF0YS52eXN0dXBfenByYXZhX2lkID8/IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJfb2JzYWggPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnpwcmF2eSAmJiBkYXRhLnpwcmF2eS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnVwZGF0ZURhdGEoZGF0YS56cHJhdnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdGhpcy5jdXJyX3Z5c3R1cF96cHJhdmFfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhkYXRhLnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFN0YXR1cyhzdGF0dXM/OiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0SWNvbiA9IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgbGV0IGNhcHRpb24gPSBcImpyZXM6MzExNTAwOTVcIjsgLy9SQyAzMTE1MDA5NSA6IMOac3DEm2NoXHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRJY29uID0gXCJmYS10aW1lcy1jaXJjbGUgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbiA9IFwianJlczozMTE1MDA5M1wiOyAvL1JDIDMxMTUwMDkzIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJXXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdEljb24gPSBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uID0gXCJqcmVzOjMxMTUwMDk0XCIgLy9SQyAzMTE1MDA5NCA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIklcIjpcclxuICAgICAgICAgICAgICAgICAgICBzdGF0SWNvbiA9IFwiZmEtaW5mby1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb24gPSBcImpyZXM6MzExNTAxMTJcIjsgLy9SQyAzMTE1MDExMiA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyKFt7IHR5cGU6IFwic3RhdGljXCIsIGljb246IHN0YXRJY29uLCBjYXB0aW9uOiBjYXB0aW9uIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZFZ5c3R1cCh6PzogR0lpc3NwSW5ib3hacHJhdmFEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCF6ICYmICF0aGlzLmN1cnJfdnlzdHVwX3pwcmF2YV9pZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlIGlmICgheikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmN1cnJfb2JzYWgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHouenByYXZhX2lkID09PSB0aGlzLmN1cnJfdnlzdHVwX3pwcmF2YV9pZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcEluYm94LmluYm94WnByYXZhVnlzdHVwKHsgenByYXZhX2lkOiB6LnpwcmF2YV9pZCEgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3Vycl92eXN0dXBfenByYXZhX2lkID0gZGF0YS56cHJhdmFfaWQhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGRhdGEuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgdHlwZSBHSWlzc3BJbmJveEhpc3RvcmllRHRvID0gR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BJbmJveEhpc3RvcmllRHRvO1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdJbmJveEhpc3RvcnlPcHRpb25zIHtcclxuICAgICAgICBpZF9pbmJveF9zc3A6IG51bWJlcjtcclxuICAgICAgICBpZF9pbmJveF91c2VyPzogbnVtYmVyO1xyXG4gICAgICAgIHR5cDogXCJpbmJveFwiIHwgXCJ2eWthelwiO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0luYm94SGlzdG9yeSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG4gICAgICAgIHVpZCA9IFwiR0lpc3NwSW5ib3hIaXN0b3J5I1wiO1xyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMxMTUwMDU5XCI7IC8vUkMgMzExNTAwNTkgOiBTdGF2IHZvbMOhbsOtIEluYm94IElJU1NQXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldzxHSWlzc3BJbmJveEhpc3RvcmllRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJR0luYm94SGlzdG9yeU9wdGlvbnM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsQWN0OiBHQWN0aW9uO1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChvcHRpb25zOiBJR0luYm94SGlzdG9yeU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAob3B0aW9ucy50eXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJpbmJveFwiOiB0aGlzLnRpdGxlID0gXCJqcmVzOjMxMTUwMDc0XCIuZm9ybWF0KG9wdGlvbnMuaWRfaW5ib3hfc3NwKTsgYnJlYWs7IC8vUkMgMzExNTAwNzQgOiBIaXN0b3JpZSB2b2zDoW7DrSBJSVNTUCB2IHLDoW1jaSBpbmJveCBkw6F2a3kgaWQgezB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidnlrYXpcIjogdGhpcy50aXRsZSA9IFwianJlczozMTE1MDA3NVwiLmZvcm1hdChvcHRpb25zLmlkX2luYm94X3VzZXIgPz8gb3B0aW9ucy5pZF9pbmJveF9zc3ApOyBicmVhazsgLy9SQyAzMTE1MDA3NSA6IEhpc3RvcmllIHZvbMOhbsOtIElJU1NQIHYgcsOhbWNpIFbDvWthenUgaWQgezB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgR0Vycm9yKFwibm90U3VwcG9ydGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvYnNhaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA4OVwiLCAvL1JDIDMxMTUwMDg5IDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHSWlzc3BJbmJveEhpc3RvcmllRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR0luYm94SGlzdG9yeURldGFpbCwgeyBpZF92b2xhbmlfc3NwOiBzZWwuaWRfdm9sYW5pX3NzcCB9IGFzIElHSW5ib3hIaXN0b3J5RGV0YWlsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFt7IGFjdGlvbjogdGhpcy5kZXRhaWxBY3QsIGZhdm9yaXRlOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdJaXNzcEluYm94SGlzdG9yaWVEdG8+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdJaXNzcEluYm94SGlzdG9yaWVEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5kZXRhaWxBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgY29sdW1uTGlzdDogXCJpZF92b2xhbmlfc3NwLGRhdF9zdGFydCxtZXRvZGFfaWlzc3BfdHh0LHZ5c2xfdm9sYW5pX3R4dCx0eXBfaGxhc2VuaSx0ZXh0X2hsYXNlbmkscG96bmFta2Esem1lbnVfcHJvdl90eHRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdJaXNzcEluYm94SGlzdG9yaWVEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwiaWRfdm9sYW5pX3NzcFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAwNzZcIiwgd2lkdGg6IDUwIH0pIC8vUkMgMzExNTAwNzYgOiBpZCB2b2zDoW7DrSBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3RhcnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA3N1wiLCAvL1JDIDMxMTUwMDc3IDogRGF0dW0gdm9sw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAwNzhcIiwgLy9SQyAzMTE1MDA3OCA6IGRhdHVtIGEgxI1hcyB2b2zDoW7DrSBtZXRvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXRvZGFfaWlzc3BfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwNzlcIiwgLy9SQyAzMTE1MDA3OSA6IE1ldG9kYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDA4MFwiLCAvL1JDIDMxMTUwMDgwIDogdm9sYW7DoSBJSVNTUCBtZXRvZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IG9wdGlvbnMudHlwID09PSBcImluYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eXNsX3ZvbGFuaV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA4MVwiLCAvL1JDIDMxMTUwMDgxIDogVsO9c2xlZGVrIHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2hsYXNlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA4MlwiLCAvL1JDIDMxMTUwMDgyIDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMDg0XCIsIC8vUkMgMzExNTAwODQgOiBobMOhxaFlbsOtIHogSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQudHlwX2hsYXNlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklcIjogcmV0dXJuIHsgaWNvbjogXCJmYS1pbmZvLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsIHRleHQ6IFwianJlczozMTE1MDExMlwiIH07IC8vUkMgMzExNTAxMTIgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIldcIjogcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMTE1MDA5NFwiIH07IC8vUkMgMzExNTAwOTQgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVcIjogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMTE1MDA5M1wiIH07IC8vUkMgMzExNTAwOTMgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXh0X2hsYXNlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA4M1wiLCAvL1JDIDMxMTUwMDgzIDogVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDA4NVwiLCAvL1JDIDMxMTUwMDg1IDogaGzDocWhZW7DrSB6IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA4NlwiLCAvL1JDIDMxMTUwMDg2IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjgwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA4N1wiLCAvL1JDIDMxMTUwMDg3IDogUHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDA4OFwiLCAvL1JDIDMxMTUwMDg4IDogdm9sw6Fuw60gcHJvdmVkZW5vIHXFvml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwSW5ib3guaGlzdG9yaWUoeyBmaWx0ZXJzOiB7IGlkX2luYm94X3NzcDogdGhpcy5vcHRpb25zLmlkX2luYm94X3NzcCB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7IHRoaXMudmlldy51cGRhdGVEYXRhKHIuZGF0YSk7IHRoaXMuZGV0YWlsQWN0LmVuYWJsZWQoISFyLmRhdGEubGVuZ3RoKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhpcy5lbmRPcGVyYXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0luYm94SGlzdG9yeURldGFpbE9wdGlvbnMge1xyXG4gICAgICAgIGlkX3ZvbGFuaV9zc3A6IG51bWJlcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEbGUgVEsgR29yZGljLklpc3NwLldpbkNsaWVudC5HSW5ib3hIaXN0b3JpZU9ic2FoVGFiXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgYm1hcnRpbmVrXHJcbiAgICAgKiBAc2luY2UgNDg4LjEuMC4xNlxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdJbmJveEhpc3RvcnlEZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG5cclxuICAgICAgICB1aWQgPSBcIkdJbmJveEhpc3RvcnlEZXRhaWwjXCI7XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHSW5ib3hIaXN0b3J5RGV0YWlsT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBpZF92b2xhbmlfc3NwID0gb3B0aW9ucy5pZF92b2xhbmlfc3NwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMTE1MDA5MFwiLmZvcm1hdChpZF92b2xhbmlfc3NwKTsgLy9SQyAzMTE1MDA5MCA6IFZzdHVwbsOtIGEgdsO9c3R1cG7DrSBYTUwgcHJvIHZvbMOhbsOtIElJU1NQIGlkIHswfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaW5wdXRUYWIgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMxMTUwMDkxXCIsIC8vUkMgMzExNTAwOTEgOiBWc3R1cFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJC5uZXdEaXYoKS5nc3RyaW5nYm94KHsgbmFtZTogXCJ2c3R1cFwiLCByb3dzOiAyMCwgZGlzYWJsZWQ6IHRydWUgfSkpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0VGFiID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDA5MlwiLCAvL1JDIDMxMTUwMDkyIDogVsO9c3R1cFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJC5uZXdEaXYoKS5nc3RyaW5nYm94KHsgbmFtZTogXCJ2eXN0dXBcIiwgcm93czogMjAsIGRpc2FibGVkOiB0cnVlIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbeyBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogXCJjbG9zZUFjdFwiLCBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsIHJ1bjogKCkgPT4geyB0aGlzLmNsb3NlKCk7IH0gfSkgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcEluYm94Lmhpc3RvcmllT2JzYWgoeyBpZF92b2xhbmlfc3NwOiBpZF92b2xhbmlfc3NwIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IHIuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdEljb24gPSBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb24gPSBcImpyZXM6MzExNTAwOTVcIjsgLy9SQyAzMTE1MDA5NSA6IMOac3DEm2NoXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdEljb24gPSBcImZhLXRpbWVzLWNpcmNsZSAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb24gPSBcImpyZXM6MzExNTAwOTNcIjsgLy9SQyAzMTE1MDA5MyA6IENoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIldcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRJY29uID0gXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uID0gXCJqcmVzOjMxMTUwMDk0XCIgLy9SQyAzMTE1MDA5NCA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyKFt7IHR5cGU6IFwic3RhdGljXCIsIGljb246IHN0YXRJY29uLCBjYXB0aW9uOiBjYXB0aW9uIH1dKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scy5HU3RydWt0dXJhSUlTU1AudHMgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHNlIHN0cnVrdHVyb3UgSUlTU1AgKHBybyBTTUwwNSwgRlVDMDUsID8pICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA5LTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcbiAgICAvKipDb250ZW50IHNlIHN0cnVrdHVyb3UgSUlTU1AgKHBybyBTTUwwNSwgRlVDMDUsID8pICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTdHJ1a3R1cmFJSVNTUCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqSWRlbnRpZmlrw6F0b3IgKi9cclxuICAgICAgICBwdWJsaWMgaXhzX2hwcjogc3RyaW5nO1xyXG5cclxuICAgICAgICAvL0NvbnRlbnRWYWx1ZXNcclxuICAgICAgICAvKiogRGF0YSAqL1xyXG4gICAgICAgIHByaXZhdGUgZGF0YTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BEdG87XHJcbiAgICAgICAgLyoqIFJlZmVyZW50ICovXHJcbiAgICAgICAgcHJpdmF0ZSBpeHNfcmVmOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEnEjE8gKi9cclxuICAgICAgICBwcml2YXRlIGljbzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBVQ1MgKi9cclxuICAgICAgICBwcml2YXRlIHVjczogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sgKi9cclxuICAgICAgICBwcml2YXRlIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBEQiBwYXJhbWV0ciAtIEVLTyDigJMgxZhQIFpqacWhdMSbbsOtIHN0YXZ1IMSNZXJww6Fuw60gcmV6ZXJ2YWNlIHYgSUlTU1AqL1xyXG4gICAgICAgIHByaXZhdGUgZWtvX3JhZF9paXNzcGNzOiBudW1iZXI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RIaXN0b3JpZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAwMlwiLCAvL1JDIDMzNjAwMDAyIDogSGlzdG9yaWVcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lm5hdmlnYXRlKFtHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0lpc3NwUmV6V3NDYWxsSGlzdG9yeSwgeyB1aWQ6IFwiR0lpc3NwUmV6V3NDYWxsSGlzdG9yeSNcIiB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2hwcjogdGhhdC5peHNfaHByXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3Zlcml0U3Rhdjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAwM1wiLCAvL1JDIDMzNjAwMDAzIDogT3bEm8WZaXQgc3RhdlxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuZGF0YS5QZXJtaXNzaW9ucz8uTHplT3Zlcml0U3RhdixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmVrb19yYWRfaWlzc3BjcyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zOiBHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuSUdJaXNzcFJlekRldGFpbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2hwcjogdGhhdC5peHNfaHByISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfcmVmOiB0aGF0Lml4c19yZWYhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5pY28hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC51Y3MhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5yb2shLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbGF0V2ViU2x1emJ1OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lm5hdmlnYXRlKFtHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0lpc3NwUmV6RGV0YWlsLCB7IHVpZDogXCJHSWlzc3BSZXpEZXRhaWwjXCIgfV0sIG9wdGlvbnMpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcInN0cnVrdHVyYUlpc3NwQWN0aXZlT3BcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5la29fcmFkX2lpc3NwY3MgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLklpc3NwLldlYkNvbnRyb2xzLklHSWlzc3BSZXpEZXRhaWxFeHRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19ocHI6IHRoYXQuaXhzX2hwciEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3JlZjogdGhhdC5peHNfcmVmISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuaWNvISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQudWNzISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQucm9rISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2xhdFdlYlNsdXpidTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5uYXZpZ2F0ZShbR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdJaXNzcFJlekRldGFpbEV4dCwgeyB1aWQ6IFwiR0lpc3NwUmV6RGV0YWlsRXh0I1wiIH1dLCBvcHRpb25zKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJzdHJ1a3R1cmFJaXNzcEFjdGl2ZU9wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByaXByYXZhU1A6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMDRcIiwgLy9SQyAzMzYwMDAwNCA6IFDFmcOtcHJhdmEgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLmRhdGEuUGVybWlzc2lvbnM/Lkx6ZVByaXByYXZhU1AsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoR29yZGljLkd1aS5EaWFsb2dzLkdFeHBlcnRNb2RlRGxnKHsgcGFyZW50Q29udGVudDogdGhhdCwgb3B0OiB7IGxldmVsRXhwOiAzMTEgfSwgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8/Lml4eEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuU3RydWt0dXJhSUlTU1BFa28ucHJpcHJhdml0U1AoeyBkYXRhOiB7IGl4c19ocHI6IHRoYXQuaXhzX2hwciB9IH0pLmdldCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJzdHJ1a3R1cmFJaXNzcEFjdGl2ZU9wXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0SGlzdG9yaWUqXCIsIFwiYWN0T3Zlcml0U3RhdipcIiwgXCJhY3RQcmlwcmF2YVNQKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIilcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDAwNVwiKSAvL1JDIDMzNjAwMDA1IDogUmV6ZXJ2YcSNbsOtIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJndGFibGVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFN0cnVrdHVyYUlJU1NQUG9sb3preVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdFByaXBhZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUmV6UHJpcGFkRHRvPigodGhpcy5kYXRhLnByaXBhZCkgPyBbdGhpcy5kYXRhLnByaXBhZF0gOiBbXSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM2MDAwMDZcIikgLy9SQyAzMzYwMDAwNiA6IFN0cnVrdHVyYSB2IElJU1NQXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkU3RydWt0dXJhSUlTU1BQb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0U3RydWt0dXJhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXc8RWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvPih0aGlzLmRhdGEucG9sb3preSA/PyBbXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4c19ocHJcIiwgXCJyYWRla19naW5cIiwgXCJzdWJyYWRla19naW5cIl1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIERlZmluaWNlIGdyaWRmb3Jtw6F0dSBzdHJ1a3R1cnkgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXRTdHJ1a3R1cmEoKTogRGF0YS5HcmlkRm9ybWF0PEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0b05hbWVzLnJvayxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAwN1wiLCAvL1JDIDMzNjAwMDA3IDogUm9rXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0b05hbWVzLnJhZGVrX2hkcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMuc19yZXpzcF90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMDhcIiwgLy9SQyAzMzYwMDAwOCA6IFN0YXZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0b05hbWVzLmlzcF9rYXAsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMDlcIiwgLy9SQyAzMzYwMDAwOSA6IEtBUFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ1XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMuaXNwX2ZpbSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAxMFwiLCAvL1JDIDMzNjAwMDEwIDogRklNXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5pc3BfcG9sLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDExXCIsIC8vUkMgMzM2MDAwMTEgOiBSUE9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0b05hbWVzLmlzcF9wYXIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTJcIiwgLy9SQyAzMzYwMDAxMiA6IFBBUlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMuaXNwX3pkcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAxM1wiLCAvL1JDIDMzNjAwMDEzIDogWkRSXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5pc3BfZWRzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDE0XCIsIC8vUkMgMzM2MDAwMTQgOiBFRFNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0b05hbWVzLmlzcF91Y2wsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTVcIiwgLy9SQyAzMzYwMDAxNSA6IFVDTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMuaXNwX3B2cyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAxNlwiLCAvL1JDIDMzNjAwMDE2IDogUFZTXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5pc3BfemosXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTdcIiwgLy9SQyAzMzYwMDAxNyA6IFpKXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5pc3BfdWosXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMThcIiwgLy9SQyAzMzYwMDAxOCA6IFVKXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5pc3BfdXosXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTlcIiwgLy9SQyAzMzYwMDAxOSA6IFVaXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMuY19yc3AsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMjBcIiAvL1JDIDMzNjAwMDIwIDogxIzDoXN0a2FcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5pZF9oZHIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMjFcIiwgLy9SQyAzMzYwMDAyMSA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUG9sb3prYUR0b05hbWVzLnJhZGVrX2hkcl9yaXMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMjJcIiwgLy9SQyAzMzYwMDAyMiA6IMWYw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMucmFkZWtfaGRyLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDIzXCIsIC8vUkMgMzM2MDAwMjMgOiDFmMOhZGVrIEhEUlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BQb2xvemthRHRvTmFtZXMuZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAyNFwiIC8vUkMgMzM2MDAwMjQgOiBTcGxhdG5vc3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFBvbG96a2FEdG9OYW1lcy5wb3BpcyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAyNVwiLCAvL1JDIDMzNjAwMDI1IDogUG9waXNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgcmV6ZXJ2YcSNbsOtaG8gcMWZw61wYWR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0UHJpcGFkKCk6IERhdGEuR3JpZEZvcm1hdDxFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFJlelByaXBhZER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUmV6UHJpcGFkRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BSZXpQcmlwYWREdG9OYW1lcy5wb2NldCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAyNlwiLCAvL1JDIDMzNjAwMDI2IDogQ2Vsa2VtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFJlelByaXBhZER0b05hbWVzLnByaXByYXZlbm8sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMjdcIiwgLy9SQyAzMzYwMDAyNyA6IFDFmWlwcmF2ZW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFJlelByaXBhZER0b05hbWVzLm9kZXNsYW5vLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDI4XCIsIC8vUkMgMzM2MDAwMjggOiBPZGVzbMOhbm9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUmV6UHJpcGFkRHRvTmFtZXMuc2NodmFsZW5vLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDI5XCIsIC8vUkMgMzM2MDAwMjkgOiBTY2h2w6FsZW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBFa28uSW50ZXJmYWNlLkdTdHJ1a3R1cmFJSVNTUFJlelByaXBhZER0b05hbWVzLnNjaHZhbGVub192eWgsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMzBcIiwgLy9SQyAzMzYwMDAzMCA6IFNjaHbDoWxlbm8gcyB2w71ocmFkb3VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEVrby5JbnRlcmZhY2UuR1N0cnVrdHVyYUlJU1NQUmV6UHJpcGFkRHRvTmFtZXMuemFtaXRudXRvLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDMxXCIsIC8vUkMgMzM2MDAwMzEgOiBaYW3DrXRudXRvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogRWtvLkludGVyZmFjZS5HU3RydWt0dXJhSUlTU1BSZXpQcmlwYWREdG9OYW1lcy5zdGF2X3ByaXBhZHUsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMzJcIiwgLy9SQyAzMzYwMDAzMiA6IFN0YXZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgR29yZGljLklpc3NwLldlYkNvbnRyb2xzIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHU3Rza1BvaHlieU9wdGlvbnMge1xyXG4gICAgICAgIGlkX3ZvbGFuaV9zc3A6IG51bWJlcjtcclxuICAgICAgICByYWRla19pazogbnVtYmVyO1xyXG4gICAgICAgIHJhZGVrX3BvbDogbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU3Rza1BvaHlieSBleHRlbmRzIEdDb250ZW50IGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzExNTAyNThcIjsgLy9SQyAzMTE1MDI1OCA6IFNlem5hbSB2xaFlY2ggcG9oeWLFryB6YSB2eWJyYW7DqSBvYmRvYsOtIGsgcG9sb8W+Y2UgcmV6ZXJ2YWNlXHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHU3Rza1BvaHlieU9wdGlvbnMpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwSW5ib3hQb2h5YnlQb2xvemt5UmV6ZXJ2YWNlRHRvPihbXSwgeyBrZXk6IFwiaWRfdm9sYW5pX3NzcCxyYWRla19payxyYWRla19wb2xcIn0pXHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwSW5ib3gucG9oeWJ5UG9sb3preVJlemVydmFjZUxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkX3ZvbGFuaV9zc3A6IG9wdGlvbnMuaWRfdm9sYW5pX3NzcCxcclxuICAgICAgICAgICAgICAgICAgICByYWRla19pazogb3B0aW9ucy5yYWRla19payxcclxuICAgICAgICAgICAgICAgICAgICByYWRla19wb2w6IG9wdGlvbnMucmFkZWtfcG9sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+IHsgdmlldy51cGRhdGVEYXRhKGQpOyB9KTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BJbmJveFBvaHlieVBvbG96a3lSZXplcnZhY2VEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3BvaHliXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAyNTlcIiwgLy9SQyAzMTE1MDI1OSA6IFBvxZlhZMOtIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfZG9rbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyNjFcIiwgLy9SQyAzMTE1MDI2MSA6IElkIHYgSUlTU1AgUklTUkVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAyNjBcIiwgLy9SQyAzMTE1MDI2MCA6IFVuaWvDoXRuw60gaWQgdiBJSVNTUCBSSVNSRSBqZWRub2hvIHBvaHlidS4gSG9kbm90YSByZXByZXplbnR1amUgxI3DrXNsbyBhIHBvbG/Fvmt1IMO6xI1ldG7DrWhvIGRva2xhZHUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb2tsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDI2MlwiLCAvL1JDIDMxMTUwMjYyIDogVnl0dm/FmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAyNjNcIiwgLy9SQyAzMTE1MDI2MyA6IERhdHVtIHZ5dHZvxZllbsOtIHBvaHlidSB2IERCIElJU1NQIFJJU1JFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcmFkX2lpc3NwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyNjRcIiwgLy9SQyAzMTE1MDI2NCA6IMSMZXJww6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAyNjVcIiwgLy9SQyAzMTE1MDI2NSA6IFJvemhvZG7DqSBkYXR1bSDEjWVycMOhbsOtIHJvenBvxI10dSAoZGF0dW0gYWt0dWFsaXphY2Ugcm96cG/EjXR1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcGxhdGJhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyNjZcIiwgLy9SQyAzMTE1MDI2NiA6IFDFmcOta2F6IGsgcGxhdGLEm1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFfY19wbGF0YmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDI2N1wiLCAvL1JDIDMxMTUwMjY3IDogTcSbbmEgcMWZw61rYXp1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMjY4XCIsIC8vUkMgMzExNTAyNjggOiBNxJtuYSBwxZnDrWthenUgayBwbGF0YsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19idnlwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDI2OVwiLCAvL1JDIDMxMTUwMjY5IDogQmFuay4gdsO9cGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVuYV9jX2J2eXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjcwXCIsIC8vUkMgMzExNTAyNzAgOiBNxJtuYSBCVlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQmFuay4gdsO9cGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDI3MVwiLCAvL1JDIDMxMTUwMjcxIDogUFNLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMjcyXCIsIC8vUkMgMzExNTAyNzIgOiBQxZllw7rEjXRvdsOhbsOtIHNrdXRlxI1ub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFfY19wc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDI3M1wiLCAvL1JDIDMxMTUwMjczIDogTcSbbmEgUFNLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbG9zZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR1Z5a2F6eU9wdGlvbnMge1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG4gICAgICAgIHVjczogc3RyaW5nO1xyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG4gICAgICAgIGZpbTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHVnlrYXp5IGV4dGVuZHMgR0NvbnRlbnQgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG5cclxuICAgICAgICB1aWQgPSBcIkdJaXNzcFZ5a2F6eSNcIjtcclxuICAgICAgICB0aXRsZSA9IFwianJlczozMTE1MDI3OFwiOyAvL1JDIDMxMTUwMjc4IDogVsO9a2F6eSBJSVNTUCAtIHBvdXplIHByb2hsw63FvmVuw61cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zPzogSUdWeWthenlPcHRpb25zO1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6RHRvPjtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcnBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdWeWthenlPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEJhcnNcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnZW5BY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyNzlcIiwgLy9SQyAzMTE1MDI3OSA6IEdlbmVyb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNDQ1MDAwNlwiLCAvL1JDIDI0NDUwMDA2IDogUG9kbGUgZmlsdHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMuZ2VuZXJhdGUoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5ld0dlbkFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDI4MFwiLCAvL1JDIDMxMTUwMjgwIDogR2VuLiBub3bDvVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNDQ1MDAwNVwiLCAvL1JDIDI0NDUwMDA1IDogUG9kbGUgYWt0dcOhbG7DrWhvIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwVnlrYXpEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsKSB0aGlzLmdlbmVyYXRlTmV3KHNlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZXZ6aXRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwNjBcIiwgLy9SQyAzMTE1MDA2MCA6IFDFmWV2esOtdFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogXCJpZF9pbmJveF9zc3BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDA2NlwiLCAvL1JDIDMxMTUwMDY2IDogUMWZZXZ6ZXTDrSB6cHLDoXYgeiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogc2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV1bXCJ3aXpfY2hlY2tcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoeyByZXN1bHQ6IGRhdGEgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMxMTUwMDY3XCIsIC8vUkMgMzExNTAwNjcgOiBLb250cm9sYSB6w6F6bmFtxa8gayBwxZlldnpldMOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwianJlczozMTE1MDA2OFwiLCAvL1JDIDMxMTUwMDY4IDogUMWZZXZ6w610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcEluYm94LnByZXZ6aXRacHJhdnlIcm9tYWRuZUNvbW1pdCh7IGlkX2luYm94X3NzcF9ncm91cDogZGF0YS5tYXAoZCA9PiBkLmlkX2luYm94X3NzcCEpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcEluYm94RHRvPihyZXMpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMxMTUwMDY5XCIsIC8vUkMgMzExNTAwNjkgOiBWw71zbGVkZWsgcMWZZXZ6ZXTDrSB6cHLDoXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4geyB0aGlzLmFjdGlvbnNbXCJyZWZyZXNoQWN0XCJdIS5ydW4oKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BJbmJveER0bz4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoaXN0b3JpZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA2MVwiLCAvL1JDIDMxMTUwMDYxIDogSGlzdG9yaWVcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKEdJbmJveEhpc3RvcnksIHsgaWRfaW5ib3hfc3NwOiBzZWxbMF0uaWRfaW5ib3hfc3NwISwgdHlwOiBcImluYm94XCIgfSBhcyBJR0luYm94SGlzdG9yeU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvYnNhaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA2MlwiLCAvL1JDIDMxMTUwMDYyIDogT2JzYWhcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKEdJbmJveEJhdGNoQ29udGVudCwgeyBpZF9pbmJveF9zc3A6IHNlbFswXS5pZF9pbmJveF9zc3AhLCB0eXA6IFwiaW5ib3hcIiB9IGFzIElHSW5ib3hCYXRjaENvbnRlbnRPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVmcmVzaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDA2NVwiLCAvL1JDIDMxMTUwMDY1IDogT2LEjWVyc3R2aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldikgPT4geyB0aGlzLmZpbHRlcnBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rvcm5vQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzYyXCIsIC8vUkMgMzExNTAzNjIgOiBTdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IFwiaWRfaW5ib3hfc3NwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzExNTAwNzBcIiwgLy9SQyAzMTE1MDA3MCA6IFN0b3JubyB6cHLDoXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldW1wid2l6X2NoZWNrXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgcmVzdWx0OiBkYXRhIH0pLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMTE1MDA3MVwiLCAvL1JDIDMxMTUwMDcxIDogS29udHJvbGEgesOhem5hbcWvIGtlIHN0b3JudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcImpyZXM6MzExNTAwNzJcIiwgLy9SQyAzMTE1MDA3MiA6IFN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BJbmJveC5zdG9ybnVqSHJvbWFkbmUoeyBpZF9pbmJveF9zc3BfZ3JvdXA6IGRhdGEubWFwKGQgPT4gZC5pZF9pbmJveF9zc3AhKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BJbmJveER0bz4ocmVzKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMTE1MDA3M1wiLCAvL1JDIDMxMTUwMDczIDogVsO9c2xlZGVrIHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7IHRoaXMuYWN0aW9uc1tcInJlZnJlc2hBY3RcIl0/LnJ1bigpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcEluYm94RHRvPik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcm92bmF0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDAyXCIsIC8vUkMgMjQ0NTAwMDIgOiBQb3Jvdm5hdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNDQ1MDAwM1wiLCAvL1JDIDI0NDUwMDAzIDogUG9yb3ZuYXQgR0lOSVMgeCBJSVNTUCB2w71rYXpcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwVnlrYXoucG9yb3ZuZWpDb21taXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkX2luYm94X3NzcDogc2VsLmlkX2luYm94X3NzcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyZXMucmVzdWx0Py5kYXRhPy5wb2NldF9yb3pkaWx1ID8/IC0xKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcImpyZXM6MjQ0NTAwMDdcIi5mb3JtYXQocmVzLnJlc3VsdD8uZGF0YT8uaWRfaW5ib3hfZXh0ID8/IFwiLVwiKSk7Ly9SQyAyNDQ1MDAwNyA6IFByb2LEm2hsbyBwb3Jvdm7DoW7DrSB2w71rYXp1IHswfSwgdsO9a2F6eSBqc291IHNob2Ruw6kuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcImpyZXM6MzExNTAzNTdcIi5mb3JtYXQocmVzLnJlc3VsdD8uZGF0YT8uaWRfaW5ib3hfZXh0ID8/IFwiLVwiLCByZXMucmVzdWx0Py5kYXRhPy5wb2NldF9yb3pkaWx1Py50b1N0cmluZygpKSk7Ly9SQyAzMTE1MDM1NyA6IFByb2LEm2hsbyBwb3Jvdm7DoW7DrSB2w71rYXp1IHswfSwgcG/EjWV0IHJvemTDrWzFrzogezF9LCBwb2Ryb2Jub3N0aSB0bC4gWm9icmF6aXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcInJlZnJlc2hBY3RcIl0/LnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpvYnJheml0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzEzXCIsIC8vUkMgMzExNTAzMTMgOiBab2JyYXppdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMTE1MDMxNFwiLCAvL1JDIDMxMTUwMzE0IDogWm9icmF6aXQgcG9yb3Zuw6Fuw60gdsO9a2F6dSAoamUgbW/Fvm7DqSBwb3V6ZSB1IHZhbGlkbsOtY2ggZGF0KVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6RHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoR1Z5a2F6eVBvcm92bmFuaSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiBzZWwucm9rISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljX2RvOiBzZWwubWVzaWNfZG8hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNwX2ZpbTogc2VsLmlzcF9maW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eWthel90eXBfaWlzc3A6IHNlbC52eWthel90eXBfaWlzc3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfemFkYWw6IHNlbC5kYXRfemFkYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2NldF9yb3pkaWx1OiBzZWwucG9jZXRfcm96ZGlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIElHVnlrYXp5UG9yb3ZuYW5pT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuQWN0KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJldnppdEFjdCpcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhpc3RvcmllQWN0KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwib2JzYWhBY3QqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWZyZXNoQWN0KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3Rvcm5vQWN0KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicG9yb3ZuYXRBY3QqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ6b2JyYXppdEFjdCpcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm5ld0dlbkFjdCpcIixcclxuICAgICAgICAgICAgICAgIF0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJwYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFt0aGlzLmNyZWF0ZUZvcm0ob3B0aW9ucywgXCJmaWx0ZXJcIildLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWRTaW1wbGVNb2RlOiBcImlpc3NwVnlrYXp5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJpc3BfZmltXCIsIFwicm9rXCIsIFwibWVzaWNfZG9cIiwgXCJ2eWthelwiLCBcInByaXpfdnl6dmVkbnV0b1wiLCBcInByaXpfY2h5Ym5lXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXYsIG8pID0+IHsgdGhpcy5sb2FkRGF0YShvLmZpbHRlcik7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4oW10sIHsga2V5OiBcImlkX2luYm94X3NzcFwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBvLmdldFNlbGVjdGlvbigpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtcyA9IHNlbD8uUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImhpc3RvcmllQWN0XCJdIS5lbmFibGVkKCEhc2VsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wib2JzYWhBY3RcIl0hLmVuYWJsZWQoISFzZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJwcmV2eml0QWN0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zLkx6ZVByZXZ6aXQhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcInN0b3Jub0FjdFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtcy5MemVTdG9ybm92YXQhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcInBvcm92bmF0QWN0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zLkx6ZVBvcm92bmF0ISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJ6b2JyYXppdEFjdFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtcy5MemVab2JyYXppdCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wibmV3R2VuQWN0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zLkx6ZUdlbmVyb3ZhdE5ldyEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwVnlrYXoucmVhZEx6ZUdlbmVyb3ZhdCh7fSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbHplR2VuZXJvdmF0ID0gZC5QZXJtaXNzaW9ucz8uTHplR2VuZXJvdmF0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsemVHZW5lcm92YXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IGx6ZUdlbmVyb3ZhdC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MzExNTAyNzdcIiAgLy9SQyAzMTE1MDI3NyA6IFbDvWthenkgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjMxMTUwMjc4XCI7IC8vUkMgMzExNTAyNzggOiBWw71rYXp5IElJU1NQIC0gcG91emUgcHJvaGzDrcW+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJnZW5BY3RcIl0/LnVwZGF0ZVBlcm1pc3Npb24obHplR2VuZXJvdmF0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJwYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB7IGlzcF9maW06IG9wdGlvbnMuZmltLCByb2s6IG9wdGlvbnMucm9rIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGF0YShvOiBJR0Zvcm1EdG8pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BWeWthei5saXN0KHsgZmlsdGVyczogbyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1zID0gZC5zZXJ2aWNlUGVybWlzc2lvbnMgYXMgR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthelBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJwcmV2eml0QWN0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zLkx6ZVByZXZ6aXQhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wic3Rvcm5vQWN0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zLkx6ZVN0b3Jub3ZhdCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJwb3Jvdm5hdEFjdFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtcy5MemVQb3Jvdm5hdCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJ6b2JyYXppdEFjdFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtcy5MemVab2JyYXppdCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJuZXdHZW5BY3RcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMuTHplR2VuZXJvdmF0TmV3ISk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVEYXRhKGQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKG9wdGlvbnM6IElHVnlrYXp5T3B0aW9ucywgbW9kZTogXCJmaWx0ZXJcIiB8IFwiZGlhbG9nXCIpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAyODFcIikgLy9SQyAzMTE1MDI4MSA6IEZJTVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXNwX2ZpbVwiLCBkaXNhYmxlZDogdHJ1ZSwgZGVmYXVsdFZhbHVlOiBvcHRpb25zLmZpbSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAyODJcIikgLy9SQyAzMTE1MDI4MiA6IFJva1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwicm9rXCIsIGRpc2FibGVkOiB0cnVlLCBkZWZhdWx0VmFsdWU6IG9wdGlvbnMucm9rIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDI4M1wiKSAvL1JDIDMxMTUwMjgzIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY19kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdFZhbHVlOiBtb2RlID09PSBcImZpbHRlclwiID8gdW5kZWZpbmVkIDogbmV3IERhdGUoKS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBtb2RlID09PSBcImZpbHRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAxMiB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDEyIH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTE1MDI4NFwiKSAvL1JDIDMxMTUwMjg0IDogVsO9a2F6XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5a2F6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudnlrYXpfdHlwPXZhbHVlLnZ5a2F6X3R5cDttb2RlbC52eWthel90eXBfaWlzc3A9dmFsdWUudnlrYXpfdHlwX2lpc3NwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt2eWthel90eXBfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBtb2RlID09PSBcImZpbHRlclwiID8gW10gOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuaXNsLklpc3NwVnlrYXoubGlzdFR5cCh7IGZpbHRlcnM6IHsgcm9rOiBvcHRpb25zLnJvayB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRWaWV3KCkudGhlbigodikgPT4geyByZXR1cm4gdjsgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMTE1MDMxMVwiLCBjdXN0b21DbGFzczogbW9kZSA9PT0gXCJmaWx0ZXJcIiA/IFwiXCIgOiBcImhpZGRlblwiIH0pIC8vUkMgMzExNTAzMTEgOiBab2JyYXppdCB2eXp2ZWRudXTDqVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfdnl6dmVkbnV0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChtdjogbnVtYmVyKSA9PiB7IHJldHVybiBtdiA+IDA7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IChmdjogYm9vbGVhbikgPT4geyByZXR1cm4gZnYgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMTE1MDMxMlwiLCBjdXN0b21DbGFzczogbW9kZSA9PT0gXCJmaWx0ZXJcIiA/IFwiXCIgOiBcImhpZGRlblwiIH0pIC8vUkMgMzExNTAzMTIgOiBab2JyYXppdCBjaHlibsOpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9jaHlibmVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiAobXY6IG51bWJlcikgPT4geyByZXR1cm4gbXYgPiAwOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiAoZnY6IGJvb2xlYW4pID0+IHsgcmV0dXJuIGZ2ID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlrYXpfdHlwX2lpc3NwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjg1XCIsIC8vUkMgMzExNTAyODUgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMjg2XCIsIC8vUkMgMzExNTAyODYgOiBUeXAgdsO9a2F6dVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjgyXCIsIC8vUkMgMzExNTAyODIgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjg3XCIsIC8vUkMgMzExNTAyODcgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDQ5XCIsIC8vUkMgMzExNTAwNDkgOiBTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5mdWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLnN0YXR1c19pbmJveCEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIHsgaWNvbjogXCJnaS1wYXBlclwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzNcIiB9OyAvL1JDIDMxMTUwMDMzIDogWnByYWNvdsOhbsOtIGTDoXZreSBpbmljaWFsaXpvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHsgaWNvbjogXCJnaS1wYXBlciBnLXN0YXRlLXRleHQgZy1zdGF0ZS1mYXZvcml0ZVwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzRcIiB9OyAvL1JDIDMxMTUwMDM0IDogRMOhdmthIHphxZlhemVuYSBkbyBmcm9udHkgenByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiB7IGljb246IFwiZ2ktcGFwZXIgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzVcIiB9OyAvL1JDIDMxMTUwMDM1IDogWnByYWNvdsOhbsOtIGTDoXZreSB6YWjDoWplbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzZcIiB9OyAvL1JDIDMxMTUwMDM2IDogWnByYWNvdsOhbsOtIGTDoXZreSB1a29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDM3XCIgfTsgLy9SQyAzMTE1MDAzNyA6IFpwcmFjb3bDoW7DrSBkw6F2a3kgdWtvbsSNZW5vIHMgY2h5Ym91XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDM4XCIgfTsgLy9SQyAzMTE1MDAzOCA6IE5lcG9kYcWZaWxvIHNlIHNlc3Rhdml0IGEgb2Rlc2xhdCBkw6F2a3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTEwOiByZXR1cm4geyBpY29uOiBcImdpLXRpY2sgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwMzlcIiB9OyAvL1JDIDMxMTUwMDM5IDogWnByw6F2eSBzdGHFvmVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjA6IHJldHVybiB7IGljb246IFwiZmEtdGltZXMgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDQwXCIgfTsgLy9SQyAzMTE1MDA0MCA6IFDFmWkgcHLDoWNpIHMgZMOhdmtvdSBkb8WhbG8gdiBHSU5JUyBrIGNoeWLEm1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzA6IHJldHVybiB7IGljb246IFwiZmEtd2luZG93LWNsb3NlLW8gZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDQxXCIgfTsgLy9SQyAzMTE1MDA0MSA6IEtvbXVuaWthxI1uw60gY2h5YmEgbWV6aSBHSU5JUyBhIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0MDogcmV0dXJuIHsgaWNvbjogXCJmYS1taW51cy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcImpyZXM6MzExNTAwNDJcIiB9OyAvL1JDIDMxMTUwMDQyIDogTmVleGlzdHVqw60gZGF0YSBwcm8gdsO9YsSbcm92w6Ega3JpdMOpcmlhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1MDogcmV0dXJuIHsgaWNvbjogXCJmYS1iYW5cIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDQzXCIgfTsgLy9SQyAzMTE1MDA0MyA6IETDoXZrYSBieWxhIHN0b3Jub3bDoW5hIHXFvml2YXRlbGVtIEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE2MDogcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IGQuc3RhdHVzX2luYm94X3prciEsIHRvb2x0aXA6IFwianJlczozMTE1MDA0NFwiIH07IC8vUkMgMzExNTAwNDQgOiBCeWxvIHZ5xb7DoWTDoW5vIGdlbmVyb3bDoW7DrSBub3bEm2rFocOtaG8gdsO9a2F6dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNzA6IHJldHVybiB7IGljb246IFwiZmEtd2luZG93LWNsb3NlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIiwgdGV4dDogZC5zdGF0dXNfaW5ib3hfemtyISwgdG9vbHRpcDogXCJqcmVzOjMxMTUwMDQ1XCIgfTsgLy9SQyAzMTE1MDA0NSA6IENoeWJhIHDFmWkgZ2VuZXJvdsOhbsOtIHNlc3RhdnkgdsO9a2F6dSB2IEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBkLnN0YXR1c19pbmJveF96a3IhLCB0b29sdGlwOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9wb3Jvdm5hbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyODlcIiwgLy9SQyAzMTE1MDI4OSA6IFBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMjkwXCIsIC8vUkMgMzExNTAyOTAgOiBWw71zbGVkZWsgcG9yb3Zuw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5zdGF2X3Bvcm92bmFuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiAvL3YgcHJpcHJhdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImdpLWRva3VtZW50X25ldXJjZW5vXCIsIHRleHQ6IFwianJlczozMTE1MDI5MVwiIH07IC8vUkMgMzExNTAyOTEgOiBOZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IC8vcHJpcHJhdmVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZ2ktYXJyb3dcIiwgdGV4dDogXCJqcmVzOjMxMTUwMjkyXCIgfTsgLy9SQyAzMTE1MDI5MiA6IFDFmWlwcmF2ZW5vIGsgcG9yb3Zuw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6IC8vc2hvZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IFwianJlczozMTE1MDI5M1wiIH07IC8vUkMgMzExNTAyOTMgOiBWw71rYXp5IGpzb3Ugc2hvZG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDogLy9uZXNob2RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdGV4dDogXCJqcmVzOjMxMTUwMjk0XCIgfTsgLy9SQyAzMTE1MDI5NCA6IFbDvWthenkgc2UgbGnFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOiAvL3Nob2RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLCB0ZXh0OiBcImpyZXM6MzExNTAyOTVcIiB9OyAvL1JDIDMxMTUwMjk1IDogVsO9a2F6eSBqc291IHNob2Ruw6kg4oCTIGJ5bG8gdnnFvsOhZMOhbm8gZ2VuZXJvdsOhbsOtIG5vdsSbasWhw61obyB2w71rYXp1IOKAkyBqacW+IG5lbHplIHpvYnJheml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwOiAvL25lc2hvZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsIHRleHQ6IFwianJlczozMTE1MDI5NlwiIH07IC8vUkMgMzExNTAyOTYgOiBWw71rYXp5IHNlIGxpxaHDrSDigJMgYnlsbyB2ecW+w6Fkw6FubyBnZW5lcm92w6Fuw60gbm92xJtqxaHDrWhvIHbDvWthenUg4oCTIGppxb4gbmVsemUgem9icmF6aXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9yb3pkaWx1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMjk3XCIsIC8vUkMgMzExNTAyOTcgOiBSb3pkw61seVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAyOThcIiAvL1JDIDMxMTUwMjk4IDogUG/EjWV0IHLFr3puw71jaCDFmcOhZGvFr1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWtvbmNlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAyOTlcIiwgLy9SQyAzMTE1MDI5OSA6IERhdHVtIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzAwXCIgLy9SQyAzMTE1MDMwMCA6IMSMYXMgcMWZZWRwb2tsw6FkYW7DqWhvIHVrb27EjWVuw60genByYWNvdsOhbsOtIHYgSUlTU1BcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3phZGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzAxXCIsIC8vUkMgMzExNTAzMDEgOiBEYXR1bSB2ecW+w6Fkw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzAyXCIgLy9SQyAzMTE1MDMwMiA6IE9rYW3FvmlrIHZ5xb7DoWTDoW7DrSBwb8W+YWRhdmt1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF96cHJhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDMwM1wiLCAvL1JDIDMxMTUwMzAzIDogWnByw6F2XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDMwNFwiIC8vUkMgMzExNTAzMDQgOiBQb8SNZXQgenByw6F2IHZ5Z2VuZXJvdmFuw71jaCB2IElJU1NQIHYgcsOhbWNpIG9kcG92xJtkaVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpZF9pbmJveF9yaXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMDQ3XCIgfSkgLy9SQyAzMTE1MDA0NyA6IElJU1NQIGTDoXZrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2luYm94X2V4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAwNDZcIiB9KSAvL1JDIDMxMTUwMDQ2IDogR0lOSVMgZMOhdmthXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YWRhbF9uYXpldl9yZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDMwNVwiLCAvL1JDIDMxMTUwMzA1IDogVnnFvsOhZGFsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDMwNlwiLCAvL1JDIDMxMTUwMzA2IDogUG/FvmFkYXZlayB2ecW+w6FkYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcmV2emFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzA3XCIsIC8vUkMgMzExNTAzMDcgOiBEYXR1bSBwxZlldnpldMOtL3N0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAzMDhcIiwgLy9SQyAzMTE1MDMwOCA6IE9rYW3FvmlrIHDFmWV2emV0w60gdsO9c2xlZGvFryAvIE9rYW3FvmlrIHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmV2emFsX25hemV2X3JmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzA5XCIsIC8vUkMgMzExNTAzMDkgOiBQxZlldnphbC9TdG9ybm92YWxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzEwXCIgLy9SQyAzMTE1MDMxMCA6IFbDvXNsZWRreSBwxZlldnphbCAvIETDoXZrdSBzdG9ybm92YWxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZSgpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgZkRhdGEgPSB0aGlzLmZpbHRlcnBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpISBhcyBJR0Zvcm1EdG87XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaW1wbGVGb3JtKFxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMxMTUwMjc5XCIsIC8vUkMgMzExNTAyNzkgOiBHZW5lcm92YXRcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSh0aGlzLm9wdGlvbnMhLCBcImRpYWxvZ1wiKSxcclxuICAgICAgICAgICAgICAgIGZEYXRhXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKGQgPT4gISFkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQ6IElHRm9ybUR0bykgPT4geyByZXR1cm4gdGhpcy5nZW5lcmF0ZU5ldyhkKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdGVOZXcoZDogR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthekR0byk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCBvID0gdGhpcy5vcHRpb25zITtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuSWlzc3BWeWthei5jcmVhdGVDb21taXQoe1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5a2F6X3R5cF9paXNzcDogZC52eWthel90eXBfaWlzc3AsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9rOiBkLnJvayxcclxuICAgICAgICAgICAgICAgICAgICBtZXNpY19kbzogZC5tZXNpY19kbyxcclxuICAgICAgICAgICAgICAgICAgICBpc3BfZmltOiBkLmlzcF9maW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvOiBvLmljbyxcclxuICAgICAgICAgICAgICAgICAgICB1Y3M6IG8udWNzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVmID0gJC5EZWZlcnJlZDxudW1iZXI+KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvID0gdGhpcy5vcHRpb25zITtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkX2luYm94X3NzcCA9IHIucmVzdWx0LmRhdGEuaWRfaW5ib3hfc3NwIVxyXG4gICAgICAgICAgICAgICAgbGV0IHZ5a2F6ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZC52eWthel90eXBfaWlzc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUlYwMVwiOiB2eWtheiA9IFwiVUNSR0JGTzFcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJWMDJcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUlYwNlwiOiB2eWtheiA9IFwiVUNSR0JGTzJcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJWMDNcIjogdnlrYXogPSBcIlVDUkdCRk8zXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJSVjA0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJWMDVcIjogdnlrYXogPSBcIlVDUkdCQU5WXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBHRXJyb3IoYE5lem5hbXkgdHlwIHZ5a2F6dSAnJHtkLnZ5a2F6X3R5cF9paXNzcH0nYCk7IC8vVE9ETzogRXhjLi4uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eWthekdlbkFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwidWNyX3B0bV90ZWNodGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogYCR7ZC5yb2t9JHsoXCIwMFwiICsgZC5tZXNpY19kbykuc2xpY2UoLTIpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUmVzdHJpY3Rpb25BbHZNZXRob2Q6IFwiR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdWeWthenk6VnlrYXp5UmVzdHJpY3Rpb25BbHZNZXRob2RcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdWeWthenk6VnlrYXp5U2VydmVyUGFyYW1ldGVyTWV0aG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZXN0YXZhIGplIG5ldml6dWFsbmksIHNvdWJvciByZXBvcnR1IG5lcG90cmVidWplbWUuXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRHRvOiB7IC8vR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdWeWthenlDdXN0b21EdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRfaW5ib3hfc3NwOiBpZF9pbmJveF9zc3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5a2F6OiB2eWtheixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBvLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBvLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiBkLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6IGQubWVzaWNfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb19vcl91Y3M6ICEhci5yZXN1bHQuZGF0YS5pY29fb3JfdWNzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL3JlcG9ydFN0YXJ0aW5nOiAocHMpID0+IHsgfSwgLy9OT1RFIChCTSk6IEFzaSBuZXBvdHJlYnVqZW1lXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXBvcnRTZWxlY3RlZDogKGV2LCByaSkgPT4geyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEdlbmVyYXRlZDogKGV2LCByaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpOyAvL1Nlc3RhdmEgamUgbmV2aXp1YWxuaSwgdGFrIGdlbmVyb3ZhbmkgenJ1c2ltZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoaWRfaW5ib3hfc3NwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGV2LnRhcmdldCkudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ0Nsb3NlZDogKGV2LCByaSkgPT4geyBkZWYucmVqZWN0KCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChpZF9pbmJveF9zc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5JaXNzcFZ5a2F6LnVzcGVjaFNlc3RhdnlDb21taXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRfaW5ib3hfc3NwOiBpZF9pbmJveF9zc3AhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcImpyZXM6MzExNTAzNThcIi5mb3JtYXQoci5yZXN1bHQ/LmRhdGE/LmlkX2luYm94X2V4dCA/PyBcIi1cIikpOyAvL1JDIDMxMTUwMzU4IDogVsO9a2F6IHswfSBieWwgdnlnZW5lcm92w6FuLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wicmVmcmVzaEFjdFwiXT8ucnVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCk9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgSUdGb3JtRHRvIHtcclxuICAgICAgICBpc3BfZmltOiBzdHJpbmc7XHJcbiAgICAgICAgbWVzaWNfZG86IG51bWJlcjtcclxuICAgICAgICBwcml6X2NoeWJuZT86IG51bWJlcjtcclxuICAgICAgICBwcml6X3Z5enZlZG51dG8/OiBudW1iZXI7XHJcbiAgICAgICAgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgdnlrYXpfdHlwX2lpc3NwPzogc3RyaW5nO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5JaXNzcC5XZWJDb250cm9scyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR1Z5a2F6eVBvcm92bmFuaU9wdGlvbnMge1xyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG4gICAgICAgIG1lc2ljX2RvOiBudW1iZXI7XHJcbiAgICAgICAgaXNwX2ZpbTogc3RyaW5nO1xyXG4gICAgICAgIHZ5a2F6X3R5cF9paXNzcDogc3RyaW5nO1xyXG4gICAgICAgIGRhdF96YWRhbDogSnNvbkRhdGU7XHJcbiAgICAgICAgcG9jZXRfcm96ZGlsdTogbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR1Z5a2F6eVBvcm92bmFuaVxyXG4gICAgICogVnl0dm9yZW5vIGRsZTogTjpcXEdJTklTXFw0ODlcXGRldlxcbmV0XFxHb3JkaWMuSWlzc3AuV2luQ2xpZW50XFxJbmJveFxcR0luYm94UG9yb3ZuYW5pVGFiLmNzXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgYm1hcnRpbmVrXHJcbiAgICAgKiBAc2luY2UgNDkwLjEuMC4xNlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5a2F6eVBvcm92bmFuaSBleHRlbmRzIEdDb250ZW50IGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuXHJcbiAgICAgICAgdWlkID0gXCJHSWlzc3BWeWthenlQb3Jvdm5hbmkjXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldy8qPHsgcm96ZGlseTogbnVtYmVyOyB6ZHJvajogbnVtYmVyOyBuZXNob2RhOiBudW1iZXI7IH0+Ki87XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdWeWthenlQb3Jvdm5hbmlPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYCR7b3B0aW9ucy52eWthel90eXBfaWlzc3B9IC0gcHJvdm7DoW7DrWA7IC8vVE9ETzogSlJFU1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogYEZJTTogJHtvcHRpb25zLmlzcF9maW19YCwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogYFJvazogJHtvcHRpb25zLnJva31gLCAvL1RPRE86IEpSRVNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBgTcSbc8OtYzogJHtvcHRpb25zLm1lc2ljX2RvfWAsIC8vVE9ETzogSlJFU1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGBWw71rYXo6ICR7b3B0aW9ucy52eWthel90eXBfaWlzc3B9YCwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogYEdlbmVyb3bDoW5vOiAke0dvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShvcHRpb25zLmRhdF96YWRhbCl9YCwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogYFBvxI1ldCByb3pkw61sxa86ICR7b3B0aW9ucy5wb2NldF9yb3pkaWx1fWAsIC8vVE9ETzogSlJFU1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMzU5XCIpIC8vUkMgMzExNTAzNTkgOiBKZW4gcm96ZMOtbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInJvemRpbHlcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExNTAzNjBcIikgLy9SQyAzMTE1MDM2MCA6IEplbiBHSU5JU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdpbmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnB1dC52YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2Zvcm1cIikuZmluZEZpZWxkcyhcImlpc3NwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpaXNzcDogZmFsc2UgfSwgeyBzZXRGbGFnczogeyB0cmlnZ2VyQ2hhbmdlOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMTUwMzYxXCIpIC8vUkMgMzExNTAzNjEgOiBKZW4gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpaXNzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5wdXQudmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmb3JtXCIpLmZpbmRGaWVsZHMoXCJnaW5pc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgZ2luaXM6IGZhbHNlIH0sIHsgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkU2ltcGxlTW9kZTogXCJpaXNzcFZ5a2F6eVBvcm92bmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wicm96ZGlseVwiLCBcImdpbmlzXCIsIFwiaWlzc3BcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldiwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmOiB7IHJvemRpbHk6IGJvb2xlYW47IGdpbmlzOiBib29sZWFuOyBpaXNzcDogYm9vbGVhbjsgfSA9IG8uZmlsdGVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBuZXcgR29yZGljLkRhdGEuRmlsdGVyUHJvY2Vzc29yKChtZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBtZC5kYXRhIGFzIHsgcm96ZGlseTogbnVtYmVyOyB6ZHJvajogbnVtYmVyOyBuZXNob2RhOiBudW1iZXI7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNob3VsZEJlVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmLnJvemRpbHkpIHNob3VsZEJlVmlzaWJsZSA9IGQucm96ZGlseSA+IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYuZ2luaXMgJiYgc2hvdWxkQmVWaXNpYmxlKSBzaG91bGRCZVZpc2libGUgPSBkLnpkcm9qID09PSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmLmlpc3NwICYmIHNob3VsZEJlVmlzaWJsZSkgc2hvdWxkQmVWaXNpYmxlID0gZC56ZHJvaiA9PT0gMSB8fCBkLm5lc2hvZGEgPT09IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaG91bGRCZVZpc2libGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChvcHRpb25zLnZ5a2F6X3R5cF9paXNzcCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlJWMDFcIjogdGhpcy5wcmVwYXJlUlYwMShvcHRpb25zKTsgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlJWMDJcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJSVjA2XCI6IHRoaXMucHJlcGFyZVJWMDJSVjA2KG9wdGlvbnMpOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJSVjAzXCI6IHRoaXMucHJlcGFyZVJWMDMob3B0aW9ucyk7ICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJSVjA0XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUlYwNVwiOiB0aGlzLnByZXBhcmVSVjA0UlYwNShvcHRpb25zKTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgR0Vycm9yKGBQcm9wLiAndnlrYXpfdHlwX2lpc3NwJyB3aXRoIHZhbCAnJHtvcHRpb25zLnZ5a2F6X3R5cF9paXNzcH0nIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZVJWMDEobzogSUdWeWthenlQb3Jvdm5hbmlPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6R2xvRHRvPihbXSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJWMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwVnlrYXpHbG9EdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsdGVybmF0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNcIiwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWx5X2ltZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzE5XCIsIC8vUkMgMzExNTAzMTkgOiBWXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzIwXCIsIC8vUkMgMzExNTAzMjAgOiBWw71zbGVkZWsgcG9yb3Zuw6Fuw60gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5yb3pkaWx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgdGV4dDogXCJqcmVzOjMxMTUwMzE1XCIgfTsgLy9SQyAzMTE1MDMxNSA6IE9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMTE1MDMxNlwiIH07IC8vUkMgMzExNTAzMTYgOiBKaW7DqSDEjcOhc3RreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4geyBpY29uOiBcImdpLWdvcmRpY1wiLCB0ZXh0OiBcImpyZXM6MzExNTAzMTdcIiB9IC8vUkMgMzExNTAzMTcgOiDFmMOhZGVrIGplIGplbiB2IEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiB7IGljb246IFwiZmEtZXVyXCIsIHRleHQ6IFwianJlczozMTE1MDMxOFwiIH07IC8vUkMgMzExNTAzMTggOiDFmMOhZGVrIGplIGplbiB2IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm96ZGlseV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDQ1MDAwNFwiLCAvL1JDIDI0NDUwMDA0IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJyb3pkaWx5X3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAzMjFcIiwgd2lkdGg6IDg1IH0pIC8vUkMgMzExNTAzMjEgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9wYXJcIiwgICAgIGNhcHRpb246IFwianJlczozMTE1MDMyMlwiLCB3aWR0aDogNjAgfSkgLy9SQyAzMTE1MDMyMiA6IFBhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3BvbFwiLCAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzIzXCIsIHdpZHRoOiA0MCB9KSAvL1JDIDMxMTUwMzIzIDogUG9sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpc3BfemRyXCIsICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAzMjRcIiwgd2lkdGg6IDY1IH0pIC8vUkMgMzExNTAzMjQgOiBaZHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlzcF9lZHNcIiwgICAgIGNhcHRpb246IFwianJlczozMTE1MDMyNVwiLCB3aWR0aDogNzAgfSkgLy9SQyAzMTE1MDMyNSA6IEVkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXNwX3VjbFwiLCAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzI2XCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMxMTUwMzI2IDogVWNsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpc3BfcHZzXCIsICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAzMjdcIiwgd2lkdGg6IDgwIH0pIC8vUkMgMzExNTAzMjcgOiBQdnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3Jfc2NoXCIsIGNhcHRpb246IFwianJlczozMTE1MDMyOFwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzMjggOiBTY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfcl96bWVcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzI5XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDMyOSA6IFBvIHptxJtuw6FjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfcl9rb25cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzMwXCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDMzMCA6IEtvbmXEjW7DvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfc2t1XCIsICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzMxXCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDMzMSA6IFNrdXRlxI1ub3N0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5pc2wuSWlzc3BWeWthei5saXN0R2xvKHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2eWthel90eXBfaWlzc3A6IG8udnlrYXpfdHlwX2lpc3NwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvazogICAgICAgICAgICAgby5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaWNfZG86ICAgICAgICBvLm1lc2ljX2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzcF9maW06ICAgICAgICAgby5pc3BfZmltXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZCkgPT4gIHsgdmlldy51cGRhdGVEYXRhKGQpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVwYXJlUlYwMlJWMDYobzogSUdWeWthenlQb3Jvdm5hbmlPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6UmVrRHRvPihbXSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJWMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwVnlrYXpSZWtEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsdGVybmF0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNcIiwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWx5X2ltZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzE5XCIsIC8vUkMgMzExNTAzMTkgOiBWXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzIwXCIsIC8vUkMgMzExNTAzMjAgOiBWw71zbGVkZWsgcG9yb3Zuw6Fuw60gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5yb3pkaWx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgdGV4dDogXCJqcmVzOjMxMTUwMzE1XCIgfTsgLy9SQyAzMTE1MDMxNSA6IE9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMTE1MDMxNlwiIH07IC8vUkMgMzExNTAzMTYgOiBKaW7DqSDEjcOhc3RreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4geyBpY29uOiBcImdpLWdvcmRpY1wiLCB0ZXh0OiBcImpyZXM6MzExNTAzMTdcIiB9IC8vUkMgMzExNTAzMTcgOiDFmMOhZGVrIGplIGplbiB2IEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiB7IGljb246IFwiZmEtZXVyXCIsIHRleHQ6IFwianJlczozMTE1MDMxOFwiIH07IC8vUkMgMzExNTAzMTggOiDFmMOhZGVrIGplIGplbiB2IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWx5X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDA0XCIsIC8vUkMgMjQ0NTAwMDQgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInJvemRpbHlfdHh0XCIsICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzIxXCIsIHdpZHRoOiA4NSB9KSAvL1JDIDMxMTUwMzIxIDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldl9kaXNwbGF5XCIsIGNhcHRpb246IFwiTsOhemV2XCIsIHdpZHRoOiAyNTB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAzMzNcIiwgLy9SQyAzMTE1MDMzMyA6IMWYw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAzMzJcIiAgLy9SQyAzMTE1MDMzMiA6IMSMw61zbG8gdXLEjXVqw61jw60gdHlwIMWZw6Fka3UgZGxlIHZ5aGzDocWha3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3Jfc2NoXCIsIGNhcHRpb246IFwianJlczozMTE1MDMzNFwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzMzQgOiBTY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfcl96bWVcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzM1XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDMzNSA6IFBvIHptxJtuw6FjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfcl9rb25cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzM2XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDMzNiA6IEtvbmXEjW7DvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfc2t1XCIsICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzM3XCIsIHdpZHRoOiAxMDAgIH0pIC8vUkMgMzExNTAzMzcgOiBTa3V0ZcSNbm9zdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwVnlrYXoubGlzdFJlayh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlrYXpfdHlwX2lpc3NwOiBvLnZ5a2F6X3R5cF9paXNzcCxcclxuICAgICAgICAgICAgICAgICAgICByb2s6ICAgICAgICAgICAgIG8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2ljX2RvOiAgICAgICAgby5tZXNpY19kbyxcclxuICAgICAgICAgICAgICAgICAgICBpc3BfZmltOiAgICAgICAgIG8uaXNwX2ZpbVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+ICB7IHZpZXcudXBkYXRlRGF0YShkKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZVJWMDMobzogSUdWeWthenlQb3Jvdm5hbmlPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6WnVrRHRvPihbXSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJWMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwVnlrYXpadWtEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsdGVybmF0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNcIiwgLy9UT0RPOiBKUkVTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWx5X2ltZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzE5XCIsIC8vUkMgMzExNTAzMTkgOiBWXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTUwMzIwXCIsIC8vUkMgMzExNTAzMjAgOiBWw71zbGVkZWsgcG9yb3Zuw6Fuw60gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5yb3pkaWx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgdGV4dDogXCJqcmVzOjMxMTUwMzE1XCIgfTsgLy9SQyAzMTE1MDMxNSA6IE9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMTE1MDMxNlwiIH07IC8vUkMgMzExNTAzMTYgOiBKaW7DqSDEjcOhc3RreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4geyBpY29uOiBcImdpLWdvcmRpY1wiLCB0ZXh0OiBcImpyZXM6MzExNTAzMTdcIiB9IC8vUkMgMzExNTAzMTcgOiDFmMOhZGVrIGplIGplbiB2IEdJTklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiB7IGljb246IFwiZmEtZXVyXCIsIHRleHQ6IFwianJlczozMTE1MDMxOFwiIH07IC8vUkMgMzExNTAzMTggOiDFmMOhZGVrIGplIGplbiB2IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWx5X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDA0XCIsIC8vUkMgMjQ0NTAwMDQgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF91a2F6YXRlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzM4XCIsIC8vUkMgMzExNTAzMzggOiBLw7NkIHVrYXphdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDMzOVwiLCAvL1JDIDMxMTUwMzM5IDogSWRlbnRpZmlrw6F0b3IgesOhdmF6bsOpaG8gdWthemF0ZWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7IG5hbWU6IFwiY19yX3NjaFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAzNDBcIiwgd2lkdGg6IDEwMCB9KSAvL1JDIDMxMTUwMzQwIDogU2NodsOhbGVuw71cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3Jfem1lXCIsIGNhcHRpb246IFwianJlczozMTE1MDM0MVwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNDEgOiBQbyB6bcSbbsOhY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3Jfa29uXCIsIGNhcHRpb246IFwianJlczozMTE1MDM0MlwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNDIgOiBLb25lxI1uw71cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX3NrdVwiLCAgIGNhcHRpb246IFwianJlczozMTE1MDM0M1wiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNDMgOiBTa3V0ZcSNbm9zdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfbXJwXCIsICAgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzQ0XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDM0NCA6IE1pbW9yb3pwb8SNdG92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjX25udlwiLCAgIGNhcHRpb246IFwianJlczozMTE1MDM0NVwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNDUgOiDEjGVycMOhbsOtIE5OVlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsLklpc3NwVnlrYXoubGlzdFp1ayh7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlrYXpfdHlwX2lpc3NwOiBvLnZ5a2F6X3R5cF9paXNzcCxcclxuICAgICAgICAgICAgICAgICAgICByb2s6ICAgICAgICAgICAgIG8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2ljX2RvOiAgICAgICAgby5tZXNpY19kbyxcclxuICAgICAgICAgICAgICAgICAgICBpc3BfZmltOiAgICAgICAgIG8uaXNwX2ZpbVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+ICB7IHZpZXcudXBkYXRlRGF0YShkKTsgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZVJWMDRSVjA1KG86IElHVnlrYXp5UG9yb3ZuYW5pT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BWeWthek5hckR0bz4oW10pO1xyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJSVjAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcFZ5a2F6TmFyRHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhbHRlcm5hdGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsIC8vVE9ETzogSlJFU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm96ZGlseV9pbWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDMxOVwiLCAvL1JDIDMxMTUwMzE5IDogVlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTE1MDMyMFwiLCAvL1JDIDMxMTUwMzIwIDogVsO9c2xlZGVrIHBvcm92bsOhbsOtIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQucm96ZGlseSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IFwianJlczozMTE1MDMxNVwiIH07IC8vUkMgMzExNTAzMTUgOiBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBcImpyZXM6MzExNTAzMTZcIiB9OyAvL1JDIDMxMTUwMzE2IDogSmluw6kgxI3DoXN0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHsgaWNvbjogXCJnaS1nb3JkaWNcIiwgdGV4dDogXCJqcmVzOjMxMTUwMzE3XCIgfSAvL1JDIDMxMTUwMzE3IDogxZjDoWRlayBqZSBqZW4gdiBHSU5JU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4geyBpY29uOiBcImZhLWV1clwiLCB0ZXh0OiBcImpyZXM6MzExNTAzMThcIiB9OyAvL1JDIDMxMTUwMzE4IDogxZjDoWRlayBqZSBqZW4gdiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm96ZGlseV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDQ1MDAwNFwiLCAvL1JDIDI0NDUwMDA0IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldl9kaXNwbGF5XCIsIGNhcHRpb246IFwiTsOhemV2XCIsIHdpZHRoOiAyNTAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAzNDZcIiwgLy9SQyAzMTE1MDM0NiA6IMWYw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExNTAzNDdcIiAvL1JDIDMxMTUwMzQ3IDogxIzDrXNsbyB1csSNdWrDrWPDrSB0eXAgxZnDoWRrdSBkbGUgdnlobMOhxaFreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19zbF8xXCIsIGNhcHRpb246IFwianJlczozMTE1MDM0OFwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNDggOiAxLiBTdGF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREZWNpbWFsQ29sdW1uKHsgbmFtZTogXCJjX3NsXzJcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzQ5XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDM0OSA6IDIuIFptxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19zbF8zXCIsIGNhcHRpb246IFwianJlczozMTE1MDM1MFwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNTAgOiAzLiBVa29uxI1lbsOtICh6ZSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19zbF80XCIsIGNhcHRpb246IFwianJlczozMTE1MDM1MVwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNTEgOiA0LiBaYXBvamVuw60gKHplIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREZWNpbWFsQ29sdW1uKHsgbmFtZTogXCJjX3NsXzVcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzUyXCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDM1MiA6IDUuIFphcG9qZW7DrSB2bMOhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERlY2ltYWxDb2x1bW4oeyBuYW1lOiBcImNfc2xfNlwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAzNTNcIiwgd2lkdGg6IDEwMCB9KSAvL1JDIDMxMTUwMzUzIDogNi4gS29uZcSNbsO9ICgxKzIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREZWNpbWFsQ29sdW1uKHsgbmFtZTogXCJjX3NsXzdcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTUwMzU0XCIsIHdpZHRoOiAxMDAgfSkgLy9SQyAzMTE1MDM1NCA6IDcuIMSMZXJww6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERlY2ltYWxDb2x1bW4oeyBuYW1lOiBcImNfc2xfOFwiLCBjYXB0aW9uOiBcImpyZXM6MzExNTAzNTVcIiwgd2lkdGg6IDEwMCB9KSAvL1JDIDMxMTUwMzU1IDogOC4gTmXEjWVycGFuw6kgKDQrNS03KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19zbF85XCIsIGNhcHRpb246IFwianJlczozMTE1MDM1NlwiLCB3aWR0aDogMTAwIH0pIC8vUkMgMzExNTAzNTYgOiA5LiBaxa9zdGF0ZWsgKDYrOClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbC5JaXNzcFZ5a2F6Lmxpc3ROYXIoe1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5a2F6X3R5cF9paXNzcDogby52eWthel90eXBfaWlzc3AsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9rOiAgICAgICAgICAgICBvLnJvayxcclxuICAgICAgICAgICAgICAgICAgICBtZXNpY19kbzogICAgICAgIG8ubWVzaWNfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNwX2ZpbTogICAgICAgICBvLmlzcF9maW1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkKSA9PiAgeyB2aWV3LnVwZGF0ZURhdGEoZCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5QcmVmYWJzLkdyaWRGb3JtYXRzIHtcclxuICAgIGltcG9ydCBuYW1lcyA9IEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwRWtpc1NwUHNrSGlzdG9yaWVEdG9OYW1lcztcclxuICAgIGltcG9ydCBmcmFnbWVudHMgPSBHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcEVraXNTcFBza0hpc3RvcmllRHRvRnJhZ21lbnRzO1xyXG4gICAgaW1wb3J0IHR5cGVzID0gR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BFa2lzU3BQc2tIaXN0b3JpZUR0b1R5cGVzO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdJaXNzcEVraXNTcFBza0hpc3RvcmllRHRvR2ZQcmVmYWIoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSWlzc3AuSW50ZXJmYWNlLkdJaXNzcEVraXNTcFBza0hpc3RvcmllRHRvPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwRWtpc1NwUHNrSGlzdG9yaWVEdG8+KClcclxuICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lcy5pZF92b2xhbmlfc3NwLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IHR5cGVzLmlkX3ZvbGFuaV9zc3AsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogZnJhZ21lbnRzLmlkX3ZvbGFuaV9zc3AsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMDJcIiwgLy9SQyAzMTE1MDAwMiA6IElkIHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8uYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogbmFtZXMucG9yX2NpcyxcclxuICAgICAgICAgICAgLy8gICAgZGF0YVR5cGU6IHR5cGVzLnBvcl9jaXMsXHJcbiAgICAgICAgICAgIC8vICAgIGZyYWdtZW50OiBmcmFnbWVudHMucG9yX2NpcyxcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCI/XCJcclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBuYW1lcy52eXNsX3ZvbGFuaSxcclxuICAgICAgICAgICAgLy8gICAgZGF0YVR5cGU6IHR5cGVzLnZ5c2xfdm9sYW5pLFxyXG4gICAgICAgICAgICAvLyAgICBmcmFnbWVudDogZnJhZ21lbnRzLnZ5c2xfdm9sYW5pLFxyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIj9cIlxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVzLnZ5c2xfdm9sYW5pX3R4dCxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlcy52eXNsX3ZvbGFuaV90eHQsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogZnJhZ21lbnRzLnZ5c2xfdm9sYW5pX3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAwM1wiLCAvL1JDIDMxMTUwMDAzIDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lcy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogdHlwZXMuZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IGZyYWdtZW50cy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMDRcIiwgLy9SQyAzMTE1MDAwNCA6IERhdHVtIHZvbMOhbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTM1XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVzLmRydWgsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogdHlwZXMuZHJ1aCxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBmcmFnbWVudHMuZHJ1aCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAwNVwiLCAvL1JDIDMxMTUwMDA1IDogRHJ1aFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVzLmlkX2V4dCxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlcy5pZF9leHQsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogZnJhZ21lbnRzLmlkX2V4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAwNlwiLCAvL1JDIDMxMTUwMDA2IDogSUQgZXh0XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lcy5kYXR1bV9vZCxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlcy5kYXR1bV9vZCxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBmcmFnbWVudHMuZGF0dW1fb2QsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMDdcIiwgLy9SQyAzMTE1MDAwNyA6IERhdHVtIG9kXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTM1XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lcy5kYXR1bSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlcy5kYXR1bSxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBmcmFnbWVudHMuZGF0dW0sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMDhcIiwgLy9SQyAzMTE1MDAwOCA6IERhdHVtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTM1XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVzLmRva2xhZF9jaXNsbyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlcy5kb2tsYWRfY2lzbG8sXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogZnJhZ21lbnRzLmRva2xhZF9jaXNsbyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAwOVwiLCAvL1JDIDMxMTUwMDA5IDogRG9rbC4gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lcy50eXBfaGxhc2VuaSxcclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gZC50eXBfaGxhc2VuaT8udHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJJXCI6IHJldHVybiB7IGljb246IFwiZmEtaW5mby1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLCB0ZXh0OiBcImpyZXM6MzExNTAwMTZcIiB9OyAvL1JDIDMxMTUwMDE2IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJXXCI6IHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBcImpyZXM6MzExNTAwMTVcIiB9OyAvL1JDIDMxMTUwMDE1IDogVmFyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRVwiOiByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdGV4dDogXCJqcmVzOjMxMTUwMDE3XCIgfTsgLy9SQyAzMTE1MDAxNyA6IENoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IGZyYWdtZW50cy50eXBfaGxhc2VuaSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAxMFwiLCAvL1JDIDMxMTUwMDEwIDogVHlwIHpwci5cclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lcy5pZF9obGFzZW5pLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IHR5cGVzLmlkX2hsYXNlbmksXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogZnJhZ21lbnRzLmlkX2hsYXNlbmksXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExNTAwMTFcIiwgLy9SQyAzMTE1MDAxMSA6IElkZW50LiB6cHLDoXZ5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVzLnRleHRfaGxhc2VuaSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlcy50ZXh0X2hsYXNlbmksXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogZnJhZ21lbnRzLnRleHRfaGxhc2VuaSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAxMlwiLCAvL1JDIDMxMTUwMDEyIDogVGV4dCB6cHLDoXZ5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVzLnRleHRfY2h5YnksXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogdHlwZXMudGV4dF9jaHlieSxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBmcmFnbWVudHMudGV4dF9jaHlieSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTE1MDAxM1wiLCAvL1JDIDMxMTUwMDEzIDogVGV4dCBjaHlieVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDI1MFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==