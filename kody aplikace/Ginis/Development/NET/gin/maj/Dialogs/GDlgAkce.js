(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GDlgAkce", {
        onContentReady: function () {

            var that = this;
            /*this.actionList = new GActionList({
                okAkce: 
            });*/
            this.commandBar([{
                action: new GAction({
                    name: "actOK",
                    caption: "jres:24534326", //RC 24534326 : OK
                    run: function ()
                    {
                        var l_radek = that.$grid.ggrid("getSelection")[0];

                    //    l_radek.cislo = that.cislo;
                        if (that.cvDebug) console.log("EVENT GDlgAkce.OK. - RETURNING(cislo): [" + l_radek.cislo + "]");

                        that.tryClose(l_radek);
                    }
                })
            },
                {
                    action: new GAction({
                        name: "actCancel",
                        caption: "jres:24534327",  //RC 24534327 : Zrušit
                        run: function ()
                        { that.tryClose(); }
                    })
                }
            ])

            //this.form1 = $("<div>").appendTo(this.element);
            //    //.gtab({
            //    //title: "jres:0000", //RC 0000
            //    //opened: true,
            //   // menuBar: this.actionList.createBar(["okAkce"], true),
            //   // });


            //var data = that.FillTypPripadu();

            //var formBuilder = new Gordic.Forms.Form("L2M2S1, L-5-7-0, M-12-12-0, S-12-12-0");
            //formBuilder.addRow("jres:24534328").addField("gnumberbox", { name: "df_rok", change: function (ev, obj) { that.nacti(); } }) //RC 24534328 : Od roku            
            //this.form1.gform("createFrom", formBuilder);


            var filterFormDef = new Gordic.Forms.Form({ tabLabel: "" })                              
                .addSection()
                .addRow("jres:24534328").addField("gnumberbox", "w-8", { //RC 24534328 : Od roku
                    name: "df_rok",
                    model: "rok_od"
                //    change: function (ev, obj) { that.nacti(); }
                })               
                ;

            var $filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterFormDef],                                                  //predani definic formularu
                  //  favorites: ["cbStav", "cbRezim", "cbDruh", "tbRok"],        //defaulty oblibenych polozek
                    //filterStorageService: null, // new Gordic.Uka.WebClient.GMemoryStorageService(),  //LK20170314_1.4, prirazeni custom storage sluzby pro praci s ulozenymi filtry
                    simpleMode: true,
                    filterHelperItemTemplate: "<b>{name}</b> - <i>{description}</i>",
                    apply: function (event, obj) {                                           //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        //console.log(obj.filter.rok_od);
                        that.nacti(obj.filter.rok_od);
                    }
                });


            this.$grid = $("<div class='AcVerZakGrid'>")
                .css("max-height", "100%")
                .appendTo(this.element)
                .ggrid({
                    columnMode: "fit",     // fit (defaultne by melo byt toto), full
                    columns: this.getColumns()
                });

                 
            this.nastavMasku();
            this.nacti(this.argOdRoku);
        },

        
        //---------------------------------------------------------------------
        nastavMasku: function ()
        {
          
            this.findFields("df_rok").gfield("setValue", this.argOdRoku);          
            
        },

        //---------------------------------------------------------------------
        nacti: function(filtr) 
        {
            var that = this;
            
            if (that.cvDebug) console.log("Načítám akce od roku " + filtr);

            that.beginOperation("jres:24534621"); //RC 24534621 : Dotaz do databáze...

            that.call("NactiAkce", {
                odRoku: filtr,
            })
                .then(function (data) {
                    var view = new Gordic.Data.View(data, { key: "cislo" });
                    that.$grid.ggrid("setData", view);

                })
                .always(function () { that.endOperation(); });
                
        }, // end function (nacti)


        getColumns: function ()
        {
            var gf = new Gordic.Data.GridFormat()

                .addNumberColumn({
                    name: "rok"
                    , caption: "jres:24534042" //RC 24534042 : Rok
                })
                .addTextColumn({
                    name: "cislo"
                    , caption: "jres:24534329" //RC 24534329 : Číslo akce
                })                
                .addTextColumn({
                    name: "nazev"
                    , caption: "jres:24534059" //RC 24534059 : Název
                })                                
               
            return gf;

        }

    }, { extendIntellisense: GContent });
})(jQuery);