"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPenalizace.ts                         </Name>
//    <Description> Penalizace                                                  </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-12-19                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Penalizace;
                (function (Penalizace) {
                    let GPenalizace = class GPenalizace extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            this.title = `Vypočtené penalizace případu ${this.Ixp}`;
                            this.view = new Gordic.Isl.View(that.isl.PripadPenalizace.list(rq => {
                                if (this.defaultForm) {
                                    this.Nahled = this.defaultForm.findFields("nahled").gfield("getValue");
                                    this.DatumOd = this.defaultForm.findFields("datum_od").gfield("getValue");
                                    this.DatumDo = this.defaultForm.findFields("datum_do").gfield("getValue");
                                }
                                return {
                                    filters: {
                                        ixp: this.Ixp,
                                        priz_vyp: this.Nahled ? 0 : 1,
                                        dat_pen: {
                                            "start": this.DatumOd,
                                            "end": this.DatumDo
                                        }
                                    }
                                };
                            }));
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGPenalizaceZavritPotomky"]
                                }]);
                            this.createForm();
                            this.afterRefresh();
                            this.createGrid();
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1" })
                                .addSection()
                                .addRow("Datum od").addField("gdatebox", { name: "datum_od" })
                                .addRow("Datum do").addField("gdatebox", { name: "datum_do" })
                                .addRow().addField("gcheck", { name: "nahled", label: "Vypočtené penále z náhledu", change: () => { this.refresh(); }, emptyValue: false })
                                .addSection()
                                .addRow("Celkem").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "celkem", disabled: true })
                                .addRow("Saldo ke konci intervalu").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "saldo", disabled: true })
                                .addRow({ customClass: "right" })
                                .addField("gbutton", { params: { customClass: "right g-button--primary", caption: "Občerstvit", id: "actGPenalizaceObnovit_button", action: this.actions["actGPenalizaceObnovit"] } });
                            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                            $("[data-param-id='actGPenalizaceObnovit_button']").before($("<button>").css("margin-right", "5px").gbutton({ params: { caption: "Vyčistit", action: this.actions["actGPenalizaceVycistit"] } }));
                            this.defaultForm.findFields().gfield("model", "apply", { datum_od: this.DatumOd, datum_do: this.DatumDo, nahled: this.Nahled });
                        }
                        createGrid() {
                            this.grid = $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.view,
                                defaultProfile: {
                                    columnList: "poradi, dat_pen, proc_sazba_pen, c_ke_dni, c, typ, dat_zmena, zmenu_prov"
                                },
                                columns: WebClient.Common.GridFormats.Penalizace()
                            });
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGPenalizaceZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                },
                                {
                                    name: "actGPenalizaceObnovit",
                                    run: () => {
                                        this.refresh();
                                    }
                                },
                                {
                                    name: "actGPenalizaceVycistit",
                                    run: () => {
                                        this.dialogs.confirm("Vyčistit?", "Opravdu chcete vyčistit vypočtené záznamy?")
                                            .on("close", (obj, retVal) => {
                                            if (retVal === "yes") {
                                                this.refresh();
                                            }
                                        });
                                    }
                                }]);
                        }
                        refresh() {
                            this.view.requestData();
                            this.afterRefresh();
                        }
                        afterRefresh() {
                            this.view.getLoadingPromise().always(() => {
                                let data = this.view.getDataRows(true, "data");
                                let celkem = 0;
                                if (data.length > 0) {
                                    celkem = data.reduce((a, b) => a + parseDecimal(b.data.c).toNumber(), 0);
                                }
                                this.defaultForm.findFields("celkem").gfield("setValue", celkem);
                                Gordic.Isl.Pripad.stavy({ ixp: this.Ixp, dat_salda: this.DatumDo, typ_salda: 0, napojene: true }).get()
                                    .done((stavy) => {
                                    this.defaultForm.findFields("saldo").gfield("setValue", stavy.Saldo);
                                })
                                    .fail(() => {
                                    this.defaultForm.findFields("saldo").gfield("setValue", 0);
                                });
                            });
                        }
                    };
                    GPenalizace = __decorate([
                        Decorators.gcontent
                    ], GPenalizace);
                    Penalizace.GPenalizace = GPenalizace;
                })(Penalizace = Controls.Penalizace || (Controls.Penalizace = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BlbmFsaXphY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUGVuYWxpemFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQWlJZjtBQWpJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpSW5CO0lBaklnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpSTdCO1FBaklvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0FpSXRDO1lBakk4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxVQUFVLENBaUlqRDtnQkFqSXVDLFdBQUEsVUFBVTtvQkFFOUMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTt3QkFRekMsY0FBYzs0QkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7NEJBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0NBQWdDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFFeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dDQUVoRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQ0FDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxDQUFDLENBQUM7b0NBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFPLFVBQVUsQ0FBQyxDQUFDO29D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QUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUU7cUNBQzNGLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29DQUNaLElBQUksQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUMxRSxDQUFDLENBQUM7cUNBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQ0FDUCxJQUFJLENBQUMsV0FBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUNoRSxDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3FCQUNKLENBQUE7b0JBOUhZLFdBQVc7d0JBRHZCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLFdBQVcsQ0E4SHZCO29CQTlIWSxzQkFBVyxjQThIdkIsQ0FBQTtnQkFDTCxDQUFDLEVBakl1QyxVQUFVLEdBQVYsbUJBQVUsS0FBVixtQkFBVSxRQWlJakQ7WUFBRCxDQUFDLEVBakk4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQWlJdEM7UUFBRCxDQUFDLEVBaklvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpSTdCO0lBQUQsQ0FBQyxFQWpJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaUluQjtBQUFELENBQUMsRUFqSVMsTUFBTSxLQUFOLE1BQU0sUUFpSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1BlbmFsaXphY2UudHMgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFBlbmFsaXphY2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTEyLTE5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QZW5hbGl6YWNlIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BlbmFsaXphY2UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIERhdHVtT2Q6IERhdGU7XHJcbiAgICAgICAgRGF0dW1EbzogRGF0ZTtcclxuICAgICAgICBOYWhsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQZW5hbGl6YWNlRHRvPjtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYFZ5cG/EjXRlbsOpIHBlbmFsaXphY2UgcMWZw61wYWR1ICR7dGhpcy5JeHB9YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuUHJpcGFkUGVuYWxpemFjZS5saXN0KHJxID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWZhdWx0Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTmFobGVkID0gdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKFwibmFobGVkXCIpLmdmaWVsZDxib29sZWFuPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRGF0dW1PZCA9IHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcyhcImRhdHVtX29kXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRGF0dW1EbyA9IHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcyhcImRhdHVtX2RvXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoaXMuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml6X3Z5cDogdGhpcy5OYWhsZWQgPyAwIDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3Blbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGFydFwiOiB0aGlzLkRhdHVtT2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZFwiOiB0aGlzLkRhdHVtRG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHUGVuYWxpemFjZVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG9kXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdHVtX29kXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBkb1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXR1bV9kb1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOlwibmFobGVkXCIsIGxhYmVsOiBcIlZ5cG/EjXRlbsOpIHBlbsOhbGUgeiBuw6FobGVkdVwiLCBjaGFuZ2U6ICgpID0+IHsgdGhpcy5yZWZyZXNoKCk7IH0sIGVtcHR5VmFsdWU6IGZhbHNlfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJDZWxrZW1cIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJjZWxrZW1cIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTYWxkbyBrZSBrb25jaSBpbnRlcnZhbHVcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJzYWxkb1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGN1c3RvbUNsYXNzOiBcInJpZ2h0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgeyBwYXJhbXM6IHsgY3VzdG9tQ2xhc3M6IFwicmlnaHQgZy1idXR0b24tLXByaW1hcnlcIiwgY2FwdGlvbjogXCJPYsSNZXJzdHZpdFwiLCBpZDogXCJhY3RHUGVuYWxpemFjZU9ibm92aXRfYnV0dG9uXCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1BlbmFsaXphY2VPYm5vdml0XCJdIH0gfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgJChcIltkYXRhLXBhcmFtLWlkPSdhY3RHUGVuYWxpemFjZU9ibm92aXRfYnV0dG9uJ11cIikuYmVmb3JlKCQoXCI8YnV0dG9uPlwiKS5jc3MoXCJtYXJnaW4tcmlnaHRcIiwgXCI1cHhcIikuZ2J1dHRvbih7IHBhcmFtczogeyBjYXB0aW9uOiBcIlZ5xI1pc3RpdFwiLCBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdQZW5hbGl6YWNlVnljaXN0aXRcIl0gfSB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgZGF0dW1fb2Q6IHRoaXMuRGF0dW1PZCwgZGF0dW1fZG86IHRoaXMuRGF0dW1EbywgbmFobGVkOiB0aGlzLk5haGxlZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwicG9yYWRpLCBkYXRfcGVuLCBwcm9jX3NhemJhX3BlbiwgY19rZV9kbmksIGMsIHR5cCwgZGF0X3ptZW5hLCB6bWVudV9wcm92XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5QZW5hbGl6YWNlKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BlbmFsaXphY2VaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BlbmFsaXphY2VPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUGVuYWxpemFjZVZ5Y2lzdGl0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIlZ5xI1pc3RpdD9cIiwgXCJPcHJhdmR1IGNoY2V0ZSB2ecSNaXN0aXQgdnlwb8SNdGVuw6kgesOhem5hbXk/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChvYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5hZnRlclJlZnJlc2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWZ0ZXJSZWZyZXNoKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSwgXCJkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbGtlbSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Vsa2VtID0gZGF0YS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBwYXJzZURlY2ltYWwoYi5kYXRhLmMhKS50b051bWJlcigpLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJjZWxrZW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY2Vsa2VtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBJc2wuUHJpcGFkLnN0YXZ5KHsgaXhwOiB0aGlzLkl4cCwgZGF0X3NhbGRhOiB0aGlzLkRhdHVtRG8sIHR5cF9zYWxkYTogMCwgbmFwb2plbmU6IHRydWUgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoc3RhdnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHN0YXZ5LlNhbGRvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=