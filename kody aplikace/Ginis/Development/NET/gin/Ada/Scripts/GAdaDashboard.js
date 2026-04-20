"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GdaDashBoard.ts                                                        </Name>
//    <Description> GdaDashBoard                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2020-04-11                                                                                      </Created>
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
            const { gcontent } = Decorators;
            let GAdaDashboard = class GAdaDashboard extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    this.loadModuleInfo();
                }
                /** načíst informace o modulu */
                loadModuleInfo() {
                    var cnt = this;
                    var result = [];
                    var result_akce = [];
                    var primaryText = cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Počet pol. plánu" : "Počet akcí";
                    var secondaryText = "CELKEM";
                    var primaryText2 = cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Počet vlastních pol. plánu" : "Počet vlastních akcí";
                    var secondaryText2 = "CELKEM";
                    //var filterDto: Gordic.Ada.Interface.GSeznamAdaFilterDto = {};
                    //this.isl.Akce.list({
                    //    filters: {}
                    //    //,
                    //    //fragments: [""]
                    //})
                    //    .getData()
                    //    .done(function (akce) {
                    //        cnt.PocetAkci = akce.length;
                    //    });
                    //var pocet = cnt.PocetAkci; //cnt.view_ISL.getCount();
                    //var pocet2 = cnt.PocetAkci - 222; //cnt.view_ISL.getCount();
                    //result.push(new GObservableObject({
                    //    name: "kpi_pocet_akci",
                    //    value: pocet, 
                    //    primaryText: primaryText, 
                    //    secondaryText: secondaryText,
                    //}));
                    //result.push(new GObservableObject({
                    //    name: "kpi_pocet_akci_vla",
                    //    value: pocet2,
                    //    primaryText: primaryText2,
                    //    secondaryText: secondaryText2,
                    //}));
                    var secondaryText = this.NazevRef + " | " + this.NazevFun + " | " + "Poslední přihlášení" + ": " + this.DatLoginTxt;
                    result.push(new GObservableObject({
                        name: "moduleInfoItems",
                        //image: "<img class='g-app-launcher__item' style='width:48px;height:48px;' alt='app:GWAADA05.svg' src='gin/gz.ashx?r=app&amp;f=GWAADA05.svg'>",
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GWAADA05"),
                        primaryText: "Administrace akcí",
                        secondaryText: secondaryText,
                    }));
                    this.moduleInfoItems = new Gordic.Data.View([{
                            id: "moduleInfo",
                            //title: "Souhrn",
                            zone: 0,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                            //menuParams: [
                            //    {
                            //        icon: "fa-retweet",
                            //        action: new GAction({
                            //            name: "actRefreshMylnePlatby",
                            //            captionVisible: GAction.captionVisibility.never,
                            //            //caption: "Aktualizovat",
                            //            run: function () {
                            //                //cnt.update(false, true, false);
                            //            }
                            //        })
                            //    }
                            //],
                            defaultSelected: false,
                            data: new Gordic.Data.View(result)
                        }], { key: ["id"] });
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        data: this.moduleInfoItems,
                        layout: "vertical",
                        title: "",
                        zones: 2
                    });
                    // naposledy zmenene akce
                    var Akce_ISL_View = new Gordic.Isl.View(this.isl.AkceHistorie.list_Zobrazene({ filters: {} }), {
                        onResponse: function (response) {
                            response.data = response.data.slice(0, 10).map(function (akce, ii) {
                                return new GObservableObject({
                                    id: ii,
                                    name: "kpiLastUsedAkce" + "_" + ii,
                                    value: "", //akce.nazev_rf,
                                    akce_cislo: akce.cislo,
                                    ixs_pla: akce.ixs_pla,
                                    //primaryText: akce.cislo + " | " + akce.zmena_txt + " | " + akce.nazev_plan + " (" + akce.rok + ")" ,
                                    primaryText: akce.cislo + " | " + akce.zmena_txt + " | " + akce.nazev_plan,
                                    secondaryText: Gordic.Templates.Formatters.datetime(akce.dat_zmena)
                                });
                            });
                            return response;
                        }
                    }).on("change", function () {
                        cnt.gdb_panel.gdashboardpanel("refresh");
                    });
                    var Akce_ISL_View_Kniha = new Gordic.Isl.View(this.isl.AkceHistorie.list_Zobrazene_Kniha({ filters: {} }), {
                        onResponse: function (response) {
                            response.data = response.data.slice(0, 10).map(function (akce, ii) {
                                return new GObservableObject({
                                    id: ii,
                                    name: "kpiLastUsedKniha" + "_" + ii,
                                    value: "", //akce.nazev_rf,
                                    akce_cislo: akce.cislo,
                                    ixs_pla: akce.ixs_pla,
                                    rok: akce.rok,
                                    //primaryText: akce.zmena_txt + " (" + akce.rok + ")",
                                    primaryText: akce.zmena_txt,
                                    secondaryText: Gordic.Templates.Formatters.datetime(akce.dat_zmena)
                                });
                            });
                            return response;
                        }
                    }).on("change", function () {
                        cnt.gdb_panel.gdashboardpanel("refresh");
                    });
                    cnt.lastUsedItems = new Gordic.Data.View([
                        {
                            id: "lastModifiedDocs",
                            title: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Posledně zobrazené pol. plánu" : "Posledně zobrazené akce",
                            zone: 0,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                            defaultSelected: false,
                            defaultAction: new GAction({
                                name: "actLastUsedKnihaClickEnter",
                                run: function (ev, ctx) {
                                    var newGpc = Gordic.Eko.Utils.createBookGpc(cnt.gpc, ctx.item.data.ixs_pla);
                                    //                            var detailwindow = ($.content() as any).navigateTask(
                                    var detailwindow = cnt.navigate(["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: null, gpc: newGpc }], {
                                        id: 'DetailDokladu#',
                                        cislo: ctx.item.data.akce_cislo,
                                        ixs_cia: "",
                                        RezimProvozu: cnt.globals.RezimProvozu,
                                        Editable: cnt.globals.Param_Akce_Editace_TP,
                                        NovaAkce: false
                                    });
                                }
                            }),
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actAkceHistorie",
                                        captionVisible: GAction.captionVisibility.never,
                                        //caption: "Aktualizovat",
                                        run: function () {
                                            Akce_ISL_View.requestData();
                                        }
                                    })
                                }
                            ],
                            data: Akce_ISL_View
                        },
                        {
                            id: "lastModifiedBooks",
                            title: "Posledně použité knihy",
                            zone: 1,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                            defaultSelected: false,
                            defaultAction: new GAction({
                                name: "actLastUsedAkceClickEnter",
                                run: function (ev, ctx) {
                                    //var newGpc = Gordic.Eko.Utils.createBookGpc(cnt.gpc, ctx.item.data.akce_cislo);
                                    var newGpc = Gordic.Eko.Utils.createBookGpc(cnt.gpc, ctx.item.data.ixs_pla);
                                    newGpc.rok = ctx.item.data.rok;
                                    var detailwindow = cnt.navigate(["Gordic.Ada.WebClient.GSeznamAkci", { gridRemoteControl: null, gpc: newGpc }], {
                                        id: 'SeznamDokladu#',
                                        RezimProvozu: cnt.globals.RezimProvozu,
                                        Editable: false,
                                        NovaAkce: false
                                    });
                                }
                            }),
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actAkceHistorieKniha",
                                        captionVisible: GAction.captionVisibility.never,
                                        //caption: "Aktualizovat",
                                        run: function () {
                                            Akce_ISL_View_Kniha.requestData();
                                        }
                                    })
                                }
                            ],
                            data: Akce_ISL_View_Kniha
                        }
                    ], { key: ["id"] });
                    //if (result_akce != null && result_akce.length > 0) {
                    //}
                    cnt.gdb_panel = $("<div>").appendTo(this.element).gdashboardpanel({
                        data: cnt.lastUsedItems,
                        layout: "horizontal",
                        title: "Test",
                        zones: 3
                    });
                    Akce_ISL_View.requestData();
                    Akce_ISL_View_Kniha.requestData();
                }
            };
            GAdaDashboard = __decorate([
                gcontent
            ], GAdaDashboard);
            WebClient.GAdaDashboard = GAdaDashboard;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkYURhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRhRGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBNFBmO0FBNVBELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRQbkI7SUE1UGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRQN0I7UUE1UG9CLFdBQUEsU0FBUztZQUUxQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBR2hDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFFWSxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQW1QckQsQ0FBQztnQkF0T1UsY0FBYztvQkFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMxQixDQUFDO2dCQUVELGdDQUFnQztnQkFDeEIsY0FBYztvQkFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUNmLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxXQUFXLEdBQVUsRUFBRSxDQUFDO29CQUM1QixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksNENBQW1DLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7b0JBQ2xILElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQztvQkFDN0IsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLDRDQUFtQyxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUM7b0JBQ3ZJLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQztvQkFFOUIsK0RBQStEO29CQUUvRCxzQkFBc0I7b0JBQ3RC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LENBQUMsYUFBYTt3QkFDdkIsTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLEtBQUssRUFBRSxNQUFNO3dCQUNiLEtBQUssRUFBRSxDQUFDO3FCQUNYLENBQUMsQ0FBQztvQkFFSCxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzVCLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN0QyxDQUFDO2FBRUosQ0FBQTtZQXJQWSxhQUFhO2dCQUR6QixRQUFRO2VBQ0ksYUFBYSxDQXFQekI7WUFyUFksdUJBQWEsZ0JBcVB6QixDQUFBO1FBRUwsQ0FBQyxFQTVQb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNFA3QjtJQUFELENBQUMsRUE1UGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRQbkI7QUFBRCxDQUFDLEVBNVBTLE1BQU0sS0FBTixNQUFNLFFBNFBmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdkYURhc2hCb2FyZC50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdkYURhc2hCb2FyZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMC0wNC0xMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50e1xyXG5cclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FkYURhc2hib2FyZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2R1bGVJbmZvSXRlbXM6IGFueTtcclxuICAgICAgICBwcml2YXRlIE5hemV2UmVmOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldkZ1bjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgRGF0TG9naW5UeHQ6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIFBvY2V0QWtjaTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbGFzdFVzZWRJdGVtczogR29yZGljLkRhdGEuVmlldztcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIFNlem5hbUFrY2k6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUhpc3RvcmllRHRvPjtcclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZ2RiX3BhbmVsOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTW9kdWxlSW5mbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIG5hxI3DrXN0IGluZm9ybWFjZSBvIG1vZHVsdSAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZE1vZHVsZUluZm8oKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0X2FrY2U6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIHZhciBwcmltYXJ5VGV4dCA9IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJQb8SNZXQgcG9sLiBwbMOhbnVcIiA6IFwiUG/EjWV0IGFrY8OtXCI7XHJcbiAgICAgICAgICAgIHZhciBzZWNvbmRhcnlUZXh0ID0gXCJDRUxLRU1cIjtcclxuICAgICAgICAgICAgdmFyIHByaW1hcnlUZXh0MiA9IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJQb8SNZXQgdmxhc3Ruw61jaCBwb2wuIHBsw6FudVwiIDogXCJQb8SNZXQgdmxhc3Ruw61jaCBha2PDrVwiO1xyXG4gICAgICAgICAgICB2YXIgc2Vjb25kYXJ5VGV4dDIgPSBcIkNFTEtFTVwiO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuaXNsLkFrY2UubGlzdCh7XHJcbiAgICAgICAgICAgIC8vICAgIGZpbHRlcnM6IHt9XHJcbiAgICAgICAgICAgIC8vICAgIC8vLFxyXG4gICAgICAgICAgICAvLyAgICAvL2ZyYWdtZW50czogW1wiXCJdXHJcbiAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLy8gICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoYWtjZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY250LlBvY2V0QWtjaSA9IGFrY2UubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBvY2V0ID0gY250LlBvY2V0QWtjaTsgLy9jbnQudmlld19JU0wuZ2V0Q291bnQoKTtcclxuICAgICAgICAgICAgLy92YXIgcG9jZXQyID0gY250LlBvY2V0QWtjaSAtIDIyMjsgLy9jbnQudmlld19JU0wuZ2V0Q291bnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJrcGlfcG9jZXRfYWtjaVwiLFxyXG4gICAgICAgICAgICAvLyAgICB2YWx1ZTogcG9jZXQsIFxyXG4gICAgICAgICAgICAvLyAgICBwcmltYXJ5VGV4dDogcHJpbWFyeVRleHQsIFxyXG4gICAgICAgICAgICAvLyAgICBzZWNvbmRhcnlUZXh0OiBzZWNvbmRhcnlUZXh0LFxyXG4gICAgICAgICAgICAvL30pKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJrcGlfcG9jZXRfYWtjaV92bGFcIixcclxuICAgICAgICAgICAgLy8gICAgdmFsdWU6IHBvY2V0MixcclxuICAgICAgICAgICAgLy8gICAgcHJpbWFyeVRleHQ6IHByaW1hcnlUZXh0MixcclxuICAgICAgICAgICAgLy8gICAgc2Vjb25kYXJ5VGV4dDogc2Vjb25kYXJ5VGV4dDIsXHJcbiAgICAgICAgICAgIC8vfSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlY29uZGFyeVRleHQgPSB0aGlzLk5hemV2UmVmICsgXCIgfCBcIiArIHRoaXMuTmF6ZXZGdW4gKyBcIiB8IFwiICsgXCJQb3NsZWRuw60gcMWZaWhsw6HFoWVuw61cIiArIFwiOiBcIiArIHRoaXMuRGF0TG9naW5UeHQ7IFxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kdWxlSW5mb0l0ZW1zXCIsXHJcbiAgICAgICAgICAgICAgICAvL2ltYWdlOiBcIjxpbWcgY2xhc3M9J2ctYXBwLWxhdW5jaGVyX19pdGVtJyBzdHlsZT0nd2lkdGg6NDhweDtoZWlnaHQ6NDhweDsnIGFsdD0nYXBwOkdXQUFEQTA1LnN2Zycgc3JjPSdnaW4vZ3ouYXNoeD9yPWFwcCZhbXA7Zj1HV0FBREEwNS5zdmcnPlwiLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IEdvcmRpYy5VdGlscy5JY29uQnVpbGRlci5kZWZhdWx0SW5zdC5jcmVhdGVNb2R1bGVJY29uKFwiR1dBQURBMDVcIiksXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogXCJBZG1pbmlzdHJhY2UgYWtjw61cIiwgXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBzZWNvbmRhcnlUZXh0LFxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZUluZm9JdGVtcyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJtb2R1bGVJbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvL3RpdGxlOiBcIlNvdWhyblwiLFxyXG4gICAgICAgICAgICAgICAgem9uZTogMCxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vbWVudVBhcmFtczogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImFjdFJlZnJlc2hNeWxuZVBsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogR0FjdGlvbi5jYXB0aW9uVmlzaWJpbGl0eS5uZXZlcixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9jYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vY250LnVwZGF0ZShmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXSxcclxuICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdClcclxuICAgICAgICAgICAgfV0sIHsga2V5OiBbXCJpZFwiXSB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLm1vZHVsZUluZm9JdGVtcyxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lczogMlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcG9zbGVkeSB6bWVuZW5lIGFrY2VcclxuXHJcbiAgICAgICAgICAgIHZhciBBa2NlX0lTTF9WaWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNsLkFrY2VIaXN0b3JpZS5saXN0X1pvYnJhemVuZSh7IGZpbHRlcnM6IHt9IH0pXHJcbiAgICAgICAgICAgICAgICAsIHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlLmRhdGEuc2xpY2UoMCwgMTApLm1hcChmdW5jdGlvbiAoYWtjZSwgaWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwaUxhc3RVc2VkQWtjZVwiICsgXCJfXCIgKyBpaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIiwgLy9ha2NlLm5hemV2X3JmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrY2VfY2lzbG86IGFrY2UuY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3BsYTogYWtjZS5peHNfcGxhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ByaW1hcnlUZXh0OiBha2NlLmNpc2xvICsgXCIgfCBcIiArIGFrY2Uuem1lbmFfdHh0ICsgXCIgfCBcIiArIGFrY2UubmF6ZXZfcGxhbiArIFwiIChcIiArIGFrY2Uucm9rICsgXCIpXCIgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBha2NlLmNpc2xvICsgXCIgfCBcIiArIGFrY2Uuem1lbmFfdHh0ICsgXCIgfCBcIiArIGFrY2UubmF6ZXZfcGxhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoYWtjZS5kYXRfem1lbmEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkub24oXCJjaGFuZ2VcIixcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQuZ2RiX3BhbmVsLmdkYXNoYm9hcmRwYW5lbChcInJlZnJlc2hcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBBa2NlX0lTTF9WaWV3X0tuaWhhID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNsLkFrY2VIaXN0b3JpZS5saXN0X1pvYnJhemVuZV9LbmloYSh7IGZpbHRlcnM6IHt9IH0pXHJcbiAgICAgICAgICAgICAgICAsIHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlLmRhdGEuc2xpY2UoMCwgMTApLm1hcChmdW5jdGlvbiAoYWtjZSwgaWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwaUxhc3RVc2VkS25paGFcIiArIFwiX1wiICsgaWksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsIC8vYWtjZS5uYXpldl9yZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha2NlX2Npc2xvOiBha2NlLmNpc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19wbGE6IGFrY2UuaXhzX3BsYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IGFrY2Uucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJpbWFyeVRleHQ6IGFrY2Uuem1lbmFfdHh0ICsgXCIgKFwiICsgYWtjZS5yb2sgKyBcIilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogYWtjZS56bWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKGFrY2UuZGF0X3ptZW5hKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkub24oXCJjaGFuZ2VcIixcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQuZ2RiX3BhbmVsLmdkYXNoYm9hcmRwYW5lbChcInJlZnJlc2hcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC5sYXN0VXNlZEl0ZW1zID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImxhc3RNb2RpZmllZERvY3NcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogY250Lmdsb2JhbHMuQkFSX1R5cF9JbnN0ID09IEludGVyZmFjZS5TcnZUeXBJbnRhbGFjZUVudW0uTU8gPyBcIlBvc2xlZG7EmyB6b2JyYXplbsOpIHBvbC4gcGzDoW51XCIgOiBcIlBvc2xlZG7EmyB6b2JyYXplbsOpIGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlJY29uVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RMYXN0VXNlZEtuaWhhQ2xpY2tFbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjbnQuZ3BjLCBjdHguaXRlbS5kYXRhLml4c19wbGEpO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRldGFpbHdpbmRvdyA9ICgkLmNvbnRlbnQoKSBhcyBhbnkpLm5hdmlnYXRlVGFzayhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSBjbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbnVsbCwgZ3BjOiBuZXdHcGMgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxEb2tsYWR1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvOiBjdHguaXRlbS5kYXRhLmFrY2VfY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19jaWE6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltUHJvdm96dTogY250Lmdsb2JhbHMuUmV6aW1Qcm92b3p1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0YWJsZTogY250Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3ZhQWtjZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVQYXJhbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZXR3ZWV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEFrY2VIaXN0b3JpZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBHQWN0aW9uLmNhcHRpb25WaXNpYmlsaXR5Lm5ldmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJBa3R1YWxpem92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWtjZV9JU0xfVmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEFrY2VfSVNMX1ZpZXdcclxuICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImxhc3RNb2RpZmllZEJvb2tzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUG9zbGVkbsSbIHBvdcW+aXTDqSBrbmloeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaUljb25Ud29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdExhc3RVc2VkQWtjZUNsaWNrRW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNudC5ncGMsIGN0eC5pdGVtLmRhdGEuYWtjZV9jaXNsbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNudC5ncGMsIGN0eC5pdGVtLmRhdGEuaXhzX3BsYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmV3R3BjIGFzIGFueSkucm9rID0gY3R4Lml0ZW0uZGF0YS5yb2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gY250Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1Ba2NpXCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IG51bGwsIGdwYzogbmV3R3BjIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTZXpuYW1Eb2tsYWR1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltUHJvdm96dTogY250Lmdsb2JhbHMuUmV6aW1Qcm92b3p1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5vdmFBa2NlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVBhcmFtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJldHdlZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0QWtjZUhpc3RvcmllS25paGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogR0FjdGlvbi5jYXB0aW9uVmlzaWJpbGl0eS5uZXZlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb246IFwiQWt0dWFsaXpvdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrY2VfSVNMX1ZpZXdfS25paGEucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBBa2NlX0lTTF9WaWV3X0tuaWhhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sIHsga2V5OiBbXCJpZFwiXSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHJlc3VsdF9ha2NlICE9IG51bGwgJiYgcmVzdWx0X2FrY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIGNudC5nZGJfcGFuZWwgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZGFzaGJvYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogY250Lmxhc3RVc2VkSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVGVzdFwiLFxyXG4gICAgICAgICAgICAgICAgem9uZXM6IDNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBBa2NlX0lTTF9WaWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgIEFrY2VfSVNMX1ZpZXdfS25paGEucmVxdWVzdERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=