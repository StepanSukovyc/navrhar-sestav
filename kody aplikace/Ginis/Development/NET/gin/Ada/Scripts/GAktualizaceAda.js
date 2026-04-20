"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAktualizaceAda.js                                                        </Name>
//    <Description> GAktualizaceAda                                                                                  </Description>
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
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAktualizaceAda = class GAktualizaceAda extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter_akce = {};
                    this.model = { rok: 0, mesic: 0 };
                    this.title = "Aktualizace akcí";
                    this.taskId = "actAktualizaceAda"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var cnt = this;
                    cnt.model.rok = cnt.rok_akt;
                    cnt.model.mesic = cnt.mesic_akt;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    cnt.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            visible: true,
                            enabled: true,
                            run: function () {
                                that.tryClose();
                            }
                        },
                        actImport: {
                            caption: "Import",
                            visible: true,
                            enabled: false,
                            run: function () {
                                that.importuj();
                            }
                        },
                        actKontrola: {
                            caption: "Kontrola",
                            visible: true,
                            enabled: true,
                            run: function () {
                                that.kontrola();
                            }
                        },
                        actPresun: {
                            caption: "Přesun",
                            visible: true,
                            enabled: true,
                            run: function () {
                                that.presun();
                            }
                        },
                        actKontrolaTSKMP: {
                            caption: "Kontrola TSK, MP",
                            visible: false,
                            enabled: false,
                            run: function () {
                                that.kontrola_tsk();
                            }
                        },
                        actKontrolaMC: {
                            caption: "Kontrola MČ",
                            visible: false,
                            enabled: false,
                            run: function () {
                                that.kontrola_mc();
                            }
                        },
                        actAktualizaceTSKMP: {
                            caption: "Aktualizace TSK, MP",
                            visible: false,
                            enabled: false,
                            run: function () {
                                that.aktualizace_tsk();
                            }
                        },
                        actAktualizaceMC: {
                            caption: "Aktualizace MČ",
                            visible: false,
                            enabled: false,
                            run: function () {
                                that.aktualizace_mc();
                            }
                        },
                        actAkceStv: {
                            caption: "Akce STV",
                            visible: false,
                            enabled: false,
                            run: function () {
                                that.aktualizace_akci();
                            }
                        },
                        actUkaz: {
                            caption: "Ukazat tlacika",
                            run: function () {
                                that.ukaz_tlacitka();
                            }
                        }
                    });
                    cnt.menuBar(this.actions.createBar(["actImport*", "actKontrola*", "actPresun*"]));
                    //            cnt.commandBar(this.actions.createBar(["actKontrolaTSKMP*", "actAktualizaceTSKMP*", "actAkceStv*", "actKontrolaMC*", "actAktualizaceMC*","actClose*"]));
                    cnt.commandBar(this.actions.createBar(["actClose"], ["actKontrolaTSKMP*", "actAktualizaceTSKMP*", "actAkceStv*", "actKontrolaMC*", "actAktualizaceMC*"]));
                    //this.mainTable = $("<div class='js-Parametry_aktualizace'>").appendTo(this.element)
                    //    .css("height", "60%")
                    //    .css("overflow", "auto")
                    //    .gtab({
                    //        title: "Parametry aktualizace", opened: true, locked: true,
                    //        menuBar: this.actions.createBar(["actPrepocet*"])
                    //    })
                    //// .gautofit({ minimalHeight: 420 });
                    cnt.detailForm = new Gordic.Forms.Form({ name: "detailparametr", layoutDescriptor: "L4M4S2 L-3-6-3 M-3-6-3 S-3-6-3" })
                        .addRow("Soubor pro načtení")
                        .addField("gfilefield", {
                        validators: [new Gordic.Validators.Required()],
                        name: "uploadFile",
                        maxFileCount: 1,
                        change: function (ev, changeObj) {
                            var cnt = $.content($(ev.target));
                            if (changeObj.value.length != 0) {
                                that.file = cnt.findFields("uploadFile").gfilefield("getValue")[0];
                                that.actions.actImport.enabled(true);
                                that.actions.actKontrola.enabled(true);
                                that.actions.actPresun.enabled(true);
                                //that.callToImport(file)//.done(function (o) {
                                //	cnt.findFields("Preview").gfield("setValue", o);
                                //});
                            }
                            else {
                                that.actions.actImport.enabled(false);
                                that.actions.actKontrola.enabled(false);
                                that.actions.actPresun.enabled(false);
                            }
                        },
                    })
                        .addRow("Počet zaznamů v pracovní oblasi").addField("gnumberbox", "w-4", { disabled: true, name: "pocet", initialValue: 0 });
                    cnt.isl.AkceServis.pocet_Prac()
                        .getData()
                        .done(function (retVal) {
                        if (retVal.pocet != 0) {
                            cnt.findFields("pocet").gfield("setValue", retVal.pocet);
                        }
                    });
                    $("<div class='js-aktualizaceada'>").appendTo(that.element).gform("createFrom", that.detailForm);
                    cnt.element.gshortcut({
                        key: "ctrl+shift+f11",
                        group: Gordic.Shortcuts.Groups.App,
                        description: "zobrazit",
                        action: cnt.actions.actUkaz
                    });
                }
                kontrola_tsk() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá kontrola TSK a MP");
                    cnt.isl.AkceServis.kontrola_TSK()
                        .getData()
                        .done(function (data) {
                        cnt.dialogs.alert("Pocet TSK a MP: " + data.pocet);
                    })
                        .always(function () {
                        cnt.endOperation();
                    });
                }
                kontrola_mc() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá kontrola MČ");
                    cnt.isl.AkceServis.kontrola_MC()
                        .getData()
                        .done(function (data) {
                        cnt.dialogs.alert("Počet MČ: UCT:" + data.pocet + ", ROZ:" + data.pocet2);
                    })
                        .always(function () {
                        cnt.endOperation();
                    });
                }
                aktualizace_tsk() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá aktualizace TSK a MP");
                    cnt.isl.AkceServis.aktualizace_TSK()
                        .getData()
                        .done(function (data) {
                        cnt.dialogs.alert("Aktualizace dat TSK a MP byla úspěšně provedena.");
                    })
                        .always(function () {
                        cnt.endOperation();
                    });
                }
                aktualizace_mc() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá aktualizace MČ");
                    cnt.isl.AkceServis.aktualizace_MC()
                        .getData()
                        .done(function (data) {
                        cnt.dialogs.alert("Aktualizace dat MČ byla úspěšně provedena.");
                    })
                        .always(function () {
                        cnt.endOperation();
                    });
                }
                aktualizace_akci() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá aktualizace STV");
                    cnt.isl.AkceServis.aktualizace_STV()
                        .getData()
                        .done(function (data) {
                        cnt.dialogs.alert("Aktualizace dat stavů akcí byla úspěšně provedena.");
                    })
                        .always(function () {
                        cnt.endOperation();
                    });
                }
                ukaz_tlacitka() {
                    var cnt = this;
                    cnt.actions.actKontrolaTSKMP.update({ visible: true, enabled: true });
                    cnt.actions.actKontrolaMC.update({ visible: true, enabled: true });
                    cnt.actions.actAktualizaceTSKMP.update({ visible: true, enabled: true });
                    cnt.actions.actAktualizaceMC.update({ visible: true, enabled: true });
                    cnt.actions.actAkceStv.update({ visible: true, enabled: true });
                }
                importuj() {
                    var cnt = this;
                    //  vysl = messagebox("Import externí dávky", "Předchozí dávka nebyla proúčtována, přepsat ?", Question!, YesNo!)
                    if (cnt.file != undefined) {
                        cnt.beginOperation("Probíhá import dat");
                        cnt.isl.AkceServis.pocet_Prac()
                            .getData()
                            .done(function (retVal) {
                            if (retVal.pocet != 0) {
                                cnt.dialogs.messageBox("Dotaz - Import externí dávky", "Předchozí dávka nebyla proúčtována, přepsat ??", GDlg.mbbYesNo, GDlg.mbiQuestion)
                                    .on("yes", function () {
                                    cnt.endOperation();
                                    cnt.beginOperation("Probíhá výmaz dat");
                                    cnt.isl.AkceServis.vymaz_Prac()
                                        .getData()
                                        .done(function (retVal) {
                                        if (retVal.vysledek == true) {
                                            cnt.endOperation();
                                            cnt.beginOperation("Probíhá načtení dat");
                                            cnt.isl.AkceServis.loadFromFile({ fileInfo: cnt.file, nazev: "xxx" })
                                                .getData()
                                                .done(function (retVal) {
                                                if (retVal.vysledek == true) {
                                                    cnt.dialogs.alert("Import dat byl úspěšně proveden.");
                                                }
                                                else {
                                                    cnt.dialogs.alert("Při importu dat došlo k chybě." + " - " + retVal.vysledek_txt);
                                                }
                                            })
                                                .always(function (retVal) {
                                                cnt.endOperation();
                                            });
                                        }
                                    });
                                })
                                    .on("no", function () {
                                    cnt.isl.AkceServis.loadFromFile({ fileInfo: cnt.file, nazev: "xxx" })
                                        .getData()
                                        .done(function (retVal) {
                                        if (retVal.vysledek == true) {
                                            cnt.dialogs.alert("Import dat byl úspěšně proveden.");
                                        }
                                        else {
                                            cnt.dialogs.alert("Při importu dat došlo k chybě." + " - " + retVal.vysledek_txt);
                                        }
                                    })
                                        .always(function (retVal) {
                                        cnt.endOperation();
                                    });
                                });
                            }
                            else {
                                cnt.isl.AkceServis.loadFromFile({ fileInfo: cnt.file, nazev: "xxx" })
                                    .getData()
                                    .done(function (retVal) {
                                    if (retVal.vysledek == true) {
                                        cnt.dialogs.alert("Import dat byl úspěšně proveden.");
                                    }
                                    else {
                                        cnt.dialogs.alert("Při importu dat došlo k chybě." + " - " + retVal.vysledek_txt);
                                    }
                                })
                                    .always(function (retVal) {
                                    cnt.endOperation();
                                });
                            }
                        });
                    }
                }
                kontrola() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá kontrola dat");
                    cnt.isl.AkceServis.kontrola()
                        .getData()
                        .done(function (retVal) {
                        if (retVal.pocet == 0) {
                            cnt.dialogs.alert("V datech nebyly nalezeny žádné duplicity s existujícími daty!");
                        }
                        else {
                            cnt.beginOperation("Probíhá načtení duplicit");
                            cnt.isl.AkceServis.kontrola_Vysledek()
                                .getData()
                                .done(function (retVal) {
                                console.log("data", retVal);
                                var VysledekForm = new Gordic.Forms.Form({ name: "VysledekForm", layoutDescriptor: "L1M1S1 LMS-1-10-1" }) //.addSection("Souhrn VP")
                                    .addField("gtable", {
                                    data: retVal,
                                    columns: new Gordic.Data.GridFormat()
                                        .addTextColumn({
                                        name: "nks", caption: "IČ", description: "IČ", align: "left", width: 70
                                    })
                                        .addTextColumn({
                                        name: "t_ico", caption: "Organizace", description: "Organizace", align: "left", width: 160
                                    })
                                        .addNumberColumn({
                                        name: "rok", caption: "Rok", description: "Rok", width: 30
                                    })
                                        .addNumberColumn({
                                        name: "mesic", caption: "Měsíc", description: "Měsíc", width: 20
                                    })
                                        .addNumberColumn({
                                        name: "drd", caption: "DRD", description: "DRD", width: 20
                                    })
                                        .addTextColumn({
                                        name: "uea", caption: "SU", description: "SU", width: 20
                                    })
                                        .addNumberColumn({
                                        name: "den", caption: "Počet zápisů", description: "Počet zápisů", width: 20
                                    })
                                });
                                let prom_vysledek = cnt.dialogs.simpleForm("Výsledek", VysledekForm, retVal, { width: 900, height: 600, commandBar: ["cancel!"] });
                                let prom_vysledek_pro = prom_vysledek.createDialogPromise( /*"close"*/ /*"yes"*/ /*"ok"*/ /*, { duvod: string }*/)
                                    .then(function (data) {
                                    if (data) {
                                    }
                                });
                            })
                                .always(function (retVal) {
                                cnt.endOperation();
                            });
                            // cnt.dialogs.alert("V datech byly nalezeny duplicity s existujícími daty!");
                        }
                    })
                        .always(function (retVal) {
                        cnt.endOperation();
                    });
                }
                presun() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá přesun dat");
                    cnt.isl.AkceServis.presun()
                        .getData()
                        .done(function (retVal) {
                        if (retVal.vysledek == true) {
                            cnt.dialogs.alert("Výsledek přesunu dat - OK - data byla načtena");
                        }
                        else {
                            cnt.dialogs.alert("Výsledek přesunu dat - CHYBA");
                        }
                    })
                        .always(function (retVal) {
                        cnt.endOperation();
                    });
                }
            };
            GAktualizaceAda = __decorate([
                gcontent
            ], GAktualizaceAda);
            WebClient.GAktualizaceAda = GAktualizaceAda;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrdHVhbGl6YWNlQWRhLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBa3R1YWxpemFjZUFkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQSthZjtBQS9hRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErYW5CO0lBL2FnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErYTdCO1FBL2FvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQUtZLGdCQUFXLEdBQTZDLEVBQUUsQ0FBQztvQkFRM0QsVUFBSyxHQUFtQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO29CQVNwRSxVQUFLLEdBQUcsa0JBQWtCLENBQUM7b0JBQzNCLFdBQU0sR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLCtCQUErQjtnQkFtWmpFLENBQUM7Z0JBalpHLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztvQkFDNUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFFaEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUdiLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUss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Z0JBRDNCLFFBQVE7ZUFDSSxlQUFlLENBMGEzQjtZQTFhWSx5QkFBZSxrQkEwYTNCLENBQUE7UUFDTCxDQUFDLEVBL2FvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErYTdCO0lBQUQsQ0FBQyxFQS9hZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK2FuQjtBQUFELENBQUMsRUEvYVMsTUFBTSxLQUFOLE1BQU0sUUErYWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrdHVhbGl6YWNlQWRhLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrdHVhbGl6YWNlQWRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWt0dWFsaXphY2VBZGEgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJfYWtjZTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1Nlem5hbUFkYUZpbHRlckR0byA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIG1haW5UYWJsZTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcblxyXG4gICAgICAgIHByaXZhdGUgcm9rX2FrdDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbWVzaWNfYWt0OiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWw6IHsgcm9rOiBudW1iZXIsIG1lc2ljOiBudW1iZXIgfSA9IHsgcm9rOiAwLCBtZXNpYzogMH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGlkZW50aWZpa2F0b3IgdXBsb2Fkb3ZhbmVobyBzb3Vib3J1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWxlOiBhbnk7ICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcbiAgICAgICAgICBcclxuICAgICAgICB0aXRsZSA9IFwiQWt0dWFsaXphY2UgYWtjw61cIjtcclxuICAgICAgICB0YXNrSWQgPSBcImFjdEFrdHVhbGl6YWNlQWRhXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY250Lm1vZGVsLnJvayA9IGNudC5yb2tfYWt0O1xyXG4gICAgICAgICAgICBjbnQubW9kZWwubWVzaWMgPSBjbnQubWVzaWNfYWt0O1xyXG5cclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RJbXBvcnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkltcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW1wb3J0dWooKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXN1bjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZZXN1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVzdW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdEtvbnRyb2xhVFNLTVA6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbnRyb2xhIFRTSywgTVBcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb250cm9sYV90c2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGFNQzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29udHJvbGEgTcSMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua29udHJvbGFfbWMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0QWt0dWFsaXphY2VUU0tNUDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQWt0dWFsaXphY2UgVFNLLCBNUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHVhbGl6YWNlX3RzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RBa3R1YWxpemFjZU1DOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBa3R1YWxpemFjZSBNxIxcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3R1YWxpemFjZV9tYygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RBa2NlU3R2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBa2NlIFNUVlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdHVhbGl6YWNlX2FrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgIGFjdFVrYXo6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVrYXphdCB0bGFjaWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudWthel90bGFjaXRrYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdEltcG9ydCpcIiwgXCJhY3RLb250cm9sYSpcIiwgXCJhY3RQcmVzdW4qXCJdKSk7XHJcbi8vICAgICAgICAgICAgY250LmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RLb250cm9sYVRTS01QKlwiLCBcImFjdEFrdHVhbGl6YWNlVFNLTVAqXCIsIFwiYWN0QWtjZVN0dipcIiwgXCJhY3RLb250cm9sYU1DKlwiLCBcImFjdEFrdHVhbGl6YWNlTUMqXCIsXCJhY3RDbG9zZSpcIl0pKTtcclxuICAgICAgICAgICAgY250LmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZVwiXSxbXCJhY3RLb250cm9sYVRTS01QKlwiLCBcImFjdEFrdHVhbGl6YWNlVFNLTVAqXCIsIFwiYWN0QWtjZVN0dipcIiwgXCJhY3RLb250cm9sYU1DKlwiLCBcImFjdEFrdHVhbGl6YWNlTUMqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMubWFpblRhYmxlID0gJChcIjxkaXYgY2xhc3M9J2pzLVBhcmFtZXRyeV9ha3R1YWxpemFjZSc+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmNzcyhcImhlaWdodFwiLCBcIjYwJVwiKVxyXG4gICAgICAgICAgICAvLyAgICAuY3NzKFwib3ZlcmZsb3dcIiwgXCJhdXRvXCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRpdGxlOiBcIlBhcmFtZXRyeSBha3R1YWxpemFjZVwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIG1lbnVCYXI6IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UHJlcG9jZXQqXCJdKVxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLy8vIC5nYXV0b2ZpdCh7IG1pbmltYWxIZWlnaHQ6IDQyMCB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC5kZXRhaWxGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZXRhaWxwYXJhbWV0clwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTRTMiBMLTMtNi0zIE0tMy02LTMgUy0zLTYtM1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU291Ym9yIHBybyBuYcSNdGVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cGxvYWRGaWxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmlsZUNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgkKGV2LnRhcmdldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlIS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWxlID0gY250LmZpbmRGaWVsZHMoXCJ1cGxvYWRGaWxlXCIpLmdmaWxlZmllbGQoXCJnZXRWYWx1ZVwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RJbXBvcnQhLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29udHJvbGEhLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlc3VuIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmNhbGxUb0ltcG9ydChmaWxlKS8vLmRvbmUoZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXHRjbnQuZmluZEZpZWxkcyhcIlByZXZpZXdcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEltcG9ydCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29udHJvbGEhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZXN1biEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IHphem5hbcWvIHYgcHJhY292bsOtIG9ibGFzaVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJwb2NldFwiLCBpbml0aWFsVmFsdWU6IDAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuaXNsLkFrY2VTZXJ2aXMucG9jZXRfUHJhYygpXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbC5wb2NldCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC5maW5kRmllbGRzKFwicG9jZXRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLnBvY2V0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nanMtYWt0dWFsaXphY2VhZGEnPlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmRldGFpbEZvcm0pO1xyXG5cclxuICAgICAgICAgICAgY250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK3NoaWZ0K2YxMVwiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkFwcCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInpvYnJheml0XCIsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGNudC5hY3Rpb25zLmFjdFVrYXpcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgIGtvbnRyb2xhX3RzaygpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6Ega29udHJvbGEgVFNLIGEgTVBcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQuaXNsLkFrY2VTZXJ2aXMua29udHJvbGFfVFNLKClcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3MuYWxlcnQoXCJQb2NldCBUU0sgYSBNUDogXCIgKyBkYXRhLnBvY2V0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAga29udHJvbGFfbWMoKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY250LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIGtvbnRyb2xhIE3EjFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5pc2wuQWtjZVNlcnZpcy5rb250cm9sYV9NQygpXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmFsZXJ0KFwiUG/EjWV0IE3EjDogVUNUOlwiICsgZGF0YS5wb2NldCArIFwiLCBST1o6XCIgKyBkYXRhLnBvY2V0Mik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFrdHVhbGl6YWNlX3RzaygpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgYWt0dWFsaXphY2UgVFNLIGEgTVBcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQuaXNsLkFrY2VTZXJ2aXMuYWt0dWFsaXphY2VfVFNLKClcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3MuYWxlcnQoXCJBa3R1YWxpemFjZSBkYXQgVFNLIGEgTVAgYnlsYSDDunNwxJvFoW7EmyBwcm92ZWRlbmEuXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBha3R1YWxpemFjZV9tYygpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgYWt0dWFsaXphY2UgTcSMXCIpO1xyXG5cclxuICAgICAgICAgICAgY250LmlzbC5Ba2NlU2VydmlzLmFrdHVhbGl6YWNlX01DKClcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3MuYWxlcnQoXCJBa3R1YWxpemFjZSBkYXQgTcSMIGJ5bGEgw7pzcMSbxaFuxJsgcHJvdmVkZW5hLlwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWt0dWFsaXphY2VfYWtjaSgpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgYWt0dWFsaXphY2UgU1RWXCIpO1xyXG5cclxuICAgICAgICAgICAgY250LmlzbC5Ba2NlU2VydmlzLmFrdHVhbGl6YWNlX1NUVigpXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmFsZXJ0KFwiQWt0dWFsaXphY2UgZGF0IHN0YXbFryBha2PDrSBieWxhIMO6c3DEm8WhbsSbIHByb3ZlZGVuYS5cIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVrYXpfdGxhY2l0a2EoKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY250LmFjdGlvbnMhLmFjdEtvbnRyb2xhVFNLTVAhLnVwZGF0ZSh7IHZpc2libGU6IHRydWUsIGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGNudC5hY3Rpb25zLmFjdEtvbnRyb2xhTUMhLnVwZGF0ZSh7IHZpc2libGU6IHRydWUsIGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGNudC5hY3Rpb25zLmFjdEFrdHVhbGl6YWNlVFNLTVAhLnVwZGF0ZSh7IHZpc2libGU6IHRydWUsIGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGNudC5hY3Rpb25zLmFjdEFrdHVhbGl6YWNlTUMhLnVwZGF0ZSh7IHZpc2libGU6IHRydWUsIGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGNudC5hY3Rpb25zLmFjdEFrY2VTdHYhLnVwZGF0ZSh7IHZpc2libGU6IHRydWUsIGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbXBvcnR1aigpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vICB2eXNsID0gbWVzc2FnZWJveChcIkltcG9ydCBleHRlcm7DrSBkw6F2a3lcIiwgXCJQxZllZGNob3rDrSBkw6F2a2EgbmVieWxhIHByb8O6xI10b3bDoW5hLCBwxZllcHNhdCA/XCIsIFF1ZXN0aW9uISwgWWVzTm8hKVxyXG5cclxuICAgICAgICAgICAgaWYgKGNudC5maWxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY250LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIGltcG9ydCBkYXRcIilcclxuICAgICAgICAgICAgICAgIGNudC5pc2wuQWtjZVNlcnZpcy5wb2NldF9QcmFjKClcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLnBvY2V0ICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXogLSBJbXBvcnQgZXh0ZXJuw60gZMOhdmt5XCIsIFwiUMWZZWRjaG96w60gZMOhdmthIG5lYnlsYSBwcm/DusSNdG92w6FuYSwgcMWZZXBzYXQgPz9cIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB2w71tYXogZGF0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5pc2wuQWtjZVNlcnZpcy52eW1hel9QcmFjKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLnZ5c2xlZGVrID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgbmHEjXRlbsOtIGRhdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuaXNsLkFrY2VTZXJ2aXMubG9hZEZyb21GaWxlKHsgZmlsZUluZm86IGNudC5maWxlLCBuYXpldjogXCJ4eHhcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwudnlzbGVkZWsgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5hbGVydChcIkltcG9ydCBkYXQgYnlsIMO6c3DEm8WhbsSbIHByb3ZlZGVuLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmFsZXJ0KFwiUMWZaSBpbXBvcnR1IGRhdCBkb8WhbG8gayBjaHlixJsuXCIgKyBcIiAtIFwiICsgcmV0VmFsLnZ5c2xlZGVrX3R4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcIm5vXCIsIGZ1bmN0aW9uICgpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5pc2wuQWtjZVNlcnZpcy5sb2FkRnJvbUZpbGUoeyBmaWxlSW5mbzogY250LmZpbGUsIG5hemV2OiBcInh4eFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbC52eXNsZWRlayA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmFsZXJ0KFwiSW1wb3J0IGRhdCBieWwgw7pzcMSbxaFuxJsgcHJvdmVkZW4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3MuYWxlcnQoXCJQxZlpIGltcG9ydHUgZGF0IGRvxaFsbyBrIGNoeWLEmy5cIiArIFwiIC0gXCIgKyByZXRWYWwudnlzbGVkZWtfdHh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmlzbC5Ba2NlU2VydmlzLmxvYWRGcm9tRmlsZSh7IGZpbGVJbmZvOiBjbnQuZmlsZSwgbmF6ZXY6IFwieHh4XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLnZ5c2xlZGVrID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmFsZXJ0KFwiSW1wb3J0IGRhdCBieWwgw7pzcMSbxaFuxJsgcHJvdmVkZW4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3MuYWxlcnQoXCJQxZlpIGltcG9ydHUgZGF0IGRvxaFsbyBrIGNoeWLEmy5cIiArIFwiIC0gXCIgKyByZXRWYWwudnlzbGVkZWtfdHh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAga29udHJvbGEoKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY250LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIGtvbnRyb2xhIGRhdFwiKVxyXG5cclxuICAgICAgICAgICAgY250LmlzbC5Ba2NlU2VydmlzLmtvbnRyb2xhKClcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLnBvY2V0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3MuYWxlcnQoXCJWIGRhdGVjaCBuZWJ5bHkgbmFsZXplbnkgxb7DoWRuw6kgZHVwbGljaXR5IHMgZXhpc3R1asOtY8OtbWkgZGF0eSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgbmHEjXRlbsOtIGR1cGxpY2l0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC5pc2wuQWtjZVNlcnZpcy5rb250cm9sYV9WeXNsZWRlaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhXCIsIHJldFZhbClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFZ5c2xlZGVrRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiVnlzbGVkZWtGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0xLTEwLTFcIiB9KSAvLy5hZGRTZWN0aW9uKFwiU291aHJuIFZQXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImd0YWJsZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXRWYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLCBjYXB0aW9uOiBcIknEjFwiLCBkZXNjcmlwdGlvbjogXCJJxIxcIiwgYWxpZ246IFwibGVmdFwiLCB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0X2ljb1wiLCBjYXB0aW9uOiBcIk9yZ2FuaXphY2VcIiwgZGVzY3JpcHRpb246IFwiT3JnYW5pemFjZVwiLCBhbGlnbjogXCJsZWZ0XCIsIHdpZHRoOiAxNjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLCBjYXB0aW9uOiBcIlJva1wiLCBkZXNjcmlwdGlvbjogXCJSb2tcIiwgd2lkdGg6IDMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLCBjYXB0aW9uOiBcIk3Em3PDrWNcIiwgZGVzY3JpcHRpb246IFwiTcSbc8OtY1wiLCB3aWR0aDogMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRyZFwiLCBjYXB0aW9uOiBcIkRSRFwiLCBkZXNjcmlwdGlvbjogXCJEUkRcIiwgd2lkdGg6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWVhXCIsIGNhcHRpb246IFwiU1VcIiwgZGVzY3JpcHRpb246IFwiU1VcIiwgd2lkdGg6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIiwgY2FwdGlvbjogXCJQb8SNZXQgesOhcGlzxa9cIiwgZGVzY3JpcHRpb246IFwiUG/EjWV0IHrDoXBpc8WvXCIsIHdpZHRoOiAyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21fdnlzbGVkZWsgPSBjbnQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiVsO9c2xlZGVrXCIsIFZ5c2xlZGVrRm9ybSwgcmV0VmFsLCB7IHdpZHRoOiA5MDAsIGhlaWdodDogNjAwLCBjb21tYW5kQmFyOiBbXCJjYW5jZWwhXCJdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrX3BybyA9IHByb21fdnlzbGVkZWsuY3JlYXRlRGlhbG9nUHJvbWlzZSggLypcImNsb3NlXCIqLy8qXCJ5ZXNcIiovLypcIm9rXCIqLy8qLCB7IGR1dm9kOiBzdHJpbmcgfSovKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNudC5kaWFsb2dzLmFsZXJ0KFwiViBkYXRlY2ggYnlseSBuYWxlemVueSBkdXBsaWNpdHkgcyBleGlzdHVqw61jw61taSBkYXR5IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBwcmVzdW4oKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgcMWZZXN1biBkYXRcIilcclxuXHJcbiAgICAgICAgICAgIGNudC5pc2wuQWtjZVNlcnZpcy5wcmVzdW4oKVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwudnlzbGVkZWsgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5hbGVydChcIlbDvXNsZWRlayBwxZllc3VudSBkYXQgLSBPSyAtIGRhdGEgYnlsYSBuYcSNdGVuYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLmFsZXJ0KFwiVsO9c2xlZGVrIHDFmWVzdW51IGRhdCAtIENIWUJBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=