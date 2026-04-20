

$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.GEsuAuditDlg", {


            onContentReady: function () {

                var that = this;
                this.newOps({ title: "jres:26265395" });
                

                var FiltryForm = new Gordic.Forms
                    .Form({
                        tabLabel: "SimpleForm",
                        name: "Filtry",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1"
                    })
                    .addSection()
                    .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:32115010",                 // (povinné)    Label řádku. //RC 32115010 : Období
                        name: "OdDo",               // (povinné)    Jméno řádku, to samé jmeno se použije jako jmenou fieldu s příponou  Start/End
                        type: "date",                    // (povinné)    Typ intervalu .. více typů popsáno níže
                    }))
                    .addRow("jres:26265396").addField("gcheck", { name: "vse", labelFromRow: false }); //RC 26265396 : Za všechny uživatele


                this.filterPanel = $("<div>").appendTo(this.element)
                    .on("gfilterpanelapply", function (event, obj) {
                        //console.log("Hledám: ", obj);
                        that.refresh(obj.filter);
                    })
                    .gfilterpanel({
                        simpleMode: true,
                        forms: [FiltryForm], //
                        customClass: "js-filter",
                    })
                    ;
                var filter = {
                    vse: false,
                    OdDo: {
                        start:this.Od,
                        end: this.Do
                    }
                };
               this.filterPanel.gfilterpanel("applyFilter", filter, true);     

               var gridKolonky = new Gordic.Data.GridFormat();
                  
                gridKolonky.addTextColumn({
                    name: "dotaz_1",
                    caption: "jres:26265392", //RC 26265392 : Dotaz do DB
                })
                    .addTextColumn({
                        name: "duvod_hes_txt",
                        caption: "jres:26265101", //RC 26265101 : Důvod
                    })
                    .addTextColumn({
                        name: "duvod_txt",
                        caption: "jres:26265101", //RC 26265101 : Důvod
                    })
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26265393", //RC 26265393 : PID
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: "jres:26265394", //RC 26265394 : Značka
                    })
                    .addDateColumn({
                        name: "dat_zmena",
                        caption: "jres:26265272", //RC 26265272 : Datum změny
                    })
                    .addTextColumn({
                        name: "zmenu_prov_rf",
                        caption: "jres:26265161", //RC 26265161 : Změnu provedl
                    });

                $.content(this).actions.add({
                    name: "actAkceGridu",
                    run: function (ev, ctx) {
                       
                    }
                });

                that.grid = $("<div>").appendTo(this.element)
                    //.height(900)
                    .gautofit()
                    .ggrid({
                        name: "grid",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-grid",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actAkceGridu, //selectAction
                        selection: function (ev, selectionInfo) {
                            var sel = that.grid.ggrid("activeRow");
                            that.ukazNahled(sel);
                            
                        },
  


                        scrollHelperTemplate: "{dotaz_1}",  // "{ixs_esu} - {nazev}",
                        /*
                        searchColumns: ["dotaz_1", "duvod_hes_txt", "duvod_txt", "ixp", "akt_znacka","zmenu_prov_rf"],
                        */
                        columns: gridKolonky,
                    });
             
                //#region Vytvoreni gsidebaru pro nahled

                this.element.gsidebar("option", { right: { width: 400 } });
                this.rightSbCnt$ = $("<div class=''>").append($("<h3>", { text: "jres:31900217", style: "margin: 0.5rem" })); //RC 31900217 : Vyberte položku v seznamu
                this.element.gsidebar("addPanel", "right", {
                    caption: "jres:31900196", //RC 31900196 : Náhled
                    id: "rightPanel",
                    customDiv: this.rightSbCnt$
                });
                
                this.rightSb$ = this.element.gsidebar("getPanel", "rightPanel"); //.gsbpanel("hide").gsbpanel("show")

                //#endregion
             
                this.naplnGrid(this.ListDto);
            },

            naplnGrid: function (listDto) {
                this.ViewTabulkaPobocky = new Gordic.Data.View(listDto, { key: "ixs_esu" }); 
                this.grid.ggrid("setData", this.ViewTabulkaPobocky, true);
            },

            //#endregion

    //#region operace nad gridem

           
             //#endregion

            //#region refresh

            refresh: function (data) {
                var that = this;

                this.call("LoadDataSeznam", { Vse: data.vse, Od: data.OdDo.start, Do: data.OdDo.end} /*, null, { applyValidationResultTo: ff } */)
                    .done(function (retVal) {
                        if (retVal) {
                            that.naplnGrid(retVal);
                        }

                    });

            },
            //#endregion

          

            
            //#region Nahled

            ukazNahled: function (dto) {
                /// <summary>Zobrazi nahled detailu v sidebaru napravo</summary>
                /// <param name="ixp" type="string">Ixp detailu</param>
                var that = this;
                if (dto && dto.typ_org) {
                    var data = new Gordic.Data.Readers.Ginctyo().getData({ typ_org: dto.typ_org }).done(function (view) {
                        if (view.length > 0)
                            dto.typ_isdsorg_txt = view["0"].typ_isdsorg_txt;
                        that.vybudovatRychlyNahledEsu(dto);
                    });
                } else {
                    this.vybudovatRychlyNahledEsu(dto);
                }
            },

            vybudovatRychlyNahledEsu: function (dto) {
                /// <summary>Vytvori formular s preview</summary>
                /// <param name="dto" type="server.GSmlspidUkazka03Dto">dto</param>

                this.rightSbCnt$.empty()
                if (dto) {
                    this.rightSbCnt$.append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>'" + dto.duvod_hes_txt + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");

                    var div = $("<div class='viewMode'>").appendTo(this.rightSbCnt$)
                        .gform("setup", { layoutDescriptor: "L2M1S1, breaks-300-400" })
                        .gformsection("create")
                        .gformrow("addFieldsRow", "jres:26265392").gformtext(dto.dotaz_1, "bold") //RC 26265392 : Dotaz do DB
                        .gformrow("addFieldsRow", "jres:26265101").gformtext(dto.duvod_hes_txt, "bold") //RC 26265101 : Důvod
                        .gformrow("addFieldsRow", "jres:26265101").gformtext(dto.duvod_txt, "bold") //RC 26265101 : Důvod
                        .gformrow("addFieldsRow", "jres:26265393").gformtext(dto.ixp, "bold") //RC 26265393 : PID
                        .gformrow("addFieldsRow", "jres:26265394").gformtext(dto.akt_znacka, "bold") //RC 26265394 : Značka
                        .gformrow("addFieldsRow", "jres:26265272").gformtext(Gordic.Templates.Formatters.datetime(dto.dat_zmena), "bold") //RC 26265272 : Datum změny
                        .gformrow("addFieldsRow", "jres:26265161").gformtext(dto.zmenu_prov_rf, "bold") //RC 26265161 : Změnu provedl
                
                        ;
                    this.rightSbCnt$.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
                }
            },

            //#endregion
            closing: function () { // podmineny userClose 
                var def = $.Deferred();
                def.resolve();
                return def.promise();
            },


            

    }, { extendIntellisense: GContent });
    
       

});

   