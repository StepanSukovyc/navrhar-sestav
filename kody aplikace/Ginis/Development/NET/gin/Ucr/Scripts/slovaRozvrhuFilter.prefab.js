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
            var Prefabs;
            (function (Prefabs) {
                function slovaRozvrhuFilter(options) {
                    return $.extend({
                        selector: function (opts) {
                            let def = $.Deferred();
                            /*let field = $(this);*/
                            let selectorOptions = {
                                data: $(this).gfield("getValue"), // options.data,
                                id: "GSlovaRozvrhuFilterSelector#"
                            };
                            var dlg = $.content(this).dialogs.showModalWindow(Prefabs.GStrukturovanyPopisFilterSelector, selectorOptions, { title: "jres:31100223" }); //RC 31100223 : Filtr dle str. popisu
                            dlg.on("close", (ev, d) => {
                                dlg.remove();
                                if (d && d.data)
                                    def.resolve(d.data);
                                else
                                    def.reject();
                            });
                            return def.promise();
                        },
                        graphicInput: "hidden",
                        itemTemplate: (d) => {
                            if (!d || !d.length)
                                return null;
                            let elm = $("<div>");
                            let isFirst = true;
                            for (var i = 0; i < d.length; i++) {
                                let f = d[i];
                                if (!f.hodnota)
                                    continue;
                                elm.append(`<div style='display:inline-block;margin-left:${(isFirst ? "0" : "0.25rem")};'><span class='g-eko-cfu-elm-caption'>${f.klic}</span><span class='g-eko-cfu-elm-value'>=${f.hodnota}</span></div>`);
                                isFirst = false;
                            }
                            return elm;
                        },
                        itemTooltipTemplate: (d) => {
                            if (!d || !d.length)
                                return null;
                            let isFirst = true;
                            let elm = $("<table style='border-collapse: collapse; border: 1px solid white;'>");
                            for (var i = 0; i < d.length; i++) {
                                let f = d[i];
                                if (!f.hodnota)
                                    continue;
                                if (isFirst) {
                                    elm.append("<tr><th style='border: 1px solid white;padding: 0.25rem;'>jres:31100215</th><th style='border: 1px solid white;padding: 0.25rem;'>jres:31100019</th><th style='border: 1px solid white;padding: 0.25rem;'>jres:31100216</th></tr>"); //RC 31100216 : Hodnota
                                    isFirst = false;
                                }
                                elm.append(`<tr><td style='border: 1px solid white;padding: 0.25rem;'>${f.klic}</td><td style='border: 1px solid white;padding: 0.25rem;'>${f.klic_txt}</td><td style='border: 1px solid white;padding: 0.25rem;'>${f.hodnota}</td></tr>`);
                            }
                            if (elm.is(":empty"))
                                return null;
                            return elm[0].outerHTML;
                        },
                        buttons: [{
                                action: new GAction({
                                    name: "clearElmAct",
                                    icon: "gi-window-close",
                                    run: (ev, ctx) => {
                                        let field = $(ev.target).closest(".gfield");
                                        let strPopis = field.gfield("getValue");
                                        for (var i = 0; i < strPopis.length; i++)
                                            strPopis[i].hodnota = undefined;
                                        field.gfield("clear").gfield("setValue", strPopis);
                                    }
                                })
                            }]
                    }, options);
                }
                Prefabs.slovaRozvrhuFilter = slovaRozvrhuFilter;
                let GSlovaRozvrhuFilterFilterSelector = class GSlovaRozvrhuFilterFilterSelector extends Gordic.GContentBase {
                    constructor() {
                        super(...arguments);
                        //private grid: JQuery;
                        /**
                         * trida gridu
                         */
                        this.classGrid = "js-grid-base";
                    }
                    //private options: GStrukturovanyPopisFilterSelectorOptions;
                    prepareContent(options) {
                        let data = options.data ? $.Deferred().resolve($.extend(true, [], options.data)).promise()
                            : this.createServiceContent("Gordic.Ucr.WebClient.GSeznamEkoZaznamu")
                                .call("GetCFUWords");
                        const that = this;
                        this.commandBar([{
                                customClass: "g-button--primary",
                                action: new GAction({
                                    name: "actChoice",
                                    caption: GDlg.mbbOk.text,
                                    run: (ev) => {
                                        let grid = that.getGrid();
                                        if (grid == null)
                                            return;
                                        let r = {
                                            data: this.getData(),
                                            selected: options.selectable
                                                //? this.grid.ggrid<GSlovaRozvrhFilterDto>("getSelection",false, true).map((s) => { return s.klic!; })
                                                ? grid.ggrid("getSelection", false, true)
                                                : undefined
                                        };
                                        this.close(r);
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "actClose",
                                    caption: GDlg.mbbClose.text,
                                    run: (ev) => { this.close(); }
                                })
                            }]);
                        let gf = new Gordic.Data.GridFormat()
                            .addTextColumn({ name: "klic", caption: "jres:30250592" }) //RC 30250592 : Slovo
                            .addTextColumn({ name: "klic_txt", caption: "jres:30250593" }); //RC 30250593 : Popis
                        if (!options.selectable)
                            gf.addTextColumn({
                                name: "hodnota",
                                caption: "jres:31100216", //RC 31100216 : Hodnota
                                editor: {
                                    widget: "gstringbox",
                                    options: { name: "hodnota" }
                                }
                            });
                        const grid = $.newDiv(this.classGrid)
                            .appendTo(this.element)
                            .gautofit()
                            .ggrid({
                            data: new Gordic.Data.View(data, { key: "klic" }),
                            columns: gf,
                            multi: options.selectable
                        });
                        if (!options.selectable)
                            grid.ggridcelleditor();
                        else if (options.selected) {
                            data.then((r) => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                let dv = grid.ggrid("getView");
                                let metas = dv.getDataRows(true);
                                debugger;
                                if (!options.selected)
                                    return;
                                for (var i = 0; i < metas.length; i++) {
                                    let meta = metas[i];
                                    for (var j = 0; j < options.selected.length; j++) {
                                        let item = options.selected[j];
                                        if (item.klic == meta.data.klic)
                                            meta.checked = true;
                                    }
                                }
                                grid.ggrid("refresh");
                                return;
                            });
                        }
                    }
                    /**
                     * Vraci objekt gridu
                     * @returns
                    */
                    getGrid() {
                        var data = this.element.find("." + this.classGrid);
                        return (data.length == 0 ? null : data);
                    }
                    getData() {
                        let grid = this.getGrid();
                        if (grid == null)
                            return [];
                        if (grid.hasClass("ggridcelleditor"))
                            grid.ggridcelleditor("stop");
                        return grid.ggrid("getView").getRows();
                    }
                };
                GSlovaRozvrhuFilterFilterSelector = __decorate([
                    Decorators.gcontent
                ], GSlovaRozvrhuFilterFilterSelector);
                Prefabs.GSlovaRozvrhuFilterFilterSelector = GSlovaRozvrhuFilterFilterSelector;
            })(Prefabs = WebClient.Prefabs || (WebClient.Prefabs = {}));
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xvdmFSb3p2cmh1RmlsdGVyLnByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNsb3ZhUm96dnJodUZpbHRlci5wcmVmYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTRNZjtBQTVNRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0TW5CO0lBNU1nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0TTdCO1FBNU1vQixXQUFBLFNBQVM7WUFBQyxJQUFBLE9BQU8sQ0E0TXJDO1lBNU04QixXQUFBLE9BQU87Z0JBcUJsQyxTQUFnQixrQkFBa0IsQ0FBQyxPQUFtQztvQkFFbEUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUNaLFFBQVEsRUFBRSxVQUE2QixJQUFJOzRCQUN2QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3ZCLHdCQUF3Qjs0QkFDeEIsSUFBSSxlQUFlLEdBQTZDO2dDQUM1RCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxnQkFBZ0I7Z0NBQ2xELEVBQUUsRUFBRSw4QkFBOEI7NkJBQ3JDLENBQUM7NEJBRUYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQUEsaUNBQWlDLEVBQUUsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUM7NEJBQ3hLLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQWtELEVBQUUsRUFBRTtnQ0FDdkUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO29DQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFD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bUJBQ1AsaUNBQWlDLENBdUc3QztnQkF2R1kseUNBQWlDLG9DQXVHN0MsQ0FBQTtZQUNMLENBQUMsRUE1TThCLE9BQU8sR0FBUCxpQkFBTyxLQUFQLGlCQUFPLFFBNE1yQztRQUFELENBQUMsRUE1TW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTRNN0I7SUFBRCxDQUFDLEVBNU1nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0TW5CO0FBQUQsQ0FBQyxFQTVNUyxNQUFNLEtBQU4sTUFBTSxRQTRNZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTbG92YVJvenZyaHVGaWx0ZXJPcHRpb25zIGV4dGVuZHMgR1NlbGVjdEJveE9wdGlvbnM8R1Nsb3ZhUm96dnJoRmlsdGVyRHRvW10+IHtcclxuICAgICAgICAvL2RhdGE6IEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Nsb3ZhUm96dnJodUZpbHRlck9wdGlvbnMge1xyXG4gICAgICAgIGRhdGE6IEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgICAgIGlkPzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBWIGdyaWR1IGx6ZSB2eWJpcmF0IGplZG5vdGxpdmUgaG9kbm90eSAqL1xyXG4gICAgICAgIHNlbGVjdGFibGU/OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBWIHByaXBhZGUsIHplIGplIGVkaXRhYmxlPXRydWUsIHZ5YnJhbmUgcmFka3kgdiBncmlkdSBvem5hY2kgKi9cclxuICAgICAgICBzZWxlY3RlZD86IEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Nsb3ZhUm96dnJodUZpbHRlclNlbGVjdG9yT3B0aW9uc091dHB1dCB7XHJcbiAgICAgICAgZGF0YTogR1Nsb3ZhUm96dnJoRmlsdGVyRHRvW107XHJcbiAgICAgICAgLyoqIFYgcHJpcGFkZSwgemUgYnlsIHNlbGVjdG9yIHYgZWRpdG92YXRlbG5lbSBtb2R1LCBzZW0gaG9kaSBwb2xlIHN0cmluZ3UgcyBrbGljaSB2eWJyYW55Y2ggcmFka3UgKi9cclxuICAgICAgICBzZWxlY3RlZD86IEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzbG92YVJvenZyaHVGaWx0ZXIob3B0aW9uczogSVNsb3ZhUm96dnJodUZpbHRlck9wdGlvbnMpOiBHU2VsZWN0Qm94T3B0aW9uczxHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKHRoaXM6IEhUTUxFbGVtZW50LCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgLypsZXQgZmllbGQgPSAkKHRoaXMpOyovXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0b3JPcHRpb25zOiBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyU2VsZWN0b3JPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksIC8vIG9wdGlvbnMuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJHU2xvdmFSb3p2cmh1RmlsdGVyU2VsZWN0b3IjXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBkbGcgPSAkLmNvbnRlbnQodGhpcykuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlclNlbGVjdG9yLCBzZWxlY3Rvck9wdGlvbnMsIHsgdGl0bGU6IFwianJlczozMTEwMDIyM1wiIH0pOyAvL1JDIDMxMTAwMjIzIDogRmlsdHIgZGxlIHN0ci4gcG9waXN1XHJcbiAgICAgICAgICAgICAgICBkbGcub24oXCJjbG9zZVwiLCAoZXYsIGQ/OiBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyU2VsZWN0b3JPcHRpb25zT3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGxnLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkICYmIGQuZGF0YSkgZGVmLnJlc29sdmUoZC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGQ6IEdTbG92YVJvenZyaEZpbHRlckR0b1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWQgfHwgIWQubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBlbG0gPSAkKFwiPGRpdj5cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNGaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZiA9IGRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmLmhvZG5vdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsbS5hcHBlbmQoYDxkaXYgc3R5bGU9J2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1sZWZ0OiR7KGlzRmlyc3QgPyBcIjBcIiA6IFwiMC4yNXJlbVwiKX07Jz48c3BhbiBjbGFzcz0nZy1la28tY2Z1LWVsbS1jYXB0aW9uJz4ke2Yua2xpY308L3NwYW4+PHNwYW4gY2xhc3M9J2ctZWtvLWNmdS1lbG0tdmFsdWUnPj0ke2YuaG9kbm90YX08L3NwYW4+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBlbG07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGl0ZW1Ub29sdGlwVGVtcGxhdGU6IChkOiBHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkIHx8ICFkLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCBpc0ZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBlbG0gPSAkKFwiPHRhYmxlIHN0eWxlPSdib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTsnPlwiKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSBkW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZi5ob2Rub3RhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmlyc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtLmFwcGVuZChcIjx0cj48dGggc3R5bGU9J2JvcmRlcjogMXB4IHNvbGlkIHdoaXRlO3BhZGRpbmc6IDAuMjVyZW07Jz5qcmVzOjMxMTAwMjE1PC90aD48dGggc3R5bGU9J2JvcmRlcjogMXB4IHNvbGlkIHdoaXRlO3BhZGRpbmc6IDAuMjVyZW07Jz5qcmVzOjMxMTAwMDE5PC90aD48dGggc3R5bGU9J2JvcmRlcjogMXB4IHNvbGlkIHdoaXRlO3BhZGRpbmc6IDAuMjVyZW07Jz5qcmVzOjMxMTAwMjE2PC90aD48L3RyPlwiKTsgLy9SQyAzMTEwMDIxNiA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxtLmFwcGVuZChgPHRyPjx0ZCBzdHlsZT0nYm9yZGVyOiAxcHggc29saWQgd2hpdGU7cGFkZGluZzogMC4yNXJlbTsnPiR7Zi5rbGljfTwvdGQ+PHRkIHN0eWxlPSdib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtwYWRkaW5nOiAwLjI1cmVtOyc+JHtmLmtsaWNfdHh0fTwvdGQ+PHRkIHN0eWxlPSdib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtwYWRkaW5nOiAwLjI1cmVtOyc+JHtmLmhvZG5vdGF9PC90ZD48L3RyPmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbG0uaXMoXCI6ZW1wdHlcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsbVswXS5vdXRlckhUTUw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyRWxtQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZCA9ICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmaWVsZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0clBvcGlzID0gZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgR1Nsb3ZhUm96dnJoRmlsdGVyRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0clBvcGlzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyUG9waXNbaV0uaG9kbm90YSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcImNsZWFyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHN0clBvcGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nsb3ZhUm96dnJodUZpbHRlckZpbHRlclNlbGVjdG9yIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICAvL3ByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRyaWRhIGdyaWR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNsYXNzR3JpZDogc3RyaW5nID0gXCJqcy1ncmlkLWJhc2VcIjtcclxuICAgICAgICAvL3ByaXZhdGUgb3B0aW9uczogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlclNlbGVjdG9yT3B0aW9ucztcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogR1Nsb3ZhUm96dnJodUZpbHRlck9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGEgPyAkLkRlZmVycmVkPEdTbG92YVJvenZyaEZpbHRlckR0b1tdPigpLnJlc29sdmUoJC5leHRlbmQodHJ1ZSxbXSxvcHRpb25zLmRhdGEpKS5wcm9taXNlKClcclxuICAgICAgICAgICAgICAgIDogdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGw8R1Nsb3ZhUm96dnJoRmlsdGVyRHRvW10+KFwiR2V0Q0ZVV29yZHNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoXHJcbiAgICAgICAgICAgICAgICBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2hvaWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiT2sudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcjogR1Nsb3ZhUm96dnJodUZpbHRlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5nZXREYXRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG9wdGlvbnMuc2VsZWN0YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLz8gdGhpcy5ncmlkLmdncmlkPEdTbG92YVJvenZyaEZpbHRlckR0bz4oXCJnZXRTZWxlY3Rpb25cIixmYWxzZSwgdHJ1ZSkubWFwKChzKSA9PiB7IHJldHVybiBzLmtsaWMhOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGdyaWQuZ2dyaWQ8R1Nsb3ZhUm96dnJoRmlsdGVyRHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHU2xvdmFSb3p2cmhGaWx0ZXJEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJrbGljXCIsIGNhcHRpb246IFwianJlczozMDI1MDU5MlwiIH0pIC8vUkMgMzAyNTA1OTIgOiBTbG92b1xyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImtsaWNfdHh0XCIsIGNhcHRpb246IFwianJlczozMDI1MDU5M1wiIH0pOyAvL1JDIDMwMjUwNTkzIDogUG9waXNcclxuXHJcbiAgICAgICAgICAgIGlmKCFvcHRpb25zLnNlbGVjdGFibGUpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhvZG5vdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTZcIiwgLy9SQyAzMTEwMDIxNiA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogeyBuYW1lOiBcImhvZG5vdGFcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldzxHU2xvdmFSb3p2cmhGaWx0ZXJEdG8+KGRhdGEsIHsga2V5OiBcImtsaWNcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBnZixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogb3B0aW9ucy5zZWxlY3RhYmxlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5zZWxlY3RhYmxlKSBncmlkLmdncmlkY2VsbGVkaXRvcigpO1xyXG5cclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR2ID0gZ3JpZC5nZ3JpZDxHU2xvdmFSb3p2cmhGaWx0ZXJEdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YXMgPSBkdi5nZXREYXRhUm93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2VsZWN0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRhcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YSA9IG1ldGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9wdGlvbnMuc2VsZWN0ZWQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gb3B0aW9ucy5zZWxlY3RlZFtqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmtsaWMgPT0gbWV0YS5kYXRhLmtsaWMhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwicmVmcmVzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGF0YSgpOiBHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXSB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiBbXTtcclxuICAgICAgICAgICAgaWYgKGdyaWQuaGFzQ2xhc3MoXCJnZ3JpZGNlbGxlZGl0b3JcIikpIGdyaWQuZ2dyaWRjZWxsZWRpdG9yKFwic3RvcFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldFJvd3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=