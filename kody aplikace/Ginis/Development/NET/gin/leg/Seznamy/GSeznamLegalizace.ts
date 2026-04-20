namespace Gordic.Leg.WebClient {
    
    var gcontent = Decorators.gcontent
    @gcontent 
    export class GSeznamLegalizace extends GContentBase {

        private grid: JQuery;
        private filterForm: JQuery<HTMLElement>;
        dataView = new Gordic.Data.View(undefined, { key: "ixp" });
        ixsFun: any;

        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        
        onContentReady() {
            var that = this;

            this.actions.addRange({
                actNovy:  
                {
                    caption: "jres:25500119", //RC 25500119 : Nový záznam
                    tooltip: "jres:25500122", //RC 25500122 : Vložení nového záznamu (Tímto otevřete kartu pro zadání nového záznamu)
                    icon: "gi-plus",
                    run: function (ev, ctx) {
                        that.novyZaznam();
                    }
                },
                actDetail:
                {
                    caption: "jres:25500118", //RC 25500118 : Detail
                    icon: "gi-detail",
                    run: function (ev, ctx) {
                        that.openDetail(); //Gordic.Gin.Interface.RegSpa.GRezimContentu.View
                    }
                },
                actTisk:
                {
                    caption: "jres:25500120", //RC 25500120 : Tisk
                    icon: "gi-print",
                    enabled: false,
                    visible: false,
                    run: function () {

                    }
                },
                actTiskStitku:
                {
                    // nutný výběr záznamů ze seznamu
                    caption: "jres:25500121", //RC 25500121 : Tisk štítků
                    icon: "gi-print",
                    enabled: false,
                    run: function () {
                        var data = that.grid.ggrid("getSelection");
                        //kontrola zda vybrana overeni jsou stejneho typu a maji žadatele
                        that.call("TiskStitkuStart", { model: data}).done(function (ev) {
                            if (ev == "") {
                                that.navigate(["Gordic.Leg.WebClient.GDetailTiskStitku"], { data: data })
                            }
                            else {
                                that.dialogs.alert("Informace", ev);
                            }
                        })
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
                .addField("gselectbox", "w-8", Gordic.Prefabs.Select.robsdmd(), { model: "model.ixp_dmd=value.ixp_dmd", name: "nazev", serverFilters: { ktg_den: [140], aktivita: [100], ixs_fun: [this.ixsFun] } })
                
            
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
                        $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.hodnota >= 4000) meta.checked = true; });
                        $(ctx.grid).ggrid("refreshRows")
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
                        that.actions.actTiskStitku!.enabled(info.count != 0);
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
        public loadData(filter): JQueryPromise<any> {
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
        public novyZaznam(): void {
            let that = this;
            let width = 1100;
            let height = 800;
            let modal = false;

            
            //that.dialogs.simpleForm("jres:25500129", form, {}, { autoMinWidth: true, height: 150, modal: true, noClose: false }).on("close", (ev, ret) => { //RC 25500129 : Výběr typu ověření
                Gordic.Leg.Dialogs.VyberOvereni(that).done(function (ev, ret) {
                that.navigate(["Gordic.Leg.WebClient.GDetailOvereni"], {
                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.New,
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
                    
            })
        }

        // zobrazení detailu
        openDetail(): void {
            var that = this;
            var ixp: string | null | undefined = undefined;
            var width = 1100;
            var height = 800;
            var modal = false;
            var gridRc: Gordic.Components.GridRC<Gordic.Leg.WebClient.GSeznamLegDto> | undefined = undefined;

            var selection: Gordic.Leg.WebClient.GSeznamLegDto[];
            selection = that.grid.ggrid("getSelection");
            if (selection.length == 1) {
                var row = selection[0];
                console.log("Vybrane radky", selection[0].ixs_vid);
                ixp = row.ixs_vid;
                gridRc = new Gordic.Components.GridRC(that.grid);
            }

            that.navigate(["Gordic.Leg.WebClient.GDetailOvereni", { gridRemoteControl: gridRc }], {
                RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                IxsVid: ixp,
                Id: "detail_overeni"
            }, { width: width, height: height, modal: modal })
            
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
        private createGridFormat(): Gordic.Data.GridFormat<Gordic.Leg.WebClient.GSeznamLegDto> {
            var gridFormat = new Gordic.Data.GridFormat<Gordic.Leg.WebClient.GSeznamLegDto>()

            gridFormat.addTextColumn({
                name: "cislo_zapisu",
                caption: "jres:25500246",  //RC 25500246 : Číslo zápisu
                width: 100,
                fixedWidth: false
            })
            gridFormat.addNumberColumn({
                name: "rok",
                caption: "jres:25500247", //RC 25500247 : Rok
                width: 80,
                fixedWidth: false
            })
            gridFormat.addDateColumn({
                name: "dat_zapisu", // if (tisk) { dat_zapisu_txt }
                caption: "jres:25500248", //RC 25500248 : Datum zápisu
                width: 150,
                fixedWidth: false
            })
            gridFormat.addTextColumn({
                name: "typ_vid_txt",
                caption: "jres:25500249", //RC 25500249 : Typ ověření
                width: 100,
                fixedWidth: false
            })
            gridFormat.addTextColumn({
                name: "popis",
                caption: "jres:25500250", //RC 25500250 : Popis
                width: 280,
                fixedWidth: false
            })
            gridFormat.addTextColumn({
                name: "nazev",
                caption: "jres:25500251", //RC 25500251 : Název knihy
                width: 350,
                fixedWidth: false
            })
            gridFormat.addTextColumn({
                name: "osoba_nazev",
                caption: "jres:25500252", //RC 25500252 : Osoba jejíž podpis byl legalizován / Žadatel
                width: 450,
                fixedWidth: false
            })
            return gridFormat;
        }
    }

}