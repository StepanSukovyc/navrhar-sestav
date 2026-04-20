"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GKonfiguraceStavu.js                                                        </Name>
//    <Description> GKonfiguraceStavu                                                                                  </Description>
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
            let GKonfiguraceStavu = class GKonfiguraceStavu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Konfigurace stavů";
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    //debugger;
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    //nastavení akcí
                    this.actions.addRange({
                        actKontrola: {
                            caption: "Kontrola", icon: "gi-plus",
                            run: () => {
                                var l_ico = "";
                                var l_ucs = "";
                                var vybraneRadky;
                                vybraneRadky = this.mainTable.ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                                if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                                    //console.log("cislo", vybraneRadky[0].ico);
                                    //l_ico = vybraneRadky[0].ico!;
                                    //l_ucs = vybraneRadky[0].ucs!;
                                }
                                ;
                                return that.kontrola(vybraneRadky);
                            }
                        }
                    });
                    this.actions.addRange({
                        actKontrolaVse: {
                            caption: "Kontrola vše", icon: "gi-plus",
                            run: () => {
                                var vybraneRadky;
                                vybraneRadky = this.mainTable.ggrid("getView").getDataRows(); // načtení přes vyhledání gridu (přes class)
                                return that.kontrola(vybraneRadky);
                            }
                        }
                    });
                    this.actions.addRange({
                        actNastavit: {
                            caption: "Nastavit", icon: "gi-plus",
                            run: () => {
                                return this.nastavit();
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actKontrola*", "actKontrolaVse*", "actNastavit*"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create", "Nastavení automatického přepočtu");
                    mainForm.gformrow("addFieldsRow", "Nastavení automatického přepočtu", ["w-12"]).gcheck({
                        name: "automat_prepocet",
                        disabled: true,
                        //labelFromRow: true,
                        initialValue: this.modelauto
                    });
                    this.mainTable = $("<div class='js-SeznamUcs'>")
                        .css("height", "50%")
                        .appendTo(this.element)
                        //.gautofit()
                        .gtab({
                        title: "Seznam UCS", opened: true, locked: false,
                    })
                        .ggrid({
                        columnMode: "fit",
                        sort: "!dat_zmena",
                        searchColumns: ["ucs"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "stav_txt",
                            caption: "Stav",
                            width: 8
                        })
                            .addTextColumn({
                            name: "ico",
                            caption: "ICO",
                            width: 10
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: "UCS",
                            width: 10
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "Název",
                            width: 40
                        })
                    });
                    var view = new Gordic.Data.View(this.model);
                    this.mainTable.ggrid("setData", view, true);
                    //that.form = $("<div>").appendTo(mainForm).gform("setup", { layoutDescriptor: "L1M1S1", customClass: "js-ada-zakladni_udaje" }).
                    //    gformsection("create", "Parametry")
                    //this.findFields().gfield("model", "apply", this.model);
                }
                kontrola(data) {
                    var that = this;
                    //console.log("dd", data);
                    // var nova_data : Gordic.Inu.Interface.GEkosucsDto[];
                    data.forEach(function (rad) {
                        that.call("Kontrola_Konfigurace", { in_radek: rad })
                            .done(function (ret) {
                            //r.stav = ret.stav;
                            //r.stav_txt = ret.stav_txt;
                            // kopiruje hodnoty z ret do r
                            $.extend(rad, ret);
                            that.mainTable.ggrid("refreshRows");
                            var Radky;
                            var je_OK = true;
                            Radky = that.mainTable.ggrid("getView").getDataRows(); // načtení přes vyhledání gridu (přes class)
                            Radky.forEach(function (rad) {
                                if (rad.stav != 0) {
                                    je_OK = false;
                                }
                            });
                            if (je_OK = true) {
                                that.findFields("automat_prepocet").gfield("enable");
                            }
                            else {
                                that.findFields("automat_prepocet").gfield("disable");
                            }
                        });
                    });
                    //for (var i = 0; i < data.length; i++) {
                    //    console.log("ICO ", data[i].ico)
                    //    console.log("UCS ", data[i].ucs)
                    //    this.call("Kontrola_Konfigurace", { in_radek: data[i] })
                    //        .done(function (newData: Gordic.Inu.Interface.GEkosucsDto)
                    //        {
                    //            //var view = that.mainTable.ggrid("getView");
                    //            //view.getDataRows(false).forEach(function (r) {
                    //            //});
                    //            console.log("newdata:", newData);
                    //            var viewr = new Gordic.Data.View(newData, { key: "ico,ucs" });
                    //            that.mainTable.ggrid("setData", viewr, true);
                    //            //nova_data[i] = newData;
                    //            //console.log("nova_data:", nova_data);
                    //            //that.showFlash(i_text + " - úspěšně provedeno!!!", "g-state-success", 5000, "msgFlash"); 
                    //            //that.notification(
                    //            //    "add",
                    //            //    {
                    //            //        title: i_text,
                    //            //        icon: "fa-globe",
                    //            //        content: i_text + " - úspěšně provedeno!!!"
                    //            //    },
                    //            //    true);
                    //      })
                    //}
                }
                nastavit() {
                    var that = this;
                    var je_OK = true;
                    var Radky;
                    Radky = that.mainTable.ggrid("getView").getDataRows(); // načtení přes vyhledání gridu (přes class)
                    Radky.forEach(function (rad) {
                        if (rad.stav != 0) {
                            je_OK = false;
                        }
                    });
                    var zaskrtnuto = false;
                    zaskrtnuto = that.findFields("automat_prepocet").gfield("getValue");
                    if (je_OK = true) {
                        that.call("Nastaveni_Konfigurace", { in_zaskrtnuto: zaskrtnuto })
                            .done(function (ret) {
                            if (ret) {
                                if (zaskrtnuto) {
                                    that.showFlash("Automatický přepočet zapnut", "success", "msgFlash");
                                }
                                else {
                                    that.showFlash("Automatický přepočet vypnut", "success", "msgFlash");
                                }
                            }
                            else {
                                if (zaskrtnuto) {
                                    that.showFlash("Zapnutí automatického přepočtu se nepodařilo", "error", "msgFlash");
                                }
                                else {
                                    that.showFlash("Vypnutí automatického přepočtu se nepodařilo", "error", "msgFlash");
                                }
                            }
                        });
                    }
                }
            };
            GKonfiguraceStavu = __decorate([
                gcontent
            ], GKonfiguraceStavu);
            WebClient.GKonfiguraceStavu = GKonfiguraceStavu;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0tvbmZpZ3VyYWNlU3RhdnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHS29uZmlndXJhY2VTdGF2dS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQWdQZjtBQWhQRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnUG5CO0lBaFBnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnUDdCO1FBaFBvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBWTtnQkFBbkQ7O29CQUVJLFVBQUssR0FBRyxtQkFBbUIsQ0FBQztvQkFRcEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkFnT3JELENBQUM7Z0JBOU5HLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixXQUFXO29CQUVYLHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQzt3QkFDaEI7NEJBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLOzRCQUNuQixhQUFhLEVBQUUsSUFBSTt5QkFDdEI7cUJBQ0osQ0FBQyxDQUFDO29CQUVILGdCQUFnQjtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFdBQVcsRUFBRTs0QkFDVCxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTOzRCQUNwQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksS0FBSyxHQUFXLEVBQUUsQ0FBQztnQ0FDdkIsSUFBSSxLQUFLLEdBQVcsRUFBRSxDQUFDO2dDQUN2QixJQUFJLFlBQWdELENBQUM7Z0NBRXJELFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxj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QWlCO2dCQUQ3QixRQUFRO2VBQ0ksaUJBQWlCLENBME83QjtZQTFPWSwyQkFBaUIsb0JBME83QixDQUFBO1FBRUwsQ0FBQyxFQWhQb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ1A3QjtJQUFELENBQUMsRUFoUGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdQbkI7QUFBRCxDQUFDLEVBaFBTLE1BQU0sS0FBTixNQUFNLFFBZ1BmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdLb25maWd1cmFjZVN0YXZ1LmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0tvbmZpZ3VyYWNlU3RhdnUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdLb25maWd1cmFjZVN0YXZ1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIktvbmZpZ3VyYWNlIHN0YXbFr1wiO1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbDogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb3N1Y3NEdG9bXTtcclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWxhdXRvOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgbWFpblRhYmxlOiBKUXVlcnk7XHJcbiAgICAgICAgcHJvdGVjdGVkIFByZXBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcm90ZWN0ZWQgdHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZW5kYTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBmb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGJyZWFkY3J1bWJzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbnRyb2xhXCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9pY286IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3Vjczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreTogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb3N1Y3NEdG9bXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreSA9IHRoaXMubWFpblRhYmxlLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNpc2xvXCIsIHZ5YnJhbmVSYWRreVswXS5pY28pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sX2ljbyA9IHZ5YnJhbmVSYWRreVswXS5pY28hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sX3VjcyA9IHZ5YnJhbmVSYWRreVswXS51Y3MhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQua29udHJvbGEoIHZ5YnJhbmVSYWRreSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RLb250cm9sYVZzZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29udHJvbGEgdsWhZVwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreTogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb3N1Y3NEdG9bXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5YnJhbmVSYWRreSA9IHRoaXMubWFpblRhYmxlLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmtvbnRyb2xhKCB2eWJyYW5lUmFka3kgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5hc3Rhdml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXZpdFwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFzdGF2aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdEtvbnRyb2xhKlwiLCBcImFjdEtvbnRyb2xhVnNlKlwiLCBcImFjdE5hc3Rhdml0KlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJOYXN0YXZlbsOtIGF1dG9tYXRpY2vDqWhvIHDFmWVwb8SNdHVcIik7XHJcblxyXG4gICAgICAgICAgICBtYWluRm9ybS5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIk5hc3RhdmVuw60gYXV0b21hdGlja8OpaG8gcMWZZXBvxI10dVwiLCBbXCJ3LTEyXCJdKS5nY2hlY2soe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhdXRvbWF0X3ByZXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vbGFiZWxGcm9tUm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLm1vZGVsYXV0b1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWJsZSA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1TZXpuYW1VY3MnPlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjUwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC8vLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTZXpuYW0gVUNTXCIsIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCIhZGF0X3ptZW5hXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInVjc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSUNPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVUNTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdmlldywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhtYWluRm9ybSkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIsIGN1c3RvbUNsYXNzOiBcImpzLWFkYS16YWtsYWRuaV91ZGFqZVwiIH0pLlxyXG4gICAgICAgICAgICAvLyAgICBnZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJQYXJhbWV0cnlcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrb250cm9sYShkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc3Vjc0R0b1tdICkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZGRcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHZhciBub3ZhX2RhdGEgOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc3Vjc0R0b1tdO1xyXG5cclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2FsbDxHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc3Vjc0R0bz4oXCJLb250cm9sYV9Lb25maWd1cmFjZVwiLCB7IGluX3JhZGVrOiByYWQgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vci5zdGF2ID0gcmV0LnN0YXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vci5zdGF2X3R4dCA9IHJldC5zdGF2X3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ga29waXJ1amUgaG9kbm90eSB6IHJldCBkbyByXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHJhZCwgcmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYWluVGFibGUuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBSYWRreTogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb3N1Y3NEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGplX09LID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJhZGt5ID0gdGhhdC5tYWluVGFibGUuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJhZGt5LmZvckVhY2goZnVuY3Rpb24gKHJhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZC5zdGF2ICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqZV9PSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGplX09LID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYXV0b21hdF9wcmVwb2NldFwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJhdXRvbWF0X3ByZXBvY2V0XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIklDTyBcIiwgZGF0YVtpXS5pY28pXHJcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiVUNTIFwiLCBkYXRhW2ldLnVjcylcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuY2FsbChcIktvbnRyb2xhX0tvbmZpZ3VyYWNlXCIsIHsgaW5fcmFkZWs6IGRhdGFbaV0gfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdEYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc3Vjc0R0bylcclxuICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3ZhciB2aWV3ID0gdGhhdC5tYWluVGFibGUuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdmlldy5nZXREYXRhUm93cyhmYWxzZSkuZm9yRWFjaChmdW5jdGlvbiAocikge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld2RhdGE6XCIsIG5ld0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgdmlld3IgPSBuZXcgR29yZGljLkRhdGEuVmlldyhuZXdEYXRhLCB7IGtleTogXCJpY28sdWNzXCIgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5tYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXdyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9ub3ZhX2RhdGFbaV0gPSBuZXdEYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJub3ZhX2RhdGE6XCIsIG5vdmFfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goaV90ZXh0ICsgXCIgLSDDunNwxJvFoW7EmyBwcm92ZWRlbm8hISFcIiwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgNTAwMCwgXCJtc2dGbGFzaFwiKTsgXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5ub3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgXCJhZGRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIHRpdGxlOiBpX3RleHQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIGljb246IFwiZmEtZ2xvYmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgY29udGVudDogaV90ZXh0ICsgXCIgLSDDunNwxJvFoW7EmyBwcm92ZWRlbm8hISFcIlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcblxyXG4gICAgICAgfVxyXG5cclxuICAgICAgICBuYXN0YXZpdCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgamVfT0sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdmFyIFJhZGt5OiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc3Vjc0R0b1tdO1xyXG5cclxuICAgICAgICAgICAgUmFka3kgPSB0aGF0Lm1haW5UYWJsZS5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG5cclxuICAgICAgICAgICAgUmFka3kuZm9yRWFjaChmdW5jdGlvbiAocmFkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFkLnN0YXYgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGplX09LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHphc2tydG51dG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgemFza3J0bnV0byA9IHRoYXQuZmluZEZpZWxkcyhcImF1dG9tYXRfcHJlcG9jZXRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoamVfT0sgPSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNhbGw8Ym9vbGVhbj4oXCJOYXN0YXZlbmlfS29uZmlndXJhY2VcIiwgeyBpbl96YXNrcnRudXRvOiB6YXNrcnRudXRvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoemFza3J0bnV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiQXV0b21hdGlja8O9IHDFmWVwb8SNZXQgemFwbnV0XCIsIFwic3VjY2Vzc1wiLCBcIm1zZ0ZsYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJBdXRvbWF0aWNrw70gcMWZZXBvxI1ldCB2eXBudXRcIiwgXCJzdWNjZXNzXCIsIFwibXNnRmxhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoemFza3J0bnV0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiWmFwbnV0w60gYXV0b21hdGlja8OpaG8gcMWZZXBvxI10dSBzZSBuZXBvZGHFmWlsb1wiLCBcImVycm9yXCIsIFwibXNnRmxhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5cG51dMOtIGF1dG9tYXRpY2vDqWhvIHDFmWVwb8SNdHUgc2UgbmVwb2RhxZlpbG9cIiwgXCJlcnJvclwiLCBcIm1zZ0ZsYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19