/* ---------------------------------------
*   CONTENT pro seznam databazovych parametru
*  ---------------------------------------
* 
*/

(function ($) {
    "use strict";

    namespace("Gordic.WebApp.DBParamListContent", {
        uid: "DBParamListContent",
        initial: true,
        taskId: "actDBParamList",
        title: "jres:25000014", //RC 25000014 : Parametry aplikace     
        prepareContent: function () {
            this.makeMenu();
            var that = this;
            // demo obsah contentu
            this.gridDBParams = $("<div>").appendTo(this.element).css("height", "100%").ggrid({
                data: new Gordic.Data.View(that.createServiceContent("Gordic.Gui.WebApp.GWebAppService").call("DbParamsList"), { key: "param" }),
                columns: new Gordic.Data.GridFormat()
                    .addTextColumn({ name: "param_txt", caption: "jres:33100084", width: 300 }) //RC 33100084 : Název parametru
                    .addTextColumn({ name: "config_txt", caption: "jres:25000005", width: 150 }) //RC 25000005 : Hodnota
                    .addTextColumn({ name: "typ_parametru", caption: "jres:33100072", width: 90 }) //RC 33100072 : Typ parametru //vblabla: Dodatecne pridani sloupce, ref T11019
                    //.addTextColumn({ name: "vlastni_parametry", caption: "jres:33100073", width: 100 }) //RC 33100073 : Vlastní parametr  //vblabla: Skryti sloupce Vlastni parametr sloupce, ref T27306
                    .addTextColumn({ name: "uroven_cfg_txt", caption: "jres:25000006", width: 100 }) //RC 25000006 : Úroveň
                    .addTextColumn({ name: "param", caption: "jres:33100085", width: 150 }), //RC 33100085 : Parametr
                searchColumns: ["*param", "uroven_cfg_txt", "vlastni_parametry", "typ_parametru", "config_txt", "param_txt"],  //["param_txt", "param"],
                columnMode: "full",
                //23.01.2020 vblabla - T857 -
                selection: function (ev, obj) {
                    if (that.initial) {that.prepareFocus()}
                    if (!that.sidebar) {
                        that.createSidebar();
                    }
                    var selection = obj.getSelection();
                    if (selection && selection.length > 0 && selection[0]) {
                        var row = selection[0];
                        that.enablePreview(true);
                        that.showPreview(row);
                    }
                    else {
                        that.enablePreview(false);
                    }
                },
                defaultAction: new GAction({
                    name: "detailParametru",
                    run: function () {
                        that.otevritDetail();         // volani funkce otevritDetail()
                    },
                }),
            });
        },
        prepareFocus: function () {
            if (this.initial) {
                this.initial = false;
                this.gridDBParams.ggrid("focus")
            }
        },
       
 
        //elementPanel: null,
        //panelElement: null,
        //sidebar: null,
        //panelId: "",

        //23.01.2020 vblabla - T857 - dodelat zobrazeni detailu DB parametru do sidebaru namisto samostatneho contentu.
        //DBParamsDetail.cs
        otevritDetail: function (dbParam) {
            var selection = this.gridDBParams.ggrid("getSelection");
            if (selection && selection.length > 0) {
                var row = selection[0]
                this.navigate("Gordic.Gui.WebApp.DBParamsDetail", { "Param": row.param, "UrovenParam": row.uroven_cfg_txt, "HodnotaParam": row.config_txt, ShowCommandBar: true });
            }
        },

        /**
         * otevritPrehledVsechParametru - Zobrazeni prehledu vsech dostupnych parametru
         * @type {function () {}
         */
        otevritPrehledVsechParametru: function () {
            //this.dialogs.showWindow("Gordic.Gui.WebApp.DBParamsAll", {  }, "", 820, 700, true); //zobrazeni prehledu vsech db parametru do modalniho okna
            this.navigate("Gordic.Gui.WebApp.DBParamsAll");
        },


        /** vytvořit panel */
        createPanel: function () {
            var that = this;
            this.panelId = "panelNahledSeznamParametru";
            this.previewDiv = this.createPreviewDiv();
           
            var panel = {
                minWidth: 300,
                id: this.panelId,
                icon: "gi-souhrn",
                caption: "jres:33100032",							//RC 33100032 : Náhled
                leaf: "jres:33100032",								//RC 32000082 : Náhled,
                customDiv: this.previewDiv,
                open: function (ev, obj) {
                        that.enablePreview(true);
                        that.loadPreview();
                },
            };
            return panel;
        },

        loadPreview: function () {
            var that = this;
            if (this.gridDBParams) { 
                var row = this.gridDBParams.ggrid("activeRow");
                if (row && row.param) {
                    this.previewDiv.gpreview("loadAll", {
                        Param: row.param, 
                        UrovenParam: row.uroven_cfg_txt,
                        HodnotaParam: row.config_txt,
                        ShowCommandBar: false
                    } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
                    this.element.gsidebar("getPanel", "panelNahledSeznamParametru").gsbpanel("option", "caption", row.param )
                } else {
                    that.enablePreview(false); 
                }
            }
        },

        enablePreview: function (enabled) {
            this.previewDiv.gpreview("option", { disabled: !enabled });
        },
        showPreview: function (row) {
            if (!this._closed && this.element.gsidebar("getPanel", "panelNahledSeznamParametru").gsbpanel("option", "visible")) {
                this.loadPreview();
            }
        },

        /** vytvořit sidebar */
        createSidebar: function () {
            
            var panel = this.createPanel();

            this.sidebar = $(this.element).gsidebar({
                userSettings: this.userSettings,
                right: {
                    pinned: true,
                    panels: [panel]
                }
            });
        },

        createPreviewDiv: function () {
            var that = this;
            var row = this.gridDBParams.ggrid("activeRow");
            return $("<div>").gpreview({
                parentContent:that,
                tabs: [
                    {                        
                        name: "param",
                        caption: "jres:33100032",	//RC 33100032 : Náhled  //puvidne: "jres:33100033".format(row.param),		//RC 33100033 : {0}
                        content: "Gordic.Gui.WebApp.DBParamsDetail",//časem takto-> function (loadParams) { return Gordic.Previews.getPreviewClass(loadParams.typ_ag, loadParams); }
                        userSettings: that.userSettings
                    }
                ],
                useSubtask: false,
            });
        },


		/** odstranit sidebar */
		//destroyPreviewDiv: function() {
  //          if (this.previewDiv !== undefined) {
  //              this.previewDiv.gpreview("removeAll");
  //          }
  //      }
        //____________________End of Sidebar______________________

        //___________makeMenu_____________
        makeMenu: function () {
            var that = this;
            this.actions.addRange({
                actDetail: {
                    caption: "jres:33100026", //RC 33100026 : Detail parametru
                    tooltip: "jres:33100017", //RC 33100017 : Detail DB parametru
                    icon: "gi-detail",
                    run: function (ev, ctx) {
                        that.otevritDetail();  
                    }
                },
                actPrehledVsechParametru: {
                    caption: "Přehled všech parametrů", //RC 33100026 : Detail parametru
                    tooltip: "Přehled všech parametrů", //RC 33100017 : Detail DB parametru
                    icon: "gi-list",
                    run: function (ev, ctx) {
                        that.otevritPrehledVsechParametru();
                    }
                }
            });            

            this.menuBar([
                {
                    favorite: true, action: this.actions.actDetail
                },
                {
                    favorite: true, action: this.actions.actPrehledVsechParametru
                },
                /*{
                    favorite: true, action: this.actions.actAdminMod
                },*/

            ]);

            this.commandBar([{
                action: new GAction({
                    name: "closeAct",
                    //caption: (Gordic as any).Dialogs.Buttons.mbbClose.text,
                    caption: "Zavřít",
                    run: function () { that.close(); }
                })
            }])
        },
        //_________End of makeMenu__________


    });
})(jQuery);

