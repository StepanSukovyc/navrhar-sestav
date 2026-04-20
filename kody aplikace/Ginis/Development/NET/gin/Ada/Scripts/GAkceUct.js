"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceUct.js                                                        </Name>
//    <Description> GAkceUct                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAkceUct = class GAkceUct extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", icon: "gi-detail",
                            enabled: true,
                            run: () => {
                                var a_agenda = 0;
                                if (this.globals.Parametr_Zobrazeni_AG_Detailu_UCT) {
                                    a_agenda = 40;
                                }
                                if (a_agenda > 0) {
                                    Gordic.WebApp.Utility.openApp({
                                        ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                                        ixx2: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        ixx3: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        typAg: 40, // typ agendy cílového objektu (nepovinné)
                                        faze: null, // fáze požadovaná pro otevření cílového objektu (nepovinné)
                                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné)
                                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                                    ).fail(() => {
                                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(undefined, { SimpleMode: true, DetailDto: { ixp: that.row.ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                                    });
                                }
                            }
                        }
                    });
                    this.filter_akce.typ = "UCT";
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_UCT) {
                        this.actions.actDetail?.enabled(true);
                        this.actions.actDetail?.visible(true);
                    }
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        cellActivate(ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 40, data: that.row });
                            }
                        },
                        defaultAction: that.actions.actDetail,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run(ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //        ////Gordic.Eko.Dialogs.GVazby(that, { InputDto: { ixp: that.row.ixp!, drd: 0, ktg_typ: that.row.ktg_typ! } }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                        //        //// //GDlg.showWindow("Gordic.Uct.WebClient.GUctDetailDokladu", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                        //        //// otevření nové záložky
                        //        //Gordic.WebApp.Utility.openApp(
                        //        //    {
                        //        //        ixx1: "KUZLP00Y4RZ1", // id cílového objektu v nově otevírané záložce
                        //        //        ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //        //        ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //        //        typAg: 330,  // typ agendy cílového objektu (nepovinné)
                        //        //        faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //        //        banCurrentApp: false, // příznak zákazu použití aktuální fáze (nepovinné)
                        //        //        noAppFail: false  // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //        //    },
                        //        //    "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //        //);                        }
                        //        //Gordic.Eko.Dialogs.GVazby(that, { InputDto: { ixp: that.row.ixp!, drd: 0, ktg_typ: that.row.ktg_typ! } }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                        //        // //GDlg.showWindow("Gordic.Uct.WebClient.GUctDetailDokladu", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                        //        // otevření nové záložky
                        //        Gordic.WebApp.Utility.openApp(
                        //            {
                        //                ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                        //                ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                typAg: 40,  // typ agendy cílového objektu (nepovinné)
                        //                faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //                banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        //                noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //            },
                        //            "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //        ).fail(() => {
                        //            Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: that.row.ixp! } }, Global.Enums.ModOtevreni.auto);
                        //        });
                        //    }
                        //}),
                        searchColumns: ["ac"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "ixp",
                            caption: "PID",
                            width: 130
                        })
                            .addTextColumn({
                            name: "ktg_typ_txt",
                            caption: "Typ dokladu",
                            width: 200
                        })
                            .addTextColumn({
                            name: "ac",
                            caption: "Agendové číslo",
                            width: 130
                        })
                            .addCurrencyColumn({
                            name: "c",
                            caption: "Částka",
                            width: 150
                        })
                            .addTextColumn({
                            name: "popis",
                            caption: "Popis",
                            width: 300
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyUCTAkce({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    //var view = new Gordic.Data.View(datauct);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceUct = __decorate([
                gcontent
            ], GAkceUct);
            WebClient.GAkceUct = GAkceUct;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VVY3QuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FrY2VVY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FvS2Y7QUFwS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0tuQjtJQXBLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb0s3QjtRQXBLb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFVdEMsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRTVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVzs0QkFDcEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0NBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO29DQUNqRCxRQUFRLEdBQUcsRUFBRSxDQUFDO2dDQUNsQixDQUFDO2dDQUVELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO29DQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDekI7d0NBQ0ksSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLCtDQUErQzt3Q0FDbkUsSUFBSSxFQUFFLElBQUksRUFBRyxrRUFBa0U7d0NBQy9FLElBQUksRUFBRSxJQUFJLEVBQUcsa0VBQWtFO3dDQUMvRSxLQUFLLEVBQUUsRUFBRSxFQUFHLDBDQUEwQzt3Q0FDdEQsSUFBSSxFQUFFLElBQUksRUFBRyw0REFBNEQ7d0NBQ3pFLGFBQWEsRUFBRSxJQUFJLEVBQUUsbURBQW1EO3dDQUN4RSxTQUFTLEVBQUUsS0FBSyxDQUFDLGtFQUFrRTtxQ0FDdEYsRUFDRCxZQUFZLENBQVksaURBQWlEO3FDQUM1RSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0NBQ1IsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLFNBQWdDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUksRUFBRSxFQUFFLEVBQUUsT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDL0osQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKO3FCQUVKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7b0JBRTdCLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO3dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsQ0FBQztvQkFHRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUN2Qix3QkFBd0I7eUJBQ3ZCLFFBQVEsQ0FBQyxRQUFRLENBQUM7eUJBQ2xCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBRWxCLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRzs0QkFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUN6QyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7Z0NBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQ2xGLENBQUM7d0JBQ0wsQ0FBQzt3QkFFRCxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO3dCQUVyQyw4QkFBOEI7d0JBQzlCLGlDQUFpQzt3QkFDakMsb0JBQW9CO3dCQUNwQixnRkFBZ0Y7d0JBRWhGLDhLQUE4Szt3QkFDOUssNklBQTZJO3dCQUM3SSxvQ0FBb0M7d0JBQ3BDLDBDQUEwQzt3QkFDMUMsaUJBQWlCO3dCQUNqQix5RkFBeUY7d0JBQ3pGLG1HQUFtRzt3QkFDbkcsbUdBQW1HO3dCQUNuRywyRUFBMkU7d0JBQzNFLDZGQUE2Rjt3QkFDN0YsNkZBQTZGO3dCQUM3Rix5R0FBeUc7d0JBQ3pHLGtCQUFrQjt3QkFDbEIseUZBQXlGO3dCQUN6Rix1Q0FBdUM7d0JBRXZDLDRLQUE0Szt3QkFDNUssMklBQTJJO3dCQUMzSSxrQ0FBa0M7d0JBQ2xDLHdDQUF3Qzt3QkFDeEMsZUFBZTt3QkFDZixxRkFBcUY7d0JBQ3JGLGlHQUFpRzt3QkFDakcsaUdBQWlHO3dCQUNqRyx3RUFBd0U7d0JBQ3hFLDJGQUEyRjt3QkFDM0YsMEZBQTBGO3dCQUMxRixzR0FBc0c7d0JBQ3RHLGdCQUFnQjt3QkFDaEIsdUZBQXVGO3dCQUN2Rix3QkFBd0I7d0JBQ3hCLHVKQUF1Sjt3QkFDdkosYUFBYTt3QkFDYixPQUFPO3dCQUNQLEtBQUs7d0JBRUwsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDO3dCQUNyQixPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTs2QkFDaEMsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxLQUFLOzRCQUNYLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEtBQUssRUFBRSxHQUFHO3lCQUNiLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxhQUFhOzRCQUNuQixPQUFPLEVBQUUsYUFBYTs0QkFDdEIsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLElBQUk7NEJBQ1YsT0FBTyxFQUFFLGdCQUFnQjs0QkFDekIsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxpQkFBaUIsQ0FBQzs0QkFDZixJQUFJLEVBQUUsR0FBRzs0QkFDVCxPQUFPLEVBQUUsUUFBUTs0QkFDakIsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLE9BQU87NEJBQ2IsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLEtBQUssRUFBRSxHQUFHO3lCQUNiLENBQUM7cUJBQ1QsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVyRyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRTNDLDJDQUEyQztvQkFDM0MscUNBQXFDO2dCQUV6QyxDQUFDO2FBQ0osQ0FBQTtZQS9KWSxRQUFRO2dCQURwQixRQUFRO2VBQ0ksUUFBUSxDQStKcEI7WUEvSlksa0JBQVEsV0ErSnBCLENBQUE7UUFDTCxDQUFDLEVBcEtvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvSzdCO0lBQUQsQ0FBQyxFQXBLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0tuQjtBQUFELENBQUMsRUFwS1MsTUFBTSxLQUFOLE1BQU0sUUFvS2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VVY3QuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZVVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VVY3QgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsdWN0OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HVWN0c3BpZERva2xhZHlEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdVY3RzcGlkRG9rbGFkeUR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgcm93OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HVWN0c3BpZERva2xhZHlEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HVWN0c3BpZERva2xhZHlEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGF1Y3QgPSB0aGlzLm1vZGVsdWN0O1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLCBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhX2FnZW5kYSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfVUNUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhX2FnZW5kYSA9IDQwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYV9hZ2VuZGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDI6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgzOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwQWc6IDQwLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9BcHBGYWlsOiBmYWxzZSAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5EaWFsb2dzLkRldGFpbERva3VtZW50dVNwaXN1KHVuZGVmaW5lZCBhcyB1bmtub3duIGFzIEdDb250ZW50LCB7IFNpbXBsZU1vZGU6IHRydWUsIERldGFpbER0bzogeyBpeHA6IHRoYXQucm93Lml4cCEgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJfYWtjZS50eXAgPSBcIlVDVFwiO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdERldGFpbCpcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X1VDVCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcImFkYXN1YmdyaWRyb3dzZWxlY3RlZFwiLCB7IGFnZW5kYTogNDAsIGRhdGE6IHRoYXQucm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8vL0dvcmRpYy5Fa28uRGlhbG9ncy5HVmF6YnkodGhhdCwgeyBJbnB1dER0bzogeyBpeHA6IHRoYXQucm93Lml4cCEsIGRyZDogMCwga3RnX3R5cDogdGhhdC5yb3cua3RnX3R5cCEgfSB9LCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8vLyAvL0dEbGcuc2hvd1dpbmRvdyhcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxEb2tsYWR1XCIsIHsgSXhwOiByb3cuaXhwIH0sIFwiXCIsIDgwMCwgNjAwLCB0cnVlKTsgLy96b2JyYXplbmkgZGFsc2lobyBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vLy8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9Hb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICAgICAgaXh4MTogXCJLVVpMUDAwWTRSWjFcIiwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBpeHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIGl4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICAgICAgdHlwQWc6IDMzMCwgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICAgICAgZmF6ZTogbnVsbCwgIC8vIGbDoXplIHBvxb5hZG92YW7DoSBwcm8gb3RldsWZZW7DrSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBiYW5DdXJyZW50QXBwOiBmYWxzZSwgLy8gcMWZw616bmFrIHrDoWthenUgcG91xb5pdMOtIGFrdHXDoWxuw60gZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBub0FwcEZhaWw6IGZhbHNlICAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKSBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vKTsgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL0dvcmRpYy5Fa28uRGlhbG9ncy5HVmF6YnkodGhhdCwgeyBJbnB1dER0bzogeyBpeHA6IHRoYXQucm93Lml4cCEsIGRyZDogMCwga3RnX3R5cDogdGhhdC5yb3cua3RnX3R5cCEgfSB9LCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gLy9HRGxnLnNob3dXaW5kb3coXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsRG9rbGFkdVwiLCB7IEl4cDogcm93Lml4cCB9LCBcIlwiLCA4MDAsIDYwMCwgdHJ1ZSk7IC8vem9icmF6ZW5pIGRhbHNpaG8gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpeHgxOiB0aGF0LnJvdy5peHAsIC8vIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IG5vdsSbIG90ZXbDrXJhbsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4eDI6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHR5cEFnOiA0MCwgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJhbkN1cnJlbnRBcHA6IHRydWUsIC8vIHDFmcOtem5hayB6w6FrYXp1IHBvdcW+aXTDrSBha3R1w6FsbsOtIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSkgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh0aGlzLnBhcmVudENudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3R5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVHlwIGRva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFnZW5kb3bDqSDEjcOtc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCLEjMOhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZS5saXN0RG9rbGFkeVVDVEFrY2UoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGF1Y3QpO1xyXG4gICAgICAgICAgICAvLyRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==