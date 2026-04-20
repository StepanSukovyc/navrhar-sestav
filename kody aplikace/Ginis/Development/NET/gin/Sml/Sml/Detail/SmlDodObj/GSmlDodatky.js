"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlDodatky.ts                  </Name>
//    <Description>                                                             </Description>
//    <Author>      Adam Černý                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-22                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSmlDodatky = class GSmlDodatky extends Gordic.GContentBase {
                onContentReady() {
                    this.$gridHlavicky = $("<div>").ggrid({
                        columns: this.createGridFormat(),
                        columnMode: "full",
                        defaultProfile: {
                            columnList: ", ixp, " + this.DefinitionColummnsListGrid2(),
                        },
                        data: new Gordic.Isl.View(Gordic.Isl.Doklady.detailDodatkyDoklad({
                            filters: {
                                ixp_sml_pri: this.model.ixp_sml_pri,
                                ktg_typ: 1692,
                            },
                            fragments: ["wflspid.*", "*"],
                        })),
                        selection: (ev, ctx) => {
                            let row = ctx.getSelection();
                            if (row.length > 0) {
                                let ixp = row[0].ixp;
                                //Isl metoda odebrána, protože existuje nová náhrada
                                //this.dataViewPolozky = new Gordic.Isl.View(Gordic.Isl.SmlPolFin.listDodatky({ filters: { ixp: ixp, } }));
                                this.$gridPolozky.ggrid("setData", this.dataViewPolozky);
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: () => {
                                let row = this.$gridHlavicky.ggrid("getSelection");
                                if (row[0].ixp != null)
                                    Sml.Dialogs.GSmlDetailOpenDlg({
                                        parentContent: this,
                                        opt: {
                                            ixp_den: undefined,
                                            ixp_dokladu: row[0].ixp,
                                            Grid: this.$gridHlavicky,
                                        },
                                    }).done((o) => {
                                    });
                            },
                        }),
                    }).gautofit().appendTo(this.element);
                    this.$gridPolozky = $("<div>").ggrid({
                        //columns: WebClient.Options.columnsFinancovaniPolozkyPrehled(this, this.model?.findoc?.ktg_sml ?? -1),
                        columnMode: "full",
                        data: this.dataViewPolozky,
                    }).gautofit().appendTo(this.element);
                }
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addTextColumn({
                        name: "sml_stav_txt" /* Interface.GDokladyDtoNames.sml_stav_txt */,
                        caption: "jres:33500285", //RC 33500285 : Stav dokladu
                        description: "jres:33500286", //RC 33500286 : Stav dokladu
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "preevidence" /* Interface.GDokladyDtoNames.preevidence */,
                        caption: "jres:33500287", //RC 33500287 : Stav přeevidence
                        description: "jres:33500288", //RC 33500288 : Stav přeevidence
                        width: 70,
                    });
                    Gordic.Eko.Grid.Column.addPid(gf, { name: "ixp" /* Interface.GDokladyDtoNames.ixp */ });
                    Gordic.Eko.Grid.Column.addAgendoveCislo(gf, { name: "ac_sml" /* Interface.GDokladyDtoNames.ac_sml */ });
                    Gordic.Eko.Grid.Column.addEvidencniCislo(gf, { name: "ac" /* Interface.GDokladyDtoNames.ac */ });
                    Gordic.Eko.Grid.Column.addVs(gf, { name: "vs" /* Interface.GDokladyDtoNames.vs */ });
                    Gordic.Eko.Grid.Column.addCastka(gf);
                    Gordic.Eko.Grid.Column.addTypDokladu(gf);
                    Gordic.Eko.Grid.Column.addZpracovatel(gf);
                    Gordic.Eko.Grid.Column.addKompetent(gf);
                    Gordic.Eko.Grid.Column.addRealizator(gf);
                    Gordic.Eko.Grid.Column.addMena(gf, { name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */ });
                    //Gordic.Eko.Grid.Column.addCastkaCZK (gf);
                    Gordic.Eko.Grid.Column.addIcoSubjektu(gf);
                    Gordic.Eko.Grid.Column.addRcSubjektu(gf);
                    gf.addTextColumn({
                        name: "c" /* Interface.GDokladyDtoNames.c */,
                        caption: "jres:33500289", //RC 33500289 : Rozpis CZK
                        description: "jres:33500289",
                        width: 50,
                    });
                    gf.addTextColumn({
                        name: "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        caption: "jres:33500290", //RC 33500290 : # ePri
                        description: "jres:33500291", //RC 33500291 : Počet elektronických příloh
                        width: 50,
                    });
                    gf.addNumberColumn({
                        name: "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        caption: "#",
                        description: "jres:33500292", //RC 33500292 : Pořadí dokumentu
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "popis" /* Interface.GDokladyDtoNames.popis */,
                        caption: "jres:33500293", //RC 33500293 : Popis
                        description: "jres:33500294", //RC 33500294 : Popis dokladu
                        width: 70,
                    })
                        .addTextColumn({
                        name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        caption: "jres:33500295", //RC 33500295 : Měna
                        description: "jres:33500296", //RC 33500296 : Měna dokladu
                        width: 70,
                    })
                        .addTextColumn({
                        name: "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        caption: "jres:33500297", //RC 33500297 : Cena smlouvy
                        description: "jres:33500298", //RC 33500298 : Cena smlouvy dokladu
                        width: 110,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_bez_dph" /* Interface.GDokladyDtoNames.c_mena_doc_bez_dph */,
                        caption: "jres:33500299", //RC 33500299 : Cena bez DPH
                        description: "jres:33500299",
                        width: 120,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_dph" /* Interface.GDokladyDtoNames.c_mena_doc_dph */,
                        caption: "jres:33500300", //RC 33500300 : DPH
                        description: "jres:33500300",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_s_dph" /* Interface.GDokladyDtoNames.c_mena_doc_s_dph */,
                        caption: "jres:33500301", //RC 33500301 : Cena s DPH
                        description: "jres:33500301",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "typ_ceny" /* Interface.GDokladyDtoNames.typ_ceny */,
                        caption: "jres:33500302", //RC 33500302 : Typ ceny
                        description: "jres:33500303", //RC 33500303 : Typ ceny dokladu
                        width: 80,
                        cellTemplate: (value) => {
                            if (value.typ_ceny == 10)
                                return "jres:33500304"; //RC 33500304 : Pevná
                            else if (value.typ_ceny == 20)
                                return "jres:33500305"; //RC 33500305 : Volná
                            else
                                return "";
                        }
                    })
                        .addDateColumn({
                        name: "dat_prij_pod" /* Interface.GDokladyDtoNames.dat_prij_pod */,
                        caption: "jres:33500306", //RC 33500306 : Evidováno
                        description: "jres:33500307", //RC 33500307 : Evidováno
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_platnost_txt" /* Interface.GDokladyDtoNames.typ_platnost_txt */,
                        caption: "jres:33500308", //RC 33500308 : Typ platnosti
                        description: "jres:33500308",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uzavreni" /* Interface.GDokladyDtoNames.dat_uzavreni */,
                        caption: "jres:33500309", //RC 33500309 : Uzavření
                        description: "jres:33500309",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_platnost" /* Interface.GDokladyDtoNames.dat_platnost */,
                        caption: "jres:33500310", //RC 33500310 : Ukončení platnosti
                        description: "jres:33500310",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_ucinnost" /* Interface.GDokladyDtoNames.dat_ucinnost */,
                        caption: "jres:33500311", //RC 33500311 : Účinnost
                        description: "jres:33500311",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "jres:33500312", //RC 33500312 : Datum podpisu
                        description: "jres:33500312",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_od" /* Interface.GDokladyDtoNames.fin_od */,
                        caption: "jres:33500313", //RC 33500313 : Financování od
                        description: "jres:33500313",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_do" /* Interface.GDokladyDtoNames.fin_do */,
                        caption: "jres:33500314", //RC 33500314 : Financování do
                        description: "jres:33500314",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "poznamka" /* Interface.GDokladyDtoNames.poznamka */,
                        caption: "jres:33500340", //RC 33500340 : Poznámka
                        description: "jres:33500340",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "jres:33500341", //RC 33500341 : Protistrana
                        description: "jres:33500341",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_pol" /* Interface.GDokladyDtoNames.c_pol */,
                        caption: "jres:33500342", //RC 33500342 : Položky FP
                        description: "jres:33500342",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_dod" /* Interface.GDokladyDtoNames.c_dod */,
                        caption: "jres:33500343", //RC 33500343 : Dodatky
                        description: "jres:33500343",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "jres:33500344", //RC 33500344 : Protistrana
                        description: "jres:33500344",
                        width: 80,
                    })
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.esu_ir,
                        //    caption: "Insolvence",
                        //    description: "Insolvence",
                        //    width: 80,
                        //})
                        .addTextColumn({
                        name: "bu_protiucet" /* Interface.GDokladyDtoNames.bu_protiucet */ /*_txt*/,
                        caption: "jres:33500339", //RC 33500339 : BÚ protistrany
                        description: "jres:33500339",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn_ext" /* Interface.GDokladyDtoNames.dat_sgn_ext */,
                        caption: "jres:33500338", //RC 33500338 : Datum podpisu protistrany
                        description: "jres:33500338",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_fun_ref_txt" /* Interface.GDokladyDtoNames.ixs_fun_ref_txt */,
                        caption: "jres:33500337", //RC 33500337 : Referent
                        description: "jres:33500337",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GDokladyDtoNames.nazev */ /*_sml*/,
                        caption: "jres:33500336", //RC 33500336 : Úplný název
                        description: "jres:33500336",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "soutez" /* Interface.GDokladyDtoNames.soutez */,
                        caption: "jres:33500335", //RC 33500335 : Soutež
                        description: "jres:33500335",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */,
                        caption: "jres:33500365", //RC 33500365 : Číslo VZ, DT, PO
                        description: "jres:33500365",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ucinnost" /* Interface.GDokladyDtoNames.ucinnost */,
                        caption: "jres:33500366", //RC 33500366 : Účinnost - komentář
                        description: "jres:33500366",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_1" /* Interface.GDokladyDtoNames.ac_dok_1 */,
                        caption: "jres:33500367", //RC 33500367 : Související dokument 1
                        description: "jres:33500367",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_orj_txt" /* Interface.GDokladyDtoNames.ixs_orj_txt */,
                        caption: "jres:33500369", //RC 33500369 : Organizační jednotka
                        description: "jres:33500369",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_2" /* Interface.GDokladyDtoNames.ac_dok_2 */,
                        caption: "jres:33500370", //RC 33500370 : Související dokument 2
                        description: "jres:33500371", //RC 33500371 : Související dokument 2
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_1" /* Interface.GDokladyDtoNames.dat_dok_1 */,
                        caption: "jres:33500334", //RC 33500334 : Datum SD1
                        description: "jres:33500334",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nks" /* Interface.GDokladyDtoNames.nks */,
                        caption: "jres:33500333", //RC 33500333 : NKS
                        description: "jres:33500333",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_2" /* Interface.GDokladyDtoNames.dat_dok_2 */,
                        caption: "jres:33500332",
                        description: "jres:33500332", //RC 33500332 : Datum SD2
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak" /* Interface.GDokladyDtoNames.c_fak */,
                        caption: "jres:33500331",
                        description: "jres:33500331", //RC 33500331 : Očekávané čerpání kreditu
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak_rok" /* Interface.GDokladyDtoNames.c_fak_rok */,
                        caption: "jres:33500330", //RC 33500330 : Očekávané čerpání případem v akt. obd. CZK
                        description: "jres:33500330",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_obj_sml" /* Interface.GDokladyDtoNames.c_obj_sml */,
                        caption: "jres:33500329",
                        description: "jres:33500329", //RC 33500329 : Objednáno SML případu
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_rok_rok" /* Interface.GDokladyDtoNames.c_rok_rok */,
                        caption: "jres:33500328",
                        description: "jres:33500328", //RC 33500328 : Rozpis případu v akt. obd. CZK
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_pol_rok" /* Interface.GDokladyDtoNames.c_pol_rok */,
                        caption: "jres:33500327",
                        description: "jres:33500327", //RC 33500327 : Položky FP případu v akt. obd. CZK
                        width: 80,
                    })
                        //.addNumberColumn({
                        //    name: Interface.GDokladyDtoNames.,
                        //    caption: "Očekávané čerpání případem v akt. obd. CZK",
                        //    description: "Očekávané čerpání případem v akt. obd. CZK",
                        //    width: 80,
                        //})   
                        .addDateColumn({
                        name: "dat_zve" /* Interface.GDokladyDtoNames.dat_zve */,
                        caption: "jres:33500326", //RC 33500326 : Datum zveřejnění
                        description: "jres:33500326",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_pri" /* Interface.GDokladyDtoNames.ixs_pri */,
                        caption: "jres:33500325",
                        description: "jres:33500325", //RC 33500325 : Veřejná zakázka
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_phl" /* Interface.GDokladyDtoNames.typ_phl */,
                        caption: "jres:33500324",
                        description: "jres:33500324", //RC 33500324 : Typ pohledávky
                        width: 80,
                    })
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.,
                        //    caption: "Zástupce vlastní strany",
                        //    description: "Zástupce vlastní strany",
                        //    width: 80,
                        //})
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.,
                        //    caption: "Zástupce Protistrany",
                        //    description: "Zástupce Protistrany",
                        //    width: 80,
                        //})
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.vs,
                        //    caption: "VS",
                        //    description: "VS",
                        //    width: 80,
                        //})
                        .addTextColumn({
                        name: "ixs_ref_zast_txt" /* Interface.GDokladyDtoNames.ixs_ref_zast_txt */,
                        caption: "jres:33500323", //RC 33500323 : Zástupce vlastní strany;
                        description: "jres:33500323",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_zast_txt" /* Interface.GDokladyDtoNames.ixs_esu_zast_txt */,
                        caption: "jres:33500322", //RC 33500322 : Zástupce Protistrany
                        description: "jres:33500322",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_zuk_txt" /* Interface.GDokladyDtoNames.ixs_zuk_txt */,
                        caption: "jres:33500321", //RC 33500321 : Způsob ukončení;
                        description: "jres:33500321",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        caption: "jres:33500318", //RC 33500318 : Datum ukončení;
                        description: "jres:33500318",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */,
                        cellTemplate: (value) => {
                            switch (value.priz_opce) {
                                case 0:
                                    return "jres:33500319"; //RC 33500319 : Ne
                                    break;
                                case 1:
                                    return "jres:33500320"; //RC 33500320 : Ano
                                    break;
                                default:
                                    return "";
                            }
                        },
                        caption: "jres:33500315", //RC 33500315 : Možnost opce
                        description: "jres:33500315",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "jres:33500317", //RC 33500317 : Datum podpisu
                        description: "jres:33500317",
                        width: 80,
                    });
                    return gf;
                    [];
                }
                // Definování názvů sloupců určené do gridu pro vlastnost columnList
                DefinitionColummnsListGrid2() {
                    return [
                        "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        "sml_stav_txt" /* Interface.GDokladyDtoNames.sml_stav_txt */,
                        "ixp" /* Interface.GDokladyDtoNames.ixp */,
                        "ac_sml" /* Interface.GDokladyDtoNames.ac_sml */,
                        "ac" /* Interface.GDokladyDtoNames.ac */,
                        "popis" /* Interface.GDokladyDtoNames.popis */,
                        "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        "c_mena" /* Interface.GDokladyDtoNames.c_mena */,
                        "c" /* Interface.GDokladyDtoNames.c */,
                        "c_mena_doc_bez_dph" /* Interface.GDokladyDtoNames.c_mena_doc_bez_dph */,
                        "c_mena_doc_dph" /* Interface.GDokladyDtoNames.c_mena_doc_dph */,
                        "c_mena_doc_s_dph" /* Interface.GDokladyDtoNames.c_mena_doc_s_dph */,
                        "typ_ceny" /* Interface.GDokladyDtoNames.typ_ceny */,
                        "dat_prij_pod" /* Interface.GDokladyDtoNames.dat_prij_pod */,
                        "typ_platnost_txt" /* Interface.GDokladyDtoNames.typ_platnost_txt */,
                        "dat_uzavreni" /* Interface.GDokladyDtoNames.dat_uzavreni */,
                        "dat_platnost" /* Interface.GDokladyDtoNames.dat_platnost */,
                        "dat_ucinnost" /* Interface.GDokladyDtoNames.dat_ucinnost */,
                        "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        "fin_od" /* Interface.GDokladyDtoNames.fin_od */,
                        "fin_do" /* Interface.GDokladyDtoNames.fin_do */,
                        "poznamka" /* Interface.GDokladyDtoNames.poznamka */,
                        "ixs_typ_txt" /* Interface.GDokladyDtoNames.ixs_typ_txt */,
                        "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        "c_pol" /* Interface.GDokladyDtoNames.c_pol */,
                        "c_dod" /* Interface.GDokladyDtoNames.c_dod */,
                        "ico_esu" /* Interface.GDokladyDtoNames.ico_esu */,
                        "rc_esu" /* Interface.GDokladyDtoNames.rc_esu */,
                        "bu_protiucet" /* Interface.GDokladyDtoNames.bu_protiucet */,
                        "ixs_fun_vyriz_txt" /* Interface.GDokladyDtoNames.ixs_fun_vyriz_txt */,
                        "dat_sgn_ext" /* Interface.GDokladyDtoNames.dat_sgn_ext */,
                        "ixs_fun_ref_txt" /* Interface.GDokladyDtoNames.ixs_fun_ref_txt */,
                        "nazev" /* Interface.GDokladyDtoNames.nazev */,
                        "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        "cis_real_txt" /* Interface.GDokladyDtoNames.cis_real_txt */,
                        "soutez" /* Interface.GDokladyDtoNames.soutez */,
                        "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */,
                        "ucinnost" /* Interface.GDokladyDtoNames.ucinnost */,
                        "ac_dok_1" /* Interface.GDokladyDtoNames.ac_dok_1 */,
                        "ixs_orj_txt" /* Interface.GDokladyDtoNames.ixs_orj_txt */,
                        "ac_dok_2" /* Interface.GDokladyDtoNames.ac_dok_2 */,
                        "dat_dok_1" /* Interface.GDokladyDtoNames.dat_dok_1 */,
                        "nks" /* Interface.GDokladyDtoNames.nks */,
                        "dat_dok_2" /* Interface.GDokladyDtoNames.dat_dok_2 */,
                        "c_fak" /* Interface.GDokladyDtoNames.c_fak */,
                        "c_obj_sml" /* Interface.GDokladyDtoNames.c_obj_sml */,
                        "c_rok_rok" /* Interface.GDokladyDtoNames.c_rok_rok */,
                        "c_pol_rok" /* Interface.GDokladyDtoNames.c_pol_rok */,
                        "c_fak_rok" /* Interface.GDokladyDtoNames.c_fak_rok */,
                        "dat_zve" /* Interface.GDokladyDtoNames.dat_zve */,
                        "ixs_pri" /* Interface.GDokladyDtoNames.ixs_pri */,
                        "ixs_ref_zast_txt" /* Interface.GDokladyDtoNames.ixs_ref_zast_txt */,
                        "ixs_esu_zast_txt" /* Interface.GDokladyDtoNames.ixs_esu_zast_txt */,
                        "ixs_zuk_txt" /* Interface.GDokladyDtoNames.ixs_zuk_txt */,
                        "vs" /* Interface.GDokladyDtoNames.vs */,
                        "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */
                    ].toString();
                }
            };
            GSmlDodatky = __decorate([
                gcontent
            ], GSmlDodatky);
            WebClient.GSmlDodatky = GSmlDodatky;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbERvZGF0a3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU21sRG9kYXRreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLGdGQUFnRjtBQUNoRiw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQWdpQmY7QUFoaUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdpQm5CO0lBaGlCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ2lCN0I7UUFoaUJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQVNuQyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsT0FBQSxZQUFZO2dCQU96QyxjQUFjO29CQUdWLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDaEMsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRTs0QkFDWixVQUFVLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRTt5QkFDN0Q7d0JBQ0QsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7NEJBQzdELE9BQU8sRUFBRTtnQ0FDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2dDQUNuQyxPQUFPLEVBQUUsSUFBSTs2QkFDaEI7NEJBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQzt5QkFDaEMsQ0FBQyxDQUFDO3dCQUNILFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFB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QWdpQjdCO0lBQUQsQ0FBQyxFQWhpQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdpQm5CO0FBQUQsQ0FBQyxFQWhpQlMsTUFBTSxLQUFOLE1BQU0sUUFnaUJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxEb2RhdGt5LnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgQWRhbSDEjGVybsO9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjEgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMS0wNy0yMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbERvZGF0a3lJbnB1dFBhcmFtcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sRG9kYXRreVJldHVyblZhbHVlIHtcclxuICAgIH1cclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sRG9kYXRreSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWw6IEludGVyZmFjZS5HU21sX0RldGFpbER0b1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRIbGF2aWNreTogSlF1ZXJ5PEhUTUxFbGVtZW50PlxyXG4gICAgICAgIHByaXZhdGUgJGdyaWRQb2xvemt5OiBKUXVlcnk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgICAgZGF0YVZpZXdQb2xvemt5OiBJc2wuVmlldzxhbnksIElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8SW50ZXJmYWNlLkdTbWxzcG9sRHRvPj47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWRIbGF2aWNreSA9ICQoXCI8ZGl2PlwiKS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIiwgaXhwLCBcIiArIHRoaXMuRGVmaW5pdGlvbkNvbHVtbW5zTGlzdEdyaWQyKCksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLkRva2xhZHkuZGV0YWlsRG9kYXRreURva2xhZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sX3ByaTogdGhpcy5tb2RlbC5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogMTY5MixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wid2Zsc3BpZC4qXCIsIFwiKlwiXSxcclxuICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gY3R4LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXhwID0gcm93WzBdLml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Jc2wgbWV0b2RhIG9kZWJyw6FuYSwgcHJvdG/FvmUgZXhpc3R1amUgbm92w6EgbsOhaHJhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGFWaWV3UG9sb3preSA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5TbWxQb2xGaW4ubGlzdERvZGF0a3koeyBmaWx0ZXJzOiB7IGl4cDogaXhwLCB9IH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFBvbG96a3kuZ2dyaWQoXCJzZXREYXRhXCIsIHRoaXMuZGF0YVZpZXdQb2xvemt5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuJGdyaWRIbGF2aWNreS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dbMF0uaXhwICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2dzLkdTbWxEZXRhaWxPcGVuRGxnKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kb2tsYWR1OiByb3dbMF0uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHcmlkOiB0aGlzLiRncmlkSGxhdmlja3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pLmdhdXRvZml0KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3JpZFBvbG96a3kgPSAkKFwiPGRpdj5cIikuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgLy9jb2x1bW5zOiBXZWJDbGllbnQuT3B0aW9ucy5jb2x1bW5zRmluYW5jb3ZhbmlQb2xvemt5UHJlaGxlZCh0aGlzLCB0aGlzLm1vZGVsPy5maW5kb2M/Lmt0Z19zbWwgPz8gLTEpLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGFWaWV3UG9sb3preSxcclxuXHJcbiAgICAgICAgICAgIH0pLmdhdXRvZml0KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEb2tsYWR5RHRvPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zbWxfc3Rhdl90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAyODVcIiwgLy9SQyAzMzUwMDI4NSA6IFN0YXYgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDI4NlwiLCAvL1JDIDMzNTAwMjg2IDogU3RhdiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnByZWV2aWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMjg3XCIsIC8vUkMgMzM1MDAyODcgOiBTdGF2IHDFmWVldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDI4OFwiLCAvL1JDIDMzNTAwMjg4IDogU3RhdiBwxZllZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQaWQoZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEFnZW5kb3ZlQ2lzbG8oZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfc21sIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEV2aWRlbmNuaUNpc2xvKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZzKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVHlwRG9rbGFkdShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkWnByYWNvdmF0ZWwoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEtvbXBldGVudChnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUmVhbGl6YXRvcihnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkTWVuYShnZiwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5tZW5hX3R4dCB9KTtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYUNaSyAoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEljb1N1Ympla3R1KGdmKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRSY1N1Ympla3R1KGdmKTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDI4OVwiLCAvL1JDIDMzNTAwMjg5IDogUm96cGlzIENaS1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDI4OVwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvY19lcHJpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMjkwXCIsIC8vUkMgMzM1MDAyOTAgOiAjIGVQcmlcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAyOTFcIiwgLy9SQyAzMzUwMDI5MSA6IFBvxI1ldCBlbGVrdHJvbmlja8O9Y2ggcMWZw61sb2hcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDI5MlwiLCAvL1JDIDMzNTAwMjkyIDogUG/FmWFkw60gZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAyOTNcIiwgLy9SQyAzMzUwMDI5MyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMjk0XCIsIC8vUkMgMzM1MDAyOTQgOiBQb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMjk1XCIsIC8vUkMgMzM1MDAyOTUgOiBNxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAyOTZcIiwgLy9SQyAzMzUwMDI5NiA6IE3Em25hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMjk3XCIsIC8vUkMgMzM1MDAyOTcgOiBDZW5hIHNtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMjk4XCIsIC8vUkMgMzM1MDAyOTggOiBDZW5hIHNtbG91dnkgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX2Jlel9kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMjk5XCIsIC8vUkMgMzM1MDAyOTkgOiBDZW5hIGJleiBEUEhcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMjk5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzAwXCIsIC8vUkMgMzM1MDAzMDAgOiBEUEhcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX3NfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMwMVwiLCAvL1JDIDMzNTAwMzAxIDogQ2VuYSBzIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMDFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9jZW55LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMwMlwiLCAvL1JDIDMzNTAwMzAyIDogVHlwIGNlbnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzAzXCIsIC8vUkMgMzM1MDAzMDMgOiBUeXAgY2VueSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwX2NlbnkgPT0gMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwMzA0XCI7IC8vUkMgMzM1MDAzMDQgOiBQZXZuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX2NlbnkgPT0gMjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwMzA1XCI7IC8vUkMgMzM1MDAzMDUgOiBWb2xuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfcHJpal9wb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzA2XCIsIC8vUkMgMzM1MDAzMDYgOiBFdmlkb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMwN1wiLCAvL1JDIDMzNTAwMzA3IDogRXZpZG92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BsYXRub3N0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMDhcIiwgLy9SQyAzMzUwMDMwOCA6IFR5cCBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzA4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfdXphdnJlbmksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzA5XCIsIC8vUkMgMzM1MDAzMDkgOiBVemF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMwOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMxMFwiLCAvL1JDIDMzNTAwMzEwIDogVWtvbsSNZW7DrSBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfdWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzExXCIsIC8vUkMgMzM1MDAzMTEgOiDDmsSNaW5ub3N0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMxMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMTJcIiwgLy9SQyAzMzUwMDMxMiA6IERhdHVtIHBvZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9vZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMTNcIiwgLy9SQyAzMzUwMDMxMyA6IEZpbmFuY292w6Fuw60gb2RcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzEzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9kbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMTRcIiwgLy9SQyAzMzUwMDMxNCA6IEZpbmFuY292w6Fuw60gZG9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzE0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzNDBcIiwgLy9SQyAzMzUwMDM0MCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzNDBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19lc3VfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM0MVwiLCAvL1JDIDMzNTAwMzQxIDogUHJvdGlzdHJhbmFcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzQxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM0MlwiLCAvL1JDIDMzNTAwMzQyIDogUG9sb8W+a3kgRlBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzQyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM0M1wiLCAvL1JDIDMzNTAwMzQzIDogRG9kYXRreVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzNDNcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzNDRcIiwgLy9SQyAzMzUwMDM0NCA6IFByb3Rpc3RyYW5hXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDM0NFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmVzdV9pcixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiSW5zb2x2ZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwiSW5zb2x2ZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmJ1X3Byb3RpdWNldC8qX3R4dCovLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMzOVwiLCAvL1JDIDMzNTAwMzM5IDogQsOaIHByb3Rpc3RyYW55XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMzOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3Nnbl9leHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzM4XCIsIC8vUkMgMzM1MDAzMzggOiBEYXR1bSBwb2RwaXN1IHByb3Rpc3RyYW55XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMzOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMzN1wiLCAvL1JDIDMzNTAwMzM3IDogUmVmZXJlbnRcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzM3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5uYXpldi8qX3NtbCovLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMzNlwiLCAvL1JDIDMzNTAwMzM2IDogw5pwbG7DvSBuw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzM2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzM1XCIsIC8vUkMgMzM1MDAzMzUgOiBTb3V0ZcW+XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMzNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfdmVyX3phayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzNjVcIiwgLy9SQyAzMzUwMDM2NSA6IMSMw61zbG8gVlosIERULCBQT1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzNjVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnVjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM2NlwiLCAvL1JDIDMzNTAwMzY2IDogw5rEjWlubm9zdCAtIGtvbWVudMOhxZlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzY2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzNjdcIiwgLy9SQyAzMzUwMDM2NyA6IFNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzNjdcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19vcmpfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM2OVwiLCAvL1JDIDMzNTAwMzY5IDogT3JnYW5pemHEjW7DrSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzNjlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX2Rva18yLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM3MFwiLCAvL1JDIDMzNTAwMzcwIDogU291dmlzZWrDrWPDrSBkb2t1bWVudCAyXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDM3MVwiLCAvL1JDIDMzNTAwMzcxIDogU291dmlzZWrDrWPDrSBkb2t1bWVudCAyXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzM0XCIsIC8vUkMgMzM1MDAzMzQgOiBEYXR1bSBTRDFcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzM0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5ua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzMzXCIsIC8vUkMgMzM1MDAzMzMgOiBOS1NcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzMzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMzMlwiLCAvL1JDIDMzNTAwMzMyIDogRGF0dW0gU0QyXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2ZhayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMzFcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzMxXCIsIC8vUkMgMzM1MDAzMzEgOiBPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBrcmVkaXR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2Zha19yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzMwXCIsIC8vUkMgMzM1MDAzMzAgOiBPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBwxZnDrXBhZGVtIHYgYWt0LiBvYmQuIENaS1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMzBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfb2JqX3NtbCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMjlcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzI5XCIsIC8vUkMgMzM1MDAzMjkgOiBPYmplZG7DoW5vIFNNTCBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcm9rX3JvayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMjhcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzI4XCIsIC8vUkMgMzM1MDAzMjggOiBSb3pwaXMgcMWZw61wYWR1IHYgYWt0LiBvYmQuIENaS1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19wb2xfcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMyN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMjdcIiwgLy9SQyAzMzUwMDMyNyA6IFBvbG/Fvmt5IEZQIHDFmcOtcGFkdSB2IGFrdC4gb2JkLiBDWktcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gcMWZw61wYWRlbSB2IGFrdC4gb2JkLiBDWktcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIk/EjWVrw6F2YW7DqSDEjWVycMOhbsOtIHDFmcOtcGFkZW0gdiBha3QuIG9iZC4gQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAvL30pICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3p2ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMjZcIiwgLy9SQyAzMzUwMDMyNiA6IERhdHVtIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzI2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMyNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMjVcIiwgLy9SQyAzMzUwMDMyNSA6IFZlxZllam7DoSB6YWvDoXprYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMjRcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzI0XCIsIC8vUkMgMzM1MDAzMjQgOiBUeXAgcG9obGVkw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy4sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlrDoXN0dXBjZSB2bGFzdG7DrSBzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIlrDoXN0dXBjZSB2bGFzdG7DrSBzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJaw6FzdHVwY2UgUHJvdGlzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIlrDoXN0dXBjZSBQcm90aXN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiVlNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIlZTXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3JlZl96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMjNcIiwgLy9SQyAzMzUwMDMyMyA6IFrDoXN0dXBjZSB2bGFzdG7DrSBzdHJhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDMyM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2VzdV96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMjJcIiwgLy9SQyAzMzUwMDMyMiA6IFrDoXN0dXBjZSBQcm90aXN0cmFueVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMjJcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c196dWtfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMyMVwiLCAvL1JDIDMzNTAwMzIxIDogWnDFr3NvYiB1a29uxI1lbsOtO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMjFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91a28sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMzE4XCIsIC8vUkMgMzM1MDAzMTggOiBEYXR1bSB1a29uxI1lbsOtO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMThcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnByaXpfb3BjZSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnByaXpfb3BjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDAzMTlcIjsgLy9SQyAzMzUwMDMxOSA6IE5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzUwMDMyMFwiOyAvL1JDIDMzNTAwMzIwIDogQW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAzMTVcIiwgLy9SQyAzMzUwMDMxNSA6IE1vxb5ub3N0IG9wY2VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMzE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDMxN1wiLCAvL1JDIDMzNTAwMzE3IDogRGF0dW0gcG9kcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzMTdcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgICAgIFtdXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIERlZmlub3bDoW7DrSBuw6F6dsWvIHNsb3VwY8WvIHVyxI1lbsOpIGRvIGdyaWR1IHBybyB2bGFzdG5vc3QgY29sdW1uTGlzdFxyXG4gICAgICAgIHByaXZhdGUgRGVmaW5pdGlvbkNvbHVtbW5zTGlzdEdyaWQyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb2NfZXByaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnNtbF9zdGF2X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4cCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX3NtbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2MsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19iZXpfZHBoLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19kcGgsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX3NfZHBoLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX2NlbnksXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfcHJpal9wb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy50eXBfcGxhdG5vc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3V6YXZyZW5pLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3VjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9vZCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9kbyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3R5cF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19kb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5pY29fZXN1LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucmNfZXN1LFxyXG4gICAgICAgICAgICAgICAgLy9JbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5lc3VfaXIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5idV9wcm90aXVjZXQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX3Z5cml6X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ25fZXh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jaXNfcmVhbF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY192ZXJfemFrLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19vcmpfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5ua3MsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2ZhayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfb2JqX3NtbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcm9rX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZmFrX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF96dmUsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfcHJpLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3JlZl96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19lc3VfemFzdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfenVrX3R4dCxcclxuICAgICAgICAgICAgICAgIC8vSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BobCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3VrbyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ24sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wcml6X29wY2VcclxuXHJcbiAgICAgICAgICAgIF0udG9TdHJpbmcoKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==