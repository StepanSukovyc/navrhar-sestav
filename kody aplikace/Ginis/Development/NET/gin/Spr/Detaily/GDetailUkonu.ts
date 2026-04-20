namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    //export class GDetailUkonu extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
    export class GDetailUkonu extends GDetailBuilderContent<
        Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions &
        ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> &
        Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions &
        ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions>> &
        /*Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GDetailUkonuDto> &*/
        Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSprUkonDto> &
        /*ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GDetailUkonuDto>>>*/
        ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSprUkonDto>>>
    > implements IGContent {
        IxpSpis: string;
        IxpUkon: string;
        IxsDsr: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        private dotcSubjUkonuTab: JQuery<HTMLElement>;
        private Param_SprRadParcj: number;
        private Param_SprRadVparcj: number;
        private Param_SprRadRegen: number;
        private kpi1: JQuery<HTMLElement>;
        private kpi: JQuery<HTMLElement>;
        private gridHasRows: boolean = false;

        onContentReady() {
            var that = this;
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) this.originalModel = {
                ixp_spis: this.IxpSpis, ixp_ukon: this.IxpUkon
            };
            //this.loadData(this).done(function () { 
            //    that.setRezim(that.Rezim, that);
            //});
            this.onContentReadyBase(that);
                       

            
            let dat_vyp = that.model.dat_vypraveni ? this.formatDatum(that.model.dat_vypraveni?.split('T')[0]) : "???";
            let dat_dor = that.model.dat_doruceni ? this.formatDatum(that.model.dat_doruceni?.split('T')[0]) : "???";
            let meaningV = that.model.s_vypraveno ? "positive" : "negative";
            let meaningD = that.model.s_doruceno ? "positive" : "negative";
            let primaryTextV = that.model.s_vypraveno ? "Vypraveno" : "Vypravení";
            let primaryTextD = that.model.s_doruceno ? "Doručeno" : "Doručení";

            let action = new GAction({
                name: "kpiAction", run: function () {
                    console.log("kpiAction - doruceni/odeslani");
                    if (that.gridHasRows) {
                        that.call("ObcerstvitDoruceniOdeslani", { ixpUkon: that.model.ixp_ukon }).done(function (data) {
                            // očekávám návrat celého Dto
                            that.model = data;
                            // aktualizace detailu
                            that._reloadData();
                        })
                    }
                    else {
                        that.dialogs.alert("jres:35600003"); //RC 35600003 : Nelze občerstvit doručení/odeslání, protože úkon nemá žádné dotčené subjekty.
                    }
                }
            });

            this.kpi1 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate(),
                {
                    data: new Gordic.Data.View([
                        {        
                            name: "vypravit",
                            icon: "gi-send",
                            value: dat_vyp,
                            primaryText: primaryTextV,
                            meaning: meaningV,
                            visible: true                            
                        },
                        {
                            name: "dorucit",
                            icon: "gi-send",
                            value: dat_dor,
                            primaryText: primaryTextD,
                            meaning: meaningD,
                            visible: true
                        }
                    ], { key: ["name"] }),
                    disabledItems: that.model.Permissions.CanKeSchvaleni.value || that.model.Permissions.CanSchvalit.value ? ["vypravit", "dorucit"] : [""],
                    defaultAction: action, 
                }
            );      

            that.kpi1.appendTo(this.kpi);
                        
            ResizeManager.forceRefresh(this.element.get(0)!);
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;
            
            builder.withComponent<this>("ukonDetail", {
                tabGroups:
                {
                    tabGroupZakladni:
                    {
                        caption: "Profil úkonu"
                    },
                },
                tabs:
                {
                    tabZakladni:
                    {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupZakladni" }, title: "Profil",
                        },
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());


                            //that.findFields("adresa_ruian").gfield("getButton", "selector").gbutton("option", "params").action!.enabled(false);
                        }
                    },
                    tabkpi: {
                        tabParams: {
                            opened: true, locked: true, group: { id: "tabGroupZakladni" }, title: "jres:25500313" //RC 25500313 : Vypravení, doručení
                        },
                        init: function (tab) {
                            that.kpi = tab;
                        }
                    },
                    tabDotcSubjUkonu:
                    {
                        tabParams: {
                            opened: true, locked: false, group: { id: "tabGroupZakladni" }, title: "jres:25200123",  //RC 25200123 : Dotčené subjekty
                        },
                        contentParams: GContent.createInitializer(Gordic.Spr.WebApp.GDotcSubjUkonuControl(that)),
                        init: function (tab) {
                            that.dotcSubjUkonuTab = tab;
                        }
                    },
                },
                actions:
                {
                    //actVlozitElObraz:
                    //{
                    //    caption: "jres:25200259", //RC 25200259 : El. obraz
                    //    tooltip: "jres:25200262", //RC 25200262 : Vložit elektronický obraz
                    //    run: function (this: GAction, ev, ctx) {
                    //        console.log("VlozitElObraz");
                    //        return Gordic.Wfl.Dialogs.GPrilohyDlg(that, { Ixp: that.model.ixp_ukon }, Gin.Globals.Enums.ModOtevreni.showModalWindow);
                    //    }
                    //},
                    //actKonvertovatSchvalit:
                    //{
                    //    caption: "jres:25200260", //RC 25200260 : Konverze
                    //    icon: "fa-file-pdf-o",
                    //    tooltip: "jres:25200261", //RC 25200261 : Konvertovat hromadně do PDF / podepsat elektronickým podpisem / schválit.
                    //    run: function (this: GAction, ev, ctx) {
                    //        that.KonvertovatSchvalit();
                    //    }
                    //},
                    actVlozitDoSpisu:
                    {
                        caption: "jres:25300023", //RC 25300023 : Vložit do spisu
                        run: function (this: GAction, ev, ctx) {
                            that.VlozitDoSpisu();
                        }
                    },
                    actKeSchvaleni:
                    {
                        caption: "jres:25300021", //RC 25300021 : Ke schválení
                        run: function (this: GAction, ev, ctx) {
                            that.KeSchvaleni();
                        }
                    },
                    actSchvalit:
                    {
                        caption: "jres:25200239", //RC 25200239 : Schválit
                        run: function (this: GAction, ev, ctx) {
                            that.Schvalit();
                        }
                    },
                    actStornovat:
                    {
                        caption: "jres:25200249", //RC 25200249 : Stornovat
                        run: function (this: GAction, ev, ctx) {
                            that.Stornovat();
                        }
                    },
                    actNastavitLhutu:
                    {
                        caption: "jres:25200251", //RC 25200251 : Lhůta
                        run: function (this: GAction, ev, ctx) {
                            that.NastavitLhutu();
                        }
                    },
                    actNabytPravniMoc:
                    {
                        caption: "jres:25200250", //RC 25200250 : Právní moc
                        run: function (this: GAction, ev, ctx) {
                            that.NabytPravniMoc();
                        }
                    },
                    actDetailDokumentu:
                    {
                        caption: "jres:25200255", //RC 25200255 : Dokument
                        run: function (this: GAction, ev, ctx) {
                            that.DetailDokumentu();
                        }
                    },
                    actPokyny:
                    {
                        caption: "jres:25200254", //RC 25200254 : Pokyny
                        visible: false, // bylo zakazano ve starem LK
                        run: function (this: GAction, ev, ctx) {
                            that.Pokyny();
                        }
                    },
                    actVzor:
                    {
                        caption: "jres:25200252", //RC 25200252 : Vzor
                        visible: false, // Jarda: zatim nedelat
                        run: function (this: GAction, ev, ctx) {
                            that.Vzor();
                        }
                    },
                    actPoznamka:
                    {
                        caption: "jres:25200253", //RC 25200253 : Poznámka
                        visible: false, // Jarda: zatim nedelat
                        run: function (this: GAction, ev, ctx) {
                            that.Poznamka();
                        }
                    },
                    actWflCinnostiZadostOPodpis: {                        
                        icon: ["gi-epk", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                        caption: "jres:25500315", //RC 25500315 : Vložit do podpisové knihy
                        run: function () {
                            that.ZadostOPodpis();                            
                        },
                    },
                    actWflCinnostiSchvalovaciProces: {
                        icon: "gi-schvyr",
                        caption: "jres:25300005", //RC 25300005 : Schvalovací proces
                        run: function () {
                            that.SchvalovaciProces();
                        },                        
                    },
                    //actOtevreniElektronickehoObrazu:
                    //{
                    //    caption: "OtevreniElektronickehoObrazu",
                    //    run: function (this: GAction, ev, ctx) {
                    //        that.OtevreniElektronickehoObrazu();
                    //    }
                    //},
                    actTiskSablony: GAction.createPrintAction({
                        name: "actTiskSablony",
                        caption: "Generovat/Tisk",   //RC 25200256 : Tisk
                        tema: "spr_ptm_ukn",
                        customDto: function () {
                            return that.GetCustomDtoProTisk();
                        },
                        serverRestrictionAlfMethod: "Gordic.Spr.WebApp.GDetailUkonu:GetRestrictionAlf",
                        serverParameterMethod: "Gordic.Spr.WebApp.GDetailUkonu:ServerParameterMethod",
                        reportFinished: function () {
                            if (that.model.ElektronickyObrazTitle == null || that.model.ElektronickyObrazTitle == "")
                                that._reloadData();
                        },
                        dialogOpening: function (action) {
                            var def = $.Deferred();
                            if (that.model.ElektronickyObrazTitle != null && that.model.ElektronickyObrazTitle != "") {
                                that.dialogs.messageBox("jres:25200174", "jres:25200273", GDlg.mbbYesNoCancel, GDlg.mbiQuestion) //RC 25200273 : Chcete otevřít dříve uložený dokument z úložiště?
                                    .on("yes", function () {
                                        if (that.Param_SprRadRegen == 1) {
                                            that.dialogs.messageBox("jres:25200174", "jres:25200274", GDlg.mbbYesNoCancel, GDlg.mbiQuestion) //RC 25200274 : Chcete znovu vygenerovat datové položky do formuláře?
                                                .on("yes", function () {
                                                    // TOTO JE POTREBA, ALE SSL TO ZATIM NEUMI
                                                    //that.call("PregenerovatElektronickyObraz", {})
                                                    //    .done(function (errMes) {
                                                    //        if (errMes == "") {
                                                    //            console.log("el obraz pregenerovan");
                                                    //            def.reject();
                                                    //        }
                                                    //        else
                                                    //            that.dialogs.alert(errMes).on("close", function () {
                                                    //                def.reject();
                                                    //            });
                                                    //    });

                                                    // TOTO TU JE DOCASNE, NEZ BUDE HOTOVE PREGENEROVANI
                                                    that.OtevreniElektronickehoObrazu();
                                                    def.reject();
                                                })
                                                .on("no", function () {
                                                    that.OtevreniElektronickehoObrazu();
                                                    def.reject();
                                                })
                                                ;
                                        } else {
                                            that.OtevreniElektronickehoObrazu();
                                            def.reject();
                                        }
                                    })
                                    .on("no", function () {
                                        that.dialogs.messageBox("jres:25200174", "jres:25200275", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200275 : Původní dokument bude po uložení nově vygenerovaného dokumentu přepsán.;;Chcete opravdu pokračovat?
                                            .on("yes", function () {
                                                def.resolve();
                                            })
                                            .on("no", function () {
                                                def.reject();
                                            });
                                    })
                                    .on("cancel", function () {
                                        def.reject();
                                    })
                                    ;
                            }
                            else {
                                def.resolve();
                            }
                            return def.promise();
                        }
                    }),
                    actOdeslat:
                    {
                        caption: "jres:25200258", //RC 25200258 : Odeslání
                        run: function (this: GAction, ev, ctx) {
                            that.Odeslat();
                        }
                    },
                    actPrilohy:
                    {
                        caption: "jres:25200383", //RC 25200383 : Přílohy
                        tooltip: "jres:25200384", //RC 25200384 : Přílohy
                        run: function (this: GAction, ev, ctx) {
                            console.log("Prilohy");
                            return Gordic.Wfl.Dialogs.GPrilohyDlg(that, { Ixp: that.model.ixp_ukon }, Gin.Globals.Enums.ModOtevreni.showModalWindow);
                        }
                    },
                    actKonverzePdf:
                    {
                        caption: "jres:25200441", //RC 25200441 : Konvertovat/podepsat
                        tooltip: "jres:25200442", //RC 25200442 : Konvertovat hromadně do PDF / podepsat elektronickým podpisem
                        icon: "fa-file-pdf-o",
                        run: function (this: GAction, ev, ctx) {
                            that.KonverzePdf();
                        }
                    },
                },
                menuBar: [
                    {
                        id: "menuUkon", caption: "jres:25200382", type: "static", after: "akce", children: [ //RC 25200382 : Úkon
                            //{ id: "menuVlozitElObraz", action: "actVlozitElObraz", favorite: true },
                            //{ id: "menuKonvertovatSchvalit", action: "actKonvertovatSchvalit", favorite: true },
                            { id: "menuVlozitDoSpisu", action: "actVlozitDoSpisu", favorite: false },
                            { id: "menuKeSchvaleni", action: "actKeSchvaleni", favorite: false },
                            { id: "menuSchvalit", action: "actSchvalit", favorite: false },
                            { id: "menuOdeslat", action: "actOdeslat", favorite: false },
                            { id: "menuStornovat", action: "actStornovat", favorite: false },
                            { id: "menuNastavitLhutu", action: "actNastavitLhutu", favorite: false },
                            { id: "menuNabytPravniMoc", action: "actNabytPravniMoc", favorite: false },
                            { id: "menuPokyny", action: "actPokyny", favorite: false },
                            { id: "menuVzor", action: "actVzor", favorite: false },
                            { id: "menuPoznamka", action: "actPoznamka", favorite: false },
                            { id: "menuTiskSablony", action: "actTiskSablony", favorite: false },
                            { id: "menuDetailDokumentu", action: "actDetailDokumentu", favorite: false },
                            { id: "menuPrilohy", action: "actPrilohy", favorite: false },
                            { id: "menuKonverzePdf", action: "actKonverzePdf", favorite: true },
                            { id: "menuWflCinnostiSchvalovaciProces", action: "actWflCinnostiSchvalovaciProces", favorite: true },
                            { id: "menuWflCinnosti", action: "actWflCinnostiZadostOPodpis", favorite: true },
                            //{ id: "menuOtevreniElektronickehoObrazu", action: "actOtevreniElektronickehoObrazu", favorite: true },
                        ]
                    }
                ],
                //kpis: [
                //    { //observable object bude přidán do this.kpis.kpiOne 
                //        name: "kpiOne",
                //        chartType: "liquid",
                //        data: 0,
                //        value: 0,
                //        unit: "%",
                //        title: "KPI 1",
                //        text: "Text pro první kpi.",
                //        meaning: "neutral",
                //        showTextIcon: false,
                //    },

                // ]
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

            if (that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) {
                that.listControls_setup({
                    rowToDto: function (gridState) {
                        var gTabManager = that.find(".gtabmanager");
                        var active;
                        if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                        return { Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, IxpUkon: gridState.currentRow.data.ixp_ukon, selectedTabGroup: active };
                    },
                    nextItemTemplate: "jres:25200386", //RC 25200386 : Následující záznam<br>PID: {ixp_ukon}
                    prevItemTemplate: "jres:25200387" //RC 25200387 : Předchozí záznam<br>PID: {ixp_ukon}
                });
            }

            // pro akci EPK // componentDto.LzeSchvalovaciProces
            // actWflCinnostiZadostOPodpis enabled: l_bActionEnabled && componentDto.LzePridatZadostOPodpis, visible: isNotTS_S_D
            // actWflCinnostiSchvalovaciProces enabled: l_bActionEnabled && componentDto.LzeSchvalovaciProces
            var l_bActionEnabled = (that.RezimDetailu === Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace) ? false : true;

            this.afterDelete = _afterDelete;

            this.enableActions = function (enable: boolean) {
                //that.actions.actVlozitElObraz!.enabled(!enable && that.model.Permissions.CanUpdate.value);
                //that.actions.actKonvertovatSchvalit!.enabled(!enable);
                that.actions.actVlozitDoSpisu!.enabled(!enable && that.model.Permissions.CanVlozitDoSpisu.value);
                that.actions.actKeSchvaleni!.enabled(!enable && that.model.Permissions.CanKeSchvaleni.value);
                that.actions.actSchvalit!.enabled(!enable && that.model.Permissions.CanSchvalit.value);
                that.actions.actStornovat!.enabled(!enable && that.model.Permissions.CanStornovat.value);
                that.actions.actNastavitLhutu!.enabled(!enable && that.model.Permissions.CanNastavitLhutu.value);
                that.actions.actNabytPravniMoc!.enabled(!enable && that.model.Permissions.CanNabytPravniMoc.value);
                that.actions.actDetailDokumentu!.enabled(!enable && that.model.Permissions.CanDetailDokumentu.value);
                that.actions.actDetailDokumentu!.visible(that.model.Permissions.CanDetailDokumentu.value);
                //that.actions.actDetailDokumentu!.visible(!enable && that.model.Permissions.CanDetailDokumentu.value);
                that.actions.actPokyny!.enabled(!enable && that.model.Permissions.CanPokyny.value);
                that.actions.actVzor!.enabled(!enable && that.model.Permissions.CanVzor.value);
                that.actions.actPoznamka!.enabled(!enable && that.model.Permissions.CanPoznamka.value);
                that.actions.actTiskSablony!.enabled(!enable && that.model.Permissions.CanTiskSablony.value);
                that.actions.actOdeslat!.enabled(!enable && that.model.Permissions.CanOdeslat.value);

                that.actions.actPrilohy!.enabled(!enable);
                that.actions.actWflCinnostiZadostOPodpis!.enabled(!enable && l_bActionEnabled && that.model.Permissions.LzePridatZadostOPodpis.value);
                that.actions.actWflCinnostiSchvalovaciProces!.enabled(!enable && l_bActionEnabled && that.model.Permissions.LzeZaraditDoSchvalovacihoProcesu.value);

                that.changeAktivitaComponentEnableActions(enable);
                $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(that.dotcSubjUkonuTab).enableActions();
                
            };

            this.afterLoadData = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions): JQueryPromise<any> {
                var prom = $.Deferred();
                var that = this;
                var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
                var gTabManager = that.find(".gtabmanager");
                if (!readOnly) gTabManager.gtabmanager("setActive", "tabGroupZakladni");
                gTabManager.gtabmanager("visibleGroup", "tabGroupDotcSubjUkonu", readOnly);
                this.afterLoadDataForTab(this.dotcSubjUkonuTab);
                return prom;
            };
        }

        afterLoadDataForTab(tabControl: JQuery<HTMLElement>) {
            if (tabControl) {
                const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(tabControl);
                if (tabCnt != null && typeof (tabCnt.reloadData) === "function") {
                    tabCnt.reloadData().done(() => {
                        var gridCount = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(this.dotcSubjUkonuTab).grid.ggrid("getView").getCount();
                        if (gridCount > 0) this.gridHasRows = true;
                    });
                }
                
            }
        }

        createForm(): Gordic.Forms.Form {
            var that = this;
            console.log("createForm(): ");
            var readOnly = that.RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            var neniNovy = this.Rezim != Gordic.Gin.Interface.RegSpa.GRezimContentu.New;
            var form = new Gordic.Forms.Form({ tabLabel: "jres:25200401", opened: true }) //RC 25200401 : Detail úkonu
                .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-4-8-0, S-12-12-0" })
                .addRow("jres:25200025") //RC 25200025 : Ident.
                .addField("gstringbox", "w-4", { name: "ixp_ukon", disabled: true })
                .addField("gstringbox", "w-8", {
                    name: "ElektronickyObrazTitle", disabled: true,
                    buttons: [{
                        requireEdit: false,
                        action: new GAction({
                            name: "actOtevritHlavniPrilohu",
                            icon: "gi-detail",
                            captionVisible: GAction.captionVisibility.never,
                            tooltip: "jres:25200448", //RC 25200448 : Otevřít hlavní přílohu
                            enabled: readOnly && that.model.ElektronickyObrazTitle,
                            run: function (ev, obj) {
                                that.OtevreniElektronickehoObrazu();
                            }
                        })
                    }]
                })
                .addRow("Stav úkonu") //RC 25200213 : Druh úkonu
                .addField("gselectbox", Gordic.Prefabs.Select.sprcstuDto(), {
                    name: "stav_ukn",
                    disabled: true,
                    dropdown: true,
                    model: "model.stav_ukn=value.stav_ukn",
                    initialValue: { stav_ukn: 0 },
                    defaultValue: { stav_ukn: 0 },
                })

                //.addField("gselectbox", { name: "stav_ukn", model: "model.stav_ukn=value", disabled: readOnly, flag: "required", validators: [new Gordic.Validators.Required()] })

                .addRow("jres:25200213") //RC 25200213 : Druh úkonu
                .addField("gselectbox", Gordic.Prefabs.Select.sprsdukDto(
                    {
                        filterPanelOpts: {
                            forms: [new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
                                .addRow("jres:35600006") //RC 35600006 : Druh úkonu
                                .addField("gradio", {
                                    name: "typ_vyberu_druhu_ukonu",
                                    model: "model.typ_vyberu_druhu_ukonu = value", // radiobutton neni gselectbox => jeho hodnota je cislo neni to objekt, proto tam neni value.typ_vyberu_druhu_ukonu
                                    radios: [
                                        { label: "jres:25200228", value: 1 }, //RC 25200228 : Úkon navázaný na druh řízení
                                        { label: "jres:25200229", value: 2 }, //RC 25200229 : Úkon obecné metodiky
                                        { label: "jres:25200230", value: 3 }, //RC 25200230 : Oblíbený úkon
                                        { label: "jres:25200231", value: 4 } //RC 25200231 : Úkon nenavázaný na druh řízení
                                    ],
                                    emptyValue: 1,
                                    initialValue: 1 // oznaceny radiobutton
                                })
                            ],
                            customClass: "vyber_typu_filterPanel",
                            //simpleMode: true, // zakomentováno pro opravu BS ! zjistit, zda je potřeba
                            filterStorageService: null,
                            favoriteLayoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-12-12-0",
                            textItemTemplate: "{description}",
                            autoLoadAfter: ["CreatePanel", "ChoseFilter", "ClearFilter"],
                        },
                        serverFilters: { //pocatecni nastaveni filtru, da se jeste selektoru rict, ze nema pri otevreni hledat, v tom pripade by se musela smazat i pocatecni hodnota u radiobuttonu
                            typ_vyberu_druhu_ukonu: 1,
                            ixs_dsr: that.IxsDsr
                        },
                        related: this.element,
                        serverFiltersHandler: (filters) => {    //Vytvorit novy(!) objekt, kde bude jen to, co lze menit (neni fixni). Nesahat na filters, je tu jen pro ziskani aktualni hodnoty.
                            return { typ_vyberu_druhu_ukonu: filters["typ_vyberu_druhu_ukonu"] };
                        }
                    }
                ),
                    {
                        name: "ixs_duk", model: "model.ixs_duk=value.ixs_duk, model.topic_pokyn = value.topic_pokyn, model.topic_vzor = value.topic_vzor, model.topic_pozn = value.topic_pozn",
                        validators: [new Gordic.Validators.Required()],
                        flag: "required",
                        disabled: readOnly,
                        strict: true,
                        serverFilters: { ixs_dsr: [that.IxsDsr] },
                        filterMinLength: 100,   // v podstate zneaktivni autocomplete, ktery je chybny
                        change: function (ev, changeObj) {
                            var fldVec = that.findFields("VecSSL");
                            var valVec = fldVec.gfield("getValue");
                            if (valVec == null || valVec == "")
                                fldVec.gfield("setValue", changeObj.value?.nazev);
                            var fldDelkaLH = that.findFields("delka_lh");
                            fldDelkaLH.gfield("setValue", changeObj.value?.lhuta);
                        }
                    })
                .addRow("jres:25200027") //RC 25200027 : Věc
                .addField("gstringbox", {
                    name: "VecSSL", model: "model.VecSSL=value", disabled: readOnly, flag: "required", maxLength: 100, validators: [new Gordic.Validators.Length({ max: 100 })] })
                .addRow("jres:25200214") //RC 25200214 : Označení dok.
                .addField("gstringbox", { name: "cj_dok", model: "model.cj_dok=value", disabled: neniNovy })
                .addRow("jres:25200014") //RC 25200014 : Datum podání
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_pod", model: "model.dat_pod=value", valueType: "date", disabled: neniNovy })
                .addRow("jres:25200215") //RC 25200215 : Datum vzniku
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_vzniku", model: "model.dat_vzniku=value", valueType: "date", disabled: readOnly, flag: "required", validators: [new Gordic.Validators.Required()] })
                .addRow("Datum vypravení")
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_vypraveni", model: "dat_vypraveni", valueType: "date", disabled: neniNovy })
                .addText("", "w-1")
                .addField("gcheck", "w-L-3 w-M-3 w-S-3", {
                    name: "s_vypraveno", model: "model.s_vypraveno", disabled: neniNovy, modelValueTransform: {
                        apply: function (modelValue) { return modelValue === 1; },
                        collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                    },
                    label: "Vypraveno"
                })            
                .addRow("Datum doručení")
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_doruceni", model: "dat_doruceni", valueType: "date", disabled: neniNovy })
                .addText("", "w-1")
                .addField("gcheck", "w-L-3 w-M-3 w-S-3", {
                    name: "s_doruceno", model: "model.s_doruceno", disabled: neniNovy, modelValueTransform: {
                        apply: function (modelValue) { return modelValue === 1; },
                        collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                    },
                    label: "Doručeno"
                })                
                .addRow("jres:25200216") //RC 25200216 : Lhůta (ve dnech)
                .addField("gnumberbox", "w-L-1 w-M-2 w-S-6", { name: "delka_lh", model: "model.delka_lh=value", disabled: readOnly })
                .addRow("jres:25200217") //RC 25200217 : Lhůta od, do
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_od", model: "model.dat_od=value", valueType: "date", disabled: neniNovy })
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "dat_lhuta", model: "model.dat_lhuta=value", valueType: "date", disabled: neniNovy })
                .addRow("jres:25200120") //RC 25200120 : Právní moc
                .addField("gdatebox", "w-L-3 w-M-6 w-S-12", { name: "DatPrMoc", model: "model.DatPrMoc=value", valueType: "date", disabled: neniNovy })
                .addRow("jres:25200058") //RC 25200058 : Poznámka
                .addField("gstringbox", { name: "poznamka", disabled: readOnly, rows: 4 })
                .addRow("jres:25200218") //RC 25200218 : Doba trvání úkonu [hod], [min]
                .addField("gnumberbox", "w-L-1 w-M-2 w-S-6", {
                    name: "doba_trvani_hod", disabled: readOnly,
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply":
                                $(this).gfield("setValue", dto.doba_trvani / 60);
                                return;
                            case "collect":
                                dto.doba_trvani = dto.doba_trvani - (dto.doba_trvani / 60 * 60); // odstranit stare hodiny
                                dto.doba_trvani = dto.doba_trvani + (parseInt($(this).gfield("getValue")) * 60); // pridat nove hodiny
                                return;
                        }
                        return "doba_trvani";
                    },
                    validators: [new Gordic.Validators.Range({ min: 0, max: 99 })],
                    //step: 1 // vubec nic nedela
                })
                .addField("gnumberbox", "w-L-1 w-M-2 w-S-6", {
                    name: "doba_trvani_min", disabled: readOnly,
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply":
                                $(this).gfield("setValue", dto.doba_trvani % 60);
                                return;
                            case "collect":
                                dto.doba_trvani = dto.doba_trvani - (dto.doba_trvani % 60); // odstranit stare minuty
                                dto.doba_trvani = dto.doba_trvani + (parseInt($(this).gfield("getValue"))); // pridat nove minuty
                                return;
                        }
                        return "doba_trvani";
                    },
                    validators: [new Gordic.Validators.Range({ min: 0, max: 59 })]
                })
                ;
            return form;
        }

        private GetCustomDtoProTisk(): Gordic.Spr.Interface.GTiskParamsUkonDto {
            var that = this;
            return {
                ixp_ukon: that.model.ixp_ukon,  // that.findFields("ixp_ukon").gfield("getValue").ixp_ukon,
                ixs_duk: that.model.ixs_duk,    // that.findFields("ixs_duk").gfield("getValue").ixs_duk,
                ixs_dsr: that.IxsDsr
            }
        }

        private KonvertovatSchvalit(): void {
            var that = this;
            console.log("KonvertovatSchvalit");

        }

        private ParovatPriSchvaleni(): JQueryPromise<boolean> {
            var that = this;
            var def = $.Deferred();
            console.log("ParovatPriSchvaleni");
            if (that.model.s_vyriz == 1) {
                if (that.Param_SprRadParcj == 2) {
                    that.dialogs.messageBox("jres:25200174", "jres:25200241", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200241 : Chcete párovat tento vyřizující dokument s iniciačním dokumentem?
                        .on("yes", function () { def.resolve(true); })
                        .on("no", function () { def.resolve(false); })
                        .on("close", function () { def.reject(); })
                        ;
                } else if (that.Param_SprRadParcj == 1) {
                    def.resolve(true);
                } else
                    def.resolve(false);
            } else
                def.resolve(false);
            return def.promise();
        }

        private VyberDeniku(): JQueryPromise<any> {
            var that = this;
            var def = $.Deferred();
            that.call("VyberDenikuNeeded", {}).done((needed) => {
                if (needed) {
                    console.log("before VyberDenikuDlg");
                    Gordic.Ssl.Dialogs.VyberDenikuDlg(that, null)?.on("close", function (ev, selectedDenik) {
                        console.log("selectedDenik");
                        console.log(selectedDenik);
                        if (selectedDenik) {
                            def.resolve((selectedDenik.denik ?? "") + "|" + (selectedDenik.poradi ?? "") + "|" + (selectedDenik.rok ?? ""));
                        } else
                            def.reject();
                    });
                } else
                    def.resolve("");

            }).fail(function () {
                def.reject();
            });
            return def.promise();
        }

        private VyberDokumentuInitCj(parovat: boolean): JQueryPromise<any> {
            var that = this;
            var def = $.Deferred();

            if (that.model.s_vyriz == 1) {
                if (that.Param_SprRadParcj != 0 && parovat) {
                    if ((that.model.wfl_ixp_init_vyriz ?? "") != "" && that.Param_SprRadVparcj != 0) {
                        that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDokumentuProVazbuCJ", {}],
                            { IxpSpis: that.IxpSpis },
                            { width: 850, modal: true })
                            .on("close", (ev, retValue) => {
                                if (retValue != undefined && retValue.Ixp != undefined) {
                                    console.log(retValue.Ixp);
                                    def.resolve(retValue.Ixp)
                                } else
                                    def.reject();
                            });
                    }
                    else
                        def.resolve(that.model.wfl_ixp_init_init);
                } else
                    def.resolve(null);
            } else
                def.resolve(null);
            return def.promise();
        }

        private VlozitDoSpisu(): void {
            var that = this;
            console.log("VlozitDoSpisu");
            that.dialogs.confirm("jres:25300024") //RC 25300024 : Chcete dokument úkonu vložit do spisu?
                .on('close', (ev, retValue) => {
                    if (retValue === "yes") {
                        that.call("VlozitDoSpisu", {
                            ixpUkon: that.model.ixp_ukon,
                            datZmena: that.model.dat_zmena
                        }).done(() => {
                            console.log("ukon vlozen do spisu");
                            that.zmena = true;
                            that._reloadData();
                        });
                    }
                });
        }

        private KeSchvaleni(): void {
            var that = this;
            console.log("KeSchvaleni");
            that.dialogs.confirm("jres:25300022") //RC 25300022 : Chcete ukončit práci na konceptu dokumentu?
                .on('close', (ev, retValue) => {
                    if (retValue === "yes") {
                        that.call("KeSchvaleni", {
                            ixpUkon: that.model.ixp_ukon,
                            datZmena: that.model.dat_zmena
                        }).done(() => {
                            console.log("ukon ke schvaleni");
                            that.zmena = true;
                            that._reloadData();
                        });
                    }
                });
        }

        private Schvalit(): void {
            var that = this;
            console.log("SchvalitUkon");
            that.dialogs.confirm("jres:25200240") //RC 25200240 : Chcete opravdu schválit úkon?
                .on('close', (ev, retValue) => {
                    if (retValue === "yes") {
                        this.ParovatPriSchvaleni().then(function (parovat) {
                            console.log("parovat ...");
                            console.log(parovat);
                            that.VyberDeniku().then(function (selectedDenik) {
                                console.log("selectedDenik2");
                                console.log(selectedDenik);
                                that.VyberDokumentuInitCj(parovat).then(function (Ixp) {
                                    console.log("Ixp z VyberDokumentuInitCj");
                                    console.log(Ixp);
                                    that.call("SchvalitUkon", {
                                        ixpUkon: that.model.ixp_ukon,
                                        datZmena: that.model.dat_zmena,
                                        parovat: parovat,
                                        selectedDenik: selectedDenik,
                                        ixpInitCj: Ixp
                                    }).done(() => {
                                        console.log("ukon schvalen");
                                        that.zmena = true;
                                        that._reloadData();
                                    });

                                })


                            })
                        });
                    }
                });
        }

        private Stornovat(): void {
            var that = this;
            console.log("Stornovat");
            that.dialogs.confirm("jres:25200272") //RC 25200272 : Chcete opravdu stornovat úkon?
                .on('close', (ev, retValue) => {
                    if (retValue === "yes") {
                        var l_sLabel = "jres:25200264"; //RC 25200264 : Důvod stornování dokumentu
                        this.dialogs.prompt("jres:25200263", l_sLabel).on("ok", function (ev, duvod) { //RC 25200263 : Důvod stornování
                            if (duvod && (duvod.trim() != "")) {
                                that.call("StornovatUkon", { ixpUkon: that.model.ixp_ukon, datZmena: that.model.dat_zmena, duvodStorna: duvod })
                                    .done(function (val) {
                                        console.log("ukon stornovan");
                                        that.zmena = true;
                                        that.tryClose({ Zmena: true });
                                    })
                                    .fail(function (val) {
                                    });
                            } else {
                                that.dialogs.alert("jres:25200265"); //RC 25200265 : Je nutné uvést důvod stornování dokumentu
                            }
                        });
                    }
                });
        }

        private NastavitLhutu(): void {
            var that = this;
            console.log("NastavitLhutu");
            Gordic.Spr.Dialogs.VypocetLhutyDlg(
                that,
                {
                    DatumZahajeni: new Date(), //  that.model.dat_od,
                    PocetDnu: that.model.delka_lh,
                    ShowOkButton: true
                },
                Gordic.Global.Enums.ModOtevreni.showModalWindow
            )
                .done(function (ret) {
                    if (ret != undefined && ret.VypocetLhuty != undefined) {
                        that.call("NastavitLhutuUkonu", {
                            ixpUkon: that.model.ixp_ukon,
                            ixpSpis: that.model.ixp_spis,
                            datOd: ret.VypocetLhuty.dat_zahajeni,
                            datLhuta: ret.VypocetLhuty.dat_lhuta,
                            datZmena: that.model.dat_zmena,
                        })
                            .done(function (val) {
                                console.log("nastavena lhuta");
                                that.zmena = true;
                                that._reloadData();
                            });
                    }
                });
        }

        private NabytPravniMoc(): void {
            var that = this;
            console.log("NabytPravniMoc");
            var formDef = new Gordic.Forms.Form()
                .addRow("jres:25200270", true).addField("gdatebox", { validators: [new Gordic.Validators.Required()], name: "DatPrMoc", model: "DatPrMoc", valueType: "date" });  //RC 25200270 : Datum nabytí právní moci
            var dlg = this.dialogs.simpleForm("jres:25200271", formDef, { DatPrMoc: that.model.DatPrMoc }, { height: 200, modal: true, noClose: false });  //RC 25200271 : Nabytí právní moci
            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    console.log("DatPrMoc");
                    console.log(retVal.DatPrMoc);
                    that.call("NabytPravniMoc", { ixpUkon: that.model.ixp_ukon, datPrMoc: retVal.DatPrMoc })
                        .done(function (errMes) {
                            if (errMes == "") {
                                console.log("nabyta pravni moc");
                                that.zmena = true;
                                that._reloadData();
                            }
                            else
                                that.dialogs.alert(errMes);
                        });
                }
            });
        }

        private DetailDokumentu(): void {
            var that = this;
            console.log("DetailDokumentu");
            var options = {
                DetailDto: { ixp: that.model.ixp_ukon }
            };
            Gordic.Wfl.Dialogs.DetailDokumentuSpisu(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow);
        }

        private Pokyny(): void {
            var that = this;
            console.log("Pokyny");
        }

        private Vzor(): void {
            var that = this;
            console.log("Vzor");
        }

        private Poznamka(): void {
            var that = this;
            console.log("Poznamka");
        }

        private TiskSablony(): void {
            var that = this;
            console.log("TiskSablony");
        }

        private OtevreniElektronickehoObrazu(): void {
            var that = this;
            console.log("OtevreniElektronickehoObrazu - start");
            ((Gordic.Wfl) as any).AttachmentUtils.GetFavorite(this, that.model.ixp_ukon).then((attDto) => {
                Gordic.Wfl.AttachmentUtils.OpenAttachment(that, attDto, true, false, false)
                    .done(function (args) {
                        console.log("OtevreniElektronickehoObrazu - done");
                        // console.log("doc.downloadCompleted", this, args);
                    })
                    .fail(function (xhr, type, obj) {
                        console.log("OtevreniElektronickehoObrazu - fail");
                        console.log(obj);
                    });
            });
        }

        private Odeslat(): void {
            var that = this;
            console.log("Odeslat");
            that.call("PripravitOdeslani", {
                ixpUkon: that.model.ixp_ukon
            }).done((pocetPripravenych) => {
                console.log("Subjekty pripravene k odeslani");

                //if (pocetPripravenych > 0) {
                //    Gordic.Wfl.Dialogs.GOdeslaniDlg(
                //        that,
                //        {
                //            Hromadne: true,
                //            GenerovatSeznamOdeslanych: true
                //        },
                //        Gordic.Global.Enums.ModOtevreni.showModalWindow
                //    ).always(() => {
                //        that.call("OdstranitSubjektyKOdeslani", {
                //            ixpUkon: that.model.ixp_ukon
                //        }).done(() => {
                //            Gordic.Wfl.Dialogs.GOdeslaniDlg(that, { Ixp: that.model.ixp_ukon }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                //            //that.zmena = true;
                //            //that._reloadData();
                //        });
                //    });
                //}
                //else {
                    Gordic.Wfl.Dialogs.GOdeslaniDlg(that, { Ixp: that.model.ixp_ukon }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                //}

                //that.zmena = true;
                //that._reloadData();
            });                                                                                
        }

        private KonverzePdf(): void {
            var that = this;
            console.log("KonverzePdf");
            Gordic.Wfl.Dialogs.GKonverzePdfDlg(that, { Ixp: that.model.ixp_ukon }, Gin.Globals.Enums.ModOtevreni.showModalWindow)
                .done(function (args) {
                    console.log("KonverzePdf - done", args);
                })
                .fail(function (xhr, type, obj) {
                    console.log("KonverzePdf - fail");
                    console.log(obj);
                });
        }

        public _reloadData(): void {
            var gTabManager = this.find(".gtabmanager");
            var active;
            if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
            this.zmena = true;
            this.load({ RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, internal: true, selectedTabGroup: active });
        }

        private ZadostOPodpis(): void {
            var that = this;
            var ops = Gordic.Wfl.WebClient.WflOps.WflOpsEnum;
            var eventName = Gordic.Wfl.WebClient.WflOps.eventName;
            var options = {
                ListIxp: that.model.ixp_ukon,
                HromadnaAkce: false
            };
            Gordic.Wfl.Dialogs.ZadostOPodpis(that, options).done(function (retVal) {
                if (retVal) {
                    that.dialogs.alert("jres:25300008"); //RC 25300008 : Úspěšně vloženo do podpisové knihy
                    //that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.zadostOPodpis, "jres:25500316", "g-state-success")); //RC 25500316 : Úspěšně vloženo do podpisové knihy
                }
            });
        }

        private SchvalovaciProces(): void {
            var that = this;
            var ops = Gordic.Wfl.WebClient.WflOps.WflOpsEnum;
            var eventName = Gordic.Wfl.WebClient.WflOps.eventName;
            var modOtevreni = Gin.Globals.Enums.ModOtevreni;
            var opt = {
                Ixp: that.model.ixp_ukon    //ixp_spis
            };

            Gordic.Wfl.Dialogs.GSchvalovaciProcesPozadavekDlg(this, opt, modOtevreni.navigate)
                .done(function (retval) {
                    if (retval) {   // && retval.stav) {\
                        that._reloadData();
                        //that.dialogs.alert("jres:25300009"); //RC 25300009 : Úspěšně vloženo do schvalovacího procesu
                        //that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.schvalovaciProces));
                    }
                });
        }       

        private formatDatum(date: string): string {
            if (!date) return "";
            let parts = date.split('-');
            return parts[2] + '.' + parts[1] + '.' + parts[0];
        }

    }
}

