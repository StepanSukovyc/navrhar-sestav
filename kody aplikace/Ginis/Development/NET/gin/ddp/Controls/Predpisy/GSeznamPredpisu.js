"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSeznamPredpisu.ts                     </Name>
//    <Description> Předpisy případu                                            </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-05-13                                                  </Created>
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
            let GSeznamPredpisu = class GSeznamPredpisu extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.taskId = "actGNajitPripad";
                    that.title = `Seznam předpisů`; // případu ${that.Ixp}`;
                    that.view = new Gordic.Isl.View(that.isl.Predpisy.list(rq => {
                        return {
                            filters: { ixp: that.Ixp }
                        };
                    }));
                    that.createActions();
                    that.setBreadcrumbs([{
                            caption: that.title,
                            action: that.actions["actGPredpisyZavritPotomky"]
                        }]);
                    that.createMenuBar();
                    that.createGrid();
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createGrid() {
                    const that = this;
                    that.grid = $("<div>")
                        .appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        multi: true,
                        columnMode: "full",
                        data: that.view,
                        defaultProfile: {
                            columnList: "radek_uhr, Poznamky.priz_opr, c_mena, mena_zkr, kurz, c, dat_vzniku, dat_spl, ss, ktg_upo_txt, c_par, Poznamky.poznamka, Poznamky.popis, bu_vl, sk_vl, Poznamky.id_epz, Poznamky.stav_pr_txt, vs, s_uhrp_txt, Poznamky.stav_uz_pr_txt, Poznamky.priz_pen_aut, radek_upo, ac_ixe, Poznamky.radek_puv, zp_txt, priz_nepar_txt, pri_uhr, Poznamky.rozhodnuti, Poznamky.priz_pzp"
                        },
                        columns: WebClient.Common.GridFormats.Predpisy()
                    });
                }
                createMenuBar() {
                    const that = this;
                    that.menuBar([
                        {
                            action: that.actions["actGPredpisyNovy"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyStorno"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyOpravit"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyOpravnyPredpis"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyKalkPen"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyTiskPred"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyPohyby"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisyRozhodnuti"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGPredpisySmlouva"],
                            favorite: true
                        }
                    ]);
                }
                createActions() {
                    const that = this;
                    that.actions.addRange([{
                            name: "actGPredpisyZavritPotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGPredpisyNovy",
                            caption: "Nový",
                            run: () => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Predpisy.GDetailPredpisu", { ID: "DDPGDetailPredpisu#" }, "Nový předpis", 800, 600)
                                    .on("close", (ev, retVal) => {
                                    that.view.requestData();
                                });
                            }
                        },
                        {
                            name: "actGPredpisyStorno",
                            caption: "Storno",
                            run: () => {
                                let predpisy = that.grid.ggrid("getSelection");
                                Ddp.WebClient.Common.Predpisy.Actions.Storno(that, that.view, predpisy);
                            }
                        },
                        {
                            name: "actGPredpisyOpravit",
                            caption: "Opravit",
                            run: () => {
                            }
                        },
                        {
                            name: "actGPredpisyOpravnyPredpis",
                            caption: "Opravný předpis",
                            run: () => {
                            }
                        },
                        {
                            name: "actGPredpisyKalkPen",
                            caption: "Kalk. pen.",
                            run: () => {
                            }
                        },
                        {
                            name: "actGPredpisyTiskPred",
                            caption: "Tisk před.",
                            run: () => {
                            }
                        },
                        {
                            name: "actGPredpisyPohyby",
                            caption: "Pohyby",
                            run: () => {
                            }
                        },
                        {
                            name: "actGPredpisyRozhodnuti",
                            caption: "Rozhodnutí",
                            run: () => {
                            }
                        },
                        {
                            name: "actGPredpisySmlouva",
                            caption: "Smlouva",
                            run: () => {
                            }
                        }]);
                }
            };
            GSeznamPredpisu = __decorate([
                Decorators.gcontent
            ], GSeznamPredpisu);
            WebClient.GSeznamPredpisu = GSeznamPredpisu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByZWRwaXN1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVByZWRwaXN1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBNEtmO0FBNUtELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRLbkI7SUE1S2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRLN0I7UUE1S29CLFdBQUEsU0FBUztZQUUxQixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFTN0MsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyx3QkFBd0I7b0JBRXhELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ3hELE9BQU87NEJBQ0gsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7eUJBQzdCLENBQUE7b0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFSixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBRXJCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLOzRCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQzt5QkFDcEQsQ0FBQyxDQUFDLENBQUM7b0JBRUosSUFB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RTs0QkFDVixDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSxxQkFBcUI7NEJBQzNCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFOzRCQUNWLENBQUM7eUJBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQzthQUNKLENBQUE7WUF6S1ksZUFBZTtnQkFEM0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxlQUFlLENBeUszQjtZQXpLWSx5QkFBZSxrQkF5SzNCLENBQUE7UUFDTCxDQUFDLEVBNUtvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0SzdCO0lBQUQsQ0FBQyxFQTVLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNEtuQjtBQUFELENBQUMsRUE1S1MsTUFBTSxLQUFOLE1BQU0sUUE0S2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Nlem5hbVByZWRwaXN1LnRzICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFDFmWVkcGlzeSBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTA1LTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnR7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1QcmVkcGlzdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXc6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvPjtcclxuICAgICAgICBcclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHTmFqaXRQcmlwYWRcIjtcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IGBTZXpuYW0gcMWZZWRwaXPFr2A7IC8vIHDFmcOtcGFkdSAke3RoYXQuSXhwfWA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLlByZWRwaXN5Lmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7IGl4cDogdGhhdC5JeHAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmVkcGlzeVphdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51QmFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuRGRwRWtvSW5pdCh0aGF0LCB0aGF0LkluaXRFcnJvclRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwicmFkZWtfdWhyLCBQb3puYW1reS5wcml6X29wciwgY19tZW5hLCBtZW5hX3prciwga3VyeiwgYywgZGF0X3Z6bmlrdSwgZGF0X3NwbCwgc3MsIGt0Z191cG9fdHh0LCBjX3BhciwgUG96bmFta3kucG96bmFta2EsIFBvem5hbWt5LnBvcGlzLCBidV92bCwgc2tfdmwsIFBvem5hbWt5LmlkX2VweiwgUG96bmFta3kuc3Rhdl9wcl90eHQsIHZzLCBzX3VocnBfdHh0LCBQb3puYW1reS5zdGF2X3V6X3ByX3R4dCwgUG96bmFta3kucHJpel9wZW5fYXV0LCByYWRla191cG8sIGFjX2l4ZSwgUG96bmFta3kucmFkZWtfcHV2LCB6cF90eHQsIHByaXpfbmVwYXJfdHh0LCBwcmlfdWhyLCBQb3puYW1reS5yb3pob2RudXRpLCBQb3puYW1reS5wcml6X3B6cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlZHBpc3koKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1ByZWRwaXN5Tm92eVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmVkcGlzeVN0b3Jub1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1ByZWRwaXN5T3ByYXZpdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1ByZWRwaXN5T3ByYXZueVByZWRwaXNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmVkcGlzeUthbGtQZW5cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmVkcGlzeVRpc2tQcmVkXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHUHJlZHBpc3lQb2h5YnlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmVkcGlzeVJvemhvZG51dGlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmVkcGlzeVNtbG91dmFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByZWRwaXN5WmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzeU5vdnlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmVkcGlzeS5HRGV0YWlsUHJlZHBpc3VcIiwgeyBJRDogXCJERFBHRGV0YWlsUHJlZHBpc3UjXCIgfSwgXCJOb3bDvSBwxZllZHBpc1wiLCA4MDAsIDYwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByZWRwaXN5U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWRwaXN5ID0gdGhhdC5ncmlkLmdncmlkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvPihcImdldFNlbGVjdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLlByZWRwaXN5LkFjdGlvbnMuU3Rvcm5vKHRoYXQsIHRoYXQudmlldywgcHJlZHBpc3kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzeU9wcmF2aXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3ByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByZWRwaXN5T3ByYXZueVByZWRwaXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3ByYXZuw70gcMWZZWRwaXNcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzeUthbGtQZW5cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS2Fsay4gcGVuLlwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByZWRwaXN5VGlza1ByZWRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlzayBwxZllZC5cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzeVBvaHlieVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzeVJvemhvZG51dGlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm96aG9kbnV0w61cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmVkcGlzeVNtbG91dmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU21sb3V2YVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=