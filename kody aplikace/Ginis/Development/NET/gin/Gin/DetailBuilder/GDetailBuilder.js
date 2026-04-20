(function ($) {
  'use strict';

    var BaseBuilder;
    var tabUUID = 0;

  namespace('Gordic.Gin.DetailBuilder', {
      classes: {
          header: 'db-header',
          tabmanager: 'db-tabmanager',
          loadImmediate: 'js-db-loadimmediate'
      },
    _create: BaseBuilder = CreateClass({

      _constructor: function (content) {
        $.extend(this, new GEvents());

        if (!(content instanceof GContent)) {
          throw new GError('Argument "content" has to be type of GContent');
        }

        this.content = content;
        // components stores
        this.components = [];
            
        this.buildTabsDeffered = $.Deferred();
        this.delayedActionsDeffereds = [];
        this.tabsInitDeffereds = [];
        this.disabledDefinitions = [];

        // definition stores
        this.texts = {};
        this.actionDefinitions = [];
        this.kpiDefinitions = [];
        this.subContentDefinitions = [];
        this.menuBarDefinitions = [];
        this.statusBarDefinitions = [];
        this.commandBarDefinitions = [];
        this.tabDefinitions = [];
        this.tabGroupDefinitions = [];
        this.onMenuBuilds = [];

        this.activeOpEvents = [];
        this.onBuilds = [];
        this.onInits = [];
        this.headerFormDefinition = null;
        this.headerFormArray = [];
        this.idMaps = {}; // maps of ids in menu/status/command bars

        this.kpiTabOptions = {
          opened: true,
        };
        this.kpiPanelOptions = {
          name: 'kpipanel',
    /*      sortable: true,*/
          mode: 'inline',
          defaultSelected: false,
        };
        this.sideBarOptions = {
          left: { visible: false, },
          right: { visible: false, },
          userSettings: this.content.userSettings,
        };
        this.autofocusSelector = null;

        this.headerTargetElement = null;
        this.tabsTargetElement = null;
        this.kpisTargetElement = null;
        this.tabManagerOptions = {};
        this.tabManagerTargetElement = null;

        this.kpisGroupPropertyName = 'kpis';
        this.tabsGroupPropertyName = 'tabs';
        this.tabGroupsGroupPropertyName = 'tabGroups';
        this.statusesGroupPropertyName = 'statuses';
        this.menusGroupPropertyName = 'menus';
        this.commandsGroupPropertyName = 'commands';

        // shortcuts
        this.wc = this.withComponent;
        this.re2c = this.registerEventsToContent;
        this.b = this.build;

        console.debug('DetailBuilder created');
      },

      /**
       * Add component to build process.
       *
       * @author  Vmaca
       * @date    09.03.2017
       *
       * @param {String} id           The identifier of component.
       * @param {IGDetailBuilderComponent} component    The component.
       * @param {boolean} [toStart] Add to start?
       *
       * @return {IGDetailBuilder} builder
       **/
      withComponent: function (id, component, toStart) {
        var componentObj = this._prepareComponentObject(id, component);
        console.debug('Added component: ' + id);

        if (!toStart) {
          this.components.push(componentObj);
        } else {
          this.components.unshift(componentObj);
        }

        return this;
      },
      /**
       * Removes component from build process;
       * @param {String} id The identifier of component.
       * @returns {IGDetailBuilder} builder
       */
      withoutComponent: function (id) {
        var itemInfo = this._getComponentInfo(id);

        if (itemInfo) {
          itemInfo.array.splice(itemInfo.index, 1);
          return this;
        }
        console.debug('Component \'' + id + '\' not found.');
        return this;
      },
      /**
       * Finds component by id and returns it
       * @param {String} id The identifier of component.
       * @returns {IGDetailBuilderComponent} component.
       */
      getComponent: function (id) {
        var result = this._getComponentInfo(id);
        if (result && result.component) {
          return result.component;
        }
        return null;
      },

      _prepareComponentObject: function (id, component) {
        var componentObj = { id: id, };
        if (this._isPromise(component)) {
          componentObj.dataPromise = component;
        } else {
          componentObj.data = component;
        }

        return componentObj;
      },

      _getComponentInfo: function (id) {
        var result = { id: id, array: this.components, };
        result.index = this.components.findIndex(function (item) {
          return item.id === id;
        });

        if (result.index >= 0) {
          var componentObj = this.components[result.index];
          if (componentObj.data) {
            result.component = componentObj.data;
          } else {
            result.component = componentObj.dataPromise;
          }
          return result;
        }

        return null;
      },

      _removeComponent: function (id) {
        var itemInfo = this._getComponentInfo(id);

        if (itemInfo) {
          return itemInfo.array.splice(itemInfo.index, 1)[0];
        }

        return null;
      },

      /**
       * Inserts definition a before definition described by ID. Specify items to insert as arguments
       * after id.
       *
       * @author  Vmaca
       * @date    09.03.2017
       *
       * @param {String} id   The identifier of target definition.
       * @param {String} newComponentId Id of component to insert.
       * @param {Object} newComponentObject Component object with definitions to insert.
       *
       * @return  {Bool} true if item was inserted, false otherwise.
      **/
      insertBeforeComponent: function (id, newComponentId, newComponentObject) {

        var itemInfo = this._getComponentInfo(id);

        if (itemInfo) {
          Array.prototype.splice.apply(itemInfo.array,
            [itemInfo.index, 0].concat(
              this._prepareComponentObject(newComponentId, newComponentObject)
            ));
          return true;
        }

        return false;
      },

      /**
       * Inserts definition or multiple definitions after definition described by ID. Specify items to insert as arguments after id.
       *
       * @author  Vmaca
       * @date    09.03.2017
       *
       * @param {String} id   The identifier of target definition.
       * @param {String} newComponentId Id of component to insert.
       * @param {Object} newComponentObject Component object with definitions to insert.
       *
       * @return  {Bool} true if item was inserted, false otherwise.
      **/
      insertAfterComponent: function (id, newComponentId, newComponentObject) {
        var itemInfo = this._getComponentInfo(id);

        if (itemInfo) {
          Array.prototype.splice.apply(itemInfo.array,
            [itemInfo.index + 1, 0].concat(
              this._prepareComponentObject(newComponentId, newComponentObject)
            ));

          return true;
        }

        return false;
      },

      /**
       * Moves component before target component.
       * @param {string} componentIdToMove ID of component to move.
       * @param {string} targetComponentId Id of target Component.
       */
      moveComponentBefore: function (componentIdToMove, targetComponentId) {
        var componentToMove = this._removeComponent(componentIdToMove);

        if (componentToMove) {
          if (!this.insertBeforeComponent(targetComponentId,
            componentToMove.id, componentToMove.data)) {
            this.components.push(componentToMove);
          }
        }
      },

      /**
       * Moves component after target component.
       * @param {string} componentIdToMove ID of component to move.
       * @param {string} targetComponentId Id of target Component.
       */
      moveComponentAfter: function (componentIdToMove, targetComponentId) {
        var componentToMove = this._removeComponent(componentIdToMove);

        if (componentToMove) {
          if (!this.insertAfterComponent(targetComponentId,
            componentToMove.id, componentToMove.data)) {
            this.components.push(componentToMove);
          }
        }
      },

      /**
       * Registers functions onDetailBuilderInit and onDetailBuilderBuild to be called during build process.
       * @returns {IGDetailBuilder} builder
       */
      registerEventsToContent: function () {
        if (typeof this.content.onDetailBuilderInit === 'function') {
          this.callContentBuilderInit = true;
        }

        if (typeof this.content.onDetailBuilderBuild === 'function') {
          this.callContentBuilderBuild = true;
        }
       
        return this;
      },

      build: function () {
        var _this = this;
        if (this.content.closed) return $.Deferred().reject().promise();
        this.content.beginOperation('jres:31700004'); //RC 31700004 : Načítání ...
        _this.content.element.trigger("detailbuilderstarted");

        // --------------- INIT PHASE PREPARE ----------------
        // register default components
        this.withComponent(Gordic.Gin.DetailBuilderComponents.GGinDetailRemembering.componentName, Gordic.Gin.DetailBuilderComponents.GGinDetailRemembering.create());

        // get data from components, which are defined by promise.
        var componentsToResolve = this.components.filter(function (obj) {
          return obj.dataPromise !== undefined;
        });

        var promiseChain = $.Deferred().resolve().promise();
        for (var i = 0, l = componentsToResolve.length; i < l; i++) {
          (function (num) {
            promiseChain = promiseChain.then(function () {
              return componentsToResolve[num].dataPromise;
            }).then(function (result) {
              componentsToResolve[num].data = result;
            });
          })(i);
        }

        return promiseChain.then(function () {
              // --------------- INIT PHASE READY ----------------
              _this.trigger('beforeInit', [_this]);
              if (_this.callContentBuilderInit) {
                  _this.content.onDetailBuilderInit(_this);
              }
          }).then(function () {
          // --------------- INIT PHASE COMPLETE ----------------

              _this._mergeComponents();
              return _this;
          }).then(function () {
              // --------------- BUILD PHASE READY ----------------

              for (var idx in _this.onInits) { // musí být zde, protože až tady je onInits naplněno
                  _this.onInits[idx].call(_this.content, _this);
              }
              return _this;
          }).then(function () {
              _this.trigger('beforeBuild', [_this]);

              if (_this.callContentBuilderBuild) {
                  _this.content.onDetailBuilderBuild(_this);
              }
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildActiveOpEvents();
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildTexts();
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildActions(_this.content.actions);
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildHeaderForm();
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildKpis();
              return _this;
          }).then(function () {
              _this._checkContent();
              return _this._buildSidePanels() || _this;
          }).then(function () {
              _this._checkContent();
              _this._buildTabGroups();
              return _this;
          }).then(function () {
              _this._checkContent();
              return _this._buildTabs() || _this;
          }).then(function () {
              _this._checkContent();
              return $.when.apply(null, _this.tabsInitDeffereds)
          }).then(function () {
              _this._checkContent();
            if (_this.tabManagerTargetElement != null) {
              _this.tabManagerTargetElement
                .find('.db_subtasks')
                .gsubtasks('setActive', 0, true);
            }

              _this.buildTabsDeffered.resolve(); // notify, that tabs are build and delayed actions can be fetched
            return _this;
          }).then(function () {
              _this._checkContent();
              return $.when.apply(null, _this.delayedActionsDeffereds)
          }).then(function () {
              _this._checkContent();
             _this._prepareMenusForBuild();

              var menus = { menuBar: _this.menuBarDefinitions, statusBar: _this.statusBarDefinitions, commandBar: _this.commandBarDefinitions };

              for (var i = 0, l = _this.onMenuBuilds.length; i < l; i++) {
                  _this.onMenuBuilds[i].call(_this.content, _this, menus);
              }
              _this.trigger('beforeMenuBuild', [_this, menus]);

              _this.menuBarDefinitions = menus.menuBar;
              _this.statusBarDefinitions = menus.statusBar;
              _this.commandBarDefinitions = menus.commandBar;
              _this._prepareMenusForBuild(); // one more time because they might have changed
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildMenuBar(); // delayed loading of required sub-contents is done, we can build menubar and statusbar, which may need some actions from sub-contents.
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildStatusBar();
              return _this;
          }).then(function () {
              _this._checkContent();
              _this._buildCommandBar();
              return _this;
          }).then(function () {
              _this._checkContent();
              var promiseChain = $.when();
              for (var i = 0, l = _this.onBuilds.length; i < l; i++) {
                  (function (num) { 
                      promiseChain = promiseChain.then(function () { _this.onBuilds[num].call(_this.content, _this); });
                  })(i)
              }
              return promiseChain;
          }, function (err) {
              console.debug('Builder init has failed.');
              console.debug(err);
              throw err;
          }).then(function () {
              _this._checkContent();
              _this.idMaps = {};
              _this._handleFocus();
              _this.content.endOperation();
          }).always(function () {
              _this.content.element.trigger("detailbuilderfinished");
          });
      },
        _checkContent: function () {
            if (this.content.closed)
                throw new GError({ target: "hidden" })
        },
      // #region ------------------------ Init ------------------------

      // #region ------------------------ Internal Init ------------------------
      _mergeComponents: function () {

        for (var componentIndex in this.components) {
          var concreteComponent = this.components[componentIndex];

          for (var key in concreteComponent.data) { // mapping from inconsistent input to inner structures
            var normalizedKey = key.toLowerCase();

            switch (normalizedKey) {
              case 'contentextensions':
                this._mergeContentExtensions(concreteComponent, key,
                  'contentExtensions');
                break;
              case 'texts':
                this._mergeTexts(concreteComponent, key, 'texts');
                break;
              case 'headerform':
                this._mergeForm(concreteComponent, key, 'headerFormDefinition');
                break;
              case 'actions':
                this._mergeActions(concreteComponent, key, 'actionDefinitions');
                break;
              case 'menu_bar':
              case 'menubar':
                this._mergeMenuBar(concreteComponent, key,
                  'menuBarDefinitions');
                break;
              case 'status_bar':
              case 'statusbar':
                this._mergeStatusBar(concreteComponent, key,
                  'statusBarDefinitions');
                break;
              case 'tabgroups':
              case 'subtasks':
                if (normalizedKey === 'subtasks') {
                  console.warn('[OBSOLETE] Klíč subtasks v definici tabu byl nahrazen klíčem tabGroups!', concreteComponent);
                }
                this._mergeSubTasks(concreteComponent, key,
                  'tabGroupDefinitions');
                break;
              case 'command_bar':
              case 'commandbar':
                this._mergeCommandBar(concreteComponent, key,
                  'commandBarDefinitions');
                break;
              case 'tabs':
                this._mergeTabs(concreteComponent, key, 'tabDefinitions');
                break;
              case 'kpis':
                this._mergeKpis(concreteComponent, key, 'kpiDefinitions');
                break;
              case 'sidepanels':
                this._mergeSidePanels(concreteComponent, key,
                  'subContentDefinitions');
                break;
              case 'subcontents':
                this._mergeSubContents(concreteComponent, key,
                  'subContentDefinitions');
                break;
              case 'onmenubuild':
                this._mergeOnMenuBuilds(concreteComponent, key, 'onMenuBuilds');
                break;
              case 'onbuild':
                this._mergeOnBuilds(concreteComponent, key, 'onBuilds');
                break;
              case 'oninit':
                this._mergeOnInits(concreteComponent, key, 'onInits');
                    break;
              case 'activeOpEvents':
                case 'activeopevents':
                this._mergeActiveOpEvents(concreteComponent, key, 'activeOpEvents');
                break;

            }
          }
        }
      },

      _mergeContentExtensions: function (concreteComponent, key, builderProperty) {
        var prop;
        if ((prop = concreteComponent.data[key]) &&
          typeof prop === 'object') {
          $.extend(true, this.content, prop);
        }
      },

      _mergeTexts: function (concreteComponent, key, builderProperty) {
        this._mergeObjects(concreteComponent, key, builderProperty);
      },

      _mergeActions: function (concreteComponent, key, builderProperty) {
        this._mergeDefinitionArrays(concreteComponent, key,
          builderProperty, 'name');
      },

      _mergeMenuBar: function (concreteComponent, key, builderProperty) {

        this._mergeComponentMenuParams(concreteComponent, key,
          this[builderProperty], GDbd.DefinitionKind.MenuBar);
        // this._mergeDefinitionArrays(concreteComponent, key, builderProperty);
      },

      _mergeStatusBar: function (concreteComponent, key, builderProperty) {
        this._mergeComponentMenuParams(concreteComponent, key,
          this[builderProperty], GDbd.DefinitionKind.StatusBar);
      },

      _mergeCommandBar: function (concreteComponent, key, builderProperty) {
        this._mergeComponentMenuParams(concreteComponent, key,
          this[builderProperty], GDbd.DefinitionKind.CommandBar);
      },

      _mergeForm: function (concreteComponent, key, builderProperty) {
        if (concreteComponent.data[key]) {
          this[builderProperty] = concreteComponent.data[key];
          this.headerFormArray =
            this[builderProperty] != null ? [this[builderProperty].form] : [];
        }
      },
      _mergeTabs: function (concreteComponent, key, builderProperty) {
        this._mergeDefinitionArrays(concreteComponent, key,
          builderProperty, 'id');
      },

      _mergeKpis: function (concreteComponent, key, builderProperty) {
        this._mergeDefinitionArrays(concreteComponent, key,
          builderProperty, 'name');
      },

      _mergeSidePanels: function (concreteComponent, key, builderProperty) {
        this._mergeDefinitionArrays(concreteComponent, key,
          builderProperty, 'id');
        },

      _mergeSubContents: function (concreteComponent, key, builderProperty) {
          this._mergeDefinitionArrays(concreteComponent, key,
                builderProperty, 'id');
      },

      _mergeSubTasks: function (concreteComponent, key, builderProperty) {
        this._mergeDefinitionArrays(concreteComponent, key,
          builderProperty, 'id');
      },

      _mergeDefinitionArrays: function (concreteComponent, definitionArrayName, builderArrayName, idPropertyName, executeFunctions) {
        if (!builderArrayName) {
          builderArrayName = definitionArrayName;
        }

        var prop;
        if ((prop = concreteComponent.data[definitionArrayName]) &&
          this[builderArrayName] instanceof Array) {

          if (prop instanceof Array) {
            for (var i = 0, ii = prop.length; i < ii; i++) {
                var item = typeof prop[i] === "function" && executeFunctions !== false ? prop[i](this) : prop[i];
                this[builderArrayName].push(item);
            }
          } else if (typeof prop === 'object') {
            var keys = Object.keys(prop);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var item = typeof prop[key] === "function" && executeFunctions !== false ? prop[key](this) : prop[key];

                if (item[idPropertyName] == null) {
                    item[idPropertyName] = key;
                }

                this[builderArrayName].push(item);
            }
          }
        }
        },

      _mergeComponentMenuParams: function (concreteComponent, definitionArrayName, targetArray, prefix) {
        this._mergeMenuParams(concreteComponent.id, concreteComponent.data[definitionArrayName], targetArray, prefix);
      },

      /**
       *  _mergeMenuParams
       * @param {any} componentName name of component
       * @param {any} source name of source array
       * @param {any} targetArray target array
       * @param {any} prefix prefix
       * @param {any} globalIDMapName map of id=>name
       */
      _mergeMenuParams: function (componentName, source, targetArray, prefix, globalIDMapName) {
        var prop;
        if ((prop = source) && targetArray instanceof Array) {

          if (!$.isArray(prop) && typeof prop === 'object') {
            var arr = [];

            for (var key in prop) {
              if (prop[key].id == null) {
                prop[key].id = key;
              }
              arr.push(prop[key]);
            }

            prop = arr;
          }

          if (prop instanceof Array) {
            var idMap = {};
            if (globalIDMapName !== null && globalIDMapName == null) {
              globalIDMapName = prefix;

            }

            if (globalIDMapName === null) {
              idMap = {};
            } else {
              idMap = this.idMaps[prefix] = this.idMaps[prefix] || {};
            }

            var ctx = {
              sta: 0, sep: 0, act: 0, idMap: idMap, parentName: null,
            };
            while (prop.length) {
              this._addParamItem(prefix, targetArray,
                prop.shift(), componentName, ctx);
            }
          }
        }
      },

      _addParamItem: function (prefix, list, c, cId, ctx) {
        /**
         * Menu bez id s akcí mají id menu+(název akce bez act) (pokud je stejná akce použita několikrát, další akce mají na konci navíc číslování)
         * Menu bez id bez akce mají vždy (pro root = menu+komponenta,zanořené = parentName)+(Static/Separator)+(# staticu/separatoru v dané úrovni)
         * @param {string} prefix menu, status, command
         * @param list result list of menuParams
         * @param c menuParam to process
         * @param cId id of component to add to paramId
         * @param ctx counters for static-items(sta) and separators(sep) and actions(act) and idMap to track existing IDs
         */

          var it = null, int = {}, generatedId = false;
        if ($.isPlainObject(c) || c instanceof GObservableObject) { // definice menuParam jako object
          if (!c.action && !c.type && c.caption) {
            c.type = 'static';
          }
          if (!c.id) { // no id -> generate some
            if (c.action) {
              var name = typeof c.action === 'string' ?
                c.action.substring(3) : c.action.name.substring(3);
              c.id = prefix + name;
            } else {
              c.id = (ctx.parentName !== null ? ctx.parentName : prefix + cId) +
                'Static' + String(ctx.sta++);
            }
            generatedId = true;
          }

          var existing = this._getExistingId(c.id, ctx.idMap);
          var newCtx;
          if (existing !== null && !generatedId) {
            // add children to existing element if there are any
            if (c.children) {
              if (!existing.children) {
                existing.children = [];
              }

              newCtx = {
                sta: 0, sep: 0, act: ctx.act,
                idMap: ctx.idMap, parentName: c.id,
              };

              while (c.children.length) {
                this._addParamItem(prefix, existing.children,
                  c.children.shift(), cId, newCtx);
              }
              ctx.act = newCtx.act;
            }

            it = existing;

          } else {
            if (existing !== null) { // same action used multiple times - add number to end
              c.id = c.id + ctx.act++;
            }

            it = c;

            list.push(c);
            ctx.idMap[it.id] = it;

            if (it.children) {
              var prev = $.extend({}, c);
              it.children = [];
              newCtx = {
                sta: 0, sep: 0, act: ctx.act,
                idMap: ctx.idMap, parentName: c.id,
              };
              while (prev.children.length) {
                this._addParamItem(prefix, it.children, prev.children.shift(), cId, newCtx);
              }
              ctx.act = newCtx.act;
            }
          }

        } else if (c instanceof GAction) { // menuParam definovane pouze akci
          list.push(it = { id: prefix + cId + c.name.substring(3), action: c, });
        } else if (typeof c === 'string') { // menuParam definovane stringem
            if (c.endsWith("!")) { int.primary = true; c = c.slice(0, -1); }  // favorite definovana v textu
            if (c.endsWith("*")) { int.favorite = true; c = c.slice(0, -1); }  // favorite definovana v textu
            if (c.startsWith(">")) { int.autofocus = true; c = c.slice(1); }  // autofocus
            if (c.startsWith("<")) { int.align = "opposite"; c = c.slice(1); }  // opposite definovana v textu
          if (c === '-') list.push(it = { id: (ctx.parentName !== null ? ctx.parentName : prefix + cId) + 'Separator' + String(ctx.sep++), type: 'separator' }); //separator
          else if (c.startsWith('act')) { list.push(it = { id: prefix + c.substring(3), action: c, }); } // nazev akce
          else list.push(it = { id: (ctx.parentName !== null ? ctx.parentName : prefix + cId) + 'Static' + String(ctx.sep++), type: 'static', caption: c }); //static menuItem.
        } else if ($.isArray(c)) {
          it = this._addParamItem(prefix, list, c.shift(), cId, ctx);
          it.children = [];
          var itCtx = { sta: 0, sep: 0, act: ctx.act, idMap: ctx.idMap, parentName: it.id, };
          while (c.length) { this._addParamItem(prefix, it.children, c.shift(), cId, itCtx); }
          ctx.act = itCtx.act;
        }

        if (it) it = $.extend(it, int);
        return it;
      },
      _getExistingId: function (id, mapOfExistings) {
        var r = Object.keys(mapOfExistings).filter(function (it) {
          return it === id;
        });

        if (r.length > 0) {
          return mapOfExistings[r[0]];
        }

        return null;
      },

      _mergeObjects: function (concreteComponent, objectName, builderObjectName) {
        if (!builderObjectName) {
          builderObjectName = objectName;
        }

        var prop;
        if ((prop = concreteComponent.data[objectName]) &&
          typeof prop === 'object' &&
          typeof this[builderObjectName] === 'object') {
          $.extend(this[builderObjectName], prop);
        }
      },

      _mergeOnMenuBuilds: function (concreteComponent, objectName, builderObjectName) {
          this._mergeDefinitionArrays(concreteComponent, objectName, builderObjectName,void 0, false);
      },

      _mergeOnBuilds: function (concreteComponent, objectName, builderObjectName) {
          this._mergeDefinitionArrays(concreteComponent, objectName, builderObjectName, void 0, false);
      },

      _mergeOnInits: function (concreteComponent, objectName, builderObjectName) {
          this._mergeDefinitionArrays(concreteComponent, objectName, builderObjectName, void 0, false);
        },
      _mergeActiveOpEvents: function (concreteComponent, objectName, builderObjectName) {
          this._mergeDefinitionArrays(concreteComponent, objectName, builderObjectName, void 0, false);
          var arr = this[objectName];
          this[objectName] = arr.filter(function (it, idx) { return arr.indexOf(it) === idx });
      },
      // #endregion
      // #endregion

      // #region ------------------------ Build -----------------------

      /*       destroy: function(){

                this.content = null;

                delete this.components;

                delete this.delayedActionsDeffereds;
                delete this.disabledDefinitions;

                delete this.texts;
                delete this.actionDefinitions;
                delete this.menuBarDefinitions;
                delete this.kpiDefinitions;
                delete this.kpiTabOptions;
                delete this.kpiPanelOptions;
                delete this.sideBarOptions;

                delete this.sidePanelDefinitions;
                delete this.statusBarDefinitions;
                delete this.commandBarDefinitions;
                delete this.tabDefinitions;

                delete this.headerTargetElement;
                delete this.tabsTargetElement;
                delete this.kpisTargetElement;
             },
 */
      // #region ----------------- Internal Build ---------------------
      _buildTexts: function () {
        if (!this.content.texts) {
          this.content.texts = {};
        }

        $.extend(this.content.texts, this.texts);
      },

      _buildActions: function (targetActionList) {
        for (var i = 0, l = this.actionDefinitions.length; i < l; i++) {
          var act = this.actionDefinitions[i];
          if (typeof act.run === 'string') {
            (function () {
              eval('this.run=' + this.run);
            }).call(act);
          }

          targetActionList.add(act);
        }
      },

      _buildHeaderForm: function () {
        if (this.headerFormDefinition == null ||
          this.headerFormArray.length === 0) {
          return;
        }

        if (this.headerTargetElement === null) {
            this.headerTargetElement =
                $.newDiv(Gordic.Gin.DetailBuilder.classes.header)
              .appendTo(this.content.contentDiv);
        }

        this.headerFormDefinition.form =
          this.headerFormArray.length > 0 ? this.headerFormArray[0] : null;

          $.newDiv('header-form').appendTo(this.headerTargetElement)
          .gform('createFrom', this.headerFormDefinition);
      },

      _buildTabGroups: function () {
        if (this.tabManagerTargetElement === null) {
          this.tabManagerTargetElement =
            this.headerTargetElement || $(this.content.contentDiv);
        }

        if (this.tabManagerOptions === false) {
          return;
        }

        this.tabManagerOptions.groups = this.tabGroupDefinitions;
        this.tabManagerOptions.scopeElement = this.content.element;
          this.tabManagerOptions.buildOnCreate = false;

          if (this.tabManagerOptions.groups && this.tabManagerOptions.groups.length > 0) {
              var dict = this.content[this.tabGroupsGroupPropertyName] = {};

              this.tabManagerOptions.groups = this.tabManagerOptions.groups.map(function (it) { return dict[it.id] = new GObservableObject(it); })
          }

          var div = $.newDiv(Gordic.Gin.DetailBuilder.classes.tabmanager)
          .appendTo(this.tabManagerTargetElement)
          .gtabmanager(this.tabManagerOptions);

          this.content.off(".gdbtabinit");
          this.content.on('gtabinit.gdbtabinit', function () {
              if (div.hasClass("gtabmanager"))
                  div.gtabmanager('refresh');
          });

          //v tabech se registruje refresh na onBuilds
      },

      _buildTabs: function () {
        var _this = this;

        if (this.tabsTargetElement === null) {
          this.tabsTargetElement = $(this.content.contentDiv);
        }

        var tabs = {};
        var tabManager = null;
        if (_this.tabManagerTargetElement && _this.tabManagerOptions !== false) {
            tabManager = _this.tabManagerTargetElement.find('.gtabmanager');
        }

          var promiseChain = $.when();

          var buildTab = function (tab, div) {
              tab.id = tab.id || "tab" + (tabUUID++);
          tabs[tab.id] = div;

          div.attr('data-param-id', tab.id).appendTo(this.tabsTargetElement);

            if (tab.init && typeof tab.init === 'function') {
                if (tab.tabParams && tab.initLazy === true) {
                    div.off("gtabcustomload.gdbd-init")
                    div.on("gtabcustomload.gdbd-init", function (ev) {
                        if (ev.target != div.get(0)) return;
                        tab.init(div);
                        div.off("gtabcustomload.gdbd-init");
                    })
                } else {
                    var promise = tab.init(div);
                    if (promise != null && $.isFunction(promise.then)) {
                        this.tabsInitDeffereds.push(promise);
                    }
                }
              
          }

          if (tab.tabParams) { // je gtab
            if (tab.subtaskId) {
              if (tab.group || tab.subtaskId) {
                console.warn('DetailBuilder: subtaskId property na tabu ' +
                  tab.name +
                  ' je deprecated, použijte prosím tabParams.group: {id: }',
                  tab);
              } else if (tab.group) {
                console.warn('DetailBuilder: group property na tabu ' +
                  tab.name +
                  ' je deprecated v kombinaci s použitím tabParams, použijte prosím tabParams.group',
                  tab);
              }

              tab.tabParams.group = tab.group || { id: tab.subtaskId, };
            }

            if (tabManager !== null && tab.tabParams.group != null) {
                if (tab.tabParams.opened === false) { // na žádost D.Bouchala 25.4.2019 - tab by se neměl automaticky otevírat, pokud autor explicitně řekne opened = false.
                    div.addClass(Gordic.Widget.GTabManager.noAutoOpenClass);
                } else if (tab.tabParams.opened === true) { // pokud má tab explicitně řečeno open, tak se otevře až na první otevření záložky. Pokud má na sobě řečeno i autoLoad: true, bude otevřen (a loadnut) okamžitě
                    div.addClass(Gordic.Widget.GTabManager.firstAutoOpenClass);
                    tab.tabParams.opened = tab.tabParams.autoload === true;
                }
            }

            if (tab.tabParams.menuBar) {
              var resultBar = { bar: [], }; // předáno a naplněno pomocí reference - úprava ze všech možných tvarů do jednoho MenuParams tvaru.
              this._mergeMenuParams(tab.id, tab.tabParams.menuBar,
                resultBar.bar, GDbd.DefinitionKind.TabMenu, null);
              tab.tabParams.menuBar = resultBar.bar;

              // přiřazení akcí z contentu pokud jsou zadány jako string
              this._findRecursiveInPropertyByFunc(tab.tabParams.menuBar, ['children'],
                function (item) {
                  if (typeof item.action === 'string') {
                    item.action = _this.content.actions[item.action];
                  }
                  return false;
                },
                false);

              GMenu.resolveParams(tab.tabParams.menuBar);
              }
              if (!tab.tabParams.id) tab.tabParams.id = tab.id;

            div.gtab(tab.tabParams);
          } else if (tab.subtaskId || tab.group) {

            if (div.hasClass('ggroupable')) {
              div.ggroupable('option', {
                group: tab.subtaskId ? { id: tab.subtaskId, } : tab.group,
              });
            } else {
              div.ggroupable({
                group: tab.subtaskId ? { id: tab.subtaskId, } : tab.group,
                conceal: function (ev, ctx) {
                  if (ctx.conceal) {
                    div.addClass('concealed');
                  } else {
                      div.removeClass('concealed');
                      div.trigger("resize");
                      if (div.hasClass('js-db-loadable')) {
                          div.removeClass('js-db-loadable');
                          div.gcontent('load');
                      }
                  }
                },
              });
              }

          }

            if (tab.contentParams) { // je gcontent
                if (tab.contentParams.uid || tab.contentParams.id) div.attr('uid', null); //respektovat nastavované uid/id pokud je

                var cnt = div.gcontent({
                    parentContent: _this.content,
                }, tab.contentParams);


                if (!tab.tabParams && div.hasClass('gcontent') &&
                    cnt.gcontent()['className'] != null) { // jenom gcontent a jenom když není v oušku, jinak to vola tab
                    if (!tab.group || div.hasClass(Gordic.Gin.DetailBuilder.classes.loadImmediate)) {
                        div.gcontent('load');
                    } else {
                        div.addClass('js-db-loadable');
                    }
                } else if (tab.tabParams && tab.tabParams.opened === true) {
                    div.gtab('open');
                }
            }
          };

          var processTab = function (innerTab) {
              var div = $.newDiv("concealed").attr('uid', innerTab.id + "#");
              buildTab.call(_this, innerTab, div);
              return div;
          };

          var processTabChained = function (innerTab) {
              promiseChain = promiseChain.then(function () {
                //  console.time("slowTab"+(innerTab.id) );
                  var div = processTab(innerTab);
                  //console.log(innerTab);
                  //console.timeEnd("slowTab" + (innerTab.id))
                  return div;
              });
          };


          //heuristika - pokud jde o rychle vyráběné taby, lze je vyrobit synchronně -> ušetří se zbytečný redraw, protože tyhle taby jsou do 5ms vyrobené
          var isFastTab = function (tab) {
              var hasTabParams = tab.tabParams;
              var isOpened = hasTabParams && tab.tabParams.opened === true;
              return ((hasTabParams && tab.init && (tab.initLazy === true || tab.hasFastInit === true)) || (hasTabParams && !tab.init) || (!hasTabParams && tab.hasFastInit === true)) && //je to tab s initLazy nebo tab bez initu nebo ne-tab, který o sobě tvrdí, že je rychlej
                  !(tab.contentParams && isOpened === true) && //není to contentTab s opened = true -> ten se otevírá a loaduje hned -> drahé
                  !(tabManager != null && isOpened === true && tab.tabParams.autoload === true) && // opened = true a autoload =true s tabManagerem -> ten se otevírá hned -> drahé
                  !(tabManager == null && isOpened === true); //opened = true bez tabManageru -> otevírá se hned -> drahé
          };   
         
          var processFastTabs = function (tabs) {
              promiseChain = promiseChain.then(function () {
                  for (var i = 0, l = tabs.length; i < l; i++) {
                      processTab(tabs[i]);
                  }
              });
          }

          
          var _fastTabs = [];

          for (var i = 0, l = this.tabDefinitions.length; i < l; i++) {
              var _tab = this.tabDefinitions[i];
              if (!_tab) {
                  continue;
              }
              if (isFastTab(_tab)) { //pokud je to fastTab, dáme ho do fastTabs
                  _fastTabs.push(_tab);
              }
              else { //pokud to není fastTab, zpracujeme současné fastTabs a pak zpracujeme aktuální tab
                  if (_fastTabs.length > 0) {
                      processFastTabs(_fastTabs);
                      _fastTabs = [];
                  }
                  processTabChained(_tab);
              }
          }

          //nakonec zpracujeme fastTabs jestli nějaké byly nakonci
          if (_fastTabs.length > 0) {
              processFastTabs(_fastTabs);
          }

          return promiseChain.then(function () {
              _this.onBuilds.splice(0,0,function () {
                  if (tabManager !== null && tabManager.hasClass("gtabmanager")) {
                      tabManager.gtabmanager('refresh');
                      if (tabManager.gtabmanager("getMenuParams").length == 0) {
                          // pro případ kdy po refreshi nejsou ouška, zobrazit taby, které nejsou ggroupable - tab je vždy ggroupable, teoreticky se dá zjistit Gordic.Prefabs.TabGroups.getMarkerClass(tabDiv.ggroupable("option","group") != null
                          // ale nejspíš to není potřeba
                          Object.keys(tabs).forEach(function (it) { var tabDiv = tabs[it]; if (!tabDiv) return; if (tabDiv.hasClass("ggroupable")) { tabDiv.ggroupable("conceal", false); } else tabDiv.removeClass("concealed").trigger("resize"); });
                      }
                  } else {
                      Object.keys(tabs).forEach(function (it) { var tabDiv = tabs[it]; if (tabDiv.hasClass("gtab")) { tabDiv.prev(".g-tab-header").removeClass("concealed") } tabDiv.removeClass("concealed").trigger("resize"); });
                  }
              });
              return tabs;
          }).then(function () {

              if (_this.tabsGroupPropertyName !== null) {
                  _this.content[_this.tabsGroupPropertyName] = tabs;
              }
              return tabs;
          });
      },

      // Kpis:
      _buildKpis: function () {
        if (this.kpisTargetElement === null) {
          this.kpisTargetElement =
            this.headerTargetElement || $(this.content.contentDiv);
        }
        var panel;
        var hasKpis = this.kpiDefinitions.length > 0;
        var observableKpis = {};

        if (hasKpis) {
          panel = $.newDiv().appendTo(this.kpisTargetElement);

          //  if (this.kpiTabOptions != null) panel.gtab(this.kpiTabOptions);
        }

        for (var i = 0, l = this.kpiDefinitions.length; i < l; i++) {
          var kpi = this.kpiDefinitions[i];
          if (!kpi) {
            continue;
          }

          if (kpi.action && typeof kpi.action === 'string') {
            kpi.action = this.content.actions[kpi.action];
          }

          var isObservable = kpi instanceof GObservableObject; // vypnout tuto feature nastavením kpisGroupPropertyName = null.

          if (!isObservable && !(kpi.observable === false) &&
            this.kpisGroupPropertyName != null) {
            this.kpiDefinitions[i] = kpi = new GObservableObject(kpi);
            observableKpis[kpi.name] = kpi;
          } else if (isObservable && this.kpisGroupPropertyName != null) {
            observableKpis[kpi.name] = kpi;
          }
        }

        if (hasKpis) {
          if (Object.keys(observableKpis).length > 0) {
            observableKpis.update = function () {
              for (var key in this) {
                if (this[key] instanceof GObservableObject) {
                  this[key].update();
                }
              }
            };
            this.content[this.kpisGroupPropertyName] = observableKpis;
          }

         
          panel.gkpipanel($.extend({}, this.kpiPanelOptions, { data: this.kpiDefinitions }));

          //if (panel.gkpipanel('instance')['items'] != null) {
          //  panel.gkpipanel('items', this.kpiDefinitions);
          //  panel.gkpipanel('refresh');
          //} else {
          //  panel.gkpipanel('option', 'data', this.kpiDefinitions);
          //}

        }
      },

      // SidePanels:
      _buildSidePanels: function () {
        if (!this.content.element.hasClass('gsidebar')) { // without sidebar, no need of handdling it
            return;
        }
          var _this = this;
        if (this.subContentDefinitions.length > 0) {
          // two times, because of fix of transfering userSettings. // TODO: fix when fixed in sidebar/content/dialog.

          this.content.element.gsidebar('option', 'userSettings',
            this.sideBarOptions && this.sideBarOptions.userSettings);

          this.content.element.gsidebar('option', this.sideBarOptions);
            var promiseChain = $.when();

            for (var i = 0, l = this.subContentDefinitions.length; i < l; i++) {
                var _sidePanel = this.subContentDefinitions[i];
                if (!_sidePanel) {
                    continue;
                }

                if (_sidePanel.content != null) { //jde o subcontent
                    (function (subContent) {
                        promiseChain = promiseChain.then(function () {
                            const newCnt = _this.content.createContent(subContent.content, subContent.inputParams);
                            let toReturn = $.when();

                            if (subContent.init)
                                toReturn = toReturn.then(() => subContent.init.call(_this.content, newCnt));

                            return toReturn.then(() => {
                                newCnt.dockTo(_this.content, subContent.dockOptions);
                                const fnc = function () { newCnt.undock(); newCnt.close(); _this.content.element.off("detailbuilderstarted", fnc); }
                                _this.content.element.on("detailbuilderstarted", fnc )
                            })
                        });
                    })(_sidePanel)
                } else { //jde o sidepanel

                    (function (sidePanel) {
                        promiseChain = promiseChain.then(function () {
                            // Deprecated: sidePanel.position;
                            if (sidePanel.position) {
                                console.warn('SidePanel option "position" in ' +
                                    sidePanel.id +
                                    ' is Deprecated, use "side" instead.');
                                sidePanel.side = sidePanel.position;
                            }

                            if (sidePanel.menuBar) {
                                var bar = _this.content.actions.createBar(sidePanel.menuBar);
                                GMenu.resolveParams(bar);
                                sidePanel.menuBar = bar;
                            }

                            _this.content.element
                                .gsidebar('addPanel', sidePanel.side, sidePanel);
                        });
                    })(_sidePanel);
                }
            }
          return promiseChain;
        }
      },
        _prepareMenusForBuild: function() {
            if (this.menuBarDefinitions.length > 0) {
                GMenu.resolveParams(this.menuBarDefinitions);
            }

            if (this.statusBarDefinitions.length > 0) {
                GMenu.resolveParams(this.statusBarDefinitions);
            }

            if (this.commandBarDefinitions.length > 0) {
                GMenu.resolveParams(this.commandBarDefinitions);
            }
        },
      _buildMenuBar: function () {
        if (this.menuBarDefinitions.length > 0) {
          this._createObservableListFor(this.menusGroupPropertyName,
            this.menuBarDefinitions);
          this.content.menuBar(this.menuBarDefinitions);
        }
      },

      _buildStatusBar: function () {
        if (this.statusBarDefinitions.length > 0) {
          this._createObservableListFor(this.statusesGroupPropertyName,
            this.statusBarDefinitions);
          this.content.statusBar(this.statusBarDefinitions);
        }
      },

      _buildCommandBar: function () {
        if (this.commandBarDefinitions.length > 0) {
          this._createObservableListFor(this.commandsGroupPropertyName,
            this.commandBarDefinitions);
          this.content.commandBar(this.commandBarDefinitions);
        }
        },

      _buildActiveOpEvents: function () {
        if (this.activeOpEvents.length > 0) {
            var content = this.content;
            content.activeOpEvents = this.activeOpEvents;
            var handler = content.onDetailBuilderActiveOp;
            content.element.off(".gdbdactiveop");
            content.off(".gdbdactiveop");
            content.element.on(this.activeOpEvents.map(function (it) { return it + ".gdbdactiveop" }).join(" "), function (ev, ctx) { $(ev.target).trigger("detailactiveop", { ev: ev, args: arguments.length > 1 ? Array.prototype.slice.call(arguments,1) : [] }); if (typeof handler === "function") return handler.apply(content, arguments); });
            content.on("close.gdbdactiveop", function () { content.off(".gdbdactiveop"); content.element.off(".gdbdactiveop")});
        }
            
      },

      _handleFocus: function () {
        var $contentDiv = $(this.content.contentDiv);
        var $focus = GDbd.getElementToFocus($contentDiv, this.autofocusSelector);

        $focus && $focus.eq(0).prop('autofocus','autofocus').focus(); //po nastavení autofocus zavolán focus, jelikož autofocus se na dialogu vyhodnocuje příliš brzy
      },

      // #endregion

      // #endregion

      // #region -------------------- Helper Methods ------------------
      _isPromise: function (obj) {
        return !!obj &&
          (typeof obj === 'object' || typeof obj === 'function') &&
          typeof obj.then === 'function';
      },

      _findRecursiveInChildrenById: function (items, id, exactMatch) {
        return this._findRecursiveInPropertyByFunc(items, ['children'],
          exactMatch ? function (item) {
            return item.id === id;
          } : function (item) {
            return id.length === 0 || item.id.startsWith(id);
          }, exactMatch);
      },

      _findRecursiveInPropertyByFunc: function (items, properties, func, findFirst, acc) {
        /// <summary> Searches for the first item / all items for which func returns true. Is searching recursively in object's defined sub-properties. </summary>
        /// <remarks> VMACA, 24.02.2017. </remarks>
        /// <param name='items'> Array of items to search in. </param>
        /// <param name='properties'> Tree of properties to search recursively. I.E. ['sections',rows','fields'] or ['children'] </param>
        /// <param name='func'> The function which return's true if item was found.</param>
        /// <param name='findFirst'> Bool - return when first is found.</param>
        /// <param name='acc'>Result array. Default [].</param>
        /// <returns> The found item in property by function. </returns>

        acc = acc || [];

        var currentProperty = properties[0];
        if (properties.length > 1) {
          properties.splice(0, 1);
        }

        for (var i = 0; i < items.length; i++) {
          if (func(items[i])) {
            acc.push({ array: items, item: items[i], index: i, });
            if (findFirst) {
              return acc;
            }
          }

          if (items[i][currentProperty]) {
            var innerAcc = this._findRecursiveInPropertyByFunc(items[i][currentProperty], properties, func,
              findFirst, acc);
            if (findFirst && innerAcc.length > 0) {
              return innerAcc;
            }
          }
        }

        return acc;
      },

      getIdFor: function (kind, name) {
        return GDbd.getIdFor(kind, name);
      },

      /**
       * Gets a definition's itemInfo by it's identifier.
       * @author VMACA
       *
       * @param {string} id The identifier. Must start with 'menu', 'status', 'command', 'act', 'tab', 'form','kpi' or 'panel'.
       * @param {string} kind Kind of definition - menu, status, command etc. one of enum GDbd.DefinitionKind.
       * @returns {GDetailBuilderItemInfo[]} The definition's itemInfo.
       */
      getDefinition: function (id, kind) {
        /// <summary> Gets a definition's itemInfo by it's identifier. </summary>
        /// <param name='id'> The identifier. Must start with 'menu', 'status', 'act', 'tab' or 'form'. </param>
        /// <returns> The definition's itemInfo. </returns>

        if (id instanceof Array) {
          var result = [];
          for (var i = 0; i < id.length; i++) {
            result.push.apply(result, this._getDefinition(id[i], kind));
          }
          return result;
        }

        return this._getDefinition(id, kind);
      },

      _getDefinition: function (id, kind) {
        if (!id || typeof id !== 'string') {
          throw new GError('Id {' + id + '} is not allowed. Must be non-empty string.');
        }

        var exactMatch = !id.endsWith('*');

        id = exactMatch ? id : id.slice(0, id.length - 1);
        var kindId = kind != null ? kind[0] : id[0];
        switch (kindId) {
          case 'm': { // menu
            return this._findRecursiveInChildrenById(this.menuBarDefinitions,
              id, exactMatch);
          }
          case 'g': { // group
            return this._findRecursiveInChildrenById(this.tabGroupDefinitions,
              id, exactMatch); // groups
          }
          case 's': { // status | sub
            kindId = kind != null ? kind[1] : id[1];
            switch (kindId) {
              case 'c': return this._getDefinitionFromArray(this.subContentDefinitions, id, exactMatch); // subContent
              case 'u': return this._getDefinitionFromArray(this.tabGroupDefinitions, id, exactMatch); // sub
              case 't': return this._findRecursiveInChildrenById(this.statusBarDefinitions, id, exactMatch); // status
              default: break;
            }
            return [];
          }
          case 'a': { // action //aop-activeOp
                kindId = kind != null ? kind[1] : id[1];
                switch (kindId) {
                    case 'c': return this._getDefinitionFromArray(this.actionDefinitions, id, exactMatch, 'name') // act
                    case 'o': return this._getDefinitionFromArray(this.activeOpEvents, id.indexOf("aop") === 0 ? id.substr(3) : id, exactMatch, null); // aop
                    default: break;
                }
                return [];
          }

          case 't': { // tab // tg-tabGroup
            kindId = kind != null ? kind[1] : id[1];
            switch (kindId) {
              case 'g': return this._getDefinitionFromArray(this.tabGroupDefinitions, id, exactMatch); // tg
              case 'a': return this._getDefinitionFromArray(this.tabDefinitions, id, exactMatch); // tab
              default: break;
            }
            return [];
          }

          case 'c': { // command
            return this._getDefinitionFromArray(this.commandBarDefinitions, id, exactMatch);
          }

          case 'f': { // form
            return this._findRecursiveInPropertyByFunc(this.headerFormArray, ['sections', 'rows', 'fields'], function (item) { return exactMatch ? item.name === id || (item.options && item.options.name === id) : item.name != null && (id.length === 0 || item.name.startsWith(id)) || item.options && item.options.name != null && (id.length === 0 || item.options.name.startsWith(id)); }, true);
          }

          case 'k': { // kpi
            return this._getDefinitionFromArray(this.kpiDefinitions, id, exactMatch, 'name');
          }

          case 'p': { // panel
            return this._getDefinitionFromArray(this.subContentDefinitions, id, exactMatch);
          }
            

        }

        console.debug('Target item not found (' + id + ').');

        return [];
      },

      _getDefinitionFromArray: function (array, id, exactMatch, idPropertyName) {
        var result;

          idPropertyName = idPropertyName === null ? null : idPropertyName || 'id';

        if (exactMatch) {
          result = [{ array: array, }];
          result[0].item = array.find(function (item, index) {
            if ((idPropertyName === null ? item : item[idPropertyName]) === id) {
              result[0].index = index; return true;
            } return false;
          });
          if (result.length === 1 && result[0].item == null) result = [];
        } else {
          result = array.reduce(function (acc, item, index, _array) {
            if (id.length === 0 || (idPropertyName === null ? item : item[idPropertyName]).startsWith(id)) {
              acc.push({ array: _array, item: item, index: index, });
            }
            return acc;
          }, []);

        }
         
        return result;
      },

      /** Removes the definition described by ID. Definition is removed from it's definition list, so it won't be build.
       * @author VMACA
       *
       * @date 24.02.2017
       * @param {string} id The identifier.
       * @param {any} kind Kind of item
       * @returns {GDetailBuilderItemInfo[]} Removed definition's itemInfo or empty array if target definition was not found.
       */
      removeDefinition: function (id, kind) {
        var itemInfo = this.getDefinition(id, kind);
          var sorted = itemInfo.sort(function(a, b){return a.index - b.index});
          for (var i = sorted.length - 1; i >= 0 ; i--) {
              if (!sorted[i].item) continue;
              sorted[i].array.splice(sorted[i].index, 1);
        }

        return itemInfo;
      },

      /** Detaches the definition. Definition is removed from it's definition list, so it won't be build, but is stored and available for future re-enabling.
      * @author VMACA
      * @date 24.02.2017
      * @param {string} id The identifier of item to disable.
      * @param {any} kind Kind of item
      * @returns {GDetailBuilderItemInfo[]} Disabled definition's itemInfo or empty array if target definition not found.
      */
      detachDefinition: function (id, kind) {
        var itemInfo = this.removeDefinition(id, kind);
        if (itemInfo) {
          this.detachedDefinitions
            .push.apply(this.detachedDefinitions, itemInfo);
        }

        return itemInfo;
      },

      /** ReAttaches the definition. Finds definition in disabled definitions list and returns it back to array and index, where it was taken from. 
        * @author VMACA
        * @date 24.02.2017
        * @param {string} id The identifier of item to enable.
        * @param {any} kind Kind of item
        * @returns {GDetailBuilderItemInfo[]} Enabled definition's itemInfo or empty array if target definition not found.
      */
      reAttachDefinition: function (id, kind) {

        var itemInfo = this.detachedDefinitions.find(function (item) {
          return item.id === id;
        });

        for (var i = 0; i < itemInfo.length; i++) {
            if (!itemInfo[i].item) continue;
            itemInfo[i].array.splice(itemInfo[i].index, 0, itemInfo[i].item);
        }

        return itemInfo;
      },
      /**
       * Updates the definition. (using deepcopy extend)
       * @author VMACA
       * @date 24.02.2017.
       *
       * @param {string} id The identifier of definition to update. Or array of identifiers. Accepts identifier with asterix in end  i.e. actWflElDoc*
       * @param {object} newData Object with data to update.
       * @param {any} kind Kind of item
       * @returns {GDetailBuilderItemInfo[]} Updated definition's itemInfo or or empty array if target definition was not found.</returns>
       */
      updateDefinition: function (id, newData, kind) {
        var itemInfo = this.getDefinition(id, kind);

          for (var i = 0; i < itemInfo.length; i++) {
              if (!itemInfo[i].item) continue;
            $.deepExtendWoArray(itemInfo[i].item, newData);
        }

        return itemInfo;
      },

      /**
       * Inserts definition a before definition described by ID. Specify items to insert as arguments after id.
       *
       * @author  Vmaca
       * @date    09.03.2017
       *
       * @param {String} id    The identifier of target definition.
       * @param {any} kind Kind of item
       * @param {Object} args  Definitions to insert.
       *
       * @return  {void}
      **/
      insertBeforeDefinition: function (id, kind) {
        if (arguments.length > 1) {
          var idx = 1;
          if (typeof kind == 'string') {
            idx++;
          }
          var itemInfo = this.getDefinition(id, idx > 1 ? kind : null);

          if (itemInfo.length > 0 && itemInfo[0].item) {
            var itemsToInsert;
            if (arguments[idx] instanceof Array) {
              itemsToInsert = arguments[idx];
            } else {
              itemsToInsert = Array.prototype.slice.call(arguments, idx);

            }

            Array.prototype.splice
              .apply(itemInfo[0].array, [itemInfo[0].index, 0].concat(
                itemsToInsert));
          } else {
            console.warn('Pozor, položka ' + id + 'nebyla nalezena a nelze tak před tuto položku nic vložit(přesunout)')
          }

        }

      },

      /**
       * Inserts definition or multiple definitions after definition described by ID. Specify items to insert as arguments after id.
       *
       * @author  Vmaca
       * @date    09.03.2017
       *
       * @param {String} id    The identifier of target definition.
       * @param {any} kind Kind of item
       * @param {Object} args  Definitions to insert.
       *
       * @return  {void}
      **/
      insertAfterDefinition: function (id, kind) {
        if (arguments.length > 1) {
          var idx = 1;
          if (typeof kind == 'string') {
            idx++;
          }
          var itemInfo = this.getDefinition(id, idx > 1 ? kind : null);

          if (itemInfo.length > 0 && itemInfo[0].item) {
            var itemsToInsert;
            if (arguments[idx] instanceof Array) {
              itemsToInsert = arguments[idx];
            } else {
              itemsToInsert = Array.prototype.slice.call(arguments, idx);

            }
            Array.prototype.splice
              .apply(itemInfo[0].array, [itemInfo[0].index + 1, 0].concat(itemsToInsert));
          } else {
            console.warn('Pozor, položka ' + id + 'nebyla nalezena a nelze tak před tuto položku nic vložit(přesunout)')
          }
        }

      },

      /**
       * Move definition after other definition.
       *
       * @author  Vmaca
       * @date    09.03.2017
       *
       * @param {String} itemToMoveId  Identifier of the item to move.
       * @param {String} targetItemId  Identifier of the target item.
       * @param {any} kind Kind of item
       *
       * @return  {void}
      **/
      moveDefinitionAfter: function (itemToMoveId, targetItemId, kind) {

        var itemInfo = this.removeDefinition(itemToMoveId, kind);

        if (itemInfo.length > 0) {
          var params = itemInfo.reduce(function (acc, item) {
              if (item.item) acc.push(item.item);
            return acc;
          }, [targetItemId, kind]);

            if (targetItemId === null) { // move to start, drop first two params and fill to start of an array of first object (they all should have same array)
                params = params.slice(2);
                Array.prototype.push.apply(itemInfo[0].array, params);
            } else {
                this.insertAfterDefinition.apply(this, params);
            }
        }
      },

      /**
       * Move definition before other definition.
       *
       * @author  Vmaca
       * @date    24.02.2017.
       *
       * @param {String} itemToMoveId  Identifier of the item to move.
       * @param {String} targetItemId  Identifier of the target item.
       * @param {any} kind Kind of item
       *
       * @return  {void}
      **/
      moveDefinitionBefore: function (itemToMoveId, targetItemId, kind) {

        var itemInfo = this.removeDefinition(itemToMoveId, kind);

        if (itemInfo.length > 0) {
          var params = itemInfo.reduce(function (acc, item) {
            if(item.item) acc.push(item.item);
            return acc;
          }, [targetItemId, kind]);

            if (targetItemId === null) { // move to start, drop first two params and fill to start of an array of first object (they all should have same array)
                params = params.slice(2);
                for (var i = params.length - 1; i >= 0; i--) {
                    itemInfo[0].array.unshift(params[i]);
                }
            } else {
                this.insertBeforeDefinition.apply(this, params);
            }
        }
      },

      /** Experimental - Register menu param to be filled with action from some content, which has [data-param-id] param with given content name.
       * @author VMACA
       * @date 24.02.2017
       * @param {string} contentName Name of the content, which is in some data-param-id or foundable by $.content(string)
       * @param {MenuParams} menuParam   The menu parameter to fill with action.
       * @returns {MenuParams} menuParam with delayed action loading
       */
      fillActionFromContent: function (contentName, menuParam) {

        var _this = this;
        menuParam.targetTabAction = menuParam.action;

        var def = $.Deferred();
        this.delayedActionsDeffereds.push(def);

        var menuLoadPromise = this.buildTabsDeffered
          .promise().done(function () {
            // after tabs are build, find content in current content

            var tabContent = $('[data-param-id=' + contentName + ']', _this.content.contentDiv);

            if (tabContent.length <= 0) {
              tabContent = $.content(contentName); // TODO: Fix this, to work better
            }

            if (tabContent.length > 0 &&
              menuParam.targetTabAction &&
              menuParam.action === menuLoadPromise) {
              var tabGContent = tabContent.gcontent();
              if (!tabGContent.loaded) {

                if (!tabGContent.loading) {
                  tabGContent.load();
                }

                tabGContent.loadingAwait.then(function () {
                  menuParam.action = contentName + '.' + menuParam.targetTabAction;
                  delete menuParam.targetTabAction;
                  def.resolve();
                });

              } else {
                menuParam.action = contentName + '.' + menuParam.targetTabAction;
                delete menuParam.targetTabAction;
              }
            } else {
              var index = _this.delayedActionsDeffereds.indexOf(def);

              if (index >= 0) {
                _this.delayedActionsDeffereds.splice(index, 1);
              }

              _this.removeDefinition(menuParam.id);
            }

          });

        menuParam.action = menuLoadPromise;
        return menuParam;
      },
      _createObservableListFor: function (propertyName, items) {
        var newItems = items.reduce(function (prev, it, idx) {
          if (it instanceof GObservableObject) {
            prev[it.id] = it;
          }
          return prev;
        }, {});
        this.content[propertyName] = new GObservableList(newItems);
      },
      // #endregion
    }),

    builder: BaseBuilder,

  }, { extendIntellisense: GContent, });
})(jQuery);
