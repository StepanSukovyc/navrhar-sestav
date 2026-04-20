"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP preuctovani skutecnosti - Nezatridene zapisy
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPPreuctovaniSkutecnostiNZ extends WebClient.GSeznamEkoUctZapis {
                constructor(content) {
                    // prevlecu ulohu za ucetni zapisy
                    content.TypUlohy = 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */;
                    super(content);
                    /** Globalni modulove parametry v JS */
                    this.logOptions = { name: "GSeznamIISSPPreuctovaniSkutecnostiNZ", authorCode: 302, file: "GSeznamIISSPPreuctovaniSkutecnostiNZ.ts" };
                    //this.pouzivanStrukPopis = false;
                    //this.povolenNahled = true;
                    //// definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrRisreSkutecnost.list();
                    this.taskCount = this.parentCnt.isl.UcrRisreSkutecnost.count();
                    //// moznost ukladani historie filtru
                    //this.rememberHistory = true;
                    //// pouzivat texty z rozvrhu
                    //this.useTextyZRozvrhu = false;
                    //// pouzivat filtr na PAP radky
                    this.usePapRows = false;
                    this._nastaveniAkci();
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    super.nastaveniAkci(grid, pocetRadku);
                    this.parentCnt.log.debug("Start nastaveniAkci GSeznamIISSPPreuctovaniSkutecnostiNZ");
                    let that = this.parentCnt;
                    //let grid = this.getGrid();
                    //if (grid == null) return;
                    var enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    // pokud neni grid, nic nedelej
                    if (that.closed)
                        return;
                    that.actions.zatriditAct?.update({ enabled: enable });
                    this.parentCnt.log.debug("Konec nastaveniAkci GSeznamIISSPPreuctovaniSkutecnostiNZ");
                }
                /**
                 * Vytvoreni akci
                 *
                 */
                createActions() {
                    super.createActions();
                    this.parentCnt.actions.add({
                        name: "zatriditAct",
                        visible: true,
                        caption: "jres:30250336", //RC 30250336 : Zatřídit
                        enabled: true,
                        run: () => { this.zatridit(); }
                    });
                }
                /**
                 * Zatrideni radku
                 *
                 * */
                zatridit() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    var sel = grid.ggrid("getSelection", false);
                    if (sel.length === 0)
                        return;
                    let row = sel[0];
                    //let row: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto={ };
                    that.parentCnt.dialogs.showModalWindow(Gordic.Ucr.WebClient.GInputIDRISRE, row, "jres:30250337" /*, 400, 350,true*/) //RC 30250337 : Zadejte identifikaci RISRE
                        .on("close", function (ev, result) {
                        if (result != null && typeof result.zatrideno !== "undefined" && result.zatrideno != "") {
                            let a;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            let view = grid.ggrid("getView");
                            // vymazi aktualni zaznam
                            view.updateData(row, "delete");
                        }
                    });
                    return;
                }
            }
            WebClient.GSeznamIISSPPreuctovaniSkutecnostiNZ = GSeznamIISSPPreuctovaniSkutecnostiNZ;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aU5aLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aU5aLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0F1R2Y7QUF2R0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdUduQjtJQXZHZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdUc3QjtRQXZHb0IsV0FBQSxTQUFTO1lBRTFCOzs7OztlQUtHO1lBQ0gsTUFBYSxvQ0FBcUMsU0FBUSxVQUFBLGtCQUFrQjtnQkFJeEUsWUFBWSxPQUFxQztvQkFDN0Msa0NBQWtDO29CQUNsQyxPQUFPLENBQUMsUUFBUSxzRUFBNkQsQ0FBQztvQkFDOUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQU5uQix1Q0FBdUM7b0JBRXZDLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxzQ0FBc0MsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSx5Q0FBeUMsRUFBRSxDQUFDO29CQUs1SCxrQ0FBa0M7b0JBQ2xDLDRCQUE0QjtvQkFDNUIsOENBQThDO29CQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO29CQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMvRCxxQ0FBcUM7b0JBQ3JDLDhCQUE4QjtvQkFDOUIsNkJBQTZCO29CQUM3QixnQ0FBZ0M7b0JBQ2hDLGdDQUFnQztvQkFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBRXhCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRDs7O3FCQUdLO2dC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dkdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1R25CO0FBQUQsQ0FBQyxFQXZHUyxNQUFNLEtBQU4sTUFBTSxRQXVHZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBwcmV1Y3RvdmFuaSBza3V0ZWNub3N0aSAtIE5lemF0cmlkZW5lIHphcGlzeVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1JSVNTUFByZXVjdG92YW5pU2t1dGVjbm9zdGlOWiBleHRlbmRzIEdTZXpuYW1Fa29VY3RaYXBpcyBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLyoqIEdsb2JhbG5pIG1vZHVsb3ZlIHBhcmFtZXRyeSB2IEpTICovXHJcblxyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aU5aXCIsIGF1dGhvckNvZGU6IDMwMiwgZmlsZTogXCJHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpTloudHNcIiB9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgLy8gcHJldmxlY3UgdWxvaHUgemEgdWNldG5pIHphcGlzeVxyXG4gICAgICAgICAgICBjb250ZW50LlR5cFVsb2h5PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcztcclxuICAgICAgICAgICAgc3VwZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wb3V6aXZhblN0cnVrUG9waXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy90aGlzLnBvdm9sZW5OYWhsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLy8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVTa3V0ZWNub3N0Lmxpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrQ291bnQgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVTa3V0ZWNub3N0LmNvdW50KCk7XHJcbiAgICAgICAgICAgIC8vLy8gbW96bm9zdCB1a2xhZGFuaSBoaXN0b3JpZSBmaWx0cnVcclxuICAgICAgICAgICAgLy90aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vLy8gcG91eml2YXQgdGV4dHkgeiByb3p2cmh1XHJcbiAgICAgICAgICAgIC8vdGhpcy51c2VUZXh0eVpSb3p2cmh1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vLy8gcG91eml2YXQgZmlsdHIgbmEgUEFQIHJhZGt5XHJcbiAgICAgICAgICAgIHRoaXMudXNlUGFwUm93cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaShncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBwb2NldFJhZGt1OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIubmFzdGF2ZW5pQWtjaShncmlkLCBwb2NldFJhZGt1KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiU3RhcnQgbmFzdGF2ZW5pQWtjaSBHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpTlpcIik7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcy5wYXJlbnRDbnQ7XHJcbiAgICAgICAgICAgIC8vbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy9pZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBlbmFibGUgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCkgPiAwO1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuemF0cmlkaXRBY3Q/LnVwZGF0ZSh7IGVuYWJsZWQ6IGVuYWJsZSB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy5kZWJ1ZyhcIktvbmVjIG5hc3RhdmVuaUFrY2kgR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aU5aXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInphdHJpZGl0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzM2XCIsIC8vUkMgMzAyNTAzMzYgOiBaYXTFmcOtZGl0XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMuemF0cmlkaXQoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXRyaWRlbmkgcmFka3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgemF0cmlkaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgICAgIC8vbGV0IHJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPXsgfTtcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLlVjci5XZWJDbGllbnQuR0lucHV0SURSSVNSRSwgcm93LCBcImpyZXM6MzAyNTAzMzdcIi8qLCA0MDAsIDM1MCx0cnVlKi8pIC8vUkMgMzAyNTAzMzcgOiBaYWRlanRlIGlkZW50aWZpa2FjaSBSSVNSRVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC56YXRyaWRlbm8gIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0LnphdHJpZGVubyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2eW1hemkgYWt0dWFsbmkgemF6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShyb3csIFwiZGVsZXRlXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==