namespace Gordic.Leg.WebClient {
    var gcontent = Decorators.gcontent

    @gcontent
    export class GAdministraceLeg extends GContentBase {  
        model: any;

        subTask: subTask;
        Aktivita: number;

        private gridKnihy: JQuery;
        private gridFunkce: JQuery;
        private filterForm: JQuery<HTMLElement>;

        private subtask: JQuery<HTMLElement>;
        private grid: JQuery;

        onContentReady() { 
            var that = this;
            // ulozeni typu subtasku
            that.subTask = that.model.sub_task;
            this.createsubTask();
            this.createMenuBar();
            this.createFilterAndGrid();
            
            that.findFields().gfield("model", "apply", that.model, { initialValues: true }) // projde všechna pole a naplní je z modelu
            // typ zobrazeneho gridu
            if (that.model.sub_task == subTask.Knihy) {
                that.grid.ggrid("setData", that.model.list_kniha);
            }
            else {
                that.grid.ggrid("setData", that.model.list_funkce);
            }
            
        }

        // hlavni akce
        private createMenuBar() {
            var that = this;

            var params: MenuParams[] = [];

            params.push({
                favorite: true,
                action: this.actions.add(new GAction({
                    name: "actNovy",
                    caption: "jres:25500222", //RC 25500222 : Nový záznam
                    icon: "fa-plus",
                    run: () => {
                        that.novyZaznam();
                    }
                }))
            })

            params.push({
                favorite: true,
                action: this.actions.add(new GAction({
                    name: "actDetail",
                    caption: "jres:25500223", //RC 25500223 : Detail
                    icon: "gi-detail",
                    run: () => {
                        that.openDetail();
                    }
                }))
            })

            params.push({
                favorite: true,
                action: this.actions.add(new GAction({
                    name: "actReload",
                    caption: "jres:25500224", //RC 25500224 : Občerstvit
                    icon: "gi-refresh",
                    run: () => {
                        that.loadData();
                    }
                }))
            })

            this.menuBar(params);
            that.actions.actDetail!.enabled(false); // zneaktivneni akce detail
        }

