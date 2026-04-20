"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSestavyAda.js                                                        </Name>
//    <Description> GSestavyAda                                                                                  </Description>
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
            let GSestavyAda = class GSestavyAda extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Sestavy";
                    this.taskId = "actSestavyAda"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    //nastavení akcí
                    cnt.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        },
                        actTisk: {
                            caption: "Generovat",
                            run: function () {
                                if (cnt.sestava) {
                                    that.generovat();
                                }
                            }
                        }
                        //var actEdit = new GAction({
                        //    name: "dblclick",
                        //    run: function (ev, ctx) {
                        //        GDlg.alert("Dvojklik");
                        //        // ctx.cellInfo.data
                        //    }
                        //});
                    });
                    cnt.menuBar(this.actions.createBar(["actTisk*"]));
                    cnt.commandBar(this.actions.createBar(["actClose"]));
                    mainForm
                        .appendTo(this.element)
                        .gcontent(Gordic.Report.WebClient.GReportTreeControlTS, { controlParams: this.sesTreeParams.ControlParams });
                    mainForm.on({
                        "reportselected.greports": function (event, output) {
                            if (!output || !output.reportId)
                                return;
                            console.log("GOdtPozadavekControl on reportselected.greports", event, output);
                            that.beginOperation();
                            that.wrid = output.reportId;
                            Gordic.Report.WebClient.GReportTreeControlTS.getReportInfo(output.reportId, that.sesTreeParams.ControlParams.Platnost)
                                .then(function (ri) {
                                if (ri && ri.alv)
                                    cnt.sestava = ri;
                                console.log("ri", ri.alv.TYP_ALG);
                            })
                                .always(function () { that.endOperation(); });
                        }
                    });
                    mainForm.gtab({
                        title: "Výběr sestavy",
                        opened: true,
                        //                menuBar: $.content(mainForm).getMenuDef()
                    });
                    //var actEdit = new GAction({
                    //    name: "dblclick",
                    //    run: function (ev, ctx) {
                    //        GDlg.alert("Dvojklik");
                    //        // ctx.cellInfo.data
                    //    }
                    //});
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm);
                }
                generovat() {
                    var that = this;
                    var cnt = this;
                    var Form_Maska;
                    Form_Maska = new Gordic.Forms.Form({
                        name: "maskaFormular",
                        layoutDescriptor: "L1M1S1 M-3-9-0 L-3-9-0 breaks-400-500",
                        dialogOptions: {
                            id: "MaskaFormular#"
                        },
                        complete: function (a) {
                            //debugger;
                            console.log("xxx");
                        }
                    });
                    Form_Maska
                        //.addField("gdummyfield", "w-h", {
                        //    model: "maska",
                        //    name: "maska"
                        //})
                        .addField("gstringbox", "w-h", {
                        model: "maska",
                        name: "maska",
                        change(ev, selected) {
                            if ((selected) && (selected.value)) {
                                var form = $(this).closest(".gform");
                                var in_maska = selected.value;
                                if (in_maska.charAt(0) !== "1") {
                                    form.findFields("stavbaStart").gfield("disable");
                                    form.findFields("stavbaEnd").gfield("disable");
                                }
                                if (in_maska.charAt(1) !== "1") {
                                    form.findFields("objektStart").gfield("disable");
                                    form.findFields("objektEnd").gfield("disable");
                                }
                                if (in_maska.charAt(2) !== "1") {
                                    form.findFields("mandatarStart").gfield("disable");
                                    form.findFields("mandatarEnd").gfield("disable");
                                }
                                if (in_maska.charAt(3) !== "1") {
                                    form.findFields("ueaStart").gfield("disable");
                                    form.findFields("ueaEnd").gfield("disable");
                                }
                                if (in_maska.charAt(4) !== "1") {
                                    form.findFields("uebStart").gfield("disable");
                                    form.findFields("uebEnd").gfield("disable");
                                }
                                if (in_maska.charAt(5) !== "1") {
                                    form.findFields("inv_cisStart").gfield("disable");
                                    form.findFields("inv_cisEnd").gfield("disable");
                                }
                                if (in_maska.charAt(6) !== "1") {
                                    form.findFields("priz_nulove").gfield("disable");
                                }
                            }
                        }
                    });
                    Form_Maska
                        .addRow("Organizace").addField("gselectbox", Gordic.Prefabs.Select.ekosrar(), {
                        name: "nks",
                        model: "model.ixs_rar=value.ixs_rar;model.nks=value.ico;model.nks_txt=value.nazev",
                    });
                    Form_Maska
                        .addRow("Rok/Měsíc")
                        .addField("gnumberbox", "w-4", { name: "rok", disabled: true })
                        .addField("gnumberbox", "w-4", { name: "mesic", validators: [new Gordic.Validators.Required(), new Gordic.Validators.Range({ min: 1, max: 12, message: "Chybně zadaná hodnota" })] });
                    Form_Maska
                        .addSection("")
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "Stavba", name: "stavba", pathInModel: "stavba",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_Akce, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_Akce, true, true),
                        customOptAll: {
                            change: function (ev, changeObj) {
                                if (changeObj.flags.noChange) {
                                    return;
                                }
                                var hodnota;
                                hodnota = changeObj.value;
                                if ((hodnota) && (hodnota.length < that.globals.Delka_Akce)) {
                                    $(this).gfield("setValue", Gordic.Utils.zeropad(hodnota, that.globals.Delka_Akce));
                                }
                            }
                        }
                    }));
                    Form_Maska
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "Objekt", name: "objekt", pathInModel: "objekt",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(4, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(4, true, true),
                    }));
                    Form_Maska
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "Mandatář", name: "mandatar", pathInModel: "mandatar",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(3, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(3, true, true),
                    }));
                    Form_Maska
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "SU", name: "uea", pathInModel: "uea",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(3, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(3, true, true),
                    }));
                    Form_Maska
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "AU", name: "ueb", pathInModel: "ueb",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(4, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(4, true, true),
                    }));
                    Form_Maska
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "Inventární číslo", name: "inv_cis", pathInModel: "inv_cis",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(4, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(4, true, true),
                    }));
                    Form_Maska
                        .addRow("Nezobrazit nulové stavby").addField("gcheck", "w-12", {
                        disabled: false, name: "priz_nulove", modelValueTransform: {
                            apply: (v) => {
                                return v == 1;
                            },
                            collect: (v) => {
                                return (v ? 1 : 0);
                            }
                        }
                    });
                    var radekMaska = {
                        maska: "",
                        nks: "",
                        rok: 0,
                        mesic: 0,
                        priz_nulove: 0,
                        stavba: { start: "", end: "" },
                        objekt: { start: "", end: "" },
                        mandatar: { start: "", end: "" },
                        uea: { start: "", end: "" },
                        ueb: { start: "", end: "" },
                        inv_cis: { start: "", end: "" }
                    };
                    radekMaska.maska = cnt.sestava.alv.TYP_ALG;
                    radekMaska.rok = cnt.rok_akt;
                    radekMaska.mesic = cnt.mesic_akt;
                    let prom_vysledek = cnt.dialogs.simpleForm("Maska pro generování sestavy", Form_Maska, radekMaska, { width: 700, height: 500 });
                    let prom_vysledek_pro = prom_vysledek.createDialogPromise( /*"close"*/ /*"yes"*/ /*"ok"*/ /*, { duvod: string }*/)
                        .then(function (data) {
                        if (data) {
                            radekMaska = data;
                            if (radekMaska.maska.charAt(0) !== "1") {
                                //    radekMaska.stavba.start = "";
                                //    radekMaska.stavba.end = "";
                            }
                            else {
                                radekMaska.stavba.start = radekMaska.stavba.start ? Gordic.Utils.zeropad(radekMaska.stavba.start, that.globals.Delka_Akce) : Gordic.Utils.zeropad("0", that.globals.Delka_Akce);
                                radekMaska.stavba.end = radekMaska.stavba.end ? Gordic.Utils.zeropad(radekMaska.stavba.end, that.globals.Delka_Akce) : Gordic.Utils.zeropad("0", that.globals.Delka_Akce).replace(/0/g, "9");
                            }
                            if (radekMaska.maska.charAt(1) !== "1") {
                                //    radekMaska.objekt.start = "";
                                //    radekMaska.objekt.end = "";
                            }
                            else {
                                radekMaska.objekt.start = radekMaska.objekt.start ? Gordic.Utils.zeropad(radekMaska.objekt.start, 4) : Gordic.Utils.zeropad("0", 4);
                                radekMaska.objekt.end = radekMaska.objekt.end ? Gordic.Utils.zeropad(radekMaska.objekt.end, 4) : Gordic.Utils.zeropad("0", 4).replace(/0/g, "9");
                            }
                            if (radekMaska.maska.charAt(2) !== "1") {
                                //    radekMaska.mandatar.start = "";
                                //    radekMaska.mandatar.end = "";
                            }
                            else {
                                radekMaska.mandatar.start = radekMaska.mandatar.start ? Gordic.Utils.zeropad(radekMaska.mandatar.start, 3) : Gordic.Utils.zeropad("0", 3);
                                radekMaska.mandatar.end = radekMaska.mandatar.end ? Gordic.Utils.zeropad(radekMaska.mandatar.end, 3) : Gordic.Utils.zeropad("0", 3).replace(/0/g, "9");
                            }
                            if (radekMaska.maska.charAt(3) !== "1") {
                                //    radekMaska.uea.start = "";
                                //    radekMaska.uea.end = "";
                            }
                            else {
                                radekMaska.uea.start = radekMaska.uea.start ? Gordic.Utils.zeropad(radekMaska.uea.start, 3) : Gordic.Utils.zeropad("0", 3);
                                radekMaska.uea.end = radekMaska.uea.end ? Gordic.Utils.zeropad(radekMaska.uea.end, 3) : Gordic.Utils.zeropad("0", 3).replace(/0/g, "9");
                            }
                            if (radekMaska.maska.charAt(4) !== "1") {
                                //    radekMaska.ueb.start = "";
                                //    radekMaska.ueb.end = "";
                            }
                            else {
                                radekMaska.ueb.start = radekMaska.ueb.start ? Gordic.Utils.zeropad(radekMaska.ueb.start, 4) : Gordic.Utils.zeropad("0", 4);
                                radekMaska.ueb.end = radekMaska.ueb.end ? Gordic.Utils.zeropad(radekMaska.ueb.end, 4) : Gordic.Utils.zeropad("0", 4).replace(/0/g, "9");
                            }
                            if (radekMaska.maska.charAt(5) !== "1") {
                                //    radekMaska.inv_cis.start = "";
                                //    radekMaska.inv_cis.end = "";
                            }
                            else {
                                radekMaska.inv_cis.start = radekMaska.inv_cis.start ? Gordic.Utils.zeropad(radekMaska.inv_cis.start, 10) : Gordic.Utils.zeropad("0", 10);
                                radekMaska.inv_cis.end = radekMaska.inv_cis.end ? Gordic.Utils.zeropad(radekMaska.inv_cis.end, 10) : Gordic.Utils.zeropad("0", 10).replace(/0/g, "9");
                                ;
                            }
                            console.log("radekMaska", radekMaska);
                            var cancellationToken = {
                                cancel: false
                            };
                            let _currGeneratingDef = $.Deferred();
                            var generator;
                            generator = new Gordic.Report.WebClient.GReportGenerator({
                                // reportGeneratorType: "Gordic.Odt.WebClient.GOdtPozadavekGenerator",
                                waitToAsync: 1
                            });
                            Gordic.Report.WebClient.GReportGenerator.progressBegin(that, new GAction({
                                name: "repGenCancelAct",
                                caption: "Storno",
                                run: function () {
                                    cancellationToken.cancel = true;
                                    this.update({
                                        caption: "Stornuji",
                                        enabled: false
                                    });
                                }
                            }));
                            var platnost = that.sesTreeParams.ControlParams.Platnost;
                            generator.generate({
                                reportId: that.wrid,
                                outputStyle: that.sestava.alv.OutputStyle,
                                platnost: platnost,
                                customDto: radekMaska,
                                serverParameterMethod: "Gordic.Ada.WebClient.GSestavyAda:ConvertReportParams",
                                //                generatorParams: null,
                                props: {
                                    Platnost: platnost,
                                }
                            }, null, cancellationToken)
                                .progress(function (progress) {
                                Gordic.Report.WebClient.GReportGenerator.progressUpdate(that, progress);
                            })
                                .then(function (res) {
                                var document = new Gordic.Report.WebClient.GReportDocument(that);
                                return document.downloadDocument(Gordic.Report.WebClient.GReportTreeControlTS.getDownloaderParams(res));
                                //NOTE: Dela problem na IE - activeX ho lokalne vytvori pod jinym nazvem nez je pozadovany
                                //document.downloadDocument(Gordic.Report.WebClient.GReportTreeControlTS.getDownloadOnlyParams(res.id)); 
                            })
                                .fail(function (state) {
                                if (state && state.id) {
                                    var document = new Gordic.Report.WebClient.GReportDocument(that);
                                    document.downloadDocument({
                                        DownloaderType: "Gordic.Report.WebClient.Reporter.SinglePage.Common.GReportDownloader",
                                        AutoDownload: true,
                                        CustomData: { "id": state.id }
                                    });
                                }
                                else if (state && $.isPlainObject(state) && state.state === -2) { //-2 = generovani zruseno uzivatelem
                                    that.showFlash({
                                        label: "Generování sestavy bylo zrušeno uživatelem",
                                        customClass: "g-state-warning"
                                    });
                                }
                            })
                                .always(function () {
                                that.endOperation();
                                _currGeneratingDef.resolve();
                            });
                        }
                    });
                }
            };
            GSestavyAda = __decorate([
                gcontent
            ], GSestavyAda);
            WebClient.GSestavyAda = GSestavyAda;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlc3RhdnlBZGEuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR1Nlc3RhdnlBZGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0EyWmY7QUEzWkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMlpuQjtJQTNaZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMlo3QjtRQTNab0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFBN0M7O29CQVdJLFVBQUssR0FBRyxTQUFTLENBQUM7b0JBQ2xCLFdBQU0sR0FBRyxlQUFlLENBQUMsQ0FBQywrQkFBK0I7Z0JBMFk3RCxDQUFDO2dCQXhZRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFFZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFbEksZ0JBQWdCO29CQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDakIsUUFBUSxFQUFFOzRCQUNOLE9BQU8sRUFBRSxRQUFROzRCQUNqQixHQUFHLEVBQUU7Z0NBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixD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LE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQ0FDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNyRCxDQUFDO2dDQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQ0FDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNoRCxDQUFDO2dDQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQ0FDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNoRCxDQUFDO2dDQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQ0FDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNwRCxDQUFDO2dDQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQ0FDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFh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LEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztxQkFDdkUsQ0FBQyxDQUFDLENBQUM7b0JBRVIsVUFBVTt5QkFDTCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVTt3QkFDNUUsbUJBQW1CLEVBQUUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzt3QkFDdEUsaUJBQWlCLEVBQUUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztxQkFDdkUsQ0FBQyxDQUFDLENBQUM7b0JBRVIsVUFBVTt5QkFDTCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSzt3QkFDNUQsbUJBQW1CLEVBQUUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzt3QkFDdEUsaUJBQWlCLEVBQUUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztxQkFDdkUsQ0FBQyxDQUFDLENBQUM7b0JBRVIsVUFBVTt5QkFDTCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSzt3QkFDNUQsbUJBQW1CLEVBQUUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzt3QkFDdEUsaUJBQWlCLEVBQUUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztxQkFDdkUsQ0FBQyxDQUFDLENBQUM7b0JBRVIsVUFBVTt5QkFDTCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO3dCQUNsRixtQkFBbUIsRUFBRSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO3dCQUN0RSxpQkFBaUIsRUFBRSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO3FCQUN2RSxDQUFDLENBQUMsQ0FBQztvQkFFUixVQUFVO3lCQUNMLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFO3dCQUMzRCxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUU7NEJBQ3ZELEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dDQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbEIsQ0FBQzs0QkFDRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQ0FDWCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFHUCxJQUFJLFVBQVUsR0FZVjt3QkFDQSxLQUFLLEVBQUUsRUFBRTt3QkFDVCxHQUFHLEVBQUUsRUFBRTt3QkFDUCxHQUFHLEVBQUUsQ0FBQzt3QkFDTixLQUFLLEVBQUUsQ0FBQzt3QkFDUixXQUFXLEVBQUUsQ0FBQzt3QkFDZCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7d0JBQzlCLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTt3QkFDOUIsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO3dCQUNoQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7d0JBQzNCLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTt3QkFDM0IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO3FCQUNsQyxDQUFDO29CQUVGLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFJLENBQUMsT0FBTyxDQUFDO29CQUM1QyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFFakMsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ2pJLElBQUksaUJBQWlCLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixFQUFFLFdBQVcsQ0FBQSxTQUFTLENBQUEsUUFBUSxDQUFBLHVCQUF1QixDQUFDO3lCQUMxRyxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUNoQixJQUFJLElBQUksRUFBRSxDQUFDOzRCQUNQLFVBQVUsR0FBRyxJQUFJLENBQUM7NEJBQ2xCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0NBQ3pDLG1DQUFtQztnQ0FDbkMsaUNBQWlDOzRCQUNqQyxDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVyxDQUFDLENBQUM7Z0NBQ3BLLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ3JMLENBQUM7NEJBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQ0FDekMsbUNBQW1DO2dDQUNuQyxpQ0FBaUM7NEJBQ2pDLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUN0SCxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ3ZJLENBQUM7NEJBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQ0FDekMscUNBQXFDO2dDQUNyQyxtQ0FBbUM7NEJBQ25DLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUM1SCxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzdJLENBQUM7NEJBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQ0FDekMsZ0NBQWdDO2dDQUNoQyw4QkFBOEI7NEJBQzlCLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUM3RyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzlILENBQUM7NEJBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQ0FDekMsZ0NBQWdDO2dDQUNoQyw4QkFBOEI7NEJBQzlCLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUM3RyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzlILENBQUM7NEJBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQ0FDekMsb0NBQW9DO2dDQUNwQyxrQ0FBa0M7NEJBQ2xDLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dDQUMzSCxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQUEsQ0FBQzs0QkFDN0ksQ0FBQzs0QkFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQzs0QkFDdEMsSUFBSSxpQkFBaUIsR0FBRztnQ0FDcEIsTUFBTSxFQUFFLEtBQUs7NkJBQ2hCLENBQUM7NEJBQ0YsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBRXRDLElBQUksU0FBNEMsQ0FBQzs0QkFFakQsU0FBUyxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO2dDQUM5QyxzRUFBc0U7Z0NBQ3RFLFdBQVcsRUFBRSxDQUFDOzZCQUNqQixDQUFDLENBQUM7NEJBRUgsT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FDM0MsSUFBSSxFQUNKLElBQUksT0FBTyxDQUFDO2dDQUNSLElBQUksRUFBRSxpQkFBaUI7Z0NBQ3ZCLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixHQUFHLEVBQUU7b0NBQ0QsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3Q0FDUixPQUFPLEVBQUUsVUFBVTt3Q0FDbkIsT0FBTyxFQUFFLEtBQUs7cUNBQ2pCLENBQUMsQ0FBQztnQ0FDUCxDQUFDOzZCQUNKLENBQUMsQ0FBQyxDQUFDOzRCQUVSLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzs0QkFFekQsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQ0FDZixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0NBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUksQ0FBQyxXQUFXO2dDQUMxQyxRQUFRLEVBQUUsUUFBUTtnQ0FDbEIsU0FBUyxFQUFFLFVBQVU7Z0NBQ3JCLHFCQUFxQixFQUFFLHNEQUFzRDtnQ0FDN0Usd0NBQXdDO2dDQUN4QyxLQUFLLEVBQUU7b0NBQ0gsUUFBUSxFQUFFLFFBQVE7aUNBQ3JCOzZCQUNKLEVBQ0csSUFBSSxFQUNKLGlCQUFpQixDQUFDO2lDQUNqQixRQUFRLENBQUMsVUFBVSxRQUFRO2dDQUN4QixPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDckUsQ0FBQyxDQUFDO2lDQUNELElBQUksQ0FBQyxVQUFVLEdBQUc7Z0NBQ2YsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUMxRCxPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUV4RywwRkFBMEY7Z0NBQzFGLHlHQUF5Rzs0QkFDN0csQ0FBQyxDQUFDO2lDQUNELElBQUksQ0FBQyxVQUFVLEtBQUs7Z0NBQ2pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQ0FDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUMxRCxRQUFRLENBQUMsZ0JBQWdCLENBQUM7d0NBQ3RCLGNBQWMsRUFBRSxzRUFBc0U7d0NBQ3RGLFlBQVksRUFBRSxJQUFJO3dDQUNsQixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtxQ0FDakMsQ0FBQyxDQUFDO2dDQUNQLENBQUM7cUNBQ0ksSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxvQ0FBb0M7b0NBQ2xHLElBQUksQ0FBQyxTQUFTLENBQUM7d0NBQ1gsS0FBSyxFQUFFLDRDQUE0Qzt3Q0FDbkQsV0FBVyxFQUFFLGlCQUFpQjtxQ0FDakMsQ0FBQyxDQUFDO2dDQUNQLENBQUM7NEJBQ0wsQ0FBQyxDQUFDO2lDQUNELE1BQU0sQ0FBQztnQ0FDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0NBQ3BCLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNqQyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO29CQUNELENBQUMsQ0FDSixDQUFDO2dCQUNWLENBQUM7YUFDSixDQUFBO1lBdFpZLFdBQVc7Z0JBRHZCLFFBQVE7ZUFDSSxXQUFXLENBc1p2QjtZQXRaWSxxQkFBVyxjQXNadkIsQ0FBQTtRQUNMLENBQUMsRUEzWm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJaN0I7SUFBRCxDQUFDLEVBM1pnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyWm5CO0FBQUQsQ0FBQyxFQTNaUyxNQUFNLEtBQU4sTUFBTSxRQTJaZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HU2VzdGF2eUFkYS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdTZXN0YXZ5QWRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2VzdGF2eUFkYSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2VzVHJlZVBhcmFtcztcclxuICAgICAgICBwcml2YXRlIHNlc3RhdmE6IFJlcG9ydC5JbnRlcmZhY2UuR1JlcG9ydEluZm9EdG87XHJcbiAgICAgICAgcHJpdmF0ZSB3cmlkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcm9rX2FrdDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbWVzaWNfYWt0OiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiU2VzdGF2eVwiO1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2VzdGF2eUFkYVwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgY250LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJHZW5lcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudC5zZXN0YXZhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdlbmVyb3ZhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250Lm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RUaXNrKlwiXSkpO1xyXG4gICAgICAgICAgICBjbnQuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlXCJdKSk7XHJcblxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nY29udGVudChHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUywgeyBjb250cm9sUGFyYW1zOiB0aGlzLnNlc1RyZWVQYXJhbXMuQ29udHJvbFBhcmFtcyB9KTtcclxuXHJcbiAgICAgICAgICAgIG1haW5Gb3JtLm9uKHtcclxuICAgICAgICAgICAgICAgIFwicmVwb3J0c2VsZWN0ZWQuZ3JlcG9ydHNcIjogZnVuY3Rpb24gKGV2ZW50LCBvdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW91dHB1dCB8fCAhb3V0cHV0LnJlcG9ydElkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR09kdFBvemFkYXZla0NvbnRyb2wgb24gcmVwb3J0c2VsZWN0ZWQuZ3JlcG9ydHNcIiwgZXZlbnQsIG91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQud3JpZCA9IG91dHB1dC5yZXBvcnRJZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0UmVwb3J0SW5mbyhvdXRwdXQucmVwb3J0SWQsIHRoYXQuc2VzVHJlZVBhcmFtcy5Db250cm9sUGFyYW1zLlBsYXRub3N0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyaSAmJiByaS5hbHYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LnNlc3RhdmEgPSByaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJpXCIsIHJpLmFsdiEuVFlQX0FMRyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbWFpbkZvcm0uZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71ixJtyIHNlc3RhdnlcIixcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgICAgbWVudUJhcjogJC5jb250ZW50KG1haW5Gb3JtKS5nZXRNZW51RGVmKClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuLy8gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZW5lcm92YXQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgRm9ybV9NYXNrYTogR29yZGljLkZvcm1zLkZvcm07XHJcblxyXG4gICAgICAgICAgICBGb3JtX01hc2thID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWFza2FGb3JtdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIE0tMy05LTAgTC0zLTktMCBicmVha3MtNDAwLTUwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWFza2FGb3JtdWxhciNcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInh4eFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEZvcm1fTWFza2FcclxuICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIm1hc2thXCIsXHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwibWFza2FcIlxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibWFza2FcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibWFza2FcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZShldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdGVkKSAmJiAoc2VsZWN0ZWQudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5fbWFza2EgPSBzZWxlY3RlZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluX21hc2thLmNoYXJBdCgwKSAhPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZiYVN0YXJ0XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2YmFFbmRcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5fbWFza2EuY2hhckF0KDEpICE9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwib2JqZWt0U3RhcnRcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIm9iamVrdEVuZFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbl9tYXNrYS5jaGFyQXQoMikgIT09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJtYW5kYXRhclN0YXJ0XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJtYW5kYXRhckVuZFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbl9tYXNrYS5jaGFyQXQoMykgIT09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ1ZWFTdGFydFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwidWVhRW5kXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluX21hc2thLmNoYXJBdCg0KSAhPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInVlYlN0YXJ0XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ1ZWJFbmRcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5fbWFza2EuY2hhckF0KDUpICE9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaW52X2Npc1N0YXJ0XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpbnZfY2lzRW5kXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluX21hc2thLmNoYXJBdCg2KSAhPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInByaXpfbnVsb3ZlXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgRm9ybV9NYXNrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9yZ2FuaXphY2VcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zcmFyKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19yYXI9dmFsdWUuaXhzX3Jhcjttb2RlbC5ua3M9dmFsdWUuaWNvO21vZGVsLm5rc190eHQ9dmFsdWUubmF6ZXZcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBGb3JtX01hc2thXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUm9rL03Em3PDrWNcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIHsgbmFtZTogXCJyb2tcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIHsgbmFtZTogXCJtZXNpY1wiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAxMiwgbWVzc2FnZTogXCJDaHlibsSbIHphZGFuw6EgaG9kbm90YVwiIH0pXSB9KVxyXG5cclxuICAgICAgICAgICAgRm9ybV9NYXNrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLCBsYWJlbDogXCJTdGF2YmFcIiwgbmFtZTogXCJzdGF2YmFcIiwgcGF0aEluTW9kZWw6IFwic3RhdmJhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRTdGFydDogRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucyh0aGF0Lmdsb2JhbHMuRGVsa2FfQWtjZSEsIHRydWUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkRW5kOiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISwgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLmZsYWdzLm5vQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob2Rub3RhOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2Rub3RhID0gY2hhbmdlT2JqLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChob2Rub3RhKSAmJiAoaG9kbm90YS5sZW5ndGggPCB0aGF0Lmdsb2JhbHMuRGVsa2FfQWtjZSEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBVdGlscy56ZXJvcGFkKGhvZG5vdGEsIHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgRm9ybV9NYXNrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsIGxhYmVsOiBcIk9iamVrdFwiLCBuYW1lOiBcIm9iamVrdFwiLCBwYXRoSW5Nb2RlbDogXCJvYmpla3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZFN0YXJ0OiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKDQsIHRydWUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkRW5kOiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKDQsIHRydWUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgRm9ybV9NYXNrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsIGxhYmVsOiBcIk1hbmRhdMOhxZlcIiwgbmFtZTogXCJtYW5kYXRhclwiLCBwYXRoSW5Nb2RlbDogXCJtYW5kYXRhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkU3RhcnQ6IEVrby5EZXRhaWwuRmllbGQuZ2V0Q291bnRlck9wdGlvbnMoMywgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRFbmQ6IEVrby5EZXRhaWwuRmllbGQuZ2V0Q291bnRlck9wdGlvbnMoMywgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBGb3JtX01hc2thXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIiwgbGFiZWw6IFwiU1VcIiwgbmFtZTogXCJ1ZWFcIiwgcGF0aEluTW9kZWw6IFwidWVhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRTdGFydDogRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucygzLCB0cnVlLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZEVuZDogRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucygzLCB0cnVlLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIEZvcm1fTWFza2FcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLCBsYWJlbDogXCJBVVwiLCBuYW1lOiBcInVlYlwiLCBwYXRoSW5Nb2RlbDogXCJ1ZWJcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZFN0YXJ0OiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKDQsIHRydWUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkRW5kOiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKDQsIHRydWUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgRm9ybV9NYXNrYVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsIGxhYmVsOiBcIkludmVudMOhcm7DrSDEjcOtc2xvXCIsIG5hbWU6IFwiaW52X2Npc1wiLCBwYXRoSW5Nb2RlbDogXCJpbnZfY2lzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRTdGFydDogRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucyg0LCB0cnVlLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZEVuZDogRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucyg0LCB0cnVlLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIEZvcm1fTWFza2FcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOZXpvYnJheml0IG51bG92w6kgc3RhdmJ5XCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInByaXpfbnVsb3ZlXCIsIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdiA9PSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2ID8gMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHJhZGVrTWFza2E6IHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBua3M6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHJvazogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbWVzaWM6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIHByaXpfbnVsb3ZlOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBzdGF2YmE6IHsgc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcgfSxcclxuICAgICAgICAgICAgICAgIG9iamVrdDogeyBzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZyB9LFxyXG4gICAgICAgICAgICAgICAgbWFuZGF0YXI6IHsgc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcgfSxcclxuICAgICAgICAgICAgICAgIHVlYTogeyBzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZyB9LFxyXG4gICAgICAgICAgICAgICAgdWViOiB7IHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nIH0sXHJcbiAgICAgICAgICAgICAgICBpbnZfY2lzOiB7IHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nIH1cclxuICAgICAgICAgICAgfSA9IHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgbmtzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcm9rOiAwLFxyXG4gICAgICAgICAgICAgICAgbWVzaWM6IDAsXHJcbiAgICAgICAgICAgICAgICBwcml6X251bG92ZTogMCxcclxuICAgICAgICAgICAgICAgIHN0YXZiYTogeyBzdGFydDogXCJcIiwgZW5kOiBcIlwiIH0sXHJcbiAgICAgICAgICAgICAgICBvYmpla3Q6IHsgc3RhcnQ6IFwiXCIsIGVuZDogXCJcIiB9LFxyXG4gICAgICAgICAgICAgICAgbWFuZGF0YXI6IHsgc3RhcnQ6IFwiXCIsIGVuZDogXCJcIiB9LFxyXG4gICAgICAgICAgICAgICAgdWVhOiB7IHN0YXJ0OiBcIlwiLCBlbmQ6IFwiXCIgfSxcclxuICAgICAgICAgICAgICAgIHVlYjogeyBzdGFydDogXCJcIiwgZW5kOiBcIlwiIH0sXHJcbiAgICAgICAgICAgICAgICBpbnZfY2lzOiB7IHN0YXJ0OiBcIlwiLCBlbmQ6IFwiXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmFkZWtNYXNrYS5tYXNrYSA9IGNudC5zZXN0YXZhLmFsdiEuVFlQX0FMRztcclxuICAgICAgICAgICAgcmFkZWtNYXNrYS5yb2sgPSBjbnQucm9rX2FrdDtcclxuICAgICAgICAgICAgcmFkZWtNYXNrYS5tZXNpYyA9IGNudC5tZXNpY19ha3Q7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvbV92eXNsZWRlayA9IGNudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJNYXNrYSBwcm8gZ2VuZXJvdsOhbsOtIHNlc3RhdnlcIiwgRm9ybV9NYXNrYSwgcmFkZWtNYXNrYSAsIHsgd2lkdGg6IDcwMCwgaGVpZ2h0OiA1MDAgfSk7XHJcbiAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrX3BybyA9IHByb21fdnlzbGVkZWsuY3JlYXRlRGlhbG9nUHJvbWlzZSggLypcImNsb3NlXCIqLy8qXCJ5ZXNcIiovLypcIm9rXCIqLy8qLCB7IGR1dm9kOiBzdHJpbmcgfSovKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRla01hc2thID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrTWFza2EubWFza2EuY2hhckF0KDApICE9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByYWRla01hc2thLnN0YXZiYS5zdGFydCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrTWFza2Euc3RhdmJhLmVuZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtNYXNrYS5zdGF2YmEuc3RhcnQgPSByYWRla01hc2thLnN0YXZiYS5zdGFydCA/IFV0aWxzLnplcm9wYWQocmFkZWtNYXNrYS5zdGF2YmEuc3RhcnQsIHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISkgOiBVdGlscy56ZXJvcGFkKFwiMFwiLCB0aGF0Lmdsb2JhbHMuRGVsa2FfQWtjZSEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtNYXNrYS5zdGF2YmEuZW5kID0gcmFkZWtNYXNrYS5zdGF2YmEuZW5kID8gVXRpbHMuemVyb3BhZChyYWRla01hc2thLnN0YXZiYS5lbmQsIHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISkgOiBVdGlscy56ZXJvcGFkKFwiMFwiLCB0aGF0Lmdsb2JhbHMuRGVsa2FfQWtjZSEpLnJlcGxhY2UoLzAvZywgXCI5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRla01hc2thLm1hc2thLmNoYXJBdCgxKSAhPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmFkZWtNYXNrYS5vYmpla3Quc3RhcnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByYWRla01hc2thLm9iamVrdC5lbmQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrTWFza2Eub2JqZWt0LnN0YXJ0ID0gcmFkZWtNYXNrYS5vYmpla3Quc3RhcnQgPyBVdGlscy56ZXJvcGFkKHJhZGVrTWFza2Eub2JqZWt0LnN0YXJ0LCA0KSA6IFV0aWxzLnplcm9wYWQoXCIwXCIsIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtNYXNrYS5vYmpla3QuZW5kID0gcmFkZWtNYXNrYS5vYmpla3QuZW5kID8gVXRpbHMuemVyb3BhZChyYWRla01hc2thLm9iamVrdC5lbmQsIDQpIDogVXRpbHMuemVyb3BhZChcIjBcIiwgNCkucmVwbGFjZSgvMC9nLCBcIjlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrTWFza2EubWFza2EuY2hhckF0KDIpICE9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByYWRla01hc2thLm1hbmRhdGFyLnN0YXJ0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmFkZWtNYXNrYS5tYW5kYXRhci5lbmQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrTWFza2EubWFuZGF0YXIuc3RhcnQgPSByYWRla01hc2thLm1hbmRhdGFyLnN0YXJ0ID8gVXRpbHMuemVyb3BhZChyYWRla01hc2thLm1hbmRhdGFyLnN0YXJ0LCAzKSA6IFV0aWxzLnplcm9wYWQoXCIwXCIsIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtNYXNrYS5tYW5kYXRhci5lbmQgPSByYWRla01hc2thLm1hbmRhdGFyLmVuZCA/IFV0aWxzLnplcm9wYWQocmFkZWtNYXNrYS5tYW5kYXRhci5lbmQsIDMpIDogVXRpbHMuemVyb3BhZChcIjBcIiwgMykucmVwbGFjZSgvMC9nLCBcIjlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrTWFza2EubWFza2EuY2hhckF0KDMpICE9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByYWRla01hc2thLnVlYS5zdGFydCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrTWFza2EudWVhLmVuZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtNYXNrYS51ZWEuc3RhcnQgPSByYWRla01hc2thLnVlYS5zdGFydCA/IFV0aWxzLnplcm9wYWQocmFkZWtNYXNrYS51ZWEuc3RhcnQsIDMpIDogVXRpbHMuemVyb3BhZChcIjBcIiwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla01hc2thLnVlYS5lbmQgPSByYWRla01hc2thLnVlYS5lbmQgPyBVdGlscy56ZXJvcGFkKHJhZGVrTWFza2EudWVhLmVuZCwgMykgOiBVdGlscy56ZXJvcGFkKFwiMFwiLCAzKS5yZXBsYWNlKC8wL2csIFwiOVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWtNYXNrYS5tYXNrYS5jaGFyQXQoNCkgIT09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrTWFza2EudWViLnN0YXJ0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmFkZWtNYXNrYS51ZWIuZW5kID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla01hc2thLnVlYi5zdGFydCA9IHJhZGVrTWFza2EudWViLnN0YXJ0ID8gVXRpbHMuemVyb3BhZChyYWRla01hc2thLnVlYi5zdGFydCwgNCkgOiBVdGlscy56ZXJvcGFkKFwiMFwiLCA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrTWFza2EudWViLmVuZCA9IHJhZGVrTWFza2EudWViLmVuZCA/IFV0aWxzLnplcm9wYWQocmFkZWtNYXNrYS51ZWIuZW5kLCA0KSA6IFV0aWxzLnplcm9wYWQoXCIwXCIsIDQpLnJlcGxhY2UoLzAvZywgXCI5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRla01hc2thLm1hc2thLmNoYXJBdCg1KSAhPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmFkZWtNYXNrYS5pbnZfY2lzLnN0YXJ0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmFkZWtNYXNrYS5pbnZfY2lzLmVuZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla01hc2thLmludl9jaXMuc3RhcnQgPSByYWRla01hc2thLmludl9jaXMuc3RhcnQgPyBVdGlscy56ZXJvcGFkKHJhZGVrTWFza2EuaW52X2Npcy5zdGFydCwgMTApIDogVXRpbHMuemVyb3BhZChcIjBcIiwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtNYXNrYS5pbnZfY2lzLmVuZCA9IHJhZGVrTWFza2EuaW52X2Npcy5lbmQgPyBVdGlscy56ZXJvcGFkKHJhZGVrTWFza2EuaW52X2Npcy5lbmQsIDEwKSA6IFV0aWxzLnplcm9wYWQoXCIwXCIsIDEwKS5yZXBsYWNlKC8wL2csIFwiOVwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmFkZWtNYXNrYVwiLCByYWRla01hc2thKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbmNlbGxhdGlvblRva2VuID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2N1cnJHZW5lcmF0aW5nRGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdlbmVyYXRvcjogUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0R2VuZXJhdG9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yID0gbmV3IFJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEdlbmVyYXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5PZHQuV2ViQ2xpZW50LkdPZHRQb3phZGF2ZWtHZW5lcmF0b3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRUb0FzeW5jOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0R2VuZXJhdG9yLnByb2dyZXNzQmVnaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVwR2VuQ2FuY2VsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybnVqaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYXRub3N0ID0gdGhhdC5zZXNUcmVlUGFyYW1zLkNvbnRyb2xQYXJhbXMuUGxhdG5vc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3IuZ2VuZXJhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SWQ6IHRoYXQud3JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFN0eWxlOiB0aGF0LnNlc3RhdmEuYWx2IS5PdXRwdXRTdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiBwbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogcmFkZWtNYXNrYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HU2VzdGF2eUFkYTpDb252ZXJ0UmVwb3J0UGFyYW1zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBnZW5lcmF0b3JQYXJhbXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBsYXRub3N0OiBwbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcyhmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRHZW5lcmF0b3IucHJvZ3Jlc3NVcGRhdGUodGhhdCwgcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnQgPSBuZXcgUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0RG9jdW1lbnQodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvd25sb2FkRG9jdW1lbnQoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0RG93bmxvYWRlclBhcmFtcyhyZXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBEZWxhIHByb2JsZW0gbmEgSUUgLSBhY3RpdmVYIGhvIGxva2FsbmUgdnl0dm9yaSBwb2QgamlueW0gbmF6dmVtIG5leiBqZSBwb3phZG92YW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kb2N1bWVudC5kb3dubG9hZERvY3VtZW50KEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLmdldERvd25sb2FkT25seVBhcmFtcyhyZXMuaWQpKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlICYmIHN0YXRlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudCA9IG5ldyBSZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnREb2N1bWVudCh0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG93bmxvYWREb2N1bWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb3dubG9hZGVyVHlwZTogXCJHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5SZXBvcnRlci5TaW5nbGVQYWdlLkNvbW1vbi5HUmVwb3J0RG93bmxvYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0Rvd25sb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3VzdG9tRGF0YTogeyBcImlkXCI6IHN0YXRlLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlICYmICQuaXNQbGFpbk9iamVjdChzdGF0ZSkgJiYgc3RhdGUuc3RhdGUgPT09IC0yKSB7IC8vLTIgPSBnZW5lcm92YW5pIHpydXNlbm8gdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJHZW5lcm92w6Fuw60gc2VzdGF2eSBieWxvIHpydcWhZW5vIHXFvml2YXRlbGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLXN0YXRlLXdhcm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3VyckdlbmVyYXRpbmdEZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==