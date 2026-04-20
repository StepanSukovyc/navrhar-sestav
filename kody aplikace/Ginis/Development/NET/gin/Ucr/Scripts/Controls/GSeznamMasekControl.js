"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * GSeznamMasekControl
             * Navratovou hodnotou je GUcrMaskaDto
             *
             * @author bmartinek
             * @since 482.1.0.2
             */
            let GSeznamMasekControl = class GSeznamMasekControl extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GUcrSeznamMasekControl#";
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                }
                prepareContent(options) {
                    let that = this;
                    this.options = options;
                    this.srv = new WebClient.GUcrMaskaService(options.serviceOptions);
                    this.okAct = this.actions.add({
                        name: "okAct",
                        caption: GDlg.mbbOk.text,
                        run: (ev, ctx) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            let sel = grid.ggrid("getSelection");
                            if (!sel)
                                return;
                            // nutno dohledat elementy
                            this.srv.read(sel[0].ixs_mas).then((maska) => {
                                this.close(maska);
                            });
                        }
                    });
                    this.commandBar([{
                            action: this.okAct,
                            primary: true
                        }, {
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbCancel.text,
                                run: (ev, ctx) => { this.close(); }
                            })
                        }]);
                    this.menuBar([{
                            action: new GAction({
                                name: "newMaskaAct",
                                icon: "gi-plus",
                                caption: "jres:31100204", //RC 31100204 : Nový
                                run: (ev, ctx) => { this.newMaska(); }
                            }),
                            favorite: true
                        }, {
                            action: new GAction({
                                name: "copyMaskaAct",
                                caption: "jres:31100205", //RC 31100205 : Kopie
                                run: (ev, ctx) => { this.copyMaska(); }
                            }),
                            favorite: true
                        }, {
                            action: new GAction({
                                name: "detailAct",
                                icon: "gi-detail",
                                caption: "jres:31100156", //RC 31100156 : Detail
                                run: (ev, ctx) => { this.showDetail(); }
                            }),
                            favorite: true
                        }]);
                    $("<div>").appendTo(this.element)
                        .gform("createFrom", this.createFilterForm())
                        .on("fieldchange", () => { this.getData(); });
                    const grid = $.newDiv(this.classGrid).appendTo(this.element)
                        .ggrid({
                        columns: this.createGridFormat(),
                        defaultAction: this.okAct,
                        data: []
                    })
                        .gautofit();
                    this.getData()
                        .then(() => {
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        if (this.options.ixs_mas)
                            grid.ggrid("activeRow", this.options.ixs_mas);
                    }); //Ozn. vybrane masky, pokud je k dispozici
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                createFilterForm() {
                    return new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" })
                        .addSection()
                        .addRow("Filtry")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", initialValue: { aktivita: 100 }, model: "model.aktivita=value.aktivita" })
                        .addSection()
                        .addRow("Typ filtru")
                        .addField("gradio", {
                        name: "typ_masky",
                        initialValue: 10,
                        radios: [
                            { value: -1, label: "jres:31100201" }, //RC 31100201 : Vše
                            { value: 0 /* Gordic.Gin.Interface.TypMaskyEnum.Verejna */, label: "jres:31100143" }, //RC 31100143 : Veřejná
                            { value: 10 /* Gordic.Gin.Interface.TypMaskyEnum.Soukroma */, label: "jres:31100003" } //RC 31100003 : Osobní
                        ]
                    });
                }
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "typ_masky", caption: "",
                        iconTemplate: (d) => {
                            if (d.typ_masky === 10 /* Gordic.Gin.Interface.TypMaskyEnum.Soukroma */)
                                return { icon: "fa-user" };
                            else if (d.typ_masky === 0 /* Gordic.Gin.Interface.TypMaskyEnum.Verejna */)
                                return { icon: "fa-users" };
                            else
                                return null;
                        }
                    })
                        .addTextColumn({ name: "gfilterpanel_name", caption: "jres:31100019" }) //RC 31100019 : Název
                        .addTextColumn({ name: "zkratka", caption: "jres:31100114" }) //RC 31100114 : Zkratka
                        .addTextColumn({ name: "gfilterpanel_poznamka", caption: "jres:31100014" }); //RC 31100014 : Poznámka
                }
                getData() {
                    const that = this;
                    return this.findForms().gform("waitForValues")
                        .then(() => {
                        let d = {};
                        this.findFields().gfield("model", "collect", d);
                        d.typ_masky = Number(d.typ_masky);
                        if (d.typ_masky === -1)
                            delete d.typ_masky;
                        this.srv.typ_masky = d.typ_masky;
                        this.srv.aktitiva = d.aktivita;
                        this.beginOperation();
                        return this.srv.getFilters(d)
                            .then((data) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggrid("setData", new Gordic.Data.View(data, { key: "ixs_mas" }));
                        })
                            .always(() => { this.endOperation(); });
                    });
                }
                showDetail() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let sel = grid.ggrid("getSelection");
                    if (!sel)
                        return;
                    let options = $.extend({}, this.options);
                    options.maska = sel[0];
                    this.openFilterDetails(options);
                }
                newMaska() {
                    let options = $.extend({}, this.options);
                    delete options.maska;
                    this.openFilterDetails(options);
                }
                copyMaska() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let sel = grid.ggrid("getSelection");
                    if (!sel)
                        return;
                    let options = $.extend({}, this.options);
                    options.maska = $.extend({}, sel[0]);
                    options.maska.gfilterpanel_name = options.maska.gfilterpanel_name + " jres:31100207"; //RC 31100207 : (kopie)
                    options.maska.tema = "COPY";
                    //delete options.maska.ixs_mas;
                    this.openFilterDetails(options);
                }
                openFilterDetails(options) {
                    let dlg = this.dialogs.showModalWindow(Gordic.Ucr.WebClient.GUcrMaskaDetail, options, { width: 600, height: 400, title: "jres:31100206" }); //RC 31100206 : Detail filtru
                    dlg.on("close", (ev, r) => { if (r)
                        this.getData(); });
                }
            };
            GSeznamMasekControl = __decorate([
                Decorators.gcontent
            ], GSeznamMasekControl);
            WebClient.GSeznamMasekControl = GSeznamMasekControl;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbU1hc2VrQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1NYXNla0NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXlOZjtBQXpORCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5Tm5CO0lBek5nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5TjdCO1FBek5vQixXQUFBLFNBQVM7WUFZMUI7Ozs7OztlQU1HO1lBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFNSSxRQUFHLEdBQUcseUJBQXlCLENBQUM7b0JBQ2hDOzt1QkFFRztvQkFDTyxjQUFTLEdBQVcsY0FBYyxDQUFDO2dCQTBMakQsQ0FBQztnQkF6TEcsY0FBYyxDQUFDLE9BQW9DO29CQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksVUFBQSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRXhELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQzFCLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7d0JBQ3hCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7Z0NBQUUsT0FBTzs0QkFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBZSxjQUFjLENBQUMsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLEdBQUc7Z0NBQ0os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QUF1QjtvQkFDN0csT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUM1QiwrQkFBK0I7b0JBRS9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFFTyxpQkFBaUIsQ0FBQyxPQUFnQztvQkFDdEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtvQkFDekssR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFHLENBQUM7d0JBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7YUFDSixDQUFBO1lBcE1ZLG1CQUFtQjtnQkFEL0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxtQkFBbUIsQ0FvTS9CO1lBcE1ZLDZCQUFtQixzQkFvTS9CLENBQUE7UUFDTCxDQUFDLEVBek5vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5TjdCO0lBQUQsQ0FBQyxFQXpOZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeU5uQjtBQUFELENBQUMsRUF6TlMsTUFBTSxLQUFOLE1BQU0sUUF5TmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdTZXpuYW1NYXNla0NvbnRyb2xPcHRpb25zIGV4dGVuZHMgSUdVY3JNYXNrYURldGFpbE9wdGlvbnMge1xyXG4gICAgICAgIC8qKiBJRCBtYXNreSwga3RlcmEgbWEgYnl0IHByZWR2eWJyYW5hIHYgZ3JpZHUgKi9cclxuICAgICAgICBpeHNfbWFzPzogc3RyaW5nfG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJmYWNlIElHU2V6bmFtTWFzZWtGaWx0ZXJEdG8ge1xyXG4gICAgICAgIGFrdGl2aXRhOiBudW1iZXI7XHJcbiAgICAgICAgdHlwX21hc2t5PzogR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwTWFza3lFbnVtIHwgbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR1Nlem5hbU1hc2VrQ29udHJvbFxyXG4gICAgICogTmF2cmF0b3ZvdSBob2Rub3RvdSBqZSBHVWNyTWFza2FEdG9cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBibWFydGluZWtcclxuICAgICAqIEBzaW5jZSA0ODIuMS4wLjJcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtTWFzZWtDb250cm9sIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICBwcml2YXRlIG9wdGlvbnM6IElHU2V6bmFtTWFzZWtDb250cm9sT3B0aW9ucztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzcnY6IEdVY3JNYXNrYVNlcnZpY2U7XHJcbiAgICAgICAgLy9wcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIG9rQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHVpZCA9IFwiR1VjclNlem5hbU1hc2VrQ29udHJvbCNcIjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0cmlkYSBncmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjbGFzc0dyaWQ6IHN0cmluZyA9IFwianMtZ3JpZC1iYXNlXCI7XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdTZXpuYW1NYXNla0NvbnRyb2xPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5zcnYgPSBuZXcgR1Vjck1hc2thU2VydmljZShvcHRpb25zLnNlcnZpY2VPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub2tBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwib2tBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiT2sudGV4dCxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZDxHVWNyTWFza2FEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbnV0bm8gZG9obGVkYXQgZWxlbWVudHlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNydi5yZWFkKHNlbFswXS5peHNfbWFzISkudGhlbigobWFza2EpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShtYXNrYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLm9rQWN0LFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsb3NlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDYW5jZWwudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZXdNYXNrYUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIwNFwiLCAvL1JDIDMxMTAwMjA0IDogTm92w71cclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMubmV3TWFza2EoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvcHlNYXNrYUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIwNVwiLCAvL1JDIDMxMTAwMjA1IDogS29waWVcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuY29weU1hc2thKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXRhaWxBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE1NlwiLCAvL1JDIDMxMTAwMTU2IDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dEZXRhaWwoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhpcy5jcmVhdGVGaWx0ZXJGb3JtKCkpXHJcbiAgICAgICAgICAgICAgICAub24oXCJmaWVsZGNoYW5nZVwiLCAoKSA9PiB7IHRoaXMuZ2V0RGF0YSgpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdVY3JNYXNrYUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMub2tBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5peHNfbWFzKSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHRoaXMub3B0aW9ucy5peHNfbWFzKVxyXG4gICAgICAgICAgICAgICAgfSk7IC8vT3puLiB2eWJyYW5lIG1hc2t5LCBwb2t1ZCBqZSBrIGRpc3BvemljaVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwifSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJGaWx0cnlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwgeyBuYW1lOiBcImFrdGl2aXRhXCIsIGluaXRpYWxWYWx1ZTogeyBha3Rpdml0YTogMTAwIH0sIG1vZGVsOiBcIm1vZGVsLmFrdGl2aXRhPXZhbHVlLmFrdGl2aXRhXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgZmlsdHJ1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX21hc2t5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogLTEsIGxhYmVsOiBcImpyZXM6MzExMDAyMDFcIn0sIC8vUkMgMzExMDAyMDEgOiBWxaFlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cE1hc2t5RW51bS5WZXJlam5hLCBsYWJlbDogXCJqcmVzOjMxMTAwMTQzXCIgfSwgLy9SQyAzMTEwMDE0MyA6IFZlxZllam7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBNYXNreUVudW0uU291a3JvbWEsIGxhYmVsOiBcImpyZXM6MzExMDAwMDNcIiB9IC8vUkMgMzExMDAwMDMgOiBPc29ibsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHVWNyTWFza2FEdG8+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdVY3JNYXNrYUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX21hc2t5XCIsIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC50eXBfbWFza3kgPT09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cE1hc2t5RW51bS5Tb3Vrcm9tYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtdXNlclwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGQudHlwX21hc2t5ID09PSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBNYXNreUVudW0uVmVyZWpuYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtdXNlcnNcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImdmaWx0ZXJwYW5lbF9uYW1lXCIsIGNhcHRpb246IFwianJlczozMTEwMDAxOVwiIH0pIC8vUkMgMzExMDAwMTkgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6a3JhdGthXCIsIGNhcHRpb246IFwianJlczozMTEwMDExNFwiIH0pIC8vUkMgMzExMDAxMTQgOiBaa3JhdGthXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZ2ZpbHRlcnBhbmVsX3Bvem5hbWthXCIsIGNhcHRpb246IFwianJlczozMTEwMDAxNFwiIH0pOyAvL1JDIDMxMTAwMDE0IDogUG96bsOhbWthXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldERhdGEoKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZCA9IHt9IGFzIElHU2V6bmFtTWFzZWtGaWx0ZXJEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQudHlwX21hc2t5ID0gTnVtYmVyKGQudHlwX21hc2t5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZC50eXBfbWFza3kgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZC50eXBfbWFza3k7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3J2LnR5cF9tYXNreSA9IGQudHlwX21hc2t5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3J2LmFrdGl0aXZhID0gZC5ha3Rpdml0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNydi5nZXRGaWx0ZXJzKGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgbmV3IEdvcmRpYy5EYXRhLlZpZXc8R1Vjck1hc2thRHRvPihkYXRhLCB7IGtleTogXCJpeHNfbWFzXCIgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTsgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd0RldGFpbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZDxHVWNyTWFza2FEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXNlbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXNrYSA9IHNlbFswXTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRmlsdGVyRGV0YWlscyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmV3TWFza2EoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLm1hc2thO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vcGVuRmlsdGVyRGV0YWlscyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29weU1hc2thKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPEdVY3JNYXNrYUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmICghc2VsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXNrYSA9ICQuZXh0ZW5kKHt9LCBzZWxbMF0pO1xyXG4gICAgICAgICAgICBvcHRpb25zLm1hc2thLmdmaWx0ZXJwYW5lbF9uYW1lID0gb3B0aW9ucy5tYXNrYS5nZmlsdGVycGFuZWxfbmFtZSArIFwiIGpyZXM6MzExMDAyMDdcIjsgLy9SQyAzMTEwMDIwNyA6IChrb3BpZSlcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXNrYS50ZW1hID0gXCJDT1BZXCI7XHJcbiAgICAgICAgICAgIC8vZGVsZXRlIG9wdGlvbnMubWFza2EuaXhzX21hcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMub3BlbkZpbHRlckRldGFpbHMob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9wZW5GaWx0ZXJEZXRhaWxzKG9wdGlvbnM6IElHVWNyTWFza2FEZXRhaWxPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBkbGcgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JNYXNrYURldGFpbCwgb3B0aW9ucywgeyB3aWR0aDogNjAwLCBoZWlnaHQ6IDQwMCwgdGl0bGU6IFwianJlczozMTEwMDIwNlwiIH0pOyAvL1JDIDMxMTAwMjA2IDogRGV0YWlsIGZpbHRydVxyXG4gICAgICAgICAgICBkbGcub24oXCJjbG9zZVwiLCAoZXYsIHIpID0+IHsgaWYocikgdGhpcy5nZXREYXRhKCkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19