"use strict";
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            //// model pro predani
            //export interface IGPredatModel {
            //    duvod: string | null | undefined,
            //    ixs_fun_akt: string | null,
            //    ixs_fun_vyriz: string | null,
            //    ixs_su: string | null,
            //    ixs_ref: string | null,
            //    cis_real: string | null,
            ;
            /**
             * Otevreni detailu noveho dokladu - nova verze s oddelenim dokladu od dokumentu
             * @param content
             * @param podaniDto
             */
            function NovyDoklad(content, podaniDto) {
                // smazani flashe
                if (typeof Gordic.Uct.WebClient.Detail?.flashResult !== "undefined") {
                    content.hideFlash(Gordic.Uct.WebClient.Detail.flashResult);
                    content.hideFlash(Gordic.Uct.WebClient.Detail.flashResultZauct);
                }
                // TODO: bude jina metoda pro novy doklad
                return content.isl.UctDoklad.newDoklad()
                    .get()
                    .then(function () {
                    // vse ok, zobraz doklad                
                    ZobrazDetailDleIXP({ content: content, ixp: null, newMode: true, editace: true });
                    return;
                })
                    .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                    content: content, erroObject: objError,
                    repeat: (returnValue) => {
                        // nutne opakovani
                        podaniDto.Nastaveni = returnValue.Nastaveni;
                        return NovyDoklad(content, podaniDto);
                    },
                }))
                    .always(function () {
                    content.endOperation();
                });
            }
            WebClient.NovyDoklad = NovyDoklad;
            /**
            *  Podani dokladu
            * @param {GContent} content
            */
            function PodaniDokladu(content, podaniDto) {
                // smazani flashe
                if (typeof Gordic.Uct.WebClient.Detail?.flashResult !== "undefined") {
                    content.hideFlash(Gordic.Uct.WebClient.Detail.flashResult);
                    content.hideFlash(Gordic.Uct.WebClient.Detail.flashResultZauct);
                }
                let povolitGenerovani = content.Globals.Params?.PovolitGenerovaniPiduDokladu;
                if (typeof podaniDto === "undefined" || podaniDto === null) {
                    content.beginOperation("jres:30250346"); //RC 30250346 : Probíhá podání dokladu
                    podaniDto = {
                        IdMessage: "", SejmutiPidu: Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(content, povolitGenerovani ? "ano" : "ne" /*"Global.Uct.AppSettings"*/) === "1"
                        //content!.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.RezimZadavaniPidu") === "0"
                    };
                }
                return content.isl.UctDoklad.create(podaniDto)
                    .get()
                    .then(function (result) {
                    // vse ok, zobraz doklad                
                    ZobrazDetailDleIXP({ content: content, ixp: result.data.PidDokladu, samostaneOkno: false, editace: result.data.LzeSDoklademPracovat, polozky: false });
                    //ZobrazDetailDleIXPOld(content, result.data.PidDokladu as string, false, result.data.LzeSDoklademPracovat as boolean);
                    //content.endOperation();
                    return result;
                })
                    .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                    content: content, erroObject: objError,
                    repeat: (returnValue) => {
                        // nutne opakovani
                        podaniDto.Nastaveni = returnValue.Nastaveni;
                        return PodaniDokladu(content, podaniDto);
                    },
                    userMessage: (returnValue) => {
                        return ZobrazVyberPidu(content)
                            .then(function (parametrX) {
                            podaniDto.PidDokladu = parametrX.PidDokladu;
                            podaniDto.Nastaveni = returnValue.Nastaveni;
                            return PodaniDokladu(content, podaniDto);
                        })
                            .catch(function () { content.endOperation(); throw GError; });
                    }
                }))
                    .always(function () {
                    content.endOperation();
                });
            }
            WebClient.PodaniDokladu = PodaniDokladu;
            /***
            * Nacteni parametru zadanych uzivatelem
            * */
            function HromadnaOperaceGetParam(/*action: Gordic.Uct.Interface.GEUctHromadneOperace,*/ dialogs, wiz, vybraneDoklady) {
                const that = wiz;
                //var def = $.Deferred();
                let form = that.findForms("wizParams");
                const ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den;
                const { ixs_fun: ixs_fun_akt, ixs_ref } = form.findFields("ixs_fun_akt").gfield("getValue") ?? {};
                const duvod = form.findFields("duvod").gfield("getValue");
                if (!ixp_den || !ixs_fun_akt /*typeof ixp_den === "undefined" || ixp_den === null || typeof ixs_fun_akt === "undefined" || ixs_fun_akt === null*/) {
                    return dialogs.warning("jres:30250775") //RC 30250775 : Není vyplněn cíl předání
                        .createDialogPromise(false);
                }
                if ( /*typeof vybraneDoklady === "undefined" || vybraneDoklady == null*/!vybraneDoklady || vybraneDoklady.length === 0) {
                    return dialogs.alert("jres:30250774") //RC 30250774 : Nebyly vybrány žádné doklady
                        .createDialogPromise(false);
                }
                let result = {
                    Seznam: vybraneDoklady,
                    IxpDenNew: ixp_den,
                    IxsFunNew: ixs_fun_akt,
                    IxsRefNew: ixs_ref,
                    Duvod: duvod,
                    //CisReal
                };
                return $.when(result);
                //return result;
            }
            WebClient.HromadnaOperaceGetParam = HromadnaOperaceGetParam;
            /**
             * Preevidovat formular
             * @param content
             */
            function HromadnaOperaceform(action, content, ixp_den) {
                let rok = content.Globals.EkoParams?.Rok;
                //let ixsFunAkt = ($.content("main") as any).IxsFunAkt;
                let FiltryKompetent = {
                    aktivita: 100, // aktivní kompetenti
                    priz_kom: 10, // musí být příznak kompetenta 
                    ico: content.Globals.EkoParams?.ICO,
                    uus: (content.Globals.Params?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.Globals.EkoParams?.UUS : null),
                    ucs: (content.Globals.Params?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.Globals.EkoParams?.UCS : null),
                    cis_real: (content.Globals.Params?.RezimProvozu == 3 /* Gordic.Uct.Interface.RezimProvozuEnum.realizator */ ? content.Globals.EkoParams?.UUS : null)
                };
                switch (action) {
                    case 1 /* Gordic.Uct.Interface.GEUctHromadneOperace.Preevidence */:
                        return Gordic.Eko.Prefabs.PreevidenceDokladuForm({
                            KompetentViditelnost: true,
                            KompetentZmena: content.Globals.Params?.PovoleniZmenitKompetenta,
                            StartFiltrKompetent: FiltryKompetent,
                            ZpracovatelAktualni: $.content("main").IxsFunAkt,
                            StartFiltrKniha: {
                                typ_ag: 40,
                                //ktg_den: ktgDen,
                                ico: content.Globals.EkoParams?.ICO,
                                ucs: content.Globals.EkoParams?.UCS,
                                rok: rok,
                                aktivita: 100,
                                ixp_den: "!= " + ixp_den
                            },
                            StartFiltrZpracovatel: {
                                //DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                                ReferentAktivita: 100,
                                VrfuTypAg: "uct",
                                VrfuAktivita: 100,
                                VrfuSubrada: content.Globals.EkoParams?.Subrada
                                //ixs_su: ixsSu
                            }
                        });
                    case 7 /* Gordic.Uct.Interface.GEUctHromadneOperace.Predani */:
                        return Gordic.Eko.Prefabs.PredaniDokladuForm({
                            KompetentViditelnost: true,
                            KompetentZmena: content.Globals.Params?.PovoleniZmenitKompetenta,
                            StartFiltrKompetent: FiltryKompetent,
                            //SouvisejiciViditelnost: true,
                            //SouvisejiciZmena:true ,
                            StartFiltrZpracovatel: {
                                //DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                                DlePovolenychAgend: [40],
                                VrfuTypAg: "uct",
                                VrfuAktivita: 100,
                                VrfuIxpDen: ixp_den,
                                ReferentAktivita: 100,
                                //ixs_su: ixsSu,
                                ico: (content.Globals.Params?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || content.Globals.Params?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.Globals.EkoParams?.ICO : null),
                                VrfuSubrada: content.Globals.EkoParams?.Subrada,
                                //ixs_fun: "!= " + content.UcetniDokladDto.HlavickaDokladu?.ixs_fun_akt
                            }
                        });
                    case 6 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prideleni */:
                        return Gordic.Eko.Prefabs.PrideleniDokladuForm({
                            KompetentViditelnost: false,
                            KompetentZmena: false,
                            StartFiltrZpracovatel: {
                                //DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                                VrfuTypAg: "uct",
                                DlePovolenychAgend: true,
                                VrfuAktivita: 100,
                                ReferentAktivita: 100,
                                VrfuIxpDen: ixp_den,
                                //ixs_su: ixsSu,
                                ico: (content.Globals.Params?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || content.Globals.Params?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.Globals.EkoParams?.ICO : null),
                                VrfuSubrada: content.Globals.EkoParams?.Subrada,
                                //ixs_fun: "!= " + ixsFunAkt
                                //ixs_fun: "!= " + that.UcetniDokladDto.HlavickaDokladu?.ixs_fun_akt
                            }
                        });
                    case 0 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prevzeti */:
                        return Gordic.Eko.Prefabs.PrevzetiDokladuForm({
                            AktualniPrihlasenyZpracovatel: $.content("main").IxsFunAkt,
                            KompetentZmena: content.Globals.Params?.PovoleniZmenitKompetenta,
                            KompetentViditelnost: true,
                            StartFiltrKompetent: FiltryKompetent,
                        });
                }
                throw new Error("Chybna akce");
            }
            WebClient.HromadnaOperaceform = HromadnaOperaceform;
            /**
             * Rucni zadani pidu (zobrazeni WFL okna)
             * @param content
             * @param parametr
             * @returns
             */
            function ZobrazVyberPidu(content /*, parametr: Gordic.Uct.WebClient.GPodaniDto*/) {
                var def = $.Deferred();
                debugger;
                Gordic.Wfl.Dialogs.GenerovaniIxpDlg(content, {
                    TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                    TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                    DotazPriExistenciVJineAgende: false,
                    HlaseniPriExistenciVAgende: false,
                    ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremGinGenIxp
                }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                    .on("close", function (ev, retValue) {
                    if (typeof retValue == "undefined" || retValue == null /*|| typeof (retValue.values) == "undefined"*/)
                        def.reject();
                    else {
                        var parametr = { PidDokladu: retValue.Ixp, DokladJizExistuje: retValue.IxpExist };
                        //parametr.PidDokladu = retValue.Ixp;
                        def.resolve(parametr);
                    }
                });
                return def.promise();
            }
            WebClient.ZobrazVyberPidu = ZobrazVyberPidu;
            function ZobrazDetailDleIXP(vstup) {
                let { content, newMode, ixp, samostaneOkno, editace, grid, objekt, ixpDen, polozky } = vstup;
                if (typeof editace === "undefined")
                    editace = false;
                if (typeof polozky === "undefined")
                    polozky = false;
                if (!objekt /*typeof objekt === "undefined" || objekt === null*/)
                    objekt = newMode === true ? "Gordic.Uct.WebClient.GUctDetailDokladu" : "Gordic.Uct.WebClient.GUctDetail";
                if (ixp != null || newMode === true) {
                    if (!editace)
                        editace = false;
                    var detail = typeof content["Ixp"] !== "undefined";
                    // vstuni parametr
                    let options = {
                        ixp: ixp,
                        EditaceHlavicky: editace,
                        id: "uctDetailDokladu",
                        uid: "uctDetailDokladu",
                        polozky: polozky
                    };
                    if (samostaneOkno === true) {
                        content.dialogs.showWindow(objekt, options, "", 800, 600, true)
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue === true) {
                                // znovunačtení seznamu (podle aktuálních filtrů)
                                Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                            }
                        });
                    }
                    else {
                        var control;
                        if (typeof grid === "undefined")
                            control = void 0;
                        else
                            control = new Gordic.Components.GridRC(grid);
                        if (detail) {
                            //content.off(".zobrazdleixp");
                            content.load({ Ixp: ixp, EditaceHlavicky: editace, id: "uctDetailDokladu", uid: "uctDetailDokladu" })
                                .done(() => {
                            });
                            return;
                        }
                        let newGpc;
                        if (typeof ixpDen !== "undefined")
                            newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, ixpDen);
                        else
                            newGpc = void 0;
                        content.navigate([objekt, { gpc: newGpc, gridRemoteControl: control }], options /*{ Ixp: ixp, EditaceHlavicky: editace, id: "uctDetailDokladu" }*/)
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                            }
                        })
                            .on('closed', (ev, ctx) => {
                            if (content && content["name"] === "GUctSeznam")
                                content.$grid.ggrid('focus');
                        }); // při zavření detailu se nastaví focus na grid
                        ;
                    }
                }
                else
                    content.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                    "jres:30250033"); //RC 30250033 : Není poslán žádný identifikátor!
            }
            WebClient.ZobrazDetailDleIXP = ZobrazDetailDleIXP;
            /**
             * Zobrazeni okna s detailem dokumentu dle zadaneho pidu
             * @param {GContent} content - kontent
             * @param {string|null} ixp  - pid dokladu
             * @param {boolean} samostaneOkno
             * @param {boolean} editace - rezim editace
             * @param {JQuery<HTMLElement>} grid - objekt seznamoveho gridu
             * @param {string} objekt - nazev objektu detailu
             * @param {string} ixpDen - identifikator knihy
             */
            function ZobrazDetailDleIXPOld(content, ixp, samostaneOkno = false, editace = false, grid = void 0, objekt, ixpDen, polozky = false) {
                if (!objekt /*typeof objekt === "undefined" || objekt === null*/)
                    objekt = "Gordic.Uct.WebClient.GUctDetail";
                if (ixp != null) {
                    if (!editace)
                        editace = false;
                    var detail = typeof content["Ixp"] !== "undefined";
                    // vstuni parametru
                    let options = {
                        ixp: ixp,
                        EditaceHlavicky: editace,
                        id: "uctDetailDokladu",
                        uid: "uctDetailDokladu",
                        polozky: polozky
                    };
                    if (samostaneOkno) {
                        content.dialogs.showWindow(objekt, options, "", 800, 600, true)
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue === true) {
                                // znovunačtení seznamu (podle aktuálních filtrů)
                                Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                            }
                        });
                    }
                    else {
                        var control;
                        if (typeof grid === "undefined")
                            control = void 0;
                        else
                            control = new Gordic.Components.GridRC(grid);
                        if (detail) {
                            //content.off(".zobrazdleixp");
                            content.load({ Ixp: ixp, EditaceHlavicky: editace, id: "uctDetailDokladu", uid: "uctDetailDokladu" })
                                .done(() => {
                                //content.off(".zobrazdleixp");
                                //content.one("contentready.zobrazdleixp", () => {
                                //    Gordic.Uct.WebClient.Detail.AktualizaceFormulare(content as any);
                                //});                            
                                //Gordic.Uct.WebClient.Detail.AktualizaceFormulare(content as any);
                            });
                            return;
                        }
                        let newGpc;
                        if (typeof ixpDen !== "undefined")
                            newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, ixpDen);
                        else
                            newGpc = void 0;
                        content.navigate([objekt, { gpc: newGpc, gridRemoteControl: control }], options /*{ Ixp: ixp, EditaceHlavicky: editace, id: "uctDetailDokladu" }*/)
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                // nacteni aktualizovaneho dokladu
                                //Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(content, res.returnValue.ixp);
                                //let doklad: Interface.GUctSeznamDokladuDto[] = [{ ixp: res.returnValue.ixp }];
                                //Gordic.Uct.WebClient.Seznam.refreshRowsFromDB(content as any, [{ ixp: res.returnValue.ixp }]);
                                // nastaveni aktivniho radku
                                // Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                            }
                        })
                            //.on('contentclosed', (ev, ctx) => { Obsolete
                            .on('closed', (ev, ctx) => {
                            if (content && content["name"] === "GUctSeznam")
                                content.$grid.ggrid('focus');
                        }); // při zavření detailu se nastaví focus na grid
                        ;
                    }
                }
                else
                    content.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                    "jres:30250033"); //RC 30250033 : Není poslán žádný identifikátor!
            }
            WebClient.ZobrazDetailDleIXPOld = ZobrazDetailDleIXPOld;
            /// <summary>   Oznacit doklady prectene(true)/neprectene(false) </summary>
            /// <remarks>   Tvagenknecht, 3.3.2017. </remarks>
            /// <param name="prectene">true - oznacit za prestene </param>
            /// <param name="oznaceneRadky">vybrane radky</param>
            /// <returns>   . </returns>
            function OznacitDoklady(content, prectene, oznaceneRadky) {
                if (!oznaceneRadky || oznaceneRadky.length == 0) {
                    content.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                    "jres:30250334"); //RC 30250334 : Nenalezeny žádné označené řádky
                    return $.Deferred().resolve().promise();
                }
                var that = content;
                let def = $.Deferred();
                that.beginOperation("jres:30250342"); //RC 30250342 : Probíhá označování dokladů
                let rq = {
                    Oznacit: (prectene ? 0 /* Gordic.Uct.Interface.GETypOznaceniDokladu.Precteno */ : 10 /* Gordic.Uct.Interface.GETypOznaceniDokladu.Neprecteno */),
                    Seznam: oznaceneRadky
                };
                return content.isl.UctDoklad.hromadneOznacit(rq)
                    .get()
                    .then(function (returnData) {
                    returnData.forEach(function (radek, indek) {
                        Gordic.Uct.WebClient.Seznam.ReplaceRow(content, radek, true);
                    });
                    return returnData;
                })
                    .always(function () {
                    that.endOperation();
                });
            }
            WebClient.OznacitDoklady = OznacitDoklady;
            /// <summary>
            /// Zobrazeni navazanych dokladu
            /// </summary>
            function VazbyDokladu(content, ucetniDoklad, viewMode) {
                //var that = this; //this = tato akce
                let def = $.Deferred();
                content.beginOperation();
                let loading;
                let oductovano = false;
                let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, ucetniDoklad.ixp_den);
                //this.srv = new GContent("Gordic.Uct.WebClient.GUctDetail");  //sluzba pro pristup k datum na serveru
                //this.srv.call("NacteniAtributuVazby", { pidDokladu: ucetniDoklad.ixp, viewMode: viewMode })
                EKOUtils.CallRemoteService(content, "NacteniAtributuVazby", { head: ucetniDoklad, viewMode: viewMode }, "Gordic.Uct.WebClient.GUctDetail", newGpc)
                    .then(function (vysledek) {
                    let oknoVazeb = content.navigate(["Gordic.Eko.WebClient.GVazby", {
                            openDetail: function (row) {
                                const cnt = this;
                                return $.when().then((t) => {
                                    let def = $.Deferred();
                                    if (!row)
                                        return def.resolve(false);
                                    if (row?.typ_ag_sek === 40) {
                                        cnt?.isl.UctDoklad.getKnihaZDokladu({ ixp: row.ixp_sek })
                                            .get()
                                            .then((ixpDen) => {
                                            if (!ixpDen) {
                                                return def.resolve(false);
                                            }
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(cnt?.gpc, ixpDen);
                                            // let cnt = oknoVazeb[0]["content"] as GContent;
                                            cnt?.navigate(["Gordic.Uct.WebClient.GUctDetail", { gpc: newGpc }], { EditaceHlavicky: false, id: 'uctDetailDokladu', Ixp: row.ixp_sek, IxpDen: ixpDen });
                                            return def.resolve(true);
                                        });
                                    }
                                    else {
                                        //return def.resolve(false);
                                        Gordic.WebApp.Utility.openApp({
                                            ixx1: row.ixp_sek, // id cílového objektu v nově otevírané záložce
                                            typAg: row.typ_ag_sek, // typ agendy cílového objektu (nepovinné)
                                            banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                                            noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné)
                                        }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                                        ).then(() => {
                                            return def.resolve(true);
                                        })
                                            .catch(() => {
                                            return Gordic.Wfl.Dialogs.DetailDokumentuSpisu(cnt, { SimpleMode: false, /*IxpInitProVazbuSouvisejicich: ixp!,*/ DetailDto: { ixp: row.ixp_sek } }, Gordic.Global.Enums.ModOtevreni.auto);
                                        });
                                    }
                                    return def.promise();
                                });
                            }
                        }], {
                        Id: "uct_vazby", InputDto: vysledek
                    });
                    //});
                    oknoVazeb.on("eko_vazby_navazano", function (ev, data) {
                        if (viewMode)
                            return def.resolve();
                        //return Gordic.Uct.WebClient.Detail.refreshDetail.call(content as any, true)
                        //    .then(() => { def.resolve(); });
                        //loading = Gordic.Uct.WebClient.Detail.RefreshDetail(content as Gordic.Uct.WebClient.Detail.GUctDetail);
                        return def.resolve();
                    });
                    oknoVazeb.on("eko_zapisy_oductovat", function (ev, data) {
                        if (viewMode)
                            return;
                        oductovano = true;
                        //Gordic.Uct.WebClient.Detail.RefreshDetail(content as Gordic.Uct.WebClient.Detail.GUctDetail)
                        //NOTE (BM 2025-06-12): loading neni nikde setnuta. Vnitrek ifu se nikdy nespusti.
                        //if (typeof loading !== "undefined") {
                        //    if (loading.state() === "pending")
                        //        loading.then(() => Gordic.Uct.WebClient.Detail.OductovaniZapisu(content as Gordic.Uct.WebClient.Detail.GUctDetail, oknoVazeb, data.zapisy)
                        //        )
                        //        ;
                        //    else
                        //        Gordic.Uct.WebClient.Detail.OductovaniZapisu(content as Gordic.Uct.WebClient.Detail.GUctDetail, oknoVazeb, data.zapisy);
                        //    return;
                        //}
                        Gordic.Uct.WebClient.Detail.OductovaniZapisu(content, oknoVazeb, data.zapisy);
                    });
                    oknoVazeb.on("closed", function (ev, ctx) {
                        // znovunacteni dokladu
                        if (ev.target == oknoVazeb[0] && ctx != null && ctx.hasChanged) {
                            if (!oductovano)
                                //Gordic.Uct.WebClient.Detail.RefreshDetail(content as Gordic.Uct.WebClient.Detail.GUctDetail);
                                return Gordic.Uct.WebClient.Detail.ReloadRecords(content)
                                    .then(() => {
                                    content.endOperation();
                                    def.resolve();
                                });
                        }
                        if (oductovano) {
                            Gordic.Uct.WebClient.Detail.SwitchToRecords(content);
                        }
                        content.endOperation();
                        return def.reject();
                    });
                    return def.promise();
                });
                return def.promise();
            }
            WebClient.VazbyDokladu = VazbyDokladu;
            /**
             * Otevření detailu v primární agendě (v jiné záložce)
             *
             * @param {number | undefined | null} typAg primární agenda
             * @param {string | undefined | null} id1 id detailu v primární agendě (PID a pod.)
             * @param {string | undefined | null} [id2] doplňující id detailu v primární agendě (PID a pod.)
             * @param {string | undefined | null} [id3] další doplňující id detailu v primární agendě (PID a pod.)
            */
            function openDetailInOtherTab(typAg, id1, id2, id3) {
                // TODO: doplnit test na vyjmenované agendy?
                if (typAg != null && id1 != null) {
                    // otevření nové záložky
                    return Gordic.WebApp.Utility.openApp(
                    // parametry
                    {
                        // identifikace
                        ixx1: id1,
                        ixx2: id2,
                        ixx3: id3,
                        // požadovaná agenda (a případně fáze)
                        typAg: typAg,
                        faze: null,
                        // povoleno použít aktuální fázi
                        banCurrentApp: false,
                        // výjimka při nenalezení žádné cílové fáze
                        noAppFail: false
                    }, 
                    // požadovaná metoda
                    "OpenDetail");
                }
                else
                    return $.Deferred().reject().promise();
            }
            WebClient.openDetailInOtherTab = openDetailInOtherTab;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdENvbW1vbkRldGFpbFNlem5hbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVY3RDb21tb25EZXRhaWxTZXpuYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQVUsTUFBTSxDQThwQmY7QUE5cEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThwQm5CO0lBOXBCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOHBCN0I7UUE5cEJvQixXQUFBLFNBQVM7WUFFMUIsc0JBQXNCO1lBQ3RCLGtDQUFrQztZQUNsQyx1Q0FBdUM7WUFDdkMsaUNBQWlDO1lBQ2pDLG1DQUFtQztZQUNuQyw0QkFBNEI7WUFDNUIsNkJBQTZCO1lBQzdCLDhCQUE4QjtZQTRCN0IsQ0FBQztZQUdGOzs7O2VBSUc7WUFDSCxTQUFnQixVQUFVLENBQUMsT0FBaUIsRUFBRyxTQUEyRDtnQkFDdEcsaUJBQWlCO2dCQUNqQixJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsS0FBSyxXQUFXLEVBQUUsQ0FBQztvQkFDbEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzNELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3BFLENBQUM7Z0JBQ0QseUNBQXlDO2dCQUN6QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtxQkFDbkMsR0FBRyxFQUFFO3FCQUNMLElBQUksQ0FBQztvQkFDRix3Q0FBd0M7b0JBQ3hDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUks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Q0FBQztZQWpIZSxzQkFBWSxlQWlIM0IsQ0FBQTtZQUNEOzs7Ozs7O2NBT0U7WUFDRixTQUFnQixvQkFBb0IsQ0FBQyxLQUFnQyxFQUFFLEdBQThCLEVBQUUsR0FBK0IsRUFBRSxHQUErQjtnQkFFbkssNENBQTRDO2dCQUM1QyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUUvQix3QkFBd0I7b0JBQ3hCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTztvQkFDaEMsWUFBWTtvQkFDWjt3QkFDSSxlQUFlO3dCQUNmLElBQUksRUFBRSxHQUFHO3dCQUNULElBQUksRUFBRSxHQUFHO3dCQUNULElBQUksRUFBRSxHQUFHO3dCQUNULHNDQUFzQzt3QkFDdEMsS0FBSyxFQUFFLEtBQUs7d0JBQ1osSUFBSSxFQUFFLElBQUk7d0JBQ1YsZ0NBQWdDO3dCQUNoQyxhQUFhLEVBQUUsS0FBSzt3QkFDcEIsMkNBQTJDO3dCQUMzQyxTQUFTLEVBQUUsS0FBSztxQkFDbkI7b0JBQ0Qsb0JBQW9CO29CQUNwQixZQUFZLENBQ2YsQ0FBQztnQkFDTixDQUFDOztvQkFDSSxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoRCxDQUFDO1lBMUJlLDhCQUFvQix1QkEwQm5DLENBQUE7UUFDTCxDQUFDLEVBOXBCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBOHBCN0I7SUFBRCxDQUFDLEVBOXBCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOHBCbkI7QUFBRCxDQUFDLEVBOXBCUyxNQUFNLEtBQU4sTUFBTSxRQThwQmYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5VY3QuV2ViQ2xpZW50IHtcclxuXHJcbiAgICAvLy8vIG1vZGVsIHBybyBwcmVkYW5pXHJcbiAgICAvL2V4cG9ydCBpbnRlcmZhY2UgSUdQcmVkYXRNb2RlbCB7XHJcbiAgICAvLyAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgIC8vICAgIGl4c19mdW5fYWt0OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgLy8gICAgaXhzX2Z1bl92eXJpejogc3RyaW5nIHwgbnVsbCxcclxuICAgIC8vICAgIGl4c19zdTogc3RyaW5nIHwgbnVsbCxcclxuICAgIC8vICAgIGl4c19yZWY6IHN0cmluZyB8IG51bGwsXHJcbiAgICAvLyAgICBjaXNfcmVhbDogc3RyaW5nIHwgbnVsbCxcclxuXHJcbiAgICAvL307XHJcbiAgICAvLy8vIG1vZGVsIHBybyBwcmV2emV0aVxyXG4gICAgLy9leHBvcnQgaW50ZXJmYWNlIElHUHJldnpldGlNb2RlbCB7XHJcbiAgICAvLyAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgIC8vICAgIGl4c19mdW5fYWt0OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgLy8gICAgaXhzX2Z1bl92eXJpejogc3RyaW5nIHwgbnVsbCxcclxuICAgIC8vICAgIGl4c19yZWY6IHN0cmluZyB8IG51bGwsXHJcbiAgICAvLyAgICBjaXNfcmVhbDogc3RyaW5nIHwgbnVsbCxcclxuXHJcbiAgICAvL307XHJcbiAgICAvLy8vIG1vZGVsIHBybyBwcmlkZWxpdFxyXG4gICAgLy9leHBvcnQgaW50ZXJmYWNlIElHUHJpZGVsaXRNb2RlbCB7XHJcbiAgICAvLyAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgIC8vICAgIGl4c19mdW5fYWt0OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgLy8gICAgaXhzX3N1OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgLy99O1xyXG4gICAgLy8gbW9kZWwgcHJvIHByZWV2aWRlbmNpXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHUHJlZXZpZGVuY2VNb2RlbCB7XHJcbiAgICAgICAgZHV2b2Q6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgaXhwX2Rlbjogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfZnVuX2FrdDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfcmVmOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGNpc19yZWFsOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGl4c19mdW5fdnlyaXo6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX3N1OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIHN1YnJhZGE6IG51bWJlcnxudWxsLFxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPdGV2cmVuaSBkZXRhaWx1IG5vdmVobyBkb2tsYWR1IC0gbm92YSB2ZXJ6ZSBzIG9kZGVsZW5pbSBkb2tsYWR1IG9kIGRva3VtZW50dVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBwb2RhbmlEdG9cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE5vdnlEb2tsYWQoY29udGVudDogR0NvbnRlbnQgLCBwb2RhbmlEdG8/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkUG9kYW5pUmVxdWVzdER0byk6IGFueSB7XHJcbiAgICAgICAgLy8gc21hemFuaSBmbGFzaGVcclxuICAgICAgICBpZiAodHlwZW9mIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbD8uZmxhc2hSZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29udGVudC5oaWRlRmxhc2goR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLmZsYXNoUmVzdWx0KTtcclxuICAgICAgICAgICAgY29udGVudC5oaWRlRmxhc2goR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLmZsYXNoUmVzdWx0WmF1Y3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUT0RPOiBidWRlIGppbmEgbWV0b2RhIHBybyBub3Z5IGRva2xhZFxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWQubmV3RG9rbGFkKClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHZzZSBvaywgem9icmF6IGRva2xhZCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFpvYnJhekRldGFpbERsZUlYUCh7IGNvbnRlbnQ6IGNvbnRlbnQsIGl4cDogbnVsbCwgbmV3TW9kZTp0cnVlLCBlZGl0YWNlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChcclxuICAgICAgICAgICAgICAgIChvYmpFcnJvcjogRXJyb3IpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkV4Y2VwdGlvblByb2Nlc3Npbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG51dG5lIG9wYWtvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9kYW5pRHRvIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBOb3Z5RG9rbGFkKGNvbnRlbnQsIHBvZGFuaUR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XHJcbiAgIC8qKlxyXG4gICAqICBQb2RhbmkgZG9rbGFkdVxyXG4gICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQb2RhbmlEb2tsYWR1KGNvbnRlbnQ6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5HVWN0RGV0YWlsIHwgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLkdVY3RTZXpuYW0sIHBvZGFuaUR0bz86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRQb2RhbmlSZXF1ZXN0RHRvKTogYW55IHtcclxuXHJcbiAgICAgICAgLy8gc21hemFuaSBmbGFzaGVcclxuICAgICAgICBpZiAodHlwZW9mIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbD8uZmxhc2hSZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29udGVudC5oaWRlRmxhc2goR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLmZsYXNoUmVzdWx0KTtcclxuICAgICAgICAgICAgY29udGVudC5oaWRlRmxhc2goR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLmZsYXNoUmVzdWx0WmF1Y3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG92b2xpdEdlbmVyb3ZhbmkgPSBjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5Qb3ZvbGl0R2VuZXJvdmFuaVBpZHVEb2tsYWR1O1xyXG4gICAgICAgIGlmICh0eXBlb2YgcG9kYW5pRHRvID09PSBcInVuZGVmaW5lZFwiIHx8IHBvZGFuaUR0byA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM0NlwiKTsgLy9SQyAzMDI1MDM0NiA6IFByb2LDrWjDoSBwb2TDoW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgIHBvZGFuaUR0byA9IHtcclxuICAgICAgICAgICAgICAgIElkTWVzc2FnZTogXCJcIiwgU2VqbXV0aVBpZHU6IEVrby5VdGlscy5HZXRFa29Vc2VyU2V0dGluZ3NQaWRTZWptdXRpKGNvbnRlbnQsIHBvdm9saXRHZW5lcm92YW5pID8gXCJhbm9cIiA6IFwibmVcIiAgLypcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3NcIiovKSA9PT0gXCIxXCJcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQhLmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5SZXppbVphZGF2YW5pUGlkdVwiKSA9PT0gXCIwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLmNyZWF0ZShwb2RhbmlEdG8pXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2c2Ugb2ssIHpvYnJheiBkb2tsYWQgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBab2JyYXpEZXRhaWxEbGVJWFAoeyBjb250ZW50OiBjb250ZW50LCBpeHA6IHJlc3VsdC5kYXRhLlBpZERva2xhZHUhLCBzYW1vc3RhbmVPa25vOiBmYWxzZSwgZWRpdGFjZTogcmVzdWx0LmRhdGEuTHplU0Rva2xhZGVtUHJhY292YXQhLCBwb2xvemt5OmZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9ab2JyYXpEZXRhaWxEbGVJWFBPbGQoY29udGVudCwgcmVzdWx0LmRhdGEuUGlkRG9rbGFkdSBhcyBzdHJpbmcsIGZhbHNlLCByZXN1bHQuZGF0YS5MemVTRG9rbGFkZW1QcmFjb3ZhdCBhcyBib29sZWFuKTtcclxuICAgICAgICAgICAgICAgIC8vY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goXHJcbiAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udGVudCwgZXJyb09iamVjdDogb2JqRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudXRuZSBvcGFrb3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZGFuaUR0byEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUG9kYW5pRG9rbGFkdShjb250ZW50LCBwb2RhbmlEdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWm9icmF6VnliZXJQaWR1KGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBhcmFtZXRyWCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2RhbmlEdG8hLlBpZERva2xhZHUgPSBwYXJhbWV0clghLlBpZERva2xhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZGFuaUR0byEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQb2RhbmlEb2tsYWR1KGNvbnRlbnQsIHBvZGFuaUR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkgeyBjb250ZW50LmVuZE9wZXJhdGlvbigpOyB0aHJvdyBHRXJyb3I7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIDtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgKiBOYWN0ZW5pIHBhcmFtZXRydSB6YWRhbnljaCB1eml2YXRlbGVtXHJcbiAgICAqICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSHJvbWFkbmFPcGVyYWNlR2V0UGFyYW0oLyphY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLCovZGlhbG9nczpHRGxnTmFtZXNwYWNlICwgd2l6OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB2eWJyYW5lRG9rbGFkeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG9bXSk6IEpRdWVyeVByb21pc2U8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFByZWRhdHRIcm9tYWRuZVJlcXVlc3REdG8+IHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gd2l6O1xyXG4gICAgICAgIC8vdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0ICBpeHBfZGVuID0gZm9ybS5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQ8RWtvLkludGVyZmFjZS5HRWtvc2RlbkR0bz4oXCJnZXRWYWx1ZVwiKT8uaXhwX2RlbjtcclxuXHJcbiAgICAgICAgY29uc3QgeyBpeHNfZnVuOiBpeHNfZnVuX2FrdCwgaXhzX3JlZiB9ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl9ha3RcIikuZ2ZpZWxkPENvbnRyb2xzTG9naWMuSW50ZXJmYWNlLkdSZWFkZXJHaW5zZnVuRHRvPihcImdldFZhbHVlXCIpID8/IHt9O1xyXG5cclxuICAgICAgICBjb25zdCBkdXZvZCA9IGZvcm0uZmluZEZpZWxkcyhcImR1dm9kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpeHBfZGVuIHx8ICFpeHNfZnVuX2FrdC8qdHlwZW9mIGl4cF9kZW4gPT09IFwidW5kZWZpbmVkXCIgfHwgaXhwX2RlbiA9PT0gbnVsbCB8fCB0eXBlb2YgaXhzX2Z1bl9ha3QgPT09IFwidW5kZWZpbmVkXCIgfHwgaXhzX2Z1bl9ha3QgPT09IG51bGwqLykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDc3NVwiKSAvL1JDIDMwMjUwNzc1IDogTmVuw60gdnlwbG7Em24gY8OtbCBwxZllZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShmYWxzZSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoLyp0eXBlb2YgdnlicmFuZURva2xhZHkgPT09IFwidW5kZWZpbmVkXCIgfHwgdnlicmFuZURva2xhZHkgPT0gbnVsbCovICF2eWJyYW5lRG9rbGFkeSB8fCB2eWJyYW5lRG9rbGFkeSEubGVuZ3RoID09PSAwKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDc3NFwiKSAvL1JDIDMwMjUwNzc0IDogTmVieWx5IHZ5YnLDoW55IMW+w6FkbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RIcm9tYWRueVJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgIFNlem5hbTogdnlicmFuZURva2xhZHksXHJcbiAgICAgICAgICAgIEl4cERlbk5ldzogaXhwX2RlbixcclxuICAgICAgICAgICAgSXhzRnVuTmV3OiBpeHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgSXhzUmVmTmV3OiBpeHNfcmVmLFxyXG4gICAgICAgICAgICBEdXZvZDogZHV2b2QsXHJcbiAgICAgICAgICAgIC8vQ2lzUmVhbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuKHJlc3VsdCk7XHJcbiAgICAgICAgLy9yZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlZXZpZG92YXQgZm9ybXVsYXJcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBIcm9tYWRuYU9wZXJhY2Vmb3JtKGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UsIGNvbnRlbnQ6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5HVWN0RGV0YWlsIHwgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWxEb2tsYWR1IHwgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLkdVY3RTZXpuYW0sIGl4cF9kZW46IHN0cmluZ3xudWxsKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgIGxldCByb2sgPSBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shO1xyXG5cclxuICAgICAgICAvL2xldCBpeHNGdW5Ba3QgPSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdDtcclxuICAgICAgICBsZXQgRmlsdHJ5S29tcGV0ZW50ID0geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8SNw6F0ZcSNbsOtIGZpbHRyeSBuYSBrb21wZXRlbnRhXHJcbiAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0aXZuw60ga29tcGV0ZW50aVxyXG4gICAgICAgICAgICBwcml6X2tvbTogMTAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11c8OtIGLDvXQgcMWZw616bmFrIGtvbXBldGVudGEgXHJcbiAgICAgICAgICAgIGljbzogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB1dXM6IChjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS51Y3Rhcm5hID8gY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uVVVTIDogbnVsbCksXHJcbiAgICAgICAgICAgIHVjczogKGNvbnRlbnQuR2xvYmFscy5QYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1MgOiBudWxsKSxcclxuICAgICAgICAgICAgY2lzX3JlYWw6IChjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS5yZWFsaXphdG9yID8gY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uVVVTIDogbnVsbClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByZWV2aWRlbmNlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5QcmVldmlkZW5jZURva2xhZHVGb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRWaWRpdGVsbm9zdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xlbmlabWVuaXRLb21wZXRlbnRhISxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyS29tcGV0ZW50OiBGaWx0cnlLb21wZXRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgWnByYWNvdmF0ZWxBa3R1YWxuaTogKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0cktuaWhhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9hZzogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va3RnX2Rlbjoga3RnRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBcIiE9IFwiICsgaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRGxlUG92b2xlbnljaEZhemk6IFtcIkdTQVVDVDAxXCIsIFwiR1dBVUNUMDVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZmVyZW50QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVR5cEFnOiBcInVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LlN1YnJhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9peHNfc3U6IGl4c1N1XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJlZGFuaTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuUHJlZGFuaURva2xhZHVGb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRWaWRpdGVsbm9zdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xlbmlabWVuaXRLb21wZXRlbnRhISxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyS29tcGV0ZW50OiBGaWx0cnlLb21wZXRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Tb3V2aXNlamljaVZpZGl0ZWxub3N0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vU291dmlzZWppY2labWVuYTp0cnVlICxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyWnByYWNvdmF0ZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9EbGVQb3ZvbGVueWNoRmF6aTogW1wiR1NBVUNUMDFcIiwgXCJHV0FVQ1QwNVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEFnZW5kOiBbNDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwidWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVBa3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1SXhwRGVuOiBpeHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWZlcmVudEFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhzX3N1OiBpeHNTdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiAoY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0uemFrbGFkbmkgfHwgY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0udWN0YXJuYSA/IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1U3VicmFkYTogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uU3VicmFkYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9peHNfZnVuOiBcIiE9IFwiICsgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5peHNfZnVuX2FrdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByaWRlbGVuaTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuUHJpZGVsZW5pRG9rbGFkdUZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFZpZGl0ZWxub3N0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRGxlUG92b2xlbnljaEZhemk6IFtcIkdTQVVDVDAxXCIsIFwiR1dBVUNUMDVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVUeXBBZzogXCJ1Y3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEFnZW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmZXJlbnRBa3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1SXhwRGVuOiBpeHBfZGVuLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9peHNfc3U6IGl4c1N1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IChjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS56YWtsYWRuaSB8fCBjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS51Y3Rhcm5hID8gY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVTdWJyYWRhOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5TdWJyYWRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l4c19mdW46IFwiIT0gXCIgKyBpeHNGdW5Ba3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9peHNfZnVuOiBcIiE9IFwiICsgdGhhdC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5peHNfZnVuX2FrdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmV2emV0aTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuUHJldnpldGlEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgQWt0dWFsbmlQcmlobGFzZW55WnByYWNvdmF0ZWw6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0LFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFptZW5hOiBjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5Qb3ZvbGVuaVptZW5pdEtvbXBldGVudGEhLFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFZpZGl0ZWxub3N0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0RmlsdHJLb21wZXRlbnQ6IEZpbHRyeUtvbXBldGVudCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaHlibmEgYWtjZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVjbmkgemFkYW5pIHBpZHUgKHpvYnJhemVuaSBXRkwgb2tuYSlcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldHJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBab2JyYXpWeWJlclBpZHUoY29udGVudDogR0NvbnRlbnQvKiwgcGFyYW1ldHI6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdQb2RhbmlEdG8qLyk6IEpRdWVyeVByb21pc2U8IEdQb2RhbmlEdG8gfCB1bmRlZmluZWQgfCBudWxsPiB7XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgR29yZGljLldmbC5EaWFsb2dzIS5HZW5lcm92YW5pSXhwRGxnKGNvbnRlbnQsIHtcclxuICAgICAgICAgICAgVHlwRG9rOiBHb3JkaWMuV2ZsLkdsb2JhbHMuRW51bXMuVHlwRG9rLlZsYXN0bmkgYXMgYW55XHJcbiAgICAgICAgICAgICwgVHlwSWQ6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAgYXMgYW55XHJcbiAgICAgICAgICAgICwgRG90YXpQcmlFeGlzdGVuY2lWSmluZUFnZW5kZTogZmFsc2VcclxuICAgICAgICAgICAgLCBIbGFzZW5pUHJpRXhpc3RlbmNpVkFnZW5kZTogZmFsc2VcclxuICAgICAgICAgICAgLCBacHVzb2JHZW5lcm92YW5pOiBHb3JkaWMuV2ZsLkdsb2JhbHMuRW51bXMuWnB1c29iR2VuZXJvdmFuaUl4cC5QYXJhbWV0cmVtR2luR2VuSXhwXHJcbiAgICAgICAgfSwgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpIVxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgIGZ1bmN0aW9uIChldiwgcmV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0VmFsdWUgPT0gXCJ1bmRlZmluZWRcIiB8fCByZXRWYWx1ZSA9PSBudWxsIC8qfHwgdHlwZW9mIChyZXRWYWx1ZS52YWx1ZXMpID09IFwidW5kZWZpbmVkXCIqLylcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1ldHI6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdQb2RhbmlEdG8gPSB7IFBpZERva2xhZHU6IHJldFZhbHVlLkl4cCwgRG9rbGFkSml6RXhpc3R1amU6IHJldFZhbHVlLkl4cEV4aXN0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbWV0ci5QaWREb2tsYWR1ID0gcmV0VmFsdWUuSXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHBhcmFtZXRyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB2c3R1cG5pIHBhcmFtZXRyeSBwcm8gb3RldnJlbmkgb2tuYSBkZXRhaWx1XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCB0eXBlIEdab2JyYXplbmlEZXRhaWx1UGFyYW09IHtcclxuICAgICAgICBjb250ZW50OiBHQ29udGVudCxcclxuICAgICAgICBuZXdNb2RlPzogYm9vbGVhbiwgLy8gbm92eSB6cHVzb2IgcG91eml2YW5pIGRldGFpbHUgKGRldGFpbCBkb2t1bWVudClcclxuICAgICAgICBpeHA6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb3RldnJpdCB2IHNhbW9zdGF0bmVtIG9rbmUgKGZhbHNlKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNhbW9zdGFuZU9rbm8/OiBib29sZWFuLC8vID0gZmFsc2UsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcmV6aW0gZWRpdGFjZSAoZmFsc2UpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZWRpdGFjZT86IGJvb2xlYW4sLy8gPSBmYWxzZSxcclxuICAgICAgICBncmlkPzogSlF1ZXJ5PEhUTUxFbGVtZW50PiAsXHJcbiAgICAgICAgb2JqZWt0Pzogc3RyaW5nLFxyXG4gICAgICAgIGl4cERlbj86IHN0cmluZyxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB6b2JyYXppdCBwb2xvxb5reSBkb2tsYWR1IChmYWxzZSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwb2xvemt5PzogYm9vbGVhbiAvLz0gZmFsc2VcclxuICAgIH07XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWm9icmF6RGV0YWlsRGxlSVhQKHZzdHVwOiBHWm9icmF6ZW5pRGV0YWlsdVBhcmFtKSB7XHJcbiAgICAgICAgbGV0IHsgY29udGVudCwgbmV3TW9kZSwgaXhwLCBzYW1vc3RhbmVPa25vLCBlZGl0YWNlLCBncmlkLCBvYmpla3QsIGl4cERlbiwgcG9sb3preSB9ID0gdnN0dXA7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlZGl0YWNlID09PSBcInVuZGVmaW5lZFwiKSBlZGl0YWNlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwb2xvemt5ID09PSBcInVuZGVmaW5lZFwiKSBwb2xvemt5ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFvYmpla3QvKnR5cGVvZiBvYmpla3QgPT09IFwidW5kZWZpbmVkXCIgfHwgb2JqZWt0ID09PSBudWxsKi8pXHJcbiAgICAgICAgICAgIG9iamVrdCA9IG5ld01vZGUgPT09IHRydWUgPyBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxEb2tsYWR1XCIgOiBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIjtcclxuICAgICAgICBpZiAoaXhwICE9IG51bGwgfHwgbmV3TW9kZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWVkaXRhY2UpIGVkaXRhY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGRldGFpbCA9IHR5cGVvZiBjb250ZW50W1wiSXhwXCJdICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgICAgICAgICAvLyB2c3R1bmkgcGFyYW1ldHJcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpeHA6IGl4cCxcclxuICAgICAgICAgICAgICAgIEVkaXRhY2VIbGF2aWNreTogZWRpdGFjZSxcclxuICAgICAgICAgICAgICAgIGlkOiBcInVjdERldGFpbERva2xhZHVcIixcclxuICAgICAgICAgICAgICAgIHVpZDogXCJ1Y3REZXRhaWxEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICBwb2xvemt5OiBwb2xvemt5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChzYW1vc3RhbmVPa25vPT09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLnNob3dXaW5kb3cob2JqZWt0LCBvcHRpb25zLCBcIlwiLCA4MDAsIDYwMCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpub3Z1bmHEjXRlbsOtIHNlem5hbXUgKHBvZGxlIGFrdHXDoWxuw61jaCBmaWx0csWvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlZnJlc2hTZXpuYW11KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRyb2w6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+O1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBncmlkID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSB2b2lkIDAgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKGdyaWQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgIGlmIChkZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQub2ZmKFwiLnpvYnJhemRsZWl4cFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5sb2FkKHsgSXhwOiBpeHAsIEVkaXRhY2VIbGF2aWNreTogZWRpdGFjZSwgaWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiLCB1aWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3R3BjOiBhbnk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl4cERlbiAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY29udGVudC5ncGMsIGl4cERlbiBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dwYyA9IHZvaWQgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Lm5hdmlnYXRlKFtvYmpla3QsIHsgZ3BjOiBuZXdHcGMsIGdyaWRSZW1vdGVDb250cm9sOiBjb250cm9sIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMvKnsgSXhwOiBpeHAsIEVkaXRhY2VIbGF2aWNreTogZWRpdGFjZSwgaWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiIH0qLylcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCAmJiBjb250ZW50W1wibmFtZVwiXSA9PT0gXCJHVWN0U2V6bmFtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uR1VjdFNlem5hbSkuJGdyaWQuZ2dyaWQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7IC8vIHDFmWkgemF2xZllbsOtIGRldGFpbHUgc2UgbmFzdGF2w60gZm9jdXMgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDAzM1wiKTsgLy9SQyAzMDI1MDAzMyA6IE5lbsOtIHBvc2zDoW4gxb7DoWRuw70gaWRlbnRpZmlrw6F0b3IhXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFpvYnJhemVuaSBva25hIHMgZGV0YWlsZW0gZG9rdW1lbnR1IGRsZSB6YWRhbmVobyBwaWR1XHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50IC0ga29udGVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gaXhwICAtIHBpZCBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNhbW9zdGFuZU9rbm9cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZWRpdGFjZSAtIHJlemltIGVkaXRhY2VcclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gZ3JpZCAtIG9iamVrdCBzZXpuYW1vdmVobyBncmlkdVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVrdCAtIG5hemV2IG9iamVrdHUgZGV0YWlsdVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl4cERlbiAtIGlkZW50aWZpa2F0b3Iga25paHlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFpvYnJhekRldGFpbERsZUlYUE9sZChjb250ZW50OiBHQ29udGVudCwgaXhwOiBudWxsIHwgc3RyaW5nLCBzYW1vc3RhbmVPa25vOiBib29sZWFuID0gZmFsc2UsIGVkaXRhY2U6IGJvb2xlYW4gPSBmYWxzZSwgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZCA9IHZvaWQgMCwgb2JqZWt0Pzogc3RyaW5nLCBpeHBEZW4/OiBzdHJpbmcsIHBvbG96a3k6IGJvb2xlYW49ZmFsc2UpIHtcclxuICAgICAgICBpZiAoIW9iamVrdC8qdHlwZW9mIG9iamVrdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvYmpla3QgPT09IG51bGwqLylcclxuICAgICAgICAgICAgb2JqZWt0ID0gXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsXCI7XHJcbiAgICAgICAgaWYgKGl4cCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghZWRpdGFjZSkgZWRpdGFjZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZGV0YWlsID0gdHlwZW9mIGNvbnRlbnRbXCJJeHBcIl0gIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgICAgIC8vIHZzdHVuaSBwYXJhbWV0cnVcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpeHA6IGl4cCxcclxuICAgICAgICAgICAgICAgIEVkaXRhY2VIbGF2aWNreTogZWRpdGFjZSwgXHJcbiAgICAgICAgICAgICAgICBpZDogXCJ1Y3REZXRhaWxEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICB1aWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgcG9sb3preTogcG9sb3preVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoc2Ftb3N0YW5lT2tubykge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLnNob3dXaW5kb3cob2JqZWt0LCBvcHRpb25zLCBcIlwiLCA4MDAsIDYwMCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOmFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem5vdnVuYcSNdGVuw60gc2V6bmFtdSAocG9kbGUgYWt0dcOhbG7DrWNoIGZpbHRyxa8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRyb2w6IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQzxhbnk+O1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBncmlkID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSB2b2lkIDAgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKGdyaWQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgIGlmIChkZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQub2ZmKFwiLnpvYnJhemRsZWl4cFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5sb2FkKHsgSXhwOiBpeHAsIEVkaXRhY2VIbGF2aWNreTogZWRpdGFjZSwgaWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiLCB1aWQ6IFwidWN0RGV0YWlsRG9rbGFkdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHsgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQub2ZmKFwiLnpvYnJhemRsZWl4cFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5vbmUoXCJjb250ZW50cmVhZHkuem9icmF6ZGxlaXhwXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5Ba3R1YWxpemFjZUZvcm11bGFyZShjb250ZW50IGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkFrdHVhbGl6YWNlRm9ybXVsYXJlKGNvbnRlbnQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBuZXdHcGM6IGFueTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXhwRGVuICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgaXhwRGVuIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3BjID0gdm9pZCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoW29iamVrdCwgeyBncGM6IG5ld0dwYywgZ3JpZFJlbW90ZUNvbnRyb2w6IGNvbnRyb2wgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy8qeyBJeHA6IGl4cCwgRWRpdGFjZUhsYXZpY2t5OiBlZGl0YWNlLCBpZDogXCJ1Y3REZXRhaWxEb2tsYWR1XCIgfSovKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGFrdHVhbGl6b3ZhbmVobyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LlNlem5hbS5SZWxvYWRSb3dGcm9tREIoY29udGVudCwgcmVzLnJldHVyblZhbHVlLml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkb2tsYWQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b1tdID0gW3sgaXhwOiByZXMucmV0dXJuVmFsdWUuaXhwIH1dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLnJlZnJlc2hSb3dzRnJvbURCKGNvbnRlbnQgYXMgYW55LCBbeyBpeHA6IHJlcy5yZXR1cm5WYWx1ZS5peHAgfV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBha3Rpdm5paG8gcmFka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlZnJlc2hTZXpuYW11KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLy5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7IE9ic29sZXRlXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudCAmJiBjb250ZW50W1wibmFtZVwiXSA9PT1cIkdVY3RTZXpuYW1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZW50IGFzIEdvcmRpYy5VY3QuV2ViQ2xpZW50LlNlem5hbS5HVWN0U2V6bmFtKS4kZ3JpZC5nZ3JpZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTsgLy8gcMWZaSB6YXbFmWVuw60gZGV0YWlsdSBzZSBuYXN0YXbDrSBmb2N1cyBuYSBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDAzM1wiKTsgLy9SQyAzMDI1MDAzMyA6IE5lbsOtIHBvc2zDoW4gxb7DoWRuw70gaWRlbnRpZmlrw6F0b3IhXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT4gICBPem5hY2l0IGRva2xhZHkgcHJlY3RlbmUodHJ1ZSkvbmVwcmVjdGVuZShmYWxzZSkgPC9zdW1tYXJ5PlxyXG4gICAgLy8vIDxyZW1hcmtzPiAgIFR2YWdlbmtuZWNodCwgMy4zLjIwMTcuIDwvcmVtYXJrcz5cclxuICAgIC8vLyA8cGFyYW0gbmFtZT1cInByZWN0ZW5lXCI+dHJ1ZSAtIG96bmFjaXQgemEgcHJlc3RlbmUgPC9wYXJhbT5cclxuICAgIC8vLyA8cGFyYW0gbmFtZT1cIm96bmFjZW5lUmFka3lcIj52eWJyYW5lIHJhZGt5PC9wYXJhbT5cclxuICAgIC8vLyA8cmV0dXJucz4gICAuIDwvcmV0dXJucz5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gT3puYWNpdERva2xhZHkoY29udGVudDogR0NvbnRlbnQsIHByZWN0ZW5lOiBib29sZWFuLCBvem5hY2VuZVJhZGt5OiBhbnkpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmICghb3puYWNlbmVSYWRreXx8IG96bmFjZW5lUmFka3kubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDAzNVwiLCAvL1JDIDMwMjUwMDM1IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzMzRcIik7ICAvL1JDIDMwMjUwMzM0IDogTmVuYWxlemVueSDFvsOhZG7DqSBvem5hxI1lbsOpIMWZw6Fka3lcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM0MlwiKTsgLy9SQyAzMDI1MDM0MiA6IFByb2LDrWjDoSBvem5hxI1vdsOhbsOtIGRva2xhZMWvXHJcbiAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0T3puYWNpdERva2xhZHlEdG8gPSB7XHJcbiAgICAgICAgICAgIE96bmFjaXQ6IChwcmVjdGVuZSA/IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwT3puYWNlbmlEb2tsYWR1LlByZWN0ZW5vIDogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VUeXBPem5hY2VuaURva2xhZHUuTmVwcmVjdGVubylcclxuICAgICAgICAgICAgLCBTZXpuYW06IG96bmFjZW5lUmFka3lcclxuXHJcbiAgICAgICAgfTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5ocm9tYWRuZU96bmFjaXQocnEpXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybkRhdGEuZm9yRWFjaChmdW5jdGlvbiAocmFkZWssIGluZGVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlcGxhY2VSb3coY29udGVudCwgcmFkZWssdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBab2JyYXplbmkgbmF2YXphbnljaCBkb2tsYWR1XHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZhemJ5RG9rbGFkdShjb250ZW50OiBHQ29udGVudCwgdWNldG5pRG9rbGFkOkdvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RzcGlkRHRvLCB2aWV3TW9kZTpib29sZWFuKSB7XHJcbiAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7IC8vdGhpcyA9IHRhdG8gYWtjZVxyXG4gICAgICAgIGxldCBkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgbGV0IGxvYWRpbmc6IEpRdWVyeVByb21pc2U8YW55PjtcclxuICAgICAgICBsZXQgb2R1Y3RvdmFubyA9IGZhbHNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgdWNldG5pRG9rbGFkLml4cF9kZW4gYXMgYW55KTtcclxuICAgICAgICAvL3RoaXMuc3J2ID0gbmV3IEdDb250ZW50KFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdERldGFpbFwiKTsgIC8vc2x1emJhIHBybyBwcmlzdHVwIGsgZGF0dW0gbmEgc2VydmVydVxyXG4gICAgICAgIC8vdGhpcy5zcnYuY2FsbChcIk5hY3RlbmlBdHJpYnV0dVZhemJ5XCIsIHsgcGlkRG9rbGFkdTogdWNldG5pRG9rbGFkLml4cCwgdmlld01vZGU6IHZpZXdNb2RlIH0pXHJcblxyXG4gICAgICAgIEVLT1V0aWxzLkNhbGxSZW1vdGVTZXJ2aWNlKGNvbnRlbnQsIFwiTmFjdGVuaUF0cmlidXR1VmF6YnlcIiwgeyBoZWFkOiB1Y2V0bmlEb2tsYWQsIHZpZXdNb2RlOiB2aWV3TW9kZSB9LCBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIiwgbmV3R3BjKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodnlzbGVkZWspIHtcclxuICAgICAgICAgICAgICAgIGxldCBva25vVmF6ZWIgPSBjb250ZW50Lm5hdmlnYXRlKFtcIkdvcmRpYy5Fa28uV2ViQ2xpZW50LkdWYXpieVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkRldGFpbDogZnVuY3Rpb24gKHRoaXM6IEdDb250ZW50LCByb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY250ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQud2hlbigpLnRoZW4oKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdykgcmV0dXJuIGRlZi5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3c/LnR5cF9hZ19zZWsgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Py5pc2wuVWN0RG9rbGFkLmdldEtuaWhhWkRva2xhZHUoeyBpeHA6IHJvdy5peHBfc2VrIGFzIHN0cmluZyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGl4cERlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpeHBEZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjbnQ/LmdwYywgaXhwRGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGNudCA9IG9rbm9WYXplYlswXVtcImNvbnRlbnRcIl0gYXMgR0NvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQ/Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIiwgeyBncGM6IG5ld0dwYyB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IEVkaXRhY2VIbGF2aWNreTogZmFsc2UsIGlkOiAndWN0RGV0YWlsRG9rbGFkdScsIEl4cDogcm93Lml4cF9zZWssIEl4cERlbjogaXhwRGVuIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MTogcm93Lml4cF9zZWssIC8vIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IG5vdsSbIG90ZXbDrXJhbsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwQWc6IHJvdy50eXBfYWdfc2VrLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgIC8vIHDFmcOtem5hayB2eXZvbMOhbsOtIHbDvWppbWt5IHDFmWkgbmVuYWxlemVuw60gY8OtbG92w6kgZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiICAgICAgICAgICAgLy8gbsOhemV2IG1ldG9keSBzcHXFoXTEm27DqSBwbyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFdmbC5EaWFsb2dzLkRldGFpbERva3VtZW50dVNwaXN1KGNudCwgeyBTaW1wbGVNb2RlOiBmYWxzZSwgLypJeHBJbml0UHJvVmF6YnVTb3V2aXNlamljaWNoOiBpeHAhLCovIERldGFpbER0bzogeyBpeHA6IHJvdy5peHBfc2VrISB9IH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgSWQ6IFwidWN0X3ZhemJ5XCIsIElucHV0RHRvOiB2eXNsZWRla1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgb2tub1ZhemViLm9uKFwiZWtvX3ZhemJ5X25hdmF6YW5vXCIsIGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3TW9kZSkgcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLnJlZnJlc2hEZXRhaWwuY2FsbChjb250ZW50IGFzIGFueSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAudGhlbigoKSA9PiB7IGRlZi5yZXNvbHZlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbG9hZGluZyA9IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5SZWZyZXNoRGV0YWlsKGNvbnRlbnQgYXMgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpOyBcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG9rbm9WYXplYi5vbihcImVrb196YXBpc3lfb2R1Y3RvdmF0XCIsIGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3TW9kZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIG9kdWN0b3Zhbm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLlJlZnJlc2hEZXRhaWwoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbClcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URSAoQk0gMjAyNS0wNi0xMik6IGxvYWRpbmcgbmVuaSBuaWtkZSBzZXRudXRhLiBWbml0cmVrIGlmdSBzZSBuaWtkeSBuZXNwdXN0aS5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2YgbG9hZGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChsb2FkaW5nLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBsb2FkaW5nLnRoZW4oKCkgPT4gR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLk9kdWN0b3ZhbmlaYXBpc3UoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbCwgb2tub1ZhemViLCBkYXRhLnphcGlzeSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuT2R1Y3RvdmFuaVphcGlzdShjb250ZW50IGFzIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5HVWN0RGV0YWlsLCBva25vVmF6ZWIsIGRhdGEuemFwaXN5KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLk9kdWN0b3ZhbmlaYXBpc3UoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbCwgb2tub1ZhemViLCBkYXRhLnphcGlzeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBva25vVmF6ZWIub24oXCJjbG9zZWRcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6bm92dW5hY3RlbmkgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldi50YXJnZXQgPT0gb2tub1ZhemViWzBdICYmIGN0eCAhPSBudWxsICYmIGN0eC5oYXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2R1Y3RvdmFubylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLlJlZnJlc2hEZXRhaWwoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLlJlbG9hZFJlY29yZHMoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvZHVjdG92YW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5Td2l0Y2hUb1JlY29yZHMoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTsgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogT3RldsWZZW7DrSBkZXRhaWx1IHYgcHJpbcOhcm7DrSBhZ2VuZMSbICh2IGppbsOpIHrDoWxvxb5jZSlcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsfSB0eXBBZyBwcmltw6FybsOtIGFnZW5kYVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBpZDEgaWQgZGV0YWlsdSB2IHByaW3DoXJuw60gYWdlbmTEmyAoUElEIGEgcG9kLilcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gW2lkMl0gZG9wbMWIdWrDrWPDrSBpZCBkZXRhaWx1IHYgcHJpbcOhcm7DrSBhZ2VuZMSbIChQSUQgYSBwb2QuKVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBbaWQzXSBkYWzFocOtIGRvcGzFiHVqw61jw60gaWQgZGV0YWlsdSB2IHByaW3DoXJuw60gYWdlbmTEmyAoUElEIGEgcG9kLilcclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gb3BlbkRldGFpbEluT3RoZXJUYWIodHlwQWc6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwsIGlkMTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCwgaWQyPzogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCwgaWQzPzogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHRlc3QgbmEgdnlqbWVub3ZhbsOpIGFnZW5keT9cclxuICAgICAgICBpZiAodHlwQWcgIT0gbnVsbCAmJiBpZDEgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgLy8gcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWRlbnRpZmlrYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXh4MTogaWQxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4eDI6IGlkMixcclxuICAgICAgICAgICAgICAgICAgICBpeHgzOiBpZDMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG/FvmFkb3ZhbsOhIGFnZW5kYSAoYSBwxZnDrXBhZG7EmyBmw6F6ZSlcclxuICAgICAgICAgICAgICAgICAgICB0eXBBZzogdHlwQWcsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF6ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb3ZvbGVubyBwb3XFvsOtdCBha3R1w6FsbsOtIGbDoXppXHJcbiAgICAgICAgICAgICAgICAgICAgYmFuQ3VycmVudEFwcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdsO9amlta2EgcMWZaSBuZW5hbGV6ZW7DrSDFvsOhZG7DqSBjw61sb3bDqSBmw6F6ZVxyXG4gICAgICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBwb8W+YWRvdmFuw6EgbWV0b2RhXHJcbiAgICAgICAgICAgICAgICBcIk9wZW5EZXRhaWxcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=