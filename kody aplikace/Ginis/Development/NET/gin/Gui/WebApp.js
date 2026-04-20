/* GORDIC WebApp knihovna */
"use strict";
$(document).ready(function () {
    var actWindowSettingsReset, actGlobalSettingsReset, actResetViewOverlayTips, actTasklistSettings;
    Gordic.WebApp.globalSettingForms.register(  // obnoveni vychoziho nastaveni 
        new Gordic.Forms.Form({ name: "frmGlobalReset", tabOptions: { title: "jres:25000028", opened: true }}) //RC 25000028 : Aplikace
            .addRow("jres:25000030")  //RC 25000030 : Uživatelské nastavení
                .addField("gbutton", { 
                    params: {
                        action: actGlobalSettingsReset = new GAction({
                            name: "actGlobalSettingsReset", caption: "jres:25000029", run: function (ev) { //RC 25000029 : Obnovit všechna nastavení na původní výchozí hodnoty
                                var content = $.content(ev.target);
                                content.dialogs.confirm("jres:25000027").createDialogPromise("yes").done(function () { //RC 25000027 : Opravdu chcete smazat veškerá uživatelská nastavení? ;(Tato volba restartuje aplikaci.)
                                    content.options.gstor.clear().save(true);
                                    actGlobalSettingsReset.setPending(100);
                                    content.element.trigger("applicationReloadRequest", { type: "GlobalReset" });
                                });
                            }
                        })
                    }
                })
                .addField("gbutton", { 
                    params: {
                        action: actWindowSettingsReset = new GAction({
                            name: "actWindowSettingsReset", caption: "jres:25000138", run: function (ev) { //RC 25000138 : Obnovit výchozí velikosti a pozice dialogů
                                var stor = $.content(ev.target).options.gstor;
                                var clearDlgPos = function (obj, path) {
                                    for (var k in obj)
                                        if (k === "dlgpos") stor.remove(path + "dlgpos");
                                        else if (k === "autofitresizer") stor.remove(path + "autofitresizer");
                                        else if ($.isPlainObject(obj[k])) clearDlgPos(obj[k], path + k + ".");
                                };
                                clearDlgPos(stor.get(""), "");
                                actWindowSettingsReset.setPending(100);
                            }
                        })
                    }
                })
            .addRow("jres:33000043").addField("gcheck", "", { //RC 33000043 : Zobrazovat uživatelské tipy
                name: "chckShowOverlayTips",
                //initialValue: true, 
                initialValue: false, // JKLUSACEK 18.01.2023 - změna na nezobrazování overlay tipů
                model: "Global.core.OverlayTips.showTips"
            })
                .addField("gbutton", "", { 
                    params: {
                        action: actResetViewOverlayTips = new GAction({
                            name: "actResetViewOverlayTips",
                            caption: "jres:33000042", //RC 33000042 : Obnovit zobrazení všech tipů
                            run: function (ev) {
                                var content = $.content(ev.target);
                                content.options.gstor.set("Global.core.OverlayTips.viewTips", []);
                                actResetViewOverlayTips.setPending(100);
                            }
                        })
                    }
                })
            .addRow("jres:25000049").addField("gcheck", "", { //RC 25000049 : Startovat aplikaci v maximalizovaném režimu
                name: "chkStartupMaximize",
                labelFromRow: false,
                model: "Global.core.webAppStartupMaximize=value"
            }).addText("<i>jres:25000050</i>", "") //RC 25000050 : *nemusí fungovat na všech prohlížečích
            .addRow("jres:33000047").addField("gcheck", "", { //RC 33000047 : Zobrazovat varování před ukončením aplikace
                name: "chckAskBeforeCloseApp",
                model: "Global.core.webAppClosePrompt",
                initialValue: true, 
            }).addText("<i>jres:25000140</i>", "") //RC 25000140 : *je nutný restart aplikace
            .addRow("jres:31850138").addField("gcheck", "", { //RC 31850138 : Zobrazovat notifikace u přednastavení
                name: "chkEnablePresetNotifications",
                labelFromRow: false,
                initialValue: true,
                model: "Global.core.enablePresetNotifications=value"
            })
            // 18.08.2022 - TFeik
            // Uživatelsky nastavitelná spouštěcí úloha (AutoRun).
            .addRow('jres:32142505') //RC 32142505 : Výchozí úloha po spuštění
            .addField('gselectbox', {
                name: 'autoRun',
                model: 'Global.Gui.UserAutoRun.actionId = value.id',
                data: function () {
                    return Gordic.Gui.WebApp.UserAutoRunField.createActionsData();
                },
                itemTemplate: function (item) {
                    return Gordic.Gui.WebApp.UserAutoRunField.itemTemplate(this, item);
                },
                helperColumns: [
                    'caption',
                    'captionWithScope'
                ],
                helperItemTemplate: function (item) {
                    return Gordic.Gui.WebApp.UserAutoRunField.helperItemTemplate(item);
                },
                change: function (event, changeObj) {
                    if (changeObj.value == null) {
                        Gordic.Gui.WebApp.UserAutoRunField.removeState($(this));
                    }
                },
                selectorFormat: new Gordic.Data.GridFormat()
                    .addIconColumn({
                        name: 'action',
                        caption: 'jres:32142504', //RC 32142504 : Úloha
                        format: 'full',
                        width: 250,
                        iconTemplate: function (item) {
                            return Gordic.Gui.WebApp.UserAutoRunField.selectorFormatIconTemplate(item);
                        },
                        printable: function (item) {
                            return Gordic.Gui.WebApp.UserAutoRunField.selectorFormatPrintable(item);
                        }
                    })
            })

            .addRow().addField("gbutton", { //RC 31150098 : Strom úloh
                params: {
                    action: actTasklistSettings = new GAction({
                        name: "actTasklistSettings",
                        caption: "jres:31150098", //RC 31150098 : Spravovat Strom úloh
                        run: function () {
                            var main = $.content("main");
                            var $tl = main ? main.taskList() : null;
                            Gordic.Utils.Menu.showTasklistSettings($tl);
                        }
                    })
                }
            }) 
    );

    document.addEventListener('mousemove', function(event) {
        namespace("Gordic.Utils.Mouse", {
            x: event.clientX, y: event.clientY, lastMoveEvent: event
        });
    });
});
//$(window).load(function () {

//});




