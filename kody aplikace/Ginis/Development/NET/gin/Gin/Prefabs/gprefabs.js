/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gprefabs.js
*    project     q:\ginis\Development\NET\Gordic.Gin.WebClient\Gordic.Gin.WebClient.csproj
*    created     2026-02-16 14:38:41
*    files       Gin\Gin\Prefabs\ginterval.js
*                Gin\Gin\Prefabs\grokMesic.js
*                Gin\Gin\Prefabs\GDenMesicRok.js
*                Gin\Gin\Prefabs\gnumIntervalRok.js
*                Gin\Gin\Prefabs\gmemorySelectbox.js
*                Gin\Gin\Prefabs\gintervalcontextbox.js
*/

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\ginterval.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.ginterval.js                           </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>


(function ($) {
    "use strict";

    // prefab dvou políček ---------------------------------------------------------------------------------------------

    var _pomocnaValidaceRokuInterval = function (value, field) { /// pomocna funkce pro validaci roku od roku do
        var fieldy = field.gformrow().findFields();
        fieldy.gfield("resetErrors", "baseValidace");
        var field1Val = fieldy.eq(0).gfield("getValue");
        var field2Val = fieldy.eq(1).gfield("getValue");
        this.message = "jres:31910003"; //RC 31910003 : Hledané 'Od' je větší než hledané 'Do'.

        // 08.10.2019 - TFeik
        // Ošetření případu, kdy je použita vlastní vlaidační skupina.
        if (!this.group || !this.group.trim()) {
            // V případě, že není definována žádná skupina, pak přidám "baseValidace".
            this.group = "baseValidace";
        }
        else if (this.group.indexOf("baseValidace") === -1) {
            // Jestliže skupina vyplněna je (obsahuje customValidationGroup), ale neobsahuje "baseValidace", pak ji přidám.
            this.group += ", baseValidace";
        }
        
        if (field1Val !== null && field2Val !== null && (field1Val > field2Val)) {
            return false;
        } else {
            return true;
        }
    };

    var _differenceCount = function (ev, changObj) {
        var fieldy = $(this).gformrow().findFields();
        var field1Val = fieldy.eq(0).gfield("getValue");
        var field2Val = fieldy.eq(1).gfield("getValue");
        var difference = fieldy.eq(0).gfield("option", "difference");
        if (field1Val && field2Val) {
            var vys = field2Val - field1Val;
            $(this).gformrow().find(".gform-text").html(vys + " " + difference);
        } else {
            $(this).gformrow().find(".gform-text").html("");
        }

    };


    var _twoFields = function (optionsInput) {
        /// <summary>
        /// základní funkce pro vytvoření dvou políček s intervalem
        /// </summary>
        /// <param name="options" type="obj">
        /// &#10;label: ""              //  (string)  label řádku 
        /// &#10;name: ""               //  (string)  name řádku, použije se i jako name filedu s příponou start / end
        /// &#10;type: ""               //  (string)  typ políčka
        /// &#10;pathInModel: ""        //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
        /// </param>
        /// <returns type="[rows]"></returns>
        var defOptions = {
            label: "jres:31910017",                 // Label řádku. //RC 31910017 : Od Do
            name: "interval",               // Jméno řádku, to samé jmeno se použije jako jmenou fieldu s příponou  Start/End
            type: "rok",                    // Typ intervalu .. více typů popsáno níže
            pathInModel: null,              // Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})
            emptyValue: null,                // emptyValue
            difference: null,               // Rozdílová hodnota mezi políčky start a end.
            defaultSize: null,
            defaultValue: null,             // defaultvalue

            customOptFieldStart: {},   // rozšiřující option srart políčka
            customOptFieldEnd: {},    // rozšiřující option end políčka
            customOptAll: {},          // rozšiřující options pro obě políčka
            customValidationGroup: undefined    // Vlastní validační skupina, na kterou se spustí pro výchozí validátory.
        };

        var options = $.extend({}, defOptions, optionsInput); // vytvořím options
        options.cesta = options.pathInModel || options.name;

        switch (options.type) {
            case "date":
                return _twoFieldsCreate("gdatebox", options);
               
            case "datetime":
                options.customOptAll.valueType = "datetime";
                return _twoFieldsCreate("gdatebox", options);
            case "number":
                return _twoFieldsCreate("gnumberbox", options);
            case "string":
                return _twoFieldsCreate("gstringbox", options);
            case "rok":
                if (!options.customOptAll.validators)
                {
                    options.customOptAll.validators = [];
                }
                // 08.10.2019 - TFeik
                // Přidána možnost použít vlastní validační skupinu pro výchozí validátory.
                options.customOptAll.validators.push(
                    new Gordic.Validators.Base({ validate: _pomocnaValidaceRokuInterval, group: options ? options.customValidationGroup : undefined })
                    , new Gordic.Validators.Range({ min: 1900, max: 2999, message: "jres:31910002", group: options ? options.customValidationGroup : undefined })  //RC 31910002 : Hodnota roku je mimo dovolený rozsah (1900- 2999).
                );
                return _twoFieldsCreate("gnumberbox", options);
                
            case "denMesicRok":     // 28.08. Přidání políčka denMesicRok do intervalu. Tomáš Feik
                return _twoDayMonthYearFieldsCreate(options);
               
        }
        return null;
    };

    var _twoFieldsCreate = function (boxTyp, options) {
        var twoFieldsForm = null;
        if ( typeof options.difference !== "string") {
            twoFieldsForm = new Gordic.Forms.Form()
                .addSection()
                    .addRow({ label: options.label, name: options.name })     //LK20170328_8.2, prirazeni nazvu radku a oznaceni property na DTO
                .addField(
                    boxTyp
                    , options.defaultSize || "w-6"
                    , { name: options.name + "Start", model: options.cesta + ".start=value", emptyValue: options.emptyValue, defaultValue: options.defaultValue, }
                    , options.customOptAll
                    , options.customOptFieldStart) //políčko OD
                .addField(
                    boxTyp
                    , options.defaultSize || "w-6"
                    , { name: options.name + "End", model: options.cesta + ".end=value", emptyValue: options.emptyValue, defaultValue: options.defaultValue, }
                    , options.customOptAll
                    , options.customOptFieldEnd)   //políčko Do
            ; 
        } else {
            twoFieldsForm = new Gordic.Forms.Form()
                .addSection()
                    .addRow({ label: options.label, name: options.name })     //LK20170328_8.2, prirazeni nazvu radku a oznaceni property na DTO
                        .addField(boxTyp, "w-4", {
                            name: options.name + "Start", model: options.cesta + ".start=value", emptyValue: options.emptyValue, defaultValue: options.defaultValue,
                                difference: options.difference, change: _differenceCount
                        }, options.customOptAll, options.customOptFieldStart) //políčko OD
                        .addField(boxTyp, "w-4", {
                            name: options.name + "End", model: options.cesta + ".end=value", emptyValue: options.emptyValue, defaultValue: options.defaultValue,
                                difference: options.difference, change: _differenceCount
                        }, options.customOptAll, options.customOptFieldEnd)   //políčko Do
                        .addText("", "w-4");
           
        }
        return twoFieldsForm.form.sections["0"].rows;
    };
    
    /**
     * Vytvoří 2 políčka prefabu denMesicRok.
     *
     * @author  tfeik
     * @date    28.08.2017
     *
     * @param {object} options Objekt s patametry prefabu.
     *
     * @returns {gform.section.rows} Řádek s políčky prefabu formuláře.
     */
    var _twoDayMonthYearFieldsCreate = function (options) {
        var defaultOptionsFieldFrom = {
            "label": "jres:32110149", //RC 32110149 : Od
            "fieldOptions": { "model": options.cesta + ".start=value" },
            "name": options.cesta + "Start"
        },
            defaultOptionsFieldTo = {
                "label": "jres:32110150", //RC 32110150 : Do
                "fieldOptions": { "model": options.cesta + ".end=value" },
                "name": options.cesta + "End"
            };

        // Zrušení uložení do objektů start/end při režimu singleValues.
        if (options.output === "singleValues") {
            defaultOptionsFieldFrom.fieldOptions.model = null;
            defaultOptionsFieldTo.fieldOptions.model = null;
        }

        var optionsFieldFrom = $.extend({}, options, defaultOptionsFieldFrom, options.customOptionsStartDayMonthYear),
            optionsFieldTo = $.extend({}, options, defaultOptionsFieldTo, options.customOptionsEndDayMonthYear),
            twoFieldsForm = null;
        twoFieldsForm = new Gordic.Forms.Form()
            .addSection()
            .addPrefab(Gordic.Gin.Prefabs.denMesicRok(optionsFieldFrom))
            .addPrefab(Gordic.Gin.Prefabs.denMesicRok(optionsFieldTo));

        return twoFieldsForm.form.sections["0"].rows;
    };

    namespace("Gordic.Gin.Prefabs", {
        interval: function (options) {
            /// <summary>
            /// řádek s intervalem
            /// </summary>
            /// <param name="options" type="obj">
            /// &#10;label: ""              //  (string)  label řádku 
            /// &#10;name:""                //  (string)  name řádku, použije se i jako name filedu s příponou start / end
            /// &#10;type: ""               //  (string)  typ prefabu
            /// &#10;pathInModel: ""        //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
            /// </param>
            /// <returns type="[rows]"></returns>
            var defOptions = { };

            var finalOptions = $.extend({}, defOptions, options);
            return _twoFields(finalOptions);
        }
    });

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\grokMesic.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.grokMesic.js                           </Name>
//    <Description> Základní funkce pro vytvoření dvou políček rok měsíc        </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-13                                                  </Created>
//  </FileHeader>

(function ($) {
    "use strict";

    var _rokMesic = function (userOptions) {
        /// <summary>
        /// Základní funkce pro vytvoření dvou políček rok měsíc
        /// </summary>
        /// <param name="options" type="obj">
        /// &#10;label: ""              //  (string)  label řádku
        /// &#10;name: []               //  (string)  name řádku, použije se i jako name filedu s příponou
        /// &#10;type: ""               //  (string)  typ políčka
        /// &#10;pathInModel: ""        //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})
        /// &#10;roky []                //  (pole)    pro jiné rozmezí let než default
        /// &#10;mesice []                //  (pole)    pro jiné rozmezí let než default
        /// </param>
        /// <returns type="[rows]"></returns>
        var defOptions = {
            label: "jres:31910004",             // Label řádku. //RC 31910004 : Rok měsíc
            name: "rokMesic",               // Jméno řádku, to samé jmeno se použije jako jmenou fieldu s příponou  Start/End
            type: "string",                 // Typ intervalu .. více typů popsáno níže
            pathInModel: null,              // Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
            roky: null,                      // pole roků
            mesice: null,
            customOptField1: null,   // rozšiřující option srart políčka
            customOptField2: null,    // rozšiřující option end políčka
            customOptAll: null
        };
        var options = $.extend({}, defOptions, userOptions); // vytvořím options
        options.cesta = options.pathInModel || options.name;

        if (options.roky === null || options.roky === undefined) {
            options.roky = [];
            for (var i = 1950; i < 2050; i++) {
                options.roky = options.roky.concat([i]);
            }
        }

        if (options.customOptField1 == null) { options.customOptField1 = {}; }
        if (options.customOptField2 == null) { options.customOptField2 = {}; }


        options.customOptField1.name = options.customOptField1.name ? options.customOptField1.name : options.name + "Mesic";
        options.customOptField1.model = options.customOptField1.model ? options.customOptField1.model : options.cesta + "=value";
        options.customOptField1.modelValueTransform = options.customOptField1.modelValueTransform ? options.customOptField1.modelValueTransform : {
            apply: function (modelValue) {
                if (modelValue) {
                    if (options.type === "number") {
                        var mesic = modelValue % 12;
                    } else {
                        var mesic = parseInt(modelValue.slice(4, 6)) - 1;
                    }
                    return { id: mesic };
                }
                return null;
            },
            collect: function (fieldValue) {
                return null;
            }
        };

          
        options.customOptField2.name = options.customOptField2.name ? options.customOptField2.name : options.name + "Rok";
        options.customOptField2.data = options.customOptField2.data ? options.customOptField2.data:  new Gordic.Data.View(options.roky);
        options.customOptField2.model = options.customOptField2.model ? options.customOptField2.model : options.cesta + "=value";
        options.customOptField2.modelValueTransform = options.customOptField2.modelValueTransform ? options.customOptField2.modelValueTransform : {
            apply: function (modelValue) {
                if (modelValue) {
                    if (options.type === "number") {
                        var rok = parseInt(modelValue / 12);
                    } else {
                        var rok = parseInt(modelValue.slice(0, 4));
                    }
                    return rok;
                }
                return null;
            },
            collect: function (fieldValue) {
                if (fieldValue) {
                    var valMesic = $(this).gformrow().findFields().eq(0).gfield("getValue");
                    var valRok = $(this).gformrow().findFields().eq(1).gfield("getValue");
                    if (valMesic && valRok)
                        if (options.type === "number") {
                            return valRok * 12 + valMesic.id;
                        } else {
                            var num = valMesic.id + 1;
                            var str = num.toString();
                            if (str.length === 1) { str = "0" + str; }
                            return valRok.toString() + str;
                        }
                }
                return null;
            }
        };
         
        return _rokMesicCreate(options);
    };
    var _rokMesicCreate = function (options) {
        var mesicePole = [
            { nazev: "jres:31910005", id: 0 }, //RC 31910005 : Leden
            { nazev: "jres:31910006", id: 1 }, //RC 31910006 : Únor
            { nazev: "jres:31910007", id: 2 }, //RC 31910007 : Březen
            { nazev: "jres:31910008", id: 3 }, //RC 31910008 : Duben
            { nazev: "jres:31910009", id: 4 }, //RC 31910009 : Květen
            { nazev: "jres:31910010", id: 5 }, //RC 31910010 : Červen
            { nazev: "jres:31910011", id: 6 }, //RC 31910011 : Červenec
            { nazev: "jres:31910012", id: 7 }, //RC 31910012 : Srpen
            { nazev: "jres:31910013", id: 8 }, //RC 31910013 : Září
            { nazev: "jres:31910014", id: 9 }, //RC 31910014 : Říjen
            { nazev: "jres:31910015", id: 10 }, //RC 31910015 : Listopad
            { nazev: "jres:31910016", id: 11 } //RC 31910016 : Prosinec
        ];
        if (options.mesice) {
            mesicePole = mesicePole.filter(function (a) {
                if (options.mesice.includes(a.id)) {
                    return true;
                }
            });

        }

        var FormRokMesic = new Gordic.Forms
            .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
            .addSection().addRow(options.label)
                .addField("gselectbox", "w-8", {
                    dropdown: true,
                    itemTemplate: "{nazev}",
                    //helperCustomizer: function (data) {
                    //    if (options.mesice) {
                    //        data = data.filter(function (a) {
                    //            if (options.mesice.includes(a.id)) {
                    //                return true;
                    //            }
                    //        });
                    //    }
                    //    return data;
                    //},
                    data: new Gordic.Data.View(mesicePole, { key: "id" })
                },
            options.customOptField1
            )
            .addField("gselectbox", "w-4", {
                dropdown: true
            },
                options.customOptField2
            )
        ;
        return FormRokMesic.form.sections["0"].rows;
    };


    namespace("Gordic.Gin.Prefabs", {
        rokMesic: function (options) {
            /// <summary>
            /// základní funkce pro vytvoření dvou políček rok měsíc
            /// </summary>
            /// <param name="options" type="obj">
            /// &#10;label: ""              //  (string)  label řádku 
            /// &#10;name: []               //  (string)  name řádku, použije se i jako name filedu s příponou 
            /// &#10;type: ""               //  (string)  typ políčka
            /// &#10;pathInModel: ""        //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
            /// &#10;roky []                //  (pole)    pro jiné rozmezí let než default
            /// </param>
            /// <returns type="[rows]"></returns>
            var defOptions = {
                type: "string"
            };
            var finalOptions = $.extend({}, defOptions, options);
            return _rokMesic(finalOptions);
        }

    });

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\GDenMesicRok.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.GDenMesicRok.js                        </Name>
//    <Description> Prefab políčka pro den, měsíc a rok.                        </Description>
//    <Author>      tfeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-07-13                                                  </Created>
//  </FileHeader>

(function ($) {
    "use strict";

    /**
     * Vytvoří řádek s políčky pro den, měsíc a rok.
     *
     * @author  tfeik
     * @date    24.07.2017
     *
     * @param {!object} options Parametry prefabu.
     * @returns {gform.section.rows} Řádek s políčky formuláře.
     */
    var _denMesicRokCreate = function (options) {
        var isDenUsed = false;
        var isMesicUsed = false;
        var isRokUsed = false;

        /**
         * Odstraní neplatní a duplicitní hodnoty z options.fields. Spočítá šířku políček a nastaví popisek políčka.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         */
        var adjustOptions = function () {
            // Odstranit duplikáty a neplatné buňky;
            var uniqueFields = [];
            $.each(options.fields, function (index, value) {
                var isCorrectValue = true;
                switch (value) {
                    case "den":
                        isDenUsed = true;
                        break;
                    case "mesic":
                        isMesicUsed = true;
                        break;
                    case "rok":
                        isRokUsed = true;
                        break;
                    default:
                        isCorrectValue = false;
                        break;
                }
                if (uniqueFields.indexOf(value) === -1 && isCorrectValue) {
                    uniqueFields.push(value);
                }
            });

            if (!uniqueFields.length) {
                console.warn('jres:32110009'); //RC 32110009 : Prefab políčka Den, měsíc, rok nemá nadefinované smysluplné "options.fields" a tak se nezobrazí.
                return;
            }
            options.fields = uniqueFields;

            // 26.10.2020 - TFeik
            // Počítání vlastností v objektu.
            var optionsWidthLength = Object.keys(options.width).length;
            // Nastavení šířek políček
            if (!optionsWidthLength || options.fields.length > optionsWidthLength) {
                if (isDenUsed && isMesicUsed && isRokUsed) {
                    options.width.day = 3;
                    options.width.month = 5;
                    options.width.year = 4;
                } else if (isDenUsed && isMesicUsed && !isRokUsed) {
                    options.width.day = 4;
                    options.width.month = 8;
                } else if (isDenUsed && !isMesicUsed && isRokUsed) {
                    options.width.day = 4;
                    options.width.year = 8;
                } else if (!isDenUsed && isMesicUsed && isRokUsed) {
                    options.width.month = 8;
                    options.width.year = 4;
                } else {
                    options.width.day = 12;
                    options.width.month = 12;
                    options.width.year = 12;
                }
            }

            // Vytvoření popisku dle buněk a jejich pořadí.
            if (!options.label) {
                options.label = "";

                $.each(options.fields, function (index, value) {
                    switch (value) {
                        case "den":
                            options.label += "jres:32110147"; //RC 32110147 : den
                            break;
                        case "mesic":
                            options.label += "jres:32110018"; //RC 32110018 : měsíc
                            break;
                        case "rok":
                            options.label += "jres:32110148"; //RC 32110148 : rok
                            break;
                    }

                    if (index + 1 !== options.fields.length) {
                        options.label += ", ";
                    }
                });

                options.label = options.label.charAt(0).toUpperCase() + options.label.slice(1);
            }

            // Nastavení minim pro výběr políček.
            if (options.rangeDay.selectableMinValue === null) {
                options.rangeDay.selectableMinValue = options.rangeDay.minValue;
            }
            if (options.rangeDay.selectableMaxValue === null) {
                options.rangeDay.selectableMaxValue = options.rangeDay.maxValue;
            }
            if (options.rangeMonth.selectableMinValue === null) {
                options.rangeMonth.selectableMinValue = options.rangeMonth.minValue;
            }
            if (options.rangeMonth.selectableMaxValue === null) {
                options.rangeMonth.selectableMaxValue = options.rangeMonth.maxValue;
            }
            if (options.rangeYear.selectableMinValue === null) {
                options.rangeYear.selectableMinValue = options.rangeYear.minValue;
            }
            if (options.rangeYear.selectableMaxValue === null) {
                options.rangeYear.selectableMaxValue = options.rangeYear.maxValue;
            }
        }();
        
        /**
         * Zkontroluje, zda se zadaný den nachází v zadaném měsíci a roce.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         * @param {div} parentElement Div element, na kterém jsou hledány políčka prefabu.
         * @returns {boolean} Příznak, zda je datum validní.
         */
        var isDenSpravne = function (parentElement) {
            var data = {};
            var isCorrect = false;
            var maxDay = 31;
            var valueDay = null;
            var valueMonth = null;
            var valueYear = null;

            /**
             * Zkontroluje, zda je zadaný rok přestupný.
             *
             * @author  tfeik
             * @date    24.07.2017
             *
             * @param {number} rok Rok ke zkontrolování.
             * @returns {boolean} Příznak, zda je zadaný rok přestupný
             */
            var isPrestupnyRok = function (rok) {
                var isPrestupnyRok = false;

                if (rok % 4 === 0 && rok % 100 !== 0
                    || rok % 400 === 0) {
                    isPrestupnyRok = true;
                }

                return isPrestupnyRok;
            };

            // Získání jednotlivých hodnot v políčkách.
            $(parentElement).findFields(options.name + "Den, " + options.name + "Mesic, " + options.name + "Rok").gfield("model", "collect", data);

            if (options.output === "singleValues") {
                valueDay = data[options.name + "Den"];
                valueMonth = data[options.name + "Mesic"];
                valueYear = data[options.name + "Rok"];
            } else if (options.output === "object") {
                valueDay = data[options.name].Den;
                valueMonth = data[options.name].Mesic;
                valueYear = data[options.name].Rok;
            } else { // String
                valueDay = modelStringApply("Den", data[options.name]);
                valueMonth = modelStringApply("Mesic", data[options.name]);
                valueYear = modelStringApply("Rok", data[options.name]);
            }
            
            if (valueDay !== null && valueDay !== undefined
                && valueMonth !== null && valueMonth !== undefined) {
                // Pokud je znám den a měsíc, pak zkontroluji, zda se zadaný den v měsíci nachází.
                var cisloMesice;
                if (typeof valueMonth === "number") {
                    cisloMesice = valueMonth;
                } else {
                    cisloMesice = parseInt(valueMonth.cislo);
                }

                switch (cisloMesice) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        maxDay = 31;
                        break;
                    case 2:
                        if (valueYear === null || valueYear === undefined
                            || isPrestupnyRok(valueYear)) {
                            maxDay = 29;
                        } else {
                            maxDay = 28;
                        }
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        maxDay = 30;
                        break;
                    default:    // 13. měsíc a víc
                        maxDay = 1;
                        break;
                }

                if (valueDay <= maxDay && valueDay > 0) {
                    isCorrect = true;
                }
            } else if (valueDay !== null && valueDay !== undefined){
                // Pokud má den hodnotu, pak nesmí být větší jak 31 dní.
                if (valueDay <= maxDay && valueDay > 0) {
                    isCorrect = true;
                }
            } else {
                // Pokud není vyplněn ani den, ani měsíc pak není formulář doplněn a bere se jako validní.
                isCorrect = true;
            }

            return isCorrect;
        };

        /**
         * Pomocná proměnná pro získávání hodnoty pomocí modelCollect().
         */
        var modelCollectValue = null;

        /**
         * Sezbírá hodnotu políček a vrátí v požadovaném tvaru (určeným parametrem "output").
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         * @param {string} type Typ políčka "Den", "Mesic", "Rok".
         * @param {object|number} value Hodnota políčka
         * @returns {object|string} Hodnoty políček prefabu ve tvaru určeném parametrem "output".
         */
        var modelCollect = function (type, value) {
            /**
             * Převede číslo na string s požadovaným počtem platných čísel doplněním prefixových nul.
             *
             * @author  tfeik
             * @date    24.07.2017
             *
             * @param {number} number Číslo k vytisknutí
             * @param {number} targetLength Požadovaný počet platných čísel.
             * @returns {string} Číslo vytisknuté na požadovaný počet platných čísel.
             */
            function leftPad(number, targetLength) {
                var result = "";
                if (number) {
                    result += number.toString();
                    while (result.length < targetLength) {
                        result = "0" + result;
                    }
                }
                return result;
            }

            if (!modelCollectValue) {
                modelCollectValue = {};
            }

            // Uloží hodnotu políčka do pomocné proměnné.
            modelCollectValue[type] = value;

            var itemCount = 0;
            $.each(modelCollectValue, function (index, value) {
                itemCount++;
            });

            // Pokud jsou sezbíraná již všechny políčka, pak spracuji výsledek.
            if (itemCount === options.fields.length) {
                modelCollectValue.Datum = "";
                if (options.ekoDate === true) {
                    // Vytvořím šablonu pro formát YYYYMMDD.
                    modelCollectValue.Datum = "YYYY";
                    if (isDenUsed === true || isMesicUsed === true) {
                        modelCollectValue.Datum += "MM";
                    }
                    if (isDenUsed === true) {
                        modelCollectValue.Datum += "DD";
                    }
                } else {
                    // Vytvořím šablonu pro formát YYYY-MM-DD.
                    if (isRokUsed === true) {
                        modelCollectValue.Datum += "YYYY";
                    }
                    if (isMesicUsed === true) {
                        if (isRokUsed === true) {
                            modelCollectValue.Datum += "-";
                        }
                        modelCollectValue.Datum += "MM";
                    }
                    if (isDenUsed === true) {
                        if (isMesicUsed === true || isRokUsed === true && isMesicUsed === false) {
                            modelCollectValue.Datum += "-";
                        }
                        modelCollectValue.Datum += "DD";
                    }
                }

                // Nastavení (replace) hodnot do naformátovaného stringu.
                if (isRokUsed === true && modelCollectValue.Rok) {
                    modelCollectValue.Datum = modelCollectValue.Datum.replace("YYYY", leftPad(modelCollectValue.Rok, 4));
                }
                if (isMesicUsed === true && modelCollectValue.Mesic) {
                    modelCollectValue.Datum = modelCollectValue.Datum.replace("MM", leftPad(modelCollectValue.Mesic, 2));
                }
                if (isDenUsed === true && modelCollectValue.Den) {
                    modelCollectValue.Datum = modelCollectValue.Datum.replace("DD", leftPad(modelCollectValue.Den, 2));
                }

                var tempValue = modelCollectValue;
                modelCollectValue = null;

                // Pokud je "output" nastaven na "string" pak vrátím pouze jej. V opačném případě vracím celý objekt.
                if (options.output === "string") {
                    return tempValue.Datum;
                } else {
                    return tempValue;
                }
            }

            return modelCollectValue;
        };

        /**
         * Zpracuje stringovou hodnotu a vrátí požadovanou složku datumu.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         * @param {string} fieldName Typ políčka "Den", "Mesic", "Rok".
         * @param {string} modelValue Hodnota, která se má do políčka uložit.
         * @returns {?number} Číslo dne / měsíce / roku (nebo null) pro uložení.
         */
        var modelStringApply = function (fieldName, modelValue) {
            var day = null, month = null, year = null;
            if (options.ekoDate === true) {
                if (modelValue.length === 4 && isRokUsed === true && isMesicUsed === false && isDenUsed === false
                    || modelValue.length === 6 && isRokUsed === true && isMesicUsed === true && isDenUsed === false
                    || modelValue.length === 8 && isRokUsed === true && isMesicUsed === true && isDenUsed === true) {
                    year = parseInt(modelValue.substring(0, 4));
                    if (modelValue.length === 6 || modelValue.length === 8) {
                        month = parseInt(modelValue.substring(4, 6));
                    }
                    if (modelValue.length === 8) {
                        day = parseInt(modelValue.substring(6, 8));
                    }
                } else {
                    console.error('jres:32110010'); //RC 32110010 : Vstupní hodnota neodpovídá formátu pro ekoDate ("YYYY", "YYYYMM" nebo "YYYYMMDD").
                }
            } else {
                var valueArray = modelValue.split("-"); // [0 = rok, 1 = mesic, 2 = den]
                if (valueArray.length === options.fields.length && valueArray.length > 0 && valueArray.length <= 3) {
                    for (var i = 0; i < valueArray.length; i++){
                        var value = parseInt(valueArray[i]);

                        if (isRokUsed === true && year === null) {
                            year = value;
                        } else if (isMesicUsed === true && month === null) {
                            month = value;
                        } else if (isDenUsed === true && day === null) {
                            day = value;
                        }
                    }
                } else {
                    console.error('jres:32110011'); //RC 32110011 : Vstupní hodnota neodpovídá formátu "YYYY-MM-DD". Pokud má být nastaveno na patřičnou složku null, pak místo něj ponechte zástupný znak (např.: "2017-08-DD"), nebo ho vynechtejte pokud políčko není použité (např.: "2017-08").
                }
            }

            var result = null;
            switch (fieldName) {
                case "Den":
                    result = day;
                    break;
                case "Mesic":
                    result = month;
                    break;
                case "Rok":
                    result = year;
                    break;
            }

            if (isNaN(result)) {
                result = null;
            }
            return result;
        };

        ///**
        // * Vrací část názvu políčka dle parametru output.
        // *
        // * @author  tfeik
        // * @date    24.07.2017
        // *
        // * @param {string} fieldName Název políčka.
        // * @returns {string} Dodatečný název políčka.
        // */
        //var getModelPathIdentificator = function (fieldName) {
        //    if (options.output === "singleValues") {
        //        return fieldName;
        //    } else {
        //        return "";
        //    }
        //};

        /**
         * Vrátí model hodnotu políčka dle parametru "output" a dle toho, zda ji uživatel nastavil ručně.
         *
         * @author  tfeik
         * @date    24.08.2017
         *
         * @param {object} fieldOptions Parametry konkrétního políčka.
         * @param {string} fieldName Identifikátor políčka "Den", "Mesic", "Rok".
         * @returns {string} Hodnota pro model parametr políčka.
         */
        var getFieldModelValue = function (fieldOptions, fieldName) {
            if (fieldOptions.model !== null && fieldOptions.model !== undefined) {
                return fieldOptions.model;
            }

            var result = "";
            if (options.output === "singleValues") {
                result += fieldOptions.pathInModel || fieldOptions.name;
            } else {
                result += fieldOptions.pathInModel || options.name;
            }
            result += "=value";
            return result;
        };

        /**
         * Přidá do formuláře políčko dne.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         */
        var addDenField = function () {
            var fieldName = "Den";

            /**
             * Vytvoří DataView pro políčko dne dle min. a max. hodnoty.
             *
             * @author  tfeik
             * @date    29.08.2017
             *
             * @param {integer} min Minimílní hodnota dne.
             * @param {integer} max Minimílní hodnota dne.
             * @returns {DataView} DataView pro hodnoty dne.
             */
            var createData = function (min, max) {
                var dataArray = [];
                for (var i = min; i <= max; i++) {
                    dataArray.push(i);
                }
                return dataArray;
            };

            var selectableRange = {
                "min": options.rangeDay.selectableMinValue,
                "max": options.rangeDay.selectableMaxValue
            };
            var selectableValues = options.rangeDay.selectableValues;

            // Výchozí parametry políčka dne.
            var fieldOptions = {
                "name": options.name + fieldName,
                "dropdown": true,
                /**
                 * Změní data v políčku, dle min a max hodnoty.
                 *
                 * @author  tfeik
                 * @date    29.08.2017
                 *
                 * @param {number} min Minimální hodnota dne.
                 * @param {number} max Maximální hodnota dne.
                 * @param {gcontent} content Content, na kterém je políčko.
                 */
                "changeRange": function (min, max, content) {
                    if (content === undefined || content === null) {
                        content = $.content("main");
                    }
                    content.findFields(this.name).gfield("option", "data", createData(min, max));
                },
                /**
                 * Změní limity zobrazení hodnot v políčku, dle min a max hodnoty.
                 *
                 * @author  tfeik
                 * @date    29.08.2017
                 *
                 * @param min Minimální uživatelsky nastavitelná hodnota dne.
                 * @param max Maximální uživatelsky nastavitelná hodnota dne.
                 */
                "changeSelectableRange": function (min, max) {
                    selectableRange = { "min": min, "max": max}
                },
                /**
                 * Změní limity zobrazení hodnot v políčku, dle zadaných hodnot.
                 *
                 * @author  TFeik
                 * @date    22.10.2021
                 *
                 * @param values Pole uživatelsky nastavitelných hodnot dne.
                 */
                "changeSelectableValues": function (values) {
                    selectableValues = values;
                },
                "data": createData(options.rangeDay.minValue, options.rangeDay.maxValue),
                "validators": [
                    new Gordic.Validators.Base({
                        "message": "jres:32110012", //RC 32110012 : Zadaný měsíc neobsahuje tento den.
                        "validate": function (value, object) {
                            return isDenSpravne(object.parent()); //NOTE (BM 2022-09-06): pouzivalo se object.context.parentElement, ale od JQ 3.0 byla property 'context' zrusena. Viz: https://api.jquery.com/context/
                        }
                    })
                ],
                //"model": options.path + getModelPathIdentificator(fieldName) + "=value",
                "modelValueTransform": {
                    "apply": function (modelValue) {
                        if (modelValue && typeof modelValue === "object" && modelValue[fieldName]) {
                            return modelValue[fieldName];
                        } else if (modelValue && typeof modelValue === "number") {
                            return modelValue;
                        } else if (modelValue && typeof modelValue === "string") {
                            return modelStringApply(fieldName, modelValue);
                        } else {
                            return null;
                        }
                    },
                    "collect": function (fieldValue) {
                        if (options.output === "singleValues") {
                            return fieldValue;
                        } else {
                            return modelCollect(fieldName, fieldValue);
                        }
                    }
                },
                // 22.10.2021 - TFeik
                // Doplněno filtrování dat i pro výběr přes "trojtečku".
                selector: function (options) {
                    var data = $(this).gfield('option', 'data');
                    var filteredData = [];

                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var row = data[i];
                            if (selectableRange.min <= row && selectableRange.max >= row
                                && (selectableValues == null || selectableValues.includes(row))
                            ) {
                                filteredData.push(row);
                            }
                        }
                    }

                    return new Gordic.Data.Selectors.DefaultSelector({
                        data: filteredData,
                        gridFormat: new Gordic.Data.GridFormat()
                            .addTextColumn({
                                name: 'den',
                                caption: 'jres:32110219', //RC 32110219 : Den
                                cellTemplate: function (row) {
                                    return row;
                                }
                            })
                    }).show();
                },
                "helperCustomizer": function (rawData) {
                    var filteredData = [];
                    $.each(rawData, function (index, row) {
                        if (selectableRange.min <= row && selectableRange.max >= row
                            && (selectableValues == null || selectableValues.includes(row))
                        ) {
                            filteredData.push(row);
                        }
                    });
                    return filteredData;
                },
                // 15.11.2021 - TFeik
                // Doplněna vlastní validace pro případ, kdy uživatel zadá hodnotu ručně.
                // Pokud zadá například 05 pak hodnota přijde ve stringu. V ten okamžik ji 
                // parsuji na číslo a následně kontroluji, zda je v datech.
                // Pokud nebylo nalezeno, pak nechám obsluhu na políčku (vrácení undefined).
                verify: function (value) {
                    if ((typeof value) === 'string') {
                        value = parseInt(value);
                    }

                    var data = $(this).gfield('option', 'data');
                    if ($.isArray(data) && data.indexOf(value) >= 0) {
                        return value;
                    }
                }
            };

            var mergedFieldOptions = $.extend({}, fieldOptions, options.fieldOptions, options.dayFieldOptions);
            mergedFieldOptions.model = getFieldModelValue(mergedFieldOptions, fieldName);

            var field = denMesicRokForm
                .addField("gselectbox", "w-" + options.width.day.toString(), mergedFieldOptions);
        };

        /**
         * Přidá do formuláře políčko měsíce.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         */
        var addMesicField = function () {
            var fieldName = "Mesic";

            /**
             * Vytvoří DataView pro políčko měsíce dle min. a max. hodnoty.
             *
             * @author  tfeik
             * @date    29.08.2017
             *
             * @param {integer} min Minimílní hodnota měsíce.
             * @param {integer} max Minimílní hodnota měsíce.
             * @returns {DataView} DataView pro hodnoty měsíce.
             */
            var createData = function (min, max) {
                // Kalendářní měsíce.
                var defaultDataArray = [
                    { "nazev": "jres:31910005", "cislo": "01", "id": 1 },   //RC 31910005 : Leden
                    { "nazev": "jres:31910006", "cislo": "02", "id": 2 },   //RC 31910006 : Únor
                    { "nazev": "jres:31910007", "cislo": "03", "id": 3 },   //RC 31910007 : Březen
                    { "nazev": "jres:31910008", "cislo": "04", "id": 4 },   //RC 31910008 : Duben
                    { "nazev": "jres:31910009", "cislo": "05", "id": 5 },   //RC 31910009 : Květen
                    { "nazev": "jres:31910010", "cislo": "06", "id": 6 },   //RC 31910010 : Červen
                    { "nazev": "jres:31910011", "cislo": "07", "id": 7 },   //RC 31910011 : Červenec
                    { "nazev": "jres:31910012", "cislo": "08", "id": 8 },   //RC 31910012 : Srpen
                    { "nazev": "jres:31910013", "cislo": "09", "id": 9 },   //RC 31910013 : Září
                    { "nazev": "jres:31910014", "cislo": "10", "id": 10 },  //RC 31910014 : Říjen
                    { "nazev": "jres:31910015", "cislo": "11", "id": 11 },  //RC 31910015 : Listopad
                    { "nazev": "jres:31910016", "cislo": "12", "id": 12 }   //RC 31910016 : Prosinec
                ];

                var dataArray = [];
                // Přidám kalendářní měsíce do dat políčka v rozsahu min. a max.
                for (var i = 0; i < defaultDataArray.length; i++) {
                    if (min <= defaultDataArray[i].id && max >= defaultDataArray[i].id) {
                        dataArray.push(defaultDataArray[i]);
                    }
                }

                // Pokud je ekoDate pak přidám další měsíce (více než 12) dle zadaného rozsahu do max 99.
                if (options.ekoDate === true) {
                    var ekoMesic = 13;
                    if (min > ekoMesic) {
                        ekoMesic = min;
                    }

                    var ekoMesicMaxValue = max;
                    if (ekoMesicMaxValue > 99) {
                        ekoMesicMaxValue = 99;
                    }
                    for (; ekoMesic <= ekoMesicMaxValue; ekoMesic++) {
                        dataArray.push({
                            "nazev": ekoMesic.toString() + ". " + "jres:32110018", //RC 32110018 : měsíc
                            "cislo": ekoMesic.toString(),
                            "id": ekoMesic
                        });
                    }
                }
                var dataView = new Gordic.Data.View(dataArray, { key: "id" });
                dataView.process({
                    denMesicRokSort: new Gordic.Data.SortProcessor(Gordic.Data.Sorting.Inline.number("id", false, false))
                }); 
                return dataView;
            };

            var selectableRange = {
                "min": options.rangeMonth.selectableMinValue,
                "max": options.rangeMonth.selectableMaxValue
            };
            var selectableValues = options.rangeMonth.selectableValues;

            // Výchozí parametry políčka měsíce.
            var fieldData = createData(options.rangeMonth.minValue, options.rangeMonth.maxValue);
            var fieldOptions = {
                "name": options.name + fieldName,
                "dropdown": true,
                /**
                 * Změní data v políčku, dle min a max hodnoty.
                 *
                 * @author  tfeik
                 * @date    29.08.2017
                 *
                 * @param {number} min Minimální hodnota měsíce.
                 * @param {number} max Maximální hodnota měsíce.
                 * @param {gcontent} content Content, na kterém je políčko.
                 */
                "changeRange": function (min, max, content) {
                    if (content === undefined || content === null) {
                        content = $.content("main");
                    }
                    content.findFields(this.name).gfield("option", "data", createData(min, max));
                },
                /**
                 * Změní limity zobrazení hodnot v políčku, dle min a max hodnoty.
                 *
                 * @author  tfeik
                 * @date    29.08.2017
                 *
                 * @param min Minimální uživatelsky nastavitelná hodnota měsíce.
                 * @param max Maximální uživatelsky nastavitelná hodnota měsíce.
                 */
                "changeSelectableRange": function (min, max) {
                    selectableRange = { "min": min, "max": max }
                },
                /**
                 * Změní limity zobrazení hodnot v políčku, dle zadaných hodnot.
                 *
                 * @author  TFeik
                 * @date    22.10.2021
                 *
                 * @param values Pole uživatelsky nastavitelných hodnot měsíce.
                 */
                "changeSelectableValues": function (values) {
                    selectableValues = values;
                },
                "itemTemplate": "{nazev}",
                // 01.06.2021 - TFeik
                // Přidáno id.
                "helperColumns": ["id", "cislo", "nazev"],
                "data": fieldData,
                //"model": options.path + getModelPathIdentificator(fieldName) + "=value",
                "modelValueTransform": {
                    "apply": function (modelValue) {
                        if (modelValue && typeof modelValue === "object" && modelValue[fieldName]) {
                            return { id: modelValue[fieldName] };
                        } else if (modelValue && typeof modelValue === "number") {
                            return { id: modelValue };
                        } else if (modelValue && typeof modelValue === "string") {
                            return { id: modelStringApply(fieldName, modelValue) };
                        } else {
                            return null;
                        }
                    },
                    "collect": function (fieldValue) {
                        if (options.output === "singleValues") {
                            if (fieldValue) {
                                return parseInt(fieldValue.cislo);
                            } else {
                                return null;
                            }
                        }

                        if (fieldValue) {
                            return modelCollect(fieldName, parseInt(fieldValue.cislo));
                        } else {
                            return modelCollect(fieldName, null);
                        }
                    }
                },
                // 01.06.2021 - TFeik
                // Doplněno filtrování dat i pro výběr přes "trojtečku".
                selector: function (options) {
                    var filteredData = [];
                    $.each(fieldData.getDataRows(), function (index, row) {
                        if (selectableRange.min <= row.id && selectableRange.max >= row.id
                            && (selectableValues == null || selectableValues.includes(row.id))
                        ) {
                            filteredData.push(row);
                        }
                    });

                    return new Gordic.Data.Selectors.DefaultSelector({
                        data: filteredData,
                        gridFormat: new Gordic.Data.GridFormat()
                            .addTextColumn({
                                name: 'cislo',
                                caption: 'jres:32110216', //RC 32110216 : Číslo
                                width: 25
                            })
                            .addTextColumn({
                                name: 'nazev',
                                caption: 'jres:32110217', //RC 32110217 : Název
                                width: 100
                            })
                    }).show();
                },
                "helperCustomizer": function (rawData) {
                    var filteredData = [];
                    $.each(rawData, function (index, row) {
                        if (selectableRange.min <= row.id && selectableRange.max >= row.id
                            && (selectableValues == null || selectableValues.includes(row.id))
                        ) {
                            filteredData.push(row);
                        }
                    });
                    return filteredData;
                }
            };

            var mergedFieldOptions = $.extend({}, fieldOptions, options.fieldOptions, options.monthFieldOptions);
            mergedFieldOptions.model = getFieldModelValue(mergedFieldOptions, fieldName);

            denMesicRokForm
                .addField("gselectbox", "w-" + options.width.month.toString(), mergedFieldOptions);
        };

        /**
         * Přidá do formuláře políčko roku.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         */
        var addRokField = function () {
            var fieldName = "Rok";
            
            /**
             * Vytvoří DataView pro políčko roku dle min. a max. hodnoty.
             *
             * @author  tfeik
             * @date    29.08.2017
             *
             * @param {integer} min Minimílní hodnota roku.
             * @param {integer} max Minimílní hodnota roku.
             * @returns {DataView} DataView pro hodnoty roku.
             */
            var createData = function (min, max) {
                var dataArray = [];
                for (var i = max; i >= min; i--) {
                    dataArray.push(i);
                }
                return new Gordic.Data.View(dataArray);
            };

            var selectableRange = {
                "min": options.rangeYear.selectableMinValue,
                "max": options.rangeYear.selectableMaxValue
            };
            var selectableValues = options.rangeYear.selectableValues;

            // Výchozí parametry políčka roku.
            var fieldOptions = {
                "name": options.name + fieldName,
                "dropdown": true,
                /**
                 * Změní data v políčku, dle min a max hodnoty.
                 *
                 * @author  tfeik
                 * @date    29.08.2017
                 *
                 * @param {number} min Minimální hodnota roku.
                 * @param {number} max Maximální hodnota roku.
                 * @param {gcontent} content Content, na kterém je políčko.
                 */
                "changeRange": function (min, max, content) {
                    if (content === undefined || content === null) {
                        content = $.content("main");
                    }
                    content.findFields(this.name).gfield("option", "data", createData(min, max));
                },
                /**
                 * Změní limity zobrazení hodnot v políčku, dle min a max hodnoty.
                 *
                 * @author  tfeik
                 * @date    29.08.2017
                 *
                 * @param min Minimální uživatelsky nastavitelná hodnota roku.
                 * @param max Maximální uživatelsky nastavitelná hodnota roku.
                 */
                "changeSelectableRange": function (min, max) {
                    selectableRange = { "min": min, "max": max }
                },
                /**
                 * Změní limity zobrazení hodnot v políčku, dle zadaných hodnot.
                 *
                 * @author  TFeik
                 * @date    22.10.2021
                 *
                 * @param values Pole uživatelsky nastavitelných hodnot roku.
                 */
                "changeSelectableValues": function (values) {
                    selectableValues = values;
                },
                "data": createData(options.rangeYear.minValue, options.rangeYear.maxValue),
                //"model": options.path + getModelPathIdentificator(fieldName) + "=value",
                "modelValueTransform": {
                    "apply": function (modelValue) {
                        if (modelValue && typeof modelValue === "object" && modelValue[fieldName]) {
                            return modelValue[fieldName];
                        } else if (modelValue && typeof modelValue === "number") {
                            return modelValue;
                        } else if (modelValue && typeof modelValue === "string") {
                            return modelStringApply(fieldName, modelValue);
                        } else {
                            return null;
                        }
                    },
                    "collect": function (fieldValue) {
                        if (options.output === "singleValues") {
                            return fieldValue;
                        } else {
                            return modelCollect(fieldName, fieldValue);
                        }
                    }
                },
                // 22.10.2021 - TFeik
                // Doplněno filtrování dat i pro výběr přes "trojtečku".
                selector: function (options) {
                    var data = $(this).gfield('option', 'data').getDataRows();
                    var filteredData = [];

                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var row = data[i];
                            if (selectableRange.min <= row && selectableRange.max >= row
                                && (selectableValues == null || selectableValues.includes(row))
                            ) {
                                filteredData.push(row);
                            }
                        }
                    }

                    return new Gordic.Data.Selectors.DefaultSelector({
                        data: filteredData,
                        gridFormat: new Gordic.Data.GridFormat()
                            .addTextColumn({
                                name: 'rok',
                                caption: 'jres:32110220', //RC 32110220 : Rok
                                cellTemplate: function (row) {
                                    return row;
                                }
                            })
                    }).show();
                },
                "helperCustomizer": function (rawData) {
                    var filteredData = [];
                    $.each(rawData, function (index, row) {
                        if (selectableRange.min <= row && selectableRange.max >= row
                            && (selectableValues == null || selectableValues.includes(row))
                        ) {
                            filteredData.push(row);
                        }
                    });
                    return filteredData;
                }
            };

            var mergedFieldOptions = $.extend({}, fieldOptions, options.fieldOptions, options.yearFieldOptions);
            mergedFieldOptions.model = getFieldModelValue(mergedFieldOptions, fieldName);

            denMesicRokForm
                .addField("gselectbox", "w-" + options.width.year.toString(), mergedFieldOptions);
        };
        
        var denMesicRokForm = new Gordic.Forms
            .Form({ name: "denMesicRokForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
                .addSection()
                    .addRow(options.label);

        // Projdu požadovaná políčka a přidám je do formuláře.
        $.each(options.fields, function (index, value) {
            switch (value) {
                case "den":
                    addDenField();
                    break;
                case "mesic":
                    addMesicField();
                    break;
                case "rok":
                    addRokField();
                    break;
            }
        });
        
        return denMesicRokForm.form.sections["0"].rows;
    };
    
    namespace("Gordic.Gin.Prefabs", {
        /**
         * Prefab políčka pro den, měsíc a rok.
         *
         * @author  tfeik
         * @date    24.07.2017
         *
         * @param {object} options Objekt s parametry prefabu.
         * @param {string[]} [options.fields=["day", "month", "year"]] Pole s použitými složkami datumu a jejich pořadí v řádku.
         * @param {string} [options.output="object"] Typ výstupu políček "object", "singleValues", "string".
         * @param {boolean} [options.ekoDate=false] Povolení 13. měsíce (a více) a změna formátování stringového výstupního datumu pro ekoDate (YYYYMMDD).
         * @param {string} [options.name=DenMesicRok] Společná část názvu políček. Jednotlivá políčka mají v názvu ještě navíc "Den", "Mesic", nebo "Rok".
         * @param {string} [options.label=null] Popis políčka. Výchozí popis se skládá z použitých políček.
         * @param {object} [options.rangeDay={}] Rozsah hodnot dne.
         * @param {number} [options.rangeDay.minValue=1] Minimální možná hodnota dne.Minimální hodnota uživatelsky nastavitelného dne.
         * @param {number} [options.rangeDay.maxValue=31] Maximální možná hodnota dne.
         * @param {number} [options.rangeDay.selectableMinValue=null] Minimální uživatelsky nastavitelná hodnota dne.
         * @param {number} [options.rangeDay.selectableMaxValue=null] Maximální uživatelsky nastavitelná hodnota dne.
         * @param {object} [options.rangeMonth={}] Rozsah hodnot měsíce.
         * @param {number} [options.rangeMonth.minValue=1] Minimální možná hodnota měsíce.
         * @param {number} [options.rangeMonth.maxValue=13] Maximální možná hodnota měsíce.
         * @param {number} [options.rangeMonth.selectableMinValue=null] Minimální uživatelsky nastavitelná hodnota měsíce.
         * @param {number} [options.rangeMonth.selectableMaxValue=null] Maximální uživatelsky nastavitelná hodnota měsíce.
         * @param {object} [options.rangeYear={}] Rozsah hodnot roku.
         * @param {number} [options.rangeYear.minValue=1950] Minimální možná hodnota roku.
         * @param {number} [options.rangeYear.maxValue=new Date().getFullYear()] Maximální možná hodnota roku.
         * @param {number} [options.rangeYear.selectableMinValue=null] Minimální uživatelsky nastavitelná hodnota roku.
         * @param {number} [options.rangeYear.selectableMaxValue=null] Maximální uživatelsky nastavitelná hodnota roku.
         * @param {object} [options.width={}] W-Šířka jendotlivých políček (1-12). Pokud není nastavena, pak se spočítá dle použitých políček.
         * @param {number} [options.width.day=undefined] W-Šířka políčka dne (1-12).
         * @param {number} [options.width.month=undefined] W-Šířka políčka měsíce (1-12).
         * @param {number} [options.width.year=undefined] W-Šířka políčka roku (1-12).
         * @param {string} [options.pathInModel=null] Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})
         * @param {object} [options.fieldOptions={ "dropdown": true }] Parametry všech použitých políček.
         * @param {object} [options.dayFieldOptions={}] Parametry políčka dne.
         * @param {object} [options.monthFieldOptions={}] Parametry políčka měsíce.
         * @param {object} [options.yearFieldOptions={}] Parametry políčka roku.
         *
         * @returns {gform.section.rows} Řádek s políčky prefabu formuláře.
         */
        denMesicRok: function (options) {
         //* @param {object} options.range AAA.
         //* @param {date} options.range.minValue AAA.
         //* @param {date} options.range.maxValue AAA.
            var defaultOptions = {
                ekoDate: false,
                fields: [
                    "day",
                    "month",
                    "year"
                ],
                //range: {
                //    "minValue": undefined,
                //    "maxValue": undefined
                //},
                rangeDay: {
                    "minValue": 1,
                    "maxValue": 31,
                    "selectableMinValue": null,
                    "selectableMaxValue": null
                },
                rangeMonth: {
                    "minValue": 1,
                    "maxValue": 13,
                    "selectableMinValue": null,
                    "selectableMaxValue": null
                },
                rangeYear: {
                    "minValue": 1950,
                    "maxValue": new Date().getFullYear(),
                    "selectableMinValue": null,
                    "selectableMaxValue": null
                },
                width: { },
                label: null,             // Label řádku. 
                name: "DenMesicRok",               // Jméno řádku, to samé jmeno se použije jako jmenou fieldu s příponou  Start/End
                pathInModel: null,              // Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
                output: "object",        // object, string, singleValues
                fieldOptions: {
                    "dropdown": true
                },
                dayFieldOptions: { },
                monthFieldOptions: { },
                yearFieldOptions: { }
            };

            options.fieldOptions = $.extend({}, defaultOptions.fieldOptions, options.fieldOptions);
            options.rangeDay = $.extend({}, defaultOptions.rangeDay, options.rangeDay);
            options.rangeMonth = $.extend({}, defaultOptions.rangeMonth, options.rangeMonth);
            options.rangeYear = $.extend({}, defaultOptions.rangeYear, options.rangeYear);
            var mergedOptions = $.extend({}, defaultOptions, options);

            if (!mergedOptions.fields.length) {
                console.warn('jres:32110013'); //RC 32110013 : Prefab políčka Den, měsíc, rok nemá nadefinované "options.fields" a tak se nezobrazí.
                return; 
            }

            // "Přeložení" políček pro použití volání s anglickými i českými názvy bez nutnosti přepisovat kód.
            for (var i = 0; i < mergedOptions.fields.length; i++) {
                mergedOptions.fields[i] = mergedOptions.fields[i].replace("day", "den");
                mergedOptions.fields[i] = mergedOptions.fields[i].replace("month", "mesic");
                mergedOptions.fields[i] = mergedOptions.fields[i].replace("year", "rok");
            }

            return _denMesicRokCreate.call(this, mergedOptions);
        }
    });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\gnumIntervalRok.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.gcisloRok.js                           </Name>
//    <Description> Prefab Číselného intervalu a výběru roku.                   </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-09-15                                                  </Created>
//  </FileHeader>



(function ($) {
    "use strict";

    var _numIntervalRok = function (userOptions) {
        /// <summary>
        /// Základní funkce pro vytvoření dvou políček rok měsíc
        /// </summary>
        /// <param name="options" type="obj">
        /// &#10;label: ""              //  (string)  label řádku 
        /// &#10;name: []               //  (string)  name řádku, použije se i jako name filedu s příponou 
        /// &#10;pathInModel: ""        //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
        /// &#10;roky []                //  (pole)    pro jiné rozmezí let než default
        /// </param>
        /// <returns type="[rows]"></returns>

        var defOptions = {
            label: "Num interval rok",             // Label řádku. //RC 31910004 : 
            name: "numIntervalRok",               // Jméno řádku, to samé jmeno se použije jako jmenou fieldu s příponou  Start/End
            pathInModelInterval: null,      // Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
            pathInModelRok: null,           // Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"}) 
            roky: null,                     // pole roků
            type: "string",

            customOptField1: null,   // rozšiřující option srart políčka
            customOptField2: null,    // rozšiřující option end políčka
            customOptField3: null,    // rozšiřující option end políčka
            customOptAll: null
        };
        var options = $.extend({}, defOptions, userOptions); // vytvořím options

        options.pathInModelInterval = options.pathInModelInterval || options.name + "Interval";
        options.pathInModelRok = options.pathInModelRok || options.name + "Rok";

        if (options.roky == null) {
            options.roky = [];
            for (var i = 1950; i < 2050; i++) {
                options.roky = options.roky.concat([i]);
            }
        }

        var intervalOpt = {
            name: options.name + "Interval",
            type: "number",
            pathInModel: options.pathInModelInterval,
            defaultSize: "w-4",
        };
        // pokud je zadán rozsah intervalu vytvořím validátor
        if (options.rozsahIntervalu) {
            var validator = [new Gordic.Validators.Range({ min: options.rozsahIntervalu.start, max: options.rozsahIntervalu.end, message: "jres:31910018" + " ( " + (options.rozsahIntervalu.start || "x") + " - " + (options.rozsahIntervalu.end || "x") + " )" })];  //RC 31910018 : Hodnota je mimo dovolený rozsah
            // první field
            if (options.customOptField1 && options.customOptField1.validators) {
                options.customOptField1.validators = options.customOptField1.validators.concat(validator);
            }
            else if (options.customOptField1) {
                options.customOptField1.validators = validator;
            } else {
                options.customOptField1 = {};
                options.customOptField1.validators = validator;
            }

            // druhy field
            if (options.customOptField2 && options.customOptField2.validators) {
                options.customOptField2.validators = options.customOptField2.validators.concat();
            }
            else if (options.customOptField2) {
                options.customOptField2.validators = validator;
            } else {
                options.customOptField2 = {};
                options.customOptField2.validators = validator;
            }

        }

        intervalOpt.customOptFieldStart = options.customOptField1;   // rozšiřující option srart políčka
        intervalOpt.customOptFieldEnd = options.customOptField2;    // rozšiřující option end políčka


        var interval = Gordic.Gin.Prefabs.interval(intervalOpt);
        options.customOptField1 = interval[0].fields[0];//
        options.customOptField2 = interval[0].fields[1];
        var optField3 = {
            name: options.name + "Rok",
            data: new Gordic.Data.View(options.roky),
            model: options.pathInModelRok + "=value",
            modelValueTransform: {
                apply: function (modelValue) {
                    if (modelValue) {
                        var rok = parseInt(modelValue);
                        return rok;
                    }
                    return null;
                },
                collect: function (fieldValue) {
                    if (fieldValue) {
                        if (options.type === "number") {
                            return fieldValue;
                        } else {
                            return fieldValue.toString();
                        }
                    }
                    return null;
                }
            }
        };
        if (options.customOptField3) {
            options.customOptField3 = $.extend({}, optField3, options.customOptField3);
        } else {
            options.customOptField3 = optField3;
        }
       


        return _numIntervalRokCreate(options);
    };
    var _numIntervalRokCreate = function (options) {
        var FormnumIntervalRok = new Gordic.Forms
            .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
            .addSection().addRow(options.label)
            // nepoužito Tomášova zkratka protože nefungovala ale vím proč ;-) až přijde tak mu to řeknu
            //.addPrefab(options.customOptField1, "fields")

            // první field intervalu
            .addField(options.customOptField1.widget, options.customOptField1.layout, {
               
            },
            options.customOptField1.options
        )

            //druhý field intervalu
            .addField(options.customOptField2.widget, options.customOptField2.layout, {

            },
            options.customOptField2.options
            )
            // Rok
            .addField("gselectbox", "w-4", {
                dropdown: true,
            },
            options.customOptField3
            )
            ;
        
        return FormnumIntervalRok.form.sections["0"].rows;
    };


    namespace("Gordic.Gin.Prefabs", {
        numIntervalRok: function (options) {
            /// <summary>
            /// základní funkce pro vytvoření dvou políček rok měsíc
            /// </summary>
            /// <param name="options" type="obj">
            /// &#10;label: ""                  //  (string)  label řádku 
            /// &#10;name: []                   //  (string)  name řádku, použije se i jako name filedu s příponou 
            /// &#10;pathInModelInterval: ""    //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
            /// &#10;pathInModelRok: ""         //  (string)  cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu, kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})  
            /// &#10;roky []                    //  (pole)    pro jiné rozmezí let než default
            /// &#10;type: ""                   //  (string)  typ políčka  
            /// &#10; options.rozsahIntervalu.start
            /// &#10; options.rozsahIntervalu.end
            /// </param>
            /// <returns type="[rows]"></returns>
            var defOptions = {
                type: "string"
            };
            var finalOptions = $.extend({}, defOptions, options);
            return _numIntervalRok(finalOptions);
        },

    });

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\gmemorySelectbox.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.gmemorySelectbox.js                    </Name>
//    <Description> gPrefab pro selextbox na pamatování stringu                 </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>


(function ($) {
    "use strict";
    var that = null;

    // prefab dvou políček ---------------------------------------------------------------------------------------------

    var _doplNovouHodnotuDoGstore = function (value, optionsfn) {

        if (optionsfn.staticData && optionsfn.staticData.length > 0) { // pokud je hodnota ze staických tak neukládám
            var valueIsStatic = false;
            var statArray = _prevedStaticDataNaKorektni(optionsfn.staticData);
            for (var i = 0; i < statArray.length; i++) {
                if (statArray[i].data === value) { valueIsStatic = true; }
            }
            if (valueIsStatic) {
                if (optionsfn.rememberLast) {
                    _setLastValue(value, optionsfn);
                }
                return;
            }
        }

        var actual = optionsfn.userSettings.get(optionsfn.pathInGstor + ".data") || [];  //načtení aktualního výběru z usersettings
        var nalezen = false;
        for (var i = 0; i < actual.length; i++) {   // kontrola zda se jiz v uložisti nalézá stejný řetězec, pokud ano, zvednu datum posledního použití a zvednu počet použití
            if (actual[i][0] === value) {
                nalezen = true;
                actual[i][1] = new Date;
                actual[i][2] = actual[i][2] + 1;

            }
        }
        if (nalezen === false) { // poud se aktualni hodnota v poli nenachazi, vlozim ji s aktualnim pouzitim a poctem vyskytu 1
            actual.push([value, new Date, 1]);
        }
        if (actual.length > optionsfn.countOfRemembered) { //Zde promazu pole, tak aby v obsahovalo maximální počet povolených hodnot
            //najdu nejstarší
            actual.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b[1]) - new Date(a[1]);
            });
            actual = actual.slice(0, optionsfn.countOfRemembered);
        }

        optionsfn.userSettings.set(optionsfn.pathInGstor + ".data", {}); // smazu puvodni hodnotu v usersettings(nyní už se možná nemusí, byla to občurka)
        optionsfn.userSettings.set(optionsfn.pathInGstor + ".data", actual); // ulozim upravene pole do usersettings

        if (optionsfn.rememberLast) {
            _setLastValue(value, optionsfn)
        }
    };

    var _vymazHodnotyVGstore = function (field, optionsfn) {
        optionsfn.userSettings.set(optionsfn.pathInGstor + ".data", {});
        optionsfn.userSettings.set(optionsfn.pathInGstor + ".data", []);
        field.gfield("clearClientCache");
    };

    var _nactiDataZGstor = function (data, optionsfn) {
        var memoryArray = optionsfn.userSettings.get(optionsfn.pathInGstor + ".data") || [];
        var objArray = _prevedArrayOfArrayNaArrayOfObj(memoryArray);
        return objArray;
    };

    var _prevedArrayOfArrayNaArrayOfObj = function (arrayOfArray) {
        var objArray = [];
        for (var i = 0; i < arrayOfArray.length; i++) {
            objArray.push({ data: arrayOfArray[i][0], lastUse: arrayOfArray[i][1], count: arrayOfArray[i][2] });
        }
        return objArray;
    };

    var _getLastValue = function (optionsfn) {
        var last = optionsfn.userSettings.get(optionsfn.pathInGstor + ".last") || undefined;
        return last;
    };
    var _setLastValue = function (value, optionsfn) {
        optionsfn.userSettings.set(optionsfn.pathInGstor + ".last", value);
    };

    var _prevedStaticDataNaKorektni = function (array) {
        if (typeof array[0] !== "object") {
            var newObjArray = [];
            for (var i = 0; i < array.length; i++) {
                newObjArray.push({ data: array[i] });
            }
            return newObjArray;
        }
        return array;
    };
    var _prevedServerDataNastatic = function (array, optionsfn) {
        if (array && array.length > 0) {
            var newObjArray = [];
            for (var i = 0; i < array.length; i++) {
                if (array[i].vec != null) {
                    newObjArray.push(array[i].vec);
                } else if (array[i].duvod_pri_txt != null) {
                    newObjArray.push(array[i].duvod_pri_txt);
                } else if (optionsfn.serverDataKey != null && array[i][optionsfn.serverDataKey] != null) {
                    newObjArray.push(array[i][optionsfn.serverDataKey]);
                }
            }
            return newObjArray;
        }
        return array;
    };
    var _rozsirDataOPuvod = function (array, originUserSetting) {
        for(var i = 0; i < array.length; i++) {
            array[i].originUS = originUserSetting;
        }
        return array;
    };



    var _gmemorySelectbox = function (optionsinput) {
        /// <summary>
        /// základní funkce pro vytvoření dvou políček s intervalem
        /// </summary>
        /// <param name="options" type="obj">
        /// &#10;userSettings: ""              //  (gstor)  nějaký gstor
        /// &#10;name: ""                      //  (string)   name políčka
        /// &#10;type: ""                      //  (string)  typ políčka
        /// &#10;rememberLast: ""              //  (bool) zda ma vyplnovat do initial value poslední vyplňovanou hodnotu
        /// &#10;countOfRemembered: ""         //  (int) počet pamatovaných fieldu
        /// </param>
        /// <returns type="[rows]"></returns>

        var defOptions = {
            userSettings: null,
            name: null,
            type: "string",
            rememberLast: false,
            countOfRemembered: 10,
            staticData: null,
            srvNameSpace: null,
            srvServer: null,
            serverDataKey: null,  // klíč pod kterým bude načítat stringy v objektu který se vrátil ze serveru
            showTrash: true,

            //change: null

        };
        var options = $.extend({}, defOptions, optionsinput); // vytvořím options
        if (options.name && options.userSettings) {
            options.pathInGstor = "memoryField." + options.name;

            options.helperChoice = function (selectedFromHelper) {
                _doplNovouHodnotuDoGstore(selectedFromHelper.data, options);
                $(this).gfield("setValue", selectedFromHelper);
                $(this).gfield("clearClientCache");
            };

            options.helperCustomizer = function (data) {
                data.sort(function (a, b) { return b.count - a.count; });
                return data;
            };
            var getDataFromServer = function (fnoptions, content) {
                var defDataServer = $.Deferred();
                if (fnoptions.srvNameSpace && fnoptions.srvServer && (fnoptions.dataFromServer === undefined)) {
                    var cnt = null;
                    if (content != null && content.createServiceContent != null) {
                        cnt = content.createServiceContent(fnoptions.srvNameSpace);
                    } else {
                        cnt = new GContent(fnoptions.srvNameSpace);
                    }
                    
                    cnt.call(fnoptions.srvServer).done(function (data) {
                        fnoptions.dataFromServer = data;
                        if (data) {
                            defDataServer.resolve(data);
                        } else {
                            defDataServer.resolve(null);
                        }
                    }).always(function () { cnt.close(); });
                } else {
                    defDataServer.resolve(null);
                }

                return defDataServer.promise();
            };

            options.data = function (fastFilter) {
                fastFilter = this.value;
                var def = $.Deferred();
                var content = $.content(this);
                getDataFromServer(options, content).done(function (dataServer) {
                    //$(this).eq(0).closest(".gfield").gfield("clearClientCache");
                    var newData = _nactiDataZGstor([], options);
                    var newData = _rozsirDataOPuvod(newData, 1);
  
                    var finalArray = null;
                    if (dataServer && dataServer.length > 0) {
                        var statArrayServer = _prevedServerDataNastatic(dataServer, options);
                        if ((options.staticData === null) || (options.staticData.length === 0)) {
                            options.staticData = [];
                        }
                        options.staticData = options.staticData.concat(statArrayServer);
                    }
                    if (options.staticData && options.staticData.length > 0) {

                        var statArray = _prevedStaticDataNaKorektni(options.staticData);
                        var statArray = _rozsirDataOPuvod(statArray, 0);
                        finalArray = newData.concat(statArray);
                    }
                    var vysArr = finalArray || newData

                    def.resolve(new Gordic.Data.View(vysArr, { key: "data" }));
                });

                return def.promise();
            };

            options.helperItemTemplate = function (row) {
                var icoBaseClass = row.originUS == 0 ? 'fa-database' : 'fa-cog';
                var icoTooltip = row.originUS == 0 ? 'jres:26275149' : 'jres:26275150'; //RC 26275150 : Způsob uložení - dočasné úložiště (uživatelské nastavení)

                var iconBuilder = Gordic.Utils.IconBuilder.defaultInst.createIcon({ icon: icoBaseClass, customClass: "g-state-text gordic-gselectbox-disabled ui-state-disabled ui-disabled" });

                var result = '<span>' + htmlEncode(row.data) + '</span><span title="' + icoTooltip + '" class="pull-right">' + iconBuilder + '</span><span class="pull-right">' + ((row.count != null) ? (row.count + 'x') : "") + ' &nbsp;&nbsp;</span>';
                return result;
            };

            options.invalidTransform = function (strValue) {
                $(this).gfield("clearClientCache");
                if (strValue) {
                    _doplNovouHodnotuDoGstore(strValue, options);
                }

                return { data: strValue }; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
            };
            if (options.showTrash) {
                options.buttons = [
                    {
                        icon: 'fa-trash-o',
                        tooltip: "jres:26275151", action: new GAction({ //RC 26275151 : Odstraní zapamatované hodnoty z dočasného úložiště (uživatelského nastavení)
                            name: 'actClearMemoryField',
                            run: function (ev, ctx) {
                                _vymazHodnotyVGstore($(ctx.field), options);
                            }
                        })
                    }
                ];
                options.getLastValue = function (optionsfn) {
                    var lastValue = _getLastValue(optionsfn);
                    return lastValue != null ? { data: lastValue } : undefined;
                };
            }
        }
        else {
            // 04.09.2020 - TFeik
            // Memoryselectbox vrátí prázdný objekt místo null.
            console.error('gmemorySelectbox not works - name or userSettings in not defined.');
            return {};
        }

        switch (options.type) {

            case "string":
                return _createOptionsMemoryField("string", options);

        }

        // 04.09.2020 - TFeik
        // Memoryselectbox vrátí prázdný objekt místo null.
        console.error('gmemorySelectbox not works - unsuported type.');
        return {};
    };

    var _createOptionsMemoryField = function (boxTyp, optionsfn) {
        var opt = {};
 
        switch (boxTyp) {

            case "string":
                opt.strict = false;
                opt.name = optionsfn.name;
                opt.buttons = optionsfn.buttons;
                opt.helperChoice = optionsfn.helperChoice;
                opt.helperCustomizer = optionsfn.helperCustomizer;
                //opt.change = this.myChange;
                opt.invalidTransform = optionsfn.invalidTransform;
                opt.data = optionsfn.data;
                opt.helperItemTemplate = optionsfn.helperItemTemplate;
                opt.itemTemplate = "{data:encode}";
                opt.helperColumns = ["data"];
                opt.verificationNeeded = true;
                opt.showSelectButton = false;
                opt.doplNovouHodnotuDoHistorie = function (valueDoHistorie) { //$($0).gfield("option","doplNovouHodnotuDoHistorie")("testovaci doplneni Do historie")

                    _doplNovouHodnotuDoGstore(valueDoHistorie, optionsfn);
                }

                if (optionsfn.rememberLast) {
                    opt.initialValue = optionsfn.getLastValue(optionsfn);
                }
                break;
        }

        return opt;
    };

    namespace("Gordic.Gin.Prefabs", {
        gmemorySelectbox: function (options) {

            var defOptions = {};

            var finalOptions = $.extend({}, defOptions, options);
            return _gmemorySelectbox(finalOptions);
        }
    });

})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.WebClient\Gin\Gin\Prefabs\gintervalcontextbox.js 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.gintervalcontextbox.js					</Name>
//    <Description> Prefab rozšíření intervalboxu								</Description>
//    <Author>      thazmuka													</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-06-21                                                  </Created>
//  </FileHeader>

(function ($) {
	"use strict";

	//#region addDays

	/**
	 * přidat počet dní
	 */
	Date.prototype.addDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}

	//#endregion

	//#region removeDays

	/**
	 * odebrat počet dní
	 */
	Date.prototype.removeDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() - days);
		return date;
	}

	//#endregion


	/**
	 * získej rozsah
	 */
	var _getRange = function(cntPrefab){

		var gstore_pocet_dni = window.gstor.get("Global.Wfl.AppSettings.ListsSettings.PredplneniPoceDni");
		var range = cntPrefab.daysRange !== undefined ? cntPrefab.daysRange : gstore_pocet_dni === undefined ? 30 : gstore_pocet_dni;

		return range;
	}

	var _setContextMenu = function (cntPrefab, onChange, field) {

		/** hodnoty vytažené z gstoru */
		var value = cntPrefab.userSettings.get(cntPrefab.options.name);

		/** datum od */
		var start = value.date.start;
		/** datum do */
		var end = value.date.end;

		//#region Vždy předvyplnit posledních {0} dní

		if (value.btnPreFillTwo === true) {

			// rozsah - použit v pořadí:
			// 1. uživ.rozsah
			// 2. rozsah daný parametrem
			// 3. defaultní rozsah

			var range = _getRange(cntPrefab);

			// nastavení start a end data
			start = new Date();
			end = new Date();

			// odebrat určitý počet dnů
			start = start.removeDays(range);
		}

		//#endregion

		//#region Předplnit 'Datum Do' aktuálním datem

		else {

			// konverze do Date typu
			if (typeof start === "string") {
				start = new Date(start);
			}

			if (value.btnPreFillOne === true) {
				end = new Date();
			}

		}

		//#endregion

		if (onChange) {
			field.gfield("setValue", {
				start: start,
				end: end
			});
		}
		else {

			// nastavení inicializační hodnoty

			//cntPrefab.options.modelValueTransform = {
			//	apply: function (value) {

			//		if ((value.start === null) && (value.end === null)) {
			//			$(this).gfield("setValue", {
			//				start: start,
			//				end: end
			//			});
			//		}
			//		else {
			//			$(this).gfield("setValue", value);
			//		}
			//		return;
			//	},
			//}

			cntPrefab.options.initialValue = {
				start: start,
				end: end
			}

		}


		// nasetování ikon do menu
		var btnPreFillOneIcon = value.btnPreFillOne ? "fa-check-circle" : "fa-circle";
		var btnPreFillTwoIcon = value.btnPreFillTwo ? "fa-check-circle" : "fa-circle";

		cntPrefab.btnPreFillOne.update({ icon: btnPreFillOneIcon });
		cntPrefab.btnPreFillTwo.update({ icon: btnPreFillTwoIcon });

	}

	var _numIntervalRok = function (optionsInput) {

		var cntPrefab = {};

		cntPrefab.options = {};
		cntPrefab.options.name = optionsInput.name;
		cntPrefab.userSettings = optionsInput.userSettings;
		cntPrefab.daysRange = optionsInput.daysRange;
		cntPrefab.daysRangeMax = optionsInput.daysRangeMax;

		//#region nastavení daysRangeMax

		if (cntPrefab.daysRangeMax !== undefined) {
			// uživatelský rozsah
		}
		else {
			// defaultní - uživatelský nebyl zadán
			cntPrefab.daysRangeMax = 30;
			console.log("Byl zadán defaultní rozsah 'daysRangeMax' na 30 dní.");
		}

		//#endregion

		_createButtons(cntPrefab);

		_setStates(cntPrefab);

		_change(cntPrefab);

		cntPrefab.options.userSettings = cntPrefab.userSettings;

		// datum dnes
		var today = new Date();

		// nastavení min. a max. hodnoty políčka
		cntPrefab.options.minValue = today.removeDays(cntPrefab.daysRangeMax);
		cntPrefab.options.maxValue = today.addDays(cntPrefab.daysRangeMax);

		return cntPrefab.options;

	};

	//#region nastavení stavů

	var _setStates = function (cntPrefab) {

		// první field v contextmenu
		cntPrefab.btnPreFillOne = cntPrefab.options.buttons["0"].children["3"].action;
		cntPrefab.btnPreFillTwo = cntPrefab.options.buttons["0"].children["5"].action;

		var value = cntPrefab.userSettings.get(cntPrefab.options.name);

		// gstore není definován
		if ((value === undefined) || (value.date === null)) {

			// nastavení ikony
			cntPrefab.btnPreFillOne.update({ icon: "fa-check-circle" });

			// uložení hodnot contextmenu fieldu do gstoru
			cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillOne", true);
			cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillTwo", false);

			// nastavení datumu
			var end = new Date();
			var start = end.removeDays(30);

			// nastavení inicializační hodnoty
			cntPrefab.options.initialValue = {
				start: start,
				end: end
			}

			// uložení hodnot 'datumu'
			cntPrefab.userSettings.set(cntPrefab.options.name + ".date", {
				start: start,
				end: end
			});

		}
		else {
			_setContextMenu(cntPrefab, false);
		}

	}

	//#endregion

	//#region změna políčka

	var _change = function (cntPrefab) {

		cntPrefab.options.change = function (ev, obj) {

			// výchozí prázdná hodnota
			var value = null;
			// hodnota datumu není prázdná
			if (obj.value !== null) {
				value = {
					start: obj.value.start,		// od
					end: obj.value.end			// do
				}
			}
			// uložení hodnoty do gstoru
			cntPrefab.userSettings.set(cntPrefab.options.name + ".date", value);
		}

	}

	//#endregion

	/**
	 * získání, uložení hodnot tlačítek v contextmenu do userSettingu
	 *
	 * @param {any} cntPrefab global this
	 * @param {any} that button this
	 */
	var getSetValueInUserSetting = function (cntPrefab, that, buttonName) {

		// získání předešlé(aktuální) hodnoty z gstoru
		var value = cntPrefab.userSettings.get(cntPrefab.options.name + "." + buttonName);
		// uložení do gstoru inverzní hodnotu
		cntPrefab.userSettings.set(cntPrefab.options.name + "." + buttonName, !value);

		// update ikony
		that.update({
			icon: value ? "fa-circle" : "fa-check-circle"
		});

	}

	//#region vytvořit tlačítka

	var _createButtons = function (cntPrefab) {

		let daysRange = cntPrefab.daysRangeMax;


		// nad 365 dní - zobrazit na roky

		// pod 365 dní - zobrazit na dny

		// v případě hodnoty, která má zbytek, nechat výsledek ve dnech


		var today = new Date();

		var end = moment(today.addDays(cntPrefab.daysRangeMax)).format('l');
		var start = moment(today.removeDays(cntPrefab.daysRangeMax)).format('l');


		cntPrefab.options.buttons = [
			{
				type: "static",
				icon: "gi-menu",
				children: [

					//#region Ode dneška na {0} dní

					{
						action: new GAction({
							name: "btnDaysFromToday",
							caption: "jres:32000004 " + end, //RC 32000004 : Ode dneška do
							run: function (ev, ctx) {

								var date = new Date();

								ctx.field.gfield("setValue", {
									start: date,
									end: date.addDays(cntPrefab.daysRangeMax)
								});


							}
						})
					},

					//#endregion

					//#region Do dneška na {0} dní

					{
						action: new GAction({
							name: "btnDaysToToday",
							caption: "jres:32000005 " + start, //RC 32000005 : Do dneška od
							run: function (ev, ctx) {

								var date = new Date();

								ctx.field.gfield("setValue", {
									start: date.removeDays(cntPrefab.daysRangeMax),
									end: date
								});

							}
						})
					},

					//#endregion

					{
						type: "separator"
					},

					//#region Předplnit datum do aktuálním datem

					{
						action: new GAction({
							icon: "fa-circle",
							name: "btnPreFillOne",
							caption: "jres:32000001",									//RC 32000001 : Předplnit "datum do" aktuálním datem
							run: function (ev, ctx) {

								var field = ctx.field;

								// získání předešlé(aktuální) hodnoty z gstoru
								var value = cntPrefab.userSettings.get(cntPrefab.options.name + ".btnPreFillOne");
								// uložení do gstoru inverzní hodnotu
								cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillOne", !value);

								// update ikony
								this.update({
									icon: value ? "fa-circle" : "fa-check-circle"
								});

								_setContextMenu(cntPrefab, true, field);

							}
						})
					},

					//#endregion

					{
						type: "separator"
					},

					//#region Vždy předvyplnit posledních {0} dní

					{
						action: new GAction({
							icon: "fa-circle",
							name: "btnPreFillTwo",
							caption: "jres:32000002 " + cntPrefab.daysRange + " jres:32000003",		// Vždy předvyplnit posledních {0} dní
							run: function (ev, ctx) {

								var field = ctx.field;

								// získání předešlé(aktuální) hodnoty z gstoru
								var value = cntPrefab.userSettings.get(cntPrefab.options.name + ".btnPreFillTwo");
								// uložení do gstoru inverzní hodnotu
								cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillTwo", !value);

								// update ikony
								this.update({
									icon: value ? "fa-circle" : "fa-check-circle"
								});

								_setContextMenu(cntPrefab, true, field);


							}
						})
					}

					//#endregion
				]
			}
		];

	}

	//#endregion

	namespace("Gordic.Gin.Prefabs", {

		/**
		 * intervalcontextbox
		 */
		intervalContextBox: function (options) {

			return _numIntervalRok(options);
		}

	});

})(jQuery);

//#endregion

