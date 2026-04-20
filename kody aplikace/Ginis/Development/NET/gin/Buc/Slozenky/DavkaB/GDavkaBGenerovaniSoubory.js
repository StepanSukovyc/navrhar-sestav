"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaBGenerovaniSoubory.ts            </Name>
//    <Description> Content pro generování dávek složenek B - zobrazení souborů, tisknutí a uhrazení </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-12                                                  </Created>
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
            /** Content pro generování dávek složenek B - zobrazení souborů, tisknutí a uhrazení */
            let GDavkaBGenerovaniSoubory = class GDavkaBGenerovaniSoubory extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.$form.findFields().gfield("model", "apply", { fileFieldDavkaB: this.fileInfos });
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actUhradit: Gordic.Eko.Action.actionUhradit({
                            enabled: true,
                            run: function (ev, ctx) {
                                that.tryClose({ uhradit: true });
                                this.setPending(100);
                            }
                        }),
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "buc_ptm_pruslg",
                            ixsStr: that.buc_ptm_pruslg,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GDavkaBGenerovaniSoubory:PrintParameters",
                            reportStarting: function (rep) {
                                rep.customDto = { ikc: that.ikc, UusGen: that.UusGen }; //Interface.GDavkaBGenerovaniSouboryTiskParamsDto
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose({ uhradit: false });
                            }
                        }
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actTisk", "actUhradit!", "actZavrit"]));
                }
                /** Vytvoření formuláře */
                createForm() {
                    let form = new Gordic.Forms.Form("L1M1S1")
                        .addRow("Soubory")
                        .addField("gfilefield", {
                        name: "fileFieldDavkaB",
                        model: "fileFieldDavkaB",
                        itemDeletable: false,
                        disabled: true,
                        downloadOnDisabledField: true,
                        canUpload: false
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
            };
            GDavkaBGenerovaniSoubory = __decorate([
                Decorators.gcontent
            ], GDavkaBGenerovaniSoubory);
            WebClient.GDavkaBGenerovaniSoubory = GDavkaBGenerovaniSoubory;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLG1IQUFtSDtBQUNuSCx5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBb0ZmO0FBcEZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9GbkI7SUFwRmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9GN0I7UUFwRm9CLFdBQUEsU0FBUztZQVkxQix1RkFBdUY7WUFFdkYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxPQUFBLFlBQVk7Z0JBVXRELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQzs0QkFDeEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQ0FDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDekIsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ2xDLElBQUksRUFBRSxTQUFTOzRCQUNmLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYzs0QkFDM0IsT0FBTyxFQUFFLElBQUk7NEJBQ2IscUJBQXFCLEVBQUUsK0RBQStEOzRCQUN0RixjQUFjLEVBQUUsVUFBVSxHQUFHO2dDQUN6QixHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLGlEQUFpRDs0QkFDN0csQ0FBQzt5QkFDSixDQUFDO3dCQUNGLFNBQVMsRUFBRTs0QkFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzRCQUMzQixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUN0QyxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELDRCQUE0QjtnQkFDcEIsZ0JBQWdCO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JGLENBQUM7Z0JBRUQsMEJBQTBCO2dCQUNsQixVQUFVO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO3lCQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDO3lCQUNqQixRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixLQUFLLEVBQUUsaUJBQWlCO3dCQUN4QixhQUFhLEVBQUUsS0FBSzt3QkFDcEIsUUFBUSxFQUFFLElBQUk7d0JBQ2QsdUJBQXVCLEVBQUUsSUFBSTt3QkFDN0IsU0FBUyxFQUFFLEtBQUs7cUJBQ25CLENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzdFLENBQUM7YUFDSixDQUFBO1lBckVZLHdCQUF3QjtnQkFEcEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCx3QkFBd0IsQ0FxRXBDO1lBckVZLGtDQUF3QiwyQkFxRXBDLENBQUE7UUFDTCxDQUFDLEVBcEZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvRjdCO0lBQUQsQ0FBQyxFQXBGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0ZuQjtBQUFELENBQUMsRUFwRlMsTUFBTSxLQUFOLE1BQU0sUUFvRmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5LnRzICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIGdlbmVyb3bDoW7DrSBkw6F2ZWsgc2xvxb5lbmVrIEIgLSB6b2JyYXplbsOtIHNvdWJvcsWvLCB0aXNrbnV0w60gYSB1aHJhemVuw60gPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjYgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNi0wMS0xMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgZ2VuZXJvdsOhbsOtIGTDoXZlayBzbG/FvmVuZWsgQiAtIHpvYnJhemVuw60gc291Ym9yxa8sIHRpc2tudXTDrSBhIHVocmF6ZW7DrSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdEYXZrYUJHZW5lcm92YW5pU291Ym9yeURsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICBmaWxlSW5mb3M6IEdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvW10sXHJcbiAgICAgICAgaWtjOiBzdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKiogVsO9c3R1cG7DrSBwYXJhbWV0cnkgZGlhbG9ndSBnZW5lcm92w6Fuw60gZMOhdmVrIHNsb8W+ZW5layBCIC0gem9icmF6ZW7DrSBzb3Vib3LFrywgdGlza251dMOtIGEgdWhyYXplbsOtKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5RGxnUmV0dXJuVmFsdWUge1xyXG4gICAgICAgIHVocmFkaXQ6IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udGVudCBwcm8gZ2VuZXJvdsOhbsOtIGTDoXZlayBzbG/FvmVuZWsgQiAtIHpvYnJhemVuw60gc291Ym9yxa8sIHRpc2tudXTDrSBhIHVocmF6ZW7DrSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGF2a2FCR2VuZXJvdmFuaVNvdWJvcnkgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBHRGF2a2FCR2VuZXJvdmFuaVNvdWJvcnlEbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgcHVibGljIGZpbGVJbmZvczogR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG9bXTtcclxuICAgICAgICBwdWJsaWMgaWtjOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgcHJvIHRpc2sgLSBCVUMgLSBUVCBQcsWvdm9ka2EgcHJvIHNsb8W+ZW5reSAoIEdSICkgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fcHJ1c2xnOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBVdXNHZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgZmlsZUZpZWxkRGF2a2FCOiB0aGlzLmZpbGVJbmZvcyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VWhyYWRpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWhyYWRpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoeyB1aHJhZGl0OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiYnVjX3B0bV9wcnVzbGdcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoYXQuYnVjX3B0bV9wcnVzbGcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5OlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGlrYzogdGhhdC5pa2MsIFV1c0dlbjogdGhhdC5VdXNHZW4gfTsgLy9JbnRlcmZhY2UuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5VGlza1BhcmFtc0R0b1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSh7IHVocmFkaXQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFRpc2tcIiwgXCJhY3RVaHJhZGl0IVwiLCBcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNvdWJvcnlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsZUZpZWxkRGF2a2FCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZmlsZUZpZWxkRGF2a2FCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbURlbGV0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRPbkRpc2FibGVkRmllbGQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuVXBsb2FkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19