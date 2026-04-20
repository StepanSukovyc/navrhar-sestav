

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GSzrVyberAgendyDlg", {
        onContentReady: function () {
            console.log("Zacatek Scriptu");
            var that = this;
            this.promiseArray = [];

            // data
            console.log("ListAgend: ", this.ListAgend);
            console.log("IxsFun: ", this.IxsFun);
            console.log("ixsTyp: ", this.serverParams.ixsTyp);
            console.log("ixpDen: ", this.serverParams.ixpDen);
            console.log("typPhl: ", this.serverParams.typPhl);


            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L1M1S1" })
                .addRow().addField("gstringbox", {
                    name: "SZRInfo",
                    customClass: "",
                    disabled:true
                })
                .addRow("jres:26265327").addField("gselectbox", Gordic.Prefabs.Select.szrsage(), { //RC 26265327 : Agenda
                    name: "Agenda",
                    model: "model.Agenda = value.agenda",
                    customClass: "js-iszrFieldy",
                    dropdown: true,
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                    serverFilters: {
                        aktivita: 100,
                        agenda: this.ListAgend
                    }
                })
                .addRow("jres:31900136").addField("gselectbox", Gordic.Prefabs.Select.szrsagr(), { //RC 31900136 : Role
                    name: "Role",
                    model: "model.Agenda = value.agenda;model.AgendovaRole = value.agendova_role",
                    customClass: "js-iszrFieldy",
                    //dropdown: true,
                    itemTemplate: "{agenda} {agendova_role} {nazev_aro}",
                    tooltip: "Do pole role je možné zadat i část identifikace role - nabídka ve výběrovém okně je pak filtrována.",
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                    serverFilters: {
                        agenda: new Gordic.Forms.Dependency("Agenda", "agenda", true),
                        aktivita: 100,
                        //FilterAgenda: this.l_oAgendy,
                        ixs_fun_vfar: (that.gin_iszr_funrol === 1 ? this.IxsFun : undefined),
                        ixs_typ: (this.serverParams.ixsTyp ? this.serverParams.ixsTyp : undefined),
                        ixp_den: (this.serverParams.ixpDen ? this.serverParams.ixpDen : undefined),
                        typ_phl: (this.serverParams.typPhl ? this.serverParams.typPhl : undefined)

                    }
                })
                .addRow("jres:26265101").addField("gstringbox", { //RC 26265101 : Důvod
                    name: "DuvodUcel",
                    customClass: "js-iszrFieldy"
                });
                

            $("<div>").appendTo(this.element).gtab({ title: "jres:31900620", opened: true }).gform("createFrom", Formik); //RC 31900620 : Výběr agendy a role pro práci s ISZR
            this.findFields(".js-iszrFieldy").gfield("model", "apply", this, { initialValues: true });


            var Dotazy = new Gordic.Forms
                .Form({ name: "Dotazy", layoutDescriptor: "L1M1S1" })
                .addRow("jres:31900140").addField("gradio", { //RC 31900140 : Dotazy do SZR
                    name:"Doba",
                    initialValue: 0,
                    itemClass: "w-4",
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                    radios: [
                        { value: 0, label: 'jres:31900621' }, //RC 31900621 : za poslední 2 dny
                        { value: 1, label: 'jres:31901097' }, //RC 31901097 : za posledních 14 dní
                        { value: 2, label: 'jres:31900622' } //RC 31900622 : poslední 2 roky
                    ]
                })
                .addRow("jres:31900136") //RC 31900136 : Role
                .addField("gcheck", "w-6", {
                    name: "VsechnyAgendy", customClass: "js-iszrDotaz", initialValue: false, label: "jres:31900138", //RC 31900138 : Všechny agendy
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                })
                .addField("gcheck", "w-6", {
                    name: "AktRole", customClass: "js-iszrDotaz", initialValue: false, label: "jres:31900623", //RC 31900623 : Aktuální role
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    }
                });

            var tab = $("<div>").appendTo(this.element).gtab({ title: "jres:31900140", opened: true }) //RC 31900140 : Dotazy do ISZR

            $("<div>").appendTo(tab).gform("createFrom", Dotazy);

            var promisesinitFildu = this.findFields().map(function () { return $(this).gfield("getValueAsync"); })
            $.when.apply(null, promisesinitFildu).done(function () {
                that.loadData();
            });



            //#region grid

            var gridformat1 = new Gordic.Data.GridFormat()
                //gridformat
                .addTextColumn({
                    name: "cas_zadosti",
                    caption: "jres:31900624", //RC 31900624 : Čas žádosti
                    description: "jres:31900624", //RC 31900624 : Čas žádosti
                    cellTemplate: "{cas_zadosti}",
                }).addTextColumn({
                    name: "iszr_zadost_id",
                    caption: "jres:31900625", //RC 31900625 : ID ISZR žádosti
                    description: "jres:31900625", //RC 31900625 : ID ISZR žádosti
                    cellTemplate: "{iszr_zadost_id}",
                }).addTextColumn({
                    name: "agenda",
                    caption: "jres:26265327", //RC 26265327 : Agenda
                    description: "jres:26265327", //RC 26265327 : Agenda
                    cellTemplate: "{agenda}",
                }).addTextColumn({
                    name: "agendova_role",
                    caption: "jres:31900626", //RC 31900626 : Agendová role
                    description: "jres:31900626", //RC 31900626 : Agendová role
                    cellTemplate: "{agendova_role}",
                }).addTextColumn({
                    name: "duvod_ucel",
                    caption: "jres:26265101", //RC 26265101 : Důvod
                    description: "jres:26265101", //RC 26265101 : Důvod
                    cellTemplate: "{duvod_ucel}",
                }).addTextColumn({
                    name: "typ_sluzby",
                    caption: "jres:31901276", //RC 31901276 : Typ služby zkratka
                    description: "jres:31901277", //RC 31901277 : Typ služby zkratka
                    cellTemplate: "{typ_sluzby}",
                }).addTextColumn({
                    name: "typ_sluzby_txt",
                    caption: "jres:31900619", //RC 31900619 : Typ služby
                    description: "jres:31900619", //RC 31900619 : Typ služby
                    cellTemplate: "{typ_sluzby_txt}",
                }).addTextColumn({
                    name: "vysledek_kod",
                    caption: "jres:31900627", //RC 31900627 : Výsledek
                    description: "jres:31900627", //RC 31900627 : Výsledek
                    cellTemplate: "{vysledek_kod}",
                }).addDateColumn({
                    name: "dat_zmena",
                    caption: "jres:26265272", //RC 26265272 : Datum změny
                    description: "jres:26265272", //RC 26265272 : Datum změny
                    //cellTemplate: "{dat_zmena}",
                }).addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26265161", //RC 26265161 : Změnu provedl
                    description: "jres:26265161", //RC 26265161 : Změnu provedl
                    cellTemplate: "{zmenu_prov_txt}",
                }).addTextColumn({
                    name: "nazev_su",
                    caption: "jres:26265096", //RC 26265096 : Spisový uzel
                    description: "jres:26265096", //RC 26265096 : Spisový uzel
                    cellTemplate: "{nazev_su}",
                }).addTextColumn({
                    name: "ixp",
                    caption: "jres:26265393", //RC 26265393 : PID
                    description: "jres:26265393", //RC 26265393 : PID
                    cellTemplate: "{ixp}",
                }).addTextColumn({
                    name: "akt_znacka",
                    caption: "jres:26265394", //RC 26265394 : Značka
                    description: "jres:26265394", //RC 26265394 : Značka
                    cellTemplate: "{akt_znacka}",
                });

            if (that.gin_iszr_funrol !== 0) { // administrátor může vidět všechny dotazy, ostatní uživatelé jen svých agend
                gridformat1.addTextColumn({
                    name: "dotaz",
                    caption: "jres:26265458", //RC 26265458 : Dotaz
                    description: "jres:26265458", //RC 26265458 : Dotaz
                    cellTemplate: "{dotaz}",
                });
                
            }
            
            
            this.GgridISZRdotazy = $("<div>").appendTo(tab)
                //.height(250)
                .gautofit({ resizersOnTab: false })
                .ggrid({
                    name: "GridVysledekHledani",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    customClass: "js-gridISZRdotazy",
                    navigationMode: "row", // row, cell
                   // defaultAction: $.content(this).actions.actVybranVGridu, //selectAction
                    //rowsClass: function (dataRow) {
                    //    if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                    //        return " ui-disabled data-deleted ";
                    //    } else return "  ";
                    //},
                    scrollHelperTemplate: "{duvod_ucel}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["cas_zadosti", "iszr_zadost_id", "agenda", "duvod_ucel", "typ_sluzby_txt", "zmenu_prov_txt", "nazev_su", "ixp", "akt_znacka", "dic"],
                    */
                    columns: gridformat1
                });

            this.setSzrInfo();
                


            if (this.puvodniAgendaPokudDoslokeZmene) {
                this.dialogs.messageBox("jres:31901130", //RC 31901130 : Pozor
                    "jres:31901131" + this.puvodniAgendaPokudDoslokeZmene //RC 31901131 : Defaultní agneda byla změněna, protože aktuálně není pro Vás povolená. Původní agenda:

                ); //RC 31901129 : Není vyplněná agneda nebo role

            }

            //#endregion
           

            // gDataGridView.DataView.Sort = "dat_zmena DESC";
        },
        loadData: function () {
            var that = this;
            var AgendaVal = this.findFields("Agenda").gfield("getValue");
            var Agenda = AgendaVal ? AgendaVal.agenda : null;
            var VsechnyAgendy = this.findFields("VsechnyAgendy").gfield("getValue");
            var Doba = this.findFields("Doba").gfield("getValue");
            var AktRole = this.findFields("AktRole").gfield("getValue");

            this.beginOperation();
            if (Agenda) { 
                this.call("LoadData", { Agenda: Agenda, VsechnyAgendy: VsechnyAgendy, Doba: Doba, AktRole: AktRole })
                    .done(function (retVal) {
                        that.setLabelInSeznamZmen();
                        that.setSzrInfo();
                        that.setujDataDoGridu(retVal);
                        that.endOperation();
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });
            }
        },
        setujDataDoGridu: function (poleDat) {
            this.ViewTabulkaSZRDotazu = new Gordic.Data.View(poleDat || [], { key: "iszr_zadost_id" });
            this.GgridISZRdotazy.ggrid("setData", this.ViewTabulkaSZRDotazu, true);

        },
        setLabelInSeznamZmen: function () {
            if (this.SeznamZmen != null) {
                this.actions.actROBzmeny.update({ caption: this.SeznamZmen })
            } else {
                this.actions.actROBzmeny.update({ caption: "jres:26265378" }) //RC 26265378 : ROB změny
            }
        },

        setSzrInfo: function () {
            this.findFields("SZRInfo").gfield("setValue", this.SzrInfo);
        },

        obcerstvit: function () {
            this.loadData();
        },

        nastavit: function () {
            var that = this;
            var AgendaVal = this.findFields("Agenda").gfield("getValue");
            var Agenda = AgendaVal ? AgendaVal.agenda : null;
            var AgendovaRoleVal = this.findFields("Role").gfield("getValue");
            var AgendovaRole = AgendovaRoleVal ? AgendovaRoleVal.agendova_role : null;
            var Duvod = this.findFields("DuvodUcel").gfield("getValue");
            if (Agenda && AgendovaRole) {
                this.beginOperation();
                this.call("SetAgendaRoleDuvod", { Agenda: Agenda, AgendovaRole: AgendovaRole, Duvod: Duvod })
                    .done(function (retVal) {
                        that.obcerstvit();
                        that.endOperation();
                    })
                    .fail(function (xhr, type, vobj) {
                        that.endOperation();
                    });
            } else { 
                this.dialogs.messageBox("jres:31901130", //RC 31901130 : Pozor
                    "jres:31901129"); //RC 31901129 : Není vyplněná agneda nebo role
            }
        },

        robZmeny: function () {
            var options = {
                Logovani: this.Logovani
            };
            Gordic.Esu.Dialogs.GSzrRobSeznamZmenDlg(this, options).on("close", function (ev, retVal) {
                if (retVal) {
                    ;//TODO;
                }
            });
        },

        robVypisUdaju: function () {
            var options = {
                Logovani: this.Logovani
            };
            Gordic.Esu.Dialogs.GSzrRobVypisUdajuDlg(this, options).on("close", function (ev, retVal) {
                if (retVal) {
                    ; //TODO;
                }
            });
        },

        repStarting: function (rep) {
            console.log("repStarting", rep);
            rep.params.X0000 = "DEMOX000YAZ9";
        },

        



        cancel:function(){
            //TODO
            //(UserProcess.Configuration.GetDatabaseParameter("gin_iszr_esvynu", 0) == 0)||!stejnaPrijmeni;


            
        },

        

        saveAndCloseDet: function () {
           
        },


        closeDet: function(){
            $.content(this).close(false);

        },

     

        

    }, { extendIntellisense: GContent });
    

});

   