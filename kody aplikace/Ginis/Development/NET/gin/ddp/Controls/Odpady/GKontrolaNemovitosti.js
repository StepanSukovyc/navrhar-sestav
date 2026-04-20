"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GKontrolaNemovitosti.ts                </Name>
//    <Description> Odpady - Kontrola nemovitostí                               </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-06                                                  </Created>
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
            /**
             * Odpady - Kontrola nemovitostí
             *
             * @author Vojtěch Čech
             * @date 06.01.2026
             */
            let GKontrolaNemovitosti = class GKontrolaNemovitosti extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = "Kontrola nemovitostí";
                    that.taskId = "actGKontrolaNemovitosti";
                    that.createFilter();
                    that.createGrid();
                    that.createActions();
                    that.createMenuBar();
                    if (that.zp_vyuz_jed_sez == "-1" || that.zp_vyuz_bud_sez == "-1") {
                        that.dialogs.warning("Upozornění", "Nejsou nastavené způsoby využití jednotek nebo budov, nebude zobrazena žádná nemovitost!");
                    }
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                //#region Filtr
                /** Vytvoření filtru */
                createFilter() {
                    const that = this;
                    var formulare = [];
                    formulare.push(that.createFilterForm());
                    $.newDiv().appendTo(this.element)
                        .gfilterpanel(
                    //! Vytvoření standardních parametrů filterpanelu pro EKO moduly
                    Gordic.Eko.Filters.getFilterParams(formulare, [], // oblíbené filtry
                    "ddp_ptm_nemovi", // téma
                    null, //"ixs_fun_akt", //sloupec z DTO pro filtr "*vlastní" nebo null, pokud nemá být
                    function (event, obj) {
                        that.ziskejData(obj.filter);
                    }, null, // pevný filtr
                    true, // navigátor v detailu filtru
                    that //parentContent
                    ), {
                        strictStopAutoLoad: true
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Vymáhání
                 * @returns
                 */
                createFilterForm() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ tabLabel: "Kontrola nemovitostí" })
                        .addRow("Typ objektu")
                        .addField("gselectbox", Gordic.Prefabs.Select.majcobj(), {
                        name: "typ_obj",
                        model: "model.typ_obj=value.typ_obj",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            typ_obj: [20, 40]
                        },
                        change: function (ev, obj) {
                            // Nastavení povinnosti dalších polí dle typu objektu
                            const target = $(ev.currentTarget);
                            const typObj = obj.value ? obj.value.typ_obj : null;
                            // Helper function to set field requirements
                            const setFieldRequirements = (fieldNames, isRequired) => {
                                const validators = isRequired ? [new Gordic.Validators.Required()] : [];
                                const flag = isRequired ? Gordic.Prefabs.Field.Flags.required : null;
                                fieldNames.forEach(fieldName => {
                                    target.findFields(fieldName).gfield("setValidators", validators);
                                    target.findFields(fieldName).gfield("flag", flag);
                                });
                            };
                            // Common fields for both types
                            const commonFields = ['kod_kraje', 'kod_okresu', 'kod_obce', 'kod_casti_obce'];
                            if (typObj === 20) { // Budova
                                setFieldRequirements(commonFields, true);
                            }
                            else if (typObj === 40) { // Jednotka
                                setFieldRequirements([...commonFields, 'kod_kat_uzemi', 'cislo_domovni'], true);
                            }
                            else { // Žádný typ
                                setFieldRequirements([...commonFields, 'kod_kat_uzemi', 'cislo_domovni'], false);
                            }
                        }
                    })
                        .addRow("Kraj")
                        .addField("gselectbox", Gordic.Prefabs.Select.nemskrj(), {
                        name: "kod_kraje",
                        model: "model.kod_kraje=value.kod_kraje",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            aktivita: 100
                        }
                    })
                        .addRow("Okres")
                        .addField("gselectbox", Gordic.Prefabs.Select.nemsokr(), {
                        name: "kod_okresu",
                        model: "model.kod_okresu=value.kod_okresu",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            aktivita: 100,
                            kod_kraje: new Gordic.Forms.Dependency("kod_kraje", "kod_kraje", true)
                        }
                    })
                        .addRow("Obec")
                        .addField("gselectbox", Gordic.Prefabs.Select.nemsobc(), {
                        name: "kod_obce",
                        model: "model.kod_obce=value.kod_obce",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            aktivita: 100,
                            kod_okresu: new Gordic.Forms.Dependency("kod_okresu", "kod_okresu", true)
                        }
                    })
                        .addRow("Část obce")
                        .addField("gselectbox", Gordic.Prefabs.Select.nemscob(), {
                        name: "kod_casti_obce",
                        model: "model.kod_casti_obce=value.kod_casti_obce",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            aktivita: 100,
                            kod_obce: new Gordic.Forms.Dependency("kod_obce", "kod_obce", true)
                        }
                    })
                        .addRow("Katastrální území")
                        .addField("gselectbox", Gordic.Prefabs.Select.nemskat(), {
                        name: "kod_kat_uzemi",
                        model: "model.kod_kat_uzemi=value.kod_kat_uzemi",
                        serverFilters: {
                            aktivita: 100,
                            kod_obce: new Gordic.Forms.Dependency("kod_obce", "kod_obce", true)
                        }
                    })
                        .addRow("Číslo domovní")
                        .addField("gstringbox", {
                        name: "cislo_domovni"
                    })
                        .addRow("Číslo jednotky")
                        .addField("gstringbox", {
                        name: "cislo_jednotky"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "neevidovane",
                        label: "Pouze neevidované nemovitosti"
                    });
                    return form;
                }
                //#endregion
                /** Vytvoří grid/seznam případů */
                createGrid() {
                    return this.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GNemovitostiGrid",
                        data: [],
                        //defaultAction: this.actions.actDetail,
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.Nemovitosti(),
                        rowNumbers: false
                    });
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 */
                ziskejData(filter) {
                    const that = this;
                    that.view = new Gordic.Isl.View(that.isl.Odpady.listNemovitosti(rq => {
                        return {
                            filters: filter,
                            fragments: ["Default"]
                        };
                    }));
                    that.grid.ggrid("setData", that.view);
                }
                /** Vytvoření akcí pro položky v menubaru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actPripady: {
                            name: "actPripady",
                            caption: "Případ(y)",
                            tooltip: "Zobrazí identifikaci případu, pokud je již nemovitost napojena",
                            run: () => {
                                var row = that.grid.ggrid("activeRow");
                                if (row != undefined)
                                    that.navigate("Gordic.Ddp.WebClient.GSeznamPripaduOdpady", { ID: "DDPGSeznamPripaduOdpady#", dto: row });
                            }
                        }
                    });
                }
                /** Vytvoření položek v menubaru*/
                createMenuBar() {
                    const that = this;
                    let menu = [];
                    menu.push({ action: that.actions.actPripady, favorite: true });
                    that.menuBar(menu);
                }
            };
            GKontrolaNemovitosti = __decorate([
                Decorators.gcontent
            ], GKontrolaNemovitosti);
            WebClient.GKontrolaNemovitosti = GKontrolaNemovitosti;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0tvbnRyb2xhTmVtb3ZpdG9zdGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHS29udHJvbGFOZW1vdml0b3N0aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXdRZjtBQXhRRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3UW5CO0lBeFFnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3UTdCO1FBeFFvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLE9BQUEsWUFBWTtnQkF5QmxELGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO29CQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLHlCQUF5QixDQUFDO29CQUV4QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBRXJCLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLDBGQUEwRixDQUFDLENBQUM7b0JBQ25JLENBQUM7b0JBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUMvRCxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsZUFBZTtnQkFDZix1QkFBdUI7Z0JBQ2YsWUFBWTtvQkFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7b0JBRXhCLFNBQVMsQ0FBQyxJQUFJLENBQ1YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQzFCLENBQUM7b0JBRUYsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUM1QixZQUFZO29CQUNULGdFQUFnRTtvQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUM5QixTQUFTLEVBQ1QsRUFBRSxFQUFFLGtCQUFrQjtvQkFDdEIsZ0JBQWdCLEVBQUUsT0FBTztvQkFDekIsSUFBSSxFQUFFLCtFQUErRTtvQkFDckYsVUFBVSxLQUFLLEVBQUUsR0FBRzt3QkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hDLENBQUMsRUFDRCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxDQUFDLGVBQWU7cUJBQ3ZCLEVBQ0Q7d0JBQ0ksa0JBQWtCLEVBQUUsSUFBSTtxQkFDM0IsQ0FDUixDQUFBO2dCQUNMLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxnQkFBZ0I7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxDQUFDO3lCQUNqRSxNQUFNLENBQUMsYUFBYSxDQUFDO3lCQUNyQixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLDZCQUE2Qjt3QkFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRO3dCQUN6QyxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLGFBQWEsRUFBRTs0QkFDWCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO3lCQUNwQjt3QkFDRCxNQUFNLEVBQUUsVUFBVSxFQUFPLEVBQUUsR0FBUTs0QkFDL0IscURBQXFEOzRCQUNyRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUNuQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUVwRCw0Q0FBNEM7NEJBQzVDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxVQUFvQixFQUFFLFVBQW1CLEVBQUUsRUFBRTtnQ0FDdkUsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQ3hFLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUVyRSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29DQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7b0NBQ2pFLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQ0FDdEQsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxDQUFDOzRCQUVGLCtCQUErQjs0QkFDL0IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOzRCQUUvRSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVM7Z0NBQzFCLG9CQUFvQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDN0MsQ0FBQztpQ0FBTSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVc7Z0NBQ25DLG9CQUFvQixDQUFDLENBQUMsR0FBRyxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUNwRixDQUFDO2lDQUFNLENBQUMsQ0FBQyxZQUFZO2dDQUNqQixvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDckYsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQzt5QkFDZCxRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxhQUFhLEVBQUU7NEJBQ1gsUUFBUSxFQUFFLEdBQUc7eUJBQ2hCO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQzt5QkFDZixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLEtBQUssRUFBRSxtQ0FBbUM7d0JBQzFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxhQUFhLEVBQUU7NEJBQ1gsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUM7eUJBQ3pFO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQzt5QkFDZCxRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSwrQkFBK0I7d0JBQ3RDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxhQUFhLEVBQUU7NEJBQ1gsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsVUFBVSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUM7eUJBQzVFO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQzt5QkFDbkIsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQzlDLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLEtBQUssRUFBRSwyQ0FBMkM7d0JBQ2xELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QyxhQUFhLEVBQUU7NEJBQ1gsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUM7eUJBQ3RFO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLG1CQUFtQixDQUFDO3lCQUMzQixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLEtBQUssRUFBRSx5Q0FBeUM7d0JBQ2hELGFBQWEsRUFBRTs0QkFDWCxRQUFRLEVBQUUsR0FBRzs0QkFDYixRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQzt5QkFDdEU7cUJBQ0osQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDO3lCQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsZUFBZTtxQkFDeEIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxnQkFBZ0I7cUJBQ3pCLENBQUM7eUJBQ0QsTUFBTSxFQUFFO3lCQUNSLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxhQUFhO3dCQUNuQixLQUFLLEVBQUUsK0JBQStCO3FCQUN6QyxDQUFDLENBQUE7b0JBRU4sT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsWUFBWTtnQkFFWixrQ0FBa0M7Z0JBQzFCLFVBQVU7b0JBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUE4Qzt3QkFDaEQsSUFBSSxFQUFFLGtCQUFrQjt3QkFDeEIsSUFBSSxFQUFFLEVBQUU7d0JBQ1Isd0NBQXdDO3dCQUN4QyxVQUFVLEVBQUUsTUFBTTt3QkFDbEIsVUFBVSxFQUFFLE1BQU0sRUFBRSw2Q0FBNkM7d0JBQ2pFLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixPQUFPLEVBQUUsVUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTt3QkFDekMsVUFBVSxFQUFFLEtBQUs7cUJBQ3BCLENBQUMsQ0FBQTtnQkFDVixDQUFDO2dCQUVEOzttQkFFRztnQkFDSyxVQUFVLENBQUMsTUFBVztvQkFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FDcEQsRUFBRSxDQUFDLEVBQUU7d0JBQ0QsT0FBTzs0QkFDSCxPQUFPLEVBQUUsTUFBTTs0QkFDZixTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7eUJBQ3pCLENBQUE7b0JBQ0wsQ0FBQyxDQUNKLENBQUMsQ0FBQTtvQkFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUVELDRDQUE0QztnQkFDcEMsYUFBYTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDckI7d0JBQ0ksVUFBVSxFQUFFOzRCQUNSLElBQUksRUFBRSxZQUFZOzRCQUNsQixPQUFPLEVBQUUsV0FBVzs0QkFDcEIsT0FBTyxFQUFFLGdFQUFnRTs0QkFDekUsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBOEMsV0FBVyxDQUFDLENBQUM7Z0NBQ3BGLElBQUksR0FBRyxJQUFJLFNBQVM7b0NBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQywyQ0FBMkMsRUFBRSxFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFFbkksQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztvQkFFNUIsSUFBSSxDQUFDLElBQUksQ0FDTCxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ3RELENBQUE7b0JBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQzthQUNKLENBQUE7WUEvUFksb0JBQW9CO2dCQURoQyxVQUFVLENBQUMsUUFBUTtlQUNQLG9CQUFvQixDQStQaEM7WUEvUFksOEJBQW9CLHVCQStQaEMsQ0FBQTtRQUNMLENBQUMsRUF4UW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXdRN0I7SUFBRCxDQUFDLEVBeFFnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF3UW5CO0FBQUQsQ0FBQyxFQXhRUyxNQUFNLEtBQU4sTUFBTSxRQXdRZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HS29udHJvbGFOZW1vdml0b3N0aS50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2RwYWR5IC0gS29udHJvbGEgbmVtb3ZpdG9zdMOtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjYtMDEtMDYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIE9kcGFkeSAtIEtvbnRyb2xhIG5lbW92aXRvc3TDrVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIFZvanTEm2NoIMSMZWNoXHJcbiAgICAgKiBAZGF0ZSAwNi4wMS4yMDI2XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0tvbnRyb2xhTmVtb3ZpdG9zdGkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVmlldyBwcm8gZ3JpZFxyXG4gICAgICAgICogQHR5cGUge0lzbC5WaWV3PFREYXRhPn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHZpZXc6IElzbC5WaWV3O1xyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKiogUGFyYW1ldHJ5ICovXHJcbiAgICAgICAgcGFyYW1zOiBhbnk7XHJcbiAgICAgICAgLyoqIFR5cCBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIHR5cFBobDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBLbmloYSAqL1xyXG4gICAgICAgIGl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sga25paHkgKi9cclxuICAgICAgICByb2tEZW46IG51bWJlcjtcclxuICAgICAgICAvKiogUmXFvmltIMSNdGVuw60gKi9cclxuICAgICAgICByZXppbUN0ZW5pOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBWeXXFvml0w60gamVkbm90ZWsgKi9cclxuICAgICAgICB6cF92eXV6X2plZF9zZXo6IHN0cmluZztcclxuICAgICAgICAvKiogVnl1xb5pdMOtIGJ1ZG92ICovXHJcbiAgICAgICAgenBfdnl1el9idWRfc2V6OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFRhYnVsa2EgbmVtb3ZpdG9zdMOtICovXHJcbiAgICAgICAgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICBcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIktvbnRyb2xhIG5lbW92aXRvc3TDrVwiO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R0tvbnRyb2xhTmVtb3ZpdG9zdGlcIjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51QmFyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC56cF92eXV6X2plZF9zZXogPT0gXCItMVwiIHx8IHRoYXQuenBfdnl1el9idWRfc2V6ID09IFwiLTFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJVcG96b3JuxJtuw61cIiwgXCJOZWpzb3UgbmFzdGF2ZW7DqSB6cMWvc29ieSB2eXXFvml0w60gamVkbm90ZWsgbmVibyBidWRvdiwgbmVidWRlIHpvYnJhemVuYSDFvsOhZG7DoSBuZW1vdml0b3N0IVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5EZHBFa29Jbml0KHRoYXQsIHRoYXQuSW5pdEVycm9yVGV4dCk7XHJcbiAgICAgICAgICAgIENvbW1vbi5CYXNlLnNldERhdGVCb3hTaG9ydGN1dHModGhhdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRmlsdHJcclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZmlsdHJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybXVsYXJlOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvcm11bGFyZS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbChcclxuICAgICAgICAgICAgICAgICAgICAvLyEgVnl0dm/FmWVuw60gc3RhbmRhcmRuw61jaCBwYXJhbWV0csWvIGZpbHRlcnBhbmVsdSBwcm8gRUtPIG1vZHVseVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOZW1vdml0b3N0aUZpbHRlcj4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGFyZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW10sIC8vIG9ibMOtYmVuw6kgZmlsdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGRwX3B0bV9uZW1vdmlcIiwgLy8gdMOpbWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCwgLy9cIml4c19mdW5fYWt0XCIsIC8vc2xvdXBlYyB6IERUTyBwcm8gZmlsdHIgXCIqdmxhc3Ruw61cIiBuZWJvIG51bGwsIHBva3VkIG5lbcOhIGLDvXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YShvYmouZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCwgLy8gcGV2bsO9IGZpbHRyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsIC8vIG5hdmlnw6F0b3IgdiBkZXRhaWx1IGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0IC8vcGFyZW50Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3RTdG9wQXV0b0xvYWQ6IHRydWUgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBkbyBmaWx0cnUgLSBWeW3DoWjDoW7DrVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb250cm9sYSBuZW1vdml0b3N0w61cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBvYmpla3R1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0Lm1hamNvYmooKSwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9vYmpcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfb2JqPXZhbHVlLnR5cF9vYmpcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX29iajogWzIwLCA0MF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2OiBhbnksIG9iajogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gcG92aW5ub3N0aSBkYWzFocOtY2ggcG9sw60gZGxlIHR5cHUgb2JqZWt0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSAkKGV2LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBPYmogPSBvYmoudmFsdWUgPyBvYmoudmFsdWUudHlwX29iaiA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IGZpZWxkIHJlcXVpcmVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGaWVsZFJlcXVpcmVtZW50cyA9IChmaWVsZE5hbWVzOiBzdHJpbmdbXSwgaXNSZXF1aXJlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IGlzUmVxdWlyZWQgPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIDogW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmbGFnID0gaXNSZXF1aXJlZCA/IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWVzLmZvckVhY2goZmllbGROYW1lID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZmluZEZpZWxkcyhmaWVsZE5hbWUpLmdmaWVsZChcInNldFZhbGlkYXRvcnNcIiwgdmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZpbmRGaWVsZHMoZmllbGROYW1lKS5nZmllbGQoXCJmbGFnXCIsIGZsYWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb21tb24gZmllbGRzIGZvciBib3RoIHR5cGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1vbkZpZWxkcyA9IFsna29kX2tyYWplJywgJ2tvZF9va3Jlc3UnLCAna29kX29iY2UnLCAna29kX2Nhc3RpX29iY2UnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBPYmogPT09IDIwKSB7IC8vIEJ1ZG92YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmllbGRSZXF1aXJlbWVudHMoY29tbW9uRmllbGRzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBPYmogPT09IDQwKSB7IC8vIEplZG5vdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWVsZFJlcXVpcmVtZW50cyhbLi4uY29tbW9uRmllbGRzLCAna29kX2thdF91emVtaScsICdjaXNsb19kb21vdm5pJ10sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyDFvcOhZG7DvSB0eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZpZWxkUmVxdWlyZW1lbnRzKFsuLi5jb21tb25GaWVsZHMsICdrb2Rfa2F0X3V6ZW1pJywgJ2Npc2xvX2RvbW92bmknXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLcmFqXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0Lm5lbXNrcmooKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29kX2tyYWplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua29kX2tyYWplPXZhbHVlLmtvZF9rcmFqZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPa3Jlc1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5uZW1zb2tyKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvZF9va3Jlc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rb2Rfb2tyZXN1PXZhbHVlLmtvZF9va3Jlc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCwgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAga29kX2tyYWplOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJrb2Rfa3JhamVcIiwgXCJrb2Rfa3JhamVcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9iZWNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QubmVtc29iYygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb2Rfb2JjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmtvZF9vYmNlPXZhbHVlLmtvZF9vYmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtvZF9va3Jlc3U6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcImtvZF9va3Jlc3VcIiwgXCJrb2Rfb2tyZXN1XCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOhc3Qgb2JjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5uZW1zY29iKCksIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb2RfY2FzdGlfb2JjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmtvZF9jYXN0aV9vYmNlPXZhbHVlLmtvZF9jYXN0aV9vYmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtvZF9vYmNlOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJrb2Rfb2JjZVwiLCBcImtvZF9vYmNlXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRhc3Ryw6FsbsOtIMO6emVtw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QubmVtc2thdCgpLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29kX2thdF91emVtaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmtvZF9rYXRfdXplbWk9dmFsdWUua29kX2thdF91emVtaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAga29kX29iY2U6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcImtvZF9vYmNlXCIsIFwia29kX29iY2VcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zbG8gZG9tb3Zuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9fZG9tb3ZuaVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zbG8gamVkbm90a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9famVkbm90a3lcIiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZWV2aWRvdmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvdXplIG5lZXZpZG92YW7DqSBuZW1vdml0b3N0aVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIGdyaWQvc2V6bmFtIHDFmcOtcGFkxa8gKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HTmVtb3ZpdG9zdGlEdG8+KHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHTmVtb3ZpdG9zdGlHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuTmVtb3ZpdG9zdGkoKSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIHrDrXNrw6Fuw60gZmlsdHJvdmFuw71jaCBkYXQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IElzbC5WaWV3KHRoYXQuaXNsLk9kcGFkeS5saXN0TmVtb3ZpdG9zdGkoXHJcbiAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIkRlZmF1bHRcIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkpXHJcblxyXG4gICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gcG9sb8W+a3kgdiBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RQcmlwYWR5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlwYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZnDrXBhZCh5KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWm9icmF6w60gaWRlbnRpZmlrYWNpIHDFmcOtcGFkdSwgcG9rdWQgamUgamnFviBuZW1vdml0b3N0IG5hcG9qZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOZW1vdml0b3N0aUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdW5kZWZpbmVkKSB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1Nlem5hbVByaXBhZHVPZHBhZHlcIiwgeyBJRDogXCJERFBHU2V6bmFtUHJpcGFkdU9kcGFkeSNcIiwgZHRvOiByb3cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBwb2xvxb5layB2IG1lbnViYXJ1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1lbnU6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmlwYWR5LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWVudUJhcihtZW51KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=