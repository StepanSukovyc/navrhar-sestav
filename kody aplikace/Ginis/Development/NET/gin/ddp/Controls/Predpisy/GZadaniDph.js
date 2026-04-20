"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GZadaniDph.ts                          </Name>
//    <Description> Okno pro zadání a výpočet DPH                               </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-10-17                                                  </Created>
//  </FileHeader>
//---------------------------
// TODO:    Okno nejde zavřít
//          Nastavit aby okno vracelo data
//---------------------------
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GZadaniDph = class GZadaniDph extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    //---------------------------
                    this.sazbyDPH = [];
                    this.dtoPredpis = {};
                    this.dtoPripad = {};
                    this.dtoTypPhl = {};
                    this.zak = false;
                    this.sniz = false;
                    this.sniz2 = false;
                    //endRegion
                }
                //formCreated: boolean = false;
                //formLoaded: number = 0;
                //stepsCount: number = 3;
                //---------------------------
                onContentReady() {
                    var that = this;
                    that.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    //---------------------------
                    //#region Načtení případu
                    //this.beginOperation();
                    //that.isl.Pripad.read(rq => {
                    //    return {
                    //        data: { ixp: this.Ixp },
                    //        fragments: ["*"]
                    //    }
                    //})
                    //    .get().done((data) => {
                    //        this.dtoPripad = data.data;
                    //    })
                    //    .always(() => {
                    //        this.endOperation();
                    //    });
                    //endregion
                    //---------------------------         
                    //!-----Načtení údajů o předpisu          
                    if (this.Radek_uhr) {
                        this.beginOperation();
                        var predpisProm = that.isl.Predpisy.read(rq => {
                            return {
                                data: { ixp: this.Ixp, radek_uhr: this.Radek_uhr },
                                fragments: ["Default", "Extended"]
                            };
                        }).get();
                        predpisProm.done((data) => {
                            var castka, datum;
                            //debugger; //=====================
                            this.dtoPredpis = data.data;
                            if (!this.Castka_K_Vypoctu) {
                                if (data.data.c) {
                                    castka = data.data.c;
                                }
                            }
                            else {
                                castka = this.Castka_K_Vypoctu;
                            }
                            if (!this.DatumZdaneni) {
                                if (data.data.dat_zdan) {
                                    datum = data.data.dat_zdan;
                                }
                            }
                            else {
                                datum = this.DatumZdaneni;
                                //this.DatumZdaneni = data.data.dat_zdan ?? new Date;
                            }
                            //this.endOperation();
                            this.element.findForms("zadaniDphForm").findFields("castka").gfield("setValue", castka ?? 0);
                            this.element.findForms("zadaniDphForm").findFields("dat_zdan").gfield("setValue", datum ?? new Date);
                            //this.formLoaded++;
                            this.endOperation();
                        });
                    }
                    //---------------------------
                    //!-----Načtení údajů o typu pohledávky (příznaky případu)
                    this.beginOperation();
                    var typPhlProm = that.isl.TypPohledavky.read(rq => {
                        return {
                            data: {
                                typ_phl: this.Typ_phl,
                                Nastaveni: this.ucs == null ? undefined : {
                                    rok: this.rok,
                                    ucs: this.ucs,
                                    ico: this.ico
                                }
                            },
                            fragments: ["*", "Nastaveni.*"]
                        };
                    }).get();
                    typPhlProm.done((data) => {
                        // Po načtení typu pohledávky se nastaví dostupnost políček pro volbu druhu daně dle příznaku
                        let prom = this.element.findForms("zadaniDphForm").findFields("sazba").gradio("option");
                        this.dtoTypPhl = data.data;
                        if (this.dtoTypPhl.priz_dph_zakl != 1) {
                            this.zak = true;
                            prom.radios[0].disabled = true;
                        }
                        if (this.dtoTypPhl.priz_dph_sniz != 1) {
                            this.sniz = true;
                            prom.radios[1].disabled = true;
                        }
                        if (this.dtoTypPhl.priz_dph_sniz2 != 1) {
                            this.sniz2 = true;
                            prom.radios[2].disabled = true;
                        }
                        //<TEST>
                        //prom.radios[0].disabled = true;// this.zak;
                        //prom.radios[1].disabled = false;// this.sniz;
                        //prom.radios[2].disabled = true;// this.sniz2;
                        //</TEST>
                        that.findFields("sazba").gradio("destroy").gradio(prom).gfield("model", "apply", {});
                        //this.formLoaded++;
                        this.endOperation();
                    });
                    //---------------------------
                    //!-----Naplnění DTO objektu pro sazby DPH
                    this.beginOperation();
                    var DPH = that.isl.Predpisy.vratDPH()
                        .get();
                    DPH.done((data) => {
                        this.sazbyDPH = data.data;
                        that.zmenaSazby();
                        //this.formLoaded++;
                        this.endOperation();
                    });
                    //---------------------------
                    //this.formCreated = false;
                    that.createForm(); //####
                    //this.formCreated = true;
                    //---------------------------       
                }
                createForm() {
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "zadaniDphForm" })
                        .addRow("Dat.zdan.")
                        .addField("gdatebox", {
                        name: "dat_zdan",
                        initialValue: this.DatumZdaneni ?? new Date,
                        change: (ev, input) => {
                            //if(this.formLoaded == this.stepsCount)
                            that.zmenaSazby();
                        }
                    })
                        .addSection("Sazba")
                        .addField("gradio", {
                        name: "sazba",
                        itemClass: "w-4",
                        initialValue: 10,
                        radios: [
                            {
                                value: 10,
                                label: "Základní",
                                disabled: this.zak,
                            },
                            {
                                value: 20,
                                label: "Snížená",
                                disabled: this.sniz,
                            },
                            {
                                value: 30,
                                label: "2.Snížená",
                                disabled: this.sniz2,
                            },
                        ],
                        change: (ev, input) => {
                            //if (this.formLoaded == this.stepsCount)
                            that.zmenaSazby();
                        }
                    })
                        .addRow("")
                        .addField("gnumberbox", "w-2", Gordic.Prefabs.Number.currency(), {
                        name: "procentoDph",
                        disabled: true,
                        initialValue: 0,
                        change: () => {
                            //if (this.formLoaded == this.stepsCount)
                            this.vypocetCastky();
                        }
                    })
                        .addText("%", "w-2")
                        .addSection(" ")
                        .addRow("Částka")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "castka",
                        initialValue: this.Castka_K_Vypoctu ?? 0,
                        change: () => {
                            //if (this.formLoaded == this.stepsCount)
                            this.vypocetCastky();
                        }
                    })
                        .addField("gcheck", "w-4", {
                        name: "sDPH",
                        label: "Zadáno s DPH",
                        change: () => {
                            //if (this.formLoaded == this.stepsCount)
                            this.vypocetCastky();
                        }
                    })
                        .addField("gcheck", "w-4", {
                        name: "zaokr",
                        label: "Zaokrouhlit",
                        change: () => {
                            //if (this.formLoaded == this.stepsCount)
                            this.vypocetCastky();
                        }
                    })
                        .addSection(" ")
                        .addRow()
                        .addText("Základ", "w-4")
                        .addText("Daň", "w-4")
                        .addText("Zaokrouhlení", "w-4")
                        .addRow()
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "zaklad",
                        disabled: true,
                    })
                        //.addRow("Daň")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "dan",
                        disabled: true,
                    })
                        //.addRow("Zaokrouhlení")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "zao",
                        disabled: true,
                    });
                    var defaultForm = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    //this.actions.addRange({
                    //    actAkce: {
                    //        caption: "Akce",
                    //        icon: "gi-save",
                    //        run: function (ev, ctx) {
                    //            debugger;    
                    //        }
                    //    }
                    //});
                    //this.menuBar([
                    //    { action: this.actions.actAkce, favorite: true }
                    //]);
                }
                zmenaSazby() {
                    //debugger;
                    var here = this;
                    var form = here.findForms("zadaniDphForm");
                    var danTyp = form.findFields("sazba").gfield("getValue");
                    var rokDph = form.findFields("dat_zdan").gfield("getValue").getFullYear();
                    var mesicDph = form.findFields("dat_zdan").gfield("getValue").getMonth();
                    var hodnota = Decimal.add(Decimal.mul(rokDph, 100).d[0], mesicDph + 1).d[0];
                    var vysledek;
                    if (this.sazbyDPH.length === 0) {
                        return 1;
                    }
                    this.sazbyDPH.forEach(function (x) {
                        if (x.dan_typ === danTyp && x.rokmes_od <= hodnota.toString() && x.rokmes_do >= hodnota.toString()) {
                            vysledek = x.dan_proc;
                        }
                    });
                    form.findFields("procentoDph").gfield("setValue", vysledek);
                    //here.vypocetCastky()
                }
                /**
                 * Metodea pro výpočet
                 */
                vypocetCastky() {
                    //debugger;
                    var here = this;
                    var form = here.findForms("zadaniDphForm");
                    var dph = form.findFields("procentoDph").gfield("getValue");
                    var castka = form.findFields("castka").gfield("getValue");
                    var boolDph = form.findFields("sDPH").gfield("getValue");
                    var boolZao = form.findFields("zaokr").gfield("getValue");
                    var zaklad;
                    var dan;
                    var zao;
                    [dan, zaklad] = this.Vypocet_dph(castka, boolDph, dph, true);
                    if (boolZao) {
                        //pokud se má zaokrouhlovat
                        let soucetCelk = zaklad.plus(dan);
                        let soucetZaok = Decimal.round(soucetCelk);
                        zao = soucetZaok.minus(soucetCelk);
                        //zao = parseFloat(smt.tofixed(0)) - castka + dph
                    }
                    else {
                        zao = new Decimal(0);
                    }
                    //GDlg.alert(`Základ je ${zaklad}, daň je ${dan}, a zao je ${zao}`);
                    form.findFields("zaklad").gfield("setValue", zaklad);
                    form.findFields("dan").gfield("setValue", dan);
                    form.findFields("zao").gfield("setValue", zao);
                }
                /**
                 * Metoda pro výpočet DPH
                 * @param c_p - Zadaná částka
                 * @param b_vcetne_dph - Výpočet daně - při zadání částky s dph je TRUE)
                 * @param dph_proc_p - Hodnota daně
                 * @param b_new - Určtení způsobu výpočtu (true = nový)
                 */
                Vypocet_dph(c_p, b_vcetne_dph, dph_proc_p, b_new) {
                    //TODO b_new -> vytvořit metodu pro zjištění způsoby výpočtu dle Gupta fce "gf_ZpusobVypoctuDPH"
                    var that = this;
                    var c_dph_rp;
                    var c_bez_dph_rp;
                    var koef = new Decimal(0);
                    var zn = 1;
                    if (c_p.lt(0)) { // Otočení znaménka pro záporné hodnoty, ze zaporné hodnoty to dává odlišný výsledek          
                        zn = (-1);
                        c_p = c_p.mul(zn);
                    }
                    if (b_vcetne_dph) { // Výpočet daně při zadáni částky s DPH 
                        if (!b_new) {
                            koef = dph_proc_p.dividedBy(dph_proc_p.plus(100));
                            koef = koef.toDecimalPlaces(4); // Zaokrouhlení na 4 des. místa
                            c_dph_rp = c_p.mul(koef);
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p.mul(dph_proc_p.dividedBy(dph_proc_p.plus(100)));
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p.minus(c_dph_rp);
                    }
                    else {
                        // Výpočet daně při zadání částky bez DPH
                        if (b_new == false) {
                            koef = dph_proc_p.dividedBy(100);
                            c_dph_rp = c_p.mul(koef);
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p.mul(dph_proc_p.dividedBy(100));
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p;
                    }
                    c_dph_rp = c_dph_rp.mul(zn);
                    c_bez_dph_rp = c_bez_dph_rp.mul(zn);
                    return [c_dph_rp, c_bez_dph_rp];
                }
                /* Vypocet_dph - s datovým typem number
                private Vypocet_dph2(c_p: number | any, b_vcetne_dph: boolean, dph_proc_p: number, b_new: boolean) {
                    //TODO b_new -> vytvořit metodu pro zjištění způsoby výpočtu dle Gupta fce "gf_ZpusobVypoctuDPH"
                    var that = this;
                    var c_dph_rp: number;
                    var c_bez_dph_rp: number;
                    var koef: number = 0;
                    var zn: number = 1;
        
                    if (c_p < 0) { // Otočení znaménka pro záporné hodnoty, ze zaporné hodnoty to dává odlišný výsledek
                        zn = (-1);
                        c_p = c_p * zn;
                    }
        
                    if (b_vcetne_dph) {   // Výpočet daně při zadáni částky s DPH
                        if (!b_new) {
                            koef = dph_proc_p / (100 + dph_proc_p);
                            koef = parseFloat(koef.toFixed(4)); // Zaokrouhlení na 4 des. místa
                            c_dph_rp = (c_p * koef);
                            c_dph_rp = parseFloat(c_dph_rp.toFixed(2)); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p * dph_proc_p / (100 + dph_proc_p);
                            c_dph_rp = parseFloat(c_dph_rp.toFixed(2)); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p - c_dph_rp;
                    }
                    else {
                        // Výpočet daně při zadání částky bez DPH
                        if (b_new == false) {
                            koef = dph_proc_p / 100;
                            c_dph_rp = (c_p * koef);
                            c_dph_rp = parseFloat(c_dph_rp.toFixed(2)); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p * (dph_proc_p / 100);
                            c_dph_rp = parseFloat(c_dph_rp.toFixed(2)); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p;
                    }
        
                    c_dph_rp = c_dph_rp * zn;
                    c_bez_dph_rp = c_bez_dph_rp * zn;
        
                    return [c_dph_rp, c_bez_dph_rp]
                }
                */
                //#region OK a Close
                //cancel() {
                //    this.close();
                //}                     
                ok() {
                    let form = this.findForms("zadaniDphForm");
                    //debugger;
                    //let dto/*: Gordic.Ddp.Interface.LK.Isl.GDetailRozPripaduDto = this.model*/;
                    //this.element.findForms("detailRozhodnuti").findFields().gfield("model", "collect", dto);
                    //let req = rq => {
                    //    return {
                    //        rq: { Data: dto }
                    //    };
                    //};
                    //let task/* = that.isl.DetailRozPripadu.ulozRozhodnuti(req)*/;
                    //Common.Base.ProcessResponse(task.get(), this, true);
                    //if (!this.readOnly && !this.editMode) {
                    //    let f = this.formSkupinaVymahani.findFields("ixs_skv");
                    //    f.gfield("setInitial", null);
                    //    f.gfield("model", "apply", { ixs_skv: this.ixs_skv }, { initialValues: false });
                    //}
                    //this.save()
                    //    .done(() => {
                    //        this.close();
                    //    });
                    //var zaklad = form.findFields("zaklad").gfield("getValue");
                    //var dan = form.findFields("dan").gfield("getValue");
                    //var zao = form.findFields("zao").gfield("getValue");
                    var ret = {
                        sazba: form.findFields("sazba").gfield("getValue"), // op_dan_typ     // Sazba - typ daně (10,20,30,40)
                        castka: form.findFields("castka").gfield("getValue"), // op_c           // Celková částka
                        zaklad: form.findFields("zaklad").gfield("getValue"), // op_c_bez_dph   // Základ
                        dan: form.findFields("dan").gfield("getValue"), // op_c_dph       // Daň
                        zao: form.findFields("zao").gfield("getValue"), // op_c_zao       // Zaokrouhlení
                        datZdan: form.findFields("dat_zdan").gfield("getValue"), // l_dat_zdan     // Zaokrouhlení
                    };
                    this.close(ret);
                }
            };
            GZadaniDph = __decorate([
                Decorators.gcontent
            ], GZadaniDph);
            WebClient.GZadaniDph = GZadaniDph;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1phZGFuaURwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdaYWRhbmlEcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDBDQUEwQztBQUMxQyw2QkFBNkI7QUFDN0IsSUFBVSxNQUFNLENBaWRmO0FBamRELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWlkbkI7SUFqZGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlkN0I7UUFqZG9CLFdBQUEsU0FBUztZQUUxQixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFXLFNBQVEsT0FBQSxZQUFZO2dCQUE1Qzs7b0JBT0ksNkJBQTZCO29CQUNyQixhQUFRLEdBQThDLEVBQUUsQ0FBQztvQkFDekQsZUFBVSxHQUE0QyxFQUFFLENBQUM7b0JBQ3pELGNBQVMsR0FBMkMsRUFBRSxDQUFDO29CQUN2RCxjQUFTLEdBQWtELEVBQUUsQ0FBQztvQkFNdEUsUUFBRyxHQUFZLEtBQUssQ0FBQztvQkFDckIsU0FBSSxHQUFZLEtBQUssQ0FBQztvQkFDdEIsVUFBSyxHQUFZLEtBQUssQ0FBQztvQkF3YnZCLFdBQVc7Z0JBR2YsQ0FBQztnQkF6YkcsK0JBQStCO2dCQUMvQix5QkFBeUI7Z0JBQ3pCLHlCQUF5QjtnQkFDekIsNkJBQTZCO2dCQUM3QixjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDdkUsNkJBQTZCO29CQUN6Qix5QkFBeUI7b0JBRXpCLHdCQUF3QjtvQkFD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QUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBTyxVQUFVLENBQUMsRUFBSSxpQ0FBaUM7cUJBQ3JHLENBQUE7b0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbkIsQ0FBQzthQUlKLENBQUE7WUE5Y1ksVUFBVTtnQkFEdEIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxVQUFVLENBOGN0QjtZQTljWSxvQkFBVSxhQThjdEIsQ0FBQTtRQUNMLENBQUMsRUFqZG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlkN0I7SUFBRCxDQUFDLEVBamRnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpZG5CO0FBQUQsQ0FBQyxFQWpkUyxNQUFNLEtBQU4sTUFBTSxRQWlkZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HWmFkYW5pRHBoLnRzICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwcm8gemFkw6Fuw60gYSB2w71wb8SNZXQgRFBIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIyICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjItMTAtMTcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gVE9ETzogICAgT2tubyBuZWpkZSB6YXbFmcOtdFxyXG4vLyAgICAgICAgICBOYXN0YXZpdCBhYnkgb2tubyB2cmFjZWxvIGRhdGFcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1phZGFuaURwaCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBSYWRla191aHI6IG51bWJlcjtcclxuICAgICAgICBUeXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgRGF0dW1aZGFuZW5pOiBhbnk7XHJcbiAgICAgICAgQ2FzdGthX0tfVnlwb2N0dTogYW55O1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcHJpdmF0ZSBzYXpieURQSDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdFa29jZGFwRHRvW10gPSBbXTtcclxuICAgICAgICBwcml2YXRlIGR0b1ByZWRwaXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0byA9IHt9O1xyXG4gICAgICAgIHByaXZhdGUgZHRvUHJpcGFkOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0byA9IHt9O1xyXG4gICAgICAgIHByaXZhdGUgZHRvVHlwUGhsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8gPSB7fTtcclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG4gICAgICAgIHVjczogc3RyaW5nO1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG5cclxuICAgICAgICB6YWs6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBzbml6OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgc25pejI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9mb3JtQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vZm9ybUxvYWRlZDogbnVtYmVyID0gMDtcclxuICAgICAgICAvL3N0ZXBzQ291bnQ6IG51bWJlciA9IDM7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKVxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBOYcSNdGVuw60gcMWZw61wYWR1XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgLy90aGF0LmlzbC5QcmlwYWQucmVhZChycSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBkYXRhOiB7IGl4cDogdGhpcy5JeHAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZyYWdtZW50czogW1wiKlwiXVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLy8gICAgLmdldCgpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZHRvUHJpcGFkID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9lbmRyZWdpb25cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyEtLS0tLU5hxI10ZW7DrSDDumRhasWvIG8gcMWZZWRwaXN1ICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5SYWRla191aHIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcmVkcGlzUHJvbSA9IHRoYXQuaXNsLlByZWRwaXN5LnJlYWQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgaXhwOiB0aGlzLkl4cCwgcmFkZWtfdWhyOiB0aGlzLlJhZGVrX3VociB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIkRlZmF1bHRcIiwgXCJFeHRlbmRlZFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgcHJlZHBpc1Byb20uZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXN0a2EsIGRhdHVtO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kdG9QcmVkcGlzID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5DYXN0a2FfS19WeXBvY3R1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEuYykgeyBjYXN0a2EgPSBkYXRhLmRhdGEuYyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgY2FzdGthID0gdGhpcy5DYXN0a2FfS19WeXBvY3R1IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkRhdHVtWmRhbmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLmRhdF96ZGFuKSB7IGRhdHVtID0gZGF0YS5kYXRhLmRhdF96ZGFuIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXR1bSA9IHRoaXMuRGF0dW1aZGFuZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5EYXR1bVpkYW5lbmkgPSBkYXRhLmRhdGEuZGF0X3pkYW4gPz8gbmV3IERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiemFkYW5pRHBoRm9ybVwiKS5maW5kRmllbGRzKFwiY2FzdGthXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNhc3RrYSA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiemFkYW5pRHBoRm9ybVwiKS5maW5kRmllbGRzKFwiZGF0X3pkYW5cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0dW0gPz8gbmV3IERhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZm9ybUxvYWRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vIS0tLS0tTmHEjXRlbsOtIMO6ZGFqxa8gbyB0eXB1IHBvaGxlZMOhdmt5IChwxZnDrXpuYWt5IHDFmcOtcGFkdSlcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgdHlwUGhsUHJvbSA9IHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kucmVhZChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhpcy5UeXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXN0YXZlbmk6IHRoaXMudWNzID09IG51bGwgPyB1bmRlZmluZWQgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoaXMucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGlzLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5pY29cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCIqXCIsIFwiTmFzdGF2ZW5pLipcIl1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICB0eXBQaGxQcm9tLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFBvIG5hxI10ZW7DrSB0eXB1IHBvaGxlZMOhdmt5IHNlIG5hc3RhdsOtIGRvc3R1cG5vc3QgcG9sw63EjWVrIHBybyB2b2xidSBkcnVodSBkYW7EmyBkbGUgcMWZw616bmFrdVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb20gPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiemFkYW5pRHBoRm9ybVwiKS5maW5kRmllbGRzKFwic2F6YmFcIikuZ3JhZGlvKFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kdG9UeXBQaGwgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0b1R5cFBobC5wcml6X2RwaF96YWtsICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbS5yYWRpb3NbMF0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHRvVHlwUGhsLnByaXpfZHBoX3NuaXogIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc25peiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbS5yYWRpb3NbMV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHRvVHlwUGhsLnByaXpfZHBoX3NuaXoyICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNuaXoyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9tLnJhZGlvc1syXS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLzxURVNUPlxyXG4gICAgICAgICAgICAgICAgLy9wcm9tLnJhZGlvc1swXS5kaXNhYmxlZCA9IHRydWU7Ly8gdGhpcy56YWs7XHJcbiAgICAgICAgICAgICAgICAvL3Byb20ucmFkaW9zWzFdLmRpc2FibGVkID0gZmFsc2U7Ly8gdGhpcy5zbml6O1xyXG4gICAgICAgICAgICAgICAgLy9wcm9tLnJhZGlvc1syXS5kaXNhYmxlZCA9IHRydWU7Ly8gdGhpcy5zbml6MjtcclxuICAgICAgICAgICAgICAgIC8vPC9URVNUPlxyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwic2F6YmFcIikuZ3JhZGlvKFwiZGVzdHJveVwiKS5ncmFkaW8ocHJvbSkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmZvcm1Mb2FkZWQrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8hLS0tLS1OYXBsbsSbbsOtIERUTyBvYmpla3R1IHBybyBzYXpieSBEUEhcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgRFBIID0gdGhhdC5pc2wuUHJlZHBpc3kudnJhdERQSCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIERQSC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhemJ5RFBIID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhhdC56bWVuYVNhemJ5KClcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZm9ybUxvYWRlZCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvL3RoaXMuZm9ybUNyZWF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7Ly8jIyMjXHJcbiAgICAgICAgICAgIC8vdGhpcy5mb3JtQ3JlYXRlZCA9IHRydWU7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ6YWRhbmlEcGhGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXQuemRhbi5cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96ZGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLkRhdHVtWmRhbmVuaSA/PyBuZXcgRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZih0aGlzLmZvcm1Mb2FkZWQgPT0gdGhpcy5zdGVwc0NvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYVNhemJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiU2F6YmFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYXpiYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJaw6FrbGFkbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy56YWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNuw63FvmVuw6FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNuaXosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIjIuU27DrcW+ZW7DoVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNuaXoyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMuZm9ybUxvYWRlZCA9PSB0aGlzLnN0ZXBzQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hU2F6YnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlwiKSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2NlbnRvRHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGlzLmZvcm1Mb2FkZWQgPT0gdGhpcy5zdGVwc0NvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52eXBvY2V0Q2FzdGt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiJVwiLCBcInctMlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiIFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5DYXN0a2FfS19WeXBvY3R1ID8/IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMuZm9ybUxvYWRlZCA9PSB0aGlzLnN0ZXBzQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5cG9jZXRDYXN0a3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJaYWTDoW5vIHMgRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMuZm9ybUxvYWRlZCA9PSB0aGlzLnN0ZXBzQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5cG9jZXRDYXN0a3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInphb2tyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWmFva3JvdWhsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhpcy5mb3JtTG9hZGVkID09IHRoaXMuc3RlcHNDb3VudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudnlwb2NldENhc3RreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiWsOha2xhZFwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYcWIXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlphb2tyb3VobGVuw61cIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YWtsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJEYcWIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIlphb2tyb3VobGVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemFvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgIC8vICAgIGFjdEFrY2U6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiQWtjZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVidWdnZXI7ICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RBa2NlLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIC8vXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHptZW5hU2F6YnkoKSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHZhciBoZXJlID0gdGhpczsgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gaGVyZS5maW5kRm9ybXMoXCJ6YWRhbmlEcGhGb3JtXCIpO1xyXG4gICAgICAgICAgICB2YXIgZGFuVHlwID0gZm9ybS5maW5kRmllbGRzKFwic2F6YmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciByb2tEcGggPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfemRhblwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB2YXIgbWVzaWNEcGggPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfemRhblwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKS5nZXRNb250aCgpO1xyXG4gICAgICAgICAgICB2YXIgaG9kbm90YSA9IERlY2ltYWwuYWRkKERlY2ltYWwubXVsKHJva0RwaCwgMTAwKS5kWzBdLCBtZXNpY0RwaCArIDEpLmRbMF07XHJcbiAgICAgICAgICAgIHZhciB2eXNsZWRlaztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhemJ5RFBILmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gMTsgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zYXpieURQSC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeC5kYW5fdHlwID09PSBkYW5UeXAgJiYgeC5yb2ttZXNfb2QhIDw9IGhvZG5vdGEudG9TdHJpbmcoKSAmJiB4LnJva21lc19kbyEgPj0gaG9kbm90YS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdnlzbGVkZWsgPSB4LmRhbl9wcm9jO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInByb2NlbnRvRHBoXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHZ5c2xlZGVrKTtcclxuICAgICAgICAgICAgLy9oZXJlLnZ5cG9jZXRDYXN0a3koKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RlYSBwcm8gdsO9cG/EjWV0IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdnlwb2NldENhc3RreSgpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdmFyIGhlcmUgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IGhlcmUuZmluZEZvcm1zKFwiemFkYW5pRHBoRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIGRwaCA9IGZvcm0uZmluZEZpZWxkcyhcInByb2NlbnRvRHBoXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY2FzdGthID0gZm9ybS5maW5kRmllbGRzKFwiY2FzdGthXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJvb2xEcGggPSBmb3JtLmZpbmRGaWVsZHMoXCJzRFBIXCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcbiAgICAgICAgICAgIHZhciBib29sWmFvID0gZm9ybS5maW5kRmllbGRzKFwiemFva3JcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuXHJcbiAgICAgICAgICAgIHZhciB6YWtsYWQ6IERlY2ltYWw7XHJcbiAgICAgICAgICAgIHZhciBkYW46IERlY2ltYWw7XHJcbiAgICAgICAgICAgIHZhciB6YW86IERlY2ltYWw7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgW2RhbiwgemFrbGFkXSA9IHRoaXMuVnlwb2NldF9kcGgoY2FzdGthLCBib29sRHBoLCBkcGgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJvb2xaYW8pIHtcclxuICAgICAgICAgICAgICAgIC8vcG9rdWQgc2UgbcOhIHphb2tyb3VobG92YXRcclxuICAgICAgICAgICAgICAgIGxldCBzb3VjZXRDZWxrID0gemFrbGFkLnBsdXMoZGFuKTtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VjZXRaYW9rID0gRGVjaW1hbC5yb3VuZChzb3VjZXRDZWxrKTtcclxuICAgICAgICAgICAgICAgIHphbyA9IHNvdWNldFphb2subWludXMoc291Y2V0Q2VsaylcclxuICAgICAgICAgICAgICAgIC8vemFvID0gcGFyc2VGbG9hdChzbXQudG9maXhlZCgwKSkgLSBjYXN0a2EgKyBkcGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHphbyA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vR0RsZy5hbGVydChgWsOha2xhZCBqZSAke3pha2xhZH0sIGRhxYggamUgJHtkYW59LCBhIHphbyBqZSAke3phb31gKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiemFrbGFkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHpha2xhZCk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhblwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYW4pO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ6YW9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgemFvKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2w71wb8SNZXQgRFBIXHJcbiAgICAgICAgICogQHBhcmFtIGNfcCAtIFphZGFuw6EgxI3DoXN0a2FcclxuICAgICAgICAgKiBAcGFyYW0gYl92Y2V0bmVfZHBoIC0gVsO9cG/EjWV0IGRhbsSbIC0gcMWZaSB6YWTDoW7DrSDEjcOhc3RreSBzIGRwaCBqZSBUUlVFKVxyXG4gICAgICAgICAqIEBwYXJhbSBkcGhfcHJvY19wIC0gSG9kbm90YSBkYW7EmyBcclxuICAgICAgICAgKiBAcGFyYW0gYl9uZXcgLSBVcsSNdGVuw60genDFr3NvYnUgdsO9cG/EjXR1ICh0cnVlID0gbm92w70pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBWeXBvY2V0X2RwaChjX3A6IERlY2ltYWwgLCBiX3ZjZXRuZV9kcGg6IGJvb2xlYW4sIGRwaF9wcm9jX3A6IERlY2ltYWwsIGJfbmV3OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETyBiX25ldyAtPiB2eXR2b8WZaXQgbWV0b2R1IHBybyB6amnFoXTEm27DrSB6cMWvc29ieSB2w71wb8SNdHUgZGxlIEd1cHRhIGZjZSBcImdmX1pwdXNvYlZ5cG9jdHVEUEhcIlxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjX2RwaF9ycDogRGVjaW1hbDtcclxuICAgICAgICAgICAgdmFyIGNfYmV6X2RwaF9ycDogRGVjaW1hbDtcclxuICAgICAgICAgICAgdmFyIGtvZWY6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgdmFyIHpuOiBudW1iZXIgPSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNfcC5sdCgwKSkgeyAvLyBPdG/EjWVuw60gem5hbcOpbmthIHBybyB6w6Fwb3Juw6kgaG9kbm90eSwgemUgemFwb3Juw6kgaG9kbm90eSB0byBkw6F2w6Egb2RsacWhbsO9IHbDvXNsZWRlayAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHpuID0gKC0xKTtcclxuICAgICAgICAgICAgICAgIGNfcCA9IGNfcC5tdWwoem4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYl92Y2V0bmVfZHBoKSB7ICAgLy8gVsO9cG/EjWV0IGRhbsSbIHDFmWkgemFkw6FuaSDEjcOhc3RreSBzIERQSCBcclxuICAgICAgICAgICAgICAgIGlmICghYl9uZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICBrb2VmID0gZHBoX3Byb2NfcC5kaXZpZGVkQnkoZHBoX3Byb2NfcC5wbHVzKDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtvZWYgPSBrb2VmLnRvRGVjaW1hbFBsYWNlcyg0KSAvLyBaYW9rcm91aGxlbsOtIG5hIDQgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfcC5tdWwoa29lZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX3AubXVsKGRwaF9wcm9jX3AuZGl2aWRlZEJ5KGRwaF9wcm9jX3AucGx1cygxMDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gxIzDoXN0a2EgYmV6IERQSFxyXG4gICAgICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19wLm1pbnVzKGNfZHBoX3JwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFbDvXBvxI1ldCBkYW7EmyBwxZlpIHphZMOhbsOtIMSNw6FzdGt5IGJleiBEUEhcclxuICAgICAgICAgICAgICAgIGlmIChiX25ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtvZWYgPSBkcGhfcHJvY19wLmRpdmlkZWRCeSgxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChrb2VmKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfZHBoX3JwLnRvRGVjaW1hbFBsYWNlcygyKTsgLy8gWmFva3JvdWhsZW7DrSBuYSAyIGRlcy4gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfcC5tdWwoZHBoX3Byb2NfcC5kaXZpZGVkQnkoMTAwKSkgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gxIzDoXN0a2EgYmV6IERQSFxyXG4gICAgICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjX2RwaF9ycCA9IGNfZHBoX3JwLm11bCh6bik7XHJcbiAgICAgICAgICAgIGNfYmV6X2RwaF9ycCA9IGNfYmV6X2RwaF9ycC5tdWwoem4pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFtjX2RwaF9ycCwgY19iZXpfZHBoX3JwXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogVnlwb2NldF9kcGggLSBzIGRhdG92w71tIHR5cGVtIG51bWJlclxyXG4gICAgICAgIHByaXZhdGUgVnlwb2NldF9kcGgyKGNfcDogbnVtYmVyIHwgYW55LCBiX3ZjZXRuZV9kcGg6IGJvb2xlYW4sIGRwaF9wcm9jX3A6IG51bWJlciwgYl9uZXc6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy9UT0RPIGJfbmV3IC0+IHZ5dHZvxZlpdCBtZXRvZHUgcHJvIHpqacWhdMSbbsOtIHpwxa9zb2J5IHbDvXBvxI10dSBkbGUgR3VwdGEgZmNlIFwiZ2ZfWnB1c29iVnlwb2N0dURQSFwiXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNfZHBoX3JwOiBudW1iZXI7XHJcbiAgICAgICAgICAgIHZhciBjX2Jlel9kcGhfcnA6IG51bWJlcjtcclxuICAgICAgICAgICAgdmFyIGtvZWY6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIHZhciB6bjogbnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjX3AgPCAwKSB7IC8vIE90b8SNZW7DrSB6bmFtw6lua2EgcHJvIHrDoXBvcm7DqSBob2Rub3R5LCB6ZSB6YXBvcm7DqSBob2Rub3R5IHRvIGTDoXbDoSBvZGxpxaFuw70gdsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICB6biA9ICgtMSk7XHJcbiAgICAgICAgICAgICAgICBjX3AgPSBjX3AgKiB6bjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJfdmNldG5lX2RwaCkgeyAgIC8vIFbDvXBvxI1ldCBkYW7EmyBwxZlpIHphZMOhbmkgxI3DoXN0a3kgcyBEUEggXHJcbiAgICAgICAgICAgICAgICBpZiAoIWJfbmV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAga29lZiA9IGRwaF9wcm9jX3AgLyAoMTAwICsgZHBoX3Byb2NfcCk7XHJcbiAgICAgICAgICAgICAgICAgICAga29lZiA9IHBhcnNlRmxvYXQoa29lZi50b0ZpeGVkKDQpKTsgLy8gWmFva3JvdWhsZW7DrSBuYSA0IGRlcy4gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSAoY19wICoga29lZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBwYXJzZUZsb2F0KGNfZHBoX3JwLnRvRml4ZWQoMikpOyAvLyBaYW9rcm91aGxlbsOtIG5hIDIgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wICogZHBoX3Byb2NfcCAvICgxMDAgKyBkcGhfcHJvY19wKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IHBhcnNlRmxvYXQoY19kcGhfcnAudG9GaXhlZCgyKSk7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gxIzDoXN0a2EgYmV6IERQSFxyXG4gICAgICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19wIC0gY19kcGhfcnA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBWw71wb8SNZXQgZGFuxJsgcMWZaSB6YWTDoW7DrSDEjcOhc3RreSBiZXogRFBIXHJcbiAgICAgICAgICAgICAgICBpZiAoYl9uZXcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBrb2VmID0gZHBoX3Byb2NfcCAvIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IChjX3AgKiBrb2VmKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IHBhcnNlRmxvYXQoY19kcGhfcnAudG9GaXhlZCgyKSk7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX3AgKiAoZHBoX3Byb2NfcCAvIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBwYXJzZUZsb2F0KGNfZHBoX3JwLnRvRml4ZWQoMikpOyAvLyBaYW9rcm91aGxlbsOtIG5hIDIgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIMSMw6FzdGthIGJleiBEUEhcclxuICAgICAgICAgICAgICAgIGNfYmV6X2RwaF9ycCA9IGNfcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycCAqIHpuO1xyXG4gICAgICAgICAgICBjX2Jlel9kcGhfcnAgPSBjX2Jlel9kcGhfcnAgKiB6bjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbY19kcGhfcnAsIGNfYmV6X2RwaF9ycF1cclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvLyNyZWdpb24gT0sgYSBDbG9zZVxyXG4gICAgICAgIC8vY2FuY2VsKCkge1xyXG4gICAgICAgIC8vICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAvL30gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInphZGFuaURwaEZvcm1cIik7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vbGV0IGR0by8qOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0RldGFpbFJvelByaXBhZHVEdG8gPSB0aGlzLm1vZGVsKi87XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImRldGFpbFJvemhvZG51dGlcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvL2xldCByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBycTogeyBEYXRhOiBkdG8gfVxyXG4gICAgICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgICAgICAvL307XHJcbiAgICAgICAgICAgIC8vbGV0IHRhc2svKiA9IHRoYXQuaXNsLkRldGFpbFJvelByaXBhZHUudWxvelJvemhvZG51dGkocmVxKSovO1xyXG4gICAgICAgICAgICAvL0NvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZSh0YXNrLmdldCgpLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgLy9pZiAoIXRoaXMucmVhZE9ubHkgJiYgIXRoaXMuZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgLy8gICAgbGV0IGYgPSB0aGlzLmZvcm1Ta3VwaW5hVnltYWhhbmkuZmluZEZpZWxkcyhcIml4c19za3ZcIik7XHJcbiAgICAgICAgICAgIC8vICAgIGYuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBudWxsKTtcclxuICAgICAgICAgICAgLy8gICAgZi5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhzX3NrdjogdGhpcy5peHNfc2t2IH0sIHsgaW5pdGlhbFZhbHVlczogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL3RoaXMuc2F2ZSgpXHJcbiAgICAgICAgICAgIC8vICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB6YWtsYWQgPSBmb3JtLmZpbmRGaWVsZHMoXCJ6YWtsYWRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGRhbiA9IGZvcm0uZmluZEZpZWxkcyhcImRhblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy92YXIgemFvID0gZm9ybS5maW5kRmllbGRzKFwiemFvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJldCA9IHsgLy8gMTAgLSB6w6FrbGFkbsOtIHNhemJhIERQSCAvLyAyMCAtIHNuw63FvmVuw6Egc2F6YmEgRFBIIC8vIDMwIC0gMi5zbsOtxb5lbsOhIHNhemJhIERQSCAvLyA0MCAtIDMuc27DrcW+ZW7DoSBzYXpiYSBEUEggXHJcbiAgICAgICAgICAgICAgICBzYXpiYTogZm9ybS5maW5kRmllbGRzKFwic2F6YmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksICAgICAgICAgICAgICAvLyBvcF9kYW5fdHlwICAgICAvLyBTYXpiYSAtIHR5cCBkYW7EmyAoMTAsMjAsMzAsNDApXHJcbiAgICAgICAgICAgICAgICBjYXN0a2E6IGZvcm0uZmluZEZpZWxkcyhcImNhc3RrYVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKSwgICAvLyBvcF9jICAgICAgICAgICAvLyBDZWxrb3bDoSDEjcOhc3RrYVxyXG4gICAgICAgICAgICAgICAgemFrbGFkOiBmb3JtLmZpbmRGaWVsZHMoXCJ6YWtsYWRcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIiksICAgLy8gb3BfY19iZXpfZHBoICAgLy8gWsOha2xhZFxyXG4gICAgICAgICAgICAgICAgZGFuOiBmb3JtLmZpbmRGaWVsZHMoXCJkYW5cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIiksICAgICAgICAgLy8gb3BfY19kcGggICAgICAgLy8gRGHFiFxyXG4gICAgICAgICAgICAgICAgemFvOiBmb3JtLmZpbmRGaWVsZHMoXCJ6YW9cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIiksICAgICAgICAgLy8gb3BfY196YW8gICAgICAgLy8gWmFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgZGF0WmRhbjogZm9ybS5maW5kRmllbGRzKFwiZGF0X3pkYW5cIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIiksICAgLy8gbF9kYXRfemRhbiAgICAgLy8gWmFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UocmV0KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2VuZFJlZ2lvblxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=