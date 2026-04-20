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