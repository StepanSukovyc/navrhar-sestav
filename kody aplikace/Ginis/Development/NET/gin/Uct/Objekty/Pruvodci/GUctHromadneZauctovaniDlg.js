"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GUctHromadneZauctovaniDlg = class GUctHromadneZauctovaniDlg extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    //a: string;
                    // nastaveni predvoleb
                    this.nastaveni = [];
                }
                // ************************************************************************
                // Inicializace formuláře
                prepareContent() {
                    var that = this;
                    //debugger;
                    this.formularNastaveni(that)
                        .done((result) => {
                        //result.addRow();
                        $.newDiv()
                            .appendTo(that.element).gform('createFrom', result); // vytvoření formuláře
                        $(that.contentDiv).resize();
                    });
                    //var l_oForm = new Gordic.Forms.Form({ name: "formular", layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0" });
                    //l_oForm.addRow()                                                                           // prázdný řádek
                    //    .addRow({ label: "jres:29750025", /*hint: "jres:29750188"*/ })                      // RC 29750025 : Důvod storna
                    //    .addField("gstringbox", "w-12", {                                                   // textové pole
                    //        name: "duvod",                                                                  // název pole
                    //        disabled: false,                                                                // vždy přístupné pole
                    //        placeholder: "jres:29750229",                                                   // RC 29750229 : Zadejte důvod stornování dokladu
                    //        validators: [new Gordic.Validators.Required(),                                  // validátor - pole musí být vyplněné
                    //        new Gordic.Validators.Length({ max: 80 })],                        // validátor - maximální délka 80
                    //    })
                    //    .addRow()                                                                           // prázdný řádek
                    //$("<div>")
                    //    .appendTo(that.element).gform('createFrom', l_oForm);                               // vytvoření formuláře
                    //$(that.contentDiv).resize();                                                            // TODO - ??
                }
                // ************************************************************************
                // Funkce naplnění dat z dialogu s doplňkovými informacemi
                getFormData() {
                    var def = $.Deferred();
                    var result = {}; // definice návratové proměnné
                    this.element.findFields().gfield("model", "collect", result); // naplnění dat z dialogu
                    // ulozeni nastaveni
                    this.saveNastaveni(result)
                        .done(() => {
                        def.resolve(result);
                        return;
                    });
                    //return result;                                                                          // odeslání dat
                    return def.promise();
                }
                saveNastaveni(data) {
                    var def = $.Deferred();
                    // priprava pole pro ulozeni
                    //let vybraneVolby: Gordic.Uct.Interface.GUctDefPolickaDto[] = [];
                    let result = {};
                    //result.Nastaveni = {};
                    this.nastaveni.forEach((polozka, index) => {
                        if (polozka.TypHodnoty === 1 /* Gordic.Uct.Interface.GEUctTypPolicek.List */) {
                            polozka.Value = data[polozka.Name];
                        }
                    });
                    //debugger;
                    EKOUtils.CallRemoteService(this, "UlozitPredvolby", { rq: this.nastaveni }, "Gordic.Uct.WebClient.GUctHromadneZauctovani")
                        .done(() => {
                        //debugger;
                        return def.resolve();
                    });
                    return def.promise();
                }
                /**
                 *  Formular nastaveni zauctovani
                 *
                 * */
                formularNastaveni(content) {
                    let that = content;
                    let x;
                    var def = $.Deferred();
                    that.beginOperation();
                    EKOUtils.CallRemoteService(this, "PredvolbyZauctovani", {}, "Gordic.Uct.WebClient.GUctHromadneZauctovani")
                        .done(function (result) {
                        that.nastaveni = result;
                        let form = new Gordic.Forms.Form({ name: "formular", layoutDescriptor: "L1M1S1, L-5-5-2, M-5-5-2, S-12-12-0" });
                        form.addRow();
                        //.addSection("Pokračovat ve zpracování, když nastane nesrovnalost:");
                        var predvolby = false;
                        result.forEach((polozka, index) => {
                            if (polozka.TypHodnoty === 0 /* Gordic.Uct.Interface.GEUctTypPolicek.Check */) {
                                //form.addRow("").addField("gcheck", {
                                //    name: polozka.Name,
                                //    label: polozka.Describe,
                                //    model: polozka.Name + "=value",
                                //    initialValue: typeof polozka.Value !== "undefined" && polozka.Value !== 0
                                //})
                            }
                            else if (polozka.TypHodnoty === 1 /* Gordic.Uct.Interface.GEUctTypPolicek.List */) {
                                //if (!predvolby)
                                //    form.addSection("Předvolby nastavení prim. dokladů:");
                                predvolby = true;
                                // vyplneni pole stavu a dohledeni vybrane hodnoty
                                var idStav = 0;
                                var stavy = [];
                                polozka.Volby.forEach((item, index) => {
                                    let s = { text: item.Name };
                                    s[polozka.Name] = item.Id;
                                    stavy.push(s);
                                    if (item.Id == polozka.Value) {
                                        idStav = index;
                                        return;
                                    }
                                });
                                // seznam
                                form.addRow(polozka.Describe).addField("gselectbox", {
                                    name: polozka.Name,
                                    dropdown: true, multi: false, list: false, itemWidth: "",
                                    itemTemplate: "{text}",
                                    initialValue: stavy[idStav],
                                    helperColumns: ["text"],
                                    model: "model." + polozka.Name + "=value." + polozka.Name,
                                    data: new Gordic.Data.View(stavy, { key: polozka.Name }),
                                });
                                form.addRow();
                            }
                            that.endOperation();
                        });
                        return def.resolve(form);
                    })
                        .always(() => { that.endOperation(); });
                    return def.promise();
                }
            };
            GUctHromadneZauctovaniDlg = __decorate([
                gcontent
            ], GUctHromadneZauctovaniDlg);
            WebClient.GUctHromadneZauctovaniDlg = GUctHromadneZauctovaniDlg;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdEhyb21hZG5lWmF1Y3RvdmFuaURsZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVY3RIcm9tYWRuZVphdWN0b3ZhbmlEbGcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTJKZjtBQTNKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EySm5CO0lBM0pnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EySjdCO1FBM0pvQixXQUFBLFNBQVM7WUFFMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLE9BQUEsWUFBWTtnQkFBM0Q7O29CQUNJLFlBQVk7b0JBQ1osc0JBQXNCO29CQUNkLGNBQVMsR0FBMkMsRUFBRSxDQUFDO2dCQW1KbkUsQ0FBQztnQkFsSkcsMkVBQTJFO2dCQUMzRSx5QkFBeUI7Z0JBQ3pCLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixXQUFXO29CQUNYLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7eUJBQ3ZCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNiLGtCQUFrQjt3QkFDbEIsQ0FBQyxDQUFDLE1BQU0sRUFBRTs2QkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBK0Isc0JBQXNCO3dCQUM3RyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoQyxDQUFDLENBQ0osQ0FBQztvQkFFRixxSEFBcUg7b0JBRXJILDZHQUE2RztvQkFDN0csdUhBQXVIO29CQUN2SCx5R0FBeUc7b0JBQ3pHLHVHQUF1RztvQkFDdkcsZ0hBQWdIO29CQUNoSCwySUFBMkk7b0JBQzNJLCtIQUErSDtvQkFD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RyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUk7b0NBQ3pELElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7aUNBQzNELENBQUMsQ0FBQztnQ0FFUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7NEJBQ2xCLENBQUM7NEJBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQTt3QkFJRixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTdCLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3RDO29CQUVMLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUV6QixDQUFDO2FBQ0osQ0FBQTtZQXRKWSx5QkFBeUI7Z0JBRHJDLFFBQVE7ZUFDSSx5QkFBeUIsQ0FzSnJDO1lBdEpZLG1DQUF5Qiw0QkFzSnJDLENBQUE7UUFDTCxDQUFDLEVBM0pvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEySjdCO0lBQUQsQ0FBQyxFQTNKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkpuQjtBQUFELENBQUMsRUEzSlMsTUFBTSxLQUFOLE1BQU0sUUEySmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjdC5XZWJDbGllbnQge1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVWN0SHJvbWFkbmVaYXVjdG92YW5pRGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50LCBHSHJvbWFkbmVPcGVyYWNlRGlhbG9nIHtcclxuICAgICAgICAvL2E6IHN0cmluZztcclxuICAgICAgICAvLyBuYXN0YXZlbmkgcHJlZHZvbGViXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZlbmk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REZWZQb2xpY2thRHRvW109W107XHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gSW5pY2lhbGl6YWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybXVsYXJOYXN0YXZlbmkodGhhdClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdC5hZGRSb3coKTtcclxuICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKCdjcmVhdGVGcm9tJywgcmVzdWx0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgICAgICAgICAkKHRoYXQuY29udGVudERpdikucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBsX29Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtdWxhclwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0yLTgtMiwgTS0yLTgtMiwgUy0xMi0xMi0wXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2xfb0Zvcm0uYWRkUm93KCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcsOhemRuw70gxZnDoWRla1xyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczoyOTc1MDAyNVwiLCAvKmhpbnQ6IFwianJlczoyOTc1MDE4OFwiKi8gfSkgICAgICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAwMjUgOiBExa92b2Qgc3Rvcm5hXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0b3bDqSBwb2xlXHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImR1dm9kXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhemV2IHBvbGVcclxuICAgICAgICAgICAgLy8gICAgICAgIGRpc2FibGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgcMWZw61zdHVwbsOpIHBvbGVcclxuICAgICAgICAgICAgLy8gICAgICAgIHBsYWNlaG9sZGVyOiBcImpyZXM6Mjk3NTAyMjlcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSQyAyOTc1MDIyOSA6IFphZGVqdGUgZMWvdm9kIHN0b3Jub3bDoW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhbGlkw6F0b3IgLSBwb2xlIG11c8OtIGLDvXQgdnlwbG7Em27DqVxyXG4gICAgICAgICAgICAvLyAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogODAgfSldLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhbGlkw6F0b3IgLSBtYXhpbcOhbG7DrSBkw6lsa2EgODBcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdygpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHLDoXpkbsO9IMWZw6FkZWtcclxuXHJcbiAgICAgICAgICAgIC8vJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKCdjcmVhdGVGcm9tJywgbF9vRm9ybSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIC8vJCh0aGF0LmNvbnRlbnREaXYpLnJlc2l6ZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gLSA/P1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gRnVua2NlIG5hcGxuxJtuw60gZGF0IHogZGlhbG9ndSBzIGRvcGzFiGtvdsO9bWkgaW5mb3JtYWNlbWlcclxuICAgICAgICBnZXRGb3JtRGF0YSgpIHtcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmluaWNlIG7DoXZyYXRvdsOpIHByb23Em25uw6lcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgcmVzdWx0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXBsbsSbbsOtIGRhdCB6IGRpYWxvZ3VcclxuICAgICAgICAgICAgLy8gdWxvemVuaSBuYXN0YXZlbmlcclxuICAgICAgICAgICAgdGhpcy5zYXZlTmFzdGF2ZW5pKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kZXNsw6Fuw60gZGF0XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlTmFzdGF2ZW5pKGRhdGE6IGFueSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gcHJpcHJhdmEgcG9sZSBwcm8gdWxvemVuaVxyXG4gICAgICAgICAgICAvL2xldCB2eWJyYW5lVm9sYnk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REZWZQb2xpY2thRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdFJlcXVlc3REdG8gPSB7fTtcclxuICAgICAgICAgICAgLy9yZXN1bHQuTmFzdGF2ZW5pID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubmFzdGF2ZW5pLmZvckVhY2goKHBvbG96a2EsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9sb3prYS5UeXBIb2Rub3R5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdFR5cFBvbGljZWsuTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvbG96a2EuVmFsdWUgPSBkYXRhW3BvbG96a2EuTmFtZSBhcyBhbnldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgRUtPVXRpbHMuQ2FsbFJlbW90ZVNlcnZpY2UodGhpcyxcIlVsb3ppdFByZWR2b2xieVwiLCB7IHJxOiB0aGlzLm5hc3RhdmVuaSB9LCBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RIcm9tYWRuZVphdWN0b3ZhbmlcIilcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBGb3JtdWxhciBuYXN0YXZlbmkgemF1Y3RvdmFuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgZm9ybXVsYXJOYXN0YXZlbmkoY29udGVudDogR1VjdEhyb21hZG5lWmF1Y3RvdmFuaURsZyk6IEpRdWVyeVByb21pc2U8Rm9ybXMuRm9ybT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGxldCB4OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmF1Y3RvdmF0TmFzdGF2ZW5pRHRvO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7ICBcclxuICAgICAgICAgICAgRUtPVXRpbHMuQ2FsbFJlbW90ZVNlcnZpY2UodGhpcyxcIlByZWR2b2xieVphdWN0b3ZhbmlcIiwge30sIFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdEhyb21hZG5lWmF1Y3RvdmFuaVwiKVxyXG5cclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REZWZQb2xpY2thRHRvW10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmkgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm11bGFyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTUtNS0yLCBNLTUtNS0yLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJQb2tyYcSNb3ZhdCB2ZSB6cHJhY292w6Fuw60sIGtkecW+IG5hc3RhbmUgbmVzcm92bmFsb3N0OlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJlZHZvbGJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKHBvbG96a2EsIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9sb3prYS5UeXBIb2Rub3R5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdFR5cFBvbGljZWsuQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybS5hZGRSb3coXCJcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogcG9sb3prYS5OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbGFiZWw6IHBvbG96a2EuRGVzY3JpYmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBtb2RlbDogcG9sb3prYS5OYW1lICsgXCI9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGluaXRpYWxWYWx1ZTogdHlwZW9mIHBvbG96a2EuVmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgcG9sb3prYS5WYWx1ZSAhPT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvbG96a2EuVHlwSG9kbm90eSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RUeXBQb2xpY2VrLkxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFwcmVkdm9sYnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmFkZFNlY3Rpb24oXCJQxZllZHZvbGJ5IG5hc3RhdmVuw60gcHJpbS4gZG9rbGFkxa86XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZHZvbGJ5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXBsbmVuaSBwb2xlIHN0YXZ1IGEgZG9obGVkZW5pIHZ5YnJhbmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkU3RhdiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdnkgPSBbXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbG96a2EuVm9sYnkhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHMgPSB7IHRleHQ6IGl0ZW0uTmFtZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNbcG9sb3prYS5OYW1lIGFzIGFueV0gPSBpdGVtLklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXZ5LnB1c2gocyBhcyBuZXZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uSWQgPT0gcG9sb3prYS5WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFN0YXYgPSBpbmRleDsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRSb3cocG9sb3prYS5EZXNjcmliZSBhcyBhbnkpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcG9sb3prYS5OYW1lIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsIG11bHRpOiBmYWxzZSwgbGlzdDogZmFsc2UsIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt0ZXh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHN0YXZ5W2lkU3Rhdl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInRleHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLlwiICsgcG9sb3prYS5OYW1lICsgXCI9dmFsdWUuXCIgKyBwb2xvemthLk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHN0YXZ5LCB7IGtleTogcG9sb3prYS5OYW1lIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShmb3JtKTsgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=