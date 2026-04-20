"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadSymboly2.ts                     </Name>
//    <Description> T��da pro okno V�ce VS nad detailem p��padu                 </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   � GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2023-05-24                                                  </Created>
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
                var Pripady;
                (function (Pripady) {
                    let GPripadSymboly2 = class GPripadSymboly2 extends Gordic.GContentBase {
                        //prepareContent(args = {}) {
                        onContentReady() {
                            debugger;
                            var this_ = this;
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGZavritPotomky"]
                                }]);
                            this.createActions();
                            this.createGui();
                        } //onContentReady         
                        createGui() {
                            this.menuBar([
                                {
                                    favorite: true,
                                    caption: "Nov�",
                                    action: this.actions["actGNovyVS"]
                                },
                                {
                                    favorite: true,
                                    caption: "Detail",
                                    action: this.actions["actGDetailVS"]
                                },
                                {
                                    favorite: true,
                                    caption: "Zru�it",
                                    action: this.actions["actGZrusitVS"]
                                },
                            ]);
                            var form = new Gordic.Forms.Form({ tabLabel: "" })
                                .addSection()
                                .addRow()
                                .addText("Identifik�tor", "w-3")
                                .addText("Poplatnik", "w-3")
                                .addText("VS na kart�", "w-3")
                                .addText("Stav VS", "w-3")
                                .addRow()
                                .addField("gstringbox", "w-3", {
                                name: "ixp",
                            })
                                .addField("gstringbox", "w-3", {
                                name: "ixs_esu"
                            })
                                .addField("gnumberbox", "w-3", {
                                name: "vs"
                            })
                                .addField("gstringbox", "w-3", {
                                name: "vs"
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            var columns = new Gordic.Data.GridFormat()
                                .addTextColumn({
                                name: "vs",
                                caption: "VS",
                                //width: 120,
                            })
                                .addTextColumn({
                                name: "ss",
                                caption: "SS",
                                //width: 120
                            })
                                .addTextColumn({
                                name: "ixp",
                                caption: "Identifik�tor",
                                //width: 300
                            })
                                .addTextColumn({
                                name: "poznamka",
                                caption: "Pozn�mka",
                                //width: 300
                            })
                                .addTextColumn({
                                name: "stav",
                                caption: "Stav"
                            });
                            //let filterPan = $("<div>").appendTo(this.element).gfilterpanel({
                            //    forms: [form],
                            //    favorites: [],
                            //    saveOptionsForm: "all",
                            //    userDefaultFilter: true,
                            //    apply: () => {
                            //    }
                            //})
                            this.gridList = $("<div>")
                                .appendTo(this.element)
                                .gautofit({ resizersOnTab: false })
                                .ggrid({
                                name: "gridList",
                                columns: columns,
                                defaultProfile: {
                                    columnList: "ixp, vs, ss, poznamka, stav"
                                },
                                data: new Gordic.Isl.View(Gordic.Isl.PripadSymboly.list(rq => {
                                    return {
                                        filters: {
                                            ixp: this.Ixp
                                        }
                                    };
                                })),
                                //rowsChecked: "_checked",
                                //defaultAction: new GAction({
                                //    name: "",
                                //    run: () => {
                                //    }
                                //}),
                                //selection: () => {
                                //
                                //},
                                //searchColumns: [],
                            });
                        }
                        createActions() {
                            this.actions.addRange([
                                {
                                    name: "actGZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                },
                                {
                                    name: "actGNovyVS",
                                    run: () => {
                                        //do smt....
                                    }
                                },
                                {
                                    name: "actGDetailVS",
                                    run: () => {
                                        //do smt....
                                    }
                                },
                                {
                                    name: "actGZrusitVS",
                                    run: () => {
                                        //do smt....
                                    }
                                },
                            ]);
                        }
                        ok() {
                            //akce co se stane...
                        }
                    };
                    GPripadSymboly2 = __decorate([
                        Decorators.gcontent
                    ], GPripadSymboly2);
                    Pripady.GPripadSymboly2 = GPripadSymboly2;
                })(Pripady = Controls.Pripady || (Controls.Pripady = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFN5bWJvbHkyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZFN5bWJvbHkyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBa0xmO0FBbExELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtMbkI7SUFsTGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtMN0I7UUFsTG9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQWtMdEM7WUFsTDhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLE9BQU8sQ0FrTDlDO2dCQWxMdUMsV0FBQSxPQUFPO29CQUczQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTt3QkFPN0MsNkJBQTZCO3dCQUM3QixjQUFjOzRCQUNWLFFBQVEsQ0FBQzs0QkFDVCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7NEJBRWpCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO29DQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztpQ0FDNUMsQ0FBQyxDQUFDLENBQUM7NEJBRUosSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBRXJCLENBQUMsQ0FBQyx5QkFBeUI7d0JBRW5CLFNBQVM7NEJBRWIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVDtvQ0FDSSxRQUFRLEVBQUUsSUFBSTtvQ0FDZCxPQUFPLEVBQUUsTUFBTTtvQ0FDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7aUNBQ3JDO2dDQUNEO29DQUNJ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a0x0QztRQUFELENBQUMsRUFsTG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtMN0I7SUFBRCxDQUFDLEVBbExnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrTG5CO0FBQUQsQ0FBQyxFQWxMUyxNQUFNLEtBQU4sTUFBTSxRQWtMZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkU3ltYm9seTIudHMgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVO+/ve+/vWRhIHBybyBva25vIFbvv71jZSBWUyBuYWQgZGV0YWlsZW0gcO+/ve+/vXBhZHUgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAg77+9IEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTA1LTI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuUHJpcGFkeSB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUHJpcGFkU3ltYm9seTIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkTGlzdDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXdTeW1ib2x5OiBJc2wuVmlldzxEZHAuSW50ZXJmYWNlLkxLLkR0by5HUHJpcGFkU3ltYm9seUR0bz47XHJcblxyXG4gICAgICAgIC8vcHJlcGFyZUNvbnRlbnQoYXJncyA9IHt9KSB7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB2YXIgdGhpc18gPSB0aGlzOyAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1phdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3VpKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSAvL29uQ29udGVudFJlYWR5ICAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3VpKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdu+/vVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R05vdnlWU1wiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0RldGFpbFZTXCJdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ177+9aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdacnVzaXRWU1wiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiSWRlbnRpZmlr77+9dG9yXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlBvcGxhdG5pa1wiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJWUyBuYSBrYXJ077+9XCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlN0YXYgVlNcIiwgXCJ3LTNcIilcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVlNcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJZGVudGlmaWvvv710b3JcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG96bu+/vW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy9sZXQgZmlsdGVyUGFuID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgZm9ybXM6IFtmb3JtXSxcclxuICAgICAgICAgICAgLy8gICAgZmF2b3JpdGVzOiBbXSxcclxuICAgICAgICAgICAgLy8gICAgc2F2ZU9wdGlvbnNGb3JtOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAvLyAgICB1c2VyRGVmYXVsdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgYXBwbHk6ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICB0aGlzLmdyaWRMaXN0ID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkTGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpeHAsIHZzLCBzcywgcG96bmFta2EsIHN0YXZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IElzbC5WaWV3KElzbC5QcmlwYWRTeW1ib2x5Lmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy5JeHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yb3dzQ2hlY2tlZDogXCJfY2hlY2tlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1phdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTm92eVZTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZG8gc210Li4uLlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHRGV0YWlsVlNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kbyBzbXQuLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdacnVzaXRWU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RvIHNtdC4uLi5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcblxyXG4gICAgICAgICAgICAvL2FrY2UgY28gc2Ugc3RhbmUuLi5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59Il19