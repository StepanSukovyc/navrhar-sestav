"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GStavVymahani.ts                       </Name>
//    <Description> Stav vymáhání                                               </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Vymahani;
                (function (Vymahani) {
                    let GStavVymahani = class GStavVymahani extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Krok vymáhání`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGStavVymahaniZavritPotomky"]
                                }]);
                            this.createForm();
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow("Identifikátor")
                                .addField("gstringbox", {
                                name: "ixs_skv",
                                disabled: true
                            })
                                .addRow("Krok vymáhání", true)
                                .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), {
                                data: new Gordic.Data.Readers.StavVymahani().getView(),
                                name: "stav_vym",
                                model: "model.stav_vym=value.stav_vym",
                                disabled: this.readOnly || this.editMode,
                                strict: true
                            })
                                .addRow("Předchozí krok vymáhání", true)
                                .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), {
                                data: new Gordic.Data.Readers.StavVymahani().getView(),
                                name: "stav_vym_prev",
                                model: "model.stav_vym_prev=value.stav_vym",
                                strict: true,
                                disabled: this.readOnly || this.editMode
                            });
                            if (!this.readOnly && !this.editMode) {
                                form.addRow()
                                    .addField("gcheck", {
                                    name: "pouze_nepouzite",
                                    label: "Zobrazit pouze nepoužité kroky vymáhání",
                                    initialValue: false,
                                    change: (ev, val) => {
                                        this.refreshKroky();
                                        if (this.userSettings != null) {
                                            this.userSettings.set("pouze_nepouzite", this.defaultForm.findFields("pouze_nepouzite").gfield("getValue"));
                                        }
                                    }
                                });
                            }
                            form.addRow("Formát čísla jednacího")
                                .addField("gstringbox", {
                                name: "format_cj",
                                disabled: this.readOnly
                            })
                                .addRow("Výchozí lokalizace vymáhání", true)
                                .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                serverFilters: {
                                    aktivita: 100,
                                    VrfuIxpDen: this.ixp_den,
                                    VcetneNullFunkce: true,
                                    VcetneServisnichFunkci: true,
                                    PovoleneProTypyPhl: true
                                },
                                name: "ixs_fun_pod",
                                model: "model.ixs_fun_pod=value.ixs_fun",
                                disabled: this.readOnly,
                                change: (ev, obj) => {
                                    if (obj == null || obj.value == null) {
                                        this.defaultForm.findFields("ixs_fun_pod").gfield("model", "apply", { ixs_fun_pod: "0000SF00000Z" });
                                    }
                                }
                            })
                                .addRow("Dnů pro zaplacení", true)
                                .addField("gnumberbox", {
                                name: "pocpnb",
                                emptyValue: null,
                                disabled: this.readOnly
                            })
                                .addRow("Lhůta pro odvolání", true)
                                .addField("gnumberbox", {
                                name: "pocdvy",
                                emptyValue: null,
                                disabled: this.readOnly
                            })
                                .addRow("Typ kroku", true)
                                .addField("gselectbox", WebClient.Common.Prefabs.prizPocatek(), {
                                disabled: this.readOnly
                            })
                                .addRow({ required: true })
                                .addField("gcheck", {
                                name: "priz_skup",
                                label: "Vymáhat další případy poplatníka (slouč. vymáhání)",
                                disabled: this.readOnly,
                                emptyValue: null,
                                modelValueTransform: {
                                    apply: function (modelValue) { return modelValue === 1; },
                                    collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.refreshKroky();
                            this.defaultForm.gform("waitForValues")
                                .always(() => {
                                if (!this.readOnly && !this.editMode) {
                                    this.data.ixs_fun_pod = "0000SF00000Z";
                                }
                                this.defaultForm.findFields().gfield("model", "apply", this.data, { initialValues: true });
                                if (!this.readOnly && !this.editMode && this.pouziteKroky.length === 0) {
                                    this.defaultForm.findFields("stav_vym_prev").gfield("model", "apply", { stav_vym_prev: 0 });
                                }
                                this.defaultForm.findFields().gfield("model", "validators", this.validators);
                                this.defaultForm.gform("waitForValues")
                                    .always(() => {
                                    if (!this.readOnly && !this.editMode && this.userSettings != null) {
                                        let nepouzite = this.userSettings.get("pouze_nepouzite");
                                        if (nepouzite != null) {
                                            this.defaultForm.findFields("pouze_nepouzite").gfield("setValue", nepouzite);
                                        }
                                    }
                                });
                            });
                        }
                        pouzeNepouzite() {
                            return !this.readOnly && !this.editMode && this.defaultForm.findFields("pouze_nepouzite").gfield("getValue");
                        }
                        refreshKroky() {
                            let data = this.defaultForm.findFields("stav_vym").gfield("option", "data");
                            data.done((view) => {
                                view.process({
                                    pouzeNepouzite: new Gordic.Data.FilterProcessor((meta) => {
                                        if (this.pouzeNepouzite()) {
                                            return meta.data.stav_vym !== 0 && (this.pouziteKroky.length === 0 || this.pouziteKroky.indexOf(meta.data.stav_vym) < 0);
                                        }
                                        else {
                                            return meta.data.stav_vym !== 0;
                                        }
                                    })
                                });
                                if (!this.readOnly && !this.editMode) {
                                    this.defaultForm.gform("waitForValues").always(() => {
                                        let stav_vym_val = this.defaultForm.findFields("stav_vym").gfield("getValue");
                                        if (stav_vym_val != null)
                                            if (!view.getDataRows(true).some((value, index, array) => { return value.data.stav_vym === stav_vym_val.stav_vym; }))
                                                this.defaultForm.findFields("stav_vym").gfield("clear");
                                    });
                                }
                            });
                            let data_prev = this.defaultForm.findFields("stav_vym_prev").gfield("option", "data");
                            data_prev.done((view) => {
                                view.process({
                                    pouzeNepouzite: new Gordic.Data.FilterProcessor((meta) => {
                                        if (this.pouzeNepouzite()) {
                                            return meta.data.stav_vym === 0 || (this.pouziteKroky.length > 0 && this.pouziteKroky.indexOf(meta.data.stav_vym) >= 0);
                                        }
                                        else {
                                            return true;
                                        }
                                    })
                                });
                                if (!this.readOnly && !this.editMode) {
                                    this.defaultForm.gform("waitForValues").always(() => {
                                        let stav_vym_prev_val = this.defaultForm.findFields("stav_vym_prev").gfield("getValue");
                                        if (stav_vym_prev_val != null)
                                            if (!view.getDataRows(true).some((value, index, array) => { return value.data.stav_vym === stav_vym_prev_val.stav_vym; }))
                                                this.defaultForm.findFields("stav_vym_prev").gfield("clear");
                                    });
                                }
                            });
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGStavVymahaniZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ok() {
                            if (!this.defaultForm.gform("isValid", true))
                                return;
                            else {
                                let dto = this.data;
                                this.defaultForm.findFields().gfield("model", "collect", dto);
                                let req = rq => {
                                    return {
                                        rq: { Data: dto }
                                    };
                                };
                                let task = this.editMode ? Gordic.Isl.KrokyVymahani.update(req) : Gordic.Isl.KrokyVymahani.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GStavVymahani = __decorate([
                        Decorators.gcontent
                    ], GStavVymahani);
                    Vymahani.GStavVymahani = GStavVymahani;
                })(Vymahani = Controls.Vymahani || (Controls.Vymahani = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1N0YXZWeW1haGFuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTdGF2VnltYWhhbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0E2TmY7QUE3TkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNk5uQjtJQTdOZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNk43QjtRQTdOb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBNk50QztZQTdOOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsUUFBUSxDQTZOL0M7Z0JBN051QyxXQUFBLFFBQVE7b0JBRTVDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7d0JBVzNDLGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7NEJBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29DQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0NBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDO2lDQUN4RCxDQUFDLENBQUMsQ0FBQzs0QkFFSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ3RCLENBQUM7d0JBQ08sVUFBVTs0QkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7aUNBQzNELE1BQU0sQ0FBQyxlQUFlLENBQUM7aUNBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQ3BCLElBQUksRUFBRSxTQUFTO2dDQUNmLFFBQVEsRUFBRSxJQUFJOzZCQUNqQixDQUFDO2lDQUNELE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDO2lDQUM3QixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQ0FDbkQsSUFBSSxFQUFFLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRTtnQ0FDL0MsSUFBSSxFQUFFLFVBQVU7Z0NBQ2hCLEtBQUssRUFBRSwrQkFBK0I7Z0NBQ3RDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRO2dDQUN4QyxNQUFNLEVBQUUsSUFBSTs2QkFDZixDQUFDO2lDQUNELE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUM7aUNBQ3ZDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFO2dDQUNuRCxJQUFJLEVBQUUsSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFO2dDQUMvQyxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsS0FBSyxFQUFFLG9DQUFvQztnQ0FDM0MsTUFBTSxFQUFFLElBQUk7Z0NBQ1osUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVE7NkJBQzNDLENBQUMsQ0FBQzs0QkFFUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDbkMsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQ0FDUixRQUFRLENBQUMsUUFBUSxFQUFFO29DQUNoQixJQUFJLEVBQUUsaUJBQWlCO29DQUN2QixLQUFLLEVBQUUseUNBQXlDO29DQUNoRCxZQUFZLEVBQUUsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dDQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3Q0FDakgsQ0FBQztvQ0FDTCxDQUFDO2lDQUNKLENBQUMsQ0FBQzs0QkFDWCxDQUFDOzRCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7aUNBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQ3BCLElBQUksRUFBRSxXQUFXO2dDQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7NkJBQzFCLENBQUM7aUNBQ0QsTUFBTSxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQztpQ0FDM0MsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0NBQzlDLGFBQWEsRUFBRTtvQ0FDWCxRQUFRLEVBQUUsR0FBRztvQ0FDYixVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU87b0NBQ3hCLGdCQUFnQixFQUFFLElBQUk7b0NBQ3RCLHNCQUFzQixFQUFFLElBQUk7b0NBQzVCLGtCQUFrQixFQUFFLElBQUk7aUNBQzNCO2dDQUNELElBQUksRUFBRSxhQUFhO2dDQUNuQixLQUFLLEVBQUUsaUNBQWlDO2dDQUN4QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0NBQ3ZCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQ0FDaEIsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ25DLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7b0NBQzFHLENBQUM7Z0NBQ0wsQ0FBQzs2QkFDSixDQUFDO2lDQUNELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUM7aUNBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0NBQ3BCLElBQUksRUFBRSxRQUFRO2dDQUNkLFVBQVUsRUFBRSxJQUFJO2dDQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7NkJBQzFCLENBQUM7aUNBQ0QsTUFBTSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQztpQ0FDbEMsUUFBUSxDQUFDLFlBQVksRUFBRTtnQ0FDcEIsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsVUFBVSxFQUFFLElBQUk7Z0NBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTs2QkFDMUIsQ0FBQztpQ0FDRCxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQztpQ0FDekIsUUFBUSxDQUFDLFlBQVksRUFBRSxVQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0NBQ2xELFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTs2QkFDMUIsQ0FBQztpQ0FDRCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7aUNBQzFCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2hCLElBQUksRUFBRSxXQUFXO2dDQUNqQixLQUFLLEVBQUUsb0RBQW9EO2dDQUMzRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0NBQ3ZCLFVBQVUsRUFBRSxJQUFJO2dDQUNoQixtQkFBbUIsRUFBRTtvQ0FDakIsS0FBSyxFQUFFLFVBQVUsVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3pELE9BQU8sRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDekU7NkJBQ0osQ0FBQyxDQUFDOzRCQUVQLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztpQ0FDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUNBQ3RCLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBRS9CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO2lDQUNuQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dDQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7Z0NBQzNDLENBQUM7Z0NBRUQsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0NBQzVGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQ0FDckUsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDakcsQ0FBQztnQ0FFRCxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDOUUsSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO3FDQUNuQyxNQUFNLENBQUMsR0FBRyxFQUFFO29DQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDO3dDQUNoRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dDQUN6RCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDcEIsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dDQUNsRixDQUFDO29DQUNMLENBQUM7Z0NBQ0wsQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQzt3QkFFTyxjQUFjOzRCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQWEsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNILENBQUM7d0JBRU8sWUFBWTs0QkFDaEIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUUsQ0FBQzs0QkFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQTZELEVBQUUsRUFBRTtnQ0FDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQ0FDVCxjQUFjLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dDQUNyRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDOzRDQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dDQUM5SCxDQUFDOzZDQUNJLENBQUM7NENBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7d0NBQ3BDLENBQUM7b0NBQ0wsQ0FBQyxDQUFDO2lDQUNMLENBQUMsQ0FBQztnQ0FFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDbkMsSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTt3Q0FDakQsSUFBSSxZQUFZLEdBQWlELElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDN0gsSUFBSSxZQUFZLElBQUksSUFBSTs0Q0FDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnREFDaEgsSUFBSSxDQUFDLFdBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNyRSxDQUFDLENBQUMsQ0FBQTtnQ0FDTixDQUFDOzRCQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUVILElBQUksU0FBUyxHQUFTLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFFLENBQUM7NEJBQzlGLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUE2RCxFQUFFLEVBQUU7Z0NBQzdFLElBQUksQ0FBQyxPQUFPLENBQUM7b0NBQ1QsY0FBYyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3Q0FDckQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQzs0Q0FDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3Q0FDN0gsQ0FBQzs2Q0FDSSxDQUFDOzRDQUNGLE9BQU8sSUFBSSxDQUFDO3dDQUNoQixDQUFDO29DQUNMLENBQUMsQ0FBQztpQ0FDTCxDQUFDLENBQUM7Z0NBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQ25DLElBQUksQ0FBQyxXQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7d0NBQ2pELElBQUksaUJBQWlCLEdBQWlELElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDdkksSUFBSSxpQkFBaUIsSUFBSSxJQUFJOzRDQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0RBQ3JILElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDMUUsQ0FBQyxDQUFDLENBQUE7Z0NBQ04sQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUVPLGFBQWE7NEJBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0NBQ25CLElBQUksRUFBRSwrQkFBK0I7b0NBQ3JDLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0NBQ04sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7b0NBQ25DLENBQUM7aUNBQ0osQ0FBQyxDQUFDLENBQUM7d0JBQ1IsQ0FBQzt3QkFFRCxFQUFFOzRCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO2dDQUN6QyxPQUFPO2lDQUNOLENBQUM7Z0NBRUYsSUFBSSxHQUFHLEdBQWtELElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ25FLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBRS9ELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFO29DQUNYLE9BQU87d0NBQ0gsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtxQ0FDcEIsQ0FBQztnQ0FDTixDQUFDLENBQUM7Z0NBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDekYsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUN4RCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQTtvQkExTlksYUFBYTt3QkFEekIsVUFBVSxDQUFDLFFBQVE7dUJBQ1AsYUFBYSxDQTBOekI7b0JBMU5ZLHNCQUFhLGdCQTBOekIsQ0FBQTtnQkFDTCxDQUFDLEVBN051QyxRQUFRLEdBQVIsaUJBQVEsS0FBUixpQkFBUSxRQTZOL0M7WUFBRCxDQUFDLEVBN044QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQTZOdEM7UUFBRCxDQUFDLEVBN05vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2TjdCO0lBQUQsQ0FBQyxFQTdOZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNk5uQjtBQUFELENBQUMsRUE3TlMsTUFBTSxLQUFOLE1BQU0sUUE2TmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1N0YXZWeW1haGFuaS50cyAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFN0YXYgdnltw6Fow6Fuw60gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDItMTggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1N0YXZWeW1haGFuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HS3Jva3lWeW1haGFuaUR0bztcclxuICAgICAgICBwb3V6aXRlS3Jva3k6IG51bWJlcltdO1xyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG4gICAgICAgIHJlYWRPbmx5OiBib29sZWFuO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGl4cF9kZW46IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQga3Jva3k6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HU3RhdlZ5bWFoYW5pRHRvW107XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYEtyb2sgdnltw6Fow6Fuw61gO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1N0YXZWeW1haGFuaVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3NrdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIktyb2sgdnltw6Fow6Fuw61cIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Quc3RhdlZ5bWFoYW5pKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgRGF0YS5SZWFkZXJzLlN0YXZWeW1haGFuaSgpLmdldFZpZXcoKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdnltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW09dmFsdWUuc3Rhdl92eW1cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB8fCB0aGlzLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxZllZGNob3rDrSBrcm9rIHZ5bcOhaMOhbsOtXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnN0YXZWeW1haGFuaSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IERhdGEuUmVhZGVycy5TdGF2VnltYWhhbmkoKS5nZXRWaWV3KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bV9wcmV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW1fcHJldj12YWx1ZS5zdGF2X3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB8fCB0aGlzLmVkaXRNb2RlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkT25seSAmJiAhdGhpcy5lZGl0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG91emVfbmVwb3V6aXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlpvYnJheml0IHBvdXplIG5lcG91xb5pdMOpIGtyb2t5IHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEtyb2t5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyU2V0dGluZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzLnNldChcInBvdXplX25lcG91eml0ZVwiLCB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwicG91emVfbmVwb3V6aXRlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyhcIkZvcm3DoXQgxI3DrXNsYSBqZWRuYWPDrWhvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1hdF9jalwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlbDvWNob3rDrSBsb2thbGl6YWNlIHZ5bcOhaMOhbsOtXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUl4cERlbjogdGhpcy5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWY2V0bmVOdWxsRnVua2NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWY2V0bmVTZXJ2aXNuaWNoRnVua2NpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3ZvbGVuZVByb1R5cHlQaGw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9wb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX3BvZD12YWx1ZS5peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqID09IG51bGwgfHwgb2JqLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3BvZFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhzX2Z1bl9wb2Q6IFwiMDAwMFNGMDAwMDBaXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRuxa8gcHJvIHphcGxhY2Vuw61cIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jcG5iXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJMaMWvdGEgcHJvIG9kdm9sw6Fuw61cIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jZHZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yZWFkT25seVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAga3Jva3VcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgQ29tbW9uLlByZWZhYnMucHJpelBvY2F0ZWsoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9za3VwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6FoYXQgZGFsxaHDrSBwxZnDrXBhZHkgcG9wbGF0bsOta2EgKHNsb3XEjS4gdnltw6Fow6Fuw60pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gMTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWUgPT09IHRydWUgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hLcm9reSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWFkT25seSAmJiAhdGhpcy5lZGl0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXhzX2Z1bl9wb2QgPSBcIjAwMDBTRjAwMDAwWlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRPbmx5ICYmICF0aGlzLmVkaXRNb2RlICYmIHRoaXMucG91eml0ZUtyb2t5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwic3Rhdl92eW1fcHJldlwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgc3Rhdl92eW1fcHJldjogMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkgJiYgIXRoaXMuZWRpdE1vZGUgJiYgdGhpcy51c2VyU2V0dGluZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXBvdXppdGUgPSB0aGlzLnVzZXJTZXR0aW5ncy5nZXQoXCJwb3V6ZV9uZXBvdXppdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lcG91eml0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJwb3V6ZV9uZXBvdXppdGVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmVwb3V6aXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBvdXplTmVwb3V6aXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMucmVhZE9ubHkgJiYgIXRoaXMuZWRpdE1vZGUgJiYgPGJvb2xlYW4+dGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInBvdXplX25lcG91eml0ZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaEtyb2t5KCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9ICg8YW55PnRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpKTtcclxuICAgICAgICAgICAgZGF0YS5kb25lKCh2aWV3OiBEYXRhLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTdGF2VnltYWhhbmlEdG8+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvdXplTmVwb3V6aXRlOiBuZXcgR29yZGljLkRhdGEuRmlsdGVyUHJvY2Vzc29yKChtZXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvdXplTmVwb3V6aXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRhLmRhdGEuc3Rhdl92eW0gIT09IDAgJiYgKHRoaXMucG91eml0ZUtyb2t5Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLnBvdXppdGVLcm9reS5pbmRleE9mKG1ldGEuZGF0YS5zdGF2X3Z5bSEpIDwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWV0YS5kYXRhLnN0YXZfdnltICE9PSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWFkT25seSAmJiAhdGhpcy5lZGl0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3Rhdl92eW1fdmFsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1N0YXZWeW1haGFuaUR0byA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXZfdnltX3ZhbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmdldERhdGFSb3dzKHRydWUpLnNvbWUoKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHsgcmV0dXJuIHZhbHVlLmRhdGEuc3Rhdl92eW0gPT09IHN0YXZfdnltX3ZhbC5zdGF2X3Z5bTsgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFfcHJldiA9ICg8YW55PnRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bV9wcmV2XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIikpO1xyXG4gICAgICAgICAgICBkYXRhX3ByZXYuZG9uZSgodmlldzogRGF0YS5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HU3RhdlZ5bWFoYW5pRHRvPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmlldy5wcm9jZXNzKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3V6ZU5lcG91eml0ZTogbmV3IEdvcmRpYy5EYXRhLkZpbHRlclByb2Nlc3NvcigobWV0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3V6ZU5lcG91eml0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWV0YS5kYXRhLnN0YXZfdnltID09PSAwIHx8ICh0aGlzLnBvdXppdGVLcm9reS5sZW5ndGggPiAwICYmIHRoaXMucG91eml0ZUtyb2t5LmluZGV4T2YobWV0YS5kYXRhLnN0YXZfdnltISkgPj0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkgJiYgIXRoaXMuZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIikuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXZfdnltX3ByZXZfdmFsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1N0YXZWeW1haGFuaUR0byA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bV9wcmV2XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Rhdl92eW1fcHJldl92YWwgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmlldy5nZXREYXRhUm93cyh0cnVlKS5zb21lKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7IHJldHVybiB2YWx1ZS5kYXRhLnN0YXZfdnltID09PSBzdGF2X3Z5bV9wcmV2X3ZhbC5zdGF2X3Z5bTsgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInN0YXZfdnltX3ByZXZcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU3RhdlZ5bWFoYW5pWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HS3Jva3lWeW1haGFuaUR0byA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyBJc2wuS3Jva3lWeW1haGFuaS51cGRhdGUocmVxKSA6IElzbC5Lcm9reVZ5bWFoYW5pLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19