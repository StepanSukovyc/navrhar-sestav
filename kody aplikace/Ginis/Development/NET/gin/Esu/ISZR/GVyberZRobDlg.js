

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GVyberZRobDlg", {
        onContentReady: function () {
            //console.log("Zacatek Scriptu");
            var that = this;
            this.promiseArray = [];
            Gordic.Esu.Function.trimObj(this.origModel);
            // data
            // VyberZRobItemsDto přepracovan kulu JsonProperty na VyberZRobItemsWorkDto
            
            // sekce 1
            var Formik = new Gordic.Forms
                .Form({name:"HlavniForm", layoutDescriptor:"L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720" })
              .addSection("jres:31900533") //RC 31900533 : Hledaná adresa
                .addRow("jres:26265153").addField("gstringbox", { name: "Jmeno", customClass: "js-orig js-origCompareIco" }) //RC 26265153 : Jméno
                .addRow("jres:26265152").addField("gstringbox", { name: "Prijmeni", customClass: "js-orig js-origCompareIco" }) //RC 26265152 : Příjmení
                .addRow("jres:31900598").addField("gdatebox", { name: "DatNar", customClass: "js-orig js-origCompareIco" }) //RC 31900598 : Dat. narození
                .addRow("jres:31900366").addField("gstringbox", { name: "IdDs", customClass: "js-orig js-origCompareIco" }) //RC 31900366 : ID DS
                .addRow("jres:31900599").addField("gselectbox", Gordic.Esu.Prefabs.typPrukazu({ name: "TypPrukazu", model: "model.TypPrukazu=value.nazev" }), { /*name: "TypPrukazu",*/ customClass: "js-orig js-prukazy" }) //RC 31900599 : Typ průkazu
                .addRow("jres:31900600").addField("gstringbox", { name: "Prukaz", customClass: "js-orig js-prukazy" }) //RC 31900600 : Číslo průkazu
               
                .addRow("jres:31900601").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { //RC 31900601 : Státní příslušnost
                    name: "StatSp", customClass: "js-orig js-origCompareIco", model: "model.StatSp=value.stat",disabled:true
                })
                .addRow("jres:26265149").addField("gstringbox", { name: "Obec", customClass: "js-orig  js-origCompareIco", disabled: true }) //RC 26265149 : Obec
                .addRow("jres:26265235").addField("gstringbox", { name: "CastObce", customClass: "js-orig  js-origCompareIco", disabled: true }) //RC 26265235 : Část obce
                .addRow("jres:26265147").addField("gstringbox", { name: "Ulice", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 26265147 : Ulice
                .addRow("jres:31900206").addField("gstringbox", { name: "CisloPopisne", customClass: "js-orig js-origCompareIco", disabled: true }) //RC 31900206 : Č. popisné
                .addRow("jres:31900534") //RC 31900534 : Č. orientační
                       .addField("gstringbox", "w-6", { name: "CisloOrientacni", customClass: "js-orig js-origCompareIco", disabled: true })
                      .addField("gstringbox", "w-6", { name: "COrientPism", customClass: "js-orig js-origCompareIco", disabled: true })
                .addRow().addField("gcheck", { name: "DiakritikaCheckboxChecked", customClass: "js-iszrDotaz",  label: "jres:31900602" }) //RC 31900602 : Hledat s ohledem na diakritiku
                .addRow().addField("gcheck", { name: "AdresaCheckboxChecked", customClass: "js-iszrDotaz", label: "jres:31900603" }) //RC 31900603 : Hledat i dle adresy
                .addRow("jres:31900539").addField("gstringbox", { //RC 31900539 : Adresa RUIAN
                    name: "KodUirAdr",
                    customClass: "js-orig", 
                    disabled: true, 
                    buttons: [{
                        requireEdit:false,
                        action: new GAction({ caption: "", name: "actAdresaRuianButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    }]
                }) // button html  "js-"
              // sekce 2
              .addSection("jres:31900604") //RC 31900604 : Občan v ROB
                .addRow("jres:26265153").addField("gstringbox", { name: "JmenoRob", customClass: "js-ISZR", model: "model.jmeno=value", disabled: true }) //RC 26265153 : Jméno
                .addRow("jres:26265152").addField("gstringbox", { name: "PrijmeniRob", customClass: "js-ISZR", model: "model.prijmeni=value", disabled: true }) //RC 26265152 : Příjmení
                .addRow("jres:31900598").addField("gdatebox", {  //RC 31900598 : Dat. narození
                    name: "DatNarozeniRob",
                    customClass: "js-ISZR",
                    model: "model.datum_narozeni=value",
                    disabled: true
                })
                .addRow("jres:31900366").addField("gstringbox", { name: "IDDSRob", customClass: "js-ISZR", model: "model.id_ds=value", disabled: true }) //RC 31900366 : ID DS
                .addRow("jres:31900315").addField("gstringbox", "w-4" , { //RC 31900315 : Místo narození
                    name: "MistoNarozeniRuian", customClass: "js-ISZR", model: "model.misto_naroz_cr=value", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actMistoNarozeniButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    }],
                    change: function (ev, obj) {
                        that.nactiMistoNarozeniTxt();
                    }
                }).addField("gstringbox", "w-8", { //RC 31900315 : Místo narození
                    name: "MistoNarozeniRuianTxt",
                    customClass: "js-ISZR",
                    model: "model.misto_naroz_cr_text=value",
                    disabled: true,
                })
                .addRow("jres:31900358").addField("gdatebox", { name: "DatUmrtiRob", customClass: "js-ISZR", disabled: true }) //RC 31900358 : Datum úmrtí
                .addRow("jres:31900601").addField("gselectbox",  { //RC 31900601 : Státní příslušnost
                    name: "StatSpISZR", customClass: "js-ISZR", model: "model.StatSp=value.stat", disabled: true,
                    itemTemplate: function(row){
                        if (row.platny.trim() === "platný") {
                            return row.nazev;
                        } else {
                            return "<i>" + row.nazev + "</i>";
                        }
                    },
                    //itemWidth:"", 
                   // multi: true,
                })
                .addRow("jres:26265149").addField("gstringbox", { name: "ObecRob", customClass: "js-ISZR js-ISZRAdresa", model: "model.GObec=value", disabled: true }) //RC 26265149 : Obec
                .addRow("jres:26265235").addField("gstringbox", { name: "CastObceRob", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCastObce=value", disabled: true }) //RC 26265235 : Část obce
                .addRow("jres:26265147").addField("gstringbox", { name: "UliceRob", customClass: "js-ISZR js-ISZRAdresa", model: "model.GUlice=value", disabled: true }) //RC 26265147 : Ulice
                .addRow("jres:31900206").addField("gstringbox", { name: "CPopisneRob", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCisPopisne=value", disabled: true }) //RC 31900206 : Č. popisné
                .addRow("jres:31900534") //RC 31900534 : Č. orientační
                      .addField("gstringbox", "w-6", { name: "COrientacniRob", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCisOrientacni=value", disabled: true })
                      .addField("gstringbox", "w-6", { name: "COrientPismRob", customClass: "js-ISZR js-ISZRAdresa", model: "model.GCisOrientacniPismeno=value", disabled: true })
                .addRow("jres:31900605").addField("gstringbox", "w-4", { //RC 31900605 : Doruč. adresa
                    name: "DorucAdresaRobRuian", customClass: "js-ISZR", model: "model.doruc_adr_cr=value", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actOverDorucAdresunButton", icon: "gi-thumb-up", tooltip: "jres:31900606", run: function (ev, ctx) { } }) //RC 31900606 : Oveřit doručvací adresu
                    }]
                })
                .addField("gstringbox", "w-8", { name: "DorucAdresaRobRuianTxt", customClass: "js-ISZR bold", model: "model.doruc_adr_ostatni=value", disabled: true })
                .addRow().addText("jres:31900418", "autohide js-adresaUradu g-state-text g-state-info") //RC 31900418 : Adresa úřadu
                .addRow("jres:31900539").addField("gstringbox", "w-4", { //RC 31900539 : Adresa RUIAN
                    name: "AdresaRobRuian", customClass: "js-ISZR", model: "model.adresni_misto_kod=value", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actAdresaRobRuianButton", icon: "gi-edoc", tooltip: "jres:31900550", run: function (ev, ctx) { } }) //RC 31900550 : Přejít na RUIAN
                    }]
                })
                .addField("gstringbox", "w-8", { name: "AdresaRobRuianTxt", customClass: "js-ISZR", model: "model.AdresaRobRuianTxt=value", disabled: true })

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
                        that.EnableControls();
                    }
                    
                })
                .addRow("jres:31900136").addField("gselectbox", Gordic.Prefabs.Select.szrsagr(), { //RC 31900136 : Role
                    name: "Role",
                    model: "model.Agenda = value.agenda;model.AgendovaRole = value.agendova_role",
                    customClass: "js-iszrDotaz",
                    //dropdown: true,
                    itemTemplate: "{agenda} {agendova_role} {nazev_aro}",
                    //serverFilters: {
                    //    agenda: this.RoleFilterAgenda || null,
                    //    ixs_fun_vfar: this.RoleFilterIxsFunVfar || null
                    //}
                    serverFilters: {
                        agenda: new Gordic.Forms.Dependency("Agenda", "agenda", true),
                        ixs_fun_vfar: this.RoleFilterIxsFunVfar || null
                    },
                    change: function (ev, obj) {
                        that.EnableControls();
                    }
                })
                .addRow("jres:26265101") //RC 26265101 : Důvod
                //.addField("gstringbox", {
                //    name: "Duvod",
                //    change: function (ev, obj) {
                //        that.EnableControls();
                //    },
                //    customClass: "js-iszrDotaz"
                //})

                .addField("gselectbox", {
                    model: "model.Duvod=value.data",  // zde obvykle nastavení selboxu, některé nastavení zde vám muže přebít prefab (strict,buttons,helperChoice,
                    customClass: "js-iszrDotaz",
                    //helperCustomizer,invalidTransform,data,helperItemTemplate,itemTemplate,helperColumns,verificationNeeded,showSelectButton
                    //(při pamatování minulé hodnoty initialValue) )
                    change: function (ev, obj) {
                        that.EnableControls();
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
                    disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({ caption: "", name: "actAifoButton", icon: "gi-edoc", tooltip: "Přejít na RUIAN", run: function (ev, ctx) { } })
                    }]
                })
                .addRow("jres:31900557").addField("gstringbox", { //RC 31900557 : Status
                    name: "StatusText", customClass: "js-iszrOdpoved", disabled: true, rows: 2
                });
            $("<div>").appendTo(this.element).gform("createFrom", Formik);

            //// sekce s tablem

            var Formik = new Gordic.Forms
               .Form("L3M3S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-300-720")
             .addSection()
                .addRow().addField("gcheck", { name: "SrzAsynchronneCheckboxChecked", initialValue: false, disabled: (that.gin_iszr_synasy === 1), label: "jres:31900558" }) //RC 31900558 : SZR volat asynchronně
             .addSection()
                .addRow().addField("gcheck", { name: "gCheckBoxZmeny",  label: "jres:31900607" }) //RC 31900607 : Aktualizovat změny dle SZR ROB
             .addSection() 
                .addRow().addField("gcheck", {
                    name: "gCheckBoxDoruc",
                    label: "jres:31900608",
                    change: function (ev, obj) {
                        that.gCheckBoxDorucZmena();
                    }

                }); //RC 31900608 : Převzít do ESU i doručovací adresu
            $("<div>").appendTo(this.element).gform("createFrom", Formik);
            

            that.find(".js-orig").gfield("model", "apply", this.origModel);
            that.find(".js-iszrDotaz, .js-iszrOdpoved, .js-prukazy").gfield("model", "apply", this.VyberZRobItemsWorkDto);

            that.findFields().gfield("model", "validators", this.VyberZRobItemsDtoValidators);
            this.ViewTabulkaNalezenych = new Gordic.Data.View([], { key: "prijmeni" });
            this.vysledekHledani = $("<div>").appendTo(this.element)
           
                .gautofit()
                .ggrid({
                    name: "GridVysledekHledani",
                    data: this.ViewTabulkaNalezenych,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    customClass: "js-gridISZRRob",
                    navigationMode: "row", // row, cell
                    //defaultAction: $.content(this).actions.actVybranVGridu, //17.09.2021 dsebesta selectAction vždy jen jeden záznam
                    rowsClass: function (dataRow) {
                        /* zskomentováno protože nechápu kam se poděla aktivita 
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else return "  ";
                        */
                    },
                    //cellActivate: function (ev, row, xxx) {
                    //    if (row && row.cellInfo && row.cellInfo.data && row.cellInfo.data.ixs_esu) { // u single modu vzdy 1 ale pro jistotu testuji
                    //        //var x = selectionInfo.getSelection();
                    //        that.showPanel(row.cellInfo.data.ixs_esu);
                    //    }
                    //},
                    scrollHelperTemplate: "{prijmeni}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["jmeno", "prijmeni", "datum_narozeni", "doruc_adr_cr", "doruc_adr_ostatni"],
                    */
                    columns: new Gordic.Data.GridFormat()

                    .addTextColumn({
                        name: "prijmeni",
                        caption: "jres:31900609", //RC 31900609 : Přijmení
                        description: "jres:31900609", //RC 31900609 : Přijmení
                        cellTemplate: "{prijmeni}",
                    })
                    .addTextColumn({
                        name: "jmeno",
                        caption: "jres:26265153", //RC 26265153 : Jméno
                        description: "jres:31900610", //RC 31900610 : jmeno
                        cellTemplate: "{jmeno}",
                    })
                    .addDateColumn({
                        name: "datum_narozeni",
                        caption: "jres:26265158", //RC 26265158 : Datum narození
                        description: "jres:26265158", //RC 26265158 : Datum narození
                        //cellTemplate: "{datum_narozeni}",
                    })
                    .addTextColumn({
                        name: "adresni_misto_kod",
                        caption: "jres:31900539", //RC 31900539 : Adresa RUIAN
                        description: "jres:31900539", //RC 31900539 : Adresa RUIAN
                        cellTemplate: "{adresni_misto_kod}",
                    })
                    .addTextColumn({
                        name: "doruc_adr_cr",
                        caption: "jres:31900019", //RC 31900019 : Doručovací adresa
                        description: "jres:31900019", //RC 31900019 : Doručovací adresa
                        cellTemplate: "{doruc_adr_cr}",
                    })
                    .addTextColumn({
                        name: "doruc_adr_ostatni",
                        caption: "jres:31900611", //RC 31900611 : Doruč. adresa ostatní
                        description: "jres:31900611", //RC 31900611 : Doruč. adresa ostatní
                        cellTemplate: "{doruc_adr_ostatni}",
                    })
                    .addTextColumn({
                        name: "misto_naroz_cr",
                        caption: "jres:31900612", //RC 31900612 : Místo narození ČR
                        description: "jres:31900612", //RC 31900612 : Místo narození ČR
                        cellTemplate: "{misto_naroz_cr}",
                    })
                    .addTextColumn({
                        name: "misto_naroz_svet",
                        caption: "jres:31900613", //RC 31900613 : Místo narození mimo ČR
                        description: "jres:31900613", //RC 31900613 : Místo narození mimo ČR
                        cellTemplate: "{misto_naroz_svet}",
                    })
                });
       
            this.zkusNacistZFronty();
            this.findForms().gform("waitForValues").done(function () {
                that.EnableControls();
            })
            
          
        },
        volaniOvereni: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.VyberZRobItemsWorkDto);
            this.VyberZRobItemsWorkDto.AdrKod = !isNaN(parseInt(this.VyberZRobItemsWorkDto.KodUirAdr)) ? parseInt(this.VyberZRobItemsWorkDto.KodUirAdr):0 ; //8.9.2022 - dsebesta  špatně se plnilo z políčka V políčku´se jmenuje jinak //  this.VyberZRobItemsDto.AdrKod;
            //this.VyberZRobItemsWorkDto.Prukaz = this.VyberZRobItemsWorkDto.Prukaz;
            //this.VyberZRobItemsWorkDto.TypPrukazu = this.VyberZRobItemsWorkDto.TypPrukazu; // .nazev
            this.VyberZRobItemsWorkDto.JmenoValue = this.VyberZRobItemsWorkDto.Jmeno;
            this.VyberZRobItemsWorkDto.PrijmeniValue = this.VyberZRobItemsWorkDto.Prijmeni;
            this.VyberZRobItemsWorkDto.DatNarozeni = this.VyberZRobItemsWorkDto.DatNar;
            this.beginOperation();
            // mazani při opakovaném volání
            that.findFields(".js-iszrOdpoved").gfield("clear");

            this.call("Hledat", { soubor: "", VyberZRobItems: this.VyberZRobItemsWorkDto })
                .done(function (retVal) { 

                    that.VyberZRobItemsWorkDto.IszrZadostId = retVal.IszrZadostId;  
                    that.VyberZRobItemsWorkDto.StatusText = retVal.StatusText;
                    that.VyberZRobItemsWorkDto.VysledekOvereni = retVal.VysledekOvereni;     
                    that.VyberZRobItemsWorkDto.OdpovedInfo = retVal.OdpovedInfo;
                    that.VyberZRobItemsWorkDto.Message = retVal.Message;


                    if (that.VyberZRobItemsWorkDto.IszrZadostId) { // ověřeno asynchroně
                        that.dialogs.warning("jres:31900565"); //RC 31900565 : Byl zadán asynchroní požadavek
                    }
                    else if (retVal && retVal.SzrList && retVal.SzrList.length > 0) {
                        that.volanoANalezeno = true;
                        that.naplnGrid(retVal.SzrList);
                    }

                    that.findFields(".js-iszrOdpoved").gfield("model", "apply", that.VyberZRobItemsWorkDto);

                    that.zkusZobrazitMessageASetniStatus();

                    that.endOperation();

                    that.DotazNaZruseniDorucovaci();
                })
                .fail(function (xhr, type, vobj) {
                    //console.log("typ exception: ", type, vobj);
                    that.endOperation();
                });
        },
        overit: function () {
            var that = this;
            this.findForms().gform("waitForValues").done(function () {
                var gAsyn = that.findFields("SrzAsynchronneCheckboxChecked").gfield("getValue");
                var formISValid = that.findForms("HlavniForm").gform("isValid");
                if (!that.VyberHromData && /*that.VyberZRobItemsWorkDto.IszrZadostId == null &&*/ !gAsyn && formISValid) {
                    that.volaniOvereni();
                } else {
                    if (gAsyn) {
                        that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                            "jres:31900566"); //RC 31900566 : Je zaškrtnuto pole pro synchroní požadavek.
                    } else {
                        that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                            "jres:31900567"); //RC 31900567 : Nelze spustit synchroní požadavek o ověření.
                    }
                }
            })
        },
        OveritAsynchronne: function () {
            var that = this;
            var gAsyn = this.findFields("SrzAsynchronneCheckboxChecked").gfield("getValue");
            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (!this.VyberHromData && this.VyberZRobItemsWorkDto.IszrZadostId == null && gAsyn && formISValid && this.origModel.IxsEsu != null) {

                this.volaniOvereni();
            } else {
                if (!gAsyn) {
                    that.dialogs.warning("jres:31900281",
                        "jres:31900568"); //RC 31900568 : Není zaškrtnuto pole pro asynchroní požadavek.
                } else {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900569"); //RC 31900569 : Nelze spustit asynchroní požadavek o ověření.
                }
            }
        },

        naplnGrid: function (data) {
            var that = this;
            this.vybranaOsoba = true;
            //that.ViewTabulkaNalezenych = new Gordic.Data.View(data, { key: "prijmeni" });
            //that.vysledekHledani.ggrid("setData", that.ViewTabulkaNalezenych, true);
            this.ViewTabulkaNalezenych.updateData(data, "set");

            that.setPrvniPoNahraniNovychDat();

        },

        zkusNacistZFronty: function () {
            if (this.NactenoZFronty && this.NactenoZFronty.length > 0) {
                this.naplnGrid(this.NactenoZFronty);
            }

        },

        PrihlasitZmeny: function () {
            var that = this;
            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (formISValid) {
                if (this.VyberZRobItemsWorkDto.AifoText  && !this.VyberZRobItemsWorkDto.StavRobPrihlaseniZmen && !this.VyberZRobItemsWorkDto.IszrZadostId && (this.PrizIszr || this.LicAdr === "DEMO")) {
                    this.findFields().gfield("model", "collect", this.VyberZRobItemsWorkDto);
                    this.beginOperation();
                    this.call("PrihlasitZmeny", { VyberZRobItems: this.VyberZRobItemsWorkDto })
                       .done(function (retVal) {
                           if (retVal) { // ověřeno asynchroně
                               that.VyberZRobItemsWorkDto.StatusText = retVal.StatusText;
                               that.VyberZRobItemsWorkDto.Message = retVal.Message;
                           }
                           that.endOperation();
                           that.zkusZobrazitMessageASetniStatus();
                       })
                       .fail(function (xhr, type, vobj) {
                           //console.log("typ exception: ", type, vobj);
                           that.endOperation();
                       });
                } else {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900614"); //RC 31900614 : Nelze požádat o přihlášení změn.
                }
            }
        },

        OdhlasitZmeny: function () {
            var that = this;
            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (formISValid) {
                if (this.VyberZRobItemsWorkDto.AifoText  && this.VyberZRobItemsWorkDto.StavRobPrihlaseniZmen && !this.VyberZRobItemsWorkDto.IszrZadostId && (this.PrizIszr || this.LicAdr === "DEMO")) {
                    this.findFields().gfield("model", "collect", this.VyberZRobItemsWorkDto);
                    this.beginOperation();
                    this.call("OdhlasitSledovaniZmen", { VyberZRobItems: this.VyberZRobItemsWorkDto })
                       .done(function (retVal) {
                           if (retVal) { // ověřeno asynchroně
                               that.VyberZRobItemsWorkDto.StatusText = retVal.StatusText;
                               that.VyberZRobItemsWorkDto.Message = retVal.Message;
                           }
                           that.endOperation();
                           that.zkusZobrazitMessageASetniStatus();
                       })
                       .fail(function (xhr, type, vobj) {
                           //console.log("typ exception: ", type, vobj);
                           that.endOperation();
                       });
                } else {
                    that.dialogs.warning("jres:31900281", //RC 31900281 : Zpráva
                        "jres:31900614"); //RC 31900614 : Nelze požádat o přihlášení změn.
                }
            }
        },

        simulaceOvereni: function(){
            //gActionSimulaceOvereni.Visible = UserProcess.SessionInfo.LicAdr == "DEMO";
        },

        odstranitVazbu: function () {
            //VysledekOvereni = OvereniVSzrRob.OdstraneniVazbyNaSzrRob; //5
            var ret = {
                VysledekOvereni: 5 // OvereniVSzrRob.OdstraneniVazbyNaSzrRob
            };
            
            this.close(ret);
        },

        GetJeDorucovaciVSZR: function () {
            var that = this;
            var fieldDorucRuian = this.findFields("DorucAdresaRobRuian");
            var dorucRuian = fieldDorucRuian.gfield("getValue");
            var dorucTxt = this.findFields("DorucAdresaRobRuianTxt").gfield("getValue");
            if (dorucRuian == null)
                dorucRuian = "";
            if (dorucTxt == null)
                dorucTxt = "";

            var fieldWarning = this.findFields("DorucAdresaRobRuianTxt");
            fieldWarning.gfield("resetErrors")
            if (fieldWarning.gfield("getValue")) {
                fieldWarning.gfield("setError", {
                    message: "jres:31900976", //RC 31900976 : Pozor subjekt má doručovací adresu.
                    stopping: false,
                    group: "rucniInsolvence",
                    errorType: "warning",
                    showOnDisabled: true
                });
            }
            

            return (dorucRuian !== "" || dorucTxt !== "")
        },

        /// <summary>
        /// Povolení jednotlivých políček a přenastavení filtrů
        /// </summary>
        EnableControls:function(){

          
            //this.VyberHromData //bool
            //this.PrizIszr // UserProcess.Configuration.PrizIszr
            //this.LicAdr // UserProcess.SessionInfo.LicAdr
            //this.ReadOnly // !this.EditMode 

            //if (this.VyberZRobItemsWorkDto.AifoText == null) this.VyberZRobItemsWorkDto.AifoText = null;
            //if (this.VyberZRobItemsWorkDto.IszrZadostId == null) this.VyberZRobItemsWorkDto.IszrZadostId = null;
            var that = this;
            this.findFields("gCheckBoxZmeny").gfield("setValue", false);

          
            //dorucRuian = ""; // ALF !!!! pro test
            //dorucTxt = "testovací doručovací";
            var JeDorucovaciVSZR = this.GetJeDorucovaciVSZR();

            this.findFields("gCheckBoxDoruc").gfield("option", "disabled",
                !(!this.VyberHromData && (this.PrizIszr || this.LicAdr === "DEMO") && JeDorucovaciVSZR));
            if (this.gin_iszr_synasy === 0) {
                 this.findFields("SrzAsynchronneCheckboxChecked").gformsection().hide();
            }
           
            this.findFields("SrzAsynchronneCheckboxChecked").gfield("option", "disabled",
                !(!this.VyberHromData && this.VyberZRobItemsWorkDto.IszrZadostId != null && this.VyberZRobItemsWorkDto.AifoText != null && this.EditMode && this.gin_iszr_synasy === 1));

            

           
            // ALF 29.7.2013 nově lze převzít doručovací adresa pouze na ESU kde je kontaktní/doručovací nebo trvalou na trvalou
            var gCheckBoxDorucVal = this.findFields("gCheckBoxDoruc").gfield("getValue");
            var esuDorucAdresa = this.origModel.TypAdr === 10;
            this.typAdrOk = (esuDorucAdresa && gCheckBoxDorucVal) || (!esuDorucAdresa && !gCheckBoxDorucVal);

            this.findFields("gCheckBoxDoruc").gfield("resetErrors");
            
            var varovani = !this.typAdrOk && ((this.VyberZRobItemsWorkDto.AifoText) || (this.VyberZRobItemsWorkDto.IszrZadostId));
            var gCheckBoxDoruc = this.findFields("gCheckBoxDoruc");
            gCheckBoxDoruc.gfield("resetErrors");
            if (varovani && this.volanoANalezeno) {
                gCheckBoxDoruc.gfield("setError", {
                    message:
                        "jres:31900615", stopping: false, group: "rucni", errorType: "warning", showOnDisabled: true //RC 31900615 : Nesouhlasí přebíraný typ adresy s typem nastaveným na detailu ESU.
                });
            } 
            var KodUirAdr = this.findFields("KodUirAdr").gfield("getValue");
            this.findFields("AdresaCheckboxChecked").gfield("option", "disabled",
                !(!this.VyberHromData && KodUirAdr != null && KodUirAdr !== 0 && (!this.VyberZRobItemsWorkDto.AifoText)));

            this.findFields("DiakritikaCheckboxChecked").gfield("option", "disabled",
                !(!this.VyberHromData && (!this.VyberZRobItemsWorkDto.AifoText)));

            this.findFields("Role").gfield("option", "disabled", this.VyberHromData);
            this.findFields("Duvod").gfield("option", "disabled", this.VyberHromData);


            if (this.VyberHromData) {
                this.findFields("gCheckBoxDoruc").gfield("option", "disabled", true);
                this.findFields("SrzAsynchronneCheckboxChecked").gfield("option", "disabled", true);
            }
            
            //akce
            var gAsyn = this.findFields("SrzAsynchronneCheckboxChecked").gfield("getValue");
            var Agenda = this.findFields("Agenda").gfield("getValue");
            var Role = this.findFields("Role").gfield("getValue");
            var Duvod = this.findFields("Duvod").gfield("getValue");

            var overitEnabled = !this.VyberHromData 
                && this.VyberZRobItemsWorkDto.IszrZadostId == null
                && !gAsyn
                && Agenda != null
                && Role != null
                && Agenda.s_prist_rob != 0
                && Duvod != null
                && Duvod.data != null;

            this.actions.actOverit.update({ enabled: overitEnabled });

            
            this.actions.actOveritAsynchronne.update(
                {
                    enabled: (!this.VyberHromData && this.VyberZRobItemsWorkDto.IszrZadostId != null && gAsyn && this.origModel.IxsEsu != null),
                    visible: (this.gin_iszr_synasy === 1)
                }
            );
            var enabled;
           
            enabled = Boolean(this.VyberZRobItemsWorkDto.AifoText  && !this.VyberZRobItemsWorkDto.StavRobPrihlaseniZmen && !this.VyberZRobItemsWorkDto.IszrZadostId && (this.PrizIszr || this.LicAdr === "DEMO"))
            this.actions.actPrihlasit.update({ enabled: enabled});

            enabled = Boolean(this.VyberZRobItemsWorkDto.AifoText && this.VyberZRobItemsWorkDto.StavRobPrihlaseniZmen && !this.VyberZRobItemsWorkDto.IszrZadostId && (this.PrizIszr || this.LicAdr === "DEMO"))
            this.actions.actOdhlasit.update({ enabled: enabled});

            enabled = Boolean(this.EditMode && ((this.VyberZRobItemsWorkDto.AifoText) || (this.VyberZRobItemsWorkDto.IszrZadostId)) && this.typAdrOk && this.vybranaOsoba);
            this.actions.actSaveAndClose.update({ enabled: enabled});
            var actOdstranitVazbuvisible = false; 
            if (this.VyberZRobItemsWorkDto.AifoText != null && this.VyberZRobItemsWorkDto.AifoText !== "" && !this.VyberZRobItemsWorkDto.StavRobPrihlaseniZmen) {
                actOdstranitVazbuvisible = true;
            }
            this.actions.actOdstranitVazbu.update({ visible: actOdstranitVazbuvisible });
            this.actions.actOdstranitVazbu.enabled(true);
        },




        setPrvniPoNahraniNovychDat: function (iniciovalChecBoxDoruc) {
            
           var selectedRows =  this.vysledekHledani.ggrid("getSelection");
            if (selectedRows && selectedRows.length > 0) {
                this.VyberZRobItemsWorkDto.AifoText = selectedRows[0].aifo;  // dsebesta 3.4.2019  přidáno dsebesta, jinak nefungovalo při prvnín dohledání možná
                                                                                //zpusobí kvízy jinde bude nutné rozthnout na dvě puvodní a nové AIFO
                this.setISZRHodnoty(selectedRows[0], iniciovalChecBoxDoruc);
           }
        },

        vybranyNovyRadek: function () {
            this.odstranPorovnavaciIkonky();
            this.odstranISZRIkonky();
        },

        setISZRHodnoty: function (row, iniciovalChecBoxDoruc) {

            var that = this;
            
            this.vybranyNovyRadek();

            var fieldy = this.findFields(".js-ISZR");
            fieldy.gfield("clear");

            if (row.jmeno)
            {
                var field = this.findFields("JmenoRob");
                field.gfield("setValue", row.jmeno);
                var ico = this.GetImgStavSpravny(row.stav_jmeno);
                if(ico){
                    field.gfield("addState", ico);
                }
            }
            if (row.prijmeni)
            {
                var field = this.findFields("PrijmeniRob");
                field.gfield("setValue", row.prijmeni);
                var ico = this.GetImgStavSpravny(row.stav_prijmeni);
                if(ico){
                    field.gfield("addState", ico);
                }
            }
            if (row.datum_narozeni)
            {
                var field = this.findFields("DatNarozeniRob");
                field.gfield("setValue", row.datum_narozeni); //row.datum_narozeni.split("T")[0]
                var ico = this.GetImgStavSpravny(row.stav_datum_naroz);
                if(ico){
                    field.gfield("addState", ico);
                }
            }

            // trvalá adresa kódem RUIAN
            if (row.adresni_misto_kod || row.doruc_adr_cr)
            {
                var field = this.findFields("AdresaRobRuian");
                field.gfield("setValue", row.adresni_misto_kod);
                var ico = this.GetImgStavSpravny(row.stav_adr_pobytu);
                if(ico){
                    field.gfield("addState", ico);
                }

            }
            if (row.adresni_misto_kod)
            {
                var field = this.findFields("AdresaRobRuianTxt");
                field.gfield("setValue", row.AdresaRobRuianTxt);
            }
            else
            {
                var field = this.findFields("AdresaRobRuianTxt"); //TODO
                field.gfield("setValue", row.doruc_adr_ostatni);
                if (row.doruc_adr_ostatni)
                {
                    var ico = this.GetImgStavSpravny(row.stav_adr_pobytu);
                    if(ico){
                        field.gfield("addState", ico);
                    }
                }
            }

            // doručovací adresa kódem RUIAN
            if (row.doruc_adr_cr && row.doruc_adr_cr !== 0)
            {
                var field = this.findFields("DorucAdresaRobRuian");
                field.gfield("setValue", row.doruc_adr_cr);
                var ico = this.GetImgStavSpravny(row.stav_doruc_adr);
                if(ico){
                    field.gfield("addState", ico);
                }
               
                var field2 = this.findFields("DorucAdresaRobRuianTxt"); // TODO
                field2.gfield("setValue", row.DorucAdresaRobRuianTxt);
            }

            // doručovací adresa textem
            if (row.doruc_adr_ostatni)
            {
                var field = this.findFields("gDorucTxt2");
                field.gfield("setValue", row.doruc_adr_ostatni);
                var ico = this.GetImgStavSpravny(row.stav_doruc_adr);
                if(ico){
                    field.gfield("addState", ico);
                }
            }

            if (row.misto_naroz_cr) //
            {
                var field = this.findFields("MistoNarozeniRuian");
                field.gfield("setValue", row.misto_naroz_cr);
                var ico = this.GetImgStavSpravny(row.stav_misto_naroz);
                if(ico){
                    field.gfield("addState", ico);
                }
            }
            if (row.misto_naroz_svet)
            {
                var field = this.findFields("MistoNarozeniRuian");
                field.gfield("setValue", row.misto_naroz_svet);
                var ico = this.GetImgStavSpravny(row.stav_misto_naroz);
                if(ico){
                    field.gfield("addState", ico);
                }
            }
            //var GString  mn = new GString(esuRob.GetMistoSvetCr(l_Row.misto_naroz_svet, l_Row.misto_nar_obec, l_Row.misto_naroz_cr));
            //gMistoNar2.Text+=", " +mn;
            //this.gToolTip.SetToolTip(this.gMistoNar2,  mn);
            if (this.findFields("gCheckBoxDoruc").gfield("getValue")) {
                this.VyberZRobItemsWorkDto.AdrKod = parseInt(row.doruc_adr_cr);
                //AdresaTxt = l_Row.doruc_adr_ostatni;            // ALF 2012-08-27 doručovací adresa jen v text. tvaru
            }
            else {
                this.VyberZRobItemsWorkDto.AdrKod = parseInt(row.adresni_misto_kod);
                //AdresaTxt = l_Row.doruc_adr_ostatni;            // ALF 2012-08-27 trvalá adresa jen v text. tvaru
            }

            if (this.VyberZRobItemsWorkDto.AdrKod && this.VyberZRobItemsWorkDto.AdrKod !== 0)
            {
                this.NactiAdresuDoPolozek(this.VyberZRobItemsWorkDto.AdrKod);
            }

            if (row.aifo) this.SetTbAifo(row.aifo);
            if (row.id_ds)
            {
                var field = this.findFields("IDDSRob");
                field.gfield("setValue", row.id_ds);
                var ico = this.GetImgStavSpravny(row.stav_id_ds);
                if (ico) {
                    field.gfield("addState", ico);
                }
            }
          
            if (row.datum_umrti) {
                var field = this.findFields("DatUmrtiRob");
                field.gfield("setValue", row.datum_umrti);
                var ico = this.GetImgStavSpravny(row.stav_datum_umrti);
                if (ico) {
                    field.gfield("addState", ico);
                }
            }

            if (row.adresa_urad && row.adresa_urad === 1) {
                this.find(".js-adresaUradu").show();
            }

            //m_oGinsesu.DatNar = l_Row.datum_narozeni;
            //m_oGinsesu.DatUmrti = l_Row.datum_umrti;
            //MistoNar = new GString(esuRob.GetMistoSvetCr(l_Row.misto_naroz_svet, l_Row.misto_nar_obec, l_Row.misto_naroz_cr));

            //m_oGinsesu.Aifo = l_Row.aifo;
            
            if (this.promiseArray.length >= 1) {
                this.promiseArray[0].done(function (retVal) {
                    that.NastavStatniPrislusnost(row.aifo);
                    that.KontrolaDorucAdresy(iniciovalChecBoxDoruc);

                    that.cekaniNaPromise();
                });
            } else {

                this.NastavStatniPrislusnost(row.aifo);
                this.KontrolaDorucAdresy(iniciovalChecBoxDoruc);
                this.cekaniNaPromise();
            }
            //EnableControls();
        },

        GetImgStavSpravny: function (stav) {
            if( stav === 10)
                return { id: "ico", icon: "gi-tick", customClass: "g-state-success", tooltip: "✓ "+ "jres:31900290" }; //RC 31900290 : Ověřeno

            else if(stav === 20 || stav  === 30)
                return { id: "ico", icon: "gi-window-close", customClass: "g-state-important", tooltip: "✗ "+ "jres:31900616" }; //RC 31900616 : Neověřeno
            else
                return null;
        },

        NactiAdresuDoPolozekCallCounter : 0,
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
                            console.log("psc", retVal.dto.PostaKod.toString());
                            that.findFields(".js-ISZRAdresa").gfield("model", "apply", retVal.dto);
                            that.VyberZRobItemsWorkDto.PostaKod = retVal.dto.PostaKod.toString();
                            that.endOperation();
                        }
                        that.zkusZobrazitMessageASetniStatus();
                    })
                    .fail(function (xhr, type, vobj) {
                        //console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });
                this.promiseArray.push(promiseAdresa);
            }
        },

        NastavStatniPrislusnost:function(aifo){
            var that = this;

            if (aifo) {
                this.beginOperation();
                var promiseStatniPris = this.call("NastavStatniPrislusnost", { aifo: aifo })
                    .then(function (retVal) {
                        var finalArray = [];
                        $(retVal).each(function (inde, element) {
                            var obj = {};
                            var valArr = element.split(";");
                            obj.stat = valArr[1];
                            obj.stat_sis_nnn = valArr[0];
                            obj.nazev = valArr[2];
                            obj.platny = valArr[3];
                            finalArray.push(obj);
                        });
                        if (finalArray.length > 0) {
                            that.findFields("StatSpISZR").gfield("option", "data",
                                new Gordic.Data.View(finalArray, { key: "stat" })

                                );

                            that.findFields("StatSpISZR").gfield("setValue", finalArray[0]);
                        } else {
                            that.findFields("StatSpISZR").gfield("option", "data", []);
                            that.findFields("StatSpISZR").gfield("clear");
                        }
                        that.endOperation();
                        that.zkusZobrazitMessageASetniStatus();
                    })
                    .fail(function (xhr, type, vobj) {
                        //console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });
                this.promiseArray.push(promiseStatniPris);
            }
        },

        SetTbAifo: function (aifo) {
            var field = this.findFields("GID");
            var value = null;
            if (aifo === "") {
                if (this.VyberZRobItemsWorkDto.IszrZadostId)
                { value = this.VyberZRobItemsWorkDto.IszrZadostId; }
                else
                    value = "";

            }
            else {
                //if (UserProcess.DebugMode)
                //    gAIFO.Text = aifo;
                //else
                // nesmí být zobrazeno
                // aifo.ToString().Substring(0, 10) + 
                value = "******";
            }
            field.gfield("setValue", value);
        },

        odstranPorovnavaciIkonky: function () {
            this.findFields(".js-origCompareIco").each(function (imdex, field) {
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

        porovnejOsoby: function () {

            this.odstranPorovnavaciIkonky();

            var Jmeno = this.findFields("Jmeno");
            var JmenoVal = Jmeno.gfield("getValue");
            var JmenoRob = this.findFields("JmenoRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(Jmeno, JmenoVal, JmenoRob);

            var Prijmeni = this.findFields("Prijmeni");
            var PrijmeniVal = Prijmeni.gfield("getValue");
            var PrijmeniRob = this.findFields("PrijmeniRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(Prijmeni, PrijmeniVal, PrijmeniRob);

            var DatNar = this.findFields("DatNar");
            var DatNarVal = DatNar.gfield("getValue");
            var DatNarozeniRob = this.findFields("DatNarozeniRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(DatNar, DatNarVal, DatNarozeniRob);
            
            var IdDs = this.findFields("IdDs");
            var IdDsVal = IdDs.gfield("getValue");
            var IDDSRob = this.findFields("IDDSRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(IdDs, IdDsVal, IDDSRob);

            var Obec = this.findFields("Obec");
            var ObecVal = Obec.gfield("getValue");
            var ObecRob = this.findFields("ObecRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(Obec, ObecVal, ObecRob);
            
            var CastObce = this.findFields("CastObce");
            var CastObceVal = CastObce.gfield("getValue");
            var CastObceRob = this.findFields("CastObceRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CastObce, CastObceVal, CastObceRob);

            var Ulice = this.findFields("Ulice");
            var UliceVal = Ulice.gfield("getValue");
            var UliceRob = this.findFields("UliceRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(Ulice, UliceVal, UliceRob);

            var CisloPopisne = this.findFields("CisloPopisne");
            var CisloPopisneVal = CisloPopisne.gfield("getValue");
            var CPopisneRob = this.findFields("CPopisneRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CisloPopisne, CisloPopisneVal, CPopisneRob);

            var CisloOrientacni = this.findFields("CisloOrientacni");
            var CisloOrientacniVal = CisloOrientacni.gfield("getValue");
            var COrientacniRob = this.findFields("COrientacniRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(CisloOrientacni, CisloOrientacniVal, COrientacniRob);

            var COrientPism = this.findFields("COrientPism");
            var COrientPismVal = COrientPism.gfield("getValue");
            var COrientPismRob = this.findFields("COrientPismRob").gfield("getValue");
            Gordic.Esu.Function.PorovnejApridejIco(COrientPism, COrientPismVal, COrientPismRob);
          
            var KodUirAdr = this.findFields("KodUirAdr");
            var KodUirAdrVal = KodUirAdr.gfield("getValue");
            var AdresaRobRuian = this.findFields("AdresaRobRuian").gfield("getValue");
            var DoeucAdresaRobRuian = this.findFields("DorucAdresaRobRuian").gfield("getValue");
            if (KodUirAdrVal === AdresaRobRuian) { 
                Gordic.Esu.Function.PorovnejApridejIco(KodUirAdr, KodUirAdrVal, AdresaRobRuian);
            } else {
                Gordic.Esu.Function.PorovnejApridejIco(KodUirAdr, KodUirAdrVal, DoeucAdresaRobRuian);
            }

            var StatSp = this.findFields("StatSp");
            var StatSpVal = StatSp.gfield("getValue");
            var stav = 20;
            var StatSpISZR = this.findFields("StatSpISZR").gfield("getValue");
            if (!StatSpISZR) {
                stav = null;
            }
            else { 
                var StatSpISZR = [StatSpISZR]; // dříve multi nyní normal proto si pole vytvořím
                $(StatSpISZR).each(function (index, element) {
                    if (element.platny === "platný" && element.stat === (StatSpVal != null && StatSpVal.stat != null ? StatSpVal.stat.toString() : null)) { // dsebesta 17.08.2023 => StatSpVal.stat.toString() =>StatSpVal.stat
                        stav = 10;
                    }
                });
            }
            var icoStat = Gordic.Esu.Function.GetImgporovnani(stav);
            if (icoStat) {
                StatSp.gfield("addState", icoStat);
            }
        },


        cekaniNaPromise:function(){
            var that = this;
            if (that.promiseArray.length > 0) {
                $.when.apply(null, that.promiseArray).then(function () {
                //$.when(that.promiseArray).done(function () {
                    //console.log("cally dokončeny");
                    that.promiseArray = [];
                    that.porovnejOsoby();
                    that.EnableControls();
                });
            } else {
                that.porovnejOsoby();
                that.EnableControls();
            }
        },

       
        KontrolaDorucAdresy:function(iniciovalChecBoxDoruc){
         /// <summary>
        /// zkontroluje a případně automaticky zaškrtne převzetí doručovací adresy
        /// </summary>
        /// {
            if (!iniciovalChecBoxDoruc)
            {
                if (this.findFields("gCheckBoxDoruc").gfield("option", "disabled") === false)
                {
                    var idDorucOk = false;
                    if ((this.origModel.IxsEsu) &&
                        (this.origModel.IxsEko))
                        idDorucOk = (this.origModel.IxsEsu !== this.origModel.IxsEko);
                    if (idDorucOk || (this.origModel.TypAdr == 10))
                    {
                        this.findFields("gCheckBoxDoruc").gfield("setValue",true);
                    }
                }
            }
        },

        zkusZobrazitMessageASetniStatus: function () {
            
            if (this.VyberZRobItemsWorkDto.Message) {
                this.dialogs.warning("Zpráva", this.VyberZRobItemsWorkDto.Message);
                this.VyberZRobItemsWorkDto.Message = null;
            }
            this.findFields("StatusText").gfield("setValue", this.VyberZRobItemsWorkDto.StatusText);
            this.EnableControls();
        },


        saveAndCloseDet: function () {
            //TODO
            //OkEnabled = !ReadOnly && ((!Aifo.IsNullOrEmpty) || (!FrontaIszrZadostId.IsNullOrEmpty)) && (((gDuvod.Text.Trim() != "") && (!gAgenda.Agenda.IsNullOrEmpty) && (!gRole.AgendovaRole.IsNullOrEmpty)) || m_bVyberHromData)
            //    && (typAdrOk) && m_bVybranaOsoba;

            //JmenoRob PrijmeniRob DatNarozeniRob IDDSRob DatUmrtiRob js-ISZRAdresa  
            // MistoNarozeniRuian  StatSpISZR     StatusText

            var formISValid = this.findForms("HlavniForm").gform("isValid");
            if (formISValid) { //|| m_bVyberHromData
                if (this.EditMode && ((this.VyberZRobItemsWorkDto.AifoText) || (this.VyberZRobItemsWorkDto.IszrZadostId)) && (this.typAdrOk) && this.vybranaOsoba) {

                    var values = {};
                    values.VysledekOvereni = this.VyberZRobItemsWorkDto.VysledekOvereni;
                    values.IszrZadostId = this.VyberZRobItemsWorkDto.IszrZadostId;
                    values.Jmeno = this.findFields("JmenoRob").gfield("getValue");
                    values.Prijmeni = this.findFields("PrijmeniRob").gfield("getValue");
                    values.DatNar = this.findFields("DatNarozeniRob").gfield("getValue");
                    values.AifoText = this.VyberZRobItemsWorkDto.AifoText;
                    if (this.findFields("gCheckBoxDoruc").gfield("getValue")) {
                        values.Adresa = this.findFields("DorucAdresaRobRuian").gfield("getValue");
                    } else {
                        values.Adresa = this.findFields("AdresaRobRuianTxt").gfield("getValue");
                    }
                    values.AdrKod = this.VyberZRobItemsWorkDto.AdrKod; // nevím zda je to uplně chytrý :-)
                    //values.AdrKod = this.findFields("KodUirAdr").gfield("getValue");
                    values.PostaKod = this.VyberZRobItemsWorkDto.PostaKod;
                    values.IdDs = this.findFields("IDDSRob").gfield("getValue");
                    this.findFields(".js-ISZRAdresa").gfield("model", "collect", values);
                    values.PrevzitDorucAdresuCheckbox = this.findFields("gCheckBoxDoruc").gfield("getValue");
                    values.DatUmrti = this.findFields("DatUmrtiRob").gfield("getValue");
                    values.MistoNar = this.findFields("MistoNarozeniRuianTxt").gfield("getValue");
                    values.CasOdpovedi = this.VyberZRobItemsWorkDto.OdpovedInfo.CasOdpovedi;
                    values.AgendaZadostId = this.VyberZRobItemsWorkDto.OdpovedInfo.AgendaZadostId;
                    values.RegOdpovedId = this.VyberZRobItemsWorkDto.OdpovedInfo.RegOdpovedId;

                    values.StatSpISZR = this.findFields("StatSpISZR").gfield("getValue");
                    values.JeDorucovaciVSZR = this.GetJeDorucovaciVSZR();
                    this.close(values);
                }
            }
        },

        repStarting: function (rep) {

            rep.params.X0000 = this.origModel.IxsEsu;
            rep.params.X0001 = this.VyberZRobItemsWorkDto.AifoText;
            if (this.VyberZRobItemsWorkDto
                && this.VyberZRobItemsWorkDto.OdpovedInfo
                && this.VyberZRobItemsWorkDto.OdpovedInfo.AgendaZadostId) {
                rep.params.X0002 = this.VyberZRobItemsWorkDto.OdpovedInfo.AgendaZadostId;
            }
            else
            {
                rep.params.X0002 = "";
            }
            rep.params.X0003 = this.Revize;
            rep.params.X0004 = this.Ixp;
            rep.params.X0005 = "";
            rep.params.X0006 = "";
            rep.params.X0007 = "";
            rep.params.X0008 = "";
        },
        nactiMistoNarozeniTxt: function () {
            var that = this;
            var selectedRows = this.vysledekHledani.ggrid("getSelection");
            if (selectedRows && selectedRows.length > 0) {
                var opt = {
                    misto_naroz_svet: selectedRows[0].misto_naroz_svet,
                    misto_nar_obec: selectedRows[0].misto_nar_obec,
                    misto_naroz_cr: selectedRows[0].misto_naroz_cr
                }
                this.call("GetMistoNarozeni", opt)
                    .done(function (retVal) {
                        if (retVal) {
                            that.findFields("MistoNarozeniRuianTxt").gfield("setValue", retVal);
                        }

                    });
            }
           
        },
        JeDorucovaciNaEsu: function () {

            return m_oGinsesu != null && !m_oGinsesu.TypAdr.IsNull && m_oGinsesu.TypAdr == 10;
        },

        DotazNaZruseniDorucovaci:function (){
            var that = this;
            var JeDorucovaciVSZR = this.GetJeDorucovaciVSZR();
            if (!JeDorucovaciVSZR && this.origModel.TypAdr == 10)
                if (this.actions.actOdstranitVazbu.enabled())
                    this.dialogs.confirm("jres:31900936",//RC 31900936 : Dotaz
                        "jres:31900937").on("closed", function (ev, odpoved) {  //RC 31900937 : V SZR-ROB není aktuálně vedena informace o doručovací adrese, doporučujeme odpojit od ověření v SZR  (verifikace záznamu ESU se změni z ověřeno v ROB na neverifikováno).
                            if (odpoved === "yes") {
                                that.actions.actOdstranitVazbu.run();
                            }
                        });

        },

        gCheckBoxDorucZmena: function () {
            var that = this;
            var selectedRows = this.vysledekHledani.ggrid("getSelection");
            if (selectedRows && selectedRows.length > 0) {
                //GSzrsrobDataSet.SzrsrobRow l_Row = (GSzrsrobDataSet.SzrsrobRow)m_gridVysledekHledani.CurrentDataRow;
                
                this.setPrvniPoNahraniNovychDat(true);
                //NastavRobDleRadku(l_Row);
                //EnableControls();;
            }
          


        },

        cancel:function(){
            //TODO
            //(UserProcess.Configuration.GetDatabaseParameter("gin_iszr_esvynu", 0) == 0)||!stejnaPrijmeni;
        },


        closeDet: function(){
            $.content(this).close(false);
        },

    }, { extendIntellisense: GContent });
    

});

   