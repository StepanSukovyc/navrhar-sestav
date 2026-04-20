"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniSvozuSeznam.ts               </Name>
//    <Description> Odpady - Nastavení svozu odpadu                             </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-20                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Odpady - Nastavení svozu odpadu
             * @author Vojtěch Čech
             * @date 20.01.2026
             */
            let GNastaveniSvozuSeznam = class GNastaveniSvozuSeznam extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Režim úprav */
                    this.edit = false;
                }
                onContentReady() {
                    const that = this;
                    that.title = "Nastavení svozu odpadu";
                    that.taskId = "actGNastaveniSvozuSeznam";
                    that.ixp = that.dto.ixp ?? "";
                    that.priznakEditace();
                    that.createForm();
                    that.createGrid();
                    that.createActions();
                    that.createMenuBar();
                    that.ziskejData();
                }
                /** Nastavení režimu úprav */
                priznakEditace() {
                    var that = this;
                    that.isl.DdpInterfaceNew.vratVlastnika({ ixp: that.ixp })
                        .get()
                        .done((vlastnik) => {
                        if (vlastnik == that.ixsFun)
                            that.edit = true;
                        else
                            that.edit = false;
                    });
                }
                /** Vytvoří formulář s názvem externího subjektu */
                createForm() {
                    var that = this;
                    $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formEsu", layoutDescriptor: "L1M1S1" })
                        .addRow("Poplatník")
                        .addField("gstringbox", {
                        name: "esu_txt",
                        initialValue: that.dto.esu_txt,
                        disabled: true
                    }));
                }
                /** Vytvoří grid/seznam případů */
                createGrid() {
                    var that = this;
                    return that.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GNastaveniSvozuSeznamGrid",
                        data: [],
                        columnMode: "fit",
                        renderMode: "auto",
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.NastaveniSvozu(),
                        rowNumbers: false,
                        profiles: [{
                                name: "aktivita", _locked: true, _default: true,
                                condFormats: [
                                    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, "100"))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                                ]
                            }]
                    });
                }
                /** Vytvoření akcí pro položky v menubaru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actDetail: {
                            name: "actDetail",
                            caption: "Detail",
                            tooltip: "",
                            run: () => {
                                var row = that.grid.ggrid("activeRow");
                                debugger;
                                if (row != undefined)
                                    that.navigate("Gordic.Ddp.WebClient.GNastaveniSvozuDetail", { ID: "DDPGNastaveniSvozuDetail#", Ixp: row.ixp_ddp, SerCislo: row.ser_cislo, edit: that.edit });
                            }
                        },
                        actNovy: {
                            name: "actNovy",
                            caption: "Nový",
                            tooltip: "",
                            run: () => {
                                // TODO: implement action
                            }
                        },
                        actZrusit: {
                            name: "actZrusit",
                            caption: "Zrušit",
                            tooltip: "",
                            run: () => {
                                // TODO: implement action
                            }
                        },
                        actNemovitost: {
                            name: "actNemovitost",
                            caption: "Nemovitost",
                            tooltip: "Detail nemovitosti v REN",
                            run: () => {
                                // TODO: implement action
                            }
                        },
                        actPrepocet: {
                            name: "actPrepocet",
                            caption: "Přepočet",
                            tooltip: "",
                            run: () => {
                                // TODO: implement action
                            }
                        }
                    });
                }
                /** Vytvoření položek v menubaru*/
                createMenuBar() {
                    const that = this;
                    let menu = [];
                    menu.push({ action: that.actions.actDetail, favorite: true }, { action: that.actions.actNovy, favorite: true }, { action: that.actions.actZrusit, favorite: true }, { action: that.actions.actNemovitost, favorite: true }, { action: that.actions.actPrepocet, favorite: true });
                    that.menuBar(menu);
                }
                /** Funkce pro získání dat */
                ziskejData() {
                    const that = this;
                    var filter = {
                        ixp: that.ixp
                    };
                    that.view = new Gordic.Isl.View(that.isl.Odpady.listNastaveniSvozu(rq => {
                        return {
                            filters: filter,
                            fragments: ["Default"]
                        };
                    }));
                    that.grid.ggrid("setData", that.view);
                }
            };
            GNastaveniSvozuSeznam = __decorate([
                Decorators.gcontent
            ], GNastaveniSvozuSeznam);
            WebClient.GNastaveniSvozuSeznam = GNastaveniSvozuSeznam;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaVN2b3p1U2V6bmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05hc3RhdmVuaVN2b3p1U2V6bmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBZ0xmO0FBaExELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdMbkI7SUFoTGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdMN0I7UUFoTG9CLFdBQUEsU0FBUztZQUMxQjs7OztlQUlHO1lBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXZEOztvQkFlSSxrQkFBa0I7b0JBQ2xCLFNBQUksR0FBWSxLQUFLLENBQUM7Z0JBd0oxQixDQUFDO2dCQXRKRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRywwQkFBMEIsQ0FBQztvQkFFekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7b0JBRTlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsNkJBQTZCO2dCQUNyQixjQUFjO29CQUNsQixJQUFJLElBQUksR0FB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LyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR05hc3RhdmVuaVN2b3p1U2V6bmFtLnRzICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9kcGFkeSAtIE5hc3RhdmVuw60gc3ZvenUgb2RwYWR1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI2LTAxLTIwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBPZHBhZHkgLSBOYXN0YXZlbsOtIHN2b3p1IG9kcGFkdSBcclxuICAgICAqIEBhdXRob3IgVm9qdMSbY2ggxIxlY2hcclxuICAgICAqIEBkYXRlIDIwLjAxLjIwMjZcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTmFzdGF2ZW5pU3ZvenVTZXpuYW0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKiogRGF0YSB2eWJyYW7DqWhvIMWZw6Fka3UgKi9cclxuICAgICAgICBkdG86IEludGVyZmFjZS5MSy5Jc2wuR1NpbXBsZVByaXBhZER0bztcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1ICovXHJcbiAgICAgICAgaXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFRhYnVsa2EgbmVtb3ZpdG9zdMOtICovXHJcbiAgICAgICAgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIFZpZXcgcHJvIGdyaWRcclxuICAgICAgICAqIEB0eXBlIHtJc2wuVmlldzxURGF0YT59XHJcbiAgICAgICAgKi9cclxuICAgICAgICB2aWV3OiBJc2wuVmlldztcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgdcW+aXZhdGVsZSAqL1xyXG4gICAgICAgIGl4c0Z1bjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSZcW+aW0gw7pwcmF2ICovXHJcbiAgICAgICAgZWRpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIk5hc3RhdmVuw60gc3ZvenUgb2RwYWR1XCI7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHTmFzdGF2ZW5pU3ZvenVTZXpuYW1cIjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXhwID0gdGhhdC5kdG8uaXhwID8/IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnByaXpuYWtFZGl0YWNlKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXZlbsOtIHJlxb5pbXUgw7pwcmF2ICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcml6bmFrRWRpdGFjZSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5EZHBJbnRlcmZhY2VOZXcudnJhdFZsYXN0bmlrYSh7IGl4cDogdGhhdC5peHAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHZsYXN0bmlrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZsYXN0bmlrID09IHRoYXQuaXhzRnVuKSB0aGF0LmVkaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhhdC5lZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBmb3JtdWzDocWZIHMgbsOhenZlbSBleHRlcm7DrWhvIHN1Ympla3R1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUVzdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGxhdG7DrWtcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5kdG8uZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBncmlkL3Nlem5hbSBwxZnDrXBhZMWvICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HTmFzdGF2ZW5pU3ZvenVEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdOYXN0YXZlbmlTdm96dVNlem5hbUdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5OYXN0YXZlbmlTdm96dSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6ICdOT1QoRVFVQUxTKEBha3Rpdml0YSwgXCIxMDBcIikpJywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmxpZ2h0Z3JheSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHBvbG/Fvmt5IHYgbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXN0YXZlbmlTdm96dUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCkgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYXN0YXZlbmlTdm96dURldGFpbFwiLCB7IElEOiBcIkREUEdOYXN0YXZlbmlTdm96dURldGFpbCNcIiwgSXhwOiByb3cuaXhwX2RkcCwgU2VyQ2lzbG86IHJvdy5zZXJfY2lzbG8sIGVkaXQ6IHRoYXQuZWRpdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Tm92eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgYWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3ROZW1vdml0b3N0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3ROZW1vdml0b3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOZW1vdml0b3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJEZXRhaWwgbmVtb3ZpdG9zdGkgdiBSRU5cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcmVwb2NldDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJlcG9jZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWVwb8SNZXRcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgYWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHBvbG/FvmVrIHYgbWVudWJhcnUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudTogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0Tm92eSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3ROZW1vdml0b3N0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmVwb2NldCwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIobWVudSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRnVua2NlIHBybyB6w61za8OhbsOtIGRhdCAqL1xyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgaXhwOiB0aGF0Lml4cFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuT2RwYWR5Lmxpc3ROYXN0YXZlbmlTdm96dShcclxuICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiRGVmYXVsdFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=