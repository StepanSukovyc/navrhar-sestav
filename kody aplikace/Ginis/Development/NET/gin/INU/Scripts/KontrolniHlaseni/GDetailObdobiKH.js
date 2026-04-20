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
            let GDetailObdobiKH = 
            /**
             *  Detail zna. obdobi dph
             */
            class GDetailObdobiKH extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * Obecne property
                     *
                     *
                     */
                    this.myLoading = false;
                    this.refresh = false;
                }
                onContentReady() {
                    var that = this;
                    this.taskId = "GDetailObdobiKHTask";
                    //at.model.eko_akt_txt
                    // doplnění prvků do tabu
                    var form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L1M1S1" })
                        .addSection()
                        .addRow("jres:30250019").addField("gstringbox", //RC 30250019 : Rok
                    {
                        name: "rok_dph", disabled: true,
                    })
                        .addRow("jres:30250020").addField("gstringbox", {
                        name: "mesic_dph", disabled: true,
                    })
                        //.addSection()
                        //.addRow("jres:30250142",).addField("gstringbox", { //RC 30250142 : Pořadí
                        //    name: "por_cislo", disabled: true,
                        //}) 
                        .addSection(" ")
                        .addRow("jres:30250143").addField("gdatebox", { name: "dat_priz_max", disabled: !that.editace }) //RC 30250143 : Maximální datum pro podání kontrolní hlášení
                        .addRow("jres:30250144").addField("gstringbox", {
                        name: "typ_priz_dph_txt", disabled: true
                    })
                        .addRow("jres:30250145").addField("gdatebox", { name: "dat_priz_dph", disabled: true }) //RC 30250145 : Datum skutečného podání kontrolní hlášení
                        .addRow("jres:30250146").addField("gdatebox", { name: "dat_zjist_dod", disabled: true }) //RC 30250146 : Datum zjištění důvodů pro následné kontrolní hlášení
                    ;
                    var tabHead = $("<div>")
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element;
                    ;
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
                        vstup.rok_dph = that.rok;
                        vstup.mesic_dph = that.mesic;
                    }
                    return that.isl.InuObdobiKHDPH.upsert(vstup)
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        //if (!content.otevreniBezSeznamu)
                        //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                        //debugger;
                        that.endOperation();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, (jqXHR, type, obj) => {
                        //debugger;
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
                    // pokud se needituje, je možné detail zavřít
                    def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true });
                    return def.promise();
                }
            };
            GDetailObdobiKH = __decorate([
                gcontent
                /**
                 *  Detail zna. obdobi dph
                 */
            ], GDetailObdobiKH);
            WebClient.GDetailObdobiKH = GDetailObdobiKH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE9iZG9iaUtILmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbE9iZG9iaUtILnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2S2Y7QUE3S0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNktuQjtJQTdLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNks3QjtRQTdLb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFNbkMsSUFBYSxlQUFlO1lBSDVCOztlQUVHO1lBQ0gsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQVdJOzs7O3VCQUlHO29CQUNJLGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBSTNCLFlBQU8sR0FBRyxLQUFLLENBQUM7Z0JBaUozQixDQUFDO2dCQS9JRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztvQkFDcEMsc0JBQXNCO29CQUN0Qix5QkFBeUI7b0JBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lCQUMvRSxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLGVBQWUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CO29CQUNqRTt3QkFDSSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJO3FCQUNsQyxDQUFDO3lCQUNMLE1BQU0sQ0FBQyxlQUFlLENBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUM3QyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJO3FCQUNwQyxDQUFDO3dCQUNGLGVBQWU7d0JBQ2Ys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LElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUNKLENBQ0E7Z0JBQ1QsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNJLE9BQU87b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLDZDQUE2QztvQkFDN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDdkYsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7YUFDQSxDQUFBO1lBcktZLGVBQWU7Z0JBSjNCLFFBQVE7Z0JBQ1Q7O21CQUVHO2VBQ1UsZUFBZSxDQXFLM0I7WUFyS1kseUJBQWUsa0JBcUszQixDQUFBO1FBQ0wsQ0FBQyxFQTdLb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNks3QjtJQUFELENBQUMsRUE3S2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZLbkI7QUFBRCxDQUFDLEVBN0tTLE1BQU0sS0FBTixNQUFNLFFBNktmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICAvKipcclxuICAgICAqICBEZXRhaWwgem5hLiBvYmRvYmkgZHBoXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsT2Jkb2JpS0ggZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQgeyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWpheCBwcm9wZXJ0eVxyXG4gICAgICAgICAqICBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgbW9kZWw6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29za2hsRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJvazogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbWVzaWM6IG51bWJlcjtcclxuICAgICAgICAvLyByZXppbSBlZGl0YWNlXHJcbiAgICAgICAgcHVibGljIGVkaXRhY2U6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JlY25lIHByb3BlcnR5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG15TG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgcHVibGljIHJlZnJlc2ggPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tJZCA9IFwiR0RldGFpbE9iZG9iaUtIVGFza1wiO1xyXG4gICAgICAgICAgICAvL2F0Lm1vZGVsLmVrb19ha3RfdHh0XHJcbiAgICAgICAgICAgIC8vIGRvcGxuxJtuw60gcHJ2a8WvIGRvIHRhYnVcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EZXRhaWxcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDE5XCIsICkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIC8vUkMgMzAyNTAwMTkgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX2RwaFwiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDIwXCIsKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMDIwIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNfZHBoXCIsIGRpc2FibGVkOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIH0pICAgICBcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwianJlczozMDI1MDE0MlwiLCkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzMDI1MDE0MiA6IFBvxZlhZMOtXHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInBvcl9jaXNsb1wiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vfSkgXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIiBcIikgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDE0M1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfcHJpel9tYXhcIiwgZGlzYWJsZWQ6ICF0aGF0LmVkaXRhY2UgfSkgLy9SQyAzMDI1MDE0MyA6IE1heGltw6FsbsOtIGRhdHVtIHBybyBwb2TDoW7DrSBrb250cm9sbsOtIGhsw6HFoWVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTQ0XCIsKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMTQ0IDogVHlwIHBvZGFuw6lobyBLSFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ByaXpfZHBoX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDE0NVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfcHJpel9kcGhcIiwgZGlzYWJsZWQ6IHRydWUgfSkgLy9SQyAzMDI1MDE0NSA6IERhdHVtIHNrdXRlxI1uw6lobyBwb2TDoW7DrSBrb250cm9sbsOtIGhsw6HFoWVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTQ2XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF96amlzdF9kb2RcIiwgZGlzYWJsZWQ6IHRydWV9KSAvL1JDIDMwMjUwMTQ2IDogRGF0dW0gemppxaF0xJtuw60gZMWvdm9kxa8gcHJvIG7DoXNsZWRuw6kga29udHJvbG7DrSBobMOhxaFlbsOtXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdmFyIHRhYkhlYWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcblxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvLyBwcm8gdmFsaWRhdG9yeSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSB0aGlzLmVsZW1lbnQ7O1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZFRvKHRhYkhlYWQpO1xyXG5cclxuICAgICAgICAgICAgLy9maWVsZGNoYW5nZVxyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVbG96aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMzdcIiwgLy9SQyAzMDI1MDAzNyA6IFVsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LmVkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5lZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlVsb3ppdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHsgcmVmcmVzaDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBUbGFjaXRrbyB6YXZyaXRcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VWxveml0IH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RaYXZyaXRcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgLy90aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFVsb3ppdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgICAgIC8vXSk7ICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vcGxuxJtuw60gaGxhdmnEjWtvdsOpaG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC8vIHsgaW5pdGlhbFZhbHVlczogdHJ1ZX0gLSBuZXZ5dm9sYSBzZSB1ZGFsb3N0IGNoYW5nZSBwbyBuYXBsbmVuaSBkYXRcclxuICAgICAgICAgICAgICAgIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgIC0gbmV2eXZvbGEgc2UgdmFsaWRhY2UgeiBkYXRhYmF6ZSwgemRhIGplIGhvZG5vdGEgb2tcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlIFxyXG4vLyAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQuZG9jVmFsaWRhdG9ycylcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIC8vIGZvY3VzIG5hIHBydm5pIGVkaXRvdmF0ZWxub3UgYnVua3VcclxuICAgICAgICAgICAgaWYodGhpcy5lZGl0YWNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJy5nZmllbGQ6bm90KC51aS1zdGF0ZS1kaXNhYmxlZCknKS5maXJzdCgpLmdmaWVsZCgnZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG96ZW5pIGRhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBVbG96aXQodnN0dXA/OiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc2tobER0bywgZGVmZXJyZXI/OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmVycmVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTsvLy5wcm9taXNlKCkuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDM4XCIpOyAvL1JDIDMwMjUwMDM4IDogUHJvYsOtaMOhIHVrbMOhZMOhbsOtXHJcbiAgICAgICAgICAgICAgICB2c3R1cCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHZzdHVwKSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlIFxyXG4gICAgICAgICAgICAgICAgdnN0dXAucm9rX2RwaCA9IHRoYXQucm9rO1xyXG4gICAgICAgICAgICAgICAgdnN0dXAubWVzaWNfZHBoID0gdGhhdC5tZXNpYztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkludU9iZG9iaUtIRFBILnVwc2VydCh2c3R1cClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFjb250ZW50Lm90ZXZyZW5pQmV6U2V6bmFtdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+ICB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgIGRlZi5yZXNvbHZlKHsgcmVmcmVzaDogdHlwZW9mIHRoYXQucmVmcmVzaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGF0LnJlZnJlc2ggPT09IHRydWUgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==