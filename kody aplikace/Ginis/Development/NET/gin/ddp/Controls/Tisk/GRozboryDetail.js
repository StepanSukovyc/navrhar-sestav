"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GRozboryDetail.ts                      </Name>
//    <Description> Okno definice rozborů                                       </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-02-28                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GRozboryDetail = class GRozboryDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter = {};
                    this.intervals = [];
                    this.view = new Gordic.Data.View();
                }
                onContentReady() {
                    var that = this;
                    this.filter.tema = this.tema;
                    this.actions.addRange([
                        new GAction({
                            name: "actOk",
                            caption: "Ok",
                            //icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    this.commandBar(this.actions.createBar(["actOk!", "actClose"]));
                    this.createForm();
                }
                createForm() {
                    var that = this;
                    var nedoplatkyForm = new Gordic.Forms.Form({ name: "nedoplatkyForm", layoutDescriptor: "L1M1S1, L-5-7-0, M-5-7-0, S-5-7-0" })
                        .addSection("Výše nedoplatků")
                        .addRow("Od")
                        .addField("gnumberbox", {
                        name: "ned_od",
                    })
                        .addRow("Do")
                        .addField("gnumberbox", {
                        name: "ned_do",
                    });
                    var dateForm = new Gordic.Forms.Form({ name: "dateForm", layoutDescriptor: "L1M1S1, L-7-5-0, M-7-5-0, S-7-5-0" })
                        .addRow({ label: "Datum výpočtu", required: true })
                        .addField("gdatebox", {
                        name: "datum",
                        initialValue: new Date(),
                    });
                    var intervalForm = new Gordic.Forms.Form({ name: "intervalForm", layoutDescriptor: "L1M1S1" })
                        .addSection("Časové intervaly")
                        .addRow()
                        .addField("gdatebox", {
                        name: "datum",
                        initialValue: new Date(),
                    });
                    var buttonForm = new Gordic.Forms.Form({ name: "buttonForm", layoutDescriptor: "L2M2S2, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addRow()
                        .addField("gbutton", "w-6", {
                        params: {
                            id: "btnAdd",
                            action: new GAction({
                                name: "btnAktAdd",
                                caption: "Přidat",
                                run: function () {
                                    that.updateInterval();
                                }
                            }),
                        }
                    })
                        .addField("gbutton", "w-6", {
                        params: {
                            id: "btnDelete",
                            action: new GAction({
                                name: "btnAktDelete",
                                caption: "Smazat",
                                run: function () {
                                    that.removeInterval();
                                }
                            }),
                        }
                    });
                    $.newDiv().appendTo(this.element).gform("createFrom", nedoplatkyForm);
                    $.newDiv().appendTo(this.element).gform("createFrom", dateForm);
                    $.newDiv().appendTo(this.element).gform("createFrom", intervalForm);
                    this.grid = $.newDiv().appendTo(this.element)
                        .css("height", "35%")
                        .ggrid({
                        data: this.intervals,
                        dataKey: "id",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        rowNumbers: true,
                        columns: this.createGridFormat(),
                        showBottomPanel: false,
                        showHeaderRow: false,
                        showTopPanel: false
                    });
                    $.newDiv().appendTo(this.element).gform("createFrom", buttonForm);
                    $("[data-param-id='btnAdd']").css("width", "100%");
                    $("[data-param-id='btnDelete']").css("width", "100%");
                }
                //přidání intervalu do gridu
                updateInterval() {
                    var datum = this.findForms("intervalForm").findFields("datum").gfield("getValue");
                    var highestID = this.intervals.reduce((max, item) => (item.id > max ? item.id : max), 0);
                    if (highestID != 0) {
                        var highestDatum = this.intervals.find(item => item.id === highestID).datum;
                        if (highestDatum >= datum) { //pokud je nově zadaný datum menší než aktualně největší datum v intervalu, error
                            this.showFlash("Zadaný datum neodpovídá intervalu!", "error");
                        }
                        else {
                            this.intervals.push({ id: highestID + 1, datum: datum });
                        }
                    }
                    else { //je první přidán
                        this.intervals.push({ id: 1, datum: datum });
                    }
                    var view = new Gordic.Data.View(this.intervals, { key: "id" });
                    this.grid.ggrid("setData", view);
                }
                //odstranění intervalu z gridu
                removeInterval() {
                    var selection = this.grid.ggrid("getSelection");
                    if (selection[0] != null) {
                        var idToDelete = selection[0].id;
                        this.intervals = this.intervals.filter(item => item.id !== idToDelete);
                    }
                    var view = new Gordic.Data.View(this.intervals, { key: "id" });
                    this.grid.ggrid("setData", view);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addDateColumn({ name: "datum", caption: "Datum" });
                    return gridFormat;
                }
                ok() {
                    var that = this;
                    var goesThrough = true;
                    var intervalVals = this.grid.ggrid("getView").getDataRows();
                    if (intervalVals.length > 1) {
                        for (var i = 1; i < intervalVals.length; i++) {
                            if (intervalVals[i].datum < intervalVals[i - 1].datum) {
                                goesThrough = false;
                                this.showFlash("Zadané datumy neodpovídají intervalu!", "error");
                                break;
                            }
                        }
                    }
                    var nedoplatkyForm = this.findForms("nedoplatkyForm");
                    var dateForm = this.findForms("dateForm");
                    var ned_od = nedoplatkyForm.findFields("ned_od").gfield("getValue");
                    var ned_do = nedoplatkyForm.findFields("ned_do").gfield("getValue");
                    if (ned_od >= ned_do) {
                        this.showFlash("DO musí být větší než OD!", "error");
                        goesThrough = false;
                    }
                    var datum = dateForm.findFields("datum").gfield("getValue");
                    if (goesThrough == true)
                        that.close({ ned_od, ned_do, datum, intervalVals });
                }
            };
            GRozboryDetail = __decorate([
                Decorators.gcontent
            ], GRozboryDetail);
            WebClient.GRozboryDetail = GRozboryDetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvemJvcnlEZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUm96Ym9yeURldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTRMZjtBQTVMRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0TG5CO0lBNUxnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0TDdCO1FBNUxvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQUdZLFdBQU0sR0FBUSxFQUFFLENBQUM7b0JBR2xCLGNBQVMsR0FBUSxFQUFFLENBQUM7b0JBRXBCLFNBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBZ0x6QyxDQUFDO2dCQTlLRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFFN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxJQUFJOzRCQUNiLHNCQUFzQjs0QkFDdEIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDakMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUks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Q0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxXQUFXLElBQUksSUFBSTt3QkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztnQkFDakYsQ0FBQzthQUNKLENBQUE7WUF4TFksY0FBYztnQkFEMUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxjQUFjLENBd0wxQjtZQXhMWSx3QkFBYyxpQkF3TDFCLENBQUE7UUFDTCxDQUFDLEVBNUxvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0TDdCO0lBQUQsQ0FBQyxFQTVMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNExuQjtBQUFELENBQUMsRUE1TFMsTUFBTSxLQUFOLE1BQU0sUUE0TGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1JvemJvcnlEZXRhaWwudHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gZGVmaW5pY2Ugcm96Ym9yxa8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTAyLTI4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm96Ym9yeURldGFpbCBleHRlbmRzIEdDb250ZW50QmFzZSB7ICAgICBcclxuXHJcbiAgICAgICAgdGVtYTogU3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnRlcnZhbHM6IGFueSA9IFtdO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIudGVtYSA9IHRoaXMudGVtYTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2tcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPayFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5lZG9wbGF0a3lGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJuZWRvcGxhdGt5Rm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC01LTctMCwgTS01LTctMCwgUy01LTctMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlbDvcWhZSBuZWRvcGxhdGvFr1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5lZF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZWRfZG9cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRhdGVGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTctNS0wLCBNLTctNS0wLCBTLTctNS0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSB2w71wb8SNdHVcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdHVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImludGVydmFsRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsSMYXNvdsOpIGludGVydmFseVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgYnV0dG9uRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiYnV0dG9uRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMiwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5BZGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ0bkFrdEFkZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUludGVydmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImJ0bkRlbGV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnRuQWt0RGVsZXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNtYXphdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZW1vdmVJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZWRvcGxhdGt5Rm9ybSk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZGF0ZUZvcm0pO1xyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGludGVydmFsRm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIzNSVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5pbnRlcnZhbHMsICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFLZXk6IFwiaWRcIixcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLCBcclxuICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dIZWFkZXJSb3c6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBidXR0b25Gb3JtKTtcclxuXHJcbiAgICAgICAgICAgICQoXCJbZGF0YS1wYXJhbS1pZD0nYnRuQWRkJ11cIikuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpOyAgXHJcbiAgICAgICAgICAgICQoXCJbZGF0YS1wYXJhbS1pZD0nYnRuRGVsZXRlJ11cIikuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpOyAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3DFmWlkw6Fuw60gaW50ZXJ2YWx1IGRvIGdyaWR1XHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVJbnRlcnZhbCgpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRhdHVtID0gdGhpcy5maW5kRm9ybXMoXCJpbnRlcnZhbEZvcm1cIikuZmluZEZpZWxkcyhcImRhdHVtXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgaGlnaGVzdElEID0gdGhpcy5pbnRlcnZhbHMucmVkdWNlKChtYXgsIGl0ZW0pID0+IChpdGVtLmlkID4gbWF4ID8gaXRlbS5pZCA6IG1heCksIDApO1xyXG4gICAgICAgICAgICBpZiAoaGlnaGVzdElEICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBoaWdoZXN0RGF0dW0gPSB0aGlzLmludGVydmFscy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaGlnaGVzdElEKS5kYXR1bTtcclxuICAgICAgICAgICAgICAgIGlmIChoaWdoZXN0RGF0dW0gPj0gZGF0dW0pIHsvL3Bva3VkIGplIG5vdsSbIHphZGFuw70gZGF0dW0gbWVuxaHDrSBuZcW+IGFrdHVhbG7EmyBuZWp2xJt0xaHDrSBkYXR1bSB2IGludGVydmFsdSwgZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcIlphZGFuw70gZGF0dW0gbmVvZHBvdsOtZMOhIGludGVydmFsdSFcIiwgXCJlcnJvclwiKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVydmFscy5wdXNoKHsgaWQ6IGhpZ2hlc3RJRCArIDEsIGRhdHVtOiBkYXR1bSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vamUgcHJ2bsOtIHDFmWlkw6FuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFscy5wdXNoKHsgaWQ6IDEsIGRhdHVtOiBkYXR1bSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMuaW50ZXJ2YWxzLCB7IGtleTogXCJpZFwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9vZHN0cmFuxJtuw60gaW50ZXJ2YWx1IHogZ3JpZHVcclxuICAgICAgICBwcml2YXRlIHJlbW92ZUludGVydmFsKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhpcy5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uWzBdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpZFRvRGVsZXRlID0gc2VsZWN0aW9uWzBdLmlkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFscyA9IHRoaXMuaW50ZXJ2YWxzLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT09IGlkVG9EZWxldGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5pbnRlcnZhbHMsIHsga2V5OiBcImlkXCIgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0dW1cIiwgY2FwdGlvbjogXCJEYXR1bVwiIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBnb2VzVGhyb3VnaCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgaW50ZXJ2YWxWYWxzID0gdGhpcy5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGludGVydmFsVmFscy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGludGVydmFsVmFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcnZhbFZhbHNbaV0uZGF0dW0gPCBpbnRlcnZhbFZhbHNbaSAtIDFdLmRhdHVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvZXNUaHJvdWdoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiWmFkYW7DqSBkYXR1bXkgbmVvZHBvdsOtZGFqw60gaW50ZXJ2YWx1IVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG5lZG9wbGF0a3lGb3JtID0gdGhpcy5maW5kRm9ybXMoXCJuZWRvcGxhdGt5Rm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdGVGb3JtID0gdGhpcy5maW5kRm9ybXMoXCJkYXRlRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIG5lZF9vZCA9IG5lZG9wbGF0a3lGb3JtLmZpbmRGaWVsZHMoXCJuZWRfb2RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBuZWRfZG8gPSBuZWRvcGxhdGt5Rm9ybS5maW5kRmllbGRzKFwibmVkX2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5lZF9vZCA+PSBuZWRfZG8pIHsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcIkRPIG11c8OtIGLDvXQgdsSbdMWhw60gbmXFviBPRCFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIGdvZXNUaHJvdWdoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkYXR1bSA9IGRhdGVGb3JtLmZpbmRGaWVsZHMoXCJkYXR1bVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKGdvZXNUaHJvdWdoID09IHRydWUpIHRoYXQuY2xvc2UoeyBuZWRfb2QsIG5lZF9kbywgZGF0dW0sIGludGVydmFsVmFscyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19