"use strict";
/**
 * Zadání identifikátoru
 *
 * @author Vojtěch Čech
 * @date 16.01.2025
 */
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
            let GIdentifikator = class GIdentifikator extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = `Zadání identifikátoru`;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formDatumu", layoutDescriptor: "L1M1S1" })
                        .addRow()
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp"
                    }));
                }
                ok() {
                    var ixp = this.form.findFields("ixp").gfield("getValue");
                    this.close({ ixp: ixp });
                }
            };
            GIdentifikator = __decorate([
                Decorators.gcontent
            ], GIdentifikator);
            WebClient.GIdentifikator = GIdentifikator;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0lkZW50aWZpa2F0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHSWRlbnRpZmlrYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7Ozs7QUFFSCxJQUFVLE1BQU0sQ0EwQ2Y7QUExQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMENuQjtJQTFDZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMEM3QjtRQTFDb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBSTVDLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDO29CQUVyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBRVIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxhQUFhOzRCQUNuQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNsQyxDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckMsQ0FBQztxQkFDTCxDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWxFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDNUQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7eUJBQ3BFLE1BQU0sRUFBRTt5QkFDUixRQUFRLENBQUMsWUFBWSxFQUFFLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlDLElBQUksRUFBRSxLQUFLO3FCQUNkLENBQUMsQ0FDVCxDQUFDO2dCQUNOLENBQUM7Z0JBRUQsRUFBRTtvQkFDRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDN0IsQ0FBQzthQUNKLENBQUE7WUF2Q1ksY0FBYztnQkFEMUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxjQUFjLENBdUMxQjtZQXZDWSx3QkFBYyxpQkF1QzFCLENBQUE7UUFDTCxDQUFDLEVBMUNvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEwQzdCO0lBQUQsQ0FBQyxFQTFDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMENuQjtBQUFELENBQUMsRUExQ1MsTUFBTSxLQUFOLE1BQU0sUUEwQ2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogWmFkw6Fuw60gaWRlbnRpZmlrw6F0b3J1XHJcbiAqIFxyXG4gKiBAYXV0aG9yIFZvanTEm2NoIMSMZWNoXHJcbiAqIEBkYXRlIDE2LjAxLjIwMjVcclxuICovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHSWRlbnRpZmlrYXRvciBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYFphZMOhbsOtIGlkZW50aWZpa8OhdG9ydWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybURhdHVtdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIGl4cCA9IHRoaXMuZm9ybS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHsgaXhwOiBpeHAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19