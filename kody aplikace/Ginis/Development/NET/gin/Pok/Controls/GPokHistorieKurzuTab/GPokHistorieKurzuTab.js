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
            let GPokHistorieKurzuTab = class GPokHistorieKurzuTab extends Gordic.GContentBase {
                onContentReady() {
                    this.title = "Historie kurzu";
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "pokHistorieKurzu" })
                        .addSection("")
                        .addRow("Platný od - do")
                        .addField("gintervalbox", {
                        name: "datum",
                        change: function (ev, changeObj) {
                        }
                    });
                    this.filter = $("<div>").appendTo(this.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            this.ziskejData(obj.filter);
                        }
                    });
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [], //this.ziskejData(),   // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp_kur", caption: "ID kurz. lístku" }); //RC 31302226 : Identifikátor
                    gridFormat.addTextColumn({ name: "mena_zkr", caption: "jres:31302124" }); //RC 31302124 : Měna           
                    gridFormat.addTextColumn({ name: "rada_kur", caption: "Řada" });
                    gridFormat.addTextColumn({ name: "puvod_kur_txt", caption: "Původ" });
                    gridFormat.addNumberColumn({ name: "cislo", caption: "Číslo" });
                    gridFormat.addNumberColumn({ name: "rok", caption: "Rok" });
                    gridFormat.addNumberColumn({ name: "mesic", caption: "Měsíc" });
                    gridFormat.addNumberColumn({ name: "den", caption: "Den" });
                    gridFormat.addCurrencyColumn({ name: "kurz_n", caption: "Nákup" });
                    gridFormat.addCurrencyColumn({ name: "kurz_p", caption: "Prodej" });
                    gridFormat.addCurrencyColumn({ name: "kurz_s", caption: "Střed - UCT" });
                    gridFormat.addNumberColumn({ name: "m", caption: "Množství" });
                    gridFormat.addDateColumn({ name: "dat_platnost_od", caption: "Platný od" });
                    gridFormat.addDateTimeColumn({ name: "dat_zmena", caption: "Datum změny" });
                    gridFormat.addTextColumn({ name: "nazev_rf", caption: "Změnu provedl" });
                    return gridFormat;
                }
                ziskejData(filter) {
                    var that = this;
                    that.beginOperation("Načítání kurzu");
                    Gordic.Isl.PokKniha.historieKurzu(rq => {
                        return {
                            filters: {
                                ixp_den: that.ixpDen,
                                platnost_interval: filter
                            }
                        };
                    }).getData().done(function (dto) {
                        var view = new Gordic.Data.View(dto, { key: "ixp_kur" });
                        that.grid.ggrid("setData", view);
                        that.endOperation();
                    });
                }
            };
            GPokHistorieKurzuTab = __decorate([
                Decorators.gcontent
            ], GPokHistorieKurzuTab);
            WebClient.GPokHistorieKurzuTab = GPokHistorieKurzuTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hpc3RvcmllS3VyenVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rSGlzdG9yaWVLdXJ6dVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBbUdmO0FBbkdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1HbkI7SUFuR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1HN0I7UUFuR29CLFdBQUEsU0FBUztZQUcxQixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLE9BQUEsWUFBWTtnQkFNbEQsY0FBYztvQkFFVixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO29CQUU5QixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVwRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQzt5QkFDL0QsVUFBVSxDQUFDLEVBQUUsQ0FBQzt5QkFDZCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxjQUFjLEVBQ3BCO3dCQUNJLElBQUksRUFBRSxPQUFPO3dCQUNiLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTO3dCQUMvQixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFHWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDM0MsWUFBWSxDQUFDO3dCQUNULEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDbkIsY0FBYyxFQUFFLGNBQWMsQ0FBQyxNQUFNO3dC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YkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rSGlzdG9yaWVLdXJ6dVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgaXhwRGVuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiSGlzdG9yaWUga3VyenVcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgZGVmYXVsdEFjdGlvbjogdHJ1ZSB9XSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicG9rSGlzdG9yaWVLdXJ6dVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBsYXRuw70gb2QgLSBkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtoZWFkZXJGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnppc2tlakRhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSwvL3RoaXMuemlza2VqRGF0YSgpLCAgIC8vIHRoaXMubW9kZWxQb2xvemt5WzBdICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCJ7YWN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNlYXJjaENvbHVtbnM6IFtcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cF9rdXJcIiwgY2FwdGlvbjogXCJJRCBrdXJ6LiBsw61zdGt1XCIgfSk7IC8vUkMgMzEzMDIyMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm1lbmFfemtyXCIsIGNhcHRpb246IFwianJlczozMTMwMjEyNFwiIH0pOyAvL1JDIDMxMzAyMTI0IDogTcSbbmEgICAgICAgICAgIFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInJhZGFfa3VyXCIsIGNhcHRpb246IFwixZhhZGFcIiB9KTsgICAgICAgIFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInB1dm9kX2t1cl90eHRcIiwgY2FwdGlvbjogXCJQxa92b2RcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcImNpc2xvXCIsIGNhcHRpb246IFwixIzDrXNsb1wiIH0pOyBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJva1wiLCBjYXB0aW9uOiBcIlJva1wiIH0pOyAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJtZXNpY1wiLCBjYXB0aW9uOiBcIk3Em3PDrWNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcImRlblwiLCBjYXB0aW9uOiBcIkRlblwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJrdXJ6X25cIiwgY2FwdGlvbjogXCJOw6FrdXBcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7IG5hbWU6IFwia3Vyel9wXCIsIGNhcHRpb246IFwiUHJvZGVqXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImt1cnpfc1wiLCBjYXB0aW9uOiBcIlN0xZllZCAtIFVDVFwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwibVwiLCBjYXB0aW9uOiBcIk1ub8W+c3R2w61cIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfcGxhdG5vc3Rfb2RcIiwgY2FwdGlvbjogXCJQbGF0bsO9IG9kXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2X3JmXCIsIGNhcHRpb246IFwiWm3Em251IHByb3ZlZGxcIiB9KTtcclxuICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6Fuw60ga3VyenVcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rS25paGEuaGlzdG9yaWVLdXJ6dShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5peHBEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRub3N0X2ludGVydmFsOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLmRvbmUoZnVuY3Rpb24gKGR0bzogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0hpc3RvcmllS3VyenVEdG9bXSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLCB7IGtleTogXCJpeHBfa3VyXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==