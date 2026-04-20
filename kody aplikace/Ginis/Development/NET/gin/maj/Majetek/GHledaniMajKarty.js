(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GHledaniMajKarty", {

        taskId: "actMajFind",    

        prepareContent: function (args) {
            console.log("GHledaniMajKarty", args, this);

            this.newOps({ title: "Hledání dokladu" });
            var that = this;
            this.menuBar([{
                action: new GAction({
                    name: "actDetail",
                    caption: "jres:24534347", //RC 24534347 : Detail
                    icon: "gi-detail",
                    run: function () {
                        var selectedDkl = $grid.ggrid("getSelection")[0];

                        if (selectedDkl === undefined) {
                            GDlg.alert("Vyberte záznam");
                        }
                        else {
                            console.log("Gordic.Maj.WebClient.GHledaniMajKarty - Otevírám doklad ", selectedDkl.ixp);

                            that.navigate("Gordic.Maj.WebClient.GMajDokladDetail", {
                                argIxp: selectedDkl.ixp
                            });
                        } // end if-else
                    }
                }),
                favorite: true
            }]);

            //sluzba pro pristup k datum ze serveru //{className:"", params: {}}
            this.srv = new GContent({ className: "Gordic.Maj.WebClient.GHledaniMajKarty", params: { MyFoo: "abc" } });  //sluzba pro pristup k datum na serveru + predani parametru

            //============================================
            // Vytvoreni formulare s filtrem 
            //============================================

            var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Hledat doklad" })
                                    .addSection()
                                        .addRow("Identifikátor").addField("gstringbox", { name: "ixp" })
                                    .addSection()
                                        .addRow("Evidenční číslo").addField("gstringbox", { name: "ac" })
                                    .addSection()
                                        .addRow("Agendové číslo").addField("gstringbox", { name: "ac_ag" });


            //============================================
            // vytvoreni filtru (gfilterpanel)
            //============================================

            var $filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterFormDef],                                                  //predani definic formularu
                    favorites: ["ixp", "ac", "ac_ag"],        //defaulty oblibenych polozek
                    //filterStorageService: null, // new Gordic.Uka.WebClient.GMemoryStorageService(),  //LK20170314_1.4, prirazeni custom storage sluzby pro praci s ulozenymi filtry
                    simpleMode: true,
                    filterHelperItemTemplate: "<b>{name}</b> - <i>{description}</i>",
                    apply: function (event, obj) {                                           //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        console.log("filterForm.apply", obj);
                        that.loadData($grid, obj.filter);                                    //pristup k datum z gfilterpanelu (DTO filtru)
                    }
                });

            
            //============================================
            //#region Nacteni defaultu filtru + validatoru a nasledne nacteni gridu (experimentalni)
            //============================================

            this.beginOperation("Nacitam data");
            this.srv.call("GetFilterValidators", {})
                .then(function (validators) {
                    console.log("filter", validators);
                    $filterForm.gfilterpanel("option", "validators", validators);       //prirazeni validatoru DTO filtru (experimentalni)
                    return {};
                })
                //.done(function (filter) { $filterForm.gfilterpanel("applyFilter", { name: "",  data: filter }); })  //NOTE: Odkomentovanim se pri prvnim otevreni contentu nactou data do gridu
                .always(function () { that.endOperation(); });

            
            //============================================
            //LK20170110_1, vytvoreni gridu + definice
            //============================================

            var $grid = $("<div class='js-mujGrid'>")
                .css("height", "calc(100% - " + $filterForm.height() + "px)")
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            //data, ze kterych byl vytvoren radek
                            var row = ctx.cellInfo.data;

                            console.log("Gordic.Maj.WebClient.GHledaniMajKarty - Otevírám doklad ", row.ixp);

                            // volání detailu
                            that.navigate('Gordic.Maj.WebClient.GMajDokladDetail', {
                                argIxp: row.ixp                              
                            });
                        }
                    }),                                           

                    //==========================================================
                    // SLOUPCE GRIDU
                    //==========================================================
                    columns: new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "ixp",
                            caption: "Identifikátor",
                            width: 120,
                            fixedWidth: true,
                            customClass: "ui-disabled"
                        })
                        .addTextColumn({
                            name: "typ_ag_zkr",
                            caption: "Ag.",
                            width: 50,
                        })
                        .addTextColumn({
                            name: "akt_znacka",
                            caption: "Značka",
                            width: 80,
                        })
                        .addTextColumn({
                            name: "ixs_typ_txt",
                            caption: "Typ dokladu",
                            width: 200,
                        })                       
                        .addTextColumn({
                            name: "nazev",
                            caption: "Popis",
                            width: 300,
                        })
                        .addTextColumn({
                            name: "ixs_fun_akt_txt",
                            caption: "Vlastník",
                            width: 300,
                        })

                });
        },
        loadData: function ($grid, filterModel) {
            /// <summary>Nacteni dat do gridu</summary>
            /// <param name='$grid' type='jQuery'>Reference na ggrid</param>
            /// <param name='filterModel' type='Object'>Model (DTO) s filtrem</param>

            filterModel = filterModel || {};

            var that = this;
            this.beginOperation("Nacitam data");
            this.srv.call("HledejDoklady", { filter: filterModel })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixp" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    $grid.ggrid("setData", view, true);                     //true = prekresleni gridu
                })
                .always(function () { that.endOperation(); });
        }
    }, { extendIntellisense: GContent });



    

    
})(jQuery);