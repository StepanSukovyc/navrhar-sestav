"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GPohledAgendyNeuzav.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
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
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GPohledAgendyNeuzav = class GPohledAgendyNeuzav extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Stav uzávěrky agend a knih";
                }
                // private globals = Gordic.Inu.Globals.GAdaGlobals;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    this.title = "Stav uzávěrky agend a knih";
                    console.log("Data agend", this.modelag);
                    console.log("Data agend knihy", this.modelknihy);
                    $tab.empty();
                    var cnt = this;
                    //var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    var actEdit = new GAction({
                        name: "dblclick",
                        run: function (ev, ctx) {
                            GDlg.alert("Dvojklik");
                            // ctx.cellInfo.data
                        }
                    });
                    var SumyData = [];
                    var SumyData_CP = [];
                    //var itemtemplate_mesic = "<div style='border:1px solid LightGray; padding: 5px; width:240px; height:300px;'>" +
                    //    "<div style='background-color: {barva_txt};height:100px; padding: 5px;'>" +
                    //    "<h4 style='color: black;'>{typ_ag_txt}</h4>" +
                    //    "<h4 style='color: black;'>{aktivita_txt}</h4>" +
                    //    "</div><div style='width:259px; padding: 5px;'>" +
                    //    "<b><p>{dat_zmena_txt}</p>" +
                    //    "<p>{pocetOtevrena_txt}</p>" +
                    //    "<p>{pocetUzavrena_txt}</p>" +
                    //    "<p>{pocetZrusena_txt}</p>" +
                    //    "<p>{pocetPripravena_txt}</p>" +
                    //    "<p>{pocetUzavrenaNeodlita_txt}</p></b>" +
                    //    "</div></div>";
                    var itemtemplate_mesic = "<div style='border:1px solid LightGray; padding: 5px; width:240px; height:350px;'>" +
                        //                "<div style='background-color: {barva_txt};height:340px; padding: 5px;'>" +
                        "<div style='height:340px; padding: 5px;'>" +
                        "<h2 style='color: {barva_txt};'>{zkr_ag} - {typ_ag_txt}</h2>" +
                        "<h4 style='color: {barva_txt};'>{aktivita_txt}</h4>" +
                        "<b><p>{dat_zmena_txt}</p>" +
                        "<p>{pocetOtevrena_txt}</p>" +
                        "<p>{pocetUzavrena_txt}</p>" +
                        "<p>{pocetZrusena_txt}</p>" +
                        "<p>{pocetPripravena_txt}</p>" +
                        "<p>{pocetUzavrenaNeodlita_txt}</p></b>" +
                        "</div></div>";
                    //data pro jednotlivá KPI
                    var MesiceData = [];
                    for (var row in this.modelag) {
                        var ObdobiDataRadek = {};
                        var ObdobiDataRadekData = {};
                        ObdobiDataRadekData = this.modelag[row];
                        ObdobiDataRadekData = that.napln_obdobi(ObdobiDataRadekData);
                        ObdobiDataRadek = ObdobiDataRadekData;
                        MesiceData.push(ObdobiDataRadek);
                    }
                    //naplnění KPI do cardpanelu
                    // $("<div style='width:1250px'>").appendTo(cnt.element).gcardpanel({
                    $("<div>")
                        .appendTo(cnt.element).gcardpanel({
                        editable: true,
                        title: "Seznam agend",
                        itemTemplate: itemtemplate_mesic,
                        data: MesiceData,
                        form: this.obdForm,
                        createTab: false
                    }).gtab({ title: "Stav uzávěrky agend a knih", opened: true, locked: false });
                    var $mainTable = $("<div>")
                        .appendTo(this.element)
                        .gautofit({ minimalHeight: 620 })
                        .gtab({ title: "Přehled knih agendy", opened: true, locked: false })
                        .ggrid({
                        columnMode: "fit",
                        sort: "!dat_zmena",
                        defaultProfile: { "grouping": "typ_ag_txt", "columns": { "typ_ag_txt": { "grouping": { "defaultState": "open" } } } },
                        searchColumns: ["ucs"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "typ_ag_txt",
                            caption: "Agenda",
                            width: 50,
                            aggregate: Gordic.Data.Aggregates.first("typ_ag_txt"),
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "Název",
                            width: 50
                        })
                            .addTextColumn({
                            name: "aktivita_txt",
                            caption: "Stav knihy",
                            width: 50
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "Poznámka",
                            width: 50
                        })
                    });
                    var view = new Gordic.Data.View(this.modelknihy);
                    $mainTable.ggrid("setData", view, true);
                }
                napln_obdobi(data_obdobi) {
                    data_obdobi.barva_txt = (data_obdobi.stav_uzavreni == 100 ? 'SeaGreen' : (data_obdobi.stav_uzavreni == 500 ? 'IndianRed' : 'Yellow'));
                    //            data_obdobi.aktivita_txt = (data_obdobi.s_uzav == 100 ? 'Otevřeno' : 'Uzavřeno');
                    data_obdobi.aktivita_txt = data_obdobi.stav_ag;
                    data_obdobi.aktivita_color = (data_obdobi.stav_uzavreni == 100 ? 'black' : 'red');
                    //data_obdobi.dat_zmena_txt = '';
                    if ((data_obdobi.pocetOtevrena + data_obdobi.pocetPripravena + data_obdobi.pocetUzavrena + data_obdobi.pocetUzavrenaNeodlita + data_obdobi.pocetZrusena) != 0) {
                        data_obdobi.dat_zmena_txt = 'Knihy';
                        data_obdobi.pocetOtevrena_txt = "Otevřeno: " + data_obdobi.pocetOtevrena;
                        data_obdobi.pocetUzavrena_txt = "Uzavřeno: " + data_obdobi.pocetUzavrena;
                        data_obdobi.pocetZrusena_txt = "Zrušeno: " + data_obdobi.pocetZrusena;
                        data_obdobi.pocetPripravena_txt = "Připraveno: " + data_obdobi.pocetPripravena;
                        data_obdobi.pocetUzavrenaNeodlita_txt = "Uzavřeno neodlito: " + data_obdobi.pocetUzavrenaNeodlita;
                    }
                    else {
                        data_obdobi.dat_zmena_txt = "Agenda neobsahuje knihy";
                        data_obdobi.pocetOtevrena_txt = "";
                        data_obdobi.pocetUzavrena_txt = "";
                        data_obdobi.pocetZrusena_txt = "";
                        data_obdobi.pocetPripravena_txt = "";
                        data_obdobi.pocetUzavrenaNeodlita_txt = "";
                    }
                    return data_obdobi;
                }
            };
            GPohledAgendyNeuzav = __decorate([
                gcontent
            ], GPohledAgendyNeuzav);
            WebClient.GPohledAgendyNeuzav = GPohledAgendyNeuzav;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaGxlZEFnZW5keU5ldXphdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2hsZWRBZ2VuZHlOZXV6YXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0F5S2Y7QUF6S0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeUtuQjtJQXpLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeUs3QjtRQXpLb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFXbkMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFFSSxVQUFLLEdBQUcsNEJBQTRCLENBQUM7Z0JBMEp6QyxDQUFDO2dCQW5KRyxvREFBb0Q7Z0JBRXBELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO29CQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUVqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUdmLG9JQUFvSTtvQkFFcEksSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3RCLElBQUksRUFBRSxVQUFVO3dCQUNoQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDdkIs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RUF6S1MsTUFBTSxLQUFOLE1BQU0sUUF5S2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR1BvaGxlZEFnZW5keU5ldXphdi5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR0NhcmRPcHRpb25zIHtcclxuICAgICAgICB1bml0Pzogc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlPzogRGVjaW1hbCB8IG51bGwsXHJcbiAgICAgICAgdGl0bGU/OiBzdHJpbmcsXHJcbiAgICAgICAgZGF0YT86IGFueSxcclxuICAgICAgICBuYXpldj86IHN0cmluZyxcclxuICAgICAgICBzdW1hPzogc3RyaW5nLFxyXG4gICAgfVxyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2hsZWRBZ2VuZHlOZXV6YXYgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiU3RhdiB1esOhdsSbcmt5IGFnZW5kIGEga25paFwiO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWxhZzogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2RvYmRab2JyRHRvW107XHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsa25paHk6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdBZ2VuZHlLbmloeUR0b1tdO1xyXG4gICAgICAgIHByb3RlY3RlZCB0eXA6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgYWdlbmRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBvYmRGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAvLyBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuSW51Lkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiU3RhdiB1esOhdsSbcmt5IGFnZW5kIGEga25paFwiO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIGFnZW5kXCIsIHRoaXMubW9kZWxhZyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBhZ2VuZCBrbmloeVwiLCB0aGlzLm1vZGVsa25paHkpO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RFZGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdEbGcuYWxlcnQoXCJEdm9qa2xpa1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YTogR0NhcmRPcHRpb25zW10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhX0NQOiBHQ2FyZE9wdGlvbnNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgaXRlbXRlbXBsYXRlX21lc2ljID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheTsgcGFkZGluZzogNXB4OyB3aWR0aDoyNDBweDsgaGVpZ2h0OjMwMHB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHtiYXJ2YV90eHR9O2hlaWdodDoxMDBweDsgcGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxoNCBzdHlsZT0nY29sb3I6IGJsYWNrOyc+e3R5cF9hZ190eHR9PC9oND5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGg0IHN0eWxlPSdjb2xvcjogYmxhY2s7Jz57YWt0aXZpdGFfdHh0fTwvaDQ+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjI1OXB4OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGI+PHA+e2RhdF96bWVuYV90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD57cG9jZXRPdGV2cmVuYV90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD57cG9jZXRVemF2cmVuYV90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD57cG9jZXRacnVzZW5hX3R4dH08L3A+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxwPntwb2NldFByaXByYXZlbmFfdHh0fTwvcD5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPHA+e3BvY2V0VXphdnJlbmFOZW9kbGl0YV90eHR9PC9wPjwvYj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXRlbXBsYXRlX21lc2ljID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheTsgcGFkZGluZzogNXB4OyB3aWR0aDoyNDBweDsgaGVpZ2h0OjM1MHB4Oyc+XCIgK1xyXG4vLyAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHtiYXJ2YV90eHR9O2hlaWdodDozNDBweDsgcGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdoZWlnaHQ6MzQwcHg7IHBhZGRpbmc6IDVweDsnPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGgyIHN0eWxlPSdjb2xvcjoge2JhcnZhX3R4dH07Jz57emtyX2FnfSAtIHt0eXBfYWdfdHh0fTwvaDI+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aDQgc3R5bGU9J2NvbG9yOiB7YmFydmFfdHh0fTsnPntha3Rpdml0YV90eHR9PC9oND5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxiPjxwPntkYXRfem1lbmFfdHh0fTwvcD5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxwPntwb2NldE90ZXZyZW5hX3R4dH08L3A+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8cD57cG9jZXRVemF2cmVuYV90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHA+e3BvY2V0WnJ1c2VuYV90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHA+e3BvY2V0UHJpcHJhdmVuYV90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHA+e3BvY2V0VXphdnJlbmFOZW9kbGl0YV90eHR9PC9wPjwvYj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuICAgICAgICAgICAgLy9kYXRhIHBybyBqZWRub3RsaXbDoSBLUElcclxuICAgICAgICAgICAgdmFyIE1lc2ljZURhdGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29kb2JkWm9ickR0b1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciByb3cgaW4gdGhpcy5tb2RlbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgT2Jkb2JpRGF0YVJhZGVrOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvZG9iZFpvYnJEdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgIHZhciBPYmRvYmlEYXRhUmFkZWtEYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvZG9iZFpvYnJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBPYmRvYmlEYXRhUmFkZWtEYXRhID0gdGhpcy5tb2RlbGFnW3Jvd107XHJcbiAgICAgICAgICAgICAgICBPYmRvYmlEYXRhUmFkZWtEYXRhID0gdGhhdC5uYXBsbl9vYmRvYmkoT2Jkb2JpRGF0YVJhZGVrRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBPYmRvYmlEYXRhUmFkZWsgPSBPYmRvYmlEYXRhUmFkZWtEYXRhO1xyXG4gICAgICAgICAgICAgICAgTWVzaWNlRGF0YS5wdXNoKE9iZG9iaURhdGFSYWRlayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL25hcGxuxJtuw60gS1BJIGRvIGNhcmRwYW5lbHVcclxuICAgICAgICAgICAgLy8gJChcIjxkaXYgc3R5bGU9J3dpZHRoOjEyNTBweCc+XCIpLmFwcGVuZFRvKGNudC5lbGVtZW50KS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oY250LmVsZW1lbnQpLmdjYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJTZXpuYW0gYWdlbmRcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogaXRlbXRlbXBsYXRlX21lc2ljLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IE1lc2ljZURhdGEsXHJcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLm9iZEZvcm0sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KS5ndGFiKHsgdGl0bGU6IFwiU3RhdiB1esOhdsSbcmt5IGFnZW5kIGEga25paFwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkgXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyBtaW5pbWFsSGVpZ2h0OiA2MjAgfSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHsgdGl0bGU6IFwiUMWZZWhsZWQga25paCBhZ2VuZHlcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCIhZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgXCJncm91cGluZ1wiOiBcInR5cF9hZ190eHRcIiwgXCJjb2x1bW5zXCI6IHsgXCJ0eXBfYWdfdHh0XCI6IHsgXCJncm91cGluZ1wiOiB7IFwiZGVmYXVsdFN0YXRlXCI6IFwib3BlblwiIH0gfSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1widWNzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFnZW5kYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidHlwX2FnX3R4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2IGtuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3puw6Fta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLm1vZGVsa25paHkpO1xyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFwbG5fb2Jkb2JpKGRhdGFfb2Jkb2JpOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvZG9iZFpvYnJEdG8pIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGFfb2Jkb2JpLmJhcnZhX3R4dCA9IChkYXRhX29iZG9iaS5zdGF2X3V6YXZyZW5pID09IDEwMCA/ICdTZWFHcmVlbicgOiAoZGF0YV9vYmRvYmkuc3Rhdl91emF2cmVuaSA9PSA1MDAgPyAnSW5kaWFuUmVkJyA6ICdZZWxsb3cnKSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0YV9vYmRvYmkuYWt0aXZpdGFfdHh0ID0gKGRhdGFfb2Jkb2JpLnNfdXphdiA9PSAxMDAgPyAnT3RldsWZZW5vJyA6ICdVemF2xZllbm8nKTtcclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuYWt0aXZpdGFfdHh0ID0gZGF0YV9vYmRvYmkuc3Rhdl9hZztcclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuYWt0aXZpdGFfY29sb3IgPSAoZGF0YV9vYmRvYmkuc3Rhdl91emF2cmVuaSA9PSAxMDAgPyAnYmxhY2snIDogJ3JlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9kYXRhX29iZG9iaS5kYXRfem1lbmFfdHh0ID0gJyc7XHJcbiAgICAgICAgICAgIGlmICgoZGF0YV9vYmRvYmkucG9jZXRPdGV2cmVuYSEgKyBkYXRhX29iZG9iaS5wb2NldFByaXByYXZlbmEhICsgZGF0YV9vYmRvYmkucG9jZXRVemF2cmVuYSEgKyBkYXRhX29iZG9iaS5wb2NldFV6YXZyZW5hTmVvZGxpdGEhICsgZGF0YV9vYmRvYmkucG9jZXRacnVzZW5hISkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YV9vYmRvYmkuZGF0X3ptZW5hX3R4dCA9ICdLbmloeSdcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0T3RldnJlbmFfdHh0ID0gXCJPdGV2xZllbm86IFwiICsgZGF0YV9vYmRvYmkucG9jZXRPdGV2cmVuYTtcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0VXphdnJlbmFfdHh0ID0gXCJVemF2xZllbm86IFwiICsgZGF0YV9vYmRvYmkucG9jZXRVemF2cmVuYTtcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0WnJ1c2VuYV90eHQgPSBcIlpydcWhZW5vOiBcIiArIGRhdGFfb2Jkb2JpLnBvY2V0WnJ1c2VuYTtcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0UHJpcHJhdmVuYV90eHQgPSBcIlDFmWlwcmF2ZW5vOiBcIiArIGRhdGFfb2Jkb2JpLnBvY2V0UHJpcHJhdmVuYTtcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0VXphdnJlbmFOZW9kbGl0YV90eHQgPSBcIlV6YXbFmWVubyBuZW9kbGl0bzogXCIgKyBkYXRhX29iZG9iaS5wb2NldFV6YXZyZW5hTmVvZGxpdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhX29iZG9iaS5kYXRfem1lbmFfdHh0ID1cIkFnZW5kYSBuZW9ic2FodWplIGtuaWh5XCI7XHJcbiAgICAgICAgICAgICAgICBkYXRhX29iZG9iaS5wb2NldE90ZXZyZW5hX3R4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBkYXRhX29iZG9iaS5wb2NldFV6YXZyZW5hX3R4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBkYXRhX29iZG9iaS5wb2NldFpydXNlbmFfdHh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0UHJpcHJhdmVuYV90eHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZGF0YV9vYmRvYmkucG9jZXRVemF2cmVuYU5lb2RsaXRhX3R4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhX29iZG9iaTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG59Il19