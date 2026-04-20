"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAdminPolozkySdPDetail = class GAdminPolozkySdPDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail SdP"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actDetailSdP"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.title = (that.RezimNova == true ? "Nová položka SdP" : "Detail položky SdP");
                    that.actions.addRange({
                        actOK: {
                            caption: "Uložit", // OK
                            icon: "gi-save", // ikona 
                            visible: true, // vždy viditelné
                            enabled: that.globals.Param_Administrace_PSP,
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
                    this.menuBar([
                        { action: that.actions.actOK, favorite: true, primary: true }, // Ok
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    this.commandBar([
                        { action: that.actions.actOK, favorite: true, primary: true }, // Ok
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    // *****************************
                    //    Formulář tabu
                    var AdmindetailPSPForm = new Gordic.Forms.Form({ name: "AdmindetailPSP", layoutDescriptor: "L1M1S1 LMS-3-6-3" })
                        .addRow("Položka SdP").addField("gstringbox", "w-12", { disabled: !that.RezimNova, name: "id_psp", validators: [new Gordic.Validators.Required()] })
                        .addRow("Název").addField("gstringbox", "w-12", { disabled: false, name: "nazev" })
                        .addRow("Zkratka").addField("gstringbox", "w-12", { disabled: false, name: "zkratka" })
                        .addRow("Poznámka").addField("gstringbox", "w-12", { disabled: false, name: "poznamka" })
                        .addRow("Aktivita").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", dropdown: true, model: "model.aktivita = value.aktivita", serverFilters: { aktivita: [100, 500] }, validators: [new Gordic.Validators.Required()] });
                    $("<div class='js-detailPSP'>").appendTo(that.element).gform("createFrom", AdmindetailPSPForm).findFields().gfield("model", "apply", that.modelPSP);
                    if (!that.globals.Param_Administrace_PSP) {
                        that.findFields().gfield("option", "disabled", true);
                    }
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
                            $cDiv.findFields().gfield("model", "collect", this.modelPSP);
                            $cDiv.findFields().gfield("confirm");
                            this.close({ data: this.modelPSP }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GAdminPolozkySdPDetail = __decorate([
                gcontent
            ], GAdminPolozkySdPDetail);
            WebClient.GAdminPolozkySdPDetail = GAdminPolozkySdPDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluUG9sb3preVNkUERldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5Qb2xvemt5U2RQRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2RmY7QUE3RkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNkZuQjtJQTdGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNkY3QjtRQTdGb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXhEOztvQkFFSSxVQUFLLEdBQUcsWUFBWSxDQUFDLENBQUMsbUVBQW1FO29CQUN6RixXQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsK0JBQStCO29CQUVoRCxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQWlGckQsQ0FBQztnQkE1RUcsaUVBQWlFO2dCQUNqRSx5QkFBeUI7Z0JBQ3pCLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUVsRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFbEIsS0FBSyxFQUFFOzRCQUNILE9BQU8sRUFBRSxRQUFRLEVBQXVGLEtBQUs7NEJBQzdHLElBQUksRUFBRSxTQUFTLEVBQTRGLFNBQVM7NEJBQ3BILE9BQU8sRUFBRSxJQUFJLEVBQXVGLGlCQUFpQjs0QkFDckgsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXVCOzRCQUM3QyxHQUFHLEVB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Q0FBQTtZQXRGWSxzQkFBc0I7Z0JBRmxDLFFBQVE7ZUFFSSxzQkFBc0IsQ0FzRmxDO1lBdEZZLGdDQUFzQix5QkFzRmxDLENBQUE7UUFDTCxDQUFDLEVBN0ZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2RjdCO0lBQUQsQ0FBQyxFQTdGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNkZuQjtBQUFELENBQUMsRUE3RlMsTUFBTSxLQUFOLE1BQU0sUUE2RmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdBZG1pblBvbG96a3lTZFBEZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiRGV0YWlsIFNkUFwiOyAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuICAgICAgICB0YXNrSWQgPSBcImFjdERldGFpbFNkUFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgcHVibGljIG1vZGVsUFNQOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3BzcER0bztcclxuICAgICAgICBwcml2YXRlIFJlemltTm92YTogQm9vbGVhbjtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBJbmljaWFsaXphY2UgZm9ybXVsw6HFmWVcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9ICh0aGF0LlJlemltTm92YSA9PSB0cnVlID8gXCJOb3bDoSBwb2xvxb5rYSBTZFBcIiA6IFwiRGV0YWlsIHBvbG/Fvmt5IFNkUFwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gYWtjw61cclxuXHJcbiAgICAgICAgICAgICAgICBhY3RPSzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT0tcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHZpZGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1BTUCEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2luZyh0cnVlKSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2l0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHZpZGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgc3B1c3RpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2luZyhmYWxzZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyBQIMWZIGkgZCDDoSB2IMOhIG4gw60gICBhIGsgYyDDrSAgIGQgbyAgIG0gZSBuIHUgICBiIGEgciB1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9LLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFpydXNpdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpydcWhaXRcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9LLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFpydXNpdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpydcWhaXRcclxuICAgICAgICAgICAgXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gICAgRm9ybXVsw6HFmSB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBBZG1pbmRldGFpbFBTUEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkFkbWluZGV0YWlsUFNQXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTYtM1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9sb8W+a2EgU2RQXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBkaXNhYmxlZDogIXRoYXQuUmV6aW1Ob3ZhLCBuYW1lOiBcImlkX3BzcFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBkaXNhYmxlZDogZmFsc2UsIG5hbWU6IFwibmF6ZXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlprcmF0a2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJ6a3JhdGthXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJwb3puYW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWt0aXZpdGFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jYWt0KCksIHsgbmFtZTogXCJha3Rpdml0YVwiLCBkcm9wZG93bjogdHJ1ZSwgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGEgPSB2YWx1ZS5ha3Rpdml0YVwiLCBzZXJ2ZXJGaWx0ZXJzOiB7IGFrdGl2aXRhOiBbMTAwLCA1MDBdIH0sIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdqcy1kZXRhaWxQU1AnPlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBBZG1pbmRldGFpbFBTUEZvcm0gKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsUFNQKTtcclxuICAgICAgICAgICAgaWYgKCF0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1BTUCEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFphdsOtcsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgY2xvc2luZyggcHJvdmVzdCApIHtcclxuICAgICAgICAgICAgaWYgKHByb3Zlc3QgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNvbnRlbnREaXYuc2hvd0ZsYXNoKHsgbGFiZWw6ICdVa2xhZGFtIGFrY2kgJyArIGNpc2xvIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbFBTUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcImNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBkYXRhOiB0aGlzLm1vZGVsUFNQIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHphdsOtcsOhbsOtIHBvc8OtbGFuw6FtIHpwxJt0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IG51bGwgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=