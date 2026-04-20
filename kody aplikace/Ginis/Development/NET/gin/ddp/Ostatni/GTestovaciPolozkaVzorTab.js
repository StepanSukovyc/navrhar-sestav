"use strict";
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
            let GTestovaciPolozkaVzorTab = class GTestovaciPolozkaVzorTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "testovaciPolozkaTab", layoutDescriptor: "L2M2S1" })
                        .addSection("1. sekce")
                        .addRow("Zdroj", true)
                        .addField("gstringbox", {
                        name: "zdroj",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Kopie")
                        .addField("gstringbox", {
                        name: "kopie",
                        disabled: true
                    })
                        .addSection("2.sekce")
                        .addRow("A - B")
                        .addField("gnumberbox", "w-6", {
                        name: "a"
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "b"
                    })
                        .addRow("Výsledek")
                        .addField("gnumberbox", {
                        name: "vysledek",
                        disabled: true
                    })
                        .addSection("3.sekce")
                        .addRow("Datum")
                        .addField("gdatebox", {
                        validators: [new Gordic.Validators.Range({ min: new Date(2021, 10, 1), max: new Date(2021, 10, 30) })],
                        //validators: [that.validatory.validaceDatum],
                        name: "datum",
                        valueType: "date",
                        initialValue: new Date()
                    })
                        .addSection("4. sekce")
                        .addRow("SelectBox")
                        .addField("gselectbox", {
                        name: "mujSelectBox1",
                        dropdown: true,
                        multi: false,
                        //model: "model.column4=value.key"
                        itemTemplate: "{popis}",
                        data: [
                            { key: "1", popis: "Položka 1" }, { key: "2", popis: "Položka 2" }, { key: "3", popis: "Položka 3" }
                        ]
                    })
                        .addRow("SelectBoxMulti")
                        .addField("gselectbox", {
                        name: "mujSelectBox2",
                        dropdown: true,
                        //list: true,
                        multi: true,
                        itemTemplate: "{popis}",
                        data: [
                            { popis: "Položka 1" }, { popis: "Položka 2" }, { popis: "Položka 3" }
                        ]
                    });
                    var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    that.actions.addRange({
                        actKopie: {
                            caption: "Kopie",
                            icon: "gi-copy",
                            run: function (ev, ctx) {
                                let zdroj = that.element.findFields("zdroj").gfield("getValue");
                                that.element.findFields("kopie").gfield("setValue", zdroj);
                            }
                        },
                        actScitani: {
                            caption: "Sčítání",
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                let cisloA = new Decimal(that.element.findFields("a").gfield("getValue"));
                                let cisloB = new Decimal(that.element.findFields("b").gfield("getValue"));
                                let vysledek = cisloA.plus(cisloB);
                                that.element.findFields("vysledek").gfield("setValue", vysledek);
                            }
                        },
                        actValidace: {
                            caption: "Validace datumu",
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                var l_oFormHlavicka = that.element.findForms("testovaciPolozkaTab");
                                var test = l_oFormHlavicka.gform("isValid");
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actKopie, favorite: true },
                        { action: this.actions.actScitani, favorite: true },
                        { action: this.actions.actValidace, favorite: true }
                    ]);
                }
            };
            GTestovaciPolozkaVzorTab = __decorate([
                Decorators.gcontent
            ], GTestovaciPolozkaVzorTab);
            WebClient.GTestovaciPolozkaVzorTab = GTestovaciPolozkaVzorTab;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Rlc3RvdmFjaVBvbG96a2FWem9yVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Rlc3RvdmFjaVBvbG96a2FWem9yVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FxSWY7QUFySUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUluQjtJQXJJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcUk3QjtRQXJJb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEsT0FBQSxZQUFZO2dCQUl0RCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQzt5QkFDOUYsVUFBVSxDQUFDLFVBQVUsQ0FBQzt5QkFDdEIsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7eUJBQ3JCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3dCQUNiLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDakQsQ0FBQzt5QkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO3lCQUNmLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixDQUFDO3lCQUNELFVBQVUsQ0FBQyxTQUFTLENBQUM7eUJBQ3JCLE1BQU0sQ0FBQyxPQUFP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QkFDekQsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFrQkosQ0FBQTtZQWpJWSx3QkFBd0I7Z0JBRHBDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asd0JBQXdCLENBaUlwQztZQWpJWSxrQ0FBd0IsMkJBaUlwQyxDQUFBO1FBQ0wsQ0FBQyxFQXJJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcUk3QjtJQUFELENBQUMsRUFySWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFJbkI7QUFBRCxDQUFDLEVBcklTLE1BQU0sS0FBTixNQUFNLFFBcUlmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdUZXN0b3ZhY2lQb2xvemthVnpvclRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG5cclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ0ZXN0b3ZhY2lQb2xvemthVGFiXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiMS4gc2VrY2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaZHJvalwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6ZHJvalwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS29waWVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29waWVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiMi5zZWtjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkEgLSBCXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlbDvXNsZWRla1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIzLnNla2NlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW1cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiBuZXcgRGF0ZSgyMDIxLCAxMCwgMSksIG1heDogbmV3IERhdGUoMjAyMSwgMTAsIDMwKSB9KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogW3RoYXQudmFsaWRhdG9yeS52YWxpZGFjZURhdHVtXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiNC4gc2VrY2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTZWxlY3RCb3hcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibXVqU2VsZWN0Qm94MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmNvbHVtbjQ9dmFsdWUua2V5XCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IFwiMVwiLCBwb3BpczogXCJQb2xvxb5rYSAxXCIgfSwgeyBrZXk6IFwiMlwiLCBwb3BpczogXCJQb2xvxb5rYSAyXCIgfSwgeyBrZXk6IFwiM1wiLCBwb3BpczogXCJQb2xvxb5rYSAzXCIgfV1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNlbGVjdEJveE11bHRpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm11alNlbGVjdEJveDJcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2xpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntwb3Bpc31cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcG9waXM6IFwiUG9sb8W+a2EgMVwiIH0sIHsgcG9waXM6IFwiUG9sb8W+a2EgMlwiIH0sIHsgcG9waXM6IFwiUG9sb8W+a2EgM1wiIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEtvcGllOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3BpZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktY29weVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ZHJvaiA9IHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiemRyb2pcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwia29waWVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgemRyb2opO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTY2l0YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTxI3DrXTDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNpc2xvQSA9IG5ldyBEZWNpbWFsKHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaXNsb0IgPSBuZXcgRGVjaW1hbCh0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImJcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdnlzbGVkZWsgPSBjaXNsb0EucGx1cyhjaXNsb0IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcInZ5c2xlZGVrXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHZ5c2xlZGVrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VmFsaWRhY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZhbGlkYWNlIGRhdHVtdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfb0Zvcm1IbGF2aWNrYSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJ0ZXN0b3ZhY2lQb2xvemthVGFiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGxfb0Zvcm1IbGF2aWNrYS5nZm9ybShcImlzVmFsaWRcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RLb3BpZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0U2NpdGFuaSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgLCB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZhbGlkYWNlLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIHZhbGlkYXRvcnk6IE9iamVjdExpdGVyYWw8YW55PiA9IHtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICB2YWxpZGFjZURhdHVtOiB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhbGlkYXRlKHZhbHVlLCBzb3VyY2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVkFMSURBQ0VcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiAhKCFzb3VyY2UuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIikgJiYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9sw63EjWtvIG11c8OtIGLDvXQgZWRpdG92YXRlbG7DqVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICghdmFsdWUgfHwgbmV3IERhdGUodmFsdWUpIDwgbmV3IERhdGUoMjAyMSwgMTEsIDEpIHx8IG5ldyBEYXRlKHZhbHVlKSA+IG5ldyBEYXRlKDIwMjEsIDExLCAzMCkpKTsgLy8gbmVzbcOtIGLDvXQgcHLDoXpkbsOpXHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgIGdldE1lc3NhZ2U6IGZ1bmN0aW9uICh2YWx1ZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSEzDgcWgS0FcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBcIkRhdHVtIGplIG1pbW8gcG92b2xlbsO9IHJvenNhaFwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAwNDggOiBQb3Zpbm7DoSBob2Rub3RhXHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgIH1cclxufSJdfQ==