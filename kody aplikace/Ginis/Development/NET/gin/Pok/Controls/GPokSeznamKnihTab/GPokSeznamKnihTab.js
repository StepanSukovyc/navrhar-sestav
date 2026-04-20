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
            let GPokSeznamKnihTab = class GPokSeznamKnihTab extends Gordic.GContentBase {
                onContentReady() {
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var that = this;
                    that.loadData().done(function (data) {
                        that.cardPanel = $("<div>").appendTo(that.element).gkpipanel({
                            // that.cardPanel = $("<div>").appendTo(that.element).gcardpanel({
                            itemTemplate: Gordic.Prefabs.Panels.universalTemplate().itemTemplate,
                            // itemTemplate: myItemTemplate,
                            ////opened: false,
                            data: new Gordic.Data.View(that.cardPanelItems(data), { key: "ixpDen" }),
                            fixedWidth: true,
                            width: 400,
                            // editable: false,
                            //createTab: true,
                            defaultSelected: false,
                            defaultAction: new GAction({
                                name: "actPokDetailKnihy",
                                icon: "gi-detail",
                                run: function (ev, ctx) {
                                    that.openDetail(ctx.item.data.ixpDen, ctx.item.data.subtitle);
                                }
                            })
                        });
                    });
                    that.actions.addRange({
                        actDetail: {
                            caption: "Detail",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                let vybranaKniha = that.cardPanel.gkpipanel("getSelection");
                                if (vybranaKniha != null || !vybranaKniha[0]) {
                                    WebClient.GPokFlash.showFlashWarning(that, "Není vybrána kniha pro zobrazení detailu!");
                                    return;
                                }
                                that.openDetail(vybranaKniha[0].ixpDen, vybranaKniha[0].subtitle);
                            }
                        },
                        actHromadneUzavreni: {
                            caption: "Hromadné uzavření knih",
                            icon: "gi-suma_lock",
                            permission: that.LzeHromadneUzavrit,
                            run: function (ev, ctx) {
                                that.hromadneUzavreni();
                            }
                        },
                        actStavKnih: {
                            caption: "Stav knih",
                            icon: "gi-calc",
                            run: function (ev, ctx) {
                                that.stavKnih();
                            }
                        },
                        actKontrolaDat: {
                            caption: "Kontrola dat",
                            icon: "",
                            permission: that.LzeKontrolaDat,
                            run: function (ev, ctx) {
                                that.kontrolaDat();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actDetail, favorite: true },
                        { action: this.actions.actHromadneUzavreni, favorite: true },
                        { action: this.actions.actStavKnih, favorite: true },
                        { action: this.actions.actKontrolaDat, favorite: true }
                    ]);
                }
                openDetail(ixpDen, nazev) {
                    var that = this;
                    var newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, ixpDen);
                    var ParamsJSON = { ixpDen: ixpDen, nazev: nazev };
                    var selectWindow = that.navigate(["Gordic.Pok.WebClient.GPokInformaceKnihaTab", { gpc: newGpc }], ParamsJSON);
                    var windowContent = $.content(selectWindow);
                    windowContent.close(function () {
                        //test na closed bylo zde,ale bylo false, až pak po chvíli bylo true a mezitím se už načítala data a objekt nebyl a padlo to na chybu
                        // tím načtením dat se to spozdilo, takže se zbytečně dělá načtení dat,ale už se nesetují na neexistujícíc objekt
                        that.loadData().done(function (data) {
                            if (!that.closed) // okno tam zůstane a tak je na čem to vykreslit,pokud je closed tru, tak je zavřeno i toto, napříkladn ěkdo vybral jinou volbu v levém menu
                             {
                                that.cardPanel.gkpipanel("getView").updateData(that.cardPanelItems(data), "update");
                            }
                        });
                    });
                }
                loadData() {
                    var def = $.Deferred();
                    var that = this;
                    this.beginOperation("Načítání seznamu knih");
                    Gordic.Isl.PokKniha.list(rq => {
                        return {
                            fragments: ["Permissions", "POKSDEN", "*"]
                        };
                    }).get().done(function (data) {
                        def.resolve(data.data);
                    })
                        .fail(function (xhr, type, vobj) {
                        def.reject();
                    }).
                        always(function () {
                        that.endOperation();
                    });
                    return def.promise();
                }
                stavKnih() {
                    var ParamsJSON = {};
                    this.navigate("Gordic.Pok.WebClient.GPokStavKnihTab", ParamsJSON);
                }
                kontrolaDat() {
                    var ParamsJSON = {};
                    this.navigate("Gordic.Pok.WebClient.GPokHromadnaKontrolaDatTab", ParamsJSON);
                }
                cardPanelItems(data) {
                    var items = [];
                    data.forEach(function (row) {
                        let barvaPocatek = "black";
                        let barvaZustatek = "black";
                        if (!new Decimal(row.c_pocatek).equals(0))
                            if (new Decimal(row.c_pocatek).greaterThan(0)) {
                                barvaPocatek = "green";
                            }
                            else {
                                barvaPocatek = "red";
                            }
                        ;
                        if (!new Decimal(row.c_zustatek).equals(0))
                            if (new Decimal(row.c_zustatek).greaterThan(0)) {
                                barvaZustatek = "green";
                            }
                            else {
                                barvaZustatek = "red";
                            }
                        ;
                        var item = {
                            title: row.zkratka,
                            subtitle: row.nazev,
                            icon: "fa-book",
                            value: Gordic.Templates.Formatters.number(parseDecimal(row.c_zustatek_m), "C2"),
                            formatter: "dotNetDecimal",
                            unit: row.mena_zkr,
                            detailsDirection: "vertical",
                            details: [
                                {
                                    description: "Počáteční zůstatek: ",
                                    unit: Gordic.Templates.Formatters.number(parseDecimal(row.c_pocatek_m), "C2") + " " + row.mena_zkr,
                                    meaning: "neutral",
                                    //formatter: "C"
                                },
                                row.mena == 0 ? {} : //valutová pokladna
                                    {
                                        description: "Počáteční zůstatek: ",
                                        unit: Gordic.Templates.Formatters.number(parseDecimal(row.c_pocatek), "C2") + " CZK",
                                        meaning: "neutral",
                                        //formatter: "C"
                                    },
                                {
                                    description: "Hlavní uzávěrka: ",
                                    value: (row.dat_uz_hl ? parseDate(row.dat_uz_hl) : ""),
                                    meaning: "negative",
                                },
                                {
                                    description: "Dílčí uzávěrka: ",
                                    value: (row.dat_uz_den ? parseDate(row.dat_uz_den) : ""),
                                    meaning: "negative",
                                    formatter: "dd.MM.yyyy hh:mm:ss"
                                },
                                {
                                    description: "Stav knihy: ",
                                    value: row.aktivita_txt
                                }
                            ],
                            ixpDen: row.ixp_den
                        };
                        items.push(item);
                    });
                    return items;
                }
                hromadneUzavreni() {
                    var that = this;
                    var selectWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadneUzavreniKnihTab");
                    var windowContent = $.content(selectWindow);
                    windowContent.close(function () {
                        //test na closed bylo zde,ale bylo false, až pak po chvíli bylo true a mezitím se už načítala data a objekt nebyl a padlo to na chybu
                        // tím načtením dat se to spozdilo, takže se zbytečně dělá načtení dat,ale už se nesetují na neexistujícíc objekt
                        that.loadData().done(function (data) {
                            if (!that.closed) // okno tam zůstane a tak je na čem to vykreslit,pokud je closed tru, tak je zavřeno i toto, napříkladn ěkdo vybral jinou volbu v levém menu
                             {
                                that.cardPanel.gkpipanel("getView").updateData(that.cardPanelItems(data), "update");
                            }
                        });
                    });
                }
            };
            GPokSeznamKnihTab = __decorate([
                Decorators.gcontent
            ], GPokSeznamKnihTab);
            WebClient.GPokSeznamKnihTab = GPokSeznamKnihTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Nlem5hbUtuaWhUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rU2V6bmFtS25paFRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBeVFYO0FBelFMLFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlRZjtJQXpRWSxXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5UXpCO1FBelFnQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBVS9DLGNBQWM7b0JBRVYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUcsYUFBYSxFQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFdEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUdoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBeUM7d0JBR2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDOzRCQUM1RCxrRUFBa0U7NEJBQ2xFLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFlBQVk7NEJBQ3JFLGdDQUFnQzs0QkFDL0Isa0JBQWtCOzRCQUNmLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFvQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFHLFFBQVEsRUFBQyxDQUFFOzRCQUM5RyxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsS0FBSyxFQUFFLEdBQUc7NEJBQ1gsbUJBQW1COzRCQUNsQixrQkFBa0I7NEJBQ2xCLGVBQWUsRUFBRSxL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QkFFakgsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQXlDOzRCQUVwRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSw0SUFBNEk7NkJBQzlKLENBQUM7Z0NBRUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ3hGLENBQUM7d0JBR0wsQ0FBQyxDQUFDLENBQUE7b0JBRU4sQ0FBQyxDQUFDLENBQUM7Z0JBRVAsQ0FBQzthQUNBLENBQUE7WUFyUVEsaUJBQWlCO2dCQUQ3QixVQUFVLENBQUMsUUFBUTtlQUNQLGlCQUFpQixDQXFRekI7WUFyUVEsMkJBQWlCLG9CQXFRekIsQ0FBQTtRQUNMLENBQUMsRUF6UWdCLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlRekI7SUFBRCxDQUFDLEVBelFZLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlRZjtBQUFELENBQUMsRUF6UUssTUFBTSxLQUFOLE1BQU0sUUF5UVgiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1Nlem5hbUtuaWhUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBjYXJkUGFuZWw7XHJcbiAgICAgICAgTHplSHJvbWFkbmVVemF2cml0OiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbjtcclxuICAgICAgICBMemVLb250cm9sYURhdDogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb247XHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCAgZGVmYXVsdEFjdGlvbiA6IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKS5kb25lKGZ1bmN0aW9uIChkYXRhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG9bXSkge1xyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICB0aGF0LmNhcmRQYW5lbCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdrcGlwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5jYXJkUGFuZWwgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy51bml2ZXJzYWxUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgIC8vIGl0ZW1UZW1wbGF0ZTogbXlJdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL29wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0tuaWhhRHRvPih0aGF0LmNhcmRQYW5lbEl0ZW1zKGRhdGEpLCB7a2V5IDogXCJpeHBEZW5cIn0gKSAgICAgICwgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAvLyBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGVUYWI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFBva0RldGFpbEtuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChjdHguaXRlbS5kYXRhLml4cERlbiwgY3R4Lml0ZW0uZGF0YS5zdWJ0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZ5YnJhbmFLbmloYSA9IHRoYXQuY2FyZFBhbmVsLmdrcGlwYW5lbChcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5hS25paGEgIT0gbnVsbCB8fCAhdnlicmFuYUtuaWhhWzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJOZW7DrSB2eWJyw6FuYSBrbmloYSBwcm8gem9icmF6ZW7DrSBkZXRhaWx1IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVuRGV0YWlsKHZ5YnJhbmFLbmloYVswXS5peHBEZW4sIHZ5YnJhbmFLbmloYVswXS5zdWJ0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEhyb21hZG5lVXphdnJlbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhyb21hZG7DqSB1emF2xZllbsOtIGtuaWhcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXN1bWFfbG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoYXQuTHplSHJvbWFkbmVVemF2cml0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuZVV6YXZyZW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFN0YXZLbmloOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2IGtuaWhcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWNhbGNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhdktuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGFEYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbnRyb2xhIGRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhhdC5MemVLb250cm9sYURhdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua29udHJvbGFEYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdEhyb21hZG5lVXphdnJlbmksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFN0YXZLbmloLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RLb250cm9sYURhdCwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTsgXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgb3BlbkRldGFpbChpeHBEZW46IHN0cmluZywgbmF6ZXYgOiBzdHJpbmcpIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIGl4cERlbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgUGFyYW1zSlNPTiA9IHsgaXhwRGVuOiBpeHBEZW4sIG5hemV2OiBuYXpldiB9O1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0V2luZG93ID0gdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSW5mb3JtYWNlS25paGFUYWJcIiwge2dwYyA6IG5ld0dwYyB9XSwgUGFyYW1zSlNPTik7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoc2VsZWN0V2luZG93KTtcclxuICAgICAgICAgICAgd2luZG93Q29udGVudC5jbG9zZShmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vdGVzdCBuYSBjbG9zZWQgYnlsbyB6ZGUsYWxlIGJ5bG8gZmFsc2UsIGHFviBwYWsgcG8gY2h2w61saSBieWxvIHRydWUgYSBtZXppdMOtbSBzZSB1xb4gbmHEjcOtdGFsYSBkYXRhIGEgb2JqZWt0IG5lYnlsIGEgcGFkbG8gdG8gbmEgY2h5YnVcclxuICAgICAgICAgICAgICAgIC8vIHTDrW0gbmHEjXRlbsOtbSBkYXQgc2UgdG8gc3BvemRpbG8sIHRha8W+ZSBzZSB6Ynl0ZcSNbsSbIGTEm2zDoSBuYcSNdGVuw60gZGF0LGFsZSB1xb4gc2UgbmVzZXR1asOtIG5hIG5lZXhpc3R1asOtY8OtYyBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpLmRvbmUoZnVuY3Rpb24gKGRhdGE6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tLbmloYUR0b1tdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuY2xvc2VkKSAvLyBva25vIHRhbSB6xa9zdGFuZSBhIHRhayBqZSBuYSDEjWVtIHRvIHZ5a3Jlc2xpdCxwb2t1ZCBqZSBjbG9zZWQgdHJ1LCB0YWsgamUgemF2xZllbm8gaSB0b3RvLCBuYXDFmcOta2xhZG4gxJtrZG8gdnlicmFsIGppbm91IHZvbGJ1IHYgbGV2w6ltIG1lbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FyZFBhbmVsLmdrcGlwYW5lbChcImdldFZpZXdcIikudXBkYXRlRGF0YSh0aGF0LmNhcmRQYW5lbEl0ZW1zKGRhdGEpLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCk6IEpRdWVyeVByb21pc2U8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0tuaWhhRHRvW10+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6Fuw60gc2V6bmFtdSBrbmloXCIpO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLklzbC5Qb2tLbmloYS5saXN0KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIiwgXCJQT0tTREVOXCIsIFwiKlwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KS5cclxuICAgICAgICAgICAgICAgIGFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHN0YXZLbmloKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIFBhcmFtc0pTT04gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tTdGF2S25paFRhYlwiLCBQYXJhbXNKU09OKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGtvbnRyb2xhRGF0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIFBhcmFtc0pTT04gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tIcm9tYWRuYUtvbnRyb2xhRGF0VGFiXCIsIFBhcmFtc0pTT04pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FyZFBhbmVsSXRlbXMoZGF0YTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0tuaWhhRHRvW10pOiBhbnlbXSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBiYXJ2YVBvY2F0ZWsgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFydmFadXN0YXRlayA9IFwiYmxhY2tcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5ldyBEZWNpbWFsKHJvdy5jX3BvY2F0ZWshKS5lcXVhbHMoMCkpIGlmIChuZXcgRGVjaW1hbChyb3cuY19wb2NhdGVrISkuZ3JlYXRlclRoYW4oMCkpIHsgYmFydmFQb2NhdGVrID0gXCJncmVlblwiIH0gZWxzZSB7IGJhcnZhUG9jYXRlayA9IFwicmVkXCIgfTtcclxuICAgICAgICAgICAgICAgIGlmICghbmV3IERlY2ltYWwocm93LmNfenVzdGF0ZWshKS5lcXVhbHMoMCkpIGlmIChuZXcgRGVjaW1hbChyb3cuY196dXN0YXRlayEpLmdyZWF0ZXJUaGFuKDApKSB7IGJhcnZhWnVzdGF0ZWsgPSBcImdyZWVuXCIgfSBlbHNlIHsgYmFydmFadXN0YXRlayA9IFwicmVkXCIgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93LnprcmF0a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VidGl0bGU6IHJvdy5uYXpldiwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYm9va1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHBhcnNlRGVjaW1hbChyb3cuY196dXN0YXRla19tISksIFwiQzJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcImRvdE5ldERlY2ltYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB1bml0OiByb3cubWVuYV96a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG/EjcOhdGXEjW7DrSB6xa9zdGF0ZWs6IFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwocm93LmNfcG9jYXRla19tISksIFwiQzJcIikgKyBcIiBcIiArIHJvdy5tZW5hX3prcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmV1dHJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXR0ZXI6IFwiQ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5tZW5hID09IDAgPyB7fSA6IC8vdmFsdXRvdsOhIHBva2xhZG5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvxI3DoXRlxI1uw60gesWvc3RhdGVrOiBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHBhcnNlRGVjaW1hbChyb3cuY19wb2NhdGVrISksIFwiQzJcIikgKyBcIiBDWktcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmV1dHJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXR0ZXI6IFwiQ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkhsYXZuw60gdXrDoXbEm3JrYTogXCIsICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IChyb3cuZGF0X3V6X2hsID8gcGFyc2VEYXRlKHJvdy5kYXRfdXpfaGwhKSA6IFwiXCIpLCAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJuZWdhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRMOtbMSNw60gdXrDoXbEm3JrYTogXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogKHJvdy5kYXRfdXpfZGVuID8gcGFyc2VEYXRlKHJvdy5kYXRfdXpfZGVuISkgOiBcIlwiKSwgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJuZWdhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcImRkLk1NLnl5eXkgaGg6bW06c3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGF2IGtuaWh5OiBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAgcm93LmFrdGl2aXRhX3R4dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwRGVuOiByb3cuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcblxyXG4gICAgICAgIH0gICAgICBcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgaHJvbWFkbmVVemF2cmVuaSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHNlbGVjdFdpbmRvdyA9ICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tIcm9tYWRuZVV6YXZyZW5pS25paFRhYlwiKTtcclxuICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoc2VsZWN0V2luZG93KTtcclxuICAgICAgICAgICAgd2luZG93Q29udGVudC5jbG9zZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90ZXN0IG5hIGNsb3NlZCBieWxvIHpkZSxhbGUgYnlsbyBmYWxzZSwgYcW+IHBhayBwbyBjaHbDrWxpIGJ5bG8gdHJ1ZSBhIG1leml0w61tIHNlIHXFviBuYcSNw610YWxhIGRhdGEgYSBvYmpla3QgbmVieWwgYSBwYWRsbyB0byBuYSBjaHlidVxyXG4gICAgICAgICAgICAgICAgLy8gdMOtbSBuYcSNdGVuw61tIGRhdCBzZSB0byBzcG96ZGlsbywgdGFrxb5lIHNlIHpieXRlxI1uxJsgZMSbbMOhIG5hxI10ZW7DrSBkYXQsYWxlIHXFviBzZSBuZXNldHVqw60gbmEgbmVleGlzdHVqw61jw61jIG9iamVrdFxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKS5kb25lKGZ1bmN0aW9uIChkYXRhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG9bXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuY2xvc2VkKSAvLyBva25vIHRhbSB6xa9zdGFuZSBhIHRhayBqZSBuYSDEjWVtIHRvIHZ5a3Jlc2xpdCxwb2t1ZCBqZSBjbG9zZWQgdHJ1LCB0YWsgamUgemF2xZllbm8gaSB0b3RvLCBuYXDFmcOta2xhZG4gxJtrZG8gdnlicmFsIGppbm91IHZvbGJ1IHYgbGV2w6ltIG1lbnVcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhcmRQYW5lbC5na3BpcGFuZWwoXCJnZXRWaWV3XCIpLnVwZGF0ZURhdGEodGhhdC5jYXJkUGFuZWxJdGVtcyhkYXRhKSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==