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
            let GAdminSrvsmsaDetail = class GAdminSrvsmsaDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail masky Akce X ORG"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actDetailMSA"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.title = (that.RezimNova == true ? "Nová hodnota " : "Detail hodnoty ");
                    that.taskId = "actDetailMSA"; // označení položky v taskListu
                    that.actions.addRange({
                        actOK: {
                            caption: "Uložit", // OK
                            icon: "gi-save", // ikona 
                            visible: true, // vždy viditelné
                            enabled: (that.RezimEditace == true),
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
                    this.menuBar(this.actions.createBar(["actOK*", "actZrusit*"]));
                    this.commandBar([
                        { action: that.actions.actOK, favorite: true, primary: true }, // Ok
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    // *****************************
                    //    Formulář tabu
                    var AdminDetailMSAForm = new Gordic.Forms.Form({ name: "AdminDetailEDS", layoutDescriptor: "L1M1S1 LMS-3-6-3" });
                    AdminDetailMSAForm
                        .addRow("IČ").addField("gstringbox", "w-12", { disabled: true, name: "ico" })
                        .addRow("Kategorie").addField("gselectbox", Gordic.Prefabs.Select.srvckta(), {
                        model: "model.ktg_akce = value.ktg_akce",
                        disabled: false,
                        name: "ktg_akce",
                        dropdown: true,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Rok od").addField("gnumberbox", "w-12", { disabled: false, name: "rok_od", validators: [new Gordic.Validators.Required()] })
                        .addRow("Rok do").addField("gnumberbox", "w-12", { disabled: false, name: "rok_do", validators: [new Gordic.Validators.Required()] })
                        .addRow("Maska").addField("gstringbox", "w-12", { disabled: false, name: "te1_msk", validators: [new Gordic.Validators.Required()] });
                    $("<div class='js-detailMSA'>").appendTo(that.element).gform("createFrom", AdminDetailMSAForm).findFields().gfield("model", "apply", that.modelMSA);
                    if ((that.RezimNova == false)) {
                        that.findFields("rok_od, ktg_akce").gfield("option", "disabled", true);
                    }
                    if ((that.RezimEditace == undefined) || (that.RezimEditace == false)) {
                        that.findFields().gfield("option", "disabled", true);
                    }
                }
                ;
                //---------------------------------------------------------------
                // Zavírání formuláře
                closing(provest) {
                    var that = this;
                    if (provest == true) {
                        var $cDiv = $(this.contentDiv);
                        //this.contentDiv.showFlash({ label: 'Ukladam akci ' + cislo });
                        if ($cDiv.findForms().gform("isValid", true)) {
                            //var dto = {};
                            $cDiv.findFields().gfield("model", "collect", this.modelMSA);
                            $cDiv.findFields().gfield("confirm");
                            this.close({ data: this.modelMSA }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GAdminSrvsmsaDetail = __decorate([
                gcontent
            ], GAdminSrvsmsaDetail);
            WebClient.GAdminSrvsmsaDetail = GAdminSrvsmsaDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2c21zYURldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZzbXNhRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyR2Y7QUEzR0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkduQjtJQTNHZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMkc3QjtRQTNHb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFFSSxVQUFLLEdBQUcseUJBQXlCLENBQUMsQ0FBQyxtRUFBbUU7b0JBQ3RHLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBK0ZyRCxDQUFDO2dCQXpGRyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLCtCQUErQjtvQkFFN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLEtBQUssRUFBRTs0QkFDSCxPQUFPLEVBQUUsUUFBUSxFQUF1RixLQUFLOzRCQUM3RyxJQUFJLEVBQUUsU0FBUyxFQUE0RixTQUFTOzRCQUNwSCxPQUFPLEVBQUUsSUFBSSxFQUF1RixpQkFBaUI7NEJBQ3JILE9BQU8sRUFB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QU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFFckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFrQyxxQ0FBcUM7d0JBQy9HLENBQUM7b0JBQ0wsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFrQyxxQ0FBcUM7b0JBQ3RHLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFwR1ksbUJBQW1CO2dCQUYvQixRQUFRO2VBRUksbUJBQW1CLENBb0cvQjtZQXBHWSw2QkFBbUIsc0JBb0cvQixDQUFBO1FBQ0wsQ0FBQyxFQTNHb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMkc3QjtJQUFELENBQUMsRUEzR2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJHbkI7QUFBRCxDQUFDLEVBM0dTLE1BQU0sS0FBTixNQUFNLFFBMkdmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5TcnZzbXNhRGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIkRldGFpbCBtYXNreSBBa2NlIFggT1JHXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0RGV0YWlsTVNBXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBwdWJsaWMgbW9kZWxNU0E6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzbXNhRHRvO1xyXG4gICAgICAgIHByaXZhdGUgUmV6aW1Ob3ZhOiBCb29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgUmV6aW1FZGl0YWNlOiBCb29sZWFuO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEluaWNpYWxpemFjZSBmb3JtdWzDocWZZVxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9ICh0aGF0LlJlemltTm92YSA9PSB0cnVlID8gXCJOb3bDoSBob2Rub3RhIFwiIDogXCJEZXRhaWwgaG9kbm90eSBcIik7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3REZXRhaWxNU0FcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBha2PDrVxyXG4gICAgICAgICAgICAgICAgYWN0T0s6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9LXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoYXQuUmV6aW1FZGl0YWNlID09IHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2l0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHZpZGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgc3B1c3RpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2luZyhmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vIFAgxZkgaSBkIMOhIHYgw6EgbiDDrSAgIGEgayBjIMOtICAgZCBvICAgbSBlIG4gdSAgIGIgYSByIHVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T0sqXCIsIFwiYWN0WnJ1c2l0KlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T0ssIGZhdm9yaXRlOiB0cnVlLCBwcmltYXJ5OiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2tcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWnJ1xaFpdFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgICBGb3JtdWzDocWZIHRhYnVcclxuICAgICAgICAgICAgdmFyIEFkbWluRGV0YWlsTVNBRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiQWRtaW5EZXRhaWxFRFNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtNi0zXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBBZG1pbkRldGFpbE1TQUZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJxIxcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImljb1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3J2Y2t0YSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX2FrY2UgPSB2YWx1ZS5rdGdfYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX2FrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlJvayBvZFwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInJva19vZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUm9rIGRvXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgeyBkaXNhYmxlZDogZmFsc2UsIG5hbWU6IFwicm9rX2RvXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJNYXNrYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInRlMV9tc2tcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdqcy1kZXRhaWxNU0EnPlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBBZG1pbkRldGFpbE1TQUZvcm0sKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsTVNBKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhhdC5SZXppbU5vdmEgPT0gZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJyb2tfb2QsIGt0Z19ha2NlXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuUmV6aW1FZGl0YWNlID09IHVuZGVmaW5lZCkgfHwgKHRoYXQuUmV6aW1FZGl0YWNlID09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gWmF2w61yw6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICBjbG9zaW5nKHByb3Zlc3QpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAocHJvdmVzdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNEaXYgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY29udGVudERpdi5zaG93Rmxhc2goeyBsYWJlbDogJ1VrbGFkYW0gYWtjaSAnICsgY2lzbG8gfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGNEaXYuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgZHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsTVNBKTtcclxuICAgICAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY29uZmlybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IHRoaXMubW9kZWxNU0EgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHsgZGF0YTogbnVsbCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6YXbDrXLDoW7DrSBwb3PDrWxhbsOhbSB6cMSbdCBvYmpla3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==