"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceSouvisejici.js                                                        </Name>
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
            let GAkceSouvisejici = class GAkceSouvisejici extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.row = null;
                }
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
                            enabled: (that.globals.Param_Akce_Editace_TP),
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            icon: (that.globals.Param_Akce_Editace_TP) ? "gi-pencil" : "gi-detail",
                            caption: (that.globals.Param_Akce_Editace_TP) ? "Upravit" : "Detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(true, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: (that.globals.Param_Akce_Editace_TP),
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
                        searchColumns: ["*cislo", "*cislo_old"],
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
                            .addNumberColumn({
                            name: "rok_od",
                            caption: "Rok",
                            width: 50,
                        })
                            .addTextColumn({
                            name: "cislo_old",
                            caption: that.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Číslo PP - hist." : "Číslo akce - hist.",
                            width: 130
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
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceSouvisejici.list({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    if ((that.row != undefined) && (that.row != null)) {
                        that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                            .on("yes", function () {
                            that.isl.AkceSouvisejici.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                that.isl.AkceSouvisejici.delete({ data: new_data2 })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                    //that.newOps({ title: "Rozpis zdrojů ({0})".replace("{0}", that.view_ISL.getCount().toString()) });
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
                            that.isl.AkceSouvisejici.read({ data: that.row })
                                .getData()
                                .done(function (new_data2) {
                                var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAkceSouvisejiciDetail", { AkceFiltrDto: that.filter_akce, modelSou: new_data2, uid: "GAkceSouvisejiciDetail#" }, "Detail záznamu historie plánování", 350, 500, true); // zobrazení modálního Tabu
                                $(l_oDiv).on('close', function (ev, ctx) {
                                    if ((ctx != undefined) && (ctx != null)) {
                                        var akt_data = ctx.data;
                                        if (akt_data != null) {
                                            that.isl.AkceSouvisejici.update({ data: ctx.data })
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
                        novy_zaznam.rok_od = that.filter_akce.rok - 1;
                        novy_zaznam.ico = that.filter_akce.ico;
                        novy_zaznam.cislo = that.filter_akce.cislo;
                        novy_zaznam.cislo_old = "";
                        novy_zaznam.aktivita = 100;
                        var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAkceSouvisejiciDetail", { AkceFiltrDto: that.filter_akce, modelSou: novy_zaznam, uid: "GAkceSouvisejiciDetail#" }, "Nový záznam historie plánování", 350, 500, true); // zobrazení modálního Tabu
                        $(l_oDiv).on('close', function (ev, ctx) {
                            if ((ctx != undefined) && (ctx != null)) {
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.AkceSouvisejici.create({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                        //that.newOps({ title: "Rozpis zdrojů ({0})".replace("{0}", that.view_ISL.getCount().toString()) });
                                        that.element.trigger("ada_saveSou", [{ pocet: that.view_ISL.getCount() }]);
                                    })
                                        .fail(function () {
                                    });
                                }
                            }
                        });
                    }
                }
            };
            GAkceSouvisejici = __decorate([
                gcontent
            ], GAkceSouvisejici);
            WebClient.GAkceSouvisejici = GAkceSouvisejici;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VTb3V2aXNlamljaS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWtjZVNvdXZpc2VqaWNpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBb05mO0FBcE5ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9ObkI7SUFwTmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9ON0I7UUFwTm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBSVksUUFBRyxHQUE0QyxJQUFJLENBQUM7Z0JBMk1oRSxDQUFDO2dCQW5NRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFFNUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFFZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFbEksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE1BQU0sRUFBRTs0QkFDSixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTOzRCQUNoQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMs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SyxDQUFDO2dDQUN6QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFLLEVBQUUsQ0FBQzt5Q0FDL0MsR0FBRyxFQUFFO3lDQUNMLElBQUksQ0FBQyxVQUFVLFFBQVE7d0NBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0NBQ2xELG9HQUFvRzt3Q0FDcEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDL0UsQ0FBQyxDQUFDO3lDQUNELElBQUksQ0FBQztvQ0FDTixDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBRVAsQ0FBQztnQkFFTCxDQUFDO2FBQ0osQ0FBQTtZQS9NWSxnQkFBZ0I7Z0JBRDVCLFFBQVE7ZUFDSSxnQkFBZ0IsQ0ErTTVCO1lBL01ZLDBCQUFnQixtQkErTTVCLENBQUE7UUFDTCxDQUFDLEVBcE5vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvTjdCO0lBQUQsQ0FBQyxFQXBOZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb05uQjtBQUFELENBQUMsRUFwTlMsTUFBTSxLQUFOLE1BQU0sUUFvTmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VTb3V2aXNlamljaS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWtjZVNvdXZpc2VqaWNpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbHVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNjaXNEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzY2lzRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzY2lzRHRvIHwgbnVsbCA9IG51bGw7XHJcblxyXG4vLyAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNjaXNEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGF1Y3QgPSB0aGlzLm1vZGVsdWN0O1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsO9XCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogKHRoYXQuZ2xvYmFscy5QYXJhbV9Ba2NlX0VkaXRhY2VfVFAhKSA/IFwiZ2ktcGVuY2lsXCIgOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISkgPyBcIlVwcmF2aXRcIiA6IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHN0cmFuaXRcIiwgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9FZGl0YWNlX1RQISksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNtYXphbmlfcmFka3UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROZXcqXCIsIFwiYWN0RGV0YWlsKlwiLCBcImFjdERlbGV0ZSpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGJsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gY3R4LmNlbGxJbmZvLmRhdGFcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqY2lzbG9cIiwgXCIqY2lzbG9fb2xkXCJdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUtbyBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiQWt0aXZuw61cIiwgY2FwdGlvbjogXCJBa3Rpdm7DrVwiLCB0b29sdGlwOiBcIkFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOw6F2cmhcIiwgY2FwdGlvbjogXCJOw6F2cmhcIiwgdG9vbHRpcDogXCJOw6F2cmhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva19vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb19vbGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwixIzDrXNsbyBQUCAtIGhpc3QuXCIgOiBcIsSMw61zbG8gYWtjZSAtIGhpc3QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gem3Em255XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLkFrY2VTb3V2aXNlamljaS5saXN0KHsgZmlsdGVyczogdGhpcy5maWx0ZXJfYWtjZSB9KSk7XHJcblxyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzbWF6YW5pX3JhZGt1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICgodGhhdC5yb3cgIT0gdW5kZWZpbmVkKSAmJiAodGhhdC5yb3cgIT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJPcHJhdmR1IG9kc3RyYW5pdCB6w6F6bmFtP1wiLCBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFDb25zdC5tYmJZZXNOb05lZ2F0aXYsIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuQWtjZVNvdXZpc2VqaWNpLnJlYWQoeyBkYXRhOiB0aGF0LnJvdyEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlU291dmlzZWppY2kuZGVsZXRlKHsgZGF0YTogbmV3X2RhdGEyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uZXdPcHMoeyB0aXRsZTogXCJSb3pwaXMgemRyb2rFryAoezB9KVwiLnJlcGxhY2UoXCJ7MH1cIiwgdGhhdC52aWV3X0lTTC5nZXRDb3VudCgpLnRvU3RyaW5nKCkpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRldGFpbF9yYWRrdShlZGl0YWJsZSwgbm92YWFrY2UpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAobm92YWFrY2UgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICgodGhhdC5yb3cgIT0gdW5kZWZpbmVkKSAmJiAodGhhdC5yb3cgIT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlU291dmlzZWppY2kucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVNvdXZpc2VqaWNpRGV0YWlsXCIsIHsgQWtjZUZpbHRyRHRvOiB0aGF0LmZpbHRlcl9ha2NlLCBtb2RlbFNvdTogbmV3X2RhdGEyLCB1aWQ6IFwiR0FrY2VTb3V2aXNlamljaURldGFpbCNcIiB9LCBcIkRldGFpbCB6w6F6bmFtdSBoaXN0b3JpZSBwbMOhbm92w6Fuw61cIiwgMzUwLCA1MDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ICE9IHVuZGVmaW5lZCkgJiYgKGN0eCAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlU291dmlzZWppY2kudXBkYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3Z5X3phem5hbTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNjaXNEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5yb2tfb2QgPSB0aGF0LmZpbHRlcl9ha2NlLnJvayEgLSAxO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uaWNvID0gdGhhdC5maWx0ZXJfYWtjZS5pY287XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5jaXNsbyA9IHRoYXQuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5jaXNsb19vbGQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uYWt0aXZpdGEgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZVNvdXZpc2VqaWNpRGV0YWlsXCIsIHsgQWtjZUZpbHRyRHRvOiB0aGF0LmZpbHRlcl9ha2NlLCBtb2RlbFNvdTogbm92eV96YXpuYW0sIHVpZDogXCJHQWtjZVNvdXZpc2VqaWNpRGV0YWlsI1wiIH0sIFwiTm92w70gesOhem5hbSBoaXN0b3JpZSBwbMOhbm92w6Fuw61cIiwgMzUwLCA1MDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ICE9IHVuZGVmaW5lZCkgJiYgKGN0eCAhPSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ba2NlU291dmlzZWppY2kuY3JlYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5ld09wcyh7IHRpdGxlOiBcIlJvenBpcyB6ZHJvasWvICh7MH0pXCIucmVwbGFjZShcInswfVwiLCB0aGF0LnZpZXdfSVNMLmdldENvdW50KCkudG9TdHJpbmcoKSkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiYWRhX3NhdmVTb3VcIiwgW3sgcG9jZXQ6IHRoYXQudmlld19JU0wuZ2V0Q291bnQoKSB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=