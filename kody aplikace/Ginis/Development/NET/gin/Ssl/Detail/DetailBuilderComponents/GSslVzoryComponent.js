(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslVzory: {

            create: function (content,componentDto) {
                var result = {
                    onBuild: [
                        function () {
                         
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                     
                        //#region akce

                        sslVzory_createTemplateGridFormat: function () {//příprava gridformatu pro gcomparator
                            var promis = $.Deferred();

                            var format = Gordic.Ssl.GSslCommonDlg.getGridColumnSSLVzory();
                            // na tyto definice gridFormatů, které jsou použity ve více scriptech je dobré mít nějaký script "globals.js", a tyto společné funkce do něj střádat.

                           var formMappings = {};
                            //header
                            formMappings["AktZnacka"] = "Znacka";
                            formMappings["Cj"] = "CjSpis"; //  spiss
                            formMappings["CjExt"] = "CjExt";
                            formMappings["Nazev"] = "Vec";

                            formMappings["DatPrijPod"] = "DatPrijPod";//  spis
                            formMappings["ZnackaOdes"] = "ZnackaOdes";//  spis

                            formMappings["CjZn"] = "CjZn";
                            formMappings["PorSpis"] = "PorSpis";
                            formMappings["TypAgTxt"] = "Agenda";
                            formMappings["ExtId"] = "ExtId";
                            
                            //formMappings["NazevSchval"] = "IxsFunSchval";//  spis
                            //formMappings["NazevResitel"] = "IxsFunResitel";
                            //formMappings["IxsFunAktText"] = "IxsFunAkt";

                            //profil
                            //formMappings["EsuText"] = "Odesilatel";
                            formMappings["MistoVzniku"] = "MistoVzniku";
                            formMappings["ObsahText"] = "VecPodrobne";
                            formMappings["Poznamka"] = "Poznamka";
                            formMappings["IxstTypText"] = "IxsTyp";
                            //formMappings["UmisteniText"] = "Umisteni";
                            //formMappings["SpisPl"] = "SpisPl";
                            //formMappings["SpisZnak"] = "SpisZnak";
                            formMappings["StUtajIdWflText"] = "StUtajIdWfl";
                            formMappings["DatPodano"] = "DatPodano";
                            formMappings["DatEvidovano"] = "DatEvidovano";
                            formMappings["DatVyrizeno"] = "DatVyrizeno";

                            promis.resolve({ format: format, formMappings: formMappings });
                            return promis.promise();
                        },
                        
                        //funkce pro vybudování vzorů pomocí widgetu gcomparator
                        sslVzory_buildTemplate: function (data) {
                            var that = this;
                            var panel = this.element.gsidebar("getPanel", "sslVzory");
                            if (panel) { 
                                var comparator = panel.hasClass("gcomparator") ? panel : null;
                                if (comparator == null || comparator.length == 0) {
                                    
                                    that.sslVzory_createTemplateGridFormat().done(function (tgformat) {
                                        panel.height("100%")
                                            .gcomparator({
                                                items: data.length != null ? data : [data], //pole DTO objektů
                                                columns: tgformat.format, //Grid format
                                                formMappings: tgformat.formMappings,
                                                watchForHighlight: that.element, // element, na kterém se odchytává .gfield focus - umožní označování řádků
                                                clickable: (that.EditMode || (that.RezimPodani != null && that.RezimPodani != 0)), // umožnit klikací režim
                                                //2.11.2022 - vmaca - použití setValue místo defaultního modelApply - ale nevím proč, když modelApply funguje dobře, ale toto nefunguje ... proto zakomentovávám
                                                //formApply: function (dto, columnFormat) {
                                                //    const fieldName = columnFormat.field == null ? columnFormat.name : columnFormat.field;
                                                //    var activeFields = this.watchForHighlight.findFields(tgformat.formMappings[fieldName] ?? fieldName);
                                                //    if (!activeFields.gfield("option", "disabled")) { //pokud se do fieldů dá zadávat
                                                //        activeFields.gfield("setValue", columnFormat.cellTemplate.render(dto), false);//model-apply se nepodařil, zkusit přes setValue
                                                //        activeFields.first().gfield("focus");
                                                //    }
                                                //},
                                                itemremove: function (ev, obj) {
                                                    if (obj && obj.item && obj.item.Ixp) {
                                                        that.sslVzory_removeUsersettings(obj.item.Ixp);
                                                    }
                                                }
                                            });
                                        //panel.element.addHelpContext('vzory');
                                    });

                                } else if (data != null) { //comparator už existuje -> přidávat položky
                                    
                                    comparator.gcomparator("addItems", data.length != null ? data : [data]);
                                }
                                this.sslVzoryPridejDoLastPole(data);
                            }

                        },
                        sslVzory_ReadDetails: function (arrayWithIxp) {
                            var that = this;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            //var resultData = [];
                            //var promises = [];
                            var arrOnlyStr = [];
                            for (var i = 0; i < arrayWithIxp.length; i++) {
                                arrOnlyStr.push(arrayWithIxp[i].ixp);
                            }

                            srv.call("GetSslDetailVzory", { ixpList: arrOnlyStr })
                                .done(function (resultData) {
                                    
                                    //resultData.push(detailDto); //push($.extend(data, detailDto)
                                    that.sslVzory_buildTemplate(resultData);

                                }).always(function () { srv.close(); });
                           
                         
                            //$.when.apply(null, promises)
                            //    .then(function () {
                            
                            //        that.sslVzory_buildTemplate(resultData);
                            //    });
                        },
                    

                        //#endregion
                        sslVzory_enables: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            //this.actions.actAddVyrizDok.update({ enabled: l_bActionEnabled });
                        },
                        sslVzoryPridejDoLastPole: function (data) {

                            if (!Array.isArray(data)) {
                                data = [data];
                            }
                            var newData = [];
                            for (var i = 0; i < data.length; i++) {
                                newData.push(data[i].Ixp);
                            }

                            // uložení více vzoru
                            var storedData = this.userSettings.get("sslVzory.last") || [];

                            var vys = storedData.concat(newData);
                            var finalToSave = vys.concat();
                            for (var i = 0; i < finalToSave.length; ++i) {
                                for (var j = i + 1; j < finalToSave.length; ++j) {
                                    if (finalToSave[i] === finalToSave[j])
                                        finalToSave.splice(j--, 1);
                                }
                            }
                            finalToSave = finalToSave.slice(-10); // veme posledních 10
                            
                            this.sslVzory_setUsersettings(finalToSave); //newData
                        },
                        sslVzory_removeUsersettings: function (removedIxp) {
                            var storedData = this.userSettings.get("sslVzory.last") || [];
                            for (var i = 0; i < storedData.length; ++i) {
                                if (storedData[i] === removedIxp)
                                    storedData.splice(i--, 1);
                            }
                            this.sslVzory_setUsersettings(storedData);
                        },
                        sslVzory_removeAll: function () {
                            // vymazání panelu
                            var panel = this.element.gsidebar("getPanel", "sslVzory");
                            if (panel && panel.length > 0) {
                                var comparator = panel.hasClass("gcomparator") ? panel : null;
                                if (comparator != null && comparator.length > 0) {
                                    comparator.gcomparator("clear");
                                }
                            }

                            // vymazání zapamatovaných
                            this.sslVzory_setUsersettings([]);
                        },
                        sslVzory_setUsersettings: function (data) {
                            this.userSettings.set("sslVzory.last", data);
                        },

                         
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        actSelectTemplate: { //selector pro vzory
                            caption: "jres:31937105", //RC 31937105 : Přidat vzor
                            icon: "gi-plus",
                            tooltip: "jres:31937301".format(10), //RC 31937301 : Přidá vzor do kolekce. (zapamatováno maximálně {0} posledních přidaných vzorů)
                            run: function (ev, ctx) {
                                var actThis = this;

                                actThis.content.hledatIdentDokSpi(function (retVal) {
                                    //retVal.ixp
                                    if (retVal.ixp) {
                                        var arrayWithIxp = [{ ixp: retVal.ixp }];
                                        actThis.content.sslVzory_ReadDetails(arrayWithIxp);

                                    }
                                });

                            }
                        }

                    },

                    //přidání záložky do pravého panelu
                    sidePanels: {
                        sslVzory: {
                            side: "right",
                            leaf: "jres:31937106", //RC 31937106 : Vzory
                            caption: "jres:31937106", //RC 31937106 : Vzory
                            icon:"gi-paper_vzory",
                            menuBar: ["actSelectTemplate*"],
                            open: function (ev, ctx) {
                               // vzory na vstupu detailu
                                var panel = content.element.gsidebar("getPanel", ctx.id);
                                if (panel != null) {
                                    panel.addHelpContext('PostraniPanelVzory');
                                }
                                
                                if (componentDto.VzoryArray && componentDto.VzoryArray.length > 0) {
                                    //var panel = content.element.gsidebar("getPanel", ctx.id); //21.08.2023 dsebesta posunuto nad if
                                    
                                    if (panel && !panel.hasClass("js-vzoryArrayAdded")) { // kontrola přidání statických vzoru
                                        var newArr = [];
                                        for (var itemIndex = 0, l = componentDto.VzoryArray.length; itemIndex < l; itemIndex++) {
                                            newArr.push({ ixp: componentDto.VzoryArray[itemIndex] });
                                        }
                                        panel.addClass("js-vzoryArrayAdded"); // přidám indikaci že už jsem přidal statické vzory 
                                        content.sslVzory_ReadDetails(newArr);
                                    }
                                }
                                // zapamatované vzory
                                var storedData = content.userSettings.get("sslVzory.last") || [];
                                if (storedData.length > 0) {
                                    var zapamatovaneArr = [];
                                    for (var itemIndex2 = 0, l = storedData.length; itemIndex2 < l; itemIndex2++) {
                                        zapamatovaneArr.push({ ixp: storedData[itemIndex2] });
                                    }
                                    content.sslVzory_ReadDetails(zapamatovaneArr);
                                }
                            } 
                        }
                    }
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);