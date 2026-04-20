"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVSeznam.ts                      </Name>
//    <Description> Dialog se s maskou pro tisk seznamu dávek avíz platebních karet </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-27                                                  </Created>
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
            /**Dialog se s maskou pro tisk seznamu dávek avíz platebních karet */
            let GDavkaAvizoTiskMaska = class GDavkaAvizoTiskMaska extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    //TODO: některé dvojice stavů se ukládají duplicitně ... nutno probrat s pnovak
                    this.element.gpreset({
                        placeTo: PlaceEnum.command,
                        userSettings: this.userSettings,
                        elements: this.$form.findFields()
                    });
                    this.element.gpreset("apply");
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: (ev, ctx) => {
                                if (this.$form.gform("isValid")) {
                                    let modelData = {};
                                    this.$form.findFields().gfield("model", "collect", modelData);
                                    this.tryClose(modelData);
                                }
                            }
                        }),
                        actZrusit: Gordic.Eko.Action.actionZrusit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZrusit"]));
                }
                /**Vytvoření formuláře*/
                createForm() {
                    let form = new Gordic.Forms.Form()
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:33600289", //RC 33600289 : Datum transakce od-do
                        name: "dat_tra",
                        customOptFieldStart: {
                            defaultValue: parseDate(this.default_dat_tra_od)
                        },
                        customOptFieldEnd: {
                            defaultValue: parseDate(this.default_dat_tra_do)
                        }
                    }))
                        .addRow("jres:33600290") //RC 33600290 : Stav párovacích zápisů
                        .addField("gselectbox", Gordic.Prefabs.Select.buccspo(), {
                        name: "s_pol",
                        model: "model.s_pol=value.s_pol;model.s_pol_zkr<=value.s_pol_zkr",
                        list: true,
                        multi: true,
                        itemWidth: "",
                        itemTooltipTemplate: "{s_pol_txt:trim:encode}",
                        serverFilters: {
                            s_pol: [10, 12, 20, 25, 27, 30, 35, 40, 50]
                        }
                    });
                    this.$form = this.element.gform("createFrom", form);
                }
            };
            GDavkaAvizoTiskMaska = __decorate([
                Decorators.gcontent
            ], GDavkaAvizoTiskMaska);
            WebClient.GDavkaAvizoTiskMaska = GDavkaAvizoTiskMaska;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQXZpem9UaXNrTWFza2EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGF2a2FBdml6b1Rpc2tNYXNrYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2RixrR0FBa0c7QUFDbEcseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQW9GZjtBQXBGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvRm5CO0lBcEZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvRjdCO1FBcEZvQixXQUFBLFNBQVM7WUFDMUIscUVBQXFFO1lBRXJFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQVNsRCxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsK0VBQStFO29CQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDakIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO3dCQUMxQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQWE7d0JBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtxQkFDcEMsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FB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XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZTZXpuYW0udHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBzZSBzIG1hc2tvdSBwcm8gdGlzayBzZXpuYW11IGTDoXZlayBhdsOteiBwbGF0ZWJuw61jaCBrYXJldCA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAzLTI3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKkRpYWxvZyBzZSBzIG1hc2tvdSBwcm8gdGlzayBzZXpuYW11IGTDoXZlayBhdsOteiBwbGF0ZWJuw61jaCBrYXJldCAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGF2a2FBdml6b1Rpc2tNYXNrYSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIERlZmF1bHRuw60gaG9kbm90YSBkYXRfdHJhIG9kKi9cclxuICAgICAgICBwcml2YXRlIGRlZmF1bHRfZGF0X3RyYV9vZDogRGF0ZSB8IEpzb25EYXRlO1xyXG4gICAgICAgIC8qKiBEZWZhdWx0bsOtIGhvZG5vdGEgZGF0X3RyYSBkbyovXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZhdWx0X2RhdF90cmFfZG86IERhdGUgfCBKc29uRGF0ZTtcclxuXHJcbiAgICAgICAgLyoqIEZvcm11bMOhxZkgKi9cclxuICAgICAgICBwcml2YXRlICRmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgLy9UT0RPOiBuxJtrdGVyw6kgZHZvamljZSBzdGF2xa8gc2UgdWtsw6FkYWrDrSBkdXBsaWNpdG7EmyAuLi4gbnV0bm8gcHJvYnJhdCBzIHBub3Zha1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3ByZXNldCh7XHJcbiAgICAgICAgICAgICAgICBwbGFjZVRvOiBQbGFjZUVudW0uY29tbWFuZCxcclxuICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHM6IHRoaXMuJGZvcm0uZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5ncHJlc2V0KFwiYXBwbHlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9rOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Payh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vZGVsRGF0YTogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbW9kZWxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UobW9kZWxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2l0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPayFcIiwgXCJhY3RacnVzaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlZ5dHZvxZllbsOtIGZvcm11bMOhxZllKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMjg5XCIsIC8vUkMgMzM2MDAyODkgOiBEYXR1bSB0cmFuc2FrY2Ugb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF90cmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZFN0YXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcGFyc2VEYXRlKHRoaXMuZGVmYXVsdF9kYXRfdHJhX29kKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRFbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBwYXJzZURhdGUodGhpcy5kZWZhdWx0X2RhdF90cmFfZG8pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDI5MFwiKSAvL1JDIDMzNjAwMjkwIDogU3RhdiBww6Fyb3ZhY8OtY2ggesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y2NzcG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19wb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zX3BvbD12YWx1ZS5zX3BvbDttb2RlbC5zX3BvbF96a3I8PXZhbHVlLnNfcG9sX3prclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Ub29sdGlwVGVtcGxhdGU6IFwie3NfcG9sX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNfcG9sOiBbMTAsIDEyLCAyMCwgMjUsIDI3LCAzMCwgMzUsIDQwLCA1MF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0gPSB0aGlzLmVsZW1lbnQuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==