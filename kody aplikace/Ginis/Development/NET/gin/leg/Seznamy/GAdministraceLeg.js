"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Leg;
    (function (Leg) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAdministraceLeg = class GAdministraceLeg extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    // ulozeni typu subtasku
                    that.subTask = that.model.sub_task;
                    this.createsubTask();
                    this.createMenuBar();
                    this.createFilterAndGrid();
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
                    // typ zobrazeneho gridu
                    if (that.model.sub_task == subTask.Knihy) {
                        that.grid.ggrid("setData", that.model.list_kniha);
                    }
                    else {
                        that.grid.ggrid("setData", that.model.list_funkce);
                    }
                }
                // hlavni akce
                createMenuBar() {
                    var that = this;
                    var params = [];
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
                    });
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
                    });
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
                    });
                    this.menuBar(params);
                    that.actions.actDetail.enabled(false); // zneaktivneni akce detail
                }
                // zalozeni subTasku
                createsubTask() {
                    var that = this;
                    var params = [];
                    var knihy = {
                        action: new GAction({
                            id: "knihy",
                            name: "actKnihy",
                            caption: "jres:25500241", //RC 25500241 : Knihy vidimace a legalizace
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
                            caption: "jres:25500262", //RC 25500262 : Vazba knihy na funkci
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
                    });
                    //.gsubTasks("setActive", this.subTask - 1); // pro podtrzeni aktivniho subTasku - zakomentovat pro pouziti bez seznamu
                    //.gsubTasks("setActive", SpisysubTask.Neurceno - 1, true); // pro zneativneni subTasku pri pouziti moznosti bez seznamu - zustane sedive podtrzeni
                }
                // vytvoreni filtru a gridu
                createFilterAndGrid() {
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
                    });
                    this.filterForm = $("<div>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        filterViewMode: FilterViewMode.Simple,
                        forms: [filterForm], //predani definic formularu
                        favorites: ["aktivita"], //defaulty oblibenych polozek
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        poVyhledaniZobrazit: 'OblibenePodminky',
                        //poVyhledaniZavritPanelPodminek: false, 
                        apply: function (ev, obj) {
                            console.log("obj.filter: " + JSON.stringify(obj.filter));
                            that.loadData(); //pristup k datum z gfilterpanelu (DTO filtru) // obj.filter
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
                                that.actions.actDetail.enabled(false);
                            }
                            // aktivace akci
                            else {
                                that.actions.actDetail.enabled(true);
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
                loadData() {
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
                createGridFormat() {
                    var that = this;
                    var grid;
                    // grid kniha
                    if (that.subTask == subTask.Knihy) {
                        grid = new Gordic.Data.GridFormat();
                        grid.addTextColumn({ name: "nazev", caption: "jres:25500220", width: 400, fixedWidth: false }) //RC 25500220 : Označení deníku
                            .addNumberColumn({ name: "rok", caption: "jres:25500218", width: 200, fixedWidth: false }) //RC 25500218 : Ročník
                            .addTextColumn({ name: "aktivita_txt", caption: "jres:25500219", width: 200, fixedWidth: false }); //RC 25500219 : Aktivita
                    }
                    // grid funkce
                    if (that.subTask == subTask.Funkce) {
                        grid = new Gordic.Data.GridFormat();
                        grid.addTextColumn({ name: "nazev_ref", caption: "jres:25500216", width: 400, fixedWidth: false }) //RC 25500216 : Funkční místo
                            .addTextColumn({ name: "robsdmd_nazev", caption: "jres:25500217", width: 400, fixedWidth: false }) //RC 25500217 : Název knihy
                            .addNumberColumn({ name: "robsdmd_rok", caption: "jres:25500218", width: 100, fixedWidth: false }) //RC 25500218 : Ročník
                            .addTextColumn({ name: "aktivita_txt", caption: "jres:25500219", width: 100, fixedWidth: false }); //RC 25500219 : Aktivita
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
                        var gridRcK = undefined;
                        gridRcK = new Gordic.Components.GridRC(that.grid);
                        if (selection.length == 1) {
                            var row = selection[0];
                            console.log("Vybrane radky", selection[0].ixp_dmd);
                            ixpDmd = row.ixp_dmd;
                        }
                        //that.call("GDetailAdmKnihy", { ixpDmd: ixpDmd, gridRc: gridRcK })
                        that.navigate(["Gordic.Leg.WebClient.GDetailAdmKnihy", { GridRc: gridRcK }], {
                            RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */,
                            ixpDmd: ixpDmd,
                            Id: "detail_administrace_knihy"
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, r) => {
                            that.loadData();
                        });
                    }
                    else {
                        var gridRcF = undefined;
                        gridRcF = new Gordic.Components.GridRC(that.grid);
                        if (selection.length == 1) {
                            var row = selection[0];
                            console.log("Vybrane radky", selection[0].ixp_dmd);
                            ixpDmd = row.ixp_dmd;
                            ixsFun = row.ixs_fun;
                        }
                        //that.call("GDetailAdmFunkce", { ixpDmd: ixpDmd, gridRc: gridRcK })
                        that.navigate(["Gordic.Leg.WebClient.GDetailAdmFunkce", { GridRc: gridRcF }], {
                            RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */,
                            ixpDmd: ixpDmd,
                            ixsFun: ixsFun,
                            Id: "detail_administrace_funkce"
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, r) => {
                            that.loadData();
                        });
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
                        that.navigate(["Gordic.Leg.WebClient.GDetailAdmKnihy", {}], {
                            RezimDetailu: 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */,
                            Id: "new_administrace_knihy"
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, r) => {
                            that.loadData();
                        });
                    }
                    else {
                        //that.call("GDetailAdmFunkce", { ixpDmd: ixpDmd, gridRc: gridRcK })
                        that.navigate(["Gordic.Leg.WebClient.GDetailAdmFunkce", {}], {
                            RezimDetailu: 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */,
                            Id: "new_administrace_knihy"
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, r) => {
                            that.loadData();
                        });
                    }
                }
                // znovunacteni
                reload() {
                    var that = this;
                    this.removeAll();
                    this.menuBar(null);
                    //this.createActionsAndMenuBar();
                    this.createMenuBar();
                    this.createFilterAndGrid();
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
                }
                // vycisteni gridu & filtru
                removeAll() {
                    if (this.grid != null) {
                        this.grid.remove();
                    }
                    if (this.filterForm != null) {
                        this.filterForm.remove();
                    }
                    this.actions = new GActionList([]);
                }
            };
            GAdministraceLeg = __decorate([
                gcontent
            ], GAdministraceLeg);
            WebClient.GAdministraceLeg = GAdministraceLeg;
            // pro vyber subTasku
            let subTask;
            (function (subTask) {
                subTask[subTask["Knihy"] = 0] = "Knihy";
                subTask[subTask["Funkce"] = 1] = "Funkce";
            })(subTask || (subTask = {}));
        })(WebClient = Leg.WebClient || (Leg.WebClient = {}));
    })(Leg = Gordic.Leg || (Gordic.Leg = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluaXN0cmFjZUxlZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdBZG1pbmlzdHJhY2VMZWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW9XZjtBQXBXRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvV25CO0lBcFdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvVzdCO1FBcFdvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQTtZQUdsQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFhOUMsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLHdCQUF3QjtvQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO29CQUUzQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsMkNBQTJDO29CQUMzSCx3QkFBd0I7b0JBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEQsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFB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QUUsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDN0IsQ0FBQztvQkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2FBRUosQ0FBQTtZQXpWWSxnQkFBZ0I7Z0JBRDVCLFFBQVE7ZUFDSSxnQkFBZ0IsQ0F5VjVCO1lBelZZLDBCQUFnQixtQkF5VjVCLENBQUE7WUFFRCxxQkFBcUI7WUFDckIsSUFBSyxPQUdKO1lBSEQsV0FBSyxPQUFPO2dCQUNSLHVDQUFLLENBQUE7Z0JBQ0wseUNBQU0sQ0FBQTtZQUNWLENBQUMsRUFISSxPQUFPLEtBQVAsT0FBTyxRQUdYO1FBQ0wsQ0FBQyxFQXBXb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb1c3QjtJQUFELENBQUMsRUFwV2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9XbkI7QUFBRCxDQUFDLEVBcFdTLE1BQU0sS0FBTixNQUFNLFFBb1dmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5MZWcuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnRcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5pc3RyYWNlTGVnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHsgIFxyXG4gICAgICAgIG1vZGVsOiBhbnk7XHJcblxyXG4gICAgICAgIHN1YlRhc2s6IHN1YlRhc2s7XHJcbiAgICAgICAgQWt0aXZpdGE6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkS25paHk6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIGdyaWRGdW5rY2U6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIGZpbHRlckZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3VidGFzazogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7IFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHVsb3plbmkgdHlwdSBzdWJ0YXNrdVxyXG4gICAgICAgICAgICB0aGF0LnN1YlRhc2sgPSB0aGF0Lm1vZGVsLnN1Yl90YXNrO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZXN1YlRhc2soKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyQW5kR3JpZCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSkgLy8gcHJvamRlIHbFoWVjaG5hIHBvbGUgYSBuYXBsbsOtIGplIHogbW9kZWx1XHJcbiAgICAgICAgICAgIC8vIHR5cCB6b2JyYXplbmVobyBncmlkdVxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5zdWJfdGFzayA9PSBzdWJUYXNrLktuaWh5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQubW9kZWwubGlzdF9rbmloYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQubW9kZWwubGlzdF9mdW5rY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGxhdm5pIGFrY2VcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Tm92eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDIyMlwiLCAvL1JDIDI1NTAwMjIyIDogTm92w70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vdnlaYXpuYW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDIyM1wiLCAvL1JDIDI1NTAwMjIzIDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVuRGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBwYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWxvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAyMjRcIiwgLy9SQyAyNTUwMDIyNCA6IE9ixI1lcnN0dml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihwYXJhbXMpO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKGZhbHNlKTsgLy8gem5lYWt0aXZuZW5pIGFrY2UgZGV0YWlsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB6YWxvemVuaSBzdWJUYXNrdVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlc3ViVGFzaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrbmloeSA9IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImtuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RLbmloeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDI0MVwiLCAgLy9SQyAyNTUwMDI0MSA6IEtuaWh5IHZpZGltYWNlIGEgbGVnYWxpemFjZVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YlRhc2sgPSBzdWJUYXNrLktuaWh5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnN1Yl90YXNrID0gc3ViVGFzay5LbmloeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmdsb2JhbFNldHRpbmdzPy5zZXQoXCJHbG9iYWwuTGVnLkFkbWluaXN0cmFjZS5MYXN0VXNlZHN1YlRhc2tcIiwgc3ViVGFzay5LbmloeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcGFyYW1zLnB1c2goa25paHkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIEZ1bmtjZSA9IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIkZ1bmtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RnVua2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjYyXCIsICAvL1JDIDI1NTAwMjYyIDogVmF6YmEga25paHkgbmEgZnVua2NpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViVGFzayA9IHN1YlRhc2suRnVua2NlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnN1Yl90YXNrID0gc3ViVGFzay5GdW5rY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5nbG9iYWxTZXR0aW5ncz8uc2V0KFwiR2xvYmFsLkxlZy5BZG1pbmlzdHJhY2UuTGFzdFVzZWRzdWJUYXNrXCIsIHN1YlRhc2suRnVua2NlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKEZ1bmtjZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1YnRhc2sgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdzdWJ0YXNrcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5nc3ViVGFza3MoXCJzZXRBY3RpdmVcIiwgdGhpcy5zdWJUYXNrIC0gMSk7IC8vIHBybyBwb2R0cnplbmkgYWt0aXZuaWhvIHN1YlRhc2t1IC0gemFrb21lbnRvdmF0IHBybyBwb3V6aXRpIGJleiBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAvLy5nc3ViVGFza3MoXCJzZXRBY3RpdmVcIiwgU3Bpc3lzdWJUYXNrLk5ldXJjZW5vIC0gMSwgdHJ1ZSk7IC8vIHBybyB6bmVhdGl2bmVuaSBzdWJUYXNrdSBwcmkgcG91eml0aSBtb3pub3N0aSBiZXogc2V6bmFtdSAtIHp1c3RhbmUgc2VkaXZlIHBvZHRyemVuaVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdnl0dm9yZW5pIGZpbHRydSBhIGdyaWR1XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJBbmRHcmlkKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDIyNVwiKSAvL1JDIDI1NTAwMjI1IDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LThcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIiwgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGE9dmFsdWUuYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuYWt0aXZpdGEgPSByZXRWYWwudmFsdWU/LmFrdGl2aXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZmlsdGVyRm9ybV0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmVkYW5pIGRlZmluaWMgZm9ybXVsYXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJha3Rpdml0YVwiXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdHkgb2JsaWJlbnljaCBwb2xvemVrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6ICdPYmxpYmVuZVBvZG1pbmt5JyxcclxuICAgICAgICAgICAgICAgICAgICAvL3BvVnlobGVkYW5pWmF2cml0UGFuZWxQb2RtaW5lazogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXYsIG9iaikgeyAgICAgICAgICAgICAgICAgICAgLy9mdW5rY2Ugdm9sYW5hIHYgbW9tZW50ZSwga2R5IHV6aXZhdGVsIGtsZXBuZSBuYSB0bGFjLiBmaWx0cm92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvYmouZmlsdGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KG9iai5maWx0ZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmlzdHVwIGsgZGF0dW0geiBnZmlsdGVycGFuZWx1IChEVE8gZmlsdHJ1KSAvLyBvYmouZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nanMtbXVqR3JpZCc+XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIFwiICsgdGhhdC4kZmlsdGVyRm9ybS5oZWlnaHQoKSArIFwicHgpXCIpIC8vIG5hc3RhdmVuw60gdsO9xaFreSBlbGVtZW50dSwgbmEga3RlcsO9IGJ1ZGUgcMWZaWTDoW4gZ3JpZC5cclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgZ3JpZFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6bmVha3Rpdm5lbmkgYWtjaSBwcmkgcHJhemRuZW0gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRTZWxlY3Rpb24uY291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0aXZhY2UgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwhLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhwX3NwaXNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIodGhpcy5hY3Rpb25zLmdldEFjdGlvbnMoKSksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBuYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YSgpOiBKUXVlcnlQcm9taXNlPGFueT4geyAvL2ZpbHRlcj86IE9iamVjdFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jYWxsKFwiTG9hZERhdGFcIiwgeyBtb2RlbDogdGhhdC5tb2RlbCB9KSAvLyBvYmouZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnN1YlRhc2sgPSB0aGF0Lm1vZGVsLnN1Yl90YXNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnN1YlRhc2sgPT0gc3ViVGFzay5LbmloeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHJldC5saXN0X2tuaWhhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuc3ViVGFzayA9PSBzdWJUYXNrLkZ1bmtjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHJldC5saXN0X2Z1bmtjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb20ucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ3JpZFxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBncmlkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ3JpZCBrbmloYVxyXG4gICAgICAgICAgICBpZiAodGhhdC5zdWJUYXNrID09IHN1YlRhc2suS25paHkpIHtcclxuICAgICAgICAgICAgICAgIGdyaWQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuTXRrLkludGVyZmFjZS5HUm9ic2RtZER0bz4oKVxyXG4gICAgICAgICAgICAgICAgZ3JpZC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAyMjBcIiwgd2lkdGg6IDQwMCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDIyMCA6IE96bmHEjWVuw60gZGVuw61rdVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJva1wiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAyMThcIiwgd2lkdGg6IDIwMCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDIxOCA6IFJvxI1uw61rXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFrdGl2aXRhX3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAyMTlcIiwgd2lkdGg6IDIwMCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDIxOSA6IEFrdGl2aXRhXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBncmlkIGZ1bmtjZVxyXG4gICAgICAgICAgICBpZiAodGhhdC5zdWJUYXNrID09IHN1YlRhc2suRnVua2NlKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLk10ay5JbnRlcmZhY2UuR1JvYnZyZnVEdG8+KClcclxuICAgICAgICAgICAgICAgIGdyaWQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZfcmVmXCIsIGNhcHRpb246IFwianJlczoyNTUwMDIxNlwiLCB3aWR0aDogNDAwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KSAvL1JDIDI1NTAwMjE2IDogRnVua8SNbsOtIG3DrXN0b1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJyb2JzZG1kX25hemV2XCIsIGNhcHRpb246IFwianJlczoyNTUwMDIxN1wiLCB3aWR0aDogNDAwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KSAvL1JDIDI1NTAwMjE3IDogTsOhemV2IGtuaWh5XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicm9ic2RtZF9yb2tcIiwgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjE4XCIsIHdpZHRoOiAxMDAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjU1MDAyMTggOiBSb8SNbsOta1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJha3Rpdml0YV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjE5XCIsIHdpZHRoOiAxMDAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjU1MDAyMTkgOiBBa3Rpdml0YVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgIG9wZW5EZXRhaWwoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gMTEwMDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IDgwMDtcclxuICAgICAgICAgICAgdmFyIG1vZGFsID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBuZWxlemVuaSBvem5hY2VuZWhvXHJcbiAgICAgICAgICAgIHZhciBpeHBEbWQ7XHJcbiAgICAgICAgICAgIHZhciBpeHNGdW47XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb247IC8vOiBHb3JkaWMuTGVnLldlYkNsaWVudC5HU2V6bmFtTGVnRHRvW107XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnN1YlRhc2sgPT0gc3ViVGFzay5LbmloeSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyaWRSY0s6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxHb3JkaWMuTXRrLkludGVyZmFjZS5HUm9ic2RtZER0bz4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBncmlkUmNLID0gbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGF0LmdyaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVnlicmFuZSByYWRreVwiLCBzZWxlY3Rpb25bMF0uaXhwX2RtZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwRG1kID0gcm93Lml4cF9kbWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGF0LmNhbGwoXCJHRGV0YWlsQWRtS25paHlcIiwgeyBpeHBEbWQ6IGl4cERtZCwgZ3JpZFJjOiBncmlkUmNLIH0pXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5MZWcuV2ViQ2xpZW50LkdEZXRhaWxBZG1LbmloeVwiLCB7IEdyaWRSYzogZ3JpZFJjSyB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwRG1kOiBpeHBEbWQsXHJcbiAgICAgICAgICAgICAgICAgICAgSWQ6IFwiZGV0YWlsX2FkbWluaXN0cmFjZV9rbmloeVwiXHJcbiAgICAgICAgICAgICAgICB9LCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIG1vZGFsOiBtb2RhbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBncmlkUmNGOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8R29yZGljLk10ay5JbnRlcmZhY2UuR1JvYnZyZnVEdG8+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJjRiA9IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkModGhhdC5ncmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbmUgcmFka3lcIiwgc2VsZWN0aW9uWzBdLml4cF9kbWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cERtZCA9IHJvdy5peHBfZG1kO1xyXG4gICAgICAgICAgICAgICAgICAgIGl4c0Z1biA9IHJvdy5peHNfZnVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhhdC5jYWxsKFwiR0RldGFpbEFkbUZ1bmtjZVwiLCB7IGl4cERtZDogaXhwRG1kLCBncmlkUmM6IGdyaWRSY0sgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoW1wiR29yZGljLkxlZy5XZWJDbGllbnQuR0RldGFpbEFkbUZ1bmtjZVwiLCB7IEdyaWRSYzogZ3JpZFJjRiB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwRG1kOiBpeHBEbWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzRnVuOiBpeHNGdW4sXHJcbiAgICAgICAgICAgICAgICAgICAgSWQ6IFwiZGV0YWlsX2FkbWluaXN0cmFjZV9mdW5rY2VcIlxyXG4gICAgICAgICAgICAgICAgfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vdnkgemF6bmFtXHJcbiAgICAgICAgbm92eVphem5hbSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSAxMTAwO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgICAgICB2YXIgbW9kYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnN1YlRhc2sgPT0gc3ViVGFzay5LbmloeSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhhdC5jYWxsKFwiR0RldGFpbEFkbUtuaWh5XCIsIHsgaXhwRG1kOiBpeHBEbWQsIGdyaWRSYzogZ3JpZFJjSyB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuTGVnLldlYkNsaWVudC5HRGV0YWlsQWRtS25paHlcIiwgeyB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldyxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJuZXdfYWRtaW5pc3RyYWNlX2tuaWh5XCJcclxuICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IG1vZGFsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhhdC5jYWxsKFwiR0RldGFpbEFkbUZ1bmtjZVwiLCB7IGl4cERtZDogaXhwRG1kLCBncmlkUmM6IGdyaWRSY0sgfSlcclxuICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoW1wiR29yZGljLkxlZy5XZWJDbGllbnQuR0RldGFpbEFkbUZ1bmtjZVwiLCB7ICB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldyxcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJuZXdfYWRtaW5pc3RyYWNlX2tuaWh5XCJcclxuICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IG1vZGFsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB6bm92dW5hY3RlbmlcclxuICAgICAgICBwcml2YXRlIHJlbG9hZCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKG51bGwpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY3JlYXRlQWN0aW9uc0FuZE1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyQW5kR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KSAvLyBwcm9qZGUgdsWhZWNobmEgcG9sZSBhIG5hcGxuw60gamUgeiBtb2RlbHVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHZ5Y2lzdGVuaSBncmlkdSAmIGZpbHRydVxyXG4gICAgICAgIHByaXZhdGUgcmVtb3ZlQWxsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ncmlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IG5ldyBHQWN0aW9uTGlzdChbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHBybyB2eWJlciBzdWJUYXNrdVxyXG4gICAgZW51bSBzdWJUYXNrIHtcclxuICAgICAgICBLbmloeSxcclxuICAgICAgICBGdW5rY2VcclxuICAgIH1cclxufSJdfQ==