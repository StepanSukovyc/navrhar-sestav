"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSaldaSSP.ts                           </Name>
//    <Description> Okno salda SSP určitého případu                             </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-25                                                  </Created>
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
            * Okno salda SSP určitého případu
            * @author Martin Hanuš
            * @copyright © GORDIC spol. s r. o. 1993-2026
            * @created 2025-09-25
            * @lastModified 2025-##-##
            */
            let GSaldaSSP = class GSaldaSSP extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.title = `Výpočet salda SSP - případ ` + that.Ixp;
                    that.beginOperation({ id: "loadInitial" });
                    that.createActions();
                    that.createForm();
                    that.createGrid();
                    that.endOperation({ id: "loadInitial" });
                    that.nactiData();
                }
                /* Vytvoření akcí a commandBaru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actZavritPotomky: {
                            name: "zavritpotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        actReset: {
                            name: "actReset",
                            caption: "Občerstvit",
                            icon: "gi-refresh",
                            run: function () {
                                that.nactiData();
                            }
                        },
                        actSave: {
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                //that.ulozit().done(() => { that.close(); }) // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        },
                        actClose: {
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                that.close();
                            } // Zavření okna
                        }
                    });
                    that.commandBar(that.actions.createBar(["actReset", "actClose"]));
                }
                /* Definice Gridu */
                createGrid() {
                    this.gridSalda = $("<div>")
                        .appendTo(this.element)
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: true,
                        },
                        name: "gridPlatby",
                        columns: WebClient.Common.GridFormats.SaldaSSL()
                    });
                }
                /* Definice políček / formuláře */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GDdpSaldaSSPForm", layoutDescriptor: "L3M3S3, L-12-12-0, M-12-12-0, S-12-12-0" })
                        /////////////////////////////////////////////////////////
                        .addSection()
                        .addRow("Stav k datu")
                        .addField("gdatebox", {
                        name: "saldo_od", initialValue: that.DatumOd,
                        change: function (ev, input) {
                            that.nactiData();
                        }
                    })
                        .addRow()
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "stav_k_datu", disabled: true,
                    })
                        ///////////////////////////////////////////////////////////
                        .addSection()
                        .addRow("Pohyby za období")
                        .addField("gdummyfield")
                        .addRow()
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "pohl", disabled: true
                    })
                        ///////////////////////////////////////////////////////////
                        .addSection()
                        .addRow("Saldo k")
                        .addField("gdatebox", {
                        name: "saldo_do", initialValue: that.DatumDo,
                        change: function (ev, input) {
                            that.nactiData();
                        }
                    })
                        .addRow()
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "saldo", disabled: true
                    });
                    that.defaultForm = $.newDiv().appendTo(that.element).gform("createFrom", mainForm);
                }
                nactiData() {
                    const that = this;
                    that.beginOperation({ id: "loadData" });
                    that.dat_od = that.element.findForms().findFields("saldo_od").gfield("getValue");
                    that.dat_do = that.element.findForms().findFields("saldo_do").gfield("getValue");
                    that.isl.Salda.saldaSSL({ ixp: this.Ixp, dat_od: that.dat_od, dat_do: that.dat_do })
                        .get().done(function (dto) {
                        that.viewSalda = new Gordic.Data.View(dto.radky);
                        that.gridSalda.ggrid("setData", that.viewSalda);
                        that.element.findForms().findFields("stav_k_datu").gfield("setValue", dto.stav_k_datu ?? 0);
                        that.element.findForms().findFields("pohl").gfield("setValue", dto.pohl ?? 0);
                        that.element.findForms().findFields("saldo").gfield("setValue", dto.saldo ?? 0);
                        that.nastavBarvuPriRozdilu("stav_k_datu", new Decimal(dto.stav_k_datu));
                        that.nastavBarvuPriRozdilu("pohl", new Decimal(dto.pohl));
                        that.nastavBarvuPriRozdilu("saldo", new Decimal(dto.saldo));
                    }).always(() => {
                        that.endOperation({ id: "loadData" });
                    });
                }
                nastavBarvuPriRozdilu(nazev, castka) {
                    const that = this;
                    const form = that.element.findForms();
                    const nula = new Decimal(0);
                    var fieldSet = form.findFields(nazev);
                    if (castka.lessThan(nula)) {
                        fieldSet.css("color", "#FF0000");
                    }
                    else {
                        fieldSet.removeAttr("style");
                    }
                }
            };
            GSaldaSSP = __decorate([
                Decorators.gcontent
            ], GSaldaSSP);
            WebClient.GSaldaSSP = GSaldaSSP;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NhbGRhU1NQLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NhbGRhU1NQLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBdUtmO0FBdktELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVLbkI7SUF2S2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVLN0I7UUF2S29CLFdBQUEsU0FBUztZQUMxQjs7Ozs7O2NBTUU7WUFFRixJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsT0FBQSxZQUFZO2dCQWF2QyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUV0RCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7b0JBRTNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFFekMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsZ0JBQWdCLEVBQUU7NEJBQ2QsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLEdBQUcsRUFBRSxHQUFHLEVB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O29CQUNoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUE7b0JBQ3JDLE1BQU0sSUFBSSxHQUFZLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNyQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxDQUFDO2dCQUNMLENBQUM7YUFFSixDQUFBO1lBN0pZLFNBQVM7Z0JBRHJCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsU0FBUyxDQTZKckI7WUE3SlksbUJBQVMsWUE2SnJCLENBQUE7UUFDTCxDQUFDLEVBdktvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF1SzdCO0lBQUQsQ0FBQyxFQXZLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdUtuQjtBQUFELENBQUMsRUF2S1MsTUFBTSxLQUFOLE1BQU0sUUF1S2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1NhbGRhU1NQLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gc2FsZGEgU1NQIHVyxI1pdMOpaG8gcMWZw61wYWR1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA5LTI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAqIE9rbm8gc2FsZGEgU1NQIHVyxI1pdMOpaG8gcMWZw61wYWR1ICAgIFxyXG4gICAgKiBAYXV0aG9yIE1hcnRpbiBIYW51xaFcclxuICAgICogQGNvcHlyaWdodCDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjZcclxuICAgICogQGNyZWF0ZWQgMjAyNS0wOS0yNVxyXG4gICAgKiBAbGFzdE1vZGlmaWVkIDIwMjUtIyMtIyNcclxuICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTYWxkYVNTUCBleHRlbmRzIEdDb250ZW50QmFzZSB7ICAgIFxyXG5cclxuICAgICAgICBwcml2YXRlIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgRGF0dW1PZDogRGF0ZTtcclxuICAgICAgICBwcml2YXRlIERhdHVtRG86IERhdGU7XHJcbiAgICAgICAgLy9wcml2YXRlIG1vZGVsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bztcclxuICAgICAgICBwcml2YXRlIGdyaWRTYWxkYTogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3U2FsZGE6IEdvcmRpYy5EYXRhLlZpZXc7ICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBkYXRfb2Q6IERhdGU7XHJcbiAgICAgICAgcHVibGljIGRhdF9kbzogRGF0ZTtcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYFbDvXBvxI1ldCBzYWxkYSBTU1AgLSBwxZnDrXBhZCBgICsgdGhhdC5JeHA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZEluaXRpYWxcIiB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7ICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkSW5pdGlhbFwiIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5uYWN0aURhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIFZ5dHZvxZllbsOtIGFrY8OtIGEgY29tbWFuZEJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXRQb3RvbWt5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YXZyaXRwb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVzZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFJlc2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYsSNZXJzdHZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudWxveml0KCkuZG9uZSgoKSA9PiB7IHRoYXQuY2xvc2UoKTsgfSkgLy8gVWxvxb5lbsOtIGRhdCBhIHphdsWZZW7DrSBva25hIHYgcMWZw61wYWTEmyDDunNwxJtjaHUgbWV0b2R5LlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gLy8gWmF2xZllbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UmVzZXRcIixcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIERlZmluaWNlIEdyaWR1ICovICAgXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRTYWxkYSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRQbGF0YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU2FsZGFTU0woKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIERlZmluaWNlIHBvbMOtxI1layAvIGZvcm11bMOhxZllICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGRwU2FsZGFTU1BGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MzLCBMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgayBkYXR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYWxkb19vZFwiLCBpbml0aWFsVmFsdWU6IHRoYXQuRGF0dW1PZCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0aURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfa19kYXR1XCIsIGRpc2FibGVkOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvaHlieSB6YSBvYmRvYsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvaGxcIiwgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNhbGRvIGtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNhbGRvX2RvXCIsIGluaXRpYWxWYWx1ZTogdGhhdC5EYXR1bURvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2FsZG9cIiwgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbWFpbkZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFjdGlEYXRhKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0X29kID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJzYWxkb19vZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdGhhdC5kYXRfZG8gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInNhbGRvX2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuU2FsZGEuc2FsZGFTU0woeyBpeHA6IHRoaXMuSXhwLCBkYXRfb2Q6IHRoYXQuZGF0X29kLCBkYXRfZG86IHRoYXQuZGF0X2RvIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3U2FsZGEgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8ucmFka3khKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRTYWxkYS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3U2FsZGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInN0YXZfa19kYXR1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGR0by5zdGF2X2tfZGF0dSA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInBvaGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvLnBvaGwgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJzYWxkb1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkdG8uc2FsZG8gPz8gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2QmFydnVQcmlSb3pkaWx1KFwic3Rhdl9rX2RhdHVcIiwgbmV3IERlY2ltYWwoZHRvLnN0YXZfa19kYXR1ISkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2QmFydnVQcmlSb3pkaWx1KFwicG9obFwiLCBuZXcgRGVjaW1hbChkdG8ucG9obCEpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdkJhcnZ1UHJpUm96ZGlsdShcInNhbGRvXCIsIG5ldyBEZWNpbWFsKGR0by5zYWxkbyEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZERhdGFcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hc3RhdkJhcnZ1UHJpUm96ZGlsdShuYXpldjogc3RyaW5nLCBjYXN0a2E6IERlY2ltYWwpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKClcclxuICAgICAgICAgICAgY29uc3QgbnVsYTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICB2YXIgZmllbGRTZXQgPSBmb3JtLmZpbmRGaWVsZHMobmF6ZXYpXHJcbiAgICAgICAgICAgIGlmIChjYXN0a2EubGVzc1RoYW4obnVsYSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkU2V0LmNzcyhcImNvbG9yXCIsIFwiI0ZGMDAwMFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkU2V0LnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19