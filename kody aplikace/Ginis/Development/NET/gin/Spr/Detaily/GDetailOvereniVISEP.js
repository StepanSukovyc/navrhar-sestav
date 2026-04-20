"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            /**
             * GDetail
             *
             * @author Petr Dytrich
             */
            let GDetailOvereniVISEP = class GDetailOvereniVISEP extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        //defaultAction: that.actions.actDetail,
                        columns: this.createGridFormat(),
                        searchColumns: ["ixp_spis"],
                        //selection: function (ev, info) {
                        //    that.actions.actDetail!.enabled(info.count != 0);
                        //},
                    });
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.grid.ggrid("setData", that.model.prestupky);
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("overeniVISEPDetail", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        actions: {
                            actZobrazitDokument: {
                                caption: "jres:25200310", //RC 25200310 : Zobrazit dokument
                                tooltip: "jres:25200313", //RC 25200313 : Zobrazit PDF dokument s obsahem ověření.
                                run: function (ev, obj) {
                                    that.call("GetIxbISEPDokumentu", { IxpUkon: that.model.ixp_ukon, IxsEsu: that.model.ixs_esu, ZpravaIsep: that.model.zpravaIsep }).done(function (Ixb) {
                                        var options = {
                                            IsFavorite: false, // zkusil jsem true i false, zobrazi to stejne //rowData.p_obraz == 1,
                                            Ixp: that.model.ixp_ukon,
                                            File: {
                                                Ixb: Ixb
                                            }
                                        };
                                        Gordic.Wfl.AttachmentUtils.OpenAttachment(that, options, false, false, false).done(function (args) {
                                            // console.log("doc.downloadCompleted", this, args);
                                        });
                                    });
                                }
                            },
                            actVlozitDoSpisu: {
                                caption: "jres:25200311", //RC 25200311 : Vložit do spisu
                                tooltip: "jres:25200312", //RC 25200312 : Vložit PDF dokument s ověřením do spisu.
                                run: function (ev, obj) {
                                    console.log("actVlozitDoSpisu");
                                    var options = {
                                        TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                        TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                                        ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremUsuGenPid
                                    };
                                    console.log("GenerovaniIxp");
                                    Gordic.Wfl.Dialogs.GenerovaniIxp(that, options, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (rv, cont) {
                                        console.log("rv...");
                                        console.log(rv);
                                        if (rv) {
                                            if (rv.IxpExist === false) {
                                                console.log("VlozitISEPDokDoSpisu");
                                                that.call("VlozitISEPDokDoSpisu", {
                                                    IxpSpis: that.model.ixp_spis,
                                                    IxpUkon: that.model.ixp_ukon,
                                                    IxsEsu: that.model.ixs_esu,
                                                    IxpIsepDok: rv.Ixp,
                                                    ZpravaIsep: that.model.zpravaIsep
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        },
                        menuBar: [
                            { id: "menuZobrazitDokument", action: "actZobrazitDokument", favorite: true },
                            { id: "menuVlozitDoSpisu", action: "actVlozitDoSpisu", favorite: true },
                            { action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent())), favorite: true } // Zavřít
                        ]
                    }, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var l_sLD = "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0";
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        .addSection({ customClass: "SectionNoPaddingBottom" })
                        .addRow("jres:25200305") //RC 25200305 : Jméno
                        .addField("gstringbox", { name: "jmeno", model: "model.subjekt.jmeno = value", disabled: true })
                        .addSection({ customClass: "SectionNoPaddingBottom" })
                        .addRow("jres:25200306") //RC 25200306 : Příjmení
                        .addField("gstringbox", { name: "prijmeni", model: "model.subjekt.prijmeni = value", disabled: true })
                        .addSection({ customClass: "SectionNoPaddingBottom" })
                        .addRow("jres:25200307") //RC 25200307 : Rodné příjmení
                        .addField("gstringbox", { name: "rodne_prijmeni", model: "model.subjekt.rodne_prijmeni = value", disabled: true })
                        .addSection({ customClass: "SectionNoPaddingBottom" })
                        .addRow("jres:25200308") //RC 25200308 : Datum narození
                        .addField("gstringbox", { name: "datum_narozeni", model: "model.subjekt.datum_narozeni = value", disabled: true })
                        .addSection({ customClass: "SectionNoPaddingBottom" })
                        .addRow("jres:25200309") //RC 25200309 : Místo narození
                        .addField("gstringbox", { name: "mist_nar_txt", model: "model.subjekt.mist_nar_txt = value", disabled: true })
                        .addSection({ customClass: "SectionNoPaddingBottom" });
                    return form;
                }
                //this.m_oStavPlatbyDdp = new GAction({
                //     name: "actStavPlatbyDdp",
                //     caption: "jres:25200155", //RC 25200155 : Přepočet stavu
                //     tooltip: "jres:25200155", //RC 25200155 : Přepočet stavu
                //     run: function (ev, obj) {
                //     }
                // });
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "prestupek_txt",
                        caption: "jres:25200300", //RC 25200300 : Přestupek
                        width: 300,
                        fixedWidth: false,
                    })
                        .addTextColumn({
                        name: "sankce",
                        caption: "jres:25200301", //RC 25200301 : Sankce
                        width: 200,
                        fixedWidth: false,
                    })
                        .addTextColumn({
                        name: "typ_zav_txt",
                        caption: "jres:25200302", //RC 25200302 : Typ zavinění
                        width: 160,
                        fixedWidth: false,
                    })
                        .addTextColumn({
                        name: "org_oznaceni",
                        caption: "jres:25200303", //RC 25200303 : OVM
                        width: 200,
                        fixedWidth: false,
                    })
                        .addTextColumn({
                        name: "org_sidlo",
                        caption: "jres:25200304", //RC 25200304 : OVM - sídlo
                        width: 160,
                        fixedWidth: false,
                    });
                }
            };
            GDetailOvereniVISEP = __decorate([
                gcontent
            ], GDetailOvereniVISEP);
            WebApp.GDetailOvereniVISEP = GDetailOvereniVISEP;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbE92ZXJlbmlWSVNFUC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxPdmVyZW5pVklTRVAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTZMZjtBQTdMRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2TG5CO0lBN0xnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0E2TDFCO1FBN0xvQixXQUFBLE1BQU07WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7OztlQUlHO1lBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLHFCQUFxQjtnQkFJMUQsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxJQUFJO3lCQUNKLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQix3Q0FBd0M7d0JBQ3hDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ2hDLGFBQWEsRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDM0Isa0NBQWtDO3dCQUNsQyx1REFBdUQ7d0JBQ3ZELElBQUk7cUJBQ1AsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7b0JBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dC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LEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsVUFBVSxFQUFFLEtBQUs7cUJBQ3BCLENBQUMsQ0FDRDtnQkFDVCxDQUFDO2FBR0osQ0FBQTtZQW5MWSxtQkFBbUI7Z0JBRC9CLFFBQVE7ZUFDSSxtQkFBbUIsQ0FtTC9CO1lBbkxZLDBCQUFtQixzQkFtTC9CLENBQUE7UUFDTCxDQUFDLEVBN0xvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUE2TDFCO0lBQUQsQ0FBQyxFQTdMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNkxuQjtBQUFELENBQUMsRUE3TFMsTUFBTSxLQUFOLE1BQU0sUUE2TGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdEZXRhaWxcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBQZXRyIER5dHJpY2hcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbE92ZXJlbmlWSVNFUCBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgbW9kZWw6IGFueTtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1tdWpHcmlkJz5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJpeHBfc3Bpc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZChpbmZvLmNvdW50ICE9IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0Lm1vZGVsLnByZXN0dXBreSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwib3ZlcmVuaVZJU0VQRGV0YWlsXCIsIHtcclxuICAgICAgICAgICAgICAgIHRhYnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWmFrbGFkbmk6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Wm9icmF6aXREb2t1bWVudDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAzMTBcIiwgLy9SQyAyNTIwMDMxMCA6IFpvYnJheml0IGRva3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNTIwMDMxM1wiLCAvL1JDIDI1MjAwMzEzIDogWm9icmF6aXQgUERGIGRva3VtZW50IHMgb2JzYWhlbSBvdsSbxZllbsOtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJHZXRJeGJJU0VQRG9rdW1lbnR1XCIsIHsgSXhwVWtvbjogdGhhdC5tb2RlbC5peHBfdWtvbiwgSXhzRXN1OiB0aGF0Lm1vZGVsLml4c19lc3UsIFpwcmF2YUlzZXA6IHRoYXQubW9kZWwuenByYXZhSXNlcCB9KS5kb25lKGZ1bmN0aW9uIChJeGIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXNGYXZvcml0ZTogZmFsc2UsIC8vIHprdXNpbCBqc2VtIHRydWUgaSBmYWxzZSwgem9icmF6aSB0byBzdGVqbmUgLy9yb3dEYXRhLnBfb2JyYXogPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lm1vZGVsLml4cF91a29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeGI6IEl4YlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkF0dGFjaG1lbnRVdGlscy5PcGVuQXR0YWNobWVudCh0aGF0LCBvcHRpb25zLCBmYWxzZSwgZmFsc2UsIGZhbHNlKS5kb25lKGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZG9jLmRvd25sb2FkQ29tcGxldGVkXCIsIHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZsb3ppdERvU3Bpc3U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMzExXCIsIC8vUkMgMjUyMDAzMTEgOiBWbG/Fvml0IGRvIHNwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNTIwMDMxMlwiLCAvL1JDIDI1MjAwMzEyIDogVmxvxb5pdCBQREYgZG9rdW1lbnQgcyBvdsSbxZllbsOtbSBkbyBzcGlzdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RWbG96aXREb1NwaXN1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwRG9rOiBHb3JkaWMuV2ZsLkdsb2JhbHMuRW51bXMuVHlwRG9rLlZsYXN0bmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwSWQ6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWnB1c29iR2VuZXJvdmFuaTogR29yZGljLldmbC5HbG9iYWxzLkVudW1zLlpwdXNvYkdlbmVyb3ZhbmlJeHAuUGFyYW1ldHJlbVVzdUdlblBpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2VuZXJvdmFuaUl4cFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5HZW5lcm92YW5pSXhwKHRoYXQsIG9wdGlvbnMsIEdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdykuZG9uZShmdW5jdGlvbiAocnYsIGNvbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJ2Li4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJ2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ2Lkl4cEV4aXN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWbG96aXRJU0VQRG9rRG9TcGlzdVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIlZsb3ppdElTRVBEb2tEb1NwaXN1XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBTcGlzOiB0aGF0Lm1vZGVsLml4cF9zcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFVrb246IHRoYXQubW9kZWwuaXhwX3Vrb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzRXN1OiB0aGF0Lm1vZGVsLml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwSXNlcERvazogcnYuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFpwcmF2YUlzZXA6IHRoYXQubW9kZWwuenByYXZhSXNlcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJtZW51Wm9icmF6aXREb2t1bWVudFwiLCBhY3Rpb246IFwiYWN0Wm9icmF6aXREb2t1bWVudFwiLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVZsb3ppdERvU3Bpc3VcIiwgYWN0aW9uOiBcImFjdFZsb3ppdERvU3Bpc3VcIiwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbihHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSkpLCBmYXZvcml0ZTogdHJ1ZSB9ICAgLy8gWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGRldGFpbGJ1aWxkZXJ1LCBzcHXFoXTEm27DoSBwbyBtZXJnZSBrb21wb25lbnRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlRm9ybSgpOiBcIik7XHJcbiAgICAgICAgICAgIHZhciBsX3NMRCA9IFwiTDJNMlMxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtNC04LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcIlNlY3Rpb25Ob1BhZGRpbmdCb3R0b21cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAzMDVcIikgIC8vUkMgMjUyMDAzMDUgOiBKbcOpbm9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImptZW5vXCIsIG1vZGVsOiBcIm1vZGVsLnN1Ympla3Quam1lbm8gPSB2YWx1ZVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJTZWN0aW9uTm9QYWRkaW5nQm90dG9tXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMzA2XCIpIC8vUkMgMjUyMDAzMDYgOiBQxZnDrWptZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicHJpam1lbmlcIiwgbW9kZWw6IFwibW9kZWwuc3ViamVrdC5wcmlqbWVuaSA9IHZhbHVlXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcIlNlY3Rpb25Ob1BhZGRpbmdCb3R0b21cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAzMDdcIikgLy9SQyAyNTIwMDMwNyA6IFJvZG7DqSBwxZnDrWptZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicm9kbmVfcHJpam1lbmlcIiwgbW9kZWw6IFwibW9kZWwuc3ViamVrdC5yb2RuZV9wcmlqbWVuaSA9IHZhbHVlXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcIlNlY3Rpb25Ob1BhZGRpbmdCb3R0b21cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAzMDhcIikgLy9SQyAyNTIwMDMwOCA6IERhdHVtIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZGF0dW1fbmFyb3plbmlcIiwgbW9kZWw6IFwibW9kZWwuc3ViamVrdC5kYXR1bV9uYXJvemVuaSA9IHZhbHVlXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcIlNlY3Rpb25Ob1BhZGRpbmdCb3R0b21cIn0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDMwOVwiKSAvL1JDIDI1MjAwMzA5IDogTcOtc3RvIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwibWlzdF9uYXJfdHh0XCIsIG1vZGVsOiBcIm1vZGVsLnN1Ympla3QubWlzdF9uYXJfdHh0ID0gdmFsdWVcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwiU2VjdGlvbk5vUGFkZGluZ0JvdHRvbVwiIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgLy90aGlzLm1fb1N0YXZQbGF0YnlEZHAgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgLy8gICAgIG5hbWU6IFwiYWN0U3RhdlBsYXRieURkcFwiLFxyXG4gICAgICAgICAgIC8vICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxNTVcIiwgLy9SQyAyNTIwMDE1NSA6IFDFmWVwb8SNZXQgc3RhdnVcclxuICAgICAgICAgICAvLyAgICAgdG9vbHRpcDogXCJqcmVzOjI1MjAwMTU1XCIsIC8vUkMgMjUyMDAxNTUgOiBQxZllcG/EjWV0IHN0YXZ1XHJcbiAgICAgICAgICAgLy8gICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZXN0dXBla190eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAzMDBcIiwgLy9SQyAyNTIwMDMwMCA6IFDFmWVzdHVwZWtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNhbmtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDMwMVwiLCAvL1JDIDI1MjAwMzAxIDogU2Fua2NlXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfemF2X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDMwMlwiLCAvL1JDIDI1MjAwMzAyIDogVHlwIHphdmluxJtuw61cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9yZ19vem5hY2VuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDMwM1wiLCAvL1JDIDI1MjAwMzAzIDogT1ZNXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcmdfc2lkbG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAzMDRcIiwgLy9SQyAyNTIwMDMwNCA6IE9WTSAtIHPDrWRsb1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59Il19