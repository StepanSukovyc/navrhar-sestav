"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPolFPMassNewWizard.ts              </Name>
//    <Description> Content pro vybrání bankovního účtu a položek plánu         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-02                                                  </Created>
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
            /** Content pro vybrání bankovního účtu a položek plánu*/
            let GSmlPolFPChooseBUPol = class GSmlPolFPChooseBUPol extends Gordic.GContentBase {
                prepareContent(opts) {
                    $.extend(true, this, opts);
                    this.title = "jres:33600484"; //RC 33600484 : Výběr položek plánu pro vytvoření
                    this.create();
                    this.createActions();
                    this.createCommandBar();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actVybrat: {
                            name: "actVybrat",
                            caption: "jres:33600405", //RC 33600405 : Vybrat
                            run: (ev, ctx) => {
                                var buValue = this.$formBU.findFields("bu_vl").gfield("getValue");
                                var $grid = this.$cntvyberPlanu.find(".ggrid");
                                let rows = (($grid?.length ?? 0) == 1) ? $grid.ggrid("getSelection") : null;
                                if (rows && rows.length > 0) {
                                    for (var row of rows ?? []) {
                                        row.bu_vl = buValue?.bu_vl;
                                        row.sk_vl = buValue?.sk_vl;
                                    }
                                    this.tryClose(rows ?? void 0);
                                }
                                else {
                                    this.dialogs.warning("jres:33600485", //RC 33600485 : Nevybrána žádná položka
                                    "jres:33600486"); //RC 33600486 : Vyberte minimálně jednu položku
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
                create() {
                    var typ_bu = 0;
                    //dodavatelské smlouvy
                    //340.6 06.06.01 - doplněno o objednávku
                    //340.6 07.06.01 - změna definice typu účtu - místo kategorie knihy - ktg_sml
                    //353.1 17.06.05 - doplěn lim. příslib
                    //368.15 28.11.12 vyhozeny přísliby - kvůli možnosti vydávat z příjmových účtů -  or smlpidP.findoc.ktg_sml = ng_ktgsmlLimPrislib or smlpidP.findoc.ktg_sml = ng_ktgsmlIndPrislib
                    //374.1 24.07.14 predestinace vyřazených ktg bú závisí na db parametru sml_rad_acktgbu
                    if (this.sml_rad_acktgbu) {
                        if (this.smlpid.ktg_sml == 10 /* Interface.KategorieDokladu.ng_ktgsmlDod */ || this.smlpid.ktg_sml == 50 /* Interface.KategorieDokladu.ng_ktgsmlDodObj */) {
                            //účet nesmí být příjmový
                            typ_bu = 20 /* Interface.TypBeznyUcet.ng_typbuIn */;
                        }
                        //odběratelské smlouvy
                        //370.17 31.05.13 přidán jiný příjem
                        else if (this.smlpid.ktg_sml == 20 /* Interface.KategorieDokladu.ng_ktgsmlOdb */ || this.smlpid.ktg_sml == 60 /* Interface.KategorieDokladu.ng_ktgsmlOdbObj */ ||
                            this.smlpid.ktg_sml == 84 /* Interface.KategorieDokladu.ng_ktgsmlJinyPrijemLim */ || this.smlpid.ktg_sml == 85 /* Interface.KategorieDokladu.ng_ktgsmlJinyPrijemInd */) {
                            //účet nesmí být výdajový
                            typ_bu = 10 /* Interface.TypBeznyUcet.ng_typbuOut */;
                        }
                    }
                    var form = new Gordic.Forms.Form({
                        name: "formMassNew",
                        //layoutDescriptor: "L2M2S1, L-5-7-0, M-5-7-0, S-12-12-0, breaks-500-1000"
                    })
                        .addRow("jres:33600487") //RC 33600487 : Bankovní účet vlastní
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvlSml(), {
                        name: "bu_vl",
                        dropdown: false,
                        model: "model.bu_vl=value.bu_vl;model.sk_vl=value.sk_vl;model.rok=>value.rok;model.ktg_bu<=value.ktg_bu;model.typ_bu<=value.typ_bu",
                        serverFilters: {
                            aktivita: 100,
                            rok: this.rok,
                            ucs: this.ucs,
                            ico: this.ico,
                            typ_bu: (typ_bu != 0) ? { o: "!=", v: typ_bu } : undefined,
                            pristupKBU: this.sml_pbvul,
                            aktivniRozpoctovyReprezentant: /*info.cellInfo.data.pom.rezim_rr*/ true, //teoreticky uex? -- když byl uex, tak se nenačítal reprezentant
                            ixs_pri: this.smlpid.ixs_pri,
                            typ_ag_blok: this.smlpid.typ_ag_blok,
                            ixp_nab: this.smlpid.ixp_nab,
                            //524.21 20.02.24 RZA
                            por_cislo_nab: this.smlpid.por_cislo_nab,
                            ixs_esu: this.smlpid.ixs_esu
                        },
                        change: (ev, ctx) => {
                            this.$cntvyberPlanu.remove();
                            this.createVyberPlanu({
                                uea: ctx.value?.uea_rr ?? void 0,
                                ueb: ctx.value?.ueb_rr ?? void 0,
                                uea_rr: ctx.value?.uea_rr ?? void 0,
                                ueb_rr: ctx.value?.ueb_rr ?? void 0,
                                uea_uc: ctx.value?.uea_uc ?? void 0,
                                ueb_uc: ctx.value?.ueb_uc ?? void 0,
                                bu_vl: ctx.value?.bu_vl ?? void 0,
                                sk_vl: ctx.value?.sk_vl ?? void 0,
                            });
                        }
                    });
                    this.$formBU = $.newDiv().appendTo(this.element).gform("createFrom", form);
                    this.$tabVyberPlanu = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        id: "tabPolozkyFPMassWizardVyberPlanu",
                        title: "jres:33600488", //RC 33600488 : Výběr položek plánu
                        locked: true,
                        opened: true
                    });
                    this.createVyberPlanu();
                }
                createVyberPlanu(serverFilters) {
                    var opts = {
                        uid: "smlRozaaat#",
                        smlpid: this.smlpid,
                        serverFilters: $.extend({
                            ixp: this.smlpid.ixp,
                            rok: this.rok,
                            ucs: this.ucs,
                            ico: this.ico,
                            drd: this.pom.drd
                        }, serverFilters),
                        multiSelect: true,
                        gridAutoload: this.$formBU.findFields("bu_vl").gfield("hasValue") ?? false,
                        showTitle: false
                    };
                    this.$cntvyberPlanu = $.newDiv().appendTo(this.$tabVyberPlanu).gcontent([Gordic.Sml.WebClient.GSmlRozaaat, opts]);
                }
            };
            GSmlPolFPChooseBUPol = __decorate([
                Decorators.gcontent
            ], GSmlPolFPChooseBUPol);
            WebClient.GSmlPolFPChooseBUPol = GSmlPolFPChooseBUPol;
            //@Decorators.gcontent
            //export class GSmlPolFPMassNewWizard extends GContentBase implements IGClientContent {
            //    /** Celkový record - doklad + případ */
            //    public smlpid: Interface.GDokladSmlDto;
            //    /** Typ instalace*/
            //    public typ_inst: number;
            //    /** DB parametr řídící zobrazování Množství a MJ*/
            //    public sml_pol_mjmview: boolean;
            //    /** DB parametr Přístup k typům BÚ dle kategorie smluvního případu*/
            //    private sml_rad_acktgbu: boolean;
            //    /** DB parametr Přístup k vlastním bankovním účtům*/
            //    private sml_pbvul: number;
            //    /** Dto s pomocnými proměnnými pro práci s položkami*/
            //    private pom: Interface.GSmlFinPolozkyFPDokladPomocneObecneDto;
            //    private rok: number;
            //    private ucs: string;
            //    private ico: string;
            //    /** Aktuální step wizarda */
            //    private wizardActiveStep: number;
            //    /** Tab s výběrem plánu*/
            //    private $tabVyberPlanu: JQuery<HTMLElement>;
            //    /** Div s výběrem plánu*/
            //    private $cntvyberPlanu: JQuery<HTMLElement>;
            //    /** Grid s přepřipravenými záznamy */
            //    private $gridStep2: JQuery<HTMLElement>;
            //    prepareContent(opts) {
            //        $.extend(true, this, opts);
            //        this.title = "Hromadné vytvoření nových položek finančního profilu";
            //        this.createWizard();
            //    }
            //    /** Vytvoření průvodce */
            //    private createWizard() {
            //        const that = this;
            //        var wizard = new Gordic.Wizard();
            //        wizard.create(
            //            {
            //                content: this
            //            },
            //            {
            //                title: "Hromadné vytvoření nových položek",
            //                steps: [
            //                    {
            //                        //krok 1 - výběr bankovního účtu či identifikátoru rozpočtového konta
            //                        id: "MassNew1",
            //                        caption: "Zadání bankovního účtu a výběr položek plánu",
            //                        create: (cnt, contentDiv: JQuery<HTMLElement>, change) => {
            //                            this.createStep1(cnt, contentDiv, change);
            //                        },
            //                        change: (cnt, contentDiv, change) => {
            //                            //var obj = { activeStep: change.activeStep };
            //                            //if (change.task.nextStep != change.activeStep && change.task.nextStep != ++obj.activeStep) {
            //                            //    change.stepsCancel[change.task.nextStep ?? 0];
            //                            //    return;
            //                            //}
            //                            var $formMassNew = this.$cntvyberPlanu.findForms("formMassNew");
            //                            if (!$formMassNew.gform("isValid")) {
            //                                return $.Deferred().reject().promise();
            //                                //change.stepsCancel[1] = true;
            //                                //return;
            //                            }
            //                            if (change.activeStep != change.task.nextStep) {
            //                                //this.InputDto = filteredDto;
            //                                var $grid = this.$cntvyberPlanu.find(".ggrid");
            //                                var selection = $grid.ggrid("getSelection");
            //                                if (selection.length < 1) {
            //                                    this.dialogs.warning("Upozornění", "Vyberte minimálně jeden záznam pro vygenerování");
            //                                    return $.Deferred().reject().promise();
            //                                    //change.stepsCancel[1] = true;
            //                                    //return;
            //                                }
            //                            }
            //                        },
            //                        commandBar: {
            //                            next: { caption: "Vytvořit" }
            //                        },
            //                        buttons: [{
            //                            action: new GAction({
            //                                name: "actClose",
            //                                caption: "Zavřít",
            //                                run: function (ev, ctx) {
            //                                    that.tryClose();
            //                                }
            //                            })
            //                        }]
            //                    },
            //                    {
            //                        //krok 2 - Výsledek vytvoření nových položek
            //                        id: "MassNew2",
            //                        caption: "Výsledek",
            //                        create: (cnt, contentDiv: JQuery<HTMLElement>, change) => {
            //                            this.wizardActiveStep = change.activeStep;
            //                            change.stepsEnable[0] = false;
            //                            change.stepsCancel[0] = false;
            //                            this.createStep2(cnt, contentDiv, change);
            //                        },
            //                        change: (cnt, contentDiv, change) => {
            //                            var obj = { activeStep: change.activeStep };
            //                            if (change.activeStep != change.task.nextStep) {
            //                                //this.InputDto = filteredDto;
            //                            }
            //                        },
            //                    },
            //                ]
            //            }
            //        )
            //    }
            //    /**
            //     * Vytvoření první kroku průvodce
            //     * @param cnt
            //     * @param contentDiv
            //     * @param change
            //     */
            //    private createStep1(cnt: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange) {
            //        this.wizardActiveStep = change.activeStep;
            //        var opts = {
            //            ID: "GSmlPolozkyFPMassNewWizard#",
            //            smlpid: this.smlpid,
            //            sml_rad_acktgbu: this.sml_rad_acktgbu,
            //            sml_pbvul: this.sml_pbvul,
            //            rok: this.rok,
            //            ucs: this.ucs,
            //            ico: this.ico,
            //            pom: this.pom,
            //            ixpRozReq: false /*true*/ //zatím pro testování false
            //        }
            //        this.$cntvyberPlanu = $.newDiv().appendTo(contentDiv).gcontent([Gordic.Sml.WebClient.GSmlPolFPChooseBUPol, opts]);
            //    }
            //    /**
            //     * Vytvoření druhého kroku průvodce
            //     * @param cnt
            //     * @param contentDiv
            //     * @param change
            //     */
            //    private createStep2(cnt: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange) {
            //        let $tabDoklad = $.newDiv()
            //            .appendTo(contentDiv)
            //            .gtab({
            //                id: "tabPolozkyFPMassWizardPolozky",
            //                title: "Výsledek vytvoření položek",
            //                opened: true,
            //                locked: true
            //            });
            //        this.$gridStep2 = $.newDiv().appendTo($tabDoklad)
            //            .ggrid({
            //                name: "gridPolozkyFPMassWizardPolozky",
            //                columnMode: "full",
            //                columns: this.createGridFormat(),
            //                //data: 
            //                    //key: ["ixp", "rok", "cislo"]
            //                defaultProfile: {
            //                    sort: "ixp,rok,cislo"
            //                },
            //            })
            //            .gautofit({ resizersOnTab: false });
            //    }
            //    /**
            //     * Definice gridformátu pro grid s výsledkem vytvoření
            //     * @returns
            //     */
            //    public createGridFormat(): Data.GridFormat<Interface.GSmldpolDto> {
            //        const that = this;
            //        var gf = new Gordic.Data.GridFormat()
            //            .addTextColumn({
            //                name: "up_stav_zkr",
            //                caption: "jres:33600374", //RC 33600374 : S 
            //                field: "up_stav_zkr",
            //                tooltipTemplate: "{up_stav_txt}",
            //                description: "jres:33600375", //RC 33600375 : Stav dokladu
            //                width: 35
            //            })
            //            .addRok()
            //            .addNumberColumn({
            //                name: "cislo",
            //                caption: "#",
            //                description: "jres:33600376", //RC 33600376 : Pořadí
            //                width: 50
            //            })
            //            .addBankovniUcetVlastni()
            //            .addTextColumn({
            //                name: "cis_pol_pla",
            //                caption: (this.typ_inst == Interface.TypInstalace.ng_tyiAcr) ? "jres:33600377" : "jres:33600378", //RC 33600378 : Číslo akce
            //                width: 130
            //            })
            //            .addNks()
            //            .addTextColumn({
            //                name: "uea_rr",
            //                caption: "jres:33600379", //RC 33600379 : Su RR
            //                width: 55
            //            }).addTextColumn({
            //                name: "ueb_rr",
            //                caption: "jres:33600380", //RC 33600380 : Au RR
            //                width: 60
            //            })
            //            .addSortedEkoCfuSet(
            //                this,
            //                {
            //                    isEditable: false,
            //                    columnExtend: {
            //                        uea: { caption: "jres:33600389" }, //RC 33600389 : Su BÚ
            //                        ueb: { caption: "jres:33600390" }, //RC 33600390 : Au BÚ
            //                    },
            //                    mode: "withoutCheck"
            //                }
            //            )
            //            .addTextColumn({
            //                name: "priz_zaz_txt", //někdy skryto
            //                caption: "jres:33600381", //RC 33600381 : Typ operace
            //                width: 120
            //            }).addCurrencyColumn({
            //                name: "c",
            //                caption: "jres:33600446" //RC 33600446 : Částka krytí CZK
            //            }).addCurrencyColumn({ //needitovatelné
            //                name: "c_vratka",
            //                caption: "jres:33600383" //RC 33600383 : Částka vratky REZ CZK
            //            })
            //        if (!this.sml_pol_mjmview) {
            //            gf.addCurrencyColumn({
            //                name: "m",
            //                caption: "jres:33600333", //RC 33600333 : Množství
            //                format: "number(C3)",
            //                width: 80
            //            }).addTextColumn({
            //                name: "mj_txt",
            //                caption: "jres:33600449", //RC 33600449 : MJ
            //                description: "jres:33600448", //RC 33600448 : Měrná jednotka
            //                width: 120
            //            })
            //        }
            //        gf.addTextColumn({
            //            name: "nazev",
            //            caption: "jres:33600450", //RC 33600450 : Název položky
            //            width: 300
            //        })
            //        gf.addNumberColumn({
            //            name: "drd",
            //            caption: "jres:33600388", //RC 33600388 : DRD
            //            width: 50
            //        })
            //        //Tyto tři sloupce v TK zobrazovány až po načtení dat, zda splňuje podmínku drd = ng_drdObjSml. To je z hlediska WK blbost, takže zobrazím vždy.
            //        gf.addTextColumn({
            //            name: "ixp_sml",
            //            caption: "jres:33600451", //RC 33600451 : Smlouva
            //            width: 120
            //        }).addNumberColumn({
            //            name: "rok_sml",
            //            caption: "jres:33600452" //RC 33600452 : Období SML
            //        }).addNumberColumn({
            //            name: "cislo_sml",
            //            caption: "jres:33600453" //RC 33600453 : # pol. SML
            //        })
            //        return gf;
            //    }
            //}
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBvbEZQQ2hvb3NlQlVQb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU21sUG9sRlBDaG9vc2VCVVBvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQW9iZjtBQXBiRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvYm5CO0lBcGJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvYjdCO1FBcGJvQixXQUFBLFNBQVM7WUFDMUIseURBQXlEO1lBRXpELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQXFCbEQsY0FBYyxDQUFDLElBQUk7b0JBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLGlEQUFpRDtvQkFDL0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFV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QzFKLDRCQUE0QjtZQUM1Qiw4QkFBOEI7WUFDOUIsK0RBQStEO1lBQy9ELHdCQUF3QjtZQUN4Qiw4QkFBOEI7WUFDOUIsOEJBQThCO1lBQzlCLGlFQUFpRTtZQUNqRSw4QkFBOEI7WUFDOUIsZ0NBQWdDO1lBQ2hDLGlFQUFpRTtZQUNqRSxZQUFZO1lBRVosb0JBQW9CO1lBQ3BCLE9BQU87WUFDUCxHQUFHO1FBRVAsQ0FBQyxFQXBib0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb2I3QjtJQUFELENBQUMsRUFwYmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9ibkI7QUFBRCxDQUFDLEVBcGJTLE1BQU0sS0FBTixNQUFNLFFBb2JmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sRlBNYXNzTmV3V2l6YXJkLnRzICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHZ5YnLDoW7DrSBiYW5rb3Zuw61obyDDusSNdHUgYSBwb2xvxb5layBwbMOhbnUgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTExLTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIC8qKiBDb250ZW50IHBybyB2eWJyw6Fuw60gYmFua292bsOtaG8gw7rEjXR1IGEgcG9sb8W+ZWsgcGzDoW51Ki9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbFBvbEZQQ2hvb3NlQlVQb2wgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIC8qKiBDZWxrb3bDvSByZWNvcmQgLSBkb2tsYWQgKyBwxZnDrXBhZCAqL1xyXG4gICAgICAgIHB1YmxpYyBzbWxwaWQ6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvO1xyXG5cclxuICAgICAgICAvKiogREIgcGFyYW1ldHIgUMWZw61zdHVwIGsgdHlwxa9tIELDmiBkbGUga2F0ZWdvcmllIHNtbHV2bsOtaG8gcMWZw61wYWR1Ki9cclxuICAgICAgICBwcml2YXRlIHNtbF9yYWRfYWNrdGdidTogYm9vbGVhbjtcclxuICAgICAgICAvKiogREIgcGFyYW1ldHIgUMWZw61zdHVwIGsgdmxhc3Ruw61tIGJhbmtvdm7DrW0gw7rEjXTFr20qL1xyXG4gICAgICAgIHByaXZhdGUgc21sX3BidnVsOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIER0byBzIHBvbW9jbsO9bWkgcHJvbcSbbm7DvW1pIHBybyBwcsOhY2kgcyBwb2xvxb5rYW1pKi9cclxuICAgICAgICBwcml2YXRlIHBvbTogSW50ZXJmYWNlLkdTbWxGaW5Qb2xvemt5RlBEb2tsYWRQb21vY25lT2JlY25lRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSB1Y3M6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGljbzogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogRm9ybXVsw6HFmSBzIGJhbmtvdm7DrW0gw7rEjXRlbSovXHJcbiAgICAgICAgcHJpdmF0ZSAkZm9ybUJVOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKiBUYWIgcyB2w71ixJtyZW0gcGzDoW51Ki9cclxuICAgICAgICBwcml2YXRlICR0YWJWeWJlclBsYW51OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKiBEaXYgcyB2w71ixJtyZW0gcGzDoW51Ki9cclxuICAgICAgICBwcml2YXRlICRjbnR2eWJlclBsYW51OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChvcHRzKSB7XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoaXMsIG9wdHMpO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMzNjAwNDg0XCI7IC8vUkMgMzM2MDA0ODQgOiBWw71ixJtyIHBvbG/FvmVrIHBsw6FudSBwcm8gdnl0dm/FmWVuw61cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RWeWJyYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5YnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQwNVwiLCAvL1JDIDMzNjAwNDA1IDogVnlicmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVWYWx1ZSA9IHRoaXMuJGZvcm1CVS5maW5kRmllbGRzKFwiYnVfdmxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZ3JpZCA9IHRoaXMuJGNudHZ5YmVyUGxhbnUuZmluZChcIi5nZ3JpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd3MgPSAoKCRncmlkPy5sZW5ndGggPz8gMCkgPT0gMSkgPyAkZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzICYmIHJvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcm93IG9mIHJvd3MgPz8gW10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYnVfdmwgPSBidVZhbHVlPy5idV92bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuc2tfdmwgPSBidVZhbHVlPy5za192bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2Uocm93cyA/PyB2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjMzNjAwNDg1XCIsIC8vUkMgMzM2MDA0ODUgOiBOZXZ5YnLDoW5hIMW+w6FkbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNDg2XCIpOyAvL1JDIDMzNjAwNDg2IDogVnliZXJ0ZSBtaW5pbcOhbG7EmyBqZWRudSBwb2xvxb5rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2cml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RWeWJyYXQhXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHR5cF9idSA9IDA7XHJcbiAgICAgICAgICAgIC8vZG9kYXZhdGVsc2vDqSBzbWxvdXZ5XHJcbiAgICAgICAgICAgIC8vMzQwLjYgMDYuMDYuMDEgLSBkb3BsbsSbbm8gbyBvYmplZG7DoXZrdVxyXG4gICAgICAgICAgICAvLzM0MC42IDA3LjA2LjAxIC0gem3Em25hIGRlZmluaWNlIHR5cHUgw7rEjXR1IC0gbcOtc3RvIGthdGVnb3JpZSBrbmloeSAtIGt0Z19zbWxcclxuICAgICAgICAgICAgLy8zNTMuMSAxNy4wNi4wNSAtIGRvcGzEm24gbGltLiBwxZnDrXNsaWJcclxuICAgICAgICAgICAgLy8zNjguMTUgMjguMTEuMTIgdnlob3plbnkgcMWZw61zbGlieSAtIGt2xa9saSBtb8W+bm9zdGkgdnlkw6F2YXQgeiBwxZnDrWptb3bDvWNoIMO6xI10xa8gLSAgb3Igc21scGlkUC5maW5kb2Mua3RnX3NtbCA9IG5nX2t0Z3NtbExpbVByaXNsaWIgb3Igc21scGlkUC5maW5kb2Mua3RnX3NtbCA9IG5nX2t0Z3NtbEluZFByaXNsaWJcclxuICAgICAgICAgICAgLy8zNzQuMSAyNC4wNy4xNCBwcmVkZXN0aW5hY2UgdnnFmWF6ZW7DvWNoIGt0ZyBiw7ogesOhdmlzw60gbmEgZGIgcGFyYW1ldHJ1IHNtbF9yYWRfYWNrdGdidVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zbWxfcmFkX2Fja3RnYnUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNtbHBpZC5rdGdfc21sID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbERvZCB8fCB0aGlzLnNtbHBpZC5rdGdfc21sID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbERvZE9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vw7rEjWV0IG5lc23DrSBiw710IHDFmcOtam1vdsO9XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX2J1ID0gSW50ZXJmYWNlLlR5cEJlem55VWNldC5uZ190eXBidUluO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9vZGLEm3JhdGVsc2vDqSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAvLzM3MC4xNyAzMS4wNS4xMyBwxZlpZMOhbiBqaW7DvSBwxZnDrWplbVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zbWxwaWQua3RnX3NtbCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGIgfHwgdGhpcy5zbWxwaWQua3RnX3NtbCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGJPYmogfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNtbHBpZC5rdGdfc21sID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbEppbnlQcmlqZW1MaW0gfHwgdGhpcy5zbWxwaWQua3RnX3NtbCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxKaW55UHJpamVtSW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/DusSNZXQgbmVzbcOtIGLDvXQgdsO9ZGFqb3bDvVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9idSA9IEludGVyZmFjZS5UeXBCZXpueVVjZXQubmdfdHlwYnVPdXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybU1hc3NOZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2xheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTUtNy0wLCBNLTUtNy0wLCBTLTEyLTEyLTAsIGJyZWFrcy01MDAtMTAwMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA0ODdcIikgLy9SQyAzMzYwMDQ4NyA6IEJhbmtvdm7DrSDDusSNZXQgdmxhc3Ruw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc3V2bFNtbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5idV92bD12YWx1ZS5idV92bDttb2RlbC5za192bD12YWx1ZS5za192bDttb2RlbC5yb2s9PnZhbHVlLnJvazttb2RlbC5rdGdfYnU8PXZhbHVlLmt0Z19idTttb2RlbC50eXBfYnU8PXZhbHVlLnR5cF9idVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGlzLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGlzLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2J1OiAodHlwX2J1ICE9IDApID8geyBvOiBcIiE9XCIsIHY6IHR5cF9idSB9IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlzdHVwS0JVOiB0aGlzLnNtbF9wYnZ1bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZuaVJvenBvY3RvdnlSZXByZXplbnRhbnQ6IC8qaW5mby5jZWxsSW5mby5kYXRhLnBvbS5yZXppbV9yciovIHRydWUsIC8vdGVvcmV0aWNreSB1ZXg/IC0tIGtkecW+IGJ5bCB1ZXgsIHRhayBzZSBuZW5hxI3DrXRhbCByZXByZXplbnRhbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3ByaTogdGhpcy5zbWxwaWQuaXhzX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnX2Jsb2s6IHRoaXMuc21scGlkLnR5cF9hZ19ibG9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfbmFiOiB0aGlzLnNtbHBpZC5peHBfbmFiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzUyNC4yMSAyMC4wMi4yNCBSWkFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9yX2Npc2xvX25hYjogdGhpcy5zbWxwaWQucG9yX2Npc2xvX25hYixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogdGhpcy5zbWxwaWQuaXhzX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRjbnR2eWJlclBsYW51LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVZ5YmVyUGxhbnUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiBjdHgudmFsdWU/LnVlYV9yciA/PyB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IGN0eC52YWx1ZT8udWViX3JyID8/IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYV9ycjogY3R4LnZhbHVlPy51ZWFfcnIgPz8gdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWViX3JyOiBjdHgudmFsdWU/LnVlYl9yciA/PyB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWFfdWM6IGN0eC52YWx1ZT8udWVhX3VjID8/IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYl91YzogY3R4LnZhbHVlPy51ZWJfdWMgPz8gdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVfdmw6IGN0eC52YWx1ZT8uYnVfdmwgPz8gdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tfdmw6IGN0eC52YWx1ZT8uc2tfdmwgPz8gdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtQlUgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICB0aGlzLiR0YWJWeWJlclBsYW51ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJQb2xvemt5RlBNYXNzV2l6YXJkVnliZXJQbGFudVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA0ODhcIiwgLy9SQyAzMzYwMDQ4OCA6IFbDvWLEm3IgcG9sb8W+ZWsgcGzDoW51XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVnliZXJQbGFudSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVWeWJlclBsYW51KHNlcnZlckZpbHRlcnM/KSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0ge1xyXG4gICAgICAgICAgICAgICAgdWlkOiBcInNtbFJvemFhYXQjXCIsXHJcbiAgICAgICAgICAgICAgICBzbWxwaWQ6IHRoaXMuc21scGlkLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogJC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy5zbWxwaWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvazogdGhpcy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGlzLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyZDogdGhpcy5wb20uZHJkXHJcbiAgICAgICAgICAgICAgICB9LCBzZXJ2ZXJGaWx0ZXJzKSxcclxuICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZEF1dG9sb2FkOiB0aGlzLiRmb3JtQlUuZmluZEZpZWxkcyhcImJ1X3ZsXCIpLmdmaWVsZChcImhhc1ZhbHVlXCIpID8/IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd1RpdGxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kY250dnliZXJQbGFudSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy4kdGFiVnliZXJQbGFudSkuZ2NvbnRlbnQoW0dvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxSb3phYWF0LCBvcHRzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIC8vZXhwb3J0IGNsYXNzIEdTbWxQb2xGUE1hc3NOZXdXaXphcmQgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgLy8gICAgLyoqIENlbGtvdsO9IHJlY29yZCAtIGRva2xhZCArIHDFmcOtcGFkICovXHJcbiAgICAvLyAgICBwdWJsaWMgc21scGlkOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0bztcclxuICAgIC8vICAgIC8qKiBUeXAgaW5zdGFsYWNlKi9cclxuICAgIC8vICAgIHB1YmxpYyB0eXBfaW5zdDogbnVtYmVyO1xyXG4gICAgLy8gICAgLyoqIERCIHBhcmFtZXRyIMWZw61kw61jw60gem9icmF6b3bDoW7DrSBNbm/FvnN0dsOtIGEgTUoqL1xyXG4gICAgLy8gICAgcHVibGljIHNtbF9wb2xfbWptdmlldzogYm9vbGVhbjtcclxuXHJcbiAgICAvLyAgICAvKiogREIgcGFyYW1ldHIgUMWZw61zdHVwIGsgdHlwxa9tIELDmiBkbGUga2F0ZWdvcmllIHNtbHV2bsOtaG8gcMWZw61wYWR1Ki9cclxuICAgIC8vICAgIHByaXZhdGUgc21sX3JhZF9hY2t0Z2J1OiBib29sZWFuO1xyXG4gICAgLy8gICAgLyoqIERCIHBhcmFtZXRyIFDFmcOtc3R1cCBrIHZsYXN0bsOtbSBiYW5rb3Zuw61tIMO6xI10xa9tKi9cclxuICAgIC8vICAgIHByaXZhdGUgc21sX3BidnVsOiBudW1iZXI7XHJcbiAgICAvLyAgICAvKiogRHRvIHMgcG9tb2Nuw71taSBwcm9txJtubsO9bWkgcHJvIHByw6FjaSBzIHBvbG/FvmthbWkqL1xyXG4gICAgLy8gICAgcHJpdmF0ZSBwb206IEludGVyZmFjZS5HU21sRmluUG9sb3preUZQRG9rbGFkUG9tb2NuZU9iZWNuZUR0bztcclxuICAgIC8vICAgIHByaXZhdGUgcm9rOiBudW1iZXI7XHJcbiAgICAvLyAgICBwcml2YXRlIHVjczogc3RyaW5nO1xyXG4gICAgLy8gICAgcHJpdmF0ZSBpY286IHN0cmluZztcclxuXHJcbiAgICAvLyAgICAvKiogQWt0dcOhbG7DrSBzdGVwIHdpemFyZGEgKi9cclxuICAgIC8vICAgIHByaXZhdGUgd2l6YXJkQWN0aXZlU3RlcDogbnVtYmVyO1xyXG4gICAgLy8gICAgLyoqIFRhYiBzIHbDvWLEm3JlbSBwbMOhbnUqL1xyXG4gICAgLy8gICAgcHJpdmF0ZSAkdGFiVnliZXJQbGFudTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgIC8vICAgIC8qKiBEaXYgcyB2w71ixJtyZW0gcGzDoW51Ki9cclxuICAgIC8vICAgIHByaXZhdGUgJGNudHZ5YmVyUGxhbnU6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgLy8gICAgLyoqIEdyaWQgcyBwxZllcMWZaXByYXZlbsO9bWkgesOhem5hbXkgKi9cclxuICAgIC8vICAgIHByaXZhdGUgJGdyaWRTdGVwMjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAvLyAgICBwcmVwYXJlQ29udGVudChvcHRzKSB7XHJcbiAgICAvLyAgICAgICAgJC5leHRlbmQodHJ1ZSwgdGhpcywgb3B0cyk7XHJcbiAgICAvLyAgICAgICAgdGhpcy50aXRsZSA9IFwiSHJvbWFkbsOpIHZ5dHZvxZllbsOtIG5vdsO9Y2ggcG9sb8W+ZWsgZmluYW7EjW7DrWhvIHByb2ZpbHVcIjtcclxuICAgIC8vICAgICAgICB0aGlzLmNyZWF0ZVdpemFyZCgpO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIC8qKiBWeXR2b8WZZW7DrSBwcsWvdm9kY2UgKi9cclxuICAgIC8vICAgIHByaXZhdGUgY3JlYXRlV2l6YXJkKCkge1xyXG4gICAgLy8gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gICAgICAgIHZhciB3aXphcmQgPSBuZXcgR29yZGljLldpemFyZCgpO1xyXG4gICAgLy8gICAgICAgIHdpemFyZC5jcmVhdGUoXHJcbiAgICAvLyAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXNcclxuICAgIC8vICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgdGl0bGU6IFwiSHJvbWFkbsOpIHZ5dHZvxZllbsOtIG5vdsO9Y2ggcG9sb8W+ZWtcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2tyb2sgMSAtIHbDvWLEm3IgYmFua292bsOtaG8gw7rEjXR1IMSNaSBpZGVudGlmaWvDoXRvcnUgcm96cG/EjXRvdsOpaG8ga29udGFcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWFzc05ldzFcIixcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYWTDoW7DrSBiYW5rb3Zuw61obyDDusSNdHUgYSB2w71ixJtyIHBvbG/FvmVrIHBsw6FudVwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IChjbnQsIGNvbnRlbnREaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNoYW5nZSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGVwMShjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGNudCwgY29udGVudERpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBvYmogPSB7IGFjdGl2ZVN0ZXA6IGNoYW5nZS5hY3RpdmVTdGVwIH07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChjaGFuZ2UudGFzay5uZXh0U3RlcCAhPSBjaGFuZ2UuYWN0aXZlU3RlcCAmJiBjaGFuZ2UudGFzay5uZXh0U3RlcCAhPSArK29iai5hY3RpdmVTdGVwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjaGFuZ2Uuc3RlcHNDYW5jZWxbY2hhbmdlLnRhc2submV4dFN0ZXAgPz8gMF07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZm9ybU1hc3NOZXcgPSB0aGlzLiRjbnR2eWJlclBsYW51LmZpbmRGb3JtcyhcImZvcm1NYXNzTmV3XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkZm9ybU1hc3NOZXcuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2Uuc3RlcHNDYW5jZWxbMV0gPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5hY3RpdmVTdGVwICE9IGNoYW5nZS50YXNrLm5leHRTdGVwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLklucHV0RHRvID0gZmlsdGVyZWREdG87XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRncmlkID0gdGhpcy4kY250dnliZXJQbGFudS5maW5kKFwiLmdncmlkXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSAkZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPCAxKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy53YXJuaW5nKFwiVXBvem9ybsSbbsOtXCIsIFwiVnliZXJ0ZSBtaW5pbcOhbG7EmyBqZWRlbiB6w6F6bmFtIHBybyB2eWdlbmVyb3bDoW7DrVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlLnN0ZXBzQ2FuY2VsWzFdID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiB7IGNhcHRpb246IFwiVnl0dm/FmWl0XCIgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2tyb2sgMiAtIFbDvXNsZWRlayB2eXR2b8WZZW7DrSBub3bDvWNoIHBvbG/FvmVrXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIk1hc3NOZXcyXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogKGNudCwgY29udGVudERpdjogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY2hhbmdlKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpemFyZEFjdGl2ZVN0ZXAgPSBjaGFuZ2UuYWN0aXZlU3RlcDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5zdGVwc0VuYWJsZVswXSA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLnN0ZXBzQ2FuY2VsWzBdID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVN0ZXAyKGNudCwgY29udGVudERpdiwgY2hhbmdlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7IGFjdGl2ZVN0ZXA6IGNoYW5nZS5hY3RpdmVTdGVwIH07XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5hY3RpdmVTdGVwICE9IGNoYW5nZS50YXNrLm5leHRTdGVwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLklucHV0RHRvID0gZmlsdGVyZWREdG87XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgIF1cclxuICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgIClcclxuICAgIC8vICAgIH1cclxuXHJcbiAgICAvLyAgICAvKipcclxuICAgIC8vICAgICAqIFZ5dHZvxZllbsOtIHBydm7DrSBrcm9rdSBwcsWvdm9kY2VcclxuICAgIC8vICAgICAqIEBwYXJhbSBjbnRcclxuICAgIC8vICAgICAqIEBwYXJhbSBjb250ZW50RGl2XHJcbiAgICAvLyAgICAgKiBAcGFyYW0gY2hhbmdlXHJcbiAgICAvLyAgICAgKi9cclxuICAgIC8vICAgIHByaXZhdGUgY3JlYXRlU3RlcDEoY250OiBHQ29udGVudCwgY29udGVudERpdjogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY2hhbmdlOiBPR1dpemFyZENoYW5nZSkge1xyXG4gICAgLy8gICAgICAgIHRoaXMud2l6YXJkQWN0aXZlU3RlcCA9IGNoYW5nZS5hY3RpdmVTdGVwO1xyXG4gICAgLy8gICAgICAgIHZhciBvcHRzID0ge1xyXG4gICAgLy8gICAgICAgICAgICBJRDogXCJHU21sUG9sb3preUZQTWFzc05ld1dpemFyZCNcIixcclxuICAgIC8vICAgICAgICAgICAgc21scGlkOiB0aGlzLnNtbHBpZCxcclxuICAgIC8vICAgICAgICAgICAgc21sX3JhZF9hY2t0Z2J1OiB0aGlzLnNtbF9yYWRfYWNrdGdidSxcclxuICAgIC8vICAgICAgICAgICAgc21sX3BidnVsOiB0aGlzLnNtbF9wYnZ1bCxcclxuICAgIC8vICAgICAgICAgICAgcm9rOiB0aGlzLnJvayxcclxuICAgIC8vICAgICAgICAgICAgdWNzOiB0aGlzLnVjcyxcclxuICAgIC8vICAgICAgICAgICAgaWNvOiB0aGlzLmljbyxcclxuICAgIC8vICAgICAgICAgICAgcG9tOiB0aGlzLnBvbSxcclxuICAgIC8vICAgICAgICAgICAgaXhwUm96UmVxOiBmYWxzZSAvKnRydWUqLyAvL3phdMOtbSBwcm8gdGVzdG92w6Fuw60gZmFsc2VcclxuICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgIHRoaXMuJGNudHZ5YmVyUGxhbnUgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpLmdjb250ZW50KFtHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sRlBDaG9vc2VCVVBvbCwgb3B0c10pO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIC8qKlxyXG4gICAgLy8gICAgICogVnl0dm/FmWVuw60gZHJ1aMOpaG8ga3Jva3UgcHLFr3ZvZGNlXHJcbiAgICAvLyAgICAgKiBAcGFyYW0gY250XHJcbiAgICAvLyAgICAgKiBAcGFyYW0gY29udGVudERpdlxyXG4gICAgLy8gICAgICogQHBhcmFtIGNoYW5nZVxyXG4gICAgLy8gICAgICovXHJcbiAgICAvLyAgICBwcml2YXRlIGNyZWF0ZVN0ZXAyKGNudDogR0NvbnRlbnQsIGNvbnRlbnREaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNoYW5nZTogT0dXaXphcmRDaGFuZ2UpIHtcclxuICAgIC8vICAgICAgICBsZXQgJHRhYkRva2xhZCA9ICQubmV3RGl2KClcclxuICAgIC8vICAgICAgICAgICAgLmFwcGVuZFRvKGNvbnRlbnREaXYpXHJcbiAgICAvLyAgICAgICAgICAgIC5ndGFiKHtcclxuICAgIC8vICAgICAgICAgICAgICAgIGlkOiBcInRhYlBvbG96a3lGUE1hc3NXaXphcmRQb2xvemt5XCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWsgdnl0dm/FmWVuw60gcG9sb8W+ZWtcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZVxyXG4gICAgLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgICAgdGhpcy4kZ3JpZFN0ZXAyID0gJC5uZXdEaXYoKS5hcHBlbmRUbygkdGFiRG9rbGFkKVxyXG4gICAgLy8gICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUG9sb3preUZQTWFzc1dpemFyZFBvbG96a3lcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAvLyAgICAgICAgICAgICAgICAvL2RhdGE6IFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIC8va2V5OiBbXCJpeHBcIiwgXCJyb2tcIiwgXCJjaXNsb1wiXVxyXG4gICAgLy8gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIml4cCxyb2ssY2lzbG9cIlxyXG4gICAgLy8gICAgICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAgLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy8gICAgLyoqXHJcbiAgICAvLyAgICAgKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgcHJvIGdyaWQgcyB2w71zbGVka2VtIHZ5dHZvxZllbsOtXHJcbiAgICAvLyAgICAgKiBAcmV0dXJuc1xyXG4gICAgLy8gICAgICovXHJcbiAgICAvLyAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdTbWxkcG9sRHRvPiB7XHJcbiAgICAvLyAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgLy8gICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgIC8vICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJ1cF9zdGF2X3prclwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzc0XCIsIC8vUkMgMzM2MDAzNzQgOiBTIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgZmllbGQ6IFwidXBfc3Rhdl96a3JcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJ7dXBfc3Rhdl90eHR9XCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzc1XCIsIC8vUkMgMzM2MDAzNzUgOiBTdGF2IGRva2xhZHVcclxuICAgIC8vICAgICAgICAgICAgICAgIHdpZHRoOiAzNVxyXG4gICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkUm9rKClcclxuICAgIC8vICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiNcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzNzZcIiwgLy9SQyAzMzYwMDM3NiA6IFBvxZlhZMOtXHJcbiAgICAvLyAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgIC8vICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAgLmFkZEJhbmtvdm5pVWNldFZsYXN0bmkoKVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19wb2xfcGxhXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiAodGhpcy50eXBfaW5zdCA9PSBJbnRlcmZhY2UuVHlwSW5zdGFsYWNlLm5nX3R5aUFjcikgPyBcImpyZXM6MzM2MDAzNzdcIiA6IFwianJlczozMzYwMDM3OFwiLCAvL1JDIDMzNjAwMzc4IDogxIzDrXNsbyBha2NlXHJcbiAgICAvLyAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGROa3MoKVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcInVlYV9yclwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzc5XCIsIC8vUkMgMzM2MDAzNzkgOiBTdSBSUlxyXG4gICAgLy8gICAgICAgICAgICAgICAgd2lkdGg6IDU1XHJcbiAgICAvLyAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJ1ZWJfcnJcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM4MFwiLCAvL1JDIDMzNjAwMzgwIDogQXUgUlJcclxuICAgIC8vICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxyXG4gICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkU29ydGVkRWtvQ2Z1U2V0KFxyXG4gICAgLy8gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgIC8vICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBpc0VkaXRhYmxlOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBjb2x1bW5FeHRlbmQ6IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiB7IGNhcHRpb246IFwianJlczozMzYwMDM4OVwiIH0sIC8vUkMgMzM2MDAzODkgOiBTdSBCw5pcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdWViOiB7IGNhcHRpb246IFwianJlczozMzYwMDM5MFwiIH0sIC8vUkMgMzM2MDAzOTAgOiBBdSBCw5pcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwid2l0aG91dENoZWNrXCJcclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgKVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfemF6X3R4dFwiLCAvL27Em2tkeSBza3J5dG9cclxuICAgIC8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM4MVwiLCAvL1JDIDMzNjAwMzgxIDogVHlwIG9wZXJhY2VcclxuICAgIC8vICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgIC8vICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0NDZcIiAvL1JDIDMzNjAwNDQ2IDogxIzDoXN0a2Ega3J5dMOtIENaS1xyXG4gICAgLy8gICAgICAgICAgICB9KS5hZGRDdXJyZW5jeUNvbHVtbih7IC8vbmVlZGl0b3ZhdGVsbsOpXHJcbiAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcImNfdnJhdGthXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzODNcIiAvL1JDIDMzNjAwMzgzIDogxIzDoXN0a2EgdnJhdGt5IFJFWiBDWktcclxuICAgIC8vICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICBpZiAoIXRoaXMuc21sX3BvbF9tam12aWV3KSB7XHJcbiAgICAvLyAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgIC8vICAgICAgICAgICAgICAgIG5hbWU6IFwibVwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzMzXCIsIC8vUkMgMzM2MDAzMzMgOiBNbm/FvnN0dsOtXHJcbiAgICAvLyAgICAgICAgICAgICAgICBmb3JtYXQ6IFwibnVtYmVyKEMzKVwiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAvLyAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJtal90eHRcIixcclxuICAgIC8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQ0OVwiLCAvL1JDIDMzNjAwNDQ5IDogTUpcclxuICAgIC8vICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0NDhcIiwgLy9SQyAzMzYwMDQ0OCA6IE3Em3Juw6EgamVkbm90a2FcclxuICAgIC8vICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgIC8vICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDUwXCIsIC8vUkMgMzM2MDA0NTAgOiBOw6F6ZXYgcG9sb8W+a3lcclxuICAgIC8vICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgLy8gICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgIC8vICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzg4XCIsIC8vUkMgMzM2MDAzODggOiBEUkRcclxuICAgIC8vICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAvLyAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAvL1R5dG8gdMWZaSBzbG91cGNlIHYgVEsgem9icmF6b3bDoW55IGHFviBwbyBuYcSNdGVuw60gZGF0LCB6ZGEgc3BsxYh1amUgcG9kbcOtbmt1IGRyZCA9IG5nX2RyZE9ialNtbC4gVG8gamUgeiBobGVkaXNrYSBXSyBibGJvc3QsIHRha8W+ZSB6b2JyYXrDrW0gdsW+ZHkuXHJcbiAgICAvLyAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiaXhwX3NtbFwiLFxyXG4gICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0NTFcIiwgLy9SQyAzMzYwMDQ1MSA6IFNtbG91dmFcclxuICAgIC8vICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgLy8gICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwicm9rX3NtbFwiLFxyXG4gICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0NTJcIiAvL1JDIDMzNjAwNDUyIDogT2Jkb2LDrSBTTUxcclxuICAgIC8vICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgLy8gICAgICAgICAgICBuYW1lOiBcImNpc2xvX3NtbFwiLFxyXG4gICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0NTNcIiAvL1JDIDMzNjAwNDUzIDogIyBwb2wuIFNNTFxyXG4gICAgLy8gICAgICAgIH0pXHJcblxyXG4gICAgLy8gICAgICAgIHJldHVybiBnZjtcclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG5cclxufSJdfQ==