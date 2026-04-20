"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let typeFilterPozadavek;
            (function (typeFilterPozadavek) {
                typeFilterPozadavek[typeFilterPozadavek["VSECHNY"] = -1] = "VSECHNY";
                typeFilterPozadavek[typeFilterPozadavek["OSOBNI"] = 10] = "OSOBNI";
                typeFilterPozadavek[typeFilterPozadavek["VEREJNE"] = 0] = "VEREJNE";
            })(typeFilterPozadavek || (typeFilterPozadavek = {}));
            /**
             * Seznam pozadavku
             *
             * @author tkares
             * @since 488.1.0.69
             */
            class GSeznamPozadavek extends WebClient.GSeznamEkoZaznamuBase {
                /**
                 * Konstruktor
                 * @param content
                 */
                constructor(content) {
                    super(content);
                    /**
                     * filtry na pozadavky
                     * */
                    this.filterPozadavek = typeFilterPozadavek.VSECHNY;
                    this.logOptions = { name: "GSeznamPozadavek", authorCode: 302, file: "GSeznamPozadavek.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = false;
                    this.soucetVeStatusBaru = false;
                    this.souctovyRadekAtomaticky = false;
                    this.serverovyFilterNadGridem = false;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrPozadavek.list();
                    this.taskCount = this.parentCnt.isl.UcrPozadavek.count();
                }
                onContentReady() {
                    let that = this;
                    $.newDiv()
                        .appendTo(this.parentCnt.element)
                        .gsubtasks({
                        params: [
                            { action: new GAction({ name: "actAll", caption: "jres:31100002", run: function () { that.filterPozadavek = typeFilterPozadavek.VSECHNY; that.reload(); } }) }, //RC 31100002 : Všechny
                            { action: new GAction({ name: "actPers", caption: "jres:31100003", run: function () { that.filterPozadavek = typeFilterPozadavek.OSOBNI; that.reload(); } }) }, //RC 31100003 : Osobní
                            { action: new GAction({ name: "actPublic", caption: "jres:31100004", run: function () { that.filterPozadavek = typeFilterPozadavek.VEREJNE; that.reload(); } }) } //RC 31100004 : Veřejné
                        ]
                    });
                    // zbytek dotvori predek
                    super.onContentReady();
                }
                ///**
                // * Filtr panel
                // * @param that
                // */
                //public createFilterPanel(that: this): void
                //{
                //    // neni zadny
                //}
                /**
                 * Zobrazeni detailu
                 * @param row
                 */
                showDetail(row) {
                    if (row) {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        var sel = grid.ggrid("getSelection");
                        if (sel.length === 0)
                            return;
                        this.parentCnt.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: sel[0].ixs_ses } });
                    }
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    //let grid = this.getGrid();
                    //if (grid == null) return ;
                    //var enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid)>0;
                    var enable = pocetRadku > 0;
                    // pristupnost akci dle nactenych dat
                    this.parentCnt.actions.selAct?.enabled(enable);
                    this.parentCnt.actions.delAct?.enabled(enable);
                }
                /**
                  * Nacti filtry
                  * @param that
                  * @param req
                  * @param next
                  */
                getFilterData(that, req, next) {
                    var newRequest = $.extend(true, {}, req);
                    newRequest["filters"] = { typ_msk: that.filterPozadavek };
                    return next(newRequest);
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    super.createActions();
                }
                createGridFormat() {
                    let gf = new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "ixs_fun",
                        fragment: "ixs_fun" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.ixs_fun */,
                        caption: "",
                        width: 30,
                        iconTemplate: function (row, metarow) {
                            var icon = metarow.data.ixs_fun === Gordic.Ucr.Globals.GUcrGlobals.ixs_fun ? "gi-user" : "gi-group";
                            return { icon: icon };
                        },
                        sortable: false
                    })
                        .addTextColumn({
                        name: "nazev",
                        fragment: "nazev" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.nazev */,
                        caption: "jres:31100006", //RC 31100006 : Název požadavku
                        width: 250
                    })
                        .addTextColumn({
                        name: "id_ses_alv",
                        fragment: "id_ses_alv" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.id_ses_alv */,
                        caption: "jres:31100007", //RC 31100007 : Sestava
                        width: 75
                    })
                        .addTextColumn({
                        name: "nazev_alv",
                        fragment: "nazev_alv" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.nazev_alv */,
                        caption: "jres:31100008", //RC 31100008 : Název sestavy
                        width: 250
                    })
                        .addTextColumn({
                        name: "nazev_frm",
                        fragment: "nazev_frm" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.nazev_frm */,
                        caption: "jres:31100009", //RC 31100009 : Název formátu
                        width: 150
                    })
                        .addNumberColumn({
                        name: "rok",
                        fragment: "rok" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.rok */,
                        caption: "jres:31100010", //RC 31100010 : Rok
                        width: 50
                    })
                        .addTextColumn({
                        name: "mesic_comp",
                        fragment: "mesic_comp" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.mesic_comp */,
                        caption: "jres:31100011", //RC 31100011 : Měsíc
                        width: 80
                    })
                        .addTextColumn({
                        name: "msk_nazev",
                        fragment: "msk_nazev" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.msk_nazev */,
                        caption: "jres:31100012", //RC 31100012 : Maska
                        width: 100
                    })
                        .addTextColumn({
                        name: "ico",
                        fragment: "ico" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.ico */,
                        caption: Gordic.Ucr.Globals.GZkr.Ico,
                        width: 70
                    })
                        .addTextColumn({
                        name: "ucs",
                        fragment: "ucs" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.ucs */,
                        caption: Gordic.Ucr.Globals.GZkr.Ucs,
                        width: 70
                    })
                        .addTextColumn({
                        name: "uus",
                        fragment: "uus" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.uus */,
                        caption: Gordic.Ucr.Globals.GZkr.Uus,
                        width: 70
                    })
                        .addTextColumn({
                        name: "nks",
                        fragment: "nks" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.nks */,
                        caption: Gordic.Ucr.Globals.GZkr.Nks,
                        width: 70
                    })
                        .addTextColumn({
                        name: "sns_nazev",
                        fragment: "sns_nazev" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.sns_nazev */,
                        caption: "jres:31100013", //RC 31100013 : Seskupení
                        width: 100
                    })
                        .addTextColumn({
                        name: "poznamka",
                        fragment: "poznamka" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.poznamka */,
                        caption: "jres:31100014", //RC 31100014 : Poznámka
                        width: 200
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        fragment: "dat_zmena" /* Gordic.Uct.Interface.GUcrSeznamPozadavkuDtoFragments.dat_zmena */,
                        caption: "jres:31100015", //RC 31100015 : Datum změny
                        width: 130
                    });
                    return gf;
                }
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    return profiles;
                }
                createActions() {
                    //super.createActions();
                    let that = this;
                    this.parentCnt.actions.addRange({
                        newAct: Gordic.Eko.Action.actionNovy({ enabled: true, run: function () { that.parentCnt.navigate('Gordic.Ucr.WebClient.GDetailPozadavkuControl', {}); } }),
                        selAct: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: function () {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var row = grid.ggrid("activeRow");
                                if (row === null)
                                    return;
                                that.parentCnt.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: row.ixs_ses } });
                            }
                        }),
                        delAct: Gordic.Eko.Action.actionOdstranit({
                            enabled: false,
                            run: function () {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var row = grid.ggrid("activeRow");
                                if (row === null)
                                    return;
                                that.parentCnt.dialogs.confirm("jres:30250002".format(row.nazev)) //RC 30250002 : Opravdu chcete smazat vybraný požadavek ({0})?
                                    .on("close", (ev, obj) => {
                                    if (obj !== "yes")
                                        return;
                                    that.parentCnt.isl.UcrPozadavek.delete({ identifikator: row.ixs_ses })
                                        .get()
                                        .then(function () {
                                        that.loadData();
                                        that.parentCnt.showFlash({ id: "flashDelete", icon: "gi-tick", label: "jres:30250003", customClass: "g-state-success", timer: 5000 }); //RC 30250003 : Požadavek byl vymazán
                                    });
                                });
                            }
                        })
                    });
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = new Array({ action: this.parentCnt.actions.newAct, favorite: true, captionVisible: "never" }, { action: this.parentCnt.actions.selAct, favorite: true }, { action: this.parentCnt.actions.delAct, favorite: true });
                    return menu;
                }
            }
            WebClient.GSeznamPozadavek = GSeznamPozadavek;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVBvemFkYXZlay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Qb3phZGF2ZWsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQWtTZjtBQWxTRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrU25CO0lBbFNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrUzdCO1FBbFNvQixXQUFBLFNBQVM7WUFFMUIsSUFBSyxtQkFJSjtZQUpELFdBQUssbUJBQW1CO2dCQUNwQixvRUFBWSxDQUFBO2dCQUNWLGtFQUFXLENBQUE7Z0JBQ1gsbUVBQVcsQ0FBQTtZQUNqQixDQUFDLEVBSkksbUJBQW1CLEtBQW5CLG1CQUFtQixRQUl2QjtZQUNEOzs7OztlQUtHO1lBQ0gsTUFBYSxnQkFBaUIsU0FBUSxVQUFBLHFCQUFxQjtnQkFTdkQ7OzttQkFHRztnQkFDSCxZQUFZLE9BQXFDO29CQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBWm5COzt5QkFFSztvQkFDRyxvQkFBZSxHQUF3QixtQkFBbUIsQ0FBQyxPQUFPLENBQUM7b0JBRTNFLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxDQUFDO29CQVFwRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztvQkFDckMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztvQkFDdEMsNENBQTRDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdELENBQUM7Z0JBRUQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO3lCQUNoQyxTQUFTLENBQUM7d0JBQ1AsTUFBTSxFQUFFOzRCQUNKLEVBQUUsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxlQUFlLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFHLHVCQUF1Qjs0QkFDeEwsRUFBRSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUcsc0JBQXNCOzRCQUN2TCxFQUFFLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsZUFBZSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRyx1QkFBdUI7eUJBQzlMO3FCQUNKLENBQUMsQ0FBQztvQkFDUCx3QkFBd0I7b0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztnQkFFRCxLQUFLO2dCQUNMLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUNoQixLQUFLO2dCQUNMLDRDQUE0QztnQkFDNUMsR0FBRztnQkFDSCxtQkFBbUI7Z0JBQ25CLEdBQUc7Z0JBQ0g7OzttQkFHRztnQkFDTyxVQUFVLENBQUMsR0FBUztvQkFDMUIsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7NEJBQUUsT0FBUTt3QkFDMUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBOEMsY0FBYyxDQUFDLENBQUM7d0JBQ2xGLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDOzRCQUNoQixPQUFPO3dCQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BILENBQUM7Z0JBQ0wsQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNFLGFBQWEsQ0FBQyxJQUF5QixFQUFFLFVBQWtCO29CQUM5RCw0QkFBNEI7b0JBQzVCLDRCQUE0QjtvQkFDNUIscUVBQXFFO29CQUNyRSxJQUFJLE1BQU0sR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixxQ0FBcUM7b0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBRUQ7Ozs7O29CQUtJO2dCQUNNLGFBQWEsQ0FBQyxJQUFVLEVBQUUsR0FBNEIsRUFBRSxJQUF3STtvQkFFdE0sSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUV6QyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUUxRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFJRDs7O3FCQUdLO2dCQUNLLGNBQWM7b0JBQ3BCLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFTSxnQkFBZ0I7b0JBRW5CLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7eUJBQ2hDLGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsU0FBUzt3QkFDZixRQUFRLDhFQUE4RDt3QkFDdEUsT0FBTyxFQUFFLEVBQUU7d0JBQ1gsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsWUFBWSxFQUFFLFVBQVUsR0FBRyxFQUFFLE9BQU87NEJBQ2hDLElBQUksSUFBSSxHQUFHLE9BQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOzRCQUNyRyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO3dCQUMxQixDQUFDO3dCQUNELFFBQVEsRUFBRSxLQUFLO3FCQUNsQixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsT0FBTzt3QkFDYixRQUFRLDBFQUE0RDt3QkFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxZQUFZO3dCQUNsQixRQUFRLG9GQUFpRTt3QkFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7d0JBQ2pELEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxXQUFXO3dCQUNqQixRQUFRLGtGQUFnRTt3QkFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQ3ZELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxXQUFXO3dCQUNqQixRQUFRLGtGQUFnRTt3QkFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQ3ZELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsZUFBZSxDQUFDO3dCQUNiLElBQUksRUFBRSxLQUFLO3dCQUNYLFFBQVEsc0VBQTBEO3dCQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjt3QkFDN0MsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLFFBQVEsb0ZBQWlFO3dCQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDL0MsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLFFBQVEsa0ZBQWdFO3dCQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDL0MsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsUUFBUSxzRUFBMEQ7d0JBQ2xFLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDcEMsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsUUFBUSxzRUFBMEQ7d0JBQ2xFLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDcEMsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsUUFBUSxzRUFBMEQ7d0JBQ2xFLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDcEMsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsUUFBUSxzRUFBMEQ7d0JBQ2xFLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDcEMsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLFFBQVEsa0ZBQWdFO3dCQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDbkQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFFBQVEsZ0ZBQStEO3dCQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsV0FBVzt3QkFDakIsUUFBUSxrRkFBZ0U7d0JBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCO3dCQUNyRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQ1Y7b0JBR0ksT0FBTyxFQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU0sY0FBYyxDQUFDLEVBQW1HO29CQUNySCxJQUFJLFFBQVEsR0FBMkI7d0JBQ25DLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLHVCQUF1QjtxQkFDMUUsQ0FBQTtvQkFFRCxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBR2hGLE9BQU8sUUFBUSxDQUFDO2dCQUNwQixDQUFDO2dCQUVNLGFBQWE7b0JBQ2hCLHdCQUF3QjtvQkFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3hKLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3JDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRTtnQ0FDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7b0NBQUUsT0FBUTtnQ0FDMUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDbEMsSUFBSSxHQUFHLEtBQUssSUFBSTtvQ0FDWixPQUFPO2dDQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ2xILENBQUM7eUJBQ0osQ0FBQzt3QkFDQSxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOzRCQUN4QyxPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUU7Z0NBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO29DQUFFLE9BQVE7Z0NBQzFCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ2xDLElBQUksR0FBRyxLQUFLLElBQUk7b0NBQ1osT0FBTztnQ0FDWCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw4REFBOEQ7cUNBRTNILEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBVyxFQUFFLEVBQUU7b0NBQzdCLElBQUksR0FBRyxLQUFLLEtBQUs7d0NBQUUsT0FBTztvQ0FDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7eUNBQ2pFLEdBQUcsRUFBRTt5Q0FDTCxJQUFJLENBQUM7d0NBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dDQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFFLHFDQUFxQztvQ0FDaEwsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQzt5QkFDSixDQUFDO3FCQUVMLENBQ0EsQ0FBQztnQkFFTixDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ08sYUFBYSxDQUFDLFFBQXFEO29CQUN6RSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FDaEIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxFQUNoRixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUN6RCxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUM5RCxDQUFDO29CQUVGLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBRUo7WUFsUlksMEJBQWdCLG1CQWtSNUIsQ0FBQTtRQUdMLENBQUMsRUFsU29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtTN0I7SUFBRCxDQUFDLEVBbFNnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrU25CO0FBQUQsQ0FBQyxFQWxTUyxNQUFNLEtBQU4sTUFBTSxRQWtTZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZW51bSB0eXBlRmlsdGVyUG96YWRhdmVrIHtcclxuICAgICAgICBWU0VDSE5ZID0gLTFcclxuICAgICAgICAsIE9TT0JOSSA9IDEwXHJcbiAgICAgICAgLCBWRVJFSk5FID0gMFxyXG4gICAgfSAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V6bmFtIHBvemFkYXZrdVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg4LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVBvemFkYXZlayBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZmlsdHJ5IG5hIHBvemFkYXZreVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJQb3phZGF2ZWs6IHR5cGVGaWx0ZXJQb3phZGF2ZWsgPSB0eXBlRmlsdGVyUG96YWRhdmVrLlZTRUNITlk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtUG96YWRhdmVrXCIsIGF1dGhvckNvZGU6IDMwMiwgZmlsZTogXCJHU2V6bmFtUG96YWRhdmVrLnRzXCIgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29uc3RydWt0b3JcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgc3VwZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucG91eml2YW5TdHJ1a1BvcGlzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucG92b2xlbk5haGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNvdWNldFZlU3RhdHVzQmFydSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNvdWN0b3Z5UmFkZWtBdG9tYXRpY2t5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyb3Z5RmlsdGVyTmFkR3JpZGVtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUG96YWRhdmVrLmxpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrQ291bnQgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUG96YWRhdmVrLmNvdW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nc3VidGFza3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImFjdEFsbFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDJcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZmlsdGVyUG96YWRhdmVrID0gdHlwZUZpbHRlclBvemFkYXZlay5WU0VDSE5ZOyB0aGF0LnJlbG9hZCgpOyB9IH0pIH0sICAvL1JDIDMxMTAwMDAyIDogVsWhZWNobnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogXCJhY3RQZXJzXCIsIGNhcHRpb246IFwianJlczozMTEwMDAwM1wiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5maWx0ZXJQb3phZGF2ZWsgPSB0eXBlRmlsdGVyUG96YWRhdmVrLk9TT0JOSTsgdGhhdC5yZWxvYWQoKTsgfSB9KSB9LCAgLy9SQyAzMTEwMDAwMyA6IE9zb2Juw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogXCJhY3RQdWJsaWNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDA0XCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmZpbHRlclBvemFkYXZlayA9IHR5cGVGaWx0ZXJQb3phZGF2ZWsuVkVSRUpORTsgdGhhdC5yZWxvYWQoKTsgfSB9KSB9ICAgLy9SQyAzMTEwMDAwNCA6IFZlxZllam7DqVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB6Ynl0ZWsgZG90dm9yaSBwcmVkZWtcclxuICAgICAgICAgICAgc3VwZXIub25Db250ZW50UmVhZHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBGaWx0ciBwYW5lbFxyXG4gICAgICAgIC8vICogQHBhcmFtIHRoYXRcclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHVibGljIGNyZWF0ZUZpbHRlclBhbmVsKHRoYXQ6IHRoaXMpOiB2b2lkXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgLy8gbmVuaSB6YWRueVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93RGV0YWlsKHJvdz86IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JTZXpuYW1Qb3phZGF2a3VEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoXCJHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsUG96YWRhdmt1Q29udHJvbFwiLCB7IG9wdGlvbnM6IHsgaXhzU2VzOiBzZWxbMF0uaXhzX3Nlc30gfSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgcG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy9pZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAvL3ZhciBlbmFibGUgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCk+MDtcclxuICAgICAgICAgICAgdmFyIGVuYWJsZSA9IHBvY2V0UmFka3UgPiAwO1xyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuc2VsQWN0Py5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuZGVsQWN0Py5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICogTmFjdGkgZmlsdHJ5XHJcbiAgICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICAqIEBwYXJhbSByZXFcclxuICAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEZpbHRlckRhdGEodGhhdDogdGhpcywgcmVxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbmV4dDogSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbnVtYmVyPik6IElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+IHwgSlF1ZXJ5UHJvbWlzZTxJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuXHJcbiAgICAgICAgICAgIG5ld1JlcXVlc3RbXCJmaWx0ZXJzXCJdID0geyB0eXBfbXNrOiB0aGF0LmZpbHRlclBvemFkYXZlayB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyomR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlem5hbVBvemFkYXZrdUR0b0ZyYWdtZW50cy5peHNfZnVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YXJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IG1ldGFyb3chLmRhdGEuaXhzX2Z1biA9PT0gR29yZGljLlVjci5HbG9iYWxzLkdVY3JHbG9iYWxzLml4c19mdW4gPyBcImdpLXVzZXJcIiA6IFwiZ2ktZ3JvdXBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogaWNvbiB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlem5hbVBvemFkYXZrdUR0b0ZyYWdtZW50cy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDZcIiwgLy9SQyAzMTEwMDAwNiA6IE7DoXpldiBwb8W+YWRhdmt1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX3Nlc19hbHZcIixcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlem5hbVBvemFkYXZrdUR0b0ZyYWdtZW50cy5pZF9zZXNfYWx2LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAwN1wiLCAvL1JDIDMxMTAwMDA3IDogU2VzdGF2YVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2FsdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2V6bmFtUG96YWRhdmt1RHRvRnJhZ21lbnRzLm5hemV2X2FsdixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDhcIiwgLy9SQyAzMTEwMDAwOCA6IE7DoXpldiBzZXN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2ZybVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2V6bmFtUG96YWRhdmt1RHRvRnJhZ21lbnRzLm5hemV2X2ZybSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDlcIiwgLy9SQyAzMTEwMDAwOSA6IE7DoXpldiBmb3Jtw6F0dVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2V6bmFtUG96YWRhdmt1RHRvRnJhZ21lbnRzLnJvayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTBcIiwgLy9SQyAzMTEwMDAxMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljX2NvbXBcIixcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlem5hbVBvemFkYXZrdUR0b0ZyYWdtZW50cy5tZXNpY19jb21wLCAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibXNrX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JTZXpuYW1Qb3phZGF2a3VEdG9GcmFnbWVudHMubXNrX25hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxMlwiLCAvL1JDIDMxMTAwMDEyIDogTWFza2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JTZXpuYW1Qb3phZGF2a3VEdG9GcmFnbWVudHMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5VY3IuR2xvYmFscy5HWmtyLkljbyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlem5hbVBvemFkYXZrdUR0b0ZyYWdtZW50cy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLlVjci5HbG9iYWxzLkdaa3IuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2V6bmFtUG96YWRhdmt1RHRvRnJhZ21lbnRzLnV1cyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuVWNyLkdsb2JhbHMuR1prci5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JTZXpuYW1Qb3phZGF2a3VEdG9GcmFnbWVudHMubmtzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5VY3IuR2xvYmFscy5HWmtyLk5rcyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbnNfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclNlem5hbVBvemFkYXZrdUR0b0ZyYWdtZW50cy5zbnNfbmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDEzXCIsIC8vUkMgMzExMDAwMTMgOiBTZXNrdXBlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JTZXpuYW1Qb3phZGF2a3VEdG9GcmFnbWVudHMucG96bmFta2EsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE0XCIsIC8vUkMgMzExMDAwMTQgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2V6bmFtUG96YWRhdmt1RHRvRnJhZ21lbnRzLmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTVcIiwgLy9SQyAzMTEwMDAxNSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdmIGFzIGFueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVQcm9maWxlcyhnZjogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8vKiZHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vc3VwZXIuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgbmV3QWN0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Ob3Z5KHsgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsUG96YWRhdmt1Q29udHJvbCcsIHt9KTsgfSB9KVxyXG4gICAgICAgICAgICAgICAgLCBzZWxBY3Q6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5uYXZpZ2F0ZShcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxQb3phZGF2a3VDb250cm9sXCIsIHsgb3B0aW9uczogeyBpeHNTZXM6IHJvdy5peHNfc2VzIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICwgZGVsQWN0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PZHN0cmFuaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuZGlhbG9ncy5jb25maXJtKFwianJlczozMDI1MDAwMlwiLmZvcm1hdChyb3cubmF6ZXYpKSAvL1JDIDMwMjUwMDAyIDogT3ByYXZkdSBjaGNldGUgc21hemF0IHZ5YnJhbsO9IHBvxb5hZGF2ZWsgKHswfSk/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCBvYmo6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmogIT09IFwieWVzXCIpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5pc2wuVWNyUG96YWRhdmVrLmRlbGV0ZSh7IGlkZW50aWZpa2F0b3I6IHJvdy5peHNfc2VzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5zaG93Rmxhc2goeyBpZDogXCJmbGFzaERlbGV0ZVwiLCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IFwianJlczozMDI1MDAwM1wiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDAgfSkgIC8vUkMgMzAyNTAwMDMgOiBQb8W+YWRhdmVrIGJ5bCB2eW1hesOhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPihcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLm5ld0FjdCwgZmF2b3JpdGU6IHRydWUsIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIgfVxyXG4gICAgICAgICAgICAgICAgLCB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5zZWxBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICwgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZGVsQWN0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuIFxyXG59Il19