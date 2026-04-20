"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Bar;
    (function (Bar) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GBarCastkaForm = class GBarCastkaForm extends Gordic.GContentBase {
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.actions.addRange({
                        actOK: {
                            caption: "Ok", // OK
                            icon: "", // ikona 
                            visible: true, // vždy viditelné
                            enabled: true,
                            run: function () {
                                that.closing(true);
                            }
                        },
                        actZrusit: {
                            caption: "Zrušit", // popis
                            icon: "gi-window-close", // ikona 
                            visible: true, // vždy viditelné
                            enabled: true, // vždy spustitelné
                            run: function () {
                                that.closing(false);
                            }
                        }
                    });
                    //*******************************************************
                    // P ř i d á v á n í   a k c í   d o   m e n u   b a r u
                    this.menuBar([]);
                    this.commandBar([
                        { action: that.actions.actOK, favorite: true, primary: true }, // Ok
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    // *****************************
                    //    Formulář tabu
                    var form_GBarCastkaForm = new Gordic.Forms.Form({ name: "BarCastkaForm", layoutDescriptor: "L4M4S2 L-3-9-0 M-3-9-0 S-12-12-0" })
                        .addRow("Původní částka MD").addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), { name: "c0_new", initialValue: 0, disabled: true })
                        .addRow("Původní částka Dal").addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), { name: "c1_new", initialValue: 0, disabled: true })
                        .addSection(" ")
                        .addRow("Procent").addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "procent",
                        initialValue: 0,
                        step: 5,
                        decimals: 2,
                        change: function (ev, changeObj) {
                            if (changeObj && changeObj.value) {
                                var new_procento = changeObj.value;
                                var new_castka_c0 = parseDecimal(that.model.c0_new).mul(new_procento).div(100);
                                var new_castka_c1 = parseDecimal(that.model.c1_new).mul(new_procento).div(100);
                                $(ev.currentTarget).gform().findFields("c0_new_balanc").gfield("setValue", new_castka_c0);
                                $(ev.currentTarget).gform().findFields("c1_new_balanc").gfield("setValue", new_castka_c1);
                            }
                        }
                    })
                        .addRow("Rozdíl").addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "rozdil",
                        initialValue: 0,
                        decimals: 2,
                        change: function (ev, changeObj) {
                            if (changeObj && changeObj.value) {
                                var new_rozdil = changeObj.value;
                                var new_castka_c0 = parseDecimal(that.model.c0_new).plus(new_rozdil);
                                var new_castka_c1 = parseDecimal(that.model.c1_new).plus(new_rozdil);
                                $(ev.currentTarget).gform().findFields("c0_new_balanc").gfield("setValue", new_castka_c0);
                                $(ev.currentTarget).gform().findFields("c1_new_balanc").gfield("setValue", new_castka_c1);
                            }
                        }
                    })
                        .addSection(" ")
                        .addRow("Nová částka MD").addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), { name: "c0_new_balanc", initialValue: 0 })
                        .addRow("Nová částka Dal").addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), { name: "c1_new_balanc", initialValue: 0 });
                    $("<div class='js-BarCastkaForm'>").appendTo(that.element).gform("createFrom", form_GBarCastkaForm).findFields().gfield("model", "apply", that.model);
                }
                ;
                //---------------------------------------------------------------
                // Zavírání formuláře
                closing(provest) {
                    if (provest == true) {
                        var $cDiv = $(this.contentDiv);
                        //this.contentDiv.showFlash({ label: 'Ukladam akci ' + cislo });
                        if ($cDiv.findForms().gform("isValid", true)) {
                            //var dto = {};
                            $cDiv.findFields().gfield("model", "collect", this.model);
                            $cDiv.findFields().gfield("confirm");
                            this.close({ data: this.model }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GBarCastkaForm = __decorate([
                gcontent
            ], GBarCastkaForm);
            WebClient.GBarCastkaForm = GBarCastkaForm;
        })(WebClient = Bar.WebClient || (Bar.WebClient = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0JhckNhc3RrYUZvcm0uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0JhckNhc3RrYUZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtIZjtBQWxIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrSG5CO0lBbEhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrSDdCO1FBbEhvQixXQUFBLFNBQVM7WUFFMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUluQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQU81QyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUVsQixLQUFLLEVBQUU7NEJBQ0gsT0FBTyxFQUFFLElBQUksRUFBdUYsS0FBSzs0QkFDekcsSUFBSSxFQUFFLEVBQUUsRUFBNEYsU0FBUzs0QkFDN0csT0FBTyxFQUFFLElBQUksRUFBdUYsaUJBQWlCOzRCQUNySCxPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUU7Z0NBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTs0QkFDdEIsQ0FBQzt5QkFDSjt3QkFDRCxTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBbUYsUUFBUTs0QkFDNUcsSUFBSSxFQUFFLGlCQUFpQixFQUE2RSxTQUFTOzRCQUM3RyxPQUFPLEVBQUUsSUFBSSxFQUF1RixpQkFBaUI7NEJBQ3JILE9BQU8sRUFBRSxJQUFJLEVBQXVGLG1CQUFtQjs0QkFDdkgsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7NEJBQ3ZCLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO29C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QTJHMUIsQ0FBQTtRQUNMLENBQUMsRUFsSG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtIN0I7SUFBRCxDQUFDLEVBbEhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrSG5CO0FBQUQsQ0FBQyxFQWxIUyxNQUFNLEtBQU4sTUFBTSxRQWtIZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQmFyLldlYkNsaWVudCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR0JhckNhc3RrYUZvcm0gZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHM6IEdvcmRpYy5CYXIuV2ViQ2xpZW50LkRUTy5HQmFyR2xvYmFsc0R0bztcclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBHb3JkaWMuQmFyLkludGVyZmFjZS5HQmFyQ2FzdGt5RHRvO1xyXG5cclxuICAgICAgICB1aWQ6IFwiQmFsRm9ybXVsYXIjXCI7XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gSW5pY2lhbGl6YWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGFrY8OtXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T0s6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9rXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPS1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcodHJ1ZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHNwdXN0aXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcoZmFsc2UpIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gUCDFmSBpIGQgw6EgdiDDoSBuIMOtICAgYSBrIGMgw60gICBkIG8gICBtIGUgbiB1ICAgYiBhIHIgdVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9LLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFpydXNpdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpydcWhaXRcclxuICAgICAgICAgICAgXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gICAgRm9ybXVsw6HFmSB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBmb3JtX0dCYXJDYXN0a2FGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJCYXJDYXN0a2FGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNNFMyIEwtMy05LTAgTS0zLTktMCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFr3ZvZG7DrSDEjcOhc3RrYSBNRFwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiYzBfbmV3XCIsIGluaXRpYWxWYWx1ZTogMCwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxa92b2Ruw60gxI3DoXN0a2EgRGFsXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJjMV9uZXdcIiwgaW5pdGlhbFZhbHVlOiAwLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJvY2VudFwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9jZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IDUsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iaiAmJiBjaGFuZ2VPYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdfcHJvY2VudG8gPSBjaGFuZ2VPYmoudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2Nhc3RrYV9jMCA9IHBhcnNlRGVjaW1hbCh0aGF0Lm1vZGVsLmMwX25ldyEpLm11bChuZXdfcHJvY2VudG8pLmRpdigxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld19jYXN0a2FfYzEgPSBwYXJzZURlY2ltYWwodGhhdC5tb2RlbC5jMV9uZXchKS5tdWwobmV3X3Byb2NlbnRvKS5kaXYoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm0oKS5maW5kRmllbGRzKFwiYzBfbmV3X2JhbGFuY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXdfY2FzdGthX2MwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm0oKS5maW5kRmllbGRzKFwiYzFfbmV3X2JhbGFuY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXdfY2FzdGthX2MxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUm96ZMOtbFwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pkaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqICYmIGNoYW5nZU9iai52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld19yb3pkaWwgPSBjaGFuZ2VPYmoudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2Nhc3RrYV9jMCA9IHBhcnNlRGVjaW1hbCh0aGF0Lm1vZGVsLmMwX25ldyEpLnBsdXMobmV3X3JvemRpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2Nhc3RrYV9jMSA9IHBhcnNlRGVjaW1hbCh0aGF0Lm1vZGVsLmMxX25ldyEpLnBsdXMobmV3X3JvemRpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3JtKCkuZmluZEZpZWxkcyhcImMwX25ld19iYWxhbmNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3X2Nhc3RrYV9jMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3JtKCkuZmluZEZpZWxkcyhcImMxX25ld19iYWxhbmNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3X2Nhc3RrYV9jMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTm92w6EgxI3DoXN0a2EgTURcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImMwX25ld19iYWxhbmNcIiwgaW5pdGlhbFZhbHVlOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTm92w6EgxI3DoXN0a2EgRGFsXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJjMV9uZXdfYmFsYW5jXCIsIGluaXRpYWxWYWx1ZTogMCB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J2pzLUJhckNhc3RrYUZvcm0nPlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtX0dCYXJDYXN0a2FGb3JtLCApLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFphdsOtcsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgY2xvc2luZyggcHJvdmVzdCApIHtcclxuICAgICAgICAgICAgaWYgKHByb3Zlc3QgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNvbnRlbnREaXYuc2hvd0ZsYXNoKHsgbGFiZWw6ICdVa2xhZGFtIGFrY2kgJyArIGNpc2xvIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcImNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBkYXRhOiB0aGlzLm1vZGVsIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHphdsOtcsOhbsOtIHBvc8OtbGFuw6FtIHpwxJt0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IG51bGwgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=