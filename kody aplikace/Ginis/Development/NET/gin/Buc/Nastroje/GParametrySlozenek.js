"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GSablonaLikvidaceFucSeznam.ts          </Name>
//    <Description> Content pro parametry složenek                              </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-13                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro parametry složenek */
            let GParametrySlozenek = class GParametrySlozenek extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.findFields().gfield("model", "apply", this.data, { initialValues: true });
                    if (this.buc_rad_parslos != 1) {
                        this.findFields().gfield("disable");
                    }
                    else {
                        if ((this.data?.zpu_pla ?? "0") != "1") {
                            this.findFields("bu_sa,sk_sa,ks_sa").gfield("disable");
                        }
                    }
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionUlozit({
                            enabled: this.buc_rad_parslos == 1,
                            run: function (ev, ctx) {
                                if (!that.findForms("formParametrySlozenek").gform("isValid")) {
                                    this.setPending(-1);
                                    return;
                                }
                                let modelData = {};
                                that.findFields().gfield("model", "collect", modelData);
                                this.setPending(that.isl.BucParametrySlozenek.upsert(modelData).get().then(() => {
                                    that.load();
                                }));
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actUlozit!", "actZavrit"]));
                }
                /**Vytvoření formuláře*/
                createForm() {
                    let form = new Gordic.Forms.Form({
                        name: "formParametrySlozenek",
                        layoutDescriptor: "L1M1S1"
                    })
                        .addRow("jres:33600688", true, //RC 33600688 : Pošta
                    "jres:33600689") //RC 33600689 : Výběr pošty zpracovávající složenky z číselníku externích subjektů
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                        name: "ixs_esu_po",
                        model: "model.ixs_esu_po=value.ixs_esu",
                        serverFilters: {
                            aktivita: 100
                        },
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600690", true, //RC 33600690 : Číslo účtu pošty
                    "jres:33600691") //RC 33600691 : Číslo účtu pošty pro složenky - přidělí pošta
                        .addField("gstringbox", {
                        name: "bu_po",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600692", true, //RC 33600692 : Směrový kód účtu pošty
                    "jres:33600693") //RC 33600693 : Směrový kód banky pošty pro složenky - přidělí pošta
                        .addField("gstringbox", {
                        name: "sk_po",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600694", true, //RC 33600694 : Specifický symbol pro poštu
                    "jres:33600695") //RC 33600695 : Specifický symbol pro složenky - přidělí pošta
                        .addField("gstringbox", {
                        name: "ss_po",
                        allowedChars: "0-9",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600696", true, //RC 33600696 : Konstantní symbol pro poštu
                    "jres:33600697") //RC 33600697 : Konstantní symbol pro složenky - přidělí pošta
                        .addField("gstringbox", {
                        name: "ks_po",
                        allowedChars: "0-9",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600698", true, //RC 33600698 : Číslo podavatele
                    "jres:33600699") //RC 33600699 : Číslo podavatele pro složenky - přidělí pošta
                        .addField("gnumberbox", {
                        name: "cis_pod",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600700", true, //RC 33600700 : Číslo VDS
                    "jres:33600701") //RC 33600701 : Počáteční číslo VDS - standartně 1
                        .addField("gnumberbox", {
                        name: "vds",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600702", true) //RC 33600702 : Typ placení sazby pro poštu
                        .addField("gselectbox", {
                        name: "zpu_pla",
                        model: "model.zpu_pla=value.zpu_pla",
                        data: new Gordic.Data.View([
                            {
                                zpu_pla: "0", zpu_pla_txt: "Z jednoho účtu"
                            },
                            {
                                zpu_pla: "1", zpu_pla_txt: "Ze dvou účtů"
                            }
                        ], { key: ["zpu_pla"] }),
                        itemTemplate: "{zpu_pla_txt:trim:encode}",
                        dropdown: true,
                        change: (ev, ctx) => {
                            if (ctx.flags.valid) {
                                if (ctx.value?.zpu_pla == "0") {
                                    this.findFields("bu_sa,sk_sa,ks_sa").gfield("clear");
                                    this.findFields("bu_sa,sk_sa,ks_sa").gfield("disable");
                                }
                                else {
                                    this.findFields("bu_sa,sk_sa,ks_sa").gfield("enable");
                                }
                            }
                        },
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600703", true, //RC 33600703 : Číslo účtu sazeb
                    "jres:33600704") //RC 33600704 : Číslo vlastního účtu pro úhradu zazeb za složenky (typ placení 1)
                        .addField("gstringbox", {
                        name: "bu_sa",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600705", true, //RC 33600705 : Směrový kód účtu sazeb
                    "jres:33600706") //RC 33600706 : Směrový kód banky pro úhradu zazeb za složenky (typ placení 1)
                        .addField("gstringbox", {
                        name: "sk_sa",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600707", true, //RC 33600707 : Konstantní symbol pro sazby
                    "jres:33600708") //RC 33600708 : Konstantní symbol pro úhradu zazeb za složenky (typ placení 1)
                        .addField("gstringbox", {
                        name: "ks_sa",
                        allowedChars: "0-9",
                        validators: [new Gordic.Validators.Required()]
                    });
                    $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
            };
            GParametrySlozenek = __decorate([
                Decorators.gcontent
            ], GParametrySlozenek);
            WebClient.GParametrySlozenek = GParametrySlozenek;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BhcmFtZXRyeVNsb3plbmVrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BhcmFtZXRyeVNsb3plbmVrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBNkpmO0FBN0pELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZKbkI7SUE3SmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZKN0I7UUE3Sm9CLFdBQUEsU0FBUztZQUMxQixxQ0FBcUM7WUFFckMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBTWhELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNE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QTZKZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HU2FibG9uYUxpa3ZpZGFjZUZ1Y1Nlem5hbS50cyAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gcGFyYW1ldHJ5IHNsb8W+ZW5layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTEtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIENvbnRlbnQgcHJvIHBhcmFtZXRyeSBzbG/FvmVuZWsgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BhcmFtZXRyeVNsb3plbmVrIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogTmHEjXRlbsOpIGFrdHXDoWxuw60gbmFzdGF2ZW7DqSBwYXJhbWV0cnkgc2xvxb5lbmVrKi9cclxuICAgICAgICBwcml2YXRlIGRhdGE/OiBJbnRlcmZhY2UuR1BhcmFtZXRyeVNsb3plbmVrRHRvO1xyXG4gICAgICAgIC8qKiBCVUMgLSDFmFAgUGFyYW1ldHJ5IHNsb8W+ZW5layBCIC0gcG/FmWl6b3bDoW7DrSBhIG9wcmF2ICovXHJcbiAgICAgICAgcHJpdmF0ZSBidWNfcmFkX3BhcnNsb3M6IG51bWJlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Y19yYWRfcGFyc2xvcyAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmRhdGE/LnpwdV9wbGEgPz8gXCIwXCIpICE9IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiYnVfc2Esc2tfc2Esa3Nfc2FcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RVbG96aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVsb3ppdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5idWNfcmFkX3BhcnNsb3MgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5maW5kRm9ybXMoXCJmb3JtUGFyYW1ldHJ5U2xvemVuZWtcIikuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7IHRoaXMuc2V0UGVuZGluZygtMSk7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9kZWxEYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG1vZGVsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmlzbC5CdWNQYXJhbWV0cnlTbG96ZW5lay51cHNlcnQobW9kZWxEYXRhKS5nZXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0VWxveml0IVwiLCBcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtUGFyYW1ldHJ5U2xvemVuZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA2ODhcIiwgdHJ1ZSwgLy9SQyAzMzYwMDY4OCA6IFBvxaF0YVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDY4OVwiKSAvL1JDIDMzNjAwNjg5IDogVsO9YsSbciBwb8WhdHkgenByYWNvdsOhdmFqw61jw60gc2xvxb5lbmt5IHogxI3DrXNlbG7DrWt1IGV4dGVybsOtY2ggc3ViamVrdMWvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZXN1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfcG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZXN1X3BvPXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDY5MFwiLCB0cnVlLCAvL1JDIDMzNjAwNjkwIDogxIzDrXNsbyDDusSNdHUgcG/FoXR5XHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNjkxXCIpIC8vUkMgMzM2MDA2OTEgOiDEjMOtc2xvIMO6xI10dSBwb8WhdHkgcHJvIHNsb8W+ZW5reSAtIHDFmWlkxJtsw60gcG/FoXRhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X3BvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjkyXCIsIHRydWUsIC8vUkMgMzM2MDA2OTIgOiBTbcSbcm92w70ga8OzZCDDusSNdHUgcG/FoXR5XHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNjkzXCIpIC8vUkMgMzM2MDA2OTMgOiBTbcSbcm92w70ga8OzZCBiYW5reSBwb8WhdHkgcHJvIHNsb8W+ZW5reSAtIHDFmWlkxJtsw60gcG/FoXRhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNrX3BvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjk0XCIsIHRydWUsIC8vUkMgMzM2MDA2OTQgOiBTcGVjaWZpY2vDvSBzeW1ib2wgcHJvIHBvxaF0dVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDY5NVwiKSAvL1JDIDMzNjAwNjk1IDogU3BlY2lmaWNrw70gc3ltYm9sIHBybyBzbG/FvmVua3kgLSBwxZlpZMSbbMOtIHBvxaF0YVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzc19wb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwLTlcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA2OTZcIiwgdHJ1ZSwgLy9SQyAzMzYwMDY5NiA6IEtvbnN0YW50bsOtIHN5bWJvbCBwcm8gcG/FoXR1XHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNjk3XCIpIC8vUkMgMzM2MDA2OTcgOiBLb25zdGFudG7DrSBzeW1ib2wgcHJvIHNsb8W+ZW5reSAtIHDFmWlkxJtsw60gcG/FoXRhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtzX3BvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAtOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDY5OFwiLCB0cnVlLCAvL1JDIDMzNjAwNjk4IDogxIzDrXNsbyBwb2RhdmF0ZWxlXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNjk5XCIpIC8vUkMgMzM2MDA2OTkgOiDEjMOtc2xvIHBvZGF2YXRlbGUgcHJvIHNsb8W+ZW5reSAtIHDFmWlkxJtsw60gcG/FoXRhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19wb2RcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA3MDBcIiwgdHJ1ZSwgLy9SQyAzMzYwMDcwMCA6IMSMw61zbG8gVkRTXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNzAxXCIpIC8vUkMgMzM2MDA3MDEgOiBQb8SNw6F0ZcSNbsOtIMSNw61zbG8gVkRTIC0gc3RhbmRhcnRuxJsgMVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZHNcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA3MDJcIiwgdHJ1ZSkgLy9SQyAzMzYwMDcwMiA6IFR5cCBwbGFjZW7DrSBzYXpieSBwcm8gcG/FoXR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwdV9wbGFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC56cHVfcGxhPXZhbHVlLnpwdV9wbGFcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpwdV9wbGE6IFwiMFwiLCB6cHVfcGxhX3R4dDogXCJaIGplZG5vaG8gw7rEjXR1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgenB1X3BsYTogXCIxXCIsIHpwdV9wbGFfdHh0OiBcIlplIGR2b3Ugw7rEjXTFr1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogW1wienB1X3BsYVwiXSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3pwdV9wbGFfdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5mbGFncy52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZT8uenB1X3BsYSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImJ1X3NhLHNrX3NhLGtzX3NhXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImJ1X3NhLHNrX3NhLGtzX3NhXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImJ1X3NhLHNrX3NhLGtzX3NhXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNzAzXCIsIHRydWUsIC8vUkMgMzM2MDA3MDMgOiDEjMOtc2xvIMO6xI10dSBzYXplYlxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDcwNFwiKSAvL1JDIDMzNjAwNzA0IDogxIzDrXNsbyB2bGFzdG7DrWhvIMO6xI10dSBwcm8gw7pocmFkdSB6YXplYiB6YSBzbG/FvmVua3kgKHR5cCBwbGFjZW7DrSAxKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV9zYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDcwNVwiLCB0cnVlLCAvL1JDIDMzNjAwNzA1IDogU23Em3JvdsO9IGvDs2Qgw7rEjXR1IHNhemViXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNjAwNzA2XCIpIC8vUkMgMzM2MDA3MDYgOiBTbcSbcm92w70ga8OzZCBiYW5reSBwcm8gw7pocmFkdSB6YXplYiB6YSBzbG/FvmVua3kgKHR5cCBwbGFjZW7DrSAxKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJza19zYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDcwN1wiLCB0cnVlLCAvL1JDIDMzNjAwNzA3IDogS29uc3RhbnRuw60gc3ltYm9sIHBybyBzYXpieVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDcwOFwiKSAvL1JDIDMzNjAwNzA4IDogS29uc3RhbnRuw60gc3ltYm9sIHBybyDDumhyYWR1IHphemViIHphIHNsb8W+ZW5reSAodHlwIHBsYWNlbsOtIDEpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtzX3NhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAtOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=