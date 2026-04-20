"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlFinancovaniRozpis.ts               </Name>
//    <Description> Financování - Rozpis částky na roky                         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-05-25                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /** Financování - Rozpis částky na roky */
            let GSmlFinancovaniRozpis = class GSmlFinancovaniRozpis extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    //Vytvoření tabulátoru Případ
                    this.createTabPripad(this.element);
                    //vytvoření tabu dokladů případu se souhrnným gridem
                    this.createTabDoklady(this.element);
                    //Vytvoření tabu limity realizátorů
                    if (this.limitRealVisible) {
                        this.createTabLimitReal(this.element);
                    }
                }
                /** Vytvoření akcí*/
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actPrepocetAkt: {
                            name: "actPrepocetAkt",
                            caption: "jres:33600320", //RC 33600320 : Pro aktuální období
                            enabled: false,
                            run: function (ev, ctx) {
                                var row = that.$gridDoklady.ggrid("getSelection")[0];
                                this.setPending(that.prepocet(row, 0));
                            }
                        },
                        actPrepocetAktANasl: {
                            name: "actPrepocetAktANasl",
                            caption: "jres:33600321", //RC 33600321 : Pro aktuální a následující období
                            enabled: false,
                            run: function (ev, ctx) {
                                var row = that.$gridDoklady.ggrid("getSelection")[0];
                                this.setPending(that.prepocet(row, 1));
                            }
                        },
                        actLimitRealNovy: Gordic.Eko.Action.actionNovy({
                            name: "actLimitRealNovy",
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.isl.SmlFinRozpisLimitReal.createNewDefaultDto({ ixp: that.smlpid.ixp }).getData().done((newDto) => {
                                    let metaRows = that.$gridLimitReal.ggrid("getView").getRows(true);
                                    if (metaRows.length > 0 && metaRows[metaRows.length - 1]._isVirtual) { //$(that.$grid).find(".group").length > 0
                                        that.$gridLimitReal.ggridroweditor("insertRow", metaRows.length - 1, newDto); //_isVirtual
                                    }
                                    else {
                                        that.$gridLimitReal.ggridroweditor("addRow", newDto);
                                    }
                                }));
                            }
                        }),
                        actLimitRealStornovat: Gordic.Eko.Action.actionStornovat({
                            name: "actLimitRealStornovat",
                            enabled: false,
                            run: function (ev, ctx) {
                                var row = that.$gridLimitReal.ggrid("getSelection")[0];
                                this.setPending(that.isl.SmlFinRozpisLimitReal.delete(row).getData().done(() => {
                                    that.$gridLimitReal.ggrid("getView").requestData();
                                }));
                            }
                        })
                    });
                }
                /**
                 * Vytvoření tabu Případ
                 * @param tabFinancovani
                 */
                createTabPripad(tabFinancovani) {
                    let $tabPripad = $.newDiv()
                        .appendTo(tabFinancovani)
                        .gtab({
                        id: "tabRozpisPripad",
                        title: "jres:33600322", //RC 33600322 : Případ
                        opened: false,
                        autoload: false
                    });
                    this.$gridPripad = $.newDiv().appendTo($tabPripad)
                        .ggrid({
                        name: "gridRozpisPripad",
                        columnMode: "full",
                        columns: this.createPripadGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlFinRozpisPripad.list({
                            filters: {
                                ixp: this.smlpid.ixp_sml_pri,
                                rok: { o: ">", v: 0 },
                                sml_stav: { o: "<", v: 90 /* Interface.StavDokladu.ng_stavStorno */ }
                            }
                        }), {
                            key: ["ixp", "rok"]
                        }),
                        searchColumns: ["rok"]
                    });
                }
                /**
                 * Definice gridformátu pro případ
                 * @returns
                 */
                createPripadGridFormat() {
                    var gf = new Gordic.Data.GridFormat()
                        .addRok()
                        .addCurrencyColumn({
                        name: "c_mena",
                        caption: "jres:33600323" + this.smlpid.mena_zkr, //RC 33600323 : Částka 
                    })
                        .addCurrencyColumn({
                        name: "c",
                        caption: "jres:33600324", //RC 33600324 : Částka CZK
                    })
                        .addCurrencyColumn({
                        name: "c_pol",
                        caption: "jres:33600325", //RC 33600325 : Položky FP CZK
                    })
                        .addCurrencyColumn({
                        name: "c_pol_vyd",
                        caption: "jres:33600326", //RC 33600326 : Výdaje CZK
                    })
                        .addCurrencyColumn({
                        name: "c_pol_pri",
                        caption: "jres:33600327", //RC 33600327 : Příjmy CZK
                    });
                    return gf;
                }
                /**
                 * Vytvoření tabu doklady případu obsahující souhrnný grid s doklady případu
                 * @param tabFinancovani
                 */
                createTabDoklady(tabFinancovani) {
                    let $tabDoklady = $.newDiv()
                        .appendTo(tabFinancovani)
                        .gtab({
                        id: "tabRozpisDoklady",
                        title: "jres:33600328", //RC 33600328 : Doklady případu
                        opened: true,
                        autoload: false,
                        menuBar: [{
                                type: "static", caption: "jres:33600329", //RC 33600329 : Přepočet částky dle ročního systémového kurzu
                                children: [{
                                        action: this.actions.actPrepocetAkt
                                    }, {
                                        action: this.actions.actPrepocetAktANasl
                                    }]
                            }]
                    });
                    this.$gridDoklady = $.newDiv()
                        .appendTo($tabDoklady)
                        .ggrid({
                        name: "gridRozpisDoklady",
                        columnMode: "full",
                        columns: this.createDokladGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlFinRozpisDoklad.list({
                            filters: {
                                ixp: this.dokladyList.map(a => a.ixp),
                                rok: { o: ">", v: 0 },
                                sml_stav: { o: "<", v: 90 /* Interface.StavDokladu.ng_stavStorno */ }
                            }
                        }), {
                            key: ["ixp", "rok"],
                            processors: {
                                permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"])
                            }
                        }),
                        defaultProfile: {
                            grouping: "ac_sml",
                            sort: "rok",
                            columns: {
                                "ac_sml": {
                                    grouping: {
                                        defaultState: (meta) => {
                                            if (meta.data.ac_sml == this.smlpid.ac_sml) {
                                                return "open";
                                            }
                                            else {
                                                return "closed";
                                            }
                                        },
                                        //captionText: (meta) => { return meta.data.; },
                                    }
                                }
                            },
                            columnList: "ac_sml,rok,kurz,m,c_mena,c,c_pol,c_pol_vyd,c_pol_pri,c_mena_pri,c_pri"
                        },
                        profileBeforeChange: (ev, obj) => {
                            // pokud se edituje, nejsou povoleny změny v gridu
                            return (this.$gridDoklady?.find(".row.editing")?.length ?? 0) < 1;
                        },
                        selection: (ev, obj) => {
                            var prepocetAktEnabled = false;
                            var prepocetAktANaslEnabled = false;
                            //kontrola na normální řádek a needitaci
                            if (!(obj.count == 0 || (this.$gridDoklady?.find(".row.editing")?.length ?? 1) > 0 || obj.count == 1 && obj.getSelection(false, false).length == 0)) {
                                var dto = obj.getSelection()[0];
                                var aktualniDoklad = obj.getSelection()[0].ixp == this.smlpid.ixp;
                                prepocetAktEnabled = aktualniDoklad && dto.Permissions.LzePrepocetAkt.value;
                                prepocetAktANaslEnabled = aktualniDoklad && dto.Permissions.LzePrepocetAktANasl.value;
                            }
                            this.actions.actPrepocetAkt?.enabled(prepocetAktEnabled);
                            this.actions.actPrepocetAktANasl?.enabled(prepocetAktANaslEnabled);
                        }
                    }).ggridroweditor({
                        allowCopy: true,
                        beforeStart: (ev, info) => {
                            //kontrola povolení editace
                            //spuštění delegáta pro případné zakázaní editace dokladem (např. neuložená částka, doba financování, ...)
                            if (this.isRozpisEditable) {
                                this.$gridDoklady.gcover();
                                this.isRozpisEditable().then((canEdit) => {
                                    if (!canEdit) {
                                        this.$gridDoklady.ggridroweditor("cancel");
                                    }
                                }).always(() => { this.$gridDoklady.gcover("destroy"); });
                            }
                            //pouze aktuální doklad a permission pro editaci
                            if (info.cellInfo.data.ixp != this.smlpid.ixp || !(info?.cellInfo?.data?.Permissions?.LzeEditovat?.value ?? true)) {
                                ev.preventDefault();
                                return;
                            }
                            //povolení kurzu u cizí měny a typu kurzu roční smluvní
                            this.kurzEnabled = this.smlpid.mena != 0 /* Interface.TypMeny.ng_menaCZK */ && this.smlpid.typ_kurz == 30 /* Interface.TypKurzu.ng_typkurzRokSml */;
                            //343.1 24.04.02 - pro roky vyšší než je aktuální nepovolím aktualizaci měny
                            //347.1 01.08.03 - přesunem definice BÚ na položky není důvod zamezit zadání rozpisu i na další roky - proto je zadání uvolněno
                            //347.3 05.08.03 - přístup řízen typem ceny - pouze pro Typ ceny = Pevna
                            //OR
                            //352.11 30.11.04  - pro volnou cenu je uvolněn přístup na částku do období, ve kterém není zadána položka a zároveň je rok větší než aktuální
                            this.c_menaEnabled = this.smlpid.typ_ceny == 10 /* Interface.TypCeny.ng_typcenyPevna */ ||
                                (this.smlpid.typ_ceny == 20 /* Interface.TypCeny.ng_typcenyVolna */ && (this.smlpid.max_rok_pol ?? 0) < info.cellInfo.data.rok && info.cellInfo.data.rok > this.rok);
                            if (!this.kurzEnabled && !this.c_menaEnabled) {
                                ev.preventDefault();
                                return;
                            }
                        },
                        start: (ev, obj) => {
                            this.actions.actPrepocetAkt?.enabled(false);
                            this.actions.actPrepocetAktANasl?.enabled(false);
                        },
                        save: (data, obj) => {
                            //return $.Deferred().reject().promise();
                            //var saveDto: Interface.GSmldrokDto = { ...obj.cellInfo.data, ...data };
                            var rowDto = obj.cellInfo.data;
                            return this.isl.SmlFinRozpisDoklad.update({
                                ixp: rowDto.ixp, rok: rowDto.rok, kurz: (this.kurzEnabled) ? data.kurz : rowDto.kurz,
                                c_mena: (this.c_menaEnabled) ? data.c_mena : rowDto.c_mena, dat_zmena: rowDto.dat_zmena, sdat_zmena: this.smlpid.dat_zmena
                            }).getData().done((newDto) => {
                                //this.changed = true;
                                //this.$gridDoklady.ggrid("getView").requestData();
                                //this.$gridPripad.ggrid("getView").requestData();
                                this.element.trigger("rozpischanged");
                            }).fail((xhr, type, o) => {
                                if (type === "validation" && this.$gridDoklady) {
                                    o.handled = true;
                                    this.$gridDoklady.findFields().gfield("model", "validations", o);
                                }
                            });
                        }
                    });
                    //.ggrideko({
                    //    summaryRow: true,
                    //    summaryRowAllowed: true,
                    //    summaryRowColumns: ["c_mena", "c", "c_pol", "c_pol_vyd", "c_pol_pri", "c_mena_pri", "c_pri"]
                    //});
                }
                /**
                 * Definice gridformátu pro doklad
                 * @returns
                 */
                createDokladGridFormat() {
                    const that = this;
                    let c_mena_error = "";
                    var gf = new Gordic.Data.GridFormat()
                        //.addTextColumn({
                        //    name: "ixp",
                        //    caption: "Identifikátor"
                        //})
                        .addTextColumn({
                        name: "ac_sml",
                        caption: "jres:33600330", //RC 33600330 : Agendové číslo
                    })
                        .addNumberColumn({
                        name: "rok",
                        caption: "jres:33600331", //RC 33600331 : Rok
                        width: 300 //kvůli seskupení gridu
                    })
                        .addCurrencyColumn({
                        name: "kurz",
                        caption: "jres:33600332", //RC 33600332 : Kurz
                        format: "number(C3)",
                        aggregatePreset: null,
                        editor: function (info) {
                            if (that.kurzEnabled) {
                                return {
                                    widget: "gnumberbox",
                                    options: [Gordic.Prefabs.Number.currency(), {
                                            name: "kurz",
                                            defaultValue: new Decimal(1.000),
                                            change: (ev, ctx) => {
                                                var c_mena = parseDecimal((that.c_menaEnabled) ? that.$gridDoklady.findFields("c_mena").gfield("getValue") : info.cellInfo.data.c_mena);
                                                that.$gridDoklady.findFields("c").gfield("setValue", c_mena.times(parseDecimal(ctx.value)).dividedBy(parseDecimal(info.cellInfo.data.m)));
                                            }
                                        }]
                                };
                            }
                            return null;
                        }
                    })
                        .addCurrencyColumn({
                        name: "m",
                        caption: "jres:33600333", //RC 33600333 : Množství
                        format: "number(C3)",
                        aggregatePreset: null
                    })
                        .addCurrencyColumn({
                        name: "c_mena",
                        caption: "jres:33600323" + this.smlpid.mena_zkr, //RC 33600323 : Částka 
                        editor: function (info) {
                            if (that.c_menaEnabled) {
                                return {
                                    widget: "gnumberbox",
                                    options: [Gordic.Prefabs.Number.currency(), {
                                            name: "c_mena",
                                            defaultValue: new Decimal(0.00),
                                            change: (ev, ctx) => {
                                                var kurz = parseDecimal((that.kurzEnabled) ? that.$gridDoklady.findFields("kurz").gfield("getValue") : info.cellInfo.data.kurz);
                                                that.$gridDoklady.findFields("c").gfield("setValue", parseDecimal(ctx.value).times(kurz).dividedBy(parseDecimal(info.cellInfo.data.m)));
                                            },
                                            validators: [new Gordic.Validators.Base({
                                                    getMessage: (val) => { return c_mena_error; },
                                                    validate: (val, src) => {
                                                        //358.20 01.02.08 - nejprve provedu kontrolu vůči dokladu a teprve poté výsledek porovnám vůči případu.
                                                        var c_mena = parseDecimal(val);
                                                        //test na zápornou částku
                                                        //358.20 07.02.08 rozlišeny způsobu definice ceny
                                                        if (that.smlpid.zp_def_ceny == 0 /* Interface.ZpusobDefiniceCeny.ng_zpdefcenyAbs */ && c_mena.lessThan(0)) {
                                                            c_mena_error = "jres:33600336"; //RC 33600336 : Hodnota nesmí být záporná
                                                            return false;
                                                        }
                                                        else {
                                                            //358.20 07.02.08 pokud je přírůstkový režim, pak musí být znaménko shodné se znaménkem celkové ceny
                                                            //If ( l_c_mena > 0 and c_mena < 0 ) or ( l_c_mena < 0 and c_mena > 0 ) -- l_c_mena je pracovní hodnota celkové částky - udělám zatím staticky z dto
                                                            if ((parseDecimal(that.smlpid.c_mena).greaterThan(0) && c_mena.lessThan(0)) || (parseDecimal(that.smlpid.c_mena).lessThan(0) && c_mena.greaterThan(0))) {
                                                                c_mena_error = "jres:33600337"; //RC 33600337 : Znaménko hodnoty rozpisu musí být shodné se znaménkem celkové ceny
                                                                return false;
                                                            }
                                                        }
                                                        //Pozn: Toto musím kontrolovat až na serveru, protože si potřebuji načíst smlrok pro rok záznamu
                                                        ////343.1 26.04.02 - kontrola vůči celkové částce v měně
                                                        ////celková částka smlouvy v měně >= celková částka doposud rozepsaná za roky + nová cena - původní
                                                        ////352.11 01.12.04 - pozor -  případě, že je  volná cena a rok je vyšší než aktuální a maximální se zadanou položkou, nebude probíhat tato kontrola
                                                        //if (that.smlpid.typ_ceny == Interface.TypCeny.ng_typcenyVolna && (that.smlpid.max_rok_pol ?? 0) < info.cellInfo.data.rok && info.cellInfo.data.rok > that.rok) {
                                                        //    //nekontroluji --- radši zatím nechám tuto zbytečnou konstrukci
                                                        //} else {
                                                        //    //360.4 23.10.08 použiju absolutní hodnoty
                                                        //    if (parseDecimal(that.smlpid.c_mena!).abs().lessThan((parseDecimal(that.smlpid.c_mena_rok_sum ?? 0).abs().plus(c_mena.abs()).minus(parseDecimal(that.smlpid.smlrok?.c_mena!).abs())))) { //TODO: c_mena_rok_sum se nenačítá
                                                        //        //příliš vysoká částka
                                                        //        //344.5 10.5.02 - zobrazím skutečně volné prostředky
                                                        //        let l_free = parseDecimal(that.smlpid.c_mena!).abs().minus((parseDecimal(that.smlpid.c_mena_rok_sum ?? 0).abs().plus(c_mena.abs()).minus(parseDecimal(that.smlpid.smlrok?.c_mena!).abs()))); //TODO: c_mena_rok_sum se nenačítá
                                                        //        if (l_free.lessThan(0)) { l_free = new Decimal(0); }
                                                        //        c_mena_error = "jres:33600338".format(l_free.toString()); //RC 33600338 : Požadovaná částka rozpisu na roky převyšuje celkovou částku. Volné prostředky: {0}
                                                        //        return false;
                                                        //        //nulování polí -
                                                        //        //342.51 18.12.01 nikoliv nulování, ale nastavení původních hodnot
                                                        //        //Set c_mena = smlpid.findoc.smlrok.c_mena
                                                        //        //Set c = smlpid.findoc.smlrok.c
                                                        //    }
                                                        //}
                                                        //test na změnu celkové ceny rozpisu v roce proti ceně položek v roce
                                                        //358.20 07.02.08 - použity absolutní hodnoty kvůli možnosti definice přírůstků. Poznámka - c_pol obsahuje aktuální sumu položek za doklad
                                                        let kurz = parseDecimal((that.kurzEnabled) ? that.$gridDoklady.findFields("kurz").gfield("getValue") : info.cellInfo.data.kurz);
                                                        let c = c_mena.times(kurz).dividedBy(parseDecimal(info.cellInfo.data.m));
                                                        if (c.abs().lessThan(parseDecimal(info.cellInfo.data.c_pol ?? 0).abs())) {
                                                            c_mena_error = "jres:33600339"; //RC 33600339 : Částka v daném období nesmí klesnout pod úroveň položek
                                                            return false;
                                                            //vrátit na původní hodnoty
                                                            //Set mena = smlpid.findoc.smlrok.mena
                                                            //Set c_mena = smlpid.findoc.smlrok.c_mena
                                                            //Set c = smlpid.findoc.smlrok.c
                                                        }
                                                        //kontrola disponibility je řešena storovkou, takže se bude kontrolovat až na serveru
                                                        return true;
                                                    }
                                                })]
                                        }]
                                };
                            }
                            return null;
                        }
                    })
                        .addCurrencyColumn({
                        name: "c",
                        caption: "jres:33600324", //RC 33600324 : Částka CZK
                        editor: function (info) {
                            if (that.c_menaEnabled || that.kurzEnabled) {
                                return {
                                    widget: "gnumberbox",
                                    options: [Gordic.Prefabs.Number.currency(), {
                                            name: "c",
                                            disabled: true,
                                            smartNavigation: false,
                                            tabbable: false
                                        }]
                                };
                            }
                            return null;
                        }
                    })
                        .addCurrencyColumn({
                        name: "c_pol",
                        caption: "jres:33600325", //RC 33600325 : Položky FP CZK
                    })
                        .addCurrencyColumn({
                        name: "c_pol_vyd",
                        caption: "jres:33600326", //RC 33600326 : Výdaje CZK
                    })
                        .addCurrencyColumn({
                        name: "c_pol_pri",
                        caption: "jres:33600327", //RC 33600327 : Příjmy CZK
                    })
                        .addCurrencyColumn({
                        name: "c_mena_pri",
                        caption: "jres:33600334", //RC 33600334 : Částka za případ
                    })
                        .addCurrencyColumn({
                        name: "c_pri",
                        caption: "jres:33600335", //RC 33600335 : Částka CZK za případ
                    });
                    return gf;
                }
                /**
                 * Akce přepočet částek dle ročního systémového kurzu
                 * @param rezim režim přepočtu: 0 = pouze pro aktuální rok, 1 = pro aktuální a následující roky
                 */
                prepocet(dto, rezim) {
                    return this.isl.SmlFinRozpisDoklad.rokCPrepocet({ ixp: dto.ixp, rok: dto.rok, rezim: rezim }).get().done(() => {
                        this.$gridPripad.ggrid("getView").requestData();
                        this.$gridDoklady.ggrid("getView").requestData();
                    });
                }
                /**
                 * Vytvoření tabu Limity realizátorů
                 * @param tabFinancovani
                 */
                createTabLimitReal(tabFinancovani) {
                    let $tabLimitReal = $.newDiv()
                        .appendTo(tabFinancovani)
                        .gtab({
                        id: "tabRozpisLimitReal",
                        title: "jres:33600340", //RC 33600340 : Limity realizátorů
                        opened: false,
                        autoload: false,
                        menuBar: [{ action: this.actions.actLimitRealNovy, favorite: true }, { action: this.actions.actLimitRealStornovat, favorite: true }]
                    });
                    Gordic.Prefabs.Select.ekosrea;
                    this.$gridLimitReal = $.newDiv()
                        .appendTo($tabLimitReal)
                        .ggrid({
                        name: "gridRozpisLimitReal",
                        columnMode: "full",
                        columns: this.createLimitRealGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlFinRozpisLimitReal.list({
                            rq: {
                                filters: {
                                    ixp_sml_pri: this.smlpid.ixp_sml_pri,
                                    rok: { o: ">", v: 0 },
                                    aktivita: { o: "<", v: 900 }
                                }, fragments: ["Permissions.*"]
                            },
                            ixp: this.smlpid.ixp
                        }), {
                            onResponse: (data) => {
                                this.serPermLimitReal = data.servicePermissions ?? { LzeNovy: { value: false } };
                                return data;
                            },
                            key: ["ixp_sml_pri", "rok", "cis_real", "ico"],
                            processors: {
                                permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"])
                            }
                        }),
                        defaultProfile: {
                            sort: "ixp_sml_pri,rok,cis_real",
                            condFormats: [{
                                    formula: "@aktivita != 100",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                                }],
                            columnList: "stav_txt,rok,cis_real_txt,c_rok_real,c_rok_real_rez"
                        },
                        profileBeforeChange: (ev, obj) => {
                            // pokud se edituje, nejsou povoleny změny v gridu
                            return (this.$gridLimitReal?.find(".row.editing")?.length ?? 0) < 1;
                        },
                        selection: (ev, obj) => {
                            //kontrola na normální řádek a needitaci
                            if (!(obj.count == 0 || (this.$gridLimitReal?.find(".row.editing")?.length ?? 1) > 0 || obj.count == 1 && obj.getSelection(false, false).length == 0)) {
                                var dto = obj.getSelection()[0];
                                this.actions.actLimitRealStornovat?.updatePermission(dto.Permissions.LzeStornovat);
                            }
                            else {
                                this.actions.actLimitRealStornovat?.updatePermission({ value: false });
                            }
                            //tlačítko Nový nastavovat pokaždé pokud není editace
                            if ((this.$gridLimitReal?.find(".row.editing")?.length ?? 1) < 1) {
                                this.actions.actLimitRealNovy?.updatePermission(this.serPermLimitReal, "LzeNovy");
                            }
                        }
                    }).ggridroweditor({
                        allowCopy: true,
                        beforeStart: (ev, info) => {
                            //kontrola povolení editace
                            if (!(info?.cellInfo?.data?.Permissions?.LzeEditovat?.value ?? false)) {
                                ev.preventDefault();
                            }
                        },
                        start: (ev, info) => {
                            setTimeout(() => {
                                this.actions.actLimitRealNovy?.updatePermission({ value: false });
                            }, 1);
                            this.actions.actLimitRealStornovat?.updatePermission({ value: false });
                        },
                        save: (data, obj) => {
                            var saveDto = { ...obj.cellInfo.data, ...data };
                            return this.isl.SmlFinRozpisLimitReal.upsert({ rq: { data: saveDto }, ixp: this.smlpid.ixp }).getData().done(() => {
                                //this.changed = true;
                                //this.$gridLimitReal.ggrid("getView").requestData();
                            }).fail((xhr, type, o) => {
                                if (type === "validation" && this.$gridLimitReal) {
                                    o.handled = true;
                                    this.$gridLimitReal.findFields().gfield("model", "validations", o);
                                }
                            });
                        }
                    })
                        .ggrideko({
                        summaryRow: true,
                        summaryRowAllowed: true,
                        summaryRowColumns: ["c_rok_real", "c_rok_real_rez"]
                    });
                }
                //Definice sloupečků pro grid limit. real.
                createLimitRealGridFormat() {
                    const that = this;
                    var gf = new Gordic.Data.GridFormat();
                    var c_rok_real_msg = "";
                    gf.addTextColumn({
                        name: "stav_txt",
                        caption: "jres:33600348", //RC 33600348 : Stav
                        width: 80
                    });
                    gf.addNumberColumn({
                        name: "rok",
                        caption: "jres:33600341", //RC 33600341 : Rok
                        editor: function (info) {
                            if (!info.cellInfo.data.flag_DB) { //povolím editaci pouze u nového záznamu
                                return {
                                    widget: "gnumberbox",
                                    options: [{
                                            name: "rok",
                                            defaultValue: that.rok,
                                            flag: "required",
                                            validators: [
                                                new Gordic.Validators.Required(),
                                                new Gordic.Validators.Base({
                                                    message: "jres:33600345".format(that.smlpid.pripad?.fin_od, that.smlpid.pripad?.fin_do), //RC 33600345 : Rok musí odpovídat intervalu financování případu: {0} - {1}
                                                    validate: (val, src) => {
                                                        if ($(src).gfield("getErrors").length > 0) {
                                                            return true;
                                                        }
                                                        return val >= (that.smlpid.pripad?.fin_od ?? -1) && val <= (that.smlpid.pripad?.fin_do ?? -1);
                                                    }
                                                })
                                            ]
                                        }]
                                };
                            }
                            return null;
                        }
                    })
                        .addTextColumn({
                        name: "cis_real_txt",
                        caption: "jres:33600342", //RC 33600342 : Realizátor
                        width: 500,
                        editor: function (info) {
                            if (!info.cellInfo.data.flag_DB) { //povolím editaci pouze u nového záznamu
                                return {
                                    widget: "gselectbox",
                                    options: [Gordic.Prefabs.Select.cisReal(), {
                                            name: "cis_real",
                                            model: "model.cis_real=value.cis_real;model.ixp_sml_pri=>value.ixs_sml_pri",
                                            flag: "required",
                                            validators: [new Gordic.Validators.Required()],
                                            serverFilters: {
                                                aktivita: 100,
                                                ixs_sml_pri: that.smlpid.ixp_sml_pri
                                            }
                                        }]
                                };
                            }
                            return null;
                        }
                    })
                        .addCurrencyColumn({
                        name: "c_rok_real",
                        caption: "jres:33600343", //RC 33600343 : Limit
                        width: 150,
                        editor: function (info) {
                            if (!info.cellInfo.data.flag_DB || info.cellInfo.data.aktivita == 100) { //povolím editaci pouze u nového nebo aktivního záznamu
                                return {
                                    widget: "gnumberbox",
                                    options: [Gordic.Prefabs.Number.currency(), {
                                            name: "c_rok_real",
                                            defaultValue: 0.00,
                                            flag: "required",
                                            validators: [
                                                new Gordic.Validators.Required(),
                                                new Gordic.Validators.Base({
                                                    getMessage: () => { return c_rok_real_msg; },
                                                    validate: (val, src) => {
                                                        if ($(src).gfield("getErrors").length > 0) {
                                                            return true;
                                                        }
                                                        var value = parseDecimal(val);
                                                        //test na zápornou částku
                                                        if (value.lessThan(0)) {
                                                            c_rok_real_msg = "jres:33600346"; //RC 33600346 : Hodnota nesmí být záporná
                                                            return false;
                                                        }
                                                        //test na změnu limitu vůči rezervacím
                                                        var c_rok_real_rez = parseDecimal(info.cellInfo.data.c_rok_real_rez);
                                                        if (c_rok_real_rez.greaterThan(0) && value.lessThan(c_rok_real_rez)) {
                                                            c_rok_real_msg = "jres:33600347"; //RC 33600347 : Částka nesmí klesnout pod úroveň rezervovaných prostředků
                                                            return false;
                                                        }
                                                        //další kontrola až na serveru pomocí storovky
                                                        return true;
                                                    }
                                                })
                                            ]
                                        }]
                                };
                            }
                            return null;
                        }
                    })
                        .addCurrencyColumn({
                        name: "c_rok_real_rez",
                        caption: "jres:33600344", //RC 33600344 : Celkem navázáno
                        width: 150
                    })
                        //unvisible
                        .addTextColumn({
                        name: "ixp_sml_pri",
                        caption: "ixp_sml_pri",
                        hidden: true
                    })
                        .addNumberColumn({
                        name: "aktivita",
                        caption: "aktivita",
                        hidden: true
                    });
                    return gf;
                }
            };
            GSmlFinancovaniRozpis = __decorate([
                Decorators.gcontent
            ], GSmlFinancovaniRozpis);
            WebClient.GSmlFinancovaniRozpis = GSmlFinancovaniRozpis;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbEZpbmFuY292YW5pUm96cGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbEZpbmFuY292YW5pUm96cGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBc3FCZjtBQXRxQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc3FCbkI7SUF0cUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzcUI3QjtRQXRxQm9CLFdBQUEsU0FBUztZQUMxQiwwQ0FBMEM7WUFFMUMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBd0JuRCxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsNkJBQTZCO29CQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkMsb0RBQW9EO29CQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNwQyxtQ0FBbUM7b0JBQ25DLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxvQkFBb0I7Z0JBQ1osYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsY0FBYyxFQUFFOzRCQUNaLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUNBQW1DOzRCQUM3RCxPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0MsQ0FBQzt5QkFDSjt3QkFDRCxtQkFBbUIsRUFBRTs0QkFDakIsSUFBSSxFQUFFLHFCQUFxQjs0QkFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxpREFBaUQ7NEJBQzNFLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMzQyxDQUFDO3lCQUNKO3dCQUNELGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDM0MsSUFBSSxFQUFFLGtCQUFrQjs0QkFDeEIsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0NBQ3BILElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDbEUsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLHlDQUF5Qzt3Q0FDNUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWTtvQ0FDOUYsQ0FBQzt5Q0FBTSxDQUFDO3dDQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztvQ0FDekQsQ0FBQztnQ0FDTCxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUNQLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixxQkFBcUIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7NEJBQ3JELElBQUksRUFBRSx1QkFBdUI7NEJBQzdCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29DQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDUixDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxlQUFlLENBQUMsY0FBbUM7b0JBQ3ZELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ3RCLFFBQVEsQ0FBQyxjQUFjLENBQUM7eUJBQ3hCLElBQUksQ0FBQzt3QkFDRixFQUFFLEVBQUUsaUJBQWlCO3dCQUNyQixLQUFLLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjt3QkFDOUMsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsUUFBUSxFQUFFLEtBQUs7cUJBQ2xCLENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO3lCQUM3QyxLQUFLLENBQUM7d0JBQ0gsSUFBSSxFQUFFLGtCQUFrQjt3QkFDeEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7d0JBQ3RDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDOzRCQUN2RCxPQUFPLEVBQUU7Z0NBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztnQ0FDNUIsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dDQUNyQixRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsOENBQXFDLEVBQUU7NkJBQy9EO3lCQUNKLENBQUMsRUFBRTs0QkFDQSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO3lCQUN0QixDQUFDO3dCQUNGLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQztxQkFDekIsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxzQkFBc0I7b0JBQzFCLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7eUJBQ2hDLE1BQU0sRUFBRTt5QkFDUixpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLHVCQUF1QjtxQkFDM0UsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsR0FBRzt3QkFDVCxPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjtxQkFDdkQsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4QjtxQkFDM0QsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7cUJBQ3ZELENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3FCQUN2RCxDQUFDLENBQUM7b0JBQ1AsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNLLGdCQUFnQixDQUFDLGNBQW1DO29CQUN4RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO3lCQUN2QixRQUFRLENBQUMsY0FBYyxDQUFDO3lCQUN4QixJQUFJLENBQUM7d0JBQ0YsRUFBRSxFQUFFLGtCQUFrQjt3QkFDdEIsS0FBSyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3ZELE1BQU0sRUFBRSxJQUFJO3dCQUNaLFFBQVEsRUFBRSxLQUFLO3dCQUNmLE9BQU8sRUFBRSxDQUFDO2dDQUNOLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSw2REFBNkQ7Z0NBQ3ZHLFFBQVEsRUFBRSxDQUFDO3dDQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWM7cUNBQ3RDLEVBQUU7d0NBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CO3FDQUMzQyxDQUFDOzZCQUNMLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDekIsUUFBUSxDQUFDLFdBQVcsQ0FBQzt5QkFDckIsS0FBSyxDQUFDO3dCQUNILElBQUksRUFBRSxtQkFBbUI7d0JBQ3pCLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFO3dCQUN0QyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQzs0QkFDdkQsT0FBTyxFQUFFO2dDQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0NBQ3JDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQ0FDckIsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLDhDQUFxQyxFQUFFOzZCQUMvRDt5QkFDSixDQUFDLEVBQUU7NEJBQ0EsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzs0QkFDbkIsVUFBVSxFQUFFO2dDQUNSLG1CQUFtQixFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQzs2QkFDMUU7eUJBQ0osQ0FBQzt3QkFDRixjQUFjLEVBQUU7NEJBQ1osUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLElBQUksRUFBRSxLQUFLOzRCQUNYLE9BQU8sRUFBRTtnQ0FDTCxRQUFRLEVBQUU7b0NBQ04sUUFBUSxFQUFFO3dDQUNOLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRDQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0RBQUMsT0FBTyxNQUFNLENBQUE7NENBQUMsQ0FBQztpREFBTSxDQUFDO2dEQUFDLE9BQU8sUUFBUSxDQUFBOzRDQUFDLENBQUM7d0NBQzFGLENBQUM7d0NBQ0QsZ0RBQWdEO3FDQUNuRDtpQ0FDSjs2QkFDSjs0QkFDRCxVQUFVLEVBQUUsdUVBQXVFO3lCQUN0Rjt3QkFDRCxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDN0Isa0RBQWtEOzRCQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEUsQ0FBQzt3QkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ25CLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDOzRCQUMvQixJQUFJLHVCQUF1QixHQUFHLEtBQUssQ0FBQzs0QkFDcEMsd0NBQXdDOzRCQUN4QyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQ2xKLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsSUFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQ0FDbEUsa0JBQWtCLEdBQUcsY0FBYyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztnQ0FDNUUsdUJBQXVCLEdBQUcsY0FBYyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDOzRCQUMxRixDQUFDOzRCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzRCQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3dCQUN2RSxDQUFDO3FCQUNKLENBQUMsQ0FBQyxjQUFjLENBQUM7d0JBQ2QsU0FBUyxFQUFFLElBQUk7d0JBQ2YsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFOzRCQUN0QiwyQkFBMkI7NEJBQzNCLDBHQUEwRzs0QkFDMUcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQ0FDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDM0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0NBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3Q0FDWCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDL0MsQ0FBQztnQ0FDTCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDN0QsQ0FBQzs0QkFFRCxnREFBZ0Q7NEJBQ2hELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQ0FBQyxPQUFPOzRCQUFDLENBQUM7NEJBRW5KLHVEQUF1RDs0QkFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksd0NBQWdDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLGdEQUF1QyxDQUFDOzRCQUNuSSw0RUFBNEU7NEJBQzVFLCtIQUErSDs0QkFDL0gsd0VBQXdFOzRCQUN4RSxJQUFJOzRCQUNKLDhJQUE4STs0QkFDOUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsOENBQXFDO2dDQUMxRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSw4Q0FBcUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUVoSyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7Z0NBQUMsT0FBTzs0QkFBQyxDQUFDO3dCQUNsRixDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyRCxDQUFDO3dCQUNELElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDaEIseUNBQXlDOzRCQUN6Qyx5RUFBeUU7NEJBQ3pFLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dDQUN0QyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dDQUNwRixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUzs2QkFDN0gsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dDQUN6QixzQkFBc0I7Z0NBQ3RCLG1EQUFtRDtnQ0FDbkQsa0RBQWtEO2dDQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFDMUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQ0FDckIsSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQ0FDN0MsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0NBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQ3JFLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztxQkFDSixDQUFDLENBQUE7b0JBQ0YsYUFBYTtvQkFDYix1QkFBdUI7b0JBQ3ZCLDhCQUE4QjtvQkFDOUIsa0dBQWtHO29CQUNsRyxLQUFLO2dCQUNiLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxzQkFBc0I7b0JBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUV0QixJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNqQyxrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsOEJBQThCO3dCQUM5QixJQUFJO3lCQUNILGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4QjtxQkFDM0QsQ0FBQzt5QkFDRCxlQUFlLENBQUM7d0JBQ2IsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7d0JBQzdDLEtBQUssRUFBRSxHQUFHLENBQUMsdUJBQXVCO3FCQUNyQyxDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksRUFBRSxNQUFNO3dCQUNaLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CO3dCQUM5QyxNQUFNLEVBQUUsWUFBWTt3QkFDcEIsZUFBZSxFQUFFLElBQUk7d0JBQ3JCLE1BQU0sRUFBRSxVQUFVLElBQUk7NEJBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dDQUNuQixPQUFPO29DQUNILE1BQU0sRUFBRSxZQUFZO29DQUNwQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTs0Q0FDeEMsSUFBSSxFQUFFLE1BQU07NENBQ1osWUFBWSxFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQzs0Q0FDaEMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dEQUNoQixJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0RBQ3hJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NENBQzlJLENBQUM7eUNBQ0osQ0FBQztpQ0FDTCxDQUFBOzRCQUNMLENBQUM7NEJBQ0QsT0FBTyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsR0FBRzt3QkFDVCxPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLGVBQWUsRUFBRSxJQUFJO3FCQUN4QixDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsdUJBQXVCO3dCQUN4RSxNQUFNLEVBQUUsVUFBVSxJQUFJOzRCQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQ0FDckIsT0FBTztvQ0FDSCxNQUFNLEVBQUUsWUFBWTtvQ0FDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7NENBQ3hDLElBQUksRUFBRSxRQUFROzRDQUNkLFlBQVksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7NENBQy9CLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnREFDaEIsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dEQUNoSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRDQUM1SSxDQUFDOzRDQUNELFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0RBQ3BDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDO29EQUM3QyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7d0RBQ25CLHVHQUF1Rzt3REFDdkcsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dEQUMvQix5QkFBeUI7d0RBQ3pCLGlEQUFpRDt3REFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsd0RBQWdELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzREQUNoRyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMseUNBQXlDOzREQUN6RSxPQUFPLEtBQUssQ0FBQzt3REFDakIsQ0FBQzs2REFBTSxDQUFDOzREQUNKLG9HQUFvRzs0REFDcEcsb0pBQW9KOzREQUNwSixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnRUFDdkosWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDLGtGQUFrRjtnRUFDbEgsT0FBTyxLQUFLLENBQUM7NERBQ2pCLENBQUM7d0RBQ0wsQ0FBQzt3REFDRCxnR0FBZ0c7d0RBQ2hHLHdEQUF3RDt3REFDeEQsbUdBQW1HO3dEQUNuRyxvSkFBb0o7d0RBQ3BKLGtLQUFrSzt3REFDbEsscUVBQXFFO3dEQUNyRSxVQUFVO3dEQUNWLGdEQUFnRDt3REFDaEQsaU9BQWlPO3dEQUNqTyxnQ0FBZ0M7d0RBQ2hDLDhEQUE4RDt3REFDOUQseU9BQXlPO3dEQUN6Tyw4REFBOEQ7d0RBQzlELHNLQUFzSzt3REFDdEssdUJBQXVCO3dEQUN2QiwyQkFBMkI7d0RBQzNCLDRFQUE0RTt3REFDNUUsb0RBQW9EO3dEQUNwRCwwQ0FBMEM7d0RBQzFDLE9BQU87d0RBQ1AsR0FBRzt3REFDSCxxRUFBcUU7d0RBQ3JFLDBJQUEwSTt3REFDMUksSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dEQUNoSSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3REFDekUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDOzREQUNwRSxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsdUVBQXVFOzREQUN2RyxPQUFPLEtBQUssQ0FBQzs0REFDYiwyQkFBMkI7NERBQzNCLHNDQUFzQzs0REFDdEMsMENBQTBDOzREQUMxQyxnQ0FBZ0M7d0RBQ3BDLENBQUM7d0RBQ0QscUZBQXFGO3dEQUNyRixPQUFPLElBQUksQ0FBQztvREFDaEIsQ0FBQztpREFDSixDQUFDLENBQUM7eUNBQ04sQ0FBQztpQ0FDTCxDQUFBOzRCQUNMLENBQUM7NEJBQ0QsT0FBTyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsR0FBRzt3QkFDVCxPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsTUFBTSxFQUFFLFVBQVUsSUFBSTs0QkFDbEIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDekMsT0FBTztvQ0FDSCxNQUFNLEVBQUUsWUFBWTtvQ0FDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7NENBQ3hDLElBQUksRUFBRSxHQUFHOzRDQUNULFFBQVEsRUFBRSxJQUFJOzRDQUNkLGVBQWUsRUFBRSxLQUFLOzRDQUN0QixRQUFRLEVBQUUsS0FBSzt5Q0FDbEIsQ0FBQztpQ0FDTCxDQUFBOzRCQUNMLENBQUM7NEJBQ0QsT0FBTyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4QjtxQkFDM0QsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7cUJBQ3ZELENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3FCQUN2RCxDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksRUFBRSxZQUFZO3dCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLGdDQUFnQztxQkFDN0QsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLG9DQUFvQztxQkFDakUsQ0FBQyxDQUFBO29CQUNOLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxRQUFRLENBQUMsR0FBMEIsRUFBRSxLQUFhO29CQUN0RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDMUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNyRCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0ssa0JBQWtCLENBQUMsY0FBbUM7b0JBQzFELElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ3pCLFFBQVEsQ0FBQyxjQUFjLENBQUM7eUJBQ3hCLElBQUksQ0FBQzt3QkFDRixFQUFFLEVBQUUsb0JBQW9CO3dCQUN4QixLQUFLLEVBQUUsZUFBZSxFQUFFLGtDQUFrQzt3QkFDMUQsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7cUJBQ3ZJLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUE7b0JBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDM0IsUUFBUSxDQUFDLGFBQWEsQ0FBQzt5QkFDdkIsS0FBSyxDQUFDO3dCQUNILElBQUksRUFBRSxxQkFBcUI7d0JBQzNCLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO3dCQUN6QyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQzs0QkFDMUQsRUFBRSxFQUFFO2dDQUNBLE9BQU8sRUFBRTtvQ0FDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO29DQUNwQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7b0NBQ3JCLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtpQ0FDL0IsRUFBQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7NkJBQ2pDOzRCQUNELEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUk7eUJBQ3hCLENBQUMsRUFBRTs0QkFDQSxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDakIsSUFBSSxDQUFDLGdCQUFnQixHQUFJLElBQUksQ0FBQyxrQkFBMkQsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dDQUMzSCxPQUFPLElBQUksQ0FBQzs0QkFDaEIsQ0FBQzs0QkFDRCxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUM7NEJBQzlDLFVBQVUsRUFBRTtnQ0FDUixtQkFBbUIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7NkJBQzFFO3lCQUNKLENBQUM7d0JBQ0YsY0FBYyxFQUFFOzRCQUNaLElBQUksRUFBRSwwQkFBMEI7NEJBQ2hDLFdBQVcsRUFBRSxDQUFDO29DQUNWLE9BQU8sRUFBRSxrQkFBa0I7b0NBQzNCLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUc7aUNBQzlELENBQUM7NEJBQ0YsVUFBVSxFQUFFLHFEQUFxRDt5QkFDcEU7d0JBQ0QsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQzdCLGtEQUFrRDs0QkFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3hFLENBQUM7d0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNuQix3Q0FBd0M7NEJBQ3hDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQ0FDcEosSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3ZGLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7NEJBQ3pFLENBQUM7NEJBQ0QscURBQXFEOzRCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dDQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDdEYsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUMsQ0FBQyxjQUFjLENBQUM7d0JBQ2QsU0FBUyxFQUFFLElBQUk7d0JBQ2YsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFOzRCQUN0QiwyQkFBMkI7NEJBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0NBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUFDLENBQUM7d0JBQ25HLENBQUM7d0JBQ0QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFOzRCQUNoQixVQUFVLENBQUMsR0FBRyxFQUFFO2dDQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDdEUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBOzRCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDM0UsQ0FBQzt3QkFDRCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ2hCLElBQUksT0FBTyxHQUEwQixFQUFFLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQzs0QkFDdkUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0NBQzlHLHNCQUFzQjtnQ0FDdEIscURBQXFEOzRCQUN6RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUNyQixJQUFJLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29DQUMvQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQ0FDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDdkUsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3FCQUNKLENBQUM7eUJBQ0QsUUFBUSxDQUFDO3dCQUNOLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixpQkFBaUIsRUFBRSxJQUFJO3dCQUN2QixpQkFBaUIsRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztxQkFDdEQsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsMENBQTBDO2dCQUNsQyx5QkFBeUI7b0JBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUV0QyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CO3dCQUM5QyxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUE7b0JBQ0YsRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsS0FBSzt3QkFDWCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjt3QkFDN0MsTUFBTSxFQUFFLFVBQVUsSUFBSTs0QkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsd0NBQXdDO2dDQUN2RSxPQUFPO29DQUNILE1BQU0sRUFBRSxZQUFZO29DQUNwQixPQUFPLEVBQUUsQ0FBQzs0Q0FDTixJQUFJLEVBQUUsS0FBSzs0Q0FDWCxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUc7NENBQ3RCLElBQUksRUFBRSxVQUFVOzRDQUNoQixVQUFVLEVBQUU7Z0RBQ1IsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtnREFDaEMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvREFDdkIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU8sQ0FBQyxFQUFFLDJFQUEyRTtvREFDdEssUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO3dEQUNuQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDOzREQUFDLE9BQU8sSUFBSSxDQUFDO3dEQUFDLENBQUM7d0RBQzNELE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0RBQ2xHLENBQUM7aURBQ0osQ0FBQzs2Q0FDTDt5Q0FDSixDQUFDO2lDQUNMLENBQUE7NEJBQ0wsQ0FBQzs0QkFDRCxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsY0FBYzt3QkFDcEIsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQkFBMEI7d0JBQ3BELEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBRSxVQUFVLElBQUk7NEJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLHdDQUF3QztnQ0FDdkUsT0FBTztvQ0FDSCxNQUFNLEVBQUUsWUFBWTtvQ0FDcEIsT0FBTyxFQUFFLENBQUMsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFOzRDQUNoQyxJQUFJLEVBQUUsVUFBVTs0Q0FDaEIsS0FBSyxFQUFFLG9FQUFvRTs0Q0FDM0UsSUFBSSxFQUFFLFVBQVU7NENBQ2hCLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0Q0FDOUMsYUFBYSxFQUFFO2dEQUNYLFFBQVEsRUFBRSxHQUFHO2dEQUNiLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7NkNBQ3ZDO3lDQUNKLENBQUM7aUNBQ0wsQ0FBQTs0QkFDTCxDQUFDOzRCQUNELE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsR0FBRzt3QkFDVixNQUFNLEVBQUUsVUFBVSxJQUFJOzRCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLHVEQUF1RDtnQ0FDNUgsT0FBTztvQ0FDSCxNQUFNLEVBQUUsWUFBWTtvQ0FDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7NENBQ3hDLElBQUksRUFBRSxZQUFZOzRDQUNsQixZQUFZLEVBQUUsSUFBSTs0Q0FDbEIsSUFBSSxFQUFFLFVBQVU7NENBQ2hCLFVBQVUsRUFBRTtnREFDUixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO2dEQUNoQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO29EQUN2QixVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDO29EQUM1QyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7d0RBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7NERBQUMsT0FBTyxJQUFJLENBQUM7d0RBQUMsQ0FBQzt3REFDM0QsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dEQUM5Qix5QkFBeUI7d0RBQ3pCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzREQUNwQixjQUFjLEdBQUcsZUFBZSxDQUFDLENBQUMseUNBQXlDOzREQUMzRSxPQUFPLEtBQUssQ0FBQzt3REFDakIsQ0FBQzt3REFDRCxzQ0FBc0M7d0RBQ3RDLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3REFDckUsSUFBSSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQzs0REFDbEUsY0FBYyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHlFQUF5RTs0REFDM0csT0FBTyxLQUFLLENBQUM7d0RBQ2pCLENBQUM7d0RBQ0QsOENBQThDO3dEQUM5QyxPQUFPLElBQUksQ0FBQztvREFDaEIsQ0FBQztpREFDSixDQUFDOzZDQUNMO3lDQUNKLENBQUM7aUNBQ0wsQ0FBQTs0QkFDTCxDQUFDOzRCQUNELE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDO3FCQUNKLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLGdCQUFnQjt3QkFDdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7d0JBQ0YsV0FBVzt5QkFDVixhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixNQUFNLEVBQUUsSUFBSTtxQkFDZixDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLFVBQVU7d0JBQ25CLE1BQU0sRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQTtvQkFDTixPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDO2FBQ0osQ0FBQTtZQWxxQlkscUJBQXFCO2dCQURqQyxVQUFVLENBQUMsUUFBUTtlQUNQLHFCQUFxQixDQWtxQmpDO1lBbHFCWSwrQkFBcUIsd0JBa3FCakMsQ0FBQTtRQUNMLENBQUMsRUF0cUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzcUI3QjtJQUFELENBQUMsRUF0cUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzcUJuQjtBQUFELENBQUMsRUF0cUJTLE1BQU0sS0FBTixNQUFNLFFBc3FCZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbEZpbmFuY292YW5pUm96cGlzLnRzICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBGaW5hbmNvdsOhbsOtIC0gUm96cGlzIMSNw6FzdGt5IG5hIHJva3kgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0wNS0yNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxuLy8gIDwvRmlsZUhlYWRlcj5cblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIC8qKiBGaW5hbmNvdsOhbsOtIC0gUm96cGlzIMSNw6FzdGt5IG5hIHJva3kgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbEZpbmFuY292YW5pUm96cGlzIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogQ2Vsa292w70gcmVjb3JkIC0gZG9rbGFkICsgcMWZw61wYWQgKi9cclxuICAgICAgICBwdWJsaWMgc21scGlkOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0bztcclxuICAgICAgICAvKiogUMWZw61wYWRuw70gZGVsZWfDoXQgcHJvIHpha8OhesOhbsOtL3Bvdm9sZW7DrSBlZGl0YWNlIHJvenBpc3UgeiBkb2tsYWR1Ki9cclxuICAgICAgICBwdWJsaWMgaXNSb3pwaXNFZGl0YWJsZT86ICgpID0+IEpRdWVyeS5Qcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAgICAgICAvL0NvbnRlbnRWYWx1ZXNcclxuICAgICAgICAvKiogU2V6bmFtIGRva2xhZMWvIHBybyBha3R1w6FsbsOtIHDFmcOtcGFkICovXHJcbiAgICAgICAgcHJpdmF0ZSBkb2tsYWR5TGlzdDogSW50ZXJmYWNlLkdTbWxGaW5Sb3pwaXNEb2tsYWREdG9bXTtcclxuICAgICAgICAvKiogQWt0dcOhbG7DrSByb2sgKi9cclxuICAgICAgICBwcml2YXRlIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWssIHpkYSBqc291IHpvYnJhemVueSBsaW1pdHkgcmVhbGl6w6F0b3LFryovXHJcbiAgICAgICAgcHJpdmF0ZSBsaW1pdFJlYWxWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlICRncmlkUHJpcGFkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWREb2tsYWR5OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRMaW1pdFJlYWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayBwb3ZvbGVuw60gZWRpdGFjZSBrdXJ6dSAqL1xyXG4gICAgICAgIHByaXZhdGUga3VyekVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayBwb3ZvbGVuw60gZWRpdGFjZSDEjcOhc3RreSAqL1xyXG4gICAgICAgIHByaXZhdGUgY19tZW5hRW5hYmxlZDogYm9vbGVhbjtcclxuICAgICAgICAvKiogQWt0dcOhbG7EmyBuYcSNdGVuw6kgc2VydmljZSBwZXJtaXNzaW9ucyBwcm8gbGltaXR5IHJlYWxpesOhdG9yxa8gKi9cclxuICAgICAgICBwcml2YXRlIHNlclBlcm1MaW1pdFJlYWw6IEludGVyZmFjZS5HU21sdmxyclNlcnZpY2VQZXJtaXNzaW9ucztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAvL1Z5dHZvxZllbsOtIHRhYnVsw6F0b3J1IFDFmcOtcGFkXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFiUHJpcGFkKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vdnl0dm/FmWVuw60gdGFidSBkb2tsYWTFryBwxZnDrXBhZHUgc2Ugc291aHJubsO9bSBncmlkZW1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVUYWJEb2tsYWR5KHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vVnl0dm/FmWVuw60gdGFidSBsaW1pdHkgcmVhbGl6w6F0b3LFr1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW1pdFJlYWxWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhYkxpbWl0UmVhbCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60qL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXRBa3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZXBvY2V0QWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzIwXCIsIC8vUkMgMzM2MDAzMjAgOiBQcm8gYWt0dcOhbG7DrSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC4kZ3JpZERva2xhZHkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnByZXBvY2V0KHJvdywgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcmVwb2NldEFrdEFOYXNsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmVwb2NldEFrdEFOYXNsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzIxXCIsIC8vUkMgMzM2MDAzMjEgOiBQcm8gYWt0dcOhbG7DrSBhIG7DoXNsZWR1asOtY8OtIG9iZG9iw61cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LiRncmlkRG9rbGFkeS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQucHJlcG9jZXQocm93LCAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdExpbWl0UmVhbE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TGltaXRSZWFsTm92eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuaXNsLlNtbEZpblJvenBpc0xpbWl0UmVhbC5jcmVhdGVOZXdEZWZhdWx0RHRvKHsgaXhwOiB0aGF0LnNtbHBpZC5peHAhIH0pLmdldERhdGEoKS5kb25lKChuZXdEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXRhUm93cyA9IHRoYXQuJGdyaWRMaW1pdFJlYWwuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldFJvd3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YVJvd3MubGVuZ3RoID4gMCAmJiBtZXRhUm93c1ttZXRhUm93cy5sZW5ndGggLSAxXS5faXNWaXJ0dWFsKSB7IC8vJCh0aGF0LiRncmlkKS5maW5kKFwiLmdyb3VwXCIpLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkTGltaXRSZWFsLmdncmlkcm93ZWRpdG9yKFwiaW5zZXJ0Um93XCIsIG1ldGFSb3dzLmxlbmd0aCAtIDEsIG5ld0R0byk7IC8vX2lzVmlydHVhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkTGltaXRSZWFsLmdncmlkcm93ZWRpdG9yKFwiYWRkUm93XCIsIG5ld0R0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0TGltaXRSZWFsU3Rvcm5vdmF0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TdG9ybm92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TGltaXRSZWFsU3Rvcm5vdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC4kZ3JpZExpbWl0UmVhbC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuaXNsLlNtbEZpblJvenBpc0xpbWl0UmVhbC5kZWxldGUocm93KS5nZXREYXRhKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkTGltaXRSZWFsLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSB0YWJ1IFDFmcOtcGFkXHJcbiAgICAgICAgICogQHBhcmFtIHRhYkZpbmFuY292YW5pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVUYWJQcmlwYWQodGFiRmluYW5jb3Zhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJQcmlwYWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiRmluYW5jb3ZhbmkpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiUm96cGlzUHJpcGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDMyMlwiLCAvL1JDIDMzNjAwMzIyIDogUMWZw61wYWRcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9sb2FkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRncmlkUHJpcGFkID0gJC5uZXdEaXYoKS5hcHBlbmRUbygkdGFiUHJpcGFkKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3pwaXNQcmlwYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZVByaXBhZEdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlNtbEZpblJvenBpc1ByaXBhZC5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLnNtbHBpZC5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogeyBvOiBcIj5cIiwgdjogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc21sX3N0YXY6IHsgbzogXCI8XCIsIHY6IEludGVyZmFjZS5TdGF2RG9rbGFkdS5uZ19zdGF2U3Rvcm5vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiaXhwXCIsIFwicm9rXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wicm9rXCJdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIGdyaWRmb3Jtw6F0dSBwcm8gcMWZw61wYWRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUHJpcGFkR3JpZEZvcm1hdCgpOiBEYXRhLkdyaWRGb3JtYXQ8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb2soKVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyM1wiICsgdGhpcy5zbWxwaWQubWVuYV96a3IsIC8vUkMgMzM2MDAzMjMgOiDEjMOhc3RrYSBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyNFwiLCAvL1JDIDMzNjAwMzI0IDogxIzDoXN0a2EgQ1pLXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzI1XCIsIC8vUkMgMzM2MDAzMjUgOiBQb2xvxb5reSBGUCBDWktcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wb2xfdnlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzI2XCIsIC8vUkMgMzM2MDAzMjYgOiBWw71kYWplIENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BvbF9wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjdcIiwgLy9SQyAzMzYwMDMyNyA6IFDFmcOtam15IENaS1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIHRhYnUgZG9rbGFkeSBwxZnDrXBhZHUgb2JzYWh1asOtY8OtIHNvdWhybm7DvSBncmlkIHMgZG9rbGFkeSBwxZnDrXBhZHVcclxuICAgICAgICAgKiBAcGFyYW0gdGFiRmluYW5jb3ZhbmlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVRhYkRva2xhZHkodGFiRmluYW5jb3Zhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJEb2tsYWR5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYkZpbmFuY292YW5pKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYlJvenBpc0Rva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMzI4XCIsIC8vUkMgMzM2MDAzMjggOiBEb2tsYWR5IHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvbG9hZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIiwgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzI5XCIsIC8vUkMgMzM2MDAzMjkgOiBQxZllcG/EjWV0IMSNw6FzdGt5IGRsZSByb8SNbsOtaG8gc3lzdMOpbW92w6lobyBrdXJ6dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFByZXBvY2V0QWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFByZXBvY2V0QWt0QU5hc2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRncmlkRG9rbGFkeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiRG9rbGFkeSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm96cGlzRG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlRG9rbGFkR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuU21sRmluUm96cGlzRG9rbGFkLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoaXMuZG9rbGFkeUxpc3QubWFwKGEgPT4gYS5peHApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB7IG86IFwiPlwiLCB2OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxfc3RhdjogeyBvOiBcIjxcIiwgdjogSW50ZXJmYWNlLlN0YXZEb2tsYWR1Lm5nX3N0YXZTdG9ybm8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIiwgXCJyb2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25GcmFnbWVudHM6IG5ldyBHb3JkaWMuRGF0YS5GcmFnbWVudE1hbmFnZXIoW1wiUGVybWlzc2lvbnMuKlwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiBcImFjX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjX3NtbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFN0YXRlOiAobWV0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5hY19zbWwgPT0gdGhpcy5zbWxwaWQuYWNfc21sKSB7IHJldHVybiBcIm9wZW5cIiB9IGVsc2UgeyByZXR1cm4gXCJjbG9zZWRcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FwdGlvblRleHQ6IChtZXRhKSA9PiB7IHJldHVybiBtZXRhLmRhdGEuOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJhY19zbWwscm9rLGt1cnosbSxjX21lbmEsYyxjX3BvbCxjX3BvbF92eWQsY19wb2xfcHJpLGNfbWVuYV9wcmksY19wcmlcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUJlZm9yZUNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgZWRpdHVqZSwgbmVqc291IHBvdm9sZW55IHptxJtueSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy4kZ3JpZERva2xhZHk/LmZpbmQoXCIucm93LmVkaXRpbmdcIik/Lmxlbmd0aCA/PyAwKSA8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVwb2NldEFrdEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXBvY2V0QWt0QU5hc2xFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgbmEgbm9ybcOhbG7DrSDFmcOhZGVrIGEgbmVlZGl0YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKG9iai5jb3VudCA9PSAwIHx8ICh0aGlzLiRncmlkRG9rbGFkeT8uZmluZChcIi5yb3cuZWRpdGluZ1wiKT8ubGVuZ3RoID8/IDEpID4gMCB8fCBvYmouY291bnQgPT0gMSAmJiBvYmouZ2V0U2VsZWN0aW9uKGZhbHNlLCBmYWxzZSkubGVuZ3RoID09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHRvID0gb2JqLmdldFNlbGVjdGlvbigpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFrdHVhbG5pRG9rbGFkID0gb2JqLmdldFNlbGVjdGlvbigpWzBdLml4cCA9PSB0aGlzLnNtbHBpZC5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwb2NldEFrdEVuYWJsZWQgPSBha3R1YWxuaURva2xhZCAmJiBkdG8uUGVybWlzc2lvbnMuTHplUHJlcG9jZXRBa3QudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwb2NldEFrdEFOYXNsRW5hYmxlZCA9IGFrdHVhbG5pRG9rbGFkICYmIGR0by5QZXJtaXNzaW9ucy5MemVQcmVwb2NldEFrdEFOYXNsLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmVwb2NldEFrdD8uZW5hYmxlZChwcmVwb2NldEFrdEVuYWJsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UHJlcG9jZXRBa3RBTmFzbD8uZW5hYmxlZChwcmVwb2NldEFrdEFOYXNsRW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRyb3dlZGl0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93Q29weTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTdGFydDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgcG92b2xlbsOtIGVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zcHXFoXTEm27DrSBkZWxlZ8OhdGEgcHJvIHDFmcOtcGFkbsOpIHpha8OhemFuw60gZWRpdGFjZSBkb2tsYWRlbSAobmFwxZkuIG5ldWxvxb5lbsOhIMSNw6FzdGthLCBkb2JhIGZpbmFuY292w6Fuw60sIC4uLilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNSb3pwaXNFZGl0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZERva2xhZHkuZ2NvdmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUm96cGlzRWRpdGFibGUoKS50aGVuKChjYW5FZGl0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5FZGl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWREb2tsYWR5Lmdncmlkcm93ZWRpdG9yKFwiY2FuY2VsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuJGdyaWREb2tsYWR5Lmdjb3ZlcihcImRlc3Ryb3lcIik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcG91emUgYWt0dcOhbG7DrSBkb2tsYWQgYSBwZXJtaXNzaW9uIHBybyBlZGl0YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNlbGxJbmZvLmRhdGEuaXhwICE9IHRoaXMuc21scGlkLml4cCB8fCAhKGluZm8/LmNlbGxJbmZvPy5kYXRhPy5QZXJtaXNzaW9ucz8uTHplRWRpdG92YXQ/LnZhbHVlID8/IHRydWUpKSB7IGV2LnByZXZlbnREZWZhdWx0KCk7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wb3ZvbGVuw60ga3VyenUgdSBjaXrDrSBtxJtueSBhIHR5cHUga3VyenUgcm/EjW7DrSBzbWx1dm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmt1cnpFbmFibGVkID0gdGhpcy5zbWxwaWQubWVuYSAhPSBJbnRlcmZhY2UuVHlwTWVueS5uZ19tZW5hQ1pLICYmIHRoaXMuc21scGlkLnR5cF9rdXJ6ID09IEludGVyZmFjZS5UeXBLdXJ6dS5uZ190eXBrdXJ6Um9rU21sO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzM0My4xIDI0LjA0LjAyIC0gcHJvIHJva3kgdnnFocWhw60gbmXFviBqZSBha3R1w6FsbsOtIG5lcG92b2zDrW0gYWt0dWFsaXphY2kgbcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8zNDcuMSAwMS4wOC4wMyAtIHDFmWVzdW5lbSBkZWZpbmljZSBCw5ogbmEgcG9sb8W+a3kgbmVuw60gZMWvdm9kIHphbWV6aXQgemFkw6Fuw60gcm96cGlzdSBpIG5hIGRhbMWhw60gcm9reSAtIHByb3RvIGplIHphZMOhbsOtIHV2b2xuxJtub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzM0Ny4zIDA1LjA4LjAzIC0gcMWZw61zdHVwIMWZw616ZW4gdHlwZW0gY2VueSAtIHBvdXplIHBybyBUeXAgY2VueSA9IFBldm5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vT1JcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8zNTIuMTEgMzAuMTEuMDQgIC0gcHJvIHZvbG5vdSBjZW51IGplIHV2b2xuxJtuIHDFmcOtc3R1cCBuYSDEjcOhc3RrdSBkbyBvYmRvYsOtLCB2ZSBrdGVyw6ltIG5lbsOtIHphZMOhbmEgcG9sb8W+a2EgYSB6w6Fyb3ZlxYggamUgcm9rIHbEm3TFocOtIG5lxb4gYWt0dcOhbG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNfbWVuYUVuYWJsZWQgPSB0aGlzLnNtbHBpZC50eXBfY2VueSA9PSBJbnRlcmZhY2UuVHlwQ2VueS5uZ190eXBjZW55UGV2bmEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnNtbHBpZC50eXBfY2VueSA9PSBJbnRlcmZhY2UuVHlwQ2VueS5uZ190eXBjZW55Vm9sbmEgJiYgKHRoaXMuc21scGlkLm1heF9yb2tfcG9sID8/IDApIDwgaW5mby5jZWxsSW5mby5kYXRhLnJvayAmJiBpbmZvLmNlbGxJbmZvLmRhdGEucm9rID4gdGhpcy5yb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5rdXJ6RW5hYmxlZCAmJiAhdGhpcy5jX21lbmFFbmFibGVkKSB7IGV2LnByZXZlbnREZWZhdWx0KCk7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmVwb2NldEFrdD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmVwb2NldEFrdEFOYXNsPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmU6IChkYXRhLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgc2F2ZUR0bzogSW50ZXJmYWNlLkdTbWxkcm9rRHRvID0geyAuLi5vYmouY2VsbEluZm8uZGF0YSwgLi4uZGF0YSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93RHRvID0gb2JqLmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxGaW5Sb3pwaXNEb2tsYWQudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogcm93RHRvLml4cCwgcm9rOiByb3dEdG8ucm9rLCBrdXJ6OiAodGhpcy5rdXJ6RW5hYmxlZCkgPyBkYXRhLmt1cnogOiByb3dEdG8ua3VyeixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfbWVuYTogKHRoaXMuY19tZW5hRW5hYmxlZCkgPyBkYXRhLmNfbWVuYSA6IHJvd0R0by5jX21lbmEsIGRhdF96bWVuYTogcm93RHRvLmRhdF96bWVuYSwgc2RhdF96bWVuYTogdGhpcy5zbWxwaWQuZGF0X3ptZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldERhdGEoKS5kb25lKChuZXdEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy4kZ3JpZERva2xhZHkuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuJGdyaWRQcmlwYWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInJvenBpc2NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKHhociwgdHlwZSwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidmFsaWRhdGlvblwiICYmIHRoaXMuJGdyaWREb2tsYWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkRG9rbGFkeS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmdncmlkZWtvKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHN1bW1hcnlSb3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBbXCJjX21lbmFcIiwgXCJjXCIsIFwiY19wb2xcIiwgXCJjX3BvbF92eWRcIiwgXCJjX3BvbF9wcmlcIiwgXCJjX21lbmFfcHJpXCIsIFwiY19wcmlcIl1cclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgcHJvIGRva2xhZFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVEb2tsYWRHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxhbnk+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBjX21lbmFfZXJyb3IgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJJZGVudGlmaWvDoXRvclwiXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMzBcIiwgLy9SQyAzMzYwMDMzMCA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMzFcIiwgLy9SQyAzMzYwMDMzMSA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAgLy9rdsWvbGkgc2Vza3VwZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdXJ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzMyXCIsIC8vUkMgMzM2MDAzMzIgOiBLdXJ6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIm51bWJlcihDMylcIixcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGVQcmVzZXQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rdXJ6RW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt1cnpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBuZXcgRGVjaW1hbCgxLjAwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjX21lbmEgPSBwYXJzZURlY2ltYWwoKHRoYXQuY19tZW5hRW5hYmxlZCkgPyB0aGF0LiRncmlkRG9rbGFkeS5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdmaWVsZChcImdldFZhbHVlXCIpIDogaW5mby5jZWxsSW5mby5kYXRhLmNfbWVuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkeS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjX21lbmEudGltZXMocGFyc2VEZWNpbWFsKGN0eC52YWx1ZSkpLmRpdmlkZWRCeShwYXJzZURlY2ltYWwoaW5mby5jZWxsSW5mby5kYXRhLm0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMzM1wiLCAvL1JDIDMzNjAwMzMzIDogTW5vxb5zdHbDrVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJudW1iZXIoQzMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlUHJlc2V0OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyM1wiICsgdGhpcy5zbWxwaWQubWVuYV96a3IsIC8vUkMgMzM2MDAzMjMgOiDEjMOhc3RrYSBcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmNfbWVuYUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBuZXcgRGVjaW1hbCgwLjAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGt1cnogPSBwYXJzZURlY2ltYWwoKHRoYXQua3VyekVuYWJsZWQpID8gdGhhdC4kZ3JpZERva2xhZHkuZmluZEZpZWxkcyhcImt1cnpcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgOiBpbmZvLmNlbGxJbmZvLmRhdGEua3Vyeik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkeS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBwYXJzZURlY2ltYWwoY3R4LnZhbHVlKS50aW1lcyhrdXJ6KS5kaXZpZGVkQnkocGFyc2VEZWNpbWFsKGluZm8uY2VsbEluZm8uZGF0YS5tKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWVzc2FnZTogKHZhbCkgPT4geyByZXR1cm4gY19tZW5hX2Vycm9yOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzU4LjIwIDAxLjAyLjA4IC0gbmVqcHJ2ZSBwcm92ZWR1IGtvbnRyb2x1IHbFr8SNaSBkb2tsYWR1IGEgdGVwcnZlIHBvdMOpIHbDvXNsZWRlayBwb3Jvdm7DoW0gdsWvxI1pIHDFmcOtcGFkdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY19tZW5hID0gcGFyc2VEZWNpbWFsKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90ZXN0IG5hIHrDoXBvcm5vdSDEjcOhc3RrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzU4LjIwIDA3LjAyLjA4IHJvemxpxaFlbnkgenDFr3NvYnUgZGVmaW5pY2UgY2VueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnNtbHBpZC56cF9kZWZfY2VueSA9PSBJbnRlcmZhY2UuWnB1c29iRGVmaW5pY2VDZW55Lm5nX3pwZGVmY2VueUFicyAmJiBjX21lbmEubGVzc1RoYW4oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19tZW5hX2Vycm9yID0gXCJqcmVzOjMzNjAwMzM2XCI7IC8vUkMgMzM2MDAzMzYgOiBIb2Rub3RhIG5lc23DrSBiw710IHrDoXBvcm7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8zNTguMjAgMDcuMDIuMDggcG9rdWQgamUgcMWZw61yxa9zdGtvdsO9IHJlxb5pbSwgcGFrIG11c8OtIGLDvXQgem5hbcOpbmtvIHNob2Ruw6kgc2Ugem5hbcOpbmtlbSBjZWxrb3bDqSBjZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgKCBsX2NfbWVuYSA+IDAgYW5kIGNfbWVuYSA8IDAgKSBvciAoIGxfY19tZW5hIDwgMCBhbmQgY19tZW5hID4gMCApIC0tIGxfY19tZW5hIGplIHByYWNvdm7DrSBob2Rub3RhIGNlbGtvdsOpIMSNw6FzdGt5IC0gdWTEm2zDoW0gemF0w61tIHN0YXRpY2t5IHogZHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGFyc2VEZWNpbWFsKHRoYXQuc21scGlkLmNfbWVuYSEpLmdyZWF0ZXJUaGFuKDApICYmIGNfbWVuYS5sZXNzVGhhbigwKSkgfHwgKHBhcnNlRGVjaW1hbCh0aGF0LnNtbHBpZC5jX21lbmEhKS5sZXNzVGhhbigwKSAmJiBjX21lbmEuZ3JlYXRlclRoYW4oMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX21lbmFfZXJyb3IgPSBcImpyZXM6MzM2MDAzMzdcIjsgLy9SQyAzMzYwMDMzNyA6IFpuYW3DqW5rbyBob2Rub3R5IHJvenBpc3UgbXVzw60gYsO9dCBzaG9kbsOpIHNlIHpuYW3DqW5rZW0gY2Vsa292w6kgY2VueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUG96bjogVG90byBtdXPDrW0ga29udHJvbG92YXQgYcW+IG5hIHNlcnZlcnUsIHByb3Rvxb5lIHNpIHBvdMWZZWJ1amkgbmHEjcOtc3Qgc21scm9rIHBybyByb2sgesOhem5hbXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vMzQzLjEgMjYuMDQuMDIgLSBrb250cm9sYSB2xa/EjWkgY2Vsa292w6kgxI3DoXN0Y2UgdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vY2Vsa292w6EgxI3DoXN0a2Egc21sb3V2eSB2IG3Em27EmyA+PSBjZWxrb3bDoSDEjcOhc3RrYSBkb3Bvc3VkIHJvemVwc2Fuw6EgemEgcm9reSArIG5vdsOhIGNlbmEgLSBwxa92b2Ruw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vMzUyLjExIDAxLjEyLjA0IC0gcG96b3IgLSAgcMWZw61wYWTEmywgxb5lIGplICB2b2xuw6EgY2VuYSBhIHJvayBqZSB2ecWhxaHDrSBuZcW+IGFrdHXDoWxuw60gYSBtYXhpbcOhbG7DrSBzZSB6YWRhbm91IHBvbG/FvmtvdSwgbmVidWRlIHByb2LDrWhhdCB0YXRvIGtvbnRyb2xhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5zbWxwaWQudHlwX2NlbnkgPT0gSW50ZXJmYWNlLlR5cENlbnkubmdfdHlwY2VueVZvbG5hICYmICh0aGF0LnNtbHBpZC5tYXhfcm9rX3BvbCA/PyAwKSA8IGluZm8uY2VsbEluZm8uZGF0YS5yb2sgJiYgaW5mby5jZWxsSW5mby5kYXRhLnJvayA+IHRoYXQucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9uZWtvbnRyb2x1amkgLS0tIHJhZMWhaSB6YXTDrW0gbmVjaMOhbSB0dXRvIHpieXRlxI1ub3Uga29uc3RydWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLzM2MC40IDIzLjEwLjA4IHBvdcW+aWp1IGFic29sdXRuw60gaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChwYXJzZURlY2ltYWwodGhhdC5zbWxwaWQuY19tZW5hISkuYWJzKCkubGVzc1RoYW4oKHBhcnNlRGVjaW1hbCh0aGF0LnNtbHBpZC5jX21lbmFfcm9rX3N1bSA/PyAwKS5hYnMoKS5wbHVzKGNfbWVuYS5hYnMoKSkubWludXMocGFyc2VEZWNpbWFsKHRoYXQuc21scGlkLnNtbHJvaz8uY19tZW5hISkuYWJzKCkpKSkpIHsgLy9UT0RPOiBjX21lbmFfcm9rX3N1bSBzZSBuZW5hxI3DrXTDoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3DFmcOtbGnFoSB2eXNva8OhIMSNw6FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vMzQ0LjUgMTAuNS4wMiAtIHpvYnJhesOtbSBza3V0ZcSNbsSbIHZvbG7DqSBwcm9zdMWZZWRreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBsZXQgbF9mcmVlID0gcGFyc2VEZWNpbWFsKHRoYXQuc21scGlkLmNfbWVuYSEpLmFicygpLm1pbnVzKChwYXJzZURlY2ltYWwodGhhdC5zbWxwaWQuY19tZW5hX3Jva19zdW0gPz8gMCkuYWJzKCkucGx1cyhjX21lbmEuYWJzKCkpLm1pbnVzKHBhcnNlRGVjaW1hbCh0aGF0LnNtbHBpZC5zbWxyb2s/LmNfbWVuYSEpLmFicygpKSkpOyAvL1RPRE86IGNfbWVuYV9yb2tfc3VtIHNlIG5lbmHEjcOtdMOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChsX2ZyZWUubGVzc1RoYW4oMCkpIHsgbF9mcmVlID0gbmV3IERlY2ltYWwoMCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY19tZW5hX2Vycm9yID0gXCJqcmVzOjMzNjAwMzM4XCIuZm9ybWF0KGxfZnJlZS50b1N0cmluZygpKTsgLy9SQyAzMzYwMDMzOCA6IFBvxb5hZG92YW7DoSDEjcOhc3RrYSByb3pwaXN1IG5hIHJva3kgcMWZZXZ5xaF1amUgY2Vsa292b3UgxI3DoXN0a3UuIFZvbG7DqSBwcm9zdMWZZWRreTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9udWxvdsOhbsOtIHBvbMOtIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8zNDIuNTEgMTguMTIuMDEgbmlrb2xpdiBudWxvdsOhbsOtLCBhbGUgbmFzdGF2ZW7DrSBwxa92b2Ruw61jaCBob2Rub3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9TZXQgY19tZW5hID0gc21scGlkLmZpbmRvYy5zbWxyb2suY19tZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vU2V0IGMgPSBzbWxwaWQuZmluZG9jLnNtbHJvay5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGVzdCBuYSB6bcSbbnUgY2Vsa292w6kgY2VueSByb3pwaXN1IHYgcm9jZSBwcm90aSBjZW7EmyBwb2xvxb5layB2IHJvY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzM1OC4yMCAwNy4wMi4wOCAtIHBvdcW+aXR5IGFic29sdXRuw60gaG9kbm90eSBrdsWvbGkgbW/Fvm5vc3RpIGRlZmluaWNlIHDFmcOtcsWvc3Rrxa8uIFBvem7DoW1rYSAtIGNfcG9sIG9ic2FodWplIGFrdHXDoWxuw60gc3VtdSBwb2xvxb5layB6YSBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga3VyeiA9IHBhcnNlRGVjaW1hbCgodGhhdC5rdXJ6RW5hYmxlZCkgPyB0aGF0LiRncmlkRG9rbGFkeS5maW5kRmllbGRzKFwia3VyelwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA6IGluZm8uY2VsbEluZm8uZGF0YS5rdXJ6KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGNfbWVuYS50aW1lcyhrdXJ6KS5kaXZpZGVkQnkocGFyc2VEZWNpbWFsKGluZm8uY2VsbEluZm8uZGF0YS5tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMuYWJzKCkubGVzc1RoYW4ocGFyc2VEZWNpbWFsKGluZm8uY2VsbEluZm8uZGF0YS5jX3BvbD8/MCkuYWJzKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfbWVuYV9lcnJvciA9IFwianJlczozMzYwMDMzOVwiOyAvL1JDIDMzNjAwMzM5IDogxIzDoXN0a2EgdiBkYW7DqW0gb2Jkb2LDrSBuZXNtw60ga2xlc25vdXQgcG9kIMO6cm92ZcWIIHBvbG/FvmVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92csOhdGl0IG5hIHDFr3ZvZG7DrSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IG1lbmEgPSBzbWxwaWQuZmluZG9jLnNtbHJvay5tZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGNfbWVuYSA9IHNtbHBpZC5maW5kb2Muc21scm9rLmNfbWVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBjID0gc21scGlkLmZpbmRvYy5zbWxyb2suY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIGRpc3BvbmliaWxpdHkgamUgxZllxaFlbmEgc3Rvcm92a291LCB0YWvFvmUgc2UgYnVkZSBrb250cm9sb3ZhdCBhxb4gbmEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyNFwiLCAvL1JDIDMzNjAwMzI0IDogxIzDoXN0a2EgQ1pLXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5jX21lbmFFbmFibGVkIHx8IHRoYXQua3VyekVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWFydE5hdmlnYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjVcIiwgLy9SQyAzMzYwMDMyNSA6IFBvbG/Fvmt5IEZQIENaS1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BvbF92eWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjZcIiwgLy9SQyAzMzYwMDMyNiA6IFbDvWRhamUgQ1pLXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcG9sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyN1wiLCAvL1JDIDMzNjAwMzI3IDogUMWZw61qbXkgQ1pLXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYV9wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMzRcIiwgLy9SQyAzMzYwMDMzNCA6IMSMw6FzdGthIHphIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcHJpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzM1XCIsIC8vUkMgMzM2MDAzMzUgOiDEjMOhc3RrYSBDWksgemEgcMWZw61wYWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrY2UgcMWZZXBvxI1ldCDEjcOhc3RlayBkbGUgcm/EjW7DrWhvIHN5c3TDqW1vdsOpaG8ga3VyenVcclxuICAgICAgICAgKiBAcGFyYW0gcmV6aW0gcmXFvmltIHDFmWVwb8SNdHU6IDAgPSBwb3V6ZSBwcm8gYWt0dcOhbG7DrSByb2ssIDEgPSBwcm8gYWt0dcOhbG7DrSBhIG7DoXNsZWR1asOtY8OtIHJva3lcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZXBvY2V0KGR0bzogSW50ZXJmYWNlLkdTbWxkcm9rRHRvLCByZXppbTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxGaW5Sb3pwaXNEb2tsYWQucm9rQ1ByZXBvY2V0KHsgaXhwOiBkdG8uaXhwLCByb2s6IGR0by5yb2ssIHJlemltOiByZXppbSB9KS5nZXQoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGdyaWRQcmlwYWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkRG9rbGFkeS5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSB0YWJ1IExpbWl0eSByZWFsaXrDoXRvcsWvXHJcbiAgICAgICAgICogQHBhcmFtIHRhYkZpbmFuY292YW5pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVUYWJMaW1pdFJlYWwodGFiRmluYW5jb3Zhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJMaW1pdFJlYWwgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiRmluYW5jb3ZhbmkpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiUm96cGlzTGltaXRSZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDM0MFwiLCAvL1JDIDMzNjAwMzQwIDogTGltaXR5IHJlYWxpesOhdG9yxa9cclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9sb2FkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RMaW1pdFJlYWxOb3Z5LCBmYXZvcml0ZTogdHJ1ZSB9LCB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdExpbWl0UmVhbFN0b3Jub3ZhdCwgZmF2b3JpdGU6IHRydWUgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyZWFcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZExpbWl0UmVhbCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiTGltaXRSZWFsKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3pwaXNMaW1pdFJlYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUxpbWl0UmVhbEdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlNtbEZpblJvenBpc0xpbWl0UmVhbC5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sX3ByaTogdGhpcy5zbWxwaWQuaXhwX3NtbF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB7IG86IFwiPlwiLCB2OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IHsgbzogXCI8XCIsIHY6IDkwMCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGZyYWdtZW50czogW1wiUGVybWlzc2lvbnMuKlwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoaXMuc21scGlkLml4cCFcclxuICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlc3BvbnNlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJQZXJtTGltaXRSZWFsID0gKGRhdGEuc2VydmljZVBlcm1pc3Npb25zIGFzIEludGVyZmFjZS5HU21sdmxyclNlcnZpY2VQZXJtaXNzaW9ucykgPz8geyBMemVOb3Z5OiB7IHZhbHVlOiBmYWxzZSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBfc21sX3ByaVwiLCBcInJva1wiLCBcImNpc19yZWFsXCIsIFwiaWNvXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzb3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zLipcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIml4cF9zbWxfcHJpLHJvayxjaXNfcmVhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGFrdGl2aXRhICE9IDEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwic3Rhdl90eHQscm9rLGNpc19yZWFsX3R4dCxjX3Jva19yZWFsLGNfcm9rX3JlYWxfcmV6XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVCZWZvcmVDaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIGVkaXR1amUsIG5lanNvdSBwb3ZvbGVueSB6bcSbbnkgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJGdyaWRMaW1pdFJlYWw/LmZpbmQoXCIucm93LmVkaXRpbmdcIik/Lmxlbmd0aCA/PyAwKSA8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgbmEgbm9ybcOhbG7DrSDFmcOhZGVrIGEgbmVlZGl0YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKG9iai5jb3VudCA9PSAwIHx8ICh0aGlzLiRncmlkTGltaXRSZWFsPy5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMSkgPiAwIHx8IG9iai5jb3VudCA9PSAxICYmIG9iai5nZXRTZWxlY3Rpb24oZmFsc2UsIGZhbHNlKS5sZW5ndGggPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdG8gPSBvYmouZ2V0U2VsZWN0aW9uKClbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TGltaXRSZWFsU3Rvcm5vdmF0Py51cGRhdGVQZXJtaXNzaW9uKGR0by5QZXJtaXNzaW9ucy5MemVTdG9ybm92YXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdExpbWl0UmVhbFN0b3Jub3ZhdD8udXBkYXRlUGVybWlzc2lvbih7dmFsdWU6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90bGHEjcOtdGtvIE5vdsO9IG5hc3Rhdm92YXQgcG9rYcW+ZMOpIHBva3VkIG5lbsOtIGVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGlzLiRncmlkTGltaXRSZWFsPy5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMSkgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TGltaXRSZWFsTm92eT8udXBkYXRlUGVybWlzc2lvbih0aGlzLnNlclBlcm1MaW1pdFJlYWwsIFwiTHplTm92eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdncmlkcm93ZWRpdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd0NvcHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlU3RhcnQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIHBvdm9sZW7DrSBlZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGluZm8/LmNlbGxJbmZvPy5kYXRhPy5QZXJtaXNzaW9ucz8uTHplRWRpdG92YXQ/LnZhbHVlID8/IGZhbHNlKSkgeyBldi5wcmV2ZW50RGVmYXVsdCgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvL211c8OtIGRvYsSbaG5vdXQgYWt0dcOhbG7DrSBwcm9taXNlLCBhYnkgenJ1xaFpbGEgc2V0UGVuZGluZyBuYSBha2NpIGEgbW9obCBqc2VtIG5hc3Rhdml0IGVuYWJsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RMaW1pdFJlYWxOb3Z5Py51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TGltaXRSZWFsU3Rvcm5vdmF0Py51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZTogKGRhdGEsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZUR0bzogSW50ZXJmYWNlLkdTbWx2bHJyRHRvID0geyAuLi5vYmouY2VsbEluZm8uZGF0YSwgLi4uZGF0YSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuU21sRmluUm96cGlzTGltaXRSZWFsLnVwc2VydCh7IHJxOiB7ZGF0YTogc2F2ZUR0b30gLCBpeHA6IHRoaXMuc21scGlkLml4cCEgfSkuZ2V0RGF0YSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRncmlkTGltaXRSZWFsLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKCh4aHIsIHR5cGUsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIiAmJiB0aGlzLiRncmlkTGltaXRSZWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkTGltaXRSZWFsLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRpb25zXCIsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkZWtvKHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBbXCJjX3Jva19yZWFsXCIsIFwiY19yb2tfcmVhbF9yZXpcIl1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9EZWZpbmljZSBzbG91cGXEjWvFryBwcm8gZ3JpZCBsaW1pdC4gcmVhbC5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUxpbWl0UmVhbEdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjX3Jva19yZWFsX21zZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQ4XCIsIC8vUkMgMzM2MDAzNDggOiBTdGF2XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM0MVwiLCAvL1JDIDMzNjAwMzQxIDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluZm8uY2VsbEluZm8uZGF0YS5mbGFnX0RCKSB7IC8vcG92b2zDrW0gZWRpdGFjaSBwb3V6ZSB1IG5vdsOpaG8gesOhem5hbXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoYXQucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDM0NVwiLmZvcm1hdCh0aGF0LnNtbHBpZC5wcmlwYWQ/LmZpbl9vZCEsIHRoYXQuc21scGlkLnByaXBhZD8uZmluX2RvISksIC8vUkMgMzM2MDAzNDUgOiBSb2sgbXVzw60gb2Rwb3bDrWRhdCBpbnRlcnZhbHUgZmluYW5jb3bDoW7DrSBwxZnDrXBhZHU6IHswfSAtIHsxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoc3JjKS5nZmllbGQoXCJnZXRFcnJvcnNcIikubGVuZ3RoID4gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsID49ICh0aGF0LnNtbHBpZC5wcmlwYWQ/LmZpbl9vZCA/PyAtMSkgJiYgdmFsIDw9ICh0aGF0LnNtbHBpZC5wcmlwYWQ/LmZpbl9kbyA/PyAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19yZWFsX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM0MlwiLCAvL1JDIDMzNjAwMzQyIDogUmVhbGl6w6F0b3JcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmZvLmNlbGxJbmZvLmRhdGEuZmxhZ19EQikgeyAvL3Bvdm9sw61tIGVkaXRhY2kgcG91emUgdSBub3bDqWhvIHrDoXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1ByZWZhYnMuU2VsZWN0LmNpc1JlYWwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19yZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmNpc19yZWFsPXZhbHVlLmNpc19yZWFsO21vZGVsLml4cF9zbWxfcHJpPT52YWx1ZS5peHNfc21sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfc21sX3ByaTogdGhhdC5zbWxwaWQuaXhwX3NtbF9wcmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3Jva19yZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQzXCIsIC8vUkMgMzM2MDAzNDMgOiBMaW1pdFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluZm8uY2VsbEluZm8uZGF0YS5mbGFnX0RCIHx8IGluZm8uY2VsbEluZm8uZGF0YS5ha3Rpdml0YSA9PSAxMDApIHsgLy9wb3ZvbMOtbSBlZGl0YWNpIHBvdXplIHUgbm92w6lobyBuZWJvIGFrdGl2bsOtaG8gesOhem5hbXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3Jva19yZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogMC4wMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlOiAoKSA9PiB7IHJldHVybiBjX3Jva19yZWFsX21zZzsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNyYykuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDApIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFyc2VEZWNpbWFsKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGVzdCBuYSB6w6Fwb3Jub3UgxI3DoXN0a3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlc3NUaGFuKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3Jva19yZWFsX21zZyA9IFwianJlczozMzYwMDM0NlwiOyAvL1JDIDMzNjAwMzQ2IDogSG9kbm90YSBuZXNtw60gYsO9dCB6w6Fwb3Juw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rlc3QgbmEgem3Em251IGxpbWl0dSB2xa/EjWkgcmV6ZXJ2YWPDrW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNfcm9rX3JlYWxfcmV6ID0gcGFyc2VEZWNpbWFsKGluZm8uY2VsbEluZm8uZGF0YS5jX3Jva19yZWFsX3Jleik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjX3Jva19yZWFsX3Jlei5ncmVhdGVyVGhhbigwKSAmJiB2YWx1ZS5sZXNzVGhhbihjX3Jva19yZWFsX3JleikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfcm9rX3JlYWxfbXNnID0gXCJqcmVzOjMzNjAwMzQ3XCI7IC8vUkMgMzM2MDAzNDcgOiDEjMOhc3RrYSBuZXNtw60ga2xlc25vdXQgcG9kIMO6cm92ZcWIIHJlemVydm92YW7DvWNoIHByb3N0xZllZGvFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGFsxaHDrSBrb250cm9sYSBhxb4gbmEgc2VydmVydSBwb21vY8OtIHN0b3Jvdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yb2tfcmVhbF9yZXpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNDRcIiwgLy9SQyAzMzYwMDM0NCA6IENlbGtlbSBuYXbDoXrDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vdW52aXNpYmxlXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfc21sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiaXhwX3NtbF9wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGdmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==