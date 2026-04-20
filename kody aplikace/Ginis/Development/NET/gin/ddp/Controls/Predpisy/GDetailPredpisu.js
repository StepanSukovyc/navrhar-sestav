"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDetailPredpisu.ts                        </Name>
//    <Description> Okno pro zobrazení detailu předpisu a jeho a vytvoření/editaci </Description>
//    <Author>      Hanus                                                          </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                               </Copyright>
//    <Created>     2022-04-25                                                     </Created>
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
            let GDetailPredpisu = 
            /**
             * Okno pro detail předpisu a jeho a vytvoření/editaci
             * @author Martin Hanuš
             * @copyright   © GORDIC spol. s r. o. 1993-2024
             * @created 2022-04-25
             * @lastModified 2024-11-27
             */
            class GDetailPredpisu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.kont_splvzn = this["kont_splvzn"];
                    //---
                    //private recapDPH: GContent<Gordic.Gin.WebClient.recapDPH>;
                    this.prvniNastaveni = true;
                    /** Ikony Lhůt */
                    this.ikonaLhuty = WebClient.Common.Prefabs.Icons.GetLhutaIcons();
                    //#region "Staré načtení dat na TS"
                    //!-----Načtení případu
                    //that.isl.Pripad.read(rq => {
                    //    return {
                    //        data: { ixp: that.Ixp },
                    //        //fragments: ["*"]
                    //        fragments: ["*", "ExterniSubjekt.Default", "Uroceni.*"]
                    //    }
                    //})
                    //    .get().done((data) => {
                    //        this.modelPripadu = data.data;
                    //        this.loadedData(); //<--- kontorla zda se načetlo již vše
                    //        //var dto = data.data
                    //        //this.element.findForms("formHeader").findFields().gfield("model", "apply", dto);
                    //        //this.element.findForms("novyPredpisForm").findFields("ixp").gfield("model", "apply", dto.ixp);
                    //        //this.element.findForms("novyPredpisForm").findFields("bu_vl").gfield("model", "apply", dto.bu_vl);
                    //        //this.element.findForms("novyPredpisForm").findFields("sk_vl").gfield("model", "apply", dto.sk_vl);
                    //        //if (!this.Edit) {
                    //        //    this.element.findForms("novyPredpisForm").findFields("mena").gfield("model", "apply", dto.mena);
                    //        //}
                    //        //this.element.find('.gfield:not(.ui-state-disabled)').first().gfield('focus');
                    //    })
                    //!-----Načtení údajů o typu pohledávky (příznaky případu)
                    //var promise = that.isl.TypPohledavky.read(rq => {
                    //    return {
                    //        data: {
                    //            typ_phl: that.Typ_phl,
                    //            Nastaveni: that.ucs == null ? undefined : {
                    //                rok: that.rok,
                    //                ucs: that.ucs,
                    //                ico: that.ico
                    //            }
                    //        },
                    //        fragments: ["*", "Nastaveni.*"]
                    //    };
                    //}).get();
                    //promise.done((data) => {
                    //    that.modelPhl = data.data;
                    //    that.loadedData(); //<--- kontorla zda se načetlo již vše
                    //    //that.element.findForms("novyPredpisForm").findFields().gfield("model", "apply", that.modelPhl);
                    //});
                    //if (that.Ixp != null) {
                    //    if (that.Edit) {
                    //        //!-----Načtení údajů o Případu-předpisu
                    //        that.isl.Predpisy.read(rq => {
                    //            return {
                    //                data: { ixp: that.Ixp, radek_uhr: that.Radek_uhr },
                    //                //fragments: ["*"]
                    //                fragments: ["Default", "Extended"]
                    //            }
                    //        })
                    //            .get().done((data) => {
                    //                that.modelPredpisu = data.data;
                    //                that.loadedData(); //<--- kontorla zda se načetlo již vše
                    //                //var dto = data.data
                    //                //that.element.findForms("novyPredpisForm").findFields().gfield("model", "apply", dto);
                    //                //that.poZmeneSubjektu(data.data.ixs_esu)
                    //            })
                    //    } else {
                    //        //todo: Nastavit Načtení řádku nového předpisu pouze při založeni, ne při detailu!
                    //        //!-----Načtení řádku nového předpisu
                    //        var radek = that.isl.Predpisy.nactiRadekPredepisu(rq => {
                    //            return {
                    //                i_ixp: that.Ixp
                    //            }
                    //        }).get();
                    //        radek.done((data) => {
                    //            //that.element.findForms("novyPredpisForm").findFields("radek_uhr").gfield("model", "apply", data);
                    //            that.modelPredpisu.radek_uhr = data;
                    //            //that.element.findForms("novyPredpisForm").findFields().gfield("model", "apply", that.modelPredpisu);
                    //        });
                    //    }
                    //}
                    //#####PERMISSION#####
                    //TODO: přidat na stranu CS ? or smt like this...
                    //if (that.modelPripadu.ixs_fun_akt != this.ixsFun)
                    //    var chyba = "Nejste zpracovatelem dokumentu!"; //todo Chyba
                    //####################
                    //#endregion "Staré načtení dat na TS"
                    //#endregion Testovací metody
                }
                //#endregion Definice vstupních dat
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    that.beginOperation("Načítám data...");
                    that.createActions();
                    that.createMainButtons();
                    that.createHeaderForm();
                    that.createMainForm();
                    WebClient.Common.Base.nastaveniPoleKtgUpo(that, that.IxpDen, that.Typ_phl);
                    that.loadSazbaAndKurz();
                    that.loadedData();
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření akcí na Detailu předpisu
                 * @method createActions()
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            //akce, která je spuštěna po zmáčknutí kombinace. Pokud akce není enabled, není enabled ani zkratka.
                            name: "openTabVyberRozhodnutiAct",
                            caption: "Vybrat rozhodnutí",
                            tooltip: "Vybrat rozhodnutí",
                            disabled: !that.permsDto.rozhodnuti,
                            run: () => {
                                var windowOption = { title: `Výběr rozhodnutí případu ${this.Ixp}`, width: 1000, height: 600 };
                                var ParamJSON = { ID: "DDPGVyberRozhodnuti#", Ixp: this.Ixp };
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GVyberRozhodnuti", ParamJSON, windowOption)
                                    .on("close", (ev, retVal) => {
                                    that.findForms("novyPredpisForm").findFields("rozhodnuti").gfield("setValue", retVal);
                                    console.log(retVal);
                                });
                            }
                        },
                        {
                            name: "openTabPopisAct",
                            caption: "Výběr popisu",
                            tooltip: "Výběr popisu",
                            disabled: !that.permsDto.popis,
                            run: () => {
                                var popis = that.findForms("novyPredpisForm").findFields("popis").gfield("getValue");
                                var windowOption = { title: "Detail popisu", width: 975, height: 650 };
                                var ParamsJSON = { ID: "DDPGPopisy#", Popis: popis, Okno: "predpis" };
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPopisy", ParamsJSON, windowOption)
                                    .on("close", (ev, retVal) => {
                                    if (retVal != undefined)
                                        that.findForms("novyPredpisForm").findFields("popis").gfield("setValue", retVal);
                                });
                            }
                        },
                        {
                            name: "openTabVypocetPredpisuAct",
                            caption: "Výpočet předpisu",
                            tooltip: "Otevření okna pro výpočet předpisu",
                            disabled: !that.permsDto.c,
                            run: () => {
                                var windowOption = { title: "Výpočet předpisu", width: 500, height: 710 };
                                var ParamJSON = {
                                    ID: "DDPGVypocetPredpisu#",
                                    //Ip_sazba: "",
                                    Ip_vyse: this.modelPripadu.c_mena,
                                    //Ip_predepsano: "",
                                    Ip_dat_od: this.modelPripadu.dat_od,
                                    Ip_dat_do: this.modelPripadu.dat_do,
                                    //Ip_rok: this.modelPhl,
                                };
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GVypocetPredpisu", ParamJSON, windowOption)
                                    .on("close", (ev, retVal) => {
                                    if (retVal) {
                                        that.findForms("novyPredpisForm").findFields("c").gfield("setValue", retVal);
                                    }
                                    //console.log(retVal);
                                });
                            }
                        },
                        {
                            name: "openTabZadaniDphAct",
                            caption: "Zadání DPH",
                            tooltip: "Otevření okna pro zadání DPH",
                            disabled: !that.permsDto.c,
                            run: () => {
                                var windowOption = { title: "Zadání DPH", width: 500, height: 500 };
                                var ParamJSON = { ID: "DDPGZadaniDph#", Ixp: this.Ixp, Typ_phl: this.Typ_phl, };
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GZadaniDph", ParamJSON, windowOption)
                                    .on("close", (ev, retVal) => {
                                    //debugger; //?------------------------------- Kontrola návratových hodnot z okna pro zadání DPH
                                    //defaultForm.findForms("novyPredpisForm").findFields("rozhodnuti").gfield("setValue", retVal);
                                    if (retVal) {
                                        let retSazba = retVal.sazba;
                                        let retZaklad = retVal.zaklad;
                                        let retDan = retVal.dan;
                                        let retZao = retVal.zao;
                                        let retCelkem = retZaklad.plus(retDan);
                                        that.findForms("novyPredpisForm").findFields("c").gfield("setValue", retCelkem);
                                        //defaultForm.findForms("novyPredpisForm").findFields("c_mena").gfield("setValue", retVal.sazba);
                                        //defaultForm.findForms("novyPredpisForm").findFields("c").gfield("setValue", retVal.zaklad);
                                        //defaultForm.findForms("novyPredpisForm").findFields("c_mena").gfield("setValue", retVal);
                                        //defaultForm.findForms("novyPredpisForm").findFields("c_mena").gfield("setValue", retVal);
                                    }
                                    //TODO odchytit hodnoty a nastavit je! 
                                });
                            }
                        },
                        {
                            name: "actPredpisySeznamUkonu",
                            caption: "Seznam úkonů",
                            tooltip: "Otevřít seznam úkonů pro předpis",
                            run: () => {
                                const content = this;
                                var data = that.modelPredpisu;
                                content.findForms("novyPredpisForm").findFields().gfield("model", "collect", data);
                                if (data.dat_spl != null && data.ktg_upo != null && data.pri_uhr != null) {
                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSeznamUkonu", {
                                        ID: "#DDPGSeznamUkonu#",
                                        Ixp: content.Ixp,
                                        Radek_uhr: content.Radek_uhr,
                                        Dat_spl: data.dat_spl,
                                        Ktg_upo: data.ktg_upo,
                                        Pri_uhr: data.pri_uhr,
                                        //Ixs_lhu: data.ixs_lhu
                                    }, `Nastavení úkonů pro běh lhůty předpisu`, 800, 600); //TODO: otestovat a anstavit velikost okna...
                                }
                            }
                        },
                        {
                            name: "actRozhodnutiDetail",
                            caption: "Detail rozhodnutí",
                            tooltip: "Detail vybraného rozhodnutí",
                            run: (ev, ctx) => {
                                var rozhod = this.findForms("novyPredpisForm").findFields("rozhodnuti").gfield("getValue");
                                that.isl.PripadRozhodnuti.kontrolaExistenceRozhodnuti(rq => {
                                    return {
                                        i_ixp: this.Ixp,
                                        i_rozh: rozhod ?? 0
                                    };
                                })
                                    .get()
                                    .done((data) => {
                                    if (data != 1) {
                                        return that.dialogs.error("Chyba", "Nebylo vybrané platné rozhodnutí");
                                    }
                                    else {
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadRozhodnuti", {
                                            ID: "DDPGPripadRozhodnuti#", Ixp: this.Ixp, Rozhodnuti: rozhod, editMode: true
                                        }, "Detail rozhodnutí", 610, 450)
                                            .on("close", () => {
                                            //this.viewRozhodnuti.requestData();
                                            //that.zmenaPole();
                                        });
                                    }
                                });
                            }
                        },
                        //{
                        //    name: "actDateToday",
                        //    caption: "Doplni aktualní datum",
                        //    tooltip: "Doplni aktualní datum",
                        //    run: function (ev) {
                        //        //$(ev.target).gfield("setValue", new Date())                      
                        //        var field = $(ev.target);
                        //        var dnes = new Date(); 
                        //        field.closest(".gfield").gfield("setValue", dnes);
                        //    }
                        //}
                    ]);
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření spodních tlačítek okna
                 * @method createMainButtons()
                 */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSaveOnly",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            enabled: that.permsDto.save, // || true,
                            run: function () {
                                //return that.dialogs.alert("SaveOnly");
                                that.ok(0);
                            }
                        }),
                        new GAction({
                            name: "actSaveNext",
                            caption: "Uložit a podat další",
                            icon: "fa-floppy-o",
                            enabled: that.permsDto.save, // || true,
                            run: function () {
                                //return that.dialogs.alert("actSaveNext");
                                that.ok(2);
                            }
                        }),
                        new GAction({
                            name: "actSaveClose",
                            caption: "Uložit a zavřít",
                            icon: "fa-floppy-o",
                            enabled: that.permsDto.save, // || true,
                            run: function () {
                                //return that.dialogs.alert("SaveOnly");
                                that.ok(1);
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                //return that.dialogs.alert("SaveOnly");
                                that.closing(); // that.close(false);
                            }
                        }),
                        //new GAction({
                        //    name: "actReLoad",
                        //    caption: "Načíst",
                        //    icon: "fa-repeat",
                        //    run: function () {
                        //        return that.dialogs.alert("SaveOnly");
                        //    }
                        //})
                    ]);
                    //that.commandBar(that.actions.createBar(["actReLoad"],["actSaveOnly!", "actSaveNext", "actSaveClose", "actClose"]));
                    that.commandBar([
                        //{ action: that.actions["actReLoad"], position: "left" },
                        { action: that.actions["actSaveOnly"], position: "right", primary: true },
                        //{ action: that.actions["actSaveNext"], position: "right" },
                        { action: that.actions["actSaveClose"], position: "right" },
                        { action: that.actions["actClose"], position: "right" }
                    ]);
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření formuláře hlavičky dokumentu
                 * @method createHeaderForm()
                 * @returns Formulář hlavičky dokumentu
                 */
                createHeaderForm() {
                    var that = this;
                    //Definice Header Formu (údaje o případu)
                    let formSetup = {};
                    let hForm = new Gordic.Forms.Form()
                        //SEKCE 0
                        .addSection()
                        //ROW 0
                        .addRow("Agendové číslo")
                        .addField("gstringbox", "w-12", {
                        name: "ac", //agendové číslo
                        disabled: true, // !that.permsDto.ac, //hlavvička vždycky TRUE
                    })
                        //ROW 1
                        .addRow("Datum evidence")
                        .addField("gdatebox", "w-12", {
                        name: "dat_evid", //datum evidence
                        disabled: true, // !that.permsDto.dat_evid, //hlavvička vždycky TRUE
                    })
                        //ROW 2
                        .addRow("Variablilní symbol")
                        .addField("gstringbox", "w-12", {
                        name: "vs_pripadu", //vs
                        disabled: true, // !that.permsDto.vs, //hlavvička vždycky TRUE
                    })
                        //ROW 3
                        .addRow("Typ dokladu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ", //typ dokladu
                        disabled: true, // !that.permsDto.ixs_typ, //hlavvička vždycky TRUE
                        model: "model.ixs_typ=value.ixs_typ"
                    });
                    //Podmínky pro zobrazení správce podle příznaku priz_spr
                    //if (this.priz_spr == 0) {
                    hForm
                        //sekce 1
                        .addSection()
                        //ROW 0
                        .addRow("Typ pohledávky") //ddpstpp.priz_spr != 1
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        disabled: true, // !that.permsDto.typ_phl, //hlavvička vždycky TRUE
                        model: "model.typ_phl=value.typ_phl",
                    })
                        //ROW 1
                        .addRow("Správce")
                        .addField("gstringbox", "w-12", {
                        name: "cis_spr",
                        disabled: true, // !that.permsDto.cis_spr, //hlavvička vždycky TRUE
                    });
                    //}
                    //======================================================
                    hForm
                        //ROW 2
                        .addRow(that.DbParams.ddp_rdk_naz ?? "Řádek")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ciselnikRadku(), {
                        name: "ddp_radek",
                        disabled: true, // !that.permsDto.ddp_radek, //hlavvička vždycky TRUE
                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_radek=value.ddp_radek",
                        serverFilters: {
                            ixp_den: this.modelPripadu.ixp_den,
                            typ_phl: this.Typ_phl
                        }
                    })
                        //ROW 3
                        .addRow(that.DbParams.ddp_ctv_naz ?? "Čtvrť")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ciselnikCtvrti(), {
                        name: "ddp_ctvrt",
                        disabled: true, // !that.permsDto.ddp_ctvrt, //hlavvička vždycky TRUE
                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_ctvrt=value.ddp_ctvrt",
                        serverFilters: {
                            ixp_den: this.modelPripadu.ixp_den,
                            typ_phl: this.Typ_phl
                        }
                    })
                        //ROW 4
                        //.addField("gstringbox", "w-12", { name: "ExterniSubjekt.esu_txt" })
                        /* https://xwiki.gordic.cz/NET/javascript/Gordic/Esu/Prefabs/#HvyberEsu */
                        //.addRow("Adresa")
                        //.addField("gselectbox", {
                        //    name: "ixs_esu",
                        //    validators: [new Gordic.Validators.Required()],
                        //    //change: function (ev: any, changeObj: any) { Editovano = true },
                        //    model: "ixs_esu=ixs_esu;esu_dic=dic;esu_ico=ico,esu_rc=rc"
                        //},
                        //    Gordic.Esu.Prefabs.vyberEsu({
                        //        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,                                   // přidání prefabu   
                        //        Logovani:
                        //        {
                        //            Ixp: that.model.ixp,                                                                   // zadání logovacích údaju je nutnost hlavně IXP
                        //            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,         // vybrat z enumu
                        //            AktZnacka: (that.model.ac_ag! == null ? that.model.ixp! : that.model.ac_ag!),
                        //            DuvodHledaniTxt: "Detail předpisu DDP"
                        //        },
                        //    }) as GSelectBoxOptions<any>)
                        //.addField("gselectbox", "w-12", {
                        //    name: "ixs_esu",
                        //    disabled: true, /// !that.permsDto.ico, // podle všeho změna adresy se řeší podle iča protože v TK se ESU vybírá právě tam... 
                        //    //disabled: !(this.model.ixs_esu !== "" && this.model.dat_evid == null),
                        //    //?: V případě že je případ ve stavu NEEVIDOVÁNO, měl by být vypnutý
                        //    //!: při podání se měnit dá, po uložení se nedisable... ale při dalším otevření už to funguje
                        //    //TODO: Možná bude vyřešit další stavy při kterých by mělo být pole vypnuté/aktivní...
                        //    //validators: [new Gordic.Validators.Required()], 
                        //    change: function (ev, ctx) {                     // při změně subjektu
                        //        that.poZmeneSubjektu(ctx);                   // akce po změně subjektu
                        //        // ještě nastavím ostatní políčka spojená s poplatníkem (ESU)
                        //        //if (ctx.value.ico) that.model.ExterniSubjekt!.ico = ctx.value.ico;
                        //        //if (ctx.value.dic) that.model.ExterniSubjekt!.dic = ctx.value.dic;
                        //        //if (ctx.value.rc) that.model.ExterniSubjekt!.rc = ctx.value.rc;
                        //        ////Po změne subjektu přenastavím pole s věkem poplatníka
                        //        ////that.nastavPoleVeku();
                        //        ////Todo... možná bude potřeba zde hodit a nastavit také manipulaciu s polem přiznaku ukončení/úmrtí popl...
                        //        ////TODO: při podání nového případu... ???
                        //        //that.element.findForms().findFields()
                        //        //    .gfield("model", "apply", that.model)
                        //    },
                        //    model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                        //},
                        //    Gordic.Esu.Prefabs.vyberEsu({
                        //        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,                                   // přidání prefabu                       
                        //        Logovani:
                        //        {
                        //            Ixp: this.model.ixp ?? "",                                                                   // zadání logovacích údaju je nutnost hlavně IXP
                        //            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,         // vybrat z enumu
                        //            AktZnacka: (this.model.ac_ag! == null ? this.model.ixp! : this.model.ac_ag!),
                        //            DuvodHledaniTxt: "Detail Předpisu"
                        //        },
                        //        //FieldsToFilterpanel: [
                        //        //    Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Zkratka,
                        //        //],
                        //    }) as GSelectBoxOptions<any>)
                        /**/
                        //ROW 5
                        .addRow("Popis")
                        .addField("gstringbox", "w-12", {
                        name: "popis_pripadu",
                        disabled: true, // !that.permsDto.popis, //hlavvička vždycky TRUE
                    })
                        //SEKCE 2
                        .addSection()
                        // ROW 0
                        .addRow("Kniha")
                        .addField("gselectbox", Gordic.Prefabs.Select.kniha(), {
                        name: "ixp_den",
                        disabled: true, // !that.permsDto.ixp_den, //hlavvička vždycky TRUE
                        model: "model.ixp_den=value.ixp_den"
                    })
                        // ROW 1
                        .addRow("Zpracovatel")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt",
                        disabled: true, // !that.permsDto.ixs_fun_akt, //hlavvička vždycky TRUE
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        dropdown: true
                    })
                        // ROW 2
                        .addRow("Odpovědná osoba")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
                        name: "ixs_ref_odp",
                        disabled: true, // !that.permsDto.ixs_ref_odp, //hlavvička vždycky TRUE
                        model: "model.ixs_ref_odp=value.ixs_ref",
                        dropdown: true
                    });
                    return hForm;
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření hlavního formuláře detailu předpisu
                 * @method createMainForm()
                 */
                createMainForm() {
                    var that = this;
                    var dateValidator = new Gordic.Validators.Base();
                    var kontSplvzn = that.globalSettings.get("Global.Ddp.ObecneSettings.KontSplvzn");
                    if (kontSplvzn) {
                        dateValidator.getMessage = (value) => {
                            return "Datum vzniku předpisu je menší než datum splatnosti!";
                        };
                        // Kontrola neshody částky případu a sazby*počet
                        dateValidator.validate = (value, source) => {
                            var datSpl = that.findFields("dat_spl").gfield("getValue"); // datum splatnosti;
                            var datVzniku = that.findFields("dat_vzniku").gfield("getValue"); // datum vzniku;
                            if (datVzniku < datSpl)
                                return false;
                            else
                                return true;
                        };
                    }
                    //####################################
                    //!-----D e f i n i c e  p o l í č e k 
                    var mainForm = new Gordic.Forms.Form({ name: "novyPredpisForm", layoutDescriptor: "L2M1S1, L-2-10-0, M-12-12-0, S-12-12-0" });
                    //#region "Předpis
                    //infoForm
                    mainForm
                        .addSection({ label: "Předpis" })
                        .addRow()
                        .addText("Výše předpisu", "w-4")
                        .addText("Měna", "w-3")
                        .addText(that.globalSettings?.get("Global.Ddp.ObecneSettings.PopisCastka") ?? "Částka v CZK", "w-3") //hint: "Pro otevření okna pro Zadání DPH stisknětě <b>F6</b> <br/> Pro otevření okna pro Výpočet předpisu stisknětě <b>F4</b>"
                        .addText("Kurz", "w-2")
                        .addRow()
                        //Nastavení výše předpisu (v měně)
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_mena", //Výše předpisu
                        disabled: !that.permsDto.c_mena,
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        //initialValue: 0,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.onValidateItem("c_mena");
                                    that.PrepocistCZK();
                                    //that.zmenaPole();
                                }
                            }
                        }
                    }) // BUCDPEP.c_mena
                        //Nastavení měny
                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena", //Měna
                        disabled: !that.permsDto.mena,
                        model: "model.mena=value.mena",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        //initialValue: { mena: 0, mena_sis_aaa: 'CZK', mena_zkr: 'CZK', },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.onValidateItem("mena");                                   
                                    that.PrepoctiDleKurzu();
                                    //that.zmenaPole();
                                }
                            }
                        },
                    }) // BUCDPEP.mena <=> vas.ekocmen
                        //Nastavení částky v CZK
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c", //Částka v CZK
                        disabled: !that.permsDto.c,
                        //initialValue: 0,
                        tooltip: "Pro otevření okna pro Zadání DPH stisknětě <b>F6</b> <br/> Pro otevření okna pro Výpočet předpisu stisknětě <b>F4</b>",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.onValidateItem("c");
                                    if (that.modelPhl.priz_dph_zakl != 1 ||
                                        that.modelPhl.priz_dph_sniz != 1 ||
                                        that.modelPhl.priz_dph_sniz2 != 1 ||
                                        that.modelPhl.priz_osvob != 1 ||
                                        that.modelPhl.priz_dph2 != 0) {
                                        var form = that.element.findForms("novyPredpisForm");
                                        form.findFields("c_z0").gfield("setValue", input.value);
                                        form.findFields("c_z1").gfield("setValue", 0);
                                        form.findFields("c_z2").gfield("setValue", 0);
                                        form.findFields("c_z3").gfield("setValue", 0);
                                        //form.findFields("c_z4").gfield("setValue", 0)
                                        form.findFields("c_d0").gfield("setValue", 0);
                                        form.findFields("c_d1").gfield("setValue", 0);
                                        form.findFields("c_d2").gfield("setValue", 0);
                                        form.findFields("c_d3").gfield("setValue", 0);
                                        //form.findFields("c_d4").gfield("setValue", 0)
                                        that.PrepoctiCastkuVKorunach();
                                    }
                                    //that.zmenaPole();
                                }
                            }
                        }
                    }) // BUCDPEP.c
                        //Nastavení kurzu             
                        .addField("gnumberbox", "w-2", {
                        name: "kurz", //Kurz
                        disabled: true, //kurz by měl být vždycky needitovatelný -> TRUE
                        decimals: 4,
                        fixed: true,
                        thousandsSeparator: '',
                        returnType: "decimal",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.onValidateItem("kurz");
                                    that.PrepoctiCastkuVMene();
                                    //that.zmenaPole();
                                }
                            }
                        }
                    }) // DDPDPEP.kurz
                        .addRow()
                        .addText("Typ předpisu", "w-4")
                        .addText("Datum splatnosti", "w-3")
                        .addText("Datum vzniku", "w-3")
                        .addText("Priorita úhrady", "w-2")
                        .addRow()
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", //Typ předpisu
                        disabled: !that.permsDto.ktg_upo,
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        //initialValue: { ktg_upo: 100 },
                        //defaultValue: { ktg_upo: 100 },
                        dropdown: false,
                        helperColumns: ["ktg_upo", "ktg_upo_txt"],
                        serverFilters: {
                            ktg_upo: WebClient.Common.Base.naplneniPoleKtgUpoPre(0, 199)
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                that.zmenaPole();
                                //        if (input.value != null) {
                                //            //that.onValidateItem("ktg_upo");
                                //            var ktg: number = Number(input.value);
                                //            var priUhr = 0;
                                //            that.isl.Predpisy.vratPriorituUhrady(rq => {
                                //                return {
                                //                    prip: that.modelPripadu,
                                //                    ktg: ktg,
                                //                    tPRok: that.modelPhl.Nastaveni?.rok ?? new Date().getFullYear(),
                                //                }
                                //            }).get().done((data) => { priUhr = data });
                                //            var form = that.element.findForms("novyPredpisForm");
                                //            form.findFields("pri_uhr").gfield("setValue", priUhr);
                                //        }
                            }
                        }
                    }) // BUCDPEP.ktg_upo 
                        //.addField("gstringbox", { name: "ktg_upo_txt" }) // fuccupo.ktg_upo_txt -------------------------- nevím odkud vzít txt
                        //Nastavení Datum splatnosti
                        .addField("gdatebox", "w-3", {
                        name: "dat_spl", //Datum splatnosti
                        disabled: !that.permsDto.dat_spl,
                        flag: "required", validators: [new Gordic.Validators.Required(), dateValidator],
                        change: function (ev, input) {
                            //if (input.value != null) {
                            //    console.log("Jsem tady");
                            //    var ret = that.jeDatumVeVymahanemOdobi(input.value);
                            //    console.log(ret);
                            //}
                            //console.log("už tam nejsem");
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //xvar inputYear = input.value.getFullYear() ?? new Date().getFullYear()
                                    //that.onValidateItem("dat_spl");
                                    var TP_rok = that.modelPhl.Nastaveni?.rok ?? new Date().getFullYear();
                                    if (that.DbParams.ddp_chk_spl > -1 &&
                                        (input.value.getFullYear() - TP_rok) > that.DbParams.ddp_chk_spl) {
                                        GDlg.error("Zadané datum splatnosti je mimo kontrolovaný interval!");
                                        //todo Zapsat resourceText: Zadané datum splatnosti je mimo kontrolovaný interval!
                                        //todo: nabídnout znovu výběr data spl. || popř. vložit date.NOW ??
                                        //!Return FALSE
                                    }
                                }
                                that.findFields("dat_vzniku").gfield("validate");
                                that.findFields("dat_spl").gfield("validate");
                                //that.zmenaPole();
                            }
                        }
                    }) // BUCDPEP.dat_spl
                        //Nastavení Datum vzniku
                        .addField("gdatebox", "w-3", {
                        name: "dat_vzniku", //Datum vzniku
                        disabled: !that.permsDto.dat_vzniku,
                        //initialValue: new Date(),
                        flag: "required", validators: [new Gordic.Validators.Required(), dateValidator],
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.onValidateItem("dat_vzniku");
                                    var dat_uzav = that.modelPhl.Nastaveni?.dat_uzav ?? Date.now;
                                    if (input.value != null && input.value < dat_uzav) {
                                        var form = that.element.findForms("novyPredpisForm");
                                        var ktg_upo = form.findFields("ktg_upo").gfield("getValue");
                                        if (ktg_upo < 200) {
                                            GDlg.error("Bylo zadáno datum v uzavřeném období!");
                                            //todo Zapsat resourceText: Bylo zadáno datum v uzavřeném období!
                                            //todo: nabídnout znovu výběr data vzniku || popř. vložit date.NOW ??
                                            //!Return FALSE
                                        }
                                    }
                                    //todo: If NOT NastavDatumy(col_dat_vzniku.Datum(), DATETIME_Null)
                                    //!Return FALSE
                                }
                                that.zmenaPole();
                                that.findFields("dat_vzniku").gfield("validate");
                                that.findFields("dat_spl").gfield("validate");
                            }
                        }
                    }) // BUCDPEP.dat_vzniku
                        //Nastavení Priority úhrady
                        .addField("gnumberbox", "w-2", {
                        name: "pri_uhr", //Priorita úhrady
                        disabled: !that.permsDto.pri_uhr,
                        //initialValue: 0,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.zmenaPole();
                                }
                            }
                        }
                    }) // BUCDPEP.pri_uhr
                        .addRow()
                        //.addText("Dat. zdan. plň.", "w-3",)
                        .addText("Pár. částka", "w-3")
                        .addText("Číslo dokladu", "w-3")
                        .addText("Řádek opravy", "w-3")
                        .addText("", "w-3")
                        .addRow()
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.currency(), {
                        name: "c_par",
                        disabled: !that.permsDto.c_par,
                        //label: "Pár. částka",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    })
                        //.addField("gdatebox", "w-3", {
                        //    name: "dat_zdan",
                        //    disabled: !that.permsDto.dat_zdan,
                        //    initialValue: new Date(),
                        //    change: function (ev, input) {
                        //        if (!that.prvniNastaveni) {
                        //            //that.zmenaPole();
                        //    //        if (input.value != null) {
                        //    //        }
                        //        }
                        //    }
                        //}) // DDPDPEP.dat_zdan
                        .addField("gstringbox", "w-3", {
                        name: "ac_ixe",
                        disabled: !that.permsDto.ac_ixe,
                        //label: "Číslo dokladu",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) // DDPDPEP.cis_dok
                        // Řádek opravy
                        .addField("gnumberbox", "w-3", {
                        name: "radek_puv",
                        disabled: !that.permsDto.radek_puv,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) // DDPDPEP.priz_opr
                        .addField("gcheck", "w-3", {
                        label: "Oprava",
                        name: "priz_opr",
                        //initialValue: 0,
                        disabled: !that.permsDto.priz_opr,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.priz_opr === 1);
                                    return;
                                case "collect":
                                    dto.priz_opr = $(this).gfield("getValue") === true ? 1 : 0;
                                    return;
                                default: return "priz_opr";
                            }
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    //that.zmenaPole();
                                }
                            }
                        }
                    });
                    //!######## T E S T #######
                    //.addRow()
                    //.addText("Datum pro test")
                    //.addField("gdatebox", "w-4", { name: "test_dat" })
                    //.addField("gbutton", "w-4", {
                    //    params: {
                    //        type: "action",
                    //        action: new GAction({
                    //            name: "actSmlBtn",
                    //            caption: "Ve vym. odbodi",
                    //            run: (ev, ctx) => {
                    //                let form = that.element.findForms("novyPredpisForm");
                    //                let l_datum = form.findFields("test_dat").gfield("getValue")
                    //                let l_bol = this.jeDatumVeVymahanemOdobi(l_datum)
                    //                l_bol.done((ret) => {
                    //                    form.findFields("check_vym").gfield("setValue", ret);
                    //                })
                    //            }
                    //        })
                    //    }
                    //})
                    //.addField("gbutton", "w-4", {
                    //    params: {
                    //        type: "action",
                    //        action: new GAction({
                    //            name: "actSmlBtn",
                    //            caption: "Je zmeněn?",
                    //            run: (ev, ctx) => {
                    //                let form = that.element.findForms("novyPredpisForm");
                    //                let l_datum = form.findFields("test_dat").gfield("getValue")
                    //                let l_bol = this.jePredpisZmenem(l_datum)
                    //                l_bol.done((ret) => {
                    //                    form.findFields("check_zmen").gfield("setValue", ret);
                    //                })
                    //            }
                    //        })
                    //    }
                    //})
                    //.addRow()
                    //.addField("gcheck", "w-4", { label: "zmenen", name: "check_zmen" })
                    //.addField("gcheck", "w-4", { label: "vymahatelne", name: "check_vym" })
                    //!######## T E S T #######
                    //#endregion  "Předpis"
                    //#region "Rekapitulace DPH" - sekce se zobrazí jen pokud bude pohledávka daňová(a měl bys to mít na detailu případu to samé)
                    //infoForm
                    //    .addSection({ name: "dphRecap", label: "Rekapitulace DPH" })
                    //that.recapDPH = new GContent([Gordic.Gin.WebClient.recapDPH, {
                    //    checkVisible: true,
                    //    visType: "grid",
                    //    totalAmount: () => {
                    //        return that.findFields("c_mena");                                                           // políčko částky, které je provázáno pro změny
                    //    },
                    //    //taxPeriod: () => { return that.DoplnObdobiDPH(that.findFields("dat_zdan").gfield("getValue")); },         // nastavení sazeb DPH dle období
                    //    taxPeriod: () => {
                    //        return that.findFields("dat_zdan").gfield("getValue") ?? new Date();                                             // nastavení sazeb DPH dle období
                    //    },
                    //    model: {
                    //        taxDoc: that.typ_Pohl.priz_dph === 10,                                                      // Daňový doklad
                    //        taxedByReciever: that.model.priz_pdp === 1,                                                 // Zdanění příjemcem
                    //        otherTaxedPayment: that.modelPredpisu.priz_ozp === 1,                                       // Ostatní zdanitelné plnění do 10 000 CZK
                    //        //useDeductionRatio: that.modelPredpisu.priz_pomer == 1,                                                // Poměr pro odpočet
                    //        periodDPH: {                                                                                // měsíc a rok uplatnění DPH
                    //            year: that.modelPredpisu.rok_dph ?? new Date().getFullYear(),
                    //            month: that.modelPredpisu.mesic_dph ?? new Date().getMonth()
                    //        },
                    //        prices: that.dataDoRekapitulace(),                                                          // doplnění částek do gridu
                    //    },
                    //}]);
                    ////that.recapDPH.element.appendTo(this.element);       // připojení rekapitulace do tabu
                    //that.recapDPH.on("fieldchange", (ev, obj) => {                                                                        // naslouchání na změny tabu
                    //    var field = $(ev.target);
                    //    if (field.gfield("option", "name") === "taxDoc") {                                                      // pokud se změní zatržítko daňový doklad
                    //        let prizDPH = that.findFields("taxDoc").gfield("getValue");                                         // zjištění hodnoty příznaku daňového dokladu
                    //        let datZdan = that.findFields("dat_zdan").gfield("getValue");                                       // zjištění hodnoty datumu zdanitelného plnění
                    //        that.actions.actKontrolniHlaseni?.update({ enabled: prizDPH });                                     // úprava akce Kontrolní hlášení
                    //        //that.DoplnObdobiDPH(datZdan);                                                                       // spustí se metoda na doplnění období DPH
                    //    }
                    //});
                    if (that.Dph_Typ_phl) {
                        mainForm
                            .addSection("Rekapitulace DPH")
                            .addRow() //todo priz_oz IF value pro zobrazeni/skrytí podle pravidla viz. výše
                            .addField("gcheck", "w-12", {
                            label: "Ost. zdan. plnění do 10 000 Kč",
                            name: "priz_ozp",
                            disabled: !that.permsDto.priz_ozp,
                            model: function (operation, dto, modelOptions) {
                                switch (operation) {
                                    case "apply":
                                        $(this).gfield("setValue", dto.priz_ozp === 1);
                                        return;
                                    case "collect":
                                        dto.priz_ozp = $(this).gfield("getValue") === true ? 1 : 0;
                                        return;
                                    default: return "priz_ozp";
                                }
                            },
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    if (input.value != null) {
                                        //that.onValidateItem("priz_ozp");
                                        //that.zmenaPole();
                                    }
                                }
                            }
                        }) // DDPDPEP.priz_ozp
                            .addRow()
                            .addText("Základ daně", "w-4 right")
                            .addText("Daň", "w-4 right")
                            .addText("Celkem", "w-4 right");
                        //OSVOBOZENO
                        if (that.modelPhl.priz_osvob === 1) {
                            mainForm
                                .addRow("Osvobozeno")
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_d0",
                                disabled: !that.permsDto.c_d0,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_d0celkem").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_d");
                                            that.prepocetCastek(0);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addText("", "w-4")
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_d0celkem",
                                //initialValue: 0, //TEST
                                disabled: true,
                                model: function (operation, dto, modelOptions) {
                                    switch (operation) {
                                        case "apply":
                                            $(this).gfield("setInitial", $(this).gform().findFields("c_d0").gfield("getValue"));
                                            return;
                                        case "collect": return;
                                        default: return "c_d0celkem";
                                    }
                                }
                            });
                        }
                        mainForm
                            .addRow("Bez daně")
                            .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                            name: "c_z0",
                            disabled: !that.permsDto.c_z0,
                            change: function (ev, input) {
                                $(this).gform().findFields("c_z0celkem").gfield("model", "apply", null);
                                if (!that.prvniNastaveni) {
                                    if (input.value != null) {
                                        //that.onValidateItem("c_z");
                                        that.prepocetCastek(1);
                                        //that.zmenaPole();
                                    }
                                }
                            }
                        })
                            .addText("", "w-4")
                            .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                            name: "c_z0celkem",
                            //initialValue: 0, //TEST
                            disabled: true,
                            model: function (operation, dto, modelOptions) {
                                switch (operation) {
                                    case "apply":
                                        $(this).gfield("setInitial", $(this).gform().findFields("c_z0").gfield("getValue"));
                                        return;
                                    case "collect": return;
                                    default: return "c_z0celkem";
                                }
                            }
                        });
                        if (that.modelPhl.priz_dph_sniz === 1) {
                            mainForm
                                .addRow("První snížená")
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_z1",
                                disabled: !that.permsDto.c_z1,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_z");
                                            that.prepocetCastek(1);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_d1",
                                disabled: !that.permsDto.c_d1,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_d");
                                            that.prepocetCastek(0);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_zd1",
                                disabled: true,
                                model: function (operation, dto, modelOptions) {
                                    switch (operation) {
                                        case "apply":
                                            let z = $(this).gform().findFields("c_z1").gfield("getValue");
                                            let d = $(this).gform().findFields("c_d1").gfield("getValue");
                                            let sum = z.add(d);
                                            $(this).gfield("setInitial", sum);
                                            return;
                                        case "collect": return;
                                        default: return "c_zd1";
                                    }
                                }
                            });
                        }
                        if (that.modelPhl.priz_dph_sniz2 === 1) {
                            mainForm
                                .addRow("Druhá snížená")
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_z3",
                                disabled: !that.permsDto.c_z3,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_z");
                                            that.prepocetCastek(1);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_d3",
                                disabled: !that.permsDto.c_d3,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_d");
                                            that.prepocetCastek(0);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_zd3",
                                disabled: true,
                                model: function (operation, dto, modelOptions) {
                                    switch (operation) {
                                        case "apply":
                                            let z = $(this).gform().findFields("c_z3").gfield("getValue");
                                            let d = $(this).gform().findFields("c_d3").gfield("getValue");
                                            let sum = z.add(d);
                                            $(this).gfield("setInitial", sum);
                                            return;
                                        case "collect": return;
                                        default: return "c_zd3";
                                    }
                                }
                            });
                        }
                        if (that.modelPhl.priz_dph_zakl === 1) {
                            mainForm
                                .addRow("Základní sazba")
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_z2",
                                disabled: !that.permsDto.c_z2,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_z");
                                            that.prepocetCastek(1);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_d2",
                                disabled: !that.permsDto.c_d2,
                                change: function (ev, input) {
                                    $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                                    if (!that.prvniNastaveni) {
                                        if (input.value != null) {
                                            //that.onValidateItem("c_d");
                                            that.prepocetCastek(0);
                                            //that.zmenaPole();
                                        }
                                    }
                                }
                            })
                                .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                                name: "c_zd2",
                                disabled: true,
                                model: function (operation, dto, modelOptions) {
                                    switch (operation) {
                                        case "apply":
                                            let z = $(this).gform().findFields("c_z2").gfield("getValue");
                                            let d = $(this).gform().findFields("c_d2").gfield("getValue");
                                            let sum = z.add(d);
                                            $(this).gfield("setInitial", sum);
                                            return;
                                        case "collect": return;
                                        default: return "c_zd2";
                                    }
                                }
                            });
                        }
                        mainForm
                            .addRow("Zaokrouhlení")
                            .addText("", "w-4")
                            .addText("", "w-4")
                            .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                            name: "c_zao",
                            disabled: !that.permsDto.c_zao,
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    if (input.value != null) {
                                        //that.onValidateItem("c_d");
                                        that.prepocetCastek(0);
                                        //that.zmenaPole();
                                    }
                                }
                            }
                        })
                            .addRow()
                            .addText("Dat. zdan. plň.", "w-4")
                            .addText("Rok přiz.DPH", "w-4")
                            .addText("Měs. přiz. DPH", "w-4")
                            .addRow()
                            .addField("gdatebox", "w-4", {
                            name: "dat_zdan",
                            disabled: !that.permsDto.dat_zdan,
                            //initialValue: new Date(),
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    if (input.value != null) {
                                        //todo: !!!! that.onValidateItem("dat_zdan");
                                        //that.zmenaPole();
                                    }
                                }
                            }
                        }) // DDPDPEP.dat_zdan
                            .addField("gnumberbox", "w-4", {
                            name: "rok_dph",
                            disabled: !that.permsDto.rok_dph,
                            //initialValue: new Date().getFullYear(),
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    //that.zmenaPole();
                                    //        if (input.value != null) {
                                    //        }
                                }
                            }
                        }) // DDPDPEP.rok_dph
                            .addField("gnumberbox", "w-4", {
                            name: "mesic_dph",
                            disabled: !that.permsDto.mesic_dph,
                            //initialValue: new Date().getMonth(),
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    //that.zmenaPole();
                                    //        if (input.value != null) {
                                    //        }
                                }
                            }
                        }) // DDPDPEP.mesic_dph
                            .addRow()
                            .addText("Příz.tisku daň. dok.", "w-4")
                            .addText("Dat. tisku daň. dok.", "w-4")
                            .addText("Číslo daňového dokladu", "w-4")
                            .addRow()
                            .addField("gselectbox", "w-4", Gordic.Prefabs.Select.priznakTisku(), {
                            name: "priz_tisk_dd",
                            disabled: !that.permsDto.priz_tisk_dd,
                            model: "priz_tisk_dd=priz_tisk_dd; priz_tisk_dd_txt=priz_tisk_dd_txt",
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    //that.zmenaPole();
                                    //        if (input.value != null) {
                                    //        }
                                }
                            }
                        }) // DDPDPEP.priz_tisk_dd
                            //.addField("gstringbox", "w-4",{ name: "priz_tisk_dd_txt" }) // DDPDPEP.priz_tisk_dd
                            .addField("gdatebox", "w-4", {
                            name: "dat_vyst_dd",
                            disabled: !that.permsDto.dat_vyst_dd,
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    that.zmenaPole();
                                    //        if (input.value != null) {
                                    //        }
                                }
                            }
                        }) // DDPDPEP.dat_vyst_dd_txt 
                            .addField("gstringbox", "w-4", {
                            name: "cislo_dd",
                            disabled: !that.permsDto.cislo_dd,
                            change: function (ev, input) {
                                if (!that.prvniNastaveni) {
                                    //that.zmenaPole();
                                    //        if (input.value != null) {
                                    //        }
                                }
                            }
                        }); // DDPDPEP.cislo_dd
                    }
                    //#endregion "Rekapitulace DPH"
                    //#region "Příznaky"
                    mainForm
                        .addSection("Příznaky")
                        .addRow()
                        .addField("gcheck", "w-3", {
                        name: "hist",
                        disabled: !that.permsDto.hist,
                        label: "Hist.",
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.hist === 1);
                                    return;
                                case "collect":
                                    dto.hist = $(this).gfield("getValue") === true ? 1 : 0;
                                    return;
                                default: return "hist";
                            }
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) //✓ pokud je sloupec hist = 1
                        .addField("gcheck", "w-3", {
                        name: "exist_roz_pred",
                        disabled: !that.permsDto.rozp,
                        label: "Rozp.",
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.exist_roz_pred === 1);
                                    return;
                                case "collect":
                                    dto.exist_roz_pred = $(this).gfield("getValue") === true ? 1 : 0;
                                    return;
                                default: return "exist_roz_pred";
                            }
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) //✓ pokud je sloupec rozp = 1 
                        .addField("gcheck", "w-3", {
                        name: "priz_nepar",
                        disabled: !that.permsDto.priz_nepar_txt, //TODO: přiřadil jsme TXT byť netuším a nevím zda se jedná o správné okénko
                        label: "Párovat",
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.priz_nepar === 10);
                                    return;
                                case "collect":
                                    dto.priz_nepar = $(this).gfield("getValue") === true ? 10 : 0;
                                    return;
                                default: return "priz_nepar";
                            }
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) //BUCDPEP.priz_nepar || buccpne 0 / 10               
                        .addField("gcheck", "w-3", {
                        name: "priz_pen_aut",
                        disabled: !that.permsDto.priz_pen_aut,
                        label: "Pen. gen.aut",
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setValue", dto.priz_pen_aut === 1);
                                    return;
                                case "collect":
                                    dto.priz_pen_aut = $(this).gfield("getValue") === true ? 1 : 0;
                                    return;
                                default: return "priz_pen_aut";
                            }
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) //✓ pokud je sloupec priz_pen_aut > 0 (DDPDPEP.priz_pen_aut (gincpan))
                        //.addText("Identifikátor EPZ")
                        //.addField("gnumberbox", { name: "stav_pr" }) // DDPDPEP.stav_pr --- 0/100
                        .addRow()
                        .addText("Stav", "w-4")
                        .addText("Stav předpisu", "w-4")
                        .addText("Stav uazvření", "w-4")
                        .addRow()
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.priznakPrevodu(), {
                        name: "stav_pr",
                        dropdown: true,
                        disabled: true, // !that.permsDto.stav_pr
                        /*, initialValue: {stav_pr: 0}*/
                        model: "stav_pr=stav_pr",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) //číselník DDPCSPR pokud je hodnota != 0 tak by mělo být políčko zvýrazněné.Je to needitovatelné pole.
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.buccuhr(), {
                        name: "s_uhrp",
                        dropdown: true,
                        disabled: true, // !that.permsDto.s_uhrp,
                        model: "s_uhrp=s_uhrp",
                        /*, initialValue: { s_uhrp: 10 }*/
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }) //jedná se o číselník buccuhr -  needitovatelný          
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.stavUzaverky(), {
                        name: "stav_uz_pr",
                        dropdown: true,
                        disabled: true, // !that.permsDto.stav_uz_pr,
                        model: "model.stav_uz_pr=value.stav_uz_pr",
                        /*, initialValue: { stav_uz_pr: 0 }*/
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }); // DDPCSUP.stav_pr_txt - needitovatelný    
                    //#endregion "Příznaky"                  
                    //#region "Popisné údaje"
                    mainForm
                        .addSection("Popisné údaje")
                        //.addRow()
                        //.addText("Poznámka")
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                        disabled: !that.permsDto.poznamka,
                        rows: 5
                    }) // DDPDPEP.poznamka
                        //.addRow()
                        //.addText("Popis")
                        .addRow({ label: "Popis", hint: "Pro otevření okna popisů stiskněte <b>F4</b>" })
                        .addField("gstringbox", "w-12", {
                        name: "popis",
                        rows: 5,
                        disabled: !that.permsDto.popis,
                        tooltip: "Pro otevření okna popisů stiskněte <b>F4</b>"
                    }); // DDPDPEP.popis (BUCDPEP)
                    //#endregion "Popisné údaje"
                    //#region "Platební údaje"
                    var useZp = that.globalSettings.get("Global.Ddp.ZpusobyUhradySettings.UseZp" + that.IxpDen + that.Typ_phl) ?? "0";
                    var useZpArray = useZp ? useZp.split(',').map((item) => parseInt(item.trim(), 10)) : [];
                    mainForm
                        .addSection("Platební údaje")
                        .addRow()
                        .addText("Způsob úhrady", "w-3")
                        .addText("VS", "w-3")
                        .addText("SS", "w-3")
                        .addText("KS", "w-3")
                        .addRow()
                        //Způsob platby, používá se k rozlišení jak bude uhrazena očekávaná platba
                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.ekocizp(), {
                        name: "zp",
                        dropdown: true,
                        model: "model.zp=value.zp",
                        itemTemplate: "{zp}-{zp_txt}",
                        //initialValue: { zp: 10 },
                        disabled: !that.permsDto.zp,
                        serverFilters: {
                            s_prijem: 1,
                            // filtr podle GUPTY na způsoby úhrady (Jaromírova pevná množina, aby mu tam náhodou někdo něco nepřidal | ZDROJ Bpl.WebClient
                            //zp: [10, 20, 30, 31, 32, 41, 42, 50, 51, 52, 53, 54, 73, 80, 81], //odebrané hodnoty: 0, 40, 60, 70   
                            zp: useZpArray, //odebrané hodnoty: 0, 40, 60, 70   
                            //zp: { o: "!=", v: [0, 40, 60, 70] },
                        },
                        change: function (ev, ctx) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                            }
                            //that.nastavPovinnostBuCi();
                        }
                    })
                        //.addField("gselectbox", "w-3", Prefabs.Select.ekocizp(), {
                        //    name: "zp",
                        //    disabled: !that.permsDto.zp,
                        //    //defaultValue: { zp: that.model.zp ?? 0 },
                        //    //initialValue: { zp: that.model.zp ?? 0 }, //todo: vyřešit inicializaci, nenačte data ani tímto způsobem...
                        //    dropdown: false,
                        //    model: "modelPredpisu.zp=zp", //todo: Vyřešit model, nechce se načíst při otevření detailu... 
                        //    change: function (ev, input) {
                        //        if (!that.prvniNastaveni) {
                        //            //that.zmenaPole();
                        //            //        if (input.value != null) {
                        //            //        }
                        //        }
                        //    }
                        //})
                        //----------------------------------------------------------------------------------
                        //VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        .addField("gstringbox", "w-3", {
                        name: "vs",
                        disabled: !that.permsDto.vs,
                        allowedChars: "0123456789*",
                        maxLength: 12 /* Interface.LK.Isl.GPredpisDtoTypeLengths.vs */,
                        //validators: [new Gordic.Validators.Length({ max: 12 })]
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                        /*flag: "required",*/
                    })
                        //----------------------------------------------------------------------------------
                        //SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        //.addField("gselectbox", "w-3",
                        //    Gordic.Prefabs.Select.ekosk(), {
                        //        name: "ss",
                        //        //flag: "required",
                        //        dropdown: true,
                        //        model: "modelPredpisu.ss=value.ss"
                        //})
                        //.addField("gstringbox", "w-3", {
                        //    name: "ss",
                        //    disabled: !that.permsDto.ss,
                        //    change: function (ev, input) {
                        //        if (!that.prvniNastaveni) {
                        //            //that.zmenaPole();
                        //            //        if (input.value != null) {
                        //            //        }
                        //        }
                        //    }
                        //})
                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.ekoscss(), {
                        name: "ss",
                        dropdown: true,
                        disabled: !that.permsDto.ss,
                        model: "model.ss=value.ss"
                    })
                        //KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        //.addField("gstringbox", "w-3", { name: "ks", flag: "required", }) 
                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.ekoskos(), {
                        name: "ks",
                        disabled: !that.permsDto.ks,
                        //flag: "required",
                        dropdown: true,
                        model: "model.ks=value.ks",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    })
                        //.addRow()
                        //.addText(, "w-12")
                        //-----------------------------------------------------Bankovní Účet vlastní
                        .addRow("Bankovní účet vlastní")
                        //.addField("gstringbox", "w-8", { name: "bu_vl" }) //Bankovní účet vlastní - číslo účtu zpracující organizace
                        //.addText("/", "w-1 center")
                        //.addField("gstringbox", "w-3", { name: "sk_vl" }) //Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ekosuvl(), {
                        //disabled: true,
                        itemTemplate: "{bu_vl:trim:encode} / {sk_vl:trim:encode}",
                        helperColumns: ["bu_vl", "sk_vl", "nazev", "uea_uc", "ueb_uc", "mena_txt"],
                        name: "bu_vl",
                        disabled: !that.permsDto.bu_vl,
                        //name: "ucet_vl", 
                        model: "sk_vl=sk_vl; bu_vl=bu_vl; rok=rok; ucs=ucs",
                        //change: function (ev, changeObj) {                            //viz: https://xwiki.gordic.cz/NET/widgets/gfield#Hchange  
                        //    var men = changeObj.value.mena; 
                        //var men = changeObj.value.mena;
                        //that.findFields("mena_bu").gfield("model", "apply", this.model)
                        //    $.content(this).zmenaMena(men);
                        //that.findFields("mena_bu").setValue(men)
                        //},
                        //serverFilters: { rok: that.model.rok_pid, ucs: that.model.ucs }
                        serverFilters: { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0, rok: this.rok },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    })
                        //.addRow()
                        //.addText(, "w-12",)
                        //-----------------------------------------------------Bankovní Účet cizí
                        .addRow("Bankovní účet cizí")
                        //.addField("gstringbox", "w-8", { name: "bu_ci" })
                        //.addText("/", "w-1 center")
                        //.addField("gstringbox", "w-3", { name: "sk_ci" })
                        .addField("gselectbox", "w-12", Gordic.Eko.Components.ekosuci({
                        Ixp: this.Ixp ?? "",
                        AktZnacka: this.modelPripadu.ac_ag ?? "",
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu
                    }), {
                        name: "bu_ci",
                        disabled: !that.permsDto.bu_ci,
                        dropdown: false, // výběr přes 3 tečky
                        model: "ixs_esu=>ixs_esu;bu_ci=bu_ci;sk_ci=sk_ci",
                        customClass: "js-nevalidovat", // vynechá validace proti DTO
                        serverFilters: {
                            //ixs_esu: new Gordic.Forms.Dependency("ixs_esu", "ixs_esu", false, true),                     // závislost zakomentována, řešeno v change políčka ixs_esu
                            aktivita: 100
                        },
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    });
                    //-----------------------------------------------------
                    //#endregion "Platební údaje" 
                    //#region "Smlouva"
                    mainForm
                        .addSection("Smlouva")
                        .addRow("Identifikátor SML")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoVyberSmlouvy({
                        inputDto: {
                            //pouzeSmlouvy: false, //
                            rokSml: that.RokDen, // that.rok
                            prijmy: that.modelPredpisu.ktg_upo < 200,
                            //canNewAndRefund: true
                        },
                        parentContent: that,
                        esuLogovani: {
                            Ixp: that.modelPredpisu.ixp ?? "",
                            AktZnacka: that.modelPripadu.ac_ag ?? "",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                        }, init: function (inputDto, filter) {
                            let esu = that.modelPredpisu.ixs_esu; // that.findFields("vyberEsu").gfield("getValue"); 
                            let smlouva = that.findFields("ixp_sml").gfield("getValue");
                            if (esu !== null)
                                filter.ixs_esu = esu;
                            if (smlouva !== null)
                                filter.ixp_sml_pri = smlouva.ixp_sml_pri;
                            //filter.smluvni_pripady.push(Gordic.Eko.GVyberSmlouvyPripadyEnum.SeSchvalenouPolozkou);
                        }
                        //inputDto: {},
                        //esuLogovani: {
                        //    Ixp: "0000X0000003",
                        //    AktZnacka: "",
                        //    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                        //    DuvodHledaniTxt: "Výběr Smlouvy"
                        //},
                        //parentContent: that
                    }), {
                        name: "ixp_sml",
                        model: "model.ixp_sml=value.ixp_sml_pri",
                        disabled: that.Edit, /// !that.permsDto.ixp_sml, 
                        //! Při pořízení nového se smlouva vybírá, teoreticky to může být needitovatelný, když k tomu budeš schopen připojit tu položku smlouvy dodatečně
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    });
                    //.addRow()
                    //.addText("Položka SML", "w-4")
                    //.addText("AC", "w-4")
                    //.addRow()
                    //.addField("gstringbox", "w-4", {
                    //    name: "ixs_ste",
                    //    disabled: !that.permsDto.ixs_ste, //TODO: !that.permsDto.polozka_sml,
                    //    change: function (ev, input) {
                    //        if (!that.prvniNastaveni) {
                    //            //that.zmenaPole();
                    //            //        if (input.value != null) {
                    //            //        }
                    //        }
                    //    }
                    //})
                    //.addField("gstringbox", "w-4", {
                    //    name: "ac_sml",
                    //    disabled: !that.permsDto.ac_sml,
                    //    change: function (ev, input) {
                    //        if (!that.prvniNastaveni) {
                    //            //that.zmenaPole();
                    //            //        if (input.value != null) {
                    //            //        }
                    //        }
                    //    }
                    //})
                    //.addField("gbutton", "w-4", {
                    //    params: {
                    //        type: "action",
                    //        action: this.actions.add({
                    //            name: "actSmlBtn",
                    //            caption: "Detail",
                    //            run: (ev, ctx) => {
                    //                //LetsDoThis!
                    //                //TODO: on("close", () => { //that.zmenaPole(); });
                    //            }
                    //        })
                    //    }
                    //})
                    //#endregion "Smlouva"
                    //#region "Lhůta"  zobrazuje se pouze pokud je povolena práce s lhůtama
                    mainForm
                        .addSection("Lhůta")
                        .addRow("Lhůta, Konec lhůty")
                        .addField("gselectbox", "w-9", {
                        name: "stav_lhuty", // Stav lhůty
                        model: "model.stav_lhuty=value.stav_lhuty",
                        dropdown: true,
                        list: false,
                        multi: false,
                        initialValue: { stav_lhuty: 0 },
                        itemTemplate: "{popis}",
                        disabled: true,
                        data: [
                            { stav_lhuty: 0, popis: "Lhůta není nastavena, nebo nelze určit" },
                            { stav_lhuty: 1, popis: "Předpis je vypořádaný, neběží žádná lhůta" },
                            { stav_lhuty: 2, popis: "Lhůta běží, jsou pořízeny všechny kroky vymáhání" },
                            { stav_lhuty: 3, popis: "Lhůta běží, chybí některé kroky vymáhání" },
                            { stav_lhuty: 4, popis: "Lhůta se blíží ke konci, jsou pořízeny všechny kroky vymáhání" },
                            { stav_lhuty: 5, popis: "Lhůta se blíží ke konci, chybí některé kroky vymáhání" },
                            { stav_lhuty: 6, popis: "Je po konci lhůty, jsou pořízeny všechny kroky vymáhání" },
                            { stav_lhuty: 7, popis: "Je po konci lhůty, chybí některé kroky vymáhání" }
                        ],
                        states: [
                            {
                                id: "stavLhutyState", // nepovinný, pouze pokud bude potřeba ikonu adresovat/měnit
                                icon: that.ikonaLhuty.lhuta0,
                                align: "opposite",
                                //customClass: "g-state-success",
                            }
                        ],
                        buttons: [
                            {
                                icon: "fa-ellipsis-h",
                                caption: "",
                                tooltip: "Otevřít seznam úkonů nad lhůtou předpisu",
                                requireEdit: false,
                                action: that.actions["actPredpisySeznamUkonu"]
                            }
                        ],
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                that.initialStavuLhuty(false);
                            }
                        }
                    })
                        //.addField("gstringbox", "w-9", {
                        //    name: "stav_lhuty",
                        //    disabled: !that.permsDto.ixs_lhu,
                        //    states: [
                        //        {
                        //            id: "stavLhutyStateSary",     // nepovinný, pouze pokud bude potřeba ikonu adresovat/měnit
                        //            icon: "fa-open",
                        //            customClass: "g-state-success",
                        //            tooltip: ""
                        //        }
                        //    ],
                        //    buttons: [
                        //        {
                        //            icon: "fa-ellipsis-h",
                        //            caption: "",
                        //            action: that.actions["actPredpisySeznamUkonu"]
                        //        }
                        //    ],
                        //    change: function (ev, input) {
                        //        if (!that.prvniNastaveni) {
                        //            //that.zmenaPole();
                        //            //        if (input.value != null) {
                        //            //        }
                        //        }
                        //    }
                        //})
                        .addField("gdatebox", "w-3", {
                        name: "dat_lhuty",
                        disabled: !that.permsDto.dat_lhuty,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                            }
                        }
                    });
                    //#endregion "Lhůta"        
                    //#region "Rozhodnutí"
                    mainForm
                        .addSection("Rozhodnutí")
                        .addRow({ label: "Číslo rozhodnutí", hint: "Pro otevření okna pro výběr rozhodnutí stiskněte <b>F4</b>" })
                        .addField("gnumberbox", "w-12", {
                        name: "rozhodnuti",
                        tooltip: "Pro otevření okna pro výběr rozhodnutí stiskněte <b>F4</b>",
                        disabled: !that.permsDto.rozhodnuti,
                        defaultValue: 0,
                        buttons: [
                            {
                                icon: "gi-detail",
                                caption: "",
                                action: that.actions["actRozhodnutiDetail"]
                            },
                            {
                                icon: "fa-ellipsis-h",
                                caption: "",
                                action: that.actions["openTabVyberRozhodnutiAct"]
                            },
                        ],
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    }); //vas.DDPDPEP.rozhodnuti
                    //.addField("gbutton", "w-3", { //TODO: přidat tuto možnost přímo do fieldu pro rozhodnutí.. ?
                    //    params: {
                    //        type: "action", //TODO: Nastavit na rozhodnutí možnost vybrat si pouze z existujících rozhodnutá případu!
                    //        action: this.actions.add({
                    //            name: "actRozhodnutiDetail",
                    //            tooltip: "Detail vybraného rozhodnutí",
                    //            run: (ev, ctx) => {
                    //                var rozhod = this.findForms("novyPredpisForm").findFields("rozhodnuti").gfield<number>("getValue");
                    //                that.isl.PripadRozhodnuti.kontrolaExistenceRozhodnuti(rq => {
                    //                    return {
                    //                        i_ixp: this.Ixp,
                    //                        i_rozh: rozhod ?? 0
                    //                    }
                    //                })
                    //                    .get()
                    //                    .done((data) => {
                    //                        if (data != 1) {
                    //                            return that.dialogs.error("Chyba", "Nebylo vybrané platné rozhodnutí");
                    //                        } else {
                    //                            this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadRozhodnuti", { ID: "DDPGPripadRozhodnuti#", Ixp: this.Ixp, Rozhodnuti: rozhod, editMode: true }, "Detail rozhodnutí", 610, 450)
                    //                                .on("close", () => {
                    //                                    //this.viewRozhodnuti.requestData();
                    //                                    //that.zmenaPole();
                    //                                });
                    //                        }
                    //                    })
                    //            }
                    //        })
                    //    }
                    //})
                    //#endregion "Rozhodnutí"
                    //#region "Účtování"
                    mainForm
                        .addSection("Účtování")
                        .addRow("Řádek účetního pohybu")
                        .addField("gnumberbox", "w-9", {
                        name: "radek_upo",
                        disabled: !that.permsDto.radek_upo,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                //that.zmenaPole();
                                //        if (input.value != null) {
                                //        }
                            }
                        }
                    })
                        .addField("gbutton", "w-3", {
                        params: {
                            type: "action", //TODO: ======= Z  Č E H O  S E B R A T  D E T A I L  Ř Á D K U  Ú Č T .  P O H Y B U ? =======
                            action: this.actions.add({
                                name: "actUctBtn",
                                caption: "Detail",
                                run: (ev, ctx) => {
                                    //that.navigate("Gordic.Ddp.WebClient.GPohybyPripadu", { ID: "DDPGPohybyPripadu#", ixp: that.Ixp, zobrazeni: that.modelPredpisu.ucetni_pohyb, dat_od: that.modelPredpisu.dat_od, dat_do: that.modelPredpisu.dat_do })
                                    //LetsDoThis!
                                    //TODO: on("close", () => { //that.zmenaPole(); });
                                }
                            })
                        }
                    });
                    //#endregion "Účtování"
                    //var currencyForm = $("<div>").appendTo(this.element).gform("createFrom", infoForm);
                    //that.recapDPH.element.appendTo(this.element);       // připojení rekapitulace do tabu
                    var defaultForm = $("<div>").appendTo(this.element).gform("createFrom", mainForm);
                    //############################
                    //#####KLÁVESOVÉ ZKRATKY######
                    defaultForm.findForms("novyPredpisForm").findFields("c").gshortcut({
                        key: "F6", //klávesová zkratka F6
                        description: `Otevření okna pro ~Zadání DPH~ nad políčkem ${that.globalSettings?.get("Global.Ddp.ObecneSettings.PopisCastka") ?? "Částka v CZK"}`, //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabZadaniDphAct"],
                    });
                    defaultForm.findForms("novyPredpisForm").findFields("c").gshortcut({
                        key: "F4", //klávesová zkratka F4
                        description: `Otevření okna pro ~Výpočet předpisu~ nad políčkem ${that.globalSettings?.get("Global.Ddp.ObecneSettings.PopisCastka") ?? "Částka v CZK"}`, //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabVypocetPredpisuAct"],
                    });
                    defaultForm.findForms("novyPredpisForm").findFields("rozhodnuti").gshortcut({
                        key: "F4", //klávesová zkratka F4
                        description: "Otevření okna pro ~Výber rozhodnutí~ nad políčkem rozhodnuti", //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabVyberRozhodnutiAct"],
                    });
                    defaultForm.findForms("novyPredpisForm").findFields("popis").gshortcut({
                        key: "F4", //klávesová zkratka
                        description: "Otevření okna popisů", //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabPopisAct"]
                    });
                    // Funkce pro nastavení zkratek do GDATEBOX políček
                    Ddp.WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                //########################################################################################
                /**
                 * Metoda pro sestavení a nastavení hlavičky dokumentu
                 * @method onDetailBuilderBuild()
                 * @param builder builder detailu
                 */
                onDetailBuilderBuild(builder) {
                    //const that = this;
                    let formSetup = {};
                    let form = this.createHeaderForm();
                    //builder.updateDefinition("formHeader", { layoutDescriptor: "L3M3S1, L-3-9-0, M-12-12-0, S-12-12-0, breaks-880-1270" });
                    //builder.updateDefinition("formHeaderInfoSection", { customClass: "w-L-2 w-M-3 w-S-12" });
                    //builder.updateDefinition("formHeaderSectionOne", { customClass: "w-L-7 w-M-6 w-S-12", rows: form.form.sections![0].rows });
                    //builder.updateDefinition("formHeaderSectionTwo", { customClass: "w-L-3 w-M-3 w-S-12", rows: form.form.sections![1].rows });
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Id)[0]?.item, // IXP
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.AgendoveCislo)[0]?.item, // agendove číslo
                            form.form.sections[0].rows[2], // vs
                            form.form.sections[1].rows[2], // řádek
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            form.form.sections[1].rows[0], // typ phl
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.TypDokladu)[0]?.item, // typ dokladu            
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.DatumEvidence)[0]?.item, // datum evidence
                            form.form.sections[1].rows[3], // čtvrť
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Kniha)[0]?.item, // Kniha        
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Zpracovatel)[0]?.item, // Zpracovatel
                            form.form.sections[2].rows[2], // Odp. osoba
                            //Podmínky pro zobrazení správce podle příznaku priz_spr
                            //if (this.priz_spr == 0) {
                            form.form.sections[1].rows[1], // správce
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data3] = {
                        rows: [
                            //builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Popis)[0]?.item, // Popis    
                            form.form.sections[1].rows[4], // Popis
                            //form!.form!.sections![1].rows![4], // Adresa
                        ]
                    };
                    //formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = "w-6", {
                    //    options: { rows: 2 }
                    //} as Forms.FormField;
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    //this.builderStatusBar = ((<any>builder).statusBarDefinitions);
                }
                //########################################################################################
                /**
                 * Metoda pro načtení dat
                 * @method loadData()
                 * @returns {0} V případě, že se nenačetly sazby DPH nebo Kurzy, vyskočí z metody
                 * @returns {void} Pokud načte data, tak naplní formuláře daty a vypne načítání
                 */
                loadedData() {
                    const that = this;
                    if (this.sazbyDPH == undefined) //pokud se nenačetly sazby DPH -> vrátím 0
                        return 0;
                    if (this.kurzyMenyDto == undefined) //pokud se nenačetl kurzy měn -> vrátím 0
                        return 0;
                    //pokud se načetl vše potřebné...vypnu načítání a můžu pokračovat
                    this.element.findForms("novyPredpisForm").findFields().gfield("model", "apply", this.modelPredpisu, { initialValues: true });
                    this.element.findForms("formHeader").findFields().gfield("model", "apply", this.modelPripadu, { initialValues: true });
                    this.element.findForms("formHeader").findFields("popis_pripadu").gfield("setValue", this.modelPripadu.popis, { initialValues: true });
                    this.element.findForms("formHeader").findFields("vs_pripadu").gfield("setValue", this.modelPripadu.vs, { initialValues: true });
                    //this.element.findForms("novyPredpisForm").findFields("bu_vl").gfield("model", "apply", this.modelPripadu.bu_vl);
                    //this.element.findForms("novyPredpisForm").findFields("sk_vl").gfield("model", "apply", this.modelPripadu.sk_vl);
                    //this.element.findForms("novyPredpisForm").findFields("bu_ci").gfield("model", "apply", this.modelPripadu.bu_vl);
                    //this.element.findForms("novyPredpisForm").findFields("sk_ci").gfield("model", "apply", this.modelPripadu.sk_vl);
                    //if (that.modelPredpisu.priz_opr == 1)
                    //if (!this.Edit) {
                    //    this.element.findForms("novyPredpisForm").findFields("mena").gfield("model", "apply", this.modelPripadu.mena);
                    //}
                    //that.poZmeneSubjektu(this.modelPredpisu.ixs_esu);
                    that.nactiSubjekt();
                    //this.element.findForms("novyPredpisForm") < - waitforvalues
                    that.endOperation();
                    that.element.find('.gfield:not(.ui-state-disabled)').first().gfield('focus');
                    that.element.gform("waitForValues")
                        .done(() => {
                        that.initialStavuLhuty(true);
                        that.prvniNastaveni = false;
                    });
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
                        that.loadedData();
                    });
                    // Naplnění DTO objektu pro kurzy měn
                    var Kurzy = that.isl.Predpisy.vratKurzMeny()
                        .get();
                    Kurzy.done((data) => {
                        that.kurzyMenyDto = data.data;
                        that.loadedData();
                    });
                }
                //########################################################################################
                /**
                 * Načtení externího subjektu z případu do políček bankovních účtů
                 * @method nactiSubjekt()
                 */
                nactiSubjekt() {
                    const that = this;
                    const ixsEsu = that.modelPripadu.ixs_esu;
                    // Ošetření cizího bankovní účtu
                    const buciField = that.findFields("bu_ci"); // políčko cizého bankovního účtu
                    buciField.gfield("option", "serverFilters", { ixs_esu: ixsEsu });
                    buciField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.Ekosuci().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                    }).then((buci) => {
                        if (buci.length === 1) { // pokud existuje jedna vrácená hodnota
                            buciField.gfield("setValue", buci[0], { initialValues: true }); // doplním jí do políčka
                        }
                        else
                            buciField.gfield("clear"); // existuje více nebo žádná hodnota, tak účet vymažu
                    });
                    if (!this.Edit) {
                        that.findFields("bu_ci").gfield("setValue", { bu_ci: that.modelPripadu.bu_ci, sk_ci: that.modelPripadu.sk_ci }, { initialValues: true });
                        that.findFields("bu_vl").gfield("setValue", { bu_vl: that.modelPripadu.bu_vl, sk_vl: that.modelPripadu.sk_vl }, { initialValues: true });
                        that.findFields("vs").gfield("setValue", that.modelPripadu.vs, { initialValues: true });
                        that.findFields("ks").gfield("setValue", { ks: this.modelPripadu.ks }, { initialValues: true });
                        that.findFields("ss").gfield("setValue", { ss: this.modelPripadu.ss }, { initialValues: true });
                    }
                    else {
                        that.findFields("bu_vl").gfield("setValue", { bu_vl: that.modelPredpisu.bu_vl, sk_vl: that.modelPredpisu.sk_vl }, { initialValues: true });
                        that.findFields("bu_ci").gfield("setValue", { bu_ci: that.modelPripadu.bu_ci, sk_ci: that.modelPripadu.sk_ci }, { initialValues: true });
                    }
                    //########################################################################################
                    //private poZmeneSubjektu(ctx: any) {                                                                                         // v TK to bylo NactiEsuInfo
                    //    var that = this;
                    //    // Ošetření cizího bankovní účtu
                    //    const buciField = that.findFields("bu_ci");                                                                             // políčko cizého bankovního účtu
                    //    if (buciField.gfield("option", "disabled") == false) {                                                                  // pokud je políčko editovatelné
                    //        if (ctx !== null)                                                                                                   // nějaký subjekt je vybrán
                    //            buciField.gfield("option", "serverFilters", { ixs_esu: ctx });                                                  // náhrada za dependency (ctx.value.ixs_esu)
                    //        else                                                                                                                // subjekt je prázdný
                    //            buciField.gfield("option", "serverFilters", { ixs_esu: null });                                                 // náhrada za dependency
                    //    }
                    //    buciField.gfield("getServerFilters").then((sf) => {                                                                     // zjištění aktuálních serverových filtrů (promise)
                    //        return new Gordic.Data.Readers.Ekosuci().getData(sf)                                                                // vrácení hodnot políčka s aktuálními serverovými filtry
                    //    }).then((buci) => {                                                                                                     // po vrácení
                    //        if (buci.length === 1) {                                                                                            // pokud existuje jedna vrácená hodnota
                    //            buciField.gfield("setValue", buci[0]);                                                                          // doplním jí do políčka
                    //        }
                    //        else buciField.gfield("clear");                                                                                     // existuje více nebo žádná hodnota, tak účet vymažu
                    //    });
                    //}
                }
                //########################################################################################
                /**
                 * Metoda pro nastavení políčka stav_lhuty podle modelu
                 * @method initialStavuLhuty()
                 * @param init Pokud je true, nastaví stav lhůty podle modelu, pokud je false, nastaví stav lhůty podle hodnoty v políčku
                 * @returns Data políčka stav_lhuty { stav_lhuty: number; popis: string }
                 */
                initialStavuLhuty(init) {
                    const that = this;
                    const ikona = that.ikonaLhuty;
                    const field = that.findForms("novyPredpisForm").findFields("stav_lhuty");
                    var data = that.modelPredpisu.stav_lhuty;
                    if (!init) {
                        data = field.gfield("getValue").stav_lhuty;
                    }
                    switch (data) {
                        case 0:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta0 });
                            var set = { stav_lhuty: 0, popis: "Lhůta není nastavena, nebo nelze určit" };
                            break;
                        case 1:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta1 });
                            var set = { stav_lhuty: 1, popis: "Předpis je vypořádaný, neběží žádná lhůta" };
                            break;
                        case 2:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta2 });
                            var set = { stav_lhuty: 2, popis: "Lhůta běží, jsou pořízeny všechny kroky vymáhání" };
                            break;
                        case 3:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta3 });
                            var set = { stav_lhuty: 3, popis: "Lhůta běží, chybí některé kroky vymáhání" };
                            break;
                        case 4:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta4 });
                            var set = { stav_lhuty: 4, popis: "Lhůta se blíží ke konci, jsou pořízeny všechny kroky vymáhání" };
                            break;
                        case 5:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta5 });
                            var set = { stav_lhuty: 5, popis: "Lhůta se blíží ke konci, chybí některé kroky vymáhání" };
                            break;
                        case 6:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta6 });
                            var set = { stav_lhuty: 6, popis: "Je po konci lhůty, jsou pořízeny všechny kroky vymáhání" };
                            break;
                        case 7:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta7 });
                            var set = { stav_lhuty: 7, popis: "Je po konci lhůty, chybí některé kroky vymáhání" };
                            break;
                        default:
                            field.gfield("addState", { id: "stavLhutyState", align: "opposite", icon: ikona.lhuta0 });
                            var set = { stav_lhuty: 0, popis: "Lhůta není nastavena, nebo nelze určit" };
                            break;
                    }
                    if (init) {
                        field.gfield("setValue", set, { initialValues: true });
                    }
                    return set;
                    //private nastavLhutu() {
                    //    const that = this;
                    //    var data = that.modelPredpisu.stav_lhuty;
                    //    //TODO: vzít data z políčka...
                    //    var iconTemplate = ico_neurce;
                    //    var tooltipText = "Neurčeno";
                    //    var dat_lhuty = "black"; //TODO: zjistit jak nastavit barvu dat_lhuty podle stavu lhůty... (možná to vůbec není tady, ale v profilech...)
                    //    switch (data) {
                    //        case 0: {
                    //            iconTemplate = ico_lhuta1;
                    //            tooltipText = "Lhůta není nastavena, nebo nelze určit";
                    //            dat_lhuty = "black";
                    //            break;
                    //        }
                    //        case 1: {
                    //            iconTemplate = ico_lhuta2;
                    //            tooltipText = "Předpis je vypořádaný, neběží žádná lhůta";
                    //            dat_lhuty = "black";
                    //            break;
                    //        }
                    //        case 2: {
                    //            iconTemplate = ico_lhuta3;;
                    //            tooltipText = "Lhůta běží, jsou pořízeny všechny kroky vymáhání";
                    //            dat_lhuty = "blue";
                    //            break;
                    //        }
                    //        case 3: {
                    //            iconTemplate = ico_lhuta4;
                    //            tooltipText = "Lhůta běží, chybí některé kroky vymáhání";
                    //            dat_lhuty = "red";
                    //            break;
                    //        }
                    //        case 4: {
                    //            iconTemplate = ico_lhuta5;
                    //            tooltipText = "Lhůta se blíží ke konci, jsou pořízeny všechny kroky vymáhání";
                    //            dat_lhuty = "blue";
                    //            break;
                    //        }
                    //        case 5: {
                    //            iconTemplate = ico_lhuta6;
                    //            tooltipText = "Lhůta se blíží ke konci, chybí některé kroky vymáhání";
                    //            dat_lhuty = "red";
                    //            break;
                    //        }
                    //        case 6: {
                    //            iconTemplate = ico_lhuta7;
                    //            tooltipText = "Je po konci lhůty, jsou pořízeny všechny kroky vymáhání";
                    //            dat_lhuty = "blue";
                    //            break;
                    //        }
                    //        case 7: {
                    //            iconTemplate = ico_lhuta8;
                    //            tooltipText = "Je po konci lhůty, chybí některé kroky vymáhání";
                    //            dat_lhuty = "red";
                    //            break;
                    //        }
                    //        default: {
                    //            iconTemplate = ico_neurce;
                    //            tooltipText = "Neurčeno";
                    //            dat_lhuty = "black";
                    //            break;
                    //        }
                    //    }
                    //    return { icon: iconTemplate, tooltip: tooltipText };
                    //}
                    //---------------------------------------
                    //  Načtení dat z modelu do rekapitulace
                }
                //########################################################################################
                /** Metoda která se provede při změnách určitých polích a nastavení permmissions na základě změn */
                zmenaPole() {
                    const that = this;
                    var c_dto = that.modelPredpisu;
                    that.element.findForms("novyPredpisForm").findFields().gfield("model", "collect", c_dto);
                    //var zp = that.element.findForms("novyPredpisForm").findFields("zp").gfield("getValue");
                    //c_dto.zp = zp.zp;
                    c_dto.ixp = that.Ixp;
                    c_dto.radek_uhr = that.Radek_uhr;
                    c_dto.penKalk = false;
                    c_dto.editace = this.Edit;
                    //ZmenaRadku(GPripadPredpisPermsDto perms, GPredpisDto prep)
                    that.call("ZmenaRadku", { perms: that.permsDto, prep: c_dto })
                        .done(function (data) {
                        var test = data;
                        for (const [key, value] of Object.entries(data)) {
                            that.findFields(key).gfield("option", "disabled", !value);
                        }
                        that.actions.getActions().find(e => e.name == "openTabVyberRozhodnutiAct")?.enabled(data.rozhodnuti); // detail zadatel
                        that.actions.getActions().find(e => e.name == "actSaveOnly")?.enabled(data.save); // detail zadatel
                        that.actions.getActions().find(e => e.name == "actSaveNext")?.enabled(data.save); // detail zadatel
                        that.actions.getActions().find(e => e.name == "actSaveClose")?.enabled(data.save); // detail zadatel
                    });
                }
                //########################################################################################
                jeDatumVeVymahanemOdobi(getDate) {
                    var def = $.Deferred();
                    var that = this;
                    that.isl.Predpisy.jeDatumVeVymahanemOdobi(() => {
                        return {
                            ip_ixp: that.modelPredpisu.ixp ?? this.Ixp,
                            ip_dat: getDate, //that.modelPredpisu.dat_spl!, //Je povinný údaj pro založení předpisu !!!
                        };
                    }).get().done((data) => { def.resolve(data); console.log(def); console.log(data); });
                    return def.promise();
                }
                //########################################################################################
                //private jePredpisZmenem(getDate: Date): JQueryPromise<boolean> {
                //    var def = $.Deferred();
                //    var that = this;
                //    that.isl.Predpisy.jePredpisZmenen(() => {
                //        return {
                //            ip_ixp: that.modelPredpisu.ixp ?? this.Ixp,
                //            ip_radek: that.modelPredpisu.radek_uhr ?? this.Radek_uhr,
                //            ip_dat_old: getDate,
                //        }
                //    }).get().done((data) => { def.resolve(data); console.log(def); console.log(data) });
                //    return def.promise();
                //}
                //########################################################################################
                //#region metody pro výpočty
                /**
                 * Metoda pro výpočet částek
                 * @param spocitat_dat - Proměnná rozhodující, zda-li se má počítat daň
                 */
                prepocetCastek(spocitat_dat) {
                    //debugger; //?-------------------------------
                    var that = this;
                    var form = this.findForms("novyPredpisForm");
                    var predpisDto = {};
                    form.findFields().gfield("model", "collect", predpisDto);
                    if (this.modelPhl.priz_dph_zakl != 1 ||
                        this.modelPhl.priz_dph_sniz != 1 ||
                        this.modelPhl.priz_dph_sniz2 != 1 ||
                        this.modelPhl.priz_osvob != 1 ||
                        this.modelPhl.priz_dph2 != 0) { // Pokud není daňový příjem nic se nemusí dopočítávat
                        that.prvniNastaveni = true;
                        form.findFields("c_z0").gfield("setValue", new Decimal(predpisDto.c ?? 0));
                        form.findFields("c_z1").gfield("setValue", new Decimal(0));
                        form.findFields("c_z2").gfield("setValue", new Decimal(0));
                        form.findFields("c_z3").gfield("setValue", new Decimal(0));
                        //form.findFields("c_z4").gfield("setValue", 0 );
                        form.findFields("c_d0").gfield("setValue", new Decimal(0));
                        form.findFields("c_d1").gfield("setValue", new Decimal(0));
                        form.findFields("c_d2").gfield("setValue", new Decimal(0));
                        form.findFields("c_d3").gfield("setValue", new Decimal(0));
                        //form.findFields("c_d4").gfield("setValue", 0 );
                        form.findFields("priz_ozp").gfield("setValue", 0);
                        that.prvniNastaveni = false;
                        this.PrepocistCZK();
                        return;
                    }
                    that.prvniNastaveni = true;
                    if (spocitat_dat > 0) { // Pokud se má počítat daň
                        //var def = $.Deferred();                
                        //var n_snizena: Decimal, n_zakladni: Decimal, n_treti: Decimal, n_ctvrta: Decimal; // sazby daní               
                        var n_castka, n_dan; // pomocné proměnné 
                        var c_dph_rp, c_bez_dph_rp; // návratové proměnné
                        var n_zakladni = new Decimal(this.getProcentoDane(10) ?? 0);
                        var n_snizena = new Decimal(this.getProcentoDane(20) ?? 0);
                        var n_treti = new Decimal(this.getProcentoDane(30) ?? 0);
                        //var n_ctvrta: Decimal = new Decimal(this.getProcentoDane(40) ?? 0);
                        // Výpočet sníženéhp DPH
                        let c_z1 = new Decimal(predpisDto.c_z1 ?? 0);
                        if (!c_z1.eq(0)) {
                            [c_bez_dph_rp, c_dph_rp] = this.Vypocet_dph(c_z1, false, n_snizena, true);
                            n_dan = c_bez_dph_rp; //Call gf_vypocet_dph( col_c_z1, 0, n_snizena, n_castka, n_dan )
                            n_castka = c_dph_rp;
                            if (predpisDto.c_d1?.toString() == "0") { //TEST
                                predpisDto.c_d1 = n_dan;
                                form.findFields("c_d1").gfield("setValue", n_dan);
                                //predpisDto.c_d1 = (predpisDto.c_d1 == new Decimal(0)) ? n_dan : predpisDto.c_d1;
                            }
                        }
                        // Výpočet normalního DPH
                        let c_z2 = new Decimal(predpisDto.c_z2 ?? 0);
                        if (!c_z2.eq(0)) {
                            [c_bez_dph_rp, c_dph_rp] = this.Vypocet_dph(c_z2, false, n_zakladni, true);
                            n_dan = c_bez_dph_rp; //Call gf_vypocet_dph( col_c_z2, 0, n_zakladni, n_castka, n_dan )
                            n_castka = c_dph_rp;
                            if (predpisDto.c_d2?.toString() == "0") { //TEST
                                predpisDto.c_d2 = n_dan;
                                form.findFields("c_d2").gfield("setValue", n_dan);
                                //predpisDto.c_d2 = (predpisDto.c_d2 == new Decimal(0)) ? n_dan : predpisDto.c_d2;
                            }
                        }
                        // Výpočet třetího DPH
                        let c_z3 = new Decimal(predpisDto.c_z3 ?? 0);
                        if (!c_z3.eq(0)) {
                            [c_bez_dph_rp, c_dph_rp] = this.Vypocet_dph(c_z3, false, n_treti, true);
                            n_dan = c_bez_dph_rp; //Call gf_vypocet_dph( col_c_z3, 0, n_treti, n_castka, n_dan )
                            n_castka = c_dph_rp;
                            if (predpisDto.c_d3?.toString() == "0") { //TEST
                                predpisDto.c_d3 = n_dan;
                                form.findFields("c_d3").gfield("setValue", n_dan);
                                //predpisDto.c_d3 = (predpisDto.c_d3 == new Decimal(0)) ? n_dan : predpisDto.c_d3;
                            }
                        }
                        // Výpočet čtvrtého DPH
                        //let c_z4: Decimal = new Decimal(predpisDto.c_z4 ?? 0);
                        //if (!c_z4.eq(0)) {
                        //    [c_bez_dph_rp, c_dph_rp] = this.Vypocet_dph(new Decimal(c_z4, false, n_ctvrta, true);
                        //    n_dan = c_bez_dph_rp; //Call gf_vypocet_dph( col_c_z4, 0, n_ctvrta, n_castka, n_dan )
                        //    n_castka = c_dph_rp;
                        //    if (predpisDto.c_d4?.toString() == "0") {//TEST
                        //        predpisDto.c_d4 = n_dan;
                        //        form.findFields("c_d4").gfield("setValue", n_dan);
                        //        //predpisDto.c_d4 = (predpisDto.c_d4 == new Decimal(0)) ? n_dan : predpisDto.c_d4;
                        //    }
                        //}
                    }
                    that.prvniNastaveni = false;
                    // Součet všech částek
                    this.SoucetPolozky(true);
                    // Pokud jsem v daňovém typu pohledávky, případ má DIČ a částka je větší jak 10000, nastaví se příznak OZP na FALSE
                    this.NastavPrizOzp();
                }
                /**
                 * Funkce pro vrácení procenta daně
                 * @param danTyp - Typ daně
                 */
                getProcentoDane(danTyp) {
                    //debugger; //?------------------------------- Mělo by fungovat v pořádku
                    var that = this;
                    var vysledek;
                    var form = that.findForms("novyPredpisForm");
                    var rokDph = form.findFields("dat_zdan").gfield("getValue").getFullYear();
                    var mesicDph = form.findFields("dat_zdan").gfield("getValue").getMonth();
                    var hodnota = Decimal.add(Decimal.mul(rokDph, 100).d[0], mesicDph).d[0];
                    if (that.sazbyDPH) {
                        that.sazbyDPH.forEach(function (x) {
                            if (x.dan_typ === danTyp && x.rokmes_od <= hodnota.toString() && x.rokmes_do >= hodnota.toString()) {
                                vysledek = x.dan_proc;
                            }
                        });
                    }
                    return vysledek;
                }
                /**
                 * Nastavení příznaku - Ost. zdan. plnění do 10 000 Kč
                 */
                NastavPrizOzp() {
                    //debugger; //?-------------------------------
                    var that = this;
                    var form = this.findForms("novyPredpisForm");
                    // V nedaňovém vždycky ne
                    if (this.modelPhl.priz_dph_zakl != 1 ||
                        this.modelPhl.priz_dph_sniz != 1 ||
                        this.modelPhl.priz_dph_sniz2 != 1 ||
                        this.modelPhl.priz_osvob != 1 ||
                        this.modelPhl.priz_dph2 != 0) {
                        form.findFields("priz_ozp").gfield("setValue", 0);
                        return;
                    }
                    // V daňovém se nastaví podle částky a DIČ
                    var esu_dic = this.modelPripadu.ExterniSubjekt?.dic?.toString().trim().length || 0;
                    var col_c = form.findFields("c").gfield("getValue");
                    that.prvniNastaveni = true;
                    if ((esu_dic > 1) && ((col_c.abs()).gt(10000))) {
                        form.findFields("priz_ozp").gfield("setValue", 0);
                    }
                    else {
                        form.findFields("priz_ozp").gfield("setValue", 1);
                    }
                    that.prvniNastaveni = false;
                    return;
                }
                /**
                 * Metoda pro sečtení všech položek
                 * @param ip_pocitat_menu - Poměnná rozhodující, zda-li se má počítat měna
                 */
                SoucetPolozky(ip_pocitat_menu) {
                    //debugger; //?-------------------------------
                    const that = this;
                    var form = that.findForms("novyPredpisForm");
                    var predpis = {};
                    form.findFields().gfield("model", "collect", predpis);
                    var c = form.findFields("c").gfield("getValue");
                    var c_z0 = form.findFields("c_z0").gfield("getValue");
                    var c_z1 = form.findFields("c_z1").gfield("getValue");
                    var c_z2 = form.findFields("c_z2").gfield("getValue");
                    var c_z3 = form.findFields("c_z3").gfield("getValue");
                    //var c_z4 = form.findFields("c_z4").gfield<Decimal>("getValue");
                    var c_d0 = form.findFields("c_d0").gfield("getValue");
                    var c_d1 = form.findFields("c_d1").gfield("getValue");
                    var c_d2 = form.findFields("c_d2").gfield("getValue");
                    var c_d3 = form.findFields("c_d3").gfield("getValue");
                    //var c_d4: Decimal = form.findFields("c_d4").gfield<Decimal>("getValue");
                    var c_zao = form.findFields("c_zao").gfield("getValue");
                    var l_celk;
                    that.prvniNastaveni = true;
                    // Pokud se má zaokrouhlovat             
                    if (that.DbParams.ddp_zao_porpre != 0) {
                        l_celk = c_z0.plus(c_d0).plus(c_z1).plus(c_d1).plus(c_z2).plus(c_d2).plus(c_z3).plus(c_d3) /*.plus(c_z4).plus(c_d4)*/;
                        var prcise = l_celk.round();
                        c_zao = prcise.minus(l_celk);
                        c = l_celk.plus(c_zao);
                        form.findFields("c_zao").gfield("setValue", c_zao);
                        form.findFields("c").gfield("setValue", c);
                        //predpis.c_zao = parseFloat(l_celk.toFixed(0)) - l_celk;
                        //predpis.c = l_celk + predpis.c_zao;
                    }
                    else // Výpočet bez zaokrouhlení
                     {
                        var c = c_z0.plus(c_d0).plus(c_z1).plus(c_d1).plus(c_z2).plus(c_d2).plus(c_z3).plus(c_d3) /*.plus(c_z4).plus(c_d4)*/.plus(c_zao);
                        form.findFields("c").gfield("setValue", c);
                    }
                    that.prvniNastaveni = false;
                    if (ip_pocitat_menu) {
                        this.PrepoctiCastkuVMene();
                        return;
                    }
                    else {
                        this.PrepocistCZK();
                        return;
                    }
                }
                /**
                 * Metoda pro přepočet částek ve zvolené měně
                 */
                PrepoctiCastkuVMene(o_kurz) {
                    //debugger; //?-------------------------------
                    var that = this;
                    var form = this.findForms("novyPredpisForm");
                    var col_kurz = o_kurz ?? form.findFields("kurz").gfield("getValue");
                    var col_c = form.findFields("c").gfield("getValue");
                    that.prvniNastaveni = true;
                    if (col_kurz) {
                        //Set col_c_mena = col_c.Cislo() / col_kurz.Cislo()
                        form.findFields("c_mena").gfield("setValue", col_c.div(col_kurz));
                    }
                    else {
                        //Set col_c_mena = col_c.Cislo()
                        form.findFields("c_mena").gfield("setValue", col_c);
                    }
                    that.prvniNastaveni = true;
                }
                /**
                 * Metoda pro výpočet DPH
                 * @param c_p - Zadaná částka
                 * @param b_vcetne_dph - Výpočet daně - při zadání částky s dph je TRUE)
                 * @param dph_proc_p - Hodnota daně
                 * @param b_new - Určtení způsobu výpočtu (true = nový)
                 */
                Vypocet_dph(c_p, b_vcetne_dph, dph_proc_p, b_new) {
                    //TODO b_new -> vytvořit metodu pro zjištění způsoby výpočtu dle Gupta fce "gf_ZpusobVypoctuDPH"
                    var that = this;
                    var c_dph_rp;
                    var c_bez_dph_rp;
                    var koef = new Decimal(0);
                    var zn = 1;
                    if (c_p.lt(0)) { // Otočení znaménka pro záporné hodnoty, ze zaporné hodnoty to dává odlišný výsledek          
                        zn = (-1);
                        c_p = c_p.mul(zn);
                    }
                    if (b_vcetne_dph) { // Výpočet daně při zadáni částky s DPH 
                        if (!b_new) {
                            koef = dph_proc_p.dividedBy(dph_proc_p.plus(100));
                            koef = koef.toDecimalPlaces(4); // Zaokrouhlení na 4 des. místa
                            c_dph_rp = c_p.mul(koef);
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p.mul(dph_proc_p.dividedBy(dph_proc_p.plus(100)));
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p.minus(c_dph_rp);
                    }
                    else {
                        // Výpočet daně při zadání částky bez DPH
                        if (b_new == false) {
                            koef = dph_proc_p.dividedBy(100);
                            c_dph_rp = c_p.mul(koef);
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p.mul(dph_proc_p.dividedBy(100));
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p;
                    }
                    c_dph_rp = c_dph_rp.mul(zn);
                    c_bez_dph_rp = c_bez_dph_rp.mul(zn);
                    return [c_dph_rp, c_bez_dph_rp];
                }
                /**
                 * Funkce pro vrácení daného kurzu měny, dle o_mena
                 * @param o_mena - Druh měny
                 * @param o_kurz - Typ kurzu | N - nákup | S - střed | P - prodej |
                 */
                getKurzMeny(o_mena, o_kurz) {
                    //debugger; //?-------------------------------
                    var that = this;
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
                /**
                 * Metoda pro přepočet Částky v KČ
                 * @param o_kurz - Volitelný parametr pro přenos kurzu.
                 */
                PrepocistCZK(o_kurz) {
                    //debugger; //?-------------------------------
                    var that = this;
                    var form = this.findForms("novyPredpisForm");
                    var col_c_mena = form.findFields("c_mena").gfield("getValue");
                    //debugger;
                    var l_mena = 0;
                    let col_Mena = form.findFields("mena").gfield("getValue");
                    if (col_Mena) {
                        l_mena = col_Mena.mena;
                    }
                    var l_kurz = o_kurz ?? this.getKurzMeny(l_mena, "S");
                    that.prvniNastaveni = true;
                    if (l_mena == 0) {
                        form.findFields("c").gfield("setValue", col_c_mena); //Call col_c.NastavCislo(col_c_mena)
                    }
                    else {
                        form.findFields("c").gfield("setValue", l_kurz.mul(col_c_mena)); //Call col_c.NastavCislo(l_kurz * col_c_mena)
                    }
                    form.findFields("kurz").gfield("setValue", l_kurz);
                    that.prvniNastaveni = false;
                    return;
                }
                /**
                 * Metoda pro přepočet částky v měně
                 */
                PrepoctiDleKurzu() {
                    //debugger; //?-------------------------------
                    var that = this;
                    var form = this.findForms("novyPredpisForm");
                    var l_mena = form.findFields("mena").gfield("getValue").mena;
                    //var l_mena2 = form.findFields("mena").gfield("getValue")
                    var l_kurz;
                    if (l_mena == null) {
                        l_kurz = new Decimal(1);
                    }
                    else {
                        l_kurz = this.getKurzMeny(l_mena, "S");
                        //form.findFields("kurz").gfield("setValue", l_kurz); 
                        that.PrepoctiCastkuVMene(l_kurz);
                        that.PrepocistCZK(l_kurz);
                    }
                }
                /**
                 *
                 */
                PrepoctiCastkuVKorunach() {
                    //debugger; //?-------------------------------
                    var that = this;
                    const zero = new Decimal(0);
                    var form = this.findForms("novyPredpisForm");
                    var kurz = form.findFields("kurz").gfield("getValue");
                    var c = form.findFields("c").gfield("getValue");
                    if (kurz == zero || kurz == null) {
                        form.findFields("kurz").gfield("setValue", 1);
                    }
                    that.prvniNastaveni = true;
                    if (kurz != zero) {
                        form.findFields("c_mena").gfield("setValue", (c.div(kurz)));
                    }
                    else
                        form.findFields("c_mena").gfield("setValue", c);
                    that.prvniNastaveni = false;
                }
                //#endregion
                //########################################################################################
                /**
                 * Akce po kliknutí na tlačítko OK
                 * @method ok()
                 * @param zavrit - Typ akce po uložení předpisu
                 *   0 - Uložit
                 *   1 - Uložit a zavřít - momentálně zrušeno (TODO: vymyslet jak jeden předpis zavřít a další otevřít)
                 *   2 - Uložit a podat další
                 * @returns Chybu v případě neúspěchu nebo zavření dialogu
                 * @returns Uložení předpisu v případě úspěchu
                 */
                ok(zavrit) {
                    //TODO: vytvořit také v této ts části kontroly správnosti vyplnění políček 
                    //TODO: tzn. políčká obsahují správné (=validní) hodnoty a povinná políčka jsou vyplněna
                    //debugger; //?-------------------------------ZAČÁTEK UKLÁDÁNÍ
                    var that = this;
                    that.beginOperation({ id: "ulozeniPredpisu", text: "Probíhá ukládání předpisu..." });
                    //TODO: zkontrolovat, zda byly provedeny nějaké změny - nefunguje protože někde šěpatně načítám nebo dodávám data....
                    //var hasChanged: boolean = this.findForms().gform("hasChanged");
                    //if (!hasChanged) {
                    //    that.endOperation({ id: "ulozeniPredpisu" });
                    //    return that.dialogs.error("Chyba", "Nedošlo k žádné změně - není co uložit");
                    //}
                    let validTest = this.findForms().gform("isValid", true);
                    if (validTest === false) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        return that.dialogs.error("Chyba", "Některá pole nejsou správně vyplněna");
                    }
                    var c_dto = that.modelPredpisu;
                    that.element.findForms("novyPredpisForm").findFields().gfield("model", "collect", c_dto);
                    c_dto.penKalk = false; //nejedná se o uložení předpisu z penKalk - je potřeba nastavit hodnotu na FALSE
                    c_dto.editace = this.Edit; //jedná se o nový záznam, pomocná položka DTO pro další kontroly na straně serveru
                    //if (c_dto.dat_spl == null) {
                    //    that.endOperation({ id: "ulozeniPredpisu" });
                    //    return that.dialogs.error("Chyba", "Není vyplněno datum splatnosti předpisu")
                    //        .on("close", function () {                        
                    //            that.element.findFields('dat_spl').gfield('focus')
                    //        });
                    //}
                    if (new Decimal(c_dto.c).isZero()) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        return that.dialogs.error("Chyba", "Nelze zadat nulovou částku předpisu")
                            .on("close", function () {
                            that.element.findFields('c').gfield('focus');
                        });
                    }
                    if (new Decimal(c_dto.c_mena).isZero()) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        return that.dialogs.error("Chyba", "Nelze zadat nulovou částku v CZK")
                            .on("close", function () {
                            that.element.findFields('c_mena').gfield('focus');
                        });
                    }
                    //that.kontrolaMeny(c_dto.mena!)
                    WebClient.Common.Predpisy.Kontroly.KontrolaMeny(that, c_dto.mena, that.modelPripadu.mena)
                        .done((povoleniJineMeny) => {
                        c_dto.pom_jinaMena = povoleniJineMeny; // pomocná proměnná pro server, zda-li je povolena jiná měna než je měna pohledávky
                        if (!this.Edit) { // Pokud se jedná o nový předpis...
                            c_dto.radek_uhr = null; // správný tvar null potřebný do procedury
                            that.isl.Predpisy.jeDatumVeVymahanemOdobi(() => { return { ip_ixp: c_dto.ixp ?? this.Ixp, ip_dat: c_dto.dat_spl, }; })
                                .get()
                                .done((data) => {
                                if (data) {
                                    that.dialogs.confirm("Upozornění", "Pozor, předpis je zadán v období, které je již vymáháno! \n Uložení tohoto předpisu mohlo vést k rozporu mezi dlužnou a vymáhanou částkou! \n Chcete pokračovat?")
                                        .on("close", (ev, retVal) => {
                                        if (retVal === "yes") {
                                            that.endOperation({ id: "ulozeniPredpisu" });
                                            that.ulozeniPredpisu(c_dto, zavrit);
                                        }
                                        else {
                                            that.endOperation({ id: "ulozeniPredpisu" });
                                            that.notification("showToast", { id: "PredpisUlozeniNeprovedeno", title: "Upozornění", content: "Předpis nebyl uložen" });
                                            return 0;
                                        }
                                    });
                                }
                                else {
                                    that.endOperation({ id: "ulozeniPredpisu" });
                                    that.ulozeniPredpisu(c_dto, zavrit);
                                }
                            });
                        }
                        else {
                            that.endOperation({ id: "ulozeniPredpisu" });
                            that.ulozeniPredpisu(c_dto, zavrit);
                        }
                    })
                        .fail(() => {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        that.notification("showToast", { id: "PredpisUlozeniNeprovedeno", title: "Upozornění", content: "Předpis nebyl uložen" });
                        return 0;
                    });
                }
                //kontrolaMeny(pom_mena: number): JQueryPromise<boolean> {
                //    const that = this;
                //    var povoleniJineMeny: boolean;
                //    var def = $.Deferred();
                //    // V případě že měna nesedí dám dotaz zda s tím uživatel souhlasí
                //    if (!new Decimal(pom_mena!).isZero() && pom_mena != that.modelPripadu.mena) {
                //        that.dialogs.confirm("Upozornění", "Předpis je v jiné měně než je vedena celá pohledávka! \n Pokud případ má předpisy v jiné měně než je uvedeno v hlavičce případu a není to CZK, nebude možné provádět přecenění pohledávek! \n Chcete pokračovat?")
                //            .on("close", (ev, retVal) => {
                //                if (retVal === "yes") {
                //                    povoleniJineMeny = true;
                //                    def.resolve(povoleniJineMeny);
                //                }
                //                else {
                //                    povoleniJineMeny = false;                                                        
                //                    def.reject(povoleniJineMeny);
                //                }
                //            })
                //        return def.promise();
                //    } else {
                //        povoleniJineMeny = true;
                //        return def.resolve(povoleniJineMeny).promise();
                //    }
                //}
                //########################################################################################
                /**
                 * Metoda pro uložení předpisu
                 * @method ulozeniPredpisu()
                 * @param c_dto DTO objekt předpisu, který se má uložit
                 * @param zavrit - Typ akce po uložení předpisu
                 *   0 - Uložit
                 *   1 - Uložit a zavřít
                 *   2 - Uložit a podat další
                 */
                ulozeniPredpisu(c_dto, zavrit) {
                    const that = this;
                    that.beginOperation({ id: "ulozeniPredpisu2", text: "Probíhá ukládání předpisu..." });
                    WebClient.Common.Base.ProcessResponse(that.isl.Predpisy.ulozPredpis(rq => { return { rq: { Data: c_dto } }; }).get(), this, false, false)
                        .done(function (ret) {
                        //debugger; //?-------------------------------POVEDLO SE ULOŽENÍ PŘEDPISU
                        that.Radek_uhr = ret.Dto.radek_uhr;
                        that.Edit = true; //při úspěšném uložení změní hodnotu pro práci nad detailem (mělo by zabránit generování nového řádku předpisu)
                        that.title = `Detail předpisu č.${ret.Dto.radek_uhr}`;
                        that.setBreadcrumbs([{ caption: that.title }]);
                        that.endOperation({ id: "ulozeniPredpisu2" });
                        //that.dialogs.messageBox(`Uloženo`, `Předpis č. ${ret.Dto!.radek_uhr} úspěšně uložen </br>Přejete si pokračovat v úpravách?`, GDlg.mbbYesNo, GDlg.mbiSuccess, 300, 150)
                        //    .on("yes", function () {
                        switch (zavrit) {
                            case 0: { //! 0 - Uložit
                                that.beginOperation({ id: "znovuNacteniPredpisu", text: "Probíhá načtení předpisu..." });
                                //IF Přejete si pokračovat v editaci předpisu? Pokud ano -> Znovunačtení || v opačném připadě zavřu okno
                                //that.isl.Predpisy.read(rq => {
                                //    return {
                                //        data: { ixp: ret.Dto!.ixp, radek_uhr: ret.Dto!.radek_uhr },
                                //        //fragments: ["Default", "Extended"]
                                //    }
                                //}).get()
                                //.done((data) => {
                                that.call("ReadDataPredpisu", { _ixp: ret.Dto.ixp, _radek: ret.Dto.radek_uhr })
                                    .done(function (data) {
                                    //debugger; //?-------------------------------POVEDLO SE ZNOVU-NAČTENÍ PŘEDPISU                            
                                    that.modelPredpisu = data;
                                    let dto = data;
                                    that.findForms("novyPredpisForm").findFields().gfield("model", "apply", dto, { initialValues: true });
                                    that.loadedData();
                                    that.endOperation({ id: "znovuNacteniPredpisu" });
                                })
                                    .fail(function (jqXHR, typ, obj) {
                                    that.endOperation({ id: "znovuNacteniPredpisu" });
                                    if (typ === "exception") {
                                        obj.handled = true;
                                        return that.dialogs.error("Chyba", obj.baseMessage);
                                    }
                                });
                                break;
                            }
                            case 1: { //! 1 - Uložit a zavřít
                                that.close(false);
                                break;
                            }
                            case 2: { //! 2 - Uložit a podat další
                                that.navigate("Gordic.Ddp.WebClient.GDetailPredpisu", { ID: 'DDPGDetailPredpisu#', Titulek: "Nový předpis", Ixp: that.Ixp, Typ_phl: that.Typ_phl, Edit: false, Test: false })
                                    //this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDetailPredpisu", ParamJSON, windowOption)
                                    .on("close", (ev, retVal) => {
                                    that.close(true);
                                });
                                break;
                            }
                        }
                        //if (zavrit == 0) {
                        //    that.beginOperation({ id: "znovuNacteniPredpisu", text: "Probíhá načtení předpisu..." });
                        //    //IF Přejete si pokračovat v editaci předpisu? Pokud ano -> Znovunačtení || v opačném připadě zavřu okno
                        //
                        //    that.isl.Predpisy.read(rq => {
                        //        return {
                        //            data: { ixp: ret.Dto!.ixp, radek_uhr: ret.Dto!.radek_uhr },
                        //            fragments: ["Default", "Extended"]
                        //        }
                        //    }).get()
                        //        .done((data) => {
                        //            //debugger; //?-------------------------------POVEDLO SE ZNOVU-NAČTENÍ PŘEDPISU
                        //            that.modelPredpisu = data.data;
                        //            let dto = data.data
                        //            that.findForms("novyPredpisForm").findFields().gfield("model", "apply", dto);
                        //            that.endOperation({ id: "znovuNacteniPredpisu" });
                        //        })
                        //        .fail(function (jqXHR, typ, obj) {
                        //            that.endOperation({ id: "znovuNacteniPredpisu" })
                        //            if (typ === "exception") {
                        //                obj.handled = true;
                        //                return that.dialogs.error("Chyba", obj.baseMessage);
                        //            }
                        //        })
                        //}
                        //else if (zavrit == 1) {
                        //    //.on("no", function () {
                        //    //debugger; //?-------------------------------
                        //    that.close();
                        //}
                        //else {
                        //    //that.close("new");
                        //    that.navigate("Gordic.Ddp.WebClient.GDetailPredpisu", { ID: 'DDPGDetailPredpisu#', Titulek: "Nový předpis", Ixp: that.Ixp, Typ_phl: that.Typ_phl, Edit: false, Test: false })
                        //        //this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDetailPredpisu", ParamJSON, windowOption)
                        //        .on("close", (ev, retVal) => {
                        //
                        //        });
                        //}
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation({ id: "ulozeniPredpisu2" });
                        //TODO: ProcessResponse - zde upraveno -> k testu
                        //if (typ === "exception") {
                        //    obj.handled = true;
                        //    return that.dialogs.error("Chyba", obj.baseMessage);
                        //    //return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si kontrolu přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistence = false, { confirm: true })); });
                        //}
                    });
                }
                //########################################################################################
                /**
                 * Funkce pro zavření detailu
                 * @method closing()
                 */
                closing() {
                    let that = this;
                    const fields = that.findFields();
                    //kontorla jestli jsou data změněna a jestli změny uložit
                    const edit = false;
                    //const edit = that.findForms().gform("hasChanged");
                    if ((edit)) {
                        Gordic.Eko.Detail.messageBoxUnsavedData(that)
                            .on("no", function () {
                            // bez uložení
                            that.close(false);
                            //return def.resolve(null);
                        })
                            .on("cancel", function () {
                            // bez uložení
                            return 0;
                            //return def.reject();
                        })
                            .createDialogPromise(GDlg.mbbYes.id)
                            .then(function () {
                            that.ok(1);
                        });
                    }
                    else {
                        that.close(false);
                    }
                }
                //close() {
                //    var that = this;
                //    //TODO zprovoznit(EDITOVAT) funkci pro zavření okna
                //    //TODO kontrola změněných políček před zavření
                //}
                //########################################################################################
                /**
                 * Metoda pro načtení dat z formuláře DPH
                 * @method dataDoRekapitulace()
                 * @unused nepoužito
                 * @returns Utilita pro výpočet DPH
                 */
                dataDoRekapitulace() {
                    if (!this.Edit) {
                        this.modelPredpisu.c_mena = new Decimal(0);
                        this.modelPredpisu.c_z0 = new Decimal(0);
                        this.modelPredpisu.c_z1 = new Decimal(0);
                        this.modelPredpisu.c_z2 = new Decimal(0);
                        this.modelPredpisu.c_z3 = new Decimal(0);
                        this.modelPredpisu.c_z4 = new Decimal(0);
                        this.modelPredpisu.c_d0 = new Decimal(0);
                        this.modelPredpisu.c_d1 = new Decimal(0);
                        this.modelPredpisu.c_d2 = new Decimal(0);
                        this.modelPredpisu.c_d3 = new Decimal(0);
                        this.modelPredpisu.c_d4 = new Decimal(0);
                    }
                    this.modelPredpisu.c_z0 = parseDecimal(this.modelPredpisu.c_z0).minus(parseDecimal(this.modelPredpisu.c_d0));
                    var rekapitulace = [
                        // Bez daně a osvobozeno
                        { from: "c_d0", to: { taxType: "-1" /* Gordic.Gin.WebClient.ETaxType.Osvobozeno */, priceType: "baseValue" } },
                        { from: "c_z0", to: { taxType: "0" /* Gordic.Gin.WebClient.ETaxType.BezDane */, priceType: "baseValue" } },
                        // Základní sazba daně
                        { from: "c_z2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "baseValue" } },
                        { from: "c_d2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "tax" } },
                        // Snížená sazba daně
                        { from: "c_z1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "baseValue" } },
                        { from: "c_d1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "tax" } },
                        // Druhá snížená sazba daně
                        { from: "c_z3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "baseValue" } },
                        { from: "c_d3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "tax" } },
                        // Celkem
                        { from: "c_mena", to: { taxType: "-3" /* Gordic.Gin.WebClient.ETaxType.DokladCelkem */, priceType: "sum" } },
                        // -------------------------------
                        // Základní sazba daně - dodanění
                        { from: "c_z2d", to: { taxType: "-10" /* Gordic.Gin.WebClient.ETaxType.ZakladniDodaneni */, priceType: "baseValue" } },
                        { from: "c_d2d", to: { taxType: "-10" /* Gordic.Gin.WebClient.ETaxType.ZakladniDodaneni */, priceType: "tax" } },
                        // Snížená sazba daně - dodanění
                        { from: "c_z1d", to: { taxType: "-20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizenaDodaneni */, priceType: "baseValue" } },
                        { from: "c_d1d", to: { taxType: "-20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizenaDodaneni */, priceType: "tax" } },
                        // Druhá snížená sazba daně - dodanění
                        { from: "c_z3d", to: { taxType: "-30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizenaDodaneni */, priceType: "baseValue" } },
                        { from: "c_d3d", to: { taxType: "-30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizenaDodaneni */, priceType: "tax" } },
                        // ---------------
                        // Zaokrouhlení
                        { from: "c_zao", to: { taxType: "-2" /* Gordic.Gin.WebClient.ETaxType.Zaokrouhleno */, priceType: "sum" } },
                    ];
                    return Gordic.Gin.WebClient.Utils.dphModelApply(this.modelPredpisu, rekapitulace);
                }
                //########################################################################################
                //################=============== T E S T === S P A C E ================##################
                //########################################################################################        
                //#region Testovací metody
                /**
                 * Kontrola řádku předpisu (zřejmě proběhne před uložením ???)
                 * @param nPom
                 * @param sCommand
                 * @param l_old_dat_vzniku
                 * @param l_old_dat_spl
                 */ //Function: KontrolaRadku (v Guptě)
                kontrolaPredpisu(nPom, sCommand, l_old_dat_vzniku, l_old_dat_spl) {
                    const that = this;
                    l_old_dat_vzniku = new Date();
                    l_old_dat_spl = new Date();
                    /** Set tbl_predpisy.nRow = TBL_MinRow */
                    var predpis = {}; //TODO: načíst data z detailu pro otestování
                    //v Guptě se nejspíše (při zavření) kontrolovaly všechny předpisy, tady řešíme tento jeden konkretní takže by LOOP neměl být zapotřebí
                    //LOOP                                      
                    //IF SalTblFindNextRow(tbl_predpisy, tbl_predpisy.nRow, ROW_New | ROW_Edited, ROW_MarkDeleted)
                    //code...
                    //Call set_context(tbl_predpisy.nRow)
                    //! musí být zadaná položka SML
                    if (that.DbParams.ddp_pov_zadsml == 1 && predpis.ixp_sml?.length != 12) {
                        return that.dialogs.error("Chyba", "Musí být zadána položka smlouvy!");
                        //todo:focus na field sml
                        return 0;
                    } //------------------------------------------------------------------
                    if (that.DbParams.ddp_pov_zadsml == 2 && predpis.ixp_sml?.length == 12) {
                        return that.dialogs.error("Chyba", "Nesmí být zadána položka smlouvy");
                        //todo:focus na field sml
                        return 0;
                    } //------------------------------------------------------------------
                    if (!predpis.dat_spl) { //xIf tbl_predpisy.col_dat_spl.Datum() = DATETIME_Null
                        return that.dialogs.error("Chyba", "Není vyplněno datum splatnosti předpisu!");
                        //todo:focus na field dat_spl
                        return 0;
                    } //------------------------------------------------------------------
                    if (!predpis.dat_vzniku) { //xIf tbl_predpisy.col_dat_spl.Datum() = DATETIME_Null
                        return that.dialogs.error("Chyba", "Není vyplněno datum vzniku předpisu!");
                        //todo: na field dat_vzniku
                        return 0;
                    } //------------------------------------------------------------------
                    if (that.kont_splvzn == 0) { //xIf gf_NactiLokalniParametrN('kont_splvzn', 0) 
                        if (predpis.dat_vzniku > predpis.dat_spl) {
                            //xIf tbl_predpisy.col_dat_vzniku.Datum() > tbl_predpisy.col_dat_spl.Datum() 
                            return that.dialogs.error("Chyba", "Datum vzniku předpisu je menší než datum splatnosti!" + "(Kontrolu lze vypnout v Nastavení - Lokální parametry)");
                            //todo:focus na field dat_vzniku
                            return 0;
                        }
                    } //------------------------------------------------------------------
                    //todo  //dotaz zda se jedná o nový předpis nebo se změnilo datum vzniku
                    //if () {     //  If SalTblQueryRowFlags(tbl_predpisy, tbl_predpisy.nRow, ROW_New)         
                    // OR (col_old_dat_vzniku.Datum() != DATETIME_Null AND col_old_dat_vzniku.Datum() != col_dat_vzniku.Datum())
                    if (predpis.dat_vzniku <= this.modelPhl.Nastaveni?.dat_uzav) { //If tbl_predpisy.col_dat_vzniku.Datum() <= g_typ_pohledavky.dat_uzav
                        if (predpis.ktg_upo < 200) { //xIf col_ktg_upo < 200
                            return that.dialogs.error("Chyba", "Jsou zadána data vzniku v uzavřeném období!");
                            //todo:focus na field dat_vzniku
                            return 0;
                        }
                    }
                    //} //------------------------------------------------------------------
                    // ! kontrola na datum změny
                    if (predpis.dat_zmena != null) { //If SalTblQueryRowFlags(tbl_predpisy, tbl_predpisy.nRow, ROW_Edited) AND tbl_predpisy.col_dat_zmena != DATETIME_Null
                        //	If gf_JePredpisZmenen(col_ixp, col_radek_uhr, tbl_predpisy.col_dat_zmena) //Funjkce která vrací dat_zmena z DB a porovná ho s datumem z detailu 
                        //		Call gf_ZobrazChybu('Předpis byl změněn jiným uživatelem, nelze uložit!
                        //				Načtěte obsah tabulky znovu(klávesa F5), proveďte požadované změny a případ znovu uložte.')
                        //		Return 0
                    }
                    // ! kontrola zda nově pořízený předpis nespadá do už vymáhaného období
                    //let boolRet = this.jeDatumVeVymahanemOdobi();
                    /*if (null) { // this.jeDatumVeVymahanemOdobi()   //   gf_JeDatumVeVymahanemOdobi(col_ixp, col_dat_spl.Datum())
                            return that.dialogs.alert("Pozor", `Pozor, předpis č. ${predpis.radek_uhr} je zadán v období, které je již vymáháno! Uložení tohoto předpisu může vést k rozporu mezi dlužnou a vymáhanou částkou!`);
                        }*/
                    //ELSE
                    //BREAK
                    //! kontrola data splatnosti a vzniku
                    //If ddppid.dat_pocatek > l_old_dat_spl AND l_old_dat_spl != DATETIME_Null
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 0
                    //	Call gf_ZobrazChybu('Datum počátku případu (' || gf_FormatujDatum(ddppid.dat_pocatek) || ') je novější než datum splatnosti předpisu některého z předpisů(' || gf_FormatujDatum(l_old_dat_spl) || ')
                    //			Případ nelze zaevidovat!')
                    //	Return 0
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 1
                    //	If NOT gf_ZobrazDotaz('Datum počátku případu(' || gf_FormatujDatum(ddppid.dat_pocatek) || ') je novější než datum splatnosti předpisu některého z předpisů (' || gf_FormatujDatum(l_old_dat_spl) || ')
                    //			Chcete datum počátku případu posunout na '||gf_FormatujDatum( l_old_dat_spl-1 )|| '(den před datum splatnosti nejstaršího předpisu) ?
                    //           Pokud odpovíte NE, případ se nezaeviduje, opravu proveďte ručně.
                    //			')
                    //		Return 0
                    //	Set ddppid.dat_pocatek = l_old_dat_spl - 1
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 2
                    //	If NOT gf_ZobrazDotaz('Datum počátku případu je novější než datum splatnosti některého z předpisů!
                    //			Chcete datum počátku případu posunout na '||gf_FormatujDatum( SalDateConstruct( SalDateYear(l_old_dat_spl),1,1,0,0,0  ))|| '(1.1.roku splatnosti nejstaršího předpisu) ?
                    //               Pokud odpovíte NE, případ se nezaeviduje, opravu proveďte ručně.
                    //			')
                    //		Return 0
                    //	Set ddppid.dat_pocatek = SalDateConstruct(SalDateYear(l_old_dat_spl), 1, 1, 0, 0, 0)
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 3
                    //	!Nic
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 4
                    //	If NOT gf_ZobrazDotaz('Datum počátku případu(' || gf_FormatujDatum(ddppid.dat_pocatek) || ') je novější než datum splatnosti některého z předpisu (' || gf_FormatujDatum(l_old_dat_spl) || ')
                    //			Chcete pokračovat ?
                    //                   (pokračování může mít za následek nesprávný výpočet salda v případě, že je špatně zadána částka počátku případu!)
                    //			')
                    //		Return 0
                    //If ddppid.dat_pocatek > l_old_dat_vzniku AND l_old_dat_vzniku != DATETIME_Null
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 0
                    //	Call gf_ZobrazChybu('Datum počátku případu je novější než datum vzniku některého z předpisů!
                    //			Případ nelze zaevidovat!')
                    //	Return 0
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 1
                    //	If NOT gf_ZobrazDotaz('Datum počátku případu je novější než datum vzniku některého z předpisů!
                    //			Chcete datum počátku případu posunout na '||gf_FormatujDatum( l_old_dat_vzniku-1 )|| '(den před datum vzniku nejstaršího předpisu) ?
                    //           Pokud odpovíte NE, případ se nezaeviduje, opravu proveďte ručně.
                    //			')
                    //		Return 0
                    //	Set ddppid.dat_pocatek = l_old_dat_vzniku - 1
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 2
                    //	If NOT gf_ZobrazDotaz('Datum počátku případu je novější než datum vzniku některého z předpisů!
                    //			Chcete datum počátku případu posunout na '||gf_FormatujDatum( SalDateConstruct( SalDateYear(l_old_dat_vzniku),1,1,0,0,0  ))|| '(1.1.roku vzniku nejstaršího předpisu) ?
                    //               Pokud odpovíte NE, případ se nezaeviduje, opravu proveďte ručně.
                    //			')
                    //		Return 0
                    //	Set ddppid.dat_pocatek = SalDateConstruct(SalDateYear(l_old_dat_vzniku), 1, 1, 0, 0, 0)
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 3
                    //	!Nic
                    //If gf_HodnotaParametruDBN('ddp_pov_autzmd') = 4
                    //	If NOT gf_ZobrazDotaz('Datum počátku případu je novější než datum vzniku některého z předpisů!
                    //			Chcete pokračovat ?
                    //                   (pokračování může mít za následek nesprávný výpočet salda v případě, že je špatně zadána částka počátku případu!)
                    //			')
                    //Return 1
                    return 0;
                }
            };
            GDetailPredpisu = __decorate([
                Decorators.gcontent
                /**
                 * Okno pro detail předpisu a jeho a vytvoření/editaci
                 * @author Martin Hanuš
                 * @copyright   © GORDIC spol. s r. o. 1993-2024
                 * @created 2022-04-25
                 * @lastModified 2024-11-27
                 */
            ], GDetailPredpisu);
            WebClient.GDetailPredpisu = GDetailPredpisu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFByZWRwaXN1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFByZWRwaXN1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsMEZBQTBGO0FBQzFGLGlHQUFpRztBQUNqRyw0RkFBNEY7QUFDNUYsK0ZBQStGO0FBQy9GLDZGQUE2RjtBQUM3RixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBOG9HZjtBQTlvR0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOG9HbkI7SUE5b0dnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4b0c3QjtRQTlvR29CLFdBQUEsU0FBUztZQVMxQixJQUFhLGVBQWU7WUFQNUI7Ozs7OztlQU1HO1lBQ0gsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQXlDWSxnQkFBVyxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFJbEQsS0FBSztvQkFDTCw0REFBNEQ7b0JBQ3BELG1CQUFjLEdBQVksSUFBSSxDQUFDO29CQUN2QyxpQkFBaUI7b0JBQ1QsZUFBVSxHQUFHLFVBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBOC9GMUQsbUNBQW1DO29CQUVuQyx1QkFBdUI7b0JBQ3ZCLDhCQUE4QjtvQkFDOUIsY0FBYztvQkFDZCxrQ0FBa0M7b0JBQ2xDLDRCQUE0QjtvQkFDNUIsaUVBQWlFO29CQUNqRSxPQUFPO29CQUNQLElBQUk7b0JBQ0osNkJBQTZCO29CQUM3Qix3Q0FBd0M7b0JBQ3hDLG1FQUFtRTtvQkFDbkUsK0JBQStCO29CQUMvQiw0RkFBNEY7b0JBQzVGLDBHQUEwRztvQkFDMUcsOEdBQThHO29CQUM5Ryw4R0FBOEc7b0JBQzlHLDZCQUE2QjtvQkFDN0IsZ0hBQWdIO29CQUNoSCxhQUFhO29CQUNiLHlGQUF5RjtvQkFDekYsUUFBUTtvQkFFUiwwREFBMEQ7b0JBQzFELG1EQUFt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RSxDQUFDLEVBQUUsS0FBSyxFQUFFLDJDQUEyQyxFQUFFLENBQUM7NEJBQ2hGLE1BQU07d0JBQ1YsS0FBSyxDQUFDOzRCQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRixJQUFJLEdBQUcsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLGtEQUFrRCxFQUFFLENBQUM7NEJBQ3ZGLE1BQU07d0JBQ1YsS0FBSyxDQUFDOzRCQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRixJQUFJLEdBQUcsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLDBDQUEwQyxFQUFFLENBQUM7NEJBQy9FLE1BQU07d0JBQ1YsS0FBSyxDQUFDOzRCQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRixJQUFJLEdBQUcsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLCtEQUErRCxFQUFFLENBQUM7NEJBQ3BHLE1BQU07d0JBQ1YsS0FBSyxDQUFDOzRCQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRixJQUFJLEdBQUcsR0FBRyxFQUFFLFVBQVUsRUFB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Q0FBQzt3QkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBVSxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsaURBQWlEO3dCQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBVSxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBVSxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsaURBQWlEO3dCQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFD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SCxVQUFHLEtBQUgsVUFBRyxRQThvR25CO0FBQUQsQ0FBQyxFQTlvR1MsTUFBTSxLQUFOLE1BQU0sUUE4b0dmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxQcmVkcGlzdS50cyAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyB6b2JyYXplbsOtIGRldGFpbHUgcMWZZWRwaXN1IGEgamVobyBhIHZ5dHZvxZllbsOtL2VkaXRhY2kgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMi0wNC0yNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICAvKipcclxuICAgICAqIE9rbm8gcHJvIGRldGFpbCBwxZllZHBpc3UgYSBqZWhvIGEgdnl0dm/FmWVuw60vZWRpdGFjaVxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0XHJcbiAgICAgKiBAY3JlYXRlZCAyMDIyLTA0LTI1XHJcbiAgICAgKiBAbGFzdE1vZGlmaWVkIDIwMjQtMTEtMjdcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxQcmVkcGlzdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHZzdHVwbsOtY2ggZGF0XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBSYWRla191aHI6IG51bWJlcjtcclxuICAgICAgICBUeXBfcGhsOiBzdHJpbmc7ICAgXHJcbiAgICAgICAgSXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgRWRpdDogYm9vbGVhbjtcclxuICAgICAgICBEcGhfVHlwX3BobDogYm9vbGVhbjtcclxuICAgICAgICAvKiogUm9rIGtuaWh5IHogZWtvcGFyYW1zICovXHJcbiAgICAgICAgUm9rRGVuOiBudW1iZXI7XHJcbiAgICAgICAgLy8tLS0gICBcclxuICAgICAgICByb2s6IG51bWJlcjtcclxuICAgICAgICB1Y3M6IHN0cmluZztcclxuICAgICAgICBpY286IHN0cmluZztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogIERUTyBwxZllZHBpc3VcclxuICAgICAgICAgKiAgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWxQcmVkcGlzdTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvO1xyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiAgRFRPIHDFmcOtcGFkdVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsUHJpcGFkdTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG87XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqICBEVE8gVHlwdSBwb2hsZWTDoXZreVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbFBobDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEVE8gUMWZw61zdHVwxa8gayBqZWRub3RsaXbDvW0gcG9sw63EjWt1bSBwxZllZHBpc3VcclxuICAgICAgICAgKiAgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkdQcmlwYWRQcmVkcGlzUGVybXNEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHBlcm1zRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HUHJpcGFkUHJlZHBpc1Blcm1zRHRvO1xyXG5cclxuICAgICAgICAvLy8qKiBWc3R1cG7DrSBkYXRhIHBybyBvcHJhdnUgKi9cclxuICAgICAgICAvL3Byb3RlY3RlZCBPcHJhdmE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRGF0YU9wcmF2eVByZWRwaXN1RHRvO1xyXG5cclxuICAgICAgICAvKiogRHRvIHMgcGFyYW1ldHJ5IGFwbGlrYWNlIEREUCAqL1xyXG4gICAgICAgIHByaXZhdGUgRGJQYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBrb250X3NwbHZ6bjogbnVtYmVyID0gdGhpc1tcImtvbnRfc3BsdnpuXCJdO1xyXG4gICAgICAgIC8vLS0tXHJcbiAgICAgICAgcHJpdmF0ZSBzYXpieURQSDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdFa29jZGFwRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBrdXJ6eU1lbnlEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRWtvZGt1ckR0b1tdO1xyXG4gICAgICAgIC8vLS0tXHJcbiAgICAgICAgLy9wcml2YXRlIHJlY2FwRFBIOiBHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5yZWNhcERQSD47XHJcbiAgICAgICAgcHJpdmF0ZSBwcnZuaU5hc3RhdmVuaTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgLyoqIElrb255IExoxa90ICovXHJcbiAgICAgICAgcHJpdmF0ZSBpa29uYUxodXR5ID0gQ29tbW9uLlByZWZhYnMuSWNvbnMuR2V0TGh1dGFJY29ucygpO1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBEZWZpbmljZSB2c3R1cG7DrWNoIGRhdFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIbGF2bsOtIG1ldG9kYSBwcm8gaW5pY2lhbGl6YWNpIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIG9uQ29udGVudFJlYWR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6FtIGRhdGEuLi5cIik7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWFpbkJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVIZWFkZXJGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWFpbkZvcm0oKTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UubmFzdGF2ZW5pUG9sZUt0Z1Vwbyh0aGF0LCB0aGF0Lkl4cERlbiwgdGhhdC5UeXBfcGhsKTsgXHJcbiAgICAgICAgICAgIHRoYXQubG9hZFNhemJhQW5kS3VyeigpOyAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQubG9hZGVkRGF0YSgpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gYWtjw60gbmEgRGV0YWlsdSBwxZllZHBpc3VcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUFjdGlvbnMoKSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWtjZSwga3RlcsOhIGplIHNwdcWhdMSbbmEgcG8gem3DocSNa251dMOtIGtvbWJpbmFjZS4gUG9rdWQgYWtjZSBuZW7DrSBlbmFibGVkLCBuZW7DrSBlbmFibGVkIGFuaSB6a3JhdGthLlxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3BlblRhYlZ5YmVyUm96aG9kbnV0aUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0IHJvemhvZG51dMOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWeWJyYXQgcm96aG9kbnV0w61cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucm96aG9kbnV0aSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IGBWw71ixJtyIHJvemhvZG51dMOtIHDFmcOtcGFkdSAke3RoaXMuSXhwfWAsIHdpZHRoOiAxMDAwLCBoZWlnaHQ6IDYwMCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUGFyYW1KU09OID0geyBJRDogXCJERFBHVnliZXJSb3pob2RudXRpI1wiLCBJeHA6IHRoaXMuSXhwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJSb3pob2RudXRpXCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwicm96aG9kbnV0aVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3BlblRhYlBvcGlzQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71ixJtyIHBvcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVsO9YsSbciBwb3Bpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3BpcyA9IHRoYXQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJwb3Bpc1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IFwiRGV0YWlsIHBvcGlzdVwiLCB3aWR0aDogOTc1LCBoZWlnaHQ6IDY1MCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUGFyYW1zSlNPTiA9IHsgSUQ6IFwiRERQR1BvcGlzeSNcIiwgUG9waXM6IHBvcGlzLCBPa25vOiBcInByZWRwaXNcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1BvcGlzeVwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gdW5kZWZpbmVkKSB0aGF0LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcGVuVGFiVnlwb2NldFByZWRwaXN1QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71wb8SNZXQgcMWZZWRwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIG9rbmEgcHJvIHbDvXBvxI1ldCBwxZllZHBpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uYyxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IFwiVsO9cG/EjWV0IHDFmWVkcGlzdVwiLCB3aWR0aDogNTAwLCBoZWlnaHQ6IDcxMCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUGFyYW1KU09OID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR1Z5cG9jZXRQcmVkcGlzdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSXBfc2F6YmE6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJcF92eXNlOiB0aGlzLm1vZGVsUHJpcGFkdS5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lwX3ByZWRlcHNhbm86IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJcF9kYXRfb2Q6IHRoaXMubW9kZWxQcmlwYWR1LmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElwX2RhdF9kbzogdGhpcy5tb2RlbFByaXBhZHUuZGF0X2RvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JcF9yb2s6IHRoaXMubW9kZWxQaGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HVnlwb2NldFByZWRwaXN1XCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHJldFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcGVuVGFiWmFkYW5pRHBoQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYWTDoW7DrSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWVuw60gb2tuYSBwcm8gemFkw6Fuw60gRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIlphZMOhbsOtIERQSFwiLCB3aWR0aDogNTAwLCBoZWlnaHQ6IDUwMCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUGFyYW1KU09OID0geyBJRDogXCJERFBHWmFkYW5pRHBoI1wiLCBJeHA6IHRoaXMuSXhwLCBUeXBfcGhsOiB0aGlzLlR5cF9waGwsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HWmFkYW5pRHBoXCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyOyAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEtvbnRyb2xhIG7DoXZyYXRvdsO9Y2ggaG9kbm90IHogb2tuYSBwcm8gemFkw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0Rm9ybS5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcInJvemhvZG51dGlcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXRTYXpiYSA9IHJldFZhbC5zYXpiYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0WmFrbGFkOiBEZWNpbWFsID0gcmV0VmFsLnpha2xhZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldERhbjogRGVjaW1hbCA9IHJldFZhbC5kYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXRaYW86IERlY2ltYWwgPSByZXRWYWwuemFvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0Q2Vsa2VtOiBEZWNpbWFsID0gcmV0WmFrbGFkLnBsdXMocmV0RGFuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHJldENlbGtlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEZvcm0uZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX21lbmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLnNhemJhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0Rm9ybS5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLnpha2xhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEZvcm0uZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX21lbmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0Rm9ybS5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8gb2RjaHl0aXQgaG9kbm90eSBhIG5hc3Rhdml0IGplISBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmVkcGlzeVNlem5hbVVrb251XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTZXpuYW0gw7prb27Fr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT3RldsWZw610IHNlem5hbSDDumtvbsWvIHBybyBwxZllZHBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGF0Lm1vZGVsUHJlZHBpc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdF9zcGwgIT0gbnVsbCAmJiBkYXRhLmt0Z191cG8gIT0gbnVsbCAmJiBkYXRhLnByaV91aHIgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2V6bmFtVWtvbnVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIiNERFBHU2V6bmFtVWtvbnUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBjb250ZW50Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRla191aHI6IGNvbnRlbnQuUmFkZWtfdWhyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdF9zcGw6IGRhdGEuZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBLdGdfdXBvOiBkYXRhLmt0Z191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpX3VocjogZGF0YS5wcmlfdWhyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSXhzX2xodTogZGF0YS5peHNfbGh1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBgTmFzdGF2ZW7DrSDDumtvbsWvIHBybyBixJtoIGxoxa90eSBwxZllZHBpc3VgLCA4MDAsIDYwMCkgLy9UT0RPOiBvdGVzdG92YXQgYSBhbnN0YXZpdCB2ZWxpa29zdCBva25hLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Um96aG9kbnV0aURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsIHJvemhvZG51dMOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJEZXRhaWwgdnlicmFuw6lobyByb3pob2RudXTDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvemhvZCA9IHRoaXMuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJyb3pob2RudXRpXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFJvemhvZG51dGkua29udHJvbGFFeGlzdGVuY2VSb3pob2RudXRpKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaV9peHA6IHRoaXMuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlfcm96aDogcm96aG9kID8/IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lYnlsbyB2eWJyYW7DqSBwbGF0bsOpIHJvemhvZG51dMOtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkUm96aG9kbnV0aVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJERFBHUHJpcGFkUm96aG9kbnV0aSNcIiwgSXhwOiB0aGlzLkl4cCwgUm96aG9kbnV0aTogcm96aG9kLCBlZGl0TW9kZTogdHJ1ZSB9LCBcIkRldGFpbCByb3pob2RudXTDrVwiLCA2MTAsIDQ1MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMudmlld1JvemhvZG51dGkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWN0RGF0ZVRvZGF5XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIkRvcGxuaSBha3R1YWxuw60gZGF0dW1cIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHRvb2x0aXA6IFwiRG9wbG5pIGFrdHVhbG7DrSBkYXR1bVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIGRuZXMgPSBuZXcgRGF0ZSgpOyBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBmaWVsZC5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkbmVzKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIHNwb2Ruw61jaCB0bGHEjcOtdGVrIG9rbmEgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVNYWluQnV0dG9ucygpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNYWluQnV0dG9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlT25seVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LnBlcm1zRHRvLnNhdmUhLCAvLyB8fCB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJTYXZlT25seVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZU5leHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXQgYSBwb2RhdCBkYWzFocOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQucGVybXNEdG8uc2F2ZSEsIC8vIHx8IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcImFjdFNhdmVOZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlQ2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXQgYSB6YXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LnBlcm1zRHRvLnNhdmUhLCAvLyB8fCB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJTYXZlT25seVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygxKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcIlNhdmVPbmx5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcoKTsgLy8gdGhhdC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy9uZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjdFJlTG9hZFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJOYcSNw61zdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWNvbjogXCJmYS1yZXBlYXRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJTYXZlT25seVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgLy90aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RSZUxvYWRcIl0sW1wiYWN0U2F2ZU9ubHkhXCIsIFwiYWN0U2F2ZU5leHRcIiwgXCJhY3RTYXZlQ2xvc2VcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0UmVMb2FkXCJdLCBwb3NpdGlvbjogXCJsZWZ0XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RTYXZlT25seVwiXSwgcG9zaXRpb246IFwicmlnaHRcIiwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0U2F2ZU5leHRcIl0sIHBvc2l0aW9uOiBcInJpZ2h0XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RTYXZlQ2xvc2VcIl0sIHBvc2l0aW9uOiBcInJpZ2h0XCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RDbG9zZVwiXSwgcG9zaXRpb246IFwicmlnaHRcIiB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGhsYXZpxI1reSBkb2t1bWVudHVcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUhlYWRlckZvcm0oKVxyXG4gICAgICAgICAqIEByZXR1cm5zIEZvcm11bMOhxZkgaGxhdmnEjWt5IGRva3VtZW50dVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL0RlZmluaWNlIEhlYWRlciBGb3JtdSAow7pkYWplIG8gcMWZw61wYWR1KVxyXG4gICAgICAgICAgICBsZXQgZm9ybVNldHVwID0ge307XHJcbiAgICAgICAgICAgIGxldCBoRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAvL1NFS0NFIDBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vUk9XIDBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJBZ2VuZG92w6kgxI3DrXNsb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIiwgLy9hZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCAvLyAhdGhhdC5wZXJtc0R0by5hYywgLy9obGF2dmnEjWthIHbFvmR5Y2t5IFRSVUVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAxXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZXZpZGVuY2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZXZpZFwiLCAvL2RhdHVtIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLmRhdF9ldmlkLCAvL2hsYXZ2acSNa2EgdsW+ZHlja3kgVFJVRVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWYXJpYWJsaWxuw60gc3ltYm9sXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c19wcmlwYWR1XCIsIC8vdnNcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy8gIXRoYXQucGVybXNEdG8udnMsIC8vaGxhdnZpxI1rYSB2xb5keWNreSBUUlVFXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgM1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBkb2tsYWR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBcIiwgLy90eXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCAvLyAhdGhhdC5wZXJtc0R0by5peHNfdHlwLCAvL2hsYXZ2acSNa2EgdsW+ZHlja3kgVFJVRVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c190eXA9dmFsdWUuaXhzX3R5cFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL1BvZG3DrW5reSBwcm8gem9icmF6ZW7DrSBzcHLDoXZjZSBwb2RsZSBwxZnDrXpuYWt1IHByaXpfc3ByXHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMucHJpel9zcHIgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgaEZvcm1cclxuICAgICAgICAgICAgICAgIC8vc2VrY2UgMVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwb2hsZWTDoXZreVwiKSAvL2RkcHN0cHAucHJpel9zcHIgIT0gMVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLnR5cF9waGwsIC8vaGxhdnZpxI1rYSB2xb5keWNreSBUUlVFXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNwcsOhdmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfc3ByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLmNpc19zcHIsIC8vaGxhdnZpxI1rYSB2xb5keWNreSBUUlVFXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgaEZvcm1cclxuICAgICAgICAgICAgICAgIC8vUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3codGhhdC5EYlBhcmFtcy5kZHBfcmRrX25heiA/PyBcIsWYw6FkZWtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LmNpc2VsbmlrUmFka3UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGRwX3JhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLmRkcF9yYWRlaywgLy9obGF2dmnEjWthIHbFvmR5Y2t5IFRSVUVcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW4sbW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsLG1vZGVsLmRkcF9yYWRlaz12YWx1ZS5kZHBfcmFkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoaXMubW9kZWxQcmlwYWR1Lml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoaXMuVHlwX3BobFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAzXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQuRGJQYXJhbXMuZGRwX2N0dl9uYXogPz8gXCLEjHR2csWlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5jaXNlbG5pa0N0dnJ0aSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfY3R2cnRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy8gIXRoYXQucGVybXNEdG8uZGRwX2N0dnJ0LCAvL2hsYXZ2acSNa2EgdsW+ZHlja3kgVFJVRVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2Rlbixtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGwsbW9kZWwuZGRwX2N0dnJ0PXZhbHVlLmRkcF9jdHZydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhpcy5tb2RlbFByaXBhZHUuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhpcy5UeXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDRcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBuYW1lOiBcIkV4dGVybmlTdWJqZWt0LmVzdV90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLyogaHR0cHM6Ly94d2lraS5nb3JkaWMuY3ovTkVUL2phdmFzY3JpcHQvR29yZGljL0VzdS9QcmVmYWJzLyNIdnliZXJFc3UgKi9cclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIkFkcmVzYVwiKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2NoYW5nZTogZnVuY3Rpb24gKGV2OiBhbnksIGNoYW5nZU9iajogYW55KSB7IEVkaXRvdmFubyA9IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIml4c19lc3U9aXhzX2VzdTtlc3VfZGljPWRpYztlc3VfaWNvPWljbyxlc3VfcmM9cmNcIlxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBMb2dvdmFuaTpcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIEl4cDogdGhhdC5tb2RlbC5peHAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSwgICAgICAgICAvLyB2eWJyYXQgeiBlbnVtdVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBBa3RabmFja2E6ICh0aGF0Lm1vZGVsLmFjX2FnISA9PSBudWxsID8gdGhhdC5tb2RlbC5peHAhIDogdGhhdC5tb2RlbC5hY19hZyEpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiRGV0YWlsIHDFmWVkcGlzdSBERFBcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSwgLy8vICF0aGF0LnBlcm1zRHRvLmljbywgLy8gcG9kbGUgdsWhZWhvIHptxJtuYSBhZHJlc3kgc2UgxZllxaHDrSBwb2RsZSBpxI1hIHByb3Rvxb5lIHYgVEsgc2UgRVNVIHZ5YsOtcsOhIHByw6F2xJsgdGFtLi4uIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy9kaXNhYmxlZDogISh0aGlzLm1vZGVsLml4c19lc3UgIT09IFwiXCIgJiYgdGhpcy5tb2RlbC5kYXRfZXZpZCA9PSBudWxsKSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vPzogViBwxZnDrXBhZMSbIMW+ZSBqZSBwxZnDrXBhZCB2ZSBzdGF2dSBORUVWSURPVsOBTk8sIG3Em2wgYnkgYsO9dCB2eXBudXTDvVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8hOiBwxZlpIHBvZMOhbsOtIHNlIG3Em25pdCBkw6EsIHBvIHVsb8W+ZW7DrSBzZSBuZWRpc2FibGUuLi4gYWxlIHDFmWkgZGFsxaHDrW0gb3RldsWZZW7DrSB1xb4gdG8gZnVuZ3VqZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy9UT0RPOiBNb8W+bsOhIGJ1ZGUgdnnFmWXFoWl0IGRhbMWhw60gc3RhdnkgcMWZaSBrdGVyw71jaCBieSBtxJtsbyBiw710IHBvbGUgdnlwbnV0w6kvYWt0aXZuw60uLi5cclxuICAgICAgICAgICAgICAgIC8vICAgIC8vdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7ICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6bcSbbsSbIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wb1ptZW5lU3ViamVrdHUoY3R4KTsgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwbyB6bcSbbsSbIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gamXFoXTEmyBuYXN0YXbDrW0gb3N0YXRuw60gcG9sw63EjWthIHNwb2plbsOhIHMgcG9wbGF0bsOta2VtIChFU1UpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9pZiAoY3R4LnZhbHVlLmljbykgdGhhdC5tb2RlbC5FeHRlcm5pU3ViamVrdCEuaWNvID0gY3R4LnZhbHVlLmljbztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL2lmIChjdHgudmFsdWUuZGljKSB0aGF0Lm1vZGVsLkV4dGVybmlTdWJqZWt0IS5kaWMgPSBjdHgudmFsdWUuZGljO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vaWYgKGN0eC52YWx1ZS5yYykgdGhhdC5tb2RlbC5FeHRlcm5pU3ViamVrdCEucmMgPSBjdHgudmFsdWUucmM7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8vL1BvIHptxJtuZSBzdWJqZWt0dSBwxZllbmFzdGF2w61tIHBvbGUgcyB2xJtrZW0gcG9wbGF0bsOta2FcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLy8vdGhhdC5uYXN0YXZQb2xlVmVrdSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vLy9Ub2RvLi4uIG1vxb5uw6EgYnVkZSBwb3TFmWViYSB6ZGUgaG9kaXQgYSBuYXN0YXZpdCB0YWvDqSBtYW5pcHVsYWNpdSBzIHBvbGVtIHDFmWl6bmFrdSB1a29uxI1lbsOtL8O6bXJ0w60gcG9wbC4uLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vLy9UT0RPOiBwxZlpIHBvZMOhbsOtIG5vdsOpaG8gcMWZw61wYWR1Li4uID8/P1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwpXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1O2VzdV9kaWM9ZGljO21vZGVsLmxpYz12YWx1ZS5saWM7bW9kZWwucG9yX3phc3Q9dmFsdWUucG9yX3phc3RcIlxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgSXhwOiB0aGlzLm1vZGVsLml4cCA/PyBcIlwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWTDoW7DrSBsb2dvdmFjw61jaCDDumRhanUgamUgbnV0bm9zdCBobGF2bsSbIElYUFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksICAgICAgICAgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgQWt0Wm5hY2thOiAodGhpcy5tb2RlbC5hY19hZyEgPT0gbnVsbCA/IHRoaXMubW9kZWwuaXhwISA6IHRoaXMubW9kZWwuYWNfYWchKSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIkRldGFpbCBQxZllZHBpc3VcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9GaWVsZHNUb0ZpbHRlcnBhbmVsOiBbXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLkVTVUthcnRvdGVrYUZpZWxkVG9GaWx0ZXIuWmtyYXRrYSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL10sXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICAgICAgLyoqL1xyXG4gICAgICAgICAgICAgICAgLy9ST1cgNVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc19wcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLnBvcGlzLCAvL2hsYXZ2acSNa2EgdsW+ZHlja3kgVFJVRVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vU0VLQ0UgMlxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8gUk9XIDBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbmloYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5rbmloYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLml4cF9kZW4sIC8vaGxhdnZpxI1rYSB2xb5keWNreSBUUlVFXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBST1cgMVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwcmFjb3ZhdGVsXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy8gIXRoYXQucGVybXNEdG8uaXhzX2Z1bl9ha3QsIC8vaGxhdnZpxI1rYSB2xb5keWNreSBUUlVFXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bl9ha3Q9dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZHBvdsSbZG7DoSBvc29iYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5naW5zcmVmKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19yZWZfb2RwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLml4c19yZWZfb2RwLCAvL2hsYXZ2acSNa2EgdsW+ZHlja3kgVFJVRVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19yZWZfb2RwPXZhbHVlLml4c19yZWZcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGhGb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBobGF2bsOtaG8gZm9ybXVsw6HFmWUgZGV0YWlsdSBwxZllZHBpc3VcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZU1haW5Gb3JtKCkgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNYWluRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGVWYWxpZGF0b3IgPSBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGtvbnRTcGx2em4gPSB0aGF0Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLktvbnRTcGx2em5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoa29udFNwbHZ6bikge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRGF0dW0gdnpuaWt1IHDFmWVkcGlzdSBqZSBtZW7FocOtIG5lxb4gZGF0dW0gc3BsYXRub3N0aSFcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLb250cm9sYSBuZXNob2R5IMSNw6FzdGt5IHDFmcOtcGFkdSBhIHNhemJ5KnBvxI1ldFxyXG4gICAgICAgICAgICAgICAgZGF0ZVZhbGlkYXRvci52YWxpZGF0ZSA9ICh2YWx1ZSwgc291cmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRTcGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfc3BsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyAvLyBkYXR1bSBzcGxhdG5vc3RpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRWem5pa3UgPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyAvLyBkYXR1bSB2em5pa3U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRWem5pa3UgPCBkYXRTcGwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgICAgICAvLyEtLS0tLUQgZSBmIGkgbiBpIGMgZSAgcCBvIGwgw60gxI0gZSBrIFxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIm5vdnlQcmVkcGlzRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTFTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSk7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBcIlDFmWVkcGlzXHJcbiAgICAgICAgICAgIC8vaW5mb0Zvcm1cclxuICAgICAgICAgICAgbWFpbkZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiUMWZZWRwaXNcIiB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiVsO9xaFlIHDFmWVkcGlzdVwiLCBcInctNFwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiTcSbbmFcIiwgXCJ3LTNcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dCh0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlBvcGlzQ2FzdGthXCIpID8/IFwixIzDoXN0a2EgdiBDWktcIiwgXCJ3LTNcIikgLy9oaW50OiBcIlBybyBvdGV2xZllbsOtIG9rbmEgcHJvIFphZMOhbsOtIERQSCBzdGlza27Em3TEmyA8Yj5GNjwvYj4gPGJyLz4gUHJvIG90ZXbFmWVuw60gb2tuYSBwcm8gVsO9cG/EjWV0IHDFmWVkcGlzdSBzdGlza27Em3TEmyA8Yj5GNDwvYj5cIlxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJLdXJ6XCIsIFwidy0yXCIsKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLy9OYXN0YXZlbsOtIHbDvcWhZSBwxZllZHBpc3UgKHYgbcSbbsSbKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX21lbmFcIiwgLy9Ww73FoWUgcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX21lbmFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2Npc3RDWksoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8vIEJVQ0RQRVAuY19tZW5hXHJcbiAgICAgICAgICAgICAgICAvL05hc3RhdmVuw60gbcSbbnlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZW5hXCIsIC8vTcSbbmFcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ubWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZW5hPXZhbHVlLm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IHsgbWVuYTogMCwgbWVuYV9zaXNfYWFhOiAnQ1pLJywgbWVuYV96a3I6ICdDWksnLCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwibWVuYVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlcG9jdGlEbGVLdXJ6dSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KSAgLy8gQlVDRFBFUC5tZW5hIDw9PiB2YXMuZWtvY21lblxyXG4gICAgICAgICAgICAgICAgLy9OYXN0YXZlbsOtIMSNw6FzdGt5IHYgQ1pLXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNcIiwgLy/EjMOhc3RrYSB2IENaS1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUHJvIG90ZXbFmWVuw60gb2tuYSBwcm8gWmFkw6Fuw60gRFBIIHN0aXNrbsSbdMSbIDxiPkY2PC9iPiA8YnIvPiBQcm8gb3RldsWZZW7DrSBva25hIHBybyBWw71wb8SNZXQgcMWZZWRwaXN1IHN0aXNrbsSbdMSbIDxiPkY0PC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxQaGwucHJpel9kcGhfemFrbCAhPSAxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQaGwucHJpel9kcGhfc25peiAhPSAxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQaGwucHJpel9kcGhfc25pejIgIT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUGhsLnByaXpfb3N2b2IgIT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUGhsLnByaXpfZHBoMiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBpbnB1dC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfejNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJjX3o0XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJjX2Q0XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlcG9jdGlDYXN0a3VWS29ydW5hY2goKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBCVUNEUEVQLmNcclxuICAgICAgICAgICAgICAgIC8vTmFzdGF2ZW7DrSBrdXJ6dSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3VyelwiLCAvL0t1cnpcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy9rdXJ6IGJ5IG3Em2wgYsO9dCB2xb5keWNreSBuZWVkaXRvdmF0ZWxuw70gLT4gVFJVRVxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZTogXCJkZWNpbWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJrdXJ6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlcG9jdGlDYXN0a3VWTWVuZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy8gRERQRFBFUC5rdXJ6XHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlR5cCBwxZllZHBpc3VcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiRGF0dW0gc3BsYXRub3N0aVwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYXR1bSB2em5pa3VcIiwgXCJ3LTNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUHJpb3JpdGEgw7pocmFkeVwiLCBcInctMlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIiwgLy9UeXAgcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmt0Z191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwbzttb2RlbC5rdGdfdXBvX3R4dD12YWx1ZS5rdGdfdXBvX3R4dFwiLCAvLyxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99LXtrdGdfdXBvX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogeyBrdGdfdXBvOiAxMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRWYWx1ZTogeyBrdGdfdXBvOiAxMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wia3RnX3Vwb1wiLCBcImt0Z191cG9fdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogQ29tbW9uLkJhc2UubmFwbG5lbmlQb2xlS3RnVXBvUHJlKDAsIDE5OSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwia3RnX3Vwb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBrdGc6IG51bWJlciA9IE51bWJlcihpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgcHJpVWhyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuaXNsLlByZWRwaXN5LnZyYXRQcmlvcml0dVVocmFkeShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcHJpcDogdGhhdC5tb2RlbFByaXBhZHUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGt0Zzoga3RnLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0UFJvazogdGhhdC5tb2RlbFBobC5OYXN0YXZlbmk/LnJvayA/PyBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSkuZ2V0KCkuZG9uZSgoZGF0YSkgPT4geyBwcmlVaHIgPSBkYXRhIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInByaV91aHJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcHJpVWhyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy8gQlVDRFBFUC5rdGdfdXBvIFxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJrdGdfdXBvX3R4dFwiIH0pIC8vIGZ1Y2N1cG8ua3RnX3Vwb190eHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbmV2w61tIG9ka3VkIHZ6w610IHR4dFxyXG4gICAgICAgICAgICAgICAgLy9OYXN0YXZlbsOtIERhdHVtIHNwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zcGxcIiwgLy9EYXR1bSBzcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmRhdF9zcGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIGRhdGVWYWxpZGF0b3JdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIkpzZW0gdGFkeVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHJldCA9IHRoYXQuamVEYXR1bVZlVnltYWhhbmVtT2RvYmkoaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInXFviB0YW0gbmVqc2VtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy94dmFyIGlucHV0WWVhciA9IGlucHV0LnZhbHVlLmdldEZ1bGxZZWFyKCkgPz8gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiZGF0X3NwbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgVFBfcm9rID0gdGhhdC5tb2RlbFBobC5OYXN0YXZlbmk/LnJvayA/PyBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuRGJQYXJhbXMuZGRwX2Noa19zcGwhID4gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0LnZhbHVlLmdldEZ1bGxZZWFyKCkgLSBUUF9yb2spID4gdGhhdC5EYlBhcmFtcy5kZHBfY2hrX3NwbCEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5lcnJvcihcIlphZGFuw6kgZGF0dW0gc3BsYXRub3N0aSBqZSBtaW1vIGtvbnRyb2xvdmFuw70gaW50ZXJ2YWwhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbyBaYXBzYXQgcmVzb3VyY2VUZXh0OiBaYWRhbsOpIGRhdHVtIHNwbGF0bm9zdGkgamUgbWltbyBrb250cm9sb3ZhbsO9IGludGVydmFsIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IG5hYsOtZG5vdXQgem5vdnUgdsO9YsSbciBkYXRhIHNwbC4gfHwgcG9wxZkuIHZsb8W+aXQgZGF0ZS5OT1cgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8hUmV0dXJuIEZBTFNFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdF92em5pa3VcIikuZ2ZpZWxkKFwidmFsaWRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfc3BsXCIpLmdmaWVsZChcInZhbGlkYXRlXCIpOyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBCVUNEUEVQLmRhdF9zcGxcclxuICAgICAgICAgICAgICAgIC8vTmFzdGF2ZW7DrSBEYXR1bSB2em5pa3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIiwgLy9EYXR1bSB2em5pa3VcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uZGF0X3Z6bmlrdSxcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgZGF0ZVZhbGlkYXRvcl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJkYXRfdnpuaWt1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfdXphdiA9IHRoYXQubW9kZWxQaGwuTmFzdGF2ZW5pPy5kYXRfdXphdiA/PyBEYXRlLm5vdztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwgJiYgaW5wdXQudmFsdWUgPCBkYXRfdXphdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrdGdfdXBvID0gZm9ybS5maW5kRmllbGRzKFwia3RnX3Vwb1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa3RnX3VwbyA8IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5lcnJvcihcIkJ5bG8gemFkw6FubyBkYXR1bSB2IHV6YXbFmWVuw6ltIG9iZG9iw60hXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG8gWmFwc2F0IHJlc291cmNlVGV4dDogQnlsbyB6YWTDoW5vIGRhdHVtIHYgdXphdsWZZW7DqW0gb2Jkb2LDrSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogbmFiw61kbm91dCB6bm92dSB2w71ixJtyIGRhdGEgdnpuaWt1IHx8IHBvcMWZLiB2bG/Fvml0IGRhdGUuTk9XID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyFSZXR1cm4gRkFMU0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IElmIE5PVCBOYXN0YXZEYXR1bXkoY29sX2RhdF92em5pa3UuRGF0dW0oKSwgREFURVRJTUVfTnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyFSZXR1cm4gRkFMU0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X3Z6bmlrdVwiKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfc3BsXCIpLmdmaWVsZChcInZhbGlkYXRlXCIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8vIEJVQ0RQRVAuZGF0X3Z6bmlrdVxyXG4gICAgICAgICAgICAgICAgLy9OYXN0YXZlbsOtIFByaW9yaXR5IMO6aHJhZHlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpX3VoclwiLCAvL1ByaW9yaXRhIMO6aHJhZHlcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucHJpX3VocixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8vIEJVQ0RQRVAucHJpX3VoclxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dChcIkRhdC4gemRhbi4gcGzFiC5cIiwgXCJ3LTNcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlDDoXIuIMSNw6FzdGthXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIsSMw61zbG8gZG9rbGFkdVwiLCBcInctM1wiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwixZjDoWRlayBvcHJhdnlcIiwgXCJ3LTNcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctM1wiLClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX3BhcixcclxuICAgICAgICAgICAgICAgICAgICAvL2xhYmVsOiBcIlDDoXIuIMSNw6FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGF0X3pkYW5cIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5kYXRfemRhbixcclxuICAgICAgICAgICAgICAgIC8vICAgIGluaXRpYWxWYWx1ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KSAvLyBERFBEUEVQLmRhdF96ZGFuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2l4ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5hY19peGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9sYWJlbDogXCLEjMOtc2xvIGRva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBERFBEUEVQLmNpc19kb2tcclxuICAgICAgICAgICAgICAgIC8vIMWYw6FkZWsgb3ByYXZ5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3B1dlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5yYWRla19wdXYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy8gRERQRFBFUC5wcml6X29wclxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJPcHJhdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfb3ByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLnByaXpfb3ByLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6ICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvLnByaXpfb3ByID09PSAxKTsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogZHRvLnByaXpfb3ByID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PT0gdHJ1ZSA/IDEgOiAwOyByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJwcml6X29wclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8hIyMjIyMjIyMgVCBFIFMgVCAjIyMjIyMjXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdygpXHJcbiAgICAgICAgICAgIC8vLmFkZFRleHQoXCJEYXR1bSBwcm8gdGVzdFwiKVxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy00XCIsIHsgbmFtZTogXCJ0ZXN0X2RhdFwiIH0pXHJcbiAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdHlwZTogXCJhY3Rpb25cIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiYWN0U21sQnRuXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJWZSB2eW0uIG9kYm9kaVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgbF9kYXR1bSA9IGZvcm0uZmluZEZpZWxkcyhcInRlc3RfZGF0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCBsX2JvbCA9IHRoaXMuamVEYXR1bVZlVnltYWhhbmVtT2RvYmkobF9kYXR1bSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbF9ib2wuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjaGVja192eW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0eXBlOiBcImFjdGlvblwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJhY3RTbWxCdG5cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcIkplIHptZW7Em24/XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCBsX2RhdHVtID0gZm9ybS5maW5kRmllbGRzKFwidGVzdF9kYXRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IGxfYm9sID0gdGhpcy5qZVByZWRwaXNabWVuZW0obF9kYXR1bSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbF9ib2wuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjaGVja196bWVuXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHJldCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdygpXHJcbiAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHsgbGFiZWw6IFwiem1lbmVuXCIsIG5hbWU6IFwiY2hlY2tfem1lblwiIH0pXHJcbiAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHsgbGFiZWw6IFwidnltYWhhdGVsbmVcIiwgbmFtZTogXCJjaGVja192eW1cIiB9KVxyXG4gICAgICAgICAgICAvLyEjIyMjIyMjIyBUIEUgUyBUICMjIyMjIyNcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiAgXCJQxZllZHBpc1wiXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBcIlJla2FwaXR1bGFjZSBEUEhcIiAtIHNla2NlIHNlIHpvYnJhesOtIGplbiBwb2t1ZCBidWRlIHBvaGxlZMOhdmthIGRhxYhvdsOhKGEgbcSbbCBieXMgdG8gbcOtdCBuYSBkZXRhaWx1IHDFmcOtcGFkdSB0byBzYW3DqSlcclxuXHJcbiAgICAgICAgICAgIC8vaW5mb0Zvcm1cclxuICAgICAgICAgICAgLy8gICAgLmFkZFNlY3Rpb24oeyBuYW1lOiBcImRwaFJlY2FwXCIsIGxhYmVsOiBcIlJla2FwaXR1bGFjZSBEUEhcIiB9KVxyXG5cclxuICAgICAgICAgICAgLy90aGF0LnJlY2FwRFBIID0gbmV3IEdDb250ZW50KFtHb3JkaWMuR2luLldlYkNsaWVudC5yZWNhcERQSCwge1xyXG4gICAgICAgICAgICAvLyAgICBjaGVja1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgIHZpc1R5cGU6IFwiZ3JpZFwiLFxyXG4gICAgICAgICAgICAvLyAgICB0b3RhbEFtb3VudDogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuZmluZEZpZWxkcyhcImNfbWVuYVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyDEjcOhc3RreSwga3RlcsOpIGplIHByb3bDoXrDoW5vIHBybyB6bcSbbnlcclxuICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgLy8gICAgLy90YXhQZXJpb2Q6ICgpID0+IHsgcmV0dXJuIHRoYXQuRG9wbG5PYmRvYmlEUEgodGhhdC5maW5kRmllbGRzKFwiZGF0X3pkYW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpOyB9LCAgICAgICAgIC8vIG5hc3RhdmVuw60gc2F6ZWIgRFBIIGRsZSBvYmRvYsOtXHJcbiAgICAgICAgICAgIC8vICAgIHRheFBlcmlvZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuZmluZEZpZWxkcyhcImRhdF96ZGFuXCIpLmdmaWVsZChcImdldFZhbHVlXCIpID8/IG5ldyBEYXRlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBzYXplYiBEUEggZGxlIG9iZG9iw61cclxuICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgLy8gICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRheERvYzogdGhhdC50eXBfUG9obC5wcml6X2RwaCA9PT0gMTAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGHFiG92w70gZG9rbGFkXHJcbiAgICAgICAgICAgIC8vICAgICAgICB0YXhlZEJ5UmVjaWV2ZXI6IHRoYXQubW9kZWwucHJpel9wZHAgPT09IDEsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpkYW7Em27DrSBwxZnDrWplbWNlbVxyXG4gICAgICAgICAgICAvLyAgICAgICAgb3RoZXJUYXhlZFBheW1lbnQ6IHRoYXQubW9kZWxQcmVkcGlzdS5wcml6X296cCA9PT0gMSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPc3RhdG7DrSB6ZGFuaXRlbG7DqSBwbG7Em27DrSBkbyAxMCAwMDAgQ1pLXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL3VzZURlZHVjdGlvblJhdGlvOiB0aGF0Lm1vZGVsUHJlZHBpc3UucHJpel9wb21lciA9PSAxLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvbcSbciBwcm8gb2Rwb8SNZXRcclxuICAgICAgICAgICAgLy8gICAgICAgIHBlcmlvZERQSDogeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbcSbc8OtYyBhIHJvayB1cGxhdG7Em27DrSBEUEhcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB5ZWFyOiB0aGF0Lm1vZGVsUHJlZHBpc3Uucm9rX2RwaCA/PyBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9udGg6IHRoYXQubW9kZWxQcmVkcGlzdS5tZXNpY19kcGggPz8gbmV3IERhdGUoKS5nZXRNb250aCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcHJpY2VzOiB0aGF0LmRhdGFEb1Jla2FwaXR1bGFjZSgpLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsSbbsOtIMSNw6FzdGVrIGRvIGdyaWR1XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAvL31dKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy90aGF0LnJlY2FwRFBILmVsZW1lbnQuYXBwZW5kVG8odGhpcy5lbGVtZW50KTsgICAgICAgLy8gcMWZaXBvamVuw60gcmVrYXBpdHVsYWNlIGRvIHRhYnVcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5yZWNhcERQSC5vbihcImZpZWxkY2hhbmdlXCIsIChldiwgb2JqKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzbG91Y2jDoW7DrSBuYSB6bcSbbnkgdGFidVxyXG4gICAgICAgICAgICAvLyAgICB2YXIgZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChmaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJuYW1lXCIpID09PSBcInRheERvY1wiKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2Ugem3Em27DrSB6YXRyxb7DrXRrbyBkYcWIb3bDvSBkb2tsYWRcclxuICAgICAgICAgICAgLy8gICAgICAgIGxldCBwcml6RFBIID0gdGhhdC5maW5kRmllbGRzKFwidGF4RG9jXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gaG9kbm90eSBwxZnDrXpuYWt1IGRhxYhvdsOpaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgbGV0IGRhdFpkYW4gPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfemRhblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBob2Rub3R5IGRhdHVtdSB6ZGFuaXRlbG7DqWhvIHBsbsSbbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29udHJvbG5pSGxhc2VuaT8udXBkYXRlKHsgZW5hYmxlZDogcHJpekRQSCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7pwcmF2YSBha2NlIEtvbnRyb2xuw60gaGzDocWhZW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy90aGF0LkRvcGxuT2Jkb2JpRFBIKGRhdFpkYW4pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3B1c3TDrSBzZSBtZXRvZGEgbmEgZG9wbG7Em27DrSBvYmRvYsOtIERQSFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRwaF9UeXBfcGhsKSB7XHJcbiAgICAgICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUmVrYXBpdHVsYWNlIERQSFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKSAvL3RvZG8gcHJpel9veiBJRiB2YWx1ZSBwcm8gem9icmF6ZW5pL3Nrcnl0w60gcG9kbGUgcHJhdmlkbGEgdml6LiB2w73FoWVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiT3N0LiB6ZGFuLiBwbG7Em27DrSBkbyAxMCAwMDAgS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9venBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLnByaXpfb3pwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6ICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvLnByaXpfb3pwID09PSAxKTsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IGR0by5wcml6X296cCA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT09IHRydWUgPyAxIDogMDsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcInByaXpfb3pwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwicHJpel9venBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAvLyBERFBEUEVQLnByaXpfb3pwXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJaw6FrbGFkIGRhbsSbXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYcWIXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJDZWxrZW1cIiwgXCJ3LTQgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAvL09TVk9CT1pFTk9cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsUGhsLnByaXpfb3N2b2IgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3N2b2JvemVub1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfZDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDBjZWxrZW1cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiAwLCAvL1RFU1RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QwXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX2QwY2Vsa2VtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCZXogZGFuxJtcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX3owLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MGNlbGtlbVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IDAsIC8vVEVTVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3owXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3owY2Vsa2VtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsUGhsLnByaXpfZHBoX3NuaXogPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJ2bsOtIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX3oxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkMVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfZDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oxXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxQaGwucHJpel9kcGhfc25pejIgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aMOhIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX3ozLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkM1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfZDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3ozXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkM1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWxQaGwucHJpel9kcGhfemFrbCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbGFkbsOtIHNhemJhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfelwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX2QyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkMlwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY19kXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196ZDJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHN1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY196ZDJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYW9rcm91aGxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX3phbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiRGF0LiB6ZGFuLiBwbMWILlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUm9rIHDFmWl6LkRQSFwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiTcSbcy4gcMWZaXouIERQSFwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfemRhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uZGF0X3pkYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogISEhISB0aGF0Lm9uVmFsaWRhdGVJdGVtKFwiZGF0X3pkYW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAvLyBERFBEUEVQLmRhdF96ZGFuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva19kcGhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLnJva19kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAvLyBERFBEUEVQLnJva19kcGhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5tZXNpY19kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAvLyBERFBEUEVQLm1lc2ljX2RwaFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlDFmcOtei50aXNrdSBkYcWILiBkb2suXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYXQuIHRpc2t1IGRhxYguIGRvay5cIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIsSMw61zbG8gZGHFiG92w6lobyBkb2tsYWR1XCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBQcmVmYWJzLlNlbGVjdC5wcml6bmFrVGlza3UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfdGlza19kZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucHJpel90aXNrX2RkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwcml6X3Rpc2tfZGQ9cHJpel90aXNrX2RkOyBwcml6X3Rpc2tfZGRfdHh0PXByaXpfdGlza19kZF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pIC8vIEREUERQRVAucHJpel90aXNrX2RkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIseyBuYW1lOiBcInByaXpfdGlza19kZF90eHRcIiB9KSAvLyBERFBEUEVQLnByaXpfdGlza19kZFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnlzdF9kZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uZGF0X3Z5c3RfZGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkgLy8gRERQRFBFUC5kYXRfdnlzdF9kZF90eHQgXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9fZGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNpc2xvX2RkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkgLy8gRERQRFBFUC5jaXNsb19kZFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFwiUmVrYXBpdHVsYWNlIERQSFwiXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBcIlDFmcOtem5ha3lcIlxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQxZnDrXpuYWt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoaXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmhpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGlzdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOiAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIGR0by5oaXN0ID09PSAxKTsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogZHRvLmhpc3QgPSAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpID09PSB0cnVlID8gMSA6IDA7IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImhpc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgIC8v4pyTIHBva3VkIGplIHNsb3VwZWMgaGlzdCA9IDFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleGlzdF9yb3pfcHJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5yb3pwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlJvenAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjogJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkdG8uZXhpc3Rfcm96X3ByZWQgPT09IDEpOyByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiBkdG8uZXhpc3Rfcm96X3ByZWQgPSAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpID09PSB0cnVlID8gMSA6IDA7IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImV4aXN0X3Jvel9wcmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgIC8v4pyTIHBva3VkIGplIHNsb3VwZWMgcm96cCA9IDEgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTNcIix7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X25lcGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLnByaXpfbmVwYXJfdHh0LCAvL1RPRE86IHDFmWnFmWFkaWwganNtZSBUWFQgYnnFpSBuZXR1xaHDrW0gYSBuZXbDrW0gemRhIHNlIGplZG7DoSBvIHNwcsOhdm7DqSBva8OpbmtvXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUMOhcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOiAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIGR0by5wcml6X25lcGFyID09PSAxMCk7IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IGR0by5wcml6X25lcGFyID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PT0gdHJ1ZSA/IDEwIDogMDsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwicHJpel9uZXBhclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvL0JVQ0RQRVAucHJpel9uZXBhciB8fCBidWNjcG5lIDAgLyAxMCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfcGVuX2F1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5wcml6X3Blbl9hdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGVuLiBnZW4uYXV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjogJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkdG8ucHJpel9wZW5fYXV0ID09PSAxKTsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogZHRvLnByaXpfcGVuX2F1dCA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT09IHRydWUgPyAxIDogMDsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwicHJpel9wZW5fYXV0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8v4pyTIHBva3VkIGplIHNsb3VwZWMgcHJpel9wZW5fYXV0ID4gMCAoRERQRFBFUC5wcml6X3Blbl9hdXQgKGdpbmNwYW4pKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHQoXCJJZGVudGlmaWvDoXRvciBFUFpcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwic3Rhdl9wclwiIH0pIC8vIEREUERQRVAuc3Rhdl9wciAtLS0gMC8xMDBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJTdGF2XCIsIFwidy00XCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJTdGF2IHDFmWVkcGlzdVwiLCBcInctNFwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiU3RhdiB1YXp2xZllbsOtXCIsIFwidy00XCIsKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBQcmVmYWJzLlNlbGVjdC5wcml6bmFrUHJldm9kdSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3ByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vICF0aGF0LnBlcm1zRHRvLnN0YXZfcHJcclxuICAgICAgICAgICAgICAgICAgICAvKiwgaW5pdGlhbFZhbHVlOiB7c3Rhdl9wcjogMH0qL1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInN0YXZfcHI9c3Rhdl9wclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8vxI3DrXNlbG7DrWsgRERQQ1NQUiBwb2t1ZCBqZSBob2Rub3RhICE9IDAgdGFrIGJ5IG3Em2xvIGLDvXQgcG9sw63EjWtvIHp2w71yYXpuxJtuw6kuSmUgdG8gbmVlZGl0b3ZhdGVsbsOpIHBvbGUuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIFByZWZhYnMuU2VsZWN0LmJ1Y2N1aHIoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic191aHJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsICAvLyAhdGhhdC5wZXJtc0R0by5zX3VocnAsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic191aHJwPXNfdWhycFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8qLCBpbml0aWFsVmFsdWU6IHsgc191aHJwOiAxMCB9Ki9cclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvL2plZG7DoSBzZSBvIMSNw61zZWxuw61rIGJ1Y2N1aHIgLSAgbmVlZGl0b3ZhdGVsbsO9ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBQcmVmYWJzLlNlbGVjdC5zdGF2VXphdmVya3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl91el9wclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCAvLyAhdGhhdC5wZXJtc0R0by5zdGF2X3V6X3ByLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdXpfcHI9dmFsdWUuc3Rhdl91el9wclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8qLCBpbml0aWFsVmFsdWU6IHsgc3Rhdl91el9wcjogMCB9Ki9cclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy8gRERQQ1NVUC5zdGF2X3ByX3R4dCAtIG5lZWRpdG92YXRlbG7DvSAgICBcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBcIlDFmcOtem5ha3lcIiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyNyZWdpb24gXCJQb3Bpc27DqSDDumRhamVcIlxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQb3Bpc27DqSDDumRhamVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiA1XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBERFBEUEVQLnBvem5hbWthXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dChcIlBvcGlzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUG9waXNcIiwgaGludDogXCJQcm8gb3RldsWZZW7DrSBva25hIHBvcGlzxa8gc3Rpc2tuxJt0ZSA8Yj5GNDwvYj5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogNSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQcm8gb3RldsWZZW7DrSBva25hIHBvcGlzxa8gc3Rpc2tuxJt0ZSA8Yj5GNDwvYj5cIlxyXG4gICAgICAgICAgICAgICAgfSkgLy8gRERQRFBFUC5wb3BpcyAoQlVDRFBFUClcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFwiUG9waXNuw6kgw7pkYWplXCJcclxuICAgICAgICAgICAgLy8jcmVnaW9uIFwiUGxhdGVibsOtIMO6ZGFqZVwiXHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlWnAgPSB0aGF0Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLlpwdXNvYnlVaHJhZHlTZXR0aW5ncy5Vc2VacFwiICsgdGhhdC5JeHBEZW4gKyB0aGF0LlR5cF9waGwpID8/IFwiMFwiO1xyXG4gICAgICAgICAgICB2YXIgdXNlWnBBcnJheTogbnVtYmVyW10gPSB1c2VacCA/IHVzZVpwLnNwbGl0KCcsJykubWFwKChpdGVtOiBzdHJpbmcpID0+IHBhcnNlSW50KGl0ZW0udHJpbSgpLCAxMCkpIDogW107XHJcblxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQbGF0ZWJuw60gw7pkYWplXCIpICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlpwxa9zb2Igw7pocmFkeVwiLCBcInctM1wiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiVlNcIiwgXCJ3LTNcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlNTXCIsIFwidy0zXCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJLU1wiLCBcInctM1wiLClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLy9acMWvc29iIHBsYXRieSwgcG91xb7DrXbDoSBzZSBrIHJvemxpxaFlbsOtIGphayBidWRlIHVocmF6ZW5hIG/EjWVrw6F2YW7DoSBwbGF0YmFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5TZWxlY3QuZWtvY2l6cCgpLCB7IC8vWnDFr3NvYiBwbGF0YnksIHBvdcW+w612w6Egc2UgayByb3psacWhZW7DrSBqYWsgYnVkZSB1aHJhemVuYSBvxI1la8OhdmFuw6EgcGxhdGJhXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnpwPXZhbHVlLnpwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt6cH0te3pwX3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogeyB6cDogMTAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uenAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzX3ByaWplbTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsdHIgcG9kbGUgR1VQVFkgbmEgenDFr3NvYnkgw7pocmFkeSAoSmFyb23DrXJvdmEgcGV2bsOhIG1ub8W+aW5hLCBhYnkgbXUgdGFtIG7DoWhvZG91IG7Em2tkbyBuxJtjbyBuZXDFmWlkYWwgfCBaRFJPSiBCcGwuV2ViQ2xpZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8venA6IFsxMCwgMjAsIDMwLCAzMSwgMzIsIDQxLCA0MiwgNTAsIDUxLCA1MiwgNTMsIDU0LCA3MywgODAsIDgxXSwgLy9vZGVicmFuw6kgaG9kbm90eTogMCwgNDAsIDYwLCA3MCAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB6cDogdXNlWnBBcnJheSwgLy9vZGVicmFuw6kgaG9kbm90eTogMCwgNDAsIDYwLCA3MCAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3pwOiB7IG86IFwiIT1cIiwgdjogWzAsIDQwLCA2MCwgNzBdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uYXN0YXZQb3Zpbm5vc3RCdUNpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCBQcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwienBcIixcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uenAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2RlZmF1bHRWYWx1ZTogeyB6cDogdGhhdC5tb2RlbC56cCA/PyAwIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2luaXRpYWxWYWx1ZTogeyB6cDogdGhhdC5tb2RlbC56cCA/PyAwIH0sIC8vdG9kbzogdnnFmWXFoWl0IGluaWNpYWxpemFjaSwgbmVuYcSNdGUgZGF0YSBhbmkgdMOtbXRvIHpwxa9zb2JlbS4uLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwibW9kZWxQcmVkcGlzdS56cD16cFwiLCAvL3RvZG86IFZ5xZllxaFpdCBtb2RlbCwgbmVjaGNlIHNlIG5hxI3DrXN0IHDFmWkgb3RldsWZZW7DrSBkZXRhaWx1Li4uIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAvL1ZTIC0gVmFyaWFiaWxuw60vcMOhcm92YWPDrSBzeW1ib2wgLSBpZGVudGlmaWt1amUgYSByb3psacWhdWplIHDFmcOtY2hvesOtL29kY2hvesOtIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by52cyxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OSpcIixcclxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg6IEludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG9UeXBlTGVuZ3Rocy52cyxcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAxMiB9KV1cclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLypmbGFnOiBcInJlcXVpcmVkXCIsKi9cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAvL1NTIC0gU3BlY2lmaWNrw70gc3ltYm9sIC0gaWRlbnRpZmlrdWplIGEgcm96bGnFoXVqZSBwxZnDrWNob3rDrS9vZGNob3rDrSBwbGF0YnlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NrKCksIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInNzXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9mbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9kZWw6IFwibW9kZWxQcmVkcGlzdS5zcz12YWx1ZS5zc1wiXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJzc1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLnNzLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2NzcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5zcyxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zcz12YWx1ZS5zc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9LUyAtIEtvbnN0YXRuw60gc3ltYm9sIC0gaWRlbnRpZmlrdWplIGEgcm96bGnFoXVqZSBwxZnDrWNob3rDrS9vZGNob3rDrSBwbGF0YnlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7IG5hbWU6IFwia3NcIiwgZmxhZzogXCJyZXF1aXJlZFwiLCB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nrb3MoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3NcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3M9dmFsdWUua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHQoLCBcInctMTJcIilcclxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CYW5rb3Zuw60gw5rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsIHsgbmFtZTogXCJidV92bFwiIH0pIC8vQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrSAtIMSNw61zbG8gw7rEjXR1IHpwcmFjdWrDrWPDrSBvcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwiL1wiLCBcInctMSBjZW50ZXJcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7IG5hbWU6IFwic2tfdmxcIiB9KSAvL1NtxJtyb3bDvSBrw7NkIGJhbmtvdm7DrWhvIMO6xI10dSB2bGFzdG7DrWhvIC0gcm96bGnFoWVuw60gYmFua3kgdSBrdGVyw6kgamUgdmVkZW4gYmFua292bsOtIMO6xI1ldFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntidV92bDp0cmltOmVuY29kZX0gLyB7c2tfdmw6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wiYnVfdmxcIiwgXCJza192bFwiLCBcIm5hemV2XCIsIFwidWVhX3VjXCIsIFwidWViX3VjXCIsIFwibWVuYV90eHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICAvL25hbWU6IFwidWNldF92bFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJza192bD1za192bDsgYnVfdmw9YnVfdmw7IHJvaz1yb2s7IHVjcz11Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92aXo6IGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dmaWVsZCNIY2hhbmdlICBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgbWVuID0gY2hhbmdlT2JqLnZhbHVlLm1lbmE7IFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG1lbiA9IGNoYW5nZU9iai52YWx1ZS5tZW5hO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwibWVuYV9idVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgJC5jb250ZW50KHRoaXMpLnptZW5hTWVuYShtZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwibWVuYV9idVwiKS5zZXRWYWx1ZShtZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyczogeyByb2s6IHRoYXQubW9kZWwucm9rX3BpZCwgdWNzOiB0aGF0Lm1vZGVsLnVjcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBwcmlzdHVwS0JVOiAxLCB1cm92ZW5QcmlzdHVwdUtCVTogMSwgcmV6aW1WeWJlcnVEbGVLbmloeTogMCwgcm9rOiB0aGlzLnJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dCgsIFwidy0xMlwiLClcclxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CYW5rb3Zuw60gw5rEjWV0IGNpesOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCBjaXrDrVwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsIHsgbmFtZTogXCJidV9jaVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwiL1wiLCBcInctMSBjZW50ZXJcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7IG5hbWU6IFwic2tfY2lcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgR29yZGljLkVrby5Db21wb25lbnRzLmVrb3N1Y2koe1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5JeHAgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IHRoaXMubW9kZWxQcmlwYWR1LmFjX2FnID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaURvdGNlbmVob1N1Ympla3R1XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfY2lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmJ1X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbDvWLEm3IgcMWZZXMgMyB0ZcSNa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT0+aXhzX2VzdTtidV9jaT1idV9jaTtza19jaT1za19jaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1uZXZhbGlkb3ZhdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnluZWNow6EgdmFsaWRhY2UgcHJvdGkgRFRPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhzX2VzdTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhzX2VzdVwiLCBcIml4c19lc3VcIiwgZmFsc2UsIHRydWUpLCAgICAgICAgICAgICAgICAgICAgIC8vIHrDoXZpc2xvc3QgemFrb21lbnRvdsOhbmEsIMWZZcWhZW5vIHYgY2hhbmdlIHBvbMOtxI1rYSBpeHNfZXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hUG9sZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBcIlBsYXRlYm7DrSDDumRhamVcIiBcclxuICAgICAgICAgICAgLy8jcmVnaW9uIFwiU21sb3V2YVwiXHJcbiAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlNtbG91dmFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvciBTTUxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb1Z5YmVyU21sb3V2eSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREdG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wb3V6ZVNtbG91dnk6IGZhbHNlLCAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2tTbWw6IHRoYXQuUm9rRGVuLCAvLyB0aGF0LnJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlqbXk6IHRoYXQubW9kZWxQcmVkcGlzdS5rdGdfdXBvISA8IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYW5OZXdBbmRSZWZ1bmQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXN1TG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lm1vZGVsUHJlZHBpc3UuaXhwID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogdGhhdC5tb2RlbFByaXBhZHUuYWNfYWcgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaUVzdVZIbGVkYW5pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGluaXQ6IGZ1bmN0aW9uIChpbnB1dER0bywgZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3UgPSB0aGF0Lm1vZGVsUHJlZHBpc3UuaXhzX2VzdTsgLy8gdGhhdC5maW5kRmllbGRzKFwidnliZXJFc3VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21sb3V2YSA9IHRoYXQuZmluZEZpZWxkcyhcIml4cF9zbWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3UgIT09IG51bGwpIGZpbHRlci5peHNfZXN1ID0gZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc21sb3V2YSAhPT0gbnVsbCkgZmlsdGVyLml4cF9zbWxfcHJpID0gc21sb3V2YS5peHBfc21sX3ByaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXIuc21sdXZuaV9wcmlwYWR5LnB1c2goR29yZGljLkVrby5HVnliZXJTbWxvdXZ5UHJpcGFkeUVudW0uU2VTY2h2YWxlbm91UG9sb3prb3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lucHV0RHRvOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAvL2VzdUxvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgSXhwOiBcIjAwMDBYMDAwMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgRHV2b2RIbGVkYW5pVHh0OiBcIlbDvWLEm3IgU21sb3V2eVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFyZW50Q29udGVudDogdGhhdFxyXG4gICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfc21sPXZhbHVlLml4cF9zbWxfcHJpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuRWRpdCwgLy8vICF0aGF0LnBlcm1zRHRvLml4cF9zbWwsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vISBQxZlpIHBvxZnDrXplbsOtIG5vdsOpaG8gc2Ugc21sb3V2YSB2eWLDrXLDoSwgdGVvcmV0aWNreSB0byBtxa/FvmUgYsO9dCBuZWVkaXRvdmF0ZWxuw70sIGtkecW+IGsgdG9tdSBidWRlxaEgc2Nob3BlbiBwxZlpcG9qaXQgdHUgcG9sb8W+a3Ugc21sb3V2eSBkb2RhdGXEjW7Em1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHQoXCJQb2xvxb5rYSBTTUxcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHQoXCJBQ1wiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KClcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpeHNfc3RlXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uaXhzX3N0ZSwgLy9UT0RPOiAhdGhhdC5wZXJtc0R0by5wb2xvemthX3NtbCxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmFjX3NtbCxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdHlwZTogXCJhY3Rpb25cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImFjdFNtbEJ0blwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL0xldHNEb1RoaXMhXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL1RPRE86IG9uKFwiY2xvc2VcIiwgKCkgPT4geyAvL3RoYXQuem1lbmFQb2xlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFwiU21sb3V2YVwiXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBcIkxoxa90YVwiICB6b2JyYXp1amUgc2UgcG91emUgcG9rdWQgamUgcG92b2xlbmEgcHLDoWNlIHMgbGjFr3RhbWFcclxuICAgICAgICAgICAgbWFpbkZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiTGjFr3RhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTGjFr3RhLCBLb25lYyBsaMWvdHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTlcIix7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X2xodXR5XCIsIC8vIFN0YXYgbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl9saHV0eT12YWx1ZS5zdGF2X2xodXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBzdGF2X2xodXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntwb3Bpc31cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9saHV0eTogMCwgcG9waXM6IFwiTGjFr3RhIG5lbsOtIG5hc3RhdmVuYSwgbmVibyBuZWx6ZSB1csSNaXRcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9saHV0eTogMSwgcG9waXM6IFwiUMWZZWRwaXMgamUgdnlwb8WZw6FkYW7DvSwgbmVixJvFvsOtIMW+w6FkbsOhIGxoxa90YVwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF2X2xodXR5OiAyLCBwb3BpczogXCJMaMWvdGEgYsSbxb7DrSwganNvdSBwb8WZw616ZW55IHbFoWVjaG55IGtyb2t5IHZ5bcOhaMOhbsOtXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfbGh1dHk6IDMsIHBvcGlzOiBcIkxoxa90YSBixJvFvsOtLCBjaHliw60gbsSba3RlcsOpIGtyb2t5IHZ5bcOhaMOhbsOtXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfbGh1dHk6IDQsIHBvcGlzOiBcIkxoxa90YSBzZSBibMOtxb7DrSBrZSBrb25jaSwganNvdSBwb8WZw616ZW55IHbFoWVjaG55IGtyb2t5IHZ5bcOhaMOhbsOtXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfbGh1dHk6IDUsIHBvcGlzOiBcIkxoxa90YSBzZSBibMOtxb7DrSBrZSBrb25jaSwgY2h5YsOtIG7Em2t0ZXLDqSBrcm9reSB2eW3DoWjDoW7DrVwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF2X2xodXR5OiA2LCBwb3BpczogXCJKZSBwbyBrb25jaSBsaMWvdHksIGpzb3UgcG/FmcOtemVueSB2xaFlY2hueSBrcm9reSB2eW3DoWjDoW7DrVwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF2X2xodXR5OiA3LCBwb3BpczogXCJKZSBwbyBrb25jaSBsaMWvdHksIGNoeWLDrSBuxJtrdGVyw6kga3Jva3kgdnltw6Fow6Fuw61cIn0gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF2TGh1dHlTdGF0ZVwiLCAgICAgLy8gbmVwb3Zpbm7DvSwgcG91emUgcG9rdWQgYnVkZSBwb3TFmWViYSBpa29udSBhZHJlc292YXQvbcSbbml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGF0Lmlrb25hTGh1dHkubGh1dGEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwib3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1lbGxpcHNpcy1oXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZnDrXQgc2V6bmFtIMO6a29uxa8gbmFkIGxoxa90b3UgcMWZZWRwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlRWRpdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFByZWRwaXN5U2V6bmFtVWtvbnVcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkgeyB0aGF0LmluaXRpYWxTdGF2dUxodXR5KGZhbHNlKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTlcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJzdGF2X2xodXR5XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uaXhzX2xodSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHN0YXRlczogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWQ6IFwic3RhdkxodXR5U3RhdGVTYXJ5XCIsICAgICAvLyBuZXBvdmlubsO9LCBwb3V6ZSBwb2t1ZCBidWRlIHBvdMWZZWJhIGlrb251IGFkcmVzb3ZhdC9txJtuaXRcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvbjogXCJmYS1vcGVuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGljb246IFwiZmEtZWxsaXBzaXMtaFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFByZWRwaXN5U2V6bmFtVWtvbnVcIl1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICBdLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2xodXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmRhdF9saHV0eSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBcIkxoxa90YVwiICAgICAgICBcclxuICAgICAgICAgICAgLy8jcmVnaW9uIFwiUm96aG9kbnV0w61cIlxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJSb3pob2RudXTDrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIsSMw61zbG8gcm96aG9kbnV0w61cIiwgaGludDogXCJQcm8gb3RldsWZZW7DrSBva25hIHBybyB2w71ixJtyIHJvemhvZG51dMOtIHN0aXNrbsSbdGUgPGI+RjQ8L2I+XCIgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pob2RudXRpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQcm8gb3RldsWZZW7DrSBva25hIHBybyB2w71ixJtyIHJvemhvZG51dMOtIHN0aXNrbsSbdGUgPGI+RjQ8L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLnJvemhvZG51dGksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFJvemhvZG51dGlEZXRhaWxcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1lbGxpcHNpcy1oXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJvcGVuVGFiVnliZXJSb3pob2RudXRpQWN0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvL3Zhcy5ERFBEUEVQLnJvemhvZG51dGlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcInctM1wiLCB7IC8vVE9ETzogcMWZaWRhdCB0dXRvIG1vxb5ub3N0IHDFmcOtbW8gZG8gZmllbGR1IHBybyByb3pob2RudXTDrS4uID9cclxuICAgICAgICAgICAgICAgIC8vICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHR5cGU6IFwiYWN0aW9uXCIsIC8vVE9ETzogTmFzdGF2aXQgbmEgcm96aG9kbnV0w60gbW/Fvm5vc3QgdnlicmF0IHNpIHBvdXplIHogZXhpc3R1asOtY8OtY2ggcm96aG9kbnV0w6EgcMWZw61wYWR1IVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiYWN0Um96aG9kbnV0aURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIkRldGFpbCB2eWJyYW7DqWhvIHJvemhvZG51dMOtXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciByb3pob2QgPSB0aGlzLmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwicm96aG9kbnV0aVwiKS5nZmllbGQ8bnVtYmVyPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkUm96aG9kbnV0aS5rb250cm9sYUV4aXN0ZW5jZVJvemhvZG51dGkocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlfaXhwOiB0aGlzLkl4cCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaV9yb3poOiByb3pob2QgPz8gMFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVieWxvIHZ5YnJhbsOpIHBsYXRuw6kgcm96aG9kbnV0w61cIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZFJvemhvZG51dGlcIiwgeyBJRDogXCJERFBHUHJpcGFkUm96aG9kbnV0aSNcIiwgSXhwOiB0aGlzLkl4cCwgUm96aG9kbnV0aTogcm96aG9kLCBlZGl0TW9kZTogdHJ1ZSB9LCBcIkRldGFpbCByb3pob2RudXTDrVwiLCA2MTAsIDQ1MClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy52aWV3Um96aG9kbnV0aS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFQb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFwiUm96aG9kbnV0w61cIlxyXG4gICAgICAgICAgICAvLyNyZWdpb24gXCLDmsSNdG92w6Fuw61cIlxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCLDmsSNdG92w6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLFmMOhZGVrIMO6xI1ldG7DrWhvIHBvaHlidVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8ucmFkZWtfdXBvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYVBvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhY3Rpb25cIiwgLy9UT0RPOiA9PT09PT09IFogIMSMIEUgSCBPICBTIEUgQiBSIEEgVCAgRCBFIFQgQSBJIEwgIMWYIMOBIEQgSyBVICDDmiDEjCBUIC4gIFAgTyBIIFkgQiBVID8gPT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVY3RCdG5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1BvaHlieVByaXBhZHVcIiwgeyBJRDogXCJERFBHUG9oeWJ5UHJpcGFkdSNcIiwgaXhwOiB0aGF0Lkl4cCwgem9icmF6ZW5pOiB0aGF0Lm1vZGVsUHJlZHBpc3UudWNldG5pX3BvaHliLCBkYXRfb2Q6IHRoYXQubW9kZWxQcmVkcGlzdS5kYXRfb2QsIGRhdF9kbzogdGhhdC5tb2RlbFByZWRwaXN1LmRhdF9kbyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTGV0c0RvVGhpcyFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IG9uKFwiY2xvc2VcIiwgKCkgPT4geyAvL3RoYXQuem1lbmFQb2xlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBcIsOaxI10b3bDoW7DrVwiXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGN1cnJlbmN5Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBpbmZvRm9ybSk7XHJcbiAgICAgICAgICAgIC8vdGhhdC5yZWNhcERQSC5lbGVtZW50LmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7ICAgICAgIC8vIHDFmWlwb2plbsOtIHJla2FwaXR1bGFjZSBkbyB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgICAgIC8vIyMjIyNLTMOBVkVTT1bDiSBaS1JBVEtZIyMjIyMjXHJcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtLmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwiY1wiKS5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkY2XCIsIC8va2zDoXZlc292w6EgemtyYXRrYSBGNlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBPdGV2xZllbsOtIG9rbmEgcHJvIH5aYWTDoW7DrSBEUEh+IG5hZCBwb2zDrcSNa2VtICR7dGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5Qb3Bpc0Nhc3RrYVwiKSA/PyBcIsSMw6FzdGthIHYgQ1pLXCJ9YCwgLy9Qb3BpcyBrbMOhdmVzb3bDqSB6a3JhdGt5IHBybyB6b2JyYXplbsOtIHYgbsOhcG92xJtkxJsuXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuRmllbGQsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcIm9wZW5UYWJaYWRhbmlEcGhBY3RcIl0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkZWZhdWx0Rm9ybS5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcImNcIikuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJGNFwiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2EgRjRcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgT3RldsWZZW7DrSBva25hIHBybyB+VsO9cG/EjWV0IHDFmWVkcGlzdX4gbmFkIHBvbMOtxI1rZW0gJHt0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLk9iZWNuZVNldHRpbmdzLlBvcGlzQ2FzdGthXCIpID8/IFwixIzDoXN0a2EgdiBDWktcIn1gLCAvL1BvcGlzIGtsw6F2ZXNvdsOpIHprcmF0a3kgcHJvIHpvYnJhemVuw60gdiBuw6Fwb3bEm2TEmy5cclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wib3BlblRhYlZ5cG9jZXRQcmVkcGlzdUFjdFwiXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtLmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwicm96aG9kbnV0aVwiKS5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkY0XCIsIC8va2zDoXZlc292w6EgemtyYXRrYSBGNFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiT3RldsWZZW7DrSBva25hIHBybyB+VsO9YmVyIHJvemhvZG51dMOtfiBuYWQgcG9sw63EjWtlbSByb3pob2RudXRpXCIsIC8vUG9waXMga2zDoXZlc292w6kgemtyYXRreSBwcm8gem9icmF6ZW7DrSB2IG7DoXBvdsSbZMSbLlxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkZpZWxkLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJvcGVuVGFiVnliZXJSb3pob2RudXRpQWN0XCJdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtLmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwicG9waXNcIikuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJGNFwiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2FcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk90ZXbFmWVuw60gb2tuYSBwb3Bpc8WvXCIsIC8vUG9waXMga2zDoXZlc292w6kgemtyYXRreSBwcm8gem9icmF6ZW7DrSB2IG7DoXBvdsSbZMSbLlxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkZpZWxkLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJvcGVuVGFiUG9waXNBY3RcIl1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRnVua2NlIHBybyBuYXN0YXZlbsOtIHprcmF0ZWsgZG8gR0RBVEVCT1ggcG9sw63EjWVrXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2Uuc2V0RGF0ZUJveFNob3J0Y3V0cyh0aGF0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHNlc3RhdmVuw60gYSBuYXN0YXZlbsOtIGhsYXZpxI1reSBkb2t1bWVudHVcclxuICAgICAgICAgKiBAbWV0aG9kIG9uRGV0YWlsQnVpbGRlckJ1aWxkKClcclxuICAgICAgICAgKiBAcGFyYW0gYnVpbGRlciBidWlsZGVyIGRldGFpbHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgLy9jb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGZvcm1TZXR1cCA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IHRoaXMuY3JlYXRlSGVhZGVyRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgLy9idWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJmb3JtSGVhZGVyXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00zUzEsIEwtMy05LTAsIE0tMTItMTItMCwgUy0xMi0xMi0wLCBicmVha3MtODgwLTEyNzBcIiB9KTtcclxuICAgICAgICAgICAgLy9idWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJmb3JtSGVhZGVySW5mb1NlY3Rpb25cIiwgeyBjdXN0b21DbGFzczogXCJ3LUwtMiB3LU0tMyB3LVMtMTJcIiB9KTtcclxuICAgICAgICAgICAgLy9idWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJmb3JtSGVhZGVyU2VjdGlvbk9uZVwiLCB7IGN1c3RvbUNsYXNzOiBcInctTC03IHctTS02IHctUy0xMlwiLCByb3dzOiBmb3JtLmZvcm0uc2VjdGlvbnMhWzBdLnJvd3MgfSk7XHJcbiAgICAgICAgICAgIC8vYnVpbGRlci51cGRhdGVEZWZpbml0aW9uKFwiZm9ybUhlYWRlclNlY3Rpb25Ud29cIiwgeyBjdXN0b21DbGFzczogXCJ3LUwtMyB3LU0tMyB3LVMtMTJcIiwgcm93czogZm9ybS5mb3JtLnNlY3Rpb25zIVsxXS5yb3dzIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5JbmZvXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuSWQpWzBdPy5pdGVtLCAvLyBJWFBcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuQWdlbmRvdmVDaXNsbylbMF0/Lml0ZW0sIC8vIGFnZW5kb3ZlIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbMl0sIC8vIHZzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzJdLCAvLyDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTFdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsxXS5yb3dzIVswXSwgLy8gdHlwIHBobFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5UeXBEb2tsYWR1KVswXT8uaXRlbSwgLy8gdHlwIGRva2xhZHUgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuRGF0dW1FdmlkZW5jZSlbMF0/Lml0ZW0sIC8vIGRhdHVtIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzNdLCAvLyDEjXR2csWlXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTJdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5LbmloYSlbMF0/Lml0ZW0sIC8vIEtuaWhhICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuWnByYWNvdmF0ZWwpWzBdPy5pdGVtLCAvLyBacHJhY292YXRlbFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsyXS5yb3dzIVsyXSwgLy8gT2RwLiBvc29iYVxyXG4gICAgICAgICAgICAgICAgICAgIC8vUG9kbcOtbmt5IHBybyB6b2JyYXplbsOtIHNwcsOhdmNlIHBvZGxlIHDFmcOtem5ha3UgcHJpel9zcHJcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGlzLnByaXpfc3ByID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMV0sIC8vIHNwcsOhdmNlXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTNdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLlBvcGlzKVswXT8uaXRlbSwgLy8gUG9waXMgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzRdLCAvLyBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzRdLCAvLyBBZHJlc2FcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIC8vZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuUG9waXNdID0gXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAvLyAgICBvcHRpb25zOiB7IHJvd3M6IDIgfVxyXG4gICAgICAgICAgICAvL30gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5zZXR1cChidWlsZGVyLCBmb3JtU2V0dXApO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmJ1aWxkZXJTdGF0dXNCYXIgPSAoKDxhbnk+YnVpbGRlcikuc3RhdHVzQmFyRGVmaW5pdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gbmHEjXRlbsOtIGRhdCBcclxuICAgICAgICAgKiBAbWV0aG9kIGxvYWREYXRhKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7MH0gViBwxZnDrXBhZMSbLCDFvmUgc2UgbmVuYcSNZXRseSBzYXpieSBEUEggbmVibyBLdXJ6eSwgdnlza2/EjcOtIHogbWV0b2R5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9IFBva3VkIG5hxI10ZSBkYXRhLCB0YWsgbmFwbG7DrSBmb3JtdWzDocWZZSBkYXR5IGEgdnlwbmUgbmHEjcOtdMOhbsOtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkZWREYXRhKCk6IDAgfCB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhemJ5RFBIID09IHVuZGVmaW5lZCkgLy9wb2t1ZCBzZSBuZW5hxI1ldGx5IHNhemJ5IERQSCAtPiB2csOhdMOtbSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMua3VyenlNZW55RHRvID09IHVuZGVmaW5lZCkgLy9wb2t1ZCBzZSBuZW5hxI1ldGwga3VyenkgbcSbbiAtPiB2csOhdMOtbSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgLy9wb2t1ZCBzZSBuYcSNZXRsIHbFoWUgcG90xZllYm7DqS4uLnZ5cG51IG5hxI3DrXTDoW7DrSBhIG3Fr8W+dSBwb2tyYcSNb3ZhdFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWxQcmVkcGlzdSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5tb2RlbFByaXBhZHUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcyhcInBvcGlzX3ByaXBhZHVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5tb2RlbFByaXBhZHUucG9waXMsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcyhcInZzX3ByaXBhZHVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5tb2RlbFByaXBhZHUudnMsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJidV92bFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWxQcmlwYWR1LmJ1X3ZsKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJza192bFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWxQcmlwYWR1LnNrX3ZsKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJidV9jaVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWxQcmlwYWR1LmJ1X3ZsKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJza19jaVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWxQcmlwYWR1LnNrX3ZsKTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQubW9kZWxQcmVkcGlzdS5wcml6X29wciA9PSAxKVxyXG4gICAgICAgICAgICAvL2lmICghdGhpcy5FZGl0KSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcIm1lbmFcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsUHJpcGFkdS5tZW5hKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQucG9abWVuZVN1Ympla3R1KHRoaXMubW9kZWxQcmVkcGlzdS5peHNfZXN1KTtcclxuICAgICAgICAgICAgdGhhdC5uYWN0aVN1Ympla3QoKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpIDwgLSB3YWl0Zm9ydmFsdWVzXHJcbiAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKCcuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpJykuZmlyc3QoKS5nZmllbGQoJ2ZvY3VzJylcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50Lmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdGlhbFN0YXZ1TGh1dHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gbmHEjXRlbsOtIFNhemViIERQSCBhIGt1cnrFryBtxJtuXHJcbiAgICAgICAgICogQG1ldGhvZCBsb2FkRGF0YSgpXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9IE5hxI10ZSBkYXRhIGEgbmFzdGF2w60gamUgZG8gcMWZaXByYXZlbsO9Y2ggRFRPIG9iamVrdMWvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkU2F6YmFBbmRLdXJ6KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gTmFwbG7Em27DrSBEVE8gb2JqZWt0dSBwcm8gc2F6YnkgRFBIXHJcbiAgICAgICAgICAgIHZhciBEUEggPSB0aGF0LmlzbC5QcmVkcGlzeS52cmF0RFBIKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgRFBILmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2F6YnlEUEggPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRlZERhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXBsbsSbbsOtIERUTyBvYmpla3R1IHBybyBrdXJ6eSBtxJtuXHJcbiAgICAgICAgICAgIHZhciBLdXJ6eSA9IHRoYXQuaXNsLlByZWRwaXN5LnZyYXRLdXJ6TWVueSgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIEt1cnp5LmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQua3VyenlNZW55RHRvID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkZWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmHEjXRlbsOtIGV4dGVybsOtaG8gc3ViamVrdHUgeiBwxZnDrXBhZHUgZG8gcG9sw63EjWVrIGJhbmtvdm7DrWNoIMO6xI10xa9cclxuICAgICAgICAgKiBAbWV0aG9kIG5hY3RpU3ViamVrdCgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aVN1Ympla3QoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBpeHNFc3UgPSB0aGF0Lm1vZGVsUHJpcGFkdS5peHNfZXN1O1xyXG4gICAgICAgICAgICAvLyBPxaFldMWZZW7DrSBjaXrDrWhvIGJhbmtvdm7DrSDDusSNdHVcclxuICAgICAgICAgICAgY29uc3QgYnVjaUZpZWxkID0gdGhhdC5maW5kRmllbGRzKFwiYnVfY2lcIik7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBjaXrDqWhvIGJhbmtvdm7DrWhvIMO6xI10dVxyXG5cclxuICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBpeHNfZXN1OiBpeHNFc3UgfSk7XHJcblxyXG4gICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4geyAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gYWt0dcOhbG7DrWNoIHNlcnZlcm92w71jaCBmaWx0csWvIChwcm9taXNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb3N1Y2koKS5nZXREYXRhKHNmKSAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBob2Rub3QgcG9sw63EjWthIHMgYWt0dcOhbG7DrW1pIHNlcnZlcm92w71taSBmaWx0cnlcclxuICAgICAgICAgICAgfSkudGhlbigoYnVjaSkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbyB2csOhY2Vuw61cclxuICAgICAgICAgICAgICAgIGlmIChidWNpLmxlbmd0aCA9PT0gMSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSBqZWRuYSB2csOhY2Vuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBidWNpWzBdLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7ICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuw61tIGrDrSBkbyBwb2zDrcSNa2FcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2UgYnVjaUZpZWxkLmdmaWVsZChcImNsZWFyXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHbDrWNlIG5lYm8gxb7DoWRuw6EgaG9kbm90YSwgdGFrIMO6xI1ldCB2eW1hxb51XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLkVkaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImJ1X2NpXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYnVfY2k6IHRoYXQubW9kZWxQcmlwYWR1LmJ1X2NpLCBza19jaTogdGhhdC5tb2RlbFByaXBhZHUuc2tfY2kgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYnVfdmxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBidV92bDogdGhhdC5tb2RlbFByaXBhZHUuYnVfdmwsIHNrX3ZsOiB0aGF0Lm1vZGVsUHJpcGFkdS5za192bCB9LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ2c1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0Lm1vZGVsUHJpcGFkdS52cywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia3NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBrczogdGhpcy5tb2RlbFByaXBhZHUua3MgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwic3NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzczogdGhpcy5tb2RlbFByaXBhZHUuc3MgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYnVfdmxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBidV92bDogdGhhdC5tb2RlbFByZWRwaXN1LmJ1X3ZsLCBza192bDogdGhhdC5tb2RlbFByZWRwaXN1LnNrX3ZsIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImJ1X2NpXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYnVfY2k6IHRoYXQubW9kZWxQcmlwYWR1LmJ1X2NpLCBza19jaTogdGhhdC5tb2RlbFByaXBhZHUuc2tfY2kgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgICAgICAvL3ByaXZhdGUgcG9abWVuZVN1Ympla3R1KGN0eDogYW55KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2IFRLIHRvIGJ5bG8gTmFjdGlFc3VJbmZvXHJcbiAgICAgICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gICAgLy8gT8WhZXTFmWVuw60gY2l6w61obyBiYW5rb3Zuw60gw7rEjXR1XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnN0IGJ1Y2lGaWVsZCA9IHRoYXQuZmluZEZpZWxkcyhcImJ1X2NpXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9sw63EjWtvIGNpesOpaG8gYmFua292bsOtaG8gw7rEjXR1XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChidWNpRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIikgPT0gZmFsc2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBqZSBwb2zDrcSNa28gZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKGN0eCAhPT0gbnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuxJtqYWvDvSBzdWJqZWt0IGplIHZ5YnLDoW5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBidWNpRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IGl4c19lc3U6IGN0eCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoWhyYWRhIHphIGRlcGVuZGVuY3kgKGN0eC52YWx1ZS5peHNfZXN1KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJqZWt0IGplIHByw6F6ZG7DvVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHsgaXhzX2VzdTogbnVsbCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhaHJhZGEgemEgZGVwZW5kZW5jeVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJnZXRTZXJ2ZXJGaWx0ZXJzXCIpLnRoZW4oKHNmKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gYWt0dcOhbG7DrWNoIHNlcnZlcm92w71jaCBmaWx0csWvIChwcm9taXNlKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb3N1Y2koKS5nZXREYXRhKHNmKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gaG9kbm90IHBvbMOtxI1rYSBzIGFrdHXDoWxuw61taSBzZXJ2ZXJvdsO9bWkgZmlsdHJ5XHJcbiAgICAgICAgICAgIC8vICAgIH0pLnRoZW4oKGJ1Y2kpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvIHZyw6FjZW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKGJ1Y2kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSBqZWRuYSB2csOhY2Vuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBidWNpWzBdKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuw61tIGrDrSBkbyBwb2zDrcSNa2FcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2UgYnVjaUZpZWxkLmdmaWVsZChcImNsZWFyXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGlzdHVqZSB2w61jZSBuZWJvIMW+w6FkbsOhIGhvZG5vdGEsIHRhayDDusSNZXQgdnltYcW+dVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gbmFzdGF2ZW7DrSBwb2zDrcSNa2Egc3Rhdl9saHV0eSBwb2RsZSBtb2RlbHVcclxuICAgICAgICAgKiBAbWV0aG9kIGluaXRpYWxTdGF2dUxodXR5KClcclxuICAgICAgICAgKiBAcGFyYW0gaW5pdCBQb2t1ZCBqZSB0cnVlLCBuYXN0YXbDrSBzdGF2IGxoxa90eSBwb2RsZSBtb2RlbHUsIHBva3VkIGplIGZhbHNlLCBuYXN0YXbDrSBzdGF2IGxoxa90eSBwb2RsZSBob2Rub3R5IHYgcG9sw63EjWt1IFxyXG4gICAgICAgICAqIEByZXR1cm5zIERhdGEgcG9sw63EjWthIHN0YXZfbGh1dHkgeyBzdGF2X2xodXR5OiBudW1iZXI7IHBvcGlzOiBzdHJpbmcgfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbFN0YXZ1TGh1dHkoaW5pdDogYm9vbGVhbik6IHsgc3Rhdl9saHV0eTogbnVtYmVyOyBwb3Bpczogc3RyaW5nIH0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgaWtvbmEgPSB0aGF0Lmlrb25hTGh1dHk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gdGhhdC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcInN0YXZfbGh1dHlcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5tb2RlbFByZWRwaXN1LnN0YXZfbGh1dHk7XHJcbiAgICAgICAgICAgIGlmKCFpbml0KSB7IGRhdGEgPSBmaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKS5zdGF2X2xodXR5OyB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcImFkZFN0YXRlXCIsIHsgaWQ6IFwic3RhdkxodXR5U3RhdGVcIiwgYWxpZ246IFwib3Bwb3NpdGVcIiwgaWNvbjogaWtvbmEubGh1dGEwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXQgPSB7IHN0YXZfbGh1dHk6IDAsIHBvcGlzOiBcIkxoxa90YSBuZW7DrSBuYXN0YXZlbmEsIG5lYm8gbmVsemUgdXLEjWl0XCIgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJhZGRTdGF0ZVwiLCB7IGlkOiBcInN0YXZMaHV0eVN0YXRlXCIsIGFsaWduOiBcIm9wcG9zaXRlXCIsIGljb246IGlrb25hLmxodXRhMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0ID0geyBzdGF2X2xodXR5OiAxLCBwb3BpczogXCJQxZllZHBpcyBqZSB2eXBvxZnDoWRhbsO9LCBuZWLEm8W+w60gxb7DoWRuw6EgbGjFr3RhXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJhZGRTdGF0ZVwiLCB7IGlkOiBcInN0YXZMaHV0eVN0YXRlXCIsIGFsaWduOiBcIm9wcG9zaXRlXCIsIGljb246IGlrb25hLmxodXRhMiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0ID0geyBzdGF2X2xodXR5OiAyLCBwb3BpczogXCJMaMWvdGEgYsSbxb7DrSwganNvdSBwb8WZw616ZW55IHbFoWVjaG55IGtyb2t5IHZ5bcOhaMOhbsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJhZGRTdGF0ZVwiLCB7IGlkOiBcInN0YXZMaHV0eVN0YXRlXCIsIGFsaWduOiBcIm9wcG9zaXRlXCIsIGljb246IGlrb25hLmxodXRhMyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0ID0geyBzdGF2X2xodXR5OiAzLCBwb3BpczogXCJMaMWvdGEgYsSbxb7DrSwgY2h5YsOtIG7Em2t0ZXLDqSBrcm9reSB2eW3DoWjDoW7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwiYWRkU3RhdGVcIiwgeyBpZDogXCJzdGF2TGh1dHlTdGF0ZVwiLCBhbGlnbjogXCJvcHBvc2l0ZVwiLCBpY29uOiBpa29uYS5saHV0YTQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldCA9IHsgc3Rhdl9saHV0eTogNCwgcG9waXM6IFwiTGjFr3RhIHNlIGJsw63FvsOtIGtlIGtvbmNpLCBqc291IHBvxZnDrXplbnkgdsWhZWNobnkga3Jva3kgdnltw6Fow6Fuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcImFkZFN0YXRlXCIsIHsgaWQ6IFwic3RhdkxodXR5U3RhdGVcIiwgYWxpZ246IFwib3Bwb3NpdGVcIiwgaWNvbjogaWtvbmEubGh1dGE1IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXQgPSB7IHN0YXZfbGh1dHk6IDUsIHBvcGlzOiBcIkxoxa90YSBzZSBibMOtxb7DrSBrZSBrb25jaSwgY2h5YsOtIG7Em2t0ZXLDqSBrcm9reSB2eW3DoWjDoW7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwiYWRkU3RhdGVcIiwgeyBpZDogXCJzdGF2TGh1dHlTdGF0ZVwiLCBhbGlnbjogXCJvcHBvc2l0ZVwiLCBpY29uOiBpa29uYS5saHV0YTYgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldCA9IHsgc3Rhdl9saHV0eTogNiwgcG9waXM6IFwiSmUgcG8ga29uY2kgbGjFr3R5LCBqc291IHBvxZnDrXplbnkgdsWhZWNobnkga3Jva3kgdnltw6Fow6Fuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcImFkZFN0YXRlXCIsIHsgaWQ6IFwic3RhdkxodXR5U3RhdGVcIiwgYWxpZ246IFwib3Bwb3NpdGVcIiwgaWNvbjogaWtvbmEubGh1dGE3IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXQgPSB7IHN0YXZfbGh1dHk6IDcsIHBvcGlzOiBcIkplIHBvIGtvbmNpIGxoxa90eSwgY2h5YsOtIG7Em2t0ZXLDqSBrcm9reSB2eW3DoWjDoW7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcImFkZFN0YXRlXCIsIHsgaWQ6IFwic3RhdkxodXR5U3RhdGVcIiwgYWxpZ246IFwib3Bwb3NpdGVcIiwgaWNvbjogaWtvbmEubGh1dGEwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXQgPSB7IHN0YXZfbGh1dHk6IDAsIHBvcGlzOiBcIkxoxa90YSBuZW7DrSBuYXN0YXZlbmEsIG5lYm8gbmVsemUgdXLEjWl0XCIgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5pdCkgeyBmaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzZXQsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KSB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZXQ7XHJcblxyXG4gICAgICAgICAgICAvL3ByaXZhdGUgbmFzdGF2TGh1dHUoKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgZGF0YSA9IHRoYXQubW9kZWxQcmVkcGlzdS5zdGF2X2xodXR5O1xyXG4gICAgICAgICAgICAvLyAgICAvL1RPRE86IHZ6w610IGRhdGEgeiBwb2zDrcSNa2EuLi5cclxuICAgICAgICAgICAgLy8gICAgdmFyIGljb25UZW1wbGF0ZSA9IGljb19uZXVyY2U7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciB0b29sdGlwVGV4dCA9IFwiTmV1csSNZW5vXCI7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBkYXRfbGh1dHkgPSBcImJsYWNrXCI7IC8vVE9ETzogemppc3RpdCBqYWsgbmFzdGF2aXQgYmFydnUgZGF0X2xodXR5IHBvZGxlIHN0YXZ1IGxoxa90eS4uLiAobW/Fvm7DoSB0byB2xa9iZWMgbmVuw60gdGFkeSwgYWxlIHYgcHJvZmlsZWNoLi4uKVxyXG4gICAgICAgICAgICAvLyAgICBzd2l0Y2ggKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhc2UgMDoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGljb25UZW1wbGF0ZSA9IGljb19saHV0YTE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdG9vbHRpcFRleHQgPSBcIkxoxa90YSBuZW7DrSBuYXN0YXZlbmEsIG5lYm8gbmVsemUgdXLEjWl0XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0X2xodXR5ID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvblRlbXBsYXRlID0gaWNvX2xodXRhMjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwVGV4dCA9IFwiUMWZZWRwaXMgamUgdnlwb8WZw6FkYW7DvSwgbmVixJvFvsOtIMW+w6FkbsOhIGxoxa90YVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRhdF9saHV0eSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIGNhc2UgMjoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGljb25UZW1wbGF0ZSA9IGljb19saHV0YTM7O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gXCJMaMWvdGEgYsSbxb7DrSwganNvdSBwb8WZw616ZW55IHbFoWVjaG55IGtyb2t5IHZ5bcOhaMOhbsOtXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0X2xodXR5ID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXNlIDM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpY29uVGVtcGxhdGUgPSBpY29fbGh1dGE0O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gXCJMaMWvdGEgYsSbxb7DrSwgY2h5YsOtIG7Em2t0ZXLDqSBrcm9reSB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRhdF9saHV0eSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXNlIDQ6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpY29uVGVtcGxhdGUgPSBpY29fbGh1dGE1O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gXCJMaMWvdGEgc2UgYmzDrcW+w60ga2Uga29uY2ksIGpzb3UgcG/FmcOtemVueSB2xaFlY2hueSBrcm9reSB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRhdF9saHV0eSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FzZSA1OiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvblRlbXBsYXRlID0gaWNvX2xodXRhNjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwVGV4dCA9IFwiTGjFr3RhIHNlIGJsw63FvsOtIGtlIGtvbmNpLCBjaHliw60gbsSba3RlcsOpIGtyb2t5IHZ5bcOhaMOhbsOtXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0X2xodXR5ID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIGNhc2UgNjoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGljb25UZW1wbGF0ZSA9IGljb19saHV0YTc7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdG9vbHRpcFRleHQgPSBcIkplIHBvIGtvbmNpIGxoxa90eSwganNvdSBwb8WZw616ZW55IHbFoWVjaG55IGtyb2t5IHZ5bcOhaMOhbsOtXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0X2xodXR5ID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXNlIDc6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpY29uVGVtcGxhdGUgPSBpY29fbGh1dGE4O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gXCJKZSBwbyBrb25jaSBsaMWvdHksIGNoeWLDrSBuxJtrdGVyw6kga3Jva3kgdnltw6Fow6Fuw61cIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkYXRfbGh1dHkgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGljb25UZW1wbGF0ZSA9IGljb19uZXVyY2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdG9vbHRpcFRleHQgPSBcIk5ldXLEjWVub1wiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRhdF9saHV0eSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4geyBpY29uOiBpY29uVGVtcGxhdGUsIHRvb2x0aXA6IHRvb2x0aXBUZXh0IH07XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8gIE5hxI10ZW7DrSBkYXQgeiBtb2RlbHUgZG8gcmVrYXBpdHVsYWNlXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKiogTWV0b2RhIGt0ZXLDoSBzZSBwcm92ZWRlIHDFmWkgem3Em27DoWNoIHVyxI1pdMO9Y2ggcG9sw61jaCBhIG5hc3RhdmVuw60gcGVybW1pc3Npb25zIG5hIHrDoWtsYWTEmyB6bcSbbiAqL1xyXG4gICAgICAgIHByaXZhdGUgem1lbmFQb2xlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNfZHRvID0gdGhhdC5tb2RlbFByZWRwaXN1O1xyXG4gICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgY19kdG8pO1xyXG4gICAgICAgICAgICAvL3ZhciB6cCA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcInpwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9jX2R0by56cCA9IHpwLnpwO1xyXG4gICAgICAgICAgICBjX2R0by5peHAgPSB0aGF0Lkl4cDtcclxuICAgICAgICAgICAgY19kdG8ucmFkZWtfdWhyID0gdGhhdC5SYWRla191aHI7XHJcbiAgICAgICAgICAgIGNfZHRvLnBlbkthbGsgPSBmYWxzZTtcclxuICAgICAgICAgICAgY19kdG8uZWRpdGFjZSA9IHRoaXMuRWRpdDtcclxuICAgICAgICAgICAgLy9abWVuYVJhZGt1KEdQcmlwYWRQcmVkcGlzUGVybXNEdG8gcGVybXMsIEdQcmVkcGlzRHRvIHByZXApXHJcbiAgICAgICAgICAgIHRoYXQuY2FsbChcIlptZW5hUmFka3VcIiwgeyBwZXJtczogdGhhdC5wZXJtc0R0bywgcHJlcDogY19kdG8gfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhrZXkpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcIm9wZW5UYWJWeWJlclJvemhvZG51dGlBY3RcIik/LmVuYWJsZWQoZGF0YS5yb3pob2RudXRpKTsgLy8gZGV0YWlsIHphZGF0ZWxcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RTYXZlT25seVwiKT8uZW5hYmxlZChkYXRhLnNhdmUpOyAvLyBkZXRhaWwgemFkYXRlbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFNhdmVOZXh0XCIpPy5lbmFibGVkKGRhdGEuc2F2ZSk7IC8vIGRldGFpbCB6YWRhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmdldEFjdGlvbnMoKS5maW5kKGUgPT4gZS5uYW1lID09IFwiYWN0U2F2ZUNsb3NlXCIpPy5lbmFibGVkKGRhdGEuc2F2ZSk7IC8vIGRldGFpbCB6YWRhdGVsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICBwcml2YXRlIGplRGF0dW1WZVZ5bWFoYW5lbU9kb2JpKGdldERhdGU6IEpzb25EYXRlKTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlByZWRwaXN5LmplRGF0dW1WZVZ5bWFoYW5lbU9kb2JpKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXBfaXhwOiB0aGF0Lm1vZGVsUHJlZHBpc3UuaXhwID8/IHRoaXMuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGlwX2RhdDogZ2V0RGF0ZSwgLy90aGF0Lm1vZGVsUHJlZHBpc3UuZGF0X3NwbCEsIC8vSmUgcG92aW5uw70gw7pkYWogcHJvIHphbG/FvmVuw60gcMWZZWRwaXN1ICEhIVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nZXQoKS5kb25lKChkYXRhKSA9PiB7IGRlZi5yZXNvbHZlKGRhdGEpOyBjb25zb2xlLmxvZyhkZWYpOyBjb25zb2xlLmxvZyhkYXRhKSB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvL3ByaXZhdGUgamVQcmVkcGlzWm1lbmVtKGdldERhdGU6IERhdGUpOiBKUXVlcnlQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAvLyAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgdGhhdC5pc2wuUHJlZHBpc3kuamVQcmVkcGlzWm1lbmVuKCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlwX2l4cDogdGhhdC5tb2RlbFByZWRwaXN1Lml4cCA/PyB0aGlzLkl4cCxcclxuICAgICAgICAvLyAgICAgICAgICAgIGlwX3JhZGVrOiB0aGF0Lm1vZGVsUHJlZHBpc3UucmFkZWtfdWhyID8/IHRoaXMuUmFkZWtfdWhyLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgaXBfZGF0X29sZDogZ2V0RGF0ZSxcclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgIH0pLmdldCgpLmRvbmUoKGRhdGEpID0+IHsgZGVmLnJlc29sdmUoZGF0YSk7IGNvbnNvbGUubG9nKGRlZik7IGNvbnNvbGUubG9nKGRhdGEpIH0pO1xyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIG1ldG9keSBwcm8gdsO9cG/EjXR5XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2w71wb8SNZXQgxI3DoXN0ZWsgXHJcbiAgICAgICAgICogQHBhcmFtIHNwb2NpdGF0X2RhdCAtIFByb23Em25uw6Egcm96aG9kdWrDrWPDrSwgemRhLWxpIHNlIG3DoSBwb8SNw610YXQgZGHFiFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJlcG9jZXRDYXN0ZWsoc3BvY2l0YXRfZGF0OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBwcmVkcGlzRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gPSB7fTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHByZWRwaXNEdG8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWxQaGwucHJpel9kcGhfemFrbCAhPSAxIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUGhsLnByaXpfZHBoX3NuaXogIT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFBobC5wcml6X2RwaF9zbml6MiAhPSAxIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUGhsLnByaXpfb3N2b2IgIT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFBobC5wcml6X2RwaDIgIT0gMCkgeyAvLyBQb2t1ZCBuZW7DrSBkYcWIb3bDvSBwxZnDrWplbSBuaWMgc2UgbmVtdXPDrSBkb3BvxI3DrXTDoXZhdFxyXG4gICAgICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3owXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKHByZWRwaXNEdG8uYyA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3oxXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKDApKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfejJcIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7XHJcbiAgICAgICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImNfejRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMCApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QxXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKDApKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDJcIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7XHJcbiAgICAgICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImNfZDRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMCApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicHJpel9venBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBydm5pTmFzdGF2ZW5pID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlByZXBvY2lzdENaSygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoc3BvY2l0YXRfZGF0ID4gMCkgeyAvLyBQb2t1ZCBzZSBtw6EgcG/EjcOtdGF0IGRhxYhcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBuX3NuaXplbmE6IERlY2ltYWwsIG5femFrbGFkbmk6IERlY2ltYWwsIG5fdHJldGk6IERlY2ltYWwsIG5fY3R2cnRhOiBEZWNpbWFsOyAvLyBzYXpieSBkYW7DrSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIG5fY2FzdGthLCBuX2RhbjsgLy8gcG9tb2Nuw6kgcHJvbcSbbm7DqSBcclxuICAgICAgICAgICAgICAgIHZhciBjX2RwaF9ycDogRGVjaW1hbCwgY19iZXpfZHBoX3JwOiBEZWNpbWFsOyAvLyBuw6F2cmF0b3bDqSBwcm9txJtubsOpXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5femFrbGFkbmk6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCh0aGlzLmdldFByb2NlbnRvRGFuZSgxMCkgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbl9zbml6ZW5hOiBEZWNpbWFsID0gbmV3IERlY2ltYWwodGhpcy5nZXRQcm9jZW50b0RhbmUoMjApID8/IDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5fdHJldGk6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCh0aGlzLmdldFByb2NlbnRvRGFuZSgzMCkgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBuX2N0dnJ0YTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKHRoaXMuZ2V0UHJvY2VudG9EYW5lKDQwKSA/PyAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWw71wb8SNZXQgc27DrcW+ZW7DqWhwIERQSFxyXG4gICAgICAgICAgICAgICAgbGV0IGNfejE6IERlY2ltYWwgPSBuZXcgRGVjaW1hbChwcmVkcGlzRHRvLmNfejEgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNfejEuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBbY19iZXpfZHBoX3JwLCBjX2RwaF9ycF0gPSB0aGlzLlZ5cG9jZXRfZHBoKGNfejEsIGZhbHNlLCBuX3NuaXplbmEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5fZGFuID0gY19iZXpfZHBoX3JwOyAvL0NhbGwgZ2Zfdnlwb2NldF9kcGgoIGNvbF9jX3oxLCAwLCBuX3NuaXplbmEsIG5fY2FzdGthLCBuX2RhbiApXHJcbiAgICAgICAgICAgICAgICAgICAgbl9jYXN0a2EgPSBjX2RwaF9ycDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRwaXNEdG8uY19kMT8udG9TdHJpbmcoKSA9PSBcIjBcIikgey8vVEVTVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzRHRvLmNfZDEgPSBuX2RhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuX2Rhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJlZHBpc0R0by5jX2QxID0gKHByZWRwaXNEdG8uY19kMSA9PSBuZXcgRGVjaW1hbCgwKSkgPyBuX2RhbiA6IHByZWRwaXNEdG8uY19kMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVsO9cG/EjWV0IG5vcm1hbG7DrWhvIERQSFxyXG4gICAgICAgICAgICAgICAgbGV0IGNfejI6IERlY2ltYWwgPSBuZXcgRGVjaW1hbChwcmVkcGlzRHRvLmNfejIgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNfejIuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBbY19iZXpfZHBoX3JwLCBjX2RwaF9ycF0gPSB0aGlzLlZ5cG9jZXRfZHBoKGNfejIsIGZhbHNlLCBuX3pha2xhZG5pLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBuX2RhbiA9IGNfYmV6X2RwaF9ycDsgIC8vQ2FsbCBnZl92eXBvY2V0X2RwaCggY29sX2NfejIsIDAsIG5femFrbGFkbmksIG5fY2FzdGthLCBuX2RhbiApXHJcbiAgICAgICAgICAgICAgICAgICAgbl9jYXN0a2EgPSBjX2RwaF9ycDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRwaXNEdG8uY19kMj8udG9TdHJpbmcoKSA9PSBcIjBcIikgey8vVEVTVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzRHRvLmNfZDIgPSBuX2RhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuX2Rhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJlZHBpc0R0by5jX2QyID0gKHByZWRwaXNEdG8uY19kMiA9PSBuZXcgRGVjaW1hbCgwKSkgPyBuX2RhbiA6IHByZWRwaXNEdG8uY19kMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVsO9cG/EjWV0IHTFmWV0w61obyBEUEhcclxuICAgICAgICAgICAgICAgIGxldCBjX3ozOiBEZWNpbWFsID0gbmV3IERlY2ltYWwocHJlZHBpc0R0by5jX3ozID8/IDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjX3ozLmVxKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgW2NfYmV6X2RwaF9ycCwgY19kcGhfcnBdID0gdGhpcy5WeXBvY2V0X2RwaChjX3ozLCBmYWxzZSwgbl90cmV0aSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbl9kYW4gPSBjX2Jlel9kcGhfcnA7IC8vQ2FsbCBnZl92eXBvY2V0X2RwaCggY29sX2NfejMsIDAsIG5fdHJldGksIG5fY2FzdGthLCBuX2RhbiApXHJcbiAgICAgICAgICAgICAgICAgICAgbl9jYXN0a2EgPSBjX2RwaF9ycDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRwaXNEdG8uY19kMz8udG9TdHJpbmcoKSA9PSBcIjBcIikgeyAgIC8vVEVTVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzRHRvLmNfZDMgPSBuX2RhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuX2Rhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJlZHBpc0R0by5jX2QzID0gKHByZWRwaXNEdG8uY19kMyA9PSBuZXcgRGVjaW1hbCgwKSkgPyBuX2RhbiA6IHByZWRwaXNEdG8uY19kMztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVsO9cG/EjWV0IMSNdHZydMOpaG8gRFBIXHJcbiAgICAgICAgICAgICAgICAvL2xldCBjX3o0OiBEZWNpbWFsID0gbmV3IERlY2ltYWwocHJlZHBpc0R0by5jX3o0ID8/IDApO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoIWNfejQuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIFtjX2Jlel9kcGhfcnAsIGNfZHBoX3JwXSA9IHRoaXMuVnlwb2NldF9kcGgobmV3IERlY2ltYWwoY196NCwgZmFsc2UsIG5fY3R2cnRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5fZGFuID0gY19iZXpfZHBoX3JwOyAvL0NhbGwgZ2Zfdnlwb2NldF9kcGgoIGNvbF9jX3o0LCAwLCBuX2N0dnJ0YSwgbl9jYXN0a2EsIG5fZGFuIClcclxuICAgICAgICAgICAgICAgIC8vICAgIG5fY2FzdGthID0gY19kcGhfcnA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKHByZWRwaXNEdG8uY19kND8udG9TdHJpbmcoKSA9PSBcIjBcIikgey8vVEVTVFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHByZWRwaXNEdG8uY19kNCA9IG5fZGFuO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbl9kYW4pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vcHJlZHBpc0R0by5jX2Q0ID0gKHByZWRwaXNEdG8uY19kNCA9PSBuZXcgRGVjaW1hbCgwKSkgPyBuX2RhbiA6IHByZWRwaXNEdG8uY19kNDtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNvdcSNZXQgdsWhZWNoIMSNw6FzdGVrXHJcbiAgICAgICAgICAgIHRoaXMuU291Y2V0UG9sb3preSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBva3VkIGpzZW0gdiBkYcWIb3bDqW0gdHlwdSBwb2hsZWTDoXZreSwgcMWZw61wYWQgbcOhIERJxIwgYSDEjcOhc3RrYSBqZSB2xJt0xaHDrSBqYWsgMTAwMDAsIG5hc3RhdsOtIHNlIHDFmcOtem5hayBPWlAgbmEgRkFMU0VcclxuICAgICAgICAgICAgdGhpcy5OYXN0YXZQcml6T3pwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIHZyw6FjZW7DrSBwcm9jZW50YSBkYW7Em1xyXG4gICAgICAgICAqIEBwYXJhbSBkYW5UeXAgLSBUeXAgZGFuxJtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldFByb2NlbnRvRGFuZShkYW5UeXA6IG51bWJlcik6IERlY2ltYWwge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyOyAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE3Em2xvIGJ5IGZ1bmdvdmF0IHYgcG/FmcOhZGt1XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHZ5c2xlZGVrO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJva0RwaCA9IGZvcm0uZmluZEZpZWxkcyhcImRhdF96ZGFuXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciBtZXNpY0RwaCA9IGZvcm0uZmluZEZpZWxkcyhcImRhdF96ZGFuXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgIHZhciBob2Rub3RhID0gRGVjaW1hbC5hZGQoRGVjaW1hbC5tdWwocm9rRHBoLCAxMDApLmRbMF0sIG1lc2ljRHBoKS5kWzBdO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5zYXpieURQSCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zYXpieURQSC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHguZGFuX3R5cCA9PT0gZGFuVHlwICYmIHgucm9rbWVzX29kISA8PSBob2Rub3RhLnRvU3RyaW5nKCkgJiYgeC5yb2ttZXNfZG8hID49IGhvZG5vdGEudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eXNsZWRlayA9IHguZGFuX3Byb2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2eXNsZWRlaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgLSBPc3QuIHpkYW4uIHBsbsSbbsOtIGRvIDEwIDAwMCBLxI1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIE5hc3RhdlByaXpPenAoKSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpO1xyXG4gICAgICAgICAgICAvLyBWIG5lZGHFiG92w6ltIHbFvmR5Y2t5IG5lXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsUGhsLnByaXpfZHBoX3pha2wgIT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFBobC5wcml6X2RwaF9zbml6ICE9IDEgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxQaGwucHJpel9kcGhfc25pejIgIT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFBobC5wcml6X29zdm9iICE9IDEgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxQaGwucHJpel9kcGgyICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInByaXpfb3pwXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFYgZGHFiG92w6ltIHNlIG5hc3RhdsOtIHBvZGxlIMSNw6FzdGt5IGEgREnEjFxyXG4gICAgICAgICAgICB2YXIgZXN1X2RpYzogbnVtYmVyID0gdGhpcy5tb2RlbFByaXBhZHUuRXh0ZXJuaVN1Ympla3Q/LmRpYz8udG9TdHJpbmcoKS50cmltKCkubGVuZ3RoIHx8IDBcclxuICAgICAgICAgICAgdmFyIGNvbF9jOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoKGVzdV9kaWMgPiAxKSAmJiAoKGNvbF9jLmFicygpKS5ndCgxMDAwMCkpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJwcml6X296cFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInByaXpfb3pwXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBzZcSNdGVuw60gdsWhZWNoIHBvbG/FvmVrXHJcbiAgICAgICAgICogQHBhcmFtIGlwX3BvY2l0YXRfbWVudSAtIFBvbcSbbm7DoSByb3pob2R1asOtY8OtLCB6ZGEtbGkgc2UgbcOhIHBvxI3DrXRhdCBtxJtuYVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgU291Y2V0UG9sb3preShpcF9wb2NpdGF0X21lbnU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIHByZWRwaXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0byA9IHt9O1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgcHJlZHBpcyk7XHJcbiAgICAgICAgICAgIHZhciBjOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfejA6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3owXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY196MTogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfejFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBjX3oyOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196MlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfejM6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3ozXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL3ZhciBjX3o0ID0gZm9ybS5maW5kRmllbGRzKFwiY196NFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfZDA6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QwXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY19kMTogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBjX2QyOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfZDM6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QzXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL3ZhciBjX2Q0OiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19kNFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfemFvOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196YW9cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBsX2NlbGs6IERlY2ltYWw7XHJcbiAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBQb2t1ZCBzZSBtw6EgemFva3JvdWhsb3ZhdCAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoYXQuRGJQYXJhbXMuZGRwX3phb19wb3JwcmUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbF9jZWxrID0gY196MC5wbHVzKGNfZDApLnBsdXMoY196MSkucGx1cyhjX2QxKS5wbHVzKGNfejIpLnBsdXMoY19kMikucGx1cyhjX3ozKS5wbHVzKGNfZDMpLyoucGx1cyhjX3o0KS5wbHVzKGNfZDQpKi87XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJjaXNlID0gbF9jZWxrLnJvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICBjX3phbyA9IHByY2lzZS5taW51cyhsX2NlbGspO1xyXG4gICAgICAgICAgICAgICAgYyA9IGxfY2Vsay5wbHVzKGNfemFvKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfemFvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfemFvKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgYyk7XHJcbiAgICAgICAgICAgICAgICAvL3ByZWRwaXMuY196YW8gPSBwYXJzZUZsb2F0KGxfY2Vsay50b0ZpeGVkKDApKSAtIGxfY2VsaztcclxuICAgICAgICAgICAgICAgIC8vcHJlZHBpcy5jID0gbF9jZWxrICsgcHJlZHBpcy5jX3phbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIC8vIFbDvXBvxI1ldCBiZXogemFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYzogRGVjaW1hbCA9IGNfejAucGx1cyhjX2QwKS5wbHVzKGNfejEpLnBsdXMoY19kMSkucGx1cyhjX3oyKS5wbHVzKGNfZDIpLnBsdXMoY196MykucGx1cyhjX2QzKS8qLnBsdXMoY196NCkucGx1cyhjX2Q0KSovLnBsdXMoY196YW8pO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LnBydm5pTmFzdGF2ZW5pID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChpcF9wb2NpdGF0X21lbnUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJlcG9jdGlDYXN0a3VWTWVuZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QcmVwb2Npc3RDWksoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBwxZllcG/EjWV0IMSNw6FzdGVrIHZlIHp2b2xlbsOpIG3Em27Em1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJlcG9jdGlDYXN0a3VWTWVuZShvX2t1cno/OiBhbnkpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBjb2xfa3VyejogRGVjaW1hbCA9IG9fa3VyeiA/PyBmb3JtLmZpbmRGaWVsZHMoXCJrdXJ6XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29sX2M6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnBydm5pTmFzdGF2ZW5pID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGNvbF9rdXJ6KSB7XHJcbiAgICAgICAgICAgICAgICAvL1NldCBjb2xfY19tZW5hID0gY29sX2MuQ2lzbG8oKSAvIGNvbF9rdXJ6LkNpc2xvKClcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjb2xfYy5kaXYoY29sX2t1cnopKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vU2V0IGNvbF9jX21lbmEgPSBjb2xfYy5DaXNsbygpXHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX21lbmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY29sX2MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2w71wb8SNZXQgRFBIXHJcbiAgICAgICAgICogQHBhcmFtIGNfcCAtIFphZGFuw6EgxI3DoXN0a2FcclxuICAgICAgICAgKiBAcGFyYW0gYl92Y2V0bmVfZHBoIC0gVsO9cG/EjWV0IGRhbsSbIC0gcMWZaSB6YWTDoW7DrSDEjcOhc3RreSBzIGRwaCBqZSBUUlVFKVxyXG4gICAgICAgICAqIEBwYXJhbSBkcGhfcHJvY19wIC0gSG9kbm90YSBkYW7EmyBcclxuICAgICAgICAgKiBAcGFyYW0gYl9uZXcgLSBVcsSNdGVuw60genDFr3NvYnUgdsO9cG/EjXR1ICh0cnVlID0gbm92w70pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBWeXBvY2V0X2RwaChjX3A6IERlY2ltYWwsIGJfdmNldG5lX2RwaDogYm9vbGVhbiwgZHBoX3Byb2NfcDogRGVjaW1hbCwgYl9uZXc6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy9UT0RPIGJfbmV3IC0+IHZ5dHZvxZlpdCBtZXRvZHUgcHJvIHpqacWhdMSbbsOtIHpwxa9zb2J5IHbDvXBvxI10dSBkbGUgR3VwdGEgZmNlIFwiZ2ZfWnB1c29iVnlwb2N0dURQSFwiXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNfZHBoX3JwOiBEZWNpbWFsO1xyXG4gICAgICAgICAgICB2YXIgY19iZXpfZHBoX3JwOiBEZWNpbWFsO1xyXG4gICAgICAgICAgICB2YXIga29lZjogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICB2YXIgem46IG51bWJlciA9IDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoY19wLmx0KDApKSB7IC8vIE90b8SNZW7DrSB6bmFtw6lua2EgcHJvIHrDoXBvcm7DqSBob2Rub3R5LCB6ZSB6YXBvcm7DqSBob2Rub3R5IHRvIGTDoXbDoSBvZGxpxaFuw70gdsO9c2xlZGVrICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgem4gPSAoLTEpO1xyXG4gICAgICAgICAgICAgICAgY19wID0gY19wLm11bCh6bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiX3ZjZXRuZV9kcGgpIHsgICAvLyBWw71wb8SNZXQgZGFuxJsgcMWZaSB6YWTDoW5pIMSNw6FzdGt5IHMgRFBIIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFiX25ldykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtvZWYgPSBkcGhfcHJvY19wLmRpdmlkZWRCeShkcGhfcHJvY19wLnBsdXMoMTAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAga29lZiA9IGtvZWYudG9EZWNpbWFsUGxhY2VzKDQpIC8vIFphb2tyb3VobGVuw60gbmEgNCBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChrb2VmKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfZHBoX3JwLnRvRGVjaW1hbFBsYWNlcygyKTsgLy8gWmFva3JvdWhsZW7DrSBuYSAyIGRlcy4gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfcC5tdWwoZHBoX3Byb2NfcC5kaXZpZGVkQnkoZHBoX3Byb2NfcC5wbHVzKDEwMCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfZHBoX3JwLnRvRGVjaW1hbFBsYWNlcygyKTsgLy8gWmFva3JvdWhsZW7DrSBuYSAyIGRlcy4gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDEjMOhc3RrYSBiZXogRFBIXHJcbiAgICAgICAgICAgICAgICBjX2Jlel9kcGhfcnAgPSBjX3AubWludXMoY19kcGhfcnApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVsO9cG/EjWV0IGRhbsSbIHDFmWkgemFkw6Fuw60gxI3DoXN0a3kgYmV6IERQSFxyXG4gICAgICAgICAgICAgICAgaWYgKGJfbmV3ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga29lZiA9IGRwaF9wcm9jX3AuZGl2aWRlZEJ5KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX3AubXVsKGtvZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19kcGhfcnAudG9EZWNpbWFsUGxhY2VzKDIpOyAvLyBaYW9rcm91aGxlbsOtIG5hIDIgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChkcGhfcHJvY19wLmRpdmlkZWRCeSgxMDApKVxyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19kcGhfcnAudG9EZWNpbWFsUGxhY2VzKDIpOyAvLyBaYW9rcm91aGxlbsOtIG5hIDIgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIMSMw6FzdGthIGJleiBEUEhcclxuICAgICAgICAgICAgICAgIGNfYmV6X2RwaF9ycCA9IGNfcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC5tdWwoem4pO1xyXG4gICAgICAgICAgICBjX2Jlel9kcGhfcnAgPSBjX2Jlel9kcGhfcnAubXVsKHpuKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbY19kcGhfcnAsIGNfYmV6X2RwaF9ycF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBwcm8gdnLDoWNlbsOtIGRhbsOpaG8ga3VyenUgbcSbbnksIGRsZSBvX21lbmFcclxuICAgICAgICAgKiBAcGFyYW0gb19tZW5hIC0gRHJ1aCBtxJtueVxyXG4gICAgICAgICAqIEBwYXJhbSBvX2t1cnogLSBUeXAga3VyenUgfCBOIC0gbsOha3VwIHwgUyAtIHN0xZllZCB8IFAgLSBwcm9kZWogfFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0S3Vyek1lbnkob19tZW5hOiBOdW1iZXIsIG9fa3Vyejogc3RyaW5nKTogRGVjaW1hbCB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcmV0OiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5rdXJ6eU1lbnlEdG8gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmt1cnp5TWVueUR0by5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHgubWVuYSA9PSBvX21lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvX2t1cnopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJOXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBuZXcgRGVjaW1hbCh4Lmt1cnpfbiA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBuZXcgRGVjaW1hbCh4Lmt1cnpfcCA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBuZXcgRGVjaW1hbCh4Lmt1cnpfcyA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gcMWZZXBvxI1ldCDEjMOhc3RreSB2IEvEjFxyXG4gICAgICAgICAqIEBwYXJhbSBvX2t1cnogLSBWb2xpdGVsbsO9IHBhcmFtZXRyIHBybyBwxZllbm9zIGt1cnp1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJlcG9jaXN0Q1pLKG9fa3Vyej86IGFueSkge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyOyAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbF9jX21lbmE6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX21lbmFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHZhciBsX21lbmE6IE51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb2xfTWVuYSA9IGZvcm0uZmluZEZpZWxkcyhcIm1lbmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuICAgICAgICAgICAgaWYgKGNvbF9NZW5hKSB7XHJcbiAgICAgICAgICAgICAgICBsX21lbmEgPSBjb2xfTWVuYS5tZW5hXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsX2t1cno6IERlY2ltYWwgPSBvX2t1cnogPz8gdGhpcy5nZXRLdXJ6TWVueShsX21lbmEsIFwiU1wiKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChsX21lbmEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjb2xfY19tZW5hKTsgLy9DYWxsIGNvbF9jLk5hc3RhdkNpc2xvKGNvbF9jX21lbmEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGxfa3Vyei5tdWwoY29sX2NfbWVuYSkpIC8vQ2FsbCBjb2xfYy5OYXN0YXZDaXNsbyhsX2t1cnogKiBjb2xfY19tZW5hKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImt1cnpcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbF9rdXJ6KTtcclxuICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHDFmWVwb8SNZXQgxI3DoXN0a3kgdiBtxJtuxJtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFByZXBvY3RpRGxlS3VyenUoKSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpO1xyXG4gICAgICAgICAgICB2YXIgbF9tZW5hID0gZm9ybS5maW5kRmllbGRzKFwibWVuYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5tZW5hXHJcbiAgICAgICAgICAgIC8vdmFyIGxfbWVuYTIgPSBmb3JtLmZpbmRGaWVsZHMoXCJtZW5hXCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcbiAgICAgICAgICAgIHZhciBsX2t1cno6IERlY2ltYWw7XHJcblxyXG4gICAgICAgICAgICBpZiAobF9tZW5hID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxfa3VyeiA9IG5ldyBEZWNpbWFsKDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsX2t1cnogPSB0aGlzLmdldEt1cnpNZW55KGxfbWVuYSwgXCJTXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJrdXJ6XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGxfa3Vyeik7IFxyXG4gICAgICAgICAgICAgICAgdGhhdC5QcmVwb2N0aUNhc3RrdVZNZW5lKGxfa3Vyeik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LlByZXBvY2lzdENaSyhsX2t1cnopXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJlcG9jdGlDYXN0a3VWS29ydW5hY2goKSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCB6ZXJvOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBrdXJ6OiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwia3VyelwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICB2YXIgYzogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIilcclxuXHJcbiAgICAgICAgICAgIGlmIChrdXJ6ID09IHplcm8gfHwga3VyeiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJrdXJ6XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LnBydm5pTmFzdGF2ZW5pID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGt1cnogIT0gemVybykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIChjLmRpdihrdXJ6KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjKTtcclxuICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWtjZSBwbyBrbGlrbnV0w60gbmEgdGxhxI3DrXRrbyBPS1xyXG4gICAgICAgICAqIEBtZXRob2Qgb2soKVxyXG4gICAgICAgICAqIEBwYXJhbSB6YXZyaXQgLSBUeXAgYWtjZSBwbyB1bG/FvmVuw60gcMWZZWRwaXN1ICAgICAgXHJcbiAgICAgICAgICogICAwIC0gVWxvxb5pdFxyXG4gICAgICAgICAqICAgMSAtIFVsb8W+aXQgYSB6YXbFmcOtdCAtIG1vbWVudMOhbG7EmyB6cnXFoWVubyAoVE9ETzogdnlteXNsZXQgamFrIGplZGVuIHDFmWVkcGlzIHphdsWZw610IGEgZGFsxaHDrSBvdGV2xZnDrXQpXHJcbiAgICAgICAgICogICAyIC0gVWxvxb5pdCBhIHBvZGF0IGRhbMWhw61cclxuICAgICAgICAgKiBAcmV0dXJucyBDaHlidSB2IHDFmcOtcGFkxJsgbmXDunNwxJtjaHUgbmVibyB6YXbFmWVuw60gZGlhbG9ndVxyXG4gICAgICAgICAqIEByZXR1cm5zIFVsb8W+ZW7DrSBwxZllZHBpc3UgdiBwxZnDrXBhZMSbIMO6c3DEm2NodVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9rKHphdnJpdDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogdnl0dm/FmWl0IHRha8OpIHYgdMOpdG8gdHMgxI3DoXN0aSBrb250cm9seSBzcHLDoXZub3N0aSB2eXBsbsSbbsOtIHBvbMOtxI1layBcclxuICAgICAgICAgICAgLy9UT0RPOiB0em4uIHBvbMOtxI1rw6Egb2JzYWh1asOtIHNwcsOhdm7DqSAoPXZhbGlkbsOtKSBob2Rub3R5IGEgcG92aW5uw6EgcG9sw63EjWthIGpzb3UgdnlwbG7Em25hXHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1aQcSMw4FURUsgVUtMw4FEw4FOw41cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIsIHRleHQ6IFwiUHJvYsOtaMOhIHVrbMOhZMOhbsOtIHDFmWVkcGlzdS4uLlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiB6a29udHJvbG92YXQsIHpkYSBieWx5IHByb3ZlZGVueSBuxJtqYWvDqSB6bcSbbnkgLSBuZWZ1bmd1amUgcHJvdG/FvmUgbsSba2RlIMWhxJtwYXRuxJsgbmHEjcOtdMOhbSBuZWJvIGRvZMOhdsOhbSBkYXRhLi4uLlxyXG4gICAgICAgICAgICAvL3ZhciBoYXNDaGFuZ2VkOiBib29sZWFuID0gdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIC8vaWYgKCFoYXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lZG/FoWxvIGsgxb7DoWRuw6kgem3Em27EmyAtIG5lbsOtIGNvIHVsb8W+aXRcIik7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZhbGlkVGVzdCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodmFsaWRUZXN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ1bG96ZW5pUHJlZHBpc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk7Em2t0ZXLDoSBwb2xlIG5lanNvdSBzcHLDoXZuxJsgdnlwbG7Em25hXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY19kdG8gPSB0aGF0Lm1vZGVsUHJlZHBpc3U7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBjX2R0byk7XHJcbiAgICAgICAgICAgIGNfZHRvLnBlbkthbGsgPSBmYWxzZTsgLy9uZWplZG7DoSBzZSBvIHVsb8W+ZW7DrSBwxZllZHBpc3UgeiBwZW5LYWxrIC0gamUgcG90xZllYmEgbmFzdGF2aXQgaG9kbm90dSBuYSBGQUxTRVxyXG4gICAgICAgICAgICBjX2R0by5lZGl0YWNlID0gdGhpcy5FZGl0OyAvL2plZG7DoSBzZSBvIG5vdsO9IHrDoXpuYW0sIHBvbW9jbsOhIHBvbG/FvmthIERUTyBwcm8gZGFsxaHDrSBrb250cm9seSBuYSBzdHJhbsSbIHNlcnZlcnVcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKGNfZHRvLmRhdF9zcGwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZW7DrSB2eXBsbsSbbm8gZGF0dW0gc3BsYXRub3N0aSBwxZllZHBpc3VcIilcclxuICAgICAgICAgICAgLy8gICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcygnZGF0X3NwbCcpLmdmaWVsZCgnZm9jdXMnKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBpZiAobmV3IERlY2ltYWwoY19kdG8uYyEpLmlzWmVybygpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVsemUgemFkYXQgbnVsb3ZvdSDEjcOhc3RrdSBwxZllZHBpc3VcIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKCdjJykuZ2ZpZWxkKCdmb2N1cycpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ldyBEZWNpbWFsKGNfZHRvLmNfbWVuYSEpLmlzWmVybygpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVsemUgemFkYXQgbnVsb3ZvdSDEjcOhc3RrdSB2IENaS1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoJ2NfbWVuYScpLmdmaWVsZCgnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhhdC5rb250cm9sYU1lbnkoY19kdG8ubWVuYSEpXHJcbiAgICAgICAgICAgIENvbW1vbi5QcmVkcGlzeS5Lb250cm9seS5Lb250cm9sYU1lbnkodGhhdCwgY19kdG8ubWVuYSEsIHRoYXQubW9kZWxQcmlwYWR1Lm1lbmEhKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHBvdm9sZW5pSmluZU1lbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjX2R0by5wb21famluYU1lbmEgPSBwb3ZvbGVuaUppbmVNZW55OyAvLyBwb21vY27DoSBwcm9txJtubsOhIHBybyBzZXJ2ZXIsIHpkYS1saSBqZSBwb3ZvbGVuYSBqaW7DoSBtxJtuYSBuZcW+IGplIG3Em25hIHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkVkaXQpIHsgLy8gUG9rdWQgc2UgamVkbsOhIG8gbm92w70gcMWZZWRwaXMuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY19kdG8ucmFkZWtfdWhyID0gbnVsbDsgLy8gc3Byw6F2bsO9IHR2YXIgbnVsbCBwb3TFmWVibsO9IGRvIHByb2NlZHVyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmVkcGlzeS5qZURhdHVtVmVWeW1haGFuZW1PZG9iaSgoKSA9PiB7IHJldHVybiB7IGlwX2l4cDogY19kdG8uaXhwID8/IHRoaXMuSXhwLCBpcF9kYXQ6IGNfZHRvLmRhdF9zcGwhLCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgXCJQb3pvciwgcMWZZWRwaXMgamUgemFkw6FuIHYgb2Jkb2LDrSwga3RlcsOpIGplIGppxb4gdnltw6Fow6FubyEgXFxuIFVsb8W+ZW7DrSB0b2hvdG8gcMWZZWRwaXN1IG1vaGxvIHbDqXN0IGsgcm96cG9ydSBtZXppIGRsdcW+bm91IGEgdnltw6FoYW5vdSDEjcOhc3Rrb3UhIFxcbiBDaGNldGUgcG9rcmHEjW92YXQ/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ1bG96ZW5pUHJlZHBpc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96ZW5pUHJlZHBpc3UoY19kdG8sIHphdnJpdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBcIlByZWRwaXNVbG96ZW5pTmVwcm92ZWRlbm9cIiwgdGl0bGU6IFwiVXBvem9ybsSbbsOtXCIsIGNvbnRlbnQ6IFwiUMWZZWRwaXMgbmVieWwgdWxvxb5lblwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3plbmlQcmVkcGlzdShjX2R0bywgemF2cml0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3plbmlQcmVkcGlzdShjX2R0bywgemF2cml0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwgeyBpZDogXCJQcmVkcGlzVWxvemVuaU5lcHJvdmVkZW5vXCIsIHRpdGxlOiBcIlVwb3pvcm7Em27DrVwiLCBjb250ZW50OiBcIlDFmWVkcGlzIG5lYnlsIHVsb8W+ZW5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9rb250cm9sYU1lbnkocG9tX21lbmE6IG51bWJlcik6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIC8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHZhciBwb3ZvbGVuaUppbmVNZW55OiBib29sZWFuO1xyXG4gICAgICAgIC8vICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gICAgLy8gViBwxZnDrXBhZMSbIMW+ZSBtxJtuYSBuZXNlZMOtIGTDoW0gZG90YXogemRhIHMgdMOtbSB1xb5pdmF0ZWwgc291aGxhc8OtXHJcbiAgICAgICAgLy8gICAgaWYgKCFuZXcgRGVjaW1hbChwb21fbWVuYSEpLmlzWmVybygpICYmIHBvbV9tZW5hICE9IHRoYXQubW9kZWxQcmlwYWR1Lm1lbmEpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgXCJQxZllZHBpcyBqZSB2IGppbsOpIG3Em27EmyBuZcW+IGplIHZlZGVuYSBjZWzDoSBwb2hsZWTDoXZrYSEgXFxuIFBva3VkIHDFmcOtcGFkIG3DoSBwxZllZHBpc3kgdiBqaW7DqSBtxJtuxJsgbmXFviBqZSB1dmVkZW5vIHYgaGxhdmnEjWNlIHDFmcOtcGFkdSBhIG5lbsOtIHRvIENaSywgbmVidWRlIG1vxb5uw6kgcHJvdsOhZMSbdCBwxZllY2VuxJtuw60gcG9obGVkw6F2ZWshIFxcbiBDaGNldGUgcG9rcmHEjW92YXQ/XCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcG92b2xlbmlKaW5lTWVueSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHBvdm9sZW5pSmluZU1lbnkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcG92b2xlbmlKaW5lTWVueSA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QocG92b2xlbmlKaW5lTWVueSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgcG92b2xlbmlKaW5lTWVueSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShwb3ZvbGVuaUppbmVNZW55KS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBwxZllZHBpc3VcclxuICAgICAgICAgKiBAbWV0aG9kIHVsb3plbmlQcmVkcGlzdSgpXHJcbiAgICAgICAgICogQHBhcmFtIGNfZHRvIERUTyBvYmpla3QgcMWZZWRwaXN1LCBrdGVyw70gc2UgbcOhIHVsb8W+aXRcclxuICAgICAgICAgKiBAcGFyYW0gemF2cml0IC0gVHlwIGFrY2UgcG8gdWxvxb5lbsOtIHDFmWVkcGlzdSAgICAgIFxyXG4gICAgICAgICAqICAgMCAtIFVsb8W+aXRcclxuICAgICAgICAgKiAgIDEgLSBVbG/Fvml0IGEgemF2xZnDrXRcclxuICAgICAgICAgKiAgIDIgLSBVbG/Fvml0IGEgcG9kYXQgZGFsxaHDrSBcclxuICAgICAgICAgKi9cclxuICAgICAgICB1bG96ZW5pUHJlZHBpc3UoY19kdG86IEludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gLHphdnJpdDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1MlwiLCB0ZXh0OiBcIlByb2LDrWjDoSB1a2zDoWTDoW7DrSBwxZllZHBpc3UuLi5cIiB9KTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRoYXQuaXNsLlByZWRwaXN5LnVsb3pQcmVkcGlzKHJxID0+IHsgcmV0dXJuIHsgcnE6IHsgRGF0YTogY19kdG8gfSB9OyB9KS5nZXQoKSwgdGhpcywgZmFsc2UsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QT1ZFRExPIFNFIFVMT8W9RU7DjSBQxZhFRFBJU1VcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlJhZGVrX3VociA9IHJldC5EdG8hLnJhZGVrX3VociE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5FZGl0ID0gdHJ1ZTsgLy9wxZlpIMO6c3DEm8WhbsOpbSB1bG/FvmVuw60gem3Em27DrSBob2Rub3R1IHBybyBwcsOhY2kgbmFkIGRldGFpbGVtIChtxJtsbyBieSB6YWJyw6FuaXQgZ2VuZXJvdsOhbsOtIG5vdsOpaG8gxZnDoWRrdSBwxZllZHBpc3UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50aXRsZSA9IGBEZXRhaWwgcMWZZWRwaXN1IMSNLiR7cmV0LkR0byEucmFkZWtfdWhyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGF0LnRpdGxlIH1dKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdTJcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRpYWxvZ3MubWVzc2FnZUJveChgVWxvxb5lbm9gLCBgUMWZZWRwaXMgxI0uICR7cmV0LkR0byEucmFkZWtfdWhyfSDDunNwxJvFoW7EmyB1bG/FvmVuIDwvYnI+UMWZZWpldGUgc2kgcG9rcmHEjW92YXQgdiDDunByYXbDoWNoP2AsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpU3VjY2VzcywgMzAwLCAxNTApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh6YXZyaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiB7IC8vISAwIC0gVWxvxb5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInpub3Z1TmFjdGVuaVByZWRwaXN1XCIsIHRleHQ6IFwiUHJvYsOtaMOhIG5hxI10ZW7DrSBwxZllZHBpc3UuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUYgUMWZZWpldGUgc2kgcG9rcmHEjW92YXQgdiBlZGl0YWNpIHDFmWVkcGlzdT8gUG9rdWQgYW5vIC0+IFpub3Z1bmHEjXRlbsOtIHx8IHYgb3BhxI1uw6ltIHDFmWlwYWTEmyB6YXbFmXUgb2tub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmlzbC5QcmVkcGlzeS5yZWFkKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGF0YTogeyBpeHA6IHJldC5EdG8hLml4cCwgcmFkZWtfdWhyOiByZXQuRHRvIS5yYWRla191aHIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL2ZyYWdtZW50czogW1wiRGVmYXVsdFwiLCBcIkV4dGVuZGVkXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJSZWFkRGF0YVByZWRwaXN1XCIsIHsgX2l4cDogcmV0LkR0byEuaXhwLCBfcmFkZWs6IHJldC5EdG8hLnJhZGVrX3VociB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QT1ZFRExPIFNFIFpOT1ZVLU5BxIxURU7DjSBQxZhFRFBJU1UgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG8gPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGR0bywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRlZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ6bm92dU5hY3RlbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInpub3Z1TmFjdGVuaVByZWRwaXN1XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiB7IC8vISAxIC0gVWxvxb5pdCBhIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogeyAvLyEgMiAtIFVsb8W+aXQgYSBwb2RhdCBkYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFByZWRwaXN1XCIsIHsgSUQ6ICdERFBHRGV0YWlsUHJlZHBpc3UjJywgVGl0dWxlazogXCJOb3bDvSBwxZllZHBpc1wiLCBJeHA6IHRoYXQuSXhwLCBUeXBfcGhsOiB0aGF0LlR5cF9waGwsIEVkaXQ6IGZhbHNlLCBUZXN0OiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxQcmVkcGlzdVwiLCBQYXJhbUpTT04sIHdpbmRvd09wdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoemF2cml0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiem5vdnVOYWN0ZW5pUHJlZHBpc3VcIiwgdGV4dDogXCJQcm9iw61ow6EgbmHEjXRlbsOtIHDFmWVkcGlzdS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vSUYgUMWZZWpldGUgc2kgcG9rcmHEjW92YXQgdiBlZGl0YWNpIHDFmWVkcGlzdT8gUG9rdWQgYW5vIC0+IFpub3Z1bmHEjXRlbsOtIHx8IHYgb3BhxI1uw6ltIHDFmWlwYWTEmyB6YXbFmXUgb2tub1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuUHJlZHBpc3kucmVhZChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkYXRhOiB7IGl4cDogcmV0LkR0byEuaXhwLCByYWRla191aHI6IHJldC5EdG8hLnJhZGVrX3VociB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJEZWZhdWx0XCIsIFwiRXh0ZW5kZWRcIl1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2RlYnVnZ2VyOyAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUE9WRURMTyBTRSBaTk9WVS1OQcSMVEVOw40gUMWYRURQSVNVXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm1vZGVsUHJlZHBpc3UgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgZHRvID0gZGF0YS5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ6bm92dU5hY3RlbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInpub3Z1TmFjdGVuaVByZWRwaXN1XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lbHNlIGlmICh6YXZyaXQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vLm9uKFwibm9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZGVidWdnZXI7IC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3RoYXQuY2xvc2UoXCJuZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxQcmVkcGlzdVwiLCB7IElEOiAnRERQR0RldGFpbFByZWRwaXN1IycsIFRpdHVsZWs6IFwiTm92w70gcMWZZWRwaXNcIiwgSXhwOiB0aGF0Lkl4cCwgVHlwX3BobDogdGhhdC5UeXBfcGhsLCBFZGl0OiBmYWxzZSwgVGVzdDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFByZWRwaXN1XCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdTJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IFByb2Nlc3NSZXNwb25zZSAtIHpkZSB1cHJhdmVubyAtPiBrIHRlc3R1XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKG9iai5iYXNlTWVzc2FnZSArIFwiPC9icj4gUMWZZWpldGUgc2kga29udHJvbHUgcMWZZXBzYXQ/XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnVsb3ooJC5leHRlbmQocGFyYW1zLCBwYXJhbXMuS29udHJvbGFFeGlzdGVuY2UgPSBmYWxzZSwgeyBjb25maXJtOiB0cnVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIHBybyB6YXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAqIEBtZXRob2QgY2xvc2luZygpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xvc2luZygpIHsgXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IHRoYXQuZmluZEZpZWxkcygpO1xyXG5cclxuICAgICAgICAgICAgLy9rb250b3JsYSBqZXN0bGkganNvdSBkYXRhIHptxJtuxJtuYSBhIGplc3RsaSB6bcSbbnkgdWxvxb5pdFxyXG4gICAgICAgICAgICBjb25zdCBlZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vY29uc3QgZWRpdCA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKChlZGl0KSkge1xyXG4gICAgICAgICAgICAgICAgRWtvLkRldGFpbC5tZXNzYWdlQm94VW5zYXZlZERhdGEodGhhdClcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJub1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJleiB1bG/FvmVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2FuY2VsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2xvc2UoKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIC8vVE9ETyB6cHJvdm96bml0KEVESVRPVkFUKSBmdW5rY2kgcHJvIHphdsWZZW7DrSBva25hXHJcbiAgICAgICAgLy8gICAgLy9UT0RPIGtvbnRyb2xhIHptxJtuxJtuw71jaCBwb2zDrcSNZWsgcMWZZWQgemF2xZllbsOtXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gbmHEjXRlbsOtIGRhdCB6IGZvcm11bMOhxZllIERQSFxyXG4gICAgICAgICAqIEBtZXRob2QgZGF0YURvUmVrYXBpdHVsYWNlKClcclxuICAgICAgICAgKiBAdW51c2VkIG5lcG91xb5pdG9cclxuICAgICAgICAgKiBAcmV0dXJucyBVdGlsaXRhIHBybyB2w71wb8SNZXQgRFBIXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhRG9SZWthcGl0dWxhY2UoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5FZGl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUHJlZHBpc3UuY19tZW5hID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUHJlZHBpc3UuY196MCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFByZWRwaXN1LmNfejEgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxQcmVkcGlzdS5jX3oyID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUHJlZHBpc3UuY196MyA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFByZWRwaXN1LmNfejQgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxQcmVkcGlzdS5jX2QwID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUHJlZHBpc3UuY19kMSA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFByZWRwaXN1LmNfZDIgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxQcmVkcGlzdS5jX2QzID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsUHJlZHBpc3UuY19kNCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxQcmVkcGlzdS5jX3owID0gcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxQcmVkcGlzdS5jX3owISkubWludXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxQcmVkcGlzdS5jX2QwISkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJla2FwaXR1bGFjZTogR29yZGljLkdpbi5XZWJDbGllbnQuSUdBcHBseVJ1bGVbXSA9IFtcclxuICAgICAgICAgICAgICAgIC8vIEJleiBkYW7EmyBhIG9zdm9ib3plbm9cclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2QwXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLk9zdm9ib3plbm8sIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IFwiY196MFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5CZXpEYW5lLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgLy8gWsOha2xhZG7DrSBzYXpiYSBkYW7Em1xyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfejJcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmksIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IFwiY19kMlwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgIC8vIFNuw63FvmVuw6Egc2F6YmEgZGFuxJtcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX3oxXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlBydm5pU25pemVuYSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2QxXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlBydm5pU25pemVuYSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgIC8vIERydWjDoSBzbsOtxb5lbsOhIHNhemJhIGRhbsSbXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IFwiY196M1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IFwiY19kM1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJ0YXhcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAvLyBDZWxrZW1cclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX21lbmFcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRG9rbGFkQ2Vsa2VtLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIC8vIFrDoWtsYWRuw60gc2F6YmEgZGFuxJsgLSBkb2RhbsSbbsOtXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IFwiY196MmRcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmlEb2RhbmVuaSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2QyZFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaURvZGFuZW5pLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgLy8gU27DrcW+ZW7DoSBzYXpiYSBkYW7EmyAtIGRvZGFuxJtuw61cclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX3oxZFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5QcnZuaVNuaXplbmFEb2RhbmVuaSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2QxZFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5QcnZuaVNuaXplbmFEb2RhbmVuaSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgIC8vIERydWjDoSBzbsOtxb5lbsOhIHNhemJhIGRhbsSbIC0gZG9kYW7Em27DrVxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfejNkXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkRydWhhU25pemVuYURvZGFuZW5pLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfZDNkXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkRydWhhU25pemVuYURvZGFuZW5pLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgLy8gWmFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfemFvXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlphb2tyb3VobGVubywgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuR2luLldlYkNsaWVudC5VdGlscy5kcGhNb2RlbEFwcGx5KHRoaXMubW9kZWxQcmVkcGlzdSwgcmVrYXBpdHVsYWNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIz09PT09PT09PT09PT09PSBUIEUgUyBUID09PSBTIFAgQSBDIEUgPT09PT09PT09PT09PT09PSMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyAgICAgICAgXHJcbiAgICAgICAgLy8jcmVnaW9uIFRlc3RvdmFjw60gbWV0b2R5XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgxZnDoWRrdSBwxZllZHBpc3UgKHrFmWVqbcSbIHByb2LEm2huZSBwxZllZCB1bG/FvmVuw61tID8/PylcclxuICAgICAgICAgKiBAcGFyYW0gblBvbVxyXG4gICAgICAgICAqIEBwYXJhbSBzQ29tbWFuZFxyXG4gICAgICAgICAqIEBwYXJhbSBsX29sZF9kYXRfdnpuaWt1XHJcbiAgICAgICAgICogQHBhcmFtIGxfb2xkX2RhdF9zcGxcclxuICAgICAgICAgKi8gLy9GdW5jdGlvbjogS29udHJvbGFSYWRrdSAodiBHdXB0xJspXHJcbiAgICAgICAgcHJpdmF0ZSBrb250cm9sYVByZWRwaXN1KG5Qb206IG51bWJlciwgc0NvbW1hbmQ6IHN0cmluZywgbF9vbGRfZGF0X3Z6bmlrdTogRGF0ZSwgbF9vbGRfZGF0X3NwbDogRGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbF9vbGRfZGF0X3Z6bmlrdSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGxfb2xkX2RhdF9zcGwgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAvKiogU2V0IHRibF9wcmVkcGlzeS5uUm93ID0gVEJMX01pblJvdyAqL1xyXG4gICAgICAgICAgICB2YXIgcHJlZHBpczogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvID0ge307ICAvL1RPRE86IG5hxI3DrXN0IGRhdGEgeiBkZXRhaWx1IHBybyBvdGVzdG92w6Fuw61cclxuXHJcbiAgICAgICAgICAgIC8vdiBHdXB0xJsgc2UgbmVqc3DDrcWhZSAocMWZaSB6YXbFmWVuw60pIGtvbnRyb2xvdmFseSB2xaFlY2hueSBwxZllZHBpc3ksIHRhZHkgxZllxaHDrW1lIHRlbnRvIGplZGVuIGtvbmtyZXRuw60gdGFrxb5lIGJ5IExPT1AgbmVtxJtsIGLDvXQgemFwb3TFmWViw61cclxuICAgICAgICAgICAgLy9MT09QICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9JRiBTYWxUYmxGaW5kTmV4dFJvdyh0YmxfcHJlZHBpc3ksIHRibF9wcmVkcGlzeS5uUm93LCBST1dfTmV3IHwgUk9XX0VkaXRlZCwgUk9XX01hcmtEZWxldGVkKVxyXG4gICAgICAgICAgICAvL2NvZGUuLi5cclxuICAgICAgICAgICAgLy9DYWxsIHNldF9jb250ZXh0KHRibF9wcmVkcGlzeS5uUm93KVxyXG4gICAgICAgICAgICAvLyEgbXVzw60gYsO9dCB6YWRhbsOhIHBvbG/FvmthIFNNTFxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuRGJQYXJhbXMuZGRwX3Bvdl96YWRzbWwgPT0gMSAmJiBwcmVkcGlzLml4cF9zbWw/Lmxlbmd0aCAhPSAxMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTXVzw60gYsO9dCB6YWTDoW5hIHBvbG/FvmthIHNtbG91dnkhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbzpmb2N1cyBuYSBmaWVsZCBzbWxcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9IC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRiUGFyYW1zLmRkcF9wb3ZfemFkc21sID09IDIgJiYgcHJlZHBpcy5peHBfc21sPy5sZW5ndGggPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lc23DrSBiw710IHphZMOhbmEgcG9sb8W+a2Egc21sb3V2eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RvZG86Zm9jdXMgbmEgZmllbGQgc21sXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBpZiAoIXByZWRwaXMuZGF0X3NwbCkgeyAvL3hJZiB0YmxfcHJlZHBpc3kuY29sX2RhdF9zcGwuRGF0dW0oKSA9IERBVEVUSU1FX051bGxcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lbsOtIHZ5cGxuxJtubyBkYXR1bSBzcGxhdG5vc3RpIHDFmWVkcGlzdSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvOmZvY3VzIG5hIGZpZWxkIGRhdF9zcGxcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9IC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmICghcHJlZHBpcy5kYXRfdnpuaWt1KSB7IC8veElmIHRibF9wcmVkcGlzeS5jb2xfZGF0X3NwbC5EYXR1bSgpID0gREFURVRJTUVfTnVsbFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVuw60gdnlwbG7Em25vIGRhdHVtIHZ6bmlrdSBwxZllZHBpc3UhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbzogbmEgZmllbGQgZGF0X3Z6bmlrdVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH0gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgaWYgKHRoYXQua29udF9zcGx2em4gPT0gMCkgeyAvL3hJZiBnZl9OYWN0aUxva2FsbmlQYXJhbWV0ck4oJ2tvbnRfc3BsdnpuJywgMCkgXHJcbiAgICAgICAgICAgICAgICBpZiAocHJlZHBpcy5kYXRfdnpuaWt1ID4gcHJlZHBpcy5kYXRfc3BsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy94SWYgdGJsX3ByZWRwaXN5LmNvbF9kYXRfdnpuaWt1LkRhdHVtKCkgPiB0YmxfcHJlZHBpc3kuY29sX2RhdF9zcGwuRGF0dW0oKSBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJEYXR1bSB2em5pa3UgcMWZZWRwaXN1IGplIG1lbsWhw60gbmXFviBkYXR1bSBzcGxhdG5vc3RpIVwiICsgXCIoS29udHJvbHUgbHplIHZ5cG5vdXQgdiBOYXN0YXZlbsOtIC0gTG9rw6FsbsOtIHBhcmFtZXRyeSlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzpmb2N1cyBuYSBmaWVsZCBkYXRfdnpuaWt1XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy90b2RvICAvL2RvdGF6IHpkYSBzZSBqZWRuw6EgbyBub3bDvSBwxZllZHBpcyBuZWJvIHNlIHptxJtuaWxvIGRhdHVtIHZ6bmlrdVxyXG4gICAgICAgICAgICAvL2lmICgpIHsgICAgIC8vICBJZiBTYWxUYmxRdWVyeVJvd0ZsYWdzKHRibF9wcmVkcGlzeSwgdGJsX3ByZWRwaXN5Lm5Sb3csIFJPV19OZXcpICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIE9SIChjb2xfb2xkX2RhdF92em5pa3UuRGF0dW0oKSAhPSBEQVRFVElNRV9OdWxsIEFORCBjb2xfb2xkX2RhdF92em5pa3UuRGF0dW0oKSAhPSBjb2xfZGF0X3Z6bmlrdS5EYXR1bSgpKVxyXG4gICAgICAgICAgICBpZiAocHJlZHBpcy5kYXRfdnpuaWt1ISA8PSB0aGlzLm1vZGVsUGhsLk5hc3RhdmVuaT8uZGF0X3V6YXYhKSB7ICAvL0lmIHRibF9wcmVkcGlzeS5jb2xfZGF0X3Z6bmlrdS5EYXR1bSgpIDw9IGdfdHlwX3BvaGxlZGF2a3kuZGF0X3V6YXZcclxuICAgICAgICAgICAgICAgIGlmIChwcmVkcGlzLmt0Z191cG8hIDwgMjAwKSB7IC8veElmIGNvbF9rdGdfdXBvIDwgMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiSnNvdSB6YWTDoW5hIGRhdGEgdnpuaWt1IHYgdXphdsWZZW7DqW0gb2Jkb2LDrSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvOmZvY3VzIG5hIGZpZWxkIGRhdF92em5pa3VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL30gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8gISBrb250cm9sYSBuYSBkYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgaWYgKHByZWRwaXMuZGF0X3ptZW5hICE9IG51bGwpIHsgLy9JZiBTYWxUYmxRdWVyeVJvd0ZsYWdzKHRibF9wcmVkcGlzeSwgdGJsX3ByZWRwaXN5Lm5Sb3csIFJPV19FZGl0ZWQpIEFORCB0YmxfcHJlZHBpc3kuY29sX2RhdF96bWVuYSAhPSBEQVRFVElNRV9OdWxsXHJcbiAgICAgICAgICAgICAgICAvL1x0SWYgZ2ZfSmVQcmVkcGlzWm1lbmVuKGNvbF9peHAsIGNvbF9yYWRla191aHIsIHRibF9wcmVkcGlzeS5jb2xfZGF0X3ptZW5hKSAvL0Z1bmprY2Uga3RlcsOhIHZyYWPDrSBkYXRfem1lbmEgeiBEQiBhIHBvcm92bsOhIGhvIHMgZGF0dW1lbSB6IGRldGFpbHUgXHJcbiAgICAgICAgICAgICAgICAvL1x0XHRDYWxsIGdmX1pvYnJhekNoeWJ1KCdQxZllZHBpcyBieWwgem3Em27Em24gamluw71tIHXFvml2YXRlbGVtLCBuZWx6ZSB1bG/Fvml0IVxyXG5cclxuICAgICAgICAgICAgICAgIC8vXHRcdFx0XHROYcSNdMSbdGUgb2JzYWggdGFidWxreSB6bm92dShrbMOhdmVzYSBGNSksIHByb3ZlxI90ZSBwb8W+YWRvdmFuw6kgem3Em255IGEgcMWZw61wYWQgem5vdnUgdWxvxb50ZS4nKVxyXG4gICAgICAgICAgICAgICAgLy9cdFx0UmV0dXJuIDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAhIGtvbnRyb2xhIHpkYSBub3bEmyBwb8WZw616ZW7DvSBwxZllZHBpcyBuZXNwYWTDoSBkbyB1xb4gdnltw6FoYW7DqWhvIG9iZG9iw61cclxuICAgICAgICAgICAgLy9sZXQgYm9vbFJldCA9IHRoaXMuamVEYXR1bVZlVnltYWhhbmVtT2RvYmkoKTtcclxuXHJcbiAgICAgICAgICAgIC8qaWYgKG51bGwpIHsgLy8gdGhpcy5qZURhdHVtVmVWeW1haGFuZW1PZG9iaSgpICAgLy8gICBnZl9KZURhdHVtVmVWeW1haGFuZW1PZG9iaShjb2xfaXhwLCBjb2xfZGF0X3NwbC5EYXR1bSgpKSBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmFsZXJ0KFwiUG96b3JcIiwgYFBvem9yLCBwxZllZHBpcyDEjS4gJHtwcmVkcGlzLnJhZGVrX3Vocn0gamUgemFkw6FuIHYgb2Jkb2LDrSwga3RlcsOpIGplIGppxb4gdnltw6Fow6FubyEgVWxvxb5lbsOtIHRvaG90byBwxZllZHBpc3UgbcWvxb5lIHbDqXN0IGsgcm96cG9ydSBtZXppIGRsdcW+bm91IGEgdnltw6FoYW5vdSDEjcOhc3Rrb3UhYCk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9FTFNFXHJcbiAgICAgICAgICAgIC8vQlJFQUtcclxuXHJcbiAgICAgICAgLy8hIGtvbnRyb2xhIGRhdGEgc3BsYXRub3N0aSBhIHZ6bmlrdVxyXG5cclxuICAgICAgICAvL0lmIGRkcHBpZC5kYXRfcG9jYXRlayA+IGxfb2xkX2RhdF9zcGwgQU5EIGxfb2xkX2RhdF9zcGwgIT0gREFURVRJTUVfTnVsbFxyXG4gICAgICAgICAgICAvL0lmIGdmX0hvZG5vdGFQYXJhbWV0cnVEQk4oJ2RkcF9wb3ZfYXV0em1kJykgPSAwXHJcbiAgICAgICAgICAgIC8vXHRDYWxsIGdmX1pvYnJhekNoeWJ1KCdEYXR1bSBwb8SNw6F0a3UgcMWZw61wYWR1ICgnIHx8IGdmX0Zvcm1hdHVqRGF0dW0oZGRwcGlkLmRhdF9wb2NhdGVrKSB8fCAnKSBqZSBub3bEm2rFocOtIG5lxb4gZGF0dW0gc3BsYXRub3N0aSBwxZllZHBpc3UgbsSba3RlcsOpaG8geiBwxZllZHBpc8WvKCcgfHwgZ2ZfRm9ybWF0dWpEYXR1bShsX29sZF9kYXRfc3BsKSB8fCAnKVxyXG5cdFx0XHRcdFxyXG4gICAgICAgICAgICAvL1x0XHRcdFDFmcOtcGFkIG5lbHplIHphZXZpZG92YXQhJylcclxuICAgICAgICAgICAgLy9cdFJldHVybiAwXHJcbiAgICAgICAgICAgIC8vSWYgZ2ZfSG9kbm90YVBhcmFtZXRydURCTignZGRwX3Bvdl9hdXR6bWQnKSA9IDFcclxuICAgICAgICAgICAgLy9cdElmIE5PVCBnZl9ab2JyYXpEb3RheignRGF0dW0gcG/EjcOhdGt1IHDFmcOtcGFkdSgnIHx8IGdmX0Zvcm1hdHVqRGF0dW0oZGRwcGlkLmRhdF9wb2NhdGVrKSB8fCAnKSBqZSBub3bEm2rFocOtIG5lxb4gZGF0dW0gc3BsYXRub3N0aSBwxZllZHBpc3UgbsSba3RlcsOpaG8geiBwxZllZHBpc8WvICgnIHx8IGdmX0Zvcm1hdHVqRGF0dW0obF9vbGRfZGF0X3NwbCkgfHwgJylcclxuXHRcdFx0XHRcclxuICAgICAgICAgICAgLy9cdFx0XHRDaGNldGUgZGF0dW0gcG/EjcOhdGt1IHDFmcOtcGFkdSBwb3N1bm91dCBuYSAnfHxnZl9Gb3JtYXR1akRhdHVtKCBsX29sZF9kYXRfc3BsLTEgKXx8ICcoZGVuIHDFmWVkIGRhdHVtIHNwbGF0bm9zdGkgbmVqc3RhcsWhw61obyBwxZllZHBpc3UpID9cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBQb2t1ZCBvZHBvdsOtdGUgTkUsIHDFmcOtcGFkIHNlIG5lemFldmlkdWplLCBvcHJhdnUgcHJvdmXEj3RlIHJ1xI1uxJsuXHJcbiAgICAgICAgICAgIC8vXHRcdFx0JylcclxuICAgICAgICAgICAgLy9cdFx0UmV0dXJuIDBcclxuICAgICAgICAgICAgLy9cdFNldCBkZHBwaWQuZGF0X3BvY2F0ZWsgPSBsX29sZF9kYXRfc3BsIC0gMVxyXG4gICAgICAgICAgICAvL0lmIGdmX0hvZG5vdGFQYXJhbWV0cnVEQk4oJ2RkcF9wb3ZfYXV0em1kJykgPSAyXHJcbiAgICAgICAgICAgIC8vXHRJZiBOT1QgZ2ZfWm9icmF6RG90YXooJ0RhdHVtIHBvxI3DoXRrdSBwxZnDrXBhZHUgamUgbm92xJtqxaHDrSBuZcW+IGRhdHVtIHNwbGF0bm9zdGkgbsSba3RlcsOpaG8geiBwxZllZHBpc8WvIVxyXG5cdFx0XHRcdFxyXG4gICAgICAgICAgICAvL1x0XHRcdENoY2V0ZSBkYXR1bSBwb8SNw6F0a3UgcMWZw61wYWR1IHBvc3Vub3V0IG5hICd8fGdmX0Zvcm1hdHVqRGF0dW0oIFNhbERhdGVDb25zdHJ1Y3QoIFNhbERhdGVZZWFyKGxfb2xkX2RhdF9zcGwpLDEsMSwwLDAsMCAgKSl8fCAnKDEuMS5yb2t1IHNwbGF0bm9zdGkgbmVqc3RhcsWhw61obyBwxZllZHBpc3UpID9cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgUG9rdWQgb2Rwb3bDrXRlIE5FLCBwxZnDrXBhZCBzZSBuZXphZXZpZHVqZSwgb3ByYXZ1IHByb3ZlxI90ZSBydcSNbsSbLlxyXG4gICAgICAgICAgICAvL1x0XHRcdCcpXHJcbiAgICAgICAgICAgIC8vXHRcdFJldHVybiAwXHJcbiAgICAgICAgICAgIC8vXHRTZXQgZGRwcGlkLmRhdF9wb2NhdGVrID0gU2FsRGF0ZUNvbnN0cnVjdChTYWxEYXRlWWVhcihsX29sZF9kYXRfc3BsKSwgMSwgMSwgMCwgMCwgMClcclxuICAgICAgICAgICAgLy9JZiBnZl9Ib2Rub3RhUGFyYW1ldHJ1REJOKCdkZHBfcG92X2F1dHptZCcpID0gM1xyXG4gICAgICAgICAgICAvL1x0IU5pY1xyXG4gICAgICAgICAgICAvL0lmIGdmX0hvZG5vdGFQYXJhbWV0cnVEQk4oJ2RkcF9wb3ZfYXV0em1kJykgPSA0XHJcbiAgICAgICAgICAgIC8vXHRJZiBOT1QgZ2ZfWm9icmF6RG90YXooJ0RhdHVtIHBvxI3DoXRrdSBwxZnDrXBhZHUoJyB8fCBnZl9Gb3JtYXR1akRhdHVtKGRkcHBpZC5kYXRfcG9jYXRlaykgfHwgJykgamUgbm92xJtqxaHDrSBuZcW+IGRhdHVtIHNwbGF0bm9zdGkgbsSba3RlcsOpaG8geiBwxZllZHBpc3UgKCcgfHwgZ2ZfRm9ybWF0dWpEYXR1bShsX29sZF9kYXRfc3BsKSB8fCAnKVxyXG5cdFx0XHRcdFxyXG4gICAgICAgICAgICAvL1x0XHRcdENoY2V0ZSBwb2tyYcSNb3ZhdCA/XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgIChwb2tyYcSNb3bDoW7DrSBtxa/FvmUgbcOtdCB6YSBuw6FzbGVkZWsgbmVzcHLDoXZuw70gdsO9cG/EjWV0IHNhbGRhIHYgcMWZw61wYWTEmywgxb5lIGplIMWhcGF0bsSbIHphZMOhbmEgxI3DoXN0a2EgcG/EjcOhdGt1IHDFmcOtcGFkdSEpXHJcbiAgICAgICAgICAgIC8vXHRcdFx0JylcclxuICAgICAgICAgICAgLy9cdFx0UmV0dXJuIDBcclxuXHJcbiAgICAgICAgLy9JZiBkZHBwaWQuZGF0X3BvY2F0ZWsgPiBsX29sZF9kYXRfdnpuaWt1IEFORCBsX29sZF9kYXRfdnpuaWt1ICE9IERBVEVUSU1FX051bGxcclxuXHQgICAgICAgIC8vSWYgZ2ZfSG9kbm90YVBhcmFtZXRydURCTignZGRwX3Bvdl9hdXR6bWQnKSA9IDBcclxuXHQgICAgICAgICAgICAvL1x0Q2FsbCBnZl9ab2JyYXpDaHlidSgnRGF0dW0gcG/EjcOhdGt1IHDFmcOtcGFkdSBqZSBub3bEm2rFocOtIG5lxb4gZGF0dW0gdnpuaWt1IG7Em2t0ZXLDqWhvIHogcMWZZWRwaXPFryFcclxuXHRcdFx0XHRcclxuXHQgICAgICAgICAgICAvL1x0XHRcdFDFmcOtcGFkIG5lbHplIHphZXZpZG92YXQhJylcclxuXHQgICAgICAgICAgICAvL1x0UmV0dXJuIDBcclxuXHQgICAgICAgICAgICAvL0lmIGdmX0hvZG5vdGFQYXJhbWV0cnVEQk4oJ2RkcF9wb3ZfYXV0em1kJykgPSAxXHJcblx0ICAgICAgICAgICAgLy9cdElmIE5PVCBnZl9ab2JyYXpEb3RheignRGF0dW0gcG/EjcOhdGt1IHDFmcOtcGFkdSBqZSBub3bEm2rFocOtIG5lxb4gZGF0dW0gdnpuaWt1IG7Em2t0ZXLDqWhvIHogcMWZZWRwaXPFryFcclxuXHRcdFx0XHRcclxuXHQgICAgICAgICAgICAvL1x0XHRcdENoY2V0ZSBkYXR1bSBwb8SNw6F0a3UgcMWZw61wYWR1IHBvc3Vub3V0IG5hICd8fGdmX0Zvcm1hdHVqRGF0dW0oIGxfb2xkX2RhdF92em5pa3UtMSApfHwgJyhkZW4gcMWZZWQgZGF0dW0gdnpuaWt1IG5lanN0YXLFocOtaG8gcMWZZWRwaXN1KSA/XHJcblxyXG4gICAgICAgICAgICAgLy8gICAgICAgICAgIFBva3VkIG9kcG92w610ZSBORSwgcMWZw61wYWQgc2UgbmV6YWV2aWR1amUsIG9wcmF2dSBwcm92ZcSPdGUgcnXEjW7Emy5cclxuXHQgICAgICAgICAgICAvL1x0XHRcdCcpXHJcblx0ICAgICAgICAgICAgLy9cdFx0UmV0dXJuIDBcclxuXHQgICAgICAgICAgICAvL1x0U2V0IGRkcHBpZC5kYXRfcG9jYXRlayA9IGxfb2xkX2RhdF92em5pa3UgLSAxXHJcblx0ICAgICAgICAgICAgLy9JZiBnZl9Ib2Rub3RhUGFyYW1ldHJ1REJOKCdkZHBfcG92X2F1dHptZCcpID0gMlxyXG5cdCAgICAgICAgICAgIC8vXHRJZiBOT1QgZ2ZfWm9icmF6RG90YXooJ0RhdHVtIHBvxI3DoXRrdSBwxZnDrXBhZHUgamUgbm92xJtqxaHDrSBuZcW+IGRhdHVtIHZ6bmlrdSBuxJtrdGVyw6lobyB6IHDFmWVkcGlzxa8hXHJcblx0XHRcdFx0XHJcblx0ICAgICAgICAgICAgLy9cdFx0XHRDaGNldGUgZGF0dW0gcG/EjcOhdGt1IHDFmcOtcGFkdSBwb3N1bm91dCBuYSAnfHxnZl9Gb3JtYXR1akRhdHVtKCBTYWxEYXRlQ29uc3RydWN0KCBTYWxEYXRlWWVhcihsX29sZF9kYXRfdnpuaWt1KSwxLDEsMCwwLDAgICkpfHwgJygxLjEucm9rdSB2em5pa3UgbmVqc3RhcsWhw61obyBwxZllZHBpc3UpID9cclxuXHJcbiAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIFBva3VkIG9kcG92w610ZSBORSwgcMWZw61wYWQgc2UgbmV6YWV2aWR1amUsIG9wcmF2dSBwcm92ZcSPdGUgcnXEjW7Emy5cclxuXHQgICAgICAgICAgICAvL1x0XHRcdCcpXHJcblx0ICAgICAgICAgICAgLy9cdFx0UmV0dXJuIDBcclxuXHQgICAgICAgICAgICAvL1x0U2V0IGRkcHBpZC5kYXRfcG9jYXRlayA9IFNhbERhdGVDb25zdHJ1Y3QoU2FsRGF0ZVllYXIobF9vbGRfZGF0X3Z6bmlrdSksIDEsIDEsIDAsIDAsIDApXHJcblx0ICAgICAgICAgICAgLy9JZiBnZl9Ib2Rub3RhUGFyYW1ldHJ1REJOKCdkZHBfcG92X2F1dHptZCcpID0gM1xyXG5cdCAgICAgICAgICAgIC8vXHQhTmljXHJcblx0ICAgICAgICAgICAgLy9JZiBnZl9Ib2Rub3RhUGFyYW1ldHJ1REJOKCdkZHBfcG92X2F1dHptZCcpID0gNFxyXG5cdCAgICAgICAgICAgIC8vXHRJZiBOT1QgZ2ZfWm9icmF6RG90YXooJ0RhdHVtIHBvxI3DoXRrdSBwxZnDrXBhZHUgamUgbm92xJtqxaHDrSBuZcW+IGRhdHVtIHZ6bmlrdSBuxJtrdGVyw6lobyB6IHDFmWVkcGlzxa8hXHJcblx0XHRcdFx0XHJcblx0ICAgICAgICAgICAgLy9cdFx0XHRDaGNldGUgcG9rcmHEjW92YXQgP1xyXG4gICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgKHBva3JhxI1vdsOhbsOtIG3Fr8W+ZSBtw610IHphIG7DoXNsZWRlayBuZXNwcsOhdm7DvSB2w71wb8SNZXQgc2FsZGEgdiBwxZnDrXBhZMSbLCDFvmUgamUgxaFwYXRuxJsgemFkw6FuYSDEjcOhc3RrYSBwb8SNw6F0a3UgcMWZw61wYWR1ISlcclxuXHQgICAgICAgICAgICAvL1x0XHRcdCcpXHJcbiAgICAgICAgICAgIC8vUmV0dXJuIDFcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gXCJTdGFyw6kgbmHEjXRlbsOtIGRhdCBuYSBUU1wiXHJcblxyXG4gICAgICAgIC8vIS0tLS0tTmHEjXRlbsOtIHDFmcOtcGFkdVxyXG4gICAgICAgIC8vdGhhdC5pc2wuUHJpcGFkLnJlYWQocnEgPT4ge1xyXG4gICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgIGRhdGE6IHsgaXhwOiB0aGF0Lkl4cCB9LFxyXG4gICAgICAgIC8vICAgICAgICAvL2ZyYWdtZW50czogW1wiKlwiXVxyXG4gICAgICAgIC8vICAgICAgICBmcmFnbWVudHM6IFtcIipcIiwgXCJFeHRlcm5pU3ViamVrdC5EZWZhdWx0XCIsIFwiVXJvY2VuaS4qXCJdXHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfSlcclxuICAgICAgICAvLyAgICAuZ2V0KCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLm1vZGVsUHJpcGFkdSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5sb2FkZWREYXRhKCk7IC8vPC0tLSBrb250b3JsYSB6ZGEgc2UgbmHEjWV0bG8gamnFviB2xaFlXHJcbiAgICAgICAgLy8gICAgICAgIC8vdmFyIGR0byA9IGRhdGEuZGF0YVxyXG4gICAgICAgIC8vICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGR0byk7XHJcbiAgICAgICAgLy8gICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZHRvLml4cCk7XHJcbiAgICAgICAgLy8gICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwiYnVfdmxcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkdG8uYnVfdmwpO1xyXG4gICAgICAgIC8vICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJub3Z5UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcInNrX3ZsXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZHRvLnNrX3ZsKTtcclxuICAgICAgICAvLyAgICAgICAgLy9pZiAoIXRoaXMuRWRpdCkge1xyXG4gICAgICAgIC8vICAgICAgICAvLyAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJtZW5hXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZHRvLm1lbmEpO1xyXG4gICAgICAgIC8vICAgICAgICAvL31cclxuICAgICAgICAvLyAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZCgnLmdmaWVsZDpub3QoLnVpLXN0YXRlLWRpc2FibGVkKScpLmZpcnN0KCkuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgIC8vICAgIH0pXHJcblxyXG4gICAgICAgIC8vIS0tLS0tTmHEjXRlbsOtIMO6ZGFqxa8gbyB0eXB1IHBvaGxlZMOhdmt5IChwxZnDrXpuYWt5IHDFmcOtcGFkdSlcclxuICAgICAgICAvL3ZhciBwcm9taXNlID0gdGhhdC5pc2wuVHlwUG9obGVkYXZreS5yZWFkKHJxID0+IHtcclxuICAgICAgICAvLyAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0eXBfcGhsOiB0aGF0LlR5cF9waGwsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBOYXN0YXZlbmk6IHRoYXQudWNzID09IG51bGwgPyB1bmRlZmluZWQgOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcm9rOiB0aGF0LnJvayxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB1Y3M6IHRoYXQudWNzLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGljbzogdGhhdC5pY29cclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgZnJhZ21lbnRzOiBbXCIqXCIsIFwiTmFzdGF2ZW5pLipcIl1cclxuICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgIC8vfSkuZ2V0KCk7XHJcbiAgICAgICAgLy9wcm9taXNlLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAvLyAgICB0aGF0Lm1vZGVsUGhsID0gZGF0YS5kYXRhO1xyXG4gICAgICAgIC8vICAgIHRoYXQubG9hZGVkRGF0YSgpOyAvLzwtLS0ga29udG9ybGEgemRhIHNlIG5hxI1ldGxvIGppxb4gdsWhZVxyXG4gICAgICAgIC8vICAgIC8vdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsUGhsKTtcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAvL2lmICh0aGF0Lkl4cCAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgaWYgKHRoYXQuRWRpdCkge1xyXG4gICAgICAgIC8vICAgICAgICAvLyEtLS0tLU5hxI10ZW7DrSDDumRhasWvIG8gUMWZw61wYWR1LXDFmWVkcGlzdVxyXG4gICAgICAgIC8vICAgICAgICB0aGF0LmlzbC5QcmVkcGlzeS5yZWFkKHJxID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTogeyBpeHA6IHRoYXQuSXhwLCByYWRla191aHI6IHRoYXQuUmFkZWtfdWhyIH0sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9mcmFnbWVudHM6IFtcIipcIl1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIkRlZmF1bHRcIiwgXCJFeHRlbmRlZFwiXVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmdldCgpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUHJlZHBpc3UgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5sb2FkZWREYXRhKCk7IC8vPC0tLSBrb250b3JsYSB6ZGEgc2UgbmHEjWV0bG8gamnFviB2xaFlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy92YXIgZHRvID0gZGF0YS5kYXRhXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwibm92eVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGR0byk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy90aGF0LnBvWm1lbmVTdWJqZWt0dShkYXRhLmRhdGEuaXhzX2VzdSlcclxuICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgLy90b2RvOiBOYXN0YXZpdCBOYcSNdGVuw60gxZnDoWRrdSBub3bDqWhvIHDFmWVkcGlzdSBwb3V6ZSBwxZlpIHphbG/FvmVuaSwgbmUgcMWZaSBkZXRhaWx1IVxyXG4gICAgICAgIC8vICAgICAgICAvLyEtLS0tLU5hxI10ZW7DrSDFmcOhZGt1IG5vdsOpaG8gcMWZZWRwaXN1XHJcbiAgICAgICAgLy8gICAgICAgIHZhciByYWRlayA9IHRoYXQuaXNsLlByZWRwaXN5Lm5hY3RpUmFkZWtQcmVkZXBpc3UocnEgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpX2l4cDogdGhhdC5JeHBcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgLy8gICAgICAgIHJhZGVrLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwicmFkZWtfdWhyXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm1vZGVsUHJlZHBpc3UucmFkZWtfdWhyID0gZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIm5vdnlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsUHJlZHBpc3UpO1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vIyMjIyNQRVJNSVNTSU9OIyMjIyNcclxuICAgICAgICAvL1RPRE86IHDFmWlkYXQgbmEgc3RyYW51IENTID8gb3Igc210IGxpa2UgdGhpcy4uLlxyXG4gICAgICAgIC8vaWYgKHRoYXQubW9kZWxQcmlwYWR1Lml4c19mdW5fYWt0ICE9IHRoaXMuaXhzRnVuKVxyXG4gICAgICAgIC8vICAgIHZhciBjaHliYSA9IFwiTmVqc3RlIHpwcmFjb3ZhdGVsZW0gZG9rdW1lbnR1IVwiOyAvL3RvZG8gQ2h5YmFcclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBcIlN0YXLDqSBuYcSNdGVuw60gZGF0IG5hIFRTXCJcclxuICAgICAgICAvLyNlbmRyZWdpb24gVGVzdG92YWPDrSBtZXRvZHlcclxuICAgIH1cclxufSJdfQ==