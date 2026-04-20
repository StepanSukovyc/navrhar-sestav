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