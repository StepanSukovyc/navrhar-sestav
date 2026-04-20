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
            let GPokParovaciZapisyTab = class GPokParovaciZapisyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Párovací zápisy pokladního dokladu " + this.ixp;
                    var tabmanager = $("<div>")
                        .appendTo(this.element)
                        .gtabmanager({
                        groups: [
                            {
                                id: "groupParovaciZapis",
                                caption: "Párovací zápisy"
                            },
                            {
                                id: "groupUcetniZapisy",
                                caption: "Účetní zápisy druhého kroku"
                            }
                        ],
                        scopeElement: this.element
                    });
                    //Skupina párovací zápisy
                    let groupParovaciZapisy = $("<div>").appendTo(this.element)
                        .ggroupable({
                        group: { id: "groupParovaciZapis" },
                        conceal: function (ev, ctx) {
                            if (ctx.conceal)
                                groupParovaciZapisy.addClass("concealed");
                            else
                                groupParovaciZapisy.removeClass("concealed");
                        }
                    });
                    //Skupina účetní zápisy
                    let groupUcetniZapisy = $("<div>").appendTo(this.element)
                        .ggroupable({
                        group: { id: "groupUcetniZapisy" },
                        conceal: function (ev, ctx) {
                            if (ctx.conceal)
                                groupUcetniZapisy.addClass("concealed");
                            else
                                groupUcetniZapisy.removeClass("concealed");
                        }
                    });
                    let formParovaciZapisy = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" });
                    $("<div>").appendTo(groupParovaciZapisy).gform("createFrom", formParovaciZapisy);
                    this.gridParovaciZapisy = $("<div>").appendTo(groupParovaciZapisy).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.CreateGridFormatParovaciZapisy(),
                        rowNumbers: true,
                    });
                    let formUcetniZapisy = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" });
                    $("<div>").appendTo(groupUcetniZapisy).gform("createFrom", formUcetniZapisy);
                    this.gridUcetPohyb = $("<div>").appendTo(groupUcetniZapisy).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormatUcetPohyb()
                    });
                    this.gridUcetZapis = $("<div>").appendTo(groupUcetniZapisy).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormatUcetZapis()
                    });
                    tabmanager.gtabmanager("refresh");
                    that.nactiParovaciZapisy();
                    that.nactiPohybyParovani();
                    that.nactiZapisyParovani();
                }
                nactiParovaciZapisy() {
                    //v budoucnu nahradit ISL
                    //Gordic.Isl.BankovniVypisPolozka.list(rq => {
                    //    return {
                    //        filters: {
                    //            ixp: "MEHLX000Y1AG", //zatím natvrdo protože nejde filtrovat podle ixp_pok
                    //            s_pol: [10, 20, 25, 40]
                    //        }
                    //    }
                    //})         
                    var that = this;
                    that.beginOperation("Načítání párovacích zápisů");
                    Gordic.Isl.PokDoklad.parovaciZapisy({
                        ixp: that.ixp
                    })
                        .get().done(function (data) {
                        var view = new Gordic.Data.View(data, { key: "ixp" });
                        that.gridParovaciZapisy.ggrid("setData", view);
                        that.endOperation();
                    });
                }
                nactiZapisyParovani() {
                    var that = this;
                    that.beginOperation("Načítání zápisů párování");
                    Gordic.Isl.PokDoklad.ucetniZapisyParovani({
                        ixpPok: that.ixp
                    })
                        .get().done(function (data) {
                        var view = new Gordic.Data.View(data, { key: "ixp" });
                        that.gridUcetZapis.ggrid("setData", view);
                        that.endOperation();
                    });
                }
                nactiPohybyParovani() {
                    var that = this;
                    that.beginOperation("Načítání pohybů párování");
                    Gordic.Isl.PokDoklad.ucetniPohybyParovani({
                        ixpPok: that.ixp
                    })
                        .get().done(function (data) {
                        var view = new Gordic.Data.View(data, { key: "ixp_upr" });
                        that.gridUcetPohyb.ggrid("setData", view);
                        that.endOperation();
                    });
                }
                CreateGridFormatParovaciZapisy() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp", caption: "Identifikátor výpisu" });
                    gridFormat.addNumberColumn({ name: "radek_pol", caption: "Řádek výpisu" });
                    gridFormat.addTextColumn({ name: "vs", caption: "VS" });
                    gridFormat.addTextColumn({ name: "ss", caption: "SS" });
                    gridFormat.addTextColumn({ name: "c", caption: "Částka" });
                    gridFormat.addTextColumn({ name: "s_pol_txt", caption: "Stav párování" });
                    gridFormat.addTextColumn({ name: "nazev", caption: "Název" });
                    gridFormat.addDateColumn({ name: "dat_zap", caption: "Datum zaplacení" });
                    gridFormat.addDateColumn({ name: "dat_par", caption: "Datum párování" });
                    return gridFormat;
                }
                createGridFormatUcetPohyb() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp_upr", caption: "PID případu" });
                    gridFormat.addNumberColumn({ name: "radek_upo", caption: "Řádek pohybu" });
                    gridFormat.addTextColumn({ name: "s_upo_txt", caption: "Stav zaúč. 2. kroku" });
                    gridFormat.addTextColumn({ name: "ac", caption: "AČ" });
                    gridFormat.addCurrencyColumn({ name: "c_upo", caption: "Částka pohybu" });
                    gridFormat.addDateColumn({ name: "dat_upo", caption: "Datum pohybu" });
                    gridFormat.addNumberColumn({ name: "radek", caption: "Řádek položky" });
                    gridFormat.addTextColumn({ name: "kod_kon", caption: "Kód předkontace" });
                    gridFormat.addTextColumn({ name: "nazev", caption: "Název kontace" });
                    gridFormat.addTextColumn({ name: "popis", caption: "Popis" });
                    gridFormat.addTextColumn({ name: "vs", caption: "Pár. sym." });
                    gridFormat.addTextColumn({ name: "ss", caption: "Spec. sym." });
                    gridFormat.addTextColumn({ name: "c_celkem_m", caption: "Částka položky" });
                    return gridFormat;
                }
                createGridFormatUcetZapis() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addNumberColumn({ name: "radek", caption: "Položka" });
                    gridFormat.addNumberColumn({ name: "radek_upo", caption: "Řádek úč. poh." });
                    gridFormat.addNumberColumn({ name: "rok", caption: "Rok" });
                    gridFormat.addNumberColumn({ name: "mesic", caption: "Měsíc" });
                    gridFormat.addNumberColumn({ name: "den", caption: "Den" });
                    gridFormat.addTextColumn({ name: "ac", caption: "Agend. číslo" });
                    gridFormat.addTextColumn({ name: "radek_z", caption: "#" });
                    gridFormat.addTextColumn({ name: "drd", caption: "DRD" }); // RC 2675054 : DRD
                    gridFormat.addTextColumn({ name: "nks", caption: "NS" });
                    gridFormat.addSortedEkoCfuSet(this, true);
                    gridFormat.addCurrencyColumn({ name: "c0", caption: "Má dáti" });
                    gridFormat.addCurrencyColumn({ name: "c1", caption: "Dal" });
                    gridFormat.addNumberColumn({ name: "mesic_uej", caption: "Měsíc DPH" }); // RC 2975005 : Měsíc DPH
                    gridFormat.addNumberColumn({ name: "rok_uej", caption: "Rok DPH" }); // RC 21000035 : Rok DPH
                    gridFormat.addTextColumn({ name: "popis", caption: "Popis" });
                    if (this.prizIISSP != 0) {
                        gridFormat.addTextColumn({ name: "id_hdr_ris", caption: "ID IISSP" }); //RC 3025004 : ID IISSP
                        gridFormat.addNumberColumn({ name: "radek_hdr", caption: "Řádek IISSP" }); //RC 3025005 : Řádek IISSP
                    }
                    gridFormat.addDateTimeColumn({ name: "dat_zmena", caption: "Datum změny" }); //RC 3025010 : Datum změny
                    return gridFormat;
                }
            };
            GPokParovaciZapisyTab = __decorate([
                Decorators.gcontent
            ], GPokParovaciZapisyTab);
            WebClient.GPokParovaciZapisyTab = GPokParovaciZapisyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Bhcm92YWNpWmFwaXN5VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1Bhcm92YWNpWmFwaXN5VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FpT1A7QUFqT1QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaU9YO0lBak9RLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlPckI7UUFqT1ksV0FBQSxTQUFTO1lBRzFCLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsT0FBQSxZQUFZO2dCQVduRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxxQ0FBcUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUU5RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsV0FBVyxDQUFDO3dCQUNULE1BQU0sRUFBRTs0QkFDSjtnQ0FDSSxFQUFFLEVBQUUsb0JBQW9CO2dDQUN4QixPQUFPLEVBQUUsaUJBQWlCOzZCQUM3Qjs0QkFDRDtnQ0FDSSxFQUFFLEVBQUUsbUJBQW1CO2dDQUN2QixPQUFPLEVBQUUsNkJBQTZCOzZCQUN6Qzt5QkFDSjt3QkFDRCxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU87cUJBQzdCLENBQUMsQ0FBQztvQkFJUCx5QkFBeUI7b0JBQ3pCLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0RCxVQUFVLENBQUM7d0JBQ1IsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFO3dCQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDdEIsSUFBSSxHQUFHLENBQUMsT0FBTztn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O29CQUN2RyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFFOUQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUN0QixVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1Qjt3QkFDOUYsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQywwQkFBMEI7b0JBQ3pHLENBQUM7b0JBQ0QsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtvQkFHdkcsT0FBTyxVQUFVLENBQUM7Z0JBRXRCLENBQUM7YUFDSixDQUFBO1lBN05ZLHFCQUFxQjtnQkFEakMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxxQkFBcUIsQ0E2TmpDO1lBN05ZLCtCQUFxQix3QkE2TmpDLENBQUE7UUFDRyxDQUFDLEVBak9ZLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlPckI7SUFBRCxDQUFDLEVBak9RLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlPWDtBQUFELENBQUMsRUFqT0MsTUFBTSxLQUFOLE1BQU0sUUFpT1AiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1Bhcm92YWNpWmFwaXN5VGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZ3JpZFBhcm92YWNpWmFwaXN5OiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkVWNldFBvaHliOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkVWNldFphcGlzOiBKUXVlcnk7ICAgXHJcbiAgICAgICAgcHJpeklJU1NQOiBudW1iZXI7XHJcbiAgICAgICAgaXhwOiBzdHJpbmc7XHJcbiAgICAgIFxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyBcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDDoXJvdmFjw60gesOhcGlzeSBwb2tsYWRuw61obyBkb2tsYWR1IFwiICsgdGhpcy5peHA7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFibWFuYWdlciA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFibWFuYWdlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImdyb3VwUGFyb3ZhY2laYXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQw6Fyb3ZhY8OtIHrDoXBpc3lcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImdyb3VwVWNldG5pWmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsOaxI1ldG7DrSB6w6FwaXN5IGRydWjDqWhvIGtyb2t1XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlRWxlbWVudDogdGhpcy5lbGVtZW50XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9Ta3VwaW5hIHDDoXJvdmFjw60gesOhcGlzeVxyXG4gICAgICAgICAgICBsZXQgZ3JvdXBQYXJvdmFjaVphcGlzeSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5nZ3JvdXBhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncm91cFBhcm92YWNpWmFwaXNcIiB9LFxyXG4gICAgICAgICAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jb25jZWFsKSBncm91cFBhcm92YWNpWmFwaXN5LmFkZENsYXNzKFwiY29uY2VhbGVkXCIpOyBlbHNlIGdyb3VwUGFyb3ZhY2laYXBpc3kucmVtb3ZlQ2xhc3MoXCJjb25jZWFsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL1NrdXBpbmEgw7rEjWV0bsOtIHrDoXBpc3lcclxuICAgICAgICAgICAgbGV0IGdyb3VwVWNldG5pWmFwaXN5ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JvdXBhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncm91cFVjZXRuaVphcGlzeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jb25jZWFsKSBncm91cFVjZXRuaVphcGlzeS5hZGRDbGFzcyhcImNvbmNlYWxlZFwiKTsgZWxzZSBncm91cFVjZXRuaVphcGlzeS5yZW1vdmVDbGFzcyhcImNvbmNlYWxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgIFxyXG4gICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGZvcm1QYXJvdmFjaVphcGlzeSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cFBhcm92YWNpWmFwaXN5KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybVBhcm92YWNpWmFwaXN5KTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkUGFyb3ZhY2laYXBpc3kgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBQYXJvdmFjaVphcGlzeSkuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuQ3JlYXRlR3JpZEZvcm1hdFBhcm92YWNpWmFwaXN5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybVVjZXRuaVphcGlzeSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cFVjZXRuaVphcGlzeSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1VY2V0bmlaYXBpc3kpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRVY2V0UG9oeWIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBVY2V0bmlaYXBpc3kpLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXRVY2V0UG9oeWIoKVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkVWNldFphcGlzID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKGdyb3VwVWNldG5pWmFwaXN5KS5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0VWNldFphcGlzKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGFibWFuYWdlci5ndGFibWFuYWdlcihcInJlZnJlc2hcIik7ICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQubmFjdGlQYXJvdmFjaVphcGlzeSgpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hY3RpUG9oeWJ5UGFyb3ZhbmkoKTtcclxuICAgICAgICAgICAgdGhhdC5uYWN0aVphcGlzeVBhcm92YW5pKCk7XHJcblxyXG4gICAgICAgIH0gICAgIFxyXG5cclxuICAgICAgICBwcml2YXRlIG5hY3RpUGFyb3ZhY2laYXBpc3koKTogdm9pZCB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy92IGJ1ZG91Y251IG5haHJhZGl0IElTTFxyXG5cclxuICAgICAgICAgICAgLy9Hb3JkaWMuSXNsLkJhbmtvdm5pVnlwaXNQb2xvemthLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGl4cDogXCJNRUhMWDAwMFkxQUdcIiwgLy96YXTDrW0gbmF0dnJkbyBwcm90b8W+ZSBuZWpkZSBmaWx0cm92YXQgcG9kbGUgaXhwX3Bva1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNfcG9sOiBbMTAsIDIwLCAyNSwgNDBdXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KSAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW7DrSBww6Fyb3ZhY8OtY2ggesOhcGlzxa9cIik7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLlBva0Rva2xhZC5wYXJvdmFjaVphcGlzeSh7XHJcbiAgICAgICAgICAgICAgICBpeHA6IHRoYXQuaXhwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEgLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRQYXJvdmFjaVphcGlzeS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5hY3RpWmFwaXN5UGFyb3ZhbmkoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW7DrSB6w6FwaXPFryBww6Fyb3bDoW7DrVwiKTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rRG9rbGFkLnVjZXRuaVphcGlzeVBhcm92YW5pKHtcclxuICAgICAgICAgICAgICAgIGl4cFBvazogdGhhdC5peHBcclxuICAgICAgICAgICAgfSkgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkVWNldFphcGlzLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmFjdGlQb2h5YnlQYXJvdmFuaSgpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbsOtIHBvaHlixa8gcMOhcm92w6Fuw61cIik7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLlBva0Rva2xhZC51Y2V0bmlQb2h5YnlQYXJvdmFuaSh7XHJcbiAgICAgICAgICAgICAgICBpeHBQb2s6IHRoYXQuaXhwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4cF91cHJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRVY2V0UG9oeWIuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVHcmlkRm9ybWF0UGFyb3ZhY2laYXBpc3koKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQnVjLkludGVyZmFjZS5HQmFua292bmlWeXBpc1BvbG96a2FEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQnVjLkludGVyZmFjZS5HQmFua292bmlWeXBpc1BvbG96a2FEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcIklkZW50aWZpa8OhdG9yIHbDvXBpc3VcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJhZGVrX3BvbFwiLCBjYXB0aW9uOiBcIsWYw6FkZWsgdsO9cGlzdVwiIH0pOyBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ2c1wiLCBjYXB0aW9uOiBcIlZTXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic3NcIiwgY2FwdGlvbjogXCJTU1wiIH0pOyBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjXCIsIGNhcHRpb246IFwixIzDoXN0a2FcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzX3BvbF90eHRcIiwgY2FwdGlvbjogXCJTdGF2IHDDoXJvdsOhbsOtXCIgfSk7IFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwiTsOhemV2XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3phcFwiLCBjYXB0aW9uOiBcIkRhdHVtIHphcGxhY2Vuw61cIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfcGFyXCIsIGNhcHRpb246IFwiRGF0dW0gcMOhcm92w6Fuw61cIiB9KTtcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdFVjZXRQb2h5YigpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tQb2h5YnlQYXJvdmFuaUR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tQb2h5YnlQYXJvdmFuaUR0bz4oKTtcclxuICAgICAgXHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cF91cHJcIiwgY2FwdGlvbjogXCJQSUQgcMWZw61wYWR1XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyYWRla191cG9cIiwgY2FwdGlvbjogXCLFmMOhZGVrIHBvaHlidVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInNfdXBvX3R4dFwiLCBjYXB0aW9uOiBcIlN0YXYgemHDusSNLiAyLiBrcm9rdVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFjXCIsIGNhcHRpb246IFwiQcSMXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfdXBvXCIsIGNhcHRpb246IFwixIzDoXN0a2EgcG9oeWJ1XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3Vwb1wiLCBjYXB0aW9uOiBcIkRhdHVtIHBvaHlidVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicmFkZWtcIiwgY2FwdGlvbjogXCLFmMOhZGVrIHBvbG/Fvmt5XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia29kX2tvblwiLCBjYXB0aW9uOiBcIkvDs2QgcMWZZWRrb250YWNlXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJOw6F6ZXYga29udGFjZVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwiUG9waXNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ2c1wiLCBjYXB0aW9uOiBcIlDDoXIuIHN5bS5cIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzc1wiLCBjYXB0aW9uOiBcIlNwZWMuIHN5bS5cIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJjX2NlbGtlbV9tXCIsIGNhcHRpb246IFwixIzDoXN0a2EgcG9sb8W+a3lcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0VWNldFphcGlzKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1phcGlzeVBhcm92YW5pRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1phcGlzeVBhcm92YW5pRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJhZGVrXCIsIGNhcHRpb246IFwiUG9sb8W+a2FcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJhZGVrX3Vwb1wiLCBjYXB0aW9uOiBcIsWYw6FkZWsgw7rEjS4gcG9oLlwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicm9rXCIsIGNhcHRpb246IFwiUm9rXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJtZXNpY1wiLCBjYXB0aW9uOiBcIk3Em3PDrWNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcImRlblwiLCBjYXB0aW9uOiBcIkRlblwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFjXCIsIGNhcHRpb246IFwiQWdlbmQuIMSNw61zbG9cIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJyYWRla196XCIsIGNhcHRpb246IFwiI1wifSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7bmFtZTpcImRyZFwiLCBjYXB0aW9uOiBcIkRSRFwifSk7ICAgICAgICAgICAgICAgICAgIC8vIFJDIDI2NzUwNTQgOiBEUkRcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtuYW1lOlwibmtzXCIsIGNhcHRpb246IFwiTlNcIn0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzLHRydWUpO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjMFwiLCBjYXB0aW9uOiBcIk3DoSBkw6F0aVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHsgbmFtZTogXCJjMVwiLCBjYXB0aW9uOiBcIkRhbFwifSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtuYW1lIDpcIm1lc2ljX3VlalwiLCBjYXB0aW9uOlwiTcSbc8OtYyBEUEhcIn0pOyAgICAgICAgICAgIC8vIFJDIDI5NzUwMDUgOiBNxJtzw61jIERQSFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7bmFtZTpcInJva191ZWpcIiwgY2FwdGlvbjogXCJSb2sgRFBIXCJ9KTsgICAgICAgICAgICAgIC8vIFJDIDIxMDAwMDM1IDogUm9rIERQSFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwiUG9waXNcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByaXpJSVNTUCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2hkcl9yaXNcIiwgY2FwdGlvbjogXCJJRCBJSVNTUFwiIH0pOyAvL1JDIDMwMjUwMDQgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJhZGVrX2hkclwiLCBjYXB0aW9uOiBcIsWYw6FkZWsgSUlTU1BcIiB9KTsgLy9SQyAzMDI1MDA1IDogxZjDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiIH0pOyAvL1JDIDMwMjUwMTAgOiBEYXR1bSB6bcSbbnlcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuIl19