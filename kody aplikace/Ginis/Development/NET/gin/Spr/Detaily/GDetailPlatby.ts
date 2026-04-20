namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailPlatby extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpSpis: string;
        RadekPop: number;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        EkoMode: boolean;
        private m_oActVybratDotcenySubjekt: GAction;

        onContentReady() {
            var that = this;
                        
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = {
                ixp_spis: this.IxpSpis, radek_pop: this.RadekPop
            };
            this.loadData(this).done(function () {
                that.setRezim(that.Rezim, that);
            });
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            builder.withComponent<this>("platbyDetail", {
                tabs:
                {
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                        }
                    },
                },
                actions:
                {
                    actVybratDotcenySubjekt:
                    {
                        name: "actVybratDotcenySubjekt",
                        icon: "gi-dots",
                        captionVisible: GAction.captionVisibility.never,
                        tooltip: "jres:25200123", //RC 25200123 : Dotčené subjekty
                        run: function (ev, obj) {
                            var width = 850;
                            var height = 650;
                            var modal = true;
                            var $form = $(ev.target).gform().findForms();
                            that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDotcenehoSubjektu", {}], { IxpSpis: that.IxpSpis, Jednotlive: true }, { width: width, height: height, modal: modal })
                                .on("close", (ev, retValue) => {
                                    console.log("IXS_ESU");
                                    if (retValue != undefined && retValue.IxsEsu != undefined) {
                                        console.log(retValue.IxsEsu);
                                        that.model.ixs_esu = retValue.IxsEsu;
                                        $form.findFields("ixs_esu").gfield("model", "apply", that.model);
                                    }
                                })
                        }
                    },
                    actZapisDoDdp:
                    {
                        caption: "jres:25200153", //RC 25200153 : DDP
                        tooltip: "jres:25200151", //RC 25200151 : Zápis do DDP
                        run: function (ev, obj) {
                            console.log("actZapisDoDdp");
                            that.GetZapisDoDdpParams().then(function (ret) {
                                Gordic.Spr.Dialogs.ZapisDoDdpDlg(
                                    that,
                                    {
                                        IxpSpis: that.model.ixp_spis,
                                        RadekPop: that.model.radek_pop, 
                                        VysePlatby: that.model.c_pop,
                                        IxpDdpSpol: (ret as any).IxpDdpSpol,
                                        VSSpol: (ret as any).VSSpol
                                    },
                                    Gordic.Global.Enums.ModOtevreni.showModalWindow
                                )
                                    .done(function (r) {
                                        if (r != undefined && r.Zmena) {
                                            console.log("zapsano do DDP");
                                            that.zmena = true;
                                            that.reloadData(that);
                                        }
                                    });
                            });
                        }
                    },
                    actZapisDoPokladny:
                    {
                        caption: "jres:25200154", //RC 25200154 : Pokladna
                        tooltip: "jres:25200152", //RC 25200152 : Zápis do pokladny
                        enabled: false, // ve starem LK bylo vzdy false
                        run: function (ev, obj) {
                            console.log("actZapisDoPokladny");
                        }
                    },
                    actStavPlatbyDdp:
                    {
                        caption: "jres:25200155", //RC 25200155 : Přepočet stavu
                        tooltip: "jres:25200155", //RC 25200155 : Přepočet stavu
                        run: function (ev, obj) {
                            console.log("actStavPlatbyDdp");
                            that.call("StavPlatbyDdp", { detailDto: that.model })
                                .done(function () {
                                    that.reloadData(that);
                                });
                        }
                    }
                },
                menuBar: [
                    {
                        id: "menuPlatby", caption: "jres:25200404", type: "static", after: "akce", children: [ //RC 25200404 : Platby
                                { id: "menuZapisDoDdp", action: "actZapisDoDdp", favorite: true, visible: that.EkoMode },
                                { id: "menuZapisDoPokladny", action: "actZapisDoPokladny", favorite: true, visible: false },    // ve starem LK bylo vzdy false
                                { id: "menuStavPlatbyDdp", action: "actStavPlatbyDdp", favorite: true }
                            ]
                    }
                ]
            }, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
            var that = this;

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
            this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam

            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou

                if (that.EkoMode)
                    that.findFields("ixp_eko_dok").gformrow().show();   // Ve starem se dok pouze zobrazuje, ale nikde neskryva. Pro jistotu ponecham stejne.

                // toto funguje, ale udelam to jinak
                //UpravRequiredNaFieldu(that, "ixs_esu", that.EkoMode);
                //Gordic.Utils.Form.markRequired(that.findForms());
            }
            this.enableActions = function (enable: boolean) {                
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
                //that.actions["actStavPlatbyDdp"]!.enabled(enable && that.LzePovolitStavPlatbyDdp(that.findFields("ixp_eko_dok").gfield("getValue")));
                that.actions["actStavPlatbyDdp"]!.enabled(that.LzePovolitStavPlatbyDdp(that.findFields("ixp_eko_dok").gfield("getValue")));   // ve starem LK nezavisi na enable
                that.actions["actZapisDoDdp"]!.enabled(!enable);
                that.actions["actZapisDoPokladny"]!.enabled(false);  // ve starem LK bylo vzdy false
            };
            this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions): JQueryPromise<any> {
                var prom = $.Deferred();
                if (content.model != undefined) {
                    if (content.model.typ_eko == 10)
                        content.findFields("ixp_eko_dok").gformrow("setLabel", "jres:25200158"); //RC 25200158 : ID pokl. dok.
                    if (content.model.typ_eko == 20)
                        content.findFields("ixp_eko_dok").gformrow("setLabel", "jres:25200159"); //RC 25200159 : ID pohl.
                }
                return prom;
            }
        };

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");

            var form = new Gordic.Forms.Form({ tabLabel: "jres:25200165", opened: true }) //RC 25200165 : Platba
                .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0" })
                .addRow("jres:25200137") //RC 25200137 : Subjekt
                .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                    typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                    Logovani: {
                        // zadání logovacích údaju je nutnost hlavně IXP
                        Ixp: that.IxpSpis,
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                        AktZnacka: "",
                        DuvodHledaniTxt: VyberEsu_DuvodHledaniTxt
                    }
                }), {
                    name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: that.EkoMode ? [new Gordic.Validators.Required()] : [],
                    buttons: [{
                        requireEdit: true,
                        action: that.actions.actVybratDotcenySubjekt
                    }]
                })
                .addRow("jres:25200138") //RC 25200138 : Druh platby/sankce
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprcdplDto(), {
                    name: "druh_pl", model: "model.druh_pl=value.druh_pl", customClass: "enabled", dropdown: true, placeholder: "jres:25200139",
                    serverFilters: { druh_pl: [10, 20, 30, 40, 50] },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required"
                }) //RC 25200139 : Platby
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprcdsaDto(), {
                    name: "druh_sa", model: "model.druh_sa=value.druh_sa", customClass: "enabled", dropdown: true, placeholder: "jres:25200140",  //RC 25200140 : Sankce
                    validators: [new Gordic.Validators.Required()],
                    flag: "required"
                })
                .addRow("jres:25200143")  //RC 25200143 : Výše/způsob platby
                .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), { name: "c_pop", customClass: "enabled", placeholder: "jres:25200141" }) //RC 25200141 : Výše platby
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprczpuDto(), {
                    name: "zpu_pl", model: "model.zpu_pl=value.zpu_pl", customClass: "enabled", dropdown: true, placeholder: "jres:25200142", //RC 25200142 : Způsob platby
                    validators: [new Gordic.Validators.Required()],
                    flag: "required"
                })
                .addSection({ customClass: "w-L-6 w-M-6", layoutDescriptor: "L-4-8-0, M-6-6-0, S-12-12-0" })
                .addRow("jres:25200144") //RC 25200144 : Datum výzvy
                .addField("gdatebox", { name: "dat_vyzvy", model: "model.dat_vyzvy=value", valueType: "date", customClass: "enabled" })
                .addRow("jres:25200145") //RC 25200145 : Datum platby
                .addField("gdatebox", { name: "dat_zapl", model: "model.dat_zapl=value", valueType: "date", customClass: "enabled" })
                .addRow("jres:25200146") //RC 25200146 : Datum vrácení
                .addField("gdatebox", { name: "dat_vraceni", model: "model.dat_vraceni=value", valueType: "date", customClass: "enabled" })
                .addSection({ name: "sec_doklad", customClass: "w-L-6 w-M-6", layoutDescriptor: "L-3-9-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25200147") //RC 25200147 : Doklad
                .addField("gstringbox", {
                    name: "ixp_eko_dok", disabled: true, 
                    change: function (ev, changeObj) {
                        //that.actions["actStavPlatbyDdp"]!.update({ enabled: that.LzePovolitStavPlatbyDdp(changeObj.value) && !that.readOnly });
                        that.actions["actStavPlatbyDdp"]!.update({ enabled: that.LzePovolitStavPlatbyDdp(changeObj.value) }); // ve starem LK nezavisi na readOnly
                    },
                })    
                .addRow("jres:25200148") //RC 25200148 : VS
                .addField("gstringbox", { name: "vs", customClass: "enabled" })
                .addRow("jres:25200149") //RC 25200149 : KS
                .addField("gstringbox", { name: "ks", customClass: "enabled" })
                .addRow("jres:25200150") //RC 25200150 : SS
                .addField("gstringbox", { name: "ss", customClass: "enabled" })
                ;
            return form;
        }

        LzePovolitStavPlatbyDdp(DokValue: string | null): boolean {
            return DokValue === null || DokValue === "" ? false : true;
        } 

        GetZapisDoDdpParams(): JQueryPromise<object>  {
            var def = $.Deferred();
            var that = this;

            if (this.model.ixp_eko_dok != null && this.model.ixp_eko_dok != "") {
                def.resolve({ IxpDdpSpol: null, VSSpol: null });
            }
            else {
                if (this.model.pocet_eko_dok == "0") {
                    //Pokud pro daný subjekt ještě neexistuje pohledávka
                    def.resolve({ IxpDdpSpol: null, VSSpol: null });
                } else {

                    if (this.model.ixp_eko_dok_spol != null && this.model.ixp_eko_dok_spol != "") {
                        //Pokud pro daný subjekt existuje jedna společná (stejná) pohledávka
                        this.dialogs.confirm("jres:25200416") //RC 25200416 : Pro daný subjekt v tomto správním řízení je již evidována pohledávka.;Chcete tuto platbu připojit jako další předpis?
                            .on('close', (ev, retValue) => {
                                if (retValue === "yes") {
                                    //Pokud chce uživatel napojit na společnou (stejnou) pohledávku
                                    def.resolve({ IxpDdpSpol: that.model.ixp_eko_dok_spol, VSSpol: that.model.vs_spol });
                                }
                                else if (retValue === "no") {
                                    //Pokud nechce uživatel napojit na společnou (stejnou) pohledávku
                                    def.resolve({ IxpDdpSpol: null, VSSpol: null });
                                }
                            });
                    } else {
                        //Pokud pro daný subjekt existuje více než jedna pohledávka - zobrazím jejich výběr
                        this.dialogs.confirm("jres:25200417") //RC 25200417 : Pro daný subjekt v tomto správním řízení jsou již evidovány pohledávky.;Chcete tuto platbu připojit jako další předpis?
                            .on("close", (ev, retValue) => {
                                if (retValue === 'yes') {
                                    //Pokud chce uživatel napojit na vybranou pohledávku
                                    var width = 950;
                                    var height = 800;
                                    var modal = true;
                                    that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberPohledavkySubjektu", {}],
                                        { IxpSpis: that.IxpSpis, IxsEsu: that.model.ixs_esu }, { width: width, height: height, modal: modal })
                                        .on("close", (ev, retValue) => {
                                            if (retValue != undefined && retValue.ixp_eko_dok != undefined && retValue.vs != undefined) {
                                                console.log(retValue);
                                                //Pokud chce uživatel napojit na vybranou pohledávku
                                                def.resolve({ IxpDdpSpol: retValue.ixp_eko_dok, VSSpol: retValue.vs });
                                            }
                                            else {
                                                def.reject();
                                            }
                                        });
                                }
                                else if (retValue === 'no') {
                                    //Pokud nechce uživatel napojit na společnou (stejnou) pohledávku
                                    def.resolve({ IxpDdpSpol: null, VSSpol: null});
                                }
                        });
                    }
                }
            }
            return def.promise();
        }
    }
}