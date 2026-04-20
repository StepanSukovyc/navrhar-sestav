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
            let GAdminPolozkyRZDDetail = class GAdminPolozkyRZDDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail Typu zdroje"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actDetailRZD"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.title = (that.RezimNova == true ? "Nový typ zdroje" : "Detail typu zdroje");
                    that.actions.addRange({
                        actOK: {
                            caption: "Uložit", // OK
                            icon: "gi-save", // ikona 
                            visible: true, // vždy viditelné
                            enabled: that.globals.Param_Administrace_TZD,
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
                    var AdmindetailTZDForm = new Gordic.Forms.Form({ name: "AdminDetailTZD", layoutDescriptor: "L1M1S1 LMS-3-6-3" })
                        .addRow("Typ zdroje").addField("gstringbox", "w-12", { disabled: !that.RezimNova, name: "id_tzd", validators: [new Gordic.Validators.Required()] })
                        .addRow("Název").addField("gstringbox", "w-12", { disabled: false, name: "nazev" })
                        .addRow("Zkratka").addField("gstringbox", "w-12", { disabled: false, name: "zkratka" })
                        .addRow("Poznámka").addField("gstringbox", "w-12", { disabled: false, name: "poznamka" })
                        .addRow("Aktivita").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", dropdown: true, model: "model.aktivita = value.aktivita", serverFilters: { aktivita: [100, 500] }, validators: [new Gordic.Validators.Required()] });
                    $("<div class='js-detailTZD'>").appendTo(that.element).gform("createFrom", AdmindetailTZDForm).findFields().gfield("model", "apply", that.modelTZD);
                    if (!that.globals.Param_Administrace_TZD) {
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
                            $cDiv.findFields().gfield("model", "collect", this.modelTZD);
                            $cDiv.findFields().gfield("confirm");
                            this.close({ data: this.modelTZD }); // při zavírání posílanám zpět objekt
                        }
                    }
                    else {
                        this.close({ data: null }); // při zavírání posílanám zpět objekt
                    }
                }
            };
            GAdminPolozkyRZDDetail = __decorate([
                gcontent
            ], GAdminPolozkyRZDDetail);
            WebClient.GAdminPolozkyRZDDetail = GAdminPolozkyRZDDetail;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluUG9sb3preVJaRERldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5Qb2xvemt5UlpERGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2RmY7QUE3RkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNkZuQjtJQTdGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNkY3QjtRQTdGb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXhEOztvQkFFSSxVQUFLLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxtRUFBbUU7b0JBQ2pHLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBaUZyRCxDQUFDO2dCQTVFRyxpRUFBaUU7Z0JBQ2pFLHlCQUF5QjtnQkFDekIsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBRWpGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUVsQixLQUFLLEVBQUU7NEJBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBdUYsS0FBSzs0QkFDN0csSUFBSSxFQUFFLFNBQVMsRUFBNEYsU0FBUzs0QkFDcEgsT0FBTyxFQUFFLElBQUksRUFBdUYsaUJBQWlCOzRCQUNySCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBdUI7NEJBQzdDLEdBQUcs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SixDQUFBO1lBdEZZLHNCQUFzQjtnQkFGbEMsUUFBUTtlQUVJLHNCQUFzQixDQXNGbEM7WUF0RlksZ0NBQXNCLHlCQXNGbEMsQ0FBQTtRQUNMLENBQUMsRUE3Rm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZGN0I7SUFBRCxDQUFDLEVBN0ZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2Rm5CO0FBQUQsQ0FBQyxFQTdGUyxNQUFNLEtBQU4sTUFBTSxRQTZGZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR0FkbWluUG9sb3preVJaRERldGFpbCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJEZXRhaWwgVHlwdSB6ZHJvamVcIjsgLy9hYnkgc2UgZGFsbyBwxZlpc3RvdXBpdCB6IGJyZWFkY3J1bWJzLCBqZSBuYXN0YXZlbm8gemRlIG3DrXN0byB2IEMjXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3REZXRhaWxSWkRcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBtb2RlbFRaRDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnN0emREdG87XHJcbiAgICAgICAgcHJpdmF0ZSBSZXppbU5vdmE6IEJvb2xlYW47XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gSW5pY2lhbGl6YWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSAodGhhdC5SZXppbU5vdmEgPT0gdHJ1ZSA/IFwiTm92w70gdHlwIHpkcm9qZVwiIDogXCJEZXRhaWwgdHlwdSB6ZHJvamVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGFrY8OtXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T0s6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9LXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9UWkQhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcodHJ1ZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHNwdXN0aXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcoZmFsc2UpIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gUCDFmSBpIGQgw6EgdiDDoSBuIMOtICAgYSBrIGMgw60gICBkIG8gICBtIGUgbiB1ICAgYiBhIHIgdVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPSywgZmF2b3JpdGU6IHRydWUsIHByaW1hcnk6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPa1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RacnVzaXQsIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacnXFoWl0XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPSywgZmF2b3JpdGU6IHRydWUsIHByaW1hcnk6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPa1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RacnVzaXQsIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacnXFoWl0XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vICAgIEZvcm11bMOhxZkgdGFidVxyXG4gICAgICAgICAgICB2YXIgQWRtaW5kZXRhaWxUWkRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJBZG1pbkRldGFpbFRaRFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMy02LTNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCB6ZHJvamVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiAhdGhhdC5SZXppbU5vdmEsIG5hbWU6IFwiaWRfdHpkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6F6ZXZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7IGRpc2FibGVkOiBmYWxzZSwgbmFtZTogXCJuYXpldlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWmtyYXRrYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInprcmF0a2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcInBvem5hbWthXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJBa3Rpdml0YVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwgeyBuYW1lOiBcImFrdGl2aXRhXCIsIGRyb3Bkb3duOiB0cnVlLCBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YSA9IHZhbHVlLmFrdGl2aXRhXCIsIHNlcnZlckZpbHRlcnM6IHsgYWt0aXZpdGE6IFsxMDAsIDUwMF0gfSwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J2pzLWRldGFpbFRaRCc+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIEFkbWluZGV0YWlsVFpERm9ybSwgKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsVFpEKTtcclxuICAgICAgICAgICAgaWYgKCF0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1RaRCEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFphdsOtcsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgY2xvc2luZyggcHJvdmVzdCApIHtcclxuICAgICAgICAgICAgaWYgKHByb3Zlc3QgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNvbnRlbnREaXYuc2hvd0ZsYXNoKHsgbGFiZWw6ICdVa2xhZGFtIGFrY2kgJyArIGNpc2xvIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbFRaRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcImNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBkYXRhOiB0aGlzLm1vZGVsVFpEIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHphdsOtcsOhbsOtIHBvc8OtbGFuw6FtIHpwxJt0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh7IGRhdGE6IG51bGwgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgemF2w61yw6Fuw60gcG9zw61sYW7DoW0genDEm3Qgb2JqZWt0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=