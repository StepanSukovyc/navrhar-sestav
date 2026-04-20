namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailNemovitosti extends GDetailBuilderContent<
        Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions &
        ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> &
        Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions &
        ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions>> &
        Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto> &
        ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto>>>
    > implements IGContent {
        IxpSpis: string;
        Porcislo: number;
        //IxsDsr: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            //if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixp_spis: this.IxpSpis, por_cislo: this.Porcislo };
            //else this.model = { ixp: this.IxpSpis };

            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixp_spis: this.IxpSpis, por_cislo: this.Porcislo};

            //this.loadData(this).done(function () {
            //    that.setRezim(that.Rezim, that);
            //});
            this.onContentReadyBase(that);

            ResizeManager.forceRefresh(this.element.get(0)!);
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            builder.withComponent<this>("nemovitostDetail", {
                //tabGroups:
                //{
                //    tabGroupZakladni:
                //    {
                //        caption: "Profil nemovitosti"
                //    },
                //},
                tabs:
                {
                    tabZakladni:
                    {
                        //tabParams: {
                        //    opened: true, locked: true, group: { id: "tabGroupZakladni" },
                        //},
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                            //that.findFields("adresa_ruian").gfield("getButton", "selector").gbutton("option", "params").action!.enabled(false);
                        }
                    }
                }
                //actions:
                //{
                //},
                //menuBar: [
                //    {
                //        id: "menuNemovitost", caption: "jres:25200466", type: "static", after: "akce", children: [ //RC 25200466 : Nemovitost
                //            //{ id: "menuTiskSablony", action: "actTiskSablony", favorite: false },
                //        ]
                //    }
                //],
                //headerForm: this.createForm()
            }, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
            var that = this;

            this.showRestore = false;

            var _afterDelete = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions) {
                content.tryClose();
            };

            if (that.RezimDetailu== Gordic.Gin.Interface.RegSpa.GRezimContentu.View) {
                that.listControls_setup({
                    rowToDto: function (gridState) {
                        //var gTabManager = that.find(".gtabmanager");
                        //var active;
                        //if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                        //return { Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, PorCislo: gridState.currentRow.data.por_cislo, selectedTabGroup: active };
                        return { Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, PorCislo: gridState.currentRow.data.por_cislo };
                    },
                    nextItemTemplate: "jres:25200473", //RC 25200473 : Následující záznam<br>Parcela: {cislo_par_nazev}
                    prevItemTemplate: "jres:25200474" //RC 25200474 : Předchozí záznam<br>Parcela: {cislo_par_nazev}
                });
            }

            this.afterDelete = _afterDelete;

            this.enableActions = function (enable: boolean) {                
                //that.actions.actTiskSablony!.enabled(!enable && that.model.Permissions.CanTiskSablony.value);

                that.changeAktivitaComponentEnableActions(enable);
                //$.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.dotcSubjUkonuTab).enableActions();
            };

            this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions): JQueryPromise<any> {
                var prom = $.Deferred();
                var that = this;
                var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
                //var gTabManager = that.find(".gtabmanager");
                //if (!readOnly) gTabManager.gtabmanager("setActive", "tabGroupZakladni");
                //gTabManager.gtabmanager("visibleGroup", "tabGroupDotcSubjUkonu", readOnly);
                //this.afterLoadDataForTab(this.dotcSubjUkonuTab);
                return prom;
            };
        }

        //afterLoadDataForTab(tabControl: JQuery<HTMLElement>) {
        //    if (tabControl) {
        //        const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(tabControl);
        //        if (tabCnt != null && typeof (tabCnt.reloadData) === "function") {
        //            tabCnt.reloadData();
        //        }
        //    }
        //}

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            var form = new Gordic.Forms.Form({ tabLabel: "jres:25200467", opened: true }) //RC 25200467 : Detail nemovitosti
                .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25200468") //RC 25200468 : Druh pozemku
                .addField("gstringbox", "w-12 w-L-6", { name: "druh_poz_nazev", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200469") //RC 25200469 : Obec
                .addField("gstringbox", "w-12 w-L-6", { name: "obec_nazev", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200470") //RC 25200470 : Katastrální území
                .addField("gstringbox", "w-12 w-L-6", { name: "kat_uzemi_nazev", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200471") //RC 25200471 : Výměra
                .addField("gnumberbox", "w-L-2 w-M-6", {
                    name: "vymera_par", customClass: "enabled", disabled: readOnly, emptyValue: null,
                    validators: [new Gordic.Validators.Required()],
                    flag: "required" })
                .addRow("jres:25200472") //RC 25200472 : Číslo parcely
                .addField("gstringbox", "w-L-4 w-M-6", { name: "cislo_par_nazev", disabled: readOnly })
                ;
            return form;
        }

   //     private _reloadData(): void {
   //         //var gTabManager = this.find(".gtabmanager");
   //         //var active;
   //         //if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
   //         this.zmena = true;
   //         //this.load({ RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, internal: true, selectedTabGroup: active });
   //         this.load({ RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, internal: true });
   //     }
   }
}

