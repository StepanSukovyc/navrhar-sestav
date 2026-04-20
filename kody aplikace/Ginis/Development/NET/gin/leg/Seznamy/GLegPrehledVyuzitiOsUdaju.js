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
            let GLegPrehledVyuzitiOsUdaju = class GLegPrehledVyuzitiOsUdaju extends Gordic.GContentBase // GDetailBuilderContent implements IGContent
             {
                constructor() {
                    super(...arguments);
                    this.dataView = new Gordic.Data.View(undefined, { key: "jmeno" });
                }
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
                                that.filterForm.gfilterpanel("clear");
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
                    });
                    this.menuBar([
                        { action: that.actions.actObcerstvit, favorite: true },
                        { action: that.actions.actVycistit, favorite: true },
                        { action: that.actions.actTisk, favorite: true }
                    ]);
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
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.hodnota >= 4000)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
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
                            that.actions.actTisk.enabled(info.count != 0);
                        },
                        columns: this.createGridFormat(),
                        searchColumns: ["jmeno", "prijmeni", "dat_nar", "adresa"],
                        //selection: function (ev, info) {
                        //    that.actions.actDetail!.enabled(info.count != 0);
                        //},
                        beforeExport: function () {
                            var data = that.grid.ggrid("getSelection");
                            that.call("ReportFinished", { data: data });
                        }
                    });
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
                // filter 
                createFilterForm() {
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
                                    if (value == null) {
                                        return false;
                                    }
                                    if (value.prijmeni == null) {
                                        return false;
                                    }
                                    else {
                                        return true;
                                    }
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
                                    if (value == null) {
                                        return false;
                                    }
                                    if (value.jmeno == null) {
                                        return false;
                                    }
                                    else {
                                        return true;
                                    }
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
                                    that.findFields("obdobi").gfield("setError", { message: "jres:25500166", stopping: false, errorType: "info" }); //RC 25500166 : Zadané datum je menší, než je nejmenší povolené datum. Hodnota byla upravena.
                                }
                                if (obj.value.date.start < new Date(dat.toString())) {
                                    that.find("obdobi").gfield("resetErrors");
                                    that.findFields("obdobi").gfield("setError", { message: "jres:25500167", stopping: false, errorType: "warning" }); //RC 25500167 : Plnohodnotné logování GDPR bylo zapnuto později než je zadané datum od, data v sestavě budou pouze informativní.
                                }
                            }
                        },
                        epkFlag: true
                    });
                    return filter;
                }
                // grid
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    if (this.debug) {
                        gridFormat.addTextColumn({ name: "ixs_uda", caption: "jres:25500153", width: 110, fixedWidth: false }) //UserProcess.DebugMode //RC 25500153 : IxsUda
                            .addTextColumn({ name: "ucast", caption: "jres:25500154", width: 110, fixedWidth: false }); //UserProcess.DebugMode //RC 25500154 : Ucast
                    }
                    gridFormat.addTextColumn({ name: "jmeno", caption: "jres:25500155", width: 150, fixedWidth: false }) //RC 25500155 : Jméno
                        .addTextColumn({ name: "prijmeni", caption: "jres:25500156", width: 150, fixedWidth: false }) //RC 25500156 : Příjmení
                        .addDateColumn({ name: "dat_nar", caption: "jres:25500157", width: 150, fixedWidth: false }) //RC 25500157 : Datum narození
                        .addTextColumn({ name: "adresa", caption: "jres:25500158", width: 300, fixedWidth: false }) //RC 25500158 : Bydliště
                        .addTextColumn({ name: "typ_vid_txt", caption: "jres:25500159", width: 120, fixedWidth: false }) //RC 25500159 : Událost
                        .addTextColumn({ name: "typ_uca_txt", caption: "jres:25500160", width: 120, fixedWidth: false }); //RC 25500160 : Účastník
                    return gridFormat;
                }
            };
            GLegPrehledVyuzitiOsUdaju = __decorate([
                gcontent
            ], GLegPrehledVyuzitiOsUdaju);
            WebClient.GLegPrehledVyuzitiOsUdaju = GLegPrehledVyuzitiOsUdaju;
        })(WebClient = Leg.WebClient || (Leg.WebClient = {}));
    })(Leg = Gordic.Leg || (Gordic.Leg = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0xlZ1ByZWhsZWRWeXV6aXRpT3NVZGFqdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdMZWdQcmVobGVkVnl1eml0aU9zVWRhanUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXdPZjtBQXhPRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3T25CO0lBeE9nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3TzdCO1FBeE9vQixXQUFBLFNBQVM7WUFFMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQTtZQUVsQyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLE9BQUEsWUFBWSxDQUFDLDZDQUE2Qzs7Z0JBQXpHOztvQkFJSSxhQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkE4TmpFLENBQUM7Z0JBcE5HLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsYUFBYSxFQUFFOzRCQUNYLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCOzRCQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGlDQUFpQzs0QkFDM0QsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDaEQsQ0FBQzt5QkFDSjt3QkFDRCxXQUFXLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7NEJBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsK0JBQStCOzRCQUN6RCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsR0FBRyxFQUFFO2dDQUNELElB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S0FBSyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7eUJBQ3ZILGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBLENBQUMsd0JBQXdCO29CQUU3SCxPQUFPLFVBQVUsQ0FBQztnQkFDdEIsQ0FBQzthQUNKLENBQUE7WUFsT1kseUJBQXlCO2dCQURyQyxRQUFRO2VBQ0kseUJBQXlCLENBa09yQztZQWxPWSxtQ0FBeUIsNEJBa09yQyxDQUFBO1FBRUwsQ0FBQyxFQXhPb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd083QjtJQUFELENBQUMsRUF4T2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdPbkI7QUFBRCxDQUFDLEVBeE9TLE1BQU0sS0FBTixNQUFNLFFBd09mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5MZWcuV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTGVnUHJlaGxlZFZ5dXppdGlPc1VkYWp1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIC8vIEdEZXRhaWxCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIElHQ29udGVudFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBkYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHVuZGVmaW5lZCwgeyBrZXk6IFwiam1lbm9cIiB9KTtcclxuXHJcbiAgICAgICAgcHVibGljIEZpbHRlckRhdGVJbnRlcnZhbDogR29yZGljLldmbC5JbnRlcmZhY2UuTGlzdHMuV2ZsQ29tYm9EYXRlSW50ZXJ2YWxEdG87XHJcbiAgICAgICAgcHVibGljIEZpbHRlckRhdGVJbnRlcnZhbE1pbjogR29yZGljLldmbC5JbnRlcmZhY2UuTGlzdHMuV2ZsQ29tYm9EYXRlSW50ZXJ2YWxEdG87XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb21wbGV0RHRvOiBHb3JkaWMuTGVnLldlYkNsaWVudC5HTGVnUHJlaGxlZEdEUFJEdG87XHJcblxyXG4gICAgICAgIGRlYnVnOiBib29sZWFuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDE2OFwiLCAvL1JDIDI1NTAwMTY4IDogT2LEjWVyc3R2aXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjU1MDAyNDBcIiwgLy9SQyAyNTUwMDI0MCA6IE9ixI1lcnN0dml0IHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeWNpc3RpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDE2OVwiLCAvL1JDIDI1NTAwMTY5IDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1NTAwMTcwXCIsIC8vUkMgMjU1MDAxNzAgOiBWecSNaXN0aXQgZmlsdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1rb3N0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VGlzazogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTcxXCIsIC8vUkMgMjU1MDAxNzEgOiBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI1NTAwMTcyXCIsIC8vUkMgMjU1MDAxNzIgOiBUaXNrbm91dCBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImxlZ19wdG1fdnl1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSB0aGF0LmZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbXBsZXREdG8uR0xlZ1Nlem5VY2FzdEdkcHJEdG8gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbXBsZXREdG8uZmlsdGVyID0gZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbXBsZXREdG8uRmlsdGVyTWluR0RQUiA9IHRoYXQuRmlsdGVyRGF0ZUludGVydmFsLmRhdGU/LnN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHRoYXQuY29tcGxldER0bztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclJlc3RyaWN0aW9uQWx2TWV0aG9kOiBcIkdvcmRpYy5MZWcuV2ViQ2xpZW50LkdMZWdQcmVobGVkVnl1eml0aU9zVWRhanU6R2V0UmVzdHJpY3Rpb25BbHZcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkxlZy5XZWJDbGllbnQuR0xlZ1ByZWhsZWRWeXV6aXRpT3NVZGFqdTpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0RmF2b3JpdGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0Rm9sZGVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3JlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGRhdGEgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5jYWxsKFwiUmVwb3J0RmluaXNoZWRcIiwge2RhdGE6IGRhdGF9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9iY2Vyc3R2aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFZ5Y2lzdGl0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RUaXNrLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIC8vLy8gZmlsdGVyXHJcbiAgICAgICAgICAgIC8vdmFyIGNyZWF0ZUZpbHRlckZvcm0gPSB0aGF0LmNyZWF0ZUZpbHRlckZvcm0oKTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW3RoYXQuY3JlYXRlRmlsdGVyRm9ybSgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcInByaWptZW5pXCIsIFwiam1lbm9cIiwgXCJuYXJvemVuaVwiLCBcIm5haGxlZFwiLCBcIm9iZG9iaVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdDogJ09ibGliZW5lUG9kbWlua3knLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcG9WeWhsZWRhbmlaYXZyaXRQYW5lbFBvZG1pbmVrOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MxXCIsIC8vLCBMLTgtOC0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGVtYTogdGVtYSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0b3JzOiB0aGlzLmZpbHRlclZhbGlkYXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqLmZpbHRlcjogXCIgKyBKU09OLnN0cmluZ2lmeShvYmouZmlsdGVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEob2JqLmZpbHRlcik7IC8vb2JqLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFsaXN0ID0gbmV3IEdBY3Rpb25MaXN0KHtcclxuICAgICAgICAgICAgICAgIGFjdFNlbGVjdDRrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWJyYXQgdnNlY2hueSA0MDAwK1wiLCBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7IGlmIChtZXRhLmRhdGEuaG9kbm90YSA+PSA0MDAwKSBtZXRhLmNoZWNrZWQgPSB0cnVlOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdHguZ3JpZCkuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nanMtbXVqR3JpZCc+XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aU1lbnU6IGFsaXN0LmNyZWF0ZUJhcihbXCJhY3RTZWxlY3Q0a1wiXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGplIG5hY3RlbiBhbGVzcG9uIGplZGVuIHJhZGVrIChuZW11c2kgYnl0IHphc2tydG51dCEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKGluZm8uY291bnQgIT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJqbWVub1wiLCBcInByaWptZW5pXCIsIFwiZGF0X25hclwiLCBcImFkcmVzYVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZChpbmZvLmNvdW50ICE9IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVFeHBvcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIlJlcG9ydEZpbmlzaGVkXCIsIHsgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBuYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmaWx0ZXIpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvbSA9IHRoaXMuY2FsbChcIkxvYWREYXRhXCIsIGZpbHRlcilcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkLmhhc0NsYXNzKFwiZ2dyaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRhVmlldy51cGRhdGVEYXRhKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5kYXRhVmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZmlsdGVyIFxyXG4gICAgICAgIGNyZWF0ZUZpbHRlckZvcm0oKTogR29yZGljLkZvcm1zLkZvcm17XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bmkgZmlsdHJcIiB9KSAvLywgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00zUzFcIlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTY1XCIpIC8vUkMgMjU1MDAxNjUgOiBQxZnDrWptZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvYnNwcmkoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpam1lbmlcIiwgbW9kZWw6IFwibW9kZWwucHJpam1lbmk9dmFsdWUucHJpam1lbmlcIiwgaW52YWxpZFRyYW5zZm9ybTogZnVuY3Rpb24gKHN0clZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyVmFsdWUgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBwcmlqbWVuaTogc3RyVmFsdWUgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0clZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUucHJpam1lbmkgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV0sIGZsYWc6IFwiaW1wb3J0YW50XCIsIHN0cmljdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAxNjRcIikgLy9SQyAyNTUwMDE2NCA6IEptw6lub1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvYnNqbWUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiam1lbm9cIiwgbW9kZWw6IFwibW9kZWwuam1lbm89dmFsdWUuam1lbm9cIiwgaW52YWxpZFRyYW5zZm9ybTogZnVuY3Rpb24gKHN0clZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyVmFsdWUgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBqbWVubzogc3RyVmFsdWUgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0clZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuam1lbm8gPT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV0sIGZsYWc6IFwiaW1wb3J0YW50XCIsIHN0cmljdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAxNjNcIikgLy9SQyAyNTUwMDE2MyA6IERhdHVtIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTVcIiwgeyBuYW1lOiBcIm5hcm96ZW5pXCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaWx0cnkgcHJvIHRpc2tcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTYxXCIpIC8vUkMgMjU1MDAxNjEgOiBUaXNrbm91dCBuw6FobGVkeSB2IHNlem5hbWVjaCAobcWvxb5lIGppY2ggYsO9dCB2ZWxrw6kgbW5vxb5zdHbDrSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7IG5hbWU6IFwibmFobGVkXCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAxNjJcIikgLy9SQyAyNTUwMDE2MiA6IE9iZG9iw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlY29tYm9ib3hcIiwgXCJ3LTEwXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9iZG9iaVwiLCBtb2RlbDogXCJtb2RlbC5vYmRvYmk9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdE1pbiA9IHRoYXQuRmlsdGVyRGF0ZUludGVydmFsTWluLmRhdGU/LnN0YXJ0IHx8IG5ldyBEYXRlKFwiMjAwMC0xLTFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ID0gdGhhdC5GaWx0ZXJEYXRlSW50ZXJ2YWwuZGF0ZT8uc3RhcnQgfHwgbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlLmRhdGUuc3RhcnQgPCBuZXcgRGF0ZShkYXRNaW4udG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmQoXCJvYmRvYmlcIikuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwib2Jkb2JpXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuRmlsdGVyRGF0ZUludGVydmFsTWluKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJvYmRvYmlcIikuZ2ZpZWxkKFwic2V0RXJyb3JcIiwgeyBtZXNzYWdlOiBcImpyZXM6MjU1MDAxNjZcIiwgc3RvcHBpbmc6IGZhbHNlLCBlcnJvclR5cGU6IFwiaW5mb1wiIH0pIC8vUkMgMjU1MDAxNjYgOiBaYWRhbsOpIGRhdHVtIGplIG1lbsWhw60sIG5lxb4gamUgbmVqbWVuxaHDrSBwb3ZvbGVuw6kgZGF0dW0uIEhvZG5vdGEgYnlsYSB1cHJhdmVuYS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUuZGF0ZS5zdGFydCA8IG5ldyBEYXRlKGRhdC50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZChcIm9iZG9iaVwiKS5nZmllbGQoXCJyZXNldEVycm9yc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJvYmRvYmlcIikuZ2ZpZWxkKFwic2V0RXJyb3JcIiwgeyBtZXNzYWdlOiBcImpyZXM6MjU1MDAxNjdcIiwgc3RvcHBpbmc6IGZhbHNlLCBlcnJvclR5cGU6IFwid2FybmluZ1wiIH0pIC8vUkMgMjU1MDAxNjcgOiBQbG5vaG9kbm90bsOpIGxvZ292w6Fuw60gR0RQUiBieWxvIHphcG51dG8gcG96ZMSbamkgbmXFviBqZSB6YWRhbsOpIGRhdHVtIG9kLCBkYXRhIHYgc2VzdGF2xJsgYnVkb3UgcG91emUgaW5mb3JtYXRpdm7DrS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXBrRmxhZzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5MZWcuV2ViQ2xpZW50LkdMZWdTZXpuVWNhc3RHZHByRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkxlZy5XZWJDbGllbnQuR0xlZ1Nlem5VY2FzdEdkcHJEdG8+KClcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c191ZGFcIiwgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTUzXCIsIHdpZHRoOiAxMTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vVXNlclByb2Nlc3MuRGVidWdNb2RlIC8vUkMgMjU1MDAxNTMgOiBJeHNVZGFcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidWNhc3RcIiwgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTU0XCIsIHdpZHRoOiAxMTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vVXNlclByb2Nlc3MuRGVidWdNb2RlIC8vUkMgMjU1MDAxNTQgOiBVY2FzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiam1lbm9cIiwgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTU1XCIsIHdpZHRoOiAxNTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjU1MDAxNTUgOiBKbcOpbm9cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwcmlqbWVuaVwiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAxNTZcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDE1NiA6IFDFmcOtam1lbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X25hclwiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAxNTdcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDE1NyA6IERhdHVtIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFkcmVzYVwiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAxNThcIiwgd2lkdGg6IDMwMCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDE1OCA6IEJ5ZGxpxaF0xJtcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0eXBfdmlkX3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MjU1MDAxNTlcIiwgd2lkdGg6IDEyMCwgZml4ZWRXaWR0aDogZmFsc2UgfSkgLy9SQyAyNTUwMDE1OSA6IFVkw6Fsb3N0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidHlwX3VjYV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTYwXCIsIHdpZHRoOiAxMjAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pIC8vUkMgMjU1MDAxNjAgOiDDmsSNYXN0bsOta1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==