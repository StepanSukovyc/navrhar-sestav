"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GAutomatickeParovani.ts                </Name>
//    <Description> Content pro automatické párování                            </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-07                                                  </Created>
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
            /** Content pro automatické párování */
            let GAutomatickeParovani = class GAutomatickeParovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Číslo dávky */
                    this.davka_cislo = -1;
                }
                onContentReady() {
                    let prom = $.Deferred().resolve().promise();
                    if (this.nedokonceneParovaniCount > 0) {
                        prom = Buc.Dialogs.GNedokonceneParovaniDlg({
                            parentContent: this,
                            ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                            opt: void 0
                        });
                    }
                    prom.then(() => {
                        this.beginOperation("jres:33600529"); //RC 33600529 : Probíhá automatické párování výpisů
                        return this.isl.BucAutomatickeParovani.automatickyParovat().get().then((davka_cislo) => {
                            this.davka_cislo = davka_cislo;
                            this.createActions();
                            //tisky za sebou - nejdříve spárované, pak nespárované
                            this.actions.actTiskSparovane?.run();
                        }).fail(() => { this.tryClose(); }).always(() => { this.endOperation(); });
                    });
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actTiskSparovane: Gordic.Eko.Action.actionTisk({
                            name: "actTiskSparovane",
                            tema: "buc_ptm_prospg",
                            ixsStr: this.buc_ptm_prospg,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GAutomatickeParovani:PrintParameters",
                            reportStarting: function (rep) {
                                rep.customDto = { davka_cislo: that.davka_cislo };
                            },
                            reportFinished: () => {
                                that.actions.actTiskNesparovane?.run();
                            },
                            reportCancelled: () => {
                                that.actions.actTiskNesparovane?.run();
                            }
                        }),
                        actTiskNesparovane: Gordic.Eko.Action.actionTisk({
                            name: "actTiskNesparovane",
                            tema: "buc_ptm_pronpg",
                            ixsStr: this.buc_ptm_pronpg,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GAutomatickeParovani:PrintParameters",
                            reportStarting: function (rep) {
                                rep.customDto = { davka_cislo: that.davka_cislo };
                            },
                            reportFinished: () => {
                                that.tryClose();
                            },
                            reportCancelled: () => {
                                that.tryClose();
                            }
                        }),
                    });
                }
            };
            GAutomatickeParovani = __decorate([
                Decorators.gcontent
            ], GAutomatickeParovani);
            WebClient.GAutomatickeParovani = GAutomatickeParovani;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0F1dG9tYXRpY2tlUGFyb3ZhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQXV0b21hdGlja2VQYXJvdmFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQTBFZjtBQTFFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwRW5CO0lBMUVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwRTdCO1FBMUVvQixXQUFBLFNBQVM7WUFDMUIsdUNBQXVDO1lBRXZDLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQUF0RDs7b0JBUUksa0JBQWtCO29CQUNWLGdCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBNkRyQyxDQUFDO2dCQTNERyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDNUMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ3BDLElBQUksR0FBRyxJQUFBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQzs0QkFDbkMsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFdBQVcsRUFBRSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWU7NEJBQ3JELEdBQUcsRUFBRSxLQUFLLENBQUM7eUJBQ2QsQ0FBQyxDQUFBO29CQUNOLENBQUM7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDLG1EQUFtRDt3QkFDeEYsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7NEJBQ25GLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOzRCQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLHNEQUFzRDs0QkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQzt3QkFDekMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDOUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDM0MsSUFBSSxFQUFFLGtCQUFrQjs0QkFDeEIsSUFBSSxFQUFFLGdCQUFnQjs0QkFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjOzRCQUMzQixPQUFPLEVBQUUsSUFBSTs0QkFDYixxQkFBcUIsRUFBRSwyREFBMkQ7NEJBQ2xGLGNBQWMsRUFBRSxVQUFVLEdBQUc7Z0NBQ3pCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUN0RCxDQUFDOzRCQUNELGNBQWMsRUFBRSxHQUFHLEVBQUU7Z0NBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUM7NEJBQzNDLENBQUM7NEJBQ0QsZUFBZSxFQUFFLEdBQUcsRUFBRTtnQ0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsQ0FBQzs0QkFDM0MsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDN0MsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsSUFBSSxFQUFFLGdCQUFnQjs0QkFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjOzRCQUMzQixPQUFPLEVBQUUsSUFBSTs0QkFDYixxQkFBcUIsRUFBRSwyREFBMkQ7NEJBQ2xGLGNBQWMsRUFBRSxVQUFVLEdBQUc7Z0NBQ3pCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUN0RCxDQUFDOzRCQUNELGNBQWMsRUFBRSxHQUFHLEVBQUU7Z0NBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzs0QkFDRCxlQUFlLEVBQUUsR0FBRyxFQUFFO2dDQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQztxQkFDTCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUE7WUF0RVksb0JBQW9CO2dCQURoQyxVQUFVLENBQUMsUUFBUTtlQUNQLG9CQUFvQixDQXNFaEM7WUF0RVksOEJBQW9CLHVCQXNFaEMsQ0FBQTtRQUNMLENBQUMsRUExRW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBFN0I7SUFBRCxDQUFDLEVBMUVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwRW5CO0FBQUQsQ0FBQyxFQTFFUyxNQUFNLEtBQU4sTUFBTSxRQTBFZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HQXV0b21hdGlja2VQYXJvdmFuaS50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gYXV0b21hdGlja8OpIHDDoXJvdsOhbsOtICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTAtMDcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIENvbnRlbnQgcHJvIGF1dG9tYXRpY2vDqSBww6Fyb3bDoW7DrSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQXV0b21hdGlja2VQYXJvdmFuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFBvxI1ldCBwb2xvxb5layBuZWRva29uxI1lbsOpaG8gcMOhcm92w6Fuw60qL1xyXG4gICAgICAgIHByaXZhdGUgbmVkb2tvbmNlbmVQYXJvdmFuaUNvdW50OiBudW1iZXI7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciBwcm8gdGlzayAtIEJVQyAtIFRUIFByb3Rva29sIHNww6Fyb3ZhbsO9Y2ggcGxhdGViIChHUikgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fcHJvc3BnOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciBwcm8gdGlzayAtIEJVQyAtIFRUIFByb3Rva29sIG5lc3DDoXJvdmFuw71jaCBwbGF0ZWIgKEdSKSAqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B0bV9wcm9ucGc6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqIMSMw61zbG8gZMOhdmt5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXZrYV9jaXNsbzogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbSA9ICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uZWRva29uY2VuZVBhcm92YW5pQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9tID0gRGlhbG9ncy5HTmVkb2tvbmNlbmVQYXJvdmFuaURsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyxcclxuICAgICAgICAgICAgICAgICAgICBvcHQ6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9tLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzM2MDA1MjlcIikgLy9SQyAzMzYwMDUyOSA6IFByb2LDrWjDoSBhdXRvbWF0aWNrw6kgcMOhcm92w6Fuw60gdsO9cGlzxa9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNBdXRvbWF0aWNrZVBhcm92YW5pLmF1dG9tYXRpY2t5UGFyb3ZhdCgpLmdldCgpLnRoZW4oKGRhdmthX2Npc2xvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXZrYV9jaXNsbyA9IGRhdmthX2Npc2xvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGlza3kgemEgc2Vib3UgLSBuZWpkxZnDrXZlIHNww6Fyb3ZhbsOpLCBwYWsgbmVzcMOhcm92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrU3Bhcm92YW5lPy5ydW4oKTtcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoKCkgPT4geyB0aGlzLnRyeUNsb3NlKCk7IH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tTcGFyb3ZhbmU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1NwYXJvdmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiYnVjX3B0bV9wcm9zcGdcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoaXMuYnVjX3B0bV9wcm9zcGcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0F1dG9tYXRpY2tlUGFyb3Zhbmk6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgZGF2a2FfY2lzbG86IHRoYXQuZGF2a2FfY2lzbG8gfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrTmVzcGFyb3ZhbmU/LnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0Q2FuY2VsbGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrTmVzcGFyb3ZhbmU/LnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0VGlza05lc3Bhcm92YW5lOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tOZXNwYXJvdmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiYnVjX3B0bV9wcm9ucGdcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoaXMuYnVjX3B0bV9wcm9ucGcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0F1dG9tYXRpY2tlUGFyb3Zhbmk6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgZGF2a2FfY2lzbG86IHRoYXQuZGF2a2FfY2lzbG8gfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydENhbmNlbGxlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=