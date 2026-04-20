namespace Gordic.Leg.WebClient {

    enum tabGroupNames {
        tabGroupZakladni= "tabGroupZakladni",
        tabGroupUdaje = "tabGroupUdaje"
    }
    
    var gcontent = Decorators.gcontent;
    @gcontent
    export class GDetailOvereni extends GDetailBuilderContent<//Gordic.Leg.Dialogs.UsedComponentsNew>
        Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions &
        ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> &
        Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Leg.WebClient.GRobsvidDto> &
        ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Leg.WebClient.GRobsvidDto>>>>
        implements IGContent {

        private tabGroupUdaje: JQuery<HTMLElement>;
        private tabGroupZakladni: JQuery<HTMLElement>;

        IxsVid: string;
        TypVidNew: string;
        IxsFun: string;
        rezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        model: any;
        ixp: any;

        tabGroupTest: JQuery<HTMLElement>;

        VyberEsu_DuvodHledaniTxt = 'zadaniucastnikarizeni';

        onContentReady() { 
            console.log("onContentReady");
            var that = this;
            
            this.Rezim = this.rezimDetailu; 
            
            ResizeManager.forceRefresh(this.element.get(0)!);
           
            that.findFields().gfield("model", "apply", that.model, { initialValues: true }) // projde všechna pole a naplní je z modelu
            //that.setRezim(that.Rezim, that);
            that.onContentReadyBase(that);

            ResizeManager.forceRefresh(this.element.get(0)!);
        };

        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;


            var l_aoTabGroups: IGTabGroupOptions[] = [];    // pouzit pole, aby se dalo pridavat
            l_aoTabGroups.push({ id: tabGroupNames.tabGroupZakladni, caption: "jres:25500127" }) //RC 25500127 : Základní informace
            l_aoTabGroups.push({ id: tabGroupNames.tabGroupUdaje, caption: "jres:25500128" }); //RC 25500128 : Údaje o osobách a poplatcích
            

            // Vytvoreni tabu
            var l_aoTabParams: Gordic.Gin.DetailBuilder.TabParams[] = [];    // pouzit pole, aby se dalo pridavat
            // pridani polozek do tabu
            l_aoTabParams.push({
                group: { id: tabGroupNames.tabGroupZakladni },
                init: function (tab) {
                    var formZakladni = that.createZakladni();
                    tab.gform("createFrom", formZakladni);
                }
            });
            l_aoTabParams.push({
                tabParams: {
                    visible: that.rezimDetailu != Gordic.Gin.Interface.RegSpa.GRezimContentu.New, 
                    opened: true, locked: true, group: { id: tabGroupNames.tabGroupUdaje }
                },
                contentParams: GContent.createInitializer(Gordic.Leg.WebClient.OsobyLegControl(that)), //, this.ixs_vid , this.IxsVid
                init: function (tab) {
                    that.tabGroupUdaje = tab;
                }
            });
            l_aoTabParams.push({
                group: { id: tabGroupNames.tabGroupUdaje },
                init: function (tab) {
                    var formCreateUdaje = that.createUdaje();
                    tab.gform("createFrom", formCreateUdaje);
                }
            })

            var l_aoActions: GAction[] = [];
            l_aoActions.push(
                new GAction({
                    name: "actStitky",
                    caption: "jres:25500123", //RC 25500123 : Štítky
                    tooltip: "jres:25500124", //RC 25500124 : Tímto vytisknete štítky
                    icon:"gi-print",
                    run: function () {
                        //var data = that.grid.ggrid("getSelection");
                        //kontrola zda vybrane overeni ma žadatele
                        that.call("TiskStitkuStart", { model: that.model }).done(function (ev) {
                            if (ev == "") {
                                that.dialogs.alert("Informace", "jres:25500213"); //RC 25500213 : Není zadán žadatel u ověření.
                            }
                            else {
                                that.navigate(["Gordic.Leg.WebClient.GDetailTiskStitku"], { ixsVid: ev, typVid: that.model.typ_vid })
                            }
                        })
                    }
                })
            )
            l_aoActions.push(
                new GAction({
                    name: "actOdstranit",
                    caption: "jres:25500148", //RC 25500148 : Odstranit záznam
                    icon: "fa-times-circle",
                    run: function () {
                        let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(this);

                        currentContent.dialogs.confirm("jres:25500145", "jres:25500146").on("yes", function () { //RC 25500146 : Záznam bude trvale odstraněn z databáze. Opravdu chcete pokračovat?
                            currentContent.call("Delete", { detailDto: that.model })
                                .done(function () {
                                    that.dialogs.messageBox("jres:25500140", "jres:25500144", [GDlg.mbbOk], GDlg.mbiInfo) //RC 25500144 : Záznam byl odstraněn
                                        .on("close", function () {
                                            // navrat na seznam
                                            that.close();
                                        });
                                })
                        })

                        
                    }
                })
            )

            var detailOvereniComponent: Gin.DetailBuilder.GDetailBuilderComponent<this> =
            {
                headerForm: this.createForm(),
                tabGroups: l_aoTabGroups,
                tabs: l_aoTabParams,
                actions: l_aoActions,
                menuBar: [{ id: "stitky", action: "actStitky", favorite: true },
                { id: "odstranit", action: "actOdstranit", favorite: true }]
            }

            // odstranit vlastni obsluhu gtabmanageropen, aby se nezvetsoval pocet reloadData GSubListControl
            this.element.off("gtabmanageropen.GDetailOvereni");

            builder.withComponent<this>("GDetailOvereni", detailOvereniComponent, true)

        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            if (that.rezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) {
                that.listControls_setup({
                    rowToDto: function (gridState) {
                        var gTabManager = that.find(".gtabmanager");
                        var active;
                        if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                        return { Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, IxsVid: gridState.currentRow.data.ixs_vid, TypVid: gridState.currentRow.data.typ_vid, selectedTabGroup: active };
                    },
                    nextItemTemplate: "jres:25500138", //RC 25500138 : Následující záznam       
                    prevItemTemplate: "jres:25500139" //RC 25500139 : Předchozí záznam          
                    //< br > PID: { ixp_spis }
                    //< br > PID: { ixp_spis }
                });
            };

            this.beforeNew = function (): JQueryPromise<any> {
                var def = $.Deferred();

                Gordic.Leg.Dialogs.VyberOvereni(that).done(function (rv, cont) {
                    if (rv) {
                        that.TypVidNew = rv.typ_vid;
                        def.resolve();
                    } else def.reject;
                }).fail(function () { def.reject; });

                return def;
            }

            this.afterLoadData = function (): JQueryPromise<any> {

                var prom = $.Deferred();
                this.element.on("gtabmanageropen.GDetailOvereni", function (ev, ctx) {
                    console.log("gtabmanageropen.GDetailOvereni");
                    tabChange(ctx.id);
                });

                return prom.resolve().promise();
            }

            // funkce pri prepinani mezi taby
            var tabChange = function (idTabGroup: string) {
                console.log("tabChange", idTabGroup);
                switch (idTabGroup) {
                    case tabGroupNames.tabGroupZakladni:
                        that.afterLoadDataForTab(that.tabGroupZakladni)
                        break;
                    case tabGroupNames.tabGroupUdaje:
                        that.afterLoadDataForTab(that.tabGroupUdaje)
                        break;
                }
            }

            //this.model = that.model;
            
            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                //that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace));
            }

            this.enableActions = function (enable: boolean) {
                that.actions["actOdstranit"]?.enabled(this.Rezim != (Gordic.Gin.Interface.RegSpa.GRezimContentu.New || Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace));
            }
            
        };

        // po načtení dat
        afterLoadDataForTab(tabControl: JQuery<HTMLElement>) {
            var that = this;
            if (tabControl) {
                const tabCnt = $.content<Gordic.Gin.WebClient.RegSpa.GSubListControl>(tabControl);
                if (tabCnt != null && typeof (tabCnt.reloadData) === "function" && !tabCnt.loadedData) {
                    tabCnt.reloadData().done(function () {
                        //if (tabControl == that.ukonyTab && that.identifikatorUkonu != undefined && that.identifikatorUkonu != null) {
                        //    tabCnt.grid.ggrid("activeRow", that.identifikatorUkonu);
                        //    that.identifikatorUkonu = undefined;
                        //}
                    });
                }
            }
        }

        // hlavicka
        createForm(): Gordic.Forms.Form {
            var that = this;
            var filterFun;
            console.log("createFormHlavickaDetail");
            // pokud znam knhu - nastavim omezeni pro pracovnika
            console.log("omezeni pracovnika", that.model.ixp_dmd)
            if (that.model.ixp_dmd != '') {
                that.call("NastavFunDleknihy", { ixsDmd: that.model.ixp_dmd }).done(function (ev) {
                    filterFun = ev;
                })
            }
            // pro pripad listovani v seznamu
            console.log("novy typ", that.TypVidNew);
            if (that.model.typ_vid == null || undefined) {
                that.model.typ_vid = that.TypVidNew;
            }
            
            var readOnly = that.rezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            var readOnlyBook = (that.rezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace || that.rezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View); // nefunguje

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S2, L-2-10-0, M-2-10-0, S-12-12-0", opened: true })
                .addSection()
                .addRow("jres:25500033") //RC 25500033 : Kniha
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robsdmd(), {
                    model: "model.ixp_dmd=value.ixp_dmd", name: "ixp_dmd", disabled: readOnlyBook,
                    serverFilters: { ktg_den: [140], aktivita: [100], ixs_fun: [that.model.ixs_fun], s_uzavreno: 0 }, // kniha nesmi byt uzavrena , s_uzavreno: 1
                    validators: [new Gordic.Validators.Required()],
                    change: function (ev, changeObj) {
                        var rok = that.findFields("rok");
                        var cisloZap = that.findFields("por_cislo");
                        var porDo = that.findFields("por_cislo_do");
                        if (changeObj.value != null) {
                            that.findFields("ixs_fun").gfield("setValue", changeObj.value.ixp_dmd);
                            rok.gfield("setValue", changeObj.value.rok);
                            that.call("NastavPodleKnihy", { ixpDmd: changeObj.value.ixp_dmd }).done(function (ev) {
                                cisloZap.gfield("setValue", ev)
                                porDo.gfield("setValue", ev)
                            })
                            //aktualne vybrany fun
                            that.call("NastavFunDleknihy", { ixsDmd: changeObj.value.ixp_dmd }).done(function (ev) {
                                filterFun = ev;
                                //that.findFields("ixs_fun").gfield("option", "serverFilters", $.extend({
                                //    ixs_fun: function () { return ev; }
                                //}));  
                            })
                        }

                    }
                })
                .addRow("jres:25500034") //RC 25500034 : Typ ověření
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robcvid(), { model: "model.typ_vid=value.typ_vid", name: "typ_vid_txt", disabled: true, dropdown: true, validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25500035") //RC 25500035 : Zapsáno v
                .addField("gstringbox", "w-10", { name: "misto_overeni", disabled: readOnly, model: "misto_overeni", validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25500036") // spisový uzel/funkce/referent //RC 25500036 : Pracovník
                .addField("gselectbox", "w-10", Gordic.Gin.Fields.ginsfunSSU(
                    {
                        validators: [new Gordic.Validators.Required(), {
                            validate: (value) => {
                                if (value.ixs_fun == null || value.ixs_fun == undefined) { return false; }
                                else { return true; }
                            },
                            message: "jres:25500259" //RC 25500259 : Pracovník musí být vyplněn
                        }],
                        disabled: readOnly, //this.model.vyrizeno,
                        name: "ixs_fun", 
                        model: "model.ixs_fun = value.ixs_fun, model.IxsRef = value.ixs_ref",
                        itemTemplate: function (output: any) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100],
                            ixs_fun: function () {
                                
                                return filterFun;
                            }
                        },
                        flag: "required", 
                        strict: true
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                .addSection()
                .addRow("jres:25500037") //RC 25500037 : Číslo zápisu
                .addField("gstringbox", "w-4", { name: "por_cislo", disabled: readOnly, validators: [new Gordic.Validators.Required()] }) // kniha
                .addRow("jres:25500131") //RC 25500131 : Počet, do
                .addField("gnumberbox", "w-2", {
                    name: "cislo_zapisu",
                    disabled: readOnly,
                    validators: [new Gordic.Validators.Required()],
                    change: function (ev, changeObj) {
                        if (changeObj.value != null && changeObj.value != undefined) {
                            let porCislo = Number(that.findFields("por_cislo").gfield("getValue"));
                            let zapCislo = Number(changeObj.value);
                            let vysledek = porCislo + zapCislo - 1;
                            that.findFields("por_cislo_do").gfield("setValue", vysledek);
                        }
                    }
                })
                .addField("gnumberbox", "w-2", { name: "por_cislo_do", disabled: true }) 
                .addRow("jres:25500039") //RC 25500039 : Dne
                .addField("gdatebox", "w-4", { name: "dat_zapisu", disabled: readOnly, validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25500040") //RC 25500040 : Ročník
                .addField("gstringbox", "w-4", { name: "rok", disabled: true })
                
            return form;
        };

        // Udaje o osobach a poplatcich
        createUdaje(): Gordic.Forms.Form {
            var that = this;
            console.log("createUdajeDetail")
            var readOnly = that.rezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            //that.selectedTabGroup = tabGroupNames.tabGroupUdaje;

            var form = new Gordic.Forms.Form();
            form.addSection("jres:25500020") //RC 25500020 : Údaje o uhrazeném poplatku
                .addRow("jres:25500021") //RC 25500021 : Částka (Kč)
                .addField("gnumberbox", "w-2", { name: "c_popl", disabled: readOnly })
                //.addText("Kč")
                .addRow("jres:25500022") //RC 25500022 : Doklad číslo
                .addField("gstringbox", "w-4", { name: "ac_popl", disabled: readOnly })
                .addRow("jres:25500149") //RC 25500149 : Stav dokladu
                .addField("gstringbox", "w-4", { name: "stavDokladu", disabled: readOnly })
                .addRow("jres:25500023") //RC 25500023 : Ze dne
                .addField("gdatebox", "w-4", { name: "dat_popl", disabled: readOnly })
                .addRow("jres:25500024") //RC 25500024 : Další informace k poplatku
                .addField("gstringbox", { name: "poznamka", rows: 5, disabled: readOnly })

            return form;
        }

        // Základní informace
        createZakladni(): Gordic.Forms.Form {
            var that = this;
            console.log("Základní informaceDetail") 
            var readOnly = that.rezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
            
            var form = new Gordic.Forms.Form()
            //legalizace
            if (this.model.typ_vid == 2) {
                form.addSection("jres:25500130") //RC 25500130 : Legalizace
                    .addRow("jres:25500043") //RC 25500043 : Označení druhu listiny, na které je podpis legalizován
                    .addField("gstringbox", { name: "popis", disabled: readOnly, rows: 10 })
                    .addField("gradio", {
                        name: "leg_listina", disabled: readOnly, //customClass: "enabled",
                        initialValue: '0',
                        radios: [
                            { value: '0', label: 'jres:25500178' },  //RC 25500178 : Podpis na listině byl uznán za vlastní
                            { value: '1', label: 'jres:25500010' },  //RC 25500010 : Listina byla vlastnoručně podepsána
                            { value: '2', label: 'jres:25500253' }   //RC 25500253 : Elektronický podpis na elektronickém dokumentu byl uznán za vlastní
                        ]
                    })
            }
            //vidimace
            else { //if (this.model.typ_vid == 2) {
                form.addSection("jres:25500042")  //RC 25500042 : Vidimace
                    .addRow("jres:25500041") //RC 25500041 : Označení listiny, která je vidimována
                    .addField("gstringbox", { name: "popis", disabled: readOnly, rows: 10 })
                    .addField("gradio", {
                        name: "vid_upl_cast", disabled: readOnly,
                        initialValue: '0',
                        radios: [
                            { value: '0', label: 'jres:25500011' }, //RC 25500011 : úplný(á)
                            { value: '1', label: 'jres:25500012' }, //RC 25500012 : částečný(á)
                        ]
                    })
                    .addField("gradio", {
                        name: "vid_opis_kopie", disabled: readOnly,
                        initialValue: '0',
                        radios: [
                            { value: '0', label: 'jres:25500013' }, //RC 25500013 : opis
                            { value: '1', label: 'jres:25500014' }, //RC 25500014 : kopie
                        ]
                    })
                    .addRow("jres:25500028") //RC 25500028 : Počet stran vidimovaného dokumentu
                    .addField("gnumberbox", "w-2", { name: "valid_dok_str", disabled: readOnly })
                    .addRow("jres:25500029") //RC 25500029 : Strany vydimovaného dokumentu
                    .addField("gstringbox", "w-2", { name: "vid_strany", disabled: readOnly })

                    .addSection("jres:25500030") //RC 25500030 : Originální listina předložena k vidimaci je
                    .addField("gradio", {
                        name: "valid_org", disabled: readOnly,
                        initialValue: '10',
                        radios: [
                            { value: '10', label: 'jres:25500015' }, //RC 25500015 : prvopisem
                            { value: '20', label: 'jres:25500016' }, //RC 25500016 : ověřeno vidimovanou listinou
                            { value: '30', label: 'jres:25500017' }, //RC 25500017 : listinou, která je výstupem z autorizované konverze dokumentů
                            { value: '40', label: 'jres:25500018' }, //RC 25500018 : opisem nebo kopií pořízenou ze spisu
                            { value: '50', label: 'jres:25500254' } //RC 25500254 : stejnopisem písemného vyhotovení rozhodnutí nebo výroku rozhodnutí
                        ]
                    })

                    .addSection()
                    .addRow("jres:25500031") //RC 25500031 : Obsahuje viditelný zajišťovací prvek
                    .addField("gcheck", {
                        name: "s_zajist_prvek", disabled: readOnly, modelValueTransform: {
                            apply: function (obj) {
                                return obj != 0;
                            }
                        }
                    })
                    .addRow("jres:25500032") //RC 25500032 : počet stran originálu
                    .addField("gnumberbox", "w-2", { name: "valid_org_str", disabled: readOnly })
            }

            return form;
        }

    }
}