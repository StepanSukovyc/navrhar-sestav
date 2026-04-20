"use strict";
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
        var Globals;
        (function (Globals) {
            Globals.GInuGlobals = {
                Globalni_Parametry: {}
            };
        })(Globals = Inu.Globals || (Inu.Globals = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            function MainAppInu(content) {
                Gordic.Async.GTaskManager.on("change.InuStv", "Gordic.Inu.Server.GInuStavyAsync", function (o) {
                    console.log("GInuStavyAsync change", content.id, o.result);
                })
                    .on("init.InuStv", "Gordic.Inu.Server.GInuStavyAsync", function (o, result) {
                    var notifikace_Stv = new GObservableObject({ title: "Informace", icon: "fa-globe", content: this.customDto.o_hlaska + " - Zahájeno" });
                    content.notification("add", notifikace_Stv, true);
                    this.setNotification(notifikace_Stv);
                })
                    .on("done.InuStv", "Gordic.Inu.Server.GInuStavyAsync", function (o, result) {
                    console.log("GInuStavyAsync done  ", content.id, result);
                    //that.notification("add", { title: "OK", icon: "fa-globe", content: result.o_hlaska + " - Úspěšně provedeno!!!" }, true);
                    //debugger;
                    var notifikace_Stv = this.getNotification();
                    notifikace_Stv.update({ title: "OK", icon: "fa-globe", content: this.customDto.o_hlaska + " - Úspěšně provedeno!!!" });
                })
                    .on("fail.InuStv", "Gordic.Inu.Server.GInuStavyAsync", function (o, exc) {
                    console.log("GInuStavyAsync fail  ", content.id, exc);
                    //that.notification("add", { title: "Chyba", icon: "fa-globe", content: exc.o_hlaska + " - Neúspěšně provedeno!!!" }, true);
                    var notifikace_Stv = this.getNotification();
                    var akce = new GAction({
                        name: "ukazChybuAct",
                        caption: "Podrobnosti",
                        run: function (ev, ctx) {
                            GDlg.showException(exc.exception);
                        }
                    });
                    notifikace_Stv.update({
                        title: "Chyba", icon: "fa-globe", content: this.customDto.o_hlaska + " - Neprovedeno!!!",
                        defaultAction: akce, mode: "full",
                        commandBar: [{
                                action: akce
                            }]
                    });
                    o.handled = true;
                })
                    .on("always.InuStv", "Gordic.Inu.Server.GInuStavyAsync", function () {
                    console.log("GInuStavyAsync always", content.id);
                    this.clean();
                });
            }
            WebClient.MainAppInu = MainAppInu;
            let MainApp = class MainApp extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady(args) {
                    var that = this;
                    //#region Obsluha asynchronnich uloh
                    /*MainAppInu( that );*/
                    // registrace handleru pro archivace knih
                    this.ArchivaceKnihHandler();
                    // registrace handleru uzavreni obdobi
                    //this.UzavreniObdobiHandler();
                    // registrace handleru otevreni/uzavirani obdobi
                    // this.OtevreniUzavreniObdobiHandler();
                    this.actions.actUzaverkaMesicuUCT.enabled(true);
                    this.actions.actUzaverkaMesicuROZ.enabled(true);
                    //this.actions.actUzaverkaMesicuUCT!.enabled(this.globals.Globalni_Parametry.PovoleniUzavreniMesiceUCT!);
                    //this.actions.actUzaverkaMesicuROZ!.enabled(this.globals.Globalni_Parametry.PovoleniUzavreniMesiceROZ!);
                    this.actions.actAktualizaceStavuUCT.enabled(this.globals.Globalni_Parametry.PovoleniAktualizaceStavu);
                    this.actions.actAktualizaceStavuROZ.enabled(this.globals.Globalni_Parametry.PovoleniAktualizaceStavu);
                    this.actions.actPrepocetStavuUCT.enabled(this.globals.Globalni_Parametry.PovoleniPrepoctuStavu);
                    this.actions.actPrepocetStavuROZ.enabled(this.globals.Globalni_Parametry.PovoleniPrepoctuStavu);
                    this.actions.actKontrolaStavuUCT.enabled(this.globals.Globalni_Parametry.PovoleniKontrolyStavu);
                    this.actions.actKontrolaStavuROZ.enabled(this.globals.Globalni_Parametry.PovoleniKontrolyStavu);
                    this.actions.actKonfiguraceStavu.enabled(this.globals.Globalni_Parametry.PovoleniKonfiguraceAktualizaceStavu);
                    this.actions.actExportDatAll.enabled(this.globals.Globalni_Parametry.PovoleniExportDat);
                    this.actions.actExportDatSumarizace.enabled(this.globals.Globalni_Parametry.PovoleniExportDatSumarizace);
                    this.createUzivNastaveni();
                }
                /**
                 * Vytvoreni uzivaleskeho nastaveni
                 *
                 * */
                createUzivNastaveni() {
                    Gordic.WebApp.globalSettingForms.register([
                        this.ZpracovaniDPH()
                    ]);
                }
                /**
                 * Formular voleb
                 * @returns
                 */
                ZpracovaniDPH() {
                    let form = new Gordic.Forms
                        .Form({ name: "InuSettingsFormDPH", tabOptions: { title: "jres:30250462", opened: true } }) //RC 30250462 : Zpracování DPH
                        .addRow("").addField("gcheck", {
                        name: "BeforeRunCheck",
                        label: "jres:30250463", //RC 30250463 : Při spuštění úlohy Kontrolní hlášení DPH spustit kontrolu KH
                        model: "Global.Inu.AppSettings.InuSettingsFormDPH.BeforeRunCheck=value",
                        initialValue: true
                        //, defaultValue: 1
                        //, emptyValue: 1
                    });
                    return form;
                }
                /**
                 * registrace handleru pro archivace knih
                 *
                 * */
                ArchivaceKnihHandler() {
                    var that = this;
                    Gordic.Async.GTaskManager.on("change", "Gordic.Inu.Server.GInuArchivaceKnihAsync", function (o) {
                        console.log("GInuStavyAsync change", o);
                        if (o.progress)
                            this.getNotification().update({ progress: { current: o.progress.current, total: o.progress.total, text: o.progress.text } });
                    })
                        .on("init", "Gordic.Inu.Server.GInuArchivaceKnihAsync", function (o, result) {
                        var notifikace_Stv = new GObservableObject({ title: "Informace", icon: "fa-globe", content: "jres:30250335" }); //RC 30250335 : Archivace zahájena
                        that.notification("add", notifikace_Stv, true);
                        this.setNotification(notifikace_Stv);
                    })
                        .on("done", "Gordic.Inu.Server.GInuArchivaceKnihAsync", function (o, result) {
                        console.log("GInuArchivaceKnihAsync done  ", this.id, result);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Hotovo", icon: "fa-globe", content: "jres:30250336" }); //RC 30250336 : Archivace úspěšně dokončena
                    })
                        .on("fail", "Gordic.Inu.Server.GInuArchivaceKnihAsync", function (o, exc) {
                        console.log("GInuArchivaceKnihAsync fail  ", this.id, exc);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Chyba", icon: "fa-globe", content: "jres:30250337" }); //RC 30250337 : Archivace nedokončena
                        GDlg.showException(exc.exception);
                    })
                        .on("always", "Gordic.Inu.Server.GInuArchivaceKnihAsync", function () {
                        console.log("GInuArchivaceKnihAsync always", this.id);
                        this.clean();
                    });
                }
                ///**
                // * registrace handleru pro uzavreku obdobi
                // * 
                // * */
                //private UzavreniObdobiHandler() {
                //    var that = this;
                //    Gordic.Async.GTaskManager.on("change", "Gordic.Inu.Server.GInuUzavreniAsync", function (o) {  //Registrace + namespace
                //        console.log("GInuUzavreniAsync change", o);
                //        if (o.progress)
                //            this.getNotification().update({ progress: { current: o.progress.current, total: o.progress.total!, text: o.progress.text } });
                //    })
                //        .on("init", "Gordic.Inu.Server.GInuUzavreniAsync", function (o, result) {
                //            var notifikace_Stv = new GObservableObject({ title: "Informace", icon: "fa-globe", content: "Hromadná operace uzavření období  zahájena" /*"jres:30250335"*/ }); //RC 30250335 : Archivace zahájena
                //            that.notification("add", notifikace_Stv, true);
                //            this.setNotification(notifikace_Stv);
                //        })
                //        .on("done", "Gordic.Inu.Server.GInuUzavreniAsync", function (o, result) {
                //            console.log("GInuArchivaceKnihAsync done  ", this.id, result);
                //            var notifikace_Stv = this.getNotification()
                //            notifikace_Stv.update({ title: "Hotovo", icon: "fa-globe", content: "Operace dokončena" /*"jres:30250336" */ }); //RC 30250336 : Archivace úspěšně dokončena
                //        })
                //        .on("fail", "Gordic.Inu.Server.GInuUzavreniAsync", function (o, exc) {
                //            console.log("GInuArchivaceKnihAsync fail  ", this.id, exc);
                //            var notifikace_Stv = this.getNotification()
                //            notifikace_Stv.update({ title: "Chyba", icon: "fa-globe", content: "Operace nedokončena"/* "jres:30250337" */ }); //RC 30250337 : Archivace nedokončena
                //            GDlg.showException(exc.exception);
                //        })
                //        .on("always", "Gordic.Inu.Server.GInuUzavreniAsync", function () {
                //            console.log("GInuUzavreniAsync always", this.id);
                //            this.clean();
                //        });
                //}
                /**
                 * registrace handleru pro otevreni obdobi
                 *
                 * */
                OtevreniUzavreniObdobiHandler() {
                    var that = this;
                    Gordic.Async.GTaskManager.on("change", "Gordic.Inu.Server.GInuHromadneOperaceAsync", function (o) {
                        console.log("GInuOtevreniAsync change", o);
                        if (o.progress)
                            this.getNotification().update({ progress: { current: o.progress.current, total: o.progress.total, text: o.progress.text } });
                    })
                        .on("init", "Gordic.Inu.Server.GInuHromadneOperaceAsync", function (o, result) {
                        var notifikace_Stv = new GObservableObject({ title: "Informace", icon: "fa-globe", content: "jres:30250430" /*"jres:30250335"*/ }); //RC 30250430 : Hromadná s obdobím zahájena
                        that.notification("add", notifikace_Stv, true);
                        this.setNotification(notifikace_Stv);
                    })
                        .on("done", "Gordic.Inu.Server.GInuHromadneOperaceAsync", function (o, result) {
                        console.log("GInuArchivaceKnihAsync done  ", this.id, result);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Hotovo", icon: "fa-globe", content: "jres:30250431" /*"jres:30250336" */ }); //RC 30250431 : Operace dokončena
                    })
                        .on("fail", "Gordic.Inu.Server.GInuHromadneOperaceAsync", function (o, exc) {
                        console.log("GInuHromadneOperaceAsync fail  ", this.id, exc);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Chyba", icon: "fa-globe", content: "jres:30250432" /* "jres:30250337" */ }); //RC 30250432 : Operace nedokončena
                        GDlg.showException(exc.exception);
                    })
                        .on("always", "Gordic.Inu.Server.GInuHromadneOperaceAsync", function () {
                        console.log("GInuHromadneOperaceAsync always", this.id);
                        this.clean();
                    });
                }
            };
            MainApp = __decorate([
                gcontent
            ], MainApp);
            WebClient.MainApp = MainApp;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW5BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQUlmO0FBSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBSW5CO0lBSmdCLFdBQUEsR0FBRztRQUFDLElBQUEsT0FBTyxDQUkzQjtRQUpvQixXQUFBLE9BQU87WUFDWCxtQkFBVyxHQUFrQztnQkFDdEQsa0JBQWtCLEVBQUUsRUFBRTthQUN6QixDQUFDO1FBQ04sQ0FBQyxFQUpvQixPQUFPLEdBQVAsV0FBTyxLQUFQLFdBQU8sUUFJM0I7SUFBRCxDQUFDLEVBSmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQUluQjtBQUFELENBQUMsRUFKUyxNQUFNLEtBQU4sTUFBTSxRQUlmO0FBQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc09uQjtJQXRPZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc083QjtRQXRPb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsU0FBZ0IsVUFBVSxDQUFDLE9BQWlCO2dCQUV4QyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLGtDQUFrQyxFQUFFLFVBQVUsQ0FBQztvQkFDekYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDO3FCQUNHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0NBQWtDLEVBQUUsVUFBVSxDQUFDLEVBQUUsTUFBTTtvQkFFdEUsSUFBSSxjQUFjLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNB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IGV4cG9ydCBjb25zdCBHSW51R2xvYmFsczogR29yZGljLkludS5DbGllbnQuR0ludUdsb2JhbHMgPSB7XHJcbiAgICAgICAgR2xvYmFsbmlfUGFyYW1ldHJ5OiB7fVxyXG4gICAgfTtcclxufSBcclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBNYWluQXBwSW51KGNvbnRlbnQ6IEdDb250ZW50IClcclxuICAgIHtcclxuICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uKFwiY2hhbmdlLkludVN0dlwiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVTdGF2eUFzeW5jXCIsIGZ1bmN0aW9uIChvKSB7ICAvL1JlZ2lzdHJhY2UgKyBuYW1lc3BhY2VcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHSW51U3RhdnlBc3luYyBjaGFuZ2VcIiwgY29udGVudC5pZCwgby5yZXN1bHQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcImluaXQuSW51U3R2XCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludVN0YXZ5QXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IHRpdGxlOiBcIkluZm9ybWFjZVwiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IHRoaXMuY3VzdG9tRHRvLm9faGxhc2thICsgXCIgLSBaYWjDoWplbm9cIiB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIG5vdGlmaWthY2VfU3R2LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm90aWZpY2F0aW9uKG5vdGlmaWthY2VfU3R2KTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAub24oXCJkb25lLkludVN0dlwiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVTdGF2eUFzeW5jXCIsIGZ1bmN0aW9uIChvLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludVN0YXZ5QXN5bmMgZG9uZSAgXCIsIGNvbnRlbnQuaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHsgdGl0bGU6IFwiT0tcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiByZXN1bHQub19obGFza2EgKyBcIiAtIMOac3DEm8WhbsSbIHByb3ZlZGVubyEhIVwiIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfU3R2LnVwZGF0ZSh7IHRpdGxlOiBcIk9LXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogdGhpcy5jdXN0b21EdG8ub19obGFza2EgKyBcIiAtIMOac3DEm8WhbsSbIHByb3ZlZGVubyEhIVwiIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJmYWlsLkludVN0dlwiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVTdGF2eUFzeW5jXCIsIGZ1bmN0aW9uIChvLCBleGMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludVN0YXZ5QXN5bmMgZmFpbCAgXCIsIGNvbnRlbnQuaWQsIGV4Yyk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHsgdGl0bGU6IFwiQ2h5YmFcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiBleGMub19obGFza2EgKyBcIiAtIE5lw7pzcMSbxaFuxJsgcHJvdmVkZW5vISEhXCIgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFrY2UgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1a2F6Q2h5YnVBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvZHJvYm5vc3RpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHRGxnLnNob3dFeGNlcHRpb24oZXhjLmV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBub3RpZmlrYWNlX1N0di51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNoeWJhXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogdGhpcy5jdXN0b21EdG8ub19obGFza2EgKyBcIiAtIE5lcHJvdmVkZW5vISEhXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRlZmF1bHRBY3Rpb246IGFrY2UsIG1vZGU6IFwiZnVsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjb21tYW5kQmFyOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGFrY2VcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBvLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJhbHdheXMuSW51U3R2XCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludVN0YXZ5QXN5bmNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHSW51U3RhdnlBc3luYyBhbHdheXNcIiwgY29udGVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluQXBwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGU6IFwiR29yZGljLkludS5NYWluQXBwXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSggYXJncyApOnZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gT2JzbHVoYSBhc3luY2hyb25uaWNoIHVsb2hcclxuXHJcbiAgICAgICAgICAgIC8qTWFpbkFwcEludSggdGhhdCApOyovXHJcblxyXG4gICAgICAgICAgICAvLyByZWdpc3RyYWNlIGhhbmRsZXJ1IHBybyBhcmNoaXZhY2Uga25paFxyXG4gICAgICAgICAgICB0aGlzLkFyY2hpdmFjZUtuaWhIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdHJhY2UgaGFuZGxlcnUgdXphdnJlbmkgb2Jkb2JpXHJcbiAgICAgICAgICAgIC8vdGhpcy5VemF2cmVuaU9iZG9iaUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgLy8gcmVnaXN0cmFjZSBoYW5kbGVydSBvdGV2cmVuaS91emF2aXJhbmkgb2Jkb2JpXHJcbiAgICAgICAgICAgIC8vIHRoaXMuT3RldnJlbmlVemF2cmVuaU9iZG9iaUhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RVemF2ZXJrYU1lc2ljdVVDVCEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFV6YXZlcmthTWVzaWN1Uk9aIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RVemF2ZXJrYU1lc2ljdVVDVCEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pVXphdnJlbmlNZXNpY2VVQ1QhKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0VXphdmVya2FNZXNpY3VST1ohLmVuYWJsZWQodGhpcy5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaVV6YXZyZW5pTWVzaWNlUk9aISk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0QWt0dWFsaXphY2VTdGF2dVVDVCEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pQWt0dWFsaXphY2VTdGF2dSEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0QWt0dWFsaXphY2VTdGF2dVJPWiEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pQWt0dWFsaXphY2VTdGF2dSEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UHJlcG9jZXRTdGF2dVVDVCEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pUHJlcG9jdHVTdGF2dSEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UHJlcG9jZXRTdGF2dVJPWiEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pUHJlcG9jdHVTdGF2dSEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29udHJvbGFTdGF2dVVDVCEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pS29udHJvbHlTdGF2dSEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29udHJvbGFTdGF2dVJPWiEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pS29udHJvbHlTdGF2dSEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29uZmlndXJhY2VTdGF2dSEuZW5hYmxlZCh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pS29uZmlndXJhY2VBa3R1YWxpemFjZVN0YXZ1ISk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RXhwb3J0RGF0QWxsIS5lbmFibGVkKHRoaXMuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlFeHBvcnREYXQhKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEV4cG9ydERhdFN1bWFyaXphY2UhLmVuYWJsZWQodGhpcy5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaUV4cG9ydERhdFN1bWFyaXphY2UhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVXppdk5hc3RhdmVuaSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIHV6aXZhbGVza2VobyBuYXN0YXZlbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlVXppdk5hc3RhdmVuaSgpIHtcclxuICAgICAgICAgICAgR29yZGljLldlYkFwcC5nbG9iYWxTZXR0aW5nRm9ybXMucmVnaXN0ZXIoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5acHJhY292YW5pRFBIKClcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZvcm11bGFyIHZvbGViXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFpwcmFjb3ZhbmlEUEgoKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuXHJcbiAgICAgICAgICAgICAgICAuRm9ybSh7IG5hbWU6IFwiSW51U2V0dGluZ3NGb3JtRFBIXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwianJlczozMDI1MDQ2MlwiLCBvcGVuZWQ6IHRydWUgfSB9IGFzIGFueSkgLy9SQyAzMDI1MDQ2MiA6IFpwcmFjb3bDoW7DrSBEUEhcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQmVmb3JlUnVuQ2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMjUwNDYzXCIsIC8vUkMgMzAyNTA0NjMgOiBQxZlpIHNwdcWhdMSbbsOtIMO6bG9oeSBLb250cm9sbsOtIGhsw6HFoWVuw60gRFBIIHNwdXN0aXQga29udHJvbHUgS0hcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuSW51LkFwcFNldHRpbmdzLkludVNldHRpbmdzRm9ybURQSC5CZWZvcmVSdW5DaGVjaz12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpbml0aWFsVmFsdWU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLywgZGVmYXVsdFZhbHVlOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIGVtcHR5VmFsdWU6IDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiByZWdpc3RyYWNlIGhhbmRsZXJ1IHBybyBhcmNoaXZhY2Uga25paFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBBcmNoaXZhY2VLbmloSGFuZGxlcigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uKFwiY2hhbmdlXCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludUFyY2hpdmFjZUtuaWhBc3luY1wiLCBmdW5jdGlvbiAobykgeyAgLy9SZWdpc3RyYWNlICsgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdJbnVTdGF2eUFzeW5jIGNoYW5nZVwiLCBvKTtcclxuICAgICAgICAgICAgICAgIGlmIChvLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Tm90aWZpY2F0aW9uKCkudXBkYXRlKHsgcHJvZ3Jlc3M6IHsgY3VycmVudDogby5wcm9ncmVzcy5jdXJyZW50LCB0b3RhbDogby5wcm9ncmVzcy50b3RhbCEsIHRleHQ6IG8ucHJvZ3Jlc3MudGV4dCB9IH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJpbml0XCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludUFyY2hpdmFjZUtuaWhBc3luY1wiLCBmdW5jdGlvbiAobywgcmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWthY2VfU3R2ID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0KHsgdGl0bGU6IFwiSW5mb3JtYWNlXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogXCJqcmVzOjMwMjUwMzM1XCIgfSk7IC8vUkMgMzAyNTAzMzUgOiBBcmNoaXZhY2UgemFow6FqZW5hXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5vdGlmaWNhdGlvbihcImFkZFwiLCBub3RpZmlrYWNlX1N0diwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5vdGlmaWNhdGlvbihub3RpZmlrYWNlX1N0dik7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLm9uKFwiZG9uZVwiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVBcmNoaXZhY2VLbmloQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludUFyY2hpdmFjZUtuaWhBc3luYyBkb25lICBcIiwgdGhpcy5pZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfU3R2LnVwZGF0ZSh7IHRpdGxlOiBcIkhvdG92b1wiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IFwianJlczozMDI1MDMzNlwiIH0pOyAvL1JDIDMwMjUwMzM2IDogQXJjaGl2YWNlIMO6c3DEm8WhbsSbIGRva29uxI1lbmFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKFwiZmFpbFwiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVBcmNoaXZhY2VLbmloQXN5bmNcIiwgZnVuY3Rpb24gKG8sIGV4Yykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludUFyY2hpdmFjZUtuaWhBc3luYyBmYWlsICBcIiwgdGhpcy5pZCwgZXhjKTtcclxuICAgICAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfU3R2LnVwZGF0ZSh7IHRpdGxlOiBcIkNoeWJhXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogXCJqcmVzOjMwMjUwMzM3XCJ9KTsgLy9SQyAzMDI1MDMzNyA6IEFyY2hpdmFjZSBuZWRva29uxI1lbmFcclxuICAgICAgICAgICAgICAgIEdEbGcuc2hvd0V4Y2VwdGlvbihleGMuZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKFwiYWx3YXlzXCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludUFyY2hpdmFjZUtuaWhBc3luY1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHSW51QXJjaGl2YWNlS25paEFzeW5jIGFsd2F5c1wiLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiByZWdpc3RyYWNlIGhhbmRsZXJ1IHBybyB1emF2cmVrdSBvYmRvYmlcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogKi9cclxuICAgICAgICAvL3ByaXZhdGUgVXphdnJlbmlPYmRvYmlIYW5kbGVyKCkge1xyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uKFwiY2hhbmdlXCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludVV6YXZyZW5pQXN5bmNcIiwgZnVuY3Rpb24gKG8pIHsgIC8vUmVnaXN0cmFjZSArIG5hbWVzcGFjZVxyXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcIkdJbnVVemF2cmVuaUFzeW5jIGNoYW5nZVwiLCBvKTtcclxuICAgICAgICAvLyAgICAgICAgaWYgKG8ucHJvZ3Jlc3MpXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmdldE5vdGlmaWNhdGlvbigpLnVwZGF0ZSh7IHByb2dyZXNzOiB7IGN1cnJlbnQ6IG8ucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IG8ucHJvZ3Jlc3MudG90YWwhLCB0ZXh0OiBvLnByb2dyZXNzLnRleHQgfSB9KTtcclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAub24oXCJpbml0XCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludVV6YXZyZW5pQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IHRpdGxlOiBcIkluZm9ybWFjZVwiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IFwiSHJvbWFkbsOhIG9wZXJhY2UgdXphdsWZZW7DrSBvYmRvYsOtICB6YWjDoWplbmFcIiAvKlwianJlczozMDI1MDMzNVwiKi8gfSk7IC8vUkMgMzAyNTAzMzUgOiBBcmNoaXZhY2UgemFow6FqZW5hXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm5vdGlmaWNhdGlvbihcImFkZFwiLCBub3RpZmlrYWNlX1N0diwgdHJ1ZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnNldE5vdGlmaWNhdGlvbihub3RpZmlrYWNlX1N0dik7XHJcblxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgLm9uKFwiZG9uZVwiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVVemF2cmVuaUFzeW5jXCIsIGZ1bmN0aW9uIChvLCByZXN1bHQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludUFyY2hpdmFjZUtuaWhBc3luYyBkb25lICBcIiwgdGhpcy5pZCwgcmVzdWx0KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAvLyAgICAgICAgICAgIG5vdGlmaWthY2VfU3R2LnVwZGF0ZSh7IHRpdGxlOiBcIkhvdG92b1wiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IFwiT3BlcmFjZSBkb2tvbsSNZW5hXCIgLypcImpyZXM6MzAyNTAzMzZcIiAqLyB9KTsgLy9SQyAzMDI1MDMzNiA6IEFyY2hpdmFjZSDDunNwxJvFoW7EmyBkb2tvbsSNZW5hXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5vbihcImZhaWxcIiwgXCJHb3JkaWMuSW51LlNlcnZlci5HSW51VXphdnJlbmlBc3luY1wiLCBmdW5jdGlvbiAobywgZXhjKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdJbnVBcmNoaXZhY2VLbmloQXN5bmMgZmFpbCAgXCIsIHRoaXMuaWQsIGV4Yyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpXHJcbiAgICAgICAgLy8gICAgICAgICAgICBub3RpZmlrYWNlX1N0di51cGRhdGUoeyB0aXRsZTogXCJDaHliYVwiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IFwiT3BlcmFjZSBuZWRva29uxI1lbmFcIi8qIFwianJlczozMDI1MDMzN1wiICovIH0pOyAvL1JDIDMwMjUwMzM3IDogQXJjaGl2YWNlIG5lZG9rb27EjWVuYVxyXG4gICAgICAgIC8vICAgICAgICAgICAgR0RsZy5zaG93RXhjZXB0aW9uKGV4Yy5leGNlcHRpb24pO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAub24oXCJhbHdheXNcIiwgXCJHb3JkaWMuSW51LlNlcnZlci5HSW51VXphdnJlbmlBc3luY1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdJbnVVemF2cmVuaUFzeW5jIGFsd2F5c1wiLCB0aGlzLmlkKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuY2xlYW4oKTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcmVnaXN0cmFjZSBoYW5kbGVydSBwcm8gb3RldnJlbmkgb2Jkb2JpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE90ZXZyZW5pVXphdnJlbmlPYmRvYmlIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIub24oXCJjaGFuZ2VcIiwgXCJHb3JkaWMuSW51LlNlcnZlci5HSW51SHJvbWFkbmVPcGVyYWNlQXN5bmNcIiwgZnVuY3Rpb24gKG8pIHsgIC8vUmVnaXN0cmFjZSArIG5hbWVzcGFjZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHSW51T3RldnJlbmlBc3luYyBjaGFuZ2VcIiwgbyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoby5wcm9ncmVzcylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE5vdGlmaWNhdGlvbigpLnVwZGF0ZSh7IHByb2dyZXNzOiB7IGN1cnJlbnQ6IG8ucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IG8ucHJvZ3Jlc3MudG90YWwhLCB0ZXh0OiBvLnByb2dyZXNzLnRleHQgfSB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImluaXRcIiwgXCJHb3JkaWMuSW51LlNlcnZlci5HSW51SHJvbWFkbmVPcGVyYWNlQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSBuZXcgR09ic2VydmFibGVPYmplY3QoeyB0aXRsZTogXCJJbmZvcm1hY2VcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiBcImpyZXM6MzAyNTA0MzBcIiAvKlwianJlczozMDI1MDMzNVwiKi8gfSk7ICAvL1JDIDMwMjUwNDMwIDogSHJvbWFkbsOhIHMgb2Jkb2LDrW0gemFow6FqZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJhZGRcIiwgbm90aWZpa2FjZV9TdHYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm90aWZpY2F0aW9uKG5vdGlmaWthY2VfU3R2KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcImRvbmVcIiwgXCJHb3JkaWMuSW51LlNlcnZlci5HSW51SHJvbWFkbmVPcGVyYWNlQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludUFyY2hpdmFjZUtuaWhBc3luYyBkb25lICBcIiwgdGhpcy5pZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpa2FjZV9TdHYudXBkYXRlKHsgdGl0bGU6IFwiSG90b3ZvXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogXCJqcmVzOjMwMjUwNDMxXCIgLypcImpyZXM6MzAyNTAzMzZcIiAqLyB9KTsgIC8vUkMgMzAyNTA0MzEgOiBPcGVyYWNlIGRva29uxI1lbmFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJmYWlsXCIsIFwiR29yZGljLkludS5TZXJ2ZXIuR0ludUhyb21hZG5lT3BlcmFjZUFzeW5jXCIsIGZ1bmN0aW9uIChvLCBleGMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdJbnVIcm9tYWRuZU9wZXJhY2VBc3luYyBmYWlsICBcIiwgdGhpcy5pZCwgZXhjKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpa2FjZV9TdHYudXBkYXRlKHsgdGl0bGU6IFwiQ2h5YmFcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiBcImpyZXM6MzAyNTA0MzJcIi8qIFwianJlczozMDI1MDMzN1wiICovIH0pOyAgLy9SQyAzMDI1MDQzMiA6IE9wZXJhY2UgbmVkb2tvbsSNZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgR0RsZy5zaG93RXhjZXB0aW9uKGV4Yy5leGNlcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImFsd2F5c1wiLCBcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVIcm9tYWRuZU9wZXJhY2VBc3luY1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHSW51SHJvbWFkbmVPcGVyYWNlQXN5bmMgYWx3YXlzXCIsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG4iXX0=