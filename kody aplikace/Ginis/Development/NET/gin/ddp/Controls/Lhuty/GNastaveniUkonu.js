"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniUkonu.ts                     </Name>
//    <Description> Okno s nastavením úkonů (pro předpis)                       </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-11-07                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GNastaveniUkonu = class GNastaveniUkonu extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.createMainButtons();
                    that.createForm();
                    that.onAfterInit();
                }
                /** Metoda pro inicializaci hodnot formuláře */
                onAfterInit() {
                    const that = this;
                    if (that.Edit) {
                        //? Proč vlastně nenačítám jenom model ?...
                        //that.defaultForm!.findForms().findFields().gfield("model", "apply", that.model);
                        //TODO: that.defaultForm!.findForms().findFields("dokument").gfield("setValue", that.model);
                        that.defaultForm.findForms().findFields("dat_od").gfield("setValue", that.model.dat_od, { initialValues: true });
                        that.defaultForm.findForms().findFields("dat_do").gfield("setValue", that.model.dat_do, { initialValues: true });
                        that.defaultForm.findForms().findFields("poznamka").gfield("setValue", that.model.poznamka, { initialValues: true });
                        that.defaultForm.findForms().findFields("typ_uko").gfield("model", "apply", { typ_uko: that.model.typ_uko }, { initialValues: true });
                        if (that.model.typ_uko == 20 || that.model.typ_uko == 30) {
                            that.defaultForm.findForms().findFields("dat_do").gfield("option", "disabled", true);
                            that.defaultForm.findForms().findFields("dat_do").gfield("option", "flag", "");
                            that.defaultForm.findForms().findFields("dat_do").gfield("setValidators", []);
                            that.defaultForm.findForms().findFields("dat_do").gfield("setValue", null);
                        }
                    }
                    else {
                        that.defaultForm.findForms().findFields("typ_uko").gfield("model", "apply", { typ_uko: 0 });
                        //that.defaultForm!.findForms().findFields("typ_uko").gfield("setValue", { typ_uko: 0 });
                    }
                }
                /** Metoda pro vytvoření formuláře */
                createForm() {
                    const that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                        //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                        .addSection({ layoutDescriptor: "L1M1S1" })
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        initialValue: that.Ixp,
                        disabled: true,
                        //flag: "required", validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Datum splatnosti")
                        .addField("gdatebox", {
                        name: "dat_spl", // Datum splatnosti
                        initialValue: that.Dat_spl,
                        disabled: true,
                        //flag: "required", validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) { }
                    })
                        .addRow("Typ předpisu")
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", // Typ předpisu
                        disabled: true,
                        initialValue: { ktg_upo: that.Ktg_upo ?? 100 },
                        //flag: "required", validators: [new Gordic.Validators.Required()],
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt",
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        helperColumns: ["ktg_upo", "ktg_upo_txt"],
                        dropdown: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Priorita úhrady")
                        .addField("gnumberbox", {
                        name: "pri_uhr", // Priorita úhrady
                        disabled: true,
                        initialValue: that.Pri_uhr ?? 0
                    })
                        .addSection({ layoutDescriptor: "L1M1S1" })
                        .addRow("Úkon")
                        .addField("gselectbox", WebClient.Common.Prefabs.typUkonu(), {
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        //TODO: v případě nastavení (ukončení nebo zneplatnění) nemá smysl datum do, taky se vymaže obsah a hraje se s povinnostním flagem
                        change: function (ev, input) {
                            let typUko = input.value?.typ_uko;
                            if (typUko == 20 || typUko == 30) {
                                $(this).gform().findFields("dat_do").gfield("option", "disabled", true);
                                $(this).gform().findFields("dat_do").gfield("option", "flag", "");
                                $(this).gform().findFields("dat_do").gfield("setValidators", []);
                                $(this).gform().findFields("dat_do").gfield("setValue", null);
                            }
                            else {
                                $(this).gform().findFields("dat_do").gfield("option", "disabled", false);
                                $(this).gform().findFields("dat_do").gfield("option", "flag", "required");
                                $(this).gform().findFields("dat_do").gfield("setValidators", [new Gordic.Validators.Required()]);
                            }
                        }
                    })
                        .addRow("Dokument")
                        .addField("gstringbox", {
                        name: "dokument", // Dokument
                        disabled: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Datum od")
                        .addField("gdatebox", {
                        name: "dat_od", // Datum Od
                        disabled: false,
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) { }
                    })
                        .addRow("Datum do")
                        .addField("gdatebox", {
                        name: "dat_do", // Datum Do
                        disabled: false,
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) { }
                    })
                        .addSection({ layoutDescriptor: "L1M1S1" })
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka", // Poznámka
                        disabled: false,
                        change: function (ev, input) { }
                    });
                    that.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                }
                //initialTypUko(): { typ_uko: number; typ_uko_txt: string } {
                //    const that = this;
                //    //if (that.model.typ_uko == null) {
                //    //    return { typ_uko: 0, typ_uko_txt: "Pozastavení" };
                //    //}
                //    switch (that.model.typ_uko) {
                //        case 0:
                //            return { typ_uko: 0, typ_uko_txt: "Pozastavení" };
                //            break;
                //        case 10:
                //            return { typ_uko: 10, typ_uko_txt: "Přerušení" };
                //            break;
                //        case 20:
                //            return { typ_uko: 20, typ_uko_txt: "Zneplatnění" };
                //            break;
                //        case 30:
                //            return { typ_uko: 30, typ_uko_txt: "Ukončení" };
                //            break;
                //        case null:
                //            return { typ_uko: 0, typ_uko_txt: "Pozastavení" };
                //            break;
                //        default:              
                //            return { typ_uko: 0, typ_uko_txt: "Pozastavení" };
                //            break;
                //    }
                //}
                /** Metoda pro vytvoření spodních tlačítek okna */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /** Metoda pro uložení dat z obsahu (a zavření dialogového okna) */
                ok() {
                    const that = this;
                    that.beginOperation({ id: "ulozitVytvoritUkon", text: "Probíhá uložení..." });
                    let validTest = this.findForms().gform("isValid");
                    if (validTest === false) {
                        that.endOperation({ id: "ulozitVytvoritUkon" });
                        return that.dialogs.error("Chyba", "Některá pole nejsou správně vyplněna");
                    }
                    var saveDto = {};
                    that.defaultForm.findForms().findFields().gfield("model", "collect", saveDto);
                    saveDto.ixs_lhu = that.Ixs_lhu;
                    saveDto.novyUkon = this.Edit ? false : true;
                    that.isl.PredpisyUkonyLhuta.upravVytvorUkon(rq => { return { data: saveDto }; })
                        .get()
                        .done(function (ret) {
                        var test = ret;
                        that.endOperation({ id: "ulozitVytvoritUkon" });
                        return that.dialogs.alert("Uloženo", "Úkon byl úspěšně uložena")
                            .on("close", function () {
                            //"Uloženo", "Data byla úspěšně uložena").done(function () {
                            that.close();
                        });
                    })
                        .fail(function (xhr, type, vobj) {
                        that.endOperation({ id: "ulozitVytvoritUkon" });
                        if (type === "exception") {
                            vobj.handled = true; // Zavře okno velké ginisovské chyby aby zůstala jenom moje tabulka
                            return that.dialogs.error("Chyba", "<b>Operace neproběhla úspěšně.</b> <br/> " + vobj.baseMessage);
                        }
                        //if (type === "exception") {
                        //    return that.dialogs.error("Operace neproběhla úspěšně", vobj.baseMessage);
                        //}                        
                    });
                }
            };
            GNastaveniUkonu = __decorate([
                Decorators.gcontent
            ], GNastaveniUkonu);
            WebClient.GNastaveniUkonu = GNastaveniUkonu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaVVrb251LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05hc3RhdmVuaVVrb251LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBb1FmO0FBcFFELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9RbkI7SUFwUWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9RN0I7UUFwUW9CLFdBQUEsU0FBUztZQUUxQixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkE4QjdDLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ3RCLENBQUM7Z0JBRUQsK0NBQStDO2dCQUMvQyxXQUFXO29CQUNQLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1osMkNBQTJDO3dCQUMzQyxrRkFBa0Y7d0JBQ2xGLDRGQUE0Rjt3QkFDNUYsSUFBSSxDQUFDLFdBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNsSCxJQUFJLENBQUMsV0FBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ2xILElBQUksQ0FBQyxXQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDdEgsSUFBSSxDQUFDLFdBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUN2SSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUUsQ0FBQzs0QkFDdkQsSUFBSSxDQUFDLFdBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQ3RGLElBQUksQ0FBQyxXQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNoRixJQUFJLENBQUMsV0FBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUMvRSxJQUFJLENBQUMsV0FBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNoRixDQUFDO29CQUVMLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsV0FBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM3Rix5RkFBeUY7b0JBQzdGLENBQUM7Z0JBRUwsQ0FBQztnQkFHRCxxQ0FBcUM7Z0JBQ3JDLFVBQVU7b0JBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3dCQUM3Rix1SEFBdUg7eUJBQ3RILFVBQVUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lCQUMxQyxNQUFNLENBQUMsZUFBZSxDQUFDO3lCQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDckQsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsWUFBWSxFQUFFLElBQUksQ0FBQyxHQUFHO3dCQUN0QixRQUFRLEVBQUUsSUFBSTt3QkFDZCxtRUFBbUU7cUJBQ3RFLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDO3lCQUMxQixRQUFRLENBQUMsVUFBVSxFQUFFO3dCQUNsQixJQUFJLEVBQUUsU0FBUyxFQUFFLG1CQUFtQjt3QkFDcEMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPO3dCQUMxQixRQUFRLEVBQUUsSUFBSTt3QkFDZCxtRUFBbUU7d0JBQ25FLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQztxQkFDbkMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO3lCQUN0QixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxlQUFlO3dCQUNoQyxRQUFRLEVBQUUsSUFBSTt3QkFDZCxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQUU7d0JBQzlDLG1FQUFtRTt3QkFDbkUsS0FBSyxFQUFFLGlFQUFpRTt3QkFDeEUsWUFBWSxFQUFFLHlCQUF5Qjt3QkFDdkMsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQzt3QkFDekMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDO3FCQUNuQyxDQUFDO3lCQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDekIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLFNBQVMsRUFBRSxrQkFBa0I7d0JBQ25DLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUM7cUJBQ2xDLENBQUM7eUJBQ0QsVUFBVSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7eUJBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7eUJBQ2QsUUFBUSxDQUFDLFlBQVksRUFBRSxVQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQy9DLElBQUksRUFBRSxVQUFVO3dCQUNoQixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLGtJQUFrSTt3QkFDbEksTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7NEJBQ3ZCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDOzRCQUNsQyxJQUFJLE1BQU0sSUFBSSxFQUFFLElBQUksTUFBTSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUN4RSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dDQUNsRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDbEUsQ0FBQztpQ0FBTSxDQUFDO2dDQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQ3pFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0NBQzFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3JHLENBQUM7d0JBQ0wsQ0FBQztxQkFD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b250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HTmFzdGF2ZW5pVWtvbnUudHMgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBzIG5hc3RhdmVuw61tIMO6a29uxa8gKHBybyBwxZllZHBpcykgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTEtMDcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdOYXN0YXZlbmlVa29udSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIEl4c19saHU6IHN0cmluZztcclxuICAgICAgICBSYWRla191aHI6IG51bWJlcjtcclxuICAgICAgICBEYXRfc3BsOiBEYXRlO1xyXG4gICAgICAgIEt0Z191cG86IG51bWJlcjtcclxuICAgICAgICBQcmlfdWhyOiBudW1iZXI7XHJcblxyXG4gICAgICAgIFR5cF9waGw6IHN0cmluZztcclxuICAgICAgICBFZGl0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBtb2RlbDogR29yZGljLkRkcC5JbnRlcmZhY2UuR05hc3RhdmVuaVVrb251RHRvO1xyXG4gICAgICAgIC8vLS0tICAgXHJcbiAgICAgICAgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgdWNzOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBTdGF2eSAtIGZvcm1cclxuICAgICAgICAvLyAqIEB0eXBlIHtKUXVlcnk8Pn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogR3JpZCBwcm8gUHJlZHBpc3lcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PD59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1haW5CdXR0b25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0Lm9uQWZ0ZXJJbml0KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBNZXRvZGEgcHJvIGluaWNpYWxpemFjaSBob2Rub3QgZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBvbkFmdGVySW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkVkaXQpIHtcclxuICAgICAgICAgICAgICAgIC8vPyBQcm/EjSB2bGFzdG7EmyBuZW5hxI3DrXTDoW0gamVub20gbW9kZWwgPy4uLlxyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlZmF1bHRGb3JtIS5maW5kRm9ybXMoKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsKTtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRva3VtZW50XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0Lm1vZGVsLmRhdF9vZCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9kb1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0Lm1vZGVsLmRhdF9kbywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInBvem5hbWthXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQubW9kZWwucG96bmFta2EsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJ0eXBfdWtvXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfdWtvOiB0aGF0Lm1vZGVsLnR5cF91a28gfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwudHlwX3VrbyA9PSAyMCB8fCB0aGF0Lm1vZGVsLnR5cF91a28gPT0gMzApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcInNldFZhbGlkYXRvcnNcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInR5cF91a29cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHR5cF91a286IDAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuZGVmYXVsdEZvcm0hLmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJ0eXBfdWtvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgdHlwX3VrbzogMCB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKiogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZSAqL1xyXG4gICAgICAgIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRkcE5hc3RhdmVuaVVrb251XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBGb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBOYXN0YXZlbmlVa29udVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBzcGxhdG5vc3RpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXCIsIC8vIERhdHVtIHNwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuRGF0X3NwbCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcMWZZWRwaXN1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLCAvLyBUeXAgcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGt0Z191cG86IHRoYXQuS3RnX3VwbyA/PyAxMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG87bW9kZWwua3RnX3Vwb190eHQ9dmFsdWUua3RnX3Vwb190eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99LXtrdGdfdXBvX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJrdGdfdXBvXCIsIFwia3RnX3Vwb190eHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJpb3JpdGEgw7pocmFkeVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmlfdWhyXCIsIC8vIFByaW9yaXRhIMO6aHJhZHlcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuUHJpX3VociA/PyAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiw5prb25cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgQ29tbW9uLlByZWZhYnMudHlwVWtvbnUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogdiBwxZnDrXBhZMSbIG5hc3RhdmVuw60gKHVrb27EjWVuw60gbmVibyB6bmVwbGF0bsSbbsOtKSBuZW3DoSBzbXlzbCBkYXR1bSBkbywgdGFreSBzZSB2eW1hxb5lIG9ic2FoIGEgaHJhamUgc2UgcyBwb3Zpbm5vc3Ruw61tIGZsYWdlbVxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwVWtvID0gaW5wdXQudmFsdWU/LnR5cF91a287XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBVa28gPT0gMjAgfHwgdHlwVWtvID09IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImRhdF9kb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImRhdF9kb1wiKS5nZmllbGQoXCJzZXRWYWxpZGF0b3JzXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBcInJlcXVpcmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwic2V0VmFsaWRhdG9yc1wiLCBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRG9rdW1lbnRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rdW1lbnRcIiwgLy8gRG9rdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXCIsIC8vIERhdHVtIE9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLCAvLyBEYXR1bSBEb1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsIC8vIFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBoZWFkZXJGb3JtKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWFsVHlwVWtvKCk6IHsgdHlwX3VrbzogbnVtYmVyOyB0eXBfdWtvX3R4dDogc3RyaW5nIH0ge1xyXG4gICAgICAgIC8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIC8vaWYgKHRoYXQubW9kZWwudHlwX3VrbyA9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgcmV0dXJuIHsgdHlwX3VrbzogMCwgdHlwX3Vrb190eHQ6IFwiUG96YXN0YXZlbsOtXCIgfTtcclxuICAgICAgICAvLyAgICAvL31cclxuICAgICAgICAvLyAgICBzd2l0Y2ggKHRoYXQubW9kZWwudHlwX3Vrbykge1xyXG4gICAgICAgIC8vICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyB0eXBfdWtvOiAwLCB0eXBfdWtvX3R4dDogXCJQb3phc3RhdmVuw61cIiB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyB0eXBfdWtvOiAxMCwgdHlwX3Vrb190eHQ6IFwiUMWZZXJ1xaFlbsOtXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgdHlwX3VrbzogMjAsIHR5cF91a29fdHh0OiBcIlpuZXBsYXRuxJtuw61cIiB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyB0eXBfdWtvOiAzMCwgdHlwX3Vrb190eHQ6IFwiVWtvbsSNZW7DrVwiIH07XHJcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgY2FzZSBudWxsOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgdHlwX3VrbzogMCwgdHlwX3Vrb190eHQ6IFwiUG96YXN0YXZlbsOtXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyB0eXBfdWtvOiAwLCB0eXBfdWtvX3R4dDogXCJQb3phc3RhdmVuw61cIiB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvKiogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBzcG9kbsOtY2ggdGxhxI3DrXRlayBva25hICovXHJcbiAgICAgICAgY3JlYXRlTWFpbkJ1dHRvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTWV0b2RhIHBybyB1bG/FvmVuw60gZGF0IHogb2JzYWh1IChhIHphdsWZZW7DrSBkaWFsb2dvdsOpaG8gb2tuYSkgKi9cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ1bG96aXRWeXR2b3JpdFVrb25cIiwgdGV4dDogXCJQcm9iw61ow6EgdWxvxb5lbsOtLi4uXCIgfSk7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZFRlc3QgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkVGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxveml0Vnl0dm9yaXRVa29uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOxJtrdGVyw6EgcG9sZSBuZWpzb3Ugc3Byw6F2bsSbIHZ5cGxuxJtuYVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2F2ZUR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuR05hc3RhdmVuaVVrb251RHRvID0ge31cclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBzYXZlRHRvKTtcclxuICAgICAgICAgICAgc2F2ZUR0by5peHNfbGh1ID0gdGhhdC5JeHNfbGh1O1xyXG4gICAgICAgICAgICBzYXZlRHRvLm5vdnlVa29uID0gdGhpcy5FZGl0ID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5QcmVkcGlzeVVrb255TGh1dGEudXByYXZWeXR2b3JVa29uKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogc2F2ZUR0byB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IHJldDtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3ppdFZ5dHZvcml0VWtvblwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJVbG/FvmVub1wiLCBcIsOaa29uIGJ5bCDDunNwxJvFoW7EmyB1bG/FvmVuYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXCJVbG/FvmVub1wiLCBcIkRhdGEgYnlsYSDDunNwxJvFoW7EmyB1bG/FvmVuYVwiKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxveml0Vnl0dm9yaXRVa29uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTsgLy8gWmF2xZllIG9rbm8gdmVsa8OpIGdpbmlzb3Zza8OpIGNoeWJ5IGFieSB6xa9zdGFsYSBqZW5vbSBtb2plIHRhYnVsa2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiPGI+T3BlcmFjZSBuZXByb2LEm2hsYSDDunNwxJvFoW7Emy48L2I+IDxici8+IFwiICsgdm9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiT3BlcmFjZSBuZXByb2LEm2hsYSDDunNwxJvFoW7Em1wiLCB2b2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL30gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vKiogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBzZXpuYW11KGdyaWR1KSAqL1xyXG4gICAgICAgIC8vY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgLy8gICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgLy8gICAgICAgIC5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIC8vICAgIHRoaXMuZ3JpZC5nZ3JpZCh7XHJcbiAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiZ3JpZFwiLFxyXG4gICAgICAgIC8vICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkYXRfb2QsIGRhdF9kbywgdHlwX3VrbywgcG96bmFta2EsIGFrdGl2aXRhXCJcclxuICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgY29sdW1uczogRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuU2V6bmFtVWtvbnUoKVxyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iXX0=