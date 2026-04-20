namespace Gordic.Spr.WebApp {
    export function GUkonyControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GUkonyControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GUkonyControl"),
            dataViewKey: ["ixp_ukon"],
            searchColumns: ["ixp_ukon"],  
            detailHeight: 1000,
            showDelete: false,
            showRestore: false,
            showFilters: false,
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamUkonuDto> {
                var that = this;
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamUkonuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamUkonuDto>();
                if (that.detailContent.contextProp("debugMode")) {
                //if ((window as any).ginisDebugMode) {
                    gridFormat = gridFormat.addTextColumn({ name: "ixs_duk", caption: "IXS_DUK", width: 150, fixedWidth: false });
                }
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "ixp_ukon",
                        caption: "jres:25200100", //RC 25200100 : Identifikátor
                        width: 150,
                        fragment: ""
                    })
                    .addDateTimeColumn({
                        name: "dat_pod",
                        caption: "jres:25200101", //RC 25200101 : Datum podání
                        width: 100,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "cj_dok",
                        caption: "jres:25200102", //RC 25200102 : Označení dokumentu
                        width: 200,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: "jres:25200103", //RC 25200103 : ČJ dokumentu
                        width: 200,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_pr_moc",
                        caption: "jres:25200106", //RC 25200106 : Datum PM
                        width: 100,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "nazev_duk",
                        caption: "jres:25200104", //RC 25200104 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addBooleanColumn({ name: "s_vypraveno", caption: "Vypraveno", width: 90, fixedWidth: false })
                    .addDateColumn({
                        name: "dat_vypraveni",
                        caption: "jres:25300037", //RC 25300037 : Datum vypravení
                        width: 130,
                        fragment: ""
                    })
                    .addBooleanColumn({ name: "s_doruceno", caption: "Doručeno", width: 85, fixedWidth: false })
                    .addDateColumn({
                        name: "dat_doruceni",
                        caption: "jres:25200234", //RC 25200234 : Datum doručení
                        width: 130,
                        fragment: ""
                    })

                return gridFormat;                   
            },

            beforeOpenDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined): JQueryPromise<any> {
                console.log("Before open detail - ukony");
                var def = $.Deferred();
                var that = this;

                if (rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.New) {
                    var options = {
                        TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                        TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                        ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremUsuGenPid
                    };
                    console.log("GenerovaniIxp");
                    Gordic.Wfl.Dialogs.GenerovaniIxp(content, options, Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (rv, cont) {
                        console.log("rv...");
                        console.log(rv);
                        if (rv) {
                            if (rv.IxpExist === false) {
                                def.resolve({ ixp_spis: content.model.ixp_spis, ixp_ukon: rv.Ixp });
                            } else {
                                def.reject();
                            }
                        }
                        else
                            def.reject();
                    });
                }
                else
                    def.resolve(row);
                return def.promise();
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var that = this;
                var ixpSpis;
                var ixpUkon;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    ixpUkon = row.ixp_ukon
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailUkonu", { gridRemoteControl: gridRc }], {
                    RezimDetailu: rezim,
                    IxpSpis: ixpSpis,
                    IxpUkon: ixpUkon,
                    IxsDsr: content.model.ixs_dsr,
                    Id: "detail_ukon"
                });
            },

            onCloseDetail: function (ev, r) {
                var that = this;
                // Pokud je přidán nebo změněn úkon, předej id nadřazenému detailu pro nové načtení dat a nastavení activeRow.
                if (r != undefined && r.Zmena) {
                    var gTabManager = content.find(".gtabmanager");
                    var active;
                    if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                    content.load({ RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, internal: true, selectedTabGroup: active, identifikatorUkonu: r.Model["ixp_ukon"] });
                }
            }
        });
    }
}