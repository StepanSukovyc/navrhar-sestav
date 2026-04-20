
namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;

    @gcontent
    export class GVyberDruhuRizeniProFunkci extends GContentBase {

        TypSr: number;
        ShowOkButton: boolean;
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
                    searchColumns: ["nazev", "typ_sr_txt"]
                });

            //dataView
            this.dataView = new Gordic.Data.View(undefined, { key: "ixs_dsr" });

            //this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
            that.loadData();
        }

        private CreateMenu(): void {
            const that = this;

            const commandBarPole: MenuParams[] = [];
            if (that.ShowOkButton) {
                commandBarPole.push({
                    action: that.actions.add(new GAction({
                        name: "actOk",
                        caption: "jres:25200124", //RC 25200124 : Vybrat
                        tooltip: "jres:25200124", //RC 25200124 : Vybrat
                        run: function () {
                            var selection: Gordic.Spr.Interface.GSeznamDruhuRizeniProOuoDto[];
                            selection = that.grid.ggrid("getSelection");
                            if (selection.length == 1) {
                                that.okClick(selection[0]);

                            }
                        }
                    })),
                    favorite: true,
                    customClass: "g-button--primary"
                });
            }
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

            var prom = this.call("GetDruhRizeniProFunkci")
                .done(function (ret) {
                    if (that.grid.hasClass("ggrid")) {
                        that.dataView.updateData(ret);
                        that.grid.ggrid("setData", that.dataView);
                    }
                });
            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDruhuRizeniProOuoDto> {
            var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDruhuRizeniProOuoDto>;
            gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDruhuRizeniProOuoDto>();
            if ((window as any).ginisDebugMode) {
                gridFormat = gridFormat.addTextColumn({ name: "ixs_dsr", caption: "IXS_DSR", width: 150, fixedWidth: false });
            }
            gridFormat = gridFormat
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:25200125", //RC 25200125 : Název druhu řízení
                    width: 300,
                    fragment: ""
                })
                .addTextColumn({
                    name: "typ_sr_txt",
                    caption: "jres:25200126", //RC 25200126 : Typ řízení
                    width: 300,
                    fragment: ""
                });
            return gridFormat;
        }

        private okClick(druhRizeni: Gordic.Spr.Interface.GSeznamDruhuRizeniProOuoDto): void {
            var that = this;
            console.log("Vybrane radky ", druhRizeni.ixs_dsr);
            this.dialogs.confirm("jres:25200127".format(druhRizeni.nazev?.toString())) //RC 25200127 : Opravdu chcete zvolit druh řízení {0}?
                .on('close', (ev, value) => {
                    if (value === "yes") {
                        that.close({ IxsDsr: druhRizeni.ixs_dsr });
                    }
                });
        }
    }
}
