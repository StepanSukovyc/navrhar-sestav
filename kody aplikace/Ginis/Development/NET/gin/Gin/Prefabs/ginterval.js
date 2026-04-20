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