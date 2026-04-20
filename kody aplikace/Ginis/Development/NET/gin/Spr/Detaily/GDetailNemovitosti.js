"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            /**
             * GDetail
             *
             * @author Petr Dytrich
             */
            let GDetailNemovitosti = class GDetailNemovitosti extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    //if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixp_spis: this.IxpSpis, por_cislo: this.Porcislo };
                    //else this.model = { ixp: this.IxpSpis };
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = { ixp_spis: this.IxpSpis, por_cislo: this.Porcislo };
                    //this.loadData(this).done(function () {
                    //    that.setRezim(that.Rezim, that);
                    //});
                    this.onContentReadyBase(that);
                    Gordic.ResizeManager.forceRefresh(this.element.get(0));
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("nemovitostDetail", {
                        //tabGroups:
                        //{
                        //    tabGroupZakladni:
                        //    {
                        //        caption: "Profil nemovitosti"
                        //    },
                        //},
                        tabs: {
                            tabZakladni: {
                                //tabParams: {
                                //    opened: true, locked: true, group: { id: "tabGroupZakladni" },
                                //},
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                    //that.findFields("adresa_ruian").gfield("getButton", "selector").gbutton("option", "params").action!.enabled(false);
                                }
                            }
                        }
                        //actions:
                        //{
                        //},
                        //menuBar: [
                        //    {
                        //        id: "menuNemovitost", caption: "jres:25200466", type: "static", after: "akce", children: [ //RC 25200466 : Nemovitost
                        //            //{ id: "menuTiskSablony", action: "actTiskSablony", favorite: false },
                        //        ]
                        //    }
                        //],
                        //headerForm: this.createForm()
                    }, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    var that = this;
                    this.showRestore = false;
                    var _afterDelete = function (content) {
                        content.tryClose();
                    };
                    if (that.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */) {
                        that.listControls_setup({
                            rowToDto: function (gridState) {
                                //var gTabManager = that.find(".gtabmanager");
                                //var active;
                                //if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                                //return { Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, PorCislo: gridState.currentRow.data.por_cislo, selectedTabGroup: active };
                                return { Rezim: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */, PorCislo: gridState.currentRow.data.por_cislo };
                            },
                            nextItemTemplate: "jres:25200473", //RC 25200473 : Následující záznam<br>Parcela: {cislo_par_nazev}
                            prevItemTemplate: "jres:25200474" //RC 25200474 : Předchozí záznam<br>Parcela: {cislo_par_nazev}
                        });
                    }
                    this.afterDelete = _afterDelete;
                    this.enableActions = function (enable) {
                        //that.actions.actTiskSablony!.enabled(!enable && that.model.Permissions.CanTiskSablony.value);
                        that.changeAktivitaComponentEnableActions(enable);
                        //$.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.dotcSubjUkonuTab).enableActions();
                    };
                    this.afterLoadData = function (content) {
                        var prom = $.Deferred();
                        var that = this;
                        var readOnly = that.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                        //var gTabManager = that.find(".gtabmanager");
                        //if (!readOnly) gTabManager.gtabmanager("setActive", "tabGroupZakladni");
                        //gTabManager.gtabmanager("visibleGroup", "tabGroupDotcSubjUkonu", readOnly);
                        //this.afterLoadDataForTab(this.dotcSubjUkonuTab);
                        return prom;
                    };
                }
                //afterLoadDataForTab(tabControl: JQuery<HTMLElement>) {
                //    if (tabControl) {
                //        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(tabControl);
                //        if (tabCnt != null && typeof (tabCnt.reloadData) === "function") {
                //            tabCnt.reloadData();
                //        }
                //    }
                //}
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var readOnly = that.RezimDetailu == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */;
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200467", opened: true }) //RC 25200467 : Detail nemovitosti
                        .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                        .addRow("jres:25200468") //RC 25200468 : Druh pozemku
                        .addField("gstringbox", "w-12 w-L-6", { name: "druh_poz_nazev", customClass: "enabled", disabled: readOnly })
                        .addRow("jres:25200469") //RC 25200469 : Obec
                        .addField("gstringbox", "w-12 w-L-6", { name: "obec_nazev", customClass: "enabled", disabled: readOnly })
                        .addRow("jres:25200470") //RC 25200470 : Katastrální území
                        .addField("gstringbox", "w-12 w-L-6", { name: "kat_uzemi_nazev", customClass: "enabled", disabled: readOnly })
                        .addRow("jres:25200471") //RC 25200471 : Výměra
                        .addField("gnumberbox", "w-L-2 w-M-6", {
                        name: "vymera_par", customClass: "enabled", disabled: readOnly, emptyValue: null,
                        validators: [new Gordic.Validators.Required()],
                        flag: "required"
                    })
                        .addRow("jres:25200472") //RC 25200472 : Číslo parcely
                        .addField("gstringbox", "w-L-4 w-M-6", { name: "cislo_par_nazev", disabled: readOnly });
                    return form;
                }
            };
            GDetailNemovitosti = __decorate([
                gcontent
            ], GDetailNemovitosti);
            WebApp.GDetailNemovitosti = GDetailNemovitosti;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE5lbW92aXRvc3RpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbE5lbW92aXRvc3RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E0S2Y7QUE1S0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNEtuQjtJQTVLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBNEsxQjtRQTVLb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7ZUFJRztZQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxxQkFPdkM7Z0JBT0csY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDL0IsK0lBQStJO29CQUMvSSwwQ0FBMEM7b0JBRTFDLElBQUksSUFBSSxDQUFDLEtBQUssMkRBQW1EO3dCQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDO29CQUU1SSx3Q0FBd0M7b0JBQ3hDLHNDQUFzQztvQkFDdEMsS0FBSztvQkFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTlCLE9BQUEsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxrQkFBa0IsRUFBRTt3QkFDNUMs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QUN0RjtvQkFDTCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQVVMLENBQUE7WUFsS2Esa0JBQWtCO2dCQUQ5QixRQUFRO2VBQ0ksa0JBQWtCLENBa0svQjtZQWxLYSx5QkFBa0IscUJBa0svQixDQUFBO1FBQ0osQ0FBQyxFQTVLb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBNEsxQjtJQUFELENBQUMsRUE1S2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRLbkI7QUFBRCxDQUFDLEVBNUtTLE1BQU0sS0FBTixNQUFNLFFBNEtmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHRGV0YWlsXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgUGV0ciBEeXRyaWNoXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxOZW1vdml0b3N0aSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxcclxuICAgICAgICBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zICZcclxuICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zPj4gJlxyXG4gICAgICAgIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zICZcclxuICAgICAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0NoYW5nZUFrdGl2aXRhUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucz4+ICZcclxuICAgICAgICBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdMaXN0Q29udHJvbHNFeHRlbnNpb25zPEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdOZW1vdml0b3N0U3ByYXZuaWhvUml6ZW5pRHRvPiAmXHJcbiAgICAgICAgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuU3ByLkludGVyZmFjZS5HTmVtb3ZpdG9zdFNwcmF2bmlob1JpemVuaUR0bz4+PlxyXG4gICAgPiBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIFBvcmNpc2xvOiBudW1iZXI7XHJcbiAgICAgICAgLy9JeHNEc3I6IHN0cmluZztcclxuICAgICAgICBHcmlkUmM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlJlemltID0gdGhpcy5SZXppbURldGFpbHU7XHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHRoaXMub3JpZ2luYWxNb2RlbCA9IHsgaXhwX3NwaXM6IHRoaXMuSXhwU3BpcywgcG9yX2Npc2xvOiB0aGlzLlBvcmNpc2xvIH07XHJcbiAgICAgICAgICAgIC8vZWxzZSB0aGlzLm1vZGVsID0geyBpeHA6IHRoaXMuSXhwU3BpcyB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuUmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcpIHRoaXMub3JpZ2luYWxNb2RlbCA9IHsgaXhwX3NwaXM6IHRoaXMuSXhwU3BpcywgcG9yX2Npc2xvOiB0aGlzLlBvcmNpc2xvfTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkRGF0YSh0aGlzKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5zZXRSZXppbSh0aGF0LlJlemltLCB0aGF0KTtcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRSZWFkeUJhc2UodGhhdCk7XHJcblxyXG4gICAgICAgICAgICBSZXNpemVNYW5hZ2VyLmZvcmNlUmVmcmVzaCh0aGlzLmVsZW1lbnQuZ2V0KDApISk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwibmVtb3ZpdG9zdERldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAvL3RhYkdyb3VwczpcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGFiR3JvdXBaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIlByb2ZpbCBuZW1vdml0b3N0aVwiXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgdGFiczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJaYWtsYWRuaTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLCBncm91cDogeyBpZDogXCJ0YWJHcm91cFpha2xhZG5pXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcyhcImFkcmVzYV9ydWlhblwiKS5nZmllbGQoXCJnZXRCdXR0b25cIiwgXCJzZWxlY3RvclwiKS5nYnV0dG9uKFwib3B0aW9uXCIsIFwicGFyYW1zXCIpLmFjdGlvbiEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FjdGlvbnM6XHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlkOiBcIm1lbnVOZW1vdml0b3N0XCIsIGNhcHRpb246IFwianJlczoyNTIwMDQ2NlwiLCB0eXBlOiBcInN0YXRpY1wiLCBhZnRlcjogXCJha2NlXCIsIGNoaWxkcmVuOiBbIC8vUkMgMjUyMDA0NjYgOiBOZW1vdml0b3N0XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8veyBpZDogXCJtZW51VGlza1NhYmxvbnlcIiwgYWN0aW9uOiBcImFjdFRpc2tTYWJsb255XCIsIGZhdm9yaXRlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIF1cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXSxcclxuICAgICAgICAgICAgICAgIC8vaGVhZGVyRm9ybTogdGhpcy5jcmVhdGVGb3JtKClcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXN0b3JlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2FmdGVyRGVsZXRlID0gZnVuY3Rpb24gKGNvbnRlbnQ6IEdDb250ZW50ICYgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsUmVsb2FkQ29tcG9uZW50RXh0ZW5zaW9ucyAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5SZXppbURldGFpbHU9PSBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5saXN0Q29udHJvbHNfc2V0dXAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGdUYWJNYW5hZ2VyID0gdGhhdC5maW5kKFwiLmd0YWJtYW5hZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBhY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGdUYWJNYW5hZ2VyICE9IG51bGwgJiYgZ1RhYk1hbmFnZXIgIT0gdW5kZWZpbmVkKSBhY3RpdmUgPSBnVGFiTWFuYWdlci5ndGFibWFuYWdlcihcImdldEFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4geyBSZXppbTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcsIFBvckNpc2xvOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLnBvcl9jaXNsbywgc2VsZWN0ZWRUYWJHcm91cDogYWN0aXZlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IFJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldywgUG9yQ2lzbG86IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEucG9yX2Npc2xvIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbVRlbXBsYXRlOiBcImpyZXM6MjUyMDA0NzNcIiwgLy9SQyAyNTIwMDQ3MyA6IE7DoXNsZWR1asOtY8OtIHrDoXpuYW08YnI+UGFyY2VsYToge2Npc2xvX3Bhcl9uYXpldn1cclxuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbVRlbXBsYXRlOiBcImpyZXM6MjUyMDA0NzRcIiAvL1JDIDI1MjAwNDc0IDogUMWZZWRjaG96w60gesOhem5hbTxicj5QYXJjZWxhOiB7Y2lzbG9fcGFyX25hemV2fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJEZWxldGUgPSBfYWZ0ZXJEZWxldGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnMgPSBmdW5jdGlvbiAoZW5hYmxlOiBib29sZWFuKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuYWN0VGlza1NhYmxvbnkhLmVuYWJsZWQoIWVuYWJsZSAmJiB0aGF0Lm1vZGVsLlBlcm1pc3Npb25zLkNhblRpc2tTYWJsb255LnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNoYW5nZUFrdGl2aXRhQ29tcG9uZW50RW5hYmxlQWN0aW9ucyhlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgLy8kLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGhhdC5kb3RjU3VialVrb251VGFiKS5lbmFibGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFmdGVyTG9hZERhdGEgPSBmdW5jdGlvbiAoY29udGVudDogR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9tID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRPbmx5ID0gdGhhdC5SZXppbURldGFpbHUgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXc7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBnVGFiTWFuYWdlciA9IHRoYXQuZmluZChcIi5ndGFibWFuYWdlclwiKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKCFyZWFkT25seSkgZ1RhYk1hbmFnZXIuZ3RhYm1hbmFnZXIoXCJzZXRBY3RpdmVcIiwgXCJ0YWJHcm91cFpha2xhZG5pXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9nVGFiTWFuYWdlci5ndGFibWFuYWdlcihcInZpc2libGVHcm91cFwiLCBcInRhYkdyb3VwRG90Y1N1YmpVa29udVwiLCByZWFkT25seSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuYWZ0ZXJMb2FkRGF0YUZvclRhYih0aGlzLmRvdGNTdWJqVWtvbnVUYWIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FmdGVyTG9hZERhdGFGb3JUYWIodGFiQ29udHJvbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgIC8vICAgIGlmICh0YWJDb250cm9sKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnN0IHRhYkNudCA9ICQuY29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sPih0YWJDb250cm9sKTtcclxuICAgICAgICAvLyAgICAgICAgaWYgKHRhYkNudCAhPSBudWxsICYmIHR5cGVvZiAodGFiQ250LnJlbG9hZERhdGEpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRhYkNudC5yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcbiAgICAgICAgICAgIHZhciByZWFkT25seSA9IHRoYXQuUmV6aW1EZXRhaWx1ID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3O1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MjUyMDA0NjdcIiwgb3BlbmVkOiB0cnVlIH0pIC8vUkMgMjUyMDA0NjcgOiBEZXRhaWwgbmVtb3ZpdG9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0xMlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMi0xMC0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDA0NjhcIikgLy9SQyAyNTIwMDQ2OCA6IERydWggcG96ZW1rdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTIgdy1MLTZcIiwgeyBuYW1lOiBcImRydWhfcG96X25hemV2XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZGlzYWJsZWQ6IHJlYWRPbmx5IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDQ2OVwiKSAvL1JDIDI1MjAwNDY5IDogT2JlY1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTIgdy1MLTZcIiwgeyBuYW1lOiBcIm9iZWNfbmF6ZXZcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogcmVhZE9ubHkgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDcwXCIpIC8vUkMgMjUyMDA0NzAgOiBLYXRhc3Ryw6FsbsOtIMO6emVtw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyIHctTC02XCIsIHsgbmFtZTogXCJrYXRfdXplbWlfbmF6ZXZcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogcmVhZE9ubHkgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDcxXCIpIC8vUkMgMjUyMDA0NzEgOiBWw71txJtyYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctTC0yIHctTS02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5bWVyYV9wYXJcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogcmVhZE9ubHksIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDcyXCIpIC8vUkMgMjUyMDA0NzIgOiDEjMOtc2xvIHBhcmNlbHlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LUwtNCB3LU0tNlwiLCB7IG5hbWU6IFwiY2lzbG9fcGFyX25hemV2XCIsIGRpc2FibGVkOiByZWFkT25seSB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAvLyAgICAgcHJpdmF0ZSBfcmVsb2FkRGF0YSgpOiB2b2lkIHtcclxuICAgLy8gICAgICAgICAvL3ZhciBnVGFiTWFuYWdlciA9IHRoaXMuZmluZChcIi5ndGFibWFuYWdlclwiKTtcclxuICAgLy8gICAgICAgICAvL3ZhciBhY3RpdmU7XHJcbiAgIC8vICAgICAgICAgLy9pZiAoZ1RhYk1hbmFnZXIgIT0gbnVsbCAmJiBnVGFiTWFuYWdlciAhPSB1bmRlZmluZWQpIGFjdGl2ZSA9IGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwiZ2V0QWN0aXZlXCIpO1xyXG4gICAvLyAgICAgICAgIHRoaXMuem1lbmEgPSB0cnVlO1xyXG4gICAvLyAgICAgICAgIC8vdGhpcy5sb2FkKHsgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldywgaW50ZXJuYWw6IHRydWUsIHNlbGVjdGVkVGFiR3JvdXA6IGFjdGl2ZSB9KTtcclxuICAgLy8gICAgICAgICB0aGlzLmxvYWQoeyBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3LCBpbnRlcm5hbDogdHJ1ZSB9KTtcclxuICAgLy8gICAgIH1cclxuICAgfVxyXG59XHJcblxyXG4iXX0=