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
            let GSeznamDeniku = class GSeznamDeniku extends Gordic.GContentBase {
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
                        idSimpleMode: "seznamDeniku",
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
                        searchColumns: ["nazev", "zkratka", "format_ac", "rok", "dat_od", "dat_do", "ac_cislo_max"],
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
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixs_rad" });
                    //načtení
                    this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                }
                openDetail(rezim) {
                    var that = this;
                    var ixsRad = undefined;
                    var width = 800;
                    var height = 500;
                    var modal = true;
                    var gridRc = undefined;
                    if (rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */) {
                        var selection;
                        selection = that.grid.ggrid("getSelection");
                        if (selection.length == 1) {
                            var row = selection[0];
                            console.log("Vybrane radky", selection[0].ixs_rad);
                            ixsRad = row.ixs_rad;
                            gridRc = new Gordic.Components.GridRC(that.grid);
                        }
                        else
                            return;
                    }
                    //that.navigate(["Gordic.Prr.UIWebClient.GDetailDeniku", { GridRc: gridRc }], {
                    that.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                        IxsRad: ixsRad,
                        Mp: that.TypDen == 20,
                        Id: "detail_deniku"
                    }, { width: width, height: height, modal: modal })
                        .on("close", (ev, r) => {
                        if (r != undefined && r.Zmena) {
                            this.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                that.grid.ggrid("activeRow", r.Model.ixs_rad);
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
                        console.log("Vybrane radky", selection[0].ixs_rad);
                        that.dialogs.messageBox("jres:25800017", "jres:25800018", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800018 : Opravdu si přejete odstranit vybraný záznam?
                            .on("yes", function () {
                            that.call("Delete", { detailDto: row }).done((data) => {
                                //that.showFlash("jres:25800015", "g-state-success", 3000, "flash"); //RC 25800015 : Odstraněno
                                that.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                    that.grid.ggrid("activeRow", row.ixs_rad);
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
                        console.log("Vybrane radky", selection[0].ixs_rad);
                        that.dialogs.messageBox("jres:25800017", "jres:25800019", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800019 : Opravdu si přejete obnovit vybraný záznam?
                            .on("yes", function () {
                            that.call("Restore", { detailDto: row }).done((data) => {
                                //that.showFlash("jres:25800016", "g-state-success", 3000, "flash"); //RC 25800016 : Obnoveno
                                that.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                    that.grid.ggrid("activeRow", row.ixs_rad);
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
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:25800004", //RC 25800004 : Název
                        width: 200,
                        fixedWidth: false
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "jres:25800005", //RC 25800005 : Zkratka
                        width: 100,
                        fixedWidth: false
                    }).addTextColumn({
                        name: "format_ac",
                        caption: "jres:25800006", //RC 25800006 : Formát AČ
                        width: 100,
                        fixedWidth: false
                    }).addNumberColumn({
                        name: "rok",
                        caption: "jres:25800007", //RC 25800007 : Rok
                        width: 50,
                        fixedWidth: false
                    }).addDateColumn({
                        name: "dat_od",
                        caption: "jres:25800008", //RC 25800008 : Datum od
                        width: 70,
                        fixedWidth: false
                    }).addDateColumn({
                        name: "dat_do",
                        caption: "jres:25800009", //RC 25800009 : Datum do
                        width: 70,
                        fixedWidth: false
                    }).addNumberColumn({
                        name: "ac_cislo_max",
                        caption: "jres:25800010", //RC 25800010 : Poř. číslo
                        width: 100,
                        fixedWidth: false
                    });
                }
            };
            GSeznamDeniku = __decorate([
                gcontent
            ], GSeznamDeniku);
            UIWebClient.GSeznamDeniku = GSeznamDeniku;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURlbmlrdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1EZW5pa3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQVUsTUFBTSxDQTRRZjtBQTVRRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0UW5CO0lBNVFnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0E0US9CO1FBNVFvQixXQUFBLFdBQVc7WUFFNUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsT0FBQSxZQUFZO2dCQVEzQyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE9BQU8sRUFDUDs0QkFDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQjs0QkFDOUMsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxVQUFVLHdEQUFnRCxDQUFDOzRCQUNwRSxDQUFDO3lCQUNKO3dCQUNELFNBQVMsRUFDVDs0QkFDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSx5REFBaUQsQ0FBQzs0QkFFckUsQ0FBQzt5QkFDSjt3QkFDRCxZQUFZLEVBQ1o7NEJBQ0ksT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7NEJBQ25ELElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7NEJBRXJCLENBQUM7eUJBQ0o7d0JBQ0QsVUFBVSxFQUNWOzRCQUNJ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QUMsZUFBZSxDQUFDO3dCQUNmLElBQUksRUFBRSxjQUFjO3dCQUNwQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsVUFBVSxFQUFFLEtBQUs7cUJBQ3BCLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0osQ0FBQTtZQXZRWSxhQUFhO2dCQUR6QixRQUFRO2VBQ0ksYUFBYSxDQXVRekI7WUF2UVkseUJBQWEsZ0JBdVF6QixDQUFBO1FBQ0wsQ0FBQyxFQTVRb0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBNFEvQjtJQUFELENBQUMsRUE1UWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRRbkI7QUFBRCxDQUFDLEVBNVFTLE1BQU0sS0FBTixNQUFNLFFBNFFmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuUHJyLlVJV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbURlbmlrdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlclZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBwcml2YXRlIGRhdGFWaWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIFR5cERlbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Tm92eTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMTRcIiwgLy9SQyAyNTgwMDAxNCA6IE5vdsO9XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZW5EZXRhaWwoR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMTNcIiwgLy9SQyAyNTgwMDAxMyA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZW5EZXRhaWwoR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2RzdHJhbml0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAxMVwiLCAvL1JDIDI1ODAwMDExIDogT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10aW1lcy1jaXJjbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2RzdHJhbml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYm5vdml0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAxMlwiLCAvL1JDIDI1ODAwMDEyIDogT2Jub3ZpdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vYm5vdml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0Tm92eSwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm92w71cclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGV0YWlsXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9kc3RyYW5pdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPYm5vdml0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPYm5vdml0ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJaYcSNw6F0ZWsgc3RhdmJ5IGZpbHRydVwiKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bmkgZmlsdHJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdGl2aXRhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YT12YWx1ZS5ha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgYWt0aXZpdGE6IDEwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmaWx0ZXJGXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJlZGFuaSBkZWZpbmljIGZvcm11bGFydVxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wiYWt0aXZpdGFcIl0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdHkgb2JsaWJlbnljaCBwb2xvemVrXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwcmF2YSBsYXlvdXREZXNjcmlwdG9ydSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksICAgICAvLyBwcmlyYXplbmkgY3VzdG9tIHN0b3JhZ2Ugc2x1emJ5IHBybyBwcmFjaSBzIHVsb3plbnltaSBmaWx0cnlcclxuICAgICAgICAgICAgICAgICAgICAvL3RlbWE6IFwicHJyX3B0bV9wcmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWRTaW1wbGVNb2RlOiBcInNlem5hbURlbmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVPcHRpb25zRm9ybTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB0aGlzLmZpbHRlclZhbGlkYXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldiwgb2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZnVua2NlIHZvbGFuYSB2IG1vbWVudGUsIGtkeSB1eml2YXRlbCBrbGVwbmUgbmEgdGxhYy4gZmlsdHJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqLmZpbHRlcjogXCIgKyBKU09OLnN0cmluZ2lmeShvYmouZmlsdGVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEob2JqLmZpbHRlcik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmlzdHVwIGsgZGF0dW0geiBnZmlsdGVycGFuZWx1IChEVE8gZmlsdHJ1KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8ub24oXCJmaWVsZGNoYW5nZVwiLCBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJabcSbbmEgZmlsdHJ1XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhhdC5sb2FkRGF0YSh0aGF0LmZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy90aGF0LmZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1tdWpHcmlkJz5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wibmF6ZXZcIiwgXCJ6a3JhdGthXCIsIFwiZm9ybWF0X2FjXCIsIFwicm9rXCIsIFwiZGF0X29kXCIsIFwiZGF0X2RvXCIsIFwiYWNfY2lzbG9fbWF4XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5vdnlcIiwgXCJhY3REZXRhaWxcIiwgXCJhY3RPZHN0cmFuaXRcIiwgXCJhY3RPYm5vdml0XCJdKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gaW5mby5nZXRTZWxlY3Rpb24oKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9kc3RyYW5pdCEudmlzaWJsZShpbmZvLmNvdW50ID09IDAgfHwgc2VsZWN0aW9uLmFrdGl2aXRhID09IDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPYm5vdml0IS52aXNpYmxlKGluZm8uY291bnQgIT0gMCAmJiBzZWxlY3Rpb24uYWt0aXZpdGEgIT0gMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLmVuYWJsZWQoaW5mby5jb3VudCAhPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9ibm92aXQhLmVuYWJsZWQoaW5mby5jb3VudCAhPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZChpbmZvLmNvdW50ICE9IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93c0VuYWJsZWQ6IGZ1bmN0aW9uIChtZXRhcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRhcm93LmRhdGEuYWt0aXZpdGEgPT0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHVuZGVmaW5lZCwgeyBrZXk6IFwiaXhzX3JhZFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9uYcSNdGVuw61cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wZW5EZXRhaWwocmV6aW06IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dSk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpeHNSYWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IDUwMDtcclxuICAgICAgICAgICAgdmFyIG1vZGFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJEZW5pa0R0bz4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAocmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJEZW5pa0R0b1tdO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBzZWxlY3Rpb25bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5XCIsIHNlbGVjdGlvblswXS5peHNfcmFkKTtcclxuICAgICAgICAgICAgICAgICAgICBpeHNSYWQgPSByb3cuaXhzX3JhZDtcclxuICAgICAgICAgICAgICAgICAgICBncmlkUmMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQubmF2aWdhdGUoW1wiR29yZGljLlByci5VSVdlYkNsaWVudC5HRGV0YWlsRGVuaWt1XCIsIHsgR3JpZFJjOiBncmlkUmMgfV0sIHtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlByci5VSVdlYkNsaWVudC5HRGV0YWlsRGVuaWt1XCIsIHsgR3JpZFJjOiBncmlkUmMsIFJlemltRGV0YWlsdTogcmV6aW0gfV0sIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEl4c1JhZDogaXhzUmFkLFxyXG4gICAgICAgICAgICAgICAgTXA6IHRoYXQuVHlwRGVuID09IDIwLFxyXG4gICAgICAgICAgICAgICAgSWQ6IFwiZGV0YWlsX2RlbmlrdVwiXHJcbiAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IG1vZGFsIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAociAhPSB1bmRlZmluZWQgJiYgci5abWVuYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKCh0aGF0LmZpbHRlckZvcm0gYXMgYW55KS5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSEpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHIuTW9kZWwuaXhzX3JhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2RzdHJhbml0KCk6IHZvaWR7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2RzdHJhbml0KClcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuUHJyLkludGVyZmFjZS5HUHJyRGVuaWtEdG9bXTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5XCIsIHNlbGVjdGlvblswXS5peHNfcmFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjU4MDAwMTdcIiwgXCJqcmVzOjI1ODAwMDE4XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMjU4MDAwMTggOiBPcHJhdmR1IHNpIHDFmWVqZXRlIG9kc3RyYW5pdCB2eWJyYW7DvSB6w6F6bmFtP1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIkRlbGV0ZVwiLCB7IGRldGFpbER0bzogcm93IH0pLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjI1ODAwMDE1XCIsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDMwMDAsIFwiZmxhc2hcIik7IC8vUkMgMjU4MDAwMTUgOiBPZHN0cmFuxJtub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgodGhhdC5maWx0ZXJGb3JtIGFzIGFueSkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikhKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgcm93Lml4c19yYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2Jub3ZpdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvYm5vdml0KClcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuUHJyLkludGVyZmFjZS5HUHJyRGVuaWtEdG9bXTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5XCIsIHNlbGVjdGlvblswXS5peHNfcmFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjU4MDAwMTdcIiwgXCJqcmVzOjI1ODAwMDE5XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMjU4MDAwMTkgOiBPcHJhdmR1IHNpIHDFmWVqZXRlIG9ibm92aXQgdnlicmFuw70gesOhem5hbT9cclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJSZXN0b3JlXCIsIHsgZGV0YWlsRHRvOiByb3cgfSkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MjU4MDAwMTZcIiwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgMzAwMCwgXCJmbGFzaFwiKTsgLy9SQyAyNTgwMDAxNiA6IE9ibm92ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCh0aGF0LmZpbHRlckZvcm0gYXMgYW55KS5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSEpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCByb3cuaXhzX3JhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmFocmFuaSBkYXRcclxuICAgICAgICBwdWJsaWMgbG9hZERhdGEoZmlsdGVyPzogT2JqZWN0KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIENvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbHRlciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvbSA9IHRoaXMuY2FsbChcIkxvYWREYXRhXCIsIHsgZmlsdGVyOiBmaWx0ZXIgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ29udGVudC5ncmlkLmhhc0NsYXNzKFwiZ2dyaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudC5kYXRhVmlldy51cGRhdGVEYXRhKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgQ29udGVudC5kYXRhVmlldyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlByci5JbnRlcmZhY2UuR1ByckRlbmlrRHRvPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuUHJyLkludGVyZmFjZS5HUHJyRGVuaWtEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDA0XCIsIC8vUkMgMjU4MDAwMDQgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemtyYXRrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAwNVwiLCAvL1JDIDI1ODAwMDA1IDogWmtyYXRrYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybWF0X2FjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDA2XCIsIC8vUkMgMjU4MDAwMDYgOiBGb3Jtw6F0IEHEjFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMDdcIiwgLy9SQyAyNTgwMDAwNyA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSkuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMDhcIiwgLy9SQyAyNTgwMDAwOCA6IERhdHVtIG9kXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KS5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAwOVwiLCAvL1JDIDI1ODAwMDA5IDogRGF0dW0gZG9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19jaXNsb19tYXhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMTBcIiwgLy9SQyAyNTgwMDAxMCA6IFBvxZkuIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19