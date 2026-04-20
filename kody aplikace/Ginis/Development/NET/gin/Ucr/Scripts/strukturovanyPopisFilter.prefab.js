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
                function strukturovanyPopisFilter(options) {
                    return $.extend({
                        multi: true,
                        multiMode: "selective",
                        itemWidth: "",
                        itemDeletable: false,
                        selector: function (opts) {
                            let def = $.Deferred();
                            let field = $(this);
                            let selectorOptions = {
                                data: $(this).gfield("getValue"), // options.data,
                                id: "GStrukturovanyPopisFilterSelector#"
                            };
                            var dlg = $.content(this).dialogs.showModalWindow(GStrukturovanyPopisFilterSelector, selectorOptions, { title: "jres:31100223" }); //RC 31100223 : Filtr dle str. popisu
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
                            if (!d || !d.hodnota)
                                return null;
                            return $(`<div><span class='g-eko-cfu-elm-caption'>${d.klic}</span><span class='g-eko-cfu-elm-value'>=${d.hodnota}</span></div>`);
                        },
                        itemClass: (d) => {
                            if (!d.hodnota)
                                return "hidden";
                            return "";
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
                Prefabs.strukturovanyPopisFilter = strukturovanyPopisFilter;
                let GStrukturovanyPopisFilterSelector = class GStrukturovanyPopisFilterSelector extends Gordic.GContentBase {
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
                            : this.createServiceContent("Gordic.Ucr.WebClient.GStrukturovanyPopisServiceContent")
                                .call("GetStrukturovanyPopis");
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
                                                ? grid.ggrid("getSelection", false, true).map((s) => { return s.klic; })
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
                            .addTextColumn({ name: "klic", caption: "jres:31100215" }) //RC 31100215 : Klíč
                            .addTextColumn({ name: "klic_txt", caption: "jres:31100019" }); //RC 31100019 : Název
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
                                if (!options.selected)
                                    return;
                                for (var i = 0; i < metas.length; i++) {
                                    let meta = metas[i];
                                    meta.checked = options.selected?.indexOf(meta.data.klic) > -1;
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
                GStrukturovanyPopisFilterSelector = __decorate([
                    Decorators.gcontent
                ], GStrukturovanyPopisFilterSelector);
                Prefabs.GStrukturovanyPopisFilterSelector = GStrukturovanyPopisFilterSelector;
            })(Prefabs = WebClient.Prefabs || (WebClient.Prefabs = {}));
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWt0dXJvdmFueVBvcGlzRmlsdGVyLnByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlci5wcmVmYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtNZjtBQWxNRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrTW5CO0lBbE1nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrTTdCO1FBbE1vQixXQUFBLFNBQVM7WUFBQyxJQUFBLE9BQU8sQ0FrTXJDO1lBbE04QixXQUFBLE9BQU87Z0JBcUJsQyxTQUFnQix3QkFBd0IsQ0FBQyxPQUEwQztvQkFFL0UsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUNaLEtBQUssRUFBRSxJQUFJO3dCQUNYLFNBQVMsRUFBRSxXQUFXO3dCQUN0QixTQUFTLEVBQUUsRUFBRTt3QkFDYixhQUFhLEVBQUUsS0FBSzt3QkFDcEIsUUFBUSxFQUFFLFVBQTZCLElBQUk7NEJBQ3ZDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDdkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNwQixJQUFJLGVBQWUsR0FBNkM7Z0NBQzVELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLGdCQUFnQjtnQ0FDbEQsRUFBRSxFQUFFLG9DQUFvQzs2QkFDM0MsQ0FBQzs0QkFFRixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsaUNBQWlDLEVBQUUsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUM7NEJBQ3hLLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFB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ZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyT3B0aW9ucyBleHRlbmRzIEdTZWxlY3RCb3hPcHRpb25zPEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXT4ge1xyXG4gICAgICAgIC8vZGF0YTogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlclNlbGVjdG9yT3B0aW9ucyB7XHJcbiAgICAgICAgZGF0YTogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgIGlkPzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBWIGdyaWR1IGx6ZSB2eWJpcmF0IGplZG5vdGxpdmUgaG9kbm90eSAqL1xyXG4gICAgICAgIHNlbGVjdGFibGU/OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBWIHByaXBhZGUsIHplIGplIGVkaXRhYmxlPXRydWUsIHZ5YnJhbmUgcmFka3kgdiBncmlkdSBvem5hY2kgKi9cclxuICAgICAgICBzZWxlY3RlZD86IHN0cmluZ1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlclNlbGVjdG9yT3B0aW9uc091dHB1dCB7XHJcbiAgICAgICAgZGF0YTogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgIC8qKiBWIHByaXBhZGUsIHplIGJ5bCBzZWxlY3RvciB2IGVkaXRvdmF0ZWxuZW0gbW9kdSwgc2VtIGhvZGkgcG9sZSBzdHJpbmd1IHMga2xpY2kgdnlicmFueWNoIHJhZGt1ICovXHJcbiAgICAgICAgc2VsZWN0ZWQ/OiBzdHJpbmdbXTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc3RydWt0dXJvdmFueVBvcGlzRmlsdGVyKG9wdGlvbnM6IElHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyT3B0aW9ucyk6IEdTZWxlY3RCb3hPcHRpb25zPEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgbXVsdGlNb2RlOiBcInNlbGVjdGl2ZVwiLFxyXG4gICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgIGl0ZW1EZWxldGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKHRoaXM6IEhUTUxFbGVtZW50LCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rvck9wdGlvbnM6IEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3Rvck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSwgLy8gb3B0aW9ucy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIkdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3RvciNcIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGRsZyA9ICQuY29udGVudCh0aGlzKS5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyU2VsZWN0b3IsIHNlbGVjdG9yT3B0aW9ucywgeyB0aXRsZTogXCJqcmVzOjMxMTAwMjIzXCIgfSk7IC8vUkMgMzExMDAyMjMgOiBGaWx0ciBkbGUgc3RyLiBwb3Bpc3VcclxuICAgICAgICAgICAgICAgIGRsZy5vbihcImNsb3NlXCIsIChldiwgZD86IEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3Rvck9wdGlvbnNPdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkbGcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgJiYgZC5kYXRhKSBkZWYucmVzb2x2ZShkLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJoaWRkZW5cIixcclxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoZDogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkIHx8ICFkLmhvZG5vdGEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoYDxkaXY+PHNwYW4gY2xhc3M9J2ctZWtvLWNmdS1lbG0tY2FwdGlvbic+JHtkLmtsaWN9PC9zcGFuPjxzcGFuIGNsYXNzPSdnLWVrby1jZnUtZWxtLXZhbHVlJz49JHtkLmhvZG5vdGF9PC9zcGFuPjwvZGl2PmApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpdGVtQ2xhc3M6IChkOiBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWQuaG9kbm90YSkgcmV0dXJuIFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXRlbVRvb2x0aXBUZW1wbGF0ZTogKGQ6IEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkIHx8ICFkLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCBpc0ZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBlbG0gPSAkKFwiPHRhYmxlIHN0eWxlPSdib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTsnPlwiKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGYgPSBkW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZi5ob2Rub3RhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmlyc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxtLmFwcGVuZChcIjx0cj48dGggc3R5bGU9J2JvcmRlcjogMXB4IHNvbGlkIHdoaXRlO3BhZGRpbmc6IDAuMjVyZW07Jz5qcmVzOjMxMTAwMjE1PC90aD48dGggc3R5bGU9J2JvcmRlcjogMXB4IHNvbGlkIHdoaXRlO3BhZGRpbmc6IDAuMjVyZW07Jz5qcmVzOjMxMTAwMDE5PC90aD48dGggc3R5bGU9J2JvcmRlcjogMXB4IHNvbGlkIHdoaXRlO3BhZGRpbmc6IDAuMjVyZW07Jz5qcmVzOjMxMTAwMjE2PC90aD48L3RyPlwiKTsgLy9SQyAzMTEwMDIxNiA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxtLmFwcGVuZChgPHRyPjx0ZCBzdHlsZT0nYm9yZGVyOiAxcHggc29saWQgd2hpdGU7cGFkZGluZzogMC4yNXJlbTsnPiR7Zi5rbGljfTwvdGQ+PHRkIHN0eWxlPSdib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtwYWRkaW5nOiAwLjI1cmVtOyc+JHtmLmtsaWNfdHh0fTwvdGQ+PHRkIHN0eWxlPSdib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtwYWRkaW5nOiAwLjI1cmVtOyc+JHtmLmhvZG5vdGF9PC90ZD48L3RyPmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbG0uaXMoXCI6ZW1wdHlcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsbVswXS5vdXRlckhUTUw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyRWxtQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZCA9ICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmaWVsZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0clBvcGlzID0gZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJQb3Bpcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0clBvcGlzW2ldLmhvZG5vdGEgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJjbGVhclwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzdHJQb3Bpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3RvciBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgLy9wcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0cmlkYSBncmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjbGFzc0dyaWQ6IHN0cmluZyA9IFwianMtZ3JpZC1iYXNlXCI7XHJcbiAgICAgICAgLy9wcml2YXRlIG9wdGlvbnM6IEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3Rvck9wdGlvbnM7XHJcblxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3Rvck9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGEgPyAkLkRlZmVycmVkPEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXT4oKS5yZXNvbHZlKCQuZXh0ZW5kKHRydWUsW10sb3B0aW9ucy5kYXRhKSkucHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTdHJ1a3R1cm92YW55UG9waXNTZXJ2aWNlQ29udGVudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGw8R1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdPihcIkdldFN0cnVrdHVyb3ZhbnlQb3Bpc1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihcclxuICAgICAgICAgICAgICAgIFt7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDaG9pY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJPay50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByOiBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyU2VsZWN0b3JPcHRpb25zT3V0cHV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBvcHRpb25zLnNlbGVjdGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBncmlkLmdncmlkPEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsZmFsc2UsIHRydWUpLm1hcCgocykgPT4geyByZXR1cm4gcy5rbGljITsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2Uocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia2xpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTVcIiB9KSAvL1JDIDMxMTAwMjE1IDogS2zDrcSNXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia2xpY190eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE5XCIgfSk7IC8vUkMgMzExMDAwMTkgOiBOw6F6ZXZcclxuXHJcbiAgICAgICAgICAgIGlmKCFvcHRpb25zLnNlbGVjdGFibGUpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhvZG5vdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTZcIiwgLy9SQyAzMTEwMDIxNiA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogeyBuYW1lOiBcImhvZG5vdGFcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldzxHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvPihkYXRhLCB7IGtleTogXCJrbGljXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ2YsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IG9wdGlvbnMuc2VsZWN0YWJsZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2VsZWN0YWJsZSkgZ3JpZC5nZ3JpZGNlbGxlZGl0b3IoKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR2ID0gZ3JpZC5nZ3JpZDxHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldGFzID0gZHYuZ2V0RGF0YVJvd3ModHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zZWxlY3RlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXRhID0gbWV0YXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuY2hlY2tlZCA9IG9wdGlvbnMuc2VsZWN0ZWQ/LmluZGV4T2YobWV0YS5kYXRhLmtsaWMhKSA+IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwicmVmcmVzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGF0YSgpOiBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvW10ge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gW107XHJcbiAgICAgICAgICAgIGlmIChncmlkLmhhc0NsYXNzKFwiZ2dyaWRjZWxsZWRpdG9yXCIpKSBncmlkLmdncmlkY2VsbGVkaXRvcihcInN0b3BcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXRSb3dzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19