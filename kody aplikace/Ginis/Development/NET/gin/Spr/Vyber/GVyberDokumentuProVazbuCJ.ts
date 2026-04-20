
namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;

    @gcontent
    export class GVyberDokumentuProVazbuCJ extends GContentBase {

        IxpSpis: string;
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
                    searchColumns: ["nazev"]
                });

            //dataView
            this.dataView = new Gordic.Data.View(undefined, { key: "ixp_spis, ixp" });

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
                        var selection: Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto[];
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

            var prom = this.call("LoadData")
                .done(function (ret) {
                    if (that.grid.hasClass("ggrid")) {
                        that.dataView.updateData(ret);
                        that.grid.ggrid("setData", that.dataView);
                    }
                });
            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto> {
            var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto>;
            gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto>();
            gridFormat = gridFormat
                .addTextColumn({
                    name: "ixp",
                    caption: "PID",
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "cj",
                    caption: "jres:25200243", //RC 25200243 : ČJ
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:25200244", //RC 25200244 : Název
                    width: 200,
                    fragment: ""
                })
                .addTextColumn({
                    name: "akt_znacka",
                    caption: "jres:25200245", //RC 25200245 : Značka
                    width: 150,
                    fragment: ""
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:25200246", //RC 25200246 : Odesílatel
                    width: 150,
                    fragment: ""
                });
            return gridFormat;
        }

        private closing(result): JQueryPromise<any> {
            return $.Deferred().resolve(result).promise();
        }

        //private okClick2(dok: Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto): void {
        //    this.tryClose({ Ixp: dok.ixp });
        //}

        private okClick(dok: Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto): void {
            var that = this;
            console.log("Vybrane radky ", dok.ixp);
            //this.dialogs.confirm("jres:25200247" + dok.ixp + "?") //RC 25200247 : Opravdu chcete zvolit dokument 
            //    .on('close', (ev, value) => {
            //        if (value === "yes") {
            //            that.tryClose({ Ixp: dok.ixp });
            //        }
            //    });

            // nepomohlo
            //this.dialogs.messageBox("jres:25200174", "jres:25200247" + dok.ixp + "?", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200174 : Dotaz
            //    .on("yes", function () {
            //        that.tryClose({ Ixp: dok.ixp });
            //    });

            this.dialogs.messageBox("jres:25200174", "jres:25200247" + dok.ixp + "?", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200174 : Dotaz
                .on("yes", function () {
                    that.close({ Ixp: dok.ixp });
                });



        }
    }
}
