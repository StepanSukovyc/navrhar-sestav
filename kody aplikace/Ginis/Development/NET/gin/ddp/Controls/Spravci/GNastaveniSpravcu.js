"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniSpravcu.ts                   </Name>
//    <Description> Okno nastavení správců                                      </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-08-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GNastaveniSpravcu = class GNastaveniSpravcu extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.taskId = "actGNastaveniSpravcu";
                    that.title = `Nastavení správců`;
                    that.createActions();
                    that.createMenu();
                    that.createFilter();
                    that.createGrid();
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createFilter() {
                    const that = this;
                    that.createFilterForm();
                    $("<div>").appendTo(that.element).
                        gfilterpanel({
                        forms: [that.headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        autoLoadAfterCreatePanel: true,
                        apply: (event, obj) => {
                            that.o_filtr = obj.filter;
                            that.ziskejData(this.o_filtr);
                        }
                    });
                }
                createFilterForm() {
                    const that = this;
                    that.headerForm = new Gordic.Forms.Form({ name: "ddpNastaveniSparvcuFilter" })
                        .addRow("Číslo správce")
                        .addField("gstringbox", {
                        name: "cis_spr"
                    })
                        .addField("gcheck", { name: "vsechny", label: "Zobrazovat všechny správce" })
                        .addRow("Název")
                        .addField("gstringbox", {
                        name: "cis_spr_txt"
                    })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        initialValue: { typ_phl: that.typ_phl, typ_phl_txt: "" },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    });
                    return that.headerForm;
                }
                /** Vytvoří grid **/
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GSpravciGrid",
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: false,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.Spravci(),
                        rowNumbers: false
                    });
                    return that.grid;
                }
                /**Metoda pro vytvoření menu na contentu */
                createMenu() {
                    const that = this;
                    let menu = [
                        {
                            caption: "Nastavení",
                            tooltip: "Změna nastavení správce",
                            icon: "gi-sprava_aplikace",
                            favorite: true,
                            action: that.actions["actGNastaveni"]
                        }
                    ];
                    this.menuBar(menu);
                    that.actions.addRange([
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actClose!"]));
                }
                /**
                * Vytvoří tlačítko nad seznamem kontrol
                */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGNastaveni",
                            run: () => {
                                if (that.PrizSpr == 0 || that.ddp_rad_chspn == 0 || that.rezimCteni) {
                                    that.showFlash({ label: "Není povolena změna nastavení správce", state: "error" });
                                }
                                else {
                                    var selection = that.grid.ggrid("getSelection");
                                    if (selection.length != 0) {
                                        var sel = selection[0];
                                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GDetailSpravce", { ID: "DDPGDetailSpravce#", ico: sel.ico, cis_spr: sel.cis_spr, nazev: sel.nazev, typ_phl: sel.typ_phl, rok: sel.rok, uus: sel.uus, bu_vl: sel.bu_vl, sk_vl: sel.sk_vl, ucs: sel.ucs, editMode: true }, "Detail správce", 800, 420)
                                            .on("close", function (ev, retVal) {
                                            that.ziskejData(that.o_filtr);
                                        });
                                    }
                                }
                            }
                        }
                    ]);
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 */
                ziskejData(filter) {
                    const that = this;
                    that.beginOperation({ id: "nacitani_spr", text: "Načítání správců..." });
                    that.isl.NastaveniSpravcu.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data, { key: "typ_phl" });
                        that.grid.ggrid("setData", view);
                        that.endOperation({ id: "nacitani_spr" });
                    });
                }
            };
            GNastaveniSpravcu = __decorate([
                Decorators.gcontent
            ], GNastaveniSpravcu);
            WebClient.GNastaveniSpravcu = GNastaveniSpravcu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaVNwcmF2Y3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTmFzdGF2ZW5pU3ByYXZjdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQW9LZjtBQXBLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvS25CO0lBcEtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvSzdCO1FBcEtvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBa0IvQyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQztvQkFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztvQkFFakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25FLENBQUM7Z0JBRU8sWUFBWTtvQkFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtvQkFDdkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUM3QixZQUFZLENBQUM7d0JBQ1QsS0FB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QUFDLENBQUM7d0JBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0osQ0FBQTtZQWpLWSxpQkFBaUI7Z0JBRDdCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsaUJBQWlCLENBaUs3QjtZQWpLWSwyQkFBaUIsb0JBaUs3QixDQUFBO1FBQ0wsQ0FBQyxFQXBLb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb0s3QjtJQUFELENBQUMsRUFwS2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9LbkI7QUFBRCxDQUFDLEVBcEtTLE1BQU0sS0FBTixNQUFNLFFBb0tmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYXN0YXZlbmlTcHJhdmN1LnRzICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIG5hc3RhdmVuw60gc3Byw6F2Y8WvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTA4LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50ICAgICAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBHTmFzdGF2ZW5pU3ByYXZjdSBleHRlbmRzIEdDb250ZW50QmFzZSB7ICAgIFxyXG4gICAgICBcclxuICAgICAgICAvKiogxIzDrXNsbyB0eXB1IHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgdHlwX3BobDogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgaGVhZGVyRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHVibGljIG9fZmlsdHI7XHJcblxyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgemRhIGplIHR5cCBwb2hsZWTDoXZreSBzcHLDoXZjb3ZhbsO9ICAqL1xyXG4gICAgICAgIFByaXpTcHI6IG51bWJlcjtcclxuICAgICAgICAvKiogUMWZw616bmFrIHpkYSBqZSB0eXAgcG9obGVkw6F2a3kgdiByZcW+aW11IMSNdGVuw60gICovXHJcbiAgICAgICAgcmV6aW1DdGVuaTogbnVtYmVyO1xyXG4gICAgICAgIGRkcF9yYWRfY2hzcG46IG51bWJlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdOYXN0YXZlbmlTcHJhdmN1XCI7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgTmFzdGF2ZW7DrSBzcHLDoXZjxa9gO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcblxyXG4gICAgICAgICAgICBEZHAuV2ViQ2xpZW50LkNvbW1vbi5CYXNlLkRkcEVrb0luaXQodGhhdCwgdGhhdC5Jbml0RXJyb3JUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtKClcclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuXHJcbiAgICAgICAgICAgICAgICBnZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5oZWFkZXJGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub19maWx0ciA9IG9iai5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoaXMub19maWx0cilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZGRwTmFzdGF2ZW5pU3BhcnZjdUZpbHRlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDrXNsbyBzcHLDoXZjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfc3ByXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInZzZWNobnlcIiwgbGFiZWw6IFwiWm9icmF6b3ZhdCB2xaFlY2hueSBzcHLDoXZjZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19zcHJfdHh0XCIgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcHN0cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwsIHR5cF9waGxfdHh0OiBcIlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmhlYWRlckZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIGdyaWQgKiovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXN0YXZlbmlTcHJhdmN1RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHU3ByYXZjaUdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5TcHJhdmNpKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ3JpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKk1ldG9kYSBwcm8gdnl0dm/FmWVuw60gbWVudSBuYSBjb250ZW50dSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBtZW51OiBNZW51UGFyYW1zW10gPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXZlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJabcSbbmEgbmFzdGF2ZW7DrSBzcHLDoXZjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc3ByYXZhX2FwbGlrYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTmFzdGF2ZW5pXCJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihtZW51KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlIVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b8WZw60gdGxhxI3DrXRrbyBuYWQgc2V6bmFtZW0ga29udHJvbCBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFzdGF2ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlByaXpTcHIgPT0gMCB8fCB0aGF0LmRkcF9yYWRfY2hzcG4gPT0gMCB8fCB0aGF0LnJlemltQ3RlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwiTmVuw60gcG92b2xlbmEgem3Em25hIG5hc3RhdmVuw60gc3Byw6F2Y2VcIiwgc3RhdGU6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXN0YXZlbmlTcHJhdmN1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HRGV0YWlsU3ByYXZjZVwiLCB7IElEOiBcIkREUEdEZXRhaWxTcHJhdmNlI1wiLCBpY286IHNlbC5pY28sIGNpc19zcHI6IHNlbC5jaXNfc3ByLCBuYXpldjogc2VsLm5hemV2LCB0eXBfcGhsOiBzZWwudHlwX3BobCwgcm9rOiBzZWwucm9rLCB1dXM6IHNlbC51dXMsIGJ1X3ZsOiBzZWwuYnVfdmwsIHNrX3ZsOiBzZWwuc2tfdmwsIHVjczogc2VsLnVjcywgZWRpdE1vZGU6IHRydWUgfSwgXCJEZXRhaWwgc3Byw6F2Y2VcIiwgODAwLCA0MjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogRnVua2NlIHBybyB6w61za8OhbsOtIGZpbHRyb3ZhbsO9Y2ggZGF0IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YShmaWx0ZXI6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJuYWNpdGFuaV9zcHJcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gc3Byw6F2Y8WvLi4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLk5hc3RhdmVuaVNwcmF2Y3UubGlzdChcclxuICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhLCB7IGtleTogXCJ0eXBfcGhsXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJuYWNpdGFuaV9zcHJcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==