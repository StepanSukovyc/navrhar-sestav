"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GAdresati.ts                           </Name>
//    <Description> Adresáti                                                    </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
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
                    let GAdresati = class GAdresati extends Gordic.GContentBase {
                        constructor() {
                            super(...arguments);
                            this.changed = false;
                        }
                        onContentReady() {
                            this.title = `Adresáti kroku vymáhání`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGAdresatiZavritPotomky"]
                                }]);
                            this.createForm();
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1S1M1, L-0-12-0, M-0-12-0, S-0-12-0" }).addRow().addField("gcheck", {
                                name: "vybrane",
                                label: "Pouze vybrané",
                                change: (ev, obj) => {
                                    if (obj != null && obj.value != null) {
                                        this.setData(obj.value);
                                    }
                                    else
                                        this.setData(false);
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.grid = $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                columns: WebClient.Common.GridFormats.NavazaniAdresati(this.readOnly, (ev, obj) => {
                                    if (!this.readOnly) {
                                        this.changed = true;
                                    }
                                })
                            });
                            this.grid.gprogressoverlay({});
                            this.grid.gprogressoverlay("setPending", true);
                            let promise = Gordic.Isl.KrokyVymahani.navazaniAdresati({ ixs_skv: this.ixs_skv, stav_vym: this.stav_vym })
                                .get();
                            this.refreshData(promise);
                        }
                        refreshData(promise) {
                            promise.done((data) => {
                                this.navazaniAdresati = data;
                                if (!this.closed) {
                                    let vybrane = this.defaultForm.findFields("vybrane").gfield("getValue");
                                    this.setData(vybrane);
                                    this.grid.gprogressoverlay("setPending", false);
                                }
                            });
                        }
                        setData(vybrane) {
                            let newData;
                            if (vybrane) {
                                newData = this.navazaniAdresati.filter((row) => { return row.vazba === true; });
                            }
                            else {
                                newData = this.navazaniAdresati;
                            }
                            this.grid.ggrid("setData", new Gordic.Data.View(newData, { key: "stav_vym" }));
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGAdresatiZavritPotomky",
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
                                    .filter(x => x.vazba)
                                    .map(x => { return x.ixs_dva; });
                                let promise = Gordic.Isl.KrokyVymahani.nastavitNavazaneAdresaty({
                                    ixs_skv: this.ixs_skv,
                                    stav_vym: this.stav_vym,
                                    ixs_dva: items
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
                    GAdresati = __decorate([
                        Decorators.gcontent
                    ], GAdresati);
                    Vymahani.GAdresati = GAdresati;
                })(Vymahani = Controls.Vymahani || (Controls.Vymahani = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkcmVzYXRpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0FkcmVzYXRpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBMEpmO0FBMUpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBKbkI7SUExSmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBKN0I7UUExSm9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQTBKdEM7WUExSjhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLFFBQVEsQ0EwSi9DO2dCQTFKdUMsV0FBQSxRQUFRO29CQUU1QyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsT0FBQSxZQUFZO3dCQUEzQzs7NEJBV1ksWUFBTyxHQUFZLEtBQUssQ0FBQzt3QkE0SXJDLENBQUM7d0JBMUlHLGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUM7aUNBQ3BELENBQUMsQ0FBQyxDQUFDOzRCQUVKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQzt3QkFFTyxVQUFVOzRCQUVkLElBQUksSUFBSSxHQUFHLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2hILElBQUksRUFB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LENBQUMsQ0FBQzt3QkFDckIsQ0FBQztxQkFDSixDQUFBO29CQXZKWSxTQUFTO3dCQURyQixVQUFVLENBQUMsUUFBUTt1QkFDUCxTQUFTLENBdUpyQjtvQkF2Slksa0JBQVMsWUF1SnJCLENBQUE7Z0JBQ0wsQ0FBQyxFQTFKdUMsUUFBUSxHQUFSLGlCQUFRLEtBQVIsaUJBQVEsUUEwSi9DO1lBQUQsQ0FBQyxFQTFKOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUEwSnRDO1FBQUQsQ0FBQyxFQTFKb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMEo3QjtJQUFELENBQUMsRUExSmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBKbkI7QUFBRCxDQUFDLEVBMUpTLE1BQU0sS0FBTixNQUFNLFFBMEpmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdBZHJlc2F0aS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBBZHJlc8OhdGkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDMtMTEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FkcmVzYXRpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgaXhzX3Nrdjogc3RyaW5nO1xyXG4gICAgICAgIHN0YXZfdnltOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHJlYWRPbmx5OiBib29sZWFuO1xyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmF2YXphbmlBZHJlc2F0aTogSW50ZXJmYWNlLkxLLklzbC5HTmF2YXphbmlBZHJlc2F0aUR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBBZHJlc8OhdGkga3Jva3Ugdnltw6Fow6Fuw61gO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0FkcmVzYXRpWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxUzFNMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnlicmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6XCJQb3V6ZSB2eWJyYW7DqVwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmoudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEob2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR05hdmF6YW5pQWRyZXNhdGlEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuTmF2YXphbmlBZHJlc2F0aSh0aGlzLnJlYWRPbmx5LCAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5ncHJvZ3Jlc3NvdmVybGF5KHt9KTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBJc2wuS3Jva3lWeW1haGFuaS5uYXZhemFuaUFkcmVzYXRpKHsgaXhzX3NrdjogdGhpcy5peHNfc2t2LCBzdGF2X3Z5bTogdGhpcy5zdGF2X3Z5bSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoRGF0YShwcm9taXNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaERhdGEocHJvbWlzZTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR05hdmF6YW5pQWRyZXNhdGlEdG9bXT4pIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmF6YW5pQWRyZXNhdGkgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2eWJyYW5lOiBib29sZWFuID0gdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInZ5YnJhbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHZ5YnJhbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5ncHJvZ3Jlc3NvdmVybGF5KFwic2V0UGVuZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERhdGEodnlicmFuZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBsZXQgbmV3RGF0YTtcclxuICAgICAgICAgICAgaWYgKHZ5YnJhbmUpIHtcclxuICAgICAgICAgICAgICAgIG5ld0RhdGEgPSB0aGlzLm5hdmF6YW5pQWRyZXNhdGkuZmlsdGVyKChyb3cpID0+IHsgcmV0dXJuIHJvdy52YXpiYSA9PT0gdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld0RhdGEgPSB0aGlzLm5hdmF6YW5pQWRyZXNhdGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCBuZXcgRGF0YS5WaWV3KG5ld0RhdGEsIHsga2V5OiBcInN0YXZfdnltXCIgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0FkcmVzYXRpWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvU2F2ZShkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55Pikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLmdyaWRcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXZhemFuaUFkcmVzYXRpRHRvPihcImdldFZpZXdcIilcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Um93cygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHgudmF6YmEpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh4ID0+IHsgcmV0dXJuIHguaXhzX2R2YSE7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gSXNsLktyb2t5VnltYWhhbmkubmFzdGF2aXROYXZhemFuZUFkcmVzYXR5KHtcclxuICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiB0aGlzLml4c19za3YsXHJcbiAgICAgICAgICAgICAgICAgICAgc3Rhdl92eW06IHRoaXMuc3Rhdl92eW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX2R2YTogaXRlbXNcclxuICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHByb21pc2UsIHRoaXMsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4geyBkZWYucmVzb2x2ZSgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmLnJlamVjdCgpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlKGFzazogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VkICYmIGFzaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJVbG/Fvml0XCIsIFwiQ2hjZXRlIHVsb8W+aXQgem3Em255P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9TYXZlKGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2luZygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==