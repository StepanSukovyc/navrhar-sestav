namespace Gordic.Spr.WebApp {
    export function GDotcSubjUkonuControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        var con = content.createServiceContent("Gordic.Spr.WebApp.GDotcSubjUkonuControl")
        return $.extend({}, predek, {
            idSettings: "GDotcSubjUkonuControl",
            detailContent: content,
            serviceContent: con,
            searchColumns: ["ixs_esu_txt"],
            showNew: false,
            showDelete: false,
            showRestore: false,
            showFilters: false,

            additionalActions: [
                new GAction({
                    name: "actPridat",
                    caption: "jres:25200236", //RC 25200236 : Přidat
                    favorite: true,
                    icon: "fa-plus",
                    run: function (this: GAction, ev, obj) {
                        let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(this);
                        var width = 850;
                        var height = 650;
                        var modal = true;
                        currentContent.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDotcenehoSubjektu", {}], {
                            IxpUkon: (currentContent.parentContent as any).IxpUkon,
                            IxpSpis: (currentContent.parentContent as any).IxpSpis,
                            Jednotlive: false,
                            BezZastupcu: false,
                            Zastupovani: false,
                            TitleText: "jres:25200237" + "jres:25200210" //RC 25200237 : Dotčený subjekt správního úkonu - 
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, retValue) => {
                                currentContent.reloadData();
                            });
                    }
                }),
                new GAction({
                    name: "actRefreshVypraveni",
                    caption: "jres:25500311",  //RC 25500311 : Občerstvit vypravení
                    favorite: true,
                    icon: "fa-refresh",
                    run: function (this: GAction, ev, obj) {
                        
                        let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(this);
                        let selection = currentContent.grid.ggrid("getSelection");
                        con.call("RefreshVypraveni", {
                            seznamDto: selection 
                        }).done(function () {                            
                            currentContent.reloadData();
                            (content as any)._reloadData();
                        })
                    }
                }),
                new GAction({
                    name: "actRefreshDoruceni",
                    caption: "jres:25500312",  //RC 25500312 : Občerstvit doručení
                    favorite: true,
                    icon: "fa-refresh",
                    run: function (this: GAction, ev, obj) {
                        let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(this);
                        let selection = currentContent.grid.ggrid("getSelection");
                        con.call("RefreshDoruceni", {
                            seznamDto: selection
                        }).done(function () {
                            currentContent.reloadData();
                            (content as any)._reloadData();
                        })
                    }
                }),
                new GAction({
                    name: "actOdstraneni",
                    caption: "jres:35600004",  //RC 35600004 : Odstranit
                    favorite: true,
                    icon: "gi-bin",
                    run: function (this: GAction, ev, obj) {
                        let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(this);
                        let selection = currentContent.grid.ggrid("getSelection");
                        con.call("Odstraneni", {
                            IxpUkon: (currentContent.parentContent as any).IxpUkon,
                            seznamDto: selection
                        }).done(function () {
                            currentContent.reloadData();
                            (content as any)._reloadData();
                        })
                    }
                }),
            ],
            additionalMenu: [
                { id: "pridat", action: "actPridat", favorite: true },
                { id: "Občerstvit vypravení", action: "actRefreshVypraveni", favorite: true },
                { id: "Občerstvit doručení", action: "actRefreshDoruceni", favorite: true },
                { id: "Odstranit", action: "actOdstraneni", favorite: true }
            ],
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDotcSubjUkonuDto> {
                var that = this; 
                
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDotcSubjUkonuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDotcSubjUkonuDto>();
                if (that.detailContent.contextProp("debugMode")) {
                    gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                }
                (this as any as Gordic.Gin.WebClient.RegSpa.GSubListControl).grid.ggrid({
                    multi: true,
                });
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "ixs_esu_txt",
                        caption: "jres:25200083", //RC 25200083 : Název
                        width: 250,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ixs_dva_nazev",
                        caption: "jres:25200084", //RC 25200084 : Typ
                        width: 100,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "poznamka",
                        caption: "jres:25200058", //RC 25200058 : Poznámka
                        width: 100,
                        fragment: ""
                    })
                    /*
                    .addTextColumn({
                        name: "s_dor_txt",
                        caption: "jres:25200232", //RC 25200232 : Stav doručení
                        width: 100,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_odes",
                        caption: "jres:25200233", //RC 25200233 : Datum odeslání
                        width: 100,
                        fragment: ""
                    })
                    */
                    .addBooleanColumn({ name: "s_vypraveno", caption: "jres:25300044", width: 90, fixedWidth: false }) //RC 25300044 : Vypraveno
                    .addDateColumn({
                        name: "dat_vypraveni",
                        caption: "jres:25300037", //RC 25300037 : Datum vypravení
                        width: 130,
                        fragment: ""
                    })
                    /*
                    .addDateColumn({
                        name: "dat_potvrz",
                        caption: "jres:25300038", //RC 25300038 : Datum doručení SSL
                        width: 100,
                        fragment: ""
                    })
                    */
                    .addBooleanColumn({ name: "s_doruceno", caption: "jres:25300043", width: 85, fixedWidth: false }) //RC 25300043 : Doručeno
                    .addDateColumn({
                        name: "dat_doruceni",
                        caption: "jres:25200234", //RC 25200234 : Datum doručení
                        width: 130,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_lh_odv",
                        caption: "jres:25300040", //RC 25300040 : Lhůta pro odvolání
                        width: 140,
                        fragment: ""
                    })
                    .addBooleanColumn({ name: "s_odv", caption: "jres:25300042", width: 85, fixedWidth: false }) //RC 25300042 : Odvolání
                    .addDateColumn({
                        name: "dat_odvolani",
                        caption: "jres:25300041", //RC 25300041 : Datum odvolání
                        width: 130,
                        fragment: ""
                    })
                    /*
                    .addTextColumn({
                        name: "poznamka_dor",
                        caption: "jres:25200235", //RC 25200235 : Poznámka doručení
                        width: 150,
                        fragment: ""
                    })
                    */
                    ;
                return gridFormat;                   
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var that = this;
                var ixpUkon;
                var ixpSpis;
                var ixsEsu;
                var typVazby;
                var licZast;
                var porZast;
                if (row != null && row != undefined) {
                    ixpUkon = row.ixp_ukon;
                    ixpSpis = row.ixp_spis;
                    ixsEsu = row.ixs_esu
                    typVazby = row.typ_vazby;
                    licZast = row.lic_zast;
                    porZast = row.por_zast;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailDotcSubjUkonu", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpUkon: ixpUkon,
                    IxpSpis: ixpSpis,
                    IxsEsu: ixsEsu,
                    TypVazby: typVazby,
                    LicZast: licZast,
                    PorZast: porZast,
                    Id: "detail_dotc_subj_ukonu"
                }, { width: width, height: height, modal: modal });
            },

            enableActions: function () {
                console.log("GDotcSubjUkonuControl.enableActions");
            //    var readOnly = (content as any).RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            //    (this as any).actions.actPridat!.enabled(readOnly);
            //    (this as any).actions.actRefresh!.enabled(readOnly);
            },

            enableRowActions: function (gridSelection) {
                console.log("GDotcSubjUkonuControl.enableRowActions");
                var readOnly = (content as any).RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
                let selections = gridSelection.count != 0;  
                (this as any).actions.actPridat!.enabled(readOnly);
                (this as any).actions.actRefresh!.enabled(readOnly);
                //(this as any).actions.actDelete!.enabled(gridSelection.count != 0 && gridSelection.getSelection()[0].Permissions.CanDelete.value &&
                //    readOnly && this.detailContent.model.Permissions.CanUpdate.value);
                (this as any).actions.actRefreshVypraveni!.enabled(selections);
                (this as any).actions.actRefreshDoruceni!.enabled(selections);
                (this as any).actions.actOdstraneni!.enabled(selections);
            }
        });
    }
}
