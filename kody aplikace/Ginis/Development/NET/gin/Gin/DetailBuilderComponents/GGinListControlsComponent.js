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