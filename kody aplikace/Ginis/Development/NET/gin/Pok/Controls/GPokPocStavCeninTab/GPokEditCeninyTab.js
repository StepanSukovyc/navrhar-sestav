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
            let GPokEditCeninyTab = class GPokEditCeninyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "pokEditCeninyForm" })
                        .addSection()
                        .addRow("jres:31302140", true) //RC 31302140 : Množství)
                        .addField("gnumberbox", {
                        name: "m",
                        initialValue: this.mnozstvi,
                        change: function (ev, changeObj) {
                            var mnozstvi = that.element.findForms("pokEditCeninyForm").findFields("m").gfield("getValue");
                            var hodnota = that.element.findForms("pokEditCeninyForm").findFields("mjm").gfield("getValue");
                            that.element.findForms("pokEditCeninyForm").findFields("celk_hodnota").gfield("setValue", Decimal.mul(hodnota, mnozstvi));
                        }
                    })
                        .addRow("jres:31302291", true) //RC 31302291 : Hodnota
                        .addField("gnumberbox", {
                        name: "mjm",
                        initialValue: this.hodnota,
                        disabled: !that.edit,
                        change: function (ev, changeObj) {
                            var mnozstvi = that.element.findForms("pokEditCeninyForm").findFields("m").gfield("getValue");
                            var hodnota = that.element.findForms("pokEditCeninyForm").findFields("mjm").gfield("getValue");
                            that.element.findForms("pokEditCeninyForm").findFields("celk_hodnota").gfield("setValue", Decimal.mul(hodnota, mnozstvi));
                        }
                    })
                        .addRow("jres:31302292") //RC 31302292 : Celková hodnota
                        .addField("gnumberbox", { name: "celk_hodnota", disabled: true, initialValue: Decimal.mul(this.mnozstvi, this.hodnota) });
                    var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    that.actions.addRange({
                        actUlozit: {
                            caption: "jres:31302277", //RC 31302277 : Uložit
                            icon: "gi-save",
                            run: function (ev, ctx) {
                                that.ulozitDetail();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actUlozit, favorite: true }
                    ]);
                    //that.element.findForms("pokEditCeninyForm").findFields("mnozstvi").gfield("setValue", this.mnozstvi);
                    // that.element.findForms("pokEditCeninyForm").findFields("hodnota").gfield("setValue", this.hodnota);
                    // that.element.findForms("pokEditCeninyForm").findFields("celk_hodnota").gfield("setValue", Decimal.mul(this.mnozstvi,this.hodnota));
                }
                uloz(params) {
                    var that = this;
                    return Gordic.Isl.PokKniha.zalozUpravCenina(rq => { return { data: params }; })
                        .get()
                        .done(function (ret) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Změny úspěšně uloženy!");
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (typ === "exception" && obj.data.member == "PrepsatExistujiciCeniny") {
                            obj.handled = true;
                            return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si ceniny přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistujiciCeniny = false, { confirm: true })); });
                        }
                    });
                }
                ulozitDetail() {
                    var that = this;
                    var dto = {};
                    that.findFields().gfield("model", "collect", dto);
                    dto.ixp_den = that.ixpDen;
                    dto.KontrolaExistujiciCeniny = that.edit;
                    dto.aktivita = that.aktivitaZaznamu;
                    var edit = this.findForms().gform("hasChanged");
                    if (edit || that.aktivitaZaznamu == 900) { // něco sez měnilo nebo je záznam zrušen, tím ho zase zaaktivním
                        that.uloz(dto);
                    }
                    else {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Žádné údaje se nezměnily, není nutné nic ukládat!");
                    }
                }
            };
            GPokEditCeninyTab = __decorate([
                Decorators.gcontent
            ], GPokEditCeninyTab);
            WebClient.GPokEditCeninyTab = GPokEditCeninyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0VkaXRDZW5pbnlUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rRWRpdENlbmlueVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBd0hmO0FBeEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdIbkI7SUF4SGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdIN0I7UUF4SG9CLFdBQUEsU0FBUztZQUcxQixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBWTtnQkFXL0MsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFHLGFBQWEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRXRFLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQzt5QkFDaEUsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMseUJBQXlCO3lCQUN2RCxRQUFRLENBQUMsWUFBWSxFQUFDO3dCQUNuQixJQUFJLEVBQUUsR0FBRzt3QkFDVCxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQzNCLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTOzRCQUUzQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsVUFBVSxD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SUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsZ0VBQWdFO3dCQUV2RyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixDQUFDO3lCQUNJLENBQUM7d0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxtREFBbUQsQ0FBQyxDQUFDO29CQUMvRyxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBcEhZLGlCQUFpQjtnQkFEN0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxpQkFBaUIsQ0FvSDdCO1lBcEhZLDJCQUFpQixvQkFvSDdCLENBQUE7UUFDTCxDQUFDLEVBeEhvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF3SDdCO0lBQUQsQ0FBQyxFQXhIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBd0huQjtBQUFELENBQUMsRUF4SFMsTUFBTSxLQUFOLE1BQU0sUUF3SGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0VkaXRDZW5pbnlUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuXHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGVkaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJpdmF0ZSBtbm96c3R2aTogRGVjaW1hbDtcclxuICAgICAgICBwcml2YXRlIGhvZG5vdGE6IERlY2ltYWw7XHJcbiAgICAgICAgcHJpdmF0ZSBha3Rpdml0YVphem5hbXU6IG51bWJlcjtcclxuICAgICAgICBpeHBEZW46IHN0cmluZztcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCAgZGVmYXVsdEFjdGlvbiA6IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInBva0VkaXRDZW5pbnlGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMTQwXCIsIHRydWUpIC8vUkMgMzEzMDIxNDAgOiBNbm/FvnN0dsOtKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1cIiwgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMubW5venN0dmksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ub3pzdHZpID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInBva0VkaXRDZW5pbnlGb3JtXCIpLmZpbmRGaWVsZHMoXCJtXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaG9kbm90YSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tFZGl0Q2VuaW55Rm9ybVwiKS5maW5kRmllbGRzKFwibWptXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInBva0VkaXRDZW5pbnlGb3JtXCIpLmZpbmRGaWVsZHMoXCJjZWxrX2hvZG5vdGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgRGVjaW1hbC5tdWwoaG9kbm90YSxtbm96c3R2aSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjI5MVwiLHRydWUpIC8vUkMgMzEzMDIyOTEgOiBIb2Rub3RhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIse1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWptXCIsICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5ob2Rub3RhLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5lZGl0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtbm96c3R2aSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tFZGl0Q2VuaW55Rm9ybVwiKS5maW5kRmllbGRzKFwibVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvZG5vdGEgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwicG9rRWRpdENlbmlueUZvcm1cIikuZmluZEZpZWxkcyhcIm1qbVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJwb2tFZGl0Q2VuaW55Rm9ybVwiKS5maW5kRmllbGRzKFwiY2Vsa19ob2Rub3RhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIERlY2ltYWwubXVsKGhvZG5vdGEsbW5venN0dmkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMjkyXCIpIC8vUkMgMzEzMDIyOTIgOiBDZWxrb3bDoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJjZWxrX2hvZG5vdGFcIiwgZGlzYWJsZWQ6IHRydWUsIGluaXRpYWxWYWx1ZTogRGVjaW1hbC5tdWwodGhpcy5tbm96c3R2aSwgdGhpcy5ob2Rub3RhKSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGhlYWRlckZvcm0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RVbG96aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIyNzdcIiwvL1JDIDMxMzAyMjc3IDogVWxvxb5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96aXREZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VWxveml0LCBmYXZvcml0ZTogdHJ1ZSB9ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwicG9rRWRpdENlbmlueUZvcm1cIikuZmluZEZpZWxkcyhcIm1ub3pzdHZpXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoaXMubW5venN0dmkpO1xyXG4gICAgICAgICAgLy8gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInBva0VkaXRDZW5pbnlGb3JtXCIpLmZpbmRGaWVsZHMoXCJob2Rub3RhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoaXMuaG9kbm90YSk7XHJcbiAgICAgICAgICAvLyB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwicG9rRWRpdENlbmlueUZvcm1cIikuZmluZEZpZWxkcyhcImNlbGtfaG9kbm90YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBEZWNpbWFsLm11bCh0aGlzLm1ub3pzdHZpLHRoaXMuaG9kbm90YSkpO1xyXG5cclxuICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96KHBhcmFtczogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0NlbmlueUR0bykge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuUG9rS25paGEuemFsb3pVcHJhdkNlbmluYShycSA9PiB7IHJldHVybiB7IGRhdGE6IHBhcmFtcyB9fSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hTdWNjZXNzKHRoYXQsIFwiWm3Em255IMO6c3DEm8WhbsSbIHVsb8W+ZW55IVwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIiAmJiBvYmouZGF0YS5tZW1iZXIgPT0gXCJQcmVwc2F0RXhpc3R1amljaUNlbmlueVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKG9iai5iYXNlTWVzc2FnZSArIFwiPC9icj4gUMWZZWpldGUgc2kgY2VuaW55IHDFmWVwc2F0P1wiKS5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhhdC51bG96KCQuZXh0ZW5kKHBhcmFtcyAsIHBhcmFtcy5Lb250cm9sYUV4aXN0dWppY2lDZW5pbnkgPSBmYWxzZSwgeyBjb25maXJtOiB0cnVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVsb3ppdERldGFpbCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkdG86IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tDZW5pbnlEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgZHRvLml4cF9kZW4gPSB0aGF0Lml4cERlbjtcclxuICAgICAgICAgICAgZHRvLktvbnRyb2xhRXhpc3R1amljaUNlbmlueSA9IHRoYXQuZWRpdDtcclxuICAgICAgICAgICAgZHRvLmFrdGl2aXRhID0gdGhhdC5ha3Rpdml0YVphem5hbXU7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWRpdCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVkaXQgfHwgdGhhdC5ha3Rpdml0YVphem5hbXUgPT0gOTAwKSB7IC8vIG7Em2NvIHNleiBtxJtuaWxvIG5lYm8gamUgesOhem5hbSB6cnXFoWVuLCB0w61tIGhvIHphc2UgemFha3Rpdm7DrW1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnVsb3ooZHRvKTsgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCLFvcOhZG7DqSDDumRhamUgc2UgbmV6bcSbbmlseSwgbmVuw60gbnV0bsOpIG5pYyB1a2zDoWRhdCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=