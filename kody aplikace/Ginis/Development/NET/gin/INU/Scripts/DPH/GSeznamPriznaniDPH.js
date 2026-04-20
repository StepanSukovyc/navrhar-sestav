"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSeznamPriznaniDPH = class GSeznamPriznaniDPH extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * Globalni nastaveni
                     * */
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                //private currentRow: Gordic.Inu.Interface.GSeznamPriznaniDPHDto;
                onContentReady() {
                    var that = this;
                    //nastavení akcí
                    this.createActions(that);
                    //console.log("data: ", this.model)
                    //            $.extend(this.model_akt, this.model );
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNovy*", "actProhlizeni*", "actKontrola*", "actTisk*", "actObcerstvit*"]));
                    // defincice provideru
                    let provider = new Gordic.Data.Provider((a, b) => {
                        return that.reload();
                    });
                    // nastaveni procesoru na view
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    // definice gridu
                    that.$grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "full",
                        data: that.view,
                        name: "tabHorni",
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                that.ZobrazDetail(ctx.cellInfo.data);
                                /*
                                var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                GDlg.showWindow("Gordic.Uct.WebClient.GUctDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                                */
                            }
                        }),
                        columns: that.createCols()
                    });
                    //that.NastaveniAkci();
                    that.view.requestData();
                    if (that.provestKontroluDotaz && that.provestKontroluDotaz.trim().length != 0)
                        that.dialogs.warning("", that.provestKontroluDotaz);
                }
                /**
                 * Vytvoreni akci
                 * @param that
                 */
                createActions(that) {
                    this.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: false, run: function () {
                                that.ZobrazDetail(null, false);
                            }
                        }),
                        actProhlizeni: {
                            caption: "jres:30250055", //RC 30250055 : Prohlížení
                            run: () => {
                                //var radek = that.currentRow
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, false);
                            }
                        },
                        actKontrola: {
                            caption: "jres:30250054", //RC 30250054 : Kontrola dokladů
                            tooltip: "jres:30250484", //RC 30250484 : Kontrola neproúčtovaných dokladů v daném období DPH
                            run: () => {
                                that.Kontrola();
                            }
                        },
                        actTisk: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018", //RC 30250018 : Tisk
                            tooltip: "jres:30250018", //RC 30250018 : Tisk
                            icon: "gi-print",
                            tema: "inu_ptm_prizdph",
                            platnost: this.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            reportFinished: function (event, repInfo) {
                            },
                            enabled: false,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: 120 /* GEIDSestavy.DetailPriznaniDPH */,
                                        TypPriznani: radek.typ_priz_dph,
                                        Mesic: radek?.mesic,
                                        PorCislo: radek.por_cislo
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actObcerstvit: {
                            name: "actObcerstvit",
                            caption: "jres:30250039", //RC 30250039 : Občerstvit
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.view.requestData(undefined);
                                that.NastaveniAkci();
                            }
                        }
                    });
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "por_cislo",
                        caption: "jres:30250056", //RC 30250056 : Pořadí
                        width: 70
                    })
                        .addTextColumn({
                        name: "typ_priz_dph_txt",
                        caption: "jres:30250057", //RC 30250057 : Typ přiznání
                        width: 110
                    })
                        .addDateColumn({
                        name: "dat_priz_max",
                        caption: "jres:30250012", //RC 30250012 : Max. přiznání DPH
                        width: 150
                    })
                        .addDateColumn({
                        name: "dat_priz_dph",
                        caption: "jres:30250058", //RC 30250058 : Datum přiznání DPH
                        width: 160
                    })
                        .addDateColumn({
                        name: "dat_zjist_dod",
                        caption: "jres:30250059", //RC 30250059 : Zjištění pro dod. př.
                        width: 165
                    });
                    return gridFormat;
                }
                /**
                 *
                 *
                 * */
                VyrobKarty() {
                    var that = this;
                    var obdForm = new Gordic.Forms.Form("L1M1S1 M-3-9-0 L-3-9-0 breaks-400-500")
                        //.addField("gdummyfield", "w-h", {
                        //    model: "radek",
                        //    name: "radek"
                        //})
                        .addRow("typ")
                        .addField("gnumberbox", "w-8", { name: "typ_dph", disabled: true })
                        .addRow("Rok")
                        .addField("gnumberbox", "w-8", { name: "rok", disabled: true })
                        .addRow("Měsíc")
                        .addField("gnumberbox", "w-8", { name: "mesic", disabled: true })
                        .addRow("datum")
                        .addField("gstringbox", "w-8", { name: "dat_priz_max", disabled: true });
                    var itemtemplate_mesic = "<div style='border:1px solid LightGray; padding: 5px; width:230px; height:250px;'>" +
                        //"<div style='background-color: {barva_txt}; padding: 5px;'>" +
                        "<div style='padding: 5px;'>" +
                        "<h3><i class='fa {sl1}' style='color: gray;' aria-hidden='true'></i>{mesic}</h3>" +
                        "</div><div style='width:219px; padding: 5px;'>" +
                        //"<h3 style='color: {aktivita_color};'>{aktivita_txt}</h3>" +
                        "<p>Stav: {typ_dph}</p>" +
                        "<p>Max. přiznání DPH: {dat_priz_max}</p>" +
                        "<p>Typ přiznání: {typ_priz_dph_txt}</p>" +
                        "<p>Datum přiznání: {dat_priz_dph}</p>" +
                        "<p>Stav přepočtu: {s_prep_dph_txt}</p><br><br>" +
                        //                "<div><button name='tlacitko'>&nbsp</button><button name='tlacitko2'></button></div>" +
                        "</div></div>";
                    this.elem = $("<div>").appendTo(that.element);
                    //var karty = this.elem.gcardpanel({
                    //    editable: true,
                    //    title: "Seznam období ",
                    //    itemTemplate: itemtemplate_mesic,
                    //    data: that.view,
                    //    //form: obdForm,
                    //    createTab: false,
                    //    //defaultSelected: true,
                    //    add: function (ev, data: Gordic.Inu.Interface.GSeznamObdobiDPHDto) {
                    //        var panel = this;
                    //        console.log("add");
                    //        that.ZobrazDetail(null);
                    //    },
                    //    edit: function (ev, data: Gordic.Inu.Interface.GSeznamObdobiDPHDto) {
                    //        var panel = this;
                    //        console.log("edit");
                    //        that.ZobrazDetail(data as any,true);
                    //    },
                    //    defaultAction: new GAction({
                    //            name: "gridRowSelectedAct",
                    //            run: function (ev, ctx) {
                    //                that.ZobrazDetail(ctx.item.data as any);
                    //            }
                    //        }),             
                    //    //selection: function (ev, data: Gordic.Inu.Interface.GSeznamObdobiDPHDto) {
                    //    //    //that.prava_mesic(data);
                    //    //    that.currentRow = data;
                    //    //}
                    //});
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    var that = this;
                    var dataFound = this.view.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250114"; //RC 30250114 : Přiznání nenalezeno
                    // tisk
                    if (this.GlobalParams.Params?.PovoleniTisku) {
                        this.actions.actTisk?.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // prohlizeni
                    this.actions.actProhlizeni?.update({ enabled: dataFound, tooltip: tooltip });
                    // nove podani
                    this.actions.actNovy?.updatePermission(this.priznatPermit);
                    //this.actions.actKontrola?.update({ enabled: dataFound });
                }
                /**
                 *  Znovunacteni dat
                 *
                 */
                reload() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuPriznaniDPH.list({ mesic: that.mesic })
                        .get()
                        .done(function (result) {
                        //at.setActions(result.ListValues?.length as any);
                        return def.resolve(result);
                    })
                        .always(function () { that.NastaveniAkci(); });
                    return def.promise();
                }
                /**
                 * Kontrola na neprouctovane doklady
                 * */
                Kontrola() {
                    var that = this;
                    var defer = $.Deferred();
                    that.beginOperation("jres:30250094"); //RC 30250094 : Načítám data
                    Gordic.Isl.InuPriznaniDPH.kontrolaNeprouctovanychDokladu({ mesic: that.mesic })
                        .get()
                        .done((result) => {
                        that.endOperation();
                        if (!result.Result) {
                            //this.navigate(Gordic.Inu.WebClient.GVyberNezauctovanychDokladu);
                            that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNezauctovanechDoklady, { data: result.SeznamDokladu, uid: "GNezauctovanechDokladyID#" }, "jres:30250096", 800, 600, true); //RC 30250096 : Neproúčtované doklady
                        }
                        else {
                            that.dialogs.messageBox("Info", result.Message);
                            defer.resolve().promise();
                        }
                        //vyberDokladu();
                    }).always(() => { that.endOperation(); });
                }
                /**
                 * Zobrazeni detailu priznani dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazDetail(row, newRecord = false) {
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$grid === null)
                        return;
                    if (row != null && !newRecord) {
                        this.navigate("Gordic.Inu.WebClient.GDetailPriznaniDPH", { porCislo: row.por_cislo, mesic: row.mesic, typPriznani: row.typ_priz_dph, newRecord: false })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //reload(content);
                                //if (editace)
                                //that.view.requestData(undefined);
                            }
                        });
                    }
                    else {
                        var defer = $.Deferred();
                        that.beginOperation("jres:30250094"); //RC 30250094 : Načítám data
                        Gordic.Isl.InuPriznaniDPH.kontrolaNeprouctovanychDokladu({ mesic: that.mesic })
                            .get()
                            .done((result) => {
                            that.endOperation();
                            if (!result.Result) {
                                //this.navigate(Gordic.Inu.WebClient.GVyberNezauctovanychDokladu);
                                that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNezauctovanechDoklady, { data: result.SeznamDokladu, uid: "GNezauctovanechDokladyID#" }, "jres:30250096", 800, 600, true) //RC 30250096 : Neproúčtované doklady
                                    .on("close", function (res) {
                                    if (that.GlobalParams.Params?.BlokaceAkciDleKontrolDPH == 0 /* Interface.GETypBlokaceDleStavuKontrolyDPH.AkceBlokovany */) {
                                        defer.reject().promise();
                                    }
                                    else {
                                        that.dialogs.messageBox({ title: "jres:30250087", html: "jres:30250088", buttons: GDlg.mbbYesNo, icon: GDlg.mbiQuestion }) //RC 30250088 : Data daňového období obsahují neproúčtované doklady, které by mohly ovlivnit stavy DPH. Umožnit i přesto provést přiznání DPH?
                                            .on("yes", function () {
                                            defer.resolve().promise();
                                        })
                                            .on("close", function () {
                                            if (defer.state() === "pending")
                                                defer.reject().promise();
                                        });
                                    }
                                    //if (res.returnValue && res.returnValue === true) {
                                    //    // znovunačtení seznamu (podle aktuálních filtrů)
                                    //    //Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                                    //}
                                });
                            }
                            else {
                                defer.resolve().promise();
                            }
                            //vyberDokladu();
                        }).always(() => { that.endOperation(); });
                        defer.done(() => {
                            this.navigate("Gordic.Inu.WebClient.GDetailPriznaniDPH", { porCislo: 0, mesic: this.mesic, newRecord: true })
                                .on("close", function (res) {
                                if (res.returnValue && res.returnValue.refresh === true) {
                                    //reload(content);
                                    //if (editace)
                                    that.view.requestData(undefined);
                                }
                            });
                        });
                    }
                }
            };
            GSeznamPriznaniDPH = __decorate([
                gcontent
            ], GSeznamPriznaniDPH);
            WebClient.GSeznamPriznaniDPH = GSeznamPriznaniDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXpuYW5pRFBILmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVByaXpuYW5pRFBILnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0E4YWY7QUE5YUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOGFuQjtJQTlhZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOGE3QjtRQTlhb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXBEOztvQkFlSTs7eUJBRUs7b0JBQ0csWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkF1WnJELENBQUM7Z0JBN1hHLGlFQUFpRTtnQkFDakUsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLGdCQUFnQjtvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFekIsbUNBQW1DO29CQUUvQyxvREFBb0Q7b0JBSXhDLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsSCxzQkFBc0I7b0JBQ3RCLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM1RCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsOEJBQThCO29CQUM5QixJQUFJLENBQUMs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QUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztvQ0FDdEQsa0JBQWtCO29DQUNsQixjQUFjO29DQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNyQyxDQUFDOzRCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNYLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBR1QsQ0FBQzthQUNBLENBQUE7WUF6YVksa0JBQWtCO2dCQUQ5QixRQUFRO2VBQ0ksa0JBQWtCLENBeWE5QjtZQXphWSw0QkFBa0IscUJBeWE5QixDQUFBO1FBRUwsQ0FBQyxFQTlhb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOGE3QjtJQUFELENBQUMsRUE5YWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThhbkI7QUFBRCxDQUFDLEVBOWFTLE1BQU0sS0FBTixNQUFNLFFBOGFmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVByaXpuYW5pRFBIIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgR0ludUJhc2VDbGFzcyB7XHJcblxyXG4gICAgICAgIC8vIEF0cmlidXR5IHogQyMganNvblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJva1xyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1lc2ljXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbWVzaWM6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRldGlmaWthdG9yIHphem5hbXUgKGljbyBuZWJvIGl4c19kc3UpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgaWRlbnRpZmlrYXRvcjogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbG5pIG5hc3RhdmVuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbG5pIG5hc3RhdmVuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcmVhZG9ubHkgR2xvYmFsUGFyYW1zOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51R2xvYmFsRHRvO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0b1tdO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUG92b2xlbmkgcHJpem5hdFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHByaXpuYXRQZXJtaXQ6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnRyb2xhVmxpdnVabWVuTmFIbGFzZW5pRFBIXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgcHJvdmVzdEtvbnRyb2x1RG90YXo6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYmVjbmUgcHJvcGVydHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy9wcm90ZWN0ZWQgUHJlcEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIC8vcHJvdGVjdGVkIGZvcm06IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIGVsZW06IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgY3VycmVudFJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKHRoYXQpO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRhdGE6IFwiLCB0aGlzLm1vZGVsKVxyXG5cclxuLy8gICAgICAgICAgICAkLmV4dGVuZCh0aGlzLm1vZGVsX2FrdCwgdGhpcy5tb2RlbCApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Tm92eSpcIiwgXCJhY3RQcm9obGl6ZW5pKlwiLCBcImFjdEtvbnRyb2xhKlwiLCBcImFjdFRpc2sqXCIsXCJhY3RPYmNlcnN0dml0KlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5jaWNlIHByb3ZpZGVydVxyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHByb2Nlc29ydSBuYSB2aWV3XHJcbiAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQubW9kZWwsIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGdyaWR1XHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC8vLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGl0bGU6IFwiUk9aXCIsIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcInRhYkhvcm5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaG93SGVhZGVyUm93OmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoY3R4LmNlbGxJbmZvLmRhdGEgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdEbGcuc2hvd1dpbmRvdyhcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIiwgeyBJeHA6IHJvdy5peHAgfSwgXCJcIiwgODAwLCA2MDAsIHRydWUpOyAvL3pvYnJhemVuaSBkYWxzaWhvIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVDb2xzKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5wcm92ZXN0S29udHJvbHVEb3RheiAmJiB0aGF0LnByb3Zlc3RLb250cm9sdURvdGF6LnRyaW0oKS5sZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiXCIsIHRoYXQucHJvdmVzdEtvbnRyb2x1RG90YXopO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKHRoYXQ6IHRoaXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCBydW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RQcm9obGl6ZW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDU1XCIsIC8vUkMgMzAyNTAwNTUgOiBQcm9obMOtxb5lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwocmFkZWssIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTRcIiwgLy9SQyAzMDI1MDA1NCA6IEtvbnRyb2xhIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDpcImpyZXM6MzAyNTA0ODRcIiwgLy9SQyAzMDI1MDQ4NCA6IEtvbnRyb2xhIG5lcHJvw7rEjXRvdmFuw71jaCBkb2tsYWTFryB2IGRhbsOpbSBvYmRvYsOtIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktvbnRyb2xhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMThcIiwgLy9SQyAzMDI1MDAxOCA6IFRpc2tcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAwMThcIiwgLy9SQyAzMDI1MDAxOCA6IFRpc2tcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX3ByaXpkcGhcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0s/LnRvU3RyaW5nKCkudHJpbSgpICsgXCIxMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuSW51LldlYkNsaWVudC5HVWN0UHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbihldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVtYTogcmVwLnRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSURTZXN0YXZ5OiBHRUlEU2VzdGF2eS5EZXRhaWxQcml6bmFuaURQSCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBQcml6bmFuaTogcmFkZWsudHlwX3ByaXpfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc2ljOiByYWRlaz8ubWVzaWMhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvckNpc2xvOiByYWRlay5wb3JfY2lzbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPYmNlcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDM5XCIsIC8vUkMgMzAyNTAwMzkgOiBPYsSNZXJzdHZpdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtUHJpem5hbmlEUEhEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtUHJpem5hbmlEUEhEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9yX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDU2XCIsIC8vUkMgMzAyNTAwNTYgOiBQb8WZYWTDrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9wcml6X2RwaF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTdcIiwgLy9SQyAzMDI1MDA1NyA6IFR5cCBwxZlpem7DoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcHJpel9tYXhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTJcIiwgLy9SQyAzMDI1MDAxMiA6IE1heC4gcMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcml6X2RwaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1OFwiLCAvL1JDIDMwMjUwMDU4IDogRGF0dW0gcMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96amlzdF9kb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTlcIiwgLy9SQyAzMDI1MDA1OSA6IFpqacWhdMSbbsOtIHBybyBkb2QuIHDFmS5cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTY1XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBWeXJvYkthcnR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSBNLTMtOS0wIEwtMy05LTAgYnJlYWtzLTQwMC01MDBcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2R1bW15ZmllbGRcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwicmFkZWtcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwicmFkZWtcIlxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcInR5cFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBfZHBoXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlJva1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJyb2tcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJNxJtzw61jXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcIm1lc2ljXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImRhdHVtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcImRhdF9wcml6X21heFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXRlbXBsYXRlX21lc2ljID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheTsgcGFkZGluZzogNXB4OyB3aWR0aDoyMzBweDsgaGVpZ2h0OjI1MHB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgLy9cIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHtiYXJ2YV90eHR9OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J3BhZGRpbmc6IDVweDsnPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGgzPjxpIGNsYXNzPSdmYSB7c2wxfScgc3R5bGU9J2NvbG9yOiBncmF5OycgYXJpYS1oaWRkZW49J3RydWUnPjwvaT57bWVzaWN9PC9oMz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjIxOXB4OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICAvL1wiPGgzIHN0eWxlPSdjb2xvcjoge2FrdGl2aXRhX2NvbG9yfTsnPntha3Rpdml0YV90eHR9PC9oMz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxwPlN0YXY6IHt0eXBfZHBofTwvcD5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxwPk1heC4gcMWZaXpuw6Fuw60gRFBIOiB7ZGF0X3ByaXpfbWF4fTwvcD5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxwPlR5cCBwxZlpem7DoW7DrToge3R5cF9wcml6X2RwaF90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHA+RGF0dW0gcMWZaXpuw6Fuw606IHtkYXRfcHJpel9kcGh9PC9wPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHA+U3RhdiBwxZllcG/EjXR1OiB7c19wcmVwX2RwaF90eHR9PC9wPjxicj48YnI+XCIgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCI8ZGl2PjxidXR0b24gbmFtZT0ndGxhY2l0a28nPiZuYnNwPC9idXR0b24+PGJ1dHRvbiBuYW1lPSd0bGFjaXRrbzInPjwvYnV0dG9uPjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvL3ZhciBrYXJ0eSA9IHRoaXMuZWxlbS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgIHRpdGxlOiBcIlNlem5hbSBvYmRvYsOtIFwiLFxyXG4gICAgICAgICAgICAvLyAgICBpdGVtVGVtcGxhdGU6IGl0ZW10ZW1wbGF0ZV9tZXNpYyxcclxuICAgICAgICAgICAgLy8gICAgZGF0YTogdGhhdC52aWV3LFxyXG4gICAgICAgICAgICAvLyAgICAvL2Zvcm06IG9iZEZvcm0sXHJcbiAgICAgICAgICAgIC8vICAgIGNyZWF0ZVRhYjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgIC8vZGVmYXVsdFNlbGVjdGVkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgLy8gICAgYWRkOiBmdW5jdGlvbiAoZXYsIGRhdGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciBwYW5lbCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhcImFkZFwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKG51bGwpO1xyXG4gICAgICAgICAgICAvLyAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gICAgZWRpdDogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgcGFuZWwgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoZGF0YSBhcyBhbnksdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoY3R4Lml0ZW0uZGF0YSBhcyBhbnkpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH0pLCAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAvL3NlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIC8vdGhhdC5wcmF2YV9tZXNpYyhkYXRhKTtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgdGhhdC5jdXJyZW50Um93ID0gZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgTmFzdGF2ZW5pQWtjaSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGF0YUZvdW5kID0gdGhpcy52aWV3LmdldENvdW50KCkgPiAwO1xyXG4gICAgICAgICAgICB2YXIgdG9vbHRpcCA9IGRhdGFGb3VuZCA/IFwiXCIgOiBcImpyZXM6MzAyNTAxMTRcIjsgLy9SQyAzMDI1MDExNCA6IFDFmWl6bsOhbsOtIG5lbmFsZXplbm9cclxuICAgICAgICAgICAgLy8gdGlza1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaVRpc2t1KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFRpc2s/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDEwNVwiIH0pOyAvL1JDIDMwMjUwMTA1IDogTmVuw60gcG92b2xlbm8gcGFyYW1ldHJlbVxyXG4gICAgICAgICAgICAvLyBwcm9obGl6ZW5pXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcm9obGl6ZW5pPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIC8vIG5vdmUgcG9kYW5pXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5Py51cGRhdGVQZXJtaXNzaW9uKHRoaXMucHJpem5hdFBlcm1pdCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdEtvbnRyb2xhPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludVByaXpuYW5pRFBILmxpc3QoeyBtZXNpYzogdGhhdC5tZXNpYyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IHRoYXQuTmFzdGF2ZW5pQWtjaSgpOyB9KSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgbmEgbmVwcm91Y3RvdmFuZSBkb2tsYWR5XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIEtvbnRyb2xhKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwOTRcIik7IC8vUkMgMzAyNTAwOTQgOiBOYcSNw610w6FtIGRhdGFcclxuICAgICAgICAgICAgR29yZGljLklzbC5JbnVQcml6bmFuaURQSC5rb250cm9sYU5lcHJvdWN0b3ZhbnljaERva2xhZHUoeyBtZXNpYzogdGhhdC5tZXNpYyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdWeWJlck5lemF1Y3RvdmFueWNoRG9rbGFkdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLkludS5XZWJDbGllbnQuR05lemF1Y3RvdmFuZWNoRG9rbGFkeSwgeyBkYXRhOiByZXN1bHQuU2V6bmFtRG9rbGFkdSwgdWlkOiBcIkdOZXphdWN0b3ZhbmVjaERva2xhZHlJRCNcIiB9LCBcImpyZXM6MzAyNTAwOTZcIiwgODAwLCA2MDAsIHRydWUpOyAvL1JDIDMwMjUwMDk2IDogTmVwcm/DusSNdG92YW7DqSBkb2tsYWR5XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJJbmZvXCIsIHJlc3VsdC5NZXNzYWdlISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdnliZXJEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHUgcHJpem5hbmkgZGxlIGFrdHVhbG5paG8gcmFka3VcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFpvYnJhekRldGFpbChyb3c6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0byB8IG51bGwsIG5ld1JlY29yZDogYm9vbGVhbj1mYWxzZSk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAocm93ICE9IG51bGwgJiYgIW5ld1JlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxQcml6bmFuaURQSFwiLCB7IHBvckNpc2xvOiByb3cucG9yX2Npc2xvLCBtZXNpYzogcm93Lm1lc2ljLCB0eXBQcml6bmFuaTogcm93LnR5cF9wcml6X2RwaCwgbmV3UmVjb3JkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWxvYWQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChlZGl0YWNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwOTRcIik7IC8vUkMgMzAyNTAwOTQgOiBOYcSNw610w6FtIGRhdGFcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51UHJpem5hbmlEUEgua29udHJvbGFOZXByb3VjdG92YW55Y2hEb2tsYWR1KHsgbWVzaWM6IHRoYXQubWVzaWMgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdWeWJlck5lemF1Y3RvdmFueWNoRG9rbGFkdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdOZXphdWN0b3ZhbmVjaERva2xhZHksIHsgZGF0YTogcmVzdWx0LlNlem5hbURva2xhZHUsIHVpZDogXCJHTmV6YXVjdG92YW5lY2hEb2tsYWR5SUQjXCIgfSwgXCJqcmVzOjMwMjUwMDk2XCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMDk2IDogTmVwcm/DusSNdG92YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lkdsb2JhbFBhcmFtcy5QYXJhbXM/LkJsb2thY2VBa2NpRGxlS29udHJvbERQSCA9PSBJbnRlcmZhY2UuR0VUeXBCbG9rYWNlRGxlU3RhdnVLb250cm9seURQSC5Ba2NlQmxva292YW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveCh7IHRpdGxlOiBcImpyZXM6MzAyNTAwODdcIiwgaHRtbDogXCJqcmVzOjMwMjUwMDg4XCIsIGJ1dHRvbnM6IEdEbGcubWJiWWVzTm8sIGljb246IEdEbGcubWJpUXVlc3Rpb259KSAvL1JDIDMwMjUwMDg4IDogRGF0YSBkYcWIb3bDqWhvIG9iZG9iw60gb2JzYWh1asOtIG5lcHJvw7rEjXRvdmFuw6kgZG9rbGFkeSwga3RlcsOpIGJ5IG1vaGx5IG92bGl2bml0IHN0YXZ5IERQSC4gVW1vxb5uaXQgaSBwxZllc3RvIHByb3bDqXN0IHDFmWl6bsOhbsOtIERQSD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmZXIuc3RhdGUoKSA9PT0gXCJwZW5kaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyB6bm92dW5hxI10ZW7DrSBzZXpuYW11IChwb2RsZSBha3R1w6FsbsOtY2ggZmlsdHLFrylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Z5YmVyRG9rbGFkdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXIuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxQcml6bmFuaURQSFwiLCB7IHBvckNpc2xvOiAwLCBtZXNpYzogdGhpcy5tZXNpYywgbmV3UmVjb3JkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVsb2FkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGVkaXRhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19