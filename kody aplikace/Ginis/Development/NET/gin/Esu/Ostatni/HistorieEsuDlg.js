
(function ($) {
    namespace("Gordic.Esu.WebClient.HistorieEsuDlg", {

        onContentReady: function () {
            var that = this;
            this.newOps({ title: "jres:26265093"});

            this.actions.add(new GAction({
                name: "actGridDoubleClick",
                caption: "jres:26265385", //RC 26265385 : Podrobnosti
                run: function (ev, ctx) {
                    that.podrobnosti();
                }
            }));
            this.initHistory();

        },

        createSpecificMenu: function () {

            var that = this;
            var basicMenu = [];
            //var basicMenu = this.createDefaultMenu();

            //actZmeny

            this.actions.addRange({
                actDetail: {
                    caption: "jres:26265073", //RC 26265073 : Detail
                    run: function () {
                        that.detailEx();
                    }
                }

                //actPodrobnosti: {
                //    caption: "Podrobná Historie",
                //    run: function () {

                        
                //    }
                //},

                //actZastup: {
                //    caption: "Historie Zástupu",
                //    run: function () {


                //    }
                //},
               
            });

            basicMenu.push.apply(basicMenu, this.actions.createBar(["actDetail*", "actGridDoubleClick*"]));

            return basicMenu;
        },

        createSpecificGridFormat: function (format) {

            format
                .addIconColumn({
                    name: "ico",
                    caption: "jres:26265328", //RC 26265328 : Stav
                    //customClass: "center",
                    width: 40,
                    //fixedWidth: true,
                    iconTemplate: function (data) {

                        if (data.color === "red") {
                            return { icon: "gi-window-close g-state-text g-state-important", tooltip: data.stav };
                         
                        } else {
                            return null;
                        }
                    }
                            
                })
                .addTextColumn({ name: "esu_txt_ext", caption: "jres:26265098",  fixedWidth: false }) //RC 26265098 : Externí subjekt
                .addDateTimeColumn({ name: "dat_mpd_datetime", caption: "jres:26265326",  fixedWidth: false }) //RC 26265326 : Datum vytvoření
                .addTextColumn({ name: "vytvoril_zmenu_prov_rf", caption: "jres:31900529",  fixedWidth: false }) //RC 31900529 : Vytvořil
                .addTextColumn({ name: "typ_ag_txt", caption: "jres:26265327", fixedWidth: false }) //RC 26265327 : Agenda
                .addDateTimeColumn({ name: "dat_zmena", caption: "jres:26265272", fixedWidth: false }) //RC 26265272 : Datum změny
                .addTextColumn({ name: "zmenu_prov_rf", caption: "jres:26265161", fixedWidth: false }) //RC 26265161 : Změnu provedl
                .addTextColumn({ name: "stupen_ver_txt", caption: "jres:26265323", fixedWidth: false }) //RC 26265323 : Stupeň verifikace
                .addTextColumn({ name: "stav", caption: "jres:26265328", fixedWidth: false }) //RC 26265328 : Stav
                .addTextColumn({ name: "ixs_esu", caption: "jres:26265221", fixedWidth: false }); //RC 26265221 : ID

            return format;

        },

        detailEx: function () {
            var that = this;
            //var sel = that.gridKartoteka.ggrid("getSelection")[0];
            var sel = that.grid.ggrid("activeRow");
            if (sel) {
                var opt = {
                    IxsEsu: sel.ixs_esu,
                    Ucel: 1,
                    Logovani: this.Logovani,
                    LzePrepnoutZDetailuNaEditaci: false
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(that, opt);

            } else {
                that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
            }
        },

        podrobnosti: function () {
            var that = this;
            //var sel = that.gridKartoteka.ggrid("getSelection")[0];
            var sel = that.grid.ggrid("activeRow");
            if (sel) {
                var InputDto = {
                    ixsEsu: sel.ixs_esu
                };
                var options = {
                    InputDto: InputDto,
                };

                Gordic.Esu.Dialogs.HistoriePodrobnaDlg(this, options);
            } else {
                that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
            }
        },

        closeDet: function () {
            this.tryClose();
        },

    }, { extendIntellisense: GContent });          

})(jQuery);