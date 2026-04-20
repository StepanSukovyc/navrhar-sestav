"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkcePocty.js                                                        </Name>
//    <Description> GAkcePocty                                                                                  </Description>
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
            let GAkcePocty = class GAkcePocty extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datapocty = this.modelpocty;
                    var result = [];
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    //var actEdit = new GAction({
                    //    name: "dblclick",
                    //    run: function (ev, ctx) {
                    //        GDlg.alert("Dvojklik");
                    //    }
                    //});
                    //this.actions.addRange({
                    //    actPocty: {
                    //        caption: "pocty", icon: "fa-refresh",
                    //        run: function (ev, ctx) {
                    //            that.trigger("ada_pocty_detail", [{ id: "ada_roz" }]);
                    //        }
                    //    }
                    //});
                    //this.menuBar(this.actions.createBar(["actPocty*"]));
                    // LightBlue
                    // LightGray
                    //var itemtemplate_pocet = "<div style='border:1px solid LightGray ; width:115px; height:100px;'>" +
                    //    "<div style='background-color: white; padding: 5px; text-align: center;'>" +
                    //    "<h3>{nazev}</h3>" +
                    //    "</div><div style='width:115px; text-align: center;'><h3>{pocet}</h3>" +
                    //    "</div></div>";
                    //var itemtemplate_pocet = "<div style='border:1px solid LightGray ; width:150px; height:100px;'>" +
                    //    "<div style='background-color: white; padding: 5px; text-align: center;'>" +
                    //    "<h3>{nazev}</h3>" +
                    //    "</div><div style='width:150px; text-align: center;'><h3>{pocet}</h3>" +
                    //    "</div></div>";
                    var itemtemplate_pocet = "<div style='border:1px solid LightGray ; width:110px; height:110px;'>" +
                        "<div style='background-color: white; padding: 5px; text-align: center;'>" +
                        "<h2>{nazev}</h2><h2>{pocet}</h2>" +
                        "</div></div>";
                    var ISPData = [];
                    result.push(new GObservableObject({ name: "kpi_pocet_roz", value: datapocty.pocet_roz, nazev: datapocty.zkratka_roz, primaryText: datapocty.zkratka_roz, secondaryText: datapocty.zkratka_roz }));
                    result.push(new GObservableObject({ name: "kpi_pocet_evz", value: datapocty.pocet_evz, nazev: datapocty.zkratka_evz, primaryText: datapocty.zkratka_evz, secondaryText: datapocty.zkratka_evz }));
                    result.push(new GObservableObject({ name: "kpi_pocet_vfp", value: datapocty.pocet_vfp, nazev: datapocty.zkratka_vfp, primaryText: datapocty.zkratka_vfp, secondaryText: datapocty.zkratka_vfp }));
                    result.push(new GObservableObject({ name: "kpi_pocet_epo", value: datapocty.pocet_epo, nazev: datapocty.zkratka_epo, primaryText: datapocty.zkratka_epo, secondaryText: datapocty.zkratka_epo }));
                    result.push(new GObservableObject({ name: "kpi_pocet_sml", value: datapocty.pocet_sml, nazev: datapocty.zkratka_sml, primaryText: datapocty.zkratka_sml, secondaryText: datapocty.zkratka_sml }));
                    result.push(new GObservableObject({ name: "kpi_pocet_obj", value: datapocty.pocet_obj, nazev: datapocty.zkratka_obj, primaryText: datapocty.zkratka_obj, secondaryText: datapocty.zkratka_obj }));
                    result.push(new GObservableObject({ name: "kpi_pocet_kdf", value: datapocty.pocet_kdf, nazev: datapocty.zkratka_kdf, primaryText: datapocty.zkratka_kdf, secondaryText: datapocty.zkratka_kdf }));
                    result.push(new GObservableObject({ name: "kpi_pocet_kof", value: datapocty.pocet_kof, nazev: datapocty.zkratka_kof, primaryText: datapocty.zkratka_kof, secondaryText: datapocty.zkratka_kof }));
                    result.push(new GObservableObject({ name: "kpi_pocet_pou", value: datapocty.pocet_pou, nazev: datapocty.zkratka_pou, primaryText: datapocty.zkratka_pou, secondaryText: datapocty.zkratka_pou }));
                    result.push(new GObservableObject({ name: "kpi_pocet_pre", value: datapocty.pocet_pre, nazev: datapocty.zkratka_pre, primaryText: datapocty.zkratka_pre, secondaryText: datapocty.zkratka_pre }));
                    result.push(new GObservableObject({ name: "kpi_pocet_uct", value: datapocty.pocet_uct, nazev: datapocty.zkratka_uct, primaryText: datapocty.zkratka_uct, secondaryText: datapocty.zkratka_uct }));
                    this.moduleInfoItems = new Gordic.Data.View([{
                            id: "moduleInfo",
                            // title: "Počty navázaných dokladů",
                            zone: 1,
                            mode: "horizontal",
                            itemTemplate: Gordic.Prefabs.Panels.kpiValueOneRowTextTemplate().itemTemplate,
                            defaultSelected: false,
                            data: new Gordic.Data.View(result),
                            defaultAction: new GAction({
                                name: "selectBtn",
                                icon: "fa-info-circle",
                                caption: 'Zobrazit seznam dokladu',
                                run: function (ev, ctx) {
                                    that.navigate("Gordic.Ada.WebClient.GAkceVazby", {
                                        id: 'VazbyDokladu#',
                                        cislo: that.cislo_akce,
                                        agenda: ctx.item.nazev,
                                        AkceFiltrDto: that.filter_akce
                                    });
                                }
                            })
                        }], { key: ["id"] });
                    $("<div>").appendTo(this.element).gbasepanel({
                        fixedWidth: true,
                        width: 95,
                        id: "moduleInfo",
                        // title: "Počty navázaných dokladů",
                        mode: "panel",
                        itemTemplate: Gordic.Prefabs.Panels.kpiValueOneRowTextTemplate().itemTemplate,
                        defaultSelected: false,
                        data: new Gordic.Data.View(result),
                        defaultAction: new GAction({
                            name: "selectBtn",
                            icon: "fa-info-circle",
                            caption: 'Zobrazit seznam dokladu',
                            run: function (ev, ctx) {
                                that.navigate("Gordic.Ada.WebClient.GAkceVazby", {
                                    id: 'VazbyDokladu#',
                                    cislo: that.cislo_akce,
                                    agenda: ctx.item.nazev,
                                    AkceFiltrDto: that.filter_akce
                                });
                            }
                        }),
                    });
                    //$("<div>").appendTo(this.element).gdashboardpanel({
                    //    data: this.moduleInfoItems,
                    //    layout: "horizontal",
                    //    //title: "",
                    //});
                }
            };
            GAkcePocty = __decorate([
                gcontent
            ], GAkcePocty);
            WebClient.GAkcePocty = GAkcePocty;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//namespace Gordic.Ada.WebClient {
