"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pcn;
    (function (Pcn) {
        var WebApp;
        (function (WebApp) {
            let gcontent = Decorators.gcontent;
            /**
             * Seznam cilovych mist
             *
             * @author Daniel Bouchal
             * @since 484.1.0.1
             */
            let SeznamCilMist = class SeznamCilMist extends Gordic.GContentBase {
                onContentReady() {
                    let that = this;
                    this.menuBar([
                        {
                            action: new GAction({
                                name: "actNovy",
                                caption: "jres:28301237", //RC 28301237 : Nový
                                enabled: !that.VyberHodnot,
                                icon: "gi-plus",
                                favorite: true,
                                run: function () {
                                    that.dialogs.showModalWindow("Gordic.Pcn.WebApp.DetailCilMist", { NovyDoklad: true }, "jres:28301238", 450, 500, true) //RC 28301238 : Nové cílového místo
                                        .on("close", function (ev, res) {
                                        if (res) {
                                            // reload hodnot
                                            that.view.requestData();
                                        }
                                    });
                                }
                            }), visible: !that.VyberHodnot, favorite: true
                        },
                        {
                            action: new GAction({
                                name: "actDetail",
                                caption: "jres:28301239", //RC 28301239 : Detail
                                enabled: !that.VyberHodnot,
                                icon: "gi-detail",
                                favorite: true,
                                run: function () {
                                    that.detail();
                                }
                            }), visible: !that.VyberHodnot, favorite: true
                        },
                        {
                            action: new GAction({
                                name: "actNacist",
                                caption: "jres:28301240", //RC 28301240 : Načíst
                                enabled: true,
                                icon: "gi-refresh",
                                favorite: true,
                                run: function () {
                                    that.view.requestData();
                                }
                            }), favorite: true
                        }
                    ]);
                    that.commandBar([
                        {
                            action: new GAction({
                                name: "actVybrat",
                                caption: "jres:28301241", //RC 28301241 : Vybrat
                                enabled: that.VyberHodnot,
                                icon: "",
                                favorite: true,
                                run: function () {
                                    var s = "";
                                    var vyber = that.grid.ggrid("getSelection", true);
                                    vyber.forEach(function (item) {
                                        if (item.checked) {
                                            if (s == "")
                                                s = item.data.misto;
                                            else
                                                s += ", " + item.data.misto;
                                        }
                                    });
                                    that.close(s);
                                }
                            }), visible: that.VyberHodnot, primary: true, favorite: true
                        },
                        {
                            action: new GAction({
                                name: "actZavrit",
                                caption: "jres:28301242", //RC 28301242 : Zavřít
                                //icon: "gi-window-close",
                                run: function () { that.tryClose(); }
                            })
                        }
                    ]);
                    that.cfSeznam = [{ description: "jres:28301243", formula: "(@aktivita == 900)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple }]; //RC 28301243 : Zrušené záznamy
                    that.view = new Gordic.Isl.View(that.isl.PcnCiloveMisto.list({ filters: { aktivita: that.VyberHodnot ? 100 : null } }), {});
                    that.grid = $("<div>").css("height", "100%").appendTo(that.element)
                        .ggrid({
                        columnMode: "full",
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                var row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                if (!that.VyberHodnot)
                                    that.detail();
                            }
                        }),
                        multi: that.VyberHodnot,
                        defaultProfile: {
                            condFormats: that.cfSeznam,
                            columnList: "misto, viditelnost_txt, dat_zmena"
                        },
                        searchColumns: "*",
                        data: that.view,
                        columns: new Gordic.Data.GridFormat()
                            .addNumberColumn({ name: "id_misto", caption: "jres:28301244", width: 60 }) //RC 28301244 : ID
                            .addTextColumn({ name: "misto", caption: "jres:28301245", width: 250 }) //RC 28301245 : Místo
                            .addTextColumn({ name: "viditelnost_txt", caption: "jres:28301246", width: 90 }) //RC 28301246 : Viditelnost
                            .addNumberColumn({ name: "aktivita", caption: "jres:28301247", width: 60 }) //RC 28301247 : Aktivita
                            .addDateTimeColumn({ name: "dat_zmena", caption: "jres:28301248", width: 140 }) //RC 28301248 : Datum změny
                    }).gautofit();
                    that.grid.ggrid("focus");
                    /*that.view.getLoadingPromise().then(() => {
                        that.grid.ggrid("focus");
                    });*/
                }
                detail() {
                    var that = this;
                    var row = that.grid.ggrid("activeRow", true);
                    if (row && row.data && row._isVirtual !== true) {
                        that.dialogs.showModalWindow("Gordic.Pcn.WebApp.DetailCilMist", { IdMisto: row.data.id_misto, NovyDoklad: false }, "jres:28301249", 450, 500, true) //RC 28301249 : Detail cílového místa
                            .on("close", function (ev, res) {
                            if (res) {
                                // reload hodnot
                                that.view.requestData();
                            }
                        });
                    }
                    else { //RC 28301027 : Upozornění
                        that.dialogs.messageBox("jres:28301027", "jres:28301250"); //RC 28301250 : Není vybrán žádný záznam.
                    }
                }
            };
            SeznamCilMist = __decorate([
                gcontent
            ], SeznamCilMist);
            WebApp.SeznamCilMist = SeznamCilMist;
        })(WebApp = Pcn.WebApp || (Pcn.WebApp = {}));
    })(Pcn = Gordic.Pcn || (Gordic.Pcn = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V6bmFtQ2lsTWlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlem5hbUNpbE1pc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXdKZjtBQXhKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3Sm5CO0lBeEpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0F3SjFCO1FBeEpvQixXQUFBLE1BQU07WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQzs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBVXBDLGNBQWM7b0JBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDVDs0QkFDSSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7Z0NBQ2hCLElBQUksRUFBRSxTQUFTO2dDQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CO2dDQUM5QyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVztnQ0FDMUIsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsUUFBUSxFQUFFLElBQUk7Z0NBQ2QsR0FBRyxFQUFFO29DQUNELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGlDQUFpQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLG1DQUFtQzt5Q0FDckosRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO3dDQUMxQixJQUFJLEdBQUcsRUFBRSxDQUFDOzRDQUNOLGdCQUFnQjs0Q0FDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3Q0FDNUIsQ0FBQztvQ0FDTCxDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDOzZCQUNK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O2dDQUNOLGdCQUFnQjtnQ0FDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDNUIsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUNJLENBQUMsQ0FBTSwwQkFBMEI7d0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLHlDQUF5QztvQkFDeEcsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQTlJWSxhQUFhO2dCQUR6QixRQUFRO2VBQ0ksYUFBYSxDQThJekI7WUE5SVksb0JBQWEsZ0JBOEl6QixDQUFBO1FBQ0wsQ0FBQyxFQXhKb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBd0oxQjtJQUFELENBQUMsRUF4SmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdKbkI7QUFBRCxDQUFDLEVBeEpTLE1BQU0sS0FBTixNQUFNLFFBd0pmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5QY24uV2ViQXBwIHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBjaWxvdnljaCBtaXN0XHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBEYW5pZWwgQm91Y2hhbFxyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuMVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBTZXpuYW1DaWxNaXN0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhQ2Z1OiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBSb2s6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuUGNuLkludGVyZmFjZS5HUGNuQ2lsb3ZlTWlzdG9EdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgVnliZXJIb2Rub3Q6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBjZlNlem5hbTogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W107XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3ROb3Z5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyODMwMTIzN1wiLCAvL1JDIDI4MzAxMjM3IDogTm92w71cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoYXQuVnliZXJIb2Rub3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLlBjbi5XZWJBcHAuRGV0YWlsQ2lsTWlzdFwiLCB7IE5vdnlEb2tsYWQ6IHRydWUgfSwgXCJqcmVzOjI4MzAxMjM4XCIsIDQ1MCwgNTAwLCB0cnVlKSAvL1JDIDI4MzAxMjM4IDogTm92w6kgY8OtbG92w6lobyBtw61zdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWxvYWQgaG9kbm90XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHZpc2libGU6ICF0aGF0LlZ5YmVySG9kbm90LCBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI4MzAxMjM5XCIsIC8vUkMgMjgzMDEyMzkgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoYXQuVnliZXJIb2Rub3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwgdmlzaWJsZTogIXRoYXQuVnliZXJIb2Rub3QsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE5hY2lzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjgzMDEyNDBcIiwgLy9SQyAyODMwMTI0MCA6IE5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnlicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyODMwMTI0MVwiLCAvL1JDIDI4MzAxMjQxIDogVnlicmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuVnliZXJIb2Rub3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2eWJlciA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5YmVyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzID09IFwiXCIpIHMgPSBpdGVtLmRhdGEubWlzdG8hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHMgKz0gXCIsIFwiICsgaXRlbS5kYXRhLm1pc3RvITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHZpc2libGU6IHRoYXQuVnliZXJIb2Rub3QsIHByaW1hcnk6IHRydWUsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjgzMDEyNDJcIiwgLy9SQyAyODMwMTI0MiA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudHJ5Q2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY2ZTZXpuYW0gPSBbeyBkZXNjcmlwdGlvbjogXCJqcmVzOjI4MzAxMjQzXCIsIGZvcm11bGE6IFwiKEBha3Rpdml0YSA9PSA5MDApXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucHVycGxlIH1dOyAvL1JDIDI4MzAxMjQzIDogWnJ1xaFlbsOpIHrDoXpuYW15XHJcbiAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuUGNuQ2lsb3ZlTWlzdG8ubGlzdCh7IGZpbHRlcnM6IHsgYWt0aXZpdGE6IHRoYXQuVnliZXJIb2Rub3QgPyAxMDAgOiBudWxsIH0gfSksIHt9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQoXCI8ZGl2PlwiKS5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgICAgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LlZ5YmVySG9kbm90KSB0aGF0LmRldGFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRoYXQuVnliZXJIb2Rub3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IHRoYXQuY2ZTZXpuYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwibWlzdG8sIHZpZGl0ZWxub3N0X3R4dCwgZGF0X3ptZW5hXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFwiKlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcImlkX21pc3RvXCIsIGNhcHRpb246IFwianJlczoyODMwMTI0NFwiLCB3aWR0aDogNjAgfSkgLy9SQyAyODMwMTI0NCA6IElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJtaXN0b1wiLCBjYXB0aW9uOiBcImpyZXM6MjgzMDEyNDVcIiwgd2lkdGg6IDI1MCB9KSAvL1JDIDI4MzAxMjQ1IDogTcOtc3RvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ2aWRpdGVsbm9zdF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjI4MzAxMjQ2XCIsIHdpZHRoOiA5MCB9KSAvL1JDIDI4MzAxMjQ2IDogVmlkaXRlbG5vc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwiYWt0aXZpdGFcIiwgY2FwdGlvbjogXCJqcmVzOjI4MzAxMjQ3XCIsIHdpZHRoOiA2MCB9KSAvL1JDIDI4MzAxMjQ3IDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfem1lbmFcIiwgY2FwdGlvbjogXCJqcmVzOjI4MzAxMjQ4XCIsIHdpZHRoOiAxNDAgfSkgLy9SQyAyODMwMTI0OCA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG5cclxuICAgICAgICAgICAgLyp0aGF0LnZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciByb3c6IGFueSA9IHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHJvdyAmJiByb3cuZGF0YSAmJiByb3cuX2lzVmlydHVhbCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5QY24uV2ViQXBwLkRldGFpbENpbE1pc3RcIiwgeyBJZE1pc3RvOiByb3cuZGF0YS5pZF9taXN0bywgTm92eURva2xhZDogZmFsc2UgfSwgXCJqcmVzOjI4MzAxMjQ5XCIsIDQ1MCwgNTAwLCB0cnVlKSAvL1JDIDI4MzAxMjQ5IDogRGV0YWlsIGPDrWxvdsOpaG8gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVsb2FkIGhvZG5vdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgICAgICAvL1JDIDI4MzAxMDI3IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjgzMDEwMjdcIiwgXCJqcmVzOjI4MzAxMjUwXCIpOyAvL1JDIDI4MzAxMjUwIDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSB6w6F6bmFtLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19