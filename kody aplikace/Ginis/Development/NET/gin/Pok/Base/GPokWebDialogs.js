"use strict";
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            var GPokWebDialogs;
            (function (GPokWebDialogs) {
                function VyberDatumuDialogs(datum = new Date(0), popisField) {
                    var DT = Gordic.Utils.DateTime;
                    //return new Gordic.Forms.Form().addRow("jres:31302188").addField("gdatebox", { name: "dat_evid", initialValue: (moment(datum).isSame(new Date(0), "day") ? null : datum), validators: [new Gordic.Validators.Required()] });
                    return new Gordic.Forms.Form().addRow(popisField).addField("gdatebox", { name: "dat_evid", initialValue: (((DT.diff(DT.parse(datum), DT.parse(new Date(0)))) === 0) ? null : datum), validators: [new Gordic.Validators.Required()] });
                    //datum.valueOf() == test.valueOf(
                }
                GPokWebDialogs.VyberDatumuDialogs = VyberDatumuDialogs;
                //export function Pok3TlacDialog(that : any, text: string, text1Tlac: string, enabled1Tlac: boolean, text2Tlac: string, enabled2Tlac: boolean, text3Tlac: string, enabled3Tlac: boolean): Gordic.Forms.Form {
                //    this.dialogs.messageBox("Test", "Dlouhý text", {(text: "tlacitko1", id"1")} , GDlg.mbiQuestion);
                //}
                function DataPosDialogs() {
                    return new Gordic.Forms.Form()
                        .addRow("Terminál", true)
                        .addField("gselectbox", Gordic.Prefabs.Select.bucskap(), {
                        name: "pos_id", validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Číslo karty", true)
                        .addField("gstringbox", { name: "cislo_karty", validators: [new Gordic.Validators.Required()] })
                        .addRow("Autorizační kód", true)
                        .addField("gstringbox", { name: "autorizacni_kod", validators: [new Gordic.Validators.Required()] })
                        .addRow("Datum transakce")
                        .addField("gdatebox", { name: "datum_transakce", disabled: true })
                        .addRow("Číslo účtenky")
                        .addField("gstringbox", { name: "cislo_uctenky" })
                        .addRow("Částka", true)
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "castka", validators: [new Gordic.Validators.Required()]
                    });
                    //Terminál
                    //Číslo karty
                    //Autorizační kód
                    //Datum transakce
                    //Číslo účtenky
                    //Částka
                }
                GPokWebDialogs.DataPosDialogs = DataPosDialogs;
                function VyberDataVOtevrObdobi(prednastaveneDatum = new Date(0), aktualniDatum = true) {
                    var def = $.Deferred();
                    if (prednastaveneDatum == new Date(0)) {
                        prednastaveneDatum = new Date();
                        def.resolve(prednastaveneDatum);
                    }
                    else {
                        new GContent("Gordic.Pok.WebClient.GPokWebContent").call("JeDatumVOtevrObdobi", { datum: prednastaveneDatum }) //prověřit,asi nebude fungovat
                            .done(function (data) {
                            if (!data) {
                                if (aktualniDatum) {
                                    prednastaveneDatum = new Date();
                                    def.resolve(prednastaveneDatum);
                                }
                                else {
                                    new GContent("Gordic.Pok.WebClient.GPokWebContent").call("PrvniDenVOtevrObdobiOdData", { datum: prednastaveneDatum })
                                        .done(function (data) {
                                        prednastaveneDatum = data;
                                        if (prednastaveneDatum == null)
                                            prednastaveneDatum = new Date();
                                        def.resolve(prednastaveneDatum);
                                    })
                                        .fail(function (xhr, type, vobj) { def.reject(); });
                                }
                            }
                            else {
                                def.resolve(prednastaveneDatum);
                            }
                        })
                            .fail(function (xhr, type, vobj) {
                            def.reject();
                        });
                    }
                    return def.promise();
                }
                GPokWebDialogs.VyberDataVOtevrObdobi = VyberDataVOtevrObdobi;
            })(GPokWebDialogs = WebClient.GPokWebDialogs || (WebClient.GPokWebDialogs = {}));
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            var GPokFlash;
            (function (GPokFlash) {
                function showFlashWarning(that, text) {
                    that.hideFlash("flashWarning");
                    that.hideFlash("flashInfo");
                    that.hideFlash("flashError");
                    that.hideFlash("flashSucces");
                    that.showFlash({ id: "flashWarning", icon: "", label: text, customClass: "g-state-warning" });
                }
                GPokFlash.showFlashWarning = showFlashWarning;
                function showFlashError(that, text) {
                    that.hideFlash("flashWarning");
                    that.hideFlash("flashInfo");
                    that.hideFlash("flashError");
                    that.hideFlash("flashSucces");
                    that.showFlash({ id: "flashError", icon: "", label: text, customClass: "g-state-error" });
                }
                GPokFlash.showFlashError = showFlashError;
                function showFlashSuccess(that, text) {
                    that.hideFlash("flashWarning");
                    that.hideFlash("flashInfo");
                    that.hideFlash("flashError");
                    that.hideFlash("flashSucces");
                    that.showFlash({ id: "flashSucces", icon: "gi-tick", label: text, customClass: "g-state-success" });
                }
                GPokFlash.showFlashSuccess = showFlashSuccess;
                function showFlashInfo(that, text) {
                    that.hideFlash("flashWarning");
                    that.hideFlash("flashInfo");
                    that.hideFlash("flashError");
                    that.hideFlash("flashSucces");
                    that.showFlash({ id: "flashInfo", icon: "", label: text, customClass: "g-state-info" });
                }
                GPokFlash.showFlashInfo = showFlashInfo;
            })(GPokFlash = WebClient.GPokFlash || (WebClient.GPokFlash = {}));
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1dlYkRpYWxvZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rV2ViRGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBcUdmO0FBckdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFHbkI7SUFyR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFHN0I7UUFyR29CLFdBQUEsU0FBUztZQUFDLElBQUEsY0FBYyxDQXFHNUM7WUFyRzhCLFdBQUEsY0FBYztnQkFFekMsU0FBZ0Isa0JBQWtCLENBQUMsUUFBYyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFtQjtvQkFFNUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQy9CLDZOQUE2TjtvQkFDN04sT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBS3ZPLGtDQUFrQztnQkFDdEMsQ0FBQztnQkFWZSxpQ0FBa0IscUJBVWpDLENBQUE7Z0JBRUQsNk1BQTZNO2dCQUU3TSxzR0FBc0c7Z0JBQ3RHLEdBQUc7Z0JBRUgsU0FBZ0IsY0FB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RUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RyxDQUFDO2dCQVBlLDBCQUFnQixtQkFPL0IsQ0FBQTtnQkFFRCxTQUFnQixhQUFhLENBQUMsSUFBUyxFQUFFLElBQVk7b0JBR2pELElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDNUYsQ0FBQztnQkFSZSx1QkFBYSxnQkFRNUIsQ0FBQTtZQUVMLENBQUMsRUF4QzhCLFNBQVMsR0FBVCxtQkFBUyxLQUFULG1CQUFTLFFBd0N2QztRQUFELENBQUMsRUF4Q29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXdDN0I7SUFBRCxDQUFDLEVBeENnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF3Q25CO0FBQUQsQ0FBQyxFQXhDUyxNQUFNLEtBQU4sTUFBTSxRQXdDZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViRGlhbG9ncyB7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZ5YmVyRGF0dW11RGlhbG9ncyhkYXR1bTogRGF0ZSA9IG5ldyBEYXRlKDApLHBvcGlzRmllbGQgOiBzdHJpbmcpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIHZhciBEVCA9IEdvcmRpYy5VdGlscy5EYXRlVGltZTtcclxuICAgICAgICAvL3JldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oKS5hZGRSb3coXCJqcmVzOjMxMzAyMTg4XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9ldmlkXCIsIGluaXRpYWxWYWx1ZTogKG1vbWVudChkYXR1bSkuaXNTYW1lKG5ldyBEYXRlKDApLCBcImRheVwiKSA/IG51bGwgOiBkYXR1bSksIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpLmFkZFJvdyhwb3Bpc0ZpZWxkKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfZXZpZFwiLCBpbml0aWFsVmFsdWU6ICgoKERULmRpZmYoRFQucGFyc2UoZGF0dW0pLCBEVC5wYXJzZShuZXcgRGF0ZSgwKSkpKSA9PT0gMCkgPyBudWxsIDogZGF0dW0pLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pO1xyXG5cclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgLy9kYXR1bS52YWx1ZU9mKCkgPT0gdGVzdC52YWx1ZU9mKFxyXG4gICAgfVxyXG5cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIFBvazNUbGFjRGlhbG9nKHRoYXQgOiBhbnksIHRleHQ6IHN0cmluZywgdGV4dDFUbGFjOiBzdHJpbmcsIGVuYWJsZWQxVGxhYzogYm9vbGVhbiwgdGV4dDJUbGFjOiBzdHJpbmcsIGVuYWJsZWQyVGxhYzogYm9vbGVhbiwgdGV4dDNUbGFjOiBzdHJpbmcsIGVuYWJsZWQzVGxhYzogYm9vbGVhbik6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuXHJcbiAgICAvLyAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcIlRlc3RcIiwgXCJEbG91aMO9IHRleHRcIiwgeyh0ZXh0OiBcInRsYWNpdGtvMVwiLCBpZFwiMVwiKX0gLCBHRGxnLm1iaVF1ZXN0aW9uKTtcclxuICAgIC8vfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBEYXRhUG9zRGlhbG9ncygpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVGVybWluw6FsXCIsIHRydWUpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb3NfaWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zbG8ga2FydHlcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiY2lzbG9fa2FydHlcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXX0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJBdXRvcml6YcSNbsOtIGvDs2RcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiYXV0b3JpemFjbmlfa29kXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV19KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdHJhbnNha2NlXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXR1bV90cmFuc2FrY2VcIiAsIGRpc2FibGVkOiB0cnVlfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zbG8gw7rEjXRlbmt5XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImNpc2xvX3VjdGVua3lcIiB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2FcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjYXN0a2FcIiwgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAvL1Rlcm1pbsOhbFxyXG4gICAgICAgIC8vxIzDrXNsbyBrYXJ0eVxyXG4gICAgICAgIC8vQXV0b3JpemHEjW7DrSBrw7NkXHJcbiAgICAgICAgLy9EYXR1bSB0cmFuc2FrY2VcclxuICAgICAgICAvL8SMw61zbG8gw7rEjXRlbmt5XHJcbiAgICAgICAgLy/EjMOhc3RrYVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZ5YmVyRGF0YVZPdGV2ck9iZG9iaShwcmVkbmFzdGF2ZW5lRGF0dW06IEpzb25EYXRlID0gbmV3IERhdGUoMCksIGFrdHVhbG5pRGF0dW06IGJvb2xlYW4gPSB0cnVlKTogSlF1ZXJ5UHJvbWlzZTxEYXRlPiB7XHJcblxyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIGlmIChwcmVkbmFzdGF2ZW5lRGF0dW0gPT0gbmV3IERhdGUoMCkpIHtcclxuXHJcbiAgICAgICAgICAgIHByZWRuYXN0YXZlbmVEYXR1bSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGRlZi5yZXNvbHZlKHByZWRuYXN0YXZlbmVEYXR1bSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5ldyBHQ29udGVudChcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJDb250ZW50XCIpLmNhbGwoXCJKZURhdHVtVk90ZXZyT2Jkb2JpXCIsIHsgZGF0dW06IHByZWRuYXN0YXZlbmVEYXR1bSB9KS8vcHJvdsSbxZlpdCxhc2kgbmVidWRlIGZ1bmdvdmF0XHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0dWFsbmlEYXR1bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZG5hc3RhdmVuZURhdHVtID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHByZWRuYXN0YXZlbmVEYXR1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViQ29udGVudFwiKS5jYWxsKFwiUHJ2bmlEZW5WT3RldnJPYmRvYmlPZERhdGFcIiwgeyBkYXR1bTogcHJlZG5hc3RhdmVuZURhdHVtIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGE6IERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZG5hc3RhdmVuZURhdHVtID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRuYXN0YXZlbmVEYXR1bSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZG5hc3RhdmVuZURhdHVtID0gbmV3IERhdGUoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShwcmVkbmFzdGF2ZW5lRGF0dW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikgeyBkZWYucmVqZWN0KCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHByZWRuYXN0YXZlbmVEYXR1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoV2FybmluZyh0aGF0OiBhbnksIHRleHQ6IHN0cmluZykge1xyXG5cclxuICAgICBcclxuICAgICAgICB0aGF0LmhpZGVGbGFzaChcImZsYXNoV2FybmluZ1wiKTtcclxuICAgICAgICB0aGF0LmhpZGVGbGFzaChcImZsYXNoSW5mb1wiKTtcclxuICAgICAgICB0aGF0LmhpZGVGbGFzaChcImZsYXNoRXJyb3JcIik7XHJcbiAgICAgICAgdGhhdC5oaWRlRmxhc2goXCJmbGFzaFN1Y2Nlc1wiKTtcclxuICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoV2FybmluZ1wiLCBpY29uOiBcIlwiLCBsYWJlbDogdGV4dCwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS13YXJuaW5nXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNob3dGbGFzaEVycm9yKHRoYXQ6IGFueSwgdGV4dDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hXYXJuaW5nXCIpO1xyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hJbmZvXCIpO1xyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hFcnJvclwiKTtcclxuICAgICAgICB0aGF0LmhpZGVGbGFzaChcImZsYXNoU3VjY2VzXCIpO1xyXG4gICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hFcnJvclwiLCBpY29uOiBcIlwiLCBsYWJlbDogdGV4dCwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1lcnJvclwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzaG93Rmxhc2hTdWNjZXNzKHRoYXQ6IGFueSwgdGV4dDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hXYXJuaW5nXCIpO1xyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hJbmZvXCIpO1xyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hFcnJvclwiKTtcclxuICAgICAgICB0aGF0LmhpZGVGbGFzaChcImZsYXNoU3VjY2VzXCIpO1xyXG4gICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hTdWNjZXNcIiwgaWNvbjogXCJnaS10aWNrXCIsIGxhYmVsOiB0ZXh0LCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2hvd0ZsYXNoSW5mbyh0aGF0OiBhbnksIHRleHQ6IHN0cmluZykge1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hXYXJuaW5nXCIpO1xyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hJbmZvXCIpO1xyXG4gICAgICAgIHRoYXQuaGlkZUZsYXNoKFwiZmxhc2hFcnJvclwiKTtcclxuICAgICAgICB0aGF0LmhpZGVGbGFzaChcImZsYXNoU3VjY2VzXCIpO1xyXG4gICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hJbmZvXCIsIGljb246IFwiXCIsIGxhYmVsOiB0ZXh0LCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWluZm9cIiB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=