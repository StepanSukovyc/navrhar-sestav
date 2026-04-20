
namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;

    @gcontent
    export class GVyberDotcenehoSubjektu extends GContentBase {
        //IxpSpis: string;
        //TypVazby: number;
        //IxsDva: string;
        //BezZastupcu: boolean;
        Jednotlive: boolean;
        Zastupovani: boolean;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
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
                            if (that.Jednotlive) {
                                var row = ctx.cellInfo.data;
                                that.okClick(row);
                            }
                        }
                    }),
                    multi: !that.Jednotlive,
                    columns: this.createGridFormat(),
                    searchColumns: ["ixs_esu"]
                });

            //dataView
            this.dataView = new Gordic.Data.View(undefined, { key: "ixs_esu" });

            //this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
            that.loadData();
        }

        private CreateMenu(): void {
            const that = this;

            const commandBarPole: MenuParams[] = [];
            if (that.Jednotlive) {
                commandBarPole.push({
                    action: that.actions.add(new GAction({
                        name: "actOk",
                        caption: "jres:25200124", //RC 25200124 : Vybrat
                        tooltip: "jres:25200124", //RC 25200124 : Vybrat
                        run: function () {
                            var selection: Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto[];
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
            if (!that.Jednotlive) {
                commandBarPole.push({
                    action: that.actions.add(new GAction({
                        name: "actPridatDotcSubj",
                        caption: "jres:25200180", //RC 25200180 : Přidat
                        tooltip: "jres:25200180", //RC 25200180 : Přidat
                        run: function () {
                            that.pridatDotcSubj()
                                //.done(function (retval) {
                                //    that.tryClose();

                                //    //// Reakce na návratovou hodnotu dialogu.
                                //    //if (retval && retval.ulozeno) {
                                //    //    _content.tryReloadDetail();
                                //    //}
                                //})
                                ;
                        }

                        //run: function () {
                        //    var selection: Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto[];
                        //    selection = that.grid.ggrid("getSelection");
                        //    if (selection.length > 0) {
                        //        selection.forEach(function (row) {
                        //            that.pridatDotcSubj(row)
                        //        });
                        //    //that.tryClose();
                        //    }
                        //}
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
                    name: "zastupce",
                    caption: "jres:25200132", //RC 25200132 : Zástupce subjektu
                    width: 100,
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

        private okClick(subjekt: Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto): void {
            var that = this;
            console.log("Vybrane radky ", subjekt.ixs_esu);
            this.dialogs.confirm("jres:25200135" + subjekt.ixs_esu_txt + "?") //RC 25200135 : Opravdu chcete zvolit dotčený subjekt 
                .on('close', (ev, value) => {
                    if (value === "yes") {
                        that.close({ IxsEsu: subjekt.ixs_esu, PorZast: subjekt.por_zast, LicZast: subjekt.lic_zast });
                    }
                });
        }

        private pridatDotcSubj(): void {
            var that = this;
            var l_sText = "";
            var selection: Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto[];
            selection = that.grid.ggrid("getSelection");
            if (selection.length > 0) {
                if (that.Zastupovani)
                    l_sText = "jres:25200440"; //RC 25200440 : Označené subjekty budou zařazeny jako zastupovaní.;Chcete Pokračovat?
                else
                    l_sText = "jres:25200182"  //RC 25200182 : Označené subjekty budou zařazeny jako dotčené subjekty úkonu.\nChcete Pokračovat?

                this.dialogs.confirm(l_sText)
                    .on('close', (ev, value) => {
                        if (value === "yes") {
                            that.call("PridatDotcSubjMulti", { detailDtoArray: selection }, {
                                IdEsu: that.IxsEsu, TypVazby: that.TypVazby, LicZast: that.LicZast, PorZast: that.PorZast
                            }).done(function () {
                                that.tryClose();
                            });


                        }
                    });
            }
        }
    }
}
