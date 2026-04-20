namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailOvereniVISEP extends GDetailBuilderContent implements IGContent {
        model: any;
        private grid: JQuery;

        onContentReady() {
            var that = this;

            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full",
                    //defaultAction: that.actions.actDetail,
                    columns: this.createGridFormat(),
                    searchColumns: ["ixp_spis"],
                    //selection: function (ev, info) {
                    //    that.actions.actDetail!.enabled(info.count != 0);
                    //},
                });

            that.findFields().gfield("model", "apply", that.model, { initialValues: true })
            that.grid.ggrid("setData", that.model.prestupky);
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            builder.withComponent<this>("overeniVISEPDetail", {
                tabs:
                {
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                        }
                    },
                },
                actions:
                {
                    actZobrazitDokument: {
                        caption: "jres:25200310", //RC 25200310 : Zobrazit dokument
                        tooltip: "jres:25200313", //RC 25200313 : Zobrazit PDF dokument s obsahem ověření.
                        run: function (ev, obj) {
                            that.call("GetIxbISEPDokumentu", { IxpUkon: that.model.ixp_ukon, IxsEsu: that.model.ixs_esu, ZpravaIsep: that.model.zpravaIsep }).done(function (Ixb) {
                                var options = {
                                    IsFavorite: false, // zkusil jsem true i false, zobrazi to stejne //rowData.p_obraz == 1,
                                    Ixp: that.model.ixp_ukon,
                                    File: {
                                        Ixb: Ixb
                                    }
                                };
                                Gordic.Wfl.AttachmentUtils.OpenAttachment(that, options, false, false, false).done(function (args) {
                                    // console.log("doc.downloadCompleted", this, args);
                                });
                            });
                        }
                    },
                    actVlozitDoSpisu: {
                        caption: "jres:25200311", //RC 25200311 : Vložit do spisu
                        tooltip: "jres:25200312", //RC 25200312 : Vložit PDF dokument s ověřením do spisu.
                        run: function (ev, obj) {
                            console.log("actVlozitDoSpisu");
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                                ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremUsuGenPid
                            };
                            console.log("GenerovaniIxp");
                            Gordic.Wfl.Dialogs.GenerovaniIxp(that, options, Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (rv, cont) {
                                console.log("rv...");
                                console.log(rv);
                                if (rv) {
                                    if (rv.IxpExist === false) {
                                        console.log("VlozitISEPDokDoSpisu");
                                        that.call("VlozitISEPDokDoSpisu", {
                                            IxpSpis: that.model.ixp_spis,
                                            IxpUkon: that.model.ixp_ukon,
                                            IxsEsu: that.model.ixs_esu,
                                            IxpIsepDok: rv.Ixp,
                                            ZpravaIsep: that.model.zpravaIsep
                                        });
                                    }
                                }
                            });
                        }
                    }
                },
                menuBar: [
                    { id: "menuZobrazitDokument", action: "actZobrazitDokument", favorite: true },
                    { id: "menuVlozitDoSpisu", action: "actVlozitDoSpisu", favorite: true },
                    { action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent())), favorite: true }   // Zavřít
                ]
            }, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var l_sLD = "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0";

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                .addSection({ customClass: "SectionNoPaddingBottom" })
                .addRow("jres:25200305")  //RC 25200305 : Jméno
                .addField("gstringbox", { name: "jmeno", model: "model.subjekt.jmeno = value", disabled: true })
                .addSection({ customClass: "SectionNoPaddingBottom" })
                .addRow("jres:25200306") //RC 25200306 : Příjmení
                .addField("gstringbox", { name: "prijmeni", model: "model.subjekt.prijmeni = value", disabled: true })
                .addSection({ customClass: "SectionNoPaddingBottom" })
                .addRow("jres:25200307") //RC 25200307 : Rodné příjmení
                .addField("gstringbox", { name: "rodne_prijmeni", model: "model.subjekt.rodne_prijmeni = value", disabled: true })
                .addSection({ customClass: "SectionNoPaddingBottom" })
                .addRow("jres:25200308") //RC 25200308 : Datum narození
                .addField("gstringbox", { name: "datum_narozeni", model: "model.subjekt.datum_narozeni = value", disabled: true })
                .addSection({ customClass: "SectionNoPaddingBottom"})
                .addRow("jres:25200309") //RC 25200309 : Místo narození
                .addField("gstringbox", { name: "mist_nar_txt", model: "model.subjekt.mist_nar_txt = value", disabled: true })
                .addSection({ customClass: "SectionNoPaddingBottom" })
                ;
            return form;
        }

           //this.m_oStavPlatbyDdp = new GAction({
           //     name: "actStavPlatbyDdp",
           //     caption: "jres:25200155", //RC 25200155 : Přepočet stavu
           //     tooltip: "jres:25200155", //RC 25200155 : Přepočet stavu
           //     run: function (ev, obj) {
           //     }
           // });

        public createGridFormat(): Gordic.Data.GridFormat {
            return new Gordic.Data.GridFormat()
                .addTextColumn({
                    name: "prestupek_txt",
                    caption: "jres:25200300", //RC 25200300 : Přestupek
                    width: 300,
                    fixedWidth: false,
                })
                .addTextColumn({
                    name: "sankce",
                    caption: "jres:25200301", //RC 25200301 : Sankce
                    width: 200,
                    fixedWidth: false,
                })
                .addTextColumn({
                    name: "typ_zav_txt",
                    caption: "jres:25200302", //RC 25200302 : Typ zavinění
                    width: 160,
                    fixedWidth: false,
                })
                .addTextColumn({
                    name: "org_oznaceni",
                    caption: "jres:25200303", //RC 25200303 : OVM
                    width: 200,
                    fixedWidth: false,
                })
                .addTextColumn({
                    name: "org_sidlo",
                    caption: "jres:25200304", //RC 25200304 : OVM - sídlo
                    width: 160,
                    fixedWidth: false,
                })
                ;
        }


    }
}