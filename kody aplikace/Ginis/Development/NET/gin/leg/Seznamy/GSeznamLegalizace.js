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
            let GSeznamLegalizace = class GSeznamLegalizace extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixp" });
                }
                onContentReady() {
                    var that = this;
                    this.actions.addRange({
                        actNovy: {
                            caption: "jres:25500119", //RC 25500119 : Nový záznam
                            tooltip: "jres:25500122", //RC 25500122 : Vložení nového záznamu (Tímto otevřete kartu pro zadání nového záznamu)
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                that.novyZaznam();
                            }
                        },
                        actDetail: {
                            caption: "jres:25500118", //RC 25500118 : Detail
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.openDetail(); //Gordic.Gin.Interface.RegSpa.GRezimContentu.View
                            }
                        },
                        actTisk: {
                            caption: "jres:25500120", //RC 25500120 : Tisk
                            icon: "gi-print",
                            enabled: false,
                            visible: false,
                            run: function () {
                            }
                        },
                        actTiskStitku: {
                            // nutný výběr záznamů ze seznamu
                            caption: "jres:25500121", //RC 25500121 : Tisk štítků
                            icon: "gi-print",
                            enabled: false,
                            run: function () {
                                var data = that.grid.ggrid("getSelection");
                                //kontrola zda vybrana overeni jsou stejneho typu a maji žadatele
                                that.call("TiskStitkuStart", { model: data }).done(function (ev) {
                                    if (ev == "") {
                                        that.navigate(["Gordic.Leg.WebClient.GDetailTiskStitku"], { data: data });
                                    }
                                    else {
                                        that.dialogs.alert("Informace", ev);
                                    }
                                });
                            }
                        }
                    });
                    this.menuBar([
                        { action: that.actions.actNovy, favorite: true },
                        { action: that.actions.actDetail, favorite: true },
                        { action: that.actions.actTisk, favorite: true },
                        { action: that.actions.actTiskStitku, favorite: true }
                    ]);
                    var filterF = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
                        .addSection()
                        .addRow("jres:25500004") //RC 25500004 : Číslo zápisu
                        .addField("gnumberbox", "w-4", { model: "por_cislo", name: "por_cislo" })
                        .addRow("jres:25500005") //RC 25500005 : Rok
                        .addField("gnumberbox", "w-6", { model: "rok", name: "rok", minValue: 0, maxValue: 2050 }) //, validators: [new Validators.Range({ min: 1950, max: 2050 })] })
                        .addRow("jres:25500006") //RC 25500006 : Typ ověření
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.robcvid(), { model: "model.typ_vid=value.typ_vid", name: "typ_vid_txt", customClass: "enabled", dropdown: true })
                        .addRow("jres:25500007") //RC 25500007 : Kniha
                        .addField("gselectbox", "w-8", Gordic.Prefabs.Select.robsdmd(), { model: "model.ixp_dmd=value.ixp_dmd", name: "nazev", serverFilters: { ktg_den: [140], aktivita: [100], ixs_fun: [this.ixsFun] } });
                    this.filterForm = $("<div>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        forms: [filterF],
                        favorites: ["por_cislo", "rok", "typ_vid_txt", "nazev"],
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        poVyhledaniZobrazit: 'OblibenePodminky',
                        //poVyhledaniZavritPanelPodminek: false,
                        favoriteLayoutDescriptor: "L4M1S1", //, L-8-8-0, M-12-12-0, S-12-12-0
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        //tema: tema,
                        saveOptionsForm: "all",
                        //validators: this.filterValidators,
                        apply: function (ev, obj) {
                            console.log("obj.filter: " + JSON.stringify(obj.filter));
                            that.loadData(obj.filter); //obj.filter
                        }
                    });
                    var alist = new GActionList({
                        actSelect4k: {
                            caption: "Vybrat vsechny 4000+", run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.hodnota >= 4000)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        }
                    });
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        multiMenu: alist.createBar(["actSelect4k"]),
                        selection: function (ev, info) {
                            // pokud je nacten alespon jeden radek (nemusi byt zaskrtnut!)
                            that.actions.actTiskStitku.enabled(info.count != 0);
                        },
                        defaultAction: that.actions.actDetail,
                        columns: this.createGridFormat(),
                        searchColumns: ["ixp_spis"],
                        //selection: function (ev, info) {
                        //    that.actions.actDetail!.enabled(info.count != 0);
                        //},
                        contextMenu: this.actions.createBar(["actDetail"]),
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixp_spis" });
                    this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                }
                // nahrani dat
                loadData(filter) {
                    var that = this;
                    var prom = this.call("LoadData", filter)
                        .done(function (ret) {
                        if (that.grid.hasClass("ggrid")) {
                            that.dataView.updateData(ret);
                            that.grid.ggrid("setData", that.dataView);
                        }
                    });
                    return prom;
                }
                // zadání nové legalizace či vidimace
                novyZaznam() {
                    let that = this;
                    let width = 1100;
                    let height = 800;
                    let modal = false;
                    //that.dialogs.simpleForm("jres:25500129", form, {}, { autoMinWidth: true, height: 150, modal: true, noClose: false }).on("close", (ev, ret) => { //RC 25500129 : Výběr typu ověření
                    Gordic.Leg.Dialogs.VyberOvereni(that).done(function (ev, ret) {
                        that.navigate(["Gordic.Leg.WebClient.GDetailOvereni"], {
                            RezimDetailu: 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */,
                            TypVid: ev.typ_vid,
                            IxsFun: that.ixsFun,
                            Id: "nove_overeni"
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, r) => {
                            //debugger; // netestovano r.Model, r.Zmena test jen po kliku na zrusit po new
                            // ziskat filtry a znovunacist seznam
                            var customDto = that.filterForm.gfilterpanel("getConfirmedData");
                            that.loadData(customDto);
                        });
                    });
                }
                // zobrazení detailu
                openDetail() {
                    var that = this;
                    var ixp = undefined;
                    var width = 1100;
                    var height = 800;
                    var modal = false;
                    var gridRc = undefined;
                    var selection;
                    selection = that.grid.ggrid("getSelection");
                    if (selection.length == 1) {
                        var row = selection[0];
                        console.log("Vybrane radky", selection[0].ixs_vid);
                        ixp = row.ixs_vid;
                        gridRc = new Gordic.Components.GridRC(that.grid);
                    }
                    that.navigate(["Gordic.Leg.WebClient.GDetailOvereni", { gridRemoteControl: gridRc }], {
                        RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */,
                        IxsVid: ixp,
                        Id: "detail_overeni"
                    }, { width: width, height: height, modal: modal });
                    // puvodni
                    //Gordic.Leg.Dialogs.OpenDetail(that, false, ["Gordic.Leg.WebClient.GDetailOvereni"], { //, { gridRemoteControl: gridRc }
                    //    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                    //    IxsVid: ixp,
                    //    Id: "detail_overeni"
                    //}, { width: width, height: height, modal: modal })
                    //.on("close", (ev, r) => {
                    //    if (r != undefined && r.Zmena) {
                    //        this.loadData((that.filterForm as any).gfilterpanel("getCurrentData")!).done(function () {
                    //            that.grid.ggrid("activeRow", r.Model.ixp);
                    //        });
                    //    }
                    //});
                }
                // definice gridu // Gordic.Mts.WinClient.GLegTabLeg.CreateGridFormat
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "cislo_zapisu",
                        caption: "jres:25500246", //RC 25500246 : Číslo zápisu
                        width: 100,
                        fixedWidth: false
                    });
                    gridFormat.addNumberColumn({
                        name: "rok",
                        caption: "jres:25500247", //RC 25500247 : Rok
                        width: 80,
                        fixedWidth: false
                    });
                    gridFormat.addDateColumn({
                        name: "dat_zapisu", // if (tisk) { dat_zapisu_txt }
                        caption: "jres:25500248", //RC 25500248 : Datum zápisu
                        width: 150,
                        fixedWidth: false
                    });
                    gridFormat.addTextColumn({
                        name: "typ_vid_txt",
                        caption: "jres:25500249", //RC 25500249 : Typ ověření
                        width: 100,
                        fixedWidth: false
                    });
                    gridFormat.addTextColumn({
                        name: "popis",
                        caption: "jres:25500250", //RC 25500250 : Popis
                        width: 280,
                        fixedWidth: false
                    });
                    gridFormat.addTextColumn({
                        name: "nazev",
                        caption: "jres:25500251", //RC 25500251 : Název knihy
                        width: 350,
                        fixedWidth: false
                    });
                    gridFormat.addTextColumn({
                        name: "osoba_nazev",
                        caption: "jres:25500252", //RC 25500252 : Osoba jejíž podpis byl legalizován / Žadatel
                        width: 450,
                        fixedWidth: false
                    });
                    return gridFormat;
                }
            };
            GSeznamLegalizace = __decorate([
                gcontent
            ], GSeznamLegalizace);
            WebClient.GSeznamLegalizace = GSeznamLegalizace;
        })(WebClient = Leg.WebClient || (Leg.WebClient = {}));
    })(Leg = Gordic.Leg || (Gordic.Leg = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUxlZ2FsaXphY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtTGVnYWxpemFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBK1FmO0FBL1FELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStRbkI7SUEvUWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQStRN0I7UUEvUW9CLFdBQUEsU0FBUztZQUUxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1lBRWxDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQUFuRDs7b0JBSUksYUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBcVEvRCxDQUFDO2dCQWhRRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE9BQU8sRUFDUDs0QkFDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjs0QkFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSx1RkFBdUY7NEJBQ2pILElBQUksRUFBRSxTQUFTOzRCQUNmLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7NEJBQ3RCLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUNUOzRCQUNJLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLGlEQUFpRDs0QkFDeEUsQ0FBQzt5QkFDSjt3QkFDRCxPQUFP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QkFBaUIsb0JBeVE3QixDQUFBO1FBRUwsQ0FBQyxFQS9Rb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK1E3QjtJQUFELENBQUMsRUEvUWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQStRbkI7QUFBRCxDQUFDLEVBL1FTLE1BQU0sS0FBTixNQUFNLFFBK1FmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5MZWcuV2ViQ2xpZW50IHtcclxuICAgIFxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgQGdjb250ZW50IFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1MZWdhbGl6YWNlIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJGb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIGRhdGFWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodW5kZWZpbmVkLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICBpeHNGdW46IGFueTtcclxuXHJcbiAgICAgICAgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROb3Z5OiAgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTE5XCIsIC8vUkMgMjU1MDAxMTkgOiBOb3bDvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1NTAwMTIyXCIsIC8vUkMgMjU1MDAxMjIgOiBWbG/FvmVuw60gbm92w6lobyB6w6F6bmFtdSAoVMOtbXRvIG90ZXbFmWV0ZSBrYXJ0dSBwcm8gemFkw6Fuw60gbm92w6lobyB6w6F6bmFtdSlcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm92eVphem5hbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTE4XCIsIC8vUkMgMjU1MDAxMTggOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVuRGV0YWlsKCk7IC8vR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VGlzazpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAxMjBcIiwgLy9SQyAyNTUwMDEyMCA6IFRpc2tcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrU3RpdGt1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG51dG7DvSB2w71ixJtyIHrDoXpuYW3FryB6ZSBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTIxXCIsIC8vUkMgMjU1MDAxMjEgOiBUaXNrIMWhdMOtdGvFr1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgemRhIHZ5YnJhbmEgb3ZlcmVuaSBqc291IHN0ZWpuZWhvIHR5cHUgYSBtYWppIMW+YWRhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJUaXNrU3RpdGt1U3RhcnRcIiwgeyBtb2RlbDogZGF0YX0pLmRvbmUoZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXYgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoW1wiR29yZGljLkxlZy5XZWJDbGllbnQuR0RldGFpbFRpc2tTdGl0a3VcIl0sIHsgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiSW5mb3JtYWNlXCIsIGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE5vdnksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlzaywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlza1N0aXRrdSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiS29tcGxldG5pIGZpbHRyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDA0XCIpIC8vUkMgMjU1MDAwMDQgOiDEjMOtc2xvIHrDoXBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgeyBtb2RlbDogXCJwb3JfY2lzbG9cIiwgbmFtZTogXCJwb3JfY2lzbG9cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMDVcIikgLy9SQyAyNTUwMDAwNSA6IFJva1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7IG1vZGVsOiBcInJva1wiLCBuYW1lOiBcInJva1wiLCBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDIwNTAgfSkgLy8sIHZhbGlkYXRvcnM6IFtuZXcgVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMTk1MCwgbWF4OiAyMDUwIH0pXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMDZcIikgLy9SQyAyNTUwMDAwNiA6IFR5cCBvdsSbxZllbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yb2JjdmlkKCksIHsgbW9kZWw6IFwibW9kZWwudHlwX3ZpZD12YWx1ZS50eXBfdmlkXCIsIG5hbWU6IFwidHlwX3ZpZF90eHRcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkcm9wZG93bjogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAwMDdcIikgLy9SQyAyNTUwMDAwNyA6IEtuaWhhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yb2JzZG1kKCksIHsgbW9kZWw6IFwibW9kZWwuaXhwX2RtZD12YWx1ZS5peHBfZG1kXCIsIG5hbWU6IFwibmF6ZXZcIiwgc2VydmVyRmlsdGVyczogeyBrdGdfZGVuOiBbMTQwXSwgYWt0aXZpdGE6IFsxMDBdLCBpeHNfZnVuOiBbdGhpcy5peHNGdW5dIH0gfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmaWx0ZXJGXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcInBvcl9jaXNsb1wiLCBcInJva1wiLCBcInR5cF92aWRfdHh0XCIsIFwibmF6ZXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6ICdPYmxpYmVuZVBvZG1pbmt5JyxcclxuICAgICAgICAgICAgICAgICAgICAvL3BvVnlobGVkYW5pWmF2cml0UGFuZWxQb2RtaW5lazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTFTMVwiLCAvLywgTC04LTgtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICAvL3RlbWE6IHRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZU9wdGlvbnNGb3JtOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogdGhpcy5maWx0ZXJWYWxpZGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9iai5maWx0ZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkob2JqLmZpbHRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKG9iai5maWx0ZXIpOyAvL29iai5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhbGlzdCA9IG5ldyBHQWN0aW9uTGlzdCh7XHJcbiAgICAgICAgICAgICAgICBhY3RTZWxlY3Q0azoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0IHZzZWNobnkgNDAwMCtcIiwgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN0eC5ncmlkKS5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkgeyBpZiAobWV0YS5kYXRhLmhvZG5vdGEgPj0gNDAwMCkgbWV0YS5jaGVja2VkID0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkKFwicmVmcmVzaFJvd3NcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXYgY2xhc3M9J2pzLW11akdyaWQnPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArIHRoYXQuJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXZlbsOtIHbDvcWha3kgZWxlbWVudHUsIG5hIGt0ZXLDvSBidWRlIHDFmWlkw6FuIGdyaWQuXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlNZW51OiBhbGlzdC5jcmVhdGVCYXIoW1wiYWN0U2VsZWN0NGtcIl0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGplIG5hY3RlbiBhbGVzcG9uIGplZGVuIHJhZGVrIChuZW11c2kgYnl0IHphc2tydG51dCEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrU3RpdGt1IS5lbmFibGVkKGluZm8uY291bnQgIT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIml4cF9zcGlzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKGluZm8uY291bnQgIT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdERldGFpbFwiXSksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vZGF0YVZpZXdcclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHVuZGVmaW5lZCwgeyBrZXk6IFwiaXhwX3NwaXNcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBuYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmaWx0ZXIpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcHJvbSA9IHRoaXMuY2FsbChcIkxvYWREYXRhXCIsIGZpbHRlcilcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkLmhhc0NsYXNzKFwiZ2dyaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRhVmlldy51cGRhdGVEYXRhKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5kYXRhVmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gemFkw6Fuw60gbm92w6kgbGVnYWxpemFjZSDEjWkgdmlkaW1hY2VcclxuICAgICAgICBwdWJsaWMgbm92eVphem5hbSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSAxMTAwO1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gODAwO1xyXG4gICAgICAgICAgICBsZXQgbW9kYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwianJlczoyNTUwMDEyOVwiLCBmb3JtLCB7fSwgeyBhdXRvTWluV2lkdGg6IHRydWUsIGhlaWdodDogMTUwLCBtb2RhbDogdHJ1ZSwgbm9DbG9zZTogZmFsc2UgfSkub24oXCJjbG9zZVwiLCAoZXYsIHJldCkgPT4geyAvL1JDIDI1NTAwMTI5IDogVsO9YsSbciB0eXB1IG92xJvFmWVuw61cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5MZWcuRGlhbG9ncy5WeWJlck92ZXJlbmkodGhhdCkuZG9uZShmdW5jdGlvbiAoZXYsIHJldCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuTGVnLldlYkNsaWVudC5HRGV0YWlsT3ZlcmVuaVwiXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldyxcclxuICAgICAgICAgICAgICAgICAgICBUeXBWaWQ6IGV2LnR5cF92aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhzRnVuOiB0aGF0Lml4c0Z1bixcclxuICAgICAgICAgICAgICAgICAgICBJZDogXCJub3ZlX292ZXJlbmlcIlxyXG4gICAgICAgICAgICAgICAgfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgLy8gbmV0ZXN0b3Zhbm8gci5Nb2RlbCwgci5abWVuYSB0ZXN0IGplbiBwbyBrbGlrdSBuYSB6cnVzaXQgcG8gbmV3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thdCBmaWx0cnkgYSB6bm92dW5hY2lzdCBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1c3RvbUR0byA9IHRoYXQuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKGN1c3RvbUR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbHVcclxuICAgICAgICBvcGVuRGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpeHA6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IDExMDA7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSA4MDA7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8R29yZGljLkxlZy5XZWJDbGllbnQuR1Nlem5hbUxlZ0R0bz4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuTGVnLldlYkNsaWVudC5HU2V6bmFtTGVnRHRvW107XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVnlicmFuZSByYWRreVwiLCBzZWxlY3Rpb25bMF0uaXhzX3ZpZCk7XHJcbiAgICAgICAgICAgICAgICBpeHAgPSByb3cuaXhzX3ZpZDtcclxuICAgICAgICAgICAgICAgIGdyaWRSYyA9IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkModGhhdC5ncmlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuTGVnLldlYkNsaWVudC5HRGV0YWlsT3ZlcmVuaVwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBncmlkUmMgfV0sIHtcclxuICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcsXHJcbiAgICAgICAgICAgICAgICBJeHNWaWQ6IGl4cCxcclxuICAgICAgICAgICAgICAgIElkOiBcImRldGFpbF9vdmVyZW5pXCJcclxuICAgICAgICAgICAgfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHB1dm9kbmlcclxuICAgICAgICAgICAgLy9Hb3JkaWMuTGVnLkRpYWxvZ3MuT3BlbkRldGFpbCh0aGF0LCBmYWxzZSwgW1wiR29yZGljLkxlZy5XZWJDbGllbnQuR0RldGFpbE92ZXJlbmlcIl0sIHsgLy8sIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IGdyaWRSYyB9XHJcbiAgICAgICAgICAgIC8vICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcsXHJcbiAgICAgICAgICAgIC8vICAgIEl4c1ZpZDogaXhwLFxyXG4gICAgICAgICAgICAvLyAgICBJZDogXCJkZXRhaWxfb3ZlcmVuaVwiXHJcbiAgICAgICAgICAgIC8vfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgICAgIC8vLm9uKFwiY2xvc2VcIiwgKGV2LCByKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAociAhPSB1bmRlZmluZWQgJiYgci5abWVuYSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMubG9hZERhdGEoKHRoYXQuZmlsdGVyRm9ybSBhcyBhbnkpLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpISkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCByLk1vZGVsLml4cCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZGVmaW5pY2UgZ3JpZHUgLy8gR29yZGljLk10cy5XaW5DbGllbnQuR0xlZ1RhYkxlZy5DcmVhdGVHcmlkRm9ybWF0XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkxlZy5XZWJDbGllbnQuR1Nlem5hbUxlZ0R0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5MZWcuV2ViQ2xpZW50LkdTZXpuYW1MZWdEdG8+KClcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2xvX3phcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjQ2XCIsICAvL1JDIDI1NTAwMjQ2IDogxIzDrXNsbyB6w6FwaXN1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDI0N1wiLCAvL1JDIDI1NTAwMjQ3IDogUm9rXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfemFwaXN1XCIsIC8vIGlmICh0aXNrKSB7IGRhdF96YXBpc3VfdHh0IH1cclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDI0OFwiLCAvL1JDIDI1NTAwMjQ4IDogRGF0dW0gesOhcGlzdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF92aWRfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAyNDlcIiwgLy9SQyAyNTUwMDI0OSA6IFR5cCBvdsSbxZllbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDI1MFwiLCAvL1JDIDI1NTAwMjUwIDogUG9waXNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyODAsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjUxXCIsIC8vUkMgMjU1MDAyNTEgOiBOw6F6ZXYga25paHlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzNTAsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvc29iYV9uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMjUyXCIsIC8vUkMgMjU1MDAyNTIgOiBPc29iYSBqZWrDrcW+IHBvZHBpcyBieWwgbGVnYWxpem92w6FuIC8gxb1hZGF0ZWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0NTAsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19