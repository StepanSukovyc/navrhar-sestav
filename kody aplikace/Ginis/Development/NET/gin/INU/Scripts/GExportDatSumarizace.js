"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GExportDatSumarizace.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
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
            let GExportDatSumarizace = class GExportDatSumarizace extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:30450034"; //RC 30450034 : Export dat pro sumarizaci
                    this.init = true;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    //debugger;
                    console.log("model", this.model);
                    console.log("modelmesice", this.modelmesice);
                    console.log("pozadavek", this.pozadavek);
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    this.actions.add(GAction.createPrintAction({
                        name: "actTisk",
                        tema: "inu_ptm_inuexpo",
                        caption: "Export dat",
                        serverParameterMethod: "Gordic.Inu.WebClient.GExportDatSumarizace:ConvertReportParams",
                        reportStarting: function (rep) {
                            return that.generateReport(rep);
                        }
                    }));
                    //nastavení akcí
                    this.actions.addRange({
                        actExport: {
                            caption: "Export", icon: "gi-plus",
                            run: () => {
                                return that.generateReport2();
                            }
                        }
                    });
                    this.actions.addRange({
                        actExportAsync: {
                            caption: "Export", icon: "gi-plus",
                            run: () => {
                                return that.generateReport3();
                            }
                        }
                    });
                    this.actions.add(GAction.createPrintAction({
                        name: "actTisk",
                        tema: "inu_ptm_inuexpo",
                        caption: "Tisk",
                        serverParameterMethod: "Gordic.Inu.WebClient.GExportDatSumarizace:ConvertReportParams",
                        reportStarting: function (rep) {
                            return that.generateReport(rep);
                        }
                    }));
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actTisk*", "actExportAsync*"]));
                    //this.menuBar(this.actions.createBar(["actTisk*", "actExport*"]));
                    //this.menuBar(this.actions.createBar(["actTisk*", "actExport*", "actExportAsync*"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    that.form = $("<div>")
                        .appendTo(mainForm)
                        .gform("setup", { layoutDescriptor: "L1M1S1", name: "obdobiForm" })
                        .gformsection("create", "Parametry exportu")
                        .gformrow("addFieldsRow", "Rok", ["w-4"]).gstringbox({ name: "rok", disabled: true })
                        .gformrow("addFieldsRow", "Měsíc", ["w-4"]).gselectbox({
                        name: "mesic",
                        dropdown: true,
                        strict: true,
                        data: this.modelmesice,
                        //                    validators: [new Gordic.Validators.Required(), new Gordic.Validators.Range({ min: 1, max: 13, message: "jres:30450035" })], //RC 30450035 : Chybně zadaná hodnota
                        validators: [
                            new Gordic.Validators.Base({
                                message: "jres:30450035", //RC 30450035 : Chybně zadaná hodnota
                                validate: function (value, changeObj) {
                                    //debugger;
                                    var valid = false;
                                    var valStat = that.findFields("mesic").gfield("getValue");
                                    if (value && value.Value >= 1 && value.Value <= 13) {
                                        valid = true;
                                    }
                                    return valid;
                                },
                                group: "customValidation"
                            })
                        ],
                        flag: "required",
                        itemTemplate: "{Text}",
                        helperColumns: ["Text"],
                        change: function (ev, selected) {
                            //if (selected.value)
                            that.nastav_vystup();
                        },
                        model: "model.mesic=value.Value;model.MesicNazev=value.Text"
                    })
                        .gformrow("addFieldsRow", "Zápisy", ["w-4"]).gradio({
                        name: "typ_zapisu",
                        itemClass: "w-5", // případnjě lze přidt pevné velikosti viz xwiki
                        change: function (ev, selected) {
                            if (selected.value)
                                that.nastav_vystup();
                        },
                        radios: [
                            { value: 'UCT', label: 'Účetní' },
                            { value: 'ROZ', label: 'Rozpočtové' }
                        ]
                    })
                        .gformrow("addFieldsRow", "Formát", ["w-4"]).gradio({
                        name: "typ_vystupu",
                        itemClass: "w-5 ", // případnjě lze přidt pevné velikosti viz xwiki
                        change: function (ev, selected) {
                            if (selected.value)
                                that.nastav_vystup();
                        },
                        radios: [
                            { value: 'KXX', label: '.KXX' },
                            { value: 'XML', label: '.XML' }
                        ]
                    })
                        .gformrow("addFieldsRow", "Výstup", ["w-4"]).gstringbox({ name: "vystup", disabled: false })
                        .gformrow("addFieldsRow", "Komprimovat", ["w-4"])
                        .gcheck({
                        name: "komprimovat",
                        disabled: false,
                        modelValueTransform: {
                            apply: (v) => {
                                return v == 1;
                            },
                            collect: (v) => {
                                return (v ? 1 : 0);
                            }
                        }
                    })
                        .gformrow("addFieldsRow", "email", ["w-4"]).gstringbox({ name: "email", disabled: false })
                        .gform("complete");
                    this.pdg = $("<div>")
                        .appendTo(mainForm)
                        .addClass("detail-grid")
                        .gcontent(Gordic.Report.WebClient.GReportTreeControlTS, { controlParams: this.sesTreeParams.ControlParams })
                        .gtab({
                        title: "Výběr sestavy",
                        opened: true
                    });
                    this.pdg.on({
                        "reportselected.greports": function (event, output) {
                            console.log("greports", event, output);
                            that.sestava = output;
                            that.setOutput({ ReportNazev: output.name, Wrid: output.reportId, OutputStyle: output.defaultOutput, idSes: output.idSes });
                        }
                    });
                    this.findFields().gfield("model", "apply", this.model, { initialValues: true });
                }
                generateReport(rep) {
                    var cnt = this;
                    var that = this;
                    var currentfilter = {};
                    currentfilter.mesic = this.model.mesic;
                    currentfilter.typ = "UCT";
                    console.log("export dat start");
                    rep.customDto = currentfilter;
                }
                generateReport2() {
                    var that = this;
                    // var model_temp: Gordic.Inu.WebClient.DTO.GInuExportDto = {};
                    //debugger;
                    var $cDiv = $(this.contentDiv);
                    // rucni spusteni validace
                    $cDiv.findForms().findFields().gfield("validate");
                    if ($cDiv.findForms().gform("isValid", true)) {
                        //var dto = {};
                        $cDiv.findFields().gfield("model", "collect", that.model);
                        $cDiv.findFields().gfield("confirm");
                        // debugger;;
                        var GReportGenerator = Gordic.Report.WebClient.GReportGenerator;
                        var cancellationToken = {
                            cancel: false
                        };
                        GReportGenerator.progressBegin(this, new GAction({
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
                        this.generator = new GReportGenerator({
                            reportGeneratorType: "Gordic.Inu.WebClient.GInuExportGenerator",
                            waitToAsync: 1
                        });
                        var v_platnost = Gordic.Templates.Formatters.number(this.model.rok, "0000").toString() + Gordic.Templates.Formatters.number(this.model.mesic, "00").toString();
                        console.log("v_platnost", v_platnost);
                        var poz = {
                            Nazev: null,
                            Poznamka: null,
                            Rok: this.model.rok,
                            // Vystup: that.sestava.ReportNazev,
                            TypPozadavku: "10",
                            ICO: this.model.ico,
                            Mesic: this.model.mesic,
                            MesicNazev: "",
                            OutputStyle: that.sestava.OutputStyle,
                            OutCsv: false,
                            OutJson: false,
                            OutXml: false,
                            Platnost: v_platnost,
                            Wrid: that.sestava.reportId,
                            NazevSouboru: "vystupnisoubor.txt",
                            platnost: "201805"
                        };
                        console.log("poz.Wrid", poz.Wrid);
                        console.log("that.sestava.Wrid", that.sestava.reportId);
                        console.log("poz", poz);
                        this.generator.generate({
                            reportId: poz.Wrid,
                            outputStyle: poz.OutputStyle,
                            platnost: poz.platnost,
                            generatorParams: poz,
                            serverParameterMethod: "Gordic.Inu.WebClient.GExportDatSumarizace:ConvertReportParams",
                            customDto: that.model,
                            props: { Platnost: poz.platnost }
                        }, null, cancellationToken)
                            .progress(function (progress) {
                            GReportGenerator.progressUpdate(that, progress);
                        })
                            .then(function (res) {
                            var document = new Gordic.Report.WebClient.GReportDocument(that);
                            //document.downloadDocument(Gordic.Report.WebClient.GReportTreeControlTS.getDownloaderParams(res));
                            document.download(Gordic.Report.WebClient.GReportTreeControlTS.getDownloaderParams(res));
                        })
                            .fail(function (state) {
                            console.log("fail", arguments);
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                    else {
                        that.showFlash("Chybně vyplněné podmínky exportu", "error", "id-flash-exp");
                    }
                }
                generateReport3() {
                    var that = this;
                    var $cDiv = $(this.contentDiv);
                    // rucni spusteni validace
                    $cDiv.findForms().findFields().gfield("validate");
                    if ($cDiv.findForms().gform("isValid", true)) {
                        //var dto = {};
                        $cDiv.findFields().gfield("model", "collect", that.model);
                        $cDiv.findFields().gfield("confirm");
                        var v_platnost = Gordic.Templates.Formatters.number(this.model.rok, "0000").toString() + Gordic.Templates.Formatters.number(this.model.mesic, "00").toString();
                        var poz = {
                            Nazev: null,
                            Poznamka: null,
                            Rok: this.model.rok,
                            // Vystup: that.sestava.ReportNazev,
                            TypPozadavku: "10",
                            ICO: this.model.ico,
                            Mesic: this.model.mesic,
                            MesicNazev: "",
                            OutputStyle: that.sestava.OutputStyle,
                            OutCsv: false,
                            OutJson: false,
                            OutXml: false,
                            Platnost: v_platnost,
                            Wrid: that.sestava.reportId,
                            NazevSouboru: "vystupnisoubor.txt",
                            platnost: "201805"
                        };
                        const cancellationToken = new GObservableObject({
                            cancelled: false,
                            uniqueClass: ""
                        });
                        const cancelAct = new GAction({
                            name: "repGenCancelAct",
                            caption: "Storno",
                            enabled: true,
                            visible: true,
                            run: function () {
                                cancellationToken.update({ cancelled: true });
                                this.update({
                                    caption: "Stornuji",
                                    enabled: false
                                });
                            }
                        });
                        const genCnt = this.createServiceContent([Gordic.Report.WebClient.GReportAsyncGenerator, {}]);
                        this.beginOperation();
                        genCnt.on("progress", (progress) => {
                            this.progressOperation({
                                text: Gordic.Report.WebClient.GReportTreeControlTS.formatProgressMessage(progress.text),
                                progress: progress.current,
                                total: progress.total,
                                cancelAction: cancelAct
                            });
                        });
                        genCnt.readyAwait.then(() => {
                            return genCnt.generate({
                                reportId: poz.Wrid,
                                outputStyle: poz.OutputStyle,
                                platnost: poz.platnost,
                                generatorParams: poz,
                                serverParameterMethod: "Gordic.Inu.WebClient.GExportDatSumarizace:ConvertReportParams",
                                customDto: that.model,
                                props: { Platnost: poz.platnost },
                                loadData: true,
                                reportGeneratorType: "Gordic.Inu.WebClient.GInuExportGenerator",
                                reportGeneratorTypeAsync: "Gordic.Inu.Server.GInuExportGenerator, Gordic.Inu.Server"
                            }, cancellationToken); //Samotne generovani
                        })
                            .then((r) => {
                            var document = new Gordic.Report.WebClient.GReportDocument(that);
                            return document
                                .download(Gordic.Report.WebClient.GReportTreeControlTS.getDownloaderParams(r))
                                .then(() => { return genCnt.clear(r).then(() => r.data); });
                        }) //Uklid dat na serveru + vraceni vysledku
                            .then((data) => {
                            console.log(data);
                        }) //Zapis do konzole
                            .catch(function (state) {
                            genCnt.endOperation();
                            //myParam.Result = Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error;
                            if (state && $.isPlainObject(state) && state.state === -2) { //-2 = generovani zruseno uzivatelem
                                genCnt.showFlash({
                                    label: "Generování sestavy bylo zrušeno",
                                    customClass: "g-state-warning"
                                });
                            }
                            else if (state.genState && state.genState === "exception") {
                                throw new GServerError(state.exception);
                            }
                            return;
                        })
                            .always(() => { this.endOperation(); genCnt.close(); }); //Uzavreni servisniho contentu
                    }
                    else {
                        that.showFlash("Chybně vyplněné podmínky exportu", "error", "id-flash-exp");
                    }
                }
                setOutput(ret) {
                    //    /// <summary>Nastavi vystup pozdavku</summary>
                    //    /// <param name='ret' type='object'>Objekt ve tvaru: { ReportNazev: "", Wrid: "", OutputStyle: "" }</param>
                    //    if (!ret || !ret.Wrid)
                    //        return;
                    //    this.findFields("vystup").gstringbox("setValue", ret.ReportNazev);
                    //    //this.pozadavek.Wrid = ret.Wrid;
                    //    // var $ns = this.findFields("NazevSouboru");
                    //    // var $ns = this.findFields("NazevSouboru");
                    //    //if (ret.OutputStyle) //Muze byt prazdny, pokud nebyl vybran format
                    //    //    this.pozadavek.OutputStyle = ret.OutputStyle;
                }
                ;
                //clearOutput () {
                //    /// <summary>Vymaze pozadovany vystup</summary>
                //    var poz = this.pozadavek;
                //    poz.OutputStyle = null;
                //    poz.Wrid = null;
                //    this.findFields("vystup").gstringbox("setValue", "");
                //};
                nastav_vystup() {
                    var that = this;
                    var $cDiv = $(that.contentDiv);
                    $cDiv.findFields().gfield("model", "collect", that.model);
                    //if ($cDiv.findForms().gform("isValid", true)) {
                    //    //var dto = {};
                    //    $cDiv.findFields().gfield("model", "collect", that.model);
                    //    $cDiv.findFields().gfield("confirm");
                    var vystup_name = "";
                    if (that.model.typ_zapisu == "ROZ") {
                        vystup_name = "R-";
                    }
                    else {
                        vystup_name = "U-";
                    }
                    if (that.model.mesic) {
                        vystup_name = vystup_name + (that.model.mesic < 10 ? "0" : "") + that.model.mesic.toString();
                    }
                    else {
                        vystup_name = vystup_name + "MM";
                    }
                    vystup_name = vystup_name + that.model.lic;
                    if (that.model.typ_vystupu?.toUpperCase() == "XML") {
                        vystup_name = vystup_name + ".xml";
                    }
                    else {
                        vystup_name = vystup_name + ".kxx";
                    }
                    this.findFields("vystup").gstringbox("setValue", vystup_name);
                    // }
                }
            };
            GExportDatSumarizace = __decorate([
                gcontent
            ], GExportDatSumarizace);
            WebClient.GExportDatSumarizace = GExportDatSumarizace;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0V4cG9ydERhdFN1bWFyaXphY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRXhwb3J0RGF0U3VtYXJpemFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQTZkZjtBQTdkRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2ZG5CO0lBN2RnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2ZDdCO1FBN2RvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLE9BQUEsWUFBWTtnQkFBdEQ7O29CQUVJLFVBQUssR0FBRyxlQUFlLENBQUMsQ0FBRSx5Q0FBeUM7b0JBT3pELFNBQUksR0FBRyxJQUFJLENBQUM7b0JBT2QsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkF1Y3JELENBQUM7Z0JBcmNHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixXQUFXO29CQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBR3pDLHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQzt3QkFDaEI7NEJBQ0ksT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLOzRCQUNuQixhQUFhLEVBQUUsSUFBSTt5QkFDdEI7cUJBQ0osQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8s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QUFDLEVBN2RnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2ZG5CO0FBQUQsQ0FBQyxFQTdkUyxNQUFNLEtBQU4sTUFBTSxRQTZkZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuSW51LldlYkNsaWVudC5HRXhwb3J0RGF0U3VtYXJpemFjZS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRXhwb3J0RGF0U3VtYXJpemFjZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMwNDUwMDM0XCI7ICAvL1JDIDMwNDUwMDM0IDogRXhwb3J0IGRhdCBwcm8gc3VtYXJpemFjaVxyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbDogR29yZGljLkludS5XZWJDbGllbnQuRFRPLkdJbnVFeHBvcnREdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsbWVzaWNlOiBHb3JkaWMuSW51LldlYkNsaWVudC5EVE8uR0ludVNlbGVjdE9wdGlvbkR0b1tdO1xyXG4gICAgICAgIHByb3RlY3RlZCBwb3phZGF2ZWs6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkRUTy5HSW51UG96YWRhdmVrRHRvO1xyXG4gICAgICAgIHByb3RlY3RlZCBQcmVwRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHJvdGVjdGVkIHNlc1RyZWVQYXJhbXM7IFxyXG4gICAgICAgIHByb3RlY3RlZCBzZXN0YXZhOyBcclxuICAgICAgICBwcm90ZWN0ZWQgaW5pdCA9IHRydWU7XHJcbiAgICAgICAgcHJvdGVjdGVkIHR5cDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBhZ2VuZGE6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByb3RlY3RlZCBwZGc6IEpRdWVyeTtcclxuICAgICAgICBwcm90ZWN0ZWQgX2N1cnJHZW5lcmF0aW5nRGVmOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRHZW5lcmF0b3I7XHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb2RlbFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb2RlbG1lc2ljZVwiLCB0aGlzLm1vZGVsbWVzaWNlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3phZGF2ZWtcIiwgdGhpcy5wb3phZGF2ZWspO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBicmVhZGNydW1ic1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1faW51ZXhwb1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJFeHBvcnQgZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR0V4cG9ydERhdFN1bWFyaXphY2U6Q29udmVydFJlcG9ydFBhcmFtc1wiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZW5lcmF0ZVJlcG9ydChyZXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEV4cG9ydDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRXhwb3J0XCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZW5lcmF0ZVJlcG9ydDIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEV4cG9ydEFzeW5jOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJFeHBvcnRcIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmdlbmVyYXRlUmVwb3J0MygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1faW51ZXhwb1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR0V4cG9ydERhdFN1bWFyaXphY2U6Q29udmVydFJlcG9ydFBhcmFtc1wiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZW5lcmF0ZVJlcG9ydChyZXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0VGlzaypcIiwgXCJhY3RFeHBvcnRBc3luYypcIl0pKTtcclxuICAgICAgICAgICAgLy90aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RUaXNrKlwiLCBcImFjdEV4cG9ydCpcIl0pKTtcclxuICAgICAgICAgICAgLy90aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RUaXNrKlwiLCBcImFjdEV4cG9ydCpcIiwgXCJhY3RFeHBvcnRBc3luYypcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5mb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIsIG5hbWU6IFwib2Jkb2JpRm9ybVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiUGFyYW1ldHJ5IGV4cG9ydHVcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlJva1wiLCBbXCJ3LTRcIl0pLmdzdHJpbmdib3goeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiTcSbc8OtY1wiLCBbXCJ3LTRcIl0pLmdzZWxlY3Rib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5tb2RlbG1lc2ljZSxcclxuLy8gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDEzLCBtZXNzYWdlOiBcImpyZXM6MzA0NTAwMzVcIiB9KV0sIC8vUkMgMzA0NTAwMzUgOiBDaHlibsSbIHphZGFuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMwNDUwMDM1XCIsIC8vUkMgMzA0NTAwMzUgOiBDaHlibsSbIHphZGFuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsU3RhdCA9IHRoYXQuZmluZEZpZWxkcyhcIm1lc2ljXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5WYWx1ZSA+PSAxICYmIHZhbHVlLlZhbHVlIDw9IDEzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJjdXN0b21WYWxpZGF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntUZXh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcIlRleHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHNlbGVjdGVkLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZfdnlzdHVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZXNpYz12YWx1ZS5WYWx1ZTttb2RlbC5NZXNpY05hemV2PXZhbHVlLlRleHRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlrDoXBpc3lcIiwgW1widy00XCJdKS5ncmFkaW8oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3phcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTVcIiwgLy8gcMWZw61wYWRuasSbIGx6ZSBwxZlpZHQgcGV2bsOpIHZlbGlrb3N0aSB2aXogeHdpa2lcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnZhbHVlKSB0aGF0Lm5hc3Rhdl92eXN0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnVUNUJywgbGFiZWw6ICfDmsSNZXRuw60nIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdST1onLCBsYWJlbDogJ1JvenBvxI10b3bDqScgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJGb3Jtw6F0XCIsIFtcInctNFwiXSkuZ3JhZGlvKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF92eXN0dXB1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNSBcIiwgLy8gcMWZw61wYWRuasSbIGx6ZSBwxZlpZHQgcGV2bsOpIHZlbGlrb3N0aSB2aXogeHdpa2lcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLnZhbHVlKSB0aGF0Lm5hc3Rhdl92eXN0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnS1hYJywgbGFiZWw6ICcuS1hYJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnWE1MJywgbGFiZWw6ICcuWE1MJyB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlbDvXN0dXBcIiwgW1widy00XCJdKS5nc3RyaW5nYm94KHsgbmFtZTogXCJ2eXN0dXBcIiwgZGlzYWJsZWQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiS29tcHJpbW92YXRcIiwgW1widy00XCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nY2hlY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvbXByaW1vdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYgPT0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodiA/IDEgOiAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImVtYWlsXCIsIFtcInctNFwiXSkuZ3N0cmluZ2JveCh7IG5hbWU6IFwiZW1haWxcIiwgZGlzYWJsZWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjb21wbGV0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGRnID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJkZXRhaWwtZ3JpZFwiKVxyXG4gICAgICAgICAgICAgICAgLmdjb250ZW50KEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLCB7IGNvbnRyb2xQYXJhbXM6IHRoaXMuc2VzVHJlZVBhcmFtcy5Db250cm9sUGFyYW1zIH0gKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlbDvWLEm3Igc2VzdGF2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBkZy5vbih7XHJcbiAgICAgICAgICAgICAgICBcInJlcG9ydHNlbGVjdGVkLmdyZXBvcnRzXCI6IGZ1bmN0aW9uIChldmVudCwgb3V0cHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmVwb3J0c1wiLCBldmVudCwgb3V0cHV0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlc3RhdmEgPSBvdXRwdXQ7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE91dHB1dCh7IFJlcG9ydE5hemV2OiBvdXRwdXQubmFtZSwgV3JpZDogb3V0cHV0LnJlcG9ydElkLCBPdXRwdXRTdHlsZTogb3V0cHV0LmRlZmF1bHRPdXRwdXQsIGlkU2VzOiBvdXRwdXQuaWRTZXMgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsLCB7aW5pdGlhbFZhbHVlczp0cnVlIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUmVwb3J0KHJlcCkge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudGZpbHRlcjogRFRPLkdJbnVFeHBvcnREdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRmaWx0ZXIubWVzaWMgPSB0aGlzLm1vZGVsLm1lc2ljO1xyXG4gICAgICAgICAgICBjdXJyZW50ZmlsdGVyLnR5cCA9IFwiVUNUXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4cG9ydCBkYXQgc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSBjdXJyZW50ZmlsdGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2VuZXJhdGVSZXBvcnQyKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgLy8gdmFyIG1vZGVsX3RlbXA6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkRUTy5HSW51RXhwb3J0RHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICB2YXIgJGNEaXYgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIC8vIHJ1Y25pIHNwdXN0ZW5pIHZhbGlkYWNlXHJcbiAgICAgICAgICAgICRjRGl2LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY0Rpdi5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGF0Lm1vZGVsICk7XHJcbiAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY29uZmlybVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyOztcclxuICAgICAgICAgICAgICAgIHZhciBHUmVwb3J0R2VuZXJhdG9yID0gR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEdlbmVyYXRvcjtcclxuICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsYXRpb25Ub2tlbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIEdSZXBvcnRHZW5lcmF0b3IucHJvZ3Jlc3NCZWdpbihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXBHZW5DYW5jZWxBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbi5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm51amlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBuZXcgR1JlcG9ydEdlbmVyYXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0R2VuZXJhdG9yVHlwZTogXCJHb3JkaWMuSW51LldlYkNsaWVudC5HSW51RXhwb3J0R2VuZXJhdG9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2FpdFRvQXN5bmM6IDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB2X3BsYXRub3N0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcih0aGlzLm1vZGVsLnJvayEsIFwiMDAwMFwiKS50b1N0cmluZygpICsgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcih0aGlzLm1vZGVsLm1lc2ljISwgXCIwMFwiKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2X3BsYXRub3N0XCIsIHZfcGxhdG5vc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb3ogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTmF6ZXY6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgUG96bmFta2E6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgUm9rOiB0aGlzLm1vZGVsLnJvayxcclxuICAgICAgICAgICAgICAgICAgIC8vIFZ5c3R1cDogdGhhdC5zZXN0YXZhLlJlcG9ydE5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cFBvemFkYXZrdTogXCIxMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIElDTzogdGhpcy5tb2RlbC5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgTWVzaWM6IHRoaXMubW9kZWwubWVzaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgTWVzaWNOYXpldjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBPdXRwdXRTdHlsZTogdGhhdC5zZXN0YXZhLk91dHB1dFN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIE91dENzdjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgT3V0SnNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgT3V0WG1sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBQbGF0bm9zdDogdl9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICBXcmlkOiB0aGF0LnNlc3RhdmEucmVwb3J0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgTmF6ZXZTb3Vib3J1OiBcInZ5c3R1cG5pc291Ym9yLnR4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiBcIjIwMTgwNVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3ouV3JpZFwiLCBwb3ouV3JpZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoYXQuc2VzdGF2YS5XcmlkXCIsIHRoYXQuc2VzdGF2YS5yZXBvcnRJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3pcIiwgcG96KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5nZW5lcmF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0SWQ6IHBvei5XcmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFN0eWxlOiBwb3ouT3V0cHV0U3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdG5vc3Q6IHBvei5wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3JQYXJhbXM6IHBveixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR0V4cG9ydERhdFN1bWFyaXphY2U6Q29udmVydFJlcG9ydFBhcmFtc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogdGhhdC5tb2RlbCxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczogeyBQbGF0bm9zdDogcG96LnBsYXRub3N0IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbilcclxuICAgICAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoZnVuY3Rpb24gKHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdSZXBvcnRHZW5lcmF0b3IucHJvZ3Jlc3NVcGRhdGUodGhhdCwgcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnQgPSBuZXcgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydERvY3VtZW50KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RvY3VtZW50LmRvd25sb2FkRG9jdW1lbnQoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0RG93bmxvYWRlclBhcmFtcyhyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG93bmxvYWQoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0RG93bmxvYWRlclBhcmFtcyhyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxcIiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJDaHlibsSbIHZ5cGxuxJtuw6kgcG9kbcOtbmt5IGV4cG9ydHVcIiwgXCJlcnJvclwiLCBcImlkLWZsYXNoLWV4cFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2VuZXJhdGVSZXBvcnQzKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGNEaXYgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIC8vIHJ1Y25pIHNwdXN0ZW5pIHZhbGlkYWNlXHJcbiAgICAgICAgICAgICRjRGl2LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY0Rpdi5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGF0Lm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjb25maXJtXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdl9wbGF0bm9zdCA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhpcy5tb2RlbC5yb2shLCBcIjAwMDBcIikudG9TdHJpbmcoKSArIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhpcy5tb2RlbC5tZXNpYyEsIFwiMDBcIikudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG96ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIE5hemV2OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFBvem5hbWthOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFJvazogdGhpcy5tb2RlbC5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVnlzdHVwOiB0aGF0LnNlc3RhdmEuUmVwb3J0TmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwUG96YWRhdmt1OiBcIjEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgSUNPOiB0aGlzLm1vZGVsLmljbyxcclxuICAgICAgICAgICAgICAgICAgICBNZXNpYzogdGhpcy5tb2RlbC5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICBNZXNpY05hemV2OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE91dHB1dFN0eWxlOiB0aGF0LnNlc3RhdmEuT3V0cHV0U3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgT3V0Q3N2OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBPdXRKc29uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBPdXRYbWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFBsYXRub3N0OiB2X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIFdyaWQ6IHRoYXQuc2VzdGF2YS5yZXBvcnRJZCxcclxuICAgICAgICAgICAgICAgICAgICBOYXpldlNvdWJvcnU6IFwidnlzdHVwbmlzb3Vib3IudHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdG5vc3Q6IFwiMjAxODA1XCJcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlQ2xhc3M6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbEFjdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlcEdlbkNhbmNlbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4udXBkYXRlKHsgY2FuY2VsbGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0b3JudWppXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuQ250ID0gdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChbR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEFzeW5jR2VuZXJhdG9yLCB7IH1dKSBhcyBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0QXN5bmNHZW5lcmF0b3JcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBnZW5DbnQub24oXCJwcm9ncmVzc1wiLCAocHJvZ3Jlc3M6IEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NPcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUy5mb3JtYXRQcm9ncmVzc01lc3NhZ2UocHJvZ3Jlc3MudGV4dCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcy5jdXJyZW50ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHByb2dyZXNzLnRvdGFsISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiBjYW5jZWxBY3RcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdlbkNudC5yZWFkeUF3YWl0LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5DbnQuZ2VuZXJhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydElkOiBwb3ouV3JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFN0eWxlOiBwb3ouT3V0cHV0U3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogcG96LnBsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yUGFyYW1zOiBwb3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR0V4cG9ydERhdFN1bWFyaXphY2U6Q29udmVydFJlcG9ydFBhcmFtc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRHRvOiB0aGF0Lm1vZGVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHsgUGxhdG5vc3Q6IHBvei5wbGF0bm9zdCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVFeHBvcnRHZW5lcmF0b3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydEdlbmVyYXRvclR5cGVBc3luYzogXCJHb3JkaWMuSW51LlNlcnZlci5HSW51RXhwb3J0R2VuZXJhdG9yLCBHb3JkaWMuSW51LlNlcnZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuSUdSZXBvcnRHZW5lcmF0ZVBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gYXMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEdlbmVyYXRlQ2FuY2VsbGF0aW9uVG9rZW4pIC8vU2Ftb3RuZSBnZW5lcm92YW5pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnQgPSBuZXcgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydERvY3VtZW50KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG93bmxvYWQoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0RG93bmxvYWRlclBhcmFtcyhyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gZ2VuQ250LmNsZWFyKHIpLnRoZW4oKCkgPT4gci5kYXRhISkgfSkgO1xyXG4gICAgICAgICAgICAgICAgfSkgLy9Va2xpZCBkYXQgbmEgc2VydmVydSArIHZyYWNlbmkgdnlzbGVka3VcclxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIH0pIC8vWmFwaXMgZG8ga29uem9sZVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoIChmdW5jdGlvbihzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuQ250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbXlQYXJhbS5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlICYmICQuaXNQbGFpbk9iamVjdChzdGF0ZSkgJiYgc3RhdGUuc3RhdGUgPT09IC0yKSB7IC8vLTIgPSBnZW5lcm92YW5pIHpydXNlbm8gdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5DbnQuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkdlbmVyb3bDoW7DrSBzZXN0YXZ5IGJ5bG8genJ1xaFlbm9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLXN0YXRlLXdhcm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlLmdlblN0YXRlICYmIHN0YXRlLmdlblN0YXRlID09PSBcImV4Y2VwdGlvblwiKSB7IHRocm93IG5ldyBHU2VydmVyRXJyb3Ioc3RhdGUuZXhjZXB0aW9uKSB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IGdlbkNudC5jbG9zZSgpOyB9KTsgICAgLy9VemF2cmVuaSBzZXJ2aXNuaWhvIGNvbnRlbnR1XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJDaHlibsSbIHZ5cGxuxJtuw6kgcG9kbcOtbmt5IGV4cG9ydHVcIiwgXCJlcnJvclwiLCBcImlkLWZsYXNoLWV4cFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0T3V0cHV0IChyZXQpIHtcclxuICAgICAgICAvLyAgICAvLy8gPHN1bW1hcnk+TmFzdGF2aSB2eXN0dXAgcG96ZGF2a3U8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgLy8vIDxwYXJhbSBuYW1lPSdyZXQnIHR5cGU9J29iamVjdCc+T2JqZWt0IHZlIHR2YXJ1OiB7IFJlcG9ydE5hemV2OiBcIlwiLCBXcmlkOiBcIlwiLCBPdXRwdXRTdHlsZTogXCJcIiB9PC9wYXJhbT5cclxuXHJcbiAgICAgICAgLy8gICAgaWYgKCFyZXQgfHwgIXJldC5XcmlkKVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vICAgIHRoaXMuZmluZEZpZWxkcyhcInZ5c3R1cFwiKS5nc3RyaW5nYm94KFwic2V0VmFsdWVcIiwgcmV0LlJlcG9ydE5hemV2KTtcclxuXHJcbiAgICAgICAgLy8gICAgLy90aGlzLnBvemFkYXZlay5XcmlkID0gcmV0LldyaWQ7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIHZhciAkbnMgPSB0aGlzLmZpbmRGaWVsZHMoXCJOYXpldlNvdWJvcnVcIik7XHJcbiAgICAgICAgLy8gICAgLy8gdmFyICRucyA9IHRoaXMuZmluZEZpZWxkcyhcIk5hemV2U291Ym9ydVwiKTtcclxuXHJcbiAgICAgICAgLy8gICAgLy9pZiAocmV0Lk91dHB1dFN0eWxlKSAvL011emUgYnl0IHByYXpkbnksIHBva3VkIG5lYnlsIHZ5YnJhbiBmb3JtYXRcclxuICAgICAgICAvLyAgICAvLyAgICB0aGlzLnBvemFkYXZlay5PdXRwdXRTdHlsZSA9IHJldC5PdXRwdXRTdHlsZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2NsZWFyT3V0cHV0ICgpIHtcclxuICAgICAgICAvLyAgICAvLy8gPHN1bW1hcnk+VnltYXplIHBvemFkb3ZhbnkgdnlzdHVwPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vICAgIHZhciBwb3ogPSB0aGlzLnBvemFkYXZlaztcclxuICAgICAgICAvLyAgICBwb3ouT3V0cHV0U3R5bGUgPSBudWxsO1xyXG4gICAgICAgIC8vICAgIHBvei5XcmlkID0gbnVsbDtcclxuICAgICAgICAvLyAgICB0aGlzLmZpbmRGaWVsZHMoXCJ2eXN0dXBcIikuZ3N0cmluZ2JveChcInNldFZhbHVlXCIsIFwiXCIpO1xyXG4gICAgICAgIC8vfTtcclxuXHJcbiAgICAgICAgbmFzdGF2X3Z5c3R1cCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGF0LmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy9pZiAoJGNEaXYuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAvLyAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgICAvLyAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY29uZmlybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdnlzdHVwX25hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLnR5cF96YXBpc3UgPT0gXCJST1pcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5c3R1cF9uYW1lID0gXCJSLVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5c3R1cF9uYW1lID0gXCJVLVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLm1lc2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlzdHVwX25hbWUgPSB2eXN0dXBfbmFtZSArICggdGhhdC5tb2RlbC5tZXNpYyA8IDEwID8gXCIwXCIgOiBcIlwiICkgKyB0aGF0Lm1vZGVsLm1lc2ljLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlzdHVwX25hbWUgPSB2eXN0dXBfbmFtZSArIFwiTU1cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2eXN0dXBfbmFtZSA9IHZ5c3R1cF9uYW1lICsgdGhhdC5tb2RlbC5saWM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwudHlwX3Z5c3R1cHU/LnRvVXBwZXJDYXNlKCkgPT0gXCJYTUxcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2eXN0dXBfbmFtZSA9IHZ5c3R1cF9uYW1lICsgXCIueG1sXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlzdHVwX25hbWUgPSB2eXN0dXBfbmFtZSArIFwiLmt4eFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcInZ5c3R1cFwiKS5nc3RyaW5nYm94KFwic2V0VmFsdWVcIiwgdnlzdHVwX25hbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59Il19