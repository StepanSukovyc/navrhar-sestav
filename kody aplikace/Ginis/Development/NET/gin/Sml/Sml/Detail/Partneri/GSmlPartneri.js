"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPartneri.ts                              </Name>
//    <Description> Záložka content - Partneři                                  </Description>
//    <Author>      Adam Černý                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-04                                                  </Created>
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
            let GSmlPartneri = class GSmlPartneri extends Gordic.GContentBase {
                onContentReady() {
                    //Vytvoření gridu
                    this._createGrid();
                }
                //Vytvoření gridu
                _createGrid() {
                    let tab = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: "subPartneri",
                        title: "Partneři",
                        menuBar: this.createMenuForPartneri(),
                        opened: true,
                    });
                    //Naplnění gridu - data
                    this.dataGridView = new Gordic.Isl.View(Gordic.Isl.Smlsesu.list({ filters: { ixp: this.model?.ixp, ixp_sml_pri: this.model?.ixp_sml_pri, aktivita: 100 } }));
                    if (this.model?.ixp_sml_pri != undefined)
                        if (this.model?.ixp_sml_pri?.length > 0)
                            this.$grid = $("<div>")
                                .appendTo(tab)
                                .ggrid({
                                columnMode: "full",
                                data: this.dataGridView,
                                multi: true,
                                defaultProfile: {
                                    columnList: this.createProfilSloupecGridPartner(),
                                },
                                contextMenu: this.vytvorContextoveMenu(),
                                scrollHelperTemplate: "<h1>{ac_sml:letter}</h1>",
                                columns: this.createDefiniceChovaniSloupecuGridPartner(),
                                selection: (ev, ctx) => {
                                    let row = ctx.getSelection();
                                    const actions = this.actions.getActions();
                                    if (row.length > 0)
                                        if (row[0].typ_vazby == 2) {
                                            actions.find(x => x.name == "editPartner")?.enabled(false);
                                            actions.find(x => x.name == "deletePartner")?.enabled(false);
                                        }
                                        else {
                                            actions.find(x => x.name == "editPartner")?.enabled(true);
                                            actions.find(x => x.name == "deletePartner")?.enabled(true);
                                        }
                                }
                            });
                    //Změna hodnoty v badge v oušku - vyvolám trigger s hodnotou a na parentu content si to už obstará
                    this.dataGridView.getLoadingPromise().then(() => {
                        this.element.trigger("updateBadgePocetPartneru", { value: this.dataGridView.getCount().toString() });
                    });
                }
                //Vytvoření menu pro partneri - nový, upravit, detail, smazat 
                createMenuForPartneri() {
                    const that = this;
                    //Horní menu
                    const menuBarPole = [];
                    menuBarPole.push({
                        action: this.actions.add(new GAction(({
                            name: "newPartner",
                            icon: "fa-plus",
                            caption: "jres:33500174", //RC 33500174 : Nový
                            tooltip: "jres:33500173", //RC 33500173 : Nový partner
                            run: () => {
                                Gordic.Sml.Dialogs.GSmlPartneriNewDlg({
                                    parentContent: this,
                                    opt: { Ixp: this.model.ixp ?? "", GSmlsesuDto: null, Ixp_Sml_Pri: this.model?.ixp_sml_pri ?? "", Ktg_Sml: this.model?.findoc?.ktg_sml ?? -1 },
                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                }).done((returnValue) => {
                                    if (returnValue?.ulozeno) {
                                        if (Gordic.Utils.WidgetExists("ggrid", this.$grid)) {
                                            this.dataGridView.requestData();
                                            setTimeout(() => {
                                                this.element.trigger("updateBadgePocetPartneru", { value: this.dataGridView.getCount().toString() });
                                            }, 500);
                                        }
                                    }
                                });
                            },
                        }))),
                        favorite: true
                    });
                    menuBarPole.push({
                        action: this.actions.add(new GAction(({
                            name: "editPartner",
                            icon: "gi-pencil",
                            caption: "jres:33500172", //RC 33500172 : Upravit
                            tooltip: "jres:33500171", //RC 33500171 : Upravit partnera
                            run: () => {
                                let selectedRow = this.$grid.ggrid("getSelection");
                                Gordic.Sml.Dialogs.GSmlPartneriNewDlg({
                                    parentContent: this,
                                    opt: {
                                        Ixp: this.model.ixp ?? "",
                                        GSmlsesuDto: selectedRow[0],
                                        Ixp_Sml_Pri: this.model?.ixp_sml_pri ?? "",
                                        Ktg_Sml: this.model?.findoc?.ktg_sml ?? -1
                                    }
                                }).done((returnValue) => {
                                    if (returnValue?.ulozeno) {
                                        if (Gordic.Utils.WidgetExists("ggrid", this.$grid)) {
                                            this.dataGridView.requestData();
                                            setTimeout(() => {
                                                //this.BadgePocetDodavatelu.update({ value: this.dataGridView.getCount().toString() });
                                                this.element.trigger("updateBadgePocetPartneru", { value: this.dataGridView.getCount().toString() });
                                            }, 500);
                                        }
                                    }
                                });
                            },
                        }))),
                        favorite: true
                    });
                    menuBarPole.push({
                        action: this.actions.add(new GAction(({
                            name: "detailPartner",
                            icon: "gi-detail",
                            caption: "jres:33500170", //RC 33500170 : Detail
                            tooltip: "jres:33500169", //RC 33500169 : Detail partnera
                            run: () => {
                                let selectedRow = this.$grid.ggrid("getSelection");
                                if (selectedRow != null)
                                    Gordic.Esu.Dialogs.DetailEsuDlg(this, {
                                        IxsEsu: selectedRow[0].ixs_esu ?? "",
                                        Ucel: 1,
                                        Logovani: {
                                            Ixp: this.model.ixp ?? "",
                                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                                            AktZnacka: ""
                                        },
                                        LzePrepnoutZDetailuNaEditaci: false
                                    });
                            },
                        }))),
                        favorite: true
                    });
                    menuBarPole.push({
                        action: this.actions.add(new GAction(({
                            name: "deletePartner",
                            icon: "gi-bin",
                            caption: "jres:33500165", //RC 33500165 : Smazat
                            tooltip: "jres:33500163", //RC 33500163 : Smazat partnera
                            run: () => {
                                let selectedRow = this.$grid.ggrid("getSelection");
                                let onClose = true;
                                const closingDeff = $.Deferred();
                                that.dialogs.messageBox("jres:33500167", //RC 33500167 : Dotaz
                                "jres:33500166:" //RC 33500166 : Opravdu chcete partnera
                                    + selectedRow[0].nazev +
                                    "jres:33500168: " + selectedRow[0].ac_sml, //RC 33500168 : odebrat u dokladu
                                GDlg.mbbYesNo, GDlg.mbiQuestion)
                                    .on("yes", () => {
                                    this.beginOperation();
                                    Gordic.Isl.Smlsesu.delete({ data: { ixp: selectedRow[0].ixp, aktivita: 500 } })
                                        .getData().done(() => {
                                        if (Gordic.Utils.WidgetExists("ggrid", this.$grid))
                                            this.dataGridView.requestData();
                                    }).always(() => { this.endOperation(); });
                                })
                                    .on("no", () => {
                                    onClose = false;
                                    closingDeff.reject();
                                })
                                    .on("close", () => {
                                    if (onClose === true) {
                                        closingDeff.reject();
                                    }
                                });
                            },
                        }))),
                        favorite: true
                    });
                    return menuBarPole;
                }
                //Vytvoření kontextového menu pro grid
                vytvorContextoveMenu() {
                    const menuBarPole = [];
                    const actions = this.actions.getActions();
                    menuBarPole.push({ action: actions.find(x => x.name == "newPartner") });
                    menuBarPole.push({ action: actions.find(x => x.name == "editPartner") });
                    menuBarPole.push({ action: actions.find(x => x.name == "detailPartner") });
                    menuBarPole.push({ action: actions.find(x => x.name == "deletePartner") });
                    return menuBarPole;
                }
                //Sloupečky
                createColumns() {
                    let columns = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "rok",
                        caption: "jres:33500090", //RC 33500090 : Rok
                        description: "jres:33500090",
                    })
                        .addTextColumn({
                        name: "nks",
                        caption: "jres:33500091", //RC 33500091 : NS
                        description: "jres:33500092", //RC 33500092 : Nákladové středisko
                    })
                        .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, {
                        isRoz: true, //patri k rozpoctu 
                        isUct: false, //patri do ucetnictvi                        
                    }))
                        .addTextColumn({
                        name: "c_12",
                        caption: "jres:33500093", //RC 33500093 : BLOKOVÁNO
                        description: "jres:33500093",
                    })
                        .addTextColumn({
                        name: "c_vz_sml",
                        caption: "jres:33500094", //RC 33500094 : NASMLOUVÁNO BLK
                        description: "jres:33500094",
                    })
                        .addTextColumn({
                        name: "c_18",
                        caption: "jres:33500095", //RC 33500095 : REZERVACE SML, OBJ
                        description: "jres:33500095",
                    });
                    return columns;
                }
                //Profil sloupců pro partnery
                createProfilSloupecGridPartner() {
                    return [
                        "typ_vazby" /* Interface.GSmlsesuDtoNames.typ_vazby */, // Typ vazby partnera k dokladu
                        "ico_esu" /* Interface.GSmlsesuDtoNames.ico_esu */, // Ičo partnera
                        "ixs_esu" /* Interface.GSmlsesuDtoNames.ixs_esu */,
                        "bank_ucet" /* Interface.GSmlsesuDtoNames.bank_ucet */,
                        "GinsEsu" /* Interface.GSmlsesuDtoNames.GinsEsu */ + "." + "nazev" /* Interface.GGinsesuDtoNames.nazev */, // Název partnera 
                        "ixs_esu_zast_txt" /* Interface.GSmlsesuDtoNames.ixs_esu_zast_txt */, // Jméno a přijmení zastoupeného partnera
                        "aktivita" /* Interface.GSmlsesuDtoNames.aktivita */, // Aktivita partnera
                    ].toString();
                }
                //Definice sloupců pro partneri
                createDefiniceChovaniSloupecuGridPartner() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addNumberColumn({
                        name: "typ_vazby" /* Interface.GSmlsesuDtoNames.typ_vazby */,
                        caption: "jres:33500182", //RC 33500182 : Typ
                        description: "jres:33500183", //RC 33500183 : Typ partnera
                        cellTemplate: (value) => {
                            if (value.typ_vazby == 0)
                                return "jres:33500358"; //RC 33500358 : Obecná vazba
                            else if (value.typ_vazby == 2)
                                return "jres:33500359"; //RC 33500359 : Primární subjekt
                            else if (value.typ_vazby == 10)
                                return "jres:33500360"; //RC 33500360 : Dílčí dodavatel
                            else if (value.typ_vazby == 20)
                                return "jres:33500361"; //RC 33500361 : Dílčí odběratel
                            else if (value.typ_vazby == 30)
                                return "Dotčený orgán ve SŘ";
                            else if (value.typ_vazby == 40)
                                return "účastník ve SŘ dle §27, odst.1";
                            else if (value.typ_vazby == 50)
                                return "zástupce";
                            else if (value.typ_vazby == 60)
                                return "ostatní subjekt ve SŘ";
                            else if (value.typ_vazby == 70)
                                return "soudní orgán";
                            else if (value.typ_vazby == 80)
                                return "účastník ve SŘ dle §27, odst.2";
                            else if (value.typ_vazby == 90)
                                return "Adresa pro výplatu";
                            else if (value.typ_vazby == 100)
                                return "Součinnost pro exekuce";
                            else if (value.typ_vazby == 110)
                                return "Žadatel o dotaci dle zákona č. 108/2006 Sb";
                            else if (value.typ_vazby == 120)
                                return "Konečný příjemce";
                            else
                                return value.typ_vazby != undefined ? value.typ_vazby.toString() : "";
                        },
                        width: 120,
                    });
                    gf.addTextColumn({
                        name: "ico_esu" /* Interface.GSmlsesuDtoNames.ico_esu */,
                        caption: "jres:33500181", //RC 33500181 : ICO
                        description: "jres:33500180", //RC 33500180 : ICO
                        width: 80,
                    });
                    gf.addTextColumn({
                        name: "GinsEsu" /* Interface.GSmlsesuDtoNames.GinsEsu */ + "." + "nazev" /* Interface.GGinsesuDtoNames.nazev */,
                        caption: "jres:33500179", //RC 33500179 : Název
                        fragment: "GinsEsu.*",
                        description: "jres:33500178", //RC 33500178 : Název partnera
                        width: 200,
                    });
                    gf.addTextColumn({
                        name: "ixs_esu_zast_txt" /* Interface.GSmlsesuDtoNames.ixs_esu_zast_txt */,
                        caption: "jres:33500362", //RC 33500362 : Zastoupený
                        description: "jres:33500363", //RC 33500363 : Zastoupený partnera
                        width: 150,
                    });
                    gf.addNumberColumn({
                        name: "aktivita" /* ControlsLogic.Interface.GReaderGinsesuDtoNames.aktivita */,
                        caption: "jres:33500177", //RC 33500177 : Aktivita
                        description: "jres:33500176", //RC 33500176 : Aktivita partnera
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "bank_ucet" /* Interface.GSmlsesuDtoNames.bank_ucet */,
                        caption: "jres:33500175", //RC 33500175 : Bankovní účet
                        width: 100,
                    });
                    return gf;
                }
            };
            GSmlPartneri = __decorate([
                gcontent
            ], GSmlPartneri);
            WebClient.GSmlPartneri = GSmlPartneri;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBhcnRuZXJpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbFBhcnRuZXJpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsNkZBQTZGO0FBQzdGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFLakIsSUFBVSxNQUFNLENBZ1lmO0FBaFlELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdZbkI7SUFoWWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdZN0I7UUFoWW9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBU25DLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxPQUFBLFlBQVk7Z0JBUTFDLGNBQWM7b0JBQ1YsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRXZCLENBQUM7Z0JBRUQsaUJBQWlCO2dCQUNqQixXQUFXO29CQUVQLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7eUJBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLElBQUksQ0FBQzt3QkFDRixFQUFFLEVBQUUsYUFBYTt3QkFDakIsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUU7d0JBQ3JDLE1BQU0sRUFBRSxJQUFJO3FCQUVmLENBQUMsQ0FBQztvQkFHUCx1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFF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Oi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFBhcnRuZXJpLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFrDoWxvxb5rYSBjb250ZW50IC0gUGFydG5lxZlpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgQWRhbSDEjGVybsO9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMi0wMy0wNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sUGFydG5lcmlJbnB1dFBhcmFtcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sUGFydG5lcmlSZXR1cm5WYWx1ZSB7XHJcbiAgICB9XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbFBhcnRuZXJpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvL01vZGVsXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbDogSW50ZXJmYWNlLkdTbWxfRGV0YWlsRHRvXHJcbiAgICAgICAgLy9EYXRhIGdyaWRcclxuICAgICAgICBkYXRhR3JpZFZpZXc6IElzbC5WaWV3PGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxJbnRlcmZhY2UuR1NtbGRwb2xEdG8+PjtcclxuICAgICAgICAvL0dyaWRcclxuICAgICAgICAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIC8vVnl0dm/FmWVuw60gZ3JpZHVcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlR3JpZCgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVnl0dm/FmWVuw60gZ3JpZHVcclxuICAgICAgICBfY3JlYXRlR3JpZCgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0YWIgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3ViUGFydG5lcmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQYXJ0bmXFmWlcIixcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiB0aGlzLmNyZWF0ZU1lbnVGb3JQYXJ0bmVyaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL05hcGxuxJtuw60gZ3JpZHUgLSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUdyaWRWaWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLlNtbHNlc3UubGlzdCh7IGZpbHRlcnM6IHsgaXhwOiB0aGlzLm1vZGVsPy5peHAsIGl4cF9zbWxfcHJpOiB0aGlzLm1vZGVsPy5peHBfc21sX3ByaSwgYWt0aXZpdGE6IDEwMCB9IH0pKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWw/Lml4cF9zbWxfcHJpICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsPy5peHBfc21sX3ByaT8ubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR1NtbEVzdUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGFHcmlkVmlldyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiB0aGlzLmNyZWF0ZVByb2ZpbFNsb3VwZWNHcmlkUGFydG5lcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLnZ5dHZvckNvbnRleHRvdmVNZW51KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCI8aDE+e2FjX3NtbDpsZXR0ZXJ9PC9oMT5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlRGVmaW5pY2VDaG92YW5pU2xvdXBlY3VHcmlkUGFydG5lcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIGN0eCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gY3R4LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZ2V0QWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd1swXS50eXBfdmF6YnkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5maW5kKHggPT4geC5uYW1lID09IFwiZWRpdFBhcnRuZXJcIik/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5maW5kKHggPT4geC5uYW1lID09IFwiZGVsZXRlUGFydG5lclwiKT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmZpbmQoeCA9PiB4Lm5hbWUgPT0gXCJlZGl0UGFydG5lclwiKT8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PSBcImRlbGV0ZVBhcnRuZXJcIik/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1ptxJtuYSBob2Rub3R5IHYgYmFkZ2UgdiBvdcWha3UgLSB2eXZvbMOhbSB0cmlnZ2VyIHMgaG9kbm90b3UgYSBuYSBwYXJlbnR1IGNvbnRlbnQgc2kgdG8gdcW+IG9ic3RhcsOhXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUdyaWRWaWV3LmdldExvYWRpbmdQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInVwZGF0ZUJhZGdlUG9jZXRQYXJ0bmVydVwiLCB7IHZhbHVlOiB0aGlzLmRhdGFHcmlkVmlldy5nZXRDb3VudCgpLnRvU3RyaW5nKCkgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9WeXR2b8WZZW7DrSBtZW51IHBybyBwYXJ0bmVyaSAtIG5vdsO9LCB1cHJhdml0LCBkZXRhaWwsIHNtYXphdCBcclxuICAgICAgICBjcmVhdGVNZW51Rm9yUGFydG5lcmkoKTogIE1lbnVQYXJhbXNbXSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9Ib3Juw60gbWVudVxyXG4gICAgICAgICAgICBjb25zdCBtZW51QmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBtZW51QmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbigoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5ld1BhcnRuZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE3NFwiLCAvL1JDIDMzNTAwMTc0IDogTm92w71cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNTAwMTczXCIsIC8vUkMgMzM1MDAxNzMgOiBOb3bDvSBwYXJ0bmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5TbWwuRGlhbG9ncy5HU21sUGFydG5lcmlOZXdEbGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7IEl4cDogdGhpcy5tb2RlbC5peHAgPz8gXCJcIiwgR1NtbHNlc3VEdG86IG51bGwsIEl4cF9TbWxfUHJpOiB0aGlzLm1vZGVsPy5peHBfc21sX3ByaSA/PyBcIlwiLCBLdGdfU21sOiB0aGlzLm1vZGVsPy5maW5kb2M/Lmt0Z19zbWwgPz8gLTEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKHJldHVyblZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlPy51bG96ZW5vKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdncmlkXCIsIHRoaXMuJGdyaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFHcmlkVmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoXCJ1cGRhdGVCYWRnZVBvY2V0UGFydG5lcnVcIiwgeyB2YWx1ZTogdGhpcy5kYXRhR3JpZFZpZXcuZ2V0Q291bnQoKS50b1N0cmluZygpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkpKSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbWVudUJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlZGl0UGFydG5lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNzJcIiwgLy9SQyAzMzUwMDE3MiA6IFVwcmF2aXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNTAwMTcxXCIsIC8vUkMgMzM1MDAxNzEgOiBVcHJhdml0IHBhcnRuZXJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUm93ID0gdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5TbWwuRGlhbG9ncy5HU21sUGFydG5lcmlOZXdEbGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5tb2RlbC5peHAgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR1NtbHNlc3VEdG86IHNlbGVjdGVkUm93WzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBfU21sX1ByaTogdGhpcy5tb2RlbD8uaXhwX3NtbF9wcmkgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgS3RnX1NtbDogdGhpcy5tb2RlbD8uZmluZG9jPy5rdGdfc21sID8/IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZG9uZSgocmV0dXJuVmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWU/LnVsb3plbm8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2dyaWRcIiwgdGhpcy4kZ3JpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUdyaWRWaWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuQmFkZ2VQb2NldERvZGF2YXRlbHUudXBkYXRlKHsgdmFsdWU6IHRoaXMuZGF0YUdyaWRWaWV3LmdldENvdW50KCkudG9TdHJpbmcoKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInVwZGF0ZUJhZGdlUG9jZXRQYXJ0bmVydVwiLCB7IHZhbHVlOiB0aGlzLmRhdGFHcmlkVmlldy5nZXRDb3VudCgpLnRvU3RyaW5nKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSkpLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtZW51QmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbigoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRldGFpbFBhcnRuZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTcwXCIsIC8vUkMgMzM1MDAxNzAgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNTAwMTY5XCIsIC8vUkMgMzM1MDAxNjkgOiBEZXRhaWwgcGFydG5lcmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRSb3cgPSB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HRG9rbGFkeUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5EaWFsb2dzLkRldGFpbEVzdURsZyh0aGlzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4c0VzdTogc2VsZWN0ZWRSb3dbMF0uaXhzX2VzdSA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVY2VsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGlzLm1vZGVsLml4cCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaURvdGNlbmVob1N1Ympla3R1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVByZXBub3V0WkRldGFpbHVOYUVkaXRhY2k6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApKSksXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKChcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVsZXRlUGFydG5lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWJpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNjVcIiwgLy9SQyAzMzUwMDE2NSA6IFNtYXphdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM1MDAxNjNcIiwgLy9SQyAzMzUwMDE2MyA6IFNtYXphdCBwYXJ0bmVyYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRSb3cgPSB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HRG9rbGFkeUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb25DbG9zZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbG9zaW5nRGVmZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMzUwMDE2N1wiLCAvL1JDIDMzNTAwMTY3IDogRG90YXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzM1MDAxNjY6XCIgLy9SQyAzMzUwMDE2NiA6IE9wcmF2ZHUgY2hjZXRlIHBhcnRuZXJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBzZWxlY3RlZFJvd1swXS5uYXpldiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMzNTAwMTY4OiBcIiArIHNlbGVjdGVkUm93WzBdLmFjX3NtbCwgLy9SQyAzMzUwMDE2OCA6IG9kZWJyYXQgdSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuU21sc2VzdS5kZWxldGUoeyBkYXRhOiB7IGl4cDogc2VsZWN0ZWRSb3dbMF0uaXhwLCBha3Rpdml0YTogNTAwIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZ3JpZFwiLCB0aGlzLiRncmlkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhR3JpZFZpZXcucmVxdWVzdERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcIm5vXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zaW5nRGVmZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NpbmdEZWZmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSkpLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudUJhclBvbGU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9WeXR2b8WZZW7DrSBrb250ZXh0b3bDqWhvIG1lbnUgcHJvIGdyaWRcclxuICAgICAgICBwcml2YXRlIHZ5dHZvckNvbnRleHRvdmVNZW51KCk6IE1lbnVQYXJhbXNbXSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZW51QmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLmdldEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgbWVudUJhclBvbGUucHVzaCh7IGFjdGlvbjogYWN0aW9ucy5maW5kKHggPT4geC5uYW1lID09IFwibmV3UGFydG5lclwiKSB9KTtcclxuICAgICAgICAgICAgbWVudUJhclBvbGUucHVzaCh7IGFjdGlvbjogYWN0aW9ucy5maW5kKHggPT4geC5uYW1lID09IFwiZWRpdFBhcnRuZXJcIikgfSk7XHJcbiAgICAgICAgICAgIG1lbnVCYXJQb2xlLnB1c2goeyBhY3Rpb246IGFjdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PSBcImRldGFpbFBhcnRuZXJcIikgfSk7XHJcbiAgICAgICAgICAgIG1lbnVCYXJQb2xlLnB1c2goeyBhY3Rpb246IGFjdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PSBcImRlbGV0ZVBhcnRuZXJcIikgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnVCYXJQb2xlO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU2xvdXBlxI1reVxyXG4gICAgICAgIGNyZWF0ZUNvbHVtbnMoKTogR0dyaWRDb2x1bW48SW50ZXJmYWNlLkdSb3phYWF0RmluYW5jbmlTdGF2RHRvPltdIHwgRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HUm96YWFhdEZpbmFuY25pU3RhdkR0bz4gfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDA5MFwiLCAvL1JDIDMzNTAwMDkwIDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDA5MFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAwOTFcIiwgLy9SQyAzMzUwMDA5MSA6IE5TXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDA5MlwiLCAvL1JDIDMzNTAwMDkyIDogTsOha2xhZG92w6kgc3TFmWVkaXNrb1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldChcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JvejogdHJ1ZSwgLy9wYXRyaSBrIHJvenBvY3R1IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1VjdDogZmFsc2UsICAvL3BhdHJpIGRvIHVjZXRuaWN0dmkgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAwOTNcIiwgLy9SQyAzMzUwMDA5MyA6IEJMT0tPVsOBTk9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMDkzXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdnpfc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMDk0XCIsIC8vUkMgMzM1MDAwOTQgOiBOQVNNTE9VVsOBTk8gQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDA5NFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfMThcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAwOTVcIiwgLy9SQyAzMzUwMDA5NSA6IFJFWkVSVkFDRSBTTUwsIE9CSlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAwOTVcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUHJvZmlsIHNsb3VwY8WvIHBybyBwYXJ0bmVyeVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUHJvZmlsU2xvdXBlY0dyaWRQYXJ0bmVyKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNlc3VEdG9OYW1lcy50eXBfdmF6YnksIC8vIFR5cCB2YXpieSBwYXJ0bmVyYSBrIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2VzdUR0b05hbWVzLmljb19lc3UsIC8vIEnEjW8gcGFydG5lcmFcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2VzdUR0b05hbWVzLml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNlc3VEdG9OYW1lcy5iYW5rX3VjZXQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNlc3VEdG9OYW1lcy5HaW5zRXN1ICsgXCIuXCIgKyBJbnRlcmZhY2UuR0dpbnNlc3VEdG9OYW1lcy5uYXpldiwgLy8gTsOhemV2IHBhcnRuZXJhIFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMuaXhzX2VzdV96YXN0X3R4dCwgLy8gSm3DqW5vIGEgcMWZaWptZW7DrSB6YXN0b3VwZW7DqWhvIHBhcnRuZXJhXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNlc3VEdG9OYW1lcy5ha3Rpdml0YSwgLy8gQWt0aXZpdGEgcGFydG5lcmFcclxuXHJcbiAgICAgICAgICAgIF0udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vRGVmaW5pY2Ugc2xvdXBjxa8gcHJvIHBhcnRuZXJpXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVEZWZpbmljZUNob3ZhbmlTbG91cGVjdUdyaWRQYXJ0bmVyKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdTbWxzZXN1RHRvPigpO1xyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMudHlwX3ZhemJ5LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTgyXCIsIC8vUkMgMzM1MDAxODIgOiBUeXBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxODNcIiwgLy9SQyAzMzUwMDE4MyA6IFR5cCBwYXJ0bmVyYVxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHsgLy/FoXBhdG7EmyBuZSBpZnkgbmUgc3dpdGNoIHogZGF0YWLDoXplXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cF92YXpieSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwMzU4XCI7IC8vUkMgMzM1MDAzNTggOiBPYmVjbsOhIHZhemJhXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX3ZhemJ5ID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDAzNTlcIjsgLy9SQyAzMzUwMDM1OSA6IFByaW3DoXJuw60gc3ViamVrdFxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnR5cF92YXpieSA9PSAxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzUwMDM2MFwiOyAvL1JDIDMzNTAwMzYwIDogRMOtbMSNw60gZG9kYXZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX3ZhemJ5ID09IDIwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwMzYxXCI7IC8vUkMgMzM1MDAzNjEgOiBEw61sxI3DrSBvZGLEm3JhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX3ZhemJ5ID09IDMwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJEb3TEjWVuw70gb3Jnw6FuIHZlIFPFmFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnR5cF92YXpieSA9PSA0MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiw7rEjWFzdG7DrWsgdmUgU8WYIGRsZSDCpzI3LCBvZHN0LjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZS50eXBfdmF6YnkgPT0gNTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInrDoXN0dXBjZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnR5cF92YXpieSA9PSA2MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwib3N0YXRuw60gc3ViamVrdCB2ZSBTxZhcIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZS50eXBfdmF6YnkgPT0gNzApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNvdWRuw60gb3Jnw6FuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX3ZhemJ5ID09IDgwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCLDusSNYXN0bsOtayB2ZSBTxZggZGxlIMKnMjcsIG9kc3QuMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnR5cF92YXpieSA9PSA5MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiQWRyZXNhIHBybyB2w71wbGF0dVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnR5cF92YXpieSA9PSAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlNvdcSNaW5ub3N0IHBybyBleGVrdWNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX3ZhemJ5ID09IDExMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwixb1hZGF0ZWwgbyBkb3RhY2kgZGxlIHrDoWtvbmEgxI0uIDEwOC8yMDA2IFNiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX3ZhemJ5ID09IDEyMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiS29uZcSNbsO9IHDFmcOtamVtY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50eXBfdmF6YnkgIT0gdW5kZWZpbmVkID8gdmFsdWUudHlwX3ZhemJ5LnRvU3RyaW5nKCkgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2VzdUR0b05hbWVzLmljb19lc3UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxODFcIiwgLy9SQyAzMzUwMDE4MSA6IElDT1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDE4MFwiLCAvL1JDIDMzNTAwMTgwIDogSUNPXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMuR2luc0VzdSArIFwiLlwiICsgSW50ZXJmYWNlLkdHaW5zZXN1RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAxNzlcIiwgLy9SQyAzMzUwMDE3OSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiR2luc0VzdS4qXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMTc4XCIsIC8vUkMgMzM1MDAxNzggOiBOw6F6ZXYgcGFydG5lcmFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMuaXhzX2VzdV96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDM2MlwiLCAvL1JDIDMzNTAwMzYyIDogWmFzdG91cGVuw71cclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAzNjNcIiwgLy9SQyAzMzUwMDM2MyA6IFphc3RvdXBlbsO9IHBhcnRuZXJhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogQ29udHJvbHNMb2dpYy5JbnRlcmZhY2UuR1JlYWRlckdpbnNlc3VEdG9OYW1lcy5ha3Rpdml0YSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDE3N1wiLCAvL1JDIDMzNTAwMTc3IDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAxNzZcIiwgLy9SQyAzMzUwMDE3NiA6IEFrdGl2aXRhIHBhcnRuZXJhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzZXN1RHRvTmFtZXMuYmFua191Y2V0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMTc1XCIsIC8vUkMgMzM1MDAxNzUgOiBCYW5rb3Zuw60gw7rEjWV0XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl19