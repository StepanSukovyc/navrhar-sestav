(function ($) {
    "use strict";
    namespace("Gordic.Ssl.List", {

        SslInit: function () {
            var that = this;

            this.actions.addRange({
                actPoznamkovyBlokPridatSsl: {
                    name: "actPoznamkovyBlokPridatSsl",
                    icon: ["gi-calendar-interval", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb"],
                    caption: "jres:26255318", //RC 26255318 : Přidat do poznámkového bloku
                    run: function (ev, ctx) {

                        var saveToPoznamkovyBlok = function (ixsBlp) {
                            if (ixsBlp === undefined) {
                                ixsBlp = "";
                            }

                            var selectedRowsInfo = that.GetIxpArrayFromSelection();

                            that.call("SaveToPoznamkovyBlok", { IxsBlp: ixsBlp, SelectedIxp: selectedRowsInfo })
                                .done(function (rv) {
                                    GDlg.alert("jres:26256712"); //RC 26256712 : Dokumenty byly vloženy do poznámkového bloku.
                                })
                                .fail(function (rv) {
                                    GDlg.alert("jres:26256713"); //RC 26256713 : Nepodařilo se vložit do poznámkového bloku.
                                })
                                .always(function () {
                                    // that.endOperation();
                                });
                        }

                        if (this.VyberPoznBloku === true) {
                            Gordic.Ssl.Dialogs.PoznamkoveBlokyDlg(that, {}).on("close", function (ev, retVal) {
                                if (retVal) {
                                    saveToPoznamkovyBlok(retVal.ixsBlp);
                                }
                            });
                        } else {
                            saveToPoznamkovyBlok();
                        }
                    }
                },
                actVlozitDoSpisuSsl: {
                    name: "actVlozitDoSpisuSsl",
                    icon: ["gi-folder", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb"],
                    caption: "jres:26255159", //RC 26255159 : Vložit do spisu
                    run: function (ev, ctx) {
                        var selectedRowsInfo = that.GetSelectedRowsInfoFromList();

                        Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(that, {}, "navigate").on("close", function (ev, retVal) {
                            if (retVal && retVal.ixp) {
                                var ixpSpis = retVal.ixp;

                                var srv = new GContent({ className: "Gordic.Wfl.WebClient.GWflUtils", params: { } });  //servisni sluzba/content

                                srv.call("GetPristup", { Ixp: ixpSpis })
                                    .done(function (rv) {
                                        var l_oVlozitDoSpisuFce = function (ixpSpis, selectedRowsInfo, flagUserZmenaRizeny) {
                                            that.call("VlozitDoSpisu", { IxpSpis: ixpSpis, SelectedRowsInfo: selectedRowsInfo, FlagUserZmenaRizeny: flagUserZmenaRizeny })
                                                .done(function (rv) {
                                                    that.showFlash("jres:26256774", "g-state-info", that.flashPanelTimer); //RC 26256774 : Dokumenty byly vloženy do spisu.
                                                })
                                                .fail(function (rv) {
                                                    that.showFlash("jres:26256775", "g-state-error", that.flashPanelTimer); //RC 26256775 : Nepodařilo se vložit dokumenty do spisu.
                                                })
                                                .always(function () {
                                                    that.Reload();
                                                });
                                        }

                                        if(rv.stUtajId == 40) {
                                            GDlg.confirm("26256676", "jres:26256451").on("close", function (ev, retVal) {  //RC 26256451 : Spis má nastaven řízený přístup. Přejete si nastavit řízený přístup i u vkládaných dokumentů?
                                                if (retVal) {
                                                    var l_bFlagUserZmenaRizeny = retVal === "yes";

                                                    l_oVlozitDoSpisuFce(ixpSpis, selectedRowsInfo, l_bFlagUserZmenaRizeny);
                                                }
                                            });
                                        } else {
                                            l_oVlozitDoSpisuFce(ixpSpis, selectedRowsInfo, false);
                                        }
                                    })
                                    .fail(function (rv) {
                                        that.showFlash("jres:26256775", "g-state-error", that.flashPanelTimer); //RC 26256775 : Nepodařilo se vložit dokumenty do spisu.
                                    });
                            }
                        });
                    }
                },
                actOznacitJakoPrecteneSsl: {
                    name: "actOznacitJakoPrecteneSsl",
                    icon: "gi-mail-open",
                    caption: "jres:26256814", //RC 26256814 : Označit jako přečtené
                    run: function (ev, ctx) {
                        that.OznacDokumentyJakoPrectene(true);
                    }
                },
                actOznacitJakoNeprecteneSsl: {
                    name: "actOznacitJakoNeprecteneSsl",
                    icon: "gi-mail2",
                    caption: "jres:26256815", //RC 26256815 : Označit jako nepřečtené
                    run: function (ev, ctx) {
                        that.OznacDokumentyJakoPrectene(false);
                    }
                },
            });
        },
        OznacDokumentyJakoPrectene: function (flagPrecteni) {
            var that = this;

            var selectedRowsInfo = that.GetSelectedRowsInfoFromList();
            that.call("OznacDokumentyJakoPrectene", { SelectedRowsInfo: selectedRowsInfo, FlagPrecteni: flagPrecteni })
              /*  .done(function (rv) {

                })
                .fail(function (rv) {

                })*/
                .always(function () {
                    that.Reload();
                    // todo - nacist jen menene radky a aktualizovat je v gridu
                });

        }

    }, { extendIntellisense: GContent });
})(jQuery);