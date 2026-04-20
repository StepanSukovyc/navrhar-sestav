"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokMincovkaTab = class GPokMincovkaTab extends Gordic.GContentBase {
                onContentReady() {
                    this.title = "Mincovka";
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "pokMincovkaForm", layoutDescriptor: "L1M1S1" })
                        .addSection()
                        .addRow("Částka")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "castka", initialValue: new Decimal(0),
                        change: function (ev, changeObj) {
                            var castka = changeObj.value;
                            var kolikrat = that.element.findForms("pokMincovkaForm").findFields("kolikrat").gfield("getValue");
                            that.element.findForms("pokMincovkaForm").findFields("celkem").gfield("setValue", Decimal.mul(castka, kolikrat));
                        }
                    })
                        //.addSection()
                        .addRow("Kolikrát")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "kolikrat", initialValue: new Decimal(1),
                        change: function (ev, changeObj) {
                            var castka = that.element.findForms("pokMincovkaForm").findFields("castka").gfield("getValue");
                            var kolikrat = changeObj.value;
                            that.element.findForms("pokMincovkaForm").findFields("celkem").gfield("setValue", Decimal.mul(castka, kolikrat));
                        }
                    })
                        //.addSection()
                        .addRow("Celkem")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "celkem", disabled: true, initialValue: new Decimal(0) });
                    $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                }
                /**
             * closing
             */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    var fields = this.findFields();
                    let castka = fields.findFields("castka").gfield("getValue");
                    let kolikrat = fields.findFields("kolikrat").gfield("getValue");
                    return def.resolve({ castka: castka, kolikrat: kolikrat });
                    def.promise();
                }
            };
            GPokMincovkaTab = __decorate([
                Decorators.gcontent
            ], GPokMincovkaTab);
            WebClient.GPokMincovkaTab = GPokMincovkaTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva01pbmNvdmthVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva01pbmNvdmthVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E4RWY7QUE5RUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEVuQjtJQTlFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOEU3QjtRQTlFb0IsV0FBQSxTQUFTO1lBTTFCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQU03QyxjQUFjO29CQUVWLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO29CQUV4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFHLGFBQWEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBR3RFLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7eUJBQzFGLFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsUUFBUSxDQUFDO3lCQUNoQixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFDO3dCQUNyRCxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQzVDLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTOzRCQUUzQixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDOzRCQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFD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XHJcblxyXG5cclxuICBcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tNaW5jb3ZrYVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBtZW5hWmtyOiBzdHJpbmc7XHJcbiAgICAgICAgaXhwRGVuOiBzdHJpbmc7ICAgICBcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJNaW5jb3ZrYVwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCAgZGVmYXVsdEFjdGlvbiA6IHRydWUgfV0pOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJwb2tNaW5jb3ZrYUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthXCIpIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSx7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXN0a2FcIiwgaW5pdGlhbFZhbHVlOiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FzdGthID0gY2hhbmdlT2JqLnZhbHVlOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga29saWtyYXQgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwicG9rTWluY292a2FGb3JtXCIpLmZpbmRGaWVsZHMoXCJrb2xpa3JhdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tNaW5jb3ZrYUZvcm1cIikuZmluZEZpZWxkcyhcImNlbGtlbVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBEZWNpbWFsLm11bChjYXN0a2EhLCBrb2xpa3JhdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbi8vLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIktvbGlrcsOhdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSx7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb2xpa3JhdFwiLCBpbml0aWFsVmFsdWU6IG5ldyBEZWNpbWFsKDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXN0a2EgPSAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInBva01pbmNvdmthRm9ybVwiKS5maW5kRmllbGRzKFwiY2FzdGthXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga29saWtyYXQgPSBjaGFuZ2VPYmoudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwicG9rTWluY292a2FGb3JtXCIpLmZpbmRGaWVsZHMoXCJjZWxrZW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgRGVjaW1hbC5tdWwoY2FzdGthLCBrb2xpa3JhdCEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4vLy5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJDZWxrZW1cIikgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJjZWxrZW1cIiwgZGlzYWJsZWQ6IHRydWUsIGluaXRpYWxWYWx1ZTogbmV3IERlY2ltYWwoMCkgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBjbG9zaW5nXHJcbiAgICAgKi9cclxuICAgICAgICBjbG9zaW5nKCkgeyBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSB0aGlzLmZpbmRGaWVsZHMoKTsgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNhc3RrYSA9IGZpZWxkcy5maW5kRmllbGRzKFwiY2FzdGthXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQga29saWtyYXQgPSBmaWVsZHMuZmluZEZpZWxkcyhcImtvbGlrcmF0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHsgY2FzdGthIDogY2FzdGthLCBrb2xpa3JhdDoga29saWtyYXQgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59Il19