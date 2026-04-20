"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaBGenerovani.ts                   </Name>
//    <Description> Content pro generování dávek složenek B                     </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-12-15                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro generování dávek složenek B */
            let GDavkaBGenerovani = class GDavkaBGenerovani extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createFilterPanel();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actGenerovat: {
                            caption: "jres:33600710", //RC 33600710 : Generovat
                            tooltip: "jres:33600711", //RC 33600711 : Tvorba vstupního datového souboru složenek typu B pro poštu
                            permission: this.Permissions.LzeGenerovat,
                            run: function (ev, ctx) {
                                this.setPending(that.generovat());
                            }
                        },
                        actStornovat: {
                            caption: "jres:33600712", //RC 33600712 : Stornovat
                            tooltip: "jres:33600713", //RC 33600713 : Vybrané pozastavené úhrady z tabulky budou stornovány - vráceny k opravě do agendy
                            permission: this.Permissions.LzeStornovat,
                            run: function (ev, ctx) {
                                this.setPending(that.stornovat());
                            }
                        },
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "buc_ptm_opislog",
                            ixsStr: that.buc_ptm_opislog,
                            serverParameterMethod: "Gordic.Buc.WebClient.GDavkaBGenerovani:PrintParameters",
                            reportStarting: function (rep) {
                                rep.customDto = { ikc: that.ikc };
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actGenerovat*", "actStornovat*", "actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel() {
                    let form = new Gordic.Forms.Form()
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:33600714", //RC 33600714 : Datum splatnosti od-do
                        name: "dat_spl"
                    }))
                        .addRow("jres:33600715", false, //RC 33600715 : Agenda
                    "jres:33600716") //RC 33600716 : Výběr agendy
                        .addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                        name: "typ_ag",
                        model: "model.typ_ag=value.typ_ag",
                        multi: true,
                        list: true,
                        itemWidth: "",
                        serverFilters: {
                            typ_ag: [100, 350, 270, 300, 70, 80, 430, 180, 230, 490]
                        }
                    })
                        .addRow("jres:33600717", false, //RC 33600717 : Bankovní účet vlastní
                    "jres:33600718") //RC 33600718 : Výběr poštovních poukázek B pro zvolený vlastní účet
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "ucet_vl",
                        model: "model.bu_vl=value.bu_vl;model.sk_vl=value.sk_vl;model.ucet_vl_rok=value.rok",
                        serverFilters: {
                            pristupKBU: 1, //čistě příznak, zda řešit
                            urovenPristupuKBU: 1, //čistě příznak, zda řešit
                            rezimVyberuDleKnihy: 0
                        }
                    })
                        .addRow("jres:33600719", false, //RC 33600719 : Banka
                    "jres:33600720") //RC 33600720 : Výběr banky
                        .addField("gselectbox", Gordic.Prefabs.Select.bucspba(), {
                        name: "banka_sk_vl",
                        model: "model.banka_ico=value.ico;model.banka_ucs=value.ucs;model.banka_ixs_esu=value.ixs_esu;model.banka_sbu=value.sbu"
                    });
                    if (this.rppUus != 0) {
                        form.addRow("jres:33600721", false, //RC 33600721 : Účtárna
                        "jres:33600722") //RC 33600722 : Výběr účtárny
                            .addField("gselectbox", {
                            name: "uus",
                            model: "model.uus=value.uus",
                            data: new Gordic.Data.View(this.uusArr),
                            dropdown: true
                        });
                    }
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [form],
                        favorites: [],
                        autoLoadAfter: [],
                        filterViewMode: FilterViewMode.Simple
                    });
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().css("height", "100%").appendTo(this.element).ggrid({
                        name: "gridDavkaBGenerovani",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaBGenerovani.list({ filters: { ikc: this.ikc }, fragments: ["*"] }), {
                            key: ["log_por_cislo", "radek_uhr", "ixp", "ikc"],
                            filterPanel: this.$filterPanel,
                            startEmpty: true,
                            onResponse: (response) => {
                                if ((response?.data?.length ?? 0) >= 1) {
                                    this.actions.actTisk?.updatePermission(this.Permissions.LzeTisk);
                                }
                                else {
                                    this.actions.actTisk?.updatePermission({ value: false });
                                }
                                return response;
                            }
                        }),
                        columnMode: "full",
                        multi: true,
                        //defaultProfile: {
                        //    sort: "ucet_vl,cis_pid,radek_pol,subradek",
                        //    condFormats: [
                        //        {
                        //            formula: "@c < 0",
                        //            description: "jres:33600494", //RC 33600494 : Částka menší než 0
                        //            text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                        //            applyTo: "c,c_mena"
                        //        }
                        //    ]
                        //},
                    }).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GDavkaBGenerovaniDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GDavkaBGenerovaniDtoNames.ucet_vl */
                    })
                        .addCurrencyColumn({
                        name: "c" /* Interface.GDavkaBGenerovaniDtoNames.c */,
                        caption: "jres:33600723", //RC 33600723 : Částka
                        width: 120
                    })
                        .addCurrencyColumn({
                        name: "c_saz" /* Interface.GDavkaBGenerovaniDtoNames.c_saz */,
                        caption: "jres:33600724", //RC 33600724 : Sazba
                        width: 70
                    })
                        .addDateColumn({
                        name: "dat_spl" /* Interface.GDavkaBGenerovaniDtoNames.dat_spl */,
                        caption: "jres:33600725", //RC 33600725 : Splatnost
                        width: 110
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GDavkaBGenerovaniDtoNames.nazev */,
                        caption: "jres:33600726", //RC 33600726 : Název adresáta
                        width: 300
                    })
                        .addNumberColumn({
                        name: "dsp" /* Interface.GDavkaBGenerovaniDtoNames.dsp */,
                        caption: "jres:33600727", //RC 33600727 : Služba
                        description: "jres:33600728", //RC 33600728 : Doplňková služba pošty
                        width: 32,
                        tooltipTemplate: (data) => { return data.dsp_txt ?? ""; },
                    })
                        .addAgenda({
                        name: "typ_ag_zkr" /* Interface.GDavkaBGenerovaniDtoNames.typ_ag_zkr */,
                    })
                        .addEvidencniCislo({
                        name: "ac" /* Interface.GDavkaBGenerovaniDtoNames.ac */
                    })
                        .addTextColumn({
                        name: "ulice" /* Interface.GDavkaBGenerovaniDtoNames.ulice */,
                        caption: "jres:33600729", //RC 33600729 : Ulice
                        width: 200
                    })
                        .addTextColumn({
                        name: "cpop" /* Interface.GDavkaBGenerovaniDtoNames.cpop */,
                        caption: "jres:33600730", //RC 33600730 : Číslo popisné
                        width: 80
                    })
                        .addTextColumn({
                        name: "cast_obce" /* Interface.GDavkaBGenerovaniDtoNames.cast_obce */,
                        caption: "jres:33600731", //RC 33600731 : Část obce
                        width: 160
                    })
                        .addTextColumn({
                        name: "obec" /* Interface.GDavkaBGenerovaniDtoNames.obec */,
                        caption: "jres:33600732", //RC 33600732 : Obec
                        width: 160
                    })
                        .addTextColumn({
                        name: "psc" /* Interface.GDavkaBGenerovaniDtoNames.psc */,
                        caption: "jres:33600733", //RC 33600733 : PSČ
                        width: 60
                    })
                        .addTextColumn({
                        name: "spe_adr" /* Interface.GDavkaBGenerovaniDtoNames.spe_adr */,
                        caption: "jres:33600734", //RC 33600734 : Specifikace adresáta
                        width: 160
                    })
                        .addTextColumn({
                        name: "zpr_adr" /* Interface.GDavkaBGenerovaniDtoNames.zpr_adr */,
                        caption: "jres:33600735", //RC 33600735 : Zpráva pro adresáta
                        width: 200
                    })
                        .addTextColumn({
                        name: "ixp" /* Interface.GDavkaBGenerovaniDtoNames.ixp */,
                        caption: "jres:33600736", //RC 33600736 : Identifikátor
                        width: 120
                    })
                        .addUus()
                        .addTextColumn({
                        name: "popis" /* Interface.GDavkaBGenerovaniDtoNames.popis */,
                        caption: "jres:33600737", //RC 33600737 : Popis
                        width: 120
                    })
                        .addNumberColumn({
                        name: "err_kod" /* Interface.GDavkaBGenerovaniDtoNames.err_kod */,
                        caption: "jres:33600738", //RC 33600738 : Error kód
                        width: 32
                    });
                    return gridFormat;
                }
                /** Hromadné generování souboru dávky */
                generovat() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    //dialog Zadání data splatnosti pro příkazy složenek (dlgDatSpl)
                    let dat_pla_initial = void 0;
                    if (this.buc_pdp > 9 && this.buc_pdp < 31) {
                        let date = parseDate(new Date(Date.now()));
                        date.setDate(date.getDate() + this.buc_pdp);
                        dat_pla_initial = date;
                    }
                    let form = new Gordic.Forms.Form()
                        .addRow("jres:33600741", true, //RC 33600741 : Datum splatnosti
                    "jres:33600742") //RC 33600742 : Zadejte datum splatnosti pro vygenerované příkazy za složenky
                        .addField("gdatebox", {
                        name: "dat_spl",
                        validators: [new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                message: "jres:33600743", //RC 33600743 : Datum splatnosti nemůže být menší než aktuální datum
                                validate: (value, src) => {
                                    let today = parseDate(new Date(Date.now()));
                                    let inputDate = parseDate(value);
                                    return inputDate >= today;
                                }
                            })]
                    })
                        .addRow("jres:33600744") //RC 33600744 : Datum podání
                        .addField("gdatebox", {
                        name: "dat_pod",
                        disabled: true,
                        initialValue: parseDate(new Date(Date.now())),
                    })
                        .addRow("jres:33600745") //RC 33600745 : Počet dní
                        .addField("gnumberbox", {
                        name: "poc_dni",
                        disabled: !(this.buc_pdp > 9 && this.buc_pdp < 31),
                        initialValue: (this.buc_pdp > 9 && this.buc_pdp < 31) ? this.buc_pdp : void 0,
                        validators: [new Gordic.Validators.Range({ min: 10, max: 30, stopping: false })],
                        change: (ev, ctx) => {
                            if (ctx.value || ctx.value == 0) {
                                let date = parseDate(new Date(Date.now()));
                                if (ctx.value > 9 && ctx.value < 31) {
                                    date.setDate(date.getDate() + ctx.value);
                                }
                                else {
                                    date = void 0;
                                }
                                $(ev.target).closest(".gform").findFields("dat_pla").gfield("setValue", date);
                            }
                        }
                    })
                        .addRow("jres:33600746") //RC 33600746 : Datum platnosti
                        .addField("gdatebox", {
                        name: "dat_pla",
                        disabled: true,
                        initialValue: dat_pla_initial,
                    });
                    return this.dialogs.simpleForm("jres:33600747", form).createDialogPromise().then((formData) => {
                        if (!formData.dat_spl) {
                            return $.Deferred().reject().promise();
                        }
                        let keysArr = rows.map((val, idx, arr) => { return { log_por_cislo: val.log_por_cislo, radek_uhr: val.radek_uhr, ixp: val.ixp, ikc: val.ikc }; });
                        return this.isl.BucDavkaBGenerovani.generovat({ ikc: this.ikc, keys: keysArr, dat_spl: formData.dat_spl, dat_pla: formData.dat_pla }).get().then((res) => {
                            //zobrazení dialogu s výslednými soubory
                            return Buc.Dialogs.GDavkaBGenerovaniSouboryDlg({
                                parentContent: this,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                opt: { fileInfos: res, ikc: this.ikc }
                            }).then((souboryDialogRes) => {
                                if (!souboryDialogRes?.uhradit) {
                                    return $.Deferred().reject().promise();
                                }
                                //přechod na uhrazení
                                return this.dialogs.confirm("jres:33600748").createDialogPromise(GDlg.mbbYes.id).then(() => {
                                    return this.isl.BucDavkaBGenerovani.uhradit({ ikc: this.ikc, keys: keysArr, dat_spl: formData.dat_spl, dat_pla: formData.dat_pla }).get();
                                });
                            });
                        }).always(() => {
                            //znovu načtení gridu - data v TMP byla pravděpodobně upravena
                            this.$filterPanel.gfilterpanel("applyFilter");
                        });
                    });
                }
                /** Hromadné storno vybraných položek */
                stornovat() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneStornoPolozekDavkaBGenerovaniBuc#",
                        title: "jres:33600739", //RC 33600739 : Hromadné storno položek
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { log_por_cislo: val.log_por_cislo, radek_uhr: val.radek_uhr, ixp: val.ixp, ikc: val.ikc }; });
                            return this.isl.BucDavkaBGenerovani.zkontrolujPredStorno({ keys: keysArr })
                                .get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600162", //RC 33600162 : Výběr záznamů
                            title: "jres:33600162", //RC 33600162 : Výběr záznamů
                            description: "jres:33600740", //RC 33600740 : Akce stornuje vybrané (zaškrtnuté) položky generování dávek B
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { log_por_cislo: val.log_por_cislo, radek_uhr: val.radek_uhr, ixp: val.ixp, ikc: val.ikc }; });
                                return this.isl.BucDavkaBGenerovani.hromadneStornovat({ keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { log_por_cislo: val.log_por_cislo, radek_uhr: val.radek_uhr, ixp: val.ixp, ikc: val.ikc }; });
                                return this.isl.BucDavkaBGenerovani.zkontrolujPredStorno({ keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600164", //RC 33600164 : Výsledek
                            title: "jres:33600165" //RC 33600165 : Výsledek hromadné operace
                        },
                        completeDelegate: (data) => {
                            if (data.getDataRows().some(x => x.wiz_kind == 200)) {
                                wizardChanged = true;
                            }
                        }
                    }).createDialogPromise().then(() => {
                        if (wizardChanged) {
                            //znovu načtení gridu
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                }
            };
            GDavkaBGenerovani = __decorate([
                Decorators.gcontent
            ], GDavkaBGenerovani);
            WebClient.GDavkaBGenerovani = GDavkaBGenerovani;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQkdlbmVyb3ZhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGF2a2FCR2VuZXJvdmFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQXNaZjtBQXRaRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzWm5CO0lBdFpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzWjdCO1FBdFpvQixXQUFBLFNBQVM7WUFDMUIsOENBQThDO1lBRTlDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQWlCL0MsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixZQUFZLEVBQUU7NEJBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7NEJBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsMkVBQTJFOzRCQUNyRyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZOzRCQUN6QyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs0QkFD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Q25FO3dCQUNELGdCQUFnQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztnQ0FDbEQsYUFBYSxHQUFHLElBQUksQ0FBQzs0QkFDekIsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQy9CLElBQUksYUFBYSxFQUFFLENBQUM7NEJBQ2hCLHFCQUFxQjs0QkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ2xELENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUE7WUFsWlksaUJBQWlCO2dCQUQ3QixVQUFVLENBQUMsUUFBUTtlQUNQLGlCQUFpQixDQWtaN0I7WUFsWlksMkJBQWlCLG9CQWtaN0IsQ0FBQTtRQUNMLENBQUMsRUF0Wm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXNaN0I7SUFBRCxDQUFDLEVBdFpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzWm5CO0FBQUQsQ0FBQyxFQXRaUyxNQUFNLEtBQU4sTUFBTSxRQXNaZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HRGF2a2FCR2VuZXJvdmFuaS50cyAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gZ2VuZXJvdsOhbsOtIGTDoXZlayBzbG/FvmVuZWsgQiAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTItMTUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIENvbnRlbnQgcHJvIGdlbmVyb3bDoW7DrSBkw6F2ZWsgc2xvxb5lbmVrIEIgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdmthQkdlbmVyb3ZhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBTZXJ2aWNlIFBlcm1pc3Npb25zICovXHJcbiAgICAgICAgcHJpdmF0ZSBQZXJtaXNzaW9uczogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pU2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIGlrYyAqL1xyXG4gICAgICAgIHByaXZhdGUgaWtjOiAvKm51bWJlciovc3RyaW5nO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgeiBnbG9iYWxzIHBybyB6b2JyYXplbsOtIFVVUyovXHJcbiAgICAgICAgcHJpdmF0ZSBycHBVdXM6IG51bWJlcjtcclxuICAgICAgICAvKiogw5rEjXTDoXJueSAoQnVjR2xvYmFscykqL1xyXG4gICAgICAgIHByaXZhdGUgdXVzQXJyOiBzdHJpbmdbXTtcclxuICAgICAgICAvKiogRGF0YWLDoXpvdsO9IHBhcmFtZXRyIHBybyB0aXNrIC0gQlVDIC0gVFQgS29udHJvbG7DrSBvcGlzIHNsb8W+ZW5layAoIEdSICkgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fb3Bpc2xvZzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgLSBCVUMgLSBQb8SNZXQgZG7DrSBwbGF0bm9zdGkgUFAgQiAqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3BkcDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgJGZpbHRlclBhbmVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0R2VuZXJvdmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzEwXCIsIC8vUkMgMzM2MDA3MTAgOiBHZW5lcm92YXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA3MTFcIiwgLy9SQyAzMzYwMDcxMSA6IFR2b3JiYSB2c3R1cG7DrWhvIGRhdG92w6lobyBzb3Vib3J1IHNsb8W+ZW5layB0eXB1IEIgcHJvIHBvxaF0dVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplR2VuZXJvdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZ2VuZXJvdmF0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm92YXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3MTJcIiwgLy9SQyAzMzYwMDcxMiA6IFN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDcxM1wiLCAvL1JDIDMzNjAwNzEzIDogVnlicmFuw6kgcG96YXN0YXZlbsOpIMO6aHJhZHkgeiB0YWJ1bGt5IGJ1ZG91IHN0b3Jub3bDoW55IC0gdnLDoWNlbnkgayBvcHJhdsSbIGRvIGFnZW5keVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplU3Rvcm5vdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vdmF0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImJ1Y19wdG1fb3Bpc2xvZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c1N0cjogdGhhdC5idWNfcHRtX29waXNsb2csXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUJHZW5lcm92YW5pOlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGlrYzogdGhhdC5pa2MgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RHZW5lcm92YXQqXCIsIFwiYWN0U3Rvcm5vdmF0KlwiLCBcImFjdFRpc2sqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZpbHRyIHBhbmVsdSBuYWQgZ3JpZGVtKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDcxNFwiLCAvL1JDIDMzNjAwNzE0IDogRGF0dW0gc3BsYXRub3N0aSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNzE1XCIsIGZhbHNlLCAvL1JDIDMzNjAwNzE1IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNzE2XCIpIC8vUkMgMzM2MDA3MTYgOiBWw71ixJtyIGFnZW5keVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3RhZygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfYWc9dmFsdWUudHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfYWc6IFsxMDAsIDM1MCwgMjcwLCAzMDAsIDcwLCA4MCwgNDMwLCAxODAsIDIzMCwgNDkwXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDcxN1wiLCBmYWxzZSwgLy9SQyAzMzYwMDcxNyA6IEJhbmtvdm7DrSDDusSNZXQgdmxhc3Ruw61cclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzM2MDA3MThcIikgLy9SQyAzMzYwMDcxOCA6IFbDvWLEm3IgcG/FoXRvdm7DrWNoIHBvdWvDoXplayBCIHBybyB6dm9sZW7DvSB2bGFzdG7DrSDDusSNZXRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNldF92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmJ1X3ZsPXZhbHVlLmJ1X3ZsO21vZGVsLnNrX3ZsPXZhbHVlLnNrX3ZsO21vZGVsLnVjZXRfdmxfcm9rPXZhbHVlLnJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpc3R1cEtCVTogMSwgLy/EjWlzdMSbIHDFmcOtem5haywgemRhIMWZZcWhaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJvdmVuUHJpc3R1cHVLQlU6IDEsIC8vxI1pc3TEmyBwxZnDrXpuYWssIHpkYSDFmWXFoWl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlemltVnliZXJ1RGxlS25paHk6IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA3MTlcIiwgZmFsc2UsIC8vUkMgMzM2MDA3MTkgOiBCYW5rYVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDcyMFwiKSAvL1JDIDMzNjAwNzIwIDogVsO9YsSbciBiYW5reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjc3BiYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiYW5rYV9za192bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmJhbmthX2ljbz12YWx1ZS5pY287bW9kZWwuYmFua2FfdWNzPXZhbHVlLnVjczttb2RlbC5iYW5rYV9peHNfZXN1PXZhbHVlLml4c19lc3U7bW9kZWwuYmFua2Ffc2J1PXZhbHVlLnNidVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ycHBVdXMgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjMzNjAwNzIxXCIsIGZhbHNlLCAvL1JDIDMzNjAwNzIxIDogw5rEjXTDoXJuYVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDcyMlwiKSAvL1JDIDMzNjAwNzIyIDogVsO9YsSbciDDusSNdMOhcm55XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnV1cz12YWx1ZS51dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy51dXNBcnIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZm9ybXM6IFtmb3JtXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW10sXHJcbiAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyOiBbXSxcclxuICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZ3JpZDxJbnRlcmZhY2UuR0RhdmthQkdlbmVyb3ZhbmlEdG8+KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERhdmthQkdlbmVyb3ZhbmlcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR0RhdmthQkdlbmVyb3ZhbmlEdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLkJ1Y0RhdmthQkdlbmVyb3ZhbmkubGlzdCh7IGZpbHRlcnM6IHsgaWtjOiB0aGlzLmlrYyB9LCBmcmFnbWVudHM6IFtcIipcIl0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcImxvZ19wb3JfY2lzbG9cIiwgXCJyYWRla191aHJcIiwgXCJpeHBcIiwgXCJpa2NcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNwb25zZTogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3BvbnNlPy5kYXRhPy5sZW5ndGggPz8gMCkgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMuTHplVGlzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL2RlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBzb3J0OiBcInVjZXRfdmwsY2lzX3BpZCxyYWRla19wb2wsc3VicmFkZWtcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBmb3JtdWxhOiBcIkBjIDwgMFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk0XCIsIC8vUkMgMzM2MDA0OTQgOiDEjMOhc3RrYSBtZW7FocOtIG5lxb4gMFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYXBwbHlUbzogXCJjLGNfbWVuYVwiXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgXVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEJhbmtvdm5pVWNldFZsYXN0bmkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLnVjZXRfdmxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzIzXCIsIC8vUkMgMzM2MDA3MjMgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLmNfc2F6LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDcyNFwiLCAvL1JDIDMzNjAwNzI0IDogU2F6YmFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMuZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3MjVcIiwgLy9SQyAzMzYwMDcyNSA6IFNwbGF0bm9zdFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzI2XCIsIC8vUkMgMzM2MDA3MjYgOiBOw6F6ZXYgYWRyZXPDoXRhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLmRzcCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3MjdcIiwgLy9SQyAzMzYwMDcyNyA6IFNsdcW+YmFcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNzI4XCIsIC8vUkMgMzM2MDA3MjggOiBEb3BsxYhrb3bDoSBzbHXFvmJhIHBvxaF0eVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLmRzcF90eHQgPz8gXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQWdlbmRhKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQkdlbmVyb3ZhbmlEdG9OYW1lcy50eXBfYWdfemtyLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRFdmlkZW5jbmlDaXNsbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMuYWNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMudWxpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzI5XCIsIC8vUkMgMzM2MDA3MjkgOiBVbGljZVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMuY3BvcCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3MzBcIiwgLy9SQyAzMzYwMDczMCA6IMSMw61zbG8gcG9waXNuw6lcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMuY2FzdF9vYmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDczMVwiLCAvL1JDIDMzNjAwNzMxIDogxIzDoXN0IG9iY2VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLm9iZWMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzMyXCIsIC8vUkMgMzM2MDA3MzIgOiBPYmVjXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQkdlbmVyb3ZhbmlEdG9OYW1lcy5wc2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzMzXCIsIC8vUkMgMzM2MDA3MzMgOiBQU8SMXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLnNwZV9hZHIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzM0XCIsIC8vUkMgMzM2MDA3MzQgOiBTcGVjaWZpa2FjZSBhZHJlc8OhdGFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLnpwcl9hZHIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzM1XCIsIC8vUkMgMzM2MDA3MzUgOiBacHLDoXZhIHBybyBhZHJlc8OhdGFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLml4cCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3MzZcIiwgLy9SQyAzMzYwMDczNiA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRVdXMoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0b05hbWVzLnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDczN1wiLCAvL1JDIDMzNjAwNzM3IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvTmFtZXMuZXJyX2tvZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3MzhcIiwgLy9SQyAzMzYwMDczOCA6IEVycm9yIGvDs2RcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIGdlbmVyb3bDoW7DrSBzb3Vib3J1IGTDoXZreSAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJvdmF0KCkge1xyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTU4XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTU4IDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcblxyXG4gICAgICAgICAgICAvL2RpYWxvZyBaYWTDoW7DrSBkYXRhIHNwbGF0bm9zdGkgcHJvIHDFmcOta2F6eSBzbG/FvmVuZWsgKGRsZ0RhdFNwbClcclxuICAgICAgICAgICAgbGV0IGRhdF9wbGFfaW5pdGlhbDogYW55ID0gdm9pZCAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idWNfcGRwID4gOSAmJiB0aGlzLmJ1Y19wZHAgPCAzMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBwYXJzZURhdGUobmV3IERhdGUoRGF0ZS5ub3coKSkpO1xyXG4gICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgdGhpcy5idWNfcGRwKTtcclxuICAgICAgICAgICAgICAgIGRhdF9wbGFfaW5pdGlhbCA9IGRhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNzQxXCIsIHRydWUsIC8vUkMgMzM2MDA3NDEgOiBEYXR1bSBzcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNzQyXCIpIC8vUkMgMzM2MDA3NDIgOiBaYWRlanRlIGRhdHVtIHNwbGF0bm9zdGkgcHJvIHZ5Z2VuZXJvdmFuw6kgcMWZw61rYXp5IHphIHNsb8W+ZW5reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDc0M1wiLCAvL1JDIDMzNjAwNzQzIDogRGF0dW0gc3BsYXRub3N0aSBuZW3Fr8W+ZSBiw710IG1lbsWhw60gbmXFviBha3R1w6FsbsOtIGRhdHVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvZGF5ID0gcGFyc2VEYXRlKG5ldyBEYXRlKERhdGUubm93KCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dERhdGUgPSBwYXJzZURhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0ZSA+PSB0b2RheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNzQ0XCIpIC8vUkMgMzM2MDA3NDQgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogcGFyc2VEYXRlKG5ldyBEYXRlKERhdGUubm93KCkpKSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc0NVwiKSAvL1JDIDMzNjAwNzQ1IDogUG/EjWV0IGRuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jX2RuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhKHRoaXMuYnVjX3BkcCA+IDkgJiYgdGhpcy5idWNfcGRwIDwgMzEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogKHRoaXMuYnVjX3BkcCA+IDkgJiYgdGhpcy5idWNfcGRwIDwgMzEpID8gdGhpcy5idWNfcGRwIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEwLCBtYXg6IDMwLCBzdG9wcGluZzogZmFsc2UgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZSB8fCBjdHgudmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGU6IERhdGUgfCB1bmRlZmluZWQgPSBwYXJzZURhdGUobmV3IERhdGUoRGF0ZS5ub3coKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjdHgudmFsdWUgYXMgbnVtYmVyKSA+IDkgJiYgKGN0eC52YWx1ZSBhcyBudW1iZXIpIDwgMzEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAoY3R4LnZhbHVlIGFzIG51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwiZGF0X3BsYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc0NlwiKSAvL1JDIDMzNjAwNzQ2IDogRGF0dW0gcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcGxhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBkYXRfcGxhX2luaXRpYWwsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzM2MDA3NDdcIiwgZm9ybSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKGZvcm1EYXRhKSA9PiB7IC8vUkMgMzM2MDA3NDcgOiBaYWTDoW7DrSBkYXR1bcWvXHJcbiAgICAgICAgICAgICAgICBpZiAoIWZvcm1EYXRhLmRhdF9zcGwpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gcm93cy5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgbG9nX3Bvcl9jaXNsbzogdmFsLmxvZ19wb3JfY2lzbG8sIHJhZGVrX3VocjogdmFsLnJhZGVrX3VociwgaXhwOiB2YWwuaXhwLCBpa2M6IHZhbC5pa2MgfSB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNEYXZrYUJHZW5lcm92YW5pLmdlbmVyb3ZhdCh7IGlrYzogdGhpcy5pa2MsIGtleXM6IGtleXNBcnIsIGRhdF9zcGw6IGZvcm1EYXRhLmRhdF9zcGwsIGRhdF9wbGE6IGZvcm1EYXRhLmRhdF9wbGEgfSkuZ2V0KCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy96b2JyYXplbsOtIGRpYWxvZ3UgcyB2w71zbGVkbsO9bWkgc291Ym9yeVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdEYXZrYUJHZW5lcm92YW5pU291Ym9yeURsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZE90ZXZyZW5pOiBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQ6IHsgZmlsZUluZm9zOiByZXMsIGlrYzogdGhpcy5pa2MgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHNvdWJvcnlEaWFsb2dSZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzb3Vib3J5RGlhbG9nUmVzPy51aHJhZGl0KSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcMWZZWNob2QgbmEgdWhyYXplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzM2MDA3NDhcIikuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZCkudGhlbigoKSA9PiB7IC8vUkMgMzM2MDA3NDggOiBQT1pPUiEgTmVqZMWvbGXFvml0xJtqxaHDrSBkb3RheiBwxZlpIHpwcmFjb3bDoW7DrSBzbG/FvmVuZWshIFBva3VkIHbDrXRlLCDFvmUgZ2VuZXJvdsOhbsOtIHNsb8W+ZW5layBkb3BhZGxvIHYgcG/FmcOhZGt1LCB1xb4gaG8gbmVjaGNldGUgb3Bha292YXQgem5vdnUgYSB1xb4gY2hjZXRlIHZ5Z2VuZXJvdmF0IHDFmcOta2F6eSBrIMO6aHJhZMSbIGEgdMOtbSBzbG/FvmVua3kgdnnFmWFkaXQsIGFieSB1xb4gc2UgbmVvYmpldm8gLSB2YWx5IHDFmWkgenByYWNvdsOhbsOtIHNsb8W+ZW5laywgdGFrIG9kcG92xJt6dGUgQU5PLiBQb2t1ZCBuYW9wYWsgY2hjZXRlIGdlbmVyb3bDoW7DrSBkw6F2a3kgb3Bha292YXQsIHByb3Rvxb5lIHNpIGNoY2V0ZSBkxJtsYXQga29waWksIG7Em2t0ZXLDoSBzbG/FvmVua2EgamUgY2h5Ym7DoSBhIGNoY2V0ZSBqaSBwb3phc3Rhdml0LCBhdGQuLCB0YWsgb2Rwb3bEm3p0ZSBORVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y0RhdmthQkdlbmVyb3ZhbmkudWhyYWRpdCh7IGlrYzogdGhpcy5pa2MsIGtleXM6IGtleXNBcnIsIGRhdF9zcGw6IGZvcm1EYXRhLmRhdF9zcGwsIGRhdF9wbGE6IGZvcm1EYXRhLmRhdF9wbGEgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy96bm92dSBuYcSNdGVuw60gZ3JpZHUgLSBkYXRhIHYgVE1QIGJ5bGEgcHJhdmTEm3BvZG9ibsSbIHVwcmF2ZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSBzdG9ybm8gdnlicmFuw71jaCBwb2xvxb5layAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vdmF0KCkge1xyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTU4XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTU4IDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIkdIcm9tYWRuZVN0b3Jub1BvbG96ZWtEYXZrYUJHZW5lcm92YW5pQnVjI1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDczOVwiLCAvL1JDIDMzNjAwNzM5IDogSHJvbWFkbsOpIHN0b3JubyBwb2xvxb5la1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEYXZrYUJHZW5lcm92YW5pRHRvPigpLmFkZCh0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0bywgXCJjb2x1bW5zXCI+KFwib3B0aW9uXCIsIFwiY29sdW1uc1wiKSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICBncmlkUHJvZmlsZTogdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR0RhdmthQkdlbmVyb3ZhbmlEdG8+KFwiZ2V0Q3VycmVudFByb2ZpbGVcIiksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HRGF2a2FCR2VuZXJvdmFuaUR0bz4oXCJnZXRWaWV3XCIpLmtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dzLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgbG9nX3Bvcl9jaXNsbzogdmFsLmxvZ19wb3JfY2lzbG8sIHJhZGVrX3VocjogdmFsLnJhZGVrX3VociwgaXhwOiB2YWwuaXhwLCBpa2M6IHZhbC5pa2MgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjRGF2a2FCR2VuZXJvdmFuaS56a29udHJvbHVqUHJlZFN0b3Jubyh7IGtleXM6IGtleXNBcnIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMTYyXCIsIC8vUkMgMzM2MDAxNjIgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNjJcIiwgLy9SQyAzMzYwMDE2MiA6IFbDvWLEm3IgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDc0MFwiLCAvL1JDIDMzNjAwNzQwIDogQWtjZSBzdG9ybnVqZSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBwb2xvxb5reSBnZW5lcm92w6Fuw60gZMOhdmVrIEJcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGxvZ19wb3JfY2lzbG86IHZhbC5sb2dfcG9yX2Npc2xvLCByYWRla191aHI6IHZhbC5yYWRla191aHIsIGl4cDogdmFsLml4cCwgaWtjOiB2YWwuaWtjIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNEYXZrYUJHZW5lcm92YW5pLmhyb21hZG5lU3Rvcm5vdmF0KHsga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgbG9nX3Bvcl9jaXNsbzogdmFsLmxvZ19wb3JfY2lzbG8sIHJhZGVrX3VocjogdmFsLnJhZGVrX3VociwgaXhwOiB2YWwuaXhwLCBpa2M6IHZhbC5pa2MgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y0RhdmthQkdlbmVyb3ZhbmkuemtvbnRyb2x1alByZWRTdG9ybm8oeyBrZXlzOiBrZXlzQXJyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE2NFwiLCAvL1JDIDMzNjAwMTY0IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE2NVwiIC8vUkMgMzM2MDAxNjUgOiBWw71zbGVkZWsgaHJvbWFkbsOpIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmdldERhdGFSb3dzKCkuc29tZSh4ID0+IHgud2l6X2tpbmQgPT0gMjAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXphcmRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aXphcmRDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy96bm92dSBuYcSNdGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==