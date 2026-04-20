"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /**Dialog s detailem platby na kterou byla párována položka výpisu */
            let GParovanoDetail = class GParovanoDetail extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        })
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit!"]));
                }
                /**Vytvoření formuláře*/
                createForm() {
                    var form = new Gordic.Forms.Form({
                        name: "formParovano",
                        layoutDescriptor: "L1M1S1"
                    })
                        .addRow("Identifikátor")
                        .addField("gstringbox", {
                        name: "ixp_par",
                        disabled: true
                    })
                        .addRow("Agenda")
                        .addField("gstringbox", {
                        name: "agenda",
                        disabled: true
                    })
                        .addRow("Agendové číslo")
                        .addField("gstringbox", {
                        name: "ac",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "Nazev" : "Stav dokladu")
                        .addField("gstringbox", {
                        name: "nazev",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "IČO" : "Číslo účetního dokladu")
                        .addField("gstringbox", {
                        name: "ico",
                        disabled: true
                    });
                    if (this.s_pol < 30) {
                        form.addRow("Způsob úhrady")
                            .addField("gstringbox", {
                            name: "uhrada",
                            disabled: true
                        });
                    }
                    if (this.s_pol != 30) {
                        form.addRow("VS")
                            .addField("gstringbox", {
                            name: "vs",
                            disabled: true
                        });
                    }
                    form.addRow("Částka")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c",
                        disabled: true
                    })
                        .addRow("Párováno")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_par",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "Datum splatnosti" : "Datum likvidace")
                        .addField("gdatebox", {
                        name: "dat_spl",
                        disabled: true
                    })
                        .addRow((this.s_pol < 30) ? "Datum zaplacení" : "Datum zaúčtování")
                        .addField("gdatebox", {
                        name: "dat_zap",
                        disabled: true
                    });
                    if (this.s_pol < 30) {
                        form.addRow("Datum párování")
                            .addField("gdatebox", {
                            name: "dat_par",
                            disabled: true
                        });
                    }
                    $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
            };
            GParovanoDetail = __decorate([
                Decorators.gcontent
            ], GParovanoDetail);
            WebClient.GParovanoDetail = GParovanoDetail;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bhcm92YW5vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bhcm92YW5vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxJQUFVLE1BQU0sQ0F1SGY7QUF2SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdUhuQjtJQXZIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdUg3QjtRQXZIb0IsV0FBQSxTQUFTO1lBQzFCLHFFQUFxRTtZQUVyRSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFjN0MsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsNEJBQTRCO2dCQUNwQixnQkFBZ0I7b0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBRUQsd0JBQXdCO2dCQUNoQixVQUFVO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FB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Q0FBQztvQkFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7NkJBQ3hCLFFBQVEsQ0FBQyxVQUFVLEVBQUU7NEJBQ2xCLElBQUksRUFBRSxTQUFTOzRCQUNmLFFBQVEsRUFBRSxJQUFJO3lCQUNqQixDQUFDLENBQUE7b0JBQ1YsQ0FBQztvQkFFRCxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxDQUFDO2FBQ0osQ0FBQTtZQW5IWSxlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0FtSDNCO1lBbkhZLHlCQUFlLGtCQW1IM0IsQ0FBQTtRQUNMLENBQUMsRUF2SG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVIN0I7SUFBRCxDQUFDLEVBdkhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1SG5CO0FBQUQsQ0FBQyxFQXZIUyxNQUFNLEtBQU4sTUFBTSxRQXVIZiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKkRpYWxvZyBzIGRldGFpbGVtIHBsYXRieSBuYSBrdGVyb3UgYnlsYSBww6Fyb3bDoW5hIHBvbG/FvmthIHbDvXBpc3UgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bhcm92YW5vRGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKipJZGVudGlmaWvDoXRvciBuYXDDoXJvdmFuw6lobyBkb2tsYWR1Ki9cclxuICAgICAgICBwdWJsaWMgaXhwX3Bhcjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiDEjMOtc2xvIMWZw6Fka3UgbmFww6Fyb3ZhbsOpaG8gZG9rbGFkdSovXHJcbiAgICAgICAgcHVibGljIGNpc2xvX3BhcjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBTdGF2IHBvbG/Fvmt5Ki9cclxuICAgICAgICBwdWJsaWMgc19wb2w6IG51bWJlcjtcclxuICAgICAgICAvKiogxIzDoXN0a2EqL1xyXG4gICAgICAgIHB1YmxpYyBjOiBzdHJpbmdcclxuXHJcbiAgICAgICAgLy9Db250ZW50VmFsdWVzXHJcbiAgICAgICAgLyoqIERhdGEgZGV0YWlsdSBww6Fyb3bDoW7DrSovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdCFcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlZ5dHZvxZllbsOtIGZvcm11bMOhxZllKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybVBhcm92YW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWdlbmRhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFnZW5kYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFnZW5kb3bDqSDEjcOtc2xvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCh0aGlzLnNfcG9sIDwgMzApID8gXCJOYXpldlwiIDogXCJTdGF2IGRva2xhZHVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKHRoaXMuc19wb2wgPCAzMCkgPyBcIknEjE9cIiA6IFwixIzDrXNsbyDDusSNZXRuw61obyBkb2tsYWR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc19wb2wgPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJacMWvc29iIMO6aHJhZHlcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1aHJhZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zX3BvbCAhPSAzMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJWU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyhcIsSMw6FzdGthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMOhcm92w6Fub1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKHRoaXMuc19wb2wgPCAzMCkgPyBcIkRhdHVtIHNwbGF0bm9zdGlcIiA6IFwiRGF0dW0gbGlrdmlkYWNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCh0aGlzLnNfcG9sIDwgMzApID8gXCJEYXR1bSB6YXBsYWNlbsOtXCIgOiBcIkRhdHVtIHphw7rEjXRvdsOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfemFwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zX3BvbCA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcIkRhdHVtIHDDoXJvdsOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==