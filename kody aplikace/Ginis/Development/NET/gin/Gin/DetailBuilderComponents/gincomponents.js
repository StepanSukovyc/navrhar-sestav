(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinHeaderForm: {
            create: function (componentDto) {

                var headerForm = Gordic.Gin.DetailBuilderComponents.GinHeaderFormLayout.create(componentDto).headerForm;

                var infoSection = Gordic.Gin.DetailBuilderComponents.GinHeaderFormInfoSection.create(componentDto).headerForm.form.sections;

                var dataSections = Gordic.Gin.DetailBuilderComponents.GinHeaderFormDataSections.create(componentDto).headerForm.form.sections;

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
                    headerForm: new Gordic.Forms.Form({ name: "formHeader", layoutDescriptor: "L{0}M{1}S{2}, ".format(LCount, MCount, SCount) + (dataSectionsCount >= 2 ? "L-3-9-0, M-12-12-0, S-12-12-0, " : "L-3-8-1, M-3-9-0, S-12-12-0, ") + "breaks-800-1190" })
                };
            }
        },
        GinHeaderFormInfoSection: {
            noPidSizes: [2,4,12], 
            pidSizes: [2,2,12],
            create: function (componentDto) {

                var hasPid = componentDto != null && componentDto.pid != null;
                var sizes = hasPid ? this.pidSizes : this.noPidSizes;
                var secClass = "w-L-{0} w-M-{1} w-S-{2}".format(sizes[0], sizes[1], sizes[2]);
                
                var headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                    .addSection({ name: "formHeaderInfoSection", customClass: secClass, layoutDescriptor: hasPid ? "L-0-12-0, M-0-12-0, S-0-12-0" : null });


                if (hasPid) {
                    headerForm.addRow({ name: "formHeaderRowPid" }).addField("gpidbar", { name: "formHeaderFieldPid", pid: componentDto.pid });
                } 

                return {
                    headerForm: headerForm
                };
            }
        },

        GinHeaderFormDataSections: {
            create: function (componentDto) {

                var headerForm = new Gordic.Forms.Form({ name: "formHeader" });

                var dataSectionsCount = componentDto != null ? componentDto.dataSectionsCount : 2;

                var hasPid = componentDto != null && componentDto.pid != null;
                var sizes = hasPid ? Gordic.Gin.DetailBuilderComponents.GinHeaderFormInfoSection.pidSizes : Gordic.Gin.DetailBuilderComponents.GinHeaderFormInfoSection.noPidSizes;

                var LCount = (12 - sizes[0])/dataSectionsCount;
                var MCount = ((12 - sizes[1])/dataSectionsCount)-2;
                var SCount = (12 - sizes[2])/dataSectionsCount;

                
              

                var sectionClass = "w-L-{0} w-M-{1} w-S-{2}".format(LCount, MCount, SCount);

                var sectionName = "formHeaderSection";
                if (componentDto == null || componentDto.dataSectionsCount >= 1)
                    headerForm.addSection({ name: sectionName + "One", customClass: sectionClass });
                if (componentDto == null || componentDto.dataSectionsCount >= 2)
                    headerForm.addSection({ name: sectionName + "Two", customClass: sectionClass });
       
              
                return {
                    headerForm: headerForm
                };

            }
            // code
        }

    }, { extendIntellisense: GContent, pure: true });
})(jQuery);
(function ($) {
    "use strict";
    var historieConstructor;

    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinHistory: {

            create: function (componentDto) {
            /// <summary> Creates a definition of button and openAction for ginHistory.</summary>
            /// <remarks> Vmaca, 02.03.2017. </remarks>
            /// <returns> Object with actionDefinitions and menuBarDefinitions ready for insert into content. </returns>

                var actName = "actHistoryOpen";

                var result = { actions: [], menuBar: [actName]};

                result.actions.push({
                    name: actName,
                    run: function () {
                        var dto = { InputDto: typeof componentDto.HistoryTargetDto === "string" ? $.content(this)[componentDto.HistoryTargetDto] : componentDto.HistoryTargetDto };

                        if (componentDto.IxsFunAkt != null && dto.InputDto && dto.InputDto.ixs_fun_akt == null) {
                            if (dto.InputDto) {
                                dto.InputDto.ixs_fun_akt = componentDto.IxsFunAkt;
                            }
                        }

                        $.content(this).dialogs.showWindow(componentDto.HistoryTargetClass, dto, componentDto.HistoryTitle, 600, 600);
                    },
                    caption: componentDto.HistoryTitle,
                    icon: "gi-history"
                });

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinListControls: {
            create: function (content) {

                var result = { contentExtensions: {}, actions: [], statusBar: [], texts: {}, onBuild: [] };

                result.contentExtensions.listControls_prevItemTemplateRenderer = Gordic.Templates.ensureTemplate("Předchozí");
                result.contentExtensions.listControls_nextItemTemplateRenderer = Gordic.Templates.ensureTemplate("Následující");
                result.onBuild.push(function () {
                    this.listControls_updateCaptions();
                });
                result.contentExtensions.listControls_setup = function (options) {

                    if (options == null) return;

                    if (options.gridRemoteControl) {
                        this.gridRemoteControl = options.gridRemoteControl;
                    }

                    if (this.gridRemoteControl) {
                        if (options.prevItemTemplate)
                            this.listControls_prevItemTemplateRenderer = Gordic.Templates.ensureTemplate(options.prevItemTemplate);

                        if (options.nextItemTemplate)
                            this.listControls_nextItemTemplateRenderer = Gordic.Templates.ensureTemplate(options.nextItemTemplate);

                        if (options.rowToDto) {
                            this.listControls_rowToDto = options.rowToDto;
                        }


                        var _this = this;
                    
                        this._remoteGridState = this.gridRemoteControl.current();

                        this.gridRemoteControl.on("gridrcchange", function (newState) {

                            _this._remoteGridState = newState;
                            _this.listControls_updateCaptions();

                        });

                        this.close(function () { this.gridRemoteControl.turnOff(); });

                    }
                };

                result.contentExtensions.listControls_rowToDto = function (gridState) {
                    return gridState;
                };

                result.contentExtensions.listControls_updateCaptions = function () {
                    this.actions.actListControlsPreviousRecord.update({
                        enabled: this._remoteGridState && this._remoteGridState.prevRow ? true : false,
                        caption: this.listControls_getCaption(false, this._remoteGridState ? this._remoteGridState.prevRow : null)
                    });

                    this.actions.actListControlsNextRecord.update({
                        enabled: this._remoteGridState && this._remoteGridState.nextRow ? true : false,
                        caption: this.listControls_getCaption(true, this._remoteGridState ? this._remoteGridState.nextRow : null)
                    });
                };

                result.contentExtensions.listControls_getCaption = function (isNext, row) {
                    if (row == null) return "";
                    return isNext ? this.listControls_nextItemTemplateRenderer.render(row.data) : this.listControls_prevItemTemplateRenderer.render(row.data);
                };

                result.contentExtensions.listControls_previousRecord = function () {
                    if (this.gridRemoteControl && this._remoteGridState && this._remoteGridState.prevRow) {
                        var loadParams = this.gridRemoteControl.move(false);
                        this.listControls_loadState(loadParams);
                    }
                };

                result.contentExtensions.listControls_nextRecord = function () {
                    if (this.gridRemoteControl && this._remoteGridState && this._remoteGridState.nextRow) {
                        var loadParams = this.gridRemoteControl.move(true);
                        this.listControls_loadState(loadParams);
                    }
                };

                result.contentExtensions.listControls_loadState = function (state) {

                    if (state != null) {
                        this._remoteGridState = state;
                        var result = this.listControls_rowToDto(state);
                        //is Promise?
                        if (!!result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
                            var _this = this;
                            result.done(function (data) { _this.load(data); });
                        } else {
                            this.load(result);
                        }

                    }

                };
                result.actions.push(
                    { name: "actListControlsPreviousRecord", caption: "Předchozí", icon: "gi-arrow gi-rot270", run: function () { $.content(this).listControls_previousRecord(); }, enabled: content._remoteGridState != null && content.gridRemoteControl != null && content._remoteGridState.prevRow != null, /* visible: content.gridRemoteControl != null ? true : false,*/ captionVisible: GAction.captionVisibility.never },
                    { name: "actListControlsNextRecord", caption: "Následující", icon: "gi-arrow gi-rot90", run: function () { $.content(this).listControls_nextRecord(); }, enabled: content._remoteGridState != null && content.gridRemoteControl != null && content._remoteGridState.nextRow != null, /*visible: content.gridRemoteControl != null ? true : false,*/ captionVisible: GAction.captionVisibility.never }//RC 26225590 : Další
                );

                result.statusBar.push(
                    { action: "actListControlsPreviousRecord", align: GMenu.menuRootAlignTypes.opposite, favorite: true },
                    { action: "actListControlsNextRecord", align: GMenu.menuRootAlignTypes.opposite, favorite: true }
                );

                

                return result;
            }
        },

    }, { extendIntellisense: GContent, pure: true });
})(jQuery);
(function ($) {
    "use strict";
    var historieConstructor;

    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinNotes: {

            create: function (content, componentDto) {
            /// <summary> Creates a definition of button and openAction for wflHistorie.</summary>
            /// <remarks> Vmaca, 02.03.2017. </remarks>
            /// <returns> Object with actionDefinitions and statusBarDefinitions ready for insert into content. </returns>

                var result = { sidePanels: []};
                if (typeof componentDto.serverParams === "string") {
                    componentDto.serverParams = content[componentDto.serverParams];
                }

                var BadgeObject = new GObservableObject({ value: "?" });

                result.sidePanels.push({
                    id: "panelNotes",
                    side: "right",
                    leaf: { caption: "jres:31700002", badge: BadgeObject }, //RC 31700002 : Poznámky
                    caption: "jres:31700003", //RC 31700003 : Poznámky
                    visible: false,
                    minWidth: 300,
                    width: 400,
                    customDiv: $("<div>").gnotes(componentDto, { count: function (ev, cnt) { BadgeObject.value = String(cnt); BadgeObject.update(); } }),

                });

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);