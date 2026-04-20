"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDetailVratky.ts                       </Name>
//    <Description> Detail vratky                                               </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-07                                                  </Created>
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
            let GDetailVratky = class GDetailVratky extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    this.nastaveniPrepoctu = false;
                    this.zpHotove = [10, 50, 51, 52, 53, 54, 42, 73];
                    //#endregion
                    this.init = true;
                    //########################################################################################
                    //########################################################################################
                    //#region zkontrolujVratku
                    ////########################################################################################
                    ///**
                    // * Akce pro kontrolu dat vratky
                    // * @method zkontrolujVratku()
                    // * @param {Gordic.Ddp.Interface.LK.Isl.GPredpisDto} dataVratky - DTO vratky
                    // */
                    //zkontrolujVratku(dataVratky: Gordic.Ddp.Interface.LK.Isl.GPredpisDto) {
                    //    const that = this;
                    //    //#region Kontroly dat před uložením (v guptě Function: KontrolaPoli())
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //kontrola způsoby úhrady, je-li zadán chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    //    if (dataVratky.zp == 0 || dataVratky.zp == 40 || dataVratky.zp == 60 || dataVratky.zp == 70) {
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Tento způsob úhrady není možné pro vratku použít!").on("close", (ev, retVal) => {
                    //            that.element.findForms("zakladniInfoForm").findFields("zp").gfield('focus')
                    //        });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //TODO: Kontrola při uložení před tiskem zda je vyplněný KS v případě je-li ZP=20 nebo ZP=30
                    //    // ip_okamzik -> 0-Pred tiskem | 1-pred ulozenim
                    //    //If ip_okamzik = 0 AND(((l_zp = 20) OR(l_zp = 30)) AND SalStrTrimX(l_ks) = '')
                    //    //	If NOT gf_ZobrazDotaz('Není vyplněn KS, chcete pokračovat?')
                    //    //		Call SalSetFocus(df_ks)
                    //    //		Return FALSE
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //kontrola záporných částek, je-li zadána chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    //    if (dataVratky.c! >= new Decimal(0)) {
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Částka vratky musí být záporná!")
                    //            .on("close", (ev, retVal) => {
                    //                that.element.findForms("zakladniInfoForm").findFields("c").gfield('focus')
                    //            });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //kontrola vyplnení BÚ příjemce, je-li zadán chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    //    if (dataVratky.bu_ci?.trim().length == 0 || dataVratky.bu_ci == null) {
                    //        if (!(dataVratky.zp == 10 || dataVratky.zp == 50 || dataVratky.zp == 51 || dataVratky.zp == 52 || dataVratky.zp == 53 || dataVratky.zp == 54 || dataVratky.zp == 42 || dataVratky.zp == 73)) {
                    //            that.endOperation();
                    //            return that.dialogs.error("Chyba", "Není vybrán bankovní účet příjemce!")
                    //                .on("close", (ev, retVal) => {
                    //                    that.element.findForms("zakladniInfoForm").findFields("bu_ci").gfield('focus')
                    //                });
                    //        }
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //kontrola vyplnení vlastního BÚ, je-li zadán chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    //    if (dataVratky.bu_vl?.trim().length == 0 || dataVratky.bu_vl == null) {
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Není vybrán bankovní účet vlastní!")
                    //            .on("close", (ev, retVal) => {
                    //                that.element.findForms("zakladniInfoForm").findFields("bu_vl").gfield('focus')
                    //            });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    if (dataVratky.zp == 73) { //Vrací se peníze z platby přes portál a existuje plaba POK
                    //        if (that.RecVratka.ixp_pok?.trim().length != 12) {
                    //            that.endOperation();
                    //            return that.dialogs.error("Chyba", "Tento způsob úhrady vratky je možný pouze při vracení platby placené přes platební portál!")
                    //                .on("close", (ev, retVal) => {
                    //                    that.element.findForms("zakladniInfoForm").findFields("zp").gfield('focus')
                    //                });
                    //        } else { dataVratky.ixp_pok = that.RecVratka.ixp_pok; }
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    if (that.DtoTypPhl.priz_napvra == 0 && dataVratky.dat_vzniku! <= that.DtoTypPhl.Nastaveni?.dat_uzav!) {
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Zadáno datum vzniku v uzavřeném období!")
                    //            .on("close", (ev, retVal) => {
                    //                that.element.findForms("zakladniInfoForm").findFields("dat_vzniku").gfield('focus')
                    //            });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //TODO: Kontrola vyplnění položky SML podle příznaku na BU_VL
                    //    //If gf_BuVlMaPriznakSR(df_bu_vl.bu_vl(), df_bu_vl.sk_vl(), g_typ_pohledavky.rok)
                    //    //	If df_polozka_sml.JePrazdny()
                    //    //		Call gf_ZobrazChybu('Není vyplněna povinná položka!')
                    //    //		Call SalSetFocus(df_polozka_sml)
                    //    //		Return 0
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //TODO: Kontrola že na položce SML je stejný vlastní bankovním účet jako na vratce
                    //    //If NOT df_polozka_sml.JePrazdny()
                    //    //	Call gf_VratUcetZPolozkySML(l_ixp_sml, l_rok_sml, l_cislo_sml, l_bu_vl_sml, l_sk_vl_sml)
                    //    //	If l_bu_vl_sml != l_bu_vl OR l_sk_vl_sml != l_sk_vl
                    //    //		Call gf_ZobrazChybu('Nesouhlasí bankovní účet vlastní a bankovní účet položky SML
                    //    //
                    //    //				Položka smlouvy: '|| l_bu_vl_sml||' / '||l_sk_vl_sml ||'
                    //    //				Vratka: '||df_bu_vl.bu_vl()||' / '||df_bu_vl.sk_vl()||'
                    //    //
                    //    //				Vratku nelze uložit!')
                    //    //		Call SalSetFocus(df_polozka_sml)
                    //    //		Return 0
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //Kontrola zda VS obsahuje celé číslo
                    //    const isValidInteger = /^\d+$/;
                    //    if (!isValidInteger.test(dataVratky.vs!.trim())) {
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Chybně zadaný VS!")
                    //            .on("close", (ev, retVal) => {
                    //                that.element.findForms("zakladniInfoForm").findFields("vs").gfield('focus');
                    //            });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //Kontrola Externího subjektu (ixs_esu)
                    //    if (dataVratky.ixs_esu == '0000SE00000M') { //TODO až bude glob. proměnná pro nullIxsEsu tak přepsat
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Není zadán subjekt!")
                    //            .on("close", (ev, retVal) => {
                    //                that.element.findForms("zakladniInfoForm").findFields("ixs_esu").gfield('focus');
                    //            });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //Kontrola zda při zvolené možnosti že se s vratkou má vytvořit také předpis je vyplněné políčko kategorie úč. pohybu
                    //    if (dataVratky.predpisTaky == true && dataVratky.ktg_upo_pre == 0) {
                    //        that.endOperation();
                    //        return that.dialogs.error("Chyba", "Vyberte kategorii pohybu pro předpis!")
                    //            .on("close", (ev, retVal) => {
                    //                that.element.findForms("zakladniInfoForm").findFields("ktg_upo_pre").gfield('focus');
                    //            });
                    //    }
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //Todo: pokud se jedna o vratku do ciziny nebo v cizi mene tak jeste budou treba upresnujici udaje
                    //    //if (statBU != 42 || dataVratky.mena != 0) {
                    //    ////  TODO: otevřese doplňující okno dlgZahPla
                    //    //// .... dialog meni hodnoty, tak si je radsi znovu nastavim do formulare... (NastavPole())...
                    //    //}
                    //    //?---------------------------------------------------------------------------------------------------------
                    //    //#endregion Function: KontrolaPoli
                    //}
                    //#endregion zkontrolujVratku
                    //#region Finanční kontrola
                    //beforeFKPodani(ixp: string, ktg_typ: number, rok: number): JQueryPromise<number> {
                    //    var def = $.Deferred();
                    //    let that = this.parentContent;
                    //    //this.gridVratky.ggrid<Ddp.Interface.LK.Isl.GPredpisDto>("activeRow");
                    //    //let polozkyDTO = this.gridVratky.ggrid("getView").getDataRows(false);
                    //    //var dataVratky: Gordic.Ddp.Interface.LK.Isl.GPredpisDto = that.dtoPredpis ?? {};
                    //    var polozkyDTO: Gordic.Ddp.Interface.LK.Isl.GPredpisDto = {};
                    //    this.element.findForms("zakladniInfoForm").findFields().gfield("model", "collect", polozkyDTO);
                    //    let ixsEsu = that!.findFields("ixs_esu").gfield("getValue");
                    //    //let popis = that!.findFields("formPopisField").gfield("getValue");
                    //    //ESU
                    //    //if (ixsEsu.ixs_esu === null || ixsEsu.ixs_esu == "0000SE00000M") {
                    //    //    //nějáké oznámení
                    //    //    this.notification("showToast", { id: "idFinKontrola_1", title: "", content: "Je nutné vyplnit externí subjekt!" });
                    //    //    def.reject();
                    //    //}
                    //    ////Pokladní položky
                    //    //if (polozkyDTO.length < 1) {
                    //    //    this.notification("showToast", { id: "idFinKontrola_2", title: "", content: "Pokladní doklad nemá položky!" });
                    //    //    return def.reject();
                    //    //}
                    //    return def.resolve(ktg_typ).promise();
                    //}
                    //#endregion OBSOLETE metody
                    ////#region AKCE REALIZOVAT
                    //if (that.Params.ddp_vra_zjedno != "1") {
                    //    if (that.Params.ddp_rad_vrarea == 0) {
                    //        that.permsDto.actRealizovat = false;
                    //    } else {
                    //        that.permsDto.actRealizovat = true;
                    //    }
                    //    if (that.Params.ddp_rad_vrarea == 2 && that.DtoVratka.ixs_fun_akt != that.IxsFun) {
                    //        that.permsDto.actRealizovat = false;
                    //    } else {
                    //        that.permsDto.actRealizovat = true;
                    //    }
                    //} else {
                    //    that.permsDto.actRealizovat = true;
                    //}
                    //if (that.DtoVratka.stav_por != 20) {
                    //    that.permsDto.actRealizovat = false
                    //} else {
                    //    that.permsDto.actRealizovat = true
                    //}
                    ////#endregion
                    ////#region AKCE VRATIT
                    //if (that.Params.ddp_rad_vrarea == 0) {
                    //    that.permsDto.actVratit = false;
                    //} else {
                    //    that.permsDto.actVratit = true;
                    //}
                    //if (that.Params.ddp_rad_vrarea == 2 && that.DtoVratka.ixs_fun_akt != that.IxsFun) {
                    //    that.permsDto.actVratit = false;
                    //} else {
                    //    that.permsDto.actVratit = true;
                    //}
                    //if (that.DtoVratka.stav_por != 20) {
                    //    that.permsDto.actVratit = false
                    //} else {
                    //    that.permsDto.actVratit = true
                    //}
                    ////#endregion
                    ////#region AKCE SCHVÁLIT
                    //if (that.Params.ddp_vra_zjedno != "1") {
                    //    if (that.Params.ddp_rad_vrarea == 0) {
                    //    that.permsDto.actSchvalit = false;
                    //} else {
                    //    that.permsDto.actSchvalit = true;
                    //}
                    //if (that.Params.ddp_rad_vrarea == 2 && that.DtoVratka.ixs_fun_akt != that.IxsFun) {
                    //    that.permsDto.actSchvalit = false;
                    //} else {
                    //    that.permsDto.actSchvalit = true;
                    //}
                    //} else {
                    //    that.permsDto.actSchvalit = true;
                    //}
                    //if (that.DtoVratka.stav_por != 0 && that.DtoVratka.stav_por != 10) {
                    //    that.permsDto.actSchvalit = false
                    //} else {
                    //    that.permsDto.actSchvalit = true
                    //}
                    //if (that.DtoVratka.zp == 0) {
                    //    that.permsDto.actSchvalit = false
                    //} else {
                    //    that.permsDto.actSchvalit = true
                    //}
                    ////#endregion
                    ////#region AKCE STORNO
                    //if (!((that.DtoVratka.stav_por == 0 || that.DtoVratka.stav_por == 10) || (that.DtoVratka.stav_por == 30 && (that.DtoVratka.s_uhrp == 23 || that.DtoVratka.s_uhrp == 0 || that.DtoVratka.s_uhrp == 5 || that.DtoVratka.s_uhrp == 20)))) {
                    //    that.permsDto.actStorno = false
                    //} else {
                    //    that.permsDto.actStorno = false
                    //}
                    ////#endregion
                }
                //########################################################################################
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    that.beginOperation({ id: "GNacteniOknaVratky", text: "Načítám data..." });
                    that.nastaveniKlavZkratek();
                    that.nacteniPristupu();
                    that.nactiData()
                        .done(() => {
                        /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                        that.setStatus();
                        /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                        that.endOperation({ id: "GNacteniOknaVratky" });
                        that.init = false;
                    });
                    if (that.Warning.length > 0) {
                        Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarInfo"], "<i class=\"fa fa-exclamation-triangle\"></i> ", "g-state-text g-state-error");
                    }
                    else {
                        Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarInfo"], "<i class=\"fa fa-check-circle\"></i> ", "g-state-text g-state-success");
                    }
                }
                //########################################################################################
                /**
                 * Obsluha aktivní operace
                 * @method onDetailBuilderActiveOp()
                 * @param {JQuery.Event} ev událost
                 * @param {any} ctx? původní událost a její argumenty
                 */
                onDetailBuilderActiveOp(ev, ctx) {
                    //this.setActiveOperationAndReloadData(true);
                    console.log("ActiveOP", ev.type);
                }
                //########################################################################################
                /**
                 * Metoda pro sestavení a nastavení hlavičky dokumentu
                 * @method onDetailBuilderBuild()
                 * @param builder builder detailu
                 */
                onDetailBuilderBuild(builder) {
                    const that = this;
                    let formSetup = {};
                    let headerForm = this.createHeaderForm();
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            headerForm.form.sections[0].rows[2], // PID vratky
                            headerForm.form.sections[0].rows[3] // Číslo vratky
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            headerForm.form.sections[0].rows[0], // PID případu
                            headerForm.form.sections[0].rows[1] // Typ Dokumentu                    
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            headerForm.form.sections[0].rows[4], // Pořadí
                            headerForm.form.sections[0].rows[5] // Zpracovatel
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data3] = {
                        rows: [
                            headerForm.form.sections[0].rows[6], // Příjemce (ESU)
                        ]
                    };
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    //that.builderStatusBar = ((<any>builder).statusBarDefinitions);
                    // úprava WFL/SSL komponent
                    Gordic.Ssl.DetailBuilderComponents.SslProfilDokumentEko.setTabsInitLazy(builder);
                    Gordic.Eko.Detail.changeDetailBuilderWflForEkoDefinitions(builder, true); //true //false //smazat
                    // přidá šipky do statusbaru pro posun po seznamu
                    that.listControls_setup({
                        rowToDto: function (gridState) {
                            return [
                                that.gpc,
                                {
                                    Radek_uhr: gridState.currentRow.data.radek_uhr,
                                    Edit: true,
                                    NasledujiciDetail: true
                                }
                            ];
                        },
                        nextItemTemplate: "Následující: {ixp_vra}",
                        prevItemTemplate: "Předchozí: {ixp_vra}",
                        beforeMove: undefined
                    });
                }
                //########################################################################################
                /**
                 * Obsluha události onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderInit(builder) {
                    const that = this;
                    //this.builderStatusBar = ((<any>builder).statusBarDefinitions);
                    that.loadSazbaAndKurz();
                    builder.withComponent("GDdpDetailVratky", {
                        // Texts - texty
                        texts: {},
                        // Actions - registrace akci kontentu
                        actions: {
                            actGPripadVratkaVynutitZavreni: {
                                name: "actGPripadVratkaVynutitZavreni",
                                caption: "Zavřit",
                                description: "Vynutit zavření vratky bez další akce",
                                run: function () {
                                    that.close();
                                }
                            },
                            actGPripadVratkaSave: {
                                name: "actGPripadVratkaSave",
                                caption: "Uložit",
                                icon: "fa-floppy-o",
                                //enabled: that.permsDto.save!,
                                run: function () {
                                    that.ok(0);
                                }
                            },
                            actGPripadVratkaSaveClose: {
                                name: "actGPripadVratkaSaveClose",
                                caption: "Uložit a zavřít",
                                icon: "fa-floppy-o",
                                //enabled: that.permsDto.save!,
                                run: function () {
                                    that.ok(1);
                                }
                            },
                            actGPripadVratkaPodani: {
                                name: "actGPripadVratkaPodani",
                                caption: "Podání",
                                tooltip: "Pořízení nové vratky",
                                icon: "gi-plus",
                                //enabled: that.permsDto.actPodani!,
                                run: () => {
                                    const that = this;
                                    let vratka = { ixp: this.Ixp };
                                    that.beginOperation("Podání nové vratky...");
                                    that.isl.PripadVratky.vytvorVratkuPripadu(rq => { return { data: vratka }; })
                                        .get()
                                        .done(function (ret) {
                                        that.endOperation();
                                        that.navigate("Gordic.Ddp.WebClient.GDetailVratky", { ID: 'DDPGVratka#', Typ_phl: that.Typ_phl, Ixp: that.Ixp, Radek_uhr: ret.result.data.radek_uhr, Edit: false, })
                                            .on("close", (ev, retVal) => {
                                            //that.viewVratky.requestData();
                                        });
                                    })
                                        .fail(function (xhr, type, vobj) {
                                        that.endOperation();
                                        if (type === "exception") {
                                            vobj.handled = true;
                                            return that.dialogs.error("Chyba", vobj.baseMessage);
                                        }
                                    });
                                }
                            },
                            actGPripadDetail: {
                                name: "actGPripadDetail",
                                caption: "Detail případu",
                                tooltip: "Otevření detailu případu",
                                //enabled: that.permsDto.actPripad!,
                                run: () => {
                                    //debugger; 
                                    WebClient.Common.Pripady.openPripadDetail(this, that.Ixp);
                                    //this.navigate(
                                    //    "Gordic.Ddp.WebClient.GPripadDetail",
                                    //    {
                                    //        ID: "DDPGPripadDetail#",
                                    //        Ixp: that.Ixp,
                                    //        TypPhl: that.Typ_phl,
                                    //    }
                                    //);
                                }
                            },
                            //actTiskDok: Gordic.Eko.Action.actionTisk({
                            //    name: "actTiskDok",
                            //    tema: "ddp_ptm_vratka",
                            //    serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:VratkaDokladu",
                            //    reportStarting: function (rep) {
                            //        rep.customDto = {
                            //            ixp: that.DtoVratka.ixp,
                            //            ixs_esu: that.DtoVratka.ixs_esu,
                            //            udajePredpisu: that.DtoVratka
                            //        }
                            //    }
                            //}),                        
                            actGPripadVratkaTisk: {
                                name: "actGPripadVratkaTisk",
                                caption: "Tisk",
                                tooltip: "Tisk vratky",
                                icon: "gi-print",
                                //enabled: that.permsDto.actTisk!, 
                                run: () => {
                                    const _that = this;
                                    //Kontrola zpracovatele dokumentu
                                    if (that.Params.ddp_rad_vratka != 1) { // maybe && ?
                                        if (that.DtoPripad.ixs_fun_akt != that.IxsFun) {
                                            return that.dialogs.error("Chyba", "Nejste zpracovatelem dokumentu!"); //? Konec akce ?
                                        }
                                    }
                                    const actGTiskVratkyPripadu = GAction.createPrintAction({
                                        name: "actTiskVratkaPripadu",
                                        tema: "ddp_ptm_vratka", //'ddp_ptm_vratka'
                                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:VratkaDokladu",
                                        reportStarting: function (rep) {
                                            rep.customDto = {
                                                ixp: that.DtoVratka.ixp,
                                                ixs_esu: that.DtoVratka.ixs_esu,
                                                udajePredpisu: that.DtoVratka
                                            };
                                        },
                                    });
                                    actGTiskVratkyPripadu.run();
                                }
                            },
                            actGPripadVratkaObnovit: {
                                name: "actGPripadVratkaObnovit",
                                caption: "Obnovit",
                                tooltip: "Obnova vratky",
                                //enabled: that.permsDto.actObnovit!,
                                run: () => {
                                    const _that = this;
                                    _that.beginOperation();
                                    var rq = { idDdpPripadu: that.DtoVratka.ixp, radekUhrady: that.DtoVratka.radek_uhr };
                                    that.isl.PripadVratky.obnovaVratkyPripadu(rq).get()
                                        .done(function (ret) {
                                        _that.endOperation();
                                        //TODO: operace po aktualizaci vratky
                                        //! aktualizovat stav vratky
                                        //! např.je - li vratka stornována tuším že by se s ní nemělo nic dát dělat -> znepřístupnizt políčka a tlačítka
                                        that.reloadDetailVratky().done(() => {
                                            that.nacteniPristupu();
                                        });
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        _that.endOperation();
                                        if (typ === "exception") {
                                            obj.handled = true;
                                            return that.dialogs.error("Chyba", obj.baseMessage);
                                        }
                                    });
                                }
                            },
                            actGPripadVratkaStorno: {
                                name: "actGPripadVratkaStorno",
                                caption: "Storno",
                                tooltip: "Storno vratky",
                                //enabled: that.permsDto.actStorno!, 
                                run: () => {
                                    const _that = this;
                                    _that.beginOperation();
                                    var rq = { idDdpPripadu: that.DtoVratka.ixp, radekUhrady: that.DtoVratka.radek_uhr };
                                    that.isl.PripadVratky.stornoVratkyPripadu(rq).get()
                                        .done(function (ret) {
                                        _that.endOperation();
                                        //TODO: operace po aktualizaci vratky
                                        //! aktualizovat stav vratky
                                        //! např.je - li vratka stornována tuším že by se s ní nemělo nic dát dělat -> znepřístupnizt políčka a tlačítka
                                        that.reloadDetailVratky().done(() => {
                                            that.nacteniPristupu();
                                        });
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        _that.endOperation();
                                        if (typ === "exception") {
                                            obj.handled = true;
                                            return that.dialogs.error("Chyba", obj.baseMessage);
                                        }
                                    });
                                }
                            },
                            actGPripadVratkaSchvalit: {
                                name: "actGPripadVratkaSchvalit",
                                caption: "Schválit",
                                tooltip: "Schválení vratky",
                                //enabled: that.permsDto.actSchvalit!, 
                                run: () => {
                                    const _that = this;
                                    _that.beginOperation();
                                    var rq = { idDdpPripadu: that.DtoVratka.ixp, radekUhrady: that.DtoVratka.radek_uhr };
                                    that.isl.PripadVratky.schvalVratkyPripadu(rq).get()
                                        .done(function (ret) {
                                        _that.endOperation();
                                        //TODO: operace po aktualizaci vratky
                                        //! aktualizovat stav vratky
                                        //! např.je - li vratka stornována tuším že by se s ní nemělo nic dát dělat -> znepřístupnizt políčka a tlačítka
                                        that.reloadDetailVratky().done(() => {
                                            that.nacteniPristupu();
                                        });
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        _that.endOperation();
                                        if (typ === "exception") {
                                            obj.handled = true;
                                            return that.dialogs.error("Chyba", obj.baseMessage);
                                            //return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si kontrolu přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistence = false, { confirm: true })); });
                                        }
                                    });
                                }
                            },
                            actGPripadVratkaVratit: {
                                name: "actGPripadVratkaVratit",
                                caption: "Vratit",
                                tooltip: "Vrácení vratky",
                                //enabled: that.permsDto.actVratit!, 
                                run: () => {
                                    const _that = this;
                                    _that.beginOperation("Nastavuju realizaci vratky...");
                                    var rq = { idDdpPripadu: that.DtoVratka.ixp, radekUhrady: that.DtoVratka.radek_uhr };
                                    that.isl.PripadVratky.vratVratkyPripadu(rq).get()
                                        .done(function (ret) {
                                        _that.endOperation();
                                        //TODO: operace po aktualizaci vratky
                                        //! aktualizovat stav vratky
                                        //! např.je - li vratka stornována tuším že by se s ní nemělo nic dát dělat -> znepřístupnizt políčka a tlačítka
                                        that.reloadDetailVratky().done(() => {
                                            that.nacteniPristupu();
                                        });
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        _that.endOperation();
                                        if (typ === "exception") {
                                            obj.handled = true;
                                            return that.dialogs.error("Chyba", obj.baseMessage);
                                        }
                                    });
                                }
                            },
                            actGPripadVratkaRealizovat: {
                                name: "actGPripadVratkaRealizovat",
                                caption: "Realizovat",
                                tooltip: "Realizace vratky",
                                //enabled: that.permsDto.actRealizovat!,
                                run: () => {
                                    const _that = this;
                                    _that.beginOperation();
                                    var rq = { idDdpPripadu: that.DtoVratka.ixp, radekUhrady: that.DtoVratka.radek_uhr };
                                    that.isl.PripadVratky.realizujVratkyPripadu(rq).get()
                                        .done(function (ret) {
                                        _that.endOperation();
                                        //TODO: operace po aktualizaci vratky
                                        //! aktualizovat stav vratky
                                        //! např.je - li vratka stornována tuším že by se s ní nemělo nic dát dělat -> znepřístupnizt políčka a tlačítka
                                        that.reloadDetailVratky().done(() => {
                                            that.nacteniPristupu();
                                        });
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        that.endOperation();
                                        if (typ === "exception") {
                                            obj.handled = true;
                                            return that.dialogs.error("Chyba", obj.baseMessage);
                                            //return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si kontrolu přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistence = false, { confirm: true })); });
                                        }
                                    });
                                }
                            },
                            actGPripadVratkaNastaveniSaldaAktualni: {
                                name: "actGPripadVratkaNastaveniSaldaAktualni",
                                caption: "Vložení aktuálního salda",
                                tooltip: "Vloží aktuální saldo (přeplatek) do políčka částky",
                                run: () => {
                                    that.element.findForms().findFields("c").gfield("setValue", that.SaldoAktu);
                                }
                            },
                            actGPripadVratkaNastaveniSaldaCelkem: {
                                name: "actGPripadVratkaNastaveniSaldaCelkem",
                                caption: "Vložení celkového salda",
                                tooltip: "Vloží celkové saldo (přeplatek) do políčka částky",
                                run: () => {
                                    that.element.findForms().findFields("c").gfield("setValue", that.SaldoCelk);
                                }
                            },
                            actTestNastaveniPolicek: {
                                name: "actTestNastaveniPolicek",
                                caption: "Nastav políčka",
                                tooltip: "Test nastavení políček ss,bu_vl,bu_ci",
                                run: () => {
                                    that.testNastaveniPolicek();
                                }
                            },
                        },
                        // MenuBar - horní lišta s tlačítky
                        menuBar: [
                            //{ action: "actTestNastaveniPolicek",    favorite: true, align: "normal", }, // TEST
                            { action: "actGPripadVratkaPodani", favorite: true, align: "normal", }, // podání nové vratky
                            { action: "actGPripadVratkaTisk", favorite: true, align: "normal", }, // tisk vratky
                            { action: "actGPripadDetail", favorite: true, align: "normal", }, // otevřít detail předpisu 
                            { action: "actGPripadVratkaObnovit", favorite: true, align: "normal", }, // obnova vratky
                            { action: "actGPripadVratkaStorno", favorite: true, align: "normal", }, // storno vratky
                            { action: "actGPripadVratkaSchvalit", favorite: true, align: "normal", }, // schválení vratky
                            { action: "actGPripadVratkaVratit", favorite: true, align: "normal", }, // vrácení vratky
                            { action: "actGPripadVratkaRealizovat", favorite: true, align: "normal", }, // vrácení vratky
                            { action: "actGPripadVratkaVynutitZavreni", favorite: false, align: "opposite", }, // vrácení vratky
                        ],
                        // ComanndBar - spodní lišta s tlačítky
                        commandBar: [{ action: "actGPripadVratkaSave", primary: true }, "actGPripadVratkaSaveClose" /*CLOSE button*/],
                        // StatusBar - stavový řádek
                        statusBar: [
                            {
                                type: "widget",
                                init: function () {
                                    return $("<div>").gcolorpicker({
                                        uzo: that.DtoVratka.wflProfil.uzo, //this.options.dto.uzo,
                                        readonly: that.DtoVratka.ixs_fun_akt != that.IxsFun,
                                        change: function (uzo) {
                                            Gordic.Isl.ColorpickerService.setUzo({
                                                Opt: {
                                                    Ixp: that.DtoVratka.ixp_vra,
                                                    Type: 0,
                                                    Uzo: uzo
                                                }
                                            }).getData().then(() => {
                                                that.DtoVratka.wflProfil.uzo = uzo;
                                            });
                                        }
                                    });
                                }
                            },
                            {
                                id: "statusSeparator0",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarInfo", tooltip: that.Warning }),
                            {
                                id: "statusSeparator1",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStavPorizeni", tooltip: "Stav pořízení", }),
                            {
                                id: "statusSeparator2",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStavUhr", tooltip: "Stav úhrady", }),
                            {
                                id: "statusSeparator3",
                                "type": "separator"
                            },
                            //Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStavStorno" }),
                            //{
                            //    id: "statusSeparator4",
                            //    "type": "separator"
                            //},
                            //Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStavTisk" }),
                            //{
                            //    id: "statusSeparator5",
                            //    "type": "separator"
                            //},
                            //Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStavIntDok" }),
                        ],
                        // KPI - Key Performance Indicator
                        kpis: {
                            kpiPosZmena: {
                                value: that.DtoVratka.dat_zmena?.toString(),
                                name: "kpiPosZmena",
                                primaryText: "Poslední změna",
                                secondaryText: parseDate(that.DtoVratka.dat_zmena).toDateString(),
                                meaning: "info",
                                itemTemplate: Gordic.Prefabs.Panels.kpiLastModifiedDocumentsTemplate().itemTemplate,
                                //!KPI Poslední změna
                                //that.kpis!.kpiPosZmena.secondaryText = parseDate(that.DtoVratka.dat_zmena!).toDateString();
                                //that.kpis?.update()
                            },
                        },
                        // TabGroups - skupiny záložek
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda(),
                            //{ id: "idTestNoveTabGroupy", caption: "Test nové Tab Groupy" }
                        ],
                        // Tabs - záložky zařaditelné do tabGroup
                        tabs: {
                            tabZakladni: {
                                init: (el) => { that.createFormBasicInfo(el); },
                                tabParams: {
                                    id: "GTabBasicInfo", title: "Základní údaje",
                                    opened: true,
                                    group: Gordic.Prefabs.TabGroups.Agenda()
                                }
                            },
                        },
                        // SidePanels - položky na bočním panelu
                        sidePanels: []
                    }, true);
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření formuláře/hlavičky dokumentu
                 * @method createHeaderForm()
                 * @returns Formulář hlavičky dokumentu
                 */
                createHeaderForm() {
                    const that = this;
                    //Definice Header Formu (údaje o případu)
                    let hForm = new Gordic.Forms.Form({ name: "formHlavickaDokumentu", })
                        //SEKCE 0
                        .addSection("Hlavička vratky") //! Hlavička vratky
                        // ROW 0
                        .addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumentuSpisu({ isPid: true, fieldOpt: { name: "ixp", disabled: !that.permsDto.ixp } }, { label: "PID případu" }))
                        // ROW 1
                        .addRow("Typ dokumentu") //Typ dokumentu 
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ",
                        disabled: !that.permsDto.ixs_typ, //this.Edit,
                        itemTemplate: "{nazev} ({ixs_typ})",
                        model: "ixs_typ=ixs_typ;ktg_typ=ktg_typ",
                        serverFilters: {
                            ktg_typ: 1900,
                            aktivita: 100,
                        },
                        dropdown: true,
                    })
                        // ROW 2
                        .addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumentuSpisu({ isPid: true, fieldOpt: { name: "ixp_vra", disabled: !that.permsDto.ixp_vra } }, { label: "PID vratky" }))
                        // ROW 3
                        .addRow("Číslo vratky")
                        .addField("gstringbox", {
                        name: "ac",
                        disabled: !that.permsDto.ac,
                    })
                        // ROW 4
                        .addRow("Pořadové číslo")
                        .addField("gnumberbox", {
                        name: "por_cislo_phl",
                        disabled: !that.permsDto.por_cislo_phl,
                    })
                        // ROW 5                
                        .addRow("Zpracovatel")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt",
                        disabled: !that.permsDto.ixs_fun_akt,
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        dropdown: true,
                    })
                        //TODO: Zjistit co má být příjemce a poté zakomponovat
                        // ROW 6
                        .addRow("Příjemce")
                        .addField("gselectbox", "w-12", {
                        name: "ixs_esu",
                        disabled: !that.permsDto.ixs_esu,
                        change: function (ev, ctx) {
                            if (!that.init) {
                                that.poZmeneSubjektu(ctx); // akce po změně subjektu
                                // ještě nastavím ostatní políčka spojená s poplatníkem (ESU)
                                //if (ctx.value.ico) that.DtoPripad.ExterniSubjekt!.ico = ctx.value.ico;
                                //if (ctx.value.dic) that.DtoPripad.ExterniSubjekt!.dic = ctx.value.dic;
                                //if (ctx.value.rc) that.DtoPripad.ExterniSubjekt!.rc = ctx.value.rc;
                                //if (ctx.value.dat_nar) that.DtoPripad.ExterniSubjekt!.dat_nar = ctx.value.dat_nar;
                            }
                        },
                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                        Logovani: {
                            Ixp: this.DtoPripad.ixp ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: (this.DtoPripad.ac_ag == null ? this.DtoPripad.ixp : this.DtoPripad.ac_ag),
                            DuvodHledaniTxt: "Výběr externího subjektu na detailu Vratky"
                        },
                        //FieldsToFilterpanel: [
                        //    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Zkratka,
                        //],
                    }));
                    return hForm;
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření hlavního formuláře detailu vratky
                 * @method createFormBasicInfo()
                 */
                createFormBasicInfo(el) {
                    const that = this;
                    var kontSplvzn = that.globalSettings.get("Global.Ddp.ZpusobyUhradySettings.UseZp" + that.IxpDen + that.Typ_phl) ?? "0";
                    var kontSplvznArray = kontSplvzn ? kontSplvzn.split(',').map((item) => parseInt(item.trim(), 10)) : [];
                    // odstranění nepovolených způsobů úhrady (0,40,60,70)
                    const disallowedPaymentMethods = [0, 40, 60, 70];
                    // vyloučení aktuálního způsobu úhrady z filtru, aby šel zobrazit i když není povolený
                    if (that.DtoVratka.zp !== undefined && that.DtoVratka.zp !== null) {
                        const index = disallowedPaymentMethods.indexOf(that.DtoVratka.zp);
                        if (index > -1) {
                            disallowedPaymentMethods.splice(index, 1);
                        }
                    }
                    kontSplvznArray = kontSplvznArray.filter(method => !disallowedPaymentMethods.includes(method));
                    //var mainForm = new Gordic.Forms.Form({ name: "zakladniInfoForm", }); //layoutDescriptor: "L2M1S1, L-2-10-0, M-12-12-0, S-12-12-0"
                    let mainForm = new Gordic.Forms.Form({ name: "zakladniInfoForm", layoutDescriptor: "L2M2S1" }) //zakladniInfoForm
                        ///////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////
                        .addSection("Vratka")
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        //initialValue: { ktg_upo: 200 },
                        disabled: !that.permsDto.ktg_upo, //
                        serverFilters: {
                            ktg_upo: that.naplneniPole(200, 220),
                            //ktg_upo: [200,205,206,207,208,209,210,215,217],
                        },
                        dropdown: true,
                        //helperColumns: ["ktg_upo", "ktg_upo_txt"]
                    })
                        .addRow("Bankovní účet vlastní")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "bu_vl",
                        flag: "required",
                        strict: false,
                        validators: [new Gordic.Validators.Required()],
                        itemTemplate: "{bu_vl:trim:encode} / {sk_vl:trim:encode}",
                        helperColumns: ["bu_vl", "sk_vl", "nazev", "uea_uc", "ueb_uc", "mena_txt"],
                        model: "sk_vl=sk_vl; bu_vl=bu_vl; rok=rok; ucs=ucs",
                        serverFilters: { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0, rok: that.rok },
                        disabled: !that.permsDto.bu_vl,
                        change: function (ev, input) {
                            that.nastavPovinnostSml(input.value?.bu_vl, input.value?.sk_vl, input.value?.priz_sr);
                        }
                    })
                        .addRow("Důvod")
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                        flag: "required",
                        validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: 254 })],
                        disabled: !that.permsDto.poznamka, //
                    })
                        .addRow("Popis")
                        .addField("gstringbox", "w-12", {
                        name: "popis",
                        validators: [new Gordic.Validators.Length({ max: 254 })],
                        disabled: !that.permsDto.popis, //
                    })
                        ///////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////
                        .addSection("Úhrada")
                        .addRow("Datum vzniku, splatnosti")
                        .addField("gdatebox", "w-6", {
                        name: "dat_vzniku", //Datum vzniku
                        //initialValue: new Date(),
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        disabled: !that.permsDto.dat_vzniku, //
                        change: function (ev, input) { }
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_spl", //Datum vzniku
                        //initialValue: new Date(),
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        disabled: !that.permsDto.dat_spl, //
                        change: function (ev, input) { }
                    })
                        .addRow("Zp. úhrady")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ekocizp(), {
                        name: "zp",
                        dropdown: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        model: "model.zp=value.zp",
                        itemTemplate: "{zp}-{zp_txt}",
                        //initialValue: { zp: 10 },
                        disabled: !that.permsDto.zp, //
                        serverFilters: {
                            s_vydaj: 1,
                            // filtr podle GUPTY na způsoby úhrady (Jaromírova pevná množina, aby mu tam náhodou někdo něco nepřidal | ZDROJ Bpl.WebClient
                            //zp: [10, 20, 30, 31, 32, 41, 42, 50, 51, 52, 53, 54, 73, 80, 81], //odebrané hodnoty: 0, 40, 60, 70   
                            zp: kontSplvznArray
                            //zp: { o: "!=", v: [0, 40, 60, 70] },
                        },
                        change: function (ev, ctx) {
                            that.nastavPovinnostBuCi(false);
                        }
                    })
                        .addRow("Bankovní účet příjemce")
                        .addField("gselectbox", "w-12", Gordic.Eko.Components.ekosuci({
                        Ixp: that.Ixp ?? "", //TODO:!!!!!!!!!!!!!!!!
                        AktZnacka: that.DtoPripad.ac_ag ?? "",
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu
                    }), {
                        name: "bu_ci",
                        disabled: !that.permsDto.bu_ci, //false,                                                          // přístupnost políčka
                        dropdown: false,
                        strict: false,
                        model: "ixs_esu=>ixs_esu;bu_ci=bu_ci;sk_ci=sk_ci",
                        customClass: "js-nevalidovat", // vynechá validace proti DTO
                        serverFilters: {
                            //ixs_esu: new Gordic.Forms.Dependency("ixs_esu", "ixs_esu", false, true),                     // závislost zakomentována, řešeno v change políčka ixs_esu
                            aktivita: 100,
                        }
                    })
                        .addRow("VS, KS, SS")
                        .addField("gstringbox", "w-4", {
                        name: "vs", //VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        disabled: !that.permsDto.vs,
                        allowedChars: "0123456789*",
                        maxLength: 12 /* Interface.LK.Isl.GPredpisDtoTypeLengths.vs */,
                        //validators: [new Gordic.Validators.Length({ max: 12 })]
                    })
                        .addField("gstringbox", "w-4", /*Gordic.Prefabs.Select.ekoskos(),*/ {
                        name: "ks", //KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        disabled: !that.permsDto.ks,
                        allowedChars: "0123456789",
                        maxLength: 12 /* Interface.LK.Isl.GPredpisDtoTypeLengths.ks */,
                        //dropdown: true,
                        //strict: false,
                        //model: "model.ks=value.ks",
                    })
                        .addField("gstringbox", "w-4", /*Gordic.Prefabs.Select.ekoscss(),*/ {
                        name: "ss", //SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        disabled: !that.permsDto.ss,
                        allowedChars: "0123456789*",
                        maxLength: 12 /* Interface.LK.Isl.GPredpisDtoTypeLengths.ss */,
                        //dropdown: true,
                        //strict: false,
                        //model: "model.ss=value.ss",
                    })
                        ///////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////
                        .addSection("Částky") // TODO: přejmenovat ?
                        .addRow({
                        label: "Výše vratky",
                        hint: "Pro zadání aktuální salda(přeplatku) stiskněte klávesu <b>*</b> <br/> Pro zadání celkového salda(přeplatku) stiskněte klávesy <b>CTRL + * </b>"
                    })
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c_mena", //Výše předpisu
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        tooltip: "Pro zadání aktuální salda(přeplatku) stiskněte klávesu <b>*</b> <br/> Pro zadání celkového salda(přeplatku) stiskněte klávesy <b>CTRL + * </b>",
                        disabled: !that.permsDto.c_mena, //
                        change: function (ev, input) {
                            if (!that.nastaveniPrepoctu) {
                                if (input.value != null) {
                                    that.prepocetCastek("c_mena");
                                }
                            }
                        },
                    })
                        .addRow("Měna vratky, Měna pož., Kurz")
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena", //Měna
                        model: "model.mena=value.mena",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        disabled: !that.permsDto.mena, //false,
                        //initialValue: { mena: 0, mena_sis_aaa: 'CZK', mena_zkr: 'CZK', },
                        change: function (ev, input) {
                            if (!that.nastaveniPrepoctu) {
                                that.prepocetCastek("mena");
                                that.element.findForms().findFields("mena_poz").gfield("setValue", input.value);
                                that.nastavPovinnostBuCi(false);
                            }
                        },
                    })
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena_poz", //Měna
                        model: "model.mena_poz=value.mena",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        disabled: !that.permsDto.mena_poz, //false,
                        //initialValue: { mena: 0, mena_sis_aaa: 'CZK', mena_zkr: 'CZK', },
                        change: function (ev, input) {
                            //if (!that.nastaveniPrepoctu) { }
                        },
                    })
                        .addField("gnumberbox", "w-4", {
                        name: "kurz", //Kurz
                        //initialValue: 1,
                        decimals: 4,
                        fixed: true,
                        thousandsSeparator: '',
                        returnType: "decimal",
                        disabled: !that.permsDto.kurz, //true,
                        change: function (ev, input) {
                            if (!that.nastaveniPrepoctu) { }
                        }
                    })
                        .addRow({
                        label: that.globalSettings?.get("Global.Ddp.ObecneSettings.PopisCastka") ?? "Částka v CZK",
                        hint: "Pro zadání aktuální salda(přeplatku) stiskněte klávesu <b>*</b> <br/> Pro zadání celkového salda(přeplatku) stiskněte klávesy <b>CTRL + * </b>"
                    })
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c", //Částka v CZK
                        //initialValue: 0,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        disabled: !that.permsDto.c,
                        tooltip: "Pro zadání aktuální salda(přeplatku) stiskněte klávesu <b>*</b> <br/> Pro zadání celkového salda(přeplatku) stiskněte klávesy <b>CTRL + * </b>",
                        change: function (ev, input) {
                            if (!that.nastaveniPrepoctu) {
                                if (input.value != null) {
                                    that.prepocetCastek("c");
                                }
                            }
                        }
                    })
                        ///////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////
                        .addSection("Předpis")
                        .addRow("Smlouva")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoVyberSmlouvy({
                        inputDto: { rokSml: that.gpc.rok, canNewAndRefund: true },
                        parentContent: that,
                        esuLogovani: {
                            Ixp: that.DtoPripad.ixp ?? "",
                            AktZnacka: that.DtoPripad.ac_ag ?? "",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                            DuvodHledaniTxt: "Výběr položky Smlouvy k vratce připadu DDP"
                        }, init: function (inputDto, filter) {
                            let esu = that.findFields("ixs_esu").gfield("getValue");
                            let smlouva = that.findFields("ixp_sml").gfield("getValue");
                            if (esu !== null)
                                filter.ixs_esu = esu.ixs_esu;
                            if (smlouva !== null)
                                filter.ixp_sml_pri = smlouva.ixp_sml_pri;
                            filter.smluvni_pripady.push(Gordic.Eko.GVyberSmlouvyPripadyEnum.SeSchvalenouPolozkou);
                        }
                    }), {
                        name: "ixp_sml",
                        disabled: !that.permsDto.ixp_sml, //
                        model: "model.ixp_sml=value.ixp_sml_pri",
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo_pre", //Typ předpisu
                        model: "model.ktg_upo_pre=value.ktg_upo;model.ktg_upo_pre_txt=value.ktg_upo_txt", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        initialValue: { ktg_upo: 100 },
                        serverFilters: {
                            ktg_upo: that.naplneniPole(100, 199),
                        },
                        dropdown: true,
                        disabled: !that.permsDto.ktg_upo_pre, //
                    }) // BUCDPEP.ktg_upo 
                        .addRow()
                        .addField("gcheck", "w-12", {
                        name: "predpisTaky",
                        label: "Založit s vratkou i předpis",
                        disabled: !that.permsDto.predpisTaky, //
                        initialValue: false,
                        emptyValue: false, // ?????
                        change: (ev, data) => { that.nastavKtgUpoPre(data.value); }
                    });
                    el.gform("createFrom", mainForm);
                    //this.formBasicInfo = $.newDiv() //$("<div>")  
                    //    .appendTo(tab)
                    //    .gform("createFrom", mainForm);
                    //var defaultForm = $("<div>").appendTo(tab).gform("createFrom", mainForm);
                    //var defaultForm = $("<div>").appendTo(this.element).gform("createFrom", mainForm);
                    //return mainForm;
                }
                //########################################################################################
                /**		DtoVratka	Uncaught ReferenceError: DtoVratka is not defined
        
                 * Metoda pro načtení dat do formuláře
                 * @method nactiData()
                 * @returns {void} Pokud načte data, tak naplní formuláře daty a vypne načítání
                 */
                nactiData() {
                    const that = this;
                    var def = $.Deferred();
                    const form = that.element.findForms();
                    that.element.gform("waitForValues")
                        .done(() => {
                        //Ukončení načítání byť ještě čekám na další data...
                        form.findFields("ixs_typ").gfield("model", "apply", { ixs_typ: that.DtoVratka.wflProfil?.ixs_typ }, { initialValues: true });
                        form.findFields("ixs_fun_akt").gfield("model", "apply", { ixs_fun_akt: that.DtoPripad.ixs_fun_akt }, { initialValues: true });
                        form.findFields().gfield("model", "apply", that.DtoVratka, { initialValues: true });
                        if (!that.Edit) {
                            if (!that.VratkaZPlatby) {
                                that.nactiSubjekt(); // pokud jde o novou vratku která není z platby (možná doplníme) provede se načtení b.účtu z poplatníka...
                                //    form.findFields().gfield("model", "apply", that.RecVratka, { initialValues: true });
                            }
                            that.nastaveniPrepoctu = true;
                            form.findFields("c").gfield("setValue", this.RecVratka.c, { initialValues: true });
                            that.nastaveniPrepoctu = true;
                            form.findFields("c_mena").gfield("setValue", this.RecVratka.c, { initialValues: true });
                            that.nastaveniPrepoctu = false;
                            // U nové vratky lokální parametr
                            if (that.userSettings != null) {
                                //Set l_ktg_upo = gf_NactiLokalniParametrN('vratka_ktg_upo', 200)
                                let vratka = that.userSettings.get("GVratkaKtgUpo");
                                //TODO: form.findFields("ktg_upo").gfield("model", "apply", { ktg_upo: vratka }, { initialValues: true }); //TOOD: nenačítá se...
                            }
                        }
                        else {
                            that.findFields("bu_ci").gfield("option", "serverFilters", { ixs_esu: that.DtoVratka.ixs_esu });
                        }
                        //that.element.gform("waitForValues")
                        //    .done(() => {
                        //        form.findFields("ss").gfield("model", "apply", { ss: this.RecVratka.c }, { initialValues: true });
                        //        form.findFields("bu_vl").gfield("model", "apply", { bu_vl: that.DtoVratka.bu_vl, sk_vl: that.DtoVratka.sk_vl }, { initialValues: true });
                        //        form.findFields("bu_ci").gfield("model", "apply", { bu_ci: that.DtoVratka.bu_ci, sk_ci: that.DtoVratka.sk_ci }, { initialValues: true });
                        //    });
                        var l_kurz = that.setKurzMeny(that.DtoVratka.mena);
                        //that.nastavPovinnostBuCi(true);
                        that.nastavKtgUpoPre(that.DtoVratka.ktg_upo_pre != null);
                        // Sledování změn ve formulářích (dokument) pro povolení uložení, pokud se jedná o needitovatelný případ
                        //that.findForms("formHeader").gform("waitForValues").done(function () {
                        //    var editace = that.jeDokladEditovatelny() && !that.rezimCteni;
                        //    if (!editace) {
                        //        that.element.on("fieldchange", function (ev, ctx) {
                        //            const formChanged = that.findForms().gform("hasChanged");
                        //            that.actions.actSave!.updatePermission((formChanged || editace ? { value: true } : (that.model.Permissions ? that.model.Permissions.LzeEvidovat : undefined)));
                        //        });
                        //    }
                        //});
                        return def.resolve();
                    });
                    // FOCUS na první editovatelné políčko v tabu Základní údaje
                    that.element.findForms("zakladniInfoForm").find(".gfield:not(.ui-state-disabled)").first().gfield("focus");
                    return def.promise();
                }
                testNastaveniPolicek() {
                    const that = this;
                    const form = that.element.findForms();
                    that.element.findForms().findFields("poznamka").gfield("setValue", "Test uložení vratky ve WK");
                    that.element.findForms().findFields("popis").gfield("setValue", "Text popisu");
                    that.element.findForms().findFields("c_mena").gfield("setValue", new Decimal(10));
                    that.element.findForms().findFields("mena").gfield("setValue", { mena: 270 });
                    that.element.findForms().findFields("zp").gfield("setValue", { zp: 20 });
                    form.findFields("bu_ci").gfield("model", "apply", { bu_ci: "PL12105012561000002264055761", sk_ci: "INGB" });
                }
                //########################################################################################
                /**
                 * Načtení externího subjektu z případu do políček bankovních účtů
                 * @method nactiSubjekt()
                 */
                nactiSubjekt() {
                    const that = this;
                    const ixsEsu = that.DtoVratka.ixs_esu;
                    const form = that.element.findForms();
                    // Ošetření cizího bankovní účtu
                    const buciField = that.findFields("bu_ci"); // políčko cizého bankovního účtu
                    buciField.gfield("option", "serverFilters", { ixs_esu: ixsEsu });
                    buciField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.Ekosuci().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                    }).then((buci) => {
                        if (buci.length > 0) // pokud existuje jedna vrácená hodnota
                            buciField.gfield("model", "apply", buci[0], { initialValues: true }); // doplním jí do políčka                
                        else // existuje více nebo žádná hodnota
                            buciField.gfield("clear"); // tak účet vymažu
                    });
                    //form.findFields("bu_vl").gfield("model", "apply", { bu_vl: that.DtoVratka.bu_vl, sk_vl: that.DtoVratka.sk_vl }, { initialValues: true });
                    that.nastavPovinnostBuCi(true);
                    that.nastavPovinnostSml(that.DtoVratka.bu_vl, that.DtoVratka.sk_vl);
                }
                //########################################################################################
                /**
                 * Nastavení přístupnosti (editace) políček a tlačítek dokumentu
                 */
                nacteniPristupu() {
                    const that = this;
                    let edit = that.Edit; // Logická proměnná určující zda je detail otevřený v režimu editace/čtení (nebo jako nový dokument)          
                    //#region AKCE REALIZOVAT VRATKU
                    that.permsDto.actRealizovat =
                        (that.Params.ddp_vra_zjedno === 1 || (that.Params.ddp_rad_vrarea !== 0 &&
                            (that.Params.ddp_rad_vrarea !== 2 || that.DtoVratka.ixs_fun_akt === that.IxsFun))) &&
                            that.DtoVratka.stav_por === 20;
                    //#endregion
                    //#region AKCE VRATIT VRATKU
                    that.permsDto.actVratit =
                        that.Params.ddp_rad_vrarea !== 0 &&
                            (that.Params.ddp_rad_vrarea !== 2 || that.DtoVratka.ixs_fun_akt === that.IxsFun) &&
                            that.DtoVratka.stav_por === 20;
                    //#endregion
                    //#region AKCE SCHVÁLIT VRATKU
                    that.permsDto.actSchvalit =
                        (that.Params.ddp_vra_zjedno === 1 || (that.Params.ddp_rad_vrarea !== 0 &&
                            (that.Params.ddp_rad_vrarea !== 2 || that.DtoVratka.ixs_fun_akt === that.IxsFun))) &&
                            (that.DtoVratka.stav_por === 0 || that.DtoVratka.stav_por === 10) &&
                            that.DtoVratka.zp !== 0;
                    //#endregion
                    //#region AKCE STORNO VRATKY
                    that.permsDto.actStorno =
                        (that.DtoVratka.stav_por === 0 || that.DtoVratka.stav_por === 10 ||
                            (that.DtoVratka.stav_por === 30 &&
                                [23, 0, 5, 20].includes(that.DtoVratka.s_uhrp))) ? true : false;
                    //#endregion
                    //#region AKCE NOVA VRATKA
                    if (that.Params.ddp_rad_vratka !== 1) {
                        if (that.DtoVratka.ixs_fun_akt === that.IxsFun) {
                            that.permsDto.actPodani = false;
                        }
                        else {
                            that.permsDto.actPodani = true;
                        }
                    }
                    else {
                        that.permsDto.actPodani = true;
                    }
                    //#endregion
                    //#region AKCE OBNOVIT VRATKU
                    that.permsDto.actObnovit = that.DtoVratka.stav_por === 40;
                    //#endregion
                    that.permsDto.bu_vl = that.Params.ddp_rad_chbvlv !== 1 ? false : true;
                    that.permsDto.ixp_sml = that.Params.ddp_sml_vazba === 1 ? true : false;
                    //pokud se jedná o vrácení platební brány, nebude editovatelný způsob úhrady a částka
                    if (!edit) {
                        if (that.RecVratka?.zp == 73 && that.RecVratka.ixp_pok?.length == 12) {
                            that.permsDto.zp = false;
                            that.permsDto.c = false;
                            that.permsDto.c_mena = false;
                            that.permsDto.bu_ci = false;
                        }
                        else {
                            that.permsDto.zp = true;
                            that.permsDto.c = true;
                            that.permsDto.c_mena = true;
                            that.permsDto.bu_ci = true;
                        }
                    }
                    //#region KontrolyFU - při initu...
                    //let l_stav_vyriz = -1;
                    //if (this.jsouAktivniKontrolyFU()) {
                    //    that.call("StavFinancniKontrolyFU", { ip_ixp: that.DtoVratka.ixp_vra! })     // volání servrové logiky pro načtení příznaku
                    //        .then(function (data) {
                    //            l_stav_vyriz = data.stavFU;
                    //            let jevytistenydoklad = data.vytistenDokladFK;
                    //            if (l_stav_vyriz == -1 || (l_stav_vyriz == 0 && !jevytistenydoklad || l_stav_vyriz == 20) && (that.DtoVratka.stav_por == 0 || that.DtoVratka.stav_por == 10)) {
                    //                // GM_EDIT
                    //            } else {
                    //                // GM_NoEDIT
                    //            }
                    //        })
                    //}
                    //#endregion
                    //if (that.LzeUpravovat) {
                    //    that.permsDto.lzeEditovat = // Upravovat lze pouze vratky ve stavu vráceno nebo pořízeno!
                    //        (that.Params.ddp_rad_vratka === 1 || that.DtoVratka.ixs_fun_akt !== that.IxsFun) &&
                    //        ((that.DtoVratka.stav_por === 0 || that.DtoVratka.stav_por === 10) ||
                    //            (that.DtoVratka.stav_por === 30 && [0, 5, 20, 23].includes(that.DtoVratka.s_uhrp!)));
                    //} else {
                    //    that.permsDto.lzeEditovat = false;
                    //}
                    that.permsDto.lzeEditovat = that.LzeUpravovat &&
                        (that.Params.ddp_rad_vratka === 1 || (that.Params.ddp_rad_vratka === 2 && that.DtoVratka.ixs_fun_akt == that.IxsFun)) &&
                        ((that.DtoVratka.stav_por === 0 || that.DtoVratka.stav_por === 10) ||
                            (that.DtoVratka.stav_por === 30 && [0, 5, 20, 23].includes(that.DtoVratka.s_uhrp)));
                    //that.GmEdit(that.permsDto, shouldEnable);
                    that.nastaveniPritupu();
                }
                //########################################################################################
                /**
                 * Nastavení přístupnosti (editace) políček a tlačítek dokumentu
                 */
                nastaveniPritupu() {
                    const that = this;
                    const formHead = that.element.findForms();
                    const formZakl = that.element.findForms();
                    const act = that.actions;
                    //var def = $.Deferred();
                    //#region defaultně nastavený detail pro vratku(Hlavička a kurz disable, zbytek enable)
                    formHead.findFields("ixp").gfield("option", "disabled", (!that.permsDto.ixp || !that.permsDto.lzeEditovat));
                    formHead.findFields("ixs_typ").gfield("option", "disabled", (!that.permsDto.ixs_typ || !that.permsDto.lzeEditovat));
                    formHead.findFields("ixp_vra").gfield("option", "disabled", (!that.permsDto.ixp_vra || !that.permsDto.lzeEditovat));
                    formHead.findFields("ac").gfield("option", "disabled", (!that.permsDto.ac || !that.permsDto.lzeEditovat));
                    formHead.findFields("por_cislo_phl").gfield("option", "disabled", (!that.permsDto.por_cislo_phl || !that.permsDto.lzeEditovat));
                    formHead.findFields("ixs_fun_akt").gfield("option", "disabled", (!that.permsDto.ixs_fun_akt || !that.permsDto.lzeEditovat));
                    formHead.findFields("ixs_esu").gfield("option", "disabled", (!that.permsDto.ixs_esu || !that.permsDto.lzeEditovat));
                    formZakl.findFields("c_mena").gfield("option", "disabled", (!that.permsDto.c_mena || !that.permsDto.lzeEditovat));
                    formZakl.findFields("mena").gfield("option", "disabled", (!that.permsDto.mena || !that.permsDto.lzeEditovat));
                    formZakl.findFields("mena_poz").gfield("option", "disabled", (!that.permsDto.mena_poz || !that.permsDto.lzeEditovat));
                    formZakl.findFields("kurz").gfield("option", "disabled", (!that.permsDto.kurz || !that.permsDto.lzeEditovat));
                    formZakl.findFields("c").gfield("option", "disabled", (!that.permsDto.c || !that.permsDto.lzeEditovat));
                    formZakl.findFields("ktg_upo").gfield("option", "disabled", (!that.permsDto.ktg_upo || !that.permsDto.lzeEditovat));
                    formZakl.findFields("poznamka").gfield("option", "disabled", (!that.permsDto.poznamka || !that.permsDto.lzeEditovat));
                    formZakl.findFields("popis").gfield("option", "disabled", (!that.permsDto.popis || !that.permsDto.lzeEditovat));
                    formZakl.findFields("dat_vzniku").gfield("option", "disabled", (!that.permsDto.dat_vzniku || !that.permsDto.lzeEditovat));
                    formZakl.findFields("dat_spl").gfield("option", "disabled", (!that.permsDto.dat_spl || !that.permsDto.lzeEditovat));
                    formZakl.findFields("zp").gfield("option", "disabled", (!that.permsDto.zp || !that.permsDto.lzeEditovat));
                    formZakl.findFields("bu_ci").gfield("option", "disabled", (!that.permsDto.bu_ci || !that.permsDto.lzeEditovat));
                    formZakl.findFields("ks").gfield("option", "disabled", (!that.permsDto.ks || !that.permsDto.lzeEditovat));
                    formZakl.findFields("vs").gfield("option", "disabled", (!that.permsDto.vs || !that.permsDto.lzeEditovat));
                    formZakl.findFields("ss").gfield("option", "disabled", (!that.permsDto.ss || !that.permsDto.lzeEditovat));
                    formZakl.findFields("ixp_sml").gfield("option", "disabled", (!that.permsDto.ixp_sml || !that.permsDto.lzeEditovat));
                    formZakl.findFields("bu_vl").gfield("option", "disabled", (!that.permsDto.bu_vl || !that.permsDto.lzeEditovat));
                    formZakl.findFields("ktg_upo_pre").gfield("option", "disabled", (!that.permsDto.ktg_upo_pre || !that.permsDto.lzeEditovat));
                    formZakl.findFields("predpisTaky").gfield("option", "disabled", (!that.permsDto.predpisTaky || !that.permsDto.lzeEditovat));
                    act.actGPripadVratkaSave?.enabled(that.permsDto.save && that.permsDto.lzeEditovat);
                    act.actGPripadVratkaSaveClose?.enabled(that.permsDto.save && that.permsDto.lzeEditovat);
                    act.actGPripadVratkaPodani?.enabled(that.permsDto.actPodani);
                    act.actGPripadDetail?.enabled(that.permsDto.actPripad);
                    act.actGPripadVratkaObnovit?.enabled(that.permsDto.actObnovit);
                    act.actGPripadVratkaStorno?.enabled(that.permsDto.actStorno);
                    act.actGPripadVratkaVratit?.enabled(that.permsDto.actVratit);
                    act.actGPripadVratkaSchvalit?.enabled(that.permsDto.actSchvalit);
                    act.actGPripadVratkaRealizovat?.enabled(that.permsDto.actRealizovat);
                    act.actGPripadVratkaTisk?.enabled(that.permsDto.actTisk);
                    //that.permsDto.actNavazSML;
                    //that.permsDto.actOdvazSML;
                    //that.permsDto.actFuKontrola;
                    //that.permsDto.actUprDatVzniku;
                    //#endregion
                    //return def.promise();
                }
                //########################################################################################
                /**
                 * Metoda pro načtení Sazeb DPH a kurzů měn
                 * @method loadData()
                 * @returns {void} Načte data a nastaví je do připravených DTO objektů
                 */
                loadSazbaAndKurz() {
                    const that = this;
                    // Naplnění DTO objektu pro sazby DPH
                    var DPH = that.isl.Predpisy.vratDPH()
                        .get();
                    DPH.done((data) => {
                        that.sazbyDPH = data.data;
                        //that.loadedData();
                    });
                    // Naplnění DTO objektu pro kurzy měn
                    var Kurzy = that.isl.Predpisy.vratKurzMeny()
                        .get();
                    Kurzy.done((data) => {
                        that.kurzyMenyDto = data.data;
                        //that.loadedData();
                    });
                }
                //########################################################################################
                /**
                 * Metoda kontrolující zda jsou aktivní kontrolu FU
                 * @returns TRUE pokud jsou kontroly aktivní
                 */
                jsouAktivniKontrolyFU() {
                    const that = this;
                    return (that.Params.eko_rad_dfken >= 1 || that.Params.eko_rad_duken >= 1);
                }
                ////########################################################################################
                ///**
                // * Funkce pro nastavení všech vlastností na true nebo false
                // * @method GmEdit()
                // */
                //private GmEdit(dto: GPripadPredpisPermsDto, value: boolean): void {
                //    Object.keys(dto).forEach(key => {
                //        (dto as any)[key] = value;
                //    });
                //    return dto;
                //}
                //########################################################################################
                /**
                 * Metoda nastavující klávesové zkratky
                 * @method nastaveniKlavZkratek()
                 */
                nastaveniKlavZkratek() {
                    const that = this;
                    const form = that.element.findForms();
                    form.findFields("c").gshortcut({
                        key: "*",
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["actGPripadVratkaNastaveniSaldaAktualni"],
                    });
                    form.findFields("c_mena").gshortcut({
                        key: "CTRL+*",
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["actGPripadVratkaNastaveniSaldaCelkem"],
                    });
                    // Funkce pro nastavení zkratek do GDATEBOX políček
                    Ddp.WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                //########################################################################################
                /**
                 * Metoda nastavující statusBar
                 * @method setStatus()
                 */
                setStatus() {
                    const that = this;
                    switch (that.DtoVratka.stav_por) {
                        case 0: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavPorizeni"], "Pořízeno", "");
                            break;
                        }
                        case 10: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavPorizeni"], "Vráceno", "g-state-text g-state-important");
                            break;
                        }
                        case 20: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavPorizeni"], "Schváleno", "g-state-text g-state-success");
                            break;
                        }
                        case 30: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavPorizeni"], "Realizováno", "g-state-text g-state-info");
                            break;
                        }
                        case 40: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavPorizeni"], "Zrušeno", "g-state-text g-state-error");
                            break;
                        }
                        default:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavPorizeni"], "Neurčeno", "g-state-text g-state-error");
                            break;
                    }
                    switch (that.DtoVratka.s_uhrp) {
                        case 0: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Storno", "g-state-text g-state-error");
                            break;
                        }
                        case 10: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Dáno k úhradě", "");
                            break;
                        }
                        case 25: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Odeslán příkaz", "");
                            break;
                        }
                        case 60: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Zaplaceno", "");
                            break;
                        }
                        case 23: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Vráceno z banky", "");
                            break;
                        }
                        case 5: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Storno vratkou", "");
                            break;
                        }
                        case 22: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Pozastaveno trvale", "");
                            break;
                        }
                        case 20: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Pozastaveno", "");
                            break;
                        }
                        case 27: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Párováno částečně", "");
                            break;
                        }
                        case 40: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Párováno", "");
                            break;
                        }
                        default: {
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarStavUhr"], "Neznámý stav", "g-state-text g-state-error");
                            break;
                        }
                    }
                }
                //########################################################################################
                /**
                 * Přepočet částek při změně měny, kurzu nebo částky
                 * @method prepocetCastek()
                 * @param {string} zmenenePole - Název změněného pole
                 */
                prepocetCastek(zmenenePole) {
                    const that = this;
                    const form = that.element.findForms("zakladniInfoForm");
                    var col_c_mena = form.findFields("c_mena").gfield("getValue");
                    var col_mena = form.findFields("mena").gfield("getValue");
                    if (col_mena != null)
                        that.mena = col_mena; //z nějakého důvodu se "c" mění třikrát po sobě a nedokážer to najít pole "mena", pouze při prvním tak si uložím a vložím ručně
                    if (col_mena == null && zmenenePole != "mena") {
                        col_mena = that.mena;
                    }
                    var col_kurz = form.findFields("kurz").gfield("getValue");
                    var col_c = form.findFields("c").gfield("getValue");
                    var num;
                    var l_kurz = that.setKurzMeny(col_mena.mena);
                    if (zmenenePole == "mena" || zmenenePole == "c_mena") {
                        num = col_c_mena;
                    }
                    else {
                        num = col_c;
                    }
                    that.nastaveniPrepoctu = true;
                    if (col_mena.mena == 0) {
                        //pokud nemám kurz (jinou měnu) jen se pojistím aby castky byly záporné
                        let zap = new Decimal(-1);
                        if (num.greaterThan(0)) {
                            num = num.mul(zap);
                        }
                        form.findFields("c_mena").gfield("setValue", num);
                        form.findFields("c").gfield("setValue", num);
                    }
                    else {
                        let zap = new Decimal(-1);
                        if (num.greaterThan(0)) {
                            num = num.mul(zap);
                        }
                        if (zmenenePole == "mena" || zmenenePole == "c_mena") {
                            form.findFields("c_mena").gfield("setValue", num);
                            form.findFields("c").gfield("setValue", num.mul(l_kurz));
                        }
                        else {
                            form.findFields("c_mena").gfield("setValue", num.div(l_kurz));
                            form.findFields("c").gfield("setValue", num);
                        }
                    }
                    that.nastaveniPrepoctu = false;
                    return;
                }
                //########################################################################################
                /**
                 * Funkce pro vrácení daného kurzu měny, dle o_mena
                 * @method getKurzMeny()
                 * @param {number} o_mena - Druh měny
                 * @param {string} o_kurz - Typ kurzu | N - nákup | S - střed | P - prodej |
                 */
                getKurzMeny(o_mena, o_kurz) {
                    const that = this;
                    var ret = new Decimal(1);
                    if (that.kurzyMenyDto != undefined) {
                        that.kurzyMenyDto.forEach(function (x) {
                            if (x.mena == o_mena) {
                                switch (o_kurz) {
                                    case "N": {
                                        ret = new Decimal(x.kurz_n ?? 0);
                                        break;
                                    }
                                    case "P": {
                                        ret = new Decimal(x.kurz_p ?? 0);
                                        break;
                                    }
                                    default: {
                                        ret = new Decimal(x.kurz_s ?? 0);
                                        break;
                                    }
                                }
                            }
                        });
                    }
                    return ret;
                }
                //########################################################################################
                /**
                 * Funkce pro nastavení daného kurzu měny
                 * @method setKurzMeny()
                 * @param {number} mena - Druh měny
                 */
                setKurzMeny(mena) {
                    const that = this;
                    const form = that.element.findForms("zakladniInfoForm");
                    var kurz = that.getKurzMeny(mena, "S");
                    /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                    form.findFields("kurz").gfield("setValue", kurz, { initialValues: true });
                    /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                    return kurz;
                }
                //########################################################################################
                /**
                 * Metoda nastavující políčko BÚ podle zvoleného způsobu platby
                 * @method nastavPovinnostBuCi()
                 * @param {boolean} priNacteni - Při načtení formuláře
                 */
                nastavPovinnostBuCi(priNacteni) {
                    const that = this;
                    const form = that.element.findForms();
                    const buciField = form.findFields("bu_ci");
                    var l_zp = !priNacteni
                        ? form.findFields("zp").gfield("getValue").zp
                        : that.DtoVratka.zp;
                    var l_mena = !priNacteni
                        ? form.findFields("mena").gfield("getValue").mena
                        : that.DtoVratka.mena;
                    if (that.zpHotove.includes(l_zp) && l_mena == 0) {
                        that.permsDto.bu_ci = false;
                        buciField.gfield("option", "disabled", !that.permsDto.bu_ci);
                        buciField.gfield("option", "flag", null);
                    }
                    else {
                        that.permsDto.bu_ci = true;
                        buciField.gfield("option", "disabled", !that.permsDto.bu_ci);
                        buciField.gfield("option", "flag", "required");
                    }
                }
                //########################################################################################
                /**
                 * Metoda nastavující políčko BÚ podle zvoleného způsobu platby
                 * @method nastavPovinnostSml()
                 * @param {string} bu_vl - Bu_vl
                 * @param {string} sk_vl - Sk_vl
                 * @param {number} priz_sr - Příznak SR
                 */
                nastavPovinnostSml(bu_vl, sk_vl, priz_sr) {
                    const that = this;
                    const smlField = that.element.findForms().findFields("ixp_sml");
                    if (priz_sr == null) {
                        if (bu_vl != null || sk_vl != null) {
                            that.call("BuVlMaPriznakSR", { ipBuVl: bu_vl, ipSkVl: sk_vl, ipRok: that.DtoTypPhl.Nastaveni?.rok }) // volání servrové logiky pro načtení příznaku
                                .then(function (data) {
                                if (data != null) {
                                    priz_sr = ((data.priznak_sr == 1 && that.PrizIissp == 1) ? 1 : 0);
                                    if (priz_sr) {
                                        that.permsDto.ixp_sml = true;
                                        smlField.gfield("option", "disabled", !that.permsDto.ixp_sml);
                                        smlField.gfield("option", "flag", "required");
                                        /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                                        //smlField.gfield("setValidators", new Gordic.Validators.Required());
                                    }
                                    else {
                                        that.permsDto.ixp_sml = false;
                                        smlField.gfield("option", "disabled", !that.permsDto.ixp_sml);
                                        smlField.gfield("option", "flag", null);
                                        /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                                        //smlField.gfield("resetValidations");
                                    }
                                }
                            });
                        }
                    }
                    else {
                        if (priz_sr) {
                            that.permsDto.ixp_sml = true;
                            smlField.gfield("option", "disabled", !that.permsDto.ixp_sml);
                            smlField.gfield("option", "flag", "required");
                            /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                            //smlField.gfield("setValidators", new Gordic.Validators.Required());
                        }
                        else {
                            that.permsDto.ixp_sml = false;
                            smlField.gfield("option", "disabled", !that.permsDto.ixp_sml);
                            smlField.gfield("option", "flag", null);
                            /*?SMAZAT PO TESTU*/ that.zmeny = that.findForms().gform("hasChanged"); /**/
                            //smlField.gfield("resetValidations");
                        }
                    }
                }
                nastavKtgUpoPre(inputValue) {
                    const that = this;
                    const ktgUpoField = that.element.findForms().findFields("ktg_upo_pre");
                    if (!inputValue) {
                        that.permsDto.ktg_upo_pre = false;
                        ktgUpoField.gfield("option", "disabled", !that.permsDto.ktg_upo_pre);
                        ktgUpoField.gfield("option", "flag", null);
                        ktgUpoField.gfield("setValue", null);
                    }
                    else {
                        that.permsDto.ktg_upo_pre = true;
                        ktgUpoField.gfield("option", "disabled", !that.permsDto.ktg_upo_pre);
                        ktgUpoField.gfield("option", "flag", "required");
                    }
                }
                //########################################################################################
                /**
                 * Funkce pro naplnění pole dle zadaného intervalu
                 * @method naplneniPole()
                 * @param {number} start Počáteční hodnota
                 * @param {number} end Koncová hodnota
                 * @returns {Array<number>} Pole s hodnotami
                 */
                naplneniPole(start, end) {
                    let a = [];
                    for (let i = 0; start < end; i++) {
                        a[i] = start;
                        start++;
                        //a.push([i]);
                    }
                    return a;
                }
                //########################################################################################
                /**
                 * Změna externího subjektu
                 * @method poZmeneSubjektu()
                 * @param {any} ctx Data z políčka po změně
                 */
                poZmeneSubjektu(ctx) {
                    const that = this;
                    const buciField = that.findFields("bu_ci"); // políčko cizého bankovního účtu
                    if (buciField.gfield("option", "disabled") == false) { // pokud je políčko editovatelné
                        if (ctx.value !== null) // nějaký subjekt je vybrán
                            buciField.gfield("option", "serverFilters", { ixs_esu: ctx.value.ixs_esu }); // náhrada za dependency                                              
                        else // subjekt je prázdný
                            buciField.gfield("option", "serverFilters", { ixs_esu: null }); // náhrada za dependency                                        
                    }
                    buciField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.Ekosuci().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                    }).then((buci) => {
                        if (buci.length === 1) // pokud existuje jedna vrácená hodnota
                            buciField.gfield("model", "apply", buci[0], { initialValues: true }); // doplním jí do políčka                
                        else // existuje více nebo žádná hodnota
                            buciField.gfield("clear"); // tak účet vymažu
                    });
                }
                //########################################################################################
                /**
                 * Metoda volající zrušení nové vratky při zavření okna
                 * @method zrusitNovouVratku()
                 */
                zrusitNovouVratku() {
                    const that = this;
                    that.beginOperation("Ruším vratku a zavírám okno...");
                    var def = $.Deferred();
                    var rq = { idDdpPripadu: that.DtoVratka.ixp, radekUhrady: that.DtoVratka.radek_uhr };
                    that.isl.PripadVratky.stornoVratkyPripadu(rq).get()
                        .done(function (ret) {
                        that.endOperation();
                        return def.resolve();
                        //that.close(); // po zrušení se zavře okno
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation();
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage)
                                .on("close", (ev, retVal) => {
                                return def.reject();
                            });
                        }
                        else {
                            return def.reject();
                        }
                    });
                    return def.promise();
                }
                //########################################################################################
                /**
                 * Testovací metoda pro test změn na formuláři
                 * @method testZmen()
                 */
                testZmen() {
                    const that = this;
                    var hasChanged = that.element.findForms("zakladniInfoForm").gform("hasChanged");
                    if (!hasChanged) {
                        return that.dialogs.warning("Upozornění", "Na formuláři nedošlo k žádné změně");
                    }
                    else {
                        return that.dialogs.warning("Upozornění", "Na formuláři došlo ke změně");
                    }
                }
                /**
                 * Nastavení příznaku aktivní operace a aktualizace detailu
                 * @method reloadDetailVratky()
                 * @param {boolean} withoutReload (default = false) true = neaktualizovat formulář
                 * @returns {JQueryPromise<void>} - Vrací promise
                 * */
                reloadDetailVratky(withoutReload = false) {
                    const that = this;
                    // vyvolání trigger o aktivní operaci
                    that.trigger(WebClient.DdpDetail.triggerChange, [{ data: that.DtoVratka }]);
                    // aktualizace detailu
                    if (!withoutReload) {
                        this.element.trigger("rememberinitialopen");
                        return this.load();
                    }
                    else
                        return $.Deferred().resolve().promise();
                    //that.call("ReadDataVratky", { data: that.DtoVratka })
                    //    .done(function (data) {
                    //        that.DtoVratka = data;                    
                    //        that.nactiData()
                    //            .done(() => {
                    //                that.setStatus();
                    //                that.endOperation({ id: "znovuNaccteniVratky" });
                    //                return def.resolve();
                    //            })
                    //            .fail(() => {
                    //                return def.reject();
                    //            });
                    //    })
                    //    .fail(function (jqXHR, typ, obj) {
                    //        that.endOperation({ id: "znovuNaccteniVratky" })
                    //        if (typ === "exception") {
                    //            obj.handled = true;
                    //            return that.dialogs.error("Chyba", obj.baseMessage);
                    //        }
                    //        return def.reject();
                    //    })
                }
                //########################################################################################
                //########################################################################################
                //########################################################################################
                /**
                 * Akce po kliknutí na tlačítko OK
                 * @method ok()
                 * @param {number} zavrit - Typ akce po uložení předpisu
                 *   0 - Uložit
                 *   1 - Uložit a zavřít - momentálně zrušeno (TODO: vymyslet jak jeden předpis zavřít a další otevřít)
                 * @returns {JQueryPromise<void>} - Vrací promise
                 */
                ok(zavrit) {
                    const that = this;
                    var def = $.Deferred();
                    that.Evidence(zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); }).always(() => { that.endOperation(); });
                    return def.promise();
                }
                //########################################################################################
                /**
                 * Akce pro Evidenci(uložení) vratky
                 * @method Evidence()
                 * @param {number} zavrit - Typ akce po uložení předpisu
                 *   0 - Uložit
                 *   1 - Uložit a zavřít - momentálně zrušeno (TODO: vymyslet jak jeden předpis zavřít a další otevřít)
                 * @returns {JQueryPromise<void>} - Vrací promise
                 */
                Evidence(zavrit) {
                    const that = this;
                    that.beginOperation("Připravuji data pro uložení...");
                    var def = $.Deferred();
                    var chybnaKontrola = false;
                    const hasChanged = that.findForms().gform("hasChanged");
                    if (!hasChanged) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Upozornění", "Na formuláři nedošlo k žádné změně, není co uložit")
                            .on("close", (ev, retVal) => {
                            return def.reject();
                        });
                    }
                    if (!that.element.findForms().gform("isValid")) {
                        chybnaKontrola = true;
                        that.endOperation();
                        return def.reject();
                    }
                    // sebrání hodnot z formuláře
                    let formData = {};
                    that.findFields().gfield("model", "collect", formData);
                    //let dataVratky: Gordic.Ddp.Interface.LK.Isl.GPredpisDto = that.DtoVratka;
                    //that.element.findForms("zakladniInfoForm").findFields().gfield("model", "collect", dataVratky);
                    //that.element.findForms("formHlavickaDokumentu").findFields().gfield("model", "collect", dataVratky);
                    //let ixsTypField = that.element.findForms().findFields("ixs_typ").gfield("getValue");
                    //dataVratky.ixs_typ = ixsTypField.ixs_typ;
                    //dataVratky.ixp = that.Ixp;
                    //dataVratky.radek_uhr = that.Radek_uhr;
                    //dataVratky.editace = that.Edit; // pomocná položka DTO pro další kontroly na straně serveru když se jedná o nový záznam
                    //TODO: uložení WFL dat (TabGroupa DOKUMENT)...
                    // dokument a vlastnosti
                    let dokument = undefined;
                    let vlastnosti = undefined;
                    //if (!(this.DetailDto?.JePodany)) {
                    // dokument
                    dokument /*: GDokumentDto*/ = $.extend(true, {}, this.saveEkoProfil(), this.saveSslDetailDoruceniEko ? this.saveSslDetailDoruceniEko() : {});
                    dokument.ixs_typ = dokument.ixs_typ ?? that.DtoVratka.wflProfil?.dokument?.ixs_typ;
                    dokument.nazev = dokument.nazev ?? that.DtoVratka.wflProfil?.dokument?.nazev;
                    dokument.st_utaj_id = dokument.st_utaj_id ?? that.DtoVratka.wflProfil?.dokument?.st_utaj_id;
                    dokument.ixs_fun_akt = dokument.ixs_fun_akt ?? that.DtoVratka.wflProfil?.dokument?.ixs_fun_akt;
                    formData.dokument = dokument;
                    // vlastnosti
                    //vlastnosti = Gordic.PopisneVlastnosti.collectValues(this);
                    //dataVratky.vlastnosti = vlastnosti;
                    //}
                    //#region Kontroly dat před uložením (v guptě Function: KontrolaPoli())
                    //Metoda zakomentovaná - nevím jak ošeéfovat všechny části aby se vraceli atd...
                    //that.zkontrolujVratku(dataVratky);
                    //?---------------------------------------------------------------------------------------------------------
                    //kontrola způsoby úhrady, je-li zadán chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    let chybneZP = [0, 40, 60, 70];
                    if (chybneZP.includes(formData.zp)) {
                        //if (dataVratky.zp == 0 || dataVratky.zp == 40 || dataVratky.zp == 60 || dataVratky.zp == 70) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Tento způsob úhrady není možné pro vratku použít!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("zp").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //TODO: Kontrola při uložení před tiskem zda je vyplněný KS v případě je-li ZP=20 nebo ZP=30
                    // ip_okamzik -> 0-Pred tiskem | 1-pred ulozenim
                    //If ip_okamzik = 0 AND(((l_zp = 20) OR(l_zp = 30)) AND SalStrTrimX(l_ks) = '')
                    //	If NOT gf_ZobrazDotaz('Není vyplněn KS, chcete pokračovat?')
                    //		Call SalSetFocus(df_ks)
                    //		Return FALSE
                    //?---------------------------------------------------------------------------------------------------------
                    //kontrola záporných částek, je-li zadána chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    if (formData.c >= new Decimal(0)) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Částka vratky musí být záporná!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("c").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //kontrola vyplnení BÚ příjemce, je-li zadán chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    if (formData.bu_ci?.trim().length == 0 || formData.bu_ci == null) {
                        if (!that.zpHotove.includes(formData.zp) || formData.mena != 0) {
                            chybnaKontrola = true;
                            that.endOperation();
                            that.dialogs.error("Chyba", "Není vybrán bankovní účet příjemce!")
                                .on("close", (ev, retVal) => {
                                that.element.findForms("zakladniInfoForm").findFields("bu_ci").gfield('focus');
                                return def.reject();
                            });
                        }
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //kontrola vyplnení vlastního BÚ, je-li zadán chybně, ukončím načítánní, nastavím focus na políčko a zobrazím chybovou hlášku
                    if (formData.bu_vl?.trim().length == 0 || formData.bu_vl == null) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Není vybrán bankovní účet vlastní!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("bu_vl").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.zp == 73) { //Vrací se peníze z platby přes portál a existuje plaba POK
                        if (that.RecVratka.ixp_pok?.trim().length != 12) {
                            chybnaKontrola = true;
                            that.endOperation();
                            that.dialogs.error("Chyba", "Tento způsob úhrady vratky je možný pouze při vracení platby placené přes platební portál!")
                                .on("close", (ev, retVal) => {
                                that.element.findForms("zakladniInfoForm").findFields("zp").gfield('focus');
                                return def.reject();
                            });
                        }
                        else {
                            formData.ixp_pok = that.RecVratka.ixp_pok;
                        }
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (that.DtoTypPhl.priz_napvra == 0 && formData.dat_vzniku <= that.DtoTypPhl.Nastaveni?.dat_uzav) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Zadáno datum vzniku v uzavřeném období!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("dat_vzniku").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //TODO: Kontrola vyplnění položky SML podle příznaku na BU_VL
                    //If gf_BuVlMaPriznakSR(df_bu_vl.bu_vl(), df_bu_vl.sk_vl(), g_typ_pohledavky.rok)
                    //	If df_polozka_sml.JePrazdny()
                    //		Call gf_ZobrazChybu('Není vyplněna povinná položka!')
                    //		Call SalSetFocus(df_polozka_sml)
                    //		Return 0
                    //?---------------------------------------------------------------------------------------------------------
                    //TODO: Kontrola že na položce SML je stejný vlastní bankovním účet jako na vratce
                    //If NOT df_polozka_sml.JePrazdny()
                    //	Call gf_VratUcetZPolozkySML(l_ixp_sml, l_rok_sml, l_cislo_sml, l_bu_vl_sml, l_sk_vl_sml)
                    //	If l_bu_vl_sml != l_bu_vl OR l_sk_vl_sml != l_sk_vl
                    //		Call gf_ZobrazChybu('Nesouhlasí bankovní účet vlastní a bankovní účet položky SML
                    //
                    //				Položka smlouvy: '|| l_bu_vl_sml||' / '||l_sk_vl_sml ||'
                    //				Vratka: '||df_bu_vl.bu_vl()||' / '||df_bu_vl.sk_vl()||'
                    //
                    //				Vratku nelze uložit!')
                    //		Call SalSetFocus(df_polozka_sml)
                    //		Return 0
                    //?---------------------------------------------------------------------------------------------------------
                    //Kontrola zda VS obsahuje celé číslo
                    const isValidInteger = /^\d+$/;
                    if (!isValidInteger.test(formData.vs.trim())) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Chybně zadaný VS!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("vs").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //Kontrola Externího subjektu (ixs_esu)
                    if (formData.ixs_esu == '0000SE00000M') { //TODO až bude glob. proměnná pro nullIxsEsu tak přepsat
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Není zadán subjekt!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("ixs_esu").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //Kontrola zda při zvolené možnosti že se s vratkou má vytvořit také předpis je vyplněné políčko kategorie úč. pohybu
                    if (formData.predpisTaky == true && formData.ktg_upo_pre == 0) {
                        chybnaKontrola = true;
                        that.endOperation();
                        that.dialogs.error("Chyba", "Vyberte kategorii pohybu pro předpis!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("ktg_upo_pre").gfield('focus');
                            return def.reject();
                        });
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    //#endregion Function: KontrolaPoli
                    if (!chybnaKontrola) {
                        if (formData.bu_ci?.trim().length > 0 && formData.bu_ci != null) {
                            //Todo: pokud se jedna o vratku do ciziny nebo v cizi mene tak jeste budou treba upresnujici udaje
                            that.isl.PripadVratky.statBankovnihoUctu({ ip_IxsEsu: formData.ixs_esu, ip_Bu: formData.bu_ci, ip_Sk: formData.sk_ci })
                                .get()
                                .always(() => { that.endOperation(); })
                                .then(function (ret) {
                                //// .... dialog meni hodnoty, tak si je radsi znovu nastavim do formulare... (NastavPole())...
                                if (formData.mena != 0 || ret != 42) {
                                    that.dialogs.showModalWindow(["Gordic.Eko.WebClient.GZahranicniPlatby", { uid: "GZahranicniPlatby#" }], {
                                        ixp: that.Ixp, // identifikátor dokaldu
                                        ixs_esu: formData.ixs_esu, // externí subjekt
                                        bu_ci: formData.bu_ci, // číslo bankovního účtu - cizí
                                        sk_ci: formData.sk_ci, // kód banky - cizí
                                        bu_vl: formData.bu_vl, // číslo bankovního účtu - vlastní 
                                        sk_vl: formData.sk_vl, // kód banky - vlastní
                                        mena: formData.mena, // měna z dokladu
                                        mena_poz: formData.mena_poz, // požadovaná měna
                                        vs: formData.vs, // variabilní symbol
                                        zp: formData.zp, // způsob úhrady
                                        c_mena: formData.c_mena, // částka dokladu
                                        dat_spl: formData.dat_spl, // datum splatnosti
                                        rok: that.rok, // rok - ekoparams
                                        mod: 1, //
                                        read_only: false, // editovatelné
                                        popis: formData.popis // popis
                                    }, { width: 900, height: 800 })
                                        .createDialogPromise().then((res) => {
                                        if (res != null) {
                                            //formData.c = parseDecimal(formData.c_mena ?? 0).times(formData.kurz ?? 1).times(100).round().div(100);
                                            //formData.CUhradit = parseDecimal(formData.CUhraditMena ?? 0).times(formData.kurz_akt ?? 1).times(100).round().div(100);
                                            formData.hra_pop = res.hra_pop; // TK = 0 | WK = 20
                                            formData.zp_z = res.zp_z;
                                            formData.pla_tit = res.pla_tit; // - tyto data okno nevrací
                                            formData.ucel_uhr = res.ucel_uhr; // - tyto data okno nevrací
                                            formData.dev_pov = res.dev_pov; // - tyto data okno nevrací
                                            formData.sds = res.sds; // - tyto data okno nevrací
                                            formData.popis = res.popis;
                                            formData.upl = res.upl; // - UPL naopak vrací, ale na serveru jsem metodu pro dotažení přesto nechal
                                            that.dotazPredUlozenim(formData, zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                                        }
                                    });
                                }
                                else {
                                    that.dotazPredUlozenim(formData, zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                                }
                            });
                        }
                        else {
                            that.dotazPredUlozenim(formData, zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                        }
                        //?---------------------------------------------------------------------------------------------------------
                    }
                    else {
                        return def.reject();
                    }
                    return def.promise();
                }
                //########################################################################################
                /**
                 * Akce pro samotné uložení Vratky
                 * @method dotazPredUlozenim()
                 * @param {any} formData - DTO vratky
                 * @param {number} zavrit - Typ akce po uložení předpisu
                 * 0 - Uložit | 1 - Uložit a zavřít
                 * @returns {JQueryPromise<void>} - Vrací promise
                 */
                dotazPredUlozenim(formData, zavrit) {
                    const that = this;
                    var def = $.Deferred();
                    that.beginOperation("Probíhá ukládání vratky");
                    if (!formData.predpisTaky) {
                        that.ulozVratku(formData, zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                    }
                    else {
                        that.dialogs.confirm("Upozornění", "Opravdu chcete současně s vratkou založit i předpis?")
                            .on("close", (ev, retVal) => {
                            if (retVal === "yes") {
                                that.ulozVratku(formData, zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                            }
                            if (retVal === "no") {
                                formData.predpisTaky = false;
                                //that.element.findForms("zakladniInfoForm").findFields().gfield("setValue", false);
                                that.ulozVratku(formData, zavrit).done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                            }
                            else {
                                that.endOperation();
                                return def.reject();
                            }
                        });
                    }
                    return def.promise();
                }
                //########################################################################################
                /**
                 * Akce pro samotné uložení Vratky
                 * @method ulozVratku()
                 * @param {any} _data - DTO vratky
                 * @param {number} zavrit - Typ akce po uložení předpisu
                 * 0 - Uložit | 1 - Uložit a zavřít
                 * @returns {JQueryPromise<void>} - Vrací promise
                 */
                ulozVratku(_data, zavrit) {
                    const that = this;
                    var def = $.Deferred();
                    that.isl.PripadVratky.ulozVratkuPripadu({
                        data: {
                            ixp: that.Ixp,
                            radek_uhr: that.Radek_uhr,
                            dat_vzniku: _data.dat_vzniku,
                            dat_spl: _data.dat_spl,
                            c: _data.c,
                            mena: _data.mena,
                            mena_poz: _data.mena_poz,
                            c_mena: _data.c_mena,
                            kurz: _data.kurz,
                            ktg_upo: _data.ktg_upo,
                            ktg_upo_pre: _data.ktg_upo_pre,
                            poznamka: _data.poznamka,
                            popis: _data.popis,
                            zp: _data.zp,
                            bu_vl: _data.bu_vl,
                            bu_ci: _data.bu_ci,
                            sk_vl: _data.sk_vl,
                            sk_ci: _data.sk_ci,
                            ss: _data.ss,
                            vs: _data.vs,
                            ks: _data.ks,
                            ixs_typ: _data.ixs_typ,
                            ixp_sml: _data.ixp_sml,
                            rok_sml: _data.rok_sml,
                            cislo_sml: _data.cislo_sml,
                            predpisTaky: _data.predpisTaky,
                            dat_zmena: that.DtoVratka.dat_zmena,
                            ixp_pok: _data.ixp_pok,
                            editace: that.Edit,
                            dokument: _data.dokument,
                            hra_pop: _data.hra_pop,
                            zp_z: _data.zp_z,
                            pla_tit: _data.pla_tit, // - tyto data okno nevrací
                            ucel_uhr: _data.ucel_uhr, // - tyto data okno nevrací
                            dev_pov: _data.dev_pov, // - tyto data okno nevrací
                            sds: _data.sds, // - tyto data okno nevrací
                            upl: _data.upl
                        }
                    })
                        .get()
                        .done(function (ret) {
                        that.endOperation();
                        that.Edit = true;
                        //ulozi se posledni vybrana kategorie pohybu
                        if (that.userSettings != null) {
                            //Call gf_UlozLokalniParametrN( 'vratka_ktg_upo',l_ktg_upo)
                            that.userSettings.set("GVratkaKtgUpo", _data.ktg_upo);
                        }
                        if (!_data.predpisTaky) {
                            if (zavrit == 1) {
                                that.close(); //TODO: větev promise metody se špatným ukončením
                                return def.resolve();
                            }
                            else {
                                that.reloadDetailVratky().done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                            }
                        }
                        else {
                            that.navigate("Gordic.Ddp.WebClient.GDetailPredpisu", { ID: 'DDPGPredpis#', Titulek: `Detail předpisu č.${ret.data.radekPredpisu}`, Ixp: that.Ixp, Radek_uhr: ret.data.radekPredpisu, Typ_phl: that.Typ_phl, Edit: true, Test: false })
                                .on("close", (ev, retVal) => {
                                if (zavrit == 1) {
                                    that.close(); //TODO: větev promise metody se špatným ukončením
                                    return def.resolve();
                                }
                                else {
                                    that.reloadDetailVratky()
                                        .done(() => {
                                        that.nacteniPristupu();
                                        return def.resolve();
                                    })
                                        .fail(() => {
                                        return def.reject();
                                    });
                                }
                            });
                        }
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation();
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage)
                                .on("close", (ev, retVal) => {
                                return def.reject();
                            });
                        }
                        else {
                            return def.reject();
                        }
                    });
                    return def.promise();
                }
                /**
                 * Test, jestli je možné okno zavřít
                 * @method closing()
                 * @returns {JQueryPromise<Interface.LK.Isl.GPredpisDto> | Interface.LK.Isl.GPredpisDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    const def = $.Deferred();
                    if (!this.Edit) {
                        that.dialogs.confirm("Upozornění", "Nová vratka nebyla uložena! Opravdu chcete okno uzavřít?")
                            .on("close", (ev, retVal) => {
                            if (retVal === "yes") {
                                that.zrusitNovouVratku().done(() => { return def.resolve(); }).fail(() => { return def.reject(); });
                                //return def.resolve();
                            }
                            else {
                                return def.reject();
                            }
                        });
                    }
                    else if (!that.permsDto.lzeEditovat) {
                        return def.resolve();
                    }
                    else {
                        //kontorla jestli jsou data změněna a jestli změny uložit
                        const fields = that.findFields();
                        const hasChanged = that.findForms().gform("hasChanged");
                        fields.findFields().gfield("model", "collect", that.DtoVratka);
                        if (hasChanged) {
                            //((edit || that.changePorizovac)
                            //&& (this.DtoVratka.up_stav === 10 || this.DtoVratka.up_stav === 15 || this.DtoVratka.up_stav === 20)) { // když je něco změněno a ještě asi tyto podmínky
                            //if (Editovano &&
                            //    (DokladPok.Detail.UpStav != GPokDStav.schvaleno ||
                            //        DokladPok.Detail.UpStav != GPokDStav.zauctovano ||
                            //        DokladPok.Detail.UpStav != GPokDStav.uzavreno)
                            Gordic.Eko.Detail.messageBoxUnsavedData(this)
                                .on("no", function () {
                                // bez uložení
                                return def.resolve(null);
                            })
                                .on("cancel", function () {
                                // bez uložení
                                return def.reject();
                            })
                                .createDialogPromise(GDlg.mbbYes.id)
                                .then(function () {
                                that.Evidence(1)
                                    .done(function () {
                                    //fields.findFields().gfield("model", "collect", that.DtoVratka)
                                    return def.resolve(that.DtoVratka);
                                }).fail(function () { return def.reject(); });
                            });
                        }
                        else {
                            return def.resolve(that.DtoVratka);
                        }
                    }
                    return def.promise();
                }
            };
            GDetailVratky = __decorate([
                Decorators.gcontent
            ], GDetailVratky);
            WebClient.GDetailVratky = GDetailVratky;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFZyYXRreS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxWcmF0a3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FrM0VmO0FBbDNFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrM0VuQjtJQWwzRWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWszRTdCO1FBbDNFb0IsV0FBQSxTQUFTO1lBTTFCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLHFCQUEyQztnQkFBOUU7O29CQTBEWSxzQkFBaUIsR0FBWSxLQUFLLENBQUM7b0JBRzNDLGFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDNUMsWUFBWTtvQkFDWixTQUFJLEdBQVksSUFBSSxDQUFDO29CQTRqRXJCLDBGQUEwRjtvQkFDMUYsMEZBQTBGO29CQUUxRiwwQkFBMEI7b0JBQzFCLDRGQUE0RjtvQkFDNUYsS0FBSztvQkFDTCxpQ0FBaUM7b0JBQ2pDLCtCQUErQjtvQkFDL0IsNkVBQTZFO29CQUM3RSxLQUFLO29CQUNMLHlFQUF5RTtvQkFDekUsd0JBQXdCO29CQUN4Qiw2RUFBNkU7b0JBQzdFLGtIQUFrSDtvQkFDbEgsNEhBQTRIO29CQUM1SCxvR0FBb0c7b0JBQ3BHLDhCQUE4QjtvQkFDOUIsK0hBQStIO29CQUMvSCx5RkFBeUY7b0JBQ3pGLGFBQWE7b0JBQ2IsT0FBTztvQkFDUCxrSEFBa0g7b0JBQ2xILGtHQUFrRztvQkFDbEcsc0RBQXNEO29CQUN0RCxxRkFBcUY7b0JBQ3JGLHFFQUFxRTtv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QVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDckgsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzNHLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNqSCxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDM0csUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzNHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUMzRyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDckgsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2pILFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUM3SCxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFFN0gsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVksQ0FBQyxDQUFDO29CQUNyRixHQUFHLENBQUMseUJBQXlCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBWSxDQUFDLENBQUM7b0JBQzFGLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFVLENBQUMsQ0FBQztvQkFDOUQsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVUsQ0FBQyxDQUFDO29CQUN4RCxHQUFHLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFDLENBQUM7b0JBQ2hFLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFVLENBQUMsQ0FBQztvQkFDOUQsR0FBRyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVUsQ0FBQyxDQUFDO29CQUM5RCxHQUFHLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBWSxDQUFDLENBQUM7b0JBQ2xFLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFjLENBQUMsQ0FBQztvQkFDdEUsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQVEsQ0FBQyxDQUFDO29CQUUxRCw0QkFBNEI7b0JBQzVCLDRCQUE0QjtvQkFDNUIsOEJBQThCO29CQUM5QixnQ0FBZ0M7b0JBQ2hDLFlBQVk7b0JBRVosdUJBQXVCO2dCQUMzQixDQUFDO2dCQUNELDBGQUEwRjtnQkFDMUY7Ozs7bUJBSUc7Z0JBQ0ssZ0JBQWdCO29CQUNwQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLHFDQUFxQztvQkFDckMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO3lCQUNoQyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUMxQixvQkFBb0I7b0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUVILHFDQUFxQztvQkFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO3lCQUN2QyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDOUIsb0JBQW9CO29CQUN4QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELDBGQUEwRjtnQkFDMUY7OzttQkFHRztnQkFDSyxxQkFBcUI7b0JBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFFRCw0RkFBNEY7Z0JBQzVGLEtBQUs7Z0JBQ0wsNkRBQTZEO2dCQUM3RCxxQkFBcUI7Z0JBQ3JCLEtBQUs7Z0JBQ0wscUVBQXFFO2dCQUNyRSx1Q0FBdUM7Z0JBQ3ZDLG9DQUFvQztnQkFDcEMsU0FBUztnQkFDVCxpQkFBaUI7Z0JBQ2pCLEdBQUc7Z0JBRUgsMEZBQTBGO2dCQUMxRjs7O21CQUdHO2dCQUNLLG9CQUFvQjtvQkFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDM0IsR0FBRyxFQUFFLEdBQUc7d0JBQ1IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUs7d0JBQ3BDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO3FCQUNqRSxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQ2hDLEdBQUcsRUFBRSxRQUFRO3dCQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLO3dCQUNwQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQztxQkFDL0QsQ0FBQyxDQUFDO29CQUVILG1EQUFtRDtvQkFDbkQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUVELDBGQUEwRjtnQkFDMUY7OzttQkFHRztnQkFDSyxTQUFTO29CQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM5QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ0wsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyx1QkFBdUIsQ0FBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDMUYsTUFBTTt3QkFDVixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLHVCQUF1QixDQUFFLEVBQUUsU0FBUyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7NEJBQ3ZILE1BQU07d0JBQ1YsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ04sT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyx1QkFBdUIsQ0FBRSxFQUFFLFdBQVcsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDOzRCQUN2SCxNQUFNO3dCQUNWLENBQUM7d0JBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNOLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFTLENBQUMsdUJBQXVCLENBQUUsRUFBRSxhQUFhLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzs0QkFDdEgsTUFBTTt3QkFDVixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLHVCQUF1QixDQUFFLEVBQUUsU0FBUyxFQUFFLDRCQUE0QixDQUFDLENBQUM7NEJBQ25ILE1BQU07d0JBQ1YsQ0FBQzt3QkFDRDs0QkFDSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLHVCQUF1QixDQUFFLEVBQUUsVUFBVSxFQUFFLDRCQUE0QixDQUFDLENBQUM7NEJBQ3BILE1BQU07b0JBQ2QsQ0FBQztvQkFFRCxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQzVCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDTCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLGtCQUFrQixDQUFFLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQUM7NEJBQzdHLE1BQU07d0JBQ1YsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ04sT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyxrQkFBa0IsQ0FBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDMUYsTUFBTTt3QkFDVixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLGtCQUFrQixDQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzNGLE1BQU07d0JBQ1YsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ04sT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyxrQkFBa0IsQ0FBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDdEYsTUFBTTt3QkFDVixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLGtCQUFrQixDQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzVGLE1BQU07d0JBQ1YsQ0FBQzt3QkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ0wsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVMsQ0FBQyxrQkFBa0IsQ0FBRSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUMzRixNQUFNO3dCQUNWLENBQUM7d0JBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNOLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFTLENBQUMsa0JBQWtCLENBQUUsRUFBRSxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDL0YsTUFBTTt3QkFDVixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLGtCQUFrQixDQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUN4RixNQUFNO3dCQUNWLENBQUM7d0JBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNOLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFTLENBQUMsa0JBQWtCLENBQUUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDOUYsTUFBTTt3QkFDVixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLGtCQUFrQixDQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNyRixNQUFNO3dCQUNWLENBQUM7d0JBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUyxDQUFDLGtCQUFrQixDQUFFLEVBQUUsY0FBYyxFQUFFLDRCQUE0QixDQUFDLENBQUM7NEJBQ25ILE1BQU07d0JBQ1YsQ0FBQztvQkFDTCxDQUFDO2dCQUVMLENBQUM7Z0JBRUQsMEZBQTBGO2dCQUMxRjs7OzttQkFJRztnQkFDSyxjQUFjLENBQUMsV0FBbUI7b0JBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFFeEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxDQUFDLENBQUM7b0JBQ3ZFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFNLFVBQVUsQ0FBQyxDQUFDO29CQUUvRCxJQUFJLFFBQVEsSUFBSSxJQUFJO3dCQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsK0hBQStIO29CQUMzSyxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO3dCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBTSxVQUFVLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxDQUFDLENBQUM7b0JBRTdELElBQUksR0FBWSxDQUFDO29CQUVqQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFN0MsSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUUsQ0FBQzt3QkFBQyxHQUFHLEdBQUcsVUFBVSxDQUFBO29CQUFDLENBQUM7eUJBQU0sQ0FBQzt3QkFBQyxHQUFHLEdBQUcsS0FBSyxDQUFBO29CQUFDLENBQUM7b0JBRS9GLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7b0JBQzlCLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDckIsdUVBQXVFO3dCQUN2RSxJQUFJLEdBQUcsR0FBWSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDckIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3ZCLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2pELENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixJQUFJLEdBQUcsR0FBWSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDckIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3ZCLENBQUM7d0JBQ0QsSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUUsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxDQUFDOzZCQUFNLENBQUM7NEJBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNqRCxDQUFDO29CQUVMLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztvQkFDL0IsT0FBTztnQkFDWCxDQUFDO2dCQUVELDBGQUEwRjtnQkFDMUY7Ozs7O21CQUtHO2dCQUNLLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBYztvQkFDOUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLEdBQUcsR0FBWSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbEMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLFNBQVMsRUFBRSxDQUFDO3dCQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7NEJBQ2pDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQztnQ0FDbkIsUUFBUSxNQUFNLEVBQUUsQ0FBQztvQ0FDYixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0NBQ1AsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7d0NBQ2pDLE1BQU07b0NBQ1YsQ0FBQztvQ0FDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0NBQ1AsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7d0NBQ2pDLE1BQU07b0NBQ1YsQ0FBQztvQ0FDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3dDQUNOLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dDQUNqQyxNQUFNO29DQUNWLENBQUM7Z0NBQ0wsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUM7b0JBQ0QsT0FBTyxHQUFHLENBQUM7Z0JBQ2YsQ0FBQztnQkFFRCwwRkFBMEY7Z0JBQzFGOzs7O21CQUlHO2dCQUNLLFdBQVcsQ0FBQyxJQUFZO29CQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ3hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxvQkFBb0IsQ0FBQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQSxJQUFJO29CQUMxRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzFFLG9CQUFvQixDQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLElBQUk7b0JBQzFFLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELDBGQUEwRjtnQkFDMUY7Ozs7bUJBSUc7Z0JBQ0ssbUJBQW1CLENBQUMsVUFBbUI7b0JBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtvQkFDckMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFM0MsSUFBSSxJQUFJLEdBQUcsQ0FBQyxVQUFVO3dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQU0sVUFBVSxDQUFDLENBQUMsRUFBRTt3QkFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDLFVBQVU7d0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJO3dCQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBRTFCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQzVCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzdELFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDN0MsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDM0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDN0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsMEZBQTBGO2dCQUMxRjs7Ozs7O21CQU1HO2dCQUNLLGtCQUFrQixDQUFDLEtBQWtCLEVBQUUsS0FBa0IsRUFBRSxPQUFxQjtvQkFDcEYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2xCLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUssOENBQThDO2lDQUNsSixJQUFJLENBQUMsVUFBVSxJQUFJO2dDQUNoQixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDZixPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0NBQ2pFLElBQUksT0FBTyxFQUFFLENBQUM7d0NBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dDQUM3QixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dDQUM5RCxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7d0NBQzlDLG9CQUFvQixDQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLElBQUk7d0NBQzFFLHFFQUFxRTtvQ0FDekUsQ0FBQzt5Q0FBTSxDQUFDO3dDQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzt3Q0FDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3Q0FDOUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO3dDQUN4QyxvQkFBb0IsQ0FBQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQSxJQUFJO3dDQUMxRSxzQ0FBc0M7b0NBQzFDLENBQUM7Z0NBQ0wsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO29CQUNMLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs0QkFDN0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDOUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUM5QyxvQkFBb0IsQ0FBQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQSxJQUFJOzRCQUMxRSxxRUFBcUU7d0JBQ3pFLENBQUM7NkJBQU0sQ0FBQzs0QkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7NEJBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzlELFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDeEMsb0JBQW9CLENBQUEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUEsSUFBSTs0QkFDMUUsc0NBQXNDO3dCQUMxQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxlQUFlLENBQUMsVUFBd0I7b0JBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBRXZFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7d0JBQ2xDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3JFLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDM0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ2pDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3JFLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDckQsQ0FBQztnQkFDTCxDQUFDO2dCQUVELDBGQUEwRjtnQkFDMUY7Ozs7OzttQkFNRztnQkFDSyxZQUFZLENBQUMsS0FBYSxFQUFFLEdBQVc7b0JBQzNDLElBQUksQ0FBQyxHQUFrQixFQUFFLENBQUM7b0JBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDYixLQUFLLEVBQUUsQ0FBQzt3QkFDUixjQUFjO29CQUNsQixDQUFDO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7Z0JBRUQsMEZBQTBGO2dCQUMxRjs7OzttQkFJRztnQkFDSyxlQUFlLENBQUMsR0FBUTtvQkFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQXlELGlDQUFpQztvQkFDckksSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUE4QyxnQ0FBZ0M7d0JBQ2hJLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQTBFLDJCQUEyQjs0QkFDdkgsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFnQixzRUFBc0U7NkJBQ3RFLHFCQUFxQjs0QkFDakgsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBNkIsZ0VBQWdFO29CQUNwSyxDQUFDO29CQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTt3QkFDN0MsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUE0Qyx5REFBeUQ7b0JBQzdKLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQTJFLHVDQUF1Qzs0QkFDbkksU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQXVCLHdDQUF3Qzs2QkFDeEMsbUNBQW1DOzRCQUMvSCxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWtFLGtCQUFrQjtvQkFDdEgsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCwwRkFBMEY7Z0JBQzFGOzs7bUJBR0c7Z0JBQ0ssaUJBQWlCO29CQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QixJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFVLEVBQUUsQ0FBQTtvQkFDdEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFO3lCQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHO3dCQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3JCLDJDQUEyQztvQkFFL0MsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRzt3QkFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixJQUFJLEdBQUcsS0FBSyxXQUFXLEVBQUUsQ0FBQzs0QkFDdEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7NEJBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDO2lDQUN2QyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dDQUN4QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDeEIsQ0FBQyxDQUFDLENBQUE7d0JBQ1YsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUN4QixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNQLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVELDBGQUEwRjtnQkFDMUY7OzttQkFHRztnQkFDSyxRQUFRO29CQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxVQUFVLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3pGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO29CQUNwRixDQUFDO3lCQUFNLENBQUM7d0JBQ0osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztvQkFDN0UsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzs7OztxQkFLSztnQkFDRyxrQkFBa0IsQ0FBQyxnQkFBeUIsS0FBSztvQkFDckQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixxQ0FBcUM7b0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFbEUsc0JBQXNCO29CQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN2QixDQUFDOzt3QkFFRyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDNUMsdURBQXVEO29CQUN2RCw2QkFBNkI7b0JBQzdCLG9EQUFvRDtvQkFDcEQsMEJBQTBCO29CQUMxQiwyQkFBMkI7b0JBQzNCLG1DQUFtQztvQkFDbkMsbUVBQW1FO29CQUNuRSx1Q0FBdUM7b0JBQ3ZDLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQixzQ0FBc0M7b0JBQ3RDLGlCQUFpQjtvQkFDakIsUUFBUTtvQkFDUix3Q0FBd0M7b0JBQ3hDLDBEQUEwRDtvQkFDMUQsb0NBQW9DO29CQUNwQyxpQ0FBaUM7b0JBQ2pDLGtFQUFrRTtvQkFDbEUsV0FBVztvQkFDWCw4QkFBOEI7b0JBQzlCLFFBQVE7Z0JBQ1osQ0FBQztnQkFDRCwwRkFBMEY7Z0JBQzFGLDBGQUEwRjtnQkFFMUYsMEZBQTBGO2dCQUMxRjs7Ozs7OzttQkFPRztnQkFDSCxFQUFFLENBQUMsTUFBYztvQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hJLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNELDBGQUEwRjtnQkFDMUY7Ozs7Ozs7bUJBT0c7Z0JBQ0gsUUFBUSxDQUFDLE1BQWM7b0JBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksY0FBYyxHQUFZLEtBQUssQ0FBQztvQkFFcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFeEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNkLGNBQWMsR0FBRyxJQUFJLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLG9EQUFvRCxDQUFDOzZCQUNqRixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFOzRCQUN4QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUE7b0JBQ1YsQ0FBQztvQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDN0MsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQztvQkFDRCw2QkFBNkI7b0JBQzdCLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUV2RCwyRUFBMkU7b0JBQzNFLGlHQUFpRztvQkFDakcsc0dBQXNHO29CQUN0RyxzRkFBc0Y7b0JBQ3RGLDJDQUEyQztvQkFDM0MsNEJBQTRCO29CQUM1Qix3Q0FBd0M7b0JBQ3hDLHlIQUF5SDtvQkFFekgsK0NBQStDO29CQUMvQyx3QkFBd0I7b0JBQ3hCLElBQUksUUFBUSxHQUFRLFNBQVMsQ0FBQztvQkFDOUIsSUFBSSxVQUFVLEdBQVEsU0FBUyxDQUFDO29CQUNoQyxvQ0FBb0M7b0JBQ2hDLFdBQVc7b0JBQ1gsUUFBUSxDQUFBLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRyxJQUFZLENBQUMsYUFBYSxFQUFFLEVBQUcsSUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBRSxJQUFZLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZLLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO29CQUNuRixRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztvQkFDN0UsUUFBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7b0JBQzVGLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDO29CQUMvRixRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDN0IsYUFBYTtvQkFDYiw0REFBNEQ7b0JBQzVELHFDQUFxQztvQkFDekMsR0FBRztvQkFFSCx1RUFBdUU7b0JBQ3ZFLGdGQUFnRjtvQkFDaEYsb0NBQW9DO29CQUNwQyw0R0FBNEc7b0JBQzVHLHNIQUFzSDtvQkFDdEgsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDO3dCQUN0QyxnR0FBZ0c7d0JBQzVGLGNBQWMsR0FBRyxJQUFJLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLG1EQUFtRCxDQUFDOzZCQUMzRSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFOzRCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzVFLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUNELDRHQUE0RztvQkFDNUcsNEZBQTRGO29CQUM1RixnREFBZ0Q7b0JBQ2hELCtFQUErRTtvQkFDL0UsK0RBQStEO29CQUMvRCwyQkFBMkI7b0JBQzNCLGdCQUFnQjtvQkFDaEIsNEdBQTRHO29CQUM1Ryx5SEFBeUg7b0JBQ3pILElBQUksUUFBUSxDQUFDLENBQUUsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNoQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxpQ0FBaUMsQ0FBQzs2QkFDekQsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMzRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCw0R0FBNEc7b0JBQzVHLDRIQUE0SDtvQkFDNUgsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUM5RCxjQUFjLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxxQ0FBcUMsQ0FBQztpQ0FDN0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtnQ0FDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUMvRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDeEIsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQztvQkFDTCxDQUFDO29CQUNELDRHQUE0RztvQkFDNUcsNkhBQTZIO29CQUM3SCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUMvRCxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxvQ0FBb0MsQ0FBQzs2QkFDNUQsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMvRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCw0R0FBNEc7b0JBQzVHLElBQUksUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLDJEQUEyRDt3QkFDaEYsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLENBQUM7NEJBQzlDLGNBQWMsR0FBRyxJQUFJLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDRGQUE0RixDQUFDO2lDQUNwSCxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dDQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7Z0NBQzNFLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDOzZCQUFNLENBQUM7NEJBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzt3QkFBQyxDQUFDO29CQUN6RCxDQUFDO29CQUNELDRHQUE0RztvQkFDNUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFVBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFTLEVBQUUsQ0FBQzt3QkFDakcsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUseUNBQXlDLENBQUM7NkJBQ2pFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7NEJBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDcEYsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7b0JBQ0QsNEdBQTRHO29CQUM1Ryw2REFBNkQ7b0JBQzdELGlGQUFpRjtvQkFDakYsZ0NBQWdDO29CQUNoQyx5REFBeUQ7b0JBQ3pELG9DQUFvQztvQkFDcEMsWUFBWTtvQkFDWiw0R0FBNEc7b0JBQzVHLGtGQUFrRjtvQkFDbEYsbUNBQW1DO29CQUNuQywyRkFBMkY7b0JBQzNGLHNEQUFzRDtvQkFDdEQscUZBQXFGO29CQUNyRixFQUFFO29CQUNGLDhEQUE4RDtvQkFDOUQsNkRBQTZEO29CQUM3RCxFQUFFO29CQUNGLDRCQUE0QjtvQkFDNUIsb0NBQW9DO29CQUNwQyxZQUFZO29CQUNaLDRHQUE0RztvQkFDNUcscUNBQXFDO29CQUNyQyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUM7b0JBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUM1QyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQzs2QkFDM0MsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUM1RSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCw0R0FBNEc7b0JBQzVHLHVDQUF1QztvQkFDdkMsSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUMsd0RBQXdEO3dCQUM5RixjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQzs2QkFDN0MsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNqRixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCw0R0FBNEc7b0JBQzVHLHFIQUFxSDtvQkFDckgsSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUM1RCxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSx1Q0FBdUMsQ0FBQzs2QkFDL0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNyRixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCw0R0FBNEc7b0JBQzVHLG1DQUFtQztvQkFDbkMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUNsQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDOzRCQUM5RCxrR0FBa0c7NEJBQ2xHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQ0FDbEgsR0FBRyxFQUFFO2lDQUNMLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUc7Z0NBQ2YsK0ZBQStGO2dDQUMvRixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQ0FDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQ3hCLENBQUMsd0NBQXdDLEVBQUUsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUN6RTt3Q0FDSSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBMkIsd0JBQXdCO3dDQUNoRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBZSxrQkFBa0I7d0NBQzFELEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFtQiwrQkFBK0I7d0NBQ3ZFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFtQixtQkFBbUI7d0NBQzNELEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFtQixtQ0FBbUM7d0NBQzNFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFtQixzQkFBc0I7d0NBQzlELElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFxQixpQkFBaUI7d0NBQ3pELFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFhLGtCQUFrQjt3Q0FDMUQsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQXlCLG9CQUFvQjt3Q0FDNUQsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQXlCLGdCQUFnQjt3Q0FDeEQsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQWlCLGlCQUFpQjt3Q0FDekQsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQWUsbUJBQW1CO3dDQUMzRCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBMkIsa0JBQWtCO3dDQUMxRCxHQUFHLEVBQUUsQ0FBQyxFQUFrQyxFQUFFO3dDQUMxQyxTQUFTLEVBQUUsS0FBSyxFQUF3QixlQUFlO3dDQUN2RCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBbUIsUUFBUTtxQ0FDbkQsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO3lDQUM5QixtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dDQUNoQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0Q0FDZCx3R0FBd0c7NENBQ3hHLHlIQUF5SDs0Q0FFekgsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUcsbUJBQW1COzRDQUNyRCxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7NENBQ3pCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFHLDJCQUEyQjs0Q0FDN0QsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsMkJBQTJCOzRDQUM3RCxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBRywyQkFBMkI7NENBQzdELFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFXLDJCQUEyQjs0Q0FDN0QsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDOzRDQUMzQixRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0RUFBNEU7NENBRXBHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ3hILENBQUM7b0NBQ0wsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQztxQ0FBTSxDQUFDO29DQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hILENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUE7d0JBQ1YsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hILENBQUM7d0JBRUQsNEdBQTRHO29CQUdoSCxDQUFDO3lCQUFNLENBQUM7d0JBQ0osT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3hCLENBQUM7b0JBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQ0QsMEZBQTBGO2dCQUMxRjs7Ozs7OzttQkFPRztnQkFDSCxpQkFBaUIsQ0FBQyxRQUFhLEVBQUUsTUFBYztvQkFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pILENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsc0RBQXNELENBQUM7NkJBQ3JGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7NEJBQ3hCLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO2dDQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakgsQ0FBQzs0QkFDRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztnQ0FDbEIsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0NBQzdCLG9GQUFvRjtnQ0FDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pILENBQUM7aUNBQU0sQ0FBQztnQ0FDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0NBQ3BCLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUN4QixDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFBO29CQUNWLENBQUM7b0JBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsMEZBQTBGO2dCQUMxRjs7Ozs7OzttQkFPRztnQkFDSCxVQUFVLENBQUMsS0FBVSxFQUFFLE1BQWM7b0JBQ2pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDcEMsSUFBSSxFQUFFOzRCQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7NEJBQ3pCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTs0QkFDNUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPOzRCQUN0QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQ1YsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJOzRCQUNoQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7NEJBQ3hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTs0QkFDcEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJOzRCQUNoQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87NEJBQ3RCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVzs0QkFDOUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFROzRCQUN4QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7NEJBQ2xCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTs0QkFDWixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7NEJBQ2xCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzs0QkFDbEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLOzRCQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7NEJBQ2xCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTs0QkFDWixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7NEJBQ1osRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFOzRCQUNaLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzs0QkFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPOzRCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87NEJBQ3RCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzs0QkFDMUIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXOzRCQUM5QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzRCQUNuQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87NEJBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFROzRCQUV4QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87NEJBQ3RCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTs0QkFDaEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUksMkJBQTJCOzRCQUNyRCxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSwyQkFBMkI7NEJBQ3JELE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFJLDJCQUEyQjs0QkFDckQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQVksMkJBQTJCOzRCQUNyRCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7eUJBQ2pCO3FCQUNKLENBQUM7eUJBQ0csR0FBRyxFQUFFO3lCQUNMLElBQUksQ0FBQyxVQUFVLEdBQUc7d0JBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDakIsNENBQTRDO3dCQUM1QyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQzVCLDJEQUEyRDs0QkFDM0QsSUFBSSxDQUFDLFlBQWEsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDM0QsQ0FBQzt3QkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNyQixJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDZCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxpREFBaUQ7Z0NBQy9ELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUN6QixDQUFDO2lDQUFNLENBQUM7Z0NBQ0osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7NEJBQ3hHLENBQUM7d0JBQ0wsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsc0NBQXNDLEVBQUUsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7aUNBQ2xPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0NBQ3hCLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO29DQUNkLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLGlEQUFpRDtvQ0FDOUQsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ3pCLENBQUM7cUNBQU0sQ0FBQztvQ0FDSixJQUFJLENBQUMsa0JBQWtCLEVBQUU7eUNBQ3BCLElBQUksQ0FBQyxHQUFHLEVBQUU7d0NBQ1AsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dDQUN2QixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDekIsQ0FBQyxDQUFDO3lDQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7d0NBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQ3hCLENBQUMsQ0FBQyxDQUFBO2dDQUNWLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHO3dCQUMzQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksR0FBRyxLQUFLLFdBQVcsRUFBRSxDQUFDOzRCQUN0QixHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUM7aUNBQ3ZDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0NBQ3hCLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDOzZCQUNJLENBQUM7NEJBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQUMsQ0FBQztvQkFDakMsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsT0FBTztvQkFDSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsMERBQTBELENBQUM7NkJBQ3pGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7NEJBQ3hCLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO2dDQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDcEcsdUJBQXVCOzRCQUMzQixDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7NEJBQ3hCLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUE7b0JBQ1YsQ0FBQzt5QkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDcEMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3pCLENBQUM7eUJBQU0sQ0FBQzt3QkFDSix5REFBeUQ7d0JBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDakMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDeEQsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTt3QkFFOUQsSUFBSSxVQUFVLEVBQUUsQ0FBQzs0QkFDYixpQ0FBaUM7NEJBQ2pDLDJKQUEySjs0QkFDM0osa0JBQWtCOzRCQUNsQix3REFBd0Q7NEJBQ3hELDREQUE0RDs0QkFDNUQsd0RBQXdEOzRCQUN4RCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO2lDQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFO2dDQUNOLGNBQWM7Z0NBQ2QsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUM3QixDQUFDLENBQUM7aUNBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRTtnQ0FDVixjQUFjO2dDQUNkLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUM7aUNBQ0QsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7aUNBQ25DLElBQUksQ0FBQztnQ0FDRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztxQ0FDWCxJQUFJLENBQUM7b0NBRUYsZ0VBQWdFO29DQUNoRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUV2QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyRCxDQUFDLENBQUMsQ0FBQzt3QkFFWCxDQUFDOzZCQUNJLENBQUM7NEJBQ0YsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQztvQkFDTCxDQUFDO29CQUNELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2FBbVBKLENBQUE7WUEzMkVZLGFBQWE7Z0JBRHpCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsYUFBYSxDQTIyRXpCO1lBMzJFWSx1QkFBYSxnQkEyMkV6QixDQUFBO1FBQ0wsQ0FBQyxFQWwzRW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWszRTdCO0lBQUQsQ0FBQyxFQWwzRWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWszRW5CO0FBQUQsQ0FBQyxFQWwzRVMsTUFBTSxLQUFOLE1BQU0sUUFrM0VmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxWcmF0a3kudHMgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEZXRhaWwgdnJhdGt5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAxLTA3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgZXhwb3J0IHR5cGUgRHRvVHlwZVZyYXRreSA9IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bztcclxuICAgIGV4cG9ydCB0eXBlIFVzZWRDb21wb25lbnRzVnJhdGt5ID0gR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HaW5EZXNjUHJvcHNFeHRlbnNpb25zICYgR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxEdG9UeXBlVnJhdGt5PjtcclxuXHJcbiAgICBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbFZyYXRreSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxVc2VkQ29tcG9uZW50c1ZyYXRreT4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIC8vI3JlZ2lvbiBQcm9wZXJ0aWVzXHJcbiAgICAgICAgLyoqIElkZW50aWZpa8OhdG9yIHDFmcOtcGFkdSBERFAgKi9cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICAvKiogS25paGEgKi9cclxuICAgICAgICBJeHBEZW46IHN0cmluZztcclxuICAgICAgICAvKiogxZjDoWRlayDDumhyYWR5IC0gaWRlbnRpZmlrdWrDrWPDrSDEjcOtc2xvIHZyYXRreSAqL1xyXG4gICAgICAgIFJhZGVrX3VocjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiDEjMOtc2xvIHR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBUeXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIExvZ2lja8OhIHByb23Em25uw6EgdXLEjXVqw61jw60gemRhIGplIGRldGFpbCBub3bEmyB2eXR2b8WZZW7DvSBuZWJvIG90ZXbFmWVuw70gdiByZcW+aW11IGVkaXRhY2UvxI10ZW7DrVxyXG4gICAgICAgICAqIFRydWUgPSByZcW+aW0gZWRpdGFjZS/EjXRlbsOtIHDFmWVkcGlzdSB8IEZhbHNlID0gbm92xJsgdnl0dm/FmWVuw70gcMWZZWRwaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBFZGl0OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBEbGUgbmFzdGF2ZW7DrSAobmFwxZkuUmXFvmltIMSNdGVuw60geiB0eXB1IHBvaGxlZMOhdmt5KSAqL1xyXG4gICAgICAgIEx6ZVVwcmF2b3ZhdDogYm9vbGVhbjtcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgZnVua2NlICovXHJcbiAgICAgICAgSXhzRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayB6ZGEgb3JnYW5pemFjZSB2IGRhbsOpbSByb2NlIGtvbXVuaWt1amUgc2Ugc3lzdMOpbWVtIFN0w6F0bsOtIHBva2xhZG55IChJSVNTUCkgKi9cclxuICAgICAgICBQcml6SWlzc3A6IG51bWJlcjtcclxuICAgICAgICAvKiogUMWZw61zdHVwb3bDqSBwYXJhbWV0cnkgKi9cclxuICAgICAgICBQYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG87XHJcbiAgICAgICAgLyoqIEJ1aWxkZXIgU3RhdHVzIEJhciAqL1xyXG4gICAgICAgIGJ1aWxkZXJTdGF0dXNCYXI6IE1lbnVQYXJhbXNbXTtcclxuICAgICAgICAvKiogQWt0dcOhbG7DrSBzYWxkbyAocMWZZXBsYXRlaykgKi9cclxuICAgICAgICBTYWxkb0FrdHU6IERlY2ltYWw7XHJcbiAgICAgICAgLyoqIENlbGtvdsOpIHNhbGRvIChwxZllcGxhdGVrKSAqL1xyXG4gICAgICAgIFNhbGRvQ2VsazogRGVjaW1hbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgRFRPIHDFmcOtcGFkdVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIER0b1ByaXBhZDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG87XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqICBEVE8gVHlwdSBwb2hsZWTDoXZreVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIER0b1R5cFBobDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEVE8gcMWZZWRwaXN1XHJcbiAgICAgICAgICogIEB0eXBlIHtHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRHRvVnJhdGthOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG87IFxyXG4gICAgICAgIFJlY1ZyYXRrYTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvO1xyXG4gICAgICAgIFZyYXRrYVpQbGF0Ynk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIERUTyBQxZnDrXN0dXDFryBrIGplZG5vdGxpdsO9bSBwb2zDrcSNa3VtIHDFmWVkcGlzdVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuR1ByaXBhZFByZWRwaXNQZXJtc0R0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwZXJtc0R0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuR1ByaXBhZFByZWRwaXNQZXJtc0R0bztcclxuICAgICAgICAvLy0tLSAgIFxyXG4gICAgICAgIHJvazogbnVtYmVyO1xyXG4gICAgICAgIHVjczogc3RyaW5nO1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG4gICAgICAgIC8vLS0tXHJcbiAgICAgICAgcHJpdmF0ZSBzYXpieURQSDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdFa29jZGFwRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBrdXJ6eU1lbnlEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRWtvZGt1ckR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2ZW5pUHJlcG9jdHU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIFdhcm5pbmc6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIG1lbmE6IGFueTtcclxuICAgICAgICB6cEhvdG92ZSA9IFsxMCwgNTAsIDUxLCA1MiwgNTMsIDU0LCA0MiwgNzNdO1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIGluaXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHptZW55OiBib29sZWFuO1xyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIbGF2bsOtIG1ldG9kYSBwcm8gaW5pY2lhbGl6YWNpIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIG9uQ29udGVudFJlYWR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiR05hY3RlbmlPa25hVnJhdGt5XCIsIHRleHQ6IFwiTmHEjcOtdMOhbSBkYXRhLi4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pS2xhdlprcmF0ZWsoKTtcclxuICAgICAgICAgICAgdGhhdC5uYWN0ZW5pUHJpc3R1cHUoKTtcclxuICAgICAgICAgICAgdGhhdC5uYWN0aURhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qP1NNQVpBVCBQTyBURVNUVSovdGhhdC56bWVueSA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpOy8qKi9cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qP1NNQVpBVCBQTyBURVNUVSovdGhhdC56bWVueSA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpOy8qKi9cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIkdOYWN0ZW5pT2tuYVZyYXRreVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbml0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5XYXJuaW5nLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhhdC5zdGF0dXNlcyFbXCJzdGF0dXNCYXJJbmZvXCJdISwgXCI8aSBjbGFzcz1cXFwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGVcXFwiPjwvaT4gXCIsIFwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFySW5mb1wiXSEsIFwiPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrLWNpcmNsZVxcXCI+PC9pPiBcIiwgXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgKiBAbWV0aG9kIG9uRGV0YWlsQnVpbGRlckFjdGl2ZU9wKClcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeS5FdmVudH0gZXYgdWTDoWxvc3RcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gY3R4PyBwxa92b2Ruw60gdWTDoWxvc3QgYSBqZWrDrSBhcmd1bWVudHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJBY3RpdmVPcChldjogSlF1ZXJ5LkV2ZW50LCBjdHg/OiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKHRydWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2ZU9QXCIsIGV2LnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHNlc3RhdmVuw60gYSBuYXN0YXZlbsOtIGhsYXZpxI1reSBkb2t1bWVudHVcclxuICAgICAgICAgKiBAbWV0aG9kIG9uRGV0YWlsQnVpbGRlckJ1aWxkKClcclxuICAgICAgICAgKiBAcGFyYW0gYnVpbGRlciBidWlsZGVyIGRldGFpbHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGhlYWRlckZvcm0gPSB0aGlzLmNyZWF0ZUhlYWRlckZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuSW5mb10gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzJdLCAvLyBQSUQgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzNdICAvLyDEjMOtc2xvIHZyYXRreVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMV0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzBdLCAvLyBQSUQgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzFdICAvLyBUeXAgRG9rdW1lbnR1ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTJdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVs0XSwgLy8gUG/FmWFkw61cclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbNV0gIC8vIFpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcblxyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGEzXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbNl0sIC8vIFDFmcOtamVtY2UgKEVTVSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGhsYXZpxI1reVxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgZm9ybVNldHVwKTsgICBcclxuICAgICAgICAgICAgLy90aGF0LmJ1aWxkZXJTdGF0dXNCYXIgPSAoKDxhbnk+YnVpbGRlcikuc3RhdHVzQmFyRGVmaW5pdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBXRkwvU1NMIGtvbXBvbmVudFxyXG4gICAgICAgICAgICBHb3JkaWMuU3NsLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLlNzbFByb2ZpbERva3VtZW50RWtvLnNldFRhYnNJbml0TGF6eShidWlsZGVyKTtcclxuICAgICAgICAgICAgRWtvLkRldGFpbC5jaGFuZ2VEZXRhaWxCdWlsZGVyV2ZsRm9yRWtvRGVmaW5pdGlvbnMoYnVpbGRlciwgdHJ1ZSk7IC8vdHJ1ZSAvL2ZhbHNlIC8vc21hemF0XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhIMWhaXBreSBkbyBzdGF0dXNiYXJ1IHBybyBwb3N1biBwbyBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoYXQubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncGMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrX3VocjogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5yYWRla191aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFzbGVkdWppY2lEZXRhaWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV4dEl0ZW1UZW1wbGF0ZTogXCJOw6FzbGVkdWrDrWPDrToge2l4cF92cmF9XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2SXRlbVRlbXBsYXRlOiBcIlDFmWVkY2hvesOtOiB7aXhwX3ZyYX1cIixcclxuICAgICAgICAgICAgICAgIGJlZm9yZU1vdmU6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlciBkZXRhaWxidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vdGhpcy5idWlsZGVyU3RhdHVzQmFyID0gKCg8YW55PmJ1aWxkZXIpLnN0YXR1c0JhckRlZmluaXRpb25zKTtcclxuICAgICAgICAgICAgdGhhdC5sb2FkU2F6YmFBbmRLdXJ6KCk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudChcIkdEZHBEZXRhaWxWcmF0a3lcIixcclxuICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRleHRzIC0gdGV4dHlcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0czoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWN0aW9ucyAtIHJlZ2lzdHJhY2UgYWtjaSBrb250ZW50dVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0R1ByaXBhZFZyYXRrYVZ5bnV0aXRaYXZyZW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FWeW51dGl0WmF2cmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmWl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWeW51dGl0IHphdsWZZW7DrSB2cmF0a3kgYmV6IGRhbMWhw60gYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RHUHJpcGFkVnJhdGthU2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkVnJhdGthU2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2VuYWJsZWQ6IHRoYXQucGVybXNEdG8uc2F2ZSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdEdQcmlwYWRWcmF0a2FTYXZlQ2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByaXBhZFZyYXRrYVNhdmVDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0IGEgemF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogdGhhdC5wZXJtc0R0by5zYXZlISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2soMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0R1ByaXBhZFZyYXRrYVBvZGFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkVnJhdGthUG9kYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvZMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlBvxZnDrXplbsOtIG5vdsOpIHZyYXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2VuYWJsZWQ6IHRoYXQucGVybXNEdG8uYWN0UG9kYW5pISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2cmF0a2E6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0byA9IHsgaXhwOiB0aGlzLkl4cCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQb2TDoW7DrSBub3bDqSB2cmF0a3kuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkVnJhdGt5LnZ5dHZvclZyYXRrdVByaXBhZHUocnEgPT4geyByZXR1cm4geyBkYXRhOiB2cmF0a2EgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsVnJhdGt5XCIsIHsgSUQ6ICdERFBHVnJhdGthIycsIFR5cF9waGw6IHRoYXQuVHlwX3BobCwgSXhwOiB0aGF0Lkl4cCwgUmFkZWtfdWhyOiByZXQucmVzdWx0LmRhdGEucmFkZWtfdWhyLCBFZGl0OiBmYWxzZSwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlld1ZyYXRreS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCB2b2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdEdQcmlwYWREZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByaXBhZERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWVuw60gZGV0YWlsdSBwxZnDrXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogdGhhdC5wZXJtc0R0by5hY3RQcmlwYWQhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkub3BlblByaXBhZERldGFpbCh0aGlzLCB0aGF0Lkl4cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBJRDogXCJERFBHUHJpcGFkRGV0YWlsI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBJeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBUeXBQaGw6IHRoYXQuVHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FjdFRpc2tEb2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjdFRpc2tEb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGVtYTogXCJkZHBfcHRtX3ZyYXRrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6VnJhdGthRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmVwLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpeHA6IHRoYXQuRHRvVnJhdGthLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpeHNfZXN1OiB0aGF0LkR0b1ZyYXRrYS5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHVkYWplUHJlZHBpc3U6IHRoYXQuRHRvVnJhdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KSwgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0R1ByaXBhZFZyYXRrYVRpc2s6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByaXBhZFZyYXRrYVRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUaXNrIHZyYXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lbmFibGVkOiB0aGF0LnBlcm1zRHRvLmFjdFRpc2shLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF90aGF0ID0gdGhpczsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Lb250cm9sYSB6cHJhY292YXRlbGUgZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuUGFyYW1zLmRkcF9yYWRfdnJhdGthICE9IDEpIHsgLy8gbWF5YmUgJiYgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5EdG9QcmlwYWQuaXhzX2Z1bl9ha3QgIT0gdGhhdC5JeHNGdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lanN0ZSB6cHJhY292YXRlbGVtIGRva3VtZW50dSFcIik7IC8vPyBLb25lYyBha2NlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RHVGlza1ZyYXRreVByaXBhZHUgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrVnJhdGthUHJpcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fdnJhdGthXCIsIC8vJ2RkcF9wdG1fdnJhdGthJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6VnJhdGthRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuRHRvVnJhdGthLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiB0aGF0LkR0b1ZyYXRrYS5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVkYWplUHJlZHBpc3U6IHRoYXQuRHRvVnJhdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0R1Rpc2tWcmF0a3lQcmlwYWR1LnJ1bigpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdEdQcmlwYWRWcmF0a2FPYm5vdml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT2Jub3ZhIHZyYXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lbmFibGVkOiB0aGF0LnBlcm1zRHRvLmFjdE9ibm92aXQhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX3RoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJxID0geyBpZERkcFByaXBhZHU6IHRoYXQuRHRvVnJhdGthLml4cCEsIHJhZGVrVWhyYWR5OiB0aGF0LkR0b1ZyYXRrYS5yYWRla191aHIhIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRWcmF0a3kub2Jub3ZhVnJhdGt5UHJpcGFkdShycSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IG9wZXJhY2UgcG8gYWt0dWFsaXphY2kgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyEgYWt0dWFsaXpvdmF0IHN0YXYgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyEgbmFwxZkuamUgLSBsaSB2cmF0a2Egc3Rvcm5vdsOhbmEgdHXFocOtbSDFvmUgYnkgc2UgcyBuw60gbmVtxJtsbyBuaWMgZMOhdCBkxJtsYXQgLT4gem5lcMWZw61zdHVwbml6dCBwb2zDrcSNa2EgYSB0bGHEjcOtdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbG9hZERldGFpbFZyYXRreSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGVuaVByaXN0dXB1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RHUHJpcGFkVnJhdGthU3Rvcm5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlN0b3JubyB2cmF0a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogdGhhdC5wZXJtc0R0by5hY3RTdG9ybm8hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF90aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBycSA9IHsgaWREZHBQcmlwYWR1OiB0aGF0LkR0b1ZyYXRrYS5peHAhLCByYWRla1VocmFkeTogdGhhdC5EdG9WcmF0a2EucmFkZWtfdWhyISB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkVnJhdGt5LnN0b3Jub1ZyYXRreVByaXBhZHUocnEpLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBvcGVyYWNlIHBvIGFrdHVhbGl6YWNpIHZyYXRreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8hIGFrdHVhbGl6b3ZhdCBzdGF2IHZyYXRreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8hIG5hcMWZLmplIC0gbGkgdnJhdGthIHN0b3Jub3bDoW5hIHR1xaHDrW0gxb5lIGJ5IHNlIHMgbsOtIG5lbcSbbG8gbmljIGTDoXQgZMSbbGF0IC0+IHpuZXDFmcOtc3R1cG5penQgcG9sw63EjWthIGEgdGxhxI3DrXRrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWREZXRhaWxWcmF0a3koKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RlbmlQcmlzdHVwdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0R1ByaXBhZFZyYXRrYVNjaHZhbGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FTY2h2YWxpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2NodsOhbGVuw60gdnJhdGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2VuYWJsZWQ6IHRoYXQucGVybXNEdG8uYWN0U2NodmFsaXQhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF90aGF0ID0gdGhpczsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJxID0geyBpZERkcFByaXBhZHU6IHRoYXQuRHRvVnJhdGthLml4cCEsIHJhZGVrVWhyYWR5OiB0aGF0LkR0b1ZyYXRrYS5yYWRla191aHIhIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRWcmF0a3kuc2NodmFsVnJhdGt5UHJpcGFkdShycSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IG9wZXJhY2UgcG8gYWt0dWFsaXphY2kgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyEgYWt0dWFsaXpvdmF0IHN0YXYgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyEgbmFwxZkuamUgLSBsaSB2cmF0a2Egc3Rvcm5vdsOhbmEgdHXFocOtbSDFvmUgYnkgc2UgcyBuw60gbmVtxJtsbyBuaWMgZMOhdCBkxJtsYXQgLT4gem5lcMWZw61zdHVwbml6dCBwb2zDrcSNa2EgYSB0bGHEjcOtdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbG9hZERldGFpbFZyYXRreSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGVuaVByaXN0dXB1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKG9iai5iYXNlTWVzc2FnZSArIFwiPC9icj4gUMWZZWpldGUgc2kga29udHJvbHUgcMWZZXBzYXQ/XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnVsb3ooJC5leHRlbmQocGFyYW1zLCBwYXJhbXMuS29udHJvbGFFeGlzdGVuY2UgPSBmYWxzZSwgeyBjb25maXJtOiB0cnVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RHUHJpcGFkVnJhdGthVnJhdGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FWcmF0aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnJhdGl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlZyw6FjZW7DrSB2cmF0a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogdGhhdC5wZXJtc0R0by5hY3RWcmF0aXQhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF90aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5iZWdpbk9wZXJhdGlvbihcIk5hc3RhdnVqdSByZWFsaXphY2kgdnJhdGt5Li4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBycSA9IHsgaWREZHBQcmlwYWR1OiB0aGF0LkR0b1ZyYXRrYS5peHAhLCByYWRla1VocmFkeTogdGhhdC5EdG9WcmF0a2EucmFkZWtfdWhyISB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkVnJhdGt5LnZyYXRWcmF0a3lQcmlwYWR1KHJxKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogb3BlcmFjZSBwbyBha3R1YWxpemFjaSB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vISBha3R1YWxpem92YXQgc3RhdiB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vISBuYXDFmS5qZSAtIGxpIHZyYXRrYSBzdG9ybm92w6FuYSB0dcWhw61tIMW+ZSBieSBzZSBzIG7DrSBuZW3Em2xvIG5pYyBkw6F0IGTEm2xhdCAtPiB6bmVwxZnDrXN0dXBuaXp0IHBvbMOtxI1rYSBhIHRsYcSNw610a2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkRGV0YWlsVnJhdGt5KCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0ZW5pUHJpc3R1cHUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdEdQcmlwYWRWcmF0a2FSZWFsaXpvdmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FSZWFsaXpvdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJlYWxpem92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVhbGl6YWNlIHZyYXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lbmFibGVkOiB0aGF0LnBlcm1zRHRvLmFjdFJlYWxpem92YXQhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX3RoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJxID0geyBpZERkcFByaXBhZHU6IHRoYXQuRHRvVnJhdGthLml4cCEsIHJhZGVrVWhyYWR5OiB0aGF0LkR0b1ZyYXRrYS5yYWRla191aHIhIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRWcmF0a3kucmVhbGl6dWpWcmF0a3lQcmlwYWR1KHJxKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogb3BlcmFjZSBwbyBha3R1YWxpemFjaSB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vISBha3R1YWxpem92YXQgc3RhdiB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vISBuYXDFmS5qZSAtIGxpIHZyYXRrYSBzdG9ybm92w6FuYSB0dcWhw61tIMW+ZSBieSBzZSBzIG7DrSBuZW3Em2xvIG5pYyBkw6F0IGTEm2xhdCAtPiB6bmVwxZnDrXN0dXBuaXp0IHBvbMOtxI1rYSBhIHRsYcSNw610a2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkRGV0YWlsVnJhdGt5KCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0ZW5pUHJpc3R1cHUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShvYmouYmFzZU1lc3NhZ2UgKyBcIjwvYnI+IFDFmWVqZXRlIHNpIGtvbnRyb2x1IHDFmWVwc2F0P1wiKS5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhhdC51bG96KCQuZXh0ZW5kKHBhcmFtcywgcGFyYW1zLktvbnRyb2xhRXhpc3RlbmNlID0gZmFsc2UsIHsgY29uZmlybTogdHJ1ZSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdEdQcmlwYWRWcmF0a2FOYXN0YXZlbmlTYWxkYUFrdHVhbG5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRWcmF0a2FOYXN0YXZlbmlTYWxkYUFrdHVhbG5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZsb8W+ZW7DrSBha3R1w6FsbsOtaG8gc2FsZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVmxvxb7DrSBha3R1w6FsbsOtIHNhbGRvIChwxZllcGxhdGVrKSBkbyBwb2zDrcSNa2EgxI3DoXN0a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LlNhbGRvQWt0dSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdEdQcmlwYWRWcmF0a2FOYXN0YXZlbmlTYWxkYUNlbGtlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkVnJhdGthTmFzdGF2ZW5pU2FsZGFDZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVmxvxb5lbsOtIGNlbGtvdsOpaG8gc2FsZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVmxvxb7DrSBjZWxrb3bDqSBzYWxkbyAocMWZZXBsYXRlaykgZG8gcG9sw63EjWthIMSNw6FzdGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5TYWxkb0NlbGspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RUZXN0TmFzdGF2ZW5pUG9saWNlazoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUZXN0TmFzdGF2ZW5pUG9saWNla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXYgcG9sw63EjWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlRlc3QgbmFzdGF2ZW7DrSBwb2zDrcSNZWsgc3MsYnVfdmwsYnVfY2lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVzdE5hc3RhdmVuaVBvbGljZWsoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1lbnVCYXIgLSBob3Juw60gbGnFoXRhIHMgdGxhxI3DrXRreVxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97IGFjdGlvbjogXCJhY3RUZXN0TmFzdGF2ZW5pUG9saWNla1wiLCAgICBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwibm9ybWFsXCIsIH0sIC8vIFRFU1RcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0R1ByaXBhZFZyYXRrYVBvZGFuaVwiLCAgICAgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm5vcm1hbFwiLCB9LCAvLyBwb2TDoW7DrSBub3bDqSB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0R1ByaXBhZFZyYXRrYVRpc2tcIiwgICAgICAgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm5vcm1hbFwiLCB9LCAvLyB0aXNrIHZyYXRreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RHUHJpcGFkRGV0YWlsXCIsICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwibm9ybWFsXCIsIH0sIC8vIG90ZXbFmcOtdCBkZXRhaWwgcMWZZWRwaXN1IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RHUHJpcGFkVnJhdGthT2Jub3ZpdFwiLCAgICBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwibm9ybWFsXCIsIH0sIC8vIG9ibm92YSB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0R1ByaXBhZFZyYXRrYVN0b3Jub1wiLCAgICAgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm5vcm1hbFwiLCB9LCAvLyBzdG9ybm8gdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdEdQcmlwYWRWcmF0a2FTY2h2YWxpdFwiLCAgIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJub3JtYWxcIiwgfSwgLy8gc2NodsOhbGVuw60gdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdEdQcmlwYWRWcmF0a2FWcmF0aXRcIiwgICAgIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJub3JtYWxcIiwgfSwgLy8gdnLDoWNlbsOtIHZyYXRreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RHUHJpcGFkVnJhdGthUmVhbGl6b3ZhdFwiLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwibm9ybWFsXCIsIH0sIC8vIHZyw6FjZW7DrSB2cmF0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0R1ByaXBhZFZyYXRrYVZ5bnV0aXRaYXZyZW5pXCIsIGZhdm9yaXRlOiBmYWxzZSwgYWxpZ246IFwib3Bwb3NpdGVcIiwgfSwgLy8gdnLDoWNlbsOtIHZyYXRreVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tYW5uZEJhciAtIHNwb2Ruw60gbGnFoXRhIHMgdGxhxI3DrXRreVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFt7IGFjdGlvbjogXCJhY3RHUHJpcGFkVnJhdGthU2F2ZVwiLCBwcmltYXJ5OiB0cnVlIH0sIFwiYWN0R1ByaXBhZFZyYXRrYVNhdmVDbG9zZVwiIC8qQ0xPU0UgYnV0dG9uKi9dLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0YXR1c0JhciAtIHN0YXZvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IFsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3aWRnZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpLmdjb2xvcnBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV6bzogdGhhdC5EdG9WcmF0a2Eud2ZsUHJvZmlsIS51em8gYXMgYW55LC8vdGhpcy5vcHRpb25zLmR0by51em8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0aGF0LkR0b1ZyYXRrYS5peHNfZnVuX2FrdCAhPSB0aGF0Lkl4c0Z1bixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAodXpvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkNvbG9ycGlja2VyU2VydmljZS5zZXRVem8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuRHRvVnJhdGthLml4cF92cmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV6bzogdXpvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRHRvVnJhdGthLndmbFByb2ZpbCEudXpvID0gdXpvIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNTZXBhcmF0b3IwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhckluZm9cIiwgdG9vbHRpcDogdGhhdC5XYXJuaW5nIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNTZXBhcmF0b3IxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclN0YXZQb3JpemVuaVwiLCB0b29sdGlwOiBcIlN0YXYgcG/FmcOtemVuw61cIiwgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1NlcGFyYXRvcjJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclN0YXZVaHJcIiwgdG9vbHRpcDogXCJTdGF2IMO6aHJhZHlcIiwgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1NlcGFyYXRvcjNcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdHVzQmFyU3RhdlN0b3Jub1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWQ6IFwic3RhdHVzU2VwYXJhdG9yNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTdGF2VGlza1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWQ6IFwic3RhdHVzU2VwYXJhdG9yNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTdGF2SW50RG9rXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBLUEkgLSBLZXkgUGVyZm9ybWFuY2UgSW5kaWNhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAga3Bpczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrcGlQb3NabWVuYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoYXQuRHRvVnJhdGthLmRhdF96bWVuYT8udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpUG9zWm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBcIlBvc2xlZG7DrSB6bcSbbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeVRleHQ6IHBhcnNlRGF0ZSh0aGF0LkR0b1ZyYXRrYS5kYXRfem1lbmEhKS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpTGFzdE1vZGlmaWVkRG9jdW1lbnRzVGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyFLUEkgUG9zbGVkbsOtIHptxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmtwaXMhLmtwaVBvc1ptZW5hLnNlY29uZGFyeVRleHQgPSBwYXJzZURhdGUodGhhdC5EdG9WcmF0a2EuZGF0X3ptZW5hISkudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQua3Bpcz8udXBkYXRlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRhYkdyb3VwcyAtIHNrdXBpbnkgesOhbG/FvmVrXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiR3JvdXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97IGlkOiBcImlkVGVzdE5vdmVUYWJHcm91cHlcIiwgY2FwdGlvbjogXCJUZXN0IG5vdsOpIFRhYiBHcm91cHlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBUYWJzIC0gesOhbG/Fvmt5IHphxZlhZGl0ZWxuw6kgZG8gdGFiR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoYXQuY3JlYXRlRm9ybUJhc2ljSW5mbyhlbCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJHVGFiQmFzaWNJbmZvXCIsIHRpdGxlOiBcIlrDoWtsYWRuw60gw7pkYWplXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpZGVQYW5lbHMgLSBwb2xvxb5reSBuYSBib8SNbsOtbSBwYW5lbHVcclxuICAgICAgICAgICAgICAgICAgICBzaWRlUGFuZWxzOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUvaGxhdmnEjWt5IGRva3VtZW50dVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlSGVhZGVyRm9ybSgpXHJcbiAgICAgICAgICogQHJldHVybnMgRm9ybXVsw6HFmSBobGF2acSNa3kgZG9rdW1lbnR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXJGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9EZWZpbmljZSBIZWFkZXIgRm9ybXUgKMO6ZGFqZSBvIHDFmcOtcGFkdSlcclxuICAgICAgICAgICAgbGV0IGhGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtSGxhdmlja2FEb2t1bWVudHVcIiwgfSlcclxuICAgICAgICAgICAgICAgIC8vU0VLQ0UgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJIbGF2acSNa2EgdnJhdGt5XCIpIC8vISBIbGF2acSNa2EgdnJhdGt5XHJcbiAgICAgICAgICAgICAgICAvLyBST1cgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuV2ZsLlByZWZhYnMuR0lkZW50aWZpa2F0b3JEb2t1bWVudHVTcGlzdSh7IGlzUGlkOiB0cnVlLCBmaWVsZE9wdDogeyBuYW1lOiBcIml4cFwiLCBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uaXhwISB9IH0sIHsgbGFiZWw6IFwiUElEIHDFmcOtcGFkdVwiIH0pKVxyXG4gICAgICAgICAgICAgICAgLy8gUk9XIDFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgZG9rdW1lbnR1XCIpIC8vVHlwIGRva3VtZW50dSBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5peHNfdHlwISwgLy90aGlzLkVkaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn0gKHtpeHNfdHlwfSlcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfdHlwPWl4c190eXA7a3RnX3R5cD1rdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiAxOTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLldmbC5QcmVmYWJzLkdJZGVudGlmaWthdG9yRG9rdW1lbnR1U3Bpc3UoeyBpc1BpZDogdHJ1ZSwgZmllbGRPcHQ6IHsgbmFtZTogXCJpeHBfdnJhXCIsIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5peHBfdnJhISB9IH0sIHsgbGFiZWw6IFwiUElEIHZyYXRreVwiIH0pKVxyXG4gICAgICAgICAgICAgICAgLy8gUk9XIDNcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOtc2xvIHZyYXRreVwiKSBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uYWMhLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFJPVyA0XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/FmWFkb3bDqSDEjcOtc2xvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcl9jaXNsb19waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucG9yX2Npc2xvX3BobCEsIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFJPVyA1ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwcmFjb3ZhdGVsXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uaXhzX2Z1bl9ha3QhLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX2FrdD12YWx1ZS5peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBaamlzdGl0IGNvIG3DoSBiw710IHDFmcOtamVtY2UgYSBwb3TDqSB6YWtvbXBvbm92YXRcclxuICAgICAgICAgICAgICAgIC8vIFJPVyA2XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZw61qZW1jZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5peHNfZXN1ISwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgem3Em27EmyBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb1ptZW5lU3ViamVrdHUoY3R4KTsgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwbyB6bcSbbsSbIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqZcWhdMSbIG5hc3RhdsOtbSBvc3RhdG7DrSBwb2zDrcSNa2Egc3BvamVuw6EgcyBwb3BsYXRuw61rZW0gKEVTVSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGN0eC52YWx1ZS5pY28pIHRoYXQuRHRvUHJpcGFkLkV4dGVybmlTdWJqZWt0IS5pY28gPSBjdHgudmFsdWUuaWNvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY3R4LnZhbHVlLmRpYykgdGhhdC5EdG9QcmlwYWQuRXh0ZXJuaVN1Ympla3QhLmRpYyA9IGN0eC52YWx1ZS5kaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChjdHgudmFsdWUucmMpIHRoYXQuRHRvUHJpcGFkLkV4dGVybmlTdWJqZWt0IS5yYyA9IGN0eC52YWx1ZS5yYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGN0eC52YWx1ZS5kYXRfbmFyKSB0aGF0LkR0b1ByaXBhZC5FeHRlcm5pU3ViamVrdCEuZGF0X25hciA9IGN0eC52YWx1ZS5kYXRfbmFyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3U7ZXN1X2RpYz1kaWM7bW9kZWwubGljPXZhbHVlLmxpYzttb2RlbC5wb3JfemFzdD12YWx1ZS5wb3JfemFzdFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSwgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gcHJlZmFidSAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoaXMuRHRvUHJpcGFkLml4cCA/PyBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSwgICAgICAgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogKHRoaXMuRHRvUHJpcGFkLmFjX2FnISA9PSBudWxsID8gdGhpcy5EdG9QcmlwYWQuaXhwISA6IHRoaXMuRHRvUHJpcGFkLmFjX2FnISksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiVsO9YsSbciBleHRlcm7DrWhvIHN1Ympla3R1IG5hIGRldGFpbHUgVnJhdGt5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GaWVsZHNUb0ZpbHRlcnBhbmVsOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5FU1VLYXJ0b3Rla2FGaWVsZFRvRmlsdGVyLlprcmF0a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gaEZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gaGxhdm7DrWhvIGZvcm11bMOhxZllIGRldGFpbHUgdnJhdGt5XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtQmFzaWNJbmZvKCkgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtQmFzaWNJbmZvKGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGtvbnRTcGx2em4gPSB0aGF0Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLlpwdXNvYnlVaHJhZHlTZXR0aW5ncy5Vc2VacFwiICsgdGhhdC5JeHBEZW4gKyB0aGF0LlR5cF9waGwpID8/IFwiMFwiO1xyXG4gICAgICAgICAgICB2YXIga29udFNwbHZ6bkFycmF5OiBudW1iZXJbXSA9IGtvbnRTcGx2em4gPyBrb250U3BsdnpuLnNwbGl0KCcsJykubWFwKChpdGVtOiBzdHJpbmcpID0+IHBhcnNlSW50KGl0ZW0udHJpbSgpLCAxMCkpIDogW107XHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW7Em27DrSBuZXBvdm9sZW7DvWNoIHpwxa9zb2LFryDDumhyYWR5ICgwLDQwLDYwLDcwKVxyXG4gICAgICAgICAgICBjb25zdCBkaXNhbGxvd2VkUGF5bWVudE1ldGhvZHMgPSBbMCwgNDAsIDYwLCA3MF07XHJcbiAgICAgICAgICAgIC8vIHZ5bG91xI1lbsOtIGFrdHXDoWxuw61obyB6cMWvc29idSDDumhyYWR5IHogZmlsdHJ1LCBhYnkgxaFlbCB6b2JyYXppdCBpIGtkecW+IG5lbsOtIHBvdm9sZW7DvVxyXG4gICAgICAgICAgICBpZiAodGhhdC5EdG9WcmF0a2EuenAgIT09IHVuZGVmaW5lZCAmJiB0aGF0LkR0b1ZyYXRrYS56cCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBkaXNhbGxvd2VkUGF5bWVudE1ldGhvZHMuaW5kZXhPZih0aGF0LkR0b1ZyYXRrYS56cCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FsbG93ZWRQYXltZW50TWV0aG9kcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtvbnRTcGx2em5BcnJheSA9IGtvbnRTcGx2em5BcnJheS5maWx0ZXIobWV0aG9kID0+ICFkaXNhbGxvd2VkUGF5bWVudE1ldGhvZHMuaW5jbHVkZXMobWV0aG9kKSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBtYWluRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiemFrbGFkbmlJbmZvRm9ybVwiLCB9KTsgLy9sYXlvdXREZXNjcmlwdG9yOiBcIkwyTTFTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCJcclxuICAgICAgICAgICAgbGV0IG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ6YWtsYWRuaUluZm9Gb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSkgLy96YWtsYWRuaUluZm9Gb3JtXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVnJhdGthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvO21vZGVsLmt0Z191cG9fdHh0PXZhbHVlLmt0Z191cG9fdHh0XCIsIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB7IGt0Z191cG86IDIwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5rdGdfdXBvISwgLy9cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHRoYXQubmFwbG5lbmlQb2xlKDIwMCwgMjIwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rdGdfdXBvOiBbMjAwLDIwNSwyMDYsMjA3LDIwOCwyMDksMjEwLDIxNSwyMTddLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9oZWxwZXJDb2x1bW5zOiBbXCJrdGdfdXBvXCIsIFwia3RnX3Vwb190eHRcIl1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7YnVfdmw6dHJpbTplbmNvZGV9IC8ge3NrX3ZsOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImJ1X3ZsXCIsIFwic2tfdmxcIiwgXCJuYXpldlwiLCBcInVlYV91Y1wiLCBcInVlYl91Y1wiLCBcIm1lbmFfdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNrX3ZsPXNrX3ZsOyBidV92bD1idV92bDsgcm9rPXJvazsgdWNzPXVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgcHJpc3R1cEtCVTogMSwgdXJvdmVuUHJpc3R1cHVLQlU6IDEsIHJlemltVnliZXJ1RGxlS25paHk6IDAsIHJvazogdGhhdC5yb2sgfSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2UG92aW5ub3N0U21sKGlucHV0LnZhbHVlPy5idV92bCEsIGlucHV0LnZhbHVlPy5za192bCEsIGlucHV0LnZhbHVlPy5wcml6X3NyISlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkTFr3ZvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5wb3puYW1rYSEsIC8vXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5wb3BpcyEsIC8vXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsOaaHJhZGFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSB2em5pa3UsIHNwbGF0bm9zdGlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIiwgLy9EYXR1bSB2em5pa3VcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uZGF0X3Z6bmlrdSEsIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXCIsIC8vRGF0dW0gdnpuaWt1XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmRhdF9zcGwhLCAvL1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwLiDDumhyYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHsgLy9acMWvc29iIHBsYXRieSwgcG91xb7DrXbDoSBzZSBrIHJvemxpxaFlbsOtIGphayBidWRlIHVocmF6ZW5hIG/EjWVrw6F2YW7DoSBwbGF0YmFcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuenA9dmFsdWUuenBcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3pwfS17enBfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB7IHpwOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by56cCEsIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzX3Z5ZGFqOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWx0ciBwb2RsZSBHVVBUWSBuYSB6cMWvc29ieSDDumhyYWR5IChKYXJvbcOtcm92YSBwZXZuw6EgbW5vxb5pbmEsIGFieSBtdSB0YW0gbsOhaG9kb3UgbsSba2RvIG7Em2NvIG5lcMWZaWRhbCB8IFpEUk9KIEJwbC5XZWJDbGllbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy96cDogWzEwLCAyMCwgMzAsIDMxLCAzMiwgNDEsIDQyLCA1MCwgNTEsIDUyLCA1MywgNTQsIDczLCA4MCwgODFdLCAvL29kZWJyYW7DqSBob2Rub3R5OiAwLCA0MCwgNjAsIDcwICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpwOiBrb250U3BsdnpuQXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy96cDogeyBvOiBcIiE9XCIsIHY6IFswLCA0MCwgNjAsIDcwXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdlBvdmlubm9zdEJ1Q2koZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCBwxZnDrWplbWNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBHb3JkaWMuRWtvLkNvbXBvbmVudHMuZWtvc3VjaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lkl4cCA/PyBcIlwiLCAvL1RPRE86ISEhISEhISEhISEhISEhIVxyXG4gICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogdGhhdC5EdG9QcmlwYWQuYWNfYWcgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRG90Y2VuZWhvU3ViamVrdHVcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV9jaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uYnVfY2khLCAvL2ZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXN0dXBub3N0IHBvbMOtxI1rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19lc3U9Pml4c19lc3U7YnVfY2k9YnVfY2k7c2tfY2k9c2tfY2lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtbmV2YWxpZG92YXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5bmVjaMOhIHZhbGlkYWNlIHByb3RpIERUT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2l4c19lc3U6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4c19lc3VcIiwgXCJpeHNfZXN1XCIsIGZhbHNlLCB0cnVlKSwgICAgICAgICAgICAgICAgICAgICAvLyB6w6F2aXNsb3N0IHpha29tZW50b3bDoW5hLCDFmWXFoWVubyB2IGNoYW5nZSBwb2zDrcSNa2EgaXhzX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVlMsIEtTLCBTU1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLCAvL1ZTIC0gVmFyaWFiaWxuw60vcMOhcm92YWPDrSBzeW1ib2wgLSBpZGVudGlmaWt1amUgYSByb3psacWhdWplIHDFmcOtY2hvesOtL29kY2hvesOtIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by52cyEsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODkqXCIsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IEludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG9UeXBlTGVuZ3Rocy52cyxcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAxMiB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIC8qR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nrb3MoKSwqLyB7IC8vIGdzZWxlY3Rib3hcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtzXCIsIC8vS1MgLSBLb25zdGF0bsOtIHN5bWJvbCAtIGlkZW50aWZpa3VqZSBhIHJvemxpxaF1amUgcMWZw61jaG96w60vb2RjaG96w60gcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmtzISxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0b1R5cGVMZW5ndGhzLmtzLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwua3M9dmFsdWUua3NcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIC8qR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Njc3MoKSwqLyB7IC8vIGdzZWxlY3Rib3hcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNzXCIsICAvL1NTIC0gU3BlY2lmaWNrw70gc3ltYm9sIC0gaWRlbnRpZmlrdWplIGEgcm96bGnFoXVqZSBwxZnDrWNob3rDrS9vZGNob3rDrSBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiBJbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvVHlwZUxlbmd0aHMuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3N0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5zcz12YWx1ZS5zc1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCLEjMOhc3RreVwiKSAvLyBUT0RPOiBwxZllam1lbm92YXQgP1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IC8vIFYgZGV0YWlsdSB2cmF0a3kgamUgdGXEjyBuw6F6ZXYgcG9sw63EjWthIFwiVsO9xaFlIHDFmWVkcGlzdVwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVsO9xaFlIHZyYXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiUHJvIHphZMOhbsOtIGFrdHXDoWxuw60gc2FsZGEocMWZZXBsYXRrdSkgc3Rpc2tuxJt0ZSBrbMOhdmVzdSA8Yj4qPC9iPiA8YnIvPiBQcm8gemFkw6Fuw60gY2Vsa292w6lobyBzYWxkYShwxZllcGxhdGt1KSBzdGlza27Em3RlIGtsw6F2ZXN5IDxiPkNUUkwgKyAqIDwvYj5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYVwiLCAvL1bDvcWhZSBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlBybyB6YWTDoW7DrSBha3R1w6FsbsOtIHNhbGRhKHDFmWVwbGF0a3UpIHN0aXNrbsSbdGUga2zDoXZlc3UgPGI+KjwvYj4gPGJyLz4gUHJvIHphZMOhbsOtIGNlbGtvdsOpaG8gc2FsZGEocMWZZXBsYXRrdSkgc3Rpc2tuxJt0ZSBrbMOhdmVzeSA8Yj5DVFJMICsgKiA8L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfbWVuYSEsIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5uYXN0YXZlbmlQcmVwb2N0dSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKFwiY19tZW5hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk3Em25hIHZyYXRreSwgTcSbbmEgcG/Fvi4sIEt1cnpcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZW5hXCIsIC8vTcSbbmFcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZW5hPXZhbHVlLm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ubWVuYSEsIC8vZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IHsgbWVuYTogMCwgbWVuYV9zaXNfYWFhOiAnQ1pLJywgbWVuYV96a3I6ICdDWksnLCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQubmFzdGF2ZW5pUHJlcG9jdHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoXCJtZW5hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJtZW5hX3BvelwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBpbnB1dC52YWx1ZSk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZQb3Zpbm5vc3RCdUNpKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBQcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFfcG96XCIsIC8vTcSbbmFcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZW5hX3Bvej12YWx1ZS5tZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLm1lbmFfcG96ISwgLy9mYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogeyBtZW5hOiAwLCBtZW5hX3Npc19hYWE6ICdDWksnLCBtZW5hX3prcjogJ0NaSycsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0Lm5hc3RhdmVuaVByZXBvY3R1KSB7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSkgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdXJ6XCIsIC8vS3VyelxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZTogXCJkZWNpbWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmt1cnohLCAvL3RydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5uYXN0YXZlbmlQcmVwb2N0dSkgeyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlBvcGlzQ2FzdGthXCIpID8/IFwixIzDoXN0a2EgdiBDWktcIixcclxuICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlBybyB6YWTDoW7DrSBha3R1w6FsbsOtIHNhbGRhKHDFmWVwbGF0a3UpIHN0aXNrbsSbdGUga2zDoXZlc3UgPGI+KjwvYj4gPGJyLz4gUHJvIHphZMOhbsOtIGNlbGtvdsOpaG8gc2FsZGEocMWZZXBsYXRrdSkgc3Rpc2tuxJt0ZSBrbMOhdmVzeSA8Yj5DVFJMICsgKiA8L2I+XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsIC8vxIzDoXN0a2EgdiBDWktcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uYyEsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQcm8gemFkw6Fuw60gYWt0dcOhbG7DrSBzYWxkYShwxZllcGxhdGt1KSBzdGlza27Em3RlIGtsw6F2ZXN1IDxiPio8L2I+IDxici8+IFBybyB6YWTDoW7DrSBjZWxrb3bDqWhvIHNhbGRhKHDFmWVwbGF0a3UpIHN0aXNrbsSbdGUga2zDoXZlc3kgPGI+Q1RSTCArICogPC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQubmFzdGF2ZW5pUHJlcG9jdHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlayhcImNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlDFmWVkcGlzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU21sb3V2YVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvVnliZXJTbWxvdXZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dER0bzogeyByb2tTbWw6IHRoYXQuZ3BjLnJvaywgY2FuTmV3QW5kUmVmdW5kOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICBlc3VMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuRHRvUHJpcGFkLml4cCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IHRoYXQuRHRvUHJpcGFkLmFjX2FnID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlEb3RjZW5laG9TdWJqZWt0dSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlbDvWLEm3IgcG9sb8W+a3kgU21sb3V2eSBrIHZyYXRjZSBwxZlpcGFkdSBERFBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGluaXQ6IGZ1bmN0aW9uIChpbnB1dER0bywgZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3UgPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21sb3V2YSA9IHRoYXQuZmluZEZpZWxkcyhcIml4cF9zbWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3UgIT09IG51bGwpIGZpbHRlci5peHNfZXN1ID0gZXN1Lml4c19lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbWxvdXZhICE9PSBudWxsKSBmaWx0ZXIuaXhwX3NtbF9wcmkgPSBzbWxvdXZhLml4cF9zbWxfcHJpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc21sdXZuaV9wcmlwYWR5LnB1c2goR29yZGljLkVrby5HVnliZXJTbWxvdXZ5UHJpcGFkeUVudW0uU2VTY2h2YWxlbm91UG9sb3prb3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLml4cF9zbWwhLCAvL1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9zbWw9dmFsdWUuaXhwX3NtbF9wcmlcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvX3ByZVwiLCAvL1R5cCBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvX3ByZT12YWx1ZS5rdGdfdXBvO21vZGVsLmt0Z191cG9fcHJlX3R4dD12YWx1ZS5rdGdfdXBvX3R4dFwiLCAvLyxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99LXtrdGdfdXBvX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsga3RnX3VwbzogMTAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiB0aGF0Lm5hcGxuZW5pUG9sZSgxMDAsIDE5OSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ua3RnX3Vwb19wcmUhLCAvL1xyXG4gICAgICAgICAgICAgICAgfSkgLy8gQlVDRFBFUC5rdGdfdXBvIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZWRwaXNUYWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWmFsb8W+aXQgcyB2cmF0a291IGkgcMWZZWRwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucHJlZHBpc1Rha3khLCAvL1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogZmFsc2UsIC8vID8/Pz8/XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGRhdGEpID0+IHsgdGhhdC5uYXN0YXZLdGdVcG9QcmUoZGF0YS52YWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIGVsLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5mb3JtQmFzaWNJbmZvID0gJC5uZXdEaXYoKSAvLyQoXCI8ZGl2PlwiKSAgXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgbWFpbkZvcm0pO1xyXG4gICAgICAgICAgICAvL3ZhciBkZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG1haW5Gb3JtKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gbWFpbkZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcdFx0RHRvVnJhdGthXHRVbmNhdWdodCBSZWZlcmVuY2VFcnJvcjogRHRvVnJhdGthIGlzIG5vdCBkZWZpbmVkXHRcclxuXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYcSNdGVuw60gZGF0IGRvIGZvcm11bMOhxZllXHJcbiAgICAgICAgICogQG1ldGhvZCBuYWN0aURhdGEoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSBQb2t1ZCBuYcSNdGUgZGF0YSwgdGFrIG5hcGxuw60gZm9ybXVsw6HFmWUgZGF0eSBhIHZ5cG5lIG5hxI3DrXTDoW7DrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFjdGlEYXRhKCk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKTtcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50Lmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVWtvbsSNZW7DrSBuYcSNw610w6Fuw60gYnnFpSBqZcWhdMSbIMSNZWvDoW0gbmEgZGFsxaHDrSBkYXRhLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX3R5cFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhzX3R5cDogdGhhdC5EdG9WcmF0a2Eud2ZsUHJvZmlsPy5peHNfdHlwIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTsgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl9ha3RcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGl4c19mdW5fYWt0OiB0aGF0LkR0b1ByaXBhZC5peHNfZnVuX2FrdCB9LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0LkR0b1ZyYXRrYSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LkVkaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LlZyYXRrYVpQbGF0YnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlTdWJqZWt0KCk7IC8vIHBva3VkIGpkZSBvIG5vdm91IHZyYXRrdSBrdGVyw6EgbmVuw60geiBwbGF0YnkgKG1vxb5uw6EgZG9wbG7DrW1lKSBwcm92ZWRlIHNlIG5hxI10ZW7DrSBiLsO6xI10dSB6IHBvcGxhdG7DrWthLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQuUmVjVnJhdGthLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcmVwb2N0dSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5SZWNWcmF0a2EuYywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByZXBvY3R1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoaXMuUmVjVnJhdGthLmMsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcmVwb2N0dSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVIG5vdsOpIHZyYXRreSBsb2vDoWxuw60gcGFyYW1ldHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudXNlclNldHRpbmdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGxfa3RnX3VwbyA9IGdmX05hY3RpTG9rYWxuaVBhcmFtZXRyTigndnJhdGthX2t0Z191cG8nLCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdnJhdGthID0gdGhhdC51c2VyU2V0dGluZ3MuZ2V0KFwiR1ZyYXRrYUt0Z1Vwb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogZm9ybS5maW5kRmllbGRzKFwia3RnX3Vwb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsga3RnX3VwbzogdnJhdGthIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTsgLy9UT09EOiBuZW5hxI3DrXTDoSBzZS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYnVfY2lcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IGl4c19lc3U6IHRoYXQuRHRvVnJhdGthLml4c19lc3UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lbGVtZW50Lmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwic3NcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHNzOiB0aGlzLlJlY1ZyYXRrYS5jIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYnVfdmxcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGJ1X3ZsOiB0aGF0LkR0b1ZyYXRrYS5idV92bCwgc2tfdmw6IHRoYXQuRHRvVnJhdGthLnNrX3ZsIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYnVfY2lcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGJ1X2NpOiB0aGF0LkR0b1ZyYXRrYS5idV9jaSwgc2tfY2k6IHRoYXQuRHRvVnJhdGthLnNrX2NpIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbF9rdXJ6ID0gdGhhdC5zZXRLdXJ6TWVueSh0aGF0LkR0b1ZyYXRrYS5tZW5hISk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5hc3RhdlBvdmlubm9zdEJ1Q2kodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZLdGdVcG9QcmUodGhhdC5EdG9WcmF0a2Eua3RnX3Vwb19wcmUgIT0gbnVsbClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2xlZG92w6Fuw60gem3Em24gdmUgZm9ybXVsw6HFmcOtY2ggKGRva3VtZW50KSBwcm8gcG92b2xlbsOtIHVsb8W+ZW7DrSwgcG9rdWQgc2UgamVkbsOhIG8gbmVlZGl0b3ZhdGVsbsO9IHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBlZGl0YWNlID0gdGhhdC5qZURva2xhZEVkaXRvdmF0ZWxueSgpICYmICF0aGF0LnJlemltQ3Rlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFlZGl0YWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZWxlbWVudC5vbihcImZpZWxkY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zdCBmb3JtQ2hhbmdlZCA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFNhdmUhLnVwZGF0ZVBlcm1pc3Npb24oKGZvcm1DaGFuZ2VkIHx8IGVkaXRhY2UgPyB7IHZhbHVlOiB0cnVlIH0gOiAodGhhdC5tb2RlbC5QZXJtaXNzaW9ucyA/IHRoYXQubW9kZWwuUGVybWlzc2lvbnMuTHplRXZpZG92YXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIEZPQ1VTIG5hIHBydm7DrSBlZGl0b3ZhdGVsbsOpIHBvbMOtxI1rbyB2IHRhYnUgWsOha2xhZG7DrSDDumRhamVcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZChcIi5nZmllbGQ6bm90KC51aS1zdGF0ZS1kaXNhYmxlZClcIikuZmlyc3QoKS5nZmllbGQoXCJmb2N1c1wiKVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9ICAgICAgIFxyXG5cclxuICAgICAgICB0ZXN0TmFzdGF2ZW5pUG9saWNlaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwicG96bmFta2FcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCJUZXN0IHVsb8W+ZW7DrSB2cmF0a3kgdmUgV0tcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCJUZXh0IHBvcGlzdVwiKTtcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX21lbmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMTApKTsgXHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwibWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IG1lbmE6IDI3MCB9KTsgXHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwienBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyB6cDogMjAgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImJ1X2NpXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBidV9jaTogXCJQTDEyMTA1MDEyNTYxMDAwMDAyMjY0MDU1NzYxXCIsIHNrX2NpOiBcIklOR0JcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmHEjXRlbsOtIGV4dGVybsOtaG8gc3ViamVrdHUgeiBwxZnDrXBhZHUgZG8gcG9sw63EjWVrIGJhbmtvdm7DrWNoIMO6xI10xa9cclxuICAgICAgICAgKiBAbWV0aG9kIG5hY3RpU3ViamVrdCgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aVN1Ympla3QoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBpeHNFc3UgPSB0aGF0LkR0b1ZyYXRrYS5peHNfZXN1O1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpXHJcbiAgICAgICAgICAgIC8vIE/FoWV0xZllbsOtIGNpesOtaG8gYmFua292bsOtIMO6xI10dVxyXG4gICAgICAgICAgICBjb25zdCBidWNpRmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJidV9jaVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBjaXrDqWhvIGJhbmtvdm7DrWhvIMO6xI10dVxyXG4gICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IGl4c19lc3U6IGl4c0VzdSB9KTtcclxuICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcImdldFNlcnZlckZpbHRlcnNcIikudGhlbigoc2YpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBha3R1w6FsbsOtY2ggc2VydmVyb3bDvWNoIGZpbHRyxa8gKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuRWtvc3VjaSgpLmdldERhdGEoc2YpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBob2Rub3QgcG9sw63EjWthIHMgYWt0dcOhbG7DrW1pIHNlcnZlcm92w71taSBmaWx0cnlcclxuICAgICAgICAgICAgfSkudGhlbigoYnVjaSkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG8gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVjaS5sZW5ndGggPiAwKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSBqZWRuYSB2csOhY2Vuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGJ1Y2lbMF0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTsgICAgICAgLy8gZG9wbG7DrW0gasOtIGRvIHBvbMOtxI1rYSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3R1amUgdsOtY2UgbmVibyDFvsOhZG7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcImNsZWFyXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFrIMO6xI1ldCB2eW1hxb51XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImJ1X3ZsXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBidV92bDogdGhhdC5EdG9WcmF0a2EuYnVfdmwsIHNrX3ZsOiB0aGF0LkR0b1ZyYXRrYS5za192bCB9LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2UG92aW5ub3N0QnVDaSh0cnVlKTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZQb3Zpbm5vc3RTbWwodGhhdC5EdG9WcmF0a2EuYnVfdmwhLCB0aGF0LkR0b1ZyYXRrYS5za192bCEpOyAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwxZnDrXN0dXBub3N0aSAoZWRpdGFjZSkgcG9sw63EjWVrIGEgdGxhxI3DrXRlayBkb2t1bWVudHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RlbmlQcmlzdHVwdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBlZGl0ID0gdGhhdC5FZGl0OyAgLy8gTG9naWNrw6EgcHJvbcSbbm7DoSB1csSNdWrDrWPDrSB6ZGEgamUgZGV0YWlsIG90ZXbFmWVuw70gdiByZcW+aW11IGVkaXRhY2UvxI10ZW7DrSAobmVibyBqYWtvIG5vdsO9IGRva3VtZW50KSAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBBS0NFIFJFQUxJWk9WQVQgVlJBVEtVXHJcbiAgICAgICAgICAgIHRoYXQucGVybXNEdG8uYWN0UmVhbGl6b3ZhdCA9XHJcbiAgICAgICAgICAgICAgICAodGhhdC5QYXJhbXMuZGRwX3ZyYV96amVkbm8gPT09IDEgfHwgKHRoYXQuUGFyYW1zLmRkcF9yYWRfdnJhcmVhICE9PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoYXQuUGFyYW1zLmRkcF9yYWRfdnJhcmVhICE9PSAyIHx8IHRoYXQuRHRvVnJhdGthLml4c19mdW5fYWt0ID09PSB0aGF0Lkl4c0Z1bikpKSAmJlxyXG4gICAgICAgICAgICAgICAgdGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT09IDIwO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBBS0NFIFZSQVRJVCBWUkFUS1VcclxuICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5hY3RWcmF0aXQgPVxyXG4gICAgICAgICAgICAgICAgdGhhdC5QYXJhbXMuZGRwX3JhZF92cmFyZWEgIT09IDAgJiZcclxuICAgICAgICAgICAgICAgICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXJlYSAhPT0gMiB8fCB0aGF0LkR0b1ZyYXRrYS5peHNfZnVuX2FrdCA9PT0gdGhhdC5JeHNGdW4pICYmXHJcbiAgICAgICAgICAgICAgICB0aGF0LkR0b1ZyYXRrYS5zdGF2X3BvciA9PT0gMjA7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEFLQ0UgU0NIVsOBTElUIFZSQVRLVVxyXG4gICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmFjdFNjaHZhbGl0ID1cclxuICAgICAgICAgICAgICAgICh0aGF0LlBhcmFtcy5kZHBfdnJhX3pqZWRubyA9PT0gMSB8fCAodGhhdC5QYXJhbXMuZGRwX3JhZF92cmFyZWEgIT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAodGhhdC5QYXJhbXMuZGRwX3JhZF92cmFyZWEgIT09IDIgfHwgdGhhdC5EdG9WcmF0a2EuaXhzX2Z1bl9ha3QgPT09IHRoYXQuSXhzRnVuKSkpICYmXHJcbiAgICAgICAgICAgICAgICAodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT09IDAgfHwgdGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT09IDEwKSAmJlxyXG4gICAgICAgICAgICAgICAgdGhhdC5EdG9WcmF0a2EuenAgIT09IDA7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEFLQ0UgU1RPUk5PIFZSQVRLWVxyXG4gICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmFjdFN0b3JubyA9XHJcbiAgICAgICAgICAgICAgICAodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT09IDAgfHwgdGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT09IDEwIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yID09PSAzMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbMjMsIDAsIDUsIDIwXS5pbmNsdWRlcyh0aGF0LkR0b1ZyYXRrYS5zX3VocnAhKSkpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBBS0NFIE5PVkEgVlJBVEtBXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXRrYSAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuRHRvVnJhdGthLml4c19mdW5fYWt0ID09PSB0aGF0Lkl4c0Z1bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGVybXNEdG8uYWN0UG9kYW5pID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmFjdFBvZGFuaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmFjdFBvZGFuaSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gQUtDRSBPQk5PVklUIFZSQVRLVVxyXG4gICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmFjdE9ibm92aXQgPSB0aGF0LkR0b1ZyYXRrYS5zdGF2X3BvciA9PT0gNDA7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5idV92bCA9IHRoYXQuUGFyYW1zLmRkcF9yYWRfY2hidmx2ICE9PSAxID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LnBlcm1zRHRvLml4cF9zbWwgPSB0aGF0LlBhcmFtcy5kZHBfc21sX3ZhemJhID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy9wb2t1ZCBzZSBqZWRuw6EgbyB2csOhY2Vuw60gcGxhdGVibsOtIGJyw6FueSwgbmVidWRlIGVkaXRvdmF0ZWxuw70genDFr3NvYiDDumhyYWR5IGEgxI3DoXN0a2FcclxuICAgICAgICAgICAgaWYgKCFlZGl0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5SZWNWcmF0a2E/LnpwID09IDczICYmIHRoYXQuUmVjVnJhdGthLml4cF9wb2s/Lmxlbmd0aCA9PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGVybXNEdG8uenAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmNfbWVuYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGVybXNEdG8uYnVfY2kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtc0R0by56cCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5jID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLmNfbWVuYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5idV9jaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEtvbnRyb2x5RlUgLSBwxZlpIGluaXR1Li4uXHJcbiAgICAgICAgICAgIC8vbGV0IGxfc3Rhdl92eXJpeiA9IC0xO1xyXG4gICAgICAgICAgICAvL2lmICh0aGlzLmpzb3VBa3Rpdm5pS29udHJvbHlGVSgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuY2FsbChcIlN0YXZGaW5hbmNuaUtvbnRyb2x5RlVcIiwgeyBpcF9peHA6IHRoYXQuRHRvVnJhdGthLml4cF92cmEhIH0pICAgICAvLyB2b2zDoW7DrSBzZXJ2cm92w6kgbG9naWt5IHBybyBuYcSNdGVuw60gcMWZw616bmFrdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsX3N0YXZfdnlyaXogPSBkYXRhLnN0YXZGVTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgamV2eXRpc3Rlbnlkb2tsYWQgPSBkYXRhLnZ5dGlzdGVuRG9rbGFkRks7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGxfc3Rhdl92eXJpeiA9PSAtMSB8fCAobF9zdGF2X3Z5cml6ID09IDAgJiYgIWpldnl0aXN0ZW55ZG9rbGFkIHx8IGxfc3Rhdl92eXJpeiA9PSAyMCkgJiYgKHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yID09IDAgfHwgdGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT0gMTApKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIEdNX0VESVRcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBHTV9Ob0VESVRcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQuTHplVXByYXZvdmF0KSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQucGVybXNEdG8ubHplRWRpdG92YXQgPSAvLyBVcHJhdm92YXQgbHplIHBvdXplIHZyYXRreSB2ZSBzdGF2dSB2csOhY2VubyBuZWJvIHBvxZnDrXplbm8hXHJcbiAgICAgICAgICAgIC8vICAgICAgICAodGhhdC5QYXJhbXMuZGRwX3JhZF92cmF0a2EgPT09IDEgfHwgdGhhdC5EdG9WcmF0a2EuaXhzX2Z1bl9ha3QgIT09IHRoYXQuSXhzRnVuKSAmJlxyXG4gICAgICAgICAgICAvLyAgICAgICAgKCh0aGF0LkR0b1ZyYXRrYS5zdGF2X3BvciA9PT0gMCB8fCB0aGF0LkR0b1ZyYXRrYS5zdGF2X3BvciA9PT0gMTApIHx8XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgKHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yID09PSAzMCAmJiBbMCwgNSwgMjAsIDIzXS5pbmNsdWRlcyh0aGF0LkR0b1ZyYXRrYS5zX3VocnAhKSkpO1xyXG4gICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQucGVybXNEdG8ubHplRWRpdG92YXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIHRoYXQucGVybXNEdG8ubHplRWRpdG92YXQgPSB0aGF0Lkx6ZVVwcmF2b3ZhdCAmJlxyXG4gICAgICAgICAgICAgICAgKHRoYXQuUGFyYW1zLmRkcF9yYWRfdnJhdGthID09PSAxIHx8ICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXRrYSA9PT0gMiAmJiB0aGF0LkR0b1ZyYXRrYS5peHNfZnVuX2FrdCA9PSB0aGF0Lkl4c0Z1bikpICYmXHJcbiAgICAgICAgICAgICAgICAoKHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yID09PSAwIHx8IHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yID09PSAxMCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT09IDMwICYmIFswLCA1LCAyMCwgMjNdLmluY2x1ZGVzKHRoYXQuRHRvVnJhdGthLnNfdWhycCEpKSk7XHJcbiAgICAgICAgICAgIC8vdGhhdC5HbUVkaXQodGhhdC5wZXJtc0R0bywgc2hvdWxkRW5hYmxlKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pUHJpdHVwdSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwxZnDrXN0dXBub3N0aSAoZWRpdGFjZSkgcG9sw63EjWVrIGEgdGxhxI3DrXRlayBkb2t1bWVudHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVByaXR1cHUoKTogdm9pZCAvKkpRdWVyeVByb21pc2UqLyB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtSGVhZCA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybVpha2wgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdCA9IHRoYXQuYWN0aW9ucztcclxuICAgICAgICAgICAgLy92YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIGRlZmF1bHRuxJsgbmFzdGF2ZW7DvSBkZXRhaWwgcHJvIHZyYXRrdShIbGF2acSNa2EgYSBrdXJ6IGRpc2FibGUsIHpieXRlayBlbmFibGUpXHJcblxyXG4gICAgICAgICAgICBmb3JtSGVhZC5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5peHAhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1IZWFkLmZpbmRGaWVsZHMoXCJpeHNfdHlwXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5peHNfdHlwISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtSGVhZC5maW5kRmllbGRzKFwiaXhwX3ZyYVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8uaXhwX3ZyYSEgfHwgIXRoYXQucGVybXNEdG8ubHplRWRpdG92YXQpKTtcclxuICAgICAgICAgICAgZm9ybUhlYWQuZmluZEZpZWxkcyhcImFjXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5hYyEgfHwgIXRoYXQucGVybXNEdG8ubHplRWRpdG92YXQpKTtcclxuICAgICAgICAgICAgZm9ybUhlYWQuZmluZEZpZWxkcyhcInBvcl9jaXNsb19waGxcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLnBvcl9jaXNsb19waGwhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1IZWFkLmZpbmRGaWVsZHMoXCJpeHNfZnVuX2FrdFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8uaXhzX2Z1bl9ha3QhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1IZWFkLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5peHNfZXN1ISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5jX21lbmEhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJtZW5hXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5tZW5hISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwibWVuYV9wb3pcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLm1lbmFfcG96ISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwia3VyelwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8ua3VyeiEgfHwgIXRoYXQucGVybXNEdG8ubHplRWRpdG92YXQpKTtcclxuICAgICAgICAgICAgZm9ybVpha2wuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLmMhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5rdGdfdXBvISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwicG96bmFta2FcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLnBvem5hbWthISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLnBvcGlzISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwiZGF0X3Z6bmlrdVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8uZGF0X3Z6bmlrdSEgfHwgIXRoYXQucGVybXNEdG8ubHplRWRpdG92YXQpKTtcclxuICAgICAgICAgICAgZm9ybVpha2wuZmluZEZpZWxkcyhcImRhdF9zcGxcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLmRhdF9zcGwhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJ6cFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8uenAhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJidV9jaVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8uYnVfY2khIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJrc1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8ua3MhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJ2c1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8udnMhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJzc1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAoIXRoYXQucGVybXNEdG8uc3MhIHx8ICF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSk7XHJcbiAgICAgICAgICAgIGZvcm1aYWtsLmZpbmRGaWVsZHMoXCJpeHBfc21sXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICghdGhhdC5wZXJtc0R0by5peHBfc21sISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwiYnVfdmxcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLmJ1X3ZsISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwia3RnX3Vwb19wcmVcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLmt0Z191cG9fcHJlISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG4gICAgICAgICAgICBmb3JtWmFrbC5maW5kRmllbGRzKFwicHJlZHBpc1Rha3lcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKCF0aGF0LnBlcm1zRHRvLnByZWRwaXNUYWt5ISB8fCAhdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCkpO1xyXG5cclxuICAgICAgICAgICAgYWN0LmFjdEdQcmlwYWRWcmF0a2FTYXZlPy5lbmFibGVkKHRoYXQucGVybXNEdG8uc2F2ZSEgJiYgdGhhdC5wZXJtc0R0by5semVFZGl0b3ZhdCEpO1xyXG4gICAgICAgICAgICBhY3QuYWN0R1ByaXBhZFZyYXRrYVNhdmVDbG9zZT8uZW5hYmxlZCh0aGF0LnBlcm1zRHRvLnNhdmUhICYmIHRoYXQucGVybXNEdG8ubHplRWRpdG92YXQhKTtcclxuICAgICAgICAgICAgYWN0LmFjdEdQcmlwYWRWcmF0a2FQb2Rhbmk/LmVuYWJsZWQodGhhdC5wZXJtc0R0by5hY3RQb2RhbmkhKTtcclxuICAgICAgICAgICAgYWN0LmFjdEdQcmlwYWREZXRhaWw/LmVuYWJsZWQodGhhdC5wZXJtc0R0by5hY3RQcmlwYWQhKTtcclxuICAgICAgICAgICAgYWN0LmFjdEdQcmlwYWRWcmF0a2FPYm5vdml0Py5lbmFibGVkKHRoYXQucGVybXNEdG8uYWN0T2Jub3ZpdCEpO1xyXG4gICAgICAgICAgICBhY3QuYWN0R1ByaXBhZFZyYXRrYVN0b3Jubz8uZW5hYmxlZCh0aGF0LnBlcm1zRHRvLmFjdFN0b3JubyEpO1xyXG4gICAgICAgICAgICBhY3QuYWN0R1ByaXBhZFZyYXRrYVZyYXRpdD8uZW5hYmxlZCh0aGF0LnBlcm1zRHRvLmFjdFZyYXRpdCEpO1xyXG4gICAgICAgICAgICBhY3QuYWN0R1ByaXBhZFZyYXRrYVNjaHZhbGl0Py5lbmFibGVkKHRoYXQucGVybXNEdG8uYWN0U2NodmFsaXQhKTtcclxuICAgICAgICAgICAgYWN0LmFjdEdQcmlwYWRWcmF0a2FSZWFsaXpvdmF0Py5lbmFibGVkKHRoYXQucGVybXNEdG8uYWN0UmVhbGl6b3ZhdCEpO1xyXG4gICAgICAgICAgICBhY3QuYWN0R1ByaXBhZFZyYXRrYVRpc2s/LmVuYWJsZWQodGhhdC5wZXJtc0R0by5hY3RUaXNrISk7XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQucGVybXNEdG8uYWN0TmF2YXpTTUw7XHJcbiAgICAgICAgICAgIC8vdGhhdC5wZXJtc0R0by5hY3RPZHZhelNNTDtcclxuICAgICAgICAgICAgLy90aGF0LnBlcm1zRHRvLmFjdEZ1S29udHJvbGE7XHJcbiAgICAgICAgICAgIC8vdGhhdC5wZXJtc0R0by5hY3RVcHJEYXRWem5pa3U7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYcSNdGVuw60gU2F6ZWIgRFBIIGEga3VyesWvIG3Em25cclxuICAgICAgICAgKiBAbWV0aG9kIGxvYWREYXRhKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gTmHEjXRlIGRhdGEgYSBuYXN0YXbDrSBqZSBkbyBwxZlpcHJhdmVuw71jaCBEVE8gb2JqZWt0xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRTYXpiYUFuZEt1cnooKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBOYXBsbsSbbsOtIERUTyBvYmpla3R1IHBybyBzYXpieSBEUEhcclxuICAgICAgICAgICAgdmFyIERQSCA9IHRoYXQuaXNsLlByZWRwaXN5LnZyYXREUEgoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICBEUEguZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zYXpieURQSCA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkZWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gTmFwbG7Em27DrSBEVE8gb2JqZWt0dSBwcm8ga3VyenkgbcSbblxyXG4gICAgICAgICAgICB2YXIgS3VyenkgPSB0aGF0LmlzbC5QcmVkcGlzeS52cmF0S3Vyek1lbnkoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICBLdXJ6eS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmt1cnp5TWVueUR0byA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkZWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEga29udHJvbHVqw61jw60gemRhIGpzb3UgYWt0aXZuw60ga29udHJvbHUgRlVcclxuICAgICAgICAgKiBAcmV0dXJucyBUUlVFIHBva3VkIGpzb3Uga29udHJvbHkgYWt0aXZuw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGpzb3VBa3Rpdm5pS29udHJvbHlGVSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhhdC5QYXJhbXMuZWtvX3JhZF9kZmtlbiEgPj0gMSB8fCB0aGF0LlBhcmFtcy5la29fcmFkX2R1a2VuISA+PSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEZ1bmtjZSBwcm8gbmFzdGF2ZW7DrSB2xaFlY2ggdmxhc3Rub3N0w60gbmEgdHJ1ZSBuZWJvIGZhbHNlXHJcbiAgICAgICAgLy8gKiBAbWV0aG9kIEdtRWRpdCgpXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgR21FZGl0KGR0bzogR1ByaXBhZFByZWRwaXNQZXJtc0R0bywgdmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAvLyAgICBPYmplY3Qua2V5cyhkdG8pLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAvLyAgICAgICAgKGR0byBhcyBhbnkpW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvLyAgICByZXR1cm4gZHRvO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgbmFzdGF2dWrDrWPDrSBrbMOhdmVzb3bDqSB6a3JhdGt5XHJcbiAgICAgICAgICogQG1ldGhvZCBuYXN0YXZlbmlLbGF2WmtyYXRlaygpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZlbmlLbGF2WmtyYXRlaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNcIikuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCIqXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuRmllbGQsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmlwYWRWcmF0a2FOYXN0YXZlbmlTYWxkYUFrdHVhbG5pXCJdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiQ1RSTCsqXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuRmllbGQsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmlwYWRWcmF0a2FOYXN0YXZlbmlTYWxkYUNlbGtlbVwiXSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBGdW5rY2UgcHJvIG5hc3RhdmVuw60gemtyYXRlayBkbyBHREFURUJPWCBwb2zDrcSNZWtcclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5zZXREYXRlQm94U2hvcnRjdXRzKHRoYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIG5hc3RhdnVqw61jw60gc3RhdHVzQmFyXHJcbiAgICAgICAgICogQG1ldGhvZCBzZXRTdGF0dXMoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0U3RhdHVzKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhhdC5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTdGF2UG9yaXplbmlcIl0hLCBcIlBvxZnDrXplbm9cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZQb3JpemVuaVwiXSEsIFwiVnLDoWNlbm9cIiwgXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbXBvcnRhbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZQb3JpemVuaVwiXSEsIFwiU2NodsOhbGVub1wiLCBcImctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZQb3JpemVuaVwiXSEsIFwiUmVhbGl6b3bDoW5vXCIsIFwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgNDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlBvcml6ZW5pXCJdISwgXCJacnXFoWVub1wiLCBcImctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlBvcml6ZW5pXCJdISwgXCJOZXVyxI1lbm9cIiwgXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGF0LkR0b1ZyYXRrYS5zX3VocnApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhhdC5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTdGF2VWhyXCJdISwgXCJTdG9ybm9cIiwgXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlVoclwiXSEsIFwiRMOhbm8gayDDumhyYWTEm1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMjU6IHtcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlVoclwiXSEsIFwiT2Rlc2zDoW4gcMWZw61rYXpcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIDYwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZVaHJcIl0hLCBcIlphcGxhY2Vub1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMjM6IHtcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlVoclwiXSEsIFwiVnLDoWNlbm8geiBiYW5reVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgNToge1xyXG4gICAgICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhhdC5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTdGF2VWhyXCJdISwgXCJTdG9ybm8gdnJhdGtvdVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMjI6IHtcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlVoclwiXSEsIFwiUG96YXN0YXZlbm8gdHJ2YWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAyMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhhdC5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTdGF2VWhyXCJdISwgXCJQb3phc3RhdmVub1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMjc6IHtcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlVoclwiXSEsIFwiUMOhcm92w6FubyDEjcOhc3RlxI1uxJtcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZVaHJcIl0hLCBcIlDDoXJvdsOhbm9cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZVaHJcIl0hLCBcIk5lem7DoW3DvSBzdGF2XCIsIFwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICBcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZllcG/EjWV0IMSNw6FzdGVrIHDFmWkgem3Em27EmyBtxJtueSwga3VyenUgbmVibyDEjcOhc3RreVxyXG4gICAgICAgICAqIEBtZXRob2QgcHJlcG9jZXRDYXN0ZWsoKVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB6bWVuZW5lUG9sZSAtIE7DoXpldiB6bcSbbsSbbsOpaG8gcG9sZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJlcG9jZXRDYXN0ZWsoem1lbmVuZVBvbGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJ6YWtsYWRuaUluZm9Gb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbF9jX21lbmEgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX21lbmFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBjb2xfbWVuYSA9IGZvcm0uZmluZEZpZWxkcyhcIm1lbmFcIikuZ2ZpZWxkPGFueT4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xfbWVuYSAhPSBudWxsKSB0aGF0Lm1lbmEgPSBjb2xfbWVuYTsgLy96IG7Em2pha8OpaG8gZMWvdm9kdSBzZSBcImNcIiBtxJtuw60gdMWZaWtyw6F0IHBvIHNvYsSbIGEgbmVkb2vDocW+ZXIgdG8gbmFqw610IHBvbGUgXCJtZW5hXCIsIHBvdXplIHDFmWkgcHJ2bsOtbSB0YWsgc2kgdWxvxb7DrW0gYSB2bG/FvsOtbSBydcSNbsSbXHJcbiAgICAgICAgICAgIGlmIChjb2xfbWVuYSA9PSBudWxsICYmIHptZW5lbmVQb2xlICE9IFwibWVuYVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xfbWVuYSA9IHRoYXQubWVuYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY29sX2t1cnogPSBmb3JtLmZpbmRGaWVsZHMoXCJrdXJ6XCIpLmdmaWVsZDxhbnk+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBjb2xfYyA9IGZvcm0uZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgbnVtOiBEZWNpbWFsO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxfa3VyeiA9IHRoYXQuc2V0S3Vyek1lbnkoY29sX21lbmEubWVuYSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoem1lbmVuZVBvbGUgPT0gXCJtZW5hXCIgfHwgem1lbmVuZVBvbGUgPT0gXCJjX21lbmFcIikgeyBudW0gPSBjb2xfY19tZW5hIH0gZWxzZSB7IG51bSA9IGNvbF9jIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pUHJlcG9jdHUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoY29sX21lbmEubWVuYSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL3Bva3VkIG5lbcOhbSBrdXJ6IChqaW5vdSBtxJtudSkgamVuIHNlIHBvamlzdMOtbSBhYnkgY2FzdGt5IGJ5bHkgesOhcG9ybsOpXHJcbiAgICAgICAgICAgICAgICBsZXQgemFwOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoLTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bS5ncmVhdGVyVGhhbigwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IG51bS5tdWwoemFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudW0pO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHphcDogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKC0xKTtcclxuICAgICAgICAgICAgICAgIGlmIChudW0uZ3JlYXRlclRoYW4oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSBudW0ubXVsKHphcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoem1lbmVuZVBvbGUgPT0gXCJtZW5hXCIgfHwgem1lbmVuZVBvbGUgPT0gXCJjX21lbmFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVtLm11bChsX2t1cnopKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bS5kaXYobF9rdXJ6KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByZXBvY3R1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKiAgICAgICAgICBcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIHZyw6FjZW7DrSBkYW7DqWhvIGt1cnp1IG3Em255LCBkbGUgb19tZW5hXHJcbiAgICAgICAgICogQG1ldGhvZCBnZXRLdXJ6TWVueSgpXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG9fbWVuYSAtIERydWggbcSbbnlcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb19rdXJ6IC0gVHlwIGt1cnp1IHwgTiAtIG7DoWt1cCB8IFMgLSBzdMWZZWQgfCBQIC0gcHJvZGVqIHxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEt1cnpNZW55KG9fbWVuYTogbnVtYmVyLCBvX2t1cno6IHN0cmluZyk6IERlY2ltYWwge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJldDogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQua3VyenlNZW55RHRvICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5rdXJ6eU1lbnlEdG8uZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4Lm1lbmEgPT0gb19tZW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob19rdXJ6KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTlwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbmV3IERlY2ltYWwoeC5rdXJ6X24gPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbmV3IERlY2ltYWwoeC5rdXJ6X3AgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbmV3IERlY2ltYWwoeC5rdXJ6X3MgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIG5hc3RhdmVuw60gZGFuw6lobyBrdXJ6dSBtxJtueVxyXG4gICAgICAgICAqIEBtZXRob2Qgc2V0S3Vyek1lbnkoKVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtZW5hIC0gRHJ1aCBtxJtueVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0S3Vyek1lbnkobWVuYTogbnVtYmVyKTogRGVjaW1hbCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBrdXJ6ID0gdGhhdC5nZXRLdXJ6TWVueShtZW5hLCBcIlNcIik7XHJcbiAgICAgICAgICAgIC8qP1NNQVpBVCBQTyBURVNUVSovdGhhdC56bWVueSA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpOy8qKi9cclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwia3VyelwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBrdXJ6LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8qP1NNQVpBVCBQTyBURVNUVSovdGhhdC56bWVueSA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpOy8qKi9cclxuICAgICAgICAgICAgcmV0dXJuIGt1cno7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgbmFzdGF2dWrDrWPDrSBwb2zDrcSNa28gQsOaIHBvZGxlIHp2b2xlbsOpaG8genDFr3NvYnUgcGxhdGJ5XHJcbiAgICAgICAgICogQG1ldGhvZCBuYXN0YXZQb3Zpbm5vc3RCdUNpKClcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByaU5hY3RlbmkgLSBQxZlpIG5hxI10ZW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2UG92aW5ub3N0QnVDaShwcmlOYWN0ZW5pOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1Y2lGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcImJ1X2NpXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxfenAgPSAhcHJpTmFjdGVuaVxyXG4gICAgICAgICAgICAgICAgPyBmb3JtLmZpbmRGaWVsZHMoXCJ6cFwiKS5nZmllbGQ8YW55PihcImdldFZhbHVlXCIpLnpwXHJcbiAgICAgICAgICAgICAgICA6IHRoYXQuRHRvVnJhdGthLnpwO1xyXG4gICAgICAgICAgICB2YXIgbF9tZW5hID0gIXByaU5hY3RlbmlcclxuICAgICAgICAgICAgICAgID8gZm9ybS5maW5kRmllbGRzKFwibWVuYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5tZW5hXHJcbiAgICAgICAgICAgICAgICA6IHRoYXQuRHRvVnJhdGthLm1lbmE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC56cEhvdG92ZS5pbmNsdWRlcyhsX3pwKSAmJiBsX21lbmEgPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucGVybXNEdG8uYnVfY2kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5wZXJtc0R0by5idV9jaSk7XHJcbiAgICAgICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucGVybXNEdG8uYnVfY2kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LnBlcm1zRHRvLmJ1X2NpKTtcclxuICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJmbGFnXCIsIFwicmVxdWlyZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBuYXN0YXZ1asOtY8OtIHBvbMOtxI1rbyBCw5ogcG9kbGUgenZvbGVuw6lobyB6cMWvc29idSBwbGF0YnlcclxuICAgICAgICAgKiBAbWV0aG9kIG5hc3RhdlBvdmlubm9zdFNtbCgpXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1X3ZsIC0gQnVfdmxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2tfdmwgLSBTa192bFxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcml6X3NyIC0gUMWZw616bmFrIFNSXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZQb3Zpbm5vc3RTbWwoYnVfdmw6IHN0cmluZ3xudWxsLCBza192bDogc3RyaW5nfG51bGwsIHByaXpfc3I/OiBudW1iZXJ8bnVsbCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qgc21sRmllbGQgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcIml4cF9zbWxcIik7XHJcbiAgICAgICAgICAgIGlmIChwcml6X3NyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChidV92bCAhPSBudWxsIHx8IHNrX3ZsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJCdVZsTWFQcml6bmFrU1JcIiwgeyBpcEJ1Vmw6IGJ1X3ZsLCBpcFNrVmw6IHNrX3ZsLCBpcFJvazogdGhhdC5EdG9UeXBQaGwuTmFzdGF2ZW5pPy5yb2sgfSkgICAgIC8vIHZvbMOhbsOtIHNlcnZyb3bDqSBsb2dpa3kgcHJvIG5hxI10ZW7DrSBwxZnDrXpuYWt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpel9zciA9ICgoZGF0YS5wcml6bmFrX3NyID09IDEgJiYgdGhhdC5Qcml6SWlzc3AgPT0gMSkgPyAxIDogMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpel9zcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLml4cF9zbWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5wZXJtc0R0by5peHBfc21sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21sRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBcInJlcXVpcmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKj9TTUFaQVQgUE8gVEVTVFUqL3RoYXQuem1lbnkgPSB0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTsvKiovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc21sRmllbGQuZ2ZpZWxkKFwic2V0VmFsaWRhdG9yc1wiLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5peHBfc21sID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtbEZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LnBlcm1zRHRvLml4cF9zbWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJmbGFnXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKj9TTUFaQVQgUE8gVEVTVFUqL3RoYXQuem1lbnkgPSB0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTsvKiovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc21sRmllbGQuZ2ZpZWxkKFwicmVzZXRWYWxpZGF0aW9uc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByaXpfc3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBlcm1zRHRvLml4cF9zbWwgPSB0cnVlOyBcclxuICAgICAgICAgICAgICAgICAgICBzbWxGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5wZXJtc0R0by5peHBfc21sKTtcclxuICAgICAgICAgICAgICAgICAgICBzbWxGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJmbGFnXCIsIFwicmVxdWlyZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLyo/U01BWkFUIFBPIFRFU1RVKi90aGF0LnptZW55ID0gdGhhdC5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7LyoqL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc21sRmllbGQuZ2ZpZWxkKFwic2V0VmFsaWRhdG9yc1wiLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGVybXNEdG8uaXhwX3NtbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNtbEZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LnBlcm1zRHRvLml4cF9zbWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNtbEZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLyo/U01BWkFUIFBPIFRFU1RVKi90aGF0LnptZW55ID0gdGhhdC5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7LyoqL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc21sRmllbGQuZ2ZpZWxkKFwicmVzZXRWYWxpZGF0aW9uc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIG5hc3Rhdkt0Z1Vwb1ByZShpbnB1dFZhbHVlOiBib29sZWFufG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGt0Z1Vwb0ZpZWxkID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJrdGdfdXBvX3ByZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaW5wdXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5rdGdfdXBvX3ByZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAga3RnVXBvRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQucGVybXNEdG8ua3RnX3Vwb19wcmUpO1xyXG4gICAgICAgICAgICAgICAga3RnVXBvRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGt0Z1Vwb0ZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wZXJtc0R0by5rdGdfdXBvX3ByZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBrdGdVcG9GaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5wZXJtc0R0by5rdGdfdXBvX3ByZSk7XHJcbiAgICAgICAgICAgICAgICBrdGdVcG9GaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJmbGFnXCIsIFwicmVxdWlyZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIHBybyBuYXBsbsSbbsOtIHBvbGUgZGxlIHphZGFuw6lobyBpbnRlcnZhbHVcclxuICAgICAgICAgKiBAbWV0aG9kIG5hcGxuZW5pUG9sZSgpXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFBvxI3DoXRlxI1uw60gaG9kbm90YVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgS29uY292w6EgaG9kbm90YVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fSBQb2xlIHMgaG9kbm90YW1pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXBsbmVuaVBvbGUoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICAgICAgbGV0IGE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHN0YXJ0IDwgZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFbaV0gPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0Kys7XHJcbiAgICAgICAgICAgICAgICAvL2EucHVzaChbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm3Em25hIGV4dGVybsOtaG8gc3ViamVrdHUgXHJcbiAgICAgICAgICogQG1ldGhvZCBwb1ptZW5lU3ViamVrdHUoKVxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBjdHggRGF0YSB6IHBvbMOtxI1rYSBwbyB6bcSbbsSbXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb1ptZW5lU3ViamVrdHUoY3R4OiBhbnkpOiB2b2lkIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2IFRLIHRvIGJ5bG8gTmFjdGlFc3VJbmZvICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBidWNpRmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJidV9jaVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2zDrcSNa28gY2l6w6lobyBiYW5rb3Zuw61obyDDusSNdHVcclxuICAgICAgICAgICAgaWYgKGJ1Y2lGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKSA9PSBmYWxzZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBqZSBwb2zDrcSNa28gZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZSAhPT0gbnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsSbamFrw70gc3ViamVrdCBqZSB2eWJyw6FuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBpeHNfZXN1OiBjdHgudmFsdWUuaXhzX2VzdSB9KTsgICAgICAgICAgICAgICAgLy8gbsOhaHJhZGEgemEgZGVwZW5kZW5jeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1Ympla3QgamUgcHLDoXpkbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBpeHNfZXN1OiBudWxsIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhaHJhZGEgemEgZGVwZW5kZW5jeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBha3R1w6FsbsOtY2ggc2VydmVyb3bDvWNoIGZpbHRyxa8gKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuRWtvc3VjaSgpLmdldERhdGEoc2YpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gaG9kbm90IHBvbMOtxI1rYSBzIGFrdHXDoWxuw61taSBzZXJ2ZXJvdsO9bWkgZmlsdHJ5XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGJ1Y2kpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbyB2csOhY2Vuw60gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChidWNpLmxlbmd0aCA9PT0gMSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIGplZG5hIHZyw6FjZW7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgYnVjaVswXSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pOyAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9wbG7DrW0gasOtIGRvIHBvbMOtxI1rYSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHbDrWNlIG5lYm8gxb7DoWRuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJjbGVhclwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWsgw7rEjWV0IHZ5bWHFvnVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSB2b2xhasOtY8OtIHpydcWhZW7DrSBub3bDqSB2cmF0a3kgcMWZaSB6YXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2QgenJ1c2l0Tm92b3VWcmF0a3UoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgenJ1c2l0Tm92b3VWcmF0a3UoKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUnXFocOtbSB2cmF0a3UgYSB6YXbDrXLDoW0gb2tuby4uLlwiKTtcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHJxID0geyBpZERkcFByaXBhZHU6IHRoYXQuRHRvVnJhdGthLml4cCEsIHJhZGVrVWhyYWR5OiB0aGF0LkR0b1ZyYXRrYS5yYWRla191aHIhIH1cclxuICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkVnJhdGt5LnN0b3Jub1ZyYXRreVByaXBhZHUocnEpLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xvc2UoKTsgLy8gcG8genJ1xaFlbsOtIHNlIHphdsWZZSBva25vXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdG92YWPDrSBtZXRvZGEgcHJvIHRlc3Qgem3Em24gbmEgZm9ybXVsw6HFmWlcclxuICAgICAgICAgKiBAbWV0aG9kIHRlc3RabWVuKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RabWVuKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGhhc0NoYW5nZWQ6IGJvb2xlYW4gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIGlmICghaGFzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiVXBvem9ybsSbbsOtXCIsIFwiTmEgZm9ybXVsw6HFmWkgbmVkb8WhbG8gayDFvsOhZG7DqSB6bcSbbsSbXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiVXBvem9ybsSbbsOtXCIsIFwiTmEgZm9ybXVsw6HFmWkgZG/FoWxvIGtlIHptxJtuxJtcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcMWZw616bmFrdSBha3Rpdm7DrSBvcGVyYWNlIGEgYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAqIEBtZXRob2QgcmVsb2FkRGV0YWlsVnJhdGt5KClcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhvdXRSZWxvYWQgKGRlZmF1bHQgPSBmYWxzZSkgdHJ1ZSA9IG5lYWt0dWFsaXpvdmF0IGZvcm11bMOhxZlcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWREZXRhaWxWcmF0a3kod2l0aG91dFJlbG9hZDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gdnl2b2zDoW7DrSB0cmlnZ2VyIG8gYWt0aXZuw60gb3BlcmFjaVxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRGRwRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIFt7IGRhdGE6IHRoYXQuRHRvVnJhdGthIH1dKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgICAgaWYgKCF3aXRob3V0UmVsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInJlbWVtYmVyaW5pdGlhbG9wZW5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgLy90aGF0LmNhbGwoXCJSZWFkRGF0YVZyYXRreVwiLCB7IGRhdGE6IHRoYXQuRHRvVnJhdGthIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LkR0b1ZyYXRrYSA9IGRhdGE7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQubmFjdGlEYXRhKClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdHVzKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiem5vdnVOYWNjdGVuaVZyYXRreVwiIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ6bm92dU5hY2N0ZW5pVnJhdGt5XCIgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWtjZSBwbyBrbGlrbnV0w60gbmEgdGxhxI3DrXRrbyBPSyBcclxuICAgICAgICAgKiBAbWV0aG9kIG9rKClcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gemF2cml0IC0gVHlwIGFrY2UgcG8gdWxvxb5lbsOtIHDFmWVkcGlzdSAgICAgIFxyXG4gICAgICAgICAqICAgMCAtIFVsb8W+aXRcclxuICAgICAgICAgKiAgIDEgLSBVbG/Fvml0IGEgemF2xZnDrXQgLSBtb21lbnTDoWxuxJsgenJ1xaFlbm8gKFRPRE86IHZ5bXlzbGV0IGphayBqZWRlbiBwxZllZHBpcyB6YXbFmcOtdCBhIGRhbMWhw60gb3RldsWZw610KVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb2soemF2cml0OiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuRXZpZGVuY2UoemF2cml0KS5kb25lKCgpID0+IHsgcmV0dXJuIGRlZi5yZXNvbHZlKCk7IH0pLmZhaWwoKCkgPT4geyByZXR1cm4gZGVmLnJlamVjdCgpOyB9KS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrY2UgcHJvIEV2aWRlbmNpKHVsb8W+ZW7DrSkgdnJhdGt5IFxyXG4gICAgICAgICAqIEBtZXRob2QgRXZpZGVuY2UoKVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6YXZyaXQgLSBUeXAgYWtjZSBwbyB1bG/FvmVuw60gcMWZZWRwaXN1ICAgICAgXHJcbiAgICAgICAgICogICAwIC0gVWxvxb5pdFxyXG4gICAgICAgICAqICAgMSAtIFVsb8W+aXQgYSB6YXbFmcOtdCAtIG1vbWVudMOhbG7EmyB6cnXFoWVubyAoVE9ETzogdnlteXNsZXQgamFrIGplZGVuIHDFmWVkcGlzIHphdsWZw610IGEgZGFsxaHDrSBvdGV2xZnDrXQpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBFdmlkZW5jZSh6YXZyaXQ6IG51bWJlcik6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlDFmWlwcmF2dWppIGRhdGEgcHJvIHVsb8W+ZW7DrS4uLlwiKTtcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIGNoeWJuYUtvbnRyb2xhOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoYXNDaGFuZ2VkID0gdGhhdC5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJVcG96b3JuxJtuw61cIiwgXCJOYSBmb3JtdWzDocWZaSBuZWRvxaFsbyBrIMW+w6FkbsOpIHptxJtuxJssIG5lbsOtIGNvIHVsb8W+aXRcIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2VicsOhbsOtIGhvZG5vdCB6IGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YTogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvL2xldCBkYXRhVnJhdGt5OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gPSB0aGF0LkR0b1ZyYXRrYTtcclxuICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGRhdGFWcmF0a3kpO1xyXG4gICAgICAgICAgICAvL3RoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJmb3JtSGxhdmlja2FEb2t1bWVudHVcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkYXRhVnJhdGt5KTtcclxuICAgICAgICAgICAgLy9sZXQgaXhzVHlwRmllbGQgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcIml4c190eXBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vZGF0YVZyYXRreS5peHNfdHlwID0gaXhzVHlwRmllbGQuaXhzX3R5cDtcclxuICAgICAgICAgICAgLy9kYXRhVnJhdGt5Lml4cCA9IHRoYXQuSXhwO1xyXG4gICAgICAgICAgICAvL2RhdGFWcmF0a3kucmFkZWtfdWhyID0gdGhhdC5SYWRla191aHI7XHJcbiAgICAgICAgICAgIC8vZGF0YVZyYXRreS5lZGl0YWNlID0gdGhhdC5FZGl0OyAvLyBwb21vY27DoSBwb2xvxb5rYSBEVE8gcHJvIGRhbMWhw60ga29udHJvbHkgbmEgc3RyYW7EmyBzZXJ2ZXJ1IGtkecW+IHNlIGplZG7DoSBvIG5vdsO9IHrDoXpuYW1cclxuXHJcbiAgICAgICAgICAgIC8vVE9ETzogdWxvxb5lbsOtIFdGTCBkYXQgKFRhYkdyb3VwYSBET0tVTUVOVCkuLi5cclxuICAgICAgICAgICAgLy8gZG9rdW1lbnQgYSB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgIGxldCBkb2t1bWVudDogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgdmxhc3Rub3N0aTogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAvL2lmICghKHRoaXMuRGV0YWlsRHRvPy5KZVBvZGFueSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRva3VtZW50XHJcbiAgICAgICAgICAgICAgICBkb2t1bWVudC8qOiBHRG9rdW1lbnREdG8qLyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAodGhpcyBhcyBhbnkpLnNhdmVFa29Qcm9maWwoKSwgKHRoaXMgYXMgYW55KS5zYXZlU3NsRGV0YWlsRG9ydWNlbmlFa28gPyAodGhpcyBhcyBhbnkpLnNhdmVTc2xEZXRhaWxEb3J1Y2VuaUVrbygpIDoge30pO1xyXG4gICAgICAgICAgICAgICAgZG9rdW1lbnQuaXhzX3R5cCA9IGRva3VtZW50Lml4c190eXAgPz8gdGhhdC5EdG9WcmF0a2Eud2ZsUHJvZmlsPy5kb2t1bWVudD8uaXhzX3R5cDtcclxuICAgICAgICAgICAgICAgIGRva3VtZW50Lm5hemV2ID0gZG9rdW1lbnQubmF6ZXYgPz8gdGhhdC5EdG9WcmF0a2Eud2ZsUHJvZmlsPy5kb2t1bWVudD8ubmF6ZXY7XHJcbiAgICAgICAgICAgICAgICBkb2t1bWVudC5zdF91dGFqX2lkID0gZG9rdW1lbnQuc3RfdXRhal9pZCA/PyB0aGF0LkR0b1ZyYXRrYS53ZmxQcm9maWw/LmRva3VtZW50Py5zdF91dGFqX2lkO1xyXG4gICAgICAgICAgICAgICAgZG9rdW1lbnQuaXhzX2Z1bl9ha3QgPSBkb2t1bWVudC5peHNfZnVuX2FrdCA/PyB0aGF0LkR0b1ZyYXRrYS53ZmxQcm9maWw/LmRva3VtZW50Py5peHNfZnVuX2FrdDtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmRva3VtZW50ID0gZG9rdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAvL3ZsYXN0bm9zdGkgPSBHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuY29sbGVjdFZhbHVlcyh0aGlzKTtcclxuICAgICAgICAgICAgICAgIC8vZGF0YVZyYXRreS52bGFzdG5vc3RpID0gdmxhc3Rub3N0aTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gS29udHJvbHkgZGF0IHDFmWVkIHVsb8W+ZW7DrW0gKHYgZ3VwdMSbIEZ1bmN0aW9uOiBLb250cm9sYVBvbGkoKSlcclxuICAgICAgICAgICAgLy9NZXRvZGEgemFrb21lbnRvdmFuw6EgLSBuZXbDrW0gamFrIG/FoWXDqWZvdmF0IHbFoWVjaG55IMSNw6FzdGkgYWJ5IHNlIHZyYWNlbGkgYXRkLi4uXHJcbiAgICAgICAgICAgIC8vdGhhdC56a29udHJvbHVqVnJhdGt1KGRhdGFWcmF0a3kpO1xyXG4gICAgICAgICAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy9rb250cm9sYSB6cMWvc29ieSDDumhyYWR5LCBqZS1saSB6YWTDoW4gY2h5Ym7EmywgdWtvbsSNw61tIG5hxI3DrXTDoW5uw60sIG5hc3RhdsOtbSBmb2N1cyBuYSBwb2zDrcSNa28gYSB6b2JyYXrDrW0gY2h5Ym92b3UgaGzDocWha3VcclxuICAgICAgICAgICAgbGV0IGNoeWJuZVpQID0gWzAsIDQwLCA2MCwgNzBdO1xyXG4gICAgICAgICAgICBpZiAoY2h5Ym5lWlAuaW5jbHVkZXMoZm9ybURhdGEuenAhKSkge1xyXG4gICAgICAgICAgICAvL2lmIChkYXRhVnJhdGt5LnpwID09IDAgfHwgZGF0YVZyYXRreS56cCA9PSA0MCB8fCBkYXRhVnJhdGt5LnpwID09IDYwIHx8IGRhdGFWcmF0a3kuenAgPT0gNzApIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIlRlbnRvIHpwxa9zb2Igw7pocmFkeSBuZW7DrSBtb8W+bsOpIHBybyB2cmF0a3UgcG91xb7DrXQhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcInpwXCIpLmdmaWVsZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy9UT0RPOiBLb250cm9sYSBwxZlpIHVsb8W+ZW7DrSBwxZllZCB0aXNrZW0gemRhIGplIHZ5cGxuxJtuw70gS1MgdiBwxZnDrXBhZMSbIGplLWxpIFpQPTIwIG5lYm8gWlA9MzBcclxuICAgICAgICAgICAgLy8gaXBfb2thbXppayAtPiAwLVByZWQgdGlza2VtIHwgMS1wcmVkIHVsb3plbmltXHJcbiAgICAgICAgICAgIC8vSWYgaXBfb2thbXppayA9IDAgQU5EKCgobF96cCA9IDIwKSBPUihsX3pwID0gMzApKSBBTkQgU2FsU3RyVHJpbVgobF9rcykgPSAnJylcclxuICAgICAgICAgICAgLy9cdElmIE5PVCBnZl9ab2JyYXpEb3RheignTmVuw60gdnlwbG7Em24gS1MsIGNoY2V0ZSBwb2tyYcSNb3ZhdD8nKVxyXG4gICAgICAgICAgICAvL1x0XHRDYWxsIFNhbFNldEZvY3VzKGRmX2tzKVxyXG4gICAgICAgICAgICAvL1x0XHRSZXR1cm4gRkFMU0VcclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8va29udHJvbGEgesOhcG9ybsO9Y2ggxI3DoXN0ZWssIGplLWxpIHphZMOhbmEgY2h5Ym7EmywgdWtvbsSNw61tIG5hxI3DrXTDoW5uw60sIG5hc3RhdsOtbSBmb2N1cyBuYSBwb2zDrcSNa28gYSB6b2JyYXrDrW0gY2h5Ym92b3UgaGzDocWha3VcclxuICAgICAgICAgICAgaWYgKGZvcm1EYXRhLmMhID49IG5ldyBEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgICAgICAgICBjaHlibmFLb250cm9sYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCLEjMOhc3RrYSB2cmF0a3kgbXVzw60gYsO9dCB6w6Fwb3Juw6EhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvL2tvbnRyb2xhIHZ5cGxuZW7DrSBCw5ogcMWZw61qZW1jZSwgamUtbGkgemFkw6FuIGNoeWJuxJssIHVrb27EjcOtbSBuYcSNw610w6FubsOtLCBuYXN0YXbDrW0gZm9jdXMgbmEgcG9sw63EjWtvIGEgem9icmF6w61tIGNoeWJvdm91IGhsw6HFoWt1XHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5idV9jaT8udHJpbSgpLmxlbmd0aCA9PSAwIHx8IGZvcm1EYXRhLmJ1X2NpID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhhdC56cEhvdG92ZS5pbmNsdWRlcyhmb3JtRGF0YS56cCEpIHx8IGZvcm1EYXRhLm1lbmEgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVuw60gdnlicsOhbiBiYW5rb3Zuw60gw7rEjWV0IHDFmcOtamVtY2UhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwiYnVfY2lcIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8va29udHJvbGEgdnlwbG5lbsOtIHZsYXN0bsOtaG8gQsOaLCBqZS1saSB6YWTDoW4gY2h5Ym7EmywgdWtvbsSNw61tIG5hxI3DrXTDoW5uw60sIG5hc3RhdsOtbSBmb2N1cyBuYSBwb2zDrcSNa28gYSB6b2JyYXrDrW0gY2h5Ym92b3UgaGzDocWha3VcclxuICAgICAgICAgICAgaWYgKGZvcm1EYXRhLmJ1X3ZsPy50cmltKCkubGVuZ3RoID09IDAgfHwgZm9ybURhdGEuYnVfdmwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVuw60gdnlicsOhbiBiYW5rb3Zuw60gw7rEjWV0IHZsYXN0bsOtIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJ6YWtsYWRuaUluZm9Gb3JtXCIpLmZpbmRGaWVsZHMoXCJidV92bFwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS56cCA9PSA3MykgeyAvL1ZyYWPDrSBzZSBwZW7DrXplIHogcGxhdGJ5IHDFmWVzIHBvcnTDoWwgYSBleGlzdHVqZSBwbGFiYSBQT0tcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LlJlY1ZyYXRrYS5peHBfcG9rPy50cmltKCkubGVuZ3RoICE9IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJUZW50byB6cMWvc29iIMO6aHJhZHkgdnJhdGt5IGplIG1vxb5uw70gcG91emUgcMWZaSB2cmFjZW7DrSBwbGF0YnkgcGxhY2Vuw6kgcMWZZXMgcGxhdGVibsOtIHBvcnTDoWwhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwienBcIikuZ2ZpZWxkKCdmb2N1cycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IGZvcm1EYXRhLml4cF9wb2sgPSB0aGF0LlJlY1ZyYXRrYS5peHBfcG9rOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkR0b1R5cFBobC5wcml6X25hcHZyYSA9PSAwICYmIGZvcm1EYXRhLmRhdF92em5pa3UhIDw9IHRoYXQuRHRvVHlwUGhsLk5hc3RhdmVuaT8uZGF0X3V6YXYhKSB7XHJcbiAgICAgICAgICAgICAgICBjaHlibmFLb250cm9sYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJaYWTDoW5vIGRhdHVtIHZ6bmlrdSB2IHV6YXbFmWVuw6ltIG9iZG9iw60hXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcImRhdF92em5pa3VcIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvL1RPRE86IEtvbnRyb2xhIHZ5cGxuxJtuw60gcG9sb8W+a3kgU01MIHBvZGxlIHDFmcOtem5ha3UgbmEgQlVfVkxcclxuICAgICAgICAgICAgLy9JZiBnZl9CdVZsTWFQcml6bmFrU1IoZGZfYnVfdmwuYnVfdmwoKSwgZGZfYnVfdmwuc2tfdmwoKSwgZ190eXBfcG9obGVkYXZreS5yb2spXHJcbiAgICAgICAgICAgIC8vXHRJZiBkZl9wb2xvemthX3NtbC5KZVByYXpkbnkoKVxyXG4gICAgICAgICAgICAvL1x0XHRDYWxsIGdmX1pvYnJhekNoeWJ1KCdOZW7DrSB2eXBsbsSbbmEgcG92aW5uw6EgcG9sb8W+a2EhJylcclxuICAgICAgICAgICAgLy9cdFx0Q2FsbCBTYWxTZXRGb2N1cyhkZl9wb2xvemthX3NtbClcclxuICAgICAgICAgICAgLy9cdFx0UmV0dXJuIDBcclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vVE9ETzogS29udHJvbGEgxb5lIG5hIHBvbG/FvmNlIFNNTCBqZSBzdGVqbsO9IHZsYXN0bsOtIGJhbmtvdm7DrW0gw7rEjWV0IGpha28gbmEgdnJhdGNlXHJcbiAgICAgICAgICAgIC8vSWYgTk9UIGRmX3BvbG96a2Ffc21sLkplUHJhemRueSgpXHJcbiAgICAgICAgICAgIC8vXHRDYWxsIGdmX1ZyYXRVY2V0WlBvbG96a3lTTUwobF9peHBfc21sLCBsX3Jva19zbWwsIGxfY2lzbG9fc21sLCBsX2J1X3ZsX3NtbCwgbF9za192bF9zbWwpXHJcbiAgICAgICAgICAgIC8vXHRJZiBsX2J1X3ZsX3NtbCAhPSBsX2J1X3ZsIE9SIGxfc2tfdmxfc21sICE9IGxfc2tfdmxcclxuICAgICAgICAgICAgLy9cdFx0Q2FsbCBnZl9ab2JyYXpDaHlidSgnTmVzb3VobGFzw60gYmFua292bsOtIMO6xI1ldCB2bGFzdG7DrSBhIGJhbmtvdm7DrSDDusSNZXQgcG9sb8W+a3kgU01MXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vXHRcdFx0XHRQb2xvxb5rYSBzbWxvdXZ5OiAnfHwgbF9idV92bF9zbWx8fCcgLyAnfHxsX3NrX3ZsX3NtbCB8fCdcclxuICAgICAgICAgICAgLy9cdFx0XHRcdFZyYXRrYTogJ3x8ZGZfYnVfdmwuYnVfdmwoKXx8JyAvICd8fGRmX2J1X3ZsLnNrX3ZsKCl8fCdcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy9cdFx0XHRcdFZyYXRrdSBuZWx6ZSB1bG/Fvml0IScpXHJcbiAgICAgICAgICAgIC8vXHRcdENhbGwgU2FsU2V0Rm9jdXMoZGZfcG9sb3prYV9zbWwpXHJcbiAgICAgICAgICAgIC8vXHRcdFJldHVybiAwXHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvL0tvbnRyb2xhIHpkYSBWUyBvYnNhaHVqZSBjZWzDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRJbnRlZ2VyID0gL15cXGQrJC87XHJcbiAgICAgICAgICAgIGlmICghaXNWYWxpZEludGVnZXIudGVzdChmb3JtRGF0YS52cyEudHJpbSgpKSkge1xyXG4gICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiQ2h5Ym7EmyB6YWRhbsO9IFZTIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJ6YWtsYWRuaUluZm9Gb3JtXCIpLmZpbmRGaWVsZHMoXCJ2c1wiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vS29udHJvbGEgRXh0ZXJuw61obyBzdWJqZWt0dSAoaXhzX2VzdSlcclxuICAgICAgICAgICAgaWYgKGZvcm1EYXRhLml4c19lc3UgPT0gJzAwMDBTRTAwMDAwTScpIHsgLy9UT0RPIGHFviBidWRlIGdsb2IuIHByb23Em25uw6EgcHJvIG51bGxJeHNFc3UgdGFrIHDFmWVwc2F0XHJcbiAgICAgICAgICAgICAgICBjaHlibmFLb250cm9sYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZW7DrSB6YWTDoW4gc3ViamVrdCFcIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vS29udHJvbGEgemRhIHDFmWkgenZvbGVuw6kgbW/Fvm5vc3RpIMW+ZSBzZSBzIHZyYXRrb3UgbcOhIHZ5dHZvxZlpdCB0YWvDqSBwxZllZHBpcyBqZSB2eXBsbsSbbsOpIHBvbMOtxI1rbyBrYXRlZ29yaWUgw7rEjS4gcG9oeWJ1XHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5wcmVkcGlzVGFreSA9PSB0cnVlICYmIGZvcm1EYXRhLmt0Z191cG9fcHJlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIlZ5YmVydGUga2F0ZWdvcmlpIHBvaHlidSBwcm8gcMWZZWRwaXMhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcImt0Z191cG9fcHJlXCIpLmdmaWVsZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIEZ1bmN0aW9uOiBLb250cm9sYVBvbGlcclxuICAgICAgICAgICAgaWYgKCFjaHlibmFLb250cm9sYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1EYXRhLmJ1X2NpPy50cmltKCkubGVuZ3RoID4gMCAmJiBmb3JtRGF0YS5idV9jaSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Ub2RvOiBwb2t1ZCBzZSBqZWRuYSBvIHZyYXRrdSBkbyBjaXppbnkgbmVibyB2IGNpemkgbWVuZSB0YWsgamVzdGUgYnVkb3UgdHJlYmEgdXByZXNudWppY2kgdWRhamVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRWcmF0a3kuc3RhdEJhbmtvdm5paG9VY3R1KHsgaXBfSXhzRXN1OiBmb3JtRGF0YS5peHNfZXN1LCBpcF9CdTogZm9ybURhdGEuYnVfY2ksIGlwX1NrOiBmb3JtRGF0YS5za19jaSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gLi4uLiBkaWFsb2cgbWVuaSBob2Rub3R5LCB0YWsgc2kgamUgcmFkc2kgem5vdnUgbmFzdGF2aW0gZG8gZm9ybXVsYXJlLi4uIChOYXN0YXZQb2xlKCkpLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybURhdGEubWVuYSAhPSAwIHx8IHJldCAhPSA0Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5Fa28uV2ViQ2xpZW50LkdaYWhyYW5pY25pUGxhdGJ5XCIsIHsgdWlkOiBcIkdaYWhyYW5pY25pUGxhdGJ5I1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWRlbnRpZmlrw6F0b3IgZG9rYWxkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogZm9ybURhdGEuaXhzX2VzdSwgICAgICAgICAgICAgIC8vIGV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X2NpOiBmb3JtRGF0YS5idV9jaSwgICAgICAgICAgICAgICAgICAvLyDEjcOtc2xvIGJhbmtvdm7DrWhvIMO6xI10dSAtIGNpesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza19jaTogZm9ybURhdGEuc2tfY2ksICAgICAgICAgICAgICAgICAgLy8ga8OzZCBiYW5reSAtIGNpesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidV92bDogZm9ybURhdGEuYnVfdmwsICAgICAgICAgICAgICAgICAgLy8gxI3DrXNsbyBiYW5rb3Zuw61obyDDusSNdHUgLSB2bGFzdG7DrSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrX3ZsOiBmb3JtRGF0YS5za192bCwgICAgICAgICAgICAgICAgICAvLyBrw7NkIGJhbmt5IC0gdmxhc3Ruw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmE6IGZvcm1EYXRhLm1lbmEsICAgICAgICAgICAgICAgICAgICAvLyBtxJtuYSB6IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmFfcG96OiBmb3JtRGF0YS5tZW5hX3BveiwgICAgICAgICAgICAvLyBwb8W+YWRvdmFuw6EgbcSbbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzOiBmb3JtRGF0YS52cywgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXJpYWJpbG7DrSBzeW1ib2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpwOiBmb3JtRGF0YS56cCwgICAgICAgICAgICAgICAgICAgICAgICAvLyB6cMWvc29iIMO6aHJhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfbWVuYTogZm9ybURhdGEuY19tZW5hLCAgICAgICAgICAgICAgICAvLyDEjcOhc3RrYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfc3BsOiBmb3JtRGF0YS5kYXRfc3BsLCAgICAgICAgICAgICAgLy8gZGF0dW0gc3BsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0LnJvaywgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJvayAtIGVrb3BhcmFtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kOiAxLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkX29ubHk6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgLy8gZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9waXM6IGZvcm1EYXRhLnBvcGlzICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IDkwMCwgaGVpZ2h0OiA4MDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybURhdGEuYyA9IHBhcnNlRGVjaW1hbChmb3JtRGF0YS5jX21lbmEgPz8gMCkudGltZXMoZm9ybURhdGEua3VyeiA/PyAxKS50aW1lcygxMDApLnJvdW5kKCkuZGl2KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtRGF0YS5DVWhyYWRpdCA9IHBhcnNlRGVjaW1hbChmb3JtRGF0YS5DVWhyYWRpdE1lbmEgPz8gMCkudGltZXMoZm9ybURhdGEua3Vyel9ha3QgPz8gMSkudGltZXMoMTAwKS5yb3VuZCgpLmRpdigxMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5ocmFfcG9wID0gcmVzLmhyYV9wb3A7ICAgLy8gVEsgPSAwIHwgV0sgPSAyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnpwX3ogPSByZXMuenBfejtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5wbGFfdGl0ID0gcmVzLnBsYV90aXQ7ICAgLy8gLSB0eXRvIGRhdGEgb2tubyBuZXZyYWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnVjZWxfdWhyID0gcmVzLnVjZWxfdWhyOyAvLyAtIHR5dG8gZGF0YSBva25vIG5ldnJhY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuZGV2X3BvdiA9IHJlcy5kZXZfcG92OyAgIC8vIC0gdHl0byBkYXRhIG9rbm8gbmV2cmFjw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5zZHMgPSByZXMuc2RzOyAgICAgICAgICAgLy8gLSB0eXRvIGRhdGEgb2tubyBuZXZyYWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnBvcGlzID0gcmVzLnBvcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnVwbCA9IHJlcy51cGw7IC8vIC0gVVBMIG5hb3BhayB2cmFjw60sIGFsZSBuYSBzZXJ2ZXJ1IGpzZW0gbWV0b2R1IHBybyBkb3Rhxb5lbsOtIHDFmWVzdG8gbmVjaGFsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZG90YXpQcmVkVWxvemVuaW0oZm9ybURhdGEsIHphdnJpdCkuZG9uZSgoKSA9PiB7IHJldHVybiBkZWYucmVzb2x2ZSgpOyB9KS5mYWlsKCgpID0+IHsgcmV0dXJuIGRlZi5yZWplY3QoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRvdGF6UHJlZFVsb3plbmltKGZvcm1EYXRhLCB6YXZyaXQpLmRvbmUoKCkgPT4geyByZXR1cm4gZGVmLnJlc29sdmUoKTsgfSkuZmFpbCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRvdGF6UHJlZFVsb3plbmltKGZvcm1EYXRhLCB6YXZyaXQpLmRvbmUoKCkgPT4geyByZXR1cm4gZGVmLnJlc29sdmUoKTsgfSkuZmFpbCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWtjZSBwcm8gc2Ftb3Ruw6kgdWxvxb5lbsOtIFZyYXRreSBcclxuICAgICAgICAgKiBAbWV0aG9kIGRvdGF6UHJlZFVsb3plbmltKClcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gZm9ybURhdGEgLSBEVE8gdnJhdGt5XHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHphdnJpdCAtIFR5cCBha2NlIHBvIHVsb8W+ZW7DrSBwxZllZHBpc3UgXHJcbiAgICAgICAgICogMCAtIFVsb8W+aXQgfCAxIC0gVWxvxb5pdCBhIHphdsWZw610XHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBkb3RhelByZWRVbG96ZW5pbShmb3JtRGF0YTogYW55LCB6YXZyaXQ6IG51bWJlcik6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB1a2zDoWTDoW7DrSB2cmF0a3lcIik7XHJcbiAgICAgICAgICAgIGlmICghZm9ybURhdGEucHJlZHBpc1Rha3kpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudWxvelZyYXRrdShmb3JtRGF0YSwgemF2cml0KS5kb25lKCgpID0+IHsgcmV0dXJuIGRlZi5yZXNvbHZlKCk7IH0pLmZhaWwoKCkgPT4geyByZXR1cm4gZGVmLnJlamVjdCgpOyB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiVXBvem9ybsSbbsOtXCIsIFwiT3ByYXZkdSBjaGNldGUgc291xI1hc27EmyBzIHZyYXRrb3UgemFsb8W+aXQgaSBwxZllZHBpcz9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3pWcmF0a3UoZm9ybURhdGEsIHphdnJpdCkuZG9uZSgoKSA9PiB7IHJldHVybiBkZWYucmVzb2x2ZSgpOyB9KS5mYWlsKCgpID0+IHsgcmV0dXJuIGRlZi5yZWplY3QoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJub1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5wcmVkcGlzVGFreSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96VnJhdGt1KGZvcm1EYXRhLCB6YXZyaXQpLmRvbmUoKCkgPT4geyByZXR1cm4gZGVmLnJlc29sdmUoKTsgfSkuZmFpbCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWtjZSBwcm8gc2Ftb3Ruw6kgdWxvxb5lbsOtIFZyYXRreSBcclxuICAgICAgICAgKiBAbWV0aG9kIHVsb3pWcmF0a3UoKVxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBfZGF0YSAtIERUTyB2cmF0a3lcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gemF2cml0IC0gVHlwIGFrY2UgcG8gdWxvxb5lbsOtIHDFmWVkcGlzdSBcclxuICAgICAgICAgKiAwIC0gVWxvxb5pdCB8IDEgLSBVbG/Fvml0IGEgemF2xZnDrXRcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHVsb3pWcmF0a3UoX2RhdGE6IGFueSwgemF2cml0OiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFZyYXRreS51bG96VnJhdGt1UHJpcGFkdSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICByYWRla191aHI6IHRoYXQuUmFkZWtfdWhyLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdF92em5pa3U6IF9kYXRhLmRhdF92em5pa3UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0X3NwbDogX2RhdGEuZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgICAgICBjOiBfZGF0YS5jLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbmE6IF9kYXRhLm1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVuYV9wb3o6IF9kYXRhLm1lbmFfcG96LFxyXG4gICAgICAgICAgICAgICAgICAgIGNfbWVuYTogX2RhdGEuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIGt1cno6IF9kYXRhLmt1cnosXHJcbiAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogX2RhdGEua3RnX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX3ByZTogX2RhdGEua3RnX3Vwb19wcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG96bmFta2E6IF9kYXRhLnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcGlzOiBfZGF0YS5wb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICB6cDogX2RhdGEuenAsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVfdmw6IF9kYXRhLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X2NpOiBfZGF0YS5idV9jaSxcclxuICAgICAgICAgICAgICAgICAgICBza192bDogX2RhdGEuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tfY2k6IF9kYXRhLnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNzOiBfZGF0YS5zcyxcclxuICAgICAgICAgICAgICAgICAgICB2czogX2RhdGEudnMsXHJcbiAgICAgICAgICAgICAgICAgICAga3M6IF9kYXRhLmtzLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c190eXA6IF9kYXRhLml4c190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX3NtbDogX2RhdGEuaXhwX3NtbCxcclxuICAgICAgICAgICAgICAgICAgICByb2tfc21sOiBfZGF0YS5yb2tfc21sLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpc2xvX3NtbDogX2RhdGEuY2lzbG9fc21sLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZWRwaXNUYWt5OiBfZGF0YS5wcmVkcGlzVGFreSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuRHRvVnJhdGthLmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBpeHBfcG9rOiBfZGF0YS5peHBfcG9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhY2U6IHRoYXQuRWRpdCxcclxuICAgICAgICAgICAgICAgICAgICBkb2t1bWVudDogX2RhdGEuZG9rdW1lbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhyYV9wb3A6IF9kYXRhLmhyYV9wb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgenBfejogX2RhdGEuenBfeixcclxuICAgICAgICAgICAgICAgICAgICBwbGFfdGl0OiBfZGF0YS5wbGFfdGl0LCAgIC8vIC0gdHl0byBkYXRhIG9rbm8gbmV2cmFjw61cclxuICAgICAgICAgICAgICAgICAgICB1Y2VsX3VocjogX2RhdGEudWNlbF91aHIsIC8vIC0gdHl0byBkYXRhIG9rbm8gbmV2cmFjw61cclxuICAgICAgICAgICAgICAgICAgICBkZXZfcG92OiBfZGF0YS5kZXZfcG92LCAgIC8vIC0gdHl0byBkYXRhIG9rbm8gbmV2cmFjw61cclxuICAgICAgICAgICAgICAgICAgICBzZHM6IF9kYXRhLnNkcywgICAgICAgICAgIC8vIC0gdHl0byBkYXRhIG9rbm8gbmV2cmFjw61cclxuICAgICAgICAgICAgICAgICAgICB1cGw6IF9kYXRhLnVwbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LkVkaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdWxvemkgc2UgcG9zbGVkbmkgdnlicmFuYSBrYXRlZ29yaWUgcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudXNlclNldHRpbmdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxsIGdmX1Vsb3pMb2thbG5pUGFyYW1ldHJOKCAndnJhdGthX2t0Z191cG8nLGxfa3RnX3VwbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51c2VyU2V0dGluZ3MhLnNldChcIkdWcmF0a2FLdGdVcG9cIiwgX2RhdGEua3RnX3Vwbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV9kYXRhLnByZWRwaXNUYWt5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6YXZyaXQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpOyAvL1RPRE86IHbEm3RldiBwcm9taXNlIG1ldG9keSBzZSDFoXBhdG7DvW0gdWtvbsSNZW7DrW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWREZXRhaWxWcmF0a3koKS5kb25lKCgpID0+IHsgcmV0dXJuIGRlZi5yZXNvbHZlKCk7IH0pLmZhaWwoKCkgPT4geyByZXR1cm4gZGVmLnJlamVjdCgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxQcmVkcGlzdVwiLCB7IElEOiAnRERQR1ByZWRwaXMjJywgVGl0dWxlazogYERldGFpbCBwxZllZHBpc3UgxI0uJHtyZXQuZGF0YS5yYWRla1ByZWRwaXN1fWAsIEl4cDogdGhhdC5JeHAsIFJhZGVrX3VocjogcmV0LmRhdGEucmFkZWtQcmVkcGlzdSwgVHlwX3BobDogdGhhdC5UeXBfcGhsLCBFZGl0OiB0cnVlLCBUZXN0OiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoemF2cml0ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpIC8vVE9ETzogdsSbdGV2IHByb21pc2UgbWV0b2R5IHNlIMWhcGF0bsO9bSB1a29uxI1lbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbG9hZERldGFpbFZyYXRreSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0ZW5pUHJpc3R1cHUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7IHJldHVybiBkZWYucmVqZWN0KCk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIEBtZXRob2QgY2xvc2luZygpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8SW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bz4gfCBJbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvfSBwcm9taXNlIHMgZGF0eSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpIG5lYm8gcMWZw61tbyBkYXRhIGRldGFpbHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8SW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bz4gfCBJbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLkVkaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiVXBvem9ybsSbbsOtXCIsIFwiTm92w6EgdnJhdGthIG5lYnlsYSB1bG/FvmVuYSEgT3ByYXZkdSBjaGNldGUgb2tubyB1emF2xZnDrXQ/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56cnVzaXROb3ZvdVZyYXRrdSgpLmRvbmUoKCkgPT4geyByZXR1cm4gZGVmLnJlc29sdmUoKTsgfSkuZmFpbCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGF0LnBlcm1zRHRvLmx6ZUVkaXRvdmF0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8va29udG9ybGEgamVzdGxpIGpzb3UgZGF0YSB6bcSbbsSbbmEgYSBqZXN0bGkgem3Em255IHVsb8W+aXRcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IHRoYXQuZmluZEZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzQ2hhbmdlZCA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhhdC5EdG9WcmF0a2EpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLygoZWRpdCB8fCB0aGF0LmNoYW5nZVBvcml6b3ZhYylcclxuICAgICAgICAgICAgICAgICAgICAvLyYmICh0aGlzLkR0b1ZyYXRrYS51cF9zdGF2ID09PSAxMCB8fCB0aGlzLkR0b1ZyYXRrYS51cF9zdGF2ID09PSAxNSB8fCB0aGlzLkR0b1ZyYXRrYS51cF9zdGF2ID09PSAyMCkpIHsgLy8ga2R5xb4gamUgbsSbY28gem3Em27Em25vIGEgamXFoXTEmyBhc2kgdHl0byBwb2Rtw61ua3lcclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChFZGl0b3Zhbm8gJiZcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAoRG9rbGFkUG9rLkRldGFpbC5VcFN0YXYgIT0gR1Bva0RTdGF2LnNjaHZhbGVubyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBEb2tsYWRQb2suRGV0YWlsLlVwU3RhdiAhPSBHUG9rRFN0YXYuemF1Y3RvdmFubyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBEb2tsYWRQb2suRGV0YWlsLlVwU3RhdiAhPSBHUG9rRFN0YXYudXphdnJlbm8pXHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5tZXNzYWdlQm94VW5zYXZlZERhdGEodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwibm9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjYW5jZWxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRXZpZGVuY2UoMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQuRHRvVnJhdGthKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUodGhhdC5EdG9WcmF0a2EpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlZi5yZWplY3QoKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHRoYXQuRHRvVnJhdGthKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gemtvbnRyb2x1alZyYXRrdVxyXG4gICAgICAgIC8vLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEFrY2UgcHJvIGtvbnRyb2x1IGRhdCB2cmF0a3lcclxuICAgICAgICAvLyAqIEBtZXRob2QgemtvbnRyb2x1alZyYXRrdSgpXHJcbiAgICAgICAgLy8gKiBAcGFyYW0ge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0b30gZGF0YVZyYXRreSAtIERUTyB2cmF0a3lcclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vemtvbnRyb2x1alZyYXRrdShkYXRhVnJhdGt5OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8pIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICAvLyNyZWdpb24gS29udHJvbHkgZGF0IHDFmWVkIHVsb8W+ZW7DrW0gKHYgZ3VwdMSbIEZ1bmN0aW9uOiBLb250cm9sYVBvbGkoKSlcclxuICAgICAgICAvLyAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyAgICAvL2tvbnRyb2xhIHpwxa9zb2J5IMO6aHJhZHksIGplLWxpIHphZMOhbiBjaHlibsSbLCB1a29uxI3DrW0gbmHEjcOtdMOhbm7DrSwgbmFzdGF2w61tIGZvY3VzIG5hIHBvbMOtxI1rbyBhIHpvYnJhesOtbSBjaHlib3ZvdSBobMOhxaFrdVxyXG4gICAgICAgIC8vICAgIGlmIChkYXRhVnJhdGt5LnpwID09IDAgfHwgZGF0YVZyYXRreS56cCA9PSA0MCB8fCBkYXRhVnJhdGt5LnpwID09IDYwIHx8IGRhdGFWcmF0a3kuenAgPT0gNzApIHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiVGVudG8genDFr3NvYiDDumhyYWR5IG5lbsOtIG1vxb5uw6kgcHJvIHZyYXRrdSBwb3XFvsOtdCFcIikub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcInpwXCIpLmdmaWVsZCgnZm9jdXMnKVxyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy9UT0RPOiBLb250cm9sYSBwxZlpIHVsb8W+ZW7DrSBwxZllZCB0aXNrZW0gemRhIGplIHZ5cGxuxJtuw70gS1MgdiBwxZnDrXBhZMSbIGplLWxpIFpQPTIwIG5lYm8gWlA9MzBcclxuICAgICAgICAvLyAgICAvLyBpcF9va2FtemlrIC0+IDAtUHJlZCB0aXNrZW0gfCAxLXByZWQgdWxvemVuaW1cclxuICAgICAgICAvLyAgICAvL0lmIGlwX29rYW16aWsgPSAwIEFORCgoKGxfenAgPSAyMCkgT1IobF96cCA9IDMwKSkgQU5EIFNhbFN0clRyaW1YKGxfa3MpID0gJycpXHJcbiAgICAgICAgLy8gICAgLy9cdElmIE5PVCBnZl9ab2JyYXpEb3RheignTmVuw60gdnlwbG7Em24gS1MsIGNoY2V0ZSBwb2tyYcSNb3ZhdD8nKVxyXG4gICAgICAgIC8vICAgIC8vXHRcdENhbGwgU2FsU2V0Rm9jdXMoZGZfa3MpXHJcbiAgICAgICAgLy8gICAgLy9cdFx0UmV0dXJuIEZBTFNFXHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy9rb250cm9sYSB6w6Fwb3Juw71jaCDEjcOhc3RlaywgamUtbGkgemFkw6FuYSBjaHlibsSbLCB1a29uxI3DrW0gbmHEjcOtdMOhbm7DrSwgbmFzdGF2w61tIGZvY3VzIG5hIHBvbMOtxI1rbyBhIHpvYnJhesOtbSBjaHlib3ZvdSBobMOhxaFrdVxyXG4gICAgICAgIC8vICAgIGlmIChkYXRhVnJhdGt5LmMhID49IG5ldyBEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIsSMw6FzdGthIHZyYXRreSBtdXPDrSBiw710IHrDoXBvcm7DoSFcIilcclxuICAgICAgICAvLyAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKCdmb2N1cycpXHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy9rb250cm9sYSB2eXBsbmVuw60gQsOaIHDFmcOtamVtY2UsIGplLWxpIHphZMOhbiBjaHlibsSbLCB1a29uxI3DrW0gbmHEjcOtdMOhbm7DrSwgbmFzdGF2w61tIGZvY3VzIG5hIHBvbMOtxI1rbyBhIHpvYnJhesOtbSBjaHlib3ZvdSBobMOhxaFrdVxyXG4gICAgICAgIC8vICAgIGlmIChkYXRhVnJhdGt5LmJ1X2NpPy50cmltKCkubGVuZ3RoID09IDAgfHwgZGF0YVZyYXRreS5idV9jaSA9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGlmICghKGRhdGFWcmF0a3kuenAgPT0gMTAgfHwgZGF0YVZyYXRreS56cCA9PSA1MCB8fCBkYXRhVnJhdGt5LnpwID09IDUxIHx8IGRhdGFWcmF0a3kuenAgPT0gNTIgfHwgZGF0YVZyYXRreS56cCA9PSA1MyB8fCBkYXRhVnJhdGt5LnpwID09IDU0IHx8IGRhdGFWcmF0a3kuenAgPT0gNDIgfHwgZGF0YVZyYXRreS56cCA9PSA3MykpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZW7DrSB2eWJyw6FuIGJhbmtvdm7DrSDDusSNZXQgcMWZw61qZW1jZSFcIilcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwiYnVfY2lcIikuZ2ZpZWxkKCdmb2N1cycpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy9rb250cm9sYSB2eXBsbmVuw60gdmxhc3Ruw61obyBCw5osIGplLWxpIHphZMOhbiBjaHlibsSbLCB1a29uxI3DrW0gbmHEjcOtdMOhbm7DrSwgbmFzdGF2w61tIGZvY3VzIG5hIHBvbMOtxI1rbyBhIHpvYnJhesOtbSBjaHlib3ZvdSBobMOhxaFrdVxyXG4gICAgICAgIC8vICAgIGlmIChkYXRhVnJhdGt5LmJ1X3ZsPy50cmltKCkubGVuZ3RoID09IDAgfHwgZGF0YVZyYXRreS5idV92bCA9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lbsOtIHZ5YnLDoW4gYmFua292bsOtIMO6xI1ldCB2bGFzdG7DrSFcIilcclxuICAgICAgICAvLyAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcImJ1X3ZsXCIpLmdmaWVsZCgnZm9jdXMnKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vICAgIGlmIChkYXRhVnJhdGt5LnpwID09IDczKSB7IC8vVnJhY8OtIHNlIHBlbsOtemUgeiBwbGF0YnkgcMWZZXMgcG9ydMOhbCBhIGV4aXN0dWplIHBsYWJhIFBPS1xyXG4gICAgICAgIC8vICAgICAgICBpZiAodGhhdC5SZWNWcmF0a2EuaXhwX3Bvaz8udHJpbSgpLmxlbmd0aCAhPSAxMikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIlRlbnRvIHpwxa9zb2Igw7pocmFkeSB2cmF0a3kgamUgbW/Fvm7DvSBwb3V6ZSBwxZlpIHZyYWNlbsOtIHBsYXRieSBwbGFjZW7DqSBwxZllcyBwbGF0ZWJuw60gcG9ydMOhbCFcIilcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwienBcIikuZ2ZpZWxkKCdmb2N1cycpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgIH0gZWxzZSB7IGRhdGFWcmF0a3kuaXhwX3BvayA9IHRoYXQuUmVjVnJhdGthLml4cF9wb2s7IH1cclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgaWYgKHRoYXQuRHRvVHlwUGhsLnByaXpfbmFwdnJhID09IDAgJiYgZGF0YVZyYXRreS5kYXRfdnpuaWt1ISA8PSB0aGF0LkR0b1R5cFBobC5OYXN0YXZlbmk/LmRhdF91emF2ISkge1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJaYWTDoW5vIGRhdHVtIHZ6bmlrdSB2IHV6YXbFmWVuw6ltIG9iZG9iw60hXCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJ6YWtsYWRuaUluZm9Gb3JtXCIpLmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpLmdmaWVsZCgnZm9jdXMnKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vICAgIC8vVE9ETzogS29udHJvbGEgdnlwbG7Em27DrSBwb2xvxb5reSBTTUwgcG9kbGUgcMWZw616bmFrdSBuYSBCVV9WTFxyXG4gICAgICAgIC8vICAgIC8vSWYgZ2ZfQnVWbE1hUHJpem5ha1NSKGRmX2J1X3ZsLmJ1X3ZsKCksIGRmX2J1X3ZsLnNrX3ZsKCksIGdfdHlwX3BvaGxlZGF2a3kucm9rKVxyXG4gICAgICAgIC8vICAgIC8vXHRJZiBkZl9wb2xvemthX3NtbC5KZVByYXpkbnkoKVxyXG4gICAgICAgIC8vICAgIC8vXHRcdENhbGwgZ2ZfWm9icmF6Q2h5YnUoJ05lbsOtIHZ5cGxuxJtuYSBwb3Zpbm7DoSBwb2xvxb5rYSEnKVxyXG4gICAgICAgIC8vICAgIC8vXHRcdENhbGwgU2FsU2V0Rm9jdXMoZGZfcG9sb3prYV9zbWwpXHJcbiAgICAgICAgLy8gICAgLy9cdFx0UmV0dXJuIDBcclxuICAgICAgICAvLyAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyAgICAvL1RPRE86IEtvbnRyb2xhIMW+ZSBuYSBwb2xvxb5jZSBTTUwgamUgc3Rlam7DvSB2bGFzdG7DrSBiYW5rb3Zuw61tIMO6xI1ldCBqYWtvIG5hIHZyYXRjZVxyXG4gICAgICAgIC8vICAgIC8vSWYgTk9UIGRmX3BvbG96a2Ffc21sLkplUHJhemRueSgpXHJcbiAgICAgICAgLy8gICAgLy9cdENhbGwgZ2ZfVnJhdFVjZXRaUG9sb3preVNNTChsX2l4cF9zbWwsIGxfcm9rX3NtbCwgbF9jaXNsb19zbWwsIGxfYnVfdmxfc21sLCBsX3NrX3ZsX3NtbClcclxuICAgICAgICAvLyAgICAvL1x0SWYgbF9idV92bF9zbWwgIT0gbF9idV92bCBPUiBsX3NrX3ZsX3NtbCAhPSBsX3NrX3ZsXHJcbiAgICAgICAgLy8gICAgLy9cdFx0Q2FsbCBnZl9ab2JyYXpDaHlidSgnTmVzb3VobGFzw60gYmFua292bsOtIMO6xI1ldCB2bGFzdG7DrSBhIGJhbmtvdm7DrSDDusSNZXQgcG9sb8W+a3kgU01MXHJcbiAgICAgICAgLy8gICAgLy9cclxuICAgICAgICAvLyAgICAvL1x0XHRcdFx0UG9sb8W+a2Egc21sb3V2eTogJ3x8IGxfYnVfdmxfc21sfHwnIC8gJ3x8bF9za192bF9zbWwgfHwnXHJcbiAgICAgICAgLy8gICAgLy9cdFx0XHRcdFZyYXRrYTogJ3x8ZGZfYnVfdmwuYnVfdmwoKXx8JyAvICd8fGRmX2J1X3ZsLnNrX3ZsKCl8fCdcclxuICAgICAgICAvLyAgICAvL1xyXG4gICAgICAgIC8vICAgIC8vXHRcdFx0XHRWcmF0a3UgbmVsemUgdWxvxb5pdCEnKVxyXG4gICAgICAgIC8vICAgIC8vXHRcdENhbGwgU2FsU2V0Rm9jdXMoZGZfcG9sb3prYV9zbWwpXHJcbiAgICAgICAgLy8gICAgLy9cdFx0UmV0dXJuIDBcclxuICAgICAgICAvLyAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyAgICAvL0tvbnRyb2xhIHpkYSBWUyBvYnNhaHVqZSBjZWzDqSDEjcOtc2xvXHJcbiAgICAgICAgLy8gICAgY29uc3QgaXNWYWxpZEludGVnZXIgPSAvXlxcZCskLztcclxuICAgICAgICAvLyAgICBpZiAoIWlzVmFsaWRJbnRlZ2VyLnRlc3QoZGF0YVZyYXRreS52cyEudHJpbSgpKSkge1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJDaHlibsSbIHphZGFuw70gVlMhXCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJ6YWtsYWRuaUluZm9Gb3JtXCIpLmZpbmRGaWVsZHMoXCJ2c1wiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy9Lb250cm9sYSBFeHRlcm7DrWhvIHN1Ympla3R1IChpeHNfZXN1KVxyXG4gICAgICAgIC8vICAgIGlmIChkYXRhVnJhdGt5Lml4c19lc3UgPT0gJzAwMDBTRTAwMDAwTScpIHsgLy9UT0RPIGHFviBidWRlIGdsb2IuIHByb23Em25uw6EgcHJvIG51bGxJeHNFc3UgdGFrIHDFmWVwc2F0XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lbsOtIHphZMOhbiBzdWJqZWt0IVwiKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gICAgLy9Lb250cm9sYSB6ZGEgcMWZaSB6dm9sZW7DqSBtb8W+bm9zdGkgxb5lIHNlIHMgdnJhdGtvdSBtw6Egdnl0dm/FmWl0IHRha8OpIHDFmWVkcGlzIGplIHZ5cGxuxJtuw6kgcG9sw63EjWtvIGthdGVnb3JpZSDDusSNLiBwb2h5YnVcclxuICAgICAgICAvLyAgICBpZiAoZGF0YVZyYXRreS5wcmVkcGlzVGFreSA9PSB0cnVlICYmIGRhdGFWcmF0a3kua3RnX3Vwb19wcmUgPT0gMCkge1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJWeWJlcnRlIGthdGVnb3JpaSBwb2h5YnUgcHJvIHDFmWVkcGlzIVwiKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiemFrbGFkbmlJbmZvRm9ybVwiKS5maW5kRmllbGRzKFwia3RnX3Vwb19wcmVcIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vICAgIC8vVG9kbzogcG9rdWQgc2UgamVkbmEgbyB2cmF0a3UgZG8gY2l6aW55IG5lYm8gdiBjaXppIG1lbmUgdGFrIGplc3RlIGJ1ZG91IHRyZWJhIHVwcmVzbnVqaWNpIHVkYWplXHJcbiAgICAgICAgLy8gICAgLy9pZiAoc3RhdEJVICE9IDQyIHx8IGRhdGFWcmF0a3kubWVuYSAhPSAwKSB7XHJcbiAgICAgICAgLy8gICAgLy8vLyAgVE9ETzogb3RldsWZZXNlIGRvcGzFiHVqw61jw60gb2tubyBkbGdaYWhQbGFcclxuICAgICAgICAvLyAgICAvLy8vIC4uLi4gZGlhbG9nIG1lbmkgaG9kbm90eSwgdGFrIHNpIGplIHJhZHNpIHpub3Z1IG5hc3RhdmltIGRvIGZvcm11bGFyZS4uLiAoTmFzdGF2UG9sZSgpKS4uLlxyXG4gICAgICAgIC8vICAgIC8vfVxyXG4gICAgICAgIC8vICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vICAgIC8vI2VuZHJlZ2lvbiBGdW5jdGlvbjogS29udHJvbGFQb2xpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIHprb250cm9sdWpWcmF0a3VcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEZpbmFuxI1uw60ga29udHJvbGFcclxuXHJcbiAgICAgICAgLy9iZWZvcmVGS1BvZGFuaShpeHA6IHN0cmluZywga3RnX3R5cDogbnVtYmVyLCByb2s6IG51bWJlcik6IEpRdWVyeVByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgLy8gICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzLnBhcmVudENvbnRlbnQ7XHJcblxyXG4gICAgICAgIC8vICAgIC8vdGhpcy5ncmlkVnJhdGt5LmdncmlkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuXHJcbiAgICAgICAgLy8gICAgLy9sZXQgcG9sb3preURUTyA9IHRoaXMuZ3JpZFZyYXRreS5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoZmFsc2UpO1xyXG4gICAgICAgIC8vICAgIC8vdmFyIGRhdGFWcmF0a3k6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0byA9IHRoYXQuZHRvUHJlZHBpcyA/PyB7fTtcclxuICAgICAgICAvLyAgICB2YXIgcG9sb3preURUTzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvID0ge307XHJcbiAgICAgICAgLy8gICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBwb2xvemt5RFRPKTtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IGl4c0VzdSA9IHRoYXQhLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIC8vICAgIC8vbGV0IHBvcGlzID0gdGhhdCEuZmluZEZpZWxkcyhcImZvcm1Qb3Bpc0ZpZWxkXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIC8vICAgIC8vRVNVXHJcbiAgICAgICAgLy8gICAgLy9pZiAoaXhzRXN1Lml4c19lc3UgPT09IG51bGwgfHwgaXhzRXN1Lml4c19lc3UgPT0gXCIwMDAwU0UwMDAwME1cIikge1xyXG5cclxuICAgICAgICAvLyAgICAvLyAgICAvL27Em2rDoWvDqSBvem7DoW1lbsOtXHJcbiAgICAgICAgLy8gICAgLy8gICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwgeyBpZDogXCJpZEZpbktvbnRyb2xhXzFcIiwgdGl0bGU6IFwiXCIsIGNvbnRlbnQ6IFwiSmUgbnV0bsOpIHZ5cGxuaXQgZXh0ZXJuw60gc3ViamVrdCFcIiB9KTtcclxuICAgICAgICAvLyAgICAvLyAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgLy8gICAgLy8vL1Bva2xhZG7DrSBwb2xvxb5reVxyXG4gICAgICAgIC8vICAgIC8vaWYgKHBvbG96a3lEVE8ubGVuZ3RoIDwgMSkge1xyXG5cclxuICAgICAgICAvLyAgICAvLyAgICB0aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBcImlkRmluS29udHJvbGFfMlwiLCB0aXRsZTogXCJcIiwgY29udGVudDogXCJQb2tsYWRuw60gZG9rbGFkIG5lbcOhIHBvbG/Fvmt5IVwiIH0pO1xyXG4gICAgICAgIC8vICAgIC8vICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5yZXNvbHZlKGt0Z190eXApLnByb21pc2UoKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIE9CU09MRVRFIG1ldG9keVxyXG5cclxuICAgICAgICAvLy8vI3JlZ2lvbiBBS0NFIFJFQUxJWk9WQVRcclxuICAgICAgICAvL2lmICh0aGF0LlBhcmFtcy5kZHBfdnJhX3pqZWRubyAhPSBcIjFcIikge1xyXG4gICAgICAgIC8vICAgIGlmICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXJlYSA9PSAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQucGVybXNEdG8uYWN0UmVhbGl6b3ZhdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQucGVybXNEdG8uYWN0UmVhbGl6b3ZhdCA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIGlmICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXJlYSA9PSAyICYmIHRoYXQuRHRvVnJhdGthLml4c19mdW5fYWt0ICE9IHRoYXQuSXhzRnVuKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQucGVybXNEdG8uYWN0UmVhbGl6b3ZhdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQucGVybXNEdG8uYWN0UmVhbGl6b3ZhdCA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFJlYWxpem92YXQgPSB0cnVlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vaWYgKHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yICE9IDIwKSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RSZWFsaXpvdmF0ID0gZmFsc2VcclxuICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RSZWFsaXpvdmF0ID0gdHJ1ZVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLyNyZWdpb24gQUtDRSBWUkFUSVRcclxuICAgICAgICAvL2lmICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXJlYSA9PSAwKSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RWcmF0aXQgPSBmYWxzZTtcclxuICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RWcmF0aXQgPSB0cnVlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vaWYgKHRoYXQuUGFyYW1zLmRkcF9yYWRfdnJhcmVhID09IDIgJiYgdGhhdC5EdG9WcmF0a2EuaXhzX2Z1bl9ha3QgIT0gdGhhdC5JeHNGdW4pIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFZyYXRpdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFZyYXRpdCA9IHRydWU7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9pZiAodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgIT0gMjApIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFZyYXRpdCA9IGZhbHNlXHJcbiAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgIC8vICAgIHRoYXQucGVybXNEdG8uYWN0VnJhdGl0ID0gdHJ1ZVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLyNyZWdpb24gQUtDRSBTQ0hWw4FMSVRcclxuICAgICAgICAvL2lmICh0aGF0LlBhcmFtcy5kZHBfdnJhX3pqZWRubyAhPSBcIjFcIikge1xyXG4gICAgICAgIC8vICAgIGlmICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXJlYSA9PSAwKSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RTY2h2YWxpdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFNjaHZhbGl0ID0gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2lmICh0aGF0LlBhcmFtcy5kZHBfcmFkX3ZyYXJlYSA9PSAyICYmIHRoYXQuRHRvVnJhdGthLml4c19mdW5fYWt0ICE9IHRoYXQuSXhzRnVuKSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RTY2h2YWxpdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFNjaHZhbGl0ID0gdHJ1ZTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RTY2h2YWxpdCA9IHRydWU7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9pZiAodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgIT0gMCAmJiB0aGF0LkR0b1ZyYXRrYS5zdGF2X3BvciAhPSAxMCkge1xyXG4gICAgICAgIC8vICAgIHRoYXQucGVybXNEdG8uYWN0U2NodmFsaXQgPSBmYWxzZVxyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFNjaHZhbGl0ID0gdHJ1ZVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vaWYgKHRoYXQuRHRvVnJhdGthLnpwID09IDApIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFNjaHZhbGl0ID0gZmFsc2VcclxuICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RTY2h2YWxpdCA9IHRydWVcclxuICAgICAgICAvL31cclxuICAgICAgICAvLy8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8jcmVnaW9uIEFLQ0UgU1RPUk5PXHJcbiAgICAgICAgLy9pZiAoISgodGhhdC5EdG9WcmF0a2Euc3Rhdl9wb3IgPT0gMCB8fCB0aGF0LkR0b1ZyYXRrYS5zdGF2X3BvciA9PSAxMCkgfHwgKHRoYXQuRHRvVnJhdGthLnN0YXZfcG9yID09IDMwICYmICh0aGF0LkR0b1ZyYXRrYS5zX3VocnAgPT0gMjMgfHwgdGhhdC5EdG9WcmF0a2Euc191aHJwID09IDAgfHwgdGhhdC5EdG9WcmF0a2Euc191aHJwID09IDUgfHwgdGhhdC5EdG9WcmF0a2Euc191aHJwID09IDIwKSkpKSB7XHJcbiAgICAgICAgLy8gICAgdGhhdC5wZXJtc0R0by5hY3RTdG9ybm8gPSBmYWxzZVxyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICB0aGF0LnBlcm1zRHRvLmFjdFN0b3JubyA9IGZhbHNlXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8vLyNlbmRyZWdpb25cclxuXHJcbiAgICB9XHJcbn0iXX0=