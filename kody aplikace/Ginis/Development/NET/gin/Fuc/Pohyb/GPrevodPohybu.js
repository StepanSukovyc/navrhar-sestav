"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Převod účetních pohybů
             *
             * @author Martin Boček
             * @since 480.1.0.11
             */
            let GPrevodPohybu = class GPrevodPohybu extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // akce seznamu
                    this.actions.addRange({
                        actPrevod: Gordic.Eko.Action.actionPrevest({ run: function () { that.prevod(); } })
                    });
                    // menubar
                    this.menuBar(this.actions.createBar(this.getMenuActions()));
                    // grid
                    $.newDiv("SeznamFuc")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        // obslužná akce pro doubleclick pro převod pohybů
                        // TODO: nebude lepší, když defaultní akce nebude?
                        defaultAction: that.actions.actPrevod,
                        //searchColumns: ["typ_upr", "nazev_upr"],
                        columns: WebClient.FucGrid.Pohyb.createGridFormatPrevod(),
                        contextMenu: function (cellContext) {
                            return that.actions.createBar(that.getMenuActions(true, cellContext));
                        }
                    })
                        .gautofit();
                    // načtení dat
                    that.nacteniSeznamu();
                }
                /**
                 * Naplnění seznamu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                nacteniSeznamu() {
                    let that = this;
                    // načtení dat
                    return that.isl.FinPohyb.listTypUprVUctovani(rq => { return { filters: { rok: that.Rok } }; })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "typ_upr" });
                        // nastavení dat a překreslení gridu
                        that.element.find(".SeznamFuc.ggrid").ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // nastavení okna
                        that.enable();
                    });
                }
                /**
                 * Převod pohybů ze stavu v účtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                prevod() {
                    // TODO: všechny text do resource
                    let that = this;
                    // aktuálně zaškrtlé řádky
                    const vybRadky = this.element.find(".SeznamFuc.ggrid").ggrid("getSelection");
                    if (vybRadky !== null && vybRadky.length > 0) {
                        // zjištění typů pohybů
                        let existPoloautomaticke = false;
                        let existRucni = false;
                        $.each(vybRadky, function (index, radek) {
                            if (radek.exist_30 > 0)
                                existPoloautomaticke = true;
                            if (radek.exist_40 > 0)
                                existRucni = true;
                        });
                        ;
                        let returnObj = {
                            smazatPoloautomaticke: false,
                            smazatRucni: false
                        };
                        // převod pohybů
                        return $.Deferred().resolve(returnObj).promise()
                            .then(function (returnObj) {
                            // případný dotaz na převod poloautomatických pohybů
                            if (existPoloautomaticke) {
                                // dotaz, jestli smazat ručně pořízené zápisy u poloautomatických pohybů
                                return that.dialogs.confirm(that.actions.actPrevod.caption, "jres:24100317") //RC 24100317 : V převáděných pohybech jsou i pohyby typu 'poloautomatické'. Chcete při jejich převodu smazat ručně pořízené zápisy?
                                    .createDialogPromise(GDlg.mbbYes.id)
                                    .then(function () {
                                    // pořízené zápisy smazat
                                    returnObj.smazatPoloautomaticke = true;
                                    return returnObj;
                                }, function () {
                                    return $.Deferred().resolve(returnObj);
                                });
                            }
                            else {
                                // pořízené zápisy nejsou, takže nemazat
                                return returnObj;
                            }
                        })
                            .then(function (returnObj) {
                            // případný dotaz na převod ručních pohybů
                            if (existRucni) {
                                // dotaz, jestli smazat ručně pořízené zápisy u ručních pohybů
                                return that.dialogs.confirm(that.actions.actPrevod.caption, "jres:24100318") //RC 24100318 : V převáděných pohybech jsou i pohyby typu 'ruční'. Chcete při jejich převodu smazat ručně pořízené zápisy?
                                    .createDialogPromise(GDlg.mbbYes.id)
                                    .then(function () {
                                    // pořízené zápisy smazat
                                    returnObj.smazatRucni = true;
                                    return returnObj;
                                }, function () {
                                    return $.Deferred().resolve(returnObj);
                                });
                            }
                            else {
                                // pořízené zápisy nejsou, takže nemazat
                                return returnObj;
                            }
                        })
                            .then(function (returnObj) {
                            // kontrolní dotaz na převod pohybů
                            return that.dialogs.confirmDangerous(that.actions.actPrevod.caption, "jres:24100319") //RC 24100319 : Opravdu chcete převést pohyby ze stavu 'v účtování' do stavu 'nezaúčtováno'? V okamžiku převodu nesmí být účtování těchto pohybů nikde spuštěné!;;Upozornění: pokud byly pohyby účtování ve FUC05, je nutné místo tohoto převodu pohybů změnit stav v historie účtování!;;
                                .createDialogPromise(GDlg.mbbYes.id)
                                .then(function () {
                                return returnObj;
                            });
                        })
                            .then(function (returnObj) {
                            // převod pohybů
                            that.actions.actPrevod.setPending(0);
                            return that.isl.FinPohyb.prevedZVUctovaniDoNezauctovano({ typUpr: vybRadky, rok: that.Rok, smazatPoloautomaticke: returnObj.smazatPoloautomaticke, smazatRucni: returnObj.smazatRucni })
                                .get();
                        })
                            .done(function () {
                            that.actions.actPrevod.setPending(100);
                            // aktualizace dat
                            that.nacteniSeznamu();
                        })
                            .fail(function () {
                            that.actions.actPrevod.setPending(-1);
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // aktuální případ
                    const isEmpty = !(this.element.find(".SeznamFuc.ggrid").ggrid("getView").getCount("data") > 0);
                    // akce seznamu
                    const permEmptyGrid = WebClient.FucGrid.getEmptyGridPermission();
                    this.actions.actPrevod.updatePermission(isEmpty ? permEmptyGrid : { value: true });
                }
                /**
                 * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                 *
                 * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                 * @param {IGGridCellContext<Gordic.Fuc.Interface.GTypUprVUctovaniDto>} [cellContext] kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                 * @returns {(string | undefined)[] | (string | (string | undefined)[] | { action: GAction | undefined; primary: true; favorite: true; })[]} seznam akcí
                 */
                getMenuActions(contextMenu = false, cellContext) {
                    return contextMenu
                        ? ["actPrevod"]
                        : ["actPrevod*"];
                }
            };
            GPrevodPohybu = __decorate([
                gcontent
            ], GPrevodPohybu);
            WebClient.GPrevodPohybu = GPrevodPohybu;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZXZvZFBvaHlidS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmV2b2RQb2h5YnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW9OZjtBQXBORCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvTm5CO0lBcE5nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvTjdCO1FBcE5vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBUzNDOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLGVBQWU7b0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDdEYsQ0FBQyxDQUFDO29CQUVILFVBQVU7b0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUU1RCxPQUFPO29CQUNQLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO3lCQUNoQixHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzt5QkFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLEtBQUssQ0FBMkM7d0JBQzdDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixLQUFLLEVBQUUsSUFBSTt3QkFDWCxrREFBa0Q7d0JBQ2xELGtEQUFrRDt3QkFDbEQsYUFB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TTtvQkFFVixrQkFBa0I7b0JBQ2xCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRS9GLGVBQWU7b0JBQ2YsTUFBTSxhQUFhLEdBQUcsVUFBQSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3hGLENBQUM7Z0JBRUQ7Ozs7OzttQkFNRztnQkFDSyxjQUFjLENBQUMsY0FBdUIsS0FBSyxFQUFFLFdBQXlFO29CQUUxSCxPQUFPLFdBQVc7d0JBQ2QsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO3dCQUNmLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QixDQUFDO2FBRUosQ0FBQTtZQXpNWSxhQUFhO2dCQUR6QixRQUFRO2VBQ0ksYUFBYSxDQXlNekI7WUF6TVksdUJBQWEsZ0JBeU16QixDQUFBO1FBQ0wsQ0FBQyxFQXBOb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb043QjtJQUFELENBQUMsRUFwTmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9ObkI7QUFBRCxDQUFDLEVBcE5TLE1BQU0sS0FBTixNQUFNLFFBb05mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5GdWMuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQxZlldm9kIMO6xI1ldG7DrWNoIHBvaHlixa9cclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjExXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmV2b2RQb2h5YnUgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHJva1xyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBSb2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkZWZpbm92w6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlIHNlem5hbXVcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByZXZvZDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJldmVzdCh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnByZXZvZCgpOyB9IH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbWVudWJhclxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcih0aGlzLmdldE1lbnVBY3Rpb25zKCkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgJC5uZXdEaXYoXCJTZXpuYW1GdWNcIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdUeXBVcHJWVWN0b3ZhbmlEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBvYnNsdcW+bsOhIGFrY2UgcHJvIGRvdWJsZWNsaWNrIHBybyBwxZlldm9kIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZWJ1ZGUgbGVwxaHDrSwga2R5xb4gZGVmYXVsdG7DrSBha2NlIG5lYnVkZT9cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJldm9kLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widHlwX3VwclwiLCBcIm5hemV2X3VwclwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlBvaHliLmNyZWF0ZUdyaWRGb3JtYXRQcmV2b2QoKSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogZnVuY3Rpb24gKGNlbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKHRoYXQuZ2V0TWVudUFjdGlvbnModHJ1ZSwgY2VsbENvbnRleHQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIHRoYXQubmFjdGVuaVNlem5hbXUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hcGxuxJtuw60gc2V6bmFtdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RlbmlTZXpuYW11KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIubGlzdFR5cFVwclZVY3RvdmFuaShycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgcm9rOiB0aGF0LlJvayB9IH07IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvaGxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwidHlwX3VwclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbUZ1Yy5nZ3JpZFwiKS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlldm9kIHBvaHlixa8gemUgc3RhdnUgdiDDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2b2QoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiB2xaFlY2hueSB0ZXh0IGRvIHJlc291cmNlXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7EmyB6YcWha3J0bMOpIMWZw6Fka3lcclxuICAgICAgICAgICAgY29uc3QgdnliUmFka3kgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1GdWMuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1R5cFVwclZVY3RvdmFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIilcclxuICAgICAgICAgICAgaWYgKHZ5YlJhZGt5ICE9PSBudWxsICYmIHZ5YlJhZGt5Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSB0eXDFryBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICBsZXQgZXhpc3RQb2xvYXV0b21hdGlja2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBleGlzdFJ1Y25pID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2godnliUmFka3ksIGZ1bmN0aW9uIChpbmRleCwgcmFkZWspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsuZXhpc3RfMzAhID4gMCkgZXhpc3RQb2xvYXV0b21hdGlja2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5leGlzdF80MCEgPiAwKSBleGlzdFJ1Y25pID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9iamVrdCBwcm8gcMWZZWTDoXbDoW7DrSBob2Rub3RcclxuICAgICAgICAgICAgICAgIGludGVyZmFjZSByZXR1cm5PYmpUeXBlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbWF6YXRQb2xvYXV0b21hdGlja2U6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgc21hemF0UnVjbmk6IGJvb2xlYW5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNtYXphdFBvbG9hdXRvbWF0aWNrZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc21hemF0UnVjbmk6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHDFmWV2b2QgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVybk9iaikucHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXBhZG7DvSBkb3RheiBuYSBwxZlldm9kIHBvbG9hdXRvbWF0aWNrw71jaCBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdFBvbG9hdXRvbWF0aWNrZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG90YXosIGplc3RsaSBzbWF6YXQgcnXEjW7EmyBwb8WZw616ZW7DqSB6w6FwaXN5IHUgcG9sb2F1dG9tYXRpY2vDvWNoIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybSh0aGF0LmFjdGlvbnMuYWN0UHJldm9kIS5jYXB0aW9uLCBcImpyZXM6MjQxMDAzMTdcIikgLy9SQyAyNDEwMDMxNyA6IFYgcMWZZXbDoWTEm27DvWNoIHBvaHliZWNoIGpzb3UgaSBwb2h5YnkgdHlwdSAncG9sb2F1dG9tYXRpY2vDqScuIENoY2V0ZSBwxZlpIGplamljaCBwxZlldm9kdSBzbWF6YXQgcnXEjW7EmyBwb8WZw616ZW7DqSB6w6FwaXN5P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8WZw616ZW7DqSB6w6FwaXN5IHNtYXphdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLnNtYXphdFBvbG9hdXRvbWF0aWNrZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUocmV0dXJuT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8WZw616ZW7DqSB6w6FwaXN5IG5lanNvdSwgdGFrxb5lIG5lbWF6YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZw61wYWRuw70gZG90YXogbmEgcMWZZXZvZCBydcSNbsOtY2ggcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RSdWNuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG90YXosIGplc3RsaSBzbWF6YXQgcnXEjW7EmyBwb8WZw616ZW7DqSB6w6FwaXN5IHUgcnXEjW7DrWNoIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybSh0aGF0LmFjdGlvbnMuYWN0UHJldm9kIS5jYXB0aW9uLCBcImpyZXM6MjQxMDAzMThcIikgLy9SQyAyNDEwMDMxOCA6IFYgcMWZZXbDoWTEm27DvWNoIHBvaHliZWNoIGpzb3UgaSBwb2h5YnkgdHlwdSAncnXEjW7DrScuIENoY2V0ZSBwxZlpIGplamljaCBwxZlldm9kdSBzbWF6YXQgcnXEjW7EmyBwb8WZw616ZW7DqSB6w6FwaXN5P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8WZw616ZW7DqSB6w6FwaXN5IHNtYXphdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLnNtYXphdFJ1Y25pID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvxZnDrXplbsOpIHrDoXBpc3kgbmVqc291LCB0YWvFvmUgbmVtYXphdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBrb250cm9sbsOtIGRvdGF6IG5hIHDFmWV2b2QgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm1EYW5nZXJvdXModGhhdC5hY3Rpb25zLmFjdFByZXZvZCEuY2FwdGlvbiwgXCJqcmVzOjI0MTAwMzE5XCIpIC8vUkMgMjQxMDAzMTkgOiBPcHJhdmR1IGNoY2V0ZSBwxZlldsOpc3QgcG9oeWJ5IHplIHN0YXZ1ICd2IMO6xI10b3bDoW7DrScgZG8gc3RhdnUgJ25lemHDusSNdG92w6Fubyc/IFYgb2thbcW+aWt1IHDFmWV2b2R1IG5lc23DrSBiw710IMO6xI10b3bDoW7DrSB0xJtjaHRvIHBvaHlixa8gbmlrZGUgc3B1xaF0xJtuw6khOztVcG96b3JuxJtuw606IHBva3VkIGJ5bHkgcG9oeWJ5IMO6xI10b3bDoW7DrSB2ZSBGVUMwNSwgamUgbnV0bsOpIG3DrXN0byB0b2hvdG8gcMWZZXZvZHUgcG9oeWLFryB6bcSbbml0IHN0YXYgdiBoaXN0b3JpZSDDusSNdG92w6Fuw60hOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlldm9kIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZXZvZCEuc2V0UGVuZGluZygwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLnByZXZlZFpWVWN0b3ZhbmlEb05lemF1Y3RvdmFubyh7IHR5cFVwcjogdnliUmFka3ksIHJvazogdGhhdC5Sb2ssIHNtYXphdFBvbG9hdXRvbWF0aWNrZTogcmV0dXJuT2JqLnNtYXphdFBvbG9hdXRvbWF0aWNrZSwgc21hemF0UnVjbmk6IHJldHVybk9iai5zbWF6YXRSdWNuaSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJldm9kIS5zZXRQZW5kaW5nKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RlbmlTZXpuYW11KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmV2b2QhLnNldFBlbmRpbmcoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBwxZnDrXBhZFxyXG4gICAgICAgICAgICBjb25zdCBpc0VtcHR5ID0gISh0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1GdWMuZ2dyaWRcIikuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldENvdW50KFwiZGF0YVwiKSA+IDApO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1FbXB0eUdyaWQgPSBGdWNHcmlkLmdldEVtcHR5R3JpZFBlcm1pc3Npb24oKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFByZXZvZCEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gYWtjw60gcHJvIG1lbnUgKGhhbWJ1cmdlciBuZWJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBjb250ZXh0TWVudSBmb3Jtw6F0IHBybyBrb250ZXh0b3bDqSBtZW51IGdyaWR1ICh0cnVlIChkZWZhdWx0KSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge0lHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdUeXBVcHJWVWN0b3ZhbmlEdG8+fSBbY2VsbENvbnRleHRdIGtvbnRleHQgeiBncmlkdSAocG91emUgcHJvIGNvbnRleHRNZW51ID0gdHJ1ZSkgKGRlZmF1bHQgPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICogQHJldHVybnMgeyhzdHJpbmcgfCB1bmRlZmluZWQpW10gfCAoc3RyaW5nIHwgKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IHsgYWN0aW9uOiBHQWN0aW9uIHwgdW5kZWZpbmVkOyBwcmltYXJ5OiB0cnVlOyBmYXZvcml0ZTogdHJ1ZTsgfSlbXX0gc2V6bmFtIGFrY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZW51QWN0aW9ucyhjb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlLCBjZWxsQ29udGV4dD86IElHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdUeXBVcHJWVWN0b3ZhbmlEdG8+KTogKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IChzdHJpbmcgfCAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdIHwgeyBhY3Rpb246IEdBY3Rpb24gfCB1bmRlZmluZWQ7IHByaW1hcnk6IHRydWU7IGZhdm9yaXRlOiB0cnVlOyB9KVtdIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0TWVudVxyXG4gICAgICAgICAgICAgICAgPyBbXCJhY3RQcmV2b2RcIl1cclxuICAgICAgICAgICAgICAgIDogW1wiYWN0UHJldm9kKlwiXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==