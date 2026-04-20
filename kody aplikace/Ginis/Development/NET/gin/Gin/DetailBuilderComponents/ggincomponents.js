/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ggincomponents.js
*    project     q:\ginis\Development\NET\Gordic.Gin.WebClient\Gordic.Gin.WebClient.csproj
*    created     2026-02-16 14:38:41
*    files       Gin\Gin\DetailBuilderComponents\GGinCalendarComponent.js
*                Gin\Gin\DetailBuilderComponents\GGinHeaderFormComponent.js
*                Gin\Gin\DetailBuilderComponents\GGinHistoryComponent.js
*                Gin\Gin\DetailBuilderComponents\GGinListControlsComponent.js
*                Gin\Gin\DetailBuilderComponents\GGinNotesComponent.js
*                Gin\Gin\DetailBuilderComponents\GGinNavigatorComponent.js
*                Gin\Gin\DetailBuilderComponents\GGinCloseButtonComponent.js
*/

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinCalendarComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinCalendar: {
            /**
             *  Creates detailbuilder component with action and menu item for calenar.
             * @author thazmuka
             */
            create: function (componentDto) {
                var actName = "actGinCalendarOpen";
                var result = {
                    actions: [{
                        name: actName,
                        caption: "jres:31700040", //RC 31700040 : Přidat událost do osobního kalendáře                    
                        captionVisible: GAction.captionVisibility.never,
                        icon: "fa-calendar-plus-o",
                        run: function (ev, ctx) {

                            var datesObj = Gordic.Gin.WebClient.GCalendarDateService.getDates();

                            // otevřít dlg pro vytvoření nové události
                            new Gordic.GCalendar.Event().createEvent({
                                data: {
                                    //ixs_fun: ctx.ixs_fun,			// sem předej ixs_fun identifikator funkcniho mista
                                    ixx: ctx.ixx,					// a sem ixx - identifikator dokumentu
                                    dat_od: datesObj.dateOd,
                                    dat_do: datesObj.dateDo,
                                    cely_den: 0     // 0 - Ne
                                }
                            });
                        }
                    }],
                    menuBar: [{
                        action: actName,
                        actionContext: {
                            ixx: componentDto.ixx,
                            //ixs_fun: componentDto.ixs_fun
                        },
                        align: "opposite",
                        favorite: true
                    }]
                };

                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinHeaderFormComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinHeaderForm: {
            sizes: {
                noPid: [
                    { info: [12, 12, 12], layout: "L-3-8-1, M-3-9-0, S-12-12-0"   },
                    { info: [3, 3, 12], data: [9, 9, 12], layout: "L-3-8-1, M-3-9-0, S-12-12-0" },
                    { info: [4, 4, 12], data: [4, 4, 12], layout: "L-3-9-0, MS-12-12-0" },
                    { info: [3, 3, 12], data: [3, 3, 12], layout: "LMS-12-12-0"  },
                    { info: [3, 3, 12], data: [2, 2, 12], layout: "LMS-12-12-0"  },
                ],
                pid: [
                    { info: [12, 12, 12] },
                    { info: [2, 3, 12], data: [10, 9, 12] },
                    { info: [2, 2, 12], data: [3, 3, 6] },
                    { info: [2, 3, 12], data: [2, 2, 6] },
                    { info: [2, 3, 12], data: [2, 2, 6] },
                ]
            },
            /**
             * Creates Gin header form.
             * @author vmaca
             * @type {function (componentDto) {}
             */
            create: function (componentDto) {
                var nmspc =  Gordic.Gin.DetailBuilderComponents;
                var headerForm = nmspc.GinHeaderFormLayout.create(componentDto).headerForm;

                var infoSection = nmspc.GinHeaderFormInfoSection.create(componentDto).headerForm.form.sections;

                var dataSections = nmspc.GinHeaderFormDataSections.create(componentDto).headerForm.form.sections;

                headerForm.addPrefab(infoSection, "sections");
                headerForm.addPrefab(dataSections, "sections");


                return { headerForm: headerForm };
            }
            // code
        },
        GinHeaderFormLayout: {
            create: function (componentDto) {

                var dataSectionsCount = componentDto != null ? componentDto.dataSectionsCount : 2;

                var LCount = dataSectionsCount + 1;
                var MCount = dataSectionsCount + 1;
                var SCount = 1;

                return {
                    headerForm: new Gordic.Forms.Form({ 
                        name: "formHeader", 
                        layoutDescriptor: "L{0}M{1}S{2} {3} {4} ".format(
                        LCount, 
                        MCount, 
                        SCount, 
                        dataSectionsCount >= 2 ? (dataSectionsCount >= 3 ? "LMS-12-12-0" : "L-3-9-0, MS-12-12-0") 
                                               : "L-3-8-1, M-3-9-0, S-12-12-0", 
                        ", breaks-810-1190") })
                };
            }
        },
        GinHeaderFormInfoSection: {

			create: function (componentDto) {
                var nmspc = Gordic.Gin.DetailBuilderComponents;
                var dataSectionsCount = componentDto != null ? componentDto.dataSectionsCount : 2;
                var hasPid = componentDto != null && componentDto.pid != null;
                var sizes = hasPid ? nmspc.GinHeaderForm.sizes.pid : nmspc.GinHeaderForm.sizes.noPid;
                var infoSizes = sizes[dataSectionsCount].info;
                var secClass = "w-L-{0} w-M-{1} w-S-{2}".format(infoSizes[0], infoSizes[1], infoSizes[2]);

                var headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                    .addSection({ 
                        name: "formHeaderInfoSection", 
                        customClass: secClass,
                        layoutDescriptor: hasPid ? "LMS-0-12-0" : null 
                    });

                if (hasPid) {
					          headerForm.addRow({ name: "formHeaderRowPid" })
                        .addField("gpidbar", { name: "formHeaderFieldPid", pid: componentDto.pid, dto: componentDto.IkonBarDto });
                }

                return {
                    headerForm: headerForm
                };
            }
        },

        GinHeaderFormDataSections: {
            create: function (componentDto) {
                var nmspc = Gordic.Gin.DetailBuilderComponents;
                var headerForm = new Gordic.Forms.Form({ name: "formHeader" });
                var hasComponentDto = componentDto != null;
                var dataSectionsCount = hasComponentDto ? componentDto.dataSectionsCount : 2;

                var hasPid = hasComponentDto && componentDto.pid != null;
                var sizes = hasPid ? nmspc.GinHeaderForm.sizes.pid : nmspc.GinHeaderForm.sizes.noPid;
                var dataSizes = sizes[dataSectionsCount].data;

                var sectionClass = "w-L-{0} w-M-{1} w-S-{2}".format(dataSizes[0] , dataSizes[1], dataSizes[2]);
                var sectionName = "formHeaderSection{0}";

                if (!hasComponentDto || dataSectionsCount >= 1)
                    headerForm.addSection({ name: sectionName.format("One"), customClass: sectionClass });
                if (!hasComponentDto || dataSectionsCount >= 2)
                    headerForm.addSection({ name: sectionName.format("Two"), customClass: sectionClass });
                if (!hasComponentDto || dataSectionsCount >= 3)
                    headerForm.addSection({ name: sectionName.format("Three"), customClass: sectionClass });
                if (!hasComponentDto || dataSectionsCount >= 4)
                    headerForm.addSection({ name: sectionName.format("Four"), customClass: sectionClass });


                return {
                    headerForm: headerForm
                };

            }
            // code
        }

    }, { extendIntellisense: GContent, pure: true });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinHistoryComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinHistory: {
            openDelegateName: "_openHistory",
            /**
             * Creates a definition of button and openAction for ginHistory.
             * @author vmaca
             * @since 02.03.2017
             * @param componentDto
             * @returns Object with actionDefinitions and menuBarDefinitions ready for insert into content.
             */
            create: function (componentDto) {
                var actName = "actHistoryOpen";

                var result = {
                    actions: [{
                        name: actName,
                        run: function () {
                            var cnt = $.content(this);
                            var targetDto = componentDto.HistoryTargetDto;
                            var dto = { InputDto: typeof targetDto === "string" ? cnt[targetDto] : targetDto };

                            if (componentDto.IxsFunAkt != null && dto.InputDto && dto.InputDto.ixs_fun_akt == null) {
                               dto.InputDto.ixs_fun_akt = componentDto.IxsFunAkt;
                            }
                            var openDelegate = cnt[Gordic.Gin.DetailBuilderComponents.GinHistory.openDelegateName]
                            if (openDelegate) {
                                openDelegate(dto, componentDto);
                            } else {
                                cnt.dialogs.showModalWindow([componentDto.HistoryTargetClass, {uid:"historie#"}], dto, componentDto.HistoryTitle, 1000, 400); //dialogs.showWindow
                            }
                        },
                        caption: componentDto.HistoryTitle,
                        icon: "gi-history"
                    }],
                    menuBar: [{
                        action: actName, 
                        favorite: true
                    }]
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinListControlsComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinListControls: {
            /**
             * Component for moving through parent list of records
             * @author vmaca
             * @type {function () {}
             */
            create: function () {
                var result = { contentExtensions: {}, actions: [], menubar: [], texts: {}, onBuild: [] };
                var prevText = "jres:31700045"; //RC 31700045 : Předchozí
                var nextText = "jres:31700046";//RC 31700046 : Následující
                result.onBuild.push(function () {
                    this.listControls_updateCaptions();
                });
                var contentExtensions = result.contentExtensions;
                contentExtensions.listControls_prevItemTemplateRenderer = Gordic.Templates.ensureTemplate(prevText);
                contentExtensions.listControls_nextItemTemplateRenderer = Gordic.Templates.ensureTemplate(nextText); 
                contentExtensions._listControls_beforeMove = null;
                contentExtensions.listControls_setup = function (options) {
                    if (options == null) return;
                    var gridRemoteControl = this.gridRemoteControl;
                    if (options.gridRemoteControl) {

                        if (gridRemoteControl != null && gridRemoteControl !== options.gridRemoteControl) {
                            gridRemoteControl.turnOff();
                        }

                        gridRemoteControl = this.gridRemoteControl = options.gridRemoteControl;
                        gridRemoteControl.turnOn();
                        this._gridRemoteControlIsMoving = false;
                    }

                    if (gridRemoteControl) {
                        if (options.prevItemTemplate)
                            this.listControls_prevItemTemplateRenderer = Gordic.Templates.ensureTemplate(options.prevItemTemplate);

                        if (options.nextItemTemplate)
                            this.listControls_nextItemTemplateRenderer = Gordic.Templates.ensureTemplate(options.nextItemTemplate);

                        if (options.rowToDto != null && options.load == null) {
                            this.listControls_rowToDto = options.rowToDto;
                        } else if (options.load != null && options.rowToDto == null) {
                            this.listControls_loadState = options.load;
                        } else if (options.load != null && options.rowToDto != null) {
                            console.error("listControls_setup: Může být zadána pouze jedna z options: load nebo rowToDto!");
                        }


                        if (options.beforeMove != null)
                            this._listControls_beforeMove = options.beforeMove;

                        var _this = this;
                    
                        this._remoteGridState = gridRemoteControl.current();

                        this.gridRemoteControl.off(".gridrc"+this.id)
                        this.gridRemoteControl.on("gridrcmoved.gridrc" + this.id, function (newState) {

                            _this._remoteGridState = newState.state;
                            _this.listControls_updateCaptions();

                        });

                        this.off(".gridrc" + this.id);
                        this.on("close.gridrc"+this.id, function () {
                            if (!_this._gridRemoteControlIsMoving) {
                                gridRemoteControl.turnOff();
                                gridRemoteControl.off("gridrcmoved.gridrc" + _this.id);
                            }
                        });
                    }
                };

                contentExtensions.listControls_rowToDto = function (gridState) {
                    return gridState;
                };

                contentExtensions.listControls_updateCaptions = function () {
                    var gridState = this._remoteGridState;
                    this.actions.actListControlsPreviousRecord.update({
                        enabled: !!(gridState && gridState.prevRow != null),
                        caption: this.listControls_getCaption(false, gridState ? gridState.prevRow : null)
                    });

                    this.actions.actListControlsNextRecord.update({
                        enabled: !!(gridState && gridState.nextRow != null),
                        caption: this.listControls_getCaption(true, gridState ? gridState.nextRow : null)
                    });
                };

                contentExtensions.listControls_getCaption = function (isNext, row) {
                    if (row == null) return isNext ? nextText : prevText;
                    return isNext ? this.listControls_nextItemTemplateRenderer.render(row.data) : this.listControls_prevItemTemplateRenderer.render(row.data);
                };

                contentExtensions.listControls_previousRecord = function () {
                    if (this.gridRemoteControl && this._remoteGridState && this._remoteGridState.prevRow) {
                        this.listControls_tryMove(false);
                    }
                };

                contentExtensions.listControls_nextRecord = function () {
                    if (this.gridRemoteControl && this._remoteGridState && this._remoteGridState.nextRow) {
                        this.listControls_tryMove(true);
                    }
                };

                contentExtensions.listControls_tryMove = function (forward) {
                    var _this = this;
                    var retVal = true;
                    if (_this._listControls_beforeMove != null && $.isFunction(_this._listControls_beforeMove)) {
                        retVal = this._listControls_beforeMove();
                    }


                    if (!retVal || retVal && !$.isFunction(retVal.promise)) {
                        _this._gridRemoteControlIsMoving = true;
                        var remoteGridState = _this.gridRemoteControl.move(forward);
                        _this._remoteGridState = remoteGridState || _this._remoteGridState;

                        var loadResult = _this.listControls_loadState(remoteGridState);
                        if (loadResult != null && $.isFunction(loadResult.then)) {
                            loadResult.fail(function (retry) {
                                if (retry)
                                    _this.listControls_tryMove(forward);
                            });
                            loadResult.always(function () {
                                _this._gridRemoteControlIsMoving = false;
                            });
                        } else if (loadResult === true) {
                            _this.listControls_tryMove(forward);
                            _this._gridRemoteControlIsMoving = false;
                        } else {
                            _this._gridRemoteControlIsMoving = false;
                        }

                    } else if (retVal && $.isFunction(retVal.promise)) {
                        retVal.done(function (retVal) {
                            _this._gridRemoteControlIsMoving = true;
                            var remoteGridState = _this.gridRemoteControl.move(forward);
                            _this._remoteGridState = remoteGridState || _this._remoteGridState;

                            var loadResult = _this.listControls_loadState(remoteGridState);
                            if (loadResult != null && $.isFunction(loadResult.then)) {
                                loadResult.fail(function (retry) {
                                    if (retry)
                                        _this.listControls_tryMove(forward);
                                });
                                loadResult.always(function () {
                                    _this._gridRemoteControlIsMoving = false;
                                });
                            } else if (loadResult) {
                                _this.listControls_tryMove(forward);
                                _this._gridRemoteControlIsMoving = false;
                            } else {
                                _this._gridRemoteControlIsMoving = false;
                            }
                        });
                    }
                };

                contentExtensions.listControls_loadState = function (state) {
                    var _this = this;

                    if (state != null) {
                        var promise;

                        var result = this.listControls_rowToDto(state);
                        //is Promise?
                        if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
                            promise = result;
                        } else if (result === true || result === false) {
                            promise = $.Deferred().reject(result).promise();
                        } else {
                            promise = $.Deferred().resolve(result).promise();
                        }
                        
                        //added tryCloseAllChildContents, because of actually closing current detail and moving to other
                        //there were no destroy calls on subcontents and subwidgets previously... 
                        return promise.then(function (loadParams) {
                            if (loadParams instanceof Array && _this.className != null) {
                                _this.element.trigger('rememberinitialopen'); // remember what was opened before leaving current detail.
                               return _this.changeContext.apply(_this, loadParams);
                            } else {
                                return _this.tryCloseAllSignificants().then(function () {
                                    _this.element.trigger('rememberinitialopen'); // remember what was opened before leaving current detail.
                                    if (_this.className != null) {
                                       return _this.load(loadParams);
                                    } else if (_this.prepareContent != null) {
                                        _this.contentDiv.empty();
                                        _this.prepareContent(loadParams);
                                    } else {
                                        console.warn("ListControls cannot load new content, because content doesn't have class name and doesn't have prepareContent method.");
                                    }
                                });
                            }
                        });
                    }

                    return false;
                };

                result.actions.push(
                    { name: "actListControlsPreviousRecord", caption: prevText, icon: "gi-arrow gi-rot270", run: function () { $.content(this).listControls_previousRecord(); }, captionVisible: GAction.captionVisibility.never }, //RC 31700045 : Předchozí
                    { name: "actListControlsNextRecord", caption: nextText, icon: "gi-arrow gi-rot90", run: function () { $.content(this).listControls_nextRecord(); }, captionVisible: GAction.captionVisibility.never }//RC 31700046 : Následující
                );

                result.menubar.push(
                    { action: "actListControlsPreviousRecord", align: GMenu.menuRootAlignTypes.opposite, customClass: "g-list-controls__menu-bar", favorite: true },
                    { action: "actListControlsNextRecord", align: GMenu.menuRootAlignTypes.opposite, customClass: "g-list-controls__menu-bar", favorite: true }
                );

                return result;
            }
        },

    }, { extendIntellisense: GContent, pure: true });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinNotesComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinNotes: {
            /**
             * Creates sidePanel with Notes
             * @author vmaca,thazmuka
             * @since 02.03.2017.
             * @returns  Object with sidePanel definition ready for insert into content.
             */
            create: function (content, componentDto) {
                var result = { sidePanels: []};
                if (typeof componentDto.serverParams === "string") {
                    componentDto.serverParams = content[componentDto.serverParams];
                }

                // dsebesta - neudělal si to jako eventu na kteoru bych mohl dát lisner, tak mi nezbylo než to takhle učunačit
                var poznamkaChange = function (param, data) { //param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null
                    if (content && content.zmenaPoznamkyVUzivatelskychPoznamkach) {
                        content.zmenaPoznamkyVUzivatelskychPoznamkach(param, data);
                    }
                }

                var BadgeObject = new GObservableObject({ value: componentDto.count != null && componentDto.count > 0 ? componentDto.count.toString() : "" });
                var createNotes = function(element){
                    var GNotePanel = new Gordic.GNotePanel();
                    element.empty();

                    // *** todo: možnost dodělat pro sxs, typObj ***

                    // verze pro identifikátor ixp
                    if (componentDto.ixp !== undefined) {
                        GNotePanel.create(element, content, {
                            ixp: componentDto.ixp,
                            count: function (number) {
                                BadgeObject.value = number > 0 ?  String(number) : ""; BadgeObject.update();
                            },
                            change: poznamkaChange
                        }, !(componentDto.useColors == null ? true : componentDto.useColors));
                    }
                    // verze pro ostatní typy, které si sám zadáte v serverParams
                    else {
                        GNotePanel.create(element, content, {
                            sxs: componentDto.sxs,
                            typObj: componentDto.typObj,
                            count: function (number) {
                                BadgeObject.value = number > 0 ? String(number) : ""; BadgeObject.update();
                            },
                            className: componentDto.className,
                            serverParams: componentDto.serverParams,
                            change: poznamkaChange

                        }, !(componentDto.useColors == null ? true : componentDto.useColors) );
                    }

                    return GNotePanel;
                }

                var notePanel;

                result.sidePanels.push({
                    id: "panelNotes",
                    side: "right",
                    leaf: { caption: "jres:31700002", badge: BadgeObject, icon: "fa-sticky-note-o" }, //RC 31700002 : Uživ. poznámky
                    caption: "jres:31700003", //RC 31700003 : Uživatelské poznámky
                    visible: false,
                    minWidth: 400,
                    open: function (ev, ctx) { // fix pro reload detailu - sidebar neupdatuje customDiv
                        notePanel = notePanel || createNotes($(ev.target));
                    },
                });

                if (componentDto.className) {
                    result.onBuild = [function () {
                        var cnt = this;
                        cnt.loadingAwait.done(function () {
                            var serviceCnt = cnt.createServiceContent(GContent.createInitializer(componentDto.className, { serverParams: componentDto.serverParams }));
                            serviceCnt.call('List').done(function (data) {
                                BadgeObject.update({ value: data && data.length != null && data.length > 0 ? data.length.toString() : '' });
                            }).always(function () { serviceCnt.close(); });
                        });
                    }];
                }

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinNavigatorComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinNavigator: {
            /**
             * Outline navigator in sidepanel
             * @fires goutline_refresh
             * @author vmaca
             */
            create: function (content) {
                var title = "jres:31700047";//RC 31700047 : Navigátor
                content.element.off('.goutline');
                var result = { 
                    sidePanels: {
                        panelNavigator: {
                            side: "right",
                            leaf: { caption: title, icon: "fa-tasks" }, 
                            title: title,
                            open: function (ev, ctx) {
                                var customDiv = $(this);
                                if (!customDiv.hasClass("g-outline")) {
                                    customDiv.goutline().goutline(
                                        "bindForm",
                                        content.element,
                                        function (tree) {
                                            var forms = content.find(".header-form").findForms();

                                            if (forms.length > 0) {
                                                tree.splice(0, 0, { caption: "jres:31700048", point: forms[0] }); //RC 31700048 : Hlavička
                                            }
                                            return tree;
                                        });
                                    content.element.on("goutline_refresh.goutline", function (ev, ctx) { if (customDiv.hasClass("g-outline")) customDiv.goutline("refresh")});
                                }else{
                                    customDiv.goutline("refresh");
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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\DetailBuilderComponents\GGinCloseButtonComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinCloseButton: {
            /**
             * Adds closing button to commandbar
             * @author vmaca
             */
            create: function (componentDto) {
                var result = {
                    actions: {
                        actCloseButtonClick: {
                            caption: GDlg.mbbClose.text,
                            icon: "gi-window-close",
                            tooltip: GDlg.mbbClose.text,
                            customClass: "js-VlastaFocus ",
                            run: function () {
                                $.content(this).ginCloseButtonClick();
                            }
                        },
                    },
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        ginCloseButtonClick: function () {
                            this.tryClose();
                        }
                    },
                    commandBar: ["actCloseButtonClick"],
                    onInit: [function (builder) {
                        builder.moveComponentAfter("GinCloseButton");
                    }]
                };
                
                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

