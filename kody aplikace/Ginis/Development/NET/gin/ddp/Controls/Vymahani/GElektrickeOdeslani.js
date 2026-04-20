"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GElektrickeOdeslani.ts                 </Name>
//    <Description> Výběr způsobu elektronického odeslání                       </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-06-05                                                  </Created>
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
             * Výběr způsobu elektronického odeslání
             *
             * @author Vojtěch Čech
             * @date 05.06.2025
            */
            let GElektrickeOdeslani = class GElektrickeOdeslani extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = "Nastavení parametrů odesílání zásilek";
                    that.taskId = "actGElektrickeOdeslani";
                    that.actions.addRange([
                        new GAction({
                            name: "actOK",
                            caption: "OK",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.createForm();
                    that.createGrids();
                    that.getData();
                    that.commandBar(that.actions.createBar(["actOK!", "actClose"]));
                }
                /** Inicializace hodnoty polí - uživatelské nastavení */
                inicialniHodnoty() {
                    var that = this;
                    const globalSettings = that.globalSettings;
                    var vlastni;
                    var nvycid = that.params.ddp_rad_nvycid;
                    if (nvycid != 1)
                        vlastni = 1;
                    return {
                        vlastni: vlastni ?? globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.Vlastni") ?? 1,
                        vyber: globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.Vyber") ?? 1,
                        dle_esu: globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.DleEsu") ?? 0,
                        dle_dsu: (globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.DleEsu") ?? 0) == 0,
                        el_obraz: globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.ElObraz") ?? 0,
                        odeslat_prilohy: globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.OdeslatPrilohy") ?? false,
                        obsah_text: globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.ObsahText") ?? "",
                        poznamka: globalSettings?.get("Global.Ddp.VyberZpusobuElektronickehoOdeslani.Poznamka") ?? ""
                    };
                }
                /** Vytvoří formulář */
                createForm() {
                    var that = this;
                    var { vlastni, vyber, dle_esu, dle_dsu, el_obraz, odeslat_prilohy, obsah_text, poznamka } = that.inicialniHodnoty();
                    let form = new Gordic.Forms.Form({ name: "form", layoutDescriptor: "L2M2S1 L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addSection()
                        .addRow("Zpracovatel")
                        .addField("gradio", {
                        name: "vlastni",
                        initialValue: vlastni,
                        disabled: that.params.ddp_rad_nvycid != 1,
                        radios: [
                            { value: 0, label: "Všechny" },
                            { value: 1, label: "Vlastní" },
                        ]
                    })
                        .addRow("Typ výběru")
                        .addField("gradio", {
                        name: "vyber",
                        initialValue: vyber,
                        radios: [
                            { value: 0, label: "Všechny" }, //cb_vse
                            { value: 1, label: "Pouze vybrané" }, //cb_vybrane
                        ]
                    })
                        .addRow("El.obraz")
                        .addField("gradio", {
                        name: "el_obraz",
                        initialValue: el_obraz,
                        radios: [
                            { value: 1, label: "Ano" },
                            { value: 0, label: "Ne" },
                            { value: 2, label: "Pokud neexistuje generuj" },
                        ]
                    })
                        .addSection()
                        .addRow("Příjemci zásilky")
                        .addField("gcheck", {
                        name: "dle_esu",
                        label: "Subjekt vymáhání",
                        customClass: "w-6",
                        initialValue: dle_esu,
                        change: (ev, obj) => {
                            that.changeEsuDsu(ev, obj);
                        }
                    })
                        .addField("gcheck", {
                        name: "dle_dsu",
                        label: "Dotčené subjekty",
                        customClass: "w-6",
                        initialValue: dle_dsu,
                        change: (ev, obj) => {
                            that.changeEsuDsu(ev, obj);
                        }
                    })
                        .addRow()
                        .addRow()
                        .addField("gcheck", {
                        name: "odeslat_prilohy",
                        label: "Odeslat včetně el. příloh",
                        initialValue: odeslat_prilohy
                    })
                        .addSection({ layoutDescriptor: "L1M1S1 L-4-4-4, M-4-5-3, S-12-12-0" })
                        .addText("Vlastnosti souboru")
                        .addRow("Pojmenování")
                        .addField("gstringbox", {
                        name: "obsah_text",
                        initialValue: obsah_text
                    })
                        .addRow("Poznámka k souboru")
                        .addField("gstringbox", {
                        name: "poznamka",
                        initialValue: poznamka
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", form);
                }
                /** Vytvoření tabulek  */
                createGrids() {
                    var that = this;
                    that.seznam = $.newDiv()
                        .appendTo(that.element)
                        .ggrid({
                        name: "seznam", // seznam
                        columnMode: "fit",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: true,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.DuvodVazby(),
                        rowNumbers: false,
                    }).height(300).resizable({
                        handles: "s",
                        minHeight: 125
                    }).appendVisibleResizeHandle('s')
                        .gautofit().css("box-sizing", "border-box").css("padding", "10px");
                    let form = new Gordic.Forms.Form({ name: "datumForm", layoutDescriptor: "L2M2S1 L-4-8-0 M-6-6-0 S-6-6-0" })
                        .addSection()
                        .addRow("Pro osoby s datem narození po (včetně)")
                        .addField("gdatebox", "w-4", {
                        name: "dat_nar"
                    })
                        .addText("použít tyto typy vazby ESU", "w-4");
                    $.newDiv().appendTo(that.element).gform("createFrom", form);
                    that.seznam_2 = $.newDiv()
                        .appendTo(that.element)
                        .ggrid({
                        name: "seznam_2", // seznam
                        columnMode: "fit",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: true,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.DuvodVazby(),
                        rowNumbers: false
                    }).resizable({
                        handles: "s",
                        minHeight: 125
                    }).appendVisibleResizeHandle('s')
                        .gautofit();
                    var dleDsu = that.findFields("dle_dsu").gfield("getValue");
                    if (dleDsu == 0) {
                        that.seznam.ggrid().hide();
                        that.seznam_2.ggrid().hide();
                    }
                }
                /** Načtení dat */
                getData() {
                    var that = this;
                    that.isl.VymahaniDDP.ziskejDuvodyVazby().get()
                        .done((result) => {
                        that.seznam.ggrid("setData", result);
                        that.seznam_2.ggrid("setData", result);
                    });
                }
                /** Nastala změna checkboxů 'dle ESU/DSU' */
                changeEsuDsu(ev, obj) {
                    var that = this;
                    var dsuValue = $(ev.currentTarget).findFields("dle_dsu").gfield("getValue");
                    var esuValue = $(ev.currentTarget).findFields("dle_esu").gfield("getValue");
                    if (!dsuValue) {
                        that.seznam.ggrid().hide();
                        that.seznam_2.ggrid().hide();
                        $(ev.currentTarget).findFields("dat_nar").gfield("setValue", null);
                        that.findForms("datumForm").hide();
                    }
                    else {
                        that.seznam.ggrid().show();
                        if (that.tema != "ddp_pym_popl") {
                            that.seznam_2.ggrid().show();
                            that.findForms("datumForm").show();
                        }
                    }
                    if (!esuValue && !dsuValue) {
                        that.actions.actOK?.enabled(false);
                    }
                    else {
                        that.actions.actOK?.enabled(true);
                    }
                }
                ok() {
                    var that = this;
                    let returnModel = {};
                    that.findForms("form").findFields().gfield("model", "collect", returnModel);
                    returnModel.dat_nar = that.findForms("datumForm").findFields("dat_nar").gfield("getValue");
                    var dle_esu;
                    if (returnModel.dle_esu && returnModel.dle_dsu)
                        dle_esu = 2;
                    else if (returnModel.dle_esu)
                        dle_esu = 1;
                    else if (returnModel.dle_dsu)
                        dle_esu = 0;
                    var view;
                    var rows;
                    var ixs_dva = "";
                    var selection = that.seznam.ggrid("getSelection");
                    view = that.seznam_2.ggrid("getView");
                    rows = view.getDataRows(true);
                    if (selection.length == rows.length)
                        ixs_dva = "";
                    else {
                        if (that.seznam.is(":visible")) {
                            if (selection.length != 0) {
                                selection.forEach(row => {
                                    if (row.ixs_dva?.length == 12)
                                        ixs_dva += row.ixs_dva + ",";
                                });
                            }
                            ixs_dva = that.removeTrailingComma(ixs_dva);
                        }
                    }
                    var ixs_dva_2 = "";
                    var selection_2 = that.seznam_2.ggrid("getSelection");
                    view = that.seznam_2.ggrid("getView");
                    rows = view.getDataRows(true);
                    if (selection_2.length == rows.length)
                        ixs_dva_2 = "";
                    else {
                        if (that.seznam_2.is(":visible")) {
                            if (selection_2.length != 0) {
                                selection_2.forEach(row => {
                                    if (row.ixs_dva?.length == 12)
                                        ixs_dva_2 += row.ixs_dva + ",";
                                });
                            }
                            ixs_dva_2 = that.removeTrailingComma(ixs_dva_2);
                        }
                    }
                    returnModel.ixs_dva = ixs_dva;
                    returnModel.ixs_dva_2 = ixs_dva_2;
                    // Uložení do uživatelského nastavení
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.Vlastni", returnModel.vlastni);
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.Vyber", returnModel.vyber);
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.DleEsu", returnModel.dle_esu);
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.ElObraz", returnModel.el_obraz);
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.OdeslatPrilohy", returnModel.odeslat_prilohy);
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.ObsahText", returnModel.obsah_text);
                    that.globalSettings?.set("Global.Ddp.VyberZpusobuElektronickehoOdeslani.Poznamka", returnModel.poznamka);
                    that.close({ data: returnModel });
                }
                /** Odstraní čárku na konci řetězce, pokud existuje */
                removeTrailingComma(value) {
                    if (!value)
                        return value;
                    return value.endsWith(",") ? value.slice(0, -1) : value;
                }
            };
            GElektrickeOdeslani = __decorate([
                Decorators.gcontent
            ], GElektrickeOdeslani);
            WebClient.GElektrickeOdeslani = GElektrickeOdeslani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0VsZWt0cmlja2VPZGVzbGFuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdFbGVrdHJpY2tlT2Rlc2xhbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0ErVGY7QUEvVEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK1RuQjtJQS9UZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK1Q3QjtRQS9Ub0IsV0FBQSxTQUFTO1lBQzFCOzs7OztjQUtFO1lBRUYsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBVWpELGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLHVDQUF1QyxDQUFDO29CQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUF3QixDQUFDO29CQUV2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLE9BQU87NEJBQ2IsT0FBTyxFQUFFLElBQUk7NEJBQ2IsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ2xDLENBQUM7d0JBQ0YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFFRixJQUFJLENBQUMs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VC9CO1lBdFRZLDZCQUFtQixzQkFzVC9CLENBQUE7UUFDTCxDQUFDLEVBL1RvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErVDdCO0lBQUQsQ0FBQyxFQS9UZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK1RuQjtBQUFELENBQUMsRUEvVFMsTUFBTSxLQUFOLE1BQU0sUUErVGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0VsZWt0cmlja2VPZGVzbGFuaS50cyAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFbDvWLEm3IgenDFr3NvYnUgZWxla3Ryb25pY2vDqWhvIG9kZXNsw6Fuw60gICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDYtMDUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFbDvWLEm3IgenDFr3NvYnUgZWxla3Ryb25pY2vDqWhvIG9kZXNsw6Fuw61cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBWb2p0xJtjaCDEjGVjaFxyXG4gICAgICogQGRhdGUgMDUuMDYuMjAyNVxyXG4gICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0VsZWt0cmlja2VPZGVzbGFuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFBhcmFtZXRyeSAqL1xyXG4gICAgICAgIHBhcmFtczogYW55O1xyXG4gICAgICAgIC8qKiBUw6ltYSAtIG5hIHZzdHVwdSAqL1xyXG4gICAgICAgIHRlbWE6IHN0cmluZztcclxuICAgICAgICAvKiogVGFidWxrYSAtIGTFr3ZvZCB2YXpieSBwcm8gb2Rlc2zDoW7DrSAgKi9cclxuICAgICAgICBzZXpuYW06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIERydWjDoSB0YWJ1bGthIC0gZMWvdm9kIHZhemJ5IHBybyBvZGVzbMOhbsOtICovXHJcbiAgICAgICAgc2V6bmFtXzI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiTmFzdGF2ZW7DrSBwYXJhbWV0csWvIG9kZXPDrWzDoW7DrSB6w6FzaWxla1wiO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R0VsZWt0cmlja2VPZGVzbGFuaVwiO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWRzKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPSyFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEluaWNpYWxpemFjZSBob2Rub3R5IHBvbMOtIC0gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtICovXHJcbiAgICAgICAgaW5pY2lhbG5pSG9kbm90eSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBnbG9iYWxTZXR0aW5ncyA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmxhc3RuaTogYW55O1xyXG4gICAgICAgICAgICB2YXIgbnZ5Y2lkID0gdGhhdC5wYXJhbXMuZGRwX3JhZF9udnljaWQ7XHJcbiAgICAgICAgICAgIGlmIChudnljaWQgIT0gMSkgdmxhc3RuaSA9IDE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdmxhc3RuaTogdmxhc3RuaSA/PyBnbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5WeWJlclpwdXNvYnVFbGVrdHJvbmlja2Vob09kZXNsYW5pLlZsYXN0bmlcIikgPz8gMSxcclxuICAgICAgICAgICAgICAgIHZ5YmVyOiBnbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5WeWJlclpwdXNvYnVFbGVrdHJvbmlja2Vob09kZXNsYW5pLlZ5YmVyXCIpID8/IDEsXHJcbiAgICAgICAgICAgICAgICBkbGVfZXN1OiBnbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5WeWJlclpwdXNvYnVFbGVrdHJvbmlja2Vob09kZXNsYW5pLkRsZUVzdVwiKSA/PyAwLFxyXG4gICAgICAgICAgICAgICAgZGxlX2RzdTogKGdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuRGxlRXN1XCIpID8/IDApID09IDAsXHJcbiAgICAgICAgICAgICAgICBlbF9vYnJhejogZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuVnliZXJacHVzb2J1RWxla3Ryb25pY2tlaG9PZGVzbGFuaS5FbE9icmF6XCIpID8/IDAsXHJcbiAgICAgICAgICAgICAgICBvZGVzbGF0X3ByaWxvaHk6IGdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuT2Rlc2xhdFByaWxvaHlcIikgPz8gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvYnNhaF90ZXh0OiBnbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5WeWJlclpwdXNvYnVFbGVrdHJvbmlja2Vob09kZXNsYW5pLk9ic2FoVGV4dFwiKSA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcG96bmFta2E6IGdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuUG96bmFta2FcIikgPz8gXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBmb3JtdWzDocWZICovXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHtcclxuICAgICAgICAgICAgICAgIHZsYXN0bmksXHJcbiAgICAgICAgICAgICAgICB2eWJlcixcclxuICAgICAgICAgICAgICAgIGRsZV9lc3UsXHJcbiAgICAgICAgICAgICAgICBkbGVfZHN1LFxyXG4gICAgICAgICAgICAgICAgZWxfb2JyYXosXHJcbiAgICAgICAgICAgICAgICBvZGVzbGF0X3ByaWxvaHksXHJcbiAgICAgICAgICAgICAgICBvYnNhaF90ZXh0LFxyXG4gICAgICAgICAgICAgICAgcG96bmFta2FcclxuICAgICAgICAgICAgfSA9IHRoYXQuaW5pY2lhbG5pSG9kbm90eSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacHJhY292YXRlbFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZsYXN0bmlcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZsYXN0bmksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQucGFyYW1zLmRkcF9yYWRfbnZ5Y2lkICE9IDEsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogXCJWxaFlY2hueVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiBcIlZsYXN0bsOtXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCB2w71ixJtydVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5YmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB2eWJlcixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwiVsWhZWNobnlcIiB9LCAvL2NiX3ZzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogXCJQb3V6ZSB2eWJyYW7DqVwiIH0sIC8vY2JfdnlicmFuZVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRWwub2JyYXpcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbF9vYnJhelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZWxfb2JyYXosXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiBcIkFub1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBcIk5lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6IFwiUG9rdWQgbmVleGlzdHVqZSBnZW5lcnVqXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmcOtamVtY2kgesOhc2lsa3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkbGVfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3ViamVrdCB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZGxlX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlRXN1RHN1KGV2LCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGxlX2RzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRvdMSNZW7DqSBzdWJqZWt0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZGxlX2RzdSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlRXN1RHN1KGV2LCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9kZXNsYXRfcHJpbG9oeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk9kZXNsYXQgdsSNZXRuxJsgZWwuIHDFmcOtbG9oXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBvZGVzbGF0X3ByaWxvaHlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtNC00LTQsIE0tNC01LTMsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlZsYXN0bm9zdGkgc291Ym9ydVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvam1lbm92w6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2JzYWhfdGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogb2JzYWhfdGV4dFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2EgayBzb3Vib3J1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBwb3puYW1rYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7ICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSB0YWJ1bGVrICAqL1xyXG4gICAgICAgIGNyZWF0ZUdyaWRzKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnNlem5hbSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8RGRwLkludGVyZmFjZS5MSy5Jc2wuR0R1dm9kVmF6YnlEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlem5hbVwiLCAvLyBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuRHV2b2RWYXpieSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSkuaGVpZ2h0KDMwMCkucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVzOiBcInNcIixcclxuICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IDEyNVxyXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kVmlzaWJsZVJlc2l6ZUhhbmRsZSgncycpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKS5jc3MoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKS5jc3MoXCJwYWRkaW5nXCIsIFwiMTBweFwiKTtcclxuICBcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkYXR1bUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEgTC00LTgtMCBNLTYtNi0wIFMtNi02LTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBybyBvc29ieSBzIGRhdGVtIG5hcm96ZW7DrSBwbyAodsSNZXRuxJspXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfbmFyXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcInBvdcW+w610IHR5dG8gdHlweSB2YXpieSBFU1VcIiwgXCJ3LTRcIilcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7ICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2V6bmFtXzIgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdEdXZvZFZhemJ5RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZXpuYW1fMlwiLCAvLyBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuRHV2b2RWYXpieSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KS5yZXNpemFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXM6IFwic1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogMTI1XHJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRWaXNpYmxlUmVzaXplSGFuZGxlKCdzJylcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRsZURzdSA9IHRoYXQuZmluZEZpZWxkcyhcImRsZV9kc3VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmIChkbGVEc3UgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXpuYW0uZ2dyaWQoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlem5hbV8yLmdncmlkKCkuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmHEjXRlbsOtIGRhdCAqL1xyXG4gICAgICAgIGdldERhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuemlza2VqRHV2b2R5VmF6YnkoKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXpuYW0uZ2dyaWQoXCJzZXREYXRhXCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXpuYW1fMi5nZ3JpZChcInNldERhdGFcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmFzdGFsYSB6bcSbbmEgY2hlY2tib3jFryAnZGxlIEVTVS9EU1UnICovXHJcbiAgICAgICAgY2hhbmdlRXN1RHN1KGV2OiBhbnksIG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRzdVZhbHVlID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiZGxlX2RzdVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGVzdVZhbHVlID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiZGxlX2VzdVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZHN1VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V6bmFtLmdncmlkKCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXpuYW1fMi5nZ3JpZCgpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJkYXRfbmFyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJkYXR1bUZvcm1cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V6bmFtLmdncmlkKCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudGVtYSAhPSBcImRkcF9weW1fcG9wbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXpuYW1fMi5nZ3JpZCgpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImRhdHVtRm9ybVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghZXN1VmFsdWUgJiYgIWRzdVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T0s/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9LPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuTW9kZWw6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgcmV0dXJuTW9kZWwpO1xyXG4gICAgICAgICAgICByZXR1cm5Nb2RlbC5kYXRfbmFyID0gdGhhdC5maW5kRm9ybXMoXCJkYXR1bUZvcm1cIikuZmluZEZpZWxkcyhcImRhdF9uYXJcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBkbGVfZXN1OiBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmIChyZXR1cm5Nb2RlbC5kbGVfZXN1ICYmIHJldHVybk1vZGVsLmRsZV9kc3UpXHJcbiAgICAgICAgICAgICAgICBkbGVfZXN1ID0gMjtcclxuICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuTW9kZWwuZGxlX2VzdSlcclxuICAgICAgICAgICAgICAgIGRsZV9lc3UgPSAxO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5Nb2RlbC5kbGVfZHN1KVxyXG4gICAgICAgICAgICAgICAgZGxlX2VzdSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlldzogYW55O1xyXG4gICAgICAgICAgICB2YXIgcm93czogYW55O1xyXG5cclxuICAgICAgICAgICAgdmFyIGl4c19kdmE6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LnNlem5hbS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0R1dm9kVmF6YnlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgdmlldyA9IHRoYXQuc2V6bmFtXzIuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICByb3dzID0gdmlldy5nZXREYXRhUm93cyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IHJvd3MubGVuZ3RoKSBpeHNfZHZhID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5zZXpuYW0uaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2gocm93ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaXhzX2R2YT8ubGVuZ3RoID09IDEyKSBpeHNfZHZhICs9IHJvdy5peHNfZHZhICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGl4c19kdmEgPSB0aGF0LnJlbW92ZVRyYWlsaW5nQ29tbWEoaXhzX2R2YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBpeHNfZHZhXzI6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25fMiA9IHRoYXQuc2V6bmFtXzIuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdEdXZvZFZhemJ5RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgdmlldyA9IHRoYXQuc2V6bmFtXzIuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICByb3dzID0gdmlldy5nZXREYXRhUm93cyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25fMi5sZW5ndGggPT0gcm93cy5sZW5ndGgpIGl4c19kdmFfMiA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc2V6bmFtXzIuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25fMi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25fMi5mb3JFYWNoKHJvdyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93Lml4c19kdmE/Lmxlbmd0aCA9PSAxMikgaXhzX2R2YV8yICs9IHJvdy5peHNfZHZhICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGl4c19kdmFfMiA9IHRoYXQucmVtb3ZlVHJhaWxpbmdDb21tYShpeHNfZHZhXzIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm5Nb2RlbC5peHNfZHZhID0gaXhzX2R2YTtcclxuICAgICAgICAgICAgcmV0dXJuTW9kZWwuaXhzX2R2YV8yID0gaXhzX2R2YV8yO1xyXG5cclxuICAgICAgICAgICAgLy8gVWxvxb5lbsOtIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsU2V0dGluZ3M/LnNldChcIkdsb2JhbC5EZHAuVnliZXJacHVzb2J1RWxla3Ryb25pY2tlaG9PZGVzbGFuaS5WbGFzdG5pXCIsIHJldHVybk1vZGVsLnZsYXN0bmkpO1xyXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuVnliZXJcIiwgcmV0dXJuTW9kZWwudnliZXIpO1xyXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuRGxlRXN1XCIsIHJldHVybk1vZGVsLmRsZV9lc3UpO1xyXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuRWxPYnJhelwiLCByZXR1cm5Nb2RlbC5lbF9vYnJheik7XHJcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsU2V0dGluZ3M/LnNldChcIkdsb2JhbC5EZHAuVnliZXJacHVzb2J1RWxla3Ryb25pY2tlaG9PZGVzbGFuaS5PZGVzbGF0UHJpbG9oeVwiLCByZXR1cm5Nb2RlbC5vZGVzbGF0X3ByaWxvaHkpO1xyXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuT2JzYWhUZXh0XCIsIHJldHVybk1vZGVsLm9ic2FoX3RleHQpO1xyXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoXCJHbG9iYWwuRGRwLlZ5YmVyWnB1c29idUVsZWt0cm9uaWNrZWhvT2Rlc2xhbmkuUG96bmFta2FcIiwgcmV0dXJuTW9kZWwucG96bmFta2EpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jbG9zZSh7IGRhdGE6IHJldHVybk1vZGVsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE9kc3RyYW7DrSDEjcOhcmt1IG5hIGtvbmNpIMWZZXTEm3pjZSwgcG9rdWQgZXhpc3R1amUgKi9cclxuICAgICAgICByZW1vdmVUcmFpbGluZ0NvbW1hKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5lbmRzV2l0aChcIixcIikgPyB2YWx1ZS5zbGljZSgwLCAtMSkgOiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=