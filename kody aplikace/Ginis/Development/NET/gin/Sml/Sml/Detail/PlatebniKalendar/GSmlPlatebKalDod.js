"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPlatebKalDod.ts                    </Name>
//    <Description> Platební kalendář dodavatelských dokladů                    </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-02-27                                                  </Created>
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
            /** Platební kalendář dodavatelských dokladů */
            let GSmlPlatebKalDod = class GSmlPlatebKalDod extends Gordic.GContentBase {
                closing() {
                    return this.changed;
                }
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                    this.createRozpisGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.isl.Smlskal.createNewDefaultDto({ ixp: that.smlpid.ixp }).getData().done((newDto) => {
                                    that.$grid.ggridroweditor("addRow", newDto);
                                }));
                            }
                        }),
                        actStornovat: Gordic.Eko.Action.actionStornovat({
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.stornovat());
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actNovy*", "actStornovat*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření seznamu platebního kalendáře */
                createGrid() {
                    this.$grid = $.newDiv()
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        data: new Gordic.Isl.View(this.isl.Smlskal.listDod({ filters: { ixp_sml_pri: this.smlpid.ixp_sml_pri, cis_platby: { o: ">", v: 0 } } }), {
                            onResponse: (data) => {
                                this.servicePermissions = data.servicePermissions;
                                this.actions.actNovy?.updatePermission(this.servicePermissions, "LzeNovy");
                                this.$gridRozpis.ggrid("getView").requestData();
                                return data;
                            },
                            key: ["ixp", "cis_platby", "ixp_sml_pri"],
                            processors: {
                                permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"])
                            }
                        }),
                        defaultProfile: {
                            condFormats: [
                                {
                                    formula: String.Format("EQUALS(@aktivita, {0})", 500 /* Interface.Aktivita.ng_aktNoAkt */), //356.20 30.03.07 - obarvení stornovaného řádku
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                                },
                                {
                                    formula: String.Format("EQUALS(@status_platby, {0})", 10 /* Interface.StatusPlatby.ng_statusplatbyReal */), //356.20 19.04.07 obarvení dle blokace
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                                }
                            ]
                        },
                        columns: this.createGridFormat(),
                        profileBeforeChange: (ev, obj) => {
                            // pokud se edituje, nejsou povoleny změny v gridu
                            return (this.$grid?.find(".row.editing")?.length ?? 0) < 1;
                        },
                        selection: (ev, obj) => {
                            if (obj.count == 0 || (this.$grid?.find(".row.editing")?.length ?? 1) > 0 || obj.count == 1 && obj.getSelection(false, false).length == 0) {
                            }
                            else {
                                var dto = obj.getSelection()[0];
                                this.actions.actNovy?.updatePermission(this.servicePermissions, "LzeNovy");
                                this.actions.actStornovat?.updatePermission(dto.Permissions, "LzeStornovat");
                            }
                        }
                    }).ggridroweditor({
                        allowCopy: true,
                        beforeStart: (ev, info) => {
                            //kontrola povolení editace
                            if (!(info?.cellInfo?.data?.Permissions?.LzeEditovat?.value ?? false)) {
                                ev.preventDefault();
                            }
                        },
                        start: (ev, info) => {
                            setTimeout(() => {
                                this.actions.actNovy?.updatePermission({ value: false });
                            }, 1);
                            this.actions.actStornovat?.updatePermission({ value: false });
                            //nový záznam - předpočítám maximální možnou částku
                            if (!info.cellInfo.data.flag_DB) {
                                this.$grid.findFields("c").gfield("setValue", this.$gridRozpis.ggrid("getView").getDataRows().find((el, idx, arr) => { return el.rok == this.rok; }).c_rozdil);
                            }
                        },
                        save: (data, obj) => {
                            if (data.zp != 10 && (!data.bu_ci || !data.sk_ci)) {
                                this.dialogs.error("jres:33600161", //RC 33600161 : Nevyplněná hodnota
                                "jres:33600162"); //RC 33600162 : Pro aktuální způsob platby musí být vyplněn bankovní účet
                                return $.Deferred().reject().promise();
                            }
                            var saveDto = { ...obj.cellInfo.data, ...data };
                            if (saveDto.flag_DB) {
                                return this.isl.Smlskal.updateDod(saveDto).getData().done(() => {
                                    this.changed = true;
                                    this.$grid.ggrid("getView").requestData();
                                }).fail((xhr, type, o) => {
                                    if (type === "validation" && this.$grid) {
                                        o.handled = true;
                                        this.$grid.findFields().gfield("model", "validations", o);
                                    }
                                });
                            }
                            else {
                                return this.isl.Smlskal.createDod(saveDto).getData().done(() => {
                                    this.changed = true;
                                    this.$grid.ggrid("getView").requestData();
                                }).fail((xhr, type, o) => {
                                    if (type === "validation" && this.$grid) {
                                        o.handled = true;
                                        this.$grid.findFields().gfield("model", "validations", o);
                                    }
                                });
                            }
                        }
                    }).gautofit();
                }
                createGridFormat() {
                    const that = this;
                    var gf = new Gordic.Data.GridFormat();
                    var c_error_message = "";
                    gf.addNumberColumn({
                        name: "cis_platby",
                        caption: "#",
                        width: 30
                    }).addTextColumn({
                        name: "ixs_esu_txt",
                        width: 300,
                        caption: "jres:33600163", //RC 33600163 : Dodavatel
                        editor: function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.smlKalIxsEsuSml(), {
                                        name: "ixs_esu" /* Interface.GSmlskalDtoNames.ixs_esu */,
                                        model: "model.ixs_esu=value.ixs_esu;model.ixp_sml_pri=>value.ixp_sml_pri",
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            ixp_sml_pri: that.smlpid.ixp_sml_pri,
                                        },
                                        change: (ev, ctx) => {
                                            if (ctx?.flags?.valid) {
                                                that.$grid.findFields("bu_ci").gfield("model", "apply", { ixs_esu: ctx.value.ixs_esu, bu_ci: ctx.value.bu_ci, sk_ci: ctx.value.sk_ci });
                                            }
                                        }
                                    }]
                            };
                        }
                    }).addTextColumn({
                        name: "bu_ci",
                        caption: "jres:33600164", //RC 33600164 : Bankovní účet
                        width: 120,
                        cellTemplate: "{bu_ci:trim:encode}/{sk_ci:trim:encode}",
                        editor: function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.ekosuci(), {
                                        name: "bu_ci" /* Interface.GSmlsesuDtoNames.bu_ci */,
                                        dropdown: false,
                                        model: "model.ixs_esu=>value.ixs_esu;model.bu_ci=value.bu_ci;model.sk_ci=value.sk_ci",
                                        serverFilters: {
                                            aktivita: 100,
                                            ixs_esu: new Gordic.Forms.Dependency("ixs_esu", (val) => {
                                                if (val == null) {
                                                    return that.smlpid.ixs_esu;
                                                }
                                                ;
                                                return val.ixs_esu;
                                            }, false, false, that.$grid),
                                        },
                                    }]
                            };
                        },
                    }).addDateColumn({
                        name: "dat_platby" /* Interface.GSmlskalDtoNames.dat_platby */,
                        caption: "jres:33600165", //RC 33600165 : Datum platby
                        width: 100,
                        editor: function (info) {
                            return {
                                widget: "gdatebox",
                                options: [{
                                        name: "dat_platby",
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required(),
                                            new Gordic.Validators.Base({
                                                message: "jres:33600166", //RC 33600166 : Datum platby musí být větší než datum uzavření
                                                errorType: "error",
                                                validate: (val, src) => {
                                                    if ($(src).gfield("getErrors").length > 0) {
                                                        return true;
                                                    }
                                                    //platba musí být větší než datum uzavření
                                                    //Call dat_platby_Y2K._put( smlpid_p.finpripad.dat_uzavreni )
                                                    return !(!that.smlpid.pripad?.dat_uzavreni || val < that.smlpid.pripad?.dat_uzavreni);
                                                }
                                            }),
                                            new Gordic.Validators.Base({
                                                message: "jres:33600167", //RC 33600167 : Datum platby je větší než datum platnosti
                                                errorType: "warning",
                                                stopping: false,
                                                validate: (val, src) => {
                                                    if ($(src).gfield("getErrors").length > 0) {
                                                        return true;
                                                    }
                                                    //342.11 15.11.01 - podmínka doplněna o typ platnosti smlouvy
                                                    return !(that.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */ && (!that.smlpid.pripad?.dat_platnost || val > that.smlpid.pripad?.dat_platnost));
                                                }
                                            })
                                        ],
                                        change: (ev, ctx) => {
                                            if (ctx?.flags?.valid && parseDate(ctx).getFullYear() != that.smlpid.num_rok) {
                                                // zjištění nové num_pol podle dat_platby - pokud je komunikace s IISSP
                                                if (that.priz_iissp != 0 /* Interface.KomunikaceIISSP.ng_priziisspNo */) {
                                                    that.beginOperation();
                                                    that.isl.Smlskal.getNumPolForYear({ ixp_sml_pri: info.cellInfo.data.ixp_sml_pri, year: parseDate(ctx).getFullYear() }).get().done((num_pol) => {
                                                        that.$grid.findFields("zp").gfield("option", "serverFilters", { Iissp_fp: (num_pol ?? 0) > 0 });
                                                    }).always(() => {
                                                        that.endOperation();
                                                    });
                                                }
                                            }
                                        }
                                    }]
                            };
                        },
                    });
                    Gordic.Eko.Grid.Column.addPopis(gf, {
                        name: "popis" /* Interface.GSmlskalDtoNames.popis */,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "popis",
                                    validators: [new Gordic.Validators.Length({ max: 50 })]
                                }]
                        },
                    });
                    Gordic.Eko.Grid.Column.addCastkaCZK(gf, {
                        name: "c" /* Interface.GSmlskalDtoNames.c */,
                        editor: function (info) {
                            return {
                                widget: "gnumberbox",
                                options: [Gordic.Prefabs.Number.currency(), {
                                        name: "c",
                                        disabled: info.cellInfo.data.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */, //editovatelné pouze pokud není blokováno
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required(),
                                            new Gordic.Validators.Base({
                                                getMessage: (value) => { return c_error_message; },
                                                errorType: "error",
                                                validate: (val, src) => {
                                                    if ($(src).gfield("getErrors").length > 0) {
                                                        return true;
                                                    }
                                                    if (that.$grid.findFields("dat_platby").gfield("getValue") == null) {
                                                        c_error_message = "jres:33600168";
                                                        return false;
                                                    } //RC 33600168 : Není zadána povinná hodnota - datum platby
                                                    var dat_platby = that.$grid.findFields("dat_platby").gfield("getValue");
                                                    var rozpisData = that.$gridRozpis.ggrid("getView").getDataRows().sort((a, b) => a - b);
                                                    var roky = rozpisData.map(x => x.rok);
                                                    //kontrola proti hodnotě smlouvy v daném roce - z dynamického pole agregátu
                                                    var aktRok = new Date(dat_platby).getFullYear() - Math.min(...roky);
                                                    if (aktRok <= roky.indexOf(Math.max(...roky))) {
                                                        if (parseDecimal(rozpisData[aktRok].c_plan ?? 0).minus(parseDecimal(info.cellInfo.data.c ?? 0)).plus(parseDecimal(val)).greaterThan(parseDecimal(rozpisData[aktRok].c ?? 0))) {
                                                            //Set c = tbl_KalRok.kalRok[ aktRok ].c_smlRok - tbl_KalRok.kalRok[ aktRok ].c_kalRok
                                                            c_error_message = "jres:33600169"; //RC 33600169 : Hodnota položek kalendáře převyšuje hodnotu rozepsaných prostředků v daném období
                                                            return false;
                                                        }
                                                        else if (parseDecimal(rozpisData[aktRok].c_plan ?? 0).minus(parseDecimal(info.cellInfo.data.c ?? 0)).plus(parseDecimal(val)).lessThan(0)) {
                                                            //360.20 11.06.09 povolím zadávat i záporné částky - cekově nesmí plán padnout pod nulu
                                                            //Set c = kalakt.c - tbl_KalRok.kalRok[ aktRok ].c_kalRok
                                                            c_error_message = "jres:33600170"; //RC 33600170 : Hodnota položek kalendáře nesmí klesnout do záporné hodnoty
                                                            return false;
                                                        }
                                                    }
                                                    else {
                                                        c_error_message = "jres:33600171"; //RC 33600171 : Nelze definovat částku platebního kalendáře v období, pro které není proveden rozpis prostředků
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            })
                                        ]
                                    }]
                            };
                        },
                    });
                    Gordic.Eko.Grid.Column.addKs(gf, {
                        name: "ks" /* Interface.GSmlskalDtoNames.ks */,
                        editor: function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.ekoskos(), {
                                        name: "ks",
                                        model: "model.ks=value.ks",
                                        disabled: info.cellInfo.data.ktg_platby == 20 /* Interface.KategoriePlatby.ng_ktgplatbyPoh */
                                    }]
                            };
                        },
                    });
                    Gordic.Eko.Grid.Column.addVs(gf, {
                        name: "vs" /* Interface.GSmlskalDtoNames.vs */,
                        editor: function (info) {
                            return {
                                widget: "gstringbox",
                                options: [{
                                        name: "vs",
                                        disabled: info.cellInfo.data.ktg_platby == 20 /* Interface.KategoriePlatby.ng_ktgplatbyPoh */
                                    }]
                            };
                        },
                    });
                    Gordic.Eko.Grid.Column.addSs(gf, {
                        name: "ss" /* Interface.GSmlskalDtoNames.ss */,
                        editor: function (info) {
                            return {
                                widget: "gstringbox",
                                options: [{
                                        name: "ss",
                                        disabled: info.cellInfo.data.ktg_platby == 20 /* Interface.KategoriePlatby.ng_ktgplatbyPoh */
                                    }]
                            };
                        },
                    });
                    gf.addTextColumn({
                        name: "zp_txt" /* Interface.GSmlskalDtoNames.zp_txt */,
                        caption: "jres:33600172", //RC 33600172 : Způsob platby
                        editor: function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.ekocizp(), {
                                        name: "zp",
                                        model: "model.zp=value.zp", //;model.zp_zkr=value.zp_zkr;model.zp_txt=value.zp_txt
                                        disabled: info.cellInfo.data.ktg_platby == 20 /* Interface.KategoriePlatby.ng_ktgplatbyPoh */,
                                        //itemTemplate: "{zp_txt:trim}",
                                        defaultValue: { zp: 0 },
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            Iissp_fp: (info.cellInfo.data.num_pol ?? 0) > 0
                                        }
                                    }],
                            };
                        }
                    }).addNumberColumn({
                        name: "aktivita" /* Interface.GSmlskalDtoNames.aktivita */,
                        hidden: true
                    }).addNumberColumn({
                        name: "status_platby" /* Interface.GSmlskalDtoNames.status_platby */,
                        hidden: true
                    });
                    return gf;
                }
                /** Stornování aktuálně vybrané platby*/
                stornovat() {
                    var selection = this.$grid.ggrid("getSelection");
                    if (selection.length != 1) {
                        return $.Deferred().reject().promise();
                    }
                    return this.isl.Smlskal.stornoDod(selection[0]).getData().done(() => {
                        this.changed = true;
                        this.$grid.ggrid("getView").requestData();
                    });
                }
                /** Vytvoření gridu s rozpisem částek plateb za roky */
                createRozpisGrid() {
                    var tab = $.newDiv().appendTo(this.element).gtab({
                        id: "tabRozpis",
                        title: "jres:33600173", //RC 33600173 : Roční rozpis plánu plateb
                        opened: true
                    });
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" });
                    form.addSection({ layoutDescriptor: "L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addField("ggrid", {
                        name: "gridRozpis",
                        columnMode: "full",
                        data: new Gordic.Isl.View(this.isl.Smlskal.listRozpis({ filters: { ixp: this.smlpid.ixp_sml_pri } }), {
                            onResponse: (data) => {
                                var c_kal = data.data.find((el, idx, arr) => { return el.rok == this.rok; })?.c_plan;
                                this.$formRozpis.findFields().gfield("model", "apply", { c_sml: this.smlpid.pripad?.c, c_kal: c_kal });
                                return data;
                            },
                            key: ["ixp", "rok"],
                            startEmpty: true
                        }),
                        columns: this.createRozpisGridFormat(),
                    })
                        .addSection()
                        .addRow("jres:33600174") //RC 33600174 : Celková částka
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_sml",
                        disabled: true
                    })
                        .addRow("jres:33600175") //RC 33600175 : Plán plateb v akt. roce
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_kal",
                        disabled: true
                    });
                    this.$formRozpis = $.newDiv().appendTo(tab).gform("createFrom", form);
                    this.$gridRozpis = tab.find("[data-help-context='list:gridRozpis']");
                }
                /** Vytvoření gridformátu pro grid s rozpisem částek plateb za roky */
                createRozpisGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addNumberColumn({
                        name: "rok" /* Interface.GSmlsrokDtoNames.rok */,
                        caption: "jres:33600176", //RC 33600176 : Rok
                    }).addCurrencyColumn({
                        name: "c" /* Interface.GSmlsrokDtoNames.c */,
                        caption: "jres:33600177", //RC 33600177 : Částka v CZK
                    }).addCurrencyColumn({
                        name: "c_plan" /* Interface.GSmlsrokDtoNames.c_plan */,
                        caption: "jres:33600178", //RC 33600178 : Plán plateb za rok
                    }).addCurrencyColumn({
                        name: "c_rozdil" /* Interface.GSmlsrokDtoNames.c_rozdil */,
                        caption: "jres:33600179", //RC 33600179 : Rozdíl
                    });
                    return gf;
                }
            };
            GSmlPlatebKalDod = __decorate([
                Decorators.gcontent
            ], GSmlPlatebKalDod);
            WebClient.GSmlPlatebKalDod = GSmlPlatebKalDod;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBsYXRlYkthbERvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxQbGF0ZWJLYWxEb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0F5ZGY7QUF6ZEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeWRuQjtJQXpkZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeWQ3QjtRQXpkb0IsV0FBQSxTQUFTO1lBUzFCLCtDQUErQztZQUUvQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFxQjlDLE9BQU87b0JBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixDQUFDO2dCQUVELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDbEMsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMs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c0VBQXNFO2dCQUM5RCxzQkFBc0I7b0JBQzFCLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQXlCLENBQUM7b0JBQzdELEVBQUUsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSw0Q0FBZ0M7d0JBQ3BDLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3FCQUNoRCxDQUFDLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksd0NBQThCO3dCQUNsQyxPQUFPLEVBQUUsZUFBZSxFQUFFLDRCQUE0QjtxQkFDekQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO3dCQUNqQixJQUFJLGtEQUFtQzt3QkFDdkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7cUJBQy9ELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxzREFBcUM7d0JBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3FCQUNuRCxDQUFDLENBQUE7b0JBRUYsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQzthQUNKLENBQUE7WUE3Y1ksZ0JBQWdCO2dCQUQ1QixVQUFVLENBQUMsUUFBUTtlQUNQLGdCQUFnQixDQTZjNUI7WUE3Y1ksMEJBQWdCLG1CQTZjNUIsQ0FBQTtRQUNMLENBQUMsRUF6ZG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlkN0I7SUFBRCxDQUFDLEVBemRnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5ZG5CO0FBQUQsQ0FBQyxFQXpkUyxNQUFNLEtBQU4sTUFBTSxRQXlkZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUGxhdGViS2FsRG9kLnRzICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUGxhdGVibsOtIGthbGVuZMOhxZkgZG9kYXZhdGVsc2vDvWNoIGRva2xhZMWvICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTAyLTI3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sUGxhdGViS2FsRG9kRGxnSW5wdXRQYXJhbXMge1xyXG4gICAgICAgIHNtbHBpZDogSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8sXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sUGxhdGViS2FsRG9kRGxnUmV0dXJuVmFsdWUge1xyXG4gICAgICAgIGNoYW5nZWQ6IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICAvKiogUGxhdGVibsOtIGthbGVuZMOhxZkgZG9kYXZhdGVsc2vDvWNoIGRva2xhZMWvICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTbWxQbGF0ZWJLYWxEb2QgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBDZWxrb3bDvSByZWNvcmQgLSBkb2tsYWQgKyBwxZnDrXBhZCAqL1xyXG4gICAgICAgIHB1YmxpYyBzbWxwaWQ6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvO1xyXG5cclxuICAgICAgICAvKiogQWt0dcOhbG7DrSByb2sgKi9cclxuICAgICAgICBwcml2YXRlIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsga29tdW5pa2FjZSBzIElJU1NQKi9cclxuICAgICAgICBwcml2YXRlIHByaXpfaWlzc3A6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqIEFrdHXDoWxuxJsgbmHEjXRlbsOpIHNlcnZpY2UgcGVybWlzc2lvbnMgKi9cclxuICAgICAgICBwcml2YXRlIHNlcnZpY2VQZXJtaXNzaW9uczogSW50ZXJmYWNlLkdTbWxza2FsUGVybWlzc2lvbnM7XHJcbiAgICAgICAgLyoqIEhsYXZuw60gZ3JpZCBzZSBzZXpuYW1lbSBwbGF0ZWJuw61obyBrYWxlbmTDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIEdyaWQgcyByb3pwaXNlbSBwbGF0ZWIgemEgcm9rICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFJvenBpczogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogRm9ybXVsw6HFmSBzIGdyaWRlbSByb3pwaXN1IGEgZmllbGR5Ki9cclxuICAgICAgICBwcml2YXRlICRmb3JtUm96cGlzOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvKiogUMWZw616bmFrLCB6ZGEgZG/FoWxvIGtlIHptxJtuxJsgdiByw6FtY2kgY29udGVudHUqL1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY2xvc2luZygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSb3pwaXNHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuaXNsLlNtbHNrYWwuY3JlYXRlTmV3RGVmYXVsdER0byh7IGl4cDogdGhhdC5zbWxwaWQuaXhwISB9KS5nZXREYXRhKCkuZG9uZSgobmV3RHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkcm93ZWRpdG9yKFwiYWRkUm93XCIsIG5ld0R0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0U3Rvcm5vdmF0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TdG9ybm92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vdmF0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5KlwiLCBcImFjdFN0b3Jub3ZhdCpcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gc2V6bmFtdSBwbGF0ZWJuw61obyBrYWxlbmTDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdTbWxza2FsRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuU21sLkludGVyZmFjZS5HU21sc2thbER0bz4odGhpcy5pc2wuU21sc2thbC5saXN0RG9kKHsgZmlsdGVyczogeyBpeHBfc21sX3ByaTogdGhpcy5zbWxwaWQuaXhwX3NtbF9wcmksIGNpc19wbGF0Ynk6IHtvOiBcIj5cIiwgdjogMH0gfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNwb25zZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucyA9IGRhdGEuc2VydmljZVBlcm1pc3Npb25zIGFzIEludGVyZmFjZS5HU21sc2thbFBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5Py51cGRhdGVQZXJtaXNzaW9uKHRoaXMuc2VydmljZVBlcm1pc3Npb25zLCBcIkx6ZU5vdnlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiLCBcImNpc19wbGF0YnlcIiwgXCJpeHBfc21sX3ByaVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zLipcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogU3RyaW5nLkZvcm1hdChcIkVRVUFMUyhAYWt0aXZpdGEsIHswfSlcIiwgSW50ZXJmYWNlLkFrdGl2aXRhLm5nX2FrdE5vQWt0KSwgLy8zNTYuMjAgMzAuMDMuMDcgLSBvYmFydmVuw60gc3Rvcm5vdmFuw6lobyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogU3RyaW5nLkZvcm1hdChcIkVRVUFMUyhAc3RhdHVzX3BsYXRieSwgezB9KVwiLCBJbnRlcmZhY2UuU3RhdHVzUGxhdGJ5Lm5nX3N0YXR1c3BsYXRieVJlYWwpLCAvLzM1Ni4yMCAxOS4wNC4wNyBvYmFydmVuw60gZGxlIGJsb2thY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUJlZm9yZUNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgZWRpdHVqZSwgbmVqc291IHBvdm9sZW55IHptxJtueSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy4kZ3JpZD8uZmluZChcIi5yb3cuZWRpdGluZ1wiKT8ubGVuZ3RoID8/IDApIDwgMTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5jb3VudCA9PSAwIHx8ICh0aGlzLiRncmlkPy5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMSkgPiAwIHx8IG9iai5jb3VudCA9PSAxICYmIG9iai5nZXRTZWxlY3Rpb24oZmFsc2UsIGZhbHNlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHRvID0gb2JqLmdldFNlbGVjdGlvbigpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE5vdnk/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMsIFwiTHplTm92eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RTdG9ybm92YXQ/LnVwZGF0ZVBlcm1pc3Npb24oZHRvLlBlcm1pc3Npb25zLCBcIkx6ZVN0b3Jub3ZhdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZHJvd2VkaXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiAoZXYsIGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rb250cm9sYSBwb3ZvbGVuw60gZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpbmZvPy5jZWxsSW5mbz8uZGF0YT8uUGVybWlzc2lvbnM/Lkx6ZUVkaXRvdmF0Py52YWx1ZSA/PyBmYWxzZSkpIHsgZXYucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy9tdXPDrSBkb2LEm2hub3V0IGFrdHXDoWxuw60gcHJvbWlzZSwgYWJ5IHpydcWhaWxhIHNldFBlbmRpbmcgbmEgYWtjaSBhIG1vaGwganNlbSBuYXN0YXZpdCBlbmFibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eT8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFN0b3Jub3ZhdD8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3bDvSB6w6F6bmFtIC0gcMWZZWRwb8SNw610w6FtIG1heGltw6FsbsOtIG1vxb5ub3UgxI3DoXN0a3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmZvLmNlbGxJbmZvLmRhdGEuZmxhZ19EQikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGlzLiRncmlkUm96cGlzLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpLmZpbmQoKGVsLCBpZHgsIGFycikgPT4geyByZXR1cm4gZWwucm9rID09IHRoaXMucm9rIH0pLmNfcm96ZGlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlOiAoZGF0YSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnpwICE9IDEwICYmICghZGF0YS5idV9jaSB8fCAhZGF0YS5za19jaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcImpyZXM6MzM2MDAxNjFcIiwgLy9SQyAzMzYwMDE2MSA6IE5ldnlwbG7Em27DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwMTYyXCIpOyAvL1JDIDMzNjAwMTYyIDogUHJvIGFrdHXDoWxuw60genDFr3NvYiBwbGF0YnkgbXVzw60gYsO9dCB2eXBsbsSbbiBiYW5rb3Zuw60gw7rEjWV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZUR0bzogSW50ZXJmYWNlLkdTbWxza2FsRHRvID0geyAuLi5vYmouY2VsbEluZm8uZGF0YSwgLi4uZGF0YSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2F2ZUR0by5mbGFnX0RCKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuU21sc2thbC51cGRhdGVEb2Qoc2F2ZUR0bykuZ2V0RGF0YSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKHhociwgdHlwZSwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIiAmJiB0aGlzLiRncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdGlvbnNcIiwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuU21sc2thbC5jcmVhdGVEb2Qoc2F2ZUR0bykuZ2V0RGF0YSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKHhociwgdHlwZSwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIiAmJiB0aGlzLiRncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdGlvbnNcIiwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjX2Vycm9yX21lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzX3BsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzBcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTYzXCIsIC8vUkMgMzM2MDAxNjMgOiBEb2RhdmF0ZWxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjogZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1ByZWZhYnMuU2VsZWN0LnNtbEthbEl4c0VzdVNtbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19lc3U9dmFsdWUuaXhzX2VzdTttb2RlbC5peHBfc21sX3ByaT0+dmFsdWUuaXhwX3NtbF9wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sX3ByaTogdGhhdC5zbWxwaWQuaXhwX3NtbF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/LmZsYWdzPy52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcImJ1X2NpXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpeHNfZXN1OiBjdHgudmFsdWUuaXhzX2VzdSwgYnVfY2k6IGN0eC52YWx1ZS5idV9jaSwgc2tfY2k6IGN0eC52YWx1ZS5za19jaSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X2NpXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNjRcIiwgLy9SQyAzMzYwMDE2NCA6IEJhbmtvdm7DrSDDusSNZXRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IFwie2J1X2NpOnRyaW06ZW5jb2RlfS97c2tfY2k6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtQcmVmYWJzLlNlbGVjdC5la29zdWNpKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMuYnVfY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT0+dmFsdWUuaXhzX2VzdTttb2RlbC5idV9jaT12YWx1ZS5idV9jaTttb2RlbC5za19jaT12YWx1ZS5za19jaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhzX2VzdVwiLCAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBudWxsKSB7IHJldHVybiB0aGF0LnNtbHBpZC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5peHNfZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UsIGZhbHNlLCB0aGF0LiRncmlkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KS5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmRhdF9wbGF0YnksXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNjVcIiwgLy9SQyAzMzYwMDE2NSA6IERhdHVtIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjogZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZGF0ZWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAxNjZcIiwgLy9SQyAzMzYwMDE2NiA6IERhdHVtIHBsYXRieSBtdXPDrSBiw710IHbEm3TFocOtIG5lxb4gZGF0dW0gdXphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoc3JjKS5nZmllbGQoXCJnZXRFcnJvcnNcIikubGVuZ3RoID4gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3BsYXRiYSBtdXPDrSBiw710IHbEm3TFocOtIG5lxb4gZGF0dW0gdXphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGwgZGF0X3BsYXRieV9ZMksuX3B1dCggc21scGlkX3AuZmlucHJpcGFkLmRhdF91emF2cmVuaSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKCF0aGF0LnNtbHBpZC5wcmlwYWQ/LmRhdF91emF2cmVuaSB8fCB2YWwgPCB0aGF0LnNtbHBpZC5wcmlwYWQ/LmRhdF91emF2cmVuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMTY3XCIsIC8vUkMgMzM2MDAxNjcgOiBEYXR1bSBwbGF0YnkgamUgdsSbdMWhw60gbmXFviBkYXR1bSBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNyYykuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDApIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8zNDIuMTEgMTUuMTEuMDEgLSBwb2Rtw61ua2EgZG9wbG7Em25hIG8gdHlwIHBsYXRub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKHRoYXQuc21scGlkLnR5cF9wbGF0bm9zdCA9PSBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0VXJjaXRhICYmICghdGhhdC5zbWxwaWQucHJpcGFkPy5kYXRfcGxhdG5vc3QgfHwgdmFsID4gdGhhdC5zbWxwaWQucHJpcGFkPy5kYXRfcGxhdG5vc3QpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/LmZsYWdzPy52YWxpZCAmJiBwYXJzZURhdGUoY3R4KS5nZXRGdWxsWWVhcigpICE9IHRoYXQuc21scGlkLm51bV9yb2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBub3bDqSBudW1fcG9sIHBvZGxlIGRhdF9wbGF0YnkgLSBwb2t1ZCBqZSBrb211bmlrYWNlIHMgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wcml6X2lpc3NwICE9IEludGVyZmFjZS5Lb211bmlrYWNlSUlTU1AubmdfcHJpemlpc3NwTm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5TbWxza2FsLmdldE51bVBvbEZvclllYXIoeyBpeHBfc21sX3ByaTogaW5mby5jZWxsSW5mby5kYXRhLml4cF9zbWxfcHJpLCB5ZWFyOiBwYXJzZURhdGUoY3R4KS5nZXRGdWxsWWVhcigpIH0pLmdldCgpLmRvbmUoKG51bV9wb2wpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcInpwXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBJaXNzcF9mcDogKG51bV9wb2wgPz8gMCkgPiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQb3BpcyhnZiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoe21heDogNTB9KV1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkQ2FzdGthQ1pLKGdmLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpbmZvLmNlbGxJbmZvLmRhdGEuc3RhdHVzX3BsYXRieSAhPSBJbnRlcmZhY2UuU3RhdHVzUGxhdGJ5Lm5nX3N0YXR1c3BsYXRieU5vbmUsIC8vZWRpdG92YXRlbG7DqSBwb3V6ZSBwb2t1ZCBuZW7DrSBibG9rb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE1lc3NhZ2U6ICh2YWx1ZSkgPT4geyByZXR1cm4gY19lcnJvcl9tZXNzYWdlOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoc3JjKS5nZmllbGQoXCJnZXRFcnJvcnNcIikubGVuZ3RoID4gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC4kZ3JpZC5maW5kRmllbGRzKFwiZGF0X3BsYXRieVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PSBudWxsKSB7IGNfZXJyb3JfbWVzc2FnZSA9IFwianJlczozMzYwMDE2OFwiOyByZXR1cm4gZmFsc2U7IH0gLy9SQyAzMzYwMDE2OCA6IE5lbsOtIHphZMOhbmEgcG92aW5uw6EgaG9kbm90YSAtIGRhdHVtIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3BsYXRieSA9IHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcImRhdF9wbGF0YnlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3pwaXNEYXRhID0gdGhhdC4kZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2t5OiBudW1iZXJbXSA9IHJvenBpc0RhdGEubWFwKHggPT4geC5yb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIHByb3RpIGhvZG5vdMSbIHNtbG91dnkgdiBkYW7DqW0gcm9jZSAtIHogZHluYW1pY2vDqWhvIHBvbGUgYWdyZWfDoXR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RSb2sgPSBuZXcgRGF0ZShkYXRfcGxhdGJ5KS5nZXRGdWxsWWVhcigpIC0gTWF0aC5taW4oLi4ucm9reSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RSb2sgPD0gcm9reS5pbmRleE9mKE1hdGgubWF4KC4uLnJva3kpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbChyb3pwaXNEYXRhW2FrdFJva10uY19wbGFuPz8wKS5taW51cyhwYXJzZURlY2ltYWwoaW5mby5jZWxsSW5mby5kYXRhLmM/PzApKS5wbHVzKHBhcnNlRGVjaW1hbCh2YWwpKS5ncmVhdGVyVGhhbihwYXJzZURlY2ltYWwocm96cGlzRGF0YVtha3RSb2tdLmM/PzApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGMgPSB0YmxfS2FsUm9rLmthbFJva1sgYWt0Um9rIF0uY19zbWxSb2sgLSB0YmxfS2FsUm9rLmthbFJva1sgYWt0Um9rIF0uY19rYWxSb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2Vycm9yX21lc3NhZ2UgPSBcImpyZXM6MzM2MDAxNjlcIjsgLy9SQyAzMzYwMDE2OSA6IEhvZG5vdGEgcG9sb8W+ZWsga2FsZW5kw6HFmWUgcMWZZXZ5xaF1amUgaG9kbm90dSByb3plcHNhbsO9Y2ggcHJvc3TFmWVka8WvIHYgZGFuw6ltIG9iZG9iw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlRGVjaW1hbChyb3pwaXNEYXRhW2FrdFJva10uY19wbGFuPz8wKS5taW51cyhwYXJzZURlY2ltYWwoaW5mby5jZWxsSW5mby5kYXRhLmM/PzApKS5wbHVzKHBhcnNlRGVjaW1hbCh2YWwpKS5sZXNzVGhhbigwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzYwLjIwIDExLjA2LjA5IHBvdm9sw61tIHphZMOhdmF0IGkgesOhcG9ybsOpIMSNw6FzdGt5IC0gY2Vrb3bEmyBuZXNtw60gcGzDoW4gcGFkbm91dCBwb2QgbnVsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGMgPSBrYWxha3QuYyAtIHRibF9LYWxSb2sua2FsUm9rWyBha3RSb2sgXS5jX2thbFJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZXJyb3JfbWVzc2FnZSA9IFwianJlczozMzYwMDE3MFwiOyAvL1JDIDMzNjAwMTcwIDogSG9kbm90YSBwb2xvxb5layBrYWxlbmTDocWZZSBuZXNtw60ga2xlc25vdXQgZG8gesOhcG9ybsOpIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2Vycm9yX21lc3NhZ2UgPSBcImpyZXM6MzM2MDAxNzFcIjsgLy9SQyAzMzYwMDE3MSA6IE5lbHplIGRlZmlub3ZhdCDEjcOhc3RrdSBwbGF0ZWJuw61obyBrYWxlbmTDocWZZSB2IG9iZG9iw60sIHBybyBrdGVyw6kgbmVuw60gcHJvdmVkZW4gcm96cGlzIHByb3N0xZllZGvFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRLcyhnZiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMua3MsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2tvcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3M9dmFsdWUua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGluZm8uY2VsbEluZm8uZGF0YS5rdGdfcGxhdGJ5ID09IEludGVyZmFjZS5LYXRlZ29yaWVQbGF0Ynkubmdfa3RncGxhdGJ5UG9oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVnMoZ2YsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpbmZvLmNlbGxJbmZvLmRhdGEua3RnX3BsYXRieSA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllUGxhdGJ5Lm5nX2t0Z3BsYXRieVBvaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFNzKGdmLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5zcyxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjogZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaW5mby5jZWxsSW5mby5kYXRhLmt0Z19wbGF0YnkgPT0gSW50ZXJmYWNlLkthdGVnb3JpZVBsYXRieS5uZ19rdGdwbGF0YnlQb2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy56cF90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNzJcIiwgLy9SQyAzMzYwMDE3MiA6IFpwxa9zb2IgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtQcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC56cD12YWx1ZS56cFwiLCAvLzttb2RlbC56cF96a3I9dmFsdWUuenBfemtyO21vZGVsLnpwX3R4dD12YWx1ZS56cF90eHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGluZm8uY2VsbEluZm8uZGF0YS5rdGdfcGxhdGJ5ID09IEludGVyZmFjZS5LYXRlZ29yaWVQbGF0Ynkubmdfa3RncGxhdGJ5UG9oLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l0ZW1UZW1wbGF0ZTogXCJ7enBfdHh0OnRyaW19XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogeyB6cDogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElpc3NwX2ZwOiAoaW5mby5jZWxsSW5mby5kYXRhLm51bV9wb2w/PzApID4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmFrdGl2aXRhLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5zdGF0dXNfcGxhdGJ5LFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFN0b3Jub3bDoW7DrSBha3R1w6FsbsSbIHZ5YnJhbsOpIHBsYXRieSovXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9ybm92YXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAxKSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxza2FsLnN0b3Jub0RvZChzZWxlY3Rpb25bMF0pLmdldERhdGEoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWR1IHMgcm96cGlzZW0gxI3DoXN0ZWsgcGxhdGViIHphIHJva3kgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVJvenBpc0dyaWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0YWIgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ0YWJSb3pwaXNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNzNcIiwgLy9SQyAzMzYwMDE3MyA6IFJvxI1uw60gcm96cGlzIHBsw6FudSBwbGF0ZWJcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KTtcclxuICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdncmlkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3pwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdTbWxzcm9rRHRvPih0aGlzLmlzbC5TbWxza2FsLmxpc3RSb3pwaXMoeyBmaWx0ZXJzOiB7IGl4cDogdGhpcy5zbWxwaWQuaXhwX3NtbF9wcmkgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNwb25zZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY19rYWwgPSBkYXRhLmRhdGEuZmluZCgoZWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiBlbC5yb2sgPT0gdGhpcy5yb2s7IH0pPy5jX3BsYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9ybVJvenBpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGNfc21sOiB0aGlzLnNtbHBpZC5wcmlwYWQ/LmMsIGNfa2FsOiBjX2thbCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiLCBcInJva1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVSb3pwaXNHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxNzRcIikgLy9SQyAzMzYwMDE3NCA6IENlbGtvdsOhIMSNw6FzdGthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxNzVcIikgLy9SQyAzMzYwMDE3NSA6IFBsw6FuIHBsYXRlYiB2IGFrdC4gcm9jZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19rYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy4kZm9ybVJvenBpcyA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRncmlkUm96cGlzID0gdGFiLmZpbmQoXCJbZGF0YS1oZWxwLWNvbnRleHQ9J2xpc3Q6Z3JpZFJvenBpcyddXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBwcm8gZ3JpZCBzIHJvenBpc2VtIMSNw6FzdGVrIHBsYXRlYiB6YSByb2t5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVSb3pwaXNHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1NtbHNrYWxEdG8+KCk7XHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNyb2tEdG9OYW1lcy5yb2ssXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNzZcIiwgLy9SQyAzMzYwMDE3NiA6IFJva1xyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNyb2tEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTc3XCIsIC8vUkMgMzM2MDAxNzcgOiDEjMOhc3RrYSB2IENaS1xyXG4gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNyb2tEdG9OYW1lcy5jX3BsYW4sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNzhcIiwgLy9SQyAzMzYwMDE3OCA6IFBsw6FuIHBsYXRlYiB6YSByb2tcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzcm9rRHRvTmFtZXMuY19yb3pkaWwsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNzlcIiwgLy9SQyAzMzYwMDE3OSA6IFJvemTDrWxcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=