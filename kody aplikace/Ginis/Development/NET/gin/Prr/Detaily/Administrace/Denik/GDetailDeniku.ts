namespace Gordic.Prr.UIWebClient {
    var gcontent = Decorators.gcontent;



    @gcontent
    export class GDetailDeniku extends GDetailBuilderContent<
            Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> &
            Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> &
            Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions &
            ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>
        > implements IGContent {        
        IxsRad?: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        povoleniDenikuTab: JQuery<HTMLElement>;
        formulareDenikuTab: JQuery<HTMLElement>;
        dukazyDenikuTab: JQuery<HTMLElement>;
        castkyUdalostiDenikuTab: JQuery<HTMLElement>;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = { ixs_rad: this.IxsRad };
            else
            {
                if (!this.Mp) this.model = { typ_den: 10 };
                else this.model = { typ_den: 20 };
            }
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
            builder.withComponent<this>("DetailDeniku", {                
                tabGroups:
                {
                    tabGroupDenik:
                    {
                        caption: "jres:25800020" //RC 25800020 : Deník                        
                    },
                    tabGroupPovoleniDeniku:
                    {
                        caption: "jres:25800045" //RC 25800045 : Povolení deníku
                    },
                    tabGroupFormulareDeniku:
                    {
                        caption: "jres:25800052" //RC 25800052 : Napojení na formuláře
                    },
                    tabGroupDukazyDeniku:
                    {
                        caption: "jres:25800061" //RC 25800061 : Důkazy
                    },
                    tabGroupCastkyUdalostiDeniku:
                    {
                        caption: "jres:25800067" //RC 25800067 : Přednastavení částek
                    }
                },
                tabs:
                {
                    tabZakladni:
                    {
                        //tabParams: {
                        //    //title: "Deník", opened: true, group: { id:"tabGroupDenik" }
                        //    opened: true, locked: true, group: { id:"tabGroupDenik" }
                        //},   
                        group: { id: "tabGroupDenik" },
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                            //that.findFields("adresa_ruian").gfield("getButton", "selector").gbutton("option", "params").action!.enabled(false);
                        },
                        
                    },
                    tabPovoleniDeniku:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupPovoleniDeniku" }
                        },                         
                        contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GPovoleniDenikuControl(that, that.Mp)),
                        init: function (tab) {      
                            that.povoleniDenikuTab = tab;
                        }
                    },
                    tabFormulareDeniku:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupFormulareDeniku" }
                        },
                        contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GFormularDenikuControl(that, that.Mp)),
                        init: function (tab) {
                            that.formulareDenikuTab = tab;
                        }
                    },
                    tabDukazyDeniku:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupDukazyDeniku" }
                        },
                        contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GDukazDenikuControl(that, that.Mp)),
                        init: function (tab) {
                            that.dukazyDenikuTab = tab;
                        }
                    },
                    tabCastkyUdalostiDeniku:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupCastkyUdalostiDeniku" }
                        },
                        contentParams: GContent.createInitializer(Gordic.Prr.UIWebClient.GCastkaUdalostiDenikuControl(that, that.Mp)),
                        init: function (tab) {
                            that.castkyUdalostiDenikuTab = tab;
                        }
                    }
                },
                actions:
                {
                    //actOveritIco:
                    //{
                    //    caption: "jres:25800040", //RC 25800040 : Ověřit v ROS
                    //    icon: "gi-ros",
                    //    run: function (this: GAction, ev, ctx) {
                    //        return that.call("OveritIco", { detailDto: that.model })
                    //            .done(() => {
                    //                that.zmena = true;
                    //                that.showFlash("jres:25800041", "g-state-success", 3000, "flash"); //RC 25800041 : Ověřeno                                    
                    //                that.reloadData(that);
                    //            })
                    //    }
                    //},
                    //actPridelitIco:
                    //{
                    //    caption: "jres:25800060", //RC 25800060 : Přidělit IČO
                    //    icon: "gi-ros",
                    //    run: function (this: GAction, ev, ctx) {
                    //        return that.call("PridelitIco", { detailDto: that.model })
                    //            .done(() => {
                    //                that.zmena = true;
                    //                that.showFlash("jres:25800045", "g-state-success", 3000, "flash"); //RC 25800045 : Přiděleno
                    //                that.reloadData(that);
                    //            })
                    //    }
                    //},
                    //actZapsatDoRos:
                    //{
                    //    caption: "jres:25800057", //RC 25800057 : Zapsat do ROS
                    //    icon: "gi-ros",
                    //    run: function (this: GAction, ev, ctx) {
                    //        return that.call("ZapsatDoRos", { detailDto: that.model })
                    //            .done(() => {
                    //                that.zmena = true;
                    //                that.showFlash("jres:25800058", "g-state-success", 3000, "flash"); //RC 25800058 : Zapsáno do ROS
                    //                that.reloadData(that);
                    //            })
                    //    }
                    //},
                    //actPrilohy:
                    //{
                    //    caption: "jres:25800046", //RC 25800046 : Přílohy
                    //    icon: "gi-attachment",
                    //    run: function (this: GAction, ev, ctx) {
                    //        return Gordic.Wfl.Dialogs.GPrilohyDlg(that, { Ixp: that.model.ixp }, Gin.Globals.Enums.ModOtevreni.showModalWindow);
                    //    }
                    //}
                },
                menuBar: [
                    //{ id: "prilohy", action: "actPrilohy", favorite: true, after: "cinnosti" },
                    //{ id: "overeniIco", action: "actOveritIco", favorite: true, after: "prilohy" },
                    //{ id: "pridelitIco", action: "actPridelitIco", favorite: true, after: "overeniIco" },
                    //{ id: "zapsatDoRos", action: "actZapsatDoRos", favorite: true, after: "pridelitIco" }
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
            this.detailMoveComponentNextTemplate = "jres:25800021"; //RC 25800021 : Následující záznam<br>Název: {nazev}
            this.detailMoveComponentPrevTemplate = "jres:25800022"; //RC 25800022 : Předchozí záznam<br>Název: {nazev}

            this.enableFields = function (enable: boolean) {

                this.defaultForm!.findFields(".enabled").gfield("option", "disabled", !enable);

                var gTabManager = that.find(".gtabmanager");

                if (enable) gTabManager.gtabmanager("setActive", "tabGroupDenik");
                
                gTabManager.gtabmanager("visibleGroup", "tabGroupPovoleniDeniku", !enable);
                gTabManager.gtabmanager("visibleGroup", "tabGroupFormulareDeniku", !enable);                    
                gTabManager.gtabmanager("visibleGroup", "tabGroupDukazyDeniku", !enable);                    
                gTabManager.gtabmanager("visibleGroup", "tabGroupCastkyUdalostiDeniku", !enable);                    
               
            };

            this.enableActions = function (enable: boolean) {
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);            
                
                //that.actions.actPrilohy!.enabled(!enable && that.model.Permissions.CanUpdate.value);
                //that.actions.actPridelitIco!.enabled(!enable && that.model.Permissions.CanAssignIco.value);
                //that.actions.actPridelitIco!.visible(that.model.Permissions.CanAssignIco.value);
                //that.actions.actZapsatDoRos!.enabled(!enable && that.model.Permissions.CanInsertRos.value);
                //that.actions.actZapsatDoRos!.visible(that.model.Permissions.CanInsertRos.value);
                //that.actions.actOveritIco!.enabled(!enable && that.model.Permissions.CanVerify.value);
                //that.actions.actOveritIco!.visible(that.model.Permissions.CanVerify.value);
            }; 
            
            this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions): JQueryPromise<any> {
                console.log("afterLoadData");

                var prom = $.Deferred();

                this.element.on("gtabmanageropen", function (ev, ctx) {

                    console.log("gtabmanageropen");
                    tabChange(ctx.id);
                });

                if (this.povoleniDenikuTab) {
                    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.povoleniDenikuTab);
                    tabCnt.loadedData = false;
                }
                if (this.formulareDenikuTab) {
                    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.formulareDenikuTab);
                    tabCnt.loadedData = false;
                }
                if (this.dukazyDenikuTab) {
                    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.dukazyDenikuTab);
                    tabCnt.loadedData = false;
                }
                if (this.castkyUdalostiDenikuTab) {
                    const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.castkyUdalostiDenikuTab);
                    tabCnt.loadedData = false;
                }

                var gTabManager = that.find(".gtabmanager");
                var active = gTabManager.gtabmanager("getActive");

                if (active != null) tabChange(active);

                return prom;
            };

            var tabChange = function (idTab: string) {
               
                switch (idTab) {
                    case "tabGroupPovoleniDeniku":
                        if (that.povoleniDenikuTab) {
                            const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.povoleniDenikuTab);
                            if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                                tabCnt.reloadData();
                            }
                        }
                        break;
                    case "tabGroupFormulareDeniku":
                        if (that.formulareDenikuTab) {
                            const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.formulareDenikuTab);
                            if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                                tabCnt.reloadData();
                            }
                        }
                        break;
                    case "tabGroupDukazyDeniku":
                        if (that.dukazyDenikuTab) {
                            const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.dukazyDenikuTab);
                            if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                                tabCnt.reloadData();
                            }
                        }
                        break;
                    case "tabGroupCastkyUdalostiDeniku":
                        if (that.castkyUdalostiDenikuTab) {
                            const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.castkyUdalostiDenikuTab);
                            if (typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                                tabCnt.reloadData();
                            }
                        }
                        break;
                }
            };
        };

        

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var gridFormatKniha = new Gordic.Data.GridFormat()
                .addTextColumn({ name: "nazev", caption: "jres:25800027" }) //RC 25800027 : Kniha
                .addNumberColumn({ name: "rok", caption: "jres:25800007", width: 20 }); //RC 25800007 : Rok

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M1S1, L-4-8-0, M-4-8-0, S-12-12-0", tabLabel: "jres:25800013", opened: true })//RC 25800013 : Hlavička
                .addSection("jres:25800050"); //RC 25800050 : Profil
            if (!that.Mp) {
                form.addRow("jres:25800040") //RC 25800040 : Správní řád
                    .addField("gselectbox", Gordic.Prefabs.Select.sprcspr(), { name: "spr", customClass: "enabled", model: "model.spr=value.spr", disabled: this.readOnly });
            }            
            form.addRow("jres:25800004", true) //RC 25800004 : Název
                .addField("gstringbox", "w-9", { name: "nazev", customClass: "enabled", disabled: this.readOnly, })
                .addField("gstringbox", "w-3", { name: "ixs_rad", disabled: true })
                .addRow("jres:25800005", true) //RC 25800005 : Zkratka
                .addField("gstringbox", { name: "zkratka", customClass: "enabled", disabled: this.readOnly })
                .addRow("jres:25800006") //RC 25800006 : Formát AČ
                .addField("gstringbox", {
                    name: "format_ac", customClass: "enabled", disabled: this.readOnly, buttons: [{
                        requireEdit: false,
                        id: "acButton",
                        icon: "gi-info",
                        action: new GAction({
                            name: "actAc",
                            run: function () {
                                that.dialogs.messageBox("jres:25800006", "jres:25800042"); //RC 25800006 : Formát AČ
                            }
                        })
                    }]
                })
                .addRow("jres:25800023", true) //RC 25800023 : Rok, Por. číslo
                .addField("gnumberbox", "w-4", { name: "rok", customClass: "enabled", disabled: this.readOnly })
                .addField("gnumberbox", "w-4", { name: "ac_cislo_max", disabled: true })
                .addRow("jres:25800024", true) //RC 25800024 : Datum od, do
                .addField("gdatebox", "w-4", { name: "dat_od", customClass: "enabled", disabled: this.readOnly })
                .addField("gdatebox", "w-4", { name: "dat_do", customClass: "enabled", disabled: this.readOnly });
            if (!that.Mp) {
                form.addRow("jres:25800041") //RC 25800041 : Aktivita, Arch. číslo
                    .addField("gselectbox", "w-9", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly, dropdown: true })
                    .addField("gnumberbox", "w-3", { name: "arch_cis_max", customClass: "enabled", disabled: this.readOnly, emptyValue: null })
            } else
            {
                form.addRow("jres:25800025") //RC 25800025 : Aktivita
                    .addField("gselectbox", Gordic.Prefabs.Select.gincakt(), { name: "aktivita", customClass: "enabled", model: "model.aktivita=value.aktivita", disabled: this.readOnly, dropdown: true });
            }

            form.addRow()
                .addField("gcheck", { label: "jres:25800026", name: "povest", customClass: "enabled", disabled: this.readOnly })//RC 25800026 : Zahrnovat přestupky z tohoto deníku do zprávy o pověsti
                .addSection("jres:25800031") //RC 25800031 : DDP
                .addRow("jres:25800027") //RC 25800027 : Kniha
                .addField("gselectbox", Gordic.Prefabs.Select.ddpsden(), { selectorFormat: gridFormatKniha, dropdown: false, name: "ixp_den_ddp", customClass: "enabled", model: "model.ixp_den_ddp=value.ixp_den", disabled: this.readOnly })
                .addRow("jres:25800028") //RC 25800028 : Funkce
                .addField("gselectbox", Gordic.Prefabs.Select.ginszmp(), { dropdown: false, name: "ixs_zmp_ddp", customClass: "enabled", model: "model.ixs_zmp_ddp=value.ixs_zmp", disabled: this.readOnly })
                .addRow("jres:25800029") //RC 25800029 : VS
                .addField("gstringbox", { name: "vs", customClass: "enabled", disabled: this.readOnly })
                .addRow("jres:25800030") //RC 25800030 : Formát SS, Poř. č. SS
                .addField("gstringbox", "w-10", {
                    name: "format_ss", customClass: "enabled", disabled: this.readOnly, buttons: [{
                        requireEdit: false,
                        id: "ssButton",
                        icon: "gi-info",
                        action: new GAction({
                            name: "actSs",
                            run: function () {
                                that.dialogs.messageBox("jres:25800043", "jres:25800044"); //RC 25800043 : Formát SS
                            }
                        })
                    }]
                }) 
                .addField("gnumberbox", "w-2", { name: "por_cislo_ss", customClass: "enabled", disabled: this.readOnly, emptyValue: null })
                .addSection("jres:25800032") //RC 25800032 : DDP - typy pohledávek
                .addRow("jres:25800033") //RC 25800033 : Pokuty
                .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), { serverFilters: { povolene_pro_knihu: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true) }, dropdown: false, name: "typ_phl_ddp_pok", customClass: "enabled", model: "model.typ_phl_ddp_pok=value.typ_phl", disabled: this.readOnly })
                .addRow("jres:25800034") //RC 25800034 : Náklady řízení
                .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), { serverFilters: { povolene_pro_knihu: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true) }, dropdown: false, name: "typ_phl_ddp_nak", customClass: "enabled", model: "model.typ_phl_ddp_nak=value.typ_phl", disabled: this.readOnly })
                .addRow("jres:25800035") //RC 25800035 : Pořádkové pokuty
                .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), { serverFilters: { povolene_pro_knihu: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true) }, dropdown: false, name: "typ_phl_ddp_pop", customClass: "enabled", model: "model.typ_phl_ddp_pop=value.typ_phl", disabled: this.readOnly })
                .addRow("jres:25800036") //RC 25800036 : Pokuty na místě nezaplacené
                .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), { serverFilters: { povolene_pro_knihu: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true) }, dropdown: false, name: "typ_phl_ddp_pmn", customClass: "enabled", model: "model.typ_phl_ddp_pmn=value.typ_phl", disabled: this.readOnly })
                .addSection("jres:25800037") //RC 25800037 : DDP - kategorie účetního pohybu
                .addRow("jres:25800033") //RC 25800033 : Pokuty
                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), { dropdown: false, name: "ktg_upo_pok", model: "model.ktg_upo_pok=value.ktg_upo", customClass: "enabled", disabled: this.readOnly })
                .addRow("jres:25800034") //RC 25800034 : Náklady řízení
                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), { dropdown: false, name: "ktg_upo_nak", model: "model.ktg_upo_nak=value.ktg_upo", customClass: "enabled", disabled: this.readOnly })
                .addRow("jres:25800035") //RC 25800035 : Pořádkové pokuty
                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), { dropdown: false, name: "ktg_upo_pop", model: "model.ktg_upo_pop=value.ktg_upo", customClass: "enabled", disabled: this.readOnly })
                .addRow("jres:25800036") //RC 25800036 : Pokuty na místě nezaplacené
                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), { dropdown: false, name: "ktg_upo_pmn", model: "model.ktg_upo_pmn=value.ktg_upo", customClass: "enabled", disabled: this.readOnly });

            return form;
        }
    }
}