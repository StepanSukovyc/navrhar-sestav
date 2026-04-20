"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GPrepoctyStavu.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
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
//namespace Gordic.Inu.WebClient {
//    var gcontent = Decorators.gcontent;
//    @gcontent
//    export class GPrepoctyStavu extends GDetailBuilderContent {
//        title = "Přepočet akcí"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
//        protected typ: string;
//        protected agenda: string;
////        private globals = Gordic.Inu.Globals.GAdaGlobals;
//    }
//}
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GPrepoctyStavu = class GPrepoctyStavu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Přepočet stavů";
                    this.model_akt = {};
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    //debugger;
                    if (this.typ == "PREP") {
                        if (this.agenda == "UCT") {
                            this.title = "Přepočet stavů UCT";
                        }
                        else {
                            this.title = "Přepočet stavů ROZ";
                        }
                    }
                    else {
                        if (this.typ == "AKT") {
                            if (this.agenda == "UCT") {
                                this.title = "Aktualizace stavů UCT";
                            }
                            else {
                                this.title = "Aktualizace stavů ROZ";
                            }
                        }
                        else {
                            if (this.agenda == "UCT") {
                                this.title = "Kontrola stavů UCT";
                            }
                            else {
                                this.title = "Kontrola stavů ROZ";
                            }
                        }
                    }
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    //nastavení akcí
                    this.actions.addRange({
                        actPrepocetAkce: {
                            caption: "Provést", icon: "gi-plus",
                            run: () => {
                                return that.prepocet("", "");
                            }
                        }
                    });
                    console.log("data: ", this.model);
                    $.extend(this.model_akt, this.model);
                    this.model_akt.ico = this.model_akt.akt_ico;
                    this.model_akt.ucs = this.model_akt.akt_ucs;
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actPrepocetAkce*"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    that.form = $("<div>").appendTo(mainForm).gform("setup", { layoutDescriptor: "L1M1S1", customClass: "js-ada-zakladni_udaje" }).
                        gformsection("create", "Parametry").
                        gformrow("addFieldsRow", "ICO", ["w-6"]).gstringbox({ name: "ico", disabled: true }).
                        gformrow("addFieldsRow", "UCS", ["w-6"]).gselectbox(Gordic.Prefabs.Select.ekosucs(), { name: "ucs", model: "ico=ico; ucs=ucs;ucs_txt=nazev" });
                    if (this.typ == "PREP") {
                        that.form.gformrow("addFieldsRow", "Od měsíce", ["w-6"]).gnumberbox({ name: "mesic" });
                    }
                    that.form.gformrow("addFieldsRow", "Vlastní UCS", ["w-6"]).gcheck({
                        name: "vlastniucs",
                        initialValue: true,
                        change: function (ev, obj) {
                            var zaskrtnuto = false;
                            zaskrtnuto = obj.value;
                            if (zaskrtnuto == true) {
                                that.form.findFields("ucs").gfield("setValue", { ucs: that.model.akt_ucs });
                                that.form.findFields("ucs").gfield("disable");
                                that.form.findFields("ucs").gfield("model", "apply", that.model_akt);
                                console.log("nastav", that.model.akt_ucs);
                            }
                            else {
                                that.form.findFields("ucs").gfield("setValue", null);
                                that.form.findFields("ucs").gfield("enable");
                                console.log("nastav", "X");
                            }
                        }
                    });
                    this.findFields().gfield("model", "apply", this.model);
                }
                prepocet(agenda, typ) {
                    console.log(typ);
                    var that = this;
                    var $cDiv = $(this.contentDiv);
                    if ($cDiv.findForms().gform("isValid", true)) {
                        $cDiv.findFields().gfield("model", "collect", this.model);
                        $cDiv.findFields().gfield("confirm");
                        console.log(this.model.ico);
                        console.log(this.model.ucs);
                        var i_agenda = 0;
                        var i_mesic = 0;
                        var i_text = "";
                        if (this.typ == "AKT") {
                            i_mesic = 0;
                            this.model.mesic = i_mesic;
                            i_text = "Aktualizace stavů ";
                            if (this.agenda == "UCT") {
                                i_agenda = 40;
                            }
                            else {
                                i_agenda = 50;
                            }
                        }
                        else {
                            if (this.typ == "PREP") {
                                i_mesic = 1;
                                i_text = "Úplný přepočet stavů ";
                                if (this.agenda == "UCT") {
                                    i_agenda = 40;
                                }
                                else {
                                    i_agenda = 50;
                                }
                            }
                            else {
                                i_mesic = 99;
                                this.model.mesic = i_mesic;
                                i_text = "Kontrola stavů ";
                                if (this.agenda == "UCT") {
                                    i_agenda = 40;
                                }
                                else {
                                    i_agenda = 50;
                                }
                            }
                        }
                        i_text = i_text + this.agenda;
                        var v_data = {};
                        v_data.agenda = i_agenda;
                        v_data.operace = this.typ;
                        //debugger;
                        v_data.mesic = this.model.mesic;
                        v_data.ico = this.model.ico;
                        v_data.ucs = this.model.ucs;
                        v_data.lic = this.model.lic;
                        v_data.o_hlaska = i_text;
                        if ((v_data.mesic > 0) && (v_data.mesic <= 13))
                            v_data.o_hlaska = v_data.o_hlaska + " od měsíce " + v_data.mesic;
                        Gordic.Async.GTaskManager.init({ delay: 10000 }); //NOTE: Toto je zde pro testovaci ucely, v budoucnu bude k odstraneni
                        Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuStavyAsync", v_data);
                        // nahrazeno asynchronním voláním
                        //this.call("Prepocet_Stavu", { in_agenda: i_agenda, in_mesic: i_mesic, in_ico: this.model.ico, in_ucs: this.model.ucs, in_lic: this.model.lic })
                        //    .done(function (newData)
                        //    {
                        //        console.log("newdata:", newData);
                        //        that.showFlash(i_text + " - úspěšně provedeno!!!", "g-state-success", 5000, "msgFlash"); 
                        //        console.log(i_text + " - úspěšně provedeno!!!");
                        //        that.notification(
                        //            "add",
                        //            {
                        //                title: i_text,
                        //                icon: "fa-globe",
                        //                content: i_text + " - úspěšně provedeno!!!"
                        //            },
                        //            true);
                        //    })
                    }
                }
            };
            GPrepoctyStavu = __decorate([
                gcontent
            ], GPrepoctyStavu);
            WebClient.GPrepoctyStavu = GPrepoctyStavu;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZXBvY3R5U3RhdnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJlcG9jdHlTdGF2dS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLGtDQUFrQztBQUNsQyx5Q0FBeUM7QUFFekMsZUFBZTtBQUNmLGlFQUFpRTtBQUVqRSxzR0FBc0c7QUFFdEcsZ0NBQWdDO0FBQ2hDLG1DQUFtQztBQUNuQyw2REFBNkQ7QUFHN0QsT0FBTztBQUNQLEdBQUc7QUFFSCxJQUFVLE1BQU0sQ0FxS2Y7QUFyS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUtuQjtJQXJLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcUs3QjtRQXJLb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQUVJLFVBQUssR0FBRyxnQkFBZ0IsQ0FBQztvQkFFZixjQUFTLEdBQTZDLEVBQUUsQ0FBQztvQkFLM0QsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkFzSnJELENBQUM7Z0JBcEpHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixXQUFXO29CQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDOzRCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUE7d0JBQUMsQ0FBQzs2QkFBTSxDQUFDOzRCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUE7d0JBQUMsQ0FBQztvQkFDOUcsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLElBQUksSUFBSSxDQUFDLEdBQUcsSUFB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QTtZQS9KWSxjQUFjO2dCQUQxQixRQUFRO2VBQ0ksY0FBYyxDQStKMUI7WUEvSlksd0JBQWMsaUJBK0oxQixDQUFBO1FBRUwsQ0FBQyxFQXJLb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcUs3QjtJQUFELENBQUMsRUFyS2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFLbkI7QUFBRCxDQUFDLEVBcktTLE1BQU0sS0FBTixNQUFNLFFBcUtmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdQcmVwb2N0eVN0YXZ1LmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR1ByZXBvY3R5U3RhdnUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbi8vbmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuLy8gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbi8vICAgIEBnY29udGVudFxyXG4vLyAgICBleHBvcnQgY2xhc3MgR1ByZXBvY3R5U3RhdnUgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQge1xyXG5cclxuLy8gICAgICAgIHRpdGxlID0gXCJQxZllcG/EjWV0IGFrY8OtXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG5cclxuLy8gICAgICAgIHByb3RlY3RlZCB0eXA6IHN0cmluZztcclxuLy8gICAgICAgIHByb3RlY3RlZCBhZ2VuZGE6IHN0cmluZztcclxuLy8vLyAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuXHJcbi8vICAgIH1cclxuLy99XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJlcG9jdHlTdGF2dSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJQxZllcG/EjWV0IHN0YXbFr1wiOyBcclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkRUTy5HSW51UHJlcG9jZXREdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsX2FrdDogR29yZGljLkludS5XZWJDbGllbnQuRFRPLkdJbnVQcmVwb2NldER0byA9IHt9O1xyXG4gICAgICAgIHByb3RlY3RlZCBQcmVwRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHJvdGVjdGVkIHR5cDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBhZ2VuZGE6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5JbnUuR2xvYmFscy5HSW51R2xvYmFscztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwID09IFwiUFJFUFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZ2VuZGEgPT0gXCJVQ1RcIikgeyB0aGlzLnRpdGxlID0gXCJQxZllcG/EjWV0IHN0YXbFryBVQ1RcIiB9IGVsc2UgeyB0aGlzLnRpdGxlID0gXCJQxZllcG/EjWV0IHN0YXbFryBST1pcIiB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXAgPT0gXCJBS1RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFnZW5kYSA9PSBcIlVDVFwiKSB7IHRoaXMudGl0bGUgPSBcIkFrdHVhbGl6YWNlIHN0YXbFryBVQ1RcIiB9IGVsc2UgeyB0aGlzLnRpdGxlID0gXCJBa3R1YWxpemFjZSBzdGF2xa8gUk9aXCIgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWdlbmRhID09IFwiVUNUXCIpIHsgdGhpcy50aXRsZSA9IFwiS29udHJvbGEgc3RhdsWvIFVDVFwiIH0gZWxzZSB7IHRoaXMudGl0bGUgPSBcIktvbnRyb2xhIHN0YXbFryBST1pcIiB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBicmVhZGNydW1ic1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByZXBvY2V0QWtjZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvdsOpc3RcIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnByZXBvY2V0KFwiXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YTogXCIsIHRoaXMubW9kZWwpXHJcblxyXG4gICAgICAgICAgICAkLmV4dGVuZCh0aGlzLm1vZGVsX2FrdCwgdGhpcy5tb2RlbCApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9ha3QuaWNvID0gdGhpcy5tb2RlbF9ha3QuYWt0X2ljbztcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9ha3QudWNzID0gdGhpcy5tb2RlbF9ha3QuYWt0X3VjcztcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQcmVwb2NldEFrY2UqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhtYWluRm9ybSkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIsIGN1c3RvbUNsYXNzOiBcImpzLWFkYS16YWtsYWRuaV91ZGFqZVwiIH0pLlxyXG4gICAgICAgICAgICAgICAgZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiUGFyYW1ldHJ5XCIpLlxyXG4gICAgICAgICAgICAgICAgZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJJQ09cIiwgW1widy02XCJdKS5nc3RyaW5nYm94KHsgbmFtZTogXCJpY29cIiwgZGlzYWJsZWQ6IHRydWUgfSkuXHJcbiAgICAgICAgICAgICAgICBnZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlVDU1wiLCBbXCJ3LTZcIl0pLmdzZWxlY3Rib3goR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y3MoKSwgeyBuYW1lOiBcInVjc1wiLCBtb2RlbDogXCJpY289aWNvOyB1Y3M9dWNzO3Vjc190eHQ9bmF6ZXZcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXAgPT0gXCJQUkVQXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm0uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJPZCBtxJtzw61jZVwiLCBbXCJ3LTZcIl0pLmdudW1iZXJib3goeyBuYW1lOiBcIm1lc2ljXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZvcm0uZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJWbGFzdG7DrSBVQ1NcIiwgW1widy02XCJdKS5nY2hlY2soe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2bGFzdG5pdWNzXCIsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHphc2tydG51dG8gOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgemFza3J0bnV0byA9IG9iai52YWx1ZSE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHphc2tydG51dG8gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm0uZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHVjczogdGhhdC5tb2RlbC5ha3RfdWNzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm0uZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm0uZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWxfYWt0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYXN0YXZcIiwgdGhhdC5tb2RlbC5ha3RfdWNzIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm0uZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5mb3JtLmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5hc3RhdlwiLCBcIlhcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmVwb2NldChhZ2VuZGE6IHN0cmluZywgdHlwOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coIHR5cCApXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciAkY0RpdiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgaWYgKCRjRGl2LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjb25maXJtXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tb2RlbC5pY28pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tb2RlbC51Y3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlfYWdlbmRhID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBpX21lc2ljID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBpX3RleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cCA9PSBcIkFLVFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaV9tZXNpYyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5tZXNpYyA9IGlfbWVzaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgaV90ZXh0ID0gXCJBa3R1YWxpemFjZSBzdGF2xa8gXCJcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZ2VuZGEgPT0gXCJVQ1RcIilcclxuICAgICAgICAgICAgICAgICAgICB7IGlfYWdlbmRhID0gNDAgfSBlbHNlIHsgaV9hZ2VuZGEgPSA1MCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXAgPT0gXCJQUkVQXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaV9tZXNpYyA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfdGV4dCA9IFwiw5pwbG7DvSBwxZllcG/EjWV0IHN0YXbFryBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZ2VuZGEgPT0gXCJVQ1RcIikgeyBpX2FnZW5kYSA9IDQwIH0gZWxzZSB7IGlfYWdlbmRhID0gNTAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfbWVzaWMgPSA5OTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5tZXNpYyA9IGlfbWVzaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfdGV4dCA9IFwiS29udHJvbGEgc3RhdsWvIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFnZW5kYSA9PSBcIlVDVFwiKSB7IGlfYWdlbmRhID0gNDAgfSBlbHNlIHsgaV9hZ2VuZGEgPSA1MCB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaV90ZXh0ID0gaV90ZXh0ICsgdGhpcy5hZ2VuZGE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHZfZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR1ByZXBvY2V0U3RhdnVEdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5hZ2VuZGEgPSBpX2FnZW5kYTtcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5vcGVyYWNlID0gdGhpcy50eXA7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgdl9kYXRhLm1lc2ljID0gdGhpcy5tb2RlbC5tZXNpYztcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5pY28gPSB0aGlzLm1vZGVsLmljbztcclxuICAgICAgICAgICAgICAgIHZfZGF0YS51Y3MgPSB0aGlzLm1vZGVsLnVjcztcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5saWMgPSB0aGlzLm1vZGVsLmxpYztcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5vX2hsYXNrYSA9IGlfdGV4dDtcclxuICAgICAgICAgICAgICAgIGlmICgodl9kYXRhLm1lc2ljISA+IDApICYmICh2X2RhdGEubWVzaWMhIDw9IDEzKSkgdl9kYXRhLm9faGxhc2thID0gdl9kYXRhLm9faGxhc2thICsgXCIgb2QgbcSbc8OtY2UgXCIgKyB2X2RhdGEubWVzaWM7IFxyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuaW5pdCh7IGRlbGF5OiAxMDAwMCB9KTsgLy9OT1RFOiBUb3RvIGplIHpkZSBwcm8gdGVzdG92YWNpIHVjZWx5LCB2IGJ1ZG91Y251IGJ1ZGUgayBvZHN0cmFuZW5pXHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVTdGF2eUFzeW5jXCIsIHZfZGF0YSApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG5haHJhemVubyBhc3luY2hyb25uw61tIHZvbMOhbsOtbVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNhbGwoXCJQcmVwb2NldF9TdGF2dVwiLCB7IGluX2FnZW5kYTogaV9hZ2VuZGEsIGluX21lc2ljOiBpX21lc2ljLCBpbl9pY286IHRoaXMubW9kZWwuaWNvLCBpbl91Y3M6IHRoaXMubW9kZWwudWNzLCBpbl9saWM6IHRoaXMubW9kZWwubGljIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAobmV3RGF0YSlcclxuICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcIm5ld2RhdGE6XCIsIG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuc2hvd0ZsYXNoKGlfdGV4dCArIFwiIC0gw7pzcMSbxaFuxJsgcHJvdmVkZW5vISEhXCIsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7IFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGlfdGV4dCArIFwiIC0gw7pzcMSbxaFuxJsgcHJvdmVkZW5vISEhXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0Lm5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgXCJhZGRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGl0bGU6IGlfdGV4dCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGljb246IFwiZmEtZ2xvYmVcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGlfdGV4dCArIFwiIC0gw7pzcMSbxaFuxJsgcHJvdmVkZW5vISEhXCJcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==