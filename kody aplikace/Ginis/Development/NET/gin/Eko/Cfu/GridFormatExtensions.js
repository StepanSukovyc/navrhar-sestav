$(function () {
    "use strict";

    var getBaseCfuSet = function (gcontent) {
        /// <signature>
        /// <summary> 
        /// Kolekce EkoCfu (konfigurace rozpočtové věty) seřazená tak, že na prvním indexuje první položka (podle položky "Poradi")
        /// </summary>
        /// <param name="gcontent" type="GContent">this gcontent</param>
        /// </signature> 
        /// <signature>
        /// <summary>Prida seznam vlastnich ekoSloupcu</summary>
        /// <param name="dto" type="server.GGridColumnDto">Serializovany objekt Gordic.Gui.WebApp.GGridColumnDto</param>
        /// </signature>

        var columns = [];
        if (gcontent && gcontent instanceof GContent) columns = gcontent.prop("cfuGridFormat").columns.map(function (i) { return $.extend(true, {}, i); });
        else if (gcontent && gcontent.columns && Array.isArray(gcontent.columns)) columns = gcontent.columns.map(function (i) { return $.extend(true, {}, i); });
        else throw "Gordic.Data.GridFormat.addSortedEkoCfuSet: argument is not supported";
        return columns;
    };

    Gordic.Data.GridFormat.prototype.getBaseCfuSet = function (gcontent) {
        return getBaseCfuSet(gcontent);
    };

    function EkodcfuFilteredSet(columns, sentenceColumns) {
        var agendaColumns = [];
        //columns.remove("uea");
        columns.forEach(function (column) {
            sentenceColumns.forEach(function (sentenceColumns) {
                if (column.name === sentenceColumns) {        //jedna se o viditelny sloupec
                    agendaColumns.push(column);
                    //break;
                }
            });
        });
        return agendaColumns;
    }

    Gordic.Data.GridFormat.prototype.addBplKontaceSet = function (gcontent, options) {
        /// <signature>
        /// <summary> 
        /// Kolekce EkoCfu (konfigurace rozpočtové věty) seřazená tak, že na prvním indexuje první položka (podle položky "Poradi")
        /// </summary>
        /// <param name="gcontent" type="GContent">this gcontent</param>
        /// </signature> 
        /// <signature>
        /// <summary>Prida seznam vlastnich ekoSloupcu</summary>
        /// <param name="dto" type="server.GGridColumnDto">Serializovany objekt Gordic.Gui.WebApp.GGridColumnDto</param>
        /// </signature>
        var columns = getBaseCfuSet(gcontent);
        if (options.sentenceColumns)
            columns = EkodcfuFilteredSet(columns, options.sentenceColumns);

        var isEditable = (options === true) || (options && options.isEditable);
        if (isEditable) {
            var dataSentence = options && options.dataSentence ? options.dataSentence : gcontent.dataSentence;
            if (!dataSentence || $.isEmptyObject(dataSentence)) throw "Gordic.Data.GridFormat.addSortedDataColumns: Data sentence isn't defined";


            var fieldOptions = options && options.fieldOptions ? options.fieldOptions : {};
            var managerExtend = options && options.managerOptions ? options.managerOptions : {};
            var forAllColumns = options && options.columnExtend ? options.columnExtend["_global"] : {};

            var lastDataWordSequence = dataSentence.allSortedDataWords.filter(function (dataWord) { return dataWord.Pouziti === 1; }).pop().Poradi;
            var that = this;
     
            columns.forEach(function (column) {
                var columnSequence = column.wordSequence;
                var columnExtend = options && options.columnExtend ? options.columnExtend[column.name] : {};
                var mask = fieldOptions[column.name] ? fieldOptions[column.name].mask : undefined;//(column.name === "ued") ? "006???" : undefined; //fieldOptions[column.name] ? fieldOptions[column.name].mask : undefined;

                var opts = $.extend({
                    name: column.name,
                    showSelectButton: false,
                    usedForCellEditor: true,
                    custSetOnLengthDelegate: function (value) {
                        var _this = this;
                        this.setValue({ code: value, editable: true, compensation: this.element.closest(".g-porizovac-manager").gporizovacmanager("instance").editedCompensation || "" }, false);
                        setTimeout(function () { _this._tryToMoveNext(_this.fieldInput.get(0)); }, 200);
                    },
                    modelOptions: {
                        verificationNeeded: false
                    },
                    mask: mask,
                    prefillValue: function () { var val = this.fieldInput.val(); if (/^\w+$/g.test(val)) return val; else return "" }
                }, {
                    graphicInput: mask ? "hidden" : null,
                    wordSequence: columnSequence,
                    dataWord: dataSentence.allSortedDataWords[columnSequence - 1],
                    wildcardMode: dataSentence.wildcard,
                    inputCharsMode: dataSentence.inputCharsMode,
                    /*useAutocomplete: dataSentence.useAutocomplete,
                    againSet: false,
                    showHelpButton: false*/
                }, fieldOptions[column.name]);

                var editor = $.extend({
                    cellTemplate: function (data, meta, info) {
                        var d = data[info ? (info.column.name || "") : ""];
                        return d ? (d.code || d.compensation) : "";
                    },
                    sortable: false,
                    editor:
                    {
                        widget: "gimagicfield",
                        options: opts
                    }
                }, forAllColumns, columnExtend);
                $.extend(column, editor);
            });


        }

        for (var i = 0; i < columns.length; i++) {
            var c = columns[i];
            switch (c.columnType) {
                case "text": this.addTextColumn(c); break;
                case "datetime": this.addDateTimeColumn(c); break;
                case "currency": this.addCurrencyColumn(c); break;
                case "number": this.addNumberColumn(c); break;
                default: this.add(c);
            }
        }
        return this;
    };

    Gordic.Data.GridFormat.prototype.addSortedEkoCfuSet = function (gcontent, options) {
        /// <signature>
        /// <summary> 
        /// Kolekce EkoCfu (konfigurace rozpočtové věty) seřazená tak, že na prvním indexuje první položka (podle položky "Poradi")
        /// </summary>
        /// <param name="gcontent" type="GContent">this gcontent</param>
        /// </signature> 
        /// <signature>
        /// <summary>Prida seznam vlastnich ekoSloupcu</summary>
        /// <param name="dto" type="server.GGridColumnDto">Serializovany objekt Gordic.Gui.WebApp.GGridColumnDto</param>
        /// </signature>
        var columns = getBaseCfuSet(gcontent);
        var isEditable = (options === true) || (options && options.isEditable);
        var mode = options && options.mode ? options.mode : "normal";
        var forAllColumns = options && options.columnExtend ? options.columnExtend["_global"] : {};

        if (isEditable) {
            var dataSentence = options && options.dataSentence ? options.dataSentence : gcontent.dataSentence;
            if (!dataSentence || $.isEmptyObject(dataSentence)) throw "Gordic.Data.GridFormat.addSortedDataColumns: Data sentence isn't defined";
            var fieldOptions = options && options.fieldOptions ? options.fieldOptions : {};
            var managerExtend = options && options.managerOptions ? options.managerOptions : {};
            var reg = "";
            switch (dataSentence.inputCharsMode) {
                case 0: reg = "\\D"; break;
                case 1: reg = "[XYxy]"; break;
                case 2: reg = "\\W"; break;
            }
           

            var lastDataWordSequence = dataSentence.allSortedDataWords.filter(function (dataWord) { return dataWord.Pouziti === 1 }).pop().Poradi;

            columns.forEach(function (column) {

                var columnSequence = column.wordSequence;
                var columnExtend = options && options.columnExtend ? options.columnExtend[column.name] : {};

                var mask = fieldOptions[column.name] ? fieldOptions[column.name].mask : undefined;
                var modeOptions = {};
                switch (mode) {
                    case "withoutCheck":
                        modeOptions = {
                            autoJump: true,
                            smartNavNextElement: function (curr, next) {
                                let field = $(this).gfield("instance");
                                field.resetErrors();
                                field.fillZerosToValue();
                                return next;
                            },
                            validators: [new Gordic.Validators.Base({
                                validate: function (value) {
                                    var regExp = new RegExp(reg, "g");
                                    var valid = !(value && value.code)
                                    return valid || !regExp.test(value.code);
                                }, message: "jres:Gordic.Gui.WebControls:25030487", stopping: true //RC 25030487 : Chybná hodnota
                            })]

                        }
                        break;
                }
                var opts = $.extend(modeOptions, { model: column.name + "=value.code" }, {
                    wordSequence: columnSequence,
                    showDataWordsInfos: managerExtend.showDataWordsInfos,
                    dataWord: dataSentence.allSortedDataWords[columnSequence - 1],
                    graphicInput: mask ? "hidden" : null,
                    wildcardMode: dataSentence.wildcard,
                    inputCharsMode: dataSentence.inputCharsMode,

                }, fieldOptions["_global"], fieldOptions[column.name]);

                var gridEvents = columnSequence === lastDataWordSequence ? {
                    ggridroweditorstart: function (ev, obj) {
                        var rowDOM = $(obj.cellInfo.rowDOM);
                        var activeElement = document.activeElement;
                        if (!(mode === "withoutCheck" || Gordic.Eko.Utils.checkEkoColumnsBeforeStartEditor(ev, obj))) {
                            rowDOM.closest(".ggridroweditor").ggridroweditor("stop");
                            return;
                        }

                        // Pokud již existuje instance gmagicmanager, zničíme ji před vytvořením nové
                        if (rowDOM.data("gmagicmanager")) {
                            try {
                                rowDOM.gmagicmanager("destroy");
                            } catch (e) {
                                // Ignore errors during destroy
                            }
                        }

                        rowDOM.gmagicmanager($.extend({
                            createdForPrefilling: obj.cellInfo.data?._prefilling ?? false,
                            data: obj.cellInfo.data,
                            initializedDataSentence: dataSentence,
                            withoutCheck: mode === "withoutCheck"
                        }, managerExtend, { loadingContent: options.loadingContent }));

                        var fields = rowDOM.findFields(".gmagicfield");
                        var lastField = fields.last();
                        var lastWordFieldFunc = function (lField) {
                            rowDOM.gmagicmanager("lastDataWordFieldChanged", obj.cellInfo.data["drd"]);
                            lField.gfield("getVerifyPromise").done(function () {
                                if (activeElement === document.activeElement) {
                                    setTimeout(function () { $(activeElement).focus(); }, 500);
                                }
                                else {
                                    $(activeElement).focus();
                                }
                            })
                        }

                        lastField.gfield("getValueAsync").done(function () {
                            if (lastField.gfield("option", "disabled")) {
                                rowDOM.findFields(".gmagicfield").not(".ui-disabled").last().gfield("getValueAsync").done(() => {
                                    lastWordFieldFunc(lastField);
                                })
                            }
                            else {
                                lastWordFieldFunc(lastField);
                            }

                        })
                        rowDOM.gmagicmanager("showHelpTexts", true);
                        // rowDOM.gporizovacmanager("applyCfs");
                        //rowDOM.gporizovacmanager($.extend({
                        //    data: obj.cellInfo.data
                        //}, managerExtend));
                        //rowDOM.gporizovacmanager("applyCfs");

                    },
                    ggridroweditorbeforecommit: function (ev, obj) {
                        var rowDOM = $(obj.cellInfo.rowDOM);
                        //not implemented

                        rowDOM.gmagicmanager("setZeroToFields");
                        return mode === "withoutCheck" || rowDOM.gmagicmanager("checkDataSentence"); //withoutCheck => neprovádí se kontrola jinak se dělá kontrola
                        // return rowDOM.gmagicbasemanager("getErrors").length === 0;
                    },

                    ggridroweditorbeforestop: function (ev, obj) {
                        var rowDOM = $(obj.cellInfo.rowDOM);
                    },
                    ggridroweditorstop: function (ev, obj) {
                        var rowDOM = $(obj.cellInfo.rowDOM);
                        if (rowDOM.hasClass("g-magic-manager")) {
                            rowDOM.gmagicmanager("destroy");
                        }
                        rowDOM.findFields(".gmagicfield").gfield("destroy");
                    }
                } : {};

                var editor = $.extend({
                    editor:
                    {
                        widget: "gimagicfield",
                        options: opts,
                        gridEvents: dataSentence.allSortedDataWords[columnSequence - 1] ? gridEvents : {}
                    }
                }, forAllColumns, columnExtend);
                $.extend(column, editor);


            });

        }
        else if (options && options.columnExtend) {
            columns.forEach(function (column) {
                var columnExtend = options.columnExtend[column.name] || {};
                $.extend(column, forAllColumns, columnExtend);
            });
        }

        for (var i = 0; i < columns.length; i++) {
            var c = columns[i];
            switch (c.columnType) {
                case "text": this.addTextColumn(c); break;
                case "datetime": this.addDateTimeColumn(c); break;
                case "currency": this.addCurrencyColumn(c); break;
                case "number": this.addNumberColumn(c); break;
                default: this.add(c);
            }
        }

        return this;
    };

    Gordic.Data.GridFormat.prototype.addPredkontaceSet = function (gcontent, options) {
        /// <signature>
        /// <summary> 
        /// Kolekce EkoCfu (konfigurace rozpočtové věty) seřazená tak, že na prvním indexuje první položka (podle položky "Poradi")
        /// </summary>
        /// <param name="gcontent" type="GContent">this gcontent</param>
        /// </signature> 
        /// <signature>
        /// <summary>Prida seznam vlastnich ekoSloupcu</summary>
        /// <param name="dto" type="server.GGridColumnDto">Serializovany objekt Gordic.Gui.WebApp.GGridColumnDto</param>
        /// </signature>
        var columns = getBaseCfuSet(gcontent);

        var isEditable = (options === true) || (options && options.isEditable || false);
        if (isEditable) {
            var dataSentence = options && options.dataSentence ? options.dataSentence : gcontent.dataSentence;
            if (!dataSentence || $.isEmptyObject(dataSentence)) throw "Gordic.Data.GridFormat.addSortedDataColumns: Data sentence isn't defined";
            var fieldOptions = options && options.fieldOptions ? options.fieldOptions : {};
            var managerExtend = options && options.managerOptions ? options.managerOptions : {};

            columns.forEach(function (column) {
                var columnExtend = options && options.columnExtend ? options.columnExtend[column.name] : {};
                var opts = $.extend({ model: "model." + column.name + "=value.code" }, dataSentence.dataWords[column.wordSequence] ? {
                    wordSequence: column.wordSequence,
                    dataWord: dataSentence.dataWords[column.wordSequence],
                    useAutocomplete: dataSentence.useAutocomplete,
                    againSet: false,
                    showHelpButton: true,
                    hasMaxWordInput: false,
                    invalidTransform: function (value) { return { code: value }; },

                } : {}, fieldOptions[column.name]);


                var editor = $.extend({
                    editor: {
                        widget: "gporizovacfield",
                        options: opts,
                        gridEvents: {
                            ggridcelleditorstart: function (ev, obj) {
                                $(obj.cellInfo.cellDOM).gporizovacmanager($.extend({
                                    data: obj.cellInfo.data,
                                    rowIndex: obj.cellInfo.row + 1,
                                    editMode: "cell"
                                }, managerExtend));
                                $(obj.cellInfo.cellDOM).toggleClass("g-state-background", false).toggleClass("g-state-error", false);
                                Gordic.Eko.GPorizovac.Contents.Predkontace.setStateIcon($(obj.cellInfo.cellDOM).find(".gfield"), obj.cellInfo.data[column.name]);

                            },
                            ggridcelleditorstop: function (ev, obj) {
                                $(obj.cellInfo.cellDOM).gfield("destroy");
                            }
                        }
                    }
                }, columnExtend);

                $.extend(column, editor);


            });

        }
        else if (options.columnExtend) {
            columns.forEach(function (column) {
                var columnExtend = options.columnExtend[column.name] || {};
                $.extend(column, columnExtend);
            });
        }
        this.add(columns);
        return this;
    };

});