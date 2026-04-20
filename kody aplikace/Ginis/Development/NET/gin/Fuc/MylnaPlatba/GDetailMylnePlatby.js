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
             * Detail mylné platby
             *
             * @author Martin Boček
             * @since 480.1.0.10
             */
            let GDetailMylnePlatby = class GDetailMylnePlatby extends Gordic.GDetailBuilderContent {
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
                            actLikvidace: Gordic.Eko.Action.actionZlikvidovat({ run: function () { this.setPending(that.likvidace()); } }),
                            actObcerstveniMP: Gordic.Eko.Action.actionObcerstvit({ run: function () { this.setPending(that.reloadData()); } }),
                            // akce pro tab likvidace
                            actLikvidaceDetailVPrimarniAgende: Gordic.Eko.Action.actionPrimarniAgenda({ run: function () { this.setPending(that.detailLikvidaceVPrimarniAgende()); } }),
                        },
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda()
                        ],
                        menuBar: [
                            //"jres:24100044", //RC 24100044 : Agenda
                            "actLikvidace*",
                            "actObcerstveniMP",
                            WebClient.FucDetail.createMenuShare(that, that.IxpUpr, that.RadekUpo.toString(), "1", true)
                        ],
                        statusBar: [
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStav" })
                        ],
                        tabs: {
                            tabMylnaPlatba: {
                                // základní údaje
                                tabParams: { title: "jres:24100176", group: Gordic.Prefabs.TabGroups.Agenda(), opened: true, locked: false }, //RC 24100176 : Mylná platba
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    let form = new Gordic.Forms.Form({ name: "formMylnaPlatba", layoutDescriptor: "L1M1S1" })
                                        .addSection("jres:24100079") //RC 24100079 : Informace o platbě
                                        .addRow("jres:24100080").addField("gstringbox", { disabled: true, name: "vyp_bu_vl_txt" }) //RC 24100080 : Bankovní účet vlastní
                                        .addRow("jres:24100081").addField("gstringbox", { disabled: true, name: "pol_bu_ci_txt" }) //RC 24100081 : Bankovní účet cizí
                                        .addPrefab(WebClient.FucDetail.prefabVsKsSs("pol_"))
                                        .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "upo_c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "upo_mena", model: "upo_mena=mena;upo_mena_zkr=mena_sis_aaa" }) //RC 24100082 : Částka v měně
                                        .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "upo_c_upo" }) //RC 24100083 : Částka v CZK
                                        .addRow("jres:24100084").addField("gdatebox", { disabled: true, name: "pol_dat_zap" }) //RC 24100084 : Datum zaplacení
                                        .addSection("jres:24100085") //RC 24100085 : Informace z párování
                                        .addRow("jres:24100086").addField("gstringbox", { disabled: true, name: "pol_pokyn" }); //RC 24100086 : Pokyn
                                    tab.gform("createFrom", form);
                                }
                            },
                            tabLikvidace: {
                                // likvidace
                                tabParams: {
                                    title: "jres:24100067", group: Gordic.Prefabs.TabGroups.Agenda(), opened: true, locked: false, //RC 24100067 : Likvidace
                                    menuBar: ["actLikvidaceDetailVPrimarniAgende"]
                                },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    let form = new Gordic.Forms.Form({ name: "formStavy", layoutDescriptor: "L1M1S1" })
                                        .addSection("jres:24100069") //RC 24100069 : Stavy
                                        .addRow("jres:24100077").addField("gstringbox", { disabled: true, name: "bpl_stav_ag" }); //RC 24100077 : Stav v agendě
                                    tab.gform("createFrom", form);
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
                        .addRow("jres:24100074").addField("gstringbox", { disabled: true, model: "upo_bvp" }) //RC 24100074 : Bankovní výpis
                        .addSection()
                        .addRow("jres:24100075").addField("gstringbox", { disabled: true, model: "upo_pol_bvp" }) //RC 24100075 : Položka výpisu
                        .addSection()
                        .addRow("jres:24100078").addField("gselectbox", Gordic.Prefabs.Select.fuccsmp(), {
                        disabled: true,
                        //name: "stav_mp",
                        model: "dmp_stav_mp=stav_mp;dmp_stav_mp_txt=stav_mp_txt;dmp_stav_mp_zkr=stav_mp_zkr"
                    })
                        .addSection({ layoutDescriptor: Gordic.Eko.Detail.headerLayoutDescriptorPopis })
                        .addRow("jres:24100061").addField("gstringbox", { disabled: true, name: "pol_nazev" }); //RC 24100061 : Popis
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            headerForm.form.sections[0].rows[0], // bankovní výpis
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            headerForm.form.sections[1].rows[0], // položka výpisu
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            headerForm.form.sections[2].rows[0], // stav likvidace
                        ]
                    };
                    // vlastní nastavení prvků (převážně model). pozor, nesmí se měnit name
                    formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: { model: "pol_nazev" } };
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava menu a položek
                    WebClient.FucDetail.changeBuilderDefinition(builder);
                    // šipky pro posun po seznamu
                    this.listControls_setup({
                        rowToDto: function (gridState) {
                            return {
                                IxpUpr: gridState.currentRow.data.dmp_ixp_upr,
                                RadekUpo: gridState.currentRow.data.dmp_radek_upo,
                                NasledujiciDetail: true
                            };
                        },
                        // TODO: nedat tam podobné sloupce jako jsou na hlavičce detailu, tj. výpis a položku? to by ale musela být složenina jako je upo_bvp a upo_pol_bvp
                        nextItemTemplate: "jres:24100071", //RC 24100071 : Následující: {dmp_ixp_upr} - {dmp_radek_upo} <br> {pol_nazev:trim:encode}
                        prevItemTemplate: "jres:24100072", //RC 24100072 : Předchozí: {dmp_ixp_upr} - {dmp_radek_upo} <br> {pol_nazev:trim:encode}
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
                 * Likvidace mylné platby
                 *
                 * @returns {JQuery.Promise<any>} promise
                 */
                likvidace() {
                    let that = this;
                    // průvodce pro likvidaci
                    // TODO: volá se to jinak než průvodce pro účtování pohybu (z detailu pohybu) - proč?
                    return WebClient.FucUtils.callOtherContent(that, "GLikvidaceMylnePlatby", {
                        methodCalledIfSuccess: () => { return that.setActiveOperationAndReloadData(); },
                    }, undefined, { ID: 'LikvidaceMylnePlatby#', }, { title: "jres:24100087" } //RC 24100087 : Likvidace mylné platby
                    );
                }
                /**
                 * Otevření detailu položky v primární agendě
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailLikvidaceVPrimarniAgende() {
                    // detail likvidace
                    if (this.DetailDto.dmp_ixp_lik != null) {
                        // typ agendy
                        let typAg = null;
                        if (this.DetailDto.dmp_stav_mp === Gordic.Fuc.Globals.Enums.ZpLikMP.ZalozeniPoukazu)
                            typAg = Gordic.Fuc.Globals.Enums.TypAg.POU;
                        else if (this.DetailDto.dmp_stav_mp === Gordic.Fuc.Globals.Enums.ZpLikMP.ZalozeniPrepoukazu)
                            typAg = Gordic.Fuc.Globals.Enums.TypAg.PRE;
                        // otevření detailu položky v primární agendě
                        return WebClient.FucUtils.openDetailInOtherTab(typAg, this.DetailDto.dmp_ixp_lik);
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
                    // TODO: parametr + stav
                    acts.actLikvidace.updatePermission((perms ? perms.LzeLikvidovat : undefined));
                    // akce likvidace
                    acts.actLikvidaceDetailVPrimarniAgende.updatePermission(((this.DetailDto.dmp_ixp_lik === null || (this.DetailDto.dmp_stav_mp !== Gordic.Fuc.Globals.Enums.ZpLikMP.ZalozeniPoukazu && this.DetailDto.dmp_stav_mp !== Gordic.Fuc.Globals.Enums.ZpLikMP.ZalozeniPrepoukazu)) ? { value: false, message: "Mylná platba není zlikvidována do agendy POU nebo PRE" } : (perms ? perms.LzeZobrazit : undefined)));
                    acts.actObcerstveniMP.updatePermission({ value: true });
                    // status bar
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarStav"], this.DetailDto.dmp_stav_mp_txt?.toUpperCase() ?? "", (this.DetailDto.dmp_stav_mp !== Gordic.Fuc.Globals.Enums.ZpLikMP.Nezlikvidovana
                        ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                        : (this.DetailDto.dmp_stav_mp === Gordic.Fuc.Globals.Enums.ZpLikMP.Nezlikvidovana && this.DetailDto.upo_s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany && this.DetailDto.upo_s_sto === Gordic.Fuc.Globals.Enums.SSto.Nestornovano
                            ? Gordic.Eko.Utils.RecordFormatType.Schvaleno
                            : (this.DetailDto.dmp_stav_mp === Gordic.Fuc.Globals.Enums.ZpLikMP.Nezlikvidovana && this.DetailDto.upo_s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany && this.DetailDto.upo_s_sto === Gordic.Fuc.Globals.Enums.SSto.Storno
                                ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                                : (this.DetailDto.dmp_stav_mp === Gordic.Fuc.Globals.Enums.ZpLikMP.Nezlikvidovana && this.DetailDto.upo_s_upo === Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany && this.DetailDto.upo_s_sto === Gordic.Fuc.Globals.Enums.SSto.Storno
                                    ? Gordic.Eko.Utils.RecordFormatType.Stornovano /*Vyrazeno*/
                                    : null)))));
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
                    // vybrání nějaké položky v gridu položek
                    //this.vybraniPolozky();
                    // naplnění gridu pohybů je až po rozkliknutí tabu
                    // nastavení stavu políček a akcí
                    this.enable();
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GMylnaPlatbaDto> | Interface.GMylnaPlatbaDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    // TODO: pravděpodobně neúpůjde mylná platba přímo editovat, takže tohle tady bude zbytečné
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
            GDetailMylnePlatby = __decorate([
                gcontent
            ], GDetailMylnePlatby);
            WebClient.GDetailMylnePlatby = GDetailMylnePlatby;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE15bG5lUGxhdGJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbE15bG5lUGxhdGJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E4VWY7QUE5VUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOFVuQjtJQTlVZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOFU3QjtRQTlVb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFLbkM7Ozs7O2VBS0c7WUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLE9BQUEscUJBQXVDO2dCQXdCM0U7O21CQUVHO2dCQUNJLGNBQWM7b0JBRWpCLHFCQUFxQjtvQkFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ksbUJBQW1CLENBQUMsT0FBZ0Q7b0JBRXZFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsdUNBQXVDO29CQUN2QyxPQUFPLENBQUMsYUFBYSxDQUFPLFFBQVEsRUFBRTt3QkFDbEMsT0FBTyxFQUFFOzRCQUNMLG1CQUFtQjs0QkFDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUM5RyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDbEgseUJBQXlCOzRCQUN6QixpQ0FBaUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3lCQUM5Sjt3QkFDRCxTQUFTLEVBQUU7NEJBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO3lCQUNwQzt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wseUNBQXlDOzRCQUN6QyxlQUFlOzRCQUNmLGtCQUFrQjs0QkFDbEIsVUFBQSxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQzt5QkFDcEY7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUM7eUJBQ2xFO3dCQUNELElBQUksRUFBRTs0QkFDRixjQUFjLEVBQUU7Z0NBQ1osaUJBQWlCO2dDQUNqQixTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSw0QkFBNEI7Z0NBQzFJLElBQUksRUFBRSxVQUFVLEdBQUc7b0NBQ2YseUJBQXlCO29DQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lDQUNwRixVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsa0NBQWtDO3lDQUM5RCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMscUNBQXFDO3lDQUMvSCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsa0NBQWtDO3lDQUM1SCxTQUFTLENBQUMsVUFBQSxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lDQUN6QyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSx5Q0FBeUMsRUFBRSxDQUFDLENBQUMsNkJBQTZCO3lDQUNwVCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsNEJBQTRCO3lDQUNwSixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsK0JBQStCO3lDQUNySCxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsb0NBQW9DO3lDQUNoRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7b0NBQ2pILEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNsQyxDQUFDOzZCQUNKOzRCQUNELFlBQVksRUFBRTtnQ0FDVixZQUFZO2dDQUNaLFNBQVMsRUFBRTtvQ0FDUCxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUseUJBQXlCO29DQUN4SCxPQUFPLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQ0FDakQ7Z0NBQ0QsSUFBSSxFQUFFLFVBQVUsR0FBRztvQ0FDZix5QkFBeUI7b0NBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lDQUM5RSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMscUJBQXFCO3lDQUNqRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7b0NBQzNILEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNsQyxDQUFDOzZCQUNKO3lCQUNKO3FCQUNKLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRVQsc0JBQXNCO29CQUN0QixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSSxvQkFBb0IsQ0FBQyxPQUFnRDtvQkFFeEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixtQ0FBbUM7b0JBQ25DLDZFQUE2RTtvQkFDN0UsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDO3lCQUMzRCxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLDhCQUE4Qjt5QkFDbkgsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyw4QkFBOEI7eUJBQ3ZILFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDN0UsUUFBUSxFQUFFLElBQUk7d0JBQ2Qsa0JBQWtCO3dCQUNsQixLQUFLLEVBQUUsNkVBQTZFO3FCQUN2RixDQUFDO3lCQUNELFVBQVUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLENBQUM7eUJBQy9FLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQjtvQkFDakgsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDN0MsSUFBSSxFQUFFOzRCQUNGLFVBQVcsQ0FBQyxJQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUI7eUJBQzdEO3FCQUNpQixDQUFDO29CQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dCQUM5QyxJQUFJLEVBQUU7NEJBQ0YsVUFBVyxDQUFDLElBQUssQ0FBQyxRQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQjt5QkFDN0Q7cUJBQ2lCLENBQUM7b0JBQ3ZCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUc7d0JBQzlDLElBQUksRUFBRTs0QkFDRixVQUFXLENBQUMsSUFBSyxDQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCO3lCQUM3RDtxQkFDaUIsQ0FBQztvQkFDdkIsdUVBQXVFO29CQUN2RSxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFxQixDQUFDO29CQUN2Ryx1QkFBdUI7b0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBRWhELHdCQUF3QjtvQkFDeEIsVUFBQSxTQUFTLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNDLDZCQUE2QjtvQkFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDO3dCQUNwQixRQUFRLEVBQUUsVUFBVSxTQUFTOzRCQUN6QixPQUFPO2dDQUNILE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXO2dDQUM3QyxRQUFRLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYTtnQ0FDakQsaUJBQWlCLEVBQUUsSUFBSTs2QkFDMUIsQ0FBQzt3QkFDTixDQUFDO3dCQUNELG1KQUFtSjt3QkFDbkosZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLHlGQUF5Rjt3QkFDNUgsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLHVGQUF1Rjt3QkFDMUgsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPO3FCQUMzQixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0ksdUJBQXVCLENBQUMsRUFBZ0IsRUFBRSxHQUFTO29CQUV0RCxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ssU0FBUztvQkFFYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLHlCQUF5QjtvQkFDekIscUZBQXFGO29CQUNyRixPQUFPLFVBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUM1QixJQUFJLEVBQ0osdUJBQXVCLEVBQ3ZCO3dCQUNJLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNsRixFQUNELFNBQVMsRUFDVCxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsR0FBRyxFQUNoQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxzQ0FBc0M7cUJBQ3BFLENBQUM7Z0JBQ04sQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSyw4QkFBOEI7b0JBRWxDLG1CQUFtQjtvQkFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDckMsYUFBYTt3QkFDYixJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDO3dCQUNoQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZTs0QkFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7NkJBQzNILElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0I7NEJBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUN4SSw2Q0FBNkM7d0JBQzdDLE9BQU8sVUFBQSxRQUFRLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVFLENBQUM7O3dCQUNJLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoRCxDQUFDO2dCQUVEOzttQkFFRztnQkFDSyxNQUFNO29CQUVWLE9BQU87b0JBQ1AsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7b0JBQ3pDLHdCQUF3QjtvQkFDeEIsSUFBSSxDQUFDLFlBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDL0UsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsaUNBQWtDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLHVEQUF1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVZLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUV6RCxhQUFhO29CQUNiLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUMzQixJQUFJLENBQUMsUUFBUyxDQUFDLGVBQWUsQ0FBRSxFQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQ25ELENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjO3dCQUMzRSxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7d0JBQ3hDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWTs0QkFDak8sQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzRCQUN0QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU07Z0NBQzNOLENBQUMsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtnQ0FDdkMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNO29DQUM3TixDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQSxZQUFZO29DQUNuRCxDQUFDLENBQUMsSUFBSSxDQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0ssK0JBQStCLENBQUMsZ0JBQXlCLEtBQUs7b0JBRWxFLHFDQUFxQztvQkFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVsRSxzQkFBc0I7b0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLENBQUM7O3dCQUNJLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqRCxDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNLLFVBQVU7b0JBRWQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNLLGtCQUFrQjtvQkFFdEIsbUJBQW1CO29CQUNuQiw0R0FBNEc7b0JBQzVHLElBQUksQ0FBQyxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDakUsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNwRCx5Q0FBeUM7b0JBQ3pDLHdCQUF3QjtvQkFDeEIsa0RBQWtEO29CQUNsRCxpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSSxPQUFPO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsMkZBQTJGO29CQUMzRixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN2RCw4R0FBOEc7b0JBQzlHLElBQUksSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO3dCQUN0Qix3REFBd0Q7d0JBQ3hELGtFQUFrRTt3QkFDbEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMxQixDQUFDO3lCQUNJLENBQUM7d0JBQ0YsNkNBQTZDO3dCQUM3QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzFCLENBQUM7Z0JBQ0wsQ0FBQzthQUVKLENBQUE7WUFoVVksa0JBQWtCO2dCQUQ5QixRQUFRO2VBQ0ksa0JBQWtCLENBZ1U5QjtZQWhVWSw0QkFBa0IscUJBZ1U5QixDQUFBO1FBQ0wsQ0FBQyxFQTlVb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOFU3QjtJQUFELENBQUMsRUE5VWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThVbkI7QUFBRCxDQUFDLEVBOVVTLE1BQU0sS0FBTixNQUFNLFFBOFVmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5GdWMuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRHRvVHlwZU1QID0gR29yZGljLkZ1Yy5JbnRlcmZhY2UuR015bG5hUGxhdGJhRHRvO1xyXG4gICAgZXhwb3J0IHR5cGUgVXNlZENvbXBvbmVudHNNUCA9IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuR0xpc3RDb250cm9sc0V4dGVuc2lvbnM8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR015bG5hUGxhdGJhRHRvPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCBteWxuw6kgcGxhdGJ5XHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgTWFydGluIEJvxI1la1xyXG4gICAgICogQHNpbmNlIDQ4MC4xLjAuMTBcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbE15bG5lUGxhdGJ5IGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50PFVzZWRDb21wb25lbnRzTVA+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgLy8gdmxhc3Rub3N0aSB6IEMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUElEIHDFmcOtcGFkdSBteWxuw6kgcGxhdGJ5XHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEl4cFVwcjogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIMWYw6FkZWsgcG9oeWJ1IG15bG7DqSBwbGF0YnlcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUmFkZWtVcG86IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEVE8gZGV0YWlsdSBteWxuw6kgcGxhdGJ5XHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5GdWMuSW50ZXJmYWNlLkdNeWxuYVBsYXRiYUR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIERldGFpbER0bzogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR015bG5hUGxhdGJhRHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhbGlkw6F0b3J5XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdFtdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yczogb2JqZWN0W107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gamVuIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlciBkZXRhaWxidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSBha2PDrSwgdGFixa8sIGtwaSwgbWVudSBhcG9kLlxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJkZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIG1lbnViYXJcclxuICAgICAgICAgICAgICAgICAgICBhY3RMaWt2aWRhY2U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpsaWt2aWRvdmF0KHsgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0Lmxpa3ZpZGFjZSgpKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dmVuaU1QOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PYmNlcnN0dml0KHsgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnJlbG9hZERhdGEoKSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gdGFiIGxpa3ZpZGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdExpa3ZpZGFjZURldGFpbFZQcmltYXJuaUFnZW5kZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJpbWFybmlBZ2VuZGEoeyBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsTGlrdmlkYWNlVlByaW1hcm5pQWdlbmRlKCkpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAvL1wianJlczoyNDEwMDA0NFwiLCAvL1JDIDI0MTAwMDQ0IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RMaWt2aWRhY2UqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaU1QXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRnVjRGV0YWlsLmNyZWF0ZU1lbnVTaGFyZSh0aGF0LCB0aGF0Lkl4cFVwciwgdGhhdC5SYWRla1Vwby50b1N0cmluZygpLCBcIjFcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclN0YXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJNeWxuYVBsYXRiYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6w6FrbGFkbsOtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHsgdGl0bGU6IFwianJlczoyNDEwMDE3NlwiLCBncm91cDogR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogZmFsc2UgfSwgLy9SQyAyNDEwMDE3NiA6IE15bG7DoSBwbGF0YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9wbG7Em27DrSBwcnZrxa8gZG8gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1NeWxuYVBsYXRiYVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjI0MTAwMDc5XCIpIC8vUkMgMjQxMDAwNzkgOiBJbmZvcm1hY2UgbyBwbGF0YsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODBcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwidnlwX2J1X3ZsX3R4dFwiIH0pIC8vUkMgMjQxMDAwODAgOiBCYW5rb3Zuw60gw7rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicG9sX2J1X2NpX3R4dFwiIH0pIC8vUkMgMjQxMDAwODEgOiBCYW5rb3Zuw60gw7rEjWV0IGNpesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFByZWZhYihGdWNEZXRhaWwucHJlZmFiVnNLc1NzKFwicG9sX1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4MlwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwidXBvX2NfbWVuYVwiIH0pLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInVwb19tZW5hXCIsIG1vZGVsOiBcInVwb19tZW5hPW1lbmE7dXBvX21lbmFfemtyPW1lbmFfc2lzX2FhYVwiIH0pIC8vUkMgMjQxMDAwODIgOiDEjMOhc3RrYSB2IG3Em27Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDgzXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ1cG9fY191cG9cIiB9KSAvL1JDIDI0MTAwMDgzIDogxIzDoXN0a2EgdiBDWktcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4NFwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicG9sX2RhdF96YXBcIiB9KSAvL1JDIDI0MTAwMDg0IDogRGF0dW0gemFwbGFjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDEwMDA4NVwiKSAvL1JDIDI0MTAwMDg1IDogSW5mb3JtYWNlIHogcMOhcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4NlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJwb2xfcG9reW5cIiB9KTsgLy9SQyAyNDEwMDA4NiA6IFBva3luXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJMaWt2aWRhY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGlrdmlkYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDA2N1wiLCBncm91cDogR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogZmFsc2UsIC8vUkMgMjQxMDAwNjcgOiBMaWt2aWRhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcImFjdExpa3ZpZGFjZURldGFpbFZQcmltYXJuaUFnZW5kZVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVN0YXZ5XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAwNjlcIikgLy9SQyAyNDEwMDA2OSA6IFN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwNzdcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnBsX3N0YXZfYWdcIiB9KTsgLy9SQyAyNDEwMDA3NyA6IFN0YXYgdiBhZ2VuZMSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckJ1aWxkXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcG9qZW7DrSBzdGFuZGFyZG7DrSBFS08gaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgZHJ1aMOpIGEgdMWZZXTDrSBzZWtjZSAocG9sb8W+a3kgYSBzdGF2IG3DrXN0byBrb21wZXRlbnRhIGEgcmVhbGl6w6F0b3JhKVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhlYWRlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA3NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbW9kZWw6IFwidXBvX2J2cFwiIH0pIC8vUkMgMjQxMDAwNzQgOiBCYW5rb3Zuw60gdsO9cGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA3NVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbW9kZWw6IFwidXBvX3BvbF9idnBcIiB9KSAvL1JDIDI0MTAwMDc1IDogUG9sb8W+a2EgdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwNzhcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc21wKCksIHsgLy9SQyAyNDEwMDA3OCA6IFN0YXYgbGlrdmlkYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcInN0YXZfbXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkbXBfc3Rhdl9tcD1zdGF2X21wO2RtcF9zdGF2X21wX3R4dD1zdGF2X21wX3R4dDtkbXBfc3Rhdl9tcF96a3I9c3Rhdl9tcF96a3JcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGF5b3V0RGVzY3JpcHRvcjogR29yZGljLkVrby5EZXRhaWwuaGVhZGVyTGF5b3V0RGVzY3JpcHRvclBvcGlzIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA2MVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJwb2xfbmF6ZXZcIiB9KTsgLy9SQyAyNDEwMDA2MSA6IFBvcGlzXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuSW5mb10gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzBdLCAvLyBiYW5rb3Zuw60gdsO9cGlzXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTFdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVsxXS5yb3dzIVswXSwgLy8gcG9sb8W+a2EgdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGEyXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMl0ucm93cyFbMF0sIC8vIHN0YXYgbGlrdmlkYWNlXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIC8vIHZsYXN0bsOtIG5hc3RhdmVuw60gcHJ2a8WvIChwxZlldsOhxb5uxJsgbW9kZWwpLiBwb3pvciwgbmVzbcOtIHNlIG3Em25pdCBuYW1lXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlBvcGlzXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJwb2xfbmF6ZXZcIiB9IH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBobGF2acSNa3lcclxuICAgICAgICAgICAgR29yZGljLkVrby5IZWFkZXJGb3JtLnNldHVwKGJ1aWxkZXIsIGZvcm1TZXR1cCk7XHJcblxyXG4gICAgICAgICAgICAvLyDDunByYXZhIG1lbnUgYSBwb2xvxb5la1xyXG4gICAgICAgICAgICBGdWNEZXRhaWwuY2hhbmdlQnVpbGRlckRlZmluaXRpb24oYnVpbGRlcik7XHJcblxyXG4gICAgICAgICAgICAvLyDFoWlwa3kgcHJvIHBvc3VuIHBvIHNlem5hbXVcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29udHJvbHNfc2V0dXAoe1xyXG4gICAgICAgICAgICAgICAgcm93VG9EdG86IGZ1bmN0aW9uIChncmlkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuZG1wX2l4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrVXBvOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLmRtcF9yYWRla191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hc2xlZHVqaWNpRGV0YWlsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZWRhdCB0YW0gcG9kb2Juw6kgc2xvdXBjZSBqYWtvIGpzb3UgbmEgaGxhdmnEjWNlIGRldGFpbHUsIHRqLiB2w71waXMgYSBwb2xvxb5rdT8gdG8gYnkgYWxlIG11c2VsYSBiw710IHNsb8W+ZW5pbmEgamFrbyBqZSB1cG9fYnZwIGEgdXBvX3BvbF9idnBcclxuICAgICAgICAgICAgICAgIG5leHRJdGVtVGVtcGxhdGU6IFwianJlczoyNDEwMDA3MVwiLCAvL1JDIDI0MTAwMDcxIDogTsOhc2xlZHVqw61jw606IHtkbXBfaXhwX3Vwcn0gLSB7ZG1wX3JhZGVrX3Vwb30gPGJyPiB7cG9sX25hemV2OnRyaW06ZW5jb2RlfVxyXG4gICAgICAgICAgICAgICAgcHJldkl0ZW1UZW1wbGF0ZTogXCJqcmVzOjI0MTAwMDcyXCIsIC8vUkMgMjQxMDAwNzIgOiBQxZllZGNob3rDrToge2RtcF9peHBfdXByfSAtIHtkbXBfcmFkZWtfdXBvfSA8YnI+IHtwb2xfbmF6ZXY6dHJpbTplbmNvZGV9XHJcbiAgICAgICAgICAgICAgICBiZWZvcmVNb3ZlOiB0aGF0LmNsb3NpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeS5FdmVudH0gZXYgdWTDoWxvc3RcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gY3R4PyBwxa92b2Ruw60gdWTDoWxvc3QgYSBqZWrDrSBhcmd1bWVudHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQWN0aXZlT3AoZXY6IEpRdWVyeS5FdmVudCwgY3R4PzogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaWt2aWRhY2UgbXlsbsOpIHBsYXRieVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxpa3ZpZGFjZSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHByxa92b2RjZSBwcm8gbGlrdmlkYWNpXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHZvbMOhIHNlIHRvIGppbmFrIG5lxb4gcHLFr3ZvZGNlIHBybyDDusSNdG92w6Fuw60gcG9oeWJ1ICh6IGRldGFpbHUgcG9oeWJ1KSAtIHByb8SNP1xyXG4gICAgICAgICAgICByZXR1cm4gRnVjVXRpbHMuY2FsbE90aGVyQ29udGVudChcclxuICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICBcIkdMaWt2aWRhY2VNeWxuZVBsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZENhbGxlZElmU3VjY2VzczogKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCk7IH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgeyBJRDogJ0xpa3ZpZGFjZU15bG5lUGxhdGJ5IycsIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBcImpyZXM6MjQxMDAwODdcIiB9IC8vUkMgMjQxMDAwODcgOiBMaWt2aWRhY2UgbXlsbsOpIHBsYXRieVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RldsWZZW7DrSBkZXRhaWx1IHBvbG/Fvmt5IHYgcHJpbcOhcm7DrSBhZ2VuZMSbXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsTGlrdmlkYWNlVlByaW1hcm5pQWdlbmRlKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gZGV0YWlsIGxpa3ZpZGFjZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5EZXRhaWxEdG8uZG1wX2l4cF9saWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdHlwIGFnZW5keVxyXG4gICAgICAgICAgICAgICAgbGV0IHR5cEFnOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkRldGFpbER0by5kbXBfc3Rhdl9tcCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlpwTGlrTVAuWmFsb3plbmlQb3VrYXp1KSB0eXBBZyA9IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBBZy5QT1U7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLkRldGFpbER0by5kbXBfc3Rhdl9tcCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlpwTGlrTVAuWmFsb3plbmlQcmVwb3VrYXp1KSB0eXBBZyA9IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBBZy5QUkU7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHUgcG9sb8W+a3kgdiBwcmltw6FybsOtIGFnZW5kxJtcclxuICAgICAgICAgICAgICAgIHJldHVybiBGdWNVdGlscy5vcGVuRGV0YWlsSW5PdGhlclRhYih0eXBBZywgdGhpcy5EZXRhaWxEdG8uZG1wX2l4cF9saWspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZVxyXG4gICAgICAgICAgICBjb25zdCBhY3RzID0gdGhpcy5hY3Rpb25zO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtcyA9IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBwYXJhbWV0ciArIHN0YXZcclxuICAgICAgICAgICAgYWN0cy5hY3RMaWt2aWRhY2UhLnVwZGF0ZVBlcm1pc3Npb24oKHBlcm1zID8gcGVybXMuTHplTGlrdmlkb3ZhdCA6IHVuZGVmaW5lZCkpO1xyXG4gICAgICAgICAgICAvLyBha2NlIGxpa3ZpZGFjZVxyXG4gICAgICAgICAgICBhY3RzLmFjdExpa3ZpZGFjZURldGFpbFZQcmltYXJuaUFnZW5kZSEudXBkYXRlUGVybWlzc2lvbigoKHRoaXMuRGV0YWlsRHRvLmRtcF9peHBfbGlrID09PSBudWxsIHx8ICh0aGlzLkRldGFpbER0by5kbXBfc3Rhdl9tcCAhPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlpwTGlrTVAuWmFsb3plbmlQb3VrYXp1ICYmIHRoaXMuRGV0YWlsRHRvLmRtcF9zdGF2X21wICE9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuWnBMaWtNUC5aYWxvemVuaVByZXBvdWthenUpKSA/IHsgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcIk15bG7DoSBwbGF0YmEgbmVuw60gemxpa3ZpZG92w6FuYSBkbyBhZ2VuZHkgUE9VIG5lYm8gUFJFXCIgfSA6IChwZXJtcyA/IHBlcm1zLkx6ZVpvYnJheml0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9iY2Vyc3R2ZW5pTVAhLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXR1cyBiYXJcclxuICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlwiXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRldGFpbER0by5kbXBfc3Rhdl9tcF90eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5kbXBfc3Rhdl9tcCAhPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlpwTGlrTVAuTmV6bGlrdmlkb3ZhbmFcclxuICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlJlYWxpem92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5EZXRhaWxEdG8uZG1wX3N0YXZfbXAgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5acExpa01QLk5lemxpa3ZpZG92YW5hICYmIHRoaXMuRGV0YWlsRHRvLnVwb19zX3VwbyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uWmF1Y3RvdmFueSAmJiB0aGlzLkRldGFpbER0by51cG9fc19zdG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlNjaHZhbGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5kbXBfc3Rhdl9tcCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlpwTGlrTVAuTmV6bGlrdmlkb3ZhbmEgJiYgdGhpcy5EZXRhaWxEdG8udXBvX3NfdXBvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5aYXVjdG92YW55ICYmIHRoaXMuRGV0YWlsRHRvLnVwb19zX3N0byA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlN0b3Jub3Zhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMuRGV0YWlsRHRvLmRtcF9zdGF2X21wID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuWnBMaWtNUC5OZXpsaWt2aWRvdmFuYSAmJiB0aGlzLkRldGFpbER0by51cG9fc191cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLk5lemF1Y3RvdmFueSAmJiB0aGlzLkRldGFpbER0by51cG9fc19zdG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLlN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuU3Rvcm5vdmFuby8qVnlyYXplbm8qL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgYWt0aXZuw60gb3BlcmFjZSBhIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aG91dFJlbG9hZCAoZGVmYXVsdCA9IGZhbHNlKSB0cnVlID0gbmVha3R1YWxpem92YXQgZm9ybXVsw6HFmVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKHdpdGhvdXRSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gdnl2b2zDoW7DrSB0cmlnZ2VyIG8gYWt0aXZuw60gb3BlcmFjaVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIFt7IGRhdGE6IHRoaXMuRGV0YWlsRHRvIH1dKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgICAgaWYgKCF3aXRob3V0UmVsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInJlbWVtYmVyaW5pdGlhbG9wZW5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dSBuYcSNdGUgY2Vsw70gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlbG9hZERhdGEoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInJlbWVtYmVyaW5pdGlhbG9wZW5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVhbGl6YWNlIGRhdCB2IGRldGFpbHUgcG9kbGUgbW9kZWx1IGEgbmFzdGF2ZW7DrSBzdGF2dSBwcnZrxa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFrdHVhbGl6YWNlRGV0YWlsdSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcG9sw63EjWVrXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lY2hhdCBEZXRhaWxEdG8gbmVibyB0byBwxZllam1lbm92YXQgenDDoXRreSBuYSBtb2RlbD8gbsSbamFrIHRvIGRvxZllxaFpdCwgdiBrw7NkdSB0b3Rpxb4gcG91xb7DrXbDoW0gb2JvamVcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuRGV0YWlsRHRvLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgLy8gdnlicsOhbsOtIG7Em2pha8OpIHBvbG/Fvmt5IHYgZ3JpZHUgcG9sb8W+ZWtcclxuICAgICAgICAgICAgLy90aGlzLnZ5YnJhbmlQb2xvemt5KCk7XHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gZ3JpZHUgcG9oeWLFryBqZSBhxb4gcG8gcm96a2xpa251dMOtIHRhYnVcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBzdGF2dSBwb2zDrcSNZWsgYSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HTXlsbmFQbGF0YmFEdG8+IHwgSW50ZXJmYWNlLkdNeWxuYVBsYXRiYUR0b30gcHJvbWlzZSBzIGRhdHkgKHJlc29sdmUgPSBqZSBtb8W+bsOpIHphdsWZw610LCByZWplY3QgPSBuZW7DrSBtb8W+bsOpIHphdsWZw610KSBuZWJvIHDFmcOtbW8gZGF0YSBkZXRhaWx1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR015bG5hUGxhdGJhRHRvPiB8IEludGVyZmFjZS5HTXlsbmFQbGF0YmFEdG8ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogcHJhdmTEm3BvZG9ibsSbIG5lw7pwxa9qZGUgbXlsbsOhIHBsYXRiYSBwxZnDrW1vIGVkaXRvdmF0LCB0YWvFvmUgdG9obGUgdGFkeSBidWRlIHpieXRlxI1uw6lcclxuICAgICAgICAgICAgbGV0IGZvcm1DaGFuZ2VkID0gdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvZGF0IHNwcsOhdm5vdSBwb2Rtw61ua3UgLSB1IHrDoXBvxI10b3bDvWNoIGxpc3TFryBqZSBpZiAoKHRoaXMuRWRpdGFjZSB8fCB0aGlzLkplUG9kYW4pICYmIGZvcm1DaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVlICYmIGZvcm1DaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb3RheiBuYSB6YXbFmWVuw60gYmV6IHVsb8W+ZW7DrSwgcHJvdG/FvmUgc2UgbsSbY28gem3Em25pbG9cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHBva3VkIGJ5IGJ5bG8gcG90xZllYmEgKHphdMOtbSBzZSBuZXVrbMOhZMOhKSwgdGFrIGRvcHJhY292YXRcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LkRldGFpbER0bztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIG5lZWRpdHVqZSwgamUgbW/Fvm7DqSBkZXRhaWwgemF2xZnDrXRcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LkRldGFpbER0bztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19