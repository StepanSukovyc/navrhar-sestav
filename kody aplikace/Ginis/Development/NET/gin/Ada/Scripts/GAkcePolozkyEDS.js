"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkcePolozkyEDS.js                                                        </Name>
//    <Description> GAkceUct                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAkcePolozkyEDS = class GAkcePolozkyEDS extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.row = null;
                }
                ;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    $tab.empty();
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový", icon: "gi-plus",
                            enabled: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_EDS == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_EDS == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))),
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            icon: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_EDS == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_EDS == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))) ? "gi-pencil" : "gi-detail",
                            caption: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_EDS == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_EDS == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))) ? "Upravit" : "Detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(true, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_EDS == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_EDS == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))),
                            run: () => {
                                return that.smazani_radku();
                            }
                        },
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"]));
                    //var actEdit = new GAction({
                    //    name: "dblclick",
                    //    run: function (ev, ctx) {
                    //        GDlg.alert("Dvojklik");
                    //        // ctx.cellInfo.data
                    //    }
                    //});
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        selection(ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                return that.detail_radku(true, false);
                            }
                        }),
                        searchColumns: ["*id_eds", "*nazev_eds"],
                        columns: new Gordic.Data.GridFormat()
                            .addIconColumn({
                            name: "aktivita",
                            field: "aktivita",
                            caption: "Stav",
                            // width: 25,
                            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            iconTemplate: function (data) {
                                switch (data.aktivita) {
                                    case 100: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                                    case 300: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                                    case 500: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                                    default: return null;
                                }
                            }
                        })
                            .addTextColumn({
                            name: "id_eds",
                            caption: "Projekt EDS",
                            width: 130
                        })
                            .addTextColumn({
                            name: "nazev_eds",
                            caption: "Název",
                            width: 400
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Datum změny",
                            customClass: "dt-left",
                            width: 140,
                        })
                            .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "Změnu provedl",
                            width: 400
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceEDS.list({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    this.element.on('aktualizuj_eds_edit', function (ev, ctx) {
                        that.priz_blok_ip = ctx.priz_blok_ip;
                        var act_enabled = ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_EDS == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_EDS == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP))));
                        that.actions.actNew.enabled(act_enabled);
                        that.actions.actDelete.enabled(act_enabled);
                        //debugger;
                    });
                }
                smazani_radku() {
                    var that = this;
                    if ((that.row != undefined) && (that.row != null)) {
                        that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                            .on("yes", function () {
                            that.isl.AkceEDS.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                that.isl.AkceEDS.delete({ data: new_data2 })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "delete");
                                    that.title = "Projekty EDS ({0})".replace("{0}", that.view_ISL.getCount().toString());
                                })
                                    .fail(function () {
                                });
                            });
                        });
                    }
                }
                detail_radku(editable, novaakce) {
                    var that = this;
                    if (novaakce == false) {
                        if ((that.row != undefined) && (that.row != null)) {
                            that.isl.AkceEDS.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAkcePolozkyEDSDetail", { AkceFiltrDto: that.filter_akce, priz_blok_ip: that.priz_blok_ip, modelEDS: new_data2, uid: "GAkcePolozkyEDSDetail#" }, "Detail vazby projektu EDS", 350, 300, true); // zobrazení modálního Tabu
                                $(l_oDiv).on('close', function (ev, ctx) {
                                    if ((ctx != undefined) && (ctx != null)) {
                                        var akt_data = ctx.data;
                                        if (akt_data != null) {
                                            that.isl.AkceEDS.update({ data: ctx.data })
                                                .get()
                                                .then(function (response) {
                                                that.view_ISL.updateData(response.data, "update");
                                            })
                                                .fail(function () {
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    }
                    else {
                        var novy_zaznam = {};
                        novy_zaznam.rok = that.filter_akce.rok;
                        novy_zaznam.ico = that.filter_akce.ico;
                        novy_zaznam.cislo = that.filter_akce.cislo;
                        novy_zaznam.ixs_cia = that.filter_akce.ixs_cia;
                        novy_zaznam.id_eds = "";
                        novy_zaznam.aktivita = 100;
                        var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAkcePolozkyEDSDetail", { AkceFiltrDto: that.filter_akce, modelEDS: novy_zaznam, uid: "GAkcePolozkyEDSDetail#" }, "Nová vazba projektu EDS", 350, 300, true); // zobrazení modálního Tabu
                        $(l_oDiv).on('close', function (ev, ctx) {
                            if ((ctx != undefined) && (ctx != null)) {
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.AkceEDS.create({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                        that.title = "Projekty EDS ({0})".replace("{0}", that.view_ISL.getCount().toString());
                                    })
                                        .fail(function () {
                                    });
                                }
                            }
                        });
                    }
                }
            };
            GAkcePolozkyEDS = __decorate([
                gcontent
            ], GAkcePolozkyEDS);
            WebClient.GAkcePolozkyEDS = GAkcePolozkyEDS;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VQb2xvemt5RURTLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBa2NlUG9sb3preUVEUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQStOZjtBQS9ORCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErTm5CO0lBL05nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErTjdCO1FBL05vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQUlZLFFBQUcsR0FBK0MsSUFBSSxDQUFDO2dCQXNObkUsQ0FBQztnQkF0TmtFLENBQUM7Z0JBU2hFLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUU1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixNQUFNLEVBQUU7NEJBQ0osT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUzs0QkFDaEMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FB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LGtCQTBOM0IsQ0FBQTtRQUNMLENBQUMsRUEvTm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQStON0I7SUFBRCxDQUFDLEVBL05nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErTm5CO0FBQUQsQ0FBQyxFQS9OUyxNQUFNLEtBQU4sTUFBTSxRQStOZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVBvbG96a3lFRFMuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZVVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VQb2xvemt5RURTIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbHVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1BvbG96a2FFRFNEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthRURTRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthRURTRHRvIHwgbnVsbCA9IG51bGw7O1xyXG5cclxuLy8gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthRURTRHRvPjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcHJpel9ibG9rX2lwOiBib29sZWFuO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhdWN0ID0gdGhpcy5tb2RlbHVjdDtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5ldzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKCh0aGF0LnByaXpfYmxva19pcCA9PSBmYWxzZSkgJiYgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9FRFMgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5Bbm8pIHx8ICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfRURTID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uRGxlX0RldGFpbHUpICYmICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISkpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogKCh0aGF0LnByaXpfYmxva19pcCA9PSBmYWxzZSkgJiYgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9FRFMgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5Bbm8pIHx8ICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfRURTID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uRGxlX0RldGFpbHUpICYmICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISkpKSkgPyBcImdpLXBlbmNpbFwiIDogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogKCh0aGF0LnByaXpfYmxva19pcCA9PSBmYWxzZSkgJiYgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9FRFMgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5Bbm8pIHx8ICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfRURTID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uRGxlX0RldGFpbHUpICYmICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISkpKSkgPyBcIlVwcmF2aXRcIiA6IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHN0cmFuaXRcIiwgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICgodGhhdC5wcml6X2Jsb2tfaXAgPT0gZmFsc2UpICYmICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfRURTID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uQW5vKSB8fCAoKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX0VEUyA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lFbnVtLkRsZV9EZXRhaWx1KSAmJiAodGhhdC5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9UUCEpKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zbWF6YW5pX3JhZGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqaWRfZWRzXCIsIFwiKm5hemV2X2Vkc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUtbyBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiQWt0aXZuw61cIiwgY2FwdGlvbjogXCJBa3Rpdm7DrVwiLCB0b29sdGlwOiBcIkFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOw6F2cmhcIiwgY2FwdGlvbjogXCJOw6F2cmhcIiwgdG9vbHRpcDogXCJOw6F2cmhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF9lZHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvamVrdCBFRFNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2Vkc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLkFrY2VFRFMubGlzdCh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyX2FrY2UgfSkpO1xyXG5cclxuICAgICAgICAgICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oJ2FrdHVhbGl6dWpfZWRzX2VkaXQnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcml6X2Jsb2tfaXAgPSBjdHgucHJpel9ibG9rX2lwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdF9lbmFibGVkID0gKCh0aGF0LnByaXpfYmxva19pcCA9PSBmYWxzZSkgJiYgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9FRFMgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5Bbm8pIHx8ICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfRURTID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uRGxlX0RldGFpbHUpICYmICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISkpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5ldyEuZW5hYmxlZChhY3RfZW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGVsZXRlIS5lbmFibGVkKGFjdF9lbmFibGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc21hemFuaV9yYWRrdSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGF0LnJvdyAhPSB1bmRlZmluZWQpICYmICh0aGF0LnJvdyAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJEb3RhelwiLCBcIk9wcmF2ZHUgb2RzdHJhbml0IHrDoXpuYW0/XCIsIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUNvbnN0Lm1iYlllc05vTmVnYXRpdiwgR0RsZy5tYmlRdWVzdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlRURTLnJlYWQoeyBkYXRhOiB0aGF0LnJvdyEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlRURTLmRlbGV0ZSh7IGRhdGE6IG5ld19kYXRhMiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJQcm9qZWt0eSBFRFMgKHswfSlcIi5yZXBsYWNlKFwiezB9XCIsIHRoYXQudmlld19JU0wuZ2V0Q291bnQoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuXHJcbiAgICAgICAgZGV0YWlsX3JhZGt1KGVkaXRhYmxlLCBub3ZhYWtjZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChub3ZhYWtjZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGF0LnJvdyAhPSB1bmRlZmluZWQpICYmICh0aGF0LnJvdyAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkFrY2VFRFMucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVBvbG96a3lFRFNEZXRhaWxcIiwgeyBBa2NlRmlsdHJEdG86IHRoYXQuZmlsdGVyX2FrY2UsIHByaXpfYmxva19pcDogdGhhdC5wcml6X2Jsb2tfaXAsIG1vZGVsRURTOiBuZXdfZGF0YTIsIHVpZDogXCJHQWtjZVBvbG96a3lFRFNEZXRhaWwjXCIgfSwgXCJEZXRhaWwgdmF6YnkgcHJvamVrdHUgRURTXCIsIDM1MCwgMzAwLCB0cnVlKTsgICAgLy8gem9icmF6ZW7DrSBtb2TDoWxuw61obyBUYWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGxfb0Rpdikub24oJ2Nsb3NlJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGN0eCAhPSB1bmRlZmluZWQpICYmIChjdHggIT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZUVEUy51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdnlfemF6bmFtOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HUG9sb3prYUVEU0R0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLnJvayA9IHRoYXQuZmlsdGVyX2FrY2Uucm9rO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uaWNvID0gdGhhdC5maWx0ZXJfYWtjZS5pY287XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5jaXNsbyA9IHRoYXQuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5peHNfY2lhID0gdGhhdC5maWx0ZXJfYWtjZS5peHNfY2lhO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uaWRfZWRzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLmFrdGl2aXRhID0gMTAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VQb2xvemt5RURTRGV0YWlsXCIsIHsgQWtjZUZpbHRyRHRvOiB0aGF0LmZpbHRlcl9ha2NlLCBtb2RlbEVEUzogbm92eV96YXpuYW0sIHVpZDogXCJHQWtjZVBvbG96a3lFRFNEZXRhaWwjXCIgfSwgXCJOb3bDoSB2YXpiYSBwcm9qZWt0dSBFRFNcIiwgMzUwLCAzMDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ICE9IHVuZGVmaW5lZCkgJiYgKGN0eCAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlRURTLmNyZWF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIlByb2pla3R5IEVEUyAoezB9KVwiLnJlcGxhY2UoXCJ7MH1cIiwgdGhhdC52aWV3X0lTTC5nZXRDb3VudCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=