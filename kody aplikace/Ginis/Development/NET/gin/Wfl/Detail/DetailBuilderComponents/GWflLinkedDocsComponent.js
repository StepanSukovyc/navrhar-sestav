(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflLinkedDocs: {
            create: function (content, componentDto) {
                /// <summary> Creates a definition of button and openAction for wflHistorie.</summary>
                /// <remarks> Vmaca, 02.03.2017. </remarks>
                /// <param name="data"> The data with following properties. 
                ///                     TargetContent[string] - namespace of target AjaxContent/AjaxContentControl. 
                ///                     TargetContentDto[object] - dto with data required by TargetContent, 
                ///                     Title[string] - name of button and dialogWindow. </param>
                /// <returns> Object with actionDefinitions and statusBarDefinitions ready for insert into content. </returns>

                //var wflOps = Gordic.Wfl.WebClient.WflOps;
                var reloadFunc = null;
                var title = "jres:26226470";//RC 26226470 : Související / Vazby
                var loadedClass = "js-linked-docs-loaded";
                var closeNamespace = '.wfllinkeddocs_close';

                var badge = new GObservableObject({});
                var updateBadge = function (count) {
                    if (badge) {
                        badge.update({ value: count != null && count > 0 ? count.toString() : "" });
                    }
                };
                updateBadge(componentDto.Count);

                var result = {
                    onBuild: [function () {
                        var that = this;
                        this.element.off(closeNamespace).on('contentclose' + closeNamespace, function (ev) { if (ev.target === that.element[0]) { badge = null; reloadFunc = null; updateBadge = null; that.element.off(closeNamespace); } });
                    }],
                    // příprava na případný reload .. je potřeba k tomu dodělat operaci/eventu
                    //onBuild: [function () {
                    //    var that = this;
                    //    this.element.off('.wfllinkeddocs').on(wflOps.eventName + '.wfllinkeddocs', function (ev, ctx) {
                    //        if(ctx.operation === wflOps.WflOpsEnum.)
                    //        var panel = this.element.gsidebar("getPanel", 'panelLinkedDocs')
                    //        if (panel.hasClass(loadedClass) && reloadFunc) {
                    //            reloadFunc();
                    //        } else {
                    //            var cnt = that.createServiceContent({ className: "Gordic.Wfl.WebClient.SouvisejiciDokumentyDlg", serverParams: { Ixp: componentDto.Ixp } });
                    //            cnt.call("PocetSouvisejicichDokumentu")
                    //                .done(function (count) {
                    //                    badge.update({ value: count != null ? count.toString() : "?" });
                    //                })
                    //                .always(function () {
                    //                    cnt.close();
                    //                });
                    //        }
                    //    });
                    //}],
                    sidePanels: {
                        panelLinkedDocs: {
                            side: "right",
                            leaf: { caption: title, badge: badge, icon: "gi-navazany_zaznam" },
                            caption: title,
                            customClass:"gwfl-linked-docs",
                            minWidth: 300,
                            width: 400,
                            open: function () {
                                var customDiv = $(this);
                                if (!customDiv.hasClass(loadedClass)) {
                                    customDiv.addClass(loadedClass);
                                    customDiv.gcover();
                                    var actSwitchBack = new GAction({
                                        name: "actSwitchBack", run: function () {
                                            customDiv.gswitcher("showPrev");
                                            this.enabled(false);
                                        },
                                        enabled: false
                                    });

                                    var gridRC = null;

                                    var actDown = new GAction({
                                        name: "actDown", run: function () {
                                            var res = gridRC.move(true);
                                            this.enabled(res != null && res.nextRow != null);
                                        },
                                        
                                    });

                                    var actUp = new GAction({
                                        name: "actUp", run: function () {
                                            var res = gridRC.move(false);
                                            this.enabled(res!= null && res.prevRow != null);
                                        },
                                        
                                    });

                                    var grid = $("<div>").appendTo(customDiv);

                                    var actOpenInAgenda = new GAction({
                                        name: "actOrevriVNoveZalozce",
                                        caption: "jres:31926449", //RC 31926449 : Otevřít v agendě
                                        icon: "gi-detail",
                                        enabled: false,
                                        run: function (ev, ctx) {
                                            if (grid) {
                                                var selection = grid.ggrid("getSelection");
                                                if (selection && selection.length === 1) {
                                                    if (selection && selection[0].ixp_vis) {
                                                        var opt = {
                                                            //content: $.content(this),
                                                            ixx1: selection[0].ixp_vis
                                                        }
                                                        Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                                                    }
                                                }
                                            }
                                        }
                                    });

                                    customDiv.gsbpanel("menuBar", [{
                                        icon: "gi-arrow gi-rot180", action: actSwitchBack, tooltip: "jres:31926150" //RC 31926150 : Zpět na seznam
                                    },{
                                            caption: "", action: actOpenInAgenda, tooltip: "jres:31926451" //RC 31926451 : Otevřít vybraný dokument v příslušné agendě
                                    },{
                                        icon: "gi-arrow gi-rot270", action: actUp, align: "opposite", tooltip: "jres:31750057" //RC 31750057 : Předchozí
                                    },
                                    {
                                        icon: "gi-arrow gi-rot90", action: actDown, align: "opposite", tooltip: "jres:32105436"//RC 32105436 : Následující
                                    }]); 
                                   
                                    var hasSwitcher = false, previewDiv = null, switcherField= null;

                                    var switchToPreview = Utils.debounced(function (data, view, switchToPreview) {
                                        if (!hasSwitcher) {
                                            hasSwitcher = true;
                                            previewDiv = $('<div class="gwfl-linked-docs--content">').appendTo(customDiv);
                                            switcherField = $('<div class="gwfl-linked-docs--switch">').appendTo(previewDiv).gselectbox(
                                                {
                                                    name: "fieldLinkedDocs",
                                                    data: view.getDataRows(),
                                                    itemTemplate: "<b>{zkr_ag} - {nazev_typ}</b><br><i>{ixp_vis} - {nazev}</i>",
                                                    elperColumns: ["nazev"],
                                                    graphicInput: "oninput",
                                                    dropdown: true,
                                                    change: function (ev, ctx) {
                                                        grid.ggrid("activeRow", ctx.value);
                                                        previewDiv.gpreview("loadAll", $.extend({ ixp: ctx.value.ixp_vis }, ctx.value), true);

                                                    }
                                                });

                                            previewDiv.gpreview(
                                                {
                                                    tabs: [
                                                        {
                                                            caption: "jres:31926106", //RC 31926106 : Souhrn
                                                            customLoad: function () { if (Gordic.Previews != null && Gordic.Previews.render != null) Gordic.Previews.render("wfl:Dokument", this.customDiv, this.loadParams); }
                                                        }, {
                                                            caption: "jres:31926004", //RC 31926004 : Náhled
                                                            customLoad: function () { //subtask was clicked
                                                                if (this.customDiv.hasClass("gfilepreview")) {
                                                                    this.customDiv.gwflfilepreview("displayElDoc", this.loadParams.ixp);
                                                                }
                                                            },

                                                            content: {
                                                                prepareContent: function () {
                                                                    if (!this.element.hasClass("gfilepreview")) {
                                                                        this.element.gwflfilepreview();
                                                                    }
                                                                }
                                                            }
                                                        }]
                                                });


                                            customDiv.gswitcher({
                                                items: [grid, previewDiv],
                                                animator: Gordic.Prefabs.Effects.slide,
                                                animatorParams: {
                                                    axis: 'horizontal',
                                                    speed: 250,
                                                    perspective: "0px",
                                                    keepHiddenItemsInDOM: false,
                                                },
                                            });
                                        }
                                        switcherField.gfield("setValue", data);

                                        if (switchToPreview !== false) {
                                            actSwitchBack.enabled(true);
                                            customDiv.gswitcher("showNext");
                                        }
                                    }, 100);

                                    grid.gautofit().ggrid({
                                        columns: Gordic.Wfl.GWflCommonDlg.getGridSouvisejiciDokumentKolonky(null, componentDto.TypAg, componentDto.IxsFun, true),// new Gordic.Data.GridFormat().addTextColumn({ name: "ixp_vis", caption: "Identifikátor" }),//Gordic.Wfl.GWflCommonDlg.getGridSouvisejiciDokumentKolonky(false, componentDto.TypAg, componentDto.IxsFunAkt, true),
                                        defaultAction: new GAction({
                                            name: "actDefault", run: function (ev, ctx) {
                                                switchToPreview(ctx.cellInfo.data, ctx.view);
                                            }
                                        }),
                                        cellActivate: function (ev, ctx) {
                                            if (ctx && ctx.cellInfo && ctx.cellInfo.data) {
                                                actOpenInAgenda.enabled(true);
                                            }
                                            gridRC.current(ctx.cellInfo);
                                            switchToPreview(ctx.cellInfo.data, ctx.view, false);
                                        },
                                        contextMenu: function (cellContext) {
                                            return [
                                                {
                                                    action: actOpenInAgenda
                                                }
                                            ]
                                        },
                                    });

                                    gridRC = new Gordic.Components.GridRC(grid).on("gridrcmoved", function (ctx) {
                                        actUp.enabled(ctx.state.prevRow != null);
                                        actDown.enabled(ctx.state.nextRow != null);
                                    });

                                    reloadFunc = function () {
                                        if (!customDiv.hasClass('gcover')) {
                                            customDiv.gcover();
                                        }

                                        var cnt = content.createServiceContent({ className: "Gordic.Wfl.WebClient.SouvisejiciDokumentyDlg", serverParams: { Ixp: componentDto.Ixp } });
                                        cnt.call("LoadData", { LoadDto: { pouzeAktivni: true } }).done(function (data) {
                                            actUp.enabled(data.SouvisejiciDokumenty.length > 0);
                                            actDown.enabled(data.SouvisejiciDokumenty.length > 0);
                                            if (grid && grid.hasClass('ggrid')) {
                                                grid.ggrid("setData", new Gordic.Data.View(data.SouvisejiciDokumenty), true);
                                            }
                                            updateBadge(data.SouvisejiciDokumenty.length);
                                        }).always(function () {
                                            if (customDiv.hasClass('gcover')) {
                                                customDiv.gcover("destroy");
                                            }
                                            cnt.close();
                                        });
                                    };

                                    reloadFunc();
                                }
                            }
                        }
                    }
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);