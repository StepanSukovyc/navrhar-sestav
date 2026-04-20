
namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;

    @gcontent
    export class GVyberPohledavkySubjektu extends GContentBase {

        IxpSpis: string;
        IxsEsu: string;
        private grid: JQuery;
        private dataView: Gordic.Data.View;
        //private filterForm: JQuery<HTMLElement>;

        onContentReady() {
            var that = this;
            this.CreateMenu();

            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full", 
                    navigationMode: "row",
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: (ev, ctx) => {
                            var row = ctx.cellInfo.data;
                            that.okClick(row)
                        }
                    }),
                    columns: this.createGridFormat(),
                    searchColumns: ["ixp_eko_dok"]
                });

            //dataView
            this.dataView = new Gordic.Data.View(undefined, { key: "ixp_eko_dok" });

            //this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
            that.loadData();
        }

        private CreateMenu(): void {
            const that = this;

            const commandBarPole: MenuParams[] = [];
            commandBarPole.push({
                action: that.actions.add(new GAction({
                    name: "actOk",
                    caption: "jres:25200124", //RC 25200124 : Vybrat
                    tooltip: "jres:25200124", //RC 25200124 : Vybrat
                    run: function () {
                        var selection: Gordic.Spr.Interface.GSeznamPopDto[];
                        selection = that.grid.ggrid("getSelection");
                        if (selection.length == 1) {
                            that.okClick(selection[0]);
                        }
                    }
                })),
                favorite: true,
                customClass: "g-button--primary"
            });
            commandBarPole.push({
                action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
            });
            that.commandBar(that.actions.createBar(commandBarPole));
        }

        //nahrani dat
        public loadData(filter?: Object): JQueryPromise<any> {
            var that = this;

            //if (filter == undefined)
            //    filter = new Object();

            var prom = this.call("GetPohledavkySubjektu")
                .done(function (ret) {
                    if (that.grid.hasClass("ggrid")) {
                        that.dataView.updateData(ret);
                        that.grid.ggrid("setData", that.dataView);
                    }
                });
            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto> {
            var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto>;
            gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto>();
            gridFormat = gridFormat
                .addTextColumn({
                    name: "ixs_esu_txt",
                    caption: "jres:25200107", //RC 25200107 : Poplatník
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "ixp_eko_dok",
                    caption: "jres:25200418", //RC 25200418 : PID
                    width: 100,
                    fragment: ""
                })
                .addTextColumn({
                    name: "vs",
                    caption: "jres:25200110", //RC 25200110 : VS
                    width: 100,
                    fragment: ""
                })
                .addTextColumn({
                    name: "druh_pl_txt",
                    caption: "jres:25200108", //RC 25200108 : Druh platby
                    width: 150,
                    fragment: ""
                })
                .addNumberColumn({
                    name: "c_pop",
                    caption: "jres:25200109", //RC 25200109 : Výše platby
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "typ_eko_txt",
                    caption: "jres:25200156", //RC 25200156 : Typ dokladu
                    width: 100,
                    fragment: ""
                })
                .addTextColumn({
                    name: "ixp_eko_dok",
                    caption: "jres:25200157", //RC 25200157 : PID dokladu
                    width: 100,
                    fragment: ""
                })
                .addDateColumn({
                    name: "dat_vyzvy",
                    caption: "jres:25200111", //RC 25200111 : Datum výzvy
                    width: 150,
                    fragment: ""
                })
                .addDateColumn({
                    name: "dat_zapl",
                    caption: "jres:25200112", //RC 25200112 : Datum zaplacení
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "druh_sa_txt",
                    caption: "jres:25200113", //RC 25200113 : Druh sankce
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "zpu_pl_txt",
                    caption: "jres:25200114", //RC 25200114 : Způsob platby
                    width: 150,
                    fragment: ""
                });
            return gridFormat;
        }

        private okClick(dto: Gordic.Spr.Interface.GSeznamPopDto): void {
            var that = this;
            console.log("Vybrane radky ", dto);
            that.close({ ixp_eko_dok: dto.ixp_eko_dok, vs: dto.vs });
            //this.dialogs.confirm("jres:25200127".format(druhRizeni.nazev?.toString())) //RC 25200127 : Opravdu chcete zvolit druh řízení {0}?
            //    .on('close', (ev, value) => {
            //        if (value === "yes") {
            //            that.close({ IxsDsr: druhRizeni.ixs_dsr });
            //        }
            //    });
        }
    }
}
