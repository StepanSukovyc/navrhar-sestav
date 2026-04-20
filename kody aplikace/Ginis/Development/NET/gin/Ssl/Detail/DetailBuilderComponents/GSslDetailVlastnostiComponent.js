(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailVlastnosti: {
            create: function (componentDto) {
                var result = {
                    onBuild: [
                        function () {
                            var cnt = this;

                            // thazmuka (01.07.2020) - přenos vlastností přes hledačku PIDu
                            this.descProps_setup({
                                readOnly: !this.EditMode,
                                selectIxx: function () {
                                    //#region -- selector Ixx --
                                    var dfd = $.Deferred();
                                    Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(cnt)
                                        .then(function (result) {
                                            if (result == null) {
                                                dfd.reject();
                                            }
                                            else {
                                                dfd.resolve({ ixx: result.ixp })
                                            }
                                        })
                                    return dfd.promise();
                                    //#endregion
                                }
                            });

                            this.enableSslDetailVlastnosti();
                            this.nasetujVlastnosti(this.SslDetailVlastnosti_Dto);
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        predUlozenimSslDetailVlastnosti: function () {
                            var promis = $.Deferred();
                            var obj = {};
                            var retVal = Gordic.PopisneVlastnosti.collectValues(this);
                            if (retVal) {
                                obj.Vlastnosti = retVal;
                            }
                            promis.resolve(obj);
                            return promis;
                            
                        },
                        nasetujVlastnosti: function (dto) {
                            Gordic.PopisneVlastnosti.applyValues(this, dto.dataVlastnosti);
                        },
                        //#region akce
                        
                        //#endregion
                        enableSslDetailVlastnosti: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                        }
                    },
                };
                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);