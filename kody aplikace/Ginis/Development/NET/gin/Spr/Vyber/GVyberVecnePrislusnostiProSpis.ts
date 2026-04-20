namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;
    @gcontent
    export class GVyberVecnePrislusnostiProSpis extends GContentBase { 
        typVazby: string;
        ixpSpis: string;
        width: number;
        height: number;
        TypSr: number;
        DruhZar: number;
        FilterDateFrom: string;
        FilterDateTo: string;
        ZnackaTextDBParam: string;
        private grid: JQuery;

        onContentReady() {
            var that = this;

            this.CreateMenu()
            that.loadData(); //that
            
            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    defaultAction: new GAction({
                        name: "actShow",
                        run: function (ev, ctx) {
                            that.okClick(ctx.cellInfo.data)
                        }
                    }),
                    columnMode: "full",
                    navigationMode: "row",
                    columns: this.createGridFormat(),
                    searchColumns: ["zakon_txt", "poznamka"]
                });

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
                        var selection: Gordic.Spr.Interface.GSeznamVprDto[];
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

        private okClick(vecnaPrislusnost: Gordic.Spr.Interface.GSeznamVprDto): void {
            var that = this;
            that.tryClose({ ixs_vpr: vecnaPrislusnost.ixs_vpr, ixp_spis: this.ixpSpis }); 
        }

        //nahrani dat
        public loadData(filter?: Object): JQueryPromise<any> {
            var that = this;
            if (filter == undefined)
                filter = new Object();

            var prom = this.call("LoadData", { filter: filter })
                .done(function (ret) {
                    if (that.grid.hasClass("ggrid")) {
                        that.grid.ggrid("setData", ret);
                    }
                });
            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVprDto> {
            // Věcná příslušnost - zařízení
            if (this.typVazby == "10") {
                return new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVprDto>()
                    .addTextColumn({
                        name: "pismeno",
                        caption: "jres:25500104", //RC 25500104 : Písmeno
                        width: 120,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "poznamka",
                        caption: "jres:25500113", //RC 25500113 : Popis zařízení
                        width: 300,
                        fragment: ""
                    })
            }
            // Věcná příslušnost - státní dozor
            else if (this.typVazby == "20") {
                return new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVprDto>()
                    .addTextColumn({
                        name: "kategorie",
                        caption: "jres:25500105", //RC 25500105 : Číslo kategorie
                        width: 120,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "zakon_txt",
                        caption: "jres:25500106", //RC 25500106 : Kategorie nedostatků
                        width: 350,
                        fragment: ""
                    })
            }
            // Věcná příslušnost - obecná
            else {
                return new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVprDto>()
                .addTextColumn({
                    name: "zakon_txt",
                    caption: "jres:25500114", //RC 25500114 : Název věcné příslušnosti
                    width: 300,
                    fragment: ""
                })
                .addTextColumn({
                    name: "poznamka",
                    caption: "jres:25200058", //RC 25200058 : Poznámka
                    width: 300,
                    fragment: ""
                })
            }
        }
    }
}
