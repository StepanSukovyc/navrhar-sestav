"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Zastaveni jednoho nebo více platebních příkazů do banky přes průvodce
             *
             * @author Vojtech Blabla
             * @since 480.1.0.12
             */
            let GZastaveniPrikazu = class GZastaveniPrikazu extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    this.actions.addRange({
                        actDetailPrikazu: Gordic.Eko.Action.actionDetail({ run: function () { } }),
                    });
                    new Gordic.Wizard().create({
                        content: that
                    }, {
                        title: "jres:33140010", //RC 33140010 : Pozastavit
                        steps: [
                            {
                                // fáze 0 - Zadání příkazů k úhradě
                                caption: "jres:33140011", //RC 33140011 : Zadání
                                create: function (cnt, contentDiv, change) {
                                    /** menubar */
                                    const menuBarPrikazy = [];
                                    menuBarPrikazy.push({
                                        favorite: true,
                                        action: that.actions.add(new GAction({
                                            name: "actDetail",
                                            icon: "gi-detail",
                                            caption: "jres:33140012", //RC 33140012 : Detail
                                            run: () => {
                                                that.detail();
                                            }
                                        }))
                                    });
                                    // seznam prikazu
                                    let tabPrikazy = $.newDiv().appendTo(contentDiv)
                                        .gtab({
                                        title: "jres:33140013", opened: true /*, locked: true*/, //RC 33140013 : Vybrané příkazy
                                        menuBar: menuBarPrikazy
                                    });
                                    that.gridPrikazy = $("<div class='tabPrikazy'>")
                                        .appendTo(tabPrikazy)
                                        .ggrid({
                                        data: new Gordic.Data.View(that.vybraneRadky),
                                        columnMode: "full",
                                        rowsChecked: "duct_check",
                                        //multi: true,
                                        columns: WebClient.BucGrid.Prikaz.createGridFormat(that),
                                    });
                                },
                                change: function (cnt, contentDiv, change) {
                                },
                                commandBar: { next: "jres:33140014" } //RC 33140014 : Další
                            },
                            //{
                            //    // fáze 1 - Výsledek pozastavení příkazů
                            //    caption: "Výsledek",
                            //    create: function (cnt, contentDiv, change) {
                            //    },
                            //    change: function (cnt, contentDiv, change) {
                            //        change.stepsEnable[2] = true;
                            //    },
                            //    commandBar: { next: "Dokončit" } //RC 24100165 : Další
                            //}
                        ],
                        // ukončení průvodce
                        complete: function (cnt, contentDiv, change) {
                            // ukončení průvodce
                            that.tryClose();
                        },
                        cancel: (cnt, contentDiv, change) => {
                            cnt.tryClose();
                        }
                    });
                }
                /**
                 * Zobrazení detailu prikazu
                 */
                detail() {
                    let that = this;
                    // aktuální vybraná položka
                    //const $grid = this.element.find("gridPrikazy");
                    const aktRadek = that.gridPrikazy.ggrid("activeRow");
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Buc.WebClient.GDetailPrikaz", { gridRemoteControl: new Gordic.Components.GridRC(that.gridPrikazy) }], {
                            ID: 'DetailPrikaz#',
                            ixp: aktRadek?.ixp,
                            radek_uhr: aktRadek?.radek_uhr,
                            ////Ico: aktRadek.ico,
                            ////Ucs: aktRadek.ucs,
                            ////IxsEsu: aktRadek.ixs_esu,
                            ////Sbu: aktRadek.sbu
                        });
                    }
                }
            };
            GZastaveniPrikazu = __decorate([
                gcontent
            ], GZastaveniPrikazu);
            WebClient.GZastaveniPrikazu = GZastaveniPrikazu;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1phc3RhdmVuaVByaWthenUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHWmFzdGF2ZW5pUHJpa2F6dS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBVSxNQUFNLENBc0lmO0FBdElELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXNJbkI7SUF0SWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXNJN0I7UUF0SW9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBb0IvQzs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQTZDLENBQUMsRUFBRSxDQUFDO3FCQUM1RyxDQUFDLENBQUM7b0JBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUN0Qjt3QkFDSSxPQUFPLEVBQUUsSUFBSTtxQkFDaEIsRUFDRDt3QkFDSSxLQUFLLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDbEQsS0FBSyxFQUFFOzRCQUNIO2dDQUNJLG1DQUFtQztnQ0FDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7Z0NBQ2hELE1BQU0sRUFBRSxVQUFVLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTTtvQ0FFckMsY0FBYztvQ0FDZCxNQUFNLGNBQWMsR0FBaUIsRUFBRSxDQUFDO29DQUN4QyxjQUFjLENBQUMsSUFBSSxDQUFDO3dDQUNoQixRQUFRLEVBQUUsSUFBSTt3Q0FDZCxNQUFNLEVBQUUsSUFBSSxDQUFD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aUI7Z0JBRDdCLFFBQVE7ZUFDSSxpQkFBaUIsQ0EySDdCO1lBM0hZLDJCQUFpQixvQkEySDdCLENBQUE7UUFDTCxDQUFDLEVBdElvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzSTdCO0lBQUQsQ0FBQyxFQXRJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc0luQjtBQUFELENBQUMsRUF0SVMsTUFBTSxLQUFOLE1BQU0sUUFzSWYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBaYXN0YXZlbmkgamVkbm9obyBuZWJvIHbDrWNlIHBsYXRlYm7DrWNoIHDFmcOta2F6xa8gZG8gYmFua3kgcMWZZXMgcHLFr3ZvZGNlXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBWb2p0ZWNoIEJsYWJsYVxyXG4gICAgICogQHNpbmNlIDQ4MC4xLjAuMTJcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1phc3RhdmVuaVByaWthenUgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHByaWthenUgKGbDoXplIDApXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdyaWRQcmlrYXp5OiBKUXVlcnk7XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gSUtDXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5HZW5lcmFsLkdJa2N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBJa2M6IEdvcmRpYy5HZW5lcmFsLkdJa2M7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5YnJhbmUgcmFka3kgcHJvIHByb3ZvZGNlIHphc3RhdmVuaSBwcmlrYXp1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2eWJyYW5lUmFka3k6IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG9bXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkZWZpbm92w6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbFByaWthenU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IHJ1bjogZnVuY3Rpb24gKCkgeyAvKnRoYXQuZGV0YWlsUHJpa2F6dShmYWxzZSk7Ki8gfSB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBuZXcgR29yZGljLldpemFyZCgpLmNyZWF0ZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0aGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwMTBcIiwgLy9SQyAzMzE0MDAxMCA6IFBvemFzdGF2aXRcclxuICAgICAgICAgICAgICAgICAgICBzdGVwczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAwIC0gWmFkw6Fuw60gcMWZw61rYXrFryBrIMO6aHJhZMSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwMTFcIiwgLy9SQyAzMzE0MDAxMSA6IFphZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogbWVudWJhciAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVCYXJQcmlrYXp5OiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyUHJpa2F6eS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzE0MDAxMlwiLFx0XHRcdC8vUkMgMzMxNDAwMTIgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSBwcmlrYXp1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhYlByaWthenkgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwMTNcIiwgb3BlbmVkOiB0cnVlLyosIGxvY2tlZDogdHJ1ZSovLCAvL1JDIDMzMTQwMDEzIDogVnlicmFuw6kgcMWZw61rYXp5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBtZW51QmFyUHJpa2F6eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRQcmlrYXp5ID0gJChcIjxkaXYgY2xhc3M9J3RhYlByaWthenknPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiUHJpa2F6eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQcmlrYXpEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQudnlicmFuZVJhZGt5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c0NoZWNrZWQ6IFwiZHVjdF9jaGVja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEJ1Y0dyaWQuUHJpa2F6LmNyZWF0ZUdyaWRGb3JtYXQodGhhdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiB7IG5leHQ6IFwianJlczozMzE0MDAxNFwiIH0gLy9SQyAzMzE0MDAxNCA6IERhbMWhw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIGbDoXplIDEgLSBWw71zbGVkZWsgcG96YXN0YXZlbsOtIHDFmcOta2F6xa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY3JlYXRlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNoYW5nZS5zdGVwc0VuYWJsZVsyXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbW1hbmRCYXI6IHsgbmV4dDogXCJEb2tvbsSNaXRcIiB9IC8vUkMgMjQxMDAxNjUgOiBEYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbDogKGNudCwgY29udGVudERpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgcHJpa2F6dVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIHZ5YnJhbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgIC8vY29uc3QgJGdyaWQgPSB0aGlzLmVsZW1lbnQuZmluZChcImdyaWRQcmlrYXp5XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRlayA9IHRoYXQuZ3JpZFByaWthenkuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1ByaWthekR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RldGFpbFByaWthelwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuZ3JpZFByaWthenkpIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxQcmlrYXojJyxcclxuICAgICAgICAgICAgICAgICAgICBpeHA6IGFrdFJhZGVrPy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtfdWhyOiBha3RSYWRlaz8ucmFkZWtfdWhyLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9JY286IGFrdFJhZGVrLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAvLy8vVWNzOiBha3RSYWRlay51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL0l4c0VzdTogYWt0UmFkZWsuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAvLy8vU2J1OiBha3RSYWRlay5zYnVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=