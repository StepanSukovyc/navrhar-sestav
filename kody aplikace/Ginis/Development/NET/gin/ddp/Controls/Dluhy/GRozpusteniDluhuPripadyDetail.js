"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GRozpusteniDluhuPripadyDetail.ts       </Name>
//    <Description> Okno detailu případu rozpuštění dluhů                       </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-09-04                                                  </Created>
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
            let GRozpusteniDluhuPripadyDetail = class GRozpusteniDluhuPripadyDetail extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    this.data = {};
                }
                //Program začíná zde, využívám pro vytvoření tabu s akcí TISK
                onDetailBuilderInit(builder) {
                    var that = this;
                    that.createActions();
                }
                //Toto se načte drůhé a onContentReady následovně
                onDetailBuilderBuild(builder) {
                    var that = this;
                    that.createForm();
                }
                onContentReady() {
                    var that = this;
                    that.title = `Detail případu rozpouštění dluhu`;
                    that.setBreadcrumbs([{
                            caption: that.title,
                            action: that.actions["actGRozpusteniZavritPotomky"]
                        }]);
                    that.ziskejData();
                }
                /**
               * Vytvoření formuláře
               */
                createForm() {
                    var that = this;
                    let form = new Gordic.Forms.Form({ name: "detailForm", layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-0-12-0" })
                        .addSection()
                        .addRow()
                        .addText("Typ pohledávky", "w-9")
                        .addText("Poř. č.", "w-3")
                        .addRow()
                        .addField("gselectbox", "w-9", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl = value.typ_phl",
                        disabled: true
                    })
                        .addField("gnumberbox", "w-3", {
                        name: "poradi",
                        disabled: true
                    })
                        .addSection("Plátce")
                        .addRow()
                        .addText("Identifikátor poplatníka", "w-3")
                        .addText("VS poplatníka", "w-3")
                        .addText("Název poplatníka", "w-6")
                        .addRow()
                        .addField("gstringbox", "w-3", {
                        name: "ixp_pl",
                        disabled: true
                    })
                        .addField("gstringbox", "w-3", {
                        name: "vs_pl",
                        disabled: true
                    })
                        .addField("gstringbox", "w-6", {
                        name: "ixs_esu_pl_txt", //pretty sure I have it differently in grid (if it is that)
                        disabled: true
                    })
                        .addRow()
                        .addText("Platnost od", "w-3")
                        .addText("Platnost do", "w-3")
                        .addText(that.globalSettings?.get("Global.Ddp.ObecneSettings.PopisCastka") ?? "Částka v CZK", "w-3")
                        .addRow()
                        .addField("gdatebox", "w-3", {
                        name: "dat_od_pl",
                        disabled: true
                    })
                        .addField("gdatebox", "w-3", {
                        name: "dat_do_pl",
                        disabled: true
                    })
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_celk_pl",
                        disabled: true
                    })
                        .addField("gbutton", "w-3", { params: { primary: false, id: "actSaldoPl_button", action: this.actions["actSaldoPl"] } })
                        .addRow()
                        .addSection("Poplatník")
                        .addText("Identifikátor poplatníka", "w-3")
                        .addText("VS poplatníka", "w-3")
                        .addText("Název poplatníka", "w-6")
                        .addRow()
                        .addField("gstringbox", "w-3", {
                        name: "ixp_pop",
                        disabled: true
                    })
                        .addField("gstringbox", "w-3", {
                        name: "vs_pop",
                        disabled: true
                    })
                        .addField("gstringbox", "w-6", {
                        name: "ixs_esu_pop_txt",
                        disabled: true
                    })
                        .addRow()
                        .addText("Platnost od", "w-3")
                        .addText("Platnost do", "w-3")
                        .addText(that.globalSettings?.get("Global.Ddp.ObecneSettings.PopisCastka") ?? "Částka v CZK", "w-3")
                        .addRow()
                        .addField("gdatebox", "w-3", {
                        name: "dat_od_pop",
                        disabled: true
                    })
                        .addField("gdatebox", "w-3", {
                        name: "dat_do_pop",
                        disabled: true
                    })
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_celk_pop",
                        disabled: true
                    })
                        .addField("gbutton", "w-3", { params: { primary: false, id: "actSaldoPop_button", action: this.actions["actSaldoPopl"] } })
                        .addSection()
                        .addRow()
                        .addText("Stav rozpuštění dluhu", "w-3")
                        .addText("Poznámka", "w-9")
                        .addRow()
                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.ddpStavRd(), {
                        name: "stav_rd",
                        model: "model.stav_rd = value.stav_rd",
                        disabled: true
                    })
                        .addField("gstringbox", "w-9", {
                        name: "poznamka"
                    })
                        .addRow()
                        .addText("Počáteční stav pl.", "w-3")
                        .addText("Předpisy pl.", "w-3")
                        .addText("Platby pl.", "w-3")
                        .addRow()
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_stav_pl"
                    })
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_predp_pl"
                    })
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_platby_pl"
                    })
                        .addRow()
                        .addText("Počáteční stav popl.", "w-3")
                        .addText("Předpisy popl.", "w-3")
                        .addText("Platby popl.", "w-3")
                        .addRow()
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_stav_pop"
                    })
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_predp_pop"
                    })
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_platby_pop"
                    })
                        .addSection("Dluh")
                        .addRow("Saldo skup. pl. - popl")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_saldo_celk"
                    })
                        .addRow("Max. možný dluh popl.")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_dluh_pop_max"
                    })
                        .addRow("Skutečně přev. částka dluhu na popl.")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_dluh_pop"
                    })
                        .addRow("Celk. sn´ž. dluhu pl. o částku přev. na popl.")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_dluh_sniz_pl"
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", form);
                }
                /**
                * Vytvoření akcí
                */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGRozpusteniZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        }
                    ]);
                    that.actions.addRange([
                        new GAction({
                            name: "actGRozpusteniZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        }),
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "gi-save",
                            run: function () { that.uloz(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        }),
                        new GAction({
                            name: "actSaldoPl",
                            caption: "Saldo plátce",
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GSalda", { ID: "DDPGSalda#", Ixp: that.data.ixp_pl, input_dat_od: that.data.dat_od_rdl, input_dat_do: that.data.dat_do_rdl });
                            }
                        }),
                        new GAction({
                            name: "actSaldoPopl",
                            caption: "Saldo poplatníka",
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GSalda", { ID: "DDPGSalda#", Ixp: that.data.ixp_pop, input_dat_od: that.data.dat_od_rdl, input_dat_do: that.data.dat_do_rdl });
                            }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Funkce pro získání dat pro detail
                 */
                ziskejData() {
                    var that = this;
                    var dto = {};
                    dto.ixs_rdl = that.ixs_rdl;
                    dto.ixp_pl = that.ixp_pl;
                    dto.ixp_pop = that.ixp_pop;
                    dto.typ_phl = that.typ_phl;
                    dto.poradi = that.poradi;
                    that.beginOperation({ id: "loadData", text: "Načítání dat..." });
                    that.isl.RozpusteniDluhu.readDetail(rq => { return { data: dto }; })
                        .get().done(function (dto) {
                        that.data = dto.data;
                        that.findForms("detailForm").findFields().gfield("model", "apply", dto.data);
                        that.disableFields(dto.data.stav_rd);
                        that.endOperation({ id: "loadData" });
                    });
                }
                /**
                 * Funkce pro deaktivaci políček zda je stav_rd 10 nebo 20
                 */
                disableFields(stav_rd) {
                    var that = this;
                    if (stav_rd == 10 || stav_rd == 20) {
                        that.findForms("detailForm").findFields("c_stav_pl").gfield("disable");
                        that.findForms("detailForm").findFields("c_predp_pl").gfield("disable");
                        that.findForms("detailForm").findFields("c_platby_pl").gfield("disable");
                        that.findForms("detailForm").findFields("c_stav_pop").gfield("disable");
                        that.findForms("detailForm").findFields("c_predp_pop").gfield("disable");
                        that.findForms("detailForm").findFields("c_platby_pop").gfield("disable");
                        that.findForms("detailForm").findFields("c_saldo_celk").gfield("disable");
                        that.findForms("detailForm").findFields("c_dluh_pop_max").gfield("disable");
                        that.findForms("detailForm").findFields("c_dluh_pop").gfield("disable");
                        that.findForms("detailForm").findFields("c_dluh_sniz_pl").gfield("disable");
                    }
                }
                /**
                * Funkce pro uložení detailu
                */
                uloz() {
                    const that = this;
                    var dto = {};
                    that.findForms("detailForm").findFields().gfield("model", "collect", dto);
                    dto.ixs_rdl = that.ixs_rdl;
                    var req = rq => {
                        return {
                            rq: { Data: dto }
                        };
                    };
                    that.isl.RozpusteniDluhu.updateDetail(req).get();
                }
            };
            GRozpusteniDluhuPripadyDetail = __decorate([
                Decorators.gcontent
            ], GRozpusteniDluhuPripadyDetail);
            WebClient.GRozpusteniDluhuPripadyDetail = GRozpusteniDluhuPripadyDetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenB1c3RlbmlEbHVodVByaXBhZHlEZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUm96cHVzdGVuaURsdWh1UHJpcGFkeURldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXNUZjtBQXRURCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzVG5CO0lBdFRnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzVDdCO1FBdFRvQixXQUFBLFNBQVM7WUFJMUIsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBOEIsU0FBUSxPQUFBLHFCQUFxQjtnQkFBeEU7O29CQVNXLFNBQUksR0FBMEQsRUFBRSxDQUFDO2dCQXdTNUUsQ0FBQztnQkF0U0csNkRBQTZEO2dCQUM3RCxtQkFBbUIsQ0FBQyxPQUFnRDtvQkFDaEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsaURBQWlEO2dCQUNqRCxvQkFBb0IsQ0FBQyxPQUFnRDtvQkFDakUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsa0NBQWtDLENBQUM7b0JBRWhELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLOzRCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQzt5QkFDdEQsQ0FBQyxDQUFDLENBQUM7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LENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoRixDQUFDO2dCQUNMLENBQUM7Z0JBRUQ7O2tCQUVFO2dCQUNNLElBQUk7b0JBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLEdBQUcsR0FBMEQsRUFBRSxDQUFDO29CQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUUxRSxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBRTNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFO3dCQUNYLE9BQU87NEJBQ0gsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTt5QkFDcEIsQ0FBQztvQkFDTixDQUFDLENBQUM7b0JBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNyRCxDQUFDO2FBQ0osQ0FBQTtZQWpUWSw2QkFBNkI7Z0JBRnpDLFVBQVUsQ0FBQyxRQUFRO2VBRVAsNkJBQTZCLENBaVR6QztZQWpUWSx1Q0FBNkIsZ0NBaVR6QyxDQUFBO1FBQ0wsQ0FBQyxFQXRUb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc1Q3QjtJQUFELENBQUMsRUF0VGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNUbkI7QUFBRCxDQUFDLEVBdFRTLE1BQU0sS0FBTixNQUFNLFFBc1RmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR5RGV0YWlsLnRzICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIGRldGFpbHUgcMWZw61wYWR1IHJvenB1xaF0xJtuw60gZGx1aMWvICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTA5LTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICAgICAgXHJcbiAgICBleHBvcnQgY2xhc3MgR1JvenB1c3RlbmlEbHVodVByaXBhZHlEZXRhaWwgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQgeyAgICBcclxuXHJcbiAgICAgICAgaXhzX3JkbDogc3RyaW5nO1xyXG4gICAgICAgIHR5cF9waGw6IHN0cmluZztcclxuICAgICAgICBpeHBfcGw6IHN0cmluZztcclxuICAgICAgICBpeHBfcG9wOiBzdHJpbmc7IFxyXG4gICAgICAgIHBvcmFkaTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgb19maWx0cjtcclxuICAgICAgICBwdWJsaWMgZGF0YTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdSb3pwdXN0ZW5pRGx1aHVEZXRhaWxEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgLy9Qcm9ncmFtIHphxI3DrW7DoSB6ZGUsIHZ5dcW+w612w6FtIHBybyB2eXR2b8WZZW7DrSB0YWJ1IHMgYWtjw60gVElTS1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1RvdG8gc2UgbmHEjXRlIGRyxa9ow6kgYSBvbkNvbnRlbnRSZWFkeSBuw6FzbGVkb3ZuxJtcclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgRGV0YWlsIHDFmcOtcGFkdSByb3pwb3XFoXTEm27DrSBkbHVodWA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHUm96cHVzdGVuaVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgXHJcbiAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRldGFpbEZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi04LTIsIE0tMi04LTIsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJUeXAgcG9obGVkw6F2a3lcIiwgXCJ3LTlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUG/FmS4gxI0uXCIsIFwidy0zXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy05XCIsIFByZWZhYnMuU2VsZWN0LmRkcHN0cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGwgPSB2YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcmFkaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQbMOhdGNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiSWRlbnRpZmlrw6F0b3IgcG9wbGF0bsOta2FcIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiVlMgcG9wbGF0bsOta2FcIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiTsOhemV2IHBvcGxhdG7DrWthXCIsIFwidy02XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzX3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfcGxfdHh0XCIsIC8vcHJldHR5IHN1cmUgSSBoYXZlIGl0IGRpZmZlcmVudGx5IGluIGdyaWQgKGlmIGl0IGlzIHRoYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUGxhdG5vc3Qgb2RcIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUGxhdG5vc3QgZG9cIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuUG9waXNDYXN0a2FcIikgPz8gXCLEjMOhc3RrYSB2IENaS1wiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RfcGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb19wbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlbGtfcGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJ3LTNcIiwgeyBwYXJhbXM6IHsgcHJpbWFyeTogZmFsc2UsIGlkOiBcImFjdFNhbGRvUGxfYnV0dG9uXCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0U2FsZG9QbFwiXSB9IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9wbGF0bsOta1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJJZGVudGlmaWvDoXRvciBwb3BsYXRuw61rYVwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJWUyBwb3BsYXRuw61rYVwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJOw6F6ZXYgcG9wbGF0bsOta2FcIiwgXCJ3LTZcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzX3BvcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1X3BvcF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQbGF0bm9zdCBvZFwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQbGF0bm9zdCBkb1wiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQodGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5Qb3Bpc0Nhc3RrYVwiKSA/PyBcIsSMw6FzdGthIHYgQ1pLXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZF9wb3BcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb19wb3BcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZWxrX3BvcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcInctM1wiLCB7IHBhcmFtczogeyBwcmltYXJ5OiBmYWxzZSwgaWQ6IFwiYWN0U2FsZG9Qb3BfYnV0dG9uXCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0U2FsZG9Qb3BsXCJdIH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJTdGF2IHJvenB1xaF0xJtuw60gZGx1aHVcIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUG96bsOhbWthXCIsIFwidy05XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5TZWxlY3QuZGRwU3RhdlJkKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfcmRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zdGF2X3JkID0gdmFsdWUuc3Rhdl9yZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlBvxI3DoXRlxI1uw60gc3RhdiBwbC5cIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUMWZZWRwaXN5IHBsLlwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQbGF0YnkgcGwuXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19zdGF2X3BsXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcHJlZHBfcGxcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wbGF0YnlfcGxcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb8SNw6F0ZcSNbsOtIHN0YXYgcG9wbC5cIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUMWZZWRwaXN5IHBvcGwuXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlBsYXRieSBwb3BsLlwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfc3Rhdl9wb3BcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wcmVkcF9wb3BcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wbGF0YnlfcG9wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRsdWhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTYWxkbyBza3VwLiBwbC4gLSBwb3BsXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfc2FsZG9fY2Vsa1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk1heC4gbW/Fvm7DvSBkbHVoIHBvcGwuXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZGx1aF9wb3BfbWF4XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2t1dGXEjW7EmyBwxZlldi4gxI3DoXN0a2EgZGx1aHUgbmEgcG9wbC5cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kbHVoX3BvcFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkNlbGsuIHNuwrTFvi4gZGx1aHUgcGwuIG8gxI3DoXN0a3UgcMWZZXYuIG5hIHBvcGwuXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZGx1aF9zbml6X3BsXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b8WZZW7DrSBha2PDrSBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUm96cHVzdGVuaVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUm96cHVzdGVuaVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC51bG96KCkgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2FsZG9QbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2FsZG8gcGzDoXRjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1NhbGRhXCIsIHsgSUQ6IFwiRERQR1NhbGRhI1wiLCBJeHA6IHRoYXQuZGF0YS5peHBfcGwsIGlucHV0X2RhdF9vZDogdGhhdC5kYXRhLmRhdF9vZF9yZGwsIGlucHV0X2RhdF9kbzogdGhhdC5kYXRhLmRhdF9kb19yZGwgfSk7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYWxkb1BvcGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNhbGRvIHBvcGxhdG7DrWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2FsZGFcIiwgeyBJRDogXCJERFBHU2FsZGEjXCIsIEl4cDogdGhhdC5kYXRhLml4cF9wb3AsIGlucHV0X2RhdF9vZDogdGhhdC5kYXRhLmRhdF9vZF9yZGwsIGlucHV0X2RhdF9kbzogdGhhdC5kYXRhLmRhdF9kb19yZGwgfSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIEZ1bmtjZSBwcm8gesOtc2vDoW7DrSBkYXQgcHJvIGRldGFpbCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RGV0YWlsRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICBkdG8uaXhzX3JkbCA9IHRoYXQuaXhzX3JkbDtcclxuICAgICAgICAgICAgZHRvLml4cF9wbCA9IHRoYXQuaXhwX3BsO1xyXG4gICAgICAgICAgICBkdG8uaXhwX3BvcCA9IHRoYXQuaXhwX3BvcDtcclxuICAgICAgICAgICAgZHRvLnR5cF9waGwgPSB0aGF0LnR5cF9waGw7XHJcbiAgICAgICAgICAgIGR0by5wb3JhZGkgPSB0aGF0LnBvcmFkaTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQuLi5cIn0pXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJvenB1c3RlbmlEbHVodS5yZWFkRGV0YWlsKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogZHRvIH0gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGEgPSBkdG8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImRldGFpbEZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlzYWJsZUZpZWxkcyhkdG8uZGF0YS5zdGF2X3JkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZERhdGFcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIEZ1bmtjZSBwcm8gZGVha3RpdmFjaSBwb2zDrcSNZWsgemRhIGplIHN0YXZfcmQgMTAgbmVibyAyMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGlzYWJsZUZpZWxkcyhzdGF2X3JkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHN0YXZfcmQgPT0gMTAgfHwgc3Rhdl9yZCA9PSAyMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJkZXRhaWxGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX3N0YXZfcGxcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZGV0YWlsRm9ybVwiKS5maW5kRmllbGRzKFwiY19wcmVkcF9wbFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJkZXRhaWxGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX3BsYXRieV9wbFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJkZXRhaWxGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX3N0YXZfcG9wXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImRldGFpbEZvcm1cIikuZmluZEZpZWxkcyhcImNfcHJlZHBfcG9wXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImRldGFpbEZvcm1cIikuZmluZEZpZWxkcyhcImNfcGxhdGJ5X3BvcFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJkZXRhaWxGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX3NhbGRvX2NlbGtcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZGV0YWlsRm9ybVwiKS5maW5kRmllbGRzKFwiY19kbHVoX3BvcF9tYXhcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZGV0YWlsRm9ybVwiKS5maW5kRmllbGRzKFwiY19kbHVoX3BvcFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJkZXRhaWxGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX2RsdWhfc25pel9wbFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgKiBGdW5rY2UgcHJvIHVsb8W+ZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHVsb3ooKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1JvenB1c3RlbmlEbHVodURldGFpbER0byA9IHt9O1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImRldGFpbEZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBkdG8uaXhzX3JkbCA9IHRoYXQuaXhzX3JkbDtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJxOiB7IERhdGE6IGR0byB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LnVwZGF0ZURldGFpbChyZXEpLmdldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=