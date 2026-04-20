"use strict";
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
            let GSMLPartnerNew = class GSMLPartnerNew extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.SavedChanges = { ulozeno: false };
                    this.uid = "PartnerNew#";
                }
                //Zavírání okna, deferred, promise
                closing() {
                    const that = this;
                    const savingDef = $.Deferred();
                    function callEnd() {
                        const result = {
                            ulozeno: that.SavedChanges.ulozeno,
                        };
                        savingDef.resolve(result);
                    }
                    callEnd();
                    return savingDef.promise();
                }
                // Zavolá funkci menu, vytvořneí formu, vyplnění formu a vytvoření a vyplnění garticlu
                onContentReady() {
                    this._vytvoreniFormu();
                    if (this.GSmlsesuDto != null) {
                        this._naplneniFormu();
                    }
                    this._vytvoreniMenu();
                }
                //Vytvoření menu
                _vytvoreniMenu() {
                    const menuBarPoleDolni = [];
                    menuBarPoleDolni.push({
                        action: this.actions.add(new GAction($.extend(Gordic.Prefabs.Icons.IconToActionParams(Gordic.Gin.Globals.Icons.UlozitAZavrit()), {
                            name: "UlozitZavrit",
                            run: () => {
                                this._saveEsu();
                            },
                        }))),
                        favorite: true
                    });
                    menuBarPoleDolni.push({
                        action: this.actions.add(new GAction($.extend(Gordic.Prefabs.Icons.IconToActionParams(Gordic.Gin.Globals.Icons.ZrusitZmeny()), {
                            name: "Zavrit",
                            run: () => {
                                this.tryClose();
                            },
                        }))),
                        favorite: true
                    });
                    this.commandBar(menuBarPoleDolni);
                }
                //Naplnění formu přes apply a gsmlsesu a initial hodnoty
                _naplneniFormu() {
                    let $form = this.findForms("FormPartneriNew");
                    $form.findFields().gfield("model", "apply", this.GSmlsesuDto, { initialValues: true });
                }
                //Vytvoření formu
                _vytvoreniFormu() {
                    const formBuilder = new Gordic.Forms.Form({
                        name: "FormPartneriNew",
                        layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, S-4-8-0",
                    })
                        .addRow("jres:33500456") //RC 33500456 : Typ subjektu
                        .addField("gselectbox", Gordic.Prefabs.Select.SmlWflctyv(), {
                        name: "typ_vazby" /* Interface.GSmlsesuDtoNames.typ_vazby */,
                        model: "model.typ_vazby=value.typ_vazby",
                        flag: "required",
                        validators: [
                            new Gordic.Validators.Required() // je to povinné pole
                        ],
                    })
                        .addRow("jres:33500457") //RC 33500457 : Externí subjekt
                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                        Logovani: {
                            Ixp: this.Ixp,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu, // vybrat z enumu// důvod hledání ESU subjektu
                            AktZnacka: "",
                            DuvodHledaniTxt: ""
                        },
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu   
                    }), {
                        name: "ixs_esu" /* Interface.GSmlsesuDtoNames.ixs_esu */,
                        //model: "model.ixs_esu=value.ixs_esu,model.ico_esu<=value.ico",
                        model: "model.ixs_esu=value.ixs_esu",
                        flag: "required",
                        validators: [
                            new Gordic.Validators.Required() // je to povinné pole
                        ],
                        change: (ev, ctx) => {
                            this.poZmeneSubjektu(); // akce po změně subjektu    
                            if (ctx.value == null) {
                                const buciField = this.findFields("bu_ci");
                                buciField.gfield("setValue", {}); // doplním jí do políčka
                            }
                        }
                    })
                        .addRow("jres:33500458") //RC 33500458 : Bankovní účet subjektu
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuci(), {
                        name: "bu_ci" /* Interface.GSmlsesuDtoNames.bu_ci */,
                        //disabled: !that.jeEditovatelne,
                        dropdown: false, // výběr přes 3 tečky
                        model: "ixs_esu=>ixs_esu;bu_ci=bu_ci;sk_ci=sk_ci",
                        serverFilters: {
                            ixs_esu: new Gordic.Forms.Dependency("ixs_esu", "ixs_esu", false, true),
                            aktivita: 100,
                        },
                    })
                        .addRow("jres:33500459") //RC 33500459 : Zastoupený
                        .addField("gselectbox", Gordic.Prefabs.Select.SmlZastoupenaOsoba(), {
                        name: "ixs_esu_zast_txt" /* Interface.GSmlsesuDtoNames.ixs_esu_zast_txt */,
                        model: "model.ixs_esu=value.ixs_esu",
                        dropdown: false,
                        serverFilters: {
                            ixs_esu: new Gordic.Forms.Dependency("ixs_esu", "ixs_esu", false, true),
                        }
                    });
                    // Přidání formuláře do DOMu.
                    this.$Form = $("<div>").appendTo(this.element).gform("createFrom", formBuilder);
                }
                ;
                //---------------------------
                // Změna externího subjektu
                //---------------------------
                poZmeneSubjektu() {
                    var that = this;
                    // Ošetření cizího bankovní účtu
                    const buciField = that.findFields("bu_ci"); // políčko cizého bankovního účtu
                    buciField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.Ekosuci().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                    }).then((buci) => {
                        if (buci.length === 1) { // pokud existuje jedna vrácená hodnota
                            buciField.gfield("setValue", buci[0]); // doplním jí do políčka
                        }
                    });
                    // Ošetření .....
                }
                //Validování a uložení formu
                _saveEsu() {
                    if (!this.$Form?.gform("isValid"))
                        return;
                    let dtoEsu = this.$Form?.findForms("FormPartneriNew").findFields("ixs_esu" /* Interface.GSmlsesuDtoNames.ixs_esu */).gfield("getValue");
                    let ZaznamSmlEsu = {};
                    let fields = this.$Form?.findForms("FormPartneriNew").findFields();
                    //naplní dtočko formDataClanek
                    fields?.gfield("model", "collect", ZaznamSmlEsu);
                    ZaznamSmlEsu.ixs_esu = dtoEsu.ixs_esu;
                    Gordic.Isl.Smlsesu.setSaveEsu({ ixp: this.Ixp, ixp_sml_pri: this.Ixp_Sml_Pri, ktg_sml: this.Ktg_Sml, ZaznamSmlEsu: ZaznamSmlEsu })
                        .getData().done(() => { this.SavedChanges.ulozeno = true; this.tryClose(); });
                }
            };
            GSMLPartnerNew = __decorate([
                Decorators.gcontent
            ], GSMLPartnerNew);
            WebClient.GSMLPartnerNew = GSMLPartnerNew;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NNTFBhcnRuZXJOZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU01MUGFydG5lck5ldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBOE5mO0FBOU5ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThObkI7SUE5TmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThON0I7UUE5Tm9CLFdBQUEsU0FBUztZQWMxQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQUFoRDs7b0JBT1ksaUJBQVksR0FBOEIsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3JFLFFBQUcsR0FBRyxhQUFhLENBQUM7Z0JBdU14QixDQUFDO2dCQW5NRyxrQ0FBa0M7Z0JBQ2xDLE9BQU87b0JBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRS9CLFNBQVMsT0FBTzt3QkFFWixNQUFNLE1BQU0sR0FBOEI7NEJBQ3RDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU87eUJBQ3JDLENBQUM7d0JBQ0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztvQkFFRCxPQUFPLEVBQUUsQ0FBQztvQkFDVixPQUFPLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFJRCxzRkFBc0Y7Z0JBQ3RGLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDMUIsQ0FBQztvQkFFRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRTFCLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNSLGNBQWM7b0JBQ2xCLE1BQU0sZ0JBQWdCLEdBQWlCLEVBQUUsQ0FBQztvQkFDMUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO3dCQUNsQixNQUFNLEVBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUMxRTs0QkFDSSxJQUFJLEVBQUUsY0FBYzs0QkFDcEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FDSixDQUFDLENBQUM7d0JBQ1AsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUMsQ0FBQztvQkFFSCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7d0JBQ2xCLE1BQU0sRUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQ3hFOzRCQUNJLElBQUksRUFBRSxRQUFROzRCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQ0osQ0FBQyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDLENBQUM7b0JBR0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELHdEQUF3RDtnQkFDaEQsY0FBYztvQkFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM5QyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUMxRixDQUFDO2dCQUVELGlCQUFpQjtnQkFDVCxlQUFlO29CQUVuQixNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNyQzt3QkFDSSxJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixnQkFBZ0IsRUFBRSxtQ0FBbUM7cUJBRXhELENBQ0o7eUJBRUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDRCQUE0Qjt5QkFDcEQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFDdEQ7d0JBQ0ksSUFBSSx3REFBc0M7d0JBQzFDLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLElBQUksRUFBRSxVQUFVO3dCQUNoQixVQUFVLEVBQUU7NEJBQ1IsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFRLHFCQUFxQjt5QkFDaEU7cUJBQ0osQ0FBQzt5QkFHTCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUUsK0JBQStCO3lCQUN4RCxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDL0M7d0JBQ0ksUUFBUSxFQUFFOzRCQUNOLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBYSw4Q0FBOEM7NEJBQ3pJLFNBQVMsRUFBRSxFQUFFOzRCQUNiLGVBQWUsRUFBRSxFQUFFO3lCQUN0Qjt3QkFDRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBb0MscUJBQXFCO3FCQUV4SCxDQUVKLEVBQ0c7d0JBQ0ksSUFBSSxvREFBb0M7d0JBQ3hDLGdFQUFnRTt3QkFDaEUsS0FBSyxFQUFFLDZCQUE2Qjt3QkFDcEMsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFVBQVUsRUFBRTs0QkFDUixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQVEscUJBQXFCO3lCQUNoRTt3QkFFRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFtRSw2QkFBNkI7NEJBQ3ZILElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDM0MsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBMEUsd0JBQXdCOzRCQUV2SSxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQzt5QkFFTCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsc0NBQXNDO3lCQUM5RCxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNyRCxJQUFJLGdEQUFrQzt3QkFDdEMsaUNBQWlDO3dCQUNqQyxRQUFRLEVBQUUsS0FBSyxFQUFxRixxQkFBcUI7d0JBQ3pILEtBQUssRUFBRSwwQ0FBMEM7d0JBQ2pELGFBQWEsRUFBRTs0QkFDWCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7NEJBQ3ZFLFFBQVEsRUFBRSxHQUFHO3lCQUNoQjtxQkFDSixDQUFDO3lCQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywwQkFBMEI7eUJBQ2xELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsRUFBRTt3QkFDaEUsSUFBSSxzRUFBNkM7d0JBQ2pELEtBQUssRUFBRSw2QkFBNkI7d0JBQ3BDLFFBQVEsRUFBRSxLQUFLO3dCQUNmLGFBQWEsRUFBRTs0QkFDWCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7eUJBQzFFO3FCQUNKLENBQUMsQ0FBQTtvQkFFTiw2QkFBNkI7b0JBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFbkYsQ0FBQztnQkFBQSxDQUFDO2dCQUVGLDZCQUE2QjtnQkFDN0IsMkJBQTJCO2dCQUMzQiw2QkFBNkI7Z0JBQ3JCLGVBQWU7b0JBQ25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsZ0NBQWdDO29CQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQTZFLGlDQUFpQztvQkFDekosU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO3dCQUM3QyxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQWdFLHlEQUF5RDtvQkFDakwsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQTRGLHVDQUF1Qzs0QkFDdkosU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBMEUsd0JBQXdCO3dCQUM1SSxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILGlCQUFpQjtnQkFHckIsQ0FBQztnQkFHRCw0QkFBNEI7Z0JBQ3BCLFFBQVE7b0JBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0IsT0FBTztvQkFFWCxJQUFJLE1BQU0sR0FBMEIsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLG9EQUFvQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFL0ksSUFBSSxZQUFZLEdBQTBCLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbkUsOEJBQThCO29CQUM5QixNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDO3lCQUM3SCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRGLENBQUM7YUFHSixDQUFBO1lBL01ZLGNBQWM7Z0JBRDFCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsY0FBYyxDQStNMUI7WUEvTVksd0JBQWMsaUJBK00xQixDQUFBO1FBQ0wsQ0FBQyxFQTlOb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOE43QjtJQUFELENBQUMsRUE5TmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThObkI7QUFBRCxDQUFDLEVBOU5TLE1BQU0sS0FBTixNQUFNLFFBOE5mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTTUxQYXJ0bmVyTmV3SW5wdXRQYXJhbXMge1xyXG4gICAgICAgIEl4cDogc3RyaW5nLFxyXG4gICAgICAgIEl4cF9TbWxfUHJpOiBzdHJpbmcsXHJcbiAgICAgICAgS3RnX1NtbDogbnVtYmVyO1xyXG4gICAgICAgIEdTbWxzZXN1RHRvOiBJbnRlcmZhY2UuR1NtbHNlc3VEdG8gfCBudWxsLFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NNTFBhcnRuZXJOZXdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgdWxvemVubzogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTTUxQYXJ0bmVyTmV3IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwcml2YXRlIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgSXhwX1NtbF9Qcmk6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIEt0Z19TbWw6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBHU21sc2VzdUR0bzogSW50ZXJmYWNlLkdTbWxzZXN1RHRvIHwgbnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTYXZlZENoYW5nZXM6IEdTTUxQYXJ0bmVyTmV3UmV0dXJuVmFsdWUgPSB7IHVsb3plbm86IGZhbHNlIH07XHJcbiAgICAgICAgdWlkID0gXCJQYXJ0bmVyTmV3I1wiO1xyXG4gICAgICAgICRGb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuXHJcbiAgICAgICAgLy9aYXbDrXLDoW7DrSBva25hLCBkZWZlcnJlZCwgcHJvbWlzZVxyXG4gICAgICAgIGNsb3NpbmcoKTogSlF1ZXJ5LlByb21pc2U8R1NNTFBhcnRuZXJOZXdSZXR1cm5WYWx1ZT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qgc2F2aW5nRGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FsbEVuZCgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IEdTTUxQYXJ0bmVyTmV3UmV0dXJuVmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWxvemVubzogdGhhdC5TYXZlZENoYW5nZXMudWxvemVubyxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzYXZpbmdEZWYucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWxsRW5kKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzYXZpbmdEZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLyBaYXZvbMOhIGZ1bmtjaSBtZW51LCB2eXR2b8WZbmXDrSBmb3JtdSwgdnlwbG7Em27DrSBmb3JtdSBhIHZ5dHZvxZllbsOtIGEgdnlwbG7Em27DrSBnYXJ0aWNsdVxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLl92eXR2b3JlbmlGb3JtdSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HU21sc2VzdUR0byAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXBsbmVuaUZvcm11KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Z5dHZvcmVuaU1lbnUoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1Z5dHZvxZllbsOtIG1lbnVcclxuICAgICAgICBwcml2YXRlIF92eXR2b3JlbmlNZW51KCkge1xyXG4gICAgICAgICAgICBjb25zdCBtZW51QmFyUG9sZURvbG5pOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgbWVudUJhclBvbGVEb2xuaS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKCQuZXh0ZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5JY29ucy5JY29uVG9BY3Rpb25QYXJhbXMoR2luLkdsb2JhbHMuSWNvbnMuVWxveml0QVphdnJpdCgpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJVbG96aXRaYXZyaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVFc3UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApKSksXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVCYXJQb2xlRG9sbmkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbigkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuSWNvbnMuSWNvblRvQWN0aW9uUGFyYW1zKEdpbi5HbG9iYWxzLkljb25zLlpydXNpdFptZW55KCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlphdnJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkpKSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihtZW51QmFyUG9sZURvbG5pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vTmFwbG7Em27DrSBmb3JtdSBwxZllcyBhcHBseSBhIGdzbWxzZXN1IGEgaW5pdGlhbCBob2Rub3R5XHJcbiAgICAgICAgcHJpdmF0ZSBfbmFwbG5lbmlGb3JtdSgpIHtcclxuICAgICAgICAgICAgbGV0ICRmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJGb3JtUGFydG5lcmlOZXdcIik7XHJcbiAgICAgICAgICAgICRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuR1NtbHNlc3VEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9WeXR2b8WZZW7DrSBmb3JtdVxyXG4gICAgICAgIHByaXZhdGUgX3Z5dHZvcmVuaUZvcm11KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybUJ1aWxkZXIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGb3JtUGFydG5lcmlOZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC00LTgtMCwgTS00LTgtMCwgUy00LTgtMFwiLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDU2XCIpIC8vUkMgMzM1MDA0NTYgOiBUeXAgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LlNtbFdmbGN0eXYoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2VzdUR0b05hbWVzLnR5cF92YXpieSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3ZhemJ5PXZhbHVlLnR5cF92YXpieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpICAgICAgICAvLyBqZSB0byBwb3Zpbm7DqSBwb2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NTdcIikgIC8vUkMgMzM1MDA0NTcgOiBFeHRlcm7DrSBzdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdShcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoaXMuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaURvdGNlbmVob1N1Ympla3R1LCAgICAgICAgICAgIC8vIHZ5YnJhdCB6IGVudW11Ly8gZMWvdm9kIGhsZWTDoW7DrSBFU1Ugc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNlc3VEdG9OYW1lcy5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIm1vZGVsLml4c19lc3U9dmFsdWUuaXhzX2VzdSxtb2RlbC5pY29fZXN1PD12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCkgICAgICAgIC8vIGplIHRvIHBvdmlubsOpIHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHptxJtuxJsgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9abWVuZVN1Ympla3R1KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgcG8gem3Em27EmyBzdWJqZWt0dSAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHgudmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1Y2lGaWVsZCA9IHRoaXMuZmluZEZpZWxkcyhcImJ1X2NpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7fSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsOtbSBqw60gZG8gcG9sw63EjWthXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ1OFwiKSAvL1JDIDMzNTAwNDU4IDogQmFua292bsOtIMO6xI1ldCBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3VjaSgpLCB7ICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDI5NzUwMDY2IDogQmFua292bsOtIMO6xI1ldCBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2VzdUR0b05hbWVzLmJ1X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6ICF0aGF0LmplRWRpdG92YXRlbG5lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2w71ixJtyIHDFmWVzIDMgdGXEjWt5XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT0+aXhzX2VzdTtidV9jaT1idV9jaTtza19jaT1za19jaVwiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfZXN1XCIsIFwiaXhzX2VzdVwiLCBmYWxzZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ1OVwiKSAvL1JDIDMzNTAwNDU5IDogWmFzdG91cGVuw71cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LlNtbFphc3RvdXBlbmFPc29iYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMuaXhzX2VzdV96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZXN1PXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfZXN1XCIsIFwiaXhzX2VzdVwiLCBmYWxzZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIFDFmWlkw6Fuw60gZm9ybXVsw6HFmWUgZG8gRE9NdS5cclxuICAgICAgICAgICB0aGlzLiRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBabcSbbmEgZXh0ZXJuw61obyBzdWJqZWt0dVxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcHJpdmF0ZSBwb1ptZW5lU3ViamVrdHUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIE/FoWV0xZllbsOtIGNpesOtaG8gYmFua292bsOtIMO6xI10dVxyXG4gICAgICAgICAgICBjb25zdCBidWNpRmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJidV9jaVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBjaXrDqWhvIGJhbmtvdm7DrWhvIMO6xI10dVxyXG4gICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpqacWhdMSbbsOtIGFrdHXDoWxuw61jaCBzZXJ2ZXJvdsO9Y2ggZmlsdHLFryAocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuUmVhZGVycy5Fa29zdWNpKCkuZ2V0RGF0YShzZikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnLDoWNlbsOtIGhvZG5vdCBwb2zDrcSNa2EgcyBha3R1w6FsbsOtbWkgc2VydmVyb3bDvW1pIGZpbHRyeVxyXG4gICAgICAgICAgICB9KS50aGVuKChidWNpKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbyB2csOhY2Vuw61cclxuICAgICAgICAgICAgICAgIGlmIChidWNpLmxlbmd0aCA9PT0gMSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgamVkbmEgdnLDoWNlbsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgYnVjaVswXSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsOtbSBqw60gZG8gcG9sw63EjWthXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gT8WhZXTFmWVuw60gLi4uLi5cclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9WYWxpZG92w6Fuw60gYSB1bG/FvmVuw60gZm9ybXVcclxuICAgICAgICBwcml2YXRlIF9zYXZlRXN1KCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRGb3JtPy5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgZHRvRXN1OiBJbnRlcmZhY2UuR1NtbHNlc3VEdG8gPSB0aGlzLiRGb3JtPy5maW5kRm9ybXMoXCJGb3JtUGFydG5lcmlOZXdcIikuZmluZEZpZWxkcyhJbnRlcmZhY2UuR1NtbHNlc3VEdG9OYW1lcy5peHNfZXN1KS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBaYXpuYW1TbWxFc3U6IEludGVyZmFjZS5HU21sc2VzdUR0byA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgZmllbGRzID0gdGhpcy4kRm9ybT8uZmluZEZvcm1zKFwiRm9ybVBhcnRuZXJpTmV3XCIpLmZpbmRGaWVsZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vbmFwbG7DrSBkdG/EjWtvIGZvcm1EYXRhQ2xhbmVrXHJcbiAgICAgICAgICAgIGZpZWxkcz8uZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIFphem5hbVNtbEVzdSk7XHJcbiAgICAgICAgICAgIFphem5hbVNtbEVzdS5peHNfZXN1ID0gZHRvRXN1Lml4c19lc3U7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuU21sc2VzdS5zZXRTYXZlRXN1KHsgaXhwOiB0aGlzLkl4cCwgaXhwX3NtbF9wcmk6IHRoaXMuSXhwX1NtbF9QcmksIGt0Z19zbWw6IHRoaXMuS3RnX1NtbCwgWmF6bmFtU21sRXN1OiBaYXpuYW1TbWxFc3UgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKCkuZG9uZSgoKSA9PiB7IHRoaXMuU2F2ZWRDaGFuZ2VzLnVsb3plbm8gPSB0cnVlOyB0aGlzLnRyeUNsb3NlKCk7IH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufSAgIl19