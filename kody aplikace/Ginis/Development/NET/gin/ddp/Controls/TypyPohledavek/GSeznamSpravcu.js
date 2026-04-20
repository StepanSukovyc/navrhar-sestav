"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSeznamSpravcu.ts                      </Name>
//    <Description> Seznam správců                                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var TypyPohledavek;
                (function (TypyPohledavek) {
                    let GSeznamSpravcu = class GSeznamSpravcu extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            this.view = new Gordic.Isl.View(that.isl.Spravce.list(rq => {
                                return {
                                    filters: this.getFilters()
                                };
                            }));
                            this.createActions();
                            this.createForm();
                            this.createGrid();
                        }
                        getFilters() {
                            let filter = {
                                typ_phl: this.typ_phl,
                                rok: this.rok,
                                aktivita: 100
                            };
                            this.defaultForm.findFields("cis_spr", "nazev", "ucs", "uus", /* "uus_nazev",*/ "bu_vl", "ixs_fun_fuc").gfield("model", "collect", filter);
                            return filter;
                        }
                        createActions() {
                            this.actions.addRange([
                                {
                                    name: "actTypyPohledavekGSeznamSpravcuVyhledat",
                                    caption: "Vyhledat",
                                    run: () => {
                                        if (this.defaultForm.gform("isValid")) {
                                            this.view.requestData();
                                        }
                                    }
                                }
                            ]);
                        }
                        createGrid() {
                            this.grid = $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.view,
                                columns: Ddp.WebClient.Common.GridFormats.Spravce(),
                                defaultProfile: {
                                    columnList: "cis_spr, nazev, BankovniUcet.ucs, BankovniUcet.uus, BankovniUcet.bu_vl, BankovniUcet.sk_vl, BankovniUcet.poznamka, BankovniUcet.ixs_fun_fuc, BankovniUcet.dat_uzav"
                                }
                            })
                                .ggridroweditor();
                        }
                        createForm() {
                            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow("Číslo správce / Správce")
                                .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "cis_spr", placeholder: "Číslo správce" })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "nazev", placeholder: "Správce" })
                                .addRow("Účetní středisko / Účtárna")
                                .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "ucs", placeholder: "UCS" })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "uus", placeholder: "Účtárna" })
                                .addRow("Bú. vl. / Účtující funkce")
                                .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "bu_vl", placeholder: "Bú. vl." })
                                .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "ixs_fun_fuc", placeholder: "Účtující funkce" })
                                .addRow({ customClass: "right" })
                                .addField("gbutton", {
                                params: {
                                    primary: true,
                                    customClass: "right",
                                    id: "actTypyPohledavekGSeznamSpravcuVyhledat_button",
                                    action: this.actions["actTypyPohledavekGSeznamSpravcuVyhledat"]
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                        }
                    };
                    GSeznamSpravcu = __decorate([
                        Decorators.gcontent
                    ], GSeznamSpravcu);
                    TypyPohledavek.GSeznamSpravcu = GSeznamSpravcu;
                })(TypyPohledavek = Controls.TypyPohledavek || (Controls.TypyPohledavek = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVNwcmF2Y3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtU3ByYXZjdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTJGZjtBQTNGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyRm5CO0lBM0ZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EyRjdCO1FBM0ZvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0EyRnRDO1lBM0Y4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxjQUFjLENBMkZyRDtnQkEzRnVDLFdBQUEsY0FBYztvQkFFbEQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTt3QkFRNUMsY0FBYzs0QkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2pELEVBQUUsQ0FBQyxFQUFFO2dDQUNELE9BQU87b0NBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7aUNBQzdCLENBQUM7NEJBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFUixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDbEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN0QixDQUFDO3dCQUdPLFVBQVU7NEJBQ2QsSUFBSSxNQUFNLEdBQUc7Z0NBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dDQUNyQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7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SyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbkMsQ0FBQztxQkFDSixDQUFBO29CQXhGWSxjQUFjO3dCQUQxQixVQUFVLENBQUMsUUFBUTt1QkFDUCxjQUFjLENBd0YxQjtvQkF4RlksNkJBQWMsaUJBd0YxQixDQUFBO2dCQUNMLENBQUMsRUEzRnVDLGNBQWMsR0FBZCx1QkFBYyxLQUFkLHVCQUFjLFFBMkZyRDtZQUFELENBQUMsRUEzRjhCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBMkZ0QztRQUFELENBQUMsRUEzRm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJGN0I7SUFBRCxDQUFDLEVBM0ZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyRm5CO0FBQUQsQ0FBQyxFQTNGUyxNQUFNLEtBQU4sTUFBTSxRQTJGZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HU2V6bmFtU3ByYXZjdS50cyAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU2V6bmFtIHNwcsOhdmPFryAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAxLTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlayB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1TcHJhdmN1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTcHJhdmNlRHRvPjtcclxuXHJcbiAgICAgICAgcHVibGljIHR5cF9waGw6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgcm9rOiBudW1iZXI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5TcHJhdmNlLmxpc3QoXHJcbiAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhpcy5nZXRGaWx0ZXJzKClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlcnMoKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGlzLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICByb2s6IHRoaXMucm9rLFxyXG4gICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcImNpc19zcHJcIiwgXCJuYXpldlwiLCBcInVjc1wiLCBcInV1c1wiLC8qIFwidXVzX25hemV2XCIsKi8gXCJidV92bFwiLCBcIml4c19mdW5fZnVjXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFR5cHlQb2hsZWRhdmVrR1Nlem5hbVNwcmF2Y3VWeWhsZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlobGVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HU3ByYXZjZUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5TcHJhdmNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJjaXNfc3ByLCBuYXpldiwgQmFua292bmlVY2V0LnVjcywgQmFua292bmlVY2V0LnV1cywgQmFua292bmlVY2V0LmJ1X3ZsLCBCYW5rb3ZuaVVjZXQuc2tfdmwsIEJhbmtvdm5pVWNldC5wb3puYW1rYSwgQmFua292bmlVY2V0Lml4c19mdW5fZnVjLCBCYW5rb3ZuaVVjZXQuZGF0X3V6YXZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRyb3dlZGl0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDrXNsbyBzcHLDoXZjZSAvIFNwcsOhdmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCJDT05UQUlOU1wiLCBcIj1cIl0sIHVzZXJPcGVyYXRvcnM6IFtdIH0pLCB7IG5hbWU6IFwiY2lzX3NwclwiLCBwbGFjZWhvbGRlcjogXCLEjMOtc2xvIHNwcsOhdmNlXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyh7IGRlZmF1bHRPcGVyYXRvcjogXCJMSUtFXCIsIG9wZXJhdG9yczogW1wiTElLRVwiLCBcIkNPTlRBSU5TXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHsgbmFtZTogXCJuYXpldlwiLCBwbGFjZWhvbGRlcjogXCJTcHLDoXZjZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiw5rEjWV0bsOtIHN0xZllZGlza28gLyDDmsSNdMOhcm5hXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCJDT05UQUlOU1wiLCBcIj1cIl0sIHVzZXJPcGVyYXRvcnM6IFtdIH0pLCB7IG5hbWU6IFwidWNzXCIsIHBsYWNlaG9sZGVyOiBcIlVDU1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCJDT05UQUlOU1wiLCBcIj1cIl0sIHVzZXJPcGVyYXRvcnM6IFtdIH0pLCB7IG5hbWU6IFwidXVzXCIsIHBsYWNlaG9sZGVyOiBcIsOaxI10w6FybmFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkLDui4gdmwuIC8gw5rEjXR1asOtY8OtIGZ1bmtjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCBQcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKHsgZGVmYXVsdE9wZXJhdG9yOiBcIkxJS0VcIiwgb3BlcmF0b3JzOiBbXCJMSUtFXCIsIFwiQ09OVEFJTlNcIiwgXCI9XCJdLCB1c2VyT3BlcmF0b3JzOiBbXSB9KSwgeyBuYW1lOiBcImJ1X3ZsXCIsIHBsYWNlaG9sZGVyOiBcIkLDui4gdmwuXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyh7IGRlZmF1bHRPcGVyYXRvcjogXCJMSUtFXCIsIG9wZXJhdG9yczogW1wiTElLRVwiLCBcIkNPTlRBSU5TXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHsgbmFtZTogXCJpeHNfZnVuX2Z1Y1wiLCBwbGFjZWhvbGRlcjogXCLDmsSNdHVqw61jw60gZnVua2NlXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJyaWdodFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWN0VHlweVBvaGxlZGF2ZWtHU2V6bmFtU3ByYXZjdVZ5aGxlZGF0X2J1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdFR5cHlQb2hsZWRhdmVrR1Nlem5hbVNwcmF2Y3VWeWhsZWRhdFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19