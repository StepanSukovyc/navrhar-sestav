(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {

        WflSKform: {
            create: function (componentDto) {
                var result = {
                    onBuild: [
                        function () {
                            var that = this;
                            this.enableWflSkForm();
                            this.wflSkFormZkontrolujHlasku();
                            //this.find(".gtabmanager").on("gtabmanageropen", function (ev, ctx) {
                            //    if (ctx.id === "tgGfrm") {
                            //        //that.opravZarovnaniSKForm();
                            //        that.find("*[data-param-id='WflGfrm']").gtab("open");
                            //    }
                            //});
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady


                        saveDataToGinisFromSkForm: function () {
                            var that = this;
                            var skContent = $.content(this.iframeDivSkForm);
                            var ret = skContent.SaveXmlAsReturn();
                            if (ret !== undefined && ret !== null) { 
                                this.vyresJmenoPrilohySFormularem(ret.fileName);
                                //servisa pro ukládání
                                if (this._contentSaveSKForm == null) {
                                    this._contentSaveSKForm = that.createServiceContent({
                                        className: "Gordic.Wfl.WebClient.GAttachmentService",
                                        serverParams: {
                                          //  Ixp: componentDto.ixp
                                        }
                                    });
                                }
                                var fileName = "Formular.xml";
                                //var data = this.getBytesFromXml(ret.xml);
                                var fd = new FormData();
                            
                                //fd.append("test", new Blob([ret.xml], { type: "text/xml" }), fileName);
                                var file = new GFile();
                                //application/vnd.gov.sk.xmldatacontainer+xml; charset=UTF-8
                                //application/vnd.gov.sk.xmldatacontainer+xdcf; charset=UTF-8
                                //application/x-eform-xml
                                file.chunkUpload(new Blob([ret.xml], { type: "application/vnd.gov.sk.xmldatacontainer+xml; charset=UTF-8" }), fileName).then(function (fileInfo) { //"text/xml"
                                    that._addSKFile(fileInfo[0], { isFavorite:true });
                                });
                            }
                            return ret;
                        },

                      
                        wflSkFormZkontrolujHlasku: function () {
                            if (componentDto.ChybovaHlaska) {
                                this.dialogs.warning(
                                    "jres:26227134", //RC 26227134 : Varování
                                    componentDto.ChybovaHlaska);
                            }

                        },

                        getBytesFromXml: function (stringXml) {
                            var data = null;
                            return data;
                        },

                        vyresJmenoPrilohySFormularem: function (newName) {
                            
                            if (this.tempSKFormPrilohaName == null) {
                                this.tempSKFormPrilohaName = newName;
                            }


                        },

                        vratAdekvatniJmenoSKForm: function (navrhovane) {

                            var vys = "";
                            if (this.tempSKFormPrilohaName != null) {

                                var splitedGeneratedName = navrhovane.split(".");
                                var splitedSKFormPrilohaName = this.tempSKFormPrilohaName.split(".");
                                splitedSKFormPrilohaName[splitedSKFormPrilohaName.length - 1] = splitedGeneratedName[splitedGeneratedName.length - 1];
                                var vyslednyNazev = splitedSKFormPrilohaName.join(".");
                                vys = vyslednyNazev;
                            } else {
                                vys =  navrhovane;
                            }
                            return vys;
                        },

                        opravZarovnaniSKForm: function () {
                    
                            var skContent = $.content(this.iframeDivSkForm);
                            var ret = skContent.resizeIframe();
                        },

                        poUlozeniSKFormu: function (data) {
                            this.tryReloadDetail(undefined, {
                                flashMessage: "jres:31926221", //RC 31926221 : Data formuláře byly úspěšně uloženy do příloh.
                                flashMessageClass: "g-state-success",
                            });
                        },

                        _addSKFile: function (fileInfo, customData) { //: Gordic.General.ApplicationInterface.GFileInfoDto
                            var that = this;
                            var isFavorite = false;

                            var coverMsg = "jres:26227268"; //RC 26227268 : Vkládá se elektronická příloha.

                            if (customData != null && customData.isFavorite != null) {
                                isFavorite = customData.isFavorite;

                                if (isFavorite) {
                                    coverMsg = "jres:26227267"; //RC 26227267 : Vkládá se elektronický obraz.
                                }
                            }

                            var porCislo = null;
                            //if (customData != null && customData.porCislo != null) {
                            //    porCislo = customData.porCislo;
                            //}

                            //jmeno pro soubor
                   
                            fileInfo.filename = this.vratAdekvatniJmenoSKForm(fileInfo.filename);
                         
                            this.beginOperation(coverMsg);
                         
                           // var opt = $.extend({}, { isFavorite: isFavorite, porCislo: porCislo });
                            this._contentSaveSKForm.call("CreateFromFileSK", { ixp: componentDto.ixp, isFavorite: isFavorite, porCislo: porCislo, ixb: null, fileInfo: fileInfo })
                                .done(function (data) {
                                    that.poUlozeniSKFormu(data);
                                })
                                .always(function () {
                                    that.endOperation();
                                });

                        },

                        _vytvorSKForm: function (typeOfEform,novaData) {
                            var that = this;;
                            var options = {
                                ixs_fsk: componentDto.ixs_fsk,
                                typeOfEform: typeOfEform
                            };
                            
                            if (novaData) { // nová data
                                options.xmlDataBase64 = novaData;
                            }
                            else if (componentDto.fileDataBase64) { // pokud již nějalé data pro form jsou v příloze tak nastavím.
                               options.xmlDataBase64 = componentDto.fileDataBase64;
                            }
                            if (this.iframeDivSkForm != null) {
                                this.iframeDivSkForm.remove();
                            }
                            this.iframeDivSkForm = $("<div>");
                           // style='position: relative;'
                            this.iframeDivSkForm.appendTo(that.wflSKFormTab);
                            this.iframeDivSkForm.gcontent([Gordic.Wfl.WebClient.GEformSK, { inputOpt: options }]);
                            this.iframeDivSkForm.on("gtabopen", function () {
                              
                                $(that.iframeDivSkForm).resizeIframe();
                                //$.that(that.iframeDivSkForm).resizeIframe();
                            });
                            this.wflSKFormTab.on("gtabopen", function () {
                             
                                $.content(that.iframeDivSkForm).resizeIframe();
                                //$.that(that.iframeDivSkForm).resizeIframe();
                            });

                        },
                        editovatFormular: function () {
                            var that = this;
                            if (this.aktualneSeEditujeSKForm) {
                                this.actions.actEditovatSKForm.update({ caption: "jres:31926626" }); //RC 31926626 : Editovat formulář
                                this.actions.actUlozDataZFormulare.update({ enabled: false });
                                this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: false });
                                this.aktualneSeEditujeSKForm = false;
                                this._vytvorSKForm(20);
                            }
                            else {
                               
                                this.actions.actEditovatSKForm.update({ caption: "jres:31926627" }); //RC 31926627 : Zrušit editaci
                                this.actions.actUlozDataZFormulare.update({ enabled: true });
                                this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: true });
                                this.aktualneSeEditujeSKForm = true;
                                this._vytvorSKForm(10);
                            }
                            

                        },

                        predplnitZDokumentuSkComponent: function () {
                            var that = this;
                            var srv = this.createServiceContent("Gordic.Wfl.WebClient.GAttachmentService"); 
                            this.beginOperation();
                            var opt = {
                                Ixs_fsk: componentDto.ixs_fsk,
                                XmlDataBase64: componentDto.fileDataBase64 != null ? componentDto.fileDataBase64 : null,
                                Ixp: componentDto.ixp
                            };

                            srv.call("NaplnitSkForm", opt)
                                .then(function (retVal) {
                                    if (retVal) {
                                        //that.fileDataBase64String = retVal;
                                        that._vytvorSKForm(10, retVal);
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                })
                                ;
                        },

                        enableWflSkForm: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                        
                            var lzeEditovatForm = true;
                            if (!l_bActionEnabled || !componentDto.lzeEditovat) {
                                lzeEditovatForm = false;
                            }

                            this.actions.actEditovatSKForm.update({ enabled: lzeEditovatForm });
                            this.actions.actGenerovatSkPdfAPridatDoPriloh.update({ enabled: l_bActionEnabled && componentDto.lzeEditovatPrilohy });
                            
                            this.aktualneSeEditujeSKForm = false;
                        },
                        showSimpleHtml: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var lzeEditovatForm = true;
                            if (!l_bActionEnabled || !componentDto.lzeEditovat) {
                                lzeEditovatForm = false;
                             }

                             this.actions.actEditovatSKForm.update({ caption: "jres:31926628" }); //RC 31926628 : Editovat formulář
                             this.actions.actUlozDataZFormulare.update({ enabled: false });
                             this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: false });
                             this.actions.actEditovatSKForm.update({ enabled: lzeEditovatForm });
                             this.aktualneSeEditujeSKForm = false;
                             this._vytvorSKForm(0);
                        },
                        klasickeZobrazeni: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var lzeEditovatForm = true;
                            if (!l_bActionEnabled || !componentDto.lzeEditovat) {
                                lzeEditovatForm = false;
                            }

                            this.actions.actEditovatSKForm.update({ caption: "jres:31926628" }); //RC 31926628 : Editovat formulář
                            this.actions.actUlozDataZFormulare.update({ enabled: false });
                            this.actions.actPredplnitZDokumentuSkComponent.update({ enabled: false });
                            this.actions.actEditovatSKForm.update({ enabled: lzeEditovatForm });
                            this.aktualneSeEditujeSKForm = false;
                            this._vytvorSKForm(20);
                        },

                        generovatSkPdfAPridatDoPriloh: function () {

                            var that = this;
                            var data = null;
                            if (componentDto.fileDataBase64) {
                                data = componentDto.fileDataBase64;
                            }
                            var fileName = this.vratAdekvatniJmenoSKForm("Formulář" + ".pdf");
                            if (data) {
                                this.beginOperation();
                                var islOpt = {
                                    Ixs_fsk: componentDto.ixs_fsk,
                                    XmlDataBase64: data,
                                    Ixp: componentDto.ixp,
                                    FileName: fileName
                                };
                                Gordic.Isl.WflUPSR.vygenerujPDFZFormulare(islOpt).getData() //createEditableEform, createNoNEditableEform, createSimpleHtmlEform
                                    .done(function (retVal) {
                                        that.endOperation();
                                        that.poUlozeniSKFormu(data);
                                    }).fail(function () {
                                        that.endOperation();
                                    });
                            }
                        },

                        generovatSkPdf: function () {
                            var that = this;
                            var data = null;
                            if (componentDto.fileDataBase64) {
                                data = componentDto.fileDataBase64;
                            }
                            var fileName = this.vratAdekvatniJmenoSKForm("Formulář" + ".pdf");
                            //if (data) {
                                var callOpt = {
                                    Ixs_fsk: componentDto.ixs_fsk,
                                    XmlDataBase64: data,
                                    FileName: fileName
                                };
                                
                                this.beginOperation();
                                var srv = that.createServiceContent({ className: 'Gordic.Wfl.WebClient.GWflDetailUtils', params: {} });
                                srv.call('GnereovatPdfZSKForm', { inputDto: callOpt })
                                    .done(function (retVal) {
                                        if (retVal.Probehlo) { 
                                            that.stahniSouborPodleGuid(retVal.GUID);

                                        }

                                    })
                                    .always(function () {
                                        that.endOperation();
                                    });
                            //}
                        },

                        stahniSouborPodleGuid: function (guid) {

                            var f = new GFile();
                            var prom = f.download({ guid: guid });
                            prom.done(function() {
                                f.removeFile(guid);

                            });
                        },

                        otevriHistoriKonverzaceSkComponent: function () {
                            Gordic.Wfl.Dialogs.HistorieKonverzaceSKZpravDlg({
                                parentContent: this,
                                opt: {
                                    Dto: {
                                        ixb: componentDto.ixb_epod 
                                    },
                                    Ixp: componentDto.ixp,
                                    TypZobrazeni: 0
                                }
                            })

                        },

                        tiskObsahuIframe: function () {
                            var that = this;
                            var znacka = this.SslHeader_Dto.AktZnacka;
                            var datPodano = this.SslProfilDokument_Dto.DatPodano;

                            var skContent = $.content(this.iframeDivSkForm);
                            skContent.tiskObsahuIframe(znacka, datPodano);
                        }
                        /*
                        BASE64_MARKER : ';base64,',
                        convertDataURIToBinary:function(dataURI) {
                            var base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
                            var base64 = dataURI.substring(base64Index);
                            var raw = window.atob(base64);
                            var rawLength = raw.length;
                            var array = new Uint8Array(new ArrayBuffer(rawLength));

                            for (i = 0; i < rawLength; i++) {
                                array[i] = raw.charCodeAt(i);
                            }
                            return array;
                        },

                        base64ToByteArray:function(base64String) {
                            try {
                                var sliceSize = 1024;
                                var byteCharacters = atob(base64String);
                                var bytesLength = byteCharacters.length;
                                var slicesCount = Math.ceil(bytesLength / sliceSize);
                                var byteArrays = new Array(slicesCount);

                                for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                                    var begin = sliceIndex * sliceSize;
                                    var end = Math.min(begin + sliceSize, bytesLength);

                                    var bytes = new Array(end - begin);
                                    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                                        bytes[i] = byteCharacters[offset].charCodeAt(0);
                                    }
                                    byteArrays[sliceIndex] = new Uint8Array(bytes);
                                }
                                return byteArrays;
                            } catch (e) {
                                console.log("Couldn't convert to byte array: " + e);
                                return undefined;
                            }
                        }
                        */
                    },
                    actions: { //může být zadáno jako pole nebo jako objekt

                        actUlozDataZFormulare: {
                            caption: "jres:31926629", //RC 31926629 : Uložit jako hl. přílohu
                            //icon: undefined,
                            enabled: false,
                            run: function () {
                                $.content(this).saveDataToGinisFromSkForm();
                            }
                        },
                        actEditovatSKForm: {
                           
                            caption: "jres:31926630", //RC 31926630 : Editovat formulář
                           // icon: "",
                            run: function () {
                                $.content(this).editovatFormular();
                            }
                        },
                        
                        actResizeSKForm: {
                            caption: "jres:31926631", //RC 31926631 : Oprav zarovnání formuláře
                            //icon: "",
                            run: function () {
                                $.content(this).opravZarovnaniSKForm();
                            }
                        },
                        actShowSimpleHtml: {
                            caption: "jres:31926632", //RC 31926632 : Jednoduchý náhled
                            //icon: "",
                            run: function () {
                                $.content(this).showSimpleHtml();
                            }
                        },
                        actKlasickeZobrazeni: {
                            caption: "jres:31926678", //RC 31926678 : Klasické zobrazení
                            //icon: "",
                            run: function () {
                                $.content(this).klasickeZobrazeni();
                            }
                        },
                        actGenerovatSkPdf: {
                            caption: "jres:31926633", //RC 31926633 : Generovat PDF
                            //icon: "",
                            run: function () {
                                $.content(this).generovatSkPdf();
                                
                            }
                        },
                        actGenerovatSkPdfAPridatDoPriloh: {
                            caption: "jres:31926634", //RC 31926634 : Přidat jako PDF
                            //icon: "",
                            run: function () {
                                
                                $.content(this).generovatSkPdfAPridatDoPriloh();

                            }
                        },
                        actOtevriHistoriKonverzaceSkComponent: {
                            caption: "jres:31926635", //RC 31926635 : Související zprávy
                            icon:"gi-edesk",
                            enabled: true,
                            run: function () {
                                $.content(this).otevriHistoriKonverzaceSkComponent();
                            }
                        },
                        actPredplnitZDokumentuSkComponent: {
                            caption: "jres:31926636", //RC 31926636 : Předplnit z dokumentu
                            //icon: "gi-edesk",
                            enabled: false,
                            run: function () {
                                $.content(this).predplnitZDokumentuSkComponent();
                            }
                        },
                        actTiskObsahuStranky: {
                            caption: "jres:31926679", //RC 31926679 : Tisk stránky
                            //icon: "gi-edesk",
                            enabled: true,
                            run: function () {
                                $.content(this).tiskObsahuIframe();
                            }
                        },


                    },
                    menuBar: [

                        Gordic.Wfl.Globals.MenuDefinitions.detailVazby(),
                        { action: "actOtevriHistoriKonverzaceSkComponent", parent: "menuWflVazby" },
                        //{ action: "actSouvisejici", parent: "menuWflVazby" },
                        //{ action: "actEvidVystupy", parent: "menuWflVazby" }

                    ],

                    tabs: {
                        WflGfrm: {
                            tabParams: {
                                title: "jres:26226940", //RC 26226940 : Formulář
                                //opened: false,
                                group: Gordic.Prefabs.TabGroups.Gfrm(),
                                menuBar: [
                                    { action: "actEditovatSKForm", favorite: true },
                                    { action: "actUlozDataZFormulare", favorite: true },
                                    { action: "actShowSimpleHtml", favorite: true },
                                    { action: "actKlasickeZobrazeni", favorite: true },
                                    { action: "actGenerovatSkPdf", favorite: true },
                                    { action: "actGenerovatSkPdfAPridatDoPriloh", favorite: true },
                                    { action: "actPredplnitZDokumentuSkComponent", favorite: true },
                                    { action: "actTiskObsahuStranky", favorite: true },
                                    { action: "actResizeSKForm" },
                                    
                                    
                                    
                                ],
                                customLoad: function (loadParams) {

                                    var content = $.content(this);
                                    content.wflSKFormTab = $(this);
                                    
                                    // nastavení jméno souboru
                                    if (componentDto.file_name != null && componentDto.file_name != "") {
                                        content.tempSKFormPrilohaName = componentDto.file_name;
                                    }
                                    

                                    var typeOfEform = 20;  // init po reloadu
                                     /*
                                        // typeOfEform:
                                        Pouhy html přehled hodnot
                                        SimpleHtml=0,
                                        Editovatelný formulář
                                        Editable=10,
                                        Needitovatelný formulář
                                        NonEditable=20,

                                        PdfForm = 30
                                        */
                                  
                                    content._vytvorSKForm(typeOfEform);


                                }

                            }
                            //contentParams: [Gordic.Report.WebClient.GReportFormControl, {
                            //    autoLoadParams: {
                            //        Form: "wfl-form:DEMOX000XBF7",  // componentDto.IxsFrmGform //$.content(this).DetailDto.ixp
                            //        server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                            //    }
                            //}]
                        }
                    },
                    sidePanels: {
                        panelSKKonverzace: {
                            side: "right",
                            leaf: { caption: "jres:31926637" },  //RC 31926637 : Související zprávy
                            caption: "jres:31926638", //RC 31926638 : Související zprávy
                            customClass: "js-UpsrSk",
                            icon: "fa-comments-o",
                            minWidth: 300,
                            width: 400,
                            open: function () {
                                var this_ = $(this);
                               
                                if (!this_.hasClass("HistorieKonverzaceSKZpravDlgLoaded")) { 
                                    var cnt = $.content(this_);
                                    var opt = {
                                        Dto: {
                                            ixb: componentDto.ixb_epod
                                        },
                                        Ixp: componentDto.ixp,
                                        TypZobrazeni: 0
                                    };

                                    // Možnost 1
                                    //var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.HistorieKonverzaceSKZpravDlg", {  serverParams: opt, parentContent: cnt }]), this)
                                    //panelContent.load();

                                    // možnost 2
                                    var newDiv = $.newDiv();
                                    newDiv.appendTo(this)
                                    var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.HistorieKonverzaceSKZpravDlg", { serverParams: opt, parentContent: cnt, id: "idHistorieKonverzaceSKZpravDlgSideBar" }]), newDiv)
                                    panelContent.load();

                                    this_.addClass("HistorieKonverzaceSKZpravDlgLoaded");
                                }
                            
                                // původní verze 
                                /*
                                $.content(this_).className = "Gordic.Wfl.WebClient.HistorieKonverzaceSKZpravDlg";
                                
                                this_.gcontent("load", {
                                    Dto: {
                                        ixb: componentDto.ixb_epod       
                                    },
                                    Ixp: componentDto.ixp,
                                    TypZobrazeni: 0
,
                                });
                                */
                            }
                        }
                    }
                };
                return result;
            }

           
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);