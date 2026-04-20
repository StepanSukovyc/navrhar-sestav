
(function ($) {
    namespace("Gordic.Esu.WebClient.HistoriePodrobnaDlg", {

        onContentReady: function () {
            var that = this;
            this.newOps({ title: "jres:31900530"});

            this.actions.add(new GAction({
                name: "actGridDoubleClick",
                caption: "jres:26265385", //RC 26265385 : Podrobnosti
                run: function (ev, ctx) {
                    $.noop();
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
                actZmeny: {
                    customClass: "historie-zmeny",
                    caption: "jres:26265098", //RC 26265098 : Externí subjekt
                    checked: true,
                    run: function () {
                        //that.NacistZastupy = false;
                        //that.NacistZastupy = false;
                        that.call("NactiZmenyPreneseniHodnoty", { nactiZastup:false}).then(function (data) {
                            that.gridBuilderZmeny(data);
                        });
                        
                        that.actions.actZastupy.update({ checked: false });            // skrytí tlačítka podrobnosti
                        this.update({ checked: true });
                    }
                },

                actZastupy: {
                    customClass: "historie-redistribuce",
                    caption: "jres:26265207", //RC 26265207 : Zástupné osoby
                    run: function () {

                        //that.NacistZastupy = true;
                        //that.NacistZastupy = true;
                        that.call("NactiZmenyPreneseniHodnoty", { nactiZastup: true }).then(function (data) {
                            that.gridBuilderZmeny(data);
                        });

                        that.actions.actZmeny.update({ checked: false });            // skrytí tlačítka podrobnosti
                        this.update({ checked: true });
                    }
                }
            });

            basicMenu.push.apply(basicMenu, this.actions.createBar(["actZmeny*", "actZastupy*"]));

            return basicMenu;
        },

        createSpecificGridFormat: function (format) {
            var that = this;
            //this.NacistZastupy
            format.addIconColumn({
                name: "zmena_esu",
                caption: "jres:26265383", //RC 26265383 : Změna
                //customClass: "center",
                width: 40,
                //fixedWidth: true,
                iconTemplate: function (data) {
                    if (data.zmena_esu === 500) {
                        return { icon: "gi-ros", tooltip: data.zmena_esu_txt };

                    } else if (data.zmena_esu === 502 || data.zmena_esu === 504 || data.zmena_esu === 510 || data.zmena_esu === 515 || data.zmena_esu === 520){
                        return { icon: "gi-rob", tooltip: data.zmena_esu_txt };

                    } else {
                        return null;
                    }
                }
            });

            if (!this.NacistZastupy)
                format.addNumberColumn({ name: "ur_pri", caption: "jres:26265382", fixedWidth: false }); //RC 26265382 : Úroveň přístupu
            format.addTextColumn({ name: "zmena_esu_txt", caption: "jres:26265383", fixedWidth: false }); //RC 26265383 : Změna
            if (!this.NacistZastupy)
                format.addTextColumn({ name: "stupen_ver_txt", caption: "jres:26265323", fixedWidth: false }); //RC 26265323 : Stupeň verifikace
            format.addTextColumn({ name: "typ_ag_txt", caption: "jres:26265327", fixedWidth: false }); //RC 26265327 : Agenda
            format.addTextColumn({ name: "ixp", caption: "jres:26265393", fixedWidth: false }); //RC 26265393 : PID
            format.addDateTimeColumn({ name: "dat_zmena", caption: "jres:26265272", fixedWidth: false }); //RC 26265272 : Datum změny
            format.addTextColumn({ name: "zmenu_prov_rf", caption: "jres:26265161", fixedWidth: false }); //RC 26265161 : Změnu provedl
            if (this.LicencniCertifikatExists) { 
                format.addTextColumn({ name: "duvod_ucel", caption: "jres:31900531", fixedWidth: false }); //RC 31900531 : Důvod účel
                if (!this.NacistZastupy)
                    format.addTextColumn({ name: "seznam_udaju", caption: "jres:31900532", fixedWidth: false }); //RC 31900532 : Seznam údajů
            }
            if (this.NacistZastupy) {
                format.addTextColumn({ name: "zast_txt", caption: "jres:26265099", fixedWidth: false }); //RC 26265099 : Zástupná osoba
            }
            return format;

        },




        closeDet: function () {
            this.tryClose();
        }

    }, { extendIntellisense: GContent });          

})(jQuery);