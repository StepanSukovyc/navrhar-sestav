"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GPrepocetAda.js                                                        </Name>
//    <Description> GPrepocetAda                                                                                  </Description>
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
            let GPrepocetAda = class GPrepocetAda extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter_akce = {};
                    this.title = "Přepočet stavů akcí";
                    this.taskId = "actPrepocetAda"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var cnt = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    cnt.actions.addRange({
                        actClose: {
                            caption: "Zrušit",
                            run: function () {
                                that.tryClose();
                            }
                        },
                        actPrepocet: {
                            caption: "Přepočet",
                            run: function () {
                                that.prepocet();
                            }
                        }
                    });
                    cnt.menuBar(this.actions.createBar(["actPrepocet*"]));
                    cnt.commandBar(this.actions.createBar(["actClose"]));
                    var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", layoutDescriptor: "w-L-9 w-M-9 w-S-12" })
                        .addSection();
                    filterFormDef
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string", label: "Číslo akce", name: "cislo", pathInModel: "cislo",
                        customOptFieldStart: Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_Akce, true, true),
                        customOptFieldEnd: Gordic.Eko.Detail.Field.getCounterOptions(that.globals.Delka_Akce, true, true),
                        customOptAll: {
                            change: function (ev, changeObj) {
                                if (changeObj.flags.noChange) {
                                    return;
                                }
                                var hodnota;
                                hodnota = changeObj.value;
                                if ((hodnota) && (hodnota.length < that.globals.Delka_Akce)) {
                                    $(this).gfield("setValue", Gordic.Utils.zeropad(hodnota, that.globals.Delka_Akce));
                                }
                            }
                        }
                    }));
                    filterFormDef
                        .addRow("Organizace").addField("gselectbox", Gordic.Prefabs.Select.ekosrar(), {
                        name: "nks",
                        model: "model.ixs_rar=value.ixs_rar;model.nks=value.ico;model.nks_txt=value.nazev",
                        change: function (ev, changeObj) {
                            if (changeObj.flags.noChange) {
                                return;
                            }
                            var hodnota;
                            hodnota = changeObj.value?.ico;
                        }
                    });
                    that.filterForm = $("<div>").appendTo(mainForm)
                        .gfilterpanel({
                        // default pro EKO
                        filterViewModeUserSettings: [FilterViewMode.Simple, FilterViewMode.Detail],
                        filterViewMode: FilterViewMode.Simple,
                        //poOtevreniOtevritPanelPodminek: false,     // default pro uživatelské nastavení
                        poVyhledaniZobrazit: "VyhledanePodminkyVBadge",
                        autoLoadAfterChoseFilter: false, // Automatické vyhledání po změně uloženého
                        clearFilterButtonVisible: "NeverVisible",
                        detailActionAsCheckbox: false,
                        //idSimpleMode:"idSimpleMode",
                        forms: [filterFormDef],
                        // TODO: bude nějaké lepší ukládací okno nebo budu muset udělat svoje a nastavit ho do saveOptionsForm?
                        favorites: ["cislo", "nks"],
                        favoriteLayoutDescriptor: "L4M3S1",
                        // TODO: zůstane tohle téma nebo bude pro LK jiné než pro TK?
                        tema: "ada_ptm_adabas3",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        saveOptionsForm: "eko",
                        // strictStopAutoLoad: true,               // Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
                        // textItemTemplate: "{description}",
                        apply: function (event, obj) {
                            // načtení dat podle filtrů
                            that.filter_akce = obj.filter;
                            //                        that.view_ISL = new Gordic.Isl.View(that.isl.AkceServis.list_Prepocet({ filters: that.filter_akce }));
                            that.view_ISL.requestData({ filters: that.filter_akce });
                        }
                    });
                    this.mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        cellActivate(ev, ctx) {
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                            }
                        }),
                        searchColumns: ["ac"],
                        columns: new Gordic.Data.GridFormat()
                            .addIconColumn({
                            name: "aktivita",
                            field: "aktivita",
                            caption: "P",
                            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            iconTemplate: function (data) {
                                switch (data.aktivita) {
                                    case 1: return { icon: "gi-tick", text: "Přepočteno", caption: "Přepočteno", tooltip: "Přepočteno" };
                                    case 0: return { icon: "fa-fw", text: "", caption: "", tooltip: "" };
                                    default: return null;
                                }
                            }
                        }).addTextColumn({
                            name: "cislo",
                            caption: "Číslo akce",
                            customClass: "dt-left",
                            width: 140
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "Název akce",
                            customClass: "dt-left",
                            width: 300,
                        })
                            .addTextColumn({
                            name: "nks",
                            caption: "Organizace",
                            width: 120
                        })
                            .addTextColumn({
                            name: "t_nks",
                            caption: "Název organizace",
                            width: 300
                        })
                    });
                    //var focusFunc = function () {
                    //    cnt.mainTable.ggrid('focus'); // nastavení focusu na grid
                    //    (cnt.view_ISL as any).off('change.focus'); // odvázání události z ISL view
                    //};
                    //cnt.view_ISL.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                    var akce_start = Gordic.Utils.zeropad("1", that.globals.Delka_Akce);
                    var akce_end = Gordic.Utils.zeropad("0", that.globals.Delka_Akce).replace(/0/g, "9");
                    cnt.filter_akce.cislo = { start: akce_start, end: akce_end };
                    cnt.filter_akce.nks = null;
                    cnt.filter_akce.dat_zmena = null;
                    cnt.filterForm.gfilterpanel("applyFilter", cnt.filter_akce);
                    that.view_ISL = new Gordic.Isl.View(this.isl.AkceServis.list_Prepocet({ filters: cnt.filter_akce }));
                    cnt.mainTable.ggrid("setData", that.view_ISL);
                    //            cnt.gridCheckAll(true);
                    // Fokus na seznammu
                    var focusFunc = function () {
                        cnt.mainTable.ggrid('focus'); // nastavení focusu na grid
                        cnt.view_ISL.off('change.focus'); // odvázání události z ISL view
                    };
                    cnt.view_ISL.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                }
                //private gridCheckAll(checkAll: boolean) {
                //    if (this.mainTable == null)
                //        return false;
                //    var instance: any = this.mainTable.ggrid("instance");
                //    if (checkAll === true && instance.actions != null && instance.actions.actCheckAll != null) {
                //        instance.actions.actCheckAll.run();         // označit všechny řádky
                //        return true;
                //    }
                //    return false;
                //}
                prepocet() {
                    var cnt = this;
                    var vybraneRadky = cnt.mainTable.ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length > 0) {
                        var l_citac = 1;
                        vybraneRadky.forEach((r) => {
                            cnt.beginOperation("Probíhá přepočet akce " + r.cislo, l_citac, vybraneRadky.length);
                            var l_cislo = r.cislo;
                            if (l_cislo) {
                                var l_o_zapis = { in_cislo: l_cislo };
                                cnt.isl.AkceServis.prepocet_Akce(l_o_zapis)
                                    .getData()
                                    .done(function (data) {
                                    r.aktivita = 1;
                                    cnt.view_ISL.updateData(r, "update");
                                    console.log("Vysledek SPL - " + l_cislo + " - " + data);
                                })
                                    .always(function () {
                                    cnt.endOperation();
                                });
                            }
                            l_citac++;
                        });
                    }
                }
            };
            GPrepocetAda = __decorate([
                gcontent
            ], GPrepocetAda);
            WebClient.GPrepocetAda = GPrepocetAda;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZXBvY2V0QWRhLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dQcmVwb2NldEFkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQTJQZjtBQTNQRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyUG5CO0lBM1BnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EyUDdCO1FBM1BvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO2dCQUE5Qzs7b0JBS1ksZ0JBQVcsR0FBNkMsRUFBRSxDQUFDO29CQU9uRSxVQUFLLEdBQUcscUJBQXFCLENBQUM7b0JBQzlCLFdBQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLCtCQUErQjtnQkF5TzlELENBQUM7Z0JBdk9HLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUdiLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVsSSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDakIsUUFBUSxFQUFFOzRCQUNOLE9BQU8sRUFBRSxRQUFROzRCQUNqQixHQUFHLEVBQUU7Z0NBQ0QsSUFBSSxDQUFDLFFB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QUUsQ0FBQzs0QkFFdEYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzs0QkFDdEIsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQ0FDVixJQUFJLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztnQ0FDdEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFFLFNBQVMsQ0FBRTtxQ0FDeEMsT0FBTyxFQUFFO3FDQUNULElBQUksQ0FBQyxVQUFVLElBQUk7b0NBQ2hCLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO29DQUNmLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQ0FDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO2dDQUM1RCxDQUFDLENBQUM7cUNBQ0QsTUFBTSxDQUFDO29DQUNKLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQ0FDdkIsQ0FBQyxDQUFDLENBQUE7NEJBQ1YsQ0FBQzs0QkFFRCxPQUFPLEVBQUUsQ0FBQzt3QkFDZCxDQUFDLENBQUMsQ0FBQztvQkFFUCxDQUFDO2dCQUVMLENBQUM7YUFDSixDQUFBO1lBdFBZLFlBQVk7Z0JBRHhCLFFBQVE7ZUFDSSxZQUFZLENBc1B4QjtZQXRQWSxzQkFBWSxlQXNQeEIsQ0FBQTtRQUNMLENBQUMsRUEzUG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJQN0I7SUFBRCxDQUFDLEVBM1BnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyUG5CO0FBQUQsQ0FBQyxFQTNQUyxNQUFNLEtBQU4sTUFBTSxRQTJQZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HUHJlcG9jZXRBZGEuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHUHJlcG9jZXRBZGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmVwb2NldEFkYSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcm93OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU2V6bmFtQWRhRmlsdGVyRHRvID0ge307XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWFpblRhYmxlOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJGb3JtOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiUMWZZXBvxI1ldCBzdGF2xa8gYWtjw61cIjtcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFByZXBvY2V0QWRhXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXBvY2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZllcG/EjWV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250Lm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQcmVwb2NldCpcIl0pKTtcclxuICAgICAgICAgICAgY250LmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bsOtIGZpbHRyXCIsIGxheW91dERlc2NyaXB0b3I6IFwidy1MLTkgdy1NLTkgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIiwgbGFiZWw6IFwixIzDrXNsbyBha2NlXCIsIG5hbWU6IFwiY2lzbG9cIiwgcGF0aEluTW9kZWw6IFwiY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZFN0YXJ0OiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISwgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRFbmQ6IEVrby5EZXRhaWwuRmllbGQuZ2V0Q291bnRlck9wdGlvbnModGhhdC5nbG9iYWxzLkRlbGthX0FrY2UhLCB0cnVlLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmouZmxhZ3Mubm9DaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvZG5vdGE6IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvZG5vdGEgPSBjaGFuZ2VPYmoudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGhvZG5vdGEpICYmIChob2Rub3RhLmxlbmd0aCA8IHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIFV0aWxzLnplcm9wYWQoaG9kbm90YSwgdGhhdC5nbG9iYWxzLkRlbGthX0FrY2UhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3JnYW5pemFjZVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyYXIoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3Jhcj12YWx1ZS5peHNfcmFyO21vZGVsLm5rcz12YWx1ZS5pY287bW9kZWwubmtzX3R4dD12YWx1ZS5uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai5mbGFncy5ub0NoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaG9kbm90YTogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob2Rub3RhID0gY2hhbmdlT2JqLnZhbHVlPy5pY28hO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHBybyBFS09cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLlNpbXBsZSwgRmlsdGVyVmlld01vZGUuRGV0YWlsXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcG9PdGV2cmVuaU90ZXZyaXRQYW5lbFBvZG1pbmVrOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgcHJvIHXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiVnlobGVkYW5lUG9kbWlua3lWQmFkZ2VcIixcclxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLCAgICAgICAgLy8gQXV0b21hdGlja8OpIHZ5aGxlZMOhbsOtIHBvIHptxJtuxJsgdWxvxb5lbsOpaG9cclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiTmV2ZXJWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsQWN0aW9uQXNDaGVja2JveDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWRTaW1wbGVNb2RlOlwiaWRTaW1wbGVNb2RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmaWx0ZXJGb3JtRGVmXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIG7Em2pha8OpIGxlcMWhw60gdWtsw6FkYWPDrSBva25vIG5lYm8gYnVkdSBtdXNldCB1ZMSbbGF0IHN2b2plIGEgbmFzdGF2aXQgaG8gZG8gc2F2ZU9wdGlvbnNGb3JtP1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wiY2lzbG9cIiwgXCJua3NcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHrFr3N0YW5lIHRvaGxlIHTDqW1hIG5lYm8gYnVkZSBwcm8gTEsgamluw6kgbmXFviBwcm8gVEs/XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJhZGFfcHRtX2FkYWJhczNcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyaWN0U3RvcEF1dG9Mb2FkOiB0cnVlLCAgICAgICAgICAgICAgIC8vIFN0cmlrdG7EmyB6YWvDocW+ZSBhdXRvbWF0aWNrw6kgbmHEjXRlbsOtIGhuZWQgcG8gb3RldsWZZW7DrSBzZXpuYW11LCBvYmzDrWJlbsO9IGZpbHRyIHNlIHBvdXplIHDFmWVkcGxuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7ZGVzY3JpcHRpb259XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHBvZGxlIGZpbHRyxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJfYWtjZSA9IG9iai5maWx0ZXI7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuQWtjZVNlcnZpcy5saXN0X1ByZXBvY2V0KHsgZmlsdGVyczogdGhhdC5maWx0ZXJfYWtjZSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB0aGF0LmZpbHRlcl9ha2NlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEhLmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHsgaWNvbjogXCJnaS10aWNrXCIsIHRleHQ6IFwiUMWZZXBvxI10ZW5vXCIsIGNhcHRpb246IFwiUMWZZXBvxI10ZW5vXCIsIHRvb2x0aXA6IFwiUMWZZXBvxI10ZW5vXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4geyBpY29uOiBcImZhLWZ3XCIsIHRleHQ6IFwiXCIsIGNhcHRpb246IFwiXCIsIHRvb2x0aXA6IFwiXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDrXNsbyBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2IGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9yZ2FuaXphY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0X25rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXYgb3JnYW5pemFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBmb2N1c0Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNudC5tYWluVGFibGUuZ2dyaWQoJ2ZvY3VzJyk7IC8vIG5hc3RhdmVuw60gZm9jdXN1IG5hIGdyaWRcclxuICAgICAgICAgICAgLy8gICAgKGNudC52aWV3X0lTTCBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgIC8vfTtcclxuICAgICAgICAgICAgLy9jbnQudmlld19JU0wub24oJ2NoYW5nZS5mb2N1cycsIGZvY3VzRnVuYyk7IC8vIHDFmWkgem3Em27EmyBJU0wgdmlldyBzZSBuYXbDocW+ZSBmdW5rY2UgZm9jdXNGdW5jXHJcblxyXG4gICAgICAgICAgICB2YXIgYWtjZV9zdGFydCA9IFV0aWxzLnplcm9wYWQoXCIxXCIsIHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISk7XHJcbiAgICAgICAgICAgIHZhciBha2NlX2VuZCA9IFV0aWxzLnplcm9wYWQoXCIwXCIsIHRoYXQuZ2xvYmFscy5EZWxrYV9Ba2NlISkucmVwbGFjZSgvMC9nLCBcIjlcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQuZmlsdGVyX2FrY2UuY2lzbG8gPSB7IHN0YXJ0OiBha2NlX3N0YXJ0LCBlbmQ6IGFrY2VfZW5kIH07XHJcbiAgICAgICAgICAgIGNudC5maWx0ZXJfYWtjZS5ua3MgPSBudWxsO1xyXG4gICAgICAgICAgICBjbnQuZmlsdGVyX2FrY2UuZGF0X3ptZW5hID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGNudC5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGNudC5maWx0ZXJfYWtjZSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ba2NlU2VydmlzLmxpc3RfUHJlcG9jZXQoeyBmaWx0ZXJzOiBjbnQuZmlsdGVyX2FrY2UgfSkpO1xyXG5cclxuICAgICAgICAgICAgY250Lm1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG4vLyAgICAgICAgICAgIGNudC5ncmlkQ2hlY2tBbGwodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBGb2t1cyBuYSBzZXpuYW1tdVxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY250Lm1haW5UYWJsZS5nZ3JpZCgnZm9jdXMnKTsgLy8gbmFzdGF2ZW7DrSBmb2N1c3UgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgKGNudC52aWV3X0lTTCBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNudC52aWV3X0lTTC5vbignY2hhbmdlLmZvY3VzJywgZm9jdXNGdW5jKTsgLy8gcMWZaSB6bcSbbsSbIElTTCB2aWV3IHNlIG5hdsOhxb5lIGZ1bmtjZSBmb2N1c0Z1bmNcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGdyaWRDaGVja0FsbChjaGVja0FsbDogYm9vbGVhbikge1xyXG4gICAgICAgIC8vICAgIGlmICh0aGlzLm1haW5UYWJsZSA9PSBudWxsKVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgdmFyIGluc3RhbmNlOiBhbnkgPSB0aGlzLm1haW5UYWJsZS5nZ3JpZChcImluc3RhbmNlXCIpO1xyXG4gICAgICAgIC8vICAgIGlmIChjaGVja0FsbCA9PT0gdHJ1ZSAmJiBpbnN0YW5jZS5hY3Rpb25zICE9IG51bGwgJiYgaW5zdGFuY2UuYWN0aW9ucy5hY3RDaGVja0FsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGluc3RhbmNlLmFjdGlvbnMuYWN0Q2hlY2tBbGwucnVuKCk7ICAgICAgICAgLy8gb3puYcSNaXQgdsWhZWNobnkgxZnDoWRreVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwcmVwb2NldCgpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0b1tdID0gY250Lm1haW5UYWJsZS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxfY2l0YWMgPSAxO1xyXG4gICAgICAgICAgICAgICAgdnlicmFuZVJhZGt5LmZvckVhY2goKHIpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY250LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHDFmWVwb8SNZXQgYWtjZSBcIiArIHIuY2lzbG8sIGxfY2l0YWMsIHZ5YnJhbmVSYWRreS5sZW5ndGggKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsX2Npc2xvID0gci5jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAobF9jaXNsbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9vX3phcGlzID0geyBpbl9jaXNsbzogbF9jaXNsbyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnQuaXNsLkFrY2VTZXJ2aXMucHJlcG9jZXRfQWtjZSggbF9vX3phcGlzIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5ha3Rpdml0YSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LnZpZXdfSVNMLnVwZGF0ZURhdGEociwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeXNsZWRlayBTUEwgLSBcIiArIGxfY2lzbG8gKyBcIiAtIFwiICsgZGF0YSk7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsX2NpdGFjKys7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==