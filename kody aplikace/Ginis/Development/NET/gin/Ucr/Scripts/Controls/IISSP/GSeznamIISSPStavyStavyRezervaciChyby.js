"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP stavy - Stavy rezervaci
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPStavyStavyRezervaciChyby extends WebClient.GSeznamIISSPStavyStavyRezervaci {
                onContentReady() {
                    this.pouzeSChybou = 1;
                    super.onContentReady();
                    let that = this;
                    that.FinMisto = this.parentCnt["FinMisto"];
                    const grid = that.getGrid();
                    if (grid === null)
                        return;
                    if (this.FinMisto.trim() !== "")
                        grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto } });
                }
                /**
                * function createFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                createFilterZalozka() {
                    var that = this;
                    let hodnoty = [
                        { txt: "jres:30250529", kod: 1 } //RC 30250529 : Všechny chyby
                        ,
                        { txt: "jres:30250530", kod: 2 } //RC 30250530 : Není provedeno přeúčtování skutečnosti v IISSP
                        ,
                        { txt: "jres:30250531", kod: 3 } //RC 30250531 : Není proveden přepočet stavů PRSK
                        ,
                        { txt: "jres:30250532", kod: 4 } //RC 30250532 : Stavy rezervací IS GINIS a IISSP nesouhlasí!
                        ,
                        { txt: "jres:30250533", kod: 5 } //RC 30250533 : Rezervaci je nutné aktualizovat do IISSP
                    ];
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    if (that.pouzeSChybou == null)
                        that.pouzeSChybou = 1;
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250534" }) //RC 30250534 : Pouze chybné
                        .addField("gselectbox", {
                        name: "stavchyby", multi: false, list: false, itemWidth: "",
                        dropdown: true,
                        itemTemplate: "{txt}",
                        model: "model.kod=value.kod;model.txt=value.txt",
                        helperColumns: ["txt"],
                        initialValue: hodnoty[0]
                        //, modelDefaults: { txt: "jres:30250529", kod: 1  } //RC 30250529 : Všechny chyby
                        //,emptyValue: { txt: "jres:30250529", kod: 0 } //RC 30250529 : Všechny chyby
                        ,
                        change: function (ev, changeObj) {
                            debugger;
                            that.pouzeSChybou = 1;
                            if (changeObj.value != null && changeObj.value.kod != null)
                                that.pouzeSChybou = changeObj.value.kod;
                        },
                        data: hodnoty
                        //               , { key: "kod" })
                    });
                    return filterFormDef;
                }
            }
            WebClient.GSeznamIISSPStavyStavyRezervaciChyby = GSeznamIISSPStavyStavyRezervaciChyby;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJlemVydmFjaUNoeWJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJlemVydmFjaUNoeWJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0F5RWY7QUF6RUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeUVuQjtJQXpFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeUU3QjtRQXpFb0IsV0FBQSxTQUFTO1lBRTFCOzs7OztlQUtHO1lBQ0gsTUFBYSxvQ0FBcUMsU0FBUSxVQUFBLCtCQUErQjtnQkFHckYsY0FBYztvQkFDVixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM1QixJQUFJLElBQUksS0FBSyxJQUFJO3dCQUFFLE9BQU07b0JBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO3dCQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25HLENBQUM7Z0JBR0Q7Ozs7OztrQkFNRTtnQkFDSyxtQkFBbUI7b0JBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxPQUFPLEdBQUU7d0JBQ1QsRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkI7O3dCQUM1RCxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLDhEQUE4RDs7d0JBQy9GLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsaURBQWlEOzt3QkFDbEYsRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyw0REFBNEQ7O3dCQUM3RixFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLHdEQUF3RDtxQkFFdkYsQ0FBQTtvQkFDUixJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSwwQ0FBMEMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQSxDQUFFLHFCQUFxQjtvQkFDM0ssSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUk7d0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUMxQixhQUFhLENBQUMsVUFBVSxFQUFFO3lCQUNyQixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyw0QkFBNEI7eUJBQy9ELFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFO3dCQUN6RCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxZQUFZLEVBQUUsT0FBTzt3QkFDckIsS0FBSyxFQUFFLHlDQUF5Qzt3QkFFaEQsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDO3dCQUN0QixZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsa0ZBQWtGO3dCQUNsRiw2RUFBNkU7O3dCQUMzRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUzs0QkFDN0IsUUFBUSxDQUFDOzRCQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFBOzRCQUNyQixJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUk7Z0NBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ2hELENBQUM7d0JBQ0MsSUFBSSxFQUFFLE9BQU87d0JBQzFCLGtDQUFrQztxQkFDMUIsQ0FDQSxDQUNBO29CQUlMLE9BQU8sYUFBYSxDQUFDO2dCQUN6QixDQUFDO2FBRUo7WUFoRVksOENBQW9DLHVDQWdFaEQsQ0FBQTtRQUNMLENBQUMsRUF6RW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlFN0I7SUFBRCxDQUFDLEVBekVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5RW5CO0FBQUQsQ0FBQyxFQXpFUyxNQUFNLEtBQU4sTUFBTSxRQXlFZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBzdGF2eSAtIFN0YXZ5IHJlemVydmFjaVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlSZXplcnZhY2lDaHlieSBleHRlbmRzIEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlSZXplcnZhY2kgaW1wbGVtZW50cyBJR0NvbnRlbnR7XHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wb3V6ZVNDaHlib3UgPSAxO1xyXG4gICAgICAgICAgICBzdXBlci5vbkNvbnRlbnRSZWFkeSgpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuRmluTWlzdG8gPSB0aGlzLnBhcmVudENudFtcIkZpbk1pc3RvXCJdO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm5cclxuICAgICAgICAgICAgaWYgKHRoaXMuRmluTWlzdG8udHJpbSgpICE9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIHsgaXNwX2ZpbTogeyBzdGFydDogdGhhdC5GaW5NaXN0bywgZW5kOiB0aGF0LkZpbk1pc3RvIH0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBob2Rub3R5ID1bXHJcbiAgICAgICAgICAgICAgICB7IHR4dDogXCJqcmVzOjMwMjUwNTI5XCIsIGtvZDogMSB9IC8vUkMgMzAyNTA1MjkgOiBWxaFlY2hueSBjaHlieVxyXG4gICAgICAgICAgICAgICAgLCB7IHR4dDogXCJqcmVzOjMwMjUwNTMwXCIsIGtvZDogMiB9IC8vUkMgMzAyNTA1MzAgOiBOZW7DrSBwcm92ZWRlbm8gcMWZZcO6xI10b3bDoW7DrSBza3V0ZcSNbm9zdGkgdiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgLCB7IHR4dDogXCJqcmVzOjMwMjUwNTMxXCIsIGtvZDogMyB9IC8vUkMgMzAyNTA1MzEgOiBOZW7DrSBwcm92ZWRlbiBwxZllcG/EjWV0IHN0YXbFryBQUlNLXHJcbiAgICAgICAgICAgICAgICAsIHsgdHh0OiBcImpyZXM6MzAyNTA1MzJcIiwga29kOiA0IH0gLy9SQyAzMDI1MDUzMiA6IFN0YXZ5IHJlemVydmFjw60gSVMgR0lOSVMgYSBJSVNTUCBuZXNvdWhsYXPDrSFcclxuICAgICAgICAgICAgICAgICwgeyB0eHQ6IFwianJlczozMDI1MDUzM1wiLCBrb2Q6IDUgfSAvL1JDIDMwMjUwNTMzIDogUmV6ZXJ2YWNpIGplIG51dG7DqSBha3R1YWxpem92YXQgZG8gSUlTU1BcclxuXHJcbiAgICAgICAgICAgIF0gYXMgYW55XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMTIsIEwtMTItMTItMCwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pICAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuICAgICAgICAgICAgaWYgKHRoYXQucG91emVTQ2h5Ym91ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGF0LnBvdXplU0NoeWJvdSA9IDE7XHJcbiAgICAgICAgICAgIGZpbHRlckZvcm1EZWYuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDUzNFwiIH0pIC8vUkMgMzAyNTA1MzQgOiBQb3V6ZSBjaHlibsOpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZjaHlieVwiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IGZhbHNlLCBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwua29kPXZhbHVlLmtvZDttb2RlbC50eHQ9dmFsdWUudHh0XCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBoZWxwZXJDb2x1bW5zOiBbXCJ0eHRcIl1cclxuICAgICAgICAgICAgICAgICAgICAsIGluaXRpYWxWYWx1ZTogaG9kbm90eVswXVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbERlZmF1bHRzOiB7IHR4dDogXCJqcmVzOjMwMjUwNTI5XCIsIGtvZDogMSAgfSAvL1JDIDMwMjUwNTI5IDogVsWhZWNobnkgY2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAvLyxlbXB0eVZhbHVlOiB7IHR4dDogXCJqcmVzOjMwMjUwNTI5XCIsIGtvZDogMCB9IC8vUkMgMzAyNTA1MjkgOiBWxaFlY2hueSBjaHlieVxyXG4gICAgICAgICAgICAgICAgICAgICwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3V6ZVNDaHlib3UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudmFsdWUgIT0gbnVsbCAmJiBjaGFuZ2VPYmoudmFsdWUua29kICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvdXplU0NoeWJvdSA9IGNoYW5nZU9iai52YWx1ZS5rb2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogaG9kbm90eVxyXG4gICAgICAgICAvLyAgICAgICAgICAgICAgICwgeyBrZXk6IFwia29kXCIgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZvcm1EZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==