(function ($) {
    "use strict";
    namespace("Gordic.Ssl.MainApp", {

        // obsolete
        ShowDetail: function (parentContent, opt, ModOtevreni) {
            var options = {
                DetailDto: {ixp: opt.ixp},
                EditMode: opt.EditMode,
                grid: opt.grid,
                TypSpis: opt.TypSpis,
                WithKontrolaMetadat: opt.WithKontrolaMetadat,
            };

            return Gordic.Ssl.Dialogs.Detail(parentContent, options, ModOtevreni);
        },

        // podani
        NovyVlastniDokument: function (cnt, customDokOpt) {
            var options = {
                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
            };
            Gordic.Wfl.Dialogs.GenerovaniIxp(null, options, 'showModalWindow').done(function (retVal, content) {
                if (retVal) {
                    SslMainNameSpace.ShowDetailPoVygenerovaniIxp(retVal, 1, cnt, customDokOpt); //1==vlastni
                }
            });
        },
        NovyCiziDokument: function (cnt,customDokOpt) {
            var options = {
                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Cizi,
                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
            };

            // *** test EVZ ***
            //options = {
            //    TypDok: Gordic.Wfl.Globals.Enums.TypDok.Cizi,
            //    TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
            //    DotazPriExistenciVJineAgende: true,
            //    HlaseniPriExistenciVAgende: false,
            //    ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremGinGenIxp
            //};
            //***

            Gordic.Wfl.Dialogs.GenerovaniIxp(null, options, 'showModalWindow').done(function (retVal, content) {
                if (retVal) {
                    SslMainNameSpace.ShowDetailPoVygenerovaniIxp(retVal, 2, cnt, customDokOpt); // 2==cizí
                }
            });
        },
        ShowDetailPoVygenerovaniIxp: function (rv, rezimPodani, content, customDokOpt) {
            if(rv != null) {
                var modOtevreni = Gordic.Global.Enums.ModOtevreni.navigateTask;

                if(content != null) {
                    modOtevreni = Gordic.Global.Enums.ModOtevreni.navigate;
                }

                if (rv.IxpExist === false) {
                    // GetGlobalManager().SendClassMessage(this, 'Default', 'OpenDetailNovy', \"?ixp=\" + rv.Ixp + \"&CiziVlastni=Cizi\");
                    //GDlg.alert("Zde má následovat otevreni detailu v režimu podání s ixp: " + rv.Ixp);
                    var params = {
                        DetailDto: { ixp: rv.Ixp },
                        RezimPodani: rezimPodani,
                        //TypDokumentuFilterDto: { ktg_typ: [1933,10]}
                    };
                    var newOpt = customDokOpt != null ? $.extend(true, params, customDokOpt) : params ; 
                    Gordic.Ssl.Dialogs.Detail(content, newOpt, modOtevreni);
                } else { // pokud ixp jiz existuje zobrazim detail
                    var params2 = {
                        DetailDto: { ixp: rv.Ixp },
                    };
                    Gordic.Ssl.Dialogs.Detail(content, params2, modOtevreni);
                }
            }
        },

        ShowHistoriiNavstivenychIxp: function () {
            Gordic.Ssl.Dialogs.HistorieNavstivenychDokumentuDlg(null, {});
            // ponechano v bredcrump
            //.on("close", function (ev, retVal) {
            //if (retVal) {
            //    var options = {
            //        ixp: retVal,
            //    };
            //    SslMainNameSpace.ShowDetail(options);
            //}
            //});
        },



    }, { pure: true });
})(jQuery);

var SslMainNameSpace = namespace("Gordic.Ssl.MainApp");