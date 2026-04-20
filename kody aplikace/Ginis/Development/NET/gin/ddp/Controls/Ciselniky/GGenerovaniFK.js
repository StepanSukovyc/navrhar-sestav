"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GGenerovaniFK.ts                       </Name>
//    <Description> Generování FK - finanční kontroly                           </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-12-09                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Ciselniky;
                (function (Ciselniky) {
                    let GGenerovaniFK = class GGenerovaniFK extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            that.title = `Generování finanční kontroly`;
                            that.createActions();
                            that.setBreadcrumbs([{
                                    caption: that.title,
                                    action: that.actions["actGGenerovaniFKZavritPotomky"]
                                }]);
                            that.createCommandBar();
                            that.createForm();
                            WebClient.Common.Base.nastaveniPoleKtgUpo(this, this.IxpDen, this.data.typ_phl ?? "");
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Typ pohledávky", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPhlSimple(), {
                                name: "typ_phl",
                                model: "model.typ_phl=value.typ_phl",
                                disabled: this.editMode,
                                serverFilters: {
                                    aktivita: 100
                                },
                                change: (ev, obj) => {
                                    WebClient.Common.Base.aktualizovatPoleKtgUpo(this, this.IxpDen, obj.value?.typ_phl ?? "");
                                }
                            })
                                .addRow({ label: "Rok", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.rok(), {
                                model: "model.rok=value.rok",
                                disabled: this.editMode
                            })
                                .addRow({ label: "IČ Organizace", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosico(), {
                                name: "ico",
                                model: "model.ico=value.ico",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Účetní středisko", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), {
                                name: "ucs",
                                model: "model.ucs=value.ucs;model.ico=value.ico",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Kategorie pohybu", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                name: "ktg_upo",
                                model: "model.ktg_upo=value.ktg_upo",
                                serverFilters: {
                                    ktg_upo: { o: "<", v: 200 }
                                },
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow()
                                .addField("gcheck", {
                                name: "pri_fk",
                                label: "Generovat finanční kontrolu",
                                emptyValue: null,
                                modelValueTransform: {
                                    apply: function (modelValue) { return modelValue === 1; },
                                    collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "apply", this.data);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGGenerovaniFKZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ok() {
                            const that = this;
                            if (!this.defaultForm.gform("isValid"))
                                return;
                            else {
                                let dto = this.data;
                                this.defaultForm.findFields().gfield("model", "collect", dto);
                                let req = () => {
                                    return {
                                        data: dto
                                    };
                                };
                                let task = this.editMode ? that.isl.GenerovaniFK.update(req) : that.isl.GenerovaniFK.create(req);
                                //Common.Base.ProcessResponse(task.get(), this, true);
                                task.get()
                                    .fail((jqXHR, typ, obj) => {
                                    WebClient.Common.Base.getFailFromIsl(that, jqXHR, typ, obj);
                                }).done((retData) => {
                                    if (!retData) {
                                        // Pokud se mi nevrátili žádné data, vyhodím vyjímku
                                        return that.dialogs.error("Aplikační chyba", "Server nevrátil žádná data");
                                    }
                                    else {
                                        // Pokud nemám informaci o úspěchu operace, začnu zjišťovat důvod
                                        if (retData.result?.kind != 200) {
                                            // Zjistím zda mám nějaké zpráchy o chybě
                                            if (retData.result?.errors.length > 0) {
                                                // A v cyklu si je přidám do stringu který vyhodím v okně chyby
                                                let errorMsg = "";
                                                retData.result?.errors.forEach((msg) => {
                                                    errorMsg += msg.message + " <br>";
                                                });
                                                return that.dialogs.error("Chyba", errorMsg);
                                            }
                                            return that.dialogs.error("Chyba", "Neznámá chyba");
                                        }
                                        else {
                                            return that.close(true); // pokud je úspěch zavřu okno (true poslám aby se vědělo že nejde o obyčejné zavření okna)
                                        }
                                    }
                                });
                            }
                        }
                        /**
                         * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                         * @method createCommandBar()
                         */
                        createCommandBar() {
                            const that = this;
                            that.actions.addRange([
                                new GAction({
                                    name: "actSave",
                                    caption: "Uložit",
                                    icon: "fa-floppy-o",
                                    run: function () {
                                        that.ok();
                                    }
                                }),
                                new GAction({
                                    name: "actClose",
                                    caption: "Zavřít",
                                    icon: "gi-window-close",
                                    run: function () { that.close(); } // Zavření okna
                                })
                            ]);
                            that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                        }
                    };
                    GGenerovaniFK = __decorate([
                        Decorators.gcontent
                    ], GGenerovaniFK);
                    Ciselniky.GGenerovaniFK = GGenerovaniFK;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0dlbmVyb3ZhbmlGSy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdHZW5lcm92YW5pRksudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FxS2Y7QUFyS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUtuQjtJQXJLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcUs3QjtRQXJLb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBcUt0QztZQXJLOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsU0FBUyxDQXFLaEQ7Z0JBckt1QyxXQUFBLFNBQVM7b0JBRTdDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7d0JBTzNDLGNBQWM7NEJBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLDhCQUE4QixDQUFDOzRCQUM1QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO29DQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQztpQ0FDeEQsQ0FBQyxDQUFDLENBQUM7NEJBQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7NEJBRXZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDbEIsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNoRixDQUFDO3dCQUVP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Q1AsYUFBYSxDQWtLekI7b0JBbEtZLHVCQUFhLGdCQWtLekIsQ0FBQTtnQkFDTCxDQUFDLEVBckt1QyxTQUFTLEdBQVQsa0JBQVMsS0FBVCxrQkFBUyxRQXFLaEQ7WUFBRCxDQUFDLEVBcks4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQXFLdEM7UUFBRCxDQUFDLEVBcktvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxSzdCO0lBQUQsQ0FBQyxFQXJLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcUtuQjtBQUFELENBQUMsRUFyS1MsTUFBTSxLQUFOLE1BQU0sUUFxS2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0dlbmVyb3ZhbmlGSy50cyAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdlbmVyb3bDoW7DrSBGSyAtIGZpbmFuxI1uw60ga29udHJvbHkgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTEyLTA5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0dlbmVyb3ZhbmlGSyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaUZLRHRvO1xyXG4gICAgICAgIGVkaXRNb2RlOiBib29sZWFuO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBJeHBEZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYEdlbmVyb3bDoW7DrSBmaW5hbsSNbsOtIGtvbnRyb2x5YDtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdHZW5lcm92YW5pRktaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQmFyKClcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5uYXN0YXZlbmlQb2xlS3RnVXBvKHRoaXMsIHRoaXMuSXhwRGVuLCB0aGlzLmRhdGEudHlwX3BobCA/PyBcIlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIHBvaGxlZMOhdmt5XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBobFNpbXBsZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmFrdHVhbGl6b3ZhdFBvbGVLdGdVcG8odGhpcywgdGhpcy5JeHBEZW4sIG9iai52YWx1ZT8udHlwX3BobCA/PyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlJva1wiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5yb2soKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvaz12YWx1ZS5yb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJJxIwgT3JnYW5pemFjZVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5la29zaWNvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiw5rEjWV0bsOtIHN0xZllZGlza29cIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51Y3M9dmFsdWUudWNzO21vZGVsLmljbz12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiS2F0ZWdvcmllIHBvaHlidVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHsgbzogXCI8XCIsIHY6IDIwMCB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmlfZmtcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJHZW5lcm92YXQgZmluYW7EjW7DrSBrb250cm9sdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdHZW5lcm92YW5pRktaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaUZLRHRvID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZHRvXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IHRoaXMuZWRpdE1vZGUgPyB0aGF0LmlzbC5HZW5lcm92YW5pRksudXBkYXRlKHJlcSkgOiB0aGF0LmlzbC5HZW5lcm92YW5pRksuY3JlYXRlKHJlcSk7XHJcbiAgICAgICAgICAgICAgICAvL0NvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZSh0YXNrLmdldCgpLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRhc2suZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbCgoanFYSFIsIHR5cCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmdldEZhaWxGcm9tSXNsKHRoYXQsIGpxWEhSLCB0eXAsIG9iailcclxuICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChyZXREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgbWkgbmV2csOhdGlsaSDFvsOhZG7DqSBkYXRhLCB2eWhvZMOtbSB2eWrDrW1rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkFwbGlrYcSNbsOtIGNoeWJhXCIsIFwiU2VydmVyIG5ldnLDoXRpbCDFvsOhZG7DoSBkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVtw6FtIGluZm9ybWFjaSBvIMO6c3DEm2NodSBvcGVyYWNlLCB6YcSNbnUgemppxaHFpW92YXQgZMWvdm9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0RGF0YS5yZXN1bHQ/LmtpbmQgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmppc3TDrW0gemRhIG3DoW0gbsSbamFrw6kgenByw6FjaHkgbyBjaHlixJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0RGF0YS5yZXN1bHQ/LmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgdiBjeWtsdSBzaSBqZSBwxZlpZMOhbSBkbyBzdHJpbmd1IGt0ZXLDvSB2eWhvZMOtbSB2IG9rbsSbIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnJvck1zZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldERhdGEucmVzdWx0Py5lcnJvcnMuZm9yRWFjaCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyArPSBtc2cubWVzc2FnZSArIFwiIDxicj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIGVycm9yTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmV6bsOhbcOhIGNoeWJhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5jbG9zZSh0cnVlKTsgLy8gcG9rdWQgamUgw7pzcMSbY2ggemF2xZl1IG9rbm8gKHRydWUgcG9zbMOhbSBhYnkgc2UgdsSbZMSbbG8gxb5lIG5lamRlIG8gb2J5xI1lam7DqSB6YXbFmWVuw60gb2tuYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gY29tbWFuZCBiYXJ1IHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbW1hbmRCYXIoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==