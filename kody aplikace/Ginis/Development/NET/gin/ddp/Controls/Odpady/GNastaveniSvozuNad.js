"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniSvozuNad.ts                  </Name>
//    <Description> Odpady - Detail poplatku za svoz odpadu                     </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-28                                                  </Created>
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
            /**
             * Odpady - Detail poplatku za svoz odpadu
             * @author Vojtěch Čech
             * @date 28.01.2026
             */
            let GNastaveniSvozuNad = class GNastaveniSvozuNad extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Režim úprav */
                    this.edit = false;
                }
                onContentReady() {
                    const that = this;
                    that.title = "Detail poplatku za svoz odpadu";
                    that.taskId = "actGNastaveniSvozuNad";
                    that.createForm();
                    that.createActions();
                    that.nastaveniEditace();
                    that.commandBar(that.actions.createBar(["actKalendar", "actSave!", "actClose"]));
                    that.findForms("formDetail").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.prepocet();
                }
                /** Vytvoří formulář s názvem externího subjektu */
                createForm() {
                    var that = this;
                    let form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addSection({ customClass: "w-8" })
                        .addRow("Svozová jednotka")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpsona(), {
                        name: "ixs_ona",
                        model: "model.ixs_ona=value.ixs_ona",
                        change: () => {
                            that.prepocet();
                        }
                    })
                        .addSection({ customClass: "w-4" })
                        .addRow("Počet jednotek")
                        .addField("gnumberbox", {
                        name: "pocet",
                        decimals: 2,
                        change: () => {
                            that.prepocet();
                        }
                    })
                        .addSection({ customClass: "w-3" })
                        .addRow("Počátek platnosti")
                        .addField("gdatebox", {
                        name: "dat_od",
                        change: () => {
                            that.prepocet();
                        }
                    })
                        .addSection({ customClass: "w-3" })
                        .addRow("Konec platnosti")
                        .addField("gdatebox", {
                        name: "dat_do",
                        change: () => {
                            that.prepocet();
                        }
                    })
                        .addSection({ customClass: "w-3" })
                        .addRow("Vyměřená částka")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "vym_c",
                        disabled: true
                    })
                        .addSection({ customClass: "w-3" })
                        .addRow("Aktivita")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        name: "aktivita",
                        model: "model.aktivita=value.aktivita",
                    })
                        .addSection({ customClass: "w-12" })
                        .addRow()
                        .addField("gstringbox", {
                        name: "popis_vypoctu",
                        rows: 12,
                        disabled: true
                    })
                        .addSection({ customClass: "w-12" })
                        .addRow("Identifikace nádob (oddělené čárkou)")
                        .addField("gstringbox", {
                        name: "id_nadoby"
                    })
                        .addSection({ customClass: "w-12" })
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka"
                    });
                    $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                /** Vytvoření akcí pro položky v menubaru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actSave: {
                            name: "actSave",
                            caption: "Uložit",
                            tooltip: "",
                            run: () => {
                                // TODO: implement action
                            }
                        },
                        actClose: {
                            name: "actClose",
                            caption: "Zavřít",
                            tooltip: "",
                            run: () => {
                                that.close();
                            }
                        },
                        actKalendar: {
                            name: "actKalendar",
                            caption: "Kalendář",
                            tooltip: "Datumy svozů pro rok " + that.rok,
                            run: () => {
                                // TODO: implement action
                            }
                        }
                    });
                }
                /** Nastavení režimu úprav  */
                nastaveniEditace() {
                    var that = this;
                    // Jedná se o již existující poplatek
                    if (that.model.ixs_ona?.length == 12) {
                        that.findFields("ixs_ona").gfield("disable");
                    }
                    else {
                        that.title = "Nový poplatek za svoz odpadu";
                        that.findFields("ixs_ona").gfield("enable");
                    }
                    if (!that.edit) {
                        that.findFields("ixs_ona").gfield("disable");
                        that.findFields("pocet").gfield("disable");
                        that.findFields("dat_od").gfield("disable");
                        that.findFields("dat_do").gfield("disable");
                        that.findFields("vym_c").gfield("disable");
                        that.findFields("aktivita").gfield("disable");
                        that.findFields("id_nadoby").gfield("disable");
                        that.findFields("poznamka").gfield("disable");
                    }
                }
                /** Přepočet */
                prepocet() {
                    var that = this;
                    // input: entire model as dto
                    // output: updated model as dto with recalculated fields and popis_vypoctu
                    that.isl.Odpady.prepocet({ dto: that.model }).get().done((updatedModel) => {
                        that.findForms("formDetail").findFields().gfield("model", "apply", updatedModel, { initialValues: true });
                    });
                }
            };
            GNastaveniSvozuNad = __decorate([
                Decorators.gcontent
            ], GNastaveniSvozuNad);
            WebClient.GNastaveniSvozuNad = GNastaveniSvozuNad;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaVN2b3p1TmFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05hc3RhdmVuaVN2b3p1TmFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBd0tmO0FBeEtELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdLbkI7SUF4S2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdLN0I7UUF4S29CLFdBQUEsU0FBUztZQUMxQjs7OztlQUlHO1lBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXBEOztvQkFDSSxrQkFBa0I7b0JBQ2xCLFNBQUksR0FBWSxLQUFLLENBQUM7Z0JBOEoxQixDQUFDO2dCQXhKRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxnQ0FBZ0MsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQztvQkFFdEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGFBQWEs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QUNMLENBQUM7Z0JBRUQsZUFBZTtnQkFDUCxRQUFRO29CQUNaLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsNkJBQTZCO29CQUM3QiwwRUFBMEU7b0JBQzFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTt3QkFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDOUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQzthQUNKLENBQUE7WUFoS1ksa0JBQWtCO2dCQUQ5QixVQUFVLENBQUMsUUFBUTtlQUNQLGtCQUFrQixDQWdLOUI7WUFoS1ksNEJBQWtCLHFCQWdLOUIsQ0FBQTtRQUNMLENBQUMsRUF4S29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXdLN0I7SUFBRCxDQUFDLEVBeEtnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF3S25CO0FBQUQsQ0FBQyxFQXhLUyxNQUFNLEtBQU4sTUFBTSxRQXdLZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HTmFzdGF2ZW5pU3ZvenVOYWQudHMgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2RwYWR5IC0gRGV0YWlsIHBvcGxhdGt1IHphIHN2b3ogb2RwYWR1ICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjYgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNi0wMS0yOCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogT2RwYWR5IC0gRGV0YWlsIHBvcGxhdGt1IHphIHN2b3ogb2RwYWR1IFxyXG4gICAgICogQGF1dGhvciBWb2p0xJtjaCDEjGVjaFxyXG4gICAgICogQGRhdGUgMjguMDEuMjAyNlxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdOYXN0YXZlbmlTdm96dU5hZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFJlxb5pbSDDunByYXYgKi9cclxuICAgICAgICBlZGl0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIFJvayAqL1xyXG4gICAgICAgIHJvazogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBEYXRhIGRldGFpbHUgcG9wbGF0a3UgKi9cclxuICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkxLLklzbC5HRGV0YWlsUG9wbGF0a3VEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiRGV0YWlsIHBvcGxhdGt1IHphIHN2b3ogb2RwYWR1XCI7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHTmFzdGF2ZW5pU3ZvenVOYWRcIjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlFZGl0YWNlKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdEthbGVuZGFyXCIsIFwiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1EZXRhaWxcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGF0LnByZXBvY2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIGZvcm11bMOhxZkgcyBuw6F6dmVtIGV4dGVybsOtaG8gc3ViamVrdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0xMi0xMi0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcInctOFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3Zvem92w6EgamVkbm90a2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwc29uYSgpLCB7IC8vIE5hY2lzdFN0YXZ5VnltYWhhbmlEbGVTa3VwaW55VnltYWhhbmlcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19vbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfb25hPXZhbHVlLml4c19vbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcInctNFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IGplZG5vdGVrXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LTNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI3DoXRlayBwbGF0bm9zdGlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0zXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLb25lYyBwbGF0bm9zdGlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0zXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWeW3Em8WZZW7DoSDEjcOhc3RrYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eW1fY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LTNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFrdGl2aXRhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YT12YWx1ZS5ha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0xMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNfdnlwb2N0dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LTEyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWthY2UgbsOhZG9iIChvZGTEm2xlbsOpIMSNw6Fya291KVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF9uYWRvYnlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwidy0xMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHBvbG/Fvmt5IHYgbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0U2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBhY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S2FsZW5kYXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEthbGVuZGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLYWxlbmTDocWZXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJEYXR1bXkgc3ZvesWvIHBybyByb2sgXCIgKyB0aGF0LnJvayxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXZlbsOtIHJlxb5pbXUgw7pwcmF2ICAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2ZW5pRWRpdGFjZSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gSmVkbsOhIHNlIG8gamnFviBleGlzdHVqw61jw60gcG9wbGF0ZWtcclxuICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuaXhzX29uYT8ubGVuZ3RoID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfb25hXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJOb3bDvSBwb3BsYXRlayB6YSBzdm96IG9kcGFkdVwiO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhzX29uYVwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhhdC5lZGl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfb25hXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJwb2NldFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X29kXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInZ5bV9jXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJha3Rpdml0YVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaWRfbmFkb2J5XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJwb3puYW1rYVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUMWZZXBvxI1ldCAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJlcG9jZXQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gaW5wdXQ6IGVudGlyZSBtb2RlbCBhcyBkdG9cclxuICAgICAgICAgICAgLy8gb3V0cHV0OiB1cGRhdGVkIG1vZGVsIGFzIGR0byB3aXRoIHJlY2FsY3VsYXRlZCBmaWVsZHMgYW5kIHBvcGlzX3Z5cG9jdHVcclxuICAgICAgICAgICAgdGhhdC5pc2wuT2RwYWR5LnByZXBvY2V0KHsgZHRvOiB0aGF0Lm1vZGVsIH0pLmdldCgpLmRvbmUoKHVwZGF0ZWRNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHVwZGF0ZWRNb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==