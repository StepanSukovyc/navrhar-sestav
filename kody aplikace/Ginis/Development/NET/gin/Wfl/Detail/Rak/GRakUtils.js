(function ($) {
    namespace("Gordic.Rak.Utils", {
        srv: null,
        Sign: "",
        Timestamp: "",
        ExtUrl: "",
        onComplete: null,
        parentContext: null,

        GetFileName: function (FilePath) {
            var l_sFilename = "";
            var l_nFrom = FilePath.lastIndexOf("\\");

            if (l_nFrom !== -1) {
                l_sFilename = FilePath.substr(l_nFrom + 1).toLowerCase();
            }
            return l_sFilename;
        },

        GetSrv: function (content) {

            if (content != null) {
                return content.createServiceContent({ className: "Gordic.Wfl.WebClient.GRakUtils", params: {} });  //servisni sluzba/content
            } else {
                return new GContent({ className: "Gordic.Wfl.WebClient.GRakUtils", params: {} });  //servisni sluzba/content
            }

            
        },

        // Provede zmenu datoveho formatu dokumentu pro zadane Ixp a Ixb
        ZmenaDatovehoFormatuElDokumentu: function (Ixp, Ixb, parentContext) {
            var def = $.Deferred();
            //   def.resolve({ Ixp: Ixp, Ixb: Ixb });

            if (parentContext !== undefined) {
                this.parentContext = parentContext;
            }

            this.srv = this.GetSrv(parentContext);
            var that = this;
            var pdfFileName;
            var tmpFilename;
            var thumbPrint;
            var cnt = $.content();
            //Zavolám první fázi ZDF (konverze do PDF a opatření doložkou)
            this.srv.call("ZmenaDatovehoFormatuElDokumentuFazeKonverze", { Ixp: Ixp, Ixb: Ixb })
                .done(function (retVal) {
                    if (!(retVal.ZDF1FileName === "" || retVal.ZDF1FileContent === "") ) {
                        var l_sZDF1FileName = retVal.ZDF1FileName;
                        pdfFileName = l_sZDF1FileName;
                        var wflhkonDto = retVal.WflhkonDto;

                        GBrowserExtras.documentSave(l_sZDF1FileName, retVal.ZDF1FileContent)
                            .then(function (retValDocumentSave) {
                                tmpFilename = retValDocumentSave;

                                var sgnConfigParams = {};
                                m_oSgn = new Gordic.Wfl.WebClient.GSgn(sgnConfigParams);


                                that.Ixp = retVal.Ixp;
                                that.Ixb = retVal.Ixb;

                                var l_sFilename = "";
                                var l_nFrom = tmpFilename.lastIndexOf("\\");
                                if (l_nFrom !== -1) {
                                    l_sFilename = tmpFilename.substr(l_nFrom + 1).toLowerCase();
                                }
                                var fileName = l_sFilename;
                                var sgnMinimumConfigParams = { signWithTimeStamp: true, filePath: tmpFilename, thumbprint: "", fileName: fileName, saveOnClient: true };
                                return m_oSgn.signFile(sgnMinimumConfigParams);
                            })
                            .then(function (retValSignFile) {

                                try {

                                    if (retValSignFile.SaveOnClient) {

                                        tmpFilename = retValSignFile.ClientPath;
                                        thumbPrint = retValSignFile.CertificateThumbprint;

                                        return GBrowserExtras.documentLoad(tmpFilename);


                                    } else {
                                        console.log("Nepodařilo se uložit podepsaný dokument na lokální dočasné úložiště.");
                                        def.reject("Nepodařilo se uložit podepsaný dokument na lokální dočasné úložiště.");
                                    }
                                } catch (e) {
                                    GBrowserExtras.documentPluginDelete(tmpFilename);
                                    return $.Deferred().reject({ handled: false, reason: "Nepodařilo se zpracovat soubor." + " \nDůvod: " + e.message, type: 2, operation: "práce se soubory" }).promise(); // type = 2 common error, operation: "práce se soubory" - konstanty z TS Gui.WebApp
                                }

                            })
                            .then(function (retValDocumentLoad) {

                                try {
                                    if (GBrowserExtras.isSupported("documentPluginDelete"))
                                        GBrowserExtras.documentPluginDelete(tmpFilename);

                                } catch (e) {
                                    console.log("Nepodařilo se smazat dočasný soubor." + " \nDůvod: " + e.message);
                                    GDlg.alert("Nepodařilo se smazat dočasný soubor." + " \nDůvod: " + e.message);
                                }

                                //Zavolám druhou fázi ZDF (uložení záznamu o provedené konverzi)
                                debugger;
                                that.srv.call("ZmenaDatovehoFormatuElDokumentuFazeUlozeni", { Ixp: Ixp, Ixb: Ixb, FileName: pdfFileName, FileContent: retValDocumentLoad, WflhkonDto: wflhkonDto, ThumbPrint: thumbPrint })
                                    .done(function (retValFazeUlozeni) {
                                        if (retValFazeUlozeni.Vysledek) {
                                            def.resolve();
                                        } else {
                                            console.log("Při ukládání elektronického dokumentu došlo k chybě:\n" + retValFazeUlozeni.Chyba);
                                            def.reject("Při ukládání elektronického dokumentu došlo k chybě:\n" + retValFazeUlozeni.Chyba);
                                        }
                                    })
                                    .fail(function (msg) {
                                        console.log("Při volání metody ZmenaDatovehoFormatuElDokumentuFazeUlozeni došlo k chybě.");
                                        def.reject(msg);
                                    })
                                    .fail(function (xhr, type, obj) {

                                        obj.handled = true;

                                    })
                                    .always(function () {
                                        GBrowserExtras.documentPluginDelete(tmpFilename);
                                    });

                            }, function (reason) {
                                console.log("Nepodařilo se otevřít soubor po podepsání.");
                                Gordic.Gui.WebApp.Utils.showReasonFlash(cnt, reason);
                                if (reason.handled === false) {
                                    cnt.dialogs.alert(reason.reason);
                                }
                                def.reject();
                            });
                    } else {
                        console.log("Parametr s PDF dokumentem pro podepsání je prázdný.");
                        def.reject();
                    }

                })
                .fail(function (msg) {
                    console.log("Při volání metody ZmenaDatovehoFormatuElDokumentuFazeKonverze došlo k chybě.");
                    def.reject(msg);
                })
                .fail(function (xhr, type, obj) {

                    obj.handled = true;

                });

            return def.promise();
        }
    }, { pure: true });
})(jQuery);