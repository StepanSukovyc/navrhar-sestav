(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslKpiDokument: {

            create: function (detailContent, componentDto) {

                var result = {};
                result.onInit = [function (builder) {
                    builder.kpiTabOptions = null;

                }];
                result.onBuild = [function () {
                   
                    this.SslKpisDokumentNastavKpi();
                }];
              
                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                    SslKpisDokumentNastavKpi: function () {

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
                        //dílčítermín

                        //if (this.kpis.kpiDilciTermin) { 
                        //    var dat_spl_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.TerminDilciDate))                                                                          // datum splatnosti
                        //    var dat_dns_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date());
                        //    // dnešní datum
                        //    var prekrocenTermin = false;
                        //    var rozdil = Gordic.Utils.DateTime.diff(dat_dns_Dil, dat_spl_Dil,  'days');
                        //    if (rozdil < 0) {
                        //        prekrocenTermin = true;
                        //    }

                        //    var rozdilAbs = Math.abs(rozdil);                                                                   // rozdíl dnů - absolutní hodnota

                        //    this.kpis.kpiDilciTermin.value = rozdilAbs;                                                                                        // naplnění value
                          
                        //    this.kpis.kpiDilciTermin.icon = prekrocenTermin ? "gi-vyrizenopo_bold  g-state-text g-state-error" : "gi-vyrizenopred_bold  g-state-text g-state-warning"  ;
                        //    this.kpis.kpiDilciTermin.primaryText = prekrocenTermin ? "jres:31937092" :  "jres:31937091" ;             //RC 31937092 : Počet dní <b>po dílčím termínu</b>
                        //    this.kpis.kpiDilciTermin.secondaryText = rozdilAbs;
                        //    this.kpis.kpiDilciTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.TerminDilciDate), "d.M.yyyy") + "</b>"
                        //        + " jres:31937171"  //RC 31937171 : to je
                        //        + " <b>" + rozdilAbs + "</b>"
                        //        + " jres:26256072"; //RC 26256072 : dní


                        //    this.kpis.kpiDilciTermin.meaning = prekrocenTermin ? "negative" : "warning"; //"positive" "info"
                        //    this.kpis.kpiDilciTermin.update();

                        //}
                        
                        //termín
                        if (this.kpis.kpiTermin) {

                            this.kpis.kpiTermin.icon = terminIcon;
                            this.kpis.kpiTermin.primaryText = terminText;

                            if (componentDto.dat_vyriz_do && componentDto.dat_vyriz) {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz));                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));                                                                   // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value

                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937459" //RC 31937459 : rozdíl byl
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            } else {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date());                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));                                                                   // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value

                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937171" //RC 31937171 : to je
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            }
                           

                            this.kpis.kpiTermin.update();
                        }

                        // pčidat upozornění na projití třeba ikonku do stavoveho Kpi

                        // ssl_upoztermdni pro spis
                        // ssl_upterdokdni pro dokument

                    }

                };
                result.kpis = [];
                //if (componentDto.TerminDilciDate) {
                //    result.kpis.push(new GObservableObject({
                //        name:"kpiDilciTermin",
                //        icon:"gi-detail",
                //        primaryText: "Dilčí termín",
                //        secondaryText: ""
                //    }));
                //}

                if (componentDto.dat_vyriz_do) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiTermin",
                        icon: "gi-plus",
                        primaryText: "Termín",
                        secondaryText: ""
                    }));
                }

                if (componentDto.EntitaJeKopie) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiEntitaJeKopie",
                        icon: "gi-copy",
                        primaryText: "Kopie",
                        meaning: "info",
                        //,secondaryText: ""
                        action: new GAction({
                            name: "actkpiEntitaJeKopie", caption: "", run: function () { 
                                if (typeof detailContent.kopieDokumentu === 'function') {
                                    detailContent.kopieDokumentu();
                                }
                            }
                        })
                    }));
                }
                 
                
                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);