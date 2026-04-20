(function ($) {
    "use strict";
    namespace("Gordic.Wfl.MainApp", {

        ShowDetail: function (parentContent, opt, ModOtevreni) {
            var options = {
                DetailDto: { ixp: opt.ixp },
                EditMode: opt.EditMode,
                grid: opt.grid,
                TypSpis: opt.TypSpis,
                WithKontrolaMetadat: opt.WithKontrolaMetadat,
            };

            return Gordic.Wfl.Dialogs.DetailDokumentuSpisu(parentContent, options, ModOtevreni);
        },

        Lupa: function (content) {
            Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(content, {})
                .then(function (retVal) {
                    if (retVal && retVal.ixp) {
                        Gordic.Gin.WebClient.OtevriDetail(retVal.ixp)
                            .done(function (ret) {
                                if (ret.openItSelf) {
                                    //var options = {
                                    //    ixp: retVal.ixp
                                    //};
                                    //Gordic.Ssl.MainApp.ShowDetail(content, options); // v tomto pripade se otevira v dialogu. Pokud se otevira z hlavniho contentu, musi se pouzit 'navigateTask' - detekovat typ kontentu uvnitr Gordic.Ssl.MainApp.ShowDetail nebo v Gordic.Ssl.Dialogs.Detail
                                    var options = {
                                        DetailDto: { ixp: retVal.ixp },
                                        //EditMode: opt.EditMode,
                                        //grid: opt.grid,
                                        //TypSpis: opt.TypSpis
                                    };

                                    return Gordic.Wfl.Dialogs.DetailDokumentuSpisu(content, options);
                                } else {
                                    content.dialogs.alert("jres:31926674") //RC 31926674 : Detail byl otevřen v další kartě prohlížeče.
                                }
                            })
                            .fail(function (ret) {
                                var text = ret.ErrorTxt;
                                if (ret.info && ret.info && ret.info.typ_ag) {
                                    text = text + " " + "jres:31926675" + ": " + ret.info.typ_ag; //RC 31926675 : typ agendy je
                                }
                                //console.log(text);
                                content.dialogs.alert("jres:31926676", text); //RC 31926676 : Informace
                                // Dsebesta - 18.12.2019 - odstraněno upozornění.
                            });
                    }
                });
        },

        RegisterShortcutLupa: function (cnt) {
            if (cnt.actions.actLupa != null) {
                $(document.body).gshortcut({
                    // klávesová zkratka
                    key: "alt+h",
                    // akce, která je spuštěna po zmáčknutí kombinace. Pokud akce není enabled, není enabled ani zkratka.
                    action: cnt.actions.actLupa,
                    // popis klávesové zkratky pro zobrazení v nápovědě. Pokud není zadán, je použit caption z akce.
                    description: "jres:31926672",	//RC 31926672 : Hledání dle PID
                    group: Gordic.Shortcuts.Groups.App
                });
            }
        },

        KartotekaEsu: function () {
            var that = this;

            //  var ginEsuLseznPar = parseInt("dbparam:gin_esu_lsezn:0");

            /*  if(Gordic.Wfl.MainApp.GinEsuLseznPar == 1) {
                  var l_sLabel = "jres:26215534"; //RC 26215534 : Důvod hledání v kartotéce
                  GDlg.prompt("jres:26215533", l_sLabel).on("ok", function (ev, duvod) { //RC 26215533 : Dotaz
                      if(duvod != null && duvod.trim() != "") {
                          Gordic.Esu.Dialogs.KartotekaEsuDlg(null, 'navigateTask', 2, { Ixp: '0000X000004J', DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace, AktZnacka: '', DuvodHledaniTxt: duvod });
                      } else {
                          GDlg.alert("jres:26215535"); //RC 26215535 : Je nutné uvést důvod hledání v kartotéce externích subjektů.
                      }
                  });
              } else {
                  Gordic.Esu.Dialogs.KartotekaEsuDlg(null, 'navigateTask', 2, { Ixp: '0000X000004J', DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace, AktZnacka: '', DuvodHledaniTxt: '' });
              }*/
            var options = {
               // Ucel: 2,
                Logovani: { Ixp: '0000X000004J', DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace, AktZnacka: '', DuvodHledaniTxt: '' }
            };
            Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain(null, options , 'navigateTask');
        },

        RozdelovnikEsu: function () {
            var that = this;
            var Logovani = {
                Ixp: '0000X000004J',
                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace,
                AktZnacka: ''
            };
            var options = {
                ID: "ESUSkupinyEsuDlg#",
                Logovani: Logovani,
                SkupinyWorkingMode: 0
            };

            Gordic.Esu.Dialogs.RozdelovnikEsuDlgFromMain(null, options, 'navigateTask');
        },

        RozdelovnikIsu: function () {
            var that = this;
            var options = {};

            Gordic.Gin.Dialogs.RozdelovnikISUDlg(null, options, 'navigateTask');
        },

        SzrVyberAgendy: function () { 
            var that = this;
            var Logovani = {
                Ixp: '0000X000004J',
                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace,
                AktZnacka: ''
            };
            var options = {
                ID: "NastaveniSZR#",
                Logovani: Logovani,
                taskId: 'actNastaveniSZR'
            };

            Gordic.Esu.Dialogs.GSzrVyberAgendyDlg(null, options, 'navigateTask');
        },

    }, { pure: true });
})(jQuery);

var WflMainNameSpace = namespace("Gordic.Wfl.MainApp");