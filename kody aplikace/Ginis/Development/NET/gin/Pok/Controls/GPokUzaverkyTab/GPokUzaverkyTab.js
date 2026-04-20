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
            let GPokUzaverkyTab = class GPokUzaverkyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    if (this.PokRadStvuzd && this.PokRadStvuzh) {
                        //jsou povoleny obě uzávěrky tak nechám vybranou
                    }
                    else if (this.PokRadStvuzh && !this.PokRadStvuzd) {
                        if (this.typUzaverky == 10)
                            this.typUzaverky = 20;
                        //je povolena pouze hlavní uzávěrka ale pro nastavení je vybraná dílčí tak změním
                    }
                    else if (!this.PokRadStvuzh && this.PokRadStvuzd) {
                        if (this.typUzaverky == 20)
                            this.typUzaverky = 10;
                        //je povolena pouze dílčí uzávěrka ale pro nastavení je vybraná hlavní tak změním
                    }
                    else {
                        //obě jsou zakázané,sem by se to nemělo dostat, nelze kliknou na akci
                        //i to přehození je pouze kontrola,protože jsou zablokované akce
                    }
                    var wizard = new Gordic.Wizard();
                    wizard.create({
                        content: that
                    }, {
                        title: "Uzávěrka",
                        steps: [
                            {
                                caption: "Typ uzávěrky",
                                create: function (cnt, contentDiv, change) {
                                    var formDiv = $("<div>").appendTo(contentDiv);
                                    var formBuilder = new Gordic.Forms.Form({ name: "formDlg1", layoutDescriptor: "L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0" })
                                        .addSection("Datum uzávěrky")
                                        .addRow("Datum poslední hlavní uzávěrky")
                                        .addField("gdatebox", {
                                        name: "dat_uz_hl",
                                        disabled: true,
                                        initialValue: that.datUzaverkaHlavni
                                    })
                                        .addRow("Datum a čas poslední dílčí uzávěrky")
                                        .addField("gdatebox", {
                                        name: "dat_uz_den",
                                        disabled: true,
                                        initialValue: that.datUzaverkaDilci,
                                        valueType: "datetime",
                                        hideZeroTime: false
                                    })
                                        .addSection("Typ uzávěrky")
                                        .addRow({ label: "" }).addField("gradio", {
                                        name: "typUzaverky",
                                        itemClass: "",
                                        initialValue: that.typUzaverky ? that.typUzaverky : 10,
                                        radios: [
                                            { value: '10', label: 'Dílčí uzávěrka', disabled: !that.PokRadStvuzd },
                                            { value: '20', label: 'Hlavní uzávěrka', disabled: !that.PokRadStvuzh }
                                        ]
                                    });
                                    formDiv.gform("createFrom", formBuilder);
                                },
                                change: function (cnt, input, change) {
                                    cnt["typUzaverky"] = that.findFields("typUzaverky").gfield("getValue");
                                }
                            },
                            {
                                caption: "Datum uzávěrky",
                                create: function (cnt, contentDiv, change) {
                                    var formDiv = $("<div>").appendTo(contentDiv);
                                    var formBuilder = new Gordic.Forms.Form({ name: "formDlg2", layoutDescriptor: "L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0" })
                                        .addText("Typ uzávěrky : " + (cnt["typUzaverky"] == 10 ? "Dílčí uzávěrka" : "Hlavní uzávěrka"))
                                        .addText((cnt["typUzaverky"] == 10 ? "Datum a čas poslední dílčí uzávěrky : " + Gordic.Templates.Formatters.datetime(that.datUzaverkaDilci, "dd.MM.yyyy HH:mm:ss") : "Datum poslední hlavní uzávěrky : " + Gordic.Templates.Formatters.datetime(that.datUzaverkaHlavni, "dd.MM.yyyy")))
                                        .addRow("Uzavřít ke dni")
                                        .addField("gdatebox", {
                                        name: "dat_uz",
                                        initialValue: new Date(),
                                        valueType: "date",
                                        // validators: new Gordic.Validators.Length({ min: (cnt["typUzaverky"] == 10 ? moment(that.datUzaverkaDilci) : moment(that.datUzaverkaHlavni) )})
                                    });
                                    formDiv.gform("createFrom", formBuilder);
                                },
                                change: function (cnt, input, change) {
                                    cnt["datumUzaverky"] = that.findFields("dat_uz").gfield("getValue");
                                }
                            },
                            {
                                caption: "Provedení uzávěrky",
                                create: function (cnt, contentDiv, change) {
                                    if (cnt["typUzaverky"] == 10) { ///dílčí
                                        that.uzaverkaDilci(cnt["datumUzaverky"], true);
                                    }
                                    else {
                                        that.uzaverkaHlavni(cnt["datumUzaverky"], true);
                                    }
                                },
                                change: function (cnt, input, change) {
                                }
                            }
                        ],
                        complete: function (gcontent, contentDiv, change) {
                            gcontent.tryClose();
                        }
                    });
                    //var headerForm = new Gordic.Forms.Form({ name: "pokUzaverkyForm" })
                    //    .addSection("Uzávěrka")
                    //    .addRow("Datum poslední hlavní uzávěrky")
                    //    .addField("gdatebox", {
                    //        name: "dat_uz_hl",
                    //        disabled: true,
                    //        initialValue: that.datUzaverkaHlavni
                    //    })
                    //    .addRow("Datum a čas poslední dílčí uzávěrky")
                    //    .addField("gdatebox", {
                    //        name: "dat_uz_den",
                    //        disabled: true,
                    //        initialValue: that.datUzaverkaDilci,
                    //        valueType: "datetime"
                    //    })
                    //    .addRow("Uzavřít ke dni")
                    //    .addField("gdatebox", {
                    //        name: "dat_uz",
                    //        valueType: "date",
                    //        initialValue: moment().toDate()
                    //    })
                    //    .addRow({ name: "buttons", customClass: "right", layoutDescriptor: "LMS-0-12-0" })
                    //    .addField("gbutton", "", {
                    //        params: {
                    //            caption: "Provést uzávěrku", action: new GAction({
                    //                name: "actUzaverka", run: function (ev) {
                    //                    var valueDat = that.element.findFields("dat_uz").gfield("getValue");
                    //                    var valueUzaverka = that.findFields("typUzaverky").gfield("getValue");
                    //                    if (valueUzaverka == 10) { ///dílčí
                    //                        that.uzaverkaDilci(valueDat, true);
                    //                    }
                    //                    else {
                    //                        that.uzaverkaHlavni(valueDat, true);
                    //                    }
                    //                    //that.promiseUzaverka(valueDat, true, valueUzaverka, that.datUzaverkaHlavni)
                    //                    //    .done(function () {
                    //                    //        that.tryClose();
                    //                    //    });
                    //                    //UZAVŘENÍ PLATEBNÍHO TERMINÁLU
                    //                }
                    //            })
                    //        }
                    //    });
                    //var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                }
                uzaverkaHlavni(datDo, kontrola) {
                    var that = this;
                    if (datDo === null) {
                        that.showFlash("Vyberte datum uzávěrky!", "g-state-error", 3000);
                        Gordic.Pok.WebClient.GPokFlash.showFlashError(that, "Vyberte datum uzávěrky!");
                        return;
                    }
                    else {
                        Gordic.Isl.PokKniha.uzaverkaHlavni(rq => {
                            return {
                                datDo: datDo,
                                ixpDen: that.ixpDen,
                                kontrola: kontrola
                            };
                        })
                            .get()
                            .done(function (oldZustatek) {
                            Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Uzávěrka proběhla v pořádku");
                            that.tiskUzaverka(datDo, 20, oldZustatek, that.datUzaverkaHlavni);
                        })
                            .fail(function (jqXHR, typ, obj) {
                            if (typ === "exception") {
                                if (obj.baseType === "Gordic.General.GHplValidationException" || obj.exceptionType === "Gordic.General.GHplValidationException") {
                                    obj.handled = true;
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, obj.baseMessage);
                                }
                                else if (obj.data.member) {
                                    if (obj.data.member == "kontrola") {
                                        obj.handled = true;
                                        return that.dialogs.confirm(obj.baseMessage + "</br> Pokračovat?").createDialogPromise("yes").then(function () { return that.uzaverkaDilci(datDo, false); });
                                    }
                                }
                            }
                        });
                    }
                }
                uzaverkaDilci(datDo, kontrola) {
                    var that = this;
                    if (datDo === null) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashError(that, "Vyberte datum uzávěrky!");
                        return;
                    }
                    else {
                        Gordic.Isl.PokKniha.uzaverkaDilci(rq => {
                            return {
                                datDo: datDo,
                                ixpDen: that.ixpDen,
                                kontrola: kontrola
                            };
                        })
                            .get()
                            .done(function (oldZustatek) {
                            Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Uzávěrka proběhla v pořádku");
                            that.tiskUzaverka(datDo, 10, oldZustatek, that.datUzaverkaHlavni);
                        })
                            .fail(function (jqXHR, typ, obj) {
                            if (typ === "exception") {
                                if (obj.baseType === "Gordic.General.GHplValidationException" || obj.exceptionType === "Gordic.General.GHplValidationException") {
                                    obj.handled = true;
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, obj.baseMessage);
                                }
                                else if (obj.data.meber) {
                                    if (obj.data.member == "kontrola") {
                                        obj.handled = true;
                                        return that.dialogs.confirm(obj.baseMessage + "</br> Pokračovat?").createDialogPromise("yes").then(function () { return that.uzaverkaDilci(datDo, false); });
                                    }
                                }
                            }
                        });
                    }
                }
                tiskUzaverka(datumDo, typUzaverky, oldZustatek, datumOd) {
                    var that = this;
                    var name;
                    name = "pok_ptm_uzprot";
                    var actVnitrniTiskUzaverka = GAction.createPrintAction({
                        name: "actTiskUzaverka",
                        caption: "Tisk uzávěrky",
                        tema: name,
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:TiskUzaverky",
                        reportStarting: function (rep) {
                            rep.customDto = { ixp_den: that.ixpDen, datumDo: datumDo, typUzaverky: typUzaverky, nOldZus: oldZustatek, datumOd: datumOd, settingOdstrankovat: that.globalSettings.get("Pok.Nastaveni.Odstrankovani") };
                        },
                    });
                    actVnitrniTiskUzaverka.run();
                }
            };
            GPokUzaverkyTab = __decorate([
                Decorators.gcontent
            ], GPokUzaverkyTab);
            WebClient.GPokUzaverkyTab = GPokUzaverkyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1V6YXZlcmt5VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1V6YXZlcmt5VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FtVWY7QUFuVUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbVVuQjtJQW5VZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbVU3QjtRQW5Vb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQWM3QyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUcsYUFBYSxFQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFHdEUsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFFekMsZ0RBQWdEO29CQUNwRCxDQUFDO3lCQUNJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDL0MsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUU7NEJBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO3dCQUMxQixpRkFBaUY7b0JBQ3JGLENBQUM7eUJBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUMvQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRTs0QkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQzFCLGlGQUFpRjtvQkFDckYsQ0FBQzt5QkFDSSxDQUFDO3dCQUVGLHFFQUFxRTt3QkFDckUsZ0VBQWdFO29CQUNwRSxDQUFDO29CQUVELElBQUksTUFBTSxH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VyxFQUFFLFdBQVcsRUFBRSxPQUFPO29CQUUzRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxDQUFDO29CQUNULElBQUksR0FBRyxnQkFBZ0IsQ0FBQztvQkFFeEIsSUFBSSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7d0JBQ25ELElBQUksRUFBRSxpQkFBaUI7d0JBQ3ZCLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixJQUFJLEVBQUUsSUFBSTt3QkFDVixxQkFBcUIsRUFBRSwrQ0FBK0M7d0JBQ3RFLGNBQWMsRUFBRSxVQUFVLEdBQUc7NEJBQ3pCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxjQUFlLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLEVBQUUsQ0FBQTt3QkFDOU0sQ0FBQztxQkFFSixDQUFDLENBQUM7b0JBRUgsc0JBQXNCLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2pDLENBQUM7YUFFSixDQUFBO1lBL1RZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQStUM0I7WUEvVFkseUJBQWUsa0JBK1QzQixDQUFBO1FBQ0wsQ0FBQyxFQW5Vb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbVU3QjtJQUFELENBQUMsRUFuVWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1VbkI7QUFBRCxDQUFDLEVBblVTLE1BQU0sS0FBTixNQUFNLFFBbVVmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tVemF2ZXJreVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG5cclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGF0VXphdmVya2FIbGF2bmk6IERhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRVemF2ZXJrYURpbGNpOiBEYXRlO1xyXG4gICAgICAgIHByaXZhdGUgYWtjZTogT2JqZWN0TGl0ZXJhbDxHQWN0aW9uUGFyYW1zRGVmT2JqIHwgR0FjdGlvbj47XHJcbiAgICAgICAgcHJpdmF0ZSBIcGxSZXpTY2g6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBpeHBEZW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHR5cFV6YXZlcmt5OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBQb2tSYWRTdHZ1emQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBQb2tSYWRTdHZ1emg6IGJvb2xlYW47XHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgIGRlZmF1bHRBY3Rpb24gOiB0cnVlIH1dKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5Qb2tSYWRTdHZ1emQgJiYgdGhpcy5Qb2tSYWRTdHZ1emgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2pzb3UgcG92b2xlbnkgb2LEmyB1esOhdsSbcmt5IHRhayBuZWNow6FtIHZ5YnJhbm91XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5Qb2tSYWRTdHZ1emggJiYgIXRoaXMuUG9rUmFkU3R2dXpkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBVemF2ZXJreSA9PSAxMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cFV6YXZlcmt5ID0gMjA7XHJcbiAgICAgICAgICAgICAgICAvL2plIHBvdm9sZW5hIHBvdXplIGhsYXZuw60gdXrDoXbEm3JrYSBhbGUgcHJvIG5hc3RhdmVuw60gamUgdnlicmFuw6EgZMOtbMSNw60gdGFrIHptxJtuw61tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuUG9rUmFkU3R2dXpoICYmIHRoaXMuUG9rUmFkU3R2dXpkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBVemF2ZXJreSA9PSAyMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cFV6YXZlcmt5ID0gMTA7XHJcbiAgICAgICAgICAgICAgICAvL2plIHBvdm9sZW5hIHBvdXplIGTDrWzEjcOtIHV6w6F2xJtya2EgYWxlIHBybyBuYXN0YXZlbsOtIGplIHZ5YnJhbsOhIGhsYXZuw60gdGFrIHptxJtuw61tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9vYsSbIGpzb3UgemFrw6F6YW7DqSxzZW0gYnkgc2UgdG8gbmVtxJtsbyBkb3N0YXQsIG5lbHplIGtsaWtub3UgbmEgYWtjaVxyXG4gICAgICAgICAgICAgICAgLy9pIHRvIHDFmWVob3plbsOtIGplIHBvdXplIGtvbnRyb2xhLHByb3Rvxb5lIGpzb3UgemFibG9rb3ZhbsOpIGFrY2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHdpemFyZCA9IG5ldyBHb3JkaWMuV2l6YXJkKCk7XHJcbiAgICAgICAgICAgIHdpemFyZC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhhdFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXrDoXbEm3JrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVHlwIHV6w6F2xJtya3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1EaXYgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY29udGVudERpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1CdWlsZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGxnMVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJEYXR1bSB1esOhdsSbcmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBwb3NsZWRuw60gaGxhdm7DrSB1esOhdsSbcmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3V6X2hsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5kYXRVemF2ZXJrYUhsYXZuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gYSDEjWFzIHBvc2xlZG7DrSBkw61sxI3DrSB1esOhdsSbcmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3V6X2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuZGF0VXphdmVya2FEaWxjaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZVplcm9UaW1lOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlR5cCB1esOhdsSbcmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJcIiB9KS5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cFV6YXZlcmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQudHlwVXphdmVya3kgPyB0aGF0LnR5cFV6YXZlcmt5IDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMTAnLCBsYWJlbDogJ0TDrWzEjcOtIHV6w6F2xJtya2EnLCBkaXNhYmxlZCA6ICF0aGF0LlBva1JhZFN0dnV6ZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcyMCcsIGxhYmVsOiAnSGxhdm7DrSB1esOhdsSbcmthJyAsZGlzYWJsZWQgOiAhdGhhdC5Qb2tSYWRTdHZ1emggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURpdi5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybUJ1aWxkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoY250LCBpbnB1dCwgY2hhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudFtcInR5cFV6YXZlcmt5XCJdID0gdGhhdC5maW5kRmllbGRzKFwidHlwVXphdmVya3lcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSB1esOhdsSbcmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybURpdiA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhjb250ZW50RGl2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybUJ1aWxkZXIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EbGcyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlR5cCB1esOhdsSbcmt5IDogXCIgKyAoY250W1widHlwVXphdmVya3lcIl0gPT0gMTAgPyBcIkTDrWzEjcOtIHV6w6F2xJtya2FcIiA6IFwiSGxhdm7DrSB1esOhdsSbcmthXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dCgoY250W1widHlwVXphdmVya3lcIl0gPT0gMTAgPyBcIkRhdHVtIGEgxI1hcyBwb3NsZWRuw60gZMOtbMSNw60gdXrDoXbEm3JreSA6IFwiICsgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKHRoYXQuZGF0VXphdmVya2FEaWxjaSwgXCJkZC5NTS55eXl5IEhIOm1tOnNzXCIpIDogXCJEYXR1bSBwb3NsZWRuw60gaGxhdm7DrSB1esOhdsSbcmt5IDogXCIgKyBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUodGhhdC5kYXRVemF2ZXJrYUhsYXZuaSwgXCJkZC5NTS55eXl5XCIpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlV6YXbFmcOtdCBrZSBkbmlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdXpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFsaWRhdG9yczogbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogKGNudFtcInR5cFV6YXZlcmt5XCJdID09IDEwID8gbW9tZW50KHRoYXQuZGF0VXphdmVya2FEaWxjaSkgOiBtb21lbnQodGhhdC5kYXRVemF2ZXJrYUhsYXZuaSkgKX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURpdi5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybUJ1aWxkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGlucHV0LCBjaGFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnRbXCJkYXR1bVV6YXZlcmt5XCJdID0gdGhhdC5maW5kRmllbGRzKFwiZGF0X3V6XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvdmVkZW7DrSB1esOhdsSbcmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudFtcInR5cFV6YXZlcmt5XCJdID09IDEwKSB7IC8vL2TDrWzEjcOtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnV6YXZlcmthRGlsY2koY250W1wiZGF0dW1VemF2ZXJreVwiXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51emF2ZXJrYUhsYXZuaShjbnRbXCJkYXR1bVV6YXZlcmt5XCJdLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGlucHV0LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoZ2NvbnRlbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnY29udGVudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInBva1V6YXZlcmt5Rm9ybVwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRTZWN0aW9uKFwiVXrDoXbEm3JrYVwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KFwiRGF0dW0gcG9zbGVkbsOtIGhsYXZuw60gdXrDoXbEm3JreVwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImRhdF91el9obFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuZGF0VXphdmVya2FIbGF2bmlcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdyhcIkRhdHVtIGEgxI1hcyBwb3NsZWRuw60gZMOtbMSNw60gdXrDoXbEm3JreVwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImRhdF91el9kZW5cIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LmRhdFV6YXZlcmthRGlsY2ksXHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIlxyXG5cclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdyhcIlV6YXbFmcOtdCBrZSBkbmlcIilcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJkYXRfdXpcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlVHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpbml0aWFsVmFsdWU6IG1vbWVudCgpLnRvRGF0ZSgpXHJcblxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdyh7IG5hbWU6IFwiYnV0dG9uc1wiLCBjdXN0b21DbGFzczogXCJyaWdodFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkxNUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwiXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiUHJvdsOpc3QgdXrDoXbEm3JrdVwiLCBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVemF2ZXJrYVwiLCBydW46IGZ1bmN0aW9uIChldikge1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVEYXQgPSB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImRhdF91elwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVV6YXZlcmthID0gdGhhdC5maW5kRmllbGRzKFwidHlwVXphdmVya3lcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVV6YXZlcmthID09IDEwKSB7IC8vL2TDrWzEjcOtXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXphdmVya2FEaWxjaSh2YWx1ZURhdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51emF2ZXJrYUhsYXZuaSh2YWx1ZURhdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LnByb21pc2VVemF2ZXJrYSh2YWx1ZURhdCwgdHJ1ZSwgdmFsdWVVemF2ZXJrYSwgdGhhdC5kYXRVemF2ZXJrYUhsYXZuaSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9VWkFWxZhFTsONIFBMQVRFQk7DjUhPIFRFUk1JTsOBTFVcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy92YXIgdGFiID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGhlYWRlckZvcm0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXphdmVya2FIbGF2bmkoZGF0RG86IERhdGUsIGtvbnRyb2xhOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXREbyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJWeWJlcnRlIGRhdHVtIHV6w6F2xJtya3khXCIsIFwiZy1zdGF0ZS1lcnJvclwiLCAzMDAwKTtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hFcnJvcih0aGF0LCBcIlZ5YmVydGUgZGF0dW0gdXrDoXbEm3JreSFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLklzbC5Qb2tLbmloYS51emF2ZXJrYUhsYXZuaShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0RG86IGRhdERvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBEZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrb250cm9sYToga29udHJvbGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChvbGRadXN0YXRlaykgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoU3VjY2Vzcyh0aGF0LCBcIlV6w6F2xJtya2EgcHJvYsSbaGxhIHYgcG/FmcOhZGt1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tVemF2ZXJrYShkYXREbywgMjAsIG9sZFp1c3RhdGVrLCB0aGF0LmRhdFV6YXZlcmthSGxhdm5pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgb2JqLmV4Y2VwdGlvblR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIG9iai5iYXNlTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLmRhdGEubWVtYmVyKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouZGF0YS5tZW1iZXIgPT0gXCJrb250cm9sYVwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShvYmouYmFzZU1lc3NhZ2UgKyBcIjwvYnI+IFBva3JhxI1vdmF0P1wiKS5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhhdC51emF2ZXJrYURpbGNpKGRhdERvLCBmYWxzZSkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1emF2ZXJrYURpbGNpKGRhdERvOiBEYXRlLCBrb250cm9sYTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0RG8gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hFcnJvcih0aGF0LCBcIlZ5YmVydGUgZGF0dW0gdXrDoXbEm3JreSFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rS25paGEudXphdmVya2FEaWxjaShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0RG86IGRhdERvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBEZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrb250cm9sYToga29udHJvbGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChvbGRadXN0YXRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoU3VjY2Vzcyh0aGF0LCBcIlV6w6F2xJtya2EgcHJvYsSbaGxhIHYgcG/FmcOhZGt1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tVemF2ZXJrYShkYXREbywgMTAsIG9sZFp1c3RhdGVrLCB0aGF0LmRhdFV6YXZlcmthSGxhdm5pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgb2JqLmV4Y2VwdGlvblR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIG9iai5iYXNlTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqLmRhdGEubWViZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmRhdGEubWVtYmVyID09IFwia29udHJvbGFcIikge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKG9iai5iYXNlTWVzc2FnZSArIFwiPC9icj4gUG9rcmHEjW92YXQ/XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnV6YXZlcmthRGlsY2koZGF0RG8sIGZhbHNlKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRpc2tVemF2ZXJrYShkYXR1bURvLCB0eXBVemF2ZXJreSwgb2xkWnVzdGF0ZWssIGRhdHVtT2QpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgICAgIG5hbWUgPSBcInBva19wdG1fdXpwcm90XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0Vm5pdHJuaVRpc2tVemF2ZXJrYSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrVXphdmVya2FcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlzayB1esOhdsSbcmt5XCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOlRpc2tVemF2ZXJreVwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBpeHBfZGVuOiB0aGF0Lml4cERlbiwgZGF0dW1EbzogZGF0dW1EbywgdHlwVXphdmVya3k6IHR5cFV6YXZlcmt5LCBuT2xkWnVzOiBvbGRadXN0YXRlaywgZGF0dW1PZDogZGF0dW1PZCwgc2V0dGluZ09kc3RyYW5rb3ZhdDogdGhhdC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiUG9rLk5hc3RhdmVuaS5PZHN0cmFua292YW5pXCIpIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhY3RWbml0cm5pVGlza1V6YXZlcmthLnJ1bigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=