"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GPohledAgendyUzav.js                                                        </Name>
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
            let GPohledAgendyUzav = class GPohledAgendyUzav extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Přehled uzavřených agend";
                }
                // private globals = Gordic.Inu.Globals.GAdaGlobals;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    this.title = "Přehled uzavřených agend";
                    console.log("Data agend", this.modelag);
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
                    var itemtemplate_mesic = "<div style='border:1px solid LightGray; padding: 5px; width:260px; height:150px;'>" +
                        //                "<div style='background-color: {barva_txt};height:100px; padding: 5px;'>" +
                        "<div style='height:30px; padding: 5px;'>" +
                        "<h3><i style='color: {barva_txt};' aria-hidden='true'></i>{zkr_ag} - {typ_ag_txt}</h3>" +
                        "</div><div style='width:240px; padding: 5px;'>" +
                        "<h3 style='color: {aktivita_color};'>{aktivita_txt}</h3>" +
                        "<h3 style='color: {aktivita_color};'>{dat_zmena_txt}</h3>" +
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
                    $("<div>").appendTo(cnt.element).gcardpanel({
                        sortable: false,
                        editable: true,
                        title: "Seznam agend",
                        itemTemplate: itemtemplate_mesic,
                        data: MesiceData,
                        form: this.obdForm,
                        createTab: false
                    }).gtab({ title: "Přehled uzavřených agend", opened: true, locked: true });
                    ;
                    //if (this.modelag.length != 0) {
                    //    var $mainTable = $("<div>")
                    //        .appendTo(this.element)
                    //        .gautofit()
                    //        .ggrid({
                    //            columnMode: "fit",
                    //            sort: "!dat_zmena",
                    //            searchColumns: ["ucs"],
                    //            columns: new Gordic.Data.GridFormat()
                    //                .addTextColumn({
                    //                    name: "typ_ag_txt",
                    //                    caption: "Agenda",
                    //                    width: 20
                    //                })
                    //                .addDateTimeColumn({
                    //                    name: "dat_zmena",
                    //                    caption: "Provedeno",
                    //                    width: 15
                    //                })
                    //                .addTextColumn({
                    //                    name: "nazev_ref",
                    //                    caption: "Provedl",
                    //                    width: 40
                    //                })
                    //        });
                    //    var view = new Gordic.Data.View(this.modelag);
                    //    $mainTable.ggrid("setData", view, true);
                    //}
                }
                napln_obdobi(data_obdobi) {
                    data_obdobi.barva_txt = (data_obdobi.s_uzav == 100 ? 'SeaGreen' : 'IndianRed');
                    data_obdobi.aktivita_txt = (data_obdobi.s_uzav == 100 ? 'Otevřeno' : 'Uzavřeno');
                    data_obdobi.aktivita_color = (data_obdobi.s_uzav == 100 ? 'black' : 'red');
                    if (data_obdobi.dat_zmena_txt != null) {
                        data_obdobi.dat_zmena_txt = '(' + Gordic.Templates.Formatters.datetime(data_obdobi.dat_zmena, "dd.MM.yyyy") + ')';
                    }
                    else {
                        data_obdobi.dat_zmena_txt = '';
                    }
                    return data_obdobi;
                }
            };
            GPohledAgendyUzav = __decorate([
                gcontent
            ], GPohledAgendyUzav);
            WebClient.GPohledAgendyUzav = GPohledAgendyUzav;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaGxlZEFnZW5keVV6YXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9obGVkQWdlbmR5VXphdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQTRIZjtBQTVIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0SG5CO0lBNUhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0SDdCO1FBNUhvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBWTtnQkFBbkQ7O29CQUVJLFVBQUssR0FBRywwQkFBMEIsQ0FBQztnQkFxSHZDLENBQUM7Z0JBL0dHLG9EQUFvRDtnQkFFcEQsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUM7b0JBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFeEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFHZixvSUFBb0k7b0JBRXBJLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUN0QixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ3ZCLG9CQUFvQjt3QkFDeEIsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztv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QyxHQUFHLEdBQUcsQ0FBQztvQkFDdEgsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLFdBQVcsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO29CQUVuQyxDQUFDO29CQUVELE9BQU8sV0FBVyxDQUFDO2dCQUN2QixDQUFDO2FBQ0osQ0FBQTtZQXZIWSxpQkFBaUI7Z0JBRDdCLFFBQVE7ZUFDSSxpQkFBaUIsQ0F1SDdCO1lBdkhZLDJCQUFpQixvQkF1SDdCLENBQUE7UUFDTCxDQUFDLEVBNUhvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0SDdCO0lBQUQsQ0FBQyxFQTVIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNEhuQjtBQUFELENBQUMsRUE1SFMsTUFBTSxLQUFOLE1BQU0sUUE0SGYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR1BvaGxlZEFnZW5keVV6YXYuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHUHJlcG9jdHlTdGF2dSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BvaGxlZEFnZW5keVV6YXYgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiUMWZZWhsZWQgdXphdsWZZW7DvWNoIGFnZW5kXCI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbGFnOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvZG9iZFpvYnJEdG9bXTtcclxuICAgICAgICBwcm90ZWN0ZWQgdHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZW5kYTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgb2JkRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDFmWVobGVkIHV6YXbFmWVuw71jaCBhZ2VuZFwiO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIGFnZW5kXCIsIHRoaXMubW9kZWxhZyk7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRibGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGN0eC5jZWxsSW5mby5kYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhOiBHQ2FyZE9wdGlvbnNbXSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFfQ1A6IEdDYXJkT3B0aW9uc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXRlbXBsYXRlX21lc2ljID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheTsgcGFkZGluZzogNXB4OyB3aWR0aDoyNjBweDsgaGVpZ2h0OjE1MHB4Oyc+XCIgK1xyXG4vLyAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHtiYXJ2YV90eHR9O2hlaWdodDoxMDBweDsgcGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdoZWlnaHQ6MzBweDsgcGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8aDM+PGkgc3R5bGU9J2NvbG9yOiB7YmFydmFfdHh0fTsnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+e3prcl9hZ30gLSB7dHlwX2FnX3R4dH08L2gzPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+PGRpdiBzdHlsZT0nd2lkdGg6MjQwcHg7IHBhZGRpbmc6IDVweDsnPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGgzIHN0eWxlPSdjb2xvcjoge2FrdGl2aXRhX2NvbG9yfTsnPntha3Rpdml0YV90eHR9PC9oMz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxoMyBzdHlsZT0nY29sb3I6IHtha3Rpdml0YV9jb2xvcn07Jz57ZGF0X3ptZW5hX3R4dH08L2gzPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICAvL2RhdGEgcHJvIGplZG5vdGxpdsOhIEtQSVxyXG4gICAgICAgICAgICB2YXIgTWVzaWNlRGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2RvYmRab2JyRHRvW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyBpbiB0aGlzLm1vZGVsYWcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBPYmRvYmlEYXRhUmFkZWs6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29kb2JkWm9ickR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFyIE9iZG9iaURhdGFSYWRla0RhdGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29kb2JkWm9ickR0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIE9iZG9iaURhdGFSYWRla0RhdGEgPSB0aGlzLm1vZGVsYWdbcm93XTtcclxuICAgICAgICAgICAgICAgIE9iZG9iaURhdGFSYWRla0RhdGEgPSB0aGF0Lm5hcGxuX29iZG9iaShPYmRvYmlEYXRhUmFkZWtEYXRhKTtcclxuICAgICAgICAgICAgICAgIE9iZG9iaURhdGFSYWRlayA9IE9iZG9iaURhdGFSYWRla0RhdGE7XHJcbiAgICAgICAgICAgICAgICBNZXNpY2VEYXRhLnB1c2goT2Jkb2JpRGF0YVJhZGVrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFwbG7Em27DrSBLUEkgZG8gY2FyZHBhbmVsdVxyXG4gICAgICAgICAgICAvLyAkKFwiPGRpdiBzdHlsZT0nd2lkdGg6MTI1MHB4Jz5cIikuYXBwZW5kVG8oY250LmVsZW1lbnQpLmdjYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY250LmVsZW1lbnQpLmdjYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJTZXpuYW0gYWdlbmRcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogaXRlbXRlbXBsYXRlX21lc2ljLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogTWVzaWNlRGF0YSxcclxuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMub2JkRm9ybSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRhYjogZmFsc2VcclxuICAgICAgICAgICAgfSkuZ3RhYih7IHRpdGxlOiBcIlDFmWVobGVkIHV6YXbFmWVuw71jaCBhZ2VuZFwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSB9KTs7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9pZiAodGhpcy5tb2RlbGFnLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgLy8gICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBzb3J0OiBcIiFkYXRfem1lbmFcIixcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1widWNzXCJdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdfdHh0XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFnZW5kYVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQcm92ZWRlbm9cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3JlZlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQcm92ZWRsXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLm1vZGVsYWcpO1xyXG4gICAgICAgICAgICAvLyAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LCB0cnVlKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXBsbl9vYmRvYmkoZGF0YV9vYmRvYmk6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29kb2JkWm9ickR0bykge1xyXG5cclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuYmFydmFfdHh0ID0gKGRhdGFfb2Jkb2JpLnNfdXphdiA9PSAxMDAgPyAnU2VhR3JlZW4nIDogJ0luZGlhblJlZCcpO1xyXG4gICAgICAgICAgICBkYXRhX29iZG9iaS5ha3Rpdml0YV90eHQgPSAoZGF0YV9vYmRvYmkuc191emF2ID09IDEwMCA/ICdPdGV2xZllbm8nIDogJ1V6YXbFmWVubycpO1xyXG4gICAgICAgICAgICBkYXRhX29iZG9iaS5ha3Rpdml0YV9jb2xvciA9IChkYXRhX29iZG9iaS5zX3V6YXYgPT0gMTAwID8gJ2JsYWNrJyA6ICdyZWQnKTtcclxuICAgICAgICAgICAgaWYgKGRhdGFfb2Jkb2JpLmRhdF96bWVuYV90eHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YV9vYmRvYmkuZGF0X3ptZW5hX3R4dCA9ICcoJyArIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShkYXRhX29iZG9iaS5kYXRfem1lbmEsIFwiZGQuTU0ueXl5eVwiKSArICcpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLmRhdF96bWVuYV90eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhX29iZG9iaTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG59Il19