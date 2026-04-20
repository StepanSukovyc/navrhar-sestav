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
            let GAdminSrvsskpDetail = class GAdminSrvsskpDetail extends Gordic.GContentBase {
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
                    that.title = (that.RezimNova == true ? "Nová hodnota " + that.Konfigurace.nazev_skp : "Detail hodnoty " + that.Konfigurace.nazev_skp);
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
                            caption: "Seznam hodnot " + that.Konfigurace.nazev_psk,
                            align: "opposite",
                            visible: that.RezimNova == false,
                            favorite: true,
                            icon: "gi-plus",
                            run: () => {
                                var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminSrvspsk", {
                                    id: 'SeznamPSK#',
                                    Konfigurace: that.Konfigurace,
                                    Ixs_Csp: that.modelSKP.ixs_csp,
                                    Skp_Akc: that.modelSKP.skp_akc
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
                        .addRow(that.Konfigurace.nazev_skp).addField("gstringbox", "w-12", { disabled: !that.RezimNova, name: "skp_akc", validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ min: 1, max: that.Konfigurace.delka_skp, message: "Překročena mximální délka hodnoty" })] })
                        .addRow("Název").addField("gstringbox", "w-12", { disabled: false, name: "nazev" })
                        .addRow("Zkratka").addField("gstringbox", "w-12", { disabled: false, name: "zkratka" })
                        .addRow("Poznámka").addField("gstringbox", "w-12", { disabled: false, name: "poznamka" })
                        .addRow("Aktivita").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", dropdown: true, model: "model.aktivita = value.aktivita", serverFilters: { aktivita: [100, 500] }, validators: [new Gordic.Validators.Required()] });
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
            GAdminSrvsskpDetail = __decorate([
                gcontent
            ], GAdminSrvsskpDetail);
            WebClient.GAdminSrvsskpDetail = GAdminSrvsskpDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2c3NrcERldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZzc2twRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FnSGY7QUFoSEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZ0huQjtJQWhIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ0g3QjtRQWhIb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFFSSxVQUFLLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxtRUFBbUU7b0JBQzdGLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBb0dyRCxDQUFDO2dCQTlGRyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUV0SSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFbEIsS0FBSyxFQUFFOzRCQUNILE9BQU8sRUFBRSxRQUFRLEVBQXVGLEtBQUs7NEJBQzdHLElBQUksRUFBRSxTQUFTLEVBQTRGLFNBQVM7NEJBQ3BILE9BQU8sRUFBRSxJQUFJLEVBQXVGLGlCQUFpQjs0QkFD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QUFxQjtnQkFDckIsT0FBTyxDQUFFLE9BQU87b0JBQ1osSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2xCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQy9CLGdFQUFnRTt3QkFDaEUsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUMzQyxlQUFlOzRCQUNmLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzdELEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBRXJDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBa0MscUNBQXFDO3dCQUMvRyxDQUFDO29CQUNMLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBa0MscUNBQXFDO29CQUN0RyxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBekdZLG1CQUFtQjtnQkFGL0IsUUFBUTtlQUVJLG1CQUFtQixDQXlHL0I7WUF6R1ksNkJBQW1CLHNCQXlHL0IsQ0FBQTtRQUNMLENBQUMsRUFoSG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWdIN0I7SUFBRCxDQUFDLEVBaEhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnSG5CO0FBQUQsQ0FBQyxFQWhIUyxNQUFNLEtBQU4sTUFBTSxRQWdIZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR0FkbWluU3J2c3NrcERldGFpbCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJEZXRhaWwgU2t1cGlueVwiOyAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuICAgICAgICB0YXNrSWQgPSBcImFjdERldGFpbFNLUFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgcHVibGljIG1vZGVsU0tQOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3NrcER0bztcclxuICAgICAgICBwcml2YXRlIFJlemltTm92YTogQm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIEtvbmZpZ3VyYWNlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c2NzcER0bztcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBJbmljaWFsaXphY2UgZm9ybXVsw6HFmWVcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9ICh0aGF0LlJlemltTm92YSA9PSB0cnVlID8gXCJOb3bDoSBob2Rub3RhIFwiICsgdGhhdC5Lb25maWd1cmFjZS5uYXpldl9za3AgOiBcIkRldGFpbCBob2Rub3R5IFwiICsgdGhhdC5Lb25maWd1cmFjZS5uYXpldl9za3ApO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBha2PDrVxyXG5cclxuICAgICAgICAgICAgICAgIGFjdE9LOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPS1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYSBcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgdmlkaXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfU0tQISxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zaW5nKHRydWUpIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9waXNcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYSBcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgdmlkaXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSBzcHVzdGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zaW5nKGZhbHNlKSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFNlem5hbVBvZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2V6bmFtIGhvZG5vdCBcIiArIHRoYXQuS29uZmlndXJhY2UubmF6ZXZfcHNrLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiBcIm9wcG9zaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5SZXppbU5vdmEgPT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9vRGl2ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2c3Bza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnU2V6bmFtUFNLIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgS29uZmlndXJhY2U6IHRoYXQuS29uZmlndXJhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzX0NzcDogdGhhdC5tb2RlbFNLUC5peHNfY3NwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNrcF9Ba2M6IHRoYXQubW9kZWxTS1Auc2twX2FrY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gUCDFmSBpIGQgw6EgdiDDoSBuIMOtICAgYSBrIGMgw60gICBkIG8gICBtIGUgbiB1ICAgYiBhIHIgdVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPSypcIiwgXCJhY3RacnVzaXQqXCJdLCBbXCJhY3RTZXpuYW1Qb2QqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPSywgZmF2b3JpdGU6IHRydWUsIHByaW1hcnk6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPa1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RacnVzaXQsIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacnXFoWl0XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gICAgRm9ybXVsw6HFmSB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBBZG1pbmRldGFpbFBTUEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkFkbWluZGV0YWlsU0tQXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTYtM1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQuS29uZmlndXJhY2UubmF6ZXZfc2twISkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiAhdGhhdC5SZXppbU5vdmEsIG5hbWU6IFwic2twX2FrY1wiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDEsIG1heDogdGhhdC5Lb25maWd1cmFjZS5kZWxrYV9za3AhLCBtZXNzYWdlOiBcIlDFmWVrcm/EjWVuYSBteGltw6FsbsOtIGTDqWxrYSBob2Rub3R5XCIgfSldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBkaXNhYmxlZDogZmFsc2UsIG5hbWU6IFwibmF6ZXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlprcmF0a2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJ6a3JhdGthXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJwb3puYW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWt0aXZpdGFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jYWt0KCksIHsgbmFtZTogXCJha3Rpdml0YVwiLCBkcm9wZG93bjogdHJ1ZSwgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGEgPSB2YWx1ZS5ha3Rpdml0YVwiLCBzZXJ2ZXJGaWx0ZXJzOiB7IGFrdGl2aXRhOiBbMTAwLCA1MDBdIH0sIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdqcy1kZXRhaWxQU1AnPlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBBZG1pbmRldGFpbFBTUEZvcm0sICkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbFNLUCk7XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9TS1AhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBaYXbDrXLDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgIGNsb3NpbmcoIHByb3Zlc3QgKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm92ZXN0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkY0RpdiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jb250ZW50RGl2LnNob3dGbGFzaCh7IGxhYmVsOiAnVWtsYWRhbSBha2NpICcgKyBjaXNsbyB9KTtcclxuICAgICAgICAgICAgICAgIGlmICgkY0Rpdi5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBkdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWxTS1ApO1xyXG4gICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjb25maXJtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHsgZGF0YTogdGhpcy5tb2RlbFNLUCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6YXbDrXLDoW7DrSBwb3PDrWxhbsOhbSB6cMSbdCBvYmpla3RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBkYXRhOiBudWxsIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHphdsOtcsOhbsOtIHBvc8OtbGFuw6FtIHpwxJt0IG9iamVrdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19