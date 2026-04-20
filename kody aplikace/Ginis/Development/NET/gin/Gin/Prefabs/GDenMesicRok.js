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