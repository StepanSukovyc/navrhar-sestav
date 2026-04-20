/*!
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GReports.js                                                 </Name>
//    <Description> Rizeni generovani reportu                                   </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2015                            </Copyright>
//    <Created>     2015-12-09                                                  </Created>
//  </FileHeader>
*/

var GReportGenerator = (function ($) {
    "use strict";
    
    var defaultOptions = {
        reportGeneratorType: "Gordic.Report.WebClient.Reporter.SinglePage.Common.GReportGenerator",
        reportService: "Gordic.Report.WebClient.GReportService",
        getStateInterval: 1,    //interval (sekundy), po ktery se dotazuje na stav reportu v async. generovani 
        waitToAsync: 15,        //pocet sekund, po ktere se ceka, nez se zacne generovat v jinem vlakne
        parentContent: null     //parent content pro vytvoreni servisniho contentu
    };

    var defaultReportParams = {
        reportId: "",           //povinne
        outputStyle: "",    //volitelne (pripona souboru)
        platnost: "",       //volitelne
        restrictionAlf: "", //volitelne
        restrictionAlv: "", //volitelne
        preselect: false,   //volitelne
        runAgain: false,    //volitelne
        generatorParams: null, //volitelne - jakekoliv dalsi argumenty pro rizeni generatoru
        serverRestrictionAlfMethod: "", //volitelne - naplneni RestrictionAlf pres metodu: [namespace].[nazev tridy]:[nazev metody]  argumenty jsou GUserProcess, string (tiskove tema), vraci string
        serverRestrictionAlvMethod: "", //volitelne - naplneni RestrictionAlv pres metodu: [namespace].[nazev tridy]:[nazev metody]  argumenty jsou GUserProcess, string (tiskove tema), vraci string
        customDto: null
    };

    var defaultXParams = {
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

    function GReportGenerator(options) {
        this.options = $.extend({}, defaultOptions, options);
        this.reportService = this.options.parentContent
            ? this.options.parentContent.createServiceContent(this.options.reportService)
            : new GContent(this.options.reportService); //NOTE: Tuto cast do budoucna zrusit, protoze chybi pak serverovy context (napr. pokud ve stepu nekdo pouziva knihu, pak mu bude pri generovani sestavy chybet)
    }

    GReportGenerator.prototype.generate = function (repParams, xParams, cancellationToken) {
        /// <summary>Zahajeni generovani sestavy</summary>
        /// <param name="repParams" type="type"></param>
        /// <param name="xParams" type="type"></param>
        /// <param name="cancellationToken" type="Object">{ cancel: false }</param>
        /// <returns type=""></returns>

        //console.log("GReportGenerator.generate()", arguments);
        
        var params = repParams.Wrid !== undefined //Muze jit o GFRM, zde jsou repParams velke DTO pro vytvoreni reportu: GCreateReportDto
            ? repParams
            : GReportGenerator.convertParamsToGCreateReportDto(repParams, xParams, this.options);

        cancellationToken = cancellationToken || { cancel: false };

        //console.log("GReportGenerator.generate", params);

        var def = $.Deferred();
        var that = this;

        def.notify({
            state: 0,
            stateStr: "started",
            caption: "jres:31", //RC 31 : GINIS - generátor výkazů a sestav
            value: 0
        });

        this.reportService.call("CreateReport", { parms: params })
        .then(function (res) {
            //generovani, customDialog, atd.
            return that._processReport(res, cancellationToken);
        })
        .progress(function (progress) {
            def.notify(progress);
        })
        .then(function (state) {
            return that.reportService.call("FinalizeReport", { sessionName: state.SessionName });
        })
        .done(function (state) {
            /// <param name='result' type='server.GReportStateDto'>Status generovani reportu</param>
            def.resolve({
                id: state.SessionName,
                idSes: state.IdSes,
                fileName: state.FileName,
                fileExtension: state.FileExtension,
                dmsInfo: state.DmsInfo,
                batchFiles: state.BatchFiles,
                fileInfo: state.FileInfo,
                data: state.Data,
                postProcessData: state.PostProcessData,
                commonInfos: state.CommonInfos
            });
        })
        .fail(function (xhr, type, obj) {
            console.error("GReportGenerator.generate().fail()", arguments);
            //NOTE: Vyjimku zpracovani Resi Tomas
            def.reject.apply(this, arguments);
        });

        return def.promise();
    };

    GReportGenerator.prototype.generateDataOnly = function (repParams, xParams, cancellationToken) {
        repParams.loadData = true;

        var _this = this;
        var result = null;
        return this.generate(repParams, xParams, cancellationToken)
                   .then(function (r) { result = r; return r.data })
                   .always(function () { if (result) _this.clean(result); });
    };

    GReportGenerator.prototype.clean = function (res) {
        ///<summary>Odstrani sestavu + souvisejici ze serveru</summary>
        ///<returns type='JQueryPromise<void>'></returns>
        if (!res) return;

        if ($.isPlainObject(res)) res = [res];
        else if (res instanceof Array) res = res;
        else throw new GError("Argument 'res' is not supported");

        var guids = res.filter(function (r) { return r && r.fileInfo && r.fileInfo.guid })
                       .map(function (r) { return r.fileInfo.guid });

        return this.reportService.call("Clean", { guids: guids });
    };

    GReportGenerator.convertParamsToGCreateReportDto = function (repParams, xParams, options) {
        /// <summary>Prevede objekt repParams na GCreateReportDto (c#)</summary>
        /// <param name="repParams" type="type"></param>
        /// <param name="xParams" type="type"></param>
        /// <param name='options' type='object'>GReportGenerator.options</param>
        /// <returns type='GCreateReportDto'></returns>

        if (!repParams.reportId)
            throw Error("GReportGenerator.generate() argument repParams missing property 'reportId'"); //NOTE: Asi dat reject na promise

        var pars = $.extend({}, defaultReportParams, repParams);

        //GCreateReportDto.cs
        var params = {
            Tema: pars.tema,
            Wrid: pars.reportId,
            Name: pars.name,
            OutputStyle: pars.outputStyle,
            Preselect: pars.preselect,
            RunAgain: pars.runAgain,
            ReportGeneratorType: pars.reportGeneratorType ? pars.reportGeneratorType : ( options ? options.reportGeneratorType : defaultOptions.reportGeneratorType),
            ReportGeneratorTypeAsync: pars ? pars.reportGeneratorTypeAsync : undefined,
            Persistent: options ? options.persistent : undefined,
            ReportGeneratorParams: pars.generatorParams,
            ReportGeneratorWaitToAsync: options ? options.waitToAsync : defaultOptions.waitToAsync,
            ServerParameterMethod: pars.serverParameterMethod,
            ServerRestrictionAlfMethod: pars.serverRestrictionAlfMethod,
            ServerRestrictionAlvMethod: pars.serverRestrictionAlvMethod,
            CustomDto: pars.customDto || pars.CustomDto,
            LoadData: pars.loadData,
            Props: {
                Platnost: pars.platnost,
                RestrictionAlf: pars.restrictionAlf,
                RestrictionAlv: pars.restrictionAlv,
                ReportParams: pars.params
            }
        };

        if (xParams)
            params.Props.ReportParams = $.extend({}, defaultXParams, xParams); //Parametry X0000 - X0009

        return params;
    };

    GReportGenerator.prototype._processReport = function (res, cancellationToken) {
        var def = $.Deferred();
        this._processState(res, def, cancellationToken);
        return def.promise();
    };

    GReportGenerator.prototype._processState = function (state, def, cancellationToken) {
        var that = this;
        this._getState(state, cancellationToken)
        .done(function (result) {
            /// <param name='result' type='server.GReportStateDto'>Status generovani reportu</param>
            if (!(result.State === 5 || result.State === 6 || result.State === 7 || result.State === 8)) {
                setTimeout(function () {
                    that._processState(result, def, cancellationToken);
                }, that.options.getStateInterval * 1000);
                def.notify(that._stateToNotifyMsg(result, 1, "pending"));
                return;
            }

            //Success
            if (result.State === 5) {
                def.notify(that._stateToNotifyMsg(result, 3, "generated"));
                def.resolve(result);
            }

            //Exception
            if (result.State === 6) {
                var msg = that._stateToNotifyMsg(result, -1, "exception");
                def.notify(msg);
                console.warn("GReportGenerator._processState(), Exception", result);
                def.reject(msg);
            }

            //Cancel
            if (result.State === 7) {
                var cmsg = that._stateToNotifyMsg(result, -2, "cancelled");
                def.notify(cmsg);
                console.warn("GReportGenerator._processState(), Cancel", result);
                def.reject(cmsg);
            }

            //Pozadovan uzivatelsky vstup
            if (result.State === 8) {
                def.notify(that._stateToNotifyMsg(result, 2, "dialog"));
                //console.warn("GReportGenerator._processState(), custom dialog: TODO: Udelat metodu pro customDialog!!!!!!", result);
                that._waitForUserInput(result)
                .done(function (res) {
                    that._processState(res, def, cancellationToken);
                })
                .fail(function () {
                    def.reject.apply(this, arguments);
                });
            }
        })
        .fail(function (xhr, type, obj) {
            console.error("GReportGenerator._processState", xhr);
            try {
                GDlg.showException(JSON.parse(xhr.responseText).exception);
                if (obj && $.isPlainObject(obj)) obj.handled = true; 
            }
            catch (e) { GDlg.showException({ shortMessage: "jres:31105007" }); } //RC 31105007 : Během zpracování se vyskytla neznámá chyba.
            def.reject.apply(this, arguments);
        });
    };

    GReportGenerator.prototype._getState = function (state, cancellationToken) {
        var req = {
            sessionName: state.SessionName,
            cancel: cancellationToken && $.isPlainObject(cancellationToken) && cancellationToken.cancel !== undefined ? cancellationToken.cancel : false
        };

        //console.log("GReportGenerator._getState", req, cancellationToken);

        return this.reportService.call("GetReportState", req);
    };

    GReportGenerator.prototype._stateToNotifyMsg = function (stateObj, stateVal, stateStr) {
        /// <param name='result' type='server.GReportStateDto'>Status generovani reportu</param>
        var notify = {
            state: stateVal,
            stateMsg: stateStr,
            value: 0,
            id: stateObj.SessionName
        };
        
        if (!stateObj || !stateObj.Progress)
            return notify;

        notify.caption = stateObj.Progress.caption;
        notify.topLabel = stateObj.Progress.topLabel;
        notify.bottomLabel = stateObj.Progress.bottomLabel;
        notify.value = stateObj.Progress.value;
        
        return notify;
    };
    
    GReportGenerator.prototype._waitForUserInput = function (state) {
        /// <summary>Vytvori customDialog a ceka na to az uzivatel klepne na OK.</summary>
        var def = $.Deferred();
        var that = this;

        this.reportService.call("GetCustomDialogParams", { sessionName: state.SessionName })
            .then(function (dialog) {
                if (dialog.dialogType === "MessageBox") {
                    var label = dialog.controls[0];
                    GDlg.error(dialog.title, label.caption, dialog.width, dialog.height)
                        .on("close", function () { def.resolve({}); });
                }
                else {
                    GDlg.showModalWindow(
                        Gordic.Report.WebClient.GReportCustomDialog,
                        dialog,
                        {
                            title: dialog.title,
                            width: Math.ceil((dialog.width ? dialog.width : 100) * 1.5), //Vychazi se z abs. layoutu, tam maji trochu mensi pismo
                            height: Math.ceil((dialog.height ? dialog.height : 50) * 1.5),
                        }).on("close", function (ev, val) { def.resolve(val); });
                }
            })

        return def.promise()
            .then(function (dto) { return that.reportService.call("ContinueGeneration", { sessionName: state.SessionName, parms: dto }) });
    };

    //#region Staticke

    //TODO: Smazat
    GReportGenerator.progressBegin = function (gcontent, cancellationAction) {
        /// <summary>Zobrazi preloader pro generovani (s teplomerem)</summary>
        /// <param name="gcontent" type='GContent'>gcontent</param>
        /// <param name='cancellationAction'>Akce, ktera je vyvolana po klepnuti na cancel</param>
        return Gordic.Report.WebClient.GReportUtils.progressBegin(gcontent, cancellationAction);
    };

    //TODO: Smazat
    GReportGenerator.progressUpdate = function (gcontent, progress, formaterFunc) {
        /// <summary>Updatne preloader pro generovani (s teplomerem)</summary>
        /// <param name="gcontent" type='GContent'>gcontent</param>
        /// <param name="formaterFunc" type='function'>Funkce, ktera zformatuje progress (prevede progress na HTML string). Pokud argument neni uveden, pouzije se defaultni GReportGenerator.formatProgress()</param>

        return Gordic.Report.WebClient.GReportUtils.progressUpdate(gcontent, progress, formaterFunc);
    };

    //TODO: Smazat
    GReportGenerator.formatProgress = function (progress) {
        /// <summary>Zformatuje progress</summary>

        return Gordic.Report.WebClient.GReportUtils.formatProgress(progress);
    };

    //#endregion

    return GReportGenerator;
})(jQuery);

namespace("Gordic.Report.WebClient.GReportGenerator", GReportGenerator);