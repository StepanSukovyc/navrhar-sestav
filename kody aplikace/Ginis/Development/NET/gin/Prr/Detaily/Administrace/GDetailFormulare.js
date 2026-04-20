"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Prr;
    (function (Prr) {
        var UIWebClient;
        (function (UIWebClient) {
            var gcontent = Decorators.gcontent;
            let GDetailFormulare = class GDetailFormulare extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = { sablona: this.Sablona };
                    this.loadData(this).done(function () {
                        that.setRezim(that.Rezim, that);
                    });
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("DetailFormulare", {
                        headerForm: this.createForm(),
                        tabGroups: {
                            tabGroupTypyUdalosti: {
                                caption: "jres:25800078" //RC 25800078 : Napojení na typy událostí
                            },
                            tabGroupDeniky: {
                                caption: "jres:25800079" //RC 25800079 : Napojení na deníky
                            },
                            tabGroupSkupiny: {
                                caption: "jres:25800080" //RC 25800080 : Napojení na skupiny
                            },
                            tabGroupEmpty: {
                                caption: ""
                            }
                        },
                        tabs: {
                            tabTypyUdalostiFormulare: {
                                tabParams: {
                                    opened: true, locked: true, group: { id: "tabGroupTypyUdalosti" }, headerClass: "enableTab"
                                },
                                contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GFormularTypUdalostiControl(that, that.Mp)),
                                init: function (tab) {
                                    that.typyUdalostiFormulareTab = tab;
                                }
                            },
                            tabDenikyFormulare: {
                                tabParams: {
                                    opened: true, locked: true, group: { id: "tabGroupDeniky" }, headerClass: "enableTab"
                                },
                                //contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GFormularDenikuControl(that, that.Mp)),
                                init: function (tab) {
                                    that.denikyFormulareTab = tab;
                                }
                            },
                            tabSkupinyFormulare: {
                                tabParams: {
                                    opened: true, locked: true, group: { id: "tabGroupSkupiny" }, headerClass: "enableTab"
                                },
                                //contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GDukazDenikuControl(that, that.Mp)),
                                init: function (tab) {
                                    that.skupinyFormulareTab = tab;
                                }
                            }
                        },
                        actions: {},
                        menuBar: [
                        //{ id: "prilohy", action: "actPrilohy", favorite: true, after: "cinnosti" },
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
                    var that = this;
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25800021"; //RC 25800021 : Následující záznam<br>Název: {nazev}
                    this.detailMoveComponentPrevTemplate = "jres:25800022"; //RC 25800022 : Předchozí záznam<br>Název: {nazev}
                    this.enableFields = function (enable) {
                        this.findFields(".enabled").gfield("option", "disabled", !enable);
                        this.findFields(".enabled_new").gfield("option", "disabled", !enable || this.Rezim == 3 /* Gin.Interface.RegSpa.GRezimContentu.Editace */);
                        var gTabManager = that.find(".gtabmanager");
                        gTabManager.gtabmanager("visibleGroup", "tabGroupTypyUdalosti", !enable);
                        gTabManager.gtabmanager("visibleGroup", "tabGroupDeniky", !enable);
                        gTabManager.gtabmanager("visibleGroup", "tabGroupSkupiny", !enable);
                        gTabManager.gtabmanager("visibleGroup", "tabGroupEmpty", enable);
                        if (that.Rezim != 1 /* Gin.Interface.RegSpa.GRezimContentu.View */)
                            gTabManager.gtabmanager("setActive", "tabGroupEmpty");
                        else if (gTabManager.gtabmanager("getActive") == "tabGroupEmpty")
                            gTabManager.gtabmanager("setActive", "tabGroupTypyUdalosti");
                        //if (enable) gTabManager.hide();
                        //else gTabManager.show();
                    };
                    this.enableActions = function (enable) {
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                    };
                    this.afterLoadData = function (content) {
                        console.log("afterLoadData");
                        var prom = $.Deferred();
                        if (this.readOnly) {
                            this.element.on("gtabmanageropen", function (ev, ctx) {
                                console.log("gtabmanageropen");
                                tabChange(ctx.id);
                            });
                            if (this.typyUdalostiFormulareTab) {
                                const tabCnt = $.content(this.typyUdalostiFormulareTab);
                                tabCnt.loadedData = false;
                            }
                            //if (this.denikyFormulareTab) {
                            //    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.denikyFormulareTab);
                            //    tabCnt.loadedData = false;
                            //}
                            //if (this.skupinyFormulareTab) {
                            //    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.skupinyFormulareTab);
                            //    tabCnt.loadedData = false;
                            //}
                            var gTabManager = that.find(".gtabmanager");
                            var active = gTabManager.gtabmanager("getActive");
                            if (active != null)
                                tabChange(active);
                        }
                        return prom;
                    };
                    var tabChange = function (idTab) {
                        switch (idTab) {
                            case "tabGroupTypyUdalosti":
                                if (that.typyUdalostiFormulareTab) {
                                    const tabCnt = $.content(that.typyUdalostiFormulareTab);
                                    if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                                        tabCnt.reloadData();
                                    }
                                }
                                break;
                            //case "tabGroupDeniky":
                            //    if (that.denikyFormulareTab) {
                            //        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.denikyFormulareTab);
                            //        if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                            //            tabCnt.reloadData();
                            //        }
                            //    }
                            //    break;
                            //case "tabGroupSkupiny":
                            //    if (that.skupinyFormulareTab) {
                            //        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.skupinyFormulareTab);
                            //        if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                            //            tabCnt.reloadData();
                            //        }
                            //    }
                            //    break;
                        }
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" }) //RC 25800013 : Hlavička
                        .addSection()
                        .addRow("jres:25800081") //RC 25800081 : Typ šablony
                        .addField("gradio", {
                        name: "s_frm",
                        initialValue: 0,
                        customClass: "enabled_new",
                        disabled: this.readOnly,
                        modelOptions: { setFlags: { triggerChange: true } },
                        change: function (ev, changeObj) {
                            if (changeObj.value == 2) {
                                $(this).gform().findFields("sablona").gformrow().show();
                                $(this).gform().findFields("sablona_txt").gformrow().hide();
                                $(this).gform().findFields("sablona_frm").gformrow().hide();
                            }
                            else if (changeObj.value == 1) {
                                $(this).gform().findFields("sablona").gformrow().hide();
                                $(this).gform().findFields("sablona_txt").gformrow().hide();
                                $(this).gform().findFields("sablona_frm").gformrow().show();
                            }
                            else {
                                $(this).gform().findFields("sablona").gformrow().hide();
                                $(this).gform().findFields("sablona_txt").gformrow().show();
                                $(this).gform().findFields("sablona_frm").gformrow().hide();
                            }
                        },
                        radios: [
                            { value: 0, label: "jres:25800082" }, //RC 25800082 : Word
                            { value: 2, label: "jres:25800083" }, //RC 25800083 : Gordic generátor
                            { value: 1, label: "jres:25800088", disabled: true }
                        ] //RC 25800088 : Gordic generátor (filtr FRM)
                    }).addRow("jres:25800084", true) //RC 25800084 : Šablona
                        .addField("gselectbox", Gordic.Prefabs.Select.prrGinsfrm(), {
                        name: "sablona", model: "model.sablona = value.ixs_frm", customClass: "enabled_new", disabled: this.readOnly, serverFilters: { aktivita: 100, filtr_frm: "" }
                    })
                        .addRow("jres:25800085", true) //RC 25800085 : Název na HDD
                        .addField("gstringbox", { name: "sablona_txt", customClass: "enabled_new", disabled: this.readOnly })
                        .addRow("jres:25800087", true) //RC 25800087 : Šablona (filtr FRM)
                        .addField("gstringbox", { name: "sablona_frm", customClass: "enabled_new", disabled: this.readOnly })
                        .addRow()
                        .addField("gcheck", "w-5 w-L-4", { label: "jres:25800090", name: "pdf", customClass: "enabled", disabled: this.readOnly }) //RC 25800090 : Převádět do PDF
                        .addField("gcheck", "w-7 w-L-8", { label: "jres:25800091", name: "podpis", customClass: "enabled", disabled: this.readOnly }) //RC 25800091 : Podepsat
                        .addRow("jres:25800086", true) //RC 25800086 : Dokument (název)
                        .addField("gstringbox", { name: "nazev", customClass: "enabled", disabled: this.readOnly, rows: 5 })
                        .addRow("jres:25800089", true) //RC 25800089 : Název SSL
                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), { serverFilters: { typ_ag: 410 }, name: "ixs_typ", customClass: "enabled", model: "model.ixs_typ=value.ixs_typ, model.ktg_typ=value.ktg_typ", disabled: this.readOnly, dropdown: true })
                        .addRow("jres:25800025") //RC 25800025 : Aktivita
                        .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly, dropdown: true })
                        .addRow()
                        .addField("gcheck", "w-5 w-L-4", { label: "jres:25800092", name: "obecny", customClass: "enabled", disabled: this.readOnly }) //RC 25800092 : Pro všechny události
                        .addField("gcheck", "w-7 w-L-8", { label: "jres:25800093", name: "vse_den", customClass: "enabled", disabled: this.readOnly }); //RC 25800093 : Pro všechny deníky
                    return form;
                }
            };
            GDetailFormulare = __decorate([
                gcontent
            ], GDetailFormulare);
            UIWebClient.GDetailFormulare = GDetailFormulare;
        })(UIWebClient = Prr.UIWebClient || (Prr.UIWebClient = {}));
    })(Prr = Gordic.Prr || (Gordic.Prr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbEZvcm11bGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxGb3JtdWxhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtRZjtBQWxRRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrUW5CO0lBbFFnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0FrUS9CO1FBbFFvQixXQUFBLFdBQVc7WUFDNUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUtuQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEscUJBT3JDO2dCQVVHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssMkRBQW1EO3dCQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUVsSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFBLENBQUM7Z0JBRUY7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxpQkFBaUIsRUFBRTt3QkFDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQzdCLFNBQVMsRUFDVDs0QkFDSSxvQkFBb0IsRUFDcEI7Z0NBQ0ksT0FBTyxFQUFFLGVBQWUsQ0FBQyx5Q0FBeUM7NkJBQ3JF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QUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBLG9DQUFvQzt5QkFDaEssUUFBUSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQSxrQ0FBa0M7b0JBQ3JLLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0osQ0FBQTtZQTNQWSxnQkFBZ0I7Z0JBRDVCLFFBQVE7ZUFDSSxnQkFBZ0IsQ0EyUDVCO1lBM1BZLDRCQUFnQixtQkEyUDVCLENBQUE7UUFDTCxDQUFDLEVBbFFvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFrUS9CO0lBQUQsQ0FBQyxFQWxRZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa1FuQjtBQUFELENBQUMsRUFsUVMsTUFBTSxLQUFOLE1BQU0sUUFrUWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlByci5VSVdlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuXHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbEZvcm11bGFyZSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxcclxuICAgIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnMgJlxyXG4gICAgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucz4+ICZcclxuICAgIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFDb21wb25lbnRFeHRlbnNpb25zICZcclxuICAgIFRoaXNUeXBlPEdDb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFDb21wb25lbnRFeHRlbnNpb25zPj4gJlxyXG4gICAgR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdEZXRhaWxNb3ZlQ29tcG9uZW50RXh0ZW5zaW9ucyAmXHJcbiAgICBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0RldGFpbE1vdmVDb21wb25lbnRFeHRlbnNpb25zPj5cclxuICAgID4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIFNhYmxvbmE/OiBzdHJpbmc7XHJcbiAgICAgICAgR3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBNcDogYm9vbGVhbjtcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuXHJcbiAgICAgICAgdHlweVVkYWxvc3RpRm9ybXVsYXJlVGFiOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIGRlbmlreUZvcm11bGFyZVRhYjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBza3VwaW55Rm9ybXVsYXJlVGFiOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlJlemltID0gdGhpcy5SZXppbURldGFpbHU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3KSB0aGlzLm9yaWdpbmFsTW9kZWwgPSB7IHNhYmxvbmE6IHRoaXMuU2FibG9uYSB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0UmV6aW0odGhhdC5SZXppbSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiRGV0YWlsRm9ybXVsYXJlXCIsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlckZvcm06IHRoaXMuY3JlYXRlRm9ybSgpLFxyXG4gICAgICAgICAgICAgICAgdGFiR3JvdXBzOlxyXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0YWJHcm91cFR5cHlVZGFsb3N0aTpcclxuICAgICAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDA3OFwiIC8vUkMgMjU4MDAwNzggOiBOYXBvamVuw60gbmEgdHlweSB1ZMOhbG9zdMOtXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJHcm91cERlbmlreTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTgwMDA3OVwiIC8vUkMgMjU4MDAwNzkgOiBOYXBvamVuw60gbmEgZGVuw61reVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiR3JvdXBTa3VwaW55OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDgwXCIgLy9SQyAyNTgwMDA4MCA6IE5hcG9qZW7DrSBuYSBza3VwaW55XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJHcm91cEVtcHR5OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlR5cHlVZGFsb3N0aUZvcm11bGFyZTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsIGdyb3VwOiB7IGlkOiBcInRhYkdyb3VwVHlweVVkYWxvc3RpXCIgfSwgaGVhZGVyQ2xhc3M6IFwiZW5hYmxlVGFiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50UGFyYW1zOiBHQ29udGVudC5jcmVhdGVJbml0aWFsaXplcihHb3JkaWMuUHJyLlVJV2ViQ2xpZW50LkdGb3JtdWxhclR5cFVkYWxvc3RpQ29udHJvbCh0aGF0LCB0aGF0Lk1wKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHlweVVkYWxvc3RpRm9ybXVsYXJlVGFiID0gdGFiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJEZW5pa3lGb3JtdWxhcmU6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLCBncm91cDogeyBpZDogXCJ0YWJHcm91cERlbmlreVwiIH0sIGhlYWRlckNsYXNzOiBcImVuYWJsZVRhYlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudFBhcmFtczogR0NvbnRlbnQuY3JlYXRlSW5pdGlhbGl6ZXIoR29yZGljLlByci5VSVdlYkNsaWVudC5HRm9ybXVsYXJEZW5pa3VDb250cm9sKHRoYXQsIHRoYXQuTXApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZW5pa3lGb3JtdWxhcmVUYWIgPSB0YWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlNrdXBpbnlGb3JtdWxhcmU6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLCBncm91cDogeyBpZDogXCJ0YWJHcm91cFNrdXBpbnlcIiB9LCBoZWFkZXJDbGFzczogXCJlbmFibGVUYWJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnRQYXJhbXM6IEdDb250ZW50LmNyZWF0ZUluaXRpYWxpemVyKEdvcmRpYy5QcnIuVUlXZWJDbGllbnQuR0R1a2F6RGVuaWt1Q29udHJvbCh0aGF0LCB0aGF0Lk1wKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2t1cGlueUZvcm11bGFyZVRhYiA9IHRhYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAvL3sgaWQ6IFwicHJpbG9oeVwiLCBhY3Rpb246IFwiYWN0UHJpbG9oeVwiLCBmYXZvcml0ZTogdHJ1ZSwgYWZ0ZXI6IFwiY2lubm9zdGlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5rY2UgZGV0YWlsYnVpbGRlcnUsIHNwdcWhdMSbbsOhIHBvIG1lcmdlIGtvbXBvbmVudFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTW92ZUNvbXBvbmVudEdyaWRSYyA9IHRoaXMuR3JpZFJjITtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50TmV4dFRlbXBsYXRlID0gXCJqcmVzOjI1ODAwMDIxXCI7IC8vUkMgMjU4MDAwMjEgOiBOw6FzbGVkdWrDrWPDrSB6w6F6bmFtPGJyPk7DoXpldjoge25hemV2fVxyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnRQcmV2VGVtcGxhdGUgPSBcImpyZXM6MjU4MDAwMjJcIjsgLy9SQyAyNTgwMDAyMiA6IFDFmWVkY2hvesOtIHrDoXpuYW08YnI+TsOhemV2OiB7bmF6ZXZ9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCIuZW5hYmxlZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCIuZW5hYmxlZF9uZXdcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZSB8fCB0aGlzLlJlemltID09IEdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LkVkaXRhY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBnVGFiTWFuYWdlciA9IHRoYXQuZmluZChcIi5ndGFibWFuYWdlclwiKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwidmlzaWJsZUdyb3VwXCIsIFwidGFiR3JvdXBUeXB5VWRhbG9zdGlcIiwgIWVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICBnVGFiTWFuYWdlci5ndGFibWFuYWdlcihcInZpc2libGVHcm91cFwiLCBcInRhYkdyb3VwRGVuaWt5XCIsICFlbmFibGUpOyBcclxuICAgICAgICAgICAgICAgIGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwidmlzaWJsZUdyb3VwXCIsIFwidGFiR3JvdXBTa3VwaW55XCIsICFlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgZ1RhYk1hbmFnZXIuZ3RhYm1hbmFnZXIoXCJ2aXNpYmxlR3JvdXBcIiwgXCJ0YWJHcm91cEVtcHR5XCIsIGVuYWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuUmV6aW0gIT0gR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUuVmlldykgZ1RhYk1hbmFnZXIuZ3RhYm1hbmFnZXIoXCJzZXRBY3RpdmVcIiwgXCJ0YWJHcm91cEVtcHR5XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZ1RhYk1hbmFnZXIuZ3RhYm1hbmFnZXIoXCJnZXRBY3RpdmVcIikgPT0gXCJ0YWJHcm91cEVtcHR5XCIpIGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwic2V0QWN0aXZlXCIsIFwidGFiR3JvdXBUeXB5VWRhbG9zdGlcIik7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9pZiAoZW5hYmxlKSBnVGFiTWFuYWdlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAvL2Vsc2UgZ1RhYk1hbmFnZXIuc2hvdygpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zID0gZnVuY3Rpb24gKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsTW92ZUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJMb2FkRGF0YSA9IGZ1bmN0aW9uIChjb250ZW50OiBHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnMpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZnRlckxvYWREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb20gPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWRPbmx5KSB7ICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9uKFwiZ3RhYm1hbmFnZXJvcGVuXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImd0YWJtYW5hZ2Vyb3BlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiQ2hhbmdlKGN0eC5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXB5VWRhbG9zdGlGb3JtdWxhcmVUYWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFiQ250ID0gJC5jb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2w+KHRoaXMudHlweVVkYWxvc3RpRm9ybXVsYXJlVGFiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiQ250LmxvYWRlZERhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhpcy5kZW5pa3lGb3JtdWxhcmVUYWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zdCB0YWJDbnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGhpcy5kZW5pa3lGb3JtdWxhcmVUYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRhYkNudC5sb2FkZWREYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhpcy5za3VwaW55Rm9ybXVsYXJlVGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc3QgdGFiQ250ID0gJC5jb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HU3ViTGlzdENvbnRyb2w+KHRoaXMuc2t1cGlueUZvcm11bGFyZVRhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGFiQ250LmxvYWRlZERhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ1RhYk1hbmFnZXIgPSB0aGF0LmZpbmQoXCIuZ3RhYm1hbmFnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwiZ2V0QWN0aXZlXCIpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSAhPSBudWxsKSB0YWJDaGFuZ2UoYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGFiQ2hhbmdlID0gZnVuY3Rpb24gKGlkVGFiOiBzdHJpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWRUYWIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGFiR3JvdXBUeXB5VWRhbG9zdGlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudHlweVVkYWxvc3RpRm9ybXVsYXJlVGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJDbnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGhhdC50eXB5VWRhbG9zdGlGb3JtdWxhcmVUYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodGFiQ250LnJlbG9hZERhdGEpID09PSBcImZ1bmN0aW9uXCIgJiYgIXRhYkNudC5sb2FkZWREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiQ250LnJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL2Nhc2UgXCJ0YWJHcm91cERlbmlreVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LmRlbmlreUZvcm11bGFyZVRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zdCB0YWJDbnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGhhdC5kZW5pa3lGb3JtdWxhcmVUYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodHlwZW9mICh0YWJDbnQucmVsb2FkRGF0YSkgPT09IFwiZnVuY3Rpb25cIiAmJiAhdGFiQ250LmxvYWRlZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRhYkNudC5yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYXNlIFwidGFiR3JvdXBTa3VwaW55XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHRoYXQuc2t1cGlueUZvcm11bGFyZVRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zdCB0YWJDbnQgPSAkLmNvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdTdWJMaXN0Q29udHJvbD4odGhhdC5za3VwaW55Rm9ybXVsYXJlVGFiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHR5cGVvZiAodGFiQ250LnJlbG9hZERhdGEpID09PSBcImZ1bmN0aW9uXCIgJiYgIXRhYkNudC5sb2FkZWREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0YWJDbnQucmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVGb3JtKCk6IFwiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0yLTEwLTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pLy9SQyAyNTgwMDAxMyA6IEhsYXZpxI1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwODFcIikgLy9SQyAyNTgwMDA4MSA6IFR5cCDFoWFibG9ueVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfZnJtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxPcHRpb25zOiB7IHNldEZsYWdzOiB7IHRyaWdnZXJDaGFuZ2U6IHRydWUgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInNhYmxvbmFcIikuZ2Zvcm1yb3coKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInNhYmxvbmFfdHh0XCIpLmdmb3Jtcm93KCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzYWJsb25hX2ZybVwiKS5nZm9ybXJvdygpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2VPYmoudmFsdWUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzYWJsb25hXCIpLmdmb3Jtcm93KCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzYWJsb25hX3R4dFwiKS5nZm9ybXJvdygpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwic2FibG9uYV9mcm1cIikuZ2Zvcm1yb3coKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInNhYmxvbmFcIikuZ2Zvcm1yb3coKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcInNhYmxvbmFfdHh0XCIpLmdmb3Jtcm93KCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzYWJsb25hX2ZybVwiKS5nZm9ybXJvdygpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBcImpyZXM6MjU4MDAwODJcIiB9LCAvL1JDIDI1ODAwMDgyIDogV29yZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAyLCBsYWJlbDogXCJqcmVzOjI1ODAwMDgzXCIgfSwgLy9SQyAyNTgwMDA4MyA6IEdvcmRpYyBnZW5lcsOhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiBcImpyZXM6MjU4MDAwODhcIiwgZGlzYWJsZWQ6IHRydWUgfV0gLy9SQyAyNTgwMDA4OCA6IEdvcmRpYyBnZW5lcsOhdG9yIChmaWx0ciBGUk0pXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRSb3coXCJqcmVzOjI1ODAwMDg0XCIsIHRydWUpIC8vUkMgMjU4MDAwODQgOiDFoGFibG9uYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucHJyR2luc2ZybSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYWJsb25hXCIsIG1vZGVsOiBcIm1vZGVsLnNhYmxvbmEgPSB2YWx1ZS5peHNfZnJtXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRfbmV3XCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LCBzZXJ2ZXJGaWx0ZXJzOiB7IGFrdGl2aXRhOiAxMDAsIGZpbHRyX2ZybTogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwODVcIiwgdHJ1ZSkgLy9SQyAyNTgwMDA4NSA6IE7DoXpldiBuYSBIRERcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInNhYmxvbmFfdHh0XCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRfbmV3XCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTgwMDA4N1wiLCB0cnVlKSAvL1JDIDI1ODAwMDg3IDogxaBhYmxvbmEgKGZpbHRyIEZSTSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInNhYmxvbmFfZnJtXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRfbmV3XCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNSB3LUwtNFwiLCB7IGxhYmVsOiBcImpyZXM6MjU4MDAwOTBcIiwgbmFtZTogXCJwZGZcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB9KS8vUkMgMjU4MDAwOTAgOiBQxZlldsOhZMSbdCBkbyBQREZcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNyB3LUwtOFwiLCB7IGxhYmVsOiBcImpyZXM6MjU4MDAwOTFcIiwgbmFtZTogXCJwb2RwaXNcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB9KS8vUkMgMjU4MDAwOTEgOiBQb2RlcHNhdFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU4MDAwODZcIiwgdHJ1ZSkgLy9SQyAyNTgwMDA4NiA6IERva3VtZW50IChuw6F6ZXYpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJuYXpldlwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5LCByb3dzOiA1IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTgwMDA4OVwiLCB0cnVlKSAvL1JDIDI1ODAwMDg5IDogTsOhemV2IFNTTFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3R5cCgpLCB7IHNlcnZlckZpbHRlcnM6IHsgdHlwX2FnOiA0MTAgfSwgbmFtZTogXCJpeHNfdHlwXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgbW9kZWw6IFwibW9kZWwuaXhzX3R5cD12YWx1ZS5peHNfdHlwLCBtb2RlbC5rdGdfdHlwPXZhbHVlLmt0Z190eXBcIiwgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksIGRyb3Bkb3duOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTgwMDAyNVwiKSAvL1JDIDI1ODAwMDI1IDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNha3QoKSwgeyBuYW1lOiBcImFrdGl2aXRhXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgbW9kZWw6IFwibW9kZWwuYWt0aXZpdGE9dmFsdWUuYWt0aXZpdGFcIiwgZGlzYWJsZWQ6IHRoaXMucmVhZE9ubHksIGRyb3Bkb3duOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNSB3LUwtNFwiLCB7IGxhYmVsOiBcImpyZXM6MjU4MDAwOTJcIiwgbmFtZTogXCJvYmVjbnlcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCBkaXNhYmxlZDogdGhpcy5yZWFkT25seSB9KS8vUkMgMjU4MDAwOTIgOiBQcm8gdsWhZWNobnkgdWTDoWxvc3RpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTcgdy1MLThcIiwgeyBsYWJlbDogXCJqcmVzOjI1ODAwMDkzXCIsIG5hbWU6IFwidnNlX2RlblwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIGRpc2FibGVkOiB0aGlzLnJlYWRPbmx5IH0pOy8vUkMgMjU4MDAwOTMgOiBQcm8gdsWhZWNobnkgZGVuw61reVxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=