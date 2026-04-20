"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            var GUcrMaskaDetail_1;
            let GUcrMaskaDetail = GUcrMaskaDetail_1 = class GUcrMaskaDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GUcrMaskaDetail#";
                }
                prepareContent(options) {
                    let _this = this;
                    this.options = options = $.extend({ maska: {} }, options);
                    this.srv = new WebClient.GUcrMaskaService(options.serviceOptions);
                    this.saveAct = this.actions.add({
                        name: "saveAct",
                        icon: "gi-save",
                        caption: "jres:31100160", //RC 31100160 : Uložit
                        run: function () {
                            let p = _this.save();
                            p.then((m) => { _this.close(m); });
                            this.setPending(p);
                        }
                    });
                    this.commandBar([{
                            action: this.saveAct,
                            primary: true
                        }, {
                            action: new GAction({
                                name: "closeAct",
                                caption: GDlg.mbbClose.text,
                                run: (ev, ctx) => { this.close(); }
                            })
                        }]);
                    this.form = $.newDiv()
                        .appendTo(this.element)
                        .gform("createFrom", GUcrMaskaDetail_1.getForm(options.elementFormat));
                    if (this.options.maska?.ixs_mas) {
                        this.loadData(this.options.maska?.ixs_mas) //Otevreni existujiciho stavajiciho
                        ;
                    }
                    else
                        this.form.findFields().gfield("model", "apply", this.options.maska); //Vytvoreni noveho
                }
                save() {
                    return this.form.gform("waitForValues")
                        .then(() => {
                        if (!this.form.gform("isValid")) {
                            return $.Deferred().reject().promise();
                        }
                        ;
                        let maska = this.options.maska || {};
                        this.form.findFields().gfield("model", "collect", maska);
                        this.beginOperation();
                        return this.srv.saveFilterOnly({ filter: maska })
                            .then((r) => { return r; })
                            .always(() => { this.endOperation(); });
                    });
                }
                loadData(ixs_mas) {
                    this.beginOperation();
                    const kopie = this.options.maska?.tema == "COPY";
                    let nazev = this.options.maska?.gfilterpanel_name;
                    return this.srv.read(ixs_mas)
                        .then((m) => {
                        if (kopie) {
                            // vraceni nazvu kopie
                            m.gfilterpanel_name = nazev;
                            delete m.ixs_mas;
                        }
                        this.form.findFields().gfield("model", "apply", m);
                        return;
                    })
                        .always(() => { this.endOperation(); });
                }
                /** Formular detailu filtru (!pozor! musi sedet s policky, ktere jsou soucasti filterpanelu v GSeznamEkoZaznamuTS!) */
                static getForm(elementFormat, o) {
                    return new Gordic.Forms.Form({
                        complete: function (options) {
                            let pc = $.content(this).parentContent;
                            let fp = pc ? pc.element.find(".gfilterpanel") : $([]);
                            if (fp.length > 0) {
                                fp.gfilterpanel("waitForDetail").then((d) => {
                                    $(this).findFields().gfield("model", "apply", d);
                                });
                            }
                        }
                    })
                        .addRow({ label: "ixs_mas", customClass: "autohide" }).addField("gstringbox", { name: "ixs_mas", disabled: true })
                        .addRow("Nazev").addField("gstringbox", { name: "gfilterpanel_name" })
                        .addRow("Zkratka").addField("gstringbox", { name: "zkratka" })
                        .addRow("Poznamka").addField("gstringbox", { name: "gfilterpanel_poznamka" })
                        .addRow("Platnost od/do")
                        .addField("gdatebox", { name: "platnost_od", customClass: "w-6" })
                        .addField("gdatebox", { name: "platnost_do", customClass: "w-6" })
                        .addRow("Aktivita")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "gfilterpanel_aktivita", initialValue: { aktivita: 100 }, model: "model.gfilterpanel_aktivita=value.aktivita" })
                        .addRow("Posledni zmenu provedl")
                        //Nefacha :-( Cert vi, co je to za pid...
                        //.addField("gselectbox", Gordic.Prefabs.Select.ginsref(), { name: "gfilterpanel_zmenu_prov", model: "model.gfilterpanel_zmenu_prov=value.ixs_ref", disabled: true })
                        .addField("gstringbox", { name: "gfilterpanel_zmenu_prov_txt", disabled: true })
                        .addRow("Elementy")
                        .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                        gridFormat: elementFormat,
                        checkUete: o?.checkUete,
                        canAddNewRecords: true,
                        canRemoveRecords: true,
                    }), {
                        name: "elementy",
                        model: "model.elementy.filters=value"
                    })
                        .addRow().addField("gradio", {
                        name: "typ_masky",
                        initialValue: 10,
                        radios: [
                            { value: 0 /* Gordic.Gin.Interface.TypMaskyEnum.Verejna */, label: "jres:31100143" }, //RC 31100143 : Veřejná
                            { value: 10 /* Gordic.Gin.Interface.TypMaskyEnum.Soukroma */, label: "jres:31100003" } //RC 31100003 : Osobní
                        ]
                    });
                }
            };
            GUcrMaskaDetail = GUcrMaskaDetail_1 = __decorate([
                Decorators.gcontent
            ], GUcrMaskaDetail);
            WebClient.GUcrMaskaDetail = GUcrMaskaDetail;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Vjck1hc2thRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Vjck1hc2thRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FpSmY7QUFqSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUpuQjtJQWpKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBaUo3QjtRQWpKb0IsV0FBQSxTQUFTOztZQVUxQixJQUFhLGVBQWUsdUJBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBQWpEOztvQkFPSSxRQUFHLEdBQUcsa0JBQWtCLENBQUM7Z0JBOEg3QixDQUFDO2dCQTVIRyxjQUFjLENBQUMsT0FBZ0M7b0JBQzNDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFMUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQUEsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUV4RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUM1QixJQUFJLEVBQUUsU0FBUzt3QkFDZixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjt3QkFDaEQsR0FBRyxFQUFFOzRCQUNELElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMs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QUFRLENBQUMsWUFBWSxFQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7d0JBQzNCLFVBQVUsRUFBRSxhQUFhO3dCQUN6QixTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVM7d0JBQ3ZCLGdCQUFnQixFQUFFLElBQUk7d0JBQ3RCLGdCQUFnQixFQUFFLElBQUk7cUJBQ3pCLENBQUMsRUFBRTt3QkFDSSxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsS0FBSyxFQUFFLDhCQUE4QjtxQkFDeEMsQ0FBQzt5QkFDVCxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUN6QixJQUFJLEVBQUUsV0FBVzt3QkFDakIsWUFBWSxFQUFFLEVBQUU7d0JBQ2hCLE1BQU0sRUFBRTs0QkFDSixFQUFFLEtBQUssbURBQTJDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUFFLHVCQUF1Qjs0QkFDckcsRUFBRSxLQUFLLHFEQUE0QyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxzQkFBc0I7eUJBQ3ZHO3FCQUNKLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0osQ0FBQTtZQXJJWSxlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0FxSTNCO1lBcklZLHlCQUFlLGtCQXFJM0IsQ0FBQTtRQUVMLENBQUMsRUFqSm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlKN0I7SUFBRCxDQUFDLEVBakpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpSm5CO0FBQUQsQ0FBQyxFQWpKUyxNQUFNLEtBQU4sTUFBTSxRQWlKZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR1Vjck1hc2thRGV0YWlsT3B0aW9ucyB7XHJcbiAgICAgICAgbWFza2E/OiBHVWNyTWFza2FEdG87XHJcbiAgICAgICAgc2VydmljZU9wdGlvbnM6IEdVY3JNYXNrYVNlcnZpY2VPcHRpb25zO1xyXG4gICAgICAgIGVsZW1lbnRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R0Vrb0ZpbHRlckR0bz47XHJcbiAgICAgICAgY2hlY2tVZXRlPzogbnVtYmVyIHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdVY3JNYXNrYURldGFpbCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUdVY3JNYXNrYURldGFpbE9wdGlvbnM7XHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc3J2OiBHVWNyTWFza2FTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICB1aWQgPSBcIkdVY3JNYXNrYURldGFpbCNcIjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdVY3JNYXNrYURldGFpbE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyA9ICQuZXh0ZW5kKHsgbWFza2E6IHt9IH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zcnYgPSBuZXcgR1Vjck1hc2thU2VydmljZShvcHRpb25zLnNlcnZpY2VPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzYXZlQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE2MFwiLCAvL1JDIDMxMTAwMTYwIDogVWxvxb5pdFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBfdGhpcy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcC50aGVuKChtKSA9PiB7IF90aGlzLmNsb3NlKG0pOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuc2F2ZUFjdCxcclxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWVcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbG9zZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3JtID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgR1Vjck1hc2thRGV0YWlsLmdldEZvcm0ob3B0aW9ucy5lbGVtZW50Rm9ybWF0KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1hc2thPy5peHNfbWFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMub3B0aW9ucy5tYXNrYT8uaXhzX21hcykgLy9PdGV2cmVuaSBleGlzdHVqaWNpaG8gc3RhdmFqaWNpaG9cclxuICAgICAgICAgICAgICAgICAgICAvLy50aGVuKCgpID0+IHtcclxuICBcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHRoaXMuZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm9wdGlvbnMubWFza2EpOyAgICAvL1Z5dHZvcmVuaSBub3ZlaG9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2F2ZSgpOiBKUXVlcnlQcm9taXNlPEdVY3JNYXNrYUR0b3xHVWNyTWFza2FEdG9bXT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkgeyByZXR1cm4gJC5EZWZlcnJlZDxHVWNyTWFza2FEdG8+KCkucmVqZWN0KCkucHJvbWlzZSgpIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXNrYSA9IHRoaXMub3B0aW9ucy5tYXNrYSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtYXNrYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zcnYuc2F2ZUZpbHRlck9ubHkoeyBmaWx0ZXI6IG1hc2thIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7IHJldHVybiByOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZERhdGEoaXhzX21hczogc3RyaW5nKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBrb3BpZSA9IHRoaXMub3B0aW9ucy5tYXNrYT8udGVtYSA9PSBcIkNPUFlcIjtcclxuICAgICAgICAgICAgbGV0IG5hemV2ID0gdGhpcy5vcHRpb25zLm1hc2thPy5nZmlsdGVycGFuZWxfbmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3J2LnJlYWQoaXhzX21hcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtvcGllKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2cmFjZW5pIG5henZ1IGtvcGllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0uZ2ZpbHRlcnBhbmVsX25hbWUgPSBuYXpldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG0uaXhzX21hcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEZvcm11bGFyIGRldGFpbHUgZmlsdHJ1ICghcG96b3IhIG11c2kgc2VkZXQgcyBwb2xpY2t5LCBrdGVyZSBqc291IHNvdWNhc3RpIGZpbHRlcnBhbmVsdSB2IEdTZXpuYW1Fa29aYXpuYW11VFMhKSAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0Rm9ybShlbGVtZW50Rm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdFa29GaWx0ZXJEdG8+LCBvPzogeyBjaGVja1VldGU/OiBudW1iZXIgfCB1bmRlZmluZWQgfSk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBjID0gJC5jb250ZW50KHRoaXMpLnBhcmVudENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZwID0gcGMgPyBwYy5lbGVtZW50LmZpbmQoXCIuZ2ZpbHRlcnBhbmVsXCIpIDogJChbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZwLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnAuZ2ZpbHRlcnBhbmVsKFwid2FpdEZvckRldGFpbFwiKS50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiaXhzX21hc1wiLCBjdXN0b21DbGFzczogXCJhdXRvaGlkZVwiIH0pLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXhzX21hc1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk5hemV2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZ2ZpbHRlcnBhbmVsX25hbWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlprcmF0a2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ6a3JhdGthXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puYW1rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImdmaWx0ZXJwYW5lbF9wb3puYW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUGxhdG5vc3Qgb2QvZG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJwbGF0bm9zdF9vZFwiLCBjdXN0b21DbGFzczogXCJ3LTZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcInBsYXRub3N0X2RvXCIsIGN1c3RvbUNsYXNzOiBcInctNlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWt0aXZpdGFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwgeyBuYW1lOiBcImdmaWx0ZXJwYW5lbF9ha3Rpdml0YVwiLCBpbml0aWFsVmFsdWU6IHsgYWt0aXZpdGE6IDEwMCB9LCBtb2RlbDogXCJtb2RlbC5nZmlsdGVycGFuZWxfYWt0aXZpdGE9dmFsdWUuYWt0aXZpdGFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvc2xlZG5pIHptZW51IHByb3ZlZGxcIilcclxuICAgICAgICAgICAgICAgIC8vTmVmYWNoYSA6LSggQ2VydCB2aSwgY28gamUgdG8gemEgcGlkLi4uXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNyZWYoKSwgeyBuYW1lOiBcImdmaWx0ZXJwYW5lbF96bWVudV9wcm92XCIsIG1vZGVsOiBcIm1vZGVsLmdmaWx0ZXJwYW5lbF96bWVudV9wcm92PXZhbHVlLml4c19yZWZcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImdmaWx0ZXJwYW5lbF96bWVudV9wcm92X3R4dFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkVsZW1lbnR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5QcmVmYWJzLmNmdUVsZW1lbnRzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogZWxlbWVudEZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVZXRlOiBvPy5jaGVja1VldGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbkFkZE5ld1JlY29yZHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhblJlbW92ZVJlY29yZHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZWxlbWVudHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmVsZW1lbnR5LmZpbHRlcnM9dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9tYXNreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cE1hc2t5RW51bS5WZXJlam5hLCBsYWJlbDogXCJqcmVzOjMxMTAwMTQzXCIgfSwgLy9SQyAzMTEwMDE0MyA6IFZlxZllam7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBNYXNreUVudW0uU291a3JvbWEsIGxhYmVsOiBcImpyZXM6MzExMDAwMDNcIiB9IC8vUkMgMzExMDAwMDMgOiBPc29ibsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==