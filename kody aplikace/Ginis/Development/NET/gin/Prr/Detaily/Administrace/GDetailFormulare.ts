namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;



    @gcontent
    export class GDetailFormulare extends GDetailBuilderContent<
    Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> &
    Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> &
    Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>
    > implements IGContent {
        Sablona?: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        typyUdalostiFormulareTab: JQuery<HTMLElement>;
        denikyFormulareTab: JQuery<HTMLElement>;
        skupinyFormulareTab: JQuery<HTMLElement>;

        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { sablona: this.Sablona };
            
            this.loadData(this).done(function () {
                that.setRezim(that.Rezim, that);
            });
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;
            builder.withComponent<this>("DetailFormulare", {
                headerForm: this.createForm(),
                tabGroups:
                {                   
                    tabGroupTypyUdalosti:
                    {                        
                        caption: "jres:25800078" //RC 25800078 : Napojení na typy událostí
                    },
                    tabGroupDeniky:
                    {
                        caption: "jres:25800079" //RC 25800079 : Napojení na deníky
                    },
                    tabGroupSkupiny:
                    {
                        caption: "jres:25800080" //RC 25800080 : Napojení na skupiny
                    },
                    tabGroupEmpty:
                    {
                        caption: ""
                    }
                },
                tabs:
                {
                    tabTypyUdalostiFormulare:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupTypyUdalosti" }, headerClass: "enableTab"
                        },                       
                        contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GFormularTypUdalostiControl(that, that.Mp)),
                        init: function (tab) {
                            that.typyUdalostiFormulareTab = tab;
                        }
                    },
                    tabDenikyFormulare:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupDeniky" }, headerClass: "enableTab"
                        },
                        //contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GFormularDenikuControl(that, that.Mp)),
                        init: function (tab) {
                            that.denikyFormulareTab = tab;
                        }
                    },
                    tabSkupinyFormulare:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupSkupiny" }, headerClass: "enableTab"
                        },
                        //contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GDukazDenikuControl(that, that.Mp)),
                        init: function (tab) {
                            that.skupinyFormulareTab = tab;
                        }
                    }
                },
                actions:
                {
                },
                menuBar: [
                    //{ id: "prilohy", action: "actPrilohy", favorite: true, after: "cinnosti" },
                    
                ]
            }, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
            var that = this;

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25800021"; //RC 25800021 : Následující záznam<br>Název: {nazev}
            this.detailMoveComponentPrevTemplate = "jres:25800022"; //RC 25800022 : Předchozí záznam<br>Název: {nazev}
            
            this.enableFields = function (enable: boolean) {

                this.findFields(".enabled").gfield("option", "disabled", !enable);                
                this.findFields(".enabled_new").gfield("option", "disabled", !enable || this.Rezim == Gin.Interface.RegSpa.GRezimContentu.Editace);

                var gTabManager = that.find(".gtabmanager"); 
                               
                gTabManager.gtabmanager("visibleGroup", "tabGroupTypyUdalosti", !enable);
                gTabManager.gtabmanager("visibleGroup", "tabGroupDeniky", !enable); 
                gTabManager.gtabmanager("visibleGroup", "tabGroupSkupiny", !enable);
                gTabManager.gtabmanager("visibleGroup", "tabGroupEmpty", enable);

                if (that.Rezim != Gin.Interface.RegSpa.GRezimContentu.View) gTabManager.gtabmanager("setActive", "tabGroupEmpty");
                else if (gTabManager.gtabmanager("getActive") == "tabGroupEmpty") gTabManager.gtabmanager("setActive", "tabGroupTypyUdalosti");
               
                //if (enable) gTabManager.hide();
                //else gTabManager.show();
            };

            this.enableActions = function (enable: boolean) {
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);               
            };

            this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions): JQueryPromise<any> {
                console.log("afterLoadData");
                var prom = $.Deferred();
                
                if (this.readOnly) {                    

                    this.element.on("gtabmanageropen", function (ev, ctx) {

                        console.log("gtabmanageropen");
                        tabChange(ctx.id);

                    });

                    if (this.typyUdalostiFormulareTab) {
                        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.typyUdalostiFormulareTab);
                        tabCnt.loadedData = false;
                    }
                    //if (this.denikyFormulareTab) {
                    //    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.denikyFormulareTab);
                    //    tabCnt.loadedData = false;
                    //}
                    //if (this.skupinyFormulareTab) {
                    //    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.skupinyFormulareTab);
                    //    tabCnt.loadedData = false;
                    //}
                    var gTabManager = that.find(".gtabmanager");
                    var active = gTabManager.gtabmanager("getActive");                    
                    if (active != null) tabChange(active);
                }

                return prom;
            }
            var tabChange = function (idTab: string)
            {
                switch (idTab) {
                    case "tabGroupTypyUdalosti":
                        if (that.typyUdalostiFormulareTab) {
                            const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.typyUdalostiFormulareTab);
                            if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                                tabCnt.reloadData();
                            }
                        }
                        break;
                    //case "tabGroupDeniky":
                    //    if (that.denikyFormulareTab) {
                    //        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.denikyFormulareTab);
                    //        if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                    //            tabCnt.reloadData();
                    //        }
                    //    }
                    //    break;
                    //case "tabGroupSkupiny":
                    //    if (that.skupinyFormulareTab) {
                    //        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.skupinyFormulareTab);
                    //        if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                    //            tabCnt.reloadData();
                    //        }
                    //    }
                    //    break;
                }
            }
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
           
            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" })//RC 25800013 : Hlavička
                .addSection()
                .addRow("jres:25800081") //RC 25800081 : Typ šablony
                .addField("gradio", {
                    name: "s_frm",
                    initialValue: 0,
                    customClass: "enabled_new",
                    disabled: this.readOnly,
                    modelOptions: { setFlags: { triggerChange: true } },
                    change: function (ev, changeObj) {
                        if (changeObj.value == 2) {
                            $(this).gform().findFields("sablona").gformrow().show();
                            $(this).gform().findFields("sablona_txt").gformrow().hide();
                            $(this).gform().findFields("sablona_frm").gformrow().hide();
                        } else if (changeObj.value == 1) {
                            $(this).gform().findFields("sablona").gformrow().hide();
                            $(this).gform().findFields("sablona_txt").gformrow().hide();
                            $(this).gform().findFields("sablona_frm").gformrow().show();
                        } else {
                            $(this).gform().findFields("sablona").gformrow().hide();
                            $(this).gform().findFields("sablona_txt").gformrow().show();
                            $(this).gform().findFields("sablona_frm").gformrow().hide();
                        }
                    },
                    radios: [
                        { value: 0, label: "jres:25800082" }, //RC 25800082 : Word
                        { value: 2, label: "jres:25800083" }, //RC 25800083 : Gordic generátor
                        { value: 1, label: "jres:25800088", disabled: true }] //RC 25800088 : Gordic generátor (filtr FRM)
                }).addRow("jres:25800084", true) //RC 25800084 : Šablona
                .addField("gselectbox", Gordic.Prefabs.Select.prrGinsfrm(), {
                    name: "sablona", model: "model.sablona = value.ixs_frm", customClass: "enabled_new", disabled: this.readOnly, serverFilters: { aktivita: 100, filtr_frm: "" }
                })
                .addRow("jres:25800085", true) //RC 25800085 : Název na HDD
                .addField("gstringbox", { name: "sablona_txt", customClass: "enabled_new", disabled: this.readOnly })
                .addRow("jres:25800087", true) //RC 25800087 : Šablona (filtr FRM)
                .addField("gstringbox", { name: "sablona_frm", customClass: "enabled_new", disabled: this.readOnly })
                .addRow()
                .addField("gcheck", "w-5 w-L-4", { label: "jres:25800090", name: "pdf", customClass: "enabled", disabled: this.readOnly })//RC 25800090 : Převádět do PDF
                .addField("gcheck", "w-7 w-L-8", { label: "jres:25800091", name: "podpis", customClass: "enabled", disabled: this.readOnly })//RC 25800091 : Podepsat
                .addRow("jres:25800086", true) //RC 25800086 : Dokument (název)
                .addField("gstringbox", { name: "nazev", customClass: "enabled", disabled: this.readOnly, rows: 5 })
                .addRow("jres:25800089", true) //RC 25800089 : Název SSL
                .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), { serverFilters: { typ_ag: 410 }, name: "ixs_typ", customClass: "enabled", model: "model.ixs_typ=value.ixs_typ, model.ktg_typ=value.ktg_typ", disabled: this.readOnly, dropdown: true })
                .addRow("jres:25800025") //RC 25800025 : Aktivita
                .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly, dropdown: true })
                .addRow()
                .addField("gcheck", "w-5 w-L-4", { label: "jres:25800092", name: "obecny", customClass: "enabled", disabled: this.readOnly })//RC 25800092 : Pro všechny události
                .addField("gcheck", "w-7 w-L-8", { label: "jres:25800093", name: "vse_den", customClass: "enabled", disabled: this.readOnly });//RC 25800093 : Pro všechny deníky
            return form;
        }
    }
}