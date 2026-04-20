"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            const { gcontent } = Decorators;
            let ActionNames;
            (function (ActionNames) {
                ActionNames["Ok"] = "actOk";
            })(ActionNames || (ActionNames = {}));
            const FormName = "ZapisDoDdpForm";
            let GZapisDoDdpDlg = class GZapisDoDdpDlg extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    //private dto: Interface.GZapisDoDdpDto = {};
                    this.$Form = $("<div>");
                }
                onContentReady() {
                    this.CreateMenu();
                    this.$Form = this.CreateForm(this.element, this.userSettings);
                    const $fields = this.$Form.findFields();
                    $fields.gfield("model", "apply", this.model);
                }
                CreateMenu() {
                    const content = this;
                    const commandBarPole = [];
                    commandBarPole.push({
                        action: content.actions.add(new GAction({
                            name: ActionNames.Ok,
                            caption: "jres:25200121", //RC 25200121 : OK
                            tooltip: "jres:25200122", //RC 25200122 : OK
                            run: function () {
                                content.okClick();
                            }
                        })),
                        favorite: true,
                        customClass: "g-button--primary"
                    });
                    commandBarPole.push({
                        action: content.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    content.commandBar(content.actions.createBar(commandBarPole));
                }
                CreateForm(appendTo, userSettings) {
                    var that = this;
                    // Formulář
                    const formBuilder = new Gordic.Forms.Form({
                        name: FormName,
                        layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0"
                    })
                        .addSection("")
                        .addRow("jres:25200407") //RC 25200407 : Kniha příjmů
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpsden(), {
                        name: "ixp_den_ddp", model: "model.ixp_den_ddp=value.ixp_den", dropdown: false,
                        serverFilters: {
                            ico: that.model.Eko.Ico,
                            ucs: that.model.Eko.Ucs,
                            rok: that.model.Eko.Rok,
                        },
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    })
                        .addRow("jres:25200409") //RC 25200409 : Referent
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpvrfu(), {
                        dropdown: false, name: "ixs_fun", model: "model.ixs_fun=value.ixs_fun",
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                        serverFilters: {
                            ixp_den: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true)
                        }
                    })
                        .addRow("jres:25200408") //RC 25200408 : Typ příjmu
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl_ddp", model: "model.typ_phl_ddp=value.typ_phl", dropdown: false,
                        serverFilters: {
                            povolene_pro_knihu: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true),
                            povolene_pro_funkci: new Gordic.Forms.Dependency("ixs_fun", "ixs_fun", true),
                        },
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    })
                        .addRow()
                        .addField("gradio", {
                        name: "predpis_nebo_napojeni",
                        radios: [
                            { value: 0, label: "jres:25200410" }, //RC 25200410 : Napojení na pohledávku
                            { value: 1, label: "jres:25200411" }, //RC 25200411 : Napojení na pohledávku s předpisem
                        ],
                        disabled: !that.model.predpis_nebo_napojeni_enable,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("jres:25200412") //RC 25200412 : Výše platby
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_pop", model: "model.Platba.c_pop = value", placeholder: "jres:25200141",
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    }) //RC 25200141 : Výše platby
                        .addRow("jres:25200413") //RC 25200413 : Splatnost
                        .addField("gdatebox", {
                        name: "dat_splatnosti", model: "model.dat_splatnosti=value", valueType: "date",
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                    });
                    // Přidání formuláře do DOMu.
                    return $("<div>")
                        .appendTo(appendTo)
                        .gform("createFrom", formBuilder);
                }
                closing(result) {
                    return $.Deferred().resolve(result).promise();
                }
                okClick() {
                    var that = this;
                    if (!this.$Form.gform("isValid")) {
                        return;
                    }
                    this.$Form.findFields().gfield("model", "collect", this.model);
                    // Uloz uziv params
                    if (this.globalSettings != null) {
                        this.globalSettings.set("contents.SPRZapisDoDdpDlg.LastUsedKnihaDDP", this.model.ixp_den_ddp);
                        this.globalSettings.set("contents.SPRZapisDoDdpDlg.LastSpravcePohledavek", this.model.ixs_fun);
                        this.globalSettings.set("contents.SPRZapisDoDdpDlg.LastTypPohledavky", this.model.typ_phl_ddp);
                    }
                    // Zapis do DDP
                    this.call("ZapisDoDDP", { detailDto: that.model })
                        .done(function () {
                        that.tryClose({ Zmena: true });
                    });
                }
            };
            GZapisDoDdpDlg = __decorate([
                gcontent
            ], GZapisDoDdpDlg);
            WebApp.GZapisDoDdpDlg = GZapisDoDdpDlg;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1phcGlzRG9EZHBEbGcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHWmFwaXNEb0RkcERsZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBMkpmO0FBM0pELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJKbkI7SUEzSmdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQTJKMUI7UUEzSm9CLFdBQUEsTUFBTTtZQUN2QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFBO1lBZS9CLElBQUssV0FFSjtZQUZELFdBQUssV0FBVztnQkFDWiwyQkFBWSxDQUFBO1lBQ2hCLENBQUMsRUFGSSxXQUFXLEtBQVgsV0FBVyxRQUVmO1lBRUQsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUE7WUFHakMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQUVJLDZDQUE2QztvQkFDckMsVUFBSyxHQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBZ0lwRCxDQUFDO2dCQTdIVSxjQUFjO29CQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFhLENBQUMsQ0FBQztvQkFFL0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFFTyxVQUFVO29CQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztvQkFFckIsTUFBTSxjQUFjLEdBQWlCLEVBQUUsQ0FBQztvQkFDeEMsY0FBYyxDQUFDLElBQUksQ0FBQzt3QkFDaEIs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QUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNuRyxDQUFDO29CQUVELGVBQWU7b0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3lCQUM3QyxJQUFJLENBQUM7d0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNuQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0osQ0FBQTtZQW5JWSxjQUFjO2dCQUQxQixRQUFRO2VBQ0ksY0FBYyxDQW1JMUI7WUFuSVkscUJBQWMsaUJBbUkxQixDQUFBO1FBQ0wsQ0FBQyxFQTNKb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBMkoxQjtJQUFELENBQUMsRUEzSmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJKbkI7QUFBRCxDQUFDLEVBM0pTLE1BQU0sS0FBTixNQUFNLFFBMkpmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdaYXBpc0RvRGRwRGxnSW5wdXRQYXJhbXMge1xyXG4gICAgICAgIEl4cFNwaXM6IHN0cmluZyxcclxuICAgICAgICBSYWRla1BvcDogbnVtYmVyLFxyXG4gICAgICAgIFZ5c2VQbGF0Ynk/OiBEZWNpbWFsLFxyXG4gICAgICAgIEl4cERkcFNwb2w/OiBzdHJpbmcsXHJcbiAgICAgICAgVlNTcG9sPzogc3RyaW5nLFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1phcGlzRG9EZHBEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgWm1lbmE/OiBib29sZWFuLFxyXG4gICAgICAgIC8vWmFwaXNEb0RkcDogSW50ZXJmYWNlLkdaYXBpc0RvRGRwRHRvO1xyXG4gICAgfVxyXG5cclxuICAgIGVudW0gQWN0aW9uTmFtZXMge1xyXG4gICAgICAgIE9rID0gXCJhY3RPa1wiXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgRm9ybU5hbWUgPSBcIlphcGlzRG9EZHBGb3JtXCJcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHWmFwaXNEb0RkcERsZyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9wcml2YXRlIGR0bzogSW50ZXJmYWNlLkdaYXBpc0RvRGRwRHRvID0ge307XHJcbiAgICAgICAgcHJpdmF0ZSAkRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PiA9ICQoXCI8ZGl2PlwiKTtcclxuICAgICAgICBtb2RlbDogYW55O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRGb3JtID0gdGhpcy5DcmVhdGVGb3JtKHRoaXMuZWxlbWVudCwgdGhpcy51c2VyU2V0dGluZ3MhKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZHMgPSB0aGlzLiRGb3JtLmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgJGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRCYXJQb2xlOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGNvbnRlbnQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEFjdGlvbk5hbWVzLk9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEyMVwiLCAvL1JDIDI1MjAwMTIxIDogT0tcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxMjJcIiwgLy9SQyAyNTIwMDEyMiA6IE9LXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQub2tDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGNvbnRlbnQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oR29yZGljLlByZWZhYnMuQWN0aW9ucy5aYXZyaXRDb250ZW50KCkpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29udGVudC5jb21tYW5kQmFyKGNvbnRlbnQuYWN0aW9ucy5jcmVhdGVCYXIoY29tbWFuZEJhclBvbGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlRm9ybShcclxuICAgICAgICAgICAgYXBwZW5kVG86IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nczogRGF0YS5JR1N0b3JhZ2VcclxuICAgICAgICApOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBGb3JtdWzDocWZXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1CdWlsZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEZvcm1OYW1lLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi0xMC0wLCBNLTMtOS0wLCBTLTEyLTEyLTBcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDA3XCIpIC8vUkMgMjUyMDA0MDcgOiBLbmloYSBwxZnDrWptxa9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcHNkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2Rlbl9kZHBcIiwgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbl9kZHA9dmFsdWUuaXhwX2RlblwiLCBkcm9wZG93bjogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0Lm1vZGVsLkVrby5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC5tb2RlbC5Fa28uVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQubW9kZWwuRWtvLlJvayxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDA5XCIpIC8vUkMgMjUyMDA0MDkgOiBSZWZlcmVudFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwdnJmdSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLCBuYW1lOiBcIml4c19mdW5cIiwgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bj12YWx1ZS5peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHBfZGVuX2RkcFwiLCBcIml4cF9kZW5cIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDA0MDhcIikgLy9SQyAyNTIwMDQwOCA6IFR5cCBwxZnDrWptdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsX2RkcFwiLCBtb2RlbDogXCJtb2RlbC50eXBfcGhsX2RkcD12YWx1ZS50eXBfcGhsXCIsIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdm9sZW5lX3Byb19rbmlodTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2Rlbl9kZHBcIiwgXCJpeHBfZGVuXCIsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3ZvbGVuZV9wcm9fZnVua2NpOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfZnVuXCIsIFwiaXhzX2Z1blwiLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZWRwaXNfbmVib19uYXBvamVuaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwianJlczoyNTIwMDQxMFwiIH0sIC8vUkMgMjUyMDA0MTAgOiBOYXBvamVuw60gbmEgcG9obGVkw6F2a3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwianJlczoyNTIwMDQxMVwiIH0sIC8vUkMgMjUyMDA0MTEgOiBOYXBvamVuw60gbmEgcG9obGVkw6F2a3UgcyBwxZllZHBpc2VtXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQubW9kZWwucHJlZHBpc19uZWJvX25hcG9qZW5pX2VuYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDEyXCIpICAvL1JDIDI1MjAwNDEyIDogVsO9xaFlIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wb3BcIiwgbW9kZWw6IFwibW9kZWwuUGxhdGJhLmNfcG9wID0gdmFsdWVcIiwgcGxhY2Vob2xkZXI6IFwianJlczoyNTIwMDE0MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAyNTIwMDE0MSA6IFbDvcWhZSBwbGF0YnlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwNDEzXCIpIC8vUkMgMjUyMDA0MTMgOiBTcGxhdG5vc3RcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zcGxhdG5vc3RpXCIsIG1vZGVsOiBcIm1vZGVsLmRhdF9zcGxhdG5vc3RpPXZhbHVlXCIsIHZhbHVlVHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgLy8gUMWZaWTDoW7DrSBmb3JtdWzDocWZZSBkbyBET011LlxyXG4gICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oYXBwZW5kVG8pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvc2luZyhyZXN1bHQpOiBKUXVlcnkuUHJvbWlzZTxHWmFwaXNEb0RkcERsZ1JldHVyblZhbHVlPiB7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXN1bHQpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2tDbGljaygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJEZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kRm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gVWxveiB1eml2IHBhcmFtc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxTZXR0aW5ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFNldHRpbmdzLnNldChcImNvbnRlbnRzLlNQUlphcGlzRG9EZHBEbGcuTGFzdFVzZWRLbmloYUREUFwiLCB0aGlzLm1vZGVsLml4cF9kZW5fZGRwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU2V0dGluZ3Muc2V0KFwiY29udGVudHMuU1BSWmFwaXNEb0RkcERsZy5MYXN0U3ByYXZjZVBvaGxlZGF2ZWtcIiwgdGhpcy5tb2RlbC5peHNfZnVuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU2V0dGluZ3Muc2V0KFwiY29udGVudHMuU1BSWmFwaXNEb0RkcERsZy5MYXN0VHlwUG9obGVkYXZreVwiLCB0aGlzLm1vZGVsLnR5cF9waGxfZGRwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gWmFwaXMgZG8gRERQXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbChcIlphcGlzRG9ERFBcIiwgeyBkZXRhaWxEdG86IHRoYXQubW9kZWwgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHsgWm1lbmE6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=