"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlInfo.ts                            </Name>
//    <Description> Dialog Info (souhrnné informace)                            </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-05-11                                                  </Created>
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
            /** Dialog Info (souhrnné informace) */
            let GSmlInfo = class GSmlInfo extends Gordic.GContentBase {
                closing() {
                    return this.isl.SmlInfo.deleteTmpData().get();
                }
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.createGrid();
                    this.$form.findFields().gfield("model", "apply", this.modelInfo, { initialValues: true });
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: function (ev, ctx) {
                                this.setPending(that.tryClose());
                            }
                        }),
                        actPrint: Gordic.Eko.Action.actionTisk({
                            name: "actPrint",
                            enabled: true,
                            tema: "sml_ptm_inf",
                            ixsStr: this.sml_ptm_inf,
                            serverParameterMethod: "Gordic.Sml.WebClient.GSmlInfo:ServerParameterMethod",
                            customDto: function () {
                                return { ixp_sml_pri: that.smlpid.ixp_sml_pri, text: that.modelInfo.title, ikc: that.ikc, ekoBookVariant: Gordic.Eko.Utils.getEkoBookVariant(that) };
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actPrint", "actZavrit"]));
                }
                /** Vytvoření gridu pod formem */
                createGrid() {
                    $.newDiv().appendTo(this.element).ggrid({
                        name: "gridInfoFinancovaniPripadu",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlInfo.financovaniPripadu({ typ_dok: this.smlpid.typ_dok ?? 0, ktg_sml: this.smlpid.ktg_sml ?? 0, ixs_pri: this.smlpid.ixs_pri ?? "" }), {
                            onResponse: (data) => {
                                //součet čerpání za smlouvu
                                var p_c_uhr = new Decimal(0);
                                for (var dto of data.data) {
                                    p_c_uhr = p_c_uhr.plus(parseDecimal(dto.c_0 ?? 0));
                                }
                                this.$form.findFields("p_c_uhr").gfield("setInitial", p_c_uhr);
                                return data;
                            }
                        }),
                    }).ggrideko({ summaryRow: true, summaryRowAllowed: true }).gautofit();
                }
                /**
                 * Sloupce financování pro případ
                 * @returns Gridformát pro grid
                 */
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    let typ_dok = this.smlpid.typ_dok;
                    gf.addRok()
                        .addNks();
                    gf.addSortedEkoCfuSet(this);
                    //344.21 12.09.02 - zneviditelněno, pokud neváže na VZ
                    //353.1 16.06.05 doplněn lim. příslib
                    if (!(typ_dok == 10 /* Interface.TypDokladu.ng_typdokObj */ || ((typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ || typ_dok == 20 /* Interface.TypDokladu.ng_typdokLim */ || typ_dok == 22 /* Interface.TypDokladu.ng_typdokInd */)
                        && (this.smlpid.ixs_pri?.trim()?.length ?? 0) == 0))) {
                        gf.addCurrencyColumn({
                            name: "c_11",
                            caption: "jres:33600289", //RC 33600289 : Nasmlouváno BLK
                            width: 120
                        });
                    }
                    //342.50 30.11.01 - podle typu dokladu - řízení viditelnosti
                    //344.20 12.09.02 - schováno i pro případ smlouvy vázané na VZ
                    //353.1 16.06.05 doplněn lim. příslib
                    if (!(typ_dok == 10 /* Interface.TypDokladu.ng_typdokObj */ || ((typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ || typ_dok == 20 /* Interface.TypDokladu.ng_typdokLim */ || typ_dok == 22 /* Interface.TypDokladu.ng_typdokInd */)
                        && (this.smlpid.ixs_pri?.trim()?.length ?? 0) > 0))) {
                        gf.addCurrencyColumn({
                            name: "c_10",
                            caption: "jres:33600290", //RC 33600290 : Nasmlouváno ROZ
                            width: 120
                        });
                    }
                    //342.50 30.11.01 - podle typu dokladu - řízení viditelnosti
                    //353.1 16.06.05 doplněn lim. příslib
                    if (!(typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ || typ_dok == 20 /* Interface.TypDokladu.ng_typdokLim */ || typ_dok == 22 /* Interface.TypDokladu.ng_typdokInd */)) {
                        gf.addCurrencyColumn({
                            name: "c_15",
                            caption: "jres:33600291", //RC 33600291 : Objednáno ROZ
                            width: 120
                        });
                    }
                    if (typ_dok != 10 /* Interface.TypDokladu.ng_typdokObj */) {
                        gf.addCurrencyColumn({
                            name: "c_16",
                            caption: "jres:33600292", //RC 33600292 : Objednáno SML
                            width: 120
                        });
                    }
                    if (!(typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ || typ_dok == 20 /* Interface.TypDokladu.ng_typdokLim */ || typ_dok == 22 /* Interface.TypDokladu.ng_typdokInd */)) {
                        gf.addCurrencyColumn({
                            name: "c_17",
                            caption: "jres:33600293", //RC 33600293 : Objednáno BLK
                            width: 120
                        });
                    }
                    gf.addCurrencyColumn({
                        name: "c_18",
                        caption: "jres:33600294", //RC 33600294 : Očekávané čerpání
                        width: 120
                    }).addCurrencyColumn({
                        name: "c_0",
                        caption: "jres:33600295", //RC 33600295 : Čerpáno
                        width: 120
                    });
                    //344.13 26.07.02
                    if (typ_dok != 10 /* Interface.TypDokladu.ng_typdokObj */) {
                        gf.addCurrencyColumn({
                            caption: "jres:33600296", //RC 33600296 : Očekávané čerpání OBJ
                            name: "c_fak_obj",
                            width: 120
                        });
                    }
                    return gf;
                }
                /** Vytvoření formuláře */
                createForm() {
                    var form = new Gordic.Forms.Form({
                        name: "formInfo",
                        layoutDescriptor: "L2M2S1, L-5-7-0, M-5-7-0, S-12-12-0, breaks-500-1000"
                    })
                        .addSection("jres:33600297") //RC 33600297 : Případ
                        .addRow(String.Format("jres:33600298", this.gf_getKtgSmlGroupName2p(this.modelInfo.ktg_sml), this.modelInfo.mena_zkr)) //RC 33600298 : Cena {0} {1}
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_mena_doc",
                        model: "pripad.p_c_mena_doc",
                        disabled: true
                    })
                        .addRow("jres:33600299" + this.modelInfo.mena_zkr) //RC 33600299 : Celková částka 
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_mena",
                        model: "pripad.p_c_mena",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600300" + this.modelInfo.mena_zkr, //RC 33600300 : Rozpis částky 
                        hint: "jres:33600614" //RC 33600614 : Částka rozpisu případu na roky za celé období financování v měně
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_mena_roz",
                        model: "pripad.p_c_mena_roz",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600301", //RC 33600301 : Rozpis částky CZK
                        hint: "jres:33600615" //RC 33600615 : Částka rozpisu případu na roky za celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_rozpis",
                        model: "pripad.p_c_rozpis",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600302", //RC 33600302 : Částka položek FP
                        hint: "jres:33600616" //RC 33600616 : Částka položek FP případu celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_pol",
                        model: "pripad.p_c_pol",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600303", //RC 33600303 : Výdaje položek FP CZK
                        hint: "jres:33600621" //RC 33600621 : Částka výdajových položek FP případu celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_pol_vyd",
                        model: "pripad.p_c_pol_vyd",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600304", //RC 33600304 : Příjmy položek FP CZK
                        hint: "jres:33600622" //RC 33600622 : Částka příjmových položek FP případu celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_pol_pri",
                        model: "pripad.p_c_pol_pri",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600305", //RC 33600305 : Částka sledovaných úprav
                        hint: "jres:33600623" //RC 33600623 : Částka sledovaných úprav případu v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_dod_old",
                        model: "pripad.p_c_dod_old",
                        disabled: true
                    })
                        .addSection("jres:33600306") //RC 33600306 : Doklad
                        .addRow({
                        label: String.Format("jres:33600298", this.gf_getKtgSmlGroupName2p(this.modelInfo.ktg_sml), this.modelInfo.mena_zkr), //RC 33600298 : Cena {0} {1}
                        hint: "jres:33600625" //RC 33600625 : Celková cena aktuálního dokladu v měně
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_mena_doc",
                        model: "doklad.d_c_mena_doc",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600299" + this.modelInfo.mena_zkr, //RC 33600299 : Celková částka 
                        hint: "jres:33600624" //RC 33600624 : Celková částka financování aktuálního dokladu v měně
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_mena",
                        model: "doklad.d_c_mena",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600300" + this.modelInfo.mena_zkr, //RC 33600300 : Rozpis částky 
                        hint: "jres:33600626" //RC 33600626 : Částka rozpisu dokladu na roky za celé období financování v měně
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_mena_roz",
                        model: "doklad.d_c_mena_roz",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600301", //RC 33600301 : Rozpis částky CZK
                        hint: "jres:33600627" //RC 33600627 : Částka rozpisu dokladu na roky za celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_rozpis",
                        model: "doklad.d_c_rozpis",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600302", //RC 33600302 : Částka položek FP
                        hint: "jres:33600628" //RC 33600628 : Částka položek FP dokladu za celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_pol",
                        model: "doklad.d_c_pol",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600303", //RC 33600303 : Výdaje položek FP CZK
                        hint: "jres:33600629" //RC 33600629 : Částka výdajových položek FP dokladu celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_pol_vyd",
                        model: "doklad.d_c_pol_vyd",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600304", //RC 33600304 : Příjmy položek FP CZK
                        hint: "jres:33600630" //RC 33600630 : Částka příjmových položek FP dokladu celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_pol_pri",
                        model: "doklad.d_c_pol_pri",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600305", //RC 33600305 : Částka sledovaných úprav
                        hint: "jres:33600631" //RC 33600631 : Částka sledovaných úprav dokladu v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "d_c_dod_old",
                        model: "doklad.d_c_dod_old",
                        disabled: true
                    });
                    if (this.typInst == 10 /* Interface.TypInstalace.ng_tyiAcr */) {
                        form.addRow("jres:33600307") //RC 33600307 : Majetkové plnění celkem
                            .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                            name: "m_c_pol",
                            model: "doklad.m_c_pol",
                            disabled: true
                        });
                    }
                    form.addSection("jres:33600308") //RC 33600308 : Rezervace celkem za případ
                        .addRow({
                        label: "jres:33600309", //RC 33600309 : Očekávaní čerpání
                        hint: "jres:33600617" //RC 33600617 : Částka očekávaného čerpání případu celé období financování v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_fak",
                        model: "pripad.p_c_fak",
                        disabled: true
                    })
                        .addRow("jres:33600310") //RC 33600310 : Čerpání
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_uhr",
                        disabled: true
                    })
                        .addRow("jres:33600311") //RC 33600311 : Disponibilní částka financování
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_diff",
                        model: "pripad.p_c_diff",
                        disabled: true
                    })
                        .addSection("jres:33600312") //RC 33600312 : Financování případu v aktuálním období
                        .addRow({
                        label: "jres:33600313", //RC 33600313 : Nasmlouváno, objednáno
                        hint: "jres:33600618" //RC 33600618 : Částka položek FP případu v aktuálním období v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_pol_akt",
                        model: "pripad.p_c_pol_akt",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600314", //RC 33600314 : Očekávané čerpání
                        hint: "jres:33600619" //RC 33600619 : Částka očekávaného čerpání případu v aktuálním období v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_fak_akt",
                        model: "pripad.p_c_fak_akt",
                        disabled: true
                    })
                        .addRow({
                        label: "jres:33600315", //RC 33600315 : K uvolnění
                        hint: "jres:33600620" //RC 33600620 : Disponibilní částka finacování případu v aktuálním období v CZK
                    })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "p_c_diff_akt",
                        model: "pripad.p_c_diff_akt",
                        disabled: true
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                //TODO: je i v C# ... přesunout do společných funkcí pro .ts
                /**
                 * 378.12 31.05.17 vrací agregovaný název dle kategorie sml dokladu pro popis celkové částky dokladu
                 * @param ktg_sml_p
                 * @returns
                 */
                gf_getKtgSmlGroupName2p(ktg_sml_p) {
                    if (ktg_sml_p == 50 /* Interface.KategorieDokladu.ng_ktgsmlDodObj */ || ktg_sml_p == 60 /* Interface.KategorieDokladu.ng_ktgsmlOdbObj */) {
                        return "jres:33600316"; //RC 33600316 : objednávky
                    }
                    //!353.1 16.06.05 rozlišen limitovaný příslib
                    else if (ktg_sml_p == 10 /* Interface.KategorieDokladu.ng_ktgsmlDod */ || ktg_sml_p == 20 /* Interface.KategorieDokladu.ng_ktgsmlOdb */) {
                        return "jres:33600317"; //RC 33600317 : smlouvy
                    }
                    else if (ktg_sml_p == 90 /* Interface.KategorieDokladu.ng_ktgsmlLimPrislib */ || ktg_sml_p == 91 /* Interface.KategorieDokladu.ng_ktgsmlIndPrislib */) {
                        return "jres:33600318"; //RC 33600318 : příslibu
                    }
                    else if (ktg_sml_p == 84 /* Interface.KategorieDokladu.ng_ktgsmlJinyPrijemLim */ || ktg_sml_p == 85 /* Interface.KategorieDokladu.ng_ktgsmlJinyPrijemInd */) {
                        return "jres:33600319"; //RC 33600319 : příjmu
                    }
                    else {
                        return "";
                    }
                }
            };
            GSmlInfo = __decorate([
                Decorators.gcontent
            ], GSmlInfo);
            WebClient.GSmlInfo = GSmlInfo;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbEluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU21sSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQWlaZjtBQWpaRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpWm5CO0lBalpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpWjdCO1FBalpvQixXQUFBLFNBQVM7WUFTMUIsdUNBQXVDO1lBRXZDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSxPQUFBLFlBQVk7Z0JBaUJ0QyxPQUFPO29CQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2xELENBQUM7Z0JBRUQsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQzVGLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRC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QUM3RSxDQUFDO2dCQUVELDREQUE0RDtnQkFDNUQ7Ozs7bUJBSUc7Z0JBQ0ssdUJBQXVCLENBQUMsU0FBb0M7b0JBQ2hFLElBQUksU0FBUyx1REFBOEMsSUFBSSxTQUFTLHVEQUE4QyxFQUFFLENBQUM7d0JBQ3JILE9BQU8sZUFBZSxDQUFDLENBQUMsMEJBQTBCO29CQUN0RCxDQUFDO29CQUNELDZDQUE2Qzt5QkFDeEMsSUFBSSxTQUFTLG9EQUEyQyxJQUFJLFNBQVMsb0RBQTJDLEVBQUUsQ0FBQzt3QkFDcEgsT0FBTyxlQUFlLENBQUMsQ0FBQyx1QkFBdUI7b0JBQ25ELENBQUM7eUJBQU0sSUFBSSxTQUFTLDJEQUFrRCxJQUFJLFNBQVMsMkRBQWtELEVBQUUsQ0FBQzt3QkFDcEksT0FBTyxlQUFlLENBQUMsQ0FBQyx3QkFBd0I7b0JBQ3BELENBQUM7eUJBQU0sSUFBSSxTQUFTLDhEQUFxRCxJQUFJLFNBQVMsOERBQXFELEVBQUUsQ0FBQzt3QkFDMUksT0FBTyxlQUFlLENBQUMsQ0FBQyxzQkFBc0I7b0JBQ2xELENBQUM7eUJBQU0sQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQztvQkFDZCxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBcllZLFFBQVE7Z0JBRHBCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsUUFBUSxDQXFZcEI7WUFyWVksa0JBQVEsV0FxWXBCLENBQUE7UUFDTCxDQUFDLEVBalpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpWjdCO0lBQUQsQ0FBQyxFQWpaZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaVpuQjtBQUFELENBQUMsRUFqWlMsTUFBTSxLQUFOLE1BQU0sUUFpWmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxJbmZvLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gRGlhbG9nIEluZm8gKHNvdWhybm7DqSBpbmZvcm1hY2UpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMDUtMTEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbEluZm9EbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgLyoqIENlbGtvdsO9IHJlY29yZCAtIGRva2xhZCArIHDFmcOtcGFkICovXHJcbiAgICAgICAgc21scGlkOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0b1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbEluZm9EbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERpYWxvZyBJbmZvIChzb3Vocm5uw6kgaW5mb3JtYWNlKSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sSW5mbyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIENlbGtvdsO9IHJlY29yZCAtIGRva2xhZCArIHDFmcOtcGFkICovXHJcbiAgICAgICAgcHVibGljIHNtbHBpZDogSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9cclxuXHJcbiAgICAgICAgLy9Db250ZW50VmFsdWVzXHJcbiAgICAgICAgLyoqIERhdGEgcHJvIG5hcGxuxJtuw60gZm9ybXUqL1xyXG4gICAgICAgIHByaXZhdGUgbW9kZWxJbmZvOiBJbnRlcmZhY2UuR1NtbEluZm9EdG9cclxuICAgICAgICAvKiogVHlwIGFrdHXDoWxuw60gaW5zdGFsYWNlKi9cclxuICAgICAgICBwcml2YXRlIHR5cEluc3Q6IG51bWJlcjtcclxuICAgICAgICAvKiogRGF0YWLDoXpvdsO9IHBhcmFtZXRyIHBybyB0aXNrIChpeHNTdHIpKi9cclxuICAgICAgICBwcml2YXRlIHNtbF9wdG1faW5mO1xyXG4gICAgICAgIC8qKiBpa2MgKi9cclxuICAgICAgICBwcml2YXRlIGlrYzogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogSGxhdm7DrSBmb3JtdWzDocWZICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgY2xvc2luZygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbEluZm8uZGVsZXRlVG1wRGF0YSgpLmdldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWxJbmZvLCB7aW5pdGlhbFZhbHVlczogdHJ1ZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnRyeUNsb3NlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpbnQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwic21sX3B0bV9pbmZcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoaXMuc21sX3B0bV9pbmYsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxJbmZvOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpeHBfc21sX3ByaTogdGhhdC5zbWxwaWQuaXhwX3NtbF9wcmksIHRleHQ6IHRoYXQubW9kZWxJbmZvLnRpdGxlLCBpa2M6IHRoYXQuaWtjLCBla29Cb29rVmFyaWFudDogRWtvLlV0aWxzLmdldEVrb0Jvb2tWYXJpYW50KHRoYXQpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQcmludFwiLCBcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWR1IHBvZCBmb3JtZW0gKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRJbmZvRmluYW5jb3ZhbmlQcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5TbWxJbmZvLmZpbmFuY292YW5pUHJpcGFkdShcclxuICAgICAgICAgICAgICAgICAgICB7IHR5cF9kb2s6IHRoaXMuc21scGlkLnR5cF9kb2s/PzAsIGt0Z19zbWw6IHRoaXMuc21scGlkLmt0Z19zbWw/PzAsIGl4c19wcmk6IHRoaXMuc21scGlkLml4c19wcmkgPz8gXCJcIiB9IFxyXG4gICAgICAgICAgICAgICAgKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc291xI1ldCDEjWVycMOhbsOtIHphIHNtbG91dnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBfY191aHIgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZHRvIG9mIGRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcF9jX3VociA9IHBfY191aHIucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMCA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9ybS5maW5kRmllbGRzKFwicF9jX3VoclwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHBfY191aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSkuZ2dyaWRla28oe3N1bW1hcnlSb3c6IHRydWUsIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlfSkuZ2F1dG9maXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNsb3VwY2UgZmluYW5jb3bDoW7DrSBwcm8gcMWZw61wYWRcclxuICAgICAgICAgKiBAcmV0dXJucyBHcmlkZm9ybcOhdCBwcm8gZ3JpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBEYXRhLkdyaWRGb3JtYXQ8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HU21sSW5mb0ZpbmFuY292YW5pUHJpcGFkdUR0bz4oKTtcclxuICAgICAgICAgICAgbGV0IHR5cF9kb2sgPSB0aGlzLnNtbHBpZC50eXBfZG9rO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkUm9rKClcclxuICAgICAgICAgICAgICAgIC5hZGROa3MoKTtcclxuICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMpO1xyXG4gICAgICAgICAgICAvLzM0NC4yMSAxMi4wOS4wMiAtIHpuZXZpZGl0ZWxuxJtubywgcG9rdWQgbmV2w6HFvmUgbmEgVlpcclxuICAgICAgICAgICAgLy8zNTMuMSAxNi4wNi4wNSBkb3BsbsSbbiBsaW0uIHDFmcOtc2xpYlxyXG4gICAgICAgICAgICBpZiAoISh0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva09iaiB8fCAoKHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rU21sIHx8IHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rTGltIHx8IHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rSW5kKVxyXG4gICAgICAgICAgICAgICAgJiYgKHRoaXMuc21scGlkLml4c19wcmk/LnRyaW0oKT8ubGVuZ3RoID8/IDApID09IDApKSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI4OVwiLCAvL1JDIDMzNjAwMjg5IDogTmFzbWxvdXbDoW5vIEJMS1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8zNDIuNTAgMzAuMTEuMDEgLSBwb2RsZSB0eXB1IGRva2xhZHUgLSDFmcOtemVuw60gdmlkaXRlbG5vc3RpXHJcbiAgICAgICAgICAgIC8vMzQ0LjIwIDEyLjA5LjAyIC0gc2Nob3bDoW5vIGkgcHJvIHDFmcOtcGFkIHNtbG91dnkgdsOhemFuw6kgbmEgVlpcclxuICAgICAgICAgICAgLy8zNTMuMSAxNi4wNi4wNSBkb3BsbsSbbiBsaW0uIHDFmcOtc2xpYlxyXG4gICAgICAgICAgICBpZiAoISh0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva09iaiB8fCAoKHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rU21sIHx8IHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rTGltIHx8IHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rSW5kKVxyXG4gICAgICAgICAgICAgICAgJiYgKHRoaXMuc21scGlkLml4c19wcmk/LnRyaW0oKT8ubGVuZ3RoID8/IDApID4gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXzEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjkwXCIsIC8vUkMgMzM2MDAyOTAgOiBOYXNtbG91dsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLzM0Mi41MCAzMC4xMS4wMSAtIHBvZGxlIHR5cHUgZG9rbGFkdSAtIMWZw616ZW7DrSB2aWRpdGVsbm9zdGlcclxuICAgICAgICAgICAgLy8zNTMuMSAxNi4wNi4wNSBkb3BsbsSbbiBsaW0uIHDFmcOtc2xpYlxyXG4gICAgICAgICAgICBpZiAoISh0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva1NtbCB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0xpbSB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0luZCkpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyOTFcIiwgLy9SQyAzMzYwMDI5MSA6IE9iamVkbsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwX2RvayAhPSBJbnRlcmZhY2UuVHlwRG9rbGFkdS5uZ190eXBkb2tPYmopIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyOTJcIiwgLy9SQyAzMzYwMDI5MiA6IE9iamVkbsOhbm8gU01MXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISh0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva1NtbCB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0xpbSB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0luZCkpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTdcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyOTNcIiwgLy9SQyAzMzYwMDI5MyA6IE9iamVkbsOhbm8gQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMThcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI5NFwiLCAvL1JDIDMzNjAwMjk0IDogT8SNZWvDoXZhbsOpIMSNZXJww6Fuw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjXzBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI5NVwiLCAvL1JDIDMzNjAwMjk1IDogxIxlcnDDoW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vMzQ0LjEzIDI2LjA3LjAyXHJcbiAgICAgICAgICAgIGlmICh0eXBfZG9rICE9IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva09iaikge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI5NlwiLCAvL1JDIDMzNjAwMjk2IDogT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gT0JKXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2Zha19vYmpcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybUluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC01LTctMCwgTS01LTctMCwgUy0xMi0xMi0wLCBicmVha3MtNTAwLTEwMDBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDI5N1wiKSAvL1JDIDMzNjAwMjk3IDogUMWZw61wYWRcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFN0cmluZy5Gb3JtYXQoXCJqcmVzOjMzNjAwMjk4XCIsIHRoaXMuZ2ZfZ2V0S3RnU21sR3JvdXBOYW1lMnAodGhpcy5tb2RlbEluZm8ua3RnX3NtbCksIHRoaXMubW9kZWxJbmZvLm1lbmFfemtyISkpIC8vUkMgMzM2MDAyOTggOiBDZW5hIHswfSB7MX1cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19tZW5hX2RvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXBhZC5wX2NfbWVuYV9kb2NcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMjk5XCIgKyB0aGlzLm1vZGVsSW5mby5tZW5hX3prcikgLy9SQyAzMzYwMDI5OSA6IENlbGtvdsOhIMSNw6FzdGthIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicF9jX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwcmlwYWQucF9jX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDBcIiArIHRoaXMubW9kZWxJbmZvLm1lbmFfemtyLCAvL1JDIDMzNjAwMzAwIDogUm96cGlzIMSNw6FzdGt5IFxyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwianJlczozMzYwMDYxNFwiIC8vUkMgMzM2MDA2MTQgOiDEjMOhc3RrYSByb3pwaXN1IHDFmcOtcGFkdSBuYSByb2t5IHphIGNlbMOpIG9iZG9iw60gZmluYW5jb3bDoW7DrSB2IG3Em27Em1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19tZW5hX3JvelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXBhZC5wX2NfbWVuYV9yb3pcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDFcIiwgLy9SQyAzMzYwMDMwMSA6IFJvenBpcyDEjcOhc3RreSBDWktcclxuICAgICAgICAgICAgICAgICAgICBoaW50OiBcImpyZXM6MzM2MDA2MTVcIiAvL1JDIDMzNjAwNjE1IDogxIzDoXN0a2Egcm96cGlzdSBwxZnDrXBhZHUgbmEgcm9reSB6YSBjZWzDqSBvYmRvYsOtIGZpbmFuY292w6Fuw60gdiBDWktcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwX2Nfcm96cGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicHJpcGFkLnBfY19yb3pwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDJcIiwgLy9SQyAzMzYwMDMwMiA6IMSMw6FzdGthIHBvbG/FvmVrIEZQXHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjE2XCIgLy9SQyAzMzYwMDYxNiA6IMSMw6FzdGthIHBvbG/FvmVrIEZQIHDFmcOtcGFkdSBjZWzDqSBvYmRvYsOtIGZpbmFuY292w6Fuw60gdiBDWktcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwX2NfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicHJpcGFkLnBfY19wb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDNcIiwgLy9SQyAzMzYwMDMwMyA6IFbDvWRhamUgcG9sb8W+ZWsgRlAgQ1pLXHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjIxXCIgLy9SQyAzMzYwMDYyMSA6IMSMw6FzdGthIHbDvWRham92w71jaCBwb2xvxb5layBGUCBwxZnDrXBhZHUgY2Vsw6kgb2Jkb2LDrSBmaW5hbmNvdsOhbsOtIHYgQ1pLXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicF9jX3BvbF92eWRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwcmlwYWQucF9jX3BvbF92eWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDRcIiwgLy9SQyAzMzYwMDMwNCA6IFDFmcOtam15IHBvbG/FvmVrIEZQIENaS1xyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwianJlczozMzYwMDYyMlwiIC8vUkMgMzM2MDA2MjIgOiDEjMOhc3RrYSBwxZnDrWptb3bDvWNoIHBvbG/FvmVrIEZQIHDFmcOtcGFkdSBjZWzDqSBvYmRvYsOtIGZpbmFuY292w6Fuw60gdiBDWktcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwX2NfcG9sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXBhZC5wX2NfcG9sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDMwNVwiLCAvL1JDIDMzNjAwMzA1IDogxIzDoXN0a2Egc2xlZG92YW7DvWNoIMO6cHJhdlxyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwianJlczozMzYwMDYyM1wiIC8vUkMgMzM2MDA2MjMgOiDEjMOhc3RrYSBzbGVkb3ZhbsO9Y2ggw7pwcmF2IHDFmcOtcGFkdSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19kb2Rfb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicHJpcGFkLnBfY19kb2Rfb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwMzA2XCIpIC8vUkMgMzM2MDAzMDYgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBTdHJpbmcuRm9ybWF0KFwianJlczozMzYwMDI5OFwiLCB0aGlzLmdmX2dldEt0Z1NtbEdyb3VwTmFtZTJwKHRoaXMubW9kZWxJbmZvLmt0Z19zbWwpLCB0aGlzLm1vZGVsSW5mby5tZW5hX3prciEpLCAvL1JDIDMzNjAwMjk4IDogQ2VuYSB7MH0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjI1XCIgLy9SQyAzMzYwMDYyNSA6IENlbGtvdsOhIGNlbmEgYWt0dcOhbG7DrWhvIGRva2xhZHUgdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkX2NfbWVuYV9kb2NcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkb2tsYWQuZF9jX21lbmFfZG9jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMjk5XCIgKyB0aGlzLm1vZGVsSW5mby5tZW5hX3prciwgLy9SQyAzMzYwMDI5OSA6IENlbGtvdsOhIMSNw6FzdGthIFxyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwianJlczozMzYwMDYyNFwiIC8vUkMgMzM2MDA2MjQgOiBDZWxrb3bDoSDEjcOhc3RrYSBmaW5hbmNvdsOhbsOtIGFrdHXDoWxuw61obyBkb2tsYWR1IHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZF9jX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkb2tsYWQuZF9jX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDBcIiArIHRoaXMubW9kZWxJbmZvLm1lbmFfemtyLCAvL1JDIDMzNjAwMzAwIDogUm96cGlzIMSNw6FzdGt5IFxyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwianJlczozMzYwMDYyNlwiIC8vUkMgMzM2MDA2MjYgOiDEjMOhc3RrYSByb3pwaXN1IGRva2xhZHUgbmEgcm9reSB6YSBjZWzDqSBvYmRvYsOtIGZpbmFuY292w6Fuw60gdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkX2NfbWVuYV9yb3pcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkb2tsYWQuZF9jX21lbmFfcm96XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMzAxXCIsIC8vUkMgMzM2MDAzMDEgOiBSb3pwaXMgxI3DoXN0a3kgQ1pLXHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjI3XCIgLy9SQyAzMzYwMDYyNyA6IMSMw6FzdGthIHJvenBpc3UgZG9rbGFkdSBuYSByb2t5IHphIGNlbMOpIG9iZG9iw60gZmluYW5jb3bDoW7DrSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRfY19yb3pwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkb2tsYWQuZF9jX3JvenBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDMwMlwiLCAvL1JDIDMzNjAwMzAyIDogxIzDoXN0a2EgcG9sb8W+ZWsgRlBcclxuICAgICAgICAgICAgICAgICAgICBoaW50OiBcImpyZXM6MzM2MDA2MjhcIiAvL1JDIDMzNjAwNjI4IDogxIzDoXN0a2EgcG9sb8W+ZWsgRlAgZG9rbGFkdSB6YSBjZWzDqSBvYmRvYsOtIGZpbmFuY292w6Fuw60gdiBDWktcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkX2NfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZG9rbGFkLmRfY19wb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDNcIiwgLy9SQyAzMzYwMDMwMyA6IFbDvWRhamUgcG9sb8W+ZWsgRlAgQ1pLXHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjI5XCIgLy9SQyAzMzYwMDYyOSA6IMSMw6FzdGthIHbDvWRham92w71jaCBwb2xvxb5layBGUCBkb2tsYWR1IGNlbMOpIG9iZG9iw60gZmluYW5jb3bDoW7DrSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRfY19wb2xfdnlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZG9rbGFkLmRfY19wb2xfdnlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMzA0XCIsIC8vUkMgMzM2MDAzMDQgOiBQxZnDrWpteSBwb2xvxb5layBGUCBDWktcclxuICAgICAgICAgICAgICAgICAgICBoaW50OiBcImpyZXM6MzM2MDA2MzBcIiAvL1JDIDMzNjAwNjMwIDogxIzDoXN0a2EgcMWZw61qbW92w71jaCBwb2xvxb5layBGUCBkb2tsYWR1IGNlbMOpIG9iZG9iw60gZmluYW5jb3bDoW7DrSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRfY19wb2xfcHJpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZG9rbGFkLmRfY19wb2xfcHJpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMzA1XCIsIC8vUkMgMzM2MDAzMDUgOiDEjMOhc3RrYSBzbGVkb3ZhbsO9Y2ggw7pwcmF2XHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjMxXCIgLy9SQyAzMzYwMDYzMSA6IMSMw6FzdGthIHNsZWRvdmFuw71jaCDDunByYXYgZG9rbGFkdSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRfY19kb2Rfb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZG9rbGFkLmRfY19kb2Rfb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cEluc3QgPT0gSW50ZXJmYWNlLlR5cEluc3RhbGFjZS5uZ190eWlBY3IpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMzYwMDMwN1wiKSAvL1JDIDMzNjAwMzA3IDogTWFqZXRrb3bDqSBwbG7Em27DrSBjZWxrZW1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibV9jX3BvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkb2tsYWQubV9jX3BvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm0uYWRkU2VjdGlvbihcImpyZXM6MzM2MDAzMDhcIikgLy9SQyAzMzYwMDMwOCA6IFJlemVydmFjZSBjZWxrZW0gemEgcMWZw61wYWRcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMDlcIiwgLy9SQyAzMzYwMDMwOSA6IE/EjWVrw6F2YW7DrSDEjWVycMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjE3XCIgLy9SQyAzMzYwMDYxNyA6IMSMw6FzdGthIG/EjWVrw6F2YW7DqWhvIMSNZXJww6Fuw60gcMWZw61wYWR1IGNlbMOpIG9iZG9iw60gZmluYW5jb3bDoW7DrSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19mYWtcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwcmlwYWQucF9jX2Zha1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAzMTBcIikgLy9SQyAzMzYwMDMxMCA6IMSMZXJww6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY191aHJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMzExXCIpIC8vUkMgMzM2MDAzMTEgOiBEaXNwb25pYmlsbsOtIMSNw6FzdGthIGZpbmFuY292w6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19kaWZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicHJpcGFkLnBfY19kaWZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwMzEyXCIpIC8vUkMgMzM2MDAzMTIgOiBGaW5hbmNvdsOhbsOtIHDFmcOtcGFkdSB2IGFrdHXDoWxuw61tIG9iZG9iw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMTNcIiwgLy9SQyAzMzYwMDMxMyA6IE5hc21sb3V2w6Fubywgb2JqZWRuw6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwianJlczozMzYwMDYxOFwiIC8vUkMgMzM2MDA2MTggOiDEjMOhc3RrYSBwb2xvxb5layBGUCBwxZnDrXBhZHUgdiBha3R1w6FsbsOtbSBvYmRvYsOtIHYgQ1pLXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicF9jX3BvbF9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwcmlwYWQucF9jX3BvbF9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAzMTRcIiwgLy9SQyAzMzYwMDMxNCA6IE/EjWVrw6F2YW7DqSDEjWVycMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNjE5XCIgLy9SQyAzMzYwMDYxOSA6IMSMw6FzdGthIG/EjWVrw6F2YW7DqWhvIMSNZXJww6Fuw60gcMWZw61wYWR1IHYgYWt0dcOhbG7DrW0gb2Jkb2LDrSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19mYWtfYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicHJpcGFkLnBfY19mYWtfYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMzE1XCIsIC8vUkMgMzM2MDAzMTUgOiBLIHV2b2xuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBoaW50OiBcImpyZXM6MzM2MDA2MjBcIiAvL1JDIDMzNjAwNjIwIDogRGlzcG9uaWJpbG7DrSDEjcOhc3RrYSBmaW5hY292w6Fuw60gcMWZw61wYWR1IHYgYWt0dcOhbG7DrW0gb2Jkb2LDrSB2IENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBfY19kaWZmX2FrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXBhZC5wX2NfZGlmZl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVE9ETzogamUgaSB2IEMjIC4uLiBwxZllc3Vub3V0IGRvIHNwb2xlxI1uw71jaCBmdW5rY8OtIHBybyAudHNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAzNzguMTIgMzEuMDUuMTcgdnJhY8OtIGFncmVnb3ZhbsO9IG7DoXpldiBkbGUga2F0ZWdvcmllIHNtbCBkb2tsYWR1IHBybyBwb3BpcyBjZWxrb3bDqSDEjcOhc3RreSBkb2tsYWR1XHJcbiAgICAgICAgICogQHBhcmFtIGt0Z19zbWxfcFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZl9nZXRLdGdTbWxHcm91cE5hbWUycChrdGdfc21sX3A6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAoa3RnX3NtbF9wID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbERvZE9iaiB8fCBrdGdfc21sX3AgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiT2JqKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNjAwMzE2XCI7IC8vUkMgMzM2MDAzMTYgOiBvYmplZG7DoXZreVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vITM1My4xIDE2LjA2LjA1IHJvemxpxaFlbiBsaW1pdG92YW7DvSBwxZnDrXNsaWJcclxuICAgICAgICAgICAgZWxzZSBpZiAoa3RnX3NtbF9wID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbERvZCB8fCBrdGdfc21sX3AgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNjAwMzE3XCI7IC8vUkMgMzM2MDAzMTcgOiBzbWxvdXZ5XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa3RnX3NtbF9wID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbExpbVByaXNsaWIgfHwga3RnX3NtbF9wID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbEluZFByaXNsaWIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM2MDAzMThcIjsgLy9SQyAzMzYwMDMxOCA6IHDFmcOtc2xpYnVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrdGdfc21sX3AgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sSmlueVByaWplbUxpbSB8fCBrdGdfc21sX3AgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sSmlueVByaWplbUluZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDMxOVwiOyAvL1JDIDMzNjAwMzE5IDogcMWZw61qbXVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19