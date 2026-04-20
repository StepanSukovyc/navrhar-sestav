

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GVyberZRuianDlg", {
        onContentReady: function () {
            console.log("Zacatek Scriptu");
            var that = this;



            console.log("OrigAdresaDto", this.OrigAdresaDto);
            console.log("SZRAdresa", this.SZRAdresa);

            // sekce 1
            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720" })
                .addSection("jres:31900533") //RC 31900533 : Hledaná adresa
                .addRow("").addText(" ")
                .addRow("jres:26265149").addField("gstringbox", { //RC 26265149 : Obec
                    name: "OrigObec", customClass: "js-orig  js-origCompareIco", disabled: true,
                    model: "model.OrigObec=value", // možná trochu podivný zápis ale je to zde kuli aktivaci vlastní funkce verify nastavuju i klíč

                })

                .addRow("jres:26265235").addField("gstringbox", { //RC 26265235 : Část obce
                    name: "OrigCastObce", customClass: "js-orig  js-origCompareIco", disabled: true,
                    model: "model.OrigCastObce=value", //  model.OrigCastObce=value.cast_obce_kod; model.OrigCastObce=value.cast_obce_nazev
                    //serverFilters: {
                    //    //obec_kod: new Gordic.Forms.Dependency("Obec", "obec_kod", false),              //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko
                    //    obec_kod: this.OrigAdresaDto.OrigObec_Kod
                    //}
                })
                .addRow("jres:26265147").addField("gstringbox", { //RC 26265147 : Ulice
                    name: "OrigUlice",
                    customClass: "js-orig js-origCompareIco", disabled: true,
                    model: "model.OrigUlice=value", // 
                })
                .addRow("jres:31900206").addField("gstringbox", { name: "OrigCisPopisne", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900206 : Č. popisné
                .addRow("jres:31900534").addField("gstringbox", { name: "OrigCisOrientacni", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900534 : Č. orientační
                .addRow("jres:31900535").addField("gstringbox", { name: "OrigCisOrPismeno", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900535 : Č. orientační písmeno
                .addRow("jres:31900536").addField("gstringbox", { name: "OrigCisOrTyp", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900536 : Č. orientační typ
                .addRow("jres:31900537").addField("gstringbox", { // szrspsc ginspsc //RC 31900537 : Pošta

                    name: "OrigPosta", customClass: "js-orig js-origCompareIco", disabled: true,
                    model: "model.OrigPosta=value", // 
                })



                .addSection("jres:31900538") //RC 31900538 : Adresa DB RUIAN
                .addRow("jres:26265293").addField("gselectbox", Gordic.Prefabs.Select.szrsokr(), { //RC 26265293 : Okres
                    name: "okres", customClass: "js-RUIAN js-RUIANAdresa",
                    model: "model.OrigOkres_Kod=value.okres_kod",//, disabled: true
                    change: function (ev, changeObj) {
                        if (!changeObj.flags.automatickyNehledej) { //dependencySet
                            that.hledatPriZmnene();
                        }

                    }
                })
                .addRow("jres:26265149").addField("gselectbox", Gordic.Prefabs.Select.szrsobe(), { //RC 26265149 : Obec
                    name: "obec", customClass: "js-RUIAN js-RUIANAdresa",
                    model: "model.OrigObec_Kod=value.obec_kod; model.OrigObec=value.obec_nazev",//, disabled: true
                    serverFilters: {
                        obec_kod: new Gordic.Forms.Dependency("okres", "okres_kod", false),     //id_okres
                    }
                    , change: function (ev, changeObj) {
                        that.enableControls();
                        if (!changeObj.flags.automatickyNehledej) {
                            that.hledatPriZmnene();
                        }
                    }
                })
                .addRow("jres:26265235").addField("gselectbox", Gordic.Prefabs.Select.szrsobc(), { //RC 26265235 : Část obce
                    name: "cast_obce", customClass: "js-RUIAN js-RUIANAdresa",
                    model: "model.OrigCast_Obce_Kod=value.cast_obce_kod; model.OrigCastObce=value.cast_obce_nazev",//, disabled: true
                    serverFilters: {
                        obec_kod: new Gordic.Forms.Dependency("obec", "obec_kod", false),
                    }
                    , change: function (ev, changeObj) {
                        if (!changeObj.flags.automatickyNehledej) {
                            that.hledatPriZmnene();
                        }
                    }
                })
                .addRow("jres:26265147").addField("gselectbox", Gordic.Prefabs.Select.szrsuli(), { //RC 26265147 : Ulice
                    name: "ulice",
                    customClass: "js-RUIAN js-RUIANAdresa",
                    model: "model.OrigUlice_Kod=value.ulice_kod; model.OrigUlice=value.ulice_nazev",// disabled: true
                    serverFilters: {
                        obec_kod: new Gordic.Forms.Dependency("obec", "obec_kod", false),
                    },
                    change: function (ev, changeObj) {
                        if (!changeObj.flags.automatickyNehledej) {
                            that.hledatPriZmnene();
                        }
                    }
                })
                .addRow("jres:31900206").addField("gstringbox", { //RC 31900206 : Č. popisné
                    name: "cpop", customClass: "js-RUIAN js-RUIANAdresa", model: "model.OrigCisPopisne=value",
                    change: function (ev, changeObj) {
                        that.enableControls();
                        if (!changeObj.flags.automatickyNehledej) {
                            that.hledatPriZmnene();
                        }
                    }
                })
                .addRow("jres:31900534").addField("gstringbox", { //RC 31900534 : Č. orientační
                    name: "cor", customClass: "js-RUIAN", model: "model.OrigCisOrientacni=value",
                    change: function (ev, changeObj) {
                        that.enableControls();
                        if (!changeObj.flags.automatickyNehledej) {
                            that.hledatPriZmnene();
                        }
                    }
                })
                .addRow("jres:31900535").addField("gstringbox", { name: "cislo_or_pismeno", customClass: "js-RUIAN", model: "model.OrigCisOrPismeno=value" }) //RC 31900535 : Č. orientační písmeno
                .addRow("jres:31900536").addField("gstringbox", { name: "typ_cis_dom_kod_dopoctena", customClass: "js-RUIAN", model: "model.OrigCisOrTyp=value" }) //RC 31900536 : Č. orientační typ
                .addRow("jres:31900537").addField("gselectbox", Gordic.Prefabs.Select.szrspsc(), { //RC 31900537 : Pošta
                    name: "posta", customClass: "js-RUIAN",
                    model: "model.OrigPosta_Kod=value.posta_kod; model.OrigPosta=value.psc",
                    change: function (ev, changeObj) {
                        if (!changeObj.flags.automatickyNehledej) {
                            that.hledatPriZmnene();
                        }
                    }
                })

                .addRow("jres:31900539").addField("gnumberbox", { //RC 31900539 : Adresa RUIAN
                    name: "AdresaRuian", customClass: "js-RUIAN",
                    model: "model.adresni_misto_kod=value",
                    change: function (ev, changeObj) { that.enableControls(); },
                    buttons: [{
                        //requireEdit: false,
                        action: new GAction({
                            name: "actAdresaRosRuianButton", icon: "gi-magglass", tooltip: "Vyhledat podle této adresy",
                            run: function (ev, ctx) {
                                var data = $(ctx.field).gfield("getValue");
                                that.nacistDataDleAdresaKod(data);
                            }
                        })
                    }]
                });

            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            //// sekce s tablem

            that.find(".js-orig").gfield("model", "apply", this.OrigAdresaDto);

            that.findFields().gfield("model", "validators", this.validatory);



            $.content(this).actions.add({
                name: "actVybranVGridu",
                run: function (ev, ctx) {
                    console.log(ctx.cellInfo.data);
                    if (ctx.cellInfo.data.aktivita === 100) {
                        that.NastavDleRadku(ctx.cellInfo.data);
                    } else {
                        that.dialogs.warning("Záznam je neaktivní");
                    }

                }
            });

            var gridformat1 = new Gordic.Data.GridFormat()
                //gridformat
                //.addTextColumn({
                //    name: "aktivita_txt",  // není v datech
                //    caption: "Aktivita",
                //})
                .addTextColumn({
                    name: "okres_nazev",
                    caption: "jres:26265293", //RC 26265293 : Okres
                })
                .addTextColumn({
                    name: "obec_nazev",
                    caption: "jres:26265149", //RC 26265149 : Obec
                })
                .addTextColumn({
                    name: "cast_obce_nazev",
                    caption: "jres:26265235", //RC 26265235 : Část obce
                }).addTextColumn({
                    name: "ulice_nazev",
                    caption: "jres:26265147", //RC 26265147 : Ulice
                }).addTextColumn({
                    name: "cpop",
                    caption: "jres:31900173", //RC 31900173 : Číslo popisné
                }).addTextColumn({
                    name: "typ_cis_dom_txt",
                    caption: "jres:31900540", //RC 31900540 : Typ čísla domovního
                })
                .addTextColumn({
                    name: "cor",
                    caption: "jres:31900172", //RC 31900172 : Číslo orientační
                })
                .addTextColumn({
                    name: "posta_nazev",
                    caption: "jres:31900537", //RC 31900537 : Pošta
                })
                .addNumberColumn({
                    name: "posta_kod",
                    caption: "jres:26265150", //RC 26265150 : PSČ
                }).addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26265272", //RC 26265272 : Datum změny
                })
                ;


            this.GgridVysledekHledani = $("<div>").appendTo(this.element)
                //.height(250)
                .gautofit()
                .ggrid({
                    name: "GridVysledekHledani",
                    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    customClass: "js-RUIAN",
                    navigationMode: "row", // row, cell
                    defaultAction: $.content(this).actions.actVybranVGridu, //selectAction
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else return "  ";
                    },

                    scrollHelperTemplate: "{obec_nazev}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["obec_nazev"],
                    */
                    columns: gridformat1
                });

            this.inicializace();

        },

        /**
         * inicalizace
         *
         * @author  Dsebesta
         * @date    17.08.2017
         *
         * @return  .
         */

        inicializace: function () {
            //pokud přišla jako adresaKod tak se nalezena data budou nacházet v this.SZRAdresa
            if (this.SZRAdresa) {
                this.naplnDleNalezeneAdresy(this.SZRAdresa);
            } else { //jinak vyhledám podle dat v this.origModel
                // napni data do polí ruian z orig modelu
                this.findFields(".js-RUIAN").gfield("model", "apply", this.OrigAdresaDto, {
                    setFlags: {
                        automatickyNehledej: true
                    }
                });
                this.enableControls();
                if (this.actions.actOverit.enabled()) {
                    this.pockejAVyhledej(); // hned vyhledá
                }
           
            }
        },

        /**
         * Napln dle nalezene adresyKod
         *
         * @author  Dsebesta
         * @date    21.08.2017
         *
         * @param   poleDat The pole dat.
         *
         * @return  .
         */

        naplnDleNalezeneAdresy: function (poleDat) {
            this.naplnGrid(poleDat);
            this.manualniNastaveniRadkuVGridu(poleDat["0"]);
            this.NastavDleRadku();
            this.disabledFields(true);
        },

        /**
         * disabledFields
         *
         * @author  Dsebesta
         * @date    21.08.2017
         *
         * @param   show    The show.
         *
         * @return  .
         */

        disabledFields: function (disabled) {

            this.findFields(".js-RUIAN").gfield("option", "disabled", disabled ? true : false);
        },

        /**
         * nastaví do gridu hodnotu podle klíče
         *
         * @author  Dsebesta
         * @date    17.08.2017
         *
         * @param   row The row.
         *
         * @return  .
         */

        manualniNastaveniRadkuVGridu: function (row) {

            this.GgridVysledekHledani.ggrid("activeRow", { adresni_misto_kod: row.adresni_misto_kod });
        },

        /**
         * naplnění dat do gridu
         *
         * @author  Dsebesta
         * @date    17.08.2017
         *
         * @param   data    The data.
         *
         * @return  .
         */

        naplnGrid: function (data) {
           
            this.ViewTabulkaNalezenych = new Gordic.Data.View(data, { key: "adresni_misto_kod" });
            this.GgridVysledekHledani.ggrid("setData", this.ViewTabulkaNalezenych, true);
        },

        /**
         * vyplní formulář podle vybraného řáedku
         *
         * @author  Dsebesta
         * @date    17.08.2017
         *
         * @param   row The row.
         *
         * @return  .
         */

        NastavDleRadku:function(row)
        {
            var that = this;

            if (row == null) { 
                var rows = this.GgridVysledekHledani.ggrid("getSelection");
                if (rows.length> 0){
                    row = rows["0"];
                }
            }
            if (row) {
                var model = {};

                model.OrigOkres_Kod = row.okres_kod;
                model.OrigObec_Kod = row.obec_kod;
                model.OrigCast_Obce_Kod = row.cast_obce_kod;
                model.OrigUlice_Kod = row.ulice_kod;
                model.OrigCisPopisne = row.cislo_domovni;   // cislo_domovni   cpop
                model.OrigCisOrientacni = row.cislo_orientacni !== 0 ? row.cislo_orientacni : null;    //cislo_orientacni cor
                model.OrigCisOrPismeno = row.cislo_or_pismeno;
                model.OrigCisOrTyp = row.typ_cis_dom_kod_dopoctena;
                model.OrigPosta_Kod = row.posta_kod;
                model.adresni_misto_kod = row.adresni_misto_kod;

                this.findFields(".js-RUIAN")
                    .gfield("clear", { automatickyNehledej: true, }) // vyčistím
                    .gfield("model", "apply", model, { setFlags: { automatickyNehledej: true, } }); // nastavím
                this.pockejAPakPorovnej();
            }
        },

        /**
         * počká na donačtení všech selextboxu a pak porovná
         *
         * @author  Dsebesta
         * @date    17.08.2017
         *
         * @return  .
         */

        pockejAVyhledej: function (uzivatelskaZmenaHodnot) {
            var that = this;
            this.beginOperation();
            var promises = this.findFields().map(function () { return $(this).gfield("getValueAsync"); });
            $.when.apply(null, promises).done(function () {
                that.vyhledej(uzivatelskaZmenaHodnot);
                that.endOperation();
            }); 
        },

        /**
         * Pockej a pak porovnej
         *
         * @author  Dsebesta
         * @date    18.08.2017
         *
         * @return  .
         */

        pockejAPakPorovnej: function () {
            var that = this;
            this.beginOperation();
            var promises = this.findFields().map(function () { return $(this).gfield("getValueAsync"); });
            $.when.apply(null, promises).done(function () {
                that.PorovnejOsoby();
                that.endOperation();
            }); 
        },

        /**
         * Porovná osoby
         *
         * @author  Dsebesta
         * @date    18.08.2017
         *
         * @return  .
         */

        PorovnejOsoby:function() {
            this.odstranPorovnavaciIkonky();

            // obec
            var fieldOrig = this.findFields("OrigObec");
            var OrigValue = fieldOrig.gfield("getValue");
            var ValueRUIAN = this.findFields("obec").gfield("getValue");
            ValueRUIAN = ValueRUIAN ? ValueRUIAN.obec_nazev : ValueRUIAN;
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            //  cast obce 
            fieldOrig = this.findFields("OrigCastObce");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("cast_obce").gfield("getValue");
            ValueRUIAN = ValueRUIAN ? ValueRUIAN.cast_obce_nazev : ValueRUIAN;
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            //  ulice
            fieldOrig = this.findFields("OrigUlice");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("ulice").gfield("getValue");
            ValueRUIAN = ValueRUIAN ? ValueRUIAN.ulice_nazev : ValueRUIAN;
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            // cislo popisne
            fieldOrig = this.findFields("OrigCisPopisne");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("cpop").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            // cislo orientacni
            fieldOrig = this.findFields("OrigCisOrientacni");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("cor").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            // cislo orientacni pismeno
            fieldOrig = this.findFields("OrigCisOrPismeno");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("cislo_or_pismeno").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            // cislo orientacni typ
            fieldOrig = this.findFields("OrigCisOrTyp");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("typ_cis_dom_kod_dopoctena").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

            //  posta
            fieldOrig = this.findFields("OrigPosta");
            OrigValue = fieldOrig.gfield("getValue");
            ValueRUIAN = this.findFields("posta").gfield("getValue");
            ValueRUIAN = ValueRUIAN ? ValueRUIAN.psc : ValueRUIAN;
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueRUIAN);

        },

        overit: function (uzivatelskaZmenaHodnot) {
            this.pockejAVyhledej(uzivatelskaZmenaHodnot);
        },

        /**
         * vyhledá data v registru
         *
         * @author  Dsebesta
         * @date    18.08.2017
         *
         * @return  .
         */

        vyhledej: function (uzivatelskaZmenaHodnot) {
            var that = this;
            var origData = {};
            this.findFields(".js-RUIAN").gfield("model", "collect", origData);
            this.beginOperation();
            this.call("Hledat", { origData: origData }, null, { progressState: false })
                .done(function (nalezenePole) {
                    if (nalezenePole.length > 0) {
                        that.naplnGrid(nalezenePole);
                        if (nalezenePole.length === 1 && !uzivatelskaZmenaHodnot) {
                            that.NastavDleRadku(nalezenePole["0"]);
                        }

                    } else {
                        that.showFlash({ label: "jres:31900541", customClass: "g-state-warning", id: "flashNenalezeno" }); //RC 31900541 : Nepodařilo se nalézt žádný záznam, zkontrolujte prosím zadané údaje, dle kterých se hledá.
                        //that.dialogs.alert("Nepodařilo se nalézt žádný záznam, zkontrolujte prosím zadané údaje, dle kterých se hledá.")
                    }
                })
                .always(function () {
                    that.endOperation();
                });
        },

        /**
         * Vybrany novy radek
         *
         * @author  Dsebesta
         * @date    18.08.2017
         *
         * @return  .
         */

        odstranPorovnavaciIkonky: function () {
            this.findFields(".js-origCompareIco, .js-RUIAN").each(function (imdex, field) {
                var stat = $(field).gfield("getState", "icoCompare");
                if (stat && stat.length > 0)
                    stat.remove();
            });
        },

        

        /**
         * převzetí
         *
         * @author  Dsebesta
         * @date    18.08.2017
         *
         * @return  .
         */

        aktualizovat: function (AdrKod) {
            var that = this;

            if (AdrKod == null) {
                AdrKod = this.findFields("AdresaRuian").gfield("getValue");
            }
            if (AdrKod) {
                this.beginOperation();
                
                this.call("AktualizovatOnline", { AdrKod: AdrKod })
                    .done(function (stav) {
                        if (stav === "ok") {
                            //that.nacistDataDleAdresaKod(AdrKod); // puvodne, zmeneno na vyhledat 15.08.2018
                            that.hledatPriZmnene();
                        } else {
                            that.dialogs.alert(stav);
                        }
                    })
                    .always(function () {
                        that.endOperation();
                    });
            } else {
                that.dialogs.alert("jres:31900542"); //RC 31900542 : Nebyl zadán žádný kód adresy.
            }
        },


        nacistDataDleAdresaKod: function (AdrKod) {
            var that = this;
            if (AdrKod) { 
                this.beginOperation();
                this.call("NactiDleAdresaKod", { AdrKod: AdrKod })
                    .done(function (retVal) {
                        if (retVal.length > 0) {
                            that.naplnDleNalezeneAdresy(retVal);
                        }

                    })
                    .always(function () {
                        that.endOperation();
                    });
            } else {
                that.dialogs.alert("jres:31900542"); //RC 31900542 : Nebyl zadán žádný kód adresy.
            }
        },

        hledatPriZmnene: function () {
            this.overit(true);
        },

        enableControls: function () {
           
            var povoleno = false;
            var model = {};
            this.findFields(".js-RUIAN").gfield("model", "collect", model);

            if ((model.OrigObec_Kod) && (model.OrigObec_Kod !== 0)) {
                povoleno = true;
            }

            var iszrEnabled = this.gin_iszr_povole !== 0;
            var gActionHledat = false;
            var gActionAktualizovatOnline = false ;
            var gActionOdstranit = false;
            var actSaveAndClose = false;

            if ((povoleno && (model.OrigCisPopisne || model.OrigCisOrientacni))  ) {
                gActionHledat = true;
            }
            if (model.adresni_misto_kod !== 0 && (model.adresni_misto_kod !== 0) && iszrEnabled) {
                gActionAktualizovatOnline = true;
            }  
            if (this.EditMode && this.adresaKodPuvidni !== 0 && iszrEnabled) {
                gActionOdstranit = true;
            }
            if ((this.EditMode || this.enableOk) && model.adresni_misto_kod !== 0) {
                actSaveAndClose = true;
            }
            // || this.enableOk

            this.actions.actOverit.update({ enabled: gActionHledat});
            this.actions.actAktualizovat.update({ enabled: gActionAktualizovatOnline });
            this.actions.actOdstranitVazbu.update({ enabled: gActionOdstranit });
            this.actions.actSaveAndClose.update({ enabled: actSaveAndClose });
            
        },

        saveAndCloseDet: function () {
            //TODO
            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (formISValid) { //|| m_bVyberHromData
                var model = {};
                this.findFields(".js-RUIAN").gfield("model", "collect", model);

                if ((this.EditMode || this.enableOk) && model.adresni_misto_kod !== 0) {

                    var values = {};
                    values.prevzit = true;
                    values.odstranitVazbuNaRuian = false;
                    values.adresaKod = model.adresni_misto_kod;

                    var retVal = jQuery.extend(true, values, model);
                    this.close(retVal);
                }
                else {
                    this.dialogs.alert("jres:31900543"); //RC 31900543 : Není vyplněn adresa kod.
                }
            }
        },

        odstranitVazbu: function () {
            var values = {};
            values.odstranitVazbuNaRuian = true;
            values.prevzit = false;
            this.close(values);
        },

        closeDet: function(){
            $.content(this).close(false);
        },

        

     

        

    }, { extendIntellisense: GContent });
    

});

   