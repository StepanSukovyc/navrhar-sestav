"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Detail pohybu
             *
             * @author Martin Boček
             * @since 480.1.0.12
             */
            let GDetailPlatby = class GDetailPlatby extends Gordic.GDetailBuilderContent {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    // jen nastavení okna
                    this.aktualizaceDetailu();
                }
                /**
                 * Obsluha události builderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderInit(builder) {
                    let that = this;
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("detail", {
                        actions: {
                            // akce pro menubar
                            actDetailPripadu: Gordic.Eko.Action.actionDetail({ caption: "jres:24100141", run: function () { this.setPending(that.detailPripadu()); } }), //RC 24100141 : Případ
                            actStorno: Gordic.Eko.Action.actionStornovat({ run: function () { this.setPending(that.storno()); } }),
                            actPrevodDoBanky: Gordic.Eko.Action.actionPrevest({ caption: "jres:24100201", icon: "gi-arrow", run: function () { this.setPending(that.prevod()); } }), //RC 24100201 : Převést do banky
                            actPrevodZBanky: Gordic.Eko.Action.actionPrevest({ caption: "jres:24100202", icon: "gi-arrow gi-rot180", run: function () { this.setPending(that.prevod()); } }), //RC 24100202 : Převést z banky
                            actObcerstveniPl: Gordic.Eko.Action.actionObcerstvit({ run: function () { this.setPending(that.reloadData()); } }),
                        },
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda(),
                            { id: "grpPohyby", caption: "Pohyby" }
                        ],
                        menuBar: [
                            //["jres:24100044",//RC 24100044 : Agenda
                            "actDetailPripadu",
                            "actPrevodDoBanky",
                            "actPrevodZBanky",
                            "actStorno",
                            "actObcerstveniPl",
                            WebClient.FucDetail.createMenuShare(that, that.Ixp, that.RadekUhr.toString(), "2", true)
                        ],
                        statusBar: [
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSUhrp" })
                        ],
                        tabs: {
                            tabPlatba: {
                                tabParams: {
                                    title: "Platba",
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: true,
                                    locked: false,
                                },
                                init: function (tab) {
                                    // TODO: doplnit
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formZpz", layoutDescriptor: "L2M2S1" })
                                        .addSection("Primární agenda")
                                        .addRow("Agenda").addField("gselectbox", Gordic.Prefabs.Select.ginctag(), { disabled: true, name: "typ_ag", model: "typ_ag=typ_ag;zkr_ag=typ_ag_zkr" })
                                        .addSection("jres:24100324") //RC 24100324 : Externí subjekt
                                        .addPrefab(WebClient.FucDetail.prefabEsuPam(that.DetailDto.ixs_esu))
                                        .addSection("Bankovní údaje")
                                        .addRow("Bankovní účet vlastní").addField("gstringbox", { disabled: true, name: "bu_vl_txt" })
                                        .addRow("Bankovní účet cizí").addField("gstringbox", { disabled: true, name: "bu_ci_txt" })
                                        .addPrefab(WebClient.FucDetail.prefabVsKsSs())
                                        .addSection("Částka")
                                        .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "mena", model: "mena=mena;mena_zkr=mena_sis_aaa" }) //RC 24100082 : Částka v měně
                                        .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c" }) //RC 24100083 : Částka v CZK
                                        .addSection("Data")
                                        .addRow("Datum k úhradě").addField("gdatebox", { disabled: true, name: "dat_kuhr" })
                                        .addRow("Datum zaplacení").addField("gdatebox", { disabled: true, name: "dat_zap" })
                                        .addRow("Datum párování").addField("gdatebox", { disabled: true, name: "dat_par" })
                                        .addSection("Popis")
                                        //.addRow("Popis").addField("gstringbox", { disabled: true, name: "popis" })
                                        // TODO: inf12 nezobrazovat, informace pro příjemce je v bucdpep.popis (inf1, inf2 a inf12 by pak šlo z DTO odstranit)
                                        .addRow("Informace pro příjemce").addField("gstringbox", { disabled: true, name: "inf12", rows: 2 }));
                                }
                            },
                            tabExtSys: {
                                tabParams: {
                                    title: "Externí systém",
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: false,
                                    locked: false,
                                },
                                init: function (tab) {
                                    // TODO: doplnit
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formZpz", layoutDescriptor: "L2M2S1" })
                                        .addSection("Agenda INT")
                                        .addRow("Externí systém").addField("gselectbox", Gordic.Prefabs.Select.intsext(), { disabled: true, name: "ixs_ext", model: "ixs_ext=ixs_ext;ixs_ext_txt=ixs_ext_txt" })
                                        .addRow("Pořadové číslo").addField("gnumberbox", { disabled: true, name: "por_cislo_int_vyp", defaultValue: null })
                                        .addRow("Id platby").addField("gstringbox", { disabled: true, name: "id_platby" }));
                                }
                            },
                            tabPohyby: {
                                // pohyby
                                tabParams: {
                                    title: "Pohyby",
                                    group: { id: "grpPohyby" },
                                    opened: false,
                                    locked: false,
                                },
                                init: function (tab) {
                                    // přidání gridu předkontací do tabu
                                    that.$gridPohyby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridPohyby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                        // defaultAction: 
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Platba.createGridFormatPohyby(that)
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            }
                        }
                    }, true);
                    // nastavení kpipanelu
                    $.extend(builder.kpiPanelOptions, { sortable: true });
                }
                /**
                 * Obsluha události builderBuild
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderBuild(builder) {
                    let that = this;
                    // napojení standardní EKO hlavičky
                    // úprava druhé a třetí sekce (položky a stav místo kompetenta a realizátora)
                    const formSetup = {};
                    const headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                        .addSection()
                        .addRow("Řádek úhrady").addField("gnumberbox", { disabled: true, model: "radek_uhr" })
                        .addSection()
                        .addRow("Způsob úhrady").addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), { disabled: true, dropdown: true, model: "zp=zp" })
                        .addSection()
                        .addRow("Stav úhrady").addField("gselectbox", Gordic.Prefabs.Select.buccuhr(), { disabled: true, dropdown: true, model: "s_uhrp=s_uhrp" });
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Id)[0]?.item, // PID
                            headerForm.form.sections[0].rows[0] // řádek pohybu
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            headerForm.form.sections[1].rows[0], // druh pohybu
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.DatumEvidence)[0]?.item // datum splatnosti
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            headerForm.form.sections[2].rows[0] // stav úhrady
                        ]
                    };
                    // vlastní nastavení prvků (převážně model). pozor, nesmí se měnit name
                    formSetup[Gordic.Eko.HeaderForm.Fields.DatumEvidence] = { options: { model: "dat_spl", valueType: "date" } };
                    // jiný label pro datum
                    formSetup[Gordic.Eko.HeaderForm.Rows.DatumEvidence] = { label: "Datum splatnosti" };
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava menu a položek
                    WebClient.FucDetail.changeBuilderDefinition(builder);
                    // šipky pro posun po seznamu
                    this.listControls_setup({
                        rowToDto: function (gridState) {
                            return {
                                Ixp: gridState.currentRow.data.ixp,
                                RadekUhr: gridState.currentRow.data.radek_uhr,
                                NasledujiciDetail: true
                            };
                        },
                        // TODO: nedat tam místo PIDu ac (nebo co je v Guptě)?
                        nextItemTemplate: "Následující: {ixp} - {radek_uhr}",
                        prevItemTemplate: "Předchozí: {ixp} - {radek_uhr}",
                        beforeMove: that.closing
                    });
                }
                /**
                 * Obsluha aktivní operace
                 *
                 * @param {JQuery.Event} ev událost
                 * @param {any} ctx? původní událost a její argumenty
                 */
                onDetailBuilderActiveOp(ev, ctx) {
                    this.setActiveOperationAndReloadData(true);
                }
                /**
                 * Zobrazení detailu případu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPripadu() {
                    let that = this;
                    // příznak aktivní operace
                    let needRefresh = false;
                    // otevření detailu
                    // TODO: zatím je zakomentován posun po řádku - pokud by se povolil, musel bych řešit na detailu případu posun po různých typech seznamů
                    let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailPripadu" /*, { gridRemoteControl: new Gordic.Components.GridRC(that.$grid) }*/], {
                        ID: 'DetailPripadu#',
                        IxpUpr: that.DetailDto.ixp
                    });
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                        // záznam byl změněn, musí se načíst znovu
                        if (retVal?.data?.ixp_upr) {
                            // bude se občerstvovat
                            needRefresh = true;
                        }
                    });
                    // obsluha ukončení okna
                    $detailWindow.on("closed", (retVal) => {
                        // aktualizace detailu (byla-li aktivní operace v otevřeném detailu)
                        if (needRefresh) {
                            that.setActiveOperationAndReloadData();
                        }
                    });
                    return $detailWindow.createDialogPromise();
                }
                /**
                 * Převod platby
                 */
                prevod() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithConfirm(this, that.DetailDto.JeVBance
                        ? "jres:24100276" //RC 24100276 : Opravdu chcete stáhnout platbu z banky?
                        : "jres:24100277", //RC 24100277 : Opravdu chcete přesunout platbu do banky?
                    () => { return that.isl.Platba.preved({ do_banky: !that.DetailDto.JeVBance, rows: [that.DetailDto] }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeVBance ? that.actions.actPrevodZBanky : that.actions.actPrevodDoBanky);
                }
                /**
                 * Storno / zrušení storna platby
                 */
                storno() {
                    let that = this;
                    // zadání důvodu a volání storna / zrušení storna
                    // TODO: (zatím) je podporováno jen storno. do textu doplnit info o tom, že to nejde vrátit zpátky (v průvodci něco takového je?)
                    if (that.DetailDto.JeStornovana === false) {
                        // TODO: dodělat (bude jen možnost storna a to včetně předpisů nebo bez nich (jako v hromadném stornu))
                        return WebClient.FucDetail.runIslActionWithForm(this, {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-2-10-0" })
                                .addRow().addField("gstatic", {
                                caption: that.DetailDto.JeStornovana
                                    ? "jres:24100291" //RC 24100291 : Opravdu chcete zrušit storno platby?
                                    : "jres:24100292" //RC 24100292 : Opravdu chcete stornovat platbu? Storno není možné vrátit zpět!
                            })
                                .addRow().addField("gcheck", { name: "storno_nav_predp", label: "jres:24100293" }) //RC 24100293 : stornovat i případné navázané předpisy
                                .addRow("jres:24100294").addField("gstringbox", { name: "duvod", validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] }) //RC 24100294 : Důvod
                        }, (data) => { return that.isl.Platba.stornuj({ stornovat: !that.DetailDto.JeStornovana, i_navazane_predpisy: data.storno_nav_predp, duvod: data.duvod, rows: [that.DetailDto] }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeStornovana ? that.actions.actZrusitStorno : that.actions.actStorno);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // akce
                    const acts = this.actions;
                    const perms = this.DetailDto.Permissions;
                    acts.actStorno.updatePermission(perms ? perms.LzeStornovat : undefined);
                    acts.actPrevodDoBanky.updatePermission(perms ? perms.LzePrevestDoBanky : undefined);
                    acts.actPrevodZBanky.updatePermission(perms ? perms.LzePrevestZBanky : undefined);
                    acts.actDetailPripadu.updatePermission(perms ? perms.LzeZobrazit : undefined);
                    acts.actObcerstveniPl.updatePermission({ value: true });
                    // TODO: ještě chybí rezervace ve státní pokladně, ale nevím, jestli to vůbec někdo někdy použil
                    // status bar
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSUhrp"], this.DetailDto.s_uhrp_txt?.toUpperCase() ?? "", (this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.KUhrade || this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.Odeslana
                        ? Gordic.Eko.Utils.RecordFormatType.Schvaleno
                        : (this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.Zauctovana || this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.KZauctovani || this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.Uhrazena || this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.Sparovana
                            ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                            : (this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.Storno || this.DetailDto.s_uhrp === Gordic.Fuc.Globals.Enums.SUhrp.StornoBanky
                                ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                                : null))));
                }
                /**
                 * Nastavení příznaku aktivní operace a aktualizace detailu
                 *
                 * @param {boolean} withoutReload (default = false) true = neaktualizovat formulář
                 * @returns {JQuery.Promise<any>} promise
                 */
                setActiveOperationAndReloadData(withoutReload = false) {
                    // vyvolání trigger o aktivní operaci
                    this.trigger(WebClient.FucDetail.triggerChange, [{ data: this.DetailDto }]);
                    // aktualizace detailu
                    if (!withoutReload) {
                        this.element.trigger("rememberinitialopen");
                        return this.load();
                    }
                    else
                        return $.Deferred().resolve().promise();
                }
                /**
                 * Znovu načte celý formulář
                 *
                 * @returns {JQuery.Promise<any>} promise
                 */
                reloadData() {
                    this.element.trigger("rememberinitialopen");
                    return this.load();
                }
                /**
                 * Aktualizace dat v detailu podle modelu a nastavení stavu prvků
                 */
                aktualizaceDetailu() {
                    // naplnění políček
                    // TODO: nechat DetailDto nebo to přejmenovat zpátky na model? nějak to dořešit, v kódu totiž používám oboje
                    this.findFields()
                        .gfield("model", "apply", this.DetailDto, { initialValues: true })
                        .gfield("model", "validators", this.validators);
                    // naplnění seznamu pohybů
                    if (this.DetailDto?.pohyby) {
                        let view = new Gordic.Data.View(this.DetailDto.pohyby, { key: "ixp,radek_uhr,por_cislo" });
                        // nastavení dat a překreslení gridu
                        this.$gridPohyby.ggrid("setData", view);
                    }
                    // nastavení stavu políček a akcí
                    this.enable();
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GPlatbaDto> | Interface.GPlatbaDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    // TODO: pravděpodobně nepůjde pohyb přímo editovat, takže tohle tady bude zbytečné
                    let formChanged = this.findForms().gform("hasChanged");
                    // TODO: dodat správnou podmínku - u zápočtových listů je if ((this.Editace || this.JePodan) && formChanged) {
                    if (true && formChanged) {
                        // dotaz na zavření bez uložení, protože se něco změnilo
                        // TODO: pokud by bylo potřeba (zatím se neukládá), tak dopracovat
                        return that.DetailDto;
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        return that.DetailDto;
                    }
                }
            };
            GDetailPlatby = __decorate([
                gcontent
            ], GDetailPlatby);
            WebClient.GDetailPlatby = GDetailPlatby;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFBsYXRieS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxQbGF0YnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW9iZjtBQXBiRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvYm5CO0lBcGJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvYjdCO1FBcGJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUtuQzs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLHFCQUF3QztnQkE4QnZFOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixxQkFBcUI7b0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUM5QixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNJLG1CQUFtQixDQUFDLE9BQWdEO29CQUV2RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLHVDQUF1QztvQkFDdkMsT0FBTyxDQUFDLGFBQWEsQ0FBTyxRQUFRLEVBQUU7d0JBQ2xDLE9BQU8sRUFBRTs0QkFDTCxtQkFBbUI7NEJBQ25CLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsc0JBQXNCOzRCQUNuSyxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFD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QVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDdkQsOEdBQThHO29CQUM5RyxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQzt3QkFDdEIsd0RBQXdEO3dCQUN4RCxrRUFBa0U7d0JBQ2xFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDMUIsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLDZDQUE2Qzt3QkFDN0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMxQixDQUFDO2dCQUNMLENBQUM7YUFFSixDQUFBO1lBdGFZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBc2F6QjtZQXRhWSx1QkFBYSxnQkFzYXpCLENBQUE7UUFDTCxDQUFDLEVBcGJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvYjdCO0lBQUQsQ0FBQyxFQXBiZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb2JuQjtBQUFELENBQUMsRUFwYlMsTUFBTSxLQUFOLE1BQU0sUUFvYmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkZ1Yy5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBEdG9UeXBlUGxhID0gR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BsYXRiYUR0bztcclxuICAgIGV4cG9ydCB0eXBlIFVzZWRDb21wb25lbnRzUGxhID0gR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuRnVjLkludGVyZmFjZS5HUGxhdGJhRHRvPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCBwb2h5YnVcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjEyXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxQbGF0YnkgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNQbGE+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkUG9oeWJ5OiBKUXVlcnk7XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBJRCBwbGF0YnlcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogxZjDoWRlayDDumhyYWR5XHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFJhZGVrVWhyOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRFRPIGRldGFpbHUgcG9oeWJ1XHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5GdWMuSW50ZXJmYWNlLkdQbGF0YmFEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQbGF0YmFEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvcnlcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0W119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3JzOiBvYmplY3RbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkZWZpbm92w6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBqZW4gbmFzdGF2ZW7DrSBva25hXHJcbiAgICAgICAgICAgIHRoaXMuYWt0dWFsaXphY2VEZXRhaWx1KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIHVkw6Fsb3N0aSBidWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGFrY8OtLCB0YWLFrywga3BpLCBtZW51IGFwb2QuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcImRldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gbWVudWJhclxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbFByaXBhZHU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IGNhcHRpb246IFwianJlczoyNDEwMDE0MVwiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsUHJpcGFkdSgpKTsgfSB9KSwgLy9SQyAyNDEwMDE0MSA6IFDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TdG9ybm92YXQoeyBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vKCkpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByZXZvZERvQmFua3k6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZXZlc3QoeyBjYXB0aW9uOiBcImpyZXM6MjQxMDAyMDFcIiwgaWNvbjogXCJnaS1hcnJvd1wiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQucHJldm9kKCkpOyB9IH0pLCAvL1JDIDI0MTAwMjAxIDogUMWZZXbDqXN0IGRvIGJhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJldm9kWkJhbmt5OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmV2ZXN0KHsgY2FwdGlvbjogXCJqcmVzOjI0MTAwMjAyXCIsIGljb246IFwiZ2ktYXJyb3cgZ2ktcm90MTgwXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5wcmV2b2QoKSk7IH0gfSksIC8vUkMgMjQxMDAyMDIgOiBQxZlldsOpc3QgeiBiYW5reVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2ZW5pUGw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoeyBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQucmVsb2FkRGF0YSgpKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBQb2h5YnlcIiwgY2FwdGlvbjogXCJQb2h5YnlcIiB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vW1wianJlczoyNDEwMDA0NFwiLC8vUkMgMjQxMDAwNDQgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbFByaXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZXZvZERvQmFua3lcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZXZvZFpCYW5reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaVBsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRnVjRGV0YWlsLmNyZWF0ZU1lbnVTaGFyZSh0aGF0LCB0aGF0Lkl4cCwgdGhhdC5SYWRla1Voci50b1N0cmluZygpLCBcIjJcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclNVaHJwXCIgfSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUGxhdGJhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUGxhdGJhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1acHpcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUHJpbcOhcm7DrSBhZ2VuZGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWdlbmRhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3RhZygpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInR5cF9hZ1wiLCBtb2RlbDogXCJ0eXBfYWc9dHlwX2FnO3prcl9hZz10eXBfYWdfemtyXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAzMjRcIikgLy9SQyAyNDEwMDMyNCA6IEV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEZ1Y0RldGFpbC5wcmVmYWJFc3VQYW0odGhhdC5EZXRhaWxEdG8uaXhzX2VzdSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJCYW5rb3Zuw60gw7pkYWplXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJhbmtvdm7DrSDDusSNZXQgdmxhc3Ruw61cIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnVfdmxfdHh0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCBjaXrDrVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidV9jaV90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlZzS3NTcygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwixIzDoXN0a2FcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4MlwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiY19tZW5hXCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwibWVuYVwiLCBtb2RlbDogXCJtZW5hPW1lbmE7bWVuYV96a3I9bWVuYV9zaXNfYWFhXCIgfSkgLy9SQyAyNDEwMDA4MiA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODNcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImNcIiB9KSAvL1JDIDI0MTAwMDgzIDogxIzDoXN0a2EgdiBDWktcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gayDDumhyYWTEm1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiZGF0X2t1aHJcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSB6YXBsYWNlbsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJkYXRfemFwXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gcMOhcm92w6Fuw61cIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImRhdF9wYXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJQb3Bpc1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJwb3Bpc1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaW5mMTIgbmV6b2JyYXpvdmF0LCBpbmZvcm1hY2UgcHJvIHDFmcOtamVtY2UgamUgdiBidWNkcGVwLnBvcGlzIChpbmYxLCBpbmYyIGEgaW5mMTIgYnkgcGFrIMWhbG8geiBEVE8gb2RzdHJhbml0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJbmZvcm1hY2UgcHJvIHDFmcOtamVtY2VcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiaW5mMTJcIiwgcm93czogMiB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkV4dFN5czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkV4dGVybsOtIHN5c3TDqW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1acHpcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiQWdlbmRhIElOVFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJFeHRlcm7DrSBzeXN0w6ltXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuaW50c2V4dCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcIml4c19leHRcIiwgbW9kZWw6IFwiaXhzX2V4dD1peHNfZXh0O2l4c19leHRfdHh0PWl4c19leHRfdHh0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/FmWFkb3bDqSDEjcOtc2xvXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInBvcl9jaXNsb19pbnRfdnlwXCIsIGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZCBwbGF0YnlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiaWRfcGxhdGJ5XCIgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJQb2h5Ynk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBQb2h5YnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZ3JpZHUgcMWZZWRrb250YWPDrSBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUG9oeWJ5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliUGxhdGJ5RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFBvaHlieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDoSBkZWZhdWx0bsOtIGFrY2U/IGplc3RsaSBhbm8sIHRhayBidcSPIG9wcmF2YSBwb2xvxb5reSBuZWJvIG7Em2pha8O9IG5vdsO9IGRldGFpbCBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJ2c1wiLCBcImNcIiwgXCJ0eXBfYWdcIiwgXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5QbGF0YmEuY3JlYXRlR3JpZEZvcm1hdFBvaHlieSh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGtwaXBhbmVsdVxyXG4gICAgICAgICAgICAkLmV4dGVuZChidWlsZGVyLmtwaVBhbmVsT3B0aW9ucywgeyBzb3J0YWJsZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIGJ1aWxkZXJCdWlsZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXBvamVuw60gc3RhbmRhcmRuw60gRUtPIGhsYXZpxI1reVxyXG4gICAgICAgICAgICAvLyDDunByYXZhIGRydWjDqSBhIHTFmWV0w60gc2VrY2UgKHBvbG/Fvmt5IGEgc3RhdiBtw61zdG8ga29tcGV0ZW50YSBhIHJlYWxpesOhdG9yYSlcclxuICAgICAgICAgICAgY29uc3QgZm9ybVNldHVwID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1IZWFkZXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsWYw6FkZWsgw7pocmFkeVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbW9kZWw6IFwicmFkZWtfdWhyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacMWvc29iIMO6aHJhZHlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHsgZGlzYWJsZWQ6IHRydWUsIGRyb3Bkb3duOiB0cnVlLCBtb2RlbDogXCJ6cD16cFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiDDumhyYWR5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjY3VocigpLCB7IGRpc2FibGVkOiB0cnVlLCBkcm9wZG93bjogdHJ1ZSwgbW9kZWw6IFwic191aHJwPXNfdWhycFwiIH0pO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkluZm9dID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5JZClbMF0/Lml0ZW0sIC8vIFBJRFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVswXSAvLyDFmcOhZGVrIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGExXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMF0sIC8vIGRydWggcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLkRhdHVtRXZpZGVuY2UpWzBdPy5pdGVtIC8vIGRhdHVtIHNwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzBdIC8vIHN0YXYgw7pocmFkeVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICAvLyB2bGFzdG7DrSBuYXN0YXZlbsOtIHBydmvFryAocMWZZXbDocW+bsSbIG1vZGVsKS4gcG96b3IsIG5lc23DrSBzZSBtxJtuaXQgbmFtZVxyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5EYXR1bUV2aWRlbmNlXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJkYXRfc3BsXCIsIHZhbHVlVHlwZTogXCJkYXRlXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgLy8gamluw70gbGFiZWwgcHJvIGRhdHVtXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5EYXR1bUV2aWRlbmNlXSA9IHsgbGFiZWw6IFwiRGF0dW0gc3BsYXRub3N0aVwiIH0gYXMgRm9ybXMuRm9ybVJvdztcclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5zZXR1cChidWlsZGVyLCBmb3JtU2V0dXApO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBtZW51IGEgcG9sb8W+ZWtcclxuICAgICAgICAgICAgRnVjRGV0YWlsLmNoYW5nZUJ1aWxkZXJEZWZpbml0aW9uKGJ1aWxkZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gxaFpcGt5IHBybyBwb3N1biBwbyBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWtVaHI6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEucmFkZWtfdWhyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXNsZWR1amljaURldGFpbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmVkYXQgdGFtIG3DrXN0byBQSUR1IGFjIChuZWJvIGNvIGplIHYgR3VwdMSbKT9cclxuICAgICAgICAgICAgICAgIG5leHRJdGVtVGVtcGxhdGU6IFwiTsOhc2xlZHVqw61jw606IHtpeHB9IC0ge3JhZGVrX3Vocn1cIixcclxuICAgICAgICAgICAgICAgIHByZXZJdGVtVGVtcGxhdGU6IFwiUMWZZWRjaG96w606IHtpeHB9IC0ge3JhZGVrX3Vocn1cIixcclxuICAgICAgICAgICAgICAgIGJlZm9yZU1vdmU6IHRoYXQuY2xvc2luZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkV2ZW50fSBldiB1ZMOhbG9zdFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBjdHg/IHDFr3ZvZG7DrSB1ZMOhbG9zdCBhIGplasOtIGFyZ3VtZW50eVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJBY3RpdmVPcChldjogSlF1ZXJ5LkV2ZW50LCBjdHg/OiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBwxZnDrXBhZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxQcmlwYWR1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZw616bmFrIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgICAgbGV0IG5lZWRSZWZyZXNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgLy8gVE9ETzogemF0w61tIGplIHpha29tZW50b3bDoW4gcG9zdW4gcG8gxZnDoWRrdSAtIHBva3VkIGJ5IHNlIHBvdm9saWwsIG11c2VsIGJ5Y2ggxZllxaFpdCBuYSBkZXRhaWx1IHDFmcOtcGFkdSBwb3N1biBwbyByxa96bsO9Y2ggdHlwZWNoIHNlem5hbcWvXHJcbiAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93ID0gdGhpcy5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxQcmlwYWR1XCIvKiwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGF0LiRncmlkKSB9Ki9dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsUHJpcGFkdSMnLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4cFVwcjogdGhhdC5EZXRhaWxEdG8uaXhwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gesOhem5hbSBieWwgem3Em27Em24sIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5kYXRhPy5peHBfdXByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVkZSBzZSBvYsSNZXJzdHZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICRkZXRhaWxXaW5kb3cub24oXCJjbG9zZWRcIiwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1IChieWxhLWxpIGFrdGl2bsOtIG9wZXJhY2UgdiBvdGV2xZllbsOpbSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRkZXRhaWxXaW5kb3cuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZZXZvZCBwbGF0YnlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZXZvZCgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aENvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVWQmFuY2VcclxuICAgICAgICAgICAgICAgICAgICA/IFwianJlczoyNDEwMDI3NlwiIC8vUkMgMjQxMDAyNzYgOiBPcHJhdmR1IGNoY2V0ZSBzdMOhaG5vdXQgcGxhdGJ1IHogYmFua3k/XHJcbiAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MjQxMDAyNzdcIiwgLy9SQyAyNDEwMDI3NyA6IE9wcmF2ZHUgY2hjZXRlIHDFmWVzdW5vdXQgcGxhdGJ1IGRvIGJhbmt5P1xyXG4gICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5pc2wuUGxhdGJhLnByZXZlZCh7IGRvX2Jhbmt5OiAhdGhhdC5EZXRhaWxEdG8uSmVWQmFuY2UsIHJvd3M6IFt0aGF0LkRldGFpbER0b10gfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVWQmFuY2UgPyB0aGF0LmFjdGlvbnMuYWN0UHJldm9kWkJhbmt5ISA6IHRoYXQuYWN0aW9ucy5hY3RQcmV2b2REb0Jhbmt5IVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3Rvcm5vIC8genJ1xaFlbsOtIHN0b3JuYSBwbGF0YnlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHN0b3JubygpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHphZMOhbsOtIGTFr3ZvZHUgYSB2b2zDoW7DrSBzdG9ybmEgLyB6cnXFoWVuw60gc3Rvcm5hXHJcbiAgICAgICAgICAgIC8vIFRPRE86ICh6YXTDrW0pIGplIHBvZHBvcm92w6FubyBqZW4gc3Rvcm5vLiBkbyB0ZXh0dSBkb3Bsbml0IGluZm8gbyB0b20sIMW+ZSB0byBuZWpkZSB2csOhdGl0IHpww6F0a3kgKHYgcHLFr3ZvZGNpIG7Em2NvIHRha292w6lobyBqZT8pXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRldGFpbER0by5KZVN0b3Jub3ZhbmEgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCAoYnVkZSBqZW4gbW/Fvm5vc3Qgc3Rvcm5hIGEgdG8gdsSNZXRuxJsgcMWZZWRwaXPFryBuZWJvIGJleiBuaWNoIChqYWtvIHYgaHJvbWFkbsOpbSBzdG9ybnUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoRm9ybShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTItMTAtMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnc3RhdGljXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0LkRldGFpbER0by5KZVN0b3Jub3ZhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAyOTFcIiAvL1JDIDI0MTAwMjkxIDogT3ByYXZkdSBjaGNldGUgenJ1xaFpdCBzdG9ybm8gcGxhdGJ5P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczoyNDEwMDI5MlwiIC8vUkMgMjQxMDAyOTIgOiBPcHJhdmR1IGNoY2V0ZSBzdG9ybm92YXQgcGxhdGJ1PyBTdG9ybm8gbmVuw60gbW/Fvm7DqSB2csOhdGl0IHpwxJt0IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwic3Rvcm5vX25hdl9wcmVkcFwiLCBsYWJlbDogXCJqcmVzOjI0MTAwMjkzXCIgfSkgLy9SQyAyNDEwMDI5MyA6IHN0b3Jub3ZhdCBpIHDFmcOtcGFkbsOpIG5hdsOhemFuw6kgcMWZZWRwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDI5NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImR1dm9kXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KSAvL1JDIDI0MTAwMjk0IDogRMWvdm9kXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YTogeyBzdG9ybm9fbmF2X3ByZWRwOiBib29sZWFuLCBkdXZvZDogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHRoYXQuaXNsLlBsYXRiYS5zdG9ybnVqKHsgc3Rvcm5vdmF0OiAhdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW5hLCBpX25hdmF6YW5lX3ByZWRwaXN5OiBkYXRhLnN0b3Jub19uYXZfcHJlZHAsIGR1dm9kOiBkYXRhLmR1dm9kLCByb3dzOiBbdGhhdC5EZXRhaWxEdG9dIH0pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW5hID8gdGhhdC5hY3Rpb25zLmFjdFpydXNpdFN0b3JubyEgOiB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdmUgZm9ybXVsw6HFmWlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2VcclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgY29uc3QgcGVybXMgPSB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgYWN0cy5hY3RTdG9ybm8hLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMgPyBwZXJtcy5MemVTdG9ybm92YXQgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZXZvZERvQmFua3khLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMgPyBwZXJtcy5MemVQcmV2ZXN0RG9CYW5reSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UHJldm9kWkJhbmt5IS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zID8gcGVybXMuTHplUHJldmVzdFpCYW5reSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RGV0YWlsUHJpcGFkdSEudXBkYXRlUGVybWlzc2lvbihwZXJtcyA/IHBlcm1zLkx6ZVpvYnJheml0IDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RPYmNlcnN0dmVuaVBsIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGplxaF0xJsgY2h5YsOtIHJlemVydmFjZSB2ZSBzdMOhdG7DrSBwb2tsYWRuxJssIGFsZSBuZXbDrW0sIGplc3RsaSB0byB2xa9iZWMgbsSba2RvIG7Em2tkeSBwb3XFvmlsXHJcblxyXG4gICAgICAgICAgICAvLyBzdGF0dXMgYmFyXHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c2VzIVtcInN0YXR1c0JhclNVaHJwXCJdISxcclxuICAgICAgICAgICAgICAgIHRoaXMuRGV0YWlsRHRvLnNfdWhycF90eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5zX3VocnAgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVWhycC5LVWhyYWRlIHx8IHRoaXMuRGV0YWlsRHRvLnNfdWhycCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVaHJwLk9kZXNsYW5hXHJcbiAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TY2h2YWxlbm9cclxuICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5zX3VocnAgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVWhycC5aYXVjdG92YW5hIHx8IHRoaXMuRGV0YWlsRHRvLnNfdWhycCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVaHJwLktaYXVjdG92YW5pIHx8IHRoaXMuRGV0YWlsRHRvLnNfdWhycCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVaHJwLlVocmF6ZW5hIHx8IHRoaXMuRGV0YWlsRHRvLnNfdWhycCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVaHJwLlNwYXJvdmFuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlJlYWxpem92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMuRGV0YWlsRHRvLnNfdWhycCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVaHJwLlN0b3JubyB8fCB0aGlzLkRldGFpbER0by5zX3VocnAgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVWhycC5TdG9ybm9CYW5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TdG9ybm92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcMWZw616bmFrdSBha3Rpdm7DrSBvcGVyYWNlIGEgYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB3aXRob3V0UmVsb2FkIChkZWZhdWx0ID0gZmFsc2UpIHRydWUgPSBuZWFrdHVhbGl6b3ZhdCBmb3JtdWzDocWZXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEod2l0aG91dFJlbG9hZDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXZvbMOhbsOtIHRyaWdnZXIgbyBha3Rpdm7DrSBvcGVyYWNpXHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihGdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgW3sgZGF0YTogdGhpcy5EZXRhaWxEdG8gfV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAgICBpZiAoIXdpdGhvdXRSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1IG5hxI10ZSBjZWzDvSBmb3JtdWzDocWZXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkRGF0YSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgZGF0IHYgZGV0YWlsdSBwb2RsZSBtb2RlbHUgYSBuYXN0YXZlbsOtIHN0YXZ1IHBydmvFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWt0dWFsaXphY2VEZXRhaWx1KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgLy8gVE9ETzogbmVjaGF0IERldGFpbER0byBuZWJvIHRvIHDFmWVqbWVub3ZhdCB6cMOhdGt5IG5hIG1vZGVsPyBuxJtqYWsgdG8gZG/FmWXFoWl0LCB2IGvDs2R1IHRvdGnFviBwb3XFvsOtdsOhbSBvYm9qZVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICAvLyBuYXBsbsSbbsOtIHNlem5hbXUgcG9oeWLFr1xyXG4gICAgICAgICAgICBpZiAodGhpcy5EZXRhaWxEdG8/LnBvaHlieSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLkRldGFpbER0by5wb2h5YnksIHsga2V5OiBcIml4cCxyYWRla191aHIscG9yX2Npc2xvXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgIHRoaXMuJGdyaWRQb2h5YnkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gc3RhdnUgcG9sw63EjWVrIGEgYWtjw61cclxuICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR1BsYXRiYUR0bz4gfCBJbnRlcmZhY2UuR1BsYXRiYUR0b30gcHJvbWlzZSBzIGRhdHkgKHJlc29sdmUgPSBqZSBtb8W+bsOpIHphdsWZw610LCByZWplY3QgPSBuZW7DrSBtb8W+bsOpIHphdsWZw610KSBuZWJvIHDFmcOtbW8gZGF0YSBkZXRhaWx1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR1BsYXRiYUR0bz4gfCBJbnRlcmZhY2UuR1BsYXRiYUR0byB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwcmF2ZMSbcG9kb2JuxJsgbmVwxa9qZGUgcG9oeWIgcMWZw61tbyBlZGl0b3ZhdCwgdGFrxb5lIHRvaGxlIHRhZHkgYnVkZSB6Ynl0ZcSNbsOpXHJcbiAgICAgICAgICAgIGxldCBmb3JtQ2hhbmdlZCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb2RhdCBzcHLDoXZub3UgcG9kbcOtbmt1IC0gdSB6w6Fwb8SNdG92w71jaCBsaXN0xa8gamUgaWYgKCh0aGlzLkVkaXRhY2UgfHwgdGhpcy5KZVBvZGFuKSAmJiBmb3JtQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSAmJiBmb3JtQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZG90YXogbmEgemF2xZllbsOtIGJleiB1bG/FvmVuw60sIHByb3Rvxb5lIHNlIG7Em2NvIHptxJtuaWxvXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2t1ZCBieSBieWxvIHBvdMWZZWJhICh6YXTDrW0gc2UgbmV1a2zDoWTDoSksIHRhayBkb3ByYWNvdmF0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5EZXRhaWxEdG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5EZXRhaWxEdG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==