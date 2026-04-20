"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokKontChodResultTab = class GPokKontChodResultTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.grid =
                        $("<div>").appendTo(this.element)
                            .ggrid({
                            data: this.data, // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                            columnMode: "fit", // fit, full
                            navigationMode: "row", // row, cell
                            rowNumbers: false,
                            columns: new Gordic.Data.GridFormat()
                                .addNumberColumn({
                                name: "cislo_radku",
                                caption: "#",
                                sortable: false,
                                width: 20
                            })
                                .addSortedEkoCfuSet(this, true)
                                .addTextColumn({
                                name: "nks",
                                caption: "jres:31302118", //RC 31302118 : NKS
                                sortable: false
                            })
                                .addNumberColumn({
                                name: "c0",
                                caption: "jres:31302500", //RC 31302500 : MD
                                sortable: false,
                            })
                                .addNumberColumn({
                                name: "c1",
                                caption: "jres:31302499", //RC 31302499 : Dal
                                sortable: false,
                            })
                                .addTextColumn({
                                name: "txt_err",
                                caption: "jres:31302322", //RC 31302322 : Popis chyby
                                sortable: false,
                                width: 300
                            })
                        });
                }
            };
            GPokKontChodResultTab = __decorate([
                Decorators.gcontent
            ], GPokKontChodResultTab);
            WebClient.GPokKontChodResultTab = GPokKontChodResultTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0tvbnRDaG9kUmVzdWx0VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0tvbnRDaG9kUmVzdWx0VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0FzRGY7QUF0REQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0RuQjtJQXREZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc0Q3QjtRQXREb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsT0FBQSxZQUFZO2dCQUtuRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLElBQUk7d0JBQ0wsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzZCQUNoQyxLQUFLLENBQUM7NEJBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUkseUlBQXlJOzRCQUN4SixVQUFVLEVBQUUsTUFBTSxFQUFNLDZDQUE2Qzs0QkFDckUsVUFBVSxFQUFFLEtBQUssRUFBTyxZQUFZOzRCQUNwQyxjQUFjLEVBQUUsS0FBSyxFQUFFLFlBQVk7NEJBQ25DLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtpQ0FDaEMsZUFBZSxDQUNaO2dDQUNJLElBQUksRUFBRSxhQUFhO2dDQUNuQixPQUFPLEVBQUUsR0FBRztnQ0FDWixRQUFRLEVBQUUsS0FBSztnQ0FDZixLQUFLLEVBQUUsRUFBRTs2QkFDWixDQUFDO2lDQUNMLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7aUNBQzlCLGFBQWEsQ0FBQztnQ0FDWCxJQUFJLEVBQUUsS0FBSztnQ0FDWCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjtnQ0FDN0MsUUFBUSxFQUFFLEtBQUs7NkJBQ2xCLENBQUM7aUNBQ0QsZUFBZSxDQUFDO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO2dDQUM1QyxRQUFRLEVBQUUsS0FBSzs2QkFDbEIsQ0FBQztpQ0FDRCxlQUFlLENBQUM7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7Z0NBQzdDLFFBQVEsRUFBRSxLQUFLOzZCQUNsQixDQUFDO2lDQUNELGFBQWEsQ0FBQztnQ0FDWCxJQUFJLEVBQUUsU0FBUztnQ0FDZixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjtnQ0FDckQsUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsS0FBSyxFQUFFLEdBQUc7NkJBQ2IsQ0FBQzt5QkFDVCxDQUFDLENBQUM7Z0JBRWYsQ0FBQzthQUNSLENBQUE7WUFsRGdCLHFCQUFxQjtnQkFEakMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxxQkFBcUIsQ0FrRHJDO1lBbERnQiwrQkFBcUIsd0JBa0RyQyxDQUFBO1FBQ0QsQ0FBQyxFQXREb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc0Q3QjtJQUFELENBQUMsRUF0RGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNEbkI7QUFBRCxDQUFDLEVBdERTLE1BQU0sS0FBTixNQUFNLFFBc0RmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rS29udENob2RSZXN1bHRUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9XHJcbiAgICAgICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsICAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9fcmFka3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjExOFwiLCAvL1JDIDMxMzAyMTE4IDogTktTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjUwMFwiLCAvL1JDIDMxMzAyNTAwIDogTURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjQ5OVwiLCAvL1JDIDMxMzAyNDk5IDogRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR4dF9lcnJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIzMjJcIiwgLy9SQyAzMTMwMjMyMiA6IFBvcGlzIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxufVxyXG59XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG4iXX0=