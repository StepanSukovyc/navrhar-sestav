"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokHromadnePredaniPpdTab = class GPokHromadnePredaniPpdTab extends Gordic.GContentBase {
                onContentReady() {
                    this.title = "Předání do PPD";
                    var that = this;
                    const gridActionDetail = new GAction($.extend(true, Gordic.Eko.Action.actionDetail({
                        run: function (ev, ctx) {
                            let row = "";
                            //otevření z gridu
                            if (ctx.cellInfo) {
                                row = ctx.cellInfo.data.ixp;
                            }
                            //otevření z akce v menuBaru
                            if (row == "") {
                                row = ctx.getGrid().ggrid("getSelection")[0].ixp;
                            }
                            if (row != "") {
                                that.navigate("Gordic.Pok.WebClient.GPokDetailDokladuTab", {
                                    ixp: row,
                                    newPodani: false,
                                    Id: "GPokDetailDokladu#"
                                });
                            }
                        },
                        enabled: true
                    }), { name: "actDetail" }));
                    this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: "",
                        gridFormat: Gordic.Pok.WebClient.GPokWebBase.CreateGridFormatHromadne(),
                        keys: "ixp",
                        data: this.pokDoklady,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            data.forEach(element => {
                                element["wiz_check"] = true; // nastavím element zatržení
                            });
                            return $.Deferred().resolve({ result: data }).promise();
                        },
                        firstStep: {
                            title: "Zadání",
                            description: "Akce provede předání vybraných dokladů do PPD",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            form: new Gordic.Forms.Form({ name: "formDlg2", layoutDescriptor: "L2M2S1, L-2-10-0, M-12-12-0, S-12-12-0" })
                                .addRow("Kniha")
                                .addField("gselectbox", Gordic.Prefabs.Select.poksden(), {
                                dropdown: false,
                                name: "ixp_den",
                                validators: [new Gordic.Validators.Required()],
                                serverFilters: {
                                    ico: that.gpc.ico,
                                    ucs: that.gpc.ucs,
                                    rok: that.gpc.rok,
                                    ixs_vpk: that.pokKniha.ixs_vpk,
                                    mena: that.pokKniha.mena
                                }
                            })
                                .addRow("Cíl")
                                .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                name: "referent",
                                validators: [new Gordic.Validators.Required()],
                                serverFilters: {
                                    aktivita: 100,
                                    VrfuIxpDen: that.pokKniha.ixp_den,
                                    VrfuTypAg: "pok",
                                    DlePovolenychFazi: that.faze,
                                    VrfuAktivita: 100,
                                    VrfuSubrada: that.subrada
                                }
                            }),
                            checkAction: (model, data) => {
                                var view = new Gordic.Data.View(data, { key: "ixp" });
                                var ixpArray = data.map(function (d) { return d.ixp; });
                                let i = 0;
                                let def = $.Deferred();
                                ixpArray.forEach(function (x) {
                                    that.isl.PokDoklad.seznamPermissions(rq => { return { ixp: x }; }).get()
                                        .done(function (data) {
                                        view.getDataRows(true).forEach(function (meta) {
                                            if (meta.data.ixp === x) {
                                                i = i + 1;
                                                meta.data.wiz_kind = data.LzePredatDoPpd.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = data.LzePredatDoPpd.message;
                                                meta.data.wiz_check = data.LzePredatDoPpd.value;
                                            }
                                            if (i == ixpArray.length) {
                                                def.resolve(view);
                                            }
                                        });
                                    })
                                        .fail(function (xhr, type, vobj) {
                                        view.getDataRows(true).forEach(function (meta) {
                                            vobj.handled = true;
                                            if (meta.data.ixp === x) {
                                                i = i + 1;
                                                meta.data.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = vobj.baseMessage;
                                                meta.data.wiz_check = false;
                                            }
                                            if (i == ixpArray.length) {
                                                def.resolve(view);
                                            }
                                        });
                                    });
                                });
                                return def.promise();
                            },
                            nextActionName: "Předat",
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                let y = 0;
                                if (data.length == 0)
                                    def.resolve(data);
                                data.forEach(function (row) {
                                    that.isl.PokDoklad.predatDoPpd(rq => {
                                        return {
                                            ixp: row.ixp,
                                            ixsFunPrijemce: model.erferent.ixs_fun_akt,
                                            ixsSuPrijemce: model.referent.ixs_su,
                                            ixpDen: model.ixp_den.ixp_den,
                                            dotaz: true
                                        };
                                    })
                                        .get()
                                        .done(function () {
                                        row.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                        row.wiz_txt_err = "Doklad byl úspěšně předán!";
                                    })
                                        .fail(function (xhr, type, vobj) {
                                        if (type === "exception") {
                                            if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                                vobj.handled = true;
                                                row.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                row.wiz_txt_err = vobj.baseMessage;
                                            }
                                            else if (vobj.data.member) {
                                                if (vobj.data.member == "dotaz") {
                                                    //question
                                                    vobj.handled = true;
                                                    row.wiz_kind = 206 /* Gordic.Isl.GOperationResultKind.Warning */;
                                                    row.wiz_txt_err = vobj.baseMessage;
                                                }
                                            }
                                            else {
                                                vobj.handled = true;
                                                row.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                row.wiz_txt_err = vobj.baseMessage;
                                            }
                                        }
                                    })
                                        .always(function () {
                                        y = y + 1;
                                        if (y == data.length) {
                                            def.resolve(data);
                                        }
                                    });
                                });
                                return def.promise();
                            },
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        lastStep: {
                            title: "Výsledek",
                            gridTabTitle: "Seznam předaných dokladů do PPD",
                            description: "Výsledek hromadného předání dokladů do PPD",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné předání do PPD" });
                }
            };
            GPokHromadnePredaniPpdTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePredaniPpdTab);
            WebClient.GPokHromadnePredaniPpdTab = GPokHromadnePredaniPpdTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJlZGFuaVBwZFRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tIcm9tYWRuZVByZWRhbmlQcGRUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDJEQUEyRDtBQUMzRCxJQUFVLE1BQU0sQ0FtUGY7QUFuUEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbVBuQjtJQW5QZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbVA3QjtRQW5Qb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsT0FBQSxZQUFZO2dCQU92RCxjQUFjO29CQUVWLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7b0JBRTlCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFHaEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQy9FLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7NEJBQ3JCLGtCQUFrQjs0QkFDbEIsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEMsQ0FBQzs0QkFFRCw0QkFBNEI7NEJBQzVCLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs0QkFDckQsQ0FBQzs0QkFFRCxJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDWixJQUFJLENBQUMsUUFBUSxDQUFDLDJDQUEyQyxFQUFFO29DQUN2RCxHQUFHLEVBQUUsR0FBRztvQ0FDUixTQUFTLEVBQUUsS0FBSztvQ0FDaEIsRUFBRSxFQUFFLG9CQUFvQjtpQ0FDM0IsQ0FBQyxDQUFDOzRCQUNQLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxPQUFPLEVBQUUsSUFBSTtxQkFDaEIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFHM0IsSUFBSSxDQUFDLFFBQVEsQ0FBNEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFO3dCQUM1SCxLQUFLLEVBQUUsRUFBRTt3QkFDVCxVQUFVLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFO3dCQUN2RSxJQUFJLEVBQUUsS0FBSzt3QkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7d0JBQ3JCLGFBQWEsRUFBRSxLQUFLO3dCQUNwQixjQUFjLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQ0FDbkIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUE0RCw0QkFBNEI7NEJBQ3hILENBQUMsQ0FBQyxDQUFDOzRCQUNILE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1RCxDQUFDO3dCQUNELFNBQVMsRUFBRTs0QkFDUCxLQUFLLEVBQUUsUUFBUTs0QkFDZixXQUFXLEVBQUUsK0NBQStDOzRCQUM1RCxZQUFZLEVBQUUsMEJBQTBCOzRCQUN4QyxhQUFhLEVBQUUsZ0JBQWdCOzRCQUMvQixJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQztpQ0FDeEcsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQ0FDZixRQUFRLENBQUMsWUFBWSxFQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFDL0I7Z0NBQ0ksUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUM5QyxhQUFhLEVBQUU7b0NBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztvQ0FDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztvQ0FDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztvQ0FDOUIsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtpQ0FDM0I7NkJBQ0osQ0FBQztpQ0FDTCxNQUFNLENBQUMsS0FBSyxDQUFDO2lDQUNiLFFBQVEsQ0FBQyxZQUFZLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUMvQjtnQ0FDSSxJQUFJLEVBQUUsVUFBVTtnQ0FDaEIsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUM5QyxhQUFhLEVBQUU7b0NBQ1gsUUFBUSxFQUFFLEdBQUc7b0NBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztvQ0FDakMsU0FBUyxFQUFFLEtBQUs7b0NBQ2hCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJO29DQUM1QixZQUFZLEVBQUUsR0FBRztvQ0FDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPO2lDQUM1Qjs2QkFDSixDQUFDOzRCQUdWLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtnQ0FHekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQ0FDdEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUVWLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FFdkIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0NBRXhCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTt5Q0FDbEUsSUFBSSxDQUFDLFVBQVUsSUFBSTt3Q0FFaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJOzRDQUl6QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dEQUd0QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnREFFVixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLG1EQUF5QyxDQUFDLGdEQUFzQyxDQUFDO2dEQUNqSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztnREFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7NENBQ3BELENBQUM7NENBRUQsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dEQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBOzRDQUNyQixDQUFDO3dDQUNMLENBQUMsQ0FBQyxDQUFDO29DQUVQLENBQUMsQ0FBQzt5Q0FDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUk7d0NBRTNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTs0Q0FDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7NENBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0RBQ3RCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dEQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxrREFBd0MsQ0FBQztnREFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnREFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOzRDQUNoQyxDQUFDOzRDQUVELElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnREFDdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTs0Q0FDckIsQ0FBQzt3Q0FDTCxDQUFDLENBQUMsQ0FBQztvQ0FHUCxDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDLENBQUMsQ0FBQTtnQ0FDRixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDekIsQ0FBQzs0QkFDRCxjQUFjLEVBQUUsUUFBUTs0QkFDeEIsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dDQUV4QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FFVixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztvQ0FDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FHdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUc7b0NBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FDMUIsRUFBRSxDQUFDLEVBQUU7d0NBQ0QsT0FBTzs0Q0FDSCxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUc7NENBQ1osY0FBYyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVzs0Q0FDMUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTs0Q0FDcEMsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTzs0Q0FDN0IsS0FBSyxFQUFFLElBQUk7eUNBRWQsQ0FBQTtvQ0FDTCxDQUFDLENBQUM7eUNBQ0QsR0FBRyxFQUFFO3lDQUNMLElBQUksQ0FBQzt3Q0FDRixHQUFHLENBQUMsUUFBUSxvREFBMEMsQ0FBQzt3Q0FDdkQsR0FBRyxDQUFDLFdBQVcsR0FBRyw0QkFBNEIsQ0FBQztvQ0FDbkQsQ0FBQyxDQUFDO3lDQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTt3Q0FDM0IsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7NENBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyx3Q0FBd0MsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLHdDQUF3QyxFQUFFLENBQUM7Z0RBQ2hJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dEQUNwQixHQUFHLENBQUMsUUFBUSxrREFBd0MsQ0FBQztnREFDckQsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOzRDQUV2QyxDQUFDO2lEQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnREFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztvREFDOUIsVUFBVTtvREFDVixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvREFDcEIsR0FBRyxDQUFDLFFBQVEsb0RBQTBDLENBQUM7b0RBQ3ZELEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnREFFdkMsQ0FBQzs0Q0FDTCxDQUFDO2lEQUNJLENBQUM7Z0RBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0RBQ3BCLEdBQUcsQ0FBQyxRQUFRLGtEQUF3QyxDQUFDO2dEQUNyRCxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7NENBRXZDLENBQUM7d0NBQ0wsQ0FBQztvQ0FDTCxDQUFDLENBQUM7eUNBQ0QsTUFBTSxDQUFDO3dDQUNKLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dDQUVWLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0Q0FDbkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTt3Q0FDckIsQ0FBQztvQ0FDTCxDQUFDLENBQUMsQ0FBQztnQ0FFWCxDQUFDLENBQUMsQ0FBQztnQ0FFSCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFFekIsQ0FBQzs0QkFDRCxXQUFXLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLENBQUM7eUJBQzlEO3dCQUNELFFBQVEsRUFDUjs0QkFDSSxLQUFLLEVBQUUsVUFBVTs0QkFDakIsWUFBWSxFQUFFLGlDQUFpQzs0QkFDL0MsV0FBVyxFQUFFLDRDQUE0Qzs0QkFDekQsYUFBYSxFQUFFLGdCQUFnQjs0QkFDL0IsV0FBVyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3lCQUM5RDt3QkFDRCxnQkFBZ0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUV2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNyQixDQUFDO3dCQUNELGNBQWMsRUFBRSxHQUFHLEVBQUU7NEJBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3RCLENBQUM7cUJBQ0osRUFBRSxFQUFFLEtBQUssRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7Z0JBRTdDLENBQUM7YUFTSixDQUFBO1lBN09ZLHlCQUF5QjtnQkFEckMsVUFBVSxDQUFDLFFBQVE7ZUFDUCx5QkFBeUIsQ0E2T3JDO1lBN09ZLG1DQUF5Qiw0QkE2T3JDLENBQUE7UUFHTCxDQUFDLEVBblBvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtUDdCO0lBQUQsQ0FBQyxFQW5QZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbVBuQjtBQUFELENBQUMsRUFuUFMsTUFBTSxLQUFOLE1BQU0sUUFtUGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0hyb21hZG5lUHJlZGFuaVBwZFRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHBva0Rva2xhZHk6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG9bXTtcclxuICAgICAgICBwcml2YXRlIHBva0tuaWhhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBzdWJyYWRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBmYXplOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUMWZZWTDoW7DrSBkbyBQUERcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkQWN0aW9uRGV0YWlsID0gbmV3IEdBY3Rpb24oJC5leHRlbmQodHJ1ZSwgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguY2VsbEluZm8uZGF0YS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBha2NlIHYgbWVudUJhcnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmdldEdyaWQoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBcIkdQb2tEZXRhaWxEb2tsYWR1I1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLCB7IG5hbWU6IFwiYWN0RGV0YWlsXCIgfSkpXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJCYXNlLkNyZWF0ZUdyaWRGb3JtYXRIcm9tYWRuZSgpLFxyXG4gICAgICAgICAgICAgICAga2V5czogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucG9rRG9rbGFkeSxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZWxlbWVudCA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hIHbFoWVjaCBkYXRlY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFtcIndpel9jaGVja1wiXSA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2w61tIGVsZW1lbnQgemF0csW+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7IHJlc3VsdDogZGF0YSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiWmFkw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHByb3ZlZGUgcMWZZWTDoW7DrSB2eWJyYW7DvWNoIGRva2xhZMWvIGRvIFBQRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwb2tsYWRuw60gZG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGxnMlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIktuaWhhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5wb2tzZGVuKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuZ3BjLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGF0LmdwYy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5ncGMucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdnBrOiB0aGF0LnBva0tuaWhhLml4c192cGssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmE6IHRoYXQucG9rS25paGEubWVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJDw61sXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZWZlcmVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1SXhwRGVuOiB0aGF0LnBva0tuaWhhLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVUeXBBZzogXCJwb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEZhemk6IHRoYXQuZmF6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVTdWJyYWRhOiB0aGF0LnN1YnJhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHBBcnJheSA9IGRhdGEubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLml4cDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnNlem5hbVBlcm1pc3Npb25zKHJxID0+IHsgcmV0dXJuIHsgaXhwOiB4IH0gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2tpbmQgPSBkYXRhLkx6ZVByZWRhdERvUHBkLnZhbHVlID8gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzIDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSBkYXRhLkx6ZVByZWRhdERvUHBkLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IGRhdGEuTHplUHJlZGF0RG9QcGQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpeHBBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlDFmWVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5wcmVkYXREb1BwZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5QcmlqZW1jZTogbW9kZWwuZXJmZXJlbnQuaXhzX2Z1bl9ha3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNTdVByaWplbWNlOiBtb2RlbC5yZWZlcmVudC5peHNfc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBEZW46IG1vZGVsLml4cF9kZW4uaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdGF6OiB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gXCJEb2tsYWQgYnlsIMO6c3DEm8WhbsSbIHDFmWVkw6FuIVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvYmouYmFzZVR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIiB8fCB2b2JqLmV4Y2VwdGlvblR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZvYmouZGF0YS5tZW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5kYXRhLm1lbWJlciA9PSBcImRvdGF6XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9xdWVzdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLldhcm5pbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0geSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PSBkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW3sgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCB9XSwgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlNlem5hbSBwxZllZGFuw71jaCBkb2tsYWTFryBkbyBQUERcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWw71zbGVkZWsgaHJvbWFkbsOpaG8gcMWZZWTDoW7DrSBkb2tsYWTFryBkbyBQUERcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH1dLCBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LCB7IHRpdGxlOiBcIkhyb21hZG7DqSBwxZllZMOhbsOtIGRvIFBQRFwiIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIl19