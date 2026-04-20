"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberFunkci.ts                        </Name>
//    <Description> Výběr funkcí                                                </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-03-11                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Vymahani;
                (function (Vymahani) {
                    let GVyberFunkci = class GVyberFunkci extends Gordic.GContentBase {
                        constructor() {
                            super(...arguments);
                            this.changed = false;
                        }
                        onContentReady() {
                            this.title = `Výběr funkce`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGVyberFunkciZavritPotomky"]
                                }]);
                            this.createForm();
                        }
                        createForm() {
                            this.view = new Gordic.Isl.View(Gordic.Isl.Vymahaci.dostupneFunkce(rq => {
                                return {
                                    filters: {
                                        ixs_skv: this.ixs_skv
                                    }
                                };
                            }));
                            this.grid = $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.view,
                                columns: WebClient.Common.GridFormats.DostupneFunkce(this.readOnly, (ev, obj) => {
                                    if (!this.readOnly) {
                                        this.changed = true;
                                    }
                                })
                            });
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGVyberFunkciZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        doSave(def) {
                            if (this.changed) {
                                let items = this.grid
                                    .ggrid("getView")
                                    .getRows()
                                    .filter(x => x.vybrat)
                                    .map(x => { return x.ixs_fun; });
                                let promise = Gordic.Isl.SkupinaVymahani.nastavitVybraneFunkce({
                                    ixs_skv: this.ixs_skv,
                                    ixs_fun: items
                                }).get();
                                WebClient.Common.Base.ProcessResponse(promise, this, true)
                                    .done(() => { def.resolve(); })
                                    .fail(() => { def.reject(); });
                            }
                        }
                        save(ask = false) {
                            let def = $.Deferred();
                            if (this.changed && ask) {
                                this.dialogs.confirm("Uložit", "Chcete uložit změny?")
                                    .on("close", (ev, retVal) => {
                                    if (retVal === "yes") {
                                        this.doSave(def);
                                    }
                                    else
                                        def.resolve();
                                });
                            }
                            else if (this.changed)
                                this.doSave(def);
                            else {
                                def.done(() => {
                                    this.close();
                                });
                                def.resolve();
                            }
                            return def.promise();
                        }
                        closing() {
                            if (this.readOnly)
                                return;
                            else
                                return this.save(true);
                        }
                        cancel() {
                            this.close();
                        }
                        ok() {
                            this.save(false);
                        }
                    };
                    GVyberFunkci = __decorate([
                        Decorators.gcontent
                    ], GVyberFunkci);
                    Vymahani.GVyberFunkci = GVyberFunkci;
                })(Vymahani = Controls.Vymahani || (Controls.Vymahani = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyRnVua2NpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Z5YmVyRnVua2NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBa0hmO0FBbEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtIbkI7SUFsSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtIN0I7UUFsSG9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQWtIdEM7WUFsSDhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLFFBQVEsQ0FrSC9DO2dCQWxIdUMsV0FBQSxRQUFRO29CQUU1QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO3dCQUE5Qzs7NEJBU1ksWUFBTyxHQUFZLEtBQUssQ0FBQzt3QkFzR3JDLENBQUM7d0JBcEdHLGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7NEJBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29DQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0NBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO2lDQUN2RCxDQUFDLENBQUMsQ0FBQzs0QkFFSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ3RCLENBQUM7d0JBRU8sVUFBVTs0QkFFZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQUEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0NBQ3RELE9BQU87b0NBQ0gsT0FBTyxFQUFFO3dD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QyxHQUFHLEVBQUU7b0NBQ1YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dDQUNqQixDQUFDLENBQUMsQ0FBQztnQ0FDSCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ2xCLENBQUM7NEJBRUQsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3pCLENBQUM7d0JBRUQsT0FBTzs0QkFDSCxJQUFJLElBQUksQ0FBQyxRQUFRO2dDQUNiLE9BQU87O2dDQUVQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDL0IsQ0FBQzt3QkFFRCxNQUFNOzRCQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDakIsQ0FBQzt3QkFFRCxFQUFFOzRCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3JCLENBQUM7cUJBQ0osQ0FBQTtvQkEvR1ksWUFBWTt3QkFEeEIsVUFBVSxDQUFDLFFBQVE7dUJBQ1AsWUFBWSxDQStHeEI7b0JBL0dZLHFCQUFZLGVBK0d4QixDQUFBO2dCQUNMLENBQUMsRUFsSHVDLFFBQVEsR0FBUixpQkFBUSxLQUFSLGlCQUFRLFFBa0gvQztZQUFELENBQUMsRUFsSDhCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBa0h0QztRQUFELENBQUMsRUFsSG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtIN0I7SUFBRCxDQUFDLEVBbEhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrSG5CO0FBQUQsQ0FBQyxFQWxIUyxNQUFNLEtBQU4sTUFBTSxRQWtIZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJGdW5rY2kudHMgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVsO9YsSbciBmdW5rY8OtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxOS0wMy0xMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuVnltYWhhbmkge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJGdW5rY2kgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBpeHNfc2t2OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHJlYWRPbmx5OiBib29sZWFuO1xyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBJc2wuVmlldzxJbnRlcmZhY2UuTEsuSXNsLkdGdW5rY2VEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBWw71ixJtyIGZ1bmtjZWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHVnliZXJGdW5rY2laYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IElzbC5WaWV3KElzbC5WeW1haGFjaS5kb3N0dXBuZUZ1bmtjZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3NrdjogdGhpcy5peHNfc2t2XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Z1bmtjZUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuRG9zdHVwbmVGdW5rY2UodGhpcy5yZWFkT25seSwgKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1Z5YmVyRnVua2NpWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvU2F2ZShkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55Pikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLmdyaWRcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdGdW5rY2VEdG8gJiB7IHZ5YnJhdDogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwgfT4oXCJnZXRWaWV3XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFJvd3MoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LnZ5YnJhdClcclxuICAgICAgICAgICAgICAgICAgICAubWFwKHggPT4geyByZXR1cm4geC5peHNfZnVuITsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBJc2wuU2t1cGluYVZ5bWFoYW5pLm5hc3Rhdml0VnlicmFuZUZ1bmtjZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX3NrdjogdGhpcy5peHNfc2t2LFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c19mdW46IGl0ZW1zXHJcbiAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShwcm9taXNlLCB0aGlzLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHsgZGVmLnJlc29sdmUoKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IGRlZi5yZWplY3QoKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2F2ZShhc2s6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhbmdlZCAmJiBhc2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiVWxvxb5pdFwiLCBcIkNoY2V0ZSB1bG/Fvml0IHptxJtueT9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb1NhdmUoZGVmKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWYuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWRPbmx5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=