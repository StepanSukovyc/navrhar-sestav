"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPenalKalk.ts                          </Name>
//    <Description> Penalizační kalkulačka pro předpis                          </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-09                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GPenalKalk = class GPenalKalk extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.dto = {};
                }
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{
                            caption: this.title,
                            //action: this.actions["actGCiselnikRadkuZavritPotomky"],
                            defaultAction: true,
                        }]);
                    this.createForm();
                }
                createForm() {
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "penalKalkForm" })
                        .addSection()
                        .addRow("Datum od")
                        .addField("gdatebox", {
                        name: "pn_dat_od", //! pn_dat_od
                        flag: "required",
                        initialValue: new Date(),
                        change: function (ev, input) {
                            $(this).gform().findFields("pn_pocetDni").gfield("model", "apply", null);
                            that.refresh();
                        }
                    })
                        .addRow("Datum do")
                        .addField("gdatebox", {
                        name: "pn_dat_do", //! pn_dat_do
                        flag: "required",
                        initialValue: new Date(),
                        change: function (ev, input) {
                            $(this).gform().findFields("pn_pocetDni").gfield("model", "apply", null);
                            that.refresh();
                        }
                    })
                        .addRow("Počet dní")
                        .addField("gnumberbox", {
                        name: "pn_pocetDni", //! pn_pocetDni
                        initialValue: 1,
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) { //todo vyřešit chybu při zadání neplatného formátu datumu | příp. deaktivovat ruční zadávání
                                case "apply":
                                    let dateOd = $(this).gform().findFields("pn_dat_od").gfield("getValue");
                                    let dateDo = $(this).gform().findFields("pn_dat_do").gfield("getValue");
                                    let cas = dateDo.getTime() - dateOd.getTime();
                                    var pocet_dnu = (Math.ceil(cas / (1000 * 60 * 60 * 24)) + 1);
                                    $(this).gfield("setInitial", pocet_dnu);
                                    return;
                                case "collect": return;
                                default: return "pn_pocetDni";
                            }
                        },
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addRow("Částka za den")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "pn_castkaZaDen", //! pn_castkaZaDen
                        disabled: true,
                        change: function (ev, input) {
                            that.refresh();
                        }
                        //#region
                        /* po
                        model: function (operation, dto, modelOptions) {
                            //debugger; //todo DEBUGGER
                            switch (operation) { //todo vyřešit chybu při zadání neplatného formátu datumu | příp. deaktivovat ruční zadávání
                                case "apply":
                                    var getPocetDni = $(this).gform().findFields("pocetDni").gfield<number>("getValue");
                                    var getCastka = $(this).gform().findFields("castka").gfield<Decimal>("getValue").toNumber();
                                    var getProc = $(this).gform().findFields("proc").gfield<Decimal>("getValue").toNumber();
                                    var getProm = $(this).gform().findFields("prom").gfield<Decimal>("getValue").toNumber();
                                    var getRok = $(this).gform().findFields("rok_vyber").gfield<number>("getValue");
                                    var getPocRok = $(this).gform().findFields("rok_den").gfield<number>("getValue");
                                    var cd: number = 0;
    
                                    if (getPocRok == 0) {
                                        if (getProc > 0) { //! PROCENTO
                                            cd = (getProc / getRok / 100) * getCastka;  // <- částka za den
                                        }
                                        else if (getProm > 0) { //! PROMILE
                                            cd = (getProm / 1000) * getCastka; // <- částka za den
                                        }
                                    }
                                    else cd = 0;
    
                                    $(this).gfield("setInitial", cd);
                                    return;
                                case "collect": return;
                                default: return "castkaZaDen";
                            }
                        }
                        */
                        //#endregion
                    })
                        .addRow("Částka")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "pn_castka", //!pn_castka
                        flag: "required",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addSection("Způsob výpočtu")
                        .addField("gradio", {
                        name: "rok_den",
                        itemClass: "w-6",
                        initialValue: 0,
                        radios: [
                            {
                                value: 0,
                                label: "Po dnech",
                            },
                            {
                                value: 1,
                                label: "Za období",
                            },
                        ],
                        change: (ev, input) => {
                            this.refresh();
                        }
                    })
                        .addSection()
                        .addText("Roční sazba(procento)", "w-6")
                        .addText("Denní sazba(promile)", "w-6")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "pn_proc", //! pn_proc
                        change: function (ev, input) {
                            $(this).gform().findFields("pn_prom").gfield("model", "apply", null);
                            var getProc = $(this).gform().findFields("pn_proc").gfield("getValue").toNumber();
                            if (getProc != 0) {
                                $(this).gform().findFields("pn_prom").gfield("option", "disabled", true);
                            }
                            else
                                $(this).gform().findFields("pn_prom").gfield("option", "disabled", false);
                            that.refresh();
                        }
                    })
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "pn_prom", //! pn_prom
                        change: function (ev, input) {
                            $(this).gform().findFields("pn_proc").gfield("model", "apply", null);
                            var getProc = $(this).gform().findFields("pn_prom").gfield("getValue").toNumber();
                            if (getProc != 0) {
                                $(this).gform().findFields("pn_proc").gfield("option", "disabled", true);
                            }
                            else
                                $(this).gform().findFields("pn_proc").gfield("option", "disabled", false);
                            that.refresh();
                        }
                    })
                        .addField("gradio", {
                        name: "rok_vyber",
                        itemClass: "w-6",
                        initialValue: 365,
                        radios: [
                            {
                                value: 365,
                                label: "Rok běžný",
                            },
                            {
                                value: 360,
                                label: "Rok bankovní(360 dní)",
                            },
                        ],
                        change: (ev, input) => {
                            //this.GetRok();
                            this.refresh();
                        }
                    })
                        .addSection()
                        .addRow("Výše předpisu")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "pn_c_pred", //! pn_c_pred
                        disabled: true,
                        change: (ev, input) => {
                            this.refresh();
                        }
                        //#region 
                        /*
                        model: function (operation, dto, modelOptions) {
                            //debugger; //todo DEBUGGER
                            switch (operation) { //todo vyřešit chybu při zadání neplatného formátu datumu | příp. deaktivovat ruční zadávání
                                case "apply":
    
                                    var getPocetDni = $(this).gform().findFields("pocetDni").gfield<number>("getValue");
                                    var getCastka = $(this).gform().findFields("castka").gfield<Decimal>("getValue").toNumber();
                                    var getProc = $(this).gform().findFields("proc").gfield<Decimal>("getValue").toNumber();
                                    var getProm = $(this).gform().findFields("prom").gfield<Decimal>("getValue").toNumber();
                                    var getRok = $(this).gform().findFields("rok_vyber").gfield<number>("getValue");
                                    var getPocRok = $(this).gform().findFields("rok_den").gfield<number>("getValue");
                                    var cd: number = 0;
                                    var vysePredpisu: number;
                                    if (getPocRok == 1) {
                                        if (getProc > 0) { //! PROCENTO
                                            vysePredpisu = getCastka * getProc / 100 * getPocetDni / getRok
                                            //Set df_c_pred = df_castka*df_proc/100*pocet_dni/rok_den
                                        }
                                        else if (getProm > 0) { //! PROMILE
                                            vysePredpisu = getCastka * getProm / 1000 * getPocetDni;
                                            //Set df_c_pred = df_castka*df_prom/1000*pocet_dni
                                        }
                                        else
                                            vysePredpisu = 0;
                                    } else {
                                        if (getProc > 0) { //! PROCENTO
                                            vysePredpisu = getPocetDni * getCastka * getProc / getRok / 100
                                            //Set df_castka_den = (df_proc/rok_den/100)*df_castka
                                            //cd = (getProc / getRok / 100) * getCastka;  // <- částka za den
                                        }
                                        else if (getProm > 0) { //! PROMILE
                                            vysePredpisu = (getPocetDni * getCastka * getProm) / 1000;
                                            //Set df_castka_den = (df_prom/1000)*df_castka
                                            //cd = (getProm / 1000) * getCastka; // <- částka za den
                                        }
                                        else
                                            vysePredpisu = 0;
                                    }
                                    var getPredpis = $(this).gform().findFields("predpis").gfield<number>("getValue");
                                    if (getPredpis == 130) {
                                        vysePredpisu = -Math.abs(vysePredpisu)
                                    } else
                                        vysePredpisu = Math.abs(vysePredpisu)
    
                                    $(this).gfield("setInitial", vysePredpisu);
                                    return;
                                case "collect": return;
                                default: return "c_pred";
                            }
                        } */
                        //#endregion
                    })
                        .addSection()
                        .addField("gradio", {
                        name: "pn_predpis", //! pn_predpis
                        itemClass: "w-4",
                        initialValue: 120,
                        radios: [
                            {
                                value: 120,
                                label: "Předpis penále",
                            },
                            {
                                value: 130,
                                label: "Předpis úroku",
                            },
                            {
                                value: 125,
                                label: "Předpis pokuty",
                            },
                        ],
                        change: (ev, input) => {
                            $(this).gform().findFields("pn_c_pred").gfield("model", "apply", null);
                            $(this).gform().findFields("pn_castkaZaDen").gfield("model", "apply", null);
                            this.refresh();
                        }
                    });
                    var defaultForm = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    //OBSOLETE -> přesunuto k tlačítku OK()
                    //this.actions.addRange({
                    //    actVytvorit: {
                    //        caption: "Vytvořit předpis",
                    //        icon: "gi-save",
                    //        run: function (ev, ctx) {
                    //           debugger; //?-------------------------------
                    //            that.element.findForms("penalKalkForm").findFields().gfield("model", "collect", that.dto);
                    //            that.dto.ixp = that.Ixp;
                    //            that.dto.poznamka = that.poznamka;
                    //            that.dto.penKalk = true;
                    //            that.isl.Predpisy.ulozPredpis(rq => { return { data: that.dto } })
                    //                .get()
                    //                .done(function (ret) {
                    //                    that.showFlash("Změny úspěšně uloženy", "g-state-success");                                
                    //                })                       
                    //        }
                    //    }
                    //});
                    //this.menuBar([
                    //    { action: this.actions.actVytvorit, favorite: true }
                    //]);       
                }
                //private createActions() {
                //    this.actions.addRange([{
                //        name: "actGCiselnikRadkuZavritPotomky",
                //        run: () => {
                //            this.tryCloseAllSignificants();
                //        }
                //    }]);
                //}
                refresh() {
                    //this.GetRok();
                    var form = this.findForms("penalKalkForm");
                    var getPocetDni = form.findFields("pn_pocetDni").gfield("getValue");
                    var getCastka = form.findFields("pn_castka").gfield("getValue").toNumber();
                    var getProc = form.findFields("pn_proc").gfield("getValue").toNumber();
                    var getProm = form.findFields("pn_prom").gfield("getValue").toNumber();
                    var getRok = form.findFields("rok_vyber").gfield("getValue"); //this.rok_den;
                    var getPocRok = form.findFields("rok_den").gfield("getValue");
                    var getDatOd = form.findFields("pn_dat_od").gfield("getValue").toJSON().slice(0, 10);
                    var getDatDo = form.findFields("pn_dat_do").gfield("getValue").toJSON().slice(0, 10);
                    var zn = '';
                    var cd = 0;
                    var vysePredpisu = 0;
                    if (getPocRok == 1) {
                        if (getProc != 0) { //! PROCENTO
                            vysePredpisu = getCastka * getProc / 100 * getPocetDni / getRok;
                            //Set df_c_pred = df_castka*df_proc/100*pocet_dni/rok_den
                            cd = 0;
                            zn = `${getProc} %`;
                        }
                        else if (getProm != 0) { //! PROMILE
                            vysePredpisu = getCastka * getProm / 1000 * getPocetDni;
                            //Set df_c_pred = df_castka*df_prom/1000*pocet_dni
                            cd = 0;
                            zn = `${getProm} ‰`;
                        }
                        else
                            vysePredpisu = 0;
                    }
                    else if (getPocRok == 0) {
                        if (getProc != 0) { //! PROCENTO
                            vysePredpisu = getPocetDni * getCastka * getProc / getRok / 100;
                            //Set df_castka_den = (df_proc/rok_den/100)*df_castka
                            cd = (getProc / getRok / 100) * getCastka; // <- částka za den
                            zn = `${getProc} %`;
                        }
                        else if (getProm != 0) { //! PROMILE
                            vysePredpisu = getPocetDni * getCastka * getProm / 1000;
                            //Set df_castka_den = (df_prom/1000)*df_castka
                            cd = (getProm / 1000) * getCastka; // <- částka za den
                            zn = `${getProm} ‰`;
                        }
                        else {
                            vysePredpisu = 0;
                            cd = 0;
                        }
                    }
                    var getPredpis = form.findFields("pn_predpis").gfield("getValue");
                    if (getPredpis == 130) {
                        vysePredpisu = -Math.abs(vysePredpisu);
                        this.poznamka = `Úro. z ${getCastka} (${getDatOd} - ${getDatDo}) saz. ${zn}`;
                    }
                    else if (getPredpis == 120) {
                        vysePredpisu = Math.abs(vysePredpisu);
                        this.poznamka = `Pen. z ${getCastka} (${getDatOd} - ${getDatDo}) saz. ${zn}`;
                    }
                    else {
                        vysePredpisu = Math.abs(vysePredpisu);
                        this.poznamka = `Pok. z ${getCastka} (${getDatOd} - ${getDatDo}) saz. ${zn}`;
                    }
                    form.findFields("pn_castkaZaDen").gfield("setValue", cd);
                    form.findFields("pn_c_pred").gfield("setValue", vysePredpisu);
                }
                GetRok() {
                    //debugger;
                    var form = this.findForms("penalKalkForm");
                    var getRok = form.findFields("rok_vyber").gfield("getValue");
                    var gYear = form.findFields("pn_dat_do").gfield("getValue").getFullYear();
                    //var gYear = getYear.getFullYear();
                    if (getRok == 360) {
                        this.rok_den = 360;
                    }
                    else {
                        //this.rok_den = 365;
                        this.rok_den = this.prestupnyRok(gYear) ? 366 : 365;
                    }
                }
                prestupnyRok(year) {
                    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
                }
                ok() {
                    debugger;
                    var that = this;
                    that.element.findForms("penalKalkForm").findFields().gfield("model", "collect", that.dto);
                    that.dto.ixp = that.Ixp;
                    that.dto.poznamka = that.poznamka;
                    that.dto.penKalk = true; //předpis z pen. kalkulačky, pomocná položka DTO pro příznak získání hodnot z ní
                    that.dto.editace = false; //jedná se o nový záznam, pomocná položka DTO pro další kontroly na straně serveru
                    if (!that.dto.pn_c_pred) {
                        //that.showFlash("Nulový předpis uložit nelze", "g-state-warning");
                        return that.dialogs.warning("Chyba", "Nulový předpis uložit nelze");
                    }
                    else //TODO: ProcessResponse - zde upraveno -> k testu
                        WebClient.Common.Base.ProcessResponse(that.isl.Predpisy.ulozPredpis(rq => { return { rq: { Data: that.dto } }; }).get(), this, false, false)
                            .done((ret) => {
                            //this.notification("showToast", { id: "ulozeniPredpisu", title: "Úspěšné uložení", content: "Změny předpisu úspěšně uloženy" });                        
                            that.close(ret.Dto);
                        })
                            .fail(function (jqXHR, typ, obj) {
                            //if (typ === "exception") {
                            //    obj.handled = true;
                            //    return that.dialogs.error("Chyba", obj.baseMessage);
                            //    //return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si kontrolu přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistence = false, { confirm: true })); });
                            //}
                        });
                }
            };
            GPenalKalk = __decorate([
                Decorators.gcontent
            ], GPenalKalk);
            WebClient.GPenalKalk = GPenalKalk;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BlbmFsS2Fsay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQZW5hbEthbGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0E0YWY7QUE1YUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNGFuQjtJQTVhZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNGE3QjtRQTVhb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBQTVDOztvQkFNWSxRQUFHLEdBQTRDLEVBQUUsQ0FBQztnQkFrYTlELENBQUM7Z0JBOVpHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFDbkIseURBQXlEOzRCQUN6RCxhQUFhLEVBQUUsSUFBSTt5QkFDdEIsQ0FBQyxDQUFDLENBQUE7b0JBQ0gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDO3lCQUM1RCxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLFVBQVUsQ0FBQzt5QkFDbEIsUUFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDbEIsSUFBSSxFQUFFLFdBQVcsRUFBRSxhQUFhO3dCQUNoQyxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsWUFBWSxFQUFFLElBQUksSUFBSSxFQUFFO3dCQUN4QixNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSzs0QkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDekUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQzt5QkFDbEIsUUFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDbEIsSUFBSSxFQUFFLFdBQVcsRUFBRSxhQUFhO3dCQUNoQyxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsWUFBWSxFQUFFLElBQUksSUFBSSxFQUFFO3dCQUN4QixNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSzs0QkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDekUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQzt5QkFDbkIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLGFBQWEsRUFBRSxlQUFlO3dCQUNwQyxZQUFZLEVBQUUsQ0FBQzt3QkFDZixRQUFRLEVBQUUsSUFBSTt3QkFDZCxLQUFLLEVBQUUsVUFBVSxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVk7NEJBQ3pDLFFBQVEsU0FBUyxFQUFFLENBQUMsQ0FBQyw0RkFBNEY7Z0NBQzdHLEtBQUssT0FBTztvQ0FDUixJQUFJLE1BQU0sR0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBTyxVQUFVLENBQUMsQ0FBQztvQ0FDcEYsSUFBSSxNQUFNLEdBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQU8sVUFBVSxDQUFDLENBQUM7b0NBQ3BGLElBQUksR0FBRyxHQUFXLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQ3RELElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29DQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztvQ0FDeEMsT0FBTztnQ0FDWCxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU87Z0NBQ3ZCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sYUFBYSxDQUFDOzRCQUNsQyxDQUFDO3dCQUNMLENBQUM7d0JBQ0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7NEJBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQztxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7eUJBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUMvQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCO3dCQUMxQyxRQUFRLEVBQUUsSUFBSTt3QkFDZCxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSzs0QkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO3dCQUNELFNBQVM7d0JBQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQTZCRTt3QkFDRixZQUFZO3FCQUNmLENBQUM7eUJBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzt5QkFDaEIsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQy9DLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBWTt3QkFDL0IsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLOzRCQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxVQUFVLENBQUMsZ0JBQWdCLENBQUM7eUJBQzVCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxTQUFTO3dCQUNmLFNBQVMsRUFBRSxLQUFLO3dCQUNoQixZQUFZLEVBQUUsQ0FBQzt3QkFDZixNQUFNLEVBQUU7NEJBQ0o7Z0NBQ0ksS0FBSyxFQUFFLENBQUM7Z0NBQ1IsS0FBSyxFQUFFLFVBQVU7NkJBQ3BCOzRCQUNEO2dDQUNJLEtBQUssRUFBRSxDQUFDO2dDQUNSLEtBQUssRUFBRSxXQUFXOzZCQUNyQjt5QkFDSjt3QkFDRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQztxQkFDSixDQUFDO3lCQUNELFVBQVUsRUFBRTt5QkFDWixPQUFPLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDO3lCQUN2QyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDO3lCQUN0QyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3RELElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVzt3QkFDNUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7NEJBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBRXJFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUUzRixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDZixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUM3RSxDQUFDOztnQ0FDRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUU5RSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3RELElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVzt3QkFDNUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7NEJBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBRXJFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUUzRixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDZixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUM3RSxDQUFDOztnQ0FDRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUU5RSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoQixJQUFJLEVBQUUsV0FBVzt3QkFDakIsU0FBUyxFQUFFLEtBQUs7d0JBQ2hCLFlBQVksRUFBRSxHQUFHO3dCQUNqQixNQUFNLEVBQUU7NEJBQ0o7Z0NBQ0ksS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsS0FBSyxFQUFFLFdBQVc7NkJBQ3JCOzRCQUNEO2dDQUNJLEtBQUssRUFBRSxHQUFHO2dDQUNWLEtBQUssRUFBRSx1QkFBdUI7NkJBQ2pDO3lCQUNKO3dCQUNELE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTs0QkFDbEIsZ0JBQWdCOzRCQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQy9DLElBQUksRUFBRSxXQUFXLEVBQUUsYUFBYTt3QkFDaEMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFOzRCQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7d0JBQ0QsVUFBVTt3QkFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBa0RJO3dCQUNKLFlBQVk7cUJBQ2YsQ0FBQzt5QkFDRCxVQUFVLEVBQUU7eUJBQ1osUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDaEIsSUFBSSxFQUFFLFlBQVksRUFBRSxjQUFjO3dCQUNsQyxTQUFTLEVBQUUsS0FBSzt3QkFDaEIsWUFBWSxFQUFFLEdBQUc7d0JBQ2pCLE1BQU0sRUFBRTs0QkFDSjtnQ0FDSSxLQUFLLEVBQUUsR0FBRztnQ0FDVixLQUFLLEVBQUUsZ0JBQWdCOzZCQUMxQjs0QkFDRDtnQ0FDSSxLQUFLLEVBQUUsR0FBRztnQ0FDVixLQUFLLEVBQUUsZUFBZTs2QkFDekI7NEJBQ0Q7Z0NBQ0ksS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsS0FBSyxFQUFFLGdCQUFnQjs2QkFDMUI7eUJBQ0o7d0JBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFOzRCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUN2RSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQzVFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQztxQkFDSixDQUFDLENBQ0Q7b0JBRUwsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDcEYsdUNBQXVDO29CQUN2Qyx5QkFBeUI7b0JBQ3pCLG9CQUFvQjtvQkFDcEIsc0NBQXNDO29CQUN0QywwQkFBMEI7b0JBQzFCLG1DQUFtQztvQkFDbkMseURBQXlEO29CQUV6RCx3R0FBd0c7b0JBQ3hHLHNDQUFzQztvQkFDdEMsZ0RBQWdEO29CQUNoRCxzQ0FBc0M7b0JBRXRDLGdGQUFnRjtvQkFDaEYsd0JBQXdCO29CQUN4Qix3Q0FBd0M7b0JBQ3hDLGlIQUFpSDtvQkFDakgsMkNBQTJDO29CQUMzQyxXQUFXO29CQUNYLE9BQU87b0JBQ1AsS0FBSztvQkFDTCxnQkFBZ0I7b0JBQ2hCLDBEQUEwRDtvQkFDMUQsWUFBWTtnQkFDaEIsQ0FBQztnQkFFRCwyQkFBMkI7Z0JBQzNCLDhCQUE4QjtnQkFDOUIsaURBQWlEO2dCQUNqRCxzQkFBc0I7Z0JBQ3RCLDZDQUE2QztnQkFDN0MsV0FBVztnQkFDWCxVQUFVO2dCQUNWLEdBQUc7Z0JBRUssT0FBTztvQkFDWCxnQkFBZ0I7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFTLFVBQVUsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBVSxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDcEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBUyxVQUFVLENBQUMsQ0FBQyxDQUFDLGVBQWU7b0JBQ3JGLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFTLFVBQVUsQ0FBQyxDQUFDO29CQUN0RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBTyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMzRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBTyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUUzRixJQUFJLEVBQUUsR0FBVyxFQUFFLENBQUM7b0JBQ3BCLElBQUksRUFBRSxHQUFXLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxZQUFZLEdBQVcsQ0FBQyxDQUFDO29CQUM3QixJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZOzRCQUM1QixZQUFZLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQzs0QkFDaEUseURBQXlEOzRCQUN6RCxFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUNQLEVBQUUsR0FBRyxHQUFHLE9BQU8sSUFBSSxDQUFDO3dCQUN4QixDQUFDOzZCQUNJLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVzs0QkFDaEMsWUFBWSxHQUFHLFNBQVMsR0FBRyxPQUFPLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQzs0QkFDeEQsa0RBQWtEOzRCQUNsRCxFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUNQLEVBQUUsR0FBRyxHQUFHLE9BQU8sSUFBSSxDQUFDO3dCQUN4QixDQUFDOzs0QkFFRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixDQUFDO3lCQUFNLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUN4QixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVk7NEJBQzVCLFlBQVksR0FBRyxXQUFXLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFBOzRCQUMvRCxxREFBcUQ7NEJBQ3JELEVBQUUsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUUsbUJBQW1COzRCQUMvRCxFQUFFLEdBQUcsR0FBRyxPQUFPLElBQUksQ0FBQzt3QkFDeEIsQ0FBQzs2QkFDSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVc7NEJBQ2hDLFlBQVksR0FBRyxXQUFXLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7NEJBQ3hELDhDQUE4Qzs0QkFDOUMsRUFBRSxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQjs0QkFDdEQsRUFBRSxHQUFHLEdBQUcsT0FBTyxJQUFJLENBQUM7d0JBQ3hCLENBQUM7NkJBQ0ksQ0FBQzs0QkFDRixZQUFZLEdBQUcsQ0FBQyxDQUFDOzRCQUNqQixFQUFFLEdBQUcsQ0FBQyxDQUFBO3dCQUNWLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBUyxVQUFVLENBQUMsQ0FBQztvQkFDMUUsSUFBSSxVQUFVLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ3BCLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxTQUFTLEtBQUssUUFBUSxNQUFNLFFBQVEsVUFBVSxFQUFFLEVBQUUsQ0FBQztvQkFDakYsQ0FBQzt5QkFBTSxJQUFJLFVBQVUsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDM0IsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxTQUFTLEtBQUssUUFBUSxNQUFNLFFBQVEsVUFBVSxFQUFFLEVBQUUsQ0FBQztvQkFDakYsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO3dCQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsU0FBUyxLQUFLLFFBQVEsTUFBTSxRQUFRLFVBQVUsRUFBRSxFQUFFLENBQUM7b0JBQ2pGLENBQUM7b0JBR0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFFbEUsQ0FBQztnQkFFTyxNQUFNO29CQUNWLFdBQVc7b0JBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQVMsVUFBVSxDQUFDLENBQUM7b0JBQ3JFLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFPLFVBQVUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN4RixvQ0FBb0M7b0JBQ3BDLElBQUksTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztvQkFDdkIsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLHFCQUFxQjt3QkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtvQkFDdkQsQ0FBQztnQkFDTCxDQUFDO2dCQUNPLFlBQVksQ0FBQyxJQUFZO29CQUM3QixPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztnQkFLRCxFQUFFO29CQUNFLFFBQVEsQ0FBQztvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUksZ0ZBQWdGO29CQUM1RyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBRyxrRkFBa0Y7b0JBQzlHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUN0QixtRUFBbUU7d0JBQ25FLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLDZCQUE2QixDQUFDLENBQUM7b0JBRXhFLENBQUM7eUJBQ0ksaURBQWlEO3dCQUNsRCxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQzs2QkFDN0gsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ1YseUpBQXlKOzRCQUN6SixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDdkIsQ0FBQyxDQUFDOzZCQUNELElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRzs0QkFDM0IsNEJBQTRCOzRCQUM1Qix5QkFBeUI7NEJBQ3pCLDBEQUEwRDs0QkFDMUQsc09BQXNPOzRCQUN0TyxHQUFHO3dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNmLENBQUM7YUFDSixDQUFBO1lBeGFZLFVBQVU7Z0JBRHRCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsVUFBVSxDQXdhdEI7WUF4YVksb0JBQVUsYUF3YXRCLENBQUE7UUFDTCxDQUFDLEVBNWFvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0YTdCO0lBQUQsQ0FBQyxFQTVhZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNGFuQjtBQUFELENBQUMsRUE1YVMsTUFBTSxLQUFOLE1BQU0sUUE0YWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1BlbmFsS2Fsay50cyAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFBlbmFsaXphxI1uw60ga2Fsa3VsYcSNa2EgcHJvIHDFmWVkcGlzICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIyLTAzLTA5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGVuYWxLYWxrIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIFR5cF9waGw6IHN0cmluZztcclxuICAgICAgICBwb3puYW1rYTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvID0ge307XHJcbiAgICAgICAgcm9rX2RlbjogbnVtYmVyO1xyXG4gICAgICAgIHBvY2V0X2RuaTogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIC8vYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWtSYWRrdVphdnJpdFBvdG9ta3lcIl0sXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICB9XSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInBlbmFsS2Fsa0Zvcm1cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG9kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbl9kYXRfb2RcIiwgLy8hIHBuX2RhdF9vZFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwicG5fcG9jZXREbmlcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG5fZGF0X2RvXCIsIC8vISBwbl9kYXRfZG9cclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInBuX3BvY2V0RG5pXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IGRuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG5fcG9jZXREbmlcIiwgLy8hIHBuX3BvY2V0RG5pXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikgeyAvL3RvZG8gdnnFmWXFoWl0IGNoeWJ1IHDFmWkgemFkw6Fuw60gbmVwbGF0bsOpaG8gZm9ybcOhdHUgZGF0dW11IHwgcMWZw61wLiBkZWFrdGl2b3ZhdCBydcSNbsOtIHphZMOhdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZU9kOiBEYXRlID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwbl9kYXRfb2RcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVEbzogRGF0ZSA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwicG5fZGF0X2RvXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXM6IG51bWJlciA9IGRhdGVEby5nZXRUaW1lKCkgLSBkYXRlT2QuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2NldF9kbnUgPSAoTWF0aC5jZWlsKGNhcyAvICgxMDAwICogNjAgKiA2MCAqIDI0KSkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgcG9jZXRfZG51KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJwbl9wb2NldERuaVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOhc3RrYSB6YSBkZW5cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG5fY2FzdGthWmFEZW5cIiwgLy8hIHBuX2Nhc3RrYVphRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb25cclxuICAgICAgICAgICAgICAgICAgICAvKiBwb1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyOyAvL3RvZG8gREVCVUdHRVJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHsgLy90b2RvIHZ5xZllxaFpdCBjaHlidSBwxZlpIHphZMOhbsOtIG5lcGxhdG7DqWhvIGZvcm3DoXR1IGRhdHVtdSB8IHDFmcOtcC4gZGVha3Rpdm92YXQgcnXEjW7DrSB6YWTDoXbDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldFBvY2V0RG5pID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwb2NldERuaVwiKS5nZmllbGQ8bnVtYmVyPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRDYXN0a2EgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNhc3RrYVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRQcm9jID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwcm9jXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldFByb20gPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInByb21cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIikudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0Um9rID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJyb2tfdnliZXJcIikuZ2ZpZWxkPG51bWJlcj4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UG9jUm9rID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJyb2tfZGVuXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0UG9jUm9rID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldFByb2MgPiAwKSB7IC8vISBQUk9DRU5UT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2QgPSAoZ2V0UHJvYyAvIGdldFJvayAvIDEwMCkgKiBnZXRDYXN0a2E7ICAvLyA8LSDEjcOhc3RrYSB6YSBkZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChnZXRQcm9tID4gMCkgeyAvLyEgUFJPTUlMRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2QgPSAoZ2V0UHJvbSAvIDEwMDApICogZ2V0Q2FzdGthOyAvLyA8LSDEjcOhc3RrYSB6YSBkZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGNkID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIGNkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjYXN0a2FaYURlblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOhc3RrYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbl9jYXN0a2FcIiwgLy8hcG5fY2FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJacMWvc29iIHbDvXBvxI10dVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva19kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy02XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvIGRuZWNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWmEgb2Jkb2LDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlJvxI1uw60gc2F6YmEocHJvY2VudG8pXCIsIFwidy02XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRlbm7DrSBzYXpiYShwcm9taWxlKVwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IC8vdG9kbyBQcmVmYWJzIHptxJtuaXQgbmEgJSBwcm9jZW50b1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG5fcHJvY1wiLCAvLyEgcG5fcHJvY1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInBuX3Byb21cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRQcm9jID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwbl9wcm9jXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLnRvTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0UHJvYyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInBuX3Byb21cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwbl9wcm9tXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgLy90b2RvIFByZWZhYnMgem3Em25pdCBuYSDigLAgcHJvbWlsZVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG5fcHJvbVwiLCAvLyEgcG5fcHJvbVxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInBuX3Byb2NcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRQcm9jID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwbl9wcm9tXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLnRvTnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0UHJvYyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInBuX3Byb2NcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwbl9wcm9jXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX3Z5YmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMzY1LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzY1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUm9rIGLEm8W+bsO9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSb2sgYmFua292bsOtKDM2MCBkbsOtKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5HZXRSb2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWw73FoWUgcMWZZWRwaXN1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBuX2NfcHJlZFwiLCAvLyEgcG5fY19wcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgLy90b2RvIERFQlVHR0VSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7IC8vdG9kbyB2ecWZZcWhaXQgY2h5YnUgcMWZaSB6YWTDoW7DrSBuZXBsYXRuw6lobyBmb3Jtw6F0dSBkYXR1bXUgfCBwxZnDrXAuIGRlYWt0aXZvdmF0IHJ1xI1uw60gemFkw6F2w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UG9jZXREbmkgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInBvY2V0RG5pXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldENhc3RrYSA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY2FzdGthXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldFByb2MgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInByb2NcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIikudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UHJvbSA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwicHJvbVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRSb2sgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInJva192eWJlclwiKS5nZmllbGQ8bnVtYmVyPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRQb2NSb2sgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInJva19kZW5cIikuZ2ZpZWxkPG51bWJlcj4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2Q6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5c2VQcmVkcGlzdTogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRQb2NSb2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0UHJvYyA+IDApIHsgLy8hIFBST0NFTlRPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNlUHJlZHBpc3UgPSBnZXRDYXN0a2EgKiBnZXRQcm9jIC8gMTAwICogZ2V0UG9jZXREbmkgLyBnZXRSb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2NfcHJlZCA9IGRmX2Nhc3RrYSpkZl9wcm9jLzEwMCpwb2NldF9kbmkvcm9rX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGdldFByb20gPiAwKSB7IC8vISBQUk9NSUxFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNlUHJlZHBpc3UgPSBnZXRDYXN0a2EgKiBnZXRQcm9tIC8gMTAwMCAqIGdldFBvY2V0RG5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgZGZfY19wcmVkID0gZGZfY2FzdGthKmRmX3Byb20vMTAwMCpwb2NldF9kbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNlUHJlZHBpc3UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRQcm9jID4gMCkgeyAvLyEgUFJPQ0VOVE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IGdldFBvY2V0RG5pICogZ2V0Q2FzdGthICogZ2V0UHJvYyAvIGdldFJvayAvIDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgZGZfY2FzdGthX2RlbiA9IChkZl9wcm9jL3Jva19kZW4vMTAwKSpkZl9jYXN0a2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2QgPSAoZ2V0UHJvYyAvIGdldFJvayAvIDEwMCkgKiBnZXRDYXN0a2E7ICAvLyA8LSDEjcOhc3RrYSB6YSBkZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChnZXRQcm9tID4gMCkgeyAvLyEgUFJPTUlMRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnlzZVByZWRwaXN1ID0gKGdldFBvY2V0RG5pICogZ2V0Q2FzdGthICogZ2V0UHJvbSkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgZGZfY2FzdGthX2RlbiA9IChkZl9wcm9tLzEwMDApKmRmX2Nhc3RrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jZCA9IChnZXRQcm9tIC8gMTAwMCkgKiBnZXRDYXN0a2E7IC8vIDwtIMSNw6FzdGthIHphIGRlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRQcmVkcGlzID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJwcmVkcGlzXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldFByZWRwaXMgPT0gMTMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IC1NYXRoLmFicyh2eXNlUHJlZHBpc3UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IE1hdGguYWJzKHZ5c2VQcmVkcGlzdSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHZ5c2VQcmVkcGlzdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY19wcmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ICovXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBuX3ByZWRwaXNcIiwgLy8hIHBuX3ByZWRwaXNcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQxZllZHBpcyBwZW7DoWxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQxZllZHBpcyDDunJva3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEyNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlDFmWVkcGlzIHBva3V0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwicG5fY19wcmVkXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwicG5fY2FzdGthWmFEZW5cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBoZWFkZXJGb3JtKTtcclxuICAgICAgICAgICAgLy9PQlNPTEVURSAtPiBwxZllc3VudXRvIGsgdGxhxI3DrXRrdSBPSygpXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgLy8gICAgYWN0Vnl0dm9yaXQ6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiVnl0dm/FmWl0IHDFmWVkcGlzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgIGRlYnVnZ2VyOyAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJwZW5hbEthbGtGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhhdC5kdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZHRvLml4cCA9IHRoYXQuSXhwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZHRvLnBvem5hbWthID0gdGhhdC5wb3puYW1rYTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmR0by5wZW5LYWxrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5pc2wuUHJlZHBpc3kudWxvelByZWRwaXMocnEgPT4geyByZXR1cm4geyBkYXRhOiB0aGF0LmR0byB9IH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlptxJtueSDDunNwxJvFoW7EmyB1bG/FvmVueVwiLCBcImctc3RhdGUtc3VjY2Vzc1wiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy90aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5dHZvcml0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIC8vXSk7ICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlrUmFka3VaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgLy8gICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgfV0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlZnJlc2goKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5HZXRSb2soKTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInBlbmFsS2Fsa0Zvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBnZXRQb2NldERuaSA9IGZvcm0uZmluZEZpZWxkcyhcInBuX3BvY2V0RG5pXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBnZXRDYXN0a2EgPSBmb3JtLmZpbmRGaWVsZHMoXCJwbl9jYXN0a2FcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIikudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgdmFyIGdldFByb2MgPSBmb3JtLmZpbmRGaWVsZHMoXCJwbl9wcm9jXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHZhciBnZXRQcm9tID0gZm9ybS5maW5kRmllbGRzKFwicG5fcHJvbVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0Um9rID0gZm9ybS5maW5kRmllbGRzKFwicm9rX3Z5YmVyXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7IC8vdGhpcy5yb2tfZGVuO1xyXG4gICAgICAgICAgICB2YXIgZ2V0UG9jUm9rID0gZm9ybS5maW5kRmllbGRzKFwicm9rX2RlblwiKS5nZmllbGQ8bnVtYmVyPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0RGF0T2QgPSBmb3JtLmZpbmRGaWVsZHMoXCJwbl9kYXRfb2RcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIikudG9KU09OKCkuc2xpY2UoMCwgMTApO1xyXG4gICAgICAgICAgICB2YXIgZ2V0RGF0RG8gPSBmb3JtLmZpbmRGaWVsZHMoXCJwbl9kYXRfZG9cIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIikudG9KU09OKCkuc2xpY2UoMCwgMTApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHpuOiBzdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgdmFyIGNkOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICB2YXIgdnlzZVByZWRwaXN1OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoZ2V0UG9jUm9rID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRQcm9jICE9IDApIHsgLy8hIFBST0NFTlRPXHJcbiAgICAgICAgICAgICAgICAgICAgdnlzZVByZWRwaXN1ID0gZ2V0Q2FzdGthICogZ2V0UHJvYyAvIDEwMCAqIGdldFBvY2V0RG5pIC8gZ2V0Um9rO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2NfcHJlZCA9IGRmX2Nhc3RrYSpkZl9wcm9jLzEwMCpwb2NldF9kbmkvcm9rX2RlblxyXG4gICAgICAgICAgICAgICAgICAgIGNkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB6biA9IGAke2dldFByb2N9ICVgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZ2V0UHJvbSAhPSAwKSB7IC8vISBQUk9NSUxFXHJcbiAgICAgICAgICAgICAgICAgICAgdnlzZVByZWRwaXN1ID0gZ2V0Q2FzdGthICogZ2V0UHJvbSAvIDEwMDAgKiBnZXRQb2NldERuaTtcclxuICAgICAgICAgICAgICAgICAgICAvL1NldCBkZl9jX3ByZWQgPSBkZl9jYXN0a2EqZGZfcHJvbS8xMDAwKnBvY2V0X2RuaVxyXG4gICAgICAgICAgICAgICAgICAgIGNkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB6biA9IGAke2dldFByb219IOKAsGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdnlzZVByZWRwaXN1ID0gMDsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdldFBvY1JvayA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0UHJvYyAhPSAwKSB7IC8vISBQUk9DRU5UT1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IGdldFBvY2V0RG5pICogZ2V0Q2FzdGthICogZ2V0UHJvYyAvIGdldFJvayAvIDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2Nhc3RrYV9kZW4gPSAoZGZfcHJvYy9yb2tfZGVuLzEwMCkqZGZfY2FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgY2QgPSAoZ2V0UHJvYyAvIGdldFJvayAvIDEwMCkgKiBnZXRDYXN0a2E7ICAvLyA8LSDEjcOhc3RrYSB6YSBkZW5cclxuICAgICAgICAgICAgICAgICAgICB6biA9IGAke2dldFByb2N9ICVgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZ2V0UHJvbSAhPSAwKSB7IC8vISBQUk9NSUxFXHJcbiAgICAgICAgICAgICAgICAgICAgdnlzZVByZWRwaXN1ID0gZ2V0UG9jZXREbmkgKiBnZXRDYXN0a2EgKiBnZXRQcm9tIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAvL1NldCBkZl9jYXN0a2FfZGVuID0gKGRmX3Byb20vMTAwMCkqZGZfY2FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgY2QgPSAoZ2V0UHJvbSAvIDEwMDApICogZ2V0Q2FzdGthOyAvLyA8LSDEjcOhc3RrYSB6YSBkZW5cclxuICAgICAgICAgICAgICAgICAgICB6biA9IGAke2dldFByb219IOKAsGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2eXNlUHJlZHBpc3UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNkID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBnZXRQcmVkcGlzID0gZm9ybS5maW5kRmllbGRzKFwicG5fcHJlZHBpc1wiKS5nZmllbGQ8bnVtYmVyPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAoZ2V0UHJlZHBpcyA9PSAxMzApIHtcclxuICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IC1NYXRoLmFicyh2eXNlUHJlZHBpc3UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvem5hbWthID0gYMOacm8uIHogJHtnZXRDYXN0a2F9ICgke2dldERhdE9kfSAtICR7Z2V0RGF0RG99KSBzYXouICR7em59YDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChnZXRQcmVkcGlzID09IDEyMCkge1xyXG4gICAgICAgICAgICAgICAgdnlzZVByZWRwaXN1ID0gTWF0aC5hYnModnlzZVByZWRwaXN1KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3puYW1rYSA9IGBQZW4uIHogJHtnZXRDYXN0a2F9ICgke2dldERhdE9kfSAtICR7Z2V0RGF0RG99KSBzYXouICR7em59YDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZ5c2VQcmVkcGlzdSA9IE1hdGguYWJzKHZ5c2VQcmVkcGlzdSlcclxuICAgICAgICAgICAgICAgIHRoaXMucG96bmFta2EgPSBgUG9rLiB6ICR7Z2V0Q2FzdGthfSAoJHtnZXREYXRPZH0gLSAke2dldERhdERvfSkgc2F6LiAke3pufWA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJwbl9jYXN0a2FaYURlblwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjZCk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInBuX2NfcHJlZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2eXNlUHJlZHBpc3UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgR2V0Um9rKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwicGVuYWxLYWxrRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIGdldFJvayA9IGZvcm0uZmluZEZpZWxkcyhcInJva192eWJlclwiKS5nZmllbGQ8bnVtYmVyPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ1llYXI6IG51bWJlciA9IGZvcm0uZmluZEZpZWxkcyhcInBuX2RhdF9kb1wiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAvL3ZhciBnWWVhciA9IGdldFllYXIuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgaWYgKGdldFJvayA9PSAzNjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9rX2RlbiA9IDM2MDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yb2tfZGVuID0gMzY1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2tfZGVuID0gdGhpcy5wcmVzdHVwbnlSb2soZ1llYXIpID8gMzY2IDogMzY1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBwcmVzdHVwbnlSb2soeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKHllYXIgJSA0ID09IDApICYmICh5ZWFyICUgMTAwICE9IDApKSB8fCAoeWVhciAlIDQwMCA9PSAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJwZW5hbEthbGtGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhhdC5kdG8pO1xyXG4gICAgICAgICAgICB0aGF0LmR0by5peHAgPSB0aGF0Lkl4cDtcclxuICAgICAgICAgICAgdGhhdC5kdG8ucG96bmFta2EgPSB0aGF0LnBvem5hbWthO1xyXG4gICAgICAgICAgICB0aGF0LmR0by5wZW5LYWxrID0gdHJ1ZTsgICAgLy9wxZllZHBpcyB6IHBlbi4ga2Fsa3VsYcSNa3ksIHBvbW9jbsOhIHBvbG/FvmthIERUTyBwcm8gcMWZw616bmFrIHrDrXNrw6Fuw60gaG9kbm90IHogbsOtXHJcbiAgICAgICAgICAgIHRoYXQuZHRvLmVkaXRhY2UgPSBmYWxzZTsgICAvL2plZG7DoSBzZSBvIG5vdsO9IHrDoXpuYW0sIHBvbW9jbsOhIHBvbG/FvmthIERUTyBwcm8gZGFsxaHDrSBrb250cm9seSBuYSBzdHJhbsSbIHNlcnZlcnVcclxuICAgICAgICAgICAgaWYgKCF0aGF0LmR0by5wbl9jX3ByZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJOdWxvdsO9IHDFmWVkcGlzIHVsb8W+aXQgbmVsemVcIiwgXCJnLXN0YXRlLXdhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJDaHliYVwiLCBcIk51bG92w70gcMWZZWRwaXMgdWxvxb5pdCBuZWx6ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSAvL1RPRE86IFByb2Nlc3NSZXNwb25zZSAtIHpkZSB1cHJhdmVubyAtPiBrIHRlc3R1XHJcbiAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGhhdC5pc2wuUHJlZHBpc3kudWxvelByZWRwaXMocnEgPT4geyByZXR1cm4geyBycTogeyBEYXRhOiB0aGF0LmR0byB9IH07IH0pLmdldCgpLCB0aGlzLCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIsIHRpdGxlOiBcIsOac3DEm8WhbsOpIHVsb8W+ZW7DrVwiLCBjb250ZW50OiBcIlptxJtueSBwxZllZHBpc3Ugw7pzcMSbxaFuxJsgdWxvxb5lbnlcIiB9KTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyZXQuRHRvKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKG9iai5iYXNlTWVzc2FnZSArIFwiPC9icj4gUMWZZWpldGUgc2kga29udHJvbHUgcMWZZXBzYXQ/XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnVsb3ooJC5leHRlbmQocGFyYW1zLCBwYXJhbXMuS29udHJvbGFFeGlzdGVuY2UgPSBmYWxzZSwgeyBjb25maXJtOiB0cnVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=