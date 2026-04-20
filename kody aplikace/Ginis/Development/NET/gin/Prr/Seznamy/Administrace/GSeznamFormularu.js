"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Prr;
    (function (Prr) {
        var UIWebClient;
        (function (UIWebClient) {
            var gcontent = Decorators.gcontent;
            let GSeznamFormularu = class GSeznamFormularu extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.actions.addRange({
                        actNovy: {
                            caption: "jres:25800014", //RC 25800014 : Nový
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                that.openDetail(2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */);
                            }
                        },
                        actDetail: {
                            caption: "jres:25800013", //RC 25800013 : Detail
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.openDetail(1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */);
                            }
                        },
                        actOdstranit: {
                            caption: "jres:25800011", //RC 25800011 : Odstranit
                            icon: "fa-times-circle",
                            run: function (ev, ctx) {
                                that.odstranit();
                            }
                        },
                        actObnovit: {
                            caption: "jres:25800012", //RC 25800012 : Obnovit
                            icon: "fa-retweet",
                            run: function (ev, ctx) {
                                that.obnovit();
                            }
                        }
                    });
                    this.menuBar([
                        { action: that.actions.actNovy, favorite: true }, // Nový
                        { action: that.actions.actDetail, favorite: true }, // Detail
                        { action: that.actions.actOdstranit, favorite: true }, // Odstranit
                        { action: that.actions.actObnovit, favorite: true }, // Obnovit               
                    ]);
                    console.log("Začátek stavby filtru");
                    var filterF = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
                        .addSection()
                        .addRow("Aktivita").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        name: "aktivita",
                        model: "model.aktivita=value.aktivita",
                        initialValue: { aktivita: 100 },
                        dropdown: true
                    });
                    this.filterForm = $("<div>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        forms: [filterF], //predani definic formularu
                        favorites: ["aktivita"], //defaulty oblibenych polozek
                        //favoriteLayoutDescriptor: "L4M3S1",                                      //uprava layoutDescriptoru                                    
                        //filterStorageService: new Gordic.Gin.FilterStorageService.Store(),     // prirazeni custom storage sluzby pro praci s ulozenymi filtry
                        //tema: "prr_ptm_pre",
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        idSimpleMode: "seznamFormularu",
                        saveOptionsForm: "all",
                        validators: this.filterValidators,
                        apply: function (ev, obj) {
                            console.log("obj.filter: " + JSON.stringify(obj.filter));
                            that.loadData(obj.filter); //pristup k datum z gfilterpanelu (DTO filtru)
                        }
                    });
                    //.on("fieldchange", function (ev, changeObj) {
                    //    console.log("Změna filtru");
                    //    that.loadData(that.filterForm.gfilterpanel("getConfirmedData")!);
                    //    //that.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                    //});
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        defaultAction: that.actions.actDetail,
                        columns: this.createGridFormat(),
                        searchColumns: ["sablona", "ginsfrm_nazev", "nazev", "ixs_typ", "ktg_typ"],
                        contextMenu: this.actions.createBar(["actNovy", "actDetail", "actOdstranit", "actObnovit"]),
                        selection: function (ev, info) {
                            var selection = info.getSelection()[0];
                            that.actions.actOdstranit.visible(info.count == 0 || selection.aktivita == 100);
                            that.actions.actObnovit.visible(info.count != 0 && selection.aktivita != 100);
                            that.actions.actOdstranit.enabled(info.count != 0);
                            that.actions.actObnovit.enabled(info.count != 0);
                            that.actions.actDetail.enabled(info.count != 0);
                        },
                        rowsEnabled: function (metarow) {
                            return metarow.data.aktivita == 100;
                        }
                    });
                    this.dataView = new Gordic.Data.View(undefined, { key: "sablona" });
                    //načtení
                    this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                }
                openDetail(rezim) {
                    var that = this;
                    var sablona = undefined;
                    var width = 800;
                    var height = 500;
                    var modal = true;
                    var gridRc = undefined;
                    if (rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */) {
                        var selection;
                        selection = that.grid.ggrid("getSelection");
                        if (selection.length == 1) {
                            var row = selection[0];
                            console.log("Vybrane radky", selection[0].sablona);
                            sablona = row.sablona;
                            gridRc = new Gordic.Components.GridRC(that.grid);
                        }
                        else
                            return;
                    }
                    //that.navigate(["Gordic.Prr.UIWebClient.GDetailFormulare", { GridRc: gridRc }], {
                    that.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailFormulare", { GridRc: gridRc, RezimDetailu: rezim }], {
                        Sablona: sablona,
                        Mp: that.Mp,
                        Id: "detail_formulare"
                    }, { width: width, height: height, modal: modal })
                        .on("close", (ev, r) => {
                        if (r != undefined && r.Zmena) {
                            this.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                that.grid.ggrid("activeRow", r.Model.sablona);
                            });
                        }
                    });
                }
                odstranit() {
                    var that = this;
                    console.log("odstranit()");
                    var selection;
                    selection = that.grid.ggrid("getSelection");
                    if (selection.length == 1) {
                        var row = selection[0];
                        console.log("Vybrane radky", selection[0].sablona);
                        that.dialogs.messageBox("jres:25800017", "jres:25800018", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800018 : Opravdu si přejete odstranit vybraný záznam?
                            .on("yes", function () {
                            that.call("Delete", { detailDto: row }).done((data) => {
                                //that.showFlash("jres:25800015", "g-state-success", 3000, "flash"); //RC 25800015 : Odstraněno
                                that.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                    that.grid.ggrid("activeRow", row.sablona);
                                });
                            });
                        });
                    }
                    else
                        return;
                }
                obnovit() {
                    var that = this;
                    console.log("obnovit()");
                    var selection;
                    selection = that.grid.ggrid("getSelection");
                    if (selection.length == 1) {
                        var row = selection[0];
                        console.log("Vybrane radky", selection[0].sablona);
                        that.dialogs.messageBox("jres:25800017", "jres:25800019", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800019 : Opravdu si přejete obnovit vybraný záznam?
                            .on("yes", function () {
                            that.call("Restore", { detailDto: row }).done((data) => {
                                //that.showFlash("jres:25800016", "g-state-success", 3000, "flash"); //RC 25800016 : Obnoveno
                                that.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                    that.grid.ggrid("activeRow", row.sablona);
                                });
                            });
                        });
                    }
                    else
                        return;
                }
                //nahrani dat
                loadData(filter) {
                    var Content = this;
                    if (filter == undefined)
                        filter = new Object();
                    var prom = this.call("LoadData", { filter: filter })
                        .done(function (ret) {
                        if (Content.grid.hasClass("ggrid")) {
                            Content.dataView.updateData(ret);
                            Content.grid.ggrid("setData", Content.dataView);
                        }
                    });
                    return prom;
                }
                createGridFormat() {
                    var that = this;
                    var gridFormat;
                    gridFormat = new Gordic.Data.GridFormat();
                    if (that.contextProp("debugMode")) {
                        gridFormat = gridFormat.addNumberColumn({ name: "s_frm", caption: "jres:25800074", width: 110, fixedWidth: false }); //RC 25800074 : FRM
                    }
                    gridFormat = gridFormat.addTextColumn({
                        name: "sablona",
                        caption: "jres:25800073", //RC 25800073 : Identifikátor šablony
                        width: 120,
                        fixedWidth: false
                    }).addTextColumn({
                        name: "ginsfrm_nazev",
                        caption: "jres:25800075", //RC 25800075 : Název šablony
                        width: 200,
                        fixedWidth: false
                    }).addTextColumn({
                        name: "nazev",
                        caption: "jres:25800004", //RC 25800004 : Název
                        width: 350,
                        fixedWidth: false
                    }).addTextColumn({
                        name: "ixs_typ",
                        caption: "jres:25800076", //RC 25800076 : Ixs typ
                        width: 100,
                        fixedWidth: false
                    }).addNumberColumn({
                        name: "ktg_typ",
                        caption: "jres:25800077", //RC 25800077 : Ktg typ
                        width: 75,
                        fixedWidth: false
                    });
                    return gridFormat;
                }
            };
            GSeznamFormularu = __decorate([
                gcontent
            ], GSeznamFormularu);
            UIWebClient.GSeznamFormularu = GSeznamFormularu;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUZvcm11bGFydS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Gb3JtdWxhcnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQVUsTUFBTSxDQTJRZjtBQTNRRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyUW5CO0lBM1FnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0EyUS9CO1FBM1FvQixXQUFBLFdBQVc7WUFFNUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFROUMsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixPQUFPLEVBQ1A7NEJBQ0ksT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0I7NEJBQzlDLElBQUksRUFBRSxTQUFTOzRCQUNmLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSx3REFBZ0QsQ0FBQzs0QkFDcEUsQ0FBQzt5QkFDSjt3QkFDRCxTQUFTLEVBQ1Q7NEJBQ0ksT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELElBQUksRUFBRSxXQUFXOzRCQUNqQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUseURBQWlELENBQUM7NEJBRXJFLENBQUM7eUJBQ0o7d0JBQ0QsWUFBWSxFQUNaOzRCQUNJLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCOzRCQUNuRCxJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUVyQixDQUFDO3lCQUNKO3dCQUNELFVBQVUs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QUFVLEVBQUUsS0FBSztxQkFDcEIsQ0FBQyxDQUFDLGVBQWUsQ0FBQzt3QkFDZixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHVCQUF1Qjt3QkFDakQsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsVUFBVSxFQUFFLEtBQUs7cUJBQ3BCLENBQUMsQ0FBQztvQkFFSCxPQUFPLFVBQVUsQ0FBQztnQkFDdEIsQ0FBQzthQUNKLENBQUE7WUF0UVksZ0JBQWdCO2dCQUQ1QixRQUFRO2VBQ0ksZ0JBQWdCLENBc1E1QjtZQXRRWSw0QkFBZ0IsbUJBc1E1QixDQUFBO1FBQ0wsQ0FBQyxFQTNRb0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBMlEvQjtJQUFELENBQUMsRUEzUWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJRbkI7QUFBRCxDQUFDLEVBM1FTLE1BQU0sS0FBTixNQUFNLFFBMlFmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuUHJyLlVJV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUZvcm11bGFydSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlclZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBwcml2YXRlIGRhdGFWaWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIE1wOiBib29sZWFuO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Tm92eTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMTRcIiwgLy9SQyAyNTgwMDAxNCA6IE5vdsO9XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZW5EZXRhaWwoR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMTNcIiwgLy9SQyAyNTgwMDAxMyA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZW5EZXRhaWwoR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2RzdHJhbml0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAxMVwiLCAvL1JDIDI1ODAwMDExIDogT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10aW1lcy1jaXJjbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2RzdHJhbml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYm5vdml0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAxMlwiLCAvL1JDIDI1ODAwMDEyIDogT2Jub3ZpdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vYm5vdml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0Tm92eSwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm92w71cclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGV0YWlsXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9kc3RyYW5pdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPYm5vdml0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPYm5vdml0ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJaYcSNw6F0ZWsgc3RhdmJ5IGZpbHRydVwiKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bmkgZmlsdHJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdGl2aXRhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YT12YWx1ZS5ha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgYWt0aXZpdGE6IDEwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmaWx0ZXJGXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJlZGFuaSBkZWZpbmljIGZvcm11bGFydVxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wiYWt0aXZpdGFcIl0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdHkgb2JsaWJlbnljaCBwb2xvemVrXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwcmF2YSBsYXlvdXREZXNjcmlwdG9ydSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksICAgICAvLyBwcmlyYXplbmkgY3VzdG9tIHN0b3JhZ2Ugc2x1emJ5IHBybyBwcmFjaSBzIHVsb3plbnltaSBmaWx0cnlcclxuICAgICAgICAgICAgICAgICAgICAvL3RlbWE6IFwicHJyX3B0bV9wcmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWRTaW1wbGVNb2RlOiBcInNlem5hbUZvcm11bGFydVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVPcHRpb25zRm9ybTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB0aGlzLmZpbHRlclZhbGlkYXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldiwgb2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZnVua2NlIHZvbGFuYSB2IG1vbWVudGUsIGtkeSB1eml2YXRlbCBrbGVwbmUgbmEgdGxhYy4gZmlsdHJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqLmZpbHRlcjogXCIgKyBKU09OLnN0cmluZ2lmeShvYmouZmlsdGVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEob2JqLmZpbHRlcik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmlzdHVwIGsgZGF0dW0geiBnZmlsdGVycGFuZWx1IChEVE8gZmlsdHJ1KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLy5vbihcImZpZWxkY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiWm3Em25hIGZpbHRydVwiKTtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5sb2FkRGF0YSh0aGF0LmZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSEpO1xyXG4gICAgICAgICAgICAvLyAgICAvL3RoYXQuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nanMtbXVqR3JpZCc+XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInNhYmxvbmFcIiwgXCJnaW5zZnJtX25hemV2XCIsIFwibmF6ZXZcIiwgXCJpeHNfdHlwXCIsIFwia3RnX3R5cFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5XCIsIFwiYWN0RGV0YWlsXCIsIFwiYWN0T2RzdHJhbml0XCIsIFwiYWN0T2Jub3ZpdFwiXSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGluZm8uZ2V0U2VsZWN0aW9uKClbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLnZpc2libGUoaW5mby5jb3VudCA9PSAwIHx8IHNlbGVjdGlvbi5ha3Rpdml0YSA9PSAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T2Jub3ZpdCEudmlzaWJsZShpbmZvLmNvdW50ICE9IDAgJiYgc2VsZWN0aW9uLmFrdGl2aXRhICE9IDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T2RzdHJhbml0IS5lbmFibGVkKGluZm8uY291bnQgIT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPYm5vdml0IS5lbmFibGVkKGluZm8uY291bnQgIT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwhLmVuYWJsZWQoaW5mby5jb3VudCAhPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NFbmFibGVkOiBmdW5jdGlvbiAobWV0YXJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWV0YXJvdy5kYXRhLmFrdGl2aXRhID09IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh1bmRlZmluZWQsIHsga2V5OiBcInNhYmxvbmFcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbmHEjXRlbsOtXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcGVuRGV0YWlsKHJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2FibG9uYTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gODAwO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gNTAwO1xyXG4gICAgICAgICAgICB2YXIgbW9kYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8R29yZGljLlByci5JbnRlcmZhY2UuR1ByckZvcm11bGFyRHRvPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXppbSA9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbjogR29yZGljLlByci5JbnRlcmZhY2UuR1ByckZvcm11bGFyRHRvW107XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbmUgcmFka3lcIiwgc2VsZWN0aW9uWzBdLnNhYmxvbmEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhYmxvbmEgPSByb3cuc2FibG9uYTtcclxuICAgICAgICAgICAgICAgICAgICBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQubmF2aWdhdGUoW1wiR29yZGljLlByci5VSVdlYkNsaWVudC5HRGV0YWlsRm9ybXVsYXJlXCIsIHsgR3JpZFJjOiBncmlkUmMgfV0sIHtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlByci5VSVdlYkNsaWVudC5HRGV0YWlsRm9ybXVsYXJlXCIsIHsgR3JpZFJjOiBncmlkUmMsIFJlemltRGV0YWlsdTogcmV6aW0gfV0sIHtcclxuICAgICAgICAgICAgICAgIFNhYmxvbmE6IHNhYmxvbmEsXHJcbiAgICAgICAgICAgICAgICBNcDogdGhhdC5NcCxcclxuICAgICAgICAgICAgICAgIElkOiBcImRldGFpbF9mb3JtdWxhcmVcIlxyXG4gICAgICAgICAgICB9LCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIG1vZGFsOiBtb2RhbCB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIgIT0gdW5kZWZpbmVkICYmIHIuWm1lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgodGhhdC5maWx0ZXJGb3JtIGFzIGFueSkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikhKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCByLk1vZGVsLnNhYmxvbmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9kc3RyYW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvZHN0cmFuaXQoKVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJGb3JtdWxhckR0b1tdO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciByb3cgPSBzZWxlY3Rpb25bMF07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbmUgcmFka3lcIiwgc2VsZWN0aW9uWzBdLnNhYmxvbmEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTgwMDAxN1wiLCBcImpyZXM6MjU4MDAwMThcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAyNTgwMDAxOCA6IE9wcmF2ZHUgc2kgcMWZZWpldGUgb2RzdHJhbml0IHZ5YnJhbsO9IHrDoXpuYW0/XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiRGVsZXRlXCIsIHsgZGV0YWlsRHRvOiByb3cgfSkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MjU4MDAwMTVcIiwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgMzAwMCwgXCJmbGFzaFwiKTsgLy9SQyAyNTgwMDAxNSA6IE9kc3RyYW7Em25vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCh0aGF0LmZpbHRlckZvcm0gYXMgYW55KS5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSEpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCByb3cuc2FibG9uYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2Jub3ZpdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvYm5vdml0KClcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuUHJyLkludGVyZmFjZS5HUHJyRm9ybXVsYXJEdG9bXTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5XCIsIHNlbGVjdGlvblswXS5zYWJsb25hKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjU4MDAwMTdcIiwgXCJqcmVzOjI1ODAwMDE5XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMjU4MDAwMTkgOiBPcHJhdmR1IHNpIHDFmWVqZXRlIG9ibm92aXQgdnlicmFuw70gesOhem5hbT9cclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJSZXN0b3JlXCIsIHsgZGV0YWlsRHRvOiByb3cgfSkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MjU4MDAwMTZcIiwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgMzAwMCwgXCJmbGFzaFwiKTsgLy9SQyAyNTgwMDAxNiA6IE9ibm92ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCh0aGF0LmZpbHRlckZvcm0gYXMgYW55KS5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSEpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCByb3cuc2FibG9uYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmaWx0ZXI/OiBPYmplY3QpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgQ29udGVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsdGVyID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGZpbHRlciA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gdGhpcy5jYWxsKFwiTG9hZERhdGFcIiwgeyBmaWx0ZXI6IGZpbHRlciB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDb250ZW50LmdyaWQuaGFzQ2xhc3MoXCJnZ3JpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50LmRhdGFWaWV3LnVwZGF0ZURhdGEocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCBDb250ZW50LmRhdGFWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuUHJyLkludGVyZmFjZS5HUHJyRm9ybXVsYXJEdG8+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlByci5JbnRlcmZhY2UuR1ByckZvcm11bGFyRHRvPjtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJGb3JtdWxhckR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNvbnRleHRQcm9wKFwiZGVidWdNb2RlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInNfZnJtXCIsIGNhcHRpb246IFwianJlczoyNTgwMDA3NFwiLCB3aWR0aDogMTEwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KTsgLy9SQyAyNTgwMDA3NCA6IEZSTVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2FibG9uYVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDczXCIsIC8vUkMgMjU4MDAwNzMgOiBJZGVudGlmaWvDoXRvciDFoWFibG9ueVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJnaW5zZnJtX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwNzVcIiwgLy9SQyAyNTgwMDA3NSA6IE7DoXpldiDFoWFibG9ueVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDA0XCIsIC8vUkMgMjU4MDAwMDQgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzNTAsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDc2XCIsIC8vUkMgMjU4MDAwNzYgOiBJeHMgdHlwXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2VcclxuICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDc3XCIsIC8vUkMgMjU4MDAwNzcgOiBLdGcgdHlwXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzUsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0OyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19