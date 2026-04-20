"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPlatebKalOdb.ts                    </Name>
//    <Description> Platební kalendář odběratelských dokladů                    </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-03-13                                                  </Created>
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
            /** Platební kalendář odběratelských dokladů */
            let GSmlPlatebKalOdb = class GSmlPlatebKalOdb extends Gordic.GContentBase {
                closing() {
                    return this.changed;
                }
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: false,
                            run: (ev, ctx) => {
                                return Sml.Dialogs.GSmlPlatbKalPohDlg({
                                    parentContent: this,
                                    opt: {
                                        smlpid: this.smlpid,
                                        smlskal: null
                                    },
                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                }).done((retVal) => {
                                    if (retVal ?? false) {
                                        this.changed = true;
                                        this.$grid.ggrid("getView").requestData();
                                    }
                                });
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: (ev, ctx) => {
                                var selection = this.$grid.ggrid("getSelection");
                                if (selection.length != 1) {
                                    return $.Deferred().reject().promise();
                                }
                                return Sml.Dialogs.GSmlPlatbKalPohDlg({
                                    parentContent: this,
                                    opt: {
                                        smlpid: this.smlpid,
                                        smlskal: selection[0]
                                    },
                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                }).done((retVal) => {
                                    if (retVal ?? false) {
                                        this.changed = true;
                                        this.$grid.ggrid("getView").requestData();
                                    }
                                });
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actNovy*", "actDetail*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření seznamu platebního kalendáře */
                createGrid() {
                    this.$grid = $.newDiv()
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        data: new Gordic.Isl.View(this.isl.Smlskal.listOdb({ filters: { ixp_sml_pri: this.smlpid.ixp_sml_pri } }), {
                            onResponse: (data) => {
                                this.servicePermissions = data.servicePermissions;
                                this.actions.actNovy?.updatePermission(this.servicePermissions, "LzeNovy");
                                return data;
                            },
                            key: ["ixp", "cis_platby", "ixp_sml_pri"],
                            processors: {
                                permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"])
                            }
                        }),
                        defaultProfile: {
                            condFormats: [
                                {
                                    formula: String.Format("EQUALS(@aktivita, {0})", 500 /* Interface.Aktivita.ng_aktNoAkt */), //356.20 30.03.07 - obarvení stornovaného řádku
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                                },
                                {
                                    formula: "@num_poh > 0", //356.11 20.11.06 - obarvím řádky, které již mají založenou žádost - v nRow je číslo o jednu vyšší než v lParam
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                                }
                            ]
                        },
                        defaultAction: this.actions.actDetail,
                        columns: this.createGridFormat(),
                        selection: (ev, obj) => {
                            if (obj.count == 1 && obj.getSelection().length == 1) {
                                this.actions.actDetail?.enabled(true);
                            }
                            else {
                                this.actions.actDetail?.enabled(false);
                            }
                        }
                    }).gautofit();
                }
                /**
                 * Vytvoření gridformátu pro hlavní grid
                 * @returns
                 */
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addNumberColumn({
                        name: "cis_platby" /* Interface.GSmlskalDtoNames.cis_platby */,
                        caption: "#",
                        width: 30
                    }).addTextColumn({
                        name: "ktg_platby_txt" /* Interface.GSmlskalDtoNames.ktg_platby_txt */,
                        width: 110,
                        caption: "jres:33600182", //RC 33600182 : Kategorie
                    }).addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GSmlskalDtoNames.ixs_esu_txt */,
                        width: 300,
                        caption: "jres:33600183", //RC 33600183 : Odběratel
                    }).addTextColumn({
                        name: "bu_ci",
                        caption: "jres:33600164", //RC 33600164 : Bankovní účet
                        width: 120,
                        cellTemplate: "{bu_ci:trim:encode}/{sk_ci:trim:encode}",
                    }).addTextColumn({
                        name: "ixs_ste_txt" /* Interface.GSmlskalDtoNames.ixs_ste_txt */,
                        width: 120,
                        caption: "jres:33600184", //RC 33600184 : Šablona objednávky
                    });
                    Gordic.Eko.Grid.Column.addPopis(gf, {
                        name: "popis" /* Interface.GSmlskalDtoNames.popis */,
                        caption: "jres:33600185" //RC 33600185 : Popis platby
                    });
                    Gordic.Eko.Grid.Column.addCastka(gf, {
                        name: "c_mena" /* Interface.GSmlskalDtoNames.c_mena */,
                        caption: "jres:33600186" //RC 33600186 : Částka v měně
                    });
                    Gordic.Eko.Grid.Column.addCastkaCZK(gf, {
                        name: "c" /* Interface.GSmlskalDtoNames.c */,
                    });
                    gf.addDateColumn({
                        name: "dat_od" /* Interface.GSmlskalDtoNames.dat_od */,
                        caption: "jres:33600187", //RC 33600187 : Platnost od
                        width: 100
                    }).addDateColumn({
                        name: "dat_do" /* Interface.GSmlskalDtoNames.dat_do */,
                        caption: "jres:33600188", //RC 33600188 : Platnost do
                        width: 100
                    }).addNumberColumn({
                        name: "rok_sml" /* Interface.GSmlskalDtoNames.rok_sml */,
                        caption: "jres:33600189", //RC 33600189 : Období položky FP
                        width: 60
                    }).addNumberColumn({
                        name: "cislo_sml" /* Interface.GSmlskalDtoNames.cislo_sml */,
                        caption: "jres:33600190", //RC 33600190 : Číslo položky FP
                        width: 60
                    }).addNumberColumn({
                        name: "num_poh" /* Interface.GSmlskalDtoNames.num_poh */,
                        caption: "jres:33600191", //RC 33600191 : # žádostí
                        width: 60
                    }).addNumberColumn({
                        name: "aktivita" /* Interface.GSmlskalDtoNames.aktivita */,
                        hidden: true
                    });
                    return gf;
                }
            };
            GSmlPlatebKalOdb = __decorate([
                Decorators.gcontent
            ], GSmlPlatebKalOdb);
            WebClient.GSmlPlatebKalOdb = GSmlPlatebKalOdb;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBsYXRlYkthbE9kYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxQbGF0ZWJLYWxPZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0ErTWY7QUEvTUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK01uQjtJQS9NZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK003QjtRQS9Nb0IsV0FBQSxTQUFTO1lBUzFCLCtDQUErQztZQUUvQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFZOUMsT0FBTztvQkFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRUQsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ2xDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixPQUFPLElBQUEsT0FBTyxDQUFDLGtCQUFrQixDQUFDO29DQUM5QixhQUFhLEVBQUUsSUFBSTtvQ0FDbkIsR0FBRyxFQUFFO3dDQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt3Q0FDbkIsT0FBTyxFQUFFLElBQUk7cUNBQ2hCO29DQUNELFdBQVcsRUFBRSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWU7aUNBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQ0FDZixJQUFJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzt3Q0FDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0NBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29DQUM5QyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQ2pELElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztvQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FBQyxDQUFDO2dDQUV0RSxPQUFPLElBQUEsT0FBTyxDQUFDLGtCQUFrQixDQUFDO29DQUM5QixhQUFhLEVBQUUsSUFBSTtvQ0FDbkIsR0FBRyxFQUFFO3dDQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt3Q0FDbkIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7cUNBQ3hCO29DQUNELFdBQVcsRUFBRSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWU7aUNBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQ0FDZixJQUFJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzt3Q0FDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0NBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29DQUM5QyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQseUJBQXlCO2dCQUNqQixhQUFhO29CQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFFRCw2Q0FBNkM7Z0JBQ3JDLFVBQVU7b0JBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO3lCQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsS0FBSyxDQUF3Qjt3QkFDMUIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFtQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQ3ZJOzRCQUNJLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNqQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFtRCxDQUFDO2dDQUNuRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0NBQzNFLE9BQU8sSUFBSSxDQUFDOzRCQUNoQixDQUFDOzRCQUNELEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDOzRCQUN6QyxVQUFVLEVBQUU7Z0NBQ1IsbUJBQW1CLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzZCQUMxRTt5QkFDSixDQUFDO3dCQUNOLGNBQWMsRUFBRTs0QkFDWixXQUFXLEVBQUU7Z0NBQ1Q7b0NBQ0ksT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLDJDQUFpQyxFQUFFLCtDQUErQztvQ0FDakksSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRztpQ0FDOUQ7Z0NBQ0Q7b0NBQ0ksT0FBTyxFQUFFLGNBQWMsRUFBRSwrR0FBK0c7b0NBQ3hJLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUk7aUNBQy9EOzZCQUNKO3lCQUNKO3dCQUNELGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7d0JBQ3JDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ2hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDbkIsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFDLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzNDLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxnQkFBZ0I7b0JBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFdEMsRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDZixJQUFJLDBEQUF1Qzt3QkFDM0MsT0FBTyxFQUFFLEdBQUc7d0JBQ1osS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDLGFBQWEsQ0FBQzt3QkFDYixJQUFJLGtFQUEyQzt3QkFDL0MsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7cUJBQ3RELENBQUMsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSw0REFBd0M7d0JBQzVDLEtBQUssRUFBRSxHQUFHO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3FCQUN0RCxDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUNiLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsNkJBQTZCO3dCQUN2RCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUseUNBQXlDO3FCQUMxRCxDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUNiLElBQUksNERBQXdDO3dCQUM1QyxLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLGtDQUFrQztxQkFDL0QsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO3dCQUNoQyxJQUFJLGdEQUFrQzt3QkFDdEMsT0FBTyxFQUFFLGVBQWUsQ0FBQyw0QkFBNEI7cUJBQ3hELENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTt3QkFDakMsSUFBSSxrREFBbUM7d0JBQ3ZDLE9BQU8sRUFBRSxlQUFlLENBQUMsNkJBQTZCO3FCQUN6RCxDQUFDLENBQUE7b0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUU7d0JBQ3BDLElBQUksd0NBQThCO3FCQUNyQyxDQUFDLENBQUM7b0JBQ0gsRUFBRSxDQUFDLGFBQWEsQ0FBQzt3QkFDYixJQUFJLGtEQUFtQzt3QkFDdkMsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxrREFBbUM7d0JBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCO3dCQUNyRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUMsZUFBZSxDQUFDO3dCQUNmLElBQUksb0RBQW9DO3dCQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLGlDQUFpQzt3QkFDM0QsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDLGVBQWUsQ0FBQzt3QkFDZixJQUFJLHdEQUFzQzt3QkFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7d0JBQzFELEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSxvREFBb0M7d0JBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUMsZUFBZSxDQUFDO3dCQUNmLElBQUksc0RBQXFDO3dCQUN6QyxNQUFNLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7b0JBRUgsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQzthQUNKLENBQUE7WUFuTVksZ0JBQWdCO2dCQUQ1QixVQUFVLENBQUMsUUFBUTtlQUNQLGdCQUFnQixDQW1NNUI7WUFuTVksMEJBQWdCLG1CQW1NNUIsQ0FBQTtRQUNMLENBQUMsRUEvTW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQStNN0I7SUFBRCxDQUFDLEVBL01nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErTW5CO0FBQUQsQ0FBQyxFQS9NUyxNQUFNLEtBQU4sTUFBTSxRQStNZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFBsYXRlYkthbE9kYi50cyAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBQbGF0ZWJuw60ga2FsZW5kw6HFmSBvZGLEm3JhdGVsc2vDvWNoIGRva2xhZMWvICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTAzLTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxQbGF0ZWJLYWxPZGJEbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgc21scGlkOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0byxcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxQbGF0ZWJLYWxPZGJEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgY2hhbmdlZDogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBQbGF0ZWJuw60ga2FsZW5kw6HFmSBvZGLEm3JhdGVsc2vDvWNoIGRva2xhZMWvICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTbWxQbGF0ZWJLYWxPZGIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBDZWxrb3bDvSByZWNvcmQgLSBkb2tsYWQgKyBwxZnDrXBhZCAqL1xyXG4gICAgICAgIHB1YmxpYyBzbWxwaWQ6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvO1xyXG5cclxuICAgICAgICAvKiogQWt0dcOhbG7EmyBuYcSNdGVuw6kgc2VydmljZSBwZXJtaXNzaW9ucyAqL1xyXG4gICAgICAgIHByaXZhdGUgc2VydmljZVBlcm1pc3Npb25zOiBJbnRlcmZhY2UuR1NtbHNrYWxQZXJtaXNzaW9ucztcclxuICAgICAgICAvKiogSGxhdm7DrSBncmlkIHNlIHNlem5hbWVtIHBsYXRlYm7DrWhvIGthbGVuZMOhxZllICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgLyoqIFDFmcOtem5haywgemRhIGRvxaFsbyBrZSB6bcSbbsSbIHYgcsOhbWNpIGNvbnRlbnR1Ki9cclxuICAgICAgICBwcml2YXRlIGNoYW5nZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERpYWxvZ3MuR1NtbFBsYXRiS2FsUG9oRGxnKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxwaWQ6IHRoaXMuc21scGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtbHNrYWw6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChyZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPz8gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDEpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdTbWxQbGF0YkthbFBvaERsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21scGlkOiB0aGlzLnNtbHBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxza2FsOiBzZWxlY3Rpb25bMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChyZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPz8gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5KlwiLCBcImFjdERldGFpbCpcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gc2V6bmFtdSBwbGF0ZWJuw61obyBrYWxlbmTDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdTbWxza2FsRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuU21sLkludGVyZmFjZS5HU21sc2thbER0bz4odGhpcy5pc2wuU21sc2thbC5saXN0T2RiKHsgZmlsdGVyczogeyBpeHBfc21sX3ByaTogdGhpcy5zbWxwaWQuaXhwX3NtbF9wcmkgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNwb25zZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucyA9IGRhdGEuc2VydmljZVBlcm1pc3Npb25zIGFzIEludGVyZmFjZS5HU21sc2thbFBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5Py51cGRhdGVQZXJtaXNzaW9uKHRoaXMuc2VydmljZVBlcm1pc3Npb25zLCBcIkx6ZU5vdnlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIiwgXCJjaXNfcGxhdGJ5XCIsIFwiaXhwX3NtbF9wcmlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzb3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkZyYWdtZW50czogbmV3IEdvcmRpYy5EYXRhLkZyYWdtZW50TWFuYWdlcihbXCJQZXJtaXNzaW9ucy4qXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFN0cmluZy5Gb3JtYXQoXCJFUVVBTFMoQGFrdGl2aXRhLCB7MH0pXCIsIEludGVyZmFjZS5Ba3Rpdml0YS5uZ19ha3ROb0FrdCksIC8vMzU2LjIwIDMwLjAzLjA3IC0gb2JhcnZlbsOtIHN0b3Jub3ZhbsOpaG8gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQG51bV9wb2ggPiAwXCIsIC8vMzU2LjExIDIwLjExLjA2IC0gb2JhcnbDrW0gxZnDoWRreSwga3RlcsOpIGppxb4gbWFqw60gemFsb8W+ZW5vdSDFvsOhZG9zdCAtIHYgblJvdyBqZSDEjcOtc2xvIG8gamVkbnUgdnnFocWhw60gbmXFviB2IGxQYXJhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5jb3VudCA9PSAxICYmIG9iai5nZXRTZWxlY3Rpb24oKS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBwcm8gaGxhdm7DrSBncmlkXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuY2lzX3BsYXRieSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMua3RnX3BsYXRieV90eHQsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTgyXCIsIC8vUkMgMzM2MDAxODIgOiBLYXRlZ29yaWVcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxODNcIiwgLy9SQyAzMzYwMDE4MyA6IE9kYsSbcmF0ZWxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X2NpXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNjRcIiwgLy9SQyAzMzYwMDE2NCA6IEJhbmtvdm7DrSDDusSNZXRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IFwie2J1X2NpOnRyaW06ZW5jb2RlfS97c2tfY2k6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuaXhzX3N0ZV90eHQsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTg0XCIsIC8vUkMgMzM2MDAxODQgOiDFoGFibG9uYSBvYmplZG7DoXZreVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQb3BpcyhnZiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxODVcIiAvL1JDIDMzNjAwMTg1IDogUG9waXMgcGxhdGJ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYShnZiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTg2XCIgLy9SQyAzMzYwMDE4NiA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkQ2FzdGthQ1pLKGdmLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5kYXRfb2QsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxODdcIiwgLy9SQyAzMzYwMDE4NyA6IFBsYXRub3N0IG9kXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuZGF0X2RvLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTg4XCIsIC8vUkMgMzM2MDAxODggOiBQbGF0bm9zdCBkb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMucm9rX3NtbCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDE4OVwiLCAvL1JDIDMzNjAwMTg5IDogT2Jkb2LDrSBwb2xvxb5reSBGUFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXHJcbiAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5jaXNsb19zbWwsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxOTBcIiwgLy9SQyAzMzYwMDE5MCA6IMSMw61zbG8gcG9sb8W+a3kgRlBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMubnVtX3BvaCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDE5MVwiLCAvL1JDIDMzNjAwMTkxIDogIyDFvsOhZG9zdMOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcclxuICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmFrdGl2aXRhLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==