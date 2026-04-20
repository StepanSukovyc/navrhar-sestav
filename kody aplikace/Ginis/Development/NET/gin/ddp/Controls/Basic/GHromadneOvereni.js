"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GHromadneOvereni.cs                    </Name>
//    <Description> Okno hromadné ověření v ISZR                                </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-06-17                                                  </Created>
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
            let GHromadneOvereni = class GHromadneOvereni extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Bylo již ověřováno */
                    this.jizOverovano = false;
                }
                onContentReady() {
                    const that = this;
                    if (that.params.gin_iszr_povole == 0)
                        that.iszrPovole = false;
                    else
                        that.iszrPovole = true;
                    that.createActions();
                    that.createMenu();
                    that.createForm();
                    that.grid = that.createGrid();
                    that.getHeaderData();
                    that.getData();
                    that.inicializaceFormulare();
                }
                /** Vytvoření položek v menubaru*/
                createMenu() {
                    const that = this;
                    let menu = [
                        { action: that.actions.actOverit, favorite: true },
                        { action: that.actions.actDetailESU, favorite: true },
                        { action: that.actions.actStavOver, favorite: true },
                        { action: that.actions.actVyzvednoutAsync, favorite: true },
                        { action: that.actions.actPrihlasit, favorite: true },
                        { action: that.actions.actOdhlasit, favorite: true }
                    ];
                    that.menuBar(menu);
                }
                /** Vytvoření akcí */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actSave: {
                            name: "actSave",
                            caption: "Uložit",
                            tooltip: "",
                            run: () => {
                                that.close();
                            }
                        },
                        actOk: {
                            name: "actOk",
                            caption: "OK",
                            tooltip: "",
                            run: () => {
                                that.close();
                            }
                        },
                        actClose: {
                            name: "actClose",
                            caption: "Zavřít",
                            tooltip: "",
                            run: () => {
                                that.close();
                            }
                        },
                        actOverit: {
                            name: "actOverit",
                            caption: "Ověřit",
                            tooltip: "Ověření synchronně - provede ověření okamžitě",
                            run: () => {
                                var form = that.findForms("headerForm");
                                var isFormValid = form.gform("isValid");
                                if (isFormValid) {
                                    var pripady = that.grid.ggrid("getView").getDataRows();
                                    ;
                                    var model = that.inicializaceModelu();
                                    that.isl.HromadneOvereni.overSync({ model: model, pripady: pripady })
                                        .get()
                                        .done(() => {
                                        that.load();
                                    });
                                }
                            }
                        },
                        actDetailESU: {
                            name: "actDetailESU",
                            caption: "Detail ESU",
                            tooltip: "Zobrazení detailu externího subjektu",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                var opt = {
                                    Ucel: Gordic.Esu.Globals.Enums.TypZobrazeni.Detail,
                                    IxsEsu: row.ixs_esu,
                                    Logovani: {
                                        Ixp: row.ixs_esu,
                                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                                        AktZnacka: row.ixs_esu,
                                        DuvodHledaniTxt: "Zobrazení detailu externího subjektu"
                                    },
                                };
                                Gordic.Esu.Dialogs.DetailEsuDlg(that, opt);
                            }
                        },
                        actStavOver: {
                            name: "actStavOver",
                            caption: "Stav ověření ASYNC",
                            enabled: that.iszrPovole,
                            tooltip: "",
                            run: () => {
                                var form = that.findForms("headerForm");
                                var isFormValid = form.gform("isValid");
                                if (isFormValid) {
                                    var pripady = that.grid.ggrid("getView").getDataRows();
                                    ;
                                    var model = that.inicializaceModelu();
                                    that.beginOperation({ id: "stavOver", text: "Probíhá ověření zpracování asynchronních požadavků.." });
                                    that.isl.HromadneOvereni.stavOver({ model: model, pripady: pripady }).get()
                                        .done(() => {
                                        that.load();
                                    })
                                        .always(() => {
                                        that.endOperation({ id: "stavOver" });
                                    });
                                }
                            }
                        },
                        actVyzvednoutAsync: {
                            name: "actVyzvednoutAsync",
                            caption: "Vyzv. Asyn. ověření",
                            enabled: that.iszrPovole,
                            tooltip: "Vyzvednutí asynchronního ověření",
                            run: () => {
                                var form = that.findForms("headerForm");
                                var isFormValid = form.gform("isValid");
                                if (isFormValid) {
                                    var pripady = that.grid.ggrid("getView").getDataRows();
                                    ;
                                    var model = that.inicializaceModelu();
                                    that.beginOperation({ id: "vyzvednouAsyn", text: "Probíhá vyzvednutí asynchronních požadavků.." });
                                    that.isl.HromadneOvereni.vyzvednouAsyn({ model: model, pripady: pripady }).get()
                                        .done(() => {
                                        that.load();
                                    })
                                        .always(() => {
                                        that.endOperation({ id: "vyzvednouAsyn" });
                                    });
                                }
                            }
                        },
                        actPrihlasit: {
                            name: "actPrihlasit",
                            caption: "Přihlásit ke sledování",
                            enabled: that.iszrPovole,
                            tooltip: "Přihlásit ke sledování změn vybraných občanů. Přihlásit je možné jen ty, kteří jsou již ztotožnění a jejichž ověření proběhlo dnes!",
                            run: () => {
                                var form = that.findForms("headerForm");
                                var isFormValid = form.gform("isValid");
                                if (isFormValid) {
                                    var pripady = that.grid.ggrid("getView").getDataRows();
                                    ;
                                    var model = that.inicializaceModelu();
                                    that.beginOperation({ id: "prihlasit", text: "Probíhá přihlášení ke sledování změn vybraných občanů..." });
                                    that.isl.HromadneOvereni.prihlasit({ model: model, pripady: pripady }).get()
                                        .done(() => {
                                        that.load();
                                    })
                                        .always(() => {
                                        that.endOperation({ id: "prihlasit" });
                                    });
                                }
                            }
                        },
                        actOdhlasit: {
                            name: "actOdhlasit",
                            caption: "Odhlásit ze sledování",
                            enabled: that.iszrPovole,
                            tooltip: "Odhlásit ze sledování změn vybrané občany",
                            run: () => {
                                var form = that.findForms("headerForm");
                                var isFormValid = form.gform("isValid");
                                if (isFormValid) {
                                    var pripady = that.grid.ggrid("getView").getDataRows();
                                    var model = that.inicializaceModelu();
                                    that.beginOperation({ id: "odhlasit", text: "Probíhá odhlášení ze sledování změn vybraných občanů..." });
                                    that.isl.HromadneOvereni.odhlasit({ model: model, pripady: pripady }).get()
                                        .done(() => {
                                        that.load();
                                    })
                                        .always(() => {
                                        that.endOperation({ id: "odhlasit" });
                                    });
                                }
                            }
                        },
                        actVyberZVice: {
                            name: "actVyberZVice",
                            caption: "Odhlásit ze sledování",
                            enabled: that.iszrPovole,
                            tooltip: "Odhlásit ze sledování změn vybrané občany",
                            run: () => {
                                // todo
                            }
                        }
                    });
                    that.commandBar(that.actions.createBar(["actClose"]));
                }
                /** Vytvoření formuláře */
                createForm() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ name: "headerForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-3-9-0, S-12-12-0" })
                        .addSection()
                        .addRow({ label: "Agenda" })
                        .addField("gselectbox", Gordic.Prefabs.Select.szrsage(), {
                        name: "agenda",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Role" })
                        .addField("gselectbox", Gordic.Prefabs.Select.szrsagr(), {
                        name: "agendova_role",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            agenda: new Gordic.Forms.Dependency("agenda", "agenda", true)
                        },
                    })
                        .addRow({ label: "Důvod" })
                        .addField("gstringbox", {
                        name: "duvod_ucel",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: 255 })]
                    })
                        .addSection({ layoutDescriptor: "L1M1S1, L-0-8-4, M-0-9-3, S-12-12-0" })
                        .addRow()
                        .addField("gcheck", {
                        name: "diaktritika",
                        label: "Hledat s ohledem na diakritiku"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "adresa",
                        label: "Hledat i dle adresy"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "asyn",
                        label: "SZR volat asynchronně"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "porovnavat",
                        label: "Porovnávat údaje o občanovi"
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", form);
                }
                /** Vytvoření tabulky */
                createGrid() {
                    return $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GPripadyGrid",
                        //data: this.view,
                        defaultAction: this.actions.actDetail,
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: true,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.ISZR(),
                        rowNumbers: false
                    });
                }
                /** Získání data pro hlavičku  */
                getHeaderData() {
                    var that = this;
                    that.beginOperation({ id: "ziskaniHlavicky", text: "Získání dat pro hlavičku..." });
                    that.isl.HromadneOvereni.hlavickaHromOvereni({ poradiHro: that.poradiHro }).get()
                        .done((result) => {
                        that.endOperation({ id: "ziskaniHlavicky" });
                        if (result.length == 1) {
                            that.headerData = result[0];
                            if (result[0].agenda != null || result[0].agendova_role != null || result[0].duvod_ucel != null) {
                                that.jizOverovano = true;
                            }
                        }
                    });
                }
                /** Získání dat pro grid  */
                getData() {
                    var that = this;
                    that.beginOperation({ id: "ziskaniDat", text: "Získání dat pro seznam hromadného ověření" });
                    that.isl.HromadneOvereni.seznamHromOvereni({ poradiOvereni: that.poradiHro }).get()
                        .done((view) => {
                        that.grid.ggrid("setData", view);
                        that.endOperation({ id: "ziskaniDat" });
                    });
                }
                /** Inicializace formuláře, apod. */
                inicializaceFormulare() {
                    var that = this;
                    if (that.jizOverovano) {
                        that.findFields("agenda").gselectbox("setInitial", { agenda: that.headerData.agenda });
                        that.findFields("agendova_role").gselectbox("setInitial", { agendova_role: that.headerData.agendova_role });
                        that.findFields("duvod").gstringbox("setInitial", that.headerData.duvod_ucel);
                    }
                    else {
                        that.findFields("agenda").gselectbox("setInitial", { agenda: that.defaultAgenda });
                        that.findFields("agendova_role").gselectbox("setInitial", { agendova_role: that.defaultRole });
                        that.findFields("duvod").gstringbox("setInitial", that.defaultDuvodUcel);
                    }
                }
                /** Inicializace modelu  */
                inicializaceModelu() {
                    var that = this;
                    var model = {};
                    var form = that.findForms("headerForm");
                    form.findFields().gfield("model", "collect", model);
                    // vyhození názvů z modelu
                    var agenda = model.agenda.agenda;
                    model.agenda = agenda;
                    var agendova_role = model.agendova_role.agendova_role;
                    model.agendova_role = agendova_role;
                    model.poradi_hro = that.poradiHro;
                    model.jiz_overovano = that.jizOverovano;
                    return model;
                }
            };
            GHromadneOvereni = __decorate([
                Decorators.gcontent
            ], GHromadneOvereni);
            WebClient.GHromadneOvereni = GHromadneOvereni;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0hyb21hZG5lT3ZlcmVuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdIcm9tYWRuZU92ZXJlbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0ErV2Y7QUEvV0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK1duQjtJQS9XZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK1c3QjtRQS9Xb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBU0kseUJBQXlCO29CQUN6QixpQkFBWSxHQUFZLEtBQUssQ0FBQztnQkFrV2xDLENBQUM7Z0JBeFZHLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLENBQUM7d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7O3dCQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFFNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNmLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUNqQyxDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsVUFBVTtvQkFDZCxNQUFNLElB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LENBQUM7Z0JBRUQsMkJBQTJCO2dCQUMzQixrQkFBa0I7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFcEQsMEJBQTBCO29CQUMxQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDakMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3RCLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO29CQUN0RCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztvQkFFcEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNsQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ3hDLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2FBQ0osQ0FBQTtZQTVXWSxnQkFBZ0I7Z0JBRDVCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZ0JBQWdCLENBNFc1QjtZQTVXWSwwQkFBZ0IsbUJBNFc1QixDQUFBO1FBQ0wsQ0FBQyxFQS9Xb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK1c3QjtJQUFELENBQUMsRUEvV2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQStXbkI7QUFBRCxDQUFDLEVBL1dTLE1BQU0sS0FBTixNQUFNLFFBK1dmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdIcm9tYWRuZU92ZXJlbmkuY3MgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIGhyb21hZG7DqSBvdsSbxZllbsOtIHYgSVNaUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNi0xNyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0hyb21hZG5lT3ZlcmVuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFRhYnVsa2EgcMWZw61wYWTFryAqL1xyXG4gICAgICAgIGdyaWQ6IGFueVxyXG4gICAgICAgIC8qKiBQYXJhbWV0eSAqL1xyXG4gICAgICAgIHBhcmFtczogYW55XHJcbiAgICAgICAgLyoqIHBvxZlhZMOtIGhyb21hZG7DqWhvIG92xJvFmWVuw60gKi9cclxuICAgICAgICBwb3JhZGlIcm86IG51bWJlcjtcclxuICAgICAgICAvKiogSG9kbm90YSB6ZGEgamUgSVNaUiBwb3ZvbGVubyAqL1xyXG4gICAgICAgIGlzenJQb3ZvbGU6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIEJ5bG8gamnFviBvdsSbxZlvdsOhbm8gKi9cclxuICAgICAgICBqaXpPdmVyb3Zhbm86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKiogRGF0YSBobGF2acSNa3kgKi9cclxuICAgICAgICBoZWFkZXJEYXRhOiBhbnk7XHJcbiAgICAgICAgLyoqIERlZmF1bHRuw60gZMWvdm9kIMO6xI1lbCAqL1xyXG4gICAgICAgIGRlZmF1bHREdXZvZFVjZWw6IHN0cmluZztcclxuICAgICAgICAvKiogRGVmYXVsdG7DrSBhZ2VuZGEgKi9cclxuICAgICAgICBkZWZhdWx0QWdlbmRhOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIERlZmF1bHRuw60gYWdlbmRvdsOhIHJvbGUgKi9cclxuICAgICAgICBkZWZhdWx0Um9sZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZ2luX2lzenJfcG92b2xlID09IDApIHRoYXQuaXN6clBvdm9sZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlIHRoYXQuaXN6clBvdm9sZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51KCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhhdC5nZXRIZWFkZXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGF0LmluaWNpYWxpemFjZUZvcm11bGFyZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHBvbG/FvmVrIHYgbWVudWJhcnUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudSA9IFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T3Zlcml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxFU1UsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFN0YXZPdmVyLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RWeXp2ZWRub3V0QXN5bmMsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByaWhsYXNpdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2RobGFzaXQsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWVudUJhcihtZW51KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSAqL1xyXG4gICAgICAgIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9rOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RPdmVyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPdmVyaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPdsSbxZlpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk92xJvFmWVuw60gc3luY2hyb25uxJsgLSBwcm92ZWRlIG92xJvFmWVuw60gb2thbcW+aXTEm1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5maW5kRm9ybXMoXCJoZWFkZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gZm9ybS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGb3JtVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJpcGFkeSA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhhdC5pbmljaWFsaXphY2VNb2RlbHUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLm92ZXJTeW5jKHsgbW9kZWw6IG1vZGVsLCBwcmlwYWR5OiBwcmlwYWR5IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3REZXRhaWxFU1U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxFU1VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwgRVNVXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWm9icmF6ZW7DrSBkZXRhaWx1IGV4dGVybsOtaG8gc3ViamVrdHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHQ6IEdvcmRpYy5Fc3UuRGlhbG9ncy5HRGV0YWlsRXN1RGxnSW5wdXRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVWNlbDogRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pLkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNFc3U6IHJvdy5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogcm93Lml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiByb3cuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlpvYnJhemVuw60gZGV0YWlsdSBleHRlcm7DrWhvIHN1Ympla3R1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LkRpYWxvZ3MuRGV0YWlsRXN1RGxnKHRoYXQsIG9wdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFN0YXZPdmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U3Rhdk92ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2IG92xJvFmWVuw60gQVNZTkNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5pc3pyUG92b2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5maW5kRm9ybXMoXCJoZWFkZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gZm9ybS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGb3JtVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJpcGFkeSA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhhdC5pbmljaWFsaXphY2VNb2RlbHUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInN0YXZPdmVyXCIsIHRleHQ6IFwiUHJvYsOtaMOhIG92xJvFmWVuw60genByYWNvdsOhbsOtIGFzeW5jaHJvbm7DrWNoIHBvxb5hZGF2a8WvLi5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLnN0YXZPdmVyKHsgbW9kZWw6IG1vZGVsLCBwcmlwYWR5OiBwcmlwYWR5IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwic3Rhdk92ZXJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZ5enZlZG5vdXRBc3luYzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5enZlZG5vdXRBc3luY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5enYuIEFzeW4uIG92xJvFmWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5pc3pyUG92b2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlZ5enZlZG51dMOtIGFzeW5jaHJvbm7DrWhvIG92xJvFmWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiaGVhZGVyRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0Zvcm1WYWxpZCA9IGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRm9ybVZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByaXBhZHkgPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCk7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoYXQuaW5pY2lhbGl6YWNlTW9kZWx1KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ2eXp2ZWRub3VBc3luXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHZ5enZlZG51dMOtIGFzeW5jaHJvbm7DrWNoIHBvxb5hZGF2a8WvLi5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLnZ5enZlZG5vdUFzeW4oeyBtb2RlbDogbW9kZWwsIHByaXBhZHk6IHByaXBhZHkgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ2eXp2ZWRub3VBc3luXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQcmlobGFzaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlobGFzaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpaGzDoXNpdCBrZSBzbGVkb3bDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LmlzenJQb3ZvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUMWZaWhsw6FzaXQga2Ugc2xlZG92w6Fuw60gem3Em24gdnlicmFuw71jaCBvYsSNYW7Fry4gUMWZaWhsw6FzaXQgamUgbW/Fvm7DqSBqZW4gdHksIGt0ZcWZw60ganNvdSBqacW+IHp0b3Rvxb5uxJtuw60gYSBqZWppY2jFviBvdsSbxZllbsOtIHByb2LEm2hsbyBkbmVzIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5maW5kRm9ybXMoXCJoZWFkZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gZm9ybS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGb3JtVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJpcGFkeSA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhhdC5pbmljaWFsaXphY2VNb2RlbHUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInByaWhsYXNpdFwiLCB0ZXh0OiBcIlByb2LDrWjDoSBwxZlpaGzDocWhZW7DrSBrZSBzbGVkb3bDoW7DrSB6bcSbbiB2eWJyYW7DvWNoIG9ixI1hbsWvLi4uXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkhyb21hZG5lT3ZlcmVuaS5wcmlobGFzaXQoeyBtb2RlbDogbW9kZWwsIHByaXBhZHk6IHByaXBhZHkgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwcmlobGFzaXRcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kaGxhc2l0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2RobGFzaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGhsw6FzaXQgemUgc2xlZG92w6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5pc3pyUG92b2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9kaGzDoXNpdCB6ZSBzbGVkb3bDoW7DrSB6bcSbbiB2eWJyYW7DqSBvYsSNYW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImhlYWRlckZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNGb3JtVmFsaWQgPSBmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Zvcm1WYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmlwYWR5ID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoYXQuaW5pY2lhbGl6YWNlTW9kZWx1KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvZGhsYXNpdFwiLCB0ZXh0OiBcIlByb2LDrWjDoSBvZGhsw6HFoWVuw60gemUgc2xlZG92w6Fuw60gem3Em24gdnlicmFuw71jaCBvYsSNYW7Fry4uLlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Icm9tYWRuZU92ZXJlbmkub2RobGFzaXQoeyBtb2RlbDogbW9kZWwsIHByaXBhZHk6IHByaXBhZHkgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvZGhsYXNpdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VnliZXJaVmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5YmVyWlZpY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGhsw6FzaXQgemUgc2xlZG92w6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5pc3pyUG92b2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9kaGzDoXNpdCB6ZSBzbGVkb3bDoW7DrSB6bcSbbiB2eWJyYW7DqSBvYsSNYW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG9kb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSAqL1xyXG4gICAgICAgIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJoZWFkZXJGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTQtOC0wLCBNLTMtOS0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkFnZW5kYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnN6cnNhZ2UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWdlbmRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJSb2xlXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Quc3pyc2FncigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZ2VuZG92YV9yb2xlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiYWdlbmRhXCIsIFwiYWdlbmRhXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRMWvdm9kXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHV2b2RfdWNlbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU1IH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC04LTQsIE0tMC05LTMsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkaWFrdHJpdGlrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkhsZWRhdCBzIG9obGVkZW0gbmEgZGlha3JpdGlrdVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRyZXNhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGxlZGF0IGkgZGxlIGFkcmVzeVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXN5blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNaUiB2b2xhdCBhc3luY2hyb25uxJtcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcm92bmF2YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3Jvdm7DoXZhdCDDumRhamUgbyBvYsSNYW5vdmlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHRhYnVsa3kgKi9cclxuICAgICAgICBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdFeHRlcm5pU3ViamVrdElTWlJEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdQcmlwYWR5R3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5JU1pSKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFrDrXNrw6Fuw60gZGF0YSBwcm8gaGxhdmnEjWt1ICAqL1xyXG4gICAgICAgIGdldEhlYWRlckRhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInppc2thbmlIbGF2aWNreVwiLCB0ZXh0OiBcIlrDrXNrw6Fuw60gZGF0IHBybyBobGF2acSNa3UuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLmhsYXZpY2thSHJvbU92ZXJlbmkoeyBwb3JhZGlIcm86IHRoYXQucG9yYWRpSHJvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInppc2thbmlIbGF2aWNreVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaGVhZGVyRGF0YSA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFswXS5hZ2VuZGEgIT0gbnVsbCB8fCByZXN1bHRbMF0uYWdlbmRvdmFfcm9sZSAhPSBudWxsIHx8IHJlc3VsdFswXS5kdXZvZF91Y2VsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaml6T3Zlcm92YW5vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWsOtc2vDoW7DrSBkYXQgcHJvIGdyaWQgICovXHJcbiAgICAgICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiemlza2FuaURhdFwiLCB0ZXh0OiBcIlrDrXNrw6Fuw60gZGF0IHBybyBzZXpuYW0gaHJvbWFkbsOpaG8gb3bEm8WZZW7DrVwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5Icm9tYWRuZU92ZXJlbmkuc2V6bmFtSHJvbU92ZXJlbmkoeyBwb3JhZGlPdmVyZW5pOiB0aGF0LnBvcmFkaUhybyB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHZpZXc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ6aXNrYW5pRGF0XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEluaWNpYWxpemFjZSBmb3JtdWzDocWZZSwgYXBvZC4gKi9cclxuICAgICAgICBpbmljaWFsaXphY2VGb3JtdWxhcmUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQuaml6T3Zlcm92YW5vKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJhZ2VuZGFcIikuZ3NlbGVjdGJveChcInNldEluaXRpYWxcIiwgeyBhZ2VuZGE6IHRoYXQuaGVhZGVyRGF0YS5hZ2VuZGEgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJhZ2VuZG92YV9yb2xlXCIpLmdzZWxlY3Rib3goXCJzZXRJbml0aWFsXCIsIHsgYWdlbmRvdmFfcm9sZTogdGhhdC5oZWFkZXJEYXRhLmFnZW5kb3ZhX3JvbGUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkdXZvZFwiKS5nc3RyaW5nYm94KFwic2V0SW5pdGlhbFwiLCB0aGF0LmhlYWRlckRhdGEuZHV2b2RfdWNlbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJhZ2VuZGFcIikuZ3NlbGVjdGJveChcInNldEluaXRpYWxcIiwgeyBhZ2VuZGE6IHRoYXQuZGVmYXVsdEFnZW5kYSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImFnZW5kb3ZhX3JvbGVcIikuZ3NlbGVjdGJveChcInNldEluaXRpYWxcIiwgeyBhZ2VuZG92YV9yb2xlOiB0aGF0LmRlZmF1bHRSb2xlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZHV2b2RcIikuZ3N0cmluZ2JveChcInNldEluaXRpYWxcIiwgdGhhdC5kZWZhdWx0RHV2b2RVY2VsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEluaWNpYWxpemFjZSBtb2RlbHUgICovXHJcbiAgICAgICAgaW5pY2lhbGl6YWNlTW9kZWx1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogYW55ID0ge307XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5maW5kRm9ybXMoXCJoZWFkZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gdnlob3plbsOtIG7DoXp2xa8geiBtb2RlbHVcclxuICAgICAgICAgICAgdmFyIGFnZW5kYSA9IG1vZGVsLmFnZW5kYS5hZ2VuZGE7XHJcbiAgICAgICAgICAgIG1vZGVsLmFnZW5kYSA9IGFnZW5kYTtcclxuICAgICAgICAgICAgdmFyIGFnZW5kb3ZhX3JvbGUgPSBtb2RlbC5hZ2VuZG92YV9yb2xlLmFnZW5kb3ZhX3JvbGU7XHJcbiAgICAgICAgICAgIG1vZGVsLmFnZW5kb3ZhX3JvbGUgPSBhZ2VuZG92YV9yb2xlO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwucG9yYWRpX2hybyA9IHRoYXQucG9yYWRpSHJvO1xyXG4gICAgICAgICAgICBtb2RlbC5qaXpfb3Zlcm92YW5vID0gdGhhdC5qaXpPdmVyb3Zhbm87XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=