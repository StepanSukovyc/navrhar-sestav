"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GHistorieUzaverek.ts                   </Name>
//    <Description> Historie uzávěrek                                           </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var TypyPohledavek;
                (function (TypyPohledavek) {
                    let GHistorieUzaverek = class GHistorieUzaverek extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            this.view = new Gordic.Isl.View(that.isl.HistorieUzaverek.list(rq => {
                                return {
                                    filters: this.getFilters()
                                };
                            }));
                            this.createActions();
                            this.createForm();
                            this.createGrid();
                        }
                        createGrid() {
                            this.grid = $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.view,
                                columnMode: "fit",
                                navigationMode: "row",
                                columns: WebClient.Common.GridFormats.HistorieUzaverek(),
                                defaultProfile: {
                                    columnList: "typ_phl, dat_uz, zmenu_prov, dat_zmena, poznamka, cis_spr"
                                }
                            });
                        }
                        getFilters() {
                            let filter = {};
                            this.defaultForm.findFields("typ_phl", "datum_od", "datum_do").gfield("model", "collect", filter);
                            if (filter.datum_od != undefined) {
                                filter.datum_od = { o: ">=", v: filter.datum_od };
                            }
                            if (filter.datum_do != undefined) {
                                filter.datum_do = { o: "<=", v: filter.datum_do };
                            }
                            return filter;
                        }
                        createActions() {
                            this.actions.addRange([
                                {
                                    name: "actTypyPohledavekGHistorieUzaverekVyhledat",
                                    caption: "Vyhledat",
                                    run: () => {
                                        if (this.defaultForm.gform("isValid")) {
                                            this.view.requestData();
                                        }
                                    }
                                }
                            ]);
                        }
                        createForm() {
                            let validator = new Gordic.Validators.Base();
                            validator.getMessage = (value) => {
                                return "Zadejte typ pohledávky.";
                            };
                            validator.validate = (value, source) => {
                                let typ = this.defaultForm.findFields("typ_pohledu").gfield("getValue");
                                if (typ === "0") {
                                    return true;
                                }
                                else {
                                    let val = this.defaultForm.findFields("typ_phl").gfield("getValue");
                                    return val != null;
                                }
                            };
                            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" })
                                .addSection({ label: "Typ pohledu" })
                                .addRow()
                                .addField("gradio", {
                                initialValue: (this.vsechny ? "0" : "1"),
                                itemClass: "w-6",
                                name: "typ_pohledu",
                                change: (ev, obj) => {
                                    let field = this.defaultForm.findFields("typ_phl");
                                    if (obj.value === "0")
                                        field.gfield("clear");
                                    else if (obj.value === "1" && field.gfield("getValue") == null) {
                                        field.gfield("setValue", { typ_phl: this.typ_phl });
                                    }
                                    this.defaultForm.gform("isValid");
                                },
                                radios: [
                                    { value: "0", label: "Všechny" },
                                    { value: "1", label: "Za pohledávku" }
                                ]
                            })
                                .addRow("Typ pohledávky")
                                .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                                name: "typ_phl",
                                model: "model.typ_phl=value.typ_phl",
                                change: (ev, obj) => {
                                    if (obj.value != null)
                                        this.defaultForm.findFields("typ_pohledu").gfield("setValue", "1");
                                    else
                                        this.defaultForm.findFields("typ_pohledu").gfield("setValue", "0");
                                    this.defaultForm.gform("isValid");
                                },
                                validators: [validator]
                            })
                                .addSection({ label: "Datum provedení uzávěrky" })
                                .addRow("Od")
                                .addField("gdatebox", {
                                name: "datum_od",
                                validators: [new Gordic.Validators.Required()]
                            })
                                .addRow("Do")
                                .addField("gdatebox", {
                                name: "datum_do",
                                validators: [new Gordic.Validators.Required()]
                            })
                                .addRow({ customClass: "right" })
                                .addField("gbutton", {
                                params: {
                                    primary: true,
                                    customClass: "right",
                                    id: "actTypyPohledavekGHistorieUzaverekVyhledat_button",
                                    action: this.actions["actTypyPohledavekGHistorieUzaverekVyhledat"]
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "apply", { typ_phl: (this.vsechny ? null : this.typ_phl), datum_od: this.datum_od, datum_do: this.datum_do });
                        }
                    };
                    GHistorieUzaverek = __decorate([
                        Decorators.gcontent
                    ], GHistorieUzaverek);
                    TypyPohledavek.GHistorieUzaverek = GHistorieUzaverek;
                })(TypyPohledavek = Controls.TypyPohledavek || (Controls.TypyPohledavek = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0hpc3RvcmllVXphdmVyZWsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHSGlzdG9yaWVVemF2ZXJlay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTZKZjtBQTdKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2Sm5CO0lBN0pnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2SjdCO1FBN0pvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0E2SnRDO1lBN0o4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxjQUFjLENBNkpyRDtnQkE3SnVDLFdBQUEsY0FBYztvQkFFbEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7d0JBVy9DLGNBQWM7NEJBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQzFELEVBQUUsQ0FBQyxFQUFFO2dDQUNELE9BQU87b0NBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7aUNBQzdCLENBQUM7NEJBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFUixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBRXJCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDbEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixDQUFDO3dCQUVPLFVBQVU7NEJBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2lDQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQ0FDdEIsUUFBUSxFQUFFO2lDQUNWLEtBQUssQ0FBbUQ7Z0NBQ3JELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQ0FDZixVQUFVLEVBQUUsS0FBSztnQ0FDakIsY0FBYyxFQUFFLEtBQUs7Z0NBQ3JCLE9BQU8sRUFBRSxVQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7Z0NBQzlDLGNBQWMsRUFBRTtvQ0FDWixVQUFVLEVBQUUsMkRBQTJEO2lDQUMxRTs2QkFDSixDQUFDLENBQUM7d0JBQ1gsQ0FBQzt3QkFFTyxVQUFVOzRCQUNkLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQzs0QkFFckIsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFFbkcsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDO2dDQUMvQixNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUN0RCxDQUFDOzRCQUVELElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQ0FDL0IsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDdEQsQ0FBQzs0QkFFRCxPQUFPLE1BQU0sQ0FBQzt3QkFDbEIsQ0FBQzt3QkFFTyxhQUFhOzRCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQ0FDbEI7b0NBQ0ksSUFBSSxFQUFFLDRDQUE0QztvQ0FDbEQsT0FBTyxFQUFFLFVBQVU7b0NBQ25CLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0NBQ04sSUFBSSxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOzRDQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dDQUM1QixDQUFDO29DQUNMLENBQUM7aUNBQ0o7NkJBQ0osQ0FBQyxDQUFDO3dCQUNQLENBQUM7d0JBRU8sVUFBVTs0QkFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQzdDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQ0FDN0IsT0FBTyx5QkFBeUIsQ0FBQzs0QkFDckMsQ0FBQyxDQUFBOzRCQUNELFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0NBRW5DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDekUsSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7b0NBQ2QsT0FBTyxJQUFJLENBQUM7Z0NBQ2hCLENBQUM7cUNBQ0ksQ0FBQztvQ0FFRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ3JFLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQztnQ0FDdkIsQ0FBQzs0QkFDTCxDQUFDLENBQUE7NEJBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO2lDQUMzRCxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUM7aUNBQ3BDLE1BQU0sRUFBRTtpQ0FDUixRQUFRLENBQUMsUUFBUSxFQUFFO2dDQUNoQixZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDeEMsU0FBUyxFQUFFLEtBQUs7Z0NBQ2hCLElBQUksRUFBRSxhQUFhO2dDQUNuQixNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0NBRWhCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUVwRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssR0FBRzt3Q0FDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzt5Q0FDckIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO3dDQUM3RCxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQ0FDeEQsQ0FBQztvQ0FFRCxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDdkMsQ0FBQztnQ0FDRCxNQUFNLEVBQUU7b0NBQ0osRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7b0NBQ2hDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO2lDQUN6Qzs2QkFDSixDQUFDO2lDQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztpQ0FDeEIsUUFBUSxDQUFDLFlBQVksRUFBQyxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0NBQ25ELElBQUksRUFBRSxTQUFTO2dDQUNmLEtBQUssRUFBRSw2QkFBNkI7Z0NBQ3BDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQ0FDaEIsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUk7d0NBQ2pCLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7O3dDQUVwRSxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29DQUV4RSxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDdkMsQ0FBQztnQ0FDRCxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7NkJBQzFCLENBQUM7aUNBQ0QsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFLENBQUM7aUNBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7aUNBQ1osUUFBUSxDQUFDLFVBQVUsRUFBRTtnQ0FDbEIsSUFBSSxFQUFFLFVBQVU7Z0NBQ2hCLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs2QkFDakQsQ0FBQztpQ0FDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2lDQUNaLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0NBQ2xCLElBQUksRUFBRSxVQUFVO2dDQUNoQixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQ2pELENBQUM7aUNBQ0QsTUFBTSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO2lDQUNoQyxRQUFRLENBQUMsU0FBUyxFQUFFO2dDQUNqQixNQUFNLEVBQUU7b0NBQ0osT0FBTyxFQUFFLElBQUk7b0NBQ2IsV0FBVyxFQUFFLE9BQU87b0NBQ3BCLEVBQUUsRUFBRSxtREFBbUQ7b0NBQ3ZELE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO2lDQUNyRTs2QkFDSixDQUFDLENBQUM7NEJBRVAsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2lDQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQ0FDdEIsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFFL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDaEssQ0FBQztxQkFDSixDQUFBO29CQTFKWSxpQkFBaUI7d0JBRDdCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLGlCQUFpQixDQTBKN0I7b0JBMUpZLGdDQUFpQixvQkEwSjdCLENBQUE7Z0JBQ0wsQ0FBQyxFQTdKdUMsY0FBYyxHQUFkLHVCQUFjLEtBQWQsdUJBQWMsUUE2SnJEO1lBQUQsQ0FBQyxFQTdKOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUE2SnRDO1FBQUQsQ0FBQyxFQTdKb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNko3QjtJQUFELENBQUMsRUE3SmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZKbkI7QUFBRCxDQUFDLEVBN0pTLE1BQU0sS0FBTixNQUFNLFFBNkpmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdIaXN0b3JpZVV6YXZlcmVrLnRzICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBIaXN0b3JpZSB1esOhdsSbcmVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDEtMDggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0hpc3RvcmllVXphdmVyZWsgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0hpc3RvcmllVXphdmVyZWtEdG8+O1xyXG5cclxuICAgICAgICBwdWJsaWMgdHlwX3BobDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyB2c2VjaG55OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZGF0dW1fb2Q6IERhdGU7XHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdHVtX2RvOiBEYXRlO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuSGlzdG9yaWVVemF2ZXJlay5saXN0KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZ2V0RmlsdGVycygpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HSGlzdG9yaWVVemF2ZXJla0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5IaXN0b3JpZVV6YXZlcmVrKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJ0eXBfcGhsLCBkYXRfdXosIHptZW51X3Byb3YsIGRhdF96bWVuYSwgcG96bmFta2EsIGNpc19zcHJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXJzKCkge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIsIFwiZGF0dW1fb2RcIiwgXCJkYXR1bV9kb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuZGF0dW1fb2QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZGF0dW1fb2QgPSB7IG86IFwiPj1cIiwgdjogZmlsdGVyLmRhdHVtX29kIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuZGF0dW1fZG8gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZGF0dW1fZG8gPSB7IG86IFwiPD1cIiwgdjogZmlsdGVyLmRhdHVtX2RvIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUeXB5UG9obGVkYXZla0dIaXN0b3JpZVV6YXZlcmVrVnlobGVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5aGxlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRvciA9IG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKCk7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJaYWRlanRlIHR5cCBwb2hsZWTDoXZreS5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAodmFsdWUsIHNvdXJjZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0eXAgPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwidHlwX3BvaGxlZHVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJUeXAgcG9obGVkdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAodGhpcy52c2VjaG55ID8gXCIwXCIgOiBcIjFcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BvaGxlZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGQgPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwidHlwX3BobFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgPT09IFwiMFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iai52YWx1ZSA9PT0gXCIxXCIgJiYgZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjBcIiwgbGFiZWw6IFwiVsWhZWNobnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjFcIiwgbGFiZWw6IFwiWmEgcG9obGVkw6F2a3VcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixQcmVmYWJzLlNlbGVjdC50eXBQb2hsZWRhdmt5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJ0eXBfcG9obGVkdVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJ0eXBfcG9obGVkdVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBcIjBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbdmFsaWRhdG9yXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiRGF0dW0gcHJvdmVkZW7DrSB1esOhdsSbcmt5XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1fb2RcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bV9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFjdFR5cHlQb2hsZWRhdmVrR0hpc3RvcmllVXphdmVyZWtWeWhsZWRhdF9idXR0b25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RUeXB5UG9obGVkYXZla0dIaXN0b3JpZVV6YXZlcmVrVnlobGVkYXRcIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHR5cF9waGw6ICh0aGlzLnZzZWNobnkgPyBudWxsIDogdGhpcy50eXBfcGhsKSwgZGF0dW1fb2Q6IHRoaXMuZGF0dW1fb2QsIGRhdHVtX2RvOiB0aGlzLmRhdHVtX2RvIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==