"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadVymahani.ts                     </Name>
//    <Description> Vymáhání případu                                            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-11-15                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Pripady;
                (function (Pripady) {
                    let GPripadVymahani = class GPripadVymahani extends Gordic.GContentBase {
                        onContentReady() {
                            //this.title = `Rozhodnutí`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPripadVymahaniZavritPotomky"]
                                }]);
                            let req = this.Ixp == null || this.Poradi == null ? null : Gordic.Isl.PripadVymahani.read(rq => {
                                return {
                                    data: {
                                        ixp: this.Ixp,
                                        poradi: this.Poradi
                                    }
                                };
                            }).get();
                            this.createForm();
                            this.data = { ixp: this.Ixp };
                            if (req != null) {
                                req.done((data) => {
                                    this.data = data.data;
                                    this.defaultForm.findFields().gfield("model", "apply", data.data, { initialValues: true });
                                    this.defaultForm.findFields().gfield("model", "validators", this.validators);
                                });
                            }
                            else {
                                this.defaultForm.findFields().gfield("model", "validators", this.validators);
                            }
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Identifikátor" })
                                .addField("gstringbox", { name: "ixp", disabled: true, initialValue: this.Ixp });
                            if (this.Poradi != null && this.Poradi > 0)
                                form.addRow({ label: "Rozhodnutí" })
                                    .addField("gnumberbox", { name: "poradi", disabled: true });
                            form.addRow({ label: "Číslo jednací" })
                                .addField("gstringbox", { name: "cj_vym" })
                                .addRow({ label: "Datum od", required: true })
                                .addField("gdatebox", { name: "dat_od" })
                                .addRow({ label: "Datum do", required: true })
                                .addField("gdatebox", { name: "dat_do" })
                                .addRow({ label: "Datum doručení" })
                                .addField("gdatebox", { name: "dat_doruc" })
                                .addRow({ label: "Datum nabytí právní moci" })
                                .addField("gdatebox", { name: "dat_pm" })
                                .addRow({ label: "Datum vykonání" })
                                .addField("gdatebox", { name: "dat_vykon" })
                                .addRow({ label: "Částka vymáhání" })
                                .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "c_vym", initialValue: 0, emptyValue: null })
                                .addRow({ label: "Částka penále" })
                                .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "c_pen", initialValue: 0, emptyValue: null })
                                .addRow({ label: "Procento penále" })
                                .addField("gnumberbox", Gordic.Prefabs.Number.decimal(2, true), { name: "proc_pen", initialValue: 0, emptyValue: null })
                                .addRow({ label: "Datum generování", required: true })
                                .addField("gdatebox", { name: "dat_vyst" })
                                .addRow({ label: "Stav vymáhání" })
                                .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), { name: "stav_vym", model: "model.stav_vym=value.stav_vym", initialValue: { stav_vym: 0 } })
                                .addRow({ label: "Stav doručení" })
                                .addField("gselectbox", Gordic.Prefabs.Select.ddpcsdo(), { name: "stav_doruc", model: "model.stav_doruc=value.stav_doruc", initialValue: { stav_doruc: 0 } })
                                .addRow({ label: "Poznamka" })
                                .addField("gstringbox", { name: "poznamka" });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPripadVymahaniZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ok() {
                            if (!this.defaultForm.gform("isValid"))
                                return;
                            else {
                                let dto = this.data;
                                this.defaultForm.findFields().gfield("model", "collect", dto);
                                let req = rq => {
                                    return {
                                        rq: { Data: dto }
                                    };
                                };
                                let task = this.editMode ? Gordic.Isl.PripadVymahani.update(req) : Gordic.Isl.PripadVymahani.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GPripadVymahani = __decorate([
                        Decorators.gcontent
                    ], GPripadVymahani);
                    Pripady.GPripadVymahani = GPripadVymahani;
                })(Pripady = Controls.Pripady || (Controls.Pripady = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFZ5bWFoYW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZFZ5bWFoYW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBOEhmO0FBOUhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThIbkI7SUE5SGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThIN0I7UUE5SG9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQThIdEM7WUE5SDhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLE9BQU8sQ0E4SDlDO2dCQTlIdUMsV0FBQSxPQUFPO29CQUczQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTt3QkFVN0MsY0FBYzs0QkFDViw0QkFBNEI7NEJBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29DQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0NBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO2lDQUMxRCxDQUFDLENBQUMsQ0FBQzs0QkFFSixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dDQUNwRixPQUFPO29DQUNILElBQUksRUFBRTt3Q0FDRixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0NBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3FD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QUMsRUFBRTtvQ0FDWCxPQUFPO3dDQUNILEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7cUNBQ3BCLENBQUM7Z0NBQ04sQ0FBQyxDQUFDO2dDQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQzNGLFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDeEQsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUE7b0JBMUhZLGVBQWU7d0JBRDNCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLGVBQWUsQ0EwSDNCO29CQTFIWSx1QkFBZSxrQkEwSDNCLENBQUE7Z0JBQ0wsQ0FBQyxFQTlIdUMsT0FBTyxHQUFQLGdCQUFPLEtBQVAsZ0JBQU8sUUE4SDlDO1lBQUQsQ0FBQyxFQTlIOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUE4SHRDO1FBQUQsQ0FBQyxFQTlIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOEg3QjtJQUFELENBQUMsRUE5SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThIbkI7QUFBRCxDQUFDLEVBOUhTLE1BQU0sS0FBTixNQUFNLFFBOEhmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRWeW1haGFuaS50cyAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBWeW3DoWjDoW7DrSBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMTEtMTUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlByaXBhZHkge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByaXBhZFZ5bWFoYW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgUG9yYWRpOiBudW1iZXI7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgICAgICAgdmFsaWRhdG9yczogYW55O1xyXG4gICAgICAgIGRhdGE6IERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRWeW1haGFuaUR0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy50aXRsZSA9IGBSb3pob2RudXTDrWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUHJpcGFkVnltYWhhbmlaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGlzLkl4cCA9PSBudWxsIHx8IHRoaXMuUG9yYWRpID09IG51bGwgPyBudWxsIDogSXNsLlByaXBhZFZ5bWFoYW5pLnJlYWQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcmFkaTogdGhpcy5Qb3JhZGlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KS5nZXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB7IGl4cDogdGhpcy5JeHAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmVxLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YS5kYXRhLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiSWRlbnRpZmlrw6F0b3JcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXhwXCIsIGRpc2FibGVkOiB0cnVlLCBpbml0aWFsVmFsdWU6IHRoaXMuSXhwIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuUG9yYWRpICE9IG51bGwgJiYgdGhpcy5Qb3JhZGkgPiAwKVxyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coeyBsYWJlbDogXCJSb3pob2RudXTDrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwicG9yYWRpXCIsIGRpc2FibGVkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coeyBsYWJlbDogXCLEjMOtc2xvIGplZG5hY8OtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImNqX3Z5bVwiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIG9kXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X29kXCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gZG9cIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfZG9cIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBkb3J1xI1lbsOtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfZG9ydWNcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBuYWJ5dMOtIHByw6F2bsOtIG1vY2lcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9wbVwiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIHZ5a29uw6Fuw61cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF92eWtvblwiIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCLEjMOhc3RrYSB2eW3DoWjDoW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJjX3Z5bVwiLCBpbml0aWFsVmFsdWU6IDAsIGVtcHR5VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCLEjMOhc3RrYSBwZW7DoWxlXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImNfcGVuXCIsIGluaXRpYWxWYWx1ZTogMCwgZW1wdHlWYWx1ZTogbnVsbCB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQcm9jZW50byBwZW7DoWxlXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgyLCB0cnVlKSwgeyBuYW1lOiBcInByb2NfcGVuXCIsIGluaXRpYWxWYWx1ZTogMCwgZW1wdHlWYWx1ZTogbnVsbCB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBnZW5lcm92w6Fuw61cIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfdnlzdFwiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlN0YXYgdnltw6Fow6Fuw61cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5zdGF2VnltYWhhbmkoKSwgeyBuYW1lOiBcInN0YXZfdnltXCIsIG1vZGVsOiBcIm1vZGVsLnN0YXZfdnltPXZhbHVlLnN0YXZfdnltXCIsIGluaXRpYWxWYWx1ZTogeyBzdGF2X3Z5bTogMCB9IH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlN0YXYgZG9ydcSNZW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNzZG8oKSwgeyBuYW1lOiBcInN0YXZfZG9ydWNcIiwgbW9kZWw6IFwibW9kZWwuc3Rhdl9kb3J1Yz12YWx1ZS5zdGF2X2RvcnVjXCIsIGluaXRpYWxWYWx1ZTogeyBzdGF2X2RvcnVjOiAwIH0gfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUG96bmFta2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWeW1haGFuaVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFZ5bWFoYW5pRHRvID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy5lZGl0TW9kZSA/IElzbC5QcmlwYWRWeW1haGFuaS51cGRhdGUocmVxKSA6IElzbC5QcmlwYWRWeW1haGFuaS5jcmVhdGUocmVxKTtcclxuICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZSh0YXNrLmdldCgpLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==