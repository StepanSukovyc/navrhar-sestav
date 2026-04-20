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
            let GPokUcetTerminaluNovyTab = class GPokUcetTerminaluNovyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "pokEditCeninyForm" })
                        .addSection()
                        .addRow("Terminál", true)
                        .addField("gselectbox", Gordic.Prefabs.Select.bucskap(), {
                        name: "pos_id=pos_id",
                        initialValue: { pos_id: this.pos_id },
                        disabled: !that.edit,
                        validators: [new Gordic.Validators.Required()],
                        change: function (ev, changeObj) {
                        }
                    })
                        .addRow("Bankovní účet", true)
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "ucet",
                        initialValue: { bu_vl: this.bu, sk_vl: this.sk, rok: this.gpc.rok },
                        serverFilters: { rok: that.gpc.rok },
                        model: "bu_vl=bu_vl;sk_vl=sk_vl",
                        validators: [new Gordic.Validators.Required()],
                        change: function (ev, changeObj) {
                        }
                    });
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
                }
                uloz(params) {
                    var that = this;
                    that.isl.PokKniha.editaceUcetTerminal(rq => { return { data: params }; })
                        .get()
                        .done(function (ret) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Změny úspěšně uloženy!");
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (typ === "exception" && obj) {
                            if (obj.baseType === "Gordic.General.GArgumentNullException") {
                                obj.handled = true;
                                WebClient.GPokFlash.showFlashError(that, "Nejsou vyplněny všechny údaje!");
                            }
                        }
                    });
                }
                ulozitDetail() {
                    let that = this;
                    // if (this.findForms("pokEditCeninyForm").gform("isValid"))
                    if (that.findForms().gform("isValid", true)) {
                        var dto = {};
                        that.findFields().gfield("model", "collect", dto);
                        dto.ixp_den = this.ixpDen;
                        dto.aktivita = this.aktivitaZaznamu;
                        var edit = this.findForms().gform("hasChanged");
                        if (edit || that.aktivitaZaznamu == 900) { // něco sez měnilo nebo je záznam zrušen, tím ho zase zaaktivním
                            that.uloz(dto);
                        }
                        else {
                            Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Žádné údaje se nezměnily, není nutné nic ukládat!");
                        }
                    } //isValid end
                }
            };
            GPokUcetTerminaluNovyTab = __decorate([
                Decorators.gcontent
            ], GPokUcetTerminaluNovyTab);
            WebClient.GPokUcetTerminaluNovyTab = GPokUcetTerminaluNovyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1VjZXRUZXJtaW5hbHVOb3Z5VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1VjZXRUZXJtaW5hbHVOb3Z5VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FrSGY7QUFsSEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa0huQjtJQWxIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa0g3QjtRQWxIb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEsT0FBQSxZQUFZO2dCQVl0RCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUcsYUFBYSxFQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFdEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxDQUFDO3lCQUNoRSxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3JELElBQUksRUFBRSxlQUFlO3dCQUNyQixZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQzt3QkFDbkMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3BCLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVM7d0JBQy9CLENBQUM7cUJBQ0osQ0FBQzt5QkFD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QUFDLE1BQU0sQ0FBQzt3QkFDMUIsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO3dCQUVwQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUVoRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsZ0VBQWdFOzRCQUV2RyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixDQUFDOzZCQUNJLENBQUM7NEJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxtREFBbUQsQ0FBQyxDQUFDO3dCQUMvRyxDQUFDO29CQUNMLENBQUMsQ0FBQSxhQUFhO2dCQUNsQixDQUFDO2FBQ0osQ0FBQTtZQTlHWSx3QkFBd0I7Z0JBRHBDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asd0JBQXdCLENBOEdwQztZQTlHWSxrQ0FBd0IsMkJBOEdwQyxDQUFBO1FBQ0wsQ0FBQyxFQWxIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa0g3QjtJQUFELENBQUMsRUFsSGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtIbkI7QUFBRCxDQUFDLEVBbEhTLE1BQU0sS0FBTixNQUFNLFFBa0hmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tVY2V0VGVybWluYWx1Tm92eVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG5cclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZWRpdDogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIHBvc19pZDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgYnU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHNrOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBha3Rpdml0YVphem5hbXU6IG51bWJlcjtcclxuICAgICAgICBpeHBEZW46IHN0cmluZztcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCAgZGVmYXVsdEFjdGlvbiA6IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInBva0VkaXRDZW5pbnlGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUZXJtaW7DoWxcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9zX2lkPXBvc19pZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZToge3Bvc19pZDogdGhpcy5wb3NfaWR9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5lZGl0LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldFwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3V2bCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGJ1X3ZsOiB0aGlzLmJ1LCBza192bDogdGhpcy5zaywgcm9rOiB0aGlzLmdwYy5yb2sgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHJvazogdGhhdC5ncGMucm9rIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYnVfdmw9YnVfdmw7c2tfdmw9c2tfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB0YWIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjI3N1wiLC8vUkMgMzEzMDIyNzcgOiBVbG/Fvml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3ppdERldGFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdWxveihwYXJhbXM6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tVY2V0VGVybWluYWx1S25paHlEdG8pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlBva0tuaWhhLmVkaXRhY2VVY2V0VGVybWluYWwocnEgPT4geyByZXR1cm4geyBkYXRhOiBwYXJhbXMgfSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFN1Y2Nlc3ModGhhdCwgXCJabcSbbnkgw7pzcMSbxaFuxJsgdWxvxb5lbnkhXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIiAmJiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HQXJndW1lbnROdWxsRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdQb2tGbGFzaC5zaG93Rmxhc2hFcnJvcih0aGF0LCBcIk5lanNvdSB2eXBsbsSbbnkgdsWhZWNobnkgw7pkYWplIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdWxveml0RGV0YWlsKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgLy8gaWYgKHRoaXMuZmluZEZvcm1zKFwicG9rRWRpdENlbmlueUZvcm1cIikuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICBpZiAodGhhdC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGR0bzogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1VjZXRUZXJtaW5hbHVLbmloeUR0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGR0by5peHBfZGVuID0gdGhpcy5peHBEZW47XHJcbiAgICAgICAgICAgICAgICBkdG8uYWt0aXZpdGEgPSB0aGlzLmFrdGl2aXRhWmF6bmFtdTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWRpdCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlZGl0IHx8IHRoYXQuYWt0aXZpdGFaYXpuYW11ID09IDkwMCkgeyAvLyBuxJtjbyBzZXogbcSbbmlsbyBuZWJvIGplIHrDoXpuYW0genJ1xaFlbiwgdMOtbSBobyB6YXNlIHphYWt0aXZuw61tXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudWxveihkdG8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCLFvcOhZG7DqSDDumRhamUgc2UgbmV6bcSbbmlseSwgbmVuw60gbnV0bsOpIG5pYyB1a2zDoWRhdCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0vL2lzVmFsaWQgZW5kXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19