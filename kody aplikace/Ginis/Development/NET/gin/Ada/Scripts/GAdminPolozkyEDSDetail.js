"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAdminPolozkyEDSDetail = class GAdminPolozkyEDSDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail programu EDS"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actDetailEDS"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    if (that.Uroven == "PIG") {
                        that.title = (that.RezimNova == true ? "Nová hodnota " : "Detail hodnoty ") + that.globals.Nazev_prg_eds;
                        that.taskId = "actDetailEDSPRG"; // označení položky v taskListu
                    }
                    if (that.Uroven == "PIJ") {
                        that.title = (that.RezimNova == true ? "Nová hodnota " : "Detail hodnoty ") + that.globals.Nazev_prj_eds;
                        that.taskId = "actDetailEDSPIJ"; // označení položky v taskListu
                    }
                    that.actions.addRange({
                        actOK: {
                            caption: "Uložit", // OK
                            icon: "gi-save", // ikona 
                            visible: true, // vždy viditelné
                            enabled: that.globals.Param_Administrace_EDS,
                            run: function () {
                                that.closing(true);
                            }
                        },
                        actZrusit: {
                            caption: "Zrušit", // popis
                            icon: "gi-window-close", // ikona 
                            visible: true, // vždy viditelné
                            enabled: true, // vždy spustitelné
                            run: function () {
                                that.closing(false);
                            }
                        }
                    });
                    if (that.Uroven == "PIG") {
                        this.actions.addRange({
                            actSeznamPod: {
                                caption: "Seznam hodnot " + that.globals.Nazev_prj_eds,
                                align: "opposite",
                                visible: that.RezimNova == false,
                                favorite: true,
                                icon: "gi-plus",
                                run: () => {
                                    var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminPolozkyEDS", {
                                        id: 'DetailEDS#',
                                        Uroven: "PIJ",
                                        HodnotaNad: that.modelEDS.xpf_pf
                                    });
                                    return;
                                }
                            }
                        });
                    }
                    //*******************************************************
                    // P ř i d á v á n í   a k c í   d o   m e n u   b a r u
                    if (that.Uroven == "PIG") {
                        this.menuBar(this.actions.createBar(["actOK*", "actZrusit*"], ["actSeznamPod*"]));
                    }
                    else {
                        this.menuBar(this.actions.createBar(["actOK*", "actZrusit*"]));
                    }
                    //this.menuBar([
                    //    { action: that.actions.actOK, favorite: true, primary: true },                                                         // Ok
                    //    { action: that.actions.actZrusit, favorite: true },                                                     // Zrušit
                    //]);
                    this.commandBar([
                        { action: that.actions.actOK, favorite: true, primary: true }, // Ok
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    // *****************************
                    //    Formulář tabu
                    var AdmindetailEDSForm = new Gordic.Forms.Form({ name: "AdminDetailEDS", layoutDescriptor: "L1M1S1 LMS-3-6-3" });
                    AdmindetailEDSForm.addField("gdummyfield", "w-h", {
                        model: "uroven",
                        name: "uroven"
                    });
                    if (that.Uroven == "PIG") {
                        AdmindetailEDSForm.addRow(that.globals.Nazev_prg_eds).addField("gstringbox", "w-12", Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_prg_eds, true, true, {
                            disabled: !that.RezimNova,
                            name: "xpf_pf_prg",
                            validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ min: that.globals.Delka_prg_eds, max: that.globals.Delka_prg_eds, message: "Chybná délka hodnoty " + that.globals.Nazev_prj_eds + " (" + that.globals.Delka_prg_eds + ")" })]
                        }));
                    }
                    else {
                        AdmindetailEDSForm.addRow(that.globals.Nazev_prj_eds).addField("gstringbox", "w-6", { disabled: true, name: "xpf_pf_prg" })
                            .addField("gstringbox", "w-6", Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_prj_eds, true, true, {
                            disabled: !that.RezimNova,
                            name: "xpf_pf_prj",
                            validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ min: that.globals.Delka_prj_eds, max: that.globals.Delka_prj_eds, message: "Překročena maximální délka hodnoty " + that.globals.Nazev_prj_eds + "(" + that.globals.Delka_prj_eds + ")" })]
                        }));
                    }
                    ;
                    AdmindetailEDSForm
                        .addRow("Název").addField("gstringbox", "w-12", { disabled: false, name: "nazev" })
                        .addRow("Platnost od").addField("gnumberbox", "w-12", { disabled: false, name: "rok_od" })
                        .addRow("Platnost do").addField("gnumberbox", "w-12", { disabled: false, name: "rok_do" });
                    if (that.Uroven == "PIJ") {
                        AdmindetailEDSForm
                            .addRow("Kód UCT").addField("gstringbox", "w-12", Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_kod_uct, true, true, {
                            disabled: false,
                            name: "kod_uct",
                            validators: [new Gordic.Validators.Length({ min: 0, max: that.globals.Delka_kod_uct, message: "Překročena maximální délka hodnoty" })]
                        }))
                            .addRow("EDS/SMVS").addField("gcheck", "w-12", {
                            disabled: false, name: "priz_eds", modelValueTransform: {
                                apply: (v) => {
                                    return v == 1;
                                },
                                collect: (v) => {
                                    return (v ? 1 : 0);
                                }
                            }
                        });
                    }
                    ;
                    AdmindetailEDSForm
                        .addRow("Aktivita").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", dropdown: true, model: "model.aktivita = value.aktivita", serverFilters: { aktivita: [100, 500] }, validators: [new Gordic.Validators.Required()] });
                    $("<div class='js-detailEDS'>").appendTo(that.element).gform("createFrom", AdmindetailEDSForm).findFields().gfield("model", "apply", that.modelEDS);
                    if (!that.globals.Param_Administrace_EDS) {
                        that.findFields().gfield("option", "disabled", true);
                    }
                }
                ;
                //---------------------------------------------------------------
                // Zavírání formuláře
                closing(provest) {
                    var that = this;
                    if (provest == true) {
                        var $cDiv = $(this.contentDiv);
                        //this.contentDiv.showFlash({ label: 'Ukladam akci ' + cislo });
                        if ($cDiv.findForms().gform("isValid", true)) {
                            //var dto = {};
                            $cDiv.findFields().gfield("model", "collect", this.modelEDS);
                            $cDiv.findFields().gfield("confirm");
                            if (that.Uroven == "PIG") {
                                this.modelEDS.xpf_pf = this.modelEDS.xpf_pf_prg;
                            }
                            else {
                                this.modelEDS.xpf_pf = this.modelEDS.xpf_pf_prg + this.modelEDS.xpf_pf_prj;
                            }
                            this.close({ data: this.modelEDS }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GAdminPolozkyEDSDetail = __decorate([
                gcontent
            ], GAdminPolozkyEDSDetail);
            WebClient.GAdminPolozkyEDSDetail = GAdminPolozkyEDSDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluUG9sb3preUVEU0RldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5Qb2xvemt5RURTRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FnTWY7QUFoTUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZ01uQjtJQWhNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ003QjtRQWhNb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXhEOztvQkFFSSxVQUFLLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxtRUFBbUU7b0JBQ2xHLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBb0xyRCxDQUFDO2dCQTlLRyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7d0JBQ3pHLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsQ0FBQywrQkFBK0I7b0JBQ3BFLENBQUM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO3dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFH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dCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR0FkbWluUG9sb3preUVEU0RldGFpbCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJEZXRhaWwgcHJvZ3JhbXUgRURTXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0RGV0YWlsRURTXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBwdWJsaWMgbW9kZWxFRFM6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzeHBmRHRvO1xyXG4gICAgICAgIHByaXZhdGUgVXJvdmVuOiBTdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXppbU5vdmE6IEJvb2xlYW47XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gSW5pY2lhbGl6YWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5Vcm92ZW4gPT0gXCJQSUdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC50aXRsZSA9ICh0aGF0LlJlemltTm92YSA9PSB0cnVlID8gXCJOb3bDoSBob2Rub3RhIFwiIDogXCJEZXRhaWwgaG9kbm90eSBcIikgKyB0aGF0Lmdsb2JhbHMuTmF6ZXZfcHJnX2VkcztcclxuICAgICAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3REZXRhaWxFRFNQUkdcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJSlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRpdGxlID0gKHRoYXQuUmV6aW1Ob3ZhID09IHRydWUgPyBcIk5vdsOhIGhvZG5vdGEgXCIgOiBcIkRldGFpbCBob2Rub3R5IFwiKSArIHRoYXQuZ2xvYmFscy5OYXpldl9wcmpfZWRzO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdERldGFpbEVEU1BJSlwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gYWtjw61cclxuICAgICAgICAgICAgICAgIGFjdE9LOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPS1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYSBcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgdmlkaXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfRURTISxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zaW5nKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHNwdXN0aXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJR1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFNlem5hbVBvZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNlem5hbSBob2Rub3QgXCIgKyB0aGF0Lmdsb2JhbHMuTmF6ZXZfcHJqX2VkcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduOiBcIm9wcG9zaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuUmV6aW1Ob3ZhID09IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preUVEU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxFRFMjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXJvdmVuOiBcIlBJSlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIb2Rub3RhTmFkOiB0aGF0Lm1vZGVsRURTLnhwZl9wZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyBQIMWZIGkgZCDDoSB2IMOhIG4gw60gICBhIGsgYyDDrSAgIGQgbyAgIG0gZSBuIHUgICBiIGEgciB1XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJR1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPSypcIiwgXCJhY3RacnVzaXQqXCJdLCBbXCJhY3RTZXpuYW1Qb2QqXCJdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPSypcIiwgXCJhY3RacnVzaXQqXCJdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9LLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWnJ1xaFpdFxyXG4gICAgICAgICAgICAvL10pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T0ssIGZhdm9yaXRlOiB0cnVlLCBwcmltYXJ5OiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2tcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWnJ1xaFpdFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgICBGb3JtdWzDocWZIHRhYnVcclxuICAgICAgICAgICAgdmFyIEFkbWluZGV0YWlsRURTRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiQWRtaW5EZXRhaWxFRFNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtNi0zXCIgfSlcclxuXHJcbiAgICAgICAgICAgIEFkbWluZGV0YWlsRURTRm9ybS5hZGRGaWVsZChcImdkdW1teWZpZWxkXCIsIFwidy1oXCIsIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcInVyb3ZlblwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ1cm92ZW5cIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJR1wiKSB7XHJcbiAgICAgICAgICAgICAgICBBZG1pbmRldGFpbEVEU0Zvcm0uYWRkUm93KHRoYXQuZ2xvYmFscy5OYXpldl9wcmdfZWRzISkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuRmllbGQuZ2V0Q291bnRlck9wdGlvbnModGhhdC5nbG9iYWxzLkRlbGthX3ByZ19lZHMhLCB0cnVlLCB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQuUmV6aW1Ob3ZhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ4cGZfcGZfcHJnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IHRoYXQuZ2xvYmFscy5EZWxrYV9wcmdfZWRzISwgbWF4OiB0aGF0Lmdsb2JhbHMuRGVsa2FfcHJnX2VkcyEsIG1lc3NhZ2U6IFwiQ2h5Ym7DoSBkw6lsa2EgaG9kbm90eSBcIiArIHRoYXQuZ2xvYmFscy5OYXpldl9wcmpfZWRzICsgXCIgKFwiICsgdGhhdC5nbG9iYWxzLkRlbGthX3ByZ19lZHMhICsgXCIpXCIgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBBZG1pbmRldGFpbEVEU0Zvcm0uYWRkUm93KHRoYXQuZ2xvYmFscy5OYXpldl9wcmpfZWRzISkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwieHBmX3BmX3ByZ1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKHRoYXQuZ2xvYmFscy5EZWxrYV9wcmpfZWRzISwgdHJ1ZSwgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQuUmV6aW1Ob3ZhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwieHBmX3BmX3ByalwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogdGhhdC5nbG9iYWxzLkRlbGthX3Byal9lZHMhLCBtYXg6IHRoYXQuZ2xvYmFscy5EZWxrYV9wcmpfZWRzISwgbWVzc2FnZTogXCJQxZlla3JvxI1lbmEgbWF4aW3DoWxuw60gZMOpbGthIGhvZG5vdHkgXCIgKyB0aGF0Lmdsb2JhbHMuTmF6ZXZfcHJqX2VkcyArIFwiKFwiICsgdGhhdC5nbG9iYWxzLkRlbGthX3Byal9lZHMhICsgXCIpXCIgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIEFkbWluZGV0YWlsRURTRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXpldlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcIm5hemV2XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQbGF0bm9zdCBvZFwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInJva19vZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUGxhdG5vc3QgZG9cIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJyb2tfZG9cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJSlwiKSB7XHJcbiAgICAgICAgICAgICAgICBBZG1pbmRldGFpbEVEU0Zvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS8OzZCBVQ1RcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKHRoYXQuZ2xvYmFscy5EZWxrYV9rb2RfdWN0ISwgdHJ1ZSwgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb2RfdWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDAsIG1heDogdGhhdC5nbG9iYWxzLkRlbGthX2tvZF91Y3QhLCBtZXNzYWdlOiBcIlDFmWVrcm/EjWVuYSBtYXhpbcOhbG7DrSBkw6lsa2EgaG9kbm90eVwiIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRURTL1NNVlNcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInByaXpfZWRzXCIsIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2ID09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHYgPyAxIDogMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIEFkbWluZGV0YWlsRURTRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdGl2aXRhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLCB7IG5hbWU6IFwiYWt0aXZpdGFcIiwgZHJvcGRvd246IHRydWUsIG1vZGVsOiBcIm1vZGVsLmFrdGl2aXRhID0gdmFsdWUuYWt0aXZpdGFcIiwgc2VydmVyRmlsdGVyczogeyBha3Rpdml0YTogWzEwMCwgNTAwXSB9LCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nanMtZGV0YWlsRURTJz5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgQWRtaW5kZXRhaWxFRFNGb3JtLCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbEVEUyk7XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9FRFMhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBaYXbDrXLDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgIGNsb3NpbmcocHJvdmVzdCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChwcm92ZXN0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkY0RpdiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jb250ZW50RGl2LnNob3dGbGFzaCh7IGxhYmVsOiAnVWtsYWRhbSBha2NpICcgKyBjaXNsbyB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkY0Rpdi5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBkdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWxFRFMpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjb25maXJtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJR1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbEVEUy54cGZfcGYgPSB0aGlzLm1vZGVsRURTLnhwZl9wZl9wcmchO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsRURTLnhwZl9wZiA9IHRoaXMubW9kZWxFRFMueHBmX3BmX3ByZyEgKyB0aGlzLm1vZGVsRURTLnhwZl9wZl9wcmohO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IHRoaXMubW9kZWxFRFMgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHsgZGF0YTogbnVsbCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6YXbDrXLDoW7DrSBwb3PDrWxhbsOhbSB6cMSbdCBvYmpla3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==