"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GUctAgenda = 
            /**
             *  Agenda uct
             */
            class GUctAgenda extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.loadingData = false; // atribut nacitani dat
                }
                onContentReady() {
                    //this.taskId = "actSeznamPredkontaci";
                    var that = this;
                    debugger;
                    // vytvoreni gridu
                    that.createGrid();
                    // vytvoreni akci
                    that.createAction();
                    this.menuBar([{
                            action: this.actions.actCloseAgenda, favorite: true
                        }
                    ]);
                    that.reload();
                }
                /**
                    * Hromadne operace
                    *
                    * function HromadneOperace
                    *
                    *
                    *
                    */
                hromadneOperace() {
                    return this.isl.UctAgenda.uzavritAgendu().getData();
                }
                /**
                 * Znovunacteni dat
                 *
                 * */
                reload() {
                    let that = this;
                    if (that.loadingData)
                        return;
                    let view = this.$grid.ggrid("getView");
                    that.loadingData = true;
                    view.requestData().always(() => {
                        debugger;
                        that.loadingData = false;
                        that.nastaveniPristupnosti();
                    });
                }
                /**
                 * Vytvoreni gridu
                 * */
                createGrid() {
                    let that = this;
                    var condFormat = undefined;
                    condFormat = [{
                            description: "jres:30250739", //RC 30250739 : Otevřené knihy
                            formula: "@NumberOfOpenedBooks>0",
                            bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightred,
                            applyTo: "NumberOfOpenedBooks"
                        },
                        {
                            description: "jres:30250740", //RC 30250740 : Uzavřené knihy
                            formula: "@NumberOfClosedBooks>0",
                            bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgreen,
                            applyTo: "NumberOfClosedBooks"
                        },
                    ];
                    this.$grid = $.newDiv("js-uctSeznamAgendGrid")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "fit", // fit (defaultne by melo byt toto), full
                        multi: false,
                        data: new Gordic.Data.View(this.data),
                        selection: function (ev, info) {
                            that.nastaveniPristupnosti();
                        },
                        columns: that.createGridFormat(),
                        defaultProfile: { condFormats: condFormat }
                    }).gautofit();
                }
                /**
                 * Vytvoreni gridformatu
                 * */
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "Shortcut",
                        caption: "jres:30250738", //RC 30250738 : Zkratka agendy
                        width: 120,
                        fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "Name",
                        caption: "jres:30250393", //RC 30250393 : Název agendy
                        width: 270,
                        fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addNumberColumn({
                        name: "NumberOfBooks",
                        caption: "jres:30250735", //RC 30250735 : Počet knih v roce
                        width: 170,
                        fixedWidth: true,
                    })
                        .addNumberColumn({
                        name: "NumberOfOpenedBooks",
                        caption: "jres:30250737", //RC 30250737 : Počet knih - otevřeno
                        width: 180,
                        fixedWidth: true,
                    })
                        .addNumberColumn({
                        name: "NumberOfReadyForClosing",
                        caption: "jres:30250860", //RC 30250860 : Počet knih – připraveno k uzavření
                        width: 200,
                        fixedWidth: true,
                    })
                        .addNumberColumn({
                        name: "NumberOfClosedBooks",
                        caption: "jres:30250736", //RC 30250736 : Počet knih – uzavřeno
                        width: 170,
                        fixedWidth: true,
                    });
                    return gridFormat;
                }
                /**
                 * Nastaveni pristupnosti akci dle stavu a prav formulare
                 *
                 * */
                nastaveniPristupnosti() {
                    this.actions.actCloseAgenda?.updatePermission(this.Permissions);
                }
                /**
                 * Vytvoreni akci
                 * */
                createAction() {
                    let that = this;
                    this.actions.addRange({
                        actCloseAgenda: {
                            caption: "jres:30250745", //RC 30250745 : Uzavřít
                            tooltip: "jres:30250734", //RC 30250734 : Uzavření agendy
                            enabled: false,
                            run: function () {
                                this.setPending(that.hromadneOperace());
                            }
                        },
                    });
                }
            };
            GUctAgenda = __decorate([
                gcontent
                /**
                 *  Agenda uct
                 */
            ], GUctAgenda);
            WebClient.GUctAgenda = GUctAgenda;
            /**
             *
             * Typy vybranych knih
             * */
            class GTypyVybranychKnih {
                constructor() {
                    this.Otevrene = false;
                    this.Uzavrene = false;
                }
            }
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdEFnZW5kYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVY3RBZ2VuZGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTZNZjtBQTdNRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2TW5CO0lBN01nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2TTdCO1FBN01vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQU1uQyxJQUFhLFVBQVU7WUFIdkI7O2VBRUc7WUFDSCxNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBQTVDOztvQkFJYyxnQkFBVyxHQUFZLEtBQUssQ0FBQyxDQUFDLHVCQUF1QjtnQkF3TG5FLENBQUM7Z0JBN0tHLGNBQWM7b0JBQ1YsdUNBQXVDO29CQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLFFBQVEsQ0FBQztvQkFFVCxrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQVEsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUk7eUJBQ25EO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQ7Ozs7Ozs7c0JBT007Z0JBQ0UsZUFBZTtvQkFFbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFeEQsQ0FBQztnQkFJRDs7O3FCQUdLO2dCQUNLLE1BQU07b0JBRVosSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksQ0FBQyxX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QVksS0FBSyxDQUFDO29CQUMxQixhQUFRLEdBQVksS0FBSyxDQUFDO2dCQUNyQyxDQUFDO2FBQUE7UUFFTCxDQUFDLEVBN01vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2TTdCO0lBQUQsQ0FBQyxFQTdNZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNk1uQjtBQUFELENBQUMsRUE3TVMsTUFBTSxLQUFOLE1BQU0sUUE2TWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjdC5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIC8qKlxyXG4gICAgICogIEFnZW5kYSB1Y3RcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdVY3RBZ2VuZGEgZXh0ZW5kcyBHQ29udGVudEJhc2UgIHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJvdGVjdGVkIGxvYWRpbmdEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vIGF0cmlidXQgbmFjaXRhbmkgZGF0XHJcbiAgICAgICAgcHJpdmF0ZSBQZXJtaXNzaW9uczogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb247ICAgLy8gemFzbGFuZSBzZSBzZXJ2ZXJ1XHJcbiAgICAgICAgLy8gZGF0YVxyXG4gICAgICAgIHByb3RlY3RlZCBkYXRhOiBJbnRlcmZhY2UuR1VjdEFnZW5kYUR0b1tdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0YXNrIHBybyBzZXpuYW1cclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCB0YXNrTGlzdDogSXNsLl9UYXNrPElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj47XHJcbiAgICAgICAgLy8gZmlsdHJvdmFjaSBwYW5lbFxyXG4gICAgICAgIHByb3RlY3RlZCAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgLy90aGlzLnRhc2tJZCA9IFwiYWN0U2V6bmFtUHJlZGtvbnRhY2lcIjtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjsgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucyEuYWN0Q2xvc2VBZ2VuZGEsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIEhyb21hZG5lIG9wZXJhY2VcclxuICAgICAgICAgICAgKiAgXHJcbiAgICAgICAgICAgICogZnVuY3Rpb24gSHJvbWFkbmVPcGVyYWNlXHJcbiAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBocm9tYWRuZU9wZXJhY2UoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5VY3RBZ2VuZGEudXphdnJpdEFnZW5kdSgpLmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCByZWxvYWQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCkuYWx3YXlzKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXN0dXBub3N0aSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGNvbmRGb3JtYXQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjb25kRm9ybWF0ID0gW3tcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA3MzlcIiwgLy9SQyAzMDI1MDczOSA6IE90ZXbFmWVuw6kga25paHlcclxuICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQE51bWJlck9mT3BlbmVkQm9va3M+MFwiLFxyXG4gICAgICAgICAgICAgICAgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmxpZ2h0cmVkXHJcbiAgICAgICAgICAgICAgICAsIGFwcGx5VG86XCJOdW1iZXJPZk9wZW5lZEJvb2tzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc0MFwiLCAvL1JDIDMwMjUwNzQwIDogVXphdsWZZW7DqSBrbmloeVxyXG4gICAgICAgICAgICAgICAgZm9ybXVsYTogXCJATnVtYmVyT2ZDbG9zZWRCb29rcz4wXCIsXHJcbiAgICAgICAgICAgICAgICBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcubGlnaHRncmVlblxyXG4gICAgICAgICAgICAgICAgLCBhcHBseVRvOiBcIk51bWJlck9mQ2xvc2VkQm9va3NcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KFwianMtdWN0U2V6bmFtQWdlbmRHcmlkXCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0QWdlbmRhRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMuZGF0YSkgLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcmlzdHVwbm9zdGkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IGNvbmRGb3JtYXRzOiBjb25kRm9ybWF0IH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0QWdlbmRhRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdEFnZW5kYUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU2hvcnRjdXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3MzhcIiwgLy9SQyAzMDI1MDczOCA6IFprcmF0a2EgYWdlbmR5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzOTNcIiwgLy9SQyAzMDI1MDM5MyA6IE7DoXpldiBhZ2VuZHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOdW1iZXJPZkJvb2tzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzM1XCIsIC8vUkMgMzAyNTA3MzUgOiBQb8SNZXQga25paCB2IHJvY2VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOdW1iZXJPZk9wZW5lZEJvb2tzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzM3XCIsIC8vUkMgMzAyNTA3MzcgOiBQb8SNZXQga25paCAtIG90ZXbFmWVub1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOdW1iZXJPZlJlYWR5Rm9yQ2xvc2luZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDg2MFwiLCAvL1JDIDMwMjUwODYwIDogUG/EjWV0IGtuaWgg4oCTIHDFmWlwcmF2ZW5vIGsgdXphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk51bWJlck9mQ2xvc2VkQm9va3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3MzZcIiwgLy9SQyAzMDI1MDczNiA6IFBvxI1ldCBrbmloIOKAkyB1emF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpIGRsZSBzdGF2dSBhIHByYXYgZm9ybXVsYXJlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVByaXN0dXBub3N0aSgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdENsb3NlQWdlbmRhPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdENsb3NlQWdlbmRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzQ1XCIsIC8vUkMgMzAyNTA3NDUgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA3MzRcIiwgLy9SQyAzMDI1MDczNCA6IFV6YXbFmWVuw60gYWdlbmR5XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5ocm9tYWRuZU9wZXJhY2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBUeXB5IHZ5YnJhbnljaCBrbmloXHJcbiAgICAgKiAqL1xyXG4gICAgY2xhc3MgR1R5cHlWeWJyYW55Y2hLbmloIHtcclxuICAgICAgICBwdWJsaWMgT3RldnJlbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgVXphdnJlbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbn0iXX0=