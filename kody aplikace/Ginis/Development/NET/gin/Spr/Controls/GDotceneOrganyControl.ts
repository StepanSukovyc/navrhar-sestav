namespace Gordic.Spr.WebApp {
    export function GDotceneOrganyControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        var con = content.createServiceContent("Gordic.Spr.WebApp.GDotceneOrganyControl");
        return $.extend({}, predek, {
            idSettings: "GDotceneOrganyControl",
            detailContent: content,
            serviceContent: con,
            searchColumns: ["ixs_esu_txt", "ixs_esu_txt"],  
            showDelete: false,
            showRestore: false,
            showFilters: false,
            gridAutofitEnabled: false,
            additionalActions: [
                new GAction({
                    name: "actSkupiny",
                    caption: "jres:25200191", //RC 25200191 : Skupiny
                    run: function (this: GAction, ev, obj) {
                        var that = this;
                        con.call("GetSSLCjSpis", { ixpSpis: (content as any).IxpSpis })
                            .done(function (SSLCjSpis) {
                                let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(that);
                                var Logovani = {
                                    Ixp: (content as any).IxpSpis,
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                                    AktZnacka: SSLCjSpis,
                                    DuvodHledaniTxt: VyberEsu_DuvodHledaniTxt
                                };
                                var options = {
                                    ID: "ESUSkupinyEsuDlg#",
                                    Logovani: Logovani,
                                    SkupinyWorkingMode: 1
                                };
                                Gordic.Esu.Dialogs.RozdelovnikEsuDlg(content, options)?.on("close", function (ev, retVal) {
                                    if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {
                                        let pocet = retVal.subjekty.length;
                                        let i = 0;
                                        retVal.subjekty.forEach(function (row) {
                                            con.call("PridatEsuZeSkupiny", { ixpSpis: (content as any).IxpSpis, ixsEsu: row.ixs_esu, ixsDva: row.ixs_dva }, {})
                                                .done(function (ret) {
                                                    i += 1;
                                                    if (i == pocet)
                                                        currentContent.reloadData();
                                                });
                                        });
                                    }
                                });
                            });
                    }
                })
            ],
            additionalMenu: [
                { id: "skupiny", action: "actSkupiny", favorite: true },
            ],

            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDotcenychOrganuDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDotcenychOrganuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDotcenychOrganuDto>();
                if ((window as any).ginisDebugMode) {
                    gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                }
                gridFormat = gridFormat
                    .addIconColumn({
                        name: "zmena_esu",
                        caption: "jres:35600005", //RC 35600005 : Změna
                        width: 20,
                        fixedWidth: false,
                        iconTemplate: (val) => {
                            if (val.zmena_esu == 1) return { icon: "fa-exclamation-triangle g-state-text g-state-warning" };
                            else return { icon: "" };
                        }
                    })
                    .addTextColumn({
                        name: "ixs_esu_txt",
                        caption: "jres:25200083", //RC 25200083 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ixs_dva_nazev",
                        caption: "jres:25200084", //RC 25200084 : Typ
                        width: 300,
                        fragment: ""
                    });
                return gridFormat;                   
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var that = this;
                var ixpSpis;
                var ixsEsu;
                var typVazby;
                var licZast;
                var porZast;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    ixsEsu = row.ixs_esu;
                    typVazby = row.typ_vazby;
                    licZast = row.lic_zast;
                    porZast = row.por_zast;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailDO", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpSpis: ixpSpis,
                    IxsEsu: ixsEsu,
                    TypVazby: typVazby,
                    LicZast: licZast,
                    PorZast: porZast,
                    Id: "detail_dotceneho_organu"
                });
            }
        });
    }
}