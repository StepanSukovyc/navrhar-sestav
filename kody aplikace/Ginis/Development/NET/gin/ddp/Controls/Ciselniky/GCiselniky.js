"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GCiselniky.ts                          </Name>
//    <Description> Číselníky                                                   </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
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
            let GCiselniky = class GCiselniky extends Gordic.GContentBase {
                /** Základní metoda pro definování obsahu stránky */
                onContentReady() {
                    const that = this;
                    that.title = `Číselníky typu pohledávky ${that.typ_phl}`;
                    that.createActions();
                    that.createSearch();
                    that.nacti = false;
                    that.mainForm.findFields().gfield("model", "apply", { typ_phl: that.typ_phl }); //načte typ_phl do políčka a stustí tím refresh
                    that.createView();
                    that.createTabs();
                }
                /** Metoda pro načtení dat do ggridů */
                createView() {
                    const that = this;
                    that.beginOperation();
                    let getRq = (akt = true) => {
                        var filter = {
                            typ_phl: that.typ_phl
                        };
                        if (akt)
                            filter.aktivita = that.mainForm.findFields("pouze_aktivni").gfield("getValue") === true ? 100 : undefined;
                        return rq => {
                            return {
                                filters: $.extend({}, filter),
                                fragments: ["*", "Permissions"]
                            };
                        };
                    };
                    //view CiselnikRadku
                    that.viewCiselnikRadku = new Gordic.Isl.View(that.isl.CiselnikRadku.list(getRq()), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view CiselnikCtvrti
                    that.viewCiselnikCtvrti = new Gordic.Isl.View(that.isl.CiselnikCtvrti.list(getRq()), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view VazbyRadkuACtvrti
                    that.viewVazbyRadkuACtvrti = new Gordic.Isl.View(that.isl.VazbyRadkuACtvrti.list(getRq()), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view SazbyPripadu
                    that.viewSazbyPripadu = new Gordic.Isl.View(that.isl.SazbyPripadu.list(getRq()), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view VyjimkyKategoriiPohybu
                    that.viewTypPhlPrevodVyjimkyKtgUPO = new Gordic.Isl.View(that.isl.VyjimkyKategoriiPohybu.list(getRq()), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view GenerovaniUPO
                    that.viewGenerovaniUPO = new Gordic.Isl.View(that.isl.GenerovaniUPO.list(getRq(false)), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view GenerovaniOPR
                    that.viewGenerovaniOPR = new Gordic.Isl.View(that.isl.GenerovaniOPR.list(getRq(false)), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view GenerovaniFK
                    that.viewGenerovaniFK = new Gordic.Isl.View(that.isl.GenerovaniFK.list(getRq()), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //view PolozkySML
                    that.viewPolozkySMLProKatPohybu = new Gordic.Isl.View(that.isl.PolozkySML.list(getRq(false)), {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                    //konec načítání
                    that.endOperation();
                }
                // TODO: časem předělat na klasický filtr-panel ?
                /** Metoda pro vykreslení obsahu */
                createSearch() {
                    const that = this;
                    //#region FORM
                    let form = new Gordic.Forms.Form({ name: "findForm", layoutDescriptor: "L1M1S1" })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.typPhlSimple(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        change: (ev, obj) => {
                            //that.refresh();
                        }
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "pouze_aktivni",
                        label: "Zobrazit pouze aktivní",
                        initialValue: false,
                        change: (ev, obj) => {
                            that.refresh();
                        }
                    })
                        .addRow({ customClass: "right" })
                        .addField("gbutton", { params: { primary: true, customClass: "right", id: "actGCiselnikyVyhledat_button", action: that.actions["actGCiselnikyVyhledat"] } });
                    that.mainForm = $.newDiv()
                        .appendTo(that.element)
                        .gform("createFrom", form);
                    //#endregion
                }
                createTabs() {
                    var that = this;
                    //#region GROUP DEFINICE
                    that.tabManager = $.newDiv().appendTo(that.element).gtabmanager({
                        groups: [
                            { id: "groupCiselnikRadku", caption: "Číselník řádků" },
                            { id: "groupCiselnikCtvrti", caption: "Číselník čtvrtí" },
                            { id: "groupVazbyRadkuACtvrti", caption: "Vazby řádků a čtvrtí" },
                            { id: "groupSazbyPripadu", caption: "Sazby případů" },
                            { id: "groupTypPhlPrevodVyjimkyKtgUPO", caption: "Typ phl. převod výjimky ktg. UPO" },
                            { id: "groupGenerovaniUPO", caption: "Generování UPO" },
                            { id: "groupGenerovaniOPR", caption: "Generování OPR" },
                            { id: "groupGenerovaniFK", caption: "Generování FK" },
                            { id: "groupPolozkySMLProKatPohybu", caption: "Položky SML pro kat. pohybů" },
                        ],
                        scopeElement: that.element
                    });
                    //#endregion
                    //#region GROUP ČÍSELNÍK ŘÁDKŮ
                    let groupCiselnikRadku = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupCiselnikRadku" },
                        conceal: function (ev, ctx) {
                            //if (ctx.conceal) groupCiselnikRadku.addClass("concealed"); else groupCiselnikRadku.removeClass("concealed");
                            that.gridCiselnikRadku.parent().toggle(!ctx.conceal);
                            that.gridCiselnikRadku.toggle(!ctx.conceal);
                        }
                    });
                    that.gridCiselnikRadku = $.newDiv()
                        .appendTo(groupCiselnikRadku)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        //data: new Data.View([])
                        name: "ddp_typy_pohledavek_ciselnik_CiselnikRadku",
                        data: that.viewCiselnikRadku,
                        columns: Ddp.WebClient.Common.GridFormats.CiselnikRadku(),
                        defaultProfile: that.getDefaultProfile(0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */),
                        defaultAction: that.actions["actGCiselnikyUpravit1"],
                        cellActivate: (ev, obj) => {
                            that.enableActions1(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat1"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat1"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit1"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit1"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat1"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP ČÍSELNÍK ČTVRTÍ
                    let groupCiselnikCtvrti = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupCiselnikCtvrti" },
                        conceal: function (ev, ctx) {
                            //if (ctx.conceal) groupCiselnikCtvrti.addClass("concealed"); else groupCiselnikCtvrti.removeClass("concealed");
                            that.gridCiselnikCtvrti.parent().toggle(!ctx.conceal);
                            that.gridCiselnikCtvrti.toggle(!ctx.conceal);
                        },
                    });
                    that.gridCiselnikCtvrti = $.newDiv()
                        .appendTo(groupCiselnikCtvrti)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        //data: new Data.View([])
                        data: that.viewCiselnikCtvrti,
                        name: "ddp_typy_pohledavek_ciselnik_CiselniCtvrti",
                        columns: Ddp.WebClient.Common.GridFormats.CiselnikCtvrti(),
                        defaultProfile: that.getDefaultProfile(1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */),
                        defaultAction: that.actions["actGCiselnikyUpravit2"],
                        cellActivate: (ev, obj) => {
                            that.enableActions2(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat2"],
                                favorite: true,
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat2"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit2"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit2"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat2"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP VAZBY RADKU A CTVRTI
                    let groupVazbyRadkuACtvrti = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupVazbyRadkuACtvrti" },
                        conceal: function (ev, ctx) {
                            //if (ctx.conceal) groupVazbyRadkuACtvrti.addClass("concealed"); else groupVazbyRadkuACtvrti.removeClass("concealed");
                            that.gridVazbyRadkuACtvrti.parent().toggle(!ctx.conceal);
                            that.gridVazbyRadkuACtvrti.toggle(!ctx.conceal);
                        },
                    });
                    that.gridVazbyRadkuACtvrti = $.newDiv()
                        .appendTo(groupVazbyRadkuACtvrti)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        //data: new Data.View([])
                        data: that.viewVazbyRadkuACtvrti,
                        name: "ddp_typy_pohledavek_ciselnik_VazbyRadkuACtvrti",
                        columns: Ddp.WebClient.Common.GridFormats.VazbyRadkuACtvrti(),
                        defaultProfile: that.getDefaultProfile(2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */),
                        defaultAction: that.actions["actGCiselnikyUpravit3"],
                        cellActivate: (ev, obj) => {
                            that.enableActions3(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat3"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat3"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit3"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit3"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat3"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP Sazby Případů
                    let groupSazbyPripadu = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupSazbyPripadu" },
                        conceal: function (ev, ctx) {
                            that.gridSazbyPripadu.parent().toggle(!ctx.conceal);
                            that.gridSazbyPripadu.toggle(!ctx.conceal);
                        },
                    });
                    that.gridSazbyPripadu = $.newDiv()
                        .appendTo(groupSazbyPripadu)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        data: that.viewSazbyPripadu,
                        name: "ddp_typy_pohledavek_ciselnik_SazbyPripadu",
                        columns: Ddp.WebClient.Common.GridFormats.SazbyPripadu(),
                        defaultProfile: that.getDefaultProfile(3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */),
                        defaultAction: that.actions["actGCiselnikyUpravit4"],
                        cellActivate: (ev, obj) => {
                            that.enableActions4(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat4"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat4"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit4"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit4"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat4"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP Typ phl. převod výjimky ktg. UPO
                    let groupTypPhlPrevodVyjimkyKtgUPO = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupTypPhlPrevodVyjimkyKtgUPO" },
                        conceal: function (ev, ctx) {
                            that.gridTypPhlPrevodVyjimkyKtgUPO.parent().toggle(!ctx.conceal);
                            that.gridTypPhlPrevodVyjimkyKtgUPO.toggle(!ctx.conceal);
                        },
                    });
                    that.gridTypPhlPrevodVyjimkyKtgUPO = $.newDiv()
                        .appendTo(groupTypPhlPrevodVyjimkyKtgUPO)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        data: that.viewTypPhlPrevodVyjimkyKtgUPO,
                        name: "ddp_typy_pohledavek_ciselnik_VyjimkyKategoriiPohybu",
                        columns: Ddp.WebClient.Common.GridFormats.VyjimkyKategoriiPohybu(),
                        defaultProfile: that.getDefaultProfile(4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */),
                        defaultAction: that.actions["actGCiselnikyUpravit5"],
                        cellActivate: (ev, obj) => {
                            that.enableActions5(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat5"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat5"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit5"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit5"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat5"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP Generování UPO
                    let groupGenerovaniUPO = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupGenerovaniUPO" },
                        conceal: function (ev, ctx) {
                            that.gridGenerovaniUPO.parent().toggle(!ctx.conceal);
                            that.gridGenerovaniUPO.toggle(!ctx.conceal);
                        },
                    });
                    that.gridGenerovaniUPO = $.newDiv()
                        .appendTo(groupGenerovaniUPO)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        data: that.viewGenerovaniUPO,
                        name: "ddp_typy_pohledavek_ciselnik_GenerovaniUPO",
                        columns: Ddp.WebClient.Common.GridFormats.GenerovaniUPO(),
                        defaultProfile: that.getDefaultProfile(5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */),
                        defaultAction: that.actions["actGCiselnikyUpravit6"],
                        cellActivate: (ev, obj) => {
                            that.enableActions6(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat6"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat6"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit6"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit6"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat6"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP Generování OPR
                    let groupGenerovaniOPR = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupGenerovaniOPR" },
                        conceal: function (ev, ctx) {
                            that.gridGenerovaniOPR.parent().toggle(!ctx.conceal);
                            that.gridGenerovaniOPR.toggle(!ctx.conceal);
                        },
                    });
                    that.gridGenerovaniOPR = $.newDiv()
                        .appendTo(groupGenerovaniOPR)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        data: that.viewGenerovaniOPR,
                        name: "ddp_typy_pohledavek_ciselnik_GenerovaniOPR",
                        columns: Ddp.WebClient.Common.GridFormats.GenerovaniOPR(),
                        defaultProfile: that.getDefaultProfile(6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */),
                        defaultAction: that.actions["actGCiselnikyUpravit7"],
                        cellActivate: (ev, obj) => {
                            that.enableActions7(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat7"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat7"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit7"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit7"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat7"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP Generování FK
                    let groupGenerovaniFK = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupGenerovaniFK" },
                        conceal: function (ev, ctx) {
                            that.gridGenerovaniFK.parent().toggle(!ctx.conceal);
                            that.gridGenerovaniFK.toggle(!ctx.conceal);
                        },
                    });
                    that.gridGenerovaniFK = $.newDiv()
                        .appendTo(groupGenerovaniFK)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        data: that.viewGenerovaniFK,
                        name: "ddp_typy_pohledavek_ciselnik_GenerovaniFK",
                        columns: Ddp.WebClient.Common.GridFormats.GenerovaniFK(),
                        defaultProfile: that.getDefaultProfile(7 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniFK */),
                        defaultAction: that.actions["actGCiselnikyUpravitFK"],
                        cellActivate: (ev, obj) => {
                            that.enableActionsFK(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridatFK"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebratFK"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovitFK"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravitFK"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovatFK"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    //#region GROUP Položky SML pro kat. pohybů
                    let groupPolozkySMLProKatPohybu = $.newDiv().appendTo(that.element)
                        .ggroupable({
                        group: { id: "groupPolozkySMLProKatPohybu" },
                        conceal: function (ev, ctx) {
                            that.gridPolozkySMLProKatPohybu.parent().toggle(!ctx.conceal);
                            that.gridPolozkySMLProKatPohybu.toggle(!ctx.conceal);
                        },
                    });
                    that.gridPolozkySMLProKatPohybu = $.newDiv()
                        .appendTo(groupPolozkySMLProKatPohybu)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        data: that.viewPolozkySMLProKatPohybu,
                        name: "ddp_typy_pohledavek_ciselnik_PolozkySMLProKatPohybu",
                        columns: Ddp.WebClient.Common.GridFormats.PolozkySML(),
                        defaultProfile: that.getDefaultProfile(8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */),
                        defaultAction: that.actions["actGCiselnikyUpravit8"],
                        cellActivate: (ev, obj) => {
                            that.enableActions8(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGCiselnikyPridat8"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyOdebrat8"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyObnovit8"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyUpravit8"],
                                favorite: true
                            },
                            {
                                action: that.actions["actGCiselnikyKopirovat8"],
                                favorite: true
                            },
                        ]
                    });
                    //#endregion
                    that.tabManager.gtabmanager("refresh");
                    that.tabManager.find("[data-param-id='_tabGroupOthers']").parent().attr("style", "display: none");
                }
                getDefaultProfile(ciselnik) {
                    switch (ciselnik) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            return {
                                columnList: "ddp_radek, nazev, ixp_den, poznamka, aktivita",
                                rowNumbers: true,
                                condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            };
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            return {
                                columnList: "ddp_ctvrt, nazev, ixp_den, poznamka, aktivita",
                                rowNumbers: true,
                                condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            };
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            return {
                                columnList: "ixp_den, ddp_radek, ddp_ctvrt, poznamka, aktivita",
                                rowNumbers: true,
                            };
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            return {
                                columnList: "cis_sazby, popis, sazba, pocet, poc_splatek, c_celk, poznamka, aktivita, c_z0, c_d0, c_z1, c_d1, c_z3, c_d3, c_z2, c_d2, c_zao",
                                rowNumbers: true,
                                condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            };
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            return {
                                columnList: "typ_phl_z, typ_phl_do, ktg_upo_z, ktg_upo_do, invert, aktivita",
                                rowNumbers: true,
                                condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            }; //490-přidán invert
                        case 5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */:
                            return {
                                columnList: "typ_phl, rok, ico, ucs, ktg_upo, priz_gen_upo",
                                rowNumbers: true,
                                //condFormats: // Tabulka neobsahuje aktivitu
                                //    Eko.Grid.getCondFormats({ type: Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            };
                        case 6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */:
                            return {
                                columnList: "typ_phl, rok, ico, ucs, ktg_upo, priz_gen_opr",
                                rowNumbers: true,
                                //condFormats: // Tabulka neobsahuje aktivitu
                                //    Eko.Grid.getCondFormats({ type: Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            };
                        case 7 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniFK */:
                            return {
                                columnList: "typ_phl, rok, ico, ucs, ktg_upo, pri_fk, aktivita", // dat_zmena, zmenu_prov",
                                rowNumbers: true,
                                condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                            };
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            return {
                                columnList: "typ_phl, ktg_upo, typ_vsm",
                                rowNumbers: true,
                                //condFormats:
                                //    Eko.Grid.getCondFormats(
                                //        { type: Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } }
                                //    )
                            };
                        default:
                            return undefined;
                    }
                }
                /**Metoda pro obnovení obsahu gridů */
                refresh() {
                    const that = this;
                    let filter = {};
                    that.mainForm.findFields("typ_phl").gfield("model", "collect", filter);
                    if (filter.typ_phl == null)
                        filter.typ_phl = that.typ_phl;
                    else
                        that.typ_phl = filter.typ_phl;
                    that.setContentTitle();
                    //filter.aktivita = that.mainForm!.findFields("pouze_aktivni").gfield("getValue") === true ? 100 : undefined;
                    that.createView();
                    that.enableActions1(undefined);
                    that.enableActions2(undefined);
                    that.enableActions3(undefined);
                    that.enableActions4(undefined);
                    that.enableActions5(undefined);
                    that.enableActions6(undefined);
                    that.enableActions7(undefined);
                    that.enableActionsFK(undefined);
                    that.enableActions8(undefined);
                    that.gridCiselnikRadku.ggrid("setData", that.viewCiselnikRadku);
                    that.gridCiselnikCtvrti.ggrid("setData", that.viewCiselnikCtvrti);
                    that.gridVazbyRadkuACtvrti.ggrid("setData", that.viewVazbyRadkuACtvrti);
                    that.gridSazbyPripadu.ggrid("setData", that.viewSazbyPripadu);
                    that.gridTypPhlPrevodVyjimkyKtgUPO.ggrid("setData", that.viewTypPhlPrevodVyjimkyKtgUPO);
                    that.gridGenerovaniUPO.ggrid("setData", that.viewGenerovaniUPO);
                    that.gridGenerovaniOPR.ggrid("setData", that.viewGenerovaniOPR);
                    that.gridGenerovaniFK.ggrid("setData", that.viewGenerovaniFK);
                    that.gridPolozkySMLProKatPohybu.ggrid("setData", that.viewPolozkySMLProKatPohybu);
                    that.tabManager.gtabmanager("refresh");
                    that.nacti = true;
                }
                /**Metoda pro změny typu phl v titulku stránky */
                setContentTitle() {
                    this.title = `Číselníky typu pohledávky ${this.typ_phl}`;
                    this.setBreadcrumbs([{
                            caption: this.title,
                        }]);
                }
                //#######################\\
                //###DEFINICE AKCI GRIDŮ###\\
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions1(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat1"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat1"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit1"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit1"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat1"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat1"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat1"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit1"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit1"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat1"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat1"].visible(this.actions["actGCiselnikyPridat1"].enabled());
                    this.actions["actGCiselnikyOdebrat1"].visible(this.actions["actGCiselnikyOdebrat1"].enabled());
                    this.actions["actGCiselnikyObnovit1"].visible(this.actions["actGCiselnikyObnovit1"].enabled());
                    this.actions["actGCiselnikyUpravit1"].visible(this.actions["actGCiselnikyUpravit1"].enabled());
                    this.actions["actGCiselnikyKopirovat1"].visible(this.actions["actGCiselnikyKopirovat1"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions2(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat2"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat2"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit2"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit2"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat2"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat2"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat2"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit2"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit2"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat2"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat2"].visible(this.actions["actGCiselnikyPridat2"].enabled());
                    this.actions["actGCiselnikyOdebrat2"].visible(this.actions["actGCiselnikyOdebrat2"].enabled());
                    this.actions["actGCiselnikyObnovit2"].visible(this.actions["actGCiselnikyObnovit2"].enabled());
                    this.actions["actGCiselnikyUpravit2"].visible(this.actions["actGCiselnikyUpravit2"].enabled());
                    this.actions["actGCiselnikyKopirovat2"].visible(this.actions["actGCiselnikyKopirovat2"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions3(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat3"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat3"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit3"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit3"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat3"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat3"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat3"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit3"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit3"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat3"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat3"].visible(this.actions["actGCiselnikyPridat3"].enabled());
                    this.actions["actGCiselnikyOdebrat3"].visible(this.actions["actGCiselnikyOdebrat3"].enabled());
                    this.actions["actGCiselnikyObnovit3"].visible(this.actions["actGCiselnikyObnovit3"].enabled());
                    this.actions["actGCiselnikyUpravit3"].visible(this.actions["actGCiselnikyUpravit3"].enabled());
                    this.actions["actGCiselnikyKopirovat3"].visible(this.actions["actGCiselnikyKopirovat3"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions4(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat4"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat4"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit4"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit4"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat4"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat4"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat4"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit4"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit4"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat4"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat4"].visible(this.actions["actGCiselnikyPridat4"].enabled());
                    this.actions["actGCiselnikyOdebrat4"].visible(this.actions["actGCiselnikyOdebrat4"].enabled());
                    this.actions["actGCiselnikyObnovit4"].visible(this.actions["actGCiselnikyObnovit4"].enabled());
                    this.actions["actGCiselnikyUpravit4"].visible(this.actions["actGCiselnikyUpravit4"].enabled());
                    this.actions["actGCiselnikyKopirovat4"].visible(this.actions["actGCiselnikyKopirovat4"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions5(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat5"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat5"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit5"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit5"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat5"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat5"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat5"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit5"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit5"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat5"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat5"].visible(this.actions["actGCiselnikyPridat5"].enabled());
                    this.actions["actGCiselnikyOdebrat5"].visible(this.actions["actGCiselnikyOdebrat5"].enabled());
                    this.actions["actGCiselnikyObnovit5"].visible(this.actions["actGCiselnikyObnovit5"].enabled());
                    this.actions["actGCiselnikyUpravit5"].visible(this.actions["actGCiselnikyUpravit5"].enabled());
                    this.actions["actGCiselnikyKopirovat5"].visible(this.actions["actGCiselnikyKopirovat5"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions6(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat6"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat6"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit6"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit6"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat6"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat6"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat6"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit6"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit6"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat6"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat6"].visible(this.actions["actGCiselnikyPridat6"].enabled());
                    this.actions["actGCiselnikyOdebrat6"].visible(this.actions["actGCiselnikyOdebrat6"].enabled());
                    this.actions["actGCiselnikyObnovit6"].visible(this.actions["actGCiselnikyObnovit6"].enabled());
                    this.actions["actGCiselnikyUpravit6"].visible(this.actions["actGCiselnikyUpravit6"].enabled());
                    this.actions["actGCiselnikyKopirovat6"].visible(this.actions["actGCiselnikyKopirovat6"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions7(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat7"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat7"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit7"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit7"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat7"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat7"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat7"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit7"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit7"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat7"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat7"].visible(this.actions["actGCiselnikyPridat7"].enabled());
                    this.actions["actGCiselnikyOdebrat7"].visible(this.actions["actGCiselnikyOdebrat7"].enabled());
                    this.actions["actGCiselnikyObnovit7"].visible(this.actions["actGCiselnikyObnovit7"].enabled());
                    this.actions["actGCiselnikyUpravit7"].visible(this.actions["actGCiselnikyUpravit7"].enabled());
                    this.actions["actGCiselnikyKopirovat7"].visible(this.actions["actGCiselnikyKopirovat7"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActions8(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat8"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat8"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit8"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit8"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat8"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat8"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebrat8"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit8"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit8"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat8"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat8"].visible(this.actions["actGCiselnikyPridat8"].enabled());
                    this.actions["actGCiselnikyOdebrat8"].visible(this.actions["actGCiselnikyOdebrat8"].enabled());
                    this.actions["actGCiselnikyObnovit8"].visible(this.actions["actGCiselnikyObnovit8"].enabled());
                    this.actions["actGCiselnikyUpravit8"].visible(this.actions["actGCiselnikyUpravit8"].enabled());
                    this.actions["actGCiselnikyKopirovat8"].visible(this.actions["actGCiselnikyKopirovat8"].enabled());
                }
                /**
                 * Metoda pro povolování tlačítek Generování FK nad vybraným řádkem gridu
                 * @param perm Permission
                 */
                enableActionsFK(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridatFK"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebratFK"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovitFK"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravitFK"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovatFK"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        //let ciselnik: Gordic.Ddp.Interface.LK.Dto.Ciselniky.GCiselnikDto = this.mainForm!.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridatFK"].updatePermission({ value: true });
                        this.actions["actGCiselnikyOdebratFK"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovitFK"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravitFK"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovatFK"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridatFK"].visible(this.actions["actGCiselnikyPridatFK"].enabled());
                    this.actions["actGCiselnikyOdebratFK"].visible(this.actions["actGCiselnikyOdebratFK"].enabled());
                    this.actions["actGCiselnikyObnovitFK"].visible(this.actions["actGCiselnikyObnovitFK"].enabled());
                    this.actions["actGCiselnikyUpravitFK"].visible(this.actions["actGCiselnikyUpravitFK"].enabled());
                    this.actions["actGCiselnikyKopirovatFK"].visible(this.actions["actGCiselnikyKopirovatFK"].enabled());
                }
                /**
                 * Ukončení akce
                 * @param act return Akce
                 */
                akceUkonceniAktivniOperace(act) {
                    if (act != null) {
                        WebClient.Common.Base.ProcessResponse(act, this, false)
                            .always(() => {
                            this.refresh();
                        });
                    }
                }
                /**
                 * Ukončení akce
                 * @param act return Akce
                 */
                akcePoZavreniOkna(act) {
                    if (act != null) {
                        act.on("close", (ev, retVal) => {
                            if (retVal) {
                                this.refresh();
                            }
                        });
                    }
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek stránky
                 */
                createActions() {
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGCiselnikyVyhledat",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                this.refresh();
                            }
                        },
                    ]);
                    this.createActionsCiselnikRadku();
                    this.createActionsCiselnikCtvrti();
                    this.createActionsVazbyRadkuACtvrti();
                    this.createActionsSazbyPripadu();
                    this.createActionsTypPhlPrevodVyjimkyKtgUPO();
                    this.createActionsGenerovaniUPO();
                    this.createActionsGenerovaniOPR();
                    this.createActionsGenerovaniFK();
                    this.createActionsPolozkySMLProKatPohybu();
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Číselník řádků"
                 */
                createActionsCiselnikRadku() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat1",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikRadku", { ID: "DDPGCiselnikRadku#", data: { typ_phl: this.typ_phl, ixp_den: this.ixp_den }, editMode: false }, "Nový řádek", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat1",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridCiselnikRadku.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped = row;
                                let act = that.isl.CiselnikRadku.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                ixp_den: rowTyped.ixp_den,
                                                typ_phl: rowTyped.typ_phl,
                                                ddp_radek: rowTyped.ddp_radek
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit1",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let row = this.gridCiselnikRadku.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped = row;
                                rowTyped.aktivita = 100;
                                let act = that.isl.CiselnikRadku.update(rq => {
                                    return {
                                        rq: {
                                            Data: rowTyped
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit1",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridCiselnikRadku.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikRadku", { ID: "DDPGCiselnikRadku#", data: rowTyped, editMode: true }, `Detail řádku ${rowTyped.ddp_radek}`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat1",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                var that = this;
                                let row = this.gridCiselnikRadku.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped = row;
                                var def = $.Deferred();
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyberTypuPohledavky", { ID: "DDPGVyberTypuPohledavky#", typ_phl: rowTyped.typ_phl }, "Výběr zdrojového typu pohledávky", 600, 300)
                                    .on("close", (ev, retVal) => {
                                    if (retVal == null) {
                                        def.reject();
                                        return;
                                    }
                                    let prom = null;
                                    prom = that.isl.CiselnikRadku.copy(rq => { return { rq: { Data: { ixp_den: this.ixp_den, typ_phl: rowTyped.typ_phl, typ_phl_source: retVal.typ_phl } } }; })
                                        .get();
                                    if (prom != null) {
                                        WebClient.Common.Base.ProcessResponse(prom, this, false)
                                            .done(() => {
                                            def.resolve(true);
                                        })
                                            .fail(() => {
                                            def.reject();
                                        });
                                    }
                                    else
                                        def.reject();
                                });
                                let act = def.promise();
                                if (act != null) {
                                    act.done((res) => {
                                        if (res)
                                            this.refresh();
                                    });
                                }
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Číselník čtvrtí"
                 */
                createActionsCiselnikCtvrti() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat2",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikCtvrti", { ID: "DDPGCiselnikCtvrti#", data: { typ_phl: this.typ_phl, ixp_den: this.ixp_den }, editMode: false }, "Nová čtvrť", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat2",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridCiselnikCtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped2 = row;
                                let act = that.isl.CiselnikCtvrti.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                ixp_den: rowTyped2.ixp_den,
                                                typ_phl: rowTyped2.typ_phl,
                                                ddp_ctvrt: rowTyped2.ddp_ctvrt
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit2",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let row = this.gridCiselnikCtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped2 = row;
                                rowTyped2.aktivita = 100;
                                let act = that.isl.CiselnikCtvrti.update(rq => {
                                    return {
                                        rq: {
                                            Data: rowTyped2
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit2",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridCiselnikCtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped2 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikCtvrti", { ID: "DDPGCiselnikCtvrti#", data: rowTyped2, editMode: true }, `Detail čtvrti ${rowTyped2.ddp_ctvrt}`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat2",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                var that = this;
                                let row = this.gridCiselnikCtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                let rowTyped = row;
                                var def = $.Deferred();
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyberTypuPohledavky", { ID: "DDPGVyberTypuPohledavky#", typ_phl: rowTyped.typ_phl }, "Výběr zdrojového typu pohledávky", 600, 300)
                                    .on("close", (ev, retVal) => {
                                    if (retVal == null) {
                                        def.reject();
                                        return;
                                    }
                                    let prom = null;
                                    prom = that.isl.CiselnikCtvrti.copy(rq => { return { rq: { Data: { ixp_den: this.ixp_den, typ_phl: rowTyped.typ_phl, typ_phl_source: retVal.typ_phl } } }; })
                                        .get();
                                    if (prom != null) {
                                        WebClient.Common.Base.ProcessResponse(prom, this, false)
                                            .done(() => {
                                            def.resolve(true);
                                        })
                                            .fail(() => {
                                            def.reject();
                                        });
                                    }
                                    else
                                        def.reject();
                                });
                                let act = def.promise();
                                if (act != null) {
                                    act.done((res) => {
                                        if (res)
                                            this.refresh();
                                    });
                                }
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Vazby řádků a čtvrtí"
                 */
                createActionsVazbyRadkuACtvrti() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat3",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVazbyRadkuACtvrti", { ID: "DDPGVazbyRadkuACtvrti#", data: { typ_phl: this.typ_phl, ixp_den: this.ixp_den }, editMode: false }, "Nová vazba", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat3",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridVazbyRadkuACtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped3 = row;
                                let act = that.isl.VazbyRadkuACtvrti.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                ixp_den: rowTyped3.ixp_den,
                                                typ_phl: rowTyped3.typ_phl,
                                                ddp_radek: rowTyped3.ddp_radek,
                                                ddp_ctvrt: rowTyped3.ddp_ctvrt
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit3",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let row = this.gridVazbyRadkuACtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped3 = row;
                                rowTyped3.aktivita = 100;
                                let act = that.isl.VazbyRadkuACtvrti.update(rq => {
                                    return {
                                        rq: {
                                            Data: rowTyped3
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit3",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridVazbyRadkuACtvrti.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped3 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVazbyRadkuACtvrti", { ID: "DDPGVazbyRadkuACtvrti#", data: rowTyped3, editMode: true }, "Detail vazby", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat3",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //let row = this.gridVazbyRadkuACtvrti.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.kopirovatAction();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Sazby případů"
                 */
                createActionsSazbyPripadu() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat4",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GSazbyPripadu", { ID: "DDPGSazbyPripadu#", data: { typ_phl: this.typ_phl }, editMode: false }, "Nová sazba", 850, 500);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat4",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridSazbyPripadu.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped4 = row;
                                let act = that.isl.SazbyPripadu.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                typ_phl: rowTyped4.typ_phl,
                                                cis_sazby: rowTyped4.cis_sazby
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit4",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let row = this.gridSazbyPripadu.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped4 = row;
                                rowTyped4.aktivita = 100;
                                let act = that.isl.SazbyPripadu.update(rq => {
                                    return {
                                        rq: {
                                            Data: rowTyped4
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit4",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridSazbyPripadu.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped4 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GSazbyPripadu", { ID: "DDPGSazbyPripadu#", data: rowTyped4, editMode: true }, `Detail sazby ${rowTyped4.cis_sazby}`, 850, 500);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat4",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //let row = this.gridSazbyPripadu.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.kopirovatAction();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Typ phl. převod výjimky ktg. UPO"
                 */
                createActionsTypPhlPrevodVyjimkyKtgUPO() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat5",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyjimkyKategoriiPohybu", { ID: "DDPGVyjimkyKategoriiPohybu#", data: { typ_phl_z: this.typ_phl }, editMode: false }, "Nová výjimka", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat5",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridTypPhlPrevodVyjimkyKtgUPO.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped5 = row;
                                let act = that.isl.VyjimkyKategoriiPohybu.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                typ_phl_z: rowTyped5.typ_phl_z,
                                                typ_phl_do: rowTyped5.typ_phl_do,
                                                ktg_upo_z: rowTyped5.ktg_upo_z,
                                                ktg_upo_do: rowTyped5.ktg_upo_do
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit5",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let row = this.gridTypPhlPrevodVyjimkyKtgUPO.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped5 = row;
                                rowTyped5.aktivita = 100;
                                let act = that.isl.VyjimkyKategoriiPohybu.update(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                typ_phl_z: rowTyped5.typ_phl_z,
                                                typ_phl_do: rowTyped5.typ_phl_do,
                                                ktg_upo_z: rowTyped5.ktg_upo_z,
                                                ktg_upo_do: rowTyped5.ktg_upo_do,
                                                editedData: rowTyped5
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit5",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridTypPhlPrevodVyjimkyKtgUPO.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped5 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyjimkyKategoriiPohybu", { ID: "DDPGVyjimkyKategoriiPohybu#", data: rowTyped5, editMode: true }, `Detail výjimky ${rowTyped5.typ_phl_z} -> ${rowTyped5.typ_phl_do}, ${rowTyped5.ktg_upo_z} -> ${rowTyped5.ktg_upo_do}`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat5",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //let row = this.gridTypPhlPrevodVyjimkyKtgUPO.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.kopirovatAction();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Generování UPO"
                 */
                createActionsGenerovaniUPO() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat6",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniUPO", { ID: "DDPGGenerovaniUPO#", data: { typ_phl: this.typ_phl, rok: this.rok, ico: this.ico, ucs: this.ucs }, editMode: false }, "Nový záznam", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat6",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridGenerovaniUPO.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped6 = row;
                                let act = that.isl.GenerovaniUPO.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                typ_phl: rowTyped6.typ_phl,
                                                rok: rowTyped6.rok,
                                                ucs: rowTyped6.ucs,
                                                ico: rowTyped6.ico,
                                                ktg_upo: rowTyped6.ktg_upo
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit6",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                //let row = this.gridGenerovaniUPO.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.obnovitAction();
                                //this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit6",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridGenerovaniUPO.ggrid("activeRow");
                                if (row == null)
                                    return;
                                let rowTyped6 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniUPO", { ID: "DDP#GGenerovaniUPO", data: rowTyped6, editMode: true }, `Detail záznamu`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat6",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //let row = this.gridGenerovaniUPO.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.kopirovatAction();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Generování OPR"
                 */
                createActionsGenerovaniOPR() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat7",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniOPR", { ID: "DDPGGenerovaniOPR#", data: { typ_phl: this.typ_phl, rok: this.rok, ico: this.ico, ucs: this.ucs }, editMode: false }, "Nový záznam", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat7",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridGenerovaniOPR.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped7 = row;
                                let act = that.isl.GenerovaniOPR.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                typ_phl: rowTyped7.typ_phl,
                                                rok: rowTyped7.rok,
                                                ucs: rowTyped7.ucs,
                                                ico: rowTyped7.ico,
                                                ktg_upo: rowTyped7.ktg_upo
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit7",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                //let row = this.gridGenerovaniOPR.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.obnovitAction();
                                //this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit7",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridGenerovaniOPR.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped7 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniOPR", { ID: "DDPGGenerovaniOPR#", data: rowTyped7, editMode: true }, `Detail záznamu`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat7",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //let row = this.gridGenerovaniOPR.ggrid("activeRow");
                                //if (row == null)
                                //return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.kopirovatAction();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Generování FK"
                 */
                createActionsGenerovaniFK() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridatFK",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniFK", { ID: "DDPGGenerovaniFK#", data: { typ_phl: that.typ_phl, rok: that.rok, ico: that.ico, ucs: that.ucs }, editMode: false }, "Nový záznam", 600, 300);
                                that.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebratFK",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridGenerovaniFK.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTypedFK = row;
                                let act = that.isl.GenerovaniFK.delete(rq => {
                                    return {
                                        data: {
                                            typ_phl: rowTypedFK.typ_phl,
                                            rok: rowTypedFK.rok,
                                            ucs: rowTypedFK.ucs,
                                            ico: rowTypedFK.ico,
                                            ktg_upo: rowTypedFK.ktg_upo
                                        }
                                    };
                                }).get();
                                // this.akceUkonceniAktivniOperace(act); // <- nejedná se o GResponse operaci
                                if (act != null) {
                                    act.fail((jqXHR, typ, obj) => {
                                        WebClient.Common.Base.getFailFromIsl(that, jqXHR, typ, obj);
                                    }).done((retData) => {
                                        if (!retData) {
                                            // Pokud se mi nevrátili žádné data, vyhodím vyjímku
                                            return that.dialogs.error("Aplikační chyba", "Server nevrátil žádná data");
                                        }
                                        else {
                                            // Pokud nemám informaci o úspěchu operace, začnu zjišťovat důvod
                                            if (retData.result?.kind != 200) {
                                                // Zjistím zda mám nějaké zpráchy o chybě
                                                if (retData.result?.errors.length > 0) {
                                                    // A v cyklu si je přidám do stringu který vyhodím v okně chyby
                                                    let errorMsg = "";
                                                    retData.result?.errors.forEach((msg) => {
                                                        errorMsg += msg.message + " <br>";
                                                    });
                                                    return that.dialogs.error("Chyba", errorMsg);
                                                }
                                                return that.dialogs.error("Chyba", "Neznámá chyba");
                                            }
                                            else {
                                                return that.close(true); // pokud je úspěch zavřu okno (true poslám aby se vědělo že nejde o obyčejné zavření okna)
                                            }
                                        }
                                    });
                                }
                            }
                        },
                        {
                            name: "actGCiselnikyObnovitFK",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                //let row = this.gridGenerovaniFK.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.obnovitAction();
                                //this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravitFK",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridGenerovaniFK.ggrid("activeRow");
                                if (row == null)
                                    return;
                                let rowTypedFK = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniFK", { ID: "DDP#GGenerovaniFK", data: rowTypedFK, editMode: true }, `Detail záznamu`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovatFK",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //var that = this;
                                //let row = this.gridGenerovaniFK.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek", "Vyberte řádek číselníku.");
                                //let rowTyped = <{ typ_phl: string | null | undefined }>row;
                                //var def = $.Deferred();
                                //this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyberTypuPohledavky", { ID: "DDPGVyberTypuPohledavky#", typ_phl: rowTyped.typ_phl }, "Výběr zdrojového typu pohledávky", 600, 300)
                                //    .on("close", (ev, retVal) => {
                                //        if (retVal == null) {
                                //            def.reject();
                                //            return;
                                //        }
                                //        let prom: JQueryPromise<any> | null = null;
                                //        prom = that.isl.GenerovaniFK.copy(rq => { return { data: { ixp_den: this.ixp_den, typ_phl: rowTyped.typ_phl, typ_phl_source: retVal.typ_phl } }; })
                                //            .get();
                                //        if (prom != null) {
                                //            Common.Base.ProcessResponse(prom, this, false)
                                //                .done(() => {
                                //                    def.resolve(true);
                                //                })
                                //                .fail(() => {
                                //                    def.reject();
                                //                });
                                //        }
                                //        else
                                //            def.reject();
                                //    });
                                //let act = def.promise();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //            this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření akcí tlačítek nad ggridem pro "Položky SML pro kat. pohybů"
                 */
                createActionsPolozkySMLProKatPohybu() {
                    const that = this;
                    this.actions.addRange([
                        {
                            name: "actGCiselnikyPridat8",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GPolozkySML", { ID: "DDPGPolozkySML#", data: { typ_phl: this.typ_phl }, editMode: false }, "Nový záznam", 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat8",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let row = this.gridPolozkySMLProKatPohybu.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped8 = row;
                                let act = that.isl.PolozkySML.delete(rq => {
                                    return {
                                        rq: {
                                            Data: {
                                                typ_phl: rowTyped8.typ_phl,
                                                ktg_upo: rowTyped8.ktg_upo
                                            }
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit8",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let row = this.gridPolozkySMLProKatPohybu.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped6 = row;
                                let act = that.isl.PolozkySML.update(rq => {
                                    return {
                                        rq: {
                                            Data: rowTyped6
                                        }
                                    };
                                }).get();
                                this.akceUkonceniAktivniOperace(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit8",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let row = this.gridPolozkySMLProKatPohybu.ggrid("activeRow");
                                if (row == null)
                                    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");
                                ;
                                let rowTyped8 = row;
                                let act = this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GPolozkySML", { ID: "DDPGPolozkySML#", data: rowTyped8, editMode: true }, `Detail záznamu`, 600, 300);
                                this.akcePoZavreniOkna(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat8",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                //let row = this.gridPolozkySMLProKatPohybu.ggrid("activeRow");
                                //if (row == null)
                                //    return this.dialogs.error("Vyberte řádek číselníku", "Vyberte řádek číselníku.");;
                                //let act = this.kopirovatAction();
                                //if (act != null) {
                                //    act.done((res) => {
                                //        if (res)
                                //this.refresh();
                                //    });
                                //}
                            }
                        }
                    ]);
                }
            };
            GCiselniky = __decorate([
                Decorators.gcontent
            ], GCiselniky);
            WebClient.GCiselniky = GCiselniky;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Npc2VsbmlreS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdDaXNlbG5pa3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0EreUVmO0FBL3lFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EreUVuQjtJQS95RWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQSt5RTdCO1FBL3lFb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBK0N4QyxvREFBb0Q7Z0JBQ3BELGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHLDZCQUE2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3pELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLCtDQUErQztvQkFFL0gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsdUNBQXVDO2dCQUN2QyxVQUFVO29CQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUV0QixJQUFJLEtBQUssR0FBRyxDQUFDLE1BQWUsSUFBSSxFQUFFLEVBQUU7d0JBQ2hDLElBQUksTUFBTSxHQUFROzRCQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDeEIsQ0FBQzt3QkFFRixJQUFJLEdBQUc7NEJBQ0gsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFFL0csT0FBTyxFQUFFLENBQUMsRUFBRTs0QkFDUixPQUFPO2dDQUNILE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUM7Z0NBQzdCLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7NkJBQ2xDLENBQUM7d0JBQ04sQ0FBQyxDQUFDO29CQUNOLENBQUMsQ0FBQztvQkFDRixvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUM3RTt3QkFDSSxVQUFVLEVBQUU7NEJBQ1IsbUJBQW1CLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUN4RTtxQkFDSixDQUFDLENBQUM7b0JBQ1AscUJBQXFCO29CQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFDL0U7d0JBQ0ksVUFBVSxFQUFFOzRCQUNSLG1CQUFtQixFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDeEU7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLHdCQUF3QjtvQkFDeEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFDckY7d0JBQ0ksVUFBVSxFQUFFOzRCQUNSLG1CQUFtQixFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDeEU7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLG1CQUFtQjtvQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQzNFO3dCQUNJLFVBQVUsRUFBRTs0QkFDUixtQkFBbUIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7eUJBQ3hFO3FCQUNKLENBQUMsQ0FBQztvQkFDUCw2QkFBNkI7b0JBQzdCLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQ2xHO3dCQUNJLFVBQVUsRUFBRTs0QkFDUixtQkFBbUIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7eUJBQ3hFO3FCQUNKLENBQUMsQ0FBQztvQkFDUCxvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDbEY7d0JBQ0ksVUFBVSxFQUFFOzRCQUNSLG1CQUFtQixFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDeEU7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNsRjt3QkFDSSxVQUFVLEVBQUU7NEJBQ1IsbUJBQW1CLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUN4RTtxQkFDSixDQUFDLENBQUM7b0JBQ1AsbUJBQW1CO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFDM0U7d0JBQ0ksVUFBVSxFQUFFOzRCQUNSLG1CQUFtQixFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDeEU7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLGlCQUFpQjtvQkFDakIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN4Rjt3QkFDSSxVQUFVLEVBQUU7NEJBQ1IsbUJBQW1CLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUN4RTtxQkFDSixDQUFDLENBQUE7b0JBQ04sZ0JBQWdCO29CQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRUQsaURBQWlEO2dCQUNqRCxtQ0FBbUM7Z0JBQ25DLFlBQVk7b0JBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixjQUFjO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lCQUM3RSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFO3dCQUNuRCxJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsNkJBQTZCO3dCQUNwQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ2hCLGlCQUFpQjt3QkFDckIsQ0FBQztxQkFDSixDQUFDO3lCQUNELE1BQU0sRUFBRTt5QkFDUixRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoQixJQUFJLEVBQUUsZUFBZTt3QkFDckIsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsWUFBWSxFQUFFLEtBQUs7d0JBQ25CLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsTUFBTSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO3lCQUNoQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSw4QkFBOEIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUVqSyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMvQixZQUFZO2dCQUNoQixDQUFDO2dCQUVELFVBQVU7b0JBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQix3QkFBd0I7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDO3dCQUM1RCxNQUFNLEVBQUU7NEJBQ0osRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFOzRCQUN2RCxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUU7NEJBQ3pELEVBQUUsRUFBRSxFQUFFLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs0QkFDakUsRUFBRSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRTs0QkFDckQsRUFBRSxFQUFFLEVBQUUsZ0NBQWdDLEVBQUUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFOzRCQUNyRixFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUU7NEJBQ3ZELEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTs0QkFDdkQsRUFBRSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRTs0QkFDckQsRUFBRSxFQUFFLEVBQUUsNkJBQTZCLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFO3lCQUNoRjt3QkFDRCxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU87cUJBQzdCLENBQUMsQ0FBQztvQkFDSCxZQUFZO29CQUVaLDhCQUE4QjtvQkFDOUIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3JELFVBQVUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUU7d0JBQ25DLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUN0Qiw4R0FBOEc7NEJBQzlHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2hELENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO3lCQUM5QixRQUFRLENBQUMsa0JBQWtCLENBQUM7eUJBQzVCLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQzt5QkFDbEMsS0FBSyxDQUFDO3dCQUNILHlCQUF5Qjt3QkFDekIsSUFBSSxFQUFFLDRDQUE0Qzt3QkFDbEQsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7d0JBQzVCLE9BQU8sRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO3dCQUN6RCxjQUFjLEVBQUUsSUFBSSxDQUFDLGlCQUFpQiw2RUFBcUU7d0JBQzNHLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3dCQUVwRCxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMzRixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsSUFBSSxDQUFDO3dCQUNGLEtBQUssRUFBRSxFQUFFO3dCQUNULE1BQU0sRUFBRSxJQUFJO3dCQUNaLE9BQU8sRUFDSDs0QkFDSTtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztnQ0FDNUMsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDO2dDQUMvQyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7eUJBQ0o7cUJBQ1IsQ0FBQyxDQUFDO29CQUNQLFlBQVk7b0JBRVosK0JBQStCO29CQUMvQixJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEQsVUFBVSxDQUFDO3dCQUNSLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsRUFBRTt3QkFDcEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ3RCLGdIQUFnSDs0QkFDaEgsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDdEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDakQsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQy9CLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQzt5QkFDN0IsUUFBUSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO3lCQUNsQyxLQUFLLENBQUM7d0JBQ0gseUJBQXlCO3dCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjt3QkFDN0IsSUFBSSxFQUFFLDRDQUE0Qzt3QkFDbEQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7d0JBQzFELGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLDhFQUFzRTt3QkFDNUcsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7d0JBQ3BELFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNGLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxJQUFJLENBQUM7d0JBQ0YsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUk7d0JBQ1osT0FBTyxFQUNIOzRCQUNJO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2dDQUM1QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7Z0NBQy9DLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjt5QkFDSjtxQkFDUixDQUFDLENBQUM7b0JBQ1AsWUFBWTtvQkFFWixvQ0FBb0M7b0JBQ3BDLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN6RCxVQUFVLENBQUM7d0JBQ1IsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLHdCQUF3QixFQUFFO3dCQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDdEIsc0hBQXNIOzRCQUN0SCxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN6RCxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNwRCxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDbEMsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3lCQUNoQyxRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQ2xDLEtBQUssQ0FBQzt3QkFDSCx5QkFBeUI7d0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMscUJBQXFCO3dCQUNoQyxJQUFJLEVBQUUsZ0RBQWdEO3dCQUN0RCxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO3dCQUM3RCxjQUFjLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixpRkFBeUU7d0JBQy9HLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3dCQUNwRCxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMzRixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsSUFBSSxDQUFDO3dCQUNGLEtBQUssRUFBRSxFQUFFO3dCQUNULE1BQU0sRUFBRSxJQUFJO3dCQUNaLE9BQU8sRUFDSDs0QkFDSTtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztnQ0FDNUMsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDO2dDQUMvQyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7eUJBQ0o7cUJBQ1IsQ0FBQyxDQUFDO29CQUNQLFlBQVk7b0JBRVosNkJBQTZCO29CQUM3QixJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDcEQsVUFBVSxDQUFDO3dCQUNSLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRTt3QkFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9DLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO3lCQUM3QixRQUFRLENBQUMsaUJBQWlCLENBQUM7eUJBQzNCLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQzt5QkFDbEMsS0FBSyxDQUFDO3dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3dCQUMzQixJQUFJLEVBQUUsMkNBQTJDO3dCQUNqRCxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRTt3QkFDeEQsY0FBYyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsNEVBQW9FO3dCQUMxRyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDcEQsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDM0YsQ0FBQztxQkFDSixDQUFDO3lCQUNELElBQUksQ0FBQzt3QkFDRixLQUFLLEVBQUUsRUFBRTt3QkFDVCxNQUFNLEVBQUUsSUFBSTt3QkFDWixPQUFPLEVBQ0g7NEJBQ0k7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7Z0NBQzVDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztnQ0FDL0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCO3lCQUNKO3FCQUNSLENBQUMsQ0FBQztvQkFDUCxZQUFZO29CQUVaLGdEQUFnRDtvQkFDaEQsSUFBSSw4QkFBOEIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ2pFLFVBQVUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsZ0NBQWdDLEVBQUU7d0JBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUN0QixJQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNqRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM1RCxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsNkJBQTZCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDMUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDO3lCQUN4QyxRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQ2xDLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLDZCQUE2Qjt3QkFDeEMsSUFBSSxFQUFFLHFEQUFxRDt3QkFDM0QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRTt3QkFDbEUsY0FBYyxFQUFFLElBQUksQ0FBQyxpQkFBaUIseUZBQWlGO3dCQUN2SCxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDcEQsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDM0YsQ0FBQztxQkFDSixDQUFDO3lCQUNELElBQUksQ0FBQzt3QkFDRixLQUFLLEVBQUUsRUFBRTt3QkFDVCxNQUFNLEVBQUUsSUFBSTt3QkFDWixPQUFPLEVBQ0g7NEJBQ0k7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7Z0NBQzVDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztnQ0FDL0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCO3lCQUNKO3FCQUNSLENBQUMsQ0FBQztvQkFDUCxZQUFZO29CQUVaLDhCQUE4QjtvQkFDOUIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3JELFVBQVUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUU7d0JBQ25DLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNyRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNoRCxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDOUIsUUFBUSxDQUFDLGtCQUFrQixDQUFDO3lCQUM1QixRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQ2xDLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjt3QkFDNUIsSUFBSSxFQUFFLDRDQUE0Qzt3QkFDbEQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUU7d0JBQ3pELGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLDZFQUFxRTt3QkFDM0csYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7d0JBQ3BELFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNGLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxJQUFJLENBQUM7d0JBQ0YsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUk7d0JBQ1osT0FBTyxFQUNIOzRCQUNJO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2dDQUM1QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7Z0NBQy9DLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjt5QkFDSjtxQkFDUixDQUFDLENBQUM7b0JBQ1AsWUFBWTtvQkFFWiw4QkFBOEI7b0JBQzlCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUNyRCxVQUFVLENBQUM7d0JBQ1IsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFO3dCQUNuQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQzlCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDNUIsUUFBUSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO3lCQUNsQyxLQUFLLENBQUM7d0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7d0JBQzVCLElBQUksRUFBRSw0Q0FBNEM7d0JBQ2xELE9BQU8sRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO3dCQUN6RCxjQUFjLEVBQUUsSUFBSSxDQUFDLGlCQUFpQiw2RUFBcUU7d0JBQzNHLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3dCQUNwRCxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMzRixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsSUFBSSxDQUFDO3dCQUNGLEtBQUssRUFBRSxFQUFFO3dCQUNULE1BQU0sRUFBRSxJQUFJO3dCQUNaLE9BQU8sRUFDSDs0QkFDSTtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztnQ0FDNUMsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDO2dDQUMvQyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7eUJBQ0o7cUJBQ1IsQ0FBQyxDQUFDO29CQUNQLFlBQVk7b0JBRVosNkJBQTZCO29CQUM3QixJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDcEQsVUFBVSxDQUFDO3dCQUNSLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRTt3QkFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9DLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO3lCQUM3QixRQUFRLENBQUMsaUJBQWlCLENBQUM7eUJBQzNCLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQzt5QkFDbEMsS0FBSyxDQUFDO3dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3dCQUMzQixJQUFJLEVBQUUsMkNBQTJDO3dCQUNqRCxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRTt3QkFDeEQsY0FBYyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsNEVBQW9FO3dCQUMxRyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQzt3QkFDckQsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDNUYsQ0FBQztxQkFDSixDQUFDO3lCQUNELElBQUksQ0FBQzt3QkFDRixLQUFLLEVBQUUsRUFBRTt3QkFDVCxNQUFNLEVBQUUsSUFBSTt3QkFDWixPQUFPLEVBQ0g7NEJBQ0k7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztnQ0FDOUMsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO2dDQUM5QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7Z0NBQzlDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztnQ0FDaEQsUUFBUSxFQUFFLElBQUk7NkJBQ2pCO3lCQUNKO3FCQUNSLENBQUMsQ0FBQztvQkFDUCxZQUFZO29CQUVaLDJDQUEyQztvQkFDM0MsSUFBSSwyQkFBMkIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQzlELFVBQVUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsNkJBQTZCLEVBQUU7d0JBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUN0QixJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUM5RCxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN6RCxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDdkMsUUFBUSxDQUFDLDJCQUEyQixDQUFDO3lCQUNyQyxRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQ2xDLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjt3QkFDckMsSUFBSSxFQUFFLHFEQUFxRDt3QkFDM0QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7d0JBQ3RELGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLHNGQUE4RTt3QkFDcEgsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7d0JBQ3BELFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzNGLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxJQUFJLENBQUM7d0JBQ0YsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUk7d0JBQ1osT0FBTyxFQUNIOzRCQUNJO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2dDQUM1QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjs0QkFDRDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDN0MsUUFBUSxFQUFFLElBQUk7NkJBQ2pCOzRCQUNEO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUM3QyxRQUFRLEVBQUUsSUFBSTs2QkFDakI7NEJBQ0Q7Z0NBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7Z0NBQy9DLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjt5QkFDSjtxQkFDUixDQUFDLENBQUM7b0JBQ1AsWUFBWTtvQkFHWixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUN0RyxDQUFDO2dCQUVPLGlCQUFpQixDQUFDLFFBQStEO29CQUNyRixRQUFRLFFBQVEsRUFBRSxDQUFDO3dCQUNmOzRCQUNJLE9BQU87Z0NBQ0gsVUFBVSxFQUFFLCtDQUErQztnQ0FDM0QsVUFBVSxFQUFFLElBQUk7Z0NBQ2hCLFdBQVcsRUFDUCxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUNuQixFQUFFLElBQUksRUFBRSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLHdFQUF3RSxFQUFFLEVBQUUsQ0FDMUs7NkJBQ1IsQ0FBQzt3QkFDTjs0QkFDSSxPQUFPO2dDQUNILFVBQVUsRUFBRSwrQ0FBK0M7Z0NBQzNELFVBQVUsRUFBRSxJQUFJO2dDQUNoQixXQUFXLEVBQ1AsT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FDbkIsRUFBRSxJQUFJLEVBQUUsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSx3RUFBd0UsRUFBRSxFQUFFLENBQzFLOzZCQUNSLENBQUM7d0JBQ047NEJBQ0ksT0FBTztnQ0FDSCxVQUFVLEVBQUUsbURBQW1EO2dDQUMvRCxVQUFVLEVBQUUsSUFBSTs2QkFFbkIsQ0FBQzt3QkFDTjs0QkFDSSxPQUFPO2dDQUNILFVBQVUsRUFBRSxnSUFBZ0k7Z0NBQzVJLFVBQVUsRUFBRSxJQUFJO2dDQUNoQixXQUFXLEVBQ1AsT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FDbkIsRUFBRSxJQUFJLEVBQUUsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSx3RUFBd0UsRUFBRSxFQUFFLENBQzFLOzZCQUNSLENBQUM7d0JBQ047NEJBQ0ksT0FBTztnQ0FDSCxVQUFVLEVBQUUsZ0VBQWdFO2dDQUM1RSxVQUFVLEVBQUUsSUFBSTtnQ0FDaEIsV0FBVyxFQUNQLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQ25CLEVBQUUsSUFBSSxFQUFFLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsd0VBQXdFLEVBQUUsRUFBRSxDQUMxSzs2QkFDUixDQUFDLENBQUMsbUJBQW1CO3dCQUMxQjs0QkFDSSxPQUFPO2dDQUNILFVBQVUsRUFBRSwrQ0FBK0M7Z0NBQzNELFVBQVUsRUFBRSxJQUFJO2dDQUNoQiw2Q0FBNkM7Z0NBQzdDLHNNQUFzTTs2QkFDek0sQ0FBQzt3QkFDTjs0QkFDSSxPQUFPO2dDQUNILFVBQVUsRUFBRSwrQ0FBK0M7Z0NBQzNELFVBQVUsRUFBRSxJQUFJO2dDQUNoQiw2Q0FBNkM7Z0NBQzdDLHNNQUFzTTs2QkFDek0sQ0FBQzt3QkFDTjs0QkFDSSxPQUFPO2dDQUNILFVBQVUsRUFBRSxtREFBbUQsRUFBRywwQkFBMEI7Z0NBQzVGLFVBQVUsRUFBRSxJQUFJO2dDQUNoQixXQUFXLEVBQ1AsT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FDbkIsRUFBRSxJQUFJLEVBQUUsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSx3RUFBd0UsRUFBRSxFQUFFLENBQzFLOzZCQUNSLENBQUM7d0JBQ047NEJBQ0ksT0FBTztnQ0FDSCxVQUFVLEVBQUUsMkJBQTJCO2dDQUN2QyxVQUFVLEVBQUUsSUFBSTtnQ0FDaEIsY0FBYztnQ0FDZCw4QkFBOEI7Z0NBQzlCLGlMQUFpTDtnQ0FDakwsT0FBTzs2QkFDVixDQUFDO3dCQUNOOzRCQUNJLE9BQU8sU0FBUyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsc0NBQXNDO2dCQUN0QyxPQUFPO29CQUNILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxNQUFNLEdBQTRDLEVBQUUsQ0FBQztvQkFFekQsSUFBSSxDQUFDLFFBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBRXpFLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJO3dCQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7d0JBQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUM5RixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBRXZCLDZHQUE2RztvQkFDN0csSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUUvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtvQkFDL0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7b0JBQ2pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO29CQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtvQkFDN0QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUE7b0JBQ3ZGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO29CQUMvRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtvQkFDL0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7b0JBQzdELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO29CQUdqRixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsaURBQWlEO2dCQUN6QyxlQUFlO29CQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLDZCQUE2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRXpELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO3lCQUN0QixDQUFDLENBQUMsQ0FBQztnQkFDUixDQUFDO2dCQUVELDJCQUEyQjtnQkFDM0IsNkJBQTZCO2dCQUM3Qjs7O21CQUdHO2dCQUNLLGNBQWMsQ0FBQyxJQUFTO29CQUM1QixJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQy9FLENBQUM7eUJBQU0sQ0FBQzt3QkFDSiw4SEFBOEg7d0JBQzlILElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDaEYsQ0FBQztvQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RyxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssY0FBYyxDQUFDLElBQVM7b0JBQzVCLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDL0UsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLDhIQUE4SDt3QkFDOUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixDQUFDO29CQUVELElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQy9GLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3pHLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxjQUFjLENBQUMsSUFBUztvQkFDNUIsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMvRSxDQUFDO3lCQUFNLENBQUM7d0JBQ0osOEhBQThIO3dCQUM5SCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2hGLENBQUM7b0JBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDekcsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGNBQWMsQ0FBQyxJQUFTO29CQUM1QixJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQy9FLENBQUM7eUJBQU0sQ0FBQzt3QkFDSiw4SEFBOEg7d0JBQzlILElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDaEYsQ0FBQztvQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RyxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssY0FBYyxDQUFDLElBQVM7b0JBQzVCLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDL0UsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLDhIQUE4SDt3QkFDOUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixDQUFDO29CQUVELElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQy9GLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3pHLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxjQUFjLENBQUMsSUFBUztvQkFDNUIsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMvRSxDQUFDO3lCQUFNLENBQUM7d0JBQ0osOEhBQThIO3dCQUM5SCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2hGLENBQUM7b0JBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDekcsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGNBQWMsQ0FBQyxJQUFTO29CQUM1QixJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQy9FLENBQUM7eUJBQU0sQ0FBQzt3QkFDSiw4SEFBOEg7d0JBQzlILElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDaEYsQ0FBQztvQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RyxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssY0FBYyxDQUFDLElBQVM7b0JBQzVCLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDL0UsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLDhIQUE4SDt3QkFDOUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixDQUFDO29CQUVELElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQy9GLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3pHLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxlQUFlLENBQUMsSUFBUztvQkFDN0IsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUM3RSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNoRixDQUFDO3lCQUFNLENBQUM7d0JBQ0osOEhBQThIO3dCQUM5SCxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2pGLENBQUM7b0JBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDbkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDbkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDbkcsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDM0csQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNLLDBCQUEwQixDQUFDLEdBQXNFO29CQUNyRyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDZCxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDOzZCQUN4QyxNQUFNLENBQUMsR0FBRyxFQUFFOzRCQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDTCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssaUJBQWlCLENBQUMsR0FBb0M7b0JBQzFELElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNkLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFOzRCQUMzQixJQUFJLE1BQU0sRUFBRSxDQUFDO2dDQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDbkIsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNLLGFBQWE7b0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsNEJBQTRCOzRCQUNsQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDOzRCQUNuQyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ25CLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFBO29CQUNqQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQTtvQkFDbEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUE7b0JBQ3JDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO29CQUNoQyxJQUFJLENBQUMsc0NBQXNDLEVBQUUsQ0FBQTtvQkFDN0MsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUE7b0JBQ2pDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFBO29CQUNqQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtvQkFDaEMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLENBQUE7Z0JBQzlDLENBQUM7Z0JBQ0Q7O21CQUVHO2dCQUNLLDBCQUEwQjtvQkFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEI7NEJBQ0ksSUFBSSxFQUFFLHNCQUFzQjs0QkFDNUIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxTQUFTOzRCQUNmLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMscUNBQXFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDN00sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNoQyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNwRCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FDckYsSUFBSSxRQUFRLEdBQWtELEdBQUcsQ0FBQztnQ0FDbEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUN6QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUU7Z0RBQ0YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2dEQUN6QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0RBQ3pCLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUzs2Q0FDaEM7eUNBQ0o7cUNBQ0osQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxZQUFZOzRCQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3BELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUNyRixJQUFJLFFBQVEsR0FBa0QsR0FBRyxDQUFDO2dDQUNsRSxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUN6QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUUsUUFBUTt5Q0FDakI7cUNBQ0osQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxXQUFXOzRCQUNqQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3BELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUNyRixJQUFJLFFBQVEsR0FBa0QsR0FBRyxDQUFDO2dDQUNsRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDNUwsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNoQyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx5QkFBeUI7NEJBQy9CLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0NBQ2hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3BELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUNyRixJQUFJLFFBQVEsR0FBMkMsR0FBRyxDQUFDO2dDQUMzRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLDhEQUE4RCxFQUFFLEVBQUUsRUFBRSxFQUFFLDBCQUEwQixFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsa0NBQWtDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztxQ0FDcE0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtvQ0FDeEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ2pCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3Q0FDYixPQUFPO29DQUNYLENBQUM7b0NBQ0QsSUFBSSxJQUFJLEdBQThCLElBQUksQ0FBQztvQ0FDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5Q0FDdkosR0FBRyxFQUFFLENBQUM7b0NBQ1gsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ2YsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQzs2Q0FDekMsSUFBSSxDQUFDLEdBQUcsRUFBRTs0Q0FDUCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dDQUN0QixDQUFDLENBQUM7NkNBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTs0Q0FDUCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7d0NBQ2pCLENBQUMsQ0FBQyxDQUFDO29DQUNYLENBQUM7O3dDQUVHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDckIsQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUN4QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDZCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0NBQ2IsSUFBSSxHQUFHOzRDQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDdkIsQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNEOzttQkFFRztnQkFDSywyQkFBMkI7b0JBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCOzRCQUNJLElBQUksRUFBRSxzQkFBc0I7NEJBQzVCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHNDQUFzQyxFQUFFLEVBQUUsRUFBRSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQy9NLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDckQsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0NBQ3JGLElBQUksU0FBUyxHQUFtRCxHQUFHLENBQUM7Z0NBQ3BFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQ0FDMUMsT0FBTzt3Q0FDSCxFQUFFLEVBQUU7NENBQ0EsSUFBSSxFQUFFO2dEQUNGLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTztnREFDMUIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dEQUMxQixTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7NkNBQ2pDO3lDQUNKO3FDQUNKLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ1QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNyRCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FDckYsSUFBSSxTQUFTLEdBQW1ELEdBQUcsQ0FBQztnQ0FDcEUsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0NBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQ0FDMUMsT0FBTzt3Q0FDSCxFQUFFLEVBQUU7NENBQ0EsSUFBSSxFQUFFLFNBQVM7eUNBQ2xCO3FDQUNKLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ1QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsV0FBVzs0QkFDakIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNyRCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FDckYsSUFBSSxTQUFTLEdBQW1ELEdBQUcsQ0FBQztnQ0FDcEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsc0NBQXNDLEVBQUUsRUFBRSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsaUJBQWlCLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ2pNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUseUJBQXlCOzRCQUMvQixPQUFPLEVBQUUsV0FBVzs0QkFDcEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO2dDQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNyRCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FDckYsSUFBSSxRQUFRLEdBQTJDLEdBQUcsQ0FBQztnQ0FDM0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyw4REFBOEQsRUFBRSxFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLGtDQUFrQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7cUNBQ3BNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0NBQ3hCLElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO3dDQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7d0NBQ2IsT0FBTztvQ0FDWCxDQUFDO29DQUNELElBQUksSUFBSSxHQUE4QixJQUFJLENBQUM7b0NBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ3hKLEdBQUcsRUFBRSxDQUFDO29DQUNYLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO3dDQUNmLFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7NkNBQ3pDLElBQUksQ0FBQyxHQUFHLEVBQUU7NENBQ1AsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDdEIsQ0FBQyxDQUFDOzZDQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7NENBQ1AsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dDQUNqQixDQUFDLENBQUMsQ0FBQztvQ0FDWCxDQUFDOzt3Q0FFRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0NBQ3JCLENBQUMsQ0FBQyxDQUFDO2dDQUVQLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FDeEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dDQUNiLElBQUksR0FBRzs0Q0FDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dDQUNQLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0ssOEJBQThCO29CQUNsQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsc0JBQXNCOzRCQUM1QixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyw0REFBNEQsRUFBRSxFQUFFLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUN4TyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3hELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUFzRCxHQUFHLENBQUM7Z0NBQ3ZFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUM3QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUU7Z0RBQ0YsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dEQUMxQixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0RBQzFCLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztnREFDOUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTOzZDQUNqQzt5Q0FDSjtxQ0FDSixDQUFDO2dDQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUNULElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDekMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDeEQsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FDdEYsSUFBSSxTQUFTLEdBQXNELEdBQUcsQ0FBQztnQ0FDdkUsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0NBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUM3QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUUsU0FBUzt5Q0FDbEI7cUNBQ0osQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxXQUFXOzRCQUNqQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3hELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUFzRCxHQUFHLENBQUM7Z0NBQ3ZFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLDREQUE0RCxFQUFFLEVBQUUsRUFBRSxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ2xNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUseUJBQXlCOzRCQUMvQixPQUFPLEVBQUUsV0FBVzs0QkFDcEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sMERBQTBEO2dDQUMxRCxrQkFBa0I7Z0NBQ2xCLHdGQUF3RjtnQ0FDeEYsbUNBQW1DO2dDQUNuQyxvQkFBb0I7Z0NBQ3BCLHlCQUF5QjtnQ0FDekIsa0JBQWtCO2dDQUNsQixpQkFBaUI7Z0NBQ2pCLFNBQVM7Z0NBQ1QsR0FBRzs0QkFDUCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNEOzttQkFFRztnQkFDSyx5QkFBeUI7b0JBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCOzRCQUNJLElBQUksRUFBRSxzQkFBc0I7NEJBQzVCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHVEQUF1RCxFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ3ZNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDbkQsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FDdEYsSUFBSSxTQUFTLEdBQWlELEdBQUcsQ0FBQztnQ0FDbEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUN4QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUU7Z0RBQ0YsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dEQUMxQixTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7NkNBQ2pDO3lDQUNKO3FDQUNKLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ1QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNuRCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FBQSxDQUFDO2dDQUN0RixJQUFJLFNBQVMsR0FBaUQsR0FBRyxDQUFDO2dDQUNsRSxTQUFTLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQ0FDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUN4QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUUsU0FBUzt5Q0FDbEI7cUNBQ0osQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxXQUFXOzRCQUNqQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ25ELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUFpRCxHQUFHLENBQUM7Z0NBQ2xFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHVEQUF1RCxFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLGdCQUFnQixTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUMvTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHlCQUF5Qjs0QkFDL0IsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLHFEQUFxRDtnQ0FDckQsa0JBQWtCO2dDQUNsQix3RkFBd0Y7Z0NBQ3hGLG1DQUFtQztnQ0FDbkMsb0JBQW9CO2dDQUNwQix5QkFBeUI7Z0NBQ3pCLGtCQUFrQjtnQ0FDbEIsaUJBQWlCO2dDQUNqQixTQUFTO2dDQUNULEdBQUc7NEJBQ1AsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0ssc0NBQXNDO29CQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsc0JBQXNCOzRCQUM1QixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxpRUFBaUUsRUFBRSxFQUFFLEVBQUUsRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUMvTixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ2hFLElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUEyRCxHQUFHLENBQUM7Z0NBQzVFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUNsRCxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUU7Z0RBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO2dEQUM5QixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0RBQ2hDLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztnREFDOUIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVOzZDQUNuQzt5Q0FDSjtxQ0FDSixDQUFDO2dDQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUNULElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDekMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDaEUsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FDdEYsSUFBSSxTQUFTLEdBQTJELEdBQUcsQ0FBQztnQ0FDNUUsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0NBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUNsRCxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUU7Z0RBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO2dEQUM5QixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0RBQ2hDLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztnREFDOUIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVO2dEQUNoQyxVQUFVLEVBQUUsU0FBUzs2Q0FDeEI7eUNBQ0o7cUNBQ0osQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxXQUFXOzRCQUNqQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ2hFLElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUEyRCxHQUFHLENBQUM7Z0NBQzVFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGlFQUFpRSxFQUFFLEVBQUUsRUFBRSxFQUFFLDZCQUE2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLGtCQUFrQixTQUFTLENBQUMsU0FBUyxPQUFPLFNBQVMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLFNBQVMsT0FBTyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUNuVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHlCQUF5Qjs0QkFDL0IsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLGtFQUFrRTtnQ0FDbEUsa0JBQWtCO2dDQUNsQix3RkFBd0Y7Z0NBQ3hGLG1DQUFtQztnQ0FDbkMsb0JBQW9CO2dDQUNwQix5QkFBeUI7Z0NBQ3pCLGtCQUFrQjtnQ0FDbEIsaUJBQWlCO2dDQUNqQixTQUFTO2dDQUNULEdBQUc7NEJBQ1AsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0ssMEJBQTBCO29CQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsc0JBQXNCOzRCQUM1QixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyx3REFBd0QsRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUN2UCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3BELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUFrRCxHQUFHLENBQUM7Z0NBQ25FLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQ0FDekMsT0FBTzt3Q0FDSCxFQUFFLEVBQUU7NENBQ0EsSUFBSSxFQUFFO2dEQUNGLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTztnREFDMUIsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHO2dEQUNsQixHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7Z0RBQ2xCLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRztnREFDbEIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPOzZDQUM3Qjt5Q0FDSjtxQ0FDSixDQUFDO2dDQUNOLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUNULElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDekMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sc0RBQXNEO2dDQUN0RCxrQkFBa0I7Z0NBQ2xCLHdGQUF3RjtnQ0FDeEYsaUNBQWlDO2dDQUNqQyx1Q0FBdUM7NEJBQzNDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxXQUFXOzRCQUNqQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3BELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTztnQ0FDWCxJQUFJLFNBQVMsR0FBa0QsR0FBRyxDQUFDO2dDQUNuRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyx3REFBd0QsRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQzVMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUseUJBQXlCOzRCQUMvQixPQUFPLEVBQUUsV0FBVzs0QkFDcEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sc0RBQXNEO2dDQUN0RCxrQkFBa0I7Z0NBQ2xCLHdGQUF3RjtnQ0FDeEYsbUNBQW1DO2dDQUNuQyxvQkFBb0I7Z0NBQ3BCLHlCQUF5QjtnQ0FDekIsa0JBQWtCO2dDQUNsQixpQkFBaUI7Z0NBQ2pCLFNBQVM7Z0NBQ1QsR0FBRzs0QkFDUCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNEOzttQkFFRztnQkFDSywwQkFBMEI7b0JBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCOzRCQUNJLElBQUksRUFBRSxzQkFBc0I7NEJBQzVCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHdEQUF3RCxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ3ZQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDcEQsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FDdEYsSUFBSSxTQUFTLEdBQWtELEdBQUcsQ0FBQztnQ0FDbkUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUN6QyxPQUFPO3dDQUNILEVBQUUsRUFBRTs0Q0FDQSxJQUFJLEVBQUU7Z0RBQ0YsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2dEQUMxQixHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7Z0RBQ2xCLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRztnREFDbEIsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHO2dEQUNsQixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87NkNBQzdCO3lDQUNKO3FDQUNKLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ1QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixzREFBc0Q7Z0NBQ3RELGtCQUFrQjtnQ0FDbEIsd0ZBQXdGO2dDQUN4RixpQ0FBaUM7Z0NBQ2pDLHVDQUF1Qzs0QkFDM0MsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDcEQsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0NBQUEsQ0FBQztnQ0FDdEYsSUFBSSxTQUFTLEdBQWtELEdBQUcsQ0FBQztnQ0FDbkUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsd0RBQXdELEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUM1TCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHlCQUF5Qjs0QkFDL0IsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLHNEQUFzRDtnQ0FDdEQsa0JBQWtCO2dDQUNsQixvRkFBb0Y7Z0NBQ3BGLG1DQUFtQztnQ0FDbkMsb0JBQW9CO2dDQUNwQix5QkFBeUI7Z0NBQ3pCLGtCQUFrQjtnQ0FDbEIsaUJBQWlCO2dDQUNqQixTQUFTO2dDQUNULEdBQUc7NEJBQ1AsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0sseUJBQXlCO29CQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsdUJBQXVCOzRCQUM3QixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyx1REFBdUQsRUFBRSxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dDQUNyUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHdCQUF3Qjs0QkFDOUIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxVQUFVOzRCQUNoQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ25ELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksVUFBVSxHQUFpRCxHQUFHLENBQUM7Z0NBRW5FLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQ0FDeEMsT0FBTzt3Q0FDSCxJQUFJLEVBQUU7NENBQ0YsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPOzRDQUMzQixHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUc7NENBQ25CLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRzs0Q0FDbkIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHOzRDQUNuQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87eUNBQzlCO3FDQUNKLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ1QsNkVBQTZFO2dDQUM3RSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDZCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTt3Q0FDckIsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtvQ0FDckQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7d0NBQ2hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0Q0FDWCxvREFBb0Q7NENBQ3BELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQzt3Q0FDL0UsQ0FBQzs2Q0FBTSxDQUFDOzRDQUNKLGlFQUFpRTs0Q0FDakUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztnREFDOUIseUNBQXlDO2dEQUN6QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvREFDcEMsK0RBQStEO29EQUMvRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7b0RBQ2xCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dEQUNuQyxRQUFRLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0RBQ3RDLENBQUMsQ0FBQyxDQUFBO29EQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dEQUNqRCxDQUFDO2dEQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDOzRDQUN4RCxDQUFDO2lEQUFNLENBQUM7Z0RBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMEZBQTBGOzRDQUN2SCxDQUFDO3dDQUNMLENBQUM7b0NBQ0wsQ0FBQyxDQUFDLENBQUM7Z0NBSVgsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx3QkFBd0I7NEJBQzlCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixxREFBcUQ7Z0NBQ3JELGtCQUFrQjtnQ0FDbEIsd0ZBQXdGO2dDQUN4RixpQ0FBaUM7Z0NBQ2pDLHVDQUF1Qzs0QkFDM0MsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsd0JBQXdCOzRCQUM5QixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDbkQsSUFBSSxHQUFHLElBQUksSUFBSTtvQ0FDWCxPQUFPO2dDQUNYLElBQUksVUFBVSxHQUFpRCxHQUFHLENBQUM7Z0NBQ25FLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHVEQUF1RCxFQUFFLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDM0wsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNoQyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSwwQkFBMEI7NEJBQ2hDLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixrQkFBa0I7Z0NBQ2xCLHFEQUFxRDtnQ0FDckQsa0JBQWtCO2dDQUNsQiw2RUFBNkU7Z0NBQzdFLDZEQUE2RDtnQ0FDN0QseUJBQXlCO2dDQUN6QiwyTUFBMk07Z0NBQzNNLG9DQUFvQztnQ0FDcEMsK0JBQStCO2dDQUMvQiwyQkFBMkI7Z0NBQzNCLHFCQUFxQjtnQ0FDckIsV0FBVztnQ0FDWCxxREFBcUQ7Z0NBQ3JELDZKQUE2SjtnQ0FDN0oscUJBQXFCO2dDQUNyQiw2QkFBNkI7Z0NBQzdCLDREQUE0RDtnQ0FDNUQsK0JBQStCO2dDQUMvQix3Q0FBd0M7Z0NBQ3hDLG9CQUFvQjtnQ0FDcEIsK0JBQStCO2dDQUMvQixtQ0FBbUM7Z0NBQ25DLHFCQUFxQjtnQ0FDckIsV0FBVztnQ0FDWCxjQUFjO2dDQUNkLDJCQUEyQjtnQ0FDM0IsU0FBUztnQ0FDVCwwQkFBMEI7Z0NBQzFCLG9CQUFvQjtnQ0FDcEIseUJBQXlCO2dDQUN6QixrQkFBa0I7Z0NBQ2xCLDZCQUE2QjtnQ0FDN0IsU0FBUztnQ0FDVCxHQUFHOzRCQUNQLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0Q7O21CQUVHO2dCQUNLLG1DQUFtQztvQkFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEI7NEJBQ0ksSUFBSSxFQUFFLHNCQUFzQjs0QkFDNUIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxTQUFTOzRCQUNmLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMscURBQXFELEVBQUUsRUFBRSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQ0FDcE0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNoQyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUM3RCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FBQSxDQUFDO2dDQUN0RixJQUFJLFNBQVMsR0FBK0MsR0FBRyxDQUFDO2dDQUNoRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0NBQ3RDLE9BQU87d0NBQ0gsRUFBRSxFQUFFOzRDQUNBLElBQUksRUFBRTtnREFDRixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0RBQzFCLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTzs2Q0FDN0I7eUNBQ0o7cUNBQ0osQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDVCxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLElBQUksRUFBRSxZQUFZOzRCQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQzdELElBQUksR0FBRyxJQUFJLElBQUk7b0NBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2dDQUFBLENBQUM7Z0NBQ3RGLElBQUksU0FBUyxHQUErQyxHQUFHLENBQUM7Z0NBQ2hFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQ0FDdEMsT0FBTzt3Q0FDSCxFQUFFLEVBQUU7NENBQ0EsSUFBSSxFQUFFLFNBQVM7eUNBQ2xCO3FDQUNKLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ1QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixJQUFJLEVBQUUsV0FBVzs0QkFDakIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUM3RCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQ0FBQSxDQUFDO2dDQUN0RixJQUFJLFNBQVMsR0FBK0MsR0FBRyxDQUFDO2dDQUNoRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxxREFBcUQsRUFBRSxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ3RMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUseUJBQXlCOzRCQUMvQixPQUFPLEVBQUUsV0FBVzs0QkFDcEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sK0RBQStEO2dDQUMvRCxrQkFBa0I7Z0NBQ2xCLHdGQUF3RjtnQ0FDeEYsbUNBQW1DO2dDQUNuQyxvQkFBb0I7Z0NBQ3BCLHlCQUF5QjtnQ0FDekIsa0JBQWtCO2dDQUNsQixpQkFBaUI7Z0NBQ2pCLFNBQVM7Z0NBQ1QsR0FBRzs0QkFDUCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBdVdKLENBQUE7WUE1eUVZLFVBQVU7Z0JBRHRCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsVUFBVSxDQTR5RXRCO1lBNXlFWSxvQkFBVSxhQTR5RXRCLENBQUE7UUFDTCxDQUFDLEVBL3lFb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK3lFN0I7SUFBRCxDQUFDLEVBL3lFZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK3lFbkI7QUFBRCxDQUFDLEVBL3lFUyxNQUFNLEtBQU4sTUFBTSxRQSt5RWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0Npc2VsbmlreS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IMSMw61zZWxuw61reSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQ2lzZWxuaWt5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy9UT0RPOiBOYXRhdmVuw60gZ2dyaWTFryAtPiBkZWZhdWx0bsOtIGFrY2UgZGV0YWlsdS91cHJhdnksIHZpenVhbGl6YWNlIMWZw6Fka8WvIChha3Rpdml0YSwuLi4pXHJcbiAgICAgICAgLy9UT0RPOiBWw71qaW1reSBrYXRlZ29yaWUgLT4gcMWZZWptZW5vdmF0ICsgenByb3Zvem5pb3QgaW52ZXJ0XHJcblxyXG4gICAgICAgIHR5cF9waGw6IHN0cmluZztcclxuICAgICAgICBpeHNfZnVuOiBzdHJpbmc7XHJcbiAgICAgICAgaXhwX2Rlbjogc3RyaW5nO1xyXG5cclxuICAgICAgICByb2s6IG51bWJlcjtcclxuICAgICAgICBpY286IHN0cmluZztcclxuICAgICAgICB1Y3M6IHN0cmluZztcclxuXHJcbiAgICAgICAgbmFjdGk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNpc2VsbmlreTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG9bXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtYWluRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHRhYk1hbmFnZXI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZENpc2VsbmlrUmFka3U6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q2lzZWxuaWtSYWRrdTogR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HQ2lzZWxuaWtSYWRrdUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZENpc2VsbmlrQ3R2cnRpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlld0Npc2VsbmlrQ3R2cnRpOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa0N0dnJ0aUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZFZhemJ5UmFka3VBQ3R2cnRpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlld1ZhemJ5UmFka3VBQ3R2cnRpOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWYXpieVJhZGt1QUN0dnJ0aUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZFNhemJ5UHJpcGFkdTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXdTYXpieVByaXBhZHU6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NhemJ5UHJpcGFkdUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZFR5cFBobFByZXZvZFZ5amlta3lLdGdVUE86IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3VHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTzogR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZEdlbmVyb3ZhbmlVUE86IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3R2VuZXJvdmFuaVVQTzogR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaVVQT0R0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZEdlbmVyb3ZhbmlPUFI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3R2VuZXJvdmFuaU9QUjogR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaU9QUkR0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZEdlbmVyb3ZhbmlGSzogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHZpZXdHZW5lcm92YW5pRks6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlGS0R0bz47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZFBvbG96a3lTTUxQcm9LYXRQb2h5YnU6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UG9sb3preVNNTFByb0thdFBvaHlidTogR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUG9sb3preVNNTER0bz47XHJcblxyXG4gICAgICAgIC8qKiBaw6FrbGFkbsOtIG1ldG9kYSBwcm8gZGVmaW5vdsOhbsOtIG9ic2FodSBzdHLDoW5reSAqL1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgxIzDrXNlbG7DrWt5IHR5cHUgcG9obGVkw6F2a3kgJHt0aGF0LnR5cF9waGx9YDtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVNlYXJjaCgpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hY3RpID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQubWFpbkZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwgfSk7IC8vbmHEjXRlIHR5cF9waGwgZG8gcG9sw63EjWthIGEgc3R1c3TDrSB0w61tIHJlZnJlc2hcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlVmlldygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVRhYnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBNZXRvZGEgcHJvIG5hxI10ZW7DrSBkYXQgZG8gZ2dyaWTFryAqL1xyXG4gICAgICAgIGNyZWF0ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGdldFJxID0gKGFrdDogYm9vbGVhbiA9IHRydWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGF0LnR5cF9waGxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFrdClcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuYWt0aXZpdGEgPSB0aGF0Lm1haW5Gb3JtIS5maW5kRmllbGRzKFwicG91emVfYWt0aXZuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PT0gdHJ1ZSA/IDEwMCA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6ICQuZXh0ZW5kKHt9LCBmaWx0ZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIipcIiwgXCJQZXJtaXNzaW9uc1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvL3ZpZXcgQ2lzZWxuaWtSYWRrdVxyXG4gICAgICAgICAgICB0aGF0LnZpZXdDaXNlbG5pa1JhZGt1ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5DaXNlbG5pa1JhZGt1Lmxpc3QoZ2V0UnEoKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3ZpZXcgQ2lzZWxuaWtDdHZydGlcclxuICAgICAgICAgICAgdGhhdC52aWV3Q2lzZWxuaWtDdHZydGkgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLmxpc3QoZ2V0UnEoKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3ZpZXcgVmF6YnlSYWRrdUFDdHZydGlcclxuICAgICAgICAgICAgdGhhdC52aWV3VmF6YnlSYWRrdUFDdHZydGkgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLlZhemJ5UmFka3VBQ3R2cnRpLmxpc3QoZ2V0UnEoKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3ZpZXcgU2F6YnlQcmlwYWR1XHJcbiAgICAgICAgICAgIHRoYXQudmlld1NhemJ5UHJpcGFkdSA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuU2F6YnlQcmlwYWR1Lmxpc3QoZ2V0UnEoKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3ZpZXcgVnlqaW1reUthdGVnb3JpaVBvaHlidVxyXG4gICAgICAgICAgICB0aGF0LnZpZXdUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5WeWppbWt5S2F0ZWdvcmlpUG9oeWJ1Lmxpc3QoZ2V0UnEoKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3ZpZXcgR2VuZXJvdmFuaVVQT1xyXG4gICAgICAgICAgICB0aGF0LnZpZXdHZW5lcm92YW5pVVBPID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5HZW5lcm92YW5pVVBPLmxpc3QoZ2V0UnEoZmFsc2UpKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzb3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25GcmFnbWVudHM6IG5ldyBHb3JkaWMuRGF0YS5GcmFnbWVudE1hbmFnZXIoW1wiUGVybWlzc2lvbnNcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdmlldyBHZW5lcm92YW5pT1BSXHJcbiAgICAgICAgICAgIHRoYXQudmlld0dlbmVyb3ZhbmlPUFIgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLkdlbmVyb3ZhbmlPUFIubGlzdChnZXRScShmYWxzZSkpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkZyYWdtZW50czogbmV3IEdvcmRpYy5EYXRhLkZyYWdtZW50TWFuYWdlcihbXCJQZXJtaXNzaW9uc1wiXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy92aWV3IEdlbmVyb3ZhbmlGS1xyXG4gICAgICAgICAgICB0aGF0LnZpZXdHZW5lcm92YW5pRksgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLkdlbmVyb3ZhbmlGSy5saXN0KGdldFJxKCkpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkZyYWdtZW50czogbmV3IEdvcmRpYy5EYXRhLkZyYWdtZW50TWFuYWdlcihbXCJQZXJtaXNzaW9uc1wiXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy92aWV3IFBvbG96a3lTTUxcclxuICAgICAgICAgICAgdGhhdC52aWV3UG9sb3preVNNTFByb0thdFBvaHlidSA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuUG9sb3preVNNTC5saXN0KGdldFJxKGZhbHNlKSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8va29uZWMgbmHEjcOtdMOhbsOtXHJcbiAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiDEjWFzZW0gcMWZZWTEm2xhdCBuYSBrbGFzaWNrw70gZmlsdHItcGFuZWwgP1xyXG4gICAgICAgIC8qKiBNZXRvZGEgcHJvIHZ5a3Jlc2xlbsOtIG9ic2FodSAqL1xyXG4gICAgICAgIGNyZWF0ZVNlYXJjaCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBGT1JNXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmaW5kRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBobFNpbXBsZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3V6ZV9ha3Rpdm5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWm9icmF6aXQgcG91emUgYWt0aXZuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJyaWdodFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIHsgcGFyYW1zOiB7IHByaW1hcnk6IHRydWUsIGN1c3RvbUNsYXNzOiBcInJpZ2h0XCIsIGlkOiBcImFjdEdDaXNlbG5pa3lWeWhsZWRhdF9idXR0b25cIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VnlobGVkYXRcIl0gfSB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFpbkZvcm0gPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVUYWJzKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBHUk9VUCBERUZJTklDRVxyXG4gICAgICAgICAgICB0aGF0LnRhYk1hbmFnZXIgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ3RhYm1hbmFnZXIoe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncm91cENpc2VsbmlrUmFka3VcIiwgY2FwdGlvbjogXCLEjMOtc2VsbsOtayDFmcOhZGvFr1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncm91cENpc2VsbmlrQ3R2cnRpXCIsIGNhcHRpb246IFwixIzDrXNlbG7DrWsgxI10dnJ0w61cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JvdXBWYXpieVJhZGt1QUN0dnJ0aVwiLCBjYXB0aW9uOiBcIlZhemJ5IMWZw6Fka8WvIGEgxI10dnJ0w61cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JvdXBTYXpieVByaXBhZHVcIiwgY2FwdGlvbjogXCJTYXpieSBwxZnDrXBhZMWvXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdyb3VwVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQT1wiLCBjYXB0aW9uOiBcIlR5cCBwaGwuIHDFmWV2b2QgdsO9amlta3kga3RnLiBVUE9cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JvdXBHZW5lcm92YW5pVVBPXCIsIGNhcHRpb246IFwiR2VuZXJvdsOhbsOtIFVQT1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncm91cEdlbmVyb3ZhbmlPUFJcIiwgY2FwdGlvbjogXCJHZW5lcm92w6Fuw60gT1BSXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdyb3VwR2VuZXJvdmFuaUZLXCIsIGNhcHRpb246IFwiR2VuZXJvdsOhbsOtIEZLXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdyb3VwUG9sb3preVNNTFByb0thdFBvaHlidVwiLCBjYXB0aW9uOiBcIlBvbG/Fvmt5IFNNTCBwcm8ga2F0LiBwb2h5YsWvXCIgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzY29wZUVsZW1lbnQ6IHRoYXQuZWxlbWVudFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gR1JPVVAgxIzDjVNFTE7DjUsgxZjDgURLxa5cclxuICAgICAgICAgICAgbGV0IGdyb3VwQ2lzZWxuaWtSYWRrdSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwQ2lzZWxuaWtSYWRrdVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY3R4LmNvbmNlYWwpIGdyb3VwQ2lzZWxuaWtSYWRrdS5hZGRDbGFzcyhcImNvbmNlYWxlZFwiKTsgZWxzZSBncm91cENpc2VsbmlrUmFka3UucmVtb3ZlQ2xhc3MoXCJjb25jZWFsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZENpc2VsbmlrUmFka3UucGFyZW50KCkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZENpc2VsbmlrUmFka3UudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZENpc2VsbmlrUmFka3UgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZ3JvdXBDaXNlbG5pa1JhZGt1KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOiBuZXcgRGF0YS5WaWV3KFtdKVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGRwX3R5cHlfcG9obGVkYXZla19jaXNlbG5pa19DaXNlbG5pa1JhZGt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3Q2lzZWxuaWtSYWRrdSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5DaXNlbG5pa1JhZGt1KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQxXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zMShvYmouY2VsbEluZm8ucm93ID49IDAgPyBvYmouY2VsbEluZm8uZGF0YS5QZXJtaXNzaW9ucyA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0MVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEdST1VQIMSMw41TRUxOw41LIMSMVFZSVMONXHJcbiAgICAgICAgICAgIGxldCBncm91cENpc2VsbmlrQ3R2cnRpID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyb3VwYWJsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBDaXNlbG5pa0N0dnJ0aVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY3R4LmNvbmNlYWwpIGdyb3VwQ2lzZWxuaWtDdHZydGkuYWRkQ2xhc3MoXCJjb25jZWFsZWRcIik7IGVsc2UgZ3JvdXBDaXNlbG5pa0N0dnJ0aS5yZW1vdmVDbGFzcyhcImNvbmNlYWxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkQ2lzZWxuaWtDdHZydGkucGFyZW50KCkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZENpc2VsbmlrQ3R2cnRpLnRvZ2dsZSghY3R4LmNvbmNlYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5ncmlkQ2lzZWxuaWtDdHZydGkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZ3JvdXBDaXNlbG5pa0N0dnJ0aSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGF0YTogbmV3IERhdGEuVmlldyhbXSlcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXdDaXNlbG5pa0N0dnJ0aSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRkcF90eXB5X3BvaGxlZGF2ZWtfY2lzZWxuaWtfQ2lzZWxuaUN0dnJ0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLkNpc2VsbmlrQ3R2cnRpKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0MlwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlQWN0aW9uczIob2JqLmNlbGxJbmZvLnJvdyA+PSAwID8gb2JqLmNlbGxJbmZvLmRhdGEuUGVybWlzc2lvbnMgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0MlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0MlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0MlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gR1JPVVAgVkFaQlkgUkFES1UgQSBDVFZSVElcclxuICAgICAgICAgICAgbGV0IGdyb3VwVmF6YnlSYWRrdUFDdHZydGkgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JvdXBhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncm91cFZhemJ5UmFka3VBQ3R2cnRpXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChjdHguY29uY2VhbCkgZ3JvdXBWYXpieVJhZGt1QUN0dnJ0aS5hZGRDbGFzcyhcImNvbmNlYWxlZFwiKTsgZWxzZSBncm91cFZhemJ5UmFka3VBQ3R2cnRpLnJlbW92ZUNsYXNzKFwiY29uY2VhbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRWYXpieVJhZGt1QUN0dnJ0aS5wYXJlbnQoKS50b2dnbGUoIWN0eC5jb25jZWFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkVmF6YnlSYWRrdUFDdHZydGkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRWYXpieVJhZGt1QUN0dnJ0aSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhncm91cFZhemJ5UmFka3VBQ3R2cnRpKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOiBuZXcgRGF0YS5WaWV3KFtdKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld1ZhemJ5UmFka3VBQ3R2cnRpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGRwX3R5cHlfcG9obGVkYXZla19jaXNlbG5pa19WYXpieVJhZGt1QUN0dnJ0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlZhemJ5UmFka3VBQ3R2cnRpKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVmF6YnlSYWRrdUFDdHZydGkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0M1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlQWN0aW9uczMob2JqLmNlbGxJbmZvLnJvdyA+PSAwID8gb2JqLmNlbGxJbmZvLmRhdGEuUGVybWlzc2lvbnMgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBHUk9VUCBTYXpieSBQxZnDrXBhZMWvXHJcbiAgICAgICAgICAgIGxldCBncm91cFNhemJ5UHJpcGFkdSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwU2F6YnlQcmlwYWR1XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRTYXpieVByaXBhZHUucGFyZW50KCkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFNhemJ5UHJpcGFkdS50b2dnbGUoIWN0eC5jb25jZWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFNhemJ5UHJpcGFkdSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhncm91cFNhemJ5UHJpcGFkdSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld1NhemJ5UHJpcGFkdSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRkcF90eXB5X3BvaGxlZGF2ZWtfY2lzZWxuaWtfU2F6YnlQcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuU2F6YnlQcmlwYWR1KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuU2F6YnlQcmlwYWR1KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZUFjdGlvbnM0KG9iai5jZWxsSW5mby5yb3cgPj0gMCA/IG9iai5jZWxsSW5mby5kYXRhLlBlcm1pc3Npb25zIDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0NFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0NFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0NFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gR1JPVVAgVHlwIHBobC4gcMWZZXZvZCB2w71qaW1reSBrdGcuIFVQT1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyb3VwYWJsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPLnBhcmVudCgpLnRvZ2dsZSghY3R4LmNvbmNlYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPLnRvZ2dsZSghY3R4LmNvbmNlYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5ncmlkVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTyA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhncm91cFR5cFBobFByZXZvZFZ5amlta3lLdGdVUE8pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXdUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGRwX3R5cHlfcG9obGVkYXZla19jaXNlbG5pa19WeWppbWt5S2F0ZWdvcmlpUG9oeWJ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuVnlqaW1reUthdGVnb3JpaVBvaHlidSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB0aGF0LmdldERlZmF1bHRQcm9maWxlKEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlR5cFBobFByZXZvZFZ5amlta3lLdGdVUE8pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0NVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlQWN0aW9uczUob2JqLmNlbGxJbmZvLnJvdyA+PSAwID8gb2JqLmNlbGxJbmZvLmRhdGEuUGVybWlzc2lvbnMgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBHUk9VUCBHZW5lcm92w6Fuw60gVVBPXHJcbiAgICAgICAgICAgIGxldCBncm91cEdlbmVyb3ZhbmlVUE8gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JvdXBhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncm91cEdlbmVyb3ZhbmlVUE9cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmNlYWw6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlVUE8ucGFyZW50KCkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlVUE8udG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRHZW5lcm92YW5pVVBPID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKGdyb3VwR2VuZXJvdmFuaVVQTylcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld0dlbmVyb3ZhbmlVUE8sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfdHlweV9wb2hsZWRhdmVrX2Npc2VsbmlrX0dlbmVyb3ZhbmlVUE9cIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5HZW5lcm92YW5pVVBPKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaVVQTyksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ2XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zNihvYmouY2VsbEluZm8ucm93ID49IDAgPyBvYmouY2VsbEluZm8uZGF0YS5QZXJtaXNzaW9ucyA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0NlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEdST1VQIEdlbmVyb3bDoW7DrSBPUFJcclxuICAgICAgICAgICAgbGV0IGdyb3VwR2VuZXJvdmFuaU9QUiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwR2VuZXJvdmFuaU9QUlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkR2VuZXJvdmFuaU9QUi5wYXJlbnQoKS50b2dnbGUoIWN0eC5jb25jZWFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkR2VuZXJvdmFuaU9QUi50b2dnbGUoIWN0eC5jb25jZWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlPUFIgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZ3JvdXBHZW5lcm92YW5pT1BSKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3R2VuZXJvdmFuaU9QUixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRkcF90eXB5X3BvaGxlZGF2ZWtfY2lzZWxuaWtfR2VuZXJvdmFuaU9QUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLkdlbmVyb3ZhbmlPUFIoKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogdGhhdC5nZXREZWZhdWx0UHJvZmlsZShHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pT1BSKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDdcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZUFjdGlvbnM3KG9iai5jZWxsSW5mby5yb3cgPj0gMCA/IG9iai5jZWxsSW5mby5kYXRhLlBlcm1pc3Npb25zIDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0N1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0N1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0N1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0N1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ3XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gR1JPVVAgR2VuZXJvdsOhbsOtIEZLXHJcbiAgICAgICAgICAgIGxldCBncm91cEdlbmVyb3ZhbmlGSyA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwR2VuZXJvdmFuaUZLXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRHZW5lcm92YW5pRksucGFyZW50KCkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlGSy50b2dnbGUoIWN0eC5jb25jZWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlGSyA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhncm91cEdlbmVyb3ZhbmlGSylcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld0dlbmVyb3ZhbmlGSyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRkcF90eXB5X3BvaGxlZGF2ZWtfY2lzZWxuaWtfR2VuZXJvdmFuaUZLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuR2VuZXJvdmFuaUZLKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaUZLKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdEZLXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zRksob2JqLmNlbGxJbmZvLnJvdyA+PSAwID8gb2JqLmNlbGxJbmZvLmRhdGEuUGVybWlzc2lvbnMgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXRGS1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0RktcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdEZLXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXRGS1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRGS1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEdST1VQIFBvbG/Fvmt5IFNNTCBwcm8ga2F0LiBwb2h5YsWvXHJcbiAgICAgICAgICAgIGxldCBncm91cFBvbG96a3lTTUxQcm9LYXRQb2h5YnUgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JvdXBhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncm91cFBvbG96a3lTTUxQcm9LYXRQb2h5YnVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmNlYWw6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBvbG96a3lTTUxQcm9LYXRQb2h5YnUucGFyZW50KCkudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBvbG96a3lTTUxQcm9LYXRQb2h5YnUudG9nZ2xlKCFjdHguY29uY2VhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRQb2xvemt5U01MUHJvS2F0UG9oeWJ1ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKGdyb3VwUG9sb3preVNNTFByb0thdFBvaHlidSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld1BvbG96a3lTTUxQcm9LYXRQb2h5YnUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfdHlweV9wb2hsZWRhdmVrX2Npc2VsbmlrX1BvbG96a3lTTUxQcm9LYXRQb2h5YnVcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5Qb2xvemt5U01MKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoYXQuZ2V0RGVmYXVsdFByb2ZpbGUoR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuUG9sb3preVNNTFByb0thdFBvaHlidSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ4XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zOChvYmouY2VsbEluZm8ucm93ID49IDAgPyBvYmouY2VsbEluZm8uZGF0YS5QZXJtaXNzaW9ucyA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0OFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQudGFiTWFuYWdlci5ndGFibWFuYWdlcihcInJlZnJlc2hcIik7XHJcbiAgICAgICAgICAgIHRoYXQudGFiTWFuYWdlci5maW5kKFwiW2RhdGEtcGFyYW0taWQ9J190YWJHcm91cE90aGVycyddXCIpLnBhcmVudCgpLmF0dHIoXCJzdHlsZVwiLCBcImRpc3BsYXk6IG5vbmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldERlZmF1bHRQcm9maWxlKGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdSk6IEdyaWRQcm9maWxlPGFueT4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkNpc2VsbmlrUmFka3U6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkZHBfcmFkZWssIG5hemV2LCBpeHBfZGVuLCBwb3puYW1rYSwgYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFa28uR3JpZC5nZXRDb25kRm9ybWF0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgKEBha3Rpdml0YSAhPSAxMDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkZHBfY3R2cnQsIG5hemV2LCBpeHBfZGVuLCBwb3puYW1rYSwgYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFa28uR3JpZC5nZXRDb25kRm9ybWF0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgKEBha3Rpdml0YSAhPSAxMDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVmF6YnlSYWRrdUFDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpeHBfZGVuLCBkZHBfcmFkZWssIGRkcF9jdHZydCwgcG96bmFta2EsIGFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlNhemJ5UHJpcGFkdTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcImNpc19zYXpieSwgcG9waXMsIHNhemJhLCBwb2NldCwgcG9jX3NwbGF0ZWssIGNfY2VsaywgcG96bmFta2EsIGFrdGl2aXRhLCBjX3owLCBjX2QwLCBjX3oxLCBjX2QxLCBjX3ozLCBjX2QzLCBjX3oyLCBjX2QyLCBjX3phb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVrby5HcmlkLmdldENvbmRGb3JtYXRzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuVnlyYXplbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiTmVha3Rpdm7DrVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBha3Rpdml0YSkpIGFuZCAoQGFrdGl2aXRhICE9IDEwMCksIHRydWUsIGZhbHNlLCBmYWxzZSlcIiB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5UeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwidHlwX3BobF96LCB0eXBfcGhsX2RvLCBrdGdfdXBvX3osIGt0Z191cG9fZG8sIGludmVydCwgYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFa28uR3JpZC5nZXRDb25kRm9ybWF0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgKEBha3Rpdml0YSAhPSAxMDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfTsgLy80OTAtcMWZaWTDoW4gaW52ZXJ0XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkdlbmVyb3ZhbmlVUE86XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJ0eXBfcGhsLCByb2ssIGljbywgdWNzLCBrdGdfdXBvLCBwcml6X2dlbl91cG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25kRm9ybWF0czogLy8gVGFidWxrYSBuZW9ic2FodWplIGFrdGl2aXR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIEVrby5HcmlkLmdldENvbmRGb3JtYXRzKHsgdHlwZTogRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuVnlyYXplbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiTmVha3Rpdm7DrVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBha3Rpdml0YSkpIGFuZCAoQGFrdGl2aXRhICE9IDEwMCksIHRydWUsIGZhbHNlLCBmYWxzZSlcIiB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaU9QUjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInR5cF9waGwsIHJvaywgaWNvLCB1Y3MsIGt0Z191cG8sIHByaXpfZ2VuX29wclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbmRGb3JtYXRzOiAvLyBUYWJ1bGthIG5lb2JzYWh1amUgYWt0aXZpdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgRWtvLkdyaWQuZ2V0Q29uZEZvcm1hdHMoeyB0eXBlOiBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5WeXJhemVubywgb3B0aW9uczogeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGFrdGl2aXRhKSkgYW5kIChAYWt0aXZpdGEgIT0gMTAwKSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pRks6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJ0eXBfcGhsLCByb2ssIGljbywgdWNzLCBrdGdfdXBvLCBwcmlfZmssIGFrdGl2aXRhXCIsICAvLyBkYXRfem1lbmEsIHptZW51X3Byb3ZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFa28uR3JpZC5nZXRDb25kRm9ybWF0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgKEBha3Rpdml0YSAhPSAxMDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuUG9sb3preVNNTFByb0thdFBvaHlidTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInR5cF9waGwsIGt0Z191cG8sIHR5cF92c21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25kRm9ybWF0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgRWtvLkdyaWQuZ2V0Q29uZEZvcm1hdHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgKEBha3Rpdml0YSAhPSAxMDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipNZXRvZGEgcHJvIG9ibm92ZW7DrSBvYnNhaHUgZ3JpZMWvICovXHJcbiAgICAgICAgcmVmcmVzaCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXI6IHsgdHlwX3BobD86IHN0cmluZywgYWt0aXZpdGE/OiBudW1iZXIgfSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYWluRm9ybSEuZmluZEZpZWxkcyhcInR5cF9waGxcIiwpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbHRlci50eXBfcGhsID09IG51bGwpIGZpbHRlci50eXBfcGhsID0gdGhhdC50eXBfcGhsOyBlbHNlIHRoYXQudHlwX3BobCA9IGZpbHRlci50eXBfcGhsO1xyXG4gICAgICAgICAgICB0aGF0LnNldENvbnRlbnRUaXRsZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9maWx0ZXIuYWt0aXZpdGEgPSB0aGF0Lm1haW5Gb3JtIS5maW5kRmllbGRzKFwicG91emVfYWt0aXZuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PT0gdHJ1ZSA/IDEwMCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVWaWV3KClcclxuICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zMSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGF0LmVuYWJsZUFjdGlvbnMyKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRoYXQuZW5hYmxlQWN0aW9uczModW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zNCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGF0LmVuYWJsZUFjdGlvbnM1KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRoYXQuZW5hYmxlQWN0aW9uczYodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgdGhhdC5lbmFibGVBY3Rpb25zNyh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGF0LmVuYWJsZUFjdGlvbnNGSyh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGF0LmVuYWJsZUFjdGlvbnM4KHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRDaXNlbG5pa1JhZGt1LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdDaXNlbG5pa1JhZGt1KVxyXG4gICAgICAgICAgICB0aGF0LmdyaWRDaXNlbG5pa0N0dnJ0aS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3Q2lzZWxuaWtDdHZydGkpXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFZhemJ5UmFka3VBQ3R2cnRpLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdWYXpieVJhZGt1QUN0dnJ0aSlcclxuICAgICAgICAgICAgdGhhdC5ncmlkU2F6YnlQcmlwYWR1LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdTYXpieVByaXBhZHUpXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFR5cFBobFByZXZvZFZ5amlta3lLdGdVUE8uZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld1R5cFBobFByZXZvZFZ5amlta3lLdGdVUE8pXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlVUE8uZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld0dlbmVyb3ZhbmlVUE8pXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlPUFIuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld0dlbmVyb3ZhbmlPUFIpXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEdlbmVyb3ZhbmlGSy5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3R2VuZXJvdmFuaUZLKVxyXG4gICAgICAgICAgICB0aGF0LmdyaWRQb2xvemt5U01MUHJvS2F0UG9oeWJ1LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdQb2xvemt5U01MUHJvS2F0UG9oeWJ1KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQudGFiTWFuYWdlci5ndGFibWFuYWdlcihcInJlZnJlc2hcIik7XHJcbiAgICAgICAgICAgIHRoYXQubmFjdGkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqTWV0b2RhIHBybyB6bcSbbnkgdHlwdSBwaGwgdiB0aXR1bGt1IHN0csOhbmt5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRDb250ZW50VGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgxIzDrXNlbG7DrWt5IHR5cHUgcG9obGVkw6F2a3kgJHt0aGlzLnR5cF9waGx9YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcXFxcXHJcbiAgICAgICAgLy8jIyNERUZJTklDRSBBS0NJIEdSSUTFriMjI1xcXFxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHBvdm9sb3bDoW7DrSB0bGHEjcOtdGVrIG5hZCB2eWJyYW7DvW0gxZnDoWRrZW0gZ3JpZHVcclxuICAgICAgICAgKiBAcGFyYW0gcGVybSBQZXJtaXNzaW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVBY3Rpb25zMShwZXJtOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHBlcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQxXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuQ3JlYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQxXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQxXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuUmVzdG9yZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0MVwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0MVwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNvcHlcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLm1haW5Gb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0MVwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQxXCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQxXCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQxXCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDFcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQxXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQxXCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDFcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQxXCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDFcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQxXCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDFcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQxXCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0MVwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0MVwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBwb3ZvbG92w6Fuw60gdGxhxI3DrXRlayBuYWQgdnlicmFuw71tIMWZw6Fka2VtIGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIHBlcm0gUGVybWlzc2lvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlQWN0aW9uczIocGVybTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0MlwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNyZWF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0MlwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0MlwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhblJlc3RvcmVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDJcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5FZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDJcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5Db3B5XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgY2lzZWxuaWs6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5DaXNlbG5pa3kuR0Npc2VsbmlrRHRvID0gdGhpcy5tYWluRm9ybSEuZmluZEZpZWxkcyhcImNpc2VsbmlrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDJcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0MlwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0MlwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0MlwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQyXCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0MlwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0MlwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQyXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0MlwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQyXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0MlwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQyXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0MlwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDJcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDJcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gcG92b2xvdsOhbsOtIHRsYcSNw610ZWsgbmFkIHZ5YnJhbsO9bSDFmcOhZGtlbSBncmlkdVxyXG4gICAgICAgICAqIEBwYXJhbSBwZXJtIFBlcm1pc3Npb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZUFjdGlvbnMzKHBlcm06IGFueSkge1xyXG4gICAgICAgICAgICBpZiAocGVybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDNcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5DcmVhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDNcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5EZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDNcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5SZXN0b3JlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQzXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQzXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuQ29weVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ2lzZWxuaWt5LkdDaXNlbG5pa0R0byA9IHRoaXMubWFpbkZvcm0hLmZpbmRGaWVsZHMoXCJjaXNlbG5pa1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQzXCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDNcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDNcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDNcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0M1wiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDNcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDNcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0M1wiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDNcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0M1wiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDNcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0M1wiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDNcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQzXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQzXCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHBvdm9sb3bDoW7DrSB0bGHEjcOtdGVrIG5hZCB2eWJyYW7DvW0gxZnDoWRrZW0gZ3JpZHVcclxuICAgICAgICAgKiBAcGFyYW0gcGVybSBQZXJtaXNzaW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVBY3Rpb25zNChwZXJtOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHBlcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuQ3JlYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuUmVzdG9yZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0NFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0NFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNvcHlcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLm1haW5Gb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDRcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ0XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDRcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDRcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDRcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0NFwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0NFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBwb3ZvbG92w6Fuw60gdGxhxI3DrXRlayBuYWQgdnlicmFuw71tIMWZw6Fka2VtIGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIHBlcm0gUGVybWlzc2lvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlQWN0aW9uczUocGVybTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NVwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNyZWF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0NVwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0NVwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhblJlc3RvcmVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDVcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5FZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDVcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5Db3B5XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgY2lzZWxuaWs6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5DaXNlbG5pa3kuR0Npc2VsbmlrRHRvID0gdGhpcy5tYWluRm9ybSEuZmluZEZpZWxkcyhcImNpc2VsbmlrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDVcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0NVwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0NVwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0NVwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ1XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NVwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NVwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ1XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0NVwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ1XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0NVwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ1XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0NVwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDVcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDVcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gcG92b2xvdsOhbsOtIHRsYcSNw610ZWsgbmFkIHZ5YnJhbsO9bSDFmcOhZGtlbSBncmlkdVxyXG4gICAgICAgICAqIEBwYXJhbSBwZXJtIFBlcm1pc3Npb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZUFjdGlvbnM2KHBlcm06IGFueSkge1xyXG4gICAgICAgICAgICBpZiAocGVybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDZcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5DcmVhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDZcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5EZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDZcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5SZXN0b3JlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ2XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ2XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuQ29weVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ2lzZWxuaWt5LkdDaXNlbG5pa0R0byA9IHRoaXMubWFpbkZvcm0hLmZpbmRGaWVsZHMoXCJjaXNlbG5pa1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ2XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDZcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDZcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDZcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0NlwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDZcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDZcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0NlwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDZcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0NlwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDZcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0NlwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDZcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ2XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ2XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHBvdm9sb3bDoW7DrSB0bGHEjcOtdGVrIG5hZCB2eWJyYW7DvW0gxZnDoWRrZW0gZ3JpZHVcclxuICAgICAgICAgKiBAcGFyYW0gcGVybSBQZXJtaXNzaW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVBY3Rpb25zNyhwZXJtOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHBlcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ3XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuQ3JlYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ3XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ3XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuUmVzdG9yZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0N1wiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0N1wiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNvcHlcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLm1haW5Gb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0N1wiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ3XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ3XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ3XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDdcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ3XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXQ3XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDdcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ3XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDdcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ3XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDdcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ3XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0N1wiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0N1wiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBwb3ZvbG92w6Fuw60gdGxhxI3DrXRlayBuYWQgdnlicmFuw71tIMWZw6Fka2VtIGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIHBlcm0gUGVybWlzc2lvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlQWN0aW9uczgocGVybTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0OFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNyZWF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0OFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0OFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhblJlc3RvcmVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDhcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5FZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDhcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5Db3B5XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgY2lzZWxuaWs6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5DaXNlbG5pa3kuR0Npc2VsbmlrRHRvID0gdGhpcy5tYWluRm9ybSEuZmluZEZpZWxkcyhcImNpc2VsbmlrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdDhcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0OFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0OFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0OFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ4XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0OFwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0OFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXQ4XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0OFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXQ4XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0OFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXQ4XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0OFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDhcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDhcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gcG92b2xvdsOhbsOtIHRsYcSNw610ZWsgR2VuZXJvdsOhbsOtIEZLIG5hZCB2eWJyYW7DvW0gxZnDoWRrZW0gZ3JpZHVcclxuICAgICAgICAgKiBAcGFyYW0gcGVybSBQZXJtaXNzaW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVBY3Rpb25zRksocGVybTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0RktcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5DcmVhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdEZLXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXRGS1wiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhblJlc3RvcmVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdEZLXCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRGS1wiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkNvcHlcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLm1haW5Gb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5UHJpZGF0RktcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0RktcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdEZLXCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXRGS1wiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRGS1wiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdEZLXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXRGS1wiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXRGS1wiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdEZLXCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdEZLXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0RktcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0RktcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXRGS1wiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdEZLXCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRGS1wiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVrb27EjWVuw60gYWtjZVxyXG4gICAgICAgICAqIEBwYXJhbSBhY3QgcmV0dXJuIEFrY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdDogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HUmVzcG9uc2U8YW55Pj4gfCB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UoYWN0LCB0aGlzLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWtvbsSNZW7DrSBha2NlXHJcbiAgICAgICAgICogQHBhcmFtIGFjdCByZXR1cm4gQWtjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWtjZVBvWmF2cmVuaU9rbmEoYWN0OiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChhY3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYWN0Lm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgc3Ryw6Fua3lcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5WmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lWeWhsZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnNDaXNlbG5pa1JhZGt1KClcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zQ2lzZWxuaWtDdHZydGkoKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnNWYXpieVJhZGt1QUN0dnJ0aSgpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uc1NhemJ5UHJpcGFkdSgpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uc1R5cFBobFByZXZvZFZ5amlta3lLdGdVUE8oKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnNHZW5lcm92YW5pVVBPKClcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zR2VuZXJvdmFuaU9QUigpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uc0dlbmVyb3ZhbmlGSygpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uc1BvbG96a3lTTUxQcm9LYXRQb2h5YnUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgbmFkIGdncmlkZW0gcHJvIFwixIzDrXNlbG7DrWsgxZnDoWRrxa9cIlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9uc0Npc2VsbmlrUmFka3UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreVByaWRhdDFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWtSYWRrdVwiLCB7IElEOiBcIkREUEdDaXNlbG5pa1JhZGt1I1wiLCBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCwgaXhwX2RlbjogdGhpcy5peHBfZGVuIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsO9IMWZw6FkZWtcIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VQb1phdnJlbmlPa25hKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lPZGVicmF0MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RlYnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZENpc2VsbmlrUmFka3UuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrUmFka3VEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhhdC5pc2wuQ2lzZWxuaWtSYWRrdS5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiByb3dUeXBlZC5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9yYWRlazogcm93VHlwZWQuZGRwX3JhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZENpc2VsbmlrUmFka3UuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrUmFka3VEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dUeXBlZC5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLkNpc2VsbmlrUmFka3UudXBkYXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YTogcm93VHlwZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkQ2lzZWxuaWtSYWRrdS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HQ2lzZWxuaWtSYWRrdUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0Npc2VsbmlrUmFka3VcIiwgeyBJRDogXCJERFBHQ2lzZWxuaWtSYWRrdSNcIiwgZGF0YTogcm93VHlwZWQsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgxZnDoWRrdSAke3Jvd1R5cGVkLmRkcF9yYWRla31gLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvcMOtcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZENpc2VsbmlrUmFka3UuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZCA9IDx7IHR5cF9waGw6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfT5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1Z5YmVyVHlwdVBvaGxlZGF2a3lcIiwgeyBJRDogXCJERFBHVnliZXJUeXB1UG9obGVkYXZreSNcIiwgdHlwX3BobDogcm93VHlwZWQudHlwX3BobCB9LCBcIlbDvWLEm3IgemRyb2pvdsOpaG8gdHlwdSBwb2hsZWTDoXZreVwiLCA2MDAsIDMwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbSA9IHRoYXQuaXNsLkNpc2VsbmlrUmFka3UuY29weShycSA9PiB7IHJldHVybiB7IHJxOiB7IERhdGE6IHsgaXhwX2RlbjogdGhpcy5peHBfZGVuLCB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsLCB0eXBfcGhsX3NvdXJjZTogcmV0VmFsLnR5cF9waGwgfSB9IH07IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvbSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShwcm9tLCB0aGlzLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBha2PDrSB0bGHEjcOtdGVrIG5hZCBnZ3JpZGVtIHBybyBcIsSMw61zZWxuw61rIMSNdHZydMOtXCJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnNDaXNlbG5pa0N0dnJ0aSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5UHJpZGF0MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdDaXNlbG5pa0N0dnJ0aVwiLCB7IElEOiBcIkREUEdDaXNlbG5pa0N0dnJ0aSNcIiwgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwsIGl4cF9kZW46IHRoaXMuaXhwX2RlbiB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDoSDEjXR2csWlXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlUG9aYXZyZW5pT2tuYShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kZWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRDaXNlbG5pa0N0dnJ0aS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkMiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrQ3R2cnRpRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHJvd1R5cGVkMi5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQyLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZHBfY3R2cnQ6IHJvd1R5cGVkMi5kZHBfY3R2cnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lPYm5vdml0MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkQ2lzZWxuaWtDdHZydGkuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDIgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa0N0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1R5cGVkMi5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lVcHJhdml0MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRDaXNlbG5pa0N0dnJ0aS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkMiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrQ3R2cnRpRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWtDdHZydGlcIiwgeyBJRDogXCJERFBHQ2lzZWxuaWtDdHZydGkjXCIsIGRhdGE6IHJvd1R5cGVkMiwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCDEjXR2cnRpICR7cm93VHlwZWQyLmRkcF9jdHZydH1gLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvcMOtcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZENpc2VsbmlrQ3R2cnRpLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQgPSA8eyB0eXBfcGhsOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIH0+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWeWJlclR5cHVQb2hsZWRhdmt5XCIsIHsgSUQ6IFwiRERQR1Z5YmVyVHlwdVBvaGxlZGF2a3kjXCIsIHR5cF9waGw6IHJvd1R5cGVkLnR5cF9waGwgfSwgXCJWw71ixJtyIHpkcm9qb3bDqWhvIHR5cHUgcG9obGVkw6F2a3lcIiwgNjAwLCAzMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb206IEpRdWVyeVByb21pc2U8YW55PiB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb20gPSB0aGF0LmlzbC5DaXNlbG5pa0N0dnJ0aS5jb3B5KHJxID0+IHsgcmV0dXJuIHsgcnE6IHsgRGF0YTogeyBpeHBfZGVuOiB0aGlzLml4cF9kZW4sIHR5cF9waGw6IHJvd1R5cGVkLnR5cF9waGwsIHR5cF9waGxfc291cmNlOiByZXRWYWwudHlwX3BobCB9IH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHByb20sIHRoaXMsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBha2PDrSB0bGHEjcOtdGVrIG5hZCBnZ3JpZGVtIHBybyBcIlZhemJ5IMWZw6Fka8WvIGEgxI10dnJ0w61cIlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9uc1ZhemJ5UmFka3VBQ3R2cnRpKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lQcmlkYXQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWYXpieVJhZGt1QUN0dnJ0aVwiLCB7IElEOiBcIkREUEdWYXpieVJhZGt1QUN0dnJ0aSNcIiwgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwsIGl4cF9kZW46IHRoaXMuaXhwX2RlbiB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDoSB2YXpiYVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9kZWJyYXQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGVicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkVmF6YnlSYWRrdUFDdHZydGkuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQzID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVmF6YnlSYWRrdUFDdHZydGlEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhhdC5pc2wuVmF6YnlSYWRrdUFDdHZydGkuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjogcm93VHlwZWQzLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDMudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9yYWRlazogcm93VHlwZWQzLmRkcF9yYWRlayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9jdHZydDogcm93VHlwZWQzLmRkcF9jdHZydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVVrb25jZW5pQWt0aXZuaU9wZXJhY2UoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9ibm92aXQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRWYXpieVJhZGt1QUN0dnJ0aS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDMgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWYXpieVJhZGt1QUN0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1R5cGVkMy5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLlZhemJ5UmFka3VBQ3R2cnRpLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lVcHJhdml0M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRWYXpieVJhZGt1QUN0dnJ0aS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDMgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWYXpieVJhZGt1QUN0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWYXpieVJhZGt1QUN0dnJ0aVwiLCB7IElEOiBcIkREUEdWYXpieVJhZGt1QUN0dnJ0aSNcIiwgZGF0YTogcm93VHlwZWQzLCBlZGl0TW9kZTogdHJ1ZSB9LCBcIkRldGFpbCB2YXpieVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvcMOtcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHJvdyA9IHRoaXMuZ3JpZFZhemJ5UmFka3VBQ3R2cnRpLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGFjdCA9IHRoaXMua29waXJvdmF0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgbmFkIGdncmlkZW0gcHJvIFwiU2F6YnkgcMWZw61wYWTFr1wiXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zU2F6YnlQcmlwYWR1KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lQcmlkYXQ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdTYXpieVByaXBhZHVcIiwgeyBJRDogXCJERFBHU2F6YnlQcmlwYWR1I1wiLCBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDoSBzYXpiYVwiLCA4NTAsIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9kZWJyYXQ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGVicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkU2F6YnlQcmlwYWR1LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NhemJ5UHJpcGFkdUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGF0LmlzbC5TYXpieVByaXBhZHUuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQ0LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNfc2F6Ynk6IHJvd1R5cGVkNC5jaXNfc2F6YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lPYm5vdml0NFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkU2F6YnlQcmlwYWR1LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NhemJ5UHJpcGFkdUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1R5cGVkNC5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLlNhemJ5UHJpcGFkdS51cGRhdGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiByb3dUeXBlZDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkU2F6YnlQcmlwYWR1LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NhemJ5UHJpcGFkdUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdTYXpieVByaXBhZHVcIiwgeyBJRDogXCJERFBHU2F6YnlQcmlwYWR1I1wiLCBkYXRhOiByb3dUeXBlZDQsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgc2F6YnkgJHtyb3dUeXBlZDQuY2lzX3NhemJ5fWAsIDg1MCwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlUG9aYXZyZW5pT2tuYShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0NFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29ww61yb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2xvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcm93ID0gdGhpcy5ncmlkU2F6YnlQcmlwYWR1LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGFjdCA9IHRoaXMua29waXJvdmF0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgbmFkIGdncmlkZW0gcHJvIFwiVHlwIHBobC4gcMWZZXZvZCB2w71qaW1reSBrdGcuIFVQT1wiXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HVnlqaW1reUthdGVnb3JpaVBvaHlidVwiLCB7IElEOiBcIkREUEdWeWppbWt5S2F0ZWdvcmlpUG9oeWJ1I1wiLCBkYXRhOiB7IHR5cF9waGxfejogdGhpcy50eXBfcGhsIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsOhIHbDvWppbWthXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlUG9aYXZyZW5pT2tuYShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kZWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNSA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5amlta3lLYXRlZ29yaWlQb2h5YnVEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhhdC5pc2wuVnlqaW1reUthdGVnb3JpaVBvaHlidS5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX3o6IHJvd1R5cGVkNS50eXBfcGhsX3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX2RvOiByb3dUeXBlZDUudHlwX3BobF9kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG9fejogcm93VHlwZWQ1Lmt0Z191cG9feixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG9fZG86IHJvd1R5cGVkNS5rdGdfdXBvX2RvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZFR5cFBobFByZXZvZFZ5amlta3lLdGdVUE8uZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ1ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1R5cGVkNS5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLlZ5amlta3lLYXRlZ29yaWlQb2h5YnUudXBkYXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobF96OiByb3dUeXBlZDUudHlwX3BobF96LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobF9kbzogcm93VHlwZWQ1LnR5cF9waGxfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX3o6IHJvd1R5cGVkNS5rdGdfdXBvX3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX2RvOiByb3dUeXBlZDUua3RnX3Vwb19kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRlZERhdGE6IHJvd1R5cGVkNVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVVrb25jZW5pQWt0aXZuaU9wZXJhY2UoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreVVwcmF2aXQ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVcHJhdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZFR5cFBobFByZXZvZFZ5amlta3lLdGdVUE8uZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ1ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWeWppbWt5S2F0ZWdvcmlpUG9oeWJ1XCIsIHsgSUQ6IFwiRERQR1Z5amlta3lLYXRlZ29yaWlQb2h5YnUjXCIsIGRhdGE6IHJvd1R5cGVkNSwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCB2w71qaW1reSAke3Jvd1R5cGVkNS50eXBfcGhsX3p9IC0+ICR7cm93VHlwZWQ1LnR5cF9waGxfZG99LCAke3Jvd1R5cGVkNS5rdGdfdXBvX3p9IC0+ICR7cm93VHlwZWQ1Lmt0Z191cG9fZG99YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VQb1phdnJlbmlPa25hKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3DDrXJvdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCByb3cgPSB0aGlzLmdyaWRUeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGFjdCA9IHRoaXMua29waXJvdmF0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgbmFkIGdncmlkZW0gcHJvIFwiR2VuZXJvdsOhbsOtIFVQT1wiXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zR2VuZXJvdmFuaVVQTygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5UHJpZGF0NlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HR2VuZXJvdmFuaVVQT1wiLCB7IElEOiBcIkREUEdHZW5lcm92YW5pVVBPI1wiLCBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCwgcm9rOiB0aGlzLnJvaywgaWNvOiB0aGlzLmljbywgdWNzOiB0aGlzLnVjcyB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDvSB6w6F6bmFtXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlUG9aYXZyZW5pT2tuYShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kZWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRHZW5lcm92YW5pVVBPLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlVUE9EdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhhdC5pc2wuR2VuZXJvdmFuaVVQTy5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDYudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm93VHlwZWQ2LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogcm93VHlwZWQ2LnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogcm93VHlwZWQ2LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHJvd1R5cGVkNi5rdGdfdXBvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcm93ID0gdGhpcy5ncmlkR2VuZXJvdmFuaVVQTy5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBhY3QgPSB0aGlzLm9ibm92aXRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lVcHJhdml0NlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRHZW5lcm92YW5pVVBPLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDYgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdHZW5lcm92YW5pVVBPRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR0dlbmVyb3ZhbmlVUE9cIiwgeyBJRDogXCJERFAjR0dlbmVyb3ZhbmlVUE9cIiwgZGF0YTogcm93VHlwZWQ2LCBlZGl0TW9kZTogdHJ1ZSB9LCBgRGV0YWlsIHrDoXpuYW11YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VQb1phdnJlbmlPa25hKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3DDrXJvdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCByb3cgPSB0aGlzLmdyaWRHZW5lcm92YW5pVVBPLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGFjdCA9IHRoaXMua29waXJvdmF0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgbmFkIGdncmlkZW0gcHJvIFwiR2VuZXJvdsOhbsOtIE9QUlwiXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zR2VuZXJvdmFuaU9QUigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5UHJpZGF0N1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HR2VuZXJvdmFuaU9QUlwiLCB7IElEOiBcIkREUEdHZW5lcm92YW5pT1BSI1wiLCBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCwgcm9rOiB0aGlzLnJvaywgaWNvOiB0aGlzLmljbywgdWNzOiB0aGlzLnVjcyB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDvSB6w6F6bmFtXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlUG9aYXZyZW5pT2tuYShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdDdcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kZWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRHZW5lcm92YW5pT1BSLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNyA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlPUFJEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhhdC5pc2wuR2VuZXJvdmFuaU9QUi5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDcudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm93VHlwZWQ3LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogcm93VHlwZWQ3LnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogcm93VHlwZWQ3LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHJvd1R5cGVkNy5rdGdfdXBvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdDdcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcm93ID0gdGhpcy5ncmlkR2VuZXJvdmFuaU9QUi5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBhY3QgPSB0aGlzLm9ibm92aXRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lVcHJhdml0N1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXByYXZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRHZW5lcm92YW5pT1BSLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNyA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlPUFJEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HR2VuZXJvdmFuaU9QUlwiLCB7IElEOiBcIkREUEdHZW5lcm92YW5pT1BSI1wiLCBkYXRhOiByb3dUeXBlZDcsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgesOhem5hbXVgLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdDdcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvcMOtcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHJvdyA9IHRoaXMuZ3JpZEdlbmVyb3ZhbmlPUFIuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1XCIsIFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdS5cIik7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBhY3QgPSB0aGlzLmtvcGlyb3ZhdEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChhY3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBhY3QuZG9uZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBha2PDrSB0bGHEjcOtdGVrIG5hZCBnZ3JpZGVtIHBybyBcIkdlbmVyb3bDoW7DrSBGS1wiXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zR2VuZXJvdmFuaUZLKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lQcmlkYXRGS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HR2VuZXJvdmFuaUZLXCIsIHsgSUQ6IFwiRERQR0dlbmVyb3ZhbmlGSyNcIiwgZGF0YTogeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwsIHJvazogdGhhdC5yb2ssIGljbzogdGhhdC5pY28sIHVjczogdGhhdC51Y3MgfSwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiTm92w70gesOhem5hbVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9kZWJyYXRGS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RlYnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZEdlbmVyb3ZhbmlGSy5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZEZLID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaUZLRHRvPnJvdztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGF0LmlzbC5HZW5lcm92YW5pRksuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZEZLLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm93VHlwZWRGSy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogcm93VHlwZWRGSy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogcm93VHlwZWRGSy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHJvd1R5cGVkRksua3RnX3Vwb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFrY2VVa29uY2VuaUFrdGl2bmlPcGVyYWNlKGFjdCk7IC8vIDwtIG5lamVkbsOhIHNlIG8gR1Jlc3BvbnNlIG9wZXJhY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3QuZmFpbCgoanFYSFIsIHR5cCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmdldEZhaWxGcm9tSXNsKHRoYXQsIGpxWEhSLCB0eXAsIG9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChyZXREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmV0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgbWkgbmV2csOhdGlsaSDFvsOhZG7DqSBkYXRhLCB2eWhvZMOtbSB2eWrDrW1rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkFwbGlrYcSNbsOtIGNoeWJhXCIsIFwiU2VydmVyIG5ldnLDoXRpbCDFvsOhZG7DoSBkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVtw6FtIGluZm9ybWFjaSBvIMO6c3DEm2NodSBvcGVyYWNlLCB6YcSNbnUgemppxaHFpW92YXQgZMWvdm9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0RGF0YS5yZXN1bHQ/LmtpbmQgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmppc3TDrW0gemRhIG3DoW0gbsSbamFrw6kgenByw6FjaHkgbyBjaHlixJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0RGF0YS5yZXN1bHQ/LmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgdiBjeWtsdSBzaSBqZSBwxZlpZMOhbSBkbyBzdHJpbmd1IGt0ZXLDvSB2eWhvZMOtbSB2IG9rbsSbIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnJvck1zZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldERhdGEucmVzdWx0Py5lcnJvcnMuZm9yRWFjaCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyArPSBtc2cubWVzc2FnZSArIFwiIDxicj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIGVycm9yTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmV6bsOhbcOhIGNoeWJhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5jbG9zZSh0cnVlKTsgLy8gcG9rdWQgamUgw7pzcMSbY2ggemF2xZl1IG9rbm8gKHRydWUgcG9zbMOhbSBhYnkgc2UgdsSbZMSbbG8gxb5lIG5lamRlIG8gb2J5xI1lam7DqSB6YXbFmWVuw60gb2tuYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9ibm92aXRGS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCByb3cgPSB0aGlzLmdyaWRHZW5lcm92YW5pRksuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgYWN0ID0gdGhpcy5vYm5vdml0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5VXByYXZpdEZLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVcHJhdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZEdlbmVyb3ZhbmlGSy5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWRGSyA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlGS0R0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdHZW5lcm92YW5pRktcIiwgeyBJRDogXCJERFAjR0dlbmVyb3ZhbmlGS1wiLCBkYXRhOiByb3dUeXBlZEZLLCBlZGl0TW9kZTogdHJ1ZSB9LCBgRGV0YWlsIHrDoXpuYW11YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VQb1phdnJlbmlPa25hKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRGS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29ww61yb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2xvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHJvdyA9IHRoaXMuZ3JpZEdlbmVyb3ZhbmlGSy5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIMWZw6FkZWtcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcm93VHlwZWQgPSA8eyB0eXBfcGhsOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIH0+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HVnliZXJUeXB1UG9obGVkYXZreVwiLCB7IElEOiBcIkREUEdWeWJlclR5cHVQb2hsZWRhdmt5I1wiLCB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsIH0sIFwiVsO9YsSbciB6ZHJvam92w6lobyB0eXB1IHBvaGxlZMOhdmt5XCIsIDYwMCwgMzAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHJldFZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCBwcm9tOiBKUXVlcnlQcm9taXNlPGFueT4gfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHByb20gPSB0aGF0LmlzbC5HZW5lcm92YW5pRksuY29weShycSA9PiB7IHJldHVybiB7IGRhdGE6IHsgaXhwX2RlbjogdGhpcy5peHBfZGVuLCB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsLCB0eXBfcGhsX3NvdXJjZTogcmV0VmFsLnR5cF9waGwgfSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChwcm9tICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UocHJvbSwgdGhpcywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGFjdCA9IGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGFrY8OtIHRsYcSNw610ZWsgbmFkIGdncmlkZW0gcHJvIFwiUG9sb8W+a3kgU01MIHBybyBrYXQuIHBvaHlixa9cIlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9uc1BvbG96a3lTTUxQcm9LYXRQb2h5YnUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreVByaWRhdDhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1BvbG96a3lTTUxcIiwgeyBJRDogXCJERFBHUG9sb3preVNNTCNcIiwgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwgfSwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiTm92w70gesOhem5hbVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVBvWmF2cmVuaU9rbmEoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9kZWJyYXQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGVicmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkUG9sb3preVNNTFByb0thdFBvaHlidS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDggPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQb2xvemt5U01MRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoYXQuaXNsLlBvbG96a3lTTUwuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQ4LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiByb3dUeXBlZDgua3RnX3Vwb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWtjZVVrb25jZW5pQWt0aXZuaU9wZXJhY2UoYWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreU9ibm92aXQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWRQb2xvemt5U01MUHJvS2F0UG9oeWJ1LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1BvbG96a3lTTUxEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhhdC5pc2wuUG9sb3preVNNTC51cGRhdGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiByb3dUeXBlZDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ha2NlVWtvbmNlbmlBa3Rpdm5pT3BlcmFjZShhY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5VXByYXZpdDhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkUG9sb3preVNNTFByb0thdFBvaHlidS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDggPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQb2xvemt5U01MRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdCA9IHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1BvbG96a3lTTUxcIiwgeyBJRDogXCJERFBHUG9sb3preVNNTCNcIiwgZGF0YTogcm93VHlwZWQ4LCBlZGl0TW9kZTogdHJ1ZSB9LCBgRGV0YWlsIHrDoXpuYW11YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrY2VQb1phdnJlbmlPa25hKGFjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3DDrXJvdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCByb3cgPSB0aGlzLmdyaWRQb2xvemt5U01MUHJvS2F0UG9oeWJ1LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGFjdCA9IHRoaXMua29waXJvdmF0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGFjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogVnpvciBNRU5VQkFSdVxyXG4gICAgICAgIHRoaXMubWVudUJhcihbe1xyXG4gICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXRcIl0sXHJcbiAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXRcIl0sXHJcbiAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXRcIl0sXHJcbiAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVVwcmF2aXRcIl0sXHJcbiAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdFwiXSxcclxuICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICB9XSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvKiBWem9yIEFrY2UgUMWYSURBVFxyXG4gICAgICAgICAgICBwcml2YXRlIHByaWRhdEFjdGlvbigpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgbGV0IGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ2lzZWxuaWt5LkdDaXNlbG5pa0R0byA9IHRoaXMubWFpbkZvcm0hLmZpbmRGaWVsZHMoXCJjaXNlbG5pa1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKCFjaXNlbG5paylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2lzZWxuaWsuVHlwISkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa1JhZGt1OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0Npc2VsbmlrUmFka3VcIiwgeyBJRDogXCJHQ2lzZWxuaWtSYWRrdUREUCNcIiwgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwsIGl4cF9kZW46IHRoaXMuaXhwX2RlbiB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDvSDFmcOhZGVrXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWtDdHZydGlcIiwgeyBJRDogXCJHQ2lzZWxuaWtDdHZydGlERFAjXCIsIGRhdGE6IHsgdHlwX3BobDogdGhpcy50eXBfcGhsLCBpeHBfZGVuOiB0aGlzLml4cF9kZW4gfSwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiTm92w6EgxI10dnLFpVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlZhemJ5UmFka3VBQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWYXpieVJhZGt1QUN0dnJ0aVwiLCBJRDogXCJHVmF6YnlSYWRrdUFDdHZydGlERFAjXCIsIHsgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwsIGl4cF9kZW46IHRoaXMuaXhwX2RlbiB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDoSB2YXpiYVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlNhemJ5UHJpcGFkdTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HU2F6YnlQcmlwYWR1XCIsIHsgSUQ6IFwiR1NhemJ5UHJpcGFkdUREUCNcIiwgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwgfSwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiTm92w6Egc2F6YmFcIiwgODUwLCA1MDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5UeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWeWppbWt5S2F0ZWdvcmlpUG9oeWJ1XCIsIHsgSUQ6IFwiR1Z5amlta3lLYXRlZ29yaWlQb2h5YnVERFAjXCIsIGRhdGE6IHsgdHlwX3BobF96OiB0aGlzLnR5cF9waGwgfSwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiTm92w6EgdsO9amlta2FcIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdHZW5lcm92YW5pVVBPXCIsIHsgSUQ6IFwiR0dlbmVyb3ZhbmlVUE9ERFAjXCIsIGRhdGE6IHsgdHlwX3BobDogdGhpcy50eXBfcGhsLCByb2s6IHRoaXMucm9rLCBpY286IHRoaXMuaWNvLCB1Y3M6IHRoaXMudWNzIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsO9IHrDoXpuYW1cIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pT1BSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdHZW5lcm92YW5pT1BSXCIsIHsgSUQ6IFwiRERQR0dlbmVyb3ZhbmlPUFIjXCIsIGRhdGE6IHsgdHlwX3BobDogdGhpcy50eXBfcGhsLCByb2s6IHRoaXMucm9rLCBpY286IHRoaXMuaWNvLCB1Y3M6IHRoaXMudWNzIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsO9IHrDoXpuYW1cIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5Qb2xvemt5U01MUHJvS2F0UG9oeWJ1OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdQb2xvemt5U01MXCIsIHsgSUQ6IFwiRERQR1BvbG96a3lTTUwjXCIsIGRhdGE6IHsgdHlwX3BobDogdGhpcy50eXBfcGhsIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsO9IHrDoXpuYW1cIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHByaXZhdGUgb2RlYnJhdEFjdGlvbigpOiBKUXVlcnlQcm9taXNlPEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdSZXNwb25zZTxhbnk+PiB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2lzZWxuaWs6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5DaXNlbG5pa3kuR0Npc2VsbmlrRHRvID0gdGhpcy5tYWluRm9ybSEuZmluZEZpZWxkcyhcImNpc2VsbmlrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWNpc2VsbmlrKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCEpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa1JhZGt1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuQ2lzZWxuaWtSYWRrdS5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHJvd1R5cGVkLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHJvd1R5cGVkLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9yYWRlazogcm93VHlwZWQuZGRwX3JhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa0N0dnJ0aTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQyID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HQ2lzZWxuaWtDdHZydGlEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5DaXNlbG5pa0N0dnJ0aS5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHJvd1R5cGVkMi5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDIudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGRwX2N0dnJ0OiByb3dUeXBlZDIuZGRwX2N0dnJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5WYXpieVJhZGt1QUN0dnJ0aTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQzID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVmF6YnlSYWRrdUFDdHZydGlEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5WYXpieVJhZGt1QUN0dnJ0aS5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHJvd1R5cGVkMy5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDMudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGRwX3JhZGVrOiByb3dUeXBlZDMuZGRwX3JhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZHBfY3R2cnQ6IHJvd1R5cGVkMy5kZHBfY3R2cnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlNhemJ5UHJpcGFkdTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ0ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HU2F6YnlQcmlwYWR1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuU2F6YnlQcmlwYWR1LmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQ0LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc19zYXpieTogcm93VHlwZWQ0LmNpc19zYXpieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ1ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlZ5amlta3lLYXRlZ29yaWlQb2h5YnUuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX3o6IHJvd1R5cGVkNS50eXBfcGhsX3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGxfZG86IHJvd1R5cGVkNS50eXBfcGhsX2RvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX3o6IHJvd1R5cGVkNS5rdGdfdXBvX3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG9fZG86IHJvd1R5cGVkNS5rdGdfdXBvX2RvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDYgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdHZW5lcm92YW5pVVBPRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuR2VuZXJvdmFuaVVQTy5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHJvd1R5cGVkNi50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHJvd1R5cGVkNi5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogcm93VHlwZWQ2LnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiByb3dUeXBlZDYuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiByb3dUeXBlZDYua3RnX3Vwb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaU9QUjpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ3ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaU9QUkR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkdlbmVyb3ZhbmlPUFIuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDcudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiByb3dUeXBlZDcucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHJvd1R5cGVkNy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogcm93VHlwZWQ3LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwbzogcm93VHlwZWQ3Lmt0Z191cG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlBvbG96a3lTTUxQcm9LYXRQb2h5YnU6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkOCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1BvbG96a3lTTUxEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Qb2xvemt5U01MLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQ4LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHJvd1R5cGVkOC5rdGdfdXBvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHByaXZhdGUgb2Jub3ZpdEFjdGlvbigpOiBKUXVlcnlQcm9taXNlPEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdSZXNwb25zZTxhbnk+PiB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2lzZWxuaWs6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5DaXNlbG5pa3kuR0Npc2VsbmlrRHRvID0gdGhpcy5tYWluRm9ybSEuZmluZEZpZWxkcyhcImNpc2VsbmlrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWNpc2VsbmlrKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3VcIiwgXCJWeWJlcnRlIMWZw6FkZWsgxI3DrXNlbG7DrWt1LlwiKTs7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCEpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa1JhZGt1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByb3dUeXBlZC5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuQ2lzZWxuaWtSYWRrdS51cGRhdGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiByb3dUeXBlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkMiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrQ3R2cnRpRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByb3dUeXBlZDIuYWt0aXZpdGEgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVmF6YnlSYWRrdUFDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkMyA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ZhemJ5UmFka3VBQ3R2cnRpRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByb3dUeXBlZDMuYWt0aXZpdGEgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlZhemJ5UmFka3VBQ3R2cnRpLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuU2F6YnlQcmlwYWR1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTYXpieVByaXBhZHVEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd1R5cGVkNC5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuU2F6YnlQcmlwYWR1LnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ1ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93VHlwZWQ1LmFrdGl2aXRhID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5WeWppbWt5S2F0ZWdvcmlpUG9oeWJ1LnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobF96OiByb3dUeXBlZDUudHlwX3BobF96LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX2RvOiByb3dUeXBlZDUudHlwX3BobF9kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwb196OiByb3dUeXBlZDUua3RnX3Vwb196LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX2RvOiByb3dUeXBlZDUua3RnX3Vwb19kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGVkRGF0YTogcm93VHlwZWQ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuUG9sb3preVNNTFByb0thdFBvaHlidTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ2ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUG9sb3preVNNTER0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlBvbG96a3lTTUwudXBkYXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YTogcm93VHlwZWQ2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvKlxyXG4gICAgICAgIHByaXZhdGUgdXByYXZpdEFjdGlvbigpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLm1haW5Gb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghY2lzZWxuaWspXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2lzZWxuaWsuVHlwISkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa1JhZGt1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrUmFka3VEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0Npc2VsbmlrUmFka3VcIiwgeyBJRDogXCJERFBHQ2lzZWxuaWtSYWRrdSNcIiwgZGF0YTogcm93VHlwZWQsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgxZnDoWRrdSAke3Jvd1R5cGVkLmRkcF9yYWRla31gLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkNpc2VsbmlrQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDIgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa0N0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWtDdHZydGlcIiwgeyBJRDogXCJERFBHQ2lzZWxuaWtDdHZydGkjXCIsIGRhdGE6IHJvd1R5cGVkMiwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCDEjXR2cnRpICR7cm93VHlwZWQyLmRkcF9jdHZydH1gLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlZhemJ5UmFka3VBQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDMgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWYXpieVJhZGt1QUN0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1ZhemJ5UmFka3VBQ3R2cnRpXCIsIHsgSUQ6IFwiRERQR1ZhemJ5UmFka3VBQ3R2cnRpI1wiLCBkYXRhOiByb3dUeXBlZDMsIGVkaXRNb2RlOiB0cnVlIH0sIFwiRGV0YWlsIHZhemJ5XCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuU2F6YnlQcmlwYWR1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTYXpieVByaXBhZHVEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdTYXpieVByaXBhZHVcIiwgeyBJRDogXCJERFBHU2F6YnlQcmlwYWR1I1wiLCBkYXRhOiByb3dUeXBlZDQsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgc2F6YnkgJHtyb3dUeXBlZDQuY2lzX3NhemJ5fWAsIDg1MCwgNTAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ1ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1Z5amlta3lLYXRlZ29yaWlQb2h5YnVcIiwgeyBJRDogXCJERFBHVnlqaW1reUthdGVnb3JpaVBvaHlidSNcIiwgZGF0YTogcm93VHlwZWQ1LCBlZGl0TW9kZTogdHJ1ZSB9LCBgRGV0YWlsIHbDvWppbWt5ICR7cm93VHlwZWQ1LnR5cF9waGxfen0gLT4gJHtyb3dUeXBlZDUudHlwX3BobF9kb30sICR7cm93VHlwZWQ1Lmt0Z191cG9fen0gLT4gJHtyb3dUeXBlZDUua3RnX3Vwb19kb31gLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkdlbmVyb3ZhbmlVUE86XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlVUE9EdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdHZW5lcm92YW5pVVBPXCIsIHsgSUQ6IFwiRERQR0dlbmVyb3ZhbmlVUE8jXCIsIGRhdGE6IHJvd1R5cGVkNiwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCB6w6F6bmFtdWAsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaU9QUjpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ3ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaU9QUkR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR0dlbmVyb3ZhbmlPUFJcIiwge0lEOiBcIkREUEdHZW5lcm92YW5pT1BSI1wiLCAgZGF0YTogcm93VHlwZWQ3LCBlZGl0TW9kZTogdHJ1ZSB9LCBgRGV0YWlsIHrDoXpuYW11YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5Qb2xvemt5U01MUHJvS2F0UG9oeWJ1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDggPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQb2xvemt5U01MRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HUG9sb3preVNNTFwiLCB7SUQ6IFwiRERQR1BvbG96a3lTTUwjXCIsICBkYXRhOiByb3dUeXBlZDgsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgesOhem5hbXVgLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcHJpdmF0ZSBrb3Bpcm92YXRBY3Rpb24oKTogSlF1ZXJ5LlByb21pc2U8YW55LCBhbnksIGFueT4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLm1haW5Gb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghY2lzZWxuaWspXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSDFmcOhZGVrIMSNw61zZWxuw61rdVwiLCBcIlZ5YmVydGUgxZnDoWRlayDEjcOtc2VsbsOta3UuXCIpOztcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2lzZWxuaWsuVHlwISkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa1JhZGt1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa0N0dnJ0aTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQgPSA8eyB0eXBfcGhsOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIH0+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HVnliZXJUeXB1UG9obGVkYXZreVwiLCB7IElEOiBcIkREUEdWeWJlclR5cHVQb2hsZWRhdmt5I1wiLCB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsIH0sIFwiVsO9YsSbciB6ZHJvam92w6lobyB0eXB1IHBvaGxlZMOhdmt5XCIsIDYwMCwgMzAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbSA9IHRoYXQuaXNsLkNpc2VsbmlrUmFka3UuY29weShycSA9PiB7IHJldHVybiB7IHJxOiB7IERhdGE6IHsgaXhwX2RlbjogdGhpcy5peHBfZGVuLCB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsLCB0eXBfcGhsX3NvdXJjZTogcmV0VmFsLnR5cF9waGwgfSB9IH07IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb20gPSB0aGF0LmlzbC5DaXNlbG5pa0N0dnJ0aS5jb3B5KHJxID0+IHsgcmV0dXJuIHsgcnE6IHsgRGF0YTogeyBpeHBfZGVuOiB0aGlzLml4cF9kZW4sIHR5cF9waGw6IHJvd1R5cGVkLnR5cF9waGwsIHR5cF9waGxfc291cmNlOiByZXRWYWwudHlwX3BobCB9IH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShwcm9tLCB0aGlzLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbn0iXX0=