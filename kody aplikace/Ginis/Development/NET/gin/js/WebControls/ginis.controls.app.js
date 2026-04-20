/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ginis.controls.app.js
*    project     q:\ginis\Development\NET\Gordic.Gui.WebControls\Gordic.Gui.WebControls.csproj
*    created     2026-02-16 14:36:56
*    files       Scripts\gfilterpanel.js
*                Scripts\ggrid.editors.js
*                Scripts\ggrid.extensions.js
*                Scripts\gforms.editor.js
*                Scripts\gnotification.js
*                Scripts\gnotificationlist.js
*                Scripts\gfilefield.js
*                Scripts\gpidbar.js
*                Scripts\GDocument.js
*                Scripts\GFile.js
*                Scripts\gfilepreview.js
*                Scripts\gwizardsimple.js
*                Scripts\gswitcher.js
*                Scripts\gshortcuts.helper.js
*                Scripts\gpreview.js
*                Scripts\gdatecombobox.js
*                Scripts\gactions.gcolorpickerfield.js
*                Scripts\gmdfield.js
*/

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gfilterpanel.js 


//(function ($) {
//        /*
//        function  getConfirmedData - Duležitá funkce pro Tomáše. Měla by vracet data  podle kterých bylo naposled vyhledáno. Volá si jí Tomáš t gridu
   
//        */
//    "use strict";

//    $.widget("gordic.gfilterpanel", {
//        options: {
//            // při vyhledávání nutné odchytávat eventu gfilterpanelapply
//            forms: [],                                          // -poviné -    filtrovací formuláře    (nutné nechat jeden bod v layout descriptoru na favorite piny L-3-8-1 M-12-11-1 S-12-11-1)
//            saveOptionsForm: "all",                              // -nepoviné-   formulář v saving dialogu, // dsebesta změněno  z null na "all"   

//            favorites: [],                                      // -poviné (pouze v detailu) -inicializařní pole - při nefunkčním GStore  se použije jako default (pole s jmeny řádků oblíbených (tedy to co se píše k row, ne name fieldu)
           
//            favoriteLayoutDescriptor: "L5M3S1",                 // -nepovinné-  descriptor pro oblíbené; 
//            filterStorageService: null,                         // -poviné (pouze v detailu) -resolver pro načítání a ukládání pojmenovaných filtrů poviné metody na něm jsou [ getFilters() , saveFilter(), removeFilter()   ]; 
//            //applyFilter: null,                                  // -povinné-    metoda pro manuální nastavení dat do filtru

//            detailMode: "navigate",
//            userSettings: "gfilterpanel",                       // -nepovinné-  cesta nebo instance GStorSection kam se ukládají oblíbené, pokud nevyplněno použije se tento default (při dvouch filtrech na detailu musí být unikátní)
//            simpleMode: false,                                  // -nepovinné-  zda se má vytvočit řádek s pojmenovanýmy filtry a rozšířením nebo jen všechny řádky formou oblíbených; 
//            idSimpleMode: null,                                 // -nepovinné-  aktivuje ukládání oblíbených v simple modu a zároveň se bude ukládat pod tento klíč  
//            simpleModeAutoLoadAfterCreatePanel: false,          // -nepovinné-  automaticky spustí hledání v simple mode po vytvoření panelu, bude se spoléhat na initialValue ve formulářích

//            autoLoadAfterChoseFilter: true,                     // -nepovinné-   Zda se má vyhledávat hned po tom, co uživatel vybere uložený filter na hlavním panelu.

//            filterItemTemplate: null,                           // template na výběrovem selextboxu filtru   // asi smazat
//            filterHelperItemTemplate: null,                     // helpertemplate na výběrovem selextboxu filtru // asi smazat
//            helperCustomizer: null,                             // možnost řídit nabídku pojmenovaných masek // asi smazat
             
//            helperColumns: ["gfilterpanel_name", "typ_masky_txt"], // asi smazat
//            //validators: {},                                   // -nepovinné-  object se všema validatorama všech formu
//            tema: null,                                         // -nepovinné-  tema kreré se bude používat ve stroageservice // nove 
//            customClass: "",
//            hardFilter: null,                                   // -nepovinné-  objekt filtru který přebije user default i hard default. 
//            //              Určen pro jednorázové vyhledáné při otevření seznamu, v momentě kdy vstupní filter do seznamu je dynamický
//            userDefaultFilter: true,                            // -nepovinné-  funkce kterou zavolám po přidání defaultního filtru
//            hardDefaultFilter: null,                            // -nepovinné-  objekt filtru který se použije pokud není zvolen uživatelem ten defaultní
//            strictStopAutoLoad: false,                          // -nepovinné-   Strictne zakáže autmoatické načtení
//            //searchButtonOnMainRow: true,                       // -nepovinné-   přídá tlačítko vyhledat při začených oblíbených přidáno na žádost bohouše      
//            collectData: null,                                  // -nepovinné-   funkce která se zavolá těsně před odesláním vyhledávání dat, na vstup přijdou sezbíraná data které lze libovolně modifikovat   
//            applyData: null,                                    // -nepovinné-   funkce která se zavolá těsně před appplyem modelu do formulářů 
//            badgeData: null,                                    // -nepovinné-   funkce která se zavolá těsně před vykreslením badge
//            saveData: null,                                     // -nepovinné-   funkce která se zavolá těsně před uložením ,lze modifikovat uložená data

//            staticFilters: null,

//            //uzivatelskeNastaveni
//            poVyhledaniZavritPanelPodminek : true,                // -nepovinné- default pro uživatelské nastavení
//            poOtevreniOtevritPanelPodminek: true,  



//            filterViewMode: null
//        },
//        // this.allRowsName             // nahrada za all Labels
//        // this.favotitesOpened         // indikace zda jsou otevřené oblíbené
//        // this.favoriteModel           // model dat uložený při zavírání oblíbených
//        // this.fieldNameRowlabelPair   // klíč je name fieldu, klíč je label řádku
//        // this.findSelBoxArray         // pole pro vyhledávací selectbox
//        // this.gStore                  // gstor pro manipulaci s oblíbenými
//        // this.showHidden              // zda se mají zobrazovat skryté masky
//        // this.data                    // data s předvoelnými filtr
//        // this.tempFilter              // data Filtru uložená na pozadí.
//        // this.functionForSaveDefault  // funkce pro uložení defualtu
//        // this.isSetDefaultFilter      // indikace zda proběhlo nastavení defaultu
//        // this.confirmedData           // daza z posledního hledání

//        // descriptor pro jednotlivé řádky:   favoriteRowLayoutDescriptor
//        // this.favoriteButPrimary      // zda bude button vyhledat primary
//        // this.iconBuilder             // instance iconbuilderu

        

//        //this.addedToFavoriteSecretly [] // přidáné pole do favorite na základě závislosti oblíbených;
//        _create: function () { // konstruktor
//            var that = this;
//            this.element.addClass("gfilterpanel");
//            this.element.addClass(this.options.customClass);
//            // vytvořím gstor


//            this._buildGStore();
//            this._nastavModNaZakladeOptions();
//            //vytvoření iconbuildr, jedna instance by měla jít používat furt dokola

//            this.iconBuilder = new Gordic.Utils.IconBuilder();

//            //načtu data z gstore
//            if (this.gStore) {
//                this.favotitesOpened = false;//this.gStore.get("favoritesOpened", true);

//                if (this.favotitesOpened === null || this.favotitesOpened === undefined) { this.favotitesOpened = true; }

               
//                this.filtrBadgeVisibleOnly = this.gStore.get("filtrBadgeVisibleOnly");
//                if (this.filtrBadgeVisibleOnly === null || this.filtrBadgeVisibleOnly === undefined) { this.filtrBadgeVisibleOnly = false; }
                
//            } else {
//                this.favotitesOpened = true; // default
//                this.filtrBadgeVisibleOnly = false;
//            }

//            this.ixsFunAkt = !Gordic.Utils.GString.IsNullOrWhiteSpace(this.options.ixsFunAkt) ? this.options.ixsFunAkt : $.content("main").IxsFunAkt;
//            this.favoriteButPrimary = true;
//            this.confirmedData = null;
//            this.allRowsName = [];
//            this.findSelBoxArray = [];
//            this.favoriteModel = null; // uvodni data do favoriteFiledu
//            this.fieldNameRowlabelPair = {}; // inicializace ojektu s jmeny fieldu a názvy řádku
//            this.showHidden = false;
//            this.addedToFavoriteSecretly = [];// přidáné pole do favorite na základě závislosti oblíbených;

//            this._findAndSetRowsNameInForms(); // najde row name ve Formu případně je přebere z prvního filedu v řádku
//            this.contentSeznamu = $.content(this.element);
//            this._createActions();

//            if (that._isModeDetailBezFavorite()) {
//                this.favotitesOpened = true;
//            }
           
//            //rozskok mezi simple mode a normalem
//            if (!this.options.simpleMode) {

//                this._readfavorites();   // načte oblíbené
//                this._readfavoritForm(); // načte defaultní formulář
//                this._nactiUzivatelskeNastaveni();
//                // pro automatické načítání defaultu
//                if (this.options.userDefaultFilter === true && this.gStore) {
//                    this.functionForSaveDefault = function (obj) {
//                        var ret = Gordic.Gin.FilterStorageService.StoreDefault.saveDefault(that.gStore, obj.filter, that.ixsFunAkt);
//                        var cotnik = $.content(this.element);
//                        if (this.dlgDetail) { // pokud je otevřený detail tak zobrazím tam
//                            var contDetail = $.content(this.dlgDetail);
//                            if (contDetail) {
//                                cotnik = contDetail;
//                            }
//                        }
//                        if (ret.stav === "smazan") {
//                            cotnik.showFlash("jres:25030682"); //RC 25030682 : Výchozí filtr smazán.
//                        } else if (ret.stav === "ulozen") {
//                            cotnik.showFlash("jres:25030683"); //RC 25030683 : Výchozí filtr uložen.
//                        } else if (ret.stav === "neulozen") {
//                            cotnik.showFlash("jres:25030684"); //RC 25030684 : Výchozí filtr se nepodařilo uložit, nejprve je nutné vybraný filtr uložit nebo vybrat z výběru.
//                        }
//                    };
//                } else if ($.isFunction(this.options.userDefaultFilter)) {
//                    this.functionForSaveDefault = this.options.userDefaultFilter;
//                }
//                //this._defineUselDefaultBut(); // vytvoř favorite but
//                //this._createActions();
//                this._createMainFilterRow(); // vytvořím hlavnířádek filtru

//            } else if (this.options.simpleMode  && this.options.idSimpleMode) {
//                this._readSimpleFavorites(); //this.favoritesSimple
//            }
            
//            if (this.options.poOtevreniOtevritPanelPodminek ) { 
//                this._showHideInternalfunction(this.favotitesOpened); // na začátku bude otevřený filtr po vyhledání se zavře :-)
//            }
//            this._readuserFiltersFromResolver(true);// požádá o data


//            // automatické vyhledání podle defaultu nebo vstupu
//            var objToFind = null;
//            if (this.options.hardFilter) {
//                objToFind = this.options.hardFilter;
//            }
//            else if (this.options.userDefaultFilter === true) {
//                if (this.gStore) {
//                    var filter = Gordic.Gin.FilterStorageService.StoreDefault.getDefault(that.gStore, that.ixsFunAkt);
//                    if (filter) {
//                        objToFind = filter;
//                    } else if (this.options.hardDefaultFilter) {
//                        objToFind = this.options.hardDefaultFilter;
//                    }
//                } else if (this.options.hardDefaultFilter) {
//                    objToFind = this.options.hardDefaultFilter;
//                }
//            }
//            if (objToFind) {
//                this.applyFilter(objToFind, this.options.strictStopAutoLoad);
//                this.isSetDefaultFilter = true;
//            }

//            // zkratka pro 
//            if (this.options.simpleModeAutoLoadAfterCreatePanel && this.options.simpleMode) {
//                this._simpleAutoload();
//            }
           
//            that._manageAkceProVybmazani();
//        },
//        //

//        _nastavModNaZakladeOptions: function () {

//            if (this.options.filterViewMode === 0) {
//                this.options.simpleMode = true;
//            }
            
//        },
//        _isModeDetailBezFavorite: function () {
//            var ret = false;
//            if (this.options.filterViewMode === 2) {
//                ret = true;
//            }
//            return ret;
//        },
//        _simpleAutoload: function () {
//            var that = this;
//            this._waitForFavorite().done(function () { // počkam na load políček ve favorite
//                that.applyFilter();
//            });
            

//        },

//        // funkce se pokusí vytvořit Gstor ve kterém budou uložený oblíbené
//        _buildGStore: function () {
//            if (this.options.userSettings instanceof Gordic.Data.StorageSection) {
//                this.gStore = this.options.userSettings;
//            } else {
//                var tempContent = $.content(this.element);
//                if (tempContent) {
//                    this.gStore = GStor.resolve(this.options.userSettings, tempContent.userSettings);
//                }

//            }
//        },
//        /*
//        //Interface for collapsible elements
//        collapsible: function () {
//            //Interface for collapsible elements
//            //Usage:
//            //In create of your widget insert this:
//            var that = this;
//            //this.favotitesOpened stav na začátku
//            this.element.gcollapsible({

//                isCollapsedVertically: !this.favotitesOpened,

//                collapseVertically: function (ev, data) {
//                    that.collapsibleFavoriteToggleFun(false, data);
//                    //data.promise.resolve(); //otvírání , //verticalCollapse of element here - finish it with data.promise.resolve(); or reject(); - use data.isCollapsed to get current state before change }
//                },
//                expandVertically: function (ev, data) {
//                    that.collapsibleFavoriteToggleFun(true, data);
//                    //data.promise.resolve(); //zavírání  }, //verticalExpand of element here - finish it with data.promise.resolve(); or reject();- use data.isCollapsed to get current state before change  }
//                }
//            });

//            //Then in code just call this.element.gcollapsible("expand") | ("collapse") | ("toggle") | ("isCollapsed", "v"(vertical) or "h"(horizontal)) | ("canCollapse")
//            //- all functions has second parameter available and default is "v" - vertical
//        },

//        // obsluha gcollapsible
//        collapsibleFavoriteToggleFun: function (open, data) {
//            if (!this.options.simpleMode) {  // padalo při simle modu když vlasta volal zmenšení z venku
//                this._showHideInternalfunction(!open);
//            }
//            //this.showFavorite(open);
//            data.promise.resolve();
//        },
//        */
//        // reload dat
//        reload: function (nasetovatZpatky) {
//            var that = this;
//            if (that.dlgDetail && that.dlgDetail.gcontent()) {  // pokud je otevřenbej detail zavřu ho
//                that.dlgDetail.gcontent().close();
//            }
//            that._readuserFiltersFromResolver(nasetovatZpatky);
//        },
//        // refresh hlavního panelu 
//        refreshFavorite: function () {
//            /// <summary>
//            /// Provede občerstvení oblíbených překreslí favorite form znova
//            /// </summary>
//            var that = this;
//            if (this.gStore && !this.options.simpleMode) {
//                that.gStore.set("favoritesOpened", this.favotitesOpened);
//                //that.gStore.save();
//            }
            
//            this._clearFavoriteForm(); // odstraním form favorite
//            this._skryjInlineDialogVyslednySelectBox();

//            if (!that._isModeDetailBezFavorite()) {
//                this.actions.actMainFilterButton.update({ checked: false, icon: "gi-arrow-double gi-rot270" }); //, gi-filter
//            }
            
            
//            this.actions.actVyhledatMainRow.update({ visible: true });
//            //this.actions.actVymazatKriteria.update({ visible: true });
//            if (this.favotitesOpened || this.options.simpleMode) {
//                that._showFavorite();   // zobrazim oblibene
//                //this.actions.actVyhledatMainRow.update({ visible: false });   //dsebesta 6.1/20 zakomentováno
//                //this.actions.actVymazatKriteria.update({ visible: false });
//                if (!that._isModeDetailBezFavorite()) {
//                    this.actions.actMainFilterButton.update({ checked: true, icon: "gi-arrow-double gi-rot90" }); //, 
//                    }
//            }
//            this._manageAkceProVybmazani();
//        },

//        // promaže oblíbené
//        _clearFavoriteForm: function () {
//            var FormFavorite = this.element.findForms("FormFavorite");
//            if (FormFavorite.length > 0) {
//                this.favoriteModel = this._getCollectOfFavorite();
//                FormFavorite.remove();
//            }
//            if (this.slectFavoriteButton !== undefined) {
//                this.slectFavoriteButton.remove();
//                this.slectFavoriteButton = undefined;
//            }
//        },
//        /* puvodni
//        // funkce pro vykreslení template
//        _helperItemTemplateFunction: function (value) {
//            var that = this;
//            //doplnění který je default
//            var widgetThis = $($(".gfilterpanel").last()).gfilterpanel("instance"); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TODO  čekám až tomáš pošle kontext do této funkce
//            var dataIsDefaultUserFilter = false;
//            if (widgetThis && widgetThis.options.userDefaultFilter === true) {
//                if (widgetThis.gStore) {
//                    var filter = Gordic.Gin.FilterStorageService.StoreDefault.getDefault(widgetThis.gStore, that.ixsFunAkt);
//                    if (filter) {
//                        if (value && filter.ixs_mas && value.ixs_mas === filter.ixs_mas) {
//                            dataIsDefaultUserFilter = true;
//                        }
//                    }
//                }
//            }

//            return "<b>" + value.gfilterpanel_name + "</b>" + "<span class='pull-right'>" + (dataIsDefaultUserFilter ? "<i class='fa fa-star'></i>  | " : "")
//                + (value.gfilterpanel_poznamka ? (value.gfilterpanel_poznamka) : "")
//                + (value.typ_masky_txt ? (" | " + value.typ_masky_txt) : "")
//                + (value.gfilterpanel_dat_zmena ? (" | " + new Date(value.gfilterpanel_dat_zmena).toLocaleDateString()) : "")

//                + "</span>";
//        },
//        */
//        _isThisIxsMasFavorite: function (ixs_mas) {

//            var ret = false;
//            if (ixs_mas != null && this.gStore != null) {
//                var filter = Gordic.Gin.FilterStorageService.StoreDefault.getDefault(this.gStore, this.ixsFunAkt);
//                if (filter) {
//                    if (filter.ixs_mas && (ixs_mas === filter.ixs_mas)) {
//                        ret = true;
//                    }
//                }
//            }
//            return ret;
//        },
//        /*
//        // definice uzivatelskoeho tlacitka
//        _defineUselDefaultBut: function () {
//            var that = this;
//            that._userDefaultBut = {
//                icon: 'fa-star', action: new GAction({
//                    name: 'actUserDefault',
//                    requireValue: true,
//                    tooltip: "jres:25030523", //RC 25030523 : Uloží vybraný filter jako výchozí při znovunačtení okna. Provedené změny v kriteriích je nejprve nutné uložit. Pokud je již filter zvolený jako výchozí, dojde ke zrušení této volby výchozího filtru.
//                    run: function (ev, ctx) {
//                        var val = $(ctx.field).gfield("getValue");
//                        if (that.functionForSaveDefault) {
//                            that.functionForSaveDefault({ filter: val, $gfield: $(ctx.field) });
//                        } else {
//                            console.log("Nejde uložit defaultní filtr. Pravděpodobně nemáte zadané ID na contentu, nebo nefunguje gstore");
//                        }
//                    }
//                })
//            };
//        },
//        */
//        _createActions: function () {
//            var that = this;
//            this.actions = {};
//            if (this._isModeDetailBezFavorite()) {
//                this.actions.actMainFilterButton = new GAction({
//                    name: "actMainFilterButton",
//                    caption: "jres:25030631", //RC 25030631 : Filtr
//                    tooltip: "jres:31969001", //RC 31969001 : Panel filtračních podmínek.
//                    //customClass: "g-state-text  g-link--no-underline",
//                    //icon: "gi-arrow-double gi-rot270", //gi-filter
//                    run: function (event, actionContext) {

//                        var akce = this;

//                        that._openDetailZFavorite(); // tohle otevře detail bez navázání na zrovna vybraný uložený v selectboxu
//                        //that._openDetailZIndikaceZmeny();  // tohle otevře detail vybraného filtru v selboxu
                        
//                    }   
//                });
//            } else {
//                this.actions.actMainFilterButton = new GAction({
//                    name: "actMainFilterButton",
//                    caption: "jres:25030631", //RC 25030631 : Filtr
//                    tooltip: "jres:31969001", //RC 31969001 : Panel filtračních podmínek.
//                    //customClass: "g-state-text  g-link--no-underline",
//                    icon: "gi-arrow-double gi-rot270", //gi-filter
//                    run: function (event, actionContext) {

//                        var akce = this;
//                        that._showHideInternalfunction(that.favotitesOpened);

//                }
//                });
//            }

          

//            this.actions.actVyhledatMainRow = new GAction({
//                name: "actVyhledatMainRow",
//                caption: "jres:31969023", //RC 31969023 : Načíst
//                icon: "gi-refresh",
//                customClass: "pull-right js-mainVyhledatMainRow g-button--primary js-hlavniVyhledat",
//                tooltip: "jres:31969023", //RC 31969023 : Načíst
//                run: function (event, actionContext) {
//                    that._startFindFromFavoriteBut();
//                }
//            });

//            this.actions.actVymazatKriteria = new GAction({
//                name: "actVymazatKriteria",
//                icon: "gi-filter-cancel g-state-text g-state-important",
//                caption: "", //RC 32000021 : Vyčistit
//                tooltip: "jres:31969018", //RC 31969018 : Vymazat podmínky
//                customClass: "g-state-text  g-link--no-underline", //g-state-important 
//                captionVisible: GAction.captionVisibility.never,
//                run: function (event, actionContext) {
//                    that._vymazatKriteria();
//                    //that.vymazatbuttonVisibleParam = false;
//                    //that._vymazatButonInMainRowVisible(false);

//                }
//            });
//            this.actions.actVymazatKriteriainFavorite = new GAction({
//                name: "actVymazatKriteriainFavorite",
//                icon: "gi-filter-cancel g-state-text g-state-important",
//                caption: "", //RC 32000021 : Vyčistit
//                tooltip: "jres:31969018", //RC 31969018 : Vymazat podmínky
//                customClass: "g-state-text  g-link--no-underline", //g-state-important 
//                captionVisible: GAction.captionVisibility.never,
//                run: function (event, actionContext) {
//                    that._vymazatKriteria();
//                    //that.vymazatbuttonVisibleParam = false;
//                    //that._vymazatButonInFavoriteVisible(false);

//                }
//            });

//            this.actions.filtrovano = new GAction({
//                name: "Filtrovano",
//               // icon: "gi-detail",
//                caption: "jres:31969016",  //RC 31969016 : Použité:
//                tooltip: "jres:31969015", //RC 31969015 : Použité podmínky filtrování. Kliknutím se zobrazí detailnější popis s rychlou možností editace.
//                icon: "gi-arrow-double gi-rot270",
//                customClass: "g-state-text  g-link--no-underline",
//                run: function (event) {
//                    that.filtrBadgeVisibleOnly = false;
//                    that._filtrBadgeHide();
//                    that._favoriteFilteredSelectBoxShow();

//                }
//            });

//            this.actions.actNovyVMainSlectboxu = new GAction({
//                name: "actNovyVMainSlectboxu",
//                icon: "gi-plus",
//                caption: "jres:29250001", //RC 29250001 : Nový
//                captionVisible: GAction.captionVisibility.never,
//                tooltip: "jres:31969013", //RC 31969013 : Otevře detail nového filtru.
//                run: function (event) {
//                    //that.openDetail();
//                    //that._openDetailZIndikaceZmeny();
//                    that._openDetailZFavorite();
//                }
//            });

//            this.actions.actDetailVMainSlectboxu = new GAction({
//                name: "actDetailVMainSlectboxu",
//                icon: "gi-detail",
//                //caption: "jres:31969003", //RC 31969003 : Filtrováno
//                tooltip: "jres:31969019", //RC 31969019 : Orevřít detail
              
//                run: function (event) {
//                    that._waitForFavorite().done(function () { // počkam na load políček ve favorite
//                        that._openDetailZIndikaceZmeny();
//                    });

//                }
//            });

//            //this.actions.showSelectBox = new GAction({
//            //    name: "actShowSelectBox",
//            //    caption: "jres:25030573", //RC 25030573 : Rychlé podmínky
//            //    tooltip: "jres:25030526",//RC 25030526 : Rozbalí/zabalí rychlé podmínky, které lze zvolit v úpravě filtrů pomcí špendlíků za jednotlivými řádky. Díky tomu lze rychle filtrovat seznam bez zvoleného uloženého filtru, nebo zvolený filtr upravit a  ryachle vyhledat bez uložění. 
//            //    customClass: "pull-right g-link--no-underline",
//            //    icon: (that.favotitesOpened ? "gi-arrow-double gi-rot90" : "gi-arrow-double gi-rot270"),
//            //    run: function (event, actionContext) {
//            //        
//            //    }
//            //});

//            this.actions.filtrActions = new GActionList({
//                actFavorite: {
//                    caption: "jres:31969011", //RC 31969011 : Automatický filtr
//                    tooltip: "jres:31969004", //RC 31969004 : Automaticky používat tento uložený filtr po otevření seznamu.
//                    icon: "fa-star-o",
//                    captionVisible: "never",
//                    run: function (ev, ctx) {

//                        if (that.functionForSaveDefault) {
//                            that.functionForSaveDefault({ filter: ctx.rowData, $gfield: $(ctx.field) });
//                        } else {
//                            console.log("Nejde uložit defaultní filtr. Pravděpodobně nemáte zadané ID na contentu, nebo nefunguje gstore");
//                        }

//                        if (!that.vyberPredvolenychFiltru) return;
//                        var ac = that.vyberPredvolenychFiltru.find(".gautocomplete");
//                        if (ac.gautocomplete("isOpen")) {
//                            ac.gautocomplete("applyView");
//                            that.vyberPredvolenychFiltru.gfield("focus"); // TODO: gautocomplete patri predela na inline dialog a o focus/close by se mel postarat sam
//                        }
//                    }
//                },
//                actRemove: {
//                    caption: "jres:25030558", //RC 25030558 : Odstranit
//                    icon: "fa-trash-o",
//                    captionVisible: "never",
//                    run: function (ev, ctx) {
//                        if (ctx.rowData)
//                            that._removeFilter(ctx.rowData);
//                    }
//                },
//                actConfiguration: {
//                    caption: "jres:31969012", //RC 31969012 : Nastavení filtru
//                    tooltip: "jres:31969005", //RC 31969005 : Otevřít nastavení uloženého filtru.
//                    icon: "fa-cog",
//                    captionVisible: "never",
//                    run: function (ev, ctx) {
//                        if (ctx.rowData)
//                            that._openDetail(ctx.rowData, false);
//                    }
//                },

//                //actSave: {
//                //    caption: "Uložit změny v pohledu",
//                //    icon: "fa-floppy-o",
//                //    captionVisible: "never",
//                //    run: function (ev, ctx) {
//                //        that.saveProfile(that.currentProfile, true).done(function (profile) {
//                //            // aktualizace instance profilu 
//                //            that.currentProfile = profile;   // rychlejsi nez .useProfile(profile), ale spoleha na to, ze ulozeni nenadelalo zmeny v profilu ktere by mely vliv na zobrazeni
//                //            that._refreshProfileBox();
//                //        });
//                //    },
//                //    visible: false,
//                //},
//                //actBack: {
//                //    caption: "Zpět",
//                //    tooltip: "Vrátit změny v pohledu",
//                //    //icon: "fa-undo",
//                //    //captionVisible: "never", 
//                //    run: function (ev, ctx) {
//                //        that.useProfile(that.currentProfile.name);
//                //    }
//                //}
//            });
//        },
//        // funkce pro vymazání kritérii
//        _vymazatKriteria: function () {
//            var that = this;
//            $.content(that.element).beginOperation();
//            that.element.findFields("vyberPredvolenychFiltru").gfield("reset", { filterClear: true, noChange: true }); //.findForms("FormFavorite")
//            that.element.findForms("FormFavorite").findFields().gfield("reset", { filterClear: true, noChange: true });
//            that.element.findFields("vyberPredvolenychFiltru").gfield("getButton", "stateChangeFilter").remove();
//            //that.tempFilter = null;
//            that.favoriteModel = null;

//            this._uppravPrimaryNaButton(true);
//            that._setInitValueToTemp().done(function () {
//                that._changeBadgeColor(true);

//                that._trigger("reset", null, { type: "mainRow" }); // vyvolám eventu při promazávání vyplněných dat

//                that._tryEndOperationElement();
//                that._vyhledaniPoVymazani();

                
//            });

//        },
//        // pokud je zaplé automatické vyhledávání po vymazání kriterii se rovnou vyhledá
//        _vyhledaniPoVymazani: function () {
//            if (this.options.autoLoadAfterChoseFilter) {
//                this._startFindFromFavoriteBut();
//            }
//        },

//        // vytvoření hlavního panelu
//        _createMainFilterRow: function () { // vytvoří zálkadní řídek hlavního panelu 
//            var that = this;
//            this.masterRow = $("<div>").appendTo(this.element); //.css("display", "flex").css("justify-content", "space-between")
//            this.mainFilterRow = $("<div>").appendTo(this.masterRow); //.css("display", "flex")

//            //.css("display", "block")
//            this.mainFilterButton = $("<div>").appendTo(this.mainFilterRow).gbuttonpanel({ //gbuttonpanel
//                customClass: "gbuttonpanel--transparent",
//                params: [
//                {
//                    action: this.actions.actMainFilterButton,
//                    visiblePriority: 100
//                },
//                {
//                    type: "widget",
//                    favorite: true,
//                    //caption: "jres:25030543", //RC 25030543 : Hledání podmínek
//                  //  align: "opposite", //customClass:"w-2", //
//                    init: function () {
//                        that.vyberPredvolenychFiltru = $("<div>").width(400)
//                            .gselectbox({
//                                name: "vyberPredvolenychFiltru",
//                                //tabIndex: -1,   // TS: -1 znamena, ze se na prvek neda dotabovat + kdyz ma tlacitko save, tak nejde ani otevrit (protoze save automaticky prebere kazdy focus policka jako jediny focusnutelny prvek)
//                                dropdown: true,
//                                graphicInput: "hidden",
//                                smartNavigation: false,
//                                //data: new Gordic.Data.View(
//                                //    [{ name: "Bez schránky" }, { name: "Se schránkou" }, { name: "Fyzické osoby", _id: "asd" }, { name: "Z Jihlavy", _id: "asasd" }] //, _primary:true 
//                                //    , { key: "name" }),
//                                //buttons: [{
//                                //    action: this.actions.novyVMainSlectboxu
//                                //}],

//                                itemTemplate: function (data) {
//                                    var emptyText = "<a style='color:#989898;' class=' g-state-text'>" + "jres:31969006" + "</a>"; //RC 31969006 : Vybrat uložený filtr //g-link js-glink g-link--chbpnl-item
//                                    if (data == null) {
//                                        return emptyText;
//                                    }

//                                    var text = data.gfilterpanel_name;
//                                    if (data.gfilterpanel_name == null) {
//                                        //return "<i>" + "jres:31969007" + "*</i>"; //RC 31969007 : Neuložený filtr
//                                        return emptyText;
//                                    }

//                                    if (data._changed) text = "<i>" + text + "*</i>";
//                                    else if (data._primary) text = "<b>" + text + "</b>";

//                                    return "<a class=' g-state-text'>" + text + "</a>"; //g-link js-glink g-link--chbpnl-item
//                                },
//                                helperItemTemplate: function (data) {
//                                    var text = data.gfilterpanel_name;

//                                    if (data._changed) text = "<i>" + text + "*</i>";
//                                    else if (data._primary) text = "<b>" + text + "</b>";

//                                    return "<a>" + text + "</a>";
//                                },
//                                renderEmpty: true,
//                                //showSelectButton: false,
//                                itemTooltipTemplate: function (data) {
//                                    if (data == null) {
//                                        return "<i>" + "jres:31969008" + "</i>"; //RC 31969008 : Vyberte uložený filtr
//                                    }
//                                    var text = "jres:31969009<br/>";  //RC 31969009 : Uživatelské filtry

//                                    if (data._changed) text += "<br/><i>kurzívou</i> - změny ve filtru"; //RC 25030583 : <i>kurzívou</i> - změny v pohledu
//                                    else if (data._primary) text += "<br/><b>tučně</b> - přednastavené filtry"; //RC 25030585 : <b>tučně</b> - přednastavené pohledy

//                                    return text;
//                                },
//                                helperColumns: ["gfilterpanel_name"],
//                                //  helperViewPortClass: "suggestion-menu",
//                                //change: function (ev, obj) {
//                                //    ev.stopPropagation();
//                                //}
//                                change: function (ev, changeObj) {
//                                    if (changeObj.value) {
//                                        var thisField = $(this);
//                                        // that._waitForFavorite().done(function () { 
//                                        var fieldy = that.element.findForms("FormFavorite").findFields();
//                                        fieldy.gfield("clear", { filterClear: true, noChange: true });
//                                        thisField.gfield("getButton", "stateChangeFilter").remove(); // vymažu příznak zmněny

//                                        //přidáno protože blblo při změně v momentě zavřených favorite oprava 23.07.2018
//                                        that.favoriteModel = changeObj.value;

//                                        that._setCollectOfFavorite(changeObj.value); // nastavím model do favorite
//                                        if (!changeObj.flags.notSaveTemp) {
//                                            that.tempFilter = changeObj.value;
//                                        }
//                                        that._uppravPrimaryNaButton(true);
//                                        if (!changeObj.flags.manualSet) { // pokud vybral hodnotu uživatel, rovnou zavolám hledání
//                                            if (that.options.autoLoadAfterChoseFilter || changeObj.flags.strictaAtoLoadAfterChoseFilter) { // uživatelské vypnutí automatického vyhledávání //searchPlease - přecejenom vyhledat když cu
//                                                that._callFind(changeObj.value);
//                                                if (that.options.poVyhledaniZavritPanelPodminek) {
//                                                    that._showHideInternalfunction(true);
//                                                }
//                                            }
//                                        }
//                                        that._manageAkceProVybmazani();
//                                        // });
//                                    }
//                                },

//                            }).prop("actions", that.actions.filtrActions)
//                            .on("gautocompleterender", function (ev, obj) {
//                                var favProfile = false;

//                                /*       if (_this.currentProfile._changed === true)
//                                           $("<div class='statusbar profile-box-menu'>").prependTo(obj.viewPort).gbuttonpanel({
//                                               params: profileActions.createBar([], ["actSave"])
//                                           });*/

//                                obj.viewPort.find(".suggestion-item").each(function () {
//                                    var rowData = $(this).data("data-row");
//                                    $("<div class='statusbar'>").appendTo(this).gbuttonpanel({
//                                        params: that.actions.filtrActions.createBar([
//                                            //rowData._id && !rowData._locked ? { action: that.actions.filtrActions.actRemove, actionContext: { rowData: rowData } } : null,
//                                            !rowData.gfilterpanel_staticFilter ? { action: that.actions.filtrActions.actRemove, actionContext: { rowData: rowData } } : null,
//                                            !rowData.gfilterpanel_staticFilter ? { action: that.actions.filtrActions.actConfiguration, actionContext: { rowData: rowData } } : null,
//                                            !Gordic.Utils.GString.IsNullOrWhiteSpace(that.ixsFunAkt) ? { action: that.actions.filtrActions.actFavorite, actionContext: { rowData: rowData }, icon: that._isThisIxsMasFavorite(rowData.ixs_mas) ? "fa-star g-state-warning g-state-text" : undefined } : undefined
//                                        ]),
//                                        disableItemHide: true
//                                    });
//                                });

//                            });

//                        return that.vyberPredvolenychFiltru;
//                    },
//                    visiblePriority: 200
//                },
//                //{ //dsebesta  6.1/20 odebráno na žádost T.Skály
//                //    action: this.actions.actNovyVMainSlectboxu
//                //},
//                {
//                    action: this.actions.actVymazatKriteria,
//                    visiblePriority: 50
//                },
//                {
//                    action: this.actions.actVyhledatMainRow,
//                    visiblePriority: 150
//                }



//                //{
//                //    action: this.actions.actVymazatKriteria
//                //}


//                ]
//            });



          
//            this.filtrBadge = $("<div>")
//                .insertAfter(this.mainFilterButton.find(".js-gbuttonpanel-item.js-hlavniVyhledat")) //g-buttonpanel__left
//                .glink({
//                    params: {
//                        action: this.actions.filtrovano,
//                        badge: {                //definice badge
//                            id: "badgeJS",
//                            value: "0",
//                            tooltip: "jres:25030527", //RC 25030527 : Nebyly použity žádné podmínky filtrování
//                            customClass: "g-state-info js-badgeKriteria"
//                        }
//                    }

//                })
//                //.css("width", "16rem")
//                //.css("display", "block")
//                .css("margin", "0.4rem");


//            this.vyberPredvolenychFiltru.find(".gfield-table").css("border", "none");
//            this.vyberPredvolenychFiltru.find(".gcontrolbox-buttons.right").css("border", "none");
//            this.vyberPredvolenychFiltru.find(".gselectbox-vc").css("background", "#fafafa");

//            this.favoriteParentDiv = $("<div>").appendTo(this.element);

//            this._createOrSetFilteredSlectbox();
           
//            if (!this.filtrBadgeVisibleOnly) {
//                this.filtrBadgeVisibleOnly = false;
//                this._filtrBadgeHide();
//            } else {
//                this._favoriteFilteredSelectBoxHide();
//                this._filtrBadgeShow();

//            }

         

//        },
//        // vytvoření nebo nastavení selectboxu s vyhledaníma kriteriama
//        _createOrSetFilteredSlectbox: function (data) {
//            var that = this;
          
//            if (this.favoriteFilteredSelectBox == null) {
//                this.favoriteFilteredSelectBox = $("<div>").appendTo(this.element)
//                    .gform("setup", { layoutDescriptor: "L1M1S1 L-12-12-0 M-12-12-0" })
//                    .gformsection("create")
//                    //.gformrow("addFieldsRow", "Aktuálně filtrováno podle:")
//                    .gselectbox({
//                        name: "SelboxSVyhledanejmaKriteriema",
//                        graphicInput: "hidden",
//                        //itemTemplate: "<i>{label}</i><br><b>{val}</b>",
//                        itemTemplate: function (row) {
//                            var ret = $("<i>" + row.label + " </i><br>");
//                            if (row.val) {
//                                return ret.add(row.val);
//                                // return row.gfilterpanel_name;
//                            } else {
//                                return "";
//                            }
//                        },
//                        multi: true,
//                        itemWidth: "",
//                        showSelectButton: false,
//                        buttons: [
//                            {
//                                icon: "gi-arrow-double gi-rot90", //'gi-arrow-double gi-rot90',
//                                tooltip: "jres:31969014", //RC 31969014 : Skryje detailní popis použitých podmínek.
//                                action: new GAction({
//                                    name: 'actTest2', run: function (ev, ctx) {
                                        
//                                        that.filtrBadgeVisibleOnly = true;
//                                        that._filtrBadgeShow();
//                                        that._favoriteFilteredSelectBoxHide();
//                                    }
//                                })
//                            }
//                        ],
//                        change: function (ev, ctx) {
                            
//                            if (ctx && ctx.flags && ctx.flags.setAfterSearch) {
//                                ;
                                
//                            } else {
//                                var difference = that._findDifrenceBetweenArray(ctx.value);
//                                that._startFindAfrerRemoveFormVyslednySelectbox(difference);
//                                ;// TODO vynulovat v objektu a pustit hledání.
//                            }
//                            that.LastValueInnSelboxSVyhledanejmaKriteriema = ctx.value;
//                        },
//                        itemCreated: function (ev, div, value, index, btnAdd) {
//                           // var button = $("<span class='gi gi-detail clickable'>");
//                            $(div).click(function (evClick) {
                              
//                                that._inilneDialogPodSlectboxem(evClick, value);
//                                evClick.preventDefault();
//                                evClick.stopPropagation();
//                            });
//                            //btnAdd(button);
//                        }
//                    })
//                    .gform("complete");
//                this.element.findFields("SelboxSVyhledanejmaKriteriema").find(".gfield-table").css("border", "none");
//                this.element.findFields("SelboxSVyhledanejmaKriteriema").find(".gcontrolbox-buttons.right").css("border", "none");
//                this.element.findFields("SelboxSVyhledanejmaKriteriema").find(".gselectbox-vc").css("background", "#fafafa");
//            }

//            if (data !== undefined) {
//                this.element.findFields("SelboxSVyhledanejmaKriteriema").gfield("setValue", data, { setAfterSearch: true });
//            }


//            this.isDataInfavoriteFilteredSelectBox = false;
//            if (data != null && data.length > 0) {
//                this.isDataInfavoriteFilteredSelectBox = true;
//            }

//            // skdyvaní když nejsou data
//            if (this.isDataInfavoriteFilteredSelectBox) {
//                this._favoriteFilteredSelectBoxShow();
//            } else {
//                this._favoriteFilteredSelectBoxHide(true);
//            }

//            this._manageBadge();

//        },

//        // funkce co se spustí po máčknutí na křížek ve výsledném selectboxu
//        _startFindAfrerRemoveFormVyslednySelectbox: function (rowToSetNull) {
//            var that = this;

//            var data = this.getCurrentData();
//            this._crateKontrolniDiv(data);
            
//            this._setSpecialNullInFromKontrolniDiv(that.kontrolniDiv, rowToSetNull);
//            var fieldy = that.kontrolniDiv.findFields();
//            var promisFildu = fieldy.map(function () { return $(this).gfield("getValueAsync"); });   // počkám na load všecch fieldu
            
//            $.when.apply(null, promisFildu).done(function () {
               
//                var isNotValid = false;
//                var forms = that.kontrolniDiv.findForms();
//                forms.each(function (index, form) {
//                    var bool = $(form).gform("isValid");
//                    if (!bool) {
//                        isNotValid = true;
//                    }
//                });
//                if (isNotValid) {
//                    $.content(that.element).showFlash("jres:31900001"); //RC 31900001 : Data pro hledání nejsou validní, postupujte přes dialog s ostatními podmínkami.
//                } else {
//                    var NovaData = {}; // test kdy se nepřenese uložený
//                    fieldy.gfield("model", "collect", NovaData);
//                    that.applyFilter(NovaData);
//                    that._setIcoToMainSel();
//                }

//                 // zaroven nastavím změnu oprotipuvodnimu;
//            });

          
//        },
//        // otevření inline dialogu pod selectboxem
//        _inilneDialogPodSlectboxem: function (ev, value) {
//            var that = this;
//            var FormsDiv = this._getFormOnlyWithVisibleRowByFieldName(value.fieldName);
//            var Form = FormsDiv.findForms();
//            var promisFildu = Form.findFields().map(function () { return $(this).gfield("getValueAsync"); });   // počkám na load všecch fieldu
//            this._skryjInlineDialogVyslednySelectBox();
//            $.when.apply(null, promisFildu).done(function () {
//                var dialogOpts = {
//                    autoClose: false,
//                    width: 450,
//                    resizable:true,
//                    related: $(ev.currentTarget) // this.element NOTE: Musi byt table, jinak zlobi padding a pozice. V UCR je lehce posunute (asi o 1px)
//                };
//                var isImmediateClose = true;
//                if (isImmediateClose) {
//                    //dialogOpts.commandBar = [];
//                    //dialogOpts.closeButton = null;
//                    dialogOpts.createClosed = true; //NOTE: Musi byt vytvoreno skryte a az po vytvoreni otevrit, aby se vyvolala udalost 'open' v momente, kdy jsou jiz registrovane ev. handlery
//                }

//                that.inlineDialogVyslednySelectBox = Gordic.InlineDialogs.simpleForm({
//                    formDescriptor: FormsDiv,
//                    data: that.getCurrentData(),
//                    options: dialogOpts
//                });

//                that.inlineDialogVyslednySelectBox.ginlinedialog("open");

//                that.inlineDialogVyslednySelectBox.on("close", function (ev, value) {
//                    if (value) {
//                        that.applyFilter(value);
//                        that._setIcoToMainSel(); // zaroven nastavím změnu oprotipuvodnimu;
//                        //dlg.ginlinedialog("close");
//                    }
//                });
//            });
//        },

//        // skryje indline selectbox
//        _skryjInlineDialogVyslednySelectBox: function () {
//            var that = this;
//            if (this.inlineDialogVyslednySelectBox && this.inlineDialogVyslednySelectBox.length > 0 && this.inlineDialogVyslednySelectBox[0].parentElement) {
//                this.inlineDialogVyslednySelectBox.ginlinedialog("destroy");
//            }
          
//        },
//        // skryje všecko kromě toho co potřebujeme v inline dialogu
//        _getFormOnlyWithVisibleRowByFieldName: function (fieldName) {
//            var that = this;

//            var tempForm = $("<div>");
//            $(that.options.forms).each(function (index, element) {
//                element.form.customClass = "js-FormSKriterii"; // klasa podle ktere pak vyhledávám formy s podmínkami
//                var tabLabel = element.form.tabLabel || "vyplňte tabLabel do options formu"; //vytahá jméno tabu
//                var tabOpened = element.form.tabOpened;
//                $("<div>").appendTo(tempForm).gtab({ title: tabLabel, opened: (tabOpened == null ? true : tabOpened) }).gform("createFrom", element); //.gtab({ title: tabLabel, opened: true, })
//            });

//            var formy = tempForm.findForms(".js-FormSKriterii");
//            formy.findFields().gfield("clear");
//            that._showHideFields(true, formy);
//            var hledanyField = formy.findFields(fieldName);
//            hledanyField.gform().show();
//            hledanyField.gformsection().show();
//            hledanyField.gformrow().show();
//            hledanyField.gformrow().findFields().show();
//            hledanyField.gfield("model", "validators", this.options.validators);
       
//            return tempForm;
//        },

//        // pomocná funkce pro hledání rozdílu v poli
//        _findDifrenceBetweenArray: function (NoveData) {
//            var that = this;
//            //that.LastValueInnSelboxSVyhledanejmaKriteriema
//            //var difference = that.LastValueInnSelboxSVyhledanejmaKriteriema
//            //    .filter(function (x) { return !NoveData.includes(x);  })
//            //    .concat(NoveData.filter(function (x) { return !that.LastValueInnSelboxSVyhledanejmaKriteriema.includes(x);  }));
//            //var difference = $($.extend(true, [], that.LastValueInnSelboxSVyhledanejmaKriteriema)).not($.extend(true, [], NoveData)).get();,

//            var difference = [];
//            var a1 = that.LastValueInnSelboxSVyhledanejmaKriteriema;
//            var a2 = NoveData;
//            for (var i = 0; i < a1.length; i++) {
//                var JeVpoli = false;
//                for (var y = 0; y < a2.length; y++) {
//                    if (a2[y].fieldName === a1[i].fieldName) {
//                        JeVpoli = true;
//                    }
//                }
//                if (JeVpoli === false) {
//                    difference.push(a1[i]);
//                }
//            }
//            return difference;
//        },
//        // funkce pro skrytí nebo zobrazení oblíbených a slectboxu s kritérii
//        _showHideInternalfunction: function (favotitesOpened) {
          
//            var that = this;
//            if (favotitesOpened) {
//                //  that.showHideFavoriteAcrtion.update({ icon: "gi-arrow-double gi-rot270" });
//                that.favotitesOpened = false;
//                //that._showHideSearchButtonOnMainRow(true);
//                that._favoriteFilteredSelectBoxShow();
//            } else {
//                //  that.showHideFavoriteAcrtion.update({ icon: "gi-arrow-double gi-rot90" });
//                that.favotitesOpened = true;
//                // that._showHideSearchButtonOnMainRow(false);
//                that._favoriteFilteredSelectBoxHide();
//            }
//            that.refreshFavorite();

//        },

//        _favoriteFilteredSelectBoxShow: function (data) {
//            if (!this.filtrBadgeVisibleOnly && !this.options.simpleMode && this.isDataInfavoriteFilteredSelectBox ) { 
//                if (!this.favotitesOpened ) {
//                    this.favoriteFilteredSelectBox.show();
//                }
//            }
//        },

//        _favoriteFilteredSelectBoxHide: function (empty) {
        
//            if ((this.filtrBadgeVisibleOnly || this.favotitesOpened || empty) && !this.options.simpleMode) {
//                this.favoriteFilteredSelectBox.hide();
//            }
//        },

//        _manageBadge: function () {
//            this._filtrBadgeShow();
//            this._filtrBadgeHide();
//        },

//        _filtrBadgeShow: function () {
           
//            if (this.gStore && !this.options.simpleMode ) {
//                this.gStore.set("filtrBadgeVisibleOnly", this.filtrBadgeVisibleOnly);
//                //that.gStore.save();
//            }
//            if (this.filtrBadgeVisibleOnly && this.isDataInfavoriteFilteredSelectBox) {
//                this.filtrBadge.show();
//            }
           

//        },

//        _filtrBadgeHide: function () {
        
//            if (this.gStore && !this.options.simpleMode) {
//                this.gStore.set("filtrBadgeVisibleOnly", this.filtrBadgeVisibleOnly);
//                //that.gStore.save();
//            }
//            if (!this.filtrBadgeVisibleOnly ||  !this.isDataInfavoriteFilteredSelectBox) {
//                this.filtrBadge.hide();
//            }
           

//        },

//        _manageAkceProVybmazani: function () {
            
//            // kontrola obsahu hlavího selboxu
//            var show = false;
//            var selectboxHasValue  = this.element.findFields("vyberPredvolenychFiltru").gfield("hasValue");
//            if (selectboxHasValue) {
//                var selboxValue = this.element.findFields("vyberPredvolenychFiltru").gfield("getValue"); 
//                if (!this._isEmptyObject(selboxValue)) {
//                    show = true;
//                }
//            }

//            //kontrola favorite
//            if (this.favotitesOpened) {
//                var favorite = this._getCollectOfFavorite(true);
//                if (!this._isEmptyObject(favorite)) {
//                    show = true;
//                }
//            } else { 
//                if (this.favoriteModel && !this._isEmptyObject(this.favoriteModel) ) {
//                    show = true;
//                }
//            }

//            if (show) {
//                this._shbowAkceProVybmazani();
//            } else {
//                this._hideAkceProVybmazani();
//            }
//        },

//        _isEmptyObject: function (favorite) {
//            var empty = true;
//            if (!jQuery.isEmptyObject(favorite)) {

//                var maHodnotu = false;
//                for (var key in favorite) {
//                    // skip loop if the property is from prototype
//                    if (!favorite.hasOwnProperty(key)) continue;

//                    var obj = favorite[key];
//                    if (obj !== undefined && obj !== null && obj !== false) {
//                        maHodnotu = true;
//                    }
//                }
//                if (maHodnotu) {
//                    empty = false;
//                }
//            } 
//            return empty;
//        },

//        _shbowAkceProVybmazani: function () {
//            this.actions.actVymazatKriteriainFavorite.update({ visible: true });
//            //if (!this.favotitesOpened) { 
//                this.actions.actVymazatKriteria.update({ visible: true });
//            //}

//        },
//        _hideAkceProVybmazani: function () {
            
//            this.actions.actVymazatKriteriainFavorite.update({ visible: false });
           
//            this.actions.actVymazatKriteria.update({ visible: false });
            
//        },


//        // najde všechny labely u řádku ve form descriptorech
//        _findAndSetRowsNameInForms: function () { // prohleda formy a vytáhne všechny Labely
//            var that = this;
//            $(this.options.forms).each(function (index, element) { // projde pole forms 
//                var tabLabel = element.form.tabLabel;
//                $(element.form.sections).each(function (index, sections) { // projde sekce
//                    $(sections.rows).each(function (index, row) {           // projde řádky
//                        if (!row.name) { // pokud řádek nemá name tak ho přebere z prvního fieldu 
//                            row.name = row.fields[0].options.name;
//                        }
//                        if (row.name) {
//                            that.allRowsName = that.allRowsName.concat(row.name);
//                            var rowSimpleModeStrict = false;
//                            if (row.customClass && (row.customClass.indexOf("rowSimpleModeStrict") > -1)) {
//                                rowSimpleModeStrict = true;
//                            }
//                            var rowlabel = row.label || ((row.fields && row.fields[0].options && row.fields[0].options.label) ? row.fields[0].options.label : "");
//                            if (row.label || (row.fields && row.fields[0].options && row.fields[0].options.label)) { 
//                                that.findSelBoxArray = that.findSelBoxArray.concat({
//                                    rowLabel: rowlabel,
//                                    tabLabel: tabLabel,
//                                    //fieldName: row.fields["0"].options.name,
//                                    rowName: row.name,
//                                    rowSimpleModeStrict: rowSimpleModeStrict
//                                });
//                            }
//                            $(row.fields).each(function (index, field) { // projdu fildy
//                                field.options.rowLabel = row.label || field.options.label;
//                                field.options.tabLabel = tabLabel;
//                                //that.fieldNameRowlabelPair[field.options.name] = { rowLabel: row.label || field.options.label, tabLabel: tabLabel };
//                            });
//                        }
//                    });
//                });
//            });

//            that.findSelBoxArray.sort(function (a, b) {
//                var aName = (a.rowLabel || "").toLowerCase();
//                var bName = (b.rowLabel || "").toLowerCase();
//                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
//            });
//        },

//        // načtení oblíbených
//        _readfavorites: function () { // načte jmena fieldu oblíbených

//            if (this.gStore) {
//                if (this.options.simpleMode) {
//                    this._readSimpleFavorites();
//                } else {
//                    this.options.favorites = this.gStore.get("favorites", true) || this.options.favorites;  // pokud v gstore nicneni tak použiju defaultní hosnoty
//                }
               
//            }
//        },
//        _setFavorites: function (favorites) {
//            if (this.gStore) { // uložení favorite do gstore

//                if (this.options.simpleMode) {
//                    this._setSimpleFavorites(favorites);
//                } else {
//                    this.options.favorites = favorites;
//                    this.gStore.set("favorites", favorites);
//                }
             
//                //   that.gStore.save();
//            }
//        },
//        _readSimpleFavorites: function () { // načte jmena fieldu oblíbených
//            if (this.gStore) {
//                this.favoritesSimple = this.gStore.get("favoritesSimple." + this.options.idSimpleMode, true) || [];  // pokud v gstore nicneni tak použiju defaultní hosnoty

//            }
//        },
//        _setSimpleFavorites: function (data) { // načte jmena fieldu oblíbených
//            if (this.gStore) {
//                this.favoritesSimple = data;
//                this.gStore.set("favoritesSimple." + this.options.idSimpleMode, data);  // pokud v gstore nicneni tak použiju defaultní hosnoty

//            }
//        },

//        // vytvoří ukládací dialog
//        _readfavoritForm: function () { // načte jmena fieldu oblíbených
//            if (this.options.saveOptionsForm === "all" || this.options.saveOptionsForm === "eko") {
//                var radios = [{ value: 10, label: 'jres:25030529' }, { value: 0, label: 'jres:25030530' },]; //RC 25030530 : Veřejná
//                if (this.options.saveOptionsForm === "all") {
//                    radios = radios.concat([{ value: 5, label: 'jres:25030531' }]); //RC 25030531 : Za spisový uzel
//                }
//                this.options.saveOptionsForm = new Gordic.Forms
//                    .Form({ tabLabel: "jres:25030532", name: "savingDialog", layoutDescriptor: "L1M1S1" }) //RC 25030532 : Parametry
//                    .addSection({ customClass: "w-L-8 w-M-7 w-S-12", layoutDescriptor: "L2M2S1, L-3-9-0, M-12-12-0, S-12-12-0" })
//                    .addRow("jres:25030533").addField("gstringbox", { name: "gfilterpanel_name" }) //RC 25030533 : Jméno filtru
//                    .addRow("jres:25030049").addField("gstringbox", { name: "gfilterpanel_poznamka" }) //RC 25030049 : Poznámka
//                    .addRow({ label: "ixs_mas", customClass: "autohide" }).addField("gstringbox", { name: "ixs_mas", disabled: true, })
//                    .addSection({ customClass: "w-L-3 w-M-3 w-S-6", layoutDescriptor: "L2M2S1, L-0-12-0, M-12-12-0, S-12-12-0" })
//                    .addRow().addField("gradio", {
//                        name: "typ_masky",
//                        initialValue: 10,
//                        itemClass: "w-12",
//                        //model: "model.typ_masky=value",
//                        radios: radios
//                    });
//            }
//        },
//        // zobrazí oblíbené na hlavním panelu
//        _showFavorite: function () { //  zobrazí oblíbené na hlavním panelu // showAll zda se maji zobrazit všechny jako oblíbené
//            var that = this;
//            var rows = [];
//            if (this.options.simpleMode) {
//                if (that.options.idSimpleMode == null) {
//                    this.options.favorites = this.allRowsName;
//                } else if (this.favoritesSimple.length > 0) {
//                    this.options.favorites = this.favoritesSimple;
//                } else if (this.options.favorites != null && this.options.favorites.length !== 0) {
//                    this.options.favorites = this.options.favorites;
//                } else {
//                    this.options.favorites = this.allRowsName;
//                }
//            }

//            $(this.options.forms).each(function (index, elementForm) { // projde pole forms 
//                $(that.options.favorites).each(function (index, element) {
//                    var FavoriteRow = that._findRow(elementForm.form, element);
//                    if (FavoriteRow) {
//                        rows = rows.concat(FavoriteRow);
//                    }
//                });
//            });

//            // přesunuto odspodu
//            if (this.favoriteModel != null && this.aktualnePridavanyOblibenyModel) {
//                this.favoriteModel = $.extend({}, this.favoriteModel, this.aktualnePridavanyOblibenyModel);  //Oprava 9.8.2018 Pri pinovani a odpinovani se nevyplnovala hodnota
//                //this.favoriteModel = $.extend({}, this.tempFilter, this.favoriteModel); // lze předělat na marge s temfiltrem aby se neprojevili zmeny př zavření okna bredcrumpem this.aktualnePridavanyOblibeny
//            } else if (this.favoriteModel === null) {
//                this.favoriteModel = this.tempFilter;
//            }
//            this.aktualnePridavanyOblibenyModel = null;
//            that.aktualnePridavanyOblibeny = false;
//            var FormFavorite = new Gordic.Forms
//                .Form({ name: "FormFavorite", layoutDescriptor: that.options.favoriteLayoutDescriptor, }); // customClass: "pozadiMasky"
//            FormFavorite.form.sections = [];
//            $(rows).each(function (index, Row) {

//                //test doplnování potřebjného řádku pro severfilter protože ho políčko potřebuje
//                //var TempRow = $.extend({}, Row); // naklonuju
//                $(Row.fields).each(function (index, field) { //  najdu fieldy v radku
//                    /*
//                    if (field.options.serverFilters) {       
//                        for (var p in field.options.serverFilters) { 
//                            // pokud je dependence
                            
//                            if (field.options.serverFilters[p] instanceof Gordic.Forms.Dependency) {
//                                var nameOFMasterField = null;   // jmeno serverfiltru
                                
//                                // pokud projíždím po druhé místo name už je tam odkaz na div fieldu, je potřeba to meno vydolovat z něj :D 
//                                if (typeof field.options.serverFilters[p].field === "object"
//                                    && field.options.serverFilters[p].field[0]
//                                    && field.options.serverFilters[p].field[0].attributes
//                                    && field.options.serverFilters[p].field[0].attributes[1]
//                                    && field.options.serverFilters[p].field[0].attributes[1].nodeValue) {
//                                    nameOFMasterField = field.options.serverFilters[p].field[0].attributes[1].nodeValue; //

//                                    field.options.serverFilters[p] = new Gordic.Forms.Dependency(nameOFMasterField, field.options.serverFilters[p].value, field.options.serverFilters[p].required);
                                    
//                                } else { // pokud poprvé je tam rovnou název fieldu
//                                    nameOFMasterField = field.options.serverFilters[p].field;
//                                }
//                                if (that.options.favorites.indexOf(nameOFMasterField) === -1 
//                                    && that.addedToFavoriteSecretly.indexOf(nameOFMasterField) === -1
//                                ) { // pokud nebude políčko v oblíbených
//                                    //doplnit row do kolekce s visibleNon
//                                    $(that.options.forms).each(function (index, elementForm) { // projde pole forms 
//                                        var MasterRow = that._findRow(elementForm.form, nameOFMasterField); //that.options.forms
//                                        if (MasterRow) {
//                                            FormFavorite.form.sections.push({ rows: [MasterRow], customClass: "gfilterpanel-section autohide" });
//                                            that.addedToFavoriteSecretly.push(nameOFMasterField);
//                                        }
//                                    });
//                                }
                                
//                            }
//                        }
                           
//                    }
//                    */
//                    // přidání závislých políček.
//                    if (field.options.favoriteRequiredFields && field.options.favoriteRequiredFields.length > 0) {
//                        $(field.options.favoriteRequiredFields).each(function (index, RequiredField) {
//                            if (that.options.favorites.indexOf(RequiredField) === -1
//                                && that.addedToFavoriteSecretly.indexOf(RequiredField) === -1
//                            ) { // pokud by byla v oblíbených nebo již skrytě přidáno tak jedině dobře a nic nedělám
//                                $(that.options.forms).each(function (index, elementForm) { // projde pole forms 
//                                    var requiredRow = that._findRow(elementForm.form, RequiredField); //that.options.forms
//                                    if (requiredRow) {
//                                        FormFavorite.form.sections.push({ rows: [requiredRow], customClass: "gfilterpanel-section autohide" });
//                                        that.addedToFavoriteSecretly.push(RequiredField);
//                                    }
//                                });
//                            }
//                        });
//                    }

//                });
//                //konec testu
//                FormFavorite.form.sections.push({ rows: [Row], customClass: "gfilterpanel-section " + " " + Row.favoriteRowLayoutDescriptor });
//            });


            
//            FormFavorite
//                .addSection({ customClass: "gfilterpanel-section " })
//                .addField("gbutton", {
//                    params: {
//                        action: new GAction({
//                            name: "actMaskaVyhledat",
//                            caption: "jres:31969023", //RC 31969023 : Načíst
//                            icon: "gi-refresh",
//                            visible: that.options.simpleMode ? true : false,
//                            customClass: " pull-right  js-butVyhledat" + (that.favoriteButPrimary || this.options.simpleMode ? " g-button--primary" : ""),
//                            run: function (event, actionContext) {
//                                that._waitForFavorite().done(function () {
//                                    that._startFindFromFavoriteBut();
//                                });
//                            }
//                        })
//                    }
//                });

//            that.addedToFavoriteSecretly = []; // mazání tempolárního pole s přidanými neviditelnými
//            //var favorite = $("<div>").appendTo(this.element).gform("createFrom", FormFavorite); // vytvořím formulář
//            var favorite = null;
//            if (this.options.simpleMode) {
//                favorite = $("<div>").appendTo(this.element).gform("createFrom", FormFavorite); // vytvořím formulář
//            } else {
//                favorite = $("<div>").appendTo(this.favoriteParentDiv).gform("createFrom", FormFavorite); // vytvořím formulář
//            }


//            favorite.findFields().gfield("model", "validators", this.options.validators);
//            that._setCollectOfFavorite(that.favoriteModel);                                  // vyplním data 
//            if (!this.options.simpleMode) {
//                favorite.on("fieldchange", function (ev, changeObj) {               // reakce na zmenu v oblíbených kriteeriich
                    
//                    if (changeObj.flags.noChange) {
//                        $.noop();
//                    } else {
//                        that._uppravPrimaryNaButton(true);
//                        that._setIcoToMainSel();
//                        that._changeBadgeColor();
//                    }
//                    that._manageAkceProVybmazani();
//                    //var oldValue = field.gfield("getValue");
//                    //if (oldValue) { // tryk se špičatým kloboukem
//                    //    oldValue.change = true;
//                    //    field.gfield("setValue", oldValue);
//                    //}
//                });
//            }
            
//            this.element.findForms("FormFavorite").findFields().gformsection().addClass("gform-filterSection"); //

//            if (this.options.simpleMode) { // v případě kdy není vykreslen hlavní řádek je nutné někde zobrazt tlačítko na vymazání filtru
//                var butVymazat = $("<div>").glink({
//                    params: {
//                        action: new GAction({
//                            name: "actVymazatKriteria",
//                            icon: "fa-eraser",
//                            caption: null,
//                            tooltip: "jres:25030677", //RC 25030677 : Nastaví všechny filtrační podmínky do výchozích hodnot.
//                            customClass: "g-state-text g-link--no-underline", // g-state-important  
//                            run: function (event, actionContext) {

//                                that.element.findFields().gfield("reset", { filterClear: true, noChange: true }); //.findForms("FormFavorite")
//                                that.tempFilter = null;
//                                that._trigger("reset", null, { type: "mainRow" });  // vyvolám eventu při promazávání vyplněných dat

//                            }
//                        })
//                    }
//                }).addClass("pull-right gfilterpanel-DeleteButInFavorite");
//                butVymazat.appendTo(that.element.find(".js-butVyhledat").parent());

//            } else {

//                var butVyhledat = this.element.findForms("FormFavorite").find(".js-butVyhledat");
//                butVyhledat.after(
//                    $("<a>")
//                        .css("margin", "0.5rem")
//                        .glink({
//                            params: {
//                                customClass: " g-state-text  g-link--no-underline", //pull-right
//                                action: new GAction({
//                                    name: "linkbtRozsirenaKriteria",
//                                   // icon: "fa-arrow-right",   //definice ikony
//                                    caption: "jres:31969010", //RC 31969010 : Všechny podmínky
//                                    // tooltip: "",
//                                    run: function (event) {
//                                        that._waitForFavorite().done(function () { // počkam na load políček ve favorite
//                                            that._openDetailZFavorite();
//                                        });
//                                    }
//                                })
//                            }
//                        })
//                );

//                //var vymazatButton = $("<div>").gbutton({
//                //    params: {
//                //        customClass: "pull-right",
//                //        action: that.actions.actVymazatKriteriainFavorite
//                //    }
//                //});
//                //butVyhledat.after(vymazatButton);
                
//            }

//            //simpleModeVýběrOblíbených
//            if (!this.options.simpleMode || that.options.idSimpleMode) {
//                this.slectFavoriteButton = $("<a>")
//                    .glink({
//                        params: {
//                            customClass: "pull-right g-state-text  g-link--no-underline",
//                            tooltip: "jres:31930688", //RC 31930688 : Otevře volbu podmínek
//                            action: new GAction({
//                                name: "actFavorite",
//                                icon: "fa-cog",   //definice ikony
//                                //caption: "S ikonou",
//                                // tooltip: "",
//                                run: function (event) {
//                                    that.showSimpleSelectFavorite();
//                                }
//                            })
//                        }
//                    });


//                this.element.findForms("FormFavorite").before(this.slectFavoriteButton);


//            }
//            var fieldForFocus = this.element.findForms("FormFavorite").findFields().first();
//            fieldForFocus.find(":focusable:first").focus();


//            that._trigger("formbuilded", null, { type: "favorite", form: favorite }); // vyvolám eventu přestavění formuláře oblíbených
//        },

//        // v simple modu s výběrem oblíbených
//        showSimpleSelectFavorite: function () {
//            var that = this;

            
//            var lastSelected = $.extend(true, [], that.options.favorites); // dsebesta přidáno ale asi zbytečně
//            //odfiltrování null hodnot
//            var lastSelectedWithoutNull = [];
//            $.each(lastSelected, function (i, el) {
//                if (el != null) lastSelectedWithoutNull.push(el);
//            });
//            lastSelected = lastSelectedWithoutNull;

//            var strict = [];
//            var data = [];
            
//            if (that.findSelBoxArray && that.findSelBoxArray.length > 0) {
//                for (var i = 0; i < that.findSelBoxArray.length; i++) {
//                    if (that.findSelBoxArray[i].rowSimpleModeStrict && that.findSelBoxArray[i].rowName) {
//                        var strictName = that.findSelBoxArray[i].rowName;
//                        strict.push(strictName);
//                        var poziceVPoli = $.inArray(strictName, lastSelected);
//                        if (poziceVPoli > -1) {
//                            lastSelected.splice(poziceVPoli, 1);
//                        }


//                    } else {
//                        data.push(that.findSelBoxArray[i]);
//                    }
//                }
//                var model = { favoritesInSimpleMode: lastSelected };
//                var vyverOblibenychVSimleModu = new Gordic.Forms.Form();
//                if (!this.options.simpleMode) {
//                    vyverOblibenychVSimleModu.addSection("jres:31969020") //RC 31969020 : Volby
//                        .addRow().addField("gcheck", {
//                            label: "jres:31969021", //RC 31969021 : Po vyhledání zavřít panel podmínek
//                            name: "poVyhledaniZavritPanelPodminek"
//                        })
//                        .addRow().addField("gcheck", {
//                            label: "jres:31969022", //RC 31969022 : Po otevření seznamu otevřít panel podmínek
//                            name: "poOtevreniOtevritPanelPodminek"
//                        });
                    
//                    model.poOtevreniOtevritPanelPodminek = this.options.poOtevreniOtevritPanelPodminek;
//                    model.poVyhledaniZavritPanelPodminek = this.options.poVyhledaniZavritPanelPodminek;
//                }

//                vyverOblibenychVSimleModu.addSection()
//                    .addRow("jres:31930689").addField("gselectbox", { //RC 31930689 : Podmínky
//                        name: "favoritesInSimpleMode",
//                        data: new Gordic.Data.View(data, { key: "rowName" }),  //rowName tabLabel rowLabel
//                        itemTemplate: "{rowLabel}",
//                        //list: true,
//                        multi: true,
//                        sortable: true,
//                        helperColumns: ["rowLabel"],
//                        //model: "model.favoritesInSimpleMode = value.rowName",
//                        model: "model.favoritesInSimpleMode = value.rowName",
//                        validators: that.options.simpleMode? [new Gordic.Validators.Required()]:undefined,
//                        //verify: function (value) {
//                        //    var tempArr = [];
//                        //    for (var y = 0; y < value.length; y++) {
//                        //        var found = false;
//                        //        var itemFounded = null;
//                        //        for (var i = 0; i < data.length; i++) {
//                        //            if (data[i].rowName === value[y].rowName) {
//                        //                found = true;
//                        //                itemFounded = data[i];
//                        //            }
//                        //        }
//                        //        if (found) {
//                        //            tempArr.push(itemFounded);
//                        //        } 
//                        //    }
//                        //    return tempArr;
//                        //}
//                    });
            

//                // otevreni okna
//                var content = $.content(that.element);
//                content.dialogs.simpleForm("jres:31930690", vyverOblibenychVSimleModu, model, { width: 400, height: 400 }) //RC 31930690 : Výběr podmínek
//                    .on("close", function (ev, retVal) {
//                        if (retVal) {

                            

//                            var puvodni = retVal.favoritesInSimpleMode;
//                            var unikatni = [];
//                            $.each(puvodni, function (i, el) {
//                                if ($.inArray(el, unikatni) === -1) unikatni.push(el);
//                            });
//                            retVal.favoritesInSimpleMode = unikatni;
                            
//                            if (!that.options.simpleMode) {
//                                that._ulozUzivatelskeNastaveni(retVal);
//                            }

//                            var temp = retVal.favoritesInSimpleMode;
//                            if (that.options.simpleMode) {
//                                temp = retVal.favoritesInSimpleMode.concat(strict);
//                            }
//                            that._setFavorites(temp);
//                            that.refreshFavorite();
//                        }
//                    });
//            }
//        },

//        removeDuplicates:function(originalArray, prop) {
//            var newArray = [];
//            var lookupObject = {};

//            for(var i in originalArray) {
//                lookupObject[originalArray[i][prop]] = originalArray[i];
//            }

//            for (i in lookupObject) {
//                newArray.push(lookupObject[i]);
//            }
//            return newArray;
//        },

//        // nastavení změnové ikony do hlavního selectboxu
//        _setIcoToMainSel: function () {
//            var that = this;
//            var field = this.element.findFields("vyberPredvolenychFiltru"); // přidá ikonku do  selboxu s výberem filtru
//                //.gfield("addState", {
//                //    id: "stateChangeFilter",
//                //    icon: "fa-exclamation-circle",
//                //    customClass: "g-state-important",
//                //    tooltip: 'jres:25030534' 
//                //});
//            field.gfield("addButton", {
//                id:"stateChangeFilter",
//                action: new GAction({
//                    name: "stateChangeFilter", icon: "gi-save", customClass: "g-state-important", tooltip: 'jres:25030534', //RC 25030534 : Došlo ke změně v původním filtru. Pro trvalé uložení kliknutím otevřte detail a následně uložte.
//                    run: function (ev, ctx) {
//                        that._openDetailZIndikaceZmeny();
//                    }
//                }) 
//            });
//        },
//        // pomocná funkce pro vyhledání řádku s name
//        _findRow: function (obj, name, pocitadlo) { //lze přidat počet urovní. 
//            var result;
//            if (pocitadlo == null) { // pocitadlo zanoření kuli cyklení, nejsem is jist zda to někde nebude dělat neplechu
//                pocitadlo = 0;
//            }
//            for (var p in obj) {
//                if (obj.name === name && obj.initialValue === undefined) { // možná i if(rowLabel = undefined) // pokud byly zmaštěná data v gstore favorite name políček co nejsou klíče řádku, 
//                    //hledali se i tyto a vytvářel se prázdná sekce, proto je nutné vyloučit i to že se najde name v optionu políčka místo na řádku
//                    return obj;
//                } else {
//                    if (pocitadlo < 8 && typeof obj[p] === 'object' && p !== "serverFilters" && p !== "data" && p !== "userSettings") { //   // serverFilters je zde kuli zacyklení // 10.08 přidán data a userSettings
//                        var novePocitadlo = pocitadlo + 1; // přenášelase ninstance
//                        result = this._findRow(obj[p], name, novePocitadlo);
//                        if (result) {
//                            return result;
//                        }
//                    }
//                }
//            }
//            return result;
//        },
//           // funkce pro otevření detailu z panelu oblíbených
//        _openDetailZFavorite: function () {
//            var that = this;
//            var data = this.getCurrentData();
//            this._openDetail(data, true);
//        },
//         // funkce pro otevření detailu filtru z indikace zmeny
//        _openDetailZIndikaceZmeny: function () {
//            var that = this;
//            var data = this.getCurrentData();
//            var jakoNovy = true;
//            if (data.gfilterpanel_name != null) {
//                jakoNovy = false;
//            }
//            this._openDetail(data, jakoNovy);
//        },
//        // funkce pro otevření detailu filtru
//        openDetail: function (inputData) {
//            this._openDetail(inputData, true);
//        },

//        // otevření velkého detailu  
//        _openDetail: function (inputData, jakoNovy) {
//            var that = this;
//            var Form = this.element.findForms("FormFavorite");
//            if (Form) { $.noop(); } else { return null; } //if(Form && Form.gform("isValid"))
//            var options = {};
//            this._skryjInlineDialogVyslednySelectBox();
//            this.puvodniDataDoDetailu = inputData;
            

//            if (this.options.detailMode === "navigate") {
//                //navigate
//                options = $.extend({}, {
//                    // width: 1000,
//                    // height: 800,
//                    // modal: true,
//                    title: "jres:25030572" //RC 25030572 : Detail filtru
//                });
//            } else {
//                options = $.extend({}, {
//                    width: 1000,
//                    height: 800,
//                    modal: true,
//                    title: "jres:25030572" //RC 25030572 : Detail filtru
//                });
//            }
//            this.akceProVyberOblibenych = new GAction({
//                name: "actVybratOblibene",
//                caption: "jres:25030537", //RC 25030537 : Vybrat rychlé podmínky
//                tooltip: "jres:25030538",
//                checked: false,
//                visible: this._isModeDetailBezFavorite(),
//                run: function (ev, ctx) { //RC 25030538 : Zapne/vypne mód výběru rychlých podmínek
//                    this.update({ checked: !this.checked() });
//                    that._addOrRemoveFavoritePinInDetail(this.checked()); // přidám nebo odeberu piny k řádkům
//                    if (that.gStore) {
//                        var storeVal = that.gStore.set("isFavoritesPinPressed", this.checked());
//                    }
//                }
//            });

//            this.akceSkrytPrazdne = new GAction({
//                name: "actSkrytPrazdne", checked: false, caption: "jres:25030539", //RC 25030539 : Pouze vyplněné
//                tooltip: "jres:25030540", //RC 25030540 : Při aktivaci se zobrazí pouze vyplněné podmínky. Deaktivací se zobrazí všechny podmínky. (Při zobrazení pouze vyplněných podmínek lze také přidávat podmínky pomocí vyhledávače podmínek).
//                run: function (ev, ctx) {
//                    var thatFieldu = this;
//                    that._waitForDetail().done(function () {
//                        thatFieldu.update({ checked: !thatFieldu.checked() }); // prvne přehodim na opak abych mohl pracovat rovnou s aktualnim stavem
//                        that.chackedSkrytPrazdne = thatFieldu.checked();
//                        var Form = that.dlgDetail.findForms(".js-FormSKriterii");
//                        that._showHideFields(that.chackedSkrytPrazdne, Form);
//                        if (that.gStore) {
//                            that.gStore.set("isChackedSkrytPrazdne", that.chackedSkrytPrazdne);
//                        }

//                    });
//                }
//            });

//            //nadefinuju defaultniho menu

//            options.menuBar = [
//                {
//                    type: "widget",
//                    favorite: true,
//                    caption: "jres:25030543", //RC 25030543 : Hledání podmínek
//                    align: "opposite", //customClass:"w-2", //
//                    init: function () {
//                        return $("<div>").width(250)
//                            .gselectbox({
//                                name: "selectBoxRowName",
//                                dropdown: true,
//                                helperColumns: ["rowLabel", "tabLabel"],
//                                states: [{ icon: 'gi-magglass', align: "opposite", tooltip: "jres:25030544" }], //RC 25030544 : Vyhledávání podmínek
//                                placeholder: "jres:25030545", // TODO //RC 25030545 : Vyhledat podmínku
//                                data: new Gordic.Data.View(that.findSelBoxArray, { key: "rowLabel" }),
//                                itemTemplate: function (value) {
//                                    if (value) {
//                                        return "<b>" + value.rowLabel + "</b> / " + "<i style='font-size:0.6rem;'>" + value.tabLabel + "</i>";
//                                    } else { return "<i>jres:25030546</b>"; } //RC 25030546 : Vyhledávání
//                                },
//                                smartNavigation: false,
//                                change: function (ev, changeObj) {  // TODO předělat na row pair
//                                    if (changeObj.value) {
//                                        //var field = that.dlgDetail.findFields(changeObj.value.fieldName);
//                                        var field = that.dlgDetail.findFormRows(changeObj.value.rowName).findFields().first();
//                                        that._showFieldThree(field);
//                                        field.find(":focusable:first").focus();
//                                        $(this).gfield("clear");
//                                    }
//                                }
//                            });
//                    }
//                },
//                {
//                    favorite: true, action: new GAction({
//                        icon: "fa-eraser",
//                        name: "actVymazatNavolenaKriteria", caption: "jres:25030675", //RC 25030675 : Výchozí
//                        tooltip: "jres:25030676", run: function (ev, ctx) { //RC 25030676 : Nastaví do všech podmínek výchozí hodnoty.
//                            that.dlgDetail.findFields().gfield("reset", { filterClear: true, noChange: true });
//                            that._changeInDetilFilterData(false);
//                            that._trigger("reset", null, { type: "detail", form: DetailDiv });  // vyvolám eventu při promazávání vyplněných dat
//                        }
//                    })
//                },
//                {
//                     favorite: true, action: this.akceProVyberOblibenych
//                },
//                {
//                    favorite: true, action: this.akceSkrytPrazdne
//                },
//                {
//                    favorite: false, action: new GAction({
//                        name: "actZobrazitHidden", checked: that.showHidden, caption: "jres:25030541", //RC 25030541 : Skryté filtry
//                        tooltip: "jres:25030542", run: function (ev, ctx) { //RC 25030542 : V nabídce uložených  filtrů se zobrazí i skryté filtry.
//                            this.update({ checked: !this.checked() }); // prvne přehodim na opak abych mohl pracovat rovnou s aktualnim stavem
//                            var chacked = this.checked();
//                            that.showHidden = chacked;
//                        }
//                    })
//                }


//            ];

//            // nadefinuju spodni menu
//            this.actSaveIcoInDetail = new GAction({
//                icon: "gi-save g-state-text",
//                caption: "jres:25030185", //RC 25030185 : Uložit
//                tooltip: "jres:25030576", //RC 25030576 : Uloží úpravy v aktuálně zvoleném filtru.
//                //customClass: "g-button--primary",
//                name: 'actSave', run: function (ev, ctx) {
//                    that._waitForDetail().done(function () {
//                        that._openSaveingDialog();
//                    });
//                }
//            });


//            this.actNovyIcoInDetail = new GAction({
//                icon: "gi-plus g-state-text",
//                caption: "jres:25030577", //RC 25030577 : Uložit jako nový filtr
//                tooltip: "jres:25030578", //RC 25030578 : Uložit aktuálně navolené podmínky jako nový filtr.
//                //customClass: "g-button--primary",
//                name: 'actSave', run: function (ev, ctx) {

//                    that._waitForDetail().done(function () {
//                        that._openSaveingDialog(true);
//                    });
//                }
//            });
//            options.commandBar = [];

//            if (!jakoNovy) {
//                options.commandBar.push({ action: this.actSaveIcoInDetail });
//            }
//            options.commandBar.push({ action: this.actNovyIcoInDetail });

//            options.commandBar.push({
//                customClass: "", action: new GAction({
//                    name: "actvyhledatDet", caption: "jres:31969023", customClass: "g-button--primary", run: function (ev, ctx) { //RC 31969023 : Načíst
//                        that._waitForDetail().done(function () {
//                            var model = that._getCollectOfDetail(); // vyzbírá data 
//                            if (model) {
//                                that._callFind(model); // zavolá vyhledání
//                                if (that.options.poVyhledaniZavritPanelPodminek) {
//                                    that._showHideInternalfunction(true);
//                                }
//                                //var valSel = that.dlgDetail.findFields("userFilterInDetail").gfield("getValue");
//                                var dataToMainSelBox = $.extend({}, that.puvodniDataDoDetailu, model);
//                                that.element.findFields("vyberPredvolenychFiltru").gfield("setValue", dataToMainSelBox, { notSaveTemp: true, manualSet: true }); // nasetuju selectbox na mainu
//                                that._setCollectOfFavorite(model);
                                
//                                var field = that.dlgDetail.findFields("userFilterInDetail");

//                                var icon = that.actSaveIcoInDetail.icon;
//                                if (icon.indexOf("g-state-important") > -1) {
//                                    that._setIcoToMainSel();
//                                }
//                                that.dlgDetail.gcontent().close(); // zavře detail
//                            }
//                        });
//                    }
//                })
//            });
//            options.commandBar.push({
//                customClass: "", action: new GAction({
//                    name: "actZavrit", caption: "jres:25030459", run: function (ev, ctx) { //RC 25030459 : Zavřít
//                        that.dlgDetail.gcontent().close();
//                    }
//                })
//            });
            
//            options.statusBar = [];

            
//            this.actStatusFilterName = new GAction({
//                name: "actStatusFilterName",
//                caption: "",
                    
//            });

//            //options.statusBar.push({
//            //    action: this.actStatusFilterName,

//            //});

//            this.staticFilterName  = new GObservableObject({
//                type: "static",
//                caption: ""
//            });
//            options.statusBar.push(this.staticFilterName);
          
           
//            this.actStatusTypFiltru = new GAction({
//                name: "actStatusTypFiltru",
//                caption: "", //RC 25030033 : Typ
//                //type: "static"

//            });
//            //options.statusBar.push({
//            //    action: this.actStatusTypFiltru,
                
//            //});
//            this.staticTypFiltru = new GObservableObject({
//                type: "static",
//                caption: ""
//            });
//            options.statusBar.push(this.staticTypFiltru);

//            /*
//              // nadefinuju formy
//              var ButtonInMainSel = [
//                  {
//                      icon: 'gi-bin', requireValue: true, tooltip: "jres:25030547", action: new GAction({ //RC 25030547 : Trvalé vymazání tohoto uloženého filtru.
//                          name: 'actDelete',
//                          run: function (ev, ctx) {
//                              var val = $(ctx.field).gfield("getValue");
//                              if (val) {
//                                  that._removeFilter(val);

//                              }
//                          }
//                      })
//                  }
            
//              ];
//              if (that.options.userDefaultFilter) {
//                  ButtonInMainSel = ButtonInMainSel.concat([that._userDefaultBut]);
//              }
        
//              var FormUserFilter = new Gordic.Forms
//              .Form({ name: "userFilterFormInDetail", layoutDescriptor: "L2M2S1, L-3-9-0, M-12-12-0, S-12-12-0, breaks-600-900" })
//               .addSection({ customClass: "w-L-8 w-M-7 w-S-12", layoutDescriptor: "L2M2S1, L-3-9-0, M-12-12-0, S-12-12-0" })
//                  .addRow("jres:25030548").addField("gselectbox", { //"Předvolené filtry" //RC 25030548 : Uložený filtr
//                      name: "userFilterInDetail",
//                      dropdown: true,
//                      placeholder: "jres:25030575", // TODO //RC 25030575 : Nnení zvolen žádný uložený filtr.
//                      itemTemplate: this.options.filterItemTemplate || function (row) {
//                          if (row.gfilterpanel_name) {
//                              return "<b>" + row.gfilterpanel_name + "</b>";
//                              //return row.gfilterpanel_name;
//                          } else {
//                              return "";
//                          }
//                      },
//                      helperItemTemplate: this.options.filterHelperItemTemplate || this.options.filterItemTemplate || this._helperItemTemplateFunction,
//                      graphicInput: "hidden", //hidden
//                      serverFastFilterSupport: true, // true
//                      verticalButtons: false,
//                      change: function (ev, changeObj) {
//                          if (!changeObj.flags.notSaveTemp) {
//                              that.tempFilter = changeObj.value;
//                          }
//                          that._setmodelInDetail(changeObj.value);
//                          that._obnovSkrytPrazdne();
//                      },
//                      helperCustomizer: that.options.helperCustomizer || function (val) {
//                          var newArr = jQuery.grep(val, function (value) {
//                              if (value && value.hidden && !that.showHidden) { return null; }    // vypustím z pole
//                              else { return true; }   // nechám
//                          });
//                          return newArr;
//                      },
//                      buttons: ButtonInMainSel,
//                      helperColumns: that.options.helperColumns ? that.options.helperColumns : undefined
//                  })
//                  .addSection({ customClass: "w-L-4 w-M-5 w-S-h " })
//                  .addRow({ layoutDescriptor:"L-0-12-0, M-12-12-0, S-12-12-0"})
//                  //.addField("gbutton", {
//                  //    params: {
//                  //        action: this.actSaveIcoInDetail
//                  //    }
//                  //})
//                  //.addField("gbutton", {
//                  //    params: {
//                  //        action: this.actNovyIcoInDetail
//                  //    }
//                  //})

//                  .addField("gbuttonpanel", {
//                      customClass: "gbuttonpanel--transparent",
//                      params: [{
//                          action: this.actSaveIcoInDetail
//                      },
//                      {
//                          action: this.actNovyIcoInDetail 
//                      }]
//                  });
//            */
//            // vytvořím formy
//            var DetailDiv = $("<div>");

//            // otevreni okna
//            // var content = $.content(this.element);
//            var content = this.contentSeznamu;

//            if (this.options.detailMode === "navigate") {
//                //navigate
//                this.dlgDetail = content.navigate(DetailDiv, { id: "Det" + (("string" === typeof that.options.userSettings) ? that.options.userSettings : "gfilterpanel") + "#" }, options);
//            } else {
//                //window
//                this.dlgDetail = content.dialogs.showWindow(DetailDiv, { id: "Det" + (("string" === typeof that.options.userSettings) ? that.options.userSettings : "gfilterpanel") + "#" }, options);
//            }

//            //var contDet = $.content(this.dlgDetail);
//            //contDet.setBreadcrumbs([
//            //    {
//            //        caption: "jres:25030572", action: new GAction({ name: "actBack", run: function () { contDet.tryCloseAllChildContents(); } }) //RC 25030572 : Úprava filtrů
//            //    }
//            //]);

//            //$("<div>").appendTo(DetailDiv).gtab({ title: "", opened: true, locked: true }).gform("createFrom", FormUserFilter);
//            //$("<div>").appendTo(DetailDiv).gform("createFrom", FormUserFilter);
//            //$("<span class='js-filtrParamsText' >&nbsp;</span>").appendTo(DetailDiv.findFields("userFilterInDetail"));    // přídám místo pro paramstext 


//            // vytvoření uživatelského obsahu

//            // naplnění formulářů
//            $(this.options.forms).each(function (index, element) {
//                element.form.customClass = "js-FormSKriterii"; // klasa podle ktere pak vyhledávám formy s kritérii
//                var tabLabel = element.form.tabLabel || "vyplňte tabLabel do options formu"; //vytahá jméno tabu
//                var tabOpened = element.form.tabOpened;
//                $("<div>").appendTo(DetailDiv).gtab({ title: tabLabel, opened: (tabOpened == null ? true : tabOpened) }).gform("createFrom", element)
//                    .on("fieldchange", function (ev, changeObj) {               // reakce na zmenu v kriteeriich
//                        if (changeObj.flags.noChange) {
//                            $.noop();
//                        } else {
//                            that._changeInDetilFilterData(true);
//                            that._changeBadgeColor();
//                        }
//                    });

//            });

//            DetailDiv.findFields().gfield("model", "validators", this.options.validators);

//            if (!jakoNovy) {
//                this._setBreadcrumbs(inputData);
//            }

//            //that._setModelToDetail(jakoNovy); // přenesení dat z mainu do detailu

//            this._setmodelInDetail(inputData);

//            //that._checkIfChangeOnMainPanelAndSetFilter(); // přenesení indikace změny do detailu

//            that._nastavAddOrRemoveFavoriteZUserSettings();
//            that._nastavSkrytPrazdnePoStartu();

//            var fieldForFocus = DetailDiv.findFields().first();
//            fieldForFocus.find(":focusable:first").focus();

//            that._trigger("formbuilded", null, { type: "detail", form: this.dlgDetail }); // vyvolám eventu otevřeníDetailu

//        },

//        _setBreadcrumbs: function (val) {

//            // vygenerování názvu
//            var textDoTittle = "jres:25030572"; //RC 25030572 : Detail filtru
//            if (val != null && val.gfilterpanel_name != null) {
//                textDoTittle = textDoTittle + " - " + val.gfilterpanel_name;
//            }
//            if (this.dlgDetail != null && this.dlgDetail.length > 0) {
//                this.dlgDetail.gcontent().setBreadcrumbs({ caption: textDoTittle });

//                if (val.typ_masky_txt || val.gfilterpanel_name) {
//                    var filterName = "jres:25030548: " + val.gfilterpanel_name;//RC 25030548 : Uložený filtr
//                    this.actStatusFilterName.update({ caption: filterName }); 
//                    this.staticFilterName.update({ caption: filterName});
//                    if (val.typ_masky_txt) { 
//                        var typ = "jres:25030033: " + val.typ_masky_txt; //RC 25030033 : Typ
//                        this.staticTypFiltru.update({ caption: typ });
//                        this.actStatusTypFiltru.update({ caption: typ  }); //RC 25030033 : Typ
//                    }
//                }
//            }
//        },


//        // nastaví model v detilu pokud přijde null dojde k promazání políček
//        _setmodelInDetail: function (value) {
//            var that = this;
//            var fieldy = that.dlgDetail.findForms(".js-FormSKriterii").findFields();
//            fieldy.gfield("resetValidations");
//            fieldy.gfield("clear", { filterClear: true, noChange: true });
//            //that._changeInDetilFilterData(false);
           
//            if (value) {

//                that._setCollectOfDetail(value);
//            }
//        },



//        // zobrazení změny u filtru v detailu
//        _changeInDetilFilterData: function (isChange) {
//            var ulozenyFilterZvolen = false;
//            if (this.dlgDetail) {
//                var value = this.dlgDetail.findFields("userFilterInDetail").gfield("getValue");
//                if (value) {
//                    ulozenyFilterZvolen = true;
//                }
//            }

//            if (ulozenyFilterZvolen) {
//                this.actSaveIcoInDetail.update({
//                    enabled: ulozenyFilterZvolen
//                });
//            } else {
//                this.actSaveIcoInDetail.update({
//                    enabled: false
//                });
//            }
            
//            if (isChange) {
//                this.actSaveIcoInDetail.update({
//                    icon: "gi-save g-state-text g-state-important",
//                    tooltip: 'jres:25030549'  //RC 25030549 : Změnili jste některou z podmínek v původním uloženém filtru. Stisknutím provedete trvalé uložení změn.
                    
//                });
//            } else {
//                this.actSaveIcoInDetail.update({
//                    icon: "gi-save g-state-text",
//                    tooltip: "jres:25030550" //RC 25030550 : Umožní změnít základní definici tohoto uloženého filtru, nebo duplikovat tento uložený filtr pod jiným jménem.
//                });
//            }

//        },
//        /*
//        // pokud vysí změna v mail paneu přenese se i do detailu
//        _checkIfChangeOnMainPanelAndSetFilter: function () {
//            var field = this.element.findFields("vyberPredvolenychFiltru");
//            var value = field.gfield("getValue");
//            // přenešení state
//            var state = field.gfield("getState", "stateChangeFilter");
//            if (state.length > 0) { this._changeInDetilFilterData(true); } else { this._changeInDetilFilterData(false); }
            
//        },
//        */
//        /*
//        // nasetování modelu do detailu při otevření
//        _setModelToDetail: function (jakoNovy) {
//            // přenešení filtru
//            var field = this.element.findFields("vyberPredvolenychFiltru");
//            var value = field.gfield("getValue");
//            // přenesení hodnot z oblíbených
//            var fav = {};
//            fav = this._getCollectOfFavorite(true);
//            //this.tempFilter = data;
//            this._setDetailSelBox(); // nasetuje podkladové data do selboxu;
//            if (!jakoNovy) {
//                if (value) {
//                    this.dlgDetail.findFields("userFilterInDetail").gfield("setValue", value, { notSaveTemp: true }); //
//                }
          
//                var data = $.extend({}, this.tempFilter, fav); // ponekud hodně divné

//                this._setCollectOfDetail(data);
//            }

//        },
//        */


//        // zobrazení skrytí pinu pro ovládání oblíbených
//        _addOrRemoveFavoritePinInDetail:function(chacked){ // funkce pro přidání nebo odebrán
//            var that = this;
//            var Form = that.dlgDetail.findForms(".js-FormSKriterii");
//            var rows = Form.findFormRows();
//            if (chacked) { 
//                rows.each(function (index, row) {
//                    row = $(row);
//                    if (!row.hasClass("noPinnable")) {  // pokud ma row classu  "noPinnable"  neukaze se u něj připínák
//                        var name = row.gformrow().data("row");
//                        if (name) { // pokud nemá name nezobrazuju pin
//                            var suplement = row.gformrow("findSupplement");
//                            suplement.addClass("gfilterFavoritePinLabel");
//                            $("<a class='js-favoritePin '>").glink({
//                                params: {
//                                    customClass: "g-link--no-underline smartnav-skip",
//                                    action: new GAction({
//                                        name: "actPin",
//                                        caption: null,
//                                        rowname: name,
//                                        icon: (that._isRowFavorite(name) ? "gi-pin  gfilterPinTrue" : "gi-pin gi-rot90 gfilterPinFalse"),//"gi-pin", // g-state-text g-state-success
//                                        tooltip: (that._isRowFavorite(name) ? "jres:25030551" //RC 25030551 : Odepne tuto podmínku z rychlých podmínek
//                                            : "jres:25030552"), //RC 25030552 : Připne tuto podmínku do rychlých podmínek
//                                        run: function (event, actionContext) {
//                                            if (this.icon.indexOf("90") === -1) {
//                                                this.update({ icon: "gi-pin gi-rot90 gfilterPinFalse", tooltip: "jres:25030552" }); //g-state-text g-state-success //RC 25030552 : Připne tuto podmínku do rychlých podmínek
//                                                that._addRemoveFavorite("remove", this.rowname);
//                                            } else {
//                                                this.update({ icon: "gi-pin gfilterPinTrue", tooltip: "jres:25030551" });//RC 25030551 : Odepne tuto podmínku z rychlých podmínek
//                                                var obj = {};
//                                                $(event.currentTarget).gformrow().findFields().gfield("model", "collect", obj);
//                                                that.aktualnePridavanyOblibenyModel = obj;
//                                                that.aktualnePridavanyOblibeny = true;
//                                                that._addRemoveFavorite("add", this.rowname);
//                                            }
//                                            if (that.gStore) { // uložení favorite do gstore
//                                                that.gStore.set("favorites", that.options.favorites);
//                                                //   that.gStore.save();
//                                            }
//                                        }
//                                    })
//                                }
//                            }).appendTo(suplement);
//                        }
//                    }
//                });
//            } else {
//                rows.find(".js-favoritePin").remove();
//            }
//        },
//        _nastavAddOrRemoveFavoriteZUserSettings: function () {
//            var that = this;
//            var isChacked = true;
//            if (this.gStore) {
//                var storeVal = this.gStore.get("isFavoritesPinPressed",true);
//                if (storeVal === false) {
//                    isChacked = false;
//                }
//            }
//            if (isChacked) {
//                this.akceProVyberOblibenych.run();
//            }
//        },
//        // zjištění zda se objekt row nachází v oblíbených
//        _isRowFavorite: function (name) { // zjisti zda je row v oblíbených
//            return ($.inArray(name, this.options.favorites) > -1);
              
//        },
//        // odebrání a přidání oblíbených
//        _addRemoveFavorite: function (akce, rowName) {
//            var that = this;
//            if (akce === "add") { // přidání do oblíbených
//                that.options.favorites = that.options.favorites.concat([rowName]);// přidám do opblíbených
//                that.refreshFavorite(); // zavolám obnovení
//            } else if (akce === "remove") {
//                that.options.favorites =
//                    jQuery.grep(that.options.favorites, function (value) {
//                        return value !== rowName;
//                    });
//                that.refreshFavorite();
//            }
//        },

//        _vymazatButonInMainRowVisible:function(visible) {
//            if (this.vymazatbuttonVisibleParam && visible) {
//                this.actions.actVymazatKriteria.update({ visible: true });
//            } else {
//                this.actions.actVymazatKriteria.update({ visible: false });
//            }
//        },
//        //_vymazatButonInFavoriteVisible:function(visible) {
//        //    if (this.vymazatbuttonVisibleParam && visible) {
//        //        this.actions.actVymazatKriteriainFavorite.update({ visible: true });
//        //    } else {
//        //        this.actions.actVymazatKriteriainFavorite.update({ visible: false });
//        //    }
//        //},
//        // funkce pro zobrazení ukládacího dialogu
//        _openSaveingDialog:function(jakoNovy){
//            var that = this;
//            var model = that._getCollectOfDetail();
//            if (model === null) { return;}
//            var DetailDiv = $("<div>");
//            DetailDiv.gdomcontext({ filterStorage: this.options.filterStorageService});
//            var options = $.extend({}, { width: 600, height: 400, modal: true, title: "jres:25030553" }); //RC 25030553 : Uložení filtru
//            options.commandBar = [{
//                action: new GAction({
//                    name: "actUlozit", caption: "jres:25030185", customClass: "g-button--primary", run: function (ev, ctx) { //RC 25030185 : Uložit
//                        that._startSavingFilter();
//                    }
//                })
//            }, {
//                action: new GAction({
//                    name: "actZavrit", caption: "jres:25030459", run: function (ev, ctx) { //RC 25030459 : Zavřít
//                        that.dlgSaveDialog.gcontent().close();
//                    }
//                })
//            }];

//            // otevreni okna
//            var content = $.content(this.element);
//            //window
//            this.dlgSaveDialog = content.dialogs.showWindow(DetailDiv, { id: "SaveDet" + (("string" === typeof that.options.userSettings) ? that.options.userSettings : "gfilterpanel") + "#" }, options);

//            //this.dlgSaveDialog = GDlg.showWindow(DetailDiv, { id: "SaveDet" + that.options.userSettings + "#" }, options);

//            if (this.options.saveOptionsForm) {
//                $("<div>").appendTo(DetailDiv).gform("createFrom", this.options.saveOptionsForm);
//            } else {
//                $("<div>").appendTo(DetailDiv)
//                    .gform("setup", { layoutDescriptor: "L1M1S1" })
//                    .gformsection("create", null).gformrow("addFieldsRow", "jres:25030533") //RC 25030533 : Jméno filtru
//                    .gstringbox({ name: "userFilterInSaveDialog", model: "gfilterpanel_name=value" }).gform("complete");
//            }
//            DetailDiv.findFields().gfield("model", "validators", this.options.validators);
//            if (!jakoNovy) {
//                this._setmodelInSaveDetail();
//               // this.dlgSaveDialog.findFields("gfilterpanel_name").gfield("option", "disabled", true); 
//            } 
//            that._trigger("formbuilded", null, { type: "saveform", form: this.dlgSaveDialog });
//        },
//        // nastavi hodnoty do ukládacího detailu
//        _setmodelInSaveDetail: function () {
//            var that = this;
//            //var value = that.dlgDetail.findFields("userFilterInDetail").gfield("getValue"); // dsebesta odstranen selectbox z detailu
//            var value = this.puvodniDataDoDetailu;
//            if (value) { 
//                that.dlgSaveDialog.findFields().gfield("model", "apply", value, { setFlags: { noChange: true } });
//            }

//        },
//        //vyzbírá data a zavolá ukládání
//        _startSavingFilter: function(){
//            var that = this;
//            var parameterModel = {};
//            that.dlgSaveDialog.findFields().gfield("model", "collect", parameterModel);
//            var data = that._getCollectOfDetail();
//            that._saveFilter($.extend({}, data, parameterModel));
//            that.dlgSaveDialog.gcontent().close(); // zavření okna 
//        },

//        // funkce pro načítání Předvolených filtrů (kolekce kritérií)
//        _readuserFiltersFromResolver: function (nasetovat) { // TODO
//            var that = this;
//            if (this.options.filterStorageService === null) {
//                return null;
//            } else {
//                var parametryFiltru = {};
//                if (that.options.tema) {
//                    parametryFiltru.tema= that.options.tema;
//                }
//
//                var ret = this.options.filterStorageService.getFilters(parametryFiltru);
//                if ($.isFunction(ret.promise)) {
//                    $.content(that.element).beginOperation();
//                    ret.done(function (data) {
//                        that.data = data;
//                        that._setDataAfterReadisComplete(nasetovat);
//                        that._tryEndOperationElement();
                     

//                    });
//                } else {
//                    that.data = ret;
//                    that._setDataAfterReadisComplete(nasetovat);
//                }
                
//            }
//        },
//        // přetřídění dat
//        _setridNovaData: function () {
//            var that = this;
//            if (this.data == null) return;
            
//            this.data.sort(function (a, b) {
//                if (a.gfilterpanel_name) {
//                    return a.gfilterpanel_name.localeCompare(b.gfilterpanel_name);
//                }
//            });
          
//        },

//        // setování dat když už jsou načtená
//        _setDataAfterReadisComplete: function(nasetovat) {
//            var that = this;
//            // hlavni selectbox
//            that._setMainSelBox(nasetovat);
//            // detailoví selectbox
//            that._setDetailSelBox();
            
//        },

//        // setování selboxu na hlavním panlu
//        _setMainSelBox: function (nasetovat) {
//            // hlavni selectbox
//            var that = this;
//            this._setridNovaData();
//            this._pridejStaticFilters();

//            var mainSel = that.element.findFields("vyberPredvolenychFiltru");
//            if (mainSel.length > 0) {
//                var valmain = mainSel.gfield("getValue");
//                mainSel.gfield("clear", { filterClear: true, noChange: true });
//                mainSel.gfield("option", "data", new Gordic.Data.View(that.data)); 

//                // disablovani vyberu ulozenych kdyz je prazdny
//                if (that.data && Array.isArray(that.data) && that.data.length > 0) {
//                    mainSel.gfield("option", "disabled", false);
//                } else {
//                    mainSel.gfield("option", "disabled", true);
//                }

//                if (nasetovat) {
//                    mainSel.gfield("setValue", valmain, { manualSet: true }); // pokud je init tak bude manual set

//                }
//            }
//        },

//        // pridá programatorem zadané filtry
//        _pridejStaticFilters: function () {
//            var that = this;
            
//            if (this.options.staticFilters != null && this.options.staticFilters.length > 0 ) {
//                if (this.data == null || this.data.length == 0) {
//                    this.data = this.options.staticFilters;
//                } else {
//                    var arrayToAdd = [];
//                    for (var i = 0; i < this.options.staticFilters.length; i++) {
//                        var pridat = true;
//                        for (var y = 0; y < this.data.length; y++) {
//                            if (this.data[y].gfilterpanel_name == this.options.staticFilters[i].gfilterpanel_name) {
//                                pridat = false;
//                            }
//                        }
//                        if (pridat) {
                          
//                            this.options.staticFilters[i].gfilterpanel_staticFilter = true;
//                            arrayToAdd.push(this.options.staticFilters[i]);
//                        }
//                    }
//                    this.data = arrayToAdd.concat(this.data);
//                }
//            }
//        },


        
//        // setování selboxu na detailu
//        _setDetailSelBox: function (nasetovat, val) {
//            // detailoví selectbox
//            var that = this;
//            this._setridNovaData();
//            if (this.dlgDetail) {
//                if (nasetovat && val != null) {
//                    this.puvodniDataDoDetailu = val;
//                    this._setmodelInDetail(val);
                    
//                } 
//                this._setBreadcrumbs(val);

//            }
//        },


//        //ukládání filtru
//        _saveFilter: function(filter){
//            var that = this;
//            if (this.options.filterStorageService === null) {
//                return null; // TODO
//            } else {
//                if (that.options.tema) {
//                    filter.tema = that.options.tema;   // TODO  Pracovní řádek
//                }
//                var temp = { data: filter };
//                that._trigger("saveData", null, temp);
//                that._saveFilterFinish(temp);

        
//            }
//        },

//        //samotné uložení
//        _saveFilterFinish: function (filter) {
//            var that = this;
//            var ret = this.options.filterStorageService.saveFilter({ filter: filter.data });
//            if ($.isFunction(ret.promise)) {
//                that.dlgDetail.gcontent().beginOperation();
//                ret.done(function (row, data) { // TODO dodělat Fail
//                    that._afterSave(row, data, filter.data);
//                    that._tryEndOperationDlgDetail();
                   
//                }); // fail TODO
//            } else {
//                that._afterSave(ret, null, filter.data );
//            }
//        },
//        // po uložení filtru si pozměnám data a reloadnu selectboxy 
//        _afterSave: function (row, data, filter) {

//            if (data && $.isArray(data)) {  // pokud pole objectu předpokládám kompletní nová data
//                this.data = data;
//                this._setMainSelBox(true); //dříve false
//                this._setDetailSelBox(true, row);
//                if (this.options.userDefaultFilter === true && this.gStore) {
//                    Gordic.Gin.FilterStorageService.StoreDefault.saveIfSameIxsMas(this.gStore, row, this.ixsFunAkt);
//                }
//            } else if (row && $.isArray(row)) {  // pokud pole objectu předpokládám kompletní dnová data
//                this.data = row;
//                this._setMainSelBox(true); //dříve false
//                this._setDetailSelBox(false);
//            } else if (row === true) {    // pokud jeden object předpokládám jen nový řádek dat
//                this.data.push(filter);
//                this._setMainSelBox(true); //dříve false
//                this._setDetailSelBox(true, filter);
//            } else if (row) {
//                this.data.push(row);
//                this._setMainSelBox(true); //dříve false
//                this._setDetailSelBox(true, row); 
//                if (this.options.userDefaultFilter === true && this.gStore) {
//                    Gordic.Gin.FilterStorageService.StoreDefault.saveIfSameIxsMas(this.gStore, row, this.ixsFunAkt);
//                }
//            } else {
//                this.reload(false);
//            }
//        },

//        // mazání filtru
//        _removeFilter:function(filter){
//            var that = this;
//            $.content(this.element).dialogs
//                .confirm("jres:25030558", //RC 25030558 : Odstranit
//                "jres:25030574") //RC 25030574 : Opravdu si přejete odstranit uložený filtr?
//                .on("close", function (ev, retVal) {
//                    if (retVal === "yes") {
//                        if (that.options.userDefaultFilter === true) {
//                            Gordic.Gin.FilterStorageService.StoreDefault.removeIfSameIxsMas(that.gStore, filter.ixs_mas, this.ixsFunAkt);
//                        }
//                        if (that.options.filterStorageService === null) {
//                            return null; // TODO
//                        } else {
//                            var ret = that.options.filterStorageService.removeFilter({ filter: filter });
//                            if ($.isFunction(ret.promise)) {

//                                $.content(that.element).beginOperation();
//                                ret.done(function (data) { // TODO dodělat Fail
//                                    that._afterRemove(data, filter);
//                                    that._tryEndOperationElement();
//                                }); // fail TODO
//                            } else {
//                                if (ret) {
//                                    that._afterRemove(ret, filter);
//                                } else {
//                                    // TODO false
//                                }
//                            }
//                        }
//                    }
//                }
//            );
//            // vymazání společné serivce
           
//        },

//        // po vymazání upravím data a reladnu selectboxy
//        _afterRemove: function (data, filter) {
            
//            if($.isArray(data)){    // vrátí se pole -> nastavím nová data
//                this.data = data;
//                this._setMainSelBox(false);
//                //this._setDetailSelBox(false);
//            }else if (data === true) {  // vrátí se true -> odstraním ten co jsem odeslal 
//                this.data = jQuery.grep(this.data, function (value) {
//                    return value!== filter;   //return JSON.stringify(value) !== JSON.stringify(filter);
//                });
//                this._setMainSelBox(false);
//               // this._setDetailSelBox(false);
//            } else if (data) {  // vrátí se object odstraním ten co přišel
//                this.data = jQuery.grep(this.data, function (value) {
//                    return value !== data; //JSON.stringify(value) !== JSON.stringify(data);
//                });
//                this._setMainSelBox(false);
//               // this._setDetailSelBox(false);
//            } else {
//                this.reload(false);
//            }
//        },
        
//        // vyzbírá data z oblíbených a případně margne s uloženám v tempu
//        _startFindFromFavoriteBut: function (promiseProNavratDat){
//            var that = this;

//            this._waitForFavorite().done(function () {

//                var fav = {};
//                var data = {};
//                //var filterVal = that.element.findFields("vyberPredvolenychFiltru").gfield("getValue"); // data z filtru
//                fav = that._getCollectOfFavorite();    // favorite data
//                if (fav === null) { return null; }

//                // pokud temfilter neco obsahuje tak spojím. Pokud neobsahuje tak doloaduju initiy
//                var defer = $.Deferred();
//                if (that.tempFilter) {
//                    defer.resolve();
//                } else {
//                    that._setInitValueToTemp().done(function () {
//                        defer.resolve();
//                    });
//                }
//                // zavolám hledání
//                defer.done(function () {
//                    $.extend(data, that.tempFilter, fav);
//                    that._callFind(data, promiseProNavratDat);
//                    if (that.options.poVyhledaniZavritPanelPodminek) {
//                        that._showHideInternalfunction(true);
//                    }
//                });
//            });

//        },
//        // kotnrolni div slouží pro prefiltrování a validaci dat pres formulář který si vytvoříme jen pro tento učel
//        _crateKontrolniDiv: function (data) {
//            var that = this;

//            if (that.kontrolniDiv) { that.kontrolniDiv.remove(); } // v případě že už existuje tak uklidím
//            that.kontrolniDiv = $("<div>");
//            $(this.options.forms).each(function (index, element) {
//                element.form.customClass = "js-FormSKriterii"; // klasa podle ktere pak vyhledávám formy s kritérii
//                var tabLabel = element.form.tabLabel || "vyplňte tabLabel do options formu"; //vytahá jméno tabu 
//                $("<div>").appendTo(that.kontrolniDiv).gform("createFrom", element); //.gtab({ title: tabLabel, opened: true, })
//            });
//            var fieldy = that.kontrolniDiv.findFields();
//            fieldy.gfield("clear");
//            fieldy.gfield("model", "validators", this.options.validators);
//            fieldy.gfield("model", "apply", data);

//        },

//        // zahájení vyhledávání  - ohdeslání hledaných dat
//        _callFind: function (data, promiseProNavratDat) { 
//            var that = this;
//            this._skryjInlineDialogVyslednySelectBox();
//            var newData = {};
//            $.content(that.element).beginOperation();
//            that.tempFilter = data;
//            this._crateKontrolniDiv(data);

//            this._uppravPrimaryNaButton(false);
//            //that._vymazatButonInFavoriteVisible(true);
//            //that._vymazatButonInMainRowVisible(true);

//            var fieldy = that.kontrolniDiv.findFields();

         
//            var promisFildu = fieldy.map(function () { return $(this).gfield("getValueAsync"); });   // počkám na load všecch fieldu

//            $.when.apply(null, promisFildu).done(function () {
//                //kontrola validity
//                var forms = that.kontrolniDiv.findForms();
//                var hasErrors = false;
//                var errorArr = [];
//                forms.each(function (index, form) {
//                    $(form).gform("isValid");
//                    var err = $(form).gform("getErrors").filter(function (it) { return it.stopping === true; });
//                    errorArr = errorArr.concat(err);
//                });
               
//                if (errorArr.length > 0) {
//                    that.vyhozeniValidacniHlasky(errorArr);
//                    that._getCollectOfFavorite(); // validace oblíbených jen aby se tam ukázaly chybky;
//                    that._tryEndOperationElement();
//                    if (promiseProNavratDat) {
//                        promiseProNavratDat.reject();
//                    }
                    
//                } else { // bez chyby jedem dál
//                    fieldy.gfield("model", "collect", newData);
//                    var tempToSend = { data: newData };
//                    // pokud je zadána uživatelská funkce na upravu dat před vyhledáním

//                    that._trigger("collectData", null, tempToSend);
//                    that._userCollectDone(tempToSend, promiseProNavratDat);
//                }
//            });
//        },

//        _setSpecialNullInFromKontrolniDiv: function (kontrolniDiv, RowToRemove) {
//            if (RowToRemove != null) { 
//                for (var i = 0; i < RowToRemove.length; i++) {
//                    var row = kontrolniDiv.findFields(RowToRemove[i].fieldName).gformrow();
//                    var fieldy = row.findFields().gfield("setValue", null);
//                }
//            }
//        },

//        // funke vyvolá vyhledávání
//        _userCollectDone: function (obj, promiseProNavratDat) {
//            var that = this;
//            this.confirmedData = $.extend({}, obj.data);
//            if (promiseProNavratDat) {
//                promiseProNavratDat.resolve(this.confirmedData);
//            } else {
//                that._trigger("apply", null, { filter: obj.data }); // vyvolám eventu vyhledávání
//            }
      

//            if (!that.options.simpleMode) {
//                var rows = that.kontrolniDiv.findFormRows();
//                that._getDataForFilterBadge(rows, obj);
//            }
//            this._tryEndOperationElement();
            
//        },
//        //end operation na hlavnim panelu 
//        _tryEndOperationElement: function () {
//            var elememntToChheck = null;
//            if (this.element != null && this.element.length > 0) {
//                elememntToChheck = this.element[0];
//            } else {
//                elememntToChheck = this.element;
//            }
//            if (jQuery.contains(document, elememntToChheck)) {
//                $.content(this.element).endOperation();
//            }
//        },
//         //end operation na detailu filtru
//        _tryEndOperationDlgDetail: function () {
//            var elememntToChheck = null;
//            if (this.dlgDetail != null && this.dlgDetail.length > 0) {
//                elememntToChheck = this.dlgDetail[0];
//            } else {
//                elememntToChheck = this.dlgDetail;
//            }
//            if (jQuery.contains(document, elememntToChheck)) {
//                this.dlgDetail.gcontent().endOperation();
//            }
//        },

//        // vyzobe grafické zobrazení filtrů
//        _getDataForFilterBadge: function (rows, obj) {
//            var that = this;
//            var badgeModel = {};

//            rows.each(function (index, row) {
//                row = $(row);
//                var fieldy = row.findFields();
//                var valueString = $([]); // ""
//                var rowLabel = null;
//                var fieldName = null;
//                fieldy.each(function (index, element) {
//                    var field = $(element);
//                    if (!rowLabel) { rowLabel = field.gfield("option", "rowLabel"); }
//                    if (fieldName === null) { fieldName = field.gfield("option", "name"); }  // pro vyběrový selectbox aby našel celý row anasetoval null
//                    if (field.gfield("hasValue")) {
//                        if (field.gfield("option", "factor")) {
//                            // operátory
//                            var operator = null;
//                            var value = { o: field.gfield("option", "factor"), v: field.find("input").val(), operators: field.gfield("option", "factors") };
//                            var tempOperator = value.o;
//                            var valueFromOp = value.v;
//                            var operators = value.operators; // TODO
//                            var caption = null;
//                            $(operators).each(function (index, element) {
//                                if (tempOperator === element.factor) {
//                                    operator = element.factor;
//                                    caption = element.caption;
//                                }
//                            });
//                            valueString = that._addToValueString(valueString, " <i>" + caption.toLowerCase() + "</i> " + value.v + "");
//                        }
//                        else if (field.hasClass("gcheck")) {
//                            // check
//                            var label = "";
//                            if (field.gfield("option", "label")) { label = field.gfield("option", "label") }
//                            if (label) {
//                                valueString = that._addToValueString(valueString, label);
//                            } else {
//                                valueString = that._addToValueString(valueString, that._parseValueToBadge(field.gfield("getValue")));
//                            }
//                        } else if (field.hasClass("gradio")) {
//                            //radiobutonky
//                            var tempval = field.gfield("getValue");
//                            var val = field.find("input[value='" + tempval + "'] ~ label .gradio-label").html();
//                            valueString = that._addToValueString(valueString, val);
//                        }
//                        else if (field.hasClass("gselectbox")) {
//                            //gselectbox
//                            var v = field.gfield("getValue");
//                            var isMulti = field.gfield("option", "multi");
//                            var itemTemplate = field.gfield("option", "itemTemplate")
//                                ? Gordic.Templates.ensureTemplate(field.gfield("option", "itemTemplate"))
//                                : null;
                           
//                            if (isMulti && $.isArray(v)) {
//                                for (var i = 0; i < v.length; i++) {
//                                    if (itemTemplate) valueString = that._addToValueString(valueString, itemTemplate.render(v[i]));
//                                    else that._addToValueString(valueString, v[i].toString());
//                                }
//                            }
//                            else if (itemTemplate) valueString = that._addToValueString(valueString, itemTemplate.render(v));
//                            else valueString = that._addToValueString(valueString, v.toString());

//                            //var tempval = field.find("input").val();
//                            //if (tempval && typeof tempval === "string") {
//                            //    valueString = that._addToValueString(valueString, tempval);
//                            //} else {
//                            //    var val = field.gfield("getValue");
//                            //    if (typeof val === "string") {
//                            //        valueString = that._addToValueString(valueString, val);
//                            //    } else if (val === "object") {
//                            //        var template = Gordic.Templates.ensureTemplate(field.gfield("option", "itemTemplate"));
//                            //        valueString = that._addToValueString(valueString, template.render(val));
//                            //    } else if ($.isArray(val)) {
//                            //        var temval = "";
//                            //        $(val).each(function (index, element) {
//                            //            if (typeof element === "string") {
//                            //                temval = that._addToValueString(temval, element);
//                            //            } else if (typeof element === "object") {
//                            //                var x = field.gfield("option", "itemTemplate");
//                            //                var template = Gordic.Templates.ensureTemplate(field.gfield("option", "itemTemplate"));
//                            //                var renderedValue = template.render(element);
//                            //                temval = that._addToValueString(temval, renderedValue);
//                            //            }
//                            //        });
//                            //        valueString = that._addToValueString(valueString, temval) || that._addToValueString(valueString, "....."); //ve vývoji
//                            //    } else {
//                            //        valueString = that._addToValueString(valueString, "...."); //ve vývoji
//                            //    }
//                            //}
//                        } else {
//                            valueString = that._addToValueString(valueString, field.find("input").val() || "..."); //ve vývoji
//                        }
//                    }
//                });
                
//                if (valueString != null && valueString !== "") {
//                    var pridat = true;
//                    if (Array.isArray(valueString) && valueString.length === 0) {
//                        pridat = false;
//                    }
//                    if (valueString instanceof jQuery && valueString.length === 0) {
//                        pridat = false;
//                    }

//                    if (pridat) {
//                        badgeModel[rowLabel] = { valueString: valueString, fieldName: fieldName };
//                    }
                   
//                }

//            });
//            that._setFilterBadge(badgeModel, obj);
//        },
//        // funkce na doplnění hodnoty do stringu
//        _addToValueStringOld: function (valueString, val) {

//            var strProPridani = null;
//            var separator = ", ";
//            if (val instanceof jQuery) {
//                var html = '';
//                val.each(function () {
//                    html += this.outerHTML;
//                });
//                strProPridani = html;
//                separator = "<br>";
//            } else {
//                strProPridani = val;
//                separator = ", ";
//            }

//            if (valueString) {
//                valueString = valueString + separator + strProPridani;
//            } else {
//                valueString = valueString + strProPridani;
//            }
//            return valueString;
//        },
//        // funkce na doplnění hodnoty do stringu
//        _addToValueString: function (valueString, val) {
           

//            if (val instanceof jQuery) {
//                valueString = valueString.add(val);

//            } else if ((typeof val) === "string") {
//                valueString = $("<span>" + val + "</span>");

//            } else {
//                valueString = $("<span>" + val + "</span>");
//            }
//            return valueString;
//        },
//        // nastavím hodnotu badgi a selectboxu s hledanýma kriteriama 
//        _setFilterBadge:function(model, obj){
//            var that = this;
//            that._clearModel(model,true);

//            //Badge
//            var pocet = 0;
            
//            var tolltipik = $("<span>jres:25030554</span>"); //RC 25030554 : Použité podmínky k filtrování dat: 
//            $.each(model, function (key, value) {
//                var operator = null;
//                tolltipik = tolltipik.add($("<br><span>●</span><b>" + key + ":&nbsp;</b>"));
//                tolltipik = tolltipik.add(that._parseValueToBadge(value.valueString));
//                pocet = pocet + 1;
//            });
//            //this._setFilterBadgeFinish(pocet, tolltipik);
//            var tempData = { pocet: pocet, tooltip: tolltipik, data: obj.data };

//            that._trigger("badgeData", null, tempData);
//            that._setFilterBadgeFinish(tempData);

//            //selectbox S vysledkama
//            var dataProField = [];
//            $.each(model, function (key, value) {
//                dataProField.push({ label: (key !== null && key !== undefined) ? key : " "  , val: value.valueString, fieldName: value.fieldName });
//            });
//            that._createOrSetFilteredSlectbox(dataProField);
//        },


//        _setFilterBadgeFinish: function (data) {
//            if (data.pocet > 0) {
//                var html = '';
//                data.tooltip.each(function () {
//                    html += this.outerHTML;
//                });
//                this.element.find(".js-badgeKriteria").gbadge("option", { value: data.pocet, customClass: "g-state-info js-badgeKriteria", tooltip: html });
//                //this.actions.Filtrovano.update({ tooltip: data.tooltip });
//            } else {
//                this.element.find(".js-badgeKriteria").gbadge("option", { value: 0, customClass: "g-state-info js-badgeKriteria", tooltip: "jres:25030527" }); 
//                //this.actions.Filtrovano.update({ tooltip: "jres:25030527" }); //RC 25030527 : Nebyly použity žádné podmínky filtrování
//            }
//        },
//        //zpusob zobrazení hodnoty
//        _parseValueToBadge: function (value) {
//             //Muze byt pro cely gfilterpanel jedna instance...
//            var that = this;
//            if (value instanceof jQuery) {
//                return value;
//            } else if (typeof value === "object") {
//                return $("<span>").append(this.iconBuilder.createIcon("gi-tick"));
//            } else if (typeof value === "boolean") {
//                return (
//                    value ?
//                        $("<span>jres:25030444</span>") //RC 25030444 : Ano
//                        : $("<span>jres:25030445</span>")); //RC 25030445 : Ne
//            } else if (typeof value === "string"){
//                return $("<span>" + value +"</span>");
//            }
//        },

//        //vymaže z modelu nulové hodnoty a undefined hodnoty
//        _clearModel: function (obj,dropfalse) {
//            for (var propName in obj) {
//                if ((obj[propName] === null || obj[propName] === undefined || (obj[propName] === false || obj[propName].valueString === null || obj[propName].valueString === undefined || obj[propName].valueString === false ) && dropfalse)) {
//                    delete obj[propName];
//                }
//            }
//        },
//        // zmení barvu badge
//        _changeBadgeColor: function (modra) {
//            //var tooltip = that.element.find(".js-badgeKriteria").gbadge("option", "tooltip");
//            if (modra) {
//                this.element.find(".js-badgeKriteria").gbadge("option", { customClass: "g-state-info js-badgeKriteria" });
//            } else {
//                this.element.find(".js-badgeKriteria").gbadge("option", { customClass: "g-state-important js-badgeKriteria"});
//            }
//        },
//        // vyzbírá data z detailového formuláře
//        _getCollectOfDetail: function () {
//            var model = {};
//            var isNotValid = false;
//            var forms = this.dlgDetail.findForms(".js-FormSKriterii");
//            forms.each(function (index, form) {
//                var bool = $(form).gform("isValid");
//                if (!bool) {
//                    isNotValid = true;
//                }
//            });
//            if (isNotValid) {
//                return null;
//            } else { 
//                forms.findFields().gfield("model", "collect", model);
//                return model;
//            }
//        },

//        // nasetuje data do detailu
//        _setCollectOfDetail: function (model) {
//            var tempToSend = {
//                data: model,
//                typ: "detail"
//            };
//            this._trigger("applyData", null, tempToSend);
//            this.dlgDetail.findForms(".js-FormSKriterii").findFields().gfield("model", "apply", tempToSend.data, { setFlags: { noChange: true } });
//        },
//        // vrátí promis s indikaí že selectboxy jsou načtení na detailu
//        _waitForDetail: function () {
//            var that = this;
//            var promis = $.Deferred();
//            if (this.dlgDetail) {
//                var Forms = this.dlgDetail.findForms(".js-FormSKriterii");
//                var promisFildu = Forms.findFields().map(function () { return $(this).gfield("getValueAsync"); });   // počkám na load všecch fieldu
//                $.when.apply(null, promisFildu).done(function () {
//                    var ret = that._getCollectOfDetail();
//                    promis.resolve(ret);
//                });

//            } else {
//                promis.reject();
//            }
//            return promis;
//        },
//        // obalovačka
//        waitForDetail: function () {
//            return this._waitForDetail();
//        },
//        // funkce pro vyzbírání dat z oblíbených
//        _getCollectOfFavorite: function (nevalidovat){
//            var model = {};
            
//            var Form = this.element.findForms("FormFavorite");
            
//            if (Form.length > 0) {
//                var valid = false;
//                if (nevalidovat) {
//                    valid = true;
//                } else{
//                    valid = Form.gform("isValid");
//                }
//                if (valid) {
//                    var fieldy = Form.findFields();
//                    if (fieldy.length > 0) {
//                        fieldy.gfield("model", "collect", model);
//                    }
//                } else { return null;}
//            }
//            return model;
//        },
        

//        // nasetuje data do detailu
//        _setCollectOfFavorite: function (model) {
//            var Form = this.element.findForms("FormFavorite");
            
//            var tempToSend = {
//                data: model,
//                typ: "mainRow"
//            };
//            this._trigger("applyData", null, tempToSend);

//            if (Form.length > 0 && tempToSend.data) {
//                var fieldy = Form.findFields();
//                if (fieldy.length > 0) {
//                    fieldy.gfield("model", "apply", tempToSend.data, { setFlags: { noChange: true } });
//                }
//            }
//        },
//        // čeká az budou načtené selectboxy
//        _waitForFavorite: function () {
//            var promis = $.Deferred();
//            var Form = this.element.findForms("FormFavorite");
//            var promisFildu = Form.findFields().map(function () { return $(this).gfield("getValueAsync"); });   // počkám na load všecch fieldu
//            $.when.apply(null, promisFildu).done(function () {
//                promis.resolve(true);
//            });
//            return promis;
//        },

//        // funkce volaná z venčí. je to manuální nastavení hodnot do filtru
//        applyFilter: function (filter, doNotSearch,checkIfIsSetDefault) {
//            /// <summary>
//            /// nasetuje object filtru z venku do vnitř a rovnou provede hledání
//            /// </summary>
//            /// <param name="filter" type="type">celí model filtru (ne jenom data, pokud mate jen data je potřeba je zabalit do objektu a přidat gfilterpanel_name), možnost nechat null, použije se předchozí</param>
//            var that = this;
//            if (!doNotSearch) { doNotSearch = false; }

//            // kontrola zda byl nasetovaný defaultní filter, zvolený uživatelem
//            if (checkIfIsSetDefault && this.isSetDefaultFilter === true ) {
//                return {
//                    stav: 0,
//                    text: "zrušeno protože je zapnuta kontrola a proběhlo nasetovani uzivatelskym defaultem"
//                };
//            }
//            this._waitForFavorite().done(function () { // počkam na load políček ve favorite
//                if (that.options.simpleMode) {
//                    if (filter === null || filter === undefined) { // v případě kdy nepřijde filter
//                        if (that.tempFilter != null) { // při prvním volání se nasavil undefined a přebilo to initialValue
//                            filter = that.tempFilter;
//                        } else {
//                            filter = that.getCurrentData();
//                        }
//                    }
//                    that.element.findFields().gfield("model", "apply", filter, { setFlags: { noChange: true } });
//                    if (!doNotSearch) {
//                        that._callFind(filter);
//                    }
//                }
//                else {
//                    if (filter == null) { // v případě kdy nepřijde filter

//                        filter = that.getCurrentData();
//                        that.element.findFields("vyberPredvolenychFiltru").gfield("clear");

//                    } else {
//                        that.element.findFields("vyberPredvolenychFiltru").gfield("clear"); // v případě kdy bych setoval stejnou hodnotu tomáš nepustí change
//                    }
//                    that.element.findFields("vyberPredvolenychFiltru").gfield("setValue", filter, { manualSet: doNotSearch, strictaAtoLoadAfterChoseFilter:true });            
//                    if (doNotSearch) { that._changeBadgeColor(); } // když nehledám změním ikonku 
//                }
//            });
//        },
//        getForm:function(){
//            /// <summary> 
//            /// vrátí form oblíbených
//            /// </summary>
//            return this.element.findForms("FormFavorite");
//        },

//        // ukaze oblibene
//        showFavorite: function (open) {
//            /// <summary>
//            ///  Funkce pro manuální otevření nebo zavření oblíbených
//            /// </summary>
//            /// <param name="otevit" type="type"> True otevře oblíbené, false je zavře</param>
//            if (open === undefined || open === null) { open = true; } // pokud není parametr beru jako true
//            if (this.favotitesOpened !== open) { // pokud je změna stavu -> změnit vnitřní stav, click, vrátit true.
//                if (open) {
//                    // otevři
//                    //this.element.gcollapsible("expand");
//                    this._showHideInternalfunction(false);
//                } else {
//                    //zavři
//                    this._showHideInternalfunction(true);
//                    //this.element.gcollapsible("collapse");
//                }
//                return true;
//            }
//            return false; // nedošlo ke změně

//        },
//        //
//        _showHideFields:function(hide,Forms){
//            var that = this;
//            if (hide) { 
//                Forms.each(function (index, Form) {
//                    // orvně vše zobrazím aby se otevřenli i zavřené taby
//                    $(Form).gtab("option", "wasopen", $(Form).gtab("option", "opened"));
//                    $(Form).gtab("option", "visible", true);
//                    $(Form).gtab("option", "opened", true);
//                    var Fields = $(Form).findFields();

//                    // skryvam formy
//                    var formHasValue = $.map(Fields, function (elem, i) {
//                        if ($(elem).gfield("hasValue")) return true;
//                    });
//                    if (formHasValue.length === 0) { // pokud formy nemají value skrývám celé   // pokračuju ale s jednotlivým skrýváním rowu kuli naslednemu zobrazování přes selectbox
//                        $(Form).gtab("option", "visible", false);
//                    }
//                    // sekce
//                    var sections = $(Form).findFormSections();
//                    sections.each(function (index, section) {
//                        var fieldsInSection = $(section).findFields();
//                        var fieldsInSectionHasValue = $.map(fieldsInSection, function (elem, i) {
//                            if ($(elem).gfield("hasValue")) return true;
//                        });
//                        if (fieldsInSectionHasValue.length === 0) {   // pokud sekce mají value postupuju k řádkům, jinak hide celou
//                            $(section).hide();
//                        }
//                        // řádky
//                        var rows = $(section).findFormRows();
//                        rows.each(function (index, row) {       // projdu řádek po řádku a zkrývám
//                            var fieldsInRow = $(row).findFields();
//                            var fieldsHasValue = $.map(fieldsInRow, function (elem, i) {
//                                if ($(elem).gfield("hasValue")) return true;
//                            });
//                            if (fieldsHasValue.length === 0) {
//                                $(row).hide();
//                            }
//                        });

//                    });

//                });
//            } else {
//                Forms.each(function (index, Form) {
//                    $(Form).gtab("option", "visible", true);
//                    $(Form).gtab("option", "opened", $(Form).gtab("option", "wasopen"));
//                    $(Form).findFormSections().show();
//                    $(Form).findFormRows().show();
//                });
//            } 
//        },

//        //pokud bylo napsoled skryté prázdné tak je skryje hned pri otevreni
//        _nastavSkrytPrazdnePoStartu: function () {
//            var that = this;
//            if (that.gStore) {
//                that.chackedSkrytPrazdne = that.gStore.get("isChackedSkrytPrazdne",true);
//                if (that.chackedSkrytPrazdne) {
//                    this.akceSkrytPrazdne.run();
//                }
//            }
//        },

//        // obnoví skryté prázdné
//        _obnovSkrytPrazdne: function () {
//            var that = this;

//            if (that.chackedSkrytPrazdne) { 
//                this._waitForDetail().done(function () {
//                    var Form = that.dlgDetail.findForms(".js-FormSKriterii");
//                    that._showHideFields(false, Form);
//                    that._waitForDetail().done(function () {
//                        that._showHideFields(true, Form);
//                    });
//                });
//            }
//        },

//        // funkce pro (skryt prazdne) pokud j vše schované  zobrazí řádek ,sekci form, tab ve kterem je
//        _showFieldThree: function (field) {
//            field = $(field);
//            field.gformrow().show();
//            field.gformsection().show();
//            field.gform().gtab("option", "visible", true);
//            field.gform().gtab("option", "opened", true);
//        },

//        _destroy: function () {
//            this.element.removeClass("gfilterpanel");
//            this.element.findForms("Formgfilterpanel, FormFavorite").remove();
//            if (this.options.customClass !== "") this.element.removeClass(this.options.customClass);
//        },

//        // po setnutí vlaidatoru se refreshnou favorite
//        _setOption: function (key, value) {
//            this._super(key, value);
//            if (key === "validators")
//                this.refreshFavorite();
//        }, 
//        // vrátí temp filtr
//        getTempFilter: function () {
//            if (this.tempFilter) {
//                return this.tempFilter;
//            } else {
//                return null;
//            }
//        }, 

//        // naplní tempobject iniciačníma hodnotama z formu
//        _setInitValueToTemp: function () {
//            var that = this;
//            var defer = $.Deferred();
//            if (this.initialValuesFromForms == null) {
//                this._getInitValueFromForms().done(function (initValues) {
//                    that.initialValuesFromForms = initValues;
//                    that.tempFilter = that.initialValuesFromForms;
//                    defer.resolve();
//                });
//            } else {
//                this.tempFilter = this.initialValuesFromForms;
//                defer.resolve();
//            }
//            return defer.promise();
//        },

//        //funkce co inicalizuje initialhodnoty z formuláře do temfiltru
//        _getInitValueFromForms: function () {
//            var that = this;
//            var defer = $.Deferred();
//            var newData = {};
//            if (that.kontrolniDiv) { that.kontrolniDiv.remove(); } // v případě že už existuje tak uklidím
//            that.kontrolniDiv = $("<div>");
//            $(that.options.forms).each(function (index, element) {
//                element.form.customClass = "js-FormSKriterii"; // klasa podle ktere pak vyhledávám formy s kritérii
//                var tabLabel = element.form.tabLabel || "vyplňte tabLabel do options formu"; //vytahá jméno tabu 
//                $("<div>").appendTo(that.kontrolniDiv).gform("createFrom", element); //.gtab({ title: tabLabel, opened: true, })
//            });
//            var fieldy = that.kontrolniDiv.findFields();
//            var promisFildu = fieldy.map(function () { return $(this).gfield("getValueAsync"); });   // počkám na load všecch fieldu

//            $.when.apply(null, promisFildu).done(function () {
//                fieldy.gfield("model", "collect", newData);
//                var tempToSend = { data: newData };
//                // pokud je zadána uživatelská funkce na upravu dat před vyhledáním
//                that._trigger("collectInitialData", null, tempToSend);
//                tempToSend;
//                defer.resolve(tempToSend.data);
//            });
//            return defer.promise();
//        }, 

//        // vrací aktuální hodnotu včetně  poeditovaných favorite
//        getCurrentData: function () {
//            var fav = this._getCollectOfFavorite(true);
//            return $.extend({}, this.tempFilter, fav); // vytvořím options
//        },

//        // vyhození hlášky po validaci na pozadí
//        vyhozeniValidacniHlasky:function(errorArr){
//            var that = this;
//            var html = "jres:25030561" + "<br>" + "<br>"; //RC 25030561 : Některé z hodnot nejsou správně zadány. Zkontrolujte si prosím rozšířené podmínky.
            
//            $(errorArr).each(function (index, element) {
//                var label = "jres:25030562"; //RC 25030562 : Neupřesněno
//                var labelObj = element.field.gformrow("findLabel");
//                if (labelObj.length > 0) {
//                    label = labelObj[0].innerHTML;
//                }
//                html = html + "<br>" + label + " - " + element.message;
//            });
//            $.content(this.element).dialogs.error("jres:25030563", html); //RC 25030563 : Kontrola hodnot
//        },

//        // Duležitá funkce pro Tomáše. Měla by vracet data  podle kterých bylo naposled vyhledáno. Volá si jí Tomáš t gridu
//        getConfirmedData: function (isPromiseMode) {
//            if (isPromiseMode) {
//                var defer = $.Deferred();
//                this._startFindFromFavoriteBut(defer);
//                return defer.promise();

//            } else {
//                return this.confirmedData;
            
//            }
//        },
//        //nacteni uzivatelského nastavení
//        _nactiUzivatelskeNastaveni: function () {

//            if (this.gStore) {
               
//                var poVyhledaniZavritPanelPodminek = this.gStore.get("poVyhledaniZavritPanelPodminek", true);  // pokud v gstore nicneni tak použiju defaultní hosnoty
//                if (poVyhledaniZavritPanelPodminek !== null && poVyhledaniZavritPanelPodminek !== undefined) {
//                    this.options.poVyhledaniZavritPanelPodminek = poVyhledaniZavritPanelPodminek;
//                }
//                var poOtevreniOtevritPanelPodminek = this.gStore.get("poOtevreniOtevritPanelPodminek", true);  // pokud v gstore nicneni tak použiju defaultní hosnoty
//                if (poOtevreniOtevritPanelPodminek !== null && poOtevreniOtevritPanelPodminek !== undefined) {
//                    this.options.poOtevreniOtevritPanelPodminek = poOtevreniOtevritPanelPodminek;
//                }
//            }
//        },
//        // uložení zaškrtávátek z nastavení
//        _ulozUzivatelskeNastaveni: function (model) {


//            if (this.gStore && model) {
//                if (model.poVyhledaniZavritPanelPodminek !== null && model.poVyhledaniZavritPanelPodminek !== undefined) {
//                    this.gStore.set("poVyhledaniZavritPanelPodminek", model.poVyhledaniZavritPanelPodminek); 
//                    this.options.poVyhledaniZavritPanelPodminek = model.poVyhledaniZavritPanelPodminek;
//                }
//                if (model.poOtevreniOtevritPanelPodminek !== null && model.poOtevreniOtevritPanelPodminek !== undefined) {
//                    this.gStore.set("poOtevreniOtevritPanelPodminek", model.poOtevreniOtevritPanelPodminek);
//                    this.options.poOtevreniOtevritPanelPodminek = model.poOtevreniOtevritPanelPodminek;
//                }
//            }
//        },
//        //  funkce pro úpravu  primary stavu na vyhledávacím tlačítku 
//        _uppravPrimaryNaButton: function (nastavit) {
//            if (!this.options.simpleMode) { 
               
//                var mainGbutton = this.element.find(".js-mainVyhledatMainRow");
//                if (mainGbutton && mainGbutton.length > 0) { 
//                    var mainBut = mainGbutton.find("button");
//                    var hasClass = mainBut.hasClass("g-button--primary");
//                    if (hasClass && (nastavit === false)) {
//                        mainBut.removeClass("g-button--primary");
//                    } else if (!hasClass && (nastavit === true)) {
//                        mainBut.addClass("g-button--primary");
//                    }
//                }
               

//                this.favoriteButPrimary = nastavit;
//                var favBut = this.element.find(".js-butVyhledat");
//                if (favBut != null && (favBut.length > 0)) {
//                    var favoriteBut = favBut;
//                    var favoriteHasClass = favoriteBut.hasClass("g-button--primary");
//                    if (favoriteHasClass && (nastavit === false)) {
//                        favoriteBut.removeClass("g-button--primary");
//                    } else if (!favoriteHasClass && (nastavit === true)) {
//                        favoriteBut.addClass("g-button--primary");
//                    }
//                }
//            }
//        }

//    });
//})(jQuery);


(function ($) {
    "use strict";
    var that = null;
    var create = function (options) {
        /// <summary>
        /// základní funkce pro vytvoření operátorů do políčka
        /// </summary>
        /// <param name="options" type="type">
        /// &#10;defaultOperator: ""    //  (string)  operátor který se nastaví na počátku ¨jako default při nevyplněných hoédnotách
        /// &#10;operators: []          //  ([string]) pole defaultních operátoru které chcete použít 
        /// &#10;userOperators: ""      //  ([{operator:x, icon:x, caption:x, tooltip:x}]) pole objectu s vlastnímy operátory
        /// </param>
        /// <returns type=""></returns>
        that = this;
        var defOptions = {
            defaultOperator: "=",   // defaultní operator který se zároveň nastaví na static button
            operators: [],    // definice ktere defaultní operatory použít(pole stringu operatoru)
            userOperators: []   // pole kompletních objektu ({icon, operator ,tooltip, caption})
        
        };

        this.options = $.extend({}, defOptions, options); // vytvořím options

        var operators = _selectOperators(this.options.operators, this.options.userOperators); // vytvořím použíté pole operátoru

        return _createPrefab(this.options.defaultOperator, operators);  // vytvořím a vrátím prefab
    };
    // poskládám kolekci použitých operátorů
    var _selectOperators = function (operators, userOperators) {
        
        var operatorsSelected = jQuery.grep(defaultOperators, function (value) {
            var use = false;
            $(operators).each(function (index, element) {
                if (value.factor === element && use === false) { // pokud narazím na první shodu už nevstupuji
                    use = true;
                }
            });
            return use;
        });
        return operatorsSelected.concat(userOperators);
    };
    // vytvoří prefab
    var _createPrefab = function (defaultOperator, operators) {
        var prefabCisla = {
            factors: operators,
            factor: defaultOperator,
            factorOptions: { iconsOnly: true },
            modelOptions: { setFlags: { noChange: true } },
            modelValueTransform: {
                apply: function (modelValue) {
                    var val = modelValue;
                    if (modelValue) {
                        if (typeof modelValue === "object" && modelValue.v !== undefined) {
                            var objVal = _tryParseOperatorVal(modelValue, $(this).gfield("option", "factors"));
                            if (objVal.operator) {
                                $(this).gfield("setFactor", objVal.operator);
                                val = objVal.value;
                            }
                        }
                    }
                    return val;
                },
                collect: function (fieldValue) {
                    var val = null; // celkova hodnota
                    var hasValue = $(this).gfield("hasValue");

                    var operator = $(this).gfield("option", "factor");
                    if (operator && hasValue) {
                        val = { o: operator, v: fieldValue };
                    } else {
                        val = fieldValue;
                    }
                    return val;
                }
            }
        };

        return prefabCisla;

    };

    // defaultní operátory
    var defaultOperators = [
        { icon: "&#37;", factor: "CONTAINS", caption: "jres:31969024" },//% //RC 31969024 : Obsahuje
        { icon: "&#61;", factor: "=", caption: "jres:31969025" },                     //= //RC 31969025 : Je rovno
        { icon: "&#62;", factor: ">", caption: "jres:31969026" }, //> //RC 31969026 : Je větší než
        { icon: "&#8805;", factor: ">=", caption: "jres:31969027" }, //≥ //RC 31969027 : Je větší nebo rovno
        { icon: "&#60;", factor: "<", caption: "jres:31969028" },               //< //RC 31969028 : Je menší než
        { icon: "&#8804;", factor: "<=", caption: "jres:31969029" }, //≤ //RC 31969029 : Je menší nebo rovno
        { icon: "&#8963;", factor: "LIKE", caption: "jres:31969030" },                  //    &#8743; &#8963; //RC 31969030 : Začíná na
        { icon: "&#8800;", factor: "!=", caption: "jres:31969031" }                    //≠ //RC 31969031 : Nerovná se
    ];
    // zkusí naparsovat operátor z příchozí hodnoty
    var _tryParseOperatorVal = function (val, operators) {
        var factor = null;
        if (val.o === undefined) { val.o = "="; } // alik rovná¨se vypouští

        $(operators).each(function (index, element) {
            if (val.o === element.factor) {
                factor = element.factor;
            }
        });
        return { operator: factor, value: val.v };
    };



    namespace("Gordic.Prefabs.Number", {

        // prefab operatoru pro numberboxy
        withOperators: function (options) {
            /// <summary>
            /// prefab operátoru number boxu
            /// </summary>
            /// <param name="options" type="type"> 
            /// &#10;label: ""              //  (string)  label řádku 
            /// &#10;name: []               //  (string)  name řádku, použije se i jako name filedu s příponou start / end
            /// &#10;typ: ""                //  (string)  typ políčka
            /// &#10;pathInModel: ""        //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"}) 
            /// </param>
            /// <returns type=""></returns>
            var defOptions = {
                operators: ["=", ">", ">=", "<", "<=", "!="],
                defaultOperator: "="
            };
            var finalOptions = $.extend({}, defOptions, options);
            return create.call(this, finalOptions);
        }
    });
    
    namespace("Gordic.Prefabs.Date", {
        // prefab operatoru pro dateboxy
        withOperators: function (options) {
            /// <summary>
            /// prefab operátoru number boxu
            /// </summary>
            /// <param name="options" type="type"> 
            /// &#10;defaultOperator: ""    //  (string)  operátor který se nastaví na počátku ¨jako default při nevyplněných hoédnotách
            /// &#10;operators: []          //  ([string]) pole defaultních operátoru které chcete použít 
            /// &#10;userOperators: ""      //  ([{operator:x, icon:x, caption:x, tooltip:x}]) pole objectu s vlastnímy operátory
            /// </param>
            /// <returns type=""></returns>
            var defOptions = {
                operators: ["=", ">", ">=", "<", "<=", "!="],
                defaultOperator: "="
            };
            var finalOptions = $.extend({}, defOptions, options);
            return create.call(this, finalOptions);
        }
    });
    namespace("Gordic.Prefabs.String", {
        // prefab operatoru pro stringboxy
        withOperators: function (options) {
            /// <summary>
            /// prefab operátoru number boxu
            /// </summary>
            /// <param name="options" type="type"> 
            /// &#10;defaultOperator: ""    //  (string)  operátor který se nastaví na počátku ¨jako default při nevyplněných hoédnotách
            /// &#10;operators: []          //  ([string]) pole defaultních operátoru které chcete použít 
            /// &#10;userOperators: ""      //  ([{operator:x, icon:x, caption:x, tooltip:x}]) pole objectu s vlastnímy operátory
            /// </param>
            /// <returns type=""></returns>
            var defOptions = {
                operators: ["CONTAINS", "LIKE"],
                defaultOperator: "LIKE"
            };
            var finalOptions = $.extend({}, defOptions, options);
            return create.call(this, finalOptions);
        }
        
    });


    //uložiště pro defaultní filtr
    namespace("Gordic.Gin.FilterStorageService.StoreDefault", {
        // ukládání defaultu
        saveDefault: function (gStore, filter, ixsFunAkt) {
            if (filter && filter.ixs_mas && Gordic.Gin.FilterStorageService.StoreDefault.removeIfSameIxsMas(gStore, filter.ixs_mas, ixsFunAkt)) {
                return {stav:"smazan"};
            } else if (Gordic.Gin.FilterStorageService.StoreDefault.removeIfSameObjectOrEmpty(gStore, filter, ixsFunAkt)) {
                return { stav: "smazan" };
            } else if (filter) {
                gStore.set("DefaultFilter" + ixsFunAkt, filter);
               // gStore.save();
                return { stav: "ulozen" };
            }else{
                return { stav: "neulozen" };
            }
                
        },
        saveIfSameIxsMas: function (gStore, filter, ixsFunAkt) {
            var ret = gStore.get("DefaultFilter" + ixsFunAkt, true) || null;
            if (ret && filter && filter.ixs_mas && ret.ixs_mas === filter.ixs_mas) {
                gStore.set("DefaultFilter" + ixsFunAkt, filter);
               // gStore.save();
            }
        },
        getDefault: function (gStore, ixsFunAkt) {
            var ret = gStore.get("DefaultFilter" + ixsFunAkt, true) || null;
            return ret;
        },
        removeIfSameIxsMas: function (gStore, ixs_mas, ixsFunAkt) {
            if (ixs_mas && gStore) {
                var ret = gStore.get("DefaultFilter" + ixsFunAkt, true) || null;
                if (ret && ret.ixs_mas === ixs_mas) {
                    gStore.set("DefaultFilter" + ixsFunAkt, null);
                  //  gStore.save();
                    return true;
                }
            }
            return false;
        },
        removeIfSameObjectOrEmpty: function (gStore, filter, ixsFunAkt) {
            if (gStore) {
          
              
                var ret = gStore.get("DefaultFilter" + ixsFunAkt, true) || null;
                // pokud je null
                if (ret && (filter == null)) {
                    gStore.set("DefaultFilter" + ixsFunAkt, null);
                    return true;
                }
                // pokud je stejny
                if (ret && JSON.stringify(ret) === JSON.stringify(filter)) {
                    gStore.set("DefaultFilter" + ixsFunAkt, null);
              
                    return true;
                }
            }
            return false;
        }
    });

    // univerzální storage pro ukládání předvolených filtrů
    namespace("Gordic.Gin.FilterStorageService.Store", CreateClass({

        _constructor: function (options) {
            if (options) {
                if (options.tema) {
                    this.tema = options.tema;
                }

                if (options.parentContent) {
                    this.parentContent = options.parentContent;
                }
            }

            // 18.01.2024 - TFeik
            // Vytvoření GFilterStorageService přesunuto až na okamžik, kdy je potřeba.
            //// 16.01.2024 - TFeik
            //// Navázání GFilterStorageService na parent content.
            //if (options && options.parentContent) {
            //    this.srv = options.parentContent.createServiceContent("Gordic.Gin.WebClient.GFilterStorageService");
            //}
            //else {
            //    this.srv = new GContent({ className: "Gordic.Gin.WebClient.GFilterStorageService" });  //sluzba pro pristup k datum na serveru + predani parametru , params: { MyFoo: "abc" }
            //}
        },

        getStorageService: function () {
            if (!this.srv || this.srv.closed) {
                // 16.01.2024 - TFeik
                // Navázání GFilterStorageService na parent content.
                if (this.parentContent) {
                    this.srv = this.parentContent.createServiceContent("Gordic.Gin.WebClient.GFilterStorageService");
                }
                else {
                    this.srv = new GContent({ className: "Gordic.Gin.WebClient.GFilterStorageService" });  //sluzba pro pristup k datum na serveru + predani parametru , params: { MyFoo: "abc" }
                }
            }

            return this.srv;
        },

        getFilters: function (parametry) {
            if (this.tema) {
                parametry.tema = this.tema;
            }

            //return this.srv.call("GetFilters", { parametry: parametry });
            return this.getStorageService().call("GetFilters", { parametry: parametry });
        },

        saveFilter: function (obj) {
            var that = this;
            if (this.tema) {
                obj.filter.tema = this.tema;
            }
            var ixs_mas = obj.filter.ixs_mas;
            var defer = $.Deferred();

            //this.srv.call("SetFilter", { filter: obj.filter })
            this.getStorageService().call("SetFilter", { filter: obj.filter })
                .then(function (res) {
                    if (res.ixs_mas === ixs_mas) {
                        that.srv.call("GetFilters", { parametry: obj.filter })
                            .then(function (allRes) {
                                defer.resolve(res, allRes);
                            });
                    } else {
                        defer.resolve(res);
                    }
                });

            return defer.promise();
            //return this.srv.call("SetFilter", { filter: obj.filter })
        },

        removeFilter: function (obj) {
            if (this.tema) {
                obj.filter.tema = this.tema;
            }

            //return this.srv.call("RemoveFilter", { filter: obj.filter });
            return this.getStorageService().call("RemoveFilter", { filter: obj.filter });
        },

        setParentContentIfNull: function (parentContent) {
            if (this.parentContent) {
                return;
            }

            this.parentContent = parentContent;
        }
    }));

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\ggrid.editors.js 

/* GORDIC jQuery knihovna */
$(document).ready(function () {

});


(function ($) {
    "use strict";

    /* ======================================================= 
     * GGrid - Editor abstract
     * ======================================================= 
     *
     * Zakladni predek pro grid editor 
     * 
     */

    $.widget("gordic.ggridabstracteditor", {
        options: {
            useDefaultExecute: true, 
            allowCopy: false,
            copySource: function () {
                var mark = $(this).ggrid("mark"); // oznaceny radek
                if (mark) return mark.data;

                mark = $(this).ggrid("cellInfo", $(this).find(".editing"));
                if (mark && mark.row > 0) return $(this).ggrid("getView").getRows(true, mark.row - 1, 1)[0].data; 

                return null; 
            },
            validators: null
        },
        _create: function () {
            if (this.widgetFullName == "gordic-ggridabstracteditor") throw new Error("CRITICAL ERROR: Widget '" + this.widgetFullName + "' je abstract. Vytvorte nektereho z potomku.");
            if (!this.element.is(".ggrid")) throw new Error("CRITICAL ERROR: Widget '" + this.widgetFullName + "' musí být na elementu, na němž byl inicializován ggrid.");

            var _this = this; 
            this._superApply(arguments);
            this._editorOptionName = this._editorOptionName || "editor"; 

            this.element
                .on({ 
                    "griddefaultexecute.ggridabstracteditor": function (ev, obj) {
                        if (ev.isDefaultPrevented()) return;
                        if (_this.options.useDefaultExecute === true && _this.start(obj.cellInfo) !== false)
                            ev.preventDefault();

                    },
                    "gridinternalbeforerefresh.ggridabstracteditor": function (ev, obj) {  // refresh gridu stejne vyresetuje vsechen obsah natvrdo
                        if (ev.isDefaultPrevented()) return;
                        _this.stop(false); 

                    }
                });
            this.element.find(".viewport").on({
                "focusin.ggridabstracteditor": function (e) { $(e.target).closest(".gfield").addClass("gfield-focus"); },
                "focusout.ggridabstracteditor": function (e) { $(e.target).closest(".gfield").removeClass("gfield-focus"); },
            }, ".cell.editing")
            .gshortcut({
                key: "*",
                id: "ggridabstracteditor*",
                group: Gordic.Shortcuts.Groups.Field,
                description: "jres:25030699", //RC 25030699 : Kopírovat z předchozího/označeného řádku
                canExecute: function (ev) {
                    if (_this.options.allowCopy !== true) return { visible: false, active: false }; 
                    var cell = $(ev.target).closest(".cell.editing")[0];
                    var ci = _this.element.ggrid("cellInfo", cell);
                    var source = _this.options.copySource && _this.options.copySource.call(_this.element[0], ci);
                    return {
                        visible: $(ev.target).closest(".cell.editing").length > 0,
                        active: !!source,
                    };
                },
                run: function (ev, ctx) {
                    var cell = $(ev.target).closest(".cell.editing")[0];
                    var ci = _this.element.ggrid("cellInfo", cell);
                    var source = _this.options.copySource.call(_this.element[0], ci);
                    if (source) {
                        var editor = $(cell).data("editor");
                        if ($(cell).trigger("editorcopy", [{ cellInfo: ci, editor: editor, source: source }]) === false) return;
                      if(editor)
                        editor.apply(source, true);
                    }
                },
            });

            this.actions = new GActionList(); 
        },
        _destroy: function () {
            this.element.off(".ggridabstracteditor");
            this._superApply(arguments);
        },

        _createCellEditor: function (ci) {
            // BOHOUS pouziva pro ggridserverfilter na gridu a posila umele cellInfo (cellDOM, column, data), 
            // je potreba informovat, pokud vznikne zavislost na dalsi promenne
            var _this = this;
            var cell = $(ci.cellDOM);


            var editor = null; 
            var editorCtx = { cellInfo: ci };
            var opts = $.isFunction(ci.column[this._editorOptionName]) ? ci.column[this._editorOptionName].call(this.element[0], editorCtx) : ci.column[this._editorOptionName];

            if (opts != null) {
                cell.addClass("editing")
                    .empty();

                var editor = (opts instanceof Gordic.Components.Grid.Editors.Basic ? opts :
                    opts.type ? new Gordic.Components.Grid.Editors[opts.type.capitalize()](editorCtx, opts) :
                        opts.widget && $.gordic[opts.widget] && $.gordic[opts.widget].prototype._isField === true ? new Gordic.Components.Grid.Editors.Field(editorCtx, opts) :
                            opts.widget ? new Gordic.Components.Grid.Editors.Widget(editorCtx, opts) :
                                $.isPlainObject(opts) ? new Gordic.Components.Grid.Editors.Basic(editorCtx, opts) :
                                    null);
                if (!editor) throw new Error("Sloupec '" + ci.column.name + "' má zadán neznámý typ editoru.")
                $.data(ci.cellDOM, "editor", editor) 
            }
            //cell.trigger("editorcreate", [{ cellInfo: ci, editor: editor }])
            return editor;
        },
        _destroyCellEditor: function (cell, collect) {
            var editor = cell.data("editor");
            if (collect === true) editor.collect();
            cell.trigger("editordestroy", [{ cellInfo: this.element.ggrid("cellInfo", cell, true), editor: editor }])
            editor.destroy();

            cell.data("editor", null).removeClass("editing");
        },
        start: function (coords) {
            return false; 
        },
        stop: function (collect) {
            return false; 
        },
    });

    /* ======================================================= 
     * GGridRowEditor 
     * ======================================================= 
     *
     * Zakladni radkovy editor. Obsahuje zakladni formularove prvky jako jsou validace, cekani na async hodnoty, hlidani zmen, asynchronni ulozeni dat, apod.  
     * 
     */
    $.widget("gordic.ggridroweditor", $.gordic.ggridabstracteditor, {
        options: {
            rowBar: ["actCommit", "actCancel"],
            save: $.noop,
            defaultData: null,

            beforeStart: null,   // stoppable
            start: null,
            beforeCommit: null,  // stoppable 
            beforeCancel: null,  // stoppable
            beforeStop: null,    // stoppable
            stop: null,
            change: null,
            commit: null,
            cancel: null,
        },
        _create: function () {
            var _this = this;

            this._superApply(arguments);

            this.element.addClass("ggridroweditor")
                .on({
                 /*   "keydown.ggridroweditor": function (ev) {
                        if (ev.isDefaultPrevented()) return;

                        if (ev.which === $.ui.keyCode.ESCAPE && _this.element.find(".row.editing").length) {
                            _this._tryToCancelRow();  // ukonceni editace
                            ev.preventDefault();
                        }
                    },*/
                    "gridmark.ggridroweditor": function (ev, obj) { if ($(obj.cellInfo.rowDOM).is(".editing")) ev.preventDefault(); },
                    "gridinternalmenu.ggridroweditor": function (ev, obj) {
                        obj.menuParams.unshift({
                            type: "action",
                            action: _this.actions.add({
                                name: "actEditor",
                                icon: "fa-pencil",
                                caption: "jres:25030555", //RC 25030555 : Editor
                                captionVisible: "never",
                                run: function () { _this.start(); }
                            }),
                            align: "opposite",
                        });
                    },
                })
                .find(".viewport").css("min-height", "4rem"); // garance, ze se sem vejdou ovladaci tlacitka; pozdeji pridame do menu
            this.element.ggrid("instance")._initTopBar(); // refresh TopBaru

            // inicializace vlastniho menu 
            this.actions.addRange({
                actCommit: { caption: "jres:25030443", customClass: "g-button--primary smartnav-autoclick", run: function () { _this._tryToCommitRow(); } }, //RC 25030443 : Ok
                actCancel: { caption: "jres:25030164", run: function () { _this._tryToCancelRow(); } } //RC 25030164 : Zrušit
            });
            this._ESCShortcut = {
                key: "escape",
                group: Gordic.Shortcuts.Groups.Field,
                description: "jres:25030698", //RC 25030698 : Zrušení editace
                canExecute: function (ev) {
                    return _this.element.find(".row.editing").length > 0;
                },
                action: this.actions.actCancel
            };
            this._ConfirmShortcut = {
                key: "ctrl+enter",
                group: Gordic.Shortcuts.Groups.Field,
                description: "jres:25030700", //RC 25030700 : Potvrzení editace
                canExecute: function (ev) {
                    return _this.element.find(".row.editing").length > 0;
                },
                action: this.actions.actCommit,
            };

        },
        _destroy: function () {
            this.element.removeClass("ggridroweditor").off(".ggridroweditor");
            this._superApply(arguments);
        },

        start: function (coords) {
            var _this = this;

            if (this.options.disabled === true) return false;
            if (!coords) coords = this.element.ggrid("activeCellAddress"); // pokud neni uvedeno explicitne, editujeme prave vybrany radek
            if (!coords) return false;
            if (!coords.rowDOM) coords = this.element.ggrid("activeCellAddress", coords);  // pripadny scroll, render, apod.
            var row = $(coords.rowDOM);

            if (row.length) {
                var editing = row.parent().children(".row.editing");
                if (row.is(".editing")) { row.find(".cell.editing").data("editor").focus(); return true; } // pokracovani v radkove editaci
                else if (editing.length === 0) return this._startRowEditor(coords);
                else editing.addClass("flash", 100).delay(100).removeClass("flash", 100).delay(100).addClass("flash", 100).delay(100).removeClass("flash", 100);
                /*this._tryToRejectRow().done(function () { _this._startRowEditor(_this.uiRows.children(".row[data-row-index=" + coords.row + "]"), coords.col); });
                return true; */   // asi lepsi nezapinat. tryReject muze zmenit pocet a indexy radku, mohli bychom skoncit v editaci neceho co nechceme
            }

            return false; 
        },
        stop: function (collect) {
            this._stopRowEditor(collect);
        },
        _startRowEditor: function (cellInfo) {
            var _this = this;
            var row = $(cellInfo.rowDOM)
            if (!row.hasClass("ui-disabled") && !cellInfo.meta._isVirtual) {
                var tc = this.element.ggrid("trueColumns");
                var preferred = null;
                if (!this._trigger("beforeStart", null, { cellInfo: cellInfo, view: this.element.ggrid("getView") })) return false;

                for (var i = 0; i < tc.length; i++) {
                    var ci = this.element.ggrid("cellInfo", cellInfo.row, i, true);
                    var cell = $(ci.cellDOM);
                    var editor = null; 
                    if (tc[i].editor) {
                        editor = this._createCellEditor(ci);
                        preferred = cellInfo.col === i && editor ? editor : (preferred || editor); // prvni nebo preferovany
                    }
                    if (!editor && !cell.is(".ui-disabled")) cell.addClass("ui-disabled forced-disable");  // vizualni zakazani vsech needitovatelnych bunek
                    Gordic.Forms._linkDependencies(row); // pripadne doplneni dependency   
                }
                if (preferred) preferred.focus();
                else {
                    row.find(".forced-disable").removeClass("ui-disabled forced-disable");
                    return false;  // nenalezena zadna bunka k editaci
                }

                row.addClass("editing persistent-edit smartnav-scope")
                    .gshortcut(this._ESCShortcut)
                    .gshortcut(this._ConfirmShortcut);

                // ovladac 
                if (this.options.rowBar) {
                    var rowPanel = $("<div class='confirm-panel statusbar'>")
                        .gdomcontext({ cellInfo: cellInfo })
                        .gbuttonpanel({ disableItemHide: true, params: this.actions.createBar(this.options.rowBar) });
                    this.element.ggrid("instance")._rowPanel(row, rowPanel); // internal call
                }

                if (this.options.validators)  // tohle tu nema byt; tohle nema co vedet o fieldech; muzou tam byt i jine typy editoru; pravne maji tento radek psat lidi ve start evente, stejne jako vsechny akce ktere se maji spustit po zacatku editace
                    row.findFields().gfield("model", "validators", this.options.validators);

                this._trigger("start", null, { cellInfo: cellInfo, view: this.element.ggrid("getView") });

                return true;
            }
            return false;
        },
        _stopRowEditor: function (collect, force) {
            var _this = this;

            var row = this.element.find(".row.editing");
            if (row.length) {
                var ci = this.element.ggrid("cellInfo", row, true);
                var view = this.element.ggrid("getView");

                if (!this._trigger("beforeStop", null, { cellInfo: ci, view: view, collect: collect }) && force !== true) return false;

                this.element.find(".cell.editing").each(function () { _this._destroyCellEditor($(this), collect); });

                //this._rowEditing = null; 
                var r = row.find(".editing").addBack().removeClass("editing persistent-edit smartnav-scope");
                r.gshortcut("remove", this._ESCShortcut.key);
                r.gshortcut("remove", this._ConfirmShortcut.key);
                row.find(".forced-disable").removeClass("ui-disabled forced-disable");
                this.element.ggrid("instance")._rowPanel(row, null); // internal call
                this._trigger("stop", null, { cellInfo: ci, view: view, collect: collect });

                if (view.processors.gridEditorEmptyRow) view.process({ gridEditorEmptyRow: null });    // refresh celeho gridu, protoze se meni pocet radku (pokud je potreba a nebyl proveden uz v Commit nebo jinde)
                else this.element.ggrid("refreshRow", ci).ggrid("refreshRows", true); //refreshRows - odstrani "persistent" pokud by jiz nemel byt videt
                this.element.ggrid("focus");
                if (collect)
                    this._trigger("change", null, { cellInfo: ci, view: view });

                return true;
            }
            return false;
        },
        _newRow: function (index, defaultData) {
            var view = this.element.ggrid("getView");
            var ni = defaultData || ($.isFunction(this.options.defaultData) ? this.options.defaultData.call(this.element[0], view) : $.extend({}, this.options.defaultData));
            if (ni) {
                view.process({
                    gridEditorEmptyRow: new Gordic.Data._ObsoletePostProcessor(function (list, wrap) {
                        if (!this._meta) {
                            this._meta = wrap(ni)[0];
                            this._meta._newRow = true;
                        }
                        if (index == null) list.push(this._meta);
                        else list.splice(index, 0, this._meta);
                    })
                });

                return ni;
            }
        },
        addRow: function (defaultData) { this.insertRow(null, defaultData); },
        insertRow: function (index, defaultData) {
            var _this = this; 
            var doIt = function () {
                var ni = _this._newRow(index, defaultData);
                if (ni) {
                    _this.element.ggrid("activeRow", ni);
                    _this.start();
                }
            }

            if (this.getActiveRow !== null)
                this._tryToCommitRow().done(doIt);
            else doIt();
        },
        _tryToCommitRow: function () { // adept na behavior
            var _this = this;

            var row = this.element.find(".row.editing");
            if (row.length) {
                var ci = this.element.ggrid("cellInfo", row, true);
                var p = row.gform("waitForValues")
                    .then(function () {
                        if (!_this._trigger("beforeCommit", null, { cellInfo: ci, view: _this.element.ggrid("getView") })) return $.Deferred().reject().promise();
                        if (!row.gform("isValid")) return $.Deferred().reject();
                        var tempData = $.extend(true, {}, ci.data);
                        row.find(".cell.editing").each(function () { $(this).data("editor").collect(tempData); });
                        var fixedData = _this.options.save.call(_this.element[0], tempData, { cellInfo: ci, view: _this.element.ggrid("getView") });
                        return (fixedData === undefined ? tempData : fixedData);
                    }).done(function (fixedData) {
                        if ($.isPlainObject(fixedData)) {
                            var view = _this.element.ggrid("getView");

                            if (ci.meta._newRow === true) {
                                view.process({
                                    gridEditorEmptyRow: null,
                                    gridEditorModif: new Gordic.Data.MergeProcessor({ add: [fixedData] })
                                });
                                //view.updateData([fixedData], "add");
                                //                                ci.meta = view.verify(fixedData, true);  // nastavuje aktualni instanci dat pro pripad, ze se bude pokracovat v editaci;take schazuje newRow priznak
                            } else {
                                ci.meta.data = fixedData;
                                view.updateData([ci.meta], "refresh");
                            }

                            if (_this._stopRowEditor(false, ci.meta._newRow === true) === false) return;  // pro nove radky, zvlast po ulozeni a pridani do dat, vynutime ukonceni editoru (ponechat ho znamena, ze opetovne ok vlozi znovu novy radek + problemy s novym radkem v datech na stejnem indexu jako persistentni editor)

                            _this.element.ggrid("activeRow", fixedData);
                            ci = _this.element.ggrid("activeCellAddress"); // u noveho radku je rozpor co posilat za parametr. Puvodni instance jiz od StopEditor nemusi existovat a nove vlozeny radek nemusi byt v gridu videt (activeRow setne null) 
                            _this._trigger("change", null, { cellInfo: ci, view: view });
                            _this._trigger("commit", null, { cellInfo: ci, view: view });
                        }
                    });

                this.actions.actCommit.setPending(p);
                return p;
            }
            return $.Deferred().resolve().promise(); // zajisteny typ vystupu
        },
        _tryToCancelRow: function () {
            var _this = this;

            var row = this.element.find(".row.editing");
            if (row.length) {
                var ci = this.element.ggrid("cellInfo", row, true);
                var view = this.element.ggrid("getView");
                if (!this._trigger("beforeCancel", null, { cellInfo: ci, view: view })) return $.Deferred().reject().promise();
                if (row.gform("hasChanged"))
                    return $.content(row).dialogs
                        .messageBox("", "jres:25030601", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25030601 : Byly provedeny změny.;; Opravdu chcete ukončit úpravy bez uložení?
                        .createDialogPromise("yes")
                        .then(function () {
                            //if (ci.meta._newRow === true)  // musime vymazat virtualni radek
                            //view.
                            if (_this._stopRowEditor(false) === false) return;
                            _this._trigger("cancel", null, { cellInfo: ci, view: view });
                        });
                else {
                    if (_this._stopRowEditor(false) === false) return;
                    this._trigger("cancel", null, { cellInfo: ci, view: view });
                }
            }
            return $.Deferred().resolve().promise(); // zajisteny typ vystupu
        },
        getActiveRow: function () {
            return this.element.ggrid("cellInfo", this.element.find(".row.editing"), true);  // vrati null, kdy nenajde
        },
        commit: function () {
            return this._tryToCommitRow();
        },
        cancel: function () {
            return this._tryToCancelRow();
        },
    });

    /* ======================================================= 
     * GGridCellEditor 
     * ======================================================= 
     *
     * Zakladni bunkovy editor. Podpora pro editaci dat pomoci Excel-like editoru. Kazda bunka je izolovana a spojuji se pouze na urovni dat. Podpora pro ruzne rezimy pohybu.   
     * 
     */
    $.widget("gordic.ggridcelleditor", $.gordic.ggridabstracteditor, {
        options: {
            moveDirection: "right",
            autoEdit: true, 

            beforeStart: null,      // stoppable
            start: null, 
            beforeStop: null,
            stop: null,

            change: null,
        },
        _create: function () {
            var _this = this;
            this._superApply(arguments);

            this.autoStart = this.options.autoEdit; // default

            this.element.addClass("ggridcelleditor")
                .on({
                    "mousedown.ggridcelleditor": function (ev) {
                        if (ev.isDefaultPrevented()) return;
                        if ($(ev.target).closest(".cell.editing").length === 0) _this.autoStart = _this.options.autoEdit;
                    },
                    "gridcellactivate.ggridcelleditor": function (ev, obj) {
                        if (!obj.cellInfo.cellDOM || !obj.cellInfo.cellDOM.classList.contains("editing")) {
                            _this._stopCellEditor(true);
                            var ci = _this.element.ggrid("cellInfo", obj.cellInfo, true);  // muze se stat, ze stopCellEditor prerenderuje radek a instance cell zmizi
                            if (ci && ci.cellDOM && _this.autoStart === true) _this._startCellEditor($(ci.cellDOM));
                        }
                    },
                    "keydown.ggridcelleditor": function (ev) {
                        if (ev.isDefaultPrevented()) return;

                        if (ev.which === $.ui.keyCode.ESCAPE) { 
                            var cell = $(ev.target).closest(".cell.editing"); 
                            if (cell.length) {
                                _this._stopCellEditor(false);
                                _this.autoStart = false;
                                cell.attr("tabindex", 0).focus(); 
                                ev.preventDefault();
                            }
                        }
                    },
                    "gridmark.ggridcelleditor": function (ev, obj) { if ($(obj.cellInfo.rowDOM).find(".editing").length) ev.preventDefault(); },
                    "gridinternalmenu.ggridroweditor": function (ev, obj) {
                        obj.menuParams.unshift({
                            type: "action",
                            action: _this.actions.add({
                                name: "actEditor",
                                icon: "fa-pencil",
                                caption: "jres:25030555", //RC 25030555 : Editor
                                captionVisible: "never",
                                run: function () { _this.start(); }
                            }),
                            align: "opposite",
                        });
                    },
                });
            this.element.ggrid("instance")._initTopBar(); // refresh TopBaru
        },
        _destroy: function () {
            this.element.removeClass("ggridcelleditor").off(".ggridcelleditor");
            this._superApply(arguments);
        },

        start: function (coords) {
            if (this.options.disabled === true) return false;
            if (!coords) coords = this.element.ggrid("activeCellAddress"); // pokud neni uvedeno explicitne, editujeme prave vybrany radek
            if (!coords) return false; 
            if (!coords.cellDOM) coords = this.element.ggrid("activeCellAddress", coords);  // pripadny scroll, render, apod.
            var cell = $(coords.cellDOM);

            if (cell.length && !cell.hasClass("editing")) 
                return this._startCellEditor(cell) && (this.autoStart = true);

            return false; 
        },
        stop: function (collect) {
            this._stopCellEditor(collect);
        },
        _startCellEditor: function (cell) {
            var _this = this;
            if (cell.is(".editing")) return true; 

            var ci = this.element.ggrid("cellInfo", cell);
            if (!cell.hasClass("ui-disabled") && !cell.parent(".ui-disabled").length && !ci.meta._isVirtual && ci.column.editor) {
                if (!this._trigger("beforeStart", null, { cellInfo: ci, view: this.element.ggrid("getView") })) return false;

                var editor = this._createCellEditor(ci);
                if (editor) {
                    cell.on("fieldchange.ggridcelleditor", function (ev, obj) { editor.collect(); });
                    editor.focus();

                    var di = "<input type='button' class='focusdummy " + ci.column.virtualCssClass + "'>";
                    $(di).insertBefore(cell).focus(function (ev) { _this._moveCellEditor(ci, -1); });
                    $(di).insertAfter(cell).focus(function (ev) { _this._moveCellEditor(ci, 1); });

                    if (this.options.validators)  // tohle tu nema byt; tohle nema co vedet o fieldech; muzou tam byt i jine typy editoru; pravne maji tento radek psat lidi ve start evente, stejne jako vsechny akce ktere se maji spustit po zacatku editace
                        row.findFields().gfield("model", "validators", this.options.validators);

                    this._trigger("start", null, { cellInfo: ci, view: this.element.ggrid("getView") });
                    return true;
                }
            }

            return false; 
        },
        _stopCellEditor: function (collect) { // !!! pro true muze refreshnout rows a znici instance cellDOM !!!
            var cell = this.element.find(".cell.editing");
            if (cell.length) {
                var ci = this.element.ggrid("cellInfo", cell);
                var changed = cell.gform("hasChanged");
                this._trigger("beforeStop", null, { cellInfo: ci, view: this.element.ggrid("getView"), collect: collect, changed: changed });
                cell.siblings(".focusdummy").remove();

                cell.off(".ggridcelleditor");
                this._destroyCellEditor(cell, collect);

                this._trigger("stop", null, { cellInfo: ci, view: this.element.ggrid("getView") });
                var view = this.element.ggrid("getView");
                if (collect && changed) {
                    view.updateData(ci.meta, "refresh");
                    if (!$.contains(this.element[0], ci.cellDOM)) { ci.cellDOM = null; ci.rowDOM = null; }  // updateData muze zavolat refresh a zmenit instance 
                } else
                    this.element.ggrid("refreshRow", ci);

            //    this.element.ggrid("refreshRow", ci);
                if (collect && changed) this._trigger("change", null, { cellInfo: ci, view: this.element.ggrid("getView") });
            }
        },
        _findEditableCell: function (row, start, direction, autoStart) { 
            var tc = this.element.ggrid("trueColumns");
            if (start === null) start = direction > 0 ? -1 : tc.length; // od zacatku nebo od konce
            var tempCell; 

            for (var i = start + direction; i >= 0 && i < tc.length; i += direction) { // nalezeni predchoziho/nasledujiho editovatelneho sloupce
                if (tc[i].editor && (tempCell = row.find(".cell[data-column-index='" + i + "']")).length && !tempCell.is(".ui-disabled")) {
                    if (autoStart === true) {
                        var ci = this.element.ggrid("activeCellAddress", tempCell);  // muze zpusobit stopCellEditor -> view.update -> view.change -> grid.refreshRow
                        if (tempCell.parent().length === 0 || row.parent().length === 0) {  // TODO: docasne reseni -> v pripade odvazani puvodniho CELL z DOMu najdeme odpovidajici (ale muze byt z jiheho radku) - toto by se nemelo resit v navigate.find! editor by se asi mel ukoncit pred hledanim dalsi bunky + kurzor gridu by mel drzet pozici podle dat, ne podle indexu + navigate by mel zacit z noveho mista pokud change editoru vyvolat zmenu pozice editovaneho radku 
                            ci = ci && this.element.ggrid("cellInfo", ci.row, ci.col, true);
                            tempCell = ci ? $(ci.cellDOM) : null; 
                        }
                        if (tempCell && !tempCell.hasClass("editing")) this._startCellEditor(tempCell);
                    }
                    return tempCell;
                }
                if (direction === 0) break; 
            }
            return null;
        },
        _moveCellEditor: function (cellInfo, direction) { 
            //pokus o nalezeni vhodne bunky k editaci 
            var _this = this; 
            var tc = this.element.ggrid("trueColumns");
            var row = $(cellInfo.rowDOM);
            var tempCell = null;

            if (this.options.moveDirection === "right") {
                if (this._findEditableCell(row, cellInfo.col, direction, true)) return;  // pokus o nalezeni editovatelne bunky na aktualnim radku

                // pokus o nalezeni vhodne bunky na ostatnich radcich 
                tempCell = this.element.ggrid("navigate", direction, {
                    enabled: true,
                    conditionPreselect: true,
                    condition: function (meta, ci) { return _this._findEditableCell($(ci.rowDOM), null, direction, true) !== null; },
                });
            } else if (this.options.moveDirection === "down") {
                tempCell = this.element.ggrid("navigate", direction, {
                    enabled: true,
                    conditionPreselect: true,
                    condition: function (meta, ci) { return _this._findEditableCell($(ci.rowDOM), cellInfo.col, 0, true) !== null; },
                });
            } else throw new Error("ggrid: Neznamy moveDirection: " + this.options.moveDirection);

            if (!tempCell) {
                this._stopCellEditor(true);
                this.element.ggrid("focus");
            }
        },
        getActiveCell: function () {
            return this.element.ggrid("cellInfo", this.element.find(".cell.editing"), true);  // vrati null, kdy nenajde
        },
    });




    /* ======================================================= 
     * GGridFullEditor 
     * ======================================================= 
     *
     * Zakladni bunkovy editor. Umoznuje spustit vsechny standardni editory najednou. Vhodne pro gridy s par radky a s plnym renderem!!!
     * 
     */
    $.widget("gordic.ggridfulleditor", $.gordic.ggridabstracteditor, {
        options: {
            autoStart: true, 

            beforeStart: null,      // stoppable
            start: null, 
            beforeStop: null,
            stop: null,
        },
        _create: function () {
            var _this = this;
            this._superApply(arguments);

            if (this.options.autoStart) this.start(); 
        },
        _destroy: function () {
            this.element.removeClass("ggridfulleditor").off(".ggridfulleditor");
            this._superApply(arguments);
        },

        start: function (cell, update) {
            var _this = this;
            if (this.options.disabled === true) return;
            if (cell && $(cell.cellDOM).is(".editing")) {
                $.data(cell.cellDOM, "editor").focus();
                return true; 
            }

            if (update!==true && !this._trigger("beforeStart", null, { view: this.element.ggrid("getView") })) return false;

            var cnt = this.element.find("div.container").addClass("smartnav-scope");
            var rows = cnt.children("div.row:not(.fulleditor):not(.ui-disabled)").addClass("fulleditor smartnav-scope");
            var trueColumns = this.element.ggrid("trueColumns");
            for (var ri = 0; ri < rows.length; ri++) {
                var row = rows[ri];
                if (row.dataRow._isVirtual) continue;
                var cells = rows.eq(ri).children("div.cell"); 
                for (var i = 0; i < trueColumns.length; i++) {
                    var tc = trueColumns[i];
                    var cell = cells[tc.index];
                    if (cell.classList.contains("ui-disabled")) continue; 
                    if (tc.editor) {
                        //var ci = this.element.ggrid("cellInfo", cell);
                        this._createCellEditor({ cellDOM: cell, data: row.dataRow.data, column: tc }); // OPTIMALIZACE (spravne ma byt volan cellInfo na gridu)
                    } else cell.className += " ui-disabled forced-disable";  // vizualni zakazani needitovatelnych bunek (vime najisto, ze ani jedno tam neni - nehrozi duplicity)
                }
            }

            if (update !== true) {
                this.element.off(".ggridfulleditor")
                    .on({
                        "gridinternalfullrowsrefreshed.ggridfulleditor": function (ev, obj) { _this.start(null, true); },
                        "gridcellactivate.ggridfulleditor": function (ev, obj) {
                            var cell = $(obj.cellInfo.cellDOM); 
                            if (cell.is(".editing")) {
                                if (obj.cellInfo.cellDOM === document.activeElement) $.data(obj.cellInfo.cellDOM, "editor").focus();
                                cell.removeAttr("tabindex");
                            }
                        },
                        "focusin.ggridfulleditor": function (ev) {
                            var cell = $(ev.target).closest(".cell.editing");
                            if (cell.length && cell[0] !== ev.target) _this.element.ggrid("activeCellAddress", cell[0], false);
                        },
                        "fieldchange.ggridfulleditor": function (ev, obj) { var t; (t = $(ev.target).closest(".cell.editing")[0]) && (t = $.data(t, "editor")) && t.collect(); }
                    });
                this._trigger("start", null, { view: this.element.ggrid("getView") });
            }

            return true; 
        },
        stop: function (collect) {
            var cells = this.element.find(".cell.editing").off(".ggridfulleditor");
            this._trigger("beforeStop", null, { view: this.element.ggrid("getView"), collect: collect });
            this.element.off("internalFullRowsRefreshed.ggridfulleditor")

            for (var i = 0; i < cells.length; i++) { 
                var cell = cells.eq(i); 
                var ci = this.element.ggrid("cellInfo", cell);

                this._destroyCellEditor(cell, collect);
            }
            
            var cnt = this.element.find("div.container");
            cnt.children("div.row.fulleditor").removeClass("fulleditor");
            cnt.find("div.forced-disable").removeClass("ui-disabled forced-disable")
            this._trigger("stop", null, { view: this.element.ggrid("getView") });

            this.element.ggrid("refreshRows");
        },
        _moveCellEditor: function (direction) { 
            //pokus o nalezeni vhodne bunky k editaci 
            var _this = this; 

            // pokus o nalezeni vhodne bunky na ostatnich radcich 
            this.element.ggrid("navigate", direction, {
                enabled: true,
                conditionPreselect: true,
                condition: function (meta, ci) {
                    var found = $(ci.rowDOM).find(".cell.editing");
                    if (found.length)
                        if (direction > 0) _this.element.ggrid("activeCellAddress", found.first()[0]);
                        else _this.element.ggrid("activeCellAddress", found.last()[0]);;
                    return found.length > 0;
                }
            });
        },
    });

})(jQuery);





(function ($) {
    "use strict";

    /* ======================================================= 
     * GGrid - Editory
     * ======================================================= 
     *
     * Zakladni tridy pro vytvoreni interniho cellEditoru   
     * 
     */
    var evuid = 0; 

    namespace("Gordic.Components.Grid.Editors.Basic", CreateClass({
        _constructor: function (gridContext, options) {
            this.options = $.extend(true, {}, options);
            this.cell = $(gridContext.cellInfo.cellDOM); 
            this.cellInfo = gridContext.cellInfo;
            this._evuid = ".gridEditorAutoEvents" + (evuid++);

            this.cell
                .on(Gordic.Utils.namespaceEvents(this.options.cellEvents, this._evuid))
                .closest(".row").on(Gordic.Utils.namespaceEvents(this.options.rowEvents, this._evuid))
                .closest(".ggrid").on(Gordic.Utils.namespaceEvents(this.options.gridEvents, this._evuid));
        },

        destroy: function () {
            this.cell.parents().addBack().off(this._evuid);
        },
        focus: function () {
            if (!this.cell.trigger("editorfocus", [{ cellInfo: this.cellInfo, editor: this }])) return;
        },
        collect: function (data) {
            if (!this.cell.trigger("editorcollect", [{ cellInfo: this.cellInfo, dto: data, editor: this }])) return;
        },
        apply: function (data) {
            if (!this.cell.trigger("editorapply", [{ cellInfo: this.cellInfo, dto: data, editor: this }])) return;
        } 
    }));


    namespace("Gordic.Components.Grid.Editors.Field", CreateClass(Gordic.Components.Grid.Editors.Basic, {
        _constructor: function (gridContext, options) {
            Gordic.Components.Grid.Editors.Basic.call(this, gridContext, options);

            var opts = this.options.options = this.options.options || {};
            if ($.isArray(opts)) { opts = opts.slice(); opts.unshift(true, {}); opts = $.extend.apply($, opts); }
            if (!opts.name && !opts.model) opts.name = this.cellInfo.column.field || this.cellInfo.column.name;

            this.cell.addClass("fieldcell").removeAttr("tabindex");
            this.field = $("<div class='no-border w-12'>").appendTo(this.cell)[this.options.widget](opts);
            this.field.gfield("model", "apply", this.cellInfo.data, { initialValues: true });
        },
        destroy: function () {
            this.field.gfield("resetErrors");
            this.cell.removeClass("fieldcell").empty();

            Gordic.Components.Grid.Editors.Basic.prototype.destroy.apply(this, arguments);
        },
        collect: function (data) {
            if (!this.cell.trigger("editorcollect", [{ cellInfo: this.cellInfo, dto: data, editor: this }])) return;

            // NOTE: Bohous: Obcas se stane, ze this.field uz ma destroynutej gfield, ale cell ho v sobe ma. Smrdi v this.field nejaka stara instance??? 
            // TS: No to asi ne, to si tam mozna nekdo nici instance a dava nejake jine, ale tohle nic nevyresi a ostatni metody, ktere uklizi napriklad chybova hlaseni na tohle reagovat stejne nebudou. Takhle se na chybne chovani akorat neprijde.  
            var field = this.field.hasClass("gfield") ? this.field : this.cell.find(".gfield");

            // pokud je nektere policko ve wait stavu, neprovadime collect, protoze by se collectnul null a ztratili bychom puvodni hodnoty
            if (field.get().filter(it => $(it).gfield("waitingForValue") !== null).length > 0) return; 
             
            field.gfield("model", "collect", data || this.cellInfo.data);
        },
        apply: function (data, confirm) {
            if (!this.cell.trigger("editorapply", [{ cellInfo: this.cellInfo, dto: data, editor: this }])) return;

            this.field.filter(":not(.ui-state-disabled)").gfield("model", "apply", data || this.cellInfo.data);
            if (confirm === true) this.field.gfield("smartNavNext");
        },

        focus: function () {
            if (!this.cell.trigger("editorfocus", [{ cellInfo: this.cellInfo, editor: this }])) return;

            this.field.gfield("focus");
        }
    }));

    namespace("Gordic.Components.Grid.Editors.Widget", CreateClass(Gordic.Components.Grid.Editors.Basic, {
        _constructor: function (gridContext, options) {
            Gordic.Components.Grid.Editors.Basic.call(this, gridContext, options);
            var opts = this.options.options;
            if ($.isArray(opts)) { opts = opts.slice(); opts.unshift(true, {}); opts = $.extend.apply($, opts); }


            this.cell.addClass("fieldcell").removeAttr("tabindex");
            this.widget = $("<div class='no-border w-12'>").appendTo(this.cell)[this.options.widget](opts);
        },
        destroy: function () {
            this.cell.removeClass("fieldcell").empty();

            Gordic.Components.Grid.Editors.Basic.prototype.destroy.apply(this, arguments);
        },
        focus: function () {
            if (!this.cell.trigger("editorfocus", [{ cellInfo: this.cellInfo, editor: this }])) return; 

            if (this.widget.find(":focus").length === 0) this.widget.find(":focusable").focus(); 
        },
    }));
})(jQuery);

(function ($) {
    "use strict";

    //TODO: Styly jsou zatim v Ucr.WebClient/Ucr.css - presunout do Gui.WebControls!!!

    $.widget("gordic.ggridserverfilter", $.gordic.ggridabstracteditor, {
        options: {
            //invalidValueChanged: $.noop, //zruseno, bude nekde jinde
            //defaultData       //z ggridroweditor,
            holdData: true      //drzi data mezi mezi znicenim a znovuvytvorenim
        },
        _currData: null,
        _create: function () {
            this.element.addClass("ggridserverfilter");
            this._superApply(arguments);

            var that = this;
            this._$cfu = $("<div class='js-cfu row g-cfu-row'></div>") //ggrid--vertical-intervals - pokud projde navrh MPolaka (operatory v zastupnych hodnotach), tak odstranit i ze stylu 
                .prependTo(this.element.find(".header"));

            this._currData = this.options.defaultData || {};

            this.element
                //.on("click.ggridserverfilter", function (ev) {
                //    var $col = $(ev.target);

                //    if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                //        return;

                //    var colIndex = $col.attr("data-column-index");
                //    var colDef = that.element.ggrid("trueColumns", false)[colIndex];
                //    var $filterFrmBox = that._$cfu.findFields(colDef.name);
                //    if (colDef.serverFilter) {
                //        //var row = that.element.ggrid("getSelection");
                //        //$filterFrmBox.gfield("setValue", row, { valid: false });
                //        $filterFrmBox.gfield("setValue", $col.text(), { valid: false });
                //        that._trigger("invalidValueChanged");
                //    }
                //})
                .on("gridinternalafterrefresh.ggridserverfilter", function (ev) {
                    //NOTE: Nasledujici musi byt, kdyby doslo k zobrazeni/skryti sloupce
                    that._createRow(); //NOTE: Toto bude zlobit v pripadech, kdy mam neco ve filtru, co nema klic!!!
                });
            this._createRow();
        },
        _destroy: function () {
            this._superApply(arguments);
            //this._$cfu.remove(); //Uklidi Skalic
            this.element.off(".ggridserverfilter");
            this.element.removeClass("ggridserverfilter");
        },
        _createCellEditor: function (ci) {
            this._superApply(arguments);
        },
        _destroyCellEditor: function (cell, collect) {
            this._superApply(arguments);
        },
        _createRow: function (doClear) {
            if (!doClear && this.options.holdData)
                this.collect(this._currData);
            else
                this._currData = {};
            this._$cfu.empty();
            var columns = this.element.ggrid("trueColumns", false);
            this._createCfu(columns, this._$cfu);
            this.element.ggrid("fitV"); //NOTE: VMACA: po přidání řádku do hlavičky je potřeba gridu říct, aby si přepočítal velikost viewArea - jinak přelézá svůj div a zasahuje do jiných prvků - viz RZD & J.Ileček.
        },
        _createCfu: function (columns, $row) {
            var colIndex = 0;
            var that = this;
            columns.forEach(function (col, i) {
                if (col.visible === false)
                    return;

                var filter = col.serverFilter; //zatim v Ucr.WebClient - vypreparuje se jinam

                var $cell = $("<div class='js-cfu-cell cell fieldcell g-cfu-filter'>")
                    .addClass("c" + colIndex++)
                    .appendTo($row);

                if (!filter) {
                    $cell.removeClass("g-cfu-filter").addClass("g-cfu-nonfilter");
                    return;
                }

                var opts = filter.options;
                opts.name = opts.name || col.name;

                if (opts.dialogOptions) {
                    opts.dialogOptions.open = /* opts.dialogOptions.open || */ //BUG: Zpusobuje chybu po nacteni dat(znovu-vytvoreni) radku
                        function (ev) { $cell.addClass("g-state-background g-state-inactive"); };
                    opts.dialogOptions.close = /* opts.dialogOptions.close || */
                        function (ev) { $cell.removeClass("g-state-background g-state-inactive editing"); };
                }
                
                var ci = {
                    cellInfo: {
                        cellDOM: $cell,
                        column: col,
                        data: that._currData
                    }
                };
                var editor = new Gordic.Components.Grid.Editors.Field(ci, { widget: filter.widget, options: opts });
                $cell
                    .data("editor", editor)
                    .on("focusin.ggridserverfilter", function (e) { $(e.target).closest(".cell").addClass("editing"); $(e.target).closest(".gfield:not(.gformbox)").addClass("gfield-focus"); })
                    .on("focusout.ggridserverfilter", function (e) { $(e.target).closest(".cell").removeClass("editing"); $(e.target).closest(".gfield:not(.gformbox)").removeClass("gfield-focus"); })
                    .on("fieldchange.ggridserverfilter", function (e) { if (that.options.holdData) that.collect(that._currData); });
            });
        },
        collect: function (d) {
            d = d || {};
            var promises = [];

            this._$cfu.find(":data(editor)").each(function () {
                var $field = $(this).data("editor").field;
                var modelValueTransform = $field.gfield("option", "modelValueTransform");

                var def = $.Deferred();
                var promise = $field.gfield("getValueAsync");
                promises.push(promise);
                promise.then(function (val) {
                    if($field.hasClass("gfield")) $field.gfield("model", "collect", d);
                });
            });

            var def = $.Deferred();

            $.when.apply($, promises)
                .then(function () {
                    def.resolve(d);
                })
                .catch(function () {
                    def.reject();
                });

            return def.promise();
        },
        apply: function (dto /*, validators */) {
            dto = dto || {};
            this._$cfu.find(":data(editor)").each(function () { $(this).data("editor").apply(dto); });
        },
        clear: function () {
            this._createRow(true);
        },
        findFields: function (s) {
            return this._$cfu.findFields(s);
        }
    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\ggrid.extensions.js 

/* GORDIC jQuery knihovna */
/*$(document).ready(function () {


});*/

(function ($) {
    "use strict";

    /* ======================================================= 
     * GGrid - Drag&Drop extension
     * ======================================================= 
     *
     * Drag&Drop radku, s defaultnim presunem v dataView. 
     * 
     * POZOR!!! Je nutne mit dataView bez filtru/sortu a podobnych funkcnosti + tyto funkce mit zakazane na gridu (nebo se spravne postarat o dragStart/dragEnd)
     * 
     */

    $.widget("gordic.ggriddragdrop", {
        options: {
            dragEnabled: null,

            start: null,
            end: null,
        },
        _create: function () {
            var _this = this;
            if (!this.element.is(".ggrid")) throw new Error("CRITICAL ERROR: Widget '" + this.widgetFullName + "' musí být na elementu, na němž byl inicializován ggrid.");

            this._superApply(arguments);

            this.element.addClass("ggriddragdrop")
                .on({
                    "gridinternalcolumnsprepare.ggriddragdrop": function (ev, obj) {
                        obj.columns.unshift({
                            name: "_dragHandle",
                            sysColumn: true, 
                            caption: "",
                            width: 16,
                            fixedWidth: true,
                            customClass: function (row) {
                                return "ui-disabled no-ellipsis" + (($.isFunction(_this.options.dragEnabled) === false || _this.options.dragEnabled.call(_this.element[0], row) !== false) ? " drag-handle-v" : "");
                            },
                            sortable: false,
                            resizable: false,
                            cellTemplate: "<span selection=0>",
                        });
                    },
                    "mousemove.ggriddragdrop": function (ev) {
                        if (_this.dragInfo && ev.clientY !== _this.lastY) { // pohyb po X nas nezajima
                            var n = ev.clientY + _this.element.children("div.viewport").scrollTop();
                            _this._dragMove(n - _this.dragStartY);
                            _this.lastY = ev.clientY;
                        }
                    },
                    "mouseup.ggriddragdrop": function (ev) {
                        if (_this.dragInfo && ev.button === 0) {
                            _this._dragEnd();
                        }
                    },
                });

            this.element.on("mousedown.ggriddragdrop", "div.drag-handle-v", function (ev) {
                if (ev.button !== 0) return; 

                var dragInfo = {
                    start: parseInt($(ev.target).closest(".row").data("rowIndex")),
                    count: 1
                };

                if (_this._trigger("start", null, dragInfo) === false) return;

                _this.dragStartY = ev.clientY + _this.element.children("div.viewport").scrollTop();
                _this._dragStart(dragInfo); 

                ev.preventDefault(); 
            });
            this.element.ggrid("refresh");
        },
        _destroy: function () {
            this._superApply(arguments);
            this.element.off(".ggriddragdrop").removeClass("ggriddragdrop");
        },
        _dragStart: function (dragInfo) {
            if (!dragInfo || typeof dragInfo.start !== "number") return;
            var rows = this.element.find("div.viewport div.row"); 

            // normalizace vstupu (mozna patri ukoncit drag kdyz je neco spatne)
            if (dragInfo.start < 0) dragInfo.start = 0;
            else if (dragInfo.start >= rows.length) dragInfo.start = rows.length - 1;
            if (!dragInfo.count || dragInfo.count < 1) dragInfo.count = 1;
            else if (dragInfo.start + dragInfo.count > rows.length) dragInfo.count = rows.length - dragInfo.start; 

            this.dragInfo = dragInfo;
            rows.filter(function (row) {
                var i = parseInt(this.getAttribute("data-row-index")); return i >= dragInfo.start && i < dragInfo.start + dragInfo.count;
            }).addClass("dragged");

            this.dragShift = 0;
        },
        _dragMove: function (y) {
            var _this = this; 

            var rowHeight = this.element.ggrid("option", "rowHeight");
            this.dragShift = Math.round(y / rowHeight);
            var recCount = this.element.ggrid("getView").getCount();
            if (this.dragShift + this.dragInfo.start < 0) this.dragShift = -this.dragInfo.start;
            if (this.dragShift + this.dragInfo.start + this.dragInfo.count > recCount) this.dragShift = recCount - this.dragInfo.start - this.dragInfo.count;
            var dragHeight = this.dragInfo.count * rowHeight; 

            this.element.find("div.viewport div.row").each(function () {
                var rowIndex = parseInt(this.getAttribute("data-row-index"));
                var native = rowIndex * rowHeight;
                if (rowIndex < Math.min(_this.dragInfo.start + _this.dragShift, _this.dragInfo.start) || rowIndex >= Math.max(_this.dragInfo.start + _this.dragInfo.count + _this.dragShift, _this.dragInfo.start + _this.dragInfo.count))
                    $(this).css("top", native + "px");
                else if (rowIndex >= _this.dragInfo.start && rowIndex < _this.dragInfo.start + _this.dragInfo.count)
                    $(this).css("top", (native + y) + "px");
                else
                    $(this).css("top", (native - Math.sign(_this.dragShift) * dragHeight) + "px");
            });
        },
        _dragEnd: function () {
            this.element.find("div.viewport div.row.dragged").removeClass("dragged");
            if (this.dragShift && this._trigger("end", null, { start: this.dragInfo.start, count: this.dragInfo.count, shift: this.dragShift }) !== false) {
                var view = $(this.element).ggrid("getView"); 
                var data = view.getDataRows(true, "data"); 
                var moved = data.splice(this.dragInfo.start, this.dragInfo.count);  // vyjmeme presouvanou cast
                moved.unshift(Math.min(Math.max(this.dragInfo.start + this.dragShift, 0), data.length), 0); 
                data.splice.apply(data, moved);         // vsuneme na jinou pozici
                view.updateData(data);                  // vyvola refresh gridu
            } else
                this.element.ggrid("refreshRows"); // alespon srovname souradnice

            this.dragInfo = null;
            this.dragShift = null; 
            this.dragStartY = null;
            this.lastY = null; 
        },
    });

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gforms.editor.js 

"use strict";
(function ($) {
    namespace("Gordic.Forms.WYSIWYG.EditorContent", {
        title: 'jres:25030506', //RC 25030506 : Návrhový režim formuláře
        prepareContent: function (inputParams) {
            /// <signature> 
            /// <summary> Inicializace WYSIWYG editoru, editor <b>přepisuje</b> formulář získaný na vstupu (vhodné předávat kopii)</summary> 
            /// <param name="inputParams" type="object">
            /// Vstupní parametry WYSIWYG editoru (nepovinné). 
            /// <para> config: () => { return Gordic.Forms.WYSIWYG.Configurations.defaultConfig } // Datový getter konfigurujicí property panel a panel menu</para>
            /// <para> form: {} // Deklarativní předpis formuláře (pro gform("createFrom")) </para>
            /// <para> formData: {} // Formulářová demo data  </para> 
            /// <para> selection: (event) => { return element } // Funkce vracející požadovaný HTML prvek</para>
            /// <para> dragging: true // Příznak povolení drag & drop</para>
            /// </param>
            /// </signature> 

            inputParams = inputParams || {};
            this.config = inputParams.config || Gordic.Forms.WYSIWYG.Configurations.defaultConfig;
            this.form = inputParams.form instanceof Gordic.Forms.Form ? inputParams.form.form : inputParams.form || new Gordic.Forms.Form().form; // this.demoForm 
            this.formData = inputParams.formData || {};
            this.selection = inputParams.selection || null;                                                             
            this.dragging = (inputParams.dragging != false)
            this.refreshData = true // prinak vkladani dat po prekresleni formulare
            var _this = this; 
            
            this.actions.addRange({
                actNewForm: {
                    caption: 'jres:25030507', //RC 25030507 : Nový formulář
                    run: function (ev, ctx) {
                        _this.newForm(ctx.itemDef);
                    } 
                },
                actAddSection: {
                    caption: 'jres:25030508', //RC 25030508 : Přidat sekci
                    icon: 'fa-plus',
                    run: function (ev, ctx) {
                        _this.newFormItem(ctx.itemType, ctx.itemDef)
                    }
                },
                actAddRow: {
                    caption: 'jres:25030509', //RC 25030509 : Přidat řádek
                    icon: 'fa-plus',
                    run: function (ev, ctx) {
                        _this.newFormItem(ctx.itemType, ctx.itemDef)
                    }
                },
                actAddField: {
                    caption: 'jres:25030510', //RC 25030510 : Přidat políčko
                    run: function (ev, ctx) {
                        _this.newFormItem(ctx.itemType, ctx.itemDef)
                    }
                },
                actRemoveSelected: {
                    caption: 'jres:25030511', //RC 25030511 : Odebrat prvek
                    icon: 'fa-times',
                    tooltip: "jres:25030512", //RC 25030512 : Odstranění vybraného prvku z formuláře
                    run:  this.removeSelected.bind(this)
                },
                actsetFormData: {
                    caption: 'jres:25030513', //RC 25030513 : Vložit hodnoty
                    icon: 'fa-clipboard',
                    run: this.setFormData.bind(this)
                },
                actEditform: {
                    caption: 'jres:25030514', //RC 25030514 : Upravit deklaraci
                    icon: 'fa-file',
                    tooltip: "jres:25030515", //RC 25030515 : Upravit ručně zdrojový kód formuláře
                    run: this.editFormObj.bind(this) 
                },
                actRefresh: {
                    caption: 'jres:25030516', //RC 25030516 : Občerstvit
                    icon: 'fa-refresh',
                    tooltip: "jres:25030517", //RC 25030517 : Překreslit celý formulář s daty
                    run: function () {
                        _this.reloadForm().showProperty().showMenu();
                    }   
                },
                actRefreshNoData: {
                    caption: 'jres:25030518', //RC 25030518 : Vyprázdnit hodnoty
                    icon: 'fa-trash ',
                    run: function () {
                        _this.refreshData = false;
                        _this.reloadForm().showProperty().showMenu();
                        _this.refreshData = true;
                    }
                },
            });
            
            var menuCopy = $.extend(true, [], this.config());
            menuCopy.forEach(function actionChange(it) {
                if (it.type === 'action' && !it.action) {
                    if (it.actionContext) {
                        switch (it.actionContext.itemType) {
                            case 'form': it.action = _this.actions.actNewForm;
                                break;
                            case 'section': it.action = _this.actions.actAddSection;
                                break;
                            case 'row': it.action = _this.actions.actAddRow;
                                break;
                            case 'field': it.action = _this.actions.actAddField; 
                                break;
                            default:
                                throw new Error("Parameter 'actionContext' must have correct itemType.");
                        }  
                    } else {
                        throw new Error("Missing property 'actionContext'");
                    }
                }
                it.children && it.children.forEach(actionChange);
            });
            
            var menu = [];
            if (menuCopy.length) menu = this.actions.createBar([{ caption: "Přidat nový", type: 'static', children: menuCopy }], null, true);

            this.actions.createBar(["actRemoveSelected", "actEditform", "actsetFormData", "actRefreshNoData", "actRefresh"], null, true)
                .forEach(function (it) { menu.push(it); });
            
            $(this.element).addClass("editor-connection-div");
            this.menuBar(menu);
            this.divPanel = $("<div>").addClass("editor-panel").appendTo(this.element);
            this.divForm = $("<div>").addClass("editor-form").appendTo(this.element);
            
            this.reloadForm();
            $(this.divForm).find(".gfield").gfield("model", "apply", this.formData);
            this.showMenu();

            $(this.divForm).on({
              "mouseover mouseout": function (event) {
                    var highlight;
                    if ($.isFunction(_this.selection))
                        highlight = _this.selection(event);
                    else
                        highlight = $(event.target).closest(".gform-field, .gform-row, .gform-section, .gform");

                    highlight && $(highlight).toggleClass("editor--hover", event.type === "mouseover");
                    event.preventDefault();
                },
                "click": function (event) {
                    if (event.target == this) { // klik do hlavniho divu  
                        var highlight = $(_this.divForm).find(".editor--active");

                        $(highlight).removeClass("editor--active");
                        _this.showProperty().showMenu();
                    } else {
                        _this._click(event);
                    }
                },
                "mousedown": function () {
                    document.activeElement && document.activeElement.blur();
                }
             });
        },
        closing: function() { 
            return this.getData(); 
        },
        getData: function () {
            /// <summary>Vrátí objekt deklarativního předpisu formuláře</summary> 
            /// <returns type="Object">{ form }</returns>  
            return { form: this.form};
        },

        _click: function (event) {
            var selected = $(this.divForm).find(".editor--active");
            var newSelected;

            if ($.isFunction(this.selection))
                newSelected = this.selection(event);
            else
                newSelected = $(event.target).closest(".gform-field, .gform-row, .gform-section, .gform");


            if (selected && newSelected && ($(selected)[0] != $(newSelected)[0])) {
                $(selected).removeClass("editor--active");
                $(newSelected).addClass("editor--active");

                var selectedData = $(newSelected).data("structElem");
                this.showProperty(newSelected);
                selectedData && this.showMenu(selectedData.tagForm);
            }
        },

        showMenu: function (tag) {
            /// <summary>Zobrazení akcí v menu</summary> 
            /// <param name="tag" type="string">Nepovinný, zobrazovaný typ menu (např: 'field', 'row', ...)</param>
            tag = tag || "";

            //zobrazeno stale - actNewForm, actsetFormData, actEditform, actRefreshNoData, actRefresh
            switch (tag) {
                case 'field':
                case 'row':
                    if (this.actions.actAddField.enabled() === false) this.actions.actAddField.update({ enabled: true });
                    if (this.actions.actAddRow.enabled() === false) this.actions.actAddRow.update({ enabled: true });
                    if (this.actions.actAddSection.enabled() === false) this.actions.actAddSection.update({ enabled: true });
                    if (this.actions.actRemoveSelected.enabled() === false) this.actions.actRemoveSelected.update({ enabled: true });
                    break;
                case 'section':
                    if (this.actions.actAddField.enabled() === true) this.actions.actAddField.update({ enabled: false });
                    if (this.actions.actAddRow.enabled() === false) this.actions.actAddRow.update({ enabled: true });
                    if (this.actions.actAddSection.enabled() === false) this.actions.actAddSection.update({ enabled: true });
                    if (this.actions.actRemoveSelected.enabled() === false) this.actions.actRemoveSelected.update({ enabled: true });
                    break;
                case 'form':
                    if (this.actions.actAddField.enabled() === true) this.actions.actAddField.update({ enabled: false });
                    if (this.actions.actAddRow.enabled() === true) this.actions.actAddRow.update({ enabled: false });
                    if (this.actions.actAddSection.enabled() === false) this.actions.actAddSection.update({ enabled: true });
                    if (this.actions.actRemoveSelected.enabled() === false) this.actions.actRemoveSelected.update({ enabled: true });
                    break;
                default: // nic nevybrano
                    if (this.actions.actAddField.enabled() === true) this.actions.actAddField.update({ enabled: false });
                    if (this.actions.actAddRow.enabled() === true) this.actions.actAddRow.update({ enabled: false });
                    if (this.actions.actAddSection.enabled() === true) this.actions.actAddSection.update({ enabled: false });
                    if (this.actions.actRemoveSelected.enabled() === true) this.actions.actRemoveSelected.update({ enabled: false });
            }
                return this;
        },

        _activateDragDrop: function (div) {
            var _this = this;
            // rows
            $(div).find(".gform-section").sortable({
                items: ".gform-row",
                opacity: 0.5,
                connectWith: ".gform-section",
                distance: 5,

                start: function (event, ui) {
                    ui.placeholder.width(ui.item.width() - 2);
                    ui.placeholder.height(ui.item.height() - 2);

                    var dragDiv = {};
                    dragDiv.target = ui.item;
                    _this._click(dragDiv);
                },

                update: function (event, ui) {
                    if (this === ui.item.parent()[0]) {
                        var parentElement = ui.item.parent().data("structElem");
                        var itemElement = ui.item.data("structElem");
                        var position = ui.item.prevAll(".gform-row").length;

                        _this.form.sections && itemElement && _this.form.sections.forEach(function (it) {
                            var idx = $.inArray(itemElement.obj, it.rows);
                            if (idx != -1) it.rows.splice(idx, 1);
                        });

                        if (itemElement && parentElement) {
                            (parentElement.obj.rows || (parentElement.obj.rows = []))
                            parentElement.obj.rows.splice(position, 0, itemElement.obj);
                        }
                    }
                }
            }).disableSelection();

            // section 
            $(div).find(".gform").sortable({
                items: ".gform-section",
                opacity: 0.5,
                distance: 5,

                start: function (event, ui) {
                    var dragDiv = {};
                    dragDiv.target = ui.item;
                    _this._click(dragDiv);
                },

                update: function (event, ui) {
                    var itemElement = ui.item.data("structElem");
                    var parentElement = ui.item.parent().data("structElem");
                    var position = ui.item.prevAll(".gform-section").length;

                    if (itemElement && parentElement) {
                        var idx = $.inArray(itemElement.obj, parentElement.obj.sections);
                        if (idx != -1) parentElement.obj.sections.splice(idx, 1);
                        parentElement.obj.sections.splice(position, 0, itemElement.obj);
                    }
                }
            }).disableSelection();
        },

        reloadForm: function (selectedObj, divPartReload, tag){
            /// <summary>Refresh editovaného formuláře</summary> 
            /// <param name="selectedObj" type="object">Nepovinný, data podbarveného prvku, pro opětovné podbarvení</param>
            /// <param name="divPartReload">Nepovinný, element formuláře pro částečný reload</param>
            /// <param name="tag">Nepovinný, název části pro částečný reload (např: 'section', 'row', 'field')</param>
            selectedObj = selectedObj || {};
            tag = tag || '';
            var _this = this;
            var delegfunc = function (type, obj) { _this._elemConnect.call(this, type, obj, selectedObj); };
            var div = divPartReload;
            var data = {};

            this.refreshData && $(this.divForm).find(".gfield").gfield("model", "collect", data);
            switch (tag) {  
                case 'field':
                    div = divPartReload.closest(".gform-row");
                case 'row':
                    var rowData = (div.data("structElem")) ? div.data("structElem").obj : {};
                    div = $.gformrow("createFrom", rowData, delegfunc).replaceAll(div);
                    break;
                case 'section':
                   var sectionData = (div.data("structElem")) ? div.data("structElem").obj : {};
                   div = $.gformsection("createFrom", sectionData, delegfunc).replaceAll(div);
                   break;

                default:
                    $(this.divForm).empty();
                    div = $("<div>").appendTo(this.divForm).gform("createFrom", this.form, delegfunc);
            }

            this.refreshData && $(div).find(".gfield").gfield("model", "apply", data);
            this.dragging && this._activateDragDrop(this.divForm);
            return this;
        },

        showProperty: function (selectedDiv) {
            /// <summary>Zobrazení property panelu</summary> 
            /// <param name="selectedDiv">Nepovinný, podbarvený element formuláře pro zobrazení jeho property panelu</param>
            var _this = this;
            var foundedDiv = (selectedDiv && selectedDiv.length) ? selectedDiv : $(this.divForm).find(".editor--active");
            var connectedElement = $(foundedDiv).data("structElem");
           
            $(this.divPanel).empty();
            if(connectedElement){
                var layout = _this.config(connectedElement.tagForm, connectedElement.obj, foundedDiv);
                if (layout) {
                    var div = $("<div>").appendTo($(_this.divPanel));
                    var panelForm = $(div).gform("createFrom", _this.config(connectedElement.tagForm, connectedElement.obj));
                    var buttonRow = panelForm.findFormRows("buttons");
                    if (buttonRow.length === 0) buttonRow = panelForm.gformsection("create").gformrow("create").addClass("right");
                    
                    buttonRow.gformrow("createFields", [""]).
                        gbutton({
                            params: {
                                caption: "Použít",
                                customClass: "g-button--primary",
                                action: new GAction({
                                    name: 'ApplyButton',
                                    run: function () {
                                        if ($(div).gform("isValid", true)) {
                                            var src = $(div).data("elemData");
                                            src && $(div).find(".gfield").gfield("model", "collect", src);
                                            _this.reloadForm(connectedElement.obj, foundedDiv, connectedElement.tagForm).showProperty();
                                        }
                                    }
                                })
                            }
                        });

                    $(div).find(".gfield").gfield("model", "apply", connectedElement.obj);
                    $(div).data("elemData", connectedElement.obj);
                }
            }
            return this;
        },

        _elemConnect: function (type, obj, highlightedData) {
            $(this).data("structElem", { tagForm: type, obj: obj });

            if ($(this).data("structElem").obj === highlightedData)
                $(this).addClass("editor--active");
        },

        newForm: function (form) {
            /// <summary>Vytvoření nového formuláře</summary> 
            /// <param name="form" type="object">Nepovinný, objekt nového formuáře</param>
            var _this = this;
            var newObjForm = $.extend(true, {}, form) || {};

            var qDialog = GDlg.messageBox("Smazat starý formulář", "Opravdu chcete smazat tento formulář a vytvořit nový?", [GDlg.mbbYesNo], GDlg.mbiQuestion);
            qDialog.on("close", function (event) {
                if (event.returnValue === 'yes') {
                    _this.form = newObjForm;
                    _this.reloadForm(newObjForm).showProperty().showMenu('form');
                }
            });
        },

        newFormItem: function (type, insertObj) {
            /// <summary>Přidává nový prvek do formuláře</summary> 
            /// <param name="type" type="string">Typ vkládaného prvku, povolené hodnoty ('section', 'row', 'field')/param>
            /// <param name="insertObj" type="object">Nepovinný, objekt nového prvku</param>
            var newObjCopy = $.extend(true, {}, insertObj);
            var selectedElem = $(this.divForm).find(".editor--active");
            var nearestData = $(selectedElem).closest(".gform-" + type).data("structElem");
            var parentElem;
            var parentData;

            switch (type) {
                case 'section':
                    parentElem = $(selectedElem).closest(".gform");
                    parentData = $(parentElem).data("structElem");

                    if (nearestData && parentData) {
                        var idx = $.inArray(nearestData.obj, parentData.obj.sections);
                        if (idx != -1) parentData.obj.sections.splice(idx + 1, 0, newObjCopy);
                    } else { // oznacny form
                        parentData && (parentData.tagForm == 'form') && (parentData.obj.sections || (parentData.obj.sections = [])).push(newObjCopy);
                    }
                    break;
                case 'row':
                    parentElem = $(selectedElem).closest(".gform-section");
                    parentData = $(parentElem).data("structElem");

                    if (nearestData && parentData) {
                        var idx = $.inArray(nearestData.obj, parentData.obj.rows);
                        if (idx != -1) parentData.obj.rows.splice(idx + 1, 0, newObjCopy);
                    } else { // oznacena sekce
                        parentData && (parentData.tagForm == 'section') && (parentData.obj.rows || (parentData.obj.rows = [])).push(newObjCopy);
                    }
                    break;
                case 'field':
                    parentElem = $(selectedElem).closest(".gform-row");
                    parentData = $(parentElem).data("structElem");

                    if (nearestData && parentData) {
                        var idx = $.inArray(nearestData.obj, parentData.obj.fields);
                        if (idx != -1) parentData.obj.fields.splice(idx + 1, 0, newObjCopy);
                    } else { // oznaceny radek
                        parentData && (parentData.tagForm == 'row') && (parentData.obj.fields || (parentData.obj.fields = [])).push(newObjCopy);
                    } 
                    break;
                default:
            }

            parentData && this.reloadForm(newObjCopy, parentElem, parentData.tagForm).showProperty().showMenu(type);
        },

        removeSelected: function () {
            /// <summary>Odstranění podbararveného prvku</summary>
            var _this = this;
            var selectedElem = $(this.divForm).find(".editor--active");
            var selectedObj = $(selectedElem).data("structElem").obj;

            if (this.form == selectedObj) this.newForm();
            this.form && this.form.sections && this.form.sections.forEach(function (itSection, idxSection) {
                if (itSection == selectedObj) _this.form.sections.splice(idxSection, 1);
                itSection && itSection.rows && itSection.rows.forEach(function (itRow, idxRow) {
                    if (itRow == selectedObj) itSection.rows.splice(idxRow, 1); 
                    itRow && itRow.fields && itRow.fields.forEach(function (itField, idxField) {
                        if (itField == selectedObj) itRow.fields.splice(idxField, 1);  
                    });
                });
            });

            if (!(selectedElem.is('.gform'))) $(this.divForm).find(".editor--active").remove();
            this.showProperty().showMenu();
        },

        setFormData: function () {
            /// <summary>Nahrání dat do formuláře pomocí clipboardu</summary>
            var dataObj = {};
            var dataText = {};
            var _this = this;

            if ($(_this.divForm).gform("isValid", true)) {
                $(this.divForm).find(".gfield").gfield("model", "collect", dataObj);
                dataText.obj = JSON.stringify(dataObj, null, '\t');
                var dialogClipboard = GDlg.simpleForm("Form", this.clipboardLayout, dataText);

                dialogClipboard.on("ok", function (event) {
                    var data = JSON.parse(dataText.obj);
                    $(_this.divForm).find(".gfield").gfield("model", "apply", data);
                });
            }
        },

        editFormObj: function () {
            /// <summary>Ruční editace JSON předpisu formuláře pomocí clipboardu</summary>
            var dataText = {};
            var funcArr = [];
            var _this = this;
            
            dataText.obj = JSON.stringify(this.form, function (key, value) {
                if (typeof (value) === 'function') {
                    var position = funcArr.length;
                    funcArr.push(value);
                    return "#function" + position.toString() + "#";
                }
                return value;
            }, '\t');

            var dialogClipboard = GDlg.simpleForm("Form", this.clipboardLayout, dataText);
            dialogClipboard.on("ok", function (event) {
                var newObj = JSON.parse(dataText.obj, function (key, value) {
                    if (typeof (value) === 'string') {
                        if (value.match(/^#function([0-9]+)#$/)) {
                            var newstr = value.replace(/^#function([0-9]+)#$/, "funcArr[$1]");
                            return eval(newstr);
                        }
                    }
                    return value;
                });

                _this.form = newObj || {};
                _this.reloadForm().showProperty().showMenu();
            });
        },

        clipboardLayout: new Gordic.Forms.Form("L1M1S1 LMS-0-12-0").
            addSection({ customClass: "h100" }).addRow({ customClass: "h100" }).
              addField("gstringbox", {
                  model: "obj",
                  rows: true,
                  customClass: "h100",
                  allowResize: false,
                  validators: [new Gordic.Validators.Base({
                      validate: function (value, field) {
                          try {
                              JSON.parse(value);
                          } catch (e) {
                              this.message = e;
                              return false;
                          }
                          return true;
                      }
                  })]
              }),

        //demoForm: new Gordic.Forms.Form("L2M1S1")
        // .addSection("Basics, pt 1.")
        //   .addRow("Text 1").addField("gstringbox", { model: "txt1" })
        //   .addRow("Number 2").addField("gnumberbox", { model: "num1" })
        //   .addRow("Date 3, Date 4").addField("gdatebox", "w-6", { model: "dat1" }).addField("gdatebox", "w-6", { model: "dat2" })
        //   .addRow("Selector").addField("gselectbox")
        //   .addRow({label: "Basics, pt 2.", customClass: "gform-row-header"})
        //   .addRow().addText("Variant A", "w-6 right").addText("Variant B", "w-6 right")
        //   .addRow("Num 5").addField("gnumberbox", "w-6", { model: "num2" }).addField("gnumberbox", "w-6", { model: "num3" })
        //   .addRow("Num 6").addField("gnumberbox", "w-6").addField("gnumberbox", "w-6")
        //   .addRow("Num 7").addField("gdummybox", "w-6").addField("gnumberbox", "w-6")
        // .addSection("Advanced")
        //   .addRow("3Fields")
        //     .addField("gstringbox", "w-8", { placeholder: "Account No." }).addText("/", "w-1 center").addField("gstringbox", "w-3")
        //     .addField("gstringbox", "w-12", { placeholder: "Note" })
        //   .addRow("Custom").addField("gstringbox", {
        //       states: [
        //         { icon: 'fa-commenting', customClass: "g-state-important", tooltip: "S komentarem?" },
        //         { icon: 'fa-star', customClass: "g-state-warning", align: "opposite", tooltip: "Oblibene?" },
        //       ]
        //   })
        //   .addRow("Area 1").addField("gstringbox", { rows: 4 })
        //   .addRow("Check").addField("gcheck", { initialValue: true, label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce consectetuer risus a nunc. Etiam quis quam." })
        //   .addRow("Radios").addField("gradio", "w-4", {
        //       initialValue: "c",
        //       itemClass: "w-12",
        //       radios: [
        //         { value: "a", label: "Hodnota A" },
        //         { value: "b", label: "Hodnota B" },
        //         { value: "c", label: "Hodnota C" },
        //         { value: "d", label: "Hodnota D" }
        //       ]
        //   })
        //   .addField("gradio", "w-8", {
        //       initialValue: "d",
        //       radios: [
        //         { value: "a", customClass: "R1" },
        //         { value: "b", customClass: "R2" },
        //         { value: "c", customClass: "R3" },
        //         { value: "d", customClass: "R4" },
        //         { value: "e", customClass: "R5" },
        //         { value: "f", customClass: "R6" },
        //         { value: "g", customClass: "R7" },
        //         { value: "h", customClass: "R8" }
        //       ]
        //   }).form
    });

    namespace("Gordic.Forms.WYSIWYG.Configurations", {
        defaultConfig: function (type, formObj, element) {

             if (!type) {
                return [{
                    caption: "Formulář",
                    type: "action",
                    actionContext: { itemType: 'form'  },
                }, {
                    caption: "Sekce",
                    type: "action",
                    icon: 'fa-plus',
                    actionContext: { itemType: 'section', itemDef: {} },
                }, {
                    caption: "Řádek",
                    type: "action",
                    icon: 'fa-plus',
                    actionContext: { itemType: 'row', itemDef: {} },
                },{
                    caption: "Label sekce",
                    type: "action",
                    icon: 'fa-plus',
                    actionContext: { itemType: 'row', itemDef: { customClass: "gform-row-header" } },
                }, {
                    caption: "Políčko",
                    type: "static",
                    icon: 'fa-plus',
                    children: [
                    {
                        caption: "gstringbox",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gstringbox' } },
                    }, {
                        caption: "gnumberboxt",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gnumberbox' } },
                    }, {
                        caption: "gdatebox",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gdatebox' } },
                    }, {
                        caption: "gselectbox",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gselectbox' } },
                    }, {
                        caption: "gcheck",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gcheck' } },
                    }, {
                        caption: "gradio",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gradio' } },
                    }, {
                        caption: "gformtext",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gformtext' } },
                    }, {
                        caption: "gdummybox",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gdummybox' } },
                    }, {
                        caption: "gintervalbox",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gintervalbox' } },
                    }, {
                        caption: "gformbox",
                        type: "action",
                        actionContext: { itemType: 'field', itemDef: { widget: 'gformbox' } },
                    }
                    ]
                }
                ];
            }  
            switch (type) {
                case "form":
                    return new Gordic.Forms.Form("L1M1S1").addSection("Form properties")
                        .addRow("Name").addField("gstringbox", { model: "name" })
                        .addRow("Custom class").addField("gstringbox", { model: "customClass", })
                        .addRow("Layout descriptor").addField("gstringbox", { model: "layoutDescriptor" })
                        .addRow("Errors position", false, "beforeLabel, afterLabel, supplement, hidden").addField("gstringbox", { model: "errorsPosition" }); // vhodnejsi gselectbox
                case "section":
                    return new Gordic.Forms.Form("L1M1S1").addSection("Section properties")
                        .addRow("Name").addField("gstringbox", { model: "name" })
                        .addRow("Label").addField("gstringbox", { model: "label" })
                        .addRow("Custom class").addField("gstringbox", { model: "customClass" })
                        .addRow("Layout descriptor").addField("gstringbox", { model: "layoutDescriptor" })
                        .addRow("Errors position", false, "beforeLabel, afterLabel, supplement, hidden").addField("gstringbox", { model: "errorsPosition"});
                case "row":
                    return new Gordic.Forms.Form("L1M1S1").addSection("Row properties")
                        .addRow("Name").addField("gstringbox", { model: "name" })
                        .addRow("Label").addField("gstringbox", { model: "label" })
                        .addRow("Custom class").addField("gstringbox", { model: "customClass" })
                        .addRow("Hint").addField("gstringbox", { model: "hint" })
                        .addRow("Layout descriptor").addField("gstringbox", { model: "layoutDescriptor" })
                        .addRow("Errors position", false, "beforeLabel, afterLabel, supplement, hidden").addField("gstringbox", { model: "errorsPosition" })
                        .addRow("Required").addField("gcheck", { model: "required", initialValue: false });
                case "field":
                    switch (formObj.widget) {
                        case "gnumberbox":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gnumberbox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gnumberbox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                .addRow("Vertical buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: false })
                                .addRow("Buttons").addField("gformbox", { model: "options.buttons", initialValue: [] })
                                .addRow("States").addField("gformbox", { model: "options.states", initialValue: [] })
                                .addRow("Placeholder").addField("gstringbox", { model: "options.placeholder" })
                                .addRow("Allowed chars").addField("gstringbox", { model: "options.allowedChars" })
                                .addRow("Spell check").addField("gcheck", { model: "options.spellCheck", initialValue: true })
                                .addRow("Enter to confirm").addField("gcheck", { model: "options.enterToConfirm", initialValue: false })
                                .addRow("Format").addField("gformbox", { model: "options.format", initialValue: {} })
                                .addRow("Min value").addField("gstringbox", { model: "options.minValue" })
                                .addRow("Max value").addField("gstringbox", { model: "options.maxValue" })
                                .addRow("Red Negative").addField("gcheck", { model: "options.redNegative", initialValue: false })
                                .addRow("Step").addField("gnumberbox", { model: "options.step", initialValue: 1 })
                                .addRow("Return type").addField("gstringbox", { model: "options.returnType", initialValue: "decimal" })
                        case "gdatebox":  
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gdatebox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gdatebox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                .addRow("Vertical buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: false })
                                .addRow("Buttons").addField("gformbox", { model: "options.buttons", initialValue: [] })
                                .addRow("States").addField("gformbox", { model: "options.states", initialValue: [] })
                                .addRow("Placeholder").addField("gstringbox", { model: "options.placeholder" })
                                .addRow("Allowed chars").addField("gstringbox", { model: "options.allowedChars" })
                                .addRow("Spell check").addField("gcheck", { model: "options.spellCheck", initialValue: true })
                                .addRow("Enter to confirm").addField("gcheck", { model: "options.enterToConfirm", initialValue: false })
                                .addRow("Min value").addField("gdatebox", { model: "options.minValue" })
                                .addRow("Max value").addField("gdatebox", { model: "options.maxValue" })
                                .addRow("Hide zero time").addField("gcheck", { model: "options.hideZeroTime", initialValue: false })
                                .addRow("Value type").addField("gstringbox", { model: "options.valueType", initialValue: "date" })
                        case "gintervalbox":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gintervalbox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gintervalbox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                .addRow("Vertical buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: false })
                                .addRow("Buttons").addField("gformbox", { model: "options.buttons", initialValue: [] })
                                .addRow("States").addField("gformbox", { model: "options.states", initialValue: [] })
                                .addRow("Placeholder").addField("gstringbox", { model: "options.placeholder" })
                                .addRow("Allowed chars").addField("gstringbox", { model: "options.allowedChars" })
                                .addRow("Spell check").addField("gcheck", { model: "options.spellCheck", initialValue: true })
                                .addRow("Enter to confirm").addField("gcheck", { model: "options.enterToConfirm", initialValue: false })
                        case "gselectbox": 
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gselectbox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gstringbox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                .addRow("Vertical buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: false })
                                .addRow("Buttons").addField("gformbox", { model: "options.buttons", initialValue: [] })
                                .addRow("States").addField("gformbox", { model: "options.states", initialValue: [] })

                                .addRow("Data").addField("gstringbox", { model: "options.data" })
                                .addRow("Client filter evaluator").addField("gstringbox", { model: "options.clientFilterEvaluator" })
                                .addRow("Server filters").addField("gstringbox", { model: "options.serverFilters" })
                                .addRow("Item template").addField("gstringbox", { model: "options.itemTemplate" })
                                .addRow("Item class").addField("gstringbox", { model: "options.itemClass" })
                                .addRow("Item width").addField("gstringbox", { model: "options.itemWidth" })
                                .addRow("Item tooltip template").addField("gstringbox", { model: "options.itemTooltipTemplate" })
                                .addRow("Helper item template").addField("gstringbox", { model: "options.helperItemTemplate" })
                                .addRow("Helper item class").addField("gstringbox", { model: "options.helperItemClass" })
                                .addRow("Helper view portClass").addField("gstringbox", { model: "options.helperViewPortClass" })
                                .addRow("Render empty").addField("gcheck", { model: "options.renderEmpty", initialValue: false })
                                .addRow("Smart nav move onChoice").addField("gcheck", { model: "options.smartNavMoveOnChoice", initialValue: true })
                                .addRow("Item deletable").addField("gcheck", { model: "options.itemDeletable", initialValue: true })
                                .addRow("List").addField("gcheck", { model: "options.list", initialValue: false })
                                .addRow("Multi").addField("gcheck", { model: "options.multi", initialValue: false })
                                .addRow("Graphic input", false, "null | hidden | oninput | always").addField("gstringbox", { model: "options.graphicInput" })
                                .addRow("Strict").addField("gcheck", { model: "options.strict", initialValue: true })
                                .addRow("Dropdown").addField("gcheck", { model: "options.dropdown", initialValue: false })
                                .addRow("Sortable").addField("gcheck", { model: "options.sortable", initialValue: false })
                                .addRow("Sortable link").addField("gstringbox", { model: "options.sortableLink" })
                                .addRow("Filter min length").addField("gnumberbox", { model: "options.filterMinLength", initialValue: 1 })
                                .addRow("Helper limit").addField("gnumberbox", { model: "options.helperLimit", initialValue: 50 })
                                .addRow("Helper columns").addField("gformbox", { model: "options.helperColumns", initialValue: [""] })
                                .addRow("Show select button").addField("gcheck", { model: "options.showSelectButton", initialValue: true })
                                .addRow("Verify").addField("gstringbox", { model: "options.verify" })
                                .addRow("Invalid transform").addField("gstringbox", { model: "options.invalidTransform" });
                        case "gstringbox":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gstringbox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gstringbox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                .addRow("Vertical buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: false })
                                .addRow("Buttons").addField("gformbox", { model: "options.buttons", initialValue: [] })
                                .addRow("States").addField("gformbox", { model: "options.states", initialValue: [] })
                                .addRow("Placeholder").addField("gstringbox", { model: "options.placeholder" })
                                .addRow("Allowed chars").addField("gstringbox", { model: "options.allowedChars" })
                                .addRow("Spell check").addField("gcheck", { model: "options.spellCheck", initialValue: true })
                                .addRow("Auto size").addField("gcheck", { model: "options.autoSize", initialValue: false })
                                .addRow("Allow resize").addField("gcheck", { model: "options.allowResize", initialValue: true })
                                .addRow("Rows").addField("gstringbox", { model: "options.rows" })
                                .addRow("Wrap").addField("gcheck", { model: "options.wrap", initialValue: true })
                                .addRow("Smart Nav Invert Enter Behavior").addField("gcheck", { model: "options.smartNavInvertEnterBehavior", initialValue: false })
                                .addRow("Input type").addField("gstringbox", { model: "options.inputType", initialValue: "text" })
                        case "gcheck":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                 .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gdummybox", disabled: true })
                                 .addRow("Layout").addField("gstringbox", { model: "layout" })
                                 .addSection("Options")
                                 .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                 .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                 .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                 .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                 .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                 .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                 .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                 .addRow("Initial value").addField("gcheck", { model: "options.initialValue", initialValue: false })
                                 .addRow("Empty value").addField("gcheck", { model: "options.emptyValue", initialValue: false })
                                 .addRow("Model").addField("gstringbox", { model: "options.model" })
                                 .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                 .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                 .addRow("Label from row: ").addField("gcheck", { model: "options.labelFromRow", initialValue: true })
                                 .addRow("Label").addField("gstringbox", { model: "options.label"}); 
                        case "gradio":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                 .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gdummybox", disabled: true })
                                 .addRow("Layout").addField("gstringbox", { model: "layout" })
                                 .addSection("Options")
                                 .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                 .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                 .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                 .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                 .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                 .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                 .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                 .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                 .addRow("Empty value").addField("gstringbox", { model: "options.emptyValue" })
                                 .addRow("Model").addField("gstringbox", { model: "options.model" })
                                 .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                 .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                 .addRow("Item class").addField("gstringbox", { model: "options.itemClass" })
                                 .addRow("Radios").addField("gformbox", { model: "options.radios" });
                        case "gformtext":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gformtext", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Html").addField("gstringbox", { model: "options.html" })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" }); 
                        case "gdummybox":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gdummybox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gstringbox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop });
                        case "gformbox":
                            return new Gordic.Forms.Form("L1M1S1").addSection("Field properties")
                                .addRow("Widget").addField("gstringbox", { model: "widget", initialValue: "gselectbox", disabled: true })
                                .addRow("Layout").addField("gstringbox", { model: "layout" })
                                .addSection("Options")
                                .addRow("Validators ").addField("gformbox", { model: "options.validators ", initialValue: [] })
                                .addRow("Errors ").addField("gformbox", { model: "options.errors", initialValue: [] })
                                .addRow("Errors to tooltip").addField("gcheck", { model: "options.errorsToTooltip", initialValue: true })
                                .addRow("Custom class").addField("gstringbox", { model: "options.customClass" })
                                .addRow("Tooltip").addField("gstringbox", { model: "options.tooltip" })
                                .addRow("Smart navigation").addField("gcheck", { model: "options.smartNavigation", initialValue: true })
                                .addRow("Smart navigation next element: ").addField("gformbox", { model: "options.smartNavNextElement", initialValue: $.noop })
                                .addRow("Initial value").addField("gstringbox", { model: "options.initialValue" })
                                .addRow("Empty value").addField("gstringbox", { model: "options.emptyValue" })
                                .addRow("Model").addField("gstringbox", { model: "options.model" })
                                .addRow("Model options").addField("gstringbox", { model: "options.modelOptions" })
                                .addRow("Change").addField("gformbox", { model: "options.change", initialValue: $.noop })
                                .addRow("Vertical buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: false })
                                .addRow("Buttons").addField("gformbox", { model: "options.buttons", initialValue: [] })
                                .addRow("States").addField("gformbox", { model: "options.states", initialValue: [] })

                                .addRow("Data").addField("gstringbox", { model: "options.data" })
                                .addRow("Client filter evaluator").addField("gstringbox", { model: "options.clientFilterEvaluator" })
                                .addRow("Server filters").addField("gstringbox", { model: "options.serverFilters" })
                                .addRow("Item template").addField("gstringbox", { model: "options.itemTemplate" })
                                .addRow("Item class").addField("gstringbox", { model: "options.itemClass" })
                                .addRow("Item width").addField("gstringbox", { model: "options.itemWidth" })
                                .addRow("Item tooltip template").addField("gstringbox", { model: "options.itemTooltipTemplate" })
                                .addRow("Helper item template").addField("gstringbox", { model: "options.helperItemTemplate" })
                                .addRow("Helper item class").addField("gstringbox", { model: "options.helperItemClass" })
                                .addRow("Helper view portClass").addField("gstringbox", { model: "options.helperViewPortClass" })
                                .addRow("Render empty").addField("gcheck", { model: "options.renderEmpty", initialValue: false })
                                .addRow("Smart nav move onChoice").addField("gcheck", { model: "options.smartNavMoveOnChoice", initialValue: true })
                                .addRow("Item deletable").addField("gcheck", { model: "options.itemDeletable", initialValue: true })
                                .addRow("List").addField("gcheck", { model: "options.list", initialValue: false })
                                .addRow("Multi").addField("gcheck", { model: "options.multi", initialValue: false })
                                .addRow("Graphic input", false, "null | hidden | oninput | always").addField("gstringbox", { model: "options.graphicInput" })
                                .addRow("Strict").addField("gcheck", { model: "options.strict", initialValue: true })
                                .addRow("Dropdown").addField("gcheck", { model: "options.dropdown", initialValue: false })
                                .addRow("Sortable").addField("gcheck", { model: "options.sortable", initialValue: false })
                                .addRow("Sortable link").addField("gstringbox", { model: "options.sortableLink" })
                                .addRow("Filter min length").addField("gnumberbox", { model: "options.filterMinLength", initialValue: 1 })
                                .addRow("Helper limit").addField("gnumberbox", { model: "options.helperLimit", initialValue: 50 })
                                .addRow("Helper columns").addField("gformbox", { model: "options.helperColumns", initialValue: [""] })
                                .addRow("Show select button").addField("gcheck", { model: "options.showSelectButton", initialValue: true })
                                .addRow("Verify").addField("gstringbox", { model: "options.verify" })
                                .addRow("Invalid transform").addField("gstringbox", { model: "options.invalidTransform" })

                                .addRow("Form").addField("gstringbox", { model: "options.form" })
                                .addRow("New item data").addField("gformbox", { model: "options.newItemData", initialValue: {} })
                                .addRow("Dialog options").addField("gformbox", { model: "dialogOptions" })
                                .addRow("Item editable").addField("gcheck", { model: "itemEditable", initialValue: true })
                                .addRow("Graphic input").addField("gstringbox", { model: "options.graphicInput", initialValue: "hidden" })
                                .addRow("Helper columns").addField("gstringbox", { model: "options.helperColumns" })
                                .addRow("Vertical Buttons").addField("gcheck", { model: "options.verticalButtons", initialValue: true })
                        default:
                    }
                    break;
                default:
            }
        },

        ensure: function (demoform) {
        }
    }, { pure: true });


})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gnotification.js 

(function ($) {
    "use strict";

    var iconBuilder;

    $.widget("gordic.gnotification", {
        options: {
            id: "",
            name: "",           //misto ID pro pripadne dohledani
            title: "",
            content: null,      // $([]),
            shortTemplate: null,//formatuje opt. 'content' (pokud je plainObject) v zabalenem stavu
            fullTemplate: null, //formatuje opt. 'content' (pokud je plainObject) v rozbalenem stavu
            meta: "",
            icon: "gi-radio",
            defaultAction: null,
            commandBar: null,   //[],
            group: "",
            dateTime: null,
            isVisible: true,
            isCollapsed: true,
            isVisited: false,
            progress: null,     //{ current: 0, total: 100, text: "", isCancellable: true }
            state: "info",      //important|error|warning|success|info
            observable: null,   //vse z options krome prop. observable
            mode: "full",       //full|toast

            //events
            change: null,        //(ev, {id: "", options: {}})
            readStart: null,     //(ev) - uzivatel je mysi nad toastem, asi cte obsah
            readEnd: null,       //(ev) - uzivatel odjel mysi z toastu, asi docetl nebo uz ho nezajima
            actionStarted: null
        },
        _toggleAction: null,
        _left$: null,
        _center$: null,
        _right$: null,
        _commandBar$: null,
        _title$: null,
        _meta$: null,
        _content$: null,
        _progress$: null,
        _toggleLink$: null,
        _icon$: null,
        _badge$: null,
        _updateFunc: null,
        _textFade: "<div class='js-text-fade g-notification__text-fade'></div>",
        _toastTimer: null,
        _toastReadEndTimer: null,
        _create: function () {
            var that = this;

            if (!iconBuilder)
                iconBuilder = new Gordic.Utils.IconBuilder();

            if (this.options.observable) {
                for (var key in this.options.observable) {
                    if (key === "observable")
                        continue;
                    this.options[key] = this.options.observable[key];
                }
            }

            this.options.dateTime = this.options.dateTime || new Date();

            this.element.addClass("gnotification g-notification")
                .attr("data-notif-name", this.options.name || "")
                .attr("data-notif-id", this.options.id)
                .attr("role", "application");

            this._badge$ = $.newDiv();
            this._icon$ = $(iconBuilder.createIcon(this.options.icon));
            this._left$ = $("<div class='g-notification__left'>")
                .append(this._icon$)
                .append(this._badge$);

            if (this.options.badge) this._badge$.gbadge(this.options.badge);

            this._center$ = $("<div class='g-notification__center'>")
                .append(this._title$ = $("<div class='js-gnotification-title g-notification__title'>" + (this.options.title ? this.options.title : "") + "</div>").uniqueId())
                .append(this._meta$ = $("<div class='js-gnotification-meta g-notification__meta'>").append(this._createMetaStr()))
                .append(this._content$ = $("<div class='js-gnotification-content'>").append(this._createContent()).uniqueId())
                .append(this._progress$ = $("<div class='js-gnotification-progress'>").append(this._createProgress()))
                .append(this._commandBar$ = $("<div class='g-notification__cmdbar'>"));

            this._right$ = $("<div class='g-notification__right'>")
                .append(this._dateTime$ = $("<div class='js-gnotification-dt g-notification__dt'>").append(this._createDateTime()))
                .append(this._close$ = $("<div class='g-notification__close'><span class='gi gi-window-close'></span></div>"));

            this.element.append(this._left$)
                .append(this._center$)
                .append(this._right$)
                .append("<div class='clearfix'>");


            //#region Pouze pro DEBUG

            //if (!this.options.defaultAction)
            //    this.options.defaultAction = new GAction({
            //        name: "hideAct",
            //        run: function (ev, ctx) {
            //            that.options.observable.update({ isVisible: false });
            //        }
            //    });
            var closeAct = new GAction({
                        name: "hideAct",
                        run: function (ev, ctx) {
                            that.options.observable.update({ isVisible: false });
                            that._trigger("close");
                        }
                    });
            closeAct.register(this._close$);

            var titleId = this._title$.attr("id");
            var contentId = this._content$.attr("id");

            //#endregion

            this.element
                .attr("aria-labelledby", titleId)
                .attr("aria-describedby", contentId);

            if (this.options.defaultAction) {
                this.options.defaultAction.register(this._center$);
                this.options.defaultAction.run(function (ev) { that._trigger("actionStarted"); })
                this._center$.attr("tabindex", "0")
                    .attr("aria-labelledby", titleId)
                    .attr("aria-describedby", contentId)
                    .attr("role", "button")
                    .gshortcut({
                        key: ["enter", "space"],
                        group: Gordic.Shortcuts.Groups.App,
                        visible: false,
                        action: this.options.defaultAction
                    });
            }

            this._toggleAction = new GAction({
                name: "toggleAct",
                icon: this.options.isCollapsed ? "fa-chevron-down" : "fa-chevron-up",
                run: function (ev, ctx) {
                    that.toggle();

                    if (!that.options.isVisited) {
                        that._setOptions({ isVisited: true });
                        that._updateContent();
                        that._updateIsVisited();
                    }
                }
            });

            this._toggleLink$ = $("<a>")
                .appendTo(this._right$)
                .glink({
                    params: {
                        action: this._toggleAction,
                        customClass: "g-link--no-underline"
                    }
                })
                .attr("aria-labelledby", titleId)
                .attr("aria-describedby", contentId);

            this._createCommandBar();

            if (this.options.isCollapsed)
                this.collapse();

            this._updateIsVisited();
            if (this.options.observable instanceof GObservableObject) {
                this._updateFunc = function (args) {
                    if (args.isVisited === undefined)
                        args.isVisited = false;
                    that._setOptions(args);
                    that._updateVisibility();
                };

                this.options.observable.registerUpdate(this._updateFunc);
            }

            if (!this.options.isVisible)
                this.element.css("display", "none");

            this._updateState();

            if (this.options.mode === "toast") {
                this._dateTime$.addClass("hidden");
                this._toggleLink$.addClass("hidden");
                this._meta$.addClass("hidden");
                this._center$.addClass("g-notification__center--toast");
                this._content$.addClass("g-notification__content--toast");
                this._progress$.addClass("hidden");
                this._commandBar$.addClass("hidden");

                //Pristupnost webu
                this.element.attr("role", "alert")
                    .attr("aria-live", "polite");

                this.element.on("mouseover", function (ev) {
                    if (that._toastTimer) return;
                    if (that._toastReadEndTimer) {
                        clearTimeout(that._toastReadEndTimer);
                        that._toastReadEndTimer = null;
                    }

                    that._toastTimer = setTimeout(function () {
                        that.expand();
                        var lastTop = 0;
                        var c = that._content$[0];
                        var start = new Date();
                        var checkTime = true;
                        var slowScrollDown = function () {
                            if (checkTime && (Gordic.Utils.DateTime.diff(start, new Date()) / 1000) < 5) {
                                setTimeout(slowScrollDown, 1000);
                                return;
                            }
                            checkTime = false;
                            lastTop = c.scrollTop;
                            c.scrollTop += 1;
                            if (lastTop < c.scrollTop)
                                setTimeout(slowScrollDown, 50);
                        }

                        slowScrollDown();
                        that._trigger("readStart");
                    }, 1000);
                });

                that.element.on("mouseleave", function () {
                    if (that._toastTimer) {
                        clearTimeout(that._toastTimer);
                        that._toastTimer = null;
                        that._toastReadEndTimer = setTimeout(function () { that._trigger("readEnd"); that._toastReadEndTimer = null; }, 1000); //Dame uzivateli jeste moznost se nad toast vratit
                    }

                    if (that._content$[0].scrollTop > 0)
                        that._content$[0].scrollTop = 0;
                });
            }

            this._updateVisibility();
        },
        _destroy: function () {
            this._left$.remove();
            this._center$.remove();
            this._right$.remove();

            if (this.options.observable instanceof GObservableObject)
                this.options.observable.unregisterUpdate(this._updateFunc);

            this.element.removeClass("gnotification");
        },
        _setOption: function (key, value) {
            if (key === "progress" && value !== null) //na hodnotu null chci progress odstranit
                value = $.extend(this.options.progress, value); //rozsirovat puvodni, at je mozne setovat pouze hodnotu current
            if (key === "defaultAction" && this.options.defaultAction)
                this.options.defaultAction.unregister(this._center$)
            this._superApply(arguments);
            if (key === "icon")
                this._updateIcon();
            else if (key === "badge")
                this._updateBadge();
            else if (key === "title")
                this._updateTitle();
            else if (key === "meta")
                this._updateMeta();
            else if (key === "content")
                this._updateContent();
            else if (key === "progress")
                this._updateProgress();
            else if (key === "dateTime")
                this._updateDateTime();
            else if (key === "isVisited")
                this._updateIsVisited();
            else if (key === "commandBar")
                this._updateCommandBar();
            else if (key === "isCollapsed")
                this.toggle();
            else if (key === "isVisible")
                this.element.css("display", value ? "" : "none");
            else if (key === "state")
                this._updateState();
            else if (key === "defaultAction" && this.options.defaultAction)
                this.options.defaultAction.register(this._center$)
        },
        _setOptions: function (options) {
            var doTrigger = this.options.isVisible === true || options.isVisible === true;
            this._superApply(arguments);
            if(doTrigger)
                this._trigger("change", null, { id: this.options.id, options: options });
        },
        _updateIcon: function () {
            var oldIcon$ = this._icon$;
            this._icon$ = $(iconBuilder.createIcon(this.options.icon));
            oldIcon$.replaceWith(this._icon$);
        },
        _updateBadge: function () {
            if (this._badge$.hasClass("gbadge")) this._badge$.gbadge("destroy");
            if (this.options.badge) this._badge$.gbadge(this.options.badge);
        },
        _updateTitle: function () {
            this._title$.empty().append(this.options.title);
        },
        _createMetaStr: function () {
            return Gordic.Templates.Formatters.datetime(this.options.dateTime) + (this.options.meta ? " | <b>" + this.options.meta + "</b>" : "");
        },
        _updateMeta: function () {
            this._meta$.empty().append(this._createMetaStr());
        },
        _createContent: function () {
            var $cnt = $(this._textFade);
            var cnt = this.options.content || "";
            if (typeof cnt === "string")
                return $cnt.add($("<span>" + cnt + "</span>"));
            
            if ($.isPlainObject(cnt)) {
                var template = "";
                if (this.options.isCollapsed && this.options.shortTemplate)
                    template = this.options.shortTemplate;
                else if (this.options.isCollapsed && this.options.fullTemplate)
                    template = this.options.fullTemplate;
                else if (!this.options.isCollapsed && this.options.fullTemplate)
                    template = this.options.fullTemplate;
                else if (!this.options.isCollapsed && this.options.shortTemplate)
                    template = this.options.shortTemplate;
                else
                    return JSON.stringify(cnt);

                return $cnt.add(Gordic.Templates.ensureTemplate(template).render(cnt));
            }

            throw new Error("gnotification(): content is not supported");
        },
        _updateContent: function () {
            this._content$.empty().append(this._createContent());
            if (!this.options.isCollapsed)
                this._content$.children(".js-text-fade").addClass("hidden");
        },
        _createDateTime: function () {
            var now = new Date();
            var dt = this.options.dateTime;
            if (typeof dt === "string")
                dt = new Date(dt);

            var dateTimeStr = Gordic.Templates.Formatters.datetime(dt);
            var time = dateTimeStr.substring(dateTimeStr.indexOf(" "), dateTimeStr.lastIndexOf(":"));

            if (dt.getDay() === now.getDay() && dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear())
                return "<div>jres:31150035</div><div>" + time + "</div>"; //dnes = vratit pouze cas//RC 31150035 : dnes

            return dateTimeStr.substr(0, dateTimeStr.lastIndexOf(".")); //DD.MM
        },
        _updateDateTime: function () {
            this._dateTime$.empty().append(this._createDateTime());
        },
        _updateIsVisited: function () {
            if (this.options.observable)
                this.options.observable.isVisited = this.options.isVisited;
            this.element.toggleClass("g-notification--not-visited", !this.options.isVisited);
        },
        _createProgress: function () {
            if (!this.options.progress)
                return null;

            var current = this.options.progress.current || 0;
            var max = this.options.progress.total || 100;
            var text = this.options.progress.text || "";
            var steps = "(" + current + " z " + max + ")";

            var $wrp = $("<div class='g-notification__progress' role='progressbar' aria-valuenow='"+current+"' aria-valuemin='0' aria-valuemax='" + max + "'>");
            $("<div class='js-gnotification-progress-text g-notification__progress-text'>")
                .appendTo($wrp)
                .append(text ? text + " " + steps : steps);

            $("<div class='g-notification__progressbar'>")
                .progressbar({
                    value: current,
                    max: max
                })
                .appendTo($wrp);

            return $wrp;
        },
        _updateProgress: function () {
            this._progress$.empty().append(this._createProgress());
        },
        _createCommandBar: function () {
            this._commandBar$.gbuttonpanel({
                params: this.options.commandBar,
                normalAlignedToLeft: false,
                mode: "link"
            });
        },
        _updateCommandBar: function () {
            if (this._commandBar$ && this._commandBar$.hasClass("gbuttonpanel"))
                this._commandBar$.gbuttonpanel("destroy");
            this._createCommandBar();
        },
        _updateVisibility: function () {
            //Uprava viditelnosti na update
            if (this.options.isCollapsed)
                this.collapse();
            else
                this.expand();
        },
        _updateState: function() {
            this.element.removeClass("g-notification--state-important g-notification--state-error g-notification--state-warning g-notification--state-success g-notification--state-info");
            this.element.addClass("g-notification--state-" + this.options.state);
        },
        collapse: function () {
            this.options.isCollapsed = true;
            this._toggleAction.update({ icon: "fa-chevron-down" });
            this._content$.addClass("g-notification__content--collapsed").children(".js-text-fade").removeClass("hidden");
            this._meta$.css("display", "none");
            this._progress$.find(".js-gnotification-progress-text").css("display", "none");
            this._commandBar$.css("display", "none");
            this.element.addClass("g-notification--collapsed");

            this._toggleLink$.attr("aria-expanded", "false");
            if (this._toggleLink$.hasClass("glink")) this._toggleLink$.glink("option", "ariaCaption", "jres:31150079"); //RC 31150079 : Rozbalit
        },
        expand: function () {
            this.options.isCollapsed = false;
            this._toggleAction.update({ icon: "fa-chevron-up" });
            this._content$.removeClass("g-notification__content--collapsed").children(".js-text-fade").addClass("hidden");
            this._meta$.css("display", "");
            this._progress$.find(".js-gnotification-progress-text").css("display", "");
            this._commandBar$.css("display", "");
            this.element.removeClass("g-notification--collapsed");
            
            this._toggleLink$.attr("aria-expanded", "true");
            if (this._toggleLink$.hasClass("glink")) this._toggleLink$.glink("option", "ariaCaption", "jres:31150080"); //RC 31150079 : Rozbalit
        },
        toggle: function () {
            if (this.options.isCollapsed)
                this.expand();
            else
                this.collapse();
        }
    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gnotificationlist.js 

(function ($) {
    "use strict";

    var idGenerator = {
        _current: 0,
        getId: function () {
            return "gid_" + (this._current++).toString();
        }
    };

    var iconBuilder;

    $.widget("gordic.gnotificationlist", {
        options: {
            notifications: null, // [], inicializacni notifikace, dale nejsou upravovany
            sort: "chrono",      // chrono|groups

            //udalosti
            change: null,        // (ev, {type: "add|update|remove", id: "", options: {}})
            refreshrequested: null, //(ev: JQueryEventObject) //uzivatel kliknul na tlacitko obnovit, doslo k prekresleni
            destination: null,   // HTMLElement|JQuery, cil animace (pokud jde o JQuery, bude mirit na prvni z kolekce)
            actionStarted: null
        },
        _groups: null,
        _notifications: null, //[]
        _toastDef: null,
        _toastQueue: null, //[]
        _toastBuff: null,  //[]
        _toastBuffSize: 3,
        _toastAnimationDuration: 300,
        _toastsStopped: false,     //zobrazovani novych toastu je pozastavene
        _toastDebounceTimer: null, //Debuounce timer, pokud prijde vice toastu k zobrazeni v kratkem case
        _toastVisibleDelay: 5,     //Jak dlouho ma toast zustat mezi animacemi zobrazeni a schovani?
        _toastCorrectionPromise: null,

        _create: function () {
            var that = this;
            this._toastDef = $.Deferred().resolve().promise();
            this._toastQueue = [];
            this._toastBuff = [];

            if (!iconBuilder)
                iconBuilder = new Gordic.Utils.IconBuilder();

            this.element.addClass("gnotificationlist g-notification-list");

            this.header$ = $("<div class='g-notification-list__header'>")
                .appendTo(this.element)
                .append("<span class='g-notification-list__header-title'>jres:31150036</span>") //RC 31150036 : Centrum notifikací
                .append($("<a class='g-notification-list__header-action g-link--no-underline'>")
                    .glink({
                        params: {
                            action: new GAction({
                                name: "clearAllAct",
                                caption: "jres:31150037", //RC 31150037 : ODSTRANIT VŠE
                                run: function (ev, ctx) { that.setAllHidden(); }
                            }),
                            ariaCaption: "jres:31150074", //RC 31150074 : Odstranit všechna oznámení
                        }
                    }))
                .append("<div class='clearfix'>");

            //#region Link pro moznosti serazeni zaznamu

            var $headerBar = $("<div class='g-notification-list__header-bar'>");

            $("<div style='text-align: right'>")
                .append($headerBar)
                .appendTo(this.header$);

            var switchSortFunc = function (mode) {
                that.options.sort = mode;
                that.refresh();
                defaultSortAct.update({ caption: this.caption });
                sortParams.caption = this.caption;
                sortParams.update({ caption: this.caption });
            };

            var alphabeticalGroupsSortAct = new GAction({
                name: "alphabeticalSortAct",
                caption: "jres:31150038", //RC 31150038 : Skupiny A-Z
                run: function (ev, ctx) {
                    switchSortFunc.call(this, "groups");
                }
            });

            var chronologicalSortAct = new GAction({
                name: "chronologicalSortAct",
                caption: "jres:31150039", //RC 31150039 : Chronologicky
                run: function (ev, ctx) {
                    switchSortFunc.call(this, "chrono");
                }
            });

            var defaultSortAct = new GAction({
                name: "defaultSortAct",
                caption: alphabeticalGroupsSortAct.caption,
                run: $.noop
            });

            var sortParams = new GObservableObject({
                type: "static",
                caption: "jres:31150040", //RC 31150040 : A-Z
                ariaCaption: "jres:31150077", //RC 31150077 : Změnit způsob řazení notifikací
                children: [
                    { action: chronologicalSortAct, ariaCaption: "jres:31150076" }, //RC 31150076 : Seřadit chronologicky
                    { action: alphabeticalGroupsSortAct, ariaCaption: "jres:31150075" } //RC 31150075 : Seřadit po skupinách podle abecedy
                ]
            });

            var refreshParams = {
                action: new GAction({
                    name: "refreshAct",
                    icon: "gi-refresh",
                    caption: "jres:31150041", //RC 31150041 : Obnovit
                    run: function (ev, ctx) {
                        that.refresh();
                        that._trigger("refreshrequested");
                    }
                })
            };

            $headerBar.gbuttonpanel({
                params: [sortParams, refreshParams],
                normalAlignedToLeft: false,
                mode: "link"
            });

            //#endregion
            this.options.notifications = this.options.notifications || [];
            this._notifications = [];

            this.options.notifications.forEach(function (n) {
                that.add(n, false, false);
            });

            this.element.on("gnotificationactionstarted.gnotificationlist", function (ev) {
                that._trigger("actionStarted");
            });

            this._refresh();
        },
        _destroy: function () {
            this.header$.remove();
            this.element.off(".gnotificationlist");
            this.element.removeClass("gnotificationlist");
        },
        _refresh: function () {
            if (!this._notifications)
                return;

            var that = this;
            this._groups = this._getGroups(this._notifications);

            this._groups
                .forEach(function (g, i) {
                    var $grp = that._createGroup(g);

                    g.notifications.forEach(function (n, i) {
                        var swipeTreshold = 100; /* px */
                        var $not = $("<div>")
                            .appendTo($grp)
                            .gnotification({
                                observable: n,
                                mode: "full",
                                change: function (ev, args) { that._notificationUpdated(ev, args); }
                            });

                        $not.gswipeable({
                            swiping: function (ev, args) {
                                var left = parseInt($not.css("left") || 0) + args.diffX;
                                var opacity = Math.abs(left) > swipeTreshold ? "0.3" : "1";

                                $not.css("left", left + "px")
                                    .css("opacity", opacity);
                            },
                            swiped: function (ev, args) {
                                if (args.diffX > swipeTreshold) {
                                    n.update({ isVisible: false });
                                    $not.css("left", "0px");
                                }
                                else { $not.animate({ "left": "0", "opacity": "1" }); }
                            },
                            cancelled: function (ev) { $not.animate({ "left": "0", "opacity": "1" }); }
                        });
                    });

                    $grp.appendTo(that.element);
                    that._updateGroupTitleVisibility($grp);

                    //$grp.sortable({
                    //    axis: "x",
                    //    //items: "> .gnotification",
                    //    //distance: 50,
                    //    //placeHolder: "g-notification-placeholder",
                    //    //forcePlaceholderSize: true,
                    //    //containment: "parent",    //dobre samotne

                    //    placeholder: {  //pri presouvani vklada prazdny prvek, ktery ma stejnou sirku jako presouvana polozka
                    //        element: function (elm) {
                    //            return $("<div class='g-notification-placeholder'>");//.width(elm.width())[0];
                    //        },
                    //        update: function (ui, placeholder) {
                    //            return;
                    //        }
                    //    }
                    //});
                });
        },
        _getGroups: function (nots) {
            //[{group: "", notifications: []}, ...]

            var that = this;
            var dic = { none: { group: "none", notifications: [] } };
            var groups = [dic.none];
            var sort = this.options.sort;

            if (sort === "groups") {
                nots.forEach(function (n, i) {
                    var group = n.group || "none";
                    if (dic[group] === undefined) {
                        dic[group] = { group: group, notifications: [] };
                        groups.push(dic[group]);
                    }
                    dic[group].notifications.push(n);
                });

                //serazeni group podle nazvu
                groups.sort(function (g1, g2) {
                    if (g1.group === "none")
                        return -1;

                    var grp1 = g1.group.toUpperCase();
                    var grp2 = g2.group.toUpperCase();

                    return grp1 < grp2 ? -1 : 1;
                });
            }
            else if (sort === "chrono")
                dic.none.notifications = this._notifications;

            //seradeni notifikaci v jednotlivych group podle dateTime
            groups.forEach(function (g, i) {
                that._sortNotsInGroup(g);
            });

            return groups;
        },
        _sortNotsInGroup: function (group) {
            group.notifications.sort(function (n1, n2) {
                return n2.dateTime - n1.dateTime;
            });
        },
        _createGroup: function (g) {
            var $grp = $("<div class='js-gnotification-list-group' data-group='" + g.group + "'>");
            $grp.append($("<span class='js-gnotification-list-grptitle g-notification-list__group-title'>" + g.group + "</span>").css("display", g.group === "none" ? "none" : ""));
            return $grp;
        },
        _showToasts: function () {
            var _this = this;

            if (this._toastsStopped) return;

            //1. provedeni korekce pozice vsech toastu
            this._createToastCorrectionPromise()
                .then(function () {
                    //2. vezmu z fronty cekajicich toastu a dam do bufferu
                    if (_this._toastBuff.length < _this._toastBuffSize && !(_this._toastQueue.length === 0 || _this._toastsStopped || _this._toastCorrectionPromise)) {

                        var prevTi = _this._toastBuff.length ? _this._toastBuff[_this._toastBuff.length - 1] : null;
                        var ti = _this._toastQueue.shift();
                        _this._toastBuff.push(ti);
                        return [ti, prevTi];
                    }
                    return $.Deferred().reject().promise();
                })
                .then(function (tiArr) {
                    //3. vytvorim animaci k zobrazeni
                    var ti = tiArr[0], prev = tiArr[1];
                    return _this._createToastShowAnimation(ti, prev);
                })
                .then(function (ti) {
                    //4. cekam na timer nebo az zmizi hover nad toastem
                    var t = _this._waitToastForTimeout(ti); //cekani
                    _this._showToasts(); //tady startuji dalsi...pomuzu si nejak???
                    return t;
                })
                .then(function (ti) {
                    //5. schovam toast
                    _this._createToastHideAnimation(ti);
                });
        },
        _createToastCorrectionPromise: function () {
            var def = $.Deferred();
            var _this = this;
            var oldest = this._toastBuff[0];
            var defs = [];

            if (oldest) {

                //Oprava z-index od toastu, ktery byl zobrazen nejposledneji az po ten, co tam visi nejdele.
                //Stavalo se, ze toasty, ktere maji byt dele zobrazene, prekryly skryvajici animaci pozdeji
                //zobrazene toasty.
                for (var i = this._toastBuff.length - 1; i >= 0; i--) {
                    var $toast = this._toastBuff[i].toast;
                    if ($toast.hasClass("ginlinedialog"))
                        $toast.ginlinedialog("moveToTop");
                }

                //Oprava pozice - drzeni toastu pri hornim okraji obrazovky.
                var nextTop = 0;
                for (var i = 0; i < this._toastBuff.length; i++) {
                    var ti = this._toastBuff[i];

                    (function (ti, top) {
                        var $toast = ti.toast;
                        var def = $.Deferred();
                        var actualTop = Math.ceil($toast.offset().top);

                        //Toast je tam, kde by mel byt, neni nutne nic posouvat s toleranci na 2px
                        if (Math.abs(top - actualTop) < 2)
                            return;

                        defs.push(def.promise());
                        $toast.stop(true, true);

                        $toast.ginlinedialog("animate",
                            { top: top },
                            {
                                easing: "linear",
                                duration: _this._toastAnimationDuration,
                                done: function () { def.resolve(); }
                            });
                    })(ti, nextTop);
                    nextTop += Math.ceil(ti.toast.outerHeight());
                }
            }

            if (defs.length) {
                this._toastCorrectionPromise = $.when.apply($, defs)
                    .then(function () {
                        _this._toastCorrectionPromise = null;
                        def.resolve();
                    });
            }
            else def.resolve();

            //Toto je jen pro sichr, obcas zustane z neznameno duvodu promisa viset :-/
            if (typeof oldest === "undefined") this._toastCorrectionPromise = null;

            return def.promise();
        },
        _createToastShowAnimation: function (toastInfo, prev) {
            ///<returns>JQuery.Promise<IGNotificationToastOptions></returns>
            var def = $.Deferred();
            var $toast = toastInfo.toast;
            var height = 0, top = 0;

            //Zobrazim
            height = $toast.ginlinedialog("open", $(window)).outerHeight();
            top = -height;

            //Udelam vypocet startovni pozice
            if (prev) {
                var prevToastTop = Math.ceil(prev.toast.offset().top);
                var prevToastHeight = Math.ceil(prev.toast.outerHeight());
                prev.toast.ginlinedialog("moveToTop"); //Predchozi toast musi byt v popredi

                top = prevToastTop + (prevToastHeight - height);
            }

            //Provedu korekci startovni pozice
            $toast.parent().css("top", top + "px");

            //Animuji zobrazeni
            $toast.ginlinedialog(
                "animate",
                { top: "+=" + height },
                {
                    duration: this._toastAnimationDuration,
                    done: function () { def.resolve(toastInfo); }
                });

            return def.promise();
        },
        _waitToastForTimeout: function (toastInfo) {
            var _this = this;
            var def = $.Deferred();
            var $toast = toastInfo.toast;
            var startLeftPosition = $toast.offset().left;
            var swipeOutTreshold = 150; /* px */
            var waitFunc = function () {
                if (!$toast[0]._toastTimer) {
                    $toast[0]._toastTimer = setTimeout(function () {
                        def.resolve(toastInfo);
                    }, toastInfo.options.delay * 1000);
                }
            }

            waitFunc();

            //Posloucham na udalosti notifikaci, kvuli pripadnemu pozastaveni skryti toastu
            $toast.off(".gnotevent");
            $toast.one("gnotificationreadstart.gnotevent", function () {
                _this._toastsStopped = true;

                if ($toast[0]._toastTimer) clearTimeout($toast[0]._toastTimer);

                $toast.one("gnotificationreadend.gnotevent", function () {
                    _this._toastsStopped = false;
                    def.resolve(toastInfo);
                });
            });

            //Swipe handling
            $toast.gswipeable({
                swiping: function (ev, args) {
                    var $inlineWrapper = $toast.parent();
                    var left = $inlineWrapper.offset().left + args.diffX;
                    var opacity = Math.abs(left - startLeftPosition) > swipeOutTreshold ? "0.3" : "1";

                    $inlineWrapper.css("left", left + "px");

                    $toast.css("opacity", opacity);
                    if ($toast[0]._toastTimer) {
                        clearTimeout($toast[0]._toastTimer);
                        $toast[0]._toastTimer = null;
                    }
                },
                swiped: function (ev, args) {
                    var $inlineWrapper = $toast.parent();
                    var left = $inlineWrapper.offset().left;

                    if (Math.abs(left - startLeftPosition) > swipeOutTreshold) {
                        _this._destroyToast(toastInfo);
                        _this._showToasts();
                    }
                    else {
                        $inlineWrapper.animate({ "left": startLeftPosition + "px" });
                        waitFunc();
                    }
                },
                cancelled: function (ev) {
                    $toast.css("opacity", "1");
                    waitFunc();
                }
            });

            return def.promise();
        },
        _createToastHideAnimation: function (toastInfo) {
            var $toast = toastInfo.toast;

            if (!$toast.is(":visible")) {
                this._destroyToast(toastInfo);
                this._showToasts();
                return;
            }

            var that = this;
            var height = Math.ceil($toast.outerHeight());
            $toast.ginlinedialog(
                "animate",
                { top: "-=" + height },
                {
                    duration: that._toastAnimationDuration,
                    done: function () {
                        that._destroyToast(toastInfo);
                        that._showToasts();
                    }
                });
        },
        _destroyToast: function (toastInfo) {
            var index = this._toastBuff.indexOf(toastInfo);
            var $toast = toastInfo.toast;

            if (index !== -1) this._toastBuff.splice(index, 1);
            $toast.remove();
            $toast[0]._toastTimer = null;
        },
        _createToast: function (not) {
            var $cnt = $("<div class='g-notification-toast detail-content' style='width: 400px;'>")
                .gnotification({ observable: not, mode: "toast" })
                .appendTo("body")
                .ginlinedialog({
                    closeButton: null,
                    customClass: "ginlinedialog__wrapper--shadow-less ginlinedialog__wrapper--border-less js-notification-toast",
                    //createClosed: false,
                    createClosed: true,
                    position: { my: "right bottom", at: "right top", of: window },
                    //showEffect: { effect: "slide", direction: "top", delay: 1 }
                });

            return $cnt;
        },
        _notificationUpdated: function (ev, args) {
            if (args.options.isVisible !== undefined)
                this._updateGroupTitleVisibility($(ev.target));

            this._dispatchEvent("update", ev, args);
        },
        _updateGroupTitleVisibility: function ($notif) {
            if (this.options.sort !== "groups")
                return;

            var $group = $notif.closest(".js-gnotification-list-group");
            if ($group.attr("data-group") !== "none") {
                var $groupNots = $group.children(".gnotification:visible");
                var $grpTitle = $group.children(".js-gnotification-list-grptitle");
                $grpTitle.css("display", $groupNots.length === 0 ? "none" : "");
            }
        },
        _dispatchEvent: function (name, ev, options) {
            this._trigger("change", ev, $.extend({ type: name }, options));
        },
        refresh: function () {
            ///<summary>Odstrani veskery obsah a vytvori ho znovu</summary>
            this.element.find(".js-gnotification-list-group").remove();
            this._refresh();
        },
        add: function (not, showToast, forceRefresh) {
            ///<summary>Prida oznameni, vygeneruje mu ID</summary>
            ///<param name='not' type='plainObject|GObservableObject'>Options pro notifikaci, v metode je doplneno id, pokud jiz neexistuje</param>
            ///<param name='showToast' type='Boolean'>True = zobrazi jako toast notifikaci, false = potichu prida do seznamu notifikaci</param>
            ///<param name='forceRefresh' type='Boolean'>Zavola metodu refresh(), ktera odstrani vsechna oznameni a vytvori je znovu</param>
            ///<returns type='GObservableObject'>
            ///Vraci instanci GObservableObject, ktery obsahuje vsechny property parametru not, kteremu je doplneno unikatni id 
            ///a na kterem lze volat metodu update({...}) s objektem, obsahujicim parametry pro zmenu notifikace.
            ///</returns>

            //NOTE: Prekresleni vsech oznameni by se asi melo dit na zobrazeni widgetu. Uzivatel by mohl neco cist nebo pracovat
            //      s nejakym oznamenim a asi je nechtene, aby mu obsah uskakoval. Proto se pak musi zavolat metoda
            //      'refresh()' rucne.
            //forceRefresh = forceRefresh === undefined ? true : forceRefresh;

            if (!not.id)
                not.id = idGenerator.getId();

            if (!not.dateTime)
                not.dateTime = new Date();

            if (!(not instanceof GObservableObject))
                not = new GObservableObject(not);

            this._notifications.push(not);

            if (forceRefresh)
                this.refresh(); //NOTE: Az se bude optimalizovat, po vytvoreni notifikace zavolat this._updateGroupTitleVisibility($notif)

            if (typeof showToast !== "undefined" /* && !this.element.is(":visible")*/) {
                if (typeof toast === "boolean") toast = { visible: showToast };
                this.showToast(not, showToast);
            }

            if (not.source && this.options.destination) {
                var $dest = $(this.options.destination);

                var $source = $(not.source);
                var fromPos = $source.offset();
                var toPos = $dest.position();

                var divStr = "<div class='g-notification-anidiv'/>";
                var $aniDiv = $(divStr)
                    .appendTo(document.body)
                    .height($source.height())
                    .css({ width: $source.outerWidth(), height: $source.outerHeight() })
                    .css({ top: fromPos.top, left: fromPos.left });

                $aniDiv.animate(
                    { top: toPos.top, left: toPos.left, width: $dest.outerWidth(), height: $dest.outerHeight() },
                    {
                        //easing: "linear",
                        duration: 300,
                        done: function () {
                            $aniDiv.remove();
                        }
                    });
            }

            this._dispatchEvent("add", null, not);

            return not;
        },
        //update: function () {}, //Neexistuje, update se provadi pres GObservableObject, ktery vraci metoda add()
        showToast: function (not, options /* :IGNotificationToastOptions */) {
            /// <summary>Zobrazi toast bez zarazeni do seznamu oznameni</summary>

            options = $.extend({ visible: true, delay: this._toastVisibleDelay }, options);

            if (!(not instanceof GObservableObject))
                not = new GObservableObject(not);

            if (!options.visible) return not;

            this._toastQueue.push({ toast: this._createToast(not), options: options, not: not });

            if (!this._toastDebounceTimer) {
                var _this = this;
                this._toastDebounceTimer = setTimeout(function () {
                    _this._showToasts();
                    _this._toastDebounceTimer = null;
                }, 500);
            }
            return not;
        },

        /** Vyprazni frontu vsech toastu */
        clearToasts: function () {
            //NOTE: Vyprazni i toasty, ktere nejsou zarazeny mezi notifikace. TSkala vsak tvrdi, ze pokud se chci podivat na centrum
            //      notifikaci, uz nepracuji kontextove a tyto toasty uz me asi nezajimaji.
            while (this._toastBuff.length) {
                var toastInfo = this._toastBuff.splice(0, 1)[0];
                var $toast = toastInfo.toast;
                $toast.stop().hide();
                if ($toast[0]._toastTimer) {
                    clearTimeout($toast[0]._toastTimer);
                    $toast[0]._toastTimer = null;
                }
            }

            this._toastQueue.splice(0, this._toastQueue.length);
        },
        get: function (isNew) {
            ///<summary>Vrati seznam notifikaci (observable obj.)</summary>
            ///<param name='isNew' type='Boolean|function|undefined'>
            /// - Boolean - true - vrati seznam notifikaci, ktere nebyly zobrazeny
            /// - Boolean - false - vrati seznam notifikaci, ktere byly zobrazeny
            /// - function - vrati seznam notifikaci podle filtru
            /// - bez arg - vrati vsechny notifikace
            ///</param>
            ///<return type='Array[GObservableObject]'></return>
            if (isNew === true)
                return this.findByFilter(function (n) { return !n.isVisited && n.isVisible !== false; });

            if (isNew === false)
                return this.findByFilter(function (n) { return n.isVisited; });

            if ($.isFunction(isNew))
                return this.findByFilter(filterFunc);

            return [].concat(this._notifications);
        },
        setAll: function (opts) {
            ///<summary>Nastavi argument vsem notifikacim</summary>
            ///<param name='opts' type='plainObject'>Options gnotification</param>
            this._notifications.forEach(function (n) {
                n.update(opts);
            });
        },
        setAllVisited: function() {
            ///<summary>Nastavi vsechna oznameni uvnitr jako zobrazena</summary>
            this.get(true).forEach(function (n) { n.update({ isVisited: true }); });
        },
        setAllHidden: function () {
            ///<summary>Schova vsechna oznameni</summary>
            this.findByFilter(function (n) { return n.isVisible !== false; })
                .forEach(function (n) { n.update({ isVisible: false }); });
        },
        setAllVisible: function () {
            ///<summary>Zobrazi vsechna skryta oznameni</summary>
            this.findByFilter(function (n) { return !n.isVisible; })
                .forEach(function (n) { n.update({ isVisible: true }); });
        },
        remove: function (id) {
            ///<summary>Odbere notifikaci z widgetu + odstrani z DOM</summary>
            ///<param name='id' type='string|plainObject|GObservableObject'>Id, plainObject nebo GObservableObject</param>
            var that = this;
            var not;
            if (typeof id === "string")
                not = this.findById(id);
            else if ($.isPlainObject(id)) {
                not = this.findById(id.id);
                id = id.id;
            }
            else if (id instanceof GObservableObject) {
                not = id;
                id = not.id;
            }
            else
                throw new Error("gnotificationlist.remove(): argument is not supported");

            var index = this._notifications.map(function (n) { return n.id; }).indexOf(id);
            if (index === -1)
                return;

            this._notifications.splice(index, 1);
            var $not = this.element.find("[data-notif-id=" + not.id + "]");
            if ($not.is(":visible"))
                $not.hide({ //NOTE: Toto je experiment, asi by se to melo zobrazovat i pri pouhem skryti oznameni???
                    effect: "slide", direction: "right", duration: 500, complete: function () {
                        that._updateGroupTitleVisibility($not);
                        $not.remove();
                    }
                });
            else
                $not.remove();

            //Odebrani z toastu
            var toasts = this._toastBuff.filter(function (t) { return t.not === not; });
            if (toasts.length > 0) {
                for (var i = 0; i < toasts.length; i++) {
                    this._destroyToast(toasts[i]);
                }
            }

            this._dispatchEvent("remove", null, not);
        },
        findByFilter: function (func) {
            ///<summary>Vyhleda notifikace podle funkce, vrati pole typu GObservableObject</summary>
            if (!this._notifications)
                return [];
            return this._notifications.filter(func);
        },
        findById: function (id) {
            ///<summary>Vyhleda podle id, vrati instanci GObservableObject nebo null</summary>
            ///<returns type='GObservableObject'>GObservableObject nebo null</returns>
            var obsArr = this.findByFilter(function (n) { return n.id === id; });
            if (obsArr.length === 1)
                return obsArr[0];
            if (obsArr.length > 1)
                throw new Error("Multiple id was founded");
            return null;
        },
        findByName: function (name) {
            ///<summary>Vyhleda notifikace podle option 'name' a vrati je jako pole typu GObservableObject</summary>
            return this.findByFilter(function (n) { return n.name === name; });
        }
    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gfilefield.js 


(function ($) {
    "use strict";

    $.widget("gordic.gfilefield", $.gordic.gcontrolbox, {

        options: {
            /** content, na kterem je umistene policko */
            parentContent: null,
            /** Vždy se jedná o více hodnot souboru */
            multi: true,
            /** Nastavení prázdné hodnoty */
            emptyValue: [],
            /**
             * Option, zda je povoleno v políčku uploadovat soubory
             * @type {boolean}
             * @default true
             */
            canUpload: true,
            /**
             * placeholder
             * @type {null| string| () => string}
             */
            placeholder: null,
            /**
             * Option, zda je povoleno stahovat na neaktivním políčku
             * @type {boolean}
             * @default false
             */
            downloadOnDisabledField: false,
            /**
             * pripravi soubor na serveru - prenos mezi vrstvami (např. přes APG)
             */
            prepareFilesOnServer: false,
            /**
             * necha napriklad inializacni guid
             */
            keepInitialGuid: false,
            /** Getter na získání vlastních dat */
            customData: $.noop,
            /** Odkaz na obsluhu neznamych GUID*/
            fieldDownloaderClass: "Gordic.Gui.WebControls.GFileServiceProvider",
            /** Odkaz na obsluhu neznamych GUID*/
            fieldRemoverClass: "Gordic.Gui.WebControls.GFileServiceProvider",
            /** Maximálni velikost souboru */
            maxFileSize: undefined,
            /** Prijimane pripony souboru */
            acceptExtension: "",
            /** Maximalni pocet souboru v policku */
            maxFileCount: 0,
            /** Velikost jednoho souboru v B */
            maxOneFileSize: undefined,
            /** Nastavení change jen jednou pri multi uploadu **/
            triggerOnceMultiChanged: false,
            /** trida elementu(souboru) */
            itemClass: null,
            /*mod policka add - default, replace*/
            mode: "add",
            /** sirka elementu */
            itemWidth: "w-12",
            /** trvanlivost docasneho souboru v minutach*/
            lifetime: undefined,
            /** zobrazeni buttonu vertikalne */
            verticalButtons: true,
            /**
             * metoda urcuje, ktere radky lze smazat - true, jinak false
             * defaultne nejdou smazat ty zaznamy, ktere nemaji guid
             * @param {any} row datovy radek
             * @returns {boolean} Výraz podle kterého se bude určovat, zda může být soubor smazán, platí pro celé políčko
             */
            itemDeletable: function (row) { return !!row.guid; },
            /**
             * metoda urcuje, ktere radky lze stahnout - true, jinak false
             * defaultne jdou stahnout pouze ty zaznamy, ktere nejsou nove, maji identifikator a nejsou chybne
             * @param {any} row datovy radek
             * @returns {boolean} Výraz podle kterého se bude určovat, zda může být soubor stahnut, platí pro celé políčko
             */
            itemDownloadable: function (row) {
                return !row.isNew && row.guid && !row.error;
            },
            /**
            * Obsluha chyb   
            * @param {Event} ev Událost
            * @param {any} obj Objekt předávaný z triggeru
            */
            fileError: function (ev, obj) {
                if (obj.action === "upload") {
                    GDlg.warning(obj.reason && typeof (obj.reason) === "string" ? obj.reason : "jres:31850023"); //RC 31850023 : Chyba při nahrávání souboru na server. Tato chyba může být způsobena chybným nastavením dočasného adresáře.
                }
            },

            /**
             * Šablona pro zobrazení v políčku
             * @param {any} row Řádek dat
             * @returns {string} Šablona podle které se zobrazí obsah políčka
             */
            itemTemplate: function (row) {
                var secondRowTemplate = row.fileDescription ?
                    ("<span class='{0}'><i>{2}" + (row.fileSize != null ? " ({1})" : "") + "</i></span>") :
                    ("<span class='{0}'>{1}</span>");

                var secondRow = secondRowTemplate.format(row.error ? "filefield-error" : "", row.fileSize, row.fileDescription);

                if (row.guid) {
                    return ("<div class='fa {2} minifoto {1}'></div><span class='{1}'><b>{0}</b></span><br>{3}").format(row.filename, row.error ? "filefield-error" : "", row.fileTypeIcon ? row.fileTypeIcon : "fa-file-o", secondRow);
                }
                else {
                    return ("<div class='js-cancel-fileaction'><div class='js-field-content'><div class='fa fa-spinner fa-pulse fa-3x fa-fw minifoto'></div><span class='{1}'><b>{0}</b></span><br>{2}</div><div class='js-cancel-filefield'><i class='fa fa-stop-circle-o w-h js-file-hover'></i></div></div>").format(row.filename, row.error ? "filefield-error" : "", secondRow);
                }

            },
            /**
             * Model funkce u políčka
             * @param {string} operation Operace s modelem
             * @param {any} dto Dto s kterým model pracuje
             * @param {string} modelOptions Předávané options
             * @returns {string|undefined|any} Pro různé operace vrací různé výsledky(pro apply nic nevrací, pro collect vratí naplněné dto, jestliže nezná operaci vrací stringovou hodnotu) 
             */
            model:
                function (operation, dto, modelOptions) {
                    var key = $(this).gfield("option", "name") || "fileField";
                    switch (operation) {
                        case "apply":  // naplneni multivalue policka z DTO
                            var val = [];
                            var fileInfo = dto[key];
                            if (fileInfo)
                                for (var index = 0; index < fileInfo.length; index++) val.push(fileInfo[index]);
                            $(this).gfield("setValue", val);
                            return;
                        case "collect": // naplneni DTO hodnotou z multivalue policka (vraci vzdy pole)                                
                            dto[key] = [];
                            var values = $(this).gfield("getValue");
                            for (var field = 0; field < values.length; field++) {
                                var item = $.extend({}, values[field]);
                                Array.prototype.push.apply(dto[key], [
                                    {
                                        error: item.error,
                                        fileDescription: item.fileDescription,
                                        fileSize: item.fileSize,
                                        fileTypeIcon: item.fileTypeIcon,
                                        filename: item.filename,
                                        guid: item.guid,
                                        isNew: item.isNew,
                                        sizeB: item.sizeB
                                    }
                                ]); // 


                            }

                            return dto[key];
                    }
                    return "fileField"; // model="fileField" pro pouziti vychoziho procesoru pro operace kterym nerozumime (validations, validators, ...)
                }

        },
        _create: function () {
            this._value = []; // null
            this._asyncValue = {};
            this._removedFiles = {};
            
            var _this = this;
            this.inf = {};
            var input = $("<input type='file' name='file[]' multiple='' accept='" + this.options.acceptExtension + "' />");
            this.downloading = 0;
            /**
             * Validatory 
             */
            this.options.validators = (this.options.validators || []).concat([
                /** velikost jednoho souboru */
                new Gordic.Validators.Base({
                    validate: function (value, field) {
                        var filesSize = "";
                        var maxSize = _this.options.maxOneFileSize;
                        for (var index = 0; index < value.length; index++) {
                            if (_this.checkOneFileMaxSize(value[index])) {
                                //if ((value[index].isNew) && (maxSize !== 0 && value[index].file.size > maxSize)) {
                                filesSize = filesSize + value[index].filename + ", ";
                            }
                        }
                        var message = "";
                        if (filesSize) {
                            this.stopping = true;

                            this.message = "jres:31850009".format(filesSize.slice(0, -2)); //RC 31850009 : Velikost souboru {0} je větší než je nastavená
                            _this.setValue(value, { triggerChange: false });
                            return false;
                        }
                        else
                            return true;
                    }
                }),
                /** pripona */
                new Gordic.Validators.Base({
                    validate: function (value, field) {
                        var filesExtensions = "";
                        for (var index = 0; index < value.length; index++) {
                            if (_this.checkFileExtension(value[index])) {
                                //if ((value[index].isNew) && value[index].filename && allowedExtension.indexOf(value[index].filename.split('.').pop()) === -1) {
                                filesExtensions = filesExtensions + value[index].filename + ", ";
                            }
                        }

                        if (filesExtensions) {
                            this.stopping = true;
                            this.message = "jres:31850008".format(filesExtensions.slice(0, -2)); //RC 31850008 : {0} má nepovolenou příponu
                            _this.setValue(value, { triggerChange: false });
                            return false;
                        }
                        else
                            return true;
                    }
                }),
                /** limit velikosti souboru */
                new Gordic.Validators.Base({
                    validate: function (value, field) {
                        var maxSize = _this.options.maxFileSize;
                        var filesSize = 0;
                        /*for (var index in value) {

                            filesSize = filesSize + value[index].sizeB;
                        }*/
                        if (_this.checkMaxSizeFiles(value, 0, true)) {
                            //if (maxSize !== 0 && filesSize > maxSize) {
                            this.stopping = true;
                            this.message = "jres:31850007"; //RC 31850007 : Překročený limit velikosti souborů
                            return false;
                        }
                        else
                            return true;
                    }
                }),
                /** ma validni vsechny zaznamy  */
                new Gordic.Validators.Base({
                    validate: function (value, field) {
                        var notValidArray = value.filter(function (value) { return value.guid === value.id; });
                        var errorNotValidArray = notValidArray.filter(function (value) { return value.error; })

                        if (notValidArray.length > 0) {
                            this.stopping = true;
                            var message = "jres:31850024" //RC 31850024 : Policko obsahuje 
                            if (errorNotValidArray.length > 0 && notValidArray.length === errorNotValidArray.length) {
                                message = message + "jres:31850025"; //RC 31850025 : chybně nahrané soubory
                            }
                            else if (notValidArray.length === errorNotValidArray.length) {
                                message = message + "jres:31850026"; //RC 31850026 : ješte nenahrané soubory
                            }
                            else {
                                message = message + "jres:31850027"; //RC 31850027 : chybně nahrané a ješte nenahrané soubory
                            }

                            this.message = message; //RC 31850007 : Překročený limit velikosti souborů
                            return false;
                        }
                        else
                            return true;
                    }
                })
            ]);

            /** obsluha uploadu */
            input.appendTo(this.element);
            input.hide();
            input.change(function (ev) {
                var files = ev.target.files;
                if (!_this.options.preUploadDelegate || _this.options.preUploadDelegate.call(_this.element, files)) {
                    _this.uploadFile.call(_this, _this.fileToDto(files));
                    ev.target.value = "";
                }

            });

            //var dropzoneDiv = $("<div class='gfilefield-dropzone'>");
            //dropzoneDiv.hide();
            //dropzoneDiv.appendTo(this.element);
            //this.dropzoneDiv = dropzoneDiv;

            this.inputDiv = input;

            var action = new GAction({
                name: "upload", run: function (ev) {
                    _this.openFileUploadDialog();
                }
            }) 

            if (this.options.canUpload) {
                _this.options.buttons = [
                    {
                        icon: "fa-cloud-upload",
                        captionVisible: 'never',
                        caption: 'jres:31750294', //RC 31750294 : Nahrát soubor
                        action: action
                    }];
            }

            this._superApply(arguments);

            this.actions = new GActionList([action]);
           
            this.dropzoneController = new Gordic.Widget.GDropzoneManager({
                dropzoneElements: [],
                dragLeave: function (ev) {
                    var elem = $(ev.currentTarget).closest(".gfilefield");
                    if (elem.length === 0) return;
                    _this.element.css("height", "");
                },
                dragEnter: function (ev) {
                    var elem = $(ev.currentTarget).closest(".gfilefield");
                    if (elem.length === 0) return;

                    var height = elem.height();
                    var heightTable = elem.find(".gfield-table").height();
                    _this.element.css("height", height < heightTable ? heightTable : height);

                },
                processingDroppedFilesComplete: function (files) {
                    var dtoList = _this.fileToDto(files);
                    _this._trigger('drop', null, { files: dtoList });
                    _this.uploadFile(dtoList);
                    _this.element.css("height", "");
                },
                processingPastedFiles: function (files) {
                    var dtoList = _this.fileToDto(files);
                    _this._trigger('paste', null, { files: dtoList });
                    _this.uploadFile(dtoList);
                    _this.element.css("height", "");
                }
            })




            this.element.addClass("gfilefield gfieldassist-ignore");
            var parentCnt = this.options.parentContent || $.content(this.element);
            this.fileSrv = new GFile(parentCnt);
            this.fileInfoSrv = !!parentCnt ? parentCnt.createServiceContent("Gordic.Gui.WebControls.GFileInfoServiceProvider") : new GContent("Gordic.Gui.WebControls.GFileInfoServiceProvider");
        },

        _init: function () {
            var _this = this;

            this._superApply(arguments);
            this.fieldInput.addClass("hidden");

        },
        _destroy: function () {
            this.element.removeClass("gfilefield");
            //pnovak - nemel bych zde uvolnit vsechny soubory?
            this.fileSrv.destroy();
            if (this.fileInfoSrv) {
                this.fileInfoSrv.close();
            }
            this._superApply(arguments);
        },

        _setOption: function (key, value) {
            if (key === "disabled" && Gordic.Utils.isInDOM(this.element)) {
                this.setDropzonesVisibility(value);
                var downloadBtn = this.element.find(".js-downloadBtn");
                var otherButtons = this.element.find(".js-hideOnDisabled")
                downloadBtn.toggle(!value || this.options.downloadOnDisabledField);
                otherButtons.toggle(!value);
            }
            this._super(key, value);
        },


        _createValueItem: function (value, template, tooltipTemplate, index, close) {
            var _this = this;
            var itemDiv = $("<div class='gfilefield-item'>").addClass($.isFunction(this.options.itemClass) ? this.options.itemClass(value) : this.options.itemClass).attr("data-index", index).data("data-row", value).append(template.render(value));
            var progressLine = $("<div class='gfilefield-progline' style='width:0rem'>").addClass(this.options.itemWidth);

            var div = $("<div class='gfilefield-itemc'>").addClass(this.options.itemWidth).append(itemDiv).append(progressLine);


            /** Nahled na klik */
            itemDiv.on("click", function (e) {
                if (_this.options.disabled) return; //|| value.error
                if (itemDiv.find(".js-cancel-fileaction").length !== 0) {
                    if ((value.cid || value.guid) && _this.inf[value.cid || value.guid].downloadCT) {
                        var downloadCT = _this.inf[value.cid || value.guid].downloadCT;
                        downloadCT.xhr.abort();
                        value.guid = downloadCT.guid;
                        value.fileDescription = downloadCT.description;
                        _this._refreshValueItems();

                    }
                    else if (value.id && _this.inf[value.id] && _this.inf[value.id].cancellationToken) {
                        _this.inf[value.id].cancellationToken.cancel();
                        var ind = itemDiv.attr("data-index");
                        var val = _this.getValue().slice();
                        val.splice(ind, 1)[0];
                        _this.setValue(val);

                    }

                }
                else {
                    _this._trigger("fileSelected", e, { fileInfo: value, customData: _this.options.customData.call(_this) });
                }

            });
            if (value.error) {
                $(itemDiv).gtooltip({ customClass: "g-state-error", tooltip: value.errorMsg });
            }

            /** Tlacitko na smazani*/
            if (index != null && close !== false && (this.options.itemDeletable === true || ($.isFunction(this.options.itemDeletable) && this.options.itemDeletable(value)))) {
                var btnClose = $("<span class='button-close gi gi-window-close js-hideOnDisabled'>").click(function (e) {
                    if (_this.options.disabled) return;

                    var val = _this.getValue().slice();
                    var ind = $(this).parent().find(".gfilefield-item").attr("data-index");
                    _this.removeFile(value).then(function () {
                        var removed = val.splice(ind, 1)[0];
                        _this.inf[removed.guid] = null;
                        _this.setValue(val);
                        if (!_this.itemHasError()) {
                            _this.resetErrors();
                        }
                        e.preventDefault();
                        _this.fieldInput.focus();
                    }, function () {
                        if (!_this.itemHasError("FileRemoveError")) {
                            _this.resetErrors("FileRemoveError");
                        }
                        _this.setError("jres:31850020".format(value.filename), "warning", "FileRemoveError"); //RC 31850020 : Soubor {0} nebyl smazán
                        _this.setValue(val, { triggerChange: false });
                    });

                });
                this._addItemButton(div, btnClose);
                btnClose.toggle(!this.options.disabled);
            }

            if (index != null && close !== false && value.error) {
                var btnRepeat = $("<span class='fa fa-repeat js-hideOnDisabled'>").click(function (e) {
                    if (_this.options.disabled && !_this.options.downloadOnDisabledField) return;

                    var val = _this.getValue().slice();
                    var item = val.splice($(this).parent().find(".gfilefield-item").attr("data-index"), 1)[0];

                    //_this.setValue(val);
                    if (item.lastAction === "download") {
                        item.error = false;
                        _this.downloadFile(item);
                    }
                    else if (!_this.options.disabled) { // repeat na upload akci nelze při disabled políčku provést
                        _this.resetErrors("maxFilesSize");
                        _this.uploadFile([item]);
                    }



                });
                this._addItemButton(div, btnRepeat);
                btnRepeat.toggle(!this.options.disabled);
            }
            /** Tlacitko na stazeni */
            if (index != null && close !== false && (this.options.itemDownloadable === true || ($.isFunction(this.options.itemDownloadable) && this.options.itemDownloadable(value))) && value.guid) {
                var downloadButton = this._createDownloadButton();

                this._addItemButton(div, downloadButton);
                downloadButton.toggle(!(this.options.disabled && !this.options.downloadOnDisabledField));
            }

            div.addClass("gfilefield-list").not(".ui-state-disabled").click(function (e) {
                if (_this.options.disabled) return;
                // _this._changeListItemState($(this));
            })

            div.addClass("gfilefield-multi");
            if (tooltipTemplate) div.gtooltip({ tooltip: tooltipTemplate.render(value) });

            if (this._trigger("itemcreated", null, [div.get(0), value, index, this._addItemButton.bind(this, div)]) === false)
                div = $();

            return div;
        },
        _createDownloadButton: function () {
            var _this = this;
            return $("<span class='fa {0} js-downloadBtn'>".format(this._uploading ? "fa-spinner fa-spin" : "fa-cloud-download")).click(function (e) {
                if ((_this.options.disabled && !_this.options.downloadOnDisabledField) || $(e.currentTarget).hasClass("fa-spinner")) return;

                var val = _this.getValue().slice();
                var item = val.splice($(this).parent().find(".gfilefield-item").attr("data-index"), 1)[0];

                if (item) {
                    _this.downloadFile(item);
                }

                e.preventDefault();   //click chceme propagovat kvuli zachovani focusu.......  ale zase nechceme otevirani dropdownu :/ zkusime nastavit focus rucne
                //_this.fieldInput.focus();
            });
        },
        _refreshValueItems: function () {
            var _this = this;
            var item = this.valueContainer.find(".gfilefield-itemc");
            item.remove();
            var template = Gordic.Templates.ensureTemplate(this.options.itemTemplate);
            var tooltipTemplate = this.options.itemTooltipTemplate ? Gordic.Templates.ensureTemplate(this.options.itemTooltipTemplate) : null;

            var registeredVals = [];

            if ($.isArray(_this._value)) // pridame vsechny hodnoty z values, ktere nejsou v listu
                _this._value.forEach(function (val, idx) { if (!registeredVals[idx]) _this.fieldInput.before(_this._createValueItem(val, template, tooltipTemplate, idx)/*.addClass("ui-state-active")*/); });
            //else if (!registeredVals[-1] && _this.hasValue())
            // _this.fieldInput.before(_this._createValueItem(_this._value, template, tooltipTemplate, -1).addClass("ui-state-active"));
            //_this._setInputState(true);

            var placeholderTemplate = this.options.placeholder ? Gordic.Templates.ensureTemplate(this.options.placeholder) : null;
            var placeholderIsVisible = this._value.length === 0 && placeholderTemplate !== null;
            this.placeholderElement.toggle(placeholderIsVisible);
            if (placeholderIsVisible) {
                this.placeholderElement.html(Gordic.Templates.resolve(placeholderTemplate, null, { widget: this.element }));
            }

            this._setInputState(true);
            this.element.find(".js-cancel-fileaction").hover(function () { $(this).find(".js-file-hover").removeClass("w-h") }, function () { $(this).find(".js-file-hover").addClass("w-h") })
        },

        _createInputs: function (parent) {
            this._superApply(arguments);
            this.valueContainer = $("<div class='w-12 gfilefield-vc'>").appendTo(parent);
            this.placeholderElement = $("<div class='gfilefield-placeholder'>").appendTo(this.valueContainer);
            this.fieldInput = $("<INPUT type='text'>").attr("tabindex", this.options.tabIndex).addClass("gfield-input").appendTo(this.valueContainer);
        },

        getValue: function () {
            // if ($.isArray(this._value) && this._value.length === 0) return null;
            return this._value;
        },

        setValue: function (value, flags) {
            if (typeof value == "undefined") return;
            if (typeof flags === "boolean") flags = { valid: flags };
            else flags = flags || { valid: true };

            if (value == this.options.emptyValue && $.isArray(this.options.emptyValue)) value = value.slice(); // pro multi je potreba udelat kopie pole, jinak se nove itemy vkladaji instance do emptyValue
            var _this = this;
            var old = JSON.stringify(this._value);


            //            if ($.isArray(value)) value = value.map(function (it) { return _this._isNullValue(it) ? null : it; }); // reseni NULL objektu z modelu (napr.: {ico: null, ixs_fun: null})


            if (this.options.multi && $.isArray(value)) value = value.map(function (it) { return _this._isNullValue(it) ? null : it; }); // reseni NULL objektu z modelu (napr.: {ico: null, ixs_fun: null})

            this._valuePromise = value === null ? this.options.emptyValue : value;
            if (this._valuePromise === null && this.options.multi === true) return; // v multi rezimu se do _valuePromise null dostane jen kdyz je to addValue(null), coz zaignorujeme (value===null je vyhodnoceno v predchozim radku jako value=emptyValue=[])

            if (typeof this._valuePromise == "undefined") { // verifikace hodnotu prohlasila za vadnou
                this.fieldInput.addClass("invalid");
                this.setError(_this._verifyError);
                if (!this.options.multi || $.isArray(value))
                    this.setValue(this.options.emptyValue, $.extend({}, flags, { valid: true, persistInputValue: ichanged !== false }));  // hodnota policka zustava jen pokud ji vlozil uzivatel. Pri programovem setValid s nevalidni hodnotou se policko ma asi resetovat? (nebo dat spatnou hodnotu do value kvuli renderu obsahu, ale getValue bude nekonzistentni...)
                return;
            } else if (!this.options.multi) // verifikace prosla a jedna se o single-value policko NEBO o full value pro multi-value policko
                this._value = this._valuePromise;
            else if ($.isArray(this._valuePromise))
                this._value = this._valuePromise.slice();
            else if ($.isArray(this._value) && !flags.initialValue) { // verifikace prosla, jedna se o single value pro multi-value policko a hodnota je jiz []
                if (this._value.indexOf(this._valuePromise) < 0) // kontrola na unikatnost
                    this._value = this._value.concat([this._valuePromise]);
            } else this._value = [this._valuePromise]; // verifikace prosla, jedna se o single value pro multi-value policko ale hodnota je null (nebo neco neznameho)

            this._valuePromise = null;
            //if (this._resolvingPromise) this._resolvingPromise.resolve();
            //if (flags.valid !== false && flags.persistInputValue !== true) this.fieldInput.gautocomplete("close");  // zavreni v pripade clear 

            this._superApply(arguments);

            //if (this.options.graphicInput) {
            this._refreshValueItems();
            if (flags.persistInputValue !== true) {
                this.fieldInput.val("");
                this._setInputState(false);
            }

            if (flags.triggerChange !== false && old != JSON.stringify(this._value))
                this._trigger("change", null, { value: this.getValue(), flags: flags });
        },

        _setInputState: function (widthRefresh) {
            if (this.options.graphicInput) {
                var _this = this;
                var invis = this.fieldInput.is(".invisible");
                this.fieldInput.toggleClass("invisible", this.options.graphicInput === "hidden" || (this.options.graphicInput === "oninput" && !this.fieldInput.val()));
                if (this.options.graphicInput === "hidden" && this.fieldInput.val()) {
                    window.clearTimeout(this._inputTimer);
                    this._inputTimer = window.setTimeout(function () { if (_this.loading !== true) _this.fieldInput.val(""); else _this._setInputState(false); }, 1500);
                }
                this.valueContainer.find(".gfilefield-itemc.ui-state-selected").removeClass("ui-state-selected");
                // vypocet volneho mista pro inputField (jednoducha metoda: predpoklada fixni sirku itemu, zarovnatelnou na 100%. Patri zmenit na neco komplexnejsiho, kdyby to nestacilo
                widthRefresh = widthRefresh || (invis && !this.fieldInput.is(".invisible")); // pri zobrazeni radeji prepocitame (castecna obrana proti resize problemum)
                if (widthRefresh) {
                    var last = this.valueContainer.find(".gfilefield-itemc:last");
                    var w = (last.length ? Math.ceil(last.position().left /*- this.valueContainer.position().left*/ + (last.attr("offsetWidth") || last.outerWidth(true))) : 0) + 1;
                    var nw = 100 - (w === 1 ? 1 : Math.ceil((w / (this.valueContainer[0].offsetWidth || this.valueContainer.width())) * 100));
                    if (this.options.itemWidth || nw < 10) { // priznak pouziti relativni sirky => pouzijeme procenta
                        this.fieldInput.css("width", (nw > 10 ? nw : 100) + "%");
                    } else // neznama/variabilni sirka => pouzijeme pixely (tenhle rezim nema rad resize, pokud se polozky prekladaji...)
                        this.fieldInput.css("width", "calc(100% - " + w + "px)");
                }
            }
        },

        _addItemButton: function (itemDiv, btn) {
            var buttonCount = itemDiv.find(".button-item").length;

            btn.addClass("button-item").css("right", this._calculateButtonOffset(buttonCount)/*+ 0.125*/ + "rem"); //posun přidávaného tlačítka (nezapočítávat border, protože filefield item nemá border)
            itemDiv.prepend(btn).find(".gfilefield-item").css("padding-right", this._calculateButtonOffset(buttonCount + 1) + "rem"); //zmenšit místo pro item o nově přidané tlačítko (count+1), border nepočítat protože je to padding-right
        },
        _calculateButtonOffset: function (buttonCount) {
            return buttonCount + buttonCount * 2 * 0.125; // počet tlačítek + za každé o 0,125 z každé strany (count*2) - správně by mělo být 0.25rem ale to je moc od sebe a ne každé tlačítko má přesně 1rem na šířku(záleží na ikoně), drobný překryv to řeší.
        },
        _isNullValue: function (value) {
            if (value === null || typeof value === "undefined") return true;
            if (!$.isPlainObject(value)) return false;

            var keysToCheck = (this.options.data && $.isArray(this.options.data.keys) && this.options.data.keys) || Object.keys(value) || [];
            return keysToCheck.every(function (it) { return (value[it] === null || typeof value[it] === "undefined"); }); // undefined - protoze keys v readeru mohou obsahovat klice, ktere v hodnote vubec nejsou
        },

        _processModel: function (operation, dtoStor, modelPart, valueStor, valuePart, first, modelOptions) {
            var rx = /([^\[]+)(?:\[([^\]]+)\])?/; // "model.items[ixs]" => ["model.items", "ixs"]
            var modelParts = rx.exec(modelPart);
            var valueArray, dtoArray;
            switch (operation) {
                case "apply":
                    dtoArray = dtoStor.get(modelParts[1]);
                    if (!dtoArray || !$.isArray(dtoArray)) return;
                    if (modelParts.length === 3 && modelParts[2])
                        dtoArray = dtoArray.map(function (it) { return new GStor(it).get(modelParts[2]); });
                    valueArray = (first ? [] : valueStor.get("value"));
                    if (valuePart)
                        dtoArray = dtoArray.map(function (it, idx) {
                            var obj = valueArray[idx] || {};
                            return new GStor(obj).set(valuePart, it).get();
                        });

                    valueStor.set(["value"], dtoArray);
                    return;
                case "collect":
                    valueArray = valueStor.get("value").map(function (it) { return valuePart ? new GStor(it).get(valuePart) : it; });
                    if (modelParts.length === 3 && modelParts[2]) { // obsahuje mapovaci cast do modelu
                        dtoArray = (first ? [] : dtoStor.get(modelParts[1])); // ziskame aktualni pole modelu
                        if (!$.isArray(dtoArray)) dtoArray = [];
                        valueArray = valueArray.map(function (it, idx) { // kazdou polozku noveho value prevedem na objekt s urcenym zanorenim a rozsirime o puvodni hodnotu z modelu na stejnem indexu (z minulych modelParts)
                            var obj = new GStor({}).set(modelParts[2], it).get();
                            return $.extend({}, dtoArray[idx], obj);
                        });
                    }
                    dtoStor.set(modelParts[1], valueArray);
                    return;
                case "validators":
                case "validations": this._super(operation, dtoStor, modelParts[1], valueStor, valuePart, first, modelOptions); return; // zbavime se casti za [] pokud existuje, validuje se jen primary field
                default: throw "GField widget: _processModel, unknown operation: " + operation;

            }
        },


        openFileUploadDialog: function () {
            if (this.options.canUpload && this.inputDiv) {
                this.inputDiv.trigger("click");
            }
        },

        itemHasError: function () {
            var values = this._value;
            for (var index = 0; index < values.length; index++) {
                if (values[index].error)
                    return true;
            }
            return false;
        },
        removeFile: function (row) {
            var _this = this;
            var def = $.Deferred();
            if (!row.error) {
                return this.fileSrv.removeFile(row.guid, this.options.fieldRemoverClass).then(function () {
                    _this.setValue(_this._value.filter(function (i) {
                        return i.guid !== row.guid;
                    }));
                    if (_this.options.prepareFilesOnServer) {
                        _this.fileSrv.cleanUpFile(row.guid);
                    }
                    _this._trigger("fileRemoved", null, { fileInfo: row, customData: _this.options.customData.call(_this) });
                });
            }
            else {
                return def.resolve().promise();
            }
        },

        downloadFile: function (row) {
            this.actions["upload"].update({ enabled: false, icon: "fa-spinner fa-spin" });
            this.downloading = this.downloading + 1;
            var _this = this;
            
            row.lastAction = "download";
            if (!row.error) {

                //var doc = new GDocument(this);
                var oldGuid = row.guid;
                var oldDescription = row.fileDescription;
                _this._trigger("downloadStarted", null, { fileInfo: row, customData: _this.options.customData.call(_this) });
                
                var xhr = new XMLHttpRequest();
                //12.10. pnovak - pridan extend kvuli JQuery 3.6, kdy se z row smaze guid a nestihne se prenest na server
                var i = this.fileSrv.download($.extend({}, row), this.options.fieldDownloaderClass, this.element, function () { return xhr; }, this.options.keepInitialGuid);
                this.inf[oldGuid] = $.extend(this.inf[oldGuid], {
                    downloadCT: {
                        xhr: xhr,
                        guid: oldGuid,
                        description: oldDescription
                    }
                });
                //this.documentSrvContent.call("PrepareDocumentDownload", { fileInfo: row, fieldDownloaderType: this.options.fieldDownloaderType })
                i.then(function (result) {
                    if (result) {
                        row.guid = result;
                        row.fileDescription = oldDescription;

                        /*row.downloading = false;
                        $(row.btnDownload).addClass("fa-download").removeClass("fa-spinner fa-spin")
                        $(row.btnClose).show();*/
                        _this.getValueAsync().then(function (val) {
                            _this.setValue(val);
                            _this._trigger("fileDownloaded", null, { fileInfo: row, customData: _this.options.customData.call(_this) });
                        })
                    }
                },
                    function (reason) {

                        row.error = true;
                        row.fileDescription = "jres:31850019"; //RC 31850019 : Soubor nestažen.
                        row.guid = oldGuid;
                        if (_this.options.fieldDownloaderClass.indexOf("Gordic.Gui.WebControls.GFileServiceProvider") !== -1) {
                            console.info("jres:31850018"); //RC 31850018 : Nastavte obslužnou třídu pro políčko.
                        }
                        _this.getValueAsync().then(function(val){
                            _this._trigger("fileError", null, { fileInfo: row, action: "download", reason: reason, validationType: "downloadError" });
                            _this.setValue(val);
                        }); 
                    });

                i.always(function () {
                    delete _this._asyncValue[row.id];
                    _this.downloading = _this.downloading - 1;
                    if (_this.downloading === 0) {
                        _this.actions["upload"].update({ enabled: _this.options.canUpload, icon: "fa-cloud-upload" });
                    }
                });

                _this._asyncValue[row.id] = i;


                row.fileDescription = "jres:31850017"; //RC 31850017 : Příprava ke stažení ...
                row.cid = row.guid;
                row.guid = null;
                this.setValue(this.getValue());

            }
        },
        checkOneFileMaxSize: function (value) {
            var maxSize = this.options.maxOneFileSize;
            if (maxSize == null) return false;
            var result = value.isNew && maxSize !== 0 && value.file.size > maxSize;
            value.errorMsg = result ? "jres:31850016" : ""; //RC 31850016 : Nepovolená velikost souboru.
            return result;
        },
        checkFileExtension: function (value) {
            var allowedExtension = this.options.acceptExtension;
            var result = value.isNew && value.filename && allowedExtension && allowedExtension.toLowerCase().indexOf(value.filename.split('.').pop().toLowerCase()) === -1;
            value.errorMsg = result ? "jres:31850015" : ""; //RC 31850015 : Nepovolený typ souboru.
            return result;
        },
        checkMaxSizeFiles: function (files, newFileSize, ignoreError) {
            var maxSize = this.options.maxFileSize;
            if (maxSize == null) return false;
            var filesSize = 0;
            newFileSize = newFileSize || 0;
            for (var index = 0; index < files.length; index++) {
                if (!files[index].error || ignoreError) {
                    var sizeFile = files[index].sizeB == null ? (files[index].file == null ? 0 : files[index].file.size) : files[index].sizeB;
                    filesSize = filesSize + sizeFile;
                }

            }
            return (maxSize !== 0 && (filesSize + newFileSize) > maxSize);

        },
        getSize: function (files) {
            var totalSize = 0;
            for (var a = 0; a < files.length; a++) {
                var fileInfo = files[a];
                (function (finfo) {
                    var actualSize = 0;
                    if (finfo && finfo.file && finfo.file.size != null) {
                        actualSize = finfo.file.size;
                    }
                    else if (finfo && finfo.sizeB != null) {
                        actualSize = finfo.sizeB;
                    }

                    totalSize = totalSize + actualSize;
                })(fileInfo);
            }
            return totalSize;
        },
        uploadFile: function (files) {
            var val = this.options.mode === "add" ? (this.getValue() || []) : [];
            var index = val.length;
            
            var _this = this;
            var maxSize = this.options.maxOneFileSize;
            var allowedExtension = this.options.acceptExtension;
            var maxSizeFiles = false;
            if (_this.options.maxFileCount !== 0 && (index + files.filter(function (item) { return item && !item.error; }).length) > _this.options.maxFileCount) {
                _this._trigger("fileError", null, { fileInfo: null, action: "upload", reason: "jres:31850010".format(_this.options.maxFileCount), validationType: "maxFileCount" });                //RC 31850010 : Nelze vložit více souborů, než je povoleno. Maximální počet souborů je {0}.
                return;
            }

            var totalBytesUpload = this.options.maxFileSize === 0 ? 0 : this.getSize(val) + this.getSize(files);

            if (totalBytesUpload > this.options.maxFileSize) {
                _this._trigger("fileError", null, { fileInfo: null, action: "upload", reason: "jres:31850011".format(_this.getFileSize(_this.options.maxFileSize)), validationType: "maxFilesSize" });  //RC 31850011 : Nelze nahrát soubory, jejichž velikost je v součtu větší než limit. Limit je {0}.
                return;
            }

            this._uploading = true;

            for (var a = 0; a < files.length; a++) {
                var fileInfo = files[a];
                (function (finfo, index) {
                    finfo.lastAction = "upload";
                    _this.inf[finfo.id] = { cancellationToken: new Gordic.Utils.GCancellationToken() };
                    //if (_this.options.maxFileCount !== 0 && val.length === _this.options.maxFileCount) return;
                    //finfo.file
                    finfo.fileDescription = "jres:31850012"; //RC 31850012 : Nahrává se soubor...
                    finfo.fileSize = _this.getFileSize(finfo.file.size);
                    var checkOneFileMaxSize = _this.checkOneFileMaxSize(finfo);
                    var checkFileExtension = _this.checkFileExtension(finfo);
                    if (checkOneFileMaxSize || checkFileExtension) {//maxSize !== 0 && finfo.file.size > maxSize || (allowedExtension && allowedExtension.indexOf(finfo.filename.split('.').pop()) === -1)
                        finfo.error = true;
                        finfo.guid = finfo.id;
                        finfo.fileTypeIcon = _this.getFileTypeIcon(finfo.filename.split('.').pop());
                        finfo.fileDescription = "jres:31850013";//finfo.file.type; //RC 31850013 : Soubor nelze nahrát
                        finfo.fileSize = _this.getFileSize(finfo.file.size);
                        var reason = "jres:31850030".format(_this.options.maxOneFileSize ? ("(" + _this.getFileSize(_this.options.maxOneFileSize) + ")") : ""); //RC 31850030 : Překročena velikost souboru {0}
                        var validationType = "oneFileMaxSize";
                        if (checkFileExtension) {
                            reason = "jres:31850029";
                            validationType = "fileExtension";
                        }
                        _this._trigger("fileError", null, { fileInfo: finfo, action: "upload", reason: reason, validationType: validationType });
                    }
                    else if (_this.checkMaxSizeFiles(val, finfo.file.size)) {
                        maxSizeFiles = true;
                        finfo.error = true;
                        finfo.guid = finfo.id;
                        finfo.fileTypeIcon = _this.getFileTypeIcon(finfo.filename.split('.').pop());
                        finfo.fileDescription = "jres:31850013";//finfo.file.type; //RC 31850013 : Soubor nelze nahrát
                        finfo.fileSize = _this.getFileSize(finfo.file.size);
                        _this._trigger("fileError", null, { fileInfo: finfo, action: "upload", reason: "jres:31850028", validationType: "maxFilesSize" }); //RC 31850028 : Překročen limit pro nahrání souborů
                    }
                    else {
                        finfo.error = false;
                        _this._trigger("uploadStarted", null, { fileInfo: finfo, customData: _this.options.customData.call(_this) });

                        var uploadResult = _this.fileSrv.chunkUpload(finfo.file, _this.inf[finfo.id].cancellationToken, _this.options.lifetime) //todo cancelToken
                            .progress(function (p) {
                                _this._trigger("uploadProgress", null, { id: finfo.id, loaded: p.current, total: p.total });
                            });

                        uploadResult.then(function (newFileInfo) {
                            val = $.extend(true, [], _this.getValue());
                            finfo.error = false;
                            var newVal = $.extend({}, finfo, newFileInfo[0]);
                            for (var i = 0; i < val.length; i++) {
                                if (val[i].id === newVal.id) {
                                    val[i] = newVal;
                                    break;
                                }
                            }
                            //21.11.2022 pnovak - pri clear pred dokoncenym uploadem nedochazi k uklidu, je potreba to resit?
                            // if (val.filter(function (item) { return item && item.guid && finfo && finfo.guid ? item.guid === finfo.guid : false; }).length === 0) {
                            //     _this.removeFile(finfo);
                            // }
                            if (_this.options.triggerOnceMultiChanged) {
                                if (val.filter(function (obj) { return !obj.guid; }).length === 0) {
                                    _this.setValue(val);
                                }
                                else {
                                    _this.setValue(val, { triggerChange: false });
                                }
                            }
                            else {
                                _this.setValue(val);
                            }
                            if (_this.options.prepareFilesOnServer) {
                                _this.fileSrv.transferFile(newVal.guid);
                            }
                            _this._trigger("fileUploaded", null, { fileInfo: newVal, customData: _this.options.customData.call(_this) });
                        }, function (reason) {
                            if (reason && reason.errText === "User cancelled") { return; }

                            val = _this.getValue();
                            finfo.error = true;
                            finfo.guid = finfo.id;

                            finfo.fileTypeIcon = _this.getFileTypeIcon(finfo.filename.split('.').pop());
                            finfo.fileDescription = "jres:31850013"; //finfo.file.type; //RC 31850013 : Soubor nelze nahrát
                            finfo.fileSize = _this.getFileSize(finfo.file.size);
                            var reasonText = reason && reason.errText ? reason.errText : reason;
                            if (reason && (reason.responseJSON || reason.exception || typeof reason === "string")) {
                                reasonText = reason.responseJSON && reason.responseJSON.exception ? reason.responseJSON.exception.baseMessage :
                                    reason.exception ? reason.exception.baseMessage : reason;
                            }

                            _this._trigger("fileError", null, { fileInfo: finfo, action: "upload", reason: reasonText, validationType: "commonError" });
                            _this.setValue(val, { triggerChange: false });
                        });
                        uploadResult.always(function () {
                            delete _this._asyncValue[finfo.id];
                        });

                        _this._asyncValue[finfo.id] = i;
                    }

                    _this.setNewValue(val, finfo);


                })(fileInfo, index);

                index++;
            }
            if (maxSizeFiles) {
                //this.validate();
                this.setError("jres:31850007", "error", "maxFilesSize"); //RC 31850007 : Překročený limit velikosti souborů
            }
            else if (!this.itemHasError()) {
                this.resetErrors("maxFilesSize");
            }
            this.getValueAsync().always(function () {
                _this._uploading = false;
                _this.element.find(".js-downloadBtn.fa-spinner").removeClass("fa-spinner fa-spin").addClass("fa-cloud-download")
            })
        },

        getValueAsync: function () {

            var _this = this;
            var def = $.Deferred();
            this._resolvingPromise = def;
                var interval = setInterval(function () {
                    var values = [];
                    var keys = Object.keys(_this._asyncValue);
                    for (var index = 0, ii = keys.length; index < ii; index++) {
                        var asyncVal = _this._asyncValue[keys[index]];
                        if (asyncVal) {
                            values.push(asyncVal);
                        }
                    }

                    if (values.length === 0) {
                        def.resolve();
                        clearInterval(interval);
                        _this._resolvingPromise = null;
                    }
                }, 100);
            

            return this._super();

        },
        validate: function (activateAutoValidation, groups) {
            this.resetErrors("maxFilesSize");
            this._superApply(arguments);
        },

        setNewValue: function (values, newValue) {
            var isNew = true;
            for (var index = 0; index < values.length; index++) {
                if (values[index].guid && newValue.guid && values[index].guid === newValue.guid) {
                    isNew = false;
                }

            }
            if (isNew) {
                values.push(newValue);
            }
            this.setValue(values, { triggerChange: false });
        },
        fileToDto: function (array) {
            var dtoList = [];
            for (var a = 0; a < array.length; a++) {

                if (dtoList.length !== array.length) {
                    var fileInfo = array[a];
                    dtoList.push({ id: this.generateNewId(), filename: fileInfo.name, isNew: true, file: fileInfo });
                }

            }
            return dtoList;
        },

        generateNewId: function () {
            var newId = "";
            var possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var formatted = Gordic.Templates.Formatters.datetime(new Date(), "yyMMdd");
            for (var i = 0; i < 12; i++) newId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            return formatted + newId;
        },

        getFileSize: function (size) {
            var suffix = ["B", "kB", "MB", "GB", "TB"];
            var i = 0;
            var newSize = size;
            while (newSize > 1000) {
                newSize = newSize / 1024;
                i++;
            }
            var fixedNum = i < 2 ? 0 : 2;
            return newSize.toFixed(fixedNum) + " " + suffix[i];
        },



        getFileTypeIcon: function (extensions) {
            extensions = extensions ? extensions.toLowerCase() : "";
            switch (extensions) {
                case "pdf":
                    return "fa-file-pdf-o";
                case "c":
                case "cs":
                case "js":
                case "html":
                case "htm":
                case "json":
                    return "fa-file-code-o";
                case "zip":
                case "rar":
                    return "fa-file-archive-o";
                case "doc":
                case "docx":
                    return "fa-file-word-o";
                case "xls":
                case "xlsx":
                    return "fa-file-excel-o";
                case "txt":
                    return "fa-file-text-o";
                case "png":
                case "jpeg":
                case "jpg":
                    return "fa-file-image-o";
                default:
                    return "fa-file-o";
            }

        },

        addDropzone: function (element) {

            var hasElem = element != null;
            element = element || this.element; /* || this.dropzoneDiv*/

            var dropzoneElement = hasElem ? element : this.element;
            $(dropzoneElement).attr("qq-drop-area-text", "jres:31850014"); //RC 31850014 : Sem přesuňte soubory
            this.dropzoneController.addDropzone(element);

        },
        removeDropzone: function (element) {
            element = element || this.element[0];
            this.dropzoneController.removeDropzone(element);




        },


        setDropzonesVisibility: function (disabled) {
            if (disabled) {
                this.dropzoneController.removeDropzones(null);
            }
            else {
                this.dropzoneController.addDropzones(this.dropzoneController.dropzones.length === 0 ? this.element : null); 
            }

        },

        progress: function (uid, percent) {
            percent = percent || 100;
            var values = this.getValue();
            var index = values.map(function (e) { return e.id; }).indexOf(uid);

            var elementParent = this.element.find(".gfilefield-item[data-index='" + index + "']").parent();

            var progressBarWidth = percent * elementParent.width() / 100;
            var progressLine = elementParent.find('.gfilefield-progline');
            if (percent > 100) {
                progressLine.css({ width: 0 });
            }
            else if (percent === 100) {
                progressLine.animate({ width: progressBarWidth }, 500);
                setTimeout(function () { progressLine.css({ width: 0 }); }, 600);

            }
            else {
                progressLine.animate({ width: progressBarWidth }, 250);
            }


        },
        refresh: function (guid) {
            var guids;
            var _this = this;
            if (guid && typeof guid === "string") {
                guids = [guid];
            }
            else if (guid && $.isArray(guid)) {
                guids = guid;
            }

            guids = guids || this.getValue().map(function (item) { return item.guid });
            this.fileInfoSrv.call("GetFileInfos", { uids: guids }).done(function (fileInfos) {
                var vals = _this.getValue();
                for (var i = 0; i < fileInfos.length; i++) {
                    var fileInfo = vals.find(function (item) {
                        return item.guid === fileInfos[i].guid;
                    })
                    $.extend(fileInfo, fileInfos[i]);
                }
                _this.setValue(vals, { triggerChange: false });
            })
        },



        /**
         * ViewMode transformace
         * @param {any} mode
         */
        toMode: function (mode) {
            var def = $.Deferred();
            var _this = this;
            if (!this.hasValue() && this.options.renderEmpty !== true && (this._valuePromise == null || this._valuePromise.state() != "pending")) { def.resolve("—"); } else {
                this.getValueAsync().then(function (val) {
                    if (!_this.hasValue() && _this.options.renderEmpty !== true) {
                        def.resolve("—");
                    } else {
                        var result = $("<ul>");
                        for (var i = 0, ii = val.length; i < ii; i++) {
                            var item = $('<li class="' + _this.options.itemWidth + '"><div class="gfilefield-item" data-index=' + i + '>' + Gordic.Templates.resolve(_this.options.itemTemplate, val[i]) + "</div></li>");
                            if (_this.options.itemDownloadable === true || ($.isFunction(_this.options.itemDownloadable) && _this.options.itemDownloadable(val[i]))) {
                                _this._addItemButton(item, _this._createDownloadButton());
                            }
                            result.append(item);
                        }
                        def.resolve(result);
                    }

                });
            }

            return def.promise();
        }


    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gpidbar.js 

(function ($) {
    "use strict";

    $.widget("gordic.gpidbar", {
        options: {
            customClass: "",
            pid: "000000000000"
        },

		_create: function () {

			var _this = this;

			if (this.options.ixp)
				this.options.pid = this.options.ixp; // kompatibilita

            this._superApply(arguments);
            this.element.addClass("gpidbar").addClass(this.options.customClass);

			gscript.require("css:gin/css/gordic_pid.css").done((_this._createBarCode.bind(_this)));

        },

        _setOption:function(key, value){
            if (key === "pid") {
                this.element.find(".gpidbar-code").html("*" + this.options.pid.substr(0, 12) + "*");
            }
            this._super(key, value);
        },

        /* Vytvoří čárový kód */
        _createBarCode: function (content) {
			var that = this;

			this.element.empty();

            var code = $("<span class='gpidbar-code'>").text("*" + this.options.pid.substr(0, 12) + "*").appendTo(this.element);

            var actCopyToClipboard = new GAction({
                name: "actCopyToClipboard", caption: "jres:25030478", run: function () {
                    var btnThis = this; //nejde řešit promisou do set pending, protože se to pak vizuálně rozstřelí (aplikují se jiné styly?)
                    Gordic.Utils.copyToClipboard(that.options.pid).done(function () {
                        btnThis.setPending(100);
                    }).fail(function () {
                        btnThis.setPending(-1);
                    })
                }
        , icon: "gi-copy"
    });
            $("<button class='gpidbar-clipboardbutton'>").gbutton({ params: { action: actCopyToClipboard } }).appendTo(this.element);
		},

		/**
		 * update pidbar
		 */
		update: function (updateOpt) {

			$.extend(true, this.options,updateOpt);

			console.log("update pidbar");

			this._create();
		},

        _destroy: function () {
            if (this.clipboard)
                this.clipboard.destroy();

            this.element.removeClass("gpidbar").removeClass(this.options.customClass).empty();
            this._superApply(arguments);
        }

    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\GDocument.js 

var GDocument = (function ($) {
    "use strict";

    var defaultOptions = {
        useFlashPanel: true,
        flashPanelId: "pfupdwn",

        //message pro workflow prace s dokumentem - metoda processDocument() a downloadDocument(), (poradi je tak jak jdou za sebou)
        msgFileDownloading: "jres:31150003", //RC 31150003 : Stahování souboru
        msgFileDownloaded: "jres:31150004", //RC 31150004 : Soubor byl stažen
        msgFileIsOpened: "jres:31150005", //RC 31150005 : Soubor je otevřen k editaci
        msgFileUploading: "jres:31150006", //RC 31150006 : Ukládání souboru
        msgFileUploaded: "jres:31150007", //RC 31150007 : Soubor byl uložen
        msgFileProcessError: "jres:31150008", //RC 31150008 : Chyba při práci se souborem

        //message pro upload()
        msgUplChooseFile: "jres:31150009", //RC 31150009 : Vyberte soubor
        msgUplFileSizeExceeded: "jres:31150010", //RC 31150010 : Soubor je příliš velký
        msgUplFileUploading: "jres:31150006", //RC 31150006 : Ukládání souboru
        msgUplFileUploaded: "jres:31150011", //RC 31150011 : Dokument byl uložen

        //popisky
        cptChooseFileBtn: "jres:31150012", //RC 31150012 : vybrat
        cptSaveFile: "jres:31150013", //RC 31150013 : Uložit soubor
        cptSign: "jres:31150014", //RC 31150014 : Podepsat
        cptTimeStamp: "jres:31150015", //RC 31150015 : Orazítkovat
        cptSave: "jres:25030185", //RC 25030185 : Uložit
        cptCancel: "jres:25030446" //RC 25030446 : Storno
    };


    function GDocument(gcontent, options) {
        this.gcontent = gcontent;
        this._uploadCompletedCallbacks = [];
        this._uploadFailedCallbacks = [];
        this._fileSelectedCallbacks = [];
        this.documentService = gcontent ? gcontent.createServiceContent("Gordic.Gui.WebControls.GDocumentService") : new GContent("Gordic.Gui.WebControls.GDocumentService");
        this.options = $.extend({}, defaultOptions, options);
    }

    //#region Notifikace k autorovi modulu

    GDocument.prototype.uploadCompleted = function (callback) {
        /// <summary>Registrace handleru, ktery se vyvola v pripade, ze upload dopadnul uspesne</summary>
        /// <param name='callback' type='function'>callback</param>

        if (!$.isFunction(callback))
            throw "GDocument.uploadCompleted argument 'callback' has to be function";

        this._uploadCompletedCallbacks.push(callback);
    };

    GDocument.prototype._uploadCompleted = function () {
        /// <summary>Zavolani vsech handleru oznamujici, ze upload dopadl uspesne</summary>
        if (this.gcontent)
            this.gcontent.showFlash({ id: this.options.flashPanelId, label: this.options.msgUplFileUploaded, timer: 5000 });
        for (var i = 0; i < this._uploadCompletedCallbacks.length; i++)
            this._uploadCompletedCallbacks[i].apply(this, arguments);
    };

    GDocument.prototype.uploadFailed = function (callback) {
        /// <summary>Registrace handleru, ktery se vyvola v pripade, ze upload selze</summary>
        /// <param name='callback' type='function'>callback</param>
        if (!$.isFunction(callback))
            throw "GDocument.uploadFailed argument 'callback' has to be function";
        this._uploadFailedCallbacks.push(callback);
    };

    GDocument.prototype._uploadFailed = function () {
        /// <summary>Zavolani vsech handleru oznamujici, ze upload dopadl neuspesne</summary>
        for (var i = 0; i < this._uploadFailedCallbacks.length; i++)
            this._uploadFailedCallbacks[i].call(this, arguments);
    };

    GDocument.prototype.fileSelected = function (callback) {
        /// <summary>Mozno priradit callback, ktery se vyvola v pripade, kdy uzivatel vybere soubor</summary>
        /// <param name="callback" type="function">Callback function: function(event){ /* this = GDocument */}</param>
        if (!$.isFunction(callback))
            throw "GDocument.fileSelected argument 'callback' has to be function";
        this._fileSelectedCallbacks.push(callback);
    };

    //#endregion

    GDocument.prototype.downloadDocument = function (dto, uploadCompletedCallback) {
        /// <signature>
        /// <summary>Stazeni souboru k jeho modifikaci a pripadnemu uploadu (metoda zahajuje kompletni workflow)</summary>
        /// <param name='dto' type='server.GDownloadRequestDto'></param>
        /// <param name='uploadCompletedCallback' type='function'>Callback zavolany po uspesnem uploadu</param>
        /// <returns type='object'>Promise</returns>
        /// </signature>
        /// <signature>
        /// <summary>Stazeni souboru k jeho modifikaci a pripadnemu uploadu (metoda zahajuje kompletni workflow)</summary>
        /// <param name='dto' type='server.GDownloadRequestDto'></param>
        /// <param name='uploadCompletedCallback' type='GObservableObject'>Observable object pro vyvolani zruseni workflow</param>
        /// <returns type='object'>Promise</returns>
        /// </signature>

        if ($.isFunction(uploadCompletedCallback))
            this.uploadCompleted(uploadCompletedCallback);

        var cancelObj = null;
        if (uploadCompletedCallback && uploadCompletedCallback instanceof GObservableObject)
            cancelObj = uploadCompletedCallback;

        return this.processDocument(dto, cancelObj);
    };

    GDocument.prototype.processDocument = function (dto, cancelObj) {
        /// <summary>Zpracovani dokumentu zacinajici zpravidla stazenim, pripadne podepsanim, orazitkovanim a i zpetnym uploadem</summary>
        /// <param name="dto" type="server.GDownloadRequestDto">dto</param>
        /// <param name="cancelObj" type="GObservableObject">Objekt pro zruseni workflow</param>
        /// <returns type='Object'>promise() znacici ukonceni celeho workflow, at uz obsahuje jakekoliv kroky.</returns>

        if (!this.gcontent || this.gcontent.showFlash === undefined)
            throw "GDocument.processDocument(): gcontent is required (ctor).";

        ////BM (2021-01-05): Fix po domluve s PNovakem: Prestalo fungovat obecne stazeni, pokud chybela property encodeToBase64, se kterym pocita doplnek.
        //if (!dto.Context && GBrowserExtras.gbeISSuported()) dto.Context = { "encodeToBase64": true };

        var def = $.Deferred();

        if (cancelObj)
            cancelObj.registerUpdate(function () { def.reject(); });

        //NOTE: Namet na zlepseni - zkusit workflow bez flash panelu s pouzitim notify a progress a cizim
        //formularem splnujicim podminky na ulozeni
        var that = this;
        this.gcontent.showFlash({ id: this.options.flashPanelId, label: this.options.msgFileDownloading, icon: "fa-spinner fa-spin" });
        // NOP - 1.6.2020: Domluvili jsme se s Bohoušem na tom, že se to bude chovat pro všechny případy stejně i když nebude doplněk a po následné instalaci nebude program na otevrení (dojde ke stažení souboru - stejné pro USU, RAP, tiskové sestavy) 
        var dd = $.extend(true, {}, dto);
        delete dd.Context;
        this.documentService.call("PrepareDocumentDownload", { dto: dd })
            //NOP: pred stahovanim zjistim, zda mohu otevrit program
            .then(function (docuPars) {
                if (dto.DisablePluginDownload) {
                    return docuPars;
                } else if (docuPars && docuPars.CustomData && docuPars.CustomData["fileName"] && GBrowserExtras.isSupported("canOpenFile")) {
                    return GBrowserExtras.canOpenFile(docuPars.CustomData.fileName).then(function (canOpen) {
                        dto.DisablePluginDownload = dto.DisablePluginDownload || !canOpen;
                        if (!dto.DisablePluginDownload && docuPars.CustomData["isTooBig"] === "True") {
                            return that.gcontent.dialogs.confirm("jres:31850039", "jres:31850040") //RC 31850040 : Chystáte se otevřít velký soubor. Nativní otevření není možné, chcete stáhnout soubor?
                                .createDialogPromise("yes")
                                .then(function () { dto.DisablePluginDownload = true; return docuPars; });
                        }

                        return docuPars;
                    }, function () {
                        dto.DisablePluginDownload = true;
                        return $.Deferred().resolve(docuPars).promise();

                    });
                } else if (!GBrowserExtras.isSupported("canOpenFile") && !docuPars.DisableBrowserExtensionWizard) {
                    return GBrowserExtras.canOpenFile("").then(function (canOpen) { if (!canOpen) { dto.DisablePluginDownload = true; } return docuPars; }, function (reason) { dto.DisablePluginDownload = true; return $.Deferred().reject(reason).promise(); });
                } else {
                    return docuPars;
                }
            })
            .then(function (docuPars) {
                /// <param name="docuPars" type="server.GDownloadResponseDto">docuPars</param>
                //console.log("GDocument.processDocument() step 1: download ", docuPars);
                if (!dto.DisablePluginDownload && GBrowserExtras.isSupported("documentSaveOpenLocal"))
                    //pnovak: 19.8.2020 - pridan dalsi mozny vstupni parametr, resi situaci, kdy chci stahnout soubor na disk a pouze ho otevrit bez nasledneho uploadu a podepisovani
                    //prenos mezi serverem a nativnim klientem musi byt base64 kvuli problemum s kodovanim cestiny
                    return that._downloadPlugin(docuPars, true /* dto && dto.Context && (dto.Context.signer != null || dto.Context.encodeToBase64)*/)
                        .then(function (fileName, fileContent) {
                            docuPars.fileName = decodeURI(fileName);
                            docuPars.fileContent = fileContent;
                            return docuPars;
                        });
                else
                    return that._autoDownload(docuPars.SessionName, that.gcontent.element)
                        .then(function () {
                            return docuPars;
                        });
            })
            .then(function (docuPars) {
                /// <param name="docuPars" type="server.GDownloadResponseDto">docuPars</param>
                //console.log("GDocument.processDocument() step 2: wait for open ", docuPars);
                that.afterDownload();
                if (that._hasDownloadCookie(docuPars.SessionName)) that._clearDownloadCookie(docuPars.SessionName); //NOTE: Doplnek cookies neuklizi. Asi by si to zaslouzilo dat i do nejakeho always uplne nakonec. Na druhou stranu jsou to relacni cookies, ktere po restartu prohlizece zmizi.
                that.gcontent.showFlash({ id: that.options.flashPanelId, label: that.options.msgFileDownloaded, icon: "" });
                if (docuPars.fileName) {
                    var primyTisk = docuPars.CustomData.primyTisk || "0";
                    //"0" = bez primeho tisku (chovat by se to melo klasicky)
                    //"1" = primy tisk s oknem nastaveni
                    //"2" = primy tisk - prime odeslani na tiskarnu
                    if (primyTisk === "0") {
                        that.gcontent.showFlash({ id: that.options.flashPanelId, label: "jres:31850044", icon: "fa-spinner fa-spin" }); //RC 31850044 : Ukládání na klientskou stanici
                        return GBrowserExtras.documentSaveOpenLocal(docuPars.fileName, docuPars.fileContent, function () { that.gcontent.showFlash({ id: that.options.flashPanelId, label: "jres:31850045", icon: "" }) }, docuPars.EnableSaving, dto.CustomData) //RC 31850045 : Uloženo, dojde k otevření souboru
                            .then(function (filePath) {
                                docuPars.filePath = filePath;
                                if (!docuPars.EnableSaving) {
                                    def.resolve(GDocument.convertUploadResponse(docuPars));
                                    return docuPars;
                                }

                                if (docuPars.filePath) {
                                    that.gcontent.showFlash({ id: that.options.flashPanelId, label: that.options.msgFileIsOpened, icon: "fa-warning" });
                                    // return docuPars;
                                    return that._waitForOpenDocument(docuPars.filePath, docuPars.EnableSaving)
                                        .then(function () {
                                            return docuPars;
                                        });
                                }
                            }, function (reason) {
                                //def.resolve(GDocument.convertUploadResponse(docuPars));/*docuPars*/
                                return $.Deferred().reject(reason.reason).promise();
                            });
                    } else {
                        that.gcontent.showFlash({ id: that.options.flashPanelId, label: "jres:31850044", icon: "fa-spinner fa-spin" }); //RC 31850044 : Ukládání na klientskou stanici
                        return GBrowserExtras.documentSave(docuPars.fileName, docuPars.fileContent, docuPars.EnableSaving)
                            .then(function (filePath) {
                                docuPars.filePath = filePath;
                                that.gcontent.showFlash({ id: that.options.flashPanelId, label: "jres:31850043", icon: "" }); //RC 31850043 : Uloženo, probíhá tisk
                                return primyTisk === "1" ? GBrowserExtras.print(filePath) : GBrowserExtras.showPrintDialog(filePath);
                            }).then(function (result) {
                                if (result) {
                                    def.resolve(GDocument.convertUploadResponse(docuPars));
                                    return docuPars;
                                } else {
                                    def.reject("jres:31850037"); //RC 31850037 : Chyba tisku
                                }
                            });
                    }
                } else
                    if (!docuPars.EnableSaving) {
                        def.resolve(GDocument.convertUploadResponse(docuPars));
                        return docuPars;
                    } else {

                        return docuPars;
                    }
            })
            .then(function (docuPars) {
                /// <param name="docuPars" type="server.GDownloadResponseDto">docuPars</param>

                //Uzivatel vybere co chce provest se souborem a klepne na ulozit
                //console.log("GDocument.processDocument() step 3: wait for user input (click na ULOZIT)", docuPars);

                if (def.state() !== "pending")
                    return docuPars;

                //NOTE: Zde uz se predpoklada, ze se bude ukladat
                return that._waitForSave(docuPars); //NOTE: Vraci DTO a $dlg s formularem pro dohledani souboru
            })
            .then(function (docuPars, $dlg) {
                /// <param name="docuPars" type="server.GDownloadResponseDto">docuPars</param>
                //console.log("GDocument.processDocument() step 4 upload (u pluginu podepsani, razitkovani)", docuPars);
                if (def.state() !== "pending")
                    return docuPars;

                var $form = $dlg.find("form");
                that.gcontent.showFlash({ id: that.options.flashPanelId, icon: "fa-spinner fa-spin", label: that.options.msgFileUploading });

                var uplMethod = docuPars.fileName ? that._uploadFile : that._uploadCallbackManual;

                return uplMethod.call(that, docuPars, $form, dto.Context.signer).then(function (r) {
                    docuPars.CustomData = r.CustomData;
                    return docuPars;
                });
            })
            .done(function (docuPars) {
                //console.log("GDocument.processDocument() step 5: done", docuPars);
                that.gcontent.showFlash({ id: that.options.flashPanelId, icon: "", label: docuPars.EnableSaving ? that.options.msgFileUploaded : that.options.msgFileDownloaded });

                if (def.state() === "pending")
                    def.resolve(GDocument.convertUploadResponse(docuPars));
                //def.resolve();
            })
            .fail(function (o) {
                //console.log("GDocument.processDocument().fail()", arguments);
                if (o) {
                    Gordic.Gui.WebApp.Utils.showReasonFlash(that.gcontent, o);
                    if (o.type === 3) {
                        o.userReject = true; //user close dialog
                        o.handled = true;
                    }

                    if (!o.userReject || o.handled === false) //plni v _waitForSave
                    {
                        var r = typeof o === "string" ? o : o.reason ? o.reason : "";
                        that.gcontent.showFlash({ id: that.options.flashPanelId, icon: "", label: "{0}{1}".format(that.options.msgFileProcessError, r ? "jres:31850022" + r : ""), customClass: "g-state-error" }); //RC 31850022 : . Důvod: 
                    } else {
                        that.gcontent.hideFlash(that.options.flashPanelId);
                    }
                }
                def.reject();
            });

        return def.promise();
    };

    GDocument.prototype.download = function (dto) {
        /// <signature>
        /// <summary>Okamzite stahne soubor bez jakehokoliv nasledujiciho workflow</summary>
        /// <param name="dto" type="server.GDownloadRequestDto">dto</param>
        /// <returns type="promise"></returns>
        /// </signature>
        /// <signature>
        /// <summary>Okamzite stahne soubor</summary>
        /// <param name="dto" type="string">URL na soubor<param>
        /// </signature>

        if ($.isPlainObject(dto)) {
            var that = this;
            return this.documentService.call("PrepareDocumentDownload", { dto: dto })
                .then(function (result) {
                    return that._autoDownload(result.SessionName, that.gcontent.element)
                        .then(function () {
                            return result.CustomData;
                        })
                        .fail(function (exc) {
                            if (exc) GDlg.showException(exc.exception);
                        });
                });
        } else if (typeof (dto) === "string") {
            //TODO: Automaticky stahnout bez cookie pouze pres iframe
        }
    };
    /** Pred uploadem je potreba vyvolat delegata (napr. zruseni gcover)*/
    GDocument.prototype.afterDownload = function () {
        if (this.options.afterDownloadDelegate) {
            try {
                this.options.afterDownloadDelegate();
            } catch (e) { // potlaceni vyjimky z delegata
                console.error(e);
            }
        }
    }


    GDocument.prototype.upload = function (dto, callback) {
        /// <summary>
        /// Provede upload: vytvori flash panel nebo dialog, kde uzivatel vybere soubor a klepne na ulozit.
        /// <para>Pouziti:</para>
        /// <para>doc.upload({</para>
        /// <para>    UploaderType: "Gordic.Ucr.WebClient.Documents.DocumentUploaderTest",</para>
        /// <para>    CustomData: { "id": "mojeId123", "name": "MojeName321"}}</para>
        /// <para>)</para>
        /// <para>.done(function (state, o) {</para>
        /// <para>    if(state === "saved")console.log("Dokument uploadovan", o.CustomData);</para>
        /// <para>})</para>
        /// <para>.progress(function (state, o) {</para>
        /// <para>    if(state === "fileSelected"){console.log("Soubor vybran", o.fileSize, o.name);} //state: fileSelected|uploadStarting</para>
        /// <para>})</para>
        /// <para>.fail(function (xhr, state) {</para>
        /// <para>    if(state === "cancel")console.log("Uzivatel klepnul na storno");</para>
        /// <para>})</para>
        /// <para>.always(function () {</para>
        /// <para>    console.log("upload always pro pripadny uklid");</para>
        /// <para>})</para>;
        /// </summary>
        /// <param name="dto" type="server.GDownloadRequestDto">
        /// <para>DTO typu GDownloadRequestDto, minimum jsou property:</para>
        /// <para>- UploaderType - nazev tridy vc. namespace na potomka odvozeneho od GDocumentUploader</para>
        /// <para>- CustomData - objekt klic hodnota (string,string) s vlastnimi daty pro rizeni sveho uploaderu</para>
        /// <para>Pro JS je rozsirene o property:</para>
        /// <para>- caption: lze pridat vlastni hlasku popisku (default: 'Vyberte soubor'),</para>
        /// <para>- cancelButton: zda ma obsahovat tlacitko zrusit (default: true)</para>
        /// <para>- createDialog: zda ma upload probihat pres jquery dialog (default: false)</para>
        /// </param>
        /// <param name="callback" type="function">(volitelne)Callback funkce po provedeni uploadu</param>
        /// <returns type="Object">Promise: na done dava do argumentu state (zatim jen saved), do fail dava xhr, state (muze byt i cancel, pokud uzivatel upload zrusi)</returns>


        dto.caption = dto.caption || this.options.msgUplChooseFile;
        dto.cancelButton = dto.cancelButton === undefined ? true : dto.cancelButton;
        dto.createDialog = dto.createDialog === undefined ? false : dto.createDialog;
        dto.acceptExtension = dto.acceptExtension || ""; //hodnoty: .pdf,.xlsx 
        dto.maxFileSize = dto.maxFileSize || null; //maximalni velikost souboru v bytes, null = unlimited

        var that = this;

        if (callback)
            this.uploadCompleted(callback);

        var $uplForm = null;
        var $formContent;
        var closeEvent = dto.createDialog ? "close" : "gflashpanelclose";
        var $uplBtn = null;

        if (dto.createDialog) {
            $formContent = this._createManualForm(dto.acceptExtension, false);
            $formContent = $formContent.wrap("<div>").parent();
            $uplForm = GDlg.showWindow(
                $formContent,
                null, {
                title: dto.caption,
                buttons: [{
                    text: that.options.cptSave,
                    disabled: true,
                    create: function () {
                        $(this).addClass("js-upl-ok");
                    },
                    click: function (event) { }
                }, {
                    text: that.options.cptCancel,
                    click: function (event) { $(this).dialog("close"); },
                    create: function () {
                        if (!dto.cancelButton)
                            $(this).hide();
                    }
                }]
            }).addClass("detail-content");

            $uplBtn = $uplForm.next(".ui-dialog-buttonpane").find(".js-upl-ok");
            if ($uplBtn.length === 0) $uplBtn = $uplForm.closest(".js-contentwrapper").next(".ui-dialog-buttonpane").find(".js-upl-ok"); //HOTFIX pro 490. Az se prejde na wrappery, tak cely dialog zrefaktorit na akce
        } else {
            $formContent = this._createPanel(dto);
            $uplForm = this.gcontent.showFlash({ label: $formContent, id: "uplForm", customClass: "g-state-important", icon: "fa-warning" });
            $uplBtn = $formContent.parent().find(".js-upl-ok"); //$uplForm.parent().find(".js-upl-ok");
        }

        var def = $.Deferred();

        var selFile = null;

        //pouzit notify?
        $formContent.find("input:file").change(function () {
            //console.log("file size", , this.files);
            var file = this.files[0];

            if (def.state() === "pending") {
                selFile = { fileSize: file.size, name: file.name };
                def.notify("fileSelected", selFile);
            }

            var $errIcon = $formContent.find(".js-form-err");
            if (dto.maxFileSize && file.size > dto.maxFileSize) {

                if (dto.createDialog)
                    $uplBtn.button("disable");
                else
                    $uplBtn.css("display", "none");

                $errIcon.css("display", "")
                    .gtooltip({
                        tooltip: that.options.msgUplFileSizeExceeded,
                        position: { shift: { left: -5, top: 4 } },
                        customClass: "g-state-warning"
                    });

                return;
            }

            $errIcon.css("display", "none");
            if ($errIcon.hasClass("gtooltip"))
                $errIcon.gtooltip("destroy");

            if (dto.createDialog)
                $uplBtn.button("enable");
            else
                $uplBtn.css("display", "");
        });

        $uplBtn.on("click", function () {
            def.notify("uploadStarting", selFile);

            if ($uplForm.hasClass("gflashpanel")) {
                $uplForm.gflashpanel({ icon: "fa-spinner fa-spin", label: that.options.msgUplFileUploading, noClose: true });
                $formContent.css("display", "none");
            }

            that._uploadCallbackManual(dto, $formContent)
                .done(function (r) {
                    def.resolve("saved", r); //NOTE: Pro pripad budouciho rozsireni predavam i stav
                    if (!dto.createDialog)
                        that.gcontent.hideFlash("uplForm");
                    else
                        $uplForm.dialog("close").remove();
                })
                .fail(function () {
                    def.reject.apply(def, arguments);
                    if ($uplForm.hasClass("gflashpanel"))
                        that.gcontent.hideFlash("uplForm");
                });
        });

        $uplForm.on(closeEvent, function () {
            if (def.state() === "pending")
                def.reject(null, "cancel"); //NOTE: 1. arg supluje xhr, druhy je state, treti je vynechan
            $formContent.remove();
        });

        return def.promise();
    };

    GDocument.prototype.prepareMultiple = function (dtos) {
        return this.documentService.call("PrepareDocumentsDownload", { dtos: dtos })
            .then(function (res) {
                return res.map(function (r) { return { id: r.SessionName, customData: r.CustomData } });
            })
    };

    GDocument.prototype.releaseMultiple = function (dtos) {
        return this.documentService.call("ReleaseMultiple", { dtos: dtos });
    };

    GDocument.prototype.getDirectUrl = function (dto, options) {
        if (!dto) throw new GError("Missing argument 'dto'.");

        return urls.getDirectUrl(dto.customData.tempFilePath, options);
    };

    //#region Workflow obecne

    //#endregion

    //#region ActiveX/Java workflow

    GDocument.prototype._downloadPlugin = function (dto, isDownloadForSignature) {
        /// <summary>Stazeni souboru k jeho modifikaci (pomoci ActiveX nebo Java)</summary>
        /// <param name='dto' type='server.GDownloadResponseDto'></param>
        /// <returns type='Promise'>Promise() majici v sobe nazev souboru pri uspesnem stazeni</returns>
        var def = $.Deferred();
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", urls.getDownloadUrl(null, isDownloadForSignature), true);
        xhr.onreadystatechange = function () {
            //console.log("GDocument._downloadPlugin: xhr state ", xhr.readyState, ", status ", xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    def.resolve(that._getFileNameFromReqHeader(xhr.getResponseHeader("Content-Disposition")), xhr.response);
                } else
                    def.reject(xhr, xhr.statusText, null);
            }
        };

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("sessionName=" + dto.SessionName);
        return def.promise();
    };

    GDocument.prototype._waitForOpenDocument = function (filePath, isForUpload) {
        /// <summary>Ceka na zavreni souboru, ktery byl otevren pomoci pluginu</summary>
        /// <param name="filePath" type="String">Cesta k souboru</param>
        var def = $.Deferred();
        //if (!GBrowserExtras.documentIsOpen(filePath)) //NOTE: Nelze se zeptat okamzite, soubor jeste nemusi byt otevren
        //    def.resolve(filePath);

        var that = this;

        setTimeout(function () {
            that._waitForOpenDocumentRec(filePath, def, isForUpload);
        }, GBrowserExtras.getOpenDocumentTimeout());


        return def.promise();
    };

    GDocument.prototype._waitForOpenDocumentRec = function (filePath, def, isForUpload) {
        /// <param name="filePath" type="String">Cesta k souboru</param>
        /// <param name="def" type="object">Deferred</param>
        //console.log("GDocument._waitForOpenDocumentRec()", filePath, def);
        var that = this;

        setTimeout(function () {
            GBrowserExtras.documentIsOpen(filePath).then(function (isOpened) {
                if (isOpened) {
                    that._waitForOpenDocumentRec(filePath, def);
                } else {
                    if (GBrowserExtras["refreshEvidence"] && isForUpload) {
                        var fileName = filePath.substring(filePath.lastIndexOf("\\") + 1);
                        GBrowserExtras.refreshEvidence(fileName).fail(function () {
                            console.info("Neprovedena aktualizace ulozeneho souboru")
                        }).always(function () {

                            def.resolve(filePath);
                        })
                    } else {
                        def.resolve(filePath);
                    }
                }
            }, function (reason) { def.reject(reason); })
        }, 100);
    };

    GDocument.prototype._uploadFile = function (dto, ctx, signer) {

        if (!GBrowserExtras.isSupported("documentReadLocal")) {
            console.warn("GDocument._uploadFile: documentReadLocal is unsupported");
            return $.Deferred().reject("jres:31150044").promise(); //RC 31150044 : Doplněk pro otevření lokálního souboru není k dispozici.
        }

        if (!GBrowserExtras.isSupported("documentPluginUpload")) {
            console.warn("GDocument._uploadFile: plugin upload is not supported");
            return $.Deferred().reject("jres:31150045").promise(); //RC 31150045 : Doplněk pro upload souboru na server není k dispozici.
        }

        if ((dto.makeSig || dto.makeTStamp) && !GBrowserExtras.isSupported("documentMakeSignatureTimeStamp")) {
            console.warn("GDocument._uploadFile: documentMakeSignatureTimeStamp is unsupported");
            return $.Deferred().reject("jres:31150043").promise(); //RC 31150043 : Doplněk pro podepisování není k dispozici.
        }


        var boundary = "AXUPLOAD{A3EE83BD-69DE-4431-9D9D-80A8C1A79CE8}";
        var def = $.Deferred();
        var that = this;
        if (dto.CustomData.ixsDpo) {
            ctx.ixsDpo = dto.CustomData.ixsDpo;
        }
        var saveOnClient = typeof dto.CustomData.saveOnClient === "undefined" ? true : dto.CustomData.saveOnClient === "true";
        GBrowserExtras.documentMakeSignatureTimeStamp(dto.filePath, dto.makeSig, dto.makeTStamp, dto.fileName, saveOnClient, signer, ctx)
            .then(function (res) {
                dto.filePath = res.filePath;
                dto.fileName = encodeURI(res.fileName);
                dto.CustomData.signConfig = res.config ? JSON.stringify(res.config) : undefined;
                dto.CustomData.fromBase64 = !!res.fromBase64;
                dto.CustomData.fileName = res.fileName;
                dto.CustomData.saveOnClient = undefined;
                // sem doplnit pro usu custom data pro externi podpis atd..
                // 21.7.2022 pnovak - serverovy podpis ma podepsany soubor na serveru
                var loadFilePromise;
                if (res.signedFI) {
                    loadFilePromise = $.Deferred().resolve([res.signedFI]).promise();
                    dto.CustomData.fromBase64 = false;
                } else {
                    that.gcontent.showFlash({ id: that.options.flashPanelId, label: "jres:31850042", icon: "fa-spinner fa-spin" }); //RC 31850042 : Načítání souboru z klientské stanice
                    loadFilePromise = GBrowserExtras.documentReadLocalST(dto.filePath, boundary, res.signature, res.timestamp, true)
                        .then(function (content) {
                            that.gcontent.showFlash({ id: that.options.flashPanelId, label: "jres:31850041", icon: "fa-spinner fa-spin" }); //RC 31850041 : Načteno, probíhá přenos souboru na server

                            return GBrowserExtras.documentPluginUpload(
                                urls.getUploadUrl(dto.UploaderType, dto.failTest),
                                content,
                                GBrowserExtras.getUploadHeaders(boundary, dto.fileName)
                            );
                        })
                }

                return loadFilePromise
                    .then(function (result) {
                        //console.log("_uploadFile then result", JSON.parse(result.responseText));

                        //NOTE (BM): Pro AX2 se jede standardni cestou (sessionName, atd.), ale pro 
                        //           Pavluv doplnek se jede pres array GFileInfoDto[] - upload jednotlivych
                        //           souboru probehnul po castech. Tento pripad se spoleha na strane serveru
                        //           na CustomData.fileName a CustomData.fromBase64!

                        var isArray = Array.isArray(result);
                        return that.documentService.call("UploadDocument", {
                            sessionName: isArray ? "" : (result.responseText ? JSON.parse(result.responseText).sessionName : result.sessionName),
                            dto: dto,
                            fi: isArray ? result : null
                        });
                    })
                    .done(function (result) {
                        //console.log("_uploadFile done result", result);
                        that._deleteLocalFile(dto.filePath);
                        var r = GDocument.convertUploadResponse(result);
                        that._uploadCompleted(r);
                        def.resolve(r);
                    })
                    .fail(function (err) {
                        that._uploadFailed(); //NOTE: Ponechat soubor, pokud se jej nepodarilo uploadnout???
                        def.reject(err);
                    });
            }, function (reason) {
                def.reject(reason);
            });
        return def.promise();
    };

    GDocument.prototype._deleteLocalFile = function (filePath) {
        /// <summary>Smaze lokalne ulozeny soubor (na klientskem pocitaci), pokud je to podporovano</summary>
        /// <param name='filePath' type='string'>Cesta k souboru</param>
        if (GBrowserExtras.isSupported("documentPluginDelete")) {
            GBrowserExtras.documentPluginDelete(filePath);
            return;
        }
        console.warn("GDocument._deleteLocalFile is not supported");
    };

    //#endregion

    //#region Standardni download/upload workflow

    GDocument.prototype._createManualForm = function (acceptExtension, usePrettyFieldInput) {
        usePrettyFieldInput = usePrettyFieldInput === undefined ? true : usePrettyFieldInput;
        acceptExtension = acceptExtension || "";
        var $form = $("<form class='g-doc-upl-form' action='fooo' method='post' enctype='multipart/form-data'>" +
            "<div class='js-docUplSel g-doc-upl-selfile'>" +
            "<i class='js-form-err fa fa-exclamation-triangle g-state-text g-state-warning' style='display: none; margin-right: 0.25rem;'></i>" +
            "<i class='js-docPretty gi gi-send'></i> " +
            "<span class='js-docPretty js-docUplSelText'>" + this.options.cptChooseFileBtn + "</span>" +
            "</div>" +
            "<input class='js-docUplInp g-doc-upl-inp' type='file' name='uploadedfile' accept='" + acceptExtension + "'/>" +
            "</form>");

        if (usePrettyFieldInput) {
            $form.on("click", ".js-docUplSel", function () {
                $(this).next(".js-docUplInp").click();
            });

            $form.on("change", ".js-docUplInp", function () {
                $(this).prev(".js-docUplSel").children(".js-docUplSelText").html(this.files[0].name);
            });
        } else {
            $form.find(".js-docPretty").css("display", "none");
        }

        return $form;
    };

    GDocument.prototype._uploadCallbackManual = function (dto, $elm) {
        var $form = $elm.is("form") ? $elm : $elm.find("form");
        //console.log("GDocument._uploadCallbackManual", dto, $form, $form[0]);
        var file = $form.find("input[type=file]")[0].files[0];
        if (dto.maxFileSize && file.size > dto.maxFileSize) {
            return $.Deferred().reject().promise();
        }

        var that = this;

        return Gordic.Utils.File.chunkUpload(file)
            .then(function (result /* : Gordic.General.ApplicationInterface.GFileInfoDto */) {
                //console.log("_uploadCallbackManual WS result", JSON.parse(result));
                return that.documentService.call("UploadDocument", { sessionName: "", fi: [result], dto: that.collectValues(dto, $elm) });
            }).then(function (result) {
                //console.log("_uploadCallbackManual service result", result);
                var r = GDocument.convertUploadResponse(result);
                that._uploadCompleted(r);
                return r;
            }).fail(function (xhr, status, error) {
                //console.log("_uploadCallbackManual error", xhr, status, error);
                if (typeof (error) === "string" && xhr && xhr.responseJSON)
                    error = xhr.responseJSON;
                that._showError(error);
                that._uploadFailed(error);
            });
    };

    GDocument.prototype.collectValues = function (dto, $dlg) {
        /// <summary>Moznost ovlivnit hodnoty pred odeslanim na server (pro pretizeni)</summary>
        /// <param name='dto' type='server.GDownloadResponseDto'>dto</param>
        /// <param name='$dlg' type='jQuery'>Flash panel</param>

        var $signChb = $dlg.find(".js-doc-sign");
        var $tstampChb = $dlg.find(".js-doc-tstamp");

        dto.makeSig = ($signChb.length === 1 && $signChb.gfield("getValue"));
        dto.makeTStamp = ($tstampChb.length === 1 && $tstampChb.gfield("getValue"));

        return dto;
    };

    //#endregion

    //#region Utils

    GDocument.prototype._getFileNameFromReqHeader = function (cd) {
        var rr = /filename=(?:\"{0,1})([\S ]+)(?:\")/g.exec(cd);
        return rr && rr.length === 2 ? rr[1] : "unknown";
        // 4.11.2019 - pnovak - pokus o to, aby pri urceni asociovano programu fungovaly korektne ceske znaky v nazvu souboru
        //var rr = /filename=(?:\"{0,1})([\S\-. ]+)(?:\"|$)/g.exec(cd);

        //var regex = /(filename=)/g;
        //regex.exec(cd);
        //return cd.substr(regex.lastIndex, cd.length - 1);
    };

    GDocument.prototype._getFileName = function (filePath) {
        var index = filePath.lastIndexOf("\\") + 1;
        return filePath.substr(index);
    };

    GDocument.prototype._getQueryString = function (dto) {
        if (!$.isPlainObject(dto)) {
            console.warn("dto musi byt plain object");
            return;
        }
        return "&" + $.param(dto);
    };

    GDocument.prototype._showError = function (error) {
        //console.log("GDocument._showError", error);
        error = error.exception || error;
        GDlg.showException(error);
        error.handled = true; //NOTE: Zamezi implicitnimu zobrazeni chyby TSkaly
    };

    GDocument.prototype._createPanel = function (dto, usePlugin) {
        /// <param name="dto" type="server.GDownloadResponseDto">dto</param>

        dto.caption = dto.caption || this.options.cptSaveFile;
        var $content = $("<div class='g-doc-upl-panel clearfix'>").append("<span>" + dto.caption + "</span>");

        if (!usePlugin)
            $content
                .append("<span>&nbsp;</span>")
                .append(this._createManualForm(dto.acceptExtension));
        else {
            var timeStampCheck;
            if (dto.Sign) {
                $content.append("<span class='gflashpanel__separator'></span>");
                $("<div>").appendTo($content)
                    .gcheck({
                        customClass: "js-doc-sign",
                        initialValue: dto.SignDefaultValue,
                        label: this.options.cptSign,
                        change: function (obj, val) {

                            if (timeStampCheck && val.value) {
                                timeStampCheck.gcheck("option", "disabled", false);
                                timeStampCheck.gcheck("setValue", true);
                            } else if (timeStampCheck) {
                                timeStampCheck.gcheck("setValue", false);
                                timeStampCheck.gcheck("option", "disabled", true);
                            }
                        }
                    });
            }

            if (dto.Timestamp) {
                $content.append("<span class='gflashpanel__separator'></span>");
                timeStampCheck = $("<div>").appendTo($content)
                    .gcheck({ customClass: "js-doc-tstamp", initialValue: dto.TimestampDefaultValue, label: this.options.cptTimeStamp });
            }
        }

        var $saveLink = $("<button class='js-uplcmd js-upl-ok g-doc-upl g-button g-button--primary' style='height: 22px; font-weight: bold;'>" + this.options.cptSave + "</button>");

        if (!usePlugin) {
            $saveLink.addClass("hidden");
            var that = this;
            $content.find("input:file").change(function () {
                $saveLink.removeClass("hidden");
                var cbacks = that._fileSelectedCallbacks;
                for (var i = 0; i < cbacks.length; i++)
                    cbacks[i].apply(that, arguments);
            });
        }

        $content.append($saveLink);
        this.createMiddleDialog(dto, $content);
        $.newDiv().insertBefore($saveLink).css({ "flex-shrink": "2", "flex-grow": "2" }); //Pomocna vypln, aby se tlacitko ulozit drzelo v prave casti
        return $content;
    };

    GDocument.prototype._waitForSave = function (dto) {
        /// <summary>Vytvori formular pro praci s dokumentem a ceka na klepnuti na tlacitko "ulozit".</summary>
        /// <returns type="Object">Promise()</returns>
        var def = $.Deferred();
        var that = this;
        var $dlg = this._createPanel(dto, !!dto.filePath);
        this.gcontent.showFlash({ id: this.options.flashPanelId, label: $dlg, customClass: "g-state-important", icon: "fa-warning" });
        var $flash = $dlg.parents(".gflashpanel");
        $dlg.on("click", ".js-upl-ok", function () {
            def.resolve(that.collectValues(dto, $dlg), $dlg);
        });

        var reject = function () {
            def.reject({ userReject: true });
        };

        $flash.on("gflashpanelclose", reject);
        this.gcontent.element.on({ close: reject });

        if (dto.filePath && dto.AutoUpload)
            $dlg.find(".js-upl-ok").click();

        return def.promise();
    };

    GDocument.prototype._correctFlashPanel = function ($flash) {
        /// <summary>Opravi vzhled flash panelu na hybridech</summary>
        var boxSizing = $flash.css("box-sizing");
        if (boxSizing === "content-box")
            $flash.css("box-sizing", "border-box");
    };

    GDocument.prototype._autoDownload = function (sessionName, $elm, deleteAfterDownload) {
        /// <summary>Automaticke stahovani s pomoci iframe a cookie</summary>
        /// <param name="sessionName" type="String">Nazev session</param>
        /// <param name="$elm" type="jQuery"></param>
        /// <returns type="promise">Promise</returns>

        //Inspirace z: https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

        var _this = this;
        var def = $.Deferred();
        var checkInterval = 100;

        var url = this._getUrls().getDownloadUrl(sessionName, false, deleteAfterDownload);
        var dwnWindow = window.open(url);

        var checkCookieFunc = function () {
            if (def.state() !== "pending") return;

            if (_this._hasDownloadCookie(sessionName)) {
                _this._clearDownloadCookie(sessionName);
                def.resolve(sessionName);
                return;
            } else {
                var doc = dwnWindow.window.document || dwnWindow.contentDocument;
                if (doc.document) doc = doc.document;

                if (doc && doc.body !== null && doc.body.innerHTML.length) {
                    _this._clearDownloadCookie(sessionName);
                    def.reject(JSON.parse(doc.body.innerHTML));
                    return;
                }
            }

            checkFunc();
        };

        var checkFunc = function () { setTimeout(function () { checkCookieFunc(); }, checkInterval); };
        var setupDwnCheckup = function (dwnWindow) {
            dwnWindow.onload = function () { checkCookieFunc(); }; //Zde se rychleji reaguje v pripade vzniku chyby
            dwnWindow.blur();
            window.focus();
            checkCookieFunc();
        };

        def.always(function () {
            setTimeout(function () { if (dwnWindow) dwnWindow.close(); }, 15000); //NOTE (BM): HOTFIX: Na nekterych iOS je vyžadováno ještě potvrzení "Chcete opravdu stáhnout?". Mezi tím se však okno zavře :-(
        });

        if (dwnWindow) setupDwnCheckup(dwnWindow);
        else {
            var dlg = this.gcontent ?
                this.gcontent.dialogs.messageBox("jres:31150190", $.newDiv(), Gordic.Dialogs.Buttons.mbbClose, Gordic.Dialogs.Icons.mbiInfo) //RC 31150190 : Stažení souboru
                :
                GDlg.messageBox("jres:31150190", $.newDiv(), Gordic.Dialogs.Buttons.mbbClose, Gordic.Dialogs.Icons.mbiInfo); //RC 31150190 : Stažení souboru

            dlg.on("closed", function () { def.reject(""); }); //NOTE (BM): Byl tu v rejectu z neznameho duvodu string s jednou mezerou. Pokud se zavrelo okno pro stazeni souboru bez doplnku pres odkaz (bez stazeni), tak to spadlo v zobrazeni errorWindow.

            //NOTE: Nebude-li fungovat, pak to zkusit přímo přes odkaz. Jen nebudeme vědět, jestli stažení opravdu bylo zahájeno :-/
            //$("<a href='"+url+"' target='_blank'>jres:31150189</a>") //RC 31150189 : Zahájit stahování
            $("<span>jres:31150191</span>").appendTo(dlg); //RC 31150191 : Stahování zahájíte klepnutím na tento odkaz:
            $("<a href='#'>jres:31150189</a>") //RC 31150189 : stáhnout.
                .on("click", function () {
                    //NOTE (BM): Prohlížeče údajně povolují popup okna, pokud jde o trusted událost. https://stackoverflow.com/a/67785098
                    setupDwnCheckup(dwnWindow = window.open(url));
                }).appendTo(dlg);

            //NOTE: Uzivatel nemusi kliknout na odkaz a muze zavrit dialog. Pak by soubor zustal viset v tempu, takze se jeste pokusime
            //      o uklid.
            def.fail(function () { _this._release(sessionName); });

            def.always(function () {
                var c = $.content(dlg);
                if (c) c.close();
            });
        }

        return def.promise();
    };

    GDocument.prototype._hasDownloadCookie = function (sessionName) {
        return document.cookie.indexOf(sessionName) > -1;
    };

    GDocument.prototype._clearDownloadCookie = function (sessionName) {
        document.cookie = sessionName + "=; path=/; expires=" + new Date(0).toUTCString() + ";";
    };

    GDocument.prototype._release = function (sessionName) { this.documentService.call("ReleaseSession", { sessionName: sessionName }) };

    GDocument.prototype.createMiddleDialog = function (dto, $dlg) {
        //console.log("GDocument.createMiddleDialog()", arguments);
    };

    GDocument.convertUploadResponse = function (res) {
        /// <summary>Prevede interni dto na objekt, ktery by meli pouzivat ostatni v JS</summary>
        /// <param name="res" type="server.GUploadResponseDto"></param>
        return { CustomData: res.CustomData };
    };

    namespace("Gordic.Document.WebClient.GDocument", GDocument);

    //#region interni
    GDocument.prototype._getUrls = function () { return urls; }

    var urls = (function () {
        //Pomocny objekt pro praci s URL na handler kvuli starym appkam je nutne respektovat GinUrl (stranka nemusi byt v rootu)
        var uploadPrefix = "Gin/WebServices/GDocumentsHanler.ashx?m=UploadDocument";
        var downloadPrefix = "Gin/WebServices/GDocumentsHanler.ashx?m=DownloadDocument";

        function correctUrl(url) {
            if (window.GinUrl) //def. ve starych
                url = window.GinUrl + url.substr(4);
            return url;
        }

        return {
            uploadPrefix: correctUrl(uploadPrefix),
            downloadPrefix: correctUrl(downloadPrefix),
            getDownloadUrl: function (sName, isPluginSupported, del) {
                del = typeof del === "undefined" ? true : del;
                //var isPluginSupported = GBrowserExtras.isPluginSaveOpenSupported();
                sName = sName ? (this.downloadPrefix + "&sessionName=" + sName) : this.downloadPrefix;
                return sName + "&plugin=" + (isPluginSupported ? "True" : "False") + "&del=" + (del ? "True" : "False");
            },
            getDirectUrl: function (tempFilePath, options) {
                options = $.extend({ autoDelete: false }, options);
                var url = this.downloadPrefix + "&cfile=" + tempFilePath;
                if (options.autoDelete) url += "&del=True";
                if (options.disposition) {
                    if (options.disposition === "attachment") url += "&disp=a";
                    else if (options.disposition === "inline") url += "&disp=i";
                    else throw new GError("Unknown options.disposition value = " + options.disposition);
                }
                return url;
            },
            getUploadUrl: function (uplType, failTest) {
                var url = this.uploadPrefix + "&UploaderType=" + uplType;
                if (failTest)
                    url += "&failTest=1";
                return url;
            }
        };
    })();

    //#endregion


    //#endregion

    return GDocument;
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\GFile.js 

var GFile = (function ($) {
    "use strict";

    var defaultOptions = {
        
        fileServiceClass: "Gordic.Gui.WebControls.GFileServiceProvider"
    };


    function GFile(gcontent, options) {

        this.fileService = !!gcontent ? gcontent.createServiceContent(defaultOptions.fileServiceClass) : new GContent(defaultOptions.fileServiceClass);
        this.options = $.extend({}, defaultOptions, options);
    }

   /* GFile.prototype.getContent = function () {
        return this.fileFieldService;
    };*/

    GFile.prototype.destroy = function () {
        if (this.fileService) {
            this.fileService.close();
        }
    }
    GFile.prototype.transferFile = function (guid) {
        return this.fileService.call("TransferFile", { guid: guid });
    }
    GFile.prototype.cleanUpFile = function (guid) {
        return this.fileService.call("CleanUpFile", { guid: guid });
    }
    GFile.prototype.removeFile = function (guid, fileServiceClass) {
        fileServiceClass = fileServiceClass || this.options.fileServiceClass;
        var isDefaultSrv = fileServiceClass === this.options.fileServiceClass;
        var fileSrv = isDefaultSrv ? this.fileService : new GContent(fileServiceClass);
        return isDefaultSrv && guid.indexOf("ext") === 0 ? $.Deferred().resolve().promise() : fileSrv.call("RemoveFile", { uid: guid })
            .then(function (result) {
                if (result === true) {

                    return $.Deferred().resolve();
                }
                else {
                    return $.Deferred().reject();
                }
            }, function () {
                return $.Deferred().reject();
            }).always(function () {
                if (!isDefaultSrv) {
                    fileSrv.close();
                }
            });
    };

    

    GFile.prototype.download = function (fileInfo, fileServiceClass, element, xhrCallback, keepInitialGuid, deleteAfterDownload) {
        var _this = this;
        
        if (typeof fileServiceClass === "string" || typeof fileServiceClass === "undefined") {
            fileServiceClass = fileServiceClass || this.options.fileServiceClass;
            element = element || document.body;
            deleteAfterDownload = deleteAfterDownload || false;
        }
        else if (fileServiceClass) {
            element = fileServiceClass.element || document.body;
            xhrCallback = fileServiceClass.xhrCallback;
            keepInitialGuid = fileServiceClass.keepInitialGuid || false;
            deleteAfterDownload = fileServiceClass.deleteAfterDownload || false;
            fileServiceClass = fileServiceClass.fileServiceClass || this.options.fileServiceClass;
        }
        

        return this.fileService.call("PrepareFileDownload", { fileInfo: fileInfo, fileServiceClass: fileServiceClass, keepInitialGuid: keepInitialGuid, deleteAfterDownload: deleteAfterDownload }, undefined, { xhr: xhrCallback })
            .then(function (result) { 
                return _this._autoDownload(result, element, deleteAfterDownload);
            });
    };

    GFile.prototype.upload = function (formData, progress) {
        var that = this;

        progress = progress || $.noop;
        var xhr = $.ajax({
            url: urls.getUploadUrl(),
            type: 'POST',
            data: formData, //NOTE: FormData je podporovan az od IE 10, na IE 9 zrejme bude muset byt pouzit ActiveX
            processData: false,
            contentType: false,
            progress: progress 
            
        })

         return xhr.then(function (result) {
            //PNOVAK: Nejspíš kvůli hybridovi - Z USU01 se záhadně místo řetězce vrací již deserializovaný objekt 
            return typeof result === "string" ? JSON.parse(result) : result;
        }, function (result) {
            return result;
        }).promise(/*xhr*/);
    };
    
    GFile.prototype.chunkUpload = function (file, cancellationToken, lifetime) {
        //Struktury odpovidaji Gordic.Utils.File.chunkUpload(), oproti chunUpload() vraci JQueryPromise<GFileInfoDto[]>
        return Gordic.Utils.File.chunkUpload.apply(null, arguments)
            .then(function (fi) { return [fi] });
    }

    GFile.prototype._autoDownload = GDocument.prototype._autoDownload;
    GFile.prototype._hasDownloadCookie = GDocument.prototype._hasDownloadCookie;
    GFile.prototype._clearDownloadCookie = GDocument.prototype._clearDownloadCookie;
    GFile.prototype._release = function (sessionName) { this.fileService.call("ReleaseSession", { sessionName: sessionName }); }; //NOTE (BM): Override pouzivany v GDocument._autoDownload
    GFile.prototype._getUrls = function () { return urls; };

    var urls = (function () {
        //Pomocny objekt pro praci s URL na handler kvuli starym appkam je nutne respektovat GinUrl (stranka nemusi byt v rootu)
        var uploadPrefix = "Gin/WebServices/GFileHandler.ashx";
        var downloadPrefix = "Gin/WebServices/GDocumentsHanler.ashx?m=DownloadDocument";

        function correctUrl(url) {
            if (window.GinUrl) //def. ve starych
                url = window.GinUrl + url.substr(4);
            return url;
        }

        return {
            uploadPrefix: correctUrl(uploadPrefix),
            downloadPrefix: correctUrl(downloadPrefix),
            getDownloadUrl: function (sName, isPluginSupported, del) {
                del = typeof del === "undefined" ? false : del;
                if (sName)
                    return this.downloadPrefix + "&sessionName=" + sName + "&del=" + (del ? "True" : "False");

                return this.downloadPrefix + "&del=" + (del ? "True" : "False");
            },
            getUploadUrl: function () {
                var url = this.uploadPrefix;
                return url;
            }
        };
    })();

    return GFile;
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gfilepreview.js 

(function () {
    'use strict';
    var GLog;

    $.widget('gordic.gfilepreview',
        {
            options: {
                loadingText: 'jres:31750003', //RC 31750003 : Probíhá načítání náhledu ...
                caching: true,
                cacheLimit: 10, // max 10 items
                cacheSizeLimit: 50, // 50MB of realsize
                cacheRenewal: 10, // 10 minutes,
                autofitParentElement: ['.g-sbp-content', '.gcwpanel', '.ui-dialog-content',],
                autofitOptions: { resizersOnTab: false, },
                ownMenuBar: true,
                showDownloadForUnknown: true,
                customDownload: null,
                customDownloadOptions: {},
                displayFileName: true,
                renderingEngineOverride: undefined,
                engineOptions: {},
            },
            /** @type {Gordic.Components.FilePreview.IGFilePreviewRenderer} */
            activeRenderer: null,
            /** @type {ObjectLiteral<Gordic.Components.FilePreview.IGFilePreviewRenderer>} */
            renderers: null,
            /** @type {GActionList} */
            actions: null,
            /** @type {JQuery} */
            contentArea: null,
            /** @type {GContent} */
            _serviceContent: null,
            /** @type {GCancellationToken} */
            _currentCancellationToken: null,
            _isDestroyed: false,
            _create: function () {
                this._superApply(arguments);

                this.element.data('gordic-gfilepreview',
                    this.element.data(this.widgetFullName));

                this.options = $.extend({}, this.options);
                if (GLog == null) {
                    GLog = new Gordic.Diagnostics.GLog({
                        fileName: 'gfilepreview.js',
                        name: 'gordic.gfilepreview',
                    });
                }

                this.renderers = {
                    wopi: new Gordic.Components.FilePreview.GWopiRenderer(),
                    web: new Gordic.Components.FilePreview.GWebRenderer(),
                };

                this.activeRenderer = null;

                this.keyCache = {}; // key index to cache - for fast file retrieve
                this.timeCache = {}; // timestamp index to cache - for fast cleaning
                this.cacheSize = 0;

                this.displayFromServer =
                    Utils.debounced(this.displayFromServer, 250);

                this._initMenuBar();

                this.element.addClass('gfilepreview');
                this.contentArea = $.newDiv('gfilepreview_content').attr("tabindex", "0")
                    .appendTo(this.element);

                this.contentArea.gautofit($.extend(this.options.autofitOptions, {
                    parentElement: this.options.autofitParentElement,
                }));

                this._serviceContent =
                    new GContent('Gordic.Gui.WebControls.GFileServiceProvider');

                this.refresh();
            },

            _destroy: function () {
                Gordic.ResizeManager.unobserve(this.element[0], 'filePreview');
                this._isDestroyed = true;

                if (this._currentCancellationToken != null) {
                    this._currentCancellationToken.update({ isCancelled: true, });
                }

                if (this.serverLoadTask != null) {
                    this.serverLoadTask.cancel(true);
                }
                if (this.fullscreen) {
                    $.content(this.fullscreen).close();
                    this.fullscreen = null;
                }
                this.renderers.web.destroy();
                this.renderers.wopi.destroy();

                this._clearContentArea();

                this.clearCache();
                this.element.empty();
                this.element.removeClass('gfilepreview');
                this._serviceContent.close();

                delete this.cache;
                delete this.displayFromServer;
                this._super();
            },

            refresh: function () {
                this.renderers.web.clear();
                this.renderers.wopi.clear();

                this._clearContentArea();

                if (this._menuBar$) {
                    this._menuBar$.gbuttonpanel('destroy');
                    this._menuBar$.empty();
                    this._menuBar$.remove();
                    this._menuBar$ = null;
                }

                if (this._fileName$) {
                    this._fileName$.remove();
                    this._fileName$ = null;
                }
            },

            _setOption: function (key, value) {
                if (key === 'value') {
                    value = this._constrain(value);
                }
                this._super(key, value);
            },

            _setOptions: function (options) {
                this._super(options);
                this.refresh();
            },

            /**
              * Function which will reject current rendering promise
              * This is the only place, where def can be rejected.
              * @param {any} def deferred
              * @param {any} cancToken cancelationToken
              * @param {any} err error object
              * @param {any} exc exception object
              */
            _failFnc: function (def, cancToken, input, err, exc) {
                if (!cancToken.isCancelled) {
                    if (err && err.exception != null) { exc = err; }

                    if (exc && exc.exception) {
                        def.reject({
                            name: 'exception',
                            message: exc.exception.longMessage,
                            input: input
                        });
                    } else {
                        if (err === "abort") {
                            err = { name: 'Cancelled', input: input };
                        }
                        def.reject(typeof err === "string" ? { name: err, input: input } : typeof err === "object" ? $.extend(err, { input: input }) : err);
                    }
                } else {
                    var byUser = cancToken.canceledByUser;
                    def.reject(byUser ? { name: 'Cancelled', input: input } : false);
                }
            },

            /**
              * Shows preview of given file. Currently is supported PDF.
              * @param {Uint8Array} file  - file content
              * @param {string} fileName Name of file (with extension)
              * @param {object} [opts] Options for file opening.
              * @returns {JQueryPromise} promise
              */
            displayFile: function (file, fileName, opts) { // display fileContent - byteArray
                var _this = this;

                return _this._currentPromise = this._beginLoading().then(function (data) {
                    var def = $.Deferred();

                    var ext = (opts ? opts.extension : null) ||
                        // https://www.jstips.co/en/javascript/get-file-extension/
                        fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);

                    var cancToken = data.cancellationToken;
                    var failFnc = _this._failFnc.bind(_this, def, cancToken, { fileName: fileName, file: file });

                    if (ext == null || ext === '') {
                        // handle display with unknown extension
                        failFnc({ message: 'jres:31750002', });//RC 31750002 : Neznámá přípona souboru.
                    } else {

                        var invokeData = {
                            data: file,
                            extension: ext,
                            fileName: fileName,
                            isBase64: opts && opts.isBase64,
                            auxilary: {},
                        };

                        if (_this._isDestroyed || cancToken.isCancelled) {
                            def.reject(false); return def.promise();
                        }

                        _this._invokeRenderer(
                            invokeData,
                            cancToken, {
                            renderingEngineOverride:
                                _this.options.renderingEngineOverride,
                        })
                            .then(def.resolve, failFnc)
                            .progress();
                    }

                    return def.promise();
                }).then(function () {
                    _this._finishLoading();
                }, function (err) {
                    _this._finishLoading(err);
                });
            },

            _normalizeInput: function (gcontent, method, input) {
                var def = $.Deferred();

                if ($.isPlainObject(gcontent)) {
                    def.resolve(gcontent);
                } else if (typeof gcontent === 'function') {

                    var result = gcontent(input);
                    if (result.then !== null) {
                        result.then(def.resolve, def.fail);
                    } else {
                        def.resolve(result);
                    }

                } else if ($.isPlainObject(method)) {

                    def.resolve({
                        gcontent: gcontent,
                        input: method,
                    });

                } else {

                    def.resolve({
                        gcontent: gcontent,
                        method: method,
                        input: input,
                    });

                }

                return def.promise();
            },

            /**
            * Shows preview of file obtained from server
            * @param {GContent} gcontent Instance of GContent class to get GFilePreviewInfoDto from
            * @param {string} method Method on GContent to call to get the file
            * @param {any} input Input to call method with, to get the file.
            * @returns {JQueryPromise} promise
            */
            displayFromServer: function (gcontent, method, input) {
                var _this = this;

                return this._normalizeInput(gcontent, method, input)
                    .then(function (normInput) {
                        if (_this._currentPromise && _this._currentPromise.state() === "pending" &&
                            JSON.stringify(normInput) === JSON.stringify(_this.lastDisplayCall)) {
                            return _this._currentPromise;
                        }
                        // remember displayFromServer
                        _this.lastDisplayCall = normInput;

                        _this._initMenuBar();

                        return _this._currentPromise = _this._beginLoading().then(function (data) {
                            // On Finish
                            var def = $.Deferred();

                            // try get cached file for given input
                            var cachedRecord = _this._getCachedRecord(normInput.input);
                            var cancToken = data.cancellationToken;
                            var failFnc = _this._failFnc.bind(_this, def, cancToken, normInput.input);

                            if (cachedRecord) {
                                if (data.cancellationToken.isCancelled) {
                                    failFnc();
                                    return def.promise();
                                }

                                _this._invokeRenderer(
                                    cachedRecord,
                                    data.cancellationToken,
                                    {
                                        renderingEngineOverride:
                                            _this.options.renderingEngineOverride,
                                    }
                                ).then(def.resolve, failFnc);

                            } else {
                                var promise;

                                if (normInput.gcontent instanceof GContent) {
                                    promise = normInput.gcontent.call(
                                        normInput.method,
                                        normInput.input
                                    ).done(function (response) {
                                        if (data.cancellationToken.isCancelled) {
                                            failFnc();
                                        } else {
                                            _this._displayResponse(
                                                normInput.input,
                                                response,
                                                data.cancellationToken
                                            ).then(def.resolve, failFnc);
                                        }
                                    }).fail(failFnc);
                                } else {


                                    Gordic.Async.GTaskManager.delayedStart(normInput.gcontent, normInput.input).then(function (serverLoadTask) {
                                        if (_this.serverLoadTask != null) {
                                            _this.serverLoadTask.cancel(true);
                                            _this.serverLoadTask = null;
                                        }

                                        _this.serverLoadTask = serverLoadTask;
                                        var promise = serverLoadTask.getPromise();
                                        promise.progress(function (ctx) {
                                            if (ctx == null ||
                                                ctx.progress == null ||
                                                data.cancellationToken.isCancelled) {
                                                return;
                                            }

                                            _this._updateLoadingBar(
                                                data.cancellationToken, ctx.progress);
                                        }).always(function () {
                                            this.clean();
                                        });

                                        data.cancellationToken.registerUpdate(function (o) {
                                            if (o.isCancelled && serverLoadTask) {
                                                if (serverLoadTask.cancel != null) {
                                                    serverLoadTask.cancel(true);
                                                } else if (serverLoadTask.reject) {
                                                    serverLoadTask.reject();
                                                }
                                            }
                                        });
                                        promise.done(function (response) {
                                            if (data.cancellationToken.isCancelled) {
                                                failFnc();
                                            } else {
                                                _this._displayResponse(
                                                    normInput.input,
                                                    response,
                                                    data.cancellationToken
                                                ).then(def.resolve, failFnc);
                                            }
                                        }).fail(failFnc);
                                    })
                                }
                            }

                            return def.promise();
                        })
                            .then(function () {
                                _this._finishLoading();
                            }, function (err) {
                                _this._finishLoading(err);
                            });
                    });
            },

            /**
              * Display response (GFilePreviewDto) obtained from GContent
              *
              * @param {any} input input for caching
              * @param {any}response response from server
              * @param {any} cancellationToken cancellation token to be able to stop work
              * @returns {JQueryPromise} promise
              */
            _displayResponse: function (input, response, cancellationToken) {
                var def = $.Deferred();
                var _this = this;

                if (this._isDestroyed || cancellationToken.isCancelled) {
                    return def.reject(false).promise();
                }
                var notSeverePromises = [];

                if (response != null) {
                    if (response.result != null) {
                        response = response.result; // Async result -> regular result
                    } else if (response.Extension || response.FileName || response.Content) {
                        response = { data: response }; // Compatibility for FilePreviewDto
                    }

                    var extension = response.data.Extension;
                    var errors = response.errors;
                    var fileName = response.data.FileName;

                    extension = extension != null && extension.length > 0 &&
                        extension.startsWith('.') ?
                        extension.substring(1, extension.length) : extension;

                    if (errors != null && errors.length > 0) {

                        var isSevere = false;
                        for (var i = 0; i < errors.length; i++) {
                            var err = errors[i];
                            isSevere = isSevere || err.severity == null || err.severity > 1;
                            if (!isSevere) notSeverePromises.push(this._showWarningMessage(err.message, err.severity));
                        }

                        if (isSevere) {
                            errors[0].fileName = fileName;
                            errors[0].fileExtension = extension;
                            errors[0].file = response.data.Content != null ?
                                atob(response.data.Content) : null;

                            this.menuBar([], response.data, true);
                            this.fileName();

                            def.reject(errors);
                            return def.promise();
                        }
                    }
                }
                $.when.apply(null, notSeverePromises).then(function () {
                    const toIgnore = ["Content", "MimeType", "OtherDataFormats", "Wopi", "Extension", "FileName"];
                    var data = {
                        isBase64: true,
                        data: response.data.Content,
                        mimeType: response.data.MimeType,
                        otherDataFormats: response.data.OtherDataFormats,
                        wopi: response.data.Wopi,
                        extension: response.data.Extension,
                        fileName: response.data.FileName,
                        auxilary: {
                            input: input,
                            data: Object.keys(response.data).reduce(function (prev, it) { if (toIgnore.indexOf(it) >= 0) return prev; prev[it] = response.data[it]; return prev; }, {})
                        },
                    };

                    _this._invokeRenderer(data, cancellationToken, {
                        renderingEngineOverride: _this.options.renderingEngineOverride,
                    }).then(function () {
                        if (_this._isDestroyed || cancellationToken.isCancelled) {
                            def.reject(false);
                            return;
                        }

                        if (!response.Wopi) {
                            setTimeout(function () {
                                _this._cacheData(input, {
                                    isBase64: data.isBase64,
                                    mimeType: data.mimeType,
                                    data: data.data,
                                    otherDataFormats: data.otherDataFormats,
                                    auxilary: data.auxilary,
                                    size: data.data.length,
                                    extension: data.extension,
                                    fileName: data.fileName,
                                });
                            }, 100);
                        }
                        def.resolve();
                    }, def.reject);
                });
                return def.promise();
            },

            /**
              * Invokes renderer
              * @param {Gordic.Components.FilePreview.IGWebRendererDisplayDTO|Gordic.Components.FilePreview.IGWopiRendererDisplayDTO} data data
              * @param {object} cancellationToken token
              * @param {object} opts options
              * @returns {any} any
              */
            _invokeRenderer: function (data, cancellationToken, opts) {
                var _this = this;
                var selectedRenderer;

                _this._trigger('prerender', null, data);

                if (data.Wopi) {
                    data = data.Wopi;
                    selectedRenderer = this.renderers.wopi;
                } else {
                    selectedRenderer = this.renderers.web;
                }

                if (this.activeRenderer !== selectedRenderer) {
                    if (this.activeRenderer != null) {
                        this.activeRenderer.clear();
                    }

                    this._clearContentArea();
                    this.activeRenderer = selectedRenderer;
                }

                if (this._isDestroyed || cancellationToken.isCancelled) {
                    return $.Deferred().reject(false).promise();
                }

                var result = this.activeRenderer.display(this.contentArea, data,
                    $.extend({
                        actions: this.actions,
                        cancellationToken: cancellationToken,
                        engineOptions: this.options.engineOptions,
                    }, opts));

                result.progress(
                    this._updateLoadingBar.bind(this, cancellationToken));

                var menuBarPromise = this.activeRenderer.getMenuBar();

                if (menuBarPromise != null) {
                    menuBarPromise.done(function (menuBar) {
                        _this.menuBar(menuBar);
                    })
                        .fail(function (err) {
                            _this.menuBar(err === null ? [] : err, true);
                        })
                        .always(function () {
                            _this.fileName(data.fileName);
                        });
                } else {
                    this.fileName(data.fileName);
                }

                return result.then(function () {
                    if (_this._isDestroyed || cancellationToken.isCancelled) {
                        return;
                    }

                    _this._trigger('render', null, data);
                });
            },

            _updateLoadingBar: function (cancToken, ctx) {
                if (!cancToken.isCancelled &&
                    this.element.hasClass('gfilepreview') &&
                    this.element.hasClass('gcover')) {
                    this.element.gcover('option', ctx);
                }
            },

            ///////////////////////////////
            /// CACHING OF SERVER CALLS ///
            //////////////////////////////
            _cacheData: function (key, value) {
                if (this.options.caching && key != null) {
                    var stringifiedKey = JSON.stringify(key);

                    this._refreshCache(key, value.size); // refresh cache - remove old records

                    var existingCachedRecord = this.keyCache[stringifiedKey];

                    var now = Date.now();
                    if (existingCachedRecord) {
                        var delta = now - existingCachedRecord.timestamp;
                        if (delta > this.options.cacheRenewal * 60000) {
                            // renew in timeCache;
                            delete this.timeCache[existingCachedRecord.timestamp];
                            this.timeCache[now] = existingCachedRecord.key;

                            existingCachedRecord.value = value;
                            existingCachedRecord.timestamp = now;
                            existingCachedRecord.size = value.size;
                        }
                    } else {
                        this.keyCache[stringifiedKey] = {
                            key: stringifiedKey,
                            value: value,
                            timestamp: now,
                            size: value.size,
                            usage: 1,
                        };

                        this.timeCache[now] = stringifiedKey;

                        this.cacheSize += value.size;
                    }
                }
            },

            _getCachedRecord: function (key) {
                if (this.options.caching && !key.forceNew) {
                    this._refreshCache();

                    var stringifiedKey = JSON.stringify(key);
                    var existingCachedRecord = this.keyCache[stringifiedKey];

                    if (existingCachedRecord) {
                        existingCachedRecord.usage++;
                        //renew on getting
                        var now = Date.now();
                        delete this.timeCache[existingCachedRecord.timestamp];
                        this.timeCache[now] = existingCachedRecord.key;
                        existingCachedRecord.timestamp = now;

                        return existingCachedRecord.value;
                    }

                }

                return null;
            },

            _refreshCache: function (keyToStore, requiredSizeForKeyToStore) {
                var that = this;
                var timeCacheKeys = Object.keys(this.timeCache);
                if (timeCacheKeys.length === 0) {
                    return;
                }

                var toRemove = [];

                var i = 0, l = 0;
                var now = Date.now();
                while (now - timeCacheKeys[i] > this.options.cacheRenewal * 60000) {
                    var key = this.timeCache[timeCacheKeys[i++]];

                    if (keyToStore && key === keyToStore) {
                        continue;
                    }

                    toRemove.push(key);
                }

                for (i = 0, l = toRemove.length; i < l; i++) {
                    this._removeCacheRecord(this.keyCache[toRemove[i]]);
                }

                var sizeDelta =
                    this.cacheSize - this.options.cacheSizeLimit * 500000; // *1000000/2 - (MEGA)/(2 Bytes/char) -> 50 (MB) -> 25M chars

                if (sizeDelta > 0 ||
                    requiredSizeForKeyToStore &&
                    requiredSizeForKeyToStore > -1 * sizeDelta) {
                    // free cache because of space

                    var keycacheKeys = Object.keys(this.keyCache);
                    var sortedKeys = keycacheKeys.sort(function (a, b) {
                        if (keyToStore && a.key === keyToStore) {
                            return 1;
                        }

                        if (keyToStore && b.key === keyToStore) {
                            return -1;
                        }

                        var result =
                            that.keyCache[a].usage - that.keyCache[b].usage;

                        if (result === 0) {
                            result =
                                that.keyCache[a].timestamp - that.keyCache[b].timestamp;
                        }

                        return result;
                    });

                    for (i = 0, l = sortedKeys.length; i < l; i++) {
                        this._removeCacheRecord(this.keyCache[sortedKeys[i]]);

                        sizeDelta =
                            this.options.cacheSizeLimit * 500000 - this.cacheSize;

                        if (sizeDelta > 0 && requiredSizeForKeyToStore == null ||
                            requiredSizeForKeyToStore < sizeDelta) {
                            break;
                        }

                    }

                }
            },

            _removeCacheRecord: function (record) {
                if (record) {
                    this.cacheSize -= record.size;
                    delete this.timeCache[record.timestamp];
                    delete this.keyCache[record.key];
                    delete record.size;
                    delete record.timestamp;
                    delete record.value;
                    delete record.key;
                }
            },

            clearCache: function () {
                var keycacheKeys = Object.keys(this.keyCache);

                for (var i = 0, l = keycacheKeys.length; i < l; i++) {
                    this._removeCacheRecord(this.keyCache[keycacheKeys[i]]);
                }

                this.keyCache = {};
                this.timeCache = {};
                this.cacheSize = 0;
            },

            _initMenuBar: function () {

                var _this = this;
                _this.fullscreen = null;
                var origParent = null;
                var nextSibling = null;

                if (this.actions == null) {

                    this.actions = new GActionList([new GAction({
                        name: 'refreshAction',
                        icon: 'gi-refresh',
                        caption: 'jres:31750014', //RC 31750014 : Načíst aktuální
                        run: function () {
                            _this.displayFromServer(_this.lastDisplayCall.gcontent,
                                _this.lastDisplayCall.method,
                                $.extend({}, _this.lastDisplayCall.input, {
                                    forceNew: true,
                                })
                            );
                        },
                    }), new GAction({
                        name: 'fullscreenAction',
                        icon: 'gi-window-full',
                        caption: 'jres:31750121', //RC 31750121 : Zobrazit na celou obrazovku
                        checked: false,
                        run: function () {
                            if (_this.fullscreen === null) {
                                _this.fullscreen = GDlg.showModalWindow($.newDiv().gcontent({}))
                                    .dialog('maximize', true)
                                    .dialog('option', {
                                        'noMaximize': true,
                                        draggable: false,
                                        resizable: false,
                                        title: 'jres:31750123', //RC 31750123 : Náhled souboru - režim celé obrazovky
                                    });

                                _this.fullscreen.on('close fullscreenfilelistclose', function () {
                                    if (_this.actions.fullscreenAction.checked()) {
                                        _this.actions.fullscreenAction.run();
                                    }
                                });

                                origParent = _this.element.parent();
                                nextSibling = _this.element[0].nextSibling || null;

                                if (_this._trigger('fullscreenon', null, {
                                    fullscreenElement: _this.fullscreen,
                                    originalElement: origParent,
                                }) !== false) {
                                    _this.element.detach().appendTo(_this.fullscreen);
                                }

                                _this.contentArea.trigger('rendererfullscreenon', {
                                    fullscreenElement: _this.fullscreen,
                                    originalElement: origParent,
                                })

                                _this.contentArea.gautofit('destroy');
                                _this.contentArea.gautofit({parentElement: _this.fullscreen});

                                this.update({
                                    icon: 'gi-window-original',
                                    caption: 'jres:31750122',
                                }); //RC 31750122 : Ukončit režim celé obrazovky

                                this.checked(true);
                                this.visible(false);
                            } else {
                                this.checked(false);
                                this.visible(true);

                                if (_this._trigger('fullscreenoff', null, {
                                    fullscreenElement: _this.fullscreen,
                                    originalElement: origParent,

                                }) !== false) {
                                    _this.element.detach();
                                    if (nextSibling !== null) _this.element.insertBefore($(nextSibling));
                                    else _this.element.appendTo(origParent);
                                }

                                _this.contentArea.trigger('rendererfullscreenoff', {
                                    fullscreenElement: _this.fullscreen,
                                    originalElement: origParent,
                                })

                                origParent = _this.fullscreen = nextSibling = null;
                                _this.contentArea.gautofit('destroy');
                                _this.contentArea.gautofit(
                                    $.extend(_this.options.autofitOptions, {
                                        parentElement: _this.options.autofitParentElement,
                                    }));
                                this.update({
                                    icon: 'gi-window-full',
                                    caption: 'jres:31750121',
                                }); //RC 31750121 : Zobrazit na celou obrazovku
                            }
                        },
                    })]);
                    if (this.options.customDownload) {
                        this.actions.add(new GAction($.extend({
                                name: 'downloadAction',
                                icon: 'gi-download',
                                visible: !!_this.lastDisplayCall,
                                enabled: !!_this.lastDisplayCall,
                                caption: 'jres:31750026', //RC 31750026 : Stáhnout
                                tooltip: 'jres:31750481', //RC 31750481 : Stáhnout soubor pro náhled
                                run: function () {
                                    var res = _this.options.customDownload(_this.lastDisplayCall.input);
                                    if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === "function")
                                        this.setPending(res);
                                },
                            }, _this.options.customDownloadOptions)));

                    }
                }


                this.actions.downloadAction && this.actions.downloadAction.visible(!!_this.lastDisplayCall);
                this.actions.downloadAction && this.actions.downloadAction.enabled(!!_this.lastDisplayCall);
                this.actions.refreshAction.visible(!!_this.lastDisplayCall);
                this.actions.refreshAction.enabled(!!_this.lastDisplayCall);
            },

            menuBar: function (params, data, isErr) { // fcion for creating own menuBar
                // 22.01.2020 - TFeik
                // Oprava const v JavaScriptu.
                var opts = {
                    menuBar: params,
                    data: data,
                    isError: isErr,
                    activeEngineType:
                        this.activeRenderer && this.activeRenderer.getActiveEngineType ?
                            this.activeRenderer.getActiveEngineType() :
                            null,
                };
                this._trigger('modifymenubar', null, opts);

                let profile = null;
                if (opts.menuBar != null) {
                    Gordic.Utils.Menu.makeIds(opts.menuBar);
                    profile= Gordic.Utils.Menu.createProfile(opts.menuBar);
                }

                if (this._lastMenuBar === JSON.stringify(profile) && opts.menuBar != null) {
                    return;
                }

                this._lastMenuBar = JSON.stringify(profile);

                if (this.options.ownMenuBar) {
                    if (!this._menuBar$) {
                        this._menuBar$ = $.newDiv().prependTo(this.element);
                    } else if (this._menuBar$.hasClass("gbuttonpanel")) {
                        this._menuBar$.gbuttonpanel('destroy');
                    }

                    if (opts.menuBar != null && opts.menuBar.length > 0) {
                        this._menuBar$.gbuttonpanel({
                            params: opts.menuBar,
                            customClass: 'gbuttonpanel--bar',
                        });
                    } else {
                        if (this._menuBar$ &&
                            this._menuBar$.hasClass('gbuttonpanel')) {
                            this._menuBar$.gbuttonpanel('destroy');
                        }

                        this._menuBar$.remove();
                        this._menuBar$ = null;
                    }

                    this._trigger('menubardone', null, { element: this._menuBar$, });
                } else {
                    this.element
                        .closest('.gsbpanel, .ui-dialog-content, .gtab')
                        .trigger('contentnewops', [{ menuBar: opts.menuBar, }]);
                }
            },

            getCanvasDrawer: function () {
                return this.activeRenderer ?
                    this.activeRenderer.getCanvasDrawer() : null;
            },

            fileName: function (filename) {
                if (this.options.displayFileName && filename != null) {
                    if (!this._fileName$) {
                        this._fileName$ =
                            $.newDiv('gfilepreview__filename')

                                .prependTo(this.element);
                    }
                    this._fileName$.empty().append($('<i>').prop('class', 'fa ' +
                        Utils.File.getFileTypeIconClass(filename)))
                        .append($.newSpan().text(filename));
                } else {
                    if (this._fileName$ != null) {
                        this._fileName$.remove(); this._fileName$ = null;
                    }

                }
            },

            /// WIDGET HANDLING ///
            _clearContentArea: function () {
                this._trigger("clearcontent");
                if (this.activeRenderer)
                    this.activeRenderer.clearContentArea();
                else
                    this.contentArea.empty();
                this._clearWarning();
            },

            _beginLoading: function () {
                var _this = this;
                var def = $.Deferred();
                this._trigger('loadStart', null);

                return def.resolve((function () {

                    _this._clearContentArea();

                    _this.element.gcover({
                        text: _this.options.loadingText,
                        total: 100,
                        current: 0,
                        cancelAction: new GAction({
                            name: 'actCancelFilePreviewLoad',
                            caption: 'jres:31750124', //RC 31750124 : Zrušit načítání
                            run: function (ev, ctx) {
                                _this._currentCancellationToken.update({
                                    isCancelled: true,
                                    canceledByUser: true,
                                });
                            },
                        }),
                    });

                    if (_this._currentCancellationToken) {
                        _this._currentCancellationToken.update({
                            isCancelled: true,
                        });
                    }

                    var cancellationToken = new GObservableObject({
                        isCancelled: false,
                        canceledByUser: false,
                    });

                    _this._currentCancellationToken = cancellationToken;

                    return {
                        cancellationToken: cancellationToken,
                    };
                })());
            },

            _finishLoading: function (err) {
                var _this = this;

                if (this.element.hasClass('gcover') && err !== false) {
                    this.element.gcover('destroy');
                    Gordic.ResizeManager.forceRefresh(this.element.get(0));
                }

                if (err && err !== 'abort') {
                    if (err instanceof Array && err.length > 0) {
                        var bigError = err.find(function (it) { return !_this._isWarningMessage(it) });
                        if (bigError != null) {
                            this._showErr(bigError);
                        } else {
                            err.filter(this._isWarningMessage).forEach(function (it) { _this._showWarningMessage(it); });
                        }
                    } else {
                        this._showErr(err);
                    }
                } else {
                    if (err === 'abort') {
                        this._showErr({ name: 'Cancelled', });
                    }
                }

                this._trigger('finish', null, { err: err, });
            },
        _isWarningMessage: function (err) { return err.member == null && err.name == null && err.message != null; },
        _showErr: function (err) {
                var that = this;
            if (err.member != null || err.name != null) {
                if (this.activeRenderer != null) {
                    this.activeRenderer.clear();
                }

                this._clearContentArea();

                switch (err.member || err.name) {
                    case 'Exception': {
                        this._showWarning(err.message);
                        break;
                    }

                    case 'InvalidPDFException': {
                        this._showWarning(
                            'jres:31750024', //RC 31750024 : Pro tento soubor se nepodařilo vykreslit náhled.
                            null,
                            err.file != null ?
                                this._fileToBlob(err.file, err.fileExtension) :
                                null,
                            err.fileName);

                        break;
                    }
                    case 'ReasonNeeded': {
                        this._showReasonRequest(err.message, 'gi gi-visible-non');
                        break;
                    }
                    case 'TooBig': {
                        this._showWarning(
                            err.message,
                            'gi gi-visible-non',
                            err.file != null ?
                                this._fileToBlob(err.file, err.fileExtension) : null,
                            err.fileName);
                        break;
                    }
                    case 'IncorrectPassword':
                    case 'NoAccess': {
                        this._showWarning(
                            err.message,
                            'gi gi-visible-non',
                            err.file != null ?
                                this._fileToBlob(err.file, err.fileExtension) : null,
                            err.fileName, true);
                        break;
                    }
                    case 'CannotDisplay':
                    case 'CannotConvert':
                    case 'ConversionError': {
                        this._showWarning(
                            err.message,
                            null,
                            this.options.showDownloadForUnknown && err.file != null ?
                                this._fileToBlob(err.file, err.fileExtension) :
                                null,
                            err.fileName);

                        break;
                    }
                    case 'Cancelled': {
                        this._showWarning('jres:31750125', //RC 31750125 : Načítání bylo přerušeno uživatelem.
                            null,
                            this.options.showDownloadForUnknown && err.file != null ?
                                this._fileToBlob(err.file, err.fileExtension) :
                                null,
                            err.fileName);
                        break;
                    }
                    default: {
                        this._showWarning(
                            err.message,
                            null,
                            this.options.showDownloadForUnknown && err.file != null ?
                                this._fileToBlob(err.file, err.fileExtension) :
                                null,
                            err.fileName);
                        break;
                    }
                }
            } else if(err.message != null){
                this._showWarningMessage(err.message, err.severity);
            }
          },

          _fileToBlob: function (atobFile, fileExtension) {
            return this._serviceContent
              .call('GetMimeType', {
                extension: fileExtension,
              })
              .then(function (fileType) {
                  return Gordic.Utils.File.createBlob(atobFile, fileType);
              });
          },

          _showWarning: function (label, icon, blob, fileName, hideDownload) {
            var that = this;

            if (this.contentWarning == null) {
                this.contentWarning =
                    $.newDiv('gfilepreview-warning')
                .appendTo(this.contentArea);
            }

            this.contentWarning.append(
              '<i class="' + (icon == null ? 'fa fa-warning' : icon) + '"></i>'
            );

            this.contentWarning.append($('<p>').text(label));

            if (!hideDownload && (blob != null || this.options.customDownload != null && this.lastDisplayCall && this.lastDisplayCall.input)) {
              if (fileName == null) {
                  fileName = 'jres:31750025'; //RC 31750025 : soubor
              } else {
                  this.contentWarning.append($('<p>').text(fileName + ':'));
              }

              this.contentWarning.append($.newDiv().gbutton({
                  params: {
                      action: new GAction($.extend({
                          name: 'btnAct',
                          caption: 'jres:31750026', //RC 31750026 : Stáhnout
                          icon: 'gi-download',
                          tooltip: 'jres:31750481', //RC 31750481 : Stáhnout soubor pro náhled
                          run: function (event, actionContext) {
                              if (blob) Gordic.Utils.File.downloadBlob(blob, fileName);
                              else {
                                  var res = that.options.customDownload(that.lastDisplayCall.input);
                                  if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === "function")
                                      this.setPending(res);
                              }
                          },
                      }, that.options.customDownloadOptions)),
                  },
              }));
            }
            },
            _showWarningMessage: function (text, severity) {
                return $.content(this.element).showFlash(text, severity === 0 ? Gordic.Utils.Colors.stateInfo : Gordic.Utils.Colors.stateWarning);
                //dialogs.warning(text).createDialogPromise(function () { return true; });
            },
            _showReasonRequest: function (label, icon) {
                var _this = this;
                if (this.contentWarning == null) {
                    this.contentWarning =
                        $.newDiv('gfilepreview-warning')
                            .appendTo(this.contentArea);
                }

                this.contentWarning.append(
                    '<i class="' + (icon == null ? 'fa fa-warning' : icon) + '"></i>'
                );

                this.contentWarning.append($('<p>').text(label));

                if (this.lastDisplayCall != null) {
                    $.newDiv().appendTo(this.contentWarning).gform("createFrom", new Gordic.Forms.Form({ layoutDescriptor: "LMS-12-12-12" })
                        .addRow('jres:31750378') //RC 31750378 : Zadejte prosím důvod pro zobrazení dokumentu
                        .addField('gstringbox', 'w-12', {
                            name: "reason",
                            validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ min: 3 })]
                        }));
                    this.contentWarning.append($.newDiv().gbutton({
                        params: {
                            action: new GAction({
                                name: 'btnAct',
                                caption: 'jres:31750379', //RC 31750379 : Zobrazit
                                icon: 'gi-detail',
                                run: function (event, actionContext) {
                                    var form = _this.contentWarning.findForms()
                                    if (form.gform('isValid')) {
                                        var out = {};
                                        form.findFields().gfield('model', 'collect', out);
                                        _this.displayFromServer(_this.lastDisplayCall.gcontent,
                                            _this.lastDisplayCall.method,
                                            $.extend({}, _this.lastDisplayCall.input, out)
                                        );
                                        this.setPending(99);
                                    }
                                },
                            }),
                        },
                    }));
                }
            },

          _clearWarning: function () {
            if (this.contentWarning) {
                this.contentWarning.remove();
                this.contentWarning = null;
            }
          },
        }
    );

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gwizardsimple.js 

(function ($) {
	"use strict";

	//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
	//    <Name>        gordic.gui.webcontrols.gwizardsimple.js                     </Name>
	//    <Description> Zjednodušený pomocník pro bezpečné provedení operací        </Description>
	//    <Description> rozdělené do několika kroků                                 </Description>
	//    <Author>      thazmuka                                                    </Author>
	//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
	//    <Created>     2017-11-07                                                  </Created>
	//  </FileHeader>

	namespace("Gordic.WizardSimple", {
        prepareContent: function (input) {
            var that = this;
            setTimeout(function () {
                that.createWizard(input.content, input);
            }, 100);
        },

        createWizard: function(mycontent, input) {
            new Gordic.Wizard().create(
                {
                    content: mycontent
                },
                {
                    title: input.title,
                    steps: input.steps,
                    complete: input.complete,
                    cancel: input.cancel,
                    custom: input.custom
                }
            );
        }

	});
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gswitcher.js 

(function ($) {
    "use strict";

    // Efekty pro gswitcher - nepoužívat u nich this ! 
    //Efekt je jen sada funkcí která inicializuje elementy, transformuje je a vrací do původního stavu. 
    //Sám u sebe si nic neukládá!. Na to používat parametr settings.

    var Effects = namespace("Gordic.Prefabs.Effects");

    Effects.slide = {

        initialize: function ($element, items, settings) {
            //starting state ... no items are in element.
            settings.cacheCSS($element, "elementInit");

            if ('static inherit'.indexOf($element.css('position')) !== -1) {
                $element.css('position', 'relative');
            }

            var $parent = $element.parent();
            settings.cacheCSS($parent, "parentInit");


            if ('static inherit'.indexOf($parent.css('position')) !== -1) {
                $parent.css('position', 'relative');
            }

            //$parent.css('overflow', 'hidden');
            $element.css('overflow', 'hidden');

            if (settings.keepHiddenItemsInDOM) {
                $(items).each(function (index, item) { $(item).appendTo($element); if (index != settings.currentItemIndex) $(item).hide(); else $(item).show(); });
            } else {
                $(items[settings.currentItemIndex]).appendTo($element).show();
            }

            return { waitForOut: true };
        },

        transition: function ($element, items, settings) {

            settings.cacheCSS($element, "element");
            settings.cacheCSS(settings.currentItem, "currentItem");
            settings.cacheCSS(settings.nextItem, "nextItem");

            var isHorizontal = settings.axis == 'horizontal' || settings.axis == 'side l' || settings.axis == 'side r';
            var def = $.Deferred();

            if (!settings.keepHiddenItemsInDOM) {
                settings.nextItem.appendTo($element);
            }

            //hide all items and measure element's position inside parent.
            settings.currentItem.hide();
            var elementEmptyPosition = $element.position();

            //measure nextItem
            settings.nextItem.show();
            var nextOffsetTop = settings.nextItem[0].offsetTop;

            var nextPositioning = {
                width: settings.nextItem.outerWidth(true),
                height: settings.nextItem.outerHeight(true),
                left: ($element.position().left - elementEmptyPosition.left), //typically 0 - but if $element is centered, calculates center positions
                top: ($element.position().top - elementEmptyPosition.top) 
            };
            settings.nextItem.hide();

            //measure currentItem
            settings.currentItem.show();
            var currentOffsetTop = settings.currentItem[0].offsetTop;

            var currentPositioning = {
                width: settings.currentItem.outerWidth(true),
                height: settings.currentItem.outerHeight(true),
                left: ($element.position().left - elementEmptyPosition.left),
                top: ($element.position().top - elementEmptyPosition.top)
            };
            //fix elementSize with current item
            $element.css({ width: $element.outerWidth(true), height: $element.outerHeight(true) });

            settings.currentItem.hide();

            var elementPositioning = {};
            //choose bigger width from current and next item
            if (parseInt(nextPositioning.width, 10) > parseInt(currentPositioning.width, 10)) {
                //nextItem is bigger then current -> calculate current's center
                currentPositioning.left = -(nextPositioning.left - currentPositioning.left);

                //set element's width
                elementPositioning.width = nextPositioning.width;
                //nextItems position will be 0 because element now has same width as nextItem
                nextPositioning.left = 0;
            } else {
                nextPositioning.left = -(currentPositioning.left - nextPositioning.left);

                elementPositioning.width = currentPositioning.width;
                currentPositioning.left = 0;
            }


            //choose bigger height from current and next item - if not centered, center
            if (parseInt(nextPositioning.height, 10) > parseInt(currentPositioning.height, 10)) {
                currentPositioning.top = -(nextPositioning.top - currentPositioning.top);

                //   $element.css("height", nextPositioning.height);
                elementPositioning.height = nextPositioning.height;

                nextPositioning.top = 0;
            } else {
                nextPositioning.top = -(currentPositioning.top - nextPositioning.top);

                //   $element.css("height", currentPositioning.height);
                elementPositioning.height = currentPositioning.height;

                currentPositioning.top = 0;
            }

            currentPositioning.top += currentOffsetTop;
            nextPositioning.top += nextOffsetTop;


            var currentItemTargetPosition = {};

            var animation = {};

            switch (settings.axis) {
                default:
                case "horizontal": {
                    //sliding left to right (and reverse)
                    nextPositioning.left = (settings.reverse ? '-' + nextPositioning.width : $element.outerWidth()) + 'px';
                    nextPositioning.top += 'px';

                    currentItemTargetPosition.left = -parseInt(nextPositioning.left, 10) - currentPositioning.left - (settings.reverse ? -10 : 10) + 'px';
                    // currentItemTargetPosition.left = (settings.reverse ? parseInt(currentItemTargetPosition.left) + currentPositioning.width + 'px' : '-' + currentItemTargetPosition.left);

                    currentPositioning.left += 'px'
                    currentPositioning.top += 'px'

                    animation = { left: '0px' };
                    settings.waitForOut = false;
                    break;
                }

                case "vertical": {
                    //sliding top to bottom (and reverse)
                    nextPositioning.top = (settings.reverse ? $element.outerHeight(true) : '-' + nextPositioning.height) + 'px';
                    nextPositioning.left += 'px';

                    // currents target position (offscreen) + 10px  margin
                    currentItemTargetPosition.top = -parseInt(nextPositioning.top, 10) - currentPositioning.top - (settings.reverse ? -10 : 10) + 'px';
                    //  currentItemTargetPosition.top = settings.reverse ? parseInt(currentItemTargetPosition.top) + currentPositioning.height + 'px' : '-' + currentItemTargetPosition.top;
                    //prepare for css
                    currentPositioning.left += 'px'
                    currentPositioning.top += 'px'

                    //animate next item to this property.
                    animation = { top: '0px' };
                    settings.waitForOut = false;
                    break;
                }

                case "side l": {

                    //sliding left to right (and reverse)
                    nextPositioning.left = '-' + nextPositioning.width + 'px';
                    nextPositioning.top += 'px';

                    currentItemTargetPosition.left = nextPositioning.left;//-parseInt(nextPositioning.left, 10) - currentPositioning.left - (settings.reverse ? -10 : 10) + 'px';
                    // currentItemTargetPosition.left = (settings.reverse ? parseInt(currentItemTargetPosition.left) + currentPositioning.width + 'px' : '-' + currentItemTargetPosition.left);

                    currentPositioning.left += 'px'
                    currentPositioning.top += 'px'

                    animation = { left: '0px' };
                    break;
                }

                case "side r": {
                    //sliding left to right (and reverse)
                    nextPositioning.left = $element.outerWidth() + 'px';
                    nextPositioning.top += 'px';

                    currentItemTargetPosition.left = nextPositioning.left;//-parseInt(nextPositioning.left, 10) - currentPositioning.left - (settings.reverse ? -10 : 10) + 'px';
                    // currentItemTargetPosition.left = (settings.reverse ? parseInt(currentItemTargetPosition.left) + currentPositioning.width + 'px' : '-' + currentItemTargetPosition.left);

                    currentPositioning.left += 'px'
                    currentPositioning.top += 'px'

                    animation = { left: '0px' };
                    break;
                }

                case "side u": {

                    //sliding top to bottom (and reverse)
                    currentItemTargetPosition.top = '-' + ((currentPositioning.height > nextPositioning.height ? currentPositioning.height : nextPositioning.height) + 10)+'px';

                    nextPositioning.top = currentItemTargetPosition.top;
                    nextPositioning.left += 'px';

                    // currents target position (offscreen) + 10px  margin
                    //  currentItemTargetPosition.top = settings.reverse ? parseInt(currentItemTargetPosition.top) + currentPositioning.height + 'px' : '-' + currentItemTargetPosition.top;
                    //prepare for css
                    currentPositioning.left += 'px'
                    currentPositioning.top += 'px'

                    //animate next item to this property.
                    animation = { top: '0px' };

                    break;
                }
                case "side d": {  //sliding top to bottom (and reverse)
                    currentItemTargetPosition.top = ((currentPositioning.height > nextPositioning.height ? currentPositioning.height : nextPositioning.height) + 10) + 'px';

                    nextPositioning.top = currentItemTargetPosition.top;
                    nextPositioning.left += 'px';

                    // currents target position (offscreen) + 10px  margin
                    //  currentItemTargetPosition.top = settings.reverse ? parseInt(currentItemTargetPosition.top) + currentPositioning.height + 'px' : '-' + currentItemTargetPosition.top;
                    //prepare for css
                    currentPositioning.left += 'px'
                    currentPositioning.top += 'px'

                    //animate next item to this property.
                    animation = { top: '0px' };

                    break;
                }
            }


            //show items and set their positions
            settings.nextItem.css('position', "absolute").css(nextPositioning).outerWidth(nextPositioning.width).outerHeight(nextPositioning.height).show();
            settings.currentItem.css('position', "absolute").css(currentPositioning).outerWidth(currentPositioning.width).outerHeight(currentPositioning.height).show();

            //this is ok in forms, not in centered applications.

            if ((isHorizontal && settings.currentItem.position().top == 0 && settings.nextItem.position().top == 0) || (!isHorizontal && settings.currentItem.position().left == 0 && settings.nextItem.position().left == 0)) {
                var elementAnimation = { width: nextPositioning.width, height: nextPositioning.height };

                /*if (isHorizontal && settings.reverse) {
                    delete elementAnimation.width;
                    $element.css("width", nextPositioning.width);
                }

                if (!isHorizontal && !settings.reverse) {
                    delete elementAnimation.height;
                    $element.css("height", nextPositioning.height);
                }
                */
                $element.animate(elementAnimation, settings.speed);
            }
            else {
                $element.css(elementPositioning);
            }

            //animate nextItem in, animate currentItem out
            var animateNextIn = function () {
                settings.nextItem.animate(animation, settings.speed, "linear", function () {

                    //cleanup after transition
                    settings.currentItem.hide();

                    settings.currentItem.css(settings.origCSS.currentItem);
                    settings.currentItem.hide();


                    if (!settings.keepHiddenItemsInDOM) {
                        settings.currentItem.detach();
                    }

                    settings.nextItem.css(settings.origCSS.nextItem);
                    settings.nextItem.show();


                    $element.css(settings.origCSS.element);


                    //notify switcher, we are done.
                    def.resolve();
                });
            }

            var animateCurrentOut = function () {
                settings.currentItem.animate(currentItemTargetPosition, settings.speed, "linear");
            }

            animateCurrentOut();

            if (settings.waitForOut) {
                setTimeout(function () {
                    animateNextIn();
                },settings.speed);
            } else {
                animateNextIn();
            }


            
            

            return { transitionPromise: def.promise() };

        },

        destroy: function ($element, items, settings) {
            var $parent = $element.parent();

            $parent.css(settings.origCSS.parentInit);
            $element.css(settings.origCSS.elementInit);

            delete settings.origCSS.elementInit;
            delete settings.origCSS.parentInit;
            delete settings.origCSS.element;
            delete settings.origCSS.currentItem;
            delete settings.origCSS.nextItem;

            $(items).detach();
        }
    };

    Effects.flip = {

        initialize: function ($element, items, settings) {

            settings.cacheCSS($element, "elementInit", ["transition", "transform", "transform-style"]);


            if ('static inherit'.indexOf($element.css('position')) !== -1) {
                $element.css('position', 'relative');
            }
            var $parent = $element.parent();

            settings.cacheCSS($parent, "parentInit", ["perspective", "perspective-origin"]);

            if ('static inherit'.indexOf($parent.css('position')) !== -1) {
                $parent.css('position', 'relative');
            }
            // set the parent as the 3D viewport
            settings.perspective = settings.perspective || '1100px';

            $parent.css('perspective', settings.perspective);
            //$parent.css('overflow', 'hidden');

            // apply transforms before transition to stop initial animation
            $element.css('transform-style', 'preserve-3d');
           // $element.css('overflow', 'hidden');

            //$element.css('backface-visibility', 'hidden');
            //add items to element, hide all except initial
            if (settings.keepHiddenItemsInDOM) {
                $(items).each(function (index, item) { $(item).appendTo($element); if (index != settings.currentItemIndex) $(item).hide(); else $(item).show(); });
            } else {
                $(items[settings.currentItemIndex]).appendTo($element).show();
            }
        },

        transition: function ($element, items, settings) {
            //cache element's styles
            settings.cacheCSS($element, "element", ["transition", "transform", "transform-style"]);
            settings.cacheCSS(settings.currentItem, "currentItem", ["transform", "backface-visibility", 'transform-style']);
            settings.cacheCSS(settings.nextItem, "nextItem", ["transform", "backface-visibility", 'transform-style']);

            var def = $.Deferred();

            if (!settings.keepHiddenItemsInDOM) {
                settings.nextItem.appendTo($element);
            }

            settings.currentItem.hide();
            var elementEmptyPosition = $element.position();
            var isHorizontal = settings.axis == 'horizontal';


            settings.nextItem.show();
            var nextOffsetTop = settings.nextItem[0].offsetTop;

            var nextPositioning = {
                width: settings.nextItem.outerWidth(true),
                height: settings.nextItem.outerHeight(true),
                left: ($element.position().left - elementEmptyPosition.left),
                top: ($element.position().top - elementEmptyPosition.top)
            };

 
            settings.nextItem.hide();


            settings.currentItem.show();
            var currentOffsetTop = settings.currentItem[0].offsetTop;
            //measure sizes
            var currentPositioning = {
                width: settings.currentItem.outerWidth(true),
                height: settings.currentItem.outerHeight(true),
                left: ($element.position().left - elementEmptyPosition.left),
                top: ($element.position().top - elementEmptyPosition.top)
            };


            //fix elementSize with current item
            //     $element.css({ width: $element.outerWidth(), height: $element.outerHeight() });

            settings.currentItem.hide();

            //calculate biggest width and biggest height of element
            var elementPositioning = {}
            if (parseInt(nextPositioning.width, 10) > parseInt(currentPositioning.width, 10)) {
                currentPositioning.left = -(nextPositioning.left - currentPositioning.left);
                elementPositioning.width = nextPositioning.width;

                nextPositioning.left = 0;
            } else {
                nextPositioning.left = -(currentPositioning.left - nextPositioning.left);
                elementPositioning.width = currentPositioning.width;
                currentPositioning.left = 0;
            }


            if (parseInt(nextPositioning.height, 10) > parseInt(currentPositioning.height, 10)) {
                currentPositioning.top = -(nextPositioning.top - currentPositioning.top);

                elementPositioning.height = nextPositioning.height;
                nextPositioning.top = 0;

            } else {
                nextPositioning.top = -(currentPositioning.top - nextPositioning.top);

                elementPositioning.height = currentPositioning.height;
                currentPositioning.top = 0; 
            }

            currentPositioning.top += currentOffsetTop;
            nextPositioning.top += nextOffsetTop;

            var $parent = $element.parent();
            settings.cacheCSS($parent, "parent", ["perspective", "perspective-origin"]);

            $element.css(elementPositioning);
            $element.outerWidth(elementPositioning.width);
            $element.outerHeight(elementPositioning.height);

            $parent.css({ "perspective-origin": (elementEmptyPosition.left + parseInt($element.outerWidth(true), 10) / 2) + 'px ' + (elementEmptyPosition.top + parseInt($element.outerHeight(true), 10) / 2) + 'px', 'overflow':'hidden' });


            nextPositioning.left += 'px'
            nextPositioning.top += 'px'
            currentPositioning.left += 'px'
       //     currentPositioning.top += 'px'


            if (!isHorizontal) {
                nextPositioning.bottom = nextPositioning.top;
                delete nextPositioning.top;
            } else {
                nextPositioning.right = nextPositioning.left;
                delete nextPositioning.left;
            }

            var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';

            //rotate nextItem
            settings.nextItem.css({ 'position': "absolute", 'backface-visibility': 'hidden', 'transform-style': 'preserve-3d', "z-index": 2, 'overflow':'hidden' }).css(nextPositioning).outerWidth(nextPositioning.width).outerHeight(nextPositioning.height).css('transform', rotateFn + '(180deg) translateZ(0px)').show();
            settings.currentItem.css({ 'position': "absolute", 'backface-visibility': 'hidden', 'transform-style': 'preserve-3d', "z-index": 1, 'overflow': 'hidden' }).css(currentPositioning).outerWidth(currentPositioning.width).outerHeight(currentPositioning.height).show();




            var speed = settings.speed / 1000 + 's';
            $element.css('transition', 'transform ' + speed)
            //rotate carousel
            $element.css('transform', rotateFn + '(' + (settings.reverse ? '' : '-') + '180deg)');

            //    $element.animate({ width: nextPositioning.width, height: nextPositioning.height, top: -nextPositioning.top+'px' }, settings.speed);



            setTimeout(function () {

                settings.currentItem.css(settings.origCSS.currentItem);
                settings.currentItem.hide();

                settings.nextItem.css(settings.origCSS.nextItem);
                settings.nextItem.show();


                $parent.css(settings.origCSS.parent);
                $element.css(settings.origCSS.element);

                if (!settings.keepHiddenItemsInDOM) {
                    settings.currentItem.detach();
                }

                def.resolve();



            }, settings.speed);


            return { transitionPromise: def.promise() };
        },

        destroy: function ($element, items, settings) {

            var $parent = $element.parent();

            $element.css(settings.origCSS.elementInit);
            $parent.css(settings.origCSS.parentInit);

            delete settings.origCSS.elementInit;
            delete settings.origCSS.parentInit;
            delete settings.origCSS.element;
            delete settings.origCSS.parent;
            delete settings.origCSS.currentItem;
            delete settings.origCSS.nextItem;

            $(items).detach();
        }

    };

    //options: axis, perspective, speed
    Effects.rotate3d = {
        initialize: function ($element, items, settings) {
            //  $element.append(items);
            $(items).show();
            var $parent = $element.parent();
            $parent.prepend(items[0]);

            var currentAngle = 0;
            var radius = 0;
            var theta = 360 / items.length;
            var rotateFn = settings.axis == 'horizontal' ? 'rotateY' : 'rotateX';
            var itemsCount = items.length;

            // ensure parent is positioned to hold the box
            if ('absolute fixed relative'.indexOf($parent.css('position')) === -1) {
                $parent.css('position', 'relative');
            }


            //find item's biggest size to determine radius
            var itemSize = 0;
            var offset = settings.axis == 'horizontal' ? 'offsetWidth' : 'offsetHeight';
            $(items).each(function (index, item) {
                $element.before(item);
                $(item).show();
                itemSize = itemSize < item.prop(offset) ? item.prop(offset) : itemSize;
                $(item).detach();
            })


            // set the Z axis translation amount on the settings for carousel
            radius = Math.round((itemSize / 2) / Math.tan(Math.PI / itemsCount));

            // set the parent as the 3D viewport
            $parent.css('perspective', settings.perspective | '1100px');
            $parent.css('overflow', 'hidden');

            // apply transforms before transition to stop initial animation
            $element.css('transform-style', 'preserve-3d');
            $element.css(
                'transform'
              , 'translate3d(0, 0, -' + radius + 'px)'
            );

            // set front slide
            $(items).eq(0).css(
                'transform'
              , rotateFn + '(0deg) translate3d(0, 0, ' +
                radius + 'px)'
            );

            var speed = (settings.speed / 1000) + 's';

            setTimeout(function () {
                $element.css('transition', 'transform ' + speed + ' linear');
                $parent.css('transition', 'height ' + speed + ' linear');
            }, 0);

            // $(items).filter(':gt(0)').hide();


            return { theta: theta, currentAngle: currentAngle, radius: radius, rotateFn: rotateFn };
        },

        //options passed in settings: reverse, currentItem, currentItemIndex, nextItem, nextItemIndex, animator custom data.
        transition: function ($element, items, settings) {

            var def = $.Deferred();

            var $parent = $($element).parent();
            var parentWidth = $parent.outerWidth(true);
            var parentHeight = $parent.outerHeight(true);


            //calculate target angle
            var angle = settings.currentAngle + (settings.reverse ? -1 * settings.theta : settings.theta);

            //    if (angle === 0) {
            //        angle = settings.reverse ? 360 : -360;
            //   }

            var rotateFn = settings.rotateFn;


            var speed = (settings.speed / 1000) + 's';

            setTimeout(function () {
                $element.css('transition', 'transform ' + speed + ' linear');
                $parent.css('transition', 'height ' + speed + ' linear');
            }, 0);

            var itemStyle = {
                position: "absolute",
                "backface-visibility": "hidden"
            }

            //measure current item and set it's size to carousel div
            var currentItemSizing = $.extend({
                width: settings.currentItem.outerWidth(true),
                height: settings.currentItem.outerHeight(true),
            }, itemStyle);

            var currentItemPositioning = $.extend({
                top: settings.currentItem.position().top,
                left: settings.currentItem.position().left
            }, currentItemSizing);

            //measure nextItem and save parent's positioning for future parent resize
            settings.currentItem.css(currentItemSizing).outerWidth(currentItemSizing.width).outerHeight(currentItemSizing.height).hide();
            var nextItem = settings.nextItem;
            //append next item into place of currentItem
            $element.before(nextItem).show();

            var nextItemPositioning = $.extend({
                width: nextItem.outerWidth(true),
                height: nextItem.outerHeight(true),
                //  top: nextItem.position().top,
                //  left: nextItem.position().left
            }, itemStyle);

            var nextItemParentPositioning = {
                width: $parent.outerWidth(true),
                height: $parent.outerHeight(true),
                perspective: $parent.css('perspective'),
                overflow: $parent.css('overflow'),
            };

            //Fix parent to it's size with currentItem
            //$parent.css({ "width": parentWidth, "height": parentHeight });
            $parent.outerWidth(parentWidth).outerHeight(parentHeight);



            nextItem.css(nextItemPositioning).outerWidth(nextItemPositioning.width).outerHeight(nextItemPositioning.height).hide();

            nextItem.detach();
            settings.currentItem.detach();

            $element.css(currentItemPositioning).outerWidth(currentItemPositioning.width).outerHeight(currentItemPositioning.height).css('transform', 'translateZ(' + settings.radius + 'px)').show();

            //move current item into carousel
            settings.currentItem.appendTo($element).css(currentItemSizing).outerWidth(currentItemSizing.width).outerHeight(currentItemSizing.height).css('transform', 'translateZ(-' + settings.radius + 'px) ' + rotateFn + '(' + settings.currentAngle + 'deg)').show();

            //rotate nextItem
            nextItem.css('transform', settings.rotateFn + '(' + angle + 'deg) translateZ(' + settings.radius + 'px)').appendTo($element).show();


            //rotate carousel
            $element.css('transform', 'translateZ(-' + settings.radius + 'px) ' + rotateFn + '(' + angle + 'deg)');

            //  if (Math.abs(angle) === 360) {
            //      $element.css(
            //          'transform'
            //        , 'translate3d(0, 0, -' + settings.radius + 'px)'
            //      );
            //      angle = 0;
            //  }


            //replace carousel with nextItem
            setTimeout(function () {

                $element.hide();

                nextItem.css({ position: "", left: "", top: "", width: "", height: "", transform: "" });
                settings.currentItem.css({ position: "", left: "", top: "", width: "", height: "" });

                nextItem.detach();
                settings.currentItem.detach();

                $element.before(nextItem);

                nextItem.show();



                //after rotation animation is done, turn off positioning and resizing back to normal.
                //  $(".carousel-placeholder").remove();

                //unset nextItem absolution




                //set new parent dimensions
                $parent.css(nextItemParentPositioning);

                setTimeout(function () {
                    $parent.css({ width: "", height: "" });
                }, 0);

                //reset all items positioning and size and hide all except from current one
                //      $(items).each(function (index, item) {
                //          $(item).css({ position: "", left: "", top: "", width: "", height: "" });
                //          if (index != settings.nextItemIndex)
                //              $(item).hide();
                //      });


                //notify about finished rotation
                //_this._trigger("rotationFinished", null, { currentItem: _this.options.items[_this._currentItemIndex] });
                def.resolve();
            }, settings.speed);


            //return what we want to keep for next time.
            return { currentAngle: angle, element: settings.element, transitionPromise: def.promise() };
        },

        destroy: function (settings) {
            //remove styles from parent, remove styles from element, remove styles from items, remove properties from settings.

            delete settings.currentAngle;
            delete settings.radius;
        },

        resize: function ($element, items, settings) {
            //items were resized, measure new radius
        },

    };
    




    /* 
  * ////////////////////////////////
  * gswitcher.js
  * ////////////////////////////////
  * options:
  * items = pole divů/elementů k zobrazování
  * animator = Gordic.Prefabs.Effects.slide nebo Gordic.Prefabs.Effects.flip
  * initialItemIndex = číslo – index itemu, který se má zobrazit jako první.
  * animatorParams = objekt – {speed, axis, keepHiddenItemsInDOM}
  * -	speed = číslo v ms – rychlost animace
  * -	axis == ‚horizontal‘ – osa otáčení Y
  * -	axis == ‚vertical‘ nebo cokoliv jiného - osa otáčení X
  * -	keepHiddenItemsInDOM == false – dělá detach všech itemů a nechává v DOM jen aktivní item, během otáčení přídá item který se má otáčet
  * -	keepHiddenItemsInDOM == true – nechá všechny itemy v DOM
  * -	flip – perspective == „1100px“ – velikost perspektivy.
  * 
  * metody:
  * create
  * destroy
  * refresh
  * showNext
  * showPrev
  * showItem(selector,reverse)
  * -	selector == číslo -> index do items
  * -	selector == text -> hledání v items podle selectoru
  * -	reverse == true -> forward animace
  * -	reverse == false -> previous animace
  * updateAnimator(animatorParams)
  * 
  * eventy:
  * transitioncompleted – dokončení animace
  * 	data – element – to v čem jsou schovaný itemy, to co se otáčí, a taky je v tom uloženej widget.
  * example:
  * 
  * Jedno prohození dvou divů – první by měl být v DOM, druhý nemusí
  * 
  * $testDiv.gswitcher({ items: [$testDiv, $otherDiv],
  *                      animator: Gordic.Prefabs.Effects.flip,
  * 
  *                      transitioncompleted: function (ev, data) {
  *                           data.element.gswitcher("destroy");
  *                      }
  *                    }).gswitcher("showNext");
  * 
  * 
  * Záměna dvou sekcí ve formuláři
  * 
  *             var sectionItems = [$(testForm).findFormSections("sidlo1"), $(testForm).findFormSections("sidlo2")];
  *             $("<div id='my-switcher-section'></div>").gswitcher({
  *                 items: sectionItems,
  *                 animator: Gordic.Prefabs.Effects.slide,
  *                 animatorParams: {
  *                     axis: 'horizontal',
  *                     speed: '300',
  *                     keepHiddenItemsInDOM: false
  *                 },
  *                 initialItemIndex: 0
  *             })
  * 
  * $("#my-switcher-section").gswitcher("showNext");
  * 
  * 
  * Více fieldů vyměnit za jeden – nutno udělat obalovač…
  * 
  * var fieldItems = [$("<div></div>").append($(testForm).findFields("m_oTitulPred, m_oJmeno, m_oPrijmeni, m_oTitulZa ")), $(testForm).findFields("m_oSingleInputName")];
  * 
  *             $("<div id='my-switcher-field'></div>").gswitcher({
  *                 items: fieldItems,
  *                 animator: Gordic.Prefabs.Effects.slide,
  *                 animatorParams: {
  *                     axis: 'horizontal',
  *                     speed: '300',
  *                     keepHiddenItemsInDOM: false
  *                 },
  *                initialItemIndex: 0
  *             });
  * 
  * 
  * $("#my-switcher-field").gswitcher("showNext");
  */

    $.widget("gordic.gswitcher", {

        options: {
            items: [],
            animator: {}, //Gordic.Prefabs.Effects.slide or Gordic.Prefabs.Effects.flip
            animatorParams: {
                axis: 'horizontal',
                speed: 500,
                keepHiddenItemsInDOM: false,
            },
            initialItemIndex: 0,
        
        },
        _setOption: function (key, value) {
            if (key == 'animator') {
                this.options.animator.destroy(this.element, this.items, this._settings)
            }

            this._super(key, value);

            if (key == 'animator') {
                this._settings = $.extend({}, this.options.animatorParams);
            }

            this.refresh();
        },

        _create: function () {

            this._settings = $.extend({}, this.options.animatorParams);

            var itemsWithParents = $.grep(this.options.items, function (item, index) { return $(item).parent().length > 0 });

            if (this.element.parent().length <= 0 && itemsWithParents.length>0) {
                //item is already in dom and current isn't ... add switcher before item with parent.
                $(itemsWithParents[0]).before(this.element);
            }

            this.refresh();
        },

        //Should be in this._settings -> so this = this._settings
        _cacheCSS: function ($el, name, extraAtts) {
            var _this = this;
            var el = $el.get(0);
            var attributes = [
                  'position', 'top','bottom', 'left', 'display', 'overflow',
                  'width', 'height', 'zIndex'
            ].concat(extraAtts || []);

            this.origCSS || (this.origCSS = {});
            this.origCSS[name] || (this.origCSS[name] = {});
        
            $.each(attributes, function (i, att) {
                _this.origCSS[name][att] = el.style[att];
            });

        },

        refresh: function () {
            var _this = this;
            this._oldElement = null;


            if (this._settings.currentItemIndex == null) {
                this._settings.currentItemIndex = this.options.initialItemIndex;
            }

            this._settings = $.extend(this._settings, this.options.animatorParams);
            this._settings.cacheCSS = this._cacheCSS;

        
            //always detach items from element
            for (var i = 0; i < this.options.items.length; i++) {
                this._settings.cacheCSS($(this.options.items[i]), "item" + i);

                if (!this._oldElement && ($(this.options.items[i]).get(0) === this.element.get(0))) { //when element is one of the items, create new boxing element.
                    var newElement = $("<div></div>").css(this._settings.origCSS["item" + i]);
                    newElement.data(this.element.data());
                    this.element = newElement;

                    this._oldElement = $(this.options.items[i]);

                    $(this.options.items[i]).before(this.element);
                }

                $(this.options.items[i]).detach();
            }

            $.extend(this._settings, this.options.animator.initialize(this.element, this.options.items, this._settings));
        },



        _showNextItem: function (index, reverse) {
            var _this = this;

            var currentIndex = this._settings.currentItemIndex;

            if (reverse == null) {
                reverse = currentIndex > index;
            }

            var nextIndex = this._calculateNextIndex(currentIndex, this.options.items.length, reverse, index);
            if ($(this.element).hasClass('js-switcher-in-motion') || nextIndex === -1) return;

            this.element.addClass('js-switcher-in-motion');

            // call animator and append settings from animator to current settings
            $.extend(this._settings, this.options.animator.transition(this.element, this.options.items, $.extend({

                currentItem: $(this.options.items[currentIndex]),
                nextItem: $(this.options.items[nextIndex]),
                currentItemIndex: currentIndex,
                nextItemIndex: nextIndex,
                reverse: reverse
            },

                this._settings)));

            this._settings.transitionPromise.then(function () {
                _this.element.removeClass('js-switcher-in-motion');
                _this._trigger("transitioncompleted", null, { element: _this.element, currentItem: _this._settings.currentItem });

                Gordic.ResizeManager.forceRefresh(_this.element[0]);
            });

            this._settings.currentItemIndex = nextIndex;

            return this._settings.transitionPromise;
        },

        showNext: function () {
            return this._showNextItem();
            // this._userTriggered = true;
            // this._rotateToItemIndex(1);
        },

        showPrev: function () {
            return  this._showNextItem(null, true);
            // this._userTriggered = true;
            // this._rotateToItemIndex(-1);
        },
    
        //if selector is number , select item by index, otherwise use it as selector.
        showItem: function (selector, reverse) {
            if ($.isNumeric(selector) && Math.floor(selector) == selector) {
                return this._showNextItem(selector, reverse);

            } else {
                return this._showNextItem($(items).index(selector), reverse);

            }
        },
    
        updateAnimator: function (animatorParams) {
            this.options.animator.destroy(this.element, this.options.items, this._settings);
            this.options.animatorParams = $.extend(this.options.animatorParams, animatorParams);
            this.refresh();
        },

        _destroy: function () {

            this.options.animator.destroy(this.element, this.options.items, this._settings);

            for (var i = 0; i < this.options.items.length; i++) {
                $(this.options.items[i]).css(this._settings.origCSS["item" + i]);
                $(this.options.items[i]).detach();
            }

            $(this.element).before(this.options.items[this._settings.currentItemIndex]);
            if (this._oldElement) {
                this.element.remove();
                this.element = this._oldElement;
            }

        },

        _calculateNextIndex: function (currentIndex, itemsCount, reverse, index) {
            var nextIndex = index;

            if (!nextIndex) {

                if (reverse) {
                    nextIndex = currentIndex - 1 < 0 ? itemsCount - 1 : currentIndex - 1;
                }
                else {
                    nextIndex = currentIndex + 1 < itemsCount ? currentIndex + 1 : 0; 
                }
            }

            if (nextIndex < 0 || nextIndex > itemsCount) return -1;

            return nextIndex;
        }

    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gshortcuts.helper.js 

/* ======================================================= */
/* gshortcuts - overview and helper */
/* ======================================================= */
(function ($) {
    "use strict";

    var getDescription = function (shortcut) {
      var c = shortcut.description || shortcut.action.caption;
      if (c == null || c.length === 0) {
        throw new Error(
          'Klávesová zkratka ' + shortcut.key +
          ' nemá description ani action.caption!');
      }

      return c;
    };

    $.widget("gordic.gshortcutfield", $.gordic.gfield, {
        options: {
            key: "unidentified",
            description: "undefined description",
        },
        _create: function () {
            this._superApply(arguments);
            this.element.addClass("gshortcutfield");
            this._createInternals();
        },
        _createInternals: function () {

            var table = $("<table>").appendTo(this.element);
            var tr = $("<tr>").appendTo(table);
            var keys = this._parseKey();
            var keyTd = $("<td>").appendTo(tr);
            for (var i = 0, l = keys.length; i < l; i++) {
                var keyItem = keys[i].length > 1 ? $("<kbd class='gshortcutfield__kbd_outer'>").appendTo(keyTd) : keyTd;

                for (var k = 0, lk = keys[i].length; k < lk; k++) {
                    var key = Gordic.Shortcuts.Helpers.keyToText(keys[i][k]).toLowerCase();
                    keyItem.append($("<kbd class='" + (lk === 1 ? "gshortcutfield__kbd_outer " : "") + "gshortcutfield__kbd_inner'>").text(key.charAt(0).toUpperCase() + key.slice(1)));

                    if (lk - 1 > k)
                        keyItem.append($.newSpan().text("+"));
                }

                if (l - 1 > i) {
                    keyTd.append($("<span>, </span>"));
                }
            }
            if (this.options.disabled) {
                keyTd.append($.newSpan().text("jres:31750076")) //RC 31750076 : Neaktivní
            }

            var description = $("<td>").addClass("shortcuts-description-class").text(this.options.description).appendTo(tr);
        },
        _parseKey: function () {
            var keyStrokes = this.options.key.split(" ");
            for (var i = 0, l = keyStrokes.length; i < l; i++) {
                keyStrokes[i] = keyStrokes[i].split("+");
            }

            return keyStrokes;
        },
        _init: function () {
            this._superApply(arguments);

        },
        _destroy: function () {
            this.element.removeClass("gshortcutfield");

            this._superApply(arguments);
        },
        _setOption: function (name, value) {
            switch (name) {
                case '...':
                    break;
                case 'disabled': {
                    break;
                }
            }
            
            this._superApply(arguments);
            this.element.empty();
            this._createInternals();
        },
    })

    namespace("Gordic.Utils.createShortcutsHelpForm", function (ev, ctx, shortcutList, group) {
        var shortcuts = group ? [] : [{ groupName: null, shortcuts: shortcutList }];

        if (group) {
            shortcutList.map(
                function (item, idx, acc) {
                    if (item.visible === false) return;
                    var existing = this.filter(function (i) { return i.groupName === (item.group || "jres:31750077") }); //RC 31750077 : Nezařazené
                    if (existing.length <= 0) {
                        existing = { groupName: item.group || "jres:31750077", shortcuts: [] }; //RC 31750077 : Nezařazené
                        this.push(existing);
                    } else {
                        existing = existing[0];
                    }

                    existing.shortcuts.push(item);

                }, shortcuts);

            shortcuts.sort(function (a, b) { if (a.groupName === "jres:31750077") return 1; else if (a.groupName === b.groupName) return 0; else return -1; });
        }
        var shortcutHelpContent = $.newDiv();
        var FormKS = new Gordic.Forms.Form("L2M2S1, L-0-12-0 , M-0-12-0, S-0-12-0, breaks-800-1000");
        // vlastní třída KS pro správné rozestavené tlačítek
        var customShortcutsClass = "";

        for (var i = 0, l = shortcuts.length; i < l; i++) {
            FormKS.addSection(shortcuts[i].groupName);
            for (var j = 0, ls = shortcuts[i].shortcuts.length; j < ls; j++) {
              var shortcut = shortcuts[i].shortcuts[j];
              var disabled = true;

              if (shortcut.action != null) {
                disabled = !shortcut.action.enabled();
              }

              if ((shortcut.action != null && disabled !== true || shortcut.action == null) && shortcut.canExecute != null) {
                disabled = shortcut.canExecute(ev, ctx);
                if ($.isPlainObject(disabled)) { // result of canExecute is object, use active property or default active property or it is false
                  shortcut = $.extend({}, shortcut, disabled);
                  disabled = !(shortcut.active != null ? shortcut.active : true);
                  if (shortcut.visible === false) {
                    continue;
                  }
                } else {
                  disabled = !disabled;
                }
              } else if (shortcut.action == null && shortcut.canExecute == null) {
                disabled = false;
              }

              FormKS.addRow().addField("gshortcutfield", { key: shortcut.key, description: getDescription(shortcut), customClass: customShortcutsClass, disabled: disabled, });
          }

          var sectionCnt = FormKS.form.sections.length - 1;
          if (FormKS.form.sections[sectionCnt].rows == null) {
            FormKS.form.sections.splice(sectionCnt, 1);
          }

        }

        shortcutHelpContent.gform("createFrom", FormKS);

        return shortcutHelpContent;
    });

    var shortcutHelpContent = null;

    namespace("Gordic.Utils.showShortcutsHelp", function (ev, ctx) {


        if (shortcutHelpContent === null) {
            shortcutHelpContent = Gordic.Utils.createShortcutsHelpForm(ev, ctx, $(ev.target).gshortcut("all"), true);
            GDlg.showWindow(shortcutHelpContent, null, { title: "jres:31750078", width: 850, height: 600 }).on('close', function () { //RC 31750078 : Nápověda - klávesové zkratky
                $(ev.target).focus();
                shortcutHelpContent = null;
            })

        } else {
            $.content(shortcutHelpContent).close();
            // shortcutHelpContent = null;
        }

    });

    function GShortcutPreview(element, options) {
        this.element = element;
        this.element.on("shortcutnotification", this._handleNotification.bind(this));
        this.prepare(options);
        this.viewerTimeout = null;
    }
    GShortcutPreview.prototype.prepare = function (options) {
        var _this = this;
        this.viewer = $.newDiv('gshortcutpreview__viewer').appendTo(this.element).hide();
        this.viewer.on("actionRun", function () {
            if (_this.viewerTimeout !== null) { clearTimeout(_this.viewerTimeout); _this.viewerTimeout = null; }
            _this.viewer.hide();
        });

        this.viewerClose = $.newDiv('gshortcutpreview__viewer__close_btn').appendTo(this.viewer).gbutton({
            params: {
                action: new GAction({
                    name: "actCloseShortcutViewer",
                    icon: "gi-window-close",
                    captionVisible: GAction.captionVisibility.never,
                    caption: GDlg.mbbClose.text,
                    run: function () {
                        _this.close(); document.GShortcutDirector.reset();
                    }
                })
            }
        });

        this.viewerTextArea = $.newDiv('gshortcutpreview__viewer__text_area').appendTo(this.viewer)

        this.viewerHelpAreaOptions = { params: { type: "static", caption: "jres:31750079", customClass: "g-link--decorated ", children: [] } }; //RC 31750079 : Známé zkratky

        this.viewerHelpArea = $.newDiv('gshortcutpreview__viewer__help_area').appendTo(this.viewer).glink(this.viewerHelpAreaOptions).hide();

    };
    GShortcutPreview.prototype.close = function () {
        if (this.viewerTimeout !== null) { clearTimeout(this.viewerTimeout); this.viewerTimeout = null; }
        this.viewer.hide();
    };

    GShortcutPreview.prototype._handleNotification = function (ev, ctx) {
        var _this = this;

        if (ctx.shortcuts.length > 0) {
          for (var i = 0, l = ctx.shortcuts.length; i < l; i++) {
            if (ctx.shortcuts[i].visible === false ||
                ctx.shortcuts[i].helperVisible === false ||
                ctx.shortcuts[i].helperVisible !== true && ctx.shortcuts[i].key.indexOf('+') === -1) {
              return;
            }
          }
        }

        this.viewer.show();
        this.viewerHelpArea.hide();
        //this.viewerHelpAreaBadge.hide();
        
        if (ctx.type === "progress") {

            if (this.viewerTimeout !== null) { clearTimeout(this.viewerTimeout); this.viewerTimeout = null; }
            this.viewerTextArea.html("jres:31750080".format(ctx.keyChain)); //RC 31750080 : Stisknuto: <b>{0}</b> ... čekám na další kombinaci ... 
            var tooltip = [];
            for (var i = 0, l = ctx.shortcuts.length; i < l; i++) {
                if (ctx.shortcuts[i].visible === false) { this.viewerTextArea.html(""); return; }
                var act = ctx.shortcuts[i].action;
                if (act._shortcutViewerClose !== true) {
                    act._shortcutViewerClose = true;
                    act.run(function () { _this.close(); document.GShortcutDirector.reset(); })
                }

                tooltip.push({
                  type: "html", customClass: "gshortcutfield", html: $.newDiv().gshortcutfield({ key: ctx.shortcuts[i].key, description: getDescription(ctx.shortcuts[i]) }).html(), action: act
                });
            }

            this.viewerHelpArea.show();
            //  this.viewerHelpAreaBadge.show();
            this.viewerHelpAreaOptions.params.children = tooltip;
            this.viewerHelpAreaOptions.params.badge = { value: String(ctx.shortcuts.length) };
            if (this.viewerHelpArea.hasClass("glink"))
                this.viewerHelpArea.glink("destroy");
            this.viewerHelpArea.glink(this.viewerHelpAreaOptions);
            //this.viewerHelpAreaBadge.gbadge("option",{value: String(ctx.shortcuts.length), tooltip: tooltip.html() })
        }

        if (ctx.type === "reset") {
            if (this.viewerTimeout !== null) { clearTimeout(this.viewerTimeout); this.viewerTimeout = null; }
            this.viewerTextArea.html("jres:31750081".format(ctx.keyChain)); //RC 31750081 : Zkratka nenalezena: <b>{0}</b>
            this.viewerHelpArea.hide();
            if (this.viewerHelpArea.hasClass("glink")) this.viewerHelpArea.glink("destroy");
            this.viewerTimeout = setTimeout(this.viewer.hide.bind(this.viewer), 4000);
        }

        if (ctx.type === "execute") {
            if (this.viewerTimeout !== null) { clearTimeout(this.viewerTimeout); this.viewerTimeout = null; }
            this.viewerTextArea.html("jres:31750082".format(ctx.keyChain, getDescription(ctx.shortcuts[0]))); //RC 31750082 : Spuštěno: <b>{0}</b> - {1}
            this.viewerHelpArea.hide();
            if (this.viewerHelpArea.hasClass("glink")) this.viewerHelpArea.glink("destroy");
            this.viewerTimeout = setTimeout(this.viewer.addClass('gshortcutpreview__viewer--executed').hide.bind(this.viewer), 4000);
        }
    }


    GShortcutPreview.prototype.destroy = function () {
        if (this.viewerTimeout !== null) { clearTimeout(this.viewerTimeout); this.viewerTimeout = null; }
        this.element.off("gshortcutnotification");
    }

    namespace("Gordic.Utils.GShortcutPreview", GShortcutPreview);

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gpreview.js 

(function ($) {
  'use strict';
  var userSettingsKey = 'gpreview-activeItem';

  /**
  * Widget for displaying previews in sidepanel - uses subtasks as switcher for contents.
  */
    $.widget('gordic.gpreview', {
        options: {
            customClass: '',
            tabs: [], // list of tabs (items for subtasks) in preview
            // {
            //  content: // Object/Function(loadParams)/String - content to display in preview
            //  customLoad: // Function(div,loadParams) - which is called when subtask is selected - this is current tab, so this.loadParams, this.customDiv. If not set, content.load(loadParams) is called.
            //  customDiv:  // JQueryElement - div for preview content - is created automatically if not set
            //  caption: // String - title for subTask
            //  loadParams: // Object - default data to load into preview content
            // }
            useSubtask: true,
            activeItem: 0, // default active item
            disabledText: 'jres:31750037', //RC 31750037 : Není vybrán řádek pro zobrazení náhledu.
            userSettings: null, // userSettings of content where this preview is used.
            parentContent: null
        },
        actions: null,
        _subtasks: null,
        _disabledElement: null,
        _contentElement: null,
        _create: function () {
            var _this = this;
            this._superApply(arguments);
            this._options = $.extend({}, this.options);

            this.element.addClass(['gpreview', 'g-preview', this._options.customClass].filter(Boolean).join(' '));

            this._disabledElement = $('<h3 class="g-preview__disabled-element">').hide()
                .appendTo(this.element);
            this._infoElement = $.newDiv('g-preview__info-element').hide().appendTo(this.element);
            this._contentElement = $.newDiv('g-preview__content-element')
                .appendTo(this.element);

            this._contentElement.on('contentworking',
                function (ev, working, status, content) {
                    if (_this.options.useSubtask !== false) {
                        ev.preventDefault();

                        working = working !== false;  // default = true
                        if (working) {
                            _this._contentElement.gcover(status);
                        } else if (!working && _this._contentElement.is('.gcover')) {
                            _this._contentElement.gcover('destroy');
                        }
                    }
                });



            this.actions = new GActionList();

            this.actions.addRange({
                actTabAction: {
                    run: function (ev, ctx) {
                        _this._options.tabs.map(function (t) {
                            if (t.customDiv != null) {
                                t.customDiv.hide();
                            }
                        });

                        var tab = _this._options.tabs[ctx.previewIndex];
                        if (tab.customDiv != null) {
                            tab.customDiv.show();
                        }

                        var promise = _this._initTab(tab);
                        if (promise != null) {
                            promise.then(function (tab) {
                                _this._loadTab(tab, ctx.previewIndex);
                            });
                        } else {
                            _this._loadTab(tab, ctx.previewIndex);
                        }
                    },
                },
            });

            this.refresh();
        },

        refresh: function () {
            this._disabledElement.empty().html(this._options.disabledText);
            this._ensureActions();
            this._createSubTasks();
        },

        _setOption: function (key, value) {
            if (key === 'disabled' && value !== this._options.disabled) {
                this._refreshVisibility(value);
            }

            this._superApply(arguments);
            this._options[key] = value;

            this.refresh();
        },

        _ensureActions: function () {
            for (var i = 0, l = this._options.tabs.length; i < l; i++) {
                var tab = this._options.tabs[i];

                if (tab.actionContext == null) {
                    tab.actionContext = { previewIndex: i, };
                } else {
                    tab.actionContext.previewIndex = i;
                }

            }
        },

        _initTab: function (tab) {
            var newContent = null;
            var _this = this;

            if (tab.content != null) {
                if ($.isFunction(tab.content)) {
                    newContent = tab.content(tab.loadParams, tab.loadOptions);
                    if ($.isFunction(newContent.then)) {
                        return newContent.then(function (newContent) {
                            return _this._initTabExecute(tab, newContent);
                        }).promise();
                    }
                    return this._initTabExecute(tab, newContent);
                }
                return this._initTabExecute(tab, tab.content);
            }
            return this._initTabExecute(tab, null);
        },

        _initTabExecute: function (tab, newContent) {
            var refresh = false;
            var that = this;
            if (tab._currentContent !== newContent || tab._currentContent && tab.customDiv != null && !tab.customDiv.is('.gcontent')) {
                refresh = true;
                tab._currentContent = newContent;
            }

            var def = $.Deferred();

            if (refresh && tab.customDiv != null) {
                var newDiv = $.newDiv('g-preview__tab-div')
                    .on('contentnewops', function (ev, ctx, cnt) { if (!ev.isDefaultPrevented()) { that.element.trigger(ev.type, [ctx, cnt]); } })

                //.on('contentworking', (ev, ctx) => { if (!ev.isDefaultPrevented()) { this._contentElement?.trigger(ev.type, ctx); } });

                if (tab.customDiv[0].isConnected) {
                    tab.customDiv.replaceWith(newDiv);
                } else {
                    newDiv.appendTo(this._contentElement);
                }

                tab.customDiv = newDiv;

            } else if (tab.customDiv == null) {
                tab.customDiv = $.newDiv('g-preview__tab-div')
                    .on('contentnewops', function (ev, ctx, cnt) { if (!ev.isDefaultPrevented()) { that.element.trigger(ev.type, [ctx, cnt]); } })
                    //.on('contentworking', (ev, ctx) => { if (!ev.isDefaultPrevented()) { this._contentElement?.trigger(ev.type, ctx); } })
                    .appendTo(this._contentElement);
            } else {
                tab.customDiv.appendTo(this._contentElement);
            }

            tab.customDiv.off('beforefocus.gpreviewbeforefocus')
            tab.customDiv.on('beforefocus.gpreviewbeforefocus', function (ev) {
                if (ev.isDefaultPrevented()) return;
                that.setActive(tab.actionContext.previewIndex, true);
            });

      if (tab._currentContent != null && refresh) {
         tab.customDiv.gcontent([tab._currentContent, { parentContent: this.options.parentContent ? typeof this.options.parentContent === "function" ? this.options.parentContent.call(this.element,tab.customDiv) : this.options.parentContent : $.content(this.element) }], $.extend({}, tab.loadParams, tab.loadOptions));
      }
            var c = $.content(tab.customDiv);
            if (c && c.readyAwait) c.readyAwait.then(function () { def.resolve(tab); });
            else def.resolve(tab);

      return def.promise();
    },

    _loadTab: function (tab, index) {
      this._refreshVisibility(this.options.disabled);
      if (tab.customLoad != null) {
        tab.customLoad(tab.customDiv, tab.loadParams, tab.loadOptions);
        tab.customDiv.resize();
      } else {
        var content = $.content(tab.customDiv);
        if (content.className != null) {
            content.load($.extend({}, tab.loadParams, tab.loadOptions));
        }
      }

      if (this._options.userSettings != null) {
        this._options.userSettings.save(userSettingsKey, index);
      }

      this._trigger('change', null, {
        currentIndex: this._options.previousItem,
        newIndex: index,
      });

    },
    _createSubTasks: function () {
      var _this = this;
      if (this._options.useSubtask !== false && this._subtasks == null &&
          this._options.tabs.length > 0) {
        this._subtasks = $.newDiv()
          .insertBefore(this._contentElement)
          .gsubtasks({
            activeItem: this._options.userSettings == null ?
              this._options.activeItem :
              this._options.userSettings.get(userSettingsKey) == null ?
                this._options.activeItem :
                this._options.userSettings.get(userSettingsKey),
            params: this._options.tabs.map(function (t) {
              return $.extend({}, t, {
                action: _this.actions.actTabAction,
              });
            }),
        });
        // this._subtasks.gsubtasks('setActive', 0, true);
      }
    },

    _destroy: function () {
        this.element
        .removeClass('g-preview').removeClass('gpreview')
        .removeClass(this.options.customClass)
        .empty();

      this._superApply(arguments);
    },

    /**
     * Sets loadParams to tabs and calls refresh if requested.
     * @param {Object} data Object where key is index of tab in gpreview and value is loadParams for this tab
     * @param {boolean} refresh - Rerenders currently active tab if true
     */
    load: function (data, refresh, loadOptions) {
      this._refreshVisibility(this.options.disabled);
      for (var tabIndex in data) {
        var tab = typeof tabIndex == 'number' ?
          this._options.tabs[tabIndex] :
          this._options.tabs.filter(function (t) {
            return t.name === tabIndex;
          }).first();

        if (tab != null) {
            tab.loadParams = data[tabIndex];
            tab.loadOptions = loadOptions && loadOptions[tab.name || tabIndex]
        }
      }

      if (refresh === true) {
        var active = this.getActive();

        if (active < 0 && this._options.tabs.length >= 1 &&
            this._options.activeItem != null) {
          active = this._options.activeItem;
        }

        this.setActive(active, true);
      }
    },

    /**
     * Sets same loadParams to all tabs and calls refresh if requested.
     * @param {Object} data LoadParams object which is set to all tabs
     * @param {boolean} refresh - Rerenders currently active tab if true
     */
    loadAll: function (data, refresh, loadOptions) {

      this._refreshVisibility(this.options.disabled);
      for (var i = 0, l = this._options.tabs.length; i < l; i++) {
        var tab = this._options.tabs[i];
          tab.loadParams =  data;
          tab.loadOptions = loadOptions;
      }

      if (refresh === true) {
        var active = this.getActive();

        if (active < 0 && this._options.tabs.length >= 1 &&
            this._options.activeItem != null) {
          active = this._options.activeItem;
        }

        this.setActive(active, true);
      }
    },

    /**
     * Sets loadParams (data) to given tab and calls refresh if requested.
     * @param {Number} item Index of tab
     * @param {Object} data LoadParams for tab
     * @param {boolean} refresh Sets given tab as active and rerenders it.
     */
    loadItem: function (item, data, refresh, loadOptions) {
      this._refreshVisibility(this.options.disabled);

      if (data != null) {
        switch (typeof item) {
          case 'string': {
            var foundItem = this._options.tabs.filter(function (t) {
              return t.name === item;
            }).first();
                foundItem.loadParams = data;
                foundItem.loadOptions = loadOptions 
            break;
          }
          case 'number': {
                this._options.tabs[item].loadParams = data;
                this._options.tabs[item].loadOptions = loadOptions 
            break;
          }
        }
      }

      if (refresh === true) {
        this.setActive(item, true);
      }
    },

    /**
     * Sets given tab active, without changing loadParams
     * @param {Number} item - Index of tab to activate
     * @param {boolean} invoke - invoke tab render
     */
    setActive: function (item, invoke) {
      this._options.previousItem = this._options.activeItem;
      this._options.activeItem = item;

      if (this._subtasks != null) {
          this._subtasks.gsubtasks('updateVisibility').gsubtasks('setActive', item, invoke || false); //TODO: updateVisibility asi jednou bude uvnitř setActive.
      } else if (this._options.useSubtask === false) {
        if (invoke) {
          this.actions.actTabAction.run({
            previewIndex: item,
          });
        }
      } else {
        this._options.activeItem = -1;
      }
    },

    /**
      * Gets index of currently active tab
      * @returns {Number} or -1 if there are no tabs.
      */
    getActive: function () {
      if (this._subtasks != null) {
        return this._subtasks.gsubtasks('option', 'activeItem');
      } else if (this._options.useSubtask === false) {
        return this._options.activeItem;
      }

      return -1;
      },

      showInfo: function (info) {
          this._disabledElement.hide();
          this._contentElement.hide();
          if (this._subtasks != null) {
              this._subtasks.hide();
          }
          this._infoElement.empty().append(info).show();
      },

      _refreshVisibility: function (disabled) {
          this._disabledElement.toggle(disabled);
          this._contentElement.toggle(!disabled);
          if (this._subtasks != null) {
              this._subtasks.toggle(!disabled);
          }
          this._infoElement.hide();
      },
      focus: function () {
          if (this._subtasks != null) {
              this._subtasks.gsubtasks('focus');
          }
      }
  });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gdatecombobox.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name> gordic.gdatecombobox.js                                                                        </Name>
//    <Description> intervalové (datumové) políčko s textovou nabídkou (dnes, tento týden, minulý rok,...)  </Description>
//    <Author> thazmuka                                                                                     </Author>
//    <Copyright> © GORDIC spol. s r. o. 1993-2019                                                          </Copyright>
//    <Created> 2019-04-23                                                                                  </Created>
//  </FileHeader>

(function ($) {
    "use strict";
    $.widget("gordic.gdatecombobox", $.gordic.gselectbox, {

        options: {
            name: "gdatecombobox",                  // Název.
            dropdown: true,                         // Nabídka nápovědy na šipku dolů.
            strict: false,                          // Povoluje/zakazuje možnost akceptovat hodnotu, která není v originálním zdroji dat (vlastnost data). 
            sortable: true,                         // Povolení měnit pořadí vybraných hodnot. 
            filterMinLength: 0,                     // Minimální počet napsaných znaků, pro který spustí filtrování v nabídce nápovědy (autocomplete)
            helperColumns: ["caption"],             // Seznam datových sloupců použitých při budování indexu pro nabídku nápovědy (autocomplete).
            placeholder: "D.M.RRRR - D.M.RRRR",     // Placeholder pro datumovou předvolbu.
            showSelectButton: false
        },

        _setUserSettingsChange: function () {

            var that = this;

            this.element.on("fieldchange", function () {
                // uživatelské nastavení je definované a můžeme ho použít
                if (that.options.userSettings != null) {
                    // cesta(path) v uživatelském nastavení
                    var name = that.options.name + ".date";
                    // hodnota načtená z políčka
                    var value = $(this).gfield("getValue");
                    that.options.userSettings.set(name, value);
                }
            });
        },

        _getUserSettingsChange: function () {
            if (this.options.initialValue == null) {
                // uživatelské nastavení je definované a můžeme ho použít
                if (this.options.userSettings != null) {
                    // cesta(path) v uživatelském nastavení
                    var name = this.options.name + ".date";
                    // hodnota načtená z uživatelského nastavení
                    var value = this.options.userSettings.get(name);
                    // nasetování do výchozí hodnoty
                    this.options.initialValue = value;
                }
            }
        },

        _create: function () {
            new Gordic.Gui.WebControls.GDateComboboxBase().create(this.element, this.options);
            console.info("gdatecombobox was created. ", this.uuid);
            this._super();
        },

    });
})(jQuery);




//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.gcolorpickerfield.js 

(function ($) {
    "use strict";

    $.widget("gordic.gcolorpickerfield", $.gordic.gfield, {

        options: {
            customClass: "",
            uzo: null,
            readonly: false,
            type: null,
            globalSettings: null
        },

        _create: function () {
            var that = this;
            this.options.initialValue = this._value = "0";  // not marked
            this._superApply(arguments);
            if (this.options.uzo != null) {
                this.options.initialValue = this._value = this.options.uzo;
            }
            this.element.addClass("gcolorpickerfield");
            this.colorWidget = $("<div>").gcolorpicker({
                globalSettings: this.options.globalSettings,
                type: this.options.type,
                uzo: this._value,
                readonly: this.options.readonly,
                change: function (uzo) {
                    that.setValue(uzo);
                }
            }).appendTo(this.element);
        },

        _destroy: function () {
            this.element.removeClass("gcolorpickerfield");
            this._superApply(arguments);
        },

        getValue: function () {
            return this._value;
        },

        setValue: function (value, flags) {
            flags = flags || {};
            this._superApply(arguments);
            this._value = value;
            this.colorWidget.gcolorpicker("setColor", this._value);
            if (flags.triggerChange !== false) {
                this._trigger("change", null, { value: value, flags: flags });
            }
        },

    });

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gmdfield.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.gmdfield.js                          </Name>
//    <Description>                                                             </Description>
//    <Author>      Tomáš Skála                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-22                                                  </Created>
//  </FileHeader>

(function ($) {
    "use strict";

    var InputFieldController = CreateClass({
        _constructor: function (input, opts) {
            opts = opts || {}; 
            this.input = input instanceof jQuery ? input[0] : input;
            this.autoFocus = opts.autoFocus !== false;

            if (!isElement(input))
                throw new GError("InputFieldController: Critical error: 'input' is required");
        },
        _focus: function () {
            var sc = this.input.scrollTop;
            this.input.focus();
            this.input.scrollTop = sc; 
        },
        getCursor: function () { return { start: this.input.selectionStart, end: this.input.selectionEnd }; },
        setCursor: function (selectionStart, selectionEnd, offset, valueLength) {
            if (this.autoFocus) this._focus();
            offset = offset || 0;

            valueLength = valueLength == null ? this.inpus.value.length - (offset || 0) : valueLength;
            if (selectionEnd < 0 || 1/selectionEnd === -Infinity) selectionEnd += valueLength;
            if (selectionEnd == null) selectionEnd = (selectionStart == null ? valueLength : selectionStart);
            if (selectionStart == null) selectionStart = selectionEnd; 

            this.input.setSelectionRange(offset + selectionStart, offset + selectionEnd); // position cursor at the value end
        },
        getText: function () { return _this.fieldInput.value },
        setText: function (value, selectionStart, selectionEnd) {
            if (this.autoFocus) this._focus();

            $(this.input).val(value).trigger("input");
            if (typeof selectionStart !== "undefined")
                this.input.setSelectionRange(selectionStart, typeof selectionEnd !== "undefined" ? selectionEnd : selectionStart);
        },
        getSelection: function () { return this.input.value.substring(this.input.selectionStart, this.input.selectionEnd); },
        setSelection: function (value, selectionStart, selectionEnd) {
            var ct = this.input.value;
            var cs = this.getCursor();

            $(this.input).val(ct.substring(0, cs.start) + value + ct.substring(cs.end)).trigger("input");
            this.setCursor(selectionStart, selectionEnd, cs.start, value.length);
        },
        getSelectionLinesCursor: function () {
            var text = this.input.value;
            var rs = text.lastIndexOf("\n", this.input.selectionStart - 1)+1;
            return { start: this.input.selectionStart - rs, end: this.input.selectionEnd - rs };
        },
        getSelectionLines: function () {
            var text = this.input.value;
            var rs = text.lastIndexOf("\n", this.input.selectionStart - 1)+1;
            var re = text.indexOf("\n", this.input.selectionEnd-1);
            return text.substring(rs, re >= 0 ? re : text.length).split("\n");
        },
        setSelectionLines: function (lines, selectionStart, selectionEnd) {
            if ($.isArray(lines)) lines = lines.join("\n"); 
            var text = this.input.value;
            var rs = text.lastIndexOf("\n", this.input.selectionStart - 1)+1;
            var re = text.indexOf("\n", this.input.selectionEnd-1);

            $(this.input).val(text.substring(0, rs) + lines + text.substring(re >= 0 ? re : text.length)).trigger("input");
            this.setCursor(selectionStart, selectionEnd, rs, lines.length);
        },
        wrapSelection: function (markStart, markEnd) {
            if (typeof markEnd === "undefined") markEnd = markStart;
            var l = 0, st = (markStart || "") + this.getSelection().replace(/\s*$/, function (s) { l = s.length; return (markEnd || "") + s; }); // skip koncovych mezer z automatickeho oznaceni slov dvojklikem
            this.setSelection(st, null, -markEnd.length-l);
        },
        insertLineMark: function (mark, trimRx, skipEmptyLines, keepSelection) {
            var lines = this.getSelectionLines();
            var sel = keepSelection === true && this.getSelection().length > 0; 
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (skipEmptyLines === true && line == '' && lines.length > 1) continue; 
                lines[i] = mark + (trimRx ? line.replace(trimRx, '') : lines[i]);
            }
            this.setSelectionLines(lines, sel ? 0 : undefined, sel ? -0 : undefined);
        }
    });

    $.widget("gordic.gmdfield", $.gordic.gstringbox, {
        options: {
            menu: null,
            preview: true,
            rows: 10, 
            smartNavInvertEnterBehavior: true,

            handleFile: function (ev, obj) {   // defaultni implementace zpracovani obrazku a jinych souboru. NULL pro vypnuti podpory
                var field = $(this);
                Gordic.Utils.File.chunkUpload(obj.file)  //.progress(function (p) { })
                    .then(function (fi) {
                        var service = field.data("uploadService");
                        if (!service) field.data("uploadService", service = $.content(field[0]).createServiceContent("Gordic.Gui.WebControls.GArticleService"));   // create on demand only
                        
                        service && service.call("GetFile", { fileInfo: fi, reupload: "" }).done(function (result) {
                            if (result.length > 0) {
                                var text = obj.file.type.startsWith("image/") ?
                                    "![" + fi.filename + "](gimage:" + result + ")" :
                                    "[" + fi.filename + "](gfile:" + result + ")";
                                obj.mdtext.setSelection(text);
                            }
                        });
                    });
            }
        },
        _create: function () {
            this._superApply(arguments);

            this.element.addClass("gmdfield");

            this.refreshPreviewDebounced = Gordic.Utils.debounced(this.refreshPreview, 1000);

            //inicializace serverového volání pro vkládání obrázků
            if (this.options.handleFile)
                this._addFileListeners();
        },
        _destroy: function () {
            this.element.removeClass("gmdfield");

            this._superApply(arguments);
        },
        _createInputs: function (parent) {
            this._superApply(arguments);
            var _this = this;

            this._createMenuActions();
            this._initMenu();

            this._initPreview();

            this.fieldInput.on({
                "input": function () {
                    if (_this.fieldPreview)
                        _this.refreshPreviewDebounced();
                }
            });
        },

        _initMenu: function () {
            var _this = this;

            if (this.menu) this.menu.remove();

            var defaultMenu = this.actions.createBar(
                [["jres:25030721", "mactHeader1", "mactHeader2", "mactHeader3", "mactHeader4", "mactHeader5", "mactHeader6"], "mactBold", "mactItalic", "mactStrike", "-", "mactBulletList", "mactNumberedList", "mactOutdent", "mactIndent", "-", "mactQuote", "mactCode", "mactHr", "mactLink", "mactAnchor", "mactTable", "mactImage"], //RC 25030721 : Nadpis
                [this.options.preview === true ? "mactPreview" : null, "mactHelp"]
            );
            var menu = $.isFunction(this.options.menu) ? this.options.menu.call(this.element[0], defaultMenu, this.actions) :
                $.isArray(this.options.menu) ? defaultMenu.concat([{ type: "separator" }], this.options.menu) :
                    this.options.menu === false ? null : defaultMenu;

            this.menu = !menu ? null :
                $("<div class='gmdfield-menu'>").insertBefore(this.table)
                    .gbuttonpanel({ params: menu })
                    .gdomcontext({
                        mdtext: new InputFieldController(_this.fieldInput[0], { autoFocus: true })
                    });
        },

        _initPreview: function (force) {
            // DETACH PREVIOUS
            if (this.fieldPreview) {
                this.fieldPreview.removeClass("gmdfield-preview");
                if ($.contains(this.element[0], this.fieldPreview[0])) this.fieldPreview.remove();
            }

            // ATTACH NEW
            if (!this.options.preview && force !== true) // no preview.. preview=false,null,undefined
                this.fieldPreview = null;
            else if (isElement(this.options.preview) || this.options.preview instanceof jQuery) // external preview
                this.fieldPreview = $(this.options.preview).addClass('gmdfield-preview');
            else if (force === true || this.actions.mactPreview.checked()) // internal preview
                this.fieldPreview = $("<div class='gmdfield-preview'>").insertAfter(this.table);
            else
                this.fieldPreview = null; 
        },

        _createMenuActions: function () {
            var _this = this;

            this.actions.addRange({
                mactLink: {
                    icon: "fa-link",
                    caption: "jres:29250027", //RC 29250027 : Externí odkaz
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        var sel = ctx.mdtext.getSelection();
                        if (sel.startsWith("http") || sel.startsWith("ftp") || sel.startsWith("www."))
                            ctx.mdtext.setSelection("[jres:25030725](" + sel + ")", 1, -3 - sel.length);
                        else
                            ctx.mdtext.setSelection("[" + (sel.trim()||"jres:25030725") + "](https://www.)", null, -1); //RC 25030725 : Odkaz
                    }
                },
                mactAnchor: {
                    icon: "fa-anchor",
                    caption: "jres:25030723", //RC 25030723 : Kotva / Záložka
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        if (ctx.mdtext.getSelection().length)
                            ctx.mdtext.wrapSelection("{#", "}");
                        else
                            ctx.mdtext.setSelection("{#anchor}", 2, -1);
                    }
                },
                mactHr: {
                    icon: "fa-window-minimize",
                    caption: "jres:25030724", //RC 25030724 : Horizontální oddělovač
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        var preLine = (ctx.mdtext.getSelectionLinesCursor().start > 0 ? "\n" : "");  // odrakovani na zacatku v pripade, ze stojime v pulce radku
                        ctx.mdtext.setSelection(preLine + "___\n");
                    }
                },
                mactTable: {
                    caption: "jres:29250044", //RC 29250044 : Vložit tabulku
                    captionVisible: "never",
                    icon: "fa-table",
                    run: function (ev, ctx) {
                        var panelFormDesc = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-8-4-0" })
                            .addRow("jres:29250046").addField("gnumberbox", { //RC 29250046 : Počet řádků
                                name: "rows",
                            })
                            .addRow("jres:29250047").addField("gnumberbox", { //RC 29250047 : Počet sloupců
                                name: "columns",
                            });

                        var cnt = $.content(ctx.field);
                        (cnt && cnt.dialogs || GDlg).simpleForm("jres:29250045", panelFormDesc, { columns: 2, rows: 2 }, { width: 320, height: 200 }) //RC 29250045 : Vložit tabulku
                            .on("closed", function (ev, values) {
                                if (values) {
                                    var preLine = (ctx.mdtext.getSelectionLinesCursor().start > 0 ? "\n" : "");  // odrakovani na zacatku v pripade, ze stojime v pulce radku
                                    ctx.mdtext.setSelection(preLine + _this.createTable(values.rows, values.columns), 2 + preLine.length);
                                }
                                $(ctx.field).gfield("focus"); 
                            });
                    }
                },
                mactImage: {
                    icon: "fa-cloud-upload",
                    caption: "jres:25030717", //RC 25030717 : Vložit soubor nebo obrázek
                    captionVisible: "never",
                    enabled: !!this.options.handleFile,
                    run: function (ev, ctx) {
                        $("<input type='file' accept='image/*, *'>")
                            .on("change", function (ev) {
                                if (this.files && this.files.length)
                                    _this.handleFile("insert", this.files[0], ctx.mdtext);
                            })
                            .click();
                    }
                },
                mactHeader1: {
                    //icon: "fa-header",
                    caption: "jres:25030721 1",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("# ", /^[# ]*|[# ]*$/g, true);
                    }
                },
                mactHeader2: {
                    caption: "jres:25030721 2",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("## ", /^[# ]*|[# ]*$/g, true);
                    }

                },
                mactHeader3: {
                    caption: "jres:25030721 3",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("### ", /^[# ]*|[# ]*$/g, true);
                    }
                },
                mactHeader4: {
                    caption: "jres:25030721 4",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("#### ", /^[# ]*|[# ]*$/g, true);
                    }
                },
                mactHeader5: {
                    caption: "jres:25030721 5",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("##### ", /^[# ]*|[# ]*$/g, true);
                    }
                },
                mactHeader6: {
                    caption: "jres:25030721 6",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("###### ", /^[# ]*|[# ]*$/g, true);
                    }
                },
                mactBold: {
                    caption: "jres:29250043", //RC 29250043 : Tučné písmo
                    captionVisible: "never",
                    icon: "fa-bold",
                    run: function (ev, ctx) {
                        ctx.mdtext.wrapSelection("**");
                    }
                },
                mactItalic: {
                    caption: "jres:29250028", //RC 29250028 : Kurzíva
                    captionVisible: "never",
                    icon: "fa-italic",
                    run: function (ev, ctx) {
                        ctx.mdtext.wrapSelection("*");
                    }
                },
                mactStrike: {
                    caption: "jres:29250029", //RC 29250029 : Přeškrtnutí
                    captionVisible: "never",
                    icon: "fa-strikethrough",
                    run: function (ev, ctx) {
                        ctx.mdtext.wrapSelection("~~");
                    }
                },
                mactNumberedList: {
                    icon: "fa-list-ol",
                    caption: "jres:29250030", //RC 29250030 : Číselný seznam
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("1. ", /^\d+\./, true);
                    }
                },
                mactBulletList: {
                    icon: "fa-list-ul",
                    caption: "jres:29250031", //RC 29250031 : Odrážky
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("* ", /^\* /, true);
                    }
                },
                mactQuote: {
                    icon: "fa-quote-right",
                    caption: "jres:29250032", //RC 29250032 : Citace
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("> ");
                    }
                },
                mactCode: {
                    icon: "fa-code",
                    caption: "jres:25030722", //RC 25030722 : Předformátovaný text
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        var sel = ctx.mdtext.getSelection();

                        var cbl = ctx.mdtext.getSelectionLinesCursor().start === 0; // kurzor je na zacatku radku
                        if ((sel.length > 0 && sel.indexOf("\n") === -1) || (sel.length === 0 && !cbl)) // inline
                            ctx.mdtext.wrapSelection("`");
                        else
                            ctx.mdtext.wrapSelection((cbl ? "" : "\n") + "``` \n", (sel.length ? "" : "\n") + "```\n");
                    }
                },
                mactIndent: {
                    icon: "fa-indent",
                    caption: "jres:25030720", //RC 25030720 : Zvýšit odsazení
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("  ", null, false, true);
                    }
                },
                mactOutdent: {
                    icon: "fa-outdent",
                    caption: "jres:25030727", //RC 25030727 : Snížit odsazení
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        ctx.mdtext.insertLineMark("", /^  /, false, true);
                    }
                },
                mactHelp: {
                    icon: "fa-question-circle",
                    caption: "jres:29250034", //RC 29250034 : Nápověda syntaxe
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        window.open("https://markdown-it.github.io/");
                    }
                },
                mactPreview: {
                    icon: "fa-eye",
                    caption: "jres:25030726", //RC 25030726 : Náhled
                    checked: !window.gstor || window.gstor.getDef("Global.core.markdownFieldPreview", true),
                    captionVisible: "never",
                    run: function (ev, ctx) {
                        var ns = !_this.actions.mactPreview.checked(); 
                        _this.actions.mactPreview.checked(ns);
                        window.gstor && window.gstor.set("Global.core.markdownFieldPreview", ns);

                        _this._initPreview();
                        _this.refreshPreview(); 
                    }
                }
            });
        },
        createTable: function (rows, columns) {
            var result = '';

            result += "|  ".repeat(columns) + "|\n";
            result += "|-----".repeat(columns) + "|\n";

            for (var i = 0; i < rows; i++)
                result += "|  ".repeat(columns) + "|\n";

            return result;
        },

        refreshPreview: function () {
            this.refreshPreviewDebounced.cancel();
            $(this.fieldPreview).gmarkdown({
                content: this.fieldInput.val()
            });
        },

        handleFile: function (type, file, mdtext) {
            this._trigger("handleFile", null, { type: type, file: file, mdtext: mdtext || new InputFieldController(this.fieldInput[0]) });
        },

        _addFileListeners: function () {
            var that = this;
            //var input = this.fieldInput;//document.getElementsByClassName("mdinput");
            var area = this.fieldInput.get(0);
            if (area != null) {
                area.addEventListener("dragover", function (event) {
                    event.preventDefault();
                }, false);
                area.addEventListener("drop", function (event) {
                    if (event == null || event.dataTransfer == null) return; 
                    var files = event.dataTransfer.files;
                    var mdtext = new InputFieldController(that.fieldInput[0]);
                    for (var i = 0; i < files.length; i++) {
                        that.handleFile("drop", files[i], mdtext);
                        event.preventDefault();
                        //event.stopPropagation();  // nektere browsery pry jinak udelaji otevreni po svem, ale nevim ktere
                    }
                }, false);
                area.addEventListener("paste", function (event) {
                    if (event == null || event.clipboardData == null) return; 
                    var files = event.clipboardData.files;
                    var mdtext = new InputFieldController(that.fieldInput[0]); 
                    for (var i = 0; i < files.length; i++) {
                        that.handleFile("paste", files[i], mdtext);
                        event.preventDefault();
                    }
                }, false);
            }
        },

        _setOption: function (name, value) {
            this._superApply(arguments);

            switch (name) {
                case 'preview':
                    this._initPreview();
                    this.refreshPreview(); 
                    break;
            }
        },

        toMode: function (mode, val) {
            if (mode === "plainText") {
                $(this.menu).hide();
                this.table.hide();
                $(this.fieldPreview).css({ border: "0 none", padding: "0" });
            }
            else {
                $(this.menu).show();
                this.table.show();
                $(this.fieldPreview).css({ border: "1px solid gray", padding: "0.25rem" });
            }
        },

    })
}) (jQuery);

//#endregion

