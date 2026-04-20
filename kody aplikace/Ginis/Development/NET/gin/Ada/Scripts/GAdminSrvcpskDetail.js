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
            let GAdminSrvcpskDetail = class GAdminSrvcpskDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail podskupiny"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actDetailPSK"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.title = (that.RezimNova == true ? "Nová podskupina" : "Detail podskupiny");
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
                    var AdmindetailPSPForm = new Gordic.Forms.Form({ name: "AdmindetailSKP", layoutDescriptor: "L1M1S1 LMS-3-6-3" })
                        .addRow("Skupina").addField("gstringbox", "w-12", { disabled: true, name: "skp_akce" })
                        .addRow("Podskupina").addField("gstringbox", "w-12", { disabled: !that.RezimNova, name: "psk_akce", validators: [new Gordic.Validators.Required()] })
                        .addRow("Název").addField("gstringbox", "w-12", { disabled: false, name: "psk_akce_txt" });
                    $("<div class='js-detailPSP'>").appendTo(that.element).gform("createFrom", AdmindetailPSPForm).findFields().gfield("model", "apply", that.modelPSK);
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
                            $cDiv.findFields().gfield("model", "collect", this.modelPSK);
                            $cDiv.findFields().gfield("confirm");
                            this.close({ data: this.modelPSK }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GAdminSrvcpskDetail = __decorate([
                gcontent
            ], GAdminSrvcpskDetail);
            WebClient.GAdminSrvcpskDetail = GAdminSrvcpskDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2Y3Bza0RldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZjcHNrRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyRmY7QUEzRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkZuQjtJQTNGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMkY3QjtRQTNGb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFFSSxVQUFLLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxtRUFBbUU7b0JBQ2hHLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBK0VyRCxDQUFDO2dCQTFFRyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBRWhGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUVsQixLQUFLLEVBQUU7NEJBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBdUYsS0FBSzs0QkFDN0csSUFBSSxFQUFFLFNBQVMsRUFBNEYsU0FBUzs0QkFDcEgsT0FBTyxFQUFFLElBQUksRUFBdUYsaUJBQWlCOzRCQUNySCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBdUI7NEJBQzdDLEdBQUcsRUFBRTtn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QUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMvQixnRUFBZ0U7d0JBQ2hFLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDM0MsZUFBZTs0QkFDZixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUM3RCxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUVyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQWtDLHFDQUFxQzt3QkFDL0csQ0FBQztvQkFDTCxDQUFDO3lCQUNJLENBQUM7d0JBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQWtDLHFDQUFxQztvQkFDdEcsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQXBGWSxtQkFBbUI7Z0JBRi9CLFFBQVE7ZUFFSSxtQkFBbUIsQ0FvRi9CO1lBcEZZLDZCQUFtQixzQkFvRi9CLENBQUE7UUFDTCxDQUFDLEVBM0ZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEyRjdCO0lBQUQsQ0FBQyxFQTNGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkZuQjtBQUFELENBQUMsRUEzRlMsTUFBTSxLQUFOLE1BQU0sUUEyRmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdBZG1pblNydmNwc2tEZXRhaWwgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiRGV0YWlsIHBvZHNrdXBpbnlcIjsgLy9hYnkgc2UgZGFsbyBwxZlpc3RvdXBpdCB6IGJyZWFkY3J1bWJzLCBqZSBuYXN0YXZlbm8gemRlIG3DrXN0byB2IEMjXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3REZXRhaWxQU0tcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBtb2RlbFBTSzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydmNwc2tEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBSZXppbU5vdmE6IEJvb2xlYW47XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gSW5pY2lhbGl6YWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSAodGhhdC5SZXppbU5vdmEgPT0gdHJ1ZSA/IFwiTm92w6EgcG9kc2t1cGluYVwiIDogXCJEZXRhaWwgcG9kc2t1cGlueVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gYWtjw61cclxuXHJcbiAgICAgICAgICAgICAgICBhY3RPSzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT0tcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHZpZGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1NLUCEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2luZyh0cnVlKSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2l0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHZpZGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgc3B1c3RpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2luZyhmYWxzZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyBQIMWZIGkgZCDDoSB2IMOhIG4gw60gICBhIGsgYyDDrSAgIGQgbyAgIG0gZSBuIHUgICBiIGEgciB1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9LLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFpydXNpdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpydcWhaXRcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9LLCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9rXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFpydXNpdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpydcWhaXRcclxuICAgICAgICAgICAgXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gICAgRm9ybXVsw6HFmSB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBBZG1pbmRldGFpbFBTUEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkFkbWluZGV0YWlsU0tQXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTYtM1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2t1cGluYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwic2twX2FrY2VcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvZHNrdXBpbmFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiAhdGhhdC5SZXppbU5vdmEsIG5hbWU6IFwicHNrX2FrY2VcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXpldlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInBza19ha2NlX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nanMtZGV0YWlsUFNQJz5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgQWRtaW5kZXRhaWxQU1BGb3JtLCApLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWxQU0spO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfU0tQISkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gWmF2w61yw6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICBjbG9zaW5nKCBwcm92ZXN0ICkge1xyXG4gICAgICAgICAgICBpZiAocHJvdmVzdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNEaXYgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY29udGVudERpdi5zaG93Rmxhc2goeyBsYWJlbDogJ1VrbGFkYW0gYWtjaSAnICsgY2lzbG8gfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGNEaXYuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgZHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsUFNLKTtcclxuICAgICAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY29uZmlybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IHRoaXMubW9kZWxQU0sgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHsgZGF0YTogbnVsbCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6YXbDrXLDoW7DrSBwb3PDrWxhbsOhbSB6cMSbdCBvYmpla3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==