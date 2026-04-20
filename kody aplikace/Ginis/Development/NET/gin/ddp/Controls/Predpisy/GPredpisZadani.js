"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPredpisZadani.ts                      </Name>
//    <Description> Okno zadání předpisu                                        </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-05-13                                                  </Created>
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
            let GPredpisZadani = class GPredpisZadani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.data = {};
                }
                onContentReady() {
                    const that = this;
                    that.beginOperation({ id: "PrevDluh04", text: "Připravuju okno pro zadání předpisu..." });
                    //that.title = `Předpis`;
                    that.createActions();
                    that.setBreadcrumbs([{
                            caption: that.title ?? "Zadání předpisu",
                            action: that.actions["actGPredpisZavritPotomky"]
                        }]);
                    that.createCommandBar();
                    that.createForm();
                    that.setInitialValue();
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                    that.endOperation({ id: "PrevDluh04" });
                }
                /**
                 * Metoda pro nastavení vstupních hodnot
                 * @method setInitialValue()
                 */
                setInitialValue() {
                    const that = this;
                    const form = this.element.findForms();
                    form.findFields("c").gfield("setValue", that.l_c ?? new Decimal(0));
                    form.findFields("dat_vzniku").gfield("setValue", that.l_dat_vzn ?? new Date());
                    form.findFields("dat_spl").gfield("setValue", that.l_dat_spl ?? new Date());
                    form.findFields("poznamka").gfield("setValue", that.l_poznamka ?? "");
                    form.findFields("popis").gfield("setValue", that.l_popis ?? "");
                    form.findFields("ktg_upo").gfield("model", "apply", { ktg_upo: that.l_ktg_upo ?? 100 });
                    form.findFields("c_dluh").gfield("setValue", that.c_dluh ?? false);
                    form.findFields("c_preplatek").gfield("setValue", that.c_preplatek ?? false);
                    form.findFields("c_platby_vse").gfield("setValue", that.c_platby_vse ?? false);
                    form.findFields("c_vlastni").gfield("setValue", that.c_vlastni ?? false);
                    //TOOD: 
                    //form.findFields("lhu_ixs_lhu").gfield("setValue", that.lhu_ixs_lhu); 
                    //form.findFields("lhu_typ_uko").gfield("setValue", that.lhu_typ_uko); 
                    //form.findFields("lhu_dat_od").gfield("setValue", that.lhu_dat_od); 
                    //form.findFields("lhu_dat_do").gfield("setValue", that.lhu_dat_do); 
                    //form.findFields("lhu_ixp_dok").gfield("setValue", that.lhu_ixp_dok); 
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 */
                createForm() {
                    const that = this;
                    var form = new Gordic.Forms.Form()
                        .addSection("Předpis")
                        .addRow({ label: "Částka předpisu", required: true }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c",
                        disabled: !that.e_c,
                        defaultValue: new Decimal(0),
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow({ label: "Datum vzniku", required: true }).addField("gdatebox", {
                        name: "dat_vzniku",
                        disabled: !that.e_dat_vzn,
                        defaultValue: new Date(),
                        validators: [new Gordic.Validators.Required(), new Gordic.Validators.Base({
                                validate: function (MyValue, source) {
                                    if (MyValue <= new Date(that.Dat_Uzav)) {
                                        this.errorType = "error";
                                        this.message = 'Datum vzniku nesmí být v uzavřeném období!';
                                        this.stopping = true; // evidence bude zakázána
                                        return false;
                                    }
                                    return true;
                                }
                            })]
                    })
                        .addRow({ label: "Datum splatnosti", required: true }).addField("gdatebox", {
                        name: "dat_spl",
                        disabled: !that.e_dat_spl,
                        defaultValue: new Date(),
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow().addField("gcheck", { name: "c_dluh", label: "Výši předpisu určit dle DLUHU k datu splatnosti",
                        disabled: !that.e_cdluh,
                        change: function (ev, input) {
                            that.changeCB(input.value, "c_dluh");
                        } })
                        .addRow().addField("gcheck", { name: "c_preplatek", label: "Výši předpisu určit dle PŘEPLATKU k datu splatnosti",
                        disabled: !that.e_cpreplatek,
                        change: function (ev, input) {
                            that.changeCB(input.value, "c_preplatek");
                        }
                    })
                        .addRow().addField("gcheck", { name: "c_platby_vse", disabled: (that.e_cpreplatek || that.e_cdluh), label: "Započíst všechny platby (bez ohledu na datum úhrady)" })
                        .addRow({ label: "Poznámka", required: true }).addField("gstringbox", { name: "poznamka", disabled: !that.e_poznamka, })
                        .addRow({ label: "Popis", required: true }).addField("gstringbox", { name: "popis", disabled: !that.e_popis, })
                        .addRow({ label: "Kategorie pohybu", required: true }).addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", disabled: !that.e_ktg_upo, model: "model.ktg_upo=value.ktg_upo", serverFilters: {
                            bez_nula_upo: 1,
                            ktg_upo: {
                                o: "<",
                                v: 200
                            }
                        },
                        itemTemplate: "{ktg_upo} - {ktg_upo_txt:trim:encode}"
                    })
                        .addRow().addField("gcheck", { name: "c_vlastni", disabled: !that.e_c_vlastni, label: "Pouze vlastní případy" });
                    //.addSection("Vlastní lhůta")
                    //.addRow("Lhůta")
                    //.addField("gselectbox", Gordic.Prefabs.Select.ddpLhuta2(), { name: "ixs_lhu", initialValue: { ixs_lhu: "0" }, model: "model.ixs_lhu = value.ixs_lhu",
                    //    //validators: [new Gordic.Validators.Required()]
                    //})
                    //.addRow("Úkon")
                    //.addField("gselectbox", Common.Prefabs.typUkonu(), {
                    //    //validators: [new Gordic.Validators.Required()],
                    //    change: function (ev, input) {
                    //        let typUko = input.value?.typ_uko;
                    //        if (typUko == 20 || typUko == 30) {
                    //            $(this).gform().findFields("dat_do").gfield("option", "disabled", true);
                    //            $(this).gform().findFields("dat_do").gfield("option", "flag", "");
                    //            $(this).gform().findFields("dat_do").gfield("setValidators", []);
                    //            $(this).gform().findFields("dat_do").gfield("setValue", null);
                    //        } else {
                    //            $(this).gform().findFields("dat_do").gfield("option", "disabled", false);
                    //            $(this).gform().findFields("dat_do").gfield("option", "flag", "required");
                    //            //$(this).gform().findFields("dat_do").gfield("setValidators", [new Gordic.Validators.Required()]);
                    //        }
                    //    }
                    //})
                    //.addRow("Dokument")
                    //.addField("gstringbox", {
                    //    name: "dokument", // Dokument
                    //    disabled: true,
                    //    change: function (ev, input) { }
                    //})
                    //.addRow("Datum od-do")
                    //.addField("gdatebox", "w-6", {
                    //    name: "dat_od", // Datum Od
                    //    disabled: false,
                    //    flag: "required", //validators: [new Gordic.Validators.Required()],
                    //    change: function (ev, input) { }
                    //})
                    //.addField("gdatebox", "w-6", {
                    //    name: "dat_do", // Datum Do
                    //    disabled: false,
                    //    flag: "required", //validators: [new Gordic.Validators.Required()],
                    //    change: function (ev, input) { }
                    //})
                    this.defaultForm = $.newDiv().appendTo(this.element).gform("createFrom", form);
                    this.defaultForm.findFields().gfield("model", "validators", this.validators);
                }
                changeCB(input, from) {
                    const that = this;
                    const form = this.element.findForms();
                    const fCastka = form.findFields("c");
                    const fPreplatek = form.findFields("c_preplatek");
                    const fDluh = form.findFields("c_dluh");
                    const fPlatbyVse = form.findFields("c_platby_vse");
                    let vPreplatek = fPreplatek.gfield("getValue");
                    let vDluh = fDluh.gfield("getValue");
                    if (input == true) {
                        fCastka.gfield("setValue", new Decimal(0));
                        fCastka.gfield("option", "disabled", true);
                        if (from == "c_dluh") {
                            fPreplatek.gfield("setValue", false);
                        }
                        else {
                            fDluh.gfield("setValue", false);
                        }
                    }
                    else {
                        if (that.e_c)
                            fCastka.gfield("option", "disabled", false);
                    }
                    if (vPreplatek || vDluh) {
                        fPlatbyVse.gfield("option", "disabled", false);
                    }
                    else {
                        fPlatbyVse.gfield("setValue", false);
                        fPlatbyVse.gfield("option", "disabled", true);
                    }
                }
                /**
                 * Vytvoří tlačítko nad seznamem kontrol
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([{
                            name: "actGOpravnyPredpisZavritPotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        }]);
                }
                //#region S E S T A V E N Í   O K N A 
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok();
                                //that.ulozit().done(() => { that.close(); }) // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                ok() {
                    const that = this;
                    if (!that.defaultForm.gform("isValid"))
                        return;
                    else {
                        that.beginOperation({ id: "PrevDluh05", text: "Připravuju data pro uložení předpisu..." });
                        let data = { ixp: that.Ixp };
                        that.defaultForm.findFields().gfield("model", "collect", data);
                        if (data.c == 0 && !(data.c_dluh || data.c_preplatek)) {
                            that.endOperation({ id: "PrevDluh05" });
                            that.dialogs.confirm("Upozornění", "Opravdu chcete generovat předpisy s nulovou částkou?")
                                .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    //TODO: continue
                                    that.ulozeniPredpisu(data);
                                }
                                else {
                                    that.element.findForms().findFields("c").gfield('focus');
                                    return;
                                }
                            });
                        }
                        else {
                            that.endOperation({ id: "PrevDluh05" });
                            that.ulozeniPredpisu(data);
                        }
                    }
                }
                ulozeniPredpisu(dtoOkna) {
                    const that = this;
                    that.beginOperation({ id: "PrevDluh06", text: "Probíhá uložení předpisu..." });
                    ////////////////////////////////////////////////////////////////////////
                    that.data.ixp = dtoOkna.ixp; // Nastavím identifikátor případu
                    that.data.c = dtoOkna.c; // Nastavím částku
                    that.data.c_z0 = dtoOkna.c; // Nastavím částku v daň. rozpisu | kvůli pravidlům předpisů - nesmí být null - a musí se rovnat celkový rozpis částce |
                    that.data.c_mena = dtoOkna.c; // Nastavím c_mena | kvůli pravidlům předpisů - nesmí být null |
                    that.data.dat_spl = dtoOkna.dat_spl;
                    that.data.dat_vzniku = dtoOkna.dat_vzniku;
                    that.data.ktg_upo = dtoOkna.ktg_upo;
                    that.data.poznamka = dtoOkna.poznamka;
                    that.data.popis = dtoOkna.popis;
                    that.data.penKalk = false; //předpis není z tvořen z okna pen. kalkulačky
                    that.data.editace = false; //jedná se o nový záznam, pomocná položka DTO pro další kontroly na straně serveru
                    that.data.radek_uhr = null; // nový předpis -> nullový rádek úhrady | správný tvar null potřebný do procedury
                    WebClient.Common.Base.ProcessResponse(that.isl.Predpisy.ulozPredpis(rq => { return { rq: { Data: that.data } }; }).get(), that, false, false)
                        .done((ret) => {
                        that.endOperation({ id: "PrevDluh06" });
                        //this.notification("showToast", { id: "ulozeniPredpisu", title: "Úspěšné uložení", content: "Změny předpisu úspěšně uloženy" });                        
                        that.close(ret.Dto);
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation({ id: "PrevDluh06" });
                        if (typ === "exception") {
                            obj.handled = true;
                            return that.dialogs.error("Chyba", obj.baseMessage);
                            //return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si kontrolu přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistence = false, { confirm: true })); });
                        }
                    });
                    ////////////////////////////////////////////////////////////////////////
                }
            };
            GPredpisZadani = __decorate([
                Decorators.gcontent
            ], GPredpisZadani);
            WebClient.GPredpisZadani = GPredpisZadani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWRwaXNaYWRhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJlZHBpc1phZGFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQTZWZjtBQTdWRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2Vm5CO0lBN1ZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2VjdCO1FBN1ZvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQU1ZLFNBQUksR0FBNEMsRUFBRSxDQUFDO2dCQTJUL0QsQ0FBQztnQkE1UkcsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSx3Q0FBd0MsRUFBRSxDQUFDLENBQUE7b0JBQ3pGLHlCQUF5QjtvQkFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLGlCQUFpQjs0QkFDeEMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7eUJBQ25ELENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFFdkIsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0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LENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7d0JBQ3ZDLHlKQUF5Sjt3QkFDekosSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ3ZCLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUc7d0JBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQTt3QkFDdkMsSUFBSSxHQUFHLEtBQUssV0FBVyxFQUFFLENBQUM7NEJBQ3RCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzRCQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ3BELGdPQUFnTzt3QkFDcE8sQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCx3RUFBd0U7Z0JBQzVFLENBQUM7YUFFSixDQUFBO1lBalVZLGNBQWM7Z0JBRDFCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsY0FBYyxDQWlVMUI7WUFqVVksd0JBQWMsaUJBaVUxQixDQUFBO1FBMEJMLENBQUMsRUE3Vm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZWN0I7SUFBRCxDQUFDLEVBN1ZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2Vm5CO0FBQUQsQ0FBQyxFQTdWUyxNQUFNLEtBQU4sTUFBTSxRQTZWZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJlZHBpc1phZGFuaS50cyAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyB6YWTDoW7DrSBwxZllZHBpc3UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxOS0wNS0xMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByZWRwaXNaYWRhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBUeXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgRGF0X1V6YXY6IERhdGU7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0byA9IHt9O1xyXG4gICAgICAgIC8vIUhvZG5vdHlcclxuICAgICAgICBsX2RhdF92em46IERhdGU7IC8vIG5ldyBEYXRlKCksXHJcbiAgICAgICAgbF9kYXRfc3BsOiBEYXRlOyAvLyBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIGxfYzogRGVjaW1hbDsgXHJcbiAgICAgICAgbF9wb3puYW1rYTogc3RyaW5nOyBcclxuICAgICAgICBsX3BvcGlzOiBzdHJpbmc7IFxyXG4gICAgICAgIGxfa3RnX3VwbzogbnVtYmVyOyBcclxuICAgICAgICAvLyFCb29sIGhvZG5vdHlcclxuICAgICAgICBjX2RsdWg6IGJvb2xlYW47ICAgICAgICAvLyAhMzU1IC0gdXJjdWplIHpkYSB2eXNlIHByZWRwaXN1IGJ1ZGUgZGxlIGNhc3RreSBuZWJvIHZ5c2UgZGx1aHUgayBkYXR1IHNwbGF0bm9zdGlcclxuICAgICAgICBjX3ByZXBsYXRlazogYm9vbGVhbjsgICAvLyAhMzY2IC0gdXJjdWplIHpkYSB2eXNlIHByZWRwaXN1IGJ1ZGUgZGxlIGNhc3RreSBuZWJvIHZ5c2UgcHJlcGxhdGt1IGsgZGF0dSBzcGxhdG5vc3RpXHJcbiAgICAgICAgY192bGFzdG5pOiBib29sZWFuOyAgICAgLy8gIXZsYXN0bmktMC9jaXppLTFcclxuICAgICAgICBjX3BsYXRieV92c2U6IGJvb2xlYW47ICAvLyAhMzgwIC0gdXJjdWplIHpkYSBzZSBzYWxkbyBwb8SNw610w6EgcyBwbGF0YmFtaSBiZXogb2hsZWR1IG5hIGRhdHVtIHphcGxhY2Vuw61cclxuICAgICAgICAvLyFwcm9txJtubsOpIHZsYXN0bsOtIGxoxa90eVxyXG4gICAgICAgIC8vcMWZaWTDoW7DrSB2bGFzbsOtIGxoxa90eSBwxZllZHBpc3UgLSB6ZGUgc2UgbmV2aXXFvsOtdsOhXHJcbiAgICAgICAgbGh1X2l4c19saHU/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkOyAvLyBudWxsLFxyXG4gICAgICAgIGxodV90eXBfdWtvPzogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZDsgLy8gbnVsbCxcclxuICAgICAgICBsaHVfZGF0X29kPzogSnNvbkRhdGUgfCBudWxsIHwgdW5kZWZpbmVkOyAvLyBudWxsLFxyXG4gICAgICAgIGxodV9kYXRfZG8/OiBKc29uRGF0ZSB8IG51bGwgfCB1bmRlZmluZWQ7IC8vIG51bGwsXHJcbiAgICAgICAgbGh1X2l4cF9kb2s/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkOyAvLyBudWxsLFxyXG4gICAgICAgIC8vIWVkaXRhY2VcclxuICAgICAgICBlX2RhdF92em46IGJvb2xlYW47XHJcbiAgICAgICAgZV9kYXRfc3BsOiBib29sZWFuO1xyXG4gICAgICAgIGVfYzogYm9vbGVhbjtcclxuICAgICAgICBlX3Bvem5hbWthOiBib29sZWFuO1xyXG4gICAgICAgIGVfcG9waXM6IGJvb2xlYW47XHJcbiAgICAgICAgZV9rdGdfdXBvOiBib29sZWFuO1xyXG4gICAgICAgIGVfY2RsdWg6IGJvb2xlYW47ICAgICAgIC8vITM1NSAtIHpkYSBqZSBtb3puZSBwcmVwaW5hdCBuYXN0YXZlbmkgemppc3RlbmkgY2FzdGt5IHByaXBhZHVcclxuICAgICAgICBlX2NwcmVwbGF0ZWs6IGJvb2xlYW47ICAvLyEzNTUgLSB6ZGEgamUgbW96bmUgcHJlcGluYXQgbmFzdGF2ZW5pIHpqaXN0ZW5pIGNhc3RreSBwcmlwYWR1XHJcbiAgICAgICAgZV9jX3ZsYXN0bmk6IGJvb2xlYW47ICAgLy8hdmxhc3RuaSAtIDAgLyBjaXppIC0gMSAgICAgICAgICAgIFxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJQcmV2RGx1aDA0XCIsIHRleHQ6IFwiUMWZaXByYXZ1anUgb2tubyBwcm8gemFkw6Fuw60gcMWZZWRwaXN1Li4uXCIgfSlcclxuICAgICAgICAgICAgLy90aGF0LnRpdGxlID0gYFDFmWVkcGlzYDtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUgPz8gXCJaYWTDoW7DrSBwxZllZHBpc3VcIixcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1ByZWRwaXNaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5zZXRJbml0aWFsVmFsdWUoKTtcclxuXHJcbiAgICAgICAgICAgIENvbW1vbi5CYXNlLnNldERhdGVCb3hTaG9ydGN1dHModGhhdCk7XHJcbiAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiUHJldkRsdWgwNFwiIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gdnN0dXBuw61jaCBob2Rub3RcclxuICAgICAgICAgKiBAbWV0aG9kIHNldEluaXRpYWxWYWx1ZSgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRJbml0aWFsVmFsdWUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcygpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQubF9jID8/IG5ldyBEZWNpbWFsKDApKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X3Z6bmlrdVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LmxfZGF0X3Z6biA/PyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X3NwbFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LmxfZGF0X3NwbCA/PyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicG96bmFta2FcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5sX3Bvem5hbWthID8/IFwiXCIpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJwb3Bpc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LmxfcG9waXMgPz8gXCJcIik7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImt0Z191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGt0Z191cG86IHRoYXQubF9rdGdfdXBvID8/IDEwMCB9KTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kbHVoXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuY19kbHVoID8/IGZhbHNlKTsgICAgICAgIFxyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3ByZXBsYXRla1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LmNfcHJlcGxhdGVrID8/IGZhbHNlKTsgICBcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19wbGF0YnlfdnNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuY19wbGF0YnlfdnNlID8/IGZhbHNlKTsgIFxyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3ZsYXN0bmlcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5jX3ZsYXN0bmkgPz8gZmFsc2UpOyAgICAgXHJcbiAgICAgICAgICAgIC8vVE9PRDogXHJcbiAgICAgICAgICAgIC8vZm9ybS5maW5kRmllbGRzKFwibGh1X2l4c19saHVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5saHVfaXhzX2xodSk7IFxyXG4gICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImxodV90eXBfdWtvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQubGh1X3R5cF91a28pOyBcclxuICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJsaHVfZGF0X29kXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQubGh1X2RhdF9vZCk7IFxyXG4gICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImxodV9kYXRfZG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5saHVfZGF0X2RvKTsgXHJcbiAgICAgICAgICAgIC8vZm9ybS5maW5kRmllbGRzKFwibGh1X2l4cF9kb2tcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5saHVfaXhwX2Rvayk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZSBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUZvcm0oKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQxZllZHBpc1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIsSMw6FzdGthIHDFmWVkcGlzdVwiLCByZXF1aXJlZDogdHJ1ZSB9KS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5lX2MsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSB2em5pa3VcIiwgcmVxdWlyZWQ6IHRydWUgfSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnpuaWt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LmVfZGF0X3Z6bixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAoTXlWYWx1ZSwgc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTXlWYWx1ZSA8PSBuZXcgRGF0ZSh0aGF0LkRhdF9VemF2KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JUeXBlID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdEYXR1bSB2em5pa3UgbmVzbcOtIGLDvXQgdiB1emF2xZllbsOpbSBvYmRvYsOtISdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BwaW5nID0gdHJ1ZTsgLy8gZXZpZGVuY2UgYnVkZSB6YWvDoXrDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIHNwbGF0bm9zdGlcIiwgcmVxdWlyZWQ6IHRydWUgfSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LmVfZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcImNfZGx1aFwiLCBsYWJlbDogXCJWw73FoWkgcMWZZWRwaXN1IHVyxI1pdCBkbGUgRExVSFUgayBkYXR1IHNwbGF0bm9zdGlcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQuZV9jZGx1aCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VDQihpbnB1dC52YWx1ZSEsIFwiY19kbHVoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiY19wcmVwbGF0ZWtcIiwgIGxhYmVsOiBcIlbDvcWhaSBwxZllZHBpc3UgdXLEjWl0IGRsZSBQxZhFUExBVEtVIGsgZGF0dSBzcGxhdG5vc3RpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LmVfY3ByZXBsYXRlayxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VDQihpbnB1dC52YWx1ZSEsIFwiY19wcmVwbGF0ZWtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiY19wbGF0YnlfdnNlXCIsIGRpc2FibGVkOiAodGhhdC5lX2NwcmVwbGF0ZWsgfHwgdGhhdC5lX2NkbHVoKSwgbGFiZWw6IFwiWmFwb8SNw61zdCB2xaFlY2hueSBwbGF0YnkgKGJleiBvaGxlZHUgbmEgZGF0dW0gw7pocmFkeSlcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlBvem7DoW1rYVwiLCByZXF1aXJlZDogdHJ1ZSB9KS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvem5hbWthXCIsIGRpc2FibGVkOiAhdGhhdC5lX3Bvem5hbWthLCB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlBvcGlzXCIsIHJlcXVpcmVkOiB0cnVlIH0pLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiwgZGlzYWJsZWQ6ICF0aGF0LmVfcG9waXMsIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiS2F0ZWdvcmllIHBvaHlidVwiLCByZXF1aXJlZDogdHJ1ZSB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsIGRpc2FibGVkOiAhdGhhdC5lX2t0Z191cG8sIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwb1wiLCBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlel9udWxhX3VwbzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbzogXCI8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2OiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntrdGdfdXBvfSAtIHtrdGdfdXBvX3R4dDp0cmltOmVuY29kZX1cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiY192bGFzdG5pXCIsIGRpc2FibGVkOiAhdGhhdC5lX2Nfdmxhc3RuaSwgbGFiZWw6IFwiUG91emUgdmxhc3Ruw60gcMWZw61wYWR5XCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKFwiVmxhc3Ruw60gbGjFr3RhXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJMaMWvdGFcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwTGh1dGEyKCksIHsgbmFtZTogXCJpeHNfbGh1XCIsIGluaXRpYWxWYWx1ZTogeyBpeHNfbGh1OiBcIjBcIiB9LCBtb2RlbDogXCJtb2RlbC5peHNfbGh1ID0gdmFsdWUuaXhzX2xodVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy92YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCLDmmtvblwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIENvbW1vbi5QcmVmYWJzLnR5cFVrb251KCksIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCB0eXBVa28gPSBpbnB1dC52YWx1ZT8udHlwX3VrbztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodHlwVWtvID09IDIwIHx8IHR5cFVrbyA9PSAzMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImRhdF9kb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwic2V0VmFsaWRhdG9yc1wiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBcInJlcXVpcmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcInNldFZhbGlkYXRvcnNcIiwgW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiRG9rdW1lbnRcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImRva3VtZW50XCIsIC8vIERva3VtZW50XHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJEYXR1bSBvZC1kb1wiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImRhdF9vZFwiLCAvLyBEYXR1bSBPZFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmxhZzogXCJyZXF1aXJlZFwiLCAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImRhdF9kb1wiLCAvLyBEYXR1bSBEb1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmxhZzogXCJyZXF1aXJlZFwiLCAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VDQihpbnB1dDogYm9vbGVhbiwgZnJvbTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzOyAgXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZDYXN0a2EgPSBmb3JtLmZpbmRGaWVsZHMoXCJjXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IGZQcmVwbGF0ZWsgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3ByZXBsYXRla1wiKVxyXG4gICAgICAgICAgICBjb25zdCBmRGx1aCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZGx1aFwiKVxyXG4gICAgICAgICAgICBjb25zdCBmUGxhdGJ5VnNlID0gZm9ybS5maW5kRmllbGRzKFwiY19wbGF0YnlfdnNlXCIpXHJcbiAgICAgICAgICAgIGxldCB2UHJlcGxhdGVrID0gZlByZXBsYXRlay5nZmllbGQ8Ym9vbGVhbj4oXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICBsZXQgdkRsdWggPSBmRGx1aC5nZmllbGQ8Ym9vbGVhbj4oXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGZDYXN0a2EuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpO1xyXG4gICAgICAgICAgICAgICAgZkNhc3RrYS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChmcm9tID09IFwiY19kbHVoXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmUHJlcGxhdGVrLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZkRsdWguZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZV9jKSBmQ2FzdGthLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZQcmVwbGF0ZWsgfHwgdkRsdWgpIHtcclxuICAgICAgICAgICAgICAgIGZQbGF0YnlWc2UuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZlBsYXRieVZzZS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmUGxhdGJ5VnNlLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gdGxhxI3DrXRrbyBuYWQgc2V6bmFtZW0ga29udHJvbCBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUFjdGlvbnMoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R09wcmF2bnlQcmVkcGlzWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQSBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGNvbW1hbmQgYmFydSBzIHRsYcSNw610a3kgcHJvIHVsb8W+ZW7DrSBhIHphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVDb21tYW5kQmFyKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnVsb3ppdCgpLmRvbmUoKCkgPT4geyB0aGF0LmNsb3NlKCk7IH0pIC8vIFVsb8W+ZW7DrSBkYXQgYSB6YXbFmWVuw60gb2tuYSB2IHDFmcOtcGFkxJsgw7pzcMSbY2h1IG1ldG9keS5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfSAvLyBaYXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiUHJldkRsdWgwNVwiLCB0ZXh0OiBcIlDFmWlwcmF2dWp1IGRhdGEgcHJvIHVsb8W+ZW7DrSBwxZllZHBpc3UuLi5cIiB9KVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IGFueSA9IHsgaXhwOiB0aGF0Lkl4cCB9O1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmMgPT0gMCAmJiAhKGRhdGEuY19kbHVoIHx8IGRhdGEuY19wcmVwbGF0ZWspKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJQcmV2RGx1aDA1XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlVwb3pvcm7Em27DrVwiLCBcIk9wcmF2ZHUgY2hjZXRlIGdlbmVyb3ZhdCBwxZllZHBpc3kgcyBudWxvdm91IMSNw6FzdGtvdT9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96ZW5pUHJlZHBpc3UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIlByZXZEbHVoMDVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudWxvemVuaVByZWRwaXN1KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1bG96ZW5pUHJlZHBpc3UoZHRvT2tuYTogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiUHJldkRsdWgwNlwiLCB0ZXh0OiBcIlByb2LDrWjDoSB1bG/FvmVuw60gcMWZZWRwaXN1Li4uXCIgfSlcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIHRoYXQuZGF0YS5peHAgPSBkdG9Pa25hLml4cDsgLy8gTmFzdGF2w61tIGlkZW50aWZpa8OhdG9yIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICB0aGF0LmRhdGEuYyA9IGR0b09rbmEuYzsgLy8gTmFzdGF2w61tIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YS5jX3owID0gZHRvT2tuYS5jOyAvLyBOYXN0YXbDrW0gxI3DoXN0a3UgdiBkYcWILiByb3pwaXN1IHwga3bFr2xpIHByYXZpZGzFr20gcMWZZWRwaXPFryAtIG5lc23DrSBiw710IG51bGwgLSBhIG11c8OtIHNlIHJvdm5hdCBjZWxrb3bDvSByb3pwaXMgxI3DoXN0Y2UgfFxyXG4gICAgICAgICAgICB0aGF0LmRhdGEuY19tZW5hID0gZHRvT2tuYS5jOyAvLyBOYXN0YXbDrW0gY19tZW5hIHwga3bFr2xpIHByYXZpZGzFr20gcMWZZWRwaXPFryAtIG5lc23DrSBiw710IG51bGwgfFxyXG4gICAgICAgICAgICB0aGF0LmRhdGEuZGF0X3NwbCA9IGR0b09rbmEuZGF0X3NwbDtcclxuICAgICAgICAgICAgdGhhdC5kYXRhLmRhdF92em5pa3UgPSBkdG9Pa25hLmRhdF92em5pa3U7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YS5rdGdfdXBvID0gZHRvT2tuYS5rdGdfdXBvO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEucG96bmFta2EgPSBkdG9Pa25hLnBvem5hbWthO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEucG9waXMgPSBkdG9Pa25hLnBvcGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEucGVuS2FsayA9IGZhbHNlOyAgICAgIC8vcMWZZWRwaXMgbmVuw60geiB0dm/FmWVuIHogb2tuYSBwZW4uIGthbGt1bGHEjWt5XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YS5lZGl0YWNlID0gZmFsc2U7ICAgICAgLy9qZWRuw6Egc2UgbyBub3bDvSB6w6F6bmFtLCBwb21vY27DoSBwb2xvxb5rYSBEVE8gcHJvIGRhbMWhw60ga29udHJvbHkgbmEgc3RyYW7EmyBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YS5yYWRla191aHIgPSBudWxsOyAgICAgLy8gbm92w70gcMWZZWRwaXMgLT4gbnVsbG92w70gcsOhZGVrIMO6aHJhZHkgfCBzcHLDoXZuw70gdHZhciBudWxsIHBvdMWZZWJuw70gZG8gcHJvY2VkdXJ5XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGhhdC5pc2wuUHJlZHBpc3kudWxvelByZWRwaXMocnEgPT4geyByZXR1cm4geyBycTogeyBEYXRhOiB0aGF0LmRhdGEgfSB9OyB9KS5nZXQoKSwgdGhhdCwgZmFsc2UsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4geyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiUHJldkRsdWgwNlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiLCB0aXRsZTogXCLDmnNwxJvFoW7DqSB1bG/FvmVuw61cIiwgY29udGVudDogXCJabcSbbnkgcMWZZWRwaXN1IMO6c3DEm8WhbsSbIHVsb8W+ZW55XCIgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyZXQuRHRvKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIlByZXZEbHVoMDZcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0ob2JqLmJhc2VNZXNzYWdlICsgXCI8L2JyPiBQxZllamV0ZSBzaSBrb250cm9sdSBwxZllcHNhdD9cIikuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoYXQudWxveigkLmV4dGVuZChwYXJhbXMsIHBhcmFtcy5Lb250cm9sYUV4aXN0ZW5jZSA9IGZhbHNlLCB7IGNvbmZpcm06IHRydWUgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcbiAgICBpbnRlcmZhY2UgR1ByZWRwaXNaYWRhbmlEdG8ge1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOmJ1Y2RwZXAuaXhwKi9cclxuICAgICAgICBpeHA/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOmJ1Y2RwZXAuYyovXHJcbiAgICAgICAgYz86IERlY2ltYWwgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOmJ1Y2RwZXAuZGF0X3Z6bmlrdSovXHJcbiAgICAgICAgZGF0X3Z6bmlrdT86IEpzb25EYXRlIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpidWNkcGVwLmRhdF9zcGwqL1xyXG4gICAgICAgIGRhdF9zcGw/OiBKc29uRGF0ZSB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46YnVjZHBlcC5zcyovXHJcbiAgICAgICAgcG9waXM/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOmRkcGRwZXAucG96bmFta2EqL1xyXG4gICAgICAgIHBvem5hbWthPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpidWNkcGVwLmt0Z191cG8qL1xyXG4gICAgICAgIGt0Z191cG8/OiBudW1iZXIgfCBudWxsO1xyXG4gICAgICAgIGNfZGx1aD86IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgICAgIGNfcHJlcGxhdGVrPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICAgICAgY19wbGF0YnlfdnNlPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICAgICAgY192bGFzdG5pPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICAgICAgbGh1X2l4c19saHU/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIGxodV90eXBfdWtvPzogbnVtYmVyIHwgbnVsbDtcclxuICAgICAgICBsaHVfZGF0X29kPzogSnNvbkRhdGUgfCBudWxsO1xyXG4gICAgICAgIGxodV9kYXRfZG8/OiBKc29uRGF0ZSB8IG51bGw7XHJcbiAgICAgICAgbGh1X2l4cF9kb2s/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgfVxyXG59Il19