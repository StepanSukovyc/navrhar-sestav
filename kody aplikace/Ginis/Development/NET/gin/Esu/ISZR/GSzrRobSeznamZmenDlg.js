

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GSzrRobSeznamZmenDlg", {
        onContentReady: function () {
            var that = this;
            this.promiseArray = [];

            // data
            console.log("ListAgend: ", this.ListAgend);
            console.log("IxsFun: ", this.IxsFun);



            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L1M1S1" })
                .addRow("jres:26265327").addField("gselectbox", Gordic.Prefabs.Select.szrsage(), { //RC 26265327 : Agenda
                    name: "Agenda",
                    model: "model.Agenda = value.agenda",
                    customClass: "js-iszrFieldy",
                    dropdown: true,
                    disabled: true,
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                    serverFilters: {
                        aktivita: 100,
                        agenda: this.Agenda
                    }
                })
                .addRow("jres:31900136").addField("gselectbox", Gordic.Prefabs.Select.szrsagr(), { //RC 31900136 : Role
                    name: "Role",
                    model: "model.Agenda = value.agenda;model.AgendovaRole = value.agendova_role",
                    customClass: "js-iszrFieldy",
                    //dropdown: true,
                    tooltip: "jres:31900631", //RC 31900631 : Do pole role je možné zadat i část identifikace role - nabídka ve výběrovém okně je pak filtrována.
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                    serverFilters: {
                        agenda: new Gordic.Forms.Dependency("Agenda", "agenda", true),
                        aktivita: 100,
                        //FilterAgenda: this.l_oAgendy,
                        ixs_fun_vfar: (that.gin_iszr_funrol === 1 ? this.IxsFun : undefined),
                    }
                })
                .addRow("jres:26265101").addField("gstringbox", { //RC 26265101 : Důvod
                    name: "DuvodUcel",
                    customClass: "js-iszrFieldy"
                });
                

            $("<div>").appendTo(this.element).gtab({ title: "jres:31900137", opened: true }).gform("createFrom", Formik); //RC 31900137 : ISZR informace

            this.findFields(".js-iszrFieldy").gfield("model", "apply", this, { initialValues: true });


            var Dotazy = new Gordic.Forms
                .Form({ name: "Dotazy", layoutDescriptor: "L1M1S1" })
               
                .addField("gcheck", "w-6", {
                    name: "VsechnyAgendy", customClass: "js-iszrDotaz", initialValue: false, label: "jres:31900138", //RC 31900138 : Všechny agendy
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    },
                })
                .addField("gcheck", "w-6", {
                    name: "IOdhlasene", customClass: "js-iszrDotaz", initialValue: false, label: "jres:31900139", //RC 31900139 : Zobrazit i odhlášené ze sledování
                    change: function (ev, changeObj) {
                        that.obcerstvit();
                    }
                });

            var tab = $("<div>").appendTo(this.element).gtab({ title: "jres:31900140", opened: true }); //RC 31900140 : Dotazy do SZR

            $("<div>").appendTo(tab).gform("createFrom", Dotazy);

            var promisesinitFildu = this.findFields().map(function () { return $(this).gfield("getValueAsync"); });
            $.when.apply(null, promisesinitFildu).done(function () {
                that.loadData();
            });



            //#region grid

            var gridformat1 = new Gordic.Data.GridFormat()
                //gridformat

                .addIconColumn({
                    name: "prihlaseni_zmen",
                    caption: "jres:31900141", //RC 31900141 : Stav přihlášení
                    //customClass: "center",
                    width: 40,
                    //fixedWidth: true,
                    iconTemplate: function (data) {
                        if (data.prihlaseni_zmen === 1) {
                            return { icon: "gi-tick g-state-text g-state-success", tooltip: "jres:31900146" }; //RC 31900146 : U ESU je nastaveno sledování změn v SZR ROB.
                        } else {
                            return { icon: "gi-window-close", tooltip: "jres:31900147" }; //RC 31900147 : U ESU je zrušeno sledování změn v SZR ROB.
                        }
                    }
                })
                .addTextColumn({
                    name: "ixs_esu",
                    caption: "jres:31900142", //RC 31900142 : ID ESU
                    description: "jres:31900142", //RC 31900142 : ID ESU
                    cellTemplate: "{ixs_esu}",
                }).addTextColumn({
                    name: "agenda",
                    caption: "jres:26265327", //RC 26265327 : Agenda
                    description: "jres:26265327", //RC 26265327 : Agenda
                    cellTemplate: "{agenda}",
                }).addTextColumn({
                    name: "duvod_ucel",
                    caption: "jres:26265101", //RC 26265101 : Důvod
                    description: "jres:26265101", //RC 26265101 : Důvod
                    cellTemplate: "{duvod_ucel}",
                }).addTextColumn({
                    name: "esu_txt",
                    caption: "jres:31900041", //RC 31900041 : ESU
                    description: "jres:31900041", //RC 31900143 : Esu
                    cellTemplate: "{esu_txt}",
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
                });

            
            
            this.GgridISZRdotazy = $("<div>").appendTo(tab)
                //.height(250)
                .gautofit()
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
                    scrollHelperTemplate: "{esu_txt}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["ixs_esu", "agenda", "duvod_ucel", "esu_txt", "zmenu_prov_txt"],
                    */
                    columns: gridformat1
                });

            
                
            this.updateActions();


            //#endregion
           

            // gDataGridView.DataView.Sort = "dat_zmena DESC";
        },
        loadData: function () {
            var that = this;
            
            var VsechnyAgendy = this.findFields("VsechnyAgendy").gfield("getValue");
            var IOdhlasene = this.findFields("IOdhlasene").gfield("getValue");

            this.beginOperation();
            this.call("LoadData", { IOdhlasene: IOdhlasene, VsechnyAgendy:VsechnyAgendy})
                .done(function (retVal) {
                    console.log("retVal", retVal);
                    that.setujDataDoGridu(retVal);
                    that.updateActions();
                    that.endOperation();
                })
                .fail(function (xhr, type, vobj) {
                    console.log("typ exception: ", type, vobj);
                    that.endOperation();
                });

        },
        setujDataDoGridu: function (poleDat) {

            this.ViewTabulkaSZRDotazu = new Gordic.Data.View(poleDat || [], { key: "ixs_esu" });
            this.GgridISZRdotazy.ggrid("setData", this.ViewTabulkaSZRDotazu, true);

        },
        

        obcerstvit: function () {

            this.loadData();
        },

        updateActions: function () {
            // pouze přílohy

            var vybrano = false;
            var row = this.GgridISZRdotazy.ggrid("getSelection");
            if (row.length > 0) {
                vybrano = true;
            }
            var Duvod = this.findFields("Duvod").gfield("getValue");
            var AgendovaRole = this.findFields("Role").gfield("getValue");

            this.findFields("VsechnyAgendy").gfield("option", "disabled", this.esu_iszr_ruian  === 0); 
            var boolik = vybrano && Duvod && AgendovaRole && this.gin_iszr_povole !== 0; 
            this.actions.actOdhlasit.update({ enabled: boolik });
        },

       


        odhlasit: function () {
            var that = this;
            var AgendovaRoleVal = this.findFields("Role").gfield("getValue");
            var AgendovaRole = AgendovaRoleVal ? AgendovaRoleVal.agendova_role : null;
            var Duvod = this.findFields("DuvodUcel").gfield("getValue");

            var ixs_esu = null;
            var row = this.GgridISZRdotazy.ggrid("getSelection");
            if (row.length > 0) {
                ixs_esu = row[0].ixs_esu;
            }
            
            if (AgendovaRole && Duvod && ixs_esu) { 
                this.beginOperation();
                this.call("Odhlasit", { ixs_esu: ixs_esu, AgendovaRole: AgendovaRole, Duvod: Duvod })
                    .done(function (retVal) {
                        // zde se řeší úspěch vyhozenou nonfatal vyjímkou
                        that.endOperation();
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });
            } else {
                that.dialogs.alert("jres:31900145"); //RC 31900145 : Nebyl označen řádek, nebo není vyplněna role a důvod.
            }


        },

        detailEsu: function () {
            
            var that = this;

            var sel = that.GgridISZRdotazy.ggrid("activeRow");
            if (sel) {
                var opt = {
                    IxsEsu: sel.ixs_esu,
                    Ucel: 2,
                    Logovani: this.Logovani,
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(that, opt);
            } else {
                that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
            }
          

        },

        cancel:function() {
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

   