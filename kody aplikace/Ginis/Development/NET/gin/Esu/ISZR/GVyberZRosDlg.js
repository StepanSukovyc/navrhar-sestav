
$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GVyberZRosDlg", {
        onContentReady: function () {
            console.log("Zacatek Scriptu");
            var that = this;
            this.promiseArray = [];

            Gordic.Esu.Function.trimObj(this.origModel);
            //VyberZRosItemsDto => VyberZRosItemsWorkDto  přepracovano kuli JsonProperty

            // data
            //console.log("origModel: ", this.origModel);
            //console.log("VyberZRosItemsWorkDto: ", this.VyberZRosItemsWorkDto);
            //console.log("nactenaDataZFronty: ", this.nactenaDataZFronty);
            //console.log("nactenaDataZICo: ", this.nactenaDataZICo);
            //// filtry
            //console.log("AgendaFilterAgenda: ", this.AgendaFilterAgenda);
            //console.log("RoleFilterAgenda: ", this.RoleFilterAgenda);
            //console.log("RoleFilterIxsFunVfar: ", this.RoleFilterIxsFunVfar);

            // sekce 1
            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720" })
                .addSection("jres:31900549") //RC 31900549 : Hledaný subjekt
                .addRow("jres:26265195").addField("gstringbox", { //RC 26265195 : Ičo
                    name: "Ico", customClass: "js-orig js-origCompareIco", 
                    validators: [
                        new Gordic.Validators.Required()
                    ],
                    change: function (ev, obj) {
                        that.enablecontrols();
                    }
                })
                .addRow("jres:32100017").addField("gstringbox", { name: "ObchodniJmeno", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 32100017 : Obchodní jméno
                .addRow("jres:26265153").addField("gstringbox", { name: "Jmeno", customClass: "js-orig js-origCompareIco js-hideField", disabled: true }) //RC 26265153 : Jméno
                .addRow("jres:26265152").addField("gstringbox", { name: "Prijmeni", customClass: "js-orig js-origCompareIco js-hideField", disabled: true }) //RC 26265152 : Příjmení
                .addRow("jres:31900366").addField("gstringbox", { name: "IdDs", customClass: "js-orig js-origCompareIco" }) //RC 31900366 : ID DS
                .addRow("jres:31900205").addField("gselectbox", Gordic.Prefabs.Select.ginctyo(), { //RC 31900205 : Typ organizace
                    name: "TypOrganizace", customClass: "js-orig js-origCompareIco", model: "model.TypOrganizace=value.typ_org", disabled: true
                })
                .addRow("jres:26265368").addField("gstringbox", { name: "Prezdivka", customClass: "js-orig js-origCompareIco" }) //RC 26265368 : Provozovna
                .addRow({ label: "&nbsp;", customClass: "w-S-h" }).addText("&nbsp;")
                .addRow("jres:26265149").addField("gstringbox", { name: "Obec", customClass: "js-orig  js-origCompareIco", disabled: true }) //RC 26265149 : Obec
                .addRow("jres:26265235").addField("gstringbox", { name: "CastObce", customClass: "js-orig  js-origCompareIco", disabled: true }) //RC 26265235 : Část obce
                .addRow("jres:26265147").addField("gstringbox", { name: "Ulice", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 26265147 : Ulice
                .addRow("jres:31900206").addField("gstringbox", { name: "CisloPopisne", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900206 : Č. popisné
                .addRow("jres:31900534") //RC 31900534 : Č. orientační
                .addField("gstringbox", "w-6", { name: "CisloOrientacni", customClass: "js-orig js-origCompareIco", disabled: true })
                .addField("gstringbox", "w-6", { name: "COrientPism", customClass: "js-orig js-origCompareIco", disabled: true })

                .addRow("jres:31900539").addField("gstringbox", { //RC 31900539 : Adresa RUIAN
                    name: "KodUirAdr",
                    customClass: "js-orig",
                    disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actAdresaRuianButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    }]
                }) // button html  "js-"
                // sekce 2
                .addSection("jres:31900443") //RC 31900443 : ROS
                .addRow("jres:26265195").addField("gstringbox", { name: "IcoISZR", customClass: "js-ISZR", model: "model.ico=value", disabled: true }) //RC 26265195 : Ičo
                .addRow("jres:32100017").addField("gstringbox", { name: "ObchodniJmenoISZR", customClass: "js-ISZR", model: "model.nazev_osoby=value", disabled: true }) //RC 32100017 : Obchodní jméno
                .addRow("jres:26265153").addField("gstringbox", { name: "JmenoRos", customClass: "js-ISZR js-hideField", model: "model.jmeno=value", disabled: true }) //RC 26265153 : Jméno
                .addRow("jres:26265152").addField("gstringbox", { name: "PrijmeniRos", customClass: "js-ISZR js-hideField", model: "model.prijmeni=value", disabled: true }) //RC 26265152 : Příjmení
                .addRow("jres:31900366").addField("gselectbox", { //RC 31900366 : ID DS
                    name: "IDDSRos", customClass: "js-ISZR", model: "model.id_ds=value",
                    dropdown: true,
                    itemTemplate: "{id_ds}",
                    data: new Gordic.Data.View([], { key: "id_ds" })
                })
                .addRow("jres:31900551").addField("gstringbox", { name: "prFormaISZR", customClass: "js-ISZR", model: "model.prForma=value", disabled: true }) //RC 31900551 : Právní forma
                .addRow("jres:26265368").addField("gstringbox", { //RC 26265368 : Provozovna
                    initialValue:"jres:31900552", //RC 31900552 : Hlavní sídlo
                    name: "provozovnaISZR", customClass: "js-ISZR", model: "model.provozovna=value", disabled: true,
                    buttons: [
                        {
                            badge: {
                                id: "detailBadge",
                                value: "0 / 0",
                                tooltip: "jres:31900553", //RC 31900553 : Provozovny / Statutáři
                                customClass: "g-state-info js-detailBadge" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                            },
                            requireEdit: false,
                            action: new GAction({
                                name: "btnAct",
                                caption: "jres:31901280",//"jres:26265073", //RC 31901280 : Detail provoz. / stat.
                                tooltip:"jres:31901281", //RC 31901281 : Otevřít detail provozoven a statutárů
                                customClass: "js-detail",
                                //icon: "gi-magglass",
                                run: function (event, actionContext) {
                                    that.otevriDetail();
                                }
                            })
                        }
                    ]
                })

                .addRow("jres:31900554").addField("gdatebox", "w-6", { name: "DatcinostiOdISZR", customClass: "js-ISZR", model: "model.dat_vzniku_opravn=value", disabled: true }) //RC 31900554 : Datum činnosti od/do
                            .addField("gdatebox", "w-6", { name: "DatcinostiDoISZR", customClass: "js-ISZR", model: "model.dat_zaniku_opravn=value", disabled: true })
                .addRow("jres:26265149").addField("gstringbox", { name: "ObecRos", customClass: "js-ISZR js-ISZRAdresa", model: "model.GObec=value", disabled: true }) //RC 26265149 : Obec
                .addRow("jres:26265235").addField("gstringbox", { name: "CastObceRos", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCastObce=value", disabled: true }) //RC 26265235 : Část obce
                .addRow("jres:26265147").addField("gstringbox", { name: "UliceRos", customClass: "js-ISZR js-ISZRAdresa", model: "model.GUlice=value", disabled: true }) //RC 26265147 : Ulice
                .addRow("jres:31900206").addField("gstringbox", { name: "CPopisneRos", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCisPopisne=value", disabled: true }) //RC 31900206 : Č. popisné
                .addRow("jres:31900534") //RC 31900534 : Č. orientační
                .addField("gstringbox", "w-6", { name: "COrientacniRos", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCisOrientacni=value", disabled: true })
                .addField("gstringbox", "w-6", { name: "COrientPismRos", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCisOrientacniPismeno=value", disabled: true })

                .addRow("jres:31900539").addField("gstringbox", { //RC 31900539 : Adresa RUIAN
                    name: "AdresaRosRuian", customClass: "js-ISZR", model: "model.adresni_misto_kod=value", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actAdresaRosRuianButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    }]
                })
                //.addField("gstringbox", "w-6", { name: "AdresaRobRuianTxt", customClass: "js-ISZR", model: "model.xxxxxxxxxxxxxxxxxxxxxxxxxx=value", disabled: true })

                /// sekce 3
                .addSection("jres:31900555") //RC 31900555 : ISZR Dotaz
                .addRow("jres:26265327").addField("gselectbox", Gordic.Prefabs.Select.szrsage(), { //RC 26265327 : Agenda
                    name: "Agenda",
                    model: "model.Agenda = value.agenda",
                    customClass: "js-iszrDotaz",
                    dropdown: true,
                    disabled: true,
                    serverFilters: {
                       
                        agenda: this.ListAgend
                    },
                    change: function (ev, obj) {
                        that.enablecontrols();
                    }
                })
                .addRow("jres:31900136").addField("gselectbox", Gordic.Prefabs.Select.szrsagr(), { //RC 31900136 : Role
                    name: "Role",
                    model: "model.Agenda = value.agenda;model.AgendovaRole = value.agendova_role",
                    customClass: "js-iszrDotaz",
                    //dropdown: true,
                    itemTemplate: "{agenda} {agendova_role} {nazev_aro}",
                    serverFilters: {
                         agenda: new Gordic.Forms.Dependency("Agenda", "agenda", true),
                         ixs_fun_vfar: this.RoleFilterIxsFunVfar || null
                    },
                    change: function (ev, obj) {
                        that.enablecontrols();
                    }
                })
                .addRow("jres:26265101")//RC 26265101 : Důvod
                //.addField("gstringbox", {
                //    name: "Duvod",
                //    customClass: "js-iszrDotaz",
                //    change: function (ev, obj) {
                //        that.enablecontrols();
                //    }
                //})
                .addField("gselectbox", {
                    model: "model.Duvod=value.data",  // zde obvykle nastavení selboxu, některé nastavení zde vám muže přebít prefab (strict,buttons,helperChoice,
                    customClass: "js-iszrDotaz",
                    //helperCustomizer,invalidTransform,data,helperItemTemplate,itemTemplate,helperColumns,verificationNeeded,showSelectButton
                    //(při pamatování minulé hodnoty initialValue) )
                    change: function (ev, obj) {
                        that.enablecontrols();
                    },
                }, Gordic.Gin.Prefabs.gmemorySelectbox({
                    userSettings: this.userSettings,            // (povinne)instance usersettings z contentu 
                    name: "Duvod",                       // (povinne) name políčka, použije se i jako klíč pod který se boudou ukládat hodnoty v gstore
                    type: "string",                             // (nepovine) zatím jen jeden typ
                    //rememberLast: true,                         // (nepovine) default false   zda se má nastavovat jako initialValue poslední hodnota co ručně napsal/vybral uživatel
                    //staticData: ["staticke data", "dalsi"],  //(nepovine) staticke hodnoty co se budou nabízet uživateli pokaždé nezavisle na countOfRemembered
                    countOfRemembered: 20        //(nepovine) default 10     počet pamatovaných hodnot           !!!!!!! šetřit gstor
                }))


                /// sekce 4
                .addSection("jres:31900556") //RC 31900556 : ISZR odpověď
                // .addRow("AIFO").addField("gstringbox", { name: "m_oAifo" })
                .addRow("jres:26265221").addField("gstringbox", { //RC 26265221 : ID
                    name: "GID",
                    customClass: "js-iszrOdpoved",
                    model: "model.IszrZadostId=value",
                    disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actAifoButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    }]
                })
                .addRow("jres:31900557").addField("gstringbox", { //RC 31900557 : Status
                    name: "StatusText", customClass: "js-iszrOdpoved", disabled: true, rows: 2
                });
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            //// sekce s tablem

            var Formik2 = new Gordic.Forms
                .Form("L3M3S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720")
                .addSection()
                .addRow().addField("gcheck", { name: "SrzAsynchronneCheckboxChecked", customClass: "js-iszrDotaz", initialValue: false, disabled: that.gin_iszr_synasy === 1, label: "jres:31900558" }) //RC 31900558 : SZR volat asynchronně

                .addSection()
                .addRow().addField("gcheck", { name: "gCheckBoxProvoz", customClass: "js-iszrDotaz", initialValue: false , label: "jres:31900559" }); //RC 31900559 : Převzít provozovnu
            $("<div>").appendTo(this.element).gform("createFrom", Formik2);

            that.find(".js-orig").gfield("model", "apply", this.origModel);

            that.find(".js-iszrDotaz, .js-iszrOdpoved").gfield("model", "apply", this.VyberZRosItemsWorkDto);
          
            that.findFields().gfield("model", "validators", this.VyberZRosItemsDtoValidators);

            $.content(this).actions.add({
                name: "actVybranVGridu",
                run: function (ev, ctx) {
                    console.log(ctx.cellInfo.data);
                    if (ctx.cellInfo.data.aktivita === 100) {
                        that.NastavDleRadku(ctx.cellInfo.data);
                    } else {
                        that.dialogs.warning("jres:31900560"); //RC 31900560 : Záznam je neaktivní
                    }
                }
            });

            var gridformat1 = new Gordic.Data.GridFormat()
                //gridformat
                .addTextColumn({
                    name: "ico",  //gridformat1
                    caption: "jres:26265195", //RC 26265195 : Ičo
                    description: "jres:26265195", //RC 26265195 : Ičo
                    cellTemplate: "{ico}",
                    width: 70

                })
                .addTextColumn({
                    name: "fo_textem",  //gridformat1
                    caption: "jres:26265152", //RC 26265152 : Příjmení
                    description: "jres:26265152", //RC 26265152 : Příjmení
                    cellTemplate: function (data) {
                        if (data.fo_textem) {
                            return data.fo_textem.toString();
                        } else if (data.nazev_osoby) {
                            return data.nazev_osoby.toString();
                        }
                    }
                })
                .addTextColumn({
                    name: "adresa_textem", //gridformat1
                    caption: "jres:26265307", //RC 26265307 : Adresa
                    description: "jres:26265307", //RC 26265307 : Adresa
                    cellTemplate: "{adresa_textem}"
                })
                .addTextColumn({
                    name: "adresni_misto_kod", //gridformat1
                    caption: "jres:31900539", //RC 31900539 : Adresa RUIAN
                    description: "jres:31900539", //RC 31900539 : Adresa RUIAN
                    cellTemplate: "{adresni_misto_kod}",
                    width: 70
                })
                .addDateColumn({
                    name: "dat_vzniku_opravn",
                    caption: "jres:31900561", //RC 31900561 : Vzniku oprávnění
                    description: "jres:31900562", //RC 31900562 : Datum vzniku oprávnění
                    //cellTemplate: "{dat_vzniku_opravn}"
                })
                .addDateColumn({
                    name: "dat_zaniku_opravn",
                    caption: "jres:31900923", //RC 31900923 : Zánik oprávnění
                    description: "jres:31900922", //RC 31900922 : Datum zániku oprávnění
                    //cellTemplate: "{dat_vzniku_opravn}"
                })
                .addTextColumn({
                    name: "kod_agendy",  //gridformat1
                    caption: "jres:31900563", //RC 31900563 : Kód editorské agendy
                    description: "jres:31900563", //RC 31900563 : Kód editorské agendy
                    cellTemplate: "{kod_agendy}"
                }).addTextColumn({
                    name: "kod_ovm",  //gridformat1
                    caption: "jres:31900564", //RC 31900564 : OVM editorské agendy
                    description: "jres:31900564", //RC 31900564 : OVM editorské agendy
                    cellTemplate: "{kod_ovm}"
                })
                ;

            this.ViewTabulkaNalezenych = new Gordic.Data.View([], { key: "kod_ovm" });

            this.GgridVysledekHledani = $("<div>").appendTo(this.element)
                .height(250)
                //.gautofit()
                .ggrid({
                    name: "GridVysledekHledani",
                    data: this.ViewTabulkaNalezenych,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    customClass: "js-gridISZRRos",
                    navigationMode: "row", // row, cell
                    //defaultAction: $.content(this).actions.actVybranVGridu, //17.09.2021 dsebesta dvojklik odebrán a přepnuto na jednoklik
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else return "  ";
                    },
                    cellActivate: function (ev, row) {
                        if (row && row.cellInfo.data && row.cellInfo.data.aktivita === 100) {
                            that.NastavDleRadku(row.cellInfo.data);
                        } else if (!that.nekontrolovatAktivitu) {
                            that.dialogs.warning("jres:31901054"); //RC 31901054 : Označený záznam v seznamu je neaktivní
                        }

                        /*
                        if (row && row.cellInfo && row.cellInfo.data && row.cellInfo.data.ixs_esu) { // u single modu vzdy 1 ale pro jistotu testuji
                            //var x = selectionInfo.getSelection();
                            that.showPanel(row.cellInfo.data.ixs_esu);
                        }
                        */
                    },
                    scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["zkratka", "nazev", "ico", "dic"],
                    */
                    columns: gridformat1
                });

            this.inicializace();

        },

        inicializace: function () {


            if (this.serverParams.esuDto.TypAdr === 10 && this.serverParams.esuDto.Prezdivka) {
                this.IdProvozovny = this.serverParams.esuDto.Prezdivka;
                this.findFields("gCheckBoxProvoz").gfield("setValue", true);
            }


            this.zkusNaplnitGridPostartu();

            this.provozovnaEnabled = this.gin_esu_zatypad !== 0 && this.PrizIszr;
            this.findFields("gCheckBoxProvoz").gfield("option", "disabled", !this.provozovnaEnabled);

            //if (this.Szrspro) {

            //    this.NastavRosDleProvozovny(this.origModel.Prezdivka);
            //    this.pokusOZavolaniPromisu();
            //}
            this.findForms().gform("waitForValues").done(function () {
                that.enablecontrols();
                that.aktualizujPocet();
            })
     

        },

        zkusNaplnitGridPostartu: function () {
            //this.nactenaDataZFronty.SzrsrosDtoOst; 
            // this.nactenaDataZFronty.SzrsrosDtoOag;
            //this.nactenaDataZFronty.prizSzrsoag;
            //this.nactenaDataZFronty.selectedoagRow;

            //if (this.nactenaDataZFronty.SzrsrosDtoOst && this.nactenaDataZFronty.SzrsrosDtoOst.length > 0) {
            //    this.ViewTabulkaNalezenych = new Gordic.Data.View(this.nactenaDataZFronty.SzrsrosDtoOst, { key: "fo_textem" });
            //    this.GgridVysledekHledani.ggrid("setData", this.ViewTabulkaNalezenych, true);

            //}
            //else if (this.nactenaDataZFronty.SzrsrosDtoOag && this.nactenaDataZFronty.SzrsrosDtoOag.length > 0 && this.nactenaDataZFronty.prizSzrsoag) {
            //    this.ViewTabulkaNalezenych = new Gordic.Data.View(this.nactenaDataZFronty.SzrsrosDtoOag, { key: "nazev_osoby" });
            //    this.GgridVysledekHledani.ggrid("setData", this.ViewTabulkaNalezenych, true);
            //    if (this.nactenaDataZFronty.selectedoagRow) {
            //        this.manualniNastaveniRadkuVGridu(this.nactenaDataZFronty.selectedoagRow)
            //    }
            if (this.nactenaDataZFronty) { 
                this.naplnGrid(this.nactenaDataZFronty);
                if (this.nactenaDataZFronty.selectedoagRow) {
                    this.manualniNastaveniRadkuVGridu(this.nactenaDataZFronty.selectedoagRow);
                }
            }
        },

        manualniNastaveniRadkuVGridu: function (row) {

            this.GgridVysledekHledani.ggrid("activeRow", { kod_ovm: row.kod_ovm });
            //this.NastavDleRadku(row);
        },

        vynulovatPromene: function () {
            var that = this;
            //TODO  lze předlat na tento global
            this.ROSData = null;

            this.TypOrg = null;
            this.PrForma = null;

            this.SzrsrosDtoPro = null;
            this.SzrsosfDto = null;
            this.SzrsossDto = null;
            this.PocetSzrsosn = 0;
            this.SzrsosaDto = null;

            this.vybranaOsoba = null;
            this.prizSzrsoag = null;
            //this.ViewTabulkaNalezenych = null;
            this.ViewTabulkaNalezenych.updateData([], "set");
            this.find(".js-detailBadge").html("0 / 0");

            this.element.closest(".ui-dialog").find("[data-param-id='BadgeOvereniVROB']").html(0);
        },


        volaniOvereni: function () {
            var that = this;
            this.vynulovatPromene();
            this.VyberZRosItemsWorkDto.IcoValue = this.VyberZRosItemsWorkDto.Ico;
           
            this.beginOperation();
            // mazani při opakovaném volání
            that.findFields(".js-iszrOdpoved").gfield("clear");

            this.call("Hledat", { soubor:"", robItems: this.VyberZRosItemsWorkDto})
                .done(function (retVal) {
                    console.log("retVal", retVal);

                    that.VyberZRosItemsWorkDto.VysledekOvereni = retVal.VyberZRosItemsDto.VysledekOvereni;
                    that.VyberZRosItemsWorkDto.IszrZadostId = retVal.VyberZRosItemsDto.IszrZadostId;
                    that.VyberZRosItemsWorkDto.OdpovedInfo = retVal.VyberZRosItemsDto.OdpovedInfo;

                    if (retVal.VyberZRosItemsDto.VysledekOvereni === 3 ) { //ZadanAsynchronniPozadavek = 3
                        that.dialogs.warning("jres:31900565"); //RC 31900565 : Byl zadán asynchroní požadavek
                    }
                    else if (retVal.VyberZRosItemsDto.VysledekOvereni === 1 ) { // OverenoSynchronne = 1,
                        
                        that.naplnGrid(retVal);
                    }

                    that.endOperation();

                    that.findFields(".js-iszrOdpoved").gfield("model", "apply", retVal.VyberZRosItemsDto);

                    that.zkusZobrazitMessageASetniStatus(retVal.VyberZRosItemsDto);

                })
                .fail(function (xhr, type, vobj) {
                    console.log("typ exception: ", type, vobj);
                    that.endOperation();
                });
        },
        overit: function () {
            var that = this;
           
            this.findFields(".js-orig, .js-iszrDotaz, .js-iszrOdpoved").gfield("model", "collect", this.VyberZRosItemsWorkDto);
            var IszrZadostId = this.VyberZRosItemsWorkDto.IszrZadostId;
            var gAsyn = this.VyberZRosItemsWorkDto.SrzAsynchronneCheckboxChecked;
            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (/*!IszrZadostId   &&*/ !gAsyn && formISValid) {
                this.volaniOvereni();
            } else {
                if (gAsyn) {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900566"); //RC 31900566 : Je zaškrtnuto pole pro synchroní požadavek.
                } else {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900567"); //RC 31900567 : Nelze spustit synchroní požadavek o ověření.
                }
            }
        },

        OveritAsynchronne: function () {

            var that = this;
            this.findFields(".js-orig, .js-iszrDotaz, .js-iszrOdpoved").gfield("model", "collect", this.VyberZRosItemsWorkDto);
            var IszrZadostId = this.VyberZRosItemsWorkDto.IszrZadostId;
            var gAsyn = this.VyberZRosItemsWorkDto.SrzAsynchronneCheckboxChecked;
            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (!IszrZadostId && gAsyn && formISValid && this.origModel.IxsEsu != null) {
                this.volaniOvereni();
            } else {
                if (!gAsyn) {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900568"); //RC 31900568 : Není zaškrtnuto pole pro asynchroní požadavek.
                } else {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900569"); //RC 31900569 : Nelze spustit asynchroní požadavek o ověření.
                }
            }
        },

        zkusZobrazitMessageASetniStatus: function (VyberZRosItemsWorkDto) {

            if (VyberZRosItemsWorkDto.Message) {
                this.dialogs.warning("Zpráva", VyberZRosItemsWorkDto.Message);
                VyberZRosItemsWorkDto.Message = null;
            }
            this.findFields("StatusText").gfield("setValue", VyberZRosItemsWorkDto.StatusText);
            this.enablecontrols();
        },

        naplnGrid: function (data) {
            var that = this;
            this.ROSData = data;
            this.TypOrg = data.TypOrg;
            this.PrForma = data.PrForma;

            this.SzrsrosDtoPro = data.SzrsrosDtoPro;
            this.SzrsosfDto = data.SzrsosfDto;
            this.SzrsossDto = data.SzrsossDto;
            this.PocetSzrsosn = data.PocetSzrsosn;
            this.SzrsosaDto = data.SzrsosaDto;

            this.vybranaOsoba = true;
            this.prizSzrsoag = data.prizSzrsoag;
            this.naplnDS(data);
            if (data.prizSzrsoag) {
                //this.ViewTabulkaNalezenych = new Gordic.Data.View(data.SzrsrosDtoOag, { key: "kod_ovm" });
                //this.GgridVysledekHledani.ggrid("setData", that.ViewTabulkaNalezenych, true);

                if (data.selectedoagRow && data.SzrsrosDtoOag && data.SzrsrosDtoOag.length >0 && data.SzrsrosDtoOag[0].kod_ovm != data.selectedoagRow.kod_ovm) { // pokud se hned bude měnit vybraný řádek, tak nekontroluju aktivitu
                    this.nekontrolovatAktivitu = true;
                }

                this.ViewTabulkaNalezenych.updateData(data.SzrsrosDtoOag, "set");
                this.nekontrolovatAktivitu = false;
                if (data.selectedoagRow) {
                    this.GgridVysledekHledani.ggrid("activeRow", { kod_ovm: data.selectedoagRow.kod_ovm });
                    this.NastavDleRadku(data.selectedoagRow);
                }
            }
            else {
                //this.ViewTabulkaNalezenych = new Gordic.Data.View(data.SzrsrosDtoOst, { key: "kod_ovm" });
                //this.GgridVysledekHledani.ggrid("setData", that.ViewTabulkaNalezenych, true);
                this.ViewTabulkaNalezenych.updateData(data.SzrsrosDtoOst, "set");
            }

           
            // this.setPrvniPoNahraniNovychDat();
        },

        NastavDleRadku:function(row)
        {
            this.vybranyNovyRadek();
            this.VyberZRosItemsWorkDto.PostaKod = null;
            //IdDs2Smaz();
            if (this.prizSzrsoag) {
                if (row != null && row.aktivita == 100)   // ALF 31.10.2016 nastavit lze pouze aktivní editorskou agendu
                    console.log("data jsou", row);
                    this.NastavRosDleRadkuoag(row);
            }
            else
            {
                this.NastavRobDleRadku(row);
            }
            var prevzitProvozovnu = this.findFields("gCheckBoxProvoz").gfield("getValue");
            if (prevzitProvozovnu) {
                if (this.Szrspro)
                    this.NastavRosDleProvozovny(this.IdProvozovny);
            }
            this.nastavpravniFormu();
            this.pokusOZavolaniPromisu();
        },

        pokusOZavolaniPromisu: function () {
            var that = this;
            if (this.promiseArray.length >= 1) {
                this.promiseArray[0].done(function (retVal) {
                    that.cekaniNaPromise();
                });
            } else {
                this.cekaniNaPromise();
            }
        },
        
        NastavRosDleRadkuoag: function (row) //NastavRobDleRadku2
        {
            this.findFields(".js-ISZR").gfield("clear");
   
            this.EditorskaOvmAAgenda = ("" + row.kod_ovm.trim() + ";" + row.kod_agendy.trim() + ";").slice(0,35);
           
            if (row.ico) {
                var temp = "00000000" + row.ico;
                row.ico = temp.slice(-8);
            }

            row.provozovna = "jres:31900552";   //RC 31900552 : Hlavní sídlo
            this.findFields(".js-ISZR").gfield("model", "apply", row);

             //obchodni jmeno ikonka
            var field = this.findFields("ObchodniJmenoISZR");
            var ico = this.GetImgStavSpravny(row.stav_nazev_osoby);
            if (ico) {
                field.gfield("addState", ico);
            }
            field = this.findFields("DatcinostiOdISZR");
            ico = this.GetImgStavSpravny(row.stav_dat_vzn_opr);
            if (ico) {
                field.gfield("addState", ico);
            }
            field = this.findFields("DatcinostiDoISZR");
            ico = this.GetImgStavSpravny(row.stav_dat_zan_opr);
            if (ico) {
                field.gfield("addState", ico);
            }

            if (row.adresni_misto_kod) {
               
                var AdresaKod = parseInt(row.adresni_misto_kod);
                if (AdresaKod && AdresaKod != 0) {
                    this.NactiAdresuDoPolozek(AdresaKod);
                }
            }
            else {

                this.findFields("UliceRos").gfield("setValue", row.adresa_textem.trim());
            }

            // ALF 24.7.2012 doplněno načtení id dat schránky - neznáme číselník takže prozatím přebíráme id s typem 20 nebo 30
            
            this.NastavDs();
            this.nastavpravniFormu();
             
        },

        NastavRobDleRadku:function(row)
        {
            this.findFields(".js-ISZR").gfield("clear");

            if (row.ico) {
                var temp = "00000000" + row.ico;
                row.ico = temp.slice(-8);
            }

            if (row.fo_textem) row.nazev_osoby = l_Row.fo_textem;

            row.provozovna = "jres:31900552";   //RC 31900552 : Hlavní sídlo
            this.findFields(".js-ISZR").gfield("model", "apply", row);

            //obchodni jmeno Ico
            var field = this.findFields("ObchodniJmenoISZR");
            var ico = this.GetImgStavSpravny(row.fo_textem_stav);
            if (ico) {
                field.gfield("addState", ico);
            }

            if (row.adresni_misto_kod) {

                var AdresaKod = parseInt(row.adresni_misto_kod);
                if (AdresaKod && AdresaKod != 0) {
                    this.NactiAdresuDoPolozek(AdresaKod);
                }
            }
            else {

                this.findFields("UliceRos").gfield("setValue", row.adresa_textem.trim());
            }
            

            // ALF 24.7.2012 doplněno načtení id dat schránky - neznáme číselník takže prozatím přebíráme id s typem 20 nebo 30

            this.NastavDs();
            this.nastavpravniFormu();
        },

        NastavRosDleProvozovny:function(idProvozovny)
        {
            var row = null;
            var cislo = parseInt(idProvozovny);
            if (this.SzrsrosDtoPro) {
                //var view = new Gordic.Data.View(this.SzrsrosDtoPro, { key: "icp" });
                //var x = view.applyView({ filter: "icp === " + idProvozovny.toString()});
                //row = view.getDataRows(true, "filter");
                var rows = this.SzrsrosDtoPro.filter(function (el) {
                    return el.icp === idProvozovny 
                });
                if (rows && rows.length > 0) {
                    row = rows[0];
                } else {
                    row = null;
                }
            } 
            if (!row) { return null; }

            //this.findFields(".js-ISZR").gfield("clear");

            this.findFields("provozovnaISZR").gfield("setValue", idProvozovny);
            this.findFields("DatcinostiOdISZR").gfield("setValue", row.dat_zahaj_cinnosti);
            this.findFields("DatcinostiDoISZR").gfield("setValue", row.dat_ukonc_cinnosti);

            var field = this.findFields("DatcinostiOdISZR");
            var ico = this.GetImgStavSpravny(row.stav_dat_zah_cin);
            if (ico) {
                field.gfield("addState", ico);
            }
            field = this.findFields("DatcinostiDoISZR");
            ico = this.GetImgStavSpravny(row.stav_dat_uk_cin);
            if (ico) {
                field.gfield("addState", ico);
            }
            field = this.findFields("provozovnaISZR");
            ico = this.GetImgStavSpravny(row.stav_adr_provoz);
            if (ico) {
                field.gfield("addState", ico);
            }


            if (row.adresni_misto_kod) {

                var AdresaKod = parseInt(row.adresni_misto_kod);
                if (AdresaKod && AdresaKod != 0) {
                    this.NactiAdresuDoPolozek(AdresaKod);
                }
            }
            else {

                this.findFields("UliceRos").gfield("setValue", row.adresa_textem ? row.adresa_textem.trim() : null);
                this.adresaNastavena = true;
            }

            
            this.NastavDs(); // bylo to zakomentěný 
        },
        NactiAdresuDoPolozekCallCounter: 0,
        NactiAdresuDoPolozek: function (AdresaKod) {
            var that = this;

            var duvod = this.findFields("Duvod").gfield("getValue");
            var role = this.findFields("Role").gfield("getValue");
            if (duvod && duvod.data && role && role.agendova_role) {
                this.beginOperation();
                this.NactiAdresuDoPolozekCallCounter++;
                var promiseAdresa = this.call("NactiAdresuDoPolozek", { adrKod: AdresaKod, Role: role.agendova_role, Duvod: duvod.data, callCounter: this.NactiAdresuDoPolozekCallCounter })
                    .done(function (retVal) {
                        if (retVal && retVal.dto && retVal.callCounter == that.NactiAdresuDoPolozekCallCounter) {
                            console.log("adresa", retVal.dto);
                            if (that.adresaNastavena !== true) { 
                                that.findFields("AdresaRosRuian").gfield("setValue", AdresaKod);
                                that.findFields(".js-ISZRAdresa").gfield("model", "apply", retVal.dto);
                            
                                that.VyberZRosItemsWorkDto.PostaKod = retVal.dto.PostaKod.toString();
                            }
                            that.adresaNastavena = false;
                            
                        }
                        that.endOperation();
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });
                this.promiseArray.push(promiseAdresa);
            }
        },
        naplnDS: function (data) {
            var field = this.findFields("IDDSRos");
            field.gfield("option", "data", new Gordic.Data.View([], { key: "id_ds" }));
            if (data.SzrsrosDtoDas) { 
                var view = new Gordic.Data.View(data.SzrsrosDtoDas, { key: "id_ds" });
                field.gfield("option", "data", view);
            }
        },

        NastavDs: function () {
            var isdsRosField = this.findFields("IDDSRos");
            var hodnota = isdsRosField.gfield("getValue");
            if (hodnota == null) {
                var oldValue = this.findFields("IdDs").gfield("getValue");
                if (oldValue) {
                    isdsRosField.gfield("setValueFromKeys", oldValue);
                } else {
                    var dataviw = isdsRosField.gfield("option", "data");
                    var data = dataviw.getRows();
                    if (data && data.length === 1) {
                        isdsRosField.gfield("setValueFromKeys", data[0].id_ds);
                    }
                }
            }
            
        },

        nastavpravniFormu:function() {

            if (this.PrForma) {
                this.findFields("prFormaISZR").gfield("setValue", this.PrForma);
            }
        },

        cekaniNaPromise: function () {
            var that = this;
            if (that.promiseArray.length > 0) {
                $.when.apply(null, that.promiseArray).then(function () {
                    //$.when(that.promiseArray).done(function () {
                    console.log("cally dokončeny");
                    that.promiseArray = [];
                    that.PorovnejOsoby();
                    that.enablecontrols();
                });
            } else {
                that.PorovnejOsoby();
                that.enablecontrols();
            }
        },

        PorovnejOsoby:function() {
            this.odstranPorovnavaciIkonky();

            var fieldOrig = this.findFields("Ico");
            var OrigValue = fieldOrig.gfield("getValue");
            var ValueIszr = this.findFields("IcoISZR").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueIszr);

            fieldOrig = this.findFields("ObchodniJmeno");
            OrigValue = fieldOrig.gfield("getValue");
            ValueIszr = this.findFields("ObchodniJmenoISZR").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueIszr);

            fieldOrig = this.findFields("KodUirAdr");
            OrigValue = fieldOrig.gfield("getValue");
            ValueIszr = this.findFields("AdresaRosRuian").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueIszr);

            fieldOrig = this.findFields("IdDs");
            OrigValue = fieldOrig.gfield("getValue");
            var temp = this.findFields("IDDSRos").gfield("getValue");
            ValueIszr = temp ? temp.id_ds : null;
            Gordic.Esu.Function.PorovnejApridejIco(fieldOrig, OrigValue, ValueIszr);

            fieldOrig = this.findFields("TypOrganizace");
            temp = fieldOrig.gfield("getValue");
            var stav = null;
            if (this.TypOrg && temp) {
                OrigValue = temp.typ_org;
                stav = 20;
                if (this.TypOrg !== 0 && OrigValue === this.TypOrg && this.gin_iszr_esuprf !== 0) {
                    stav = 10;
                }
            }
            ico = Gordic.Esu.Function.GetImgporovnani(stav);
            if (ico) {
                fieldOrig.gfield("addState", ico);
            }

            fieldOrig = this.findFields("prFormaISZR");
            stav = null;
            if (this.TypOrg === 0 && this.gin_iszr_esuprf !== 0) {
                var ico = {
                    id: "ico", icon: "fa-exclamation-triangle", customClass: "g-state-warning",
                    tooltip: "! " + "jres:31900570" //RC 31900570 : Pro tuto právní formu není zadministrován odpovídající typ organizace.Kontaktujte administrátora.
                };
                fieldOrig.gfield("addState", ico);
            }


            var Obec = this.findFields("Obec");
            var ObecVal = Obec.gfield("getValue");
            var ObecRos = this.findFields("ObecRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(Obec, ObecVal, ObecRos);

            var CastObce = this.findFields("CastObce");
            var CastObceVal = CastObce.gfield("getValue");
            var CastObceRos = this.findFields("CastObceRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CastObce, CastObceVal, CastObceRos);

            var Ulice = this.findFields("Ulice");
            var UliceVal = Ulice.gfield("getValue");
            var UliceRos = this.findFields("UliceRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(Ulice, UliceVal, UliceRos);

            var CisloPopisne = this.findFields("CisloPopisne");
            var CisloPopisneVal = CisloPopisne.gfield("getValue");
            var CPopisneRos = this.findFields("CPopisneRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CisloPopisne, CisloPopisneVal, CPopisneRos);

            var CisloOrientacni = this.findFields("CisloOrientacni");
            var CisloOrientacniVal = CisloOrientacni.gfield("getValue");
            var COrientacniRos = this.findFields("COrientacniRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CisloOrientacni, CisloOrientacniVal, COrientacniRos);

            var COrientPism = this.findFields("COrientPism");
            var COrientPismVal = COrientPism.gfield("getValue");
            var COrientPismRos = this.findFields("COrientPismRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(COrientPism, COrientPismVal, COrientPismRos);

            //dodatkové
            var CJmeno = this.findFields("Jmeno");
            var CJmenoVal = CJmeno.gfield("getValue");
            var CJmenoRos = this.findFields("JmenoRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CJmeno, CJmenoVal, CJmenoRos);

            var CPrijmeni = this.findFields("Prijmeni");
            var CPrijmeniVal = CPrijmeni.gfield("getValue");
            var CPrijmeniRos = this.findFields("PrijmeniRos").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CPrijmeni, CPrijmeniVal, CPrijmeniRos);

        },



        vybranyNovyRadek: function () {
            this.odstranPorovnavaciIkonky();
            this.odstranISZRIkonky();
        },

        

        odstranPorovnavaciIkonky: function () {
            this.findFields(".js-origCompareIco, .js-ISZR").each(function (imdex, field) {
                var stat = $(field).gfield("getState", "icoCompare");
                if (stat && stat.length > 0)
                    stat.remove();
            });
        },

        odstranISZRIkonky: function () {
            this.findFields(".js-ISZR").each(function (imdex, field) {
                var stat = $(field).gfield("getState", "ico");
                if (stat && stat.length > 0)
                    stat.remove();
            });
        },

        //PorovnejApridejIco: function (field, hodnota1, hodnota2) {
        //    var ico = null;
        //    var stav = null;
        //    var trim = false;

        //    if (typeof hodnota1 === "string" && typeof hodnota2 === "string") {
        //        trim = true;
        //    }

        //    if (trim && hodnota1 !== null && hodnota1.trim().toLowerCase() === hodnota2.trim().toLowerCase()) {
        //        stav = 10;
        //    } else if (hodnota1 !== null && hodnota1 === hodnota2) {
        //        stav = 10;
        //    } else if (hodnota1 !== null && hodnota1 instanceof Date && hodnota2 instanceof Date && hodnota1.getTime() === hodnota2.getTime()) {
        //        stav = 10;
        //    } else if (hodnota1 == null && hodnota1 === hodnota2) {
        //        stav = null; //null;
        //    } else {
        //        stav = 20;
        //    }

        //    ico = this.GetImgporovnani(stav);
        //    if (ico) {
        //        field.gfield("addState", ico);
        //    }

        //},

        GetImgStavSpravny: function (stav) {
            if (stav === 10)
                return { id: "ico", icon: "gi-tick", customClass: "g-state-success", tooltip: "✓ " + "jres:31900290" }; //RC 31900290 : Ověřeno

            else if (stav === 20 || stav === 30)
                return { id: "ico", icon: "gi-window-close", customClass: "g-state-important", tooltip: "✗ " + "jres:31900571" }; //RC 31900571 : Údaj v registrech je označen jako neplatný.
            else
                return null;
        },

        GetImgporovnani: function (stav) {
            if (stav === 10) // 10
                return { id: "icoCompare", icon: "gi-tick", customClass: "g-state-success", tooltip: "✓ " + "jres:31900307" }; //RC 31900307 : Shoduje se
            else if (stav === 20) //20
                return { id: "icoCompare", icon: "gi-window-close", customClass: "g-state-important", tooltip: "✗ " + "jres:31900308" }; //RC 31900308 : Neshoduje se
            else
                return null;
        },

        saveAndCloseDet: function () {
            //TODO

            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (formISValid) { //|| m_bVyberHromData
                if (this.serverParams.EditMode  && this.vybranaOsoba) {
                    
                    var values = {};
                    values.VysledekOvereni = this.VyberZRosItemsWorkDto.VysledekOvereni;
                    values.IszrZadostId = this.VyberZRosItemsWorkDto.IszrZadostId;
                    values.ObchodniJmeno = this.findFields("ObchodniJmenoISZR").gfield("getValue");
                    values.Ulice = this.findFields("UliceRos").gfield("getValue"); // adresa je v ulici
                    values.AdrKod = this.findFields("AdresaRosRuian").gfield("getValue");
                    //values.AdrKod = this.VyberZRosItemsWorkDto.AdrKod; 
                    values.Jmeno = this.findFields("JmenoRos").gfield("getValue");
                    values.Prijmeni = this.findFields("PrijmeniRos").gfield("getValue");

                    this.findFields(".js-ISZRAdresa").gfield("model", "collect", values);
                    values.PostaKod = this.VyberZRosItemsWorkDto.PostaKod;
                   
                    var temp = this.findFields("IDDSRos").gfield("getValue");
                    if (temp) {
                        values.IDDS = temp.id_ds;
                    } else {
                        values.IDDS = null;
                    }
                    values.Ico = this.findFields("IcoISZR").gfield("getValue");
                    values.PrevzitProvozovnu = this.findFields("gCheckBoxProvoz").gfield("getValue");
                    values.Provozovna = this.findFields("provozovnaISZR").gfield("getValue");
                    values.CasOdpovedi = this.VyberZRosItemsWorkDto.OdpovedInfo.CasOdpovedi;
                    values.AgendaZadostId = this.VyberZRosItemsWorkDto.OdpovedInfo.AgendaZadostId;
                    values.RegOdpovedId = this.VyberZRosItemsWorkDto.OdpovedInfo.RegOdpovedId;
                    values.PrepnoutTypEsuNaOsvc = this.PrepnoutTypEsuNaOsvc;
                    values.TypOrg = this.TypOrg;
                    values.DatUkonceni = this.findFields("DatcinostiDoISZR").gfield("getValue");
                    values.EditorskaOvmAAgenda = this.EditorskaOvmAAgenda;
                    
                    this.close(values);
                }
            }
        },

        odstranitVazbu: function () {
            var that = this;
            if (this.m_iPocetPrihlasenychAgend > 0) {
                this.dialogs.warning("Odstranit vazbu na SZR lze pouze u subjektu, který je odhlášen ze sledování změn."); 
                return;
            }

            //VysledekOvereni = OvereniVSzrRob.OdstraneniVazbyNaSzrRob; //5
            var ret = {
                VysledekOvereni: 5 // OvereniVSzrRob.OdstraneniVazbyNaSzrRob
            };
            this.close(ret);
        },

        enablecontrols: function () {
            /// <summary>
            /// Povolení jednotlivých políček a přenastavení filtrů
            /// </summary>
            var that = this;
            var pocetProv = "0";
            var pocetStat = "0";
            var provoz = 0;
            var statutaru = 0;
            this.findFields("SrzAsynchronneCheckboxChecked").gfield("option", "disabled", this.VyberZRosItemsWorkDto.IszrZadostId ? false : true);
            if (this.gin_iszr_synasy === 0) {
                this.findFields("SrzAsynchronneCheckboxChecked").gformsection().hide();
            }

            var Ico = this.findFields("Ico").gfield("getValue");
            var Agenda = this.findFields("Agenda").gfield("getValue");
            var Role = this.findFields("Role").gfield("getValue");
            var Duvod = this.findFields("Duvod").gfield("getValue");
            var overitEnabled = this.VyberZRosItemsWorkDto.IszrZadostId == null
                && Ico != null
                && Agenda != null
                && Role != null
                //&& Agenda.s_prist_rob != 0
                && Duvod != null
                && Duvod.data != null;

            this.actions.actOverit.update({ enabled: overitEnabled });


            var gAsyn = this.findFields("SrzAsynchronneCheckboxChecked").gfield("getValue");
            this.actions.actOveritAsynchronne.update(
                {
                    enabled: (!this.VyberHromData && this.VyberZRosItemsWorkDto.IszrZadostId != null && gAsyn && this.origModel.IxsEsu != null),
                    visible: (this.gin_iszr_synasy === 1)
                }
            );

            var provozovnaEnabled = that.gin_iszr_synasy === 1 && EsuJeAdresaPobocka;
            if (this.gin_esu_zatypad !== 0 && this.vybranaOsoba)
                if (this.origModel.TypAdr === 10)
                    this.findFields("gCheckBoxProvoz").gfield("setValue", true);
            this.actions.actOveritVrob.enabled(false);
            if (this.SzrsosfDto) {
                var pocetStatutaru = 0;
                $(this.SzrsosfDto).each(function (index, row) {
                    if (row.aktivita === 100 && row.agenda === that.IszrDefaultAgenda)      // ALF 29.1.2015 SZR - ROS - zobrazují se pouze aktivní statutáři a filtrují se dle agendy SZR (docházelo k zobrazení statutárů, kteří po aktuálním ověření již neměli být vidět)
                        pocetStatutaru = pocetStatutaru + 1;
                });

                statutaru = pocetStatutaru;
                if (statutaru > 0 && Agenda != null && Agenda.s_prist_rob != 0) {
                    this.actions.actOveritVrob.enabled(true);

                    this.element.closest(".ui-dialog").find("[data-param-id='BadgeOvereniVROB']").html(statutaru);
                } else {
                    this.actions.actOveritVrob.enabled(false);
                }
            }
            ////////////////
            if (this.SzrsossDto) {
                statutaru += this.SzrsossDto.length;
            }

            statutaru += this.PocetSzrsosn;
            if (this.SzrsrosDtoPro) provoz += this.SzrsrosDtoPro.length;

            if (provoz > 0) pocetProv = provoz.toString();
            if (statutaru > 0) pocetStat = statutaru.toString();
            var vysledneStr = pocetProv + " / " + pocetStat;
            this.find(".js-detailBadge").html(vysledneStr);

            var jePoNeboOsvc = this.origModel.TypEsu === 30 || this.origModel.TypEsu === 10;

            this.actions.actOveritVrobOsobu.enabled(false);
            if (this.SzrsosaDto || this.SzrsosfDto) { // dříve and
                if (this.actions.actOverit.enabled() && jePoNeboOsvc && Agenda != null && Agenda.s_prist_rob != 0 )
                     this.actions.actOveritVrobOsobu.enabled(true);
            }
            if (jePoNeboOsvc) {
                this.findFields(".js-hideField").show();
            } else {
                this.findFields(".js-hideField").hide();
            }
            
            this.actions.actOdstranitVazbu.update({ visible: this.gin_esu_povoadm != 0 });
            this.actions.actOdstranitVazbu.enabled(true);
            //gActionOdstranitVazbu.Visible = UserProcess.Configuration.GetDatabaseParameter("gin_esu_povoadm", 0) != 0;
            //gActionOdstranitVazbu.Enabled = gActionOverit.Enabled;  

        },

        overitVROBOsobu: function () {
            var that = this;
            if (this.SzrsosaDto) {
                //provedenoOvereni = true

                if (this.origModel.TypEsu === 10) {
                    this.dialogs.confirm("jres:31900572", //RC 31900572 : Přepnutí na OSVČ
                        "jres:26265464").on("close", function (ev, retVal) { //RC 26265464 : U ESU je uveden typ právnická osoba. Přejete si jej přepnout na OSVČ?
                        if (retVal) {
                            if (retVal === "yes") {
                                that.PrepnoutTypEsuNaOsvc = true;
                            } else {
                                that.PrepnoutTypEsuNaOsvc = false;
                            }
                        }
                    });
                }
                   
                this.beginOperation();
                this.call("OveritOsobuVRob", { robItems: this.VyberZRosItemsWorkDto, Szrsosa: this.SzrsosaDto, Szrsosf: this.SzrsosfDto})
                    .done(function (retVal) {
                        if (retVal) {
                            that.findFields("JmenoRos").gfield("setValue", retVal.Jmeno || null);
                            that.findFields("PrijmeniRos").gfield("setValue", retVal.Prijmeni || null);
                            that.PorovnejOsoby();
                            that.endOperation();
                        }
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });
            }

        },
        otevriDetail: function () {
            var that = this;
            var provozovna = this.findFields("provozovnaISZR").gfield("getValue");
            var IdDs = this.findFields("IDDSRos").gfield("getValue");
            if (IdDs) { IdDs = IdDs.id_ds; }

            var options = {
                EditMode: this.provozovnaEnabled,
                idPobocky: provozovna,
                ROSdata: this.ROSData,
                IdDs: IdDs
            };

            Gordic.Esu.Dialogs.GVyberZRosDataTabDlg(this, options).on("close", function (ev, retVal) {
                if (retVal) {
                    if (retVal.icp) {
                        that.IdProvozovny = retVal.icp;
                        var row = that.GgridVysledekHledani.ggrid("getSelection");
                        if (row.length > 0) {
                            row = row[0];
                            that.NastavDleRadku(row);
                        }
                    }
                }
            });
        },

        prihlasitZmeny: function () {
            var that = this;
            this.call("PrihlasitZmeny", { robItems: this.VyberZRosItemsWorkDto })
                .done(function (retVal) {
                    if (retVal) {
                        that.findFields("StatusText").gfield("setValue", retVal.StatusText);
                        if (retVal.Message) {
                            that.dialogs.messageBox("Informace", retVal.Message);
                        }
                        that.aktualizujPocet();
                    }
                })
                .fail(function (xhr, type, vobj) {
                });
            
        },
        odhlasitZmeny: function () {
            var that = this;
            this.call("OdhlasitZmeny", { robItems: this.VyberZRosItemsWorkDto })
                .done(function (retVal) {
                    if (retVal) {
                        that.findFields("StatusText").gfield("setValue", retVal.StatusText);
                        if (retVal.Message) {
                            that.dialogs.messageBox("Informace", retVal.Message);
                        }
                        that.aktualizujPocet();
                    }
                })
                .fail(function (xhr, type, vobj) {
                });
        },

        aktualizujPocet: function () {
            var that = this;
            
            this.call("AktualizujPocet", { robItems: this.VyberZRosItemsWorkDto })
                .done(function (retVal) {
                    if (retVal != null) {
                        that.actions.actPrihlasit.update({ caption: "Přihlásit ke změnám ({0})".format(retVal) });
                        that.actions.actPrihlasit.update({ tooltip: "Přihlásit ke změnám ({0} agend přihlášeno přes AISV)".format(retVal) });
                        that.actions.actOdhlasit.update({ caption: "Odhlásit z AISV ({0})".format(retVal) });
                        that.actions.actOdhlasit.update({ tooltip: "Odhlásit z AISV ({0} agend odhlášeno)".format(retVal) });
                    }
                })
                .fail(function (xhr, type, vobj) {
                });
            
        },

        repStarting: function (rep) {

            rep.params.X0000 = this.origModel.IxsEsu;
            rep.params.X0001 = this.origModel.Ico;
            if (this.VyberZRosItemsWorkDto
                && this.VyberZRosItemsWorkDto.OdpovedInfo
                && this.VyberZRosItemsWorkDto.OdpovedInfo.AgendaZadostId)
            {
                rep.params.X0002 = this.VyberZRosItemsWorkDto.OdpovedInfo.AgendaZadostId;
            }
            else
            { rep.params.X0002 = ""; }

            rep.params.X0003 = this.Revize;

            rep.params.X0004 = "";
            rep.params.X0005 = "";
            rep.params.X0006 = "";
            rep.params.X0007 = "";
            rep.params.X0008 = "";
        },

        cancel:function(){
            //TODO
            //(UserProcess.Configuration.GetDatabaseParameter("gin_iszr_esvynu", 0) == 0)||!stejnaPrijmeni;
        },


        closeDet: function(){
            $.content(this).close(false);
        }

     

        

    }, { extendIntellisense: GContent });
    

});

   