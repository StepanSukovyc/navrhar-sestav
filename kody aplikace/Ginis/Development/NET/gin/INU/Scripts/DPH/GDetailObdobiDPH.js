"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GDetailObdobiDPH = 
            /**
             *  Detail zna. obdobi dph
             */
            class GDetailObdobiDPH extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * Obecne property
                     *
                     *
                     */
                    this.myLoading = false;
                    this.refresh = false;
                    this.id = "GDetailObdobiDPHID";
                    this.taskId = "GDetailObdobiDPHTask";
                }
                onContentReady() {
                    this.id = "GDetailObdobiDPHID";
                    this.taskId = "GDetailObdobiDPHTask";
                    var that = this;
                    //at.model.eko_akt_txt
                    // doplnění prvků do tabu
                    var form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L1M1S1" })
                        .addSection()
                        .addRow("jres:30250019").addField("gstringbox", //RC 30250019 : Rok
                    {
                        name: "rok", disabled: true,
                    })
                        .addRow("jres:30250020").addField("gstringbox", {
                        name: "mesic", disabled: true,
                    })
                        .addSection()
                        .addRow("jres:30250021").addField("gstringbox", {
                        name: "eko_akt_txt", disabled: true,
                    })
                        .addRow("jres:30250025").addField("gstringbox", {
                        name: "s_dph_txt", disabled: true,
                    })
                        .addRow("jres:30250065").addField("gstringbox", {
                        name: "s_prep_dph_txt", disabled: true,
                    })
                        .addSection(" ")
                        .addRow("jres:30250027").addField("gdatebox", { name: "dat_priz_max", disabled: !that.editace }) //RC 30250027 : Maximální datum pro podání přiznání k DPH
                        .addRow("jres:30250029").addField("gstringbox", {
                        name: "typ_priz_dph_txt", disabled: true
                    })
                        .addRow("jres:30250030").addField("gdatebox", { name: "dat_priz_dph", disabled: true }) //RC 30250030 : Datum skutečného podání přiznání k DPH
                        .addRow("jres:30250032").addField("gdatebox", { name: "dat_zjist_dod", disabled: true }) //RC 30250032 : Datum zjištění důvodů pro dodatečné přiznání k DPH
                        .addSection("")
                        .addRow("jres:30250285").addField("gnumberbox", Gordic.Prefabs.Number.decimal(2), { name: "koef_zal", disabled: !(that.povoleniEditaceZalohovehoKoeficientu && that.editace) }) //RC 30250285 : Zálohový koeficient (mezi 0 a 1)
                        .addRow("jres:30250286").addField("gnumberbox", Gordic.Prefabs.Number.decimal(2), { name: "koef_vyp", disabled: !(that.povoleniEditaceVyporadacihoKoeficientu && that.editace) }) //RC 30250286 : Vypořádací koeficient (mezi 0 a 1)
                    ;
                    var tabHead = $("<div>")
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    //fieldchange
                    // akce seznamu
                    this.actions.addRange({
                        actUlozit: {
                            name: "actUlozit",
                            caption: "jres:30250037", //RC 30250037 : Uložit
                            icon: "gi-save",
                            enabled: that.editace,
                            visible: that.editace,
                            //enabled: false,
                            run: function (ev, ctx) {
                                that.Ulozit()
                                    .done(function () {
                                    that.refresh = true;
                                    that.close({ refresh: true });
                                });
                                ;
                                //this.setPending($.content(this).Ulozeni(that)); 
                                //Gordic.Eko.WebClient.DetailPredkontaceMethod.Ulozeni(that);
                            }
                        },
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } })
                    });
                    // Tlacitko zavrit
                    that.commandBar([
                        { action: this.actions.actUlozit },
                        {
                            customClass: "g-button--primary",
                            action: this.actions.actZavrit
                        },
                    ]);
                    //this.menuBar([
                    //    { action: this.actions.actUlozit, favorite: true },
                    //]);
                    //plnění hlavičkového formuláře
                    that.findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", that.model, { initialValues: true, setFlags: { triggerChange: false } }) // verificationNeeded: false 
                    ;
                    // focus na prvni editovatelnou bunku
                    if (this.editace)
                        this.element.find('.gfield:not(.ui-state-disabled)').first().gfield('focus');
                }
                /**
                 * Ulozeni dat
                 *
                 * */
                Ulozit(vstup, deferrer) {
                    var that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250038"); //RC 30250038 : Probíhá ukládání
                        vstup = {};
                        that.findFields().gfield("model", "collect", vstup); // verificationNeeded: false 
                        vstup.rok = that.rok;
                        vstup.mesic = that.mesic;
                    }
                    return that.isl.InuObdobiDPH.upsert(vstup)
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        //if (!content.otevreniBezSeznamu)
                        //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                        //debugger;
                        that.endOperation();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: that,
                        erroObject: objError,
                    }))
                        .always(() => {
                        that.endOperation();
                    });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    if (false) {
                        // v editačním režimu (tj. i po podání) dotaz na zavření bez uložení
                        this.dialogs.messageBox("jres:30250026" //RC 30250026 : Zavřít
                        , "jres:30250103", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250103 : Opravdu chcete zavřít detail dokladu bez uložení?
                            .on("yes", function () {
                            def.resolve({ refresh: true });
                        })
                            .on("close", def.reject);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true });
                    }
                    return def.promise();
                }
            };
            GDetailObdobiDPH = __decorate([
                gcontent
                /**
                 *  Detail zna. obdobi dph
                 */
            ], GDetailObdobiDPH);
            WebClient.GDetailObdobiDPH = GDetailObdobiDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE9iZG9iaURQSC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxPYmRvYmlEUEgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTRNZjtBQTVNRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0TW5CO0lBNU1nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0TTdCO1FBNU1vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQU1uQyxJQUFhLGdCQUFnQjtZQUg3Qjs7ZUFFRztZQUNILE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBWUk7Ozs7dUJBSUc7b0JBQ0ksY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFJM0IsWUFBTyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsT0FBRSxHQUFHLG9CQUFvQixDQUFDO29CQUMxQixXQUFNLEdBQUcsc0JBQXNCLENBQUM7Z0JBNktwQyxDQUFDO2dCQTVLRyxjQUFjO29CQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7b0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsc0JBQXNCLENBQUM7b0JBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsc0JBQXNCO29CQUN0Qix5QkFBeUI7b0JBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lCQUMvRSxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CO29CQUNqRTt3QkFDSSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO3FCQUM5QixDQUFDO3lCQUNMLE1BQU0sQ0FBQyxlQUFl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QUFULGFBQVMsUUE0TTdCO0lBQUQsQ0FBQyxFQTVNZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNE1uQjtBQUFELENBQUMsRUE1TVMsTUFBTSxLQUFOLE1BQU0sUUE0TWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIC8qKlxyXG4gICAgICogIERldGFpbCB6bmEuIG9iZG9iaSBkcGhcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxPYmRvYmlEUEggZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQgeyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWpheCBwcm9wZXJ0eVxyXG4gICAgICAgICAqICBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgbW9kZWw6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29zYXpvRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcG92b2xlbmlFZGl0YWNlWmFsb2hvdmVob0tvZWZpY2llbnR1OiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgcG92b2xlbmlFZGl0YWNlVnlwb3JhZGFjaWhvS29lZmljaWVudHU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSByb2s6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1lc2ljOiBudW1iZXI7XHJcbiAgICAgICAgLy8gcmV6aW0gZWRpdGFjZVxyXG4gICAgICAgIHB1YmxpYyBlZGl0YWNlOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9iZWNuZSBwcm9wZXJ0eVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBteUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIHJlZnJlc2ggPSBmYWxzZTtcclxuICAgICAgICBpZCA9IFwiR0RldGFpbE9iZG9iaURQSElEXCI7XHJcbiAgICAgICAgdGFza0lkID0gXCJHRGV0YWlsT2Jkb2JpRFBIVGFza1wiO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gXCJHRGV0YWlsT2Jkb2JpRFBISURcIjtcclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcIkdEZXRhaWxPYmRvYmlEUEhUYXNrXCI7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9hdC5tb2RlbC5la29fYWt0X3R4dFxyXG4gICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAxOVwiLCApLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwMDE5IDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDIwXCIsKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMDIwIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIiwgZGlzYWJsZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgfSkgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMjFcIiwpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vUkMgMzAyNTAwMjEgOiBBa3Rpdml0YVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZWtvX2FrdF90eHRcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMjVcIiwpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vUkMgMzAyNTAwMjUgOiBTdGF2IG9iZG9iw61cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfZHBoX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDA2NVwiLCkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzMDI1MDA2NSA6IFN0YXYgcMWZZXBvxI10dVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19wcmVwX2RwaF90eHRcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIiBcIikgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAyN1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfcHJpel9tYXhcIiwgZGlzYWJsZWQ6ICF0aGF0LmVkaXRhY2UgfSkgLy9SQyAzMDI1MDAyNyA6IE1heGltw6FsbsOtIGRhdHVtIHBybyBwb2TDoW7DrSBwxZlpem7DoW7DrSBrIERQSFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMjlcIiwpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vUkMgMzAyNTAwMjkgOiBUeXAgcMWZaXpuw6Fuw60gayBEUEhcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9wcml6X2RwaF90eHRcIiwgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMzBcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMzAyNTAwMzAgOiBEYXR1bSBza3V0ZcSNbsOpaG8gcG9kw6Fuw60gcMWZaXpuw6Fuw60gayBEUEhcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDMyXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF96amlzdF9kb2RcIiwgZGlzYWJsZWQ6IHRydWUgfSkgLy9SQyAzMDI1MDAzMiA6IERhdHVtIHpqacWhdMSbbsOtIGTFr3ZvZMWvIHBybyBkb2RhdGXEjW7DqSBwxZlpem7DoW7DrSBrIERQSFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjg1XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgyKSwgeyBuYW1lOiBcImtvZWZfemFsXCIsIGRpc2FibGVkOiAhKHRoYXQucG92b2xlbmlFZGl0YWNlWmFsb2hvdmVob0tvZWZpY2llbnR1ICYmIHRoYXQuZWRpdGFjZSkgfSkgLy9SQyAzMDI1MDI4NSA6IFrDoWxvaG92w70ga29lZmljaWVudCAobWV6aSAwIGEgMSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMjg2XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgyKSwgeyBuYW1lOiBcImtvZWZfdnlwXCIsIGRpc2FibGVkOiAhKHRoYXQucG92b2xlbmlFZGl0YWNlVnlwb3JhZGFjaWhvS29lZmljaWVudHUgJiYgdGhhdC5lZGl0YWNlKSB9KSAvL1JDIDMwMjUwMjg2IDogVnlwb8WZw6FkYWPDrSBrb2VmaWNpZW50IChtZXppIDAgYSAxKVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdmFyIHRhYkhlYWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAvLy5ndGFiKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vdGl0bGU6IFwianJlczozMDI1MDAyMVwiLCAvL1JDIDMwMjUwMDIxIDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgIC8vICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvLyBwcm8gdmFsaWRhdG9yeSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSB0aGlzLmVsZW1lbnQ7Ly90YWJIZWFkO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZFRvKHRhYkhlYWQpO1xyXG5cclxuICAgICAgICAgICAgLy9maWVsZGNoYW5nZVxyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVbG96aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMzdcIiwgLy9SQyAzMDI1MDAzNyA6IFVsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LmVkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5lZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlVsb3ppdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHsgcmVmcmVzaDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZXRQZW5kaW5nKCQuY29udGVudCh0aGlzKS5VbG96ZW5pKHRoYXQpKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5XZWJDbGllbnQuRGV0YWlsUHJlZGtvbnRhY2VNZXRob2QuVWxvemVuaSh0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRsYWNpdGtvIHphdnJpdFxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFphdnJpdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAvL3RoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VWxveml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG5cclxuICAgICAgICAgICAgLy9dKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vcGxuxJtuw60gaGxhdmnEjWtvdsOpaG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC8vIHsgaW5pdGlhbFZhbHVlczogdHJ1ZX0gLSBuZXZ5dm9sYSBzZSB1ZGFsb3N0IGNoYW5nZSBwbyBuYXBsbmVuaSBkYXRcclxuICAgICAgICAgICAgICAgIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgIC0gbmV2eXZvbGEgc2UgdmFsaWRhY2UgeiBkYXRhYmF6ZSwgemRhIGplIGhvZG5vdGEgb2tcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlIFxyXG4vLyAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQuZG9jVmFsaWRhdG9ycylcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8gZm9jdXMgbmEgcHJ2bmkgZWRpdG92YXRlbG5vdSBidW5rdVxyXG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0YWNlKVxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnLmdmaWVsZDpub3QoLnVpLXN0YXRlLWRpc2FibGVkKScpLmZpcnN0KCkuZ2ZpZWxkKCdmb2N1cycpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgVWxveml0KHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb3Nhem9EdG8sIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7Ly8ucHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDAzOFwiKTsgLy9SQyAzMDI1MDAzOCA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB2c3R1cCkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgICAgIHZzdHVwLnJvayA9IHRoYXQucm9rO1xyXG4gICAgICAgICAgICAgICAgdnN0dXAubWVzaWMgPSB0aGF0Lm1lc2ljO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuSW51T2Jkb2JpRFBILnVwc2VydCh2c3R1cClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFjb250ZW50Lm90ZXZyZW5pQmV6U2V6bmFtdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRXhjZXB0aW9uUHJvY2Vzc2luZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb09iamVjdDogb2JqRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiAge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGlmIChmYWxzZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gdiBlZGl0YcSNbsOtbSByZcW+aW11ICh0ai4gaSBwbyBwb2TDoW7DrSkgZG90YXogbmEgemF2xZllbsOtIGJleiB1bG/FvmVuw61cclxuICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDI2XCIgLy9SQyAzMDI1MDAyNiA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAsIFwianJlczozMDI1MDEwM1wiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDMwMjUwMTAzIDogT3ByYXZkdSBjaGNldGUgemF2xZnDrXQgZGV0YWlsIGRva2xhZHUgYmV6IHVsb8W+ZW7DrT9cclxuICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoeyByZWZyZXNoOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGRlZi5yZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgICAgICBkZWYucmVzb2x2ZSh7IHJlZnJlc2g6IHR5cGVvZiB0aGF0LnJlZnJlc2ggIT09IFwidW5kZWZpbmVkXCIgJiYgdGhhdC5yZWZyZXNoID09PSB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19