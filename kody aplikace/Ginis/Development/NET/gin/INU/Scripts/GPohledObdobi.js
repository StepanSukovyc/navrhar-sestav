"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GPohledObdobi.js                                                        </Name>
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
            let GPohledObdobi = class GPohledObdobi extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Přehled práce s obdobími";
                }
                // private globals = Gordic.Inu.Globals.GAdaGlobals;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    this.title = "Přehled práce s obdobími";
                    console.log("Data období" + this.agenda, this.modeluct);
                    console.log("Data období" + this.agenda, this.modelroz);
                    $tab.empty();
                    var cnt = this;
                    //  var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    var actEdit = new GAction({
                        name: "dblclick",
                        run: function (ev, ctx) {
                            GDlg.alert("Dvojklik");
                            // ctx.cellInfo.data
                        }
                    });
                    var $mainTable = $("<div>")
                        .css("height", "50%")
                        .appendTo(this.element)
                        //.gautofit()
                        .gtab({
                        title: "Měsíční období účetnictví", opened: true, locked: false,
                    })
                        .ggrid({
                        columnMode: "fit",
                        searchColumns: ["ucs"],
                        sort: "!dat_zmena",
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "lic",
                            caption: "Lic",
                            width: 10
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: "UCS",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "rok",
                            caption: "Rok",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "mesic",
                            caption: "Měsíc",
                            width: 10
                        })
                            .addTextColumn({
                            name: "akce_obd_txt",
                            caption: "Operace",
                            width: 20
                        })
                            .addTextColumn({
                            name: "nazev_ref",
                            caption: "Provedl",
                            width: 30
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Provedeno",
                            width: 10
                        })
                    });
                    var $mainTable2 = $("<div>")
                        //.css("height", "50%")
                        .appendTo(this.element)
                        .gautofit()
                        .gtab({
                        title: "Měsíční období rozpočtu", opened: true, locked: false,
                    })
                        .ggrid({
                        columnMode: "fit",
                        searchColumns: ["ucs"],
                        sort: "!dat_zmena",
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "lic",
                            caption: "Lic",
                            width: 10
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: "UCS",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "rok",
                            caption: "Rok",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "mesic",
                            caption: "Měsíc",
                            width: 10
                        })
                            .addTextColumn({
                            name: "akce_obd_txt",
                            caption: "Operace",
                            width: 20
                        })
                            .addTextColumn({
                            name: "nazev_ref",
                            caption: "Provedl",
                            width: 30
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Provedeno",
                            width: 10
                        })
                    });
                    var view = new Gordic.Data.View(this.modeluct);
                    $mainTable.ggrid("setData", view, true);
                    var view2 = new Gordic.Data.View(this.modelroz);
                    $mainTable2.ggrid("setData", view2, true);
                }
            };
            GPohledObdobi = __decorate([
                gcontent
            ], GPohledObdobi);
            WebClient.GPohledObdobi = GPohledObdobi;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaGxlZE9iZG9iaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2hsZWRPYmRvYmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FvSmY7QUFwSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0puQjtJQXBKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb0o3QjtRQXBKb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFBL0M7O29CQUVJLFVBQUssR0FBRywwQkFBMEIsQ0FBQztnQkE2SXZDLENBQUM7Z0JBdElHLG9EQUFvRDtnQkFFcEQsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUM7b0JBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFeEQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFHakIsc0lBQXNJO29CQUVwSSxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDdEIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFD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WCxJQUFJLEVBQUUsY0FBYzs0QkFDcEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsS0FBSyxFQUFFLEVBQUU7eUJBQ1osQ0FBQzs2QkFDRCxpQkFBaUIsQ0FBQzs0QkFDZixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7cUJBQ1QsQ0FBQyxDQUFDO29CQUVQLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvQyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRXhDLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNoRCxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTlDLENBQUM7YUFFSixDQUFBO1lBL0lZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBK0l6QjtZQS9JWSx1QkFBYSxnQkErSXpCLENBQUE7UUFDTCxDQUFDLEVBcEpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvSjdCO0lBQUQsQ0FBQyxFQXBKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0puQjtBQUFELENBQUMsRUFwSlMsTUFBTSxLQUFOLE1BQU0sUUFvSmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR1BvaGxlZE9iZG9iaS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9obGVkT2Jkb2JpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlDFmWVobGVkIHByw6FjZSBzIG9iZG9iw61taVwiO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWx1Y3Q6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29sb2JkRHRvW107XHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVscm96OiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvbG9iZER0b1tdO1xyXG4gICAgICAgIHByb3RlY3RlZCB0eXA6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgYWdlbmRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBvYmRGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAvLyBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuSW51Lkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUMWZZWhsZWQgcHLDoWNlIHMgb2Jkb2LDrW1pXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgb2Jkb2LDrVwiICsgdGhpcy5hZ2VuZGEsIHRoaXMubW9kZWx1Y3QpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgb2Jkb2LDrVwiICsgdGhpcy5hZ2VuZGEsIHRoaXMubW9kZWxyb3opO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgIC8vICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RFZGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdEbGcuYWxlcnQoXCJEdm9qa2xpa1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiNTAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLy8uZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk3Em3PDrcSNbsOtIG9iZG9iw60gw7rEjWV0bmljdHbDrVwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInVjc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXRfem1lbmFcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJMaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVQ1NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNxJtzw61jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha2NlX29iZF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3BlcmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb3ZlZGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlMiA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiNTAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJNxJtzw63EjW7DrSBvYmRvYsOtIHJvenBvxI10dVwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInVjc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXRfem1lbmFcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJMaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVQ1NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNxJtzw61jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha2NlX29iZF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3BlcmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvdmVkZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLm1vZGVsdWN0KTtcclxuICAgICAgICAgICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdmlldywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlldzIgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLm1vZGVscm96KTtcclxuICAgICAgICAgICAgJG1haW5UYWJsZTIuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gICAgXHJcbn0iXX0=