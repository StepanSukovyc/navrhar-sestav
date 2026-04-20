"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GRozborAda.js                                                        </Name>
//    <Description> GRozborAda                                                                                  </Description>
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
            let GRozborAda = class GRozborAda extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Rozbor akcí";
                    this.taskId = "actRozborAda"; // označení položky v taskListu
                    //    private nacti() {
                    //        var that = this;
                    //        that.findFields("elements").gfield("model", "collect", this.pozadavek);
                    //    }
                }
                onContentReady() {
                    var that = this;
                    var cnt = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var mainForm = $.newDiv().appendTo(this.element).gtab({
                        title: "Sestava",
                        opened: true,
                    });
                    var gcontent = new GContent(GContent.createInitializer(Gordic.Report.WebClient.GReportTreeControlTS, {
                        parentContent: this,
                        controlParams: this.sesTreeParams.ControlParams
                    }), mainForm);
                    mainForm.on({
                        "reportselected.greports": function (event, output) {
                            if (!output || !output.reportId)
                                return;
                            that.beginOperation();
                            that.wrid = output.reportId;
                            Gordic.Report.WebClient.GReportTreeControlTS.getReportInfo(output.reportId, that.sesTreeParams.ControlParams.Platnost)
                                .then(function (ri) {
                                if (ri && ri.alv)
                                    cnt.sestava = ri;
                                console.log("ri", ri.alv.TYP_ALG);
                                cnt.pozadavek = {
                                    ReportInfo: {
                                        typSestavy: 10 /* GAdaTypSestavy.Zapisova */,
                                        reportInfo: cnt.sestava
                                    }
                                };
                                let gf = cnt.getElementFormat(cnt.pozadavek);
                                if (gf) {
                                    cnt.findFields("elements")
                                        .gselectbox("destroy")
                                        .gselectbox(Gordic.Eko.Prefabs.cfuElements({
                                        name: "elements",
                                        change: function () { },
                                        gridFormat: gf,
                                        canAddNewRecords: false, //true,
                                        canRemoveRecords: false, //true,
                                        //formatElementValue: Gordic.Eko.Prefabs.formatElementValuesMultiline,
                                        createNewRecord: WebClient.GElementUtils.createNewElementFunc(cnt.ekoParams),
                                        clearRecord: WebClient.GElementUtils.createClearElementFunc(),
                                        formatElementValueOptions: { skip: WebClient.GElementUtils.getElementValueSkipColumns() },
                                        //    buttons: [
                                        //        { action: this.clearElementsAct, captionVisible: "never" },
                                        //        { action: this.newMaskaAct, captionVisible: "never" }
                                        //    ]
                                    }));
                                }
                            })
                                .always(function () { that.endOperation(); });
                        }
                    });
                    cnt.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        },
                    });
                    //cnt.actions.addRange({
                    //    actNacti: {
                    //        caption: "Načíst",
                    //        run: function () {
                    //            that.nacti();
                    //        }
                    //    },
                    //});
                    this.actions.addRange({
                        actGenerate: {
                            name: "actGenerate",
                            caption: "Generovat sestavu",
                            icon: "gi-generate",
                            run: () => {
                                var data = this.columnSelector.GetResult();
                                console.log("data", data);
                                var radekDefinice = {
                                    slova_order: "",
                                    slova_sum: "",
                                    slova_castky: "",
                                    podminky: {}
                                };
                                if (data) {
                                    if (data.dimensions) {
                                        if (data.dimensions.length > 0) {
                                            data.dimensions.forEach((r) => {
                                                radekDefinice.slova_order = radekDefinice.slova_order.concat(r.nazev).concat(",");
                                                if (r.checked) {
                                                    radekDefinice.slova_sum = radekDefinice.slova_sum.concat(r.nazev).concat(",");
                                                }
                                                else {
                                                    radekDefinice.slova_sum = radekDefinice.slova_sum.concat(",");
                                                }
                                            });
                                            if (data.dimensions.length < 6) {
                                                for (let i = data.dimensions.length, l = 6; i < l; i++) {
                                                    radekDefinice.slova_sum = radekDefinice.slova_sum.concat(",");
                                                    radekDefinice.slova_order = radekDefinice.slova_order.concat(",");
                                                }
                                            }
                                        }
                                    }
                                    if (data.measures) {
                                        if (data.measures.length > 0) {
                                            data.measures.forEach((r) => {
                                                radekDefinice.slova_castky = radekDefinice.slova_castky.concat(r.nazev.toUpperCase()).concat(",");
                                            });
                                        }
                                    }
                                }
                                radekDefinice.slova_order = radekDefinice.slova_order.concat("|");
                                radekDefinice.slova_sum = radekDefinice.slova_sum.concat("|");
                                radekDefinice.slova_castky = radekDefinice.slova_castky.concat("|");
                                var poz_elementy = {};
                                that.findFields("elements").gfield("model", "collect", poz_elementy);
                                radekDefinice.podminky = poz_elementy.elements;
                                console.log("radekDefinice", radekDefinice);
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
                                    customDto: radekDefinice,
                                    serverParameterMethod: "Gordic.Ada.WebClient.GRozborAda:ConvertReportParams",
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
                        }
                    });
                    //this.actions.addRange({
                    //    actNastavit: {
                    //        name: "actNastavit",
                    //        caption: "Nastavit",
                    //        icon: "gi-generate",
                    //        run: () => {
                    //            this.columnSelector.SetData([{ nazev: "uea", zkratka: "SU", delka: 3, checked: true }, { nazev: "uee", zkratka: "POL", delka: 6, checked: false }],
                    //                [{ nazev: "Rozpočet schválený", zkratka: "RS" }]);
                    //        }
                    //    }
                    //});
                    cnt.commandBar(this.actions.createBar(["actClose"], ["actGenerate"]));
                    //*************************************************************
                    // MenuBar
                    //*************************************************************
                    this.menuBar([
                        { action: this.actions.actGenerate, favorite: true },
                        //{ action: this.actions.actNacti,favorite: true }
                    ]);
                    //ORJ, ORG, ODPA, POL, UZ
                    //ORJ, ODPA, POL, ORG, UZ
                    //ORJ, ODPA, POL, UZ, ORG
                    //ORJ, POL, ODPA, UZ, ORG
                    //ORJ, UZ, ORG, ODPA, POL
                    //ORJ, UZ, ODPA, POL, ORG
                    //ODPA, ORG, POL, UZ, ORJ
                    //ODPA, POL, UZ, ORJ, ORG
                    //ORG, ODPA, POL, UZ, ORJ
                    //ORG, POL, ODPA, UZ, ORJ
                    //POL, ODPA, UZ, ORJ, ORG
                    //UZ, POL, ODPA, ORJ, ORG
                    var pred_vystupy = [
                        {
                            id: "01",
                            value: "ORJ, ORG, ODPA, POL, UZ - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te0", checked: true },
                                { nazev: "te1", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ueg", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "02",
                            value: "ORJ, ODPA, POL, UZ, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te0", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "03",
                            value: "ORJ, POL, ODPA, UZ, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te0", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "04",
                            value: "ORJ, UZ, ORG, ODPA, POL - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te0", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te1", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "05",
                            value: "ORJ, UZ, ODPA, POL, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te0", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "06",
                            value: "ODPA, ORG, POL, UZ, ORJ - RS, RU, SK",
                            definice_sl: [
                                { nazev: "ued", checked: true },
                                { nazev: "te1", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te0", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "07",
                            value: "ODPA, POL, UZ, ORJ, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te0", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "08",
                            value: "ORG, POL, ODPA, UZ, ORJ - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te1", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te0", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "09",
                            value: "POL, ODPA, UZ, ORJ, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "uee", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te0", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "10",
                            value: "UZ, POL, ODPA, ORJ, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "ueg", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "te0", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "11",
                            value: "ORG, ODPA, POL, UZ, ORJ - RS, RU, SK",
                            definice_sl: [
                                { nazev: "te1", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "ueg", checked: true },
                                { nazev: "te0", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                        {
                            id: "12",
                            value: "UZ, ODPA, POL, ORJ, ORG - RS, RU, SK",
                            definice_sl: [
                                { nazev: "ueg", checked: true },
                                { nazev: "ued", checked: true },
                                { nazev: "uee", checked: true },
                                { nazev: "te0", checked: true },
                                { nazev: "te1", checked: true },
                            ],
                            definice_cast: [
                                { nazev: "rs", zkratka: "RS" },
                                { nazev: "ru", zkratka: "RU" },
                                { nazev: "sk", zkratka: "SK" },
                            ]
                        },
                    ];
                    var contentDiv2 = $.newDiv().appendTo(this.element);
                    contentDiv2.gtab({
                        title: "Předdefinované výstupy",
                        opened: true,
                    });
                    var seznamForm = new Gordic.Forms.Form({ name: "seznamForm", layoutDescriptor: "L1M1S1 LMS-0-12-0" });
                    seznamForm
                        .addRow("Formáty").addField("gselectbox", {
                        list: true,
                        multi: false,
                        itemWidth: "w-2",
                        name: "vyber",
                        itemTemplate: "{value}",
                        data: pred_vystupy,
                        change: function (ev, changeObj) {
                            if (changeObj.value) {
                                cnt.columnSelector.SetData(changeObj.value.definice_sl, changeObj.value.definice_cast);
                            }
                        }
                    });
                    contentDiv2.gform("createFrom", seznamForm);
                    var contentDiv3 = $.newDiv().appendTo(this.element);
                    contentDiv3.gtab({
                        title: "Filtry",
                        opened: true,
                    });
                    var filtryForm = new Gordic.Forms.Form({ name: "filtryForm", layoutDescriptor: "L1M1S1 LMS-0-12-0" });
                    filtryForm
                        .addRow("Filtry")
                        .addField("gselectbox", {
                        name: "elements",
                        disabled: true
                    });
                    contentDiv3.gform("createFrom", filtryForm);
                    var contentDiv = $.newDiv().appendTo(this.element);
                    var gcontent = new GContent({
                        className: "Gordic.Eko.WebClient.GColumnSelector",
                        parentContent: this
                    }, contentDiv);
                    contentDiv.gtab({
                        title: "Výstup",
                        opened: true,
                    });
                    this.columnSelector = contentDiv.gcontent();
                    this.columnSelector.selectedDimensionsMaxCount = 6;
                    this.columnSelector.selectedMeasuresMaxCount = 7;
                    //this.columnSelector.additionalDimensions = [{ nazev: "dim1", zkratka: "DIM1", delka: 4 }, { nazev: "dim2", zkratka: "DIM2", delka: 10 }, { nazev: "dim3", zkratka: "DIM3", delka: 2 }];
                    //this.columnSelector.additionalMeasures = [{ nazev: "castka1", zkratka: "MC1" }, { nazev: "castka2", zkratka: "MC2" }, { nazev: "castka3", zkratka: "MC3" }];
                    this.columnSelector.additionalMeasures = [
                        { nazev: "SK%RU", zkratka: "SK%RU" },
                        { nazev: "SK-RU", zkratka: "SK-RU" },
                        { nazev: "SK%RS", zkratka: "SK%RS" },
                        { nazev: "SK-RS", zkratka: "SK-RS" },
                    ];
                }
                getElementFormat(poz) {
                    let typSestavy = poz.ReportInfo && poz.ReportInfo.typSestavy ? poz.ReportInfo.typSestavy : null;
                    if (!typSestavy)
                        return null;
                    var cfuSet = Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, {
                        isRoz: true, //Tak to je v konstruktoru Gordic.Ucr.WinClient.GGenerovaniSestavyControl
                        isUct: true, //Tak to je v konstruktoru Gordic.Ucr.WinClient.GGenerovaniSestavyControl
                        ixsRoz: undefined //this.ekoParams.IxsRoz || undefined
                    });
                    this.filterParams = {
                        typUlohy: 3 /* GProhlizeniUctTaskType.UcetnictviZapis */,
                        showUct: true,
                        showRoz: true,
                        showOst: false,
                        prizIissp: false,
                        rozOnly: false,
                        uctOnly: false,
                        ixsRoz: ""
                    };
                    var gf = WebClient.GElementUtils.createElementsGridFormat({
                        typSestavy: typSestavy,
                        filterOptions: {}, //this.filterOptions,
                        filterParams: this.filterParams,
                        globals: this.globals,
                        cfuSet: cfuSet,
                        ekoParams: this.ekoParams
                    });
                    return gf;
                }
            };
            GRozborAda = __decorate([
                gcontent
            ], GRozborAda);
            WebClient.GRozborAda = GRozborAda;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvemJvckFkYS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HUm96Ym9yQWRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBOGtCZjtBQTlrQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOGtCbkI7SUE5a0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4a0I3QjtRQTlrQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBQTVDOztvQkFrQkksVUFBSyxHQUFHLGFBQWEsQ0FBQztvQkFDdEIsV0FBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLCtCQUErQjtvQkFpakI1RCx1QkFBdUI7b0JBQ3ZCLDBCQUEwQjtvQkFFMUIsaUZBQWlGO29CQUNqRixPQUFPO2dCQUNQLENBQUM7Z0JBcGpCRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ2xELEtBQUssRUFBRSxTQUFTO3dCQUNoQixNQUFNLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7b0JBRUgsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFD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QUR0QixRQUFRO2VBQ0ksVUFBVSxDQXlrQnRCO1lBemtCWSxvQkFBVSxhQXlrQnRCLENBQUE7UUFDTCxDQUFDLEVBOWtCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOGtCN0I7SUFBRCxDQUFDLEVBOWtCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOGtCbkI7QUFBRCxDQUFDLEVBOWtCUyxNQUFNLEtBQU4sTUFBTSxRQThrQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR1JvemJvckFkYS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdSb3pib3JBZGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb3pib3JBZGEgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIHBvemFkYXZlazogR29yZGljLkFkYS5XZWJDbGllbnQuR0FkYVBvemFkYXZla0RldGFpbER0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXNUcmVlUGFyYW1zO1xyXG4gICAgICAgIHByaXZhdGUgc2VzdGF2YTogUmVwb3J0LkludGVyZmFjZS5HUmVwb3J0SW5mb0R0bztcclxuICAgICAgICBwcml2YXRlIHdyaWQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbHVtblNlbGVjdG9yOiBHb3JkaWMuRWtvLldlYkNsaWVudC5HQ29sdW1uU2VsZWN0b3I7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpbHRlclBhcmFtczogR29yZGljLkFkYS5XZWJDbGllbnQuR0ZpbHRlclBhcmFtc0R0bztcclxuICAgICAgICBwcml2YXRlIGVrb1BhcmFtczogR29yZGljLkFkYS5XZWJDbGllbnQuR0Vrb1BhcmFtc0R0bztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGZpbHRlck9wdGlvbnM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlJvemJvciBha2PDrVwiO1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0Um96Ym9yQWRhXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJTZXN0YXZhXCIsXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdjb250ZW50ID0gbmV3IEdDb250ZW50KEdDb250ZW50LmNyZWF0ZUluaXRpYWxpemVyKFxyXG4gICAgICAgICAgICAgICAgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sUGFyYW1zOiB0aGlzLnNlc1RyZWVQYXJhbXMuQ29udHJvbFBhcmFtc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLCBtYWluRm9ybSlcclxuXHJcbiAgICAgICAgICAgIG1haW5Gb3JtLm9uKHtcclxuICAgICAgICAgICAgICAgIFwicmVwb3J0c2VsZWN0ZWQuZ3JlcG9ydHNcIjogZnVuY3Rpb24gKGV2ZW50LCBvdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW91dHB1dCB8fCAhb3V0cHV0LnJlcG9ydElkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndyaWQgPSBvdXRwdXQucmVwb3J0SWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLmdldFJlcG9ydEluZm8ob3V0cHV0LnJlcG9ydElkLCB0aGF0LnNlc1RyZWVQYXJhbXMuQ29udHJvbFBhcmFtcy5QbGF0bm9zdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmkgJiYgcmkuYWx2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5zZXN0YXZhID0gcmk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyaVwiLCByaS5hbHYhLlRZUF9BTEcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5wb3phZGF2ZWsgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0SW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBTZXN0YXZ5OiBHQWRhVHlwU2VzdGF2eS5aYXBpc292YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW5mbzogY250LnNlc3RhdmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdmID0gY250LmdldEVsZW1lbnRGb3JtYXQoY250LnBvemFkYXZlayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdmKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5maW5kRmllbGRzKFwiZWxlbWVudHNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdzZWxlY3Rib3goXCJkZXN0cm95XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nc2VsZWN0Ym94KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5QcmVmYWJzLmNmdUVsZW1lbnRzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVsZW1lbnRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuQWRkTmV3UmVjb3JkczogZmFsc2UsIC8vdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5SZW1vdmVSZWNvcmRzOiBmYWxzZSwgLy90cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0RWxlbWVudFZhbHVlOiBHb3JkaWMuRWtvLlByZWZhYnMuZm9ybWF0RWxlbWVudFZhbHVlc011bHRpbGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVOZXdSZWNvcmQ6IEdFbGVtZW50VXRpbHMuY3JlYXRlTmV3RWxlbWVudEZ1bmMoY250LmVrb1BhcmFtcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJSZWNvcmQ6IEdFbGVtZW50VXRpbHMuY3JlYXRlQ2xlYXJFbGVtZW50RnVuYygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdEVsZW1lbnRWYWx1ZU9wdGlvbnM6IHsgc2tpcDogR0VsZW1lbnRVdGlscy5nZXRFbGVtZW50VmFsdWVTa2lwQ29sdW1ucygpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckVsZW1lbnRzQWN0LCBjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHsgYWN0aW9uOiB0aGlzLm5ld01hc2thQWN0LCBjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2NudC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgLy8gICAgYWN0TmFjdGk6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiTmHEjcOtc3RcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQubmFjdGkoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RHZW5lcmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R2VuZXJhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkdlbmVyb3ZhdCBzZXN0YXZ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZW5lcmF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuY29sdW1uU2VsZWN0b3IuR2V0UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRla0RlZmluaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG92YV9vcmRlcjogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdmFfc3VtOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG92YV9jYXN0a3k6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZG1pbmt5OiBhbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3ZhX29yZGVyOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdmFfc3VtOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdmFfY2FzdGt5OiBcIlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZG1pbmt5OiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRpbWVuc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kaW1lbnNpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kaW1lbnNpb25zLmZvckVhY2goKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrRGVmaW5pY2Uuc2xvdmFfb3JkZXIgPSByYWRla0RlZmluaWNlLnNsb3ZhX29yZGVyLmNvbmNhdChyLm5hemV2ISkuY29uY2F0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla0RlZmluaWNlLnNsb3ZhX3N1bSA9IHJhZGVrRGVmaW5pY2Uuc2xvdmFfc3VtLmNvbmNhdChyLm5hemV2ISkuY29uY2F0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrRGVmaW5pY2Uuc2xvdmFfc3VtID0gcmFkZWtEZWZpbmljZS5zbG92YV9zdW0uY29uY2F0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRpbWVuc2lvbnMubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGRhdGEuZGltZW5zaW9ucy5sZW5ndGgsIGwgPSA2OyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtEZWZpbmljZS5zbG92YV9zdW0gPSByYWRla0RlZmluaWNlLnNsb3ZhX3N1bS5jb25jYXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrRGVmaW5pY2Uuc2xvdmFfb3JkZXIgPSByYWRla0RlZmluaWNlLnNsb3ZhX29yZGVyLmNvbmNhdChcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZWFzdXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lYXN1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tZWFzdXJlcy5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla0RlZmluaWNlLnNsb3ZhX2Nhc3RreSA9IHJhZGVrRGVmaW5pY2Uuc2xvdmFfY2FzdGt5LmNvbmNhdChyLm5hemV2IS50b1VwcGVyQ2FzZSgpKS5jb25jYXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtEZWZpbmljZS5zbG92YV9vcmRlciA9IHJhZGVrRGVmaW5pY2Uuc2xvdmFfb3JkZXIuY29uY2F0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtEZWZpbmljZS5zbG92YV9zdW0gPSByYWRla0RlZmluaWNlLnNsb3ZhX3N1bS5jb25jYXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRla0RlZmluaWNlLnNsb3ZhX2Nhc3RreSA9IHJhZGVrRGVmaW5pY2Uuc2xvdmFfY2FzdGt5LmNvbmNhdChcInxcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG96X2VsZW1lbnR5OiBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRhUG96YWRhdmVrRGV0YWlsRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImVsZW1lbnRzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBwb3pfZWxlbWVudHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRla0RlZmluaWNlLnBvZG1pbmt5ID0gcG96X2VsZW1lbnR5LmVsZW1lbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyYWRla0RlZmluaWNlXCIsIHJhZGVrRGVmaW5pY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbmNlbGxhdGlvblRva2VuID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2N1cnJHZW5lcmF0aW5nRGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdlbmVyYXRvcjogUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0R2VuZXJhdG9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yID0gbmV3IFJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEdlbmVyYXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5PZHQuV2ViQ2xpZW50LkdPZHRQb3phZGF2ZWtHZW5lcmF0b3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRUb0FzeW5jOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0R2VuZXJhdG9yLnByb2dyZXNzQmVnaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVwR2VuQ2FuY2VsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybnVqaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYXRub3N0ID0gdGhhdC5zZXNUcmVlUGFyYW1zLkNvbnRyb2xQYXJhbXMuUGxhdG5vc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3IuZ2VuZXJhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SWQ6IHRoYXQud3JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFN0eWxlOiB0aGF0LnNlc3RhdmEuYWx2IS5PdXRwdXRTdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiBwbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogcmFkZWtEZWZpbmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HUm96Ym9yQWRhOkNvbnZlcnRSZXBvcnRQYXJhbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGdlbmVyYXRvclBhcmFtczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxhdG5vc3Q6IHBsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb2dyZXNzKGZ1bmN0aW9uIChwcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydEdlbmVyYXRvci5wcm9ncmVzc1VwZGF0ZSh0aGF0LCBwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudCA9IG5ldyBSZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnREb2N1bWVudCh0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG93bmxvYWREb2N1bWVudChHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUy5nZXREb3dubG9hZGVyUGFyYW1zKHJlcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL05PVEU6IERlbGEgcHJvYmxlbSBuYSBJRSAtIGFjdGl2ZVggaG8gbG9rYWxuZSB2eXR2b3JpIHBvZCBqaW55bSBuYXp2ZW0gbmV6IGplIHBvemFkb3ZhbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RvY3VtZW50LmRvd25sb2FkRG9jdW1lbnQoR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuZ2V0RG93bmxvYWRPbmx5UGFyYW1zKHJlcy5pZCkpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50ID0gbmV3IFJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydERvY3VtZW50KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb3dubG9hZERvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvd25sb2FkZXJUeXBlOiBcIkdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LlJlcG9ydGVyLlNpbmdsZVBhZ2UuQ29tbW9uLkdSZXBvcnREb3dubG9hZGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRvRG93bmxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDdXN0b21EYXRhOiB7IFwiaWRcIjogc3RhdGUuaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUgJiYgJC5pc1BsYWluT2JqZWN0KHN0YXRlKSAmJiBzdGF0ZS5zdGF0ZSA9PT0gLTIpIHsgLy8tMiA9IGdlbmVyb3ZhbmkgenJ1c2VubyB1eml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkdlbmVyb3bDoW7DrSBzZXN0YXZ5IGJ5bG8genJ1xaFlbm8gdcW+aXZhdGVsZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtd2FybmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jdXJyR2VuZXJhdGluZ0RlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgLy8gICAgYWN0TmFzdGF2aXQ6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiYWN0TmFzdGF2aXRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiTmFzdGF2aXRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGljb246IFwiZ2ktZ2VuZXJhdGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3IuU2V0RGF0YShbeyBuYXpldjogXCJ1ZWFcIiwgemtyYXRrYTogXCJTVVwiLCBkZWxrYTogMywgY2hlY2tlZDogdHJ1ZSB9LCB7IG5hemV2OiBcInVlZVwiLCB6a3JhdGthOiBcIlBPTFwiLCBkZWxrYTogNiwgY2hlY2tlZDogZmFsc2UgfV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIFt7IG5hemV2OiBcIlJvenBvxI1ldCBzY2h2w6FsZW7DvVwiLCB6a3JhdGthOiBcIlJTXCIgfV0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgY250LmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZVwiXSwgW1wiYWN0R2VuZXJhdGVcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyBNZW51QmFyXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RHZW5lcmF0ZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE5hY3RpLGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL09SSiwgT1JHLCBPRFBBLCBQT0wsIFVaXHJcbiAgICAgICAgICAgIC8vT1JKLCBPRFBBLCBQT0wsIE9SRywgVVpcclxuICAgICAgICAgICAgLy9PUkosIE9EUEEsIFBPTCwgVVosIE9SR1xyXG4gICAgICAgICAgICAvL09SSiwgUE9MLCBPRFBBLCBVWiwgT1JHXHJcbiAgICAgICAgICAgIC8vT1JKLCBVWiwgT1JHLCBPRFBBLCBQT0xcclxuICAgICAgICAgICAgLy9PUkosIFVaLCBPRFBBLCBQT0wsIE9SR1xyXG4gICAgICAgICAgICAvL09EUEEsIE9SRywgUE9MLCBVWiwgT1JKXHJcbiAgICAgICAgICAgIC8vT0RQQSwgUE9MLCBVWiwgT1JKLCBPUkdcclxuICAgICAgICAgICAgLy9PUkcsIE9EUEEsIFBPTCwgVVosIE9SSlxyXG4gICAgICAgICAgICAvL09SRywgUE9MLCBPRFBBLCBVWiwgT1JKXHJcbiAgICAgICAgICAgIC8vUE9MLCBPRFBBLCBVWiwgT1JKLCBPUkdcclxuICAgICAgICAgICAgLy9VWiwgUE9MLCBPRFBBLCBPUkosIE9SR1xyXG5cclxuICAgICAgICAgICAgdmFyIHByZWRfdnlzdHVweSA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCIwMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9SSiwgT1JHLCBPRFBBLCBQT0wsIFVaIC0gUlMsIFJVLCBTS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX3NsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUwXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ0ZTFcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVlXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWdcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2VfY2FzdDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJzXCIsIHprcmF0a2E6IFwiUlNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJ1XCIsIHprcmF0a2E6IFwiUlVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInNrXCIsIHprcmF0a2E6IFwiU0tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiMDJcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPUkosIE9EUEEsIFBPTCwgVVosIE9SRyAtIFJTLCBSVSwgU0tcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9zbDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVkXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWVcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZ1wiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUxXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX2Nhc3Q6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJyc1wiLCB6a3JhdGthOiBcIlJTXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJydVwiLCB6a3JhdGthOiBcIlJVXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJza1wiLCB6a3JhdGthOiBcIlNLXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjAzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT1JKLCBQT0wsIE9EUEEsIFVaLCBPUkcgLSBSUywgUlUsIFNLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2Vfc2w6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ0ZTBcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVkXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWdcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9jYXN0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnNcIiwgemtyYXRrYTogXCJSU1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnVcIiwgemtyYXRrYTogXCJSVVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwic2tcIiwgemtyYXRrYTogXCJTS1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCIwNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9SSiwgVVosIE9SRywgT0RQQSwgUE9MIC0gUlMsIFJVLCBTS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX3NsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUwXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWdcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVkXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWVcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2VfY2FzdDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJzXCIsIHprcmF0a2E6IFwiUlNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJ1XCIsIHprcmF0a2E6IFwiUlVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInNrXCIsIHprcmF0a2E6IFwiU0tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiMDVcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPUkosIFVaLCBPRFBBLCBQT0wsIE9SRyAtIFJTLCBSVSwgU0tcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9zbDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVnXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWRcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUxXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX2Nhc3Q6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJyc1wiLCB6a3JhdGthOiBcIlJTXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJydVwiLCB6a3JhdGthOiBcIlJVXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJza1wiLCB6a3JhdGthOiBcIlNLXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjA2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0RQQSwgT1JHLCBQT0wsIFVaLCBPUkogLSBSUywgUlUsIFNLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2Vfc2w6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWRcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVlXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWdcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9jYXN0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnNcIiwgemtyYXRrYTogXCJSU1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnVcIiwgemtyYXRrYTogXCJSVVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwic2tcIiwgemtyYXRrYTogXCJTS1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCIwN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9EUEEsIFBPTCwgVVosIE9SSiwgT1JHIC0gUlMsIFJVLCBTS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX3NsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVkXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWVcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZ1wiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUwXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ0ZTFcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2VfY2FzdDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJzXCIsIHprcmF0a2E6IFwiUlNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJ1XCIsIHprcmF0a2E6IFwiUlVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInNrXCIsIHprcmF0a2E6IFwiU0tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiMDhcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPUkcsIFBPTCwgT0RQQSwgVVosIE9SSiAtIFJTLCBSVSwgU0tcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9zbDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVlXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWRcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZ1wiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUwXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX2Nhc3Q6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJyc1wiLCB6a3JhdGthOiBcIlJTXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJydVwiLCB6a3JhdGthOiBcIlJVXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJza1wiLCB6a3JhdGthOiBcIlNLXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjA5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiUE9MLCBPRFBBLCBVWiwgT1JKLCBPUkcgLSBSUywgUlUsIFNLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2Vfc2w6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWVcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVnXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ0ZTBcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9jYXN0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnNcIiwgemtyYXRrYTogXCJSU1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnVcIiwgemtyYXRrYTogXCJSVVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwic2tcIiwgemtyYXRrYTogXCJTS1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCIxMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlVaLCBQT0wsIE9EUEEsIE9SSiwgT1JHIC0gUlMsIFJVLCBTS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX3NsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVnXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWVcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUwXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ0ZTFcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2VfY2FzdDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJzXCIsIHprcmF0a2E6IFwiUlNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInJ1XCIsIHprcmF0a2E6IFwiUlVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInNrXCIsIHprcmF0a2E6IFwiU0tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiMTFcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPUkcsIE9EUEEsIFBPTCwgVVosIE9SSiAtIFJTLCBSVSwgU0tcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9zbDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVkXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWVcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZ1wiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidGUwXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaWNlX2Nhc3Q6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJyc1wiLCB6a3JhdGthOiBcIlJTXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJydVwiLCB6a3JhdGthOiBcIlJVXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJza1wiLCB6a3JhdGthOiBcIlNLXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiVVosIE9EUEEsIFBPTCwgT1JKLCBPUkcgLSBSUywgUlUsIFNLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pY2Vfc2w6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ1ZWdcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInVlZFwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwidWVlXCIsIGNoZWNrZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJ0ZTBcIiwgY2hlY2tlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcInRlMVwiLCBjaGVja2VkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmljZV9jYXN0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnNcIiwgemtyYXRrYTogXCJSU1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwicnVcIiwgemtyYXRrYTogXCJSVVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwic2tcIiwgemtyYXRrYTogXCJTS1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZW50RGl2MiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgY29udGVudERpdjIuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJQxZllZGRlZmlub3ZhbsOpIHbDvXN0dXB5XCIsXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlem5hbUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInNlem5hbUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pXHJcblxyXG4gICAgICAgICAgICBzZXpuYW1Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRm9ybcOhdHlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJ3LTJcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5YmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt2YWx1ZX1cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBwcmVkX3Z5c3R1cHksIFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmNvbHVtblNlbGVjdG9yLlNldERhdGEoY2hhbmdlT2JqLnZhbHVlLmRlZmluaWNlX3NsLCBjaGFuZ2VPYmoudmFsdWUuZGVmaW5pY2VfY2FzdCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnREaXYyLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBzZXpuYW1Gb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZW50RGl2MyA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgY29udGVudERpdjMuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJGaWx0cnlcIixcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdHJ5Rm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZmlsdHJ5Rm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgZmlsdHJ5Rm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkZpbHRyeVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbGVtZW50c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICAgICAgY29udGVudERpdjMuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZpbHRyeUZvcm0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGVudERpdiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnY29udGVudCA9IG5ldyBHQ29udGVudCh7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiR29yZGljLkVrby5XZWJDbGllbnQuR0NvbHVtblNlbGVjdG9yXCIsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzXHJcbiAgICAgICAgICAgIH0sIGNvbnRlbnREaXYpXHJcblxyXG5cclxuICAgICAgICAgICAgY29udGVudERpdi5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zdHVwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbHVtblNlbGVjdG9yID0gY29udGVudERpdi5nY29udGVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtblNlbGVjdG9yLnNlbGVjdGVkRGltZW5zaW9uc01heENvdW50ID0gNjtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5TZWxlY3Rvci5zZWxlY3RlZE1lYXN1cmVzTWF4Q291bnQgPSA3O1xyXG4gICAgICAgICAgICAvL3RoaXMuY29sdW1uU2VsZWN0b3IuYWRkaXRpb25hbERpbWVuc2lvbnMgPSBbeyBuYXpldjogXCJkaW0xXCIsIHprcmF0a2E6IFwiRElNMVwiLCBkZWxrYTogNCB9LCB7IG5hemV2OiBcImRpbTJcIiwgemtyYXRrYTogXCJESU0yXCIsIGRlbGthOiAxMCB9LCB7IG5hemV2OiBcImRpbTNcIiwgemtyYXRrYTogXCJESU0zXCIsIGRlbGthOiAyIH1dO1xyXG4gICAgICAgICAgICAvL3RoaXMuY29sdW1uU2VsZWN0b3IuYWRkaXRpb25hbE1lYXN1cmVzID0gW3sgbmF6ZXY6IFwiY2FzdGthMVwiLCB6a3JhdGthOiBcIk1DMVwiIH0sIHsgbmF6ZXY6IFwiY2FzdGthMlwiLCB6a3JhdGthOiBcIk1DMlwiIH0sIHsgbmF6ZXY6IFwiY2FzdGthM1wiLCB6a3JhdGthOiBcIk1DM1wiIH1dO1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtblNlbGVjdG9yLmFkZGl0aW9uYWxNZWFzdXJlcyA9IFtcclxuICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiU0slUlVcIiwgemtyYXRrYTogXCJTSyVSVVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hemV2OiBcIlNLLVJVXCIsIHprcmF0a2E6IFwiU0stUlVcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBuYXpldjogXCJTSyVSU1wiLCB6a3JhdGthOiBcIlNLJVJTXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiU0stUlNcIiwgemtyYXRrYTogXCJTSy1SU1wiIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEVsZW1lbnRGb3JtYXQocG96OiBHQWRhUG96YWRhdmVrRGV0YWlsRHRvKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0FkYUZpbHRlckR0bz4gfCBudWxsIHtcclxuICAgICAgICAgICAgbGV0IHR5cFNlc3RhdnkgPSBwb3ouUmVwb3J0SW5mbyAmJiBwb3ouUmVwb3J0SW5mby50eXBTZXN0YXZ5ID8gcG96LlJlcG9ydEluZm8udHlwU2VzdGF2eSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghdHlwU2VzdGF2eSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2Z1U2V0ID0gR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRoaXMsIHtcclxuICAgICAgICAgICAgICAgIGlzUm96OiB0cnVlLCAvL1RhayB0byBqZSB2IGtvbnN0cnVrdG9ydSBHb3JkaWMuVWNyLldpbkNsaWVudC5HR2VuZXJvdmFuaVNlc3RhdnlDb250cm9sXHJcbiAgICAgICAgICAgICAgICBpc1VjdDogdHJ1ZSwgLy9UYWsgdG8gamUgdiBrb25zdHJ1a3RvcnUgR29yZGljLlVjci5XaW5DbGllbnQuR0dlbmVyb3ZhbmlTZXN0YXZ5Q29udHJvbFxyXG4gICAgICAgICAgICAgICAgaXhzUm96OiB1bmRlZmluZWQgLy90aGlzLmVrb1BhcmFtcy5JeHNSb3ogfHwgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBVbG9oeTogR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXMsXHJcbiAgICAgICAgICAgICAgICBzaG93VWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd1JvejogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dPc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcHJpeklpc3NwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJvek9ubHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdWN0T25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgaXhzUm96OiBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2YgPSBHRWxlbWVudFV0aWxzLmNyZWF0ZUVsZW1lbnRzR3JpZEZvcm1hdCh7XHJcbiAgICAgICAgICAgICAgICB0eXBTZXN0YXZ5OiB0eXBTZXN0YXZ5LFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyT3B0aW9uczoge30sIC8vdGhpcy5maWx0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyUGFyYW1zOiB0aGlzLmZpbHRlclBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHRoaXMuZ2xvYmFscyxcclxuICAgICAgICAgICAgICAgIGNmdVNldDogY2Z1U2V0LFxyXG4gICAgICAgICAgICAgICAgZWtvUGFyYW1zOiB0aGlzLmVrb1BhcmFtc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvLyAgICBwcml2YXRlIG5hY3RpKCkge1xyXG4gICAgLy8gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAvLyAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZWxlbWVudHNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMucG96YWRhdmVrKTtcclxuICAgIC8vICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=