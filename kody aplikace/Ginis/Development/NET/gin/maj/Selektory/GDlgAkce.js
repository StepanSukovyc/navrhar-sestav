(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GDlgAkce2", {
        onContentReady: function () {

            var that = this;
            /*this.actionList = new GActionList({
                okAkce: 
            });*/
            this.commandBar([{
                action: new GAction({
                    name: "actOK",
                    caption: "jres:24534326", run: function () //RC 24534326 : OK
                    {
                        var l_radek = that.$grid.ggrid("getSelection")[0];
                        l_radek.cislo = that.cislo;
                        that.close(l_radek);
                    }
                })
            },
                {
                    action: new GAction({
                        name: "actCancel",
                        caption: "jres:24534327", run: function () //RC 24534327 : Zrušit
                        { that.close(); }
                    })
                }
            ])

            this.form1 = $("<div>").appendTo(this.element);
                //.gtab({
                //title: "jres:0000", //RC 0000
                //opened: true,
               // menuBar: this.actionList.createBar(["okAkce"], true),
               // });

            //var data = that.FillTypPripadu();
            var formBuilder = new Gordic.Forms.Form("L2M2S1, L-5-7-0, M-12-12-0, S-12-12-0");
            //if (data.length > 0) {
            //    formBuilder.addRow({ label: "jres:26600762", name: "row_typ" }).addField("gselectbox", {  //RC 26600762 : Typ případu
            //        name: "typ", //RC 26600762 : Typ případu
            //        itemClass: "",
            //        initialValue: data[0],
            //        itemTemplate: "{typ_pri}",
            //        data: data,
            //        dropdown : true,
            //        change: function (ev, changeObj) {
            //            that.typ_ag_blok = changeObj.value.v
            //            that.nacti()
            //        }
            //    })
            //}
            formBuilder.addRow("jres:24534328").addField("gnumberbox", { name: "df_rok", change: function (ev, obj) { that.nacti(); }  }) //RC 24534328 : Od roku
                

            this.form1.gform("createFrom", formBuilder);

            this.$grid = $("<div class='AcVerZakGrid'>")
                .css("max-height", "100%")
                .appendTo(this.element)
                .ggrid({
                    columnMode: "fit",     // fit (defaultne by melo byt toto), full
                    columns: this.getColumns()
                });

         
            this.nastavTitle();
            this.nastavMasku();
            this.nacti();
        },


        //---------------------------------------------------------------------
        nastavTitle: function () {
            var l_title = "Výběr akce";
            
            this.newOps({ title: l_title }); 
            
        },
        //---------------------------------------------------------------------
        nastavMasku: function ()
        {
            this.findFields("df_rok").gfield("setValue", this.rok);
            this.findFields("df_rok").gfield("setValue", this.cvTestRok);
            //cvTestRok
            
        },

        //---------------------------------------------------------------------
        nacti: function() 
        {
            var that = this;
            this.call("NactiAkce", {
                odRoku: this.findFields("df_rok").gfield("getValue"),                
            })
                .then(function (data) {
                    var view = new Gordic.Data.View(data, { key: "cislo" });
                    that.$grid.ggrid("setData", view, true);

                });
        },


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