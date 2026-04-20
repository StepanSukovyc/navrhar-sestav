

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GVyberZRosDataTabDlg", {
        onContentReady: function () {
            console.log("Zacatek Scriptu");
            var that = this;


            this.pripravDataView();


            Formik = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                .addSection("Osoba");
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720" })
                .addRow("jres:26265195").addField("gstringbox", { name: "txtIco", customClass: "js-dataTab", disabled: true }) //RC 26265195 : Ičo
                .addRow("jres:26265221").addField("gstringbox", { name: "txtAifo", customClass: "js-dataTab", disabled: true }) //RC 26265221 : ID
                .addRow("jres:31900582").addField("gstringbox", { name: "txtNazev", customClass: "js-dataTab", disabled: true }) //RC 31900582 : Název osoby
                .addSection()
                .addRow("jres:31900551").addField("gstringbox", { name: "txtPravniForma", customClass: "js-dataTab", disabled: true }) //RC 31900551 : Právní forma
                .addRow("jres:31900583").addField("gstringbox", { name: "txtPravniStav", customClass: "js-dataTab", disabled: true }) //RC 31900583 : Právní stav
                .addRow("jres:31900584").addField("gstringbox", { name: "txtAdresa", customClass: "js-dataTab", disabled: true }); //RC 31900584 : Sídlo/místo podníkání


            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            this.findFields(".js-dataTab").gfield("model", "apply", this.vyslednaData);

            Formik = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                .addSection("jres:31900585"); //RC 31900585 : Provozovny
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            $.content(this).actions.add({
                name: "actProvozovnyDoubleClick",
                run: function (ev, ctx) {
                    //console.log(ctx.cellInfo.data);
                }
            });


            this.gridProvozovny = $("<div>").appendTo(this.element).height("auto")
                //.gtab({title: "Provozovny", opened: true})
                .ggrid({
                    name: "GridProvozovny",
                    data: this.provozovnData,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    defaultAction: $.content(this).actions.actProvozovnyDoubleClick,
                    columns:
                    new Gordic.Data.GridFormat()
                        .addNumberColumn({
                            name: "icp",
                            caption: "jres:31900586", //RC 31900586 : IČP
                            width: 10,
                            description: "jres:31900586", //RC 31900586 : IČP
                            cellTemplate: "{icp}",
                        })
                        .addTextColumn({
                            name: "adresa",
                            caption: "jres:26265307", //RC 26265307 : Adresa
                            width: 50,
                            description: "jres:31900587", //RC 31900587 : Adresa provozovny
                            cellTemplate: "{adresa}",
                        })
                        .addDateColumn({
                            name: "dat_zahaj_cinnosti",
                            caption: "jres:31900588", //RC 31900588 : Zahájení činnosti
                            width: 20,
                            description: "jres:31900588", //RC 31900588 : Zahájení činnosti
                            //cellTemplate: "{dat_zahaj_cinnosti}",
                        })
                        .addDateColumn({
                            name: "dat_ukonc_cinnosti",
                            caption: "jres:31900589", //RC 31900589 : Ukončení činnosti
                            width: 20,
                            description: "jres:31900589", //RC 31900589 : Ukončení činnosti
                            //cellTemplate: "{dat_ukonc_cinnosti}",
                        })
                });

            Formik = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                .addSection("jres:31900590"); //RC 31900590 : Statutární orgány
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            $.content(this).actions.add({
                name: "actStatutariDoubleClick",
                run: function (ev, ctx) {
                    //console.log(ctx.cellInfo.data);
                }
            });

            this.gridStatutari = $("<div>").appendTo(this.element).height("auto")
                //.gtab({ title: "Statutární orgány", opened: true,}).
                .ggrid({
                    name: "GridStatutari",
                    data: this.statutariData,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    defaultAction: $.content(this).actions.actStatutariDoubleClick,
                    columns:
                    new Gordic.Data.GridFormat()
                        .addNumberColumn({
                            name: "osoba_ico",
                            caption: "jres:26265288", //RC 26265288 : IČO
                            description: "jres:26265288", //RC 26265288 : IČO
                            cellTemplate: "{osoba_ico}",
                        })
                        .addTextColumn({
                            name: "aifo",
                            caption: "jres:26265221", //RC 26265221 : ID
                            description: "jres:26265221", //RC 26265221 : ID
                            cellTemplate: "{aifo}",
                        })
                        .addTextColumn({
                            name: "nazev_osoby",
                            caption: "jres:31900582", //RC 31900582 : Název osoby
                            description: "jres:31900582", //RC 31900582 : Název osoby
                            cellTemplate: "{nazev_osoby}",
                        })
                        .addTextColumn({
                            name: "adresa",
                            caption: "jres:26265307", //RC 26265307 : Adresa
                            description: "jres:26265307", //RC 26265307 : Adresa
                            cellTemplate: "{adresa}",
                        })
                });

            Formik = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                .addSection("jres:31900591"); //RC 31900591 : Datové schránky
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            $.content(this).actions.add({
                name: "actDatoveSchrankyDoubleClick",
                run: function (ev, ctx) {
                    //console.log(ctx.cellInfo.data);
                }
            });

            this.gridDatoveSchranky = $("<div>").appendTo(this.element).appendTo(this.element).height("auto")
                //.gtab({title: "Datové schránky", opened: true}).
                .ggrid({
                    name: "GridDatoveSchranky",
                    data: this.datovkyData,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    defaultAction: $.content(this).actions.actDatoveSchrankyDoubleClick,
                    columns:
                    new Gordic.Data.GridFormat()
                        .addIconColumn({  // if (id ds) pak je datová schránka -> když je datum starej jak den tak černá jinak zelená když zrušená tak červená 
                            name: "id_dsico",
                            caption: "jres:31900191", //RC 31900191 : Datová schránka
                            //customClass: "center",
                            width: 40,
                            //fixedWidth: true,
                            iconTemplate: function (data) {
                                if (data.dat_schr_stav === 10)
                                    return { icon: "gi-tick", tooltip: "jres:31900592" }; //RC 31900592 : Stav platný
                                else if (data.dat_schr_stav === 20 || data.dat_schr_stav === 30)
                                    return { icon: "gi-window-close", tooltip: "jres:31900593" }; //RC 31900593 : Stav neplatný
                                else
                                    return null;
                            }
                        })
                        .addTextColumn({
                            name: "id_ds",
                            caption: "jres:31900191", //RC 31900191 : Datová schránka
                            description: "jres:31900594", //RC 31900594 : Adresa datové schránky
                            cellTemplate: "{id_ds}",
                        })
                        .addTextColumn({
                            name: "typ_dat_schranky",
                            caption: "jres:31900194", //RC 31900194 : Typ
                            description: "jres:31900194", //RC 31900194 : Typ
                            cellTemplate: "{typ_dat_schranky}",
                        })
                        .addTextColumn({
                            name: "typ_dat_schranky_txt",
                            caption: "jres:31900595", //RC 31900595 : Typ a název
                            description: "jres:31900596", //RC 31900596 : Typ a název datové schránky
                            cellTemplate: "{typ_dat_schranky_txt}",
                        })
                });

            this.nastaveniAktivnihoRadku();
        },

        nastaveniAktivnihoRadku: function () {
            if (this.provozovnData.getCount() > 0 && this.serverParams.idPobocky) {
                this.gridProvozovny.ggrid("activeRow", { icp: this.serverParams.idPobocky });
            }

            if (this.datovkyData.getCount() > 0 && this.serverParams.IdDs) {
                this.gridDatoveSchranky.ggrid("activeRow", { id_ds: this.serverParams.IdDs });
            }
        },

        pripravDataView: function () {
            
            if (this.vyslednaData) {
                this.provozovnData = new Gordic.Data.View(this.vyslednaData.GridProvozovna || [], { key: "icp" });
                this.statutariData = new Gordic.Data.View(this.vyslednaData.GridStatutari || [], { key: "osoba_ico" });
                this.datovkyData = new Gordic.Data.View(this.vyslednaData.GridDatovky || [], { key: "id_ds" });
            }
        },

        prevzit: function () {
            var ret = null;
            var selection = this.gridProvozovny.ggrid("getSelection");
            if (selection.length > 0) {
                ret = selection[0]
            }
            this.close(ret);

        },
       
        closeDet: function () {
            $.content(this).close(false);
        }


        
     

        

    }, { extendIntellisense: GContent });
    

});

   