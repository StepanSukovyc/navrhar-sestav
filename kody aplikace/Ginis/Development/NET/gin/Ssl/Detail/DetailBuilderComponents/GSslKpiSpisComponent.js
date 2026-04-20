(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslKpiSpis: {

            create: function (detailContent, componentDto) {

                var result = {};
                //result.onInit = [function (builder) {
                    
                //}];
                result.onBuild = [function () {
                    this.SslKpisSpisNastavKpi();
                }];

                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                    SslKpisSpisNastavKpi: function () {
                        //termín
                        var terminText = "";
                        var terminIcon = "fa-fw";
                        var polestavu = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru;
                        if (polestavu) { 
                            for (var i = 0; i < polestavu.length; i++) {

                                // termin
                                if (polestavu[i].name === "actTerminStatus") {
                                    terminIcon = polestavu[i].icon;
                                    terminText = polestavu[i].tooltip;
                                }
                            }
                        }
                        if (this.kpis.kpiTermin) {

                            this.kpis.kpiTermin.icon = terminIcon;
                            //this.kpis.kpiTermin.meaning = componentDto.stav_pisColour;
                            this.kpis.kpiTermin.primaryText = terminText;

                            if (componentDto.dat_vyriz_do && componentDto.dat_vyriz) {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz));                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));
                                // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value
                                //this.kpis.kpiTermin.secondaryText = rozdil;
                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937459" //RC 31937459 : rozdíl byl
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            }
                            else {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date());                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));
                                // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value
                                //this.kpis.kpiTermin.secondaryText = rozdil;
                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937171" //RC 31937171 : to je
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            }

                            this.kpis.kpiTermin.update();
                        }
                    },
                    detailDiluKpiSpisComponent: function () {
                        var that = this;
                        if (componentDto.IxpDil) {
                            var opt = {
                                DetailDto: {
                                    ixp: componentDto.IxpDil
                                },
                            };
                            this.otevriNovyDetail(opt);
                        }
                    }
                };
                result.kpis = [];

                if (componentDto.dat_vyriz_do) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiTermin",
                        icon: "gi-plus",
                        primaryText: "jres:31937434", //RC 31937434 : Termín
                        secondaryText: ""
                    }));
                }

                if (componentDto.IxpDil) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiPoziceDil",
                            icon: 'gi-spis_dil',
                            //icon: "gi-folder_bold_D",
                            primaryText: "jres:31937544", //RC 31937544 : Vloženo v dílu
                            //secondaryText: "",
                            action: new GAction({
                                name: "actKpiPoziceDil", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.detailDiluKpiSpisComponent(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                }
                            }),
                            toolbar: {
                                top: function () {
                                    return [{
                                        action: new GAction(
                                            Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                                                //inputData: {
                                                //    ixp: componentDto.ixp
                                                //},
                                                inputData: function () {
                                                    var ixp = null;
                                                    if (componentDto.IxpDil) {
                                                        ixp = componentDto.IxpDil;
                                                    }
                                                    return { ixp: ixp };
                                                },
                                                done: function (retVal) {
                                                    ;
                                                },
                                                fail: function () {
                                                    $.content(this).showFlash(
                                                        "jres:31937457", //RC 31937457 : Novou záložku se nepodařilo otevřít.
                                                        Gordic.Global.Enums.ColorStateClass.error,
                                                        undefined,
                                                        "actOteveniNoveZalozky"
                                                    );
                                                },
                                                actionParams: {
                                                    name: "actOtevreDilDoNoveZalozky",
                                                    icon: "fa-external-link",
                                                    captionVisible: "never",
                                                    tooltip: 'jres:31937545', //RC 31937545 : Otevře díl do nové záložky
                                                }

                                            })
                                        )
                                    }];
                                }
                            }
                        })
                    );

                }

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);