        // zalozeni subTasku
        private createsubTask() {
            var that = this;
            var params: MenuParams[] = [];

            var knihy = {
                action: new GAction({
                    id: "knihy",
                    name: "actKnihy",
                    caption: "jres:25500241",  //RC 25500241 : Knihy vidimace a legalizace
                    run: () => {
                        this.subTask = subTask.Knihy;
                        this.model.sub_task = subTask.Knihy;
                        //this.globalSettings?.set("Global.Leg.Administrace.LastUsedsubTask", subTask.Knihy);
                        this.loadData();
                        this.reload();
                    }
                }),
            };
            params.push(knihy);

            var Funkce = {
                action: new GAction({
                    id: "Funkce",
                    name: "actFunkce",
                    caption: "jres:25500262",  //RC 25500262 : Vazba knihy na funkci
                    run: () => {
                        this.subTask = subTask.Funkce;
                        this.model.sub_task = subTask.Funkce;
                        //this.globalSettings?.set("Global.Leg.Administrace.LastUsedsubTask", subTask.Funkce);
                        this.loadData();
                        this.reload();
                    }
                })
            };
            params.push(Funkce);

            this.subtask = $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: params
                })
                //.gsubTasks("setActive", this.subTask - 1); // pro podtrzeni aktivniho subTasku - zakomentovat pro pouziti bez seznamu
                //.gsubTasks("setActive", SpisysubTask.Neurceno - 1, true); // pro zneativneni subTasku pri pouziti moznosti bez seznamu - zustane sedive podtrzeni
        }

        // vytvoreni filtru a gridu
        private createFilterAndGrid() {
            var that = this;

            var filterForm = new Gordic.Forms.Form()
                .addSection()
                .addRow("jres:25500225") //RC 25500225 : Aktivita
                .addField("gselectbox", "w-8", Gordic.Prefabs.Select.gincakt(), {
                    name: "aktivita", model: "model.aktivita=value.aktivita",
                    dropdown: true,
                    change: function (ev, retVal) {
                        that.model.aktivita = retVal.value?.aktivita;
                        that.loadData();
                    }
                })
            

            this.filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    filterViewMode: FilterViewMode.Simple,
                    forms: [filterForm],                                                   //predani definic formularu
                    favorites: ["aktivita"],                                                  //defaulty oblibenych polozek
                    // 01.03.2021 - TFeik
                    // Nahrazení obsolete parametrů.
                    poVyhledaniZobrazit: 'OblibenePodminky',
                    //poVyhledaniZavritPanelPodminek: false, 
                    apply: function (ev, obj) {                    //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        console.log("obj.filter: " + JSON.stringify(obj.filter));
                        that.loadData();                                         //pristup k datum z gfilterpanelu (DTO filtru) // obj.filter
                    }
                });

            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    selection: function (ev, gridSelection) {
                        // zneaktivneni akci pri prazdnem gridu
                        if (gridSelection.count == 0) {
                            that.actions.actDetail!.enabled(false);
                        }
                        // aktivace akci
                        else {
                            that.actions.actDetail!.enabled(true);
                        }
                    },
                    columnMode: "full",
                    defaultAction: that.actions.actDetail,
                    columns: that.createGridFormat(),
                    searchColumns: ["ixp_spis"],
                    contextMenu: this.actions.createBar(this.actions.getActions()),
                });

        }

        // nahrani dat
        public loadData(): JQueryPromise<any> { //filter?: Object
            var that = this;
            var prom = $.Deferred();

            that.call("LoadData", { model: that.model }) // obj.filter
                .done(function (ret) {
                    
                    //that.subTask = that.model.sub_task;
                    if (that.subTask == subTask.Knihy) {
                        that.grid.ggrid("setData", ret.list_kniha);
                        prom.resolve();
                    }
                    else if (that.subTask == subTask.Funkce) {
                        that.grid.ggrid("setData", ret.list_funkce);
                        prom.resolve();
                    }
                    else {
                        prom.reject();
                    }
                });

            return prom;
        }

        // grid
        public createGridFormat(): Gordic.Data.GridFormat {
            var that = this;
            var grid;
            
            // grid kniha
            if (that.subTask == subTask.Knihy) {
                grid = new Gordic.Data.GridFormat<Gordic.Mtk.Interface.GRobsdmdDto>()
                grid.addTextColumn({ name: "nazev", caption: "jres:25500220", width: 400, fixedWidth: false }) //RC 25500220 : Označení deníku
                    .addNumberColumn({ name: "rok", caption: "jres:25500218", width: 200, fixedWidth: false }) //RC 25500218 : Ročník
                    .addTextColumn({ name: "aktivita_txt", caption: "jres:25500219", width: 200, fixedWidth: false }) //RC 25500219 : Aktivita

            }

            // grid funkce
            if (that.subTask == subTask.Funkce) {
                grid = new Gordic.Data.GridFormat<Gordic.Mtk.Interface.GRobvrfuDto>()
                grid.addTextColumn({ name: "nazev_ref", caption: "jres:25500216", width: 400, fixedWidth: false }) //RC 25500216 : Funkční místo
                    .addTextColumn({ name: "robsdmd_nazev", caption: "jres:25500217", width: 400, fixedWidth: false }) //RC 25500217 : Název knihy
                    .addNumberColumn({ name: "robsdmd_rok", caption: "jres:25500218", width: 100, fixedWidth: false }) //RC 25500218 : Ročník
                    .addTextColumn({ name: "aktivita_txt", caption: "jres:25500219", width: 100, fixedWidth: false }) //RC 25500219 : Aktivita
            }

            return grid;
        }

        // detail
        openDetail() {
            var that = this;
            var width = 1100;
            var height = 800;
            var modal = false;

            // nelezeni oznaceneho
            var ixpDmd;
            var ixsFun;
            var selection; //: Gordic.Leg.WebClient.GSeznamLegDto[];
            selection = that.grid.ggrid("getSelection");
            
            if (that.subTask == subTask.Knihy) {
                var gridRcK: Gordic.Components.GridRC<Gordic.Mtk.Interface.GRobsdmdDto> | undefined = undefined;
                gridRcK = new Gordic.Components.GridRC(that.grid);

                if (selection.length == 1) {
                    var row = selection[0];
                    console.log("Vybrane radky", selection[0].ixp_dmd);
                    ixpDmd = row.ixp_dmd;
                }

                //that.call("GDetailAdmKnihy", { ixpDmd: ixpDmd, gridRc: gridRcK })
                that.navigate(["Gordic.Leg.WebClient.GDetailAdmKnihy", { GridRc: gridRcK }], {
                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                    ixpDmd: ixpDmd,
                    Id: "detail_administrace_knihy"
                }, { width: width, height: height, modal: modal })
                    .on("close", (ev, r) => {
                        that.loadData();
                    })
            }
            else {
                var gridRcF: Gordic.Components.GridRC<Gordic.Mtk.Interface.GRobvrfuDto> | undefined = undefined;
                gridRcF = new Gordic.Components.GridRC(that.grid);

                if (selection.length == 1) {
                    var row = selection[0];
                    console.log("Vybrane radky", selection[0].ixp_dmd);
                    ixpDmd = row.ixp_dmd;
                    ixsFun = row.ixs_fun;
                }

                //that.call("GDetailAdmFunkce", { ixpDmd: ixpDmd, gridRc: gridRcK })
                that.navigate(["Gordic.Leg.WebClient.GDetailAdmFunkce", { GridRc: gridRcF }], {
                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                    ixpDmd: ixpDmd,
                    ixsFun: ixsFun,
                    Id: "detail_administrace_funkce"
                }, { width: width, height: height, modal: modal })
                    .on("close", (ev, r) => {
                        that.loadData();
                    })
            }
        }

        // novy zaznam
        novyZaznam() {
            var that = this;
            var width = 1100;
            var height = 800;
            var modal = false;

            if (that.subTask == subTask.Knihy) {

                //that.call("GDetailAdmKnihy", { ixpDmd: ixpDmd, gridRc: gridRcK })
                that.navigate(["Gordic.Leg.WebClient.GDetailAdmKnihy", { }], {
                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.New,
                    Id: "new_administrace_knihy"
                }, { width: width, height: height, modal: modal })
                    .on("close", (ev, r) => {
                        that.loadData();
                    })
            }
            else {

                //that.call("GDetailAdmFunkce", { ixpDmd: ixpDmd, gridRc: gridRcK })
                that.navigate(["Gordic.Leg.WebClient.GDetailAdmFunkce", {  }], {
                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.New,
                    Id: "new_administrace_knihy"
                }, { width: width, height: height, modal: modal })
                    .on("close", (ev, r) => {
                        that.loadData();
                    })
            }
        }

        // znovunacteni
        private reload() {
            var that = this;

            this.removeAll();
            this.menuBar(null);
            //this.createActionsAndMenuBar();
            this.createMenuBar();
            this.createFilterAndGrid();
            that.findFields().gfield("model", "apply", that.model, { initialValues: true }) // projde všechna pole a naplní je z modelu
        }

        // vycisteni gridu & filtru
        private removeAll() {
            if (this.grid != null) {
                this.grid.remove();
            }

            if (this.filterForm != null) {
                this.filterForm.remove();
            }

            this.actions = new GActionList([]);
        }
     
    }

    // pro vyber subTasku
    enum subTask {
        Knihy,
        Funkce
    }
}