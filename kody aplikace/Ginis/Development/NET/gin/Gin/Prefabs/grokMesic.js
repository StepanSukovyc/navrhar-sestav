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