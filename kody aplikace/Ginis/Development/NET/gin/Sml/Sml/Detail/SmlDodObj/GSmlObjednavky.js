"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlObjednavky.ts                  </Name>
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
            let GSmlObjednavky = class GSmlObjednavky extends Gordic.GContentBase {
                onContentReady() {
                    this.$gridHlavicky = $("<div>").ggrid({
                        columns: this.createGridFormat(),
                        columnMode: "full",
                        defaultProfile: {
                            columnList: ", ixp, " + this.DefinitionColummnsListGrid2(),
                        },
                        data: new Gordic.Isl.View(Gordic.Isl.Doklady.detailSmlObjDoklad({
                            filters: {
                                ixp_sml: this.model.ixp_sml,
                                ixp_sml_pri: this.model.ixp_sml_pri,
                                typ_dok: this.typ_dok,
                                ktg_sml: this.model.findoc?.ktg_sml,
                                typ_view: this.l_type_dok,
                            },
                            fragments: ["wflspid.*", "*"],
                        })),
                        selection: (ev, ctx) => {
                            debugger;
                            let row = ctx.getSelection();
                            if (row.length > 0) {
                                let ixp = row[0].ixp;
                                //Isl metoda odebrána, protože existuje nová náhrada
                                //this.dataViewPolozky = new Gordic.Isl.View(Gordic.Isl.SmlPolFin.listObjednavky({ filters: { ixp: ixp, } }));
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
                    //Isl metoda odebrána, protože existuje nová náhrada
                    //this.dataViewPolozky = new Gordic.Isl.View(Gordic.Isl.SmlPolFin.listObjednavky({ filters: { ixp: this.model?.ixp, } }));
                    this.$gridPolozky = $("<div>").ggrid({
                        columnMode: "full",
                        //columns: WebClient.Options.columnsFinancovaniPolozkyPrehled(this, this.model.findoc?.ktg_sml ?? -1),
                        //data: this.dataViewPolozky,
                    }).gautofit().appendTo(this.element);
                }
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addTextColumn({
                        name: "sml_stav_txt" /* Interface.GDokladyDtoNames.sml_stav_txt */,
                        caption: "jres:33500096", //RC 33500096 : Stav dokladu
                        description: "jres:33500097", //RC 33500097 : Stav dokladu
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "preevidence" /* Interface.GDokladyDtoNames.preevidence */,
                        caption: "jres:33500098", //RC 33500098 : Stav přeevidence
                        description: "jres:33500099", //RC 33500099 : Stav přeevidence
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
                        caption: "jres:33500100", //RC 33500100 : Rozpis CZK
                        description: "jres:33500101", //RC 33500101 : Rozpis CZK
                        width: 50,
                    });
                    gf.addTextColumn({
                        name: "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        caption: "# ePri",
                        description: "jres:33500102", //RC 33500102 : Počet elektronických příloh
                        width: 50,
                    });
                    gf.addNumberColumn({
                        name: "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        caption: "#",
                        description: "jres:33500103", //RC 33500103 : Pořadí dokumentu
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "popis" /* Interface.GDokladyDtoNames.popis */,
                        caption: "jres:33500104", //RC 33500104 : Popis
                        description: "jres:33500105", //RC 33500105 : Popis dokladu
                        width: 70,
                    })
                        .addTextColumn({
                        name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        caption: "jres:33500106", //RC 33500106 : Měna
                        description: "jres:33500107", //RC 33500107 : Měna dokladu
                        width: 70,
                    })
                        .addTextColumn({
                        name: "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        caption: "jres:33500108", //RC 33500108 : Cena smlouvy
                        description: "jres:33500109", //RC 33500109 : Cena smlouvy dokladu
                        width: 110,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_bez_dph" /* Interface.GDokladyDtoNames.c_mena_doc_bez_dph */,
                        caption: "jres:33500110", //RC 33500110 : Cena bez DPH
                        description: "jres:33500111", //RC 33500111 : Cena bez DPH
                        width: 120,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_dph" /* Interface.GDokladyDtoNames.c_mena_doc_dph */,
                        caption: "jres:33500112", //RC 33500112 : DPH
                        description: "jres:33500112",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_s_dph" /* Interface.GDokladyDtoNames.c_mena_doc_s_dph */,
                        caption: "jres:33500113", //RC 33500113 : Cena s DPH
                        description: "jres:33500113",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "typ_ceny" /* Interface.GDokladyDtoNames.typ_ceny */,
                        caption: "jres:33500114", //RC 33500114 : Typ ceny
                        description: "jres:33500115", //RC 33500115 : Typ ceny dokladu
                        width: 80,
                        cellTemplate: (value) => {
                            if (value.typ_ceny == 10)
                                return "Pevná";
                            else if (value.typ_ceny == 20)
                                return "Volná";
                            else
                                return "";
                        }
                    })
                        .addDateColumn({
                        name: "dat_prij_pod" /* Interface.GDokladyDtoNames.dat_prij_pod */,
                        caption: "jres:33500116", //RC 33500116 : Evidováno
                        description: "jres:33500116",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_platnost_txt" /* Interface.GDokladyDtoNames.typ_platnost_txt */,
                        caption: "jres:33500117", //RC 33500117 : Typ platnosti
                        description: "jres:33500117",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uzavreni" /* Interface.GDokladyDtoNames.dat_uzavreni */,
                        caption: "jres:33500118", //RC 33500118 : Uzavření
                        description: "jres:33500118",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_platnost" /* Interface.GDokladyDtoNames.dat_platnost */,
                        caption: "jres:33500119", //RC 33500119 : Ukončení platnosti
                        description: "jres:33500119",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_ucinnost" /* Interface.GDokladyDtoNames.dat_ucinnost */,
                        caption: "jres:33500120", //RC 33500120 : Účinnost
                        description: "jres:33500120",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "jres:33500121", //RC 33500121 : Datum podpisu
                        description: "jres:33500121",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_od" /* Interface.GDokladyDtoNames.fin_od */,
                        caption: "jres:33500122", //RC 33500122 : Financování od
                        description: "jres:33500122",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_do" /* Interface.GDokladyDtoNames.fin_do */,
                        caption: "jres:33500123", //RC 33500123 : Financování do
                        description: "jres:33500123",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "poznamka" /* Interface.GDokladyDtoNames.poznamka */,
                        caption: "jres:33500124", //RC 33500124 : Poznámka
                        description: "jres:33500124",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "jres:33500125", //RC 33500125 : Protistrana
                        description: "jres:33500125",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_pol" /* Interface.GDokladyDtoNames.c_pol */,
                        caption: "jres:33500126", //RC 33500126 : Položky FP
                        description: "jres:33500127", //RC 33500127 : Položky FP
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_dod" /* Interface.GDokladyDtoNames.c_dod */,
                        caption: "jres:33500128", //RC 33500128 : Dodatky
                        description: "jres:33500128",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "jres:33500129", //RC 33500129 : Protistrana
                        description: "jres:33500129",
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
                        caption: "jres:33500130", //RC 33500130 : BÚ protistrany
                        description: "jres:33500131", //RC 33500131 : BÚ protistrany
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn_ext" /* Interface.GDokladyDtoNames.dat_sgn_ext */,
                        caption: "jres:33500132", //RC 33500132 : Datum podpisu protistrany
                        description: "jres:33500132",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_fun_ref_txt" /* Interface.GDokladyDtoNames.ixs_fun_ref_txt */,
                        caption: "jres:33500133", //RC 33500133 : Referent
                        description: "jres:33500133",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GDokladyDtoNames.nazev */ /*_sml*/,
                        caption: "jres:33500134", //RC 33500134 : Úplný název
                        description: "jres:33500134",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "soutez" /* Interface.GDokladyDtoNames.soutez */,
                        caption: "jres:33500135", //RC 33500135 : Soutež
                        description: "jres:33500135",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */,
                        caption: "jres:33500136", //RC 33500136 : Číslo VZ, DT, PO
                        description: "jres:33500136",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ucinnost" /* Interface.GDokladyDtoNames.ucinnost */,
                        caption: "jres:33500137", //RC 33500137 : Účinnost - komentář
                        description: "jres:33500138", //RC 33500138 : Účinnost - komentář
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_1" /* Interface.GDokladyDtoNames.ac_dok_1 */,
                        caption: "jres:33500139", //RC 33500139 : Související dokument 1
                        description: "jres:33500140", //RC 33500140 : Související dokument 1
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_orj_txt" /* Interface.GDokladyDtoNames.ixs_orj_txt */,
                        caption: "jres:33500141", //RC 33500141 : Organizační jednotka
                        description: "jres:33500142", //RC 33500142 : Organizační jednotka
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_2" /* Interface.GDokladyDtoNames.ac_dok_2 */,
                        caption: "jres:33500143", //RC 33500143 : Související dokument 2
                        description: "jres:33500144", //RC 33500144 : Související dokument 2
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_1" /* Interface.GDokladyDtoNames.dat_dok_1 */,
                        caption: "jres:33500146", //RC 33500146 : Datum SD1
                        description: "jres:33500146",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nks" /* Interface.GDokladyDtoNames.nks */,
                        caption: "jres:33500147", //RC 33500147 : NKS
                        description: "jres:33500147",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_2" /* Interface.GDokladyDtoNames.dat_dok_2 */,
                        caption: "jres:33500148", //RC 33500148 : Datum SD2;
                        description: "jres:33500148",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak" /* Interface.GDokladyDtoNames.c_fak */,
                        caption: "jres:33500149", //RC 33500149 : Očekávané čerpání kreditu.
                        description: "jres:33500149",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak_rok" /* Interface.GDokladyDtoNames.c_fak_rok */,
                        caption: "jres:33500150", //RC 33500150 : Očekávané čerpání případem v akt. obd. CZK
                        description: "jres:33500150",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_obj_sml" /* Interface.GDokladyDtoNames.c_obj_sml */,
                        caption: "jres:33500151", //RC 33500151 : Objednáno SML případu;
                        description: "jres:33500151",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_rok_rok" /* Interface.GDokladyDtoNames.c_rok_rok */,
                        caption: "jres:33500152", //RC 33500152 : Rozpis případu v akt. obd. CZK;
                        description: "jres:33500152",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_pol_rok" /* Interface.GDokladyDtoNames.c_pol_rok */,
                        caption: "jres:33500153", //RC 33500153 : Položky FP případu v akt. obd. CZK;
                        description: "jres:33500153",
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
                        caption: "jres:33500154", //RC 33500154 : Datum zveřejnění;
                        description: "jres:33500154",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_pri" /* Interface.GDokladyDtoNames.ixs_pri */,
                        caption: "jres:33500155", //RC 33500155 : Veřejná zakázka
                        description: "jres:33500155",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_phl" /* Interface.GDokladyDtoNames.typ_phl */,
                        caption: "jres:33500156", //RC 33500156 : Typ pohledávky
                        description: "jres:33500156",
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
                        caption: "jres:33500157", //RC 33500157 : Zástupce vlastní strany;
                        description: "jres:33500157",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_zast_txt" /* Interface.GDokladyDtoNames.ixs_esu_zast_txt */,
                        caption: "jres:33500158", //RC 33500158 : Zástupce Protistrany
                        description: "jres:33500158",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_zuk_txt" /* Interface.GDokladyDtoNames.ixs_zuk_txt */,
                        caption: "jres:33500159", //RC 33500159 : Způsob ukončení
                        description: "jres:33500159",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        caption: "jres:33500160", //RC 33500160 : Datum ukončení;
                        description: "jres:33500160",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */,
                        cellTemplate: (value) => {
                            switch (value.priz_opce) {
                                case 0:
                                    return "Ne";
                                    break;
                                case 1:
                                    return "Ano";
                                    break;
                                default:
                                    return "";
                            }
                        },
                        caption: "jres:33500161", //RC 33500161 : Možnost opce;
                        description: "jres:33500161",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "jres:33500162", //RC 33500162 : Datum podpisu;
                        description: "jres:33500162",
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
            GSmlObjednavky = __decorate([
                gcontent
            ], GSmlObjednavky);
            WebClient.GSmlObjednavky = GSmlObjednavky;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbE9iamVkbmF2a3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU21sT2JqZWRuYXZreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLG1GQUFtRjtBQUNuRiw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQXFpQmY7QUFyaUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFpQm5CO0lBcmlCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcWlCN0I7UUFyaUJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQVNuQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQVM1QyxjQUFjO29CQUVWLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDaEMsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRTs0QkFDWixVQUFVLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRTt5QkFDN0Q7d0JBQ0QsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7NEJBQzVELE9BQU8sRUFBRTtnQ0FDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2dDQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2dDQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0NBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFP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Ozs7Ozs7Ozs7Ozs7Ozs7cUJBaUVOLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBR2pCLENBQUM7YUFDSixDQUFBO1lBMWhCWSxjQUFjO2dCQUQxQixRQUFRO2VBQ0ksY0FBYyxDQTBoQjFCO1lBMWhCWSx3QkFBYyxpQkEwaEIxQixDQUFBO1FBQ0wsQ0FBQyxFQXJpQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXFpQjdCO0lBQUQsQ0FBQyxFQXJpQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFpQm5CO0FBQUQsQ0FBQyxFQXJpQlMsTUFBTSxLQUFOLE1BQU0sUUFxaUJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxPYmplZG5hdmt5LnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgQWRhbSDEjGVybsO9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjEgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMS0wNy0yMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbE9iamVkbmF2a3lJbnB1dFBhcmFtcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sT2JqZWRuYXZreVJldHVyblZhbHVlIHtcclxuICAgIH1cclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sT2JqZWRuYXZreSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWw6IEludGVyZmFjZS5HU21sX0RldGFpbER0b1xyXG4gICAgICAgIHByaXZhdGUgdHlwX2RvazogbnVtYmVyXHJcbiAgICAgICAgcHJpdmF0ZSBsX3R5cGVfZG9rOiBudW1iZXJcclxuICAgICAgICBwcml2YXRlICRncmlkSGxhdmlja3k6IEpRdWVyeTxIVE1MRWxlbWVudD5cclxuICAgICAgICBwcml2YXRlICRncmlkUG9sb3preTogSlF1ZXJ5PEhUTUxFbGVtZW50PlxyXG4gICAgICAgIGRhdGFWaWV3UG9sb3preTogSXNsLlZpZXc8YW55LCBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPEludGVyZmFjZS5HU21sc2VzdUR0bz4+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWRIbGF2aWNreSA9ICQoXCI8ZGl2PlwiKS5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIiwgaXhwLCBcIiArIHRoaXMuRGVmaW5pdGlvbkNvbHVtbW5zTGlzdEdyaWQyKCksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLkRva2xhZHkuZGV0YWlsU21sT2JqRG9rbGFkKHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9zbWw6IHRoaXMubW9kZWwuaXhwX3NtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3NtbF9wcmk6IHRoaXMubW9kZWwuaXhwX3NtbF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9kb2s6IHRoaXMudHlwX2RvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3NtbDogdGhpcy5tb2RlbC5maW5kb2M/Lmt0Z19zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF92aWV3OiB0aGlzLmxfdHlwZV9kb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIndmbHNwaWQuKlwiLCBcIipcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBjdHguZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpeHAgPSByb3dbMF0uaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0lzbCBtZXRvZGEgb2RlYnLDoW5hLCBwcm90b8W+ZSBleGlzdHVqZSBub3bDoSBuw6FocmFkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YVZpZXdQb2xvemt5ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLlNtbFBvbEZpbi5saXN0T2JqZWRuYXZreSh7IGZpbHRlcnM6IHsgaXhwOiBpeHAsIH0gfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkUG9sb3preS5nZ3JpZChcInNldERhdGFcIiwgdGhpcy5kYXRhVmlld1BvbG96a3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgLy9vYnNsdXpuYSBha2NlLCBrdGVyYSBzZSBzcG91c3RpIGRibCBjbGlja2VtIG5hZCByYWRrZW1cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy4kZ3JpZEhsYXZpY2t5LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd1swXS5peHAgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZ3MuR1NtbERldGFpbE9wZW5EbGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rva2xhZHU6IHJvd1swXS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdyaWQ6IHRoaXMuJGdyaWRIbGF2aWNreSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKG8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG5cclxuICAgICAgICAgICAgfSkuZ2F1dG9maXQoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgLy9Jc2wgbWV0b2RhIG9kZWJyw6FuYSwgcHJvdG/FvmUgZXhpc3R1amUgbm92w6EgbsOhaHJhZGFcclxuICAgICAgICAgICAgLy90aGlzLmRhdGFWaWV3UG9sb3preSA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5TbWxQb2xGaW4ubGlzdE9iamVkbmF2a3koeyBmaWx0ZXJzOiB7IGl4cDogdGhpcy5tb2RlbD8uaXhwLCB9IH0pKTtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZFBvbG96a3kgPSAkKFwiPGRpdj5cIikuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAvL2NvbHVtbnM6IFdlYkNsaWVudC5PcHRpb25zLmNvbHVtbnNGaW5hbmNvdmFuaVBvbG96a3lQcmVobGVkKHRoaXMsIHRoaXMubW9kZWwuZmluZG9jPy5rdGdfc21sID8/IC0xKSxcclxuICAgICAgICAgICAgICAgIC8vZGF0YTogdGhpcy5kYXRhVmlld1BvbG96a3ksXHJcblxyXG4gICAgICAgICAgICB9KS5nYXV0b2ZpdCgpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEb2tsYWR5RHRvPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zbWxfc3Rhdl90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAwOTZcIiwgLy9SQyAzMzUwMDA5NiA6IFN0YXYgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDA5N1wiLCAvL1JDIDMzNTAwMDk3IDogU3RhdiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnByZWV2aWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMDk4XCIsIC8vUkMgMzM1MDAwOTggOiBTdGF2IHDFmWVldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDA5OVwiLCAvL1JDIDMzNTAwMDk5IDogU3RhdiBwxZllZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQaWQoZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEFnZW5kb3ZlQ2lzbG8oZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfc21sIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEV2aWRlbmNuaUNpc2xvKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZzKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVHlwRG9rbGFkdShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkWnByYWNvdmF0ZWwoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEtvbXBldGVudChnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUmVhbGl6YXRvcihnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkTWVuYShnZiwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5tZW5hX3R4dCB9KTtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYUNaSyAoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEljb1N1Ympla3R1KGdmKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRSY1N1Ympla3R1KGdmKTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEwMFwiLCAvL1JDIDMzNTAwMTAwIDogUm96cGlzIENaS1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDEwMVwiLCAvL1JDIDMzNTAwMTAxIDogUm96cGlzIENaS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvY19lcHJpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjIGVQcmlcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMDJcIiwgLy9SQyAzMzUwMDEwMiA6IFBvxI1ldCBlbGVrdHJvbmlja8O9Y2ggcMWZw61sb2hcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDEwM1wiLCAvL1JDIDMzNTAwMTAzIDogUG/FmWFkw60gZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMDRcIiwgLy9SQyAzMzUwMDEwNCA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTA1XCIsIC8vUkMgMzM1MDAxMDUgOiBQb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTA2XCIsIC8vUkMgMzM1MDAxMDYgOiBNxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMDdcIiwgLy9SQyAzMzUwMDEwNyA6IE3Em25hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTA4XCIsIC8vUkMgMzM1MDAxMDggOiBDZW5hIHNtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTA5XCIsIC8vUkMgMzM1MDAxMDkgOiBDZW5hIHNtbG91dnkgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX2Jlel9kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTEwXCIsIC8vUkMgMzM1MDAxMTAgOiBDZW5hIGJleiBEUEhcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTExXCIsIC8vUkMgMzM1MDAxMTEgOiBDZW5hIGJleiBEUEhcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX2RwaCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMTJcIiwgLy9SQyAzMzUwMDExMiA6IERQSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMTJcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2Nfc19kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTEzXCIsIC8vUkMgMzM1MDAxMTMgOiBDZW5hIHMgRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDExM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX2NlbnksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTE0XCIsIC8vUkMgMzM1MDAxMTQgOiBUeXAgY2VueVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMTVcIiwgLy9SQyAzMzUwMDExNSA6IFR5cCBjZW55IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBfY2VueSA9PSAxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlBldm7DoVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZS50eXBfY2VueSA9PSAyMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlZvbG7DoVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9wcmlqX3BvZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMTZcIiwgLy9SQyAzMzUwMDExNiA6IEV2aWRvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTE2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy50eXBfcGxhdG5vc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDExN1wiLCAvL1JDIDMzNTAwMTE3IDogVHlwIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMTdcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91emF2cmVuaSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMThcIiwgLy9SQyAzMzUwMDExOCA6IFV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTE4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfcGxhdG5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTE5XCIsIC8vUkMgMzM1MDAxMTkgOiBVa29uxI1lbsOtIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMTlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91Y2lubm9zdCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMjBcIiwgLy9SQyAzMzUwMDEyMCA6IMOaxI1pbm5vc3RcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEyMVwiLCAvL1JDIDMzNTAwMTIxIDogRGF0dW0gcG9kcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMjFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZmluX29kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEyMlwiLCAvL1JDIDMzNTAwMTIyIDogRmluYW5jb3bDoW7DrSBvZFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMjJcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZmluX2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEyM1wiLCAvL1JDIDMzNTAwMTIzIDogRmluYW5jb3bDoW7DrSBkb1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMjNcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEyNFwiLCAvL1JDIDMzNTAwMTI0IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDEyNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2VzdV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTI1XCIsIC8vUkMgMzM1MDAxMjUgOiBQcm90aXN0cmFuYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMjVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTI2XCIsIC8vUkMgMzM1MDAxMjYgOiBQb2xvxb5reSBGUFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMjdcIiwgLy9SQyAzMzUwMDEyNyA6IFBvbG/Fvmt5IEZQXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEyOFwiLCAvL1JDIDMzNTAwMTI4IDogRG9kYXRreVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMjhcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMjlcIiwgLy9SQyAzMzUwMDEyOSA6IFByb3Rpc3RyYW5hXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDEyOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmVzdV9pcixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiSW5zb2x2ZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwiSW5zb2x2ZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmJ1X3Byb3RpdWNldC8qX3R4dCovLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEzMFwiLCAvL1JDIDMzNTAwMTMwIDogQsOaIHByb3Rpc3RyYW55XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDEzMVwiLCAvL1JDIDMzNTAwMTMxIDogQsOaIHByb3Rpc3RyYW55XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duX2V4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMzJcIiwgLy9SQyAzMzUwMDEzMiA6IERhdHVtIHBvZHBpc3UgcHJvdGlzdHJhbnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX3JlZl90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTMzXCIsIC8vUkMgMzM1MDAxMzMgOiBSZWZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMzNcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLm5hemV2Lypfc21sKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTM0XCIsIC8vUkMgMzM1MDAxMzQgOiDDmnBsbsO9IG7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMzRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnNvdXRleixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMzVcIiwgLy9SQyAzMzUwMDEzNSA6IFNvdXRlxb5cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTM1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY192ZXJfemFrLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDEzNlwiLCAvL1JDIDMzNTAwMTM2IDogxIzDrXNsbyBWWiwgRFQsIFBPXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDEzNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTM3XCIsIC8vUkMgMzM1MDAxMzcgOiDDmsSNaW5ub3N0IC0ga29tZW50w6HFmVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxMzhcIiwgLy9SQyAzMzUwMDEzOCA6IMOaxI1pbm5vc3QgLSBrb21lbnTDocWZXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxMzlcIiwgLy9SQyAzMzUwMDEzOSA6IFNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNDBcIiwgLy9SQyAzMzUwMDE0MCA6IFNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX29yal90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTQxXCIsIC8vUkMgMzM1MDAxNDEgOiBPcmdhbml6YcSNbsOtIGplZG5vdGthXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE0MlwiLCAvL1JDIDMzNTAwMTQyIDogT3JnYW5pemHEjW7DrSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTQzXCIsIC8vUkMgMzM1MDAxNDMgOiBTb3V2aXNlasOtY8OtIGRva3VtZW50IDJcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTQ0XCIsIC8vUkMgMzM1MDAxNDQgOiBTb3V2aXNlasOtY8OtIGRva3VtZW50IDJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9kb2tfMSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNDZcIiwgLy9SQyAzMzUwMDE0NiA6IERhdHVtIFNEMVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNDZcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNDdcIiwgLy9SQyAzMzUwMDE0NyA6IE5LU1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNDdcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9kb2tfMixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNDhcIiwgLy9SQyAzMzUwMDE0OCA6IERhdHVtIFNEMjtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTQ4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2ZhayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNDlcIiwgLy9SQyAzMzUwMDE0OSA6IE/EjWVrw6F2YW7DqSDEjWVycMOhbsOtIGtyZWRpdHUuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE0OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19mYWtfcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE1MFwiLCAvL1JDIDMzNTAwMTUwIDogT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gcMWZw61wYWRlbSB2IGFrdC4gb2JkLiBDWktcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTUwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX29ial9zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTUxXCIsIC8vUkMgMzM1MDAxNTEgOiBPYmplZG7DoW5vIFNNTCBwxZnDrXBhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE1MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19yb2tfcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE1MlwiLCAvL1JDIDMzNTAwMTUyIDogUm96cGlzIHDFmcOtcGFkdSB2IGFrdC4gb2JkLiBDWks7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE1MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19wb2xfcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE1M1wiLCAvL1JDIDMzNTAwMTUzIDogUG9sb8W+a3kgRlAgcMWZw61wYWR1IHYgYWt0LiBvYmQuIENaSztcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTUzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy4sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIk/EjWVrw6F2YW7DqSDEjWVycMOhbsOtIHDFmcOtcGFkZW0gdiBha3QuIG9iZC4gQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBwxZnDrXBhZGVtIHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KSAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF96dmUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTU0XCIsIC8vUkMgMzM1MDAxNTQgOiBEYXR1bSB6dmXFmWVqbsSbbsOtO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNTRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTU1XCIsIC8vUkMgMzM1MDAxNTUgOiBWZcWZZWpuw6EgemFrw6F6a2FcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTU1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE1NlwiLCAvL1JDIDMzNTAwMTU2IDogVHlwIHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE1NlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiWsOhc3R1cGNlIHZsYXN0bsOtIHN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwiWsOhc3R1cGNlIHZsYXN0bsOtIHN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy4sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlrDoXN0dXBjZSBQcm90aXN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwiWsOhc3R1cGNlIFByb3Rpc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJWU1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwiVlNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfcmVmX3phc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE1N1wiLCAvL1JDIDMzNTAwMTU3IDogWsOhc3R1cGNlIHZsYXN0bsOtIHN0cmFueTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTU3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3phc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE1OFwiLCAvL1JDIDMzNTAwMTU4IDogWsOhc3R1cGNlIFByb3Rpc3RyYW55XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE1OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3p1a190eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTU5XCIsIC8vUkMgMzM1MDAxNTkgOiBacMWvc29iIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTU5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfdWtvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE2MFwiLCAvL1JDIDMzNTAwMTYwIDogRGF0dW0gdWtvbsSNZW7DrTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTYwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wcml6X29wY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5wcml6X29wY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkFub1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTYxXCIsIC8vUkMgMzM1MDAxNjEgOiBNb8W+bm9zdCBvcGNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNjFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ24sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTYyXCIsIC8vUkMgMzM1MDAxNjIgOiBEYXR1bSBwb2RwaXN1O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNjJcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgICAgIFtdXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIERlZmlub3bDoW7DrSBuw6F6dsWvIHNsb3VwY8WvIHVyxI1lbsOpIGRvIGdyaWR1IHBybyB2bGFzdG5vc3QgY29sdW1uTGlzdFxyXG4gICAgICAgIHByaXZhdGUgRGVmaW5pdGlvbkNvbHVtbW5zTGlzdEdyaWQyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb2NfZXByaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnNtbF9zdGF2X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4cCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX3NtbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2MsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19iZXpfZHBoLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19kcGgsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX3NfZHBoLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX2NlbnksXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfcHJpal9wb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy50eXBfcGxhdG5vc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3V6YXZyZW5pLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3VjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9vZCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9kbyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3R5cF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19kb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5pY29fZXN1LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucmNfZXN1LFxyXG4gICAgICAgICAgICAgICAgLy9JbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5lc3VfaXIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5idV9wcm90aXVjZXQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX3Z5cml6X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ25fZXh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jaXNfcmVhbF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY192ZXJfemFrLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19vcmpfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5ua3MsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2ZhayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfb2JqX3NtbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcm9rX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZmFrX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF96dmUsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfcHJpLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3JlZl96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19lc3VfemFzdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfenVrX3R4dCxcclxuICAgICAgICAgICAgICAgIC8vSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BobCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3VrbyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ24sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wcml6X29wY2VcclxuXHJcbiAgICAgICAgICAgIF0udG9TdHJpbmcoKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==