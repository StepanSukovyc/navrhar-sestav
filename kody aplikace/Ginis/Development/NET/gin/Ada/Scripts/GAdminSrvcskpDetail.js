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
            let GAdminSrvcskpDetail = class GAdminSrvcskpDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail Skupiny"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actDetailSKP"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.title = (that.RezimNova == true ? "Nová skupina" : "Detail skupiny");
                    that.actions.addRange({
                        actOK: {
                            caption: "Uložit", // OK
                            icon: "gi-save", // ikona 
                            visible: true, // vždy viditelné
                            enabled: that.globals.Param_Administrace_SKP,
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
                    this.actions.addRange({
                        actSeznamPod: {
                            caption: "Seznam podskupin",
                            align: "opposite",
                            visible: that.RezimNova == false,
                            favorite: true,
                            icon: "gi-plus",
                            run: () => {
                                var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminSrvcpsk", {
                                    id: 'SeznamPSK#',
                                    HodnotaNad: that.modelSKP.skp_akce
                                });
                                return;
                            }
                        }
                    });
                    //*******************************************************
                    // P ř i d á v á n í   a k c í   d o   m e n u   b a r u
                    this.menuBar(this.actions.createBar(["actOK*", "actZrusit*"], ["actSeznamPod*"]));
                    this.commandBar([
                        { action: that.actions.actOK, favorite: true, primary: true }, // Ok
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    // *****************************
                    //    Formulář tabu
                    var AdmindetailPSPForm = new Gordic.Forms.Form({ name: "AdmindetailSKP", layoutDescriptor: "L1M1S1 LMS-3-6-3" })
                        .addRow("Skupina").addField("gstringbox", "w-12", { disabled: !that.RezimNova, name: "skp_akce", validators: [new Gordic.Validators.Required()] })
                        .addRow("Název").addField("gstringbox", "w-12", { disabled: false, name: "skp_akce_txt" });
                    $("<div class='js-detailPSP'>").appendTo(that.element).gform("createFrom", AdmindetailPSPForm).findFields().gfield("model", "apply", that.modelSKP);
                    if (!that.globals.Param_Administrace_SKP) {
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
                            $cDiv.findFields().gfield("model", "collect", this.modelSKP);
                            $cDiv.findFields().gfield("confirm");
                            this.close({ data: this.modelSKP }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GAdminSrvcskpDetail = __decorate([
                gcontent
            ], GAdminSrvcskpDetail);
            WebClient.GAdminSrvcskpDetail = GAdminSrvcskpDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2Y3NrcERldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZjc2twRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2R2Y7QUE3R0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNkduQjtJQTdHZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNkc3QjtRQTdHb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFFSSxVQUFLLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxtRUFBbUU7b0JBQzdGLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBaUdyRCxDQUFDO2dCQTVGRyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUUxRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFbEIsS0FBSyxFQUFFOzRCQUNILE9BQU8sRUFBRSxRQUFRLEVBQXVGLEtBQUs7NEJBQzdHLElBQUksRUFBRSxTQUFTLEVBQTRGLFNBQVM7NEJBQ3BILE9BQU8sRUFBRSxJQUFJLEVBQXVGLGlCQUFpQjs0QkFDckgsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXVCOzRCQUM3QyxHQUFHLEVBQUU7Z0NB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cmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5TcnZjc2twRGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIkRldGFpbCBTa3VwaW55XCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0RGV0YWlsU0tQXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBwdWJsaWMgbW9kZWxTS1A6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZjc2twRHRvO1xyXG4gICAgICAgIHByaXZhdGUgUmV6aW1Ob3ZhOiBCb29sZWFuO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEluaWNpYWxpemFjZSBmb3JtdWzDocWZZVxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gKHRoYXQuUmV6aW1Ob3ZhID09IHRydWUgPyBcIk5vdsOhIHNrdXBpbmFcIiA6IFwiRGV0YWlsIHNrdXBpbnlcIik7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGFrY8OtXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T0s6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9LXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9TS1AhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcodHJ1ZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHNwdXN0aXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcoZmFsc2UpIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0U2V6bmFtUG9kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTZXpuYW0gcG9kc2t1cGluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwib3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LlJlemltTm92YSA9PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZjcHNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTZXpuYW1QU0sjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIb2Rub3RhTmFkOiB0aGF0Lm1vZGVsU0tQLnNrcF9ha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vIFAgxZkgaSBkIMOhIHYgw6EgbiDDrSAgIGEgayBjIMOtICAgZCBvICAgbSBlIG4gdSAgIGIgYSByIHVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T0sqXCIsIFwiYWN0WnJ1c2l0KlwiXSwgW1wiYWN0U2V6bmFtUG9kKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T0ssIGZhdm9yaXRlOiB0cnVlLCBwcmltYXJ5OiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2tcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWnJ1xaFpdFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgICBGb3JtdWzDocWZIHRhYnVcclxuICAgICAgICAgICAgdmFyIEFkbWluZGV0YWlsUFNQRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiQWRtaW5kZXRhaWxTS1BcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtNi0zXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTa3VwaW5hXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBkaXNhYmxlZDogIXRoYXQuUmV6aW1Ob3ZhLCBuYW1lOiBcInNrcF9ha2NlXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6F6ZXZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJza3BfYWtjZV90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J2pzLWRldGFpbFBTUCc+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEFkbWluZGV0YWlsUFNQRm9ybSwgKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsU0tQKTtcclxuICAgICAgICAgICAgaWYgKCF0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1NLUCEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFphdsOtcsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgY2xvc2luZyggcHJvdmVzdCApIHtcclxuICAgICAgICAgICAgaWYgKHByb3Zlc3QgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNvbnRlbnREaXYuc2hvd0ZsYXNoKHsgbGFiZWw6ICdVa2xhZGFtIGFrY2kgJyArIGNpc2xvIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbFNLUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcImNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBkYXRhOiB0aGlzLm1vZGVsU0tQIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHphdsOtcsOhbsOtIHBvc8OtbGFuw6FtIHpwxJt0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IG51bGwgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=