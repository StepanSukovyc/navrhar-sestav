namespace Gordic.Leg.WebClient {

    var gcontent = Decorators.gcontent
    @gcontent
    export class GLegPrehledVyuzitiOsUdaju extends GContentBase // GDetailBuilderContent implements IGContent
    {
        private grid: JQuery;
        private filterForm: JQuery<HTMLElement>;
        dataView = new Gordic.Data.View(undefined, { key: "jmeno" });

        public FilterDateInterval: Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto;
        public FilterDateIntervalMin: Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto;

        public completDto: Gordic.Leg.WebClient.GLegPrehledGDPRDto;

        debug: boolean;
        
        
        onContentReady() {
            var that = this;

            this.actions.addRange({
                actObcerstvit: {
                    caption: "jres:25500168", //RC 25500168 : Občerstvit
                    tooltip: "jres:25500240", //RC 25500240 : Občerstvit seznam
                    icon: "gi-refresh",
                    run: function (ev, ctx) {
                        that.filterForm.gfilterpanel("applyFilter");
                    }
                },
                actVycistit: {
                    caption: "jres:25500169", //RC 25500169 : Vyčistit
                    tooltip: "jres:25500170", //RC 25500170 : Vyčistit filtry
                    icon: "gi-koste",
                    run: function () {
                        that.filterForm.gfilterpanel("clear")
                    }
                },
                actTisk: GAction.createPrintAction({
                    name: "actTisk",
                    caption: "jres:25500171", //RC 25500171 : Tisk
                    tooltip: "jres:25500172", //RC 25500172 : Tisknout seznam
                    tema: "leg_ptm_vyu",
                    reportStarting: function (rep) {
                        var data = that.grid.ggrid("getSelection");
                        var filter = that.filterForm.gfilterpanel("getCurrentData");

                        that.completDto.GLegSeznUcastGdprDto = data;
                        that.completDto.filter = filter;
                        that.completDto.FilterMinGDPR = that.FilterDateInterval.date?.start;

                        rep.customDto = that.completDto;
                    },
                    serverRestrictionAlvMethod: "Gordic.Leg.WebClient.GLegPrehledVyuzitiOsUdaju:GetRestrictionAlv",
                    serverParameterMethod: "Gordic.Leg.WebClient.GLegPrehledVyuzitiOsUdaju:ServerParameterMethod",
                    initFavorites: false,
                    initFolders: true,
                    //reportFinished: function () {
                    //    var data = that.grid.ggrid("getSelection");
                    //    that.call("ReportFinished", {data: data})
                    //}
                })
            })

            this.menuBar([
                { action: that.actions.actObcerstvit, favorite: true },
                { action: that.actions.actVycistit, favorite: true },
                { action: that.actions.actTisk, favorite: true }
            ])
            //// filter
            //var createFilterForm = that.createFilterForm(); 
            
            this.filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [that.createFilterForm()],
                    favorites: ["prijmeni", "jmeno", "narozeni", "nahled", "obdobi"],
                    // 01.03.2021 - TFeik
                    // Nahrazení obsolete parametrů.
                    poVyhledaniZobrazit: 'OblibenePodminky',
                    //poVyhledaniZavritPanelPodminek: false,
                    favoriteLayoutDescriptor: "L3M3S1", //, L-8-8-0, M-12-12-0, S-12-12-0
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
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full",
                    multi: true,
                    multiMenu: alist.createBar(["actSelect4k"]),
                    //defaultAction: that.actions.actDetail,
                    selection: function (ev, info) {
                        // pokud je nacten alespon jeden radek (nemusi byt zaskrtnut!)
                        that.actions.actTisk!.enabled(info.count != 0);
                    },
                    columns: this.createGridFormat(),
                    searchColumns: ["jmeno", "prijmeni", "dat_nar", "adresa"],
                    //selection: function (ev, info) {
                    //    that.actions.actDetail!.enabled(info.count != 0);
                    //},
                    beforeExport: function () {
                        var data = that.grid.ggrid("getSelection");
                        that.call("ReportFinished", { data: data })
                    }
                });
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

        // filter 
        createFilterForm(): Gordic.Forms.Form{
            var that = this;

            var filter = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" }) //, layoutDescriptor: "L3M3S1"
            
                .addSection()
                .addRow("jres:25500165") //RC 25500165 : Příjmení
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robspri(), {
                    name: "prijmeni", model: "model.prijmeni=value.prijmeni", invalidTransform: function (strValue) {
                        if (typeof strValue === "string")
                            return { prijmeni: strValue };
                        return strValue;

                    }, validators: [new Gordic.Validators.Required(), {
                        validate: (value) => {
                            if (value == null) { return false; }
                            if (value.prijmeni == null) { return false; }
                            else { return true; }
                        }
                    }], flag: "important", strict: false
                })

                .addRow("jres:25500164") //RC 25500164 : Jméno
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robsjme(), {
                    name: "jmeno", model: "model.jmeno=value.jmeno", invalidTransform: function (strValue) {
                        if (typeof strValue === "string")
                            return { jmeno: strValue };
                        return strValue;

                    }, validators: [new Gordic.Validators.Required(), {
                        validate: (value) => {
                            if (value == null) { return false; }
                            if (value.jmeno == null) { return false; }
                            else { return true; }
                        }
                    }], flag: "important", strict: false
                })

                .addRow("jres:25500163") //RC 25500163 : Datum narození
                .addField("gdatebox", "w-5", { name: "narozeni" })

                // filtry pro tisk
                .addSection()
                .addRow("jres:25500161") //RC 25500161 : Tisknout náhledy v seznamech (může jich být velké množství)
                .addField("gcheck", "w-2", { name: "nahled", initialValue: true })
                .addRow("jres:25500162") //RC 25500162 : Období
                .addField("gdatecombobox", "w-10", {
                    name: "obdobi", model: "model.obdobi=value",
                    change: function (ev, obj) {
                        if (obj.value != null) {
                            var datMin = that.FilterDateIntervalMin.date?.start || new Date("2000-1-1");
                            var dat = that.FilterDateInterval.date?.start || new Date();

                            if (obj.value.date.start < new Date(datMin.toString())) {
                                that.find("obdobi").gfield("resetErrors");
                                that.findFields("obdobi").gfield("setValue", that.FilterDateIntervalMin);
                                that.findFields("obdobi").gfield("setError", { message: "jres:25500166", stopping: false, errorType: "info" }) //RC 25500166 : Zadané datum je menší, než je nejmenší povolené datum. Hodnota byla upravena.
                            }
                            if (obj.value.date.start < new Date(dat.toString())) {
                                that.find("obdobi").gfield("resetErrors");
                                that.findFields("obdobi").gfield("setError", { message: "jres:25500167", stopping: false, errorType: "warning" }) //RC 25500167 : Plnohodnotné logování GDPR bylo zapnuto později než je zadané datum od, data v sestavě budou pouze informativní.
                            }
                        }
                    },
                    epkFlag: true
                })

            return filter;
        }

        // grid
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Leg.WebClient.GLegSeznUcastGdprDto> {
            var gridFormat = new Gordic.Data.GridFormat<Gordic.Leg.WebClient.GLegSeznUcastGdprDto>()

            if (this.debug) {
                gridFormat.addTextColumn({ name: "ixs_uda", caption: "jres:25500153", width: 110, fixedWidth: false }) //UserProcess.DebugMode //RC 25500153 : IxsUda
                    .addTextColumn({ name: "ucast", caption: "jres:25500154", width: 110, fixedWidth: false }) //UserProcess.DebugMode //RC 25500154 : Ucast
            }
                

            gridFormat.addTextColumn({ name: "jmeno", caption: "jres:25500155", width: 150, fixedWidth: false }) //RC 25500155 : Jméno
                .addTextColumn({ name: "prijmeni", caption: "jres:25500156", width: 150, fixedWidth: false }) //RC 25500156 : Příjmení
                .addDateColumn({ name: "dat_nar", caption: "jres:25500157", width: 150, fixedWidth: false }) //RC 25500157 : Datum narození
                .addTextColumn({ name: "adresa", caption: "jres:25500158", width: 300, fixedWidth: false }) //RC 25500158 : Bydliště
                .addTextColumn({ name: "typ_vid_txt", caption: "jres:25500159", width: 120, fixedWidth: false }) //RC 25500159 : Událost
                .addTextColumn({ name: "typ_uca_txt", caption: "jres:25500160", width: 120, fixedWidth: false }) //RC 25500160 : Účastník

            return gridFormat;
        }
    }

}