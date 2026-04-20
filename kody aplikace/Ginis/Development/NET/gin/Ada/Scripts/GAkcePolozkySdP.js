"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkcePolozkySdP.js                                                        </Name>
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
            let GAkcePolozkySdP = class GAkcePolozkySdP extends Gordic.GContentBase {
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
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový", icon: "gi-plus",
                            enabled: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_PSP == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_PSP == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))),
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            icon: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_PSP == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_PSP == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))) ? "gi-pencil" : "gi-detail",
                            caption: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_PSP == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_PSP == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))) ? "Upravit" : "Detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(true, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_PSP == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_PSP == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP)))),
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
                        searchColumns: ["*id_psp", "*nazev_psp"],
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
                            name: "id_psp",
                            caption: "Položka SdP",
                            width: 130
                        })
                            .addTextColumn({
                            name: "nazev_psp",
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
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceSdp.list({ filters: this.filter_akce }))
                        .on('change', function (ev, ctx) {
                        that.title = "Položky střednědobého plánu ({0})".format(that.view_ISL.getCount().toString());
                    });
                    ;
                    $mainTable.ggrid("setData", that.view_ISL);
                    this.element.on('aktualizuj_sdp', function (ev, ctx) {
                        that.view_ISL.requestData({});
                        // that.title = "Položky střednědobého plánu ({0})".replace("{0}", that.view_ISL.getCount().toString());
                    });
                    this.element.on('aktualizuj_sdp_edit', function (ev, ctx) {
                        that.priz_blok_ip = ctx.priz_blok_ip;
                        var act_enabled = ((that.priz_blok_ip == false) && ((that.globals.Param_Editace_PSP == 1 /* Gordic.Ada.Interface.PristupKEditaciEnum.Ano */) || ((that.globals.Param_Editace_PSP == 2 /* Gordic.Ada.Interface.PristupKEditaciEnum.Dle_Detailu */) && (that.globals.Param_Akce_Editace_TP))));
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
                            that.isl.AkceSdp.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                that.isl.AkceSdp.delete({ data: new_data2 })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "delete");
                                    // that.title = "Položky střednědobého plánu ({0})".replace("{0}", that.view_ISL.getCount().toString());
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
                            that.isl.AkceSdp.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAkcePolozkySdPDetail", { AkceFiltrDto: that.filter_akce, priz_blok_ip: that.priz_blok_ip, modelPSP: new_data2, uid: "GAkcePolozkySdPDetail#" }, "Detail vazby položky SdP", 350, 300, true); // zobrazení modálního Tabu
                                $(l_oDiv).on('close', function (ev, ctx) {
                                    if ((ctx != undefined) && (ctx != null)) {
                                        var akt_data = ctx.data;
                                        if (akt_data != null) {
                                            that.isl.AkceSdp.update({ data: ctx.data })
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
                        novy_zaznam.id_psp = "";
                        novy_zaznam.aktivita = 100;
                        var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAkcePolozkySdPDetail", { AkceFiltrDto: that.filter_akce, modelPSP: novy_zaznam, uid: "GAkcePolozkySdPDetail#" }, "Nová vazba položky SdP", 350, 300, true); // zobrazení modálního Tabu
                        $(l_oDiv).on('close', function (ev, ctx) {
                            if ((ctx != undefined) && (ctx != null)) {
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.AkceSdp.create({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                        // that.title = "Položky střednědobého plánu ({0})".replace("{0}", that.view_ISL.getCount().toString());
                                    })
                                        .fail(function () {
                                    });
                                }
                            }
                        });
                    }
                }
            };
            GAkcePolozkySdP = __decorate([
                gcontent
            ], GAkcePolozkySdP);
            WebClient.GAkcePolozkySdP = GAkcePolozkySdP;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VQb2xvemt5U2RQLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBa2NlUG9sb3preVNkUC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQXdPZjtBQXhPRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3T25CO0lBeE9nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3TzdCO1FBeE9vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQUlZLFFBQUcsR0FBK0MsSUFBSSxDQUFDO2dCQStObkUsQ0FBQztnQkEvTmtFLENBQUM7Z0JBU2hFLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUU1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVsSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsTUFBTSxFQUFFOzRCQUNKLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVM7NEJBQ2hDLE9BQU8sRUFBRSxDQUFDLENB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Qzt5Q0FDRCxJQUFJLENBQUM7b0NBQ04sQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVQLENBQUM7Z0JBRUwsQ0FBQzthQUVKLENBQUE7WUFuT1ksZUFBZTtnQkFEM0IsUUFBUTtlQUNJLGVBQWUsQ0FtTzNCO1lBbk9ZLHlCQUFlLGtCQW1PM0IsQ0FBQTtRQUNMLENBQUMsRUF4T29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXdPN0I7SUFBRCxDQUFDLEVBeE9nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF3T25CO0FBQUQsQ0FBQyxFQXhPUyxNQUFNLEtBQU4sTUFBTSxRQXdPZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVBvbG96a3lTZFAuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZVVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VQb2xvemt5U2RQIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbHVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1BvbG96a2FTZFBEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthU2RQRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthU2RQRHRvIHwgbnVsbCA9IG51bGw7O1xyXG5cclxuLy8gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthU2RQRHRvPjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcHJpel9ibG9rX2lwOiBib29sZWFuO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhdWN0ID0gdGhpcy5tb2RlbHVjdDtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmV3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvVwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiAoKHRoYXQucHJpel9ibG9rX2lwID09IGZhbHNlKSAmJiAoKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX1BTUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lFbnVtLkFubykgfHwgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9QU1AgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5EbGVfRGV0YWlsdSkgJiYgKHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAhKSkpKSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAoKHRoYXQucHJpel9ibG9rX2lwID09IGZhbHNlKSAmJiAoKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX1BTUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lFbnVtLkFubykgfHwgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9QU1AgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5EbGVfRGV0YWlsdSkgJiYgKHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAhKSkpKSA/IFwiZ2ktcGVuY2lsXCIgOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICgodGhhdC5wcml6X2Jsb2tfaXAgPT0gZmFsc2UpICYmICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfUFNQID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uQW5vKSB8fCAoKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX1BTUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lFbnVtLkRsZV9EZXRhaWx1KSAmJiAodGhhdC5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9UUCEpKSkpID8gXCJVcHJhdml0XCIgOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERlbGV0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0XCIsIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiAoKHRoYXQucHJpel9ibG9rX2lwID09IGZhbHNlKSAmJiAoKHRoYXQuZ2xvYmFscy5QYXJhbV9FZGl0YWNlX1BTUCA9PSBHb3JkaWMuQWRhLkludGVyZmFjZS5QcmlzdHVwS0VkaXRhY2lFbnVtLkFubykgfHwgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9QU1AgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5EbGVfRGV0YWlsdSkgJiYgKHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAhKSkpKSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc21hemFuaV9yYWRrdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROZXcqXCIsIFwiYWN0RGV0YWlsKlwiLCBcImFjdERlbGV0ZSpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGJsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gY3R4LmNlbGxJbmZvLmRhdGFcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSAkbWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiKmlkX3BzcFwiLCBcIipuYXpldl9wc3BcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYWt0aXZpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlLW8gZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIkFrdGl2bsOtXCIsIGNhcHRpb246IFwiQWt0aXZuw61cIiwgdG9vbHRpcDogXCJBa3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTsOhdnJoXCIsIGNhcHRpb246IFwiTsOhdnJoXCIsIHRvb2x0aXA6IFwiTsOhdnJoXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDA6IHJldHVybiB7IGljb246IFwiZmEtdHJhc2ggZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOZWFrdGl2bsOtXCIsIGNhcHRpb246IFwiTmVha3Rpdm7DrVwiLCB0b29sdGlwOiBcIk5lYWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfcHNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvbG/FvmthIFNkUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfcHNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gem3Em255XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm3Em251IHByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZVNkcC5saXN0KHsgZmlsdGVyczogdGhpcy5maWx0ZXJfYWtjZSB9KSlcclxuICAgICAgICAgICAgICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJQb2xvxb5reSBzdMWZZWRuxJtkb2LDqWhvIHBsw6FudSAoezB9KVwiLmZvcm1hdCh0aGF0LnZpZXdfSVNMLmdldENvdW50KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oJ2FrdHVhbGl6dWpfc2RwJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoe30pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhhdC50aXRsZSA9IFwiUG9sb8W+a3kgc3TFmWVkbsSbZG9iw6lobyBwbMOhbnUgKHswfSlcIi5yZXBsYWNlKFwiezB9XCIsIHRoYXQudmlld19JU0wuZ2V0Q291bnQoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oJ2FrdHVhbGl6dWpfc2RwX2VkaXQnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcml6X2Jsb2tfaXAgPSBjdHgucHJpel9ibG9rX2lwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdF9lbmFibGVkID0gKCh0aGF0LnByaXpfYmxva19pcCA9PSBmYWxzZSkgJiYgKCh0aGF0Lmdsb2JhbHMuUGFyYW1fRWRpdGFjZV9QU1AgPT0gR29yZGljLkFkYS5JbnRlcmZhY2UuUHJpc3R1cEtFZGl0YWNpRW51bS5Bbm8pIHx8ICgodGhhdC5nbG9iYWxzLlBhcmFtX0VkaXRhY2VfUFNQID09IEdvcmRpYy5BZGEuSW50ZXJmYWNlLlByaXN0dXBLRWRpdGFjaUVudW0uRGxlX0RldGFpbHUpICYmICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISkpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5ldyEuZW5hYmxlZChhY3RfZW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGVsZXRlIS5lbmFibGVkKGFjdF9lbmFibGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNtYXphbmlfcmFka3UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhhdC5yb3cgIT0gdW5kZWZpbmVkKSAmJiAodGhhdC5yb3cgIT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJPcHJhdmR1IG9kc3RyYW5pdCB6w6F6bmFtP1wiLCBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFDb25zdC5tYmJZZXNOb05lZ2F0aXYsIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVNkcC5yZWFkKHsgZGF0YTogdGhhdC5yb3chIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAobmV3X2RhdGEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVNkcC5kZWxldGUoeyBkYXRhOiBuZXdfZGF0YTIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC50aXRsZSA9IFwiUG9sb8W+a3kgc3TFmWVkbsSbZG9iw6lobyBwbMOhbnUgKHswfSlcIi5yZXBsYWNlKFwiezB9XCIsIHRoYXQudmlld19JU0wuZ2V0Q291bnQoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkZXRhaWxfcmFka3UoZWRpdGFibGUsIG5vdmFha2NlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG5vdmFha2NlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoYXQucm93ICE9IHVuZGVmaW5lZCkgJiYgKHRoYXQucm93ICE9IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVNkcC5yZWFkKHsgZGF0YTogdGhhdC5yb3cgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAobmV3X2RhdGEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9vRGl2ID0gdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlUG9sb3preVNkUERldGFpbFwiLCB7IEFrY2VGaWx0ckR0bzogdGhhdC5maWx0ZXJfYWtjZSwgcHJpel9ibG9rX2lwOiB0aGF0LnByaXpfYmxva19pcCwgbW9kZWxQU1A6IG5ld19kYXRhMiwgdWlkOiBcIkdBa2NlUG9sb3preVNkUERldGFpbCNcIiB9LCBcIkRldGFpbCB2YXpieSBwb2xvxb5reSBTZFBcIiwgMzUwLCAzMDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ICE9IHVuZGVmaW5lZCkgJiYgKGN0eCAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlU2RwLnVwZGF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm92eV96YXpuYW06IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdQb2xvemthU2RQRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0ucm9rID0gdGhhdC5maWx0ZXJfYWtjZS5yb2s7XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5pY28gPSB0aGF0LmZpbHRlcl9ha2NlLmljbztcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLmNpc2xvID0gdGhhdC5maWx0ZXJfYWtjZS5jaXNsbztcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLml4c19jaWEgPSB0aGF0LmZpbHRlcl9ha2NlLml4c19jaWE7XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5pZF9wc3AgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uYWt0aXZpdGEgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVBvbG96a3lTZFBEZXRhaWxcIiwgeyBBa2NlRmlsdHJEdG86IHRoYXQuZmlsdGVyX2FrY2UsIG1vZGVsUFNQOiBub3Z5X3phem5hbSwgdWlkOiBcIkdBa2NlUG9sb3preVNkUERldGFpbCNcIiB9LCBcIk5vdsOhIHZhemJhIHBvbG/Fvmt5IFNkUFwiLCAzNTAsIDMwMCwgdHJ1ZSk7ICAgIC8vIHpvYnJhemVuw60gbW9kw6FsbsOtaG8gVGFidVxyXG4gICAgICAgICAgICAgICAgJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjdHggIT0gdW5kZWZpbmVkKSAmJiAoY3R4ICE9IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkFrY2VTZHAuY3JlYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC50aXRsZSA9IFwiUG9sb8W+a3kgc3TFmWVkbsSbZG9iw6lobyBwbMOhbnUgKHswfSlcIi5yZXBsYWNlKFwiezB9XCIsIHRoYXQudmlld19JU0wuZ2V0Q291bnQoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=