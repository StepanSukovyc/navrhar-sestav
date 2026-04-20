"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GMesicniAktualizaceAda.js                                                        </Name>
//    <Description> GMesicniAktualizaceAda                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
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
            let GMesicniAktualizaceAda = class GMesicniAktualizaceAda extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter_akce = {};
                    this.model = { rok: 0, mesic: 0 };
                    this.title = "Měsíční aktualizace akcí";
                    this.taskId = "actmesicniAktualizaceAda"; // označení položky v taskListu
                }
                ;
                onContentReady() {
                    var that = this;
                    var cnt = this;
                    cnt.model.rok = cnt.rok_akt;
                    cnt.model.mesic = cnt.mesic_akt;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    cnt.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        },
                        actPrepocet: {
                            caption: "Aktualizovat",
                            run: function () {
                                that.prepocet();
                            }
                        }
                    });
                    cnt.menuBar(this.actions.createBar(["actPrepocet*"]));
                    cnt.commandBar(this.actions.createBar(["actClose"]));
                    //this.mainTable = $("<div class='js-Parametry_aktualizace'>").appendTo(this.element)
                    //    .css("height", "60%")
                    //    .css("overflow", "auto")
                    //    .gtab({
                    //        title: "Parametry aktualizace", opened: true, locked: true,
                    //        menuBar: this.actions.createBar(["actPrepocet*"])
                    //    })
                    //// .gautofit({ minimalHeight: 420 });
                    cnt.detailForm = new Gordic.Forms.Form({ name: "detailparametr", layoutDescriptor: "L4M4S2 L-3-9-0 M-3-9-0 S-12-12-0" })
                        .addRow("Parametry aktualizace")
                        .addRow("Rok").addField("gnumberbox", "w-4", { disabled: true, name: "rok", initialValue: that.rok_akt, validators: [new Gordic.Validators.Range({ min: 1990, max: 2050, message: "Chybně zadaná hodnota" })] })
                        .addRow("Měsíc").addField("gnumberbox", "w-4", { disabled: false, name: "mesic", initialValue: that.mesic_akt, validators: [new Gordic.Validators.Range({ min: 1, max: 12, message: "Chybně zadaná hodnota" })] });
                    $("<div class='js-mesicniaktualizace'>").appendTo(that.element).gform("createFrom", that.detailForm);
                }
                prepocet() {
                    var cnt = this;
                    cnt.beginOperation("Probíhá aktualizace");
                    var $cDiv = $(this.contentDiv);
                    if ($cDiv.findForms().gform("isValid", true)) {
                        //var dto = {};
                        $cDiv.findFields().gfield("model", "collect", cnt.model);
                        $cDiv.findFields().gfield("confirm");
                        var l_o_zapis = { in_mesic: cnt.model.mesic };
                        cnt.isl.AkceServis.aktualizace_Maj(l_o_zapis)
                            .getData()
                            .done(function (data) {
                            console.log("Vysledek SPL");
                        })
                            .always(function () {
                            cnt.endOperation();
                        });
                    }
                }
            };
            GMesicniAktualizaceAda = __decorate([
                gcontent
            ], GMesicniAktualizaceAda);
            WebClient.GMesicniAktualizaceAda = GMesicniAktualizaceAda;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01lc2ljbmlBa3R1YWxpemFjZUFkYS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HTWVzaWNuaUFrdHVhbGl6YWNlQWRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBcUdmO0FBckdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFHbkI7SUFyR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFHN0I7UUFyR29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQUF4RDs7b0JBS1ksZ0JBQVcsR0FBNkMsRUFBRSxDQUFDO29CQVEzRCxVQUFLLEdBQW1DLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7b0JBS3BFLFVBQUssR0FBRywwQkFBMEIsQ0FBQztvQkFDbkMsV0FBTSxHQUFHLDBCQUEwQixDQUFDLENBQUMsK0JBQStCO2dCQTZFeEUsQ0FBQztnQkFsRkwsQ0FBQztnQkFPTyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7b0JBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7b0JBRWhDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFHYixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElB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LENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUVyQyxJQUFJLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUUsU0FBUyxDQUFFOzZCQUMxQyxPQUFPLEVBQUU7NkJBQ1QsSUFBSSxDQUFDLFVBQVUsSUFBSTs0QkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDaEMsQ0FBQyxDQUFDOzZCQUNELE1BQU0sQ0FBQzs0QkFDSixHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3ZCLENBQUMsQ0FBQyxDQUFBO29CQUVWLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFoR1ksc0JBQXNCO2dCQURsQyxRQUFRO2VBQ0ksc0JBQXNCLENBZ0dsQztZQWhHWSxnQ0FBc0IseUJBZ0dsQyxDQUFBO1FBQ0wsQ0FBQyxFQXJHb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcUc3QjtJQUFELENBQUMsRUFyR2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFHbkI7QUFBRCxDQUFDLEVBckdTLE1BQU0sS0FBTixNQUFNLFFBcUdmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdNZXNpY25pQWt0dWFsaXphY2VBZGEuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHTWVzaWNuaUFrdHVhbGl6YWNlQWRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWVzaWNuaUFrdHVhbGl6YWNlQWRhIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtYWluVGFibGU6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIGRldGFpbEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJva19ha3Q6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1lc2ljX2FrdDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsOiB7IHJvazogbnVtYmVyLCBtZXNpYzogbnVtYmVyIH0gPSB7IHJvazogMCwgbWVzaWM6IDB9O1xyXG47XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgdGl0bGUgPSBcIk3Em3PDrcSNbsOtIGFrdHVhbGl6YWNlIGFrY8OtXCI7XHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RtZXNpY25pQWt0dWFsaXphY2VBZGFcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbnQubW9kZWwucm9rID0gY250LnJva19ha3Q7XHJcbiAgICAgICAgICAgIGNudC5tb2RlbC5tZXNpYyA9IGNudC5tZXNpY19ha3Q7XHJcblxyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdENsb3NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UHJlcG9jZXQqXCJdKSk7XHJcbiAgICAgICAgICAgIGNudC5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5tYWluVGFibGUgPSAkKFwiPGRpdiBjbGFzcz0nanMtUGFyYW1ldHJ5X2FrdHVhbGl6YWNlJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiNjAlXCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5jc3MoXCJvdmVyZmxvd1wiLCBcImF1dG9cIilcclxuICAgICAgICAgICAgLy8gICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGl0bGU6IFwiUGFyYW1ldHJ5IGFrdHVhbGl6YWNlXCIsIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgbWVudUJhcjogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQcmVwb2NldCpcIl0pXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vLy8gLmdhdXRvZml0KHsgbWluaW1hbEhlaWdodDogNDIwIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmRldGFpbEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRldGFpbHBhcmFtZXRyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNNFMyIEwtMy05LTAgTS0zLTktMCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBhcmFtZXRyeSBha3R1YWxpemFjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlJva1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJyb2tcIiwgaW5pdGlhbFZhbHVlOiB0aGF0LnJva19ha3QsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDE5OTAsIG1heDogMjA1MCwgbWVzc2FnZTogXCJDaHlibsSbIHphZGFuw6EgaG9kbm90YVwiIH0pXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk3Em3PDrWNcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIHsgZGlzYWJsZWQ6IGZhbHNlLCBuYW1lOiBcIm1lc2ljXCIsIGluaXRpYWxWYWx1ZTogdGhhdC5tZXNpY19ha3QsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMTIsIG1lc3NhZ2U6IFwiQ2h5Ym7EmyB6YWRhbsOhIGhvZG5vdGFcIiB9KV0gfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdqcy1tZXNpY25pYWt0dWFsaXphY2UnPlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmRldGFpbEZvcm0pO1xyXG5cclxuICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJlcG9jZXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY250LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIGFrdHVhbGl6YWNlXCIpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciAkY0RpdiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy92YXIgZHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGNudC5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY29uZmlybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbF9vX3phcGlzID0geyBpbl9tZXNpYzogY250Lm1vZGVsLm1lc2ljIH07XHJcbiAgICAgICAgICAgICAgICBjbnQuaXNsLkFrY2VTZXJ2aXMuYWt0dWFsaXphY2VfTWFqKCBsX29femFwaXMgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5c2xlZGVrIFNQTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==