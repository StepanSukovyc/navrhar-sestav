
$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.SzrAiseoDlg", {
        onContentReady: function () {
            console.log("Zacatek Scriptu");
            var that = this;
            this.promiseArray = [];

            Gordic.Esu.Function.trimObj(this.origModel);
            // data

            // sekce 1
            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720" })
                .addSection("jres:31901018") //RC 31901018 : Hledaný občan
                .addRow("jres:31901020").addField("gselectbox", { //RC 31901020 : Typ hledání
                    name: "TypHledani",
                    customClass: "js-orig js-origCompareIco",
                    //disabled: true,
                    model: "model.TypHledani=value.key",
                    itemTemplate: "{val}",
                    dropdown: true,
                    initialValue: { key: "Parametr1RCJmPrij", val: "jres:31901063" }, //RC 31901063 : RČ, Jméno, Příjmení
                    data: new Gordic.Data.View(
                        [
                            { key: "Parametr1RCJmPrij", val: "jres:31901064" }, //RC 31901064 : RČ, Jméno, Příjmení
                            { key: "Parametr5RCJmRodPrij", val: "jres:31901065" }, //RC 31901065 : RČ, Jméno, Rodné příjmení
                            { key: "Parametr9JmPrijDatNar", val: "jres:31901066" }, //RC 31901066 : Jméno, Příjmení, Datum narození
                            { key: "Parametr10JmRodPrijDatNar", val: "jres:31901067" }, //RC 31901067 : Jméno, Rodné příjmení, Datum narození
                            { key: "Parametr12RCJmPrijDatNar", val: "jres:31901068" } //RC 31901068 : Jméno, Příjmení, Datum narození, RČ
                        ], { key: "key" }),
                    change: function (ev, ChObj) {
                        that.zmenNastavenipodleTypuHledani();
                        ;
                    },
                })
                .addRow("jres:31901020").addText("Načtení dat z AISEO bude realizováno přes AIFO.","js-TextHledaniAifo")
                //RC 31901020 : Typ hledání
                .addRow("jres:26265153").addField("gstringbox", { name: "Jmeno", customClass: "js-orig js-origCompareIco js-hideField", disabled: false }) //RC 26265153 : Jméno
                .addRow("jres:26265152").addField("gstringbox", { name: "Prijmeni", customClass: "js-orig js-origCompareIco js-hideField", disabled: false }) //RC 26265152 : Příjmení
                .addRow("jres:31901019").addField("gdatebox", { name: "DatNar", customClass: "js-orig js-origCompareIco js-hideField", valueType: "date", disabled: false }) //RC 31901019 : Datum narození
                .addRow("jres:31901021").addField("gstringbox", { name: "RodPrijmeni", customClass: "js-orig js-origCompareIco js-hideField", disabled: false }) //RC 31901021 : Rodné přijmení
                .addRow("jres:31901022").addField("gstringbox", { name: "RC", model:"model.RodneCislo=value", customClass: "js-orig js-origCompareIco js-hideField", disabled: false }) //RC 31901022 : Rodné číslo
                .addRow("jres:31901023").addField("gstringbox", { name: "StatPrisl", customClass: "js-orig js-origCompareIco js-hideField", disabled: true }) //RC 31901023 : Státní příslušnost
                .addRow("jres:31901053").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { //RC 31901053 : Státní příslušnost
                    name: "StatSp", model: "model.StatSp=value.stat",
                    customClass: "js-orig js-origCompareIco js-hideField",
                    disabled: true
                })

                //.addRow({ label: "&nbsp;", customClass: "w-S-h" }).addText("&nbsp;")
                .addRow("jres:26265149").addField("gstringbox", { name: "Obec", customClass: "js-orig  js-origCompareIco", disabled: true }) //RC 26265149 : Obec
                .addRow("jres:26265235").addField("gstringbox", { name: "CastObce", customClass: "js-orig  js-origCompareIco", disabled: true }) //RC 26265235 : Část obce
                .addRow("jres:26265147").addField("gstringbox", { name: "Ulice", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 26265147 : Ulice
                .addRow("jres:31900206").addField("gstringbox", { name: "CisloPopisne", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900206 : Č. popisné
                .addRow("jres:31900534") //RC 31900534 : Č. orientační
                .addField("gstringbox", "w-6", { name: "CisloOrientacni", customClass: "js-orig js-origCompareIco", disabled: true })
                .addField("gstringbox", "w-6", { name: "COrientPism", customClass: "js-orig js-origCompareIco", disabled: true })

                .addRow().addField("gcheck", { name: "Diakritika", customClass: "js-iszrDotaz", initialValue: false, label: "jres:31901024" }) //RC 31901024 : Hledat s ohledem na diakritiku
                ;

                //.addRow("jres:31900539").addField("gstringbox", { //RC 31900539 : Adresa RUIAN
                //    name: "KodUirAdr",
                //    customClass: "js-orig",
                //    disabled: true,
                //    buttons: [{
                //        requireEdit: false,
                //        action: new GAction({ caption: "", name: "actAdresaRuianButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                //    }]
                //}); 
                // sekce 2
            //Formik
            //    .addSection("jres:31901025") //RC 31901025 : Občan v AISEO
            //    .addRow("jres:26265153").addField("gstringbox", { name: "AJmeno", customClass: "js-ISZR js-hideField", model: "model.jmeno=value", disabled: true }) //RC 26265153 : Jméno
            //    .addRow("jres:26265152").addField("gstringbox", { name: "APrijmeni", customClass: "js-ISZR js-hideField", model: "model.prijmeni=value", disabled: true }) //RC 26265152 : Příjmení
            //    .addRow("jres:31901026").addField("gstringbox", { name: "ARC", customClass: "js-ISZR", model: "model.rc=value", disabled: true }) //RC 31901026 : Rodné číslo
            //    .addRow("jres:31901027").addField("gstringbox", { name: "Pohlavi", customClass: "js-ISZR", model: "model.pohlavi=value", disabled: true }) //RC 31901027 : Pohlaví
            //    .addRow("jres:31901028").addField("gstringbox", { name: "RodinyStav", customClass: "js-ISZR", model: "model.rod_stav_txt=value", disabled: true }) //RC 31901028 : Rodinný stav
            //    .addRow("jres:31901019").addField("gdatebox", { name: "ADatNar", customClass: "js-ISZR", model: "model.datum_narozeni=value", valueType: "date", disabled: true })  //RC 31901019 : Datum narození
            //    .addRow("jres:31901029").addField("gdatebox", { name: "ADatUmrti", customClass: "js-ISZR", model: "model.datum_umrti=value", valueType: "date", disabled: true })  //RC 31901029 : Datum úmrtí
            //    .addRow("jres:31901030").addField("gstringbox", { name: "TypPobytu", customClass: "js-ISZR", model: "model.typ_pobyt_txt=value", disabled: true }) //RC 31901030 : Typ pobytu
            //    .addRow("jres:31901031").addField("gstringbox", { name: "StatPrisl", customClass: "js-ISZR", model: "model.st_obcan_txt=value", disabled: true }) //RC 31901031 : Státní příslušnost

            //    .addRow("jres:31901032").addField("gdatebox", { name: "PosledniAktualizace", customClass: "js-ISZR", model: "model.cas_odpovedi=value", disabled: true })  //RC 31901032 : Poslední aktualizace
            //    ;
            Gordic.Esu.Function.addFormObcanAISEO(Formik);
                /// sekce 3
            Formik.addSection("jres:31900555") //RC 31900555 : ISZR Dotaz
                .addRow("jres:26265327").addField("gselectbox", Gordic.Prefabs.Select.szrsage(), { //RC 26265327 : Agenda
                    name: "Agenda",
                    model: "model.Agenda = value.agenda",
                    customClass: "js-iszrDotaz",
                    dropdown: true,
                    disabled: true,
                    serverFilters: {
                        //agenda: this.AgendaFilterAgenda || undefined,
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
                    }
                })
                .addRow("jres:26265101").addField("gstringbox", { //RC 26265101 : Důvod
                    name: "Duvod",
                    customClass: "js-iszrDotaz"
                })

                /// sekce 4
                .addSection("jres:31900556") //RC 31900556 : ISZR odpověď
                // .addRow("AIFO").addField("gstringbox", { name: "m_oAifo" })
                .addRow("jres:26265221").addField("gstringbox", { //RC 26265221 : ID
                    name: "GID",
                    customClass: "js-iszrOdpoved",
                    model: "model.IszrZadostId=value",
                    disabled: true,
                    //buttons: [{
                    //    requireEdit: false,
                    //    action: new GAction({ caption: "", name: "actAifoButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    //}]
                })
                .addRow("jres:31900557").addField("gstringbox", { //RC 31900557 : Status
                    name: "StatusText", customClass: "js-iszrOdpoved", disabled: true, rows: 2
                });
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            //// sekce s tablem

            //var Formik2 = new Gordic.Forms
            //    .Form("L3M3S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720")
            //    .addSection()
            //    .addRow().addField("gcheck", { name: "SrzAsynchronneCheckboxChecked", customClass: "js-iszrDotaz", initialValue: false, disabled: that.gin_iszr_synasy === 1, label: "jres:31900558" }) //RC 31900558 : SZR volat asynchronně

            //    .addSection()
            //    //.addRow().addField("gcheck", { name: "gCheckBoxProvoz", customClass: "js-iszrDotaz", initialValue: false , label: "jres:31900559" }); //RC 31900559 : Převzít provozovnu
            //$("<div>").appendTo(this.element).gform("createFrom", Formik2);

            that.find(".js-orig").gfield("model", "apply", this.origModel);

            that.find(".js-iszrDotaz, .js-iszrOdpoved").gfield("model", "apply", this.baseDto);
          
            //that.findFields().gfield("model", "validators", this.VyberZRosItemsDtoValidators);

            //this.tabManager = $.newDiv().appendTo(this.element).attr('data-admin-mode-nav-assist', '').data('admin-mode-nav-assist', this.userSettings?.sub('tabs') ?? null);
            
            this.tabManager = $("<div>").appendTo(this.element)
                .gtabmanager({
                    groups: [
                        { id: "DalsiInformaceZAISEO", caption: "jres:31901069" }, //RC 31901069 : Další infromace z AISEO
                        { id: "DotceneosobyZAISEO", caption: "jres:31901070" }, //RC 31901070 : Dotčené osoby z AISEO
                        { id: "AdresyZAISEO", caption: "jres:31901071" }, //RC 31901071 : Adresy z AISEO

                    ],
                    scopeElement: this.element
                });

            this.createDalsiInformaceZAISEO();

            if (this.baseDto && this.baseDto.SzrAiseoSzrsieo && this.baseDto.SzrAiseoSzrsieo.length > 0) { 
                this.posledniNactenaSzrAiseo = this.baseDto;
                this.setFromularIszrData(this.baseDto.SzrAiseoSzrsieo[0]);
                this.setDalsiInformaceZAISEO(this.baseDto.SzrAiseoSzrsieo[0]);
                this.vybranaOsoba = true;
            }

            this.createDotceneosobyZAISEO();
            if (this.baseDto && this.baseDto.Osoby && this.baseDto.Osoby.length > 0) { 
                this.setDotceneosobyZAISEO(this.baseDto.Osoby);
            }

            this.createGridAdresy();
            if (this.baseDto && this.baseDto.Adresy && this.baseDto.Adresy.length > 0) {
                this.setGridAdresy(this.baseDto.Adresy);
            }
            
            this.tabManager.gtabmanager("refresh");

            this.inicializace();

        },


        createDalsiInformaceZAISEO: function () {
            var that = this;
            var Formik = Gordic.Esu.Function.getFormDalsiInformaceZAISEO();
            this.divDalsiInformace = $("<div>").appendTo(this.element)
                .gform("createFrom", Formik)
                .gtab({
                    title: "jres:31901072", //RC 31901072 : Další infromace z AISEO
                    opened: true,
                    group: { id: "DalsiInformaceZAISEO" }
                    //menuBar: that.actions.createBar(["actZapujcit*", "actVratit*", "actZpet*"])
            });
        },
        setDalsiInformaceZAISEO: function (obj) {
            this.findForms("DalsiInformaceZAISEO").findFields().gfield("model", "apply", obj);
        },

        clearDalsiInformaceZAISEO: function () {
            this.findForms("DalsiInformaceZAISEO").findFields().gfield("clear");
        },

        createDotceneosobyZAISEO: function () {
            var that = this;
          
            var gridformat1 = Gordic.Esu.Function.getColumnsDotceneOsobyZAISEO();

            this.actions.add(new GAction({
                name: "gridOsobySelectedAct",
                caption: "jres:31901093",  //RC 31901093 : Detail osoby
                icon: "gi-magglass",
                run: function (ev, obj) {
                    var sel = that.gridDotceneosobyZAISEO.ggrid("getSelection");
                    if (sel && sel.length > 0) { 
                        var options = {
                            aifo: sel[0].aifo
                        };
                        Gordic.Esu.Dialogs.DetOsobyAiseoDlg({ parentContent: that, opt: { inputDto: options }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })   
                            .done(function (retVal) {
                                if (retVal) {
                                    ;
                                }
                            });
                    }
                }
            }));
            

            this.ViewDotceneosobyZAISEO = new Gordic.Data.View([], { key: "" });
            this.gridDotceneosobyZAISEO = $("<div>").appendTo(this.element)
                .gtab({
                    title: "jres:31901073", //RC 31901073 : Dotčené osoby z AISEO
                    opened: true,
                    group: { id: "DotceneosobyZAISEO" },
                    menuBar: that.actions.createBar(["gridOsobySelectedAct*"])
                })
                .height(250)
                //.gautofit()
                .ggrid({
                    name: "GridDotceneosobyZAISEO",
                    data: this.ViewDotceneosobyZAISEO,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    defaultAction: this.actions.gridOsobySelectedAct,
                    //defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    //    name: "gridOsobySelectedAct",
                    //    run: function (ev, ctx) {
                    //        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                    //        var options = {
                    //            aifo: rowData.aifo
                    //        };
                    //        Gordic.Esu.Dialogs.DetOsobyAiseoDlg({ parentContent: that, opt: { inputDto: options }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })  //  
                    //            .done(function (retVal) {
                    //                if (retVal) {
                    //                    ;
                    //                }
                    //            });
                    //    }
                    //}),
                    scrollHelperTemplate: "{jmeno} - {prijmeni}",  // "{ixs_esu} - {nazev}",
                    
                    columns: gridformat1
                });
        },

        setDotceneosobyZAISEO: function (obj) {
            this.ViewDotceneosobyZAISEO.updateData(obj, "set");
        },
        clearDotceneosobyZAISEO: function () {
            this.ViewDotceneosobyZAISEO.updateData([], "set");
        },

        createGridAdresy: function () {
            var that = this;
            var gridformat1 = Gordic.Esu.Function.getColumnsAdresyZAISEO();

            this.actions.add(new GAction({
                name: "gridAdresySelectedAct",
                caption: "jres:31901093",  //RC 31901093 : Detail osoby
                icon: "gi-magglass",
                run: function (ev, obj) {
                    var sel = that.gridAdresyZAISEO.ggrid("getSelection");
                    if (sel && sel.length > 0) {
                        var options = {
                            aifo: sel[0].aifo,
                            typAde: sel[0].typ_ade,
                            porCislo: sel[0].por_cislo
                        };
                        Gordic.Esu.Dialogs.DetAdresyAiseoDlg({ parentContent: that, opt: { inputDto: options }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })  //  
                            .done(function (retVal) {
                                if (retVal) {
                                    ;
                                }
                            });
                    }
                }
            }));

            this.ViewAdresyZAISEO = new Gordic.Data.View([], { key: "" });
            this.gridAdresyZAISEO = $("<div>").appendTo(this.element)
                .height(250)
                .gtab({
                    group: { id: "AdresyZAISEO" },
                    title: "jres:31901074", //RC 31901074 : Adresy z AISEO
                    opened: true,
                    menuBar: that.actions.createBar(["gridAdresySelectedAct*"])
                })
                //.gautofit()
                .ggrid({
                    name: "GridAdresyZAISEO",
                    data: this.ViewAdresyZAISEO,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    defaultAction: this.actions.gridAdresySelectedAct,
                    //defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    //    name: "gridAdresySelectedAct",
                    //    run: function (ev, ctx) {
                    //        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                    //        var options = {
                    //            aifo: rowData.aifo,
                    //            typAde: rowData.typ_ade,
                    //            porCislo: rowData.por_cislo
                    //        };
                    //        Gordic.Esu.Dialogs.DetAdresyAiseoDlg({ parentContent: that, opt: { inputDto: options }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })  //  
                    //            .done(function (retVal) {
                    //                if (retVal) {
                    //                    ;
                    //                }
                    //            });
                    //    }
                    //}),
                    scrollHelperTemplate: "{Obec}",  // "{ixs_esu} - {nazev}",

                    columns: gridformat1
                });
        },

        setGridAdresy: function (obj) {
            this.ViewAdresyZAISEO.updateData(obj, "set");
        },
        clearGridAdresy: function () {
            this.ViewAdresyZAISEO.updateData([], "set");
        },

        clearFromularIszrData: function () {
            var jsIszrField = this.findFields(".js-ISZR");
            jsIszrField.gfield("clear");
        },

        setFromularIszrData: function (data) {
            var jsIszrField = this.findFields(".js-ISZR");
            jsIszrField.gfield("model", "apply", data);
        },




        inicializace: function () {
            var that = this;
            // hledani podle aifo
            if (this.pouzitHledaniPodleAifo) {
                this.findFields("Diakritika").gformrow().hide();
                var typHledaniField = this.findFields("TypHledani");
                typHledaniField.gfield("setValue", null);
                typHledaniField.gformrow().hide();
                this.findFields("Jmeno,Prijmeni,RodPrijmeni,RC,DatNar").gfield("disable");

            }
            else {
                this.find(".js-TextHledaniAifo").gformrow().hide();
                this.zmenNastavenipodleTypuHledani();
            }




        },


        zmenNastavenipodleTypuHledani: function () {
            var that = this;
            var valTypHledani = this.findFields("TypHledani").gfield("getValue");
            //vynulování
            this.setRequireFieldu("Jmeno",false);
            this.setRequireFieldu("Prijmeni",false);
            this.setRequireFieldu("DatNar",false);
            this.setRequireFieldu("RodPrijmeni",false);
            this.setRequireFieldu("RC", false);

            if (valTypHledani && valTypHledani.key) {
                switch (valTypHledani.key) {
                    case "Parametr1RCJmPrij":
                        this.setRequireFieldu("RC", true);
                        this.setRequireFieldu("Jmeno", true);
                        this.setRequireFieldu("Prijmeni", true);
                        
                        break;
                    case "Parametr5RCJmRodPrij":
                        this.setRequireFieldu("RC", true);
                        this.setRequireFieldu("Jmeno", true);
                        this.setRequireFieldu("RodPrijmeni", true);
                        break;
                    case "Parametr9JmPrijDatNar":
                        this.setRequireFieldu("Jmeno", true);
                        this.setRequireFieldu("Prijmeni", true);
                        this.setRequireFieldu("DatNar", true);
                        break;
                    case "Parametr10JmRodPrijDatNar":
                        this.setRequireFieldu("Jmeno", true);
                        this.setRequireFieldu("RodPrijmeni", true);
                        this.setRequireFieldu("DatNar", true);
                        break;
                    case "Parametr12RCJmPrijDatNar":
                        this.setRequireFieldu("RC", true);
                        this.setRequireFieldu("Jmeno", true);
                        this.setRequireFieldu("Prijmeni", true);
                        this.setRequireFieldu("DatNar", true);
                        break;
                    default:
                }
            }
            var fields = this.findFields("Jmeno,Prijmeni,RodPrijmeni,RC,DatNar");
            Gordic.Utils.Form.markRequired(fields);

        },

        setRequireFieldu: function (nazevFieldu,require) {
            var validators = [];
            if (require) {
                validators.push(new Gordic.Validators.Required());
            }
            this.findFields(nazevFieldu).gfield("option", "validators", validators);

        },
        vymazNalezenePredHledanim: function () {
            var that = this;
            this.vybranaOsoba = false;
            this.posledniNactenaSzrAiseo = null; 
            this.clearFromularIszrData();
            this.clearDalsiInformaceZAISEO();
            this.clearDotceneosobyZAISEO();
            this.clearGridAdresy();

            this.findFields(".js-iszrOdpoved").gfield("clear");
        },

        startNactiDataZAiseo: function () {
            var that = this;
            this.vymazNalezenePredHledanim();

            if (!this.findForms().gform("isValid")) { return; }

            var callModel = {};
            callModel.Aifo = this.origModel.Aifo;
            this.findFields(".js-orig, .js-iszrDotaz, .js-iszrOdpoved").gfield("model", "collect", callModel);


            var opt = { loadDataDto:callModel };

            this.call("NactiDataZAiseo", opt)
                .done(function (ret) {
                   
                    that.nastavDataPoNacteni(ret);

                });

        },

        nastavDataPoNacteni: function (retDto) {
            var that = this;
            this.posledniNactenaSzrAiseo = retDto;
            this.findFields(".js-iszrOdpoved").gfield("model", "apply", retDto);

            if (retDto && retDto.SzrAiseoSzrsieo && retDto.SzrAiseoSzrsieo.length > 0) {
                this.setFromularIszrData(retDto.SzrAiseoSzrsieo[0]);
                this.setDalsiInformaceZAISEO(retDto.SzrAiseoSzrsieo[0]);
                this.vybranaOsoba = true;
            }

            if (retDto && retDto.Osoby && retDto.Osoby.length > 0) {
                this.setDotceneosobyZAISEO(retDto.Osoby);
            }

            if (retDto && retDto.Adresy && retDto.Adresy.length > 0) {
                this.setGridAdresy(retDto.Adresy);
            }

            this.tabManager.gtabmanager("refresh");
        },


        closeDet: function () {
            $.content(this).tryClose(false);
        },

        saveAndCloseDet: function () {
            var formISValid = this.findForms().gform("isValid");
            if (formISValid) { //|| m_bVyberHromData
                if (this.serverParams.EditMode && this.vybranaOsoba && this.posledniNactenaSzrAiseo) {

                    var values = {};
                    var Szrsieo = this.posledniNactenaSzrAiseo.SzrAiseoSzrsieo;
                    //values.VysledekOvereni = this.VyberZRosItemsDto.VysledekOvereni;
                    values.IszrZadostId = this.findFields("GID").gfield("getValue");
                    values.AgendaZadostId = Szrsieo[0].agenda_zadost_id;
                    values.RegOdpovedId = Szrsieo[0].reg_zadost_id;

                    values.Aifo = Szrsieo[0].aifo;
                    values.Jmeno = Szrsieo[0].jmeno;
                    values.Prijmeni = Szrsieo[0].prijmeni;
                    values.RodneCislo = Szrsieo[0].rc;
                    values.RodPrijmeni = Szrsieo[0].rodne_prijm;
                    values.DatUmrti = Szrsieo[0].datum_umrti;
                    values.DatNar = Szrsieo[0].datum_narozeni;
                    //m_oCheckBoxPrizUmrti.Checked = true;
                    values.StatSpISZR = Szrsieo[0].StatForEsu;
                    if (this.posledniNactenaSzrAiseo.Adresy && this.posledniNactenaSzrAiseo.Adresy.length > 0) {
                        for (var i = 0; i < this.posledniNactenaSzrAiseo.Adresy.length; i++) {
                            var row = this.posledniNactenaSzrAiseo.Adresy[i];
                            if (row.typ_ade == 10) {
                                values.Obec = row.obec_txt;
                                values.CastObce = row.c_obec_txt;
                                values.Ulice = row.ulice_txt;
                                values.Psc = row.psc;
                                values.CisloOr = row.cislo_o;
                                values.CisloPop = row.cislo_domu;
                            } else if (row.typ_ade == 20) {
                                values.MistoNar = row.obec_txt;
                            }
                        }

                    }

                    this.close(values);
                }
            }
        },

        //repStarting: function (rep) {
        //
        //    rep.params.X0000 = "szrsieo.aifo = '" + this.origModel.Aifo + "'";
        //    rep.params.X0001 = "";
        //    rep.params.X0002 = "";
        //    rep.params.X0003 = "";
        //    rep.params.X0004 = "";
        //    rep.params.X0005 = "";
        //    rep.params.X0006 = "";
        //    rep.params.X0007 = "";
        //    rep.params.X0008 = "";
        //},

        

    }, { extendIntellisense: GContent });
    

});

   