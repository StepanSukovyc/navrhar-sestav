(function () {
    "use strict";

    var defaultReportParams = {
        X0000: "",
        X0001: "",
        X0002: "",
        X0003: "",
        X0004: "",
        X0005: "",
        X0006: "",
        X0007: "",
        X0008: "",
        X0009: ""
    };

    var defaults = {
        //name: "jsPrintAct",   //povinne!
        caption: "jres:116",    //volitelne?
        title: undefined,       //volitelne? (string)
        icon: "gi-print",       //volitelne?
        id: "reportTreeCtl#",   //volitelne
        width: 800,             //volitelne
        height: 500,            //volitelne
        tema: "",               //povinne!
        ixsStr: "",             //volitelne - id stromu
        platnost: "",           //volitelne?
        parentContent: null,    //volitelne - gcontent, ktery otevira okno sestav.
        fullScreen: false,      //volitelne - gcontent se otevre pres celou pracovni plochu (funguje jen v pripade, ze je vyplnen parentContent)
        schedulingDisabled: false, //zakaze odlozene zpracovani (default true)
        serverRestrictionAlfMethod: null, //pro restrikci alf pred otevrenim stromu sestav a pred generovanim,
        serverRestrictionAlvMethod: null, //pro restrikci alv pred otevrenim stromu sestav,
        serverParameterMethod: null,    //pro parametry tesne pred generovani - na vstupu by melo mit IGReport
        gfrmOptions: null,              //options pro gfrm: { serverClass: "", clientClass: "", init: function(cnt) {} }
        reportId: "",                   //Id reportu (WRID), ktere ma byt predvybrane po otevreni stromu sestav
        selectReportOnly: false,        //volitelne - pouze vybere sestavu bez generovani
        showJustOneReport: false,       //volitelne - pokud je strom sestav v rezimu vyberu a je tam jen jedna sestava, pak se standardne vybere a okno zavre. Timhle ho lze nechat otevrene.
        preselectVisible: true,         //volitelne - V TK: 'Povoluje viditelnost možnosti přednastavení sestavy'. Pokud si uzivatel zaskrtne dany checkbox, pak se sestava v danem tematu vzdy vybere a rovnou vygeneruje.
        keepOpen: false,                //po vygenerovani sestavy a celkovem ukonceni workflow necha otevrene okno stromu sestav
        initFavorites: undefined,       //po otevreni stromu sestav je preferovane zobrazeni oblibenych polozek (default = true)
        initFolders: undefined,         //po otevreni stromu sestav zobrazovat slozky (pozor! pri otevreni funguje jen s initFavorites: false, default = true)
        reportParams: $.extend({}, defaultReportParams), //parametry X0000 az X0009
        customDto: null,        //volitelne - customDto pro metody serverRestrictionAlfMethod, serverRestrictionAlvMethod, serverParameterMethod
        _customDto: null,       //interni dto (pro pripad, kdy customDto je funkce)
        loadData: false,        //nacte data z generovane sestavy
        reportGeneratorType: "Gordic.Report.WebClient.Reporter.SinglePage.Common.GReportGenerator",
        reportGeneratorTypeAsync: null,   //Typ generatoru pro generovani v asynchronni uloze (trida odvozena od Gordic.Report.Server.GReportGenerateAl)
        reportGeneratorParams: null,      //parametry (DTO) pro rizeni generatoru
        dialogOpening: $.noop,            //okno stromu sestav se otevira
        dialogClosed: $.noop,             //okno stromu sestav bylo zavreno
        getReportSigner: null,            //function (): SignerBase | null { },               //SignerBase - objekt pro podepsani reportu
        actionContext: undefined,         //actionContext z run akce
        async: undefined,                 //generovani pres async. ulohu (boolean) !!!Uz se nepouziva!!!
        workflowType: undefined,          //window|notifications, default = window
        reportStarting: function(rep) {
            /// <summary>Metoda volana po klepnuti na tlacitko generovat</summary>
            /// <param name='rep' type='Object'>
            /// <para>rep.params,//X0000 az X00009, k uprave</para>
            /// <para>rep.customDto,//cokoliv, k uprave</para>
            /// <para>rep.tema,//readonly</para>
            /// <para>rep.reportId//readonly id reportu</para>
            /// </param>
            /// <returns type='Object'>
            /// Muze vracet undefined, nebo promise(), po jehoz resolve() se spusti generovani (a reject zrusi) nebo false, ktere generovani zrusi
            /// </returns>
            //console.log("GPrintAction.reportStarting() default", params, tema, reportId);
        },
        reportSelected: $.noop,    //report byl vybran
        reportGenerated: $.noop,   //report byl vygenerovan
        reportFinished: $.noop,    //dokument byl stazen, dokument byl stazen, podepsan, orazitkovan a poslan zpet, apod...proste konec workflow
        reportCancelled: $.noop,   //generovani dokumentu bylo zruseno uzivatelem
        reportScheduled: $.noop,   //report byl zarazen do odlozeneho zpracovani
        reportFormDataCollected: $.noop, //pro gfrm - data z formulare: extend repInfo + { formData: {} }
        getReportTreeControlParams: function () {
            var dto = {};
            dto.ReportGeneratorType = this.reportGeneratorType;
            dto.ReportGeneratorTypeAsync = this.reportGeneratorTypeAsync;
            dto.Platnost = this.platnost;
            dto.Tema = this.tema;
            dto.IxsStr = this.ixsStr;
            dto.SelectReportOnly = this.selectReportOnly;
            dto.Platnost = this.platnost;
            dto.SchedulingDisabled = this.schedulingDisabled;
            dto.CustomDto = this._customDto = this.customDto;
            dto.KeepOpen = this.keepOpen;
            dto.LoadFavoritesOnly = this.initFavorites;
            dto.ShowFolders = this.initFolders;
            dto.ReportId = this.reportId;
            dto.ShowJustOneReport = this.showJustOneReport;
            dto.PreselectVisible = this.preselectVisible;
            dto.Title = this.title;
            dto.Async = typeof this.async !== "undefined" ? this.async : true;
            dto.WorkflowType = this.workflowType;

            if (this.serverRestrictionAlfMethod)
                dto.ServerRestrictionAlfMethod = this.serverRestrictionAlfMethod;

            if (this.serverRestrictionAlvMethod)
                dto.ServerRestrictionAlvMethod = this.serverRestrictionAlvMethod;

            if (this.serverParameterMethod)
                dto.ServerParameterMethod = this.serverParameterMethod;

            if ($.isFunction(this.customDto))
                dto.CustomDto = this._customDto = this.customDto(); //NOTE: Mozna bude v budoucnu nutne osetrit pripad, kdy funkce vrati promise?
            
            return dto;
        },
        run: function (ev, ctx) {
            //console.log("GPrintAction.run()", this);
            var dialogOpeningPromise = $.Deferred().resolve().promise();
            var that = this;
            var shiftKey = ctx && typeof ctx.shiftKey === "boolean" ? ctx.shiftKey : ev.shiftKey;

            this.actionContext = ctx;

            if (this.dialogOpening !== $.noop) {
                var diOpeningRes = this.dialogOpening.call(this, this);
                if (diOpeningRes && $.isFunction(diOpeningRes.then))
                    dialogOpeningPromise = diOpeningRes;
                else if (diOpeningRes === false)
                    dialogOpeningPromise = $.Deferred().reject().promise();
            }
            
            dialogOpeningPromise.then(function () {
                var dto = that.getReportTreeControlParams();
                dto.ShiftKeyPressed = shiftKey;

                var reportTreeControlName = Gordic.Report.WebClient.GReportTreeControlTS;

                var gcontentParams = {
                    ID: that.id,
                    ControlParams: dto
                };
                var dialogOptions = {
                    width: that.width,
                    height: that.height,
                    title: that.title,
                    related: ev && ev.target ? ev.target : undefined
                };

                var parentContent = that.parentContent || that["content"];
                var $dlg = parentContent && parentContent instanceof GContent
                    ? (that.fullScreen ? parentContent.navigate(reportTreeControlName, gcontentParams, dialogOptions) : parentContent.dialogs.showModalWindow(reportTreeControlName, gcontentParams, dialogOptions))
                    : GDlg.showModalWindow(reportTreeControlName, gcontentParams, dialogOptions);

                $dlg.on("reptreectlready.greports", function () {
                    $.content($dlg).setOpeningAction(that);
                });

                if (that.dialogClosed !== $.noop) {
                    $dlg.one("closed", function (event, repInfo) {
                        that.dialogClosed.apply(that, arguments);
                    });
                }

                if (that.reportSelected !== $.noop) {
                    $dlg.on("reportselected.greports", function (event, repInfo) {
                        that.reportSelected.apply(that, arguments);
                    });
                }

                if (that.reportGenerated !== $.noop) {
                    $dlg.on("reportgenerated.greports", function (event, repInfo) {
                        that.reportGenerated.apply(that, arguments);
                    });
                }

                if (that.reportFinished !== $.noop) {
                    $dlg.on("workflowcomplete.greports", function (event, repInfo) {
                        that.reportFinished.apply(that, arguments);
                    });
                }

                if (that.reportCancelled !== $.noop) {
                    $dlg.on("reportcancelled.greports", function (event, repInfo) {
                        that.reportCancelled.apply(that, arguments);
                    });
                }

                if (that.reportScheduled !== $.noop) {
                    $dlg.on("reportscheduled.greports", function (event, repInfo) {
                        that.reportScheduled.apply(that, arguments);
                    });
                }

                if (that.reportFormDataCollected !== $.noop) {
                    $dlg.on("reportformdatacollected.greports", function (event, repInfo) {
                        that.reportFormDataCollected.apply(that, arguments);
                    });
                }
            });
        }
    };
    

    GAction.createPrintAction = function (params) {
        /// <summary>Vytvori akci pro zobrazeni okna se stromem sestav.</summary>
        /// <param name="params" type="{}">
        /// </param>
        /// <returns type="GAction">Pripravena akce pro tisk</returns>
        
        if (params.run === $.noop)
            delete params.run;

        //#region Uprava metod pro obsluhu udalosti

        if (params.dialogClosed && typeof (params.dialogClosed) === "string")
            (function () { eval("this.dialogClosed=" + this.dialogClosed); }).call(params);

        if (params.reportStarting && typeof (params.reportStarting) === "string")
            (function () { eval("this.reportStarting=" + this.reportStarting); }).call(params);

        if (params.reportSelected && typeof (params.reportSelected) === "string")
            (function () { eval("this.reportSelected=" + this.reportSelected); }).call(params);

        if (params.reportGenerated && typeof (params.reportGenerated) === "string")
            (function () { eval("this.reportGenerated=" + this.reportGenerated); }).call(params);

        if (params.reportFinished && typeof (params.reportFinished) === "string")
            (function () { eval("this.reportFinished=" + this.reportFinished); }).call(params);

        if (params.reportCancelled && typeof (params.reportCancelled) === "string")
            (function () { eval("this.reportCancelled=" + this.reportCancelled); }).call(params);

        if (params.getReportSigner && typeof (params.getReportSigner) === "string")
            (function () { eval("this.getReportSigner=" + this.getReportSigner); }).call(params);

        if (params.reportFormDataCollected && typeof (params.reportFormDataCollected) === "string")
            (function () { eval("this.reportFormDataCollected=" + this.reportFormDataCollected); }).call(params);

        if (params.gfrmOptions) {
            if (params.gfrmOptions.init && typeof params.gfrmOptions.init === "string")
                (function () { eval("this.gfrmOptions.init=" + this.gfrmOptions.init); }).call(params);
            if (params.gfrmOptions.clientClass && typeof params.gfrmOptions.clientClass === "string")
                (function () { this.gfrmOptions.clientClass = eval(this.gfrmOptions.clientClass); }).call(params);
        }

        //#endregion

        var args = $.extend(true, {}, defaults, params);

        if (!args.tema)
            throw "GAction.createPrintAction(): missing parameter 'tema'.";

        //console.log("GPrintAction", args);

        return new GAction(args);
    };

})(jQuery);