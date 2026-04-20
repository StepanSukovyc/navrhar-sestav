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
            let GSeznamPovoleniDeniku = class GSeznamPovoleniDeniku extends Gordic.GContentBase {
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
                        idSimpleMode: "seznamPovoleniDeniku",
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
                        searchColumns: ["ginsfun_nazev_ref", "prrsrad_nazev", "prrsrad_rok"],
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
                    this.dataView = new Gordic.Data.View(undefined, { key: ["ixs_rad", "ixs_fun"] });
                    //načtení
                    this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                }
                openDetail(rezim) {
                    var that = this;
                    var ixsRad = undefined;
                    var ixsFun = undefined;
                    var width = 800;
                    var height = 500;
                    var modal = true;
                    var gridRc = undefined;
                    if (rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */) {
                        var selection;
                        selection = that.grid.ggrid("getSelection");
                        if (selection.length == 1) {
                            var row = selection[0];
                            console.log("Vybrane radky", selection[0].ixs_rad, selection[0].ixs_fun);
                            ixsRad = row.ixs_rad;
                            ixsFun = row.ixs_fun;
                            gridRc = new Gordic.Components.GridRC(that.grid);
                        }
                        else
                            return;
                    }
                    //that.navigate(["Gordic.Prr.UIWebClient.GDetailPovoleniDeniku", { GridRc: gridRc }], {
                    that.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailPovoleniDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                        IxsRad: ixsRad,
                        IxsFun: ixsFun,
                        Mp: that.TypDen == 20,
                        Id: "detail_povoleni_deniku"
                    }, { width: width, height: height, modal: modal })
                        .on("close", (ev, r) => {
                        if (r != undefined && r.Zmena) {
                            this.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                that.grid.ggrid("activeRow", [r.Model.ixs_rad, r.Model.ixs_fun]);
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
                        console.log("Vybrane radky", selection[0].ixs_rad, selection[0].ixs_fun);
                        that.dialogs.messageBox("jres:25800017", "jres:25800018", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800018 : Opravdu si přejete odstranit vybraný záznam?
                            .on("yes", function () {
                            that.call("Delete", { detailDto: row }).done((data) => {
                                //that.showFlash("jres:25800015", "g-state-success", 3000, "flash"); //RC 25800015 : Odstraněno
                                that.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                    that.grid.ggrid("activeRow", [row.ixs_rad, row.ixs_fun]);
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
                        console.log("Vybrane radky", selection[0].ixs_rad, selection[0].ixs_fun);
                        that.dialogs.messageBox("jres:25800017", "jres:25800019", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800019 : Opravdu si přejete obnovit vybraný záznam?
                            .on("yes", function () {
                            that.call("Restore", { detailDto: row }).done((data) => {
                                //that.showFlash("jres:25800016", "g-state-success", 3000, "flash"); //RC 25800016 : Obnoveno
                                that.loadData(that.filterForm.gfilterpanel("getCurrentData")).done(function () {
                                    that.grid.ggrid("activeRow", [row.ixs_rad, row.ixs_fun]);
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
                    gridFormat = gridFormat.addIconColumn({
                        name: "pristup",
                        description: "jres:25800056", //RC 25800056 : Přístup
                        width: 40,
                        customClass: "center",
                        fixedWidth: true,
                        iconTemplate: function (row) {
                            switch (row["s_pristup"]) {
                                case 0: return { icon: "gi-window-close g-state-text g-state-important", tooltip: "jres:25800058" }; //RC 25800058 : Povoleno pouze prohlížení záznamů na deníku
                                case 1: return { icon: "gi-tick g-state-text g-state-success", tooltip: "jres:25800057" }; //RC 25800057 : Povoleno pořizování a editace záznamů na deníku
                                default: return null;
                            }
                        }
                    });
                    if (that.contextProp("debugMode")) {
                        gridFormat = gridFormat.addTextColumn({ name: "ixs_rad", caption: "jres:25800054", width: 110, fixedWidth: false }) //RC 25800054 : IxsRad
                            .addTextColumn({ name: "ixs_fun", caption: "jres:25800055", width: 110, fixedWidth: false }); //RC 25800055 : IxsFun
                    }
                    gridFormat = gridFormat.addTextColumn({ name: "ginsfun_nazev_ref", caption: "jres:25800049", width: 150, fixedWidth: false }) //RC 25800049 : Funkční místo
                        .addTextColumn({ name: "prrsrad_nazev", caption: "jres:25800020", width: 150, fixedWidth: false }) //RC 25800020 : Deník
                        .addNumberColumn({ name: "prrsrad_rok", caption: "jres:25800007", width: 60, fixedWidth: false }); //RC 25800007 : Rok        
                    return gridFormat;
                }
            };
            GSeznamPovoleniDeniku = __decorate([
                gcontent
            ], GSeznamPovoleniDeniku);
            UIWebClient.GSeznamPovoleniDeniku = GSeznamPovoleniDeniku;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVBvdm9sZW5pRGVuaWt1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVBvdm9sZW5pRGVuaWt1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0FxUWY7QUFyUUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcVFuQjtJQXJRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBcVEvQjtRQXJRb0IsV0FBQSxXQUFXO1lBRTVCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBUW5ELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsT0FBTyxFQUNQOzRCQUNJLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9COzRCQUM5QyxJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsd0RBQWdELENBQUM7NEJBQ3BFLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUNUOzRCQUNJLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxVQUFVLHlEQUFpRCxDQUFDOzRCQUVyRSxDQUFDO3lCQUNKO3dCQUNELFlBQVksRUFDWjs0QkFDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5Qjs0QkFDbkQsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFFckIsQ0FBQzt5QkFDSjt3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LENBZ1FqQztZQWhRWSxpQ0FBcUIsd0JBZ1FqQyxDQUFBO1FBQ0wsQ0FBQyxFQXJRb0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBcVEvQjtJQUFELENBQUMsRUFyUWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFRbkI7QUFBRCxDQUFDLEVBclFTLE1BQU0sS0FBTixNQUFNLFFBcVFmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuUHJyLlVJV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVBvdm9sZW5pRGVuaWt1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJGb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyVmFsaWRhdG9yczogYW55O1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcbiAgICAgICAgVHlwRGVuOiBudW1iZXI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROb3Z5OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAxNFwiLCAvL1JDIDI1ODAwMDE0IDogTm92w71cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuTmV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDAxM1wiLCAvL1JDIDI1ODAwMDEzIDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPZHN0cmFuaXQ6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDExXCIsIC8vUkMgMjU4MDAwMTEgOiBPZHN0cmFuaXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vZHN0cmFuaXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9ibm92aXQ6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDEyXCIsIC8vUkMgMjU4MDAwMTIgOiBPYm5vdml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZXR3ZWV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9ibm92aXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3ROb3Z5LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3bDvVxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXRhaWxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2RzdHJhbml0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9ibm92aXQsIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ibm92aXQgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlphxI3DoXRlayBzdGF2YnkgZmlsdHJ1XCIpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIktvbXBsZXRuaSBmaWx0clwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWt0aXZpdGFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jYWt0KCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFrdGl2aXRhPXZhbHVlLmFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBha3Rpdml0YTogMTAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW2ZpbHRlckZdLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmVkYW5pIGRlZmluaWMgZm9ybXVsYXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJha3Rpdml0YVwiXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0eSBvYmxpYmVueWNoIHBvbG96ZWtcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXByYXZhIGxheW91dERlc2NyaXB0b3J1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSwgICAgIC8vIHByaXJhemVuaSBjdXN0b20gc3RvcmFnZSBzbHV6YnkgcHJvIHByYWNpIHMgdWxvemVueW1pIGZpbHRyeVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGVtYTogXCJwcnJfcHRtX3ByZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpZFNpbXBsZU1vZGU6IFwic2V6bmFtUG92b2xlbmlEZW5pa3VcIixcclxuICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogdGhpcy5maWx0ZXJWYWxpZGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXYsIG9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Z1bmtjZSB2b2xhbmEgdiBtb21lbnRlLCBrZHkgdXppdmF0ZWwga2xlcG5lIG5hIHRsYWMuIGZpbHRyb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9iai5maWx0ZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkob2JqLmZpbHRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKG9iai5maWx0ZXIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJpc3R1cCBrIGRhdHVtIHogZ2ZpbHRlcnBhbmVsdSAoRFRPIGZpbHRydSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vLm9uKFwiZmllbGRjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiWm3Em25hIGZpbHRydVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoYXQubG9hZERhdGEodGhhdC5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikhKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vdGhhdC5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nanMtbXVqR3JpZCc+XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcImdpbnNmdW5fbmF6ZXZfcmVmXCIsIFwicHJyc3JhZF9uYXpldlwiLCBcInBycnNyYWRfcm9rXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5vdnlcIiwgXCJhY3REZXRhaWxcIiwgXCJhY3RPZHN0cmFuaXRcIiwgXCJhY3RPYm5vdml0XCJdKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gaW5mby5nZXRTZWxlY3Rpb24oKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9kc3RyYW5pdCEudmlzaWJsZShpbmZvLmNvdW50ID09IDAgfHwgc2VsZWN0aW9uLmFrdGl2aXRhID09IDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPYm5vdml0IS52aXNpYmxlKGluZm8uY291bnQgIT0gMCAmJiBzZWxlY3Rpb24uYWt0aXZpdGEgIT0gMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLmVuYWJsZWQoaW5mby5jb3VudCAhPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9ibm92aXQhLmVuYWJsZWQoaW5mby5jb3VudCAhPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZChpbmZvLmNvdW50ICE9IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93c0VuYWJsZWQ6IGZ1bmN0aW9uIChtZXRhcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRhcm93LmRhdGEuYWt0aXZpdGEgPT0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHVuZGVmaW5lZCwgeyBrZXk6IFtcIml4c19yYWRcIiwgXCJpeHNfZnVuXCJdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9uYcSNdGVuw61cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wZW5EZXRhaWwocmV6aW06IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dSk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpeHNSYWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciBpeHNGdW46IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IDUwMDtcclxuICAgICAgICAgICAgdmFyIG1vZGFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJQb3ZvbGVuaURlbmlrdUR0bz4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAocmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJQb3ZvbGVuaURlbmlrdUR0b1tdO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBzZWxlY3Rpb25bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5XCIsIHNlbGVjdGlvblswXS5peHNfcmFkLCBzZWxlY3Rpb25bMF0uaXhzX2Z1bik7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzUmFkID0gcm93Lml4c19yYWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzRnVuID0gcm93Lml4c19mdW47XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFJjID0gbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGF0LmdyaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy90aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5QcnIuVUlXZWJDbGllbnQuR0RldGFpbFBvdm9sZW5pRGVuaWt1XCIsIHsgR3JpZFJjOiBncmlkUmMgfV0sIHtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlByci5VSVdlYkNsaWVudC5HRGV0YWlsUG92b2xlbmlEZW5pa3VcIiwgeyBHcmlkUmM6IGdyaWRSYywgUmV6aW1EZXRhaWx1OiByZXppbSB9XSwgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgSXhzUmFkOiBpeHNSYWQsXHJcbiAgICAgICAgICAgICAgICBJeHNGdW46IGl4c0Z1bixcclxuICAgICAgICAgICAgICAgIE1wOiB0aGF0LlR5cERlbiA9PSAyMCxcclxuICAgICAgICAgICAgICAgIElkOiBcImRldGFpbF9wb3ZvbGVuaV9kZW5pa3VcIlxyXG4gICAgICAgICAgICB9LCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIG1vZGFsOiBtb2RhbCB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIgIT0gdW5kZWZpbmVkICYmIHIuWm1lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgodGhhdC5maWx0ZXJGb3JtIGFzIGFueSkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikhKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCBbci5Nb2RlbC5peHNfcmFkLCByLk1vZGVsLml4c19mdW5dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZHN0cmFuaXQoKTogdm9pZHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvZHN0cmFuaXQoKVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJQb3ZvbGVuaURlbmlrdUR0b1tdO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciByb3cgPSBzZWxlY3Rpb25bMF07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbmUgcmFka3lcIiwgc2VsZWN0aW9uWzBdLml4c19yYWQsIHNlbGVjdGlvblswXS5peHNfZnVuKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjU4MDAwMTdcIiwgXCJqcmVzOjI1ODAwMDE4XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMjU4MDAwMTggOiBPcHJhdmR1IHNpIHDFmWVqZXRlIG9kc3RyYW5pdCB2eWJyYW7DvSB6w6F6bmFtP1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIkRlbGV0ZVwiLCB7IGRldGFpbER0bzogcm93IH0pLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjI1ODAwMDE1XCIsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDMwMDAsIFwiZmxhc2hcIik7IC8vUkMgMjU4MDAwMTUgOiBPZHN0cmFuxJtub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgodGhhdC5maWx0ZXJGb3JtIGFzIGFueSkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikhKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgW3Jvdy5peHNfcmFkLCByb3cuaXhzX2Z1bl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2Jub3ZpdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvYm5vdml0KClcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuUHJyLkludGVyZmFjZS5HUHJyUG92b2xlbmlEZW5pa3VEdG9bXTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5XCIsIHNlbGVjdGlvblswXS5peHNfcmFkLCBzZWxlY3Rpb25bMF0uaXhzX2Z1bik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjI1ODAwMDE3XCIsIFwianJlczoyNTgwMDAxOVwiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDI1ODAwMDE5IDogT3ByYXZkdSBzaSBwxZllamV0ZSBvYm5vdml0IHZ5YnJhbsO9IHrDoXpuYW0/XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiUmVzdG9yZVwiLCB7IGRldGFpbER0bzogcm93IH0pLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjI1ODAwMDE2XCIsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDMwMDAsIFwiZmxhc2hcIik7IC8vUkMgMjU4MDAwMTYgOiBPYm5vdmVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgodGhhdC5maWx0ZXJGb3JtIGFzIGFueSkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikhKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgW3Jvdy5peHNfcmFkLCByb3cuaXhzX2Z1bl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25haHJhbmkgZGF0XHJcbiAgICAgICAgcHVibGljIGxvYWREYXRhKGZpbHRlcj86IE9iamVjdCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciBDb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb20gPSB0aGlzLmNhbGwoXCJMb2FkRGF0YVwiLCB7IGZpbHRlcjogZmlsdGVyIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKENvbnRlbnQuZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnQuZGF0YVZpZXcudXBkYXRlRGF0YShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIENvbnRlbnQuZGF0YVZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJEZW5pa0R0bz4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlByci5JbnRlcmZhY2UuR1ByclBvdm9sZW5pRGVuaWt1RHRvPjtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5QcnIuSW50ZXJmYWNlLkdQcnJQb3ZvbGVuaURlbmlrdUR0bz4oKTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXQuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaXN0dXBcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MjU4MDAwNTZcIiwgLy9SQyAyNTgwMDA1NiA6IFDFmcOtc3R1cFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAocm93OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvd1tcInNfcHJpc3R1cFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiB7IGljb246IFwiZ2ktd2luZG93LWNsb3NlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWltcG9ydGFudFwiLCB0b29sdGlwOiBcImpyZXM6MjU4MDAwNThcIiB9OyAgLy9SQyAyNTgwMDA1OCA6IFBvdm9sZW5vIHBvdXplIHByb2hsw63FvmVuw60gesOhem5hbcWvIG5hIGRlbsOta3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4geyBpY29uOiBcImdpLXRpY2sgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0b29sdGlwOiBcImpyZXM6MjU4MDAwNTdcIiB9OyAvL1JDIDI1ODAwMDU3IDogUG92b2xlbm8gcG/FmWl6b3bDoW7DrSBhIGVkaXRhY2UgesOhem5hbcWvIG5hIGRlbsOta3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuY29udGV4dFByb3AoXCJkZWJ1Z01vZGVcIikpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19yYWRcIiwgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDU0XCIsIHdpZHRoOiAxMTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pICAvL1JDIDI1ODAwMDU0IDogSXhzUmFkXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19mdW5cIiwgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDU1XCIsIHdpZHRoOiAxMTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pOyAgLy9SQyAyNTgwMDA1NSA6IEl4c0Z1blxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImdpbnNmdW5fbmF6ZXZfcmVmXCIsIGNhcHRpb246IFwianJlczoyNTgwMDA0OVwiLCB3aWR0aDogMTUwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KS8vUkMgMjU4MDAwNDkgOiBGdW5rxI1uw60gbcOtc3RvXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicHJyc3JhZF9uYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMjBcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSkvL1JDIDI1ODAwMDIwIDogRGVuw61rXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJwcnJzcmFkX3Jva1wiLCBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMDdcIiwgd2lkdGg6IDYwLCBmaXhlZFdpZHRoOiBmYWxzZSB9KTsvL1JDIDI1ODAwMDA3IDogUm9rICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=