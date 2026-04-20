
namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;

    @gcontent
    export class GVyberZastupcu extends GContentBase {
        private grid: JQuery;
        private dataView: Gordic.Data.View;

        onContentReady() {
            var that = this;
            this.CreateMenu();

            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full", 
                    navigationMode: "row",
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: (ev, ctx) => {
                            var row = ctx.cellInfo.data;
                            that.okClick(row);
                        }
                    }),
                    columns: this.createGridFormat(),
                    searchColumns: ["ixs_esu"]
                });

            //dataView
            this.dataView = new Gordic.Data.View(undefined, { key: "ixs_esu" });

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
                        var selection: Gordic.Spr.Interface.GSeznamZastupcuDto[];
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
            var prom = this.call("LoadData")
                .done(function (ret) {
                    if (that.grid.hasClass("ggrid")) {
                        that.dataView.updateData(ret);
                        that.grid.ggrid("setData", that.dataView);
                    }
                });
            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto> {
            var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto>;
            gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto>();
            if ((window as any).ginisDebugMode) {
                gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
            }
            gridFormat = gridFormat
                .addTextColumn({
                    name: "ixs_esu_txt",
                    caption: "jres:25200130", //RC 25200130 : Název
                    width: 300,
                    fragment: ""
                })
                .addTextColumn({
                    name: "ixs_dva_nazev",
                    caption: "jres:25200131", //RC 25200131 : Typ
                    width: 300,
                    fragment: ""
                })
                .addTextColumn({
                    name: "poznamka",
                    caption: "jres:25200133", //RC 25200133 : Poznámka
                    width: 100,
                    fragment: ""
                })
                ;
            return gridFormat;
        }

        private okClick(subjekt: Gordic.Spr.Interface.GSeznamZastupcuDto): void {
            var that = this;
            console.log("Vybrane radky ", subjekt.ixs_esu);
            that.tryClose({ IxsEsu: subjekt.ixs_esu, TypVazby: subjekt.typ_vazby, PorZast: subjekt.por_zast, LicZast: subjekt.lic_zast });
        }
    }
}
