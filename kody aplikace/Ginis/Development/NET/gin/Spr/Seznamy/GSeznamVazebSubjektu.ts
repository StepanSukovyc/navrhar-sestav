
namespace Gordic.Spr.WebApp {

    var gcontent = Decorators.gcontent;
    @gcontent
    export class GSeznamVazebSubjektu extends GContentBase {
        IxpSpis: string;
        TypVzVazby: number;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
        private grid: JQuery;
        private dataView: Gordic.Data.View;

        onContentReady() {
            var that = this;

            this.actions.addRange({
                actPridatZastupce:
                {
                    caption: "jres:25200180", //RC 25200180 : Přidat
                    icon: "gi-plus",
                    visible: that.TypVzVazby == Gordic.Spr.Interface.TypVzVazbyEnum.Zastupci,
                    run: function (ev, obj) {
                        var width = 850;
                        var height = 650;
                        var modal = true;
                        that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberZastupcu", {}], {
                            IxpSpis: that.IxpSpis,
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, retValue) => {
                                if (retValue && retValue.IxsEsu) {
                                    that.call("Pridat", { ixsEsu: retValue.IxsEsu, typVazby: retValue.TypVazby, porZast: retValue.PorZast, licZast: retValue.LicZast }).done((data) => {
                                        that.loadData().done(function () {
                                            //that.grid.ggrid("activeRow", row.ixs_rad);
                                        });
                                    });
                                }
                            });
                    }
                },
                actPridatZastupovaneho:
                {
                    caption: "jres:25200180", //RC 25200180 : Přidat
                    icon: "gi-plus",
                    visible: that.TypVzVazby == Gordic.Spr.Interface.TypVzVazbyEnum.Zastupovani,
                    run: function (ev, obj) {
                        var width = 850;
                        var height = 650;
                        var modal = true;
                        that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDotcenehoSubjektu", {}], {
                            IxpSpis: that.IxpSpis,
                            IxsEsu: that.IxsEsu,
                            TypVazby: that.TypVazby,
                            LicZast: that.LicZast,
                            PorZast: that.PorZast,
                            Jednotlive: false,
                            BezZastupcu: true,
                            Zastupovani: true,
                        }, { width: width, height: height, modal: modal })
                            .on("close", (ev, retValue) => {
                                that.loadData().done(function () {
                                    //that.grid.ggrid("activeRow", row.ixs_rad);
                                });
                            });
                    }
                },
                actOdstranit:
                {
                    caption: "jres:25200172", //RC 25200172 : Odstranit
                    icon: "fa-times-circle",
                    run: function (ev, ctx) {
                        that.odstranit();
                    }
                },
            });

            this.menuBar([
                { action: that.actions.actPridatZastupce, favorite: true },                                         
                { action: that.actions.actPridatZastupovaneho, favorite: true },                                    
                { action: that.actions.actOdstranit, favorite: true },                                              
                { action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent())), favorite: true }   // Zavřít
            ]);

            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full",
                    //defaultAction: that.actions.actDetail,
                    columns: this.createGridFormat(),
                    multi: true,
                    //searchColumns: ["ixp_spis"]
                });

            //dataView
            this.dataView = new Gordic.Data.View(undefined, { key: "ixp_spis" });

            that.loadData();
        }

        odstranit(): void {
            var that = this;
            console.log("odstranit()");

            var msg = "jres:25200173";  //RC 25200173 : Opravdu si přejete odstranit vybraný záznam?
            var selection: Gordic.Spr.Interface.GSeznamVazebSubjektuDto[];
            selection = that.grid.ggrid("getSelection");
            if (selection.length > 1)
                msg = "jres:25200437"; //RC 25200437 : Opravdu si přejete odstranit vybrané záznamy?

            console.log(selection);
            that.dialogs.messageBox("jres:25200174", msg, GDlg.mbbYesNo, GDlg.mbiQuestion)
                .on("yes", function () {
                    that.call("DeleteMulti", { detailDtoArray: selection }).done((data) => {
                        that.showFlash("jres:25200175", "g-state-success", 3000, "flash"); //RC 25200175 : Odstraněno
                        that.loadData().done(function () {
                            //that.grid.ggrid("activeRow", row.ixs_rad);
                        });
                    });
                });
        }

        //nahrani dat
        public loadData(filter?: Object): JQueryPromise<any> {
            var that = this;
            var prom = this.call("LoadData", { })
                .done(function (ret) {
                    if (that.grid.hasClass("ggrid")) {
                        that.dataView.updateData(ret);
                        that.grid.ggrid("setData", that.dataView);
                    }
                });
            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVazebSubjektuDto> {
            var gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVazebSubjektuDto>();

            if (this.TypVzVazby == Gordic.Spr.Interface.TypVzVazbyEnum.Zastupci) {
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "ixs_esu_1_txt",
                        caption: "jres:25200083", //RC 25200083 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ixs_dva_1_nazev",
                        caption: "jres:25200170", //RC 25200170 : Typ
                        width: 300,
                        fragment: ""
                    })
            }
            else if (this.TypVzVazby == Gordic.Spr.Interface.TypVzVazbyEnum.Zastupovani) {
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "ixs_esu_2_txt",
                        caption: "jres:25200083", //RC 25200083 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ixs_dva_2_nazev",
                        caption: "jres:25200170", //RC 25200170 : Typ
                        width: 300,
                        fragment: ""
                    })
            }
            return gridFormat;
        }
    }
}
