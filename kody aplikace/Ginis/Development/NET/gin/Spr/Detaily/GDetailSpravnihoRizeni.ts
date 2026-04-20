namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    enum TabGroupNames {
        tabGroupProfilRizeni = "tabGroupProfilRizeni",
        tabGroupVecnaPrislusnost0 = "tabGroupVecnaPrislusnost0",
        tabGroupUTZ1 = "tabGroupUTZ1",
        tabGroupUTZ2 = "tabGroupUTZ2",
        tabGroupUTZ3 = "tabGroupUTZ3",
        tabGroupStavba = "tabGroupStavba",
        tabGroupStatniDozor = "tabGroupStatniDozor",
        tabGroupDoprava = "tabGroupDoprava",
        tabGroupDraha = "tabGroupDraha",
        //tabGroupOUO = "tabGroupOUO",
        //tabGroupUcastnici271 = "tabGroupUcastnici271",
        //tabGroupUcastnici272 = "tabGroupUcastnici272",
        //tabGroupDO = "tabGroupDO",
        //tabGroupOstatniSubjekty = "tabGroupOstatniSubjekty",
        //tabGroupZastupci = "tabGroupZastupci",
        tabGroupUkony = "tabGroupUkony",
        tabGroupPop = "tabGroupPop",
        tabGroupSubjekty = 'tabGroupSubjekty'
    }

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailSpravnihoRizeni extends GDetailBuilderContent<
    Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions &
    ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> &
    Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSpravniRizeniDto> &
    ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSpravniRizeniDto>>>
    > implements IGContent {

        //model: DtoTypeNew;
        Zalozeni: boolean;
        IxpSpis: string;
        IxsDsr: string;
        TypSr: number;
        identifikatorUkonu: any;
        porCisloNemovitosti: any;
        DBPar_SprRadVpr: string;
        DBPar_SprRadUcatxt: string;
        DBPar_SprRadEko: boolean = false;
        DBPar_SprRadPsrdr: boolean = false;
        DBPar_InsertCJTextLong: string;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        private ouoTab: JQuery<HTMLElement>;
        private vecnaPrislusnost0Tab: JQuery<HTMLElement>;
        private vecnaPrislusnost10Tab: JQuery<HTMLElement>;
        private vecnaPrislusnost20Tab: JQuery<HTMLElement>;
        private ucastnici271Tab: JQuery<HTMLElement>;
        private ucastnici272Tab: JQuery<HTMLElement>;
        private terminyTab: JQuery<HTMLElement>;
        private nemovitostiTab: JQuery<HTMLElement>;
        private dotceneOrganyTab: JQuery<HTMLElement>;
        private ostatniSubjektyTab: JQuery<HTMLElement>;
        private zastupciTab: JQuery<HTMLElement>;
        private ukonyTab: JQuery<HTMLElement>;
        private popTab: JQuery<HTMLElement>;
        private customClassFor4Secs = "w-L-3 w-M-6 DetailHeadInfo";
        private layoutDescriptorFor4Secs = "L-4-8-0, M-4-8-0, S-12-12-0";
        private kpi1: JQuery<HTMLElement>;
        private kpi2: JQuery<HTMLElement>;
        private kpi3: JQuery<HTMLElement>;
        private kpi4: JQuery<HTMLElement>;

        // Skryvani zalozek
        s_z_uca1: number;
        s_z_uca2: number;
        s_z_dotco: number;
        s_z_ost: number;
        s_z_platby: number;
        obl_sr: number;
        s_ed_dat_z_dsr: number;

        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View)
                this.originalModel = { ixp_spis: this.IxpSpis };

            that.onContentReadyBase(that);
            that.renderKPI();

            // Vytvořit wrapper pro KPI
            let kpiWrapper = $("<div>").css({
                "display": "flex",
                "flex-wrap": "wrap"
            });

            // Assemble jednotlivých KPI do wrapperu
            kpiWrapper.append(that.kpi1, that.kpi3, that.kpi2, that.kpi4);
            kpiWrapper.appendTo(this.findFormSections("kpi_hlavicka"));

            ResizeManager.forceRefresh(this.element.get(0)!);
        }

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            var l_aoTabGroups: IGTabGroupOptions[] = [];    // pouzit pole, aby se dalo pridavat
            l_aoTabGroups.push({ id: TabGroupNames.tabGroupProfilRizeni, caption: "jres:25200061" }); //RC 25200061 : Profil řízení

            // TabGroups - budou vzdy
            var l_aoTabParams: Gordic.Gin.DetailBuilder.TabParams[] = [];    // pouzit pole, aby se dalo pridavat
            l_aoTabParams.push({
                tabParams: {
                    opened: true, locked: true, group: { id: TabGroupNames.tabGroupProfilRizeni }, title: "jres:25500016" //RC 25500016 : Profil řízení
                },
                init: function (tab) {
                    var formProfilRizeni = that.createFormProfilRizeni();
                    tab.gform("createFrom", formProfilRizeni);
                }
            });
            l_aoTabParams.push({
                tabParams: {
                    opened: true, locked: true, group: { id: TabGroupNames.tabGroupProfilRizeni }, title: "jres:25200204" //RC 25200204 : Průběh řízení
                },
                contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GTerminyControl(that)),
                init: function (tab) {
                    that.terminyTab = tab;
                }
            });

            // TabGroups - budou nekdy
            if (that.model.obl_sr == 20) {
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupStavba, caption: "jres:25500126" } as IGTabGroupOptions); //RC 25500126 : Stavba
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupStavba }, title: "jres:25200458" //RC 25200458 : Stavba
                    },
                    init: function (tab) {
                        var formStavba = that.createFormStavba();
                        tab.gform("createFrom", formStavba);
                    }
                });

                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupStavba}, title: "jres:25200457"  //RC 25200457 : Nemovitosti
                    },
                    contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GNemovitostiControl(that)),
                    init: function (tab) {
                        that.nemovitostiTab = tab;
                    }
                });
            }

            if (that.model.obl_sr == 50) {
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupUTZ1, caption: "jres:25500117" } as IGTabGroupOptions); //RC 25500117 : UTZ PZ
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupUTZ1 }
                    },
                    init: function (tab) {
                        var formUTZ1 = that.createFormUTZ1();
                        tab.gform("createFrom", formUTZ1);
                    }
                });
            }

            if (that.model.obl_sr == 60) {
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupUTZ2, caption: "jres:25500150" } as IGTabGroupOptions); //RC 25500150 : UTZ OZO
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupUTZ2 }
                    },
                    init: function (tab) {
                        var formUTZ2 = that.createFormUTZ2();
                        tab.gform("createFrom", formUTZ2);
                    }
                });
            }

            if (that.model.obl_sr == 70) {
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupUTZ3, caption: "jres:25500155" } as IGTabGroupOptions); //RC 25500155 : TPZ - PO
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupUTZ3 }
                    },
                    init: function (tab) {
                        var formUTZ3 = that.createFormUTZ3();
                        tab.gform("createFrom", formUTZ3);
                    }
                });
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupUTZ3 }
                    },
                    contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GVecnaPrislusnostControl(that, Gordic.Spr.Interface.TypVecnaPrislusnost.TypVpr10)),
                    init: function (tab) {
                        that.vecnaPrislusnost10Tab = tab;
                    }
                });
            }

            if (that.model.obl_sr == 80) {
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupDraha, caption: "jres:25500159" } as IGTabGroupOptions); //RC 25500159 : Dráha
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupDraha }
                    },
                    init: function (tab) {
                        var formDraha = that.createFormDraha();
                        tab.gform("createFrom", formDraha);
                    }
                });
            }

            if (that.model.obl_sr == 90) {
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupDoprava, caption: "jres:25500146" } as IGTabGroupOptions); //RC 25500146 : Doprava
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupDoprava }
                    },
                    init: function (tab) {
                        var formDoprava = that.createFormDoprava();
                        tab.gform("createFrom", formDoprava);
                    }
                });
            }

            if (that.model.obl_sr == 100) { //v databazi neni hodnota 100 - neni otestovano s daty (testovano jen s natvrdo zadanym parametrem)
                l_aoTabGroups.push({ id: TabGroupNames.tabGroupStatniDozor, caption: "jres:25500134" } as IGTabGroupOptions); //RC 25500134 : Státní dozor
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupStatniDozor }
                    },
                    init: function (tab) {
                        var formStatniDozor = that.createFormStatniDozor();
                        tab.gform("createFrom", formStatniDozor);
                    }
                });
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupStatniDozor }
                    },
                    contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GVecnaPrislusnostControl(that, Gordic.Spr.Interface.TypVecnaPrislusnost.TypVpr20)),
                    init: function (tab) {
                        that.vecnaPrislusnost20Tab = tab;
                    }
                });
            }

            // TabGroups - pouze pro View
            if (that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) {

                if (that.DBPar_SprRadVpr == "1") {
                    l_aoTabGroups.push({ id: TabGroupNames.tabGroupVecnaPrislusnost0, caption: "jres:25500051" } as IGTabGroupOptions); //RC 25500051 : Věcná příslušnost
                    l_aoTabParams.push({
                        tabParams: {
                            opened: true, locked: true, group: { id: TabGroupNames.tabGroupVecnaPrislusnost0 }
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GVecnaPrislusnostControl(that, Gordic.Spr.Interface.TypVecnaPrislusnost.TypVpr0)),
                        init: function (tab) {
                            that.vecnaPrislusnost0Tab = tab;
                        }
                    });
                }

                l_aoTabGroups.push({ id: TabGroupNames.tabGroupSubjekty, caption: "jres:25200393" } as IGTabGroupOptions); //RC 25200393 : Subjekty
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: false, group: { id: TabGroupNames.tabGroupSubjekty }, title: "jres:25200201" //RC 25200201 : OUO
                    },
                    contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GOUOControl(that)),
                    init: function (tab) {
                        that.ouoTab = tab;
                    }
                });

                if (this.s_z_uca1 != 1) {
                    l_aoTabParams.push({
                        tabParams: {
                            opened: true, locked: false, group: { id: TabGroupNames.tabGroupSubjekty }, title: that.DBPar_SprRadUcatxt
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GUcastniciControl(that, Gordic.Spr.Interface.TypSubjektuEnum.Ucastnik1)),
                        init: function (tab) {
                            that.ucastnici271Tab = tab;
                        }
                    });
                }

                if (this.s_z_uca2 != 1) {
                    l_aoTabParams.push({
                        tabParams: {
                            opened: true, locked: false, group: { id: TabGroupNames.tabGroupSubjekty }, title: "jres:25200054"   //RC 25200054 : Účastníci §27/2
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GUcastniciControl(that, Gordic.Spr.Interface.TypSubjektuEnum.Ucastnik2)),
                        init: function (tab) {
                            that.ucastnici272Tab = tab;
                        }
                    });
                }

                if (this.s_z_dotco != 1) {
                    l_aoTabParams.push({
                        tabParams: {
                            opened: true, locked: false, group: { id: TabGroupNames.tabGroupSubjekty }, title: "jres:25200082" //RC 25200082 : Dotčené org.
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GDotceneOrganyControl(that)),
                        init: function (tab) {
                            that.dotceneOrganyTab = tab;
                        }
                    });
                }

                if (this.s_z_ost != 1) {
                    l_aoTabParams.push({
                        tabParams: {
                            opened: true, locked: false, group: { id: TabGroupNames.tabGroupSubjekty }, title: "jres:25200089"   //RC 25200089 : Ostatní
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GOstatniSubjektyControl(that)),
                        init: function (tab) {
                            that.ostatniSubjektyTab = tab;
                        }
                    });
                }

                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: false, group: { id: TabGroupNames.tabGroupSubjekty }, title: "jres:25200090"   //RC 25200090 : Zástupci
                    },
                    contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GZastupciControl(that)),
                    init: function (tab) {
                        that.zastupciTab = tab;
                    }
                });

                l_aoTabGroups.push({ id: TabGroupNames.tabGroupUkony, caption: "jres:25200105" } as IGTabGroupOptions); //RC 25200105 : Úkony
                l_aoTabParams.push({
                    tabParams: {
                        opened: true, locked: true, group: { id: TabGroupNames.tabGroupUkony }
                    },
                    contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GUkonyControl(that)),
                    init: function (tab) {
                        that.ukonyTab = tab;
                    }
                });

                if (this.s_z_platby != 1) {
                    l_aoTabGroups.push({ id: TabGroupNames.tabGroupPop, caption: "jres:25200115" } as IGTabGroupOptions); //RC 25200115 : Platby
                    l_aoTabParams.push({
                        tabParams: {
                            opened: true, locked: true, group: { id: TabGroupNames.tabGroupPop }
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GPopControl(that, this.DBPar_SprRadEko)),
                        init: function (tab) {
                            that.popTab = tab;
                        }
                    });
                }
            }


            var stav102030LzeVyridit = ((that.model.stav == 10 ||
                that.model.stav == 20 ||
                that.model.stav == 30) &&
                that.model.Permissions.LzeVyridit.value);

            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            var l_aoActions: GAction[] = [];    // pouzit pole, aby se dalo pridavat
            l_aoActions.push(
                new GAction({
                    name: "actPrerusit",
                    caption: "jres:25200353",     //RC 25200353 : Přerušit
                    enabled: readOnly,
                    visible: false, // nepouziva se, ale pro jistotu prevzato i do noveho LK
                    run: function (this: GAction, ev, ctx) {
                        that.Prerusit();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actPokracovat",
                    caption: "jres:25200354",     //RC 25200354 : Pokračovat
                    enabled: readOnly,
                    visible: true,
                    run: function (this: GAction, ev, ctx) {
                        that.Pokracovat();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actZrusitRozhodnuti",
                    caption: "jres:25200360", //RC 25200360 : Zrušit rozh.
                    enabled: readOnly,
                    visible: !stav102030LzeVyridit,
                    run: function (this: GAction, ev, ctx) {
                        that.ZrusitRozhodnuti();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actZahajit",
                    caption: "jres:25300051", //RC 25300051 : Zahájit
                    enabled: readOnly,
                    visible: true, //!stav102030LzeVyridit,
                    run: function (this: GAction, ev, ctx) {
                        that.Zahajit();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actRozhodnout",
                    caption: "jres:25300019", //RC 25300019 : Rozhodnout
                    enabled: readOnly,
                    visible: true, //!stav102030LzeVyridit,
                    run: function (this: GAction, ev, ctx) {
                        that.Rozhodnout();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actPredatNadrizenemuSU",
                    caption: "jres:25200342",     //RC 25200342 : Předat SÚ
                    enabled: readOnly,
                    visible: !stav102030LzeVyridit,
                    run: function (this: GAction, ev, ctx) {
                        that.PredatNadrizenemuSU();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actVratitPodrizenemuSU",
                    caption: "jres:25200348",     //RC 25200348 : Vrátit SÚ
                    enabled: readOnly,
                    visible: true, // nepouziva se, ale pro jistotu prevzato i do noveho LK
                    run: function (this: GAction, ev, ctx) {
                        that.VratitPodrizenemuSU();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actOdvolani",
                    caption: "jres:25200351",     //RC 25200351 : Odvolání
                    enabled: readOnly,
                    run: function (this: GAction, ev, ctx) {
                        that.Odvolani();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actPotvrditRozhodnuti",
                    caption: "jres:25200366", //RC 25200366 : Potvrdit rozh.
                    enabled: readOnly,
                    run: function (this: GAction, ev, ctx) {
                        that.PotvrditRozhodnuti();
                    }
                }));

            l_aoActions.push(
                new GAction({
                    name: "actNabytiPravniMociSpr",
                    caption: "jres:25200372", //RC 25200372 : Právní moc
                    enabled: readOnly,
                    run: function (this: GAction, ev, ctx) {
                        that.NabytiPravniMociSpr();
                    }
                }));
            l_aoActions.push(
                new GAction({
                    name: "actPrilohy",
                    caption: "jres:25500015", //RC 25500015 : Přílohy
                    enabled: readOnly,
                    icon: "gi-attachment",
                    run: () => {
                        Gordic.Wfl.Dialogs.GPrilohyDlg(this, {
                            Ixp: (this as any).IxpSpis
                        });
                    }
                })
            )
            l_aoActions.push(
                new GAction({
                    name: "actZmenDruhRizeniSpravnihoSpisu",
                    caption: "jres:25200443", //RC 25200443 : Změnit druh řízení
                    enabled: readOnly,
                    run: function (this: GAction, ev, ctx) {
                        that.ZmenDruhRizeniSpravnihoSpisu();
                    }
                }));


            var spravniRizeniDetailComponent: Gin.DetailBuilder.GDetailBuilderComponent<this> =
            {
                headerForm: this.createForm(),
                tabGroups: l_aoTabGroups,
                tabs: l_aoTabParams,
                actions: l_aoActions,

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
                menuBar: [
                    {
                        id: "menuSpravniRizeni", caption: "jres:25200345", type: "static", after: "akce", children: [ //RC 25200345 : Správní řízení
                            { id: "menuZahajit", action: "actZahajit", icon: "gi-vyrizeno", favorite: true },
                            { id: "menuRozhodnout", action: "actRozhodnout", icon: "gi-vyrizeno", favorite: true },
                            { id: "menuPrerusit", action: "actPrerusit", favorite: true },
                            { id: "menuPokracovat", action: "actPokracovat", favorite: false },
                            { id: "menuZrusitRozhodnuti", action: "actZrusitRozhodnuti", favorite: false },
                            { id: "menuPredatNadrizenemuSU", action: "actPredatNadrizenemuSU", favorite: true },
                            { id: "menuVratitPodrizenemuSU", action: "actVratitPodrizenemuSU", favorite: false },
                            { id: "menuOdvolani", action: "actOdvolani", favorite: true },
                            { id: "menuPotvrditRozhodnuti", action: "actPotvrditRozhodnuti", favorite: false },
                            { id: "menuNabytiPravniMociSpr", action: "actNabytiPravniMociSpr", favorite: false },
                            { id: "menuZobrazeniPriloh", action: "actPrilohy", favorite: true },
                            { id: "menuZmenDruhRizeniSpravnihoSpisu", action: "actZmenDruhRizeniSpravnihoSpisu", favorite: false }
                        ]
                    }
                ],

            }

            // nastav kpi panel na dvouradkovy, odstrani to treti radek, na kterem je divne cislo, ktere tam nechci
            builder.kpiPanelOptions = $.extend({}, builder.kpiPanelOptions, Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate());

            // odstranit vlastni obsluhu gtabmanageropen, aby se nezvetsoval pocet reloadData GSubListControl
            this.element.off("gtabmanageropen.GDetailSpravnihoRizeni");

            builder.withComponent<this>("SpravniRizeniDetail", spravniRizeniDetailComponent, true);
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
            var that = this;

            if (that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) {
                that.listControls_setup({
                    rowToDto: function (gridState) {
                        var gTabManager = that.find(".gtabmanager");
                        var active;
                        if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                        return { Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, IxpSpis: gridState.currentRow.data.ixp_spis, selectedTabGroup: active };
                    },
                    nextItemTemplate: "jres:25200340", //RC 25200340 : Následující záznam<br>PID: {ixp_spis}
                    prevItemTemplate: "jres:25200341" //RC 25200341 : Předchozí záznam<br>PID: {ixp_spis}

                });
            };

            this.afterSave = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions): JQueryPromise<any> {
                var def = $.Deferred();
                that.findFields("Keywords").gkeywordsbar("save");
                return def.resolve().promise();

            } as any;

            this.enableActions = function (enable: boolean) {
                that.actions.actZahajit?.enabled(!enable && that.model.Permissions.LzeZahajit.value);
                that.actions.actPrerusit?.enabled(!enable && that.model.Permissions.LzePrerusit.value);
                that.actions.actPokracovat?.enabled(!enable && that.model.Permissions.LzePokracovat.value);
                that.actions.actZrusitRozhodnuti?.enabled(!enable && that.model.Permissions.LzeZrusitRozhodnuti.value);
                that.actions.actRozhodnout?.enabled(!enable && that.model.Permissions.LzeRozhodnout.value);
                that.actions.actPredatNadrizenemuSU?.enabled(!enable && that.model.Permissions.LzePredatNadrizenemuSU.value);
                that.actions.actVratitPodrizenemuSU?.enabled(!enable && that.model.Permissions.LzeVratitPodrizenemuSU.value);
                that.actions.actOdvolani?.enabled(!enable && that.model.Permissions.LzeOdvolani.value);
                that.actions.actPotvrditRozhodnuti?.enabled(!enable && that.model.Permissions.LzePotvrditRozhodnuti.value);
                that.actions.actNabytiPravniMociSpr?.enabled(!enable && that.model.Permissions.LzeNabytPravniMocSpr.value);

                that.findFields("Keywords").gfield("option", "disabled", !enable);

                if (that.terminyTab)
                    $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.terminyTab).enableActions();
                if (that.nemovitostiTab)
                    $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.nemovitostiTab).enableActions();
            };

            this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions): JQueryPromise<any> {

                var prom = $.Deferred();
                console.log("afterLoadData");
                console.log("!!!SelectedTabGroup!!!");
                console.log(that.selectedTabGroup);
                if (that.selectedTabGroup != null && that.selectedTabGroup != undefined) {
                    var gTabManager = that.find(".gtabmanager");
                    gTabManager.gtabmanager("setActive", that.selectedTabGroup);
                }

                this.element.on("gtabmanageropen.GDetailSpravnihoRizeni", function (ev, ctx) {
                    console.log("gtabmanageropen.GDetailSpravnihoRizeni");
                    tabChange(ctx.id);
                });

                var gTabManager = that.find(".gtabmanager");
                var active = gTabManager.gtabmanager("getActive");
                if (active != null) tabChange(active);

                // Uložím ho do posledních načtených
                ulozNavstivenyDokument();

                return prom.resolve().promise();
            }

            var tabChange = function (idTabGroup: string) {

                switch (idTabGroup) {
                    case TabGroupNames.tabGroupProfilRizeni:
                        that.afterLoadDataForTab(that.terminyTab);
                        break;
                    case TabGroupNames.tabGroupStavba:
                        that.afterLoadDataForTab(that.nemovitostiTab);
                        break;
                    case TabGroupNames.tabGroupVecnaPrislusnost0:
                        that.afterLoadDataForTab(that.vecnaPrislusnost0Tab);
                        break;
                    case TabGroupNames.tabGroupUTZ3:
                        that.afterLoadDataForTab(that.vecnaPrislusnost10Tab);
                        break;
                    case TabGroupNames.tabGroupStatniDozor:
                        that.afterLoadDataForTab(that.vecnaPrislusnost20Tab);
                        break;
                    case TabGroupNames.tabGroupSubjekty:
                        if (that.ouoTab)
                            that.afterLoadDataForTab(that.ouoTab);
                        if (that.ucastnici271Tab)
                            that.afterLoadDataForTab(that.ucastnici271Tab);
                        if (that.ucastnici272Tab)
                            that.afterLoadDataForTab(that.ucastnici272Tab);
                        if (that.dotceneOrganyTab)
                            that.afterLoadDataForTab(that.dotceneOrganyTab);
                        if (that.ostatniSubjektyTab)
                            that.afterLoadDataForTab(that.ostatniSubjektyTab);
                        if (that.zastupciTab)
                            that.afterLoadDataForTab(that.zastupciTab);
                        break;
                    case TabGroupNames.tabGroupUkony:
                        that.afterLoadDataForTab(that.ukonyTab);
                        break;
                    case TabGroupNames.tabGroupPop:
                        that.afterLoadDataForTab(that.popTab);
                        break;
                }
            };

            var ulozNavstivenyDokument = function () {
                var obj = {
                    Ixp: that.model.ixp_spis,
                    //SEle: that.model.SEle,
                    //PrizSpis: that.model.PrizSpis,
                    Nazev: that.model.vec,
                    AktZnacka: that.model.akt_znacka,
                    NazevDsr: that.model.nazev_dsr,
                };
                Gordic.Spr.Globals.PosledniNavstiveny.pridejPosledniNavstiveny(that.globalSettings, obj);
            }
        };

        afterLoadDataForTab(tabControl: JQuery<HTMLElement>) {
            var that = this;
            if (tabControl) {
                const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(tabControl);
                if (tabCnt != null && typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                    tabCnt.reloadData().done(function () {
                        if (tabControl == that.ukonyTab && that.identifikatorUkonu != undefined && that.identifikatorUkonu != null) {
                            tabCnt.grid.ggrid("activeRow", that.identifikatorUkonu);
                            that.identifikatorUkonu = undefined;
                        }
                        if (tabControl == that.nemovitostiTab && that.porCisloNemovitosti != undefined && that.porCisloNemovitosti != null) {
                            tabCnt.grid.ggrid("activeRow", that.porCisloNemovitosti);
                            that.porCisloNemovitosti = undefined;
                        }
                    });
                }
            }
        }

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;

            that.log.trace("AAA");
            console.log("BBB");



            //console.log("Xdat_lhuta.change - before findFields dat_zahajeni");
            //console.log("Xdat_lhuta.change - that.findFields('dat_zahajeni'')", that.findFields("dat_zahajeni"));
            //console.log("Xdat_lhuta.change - after findFields dat_zahajeni");

            //console.log("Xdat_lhuta.change - before getValue dat_zahajeni");
            //var datPocX = that.findFields("dat_zahajeni").gfield("getValue");
            //console.log("Xdat_lhuta.change - after getValue dat_zahajeni");

            var form = new Gordic.Forms.Form({ name: "hlavicka", layoutDescriptor: "L4M2S1, L-4-8-0, M-4-8-0, S-12-12-0", tabLabel: "jres:25200023", opened: true }) //RC 25200023 : Hlavička
                // Barevne zahlavi
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoFirstCol DetailHeadInfoSpisSpr", layoutDescriptor: that.layoutDescriptorFor4Secs })
                .addRow("jres:25200025") //RC 25200025 : Ident.
                .addField("gstringbox", "w-12", { name: "ixp_spis", disabled: true })
                .addSection({ customClass: "w-L-9 w-M-6 DetailHeadInfo DetailHeadInfoSpisSpr", layoutDescriptor: "L-3-9-0, M-4-8-0, S-12-12-0" })
                .addRow(that.DBPar_InsertCJTextLong)
                .addField("gstringbox", "w-12 w-L-6", {
                    name: "akt_znacka", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({
                            name: "actSpis",
                            icon: "gi-spis",
                            captionVisible: GAction.captionVisibility.never,
                            tooltip: "jres:25200049",     //RC 25200049 : Spis
                            enabled: readOnly,
                            run: function (this: GAction, ev, ctx) {
                                var options = {
                                    DetailDto: { ixp: that.model.ixp_spis }
                                };
                                Gordic.Wfl.Dialogs.DetailDokumentuSpisu((undefined as any) as GContent, options, Gordic.Global.Enums.ModOtevreni.showWindow)  //(ctx.gcontent, ctx.inputData.opt.ixp, Gordic.Global.Enums.ModOtevreni.auto)
                            }
                        })
                    }]

                })
                .addSection({ customClass: "w-12 DetailHeadInfoOneColPerRow DetailHeadInfo DetailHeadInfoSpisSpr DetailHeadInfoNotFirstRow", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" })
                .addRow("jres:25200027") //RC 25200027 : Věc
                .addField("gstringbox", "w-12", { name: "vec", disabled: true })
                .addSection({ customClass: "w-12 DetailHeadInfoOneColPerRow DetailHeadInfo DetailHeadInfoSpisSpr DetailHeadInfoNotFirstRow", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" })
                .addRow("jres:25200028") //RC 25200028 : Řízení
                .addField("gstringbox", "w-12", {
                    name: "nazev_dsr", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({
                            name: "actZmenitDruhRizeni",
                            icon: "gi-dots",
                            captionVisible: GAction.captionVisibility.never,
                            tooltip: "jres:25200444", //RC 25200444 : Změnit druh řízení
                            enabled: readOnly,
                            run: function (ev, obj) {
                                that.ZmenDruhRizeniSpravnihoSpisu();
                            }
                        })
                    }]
                })
                // Datumy 1
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoFirstCol", layoutDescriptor: that.layoutDescriptorFor4Secs })
                .addRow("jres:25200031") //RC 25200031 : Podáno
                .addField("gdatebox", "w-12", { name: "dat_pod", model: "model.dat_pod=value", valueType: "datetime", disabled: true })
                .addSection({ customClass: that.customClassFor4Secs, layoutDescriptor: that.layoutDescriptorFor4Secs })
                .addRow("jres:25200033") //RC 25200033 : Zahájeno
                .addField("gdatebox", "w-8", {
                    name: "dat_zahajeni", model: "model.dat_zahajeni=value", valueType: "date",
                    disabled: this.model.s_ed_dat_z_dsr == 1 || readOnly,
                    buttons: [{
                        action: new GAction({
                            name: "actVypocetLhuty",
                            //icon: "gi-paper|gi-pencil",
                            icon: "gi-calc",
                            captionVisible: GAction.captionVisibility.never,
                            tooltip: "jres:25200294", //RC 25200294 : Přepočet/ Výpočet lhůty
                            enabled: !readOnly,
                            run: function (ev, obj) {
                                var $form = $(ev.target).gform().findForms("hlavicka");
                                $form.findFields().gfield("model", "collect", that.model);
                                Gordic.Spr.Dialogs.VypocetLhutyDlg(
                                    that,
                                    {
                                        DatumZahajeni: that.model.dat_zahajeni,
                                        PocetDnu: that.model.lhuta_vyriz_dsr,
                                        ShowOkButton: true
                                    },
                                    Gordic.Global.Enums.ModOtevreni.showModalWindow
                                )
                                    .done(function (ret) {
                                        if (ret != undefined && ret.VypocetLhuty != undefined) {
                                            //$form.findFields().gfield("model", "apply", ret.VypocetLhuty);    vse ne, ma se prevzit jen neco
                                            // prevzit jen nektere polozky, jako ve starem
                                            $form.findFields("dat_zahajeni").gdatebox("setValue", ret.VypocetLhuty.dat_zahajeni);
                                            $form.findFields("dat_lhuta").gdatebox("setValue", ret.VypocetLhuty.dat_lhuta);
                                        }
                                    });
                            }
                        })
                    }],
                    change: function (ev, obj) {
                        if (obj.value == null) {
                            that.findFields("dat_lhuta").gfield("setValue", null, { triggerChange: false});
                            that.findFields("stav").gfield("setInitial", { stav: 5 }); //Nezahájeno
                            that.findFields("zp_roz").gfield("setInitial", { zp_roz: 10 }); //Nerozhodnuto
                        }
                    }
                })
                .addSection({ customClass: that.customClassFor4Secs, layoutDescriptor: that.layoutDescriptorFor4Secs })
                .addRow("jres:25200035") //RC 25200035 : Rozhodnuto
                .addField("gdatebox", "w-12", { name: "dat_rozh", model: "model.dat_rozh=value", valueType: "date", disabled: true })
                //.addField("gdatebox", "w-12", { name: "dat_lhuta", model: "model.dat_vyriz_ssl=value", valueType: "date", disabled: true })
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoLastFromMoreCol", layoutDescriptor: "L-1-11-0, M-4-8-0, S-12-12-0" })
                .addRow()
                .addField("gselectbox", "w-12", Gordic.Prefabs.Select.sprcstaDto(), {
                    name: "stav", model: "model.stav=value.stav", customClass: "enabled", dropdown: true, disabled: readOnly,
                    tooltip: "jres:25200202", //RC 25200202 : Stav řízení
                    serverFilters: { stav: "> 0" }
                })
                // Datumy 2
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoFirstCol DetailHeadInfoNotFirstRow", layoutDescriptor: that.layoutDescriptorFor4Secs });
            if (that.model.DruhRizeni.s_cas_evid == 0)
                form = form
                    .addRow("jres:25200032") //RC 25200032 : Zapsáno
                    .addField("gdatebox", "w-12", { name: "dat_zap", model: "model.dat_zap=value", valueType: "datetime", disabled: true });
            form = form
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoNotFirstRow", layoutDescriptor: that.layoutDescriptorFor4Secs })
                //.addRow("jres:25200034") //RC 25200034 : Lhůta do
                .addRow({ label: "jres:25200034" }) //RC 25200034 : Lhůta do
                .addField("gdatebox", "w-8", {
                    //name: "dat_vyriz_do_ssl", model: "model.dat_vyriz_do_ssl=value", valueType: "date", customClass: "enabled",
                    name: "dat_lhuta", model: "model.dat_lhuta=value", valueType: "date", customClass: "enabled", disabled: readOnly,
                    validators: that.model.stav == 5 ? [] :  [new Gordic.Validators.Required()], //kdyz bude nezahájeno tak nebude required
                    flag: that.model.stav == 5 ? "" : "required",
                    change: function (ev, changeObj) {                                  //viz: https://xwiki.gordic.cz/NET/widgets/gfield#Hchange
                        console.log("dat_lhuta.change - start");
                        var srv = new GContent({ className: "Gordic.Spr.WebApp.GSprUtils", params: {} });

                        that.log.trace("dat_lhuta.change - before findFields dat_zahajeni");
                        that.log.trace("dat_lhuta.change - that.findFields('dat_zahajeni'')", that.findFields("dat_zahajeni"));
                        that.log.trace("dat_lhuta.change - after findFields dat_zahajeni");

                        that.log.trace("dat_lhuta.change - before getValue dat_zahajeni");
                        var datPoc = that.findFields("dat_zahajeni").gfield("getValue");
                        that.log.trace("dat_lhuta.change - after getValue dat_zahajeni");


                        //console.log("dat_lhuta.change - before findFields dat_zahajeni");
                        //console.log("dat_lhuta.change - that.findFields('dat_zahajeni'')", that.findFields("dat_zahajeni"));
                        //console.log("dat_lhuta.change - after findFields dat_zahajeni");

                        //console.log("dat_lhuta.change - before getValue dat_zahajeni");
                        //var datPoc = that.findFields("dat_zahajeni").gfield("getValue");
                        //console.log("dat_lhuta.change - after getValue dat_zahajeni");

                        srv.call("CalcPocetDnuTxt", { datPocatecni: datPoc, datLhuty: changeObj.value })
                            .done(function (ret) {
                                that.log.trace("dat_lhuta.change - before findFields pocet_dnu_txt");
                                that.log.trace("dat_lhuta.change - that.findFields('pocet_dnu_txt')", that.findFields("pocet_dnu_txt"));
                                that.log.trace("dat_lhuta.change - after findFields pocet_dnu_txt");

                                that.log.trace("dat_lhuta.change - before setValue pocet_dnu_txt");
                                that.findFields("pocet_dnu_txt").gstringbox("setValue", ret);
                                that.log.trace("dat_lhuta.change - end");

                            //    console.log("dat_lhuta.change - before findFields pocet_dnu_txt");
                            //    console.log("dat_lhuta.change - that.findFields('pocet_dnu_txt')", that.findFields("pocet_dnu_txt"));
                            //    console.log("dat_lhuta.change - after findFields pocet_dnu_txt");

                            //    console.log("dat_lhuta.change - before setValue pocet_dnu_txt");
                            //    that.findFields("pocet_dnu_txt").gstringbox("setValue", ret);
                            //    console.log("dat_lhuta.change - end");
                            });
                    }
                })
                .addField("gstringbox", "w-4", { name: "pocet_dnu_txt", model: "model.pocet_dnu_txt=value", disabled: true } )
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoNotFirstRow", layoutDescriptor: that.layoutDescriptorFor4Secs })
                .addRow("jres:25200036") //RC 25200036 : Nabytí PM
                .addField("gdatebox", "w-12", { name: "dat_pr_moc", model: "model.dat_pr_moc=value", valueType: "date", disabled: true })
                .addSection({ customClass: that.customClassFor4Secs + " DetailHeadInfoLastFromMoreCol DetailHeadInfoNotFirstRow", layoutDescriptor: "L-1-11-0, M-4-8-0, S-12-12-0" })
                .addRow()
                .addField("gselectbox", "w-12", Gordic.Prefabs.Select.sprczprDto(), {
                    name: "zp_roz", model: "model.zp_roz=value.zp_roz", customClass: "enabled", dropdown: true, disabled: readOnly,
                    tooltip: "jres:25200203", //RC 25200203 : Způsob rozhodnutí
                    serverFilters: { zp_roz: "> 0" }
                })
                .addSection({name: "kpi_hlavicka"})
                ;

            //.addRow("Adresa RUIAN")
            //.addField("gselectbox", Gordic.Prefabs.Select.szrsadr(),
            //    {
            //        name: "adresa_ruian",
            //        serverFastFilterSupport: true,
            //        model: "model.CirkevEsu.adresa_kod_int=value.adresni_misto_kod",
            //        disabled: this.readOnly
            //        //serverFilters: {
            //        //    fast: function () {
            //        //        console.log("fast");
            //        //        var val = $(this).find("input").val() as string;
            //        //        if (!val) return;
            //        //        var aktivita_txt = val.replace(",", "");
            //        //        console.log(aktivita_txt);
            //        //        return aktivita_txt;
            //        //    }
            //        //    //obec: function () {
            //        //    //    console.log("obec");
            //        //    //    var val = $(this).find("input").val() as string;
            //        //    //    if (!val) return;
            //        //    //    var aktivita_txt = val.replace(",", "");
            //        //    //    console.log(aktivita_txt);
            //        //    //    return aktivita_txt;
            //        //    //}
            //        //}
            //    })

            return form;
        };

        // Záložka profil řízení
        createFormProfilRizeni(): Gordic.Forms.Form {
            var that = this;
            console.log("createFormProfilRizeni(): ");
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;

            var form = new Gordic.Forms.Form({ name: "profil_rizeni", layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" })
                .addSection({ label: "jres:25500118", customClass: "DetailHeadInfoOneColPerRow DetailHeadInfo", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" })  //RC 25500118 : Podnět
                .addRow("jres:25200073", true) //RC 25200073 : Typ
                .addField("gselectbox", "w-12 w-L-3", Gordic.Prefabs.Select.sprcpodDto(), {
                    name: "typ_pod", model: "model.typ_pod=value.typ_pod", customClass: "enabled", dropdown: true, disabled: readOnly,
                    serverFilters: { typ_pod: this.TypSr == 10 || this.TypSr == 110 ? [0, 10, 20, 30, 40] : [50, 60, 70, 80] },
                    validators: [new Gordic.Validators.Required()]
                })
                .addRow("jres:25200062") //RC 25200062 : Popis
                .addField("gstringbox", "w-12", { name: "popis_pod", customClass: "enabled", disabled: readOnly, rows: 3 })
                .addRow("jres:25200063") //RC 25200063 : Zdroj
                .addField("gstringbox", "w-12", { name: "zdroj_pod", customClass: "enabled", disabled: readOnly });

            // Pokud se ma zobrazit na profilu alespon jedna z prislusnosti (vecna nebo mistni)
            if (that.DBPar_SprRadVpr != "1" || that.model.DruhRizeni.s_mist_pr != 1) { // DBPar_SprRadVpr == 1 ... zobrazit vpr na samostatne zalozce (ne na profilu), s_mist_pr == 1 ... skryt mistni prislusnost
                // Pridat sekci s titulkem
                form = form
                    .addSection({ label: "jres:25200074", customClass: "DetailHeadInfo DetailHeadInfoNotFirstRow" }); //RC 25200074 : Příslušnost

                var l_sCCPrislusnostV: string;
                var l_sCCPrislusnostM: string;
                var l_sLDPrislusnost: string;
                var l_sWidth: string;
                if (that.DBPar_SprRadVpr != "1" && that.model.DruhRizeni.s_mist_pr != 1) {
                    // Budou zobrazene obe prislusnosti
                    l_sCCPrislusnostV = "w-L-6 w-M-6 DetailHeadInfo DetailHeadInfoNotFirstRow DetailHeadInfoFirstCol";
                    l_sCCPrislusnostM = "w-L-6 w-M-6 DetailHeadInfo DetailHeadInfoNotFirstRow ";
                    l_sLDPrislusnost = "L-2-10-0, M-4-8-0, S-12-12-0"
                    l_sWidth = "w-12";
                }
                else {
                    // Bude zobrazena jen jedna
                    l_sCCPrislusnostV = "DetailHeadInfoOneColPerRow DetailHeadInfo";
                    l_sCCPrislusnostM = "DetailHeadInfoOneColPerRow DetailHeadInfo";
                    l_sLDPrislusnost = "L-1-11-0, M-2-10-0, S-12-12-0"
                    l_sWidth = "w-6";
                }

                // Pokud se ma zobrazit na profilu vecna, pridej ji
                if (that.DBPar_SprRadVpr != "1")
                    form = form
                        .addSection({ customClass: l_sCCPrislusnostV, layoutDescriptor: l_sLDPrislusnost })
                        .addRow("jres:25200064") //RC 25200064 : Věcná
                        .addField("gstringbox", l_sWidth, { name: "vpr", customClass: "enabled", disabled: readOnly });

                // Pokud se ma zobrazit na profilu mistni, pridej ji
                if (that.model.DruhRizeni.s_mist_pr != 1)
                    form = form
                        .addSection({ customClass: l_sCCPrislusnostM, layoutDescriptor: l_sLDPrislusnost })
                        .addRow("jres:25200075", true) //RC 25200075 : Místní
                        .addField("gselectbox", l_sWidth, Gordic.Prefabs.Select.sprcmprDto(), {
                            name: "mpr", model: "model.mpr=value.mpr", customClass: "enabled", disabled: readOnly, dropdown: true,
                            validators: [new Gordic.Validators.Required()]
                        });
            }

            form = form
                .addSection({ label: "jres:25500014", customClass: "DetailHeadSmallText DetailHeadInfoOneColPerRow DetailHeadInfo", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" }) //RC 25500014 : Klíčová slova
                .addRow("jres:25200436", true) //RC 25200436 : Klíčová slova
                //.addField("gkeywordsbar", "w-12 w-L-5", { ixp: this.IxpSpis, name: "Keywords", saveData: "save", tooltip: "jres:25500014", disabled: readOnly }); //RC 25500014 : Klíčová slova
                .addField("gkeywordsbar", "w-12 w-L-5", { ixp: this.IxpSpis, name: "Keywords", saveData: "save", tooltip: "jres:25500014" /*, disabled: true*/ }) //RC 25500014 : Klíčová slova
                .addSection({ label: "jres:25300014", customClass: "DetailHeadInfoOneColPerRow DetailHeadInfo", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" })  //RC 25300014 : Poznámka
                .addRow("jres:25300015") //RC 25300015 : Poznámka
                .addField("gstringbox", "w-12", { name: "poznamka", customClass: "enabled", disabled: readOnly, rows: 3 });

            return form;
        };

        // Záložka zařízení UTZ1 - PZ
        createFormUTZ1(): Gordic.Forms.Form {
            var that = this;
            console.log("createFormUTZ1(): ");
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;

            var form = new Gordic.Forms.Form({ name: "UTZ1", layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" })

                .addRow("Druh zařízení")
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprczarDto(), {
                    dropdown: true, customClass: "enabled", disabled: readOnly,
                    name: "druh_zar", model: "model.druh_zar=value.druh_zar"
                    //validators: [new Gordic.Validators.Required()]
                })

                .addRow("jres:25500119") //RC 25500119 : Název zařízení
                .addField("gstringbox", "w-8", { name: "nazev_zar", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500120") //RC 25500120 : Typ zařízení
                .addField("gstringbox", "w-8", { name: "typ_zar", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500121") //RC 25500121 : Umístění zařízení
                .addField("gstringbox", "w-8", { name: "umist_zar", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500122") //RC 25500122 : Výrobní číslo
                .addField("gstringbox", "w-6", { name: "vyr_cis", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500123") //RC 25500123 : Evidenční číslo PZ
                .addField("gstringbox", "w-6", { name: "evid_cis", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500124") //RC 25500124 : Počet PZ
                .addField("gnumberbox", "w-1", { name: "pocet_pz", customClass: "enabled", disabled: readOnly, emptyValue: null })
                .addRow("jres:25500125") //RC 25500125 : Rok výroby
                .addField("gnumberbox", "w-1", { name: "rok_vyr", customClass: "enabled", disabled: readOnly, emptyValue: null })

            return form;
        };

        // Záložka zařízení UTZ2 - OZO
        createFormUTZ2(): Gordic.Forms.Form {
            var that = this;
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;

            var form = new Gordic.Forms.Form({ name: "UTZ2", layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" })

                .addRow("jres:25500151") //RC 25500151 : Druh zařízení
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprczarDto(), {
                    name: "druh_zar", model: "model.druh_zar=value.druh_zar", dropdown: true, customClass: "enabled", disabled: readOnly
                })
                .addRow("jres:25500152") //RC 25500152 : Rozsah činnosti
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprcrciDto(), {
                    name: "rozsah_cin", model: "model.rozsah_cin=value.rozsah_cin", dropdown: true, customClass: "enabled", disabled: readOnly
                })
                .addRow("jres:25500153") //RC 25500153 : Rozsah oprávnění
                .addField("gstringbox", "w-8", { name: "rozsah_opr", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500154") //RC 25500154 : Typ zkoušky
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprctzkDto(), {
                    name: "typ_zk", model: "model.typ_zk=value.typ_zk", dropdown: true, customClass: "enabled", disabled: readOnly
                })
                .addRow("jres:25500046") //RC 25500046 : Evidenční číslo
                .addField("gstringbox", "w-6", { name: "evid_cis", customClass: "enabled", disabled: readOnly })

            return form
        };

        // Záložka zařízení UTZ3 - PO
        createFormUTZ3(): Gordic.Forms.Form {
            var that = this;
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;

            var form = new Gordic.Forms.Form({ name: "UTZ3", layoutDescriptor: "L1M1S1, L-6-6-0, M-4-6-0, S-12-12-0" })

                .addSection({ customClass: "w-L-4" })
                .addRow("jres:25500151") //RC 25500151 : Druh zařízení
                .addField("gselectbox", Gordic.Prefabs.Select.sprczarDto(),
                    { name: "druh_zar", model: "model.druh_zar=value.druh_zar", customClass: "enabled", disabled: readOnly, dropdown: true })
                .addSection({ customClass: "w-L-4" })
                .addRow("jres:25500157") //RC 25500157 : Č.j. žádosti PO - TPZ
                .addField("gstringbox", { name: "evid_cis", customClass: "enabled", disabled: readOnly })
                .addSection({ customClass: "w-L-4" })
                .addRow("jres:25500156") //RC 25500156 : Datum žádosti PO - TPZ
                .addField("gdatebox", { name: "dat_pr", customClass: "enabled", disabled: readOnly })

            return form;
        };

        // Záložka stavba
        createFormStavba(): Gordic.Forms.Form {
            console.log("createFormStavba()");
            var that = this;
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;

            var form = new Gordic.Forms.Form({ name: "stavba", layoutDescriptor: "L1M1S1, L-1-10-0, M-4-8-0, S-12-12-0" })

                .addSection({ customClass: "w-L-6", layoutDescriptor: "L-2-8-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25500127") //RC 25500127 : Druh stavby
                .addField("gselectbox", Gordic.Prefabs.Select.sprspsrDto(),
                    {
                        name: "ixs_psr", model: "model.ixs_psr=value.ixs_psr", dropdown: true, customClass: "enabled", disabled: readOnly,
                        serverFilters: that.DBPar_SprRadPsrdr ? { ixs_dsr: [that.IxsDsr] } : {}
                    })
                .addSection({ customClass: "w-L-6", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" })
                .addRow()
                .addField("gradio", {
                    name: "s_rekonstrukce", customClass: "enabled", disabled: readOnly,
                    initialValue: 0,
                    radios: [
                        { value: 0, label: 'Novostavba' },
                        { value: 1, label: 'Rekonstrukce' },
                    ]
                })
                .addSection({ customClass: "w-L-6 DetailHeadInfoNotFirstRow", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25500128") //RC 25500128 : Název stavby
                .addField("gstringbox", { name: "nazev_st", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500129") //RC 25500129 : Místo stavby
                .addField("gstringbox", { name: "misto_st", customClass: "enabled", disabled: readOnly })
                .addSection({ customClass: "w-L-6 DetailHeadInfoNotFirstRow", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25500130") //RC 25500130 : Rozpočet
                .addField("gstringbox", "w-6", { name: "c_rozpocet", customClass: "enabled", disabled: readOnly })
                .addSection({ customClass: "w-L-6", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25500131") //RC 25500131 : Popis stavby
                .addField("gstringbox", "w-12", { name: "popis_st_zkr", autoSize: false, allowResize: true, rows: 5, customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500132") //RC 25500132 : Členění
                .addField("gstringbox", "w-12", { name: "struktura_st_zkr", autoSize: false, allowResize: true, rows: 10, customClass: "enabled", disabled: readOnly })
                .addSection({ customClass: "w-L-6", layoutDescriptor: "L-4-8-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25500133") //RC 25500133 : Nemovitosti
                .addField("gstringbox", "w-12", { name: "nem_st_zkr", autoSize: false, allowResize: true, rows: 15, customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200451") //RC 25200451 : Stavebník
                .addField("gstringbox", { name: "stavebnik_txt", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200452") //RC 25200452 : Předpokládaný termín zahájení stavby
                .addField("gdatebox", "w-6 w-M-12", { name: "dat_pzah_stavby", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200453") //RC 25200453 : Předpokládaný termín dokončení stavby
                .addField("gdatebox", "w-6 w-M-12", { name: "dat_pdokon_stavby", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200454") //RC 25200454 : Územní rozhodnutí/souhlas
                .addField("gstringbox", { name: "cj_uzem_rozhod", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200455") //RC 25200455 : Stavební povolení
                .addField("gstringbox", { name: "cj_stav_povol", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25200456") //RC 25200456 : Zkušební provoz
                .addField("gstringbox", { name: "cj_zkus_provoz", customClass: "enabled", disabled: readOnly })


            return form;
        };

        // Záložka statniDozor
        createFormStatniDozor(): Gordic.Forms.Form {
            var that = this;
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            console.log("createFormStatniDozor(): ");
            var form = new Gordic.Forms.Form({ name: "hlavicka", layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, S-12-12-0", tabLabel: "jres:25200023", opened: true })

                .addSection({ customClass: "w-L-6 w-M-6 DetailHeadInfo padingRightNone", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25500145") //RC 25500145 : Datum
                .addField("gdatebox", "w-12", { name: "dat_pr", customClass: "enabled", disabled: readOnly })
                .addSection({ customClass: "w-L-6 w-M-6 DetailHeadInfo enabled", layoutDescriptor: "L-4-8-0, M-2-10-0, S-12-12-0" })
                .addRow("jres:25500134") //RC 25500134 : Státní dozor
                .addField("gradio", "w-12", {
                    name: "druh_doz", //.value
                    customClass: "enabled", disabled: readOnly,
                    radios: [
                        { value: 10, label: "jres:25500144" }, //RC 25500144 : na oznámení
                        { value: 20, label: "jres:25500143" }, //RC 25500143 : nehlášený
                        { value: 30, label: "jres:25500142" }, //RC 25500142 : následný
                    ]
                })

                .addSection({ customClass: "w-L-12 DetailHeadInfo DetailHeadInfoNotFirstRow", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" })
                .addRow("jres:25500141") //RC 25500141 : Místo výkonu
                .addField("gstringbox", "w-11", { name: "misto_st", customClass: "enabled", disabled: readOnly })
                .addSection({ customClass: "w-L-12 DetailHeadInfo DetailHeadInfoNotFirstRow", layoutDescriptor: "L-1-11-0, M-2-10-0, S-12-12-0" })
                .addRow("jres:25500140") //RC 25500140 : Dozor proveden
                .addField("gstringbox", "w-11", { name: "rozsah_opr", customClass: "enabled", disabled: readOnly })

                .addSection({ customClass: "w-L-2 ", layoutDescriptor: "L-10-2-0, M-3-9-0, S-12-12-0" })
                .addRow("jres:25500139") //RC 25500139 : Počet odebraných dokladů
                .addField("gnumberbox", { name: "pocet_odok", customClass: "enabled", disabled: readOnly, emptyValue: null })
                .addSection({ customClass: "w-L-2", layoutDescriptor: "L-10-2-0, M-3-9-0, S-12-12-0" })
                .addRow("jres:25500138") //RC 25500138 : Počet osob při dozoru
                .addField("gnumberbox", { name: "pocet_os", customClass: "enabled", disabled: readOnly, emptyValue: null })
                .addSection({ customClass: "w-L-2", layoutDescriptor: "L-10-2-0, M-3-9-0, S-12-12-0" })
                .addRow("jres:25500137") //RC 25500137 : Počet správních řízení
                .addField("gnumberbox", { name: "pocet_sr", customClass: "enabled", disabled: readOnly, emptyValue: null })
                .addSection({ customClass: "w-L-2", layoutDescriptor: "L-10-2-0, M-3-9-0, S-12-12-0" })
                .addRow("jres:25500136") //RC 25500136 : Počet uložených pokut
                .addField("gnumberbox", { name: "pocet_pok", customClass: "enabled", disabled: readOnly, emptyValue: null })
                .addSection({ customClass: "w-L-4", layoutDescriptor: "L-8-4-0, M-5-7-0, S-12-12-0" })
                .addRow("jres:25500135") //RC 25500135 : Počet následných ověření odstranění závad
                .addField("gnumberbox", "w-3", { name: "pocet_over", customClass: "enabled", disabled: readOnly, emptyValue: null })

            return form;
        };

        // Záložka doprava
        createFormDoprava(): Gordic.Forms.Form {
            var that = this;
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            console.log("createFormDoprava");
            var form = new Gordic.Forms.Form({ name: "doprava", opened: true, layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" })

                .addRow("jres:25500046") //RC 25500046 : Evidenční číslo
                .addField("gstringbox", "w-6", { name: "evid_cis", customClass: "enabled", disabled: readOnly })

                .addRow("jres:25500147") //RC 25500147 : Provozování dopravy
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprcpvdDto(), {
                    name: "typ_pvd", model: "model.typ_pvd=value.typ_pvd", dropdown: true, customClass: "enabled", disabled: readOnly,
                    serverFilters: { typ_pvd: [10, 20, 30] }
                    //validators: [new Gordic.Validators.Required()]
                })
                .addRow("jres:25500148") //RC 25500148 : Název dopravy
                .addField("gstringbox", "w-8", { name: "nazev_zar", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500149") //RC 25500149 : Rozsah služeb
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprcrslDto(), {
                    name: "rozsah_sl", model: "model.rozsah_sl=value.rozsah_sl", dropdown: true, customClass: "enabled", disabled: readOnly
                    //validators: [new Gordic.Validators.Required()]
                })

            return form;
        };

        // Záložka dráha
        createFormDraha(): Gordic.Forms.Form {
            var that = this;
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            console.log("draha");
            var form = new Gordic.Forms.Form({ name: "draha", opened: true, layoutDescriptor: "L1M1S1, L-2-10-0, M-4-8-0, S-12-12-0" })

                .addRow("jres:25500046") //RC 25500046 : Evidenční číslo
                .addField("gstringbox", "w-6", { name: "evid_cis", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500147") //RC 25500147 : Provozování dopravy
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprcpvdDto(), {
                    name: "typ_pvd", model: "model.typ_pvd=value.typ_pvd", dropdown: true, customClass: "enabled", disabled: readOnly,
                    serverFilters: { typ_pvd: [10, 30] }
                    //validators: [new Gordic.Validators.Required()]
                })
                .addRow("jres:25500148") //RC 25500148 : Název dopravy
                .addField("gstringbox", "w-8", { name: "nazev_zar", customClass: "enabled", disabled: readOnly })
                .addRow("jres:25500158") //RC 25500158 : Popis dráhy
                .addField("gstringbox", "w-8", { name: "popis_drahy_zkr", customClass: "enabled", disabled: readOnly, autoSize: false, allowResize: true, rows: 10 })

            return form;
        };

        private Zahajit(): void {
            var that = this;
            console.log("Zahájit řízení");
            //that.call("Zahajit", { ixpSpis: that.model.ixp_spis }).done(function (ret) {
                //if (ret.Item1 != "")
                //    that.dialogs.alert(ret.Item1); // zobrazeni upozorneni uzivateli
                //else {
                //    if (ret.Item2 === 0) { // pokud nejsou prilozene dokumenty
                //        that.Vyridit_OpenDetail();
                //    };
                //    if (ret.Item2 > 0) { // pokud je pocet prilozenych dokumentu vetsi nez 0
                //that.dialogs.confirm("jres:25500221", "jres:25500223" + ret.Item2)  //RC 25500223 : Přejete si opravdu rozhodnout řízení? Ve spise jsou vloženy dokumenty jiných agend. Počet:
                that.dialogs.confirm("jres:25300049")  //RC 25300049 : Přejete si opravdu zahájit řízení?
                    .on('yes', (ev, value) => {
                        that.Zahajit_OpenDetail();
                    });
                //    };
                //}

            //})
        }

        private Prerusit(): void {
            // ZATIM NEOTESTOVANO, ANI SE NEPOUZIVA
            var that = this;
            console.log("Prerusit");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200356", true) //RC 25200356 : Přerušit do
                .addField("gdatebox", { validators: [new Gordic.Validators.Required()], name: "Datum", model: "Datum", valueType: "date" })
                .addRow("jres:25200357", true) //RC 25200357 : Důvod přerušení
                .addField("gstringbox", { validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: 150 })], name: "Duvod", model: "Duvod" });
            var datum = new Date();
            var dlg = this.dialogs.simpleForm("jres:25200355", formDef, { Datum: datum, Duvod: "" }, { height: 300, modal: true, noClose: false });  //RC 25200355 : Přerušení řízení
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("Datum");
                    console.log(retVal.Datum);
                    console.log("Duvod");
                    console.log(retVal.Duvod);
                    that.call("PrerusitSpisSpr", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena, datumPreruseniDo: retVal.Datum, duvodPreruseni: retVal.Duvod }) // stary LK take posila aktualni dat_zmena z dto
                        .done(function (val) {
                            console.log("preruseno");
                            that._reloadData();
                        })
                        .fail(function (val) {
                        });
                }
            });
        }

        private Pokracovat(): void {
            var that = this;
            console.log("Pokracovat");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200358", true) //RC 25200358 : Lhůta pro rozhodnutí do
                .addField("gdatebox", { validators: [new Gordic.Validators.Required()], name: "Datum", model: "Datum", valueType: "date" });
            var datum = new Date();
            var dlg = this.dialogs.simpleForm("jres:25200359", formDef, { Datum: datum }, { height: 200, modal: true, noClose: false });  //RC 25200359 : Pokračování ve vyřizování řízení
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("Datum");
                    console.log(retVal.Datum);
                    that.call("PokracovatSpisSpr", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena }) // stary LK neposila datumPokracovaniDo a take posila aktualni dat_zmena z dto
                        .done(function (val) {
                            console.log("pokracuje");
                            that._reloadData();
                        })
                        .fail(function (val) {
                        });
                }
            });
        }

        private ZrusitRozhodnuti(): void {
            var that = this;
            console.log("ZrusitRozhodnuti");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200362", true) //RC 25200362 : Lhůta pro rozhodnutí do
                .addField("gdatebox", { validators: [new Gordic.Validators.Required()], name: "Datum", model: "Datum", valueType: "date" });
            var datum = new Date();
            datum.setDate(datum.getDate() + 30);
            var dlg = this.dialogs.simpleForm("jres:25200361", formDef, { Datum: datum }, { height: 200, modal: true, noClose: false });  //RC 25200361 : Zrušení rozhodnutí
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("Datum");
                    console.log(retVal.Datum);
                    that.call("ZruseniRozhodnuti", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena, datumVyrizeni: retVal.Datum, poznamka: that.model.poznamka }) // stary LK take posila aktualni dat_zmena z dto
                        .done(function (val) {
                            console.log("zruseno rozhodnuti");
                            that._reloadData();
                        })
                        .fail(function (val) {
                        });
                }
            });
        }

        private Rozhodnout(): void {
            var that = this;
            console.log("Rozhodnout rizeni");
            that.call("Rozhodnout", { ixpSpis: that.model.ixp_spis }).done(function (ret) {
                //if (ret.Item1 != "")
                //    that.dialogs.alert(ret.Item1); // zobrazeni upozorneni uzivateli
                //else {
                //    if (ret.Item2 === 0) { // pokud nejsou prilozene dokumenty
                //        that.Vyridit_OpenDetail();
                //    };
                //    if (ret.Item2 > 0) { // pokud je pocet prilozenych dokumentu vetsi nez 0
                        //that.dialogs.confirm("jres:25500221", "jres:25500223" + ret.Item2)  //RC 25500223 : Přejete si opravdu rozhodnout řízení? Ve spise jsou vloženy dokumenty jiných agend. Počet:
                            that.dialogs.confirm("jres:25300020")  //RC 25300020 : Přejete si opravdu rozhodnout řízení?
                            .on('yes', (ev, value) => {
                                that.Vyridit_OpenDetail();
                            });
                //    };
                //}

            })
        }

        private Zahajit_OpenDetail(): void {
            var that = this;

            that.dialogs.showWindow(["Gordic.Spr.WebApp.GDetailZahajeniSprRizeni"], {  // zobrazeni detailu pro zahájení
                IxpSpis: that.model.ixp_spis,
                Id: "zahajeniSprRizeniDetail"
            }, { width: 520, height: 430 })
                .on(("close"), (ev, r) => {
                    if (r != undefined && r.Zmena != undefined && r.Zmena) {
                        console.log("rizeni zahajeno", r.Zmena);
                        that._reloadData();
                    }
                });
        }

        private Vyridit_OpenDetail(): void {
            var that = this;

            that.dialogs.showWindow(["Gordic.Spr.WebApp.GDetailRozhodnutiSprSpisu"], {  // zobrazeni detailu pro rozhodnutí
                IxpSpis: that.model.ixp_spis,
                Id: "vyrizeniSprSpisuDetail"
            }, { width: 520, height: 430 })
                .on(("close"), (ev, r) => {
                    if (r != undefined && r.Zmena != undefined && r.Zmena) {
                        console.log("spis vyrizen", r.Zmena);
                        that._reloadData();
                    }
                });
        }

        private PredatNadrizenemuSU(): void {
            var that = this;
            console.log("PredatNadrizenemuSU");
            that.dialogs.confirm("jres:25200344") //RC 25200344 : Opravdu chcete předat spis nadřízenému orgánu (úřadu)?
                .on('close', (ev, retValue) => {
                    if (retValue === "yes") {
                        that.call("PredatNadrizenemuSU", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena })  // stary LK take posila aktualni dat_zmena z dto a navic ta metoda s nim pak stejne vubec nepracuje
                            .done(function (val) {
                                console.log("spis predan");
                                that._reloadData();
                            })
                            .fail(function (val) {
                            });
                    }
                });
        }

        private VratitPodrizenemuSU(): void {
            // ZATIM NEOTESTOVANO, ANI SE NEPOUZIVA
            var that = this;
            console.log("VratitPodrizenemuSU");
            that.dialogs.confirm("jres:25200346") //RC 25200346 : Opravdu chcete vrátit spis podřízenému orgánu (úřadu)?
                .on('close', (ev, retValue) => {
                    if (retValue === "yes") {
                        that.call("VratitPodrizenemuSU", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena })  // stary LK take posila aktualni dat_zmena z dto a navic ta metoda s nim pak stejne vubec nepracuje
                            .done(function (val) {
                                console.log("spis vracen");
                                that._reloadData();
                            })
                            .fail(function (val) {
                            });
                    }
                });
        }

        private Odvolani(): void {
            var that = this;
            console.log("Odvolani");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200349", true) //RC 25200349 : Lhůta pro rozhodnutí o odvolání
                .addField("gdatebox", { validators: [new Gordic.Validators.Required()], name: "Datum", model: "Datum", valueType: "date" });
            var datum = new Date();
            datum.setDate(datum.getDate() + 30);
            var dlg = this.dialogs.simpleForm("jres:25200350", formDef, { Datum: datum }, { height: 200, modal: true, noClose: false });  //RC 25200350 : Odvolání proti rozhodnutí
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("Datum");
                    console.log(retVal.Datum);
                    that.call("Odvolani", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena, datumDo: retVal.Datum }) // stary LK take posila aktualni dat_zmena z dto
                        .done(function (val) {
                            console.log("odvolano");
                            that._reloadData();
                        })
                        .fail(function (val) {
                        });
                }
            });
        }

        private PotvrditRozhodnuti(): void {
            var that = this;
            console.log("PotvrditRozhodnuti");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200368", true) //RC 25200368 : Datum nabytí právní moci
                .addField("gdatebox", {
                    validators: [new Gordic.Validators.Required(), new Gordic.Validators.Range({ max: new Date() })], name: "Datum", model: "Datum", valueType: "date"
                });
            var datum = new Date();
            var dlg = this.dialogs.simpleForm("jres:25200367", formDef, { Datum: datum }, { height: 200, modal: true, noClose: false });  //RC 25200367 : Potvrzení rozhodnutí
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("Datum");
                    console.log(retVal.Datum);
                    that.call("NabytiPravniMoci", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena, datumPrMoci: retVal.Datum, potvrzeniRozhodnuti: true }) // stary LK take posila aktualni dat_zmena z dto
                        .done(function (val) {
                            console.log("potvrzeno rozhodnuti");
                            that._reloadData();
                        })
                        .fail(function (val) {
                        });
                }
            });
        }

        private NabytiPravniMociSpr(): void {
            var that = this;
            console.log("NabytiPravniMociSpr");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200368", true) //RC 25200368 : Datum nabytí právní moci
                .addField("gdatebox", {
                    validators: [new Gordic.Validators.Required(), new Gordic.Validators.Range({ max: new Date() })], name: "Datum", model: "Datum", valueType: "date"
                });
            var datum = new Date();
            var dlg = this.dialogs.simpleForm("jres:25200373", formDef, { Datum: datum }, { height: 200, modal: true, noClose: false });  //RC 25200373 : Nabytí právní moci
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("Datum");
                    console.log(retVal.Datum);
                    that.call("NabytiPravniMoci", { ixpSpis: that.model.ixp_spis, datZmena: that.model.dat_zmena, datumPrMoci: retVal.Datum, potvrzeniRozhodnuti: false }) // stary LK take posila aktualni dat_zmena z dto
                        .done(function (val) {
                            console.log("pravni moc nabyta");
                            that._reloadData();
                        })
                        .fail(function (val) {
                        });
                }
            });
        }

        //private UzavritSpisSpr(): void {
        //    var that = this;
        //    console.log("UzavritSpisSpr");
        //    that.dialogs.confirm("jres:25200375") //RC 25200375 : Přejete si opravdu uzavřít spis?
        //        .on('close', (ev, retValue) => {
        //            if (retValue === "yes") {
        //                var minDatum = new Date(that.model.dat_vyriz_ssl);
        //                var formDef = new Gordic.Forms.Form()
        //                    .addSection()
        //                    .addRow("jres:25200376", true) //RC 25200376 : Uzavřel
        //                    .addField("gselectbox", "w-11", Gordic.Gin.Fields.ginsfunSSU(
        //                        {
        //                            validators: [new Gordic.Validators.Required()],
        //                            //disabled: oproti staremu LK se nebude nastavovat, form se odjinud nevola
        //                            name: "ixsFunUzav",
        //                            model: "ixsFunUzav",
        //                            itemTemplate: function (output: any) {
        //                                return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
        //                            },
        //                            serverFilters: {
        //                                aktivita: [100]
        //                            },
        //                            flag: "required"
        //                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
        //                    .addRow("jres:25200377", true) //RC 25200377 : Datum uzavření
        //                    .addField("gdatebox", "w-11", {
        //                        //disabled: oproti staremu LK se nebude nastavovat, form se odjinud nevola
        //                        validators: [
        //                            new Gordic.Validators.Required(),
        //                            new Gordic.Validators.Range({ min: minDatum, message: "jres:25200381".format(Gordic.Templates.Formatters.datetime(minDatum, "dd.MM.yyyy")) })], //RC 25200381 : Datum uzavření musí být větší nebo rovno datu vyřízení {0}
        //                        name: "Datum", model: "Datum", valueType: "date"
        //                    });

        //                var datum = new Date();
        //                var dlg = this.dialogs.simpleForm("jres:25200378", formDef, { Datum: datum }, { height: 250, modal: true, noClose: false });  //RC 25200378 : Uzavření spisu
        //                dlg.on("close", function (ev, retVal) {
        //                    if (retVal) {
        //                        that.call("UzavritSpisSpr", { ixpSpis: that.model.ixp_spis, ixsFunUzav: retVal.ixsFunUzav.ixs_fun, datumUzavreni: retVal.Datum })
        //                            .done(function (val) {
        //                                console.log("spis uzavren");
        //                                that._reloadData();
        //                            })
        //                            .fail(function (val) {
        //                            });
        //                    }
        //                });
        //            }
        //        });
        //}

        private ZmenDruhRizeniSpravnihoSpisu(): void {
            var that = this;
            console.log("ZmenDruhRizeniSpravnihoSpisu");
            var width = 650;
            var height = 650;
            var modal = true;
            that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDruhuRizeniProFunkci", {}],
                { TypSr: 0 /*that.TypSr*/, ShowOkButton: true }, { width: width, height: height, modal: modal }) //20240808-JSir-potřebuji zobrazit všechny typy sř    // stary LK vola s TypSr: 0 (zobrazi se vsechny typy)
                .on("close", (ev, retValue) => {
                    console.log("IXS_DSR");
                    if (retValue != undefined && retValue.IxsDsr != undefined) {
                        console.log(retValue.IxsDsr);
                        that.call("ZmenDruhRizeniSpravnihoSpisu", {
                            IxpSpis: that.model.ixp_spis,
                            IxsDsr: retValue.IxsDsr
                        }).done(() => {
                            that._reloadData();
                        });
                    }
                });
        }

        private _reloadData(): void {
            var gTabManager = this.find(".gtabmanager");
            var active;
            if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
            this.zmena = true;
            this.load({ RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, internal: true, selectedTabGroup: active });
        }

        private renderKPI(): void {
            var that = this;

            //1. KPI pro lhůtu           
            let dat_lhuta = this.formatDatum(this.model.dat_lhuta?.split('T')[0]) ?? "";           
            let lhuta_dni = this.model.lhuta_dni;

            let jeRozhodnuto = !!this.model.dat_rozh;
            let jeVTerminu = this.model.lhuta_dni > -1;

            //Část pro první KPI rozhodnutí v termínu
            let icon = jeVTerminu ? "gi-vyrizenopred" : "gi-vyrizenopo";
            let meaning = jeRozhodnuto
                ? (jeVTerminu ? "positive" : "negative")
                : (jeVTerminu ? "info" : "negative");
            let primaryText = (jeRozhodnuto ? "Rozhodnuto" : "Nerozhodnuto")
                + (jeVTerminu ? " před termínem" : " po termínu");    
            let secondaryText_rozh = "<b>" + dat_lhuta + "</b> to je <b>" + lhuta_dni + "</b> dní";

            if (this.model.dat_lhuta == null) {
                icon = "gi-vyrizenopo";
                meaning = "info";
                primaryText = "Lhůta neběží";
                secondaryText_rozh = "";
            }

            //2. KPI pro stav
            let dat_rozh;
            if (this.model.dat_rozh == null) {
                dat_rozh = "???";
            }
            else {
                dat_rozh = this.formatDatum(this.model.dat_rozh?.split('T')[0]) ?? "???";
            }
            
            let stav;
            if (this.model.stav == 5) stav = "Nezahájeno";
            else if (this.model.stav == 10) stav = "Probíhající";
            else if (this.model.stav == 20) stav = "Přerušeno";
            else if (this.model.stav >= 30) stav = "Rozhodnuto";         

            this.kpi1 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate(),
                {
                    data: new Gordic.Data.View([
                        {
                            icon: icon,
                            primaryText: primaryText,
                            secondaryText: secondaryText_rozh,
                            meaning: meaning,
                            visible: true
                        },
                        {
                            icon: "",
                            primaryText: stav,
                            secondaryText: dat_rozh,
                            meaning: "info",
                            visible: true
                        },
                    ]),              
                }
            );   

            //---------------------------------------------------------KPI právní moc---------------------------------------------------------

            //Akce KPI
            let pr_action = new GAction({
                name: "kpiAction", run: function (test) {
                    that.NabytiPravniMociSpr();
                }
            });

            let secondaryText = this.formatDatum(this.model.dat_pr_moc_ssl?.split('T')[0]) ?? "";
            let pr_meaning = secondaryText == "" ? "negative" : "positive";

            this.kpi2 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiOneRowTextOneRowValueTemplate(),
                {
                    data: new Gordic.Data.View([                     
                        {
                            name: "pr_moc",
                            icon: "",
                            primaryText: "Právní moc",
                            secondaryText: secondaryText,
                            meaning: pr_meaning,
                            visible: true,

                        },
                    ], { key: ["name"] }),
                    disabledItems: this.model.dat_pr_moc_ssl == null ? ["pr_moc"] : [""],
                    defaultAction: pr_action,

                }
            ); 

            //---------------------------------------------------------KPI doručení/vypravení---------------------------------------------------------

            let jeVypraveno = this.model.pu_s_vypraveno == 1;
            let jeDoruceno = this.model.pu_s_doruceno == 1;
            let datum;
            let dorucenoText = "";
            let dorucenoMeaning = "";

            if (jeVypraveno) {
                if (jeDoruceno) {
                    datum = this.formatDatum(this.model.pu_dat_doruceni?.split('T')[0]);
                    dorucenoText = "Doručeno";
                    dorucenoMeaning = "info";
                }
                else {
                    datum = this.formatDatum(this.model.pu_dat_vypraveni?.split('T')[0]);
                    dorucenoText = "Vypraveno";
                    dorucenoMeaning = "positive";
                }
            }
            else {
                dorucenoText = "Nevypraveno";
                datum = "";
                dorucenoMeaning = "negative";
                if (jeDoruceno) datum = "CHYBA: Doručeno bez vypravení"
            }

            this.kpi3 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiOneRowTextOneRowValueTemplate(),
                {
                    data: new Gordic.Data.View([
                        {
                            icon: "",
                            primaryText: dorucenoText,
                            secondaryText: datum,
                            meaning: dorucenoMeaning,
                            visible: true,
                        },
                    ]),
                }
            ); 

            //---------------------------------------------------------KPI Subjekty k aktualizaci---------------------------------------------------------
            let zmeny_action = new GAction({
                name: "kpiActionZmeny", run: function () {
                    if (that.model.zmena_esu_pocet == 0) return;
                    that.dialogs.confirm("Přejete si aktualizovat subjekty?")
                        .on('close', (ev, retValue) => {
                            if (retValue === "yes") {
                                that.call("AktualizovatSubjektyESU", { ixp_spis: that.model.ixp_spis })
                                    .done(function (result) {

                                        that._reloadData();
                                    });
                            }
                            else if (retValue === "no") {
                                
                            }
                        });
                }
            });

            let pocet = this.model.zmena_esu_pocet;
            
            this.kpi4 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiIconValueTwoRowsTextTemplate(),
                {
                    //Pokud je počet změn větší jak 0, tak zobrazím KPI v režimu warning
                    //Pokud není, tak zobrazím positive
                    data: new Gordic.Data.View( pocet > 0 ? [
                        {                       
                            icon: "fa-exclamation-triangle",
                            value: pocet,
                            primaryText: "Počet subjektů",
                            secondaryText: "k aktualizaci",
                            meaning: "warning", 
                        }]
                        :
                        [{
                            icon: "fa-check-circle",
                            value: "",
                            primaryText: "Subjekty jsou aktuální",
                            secondaryText: "",
                            meaning: "positive",                          
                        }]
                    ),
                    defaultAction: zmeny_action
                }
            );
        }

        private formatDatum(date: string): string {
            if (!date) return "";
            let parts = date.split('-');
            return parts[2] + '.' + parts[1] + '.' + parts[0];
        }
    }
}