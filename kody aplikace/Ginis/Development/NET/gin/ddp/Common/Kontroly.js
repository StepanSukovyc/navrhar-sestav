"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.Kontroly.ts                            </Name>
//    <Description> Sdílené metody a funkce pro práci s kontrolami              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var Kontroly;
                (function (Kontroly) {
                    /**
                     * Metoda pro vytvoření kontroly -> otevření okna detailu pro založení kontroly
                     * @param that GContent
                     * @param ixp Identifikátor případu
                     * @returns Promise<boolean> - v případě že se záznam uloží vrací true, jinak false nebo nic
                     */
                    function NovaKontrola(that, ixp) {
                        var def = $.Deferred();
                        if (ixp == null || ixp == undefined || ixp.length != 12) {
                            that.showFlash("Identifikátor kontroly není validní!", "error"); //? Maybe změnit na notifikaci
                            that.dialogs.error("Chyba", "Identifikátor kontroly není validní!").on("close", (ev, retVal) => {
                                //return def.reject("Identifikátor kontroly není validní!").promise();
                                return def.reject().promise();
                            });
                        }
                        var windowOption = { title: "Nastavení kontroly", width: 560, height: 480 };
                        var ParamsJSON = { ID: "DDPGDetailKontroly#", Ixp: ixp, DatKontr: null, NovaKontrola: true };
                        GDlg.showModalWindow("Gordic.Ddp.WebClient.GDetailKontroly", ParamsJSON, windowOption)
                            .on("close", function (ev, data) {
                            if (data) { // Pokud se mi vrátilo true (uložení proběhlo = něco se změnilo) 
                                return def.resolve(true); // vrátím také true v resolve abych na něj dále mohl reagovat - např.updatem tabulky / gridu
                            }
                            else {
                                return def.resolve(false); // V opačném případě vracím false jako znak že se nic nezměnilo
                            }
                        });
                        return def.promise();
                    }
                    Kontroly.NovaKontrola = NovaKontrola;
                    /**
                     * Metoda pro detail kontroly -> otevření okna detailu pro zobrazení kontroly s možností úprav
                     * @param that GContent
                     * @param ixp Identifikátor případu
                     * @param datKontr Datum kontrolu
                     * @returns Promise<boolean> - v případě že se záznam uloží vrací true, jinak false nebo nic
                     */
                    function DetailKontroly(that, ixp, datKontr) {
                        var def = $.Deferred();
                        if (ixp == null || ixp == undefined || ixp.length != 12 || datKontr == null || datKontr == undefined) {
                            //that.showFlash("Identifikátor nebo datum kontroly nejsou validní!", "error"); //? Maybe změnit na notifikaci
                            that.dialogs.error("Chyba", "Identifikátor nebo datum kontroly nejsou validní!")
                                .on("close", (ev, retVal) => {
                                //return def.reject("Identifikátor nebo datum kontroly nejsou validní!").promise();
                                return def.reject().promise();
                            });
                        }
                        var windowOption = { title: "Nastavení kontroly", width: 560, height: 480 };
                        var ParamsJSON = { ID: "DDPGDetailKontroly#", Ixp: ixp, DatKontr: datKontr, NovaKontrola: false };
                        GDlg.showModalWindow("Gordic.Ddp.WebClient.GDetailKontroly", ParamsJSON, windowOption)
                            .on("close", function (ev, data) {
                            if (data) { // Pokud se mi vrátilo true (uložení proběhlo = něco se změnilo) 
                                return def.resolve(true); // vrátím také true v resolve abych na něj dále mohl reagovat - např.updatem tabulky / gridu
                            }
                            else {
                                return def.resolve(false); // V opačném případě vracím false jako znak že se nic nezměnilo
                            }
                        });
                        return def.promise();
                    }
                    Kontroly.DetailKontroly = DetailKontroly;
                    //name: "actGPripadKontrolyHotovo",
                    //caption: "Provedeno",
                    //tooltip: "Nastaví kontrolu jako provedenou",
                    //enabled: that.permsDto.pb_kontrola_hotovo!,
                    /** Finish more */
                    function ProvestKontroly(that, selection) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.finishMulti(rq => {
                            return {
                                rq: {
                                    RequestData: selection
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ProvestKontroly = ProvestKontroly;
                    /** Finish one */
                    function ProvestKontrolu(that, row) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.finish(rq => {
                            return {
                                rq: {
                                    Data: row
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ProvestKontrolu = ProvestKontrolu;
                    //name: "actGPripadKontrolyNeniHotovo",
                    //caption: "Zrušit provedení",
                    //tooltip: "Nastaví kontrolu jako neprovedenou",
                    //enabled: true, //TODO: nemámPermsDto
                    /** UnFinish more */
                    function ZrusitProvedeniKontrol(that, selection) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.unFinishMulti(rq => {
                            return {
                                rq: {
                                    RequestData: selection
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ZrusitProvedeniKontrol = ZrusitProvedeniKontrol;
                    /** UnFinish one */
                    function ZrusitProvedeniKontroly(that, row) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.unFinish(rq => {
                            return {
                                rq: {
                                    Data: row
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ZrusitProvedeniKontroly = ZrusitProvedeniKontroly;
                    //name: "actGPripadKontrolyStorno",
                    //caption: "Zrušit",
                    //tooltip: "Nastaví kontrolu jako zrušenou",
                    //enabled: that.permsDto.pb_smazat_kontrolu!,
                    /** Strono more */
                    function ZrusitKontroly(that, selection) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.stornoMulti(rq => {
                            return {
                                rq: {
                                    RequestData: selection
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ZrusitKontroly = ZrusitKontroly;
                    /** Storno one */
                    function ZrusitKontrolu(that, row) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.storno(rq => {
                            return {
                                rq: {
                                    Data: row
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ZrusitKontrolu = ZrusitKontrolu;
                    //name: "actGPripadKontrolyObnovit",
                    //caption: "Obnovit",
                    //tooltip: "Nastaví kontrolu jako aktivní",
                    //enabled: that.permsDto.pb_obnovit_kontrolu!,
                    /** Restore more */
                    function ObnovitKontroly(that, selection) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.restoreMulti(rq => {
                            return {
                                rq: {
                                    RequestData: selection
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ObnovitKontroly = ObnovitKontroly;
                    /** Restore one */
                    function ObnovitKontrolu(that, row) {
                        var def = $.Deferred();
                        let req = that.isl.PripadKontrola.restore(rq => {
                            return {
                                rq: {
                                    Data: row
                                }
                            };
                        }).get();
                        ProcessResponseKontroly(req, that, false, false)
                            .done((ret) => { def.resolve(ret); })
                            .fail((ret, type, obj) => { def.reject(ret, type, obj); });
                        return def.promise();
                    }
                    Kontroly.ObnovitKontrolu = ObnovitKontrolu;
                    function ProcessResponseKontroly(promise, content, closeOnSuccess = false, closeOnFail = false, getSuccessMsg = true) {
                        if (promise == null)
                            return promise;
                        let returnPromise = $.Deferred();
                        /** Získání stavu výsledku operace */
                        let getState = (state) => {
                            if (state == null)
                                return undefined;
                            switch (state) { // Upraveno pro účely volání funkce setNotificationAfterOperation()
                                case 0 /* Interface.LK.Isl.Common.GMessageType.Success */:
                                    return "success";
                                //return "g-state-success";
                                case 1 /* Interface.LK.Isl.Common.GMessageType.Error */:
                                    return "error";
                                //return "g-state-error";
                                case 2 /* Interface.LK.Isl.Common.GMessageType.Warning */:
                                    return "warning";
                                //return "g-state-warning";
                            }
                        };
                        /** Získaní titulku okna - nyní součástí metody na základě state výsledku */
                        let getTitle = (state) => {
                            if (state == null)
                                return undefined;
                            switch (state) {
                                case 0 /* Interface.LK.Isl.Common.GMessageType.Success */:
                                    return "Úspěch";
                                case 1 /* Interface.LK.Isl.Common.GMessageType.Error */:
                                    return "Chyba";
                                case 2 /* Interface.LK.Isl.Common.GMessageType.Warning */:
                                    return "Varování";
                            }
                        };
                        /** Získaní a nastavení zprávy o chybě */
                        let getMessage = (message) => {
                            if (message == null)
                                return "Neznámá chyba";
                            else
                                return message;
                        };
                        let getIcon = (state) => {
                            if (state == null)
                                return GDlg.mbiInfo;
                            switch (state) {
                                case 0 /* Interface.LK.Isl.Common.GMessageType.Success */:
                                    return GDlg.mbiSuccess;
                                case 1 /* Interface.LK.Isl.Common.GMessageType.Error */:
                                    return GDlg.mbiError;
                                case 2 /* Interface.LK.Isl.Common.GMessageType.Warning */:
                                    return GDlg.mbiWarning;
                            }
                        };
                        /** Zavolání funkce pro zobrazení výsledku operace - notification (dříve flash) */
                        let showResponse = (response, content) => {
                            if (response.Messages != null && response.Messages.length > 0)
                                response.Messages.forEach((value, index, array) => {
                                    //content.showFlash(getMessage(value.Message), getState(value.Type));
                                    content.dialogs.messageBox(getTitle(value.Type), getMessage(value.Message), [GDlg.mbbOk], getIcon(value.Type));
                                    //content.notification("showToast", { title: getTitle(value.Type), content: getMessage(value.Message) });
                                    //setNotificationAfterOperation(content, "afterProcessResponse", getMessage(value.Message), getState(value.Type), );
                                });
                        };
                        promise
                            .done((response) => {
                            if (response == null || getSuccessMsg == false) {
                                returnPromise.resolve(response);
                                return;
                            }
                            if (response.Success == true && response.SuccessMsg != null && response.SuccessMsg.trim() != "") {
                                content.dialogs.messageBox(getTitle(0 /* Interface.LK.Isl.Common.GMessageType.Success */), response.SuccessMsg, [GDlg.mbbOk], GDlg.mbiSuccess);
                            }
                            if (response["Responses"] != null) {
                                let typedResp = response;
                                if (typedResp != null) {
                                    if (typedResp.Success)
                                        returnPromise.resolve(response);
                                    else
                                        returnPromise.reject(response);
                                    let closeContent = (closeOnSuccess && typedResp.Success) || (closeOnFail && !typedResp.Success);
                                    let targetContent = closeContent && content.parentContent != null ? content.parentContent : content;
                                    if ((!closeContent || (closeContent && targetContent !== content)) && typedResp.Responses != null) {
                                        var msg = "";
                                        typedResp.Responses.forEach((value, index, array) => {
                                            if (value.Success) {
                                                showResponse(value, targetContent);
                                            }
                                            else {
                                                if (value.Messages != null && value.Messages.length > 0) {
                                                    for (var i = 0; i < value.Messages.length; i++) {
                                                        msg += value.Messages[i].Message;
                                                        msg += "<br>";
                                                    }
                                                }
                                            }
                                        });
                                        content.dialogs.error("Některé kontroly skončily s chybou", msg);
                                        //content.dialogs.messageBox(getTitle(Interface.LK.Isl.Common.GMessageType.Warning), msg, [GDlg.mbbOk], getIcon(Interface.LK.Isl.Common.GMessageType.Warning));
                                    }
                                    if (closeContent) {
                                        content.close(typedResp.Success);
                                    }
                                }
                                else
                                    returnPromise.resolve(response);
                            }
                            else if (response["Messages"] != null) {
                                let typedResp = response;
                                if (typedResp != null) {
                                    if (typedResp.Success)
                                        returnPromise.resolve(response);
                                    else
                                        returnPromise.reject(response);
                                    let closeContent = (closeOnSuccess && typedResp.Success) || (closeOnFail && !typedResp.Success);
                                    let targetContent = closeContent && content.parentContent != null ? content.parentContent : content;
                                    if (!closeContent || (closeContent && targetContent !== content)) {
                                        showResponse(typedResp, targetContent);
                                    }
                                    if (closeContent) {
                                        content.close(typedResp.Success);
                                    }
                                }
                                else
                                    returnPromise.resolve(response);
                            }
                            else {
                                if (closeOnSuccess)
                                    content.close(true);
                                returnPromise.resolve(response);
                            }
                        })
                            .fail((xhr, type, obj) => {
                            if (type === "exception") {
                                (closeOnFail && content.parentContent != null ? content.parentContent : content).dialogs.error("Chyba", obj.baseMessage);
                                if (closeOnFail)
                                    content.close(false);
                                obj.handled = true;
                                console.log(obj.Data);
                            }
                            returnPromise.reject(xhr, type, obj);
                        });
                        return returnPromise.promise();
                    }
                    Kontroly.ProcessResponseKontroly = ProcessResponseKontroly;
                })(Kontroly = Common.Kontroly || (Common.Kontroly = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS29udHJvbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJLb250cm9seS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBRWpCLElBQVUsTUFBTSxDQXFZZjtBQXJZRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxWW5CO0lBcllnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxWTdCO1FBcllvQixXQUFBLFNBQVM7WUFBQyxJQUFBLE1BQU0sQ0FxWXBDO1lBclk4QixXQUFBLE1BQU07Z0JBQUMsSUFBQSxRQUFRLENBcVk3QztnQkFyWXFDLFdBQUEsUUFBUTtvQkFDMUM7Ozs7O3VCQUtHO29CQUNILFNBQWdCLFlBQVksQ0FBQyxJQUFjLEVBQUUsR0FBVzt3QkFDcEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO3dCQUVoQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRyxDQUFDOzRCQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLHNDQUFzQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEJBQThCOzRCQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsc0NBQXNDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dDQUMzRixzRUFBc0U7Z0NBQ3RFLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNsQyxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUVELElBQUksWUFBWSxHQUFHLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFF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Q0FBQyxDQUFDO3dCQUN6QyxDQUFDLENBQUMsQ0FBQzt3QkFFUCxPQUFPLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkMsQ0FBQztvQkF6SmUsZ0NBQXVCLDBCQXlKdEMsQ0FBQTtnQkFFTCxDQUFDLEVBcllxQyxRQUFRLEdBQVIsZUFBUSxLQUFSLGVBQVEsUUFxWTdDO1lBQUQsQ0FBQyxFQXJZOEIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFxWXBDO1FBQUQsQ0FBQyxFQXJZb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcVk3QjtJQUFELENBQUMsRUFyWWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFZbkI7QUFBRCxDQUFDLEVBcllTLE1BQU0sS0FBTixNQUFNLFFBcVlmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LktvbnRyb2x5LnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTZMOtbGVuw6kgbWV0b2R5IGEgZnVua2NlIHBybyBwcsOhY2kgcyBrb250cm9sYW1pICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLktvbnRyb2x5IHtcclxuICAgIC8qKlxyXG4gICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBrb250cm9seSAtPiBvdGV2xZllbsOtIG9rbmEgZGV0YWlsdSBwcm8gemFsb8W+ZW7DrSBrb250cm9seVxyXG4gICAgICogQHBhcmFtIHRoYXQgR0NvbnRlbnRcclxuICAgICAqIEBwYXJhbSBpeHAgSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1IFxyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxib29sZWFuPiAtIHYgcMWZw61wYWTEmyDFvmUgc2UgesOhem5hbSB1bG/FvsOtIHZyYWPDrSB0cnVlLCBqaW5hayBmYWxzZSBuZWJvIG5pY1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTm92YUtvbnRyb2xhKHRoYXQ6IEdDb250ZW50LCBpeHA6IHN0cmluZyApOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG5cclxuICAgICAgICBpZiAoaXhwID09IG51bGwgfHwgaXhwID09IHVuZGVmaW5lZCB8fCBpeHAubGVuZ3RoICE9IDEyICkge1xyXG4gICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIklkZW50aWZpa8OhdG9yIGtvbnRyb2x5IG5lbsOtIHZhbGlkbsOtIVwiLCBcImVycm9yXCIpOyAvLz8gTWF5YmUgem3Em25pdCBuYSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiSWRlbnRpZmlrw6F0b3Iga29udHJvbHkgbmVuw60gdmFsaWRuw60hXCIpLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5yZWplY3QoXCJJZGVudGlmaWvDoXRvciBrb250cm9seSBuZW7DrSB2YWxpZG7DrSFcIikucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IFwiTmFzdGF2ZW7DrSBrb250cm9seVwiLCB3aWR0aDogNTYwLCBoZWlnaHQ6IDQ4MCB9O1xyXG4gICAgICAgIHZhciBQYXJhbXNKU09OID0geyBJRDogXCJERFBHRGV0YWlsS29udHJvbHkjXCIsIEl4cDogaXhwLCBEYXRLb250cjogbnVsbCwgTm92YUtvbnRyb2xhOiB0cnVlIH07XHJcbiAgICAgICAgR0RsZy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsS29udHJvbHlcIiwgUGFyYW1zSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgbWkgdnLDoXRpbG8gdHJ1ZSAodWxvxb5lbsOtIHByb2LEm2hsbyA9IG7Em2NvIHNlIHptxJtuaWxvKSBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUodHJ1ZSk7ICAgLy8gdnLDoXTDrW0gdGFrw6kgdHJ1ZSB2IHJlc29sdmUgYWJ5Y2ggbmEgbsSbaiBkw6FsZSBtb2hsIHJlYWdvdmF0IC0gbmFwxZkudXBkYXRlbSB0YWJ1bGt5IC8gZ3JpZHVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKGZhbHNlKTsgIC8vIFYgb3BhxI1uw6ltIHDFmcOtcGFkxJsgdnJhY8OtbSBmYWxzZSBqYWtvIHpuYWsgxb5lIHNlIG5pYyBuZXptxJtuaWxvXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRvZGEgcHJvIGRldGFpbCBrb250cm9seSAtPiBvdGV2xZllbsOtIG9rbmEgZGV0YWlsdSBwcm8gem9icmF6ZW7DrSBrb250cm9seSBzIG1vxb5ub3N0w60gw7pwcmF2XHJcbiAgICAgKiBAcGFyYW0gdGhhdCBHQ29udGVudFxyXG4gICAgICogQHBhcmFtIGl4cCBJZGVudGlmaWvDoXRvciBwxZnDrXBhZHUgXHJcbiAgICAgKiBAcGFyYW0gZGF0S29udHIgRGF0dW0ga29udHJvbHVcclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8Ym9vbGVhbj4gLSB2IHDFmcOtcGFkxJsgxb5lIHNlIHrDoXpuYW0gdWxvxb7DrSB2cmFjw60gdHJ1ZSwgamluYWsgZmFsc2UgbmVibyBuaWNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERldGFpbEtvbnRyb2x5KHRoYXQ6IEdDb250ZW50LCBpeHA6IHN0cmluZywgZGF0S29udHI6IERhdGUgfCBKc29uRGF0ZSApOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG5cclxuICAgICAgICBpZiAoaXhwID09IG51bGwgfHwgaXhwID09IHVuZGVmaW5lZCB8fCBpeHAubGVuZ3RoICE9IDEyIHx8IGRhdEtvbnRyID09IG51bGwgfHwgZGF0S29udHIgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJJZGVudGlmaWvDoXRvciBuZWJvIGRhdHVtIGtvbnRyb2x5IG5lanNvdSB2YWxpZG7DrSFcIiwgXCJlcnJvclwiKTsgLy8/IE1heWJlIHptxJtuaXQgbmEgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIklkZW50aWZpa8OhdG9yIG5lYm8gZGF0dW0ga29udHJvbHkgbmVqc291IHZhbGlkbsOtIVwiKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucmVqZWN0KFwiSWRlbnRpZmlrw6F0b3IgbmVibyBkYXR1bSBrb250cm9seSBuZWpzb3UgdmFsaWRuw60hXCIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IFwiTmFzdGF2ZW7DrSBrb250cm9seVwiLCB3aWR0aDogNTYwLCBoZWlnaHQ6IDQ4MCB9O1xyXG4gICAgICAgIHZhciBQYXJhbXNKU09OID0geyBJRDogXCJERFBHRGV0YWlsS29udHJvbHkjXCIsIEl4cDogaXhwLCBEYXRLb250cjogZGF0S29udHIsIE5vdmFLb250cm9sYTogZmFsc2UgfTtcclxuICAgICAgICBHRGxnLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxLb250cm9seVwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSBtaSB2csOhdGlsbyB0cnVlICh1bG/FvmVuw60gcHJvYsSbaGxvID0gbsSbY28gc2Ugem3Em25pbG8pIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh0cnVlKTsgICAvLyB2csOhdMOtbSB0YWvDqSB0cnVlIHYgcmVzb2x2ZSBhYnljaCBuYSBuxJtqIGTDoWxlIG1vaGwgcmVhZ292YXQgLSBuYXDFmS51cGRhdGVtIHRhYnVsa3kgLyBncmlkdVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZmFsc2UpOyAgLy8gViBvcGHEjW7DqW0gcMWZw61wYWTEmyB2cmFjw61tIGZhbHNlIGpha28gem5hayDFvmUgc2UgbmljIG5lem3Em25pbG9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgLy9uYW1lOiBcImFjdEdQcmlwYWRLb250cm9seUhvdG92b1wiLFxyXG4gICAgLy9jYXB0aW9uOiBcIlByb3ZlZGVub1wiLFxyXG4gICAgLy90b29sdGlwOiBcIk5hc3RhdsOtIGtvbnRyb2x1IGpha28gcHJvdmVkZW5vdVwiLFxyXG4gICAgLy9lbmFibGVkOiB0aGF0LnBlcm1zRHRvLnBiX2tvbnRyb2xhX2hvdG92byEsXHJcbiAgICAvKiogRmluaXNoIG1vcmUgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQcm92ZXN0S29udHJvbHkodGhhdDogR0NvbnRlbnQsIHNlbGVjdGlvbjogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvW10pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IHJlcSA9IHRoYXQuaXNsLlByaXBhZEtvbnRyb2xhLmZpbmlzaE11bHRpKHJxID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdERhdGE6IHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmdldCgpXHJcblxyXG4gICAgICAgIFByb2Nlc3NSZXNwb25zZUtvbnRyb2x5KHJlcSwgdGhhdCwgZmFsc2UsIGZhbHNlKVxyXG4gICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IGRlZi5yZXNvbHZlKHJldCk7IH0pXHJcbiAgICAgICAgICAgIC5mYWlsKChyZXQsIHR5cGUsIG9iaikgPT4geyBkZWYucmVqZWN0KHJldCwgdHlwZSwgb2JqKTsgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8qKiBGaW5pc2ggb25lICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJvdmVzdEtvbnRyb2x1KHRoYXQ6IEdDb250ZW50LCByb3c6IERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRLb250cm9sYUR0byk6IEpRdWVyeVByb21pc2U8YW55PiB7ICAgICAgIFxyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IHJlcSA9IHRoYXQuaXNsLlByaXBhZEtvbnRyb2xhLmZpbmlzaChycSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZ2V0KClcclxuXHJcbiAgICAgICAgUHJvY2Vzc1Jlc3BvbnNlS29udHJvbHkocmVxLCB0aGF0LCBmYWxzZSwgZmFsc2UpICAgXHJcbiAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHsgZGVmLnJlc29sdmUocmV0KTsgfSlcclxuICAgICAgICAgICAgLmZhaWwoKHJldCwgdHlwZSwgb2JqKSA9PiB7IGRlZi5yZWplY3QocmV0LCB0eXBlLCBvYmopOyB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgLy9uYW1lOiBcImFjdEdQcmlwYWRLb250cm9seU5lbmlIb3Rvdm9cIixcclxuICAgIC8vY2FwdGlvbjogXCJacnXFoWl0IHByb3ZlZGVuw61cIixcclxuICAgIC8vdG9vbHRpcDogXCJOYXN0YXbDrSBrb250cm9sdSBqYWtvIG5lcHJvdmVkZW5vdVwiLFxyXG4gICAgLy9lbmFibGVkOiB0cnVlLCAvL1RPRE86IG5lbcOhbVBlcm1zRHRvXHJcbiAgICAvKiogVW5GaW5pc2ggbW9yZSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFpydXNpdFByb3ZlZGVuaUtvbnRyb2wodGhhdDogR0NvbnRlbnQsIHNlbGVjdGlvbjogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvW10pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IHJlcSA9IHRoYXQuaXNsLlByaXBhZEtvbnRyb2xhLnVuRmluaXNoTXVsdGkocnEgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0RGF0YTogc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZ2V0KClcclxuXHJcbiAgICAgICAgUHJvY2Vzc1Jlc3BvbnNlS29udHJvbHkocmVxLCB0aGF0LCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHsgZGVmLnJlc29sdmUocmV0KTsgfSlcclxuICAgICAgICAgICAgLmZhaWwoKHJldCwgdHlwZSwgb2JqKSA9PiB7IGRlZi5yZWplY3QocmV0LCB0eXBlLCBvYmopOyB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG4gICAgLyoqIFVuRmluaXNoIG9uZSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFpydXNpdFByb3ZlZGVuaUtvbnRyb2x5KHRoYXQ6IEdDb250ZW50LCByb3c6IERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRLb250cm9sYUR0byk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgcmVxID0gdGhhdC5pc2wuUHJpcGFkS29udHJvbGEudW5GaW5pc2gocnEgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICBEYXRhOiByb3dcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5nZXQoKVxyXG5cclxuICAgICAgICBQcm9jZXNzUmVzcG9uc2VLb250cm9seShyZXEsIHRoYXQsIGZhbHNlLCBmYWxzZSlcclxuICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4geyBkZWYucmVzb2x2ZShyZXQpOyB9KVxyXG4gICAgICAgICAgICAuZmFpbCgocmV0LCB0eXBlLCBvYmopID0+IHsgZGVmLnJlamVjdChyZXQsIHR5cGUsIG9iaik7IH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vbmFtZTogXCJhY3RHUHJpcGFkS29udHJvbHlTdG9ybm9cIixcclxuICAgIC8vY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAvL3Rvb2x0aXA6IFwiTmFzdGF2w60ga29udHJvbHUgamFrbyB6cnXFoWVub3VcIixcclxuICAgIC8vZW5hYmxlZDogdGhhdC5wZXJtc0R0by5wYl9zbWF6YXRfa29udHJvbHUhLFxyXG4gICAgLyoqIFN0cm9ubyBtb3JlICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWnJ1c2l0S29udHJvbHkodGhhdDogR0NvbnRlbnQsIHNlbGVjdGlvbjogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvW10pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGF0LmlzbC5QcmlwYWRLb250cm9sYS5zdG9ybm9NdWx0aShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcXVlc3REYXRhOiBzZWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgUHJvY2Vzc1Jlc3BvbnNlS29udHJvbHkocmVxLCB0aGF0LCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IGRlZi5yZXNvbHZlKHJldCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgocmV0LCB0eXBlLCBvYmopID0+IHsgZGVmLnJlamVjdChyZXQsIHR5cGUsIG9iaik7IH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqIFN0b3JubyBvbmUgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBacnVzaXRLb250cm9sdSh0aGF0OiBHQ29udGVudCwgcm93OiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkS29udHJvbGFEdG8pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGF0LmlzbC5QcmlwYWRLb250cm9sYS5zdG9ybm8ocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiByb3dcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgUHJvY2Vzc1Jlc3BvbnNlS29udHJvbHkocmVxLCB0aGF0LCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IGRlZi5yZXNvbHZlKHJldCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgocmV0LCB0eXBlLCBvYmopID0+IHsgZGVmLnJlamVjdChyZXQsIHR5cGUsIG9iaik7IH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vbmFtZTogXCJhY3RHUHJpcGFkS29udHJvbHlPYm5vdml0XCIsXHJcbiAgICAvL2NhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgLy90b29sdGlwOiBcIk5hc3RhdsOtIGtvbnRyb2x1IGpha28gYWt0aXZuw61cIixcclxuICAgIC8vZW5hYmxlZDogdGhhdC5wZXJtc0R0by5wYl9vYm5vdml0X2tvbnRyb2x1ISxcclxuICAgIC8qKiBSZXN0b3JlIG1vcmUgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBPYm5vdml0S29udHJvbHkodGhhdDogR0NvbnRlbnQsIHNlbGVjdGlvbjogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvW10pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGF0LmlzbC5QcmlwYWRLb250cm9sYS5yZXN0b3JlTXVsdGkocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0RGF0YTogc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nZXQoKTtcclxuXHJcbiAgICAgICAgUHJvY2Vzc1Jlc3BvbnNlS29udHJvbHkocmVxLCB0aGF0LCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHsgZGVmLnJlc29sdmUocmV0KTsgfSlcclxuICAgICAgICAgICAgLmZhaWwoKHJldCwgdHlwZSwgb2JqKSA9PiB7IGRlZi5yZWplY3QocmV0LCB0eXBlLCBvYmopOyB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpOyAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKiogUmVzdG9yZSBvbmUgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBPYm5vdml0S29udHJvbHUodGhhdDogR0NvbnRlbnQsIHJvdzogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBsZXQgcmVxID0gdGhhdC5pc2wuUHJpcGFkS29udHJvbGEucmVzdG9yZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgIFByb2Nlc3NSZXNwb25zZUtvbnRyb2x5KHJlcSwgdGhhdCwgZmFsc2UsIGZhbHNlKVxyXG4gICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7IGRlZi5yZXNvbHZlKHJldCk7IH0pXHJcbiAgICAgICAgICAgIC5mYWlsKChyZXQsIHR5cGUsIG9iaikgPT4geyBkZWYucmVqZWN0KHJldCwgdHlwZSwgb2JqKTsgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICBcclxuICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFByb2Nlc3NSZXNwb25zZUtvbnRyb2x5PFRSZXNwb25zZSBleHRlbmRzIChJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HR3JvdXBSZXNwb25zZTxURHRvPiB8IEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdSZXNwb25zZTxURHRvPiksIFREdG8+KHByb21pc2U6IEpRdWVyeVByb21pc2U8VFJlc3BvbnNlPiwgY29udGVudDogR0NvbnRlbnQsIGNsb3NlT25TdWNjZXNzOiBib29sZWFuID0gZmFsc2UsIGNsb3NlT25GYWlsOiBib29sZWFuID0gZmFsc2UsIGdldFN1Y2Nlc3NNc2c6IGJvb2xlYW4gPSB0cnVlKTogSlF1ZXJ5UHJvbWlzZTxUUmVzcG9uc2U+IHtcclxuICAgICAgICBpZiAocHJvbWlzZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblByb21pc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLyoqIFrDrXNrw6Fuw60gc3RhdnUgdsO9c2xlZGt1IG9wZXJhY2UgKi9cclxuICAgICAgICBsZXQgZ2V0U3RhdGUgPSAoc3RhdGU6IEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7IC8vIFVwcmF2ZW5vIHBybyDDusSNZWx5IHZvbMOhbsOtIGZ1bmtjZSBzZXROb3RpZmljYXRpb25BZnRlck9wZXJhdGlvbigpXHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5TdWNjZXNzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIFwiZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5FcnJvcjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gXCJnLXN0YXRlLWVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5XYXJuaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIndhcm5pbmdcIjtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIFwiZy1zdGF0ZS13YXJuaW5nXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFrDrXNrYW7DrSB0aXR1bGt1IG9rbmEgLSBueW7DrSBzb3XEjcOhc3TDrSBtZXRvZHkgbmEgesOha2xhZMSbIHN0YXRlIHbDvXNsZWRrdSAqL1xyXG4gICAgICAgIGxldCBnZXRUaXRsZSA9IChzdGF0ZTogSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR01lc3NhZ2VUeXBlIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5TdWNjZXNzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIsOac3DEm2NoXCI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5FcnJvcjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJDaHliYVwiO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HTWVzc2FnZVR5cGUuV2FybmluZzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWYXJvdsOhbsOtXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFrDrXNrYW7DrSBhIG5hc3RhdmVuw60genByw6F2eSBvIGNoeWLEmyAqL1xyXG4gICAgICAgIGxldCBnZXRNZXNzYWdlID0gKG1lc3NhZ2U6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk5lem7DoW3DoSBjaHliYVwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdldEljb24gPSAoc3RhdGU6IEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR0RsZy5tYmlJbmZvO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HTWVzc2FnZVR5cGUuU3VjY2VzczpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gR0RsZy5tYmlTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HTWVzc2FnZVR5cGUuRXJyb3I6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdEbGcubWJpRXJyb3I7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5XYXJuaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBHRGxnLm1iaVdhcm5pbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFphdm9sw6Fuw60gZnVua2NlIHBybyB6b2JyYXplbsOtIHbDvXNsZWRrdSBvcGVyYWNlIC0gbm90aWZpY2F0aW9uIChkxZnDrXZlIGZsYXNoKSAqL1xyXG4gICAgICAgIGxldCBzaG93UmVzcG9uc2UgPSAocmVzcG9uc2U6IEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdSZXNwb25zZTxURHRvPiwgY29udGVudDogR0NvbnRlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLk1lc3NhZ2VzICE9IG51bGwgJiYgcmVzcG9uc2UuTWVzc2FnZXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLk1lc3NhZ2VzLmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuc2hvd0ZsYXNoKGdldE1lc3NhZ2UodmFsdWUuTWVzc2FnZSksIGdldFN0YXRlKHZhbHVlLlR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MubWVzc2FnZUJveChnZXRUaXRsZSh2YWx1ZS5UeXBlKSwgZ2V0TWVzc2FnZSh2YWx1ZS5NZXNzYWdlKSwgW0dEbGcubWJiT2tdLCBnZXRJY29uKHZhbHVlLlR5cGUpKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50Lm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IHRpdGxlOiBnZXRUaXRsZSh2YWx1ZS5UeXBlKSwgY29udGVudDogZ2V0TWVzc2FnZSh2YWx1ZS5NZXNzYWdlKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKGNvbnRlbnQsIFwiYWZ0ZXJQcm9jZXNzUmVzcG9uc2VcIiwgZ2V0TWVzc2FnZSh2YWx1ZS5NZXNzYWdlKSwgZ2V0U3RhdGUodmFsdWUuVHlwZSksICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb21pc2VcclxuICAgICAgICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT0gbnVsbCB8fCBnZXRTdWNjZXNzTXNnID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MgPT0gdHJ1ZSAmJiByZXNwb25zZS5TdWNjZXNzTXNnICE9IG51bGwgJiYgcmVzcG9uc2UuU3VjY2Vzc01zZy50cmltKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy5tZXNzYWdlQm94KGdldFRpdGxlKEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5TdWNjZXNzKSwgcmVzcG9uc2UuU3VjY2Vzc01zZywgW0dEbGcubWJiT2tdLCBHRGxnLm1iaVN1Y2Nlc3MpOyAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVtcIlJlc3BvbnNlc1wiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGVkUmVzcCA9IDxJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HR3JvdXBSZXNwb25zZTxURHRvPj5yZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZWRSZXNwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVkUmVzcC5TdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlQ29udGVudCA9IChjbG9zZU9uU3VjY2VzcyAmJiB0eXBlZFJlc3AuU3VjY2VzcykgfHwgKGNsb3NlT25GYWlsICYmICF0eXBlZFJlc3AuU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRDb250ZW50ID0gY2xvc2VDb250ZW50ICYmIGNvbnRlbnQucGFyZW50Q29udGVudCAhPSBudWxsID8gY29udGVudC5wYXJlbnRDb250ZW50IDogY29udGVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoIWNsb3NlQ29udGVudCB8fCAoY2xvc2VDb250ZW50ICYmIHRhcmdldENvbnRlbnQgIT09IGNvbnRlbnQpKSAmJiB0eXBlZFJlc3AuUmVzcG9uc2VzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWRSZXNwLlJlc3BvbnNlcy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1Jlc3BvbnNlKHZhbHVlLCB0YXJnZXRDb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuTWVzc2FnZXMgIT0gbnVsbCAmJiB2YWx1ZS5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLk1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnICs9IHZhbHVlLk1lc3NhZ2VzW2ldLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnICs9IFwiPGJyPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MuZXJyb3IoXCJOxJtrdGVyw6kga29udHJvbHkgc2tvbsSNaWx5IHMgY2h5Ym91XCIsIG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuZGlhbG9ncy5tZXNzYWdlQm94KGdldFRpdGxlKEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdNZXNzYWdlVHlwZS5XYXJuaW5nKSwgbXNnLCBbR0RsZy5tYmJPa10sIGdldEljb24oSW50ZXJmYWNlLkxLLklzbC5Db21tb24uR01lc3NhZ2VUeXBlLldhcm5pbmcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbG9zZSh0eXBlZFJlc3AuU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Qcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VbXCJNZXNzYWdlc1wiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGVkUmVzcCA9IDxJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HUmVzcG9uc2U8VER0bz4+cmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVkUmVzcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlZFJlc3AuU3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZUNvbnRlbnQgPSAoY2xvc2VPblN1Y2Nlc3MgJiYgdHlwZWRSZXNwLlN1Y2Nlc3MpIHx8IChjbG9zZU9uRmFpbCAmJiAhdHlwZWRSZXNwLlN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q29udGVudCA9IGNsb3NlQ29udGVudCAmJiBjb250ZW50LnBhcmVudENvbnRlbnQgIT0gbnVsbCA/IGNvbnRlbnQucGFyZW50Q29udGVudCA6IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZUNvbnRlbnQgfHwgKGNsb3NlQ29udGVudCAmJiB0YXJnZXRDb250ZW50ICE9PSBjb250ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1Jlc3BvbnNlKHR5cGVkUmVzcCwgdGFyZ2V0Q29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xvc2UodHlwZWRSZXNwLlN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VPblN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoKHhociwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIChjbG9zZU9uRmFpbCAmJiBjb250ZW50LnBhcmVudENvbnRlbnQgIT0gbnVsbCA/IGNvbnRlbnQucGFyZW50Q29udGVudCA6IGNvbnRlbnQpLmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZU9uRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmouRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuUHJvbWlzZS5yZWplY3QoeGhyLCB0eXBlLCBvYmopO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblByb21pc2UucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=