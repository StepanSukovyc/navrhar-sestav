"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GImportDatChyby.js                                                        </Name>
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
            let GImportDatChyby = class GImportDatChyby extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Import dat";
                    this.init = true;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    that.title = that.model_typ == "UCT" ? "Výsledek importu dat UCT" : "Výsledek importu dat ROZ";
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    this.actions.addRange({
                        actTisk: {
                            caption: "Tisk", //icon: "gi-plus",
                            run: () => {
                                // return that.export();
                            }
                        }
                    });
                    this.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actClose*"]));
                    this.commandBar(this.actions.createBar(["actClose"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", {
                        layoutDescriptor: "L1M1S1 LMS-0-12-0",
                    }).gformsection("create");
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "txt_err",
                        caption: "Chyba",
                        width: 150
                    });
                    gridFormat.addTextColumn({
                        name: "ucs",
                        caption: Gordic.Consts.DbShortcuts.ucs, //this.GlobalParams.Zkratky?.Nks,
                        width: 80
                    });
                    gridFormat.addTextColumn({
                        name: "nks",
                        caption: Gordic.Consts.DbShortcuts.nks, //this.GlobalParams.Zkratky?.Nks,
                        width: 80
                    });
                    gridFormat.addTextColumn({
                        name: "uus",
                        caption: Gordic.Consts.DbShortcuts.uus, //this.GlobalParams.Zkratky?.Nks,
                        width: 80
                    });
                    Gordic.Eko.Grid.Column.addRok(gridFormat, { name: "rok" });
                    Gordic.Eko.Grid.Column.addMesic(gridFormat, { name: "mesic" });
                    Gordic.Eko.Grid.Column.addDen(gridFormat, { name: "den" });
                    Gordic.Eko.Grid.Column.addDruhDokladu(gridFormat, { name: "drd" });
                    Gordic.Eko.Grid.Column.addCisloDokladu(gridFormat, { name: "ac", field: "ac", width: 120 });
                    gridFormat.addNumberColumn({
                        name: "radek_z",
                        caption: "jres:30250191", //RC 30250191 : Řádek
                        width: 40
                    });
                    gridFormat.addSortedEkoCfuSet(this, { isEditable: false })
                        .addCurrencyColumn({
                        name: "c0",
                        //structureLead:true,
                        caption: "jres:30250237", //RC 30250237 : MD
                        width: 110,
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250284", //RC 30250284 : Dal
                        width: 110,
                    });
                    gridFormat.addTextColumn({
                        name: "popis",
                        caption: "Popis",
                        width: 300
                    });
                    var $mainTable = $("<div class='js-SeznamDavekChyby'>").appendTo(this.element)
                        .gautofit() //místo nastavení výšky se používá gautofit
                        .ggrid({
                        columnMode: "full",
                        searchColumns: ["popis"],
                        data: this.model_data,
                        selection: function (ev, o) {
                        },
                        columns: gridFormat
                    });
                    //    that.view_ISL = new Gordic.Isl.View(this.isl.InuDavka.list({ filters: { typ: that.model_typ } }));
                    //    $mainTable.ggrid("setData", that.view_ISL);
                }
            };
            GImportDatChyby = __decorate([
                gcontent
            ], GImportDatChyby);
            WebClient.GImportDatChyby = GImportDatChyby;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0ltcG9ydERhdENoeWJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0ltcG9ydERhdENoeWJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBZ0pmO0FBaEpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdKbkI7SUFoSmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdKN0I7UUFoSm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQUFqRDs7b0JBRUksVUFBSyxHQUFHLFlBQVksQ0FBQztvQkFRWCxTQUFJLEdBQUcsSUFBSSxDQUFDO29CQVdkLFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBc0hyRCxDQUFDO2dCQXBIRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDO29CQUUvRix1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUM7d0JBQ2hCOzRCQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFDbkIsYUFBYSxFQUFFLElBQUk7eUJBQ3RCO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFOzRCQUNMLE9BQU8sRUFBRSxNQUFNLEVBQUUsa0JBQWtCOzRCQUNuQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLHdCQUF3Qjs0QkFDNUIsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JB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LFFBZ0puQjtBQUFELENBQUMsRUFoSlMsTUFBTSxLQUFOLE1BQU0sUUFnSmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdENoeWJ5LmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR1ByZXBvY3R5U3RhdnUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdJbXBvcnREYXRDaHlieSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJJbXBvcnQgZGF0XCI7IFxyXG5cclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0bz47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTF96YXBpc3k6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0bz47XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbF9kYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HVWN0ZHh3YUR0b1tdO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW5pdCA9IHRydWU7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsX3R5cDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBhZ2VuZGE6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByb3RlY3RlZCBGb3JtX0RhdmthOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcm90ZWN0ZWQgYWt0X2RhdmthIDogR29yZGljLkludS5JbnRlcmZhY2UuR0ludXNpbXBEdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIGFrdF9uZXdfZGF2a2E6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVzaW1wRHRvO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IHRoYXQubW9kZWxfdHlwID09IFwiVUNUXCIgPyBcIlbDvXNsZWRlayBpbXBvcnR1IGRhdCBVQ1RcIiA6IFwiVsO9c2xlZGVrIGltcG9ydHUgZGF0IFJPWlwiO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGJyZWFkY3J1bWJzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGF0LmV4cG9ydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlKlwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIsXHJcbiAgICAgICAgICAgIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidHh0X2VyclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDaHliYVwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51Y3MsLy90aGlzLkdsb2JhbFBhcmFtcy5aa3JhdGt5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzLC8vdGhpcy5HbG9iYWxQYXJhbXMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1cywvL3RoaXMuR2xvYmFsUGFyYW1zLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJyb2tcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZXNpYyhncmlkRm9ybWF0LCB7IG5hbWU6IFwibWVzaWNcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREZW4oZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImRlblwiIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZERydWhEb2tsYWR1KGdyaWRGb3JtYXQsIHsgbmFtZTogXCJkcmRcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRDaXNsb0Rva2xhZHUoZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImFjXCIsIGZpZWxkOiBcImFjXCIsIHdpZHRoOiAxMjAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3pcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE5MVwiLCAvL1JDIDMwMjUwMTkxIDogxZjDoWRla1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcywgeyBpc0VkaXRhYmxlOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL01EXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RydWN0dXJlTGVhZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIzN1wiLCAvL1JDIDMwMjUwMjM3IDogTURcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy8gREFMXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI4NFwiLCAvL1JDIDMwMjUwMjg0IDogRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXYgY2xhc3M9J2pzLVNlem5hbURhdmVrQ2h5YnknPlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKSAvL23DrXN0byBuYXN0YXZlbsOtIHbDvcWha3kgc2UgcG91xb7DrXbDoSBnYXV0b2ZpdFxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJwb3Bpc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLm1vZGVsX2RhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuSW51RGF2a2EubGlzdCh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0Lm1vZGVsX3R5cCB9IH0pKTtcclxuXHJcbiAgICAgICAgLy8gICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19