//    var gcontent = Decorators.gcontent;
//    @gcontent
//    export class GAkcePocty extends GContentBase {
//        private grid: JQuery;
//        private modelpocty: Gordic.Ada.Interface.GPoctyDokladuAkceDto;
//        private globals = Gordic.Ada.Globals.GAdaGlobals;
//        private cislo_akce: string;
//        private filter_akce: Gordic.Ada.Interface.GAgDokladyFilterDto;
//        onContentReady () {
//            var that = this;
//            var $tab = $(this.contentDiv);
//            var datapocty = this.modelpocty;
//            $tab.empty();
//            var cnt = this;
//            var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
//            //var actEdit = new GAction({
//            //    name: "dblclick",
//            //    run: function (ev, ctx) {
//            //        GDlg.alert("Dvojklik");
//            //    }
//            //});
//            //this.actions.addRange({
//            //    actPocty: {
//            //        caption: "pocty", icon: "fa-refresh",
//            //        run: function (ev, ctx) {
//            //            that.trigger("ada_pocty_detail", [{ id: "ada_roz" }]);
//            //        }
//            //    }
//            //});
//            //this.menuBar(this.actions.createBar(["actPocty*"]));
//            // LightBlue
//            // LightGray
//            //var itemtemplate_pocet = "<div style='border:1px solid LightGray ; width:115px; height:100px;'>" +
//            //    "<div style='background-color: white; padding: 5px; text-align: center;'>" +
//            //    "<h3>{nazev}</h3>" +
//            //    "</div><div style='width:115px; text-align: center;'><h3>{pocet}</h3>" +
//            //    "</div></div>";
//            //var itemtemplate_pocet = "<div style='border:1px solid LightGray ; width:150px; height:100px;'>" +
//            //    "<div style='background-color: white; padding: 5px; text-align: center;'>" +
//            //    "<h3>{nazev}</h3>" +
//            //    "</div><div style='width:150px; text-align: center;'><h3>{pocet}</h3>" +
//            //    "</div></div>";
//            var itemtemplate_pocet = "<div style='border:1px solid LightGray ; width:110px; height:110px;'>" +
//                "<div style='background-color: white; padding: 5px; text-align: center;'>" +
//                "<h2>{nazev}</h2><h2>{pocet}</h2>" +
//                "</div></div>";
//            var ISPData:GCardOptions[] = [];
//            //data pro jednotlivá KPI
//            var ISPDataRadek1 = {};
//            var ISPDataRadekData1 = { nazev: "", pocet : 0};
//            ISPDataRadekData1.nazev = datapocty.zkratka_roz!;
//            ISPDataRadekData1.pocet = datapocty.pocet_roz!;
//            ISPDataRadek1 = ISPDataRadekData1;
//            ISPData.push(ISPDataRadek1);
//            var ISPDataRadek8 = {};
//            var ISPDataRadekData8 = { nazev: "", pocet: 0 };
//            ISPDataRadekData8.nazev = datapocty.zkratka_evz!;
//            ISPDataRadekData8.pocet = datapocty.pocet_evz!;
//            ISPDataRadek8 = ISPDataRadekData8;
//            ISPData.push(ISPDataRadek8);
//            var ISPDataRadek9 = {};
//            var ISPDataRadekData9 = { nazev: "", pocet: 0 };
//            ISPDataRadekData9.nazev = datapocty.zkratka_vfp!;
//            ISPDataRadekData9.pocet = datapocty.pocet_vfp!;
//            ISPDataRadek9 = ISPDataRadekData9;
//            ISPData.push(ISPDataRadek9);
//            var ISPDataRadek10 = {};
//            var ISPDataRadekData10 = { nazev: "", pocet: 0 };
//            ISPDataRadekData10.nazev = datapocty.zkratka_epo!;
//            ISPDataRadekData10.pocet = datapocty.pocet_epo!;
//            ISPDataRadek10 = ISPDataRadekData10;
//            ISPData.push(ISPDataRadek10);
//            var ISPDataRadek2 = {};
//            var ISPDataRadekData2 = { nazev: "", pocet: 0 };
//            ISPDataRadekData2.nazev = datapocty.zkratka_sml!;
//            ISPDataRadekData2.pocet = datapocty.pocet_sml!;
//            ISPDataRadek2 = ISPDataRadekData2;
//            ISPData.push(ISPDataRadek2);
//            var ISPDataRadek3 = {};
//            var ISPDataRadekData3 = { nazev: "", pocet: 0 };
//            ISPDataRadekData3.nazev = datapocty.zkratka_obj!;
//            ISPDataRadekData3.pocet = datapocty.pocet_obj!;
//            ISPDataRadek3 = ISPDataRadekData3;
//            ISPData.push(ISPDataRadek3);
//            var ISPDataRadek4 = {};
//            var ISPDataRadekData4 = { nazev: "", pocet: 0 };
//            ISPDataRadekData4.nazev = datapocty.zkratka_kdf!;
//            ISPDataRadekData4.pocet = datapocty.pocet_kdf!;
//            ISPDataRadek4 = ISPDataRadekData4;
//            ISPData.push(ISPDataRadek4);
//            var ISPDataRadek5 = {};
//            var ISPDataRadekData5 = { nazev: "", pocet: 0 };
//            ISPDataRadekData5.nazev = datapocty.zkratka_kof!;
//            ISPDataRadekData5.pocet = datapocty.pocet_kof!;
//            ISPDataRadek5 = ISPDataRadekData5;
//            ISPData.push(ISPDataRadek5);
//            var ISPDataRadek6 = {};
//            var ISPDataRadekData6 = { nazev: "", pocet: 0 };
//            ISPDataRadekData6.nazev = datapocty.zkratka_pou!;
//            ISPDataRadekData6.pocet = datapocty.pocet_pou!;
//            ISPDataRadek6 = ISPDataRadekData6;
//            ISPData.push(ISPDataRadek6);
//            var ISPDataRadek7 = {};
//            var ISPDataRadekData7 = { nazev: "", pocet: 0 };
//            ISPDataRadekData7.nazev = datapocty.zkratka_pre!;
//            ISPDataRadekData7.pocet = datapocty.pocet_pre!;
//            ISPDataRadek7 = ISPDataRadekData7;
//            ISPData.push(ISPDataRadek7);
//            var ISPDataRadek11 = {};
//            var ISPDataRadekData11 = { nazev: "", pocet: 0 };
//            ISPDataRadekData11.nazev = datapocty.zkratka_uct!;
//            ISPDataRadekData11.pocet = datapocty.pocet_uct!;
//            ISPDataRadek11 = ISPDataRadekData11;
//            ISPData.push(ISPDataRadek11);
////            naplnění KPI do cardpanelu
//            $("<div>").appendTo(cnt.element).gcardpanel({
//                editable: false,
//                title: "Počty navázaných dokladů",
//                itemTemplate: itemtemplate_pocet,
//                data: ISPData,
//                createTab: false,
//                defaultAction: new GAction({
//                    name: "selectBtn",
//                    icon: "fa-info-circle",
//                    caption: 'Zobrazit seznam dokladu',
//                    run: function (ev, ctx) {
//                        that.navigate(
//                            "Gordic.Ada.WebClient.GAkceVazby",
//                            {
//                                id: 'VazbyDokladu#', 
//                                cislo: that.cislo_akce, 
//                                agenda: ctx.item.nazev, 
//                                AkceFiltrDto: that.filter_akce                                
//                            });
//                    }
//                })
//            });
//        }
//    }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VQb2N0eS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWtjZVBvY3R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBNklmO0FBN0lELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZJbkI7SUE3SWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZJN0I7UUE3SW9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBV3hDLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNoQyxJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7b0JBRXZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLDZCQUE2QjtvQkFDN0IsdUJBQXVCO29CQUN2QiwrQkFBK0I7b0JBQy9CLGlDQUFpQztvQkFDakMsT0FBTztvQkFDUCxLQUFLO29CQUVMLHlCQUF5QjtvQkFDekIsaUJBQWlCO29CQUNqQiwrQ0FBK0M7b0JBQy9DLG1DQUFtQztvQkFDbkMsb0VBQW9FO29CQUNwRSxXQUFXO29CQUNYLE9BQU87b0JBQ1AsS0FBSztvQkFFTCxzREFBc0Q7b0JBRXRELFlBQVk7b0JBQ1osWUFBWTtvQkFDWixvR0FBb0c7b0JBQ3BHLGtGQUFrRjtvQkFDbEYsMEJBQTBCO29CQUMxQiw4RUFBOEU7b0JBQzlFLHFCQUFxQjtvQkFFckIsb0dBQW9HO29CQUNwRyxrRkFBa0Y7b0JBQ2xGLDBCQUEwQjtvQkFDMUIsOEVBQThFO29CQUM5RSxxQkFBcUI7b0JBRXJCLElBQUksa0JBQWtCLEdBQUcsdUVBQXVFO3dCQUM1RiwwRUFBMEU7d0JBQzFFLGtDQUFrQzt3QkFDbEMsY0FBYyxDQUFDO29CQUVuQixJQUFJLE9BQU8sR0FBbUIsRUFBRSxDQUFDO29CQUVqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVyTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0TSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBVSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsV0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0TSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekMsRUFBRSxFQUFFLFlBQVk7NEJBQ2hCLHFDQUFxQzs0QkFDckMsSUFBSSxFQUFFLENBQUM7NEJBQ1AsSUFBSSxFQUFFLFlBQVk7NEJB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QUNoRCwwQ0FBMEM7QUFFMUMscUNBQXFDO0FBQ3JDLDhEQUE4RDtBQUM5RCwrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELGdEQUFnRDtBQUNoRCwwQ0FBMEM7QUFFMUMscUNBQXFDO0FBQ3JDLDhEQUE4RDtBQUM5RCwrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELGdEQUFnRDtBQUNoRCwwQ0FBMEM7QUFFMUMscUNBQXFDO0FBQ3JDLDhEQUE4RDtBQUM5RCwrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELGdEQUFnRDtBQUNoRCwwQ0FBMEM7QUFFMUMsc0NBQXNDO0FBQ3RDLCtEQUErRDtBQUMvRCxnRUFBZ0U7QUFDaEUsOERBQThEO0FBQzlELGtEQUFrRDtBQUNsRCwyQ0FBMkM7QUFFM0MsMENBQTBDO0FBQzFDLDJEQUEyRDtBQUMzRCxrQ0FBa0M7QUFDbEMsb0RBQW9EO0FBQ3BELG1EQUFtRDtBQUNuRCxnQ0FBZ0M7QUFDaEMsbUNBQW1DO0FBQ25DLDhDQUE4QztBQUM5Qyx3Q0FBd0M7QUFDeEMsNkNBQTZDO0FBQzdDLHlEQUF5RDtBQUN6RCwrQ0FBK0M7QUFFL0Msd0NBQXdDO0FBQ3hDLGdFQUFnRTtBQUNoRSwrQkFBK0I7QUFDL0IsdURBQXVEO0FBQ3ZELDBEQUEwRDtBQUMxRCwwREFBMEQ7QUFDMUQsZ0dBQWdHO0FBQ2hHLGlDQUFpQztBQUNqQyx1QkFBdUI7QUFDdkIsb0JBQW9CO0FBQ3BCLGlCQUFpQjtBQUVqQixXQUFXO0FBQ1gsT0FBTztBQUNQLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VQb2N0eS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlUG9jdHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdBa2NlUG9jdHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIG1vZGVscG9jdHk6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2N0eURva2xhZHVBa2NlRHRvO1xyXG4vLyAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNpc2xvX2FrY2U6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgbW9kdWxlSW5mb0l0ZW1zOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGFwb2N0eSA9IHRoaXMubW9kZWxwb2N0eTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBhY3RFZGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcImRibGNsaWNrXCIsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIEdEbGcuYWxlcnQoXCJEdm9qa2xpa1wiKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAvLyAgICBhY3RQb2N0eToge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJwb2N0eVwiLCBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJhZGFfcG9jdHlfZGV0YWlsXCIsIFt7IGlkOiBcImFkYV9yb3pcIiB9XSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UG9jdHkqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBMaWdodEJsdWVcclxuICAgICAgICAgICAgLy8gTGlnaHRHcmF5XHJcbiAgICAgICAgICAgIC8vdmFyIGl0ZW10ZW1wbGF0ZV9wb2NldCA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCBMaWdodEdyYXkgOyB3aWR0aDoxMTVweDsgaGVpZ2h0OjEwMHB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHdoaXRlOyBwYWRkaW5nOiA1cHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8aDM+e25hemV2fTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjExNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Jz48aDM+e3BvY2V0fTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgaXRlbXRlbXBsYXRlX3BvY2V0ID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheSA7IHdpZHRoOjE1MHB4OyBoZWlnaHQ6MTAwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGRpdiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IHBhZGRpbmc6IDVweDsgdGV4dC1hbGlnbjogY2VudGVyOyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxoMz57bmF6ZXZ9PC9oMz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PGRpdiBzdHlsZT0nd2lkdGg6MTUwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPjxoMz57cG9jZXR9PC9oMz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXRlbXBsYXRlX3BvY2V0ID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheSA7IHdpZHRoOjExMHB4OyBoZWlnaHQ6MTEwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHdoaXRlOyBwYWRkaW5nOiA1cHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGgyPntuYXpldn08L2gyPjxoMj57cG9jZXR9PC9oMj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIElTUERhdGE6IEdDYXJkT3B0aW9uc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3QoeyBuYW1lOiBcImtwaV9wb2NldF9yb3pcIiwgdmFsdWU6IGRhdGFwb2N0eS5wb2NldF9yb3ohLCBuYXpldjogZGF0YXBvY3R5LnprcmF0a2Ffcm96ISwgcHJpbWFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX3JveiEsIHNlY29uZGFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX3JveiF9KSk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3QoeyBuYW1lOiBcImtwaV9wb2NldF9ldnpcIiwgdmFsdWU6IGRhdGFwb2N0eS5wb2NldF9ldnohLCBuYXpldjogZGF0YXBvY3R5LnprcmF0a2FfZXZ6ISwgcHJpbWFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX2V2eiEsIHNlY29uZGFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX2V2eiEgfSkpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3QoeyBuYW1lOiBcImtwaV9wb2NldF92ZnBcIiwgdmFsdWU6IGRhdGFwb2N0eS5wb2NldF92ZnAhLCBuYXpldjogZGF0YXBvY3R5LnprcmF0a2FfdmZwISwgcHJpbWFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX3ZmcCEsIHNlY29uZGFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX3ZmcCEgfSkpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3QoeyBuYW1lOiBcImtwaV9wb2NldF9lcG9cIiwgdmFsdWU6IGRhdGFwb2N0eS5wb2NldF9lcG8hLCBuYXpldjogZGF0YXBvY3R5LnprcmF0a2FfZXBvISwgcHJpbWFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX2VwbyEsIHNlY29uZGFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX2VwbyEgfSkpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHsgbmFtZTogXCJrcGlfcG9jZXRfc21sXCIsIHZhbHVlOiBkYXRhcG9jdHkucG9jZXRfc21sISwgbmF6ZXY6IGRhdGFwb2N0eS56a3JhdGthX3NtbCEsIHByaW1hcnlUZXh0OiBkYXRhcG9jdHkuemtyYXRrYV9zbWwhLCBzZWNvbmRhcnlUZXh0OiBkYXRhcG9jdHkuemtyYXRrYV9zbWwhIH0pKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHsgbmFtZTogXCJrcGlfcG9jZXRfb2JqXCIsIHZhbHVlOiBkYXRhcG9jdHkucG9jZXRfb2JqISwgbmF6ZXY6IGRhdGFwb2N0eS56a3JhdGthX29iaiEsIHByaW1hcnlUZXh0OiBkYXRhcG9jdHkuemtyYXRrYV9vYmohLCBzZWNvbmRhcnlUZXh0OiBkYXRhcG9jdHkuemtyYXRrYV9vYmohIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IG5hbWU6IFwia3BpX3BvY2V0X2tkZlwiLCB2YWx1ZTogZGF0YXBvY3R5LnBvY2V0X2tkZiEsIG5hemV2OiBkYXRhcG9jdHkuemtyYXRrYV9rZGYhLCBwcmltYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2Ffa2RmISwgc2Vjb25kYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2Ffa2RmISB9KSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IG5hbWU6IFwia3BpX3BvY2V0X2tvZlwiLCB2YWx1ZTogZGF0YXBvY3R5LnBvY2V0X2tvZiEsIG5hemV2OiBkYXRhcG9jdHkuemtyYXRrYV9rb2YhLCBwcmltYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2Ffa29mISwgc2Vjb25kYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2Ffa29mISB9KSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IG5hbWU6IFwia3BpX3BvY2V0X3BvdVwiLCB2YWx1ZTogZGF0YXBvY3R5LnBvY2V0X3BvdSEsIG5hemV2OiBkYXRhcG9jdHkuemtyYXRrYV9wb3UhLCBwcmltYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2FfcG91ISwgc2Vjb25kYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2FfcG91ISB9KSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IG5hbWU6IFwia3BpX3BvY2V0X3ByZVwiLCB2YWx1ZTogZGF0YXBvY3R5LnBvY2V0X3ByZSEsIG5hemV2OiBkYXRhcG9jdHkuemtyYXRrYV9wcmUhLCBwcmltYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2FfcHJlISwgc2Vjb25kYXJ5VGV4dDogZGF0YXBvY3R5LnprcmF0a2FfcHJlISB9KSk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3QoeyBuYW1lOiBcImtwaV9wb2NldF91Y3RcIiwgdmFsdWU6IGRhdGFwb2N0eS5wb2NldF91Y3QhLCBuYXpldjogZGF0YXBvY3R5LnprcmF0a2FfdWN0ISwgcHJpbWFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX3VjdCEsIHNlY29uZGFyeVRleHQ6IGRhdGFwb2N0eS56a3JhdGthX3VjdCEgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2R1bGVJbmZvSXRlbXMgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwibW9kdWxlSW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gdGl0bGU6IFwiUG/EjXR5IG5hdsOhemFuw71jaCBkb2tsYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgem9uZTogMSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVPbmVSb3dUZXh0VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcocmVzdWx0KSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbGVjdEJ0blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtaW5mby1jaXJjbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnWm9icmF6aXQgc2V6bmFtIGRva2xhZHUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VWYXpieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnVmF6YnlEb2tsYWR1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IHRoYXQuY2lzbG9fYWtjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IGN0eC5pdGVtLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrY2VGaWx0ckR0bzogdGhhdC5maWx0ZXJfYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgIH1dLCB7IGtleTogW1wiaWRcIl0gfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nYmFzZXBhbmVsKHtcclxuICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgd2lkdGg6IDk1LFxyXG4gICAgICAgICAgICAgICBpZDogXCJtb2R1bGVJbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyB0aXRsZTogXCJQb8SNdHkgbmF2w6F6YW7DvWNoIGRva2xhZMWvXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcInBhbmVsXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlWYWx1ZU9uZVJvd1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0QnRuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1pbmZvLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICdab2JyYXppdCBzZXpuYW0gZG9rbGFkdScsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVZhemJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdWYXpieURva2xhZHUjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNsbzogdGhhdC5jaXNsb19ha2NlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYTogY3R4Lml0ZW0ubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWtjZUZpbHRyRHRvOiB0aGF0LmZpbHRlcl9ha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgIC8vICAgIGRhdGE6IHRoaXMubW9kdWxlSW5mb0l0ZW1zLFxyXG4gICAgICAgICAgICAvLyAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAvLyAgICAvL3RpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4vLyAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuLy8gICAgQGdjb250ZW50XHJcbi8vICAgIGV4cG9ydCBjbGFzcyBHQWtjZVBvY3R5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbi8vICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuLy8gICAgICAgIHByaXZhdGUgbW9kZWxwb2N0eTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1BvY3R5RG9rbGFkdUFrY2VEdG87XHJcbi8vICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcbi8vICAgICAgICBwcml2YXRlIGNpc2xvX2FrY2U6IHN0cmluZztcclxuLy8gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87XHJcbiAgICBcclxuLy8gICAgICAgIG9uQ29udGVudFJlYWR5ICgpIHtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4vLyAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4vLyAgICAgICAgICAgIHZhciBkYXRhcG9jdHkgPSB0aGlzLm1vZGVscG9jdHk7XHJcbiAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuLy8gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbi8vICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuLy8gICAgICAgICAgICAvLyAgICBuYW1lOiBcImRibGNsaWNrXCIsXHJcbi8vICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4vLyAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbi8vICAgICAgICAgICAgLy8gICAgfVxyXG4vLyAgICAgICAgICAgIC8vfSk7XHJcblxyXG4vLyAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuLy8gICAgICAgICAgICAvLyAgICBhY3RQb2N0eToge1xyXG4vLyAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcInBvY3R5XCIsIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4vLyAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbi8vICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJhZGFfcG9jdHlfZGV0YWlsXCIsIFt7IGlkOiBcImFkYV9yb3pcIiB9XSk7XHJcbi8vICAgICAgICAgICAgLy8gICAgICAgIH1cclxuLy8gICAgICAgICAgICAvLyAgICB9XHJcbi8vICAgICAgICAgICAgLy99KTtcclxuXHJcbi8vICAgICAgICAgICAgLy90aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQb2N0eSpcIl0pKTtcclxuXHJcbi8vICAgICAgICAgICAgLy8gTGlnaHRCbHVlXHJcbi8vICAgICAgICAgICAgLy8gTGlnaHRHcmF5XHJcbi8vICAgICAgICAgICAgLy92YXIgaXRlbXRlbXBsYXRlX3BvY2V0ID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheSA7IHdpZHRoOjExNXB4OyBoZWlnaHQ6MTAwcHg7Jz5cIiArXHJcbi8vICAgICAgICAgICAgLy8gICAgXCI8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgcGFkZGluZzogNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Jz5cIiArXHJcbi8vICAgICAgICAgICAgLy8gICAgXCI8aDM+e25hemV2fTwvaDM+XCIgK1xyXG4vLyAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PGRpdiBzdHlsZT0nd2lkdGg6MTE1cHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPjxoMz57cG9jZXR9PC9oMz5cIiArXHJcbi8vICAgICAgICAgICAgLy8gICAgXCI8L2Rpdj48L2Rpdj5cIjtcclxuXHJcbi8vICAgICAgICAgICAgLy92YXIgaXRlbXRlbXBsYXRlX3BvY2V0ID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheSA7IHdpZHRoOjE1MHB4OyBoZWlnaHQ6MTAwcHg7Jz5cIiArXHJcbi8vICAgICAgICAgICAgLy8gICAgXCI8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgcGFkZGluZzogNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Jz5cIiArXHJcbi8vICAgICAgICAgICAgLy8gICAgXCI8aDM+e25hemV2fTwvaDM+XCIgK1xyXG4vLyAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PGRpdiBzdHlsZT0nd2lkdGg6MTUwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPjxoMz57cG9jZXR9PC9oMz5cIiArXHJcbi8vICAgICAgICAgICAgLy8gICAgXCI8L2Rpdj48L2Rpdj5cIjtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIGl0ZW10ZW1wbGF0ZV9wb2NldCA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCBMaWdodEdyYXkgOyB3aWR0aDoxMTBweDsgaGVpZ2h0OjExMHB4Oyc+XCIgK1xyXG4vLyAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHdoaXRlOyBwYWRkaW5nOiA1cHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPlwiICtcclxuLy8gICAgICAgICAgICAgICAgXCI8aDI+e25hemV2fTwvaDI+PGgyPntwb2NldH08L2gyPlwiICtcclxuLy8gICAgICAgICAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIjtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGE6R0NhcmRPcHRpb25zW10gPSBbXTtcclxuXHJcbi8vICAgICAgICAgICAgLy9kYXRhIHBybyBqZWRub3RsaXbDoSBLUElcclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrMSA9IHt9O1xyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMSA9IHsgbmF6ZXY6IFwiXCIsIHBvY2V0IDogMH07XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTEubmF6ZXYgPSBkYXRhcG9jdHkuemtyYXRrYV9yb3ohO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGExLnBvY2V0ID0gZGF0YXBvY3R5LnBvY2V0X3JveiE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGExO1xyXG4vLyAgICAgICAgICAgIElTUERhdGEucHVzaChJU1BEYXRhUmFkZWsxKTtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGFSYWRlazggPSB7fTtcclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTggPSB7IG5hemV2OiBcIlwiLCBwb2NldDogMCB9O1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGE4Lm5hemV2ID0gZGF0YXBvY3R5LnprcmF0a2FfZXZ6ITtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhOC5wb2NldCA9IGRhdGFwb2N0eS5wb2NldF9ldnohO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRlazggPSBJU1BEYXRhUmFkZWtEYXRhODtcclxuLy8gICAgICAgICAgICBJU1BEYXRhLnB1c2goSVNQRGF0YVJhZGVrOCk7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWs5ID0ge307XHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGE5ID0geyBuYXpldjogXCJcIiwgcG9jZXQ6IDAgfTtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhOS5uYXpldiA9IGRhdGFwb2N0eS56a3JhdGthX3ZmcCE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTkucG9jZXQgPSBkYXRhcG9jdHkucG9jZXRfdmZwITtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWs5ID0gSVNQRGF0YVJhZGVrRGF0YTk7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YS5wdXNoKElTUERhdGFSYWRlazkpO1xyXG5cclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrMTAgPSB7fTtcclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTEwID0geyBuYXpldjogXCJcIiwgcG9jZXQ6IDAgfTtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMTAubmF6ZXYgPSBkYXRhcG9jdHkuemtyYXRrYV9lcG8hO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGExMC5wb2NldCA9IGRhdGFwb2N0eS5wb2NldF9lcG8hO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRlazEwID0gSVNQRGF0YVJhZGVrRGF0YTEwO1xyXG4vLyAgICAgICAgICAgIElTUERhdGEucHVzaChJU1BEYXRhUmFkZWsxMCk7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWsyID0ge307XHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgcG9jZXQ6IDAgfTtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IGRhdGFwb2N0eS56a3JhdGthX3NtbCE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIucG9jZXQgPSBkYXRhcG9jdHkucG9jZXRfc21sITtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWsyID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YS5wdXNoKElTUERhdGFSYWRlazIpO1xyXG5cclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrMyA9IHt9O1xyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMyA9IHsgbmF6ZXY6IFwiXCIsIHBvY2V0OiAwIH07XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTMubmF6ZXYgPSBkYXRhcG9jdHkuemtyYXRrYV9vYmohO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEzLnBvY2V0ID0gZGF0YXBvY3R5LnBvY2V0X29iaiE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrMyA9IElTUERhdGFSYWRla0RhdGEzO1xyXG4vLyAgICAgICAgICAgIElTUERhdGEucHVzaChJU1BEYXRhUmFkZWszKTtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGFSYWRlazQgPSB7fTtcclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTQgPSB7IG5hemV2OiBcIlwiLCBwb2NldDogMCB9O1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGE0Lm5hemV2ID0gZGF0YXBvY3R5LnprcmF0a2Ffa2RmITtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhNC5wb2NldCA9IGRhdGFwb2N0eS5wb2NldF9rZGYhO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRlazQgPSBJU1BEYXRhUmFkZWtEYXRhNDtcclxuLy8gICAgICAgICAgICBJU1BEYXRhLnB1c2goSVNQRGF0YVJhZGVrNCk7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWs1ID0ge307XHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGE1ID0geyBuYXpldjogXCJcIiwgcG9jZXQ6IDAgfTtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhNS5uYXpldiA9IGRhdGFwb2N0eS56a3JhdGthX2tvZiE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTUucG9jZXQgPSBkYXRhcG9jdHkucG9jZXRfa29mITtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWs1ID0gSVNQRGF0YVJhZGVrRGF0YTU7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YS5wdXNoKElTUERhdGFSYWRlazUpO1xyXG5cclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrNiA9IHt9O1xyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhNiA9IHsgbmF6ZXY6IFwiXCIsIHBvY2V0OiAwIH07XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTYubmF6ZXYgPSBkYXRhcG9jdHkuemtyYXRrYV9wb3UhO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGE2LnBvY2V0ID0gZGF0YXBvY3R5LnBvY2V0X3BvdSE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrNiA9IElTUERhdGFSYWRla0RhdGE2O1xyXG4vLyAgICAgICAgICAgIElTUERhdGEucHVzaChJU1BEYXRhUmFkZWs2KTtcclxuXHJcbi8vICAgICAgICAgICAgdmFyIElTUERhdGFSYWRlazcgPSB7fTtcclxuLy8gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTcgPSB7IG5hemV2OiBcIlwiLCBwb2NldDogMCB9O1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGE3Lm5hemV2ID0gZGF0YXBvY3R5LnprcmF0a2FfcHJlITtcclxuLy8gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhNy5wb2NldCA9IGRhdGFwb2N0eS5wb2NldF9wcmUhO1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRlazcgPSBJU1BEYXRhUmFkZWtEYXRhNztcclxuLy8gICAgICAgICAgICBJU1BEYXRhLnB1c2goSVNQRGF0YVJhZGVrNyk7XHJcblxyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWsxMSA9IHt9O1xyXG4vLyAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMTEgPSB7IG5hemV2OiBcIlwiLCBwb2NldDogMCB9O1xyXG4vLyAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGExMS5uYXpldiA9IGRhdGFwb2N0eS56a3JhdGthX3VjdCE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTExLnBvY2V0ID0gZGF0YXBvY3R5LnBvY2V0X3VjdCE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YVJhZGVrMTEgPSBJU1BEYXRhUmFkZWtEYXRhMTE7XHJcbi8vICAgICAgICAgICAgSVNQRGF0YS5wdXNoKElTUERhdGFSYWRlazExKTtcclxuXHJcbi8vLy8gICAgICAgICAgICBuYXBsbsSbbsOtIEtQSSBkbyBjYXJkcGFuZWx1XHJcbi8vICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKGNudC5lbGVtZW50KS5nY2FyZHBhbmVsKHtcclxuLy8gICAgICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICB0aXRsZTogXCJQb8SNdHkgbmF2w6F6YW7DvWNoIGRva2xhZMWvXCIsXHJcbi8vICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogaXRlbXRlbXBsYXRlX3BvY2V0LFxyXG4vLyAgICAgICAgICAgICAgICBkYXRhOiBJU1BEYXRhLFxyXG4vLyAgICAgICAgICAgICAgICBjcmVhdGVUYWI6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbi8vICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbGVjdEJ0blwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1pbmZvLWNpcmNsZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogJ1pvYnJheml0IHNlem5hbSBkb2tsYWR1JyxcclxuLy8gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVZhemJ5XCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnVmF6YnlEb2tsYWR1IycsIFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IHRoYXQuY2lzbG9fYWtjZSwgXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IGN0eC5pdGVtLm5hemV2LCBcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrY2VGaWx0ckR0bzogdGhhdC5maWx0ZXJfYWtjZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgIH1cclxuLy8gICAgfVxyXG4vLyB9Il19