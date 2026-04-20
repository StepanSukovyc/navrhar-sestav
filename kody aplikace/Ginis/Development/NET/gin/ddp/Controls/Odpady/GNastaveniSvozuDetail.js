"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniSvozuDetail.ts               </Name>
//    <Description> Detail nastavení svozu                                      </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-21                                                  </Created>
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
            let GNastaveniSvozuDetail = class GNastaveniSvozuDetail extends Gordic.GDetailBuilderContent {
                //Program začíná zde, definice políček
                onDetailBuilderInit(builder) {
                    var that = this;
                    that.beginOperation({ id: "loadInitial", text: "Inicializace..." });
                    builder.withComponent("svozoveJednotky", {
                        actions: {
                            actDetail: {
                                name: "actDetail",
                                caption: "Detail",
                                run: () => {
                                    let row = that.grid.ggrid("activeRow");
                                    if (row == null)
                                        return;
                                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GNastaveniSvozuNad", {
                                        ID: "DDPGNastaveniSvozuNad#",
                                        IxpDdp: that.model.ixp,
                                        SerCislo: that.model.ser_cislo,
                                        IxsOna: row.ixs_ona,
                                        DatOd: row.dat_od,
                                        edit: that.edit
                                    }, "Detail poplatku za svoz odpadu", 560, 610)
                                        .on("close", function (ev, retVal) {
                                        // Akce po zavření dialogu
                                    });
                                }
                            },
                            actNovy: {
                                name: "actNovy",
                                caption: "Nový",
                                run: () => {
                                }
                            },
                            actZrusit: {
                                name: "actZrusit",
                                caption: "Zrušit",
                                run: () => {
                                }
                            },
                            actSave: {
                                name: "actSave",
                                caption: "Uložit",
                                icon: "fa-floppy-o",
                                run: () => {
                                }
                            },
                            actClose: {
                                name: "actClose",
                                caption: "Zavřít",
                                icon: "gi-window-close",
                                run: () => {
                                    that.close();
                                }
                            },
                        },
                        tabGroups: [
                            { id: "jednotkyGroup", caption: "Svozové jednotky" }
                        ],
                        tabs: [
                            {
                                init: (el) => { that.createGrid(el); },
                                tabParams: {
                                    id: "tabMain",
                                    title: "",
                                    opened: true,
                                    group: {
                                        id: "jednotkyGroup"
                                    },
                                    menuBar: [
                                        "actDetail*",
                                        "actNovy*",
                                        "actZrusit*"
                                    ]
                                }
                            }
                        ],
                    });
                }
                //Načte se jako druhé a onContentReady následovně, seskládání formuláře
                onDetailBuilderBuild(builder) {
                    var that = this;
                    let formSetup = {};
                    let form = that.createHeaderForm();
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            form.form.sections[0].rows[0], // Identifikátor
                            form.form.sections[0].rows[1], // Značka/ČJ
                            form.form.sections[0].rows[2], // Datum podání
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            form.form.sections[1].rows[0], // Identifikátor případu DDP
                            form.form.sections[1].rows[1], // Skupina vymáhání
                            form.form.sections[1].rows[2], // Datum evidence
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            form.form.sections[2].rows[0], // Pořadí
                            form.form.sections[2].rows[1], // Zpracovatel
                            form.form.sections[2].rows[2], // Datum generování
                        ]
                    };
                    // úprava WFL/SSL komponent
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                }
                onContentReady() {
                    var that = this;
                    that.taskId = "actGNastaveniSvozuDetail";
                    that.title = `Nastavení svozu - detail ` + that.Ixp;
                    that.setBreadcrumbs([{
                            caption: "Nastavení svozu " + that.Ixp,
                            action: that.actions.actClose,
                        }]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    that.findForms("formHeader").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.nemovitost();
                    that.endOperation({ id: "loadInitial" });
                }
                // Formulář hlavičky 
                createHeaderForm() {
                    var that = this;
                    let hForm = new Gordic.Forms.Form()
                        //sections![0].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Identifikace objektu")
                        .addField("gstringbox", "w-12", Gordic.Prefabs.String.ixs(true), {
                        name: "nemovitost", //df_nemovitost
                        initialValue: that.Ixp,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        //ROW 1
                        .addRow("Popis")
                        .addField("gstringbox", "w-12", {
                        name: "popis"
                    })
                        //ROW 2
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", {
                        name: "poznamka"
                    });
                    hForm
                        //sections![1].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Počet splátek")
                        .addField("gnumberbox", "w-12", {
                        name: "poc_spl"
                    })
                        //ROW 1
                        .addRow("Sleva %")
                        .addField("gnumberbox", "w-12", {
                        name: "proc_sleva" // pokud je c_sleva, tak disable
                    })
                        //ROW 2
                        .addRow("Sleva částkou")
                        .addField("gnumberbox", "w-12", {
                        name: "c_sleva" // pokud je proc_sleva, tak disable
                    });
                    hForm
                        //sections![2].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Poplatek celkem - základ")
                        .addField("gnumberbox", "w-12", {
                        name: "c_zak",
                        disabled: true
                    })
                        //ROW 1
                        .addRow("Poplatek celkem - po slevě")
                        .addField("gnumberbox", "w-12", {
                        name: "c_celk",
                        disabled: true
                    })
                        //ROW 2
                        .addRow("Aktivita")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        name: "aktivita",
                        model: "model.aktivita=value.aktivita",
                        disabled: true
                    });
                    return hForm;
                }
                /**
                 * Vytvoří samotný grid/seznam kontrol
                 */
                createGrid(el) {
                    var that = this;
                    let form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addRow()
                        .addField("gcheck", {
                        name: "pouze_aktivni",
                        label: "Pouze aktivní",
                        defaultValue: true,
                        change: (ev, obj) => {
                            var filter = {
                                ixp: that.model.ixp_ddp,
                                ser_cislo: that.model.ser_cislo,
                                pouze_aktivni: obj.value
                            };
                            that.view = new Gordic.Isl.View(that.isl.Odpady.listSvozoveJednotky(rq => {
                                return {
                                    filters: filter,
                                    fragments: ["Default"]
                                };
                            }));
                            that.grid.ggrid("setData", that.view);
                        }
                    });
                    that.defaultForm = $.newDiv()
                        .appendTo(el)
                        .gform("createFrom", form);
                    var filter = {
                        ixp: that.model.ixp_ddp,
                        ser_cislo: that.model.ser_cislo,
                        pouze_aktivni: that.findFields("pouze_aktivni").gfield("getValue")
                    };
                    that.view = new Gordic.Isl.View(that.isl.Odpady.listSvozoveJednotky(rq => {
                        return {
                            filters: filter,
                            fragments: ["Default"]
                        };
                    }));
                    return that.grid = $.newDiv()
                        .appendTo(el)
                        //.gautofit()
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        name: "GNastaveniSvozuGrid",
                        data: that.view,
                        //defaultAction: this.actions.actDetail,
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.SvozoveJednotky(),
                        rowNumbers: false,
                        profiles: [{
                                name: "aktivita", _locked: true, _default: true,
                                condFormats: [
                                    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, "100"))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                                ]
                            }]
                    });
                }
                // Nastavení pole nemovitost
                nemovitost() {
                    var that = this;
                    var typ_obj = that.model.typ_obj;
                    var id_budovy = that.model.id_budovy;
                    var id_jednotky = that.model.id_jednotky;
                    var nemovitost;
                    var tooltip;
                    if (typ_obj != null && typ_obj != 0) {
                        nemovitost = typ_obj.toString() + ', ' + (typ_obj == 20 ? id_budovy : id_jednotky);
                        tooltip = (typ_obj == 20 ? 'Identifikace domu: ' : 'Identifikace bytu: ') + (typ_obj == 20 ? id_budovy : id_jednotky);
                    }
                    else {
                        nemovitost = "";
                        tooltip = 'Vyberte prosím nemovitost';
                    }
                    var nemovitostField = that.findFields("nemovitost");
                    nemovitostField.gfield("setValue", nemovitost);
                    nemovitostField.gfield("option", "tooltip", tooltip);
                }
                // Nastavení políček dle režimu úprav
                nastaveniEditace() {
                    var that = this;
                    // todo
                }
            };
            GNastaveniSvozuDetail = __decorate([
                Decorators.gcontent
            ], GNastaveniSvozuDetail);
            WebClient.GNastaveniSvozuDetail = GNastaveniSvozuDetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaVN2b3p1RGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05hc3RhdmVuaVN2b3p1RGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBb1VmO0FBcFVELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9VbkI7SUFwVWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9VN0I7UUFwVW9CLFdBQUEsU0FBUztZQUkxQixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLE9BQUEscUJBQXFCO2dCQWM1RCxzQ0FBc0M7Z0JBQ3RDLG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBRXBFLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3JDLE9BQU8sRUFBRTs0QkFDTCxTQUFTLEVBQUU7Z0NBQ1AsSUFBSSxFQUFFLFdBQVc7Z0NBQ2pCLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixHQUFHLEVBQUUsR0FBRyxFQUFFO29DQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFrRCxXQUFXLENBQUMsQ0FBQztvQ0FDeEYsSUFBSSxHQUFHLElBQUksSUFBSTt3Q0FBRSxPQUFPO29DQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyx5Q0FBeUMsRUFDbEU7d0NBQ0ksRUFBRSxFQUFFLHdCQUF3Qjt3Q0FDNUIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzt3Q0FDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUzt3Q0FDOUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO3dDQUNuQixLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU07d0NBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtxQ0FDbEIsRUFBRSxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO3lDQUM3QyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU07d0NBQzdCLDBCQUEwQjtvQ0FDOUIsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs2QkFDSjs0QkFDRCxPQUFPLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsT0FBTyxFQUFFLE1BQU07Z0NBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDVixDQUFDOzZCQUNKOzRCQUNELFNBQVMsRUFBRTtnQ0FDUCxJQUFJLEVBQUUsV0FBVztnQ0FDakIsT0FBTyxFQUFFLFFBQVE7Z0NBQ2pCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ1YsQ0FBQzs2QkFDSjs0QkFDRCxPQUFPLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsT0FBTyxFQUFFLFFBQVE7Z0NBQ2pCLElBQUksRUFBRSxhQUFhO2dDQUNuQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUVWLENBQUM7NkJBQ0o7NEJBQ0QsUUFBUSxFQUFFO2dDQUNOLElBQUksRUFBRSxVQUFVO2dDQUNoQixPQUFPLEVBQUUsUUFBUTtnQ0FDakIsSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0NBQ2pCLENBQUM7NkJBQ0o7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUU7eUJBQ3ZEO3dCQUNELElBQUksRUFBRTs0QkFDRjtnQ0FDSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDO2dDQUNyQyxTQUFTLEVBQUU7b0NBQ1AsRUFBRSxFQUFFLFNBQVM7b0NBQ2IsS0FBSyxFQUFFLEVBQUU7b0NBQ1QsTUFBTSxFQUFFLElBQUk7b0NBQ1osS0FBSyxFQUFFO3dDQUNILEVBQUUsRUFBRSxlQUFlO3FDQUN0QjtvQ0FDRCxPQUFPLEVBQUU7d0NBQ0wsWUFBWTt3Q0FDWixVQUFVO3dDQUNWLFlBQVk7cUNBQ2Y7aUNBQ0o7NkJBQ0o7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFBO2dCQUNOLENBQUM7Z0JBRUQsdUVBQXVFO2dCQUN2RSxvQkFBb0IsQ0FBQyxPQUFnRDtvQkFDakUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUVuQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUM3QyxJQUFJLEVBQUU7NEJBQ0YsSUFBSyxDQUFDLElBQUssQ0FBQyxRQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQjs0QkFDbkQsSUFBSyxDQUFDLElBQUssQ0FBQyxRQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVk7NEJBQy9DLElBQUssQ0FBQyxJQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlO3lCQUNyRDtxQkFDaUIsQ0FBQztvQkFFdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRzt3QkFDOUMsSUFBSSxFQUFFOzRCQUNGLElBQUssQ0FBQyxJQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSw0QkFBNEI7NEJBQy9ELElBQUssQ0FBQyxJQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUI7NEJBQ3RELElBQUssQ0FBQyxJQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUI7eUJBQ3ZEO3FCQUNpQixDQUFDO29CQUV2QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dCQUM5QyxJQUFJLEVBQUU7NEJBQ0YsSUFBSyxDQUFDLElBQUssQ0FBQyxRQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVM7NEJBQzVDLElBQUssQ0FBQyxJQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjOzRCQUNqRCxJQUFLLENBQUMsSUFBSyxDQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CO3lCQUN6RDtxQkFDaUIsQ0FBQztvQkFFdkIsMkJBQTJCO29CQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUEwQixDQUFDO29CQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBRXBELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDakIsT0FBTyxFQUFFLGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHOzRCQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO3lCQUNoQyxDQUFDLENBQUMsQ0FBQztvQkFFSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3hHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO2dCQUVELHFCQUFxQjtnQkFDYixnQkFBZ0I7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTt3QkFDL0IsdUJBQXVCO3lCQUN0QixVQUFVLEVBQUU7d0JBQ2IsT0FBTzt5QkFDTixNQUFNLENBQUMsc0JBQXNCLENBQUM7eUJBQzlCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDN0QsSUFBSSxFQUFFLFlBQVksRUFBRSxlQUFlO3dCQUNuQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0JBQ3RCLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNqRCxDQUFDO3dCQUNGLE9BQU87eUJBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQzt5QkFDZixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTt3QkFDNUIsSUFBSSxFQUFFLE9BQU87cUJBQ2hCLENBQUM7d0JBQ0YsT0FBTzt5QkFDTixNQUFNLENBQUMsVUFBVSxDQUFDO3lCQUNsQixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTt3QkFDNUIsSUFBSSxFQUFFLFVBQVU7cUJBQ25CLENBQUMsQ0FBQTtvQkFFTixLQUFLO3dCQUNELHVCQUF1Qjt5QkFDdEIsVUFBVSxFQUFFO3dCQUNiLE9BQU87eUJBQ04sTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUU7d0JBQzVCLElBQUksRUFBRSxTQUFTO3FCQUNsQixDQUFDO3dCQUNGLE9BQU87eUJBQ04sTUFBTSxDQUFDLFNBQVMsQ0FBQzt5QkFDakIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUU7d0JBQzVCLElBQUksRUFBRSxZQUFZLENBQUMsZ0NBQWdDO3FCQUN0RCxDQUFDO3dCQUNGLE9BQU87eUJBQ04sTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUU7d0JBQzVCLElBQUksRUFBRSxTQUFTLENBQUMsbUNBQW1DO3FCQUN0RCxDQUFDLENBQUE7b0JBRU4sS0FBSzt3QkFDRCx1QkFBdUI7eUJBQ3RCLFVBQVUsRUFBRTt3QkFDYixPQUFPO3lCQUNOLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQzt5QkFDbEMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUU7d0JBQzVCLElBQUksRUFBRSxPQUFPO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDO3dCQUNGLE9BQU87eUJBQ04sTUFBTSxDQUFDLDRCQUE0QixDQUFDO3lCQUNwQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTt3QkFDNUIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUM7d0JBQ0YsT0FBTzt5QkFDTixNQUFNLENBQUMsVUFBVSxDQUFDO3lCQUNsQixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSwrQkFBK0I7d0JBQ3RDLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDLENBQUE7b0JBRU4sT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNLLFVBQVUsQ0FBQyxFQUF1QjtvQkFDdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLElBQUksR0FBRyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFHLENBQUM7eUJBQ25GLE1BQU0sRUFBRTt5QkFDUixRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoQixJQUFJLEVBQUUsZUFBZTt3QkFDckIsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLFlBQVksRUFBRSxJQUFJO3dCQUNsQixNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBRWhCLElBQUksTUFBTSxHQUFHO2dDQUNULEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Z0NBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0NBQy9CLGFBQWEsRUFBRSxHQUFHLENBQUMsS0FBSzs2QkFDM0IsQ0FBQTs0QkFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUN4RCxFQUFFLENBQUMsRUFBRTtnQ0FDRCxPQUFPO29DQUNILE9BQU8sRUFBRSxNQUFNO29DQUNmLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDekIsQ0FBQTs0QkFDTCxDQUFDLENBQ0osQ0FBQyxDQUFBOzRCQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDeEIsUUFBUSxDQUFDLEVBQUUsQ0FBQzt5QkFDWixLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUUvQixJQUFJLE1BQU0sR0FBRzt3QkFDVCxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO3dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO3dCQUMvQixhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO3FCQUNyRSxDQUFBO29CQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQ3hELEVBQUUsQ0FBQyxFQUFFO3dCQUNELE9BQU87NEJBQ0gsT0FBTyxFQUFFLE1BQU07NEJBQ2YsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO3lCQUN6QixDQUFBO29CQUNMLENBQUMsQ0FDSixDQUFDLENBQUE7b0JBRUYsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ3hCLFFBQVEsQ0FBQyxFQUFFLENBQUM7d0JBQ2IsYUFBYTt5QkFDWixRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQ2xDLEtBQUssQ0FBa0Q7d0JBQ3BELElBQUksRUFBRSxxQkFBcUI7d0JBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZix3Q0FBd0M7d0JBQ3hDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixVQUFVLEVBQUUsTUFBTSxFQUFFLDZDQUE2Qzt3QkFDakUsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLE9BQU8sRUFBRSxVQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFO3dCQUM3QyxVQUFVLEVBQUUsS0FBSzt3QkFDakIsUUFBUSxFQUFFLENBQUM7Z0NBQ1AsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJO2dDQUMvQyxXQUFXLEVBQUU7b0NBQ1QsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7aUNBQ3hJOzZCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO2dCQUNWLENBQUM7Z0JBRUQsNEJBQTRCO2dCQUM1QixVQUFVO29CQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUNyQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztvQkFDekMsSUFBSSxVQUFrQixDQUFDO29CQUN2QixJQUFJLE9BQWUsQ0FBQztvQkFFcEIsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNuRixPQUFPLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzFILENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixVQUFVLEdBQUcsRUFBRSxDQUFDO3dCQUNoQixPQUFPLEdBQUcsMkJBQTJCLENBQUM7b0JBQzFDLENBQUM7b0JBRUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDcEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQy9DLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDekQsQ0FBQztnQkFFRCxxQ0FBcUM7Z0JBQ3JDLGdCQUFnQjtvQkFDWixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU87Z0JBRVgsQ0FBQzthQUNKLENBQUE7WUEvVFkscUJBQXFCO2dCQUZqQyxVQUFVLENBQUMsUUFBUTtlQUVQLHFCQUFxQixDQStUakM7WUEvVFksK0JBQXFCLHdCQStUakMsQ0FBQTtRQUNMLENBQUMsRUFwVW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW9VN0I7SUFBRCxDQUFDLEVBcFVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFvVW5CO0FBQUQsQ0FBQyxFQXBVUyxNQUFNLEtBQU4sTUFBTSxRQW9VZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HTmFzdGF2ZW5pU3ZvenVEZXRhaWwudHMgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRGV0YWlsIG5hc3RhdmVuw60gc3ZvenUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjYtMDEtMjEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgICAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBHTmFzdGF2ZW5pU3ZvenVEZXRhaWwgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQgeyAgICBcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgKi9cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICAvKiogU2VyaW92w6kgxI3DrXNsbyAqL1xyXG4gICAgICAgIFNlckNpc2xvOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIERhdGEgbmFzdGF2ZW7DrSBzdm96dSAqL1xyXG4gICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuTEsuSXNsLkdOYXN0YXZlbmlTdm96dUR0bztcclxuICAgICAgICAvKiogVGFidWxrYSAqL1xyXG4gICAgICAgIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFJlxb5pbSDDunByYXYgKi9cclxuICAgICAgICBlZGl0OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBEYXRhIHRhYnVsa3kgKi9cclxuICAgICAgICB2aWV3OiBJc2wuVmlldztcclxuXHJcbiAgICAgICAgLy9Qcm9ncmFtIHphxI3DrW7DoSB6ZGUsIGRlZmluaWNlIHBvbMOtxI1la1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWRJbml0aWFsXCIsIHRleHQ6IFwiSW5pY2lhbGl6YWNlLi4uXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQoXCJzdm96b3ZlSmVkbm90a3lcIiwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTdm96b3ZlSmVkbm90a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYXN0YXZlbmlTdm96dU5hZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR05hc3RhdmVuaVN2b3p1TmFkI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBEZHA6IHRoYXQubW9kZWwuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXJDaXNsbzogdGhhdC5tb2RlbC5zZXJfY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4c09uYTogcm93Lml4c19vbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdE9kOiByb3cuZGF0X29kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0OiB0aGF0LmVkaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcIkRldGFpbCBwb3BsYXRrdSB6YSBzdm96IG9kcGFkdVwiLCA1NjAsIDYxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBa2NlIHBvIHphdsWZZW7DrSBkaWFsb2d1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE5vdnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3ROb3Z5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFpydXNpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFNhdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdENsb3NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFiR3JvdXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJqZWRub3RreUdyb3VwXCIsIGNhcHRpb246IFwiU3Zvem92w6kgamVkbm90a3lcIiB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoYXQuY3JlYXRlR3JpZChlbCkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJNYWluXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImplZG5vdGt5R3JvdXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbCpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE5vdnkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzaXQqXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL05hxI10ZSBzZSBqYWtvIGRydWjDqSBhIG9uQ29udGVudFJlYWR5IG7DoXNsZWRvdm7Emywgc2Vza2zDoWTDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGF0LmNyZWF0ZUhlYWRlckZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuSW5mb10gPSB7IC8vIFBydm7DrSBzbG91cGVjXHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzBdLCAvLyBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVsxXSwgLy8gWm5hxI1rYS/EjEpcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbMl0sIC8vIERhdHVtIHBvZMOhbsOtXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcblxyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGExXSA9IHsgLy8gRHJ1aMO9IHNsb3VwZWNcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMF0sIC8vIElkZW50aWZpa8OhdG9yIHDFmcOtcGFkdSBERFBcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMV0sIC8vIFNrdXBpbmEgdnltw6Fow6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMl0sIC8vIERhdHVtIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcblxyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGEyXSA9IHsgLy8gVMWZZXTDrSBzbG91cGVjXHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzBdLCAvLyBQb8WZYWTDrVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsyXS5yb3dzIVsxXSwgLy8gWnByYWNvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMl0ucm93cyFbMl0sIC8vIERhdHVtIGdlbmVyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBXRkwvU1NMIGtvbXBvbmVudFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgZm9ybVNldHVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHTmFzdGF2ZW5pU3ZvenVEZXRhaWxcIjtcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IGBOYXN0YXZlbsOtIHN2b3p1IC0gZGV0YWlsIGAgKyB0aGF0Lkl4cDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2ZW7DrSBzdm96dSBcIiArIHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0Q2xvc2UsXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhhdC5uZW1vdml0b3N0KCk7XHJcbiAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZEluaXRpYWxcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZvcm11bMOhxZkgaGxhdmnEjWt5IFxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGhGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC8vc2VjdGlvbnMhWzBdLnJvd3MhW3hdXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrYWNlIG9iamVrdHVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5lbW92aXRvc3RcIiwgLy9kZl9uZW1vdml0b3N0XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAxXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAyXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaEZvcm1cclxuICAgICAgICAgICAgICAgIC8vc2VjdGlvbnMhWzFdLnJvd3MhW3hdXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IHNwbMOhdGVrXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2Nfc3BsXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAxXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2xldmEgJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvY19zbGV2YVwiIC8vIHBva3VkIGplIGNfc2xldmEsIHRhayBkaXNhYmxlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMlxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNsZXZhIMSNw6FzdGtvdVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19zbGV2YVwiIC8vIHBva3VkIGplIHByb2Nfc2xldmEsIHRhayBkaXNhYmxlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaEZvcm1cclxuICAgICAgICAgICAgICAgIC8vc2VjdGlvbnMhWzJdLnJvd3MhW3hdXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9wbGF0ZWsgY2Vsa2VtIC0gesOha2xhZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YWtcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3BsYXRlayBjZWxrZW0gLSBwbyBzbGV2xJtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfY2Vsa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMlxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdGl2aXRhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YT12YWx1ZS5ha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhGb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBzYW1vdG7DvSBncmlkL3Nlem5hbSBrb250cm9sIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZChlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvdXplX2FrdGl2bmlcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3V6ZSBha3Rpdm7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lm1vZGVsLml4cF9kZHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJfY2lzbG86IHRoYXQubW9kZWwuc2VyX2Npc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG91emVfYWt0aXZuaTogb2JqLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBJc2wuVmlldyh0aGF0LmlzbC5PZHBhZHkubGlzdFN2b3pvdmVKZWRub3RreShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiRGVmYXVsdFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZWwpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgIGl4cDogdGhhdC5tb2RlbC5peHBfZGRwLFxyXG4gICAgICAgICAgICAgICAgc2VyX2Npc2xvOiB0aGF0Lm1vZGVsLnNlcl9jaXNsbyxcclxuICAgICAgICAgICAgICAgIHBvdXplX2FrdGl2bmk6IHRoYXQuZmluZEZpZWxkcyhcInBvdXplX2FrdGl2bmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IElzbC5WaWV3KHRoYXQuaXNsLk9kcGFkeS5saXN0U3Zvem92ZUplZG5vdGt5KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJEZWZhdWx0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhlbClcclxuICAgICAgICAgICAgICAgIC8vLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTdm96b3ZlSmVkbm90a3lEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdOYXN0YXZlbmlTdm96dUdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU3Zvem92ZUplZG5vdGt5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIiwgX2xvY2tlZDogdHJ1ZSwgX2RlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogJ05PVChFUVVBTFMoQGFrdGl2aXRhLCBcIjEwMFwiKSknLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcubGlnaHRncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5hc3RhdmVuw60gcG9sZSBuZW1vdml0b3N0XHJcbiAgICAgICAgbmVtb3ZpdG9zdCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdHlwX29iaiA9IHRoYXQubW9kZWwudHlwX29iajtcclxuICAgICAgICAgICAgdmFyIGlkX2J1ZG92eSA9IHRoYXQubW9kZWwuaWRfYnVkb3Z5O1xyXG4gICAgICAgICAgICB2YXIgaWRfamVkbm90a3kgPSB0aGF0Lm1vZGVsLmlkX2plZG5vdGt5O1xyXG4gICAgICAgICAgICB2YXIgbmVtb3ZpdG9zdDogc3RyaW5nO1xyXG4gICAgICAgICAgICB2YXIgdG9vbHRpcDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cF9vYmogIT0gbnVsbCAmJiB0eXBfb2JqICE9IDApIHtcclxuICAgICAgICAgICAgICAgIG5lbW92aXRvc3QgPSB0eXBfb2JqLnRvU3RyaW5nKCkgKyAnLCAnICsgKHR5cF9vYmogPT0gMjAgPyBpZF9idWRvdnkgOiBpZF9qZWRub3RreSk7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwID0gKHR5cF9vYmogPT0gMjAgPyAnSWRlbnRpZmlrYWNlIGRvbXU6ICcgOiAnSWRlbnRpZmlrYWNlIGJ5dHU6ICcpICsgKHR5cF9vYmogPT0gMjAgPyBpZF9idWRvdnkgOiBpZF9qZWRub3RreSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZW1vdml0b3N0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXAgPSAnVnliZXJ0ZSBwcm9zw61tIG5lbW92aXRvc3QnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbmVtb3ZpdG9zdEZpZWxkID0gdGhhdC5maW5kRmllbGRzKFwibmVtb3ZpdG9zdFwiKTtcclxuICAgICAgICAgICAgbmVtb3ZpdG9zdEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIG5lbW92aXRvc3QpO1xyXG4gICAgICAgICAgICBuZW1vdml0b3N0RmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwidG9vbHRpcFwiLCB0b29sdGlwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5hc3RhdmVuw60gcG9sw63EjWVrIGRsZSByZcW+aW11IMO6cHJhdlxyXG4gICAgICAgIG5hc3RhdmVuaUVkaXRhY2UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gdG9kb1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19