/* ---------------------------------------
*   CONTENT pro seznam databazovych parametru
*  ---------------------------------------
* 
*/

(function ($) {
    "use strict";

    namespace("Gordic.WebApp.ContentAnalysis", {
        uid: "ContentAnalysis#", 
        taskId: "actContentAnalysis",
        title: "jres:25000083", //RC 25000083 : Analýza obsahu a kontextů
        prepareContent: function () {
            var _this = this;

            this.element.closest(".ui-dialog").removeClass("ui-front").css("z-index: 500");

            this._createActions(); 

            // demo obsah contentu
            this.dataView = new Gordic.Data.View([], {
                key: "contentDiv.id",
                processors: {
                    tree: new Gordic.Data.Tree({ parentKey: function (meta) { return meta.data.parentContent ? meta.data.parentContent.contentDiv.id : null; } },
                        { defaultState: "open" }
                    )
                },
            });


            this.grid = $("<div>").appendTo(this.element).css("height", "100%").ggrid({
                data: this.dataView,
                columnMode: "full",
                columns: new Gordic.Data.GridFormat()
                    .addStructureColumn({
                        name: "id", field: "contentDiv.id", caption: "id", width: 200,
                        iconTemplate: function (data) {
                            return data.isSignificant() ? { icon: "gi-window-restore", text: data.contentDiv.id, tooltip: "Significant - dulezity content ve flow (aktivita, dialog, ...)" } :
                                data.element.closest(".ui-dialog-content").length ? { icon: "&#9645;", text: data.contentDiv.id, tooltip: "Vizualni subcontent (tab, vlozeny content, ...)" } :
                                data.element.is(".ginlinedialog__wrapper") ? { icon: "gi-dorucenka", text: data.contentDiv.id, tooltip: "Inline dialog content" } :
                                { icon: "gi-plus-cross-small", text: data.contentDiv.id, tooltip: "Nevizualni/servisni content" };
                        }

                    }) 
                    .addIconColumn({
                        name: "visible", headerTemplate: Gordic.Templates.iconTemplate({ icon: "gi-detail" }), formatPreset: "icon",
                        iconTemplate: function (data) {
                            return data.element.is(":visible") ? { icon: "gi-detail", text: "VIDITELNY" } : null;
                        }
                    })
                    .addTextColumn({ name: "uid", caption: "uid", width: 150 })
                    .addTextColumn({ name: "title", caption: "title", width: 220 }) 
                    .addTextColumn({ name: "className", caption: "ServerClass", width: 330 }) 
                    .addBooleanColumn({ name: "closed", caption: "&times;", description: "closed", width: 40 })
                    .addIconColumn({
                        name: "gpc", caption: "GPC", width: 65, 
                        iconTemplate: function (data) {
                            return data.gpcChallenged ? { icon: "fa-question g-state-important g-state-text", text: "GPC challenged", tooltip: JSON.stringify(data._gpc) } :
                                data._gpc ? { icon: "fa-dot-circle-o", text: "GPC", tooltip: JSON.stringify(data._gpc) } : null;
                        }
                    })
                    .addNumberColumn({ name: "serverLoadCounter", field: "metrics.serverLoadCounter", caption: "Req", description: "Pocitadlo Load/Call pozadavku", width: 70 })
                    .addNumberColumn({ name: "serverRequestCounter", field: "metrics.serverRequestCounter", caption: "RawReq", description: "Skutecny pocet serverovych pozadavku", width: 70 })
                    .addNumberColumn({
                        name: "dataTotal", field: "metrics.dataTotal", caption: "Xfer", description: "Nekompresovana prenesena data ze serveru - tento content (zatez site tvori typicky 10% z teto hodnoty)", width: 70,
                        formats: Gordic.Data.GridFormat.Formats.filesize(), formatPreset: "k0-"
                    })
                    .addNumberColumn({
                        name: "dataCumulative", field: "metrics.dataCumulative", caption: "Xfer (all)", description: "Nekompresovana prenesena data ze serveru - tento a podrizene contenty (zatez site tvori typicky 10% z teto hodnoty)", width: 80,
                        formats: Gordic.Data.GridFormat.Formats.filesize(), formatPreset: "k0-"
                    })
                ,
                contextMenu: function (obj) {
                    return obj.selection.length ? _this.actions.createBar(["actSendToConsole"]) : null;
                }
            }).on({
                "mouseenter": function (ev) { var ci; (ci = _this.grid.ggrid("cellInfo", this)) && ci.data.element.addClass("analysis-highlight"); },
                "mouseleave": function (ev) { var ci; (ci = _this.grid.ggrid("cellInfo", this)) && ci.data.element.removeClass("analysis-highlight"); }
            }, ".row");

            this.actions.actRefresh.run(); 
        },

        _createActions: function () {
            var _this = this;

            this.actions.addRange({
                actRefresh: { caption: "jres:25000084", icon: "gi-refresh", run: function () { _this.refreshContents(); } }, //RC 25000084 : Aktualizovat
                actSendToConsole: { caption: "Odeslat do console", icon: "fa-share", run: function () { var sel = _this.grid.ggrid("getSelection"); if (!sel.length) return; console.log('ContentAnalysis for "' + sel[0].contentDiv.id + "' (saved in window.$cnt)\n", sel[0], "\n", sel[0].contentDiv); window["$cnt"] = sel[0]; this.setPending(100); } }
            });

            this.menuBar(this.actions.createBar(["actRefresh*", "actSendToConsole*"]));
        },

        refreshContents: function () {
            this.dataView.updateData($.content(null, true));
        },    
    });
})(jQuery);