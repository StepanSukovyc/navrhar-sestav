(function ($) {
    "use strict";
    //namespace("Gordic.Gin.Fields", {

    //    setInitialSettings: function (initialSettings) {
    //        Gordic.Gin.Fields.InitialSettings = initialSettings;
    //    },

    //});

    var Readers = namespace("Gordic.Data.Readers");
    var Fields = namespace("Gordic.Prefabs.Select");
    var GinFields = namespace("Gordic.Gin.Fields");
    var Selectors = namespace("Gordic.Data.Selectors");

    //Readers.Ginvpsu = function (options) { this._base({ readerClass: "Gordic.Gin.Client.GGinvpsuReader", keys: ['ixs_su', 'cj_ext'], columns: ["ixs_su", "cj_ext", "k_v", "aktivita", "dat_zmena", "zmenu_prov"], rowSize: 100, readAll: false, permanent: false, cached: 0 }, options); };
    //Readers.Ginvpsu.inheritsFrom(Readers.Base);
    //Fields.ginvpsu = function () { return { data: new Readers.Ginvpsu(), itemTemplate: "{cj_ext}", helperColumns: ["cj_ext"] }; };

    GinFields.MultiSuFunRef = function (options) { // zároveň název fieldu
       // var label = options && options.label;
        var rowOpt = options && options.rowOptions;
        var chovaniStrediskaDleUcelu = options && options.chovaniStrediskaDleUcelu;

        var isPredani = chovaniStrediskaDleUcelu == Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.PREDANI; 

        var ginVybPolfun = 1;
        var sslPripreomez = 1;
        var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
        if(k203Params) {
            ginVybPolfun = k203Params.gin_vyb_polfun;
            sslPripreomez = k203Params.ssl_pripreomez;
        }

        // ginVybPolfun:
        // 0 - SU,FUN,REF
        // 1 - SU,ORJ,FUN,REF
        // 2 - ORJ,FUN,REF
        // 3 - FUN,REF
      //  ginVybPolfun = 1;//

        var suVisible = false;
        var orjVisible = false;

        var wFun = "w-8";

        switch(ginVybPolfun) {
            case 0: { // SU,FUN,REF
                suVisible = true;
                break;
            }
            case 1: { // SU,ORJ,FUN,REF
                suVisible = true;
                orjVisible = true;
                wFun = "w-4";
                break;
            }
            case 2: { // ORJ,FUN,REF
                orjVisible = true;
                break;
            }
            case 3: { // FUN,REF
                wFun = "w-12";
                break;
            }
            default: break;
        }

        var defaults = {
            name: "GinFieldsMultiSuFunRef",
            model: null, // taky by určitě šla použít nějaká defaultní hodnota

            suOptions: {
                name: "suField",
                model: "IxsSu = ixs_su",
                serverFilters: {
                    aktivita: [100],
                },
               // change: $.noop(),
            },
            orjOptions: {
                name: "orjField",
                model: "IxsOrj = ixs_orj",
                serverFilters: {
                    aktivita: [100],
                },
            },
            funOptions: {
                name: "funField",
                model: "IxsFun = ixs_fun",
                serverFilters: {
                    aktivita: [100],
                    VazbaNaSpisovyDenik: isPredani && sslPripreomez == 1,
                },
            },
        }

        // --- server filters ------------

        var settings = $.extend({}, defaults, options);

        var sfSu = defaults.suOptions.serverFilters;
        var sfOrj = defaults.orjOptions.serverFilters;
        var sfFun = defaults.suOptions.serverFilters;

        if(options && options.suOptions && options.suOptions.serverFilters) {
            sfSu = $.extend({}, defaults.suOptions.serverFilters, options.suOptions.serverFilters);
        }
        if(options && options.orjOptions && options.orjOptions.serverFilters) {
            sfOrj = $.extend({}, defaults.orjOptions.serverFilters, options.orjOptions.serverFilters);

            sfOrj = $.extend({}, sfOrj, {
                ixs_su: new Gordic.Forms.Dependency(settings.suOptions.name, "ixs_su", false), // tato dependancy nefunguje jak v TK - ixs_su je v tabulce GINSORJ a měl by být spíš ixs_orj v tabulce GINSPOD
                ixs_fun: new Gordic.Forms.Dependency(settings.funOptions.name, "ixs_fun", false),
            });
        }
        if(options && options.funOptions && options.funOptions.serverFilters) {
            sfFun = $.extend({}, defaults.funOptions.serverFilters, options.funOptions.serverFilters);

            sfFun = $.extend({}, sfFun, {
                ixs_su: new Gordic.Forms.Dependency(settings.suOptions.name, "ixs_su", false),
                ixs_orj: new Gordic.Forms.Dependency(settings.orjOptions.name, "ixs_orj", false),
            });
        }

     //   var settings = $.extend({}, defaults, options);

        settings.suOptions.serverFilters = sfSu;
        settings.orjOptions.serverFilters = sfOrj;
        settings.funOptions.serverFilters = sfFun;

        const rowOptions = {
            label: rowOpt.label ? rowOpt.label : "jres:26275063" //RC 26275063 : Referent
        };

        var multipolePom = new Gordic.Forms.Form().addSection();
        multipolePom.addRow($.extend(true, rowOpt, rowOptions));

        if(suVisible) {
            multipolePom.addField("gselectbox", "w-4", 
                Gordic.Gin.Fields.ginspodSSU(settings.suOptions, chovaniStrediskaDleUcelu)
            );
        }

        if(orjVisible) {
            multipolePom.addField("gselectbox", "w-4",
                Gordic.Gin.Fields.ginsorjSSU(settings.orjOptions, chovaniStrediskaDleUcelu)
            );
        }

        multipolePom.addField("gselectbox", wFun,
            Gordic.Gin.Fields.ginsfunSSU(settings.funOptions, chovaniStrediskaDleUcelu, "suField"));

        return multipolePom.getLastSection();
    };

    GinFields.ginspodSSU = function (fieldOptions, chovaniStrediskaDleUcelu) {
        /// <summary> Policko ginspod rozsirene o filtr na strediska spisovych uzlu ovladanym z políčka ginspodSSU  </summary>
        /// <param name="chovaniStrediskaDleUcelu" type="bool">  zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich </param>
        /// <param name="fieldOptions" type="bool">options ginspod policka</param>
        var l_bFiltrovatZaStredisko = false;
        var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();

        var isPredani = chovaniStrediskaDleUcelu == Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.PREDANI; 
 
        if(k203Params) {
            // pokud je parametricky nastaveno (SSL - Filtrovat seznamy osob dle středisek spisových uzlů (hosting malých obcí)), nastavim vzdy filtr na strediska spisovych uzlu
            var l_bPovoleniPredaniMeziStredisky = isPredani && k203Params.gin_pre_mestre == 1 && k203Params.adm_ginstre_typ == 0; // GIN - Povolení předání dokumentů / dokladů mezi středisky spisových uzlů

            l_bFiltrovatZaStredisko = k203Params.ssl_filtrosostr == 1 || l_bPovoleniPredaniMeziStredisky; // ačkoli je globálně nastaveno filtrování je na střediska, v módu předání může být pořadováno i předání mezi středisky
        }

        var defaults = {
            name: "ginspodFSSU",
            model: undefined,
            data: new Readers.Ginspod(),
            selector: function (options) { return new Selectors.DefaultSelector($.extend(true, Selectors.ginspod(), options)).show(); },
            itemTemplate: "{ofic_nazev}",
            helperColumns: ["ofic_nazev", "nazev"],
            helperItemTemplate: "{ofic_nazev}",
            serverFilters: {
                PridruzenaStrediska: l_bFiltrovatZaStredisko,
              //  CiziStrediska:,
            },
            change: $.noop(),
        }
        var sf = defaults.serverFilters;

        if(fieldOptions && fieldOptions.serverFilters) {
            sf = $.extend({}, defaults.serverFilters, fieldOptions.serverFilters);
        }

        var settings = $.extend({}, defaults, fieldOptions);
        settings.serverFilters = sf;

        return settings;
    };

    GinFields.ginsfunSSU = function (fieldOptions, chovaniStrediskaDleUcelu, nameOfGinspod) {
        /// <summary> Policko ginsfun rozsirene o filtr na strediska spisovych uzlu (pridruzena strediska) </summary>
        /// <param name="fieldOptions" type="bool">options ginsfun policka</param>
        /// <param name="chovaniStrediskaDleUcelu" type="bool">  zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich </param>
        /// <param name="nameOfGinspod" type="string">Pokud se na formuláři nachází i ginspod a chceme ho ovládat pomocí tohoto checkBoxu. Defaultní name ginspodu  je 'ginspodFSSU' nutno přepisovat v případě více ginsspodu na formuláři </param>

        var isGinsrefReader = fieldOptions.typeReader == "Ginsref";

        var isPredani = chovaniStrediskaDleUcelu == Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.PREDANI; 
        var isPrideleni = chovaniStrediskaDleUcelu == Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.PRIDELENI;
        var isBeznePouziti = chovaniStrediskaDleUcelu == Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE;

        var l_bCheckBoxVisible = false;
        var l_bCheckBoxEnabled = true;
        var l_bCheckBoxChecked = false;
        var l_bFiltrovatZaStredisko = false;
        var l_bFiltrOsobDleAgendProPredani = false;
        nameOfGinspod = nameOfGinspod || "ginspodFSSU";
        // pokud ma byt checkbox viditelny, pak zkontroluji zda ma aktualni uzel vyplnene IxsTre a pak ho zviditelnim, zaskrtnu a nastavim filtr trojpolicka
        var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
        if (k203Params) {
            // pokud je parametricky nastaveno (SSL - Filtrovat seznamy osob dle středisek spisových uzlů (hosting malých obcí)), nastavim vzdy filtr na strediska spisovych uzlu
            l_bFiltrovatZaStredisko = k203Params.ssl_filtrosostr == 1;
            var l_bPovoleniPredaniMeziStredisky = isPredani && k203Params.gin_pre_mestre == 1 && k203Params.adm_ginstre_typ == 0; // GIN - Povolení předání dokumentů / dokladů mezi středisky spisových uzlů 
   
            // checkbox se zobrazuje pouze na predavacich dialozich
            l_bCheckBoxVisible = isPredani || isPrideleni || isBeznePouziti;
            l_bCheckBoxChecked = l_bFiltrovatZaStredisko || l_bPovoleniPredaniMeziStredisky;
            l_bCheckBoxEnabled = !l_bFiltrovatZaStredisko || l_bPovoleniPredaniMeziStredisky;

            // ADM - Střediska spisových uzlů - způsob použítí (typ použití - části jedné nebo více organizací)
            //   0 - Oddelene celky jedne organizace
            //   10 - Samostatna organizace

            // pokud se filtruje a zaroven se jedna o samostatnou organizaci, pak zneviditelnim checkbox
            if (l_bFiltrovatZaStredisko && k203Params.adm_ginstre_typ == 10) {
                l_bCheckBoxVisible = false;
            }

            // GIN / SSL - Filtrovat seznamy osob pro předání / přidělení dle povolených agend pro funkce
            l_bFiltrOsobDleAgendProPredani = (isPredani || isPrideleni) && k203Params.ssl_pripreomtag != "" && k203Params.ssl_pripreomtag != ",";
        }

        var data = null;
        var selectorFunction = undefined;
        var itemTemplateFunction = undefined;

        if(fieldOptions && fieldOptions.typeReader == "Ginsref") {
            data = new Readers.Ginsref();
            selectorFunction = function (options) { return new Selectors.DefaultSelector($.extend(true, Selectors.ginsref(), options)).show(); };
            itemTemplateFunction = function (row) { return ("<div class='fa fa-user minifoto'></div><b>{0}</b>").format(row.nazev) };
        } else {
            data = new Readers.Ginsfun();
            selectorFunction = function (options) { return new Selectors.DefaultSelector($.extend(true, Selectors.ginsfun(), options)).show(); };
            itemTemplateFunction = function (row) { return ("<div class='fa fa-user minifoto'></div><b>{0}</b><br><i>{1}</i>").format(row.nazev_ref, fieldFunction.getFormatedString([row.nazev, row.nazev_su], ", ")) };
        }

        var defaults = {
            model: undefined,
            data: data,
            selector: selectorFunction,
            itemTemplate: itemTemplateFunction,
            graphicInput: "oninput",
            verticalButtons: true,
            helperColumns: ["nazev_ref", "nazev", "nazev_su"],
            serverFilters: {
                PridruzenaStrediska: l_bCheckBoxChecked,
                DlePovolenychAgend: isGinsrefReader ? undefined : l_bFiltrOsobDleAgendProPredani // ginsref nemá tento filtr
            }
        }
        var sf = defaults.serverFilters;

        if(fieldOptions && fieldOptions.serverFilters) {
            sf = $.extend({}, defaults.serverFilters, fieldOptions.serverFilters);
        }

        var settings = $.extend({}, defaults, fieldOptions);
        settings.serverFilters = sf;

        var re = settings;
        // cast pridani checkboxu do prefabu
        var ico = "";
        if(l_bCheckBoxChecked) {
            ico = 'fa-check-square-o';
        } else {
          //  ico = 'fa-square-o';
            ico = 'fa-square';
        }

        if(l_bCheckBoxVisible === true) {
            re.verticalButtons = false;
            re.buttons = [
                {
                    id: "ButtonCheckGinsfun",
                    actionContext: { ginspodField: nameOfGinspod },
                    action: new GAction({
                        enabled: l_bCheckBoxEnabled,
                        visible: l_bCheckBoxVisible,
                        name: 'actCheckGinsfun',
                        caption: "",
                       // serverFilters: settings.serverFilters, // je to tady vůbec nutne?
                        icon: ico,
                        tooltip: "jres:31910051", //RC 31910051 : Filtrovat dle střediska
                        run: function (ev, ctx) { // funkce po kliku na empty check
                            var selBox = $(ctx.field);
                            var ginspodField = selBox.gform().findFields(ctx.ginspodField);
                            //var but = selBox.gfield("getButton", "ButtonCheckGinsfun");
                            var jenVlastniChecked = this.icon === "fa-square-o";
                            var jenCiziChecked = this.icon === "fa-square";
                            var nefiltrovatChecked = this.icon === "fa-check-square-o";

                            var filterVlastniStredisko = false;
                            var filterCiziStredisko = false;
         
                            if(jenVlastniChecked) {
                                this.update({ icon: "fa-check-square-o" });

                                filterVlastniStredisko = true;
                            } else if(nefiltrovatChecked) {
                                this.update({ icon: "fa-square" });

                            } else if(jenCiziChecked) {
                                this.update({ icon: "fa-square-o" });

                                filterCiziStredisko = true;
                            } 

                            if(k203Params && k203Params.ssl_filtrosostr == 1) {
                                filterVlastniStredisko = true;
                            }

                            selBox.gfield("option", "serverFilters", $.extend(selBox.gfield("option", "serverFilters"), { PridruzenaStrediska: filterVlastniStredisko, CiziStrediska: filterCiziStredisko }));
                            ginspodField.gfield("option", "serverFilters", $.extend(ginspodField.gfield("option", "serverFilters"), { PridruzenaStrediska: filterVlastniStredisko, CiziStrediska: filterCiziStredisko }));
                        }
                    })
                }
            ];
        }
        return re;
    };

    GinFields.ginsorjSSU = function (fieldOptions) {
        /// <summary> Policko ginspod rozsirene o filtr na strediska spisovych uzlu ovladanym z políčka ginspodSSU  </summary> 
        /// <param name="fieldOptions" type="bool">options ginspod policka</param>
        var l_bFiltrovatZaStredisko = false;
        var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
        if (k203Params) {
            l_bFiltrovatZaStredisko = k203Params.ssl_filtrosostr == 1;
        }

        var defaults = {
            name: "ginsorjFSSU",
            model: undefined,
            data: new Readers.Ginsorj(),
            selector: function (options) { return new Selectors.DefaultSelector($.extend(true, Selectors.ginsorj(), options)).show(); },
            itemTemplate: "{nazev}",
            helperColumns: ["nazev", "zkratka"],
            helperItemTemplate: "{nazev}",
            serverFilters: {
                PridruzenaStrediska: l_bFiltrovatZaStredisko
            },
            change: $.noop(),
        }
        var sf = defaults.serverFilters;

        if (fieldOptions && fieldOptions.serverFilters) {
            sf = $.extend({}, defaults.serverFilters, fieldOptions.serverFilters);
        }

        var settings = $.extend({}, defaults, fieldOptions);
        settings.serverFilters = sf;

        return settings;
    };

    GinFields.ginswgp = function (fieldOptions) {
        /// <summary> Policko ginspod rozsirene o filtr na strediska spisovych uzlu ovladanym z políčka ginspodSSU  </summary> 
        /// <param name="fieldOptions" type="bool">options ginspod policka</param>

        var defaults = {
            name: "ginswgp",
            model: undefined,
            data: new Readers.Ginswgp(),
            selector: function (options) { return new Selectors.DefaultSelector($.extend(true, Selectors.ginswgp(), options)).show(); },
            itemTemplate: "{nazev}",
            helperColumns: ["nazev", "zkratka"],
            helperItemTemplate: "{nazev}",
            change: $.noop(),
        }
        //var sf = defaults.serverFilters;

        //if (fieldOptions && fieldOptions.serverFilters) {
        //    sf = $.extend({}, defaults.serverFilters, fieldOptions.serverFilters);
        //}

        var settings = $.extend({}, defaults, fieldOptions);
       // settings.serverFilters = sf;

        return settings;
    };

   /* $(function () {
        Gordic.Gin.Fields.setInitialSettings();
    });*/

    //INCLUDE fieldGlobalFunctions.fields.js
    var defSeparator = " | ";
    var simSeparator = " - ";
    var fieldFunction = {
        getRangeString: function (first, second) {
            var result = "";

            if (first === second) {
                result = first;
            }
            else if (first && second) {
                result = first + " - " + second;
            }
            else if (first) {
                result = "od " + first;
            }
            else {
                result = "do " + second;
            }
            return result;
        },

        getDatum: function (datum) {
            var date = new Date(datum);
            return date.toLocaleDateString();
        },
        getDateFromTo: function (fromDate, toDate) {
            return this.getRangeString(this.getDatum(fromDate), this.getDatum(toDate));
        },
        isEmpty: function (value) {
            if (value == null) return true;
            var str = value.toString();
            return !str || str.length === 0 || /^\s*$/.test(str);
        },
        getFormatedString: function (values, separator) {
            return values.filter(function (it) { return !!it; }).join(separator);
        },
        /* options: "fb" - prvni tucne, "sb" - druhe tucne, vse ostatni - bez zvyrazneni */
        getSimpleInfoString: function (info, more, options) {
            if (options === "fb") return ("<b>{0}</b>{1}").format(info, !this.isEmpty(more) ? simSeparator + more : ""); //first bold
            else if (options === "sb") return ("{0}{1}").format(info, !this.isEmpty(more) ? simSeparator + "<b>" + more + "</b>" : ""); //second bold
            else return ("{0}{1}").format(info, !this.isEmpty(more) ? simSeparator + more : ""); //no bold       
        },
        getFormatedLabeledString: function (dictionary) {
            var formatedLabeledString = "";
            for (var key in dictionary) {
                if (!this.isEmpty(dictionary[key])) {
                    formatedLabeledString += (defSeparator + "{0}: {1}").format(key, dictionary[key]);
                }
            }

            return formatedLabeledString.replace(/^\s*\|/g, "").trim();
        },
        getInfoStr: function (obj) {
            var headInfo = obj.info;
            var moreInfoTxt = obj.more;
            return ("<b>{0}</b><span class=\"moreInfo\">{1}</span>").format(headInfo, this.isEmpty(moreInfoTxt) ? "" : defSeparator + moreInfoTxt);
        }

    };

})(jQuery);

