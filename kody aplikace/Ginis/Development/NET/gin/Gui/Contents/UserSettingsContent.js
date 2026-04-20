
/* ---------------------------------------
*   CONTENT pro uživatelské nastavení
*  ---------------------------------------
*/

(function ($) {
    "use strict";

   // namespace("Gordic.WebApp.globalSettingForms", new Gordic.Utils.UserSettingsForms());

    namespace("Gordic.WebApp.UserSettingsContent", {
        // this.options.forms                           - pole všech formulářů
        // this.options.gstor                           - gstor
        // this.allRowsName                             - pole name řádků
        // this.allRowsInfo                             - pole inforamcí o řádku
        // this.polePromisuNaKtereSeCekaPredUlozenim -  
        // this.probehloUlozeni                         - stav zda probehlo ulozeni  

        callToServerLoadShared: function () {
            return new GContent("Gordic.Gui.WebControls.GStorService").call("LoadPartial", { sxs: "global.usersettings", shared: true });
        },

        title: "jres:25000025", //RC 25000025 : Uživatelské nastavení
        uid: "userSettingsContent#",
        prepareContent: function (options) {
            var that = this;
           
            var defOptions = {
                forms: [],
                gstor: null,
                admin: false,
                idFormToOpen:null
            };
            this.polePromisuNaKtereSeCekaPredUlozenim = [];

            this.options = $.extend({}, defOptions, options);

            this.allRowsName = [];
            this.allRowsInfo = [];
            //console.log("options", this.options);

            this.reload();

            // a typicky chci widget přidat do sidebar
            this.element.gsidebar({
                right: {
                    panels: [
                        {
                            side: "right",
                            leaf: { caption: "jres:31968001", icon: "fa-tasks"}, //RC 31968001 : Navigátor
                            title: "jres:31968001", //RC 31968001 : Navigátor

                            open: function (ev, ctx) {
                                var customDiv = $(this);
                                if (!customDiv.hasClass("g-outline")) {
                                    customDiv.goutline().goutline(
                                        "bindForm",
                                        that.element,
                                        function (tree) {
                                            //var forms = that.find(".header-form").findForms();

                                            //if (forms.length > 0) {
                                            //    tree.splice(0, 0, { caption: "Hlavička", point: forms[0] });
                                            //}

                                            return tree;
                                        });
                                } else {
                                    customDiv.goutline("refresh");
                                }
                            }
                        }
                    ]
                }
                , userSettings: this.userSettings.sub("sideBar")
            });
            // otevře formulář
            if (this.options.idFormToOpen) {
                this.openSpecificForm(this.options.idFormToOpen);
            }
            

        },

        reload: function () {
            this._findRowsNameInForms();
            this.makeMenu();
            this._manageLocks();
            this.showForm();

            this.refresh();
        },

        // otevření velkého detailu  
        showForm: function () {
            var that = this;

            var DetailDiv = $("<div>").appendTo(this.element);
            $(this.options.forms).each(function (index, element) {

                element.form.customClass = "js-FormSKriterii"; // klasa podle ktere pak vyhledávám formy s kritérii
                var tabOptions = $.extend({},element.form.tabOptions);
                tabOptions.opened = true; // dsebesta přidáno 21.7.2021 ref T12014

                var encodeTitle = btoa(encodeURIComponent(tabOptions.title));
                var tabClass = "js-tab-" + encodeTitle.replace(/\W/g, "");
                //tabOptions.headerClass = tabOptions.headerClass + " js-tab-" + encodeTitle;
                var tab = null;
                var existingTab = DetailDiv.find("." + tabClass);
                if (existingTab && existingTab.length > 0) {
                    tab = existingTab.eq(0);
                } else {
                    //that._pridejTlacitkoUvedDoInitValueDoTabu(tabOptions, tabClass);
                    tab = $("<div>").appendTo(DetailDiv).gtab(tabOptions).addClass(tabClass);
                }

                $("<div>").appendTo(tab).gform("createFrom", element)
                    .on("fieldchange", function (ev, changeObj) {               // reakce na zmenu v kriteeriich
                        if (ev && ev.target ) { //customClass: "gform-ignorefield",
                            if (ev.target.className.indexOf("gform-ignorefield") === -1) {
                                if (ev.target.className.indexOf("userSettings-saveWithoutNotice") > -1) {
                                    that._ulozit(null,true);
                                } else {
                                    that._ulozit(null);
                                }
                            }  // else  ignoruju
                        } else {
                            that._ulozit(null);
                        }
                        
                        //    if (changeObj.flags.noChange) {

                        //    } else {
                        //        that._changeInDetilFilterData(true);
                        //        that._changeBadgeColor();
                        //    }
                    });
            });
            if (this.options.forms !== null && this.options.forms !== undefined) {
                var idForm = null;
                if (this.options.forms.length === 1) {
                    idForm = this.options.forms[0].form.name;
                }
                if (this.options.forms.length === 2) {
                    idForm = this.options.forms[1].form.name;
                }
                if (idForm) {
                    this.openSpecificForm(idForm);
                }
            }
        },

        _pridejTlacitkoUvedDoInitValueDoTabu: function (taboptions, tabClass) {

            if (taboptions && !taboptions.menuBar) {
                taboptions.menuBar = [];
            }

            taboptions.menuBar.push(
                {
                    favorite: true,
                    
                    action: new GAction({
                        name: "tempActUvedDoInitValue",
                        tabClass: tabClass,
                        params: {
                            tabClass: tabClass
                        },
                        caption: "jres:31968069", //RC 31968069 : Původní nastavení
                        tooltip: "jres:31968070", //RC 31968070 : Uvést hodnoty v této záložce do výchozího nastavení.
                        run: function (ev, ctx) { //RC 25000002 : Zavřít
                            var cont = $.content(ev.currentTarget);
                            var fields = cont.find("." + this.params.tabClass).findFields();
                            for (var i = 0; i < fields.length; i++) {
                                //fields.eq(i).gfield("reset"); // do initial Value
                                fields.eq(i).gfield("reset"); // do emptyValue
                            }
                        }
                    })
                }
            );
        },


        makeMenu: function () {
            var that = this;
            this.actions.addRange({
                actObcerstvit: {
                    caption: "jres:31968003", //RC 31968003 : Občerstvit
                    tooltip: "jres:31968002", //RC 31968002 : Občerství formulář
                    run: function (ev, ctx) {
                        that.refresh();
                    }
                },
                actAdminMod: {
                    caption: "jres:33000040", //RC 33000040 : Expertní mód
                    tooltip: "jres:31968005", //RC 31968005 : Otevře úplný editor uživatelského nastavení
                    run: function (ev, ctx) {
                        that.navigate(Gordic.WebApp.AdminSettings, { admin: that.options.admin }).on("close", function (ev, retVal) {
                            //if (retVal && retVal.dosloKeZmene && retVal.manualnuZavreni) {
                                //TODO pokud se zavře bez reloadu aplikace tak se občerství ()
                                that.refresh();
                            //}
                        });
                    }
                },
                actPouzit: {
                    caption: "jres:31968013", run: function (ev, ctx) { //RC 31968013 : Uložit
                        that._ulozit(this);
                    }
                },
                actZavrit: {
                    caption: "jres:25000002", run: function (ev, ctx) { //RC 25000002 : Zavřít
                        that.tryClose();
                    }
                }
            });

            this.menuBar([
            //    {

            //    favorite: true, action: new GAction({
            //        name: "actSkrytPrazdne", checked: false, caption: "Skrýt prázdné", tooltip: "Skryje/zobrazí prázdné podmínky",
            //        run: function (ev, ctx) {
            //            this.update({ checked: !this.checked() }); // prvne přehodim na opak abych mohl pracovat rovnou s aktualnim stavem
            //            var chacked = this.checked();
            //            var Form = that.findForms(".js-FormUserSettings");
            //            that._showHideFields(chacked, Form);

            //        }
            //    })
            //},
            
                {
                    favorite: true, action: this.actions.actObcerstvit
                },
                {
                    action: this.actions.actAdminMod
                },
               {
                   type: "widget",
                   favorite: true,
                   caption: "jres:31968007", //RC 31968007 : Hledání podmínek
                   align: "opposite", //customClass:"w-2", //
                   init: function () {
                       return $("<div>").width(150)
                           .gselectbox({
                               name: "selectBoxRowName",
                               dropdown: true,
                               helperColumns: ["rowLabel"],
                               states: [{ icon: 'gi-magglass', align: "opposite", tooltip: "jres:31968008" }], //RC 31968008 : Vyhledávání uživatelských nastavení
                               placeholder: "jres:33000066", //RC 33000066 : Hledat
                               //placeholder: "jres:31968009", // TODO //RC 31968009 : Vyhledat nastavení
                               data: new Gordic.Data.View(that.allRowsInfo, { key: "rowLabel" }),//.applyView({ sort: "rowLabel" }),
                               itemTemplate: function (value) {
                                   if (value) {
                                       return "<i style='font-size:0.6rem;'>" + value.tabLabel + "</i><br><b>" + value.rowLabel + "</b>";
                                   } else { return "<i>jres:31968010</b>"; } //RC 31968010 : Vyhledávání
                               },
                               smartNavigation: false,
                               change: function (ev, changeObj) {  // TODO předělat na row pair
                                   if (changeObj.value) {
                                       var field = that.findFormRows(changeObj.value.rowName).findFields().first();
                                       that._showFieldThree(field);
                                       field.find(":focusable:first").focus();
                                       $(this).gfield("clear");
                                   }
                               },
                           });
                   },
               }

            ]);

            this.commandBar([
                //{
                //customClass: "", primary:true, action: this.actions.actPouzit
                //},
                {
                    customClass: "", action: this.actions.actZavrit
                }

            ]);
        },

       
        refresh: function () {
            var that = this;
            this._setModel(); // přenesení dat z mainu do detailu
            //this.element.trigger("UserSettingsBuilded", null, { type: "UserSettings", form: this }); // vyvolám eventu otevřeníDetailu
            // cekani na cely form a nastavení initial
            that.findFields().gform("waitForValues").done(function () {
                that.element.trigger("UserSettingsBuilt",  { type: "UserSettings", form: that });
            });
        },

        
        _findRowsNameInForms: function () { // prohleda formy a vytáhne všechny Labely
            var that = this;
            this.allRowsName = [];
            this.allRowsInfo = [];
            $(this.options.forms).each(function (index, element) { // projde pole forms 
                var tabOptions = element.form.tabOptions;
                $(element.form.sections).each(function (index, sections) { // projde sekce
                    $(sections.rows).each(function (index, row) {           // projde řádky
                        if (row.fields && row.fields.length > 0) { 
                            if (!row.name) { // pokud řádek nemá name tak ho přebere z prvního fieldu 
                                row.name = row.fields["0"].options.name;
                            }
                            if (row.name) {
                                that.allRowsName = that.allRowsName.concat(row.name);
                                that.allRowsInfo = that.allRowsInfo.concat({
                                    rowLabel: row.label || row.fields["0"].options.label,
                                    tabLabel: (tabOptions && tabOptions.title ? tabOptions.title : "Vyplňtě tabOptions.title v definici Formu."), //RC 31968011 : Vyplňtě tabOptions.title v definici Formu.
                                    //fieldName: row.fields["0"].options.name,
                                    rowName: row.name
                                });
                                $(row.fields).each(function (index, field) { // projdu fildy
                                    field.options.rowLabel = row.label || field.options.label;
                                    field.options.tabLabel = (tabOptions && tabOptions.title ? tabOptions.title : "Vyplňtě tabOptions.title v definici Formu.");
                                });
                            }
                        }
                    });
                });
            });

            that.allRowsInfo.sort(function (a, b) { // srovnání podle abecedky
                var aName = a.rowLabel.toLowerCase();
                var bName = b.rowLabel.toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            });
        },
        _showFieldThree: function (field) {
            var fieldTemp = $(field);
            if (fieldTemp && fieldTemp.length > 0) {
                fieldTemp.gformrow().show();
                fieldTemp.gformsection().show();

                fieldTemp.gform().closest(".g-tab-content").gtab("option", "visible", true);
                fieldTemp.gform().closest(".g-tab-content").gtab("option", "opened", true);
            }
        },
        _setModel:function(){
            var that = this;
            //this.gstor = GStor.resolve(this.gstor);
            if (this.options.gstor) { 
                var model = this.options.gstor.get("", true) || {};
                var fieldy = that.findFields();
                fieldy.gfield("reset"); // odstraněno clear protože nefungovali Initial Values 20,4,2020
                fieldy.gfield("model", "apply", model, { initialValues: true });
                this.beginOperation();
                
                //var promises = fieldy.map(function () { return $(this).gfield("getValueAsync"); });
                //$.when.apply(null, promises).done(function () {
                //    that.endOperation();
                //}); 
                
                this.findForms().gform("waitForValues").done(function () {
                    that.endOperation();
                }); 
            }

        },

        _ulozit: function (action,bezHlasky) {
            var that = this;
            var data = {};
           // this.gstor.apply(data, "contents");
            if (this.options.gstor) { 
                var fieldy = this.findFields();
                var Forms = that.findForms();
                if (Forms.gform("isValid")) {

                    fieldy.each(function (index, element) {
                        var field = $(element);
                        if (field.gfield("hasChanged")) {
                            field.gfield("model", "collect", data);
                        }
                    });
                    // pockam na promisi ktere mohl nekdo přidat a mastit si něco asynchroně

                    var promise = $.when.apply(null, that.polePromisuNaKtereSeCekaPredUlozenim)
                        // TSKALA - to uz je stejne pozde po collectu, ne?  
                        // dsebesta - nn neni, zde jde o políčka který se ukládají samostantě callem na server tak v modelu políček se vloží promis do této tabulky a čeká se na něj.
                        // TSKALA - to bud neni dopsany, nebo to mate nejakou prisernou spagetu od nevidim do nevidim, ale s touto LOKALNI vlastnosti se jinde nepracuje. CustomSave muze byt delegat ve formDescriptoru, sbirany pres delegata ve createFrom. Nebo i vyuzit _start/_endAsyncValue na policku (interne, ne programatorem). Ale v kazdem pripade chces poradi waitForValues -> isValid -> Save. I ta "customSave" bude chtit vratit PID/vysledek kontroly/ulozeni.  
                        .done(function () {
                            that.options.gstor.merge(data);
                            that.options.gstor.save(true); // explicitni save, protoze se jedna o explicitni akci - POUZE NA TOMTO FORMULARI. Zde uzivatel muze zjistit pripadne chyby s ulozenim aniz by byl odkazan na interni casovace. 
                            fieldy.gfield("confirm");
                            that.probehloUlozeni = true;
                            that._vyhodInfoOUspesnemUlozeniNastaveni(data, bezHlasky);
                        })
                        .fail(function () {
                            that._vyhodInfoONeuspesnemUlozeniNastaveni();
                        });
                    if (action) { 
                        action.setPending(promise);
                    }
                    return promise;
                } else {
                    if (action) {
                        action.setPending(-1)
                    }
                    //that.notification("showToast", { title: "jres:25000025", content: "jres:31968071", icon: "gi-settings", state: "error" }); //RC 31968071 : Chybná hodnota
                    that._vyhodInfoONevalidnimFormulari();
                    var filedySChybou = this.find(".gfield-error");
                    if (filedySChybou && filedySChybou.length > 0) {
                        that._showFieldThree(filedySChybou.eq(0));
                        var field = filedySChybou.eq(0);
                        that._focusOnField(field);
                    }
                }
            }
        },
        _vyhodInfoOUspesnemUlozeniNastaveni: function (data, bezHlasky) {
            var that = this;

            this.element.trigger("UserSettingsChanged", { type: "UserSettings", text: "Proběhla uložení uživatelského nastavení", data: data });
            //this.trigger("UserSettingsChangedContent", { type: "UserSettings", text: "Proběhla uložení uživatelského nastavení" });

            var hlaska = "jres:31968072"; //RC 31968072 : Proběhlo uložení. Některé změny se projeví až po znovuotevření úlohy.
            if (bezHlasky) {
                hlaska = "jres:31968073"; //RC 31968073 : Proběhlo uložení.
            }

            this.notification("showToast", {
                title: "jres:25000025",
                content: hlaska,
                icon: "gi-settings",
                state: "success"
            }); 
            
            //this.showFlash("Proběhlo uložení. Některé změny se projeví až po znovuotevření úlohy", "g-state-success", "idUlozenoFlash");
        },
        _vyhodInfoONeuspesnemUlozeniNastaveni: function () {
            var that = this;
            
            this.notification("showToast", {
                title: "jres:25000025",
                content: "jres:31968074", //RC 31968074 : Uložení se nepodařilo
                icon: "gi-settings",
                state: "error"
            }); 
            
            //this.showFlash("Uložení se nepodařilo", "g-state-error", "idUlozenoFlash"); //RC 32000079 : Přihlášení se nezdařilo.
        },
        _vyhodInfoONevalidnimFormulari: function () {
            var that = this;
           
            this.notification("showToast", {
                title: "jres:25000025",
                content: "jres:31968075", //RC 31968075 : Některé políčko ve formuláři má nesprávnou hodnotu, nebo je povinné
                icon: "gi-settings",
                state: "error"
            }); 
            
            //this.showFlash("Některé políčko ve formuláři má nesprávnou hodnotu, nebo je povinné", "g-state-error", "idUlozenoFlash"); 
        },

        _focusOnField: function (field) {
            var forFocus = field.find(":focusable:first");
            if (forFocus && forFocus.length > 0) {
                forFocus.focus();
            }
        },

        _manageLocks: function () {
            var that = this;
            //formy
            $(this.options.forms).each(function (index, Form) {
                var FormLock = false;
                //if (Form.form.settingsPath) { // asi zbytečné zeptá se poslední field
                //    var strGstorPath = Form.form.settingsPath;
                //    FormLock = that.isPathLocked(strGstorPath);
                //}
                //sekce
                $(Form.form.sections).each(function (index, Section) {
                    var SectionLock = false;
                    //if (Section.settingsPath) {
                    //    var strGstorPath = Section.settingsPath;
                    //    SectionLock = that.isPathLocked(strGstorPath);
                    //}
                    // řádky
                    $(Section.rows).each(function (index, Row) {
                        var RowLock = false;
                        //if (Row.settingsPath) {
                        //    var strGstorPath = Row.settingsPath;
                        //    RowLock = that.isPathLocked(strGstorPath);
                        //}
                        //// fieldy
                        var strGstorPath = null;
                        $(Row.fields).each(function (index, Field) {
                            var FieldLock = false;
                            if (Field.options.settingsPath) {
                                strGstorPath = Row.settingsPath;
                                FieldLock = that.isPathLocked(strGstorPath);
                            }
                            if (FieldLock === false && typeof Field.options.model === "string") {
                                var modelTxt = Field.options.model;
                                strGstorPath = modelTxt.replace("model.", "");
                                strGstorPath = strGstorPath.split("=")[0];
                                FieldLock = that.isPathLocked(strGstorPath);
                            }
                            if (FormLock || SectionLock || RowLock || FieldLock) {
                                that.makeLockOnFiled(Field);
                            }
                        });
                    });
                });
            });
        },

        isPathLocked: function (path) {
            var lock = false;
            if (path && this.options.gstor) {
                lock = this.options.gstor.isLocked(path);
            }
            return lock;
        },
        makeLockOnFiled: function (field) {
            var lockIco = {
                id: "gStoreLock",     // nepovinný, pouze pokud bude potřeba ikonu adresovat/měnit
                icon: "gi-lock",
                tooltip: "jres:31968012" //RC 31968012 : Tuto položku může změnit pouze administrátor.
            };
            field.options.disabled = true;
            field.options.gStoreLock = true;
            field.options.customClass = field.options.customClass + " gStoreLock";
            field.options.states = field.options.states || [];
            field.options.states = field.options.states.concat([lockIco]);
           
        },
        closing: function () { // podmineny userClose 
            var def = $.Deferred();
            var opt = { ulozeno: false };
            if (this.probehloUlozeni) {
                opt.ulozeno = true;
            }

            //this.dialogs.messageBox("Uzavření", "Některé?", GDlg.mbbYesNo, GDlg.mbiQuestion)
            //    .on("yes", def.resolve)
            //    .on("close", def.reject);
            def.resolve(opt);
            return def.promise();
        },

        openSpecificForm: function (id) {
            if (id !== null && id !== "" && id !== " ") {
                var form = this.findForms(id);
                if (form !== null && form !== undefined && form.length > 0) {
                    form.eq(0).parent(".gtab").gtab("option", "opened", true);
                    //form.eq(0).parent(".gtab").gtab("open");
                }
            }
        },


    }, { extendIntellisense: GContent });

})(jQuery);