(function ($) {
    /* ======================================================= */
    /* Utility okna a funkce pro aplikace */
    /* ======================================================= */

    var linkServiceContent = null;

    var getTicketQuery = function (withContext, currentQuery, extensionTime) {
        if (linkServiceContent == null) {
            linkServiceContent = new GContent("Gordic.Gui.WebApp.GWebAppService");
        }

        return linkServiceContent.call("GetTicketQueryString", { withContext: withContext, currentQuery: currentQuery, extensionTime: extensionTime });
    };

    var getGuidForQuery = function (query) {
        if (linkServiceContent == null) {
            linkServiceContent = new GContent("Gordic.Gui.WebApp.GWebAppService");
        }

        return linkServiceContent.call("GetGuidForQuery", { queryDto: query });
    };

    var getPreparedSession = function (requestDto) {
        if (linkServiceContent == null) {
            linkServiceContent = new GContent("Gordic.Gui.WebApp.GWebAppService");
        }

        return linkServiceContent.call("PrepareSession", { request: requestDto, allowedFaze: Gordic.Consts.Apps.map(function (app) { return app.faze; }) });
    };

    namespace("Gordic.Enums.TicketType",
        {
            None: 0,
            WithLogin: 1,
            WithLoginAndContext: 2
        });

    namespace("Gordic.WebApp.Utility", {

        getAppInfo: function (faze) {
            return Gordic.Consts.Apps.find(function (app) { return app.faze.toLowerCase() === faze.toLowerCase(); });
        },

        open: function (content) {
            var win = null;

            switch (content) {
                case "DBParamsList":
                    win = GDlg.showWindow("ascx://gin/gui/contents/DBParamsList.ascx", "DBParamsList#", { width: 800, height: 600, title: "jres:25000001" }); //RC 25000001 : Databázové parametry aplikace
                    break;

                default: GDlg.error("jres:25000008".format(content)); break; //RC 25000008 : Neznámý aplikační obsah "{0}"
            }

            return win;
        },

        /**
         * Opens App in new tab 
         * @param {string} faze Faze of target app - can be null (current location is used)
         * @param {string} commandName  Identifier of command in target app - can be null
         * @param {object} data Object to searialize into query.
         * @param {object} options  ticketType(Gordic.Enums.TicketType) - default is .None
         * @returns {Promise<window>} new window with app.
         */
        openApp: function (faze, commandName, data, options) {

            if (faze != null && typeof faze != "string" && arguments.length === 1 &&
                (faze.commandName || faze.data || faze.options)) {
                //faze is object wrapper for default params;
                commandName = faze.commandName;
                data = faze.data;
                options = faze.options;
                faze = faze.faze;
            }

            return Gordic.WebApp.Utility.openUrl(Gordic.WebApp.Utility.createCommandUrl(faze, commandName, data, options));

        },

        /**
         * Opens given url with window.open
         * @param {string|Promise<string>} url Url to open, can be promise.
         * @returns {Promise<window>} new window object.
         */
        openUrl: function (url) {
            var def = $.Deferred();

            if (typeof url === "string") {
                def.resolve(this._openUrl(url));
            } else if (url != null && url.then != null) {
                var _this = this;
                return url.then(function (stringUrl) { return _this._openUrl(stringUrl); });
            } else {
                def.fail();
            }

            return def.promise();
        },

        /**
         * Internal, shortcut for window.open
         * @param {string} url url to open
         * @returns {window} new window
         */
        _openUrl: function (url) {
            return window.open(url, "_blank");
        },



        /**
         * 
         * Returns link for given app and serializes identifier and dto into query.
         * 
         * @param {String} faze  Target app faze. If null, current location is used.
         * @param {String} commandName Identifier placed into lId query property.
         * @param {Object} data Object to searialize into query.
         * @param {Object} options  ticketType(Gordic.Enums.TicketType) - default is .None
         * @returns {Promise<string>} link to app with query.
         */
        createCommandUrl: function (faze, commandName, data, options) {
            const _this = this;
            options = options || {};
            options.ticketType = options.ticketType == null ? Gordic.Enums.TicketType.None : options.ticketType;

            if (faze == null || typeof faze == "string") {
                return this._createCommandUrlInternal(faze, commandName, data, options);
            } else {
                return getPreparedSession(faze).then(function (requestResult) {
                    const dataCopy = $.extend({}, faze, { cto: requestResult.cloneToken, ticket: requestResult.ticket });
                    //delete non-data properties
                    delete dataCopy.typAg;
                    delete dataCopy.faze;
                    delete dataCopy.banCurrentApp;
                    delete dataCopy.noAppFail;

                    options.ticketType = Gordic.Enums.TicketType.None;

                    if (requestResult.faze == null) return $.Deferred().reject().promise();

                    return _this._createCommandUrlInternal(requestResult.useCurrentApp ? null : requestResult.faze, commandName, $.extend({}, data, dataCopy), options);
                });
            }
        },

        _createCommandUrlInternal: function (faze, commandName, data, options) {
            const deferred = $.Deferred();

            let location = null;

            if (faze != null) {
                const winnerApp = Gordic.WebApp.Utility.getAppInfo(faze);
                if (winnerApp != null && winnerApp.url != null) {
                    location = new URL(winnerApp.url)
                } else { deferred.reject(); return deferred.promise(); }
            } else {
                //pro current location chceme odstranit stávající parametry? 
                location = options.defaultLocation ?? window.location
            }

            let newQuery = location.search != "" ? window.queryStringToObj(location.search.substring(1)) : {};

           //Ošetření pro null -> '' ale má být null -> "null"
            for (let key in newQuery) {
                if (newQuery[key] === null) {
                    newQuery[key] = "null";
                }
            }


            if (commandName != null)
                newQuery["c"] = commandName;

            //pridat options.params do queryDto - nechceme přidávat null do newQuery, takže jen přidáváme nenullové + vynechat c
            if (data != null) {
                for (let key in data) {
                    if (data[key] != null && key !== "c") {
                        newQuery[key] = data[key];
                    } else if (data[key] == null && newQuery[key] != null) { //tam kde je null a v newQuery něco je, tak to vymazat
                        delete newQuery[key];
                    }
                }
            }


            let ticketPromise = null;
            const createResult = () => {
                return location.origin + location.pathname + (Object.keys(newQuery).length > 0 ? "?" : "") + $.param(newQuery) + (location.hash.length > 0 ? location.hash : location.href.endsWith("#") ? "#" : "");
            }

            switch (options.ticketType) {
                case Gordic.Enums.TicketType.None: {
                    deferred.resolve(createResult());
                    break;
                }

                case Gordic.Enums.TicketType.WithLogin: {
                    ticketPromise = getTicketQuery(false, newQuery, options.extensionTime);
                    break;
                }

                case Gordic.Enums.TicketType.WithLoginAndContext: {
                    ticketPromise = getTicketQuery(true, newQuery, options.extensionTime);
                    break;
                }
            }

            if (ticketPromise !== null) {
                ticketPromise.then(function (ticketQueryParams) {
                    newQuery = ticketQueryParams;
                    deferred.resolve(createResult());
                }, deferred.reject);
            }

            return deferred.promise().then((url) => {
                if (url.length < 2000) {
                    return url; 
                }

                throw url;
            });
        }
    }, { pure: true });

    namespace("Gordic.WebApp.Utility", {
        handleApplicationLeave: function (opts) {
            var isQuitting = false; //flag for leaving application
            var isReturning = false;  //flag for returning to application (need to move to forward state)
            var isLeaveDialogOpened = false; //flag for opened askDialog
            var leaveDialogPromise = null;

            // beforeunload handling - ask before quitting application via reload / url change ... only if there is ever chance we would want that...
            if (opts.askLeave) {
                var listener;
                window.addEventListener("beforeunload", listener = function (ev) {
                    if (!isQuitting && opts.askLeave()) {
                        ev.preventDefault();
                        return ev.returnValue = '';
                    }
                });

                //unregister after logout
                $(document).on("applicationclosed", function () {
                    window.removeEventListener("beforeunload", listener);
                });
            }

            // History api - init
            if (window.history.state == null) {
                try {
                    window.history.replaceState({ isBack: true, isGinis: true }, "", "#");
                    window.history.pushState({ isForward: true, isGinis: true }, "", "#");
                } catch (exc) {
                    console.error("jres:31750037", exc) //RC 31750037 : Nelze pracovat s historií prohlížeče, nebude fungovat tlačítko zpět.
                }
            } else if (window.history.state.isGinis && window.history.state.isBack) {
                //we are in backState -> have to go to forward state but do not close anything - wa are probably going forward (returning) from some page before this webapp
                isReturning = true; window.history.forward();
            }

            // quit app via history back and logout
            var backQuit = function () {
                isQuitting = true; //closing app, go back
                $(document).on("applicationclosed", function () {
                    window.history.back(); //go back when logout is done
                });
                var main = $("#main").gcontent();
                main && !main.closed && main.logout(true);
            };

            // ask before quitting application via browser back button
            var askLeave = function () {
                if (!isLeaveDialogOpened) {
                    isLeaveDialogOpened = true;
                    //we went to forward state -> we should close current content, but there is no other content to close - leave app?
                    return leaveDialogPromise = GDlg.messageBox(opts.leaveTitle || "jres:31750004", opts.leaveQuestion || "jres:31750005", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31750005 : Opravdu chcete opustit aplikaci?
                        .createDialogPromise('yes').always(function () { isLeaveDialogOpened = false; leaveDialogPromise = null; });
                }
                return leaveDialogPromise;
            };

           
            // History api - handling 
            window.onpopstate = function (event) {

                if (isQuitting && event.state != null && event.state.isGinis) {
                    //leaving app - logout
                    window.history.back(); return;
                }

                if (isReturning || event.state == null || !event.state.isGinis) {
                    //current state is not from ginis or we are returning - we just moved to forward state, but we don't want to close anything
                    isReturning = false; return;
                }

                if (event.state != null && event.state.isBack) {
                    //user went back, so we have to go forward and close current content.
                    window.history.forward(); return;
                }

                if (window.history.state.isForward === true) {// we were back, but we went forward and now we are on correct state

                    if ($("#main").length > 0)
                        if (opts.back)
                            opts.back().then(function () {
                                //back is handled, everything is OK.
                            }, function () {//back is not handled, we need to leave.
                                if (!opts.askLeave || opts.askLeave(true)) { //if askLeave is not defined ... always ask on going back
                                    askLeave().then(function () { backQuit(); });
                                } else {
                                    backQuit();
                                }
                            });
                        else {  //if there is not main, user is not logged in, no reason to ask, just quit
                            isQuitting = true;
                            window.history.back();
                        }
                }

            };
        }
    }, { pure: true });



    /* ======================================================= */
    /* GWebAppBase extension */
    /* ======================================================= */
    var uuid = 1;
    namespace("Gordic.WebApp.MainContent", {
        logOptions: { name: "Gordic.WebApp.MainContent", fileName: "WebApp.js" },
        suppressAskLeave: false, 
        onWebAppReady: function (result) {
            var _this = this;
            GContent._defaultRootContent = this; // nastaveni sebe jako vychoziho parent contentu vsem ostatnim contentum bez vlastniho parentcontentu 
            window.ginisDebugMode = this.debugMode;
            if (this.applicationAbbr) $(document.body).addHelpContext("module:" + this.applicationAbbr);
            if (document.documentElement.lang) $(document.body).addHelpContext("lang:" + document.documentElement.lang.substring(0, 2));
            //this.element.find("#smalllogo").attr("src", Gordic.Utils.gz(this.applicationLogoSmall));
            this.element.find("#largelogo").attr("src", Gordic.Utils.gz(this.applicationLogoLarge));
            this.element.find(".main-logo").attr('tabindex', '0').gshortcut({
                key: ['lclick', 'space', 'enter'],
                visible: false,
                action: this.actions.add(new GAction({ name: 'actHome', run: function () { _this.runDefaultAction(); } }))
            });

            this._initLayoutSizeObservation();

            if (!this.hasOwnProperty("currentContextHelpElement"))
                Object.defineProperty(this, "currentContextHelpElement", {
                    get: function () {
                        if (!this._currentContextHelpElement || !this._currentContextHelpElement.isConnected) this._currentContextHelpElement = document.activeElement;
                        if (this._currentContextHelpElement === document.body) this._currentContextHelpElement = $("div.activity-content:visible:last")[0] || this._currentContextHelpElement;
                        return this._currentContextHelpElement;
                    },
                    set: function (value) { this._currentContextHelpElement = value; }
                });

            //Logovani - nastaveni po prihlaseni
            Gordic.Gui.WebApp.GNLogSupport.setupAfterLogin(this.logInitConfig);

            // GSTOR - UZIVATELSKE ULOZISTE
            var storService = null;
            if (window.gstor);  // nejaka predinicializacni override verze 
            else if (this.userSettingsTest)
                window.gstor = new Gordic.Data.Storage(this.userSettingsTest); // neukladana testovaci verze 
            else if (this.userSettingsData == null)
                window.gstor = new Gordic.Data.Storage({}, { locked: true }); // neukladana verze pokud neni pouzit vychozi mechanizmus GINIS nastaveni
            else
                window.gstor = new Gordic.Data.Storage(this.userSettingsData, {
                    traceChanges: true,
                    saveWaiting: 15000,
                    saveDelay: 60000,
                    save: function (data, partial) {
                        if (!storService) storService = _this.createServiceContent(["Gordic.Gui.WebControls.GStorService", { backgroundWorker: true}]);

                        // odstraneni locked vetvi, ty se ukladat nemusi (data v save jsou vzdy jiz deepCopy)
                        var locked = window.gstor.get("_lockedSections") || [];
                        if (locked.length) {
                            var gs = new GStor(data);
                            for (var i = 0; i < locked.length; i++) gs.remove(locked[i]);
                            data = gs.get();
                        }

                        return storService.call("Save", { data: data, sxs: "global.usersettings", partial: partial, shared: false }, null, { fire: _this._logoutSave === true })
                            .fail(function (excInfo) { excInfo.target = "toast"; excInfo.title = "jres:25000106"; }); // vyjimky radeji zahazovat. Pokud dojde k poruse, tohle se vola periodicky kazdych par sekund. Mohlo by byt zobrazeno jako jeden alert v centru akci :P  //RC 25000106 : Chyba při uložení uživatelského nastavení
                    }
                });
            GContent.prototype.globalSettings = window.gstor; // doplneni globalniho store do vsech contentu 
            delete this.userSettingsData; // uklid duplicit
            this.element.gdomcontext("remove", "userSettings");  // odstraneni predchoziho mozneho usersettings vytvoreneho v konstruktoru
            this.setUserSettings("contents.main", true, false);

            // zpozdene ops, aby pro komponenty bylo k dispozici spravne userSettings
            if (this.__delayedOps) {
                this.onWebAppOps(this.__delayedOps, true);
                delete this.__delayedOps;
            }

            // TASKLIST
            this.setTaskList();
            delete this.taskListCollapsed;

            // CENTRUM NOTIFIKACI
            $(".main-notificationcenter")
                .ginlinedialog({
                    related: $(".main-notificationcenter-menuitem"),
                    customClass: "main-notificationcenter__wrapper",
                    position: {
                        of: "related",
                        my: "left top",
                        at: "left bottom",
                        collision: "fit flip",
                        within: window
                    },
                    autoClose: true,
                    closeButton: null
                })
                .gnotificationlist({
                    notifications: [],
                    change: function (ev, obj) {
                        var newCount = $(this).gnotificationlist("get", true).length;
                        _this._updateNotificationCount(newCount);
                        // console.log("WEBAPP: notifCnt = " + newCount);
                    },
                    refreshrequested: function (ev) {
                        if (!_this._asyncOptions || !Gordic.Async.GTaskManager.isInitialized()) return;
                        Gordic.Async.GTaskManager.syncStates();
                    },
                    actionStarted: function (ev) { $(this).ginlinedialog("close"); }
                });


            // ISL GENERATOR
            if (this._islDescriptor) {
                Gordic.Isl.register(this._islDescriptor);
                delete this._islDescriptor;
            }

            //CONTENT DESCRIPTOR
            if (this._contentCatalog) {
                var descriptors = this._contentCatalog.descriptors || {};
                var cc = {};

                for (var i = 0; i < descriptors.length; i++) {
                    var d = descriptors[i];
                    cc[d.clientClass] = d;
                }

                GContent.createInitializer(function (classId) {
                    var c = cc[classId];
                    if (c) c = $.extend({ className: classId }, c); //NOTE: Dle TS se className nejspise zmeni na nejakou formu url. Zde to pak asi zacne failovat pro serverove contenty.
                    return c;
                });

                delete this._contentCatalog;
            }

            // ASYNC CORE
            if (this._asyncOptions) {
                Gordic.Async.GTaskManager.uninit().then(function () {
                    Gordic.Async.GTaskManager.init(
                        $.extend({
                            delay: 1000 * 10 * 60,
                            notify: function () { return _this.notification.apply(_this, arguments); }
                        },
                            _this._asyncOptions));
                });
            }

            // CONTEXTHELP 
            var ctxHelpArticles = [];
            var contextHelpWidget = $(document.body).gcontexthelp({
                contextChange: function (event, ctx) {
                    if ($(ctx.element).closest('.contexthelp-ignore').length) return false;

                    // ulozeni aktualniho "kurzoru" pro potreby kliku na "?" nebo vyvolani kontextu z debug menu, protoze click/menu zmeni "aktualni focus" i kdyz napovedu chci k necemu co melo focus predtim
                    _this.currentContextHelpElement = ctx.element;
                    var articles = ctx.toc.getArticles(function (a) { return !!a.confirm; });

                    // zobrazeni badge s "important" (vynucenymi a neprectenymi clanky)
                    _this._updateHelpNotification(articles.length || null);

                    // zobrazeni dialogu s potvrzenim jednou za spusteni apliakce
                    if (articles.length) _this.showOverlayHelp(articles); 
                },
            });

            // contextHelp Articles from Blogs
            if (this._ctxHelpBlogs)
                ctxHelpArticles = ctxHelpArticles.concat(Gordic.Utils.GContextHelpController.convertBlogsToCtxHelp(this._ctxHelpBlogs));
            if (this._ctxHelpPackage)
                ctxHelpArticles = ctxHelpArticles.concat(Gordic.Utils.GContextHelpController.convertPckgToCtxHelp(this._ctxHelpPackage, this.globalSettings.sub("Global.core.ContextHelp")));
            if (this.userHelpPdf && ctxHelpArticles.filter(function (article) { return article.file && article.file === _this.userHelpPdf || false}).length > 0) this.userHelpPdf = null; 
            this._ctxHelpChapters = $.extend({ general: { title: "jres:33600001" } }, this._ctxHelpBlogsChapters, this._ctxHelpChapters); //RC 33600001 : Obecné
            var ctxHelpChapters = Object.keys(this._ctxHelpChapters)
                .map(function (key) { return $.extend({ id: key }, _this._ctxHelpChapters[key]); })
                .sort(function (a, b) { return ((a.order || 0) - (b.order || 0)) || (a.title || a.id).localeCompare(b.title || b.id); });

            // SHORTCUT HELPER
            //$(".main-shortcuthelper").gshortcutdirector();
            window.onhelp = function () { return false; };
            $(document.body).gshortcut({
                key: "f1", group: Gordic.Shortcuts.Groups.App, helperVisible: true, action: this.actions.actHelp
            }).gshortcut({
                key: "ctrl+/", group: Gordic.Shortcuts.Groups.App, helperVisible: true, action: this.actions.add("jres:25000125", { visible: false }, function () { _this.actions.actHelp.run({ page: "shortcuts" }); })
            });

            // DEBUG MODE
            $(document.body).gshortcut({
                key: "ctrl+f12", group: Gordic.Shortcuts.Groups.App, helperVisible: true, visible: false, action: this.actions.add({
                    name: "actDebugTool", caption: "jres:25000126", run: function (ev) { //RC 25000126 : Vývojářské nástroje
                        _this.debugMenu(ev);
                    }
                })
            });

            this._shortcutPreview = new Gordic.Utils.GShortcutPreview($(document.body));


            // LOGOUT-TIMER
            if (this.logoutTimer > 0) {
                this._logoutTimerDiv = $("div.logout-timer > span").append("<div class='ui-progress'><div /></div>");
                this._refreshLogoutTimer(true);
                this._logoutTimerInterval = window.setInterval(this._refreshLogoutTimer.bind(this), 1000);
            }

            // VAROVANI PRED OPUSTENIM APLIKACE / OBSLUHA HISTORY BACK TLAČÍTKA
            Gordic.WebApp.Utility.handleApplicationLeave({
                back: function () {
                    var visibleContent;
                    if ((visibleContent = $.content($(".activity-content:visible"))) != null && visibleContent.element && !visibleContent.element.hasClass('root-activity')) {
                        //woohoo there is content to close!
                        return visibleContent.tryClose().then(function () { return; }, function () { return $.Deferred().resolve(); }); //we managed back, so resolve in all cases.
                    } else
                        return $.Deferred().reject(); //we didn't manage back, we should be asked if app should be closed.
                },
                askLeave: window.ginisDevelopMode !== true ? function (isLeavingBack) { // ask if app should be closed.
                    // VAROVANI PRED OPUSTENIM APLIKACE  - hodnota uložená v user settings Global.core.webAppClosePrompt
                    return isLeavingBack || (_this.globalSettings.getDef("Global.core.webAppClosePrompt", true) === true && _this.suppressAskLeave !== true);
                } : null
            });

            // GLOBALNI UDALOSTI
            $(document.body).off(".webappmain").on({
                "contentexception.webappmain": function (ev, exc, content) {
                    if (exc.exceptionType === "Gordic.General.WebApplication.GWebSequenceLogoutException") {  // k tomuhle nesmi normalne nikdy dojit, ale... . A protoze se s aplikaci neda uz pracovat na 
                        exc.handled = true;
                        _this.abortAllCalls = true; // logout vola serverove uklizeci metody, ktere v tomto pripade maji spadnout na stejnou vyjimku
                        _this.logout(true, { reason: "jres:25000080<br>jres:25000081: " + htmlEncode(exc.shortMessage), status: "error", backMask: 128 });     //RC 25000081 : Důvod
                    } else if (exc.unauthorized && exc.handled !== true) { //
                        if (content.loaded === true);// { if (content !== _this && exc.target !== "hidden") content.showFlash({ label: "jres:25000053", id: "unauthorized", state: "error" }); }//RC 25000053 : Chyba autorizace // TODO: chybny chain: toto se vola pred fail promisama, ktere mohly nastavit handled=true (changeContext) 
                        else if (content !== _this) content.close();
                        else {
                            exc.handled = true;
                            _this.abortAllCalls = true; // logout vola serverove uklizeci metody, ktere v tomto pripade maji spadnout na stejnou vyjimku
                            _this.logout(true, { reason: "jres:25000018", status: "error", backMask: 128 });     //RC 25000018 : Server nedokázal obnovit relaci. Z bezpečnostních důvodů byla aplikace ukončena.
                        }
                    }

                    if (exc.handled !== true)
                        _this.log.fatal(new GError(31100003, err));
                },
                "contentnotification.webappmain": function (ev) {
                    if (ev.isDefaultPrevented()) return; 

                    var $notificationCenter = $(".main-notificationcenter");
                    return $notificationCenter.gnotificationlist.apply($notificationCenter, Array.prototype.slice.call(arguments, 1));
                },
                "contentstartasync.webappmain": function (ev, className, customDto, taskOptions) {
                    if (ev.isDefaultPrevented() || !_this._asyncOptions) return null;
                    taskOptions = $.extend({ parentContent: $.content(ev.target) }, taskOptions ?? {});
                    return Gordic.Async.GTaskManager.delayedStart(className, customDto, taskOptions)
                        .then(function (t) { return t.getPromise(); });
                },
                "contentonasync.webappmain": function (ev, evName, filter, evHandler) {
                    if (ev.isDefaultPrevented() || !_this._asyncOptions || !Gordic.Async.GTaskManager.isInitialized()) return null;
                    return Gordic.Async.GTaskManager.on(evName, filter, evHandler);
                },
                "contentoffasync.webappmain": function (ev, evName, evHandler) {
                    if (ev.isDefaultPrevented() || !_this._asyncOptions || !Gordic.Async.GTaskManager.isInitialized()) return null;
                    return Gordic.Async.GTaskManager.off(evName, evHandler);
                },
                "applicationReloadRequest.webappmain": function (ev) {
                    _this.closeActivity().done(function () { _this.load(); });
                },
                "click.webappmain dblclick.webappmain contextmenu.webappmain keydown.webappmain": function (ev) {
                    if ((ev.originalEvent && ev.originalEvent.isTrusted === true) || (!ev.originalEvent && ev.isTrusted === true))
                        _this._refreshLogoutTimer(true);
                },
                "applicationhelp.webappmain": function (ev, pages) {  // F1 - HELP
                    // CONTEXTHELP
                    var help = contextHelpWidget.gcontexthelp("getContextHelp", ev.target);
                    var helpArticles = help.toc.getArticles();
                    if (help && helpArticles.length)
                        pages.push({
                            id: "contexthelp",
                            header: { caption: "jres:25000130 ({0})".format(helpArticles.length) }, //RC 25000130 : Nápověda
                            activate: function (div, opts) {
                                $(div).gcontent([Gordic.Gui.WebApp.GContextHelpDisplay, { ctxhelp: help, shouldSort: true }]);
                            }
                        });

                    // SHORTCUTS 
                    pages.push({
                        id: "shortcuts",
                        header: { caption: "jres:25000125" }, //RC 25000125 : Klávesové zkratky
                        activate: function (div, opts) {
                            Gordic.Utils.createShortcutsHelpForm(ev, null, $(opts.contextElement || ev.target).gshortcut("all"), true).appendTo(div).gform("complete");
                        }
                    });


                    // THIRD PARTY LICENSE
                    pages.push({
                        id: "thirdpartylics",
                        header: { caption: "jres:31150088", align: "opposite" }, //RC 31150088 : Licence 3. stran
                        activate: function (div, opts) {
                            $(div).gcontent("Gordic.Gui.WebApp.GLicenceKomponentDlg")
                                .gcontent("load");
                        }
                    });

                    // 01.09.2023 - TFeik
                    // REVISIONS
                    if (_this.isl.Revize)
                        pages.push({
                            id: "revisions",
                            header: { caption: "jres:32142519", align: "opposite" }, //RC 32142519 : Revize
                            activate: function (div, opts) {
                                $(div).gcontent([Gordic.Gui.WebApp.GRevizeDlg], { SetGridIntoTab: true, IsAutofitInParentElement: true });
                            }
                        });

                    // ABOUT
                    pages.push({
                        id: "about",
                        header: { caption: "jres:31150021", align: "opposite" }, //RC 31150021 : O aplikaci
                        activate: function (div, opts) {
                            $(div).gcontent([Gordic.Gui.WebApp.GAboutControl]);
                        }
                    });

                },
                "contexthelp.webappmain": function (ev, obj) {  // sesbirani clanku k elementu
                    ctxHelpChapters.forEach(function (chapter) { obj.toc.chapter(chapter); }); // priprava fixnich kapitol

                    Gordic.Utils.GContextHelpController.applyConstraints(obj.toc, ctxHelpArticles, obj.constraints);  // filtrace clanku dle kontextu

                    if (_this.userHelpPdf)
                        obj.toc.chapter(_this._ctxHelpChapters.pdf ? "pdf" : "general").articles.push({
                            id: "AppDocumentation",
                            title: "jres:31150086", //RC 31150086 : Základní příručka uživatele
                            content: Gordic.Utils.gz("help", _this.userHelpPdf),
                            contentType: "pdf"
                        });
                },
                "mdlink.webappmain": function (ev, obj) {
                    if (ev.isDefaultPrevented()) return;
                    switch (obj.uri.scheme) {
                        case "help":
                            _this.element.trigger("helprequest", [obj.uri.path, obj.uri.fragment]);
                            ev.preventDefault();
                            break;
                        case "action":
                            if (_this.actions[obj.uri.path])
                                _this.actions[obj.uri.path].run(obj.uri.queryParams);
                            ev.preventDefault();
                            break; 
                        case "app":
                            var p = Gordic.WebApp.Utility.openApp(obj.uri.authority || null, obj.uri.path, obj.uri.queryParams)
                                .fail(function () {
                                    _this.notification("showToast", {
                                        icon: "fa-times",
                                        content: "jres:25000147".format(obj.uri.authority || ""),  //RC 25000147 : Modul {0} se nepovedlo otevřít 
                                        state: "error",
                                    });
                                });
                            ev.preventDefault();
                            break;                            
                    }
                },
                "helprequest.webappmain": function (ev, id, anchor) {
                    _this.dialogs.showModalWindow([Gordic.Gui.WebApp.GContextHelpDisplay, { article: id, anchor: anchor }], null, { width: 800, height: 784 });
                },
                "applicationdebug.webappmain": function (ev, tools, originalEvent) { // CTRL+F12 - DEBUG
                    // DESIGN MODE 
                    tools.push({
                        id: "miDesignMode",
                        caption: "jres:25000129", //RC 25000129 : Návrhové nástroje
                        type: "static",
                        children: [
                            {
                                action: new GAction({
                                    name: "actDebugShowUserSettings", caption: "jres:25000128", run: function () { //RC 25000128 : Identifikace uživ. nastavení
                                        var createNavAssist = function (control, us) {
                                            var path = typeof us === "string" ? (us || null) : us && us.isVirtual() === false ? us.rootSection : null;
                                            return $("<div class='admin-mode-nav-assist g-state-lightbackground'>")
                                                .addClass(path ? "g-state-success" : "g-state-error")
                                                .text(control + (path ? " @ " + path : " (N/A)"))
                                                .click(function () { path && $.content("main").navigate(Gordic.WebApp.AdminSettings, { path: path, admin: _this.param_ginUSTEditor === true }); });
                                        };
                                        /*    $(document.body).gshortcut({
                                                key: 'ctrl+alt+m', description: 'jres:25000087', group: Gordic.Shortcuts.Groups.App, run: function (ev, ctx) { */ //RC 25000087 : Navigační assistent uživatelského nastavení
                                        $(".admin-mode-nav-assist").remove();
                                        $(".gtoolbar").each(function () { var $this = $(this); $this.prepend(createNavAssist("ToolBar", $this.gtoolbar("option", "userSettings"))); });
                                        $(".ggrid").each(function () { var $this = $(this); $this.prepend(createNavAssist("Grid", $this.ggrid("option", "userSettings"))); });
                                        $(".gfilterpanel").each(function () { var $this = $(this); $this.prepend(createNavAssist("FiltrPanel", $this.gfilterpanel("instance").gStore)); });
                                        $(".gcontent").each(function () { var $this = $(this); $this.prepend(createNavAssist("Content", $this.gcontent("userSettings")).css("right", "unset")); });
                                        $(".js-FormSKriterii .gfield").each(function () {
                                            var $this = $(this);
                                            var model = $this.gfield("option", "model"), i;
                                            if (typeof model === "string") {
                                                if ((model = model.split("=")[0]).indexOf(".") >= 0)  // vezmeme jen prvni levou cast a zkontrolujeme "." (do rootu settings je nezadouci zapisovat => prozatim vynechame)
                                                    $this.prepend(createNavAssist("UserSetting", model).css("right", "unset"));
                                            }
                                        });
                                        $("[data-admin-mode-nav-assist]").each(function () {  // universalni endpoint, na ktery se muze chytnout kdokoliv 
                                            var $this = $(this);
                                            var us = $this.data("admin-mode-nav-assist");
                                            var navAssist = $this.triggerHandler("adminmodenavassist", createNavAssist);
                                            if (typeof navAssist === "undefined") navAssist = createNavAssist("UserSetting", us); // default
                                            if (navAssist) $this.prepend(navAssist);
                                        });
                                        /*      },
                                          });*/
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "actDebugShowContextHelpContext", caption: "jres:25000131", run: function () { //RC 25000131 : Zobrazit kontext nápovědy
                                        var target = (originalEvent && originalEvent.target) || _this.currentContextHelpElement; 
                                        var help = contextHelpWidget.gcontexthelp("generateConstraints", target);
                                        //_this.dialogs.showModalWindow($.newDiv("detail-content").html(help.join("<br>")), null, { title: "jres:25000133", width: 500, height: 400, buttons: [Gordic.Dialogs.Buttons.mbbClosePrimary], userSettings: "Global.core.dlgContextHelpHelper" }); 
                                        var frm = new Gordic.Forms.Form("LMS-0-12-0")
                                            .addField("gstringbox", {
                                                name: "constraint", disabled: true, buttons: [{ requireValue: true, requireEdit: false, action: new GAction({ name: "actCtxHelperToClipBoard", description: "jres:25000134", icon: "fa-clone", run: function (ev, ctx) { this.setPending(Gordic.Utils.copyToClipboard($(ctx.field).gfield("getValue"), _this)); } }) }] //RC 25000134 : Zkopírovat do schránky
                                            }).addRow();
                                        help.forEach(function (it) {
                                            frm.addField("gcheck", {
                                                label: it, dataConstraint: it, change: function (ev, obj) {
                                                    $(this).gform().findFields("constraint").gfield("setValue", $(this).gform().findFields(".gcheck").get().filter(function (chb) { return $(chb).gfield("getValue") === true; }).map(function (chb) { return $(chb).gcheck("option", "dataConstraint"); }).join("&"));
                                                }
                                            });
                                        });
                                        var dlg = _this.dialogs.simpleForm("jres:25000133", frm, null, {
                                            width: 500, height: 600, userSettings: "Global.core.dlgContextHelpHelper", commandBar: [{
                                                primary: true, action: new GAction({ name: "actClose", caption: Gordic.Dialogs.Buttons.mbbClose.text, run: function (ev) { dlg.gcontent().close(); } })
                                            }]
                                        }).on("close", function () { $(target).focus(); }); 
                                    }
                                })
                            },
                            {
                                action: _this.actions.actTranslationHelper
                            }
                        ]
                    });

                    tools.push({
                        id: "miAnalysis",
                        caption: "jres:25000142", //RC 25000142 : Analýza
                        type: "static",
                        children: [
                            { action: _this.actions.actContentAnalysis },
                            { action: _this.actions.actAsyncViewer },
                            _this.actions.actShowStats ? { action: _this.actions.actShowStats } : null,       // ACTION SHOW STATS
                            _this.actions.actShowUsers ? { action: _this.actions.actShowUsers } : null       // ACTION SHOW USERS

                        ].filter(function (it) { return it !== null })
                    });

                    // LOG TO FILE
                    if (_this.actions.actLogToFile) {
                        tools.push({ action: _this.actions.actLogToFile });
                    }

                    // DATABASE PARAMETERS 
                    if (_this.actions.actDBParamList) {
                        tools.push({
                            action: _this.actions.actDBParamList
                        });
                    }
                },
                "unhandledexception.webappmain": function (ev, err) {
                    ev.preventDefault(); //v gjquery v metode onException zjistujeme, jestli to nekdo osetril. Alernativou by bylo pridat tuto udalost do WebAppInit.jsx

                    if (!err || err.handled || _this.closed) return;

                    var target = err.target ? err.target : "window"; //"window"|"toast"|"hidden"
                    var errorType = err.errorType || "error";

                    if (target === "window") _this.dialogs.showException(err);
                    else if (target === "toast") {
                        _this.notification("showToast", {
                            title: err.title || null,
                            content: err.nonFatalMessage || err.message || err.shortMessage || "",
                            state: errorType,
                            defaultAction: new GAction({ name: "actShowExceptionDetails", run: function () { _this.dialogs.showException(err); } })
                        });
                    }

                    if (errorType === "error" && !(err instanceof GAbortError)) _this.log.fatal(err);
                }
            });

            //NOTE (BM): Toto je asi k prdu. Ten stack je nepouzitelnej
            //$.Deferred.getStackHook = function () { return new Error().stack; };

            $(window).off(".webappmain").on("unload.webappmain", function (ev) { if (!_this.closed) _this.logout(true); });

            // OSTATNI REGISTRACE 
            this.registerMaximizeHandlers();
            this.isSignificant = function () { return true; };

            if (this.globalSettings.getDef("Global.core.webAppStartupMaximize", false) === true)
                this.maximize();

            this.applicationStart();

            // 23.08.2022 - TFeik
            // Pokud je uživatelem nastavena výchozí akce, pak spustím ji.
            // Zároveň kontroluji, zda se akce opravdu spustila a pokud ne, tak se spustí původní výchozí akce.
            var urai = this.globalSettings.get("Global.Gui.UserAutoRun.actionId");

            if (this.autoRunAction && this.autoRunAction.indexOf("task:") > -1) {
                //NOTE (BM): Pokud oteviram aplikaci pres odkaz. Napr. uzivatel si klepne v tasklistu
                //           pravym tlacitkem na akci a vybere "Otevrit odkaz v nove karte".
                this.taskList().gtasklist("setActive", this.autoRunAction.substring(5), true);
            }
            else if (urai && Gordic.Gui.WebApp.UserAutoRunField.runUserAction(
                this.taskList(),
                this.actions,
                urai
            ));
            else if (this.autoRunAction) {
                var act = this.actions[this.autoRunAction];
                if (act instanceof GAction) act.run();
            }

            // zpozdeny applicationReady
            $.tryTimeout(
                this.applicationReady.bind(this),
                function () { return _this.closed === true ? null : _this.loading === false; },
                { id: "webAppApplicationReady" }
            );
        },
        onWebAppOps: function (ops, forced) {
            if (this.loaded === false && forced !== true) // pri uplne prvnim volani zpozdime, aby se Ops zavolalo s jiz spravne vytvorenym userSettings (taskList)
                this.__delayedOps = ops;
            else {
                if (ops.userMenu) this._userMenuInfo = ops.userMenu;
                if (ops.taskList) this.taskList(ops.taskList);
                if (ops.appBar) this.appBar(ops.appBar);
                if (ops.title) this._defaultTitle = document.title = ops.title;
            }
        },
        applicationStart: function () {
            return this.dispatchEvent("applicationStart", arguments, { usePrefix: false, useNative: true });
        },
        applicationReady: function () {
            return this.dispatchEvent("applicationReady", arguments, { usePrefix: false, useNative: true });
        },
        applicationDebug: function () {
            return this.dispatchEvent("applicationDebug", arguments, { usePrefix: false });
        },
        applicationEnd: function () {
            return this.dispatchEvent("applicationEnd", arguments, { usePrefix: false, useNative: true });
        },
        runDefaultAction: function (delayed) {
            var _this = this; 
            if (this.closed === true) return; 

            if (delayed === true) {
                var daar = this.defaultActivityTimer = window.setTimeout(function () {
                    if (daar === _this.defaultActivityTimer && $(".root-activity").length === 0 && _this.closed === false && _this.loading === false) // check jestli ho nekdo nedisablnul, nebo se nepustil podruhe, apod.
                        _this.runDefaultAction(false);
                }, 100);
            } else if (this.startAction) {
                var act = this.actions[this.startAction] || this.startAction;
                if (act instanceof GAction) {
                    act.run();
                    if (this._appSearchField && this._appSearchField.hasClass("gsearchfield"))
                        this._appSearchField.gsearchfield("reset");
                }
            }
        },
        taskList: function (tasks) {
            var pane = this.find(".main-tasklist");
            var _this = this;

            if (typeof tasks == "undefined") return pane.filter(".gtasklist");

            if (!tasks || tasks.length === 0) {
                pane.filter(".gtasklist").gtasklist("destroy");
            }
            else {
                var onStateChange = function () {
                    var collapsed = !!$(this).gtasklist("option", "collapsed");
                    var isMobile = _this.element.hasClass("mobile"); 
                    $(this).parent(".main").toggleClass("main--collapsed", collapsed);
                    _this.element.find(".main-tasklist-command i").toggleClass("gi-menu", collapsed).toggleClass("gi-window-close", !collapsed);
                    _this.actions.actShowTaskList.update({ icon: collapsed ? "gi-menu" : "gi-window-close" });
                    $(window).resize();
                    if (!isMobile) 
                        _this.userSettings.set("taskListCollapsed", collapsed);
                };
                pane.gtasklist({
                    params: tasks,
                    actions: this.actions,
                    header: {       //definice hlavicky
                        applicationAbbr: this.applicationAbbr || "",
                        applicationRevision: this.applicationRevision || ""
                    },
                    collapse: onStateChange,
                    expand: onStateChange,
                    userSettings: this.userSettings.sub("tasklist"),
                    createActionUrl: function (menuParams) {
                        return Gordic.WebApp.Utility.createCommandUrl(
                            null,
                            "RunTask",
                            {
                                id: menuParams.id,
                                Profile: _this.dbProfile,
                                ctx: {}
                            }
                        );
                    }
                });
            }
        },
        setTaskList: function () {
            var _this = this;

            if (!this.actions.actShowTaskList) {
                this.actions.addRange({
                    "actShowTaskList": {
                        icon: "gi-menu",
                        caption: "jres:25000079", //RC 25000079 : Seznam úloh
                        captionVisible: "never",
                        run: function (ev, ctx) {
                            _this.taskList().gtasklist("option", "collapsed", false);
                        }
                    }
                });
                this.element.find(".main-tasklist-command").gbutton({
                    params: {
                        action: this.actions.actShowTaskList
                    }
                });
                $(document.body).off(".webappmainmobiletasklist").on({
                    "actionbeforeexecute.webappmainmobiletasklist": function (ev, action) {
                        if (_this.taskList().gtasklist("option", "collapsed") !== true) {
                            if (action.name === "actShowTaskList") // pokud se klikne znovu na akci, akci zastavime a provedeme jenom zavreni
                                ev.preventDefault();
                            if (_this.element.hasClass("mobile") === true)
                                _this.taskList().gtasklist("option", "collapsed", true);  // po vybrani libovolne akce kdekoliv tasklist zavreme
                        }
                    },
                });

            }

            this._resetTasklistState();
        },
        appBar: function (commands) {
            var pane = this.find(".main-commandbar");
            var topBar = this.find(".main-topbar");

            if (typeof commands === "undefined") return pane;
            if (commands === null) { topBar.hide(); pane.gbuttonpanel("destroy"); return; }
            else topBar.show(); 

            // SEARCH FIELD
            var searchBar = commands.filter(function (p) {
                return p && p.customClass === "g-search-bar";
            });
            if (searchBar.length > 0)
                this._createAppSearch(searchBar[0]); 

            pane.gbuttonpanel({
                params: commands,
                itemCreated: function (ev, ctx) { if (ctx.item.hasClass('g-search-bar')) ctx.item.attr({ 'role': 'search', 'aria-label': 'jres:31750018', 'aria-keyshortcuts': 'Control+Q' });}, //RC 31750018 : Celoaplikační
                actions: this.actions,
                menuAction: { icon: "gi-dots gi-rot90", customClass: "main-more-menuitem" },
                itemMode: "captionVisible",
                tabindexMode: "single",
                menuOptions: { itemBuilder: new Gordic.Utils.Menu.GActionMenuAltItemBuilder() }
            });

            this._updateNotificationCount(0);
        },

        //APP LAUNCHER
        _showAppLauncher: function (ev, ctx) {
            if (this._appLauncher == null) this._createAppLauncher();
            var related = $(".g-app-launcher__button.gbutton");
            if (related.length === 0) related = $(ev.currentTarget);

            this._appLauncher.ginlinedialog("option", "related", related);
            this._appLauncher.ginlinedialog("toggle", related);
        },
        _createAppLauncher: function () {
            if (this._appLauncher != null) return;
            var _this = this;

            this._appLauncher = $("<div class='g-app-launcher g-app-launcher--nokpi'>");

            var action = new GAction({
                name: "actRunShortcut", run: function (ev, ctx) {
                    var app = Gordic.Consts.Apps.find(function (item) { return item.faze === ctx.faze; });
                    Gordic.WebApp.Utility.openApp(app.faze, null, null, { ticketType: Gordic.Enums.TicketType.WithLogin });
                    _this._appLauncher.ginlinedialog("close");
                }
            });
            var iconBuilder = new Gordic.Utils.ButtonIconBuilder({ imageIconSize: 48 });
            var appsCount = Gordic.Consts.Apps.length;

            if (appsCount === 0) {
                this._appLauncher.addClass("g-app-launcher--no-apps");
                $("<p>").appendTo(this._appLauncher).text("jres:31750001"); //RC 31750001 : Nebyly nalezeny žádné nainstalované aplikace.
            }

            for (var appIndex = 0; appIndex < appsCount; appIndex++) {
                var app = Gordic.Consts.Apps[appIndex];
                const shortcut = app.faze.substring(3,6);
                $("<div class='g-app-launcher__item" + (shortcut === _this.applicationAbbr ? " g-app-launcher__item--current" : "") + "'>")
                    .appendTo(this._appLauncher)
                    .gbutton({
                        iconBuilder: iconBuilder,
                        menuOptions: {
                            reattachOnShow: true
                        },
                        params: {
                            action: action,
                            actionContext: { faze: app.faze },
                            caption: shortcut,
                            captionVisible: "never",
                            icon: "app:"+app.faze+".svg",
                            tooltip: app.description,
                            //children: [] //TODO: dodělat tasky pro jednotlive aplikace
                        }
                    });
            }

            this._appLauncher.ginlinedialog({
                autoClose: true,
                closeButton: null,
                width: 248,
                position: {
                    of: "related",
                    my: "left top",
                    at: "left bottom",
                    within: window,
                    collision: "fit flip"
                },
                open: function () {
                    $(".g-app-launcher__button.gtooltip").gtooltip("option", "disabled", true).addClass("g-button--mb-activated");
                    var focusable = _this._appLauncher.find(":focusable");

                    if (focusable.length > 0) $(focusable.get(0)).focus();
                },
                close: function () {
                    $(".g-app-launcher__button.gtooltip").gtooltip("option", "disabled", false).removeClass("g-button--mb-activated");

                }
            });//.mCustomScrollbar({ theme: "minimal-dark" });

        },

        _createAppSearch: function (menuParam) {
            var that = this;
            var resolvers = [
             //   new Gordic.Components.Search.GActionSearchResolver({}),
                new Gordic.Components.Search.GTaskSearchResolver({}),
                new Gordic.Components.Search.GContextHelpSearchResolver()
                            /*new Gordic.Components.Search.GTestSearchResolver({})*/];

            if (Gordic.Consts && Gordic.Consts.Apps && Gordic.Consts.Apps.length > 0) {
                resolvers.unshift(new Gordic.Components.Search.GAppSearchResolver({}));
            }

            this.appSearchResolver = new Gordic.Components.Search.GMainSearchResolver({
                resolvers: resolvers
            });

            menuParam.id = 'searchfield';
            menuParam.type = "widget";
            menuParam.init = function () {
                return that._appSearchField = $("<div>").addHelpContext("field:appSearch").gsearchfield({
                    resolver: that.appSearchResolver,
                    placeholder: 'jres:31750013' //RC 31750013 : Hledat v aplikaci…
                });
            };
          // attach/detach existingwidgetu "GMenu.MenuParamsWidgetInternal"
            menuParam.alt = {
              type: 'action',
              customClass: 'g-mainapp-searchfield',
              action: new GAction({
                name: 'actOpenSearchContent',
                caption: 'jres:31750011', //RC 31750011 : Vyhledávání
                icon: 'gi-magglass',
                captionVisible: 'never',
                run: function (ev, ctx) {
                  if (that._appSearchInline != null) {
                    that._appSearchInline.ginlinedialog('close');
                    that._appSearchInline = null;
                  } else {
                      // 27.05.2020 - TFeik
                      // Pokud je akce spuštěna z burgeru, pak zobrazím hledání v dialogu.
                      if (ctx._contextPath && ctx._contextPath.length > 0 && ctx._contextPath.filter(function (a) { return $(a).hasClass('js-menu-item'); }).length > 0) {
                          Gordic.Gui.Dialogs.GSearchfieldDlg({
                              ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                              opt: {
                                  zavritContentPoSpusteniAkce: true
                              }
                          });
                          return;
                      }

                      that._appSearchInline = $('<div>')
                          .ginlinedialog({
                              width: 500,
                              height: 250,
                              related: $(ev.target),
                              createClosed: true,
                              autoClose: true,
                              closeButton: null,
                              customClass: 'ginlinedialog--light-shadow',
                              open: function () {
                                  that._appSearchInline.find('input').trigger('focus');
                              },
                              close: function () {
                                  that._appSearchInline.remove();
                                  that._appSearchInline = null;
                              },
                          });

                      var searchField = $('<div>').addHelpContext("field:appSearch");
                      that._appSearchInline.append(searchField);
                      searchField.gsearchfield({
                          expandingWidth: false,
                          // 29.05.2020 - TFeik
                          // Změna rendereru na "Zobrazit více".
                          resultRenderer: new Gordic.Components.Search.GSearchResultActionMenuRendererWithShowMore(that._appSearchInline),
                          resolver: that.appSearchResolver,
                      });

                    that._appSearchInline.ginlinedialog('open');
                  }
                },
              }),
            };

            $(document.body).gshortcut({
                key: 'ctrl+q',
                description: 'jres:25000047', //RC 25000047 : Vyhledat v aplikaci.
                group: Gordic.Shortcuts.Groups.App,
                action: new GAction({
                  name: 'searchActivate',
                  run: function () {
                    var el = that._appSearchField.find(':focusable:visible');
                    if (el.length === 1) {
                      el.focus();
                    } else {

                        el = that.element.find('.g-mainapp-searchfield:visible :focusable');
                        if (el.length > 0) {
                            el.click();
                        }
                    }
                  },
                }),
            });
        },

        //Desktop/mobile layout
        _initLayoutSizeObservation: function () {
            var _this = this;
            Gordic.ResizeManager.observe(this.element[0], {
                id: "mainapp",
                isActive: function (actualRect, prevRect, lastActiveRect) { return true; },
                execute:  function (actualRect, prevRect, lastActiveRect) { _this._updateLayout(); },
                wait: 500,
                leading: true
            });
        },
        _uninitLayoutSizeObservation: function () {
            if(Gordic && Gordic.ResizeManager)
                Gordic.ResizeManager.unobserve(this.element[0], "mainapp");
        },
        _updateLayout: function () {
            var showMobileLayout = this.element[0].clientWidth <= 560;
            var wasMobile   = this.element.hasClass("mobile");

            //Neni zmena, neni nutne delat nic
            if (showMobileLayout === wasMobile) return;

            this.element.toggleClass("mobile", showMobileLayout);
            this.element.find(".main-tasklist-command").toggleClass("hidden", showMobileLayout !== true);
            this.actions.actShowTaskList.update({ visible: !!showMobileLayout });

            if (wasMobile && !showMobileLayout) {
                //Prepnuti z mobilniho na desktopove rozlozeni
                this._resetTasklistState();
            }
            else if (!wasMobile && showMobileLayout) {
                //Prepnuti z desktopoveho na mobilni
                var tl = this.taskList();
                if (tl.hasClass("gtasklist"))
                    tl.gtasklist("option", "collapsed", true);
            }
        },
        _resetTasklistState: function () {
            var tl = this.taskList();
            if (tl.hasClass("gtasklist")) {
                tl.gtasklist("option", "collapsed", this.userSettings.getDef("taskListCollapsed", this.taskListCollapsed || false));
                //NOTE: BM 2021-10-01: Nasledujici zamezuje prekryti tasklistu activity contentem v nekterych pripadech. Viz T14756.
                $("div.activity-dialog:last").children("div.activity-content").dialog("updateSize").resize().triggerHandler('dialogresize');
            }
        },

        logout: function (forced, closeObj) {
            var _this = this; 
            if (this._logoutProceeding === true) return; 
            this._logoutProceeding = true; 

            closeObj = $.extend({ reason: "jres:25000016", status: "success", backText: this.logoutRedirect.text || "jres:25000017", backScript: this.logoutRedirect.action || "javascript:window.location.reload()", backMask: 1 }, closeObj); //RC 25000016 : Byli jste úspěšně odhlášeni
            if (typeof closeObj.backAuto === "undefined" && typeof closeObj.backMask === "number" && this.logoutRedirect.autoMask > 0) closeObj.backAuto = (closeObj.backMask & this.logoutRedirect.autoMask) > 0;

            if (forced) {
                try {
                    if (this._asyncOptions) Gordic.Async.GTaskManager.uninit();
                    Gordic.Gui.WebApp.GNLogSupport.setupBeforeLogoutForced();
                    window.clearInterval(this._logoutTimerInterval);
                    this._shortcutPreview.destroy();
                    $(document.body).gcontexthelp("destroy");
                    this._uninitLayoutSizeObservation();
                    window.gstor && (window.gstor._logoutSave = true) && window.gstor.save(true);
                    this.applicationEnd();
                }
                finally {
                    window.setTimeout(function () {
                        try {
                            new GAjax().wsCall("logout", { gpc: $.extend({ close: 'all' }, _this.gpc), logoutType: closeObj.logoutType });
                        }
                        finally {
                            _this.close(closeObj);
                            _this._logoutProceeding = false;
                        }
                    }, 2000);
                }
            } else
                this.closeActivity()
                    .then(function () { if (_this._asyncOptions) return Gordic.Async.GTaskManager.uninit(); })
                    .then(function () { return Gordic.Gui.WebApp.GNLogSupport.setupBeforeLogout(); })
                    .then(function () {
                        _this.beginOperation({ title: "jres:25000051" }); //RC 25000051 : Probíhá odhlašování
                        window.clearInterval(_this._logoutTimerInterval);
                        _this._shortcutPreview.destroy();
                        $(document.body).gcontexthelp("destroy");
                        _this._uninitLayoutSizeObservation();
                        window.gstor && (window.gstor._logoutSave = true) && window.gstor.save(true);
                        _this.applicationEnd();

                        var def = $.Deferred();
                        window.setTimeout(def.resolve, 2000);
                        return def.promise();
                    })
                    .then(function () { return new GAjax().wsCall("logout", { gpc: $.extend({ close: 'all' }, _this.gpc), logoutType: closeObj.logoutType }); })
                    .always(function () { _this.endOperation(); })
                    .done(function () {
                        _this.close(closeObj);
                    }).always(function () { _this._logoutProceeding = false; });
        },
        destroy: function () {

        }, 
        changeUserContext: function (contextParams) {
            if (!contextParams) return;
            var _this = this;

            _this.changeContext($.extend({}, this.gpc, contextParams))
                .fail(function (xhr, typ, exc) {
                    if (exc && exc.unauthorized) {
                        _this.handled = true; //TODO: toto je s otazníkem ... exc.handled by mi dávalo smysl ...  
                        _this.runDefaultAction();
                    }
                });
        },
        userSettingsTask: function () {
            this.navigateTask(Gordic.WebApp.UserSettingsContent, { gstor: window.gstor, forms: Gordic.WebApp.globalSettingForms.get(), admin: cnt.param_ginUSTEditor === true });
        }, 
        showBreadcrumbs: function (_breadcrumbs) {
            var _this = this; 

            var pane = this.find("nav.main-breadcrumbs");
            var list = pane.find(".main-breadcrumbs-list").empty();
            var count = _breadcrumbs.length;

            // samotné vytvoření breadcrumpů
            var last = null;
            for (var i = 0; i < count; i++) {
                var crumb = _breadcrumbs[i];
                if (!crumb.type && crumb.caption && !crumb.icon && !crumb.action && !crumb.children) {
                    last = $("<li>").appendTo(list).append($.newSpan().text(crumb.caption).attr('tabindex','0')).prepend('<span class="sep" aria-hidden="true">');
                } else {
                    if (!crumb.type && !crumb.action) crumb.type = "static";
                    last = $("<li>").appendTo(list).glink({ params: crumb }).prepend('<span class="sep" aria-hidden="true">');
                }
            }

            if (!this.actions.actCloseActivity)
                this.actions.addRange({
                    "actCloseActivity": {
                        caption: "jres:31750012", //RC 31750012 : Zavřít aktuální obsah
                        tooltip: "jres:31750012", //RC 31750012 : Zavřít aktuální obsah
                        icon: "gi-window-close",
                        run: function () {
                            var cnt = $.content($("div.activity-content:visible:last"));
                            if (cnt) this.setPending(cnt.tryClose().done(function () { if ($("div.activity-content").length === 0) _this.runDefaultAction(); })); 
                        }
                    }
                });

            // přidání křížku do posledního itemu ... toto možná bude potřeba řešit lépe ...
            if (last !== null && $("div.activity-content:visible").length) {
                $('<div class="breadcrumb-close">').appendTo(last).glink({
                    params: {
                        action: this.actions.actCloseActivity,
                        ariaCaption: "jres:31750012", //RC 31750012 : Zavřít aktuální obsah
                        captionVisible: "never",
                        caption:""
                    }
                });
            }

            var backElement = pane.find('.breadcrumb-back');
            if (backElement.length === 0) {
                backElement = $('<div class="breadcrumb-back">').prependTo(pane).glink({
                    params: {
                        action: this.actions.actCloseActivity,
                        icon: "gi-arrow gi-rot180",
                        captionVisible: "never",
                        caption: "",
                        ariaCaption: "jres:31750014",//RC 31750014 : Zpět
                        tooltip: "jres:31750014",//RC 31750014 : Zpět
                    }
                });
            }

            // pokud se změní obsah breadcrumpu z prázdného na plný nebo naopak, je potřeba udělat resize
            if (count > 0 ? pane.hasClass('main-breadcrumbs--empty') : !pane.hasClass('main-breadcrumbs--empty')) {
                pane.toggleClass('main-breadcrumbs--empty', count === 0);
                $(window).resize();
            } 

            list.prop("scrollLeft", 1000000); // scroll na posledni (pro .mobile)
        },
        updateBreadcrumbs: Gordic.Utils.debounced(function (activity) {
            if (this.closed) return;
            var that = this;
            activity = activity || $.content($("div.activity-content:visible:last"));
            var _breadcrumbs = [];
            var prevActivity = null;
            var taskId = null; 
            while (activity) {
                var isActivity = activity.element.is(".activity-content");
                if (activity.breadcrumbs)
                    for (var i = activity.breadcrumbs.length - 1; i >= 0; i--) {
                        var br = activity.breadcrumbs[i];
                        _breadcrumbs.unshift(br.defaultAction === true ? $.extend({
                            action: prevActivity ? new GAction({
                                name: "actAutoBreadcrumbBack" + (uuid++), run: (function () { this.tryClose(); }).bind(prevActivity)
                            }) : null
                        }, br) : br);
                    }
                else if (activity !== this && isActivity) {  // pro main title nepridavame, pouze custom breadcrumbs // prohledavame pouze aktivity, ne taby nebo sidebary
                    if (activity.title) {
                        _breadcrumbs.unshift({
                            caption: activity.title, action: prevActivity ? new GAction({
                                name: "actAutoBreadcrumbBack" + (uuid++),
                                run: (function () { this.tryClose(); }).bind(prevActivity)
                            }) : null
                        });
                    } else if (!activity.loaded && activity.loadingAwait.state() === "pending") {  // loaded muze byt false a loadingAwait muze byt resolved, napr. pro uplne prazdny content, ktery muze byt loadovany externe napr. tab.onload (setnout loading je povinne, setovat await bohuzel ne)
                        _breadcrumbs.unshift({
                            tooltip: "jres:31750024", //RC 31750024 : Načítání ...
                            icon: "fa-spinner fa-spin"
                        })
                        activity.loadingAwait.always(function () { that.updateBreadcrumbs(); });
                    }
                }
            
                if (isActivity) {
                    prevActivity = activity;
                    taskId = taskId || activity.taskId;
                }
                activity = activity.parentContent;
            }
            // oznaceni/odznaceni ulohy aktivniho contentu; NULL pokud nebyl nalezen zadny taskId nebo zadna aktivita
            this.find(".main-tasklist.gtasklist").gtasklist("setActive", taskId || null);

            this.showBreadcrumbs(_breadcrumbs);

        }, 50),
        updateTitle: Gordic.Utils.debounced(function (activity) {
            if (this.closed) return;
            activity = activity || $.content($("div.activity-content:visible:last"));
            var title = activity && activity.title || activity && (activity.element.is(".activity-content") && activity.element.dialog("option", "title")) || $('.main-breadcrumb-list li:last-child').text() || "";
            if (title) {
                this._defaultTitle = this._defaultTitle || document.title;
                document.title = [title, this._defaultTitle].join(' - ');
            }
        }, 50),
        maximize: function (state) {
            if (typeof state == "undefined") state = !this.element.is(".main--maximized");

            this.element.toggleClass("main--maximized", state);
            if (state) {
                if (document.documentElement.requestFullScreen) document.documentElement.requestFullScreen();
                else if (document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen();
                else if (document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();

                //this.actions["actMaximize"].update({ icon: "gi-window-original" });
            } else {
                if (document.cancelFullScreen) document.cancelFullScreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();

                //this.actions["actMaximize"].update({ icon: "gi-window-full" });
            }
        },

        /**
         * Register eventlisteners for fullscreenchange, so when fullscreen 
         * ends with shortcut key, we can switch state correctly
         */
        registerMaximizeHandlers: function () {
            var _this = this;

            if (document.fullscreenEnabled !== true &&
                document.mozFullScreenEnabled !== true &&
                document.webkitFullscreenEnabled !== true &&
                document.msFullscreenEnabled !== true
            ) { // this browser is not capable of fullscreen API
                //this.actions["actMaximize"].visible(false);
                return;
            }

            var fullscreenOffHandler = Utils.debounced(function (ev) {
                _this.maximize(!(document.fullscreenElement === null ||
                    document.mozFullScreenElement === null ||
                    document.msFullscreenElement === null ||
                    document.webkitFullscreenElement === null));
            }, 100);

            if (document.gordicFullScreenRegistered !== true) {
                document.addEventListener("fullscreenchange", fullscreenOffHandler);
                document.addEventListener("webkitfullscreenchange", fullscreenOffHandler);
                document.addEventListener("mozfullscreenchange", fullscreenOffHandler);
                document.addEventListener("MSFullscreenChange", fullscreenOffHandler);
                document.gordicFullScreenRegistered = true;
            }
        },

        _refreshLogoutTimer: function (refresh) {
            if (refresh === true)
                this._logoutLastActionTime = new Date(); 
            if (typeof this._logoutLastActionTime === "undefined") return; 

            if (this.logoutTimer > 0) {
                var t = this.logoutTimer - (new Date() - this._logoutLastActionTime) / 1000;
                this._logoutTimerDiv.toggleClass("g-state-important g-state-text", (t / this.logoutTimer) < 0.1)
                    .children(".g-static__text").text(
                        t > 86400 ? "∞" : t > 3600 ? "jres:25000076".format(Math.ceil(t / 3600)) : t > 60 ? "jres:25000077".format(Math.ceil(t / 60)) : "jres:25000078".format(Math.ceil(t)) //RC 25000078 : {0}s
                    );
                this._logoutTimerDiv.find(".ui-progress").css("margin-right", (100 - Math.floor(t * 100 / this.logoutTimer)) + "%");

                if (t < 1) this.logout(true, { reason: "jres:25000075", status: "warning", backMask: 2 });  //RC 25000075 : Byli jste odhlášeni z důvodu nečinnosti. 
                if (t < 60 && this._logoutLastActionTime._notifyShown !== true) {
                    this._logoutLastActionTime._notifyShown = true;
                    this.notification("showToast", {
                        content: "jres:25000139",  //RC 25000139 : Za <b>1 minutu</b> dojde k <b>automatickému odhlášení<b> z důvodu nečinnosti
                        state: "warning",
                    });
                }
            }
        },
        closeActivity: function () {
            var _this = this; 

            var mainDiv = $(".root-activity");
            if (mainDiv.length)
                return $.content(mainDiv).tryClose().done(function () { _this.defaultActivityTimer = null;  }); // zavreni timto zpusobem (rizeni/logout/navigateTask) vzdy potlacuje defaultni akci, ceka se ze se postara ridice process 
            else return $.Deferred().resolve().promise();
        },
        navigate: function (contentInitializer, inputParams, options) {
            var _this = this;
            var opts = $.extend({}, options);
            if (!opts.parentContent) opts.parentContent = $.content($(".activity-content:visible")); // nextActivity na #main otevre dalsi aktivitu s parentem aktivity viditelne nahore
            var rootActivity = !opts.parentContent;
            var isActivity = rootActivity || $(opts.parentContent.element.gdomcontext()._contextPath.filter(function (elem) { return $(elem).hasClass("ui-dialog-content"); })[0]).hasClass("activity-content");
            var dlg = null; 

            if (isActivity) {
                var divBreadcrumbs = _this.find("nav.main-breadcrumbs")[0]; 
                $("div.activity-dialog").hide().prop('hidden', true);  // skryti ostatnich pripadnych aktivit, hidden kvuli accessibility
                dlg = (rootActivity ? GDlg : opts.parentContent.dialogs).showWindow(contentInitializer, inputParams, $.extend({}, opts, {
                    dialogClass: "activity-dialog",
                    appendTo: $("#main"),
                    modal: false,
                    dock: {
                        relLeft: function () { return Math.ceil(divBreadcrumbs.offsetLeft); },
                        relTop: function () { return Math.ceil(divBreadcrumbs.offsetTop) + Math.ceil(divBreadcrumbs.offsetHeight); },
                        relWidth: function () { return Math.floor(_this.contentDiv.offsetWidth) - Math.ceil(divBreadcrumbs.offsetLeft) - 1; },
                        relHeight: function () { return Math.floor(_this.contentDiv.offsetHeight) - Math.ceil(divBreadcrumbs.offsetTop) - Math.ceil(divBreadcrumbs.offsetHeight) - 1; }
                    }
                })).toggleClass("root-activity", rootActivity).addClass("activity-content")
                    .on("contentnewops contentready close gstatechanged", function (e) { window.setTimeout(function () { _this.updateBreadcrumbs(); _this.updateTitle(); }, 1); }) // nutne dokoncit close; tato udalost se vola pri otevrenem dialogu
                    .on("closed", function (e) {
                        $("div.activity-dialog:last").show().removeAttr('hidden')
                            .find("div.activity-content").dialog("updateSize").resize().triggerHandler('dialogresize'); //VM . 18052021 - resize přidán kvůli formulářům, které se jinak nerefreshují (když jsou přidány během toho, co je content schován pod jiným contentem, tak jsou rozhozený)
                        _this.runDefaultAction(true); // unhandled activity close ma vyvolat default, handled pripady (this.closeActivity) toto potlacuje
                    }); 

                dlg.closest(".ui-dialog").removeClass("ui-front").attr('role','main');

                _this.updateBreadcrumbs();
                _this.updateTitle();
            } else
                dlg = opts.parentContent.dialogs.showModalWindow(contentInitializer, inputParams, $.extend({ width: 640, height: 480 }, opts));
            if (dlg.prop("uid") != "_cont#")
                Gordic.Gui.WebControls.createOverlayTips(this.overlayTips, dlg.prop("uid"), this.globalSettings);
            return dlg;
        },
        navigateTask: function(contentInitializer, inputParams, options) {
            var _this = this;
            return this.closeActivity().then(function () {
                return _this.navigate(contentInitializer, inputParams, options);
            }).promise();
        },
        navigateContent: function () {
            console.log("[OBSOLETE] main.navigateContent() - pouzijte .navigateTask()");
            this.navigateTask.apply(this, arguments);
        },
        notificationCenter: function (show) {
            var _this = this;

            if (show === undefined) show = !$(".main-notificationcenter").is(":visible");
            if (show === true) {
                this._updateNotificationCount(0);
                $(".main-notificationcenter").ginlinedialog("open").gnotificationlist("refresh").gnotificationlist("clearToasts").ginlinedialog("focus");
            } else
                $(".main-notificationcenter").ginlinedialog("close");
        },
        _updateNotificationCount: function (notifCount) {
            var $btn = $(".main-notificationcenter-menuitem").closest(".gbutton");
            var caption = $btn.gbutton("option", "params").caption || "jres:25000020";   //RC 25000020 : Centrum notifikací
            $btn.gbutton("option", "ariaCaption", !notifCount ? caption : "jres:31150097".format(notifCount)); //RC 31150097 : Centrum notifikací - počet nových notifikací {0}.
            $btn.gbutton("option", "badge", notifCount === 0 ? null : { value: notifCount.toString(), customClass: "g-state-important" });
        },
        showHelp: function (contextElement, page) {
            var _this = this; 

            var cnt = $.content("HelpContent#");
            if (cnt) cnt.close();
            else {
                gscript.require("gin/gui/contents/Help.js?Gordic.Gui.WebApp").done(function () {
                    contextElement = contextElement || _this.currentContextHelpElement;
                    _this.dialogs.showModalWindow(Gordic.WebApp.HelpContent, { contextElement: contextElement, page: page }, { width: 1024, height: 764 })
                        .on("close", function () { $(contextElement).focus(); });
                });
            }
        },
        _updateHelpNotification: function (text) {
            if (text != this._lastHelpNotification) {
                var $btn = $(".main-help-menuitem").closest(".gbutton");
                $btn.gbutton("option", "badge", text == null ? (this._lastHelpNotification = null) : { value: this._lastHelpNotification = text, customClass: "g-state-important" });
            }
        },
        _ctxHelpOverlayShown: {}, // overlay zobrazeny v teto instanci spustene aplikace
        showOverlayHelp: function (articles) {
            if (!articles || articles.length === 0) return;

            articles = articles.filter(article => this._ctxHelpOverlayShown[article.id] !== true)
            if (articles.length) { 
                var toc = new Gordic.Widget.GHelpTOC();
                articles.forEach(article => (this._ctxHelpOverlayShown[article.id] = true) && toc.articles.push(article));
                var overlayContent = this.dialogs.showModalWindow([Gordic.Gui.WebApp.GContextHelpDisplay, { ctxhelp: { toc: toc }, shouldSort: true, title: "IMPORTANT" }], null, { width: 800, height: 600 })
                    .on({
                        "articleconfirm": function (ev, ctx) {
                           // toc.articles = toc.articles.filter(article => article.id !== ctx.article.id);
                            if (toc.articles.filter(article => !!article.confirm).length === 0)
                                overlayContent.close();
                            else
                                overlayContent.refreshTOC(toc);
                        },
                    }).gcontent();
                overlayContent.readyAwait.done(() => overlayContent.commandBar(null));
            }

        },
        debugMenu: function (ev) {
            var debugTools = []; 
            $(".js-debugmenu.gactionctmenu").gactionctmenu("close"); // odstranime nejaka jina menu
            this.applicationDebug(debugTools, ev);

            if (debugTools.length > 0) 
                $.newDiv("contexthelp-ignore js-debugmenu js-dialog-allow-interaction").appendTo("body")  // js-dialog-allow-interaction - jinak se menu nad modaldialogem na klik zavre, protoze neni soucasti dialogu
                    .gactionctmenu({ params: debugTools, customClass: "contexthelp-ignore", closed: function (e) { $(this).remove(); } }).gactionctmenu("open", Gordic.Utils.Mouse && Gordic.Utils.Mouse.lastMoveEvent);
        }
    });
})(jQuery);
